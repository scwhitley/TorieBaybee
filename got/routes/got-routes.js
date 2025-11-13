// /got/routes/got-routes.js
import { Redis } from "@upstash/redis";
import {
  GOT_QUESTIONS,
  GOT_HOUSES,
  createEmptyScores,
  applyChoice,
  pickHouseFromScores,
} from "../core/got-quiz-core.js";
import { pickHouseResponse } from "../data/got-houses.js";

const redis = Redis.fromEnv();

// Redis keys
const sessionKey = (user) => `gotquiz:session:${user}`;
const lastKey    = (user) => `gotquiz:last:${user}`;

// Session TTL (so dead runs eventually clear)
const SESSION_TTL_SEC = 10 * 60; // 10 minutes

function cleanUser(raw) {
  return String(raw || "").trim().replace(/^@+/, "").toLowerCase();
}

function formatQuestion(user, index) {
  const q = GOT_QUESTIONS[index];
  if (!q) return "No question found.";
  const lines = [ `@${user} — Game of Thrones House Trial` ];
  lines.push(q.text);
  for (const opt of q.options) {
    lines.push(opt.label);
  }
  lines.push("Reply with !got 1–5.");
  return lines.join(" ");
}

// Parse session from Redis
async function loadSession(user) {
  const raw = await redis.get(sessionKey(user));
  if (!raw) return null;
  try {
    return typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch {
    return null;
  }
}

async function saveSession(user, session) {
  await redis.set(sessionKey(user), JSON.stringify(session), { ex: SESSION_TTL_SEC });
}

export function registerGotRoutes(app) {
  // Start / restart the GoT house trial
  // GET /got/start?user=NAME
  app.get("/got/start", async (req, res) => {
    const user = cleanUser(req.query.user || "");
    if (!user) {
      return res.type("text/plain").send("Usage: /got/start?user=NAME");
    }

    const session = {
      user,
      step: 0,
      scores: createEmptyScores(),
      startedAt: Date.now(),
      lastTouch: Date.now(),
    };
    await saveSession(user, session);

    const msg = formatQuestion(user, 0);
    return res.type("text/plain").send(msg);
  });

  // Answer a question
  // GET /got/answer?user=NAME&choice=1..5
  app.get("/got/answer", async (req, res) => {
    const user = cleanUser(req.query.user || "");
    const choiceStr = String(req.query.choice || "").trim();

    if (!user || !choiceStr) {
      return res.type("text/plain").send("Usage: /got/answer?user=NAME&choice=1..5");
    }

    let session = await loadSession(user);
    if (!session) {
      return res
        .type("text/plain")
        .send(`@${user} has no active GoT trial. Use !gothouse to start.`);
    }

    const idx = session.step;
    const question = GOT_QUESTIONS[idx];
    if (!question) {
      return res
        .type("text/plain")
        .send(`@${user} your trial is out of sync. Start again with !gothouse.`);
    }

    const choiceIdx = parseInt(choiceStr, 10) - 1;
    if (!(choiceIdx >= 0 && choiceIdx < question.options.length)) {
      return res.type("text/plain").send(`@${user} choose a number between 1 and 5.`);
    }

    // Apply choice
    session.scores = applyChoice(session.scores, question, choiceIdx);
    session.step += 1;
    session.lastTouch = Date.now();

    // If we’re done, pick a house
    if (session.step >= GOT_QUESTIONS.length) {
      const houseId = pickHouseFromScores(session.scores);
      const house = GOT_HOUSES[houseId] || null;

      const summary = {
        user,
        houseId,
        scores: session.scores,
        finishedAt: Date.now(),
      };
      await redis.set(lastKey(user), JSON.stringify(summary), { ex: 24 * 3600 });
      // clear active session
      await redis.del(sessionKey(user));

      if (!house) {
        return res
          .type("text/plain")
          .send(`@${user} your path is unclear — no house could claim you.`);
      }

      const flavor = pickHouseResponse(houseId);
      // You can have Wizebot key off this "HOUSE:<id>" token to show the crest overlay.
      const crestToken = `HOUSE:${houseId.toUpperCase()}`;

      const line = `@${user} — you belong with **${house.name}** (${crestToken}). ${flavor}`;
      return res.type("text/plain").send(line);
    }

    // Otherwise, next question
    await saveSession(user, session);
    const msg = formatQuestion(user, session.step);
    return res.type("text/plain").send(msg);
  });

  // Optional: re-show last result
  // GET /got/result?user=NAME
  app.get("/got/result", async (req, res) => {
    const user = cleanUser(req.query.user || "");
    if (!user) {
      return res.type("text/plain").send("Usage: /got/result?user=NAME");
    }

    const raw = await redis.get(lastKey(user));
    if (!raw) {
      return res
        .type("text/plain")
        .send(`@${user} has no recorded GoT house yet. Use !gothouse to take the trial.`);
    }

    let summary;
    try {
      summary = typeof raw === "string" ? JSON.parse(raw) : raw;
    } catch {
      return res.type("text/plain").send(`@${user} your result data is corrupted in the Citadel.`);
    }

    const house = GOT_HOUSES[summary.houseId];
    if (!house) {
      return res
        .type("text/plain")
        .send(`@${user} has a result, but no valid house. Westeros is glitching.`);
    }

    const crestToken = `HOUSE:${summary.houseId.toUpperCase()}`;
    const flavor = pickHouseResponse(summary.houseId);
    const line = `@${user} — last recorded: **${house.name}** (${crestToken}). ${flavor}`;
    return res.type("text/plain").send(line);
  });
}
