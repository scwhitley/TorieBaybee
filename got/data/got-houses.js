// /got/data/got-houses.js

export const GOT_HOUSES = {
  stark: {
    id: "stark",
    name: "House Stark of Winterfell",
    shortName: "Stark",
    region: "The North",
    crestKey: "stark", // use for Wizebot overlay lookup
    words: "Winter is Coming",
    responses: [
      "You move with quiet honor — the wolves of the North would claim you as their own.",
      "Duty over comfort, loyalty over glory. The Starks would stand you at their side.",
      "You carry the weight of the world like fresh snow on old stone. You are Stark at heart.",
      "When others chase crowns, you guard hearth and home. Winterfell would welcome you.",
      "Steel in your spine, kindness in your judgment — the North remembers, and so will you."
    ],
  },

  arryn: {
    id: "arryn",
    name: "House Arryn of the Eyrie",
    shortName: "Arryn",
    region: "The Vale",
    crestKey: "arryn",
    words: "As High as Honor",
    responses: [
      "Your ideals sit high above petty squabbles — the Vale is where your banner flies.",
      "You prefer clean skies and clear lines of honor. The Eyrie would feel like home.",
      "You see far, think carefully, and step rarely — all very Arryn of you.",
      "Cliffs, cold air, and quiet judgment — your spirit soars with the falcons.",
      "You stand apart from the noise, choosing honor even when it isolates you."
    ],
  },

  greyjoy: {
    id: "greyjoy",
    name: "House Greyjoy of Pyke",
    shortName: "Greyjoy",
    region: "The Iron Islands",
    crestKey: "greyjoy",
    words: "We Do Not Sow",
    responses: [
      "You answer to no one but your own code — the Ironborn would call you kin.",
      "Comfort bores you; storms wake you up. You’re Greyjoy to the bone.",
      "Gold taken tastes better than gold given. The Drowned God is probably nodding.",
      "You thrive in chaos and salt. Pyke’s jagged stones would suit you.",
      "Stubborn, sharp, and unbent by opinion — very ‘We Do Not Sow’ of you."
    ],
  },

  lannister: {
    id: "lannister",
    name: "House Lannister of Casterly Rock",
    shortName: "Lannister",
    region: "The Westerlands",
    crestKey: "lannister",
    words: "Hear Me Roar!",
    responses: [
      "Power, presentation, and payback — the lions of the Rock would approve.",
      "You measure worth in leverage and legacy. That’s Casterly Rock energy.",
      "Debts are remembered, image is curated, moves are calculated. Very Lannister-coded.",
      "You prefer a sharp smile over a drawn sword — until both are needed.",
      "When you walk in, the room changes. A lion just claimed their corner."
    ],
  },

  tully: {
    id: "tully",
    name: "House Tully of Riverrun",
    shortName: "Tully",
    region: "The Riverlands",
    crestKey: "tully",
    words: "Family, Duty, Honor",
    responses: [
      "You anchor yourself in family and responsibility. That’s Riverrun to the core.",
      "You’d rather keep the river flowing than dam it for ego — Tully would claim you.",
      "Your heart moves first, but your duty always catches up. The Trident knows your name.",
      "You carry others even when no one sees. True Riverlands main character behavior.",
      "For you, loyalty is not a slogan, it’s a reflex — very Tully-coded."
    ],
  },

  baratheon: {
    id: "baratheon",
    name: "House Baratheon of Storm’s End",
    shortName: "Baratheon",
    region: "The Stormlands",
    crestKey: "baratheon",
    words: "Ours is the Fury",
    responses: [
      "You are a storm in human form. The stags of Storm’s End would drink with you.",
      "Your temper, your passion, your momentum — peak Baratheon chaos.",
      "You kick doors, not knock. The storm listens when you move.",
      "You burn hot, love loud, and regret occasionally. Classic Baratheon arc.",
      "Subtlety is for other houses. You are thunder given a pulse."
    ],
  },

  tyrell: {
    id: "tyrell",
    name: "House Tyrell of Highgarden",
    shortName: "Tyrell",
    region: "The Reach",
    crestKey: "tyrell",
    words: "Growing Strong",
    responses: [
      "Charm, strategy, and aesthetics — the gardeners of Highgarden welcome you.",
      "You help things grow: plans, people, power. That’s Tyrell energy.",
      "You play the long game with a soft smile and sharp roots.",
      "You understand that influence often looks like hospitality — until it doesn’t.",
      "You thrive where beauty and ambition share the same table."
    ],
  },

  martell: {
    id: "martell",
    name: "House Martell of Sunspear",
    shortName: "Martell",
    region: "Dorne",
    crestKey: "martell",
    words: "Unbowed, Unbent, Unbroken",
    responses: [
      "You bend for no one — Dorne would call you one of their own.",
      "Sun, spice, and stubborn pride. That’s Martell coded.",
      "You remember every slight but answer them on your own timing.",
      "You move with heat and style; even your grudges are well dressed.",
      "Pleasure, principle, and payback — three pillars of your personality."
    ],
  },

  targaryen: {
    id: "targaryen",
    name: "House Targaryen of Dragonstone",
    shortName: "Targaryen",
    region: "The Crownlands",
    crestKey: "targaryen",
    words: "Fire and Blood",
    responses: [
      "You are built for impossible odds and dramatic entries. Dragon energy, fully.",
      "You think in eras, not weeks. The Targaryens would feel familiar.",
      "Your emotions hit like wildfire — beautiful from afar, risky up close.",
      "You don’t just want a seat at the table; you want to melt the table down.",
      "Some people have potential. You have prophecy vibes. Very Fire and Blood."
    ],
  },
};

export function pickHouseResponse(houseId) {
  const house = GOT_HOUSES[houseId];
  if (!house) return "Your path is unclear — even the smallfolk are confused.";
  const arr = house.responses || [];
  if (!arr.length) return `You belong with House ${house.shortName || house.name}.`;
  return arr[Math.floor(Math.random() * arr.length)];
}
