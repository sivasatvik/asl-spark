# asl-spark — Learn ASL with AI

> A structured, lesson-by-lesson American Sign Language learning app. Runs on **iOS, Android, and Web** from a single React Native / Expo codebase.

---

## Features

- **6 structured lessons** — Greetings, Numbers 1–10, Family, Colors, Emotions, Food & Drink
- **Local video playback** — drop `.mp4` files into `assets/videos/` and they play automatically per word
- **Graceful fallback** — missing videos show an animated placeholder and a console warning, never a crash
- **XP & progress tracking** — earn XP per word, track completion per lesson
- **Cross-platform** — one codebase for iOS, Android, and web via Expo
- **Modular architecture** — data, components, screens, and services are fully separated

---

## Project Structure

```
asl-spark/
├── App.js                              # Root — wires state + all modules
├── assets/
│   └── videos/                         # ← drop your .mp4 files here
│       ├── greetings/
│       ├── numbers/
│       ├── family/
│       ├── colors/
│       ├── emotions/
│       └── food/
└── src/
    ├── data/
    │   ├── lessons.js                  # All lesson & word content
    │   └── videoRegistry.js            # Safe static require() map for all videos
    ├── constants/
    │   └── theme.js                    # Colors, spacing, radius tokens
    ├── components/
    │   ├── VideoPlayer.js              # Plays local video or animated placeholder
    │   ├── WordCard.js                 # Tappable word tile in the grid
    │   ├── WordModal.js                # Full word detail sheet with video
    │   ├── Sidebar.js                  # Lesson list nav panel
    │   ├── LessonRow.js                # Single lesson nav item
    │   └── Toast.js                    # XP / completion notification
    └── screens/
        └── LessonScreen.js             # Word grid + progress bar for one lesson
```

---

## Getting Started

### Prerequisites

- [Node.js LTS](https://nodejs.org) (v18 or later)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

```bash
npm install -g expo-cli
```

### Installation

```bash
git clone https://github.com/sivasatvik/asl-spark.git
cd asl-spark
npm install
npx expo install expo-av
```

### Running the app

```bash
npx expo start
```

| Key | Platform |
|-----|----------|
| `w` | Web browser |
| `i` | iOS Simulator (requires Xcode) |
| `a` | Android Emulator (requires Android Studio) |
| Scan QR | Physical device via **Expo Go** app |

> **Note:** Video playback via `expo-av` requires a native build. Run `npx expo run:ios` or `npx expo run:android` instead of `npx expo start` to enable it. The app runs fine without it — missing videos show the animated placeholder.

---

## Adding Videos

Each word already has a `videoKey` assigned in `lessons.js`. All you need to do is drop the correctly named `.mp4` file into the right folder.

### Folder & filename reference

| Lesson | Folder | Files |
|--------|--------|-------|
| Greetings | `assets/videos/greetings/` | `HELLO.mp4` `THANK_YOU.mp4` `PLEASE.mp4` `SORRY.mp4` `GOODBYE.mp4` |
| Numbers | `assets/videos/numbers/` | `ONE.mp4` `TWO.mp4` `THREE.mp4` `FOUR.mp4` `FIVE.mp4` `SIX.mp4` `SEVEN.mp4` `EIGHT.mp4` `NINE.mp4` `TEN.mp4` |
| Family | `assets/videos/family/` | `MOTHER.mp4` `FATHER.mp4` `SISTER.mp4` `BROTHER.mp4` `BABY.mp4` `FAMILY.mp4` |
| Colors | `assets/videos/colors/` | `RED.mp4` `BLUE.mp4` `GREEN.mp4` `YELLOW.mp4` `BLACK.mp4` `WHITE.mp4` |
| Emotions | `assets/videos/emotions/` | `HAPPY.mp4` `SAD.mp4` `ANGRY.mp4` `LOVE.mp4` `EXCITED.mp4` `TIRED.mp4` |
| Food & Drink | `assets/videos/food/` | `EAT.mp4` `WATER.mp4` `MILK.mp4` `APPLE.mp4` `BREAD.mp4` |

### Video states

| Situation | Status pill | Behavior |
|-----------|-------------|----------|
| `.mp4` present + native build | 🟢 Green — `AI Instructor · WORD` | Video plays and loops |
| `.mp4` missing | 🟡 Amber — `No video yet · WORD` | Animated placeholder + console warning |
| `.mp4` present + Expo Go | 🟡 Amber — `Native build required` | Animated placeholder |
| `.mp4` present but fails to load | 🔴 Red — `Video failed to load` | Animated placeholder |

Missing videos never crash the app. A warning is logged to the console:
```
[VideoRegistry] Missing video: assets/videos/greetings/HELLO.mp4
```

---

## Adding Lessons & Words

### Adding a word to an existing lesson

Open `src/data/lessons.js` and add an entry to the lesson's `words` array:

```js
{
  word: 'WATER',
  videoKey: 'food/WATER',       // matches assets/videos/food/WATER.mp4
  emoji: '💧',
  hand: '✌️',                   // emoji representing the handshape
  cat: 'Drink',
  diff: 1,                      // 1 = Beginner, 2 = Intermediate, 3 = Advanced
  desc: 'Make a W-handshape and tap it to your chin twice.',
  tips: [
    'W-shape: index, middle, ring fingers up',
    'Tap chin twice',
    'Think of water touching your lips',
  ],
}
```

Then register the video in `src/data/videoRegistry.js`:

```js
let v_food_WATER;
try { v_food_WATER = require('../../assets/videos/food/WATER.mp4'); } catch { v_food_WATER = warn('food/WATER.mp4'); }

// and add to the export map:
'food/WATER': v_food_WATER,
```

### Adding a new lesson

1. Add a new lesson object to the `LESSONS` array in `src/data/lessons.js`
2. Add a folder under `assets/videos/` for the new lesson
3. Register each video in `src/data/videoRegistry.js`

---

## Deployment

### Web — GitHub Pages

```bash
npx expo export --platform web
# Push the dist/ folder to your gh-pages branch
```

### iOS & Android — EAS Build

```bash
npm install -g eas-cli
eas build --platform ios
eas build --platform android
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React Native + Expo |
| Web | Expo for Web |
| Video playback | `expo-av` (local `.mp4` files) |
| State management | React `useState` / `useRef` |
| Navigation | React Native built-in |

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit: `git commit -m 'feat: add new lesson'`
4. Push and open a Pull Request

---

## License

[GPL v3](https://www.gnu.org/licenses/gpl-3.0.en.html) © [sivasatvik](https://github.com/sivasatvik)