# SignPath — Learn ASL with AI

> **asl-spark** · A structured, lesson-by-lesson American Sign Language learning app powered by AI-generated instructor videos. Runs on iOS, Android, and Web from a single codebase.

---

## Features

- **6 structured lessons** — Greetings, Numbers, Family, Colors, Emotions, Food & Drink
- **AI-generated videos** — Each sign has a unique AI instructor video via the D-ID API
- **XP & progress tracking** — Earn XP as you learn, track completion per lesson
- **Cross-platform** — One codebase runs on iOS, Android, and web browser via Expo
- **Animated placeholder** — Beautiful fallback while videos are being generated
- **Modular architecture** — Clean separation of data, components, screens, and services

---

## Project Structure

```
asl-spark/
├── App.js                          # Root — wires state + all modules together
├── src/
│   ├── data/
│   │   └── lessons.js              # All lesson & word data (content lives here)
│   ├── constants/
│   │   └── theme.js                # Colors, spacing, radius design tokens
│   ├── services/
│   │   └── videoService.js         # D-ID AI video generation API calls
│   ├── components/
│   │   ├── Sidebar.js              # Lesson list nav panel
│   │   ├── LessonRow.js            # Single lesson nav item
│   │   ├── WordCard.js             # Tappable word tile in the grid
│   │   ├── VideoPlayer.js          # AI video + animated placeholder
│   │   ├── WordModal.js            # Full word detail sheet with video
│   │   └── Toast.js                # XP / completion notifications
│   └── screens/
│       └── LessonScreen.js         # Word grid + progress for one lesson
└── .env                            # API keys (never commit this)
```

---

## Getting Started

### Prerequisites

- [Node.js LTS](https://nodejs.org) (v18 or later)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

```bash
npm install -g expo-cli eas-cli
```

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/sivasatvik/asl-spark.git
cd asl-spark

# 2. Install dependencies
npm install

# 3. Install Expo-specific packages
npx expo install expo-av expo-constants expo-linear-gradient
```

### Running the App

```bash
npx expo start
```

Then press:
| Key | Platform |
|-----|----------|
| `w` | Web browser (localhost) |
| `i` | iOS Simulator (requires Xcode on Mac) |
| `a` | Android Emulator (requires Android Studio) |
| Scan QR | Physical device via **Expo Go** app |

---

## AI Video Generation (D-ID Setup)

Each ASL word has a `videoPrompt` field that describes the sign. The app sends this to [D-ID](https://www.d-id.com) to generate a realistic AI instructor video.

### Setup

1. Create a free account at [d-id.com](https://www.d-id.com)
2. Copy your API key from the D-ID dashboard
3. Create a `.env` file in your project root:

```env
D_ID_API_KEY=your_api_key_here
```

4. Add to `app.json` under `expo.extra`:

```json
{
  "expo": {
    "extra": {
      "DID_API_KEY": "your_api_key_here"
    }
  }
}
```

5. Run `npx expo install expo-constants` if not already installed.

### How It Works

When a user taps **▶ Generate AI Video** on a word card:

1. The app sends the word's `videoPrompt` to D-ID's `/talks` endpoint
2. D-ID queues the video and returns a `talkId`
3. The app polls `/talks/:id` every 2 seconds until `status === 'done'`
4. The returned `result_url` is passed to `VideoPlayer` which plays it via `expo-av`

> **Free tier**: D-ID gives ~20 videos/month. For full lesson coverage, use their Lite plan (~$5.99/month).

---

## Adding Lessons & Words

All content lives in `src/data/lessons.js`. To add a new word:

```js
{
  word: 'WATER',
  emoji: '💧',
  hand: '✌️',           // emoji representing the handshape
  cat: 'Food',           // category label
  diff: 1,               // 1 = Beginner, 2 = Intermediate, 3 = Advanced
  desc: 'Make a W-handshape and tap it to your chin twice.',
  tips: [
    'W-shape: index, middle, ring fingers up',
    'Tap chin twice',
    'Think of water touching your lips',
  ],
  videoPrompt: 'A person demonstrates the ASL sign for WATER: makes a W-handshape and taps it to their chin twice.',
}
```

To add a full new lesson, copy an existing lesson object in the array and update the `id`, `name`, `icon`, `desc`, and `words`.

---

## Deployment

### Web (GitHub Pages)

```bash
npx expo export --platform web
# Then push the dist/ folder to your gh-pages branch
```

### iOS & Android (EAS Build)

```bash
eas build --platform ios
eas build --platform android
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React Native + Expo |
| Web support | Expo for Web |
| Video playback | `expo-av` |
| AI video generation | [D-ID API](https://www.d-id.com) |
| Navigation | React Native built-in (no extra router needed yet) |
| State management | React `useState` / `useRef` |

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -m 'feat: add new lesson'`
4. Push and open a Pull Request

---

## License

MIT © [sivasatvik](https://github.com/sivasatvik)