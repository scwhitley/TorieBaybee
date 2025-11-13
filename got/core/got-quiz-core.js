// /got/core/got-quiz-core.js
import { GOT_HOUSES } from "../data/got-houses.js";
import { GOT_QUESTIONS } from "../data/got-questions.js";

export { GOT_HOUSES, GOT_QUESTIONS };

export function createEmptyScores() {
  const scores = {};
  for (const key of Object.keys(GOT_HOUSES)) {
    scores[key] = 0;
  }
  return scores;
}

export function applyChoice(scores, question, choiceIndex) {
  const choice = question.options[choiceIndex];
  if (!choice) return scores;
  const weights = choice.weights || {};
  for (const [houseId, val] of Object.entries(weights)) {
    if (!Object.prototype.hasOwnProperty.call(scores, houseId)) {
      scores[houseId] = 0;
    }
    scores[houseId] += Number(val) || 0;
  }
  return scores;
}

export function pickHouseFromScores(scores) {
  let best = null;
  let bestValue = -Infinity;
  const top = [];

  for (const [houseId, valueRaw] of Object.entries(scores)) {
    const value = Number(valueRaw) || 0;
    if (value > bestValue) {
      bestValue = value;
      best = houseId;
      top.length = 0;
      top.push(houseId);
    } else if (value === bestValue) {
      top.push(houseId);
    }
  }

  if (!top.length) return null;
  // Tie-break randomly among top houses
  return top[Math.floor(Math.random() * top.length)];
}
