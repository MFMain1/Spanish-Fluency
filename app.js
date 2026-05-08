// Read curriculum from global set by curriculum.js (raw file deploy — no build step needed)
const {
  LESSONS = [],
  VZ_LESSONS = [],
  REFERENCE = {},
  LEVELS = [],
  VZ_LEVELS = []
} = typeof window !== "undefined" && window.CURRICULUM ? window.CURRICULUM : {};
const {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo
} = React;

/* ═══════════════════════════════════════════════════════════════
   DALE ESPAÑOL — LATAM Spanish (A1→C2) + Venezuelan Track
   Single React component. Imports curriculum from ./curriculum.js
   ═══════════════════════════════════════════════════════════════ */

// ─── STORAGE ──────────────────────────────────────────────────────
const db = {
  async get(key) {
    try {
      if (typeof window !== "undefined" && window.storage) {
        const r = await window.storage.get(key);
        return r ? JSON.parse(r.value) : null;
      }
      if (typeof localStorage !== "undefined") {
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : null;
      }
    } catch (e) {
      return null;
    }
    return null;
  },
  async set(key, value) {
    try {
      const s = JSON.stringify(value);
      if (typeof window !== "undefined" && window.storage) {
        await window.storage.set(key, s);
      } else if (typeof localStorage !== "undefined") {
        localStorage.setItem(key, s);
      }
    } catch (e) {
      console.error("Storage:", e);
    }
  }
};

