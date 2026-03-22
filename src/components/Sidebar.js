// src/components/Sidebar.js
// Left navigation panel listing all lessons.
// On web: always visible. On mobile: slides in via App.js animation.

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';
import LessonRow from './LessonRow';

export default function Sidebar({ lessons, activeLessonId, onSelectLesson }) {
  return (
    <View style={styles.sidebar}>
      <Text style={styles.title}>LESSONS</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {lessons.map(l => (
          <LessonRow
            key={l.id}
            lesson={l}
            active={l.id === activeLessonId}
            onPress={onSelectLesson}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 230,
    backgroundColor: COLORS.surface,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
    paddingTop: 20,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 10, fontWeight: '700', letterSpacing: 2,
    color: COLORS.muted, paddingHorizontal: 10, paddingBottom: 12,
  },
});