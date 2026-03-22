// src/components/LessonRow.js
// A single lesson entry in the sidebar navigation.

import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { COLORS, RADIUS } from '../constants/theme';

export default function LessonRow({ lesson, active, onPress }) {
  return (
    <TouchableOpacity
      onPress={() => onPress(lesson.id)}
      activeOpacity={0.7}
      style={[styles.btn, active && styles.btnActive]}
    >
      <View style={[styles.icon, active && styles.iconActive]}>
        <Text style={{ fontSize: 18 }}>{lesson.icon}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={[styles.name, active && { color: COLORS.accent }]}>
          {lesson.name}
        </Text>
        <Text style={styles.count}>{lesson.words.length} signs</Text>
      </View>

      {lesson.completed && (
        <View style={styles.done}>
          <Text style={{ fontSize: 10, fontWeight: '700', color: '#000' }}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    padding: 11, borderRadius: RADIUS.sm,
    borderWidth: 1, borderColor: 'transparent',
    marginBottom: 4,
  },
  btnActive: {
    backgroundColor: 'rgba(79,255,176,0.08)',
    borderColor: 'rgba(79,255,176,0.25)',
  },
  icon: {
    width: 34, height: 34, borderRadius: 8,
    backgroundColor: COLORS.surface2,
    alignItems: 'center', justifyContent: 'center',
  },
  iconActive: { backgroundColor: 'rgba(79,255,176,0.12)' },
  name:  { fontSize: 13, fontWeight: '700', color: COLORS.text },
  count: { fontSize: 11, color: COLORS.muted, marginTop: 1 },
  done: {
    width: 18, height: 18, borderRadius: 9,
    backgroundColor: COLORS.accent,
    alignItems: 'center', justifyContent: 'center',
  },
});