// ─── VOICE UTILITIES ──────────────────────────────────────────────
const Voice = {
  voices: [],
  init() {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const load = () => {
      this.voices = window.speechSynthesis.getVoices().filter(v => v.lang.startsWith("es"));
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
  },
  pickVoice(prefer = "es-MX") {
    if (!this.voices.length) return null;
    return this.voices.find(v => v.lang === prefer) || this.voices.find(v => v.lang.startsWith("es-") && v.lang !== "es-ES") || this.voices[0];
  },
  speak(text, opts = {}) {
    var _u$voice, _opts$rate;
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.voice = this.pickVoice(opts.lang || "es-MX");
    u.lang = ((_u$voice = u.voice) === null || _u$voice === void 0 ? void 0 : _u$voice.lang) || "es-MX";
    u.rate = (_opts$rate = opts.rate) !== null && _opts$rate !== void 0 ? _opts$rate : 0.9;
    window.speechSynthesis.speak(u);
  },
  cancel() {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  },
  recognitionSupported() {
    return typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
  },
  createRecognition(lang = "es-MX") {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return null;
    const r = new SR();
    r.lang = lang;
    r.interimResults = false;
    r.maxAlternatives = 3;
    r.continuous = false;
    return r;
  }
};
if (typeof window !== "undefined") Voice.init();

// ─── ANSWER CHECKER ───────────────────────────────────────────────
const stripAccents = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const norm = s => s.trim().toLowerCase().replace(/\s+/g, " ");
const normPunc = s => norm(s).replace(/^[¿¡]+/, "").replace(/[?!.,]+$/, "").trim();
function checkAnswer(userRaw, drill) {
  const allCorrect = [drill.a, ...(drill.alts || [])];
  const u = normPunc(userRaw);
  for (const ans of allCorrect) {
    if (normPunc(ans) === u) return {
      ok: true,
      match: ans
    };
  }
  for (const ans of allCorrect) {
    if (stripAccents(normPunc(ans)) === stripAccents(u)) {
      return {
        ok: false,
        accentMiss: true,
        expected: ans
      };
    }
  }
  return {
    ok: false,
    expected: drill.a
  };
}

// ─── SPACED REPETITION ────────────────────────────────────────────
const SR_INTERVALS = [1, 3, 7, 14, 30, 60];
function nextInterval(current, success) {
  if (!success) return SR_INTERVALS[0];
  const i = SR_INTERVALS.indexOf(current);
  return SR_INTERVALS[Math.min(i + 1, SR_INTERVALS.length - 1)];
}
function todayStr() {
  return new Date().toISOString().slice(0, 10);
}
function daysFromNow(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}
function isDue(s) {
  return s <= todayStr();
}
function updateSRQueue(queue, drillId, success) {
  const existing = queue.find(q => q.drillId === drillId);
  if (existing) {
    existing.interval = nextInterval(existing.interval, success);
    existing.due = daysFromNow(existing.interval);
    existing.lastReviewed = todayStr();
    return [...queue];
  }
  if (!success) {
    return [...queue, {
      drillId,
      interval: 1,
      due: daysFromNow(1),
      lastReviewed: todayStr()
    }];
  }
  return queue;
}

// ─── ICONS ───────────────────────────────────────────────────────
const Icon = {
  home: "🏠",
  curso: "📚",
  ref: "📖",
  voz: "🎤",
  vz: "🇻🇪",
  play: "🔊",
  mic: "🎙️",
  check: "✓",
  x: "✗",
  warn: "~"
};

// ═══════════════════════════════════════════════════════════════
// CSS
// ═══════════════════════════════════════════════════════════════
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

:root {
  --bg: #0c0c18;
  --surface: #161628;
  --surface2: #1e1e36;
  --surface3: #282848;
  --primary: #f0a500;
  --primary-soft: rgba(240,165,0,0.12);
  --success: #22c55e;
  --success-soft: rgba(34,197,94,0.12);
  --error: #ef4444;
  --error-soft: rgba(239,68,68,0.12);
  --warning: #f59e0b;
  --venezuelan: #06b6d4;
  --venezuelan-soft: rgba(6,182,212,0.1);
  --text: #f0ede6;
  --text2: #b8b5ad;
  --text3: #6b6980;
  --border: rgba(255,255,255,0.06);
  --radius: 14px;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body, #root {
  font-family: 'Nunito', sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  overscroll-behavior: none;
}

.app { max-width: 480px; margin: 0 auto; padding: 16px 16px 100px; min-height: 100vh; }

.tabbar {
  position: fixed; bottom: 0; left: 0; right: 0;
  background: rgba(12,12,24,0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid var(--border);
  display: flex; z-index: 100;
  padding-bottom: env(safe-area-inset-bottom, 0);
}

.tabbar-item {
  flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 10px 4px; background: none; border: none; color: var(--text3); cursor: pointer;
  font-family: 'Nunito', sans-serif; font-size: 10px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.5px; gap: 4px; transition: color 0.15s;
}
.tabbar-item.active { color: var(--primary); }
.tabbar-item.active.vz-tab { color: var(--venezuelan); }
.tabbar-icon { font-size: 20px; }

.header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; padding: 0 4px; }
.header h1 {
  font-size: 24px; font-weight: 900;
  background: linear-gradient(135deg, var(--primary), #ffd666);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
}
.header h1.vz {
  background: linear-gradient(135deg, var(--venezuelan), #67e8f9);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.header-sub { font-size: 11px; color: var(--text3); font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; }

.section-title {
  font-size: 12px; font-weight: 800; color: var(--text3);
  text-transform: uppercase; letter-spacing: 1.5px; margin: 18px 0 10px 4px;
}

/* Roadmap */
.roadmap { display: grid; grid-template-columns: repeat(6, 1fr); gap: 5px; margin-bottom: 20px; }
.roadmap.vz { grid-template-columns: repeat(5, 1fr); }
.roadmap-item {
  padding: 10px 4px; background: var(--surface); border-radius: 10px; text-align: center;
  border: 1px solid var(--border); cursor: pointer;
}
.roadmap-item.active { border-color: var(--primary); background: var(--primary-soft); }
.roadmap-item.active.vz { border-color: var(--venezuelan); background: var(--venezuelan-soft); }
.roadmap-level { font-size: 13px; font-weight: 800; }
.roadmap-name { font-size: 8px; color: var(--text3); text-transform: uppercase; margin-top: 2px; }

/* Stats */
.stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 20px; }
.stat-card { background: var(--surface); border-radius: 12px; padding: 14px 10px; text-align: center; border: 1px solid var(--border); }
.stat-value { font-size: 24px; font-weight: 900; color: var(--primary); }
.stat-label { font-size: 9px; color: var(--text3); text-transform: uppercase; letter-spacing: 0.5px; margin-top: 2px; }

/* Lesson Cards */
.lesson-card {
  background: var(--surface); border-radius: var(--radius); padding: 16px;
  margin-bottom: 10px; border: 1px solid var(--border); cursor: pointer; transition: all 0.2s;
}
.lesson-card:active { transform: scale(0.98); background: var(--surface2); }
.lesson-card.locked { opacity: 0.45; pointer-events: none; }

.lesson-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
.lesson-num { font-size: 10px; color: var(--text3); font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
.lesson-title { font-size: 17px; font-weight: 800; margin: 2px 0; }
.lesson-subtitle { font-size: 13px; color: var(--text2); line-height: 1.35; }
.lesson-level-badge { font-size: 10px; font-weight: 800; padding: 4px 9px; border-radius: 6px; letter-spacing: 0.5px; flex-shrink: 0; }
.lesson-progress-bar { height: 4px; background: var(--surface3); border-radius: 2px; margin-top: 12px; overflow: hidden; }
.lesson-progress-fill { height: 100%; background: var(--primary); border-radius: 2px; transition: width 0.3s ease; }
.lesson-progress-fill.vz { background: var(--venezuelan); }
.lesson-score { font-size: 11px; color: var(--text3); margin-top: 4px; text-align: right; }

/* Drill */
.drill-header { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
.back-btn {
  background: var(--surface); border: 1px solid var(--border); color: var(--text);
  width: 36px; height: 36px; border-radius: 10px; cursor: pointer;
  display: flex; align-items: center; justify-content: center; font-size: 18px;
}
.drill-progress { flex: 1; height: 6px; background: var(--surface3); border-radius: 3px; overflow: hidden; }
.drill-progress-fill { height: 100%; background: var(--primary); border-radius: 3px; transition: width 0.4s ease; }
.drill-count { font-size: 13px; font-weight: 700; color: var(--text3); min-width: 44px; text-align: right; }

.drill-tag {
  display: inline-block; font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 6px;
  margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;
}
.drill-tag.conj { background: rgba(168,85,247,0.15); color: #c084fc; }
.drill-tag.trans_es, .drill-tag.trans_en { background: rgba(59,130,246,0.15); color: #60a5fa; }
.drill-tag.fill { background: rgba(244,114,182,0.15); color: #f472b6; }
.drill-tag.listen { background: rgba(34,197,94,0.15); color: #4ade80; }
.drill-tag.speak { background: rgba(245,158,11,0.15); color: #fbbf24; }
.drill-tag.vz_recall { background: rgba(6,182,212,0.15); color: #22d3ee; }
.drill-tag.review { background: rgba(34,197,94,0.1); color: #4ade80; margin-left: 6px; }

.drill-prompt { font-size: 22px; font-weight: 800; line-height: 1.35; margin-bottom: 16px; }
.drill-hint { font-size: 13px; color: var(--text3); font-style: italic; margin-top: -12px; margin-bottom: 16px; }

.play-btn {
  display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%; padding: 18px;
  background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
  color: var(--text); font-family: 'Nunito', sans-serif; font-size: 14px; font-weight: 700;
  cursor: pointer; margin-bottom: 16px;
}
.play-btn:active { background: var(--surface2); }
.play-btn.small { padding: 10px 14px; font-size: 12px; width: auto; display: inline-flex; }

.input-area input, .input-area textarea {
  width: 100%; padding: 14px 16px; background: var(--surface); border: 2px solid var(--border);
  border-radius: 12px; color: var(--text); font-family: 'Nunito', sans-serif;
  font-size: 17px; font-weight: 600; outline: none; transition: border-color 0.2s; resize: none;
}
.input-area input:focus { border-color: var(--primary); }
.input-area input.correct { border-color: var(--success); background: var(--success-soft); }
.input-area input.wrong { border-color: var(--error); background: var(--error-soft); }
.input-area input.accent-miss { border-color: var(--warning); background: rgba(245,158,11,0.1); }

.btn {
  width: 100%; padding: 15px; border: none; border-radius: 12px; font-family: 'Nunito', sans-serif;
  font-size: 15px; font-weight: 800; cursor: pointer; text-transform: uppercase;
  letter-spacing: 1px; margin-top: 12px;
}
.btn.primary { background: var(--primary); color: #000; }
.btn.primary:active { background: #d99400; }
.btn.secondary { background: var(--surface2); color: var(--text); border: 1px solid var(--border); }
.btn.secondary:active { background: var(--surface3); }
.btn.venezuelan { background: var(--venezuelan); color: #000; }
.btn.venezuelan:active { background: #0891b2; }
.btn:disabled { opacity: 0.4; cursor: default; }

.mic-btn {
  width: 100%; padding: 14px; background: var(--surface2); border: 1px solid var(--border);
  border-radius: 12px; color: var(--text); font-family: 'Nunito', sans-serif;
  font-size: 14px; font-weight: 700; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 8px;
}
.mic-btn.recording { background: var(--error-soft); border-color: var(--error); color: var(--error); animation: pulse 1.2s infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }

/* Feedback */
.feedback { margin-top: 14px; padding: 14px; border-radius: 12px; animation: slideUp 0.25s ease; }
@keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.feedback.correct { background: var(--success-soft); border: 1px solid rgba(34,197,94,0.2); }
.feedback.wrong { background: var(--error-soft); border: 1px solid rgba(239,68,68,0.2); }
.feedback.accent { background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.2); }
.feedback-header { font-size: 16px; font-weight: 800; margin-bottom: 6px; display: flex; align-items: center; gap: 8px; }
.feedback-answer { font-size: 13px; color: var(--text2); margin-bottom: 8px; line-height: 1.5; }
.feedback-answer strong { color: var(--text); }
.feedback-explanation { font-size: 14px; color: var(--text2); line-height: 1.5; }

/* Further Context */
.fc-toggle {
  background: var(--surface2); border: 1px solid var(--border); color: var(--text2);
  padding: 10px 14px; border-radius: 10px; font-family: 'Nunito', sans-serif;
  font-size: 13px; font-weight: 700; cursor: pointer; width: 100%; text-align: left;
  display: flex; align-items: center; justify-content: space-between; margin-top: 12px;
}
.fc-body { margin-top: 10px; padding: 14px; background: var(--surface); border-radius: 12px; border: 1px solid var(--border); }
.fc-text { font-size: 14px; color: var(--text2); line-height: 1.6; margin-bottom: 12px; }
.fc-section-title { font-size: 11px; font-weight: 800; color: var(--text3); text-transform: uppercase; letter-spacing: 1px; margin: 8px 0 6px; }
.fc-example {
  padding: 10px 12px; background: var(--surface2); border-radius: 8px; margin-bottom: 6px;
  display: flex; align-items: flex-start; gap: 10px;
}
.fc-example-text { flex: 1; }
.fc-example-es { font-size: 14px; font-weight: 700; color: var(--text); margin-bottom: 2px; }
.fc-example-en { font-size: 12px; color: var(--text3); }
.fc-play { background: none; border: none; color: var(--primary); font-size: 18px; cursor: pointer; padding: 0; }
.fc-venezuelan {
  padding: 12px; background: var(--venezuelan-soft); border-radius: 10px;
  border-left: 3px solid var(--venezuelan); margin-top: 10px;
}
.fc-venezuelan-title { font-size: 11px; font-weight: 800; color: var(--venezuelan); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
.fc-venezuelan-text { font-size: 13px; color: var(--text2); line-height: 1.5; }

/* Tables */
.conj-table-title { font-size: 14px; font-weight: 800; margin-bottom: 8px; color: var(--primary); }
.conj-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 13px; }
.conj-table th { text-align: left; padding: 8px 10px; background: var(--surface2); color: var(--text3); font-weight: 700; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
.conj-table td { padding: 7px 10px; border-bottom: 1px solid var(--border); }
.conj-table td:nth-child(1) { color: var(--text3); font-weight: 600; width: 30%; }
.conj-table td:nth-child(2) { color: var(--primary); font-weight: 800; width: 35%; }
.conj-table td:nth-child(3) { color: var(--text2); font-size: 12px; }

/* Study Block */
.study-block { padding: 16px; background: var(--surface); border-radius: 12px; border: 1px solid var(--border); margin-bottom: 18px; }
.study-text { font-size: 14px; color: var(--text2); line-height: 1.6; }

/* Intro / Results */
.intro-title { font-size: 24px; font-weight: 900; margin-bottom: 4px; }
.results-pct { font-size: 56px; font-weight: 900; text-align: center; margin: 28px 0 4px; }
.results-label { font-size: 14px; color: var(--text2); text-align: center; margin-bottom: 24px; }
.miss-item { background: var(--surface); border-radius: 12px; padding: 12px 14px; margin-bottom: 8px; border: 1px solid var(--border); }
.miss-prompt { font-size: 13px; font-weight: 700; margin-bottom: 4px; }
.miss-yours { font-size: 12px; color: var(--error); }
.miss-correct { font-size: 12px; color: var(--success); font-weight: 700; }

/* Reference */
.ref-section { margin-bottom: 22px; }
.ref-card { background: var(--surface); border-radius: 12px; padding: 14px; margin-bottom: 8px; border: 1px solid var(--border); }
.ref-card-title { font-size: 13px; font-weight: 800; color: var(--primary); margin-bottom: 10px; }
.ref-search {
  width: 100%; padding: 12px 14px; background: var(--surface); border: 1px solid var(--border);
  border-radius: 10px; color: var(--text); font-family: 'Nunito', sans-serif; font-size: 14px;
  outline: none; margin-bottom: 16px;
}
.ref-search:focus { border-color: var(--primary); }
.guide-content { font-size: 13px; color: var(--text2); line-height: 1.65; white-space: pre-line; }

/* Voice tab */
.voice-pad { padding: 18px; background: var(--surface); border-radius: 14px; border: 1px solid var(--border); margin-bottom: 16px; }
.voice-input {
  width: 100%; padding: 14px; background: var(--surface2); border: 1px solid var(--border);
  border-radius: 10px; color: var(--text); font-family: 'Nunito', sans-serif; font-size: 16px;
  outline: none; margin-bottom: 12px; min-height: 90px; resize: vertical;
}
.voice-controls { display: flex; gap: 8px; }
.voice-controls .btn { margin-top: 0; flex: 1; }
.voice-result { padding: 12px; background: var(--surface2); border-radius: 10px; margin-top: 12px; font-size: 14px; color: var(--text2); }

/* Daily Review banner */
.review-banner {
  background: linear-gradient(135deg, var(--primary-soft), var(--venezuelan-soft));
  border: 1px solid rgba(240,165,0,0.3); border-radius: 14px; padding: 14px 16px;
  margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center; cursor: pointer;
}
.review-banner-title { font-size: 14px; font-weight: 800; }
.review-banner-sub { font-size: 12px; color: var(--text2); margin-top: 2px; }
.review-banner-count { font-size: 28px; font-weight: 900; color: var(--primary); }

.empty-state { text-align: center; padding: 30px 20px; color: var(--text3); }

.streak-pill {
  display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px;
  background: var(--primary-soft); border-radius: 20px; font-size: 12px; font-weight: 800;
  color: var(--primary);
}
`;

// ═══════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════

function PlayBtn({
  text,
  label = "Play audio",
  small
}) {
  return /*#__PURE__*/React.createElement("button", {
    className: `play-btn${small ? " small" : ""}`,
    onClick: () => Voice.speak(text)
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: small ? 16 : 20
    }
  }, "\uD83D\uDD0A"), /*#__PURE__*/React.createElement("span", null, label));
}
function FurtherContext({
  drill
}) {
  const [show, setShow] = useState(false);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "fc-toggle",
    onClick: () => setShow(!show)
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCD6 Further Context"), /*#__PURE__*/React.createElement("span", null, show ? "▲" : "▼")), show && /*#__PURE__*/React.createElement("div", {
    className: "fc-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fc-text"
  }, drill.ctx), drill.ex && drill.ex.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "fc-section-title"
  }, "\uD83D\uDCDA Standard Examples (LATAM)"), drill.ex.map((e, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "fc-example"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fc-example-text"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fc-example-es"
  }, e.es), /*#__PURE__*/React.createElement("div", {
    className: "fc-example-en"
  }, e.en)), /*#__PURE__*/React.createElement("button", {
    className: "fc-play",
    onClick: () => Voice.speak(e.es)
  }, "\uD83D\uDD0A")))), drill.vz && /*#__PURE__*/React.createElement("div", {
    className: "fc-venezuelan"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fc-venezuelan-title"
  }, "\uD83C\uDDFB\uD83C\uDDEA Venezuelan Variant"), /*#__PURE__*/React.createElement("div", {
    className: "fc-venezuelan-text"
  }, drill.vz))));
}

// ═══════════════════════════════════════════════════════════════
// LESSON / DRILL SCREEN
// ═══════════════════════════════════════════════════════════════
function LessonScreen({
  lesson,
  isVz,
  onExit,
  progress,
  saveProgress
}) {
  const [phase, setPhase] = useState("intro"); // intro | drill | results
  const [drillSet, setDrillSet] = useState([...lesson.drills]);
  const [drillIndex, setDrillIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [misses, setMisses] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [missReview, setMissReview] = useState(false);
  const [recognizing, setRecognizing] = useState(false);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const drill = drillSet[drillIndex];
  const startDrills = () => {
    setPhase("drill");
    setDrillIndex(0);
    setUserAnswer("");
    setFeedback(null);
    setTimeout(() => {
      var _inputRef$current;
      return (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
    }, 100);
  };
  const handleSubmit = () => {
    if (!userAnswer.trim() || feedback) return;
    const result = checkAnswer(userAnswer, drill);
    if (result.ok) {
      setCorrect(c => c + 1);
      setFeedback({
        type: "correct"
      });
    } else if (result.accentMiss) {
      setMisses(m => [...m, {
        drill,
        userAnswer,
        expected: result.expected
      }]);
      setFeedback({
        type: "accent",
        expected: result.expected
      });
    } else {
      setMisses(m => [...m, {
        drill,
        userAnswer,
        expected: result.expected
      }]);
      setFeedback({
        type: "wrong",
        expected: result.expected
      });
    }
  };
  const handleNext = async () => {
    // Update SR queue
    const wasCorrect = (feedback === null || feedback === void 0 ? void 0 : feedback.type) === "correct";
    const newQueue = updateSRQueue(progress.srQueue || [], drill.id, wasCorrect);
    if (drillIndex + 1 >= drillSet.length) {
      // End of drills
      const total = drillSet.length;
      const finalCorrect = correct + (wasCorrect ? 1 : 0);
      const pct = Math.round(finalCorrect / total * 100);
      if (!missReview) {
        const newProg = {
          ...progress,
          srQueue: newQueue
        };
        const lessonsKey = isVz ? "vzLessons" : "lessons";
        if (!newProg[lessonsKey]) newProg[lessonsKey] = {};
        const lp = newProg[lessonsKey][lesson.id] || {
          bestScore: 0,
          attempts: 0
        };
        lp.attempts += 1;
        lp.bestScore = Math.max(lp.bestScore, pct);
        lp.lastScore = pct;
        lp.lastDate = todayStr();
        newProg[lessonsKey][lesson.id] = lp;
        newProg.totalDrills = (newProg.totalDrills || 0) + total;
        newProg.totalCorrect = (newProg.totalCorrect || 0) + finalCorrect;
        await saveProgress(newProg);
      } else {
        await saveProgress({
          ...progress,
          srQueue: newQueue
        });
      }
      setPhase("results");
    } else {
      await saveProgress({
        ...progress,
        srQueue: newQueue
      });
      setDrillIndex(i => i + 1);
      setUserAnswer("");
      setFeedback(null);
      setTimeout(() => {
        var _inputRef$current2;
        return (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 ? void 0 : _inputRef$current2.focus();
      }, 100);
    }
  };
  const handleKeyDown = e => {
    if (e.key === "Enter") {
      if (feedback) handleNext();else handleSubmit();
    }
  };
  const startMissReview = () => {
    const reviewDrills = misses.map(m => m.drill);
    setDrillSet(reviewDrills);
    setDrillIndex(0);
    setMisses([]);
    setCorrect(0);
    setMissReview(true);
    setPhase("drill");
    setUserAnswer("");
    setFeedback(null);
    setTimeout(() => {
      var _inputRef$current3;
      return (_inputRef$current3 = inputRef.current) === null || _inputRef$current3 === void 0 ? void 0 : _inputRef$current3.focus();
    }, 100);
  };

  // Speech recognition for speak drills
  const startSpeechRecognition = () => {
    if (recognizing) {
      var _recognitionRef$curre;
      (_recognitionRef$curre = recognitionRef.current) === null || _recognitionRef$curre === void 0 ? void 0 : _recognitionRef$curre.stop();
      return;
    }
    const r = Voice.createRecognition("es-MX");
    if (!r) {
      alert("Speech recognition not supported on this browser.");
      return;
    }
    recognitionRef.current = r;
    r.onstart = () => setRecognizing(true);
    r.onend = () => setRecognizing(false);
    r.onerror = e => {
      setRecognizing(false);
      console.error(e);
    };
    r.onresult = e => {
      const transcript = e.results[0][0].transcript;
      setUserAnswer(transcript);
      setRecognizing(false);
    };
    r.start();
  };

  // ─── INTRO PHASE ─────────────────────
  if (phase === "intro") {
    return /*#__PURE__*/React.createElement("div", {
      className: "app"
    }, /*#__PURE__*/React.createElement("div", {
      className: "drill-header"
    }, /*#__PURE__*/React.createElement("button", {
      className: "back-btn",
      onClick: onExit
    }, "\u2190"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "lesson-num"
    }, isVz ? lesson.level : `${lesson.level} · Lección ${lesson.num}`), /*#__PURE__*/React.createElement("div", {
      className: "intro-title"
    }, lesson.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "var(--text3)"
      }
    }, lesson.subtitle))), lesson.study && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "section-title"
    }, "\uD83D\uDCD8 Lesson Overview"), /*#__PURE__*/React.createElement("div", {
      className: "study-block"
    }, /*#__PURE__*/React.createElement("div", {
      className: "study-text"
    }, lesson.study))), lesson.tables && lesson.tables.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "section-title"
    }, "\uD83D\uDCCB Reference Tables"), lesson.tables.map((table, ti) => /*#__PURE__*/React.createElement("div", {
      key: ti,
      style: {
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "conj-table-title"
    }, table.title), /*#__PURE__*/React.createElement("table", {
      className: "conj-table"
    }, /*#__PURE__*/React.createElement("tbody", null, table.rows.map((row, ri) => /*#__PURE__*/React.createElement("tr", {
      key: ri
    }, row.map((cell, ci) => /*#__PURE__*/React.createElement("td", {
      key: ci
    }, cell))))))))), /*#__PURE__*/React.createElement("button", {
      className: `btn ${isVz ? "venezuelan" : "primary"}`,
      onClick: startDrills
    }, "Start Drills \xB7 ", drillSet.length, " Questions"));
  }

  // ─── RESULTS PHASE ─────────────────────
  if (phase === "results") {
    const total = drillSet.length;
    const pct = Math.round(correct / total * 100);
    const pctColor = pct >= 80 ? "var(--success)" : pct >= 60 ? "var(--primary)" : "var(--error)";
    return /*#__PURE__*/React.createElement("div", {
      className: "app"
    }, /*#__PURE__*/React.createElement("div", {
      className: "results-pct",
      style: {
        color: pctColor
      }
    }, pct, "%"), /*#__PURE__*/React.createElement("div", {
      className: "results-label"
    }, correct, "/", total, " correct", missReview ? " · Miss Review" : ""), misses.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
      className: "btn primary",
      onClick: startMissReview,
      style: {
        marginTop: 0
      }
    }, "Re-drill ", misses.length, " miss", misses.length > 1 ? "es" : ""), /*#__PURE__*/React.createElement("div", {
      className: "section-title"
    }, "Missed Questions"), misses.map((miss, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "miss-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "miss-prompt"
    }, miss.drill.q), /*#__PURE__*/React.createElement("div", {
      className: "miss-yours"
    }, "You: ", miss.userAnswer), /*#__PURE__*/React.createElement("div", {
      className: "miss-correct"
    }, "Correct: ", miss.expected)))), misses.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: 24,
        color: "var(--success)",
        fontSize: 18,
        fontWeight: 800
      }
    }, "\xA1Perfecto! Sin errores. ", isVz ? "Burda de chévere, chamo." : "Excelente trabajo."), /*#__PURE__*/React.createElement("button", {
      className: `btn ${isVz ? "venezuelan" : "primary"}`,
      onClick: onExit
    }, "Back to Lessons"), !missReview && /*#__PURE__*/React.createElement("button", {
      className: "btn secondary",
      onClick: () => {
        setDrillSet([...lesson.drills]);
        setDrillIndex(0);
        setMisses([]);
        setCorrect(0);
        setPhase("intro");
      }
    }, "Retry Lesson"));
  }

  // ─── DRILL PHASE ─────────────────────
  return /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, /*#__PURE__*/React.createElement("div", {
    className: "drill-header"
  }, /*#__PURE__*/React.createElement("button", {
    className: "back-btn",
    onClick: onExit
  }, "\u2190"), /*#__PURE__*/React.createElement("div", {
    className: "drill-progress"
  }, /*#__PURE__*/React.createElement("div", {
    className: "drill-progress-fill",
    style: {
      width: `${(drillIndex + (feedback ? 1 : 0)) / drillSet.length * 100}%`
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "drill-count"
  }, drillIndex + 1, "/", drillSet.length)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: `drill-tag ${drill.type}`
  }, drill.type === "conj" && "Conjugation", drill.type === "trans_es" && "Translate → Spanish", drill.type === "trans_en" && "Translate → English", drill.type === "fill" && "Fill the Blank", drill.type === "listen" && "Listen & Type", drill.type === "speak" && "Speak It", drill.type === "vz_recall" && "Venezuelan Recall"), drill.tag === "review" && /*#__PURE__*/React.createElement("span", {
    className: "drill-tag review"
  }, "Review")), drill.type === "listen" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "drill-prompt"
  }, drill.q), /*#__PURE__*/React.createElement("button", {
    className: "play-btn",
    onClick: () => Voice.speak(drill.audio || drill.a)
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20
    }
  }, "\uD83D\uDD0A"), /*#__PURE__*/React.createElement("span", null, "Tap to Hear \xB7 Tap again to repeat"))) : /*#__PURE__*/React.createElement("div", {
    className: "drill-prompt"
  }, drill.type === "trans_es" || drill.type === "trans_en" ? `"${drill.q}"` : drill.q), drill.hint && /*#__PURE__*/React.createElement("div", {
    className: "drill-hint"
  }, drill.hint), drill.type === "speak" && /*#__PURE__*/React.createElement("button", {
    className: "play-btn",
    onClick: () => Voice.speak(drill.a)
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20
    }
  }, "\uD83D\uDD0A"), /*#__PURE__*/React.createElement("span", null, "Hear the answer first")), /*#__PURE__*/React.createElement("div", {
    className: "input-area"
  }, /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    type: "text",
    value: userAnswer,
    onChange: e => setUserAnswer(e.target.value),
    onKeyDown: handleKeyDown,
    placeholder: drill.type === "conj" ? "Type the conjugated form..." : drill.type === "trans_es" ? "Type in Spanish..." : drill.type === "trans_en" ? "Type in English..." : drill.type === "listen" ? "Type what you hear..." : drill.type === "speak" ? "Tap mic or type..." : "Type your answer...",
    disabled: !!feedback,
    className: feedback ? feedback.type === "correct" ? "correct" : feedback.type === "accent" ? "accent-miss" : "wrong" : "",
    autoComplete: "off",
    autoCapitalize: "off",
    autoCorrect: "off",
    spellCheck: "false"
  })), (drill.type === "speak" || drill.type === "listen") && Voice.recognitionSupported() && /*#__PURE__*/React.createElement("button", {
    className: `mic-btn ${recognizing ? "recording" : ""}`,
    onClick: startSpeechRecognition,
    disabled: !!feedback
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, "\uD83C\uDF99\uFE0F"), /*#__PURE__*/React.createElement("span", null, recognizing ? "Listening... tap to stop" : "Tap to speak instead")), !feedback ? /*#__PURE__*/React.createElement("button", {
    className: "btn primary",
    onClick: handleSubmit,
    disabled: !userAnswer.trim()
  }, "Check") : /*#__PURE__*/React.createElement("button", {
    className: "btn secondary",
    onClick: handleNext
  }, drillIndex + 1 >= drillSet.length ? "See Results" : "Next →"), feedback && /*#__PURE__*/React.createElement("div", {
    className: `feedback ${feedback.type === "correct" ? "correct" : feedback.type === "accent" ? "accent" : "wrong"}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "feedback-header"
  }, feedback.type === "correct" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--success)"
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--success)"
    }
  }, "\xA1Correcto!")), feedback.type === "accent" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--warning)"
    }
  }, "~"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--warning)"
    }
  }, "Almost \u2014 accent missing")), feedback.type === "wrong" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--error)"
    }
  }, "\u2717"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--error)"
    }
  }, "Incorrecto"))), feedback.expected && /*#__PURE__*/React.createElement("div", {
    className: "feedback-answer"
  }, "You wrote: ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--error)"
    }
  }, userAnswer), /*#__PURE__*/React.createElement("br", null), "Correct: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--success)"
    }
  }, feedback.expected), /*#__PURE__*/React.createElement("button", {
    className: "play-btn small",
    onClick: () => Voice.speak(feedback.expected),
    style: {
      marginLeft: 8,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDD0A"), /*#__PURE__*/React.createElement("span", null, "Hear it"))), feedback.type === "correct" && /*#__PURE__*/React.createElement("div", {
    className: "feedback-answer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "play-btn small",
    onClick: () => Voice.speak(drill.a)
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDD0A"), /*#__PURE__*/React.createElement("span", null, "Hear the answer"))), /*#__PURE__*/React.createElement("div", {
    className: "feedback-explanation"
  }, drill.exp), /*#__PURE__*/React.createElement(FurtherContext, {
    drill: drill
  })));
}

