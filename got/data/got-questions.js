// /got/data/got-questions.js

// House IDs used in scoring:
// stark, arryn, greyjoy, lannister, tully, baratheon, tyrell, martell, targaryen

export const GOT_QUESTIONS = [
  {
    id: "q1",
    text: "In a crisis, what do you rely on first?",
    options: [
      {
        label: "1) Loyalty and doing what’s right, even if it hurts.",
        weights: { stark: 2, tully: 1 },
      },
      {
        label: "2) Strategy from a distance — see the whole board before you move.",
        weights: { arryn: 2, tyrell: 1 },
      },
      {
        label: "3) Bold action. Kick the door in and sort the rest later.",
        weights: { baratheon: 2, greyjoy: 1 },
      },
      {
        label: "4) Leverage and influence. Fix it with power, favors, or gold.",
        weights: { lannister: 2, tyrell: 1 },
      },
      {
        label: "5) Pure will — if the world won’t bend, you’ll burn a path through.",
        weights: { targaryen: 2, martell: 1 },
      },
    ],
  },

  {
    id: "q2",
    text: "Where would you feel most at home in Westeros?",
    options: [
      {
        label: "1) A cold but honest stronghold in the North.",
        weights: { stark: 2 },
      },
      {
        label: "2) A lofty castle in the mountains, above everyone else’s noise.",
        weights: { arryn: 2 },
      },
      {
        label: "3) A storm-battered keep where the nights are loud and the ale is cheap.",
        weights: { baratheon: 2, greyjoy: 1 },
      },
      {
        label: "4) A glittering seat of wealth and influence, full of whispers and deals.",
        weights: { lannister: 2, tyrell: 1 },
      },
      {
        label: "5) A sun-drenched city of heat, spice, and dangerous politics.",
        weights: { martell: 2, targaryen: 1 },
      },
    ],
  },

  {
    id: "q3",
    text: "Someone insults you publicly. What’s your instinct?",
    options: [
      {
        label: "1) Let it slide… but remember it forever.",
        weights: { stark: 1, tully: 1 },
      },
      {
        label: "2) Cut them down with a single precise sentence.",
        weights: { tyrell: 2, lannister: 1 },
      },
      {
        label: "3) Challenge them outright — duel, brawl, something loud.",
        weights: { baratheon: 2, greyjoy: 1 },
      },
      {
        label: "4) Smile, shake their hand, and destroy them later when it matters.",
        weights: { lannister: 2, martell: 1 },
      },
      {
        label: "5) Turn the room itself in your favor; make everyone remember *you*, not them.",
        weights: { targaryen: 2, tyrell: 1 },
      },
    ],
  },

  {
    id: "q4",
    text: "What do you value most in allies?",
    options: [
      {
        label: "1) Loyalty and shared principles.",
        weights: { stark: 2, tully: 1 },
      },
      {
        label: "2) Quiet competence and reliability.",
        weights: { arryn: 2 },
      },
      {
        label: "3) Fearlessness and willingness to do the dirty work.",
        weights: { greyjoy: 2, baratheon: 1 },
      },
      {
        label: "4) Influence, information, and connections.",
        weights: { lannister: 2, tyrell: 1 },
      },
      {
        label: "5) Passion, ambition, and refusal to bow.",
        weights: { martell: 1, targaryen: 2 },
      },
    ],
  },

  {
    id: "q5",
    text: "If you ended up on the Iron Throne, what kind of ruler would you be?",
    options: [
      {
        label: "1) Reluctant but fair — doing what’s needed for the realm.",
        weights: { stark: 2, tully: 1 },
      },
      {
        label: "2) Calm, distant, and unshakable — hard to reach, harder to move.",
        weights: { arryn: 2 },
      },
      {
        label: "3) Thunderous and larger-than-life — beloved by some, feared by many.",
        weights: { baratheon: 2, greyjoy: 1 },
      },
      {
        label: "4) Razor-focused on legacy, wealth, and the stability of your house.",
        weights: { lannister: 2, tyrell: 1 },
      },
      {
        label: "5) Intense, transformative, maybe a little terrifying — but unforgettable.",
        weights: { targaryen: 2, martell: 1 },
      },
    ],
  },
];
