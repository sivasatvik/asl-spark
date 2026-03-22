// App.js
// Root of the SignPath ASL app.
// Manages global state and wires together all screens and components.
//
// Architecture:
//   App.js
//   ├── src/data/lessons.js          — all lesson & word data
//   ├── src/constants/theme.js       — colors, spacing, radius
//   ├── src/services/videoService.js — D-ID AI video generation
//   ├── src/components/
//   │   ├── Sidebar.js               — lesson list (web: static, mobile: drawer)
//   │   ├── LessonRow.js             — single lesson nav item
//   │   ├── WordCard.js              — tappable word tile in the grid
//   │   ├── VideoPlayer.js           — AI video + animated placeholder
//   │   ├── WordModal.js             — full word detail sheet
//   │   └── Toast.js                 — XP / completion notification
//   └── src/screens/
//       └── LessonScreen.js          — word grid + progress for one lesson

import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, Animated,
  StyleSheet, Platform, StatusBar, Dimensions,
} from 'react-native';

import { LESSONS }     from './src/data/lessons';
import { COLORS }      from './src/constants/theme';
import Sidebar         from './src/components/Sidebar';
import LessonScreen    from './src/screens/LessonScreen';
import WordModal       from './src/components/WordModal';
import Toast           from './src/components/Toast';

const isWeb = Platform.OS === 'web';

