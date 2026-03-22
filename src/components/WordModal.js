// src/components/WordModal.js
// Full-screen modal that shows the AI video, sign description, tips,
// and Prev/Next/Mark-as-Learned controls for a single ASL word.

import React, { useRef, useEffect } from 'react';
import {
  Modal, View, Text, TouchableOpacity,
  ScrollView, Animated, StyleSheet, Dimensions,
} from 'react-native';
import { COLORS, RADIUS, SPACING } from '../constants/theme';
import VideoPlayer from './VideoPlayer';

const { width: W } = Dimensions.get('window');

export default function WordModal({
  visible, word, lessonId, wordIndex,
  completed, onClose, onPrev, onNext, onMarkComplete,
}) {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, { toValue: 1, useNativeDriver: true }).start();
    } else {
      Animated.timing(slideAnim, { toValue: 0, duration: 180, useNativeDriver: true }).start();
    }
  }, [visible]);

  if (!word) return null;

  const diffLabel = ['Beginner', 'Intermediate', 'Advanced'][word.diff - 1];

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <Animated.View
          style={[
            styles.sheet,
            {
              opacity: slideAnim,
              transform: [{
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1], outputRange: [50, 0],
                }),
              }],
            },
          ]}
        >
          {/* Prevent tap-through to overlay */}
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>

            {/* AI Video */}
            <VideoPlayer word={word} autoGenerate={false} />

            {/* Close */}
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={{ color: COLORS.text, fontSize: 16 }}>✕</Text>
            </TouchableOpacity>

            <ScrollView
              style={styles.body}
              contentContainerStyle={{ paddingBottom: 24 }}
              showsVerticalScrollIndicator={false}
            >
              {/* Word + badges */}
              <Text style={styles.word}>{word.word}</Text>
              <View style={styles.badgeRow}>
                <View style={styles.badgeGreen}>
                  <Text style={styles.badgeGreenTxt}>{word.cat}</Text>
                </View>
                <View style={styles.badgeBlue}>
                  <Text style={styles.badgeBlueTxt}>{diffLabel}</Text>
                </View>
                {completed && (
                  <View style={styles.badgeGreen}>
                    <Text style={styles.badgeGreenTxt}>✓ Learned</Text>
                  </View>
                )}
              </View>

              {/* Description */}
              <Text style={styles.desc}>{word.desc}</Text>

              {/* Tips */}
              {word.tips?.length > 0 && (
                <View style={styles.tipsBox}>
                  <Text style={styles.tipsTitle}>💡 TIPS</Text>
                  {word.tips.map((t, i) => (
                    <View key={i} style={styles.tipRow}>
                      <Text style={styles.arrow}>→</Text>
                      <Text style={styles.tipText}>{t}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Actions */}
              <View style={styles.actions}>
                <TouchableOpacity style={styles.btnSec} onPress={onPrev}>
                  <Text style={styles.btnSecTxt}>← Prev</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnPrimary} onPress={onMarkComplete}>
                  <Text style={styles.btnPrimaryTxt}>✓ Mark Learned</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSec} onPress={onNext}>
                  <Text style={styles.btnSecTxt}>Next →</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  sheet: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    width: Math.min(640, W - 32),
    maxHeight: '90%',
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  closeBtn: {
    position: 'absolute', top: 12, right: 12, zIndex: 10,
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: COLORS.border,
  },

  body: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.lg },
  word: { fontSize: 28, fontWeight: '800', color: COLORS.text, letterSpacing: -1, marginBottom: 10 },

  badgeRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 14 },
  badgeGreen: {
    paddingHorizontal: 10, paddingVertical: 3, borderRadius: 999,
    backgroundColor: 'rgba(79,255,176,0.08)',
    borderWidth: 1, borderColor: 'rgba(79,255,176,0.3)',
  },
  badgeGreenTxt: { fontSize: 11, fontWeight: '600', color: COLORS.accent },
  badgeBlue: {
    paddingHorizontal: 10, paddingVertical: 3, borderRadius: 999,
    backgroundColor: 'rgba(0,201,255,0.08)',
    borderWidth: 1, borderColor: 'rgba(0,201,255,0.3)',
  },
  badgeBlueTxt: { fontSize: 11, fontWeight: '600', color: COLORS.accent2 },

  desc: { fontSize: 14, color: COLORS.muted, lineHeight: 22, marginBottom: 16 },

  tipsBox: {
    backgroundColor: COLORS.surface2,
    borderRadius: RADIUS.md,
    borderWidth: 1, borderColor: COLORS.border,
    padding: 16, gap: 8, marginBottom: 20,
  },
  tipsTitle: { fontSize: 11, fontWeight: '700', letterSpacing: 1.5, color: COLORS.accent, marginBottom: 4 },
  tipRow:    { flexDirection: 'row', gap: 10 },
  arrow:     { color: COLORS.accent, fontSize: 13, marginTop: 1 },
  tipText:   { fontSize: 13, color: COLORS.muted, lineHeight: 20, flex: 1 },

  actions:     { flexDirection: 'row', gap: 10 },
  btnPrimary:  { flex: 1, backgroundColor: COLORS.accent, borderRadius: RADIUS.sm, paddingVertical: 12, alignItems: 'center' },
  btnPrimaryTxt: { fontSize: 13, fontWeight: '800', color: '#000' },
  btnSec: {
    backgroundColor: COLORS.surface2, borderRadius: RADIUS.sm,
    paddingVertical: 12, paddingHorizontal: 16, alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.border,
  },
  btnSecTxt: { fontSize: 13, fontWeight: '600', color: COLORS.text },
});