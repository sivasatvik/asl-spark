// src/components/VideoPlayer.js
//
// Looks up the word's video from VIDEO_REGISTRY (safe, no crash on missing files).
// - Video found + native build  → plays the .mp4 via expo-av
// - Video missing               → logs a warning, shows animated placeholder
// - Expo Go (no expo-av)        → shows animated placeholder with a hint

import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';
import { VIDEO_REGISTRY } from '../data/videoRegistry';

// Soft-import expo-av so the app doesn't crash in Expo Go
let Video, ResizeMode;
try {
  const av = require('expo-av');
  Video      = av.Video;
  ResizeMode = av.ResizeMode;
} catch {
  Video      = null;
  ResizeMode = null;
}

export default function VideoPlayer({ word }) {
  const videoSource = VIDEO_REGISTRY[word.videoKey] ?? null;
  const [videoError, setVideoError] = useState(false);

  // Reset error state when word changes
  useEffect(() => { setVideoError(false); }, [word.word]);

  // ── Animated placeholder ────────────────────────────────────────────────
  const pulse    = useRef(new Animated.Value(1)).current;
  const handAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse,    { toValue: 1.08, duration: 1200, useNativeDriver: true }),
        Animated.timing(pulse,    { toValue: 1,    duration: 1200, useNativeDriver: true }),
      ])
    );
    const handLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(handAnim, { toValue: 1,  duration: 750, useNativeDriver: true }),
        Animated.timing(handAnim, { toValue: -1, duration: 750, useNativeDriver: true }),
        Animated.timing(handAnim, { toValue: 0,  duration: 750, useNativeDriver: true }),
      ])
    );
    pulseLoop.start();
    handLoop.start();
    return () => { pulseLoop.stop(); handLoop.stop(); };
  }, [word.word]);

  const handRotate = handAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-15deg', '0deg', '15deg'],
  });

  const avatars = ['🧑', '👩', '🧑‍🦱', '👩‍🦰', '🧑‍🦲'];
  const avatar  = avatars[word.word.length % 5];

  // ── Decide what status pill to show ────────────────────────────────────
  let pillColor = COLORS.accent;
  let pillLabel = 'AI Instructor · Live Demo';

  if (!videoSource) {
    pillColor = '#f59e0b';                        // amber warning
    pillLabel = `No video yet · ${word.word}`;
  } else if (!Video) {
    pillColor = '#f59e0b';
    pillLabel = 'Native build required';
  } else if (videoError) {
    pillColor = COLORS.error;
    pillLabel = 'Video failed to load';
  } else {
    pillLabel = `AI Instructor · ${word.word}`;
  }

  // ── Play real video ─────────────────────────────────────────────────────
  if (videoSource && Video && !videoError) {
    return (
      <View style={styles.container}>
        <Video
          source={videoSource}
          style={styles.video}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping
          onError={() => {
            console.warn(`[VideoPlayer] Failed to play video for: ${word.word}`);
            setVideoError(true);
          }}
        />
        <View style={styles.pill}>
          <View style={[styles.dot, { backgroundColor: pillColor }]} />
          <Text style={styles.pillText}>{pillLabel}</Text>
        </View>
      </View>
    );
  }

  // ── Animated placeholder ────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      <View style={styles.pill}>
        <View style={[styles.dot, { backgroundColor: pillColor }]} />
        <Text style={[styles.pillText, { color: pillColor }]}>{pillLabel}</Text>
      </View>

      <Animated.View style={[styles.avatarCircle, { transform: [{ scale: pulse }] }]}>
        <Text style={{ fontSize: 52 }}>{avatar}</Text>
      </Animated.View>

      <Animated.Text style={[styles.handSign, { transform: [{ rotate: handRotate }] }]}>
        {word.hand}
      </Animated.Text>

      <View style={styles.wordLabel}>
        <Text style={styles.wordLabelText}>{word.word}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#0d1520',
    borderRadius: 22,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  video: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    width: '100%', height: '100%',
  },
  pill: {
    position: 'absolute', top: 12, left: 12,
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 12, paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    zIndex: 2,
  },
  dot:      { width: 7, height: 7, borderRadius: 4 },
  pillText: { fontSize: 11, color: COLORS.accent, fontWeight: '600' },

  avatarCircle: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: COLORS.surface2,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'rgba(79,255,176,0.2)',
  },
  handSign: {
    fontSize: 48,
    position: 'absolute',
    bottom: 24, right: 36,
  },
  wordLabel: {
    position: 'absolute', bottom: 12, left: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12, paddingVertical: 5,
    borderRadius: 8,
  },
  wordLabelText: { fontSize: 13, fontWeight: '800', color: COLORS.text },
});