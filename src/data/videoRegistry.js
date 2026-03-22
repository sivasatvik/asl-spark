// src/data/videoRegistry.js
//
// Metro requires ALL require() paths to be static strings — no variables or
// template literals allowed. Each entry is written out explicitly and wrapped
// in its own try/catch so a missing file logs a warning instead of crashing.

function warn(file) {
  console.warn(`[VideoRegistry] Missing video: assets/videos/${file}`);
  return null;
}

// ── Greetings ──────────────────────────────────────────────────────────────
let v_greetings_HELLO;
try { v_greetings_HELLO = require('../../assets/videos/greetings/HELLO.mp4'); } catch { v_greetings_HELLO = warn('greetings/HELLO.mp4'); }

let v_greetings_THANK_YOU;
try { v_greetings_THANK_YOU = require('../../assets/videos/greetings/THANK_YOU.mp4'); } catch { v_greetings_THANK_YOU = warn('greetings/THANK_YOU.mp4'); }

let v_greetings_PLEASE;
try { v_greetings_PLEASE = require('../../assets/videos/greetings/PLEASE.mp4'); } catch { v_greetings_PLEASE = warn('greetings/PLEASE.mp4'); }

let v_greetings_SORRY;
try { v_greetings_SORRY = require('../../assets/videos/greetings/SORRY.mp4'); } catch { v_greetings_SORRY = warn('greetings/SORRY.mp4'); }

let v_greetings_GOODBYE;
try { v_greetings_GOODBYE = require('../../assets/videos/greetings/GOODBYE.mp4'); } catch { v_greetings_GOODBYE = warn('greetings/GOODBYE.mp4'); }

// ── Numbers ────────────────────────────────────────────────────────────────
let v_numbers_ONE;
try { v_numbers_ONE = require('../../assets/videos/numbers/ONE.mp4'); } catch { v_numbers_ONE = warn('numbers/ONE.mp4'); }

let v_numbers_TWO;
try { v_numbers_TWO = require('../../assets/videos/numbers/TWO.mp4'); } catch { v_numbers_TWO = warn('numbers/TWO.mp4'); }

let v_numbers_THREE;
try { v_numbers_THREE = require('../../assets/videos/numbers/THREE.mp4'); } catch { v_numbers_THREE = warn('numbers/THREE.mp4'); }

let v_numbers_FOUR;
try { v_numbers_FOUR = require('../../assets/videos/numbers/FOUR.mp4'); } catch { v_numbers_FOUR = warn('numbers/FOUR.mp4'); }

let v_numbers_FIVE;
try { v_numbers_FIVE = require('../../assets/videos/numbers/FIVE.mp4'); } catch { v_numbers_FIVE = warn('numbers/FIVE.mp4'); }

let v_numbers_SIX;
try { v_numbers_SIX = require('../../assets/videos/numbers/SIX.mp4'); } catch { v_numbers_SIX = warn('numbers/SIX.mp4'); }

let v_numbers_SEVEN;
try { v_numbers_SEVEN = require('../../assets/videos/numbers/SEVEN.mp4'); } catch { v_numbers_SEVEN = warn('numbers/SEVEN.mp4'); }

let v_numbers_EIGHT;
try { v_numbers_EIGHT = require('../../assets/videos/numbers/EIGHT.mp4'); } catch { v_numbers_EIGHT = warn('numbers/EIGHT.mp4'); }

let v_numbers_NINE;
try { v_numbers_NINE = require('../../assets/videos/numbers/NINE.mp4'); } catch { v_numbers_NINE = warn('numbers/NINE.mp4'); }

let v_numbers_TEN;
try { v_numbers_TEN = require('../../assets/videos/numbers/TEN.mp4'); } catch { v_numbers_TEN = warn('numbers/TEN.mp4'); }

// ── Family ─────────────────────────────────────────────────────────────────
let v_family_MOTHER;
try { v_family_MOTHER = require('../../assets/videos/family/MOTHER.mp4'); } catch { v_family_MOTHER = warn('family/MOTHER.mp4'); }

let v_family_FATHER;
try { v_family_FATHER = require('../../assets/videos/family/FATHER.mp4'); } catch { v_family_FATHER = warn('family/FATHER.mp4'); }

let v_family_SISTER;
try { v_family_SISTER = require('../../assets/videos/family/SISTER.mp4'); } catch { v_family_SISTER = warn('family/SISTER.mp4'); }

let v_family_BROTHER;
try { v_family_BROTHER = require('../../assets/videos/family/BROTHER.mp4'); } catch { v_family_BROTHER = warn('family/BROTHER.mp4'); }

let v_family_BABY;
try { v_family_BABY = require('../../assets/videos/family/BABY.mp4'); } catch { v_family_BABY = warn('family/BABY.mp4'); }

let v_family_FAMILY;
try { v_family_FAMILY = require('../../assets/videos/family/FAMILY.mp4'); } catch { v_family_FAMILY = warn('family/FAMILY.mp4'); }

// ── Colors ─────────────────────────────────────────────────────────────────
let v_colors_RED;
try { v_colors_RED = require('../../assets/videos/colors/RED.mp4'); } catch { v_colors_RED = warn('colors/RED.mp4'); }

let v_colors_BLUE;
try { v_colors_BLUE = require('../../assets/videos/colors/BLUE.mp4'); } catch { v_colors_BLUE = warn('colors/BLUE.mp4'); }

