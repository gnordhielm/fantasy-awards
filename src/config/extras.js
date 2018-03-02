
export default {
  "WW_II": {
    points: 200,
    score: results => {
      return ["DUNKIRK", "DARKEST_HOUR"]
        .includes(results["PICTURE"])
    },
    "description": "A World War II film wins best picture (\"Darkest Hour\" or \"Dunkirk\")."
  },
  "WRONG_WINNER": {
    points: 700,
    score: results => {
      return results["EVENT_WRONG_WINNER"]
    },
    "description": "The wrong winner is announced (in any category)."
  },
  "VARDA": {
    points: 100,
    score: results => {
      return results["DOCUMENTARY_FEATURE"] === "FACES_PLACES"
    },
    "description": "Agnes Varda wins her first Oscar for \"Faces Places\" (at the ripe old age of 89)."
  },
  "SAME_SOUND": {
    points: 100,
    score: results => {
      return (results["SOUND_MIXING"] && results["SOUND_EDITING"]) &&
      (results["SOUND_MIXING"] === results["SOUND_EDITING"])
    },
    "description": "The same film wins for sound editing and sound mixing."
  },
  "MONKEY": {
    points: 100,
    score: results => {
      return ["WAR_FOR_THE_PLANET_OF_THE_APES", "KONG:_SKULL_ISLAND"]
        .includes(results["VISUAL_EFFECTS"])
    },
    "description": "A monkey movie wins best visual effects (\"Planet of the Apes\" or \"Kong\")."
  },
  "538": {
    points: 300,
    score: results => {
      return (results["PICTURE"] === "THE_SHAPE_OF_WATER") &&
        (results["ACTOR"] === "DARKEST_HOUR") &&
        (results["ACTRESS"] === "THREE_BILLBOARDS_OUTSIDE_EBBING,_MISSOURI") &&
        (results["DIRECTING"] === "THE_SHAPE_OF_WATER")

    },
    "description": "FiveThirtyEight correctly guesses best picture, actor, actress, and director (http://53eig.ht/2CLN2gU)."
  },
  "BOSS_BABY": {
    points: 100,
    score: results => {
      return results["ANIMATED_FEATURE"] === "THE_BOSS_BABY"
    },
    "description": "\"The Boss Baby\" wins a fucking Oscar."
  },
  "PEELE": {
    points: 200,
    score: results => {
      return (results["PICTURE"] === "GET_OUT") ||
        (results["ORIGINAL_SCREENPLAY"] === "GET_OUT") ||
        (results["DIRECTING"] === "GET_OUT")
    },
    "description": "Jordan Peele wins for his directorial debut (screenplay, directing, or picture)."
  },
  "GERWIG": {
    points: 200,
    score: results => {
      return (results["PICTURE"] === "LADY_BIRD") ||
        (results["DIRECTING"] === "LADY_BIRD")
    },
    "description": "Greta Gerwig wins for her directorial debut (directing or picture)."
  },
  "FINAL_CURTAIN": {
    points: 100,
    score: results => {
      return results["ACTOR"] === "PHANTOM_THREAD"
    },
    "description": "Daniel Day-Lewis wins for his final performance."
  }
}
