// src/components/WordCard.js
// Tappable card showing an ASL word with completion state and difficulty.

import React, { useRef } from 'react';
import { Animated, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { COLORS, RADIUS } from '../constants/theme';

export default function WordCard({ word, completed, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn  = () => Animated.spring(scale, { toValue: 0.94, useNativeDriver: true }).start();
  const onPressOut = () => Animated.spring(scale, { toValue: 1,    useNativeDriver: true }).start();

  return (
    <Animated.View style={[styles.wrapper, { transform: [{ scale }] }]}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[styles.card, completed && styles.cardDone]}
      >
        {/* Thumbnail */}
        <View style={styles.thumb}>
          <Text style={styles.emoji}>{word.emoji}</Text>
          {completed && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>✓</Text>
            </View>
          )}
        </View>

        {/* Info */}
        <View style={styles.body}>
          <Text style={styles.word}>{word.word}</Text>
          <Text style={styles.cat}>{word.cat}</Text>
          <View style={styles.diffRow}>
            {[1, 2, 3].map(d => (
              <View key={d} style={[styles.dot, d <= word.diff && styles.dotFilled]} />
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: { width: '48%', marginBottom: 14 },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  cardDone: { borderColor: 'rgba(79,255,176,0.4)' },

  thumb: {
    aspectRatio: 16 / 10,
    backgroundColor: COLORS.surface2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  emoji: { fontSize: 36 },
  badge: {
    position: 'absolute', top: 8, right: 8,
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: COLORS.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  badgeText: { fontSize: 11, fontWeight: '700', color: '#000' },

  body:    { padding: 12 },
  word:    { fontSize: 14, fontWeight: '800', color: COLORS.text },
  cat:     { fontSize: 11, color: COLORS.muted, marginTop: 2 },
  diffRow: { flexDirection: 'row', gap: 4, marginTop: 8 },
  dot:       { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.border },
  dotFilled: { backgroundColor: COLORS.accent },
});