export default function App() {
  // ── State ──────────────────────────────────────────────────────────────
  const [lessons,        setLessons]       = useState(LESSONS);
  const [activeLessonId, setActiveLesson]  = useState(0);
  const [completedWords, setCompleted]     = useState(new Set());
  const [modal,          setModal]         = useState(null); // { lessonId, wordIndex }
  const [xp,             setXp]            = useState(0);
  const [toastMsg,       setToastMsg]      = useState('');
  const [toastKey,       setToastKey]      = useState(0);
  const [sidebarOpen,    setSidebarOpen]   = useState(false);

  const sidebarAnim = useRef(new Animated.Value(-260)).current;

  // ── Sidebar (mobile) ───────────────────────────────────────────────────
  function toggleSidebar() {
    const opening = !sidebarOpen;
    setSidebarOpen(opening);
    Animated.spring(sidebarAnim, {
      toValue: opening ? 0 : -260,
      useNativeDriver: true,
    }).start();
  }

  function closeSidebar() {
    setSidebarOpen(false);
    Animated.timing(sidebarAnim, { toValue: -260, duration: 200, useNativeDriver: true }).start();
  }

  // ── Toast helper ───────────────────────────────────────────────────────
  function showToast(msg) {
    setToastMsg(msg);
    setToastKey(k => k + 1);
  }

  // ── Lesson select ──────────────────────────────────────────────────────
  function handleSelectLesson(id) {
    setActiveLesson(id);
    if (!isWeb) closeSidebar();
  }

  // ── Word modal ─────────────────────────────────────────────────────────
  function openWord(wordIndex) {
    setModal({ lessonId: activeLessonId, wordIndex });
  }

  function closeModal() {
    setModal(null);
  }

  function prevWord() {
    if (!modal) return;
    const len = lessons[modal.lessonId].words.length;
    setModal(m => ({ ...m, wordIndex: (m.wordIndex - 1 + len) % len }));
  }

  function nextWord() {
    if (!modal) return;
    const len = lessons[modal.lessonId].words.length;
    setModal(m => ({ ...m, wordIndex: (m.wordIndex + 1) % len }));
  }

  function markComplete() {
    if (!modal) return;
    const { lessonId, wordIndex } = modal;
    const key = `${lessonId}-${wordIndex}`;

    if (!completedWords.has(key)) {
      const next = new Set(completedWords);
      next.add(key);
      setCompleted(next);

      const newXp = xp + 10;
      setXp(newXp);
      showToast('🎉 Word learned! +10 XP');

      // Check if whole lesson is done → mark complete
      const lesson   = lessons[lessonId];
      const allDone  = lesson.words.every((_, i) => next.has(`${lessonId}-${i}`));
      if (allDone) {
        setLessons(prev => prev.map((l, i) => {
          if (i === lessonId) return { ...l, completed: true };
          return l;
        }));
        setXp(newXp + 50);
        showToast('🏆 Lesson complete! +50 XP');
      }
    }
    closeModal();
  }

  // ── Derived values ─────────────────────────────────────────────────────
  const activeLesson  = lessons[activeLessonId];
  const xpPct         = Math.min((xp % 200) / 200, 1);
  const currentWord   = modal ? lessons[modal.lessonId].words[modal.wordIndex] : null;
  const wordCompleted = modal ? completedWords.has(`${modal.lessonId}-${modal.wordIndex}`) : false;

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      {/* NAV */}
      <View style={styles.nav}>
        {!isWeb && (
          <TouchableOpacity onPress={toggleSidebar} style={styles.menuBtn}>
            <Text style={{ color: COLORS.text, fontSize: 22 }}>☰</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.logo}>
          <Text style={{ color: COLORS.accent }}>SignPath</Text>
          <Text style={{ color: COLORS.muted }}> / ASL</Text>
        </Text>

        <View style={styles.xpPill}>
          <Text style={styles.xpTxt}>⚡ {xp} XP</Text>
          <View style={styles.xpTrack}>
            <View style={[styles.xpFill, { width: `${xpPct * 100}%` }]} />
          </View>
        </View>
      </View>

      {/* BODY */}
      <View style={styles.body}>
        {/* Web: static sidebar */}
        {isWeb && (
          <Sidebar
            lessons={lessons}
            activeLessonId={activeLessonId}
            onSelectLesson={handleSelectLesson}
          />
        )}

        {/* Main lesson view */}
        <LessonScreen
          lesson={activeLesson}
          lessonId={activeLessonId}
          completedWords={completedWords}
          onWordPress={openWord}
        />
      </View>

      {/* MOBILE: sliding sidebar + overlay */}
      {!isWeb && (
        <>
          {sidebarOpen && (
            <TouchableOpacity
              style={styles.drawerOverlay}
              activeOpacity={1}
              onPress={closeSidebar}
            />
          )}
          <Animated.View style={[styles.drawer, { transform: [{ translateX: sidebarAnim }] }]}>
            <Sidebar
              lessons={lessons}
              activeLessonId={activeLessonId}
              onSelectLesson={handleSelectLesson}
            />
          </Animated.View>
        </>
      )}

      {/* WORD MODAL */}
      <WordModal
        visible={!!modal}
        word={currentWord}
        lessonId={modal?.lessonId}
        wordIndex={modal?.wordIndex}
        completed={wordCompleted}
        onClose={closeModal}
        onPrev={prevWord}
        onNext={nextWord}
        onMarkComplete={markComplete}
      />

      {/* TOAST */}
      <Toast key={toastKey} message={toastMsg} visible={!!toastMsg} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },

  nav: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 18, height: 58,
    backgroundColor: 'rgba(10,14,23,0.97)',
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
    zIndex: 10,
  },
  menuBtn: { padding: 6, marginRight: 10 },
  logo:    { flex: 1, fontSize: 18, fontWeight: '800' },

  xpPill: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 999, borderWidth: 1, borderColor: COLORS.border,
  },
  xpTxt:   { fontSize: 12, color: COLORS.text },
  xpTrack: { width: 50, height: 4, backgroundColor: COLORS.border, borderRadius: 999, overflow: 'hidden' },
  xpFill:  { height: '100%', backgroundColor: COLORS.accent, borderRadius: 999 },

  body: { flex: 1, flexDirection: 'row' },

  drawerOverlay: {
    position: 'absolute', inset: 0, zIndex: 40,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  drawer: {
    position: 'absolute', top: 0, bottom: 0, left: 0,
    zIndex: 50, width: 260,
    shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 20,
  },
});