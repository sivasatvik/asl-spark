// src/screens/LessonScreen.js
// Displays the word grid and progress for the currently selected lesson.

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import WordCard from '../components/WordCard';

export default function LessonScreen({ lesson, lessonId, completedWords, onWordPress }) {
  const doneCt = lesson.words.filter((_, i) => completedWords.has(`${lessonId}-${i}`)).length;
  const pct    = lesson.words.length > 0 ? doneCt / lesson.words.length : 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.tag}>Lesson {lessonId + 1} · {lesson.words.length} Signs</Text>
        <Text style={styles.title}>{lesson.icon} {lesson.name}</Text>
        <Text style={styles.desc}>{lesson.desc}</Text>
      </View>

      {/* Progress */}
      <View style={styles.progRow}>
        <Text style={styles.progLabel}>{doneCt}/{lesson.words.length} learned</Text>
        <View style={styles.progTrack}>
          <View style={[styles.progFill, { width: `${pct * 100}%` }]} />
        </View>
        <Text style={styles.progLabel}>{Math.round(pct * 100)}%</Text>
      </View>

      {/* Word grid */}
      <View style={styles.grid}>
        {lesson.words.map((w, i) => (
          <WordCard
            key={i}
            word={w}
            completed={completedWords.has(`${lessonId}-${i}`)}
            onPress={() => onWordPress(i)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content:   { padding: SPACING.lg, paddingBottom: 48 },

  header:  { marginBottom: 20 },
  tag:     { fontSize: 11, fontWeight: '700', letterSpacing: 2, color: COLORS.accent, textTransform: 'uppercase', marginBottom: 4 },
  title:   { fontSize: 26, fontWeight: '800', color: COLORS.text, letterSpacing: -0.5, marginBottom: 6 },
  desc:    { fontSize: 14, color: COLORS.muted, lineHeight: 22 },

  progRow:   { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 },
  progLabel: { fontSize: 12, color: COLORS.muted, minWidth: 55 },
  progTrack: { flex: 1, height: 6, backgroundColor: COLORS.border, borderRadius: 999, overflow: 'hidden' },
  progFill:  { height: '100%', backgroundColor: COLORS.accent, borderRadius: 999 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
});