// ═══════════════════════════════════════════════════════════════
// HOME (INICIO) TAB
// ═══════════════════════════════════════════════════════════════
function InicioTab({
  progress,
  dueReviews,
  onStartReview,
  onPickLesson
}) {
  var _LEVELS$find, _LEVELS$find2;
  const totalDrills = progress.totalDrills || 0;
  const totalCorrect = progress.totalCorrect || 0;
  const accuracy = totalDrills > 0 ? Math.round(totalCorrect / totalDrills * 100) : 0;
  const completedFormal = Object.keys(progress.lessons || {}).length;
  const completedVz = Object.keys(progress.vzLessons || {}).length;

  // Determine current level based on completed lessons
  const allLessons = LESSONS || [];
  const currentLessonObj = allLessons.find(l => {
    var _progress$lessons;
    return !((_progress$lessons = progress.lessons) !== null && _progress$lessons !== void 0 && _progress$lessons[l.id]) || progress.lessons[l.id].bestScore < 80;
  });
  const currentLevel = currentLessonObj ? currentLessonObj.level : "C2";
  return /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Dale Espa\xF1ol"), /*#__PURE__*/React.createElement("div", {
    className: "header-sub"
  }, "LATAM \xB7 Venezuelan Track")), totalDrills > 0 && /*#__PURE__*/React.createElement("div", {
    className: "streak-pill"
  }, "\uD83D\uDD25 ", accuracy, "%")), /*#__PURE__*/React.createElement("div", {
    className: "roadmap"
  }, LEVELS.map(lv => /*#__PURE__*/React.createElement("div", {
    key: lv.id,
    className: `roadmap-item ${currentLevel === lv.id ? "active" : ""}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "roadmap-level",
    style: {
      color: lv.color
    }
  }, lv.id), /*#__PURE__*/React.createElement("div", {
    className: "roadmap-name"
  }, lv.name)))), dueReviews.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "review-banner",
    onClick: onStartReview
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "review-banner-title"
  }, "\uD83D\uDCC5 Daily Review"), /*#__PURE__*/React.createElement("div", {
    className: "review-banner-sub"
  }, "Items due today \xB7 spaced repetition")), /*#__PURE__*/React.createElement("div", {
    className: "review-banner-count"
  }, dueReviews.length)), /*#__PURE__*/React.createElement("div", {
    className: "stats-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-value"
  }, completedFormal + completedVz), /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, "Lessons")), /*#__PURE__*/React.createElement("div", {
    className: "stat-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-value"
  }, totalDrills), /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, "Drills")), /*#__PURE__*/React.createElement("div", {
    className: "stat-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-value"
  }, accuracy, "%"), /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, "Accuracy"))), currentLessonObj && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Continue Learning"), /*#__PURE__*/React.createElement("div", {
    className: "lesson-card",
    onClick: () => onPickLesson(currentLessonObj, false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "lesson-top"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "lesson-num"
  }, "Lecci\xF3n ", currentLessonObj.num, " \xB7 ", currentLessonObj.level), /*#__PURE__*/React.createElement("div", {
    className: "lesson-title"
  }, currentLessonObj.title), /*#__PURE__*/React.createElement("div", {
    className: "lesson-subtitle"
  }, currentLessonObj.subtitle)), /*#__PURE__*/React.createElement("div", {
    className: "lesson-level-badge",
    style: {
      background: `${(_LEVELS$find = LEVELS.find(l => l.id === currentLessonObj.level)) === null || _LEVELS$find === void 0 ? void 0 : _LEVELS$find.color}22`,
      color: (_LEVELS$find2 = LEVELS.find(l => l.id === currentLessonObj.level)) === null || _LEVELS$find2 === void 0 ? void 0 : _LEVELS$find2.color
    }
  }, currentLessonObj.level)))));
}

// ═══════════════════════════════════════════════════════════════
// CURRICULUM (CURSO) TAB
// ═══════════════════════════════════════════════════════════════
function CursoTab({
  progress,
  onPickLesson
}) {
  const [filter, setFilter] = useState("all");
  const lessonsByLevel = useMemo(() => {
    const groups = {};
    LEVELS.forEach(lv => groups[lv.id] = []);
    LESSONS.forEach(l => {
      if (groups[l.level]) groups[l.level].push(l);
    });
    return groups;
  }, []);
  const filteredLevels = filter === "all" ? LEVELS : LEVELS.filter(l => l.id === filter);
  return /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Curriculum"), /*#__PURE__*/React.createElement("div", {
    className: "header-sub"
  }, "A1 \u2192 C2 \xB7 ", LESSONS.length, " lessons"))), /*#__PURE__*/React.createElement("div", {
    className: "roadmap"
  }, /*#__PURE__*/React.createElement("div", {
    className: `roadmap-item ${filter === "all" ? "active" : ""}`,
    onClick: () => setFilter("all")
  }, /*#__PURE__*/React.createElement("div", {
    className: "roadmap-level"
  }, "All"), /*#__PURE__*/React.createElement("div", {
    className: "roadmap-name"
  }, LESSONS.length)), LEVELS.map(lv => {
    var _lessonsByLevel$lv$id;
    return /*#__PURE__*/React.createElement("div", {
      key: lv.id,
      className: `roadmap-item ${filter === lv.id ? "active" : ""}`,
      onClick: () => setFilter(lv.id),
      style: {
        display: filter !== "all" && filter !== lv.id ? "none" : undefined
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "roadmap-level",
      style: {
        color: lv.color
      }
    }, lv.id), /*#__PURE__*/React.createElement("div", {
      className: "roadmap-name"
    }, ((_lessonsByLevel$lv$id = lessonsByLevel[lv.id]) === null || _lessonsByLevel$lv$id === void 0 ? void 0 : _lessonsByLevel$lv$id.length) || 0));
  })), filteredLevels.map(lv => {
    var _lessonsByLevel$lv$id2, _lessonsByLevel$lv$id3;
    return /*#__PURE__*/React.createElement("div", {
      key: lv.id,
      style: {
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "section-title",
      style: {
        color: lv.color
      }
    }, lv.id, " \xB7 ", lv.name, " \u2014 ", lv.desc), ((_lessonsByLevel$lv$id2 = lessonsByLevel[lv.id]) === null || _lessonsByLevel$lv$id2 === void 0 ? void 0 : _lessonsByLevel$lv$id2.length) === 0 && /*#__PURE__*/React.createElement("div", {
      className: "empty-state",
      style: {
        padding: 16
      }
    }, "Coming soon"), (_lessonsByLevel$lv$id3 = lessonsByLevel[lv.id]) === null || _lessonsByLevel$lv$id3 === void 0 ? void 0 : _lessonsByLevel$lv$id3.map(lesson => {
      var _progress$lessons2;
      const lp = (_progress$lessons2 = progress.lessons) === null || _progress$lessons2 === void 0 ? void 0 : _progress$lessons2[lesson.id];
      const pct = lp ? lp.bestScore : 0;
      return /*#__PURE__*/React.createElement("div", {
        key: lesson.id,
        className: "lesson-card",
        onClick: () => onPickLesson(lesson, false)
      }, /*#__PURE__*/React.createElement("div", {
        className: "lesson-top"
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "lesson-num"
      }, "Lecci\xF3n ", lesson.num), /*#__PURE__*/React.createElement("div", {
        className: "lesson-title"
      }, lesson.title), /*#__PURE__*/React.createElement("div", {
        className: "lesson-subtitle"
      }, lesson.subtitle)), /*#__PURE__*/React.createElement("div", {
        className: "lesson-level-badge",
        style: {
          background: `${lv.color}22`,
          color: lv.color
        }
      }, lesson.level)), /*#__PURE__*/React.createElement("div", {
        className: "lesson-progress-bar"
      }, /*#__PURE__*/React.createElement("div", {
        className: "lesson-progress-fill",
        style: {
          width: `${pct}%`
        }
      })), lp && /*#__PURE__*/React.createElement("div", {
        className: "lesson-score"
      }, "Best: ", pct, "% \xB7 Attempts: ", lp.attempts));
    }));
  }));
}

// ═══════════════════════════════════════════════════════════════
// REFERENCE TAB
// ═══════════════════════════════════════════════════════════════
function ReferenciaTab() {
  const [search, setSearch] = useState("");
  const q = search.toLowerCase().trim();
  const matches = text => !q || text.toLowerCase().includes(q);
  return /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Referencia"), /*#__PURE__*/React.createElement("div", {
    className: "header-sub"
  }, "Conjugations \xB7 Pronouns \xB7 Guides"))), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "ref-search",
    placeholder: "Search verbs, pronouns, topics...",
    value: search,
    onChange: e => setSearch(e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    className: "ref-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Conjugation Tables"), REFERENCE.conjugations.filter(t => matches(t.title) || t.verbs.some(v => matches(v.inf))).map((table, ti) => /*#__PURE__*/React.createElement("div", {
    key: ti,
    className: "ref-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ref-card-title"
  }, table.title), table.verbs.map((v, vi) => /*#__PURE__*/React.createElement("div", {
    key: vi,
    className: "ref-verb-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ref-verb-name"
  }, v.inf), v.forms.map((f, fi) => /*#__PURE__*/React.createElement("span", {
    key: fi,
    className: "ref-verb-form"
  }, f))))))), /*#__PURE__*/React.createElement("div", {
    className: "ref-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Pronouns"), REFERENCE.pronouns.filter(t => matches(t.title) || t.rows.some(r => matches(r.join(" ")))).map((p, pi) => /*#__PURE__*/React.createElement("div", {
    key: pi,
    className: "ref-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ref-card-title"
  }, p.title), /*#__PURE__*/React.createElement("table", {
    className: "conj-table"
  }, /*#__PURE__*/React.createElement("tbody", null, p.rows.map((row, ri) => /*#__PURE__*/React.createElement("tr", {
    key: ri
  }, row.map((cell, ci) => /*#__PURE__*/React.createElement("td", {
    key: ci
  }, cell))))))))), /*#__PURE__*/React.createElement("div", {
    className: "ref-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Quick Guides"), REFERENCE.guides.filter(g => matches(g.title) || matches(g.content)).map((g, gi) => /*#__PURE__*/React.createElement("div", {
    key: gi,
    className: "ref-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ref-card-title"
  }, g.title), /*#__PURE__*/React.createElement("div", {
    className: "guide-content"
  }, g.content)))));
}

// ═══════════════════════════════════════════════════════════════
// VOICE (VOZ) TAB
// ═══════════════════════════════════════════════════════════════
function VozTab() {
  const [text, setText] = useState("");
  const [recognizing, setRecognizing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recRef = useRef(null);
  const handleSpeak = () => {
    if (!text.trim()) return;
    Voice.speak(text);
  };
  const handleRecognize = () => {
    if (recognizing) {
      var _recRef$current;
      (_recRef$current = recRef.current) === null || _recRef$current === void 0 ? void 0 : _recRef$current.stop();
      return;
    }
    const r = Voice.createRecognition("es-MX");
    if (!r) {
      setTranscript("⚠️ Speech recognition not supported on this browser. iOS Safari should support it; try in Safari directly.");
      return;
    }
    recRef.current = r;
    r.onstart = () => {
      setRecognizing(true);
      setTranscript("Listening...");
    };
    r.onend = () => setRecognizing(false);
    r.onerror = e => {
      setRecognizing(false);
      setTranscript(`Error: ${e.error}`);
    };
    r.onresult = e => {
      const result = e.results[0][0].transcript;
      const conf = e.results[0][0].confidence;
      setTranscript(`${result}${conf ? ` (${Math.round(conf * 100)}% confidence)` : ""}`);
      setRecognizing(false);
    };
    r.start();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Voz"), /*#__PURE__*/React.createElement("div", {
    className: "header-sub"
  }, "Listen \xB7 Speak \xB7 Practice"))), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "\uD83D\uDD0A Listen \u2014 Type any Spanish, hear it spoken"), /*#__PURE__*/React.createElement("div", {
    className: "voice-pad"
  }, /*#__PURE__*/React.createElement("textarea", {
    className: "voice-input",
    placeholder: "Escribe en espa\xF1ol...",
    value: text,
    onChange: e => setText(e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    className: "voice-controls"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn primary",
    onClick: handleSpeak,
    disabled: !text.trim()
  }, "\uD83D\uDD0A Speak"), /*#__PURE__*/React.createElement("button", {
    className: "btn secondary",
    onClick: () => Voice.cancel()
  }, "Stop"))), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "\uD83C\uDF99\uFE0F Speak \u2014 Practice your pronunciation"), /*#__PURE__*/React.createElement("div", {
    className: "voice-pad"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text2)",
      marginBottom: 12,
      lineHeight: 1.5
    }
  }, "Tap below and speak in Spanish. App will transcribe what it heard. Compare to what you intended to say."), /*#__PURE__*/React.createElement("button", {
    className: `mic-btn ${recognizing ? "recording" : ""}`,
    onClick: handleRecognize
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, "\uD83C\uDF99\uFE0F"), /*#__PURE__*/React.createElement("span", null, recognizing ? "Listening... tap to stop" : "Tap and Speak")), transcript && /*#__PURE__*/React.createElement("div", {
    className: "voice-result"
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--text)"
    }
  }, "Heard:"), " ", transcript)), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "\uD83D\uDCA1 Suggested Practice Phrases"), /*#__PURE__*/React.createElement("div", {
    className: "voice-pad"
  }, ["¿Cómo estás, mi amor?", "Quiero ir a la playa este fin de semana.", "No pude dormir bien anoche.", "Hablamos burda anoche, chamo.", "¿Qué hiciste ayer?"].map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "fc-example"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fc-example-text"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fc-example-es"
  }, p)), /*#__PURE__*/React.createElement("button", {
    className: "fc-play",
    onClick: () => Voice.speak(p)
  }, "\uD83D\uDD0A")))));
}

// ═══════════════════════════════════════════════════════════════
// VENEZOLANO TAB
// ═══════════════════════════════════════════════════════════════
function VenezolanoTab({
  progress,
  onPickLesson
}) {
  const [filter, setFilter] = useState("all");
  const lessonsByLevel = useMemo(() => {
    const groups = {};
    VZ_LEVELS.forEach(lv => groups[lv.id] = []);
    VZ_LESSONS.forEach(l => {
      if (groups[l.level]) groups[l.level].push(l);
    });
    return groups;
  }, []);
  const filteredLevels = filter === "all" ? VZ_LEVELS : VZ_LEVELS.filter(l => l.id === filter);
  return /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "vz"
  }, "Venezolano \uD83C\uDDFB\uD83C\uDDEA"), /*#__PURE__*/React.createElement("div", {
    className: "header-sub"
  }, "Slang \xB7 Phrases \xB7 Cultural Notes"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      background: "var(--venezuelan-soft)",
      borderRadius: 12,
      marginBottom: 18,
      fontSize: 13,
      color: "var(--text2)",
      lineHeight: 1.5,
      borderLeft: "3px solid var(--venezuelan)"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--venezuelan)"
    }
  }, "Para sonar venezolano:"), " formal Spanish gets you understood. This track gets you accepted as one of them. Learn how your girlfriend's family actually talks."), /*#__PURE__*/React.createElement("div", {
    className: "roadmap vz"
  }, VZ_LEVELS.map(lv => /*#__PURE__*/React.createElement("div", {
    key: lv.id,
    className: `roadmap-item ${filter === lv.id ? "active vz" : ""}`,
    onClick: () => setFilter(filter === lv.id ? "all" : lv.id),
    style: {
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "roadmap-level",
    style: {
      color: lv.color
    }
  }, lv.id), /*#__PURE__*/React.createElement("div", {
    className: "roadmap-name"
  }, lv.name)))), filteredLevels.map(lv => {
    var _lessonsByLevel$lv$id4, _lessonsByLevel$lv$id5;
    return /*#__PURE__*/React.createElement("div", {
      key: lv.id,
      style: {
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "section-title",
      style: {
        color: lv.color
      }
    }, lv.id, " \xB7 ", lv.name), ((_lessonsByLevel$lv$id4 = lessonsByLevel[lv.id]) === null || _lessonsByLevel$lv$id4 === void 0 ? void 0 : _lessonsByLevel$lv$id4.length) === 0 && /*#__PURE__*/React.createElement("div", {
      className: "empty-state",
      style: {
        padding: 16
      }
    }, "Coming soon"), (_lessonsByLevel$lv$id5 = lessonsByLevel[lv.id]) === null || _lessonsByLevel$lv$id5 === void 0 ? void 0 : _lessonsByLevel$lv$id5.map(lesson => {
      var _progress$vzLessons;
      const lp = (_progress$vzLessons = progress.vzLessons) === null || _progress$vzLessons === void 0 ? void 0 : _progress$vzLessons[lesson.id];
      const pct = lp ? lp.bestScore : 0;
      return /*#__PURE__*/React.createElement("div", {
        key: lesson.id,
        className: "lesson-card",
        onClick: () => onPickLesson(lesson, true)
      }, /*#__PURE__*/React.createElement("div", {
        className: "lesson-top"
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "lesson-num"
      }, "Lecci\xF3n ", lesson.num), /*#__PURE__*/React.createElement("div", {
        className: "lesson-title"
      }, lesson.title), /*#__PURE__*/React.createElement("div", {
        className: "lesson-subtitle"
      }, lesson.subtitle)), /*#__PURE__*/React.createElement("div", {
        className: "lesson-level-badge",
        style: {
          background: `${lv.color}22`,
          color: lv.color
        }
      }, lesson.level)), /*#__PURE__*/React.createElement("div", {
        className: "lesson-progress-bar"
      }, /*#__PURE__*/React.createElement("div", {
        className: "lesson-progress-fill vz",
        style: {
          width: `${pct}%`
        }
      })), lp && /*#__PURE__*/React.createElement("div", {
        className: "lesson-score"
      }, "Best: ", pct, "% \xB7 Attempts: ", lp.attempts));
    }));
  }));
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [tab, setTab] = useState("inicio");
  const [progress, setProgress] = useState({
    lessons: {},
    vzLessons: {},
    totalDrills: 0,
    totalCorrect: 0,
    srQueue: []
  });
  const [loading, setLoading] = useState(true);

  // Active lesson state
  const [activeLesson, setActiveLesson] = useState(null);
  const [activeIsVz, setActiveIsVz] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  useEffect(() => {
    (async () => {
      const saved = await db.get("dale-espanol-v2");
      if (saved) setProgress(saved);
      setLoading(false);
    })();
  }, []);
  const saveProgress = useCallback(async p => {
    setProgress(p);
    await db.set("dale-espanol-v2", p);
  }, []);
  const dueReviews = useMemo(() => {
    return (progress.srQueue || []).filter(item => isDue(item.due));
  }, [progress.srQueue]);
  const startReviewSession = () => {
    if (dueReviews.length === 0) return;
    const allDrills = [...LESSONS, ...VZ_LESSONS].flatMap(l => l.drills);
    const reviewDrills = dueReviews.map(r => allDrills.find(d => d.id === r.drillId)).filter(Boolean);
    if (reviewDrills.length === 0) return;
    const fakeLesson = {
      id: "REVIEW",
      level: "Review",
      num: 0,
      title: "Daily Review",
      subtitle: `${reviewDrills.length} items from spaced repetition`,
      study: "These are items you've previously missed. Re-drilling at increasing intervals locks them into long-term memory.",
      tables: [],
      drills: reviewDrills
    };
    setActiveLesson(fakeLesson);
    setActiveIsVz(false);
    setReviewMode(true);
  };
  if (loading) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, CSS), /*#__PURE__*/React.createElement("div", {
      className: "app",
      style: {
        textAlign: "center",
        paddingTop: 100
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 32,
        fontWeight: 900,
        color: "var(--primary)"
      }
    }, "Cargando...")));
  }

  // Lesson view
  if (activeLesson) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, CSS), /*#__PURE__*/React.createElement(LessonScreen, {
      lesson: activeLesson,
      isVz: activeIsVz,
      progress: progress,
      saveProgress: saveProgress,
      onExit: () => {
        setActiveLesson(null);
        setReviewMode(false);
      }
    }));
  }

  // Tab view
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, CSS), tab === "inicio" && /*#__PURE__*/React.createElement(InicioTab, {
    progress: progress,
    dueReviews: dueReviews,
    onStartReview: startReviewSession,
    onPickLesson: (l, isVz) => {
      setActiveLesson(l);
      setActiveIsVz(isVz);
    }
  }), tab === "curso" && /*#__PURE__*/React.createElement(CursoTab, {
    progress: progress,
    onPickLesson: (l, isVz) => {
      setActiveLesson(l);
      setActiveIsVz(isVz);
    }
  }), tab === "ref" && /*#__PURE__*/React.createElement(ReferenciaTab, null), tab === "voz" && /*#__PURE__*/React.createElement(VozTab, null), tab === "vz" && /*#__PURE__*/React.createElement(VenezolanoTab, {
    progress: progress,
    onPickLesson: (l, isVz) => {
      setActiveLesson(l);
      setActiveIsVz(isVz);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "tabbar"
  }, /*#__PURE__*/React.createElement("button", {
    className: `tabbar-item ${tab === "inicio" ? "active" : ""}`,
    onClick: () => setTab("inicio")
  }, /*#__PURE__*/React.createElement("span", {
    className: "tabbar-icon"
  }, "\uD83C\uDFE0"), /*#__PURE__*/React.createElement("span", null, "Inicio")), /*#__PURE__*/React.createElement("button", {
    className: `tabbar-item ${tab === "curso" ? "active" : ""}`,
    onClick: () => setTab("curso")
  }, /*#__PURE__*/React.createElement("span", {
    className: "tabbar-icon"
  }, "\uD83D\uDCDA"), /*#__PURE__*/React.createElement("span", null, "Curso")), /*#__PURE__*/React.createElement("button", {
    className: `tabbar-item ${tab === "ref" ? "active" : ""}`,
    onClick: () => setTab("ref")
  }, /*#__PURE__*/React.createElement("span", {
    className: "tabbar-icon"
  }, "\uD83D\uDCD6"), /*#__PURE__*/React.createElement("span", null, "Refer.")), /*#__PURE__*/React.createElement("button", {
    className: `tabbar-item ${tab === "voz" ? "active" : ""}`,
    onClick: () => setTab("voz")
  }, /*#__PURE__*/React.createElement("span", {
    className: "tabbar-icon"
  }, "\uD83C\uDFA4"), /*#__PURE__*/React.createElement("span", null, "Voz")), /*#__PURE__*/React.createElement("button", {
    className: `tabbar-item ${tab === "vz" ? "active vz-tab" : ""}`,
    onClick: () => setTab("vz")
  }, /*#__PURE__*/React.createElement("span", {
    className: "tabbar-icon"
  }, "\uD83C\uDDFB\uD83C\uDDEA"), /*#__PURE__*/React.createElement("span", null, "Venez."))));
}
