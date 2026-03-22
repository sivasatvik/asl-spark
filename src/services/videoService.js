// src/services/videoService.js
//
// AI Video Generation via D-ID API
// ─────────────────────────────────────────────────────────────────────────────
// D-ID generates realistic talking/signing avatar videos from a text prompt.
//
// SETUP:
//   1. Create a free account at https://www.d-id.com
//   2. Copy your API key from the dashboard
//   3. Create a .env file in your project root:
//        D_ID_API_KEY=your_key_here
//   4. Run: npx expo install expo-constants
//
// HOW IT WORKS:
//   - Step 1: POST to /talks  → D-ID queues the video and returns a talk ID
//   - Step 2: GET  /talks/:id → Poll until status === 'done', then grab result_url
//
// Each word's `videoPrompt` field (in lessons.js) is used as the script
// so D-ID knows exactly what hand movement to demonstrate.
//
// COST: D-ID free tier gives ~20 videos/month. For more, use their Lite plan.
// ─────────────────────────────────────────────────────────────────────────────

import Constants from 'expo-constants';

const D_ID_BASE = 'https://api.d-id.com';

// Default presenter avatar — replace with your own D-ID avatar URL if desired
const DEFAULT_PRESENTER_URL =
  'https://d-id-public-bucket.s3.amazonaws.com/alice.jpg';

// Read API key from environment / Expo config
function getApiKey() {
  return (
    Constants.expoConfig?.extra?.DID_API_KEY ||
    process.env.D_ID_API_KEY ||
    ''
  );
}

/**
 * Requests a new AI video from D-ID for a given ASL word.
 * @param {string} prompt  - The videoPrompt string from the word object
 * @param {string} word    - The ASL word (e.g. "HELLO") — used for logging
 * @returns {Promise<string>} - Resolves to the video URL once ready
 */
export async function generateSignVideo(prompt, word) {
  const apiKey = getApiKey();

  if (!apiKey) {
    throw new Error(
      'D-ID API key not found.\n' +
      'Add D_ID_API_KEY to your .env file and restart the Expo server.'
    );
  }

  console.log(`[VideoService] Requesting video for: ${word}`);

  // ── Step 1: Create the talk ──────────────────────────────────────────────
  const createRes = await fetch(`${D_ID_BASE}/talks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(apiKey + ':')}`,
    },
    body: JSON.stringify({
      source_url: DEFAULT_PRESENTER_URL,
      script: {
        type: 'text',
        input: prompt,
        provider: {
          type: 'microsoft',
          voice_id: 'en-US-JennyNeural',
        },
      },
      config: { fluent: true, pad_audio: 0 },
    }),
  });

  if (!createRes.ok) {
    const err = await createRes.json().catch(() => ({}));
    throw new Error(`D-ID create failed: ${err.message || createRes.status}`);
  }

  const { id: talkId } = await createRes.json();
  console.log(`[VideoService] Talk created: ${talkId}`);

  // ── Step 2: Poll until done ──────────────────────────────────────────────
  return pollForVideo(talkId, apiKey);
}

/**
 * Polls D-ID every 2 seconds until the video is ready, then returns its URL.
 * @param {string} talkId
 * @param {string} apiKey
 * @returns {Promise<string>} video URL
 */
async function pollForVideo(talkId, apiKey, attempts = 0) {
  if (attempts > 30) {
    throw new Error('Video generation timed out after 60 seconds.');
  }

  await sleep(2000);

  const res = await fetch(`${D_ID_BASE}/talks/${talkId}`, {
    headers: { Authorization: `Basic ${btoa(apiKey + ':')}` },
  });

  if (!res.ok) throw new Error(`D-ID poll failed: ${res.status}`);

  const data = await res.json();

  if (data.status === 'done') {
    console.log(`[VideoService] Video ready: ${data.result_url}`);
    return data.result_url;
  }

  if (data.status === 'error') {
    throw new Error(`D-ID video error: ${data.error?.description}`);
  }

  // Still processing — poll again
  return pollForVideo(talkId, apiKey, attempts + 1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Generates videos for every word in every lesson.
 * Useful for a one-time pre-generation script.
 * @param {Array} lessons   - Full lessons array from lessons.js
 * @param {Function} onProgress - Called with (lessonName, word, videoUrl)
 * @returns {Promise<Object>} - Map of "lessonId-wordIndex" → videoUrl
 */
export async function generateAllVideos(lessons, onProgress) {
  const results = {};

  for (const lesson of lessons) {
    for (let i = 0; i < lesson.words.length; i++) {
      const word = lesson.words[i];
      const key  = `${lesson.id}-${i}`;
      try {
        const url = await generateSignVideo(word.videoPrompt, word.word);
        results[key] = url;
        onProgress?.(lesson.name, word.word, url);
      } catch (err) {
        console.error(`[VideoService] Failed for ${word.word}:`, err.message);
        results[key] = null;
      }
    }
  }

  return results;
}