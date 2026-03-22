// src/data/lessons.js
//
// Each word has a `videoKey` that maps to VIDEO_REGISTRY in videoRegistry.js.
// Format: "folder/FILENAME"  (no extension)
//
// To add a video: drop the .mp4 into assets/videos/<folder>/ — done.
// If the file is missing, a warning is logged and the placeholder shows.

export const LESSONS = [
  {
    id: 0,
    name: 'Greetings',
    icon: '👋',
    unlocked: true,
    completed: false,
    desc: 'Start your ASL journey with everyday greetings and polite expressions.',
    words: [
      {
        word: 'HELLO',     videoKey: 'greetings/HELLO',
        emoji: '👋', hand: '👋', cat: 'Greeting', diff: 1,
        desc: 'Open your hand and wave from your forehead outward. Keep fingers together, palm facing out.',
        tips: ['Start with hand near your forehead', 'Move hand smoothly outward and down', 'Keep a relaxed smile — expression matters in ASL!'],
      },
      {
        word: 'THANK YOU', videoKey: 'greetings/THANK_YOU',
        emoji: '🙏', hand: '🤲', cat: 'Polite', diff: 1,
        desc: 'Touch your chin with fingertips, then move your hand outward toward the person.',
        tips: ['Fingers together, palm facing you', 'Move outward like blowing a kiss of gratitude', 'Facial expression should be warm and genuine'],
      },
      {
        word: 'PLEASE',    videoKey: 'greetings/PLEASE',
        emoji: '😊', hand: '🖐️', cat: 'Polite', diff: 1,
        desc: 'Place your open hand on your chest and move it in a circular motion.',
        tips: ['Flat hand on the center of your chest', 'Circle clockwise from your perspective', 'Typically paired with a slight nod'],
      },
      {
        word: 'SORRY',     videoKey: 'greetings/SORRY',
        emoji: '😔', hand: '✊', cat: 'Polite', diff: 2,
        desc: 'Make a fist and rub it in a circular motion over your chest/heart area.',
        tips: ['Closed fist, not too tight', 'Circle over the heart', 'A slight downward gaze reinforces the meaning'],
      },
      {
        word: 'GOODBYE',   videoKey: 'greetings/GOODBYE',
        emoji: '👋', hand: '🖐️', cat: 'Greeting', diff: 1,
        desc: 'Open hand and wave at shoulder height, similar to a natural wave goodbye.',
        tips: ['Palm faces outward', 'Relaxed wave 2–3 times', 'Friendly facial expression throughout'],
      },
    ],
  },
  {
    id: 1,
    name: 'Numbers 1–10',
    icon: '🔢',
    unlocked: true,
    completed: false,
    desc: 'Learn to count from 1 to 10 — essential for phone numbers, ages and more.',
    words: [
      { word: 'ONE',   videoKey: 'numbers/ONE',   emoji: '1️⃣', hand: '☝️',  cat: 'Number', diff: 1, desc: 'Hold up your index finger with the rest closed into a fist.',                                    tips: ['Index finger pointing straight up', 'Other fingers folded', 'Palm can face inward or outward'] },
      { word: 'TWO',   videoKey: 'numbers/TWO',   emoji: '2️⃣', hand: '✌️',  cat: 'Number', diff: 1, desc: 'Extend your index and middle fingers upward, keeping the rest closed.',                       tips: ['Classic peace-sign shape', 'Fingers can be together or slightly spread', 'Keep wrist steady'] },
      { word: 'THREE', videoKey: 'numbers/THREE', emoji: '3️⃣', hand: '🤟',  cat: 'Number', diff: 1, desc: 'Extend your thumb, index finger, and middle finger.',                                         tips: ['Thumb points to the side', 'Index and middle point up', 'Ring and pinky folded'] },
      { word: 'FOUR',  videoKey: 'numbers/FOUR',  emoji: '4️⃣', hand: '🖖',  cat: 'Number', diff: 2, desc: 'Extend all four fingers upward with the thumb tucked in.',                                    tips: ['Four fingers spread and pointing up', 'Thumb folds across palm', 'Keep fingers straight'] },
      { word: 'FIVE',  videoKey: 'numbers/FIVE',  emoji: '5️⃣', hand: '🖐️', cat: 'Number', diff: 1, desc: 'Spread all five fingers open wide.',                                                           tips: ['All five fingers extended', 'Palm faces outward', 'Relax your hand — no tension'] },
      { word: 'SIX',   videoKey: 'numbers/SIX',   emoji: '6️⃣', hand: '🤙',  cat: 'Number', diff: 2, desc: 'Touch your pinky to your thumb while keeping other fingers extended.',                       tips: ['Pinky touches thumb tip', 'Middle three fingers point up', 'Palm faces outward'] },
      { word: 'SEVEN', videoKey: 'numbers/SEVEN', emoji: '7️⃣', hand: '🖐️', cat: 'Number', diff: 2, desc: 'Touch your ring finger to your thumb while keeping other fingers extended.',                 tips: ['Ring finger touches thumb', 'Other fingers remain up', 'Clean, deliberate touch'] },
      { word: 'EIGHT', videoKey: 'numbers/EIGHT', emoji: '8️⃣', hand: '✌️',  cat: 'Number', diff: 2, desc: 'Touch your middle finger to your thumb while keeping other fingers extended.',               tips: ['Middle finger touches thumb', 'Index, ring, and pinky stay up', 'Keep the touch light'] },
      { word: 'NINE',  videoKey: 'numbers/NINE',  emoji: '9️⃣', hand: '☝️',  cat: 'Number', diff: 2, desc: 'Touch your index finger to your thumb while other fingers remain extended.',                 tips: ['Index finger curls to touch thumb', 'Other three fingers extended', 'Similar to the OK shape'] },
      { word: 'TEN',   videoKey: 'numbers/TEN',   emoji: '🔟', hand: '🤙',  cat: 'Number', diff: 1, desc: 'Make a thumbs-up and shake your wrist side to side.',                                         tips: ['Thumb points up', 'Shake/wiggle wrist', 'Small, controlled motion'] },
    ],
  },
  {
    id: 2,
    name: 'Family',
    icon: '👨‍👩‍👧',
    unlocked: true,
    completed: false,
    desc: 'Express family relationships and the people closest to you.',
    words: [
      { word: 'MOTHER',  videoKey: 'family/MOTHER',  emoji: '👩',      hand: '🖐️', cat: 'Family', diff: 2, desc: 'Touch your chin with the thumb of your open hand, fingers spread.',                                             tips: ['Thumb touches chin', 'Fingers spread wide', 'Dominant hand only'] },
      { word: 'FATHER',  videoKey: 'family/FATHER',  emoji: '👨',      hand: '🖐️', cat: 'Family', diff: 2, desc: 'Touch your forehead with the thumb of your open hand, fingers spread.',                                        tips: ['Thumb touches forehead', 'Fingers spread upward', 'Mirror of MOTHER — forehead vs chin'] },
      { word: 'SISTER',  videoKey: 'family/SISTER',  emoji: '👧',      hand: '🤙',  cat: 'Family', diff: 3, desc: 'A two-part sign: start at the cheek, then bring hands together with index fingers pointing.',                  tips: ['Start at cheek with A-hand', 'Move hand down to meet other hand', 'Index fingers point together at end'] },
      { word: 'BROTHER', videoKey: 'family/BROTHER', emoji: '👦',      hand: '🤙',  cat: 'Family', diff: 3, desc: 'A two-part sign: start at the forehead, then bring hands together with index fingers pointing.',               tips: ['Start at forehead with A-hand', 'Move hand down to meet other hand', 'Index fingers point together at end'] },
      { word: 'BABY',    videoKey: 'family/BABY',    emoji: '👶',      hand: '🤲',  cat: 'Family', diff: 1, desc: 'Cradle your arms as if holding a baby and rock them side to side.',                                           tips: ['One arm rests in the other', 'Rock gently side to side', 'Soft, gentle motion'] },
      { word: 'FAMILY',  videoKey: 'family/FAMILY',  emoji: '👨‍👩‍👧', hand: '🖐️', cat: 'Family', diff: 2, desc: 'Both hands form F-shapes, start with fingertips touching, then circle outward to meet again.',                 tips: ['Both hands make F-shape', 'Start with index fingers and thumbs touching', 'Circle outward and return'] },
    ],
  },
  {
    id: 3,
    name: 'Colors',
    icon: '🎨',
    unlocked: true,
    completed: false,
    desc: 'Describe the world around you with vibrant color signs.',
    words: [
      { word: 'RED',    videoKey: 'colors/RED',    emoji: '🔴', hand: '☝️',  cat: 'Color', diff: 1, desc: 'Point your index finger at your lips and brush it downward slightly.',                         tips: ['Touch or point near lips', 'Single downward brush', 'Think of red lips'] },
      { word: 'BLUE',   videoKey: 'colors/BLUE',   emoji: '🔵', hand: '🤙',  cat: 'Color', diff: 1, desc: 'Make a B-handshape and twist your wrist side to side.',                                        tips: ['B-handshape: four fingers together, thumb tucked', 'Slight wrist twist', 'Keep movement small'] },
      { word: 'GREEN',  videoKey: 'colors/GREEN',  emoji: '🟢', hand: '✌️',  cat: 'Color', diff: 1, desc: 'Make a G-handshape and twist your wrist side to side.',                                        tips: ['G-handshape: index and thumb extended', 'Twist wrist gently', 'Similar motion to BLUE'] },
      { word: 'YELLOW', videoKey: 'colors/YELLOW', emoji: '🟡', hand: '🤙',  cat: 'Color', diff: 2, desc: 'Make a Y-handshape (thumb and pinky out) and twist your wrist.',                               tips: ['Y-handshape: thumb and pinky extended', 'Wrist twist motion', 'Other fingers stay folded'] },
      { word: 'BLACK',  videoKey: 'colors/BLACK',  emoji: '⬛', hand: '☝️',  cat: 'Color', diff: 1, desc: 'Draw your index finger across your forehead from left to right.',                              tips: ['Index finger extended', 'Swipe across forehead', 'One smooth motion'] },
      { word: 'WHITE',  videoKey: 'colors/WHITE',  emoji: '⬜', hand: '🖐️', cat: 'Color', diff: 2, desc: 'Place your open hand on your chest, then pull it away while closing your fingers.',            tips: ['Start with open hand on chest', 'Pull away and close to a flat O', 'Think of pulling a white shirt away'] },
    ],
  },
  {
    id: 4,
    name: 'Emotions',
    icon: '😄',
    unlocked: true,
    completed: false,
    desc: 'Share how you feel — facial expressions are a huge part of ASL.',
    words: [
      { word: 'HAPPY',   videoKey: 'emotions/HAPPY',   emoji: '😄', hand: '🖐️', cat: 'Emotion', diff: 1, desc: 'Brush your open hand upward on your chest in a repeated motion.',                                                    tips: ['Flat hand, palm toward you', 'Brush upward twice', 'A big smile is essential!'] },
      { word: 'SAD',     videoKey: 'emotions/SAD',     emoji: '😢', hand: '🤲',  cat: 'Emotion', diff: 1, desc: 'Hold both open hands in front of your face and move them slowly downward.',                                          tips: ['Both hands at face level', 'Move down slowly', 'Downcast expression reinforces it'] },
      { word: 'ANGRY',   videoKey: 'emotions/ANGRY',   emoji: '😠', hand: '✊',  cat: 'Emotion', diff: 2, desc: 'Claw your hand in front of your face and pull it away with tension.',                                               tips: ['Claw/bent fingers', 'Pull away from face tensely', 'Furrowed brow is part of the sign'] },
      { word: 'LOVE',    videoKey: 'emotions/LOVE',    emoji: '❤️', hand: '🤟',  cat: 'Emotion', diff: 1, desc: 'Cross both arms over your chest in a self-hug motion.',                                                             tips: ['Cross arms at wrists over chest', 'Like hugging yourself', 'Warm, genuine expression'] },
      { word: 'EXCITED', videoKey: 'emotions/EXCITED', emoji: '🤩', hand: '🖐️', cat: 'Emotion', diff: 2, desc: 'Alternately brush both middle fingers upward on your chest in quick, light strokes.',                               tips: ['Use middle fingers only', 'Alternate hands quickly', 'Bright, energetic expression'] },
      { word: 'TIRED',   videoKey: 'emotions/TIRED',   emoji: '😴', hand: '🤲',  cat: 'Emotion', diff: 2, desc: 'Bend both elbows with fingertips on chest, then let your hands drop and shoulders sag.',                            tips: ['Start with both hands on chest', 'Drop hands downward', 'Let your posture sag — expression is everything'] },
    ],
  },
  {
    id: 5,
    name: 'Food & Drink',
    icon: '🍎',
    unlocked: true,
    completed: false,
    desc: 'Order, describe, and talk about food and drinks in ASL.',
    words: [
      { word: 'EAT',   videoKey: 'food/EAT',   emoji: '🍽️', hand: '🤌', cat: 'Food',  diff: 1, desc: 'Bring a flat O-hand to your mouth as if putting food in.',                          tips: ['Flat O-shape: fingertips touch thumb', 'Move toward mouth', 'Repeat the motion once or twice'] },
      { word: 'WATER', videoKey: 'food/WATER', emoji: '💧',  hand: '✌️', cat: 'Drink', diff: 1, desc: 'Make a W-handshape and tap it to your chin twice.',                                 tips: ['W-shape: index, middle, ring fingers up', 'Tap chin twice', 'Think of water touching your lips'] },
      { word: 'MILK',  videoKey: 'food/MILK',  emoji: '🥛',  hand: '✊', cat: 'Drink', diff: 1, desc: 'Open and close your fist as if milking a cow, moving downward.',                    tips: ['Squeeze and release fist', 'One or two squeezes', 'Dominant hand only'] },
      { word: 'APPLE', videoKey: 'food/APPLE', emoji: '🍎',  hand: '☝️', cat: 'Food',  diff: 2, desc: 'Bend your index finger and twist it against your cheek.',                           tips: ['Bent/hooked index finger', 'Place at cheek and twist', 'Think of a screw going in'] },
      { word: 'BREAD', videoKey: 'food/BREAD', emoji: '🍞',  hand: '🤲', cat: 'Food',  diff: 2, desc: 'Draw a slicing motion across the back of your non-dominant hand.',                  tips: ['Non-dominant hand stays still', 'Slice across knuckles 2–3 times', 'Like slicing a loaf of bread'] },
    ],
  },
];