let v_colors_GREEN;
try { v_colors_GREEN = require('../../assets/videos/colors/GREEN.mp4'); } catch { v_colors_GREEN = warn('colors/GREEN.mp4'); }

let v_colors_YELLOW;
try { v_colors_YELLOW = require('../../assets/videos/colors/YELLOW.mp4'); } catch { v_colors_YELLOW = warn('colors/YELLOW.mp4'); }

let v_colors_BLACK;
try { v_colors_BLACK = require('../../assets/videos/colors/BLACK.mp4'); } catch { v_colors_BLACK = warn('colors/BLACK.mp4'); }

let v_colors_WHITE;
try { v_colors_WHITE = require('../../assets/videos/colors/WHITE.mp4'); } catch { v_colors_WHITE = warn('colors/WHITE.mp4'); }

// ── Emotions ───────────────────────────────────────────────────────────────
let v_emotions_HAPPY;
try { v_emotions_HAPPY = require('../../assets/videos/emotions/HAPPY.mp4'); } catch { v_emotions_HAPPY = warn('emotions/HAPPY.mp4'); }

let v_emotions_SAD;
try { v_emotions_SAD = require('../../assets/videos/emotions/SAD.mp4'); } catch { v_emotions_SAD = warn('emotions/SAD.mp4'); }

let v_emotions_ANGRY;
try { v_emotions_ANGRY = require('../../assets/videos/emotions/ANGRY.mp4'); } catch { v_emotions_ANGRY = warn('emotions/ANGRY.mp4'); }

let v_emotions_LOVE;
try { v_emotions_LOVE = require('../../assets/videos/emotions/LOVE.mp4'); } catch { v_emotions_LOVE = warn('emotions/LOVE.mp4'); }

let v_emotions_EXCITED;
try { v_emotions_EXCITED = require('../../assets/videos/emotions/EXCITED.mp4'); } catch { v_emotions_EXCITED = warn('emotions/EXCITED.mp4'); }

let v_emotions_TIRED;
try { v_emotions_TIRED = require('../../assets/videos/emotions/TIRED.mp4'); } catch { v_emotions_TIRED = warn('emotions/TIRED.mp4'); }

// ── Food & Drink ───────────────────────────────────────────────────────────
let v_food_EAT;
try { v_food_EAT = require('../../assets/videos/food/EAT.mp4'); } catch { v_food_EAT = warn('food/EAT.mp4'); }

let v_food_WATER;
try { v_food_WATER = require('../../assets/videos/food/WATER.mp4'); } catch { v_food_WATER = warn('food/WATER.mp4'); }

let v_food_MILK;
try { v_food_MILK = require('../../assets/videos/food/MILK.mp4'); } catch { v_food_MILK = warn('food/MILK.mp4'); }

let v_food_APPLE;
try { v_food_APPLE = require('../../assets/videos/food/APPLE.mp4'); } catch { v_food_APPLE = warn('food/APPLE.mp4'); }

let v_food_BREAD;
try { v_food_BREAD = require('../../assets/videos/food/BREAD.mp4'); } catch { v_food_BREAD = warn('food/BREAD.mp4'); }

// ── Export map (videoKey → asset) ──────────────────────────────────────────
export const VIDEO_REGISTRY = {
  'greetings/HELLO':     v_greetings_HELLO,
  'greetings/THANK_YOU': v_greetings_THANK_YOU,
  'greetings/PLEASE':    v_greetings_PLEASE,
  'greetings/SORRY':     v_greetings_SORRY,
  'greetings/GOODBYE':   v_greetings_GOODBYE,

  'numbers/ONE':         v_numbers_ONE,
  'numbers/TWO':         v_numbers_TWO,
  'numbers/THREE':       v_numbers_THREE,
  'numbers/FOUR':        v_numbers_FOUR,
  'numbers/FIVE':        v_numbers_FIVE,
  'numbers/SIX':         v_numbers_SIX,
  'numbers/SEVEN':       v_numbers_SEVEN,
  'numbers/EIGHT':       v_numbers_EIGHT,
  'numbers/NINE':        v_numbers_NINE,
  'numbers/TEN':         v_numbers_TEN,

  'family/MOTHER':       v_family_MOTHER,
  'family/FATHER':       v_family_FATHER,
  'family/SISTER':       v_family_SISTER,
  'family/BROTHER':      v_family_BROTHER,
  'family/BABY':         v_family_BABY,
  'family/FAMILY':       v_family_FAMILY,

  'colors/RED':          v_colors_RED,
  'colors/BLUE':         v_colors_BLUE,
  'colors/GREEN':        v_colors_GREEN,
  'colors/YELLOW':       v_colors_YELLOW,
  'colors/BLACK':        v_colors_BLACK,
  'colors/WHITE':        v_colors_WHITE,

  'emotions/HAPPY':      v_emotions_HAPPY,
  'emotions/SAD':        v_emotions_SAD,
  'emotions/ANGRY':      v_emotions_ANGRY,
  'emotions/LOVE':       v_emotions_LOVE,
  'emotions/EXCITED':    v_emotions_EXCITED,
  'emotions/TIRED':      v_emotions_TIRED,

  'food/EAT':            v_food_EAT,
  'food/WATER':          v_food_WATER,
  'food/MILK':           v_food_MILK,
  'food/APPLE':          v_food_APPLE,
  'food/BREAD':          v_food_BREAD,
};