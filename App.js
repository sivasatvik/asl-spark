import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Modal,
  StyleSheet, Animated, Dimensions, Platform, StatusBar,
} from 'react-native';

const { width: SCREEN_W } = Dimensions.get('window');

// ─── THEME ────────────────────────────────────────────────────────────────────
const C = {
  bg:       '#0a0e17',
  surface:  '#111827',
  surface2: '#1a2236',
  border:   '#1e2d45',
  accent:   '#4fffb0',
  accent2:  '#00c9ff',
  text:     '#e8edf5',
  muted:    '#64748b',
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const LESSONS = [
  {
    id: 0, name: 'Greetings', icon: '👋', unlocked: true, completed: false,
    desc: 'Start your ASL journey with everyday greetings and polite expressions.',
    words: [
      { word: 'HELLO',     emoji: '👋', hand: '👋', cat: 'Greeting', diff: 1,
        desc: 'Open your hand and wave from your forehead outward. Keep fingers together, palm facing out.',
        tips: ['Start with hand near your forehead', 'Move hand smoothly outward and down', 'Keep a relaxed smile — expression matters!'] },
      { word: 'THANK YOU', emoji: '🙏', hand: '🤲', cat: 'Polite',   diff: 1,
        desc: 'Touch your chin with fingertips, then move your hand outward toward the person.',
        tips: ['Fingers together, palm facing you', 'Move outward like blowing a kiss of gratitude', 'Facial expression should be warm'] },
      { word: 'PLEASE',    emoji: '😊', hand: '🖐️', cat: 'Polite',   diff: 1,
        desc: 'Place your open hand on your chest and move it in a circular motion.',
        tips: ['Flat hand on the center of your chest', 'Circle clockwise from your perspective', 'Typically paired with a slight nod'] },
      { word: 'SORRY',     emoji: '😔', hand: '✊', cat: 'Polite',   diff: 2,
        desc: 'Make a fist and rub it in a circular motion over your chest/heart area.',
        tips: ['Closed fist, not too tight', 'Circle over the heart', 'A slight downward gaze reinforces the meaning'] },
      { word: 'GOODBYE',   emoji: '👋', hand: '🖐️', cat: 'Greeting', diff: 1,
        desc: 'Open hand and wave at shoulder height, similar to a natural wave goodbye.',
        tips: ['Palm faces outward', 'Relaxed wave 2–3 times', 'Friendly facial expression throughout'] },
    ],
  },
  {
    id: 1, name: 'Numbers 1–10', icon: '🔢', unlocked: true, completed: false,
    desc: 'Learn to count from 1 to 10 — essential for phone numbers, ages and more.',
    words: [
      { word: 'ONE',   emoji: '1️⃣', hand: '☝️', cat: 'Number', diff: 1,
        desc: 'Hold up your index finger with the rest closed into a fist.',
        tips: ['Index finger pointing straight up', 'Other fingers folded', 'Palm can face inward or outward'] },
      { word: 'TWO',   emoji: '2️⃣', hand: '✌️', cat: 'Number', diff: 1,
        desc: 'Extend your index and middle fingers upward, keeping the rest closed.',
        tips: ['Classic peace-sign shape', 'Fingers can be together or slightly spread', 'Keep wrist steady'] },
      { word: 'THREE', emoji: '3️⃣', hand: '🤟', cat: 'Number', diff: 1,
        desc: 'Extend your thumb, index finger, and middle finger.',
        tips: ['Thumb points to the side', 'Index and middle point up', 'Ring and pinky folded'] },
      { word: 'FOUR',  emoji: '4️⃣', hand: '🖖', cat: 'Number', diff: 2,
        desc: 'Extend all four fingers upward with the thumb tucked in.',
        tips: ['Four fingers spread and pointing up', 'Thumb folds across palm', 'Keep fingers straight'] },
      { word: 'FIVE',  emoji: '5️⃣', hand: '🖐️', cat: 'Number', diff: 1,
        desc: 'Spread all five fingers open wide.',
        tips: ['All five fingers extended', 'Palm faces outward', 'Relax your hand — no tension'] },
    ],
  },
  {
    id: 2, name: 'Family', icon: '👨‍👩‍👧', unlocked: false, completed: false,
    desc: 'Express family relationships and the people closest to you.',
    words: [
      { word: 'MOTHER',  emoji: '👩', hand: '🖐️', cat: 'Family', diff: 2, desc: 'Touch your chin with the thumb of your open hand.', tips: ['Thumb touches chin', 'Fingers spread', 'Dominant hand only'] },
      { word: 'FATHER',  emoji: '👨', hand: '🖐️', cat: 'Family', diff: 2, desc: 'Touch your forehead with the thumb of your open hand.', tips: ['Thumb touches forehead', 'Fingers spread upward', 'Mirror of MOTHER'] },
      { word: 'SISTER',  emoji: '👧', hand: '🤙', cat: 'Family', diff: 3, desc: 'A two-part sign combining GIRL and SAME.', tips: ['Start at cheek', 'Move hand down to meet other hand', 'Index fingers point together'] },
      { word: 'BROTHER', emoji: '👦', hand: '🤙', cat: 'Family', diff: 3, desc: 'A two-part sign combining BOY and SAME.', tips: ['Start at forehead', 'Move hand down to meet other hand', 'Index fingers point together'] },
    ],
  },
  {
    id: 3, name: 'Colors', icon: '🎨', unlocked: false, completed: false,
    desc: 'Describe the world around you with vibrant color signs.',
    words: [
      { word: 'RED',    emoji: '🔴', hand: '☝️', cat: 'Color', diff: 1, desc: 'Point your index finger at your lips and move it downward slightly.', tips: ['Touch or point near lips', 'Single downward brush', 'Think of red lips'] },
      { word: 'BLUE',   emoji: '🔵', hand: '🤙', cat: 'Color', diff: 1, desc: 'Make a B-handshape and twist your wrist side to side.', tips: ['B handshape: four fingers together, thumb tucked', 'Slight twisting motion', 'Keep movement small'] },
      { word: 'GREEN',  emoji: '🟢', hand: '✌️', cat: 'Color', diff: 1, desc: 'Make a G-handshape and twist your wrist side to side.', tips: ['G handshape: index and thumb extended', 'Twist wrist gently', 'Similar motion to BLUE'] },
      { word: 'YELLOW', emoji: '🟡', hand: '🤙', cat: 'Color', diff: 2, desc: 'Make a Y-handshape and twist your wrist side to side.', tips: ['Y handshape: thumb and pinky extended', 'Wrist twist motion', 'Keep other fingers folded'] },
    ],
  },
  {
    id: 4, name: 'Emotions', icon: '😄', unlocked: false, completed: false,
    desc: 'Share how you feel — facial expressions are a huge part of ASL.',
    words: [
      { word: 'HAPPY', emoji: '😄', hand: '🖐️', cat: 'Emotion', diff: 1, desc: 'Brush your open hand upward on your chest in a repeated motion.', tips: ['Flat hand, palm toward you', 'Brush upward twice', 'Big smile is essential!'] },
      { word: 'SAD',   emoji: '😢', hand: '🤲', cat: 'Emotion', diff: 1, desc: 'Hold both open hands in front of your face and move them downward.', tips: ['Both hands at face level', 'Move down slowly', 'Downcast expression reinforces it'] },
      { word: 'ANGRY', emoji: '😠', hand: '✊', cat: 'Emotion', diff: 2, desc: 'Claw your hand in front of your face and pull it away tensely.', tips: ['Claw/bent fingers', 'Pull away from face with tension', 'Furrowed brow is part of the sign'] },
      { word: 'LOVE',  emoji: '❤️', hand: '🤟', cat: 'Emotion', diff: 1, desc: 'Cross both arms over your chest in a self-hug motion.', tips: ['Cross arms at wrists over chest', 'Like hugging yourself', 'Warm, genuine expression'] },
    ],
  },
];

// ─── WORD CARD ────────────────────────────────────────────────────────────────
function WordCard({ word, index, lessonId, completed, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn  = () => Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(scale, { toValue: 1,    useNativeDriver: true }).start();

  return (
    <Animated.View style={{ transform: [{ scale }], width: '48%', marginBottom: 14 }}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.wordCard, completed && styles.wordCardDone]}
      >
        <View style={styles.cardThumb}>
          <Text style={styles.cardEmoji}>{word.emoji}</Text>
          {completed && (
            <View style={styles.completedBadge}>
              <Text style={styles.completedBadgeText}>✓</Text>
            </View>
          )}
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.cardWord}>{word.word}</Text>
          <Text style={styles.cardCat}>{word.cat}</Text>
          <View style={styles.diffRow}>
            {[1,2,3].map(d => (
              <View key={d} style={[styles.diffDot, d <= word.diff && styles.diffDotFilled]} />
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── LESSON ROW ───────────────────────────────────────────────────────────────
function LessonRow({ lesson, active, onPress }) {
  return (
    <TouchableOpacity
      onPress={() => lesson.unlocked && onPress(lesson.id)}
      style={[styles.lessonBtn, active && styles.lessonBtnActive, !lesson.unlocked && styles.lessonBtnLocked]}
      activeOpacity={lesson.unlocked ? 0.7 : 1}
    >
      <View style={[styles.lessonIcon, active && styles.lessonIconActive]}>
        <Text style={{ fontSize: 18 }}>{lesson.icon}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.lessonName, active && { color: C.accent }]}>{lesson.name}</Text>
        <Text style={styles.lessonCount}>{lesson.words.length} signs</Text>
      </View>
      {lesson.completed && <View style={styles.lessonDone}><Text style={{ fontSize: 10, fontWeight: '700', color: '#000' }}>✓</Text></View>}
      {!lesson.unlocked && <Text style={{ color: C.muted, fontSize: 14 }}>🔒</Text>}
    </TouchableOpacity>
  );
}

// ─── VIDEO PLACEHOLDER ────────────────────────────────────────────────────────
function VideoPlaceholder({ word }) {
  const pulse = useRef(new Animated.Value(1)).current;
  const handAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.08, duration: 1200, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1,    duration: 1200, useNativeDriver: true }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(handAnim, { toValue: 1,  duration: 750, useNativeDriver: true }),
        Animated.timing(handAnim, { toValue: -1, duration: 750, useNativeDriver: true }),
        Animated.timing(handAnim, { toValue: 0,  duration: 750, useNativeDriver: true }),
      ])
    ).start();
  }, [word]);

  const handRotate = handAnim.interpolate({ inputRange: [-1, 0, 1], outputRange: ['-15deg', '0deg', '15deg'] });

  const avatars = ['🧑','👩','🧑‍🦱','👩‍🦰','🧑‍🦲'];
  const avatar  = avatars[word.word.length % 5];

  return (
    <View style={styles.videoPlaceholder}>
      {/* Status pill */}
      <View style={styles.videoStatusPill}>
        <View style={styles.blinkDot} />
        <Text style={styles.videoStatusText}>AI Instructor · Live Demo</Text>
      </View>

      {/* Avatar */}
      <Animated.View style={[styles.avatarCircle, { transform: [{ scale: pulse }] }]}>
        <Text style={{ fontSize: 52 }}>{avatar}</Text>
      </Animated.View>

      {/* Hand sign */}
      <Animated.Text style={[styles.handSign, { transform: [{ rotate: handRotate }] }]}>
        {word.hand}
      </Animated.Text>

      {/* Word label */}
      <View style={styles.videoWordLabel}>
        <Text style={styles.videoWordText}>{word.word}</Text>
      </View>
    </View>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [lessons, setLessons]           = useState(LESSONS.map(l => ({ ...l, words: [...l.words] })));
  const [activeLessonId, setActiveLesson] = useState(0);
  const [completedWords, setCompleted]  = useState(new Set());
  const [modalWord, setModalWord]       = useState(null);
  const [modalIndex, setModalIndex]     = useState(0);
  const [xp, setXp]                     = useState(120);
  const [sidebarOpen, setSidebarOpen]   = useState(false);
  const [toast, setToast]               = useState('');

  const toastAnim   = useRef(new Animated.Value(0)).current;
  const modalAnim   = useRef(new Animated.Value(0)).current;
  const sidebarAnim = useRef(new Animated.Value(-260)).current;

  const isWeb = Platform.OS === 'web';

  // Toast
  function showToast(msg) {
    setToast(msg);
    Animated.sequence([
      Animated.timing(toastAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(2000),
      Animated.timing(toastAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  }

  // Sidebar (mobile)
  function toggleSidebar() {
    const open = !sidebarOpen;
    setSidebarOpen(open);
    Animated.spring(sidebarAnim, { toValue: open ? 0 : -260, useNativeDriver: true }).start();
  }

  // Open word modal
  function openWord(lessonId, index) {
    setModalIndex(index);
    setModalWord({ lessonId, index });
    Animated.spring(modalAnim, { toValue: 1, useNativeDriver: true }).start();
  }

  function closeModal() {
    Animated.timing(modalAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => setModalWord(null));
  }

  function prevWord() {
    const lesson = lessons[modalWord.lessonId];
    const next   = (modalIndex - 1 + lesson.words.length) % lesson.words.length;
    setModalIndex(next);
    setModalWord({ ...modalWord, index: next });
  }

  function nextWord() {
    const lesson = lessons[modalWord.lessonId];
    const next   = (modalIndex + 1) % lesson.words.length;
    setModalIndex(next);
    setModalWord({ ...modalWord, index: next });
  }

  function markComplete() {
    const key = `${modalWord.lessonId}-${modalIndex}`;
    if (!completedWords.has(key)) {
      const next = new Set(completedWords);
      next.add(key);
      setCompleted(next);
      const newXp = xp + 10;
      setXp(newXp);
      showToast('🎉 Word learned! +10 XP');

      // Check lesson complete
      const lesson = lessons[modalWord.lessonId];
      const allDone = lesson.words.every((_, i) => next.has(`${modalWord.lessonId}-${i}`));
      if (allDone) {
        const updated = lessons.map((l, i) => {
          if (i === modalWord.lessonId) return { ...l, completed: true };
          if (i === modalWord.lessonId + 1) return { ...l, unlocked: true };
          return l;
        });
        setLessons(updated);
        setXp(newXp + 50);
        showToast('🏆 Lesson complete! +50 XP');
      }
    }
    closeModal();
  }

  const activeLesson = lessons[activeLessonId];
  const doneCt = activeLesson.words.filter((_, i) => completedWords.has(`${activeLessonId}-${i}`)).length;
  const pct    = activeLesson.words.length > 0 ? doneCt / activeLesson.words.length : 0;
  const xpPct  = (xp % 200) / 200;

  const currentWord = modalWord ? lessons[modalWord.lessonId].words[modalIndex] : null;

  // ── SIDEBAR CONTENT ──
  const SidebarContent = () => (
    <View style={styles.sidebar}>
      <Text style={styles.sidebarTitle}>LESSONS</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {lessons.map(l => (
          <LessonRow
            key={l.id}
            lesson={l}
            active={l.id === activeLessonId}
            onPress={id => { setActiveLesson(id); if (!isWeb) toggleSidebar(); }}
          />
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />

      {/* ── NAV ── */}
      <View style={styles.nav}>
        {!isWeb && (
          <TouchableOpacity onPress={toggleSidebar} style={styles.menuBtn}>
            <Text style={{ color: C.text, fontSize: 20 }}>☰</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.logo}>
          <Text style={styles.logoAccent}>SignPath</Text>
          <Text style={styles.logoSub}> / ASL</Text>
        </Text>
        <View style={styles.xpPill}>
          <Text style={styles.xpText}>⚡ {xp} XP</Text>
          <View style={styles.xpTrack}>
            <View style={[styles.xpFill, { width: `${xpPct * 100}%` }]} />
          </View>
          <Text style={styles.xpText}>🔥 3</Text>
        </View>
      </View>

      {/* ── BODY ── */}
      <View style={styles.body}>

        {/* Web: static sidebar */}
        {isWeb && <SidebarContent />}

        {/* MAIN */}
        <ScrollView style={styles.main} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>

          {/* Lesson header */}
          <View style={styles.lessonHeader}>
            <Text style={styles.lessonTag}>Lesson {activeLessonId + 1} · {activeLesson.words.length} Signs</Text>
            <Text style={styles.lessonTitle}>{activeLesson.icon} {activeLesson.name}</Text>
            <Text style={styles.lessonDesc}>{activeLesson.desc}</Text>
          </View>

          {/* Progress bar */}
          <View style={styles.progRow}>
            <Text style={styles.progLabel}>{doneCt}/{activeLesson.words.length} learned</Text>
            <View style={styles.progTrack}>
              <View style={[styles.progFill, { width: `${pct * 100}%` }]} />
            </View>
            <Text style={styles.progLabel}>{Math.round(pct * 100)}%</Text>
          </View>

          {/* Word grid */}
          {activeLesson.unlocked ? (
            <View style={styles.wordGrid}>
              {activeLesson.words.map((w, i) => (
                <WordCard
                  key={i}
                  word={w}
                  index={i}
                  lessonId={activeLessonId}
                  completed={completedWords.has(`${activeLessonId}-${i}`)}
                  onPress={() => openWord(activeLessonId, i)}
                />
              ))}
            </View>
          ) : (
            <View style={styles.lockedMsg}>
              <Text style={{ fontSize: 48 }}>🔒</Text>
              <Text style={styles.lockedTitle}>Lesson Locked</Text>
              <Text style={styles.lockedSub}>Complete previous lessons to unlock {activeLesson.name}.</Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* ── MOBILE SIDEBAR OVERLAY ── */}
      {!isWeb && (
        <>
          {sidebarOpen && (
            <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={toggleSidebar} />
          )}
          <Animated.View style={[styles.mobileSidebar, { transform: [{ translateX: sidebarAnim }] }]}>
            <SidebarContent />
          </Animated.View>
        </>
      )}

      {/* ── WORD MODAL ── */}
      {currentWord && (
        <Modal visible={!!modalWord} transparent animationType="none" onRequestClose={closeModal}>
          <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={closeModal}>
            <Animated.View
              style={[styles.modal, {
                opacity: modalAnim,
                transform: [{ translateY: modalAnim.interpolate({ inputRange: [0,1], outputRange: [40,0] }) }],
              }]}
            >
              <TouchableOpacity activeOpacity={1} onPress={() => {}}>

                {/* Video area */}
                <VideoPlaceholder word={currentWord} />

                {/* Close */}
                <TouchableOpacity style={styles.modalClose} onPress={closeModal}>
                  <Text style={{ color: C.text, fontSize: 16 }}>✕</Text>
                </TouchableOpacity>

                {/* Body */}
                <View style={styles.modalBody}>
                  <Text style={styles.modalWord}>{currentWord.word}</Text>

                  {/* Badges */}
                  <View style={styles.badgeRow}>
                    <View style={styles.badgeGreen}><Text style={styles.badgeGreenText}>{currentWord.cat}</Text></View>
                    <View style={styles.badgeBlue}><Text style={styles.badgeBlueText}>{['Beginner','Intermediate','Advanced'][currentWord.diff-1]}</Text></View>
                    {completedWords.has(`${modalWord.lessonId}-${modalIndex}`) && (
                      <View style={styles.badgeGreen}><Text style={styles.badgeGreenText}>✓ Learned</Text></View>
                    )}
                  </View>

                  <Text style={styles.modalDesc}>{currentWord.desc}</Text>

                  {/* Tips */}
                  {currentWord.tips && currentWord.tips.length > 0 && (
                    <View style={styles.tipsBox}>
                      <Text style={styles.tipsTitle}>💡 TIPS</Text>
                      {currentWord.tips.map((t, i) => (
                        <View key={i} style={styles.tipRow}>
                          <Text style={styles.tipArrow}>→</Text>
                          <Text style={styles.tipText}>{t}</Text>
                        </View>
                      ))}
                    </View>
                  )}

                  {/* Actions */}
                  <View style={styles.modalActions}>
                    <TouchableOpacity style={styles.btnSecondary} onPress={prevWord}>
                      <Text style={styles.btnSecondaryText}>← Prev</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnPrimary} onPress={markComplete}>
                      <Text style={styles.btnPrimaryText}>✓ Mark Learned</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnSecondary} onPress={nextWord}>
                      <Text style={styles.btnSecondaryText}>Next →</Text>
                    </TouchableOpacity>
                  </View>
                </View>

              </TouchableOpacity>
            </Animated.View>
          </TouchableOpacity>
        </Modal>
      )}

      {/* ── TOAST ── */}
      <Animated.View style={[styles.toast, {
        opacity: toastAnim,
        transform: [{ translateY: toastAnim.interpolate({ inputRange: [0,1], outputRange: [40,0] }) }],
      }]}>
        <Text style={styles.toastText}>{toast}</Text>
      </Animated.View>

    </View>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root:   { flex: 1, backgroundColor: C.bg },

  // NAV
  nav: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 18, height: 58,
    backgroundColor: 'rgba(10,14,23,0.95)',
    borderBottomWidth: 1, borderBottomColor: C.border,
  },
  menuBtn: { padding: 6, marginRight: 8 },
  logo: { flex: 1 },
  logoAccent: { fontSize: 18, fontWeight: '800', color: C.accent },
  logoSub:    { fontSize: 14, fontWeight: '400', color: C.muted },
  xpPill: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: C.surface, paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 999, borderWidth: 1, borderColor: C.border,
  },
  xpText:  { fontSize: 11, color: C.text },
  xpTrack: { width: 50, height: 4, backgroundColor: C.border, borderRadius: 999, overflow: 'hidden' },
  xpFill:  { height: '100%', backgroundColor: C.accent, borderRadius: 999 },

  // BODY
  body: { flex: 1, flexDirection: 'row' },

  // SIDEBAR
  sidebar: {
    width: 230, backgroundColor: C.surface,
    borderRightWidth: 1, borderRightColor: C.border,
    paddingTop: 20, paddingHorizontal: 12,
  },
  mobileSidebar: {
    position: 'absolute', top: 0, bottom: 0, left: 0, zIndex: 50,
    width: 260, shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 20,
  },
  overlay: { position: 'absolute', inset: 0, zIndex: 40, backgroundColor: 'rgba(0,0,0,0.5)' },
  sidebarTitle: { fontSize: 10, fontWeight: '700', letterSpacing: 2, color: C.muted, paddingHorizontal: 10, paddingBottom: 12 },
  lessonBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    padding: 11, borderRadius: 10,
    borderWidth: 1, borderColor: 'transparent',
    marginBottom: 4,
  },
  lessonBtnActive:  { backgroundColor: 'rgba(79,255,176,0.08)', borderColor: 'rgba(79,255,176,0.25)' },
  lessonBtnLocked:  { opacity: 0.5 },
  lessonIcon:       { width: 34, height: 34, borderRadius: 8, backgroundColor: C.surface2, alignItems: 'center', justifyContent: 'center' },
  lessonIconActive: { backgroundColor: 'rgba(79,255,176,0.12)' },
  lessonName:       { fontSize: 13, fontWeight: '700', color: C.text },
  lessonCount:      { fontSize: 11, color: C.muted, marginTop: 1 },
  lessonDone: {
    width: 18, height: 18, borderRadius: 9,
    backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center',
  },

  // MAIN
  main: { flex: 1, padding: 24 },
  lessonHeader: { marginBottom: 20 },
  lessonTag:    { fontSize: 11, fontWeight: '700', letterSpacing: 2, color: C.accent, textTransform: 'uppercase', marginBottom: 4 },
  lessonTitle:  { fontSize: 26, fontWeight: '800', color: C.text, letterSpacing: -0.5, marginBottom: 6 },
  lessonDesc:   { fontSize: 14, color: C.muted, lineHeight: 22 },

  progRow:    { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 },
  progLabel:  { fontSize: 12, color: C.muted, minWidth: 55 },
  progTrack:  { flex: 1, height: 6, backgroundColor: C.border, borderRadius: 999, overflow: 'hidden' },
  progFill:   { height: '100%', backgroundColor: C.accent, borderRadius: 999 },

  wordGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  wordCard: {
    backgroundColor: C.surface, borderRadius: 14,
    borderWidth: 1, borderColor: C.border, overflow: 'hidden',
  },
  wordCardDone: { borderColor: 'rgba(79,255,176,0.4)' },
  cardThumb: {
    aspectRatio: 16/10, backgroundColor: C.surface2,
    alignItems: 'center', justifyContent: 'center', position: 'relative',
  },
  cardEmoji: { fontSize: 36 },
  completedBadge: {
    position: 'absolute', top: 8, right: 8,
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center',
  },
  completedBadgeText: { fontSize: 11, fontWeight: '700', color: '#000' },
  cardBody:    { padding: 12 },
  cardWord:    { fontSize: 14, fontWeight: '800', color: C.text },
  cardCat:     { fontSize: 11, color: C.muted, marginTop: 2 },
  diffRow:     { flexDirection: 'row', gap: 4, marginTop: 8 },
  diffDot:     { width: 6, height: 6, borderRadius: 3, backgroundColor: C.border },
  diffDotFilled: { backgroundColor: C.accent },

  lockedMsg:   { alignItems: 'center', paddingVertical: 60, gap: 12 },
  lockedTitle: { fontSize: 20, fontWeight: '800', color: C.text },
  lockedSub:   { fontSize: 14, color: C.muted, textAlign: 'center', maxWidth: 280 },

  // VIDEO PLACEHOLDER
  videoPlaceholder: {
    width: '100%', aspectRatio: 16/9,
    backgroundColor: '#0d1520',
    alignItems: 'center', justifyContent: 'center',
    borderRadius: 22, borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
    position: 'relative', overflow: 'hidden',
  },
  videoStatusPill: {
    position: 'absolute', top: 12, left: 12,
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12, paddingVertical: 5,
    borderRadius: 999, borderWidth: 1, borderColor: 'rgba(79,255,176,0.2)',
  },
  blinkDot:       { width: 7, height: 7, borderRadius: 4, backgroundColor: C.accent },
  videoStatusText: { fontSize: 11, color: C.accent, fontWeight: '600' },
  avatarCircle: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: C.surface2,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'rgba(79,255,176,0.2)',
  },
  handSign: { fontSize: 48, position: 'absolute', bottom: 24, right: 36 },
  videoWordLabel: {
    position: 'absolute', bottom: 12, left: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12, paddingVertical: 5,
    borderRadius: 8,
  },
  videoWordText: { fontSize: 13, fontWeight: '800', color: C.text },

  // MODAL
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.75)',
    alignItems: 'center', justifyContent: 'center', padding: 16,
  },
  modal: {
    backgroundColor: C.surface, borderRadius: 22,
    width: Math.min(620, SCREEN_W - 32),
    borderWidth: 1, borderColor: C.border,
    maxHeight: '90%', overflow: 'hidden',
  },
  modalClose: {
    position: 'absolute', top: 12, right: 12, zIndex: 10,
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: C.border,
  },
  modalBody:    { padding: 24 },
  modalWord:    { fontSize: 28, fontWeight: '800', color: C.text, letterSpacing: -1, marginBottom: 8 },
  badgeRow:     { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 14 },
  badgeGreen:   { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 999, backgroundColor: 'rgba(79,255,176,0.08)', borderWidth: 1, borderColor: 'rgba(79,255,176,0.3)' },
  badgeGreenText: { fontSize: 11, fontWeight: '600', color: C.accent },
  badgeBlue:    { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 999, backgroundColor: 'rgba(0,201,255,0.08)', borderWidth: 1, borderColor: 'rgba(0,201,255,0.3)' },
  badgeBlueText:  { fontSize: 11, fontWeight: '600', color: C.accent2 },
  modalDesc:    { fontSize: 14, color: C.muted, lineHeight: 22, marginBottom: 16 },

  tipsBox:    { backgroundColor: C.surface2, borderRadius: 12, borderWidth: 1, borderColor: C.border, padding: 16, gap: 8, marginBottom: 20 },
  tipsTitle:  { fontSize: 11, fontWeight: '700', letterSpacing: 1.5, color: C.accent, marginBottom: 4 },
  tipRow:     { flexDirection: 'row', gap: 10 },
  tipArrow:   { color: C.accent, fontSize: 13, marginTop: 1 },
  tipText:    { fontSize: 13, color: C.muted, lineHeight: 20, flex: 1 },

  modalActions: { flexDirection: 'row', gap: 10 },
  btnPrimary:   { flex: 1, backgroundColor: C.accent, borderRadius: 10, paddingVertical: 12, alignItems: 'center', justifyContent: 'center' },
  btnPrimaryText: { fontSize: 13, fontWeight: '800', color: '#000' },
  btnSecondary: { backgroundColor: C.surface2, borderRadius: 10, paddingVertical: 12, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.border },
  btnSecondaryText: { fontSize: 13, fontWeight: '600', color: C.text },

  // TOAST
  toast: {
    position: 'absolute', bottom: 28, alignSelf: 'center',
    backgroundColor: C.accent, paddingHorizontal: 22, paddingVertical: 12,
    borderRadius: 999, zIndex: 999,
  },
  toastText: { fontSize: 14, fontWeight: '700', color: '#000' },
});