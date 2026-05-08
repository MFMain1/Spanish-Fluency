"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = App;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Read curriculum from global set by curriculum.js (raw file deploy — no build step needed)
var _ref = typeof window !== "undefined" && window.CURRICULUM ? window.CURRICULUM : {},
  _ref$LESSONS = _ref.LESSONS,
  LESSONS = _ref$LESSONS === void 0 ? [] : _ref$LESSONS,
  _ref$VZ_LESSONS = _ref.VZ_LESSONS,
  VZ_LESSONS = _ref$VZ_LESSONS === void 0 ? [] : _ref$VZ_LESSONS,
  _ref$REFERENCE = _ref.REFERENCE,
  REFERENCE = _ref$REFERENCE === void 0 ? {} : _ref$REFERENCE,
  _ref$LEVELS = _ref.LEVELS,
  LEVELS = _ref$LEVELS === void 0 ? [] : _ref$LEVELS,
  _ref$VZ_LEVELS = _ref.VZ_LEVELS,
  VZ_LEVELS = _ref$VZ_LEVELS === void 0 ? [] : _ref$VZ_LEVELS;
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useRef = _React.useRef,
  useCallback = _React.useCallback,
  useMemo = _React.useMemo;

/* ═══════════════════════════════════════════════════════════════
   DALE ESPAÑOL — LATAM Spanish (A1→C2) + Venezuelan Track
   Single React component. Imports curriculum from ./curriculum.js
   ═══════════════════════════════════════════════════════════════ */

// ─── STORAGE ──────────────────────────────────────────────────────
var db = {
  get: function get(key) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var r, v, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            if (!(typeof window !== "undefined" && window.storage)) {
              _context.n = 2;
              break;
            }
            _context.n = 1;
            return window.storage.get(key);
          case 1:
            r = _context.v;
            return _context.a(2, r ? JSON.parse(r.value) : null);
          case 2:
            if (!(typeof localStorage !== "undefined")) {
              _context.n = 3;
              break;
            }
            v = localStorage.getItem(key);
            return _context.a(2, v ? JSON.parse(v) : null);
          case 3:
            _context.n = 5;
            break;
          case 4:
            _context.p = 4;
            _t = _context.v;
            return _context.a(2, null);
          case 5:
            return _context.a(2, null);
        }
      }, _callee, null, [[0, 4]]);
    }))();
  },
  set: function set(key, value) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var s, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            s = JSON.stringify(value);
            if (!(typeof window !== "undefined" && window.storage)) {
              _context2.n = 2;
              break;
            }
            _context2.n = 1;
            return window.storage.set(key, s);
          case 1:
            _context2.n = 3;
            break;
          case 2:
            if (typeof localStorage !== "undefined") {
              localStorage.setItem(key, s);
            }
          case 3:
            _context2.n = 5;
            break;
          case 4:
            _context2.p = 4;
            _t2 = _context2.v;
            console.error("Storage:", _t2);
          case 5:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 4]]);
    }))();
  }
};

// ─── VOICE UTILITIES ──────────────────────────────────────────────
var Voice = {
  voices: [],
  init: function init() {
    var _this = this;
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    var load = function load() {
      _this.voices = window.speechSynthesis.getVoices().filter(function (v) {
        return v.lang.startsWith("es");
      });
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
  },
  pickVoice: function pickVoice() {
    var prefer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "es-MX";
    if (!this.voices.length) return null;
    return this.voices.find(function (v) {
      return v.lang === prefer;
    }) || this.voices.find(function (v) {
      return v.lang.startsWith("es-") && v.lang !== "es-ES";
    }) || this.voices[0];
  },
  speak: function speak(text) {
    var _u$voice, _opts$rate;
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.voice = this.pickVoice(opts.lang || "es-MX");
    u.lang = ((_u$voice = u.voice) === null || _u$voice === void 0 ? void 0 : _u$voice.lang) || "es-MX";
    u.rate = (_opts$rate = opts.rate) !== null && _opts$rate !== void 0 ? _opts$rate : 0.9;
    window.speechSynthesis.speak(u);
  },
  cancel: function cancel() {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  },
  recognitionSupported: function recognitionSupported() {
    return typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
  },
  createRecognition: function createRecognition() {
    var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "es-MX";
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return null;
    var r = new SR();
    r.lang = lang;
    r.interimResults = false;
    r.maxAlternatives = 3;
    r.continuous = false;
    return r;
  }
};
if (typeof window !== "undefined") Voice.init();

// ─── ANSWER CHECKER ───────────────────────────────────────────────
var stripAccents = function stripAccents(s) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
var norm = function norm(s) {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
};
var normPunc = function normPunc(s) {
  return norm(s).replace(/^[¿¡]+/, "").replace(/[?!.,]+$/, "").trim();
};
function checkAnswer(userRaw, drill) {
  var allCorrect = [drill.a].concat(_toConsumableArray(drill.alts || []));
  var u = normPunc(userRaw);
  var _iterator = _createForOfIteratorHelper(allCorrect),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var ans = _step.value;
      if (normPunc(ans) === u) return {
        ok: true,
        match: ans
      };
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var _iterator2 = _createForOfIteratorHelper(allCorrect),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _ans = _step2.value;
      if (stripAccents(normPunc(_ans)) === stripAccents(u)) {
        return {
          ok: false,
          accentMiss: true,
          expected: _ans
        };
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return {
    ok: false,
    expected: drill.a
  };
}

// ─── SPACED REPETITION ────────────────────────────────────────────
var SR_INTERVALS = [1, 3, 7, 14, 30, 60];
function nextInterval(current, success) {
  if (!success) return SR_INTERVALS[0];
  var i = SR_INTERVALS.indexOf(current);
  return SR_INTERVALS[Math.min(i + 1, SR_INTERVALS.length - 1)];
}
function todayStr() {
  return new Date().toISOString().slice(0, 10);
}
function daysFromNow(n) {
  var d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}
function isDue(s) {
  return s <= todayStr();
}
function updateSRQueue(queue, drillId, success) {
  var existing = queue.find(function (q) {
    return q.drillId === drillId;
  });
  if (existing) {
    existing.interval = nextInterval(existing.interval, success);
    existing.due = daysFromNow(existing.interval);
    existing.lastReviewed = todayStr();
    return _toConsumableArray(queue);
  }
  if (!success) {
    return [].concat(_toConsumableArray(queue), [{
      drillId: drillId,
      interval: 1,
      due: daysFromNow(1),
      lastReviewed: todayStr()
    }]);
  }
  return queue;
}

// ─── ICONS ───────────────────────────────────────────────────────
var Icon = {
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
var CSS = "\n@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');\n\n:root {\n  --bg: #0c0c18;\n  --surface: #161628;\n  --surface2: #1e1e36;\n  --surface3: #282848;\n  --primary: #f0a500;\n  --primary-soft: rgba(240,165,0,0.12);\n  --success: #22c55e;\n  --success-soft: rgba(34,197,94,0.12);\n  --error: #ef4444;\n  --error-soft: rgba(239,68,68,0.12);\n  --warning: #f59e0b;\n  --venezuelan: #06b6d4;\n  --venezuelan-soft: rgba(6,182,212,0.1);\n  --text: #f0ede6;\n  --text2: #b8b5ad;\n  --text3: #6b6980;\n  --border: rgba(255,255,255,0.06);\n  --radius: 14px;\n}\n\n* { margin: 0; padding: 0; box-sizing: border-box; }\n\nbody, #root {\n  font-family: 'Nunito', sans-serif;\n  background: var(--bg);\n  color: var(--text);\n  min-height: 100vh;\n  -webkit-font-smoothing: antialiased;\n  overscroll-behavior: none;\n}\n\n.app { max-width: 480px; margin: 0 auto; padding: 16px 16px 100px; min-height: 100vh; }\n\n.tabbar {\n  position: fixed; bottom: 0; left: 0; right: 0;\n  background: rgba(12,12,24,0.95);\n  backdrop-filter: blur(20px);\n  border-top: 1px solid var(--border);\n  display: flex; z-index: 100;\n  padding-bottom: env(safe-area-inset-bottom, 0);\n}\n\n.tabbar-item {\n  flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;\n  padding: 10px 4px; background: none; border: none; color: var(--text3); cursor: pointer;\n  font-family: 'Nunito', sans-serif; font-size: 10px; font-weight: 700;\n  text-transform: uppercase; letter-spacing: 0.5px; gap: 4px; transition: color 0.15s;\n}\n.tabbar-item.active { color: var(--primary); }\n.tabbar-item.active.vz-tab { color: var(--venezuelan); }\n.tabbar-icon { font-size: 20px; }\n\n.header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; padding: 0 4px; }\n.header h1 {\n  font-size: 24px; font-weight: 900;\n  background: linear-gradient(135deg, var(--primary), #ffd666);\n  -webkit-background-clip: text; -webkit-text-fill-color: transparent;\n  letter-spacing: -0.5px;\n}\n.header h1.vz {\n  background: linear-gradient(135deg, var(--venezuelan), #67e8f9);\n  -webkit-background-clip: text; -webkit-text-fill-color: transparent;\n}\n.header-sub { font-size: 11px; color: var(--text3); font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; }\n\n.section-title {\n  font-size: 12px; font-weight: 800; color: var(--text3);\n  text-transform: uppercase; letter-spacing: 1.5px; margin: 18px 0 10px 4px;\n}\n\n/* Roadmap */\n.roadmap { display: grid; grid-template-columns: repeat(6, 1fr); gap: 5px; margin-bottom: 20px; }\n.roadmap.vz { grid-template-columns: repeat(5, 1fr); }\n.roadmap-item {\n  padding: 10px 4px; background: var(--surface); border-radius: 10px; text-align: center;\n  border: 1px solid var(--border); cursor: pointer;\n}\n.roadmap-item.active { border-color: var(--primary); background: var(--primary-soft); }\n.roadmap-item.active.vz { border-color: var(--venezuelan); background: var(--venezuelan-soft); }\n.roadmap-level { font-size: 13px; font-weight: 800; }\n.roadmap-name { font-size: 8px; color: var(--text3); text-transform: uppercase; margin-top: 2px; }\n\n/* Stats */\n.stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 20px; }\n.stat-card { background: var(--surface); border-radius: 12px; padding: 14px 10px; text-align: center; border: 1px solid var(--border); }\n.stat-value { font-size: 24px; font-weight: 900; color: var(--primary); }\n.stat-label { font-size: 9px; color: var(--text3); text-transform: uppercase; letter-spacing: 0.5px; margin-top: 2px; }\n\n/* Lesson Cards */\n.lesson-card {\n  background: var(--surface); border-radius: var(--radius); padding: 16px;\n  margin-bottom: 10px; border: 1px solid var(--border); cursor: pointer; transition: all 0.2s;\n}\n.lesson-card:active { transform: scale(0.98); background: var(--surface2); }\n.lesson-card.locked { opacity: 0.45; pointer-events: none; }\n\n.lesson-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }\n.lesson-num { font-size: 10px; color: var(--text3); font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }\n.lesson-title { font-size: 17px; font-weight: 800; margin: 2px 0; }\n.lesson-subtitle { font-size: 13px; color: var(--text2); line-height: 1.35; }\n.lesson-level-badge { font-size: 10px; font-weight: 800; padding: 4px 9px; border-radius: 6px; letter-spacing: 0.5px; flex-shrink: 0; }\n.lesson-progress-bar { height: 4px; background: var(--surface3); border-radius: 2px; margin-top: 12px; overflow: hidden; }\n.lesson-progress-fill { height: 100%; background: var(--primary); border-radius: 2px; transition: width 0.3s ease; }\n.lesson-progress-fill.vz { background: var(--venezuelan); }\n.lesson-score { font-size: 11px; color: var(--text3); margin-top: 4px; text-align: right; }\n\n/* Drill */\n.drill-header { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }\n.back-btn {\n  background: var(--surface); border: 1px solid var(--border); color: var(--text);\n  width: 36px; height: 36px; border-radius: 10px; cursor: pointer;\n  display: flex; align-items: center; justify-content: center; font-size: 18px;\n}\n.drill-progress { flex: 1; height: 6px; background: var(--surface3); border-radius: 3px; overflow: hidden; }\n.drill-progress-fill { height: 100%; background: var(--primary); border-radius: 3px; transition: width 0.4s ease; }\n.drill-count { font-size: 13px; font-weight: 700; color: var(--text3); min-width: 44px; text-align: right; }\n\n.drill-tag {\n  display: inline-block; font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 6px;\n  margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;\n}\n.drill-tag.conj { background: rgba(168,85,247,0.15); color: #c084fc; }\n.drill-tag.trans_es, .drill-tag.trans_en { background: rgba(59,130,246,0.15); color: #60a5fa; }\n.drill-tag.fill { background: rgba(244,114,182,0.15); color: #f472b6; }\n.drill-tag.listen { background: rgba(34,197,94,0.15); color: #4ade80; }\n.drill-tag.speak { background: rgba(245,158,11,0.15); color: #fbbf24; }\n.drill-tag.vz_recall { background: rgba(6,182,212,0.15); color: #22d3ee; }\n.drill-tag.review { background: rgba(34,197,94,0.1); color: #4ade80; margin-left: 6px; }\n\n.drill-prompt { font-size: 22px; font-weight: 800; line-height: 1.35; margin-bottom: 16px; }\n.drill-hint { font-size: 13px; color: var(--text3); font-style: italic; margin-top: -12px; margin-bottom: 16px; }\n\n.play-btn {\n  display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%; padding: 18px;\n  background: var(--surface); border: 1px solid var(--border); border-radius: 12px;\n  color: var(--text); font-family: 'Nunito', sans-serif; font-size: 14px; font-weight: 700;\n  cursor: pointer; margin-bottom: 16px;\n}\n.play-btn:active { background: var(--surface2); }\n.play-btn.small { padding: 10px 14px; font-size: 12px; width: auto; display: inline-flex; }\n\n.input-area input, .input-area textarea {\n  width: 100%; padding: 14px 16px; background: var(--surface); border: 2px solid var(--border);\n  border-radius: 12px; color: var(--text); font-family: 'Nunito', sans-serif;\n  font-size: 17px; font-weight: 600; outline: none; transition: border-color 0.2s; resize: none;\n}\n.input-area input:focus { border-color: var(--primary); }\n.input-area input.correct { border-color: var(--success); background: var(--success-soft); }\n.input-area input.wrong { border-color: var(--error); background: var(--error-soft); }\n.input-area input.accent-miss { border-color: var(--warning); background: rgba(245,158,11,0.1); }\n\n.btn {\n  width: 100%; padding: 15px; border: none; border-radius: 12px; font-family: 'Nunito', sans-serif;\n  font-size: 15px; font-weight: 800; cursor: pointer; text-transform: uppercase;\n  letter-spacing: 1px; margin-top: 12px;\n}\n.btn.primary { background: var(--primary); color: #000; }\n.btn.primary:active { background: #d99400; }\n.btn.secondary { background: var(--surface2); color: var(--text); border: 1px solid var(--border); }\n.btn.secondary:active { background: var(--surface3); }\n.btn.venezuelan { background: var(--venezuelan); color: #000; }\n.btn.venezuelan:active { background: #0891b2; }\n.btn:disabled { opacity: 0.4; cursor: default; }\n\n.mic-btn {\n  width: 100%; padding: 14px; background: var(--surface2); border: 1px solid var(--border);\n  border-radius: 12px; color: var(--text); font-family: 'Nunito', sans-serif;\n  font-size: 14px; font-weight: 700; cursor: pointer;\n  display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 8px;\n}\n.mic-btn.recording { background: var(--error-soft); border-color: var(--error); color: var(--error); animation: pulse 1.2s infinite; }\n@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }\n\n/* Feedback */\n.feedback { margin-top: 14px; padding: 14px; border-radius: 12px; animation: slideUp 0.25s ease; }\n@keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }\n.feedback.correct { background: var(--success-soft); border: 1px solid rgba(34,197,94,0.2); }\n.feedback.wrong { background: var(--error-soft); border: 1px solid rgba(239,68,68,0.2); }\n.feedback.accent { background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.2); }\n.feedback-header { font-size: 16px; font-weight: 800; margin-bottom: 6px; display: flex; align-items: center; gap: 8px; }\n.feedback-answer { font-size: 13px; color: var(--text2); margin-bottom: 8px; line-height: 1.5; }\n.feedback-answer strong { color: var(--text); }\n.feedback-explanation { font-size: 14px; color: var(--text2); line-height: 1.5; }\n\n/* Further Context */\n.fc-toggle {\n  background: var(--surface2); border: 1px solid var(--border); color: var(--text2);\n  padding: 10px 14px; border-radius: 10px; font-family: 'Nunito', sans-serif;\n  font-size: 13px; font-weight: 700; cursor: pointer; width: 100%; text-align: left;\n  display: flex; align-items: center; justify-content: space-between; margin-top: 12px;\n}\n.fc-body { margin-top: 10px; padding: 14px; background: var(--surface); border-radius: 12px; border: 1px solid var(--border); }\n.fc-text { font-size: 14px; color: var(--text2); line-height: 1.6; margin-bottom: 12px; }\n.fc-section-title { font-size: 11px; font-weight: 800; color: var(--text3); text-transform: uppercase; letter-spacing: 1px; margin: 8px 0 6px; }\n.fc-example {\n  padding: 10px 12px; background: var(--surface2); border-radius: 8px; margin-bottom: 6px;\n  display: flex; align-items: flex-start; gap: 10px;\n}\n.fc-example-text { flex: 1; }\n.fc-example-es { font-size: 14px; font-weight: 700; color: var(--text); margin-bottom: 2px; }\n.fc-example-en { font-size: 12px; color: var(--text3); }\n.fc-play { background: none; border: none; color: var(--primary); font-size: 18px; cursor: pointer; padding: 0; }\n.fc-venezuelan {\n  padding: 12px; background: var(--venezuelan-soft); border-radius: 10px;\n  border-left: 3px solid var(--venezuelan); margin-top: 10px;\n}\n.fc-venezuelan-title { font-size: 11px; font-weight: 800; color: var(--venezuelan); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }\n.fc-venezuelan-text { font-size: 13px; color: var(--text2); line-height: 1.5; }\n\n/* Tables */\n.conj-table-title { font-size: 14px; font-weight: 800; margin-bottom: 8px; color: var(--primary); }\n.conj-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 13px; }\n.conj-table th { text-align: left; padding: 8px 10px; background: var(--surface2); color: var(--text3); font-weight: 700; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; }\n.conj-table td { padding: 7px 10px; border-bottom: 1px solid var(--border); }\n.conj-table td:nth-child(1) { color: var(--text3); font-weight: 600; width: 30%; }\n.conj-table td:nth-child(2) { color: var(--primary); font-weight: 800; width: 35%; }\n.conj-table td:nth-child(3) { color: var(--text2); font-size: 12px; }\n\n/* Study Block */\n.study-block { padding: 16px; background: var(--surface); border-radius: 12px; border: 1px solid var(--border); margin-bottom: 18px; }\n.study-text { font-size: 14px; color: var(--text2); line-height: 1.6; }\n\n/* Intro / Results */\n.intro-title { font-size: 24px; font-weight: 900; margin-bottom: 4px; }\n.results-pct { font-size: 56px; font-weight: 900; text-align: center; margin: 28px 0 4px; }\n.results-label { font-size: 14px; color: var(--text2); text-align: center; margin-bottom: 24px; }\n.miss-item { background: var(--surface); border-radius: 12px; padding: 12px 14px; margin-bottom: 8px; border: 1px solid var(--border); }\n.miss-prompt { font-size: 13px; font-weight: 700; margin-bottom: 4px; }\n.miss-yours { font-size: 12px; color: var(--error); }\n.miss-correct { font-size: 12px; color: var(--success); font-weight: 700; }\n\n/* Reference */\n.ref-section { margin-bottom: 22px; }\n.ref-card { background: var(--surface); border-radius: 12px; padding: 14px; margin-bottom: 8px; border: 1px solid var(--border); }\n.ref-card-title { font-size: 13px; font-weight: 800; color: var(--primary); margin-bottom: 10px; }\n.ref-search {\n  width: 100%; padding: 12px 14px; background: var(--surface); border: 1px solid var(--border);\n  border-radius: 10px; color: var(--text); font-family: 'Nunito', sans-serif; font-size: 14px;\n  outline: none; margin-bottom: 16px;\n}\n.ref-search:focus { border-color: var(--primary); }\n.guide-content { font-size: 13px; color: var(--text2); line-height: 1.65; white-space: pre-line; }\n\n/* Voice tab */\n.voice-pad { padding: 18px; background: var(--surface); border-radius: 14px; border: 1px solid var(--border); margin-bottom: 16px; }\n.voice-input {\n  width: 100%; padding: 14px; background: var(--surface2); border: 1px solid var(--border);\n  border-radius: 10px; color: var(--text); font-family: 'Nunito', sans-serif; font-size: 16px;\n  outline: none; margin-bottom: 12px; min-height: 90px; resize: vertical;\n}\n.voice-controls { display: flex; gap: 8px; }\n.voice-controls .btn { margin-top: 0; flex: 1; }\n.voice-result { padding: 12px; background: var(--surface2); border-radius: 10px; margin-top: 12px; font-size: 14px; color: var(--text2); }\n\n/* Daily Review banner */\n.review-banner {\n  background: linear-gradient(135deg, var(--primary-soft), var(--venezuelan-soft));\n  border: 1px solid rgba(240,165,0,0.3); border-radius: 14px; padding: 14px 16px;\n  margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center; cursor: pointer;\n}\n.review-banner-title { font-size: 14px; font-weight: 800; }\n.review-banner-sub { font-size: 12px; color: var(--text2); margin-top: 2px; }\n.review-banner-count { font-size: 28px; font-weight: 900; color: var(--primary); }\n\n.empty-state { text-align: center; padding: 30px 20px; color: var(--text3); }\n\n.streak-pill {\n  display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px;\n  background: var(--primary-soft); border-radius: 20px; font-size: 12px; font-weight: 800;\n  color: var(--primary);\n}\n";

// ═══════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════

function PlayBtn(_ref2) {
  var text = _ref2.text,
    _ref2$label = _ref2.label,
    label = _ref2$label === void 0 ? "Play audio" : _ref2$label,
    small = _ref2.small;
  return /*#__PURE__*/React.createElement("button", {
    className: "play-btn".concat(small ? " small" : ""),
    onClick: function onClick() {
      return Voice.speak(text);
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: small ? 16 : 20
    }
  }, "\uD83D\uDD0A"), /*#__PURE__*/React.createElement("span", null, label));
}
function FurtherContext(_ref3) {
  var drill = _ref3.drill;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    show = _useState2[0],
    setShow = _useState2[1];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "fc-toggle",
    onClick: function onClick() {
      return setShow(!show);
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCD6 Further Context"), /*#__PURE__*/React.createElement("span", null, show ? "▲" : "▼")), show && /*#__PURE__*/React.createElement("div", {
    className: "fc-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fc-text"
  }, drill.ctx), drill.ex && drill.ex.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "fc-section-title"
  }, "\uD83D\uDCDA Standard Examples (LATAM)"), drill.ex.map(function (e, i) {
    return /*#__PURE__*/React.createElement("div", {
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
      onClick: function onClick() {
        return Voice.speak(e.es);
      }
    }, "\uD83D\uDD0A"));
  })), drill.vz && /*#__PURE__*/React.createElement("div", {
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
function LessonScreen(_ref4) {
  var lesson = _ref4.lesson,
    isVz = _ref4.isVz,
    onExit = _ref4.onExit,
    progress = _ref4.progress,
    saveProgress = _ref4.saveProgress;
  var _useState3 = useState("intro"),
    _useState4 = _slicedToArray(_useState3, 2),
    phase = _useState4[0],
    setPhase = _useState4[1]; // intro | drill | results
  var _useState5 = useState(_toConsumableArray(lesson.drills)),
    _useState6 = _slicedToArray(_useState5, 2),
    drillSet = _useState6[0],
    setDrillSet = _useState6[1];
  var _useState7 = useState(0),
    _useState8 = _slicedToArray(_useState7, 2),
    drillIndex = _useState8[0],
    setDrillIndex = _useState8[1];
  var _useState9 = useState(""),
    _useState0 = _slicedToArray(_useState9, 2),
    userAnswer = _useState0[0],
    setUserAnswer = _useState0[1];
  var _useState1 = useState(null),
    _useState10 = _slicedToArray(_useState1, 2),
    feedback = _useState10[0],
    setFeedback = _useState10[1];
  var _useState11 = useState([]),
    _useState12 = _slicedToArray(_useState11, 2),
    misses = _useState12[0],
    setMisses = _useState12[1];
  var _useState13 = useState(0),
    _useState14 = _slicedToArray(_useState13, 2),
    correct = _useState14[0],
    setCorrect = _useState14[1];
  var _useState15 = useState(false),
    _useState16 = _slicedToArray(_useState15, 2),
    missReview = _useState16[0],
    setMissReview = _useState16[1];
  var _useState17 = useState(false),
    _useState18 = _slicedToArray(_useState17, 2),
    recognizing = _useState18[0],
    setRecognizing = _useState18[1];
  var inputRef = useRef(null);
  var recognitionRef = useRef(null);
  var drill = drillSet[drillIndex];
  var startDrills = function startDrills() {
    setPhase("drill");
    setDrillIndex(0);
    setUserAnswer("");
    setFeedback(null);
    setTimeout(function () {
      var _inputRef$current;
      return (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
    }, 100);
  };
  var handleSubmit = function handleSubmit() {
    if (!userAnswer.trim() || feedback) return;
    var result = checkAnswer(userAnswer, drill);
    if (result.ok) {
      setCorrect(function (c) {
        return c + 1;
      });
      setFeedback({
        type: "correct"
      });
    } else if (result.accentMiss) {
      setMisses(function (m) {
        return [].concat(_toConsumableArray(m), [{
          drill: drill,
          userAnswer: userAnswer,
          expected: result.expected
        }]);
      });
      setFeedback({
        type: "accent",
        expected: result.expected
      });
    } else {
      setMisses(function (m) {
        return [].concat(_toConsumableArray(m), [{
          drill: drill,
          userAnswer: userAnswer,
          expected: result.expected
        }]);
      });
      setFeedback({
        type: "wrong",
        expected: result.expected
      });
    }
  };
  var handleNext = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var wasCorrect, newQueue, total, finalCorrect, pct, newProg, lessonsKey, lp;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            // Update SR queue
            wasCorrect = (feedback === null || feedback === void 0 ? void 0 : feedback.type) === "correct";
            newQueue = updateSRQueue(progress.srQueue || [], drill.id, wasCorrect);
            if (!(drillIndex + 1 >= drillSet.length)) {
              _context3.n = 4;
              break;
            }
            // End of drills
            total = drillSet.length;
            finalCorrect = correct + (wasCorrect ? 1 : 0);
            pct = Math.round(finalCorrect / total * 100);
            if (missReview) {
              _context3.n = 2;
              break;
            }
            newProg = _objectSpread(_objectSpread({}, progress), {}, {
              srQueue: newQueue
            });
            lessonsKey = isVz ? "vzLessons" : "lessons";
            if (!newProg[lessonsKey]) newProg[lessonsKey] = {};
            lp = newProg[lessonsKey][lesson.id] || {
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
            _context3.n = 1;
            return saveProgress(newProg);
          case 1:
            _context3.n = 3;
            break;
          case 2:
            _context3.n = 3;
            return saveProgress(_objectSpread(_objectSpread({}, progress), {}, {
              srQueue: newQueue
            }));
          case 3:
            setPhase("results");
            _context3.n = 6;
            break;
          case 4:
            _context3.n = 5;
            return saveProgress(_objectSpread(_objectSpread({}, progress), {}, {
              srQueue: newQueue
            }));
          case 5:
            setDrillIndex(function (i) {
              return i + 1;
            });
            setUserAnswer("");
            setFeedback(null);
            setTimeout(function () {
              var _inputRef$current2;
              return (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 ? void 0 : _inputRef$current2.focus();
            }, 100);
          case 6:
            return _context3.a(2);
        }
      }, _callee3);
    }));
    return function handleNext() {
      return _ref5.apply(this, arguments);
    };
  }();
  var handleKeyDown = function handleKeyDown(e) {
    if (e.key === "Enter") {
      if (feedback) handleNext();else handleSubmit();
    }
  };
  var startMissReview = function startMissReview() {
    var reviewDrills = misses.map(function (m) {
      return m.drill;
    });
    setDrillSet(reviewDrills);
    setDrillIndex(0);
    setMisses([]);
    setCorrect(0);
    setMissReview(true);
    setPhase("drill");
    setUserAnswer("");
    setFeedback(null);
    setTimeout(function () {
      var _inputRef$current3;
      return (_inputRef$current3 = inputRef.current) === null || _inputRef$current3 === void 0 ? void 0 : _inputRef$current3.focus();
    }, 100);
  };

  // Speech recognition for speak drills
  var startSpeechRecognition = function startSpeechRecognition() {
    if (recognizing) {
      var _recognitionRef$curre;
      (_recognitionRef$curre = recognitionRef.current) === null || _recognitionRef$curre === void 0 || _recognitionRef$curre.stop();
      return;
    }
    var r = Voice.createRecognition("es-MX");
    if (!r) {
      alert("Speech recognition not supported on this browser.");
      return;
    }
    recognitionRef.current = r;
    r.onstart = function () {
      return setRecognizing(true);
    };
    r.onend = function () {
      return setRecognizing(false);
    };
    r.onerror = function (e) {
      setRecognizing(false);
      console.error(e);
    };
    r.onresult = function (e) {
      var transcript = e.results[0][0].transcript;
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
    }, isVz ? lesson.level : "".concat(lesson.level, " \xB7 Lecci\xF3n ").concat(lesson.num)), /*#__PURE__*/React.createElement("div", {
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
    }, "\uD83D\uDCCB Reference Tables"), lesson.tables.map(function (table, ti) {
      return /*#__PURE__*/React.createElement("div", {
        key: ti,
        style: {
          marginBottom: 14
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "conj-table-title"
      }, table.title), /*#__PURE__*/React.createElement("table", {
        className: "conj-table"
      }, /*#__PURE__*/React.createElement("tbody", null, table.rows.map(function (row, ri) {
        return /*#__PURE__*/React.createElement("tr", {
          key: ri
        }, row.map(function (cell, ci) {
          return /*#__PURE__*/React.createElement("td", {
            key: ci
          }, cell);
        }));
      }))));
    })), /*#__PURE__*/React.createElement("button", {
      className: "btn ".concat(isVz ? "venezuelan" : "primary"),
      onClick: startDrills
    }, "Start Drills \xB7 ", drillSet.length, " Questions"));
  }

  // ─── RESULTS PHASE ─────────────────────
  if (phase === "results") {
    var total = drillSet.length;
    var pct = Math.round(correct / total * 100);
    var pctColor = pct >= 80 ? "var(--success)" : pct >= 60 ? "var(--primary)" : "var(--error)";
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
    }, "Missed Questions"), misses.map(function (miss, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        className: "miss-item"
      }, /*#__PURE__*/React.createElement("div", {
        className: "miss-prompt"
      }, miss.drill.q), /*#__PURE__*/React.createElement("div", {
        className: "miss-yours"
      }, "You: ", miss.userAnswer), /*#__PURE__*/React.createElement("div", {
        className: "miss-correct"
      }, "Correct: ", miss.expected));
    })), misses.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: 24,
        color: "var(--success)",
        fontSize: 18,
        fontWeight: 800
      }
    }, "\xA1Perfecto! Sin errores. ", isVz ? "Burda de chévere, chamo." : "Excelente trabajo."), /*#__PURE__*/React.createElement("button", {
      className: "btn ".concat(isVz ? "venezuelan" : "primary"),
      onClick: onExit
    }, "Back to Lessons"), !missReview && /*#__PURE__*/React.createElement("button", {
      className: "btn secondary",
      onClick: function onClick() {
        setDrillSet(_toConsumableArray(lesson.drills));
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
      width: "".concat((drillIndex + (feedback ? 1 : 0)) / drillSet.length * 100, "%")
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "drill-count"
  }, drillIndex + 1, "/", drillSet.length)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "drill-tag ".concat(drill.type)
  }, drill.type === "conj" && "Conjugation", drill.type === "trans_es" && "Translate → Spanish", drill.type === "trans_en" && "Translate → English", drill.type === "fill" && "Fill the Blank", drill.type === "listen" && "Listen & Type", drill.type === "speak" && "Speak It", drill.type === "vz_recall" && "Venezuelan Recall"), drill.tag === "review" && /*#__PURE__*/React.createElement("span", {
    className: "drill-tag review"
  }, "Review")), drill.type === "listen" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "drill-prompt"
  }, drill.q), /*#__PURE__*/React.createElement("button", {
    className: "play-btn",
    onClick: function onClick() {
      return Voice.speak(drill.audio || drill.a);
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20
    }
  }, "\uD83D\uDD0A"), /*#__PURE__*/React.createElement("span", null, "Tap to Hear \xB7 Tap again to repeat"))) : /*#__PURE__*/React.createElement("div", {
    className: "drill-prompt"
  }, drill.type === "trans_es" || drill.type === "trans_en" ? "\"".concat(drill.q, "\"") : drill.q), drill.hint && /*#__PURE__*/React.createElement("div", {
    className: "drill-hint"
  }, drill.hint), drill.type === "speak" && /*#__PURE__*/React.createElement("button", {
    className: "play-btn",
    onClick: function onClick() {
      return Voice.speak(drill.a);
    }
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
    onChange: function onChange(e) {
      return setUserAnswer(e.target.value);
    },
    onKeyDown: handleKeyDown,
    placeholder: drill.type === "conj" ? "Type the conjugated form..." : drill.type === "trans_es" ? "Type in Spanish..." : drill.type === "trans_en" ? "Type in English..." : drill.type === "listen" ? "Type what you hear..." : drill.type === "speak" ? "Tap mic or type..." : "Type your answer...",
    disabled: !!feedback,
    className: feedback ? feedback.type === "correct" ? "correct" : feedback.type === "accent" ? "accent-miss" : "wrong" : "",
    autoComplete: "off",
    autoCapitalize: "off",
    autoCorrect: "off",
    spellCheck: "false"
  })), (drill.type === "speak" || drill.type === "listen") && Voice.recognitionSupported() && /*#__PURE__*/React.createElement("button", {
    className: "mic-btn ".concat(recognizing ? "recording" : ""),
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
    className: "feedback ".concat(feedback.type === "correct" ? "correct" : feedback.type === "accent" ? "accent" : "wrong")
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
    onClick: function onClick() {
      return Voice.speak(feedback.expected);
    },
    style: {
      marginLeft: 8,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDD0A"), /*#__PURE__*/React.createElement("span", null, "Hear it"))), feedback.type === "correct" && /*#__PURE__*/React.createElement("div", {
    className: "feedback-answer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "play-btn small",
    onClick: function onClick() {
      return Voice.speak(drill.a);
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDD0A"), /*#__PURE__*/React.createElement("span", null, "Hear the answer"))), /*#__PURE__*/React.createElement("div", {
    className: "feedback-explanation"
  }, drill.exp), /*#__PURE__*/React.createElement(FurtherContext, {
    drill: drill
  })));
}

// ═══════════════════════════════════════════════════════════════
// HOME (INICIO) TAB
// ═══════════════════════════════════════════════════════════════
function InicioTab(_ref6) {
  var _LEVELS$find, _LEVELS$find2;
  var progress = _ref6.progress,
    dueReviews = _ref6.dueReviews,
    onStartReview = _ref6.onStartReview,
    onPickLesson = _ref6.onPickLesson;
  var totalDrills = progress.totalDrills || 0;
  var totalCorrect = progress.totalCorrect || 0;
  var accuracy = totalDrills > 0 ? Math.round(totalCorrect / totalDrills * 100) : 0;
  var completedFormal = Object.keys(progress.lessons || {}).length;
  var completedVz = Object.keys(progress.vzLessons || {}).length;

  // Determine current level based on completed lessons
  var allLessons = LESSONS || [];
  var currentLessonObj = allLessons.find(function (l) {
    var _progress$lessons;
    return !((_progress$lessons = progress.lessons) !== null && _progress$lessons !== void 0 && _progress$lessons[l.id]) || progress.lessons[l.id].bestScore < 80;
  });
  var currentLevel = currentLessonObj ? currentLessonObj.level : "C2";
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
  }, LEVELS.map(function (lv) {
    return /*#__PURE__*/React.createElement("div", {
      key: lv.id,
      className: "roadmap-item ".concat(currentLevel === lv.id ? "active" : "")
    }, /*#__PURE__*/React.createElement("div", {
      className: "roadmap-level",
      style: {
        color: lv.color
      }
    }, lv.id), /*#__PURE__*/React.createElement("div", {
      className: "roadmap-name"
    }, lv.name));
  })), dueReviews.length > 0 && /*#__PURE__*/React.createElement("div", {
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
    onClick: function onClick() {
      return onPickLesson(currentLessonObj, false);
    }
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
      background: "".concat((_LEVELS$find = LEVELS.find(function (l) {
        return l.id === currentLessonObj.level;
      })) === null || _LEVELS$find === void 0 ? void 0 : _LEVELS$find.color, "22"),
      color: (_LEVELS$find2 = LEVELS.find(function (l) {
        return l.id === currentLessonObj.level;
      })) === null || _LEVELS$find2 === void 0 ? void 0 : _LEVELS$find2.color
    }
  }, currentLessonObj.level)))));
}

// ═══════════════════════════════════════════════════════════════
// CURRICULUM (CURSO) TAB
// ═══════════════════════════════════════════════════════════════
function CursoTab(_ref7) {
  var progress = _ref7.progress,
    onPickLesson = _ref7.onPickLesson;
  var _useState19 = useState("all"),
    _useState20 = _slicedToArray(_useState19, 2),
    filter = _useState20[0],
    setFilter = _useState20[1];
  var lessonsByLevel = useMemo(function () {
    var groups = {};
    LEVELS.forEach(function (lv) {
      return groups[lv.id] = [];
    });
    LESSONS.forEach(function (l) {
      if (groups[l.level]) groups[l.level].push(l);
    });
    return groups;
  }, []);
  var filteredLevels = filter === "all" ? LEVELS : LEVELS.filter(function (l) {
    return l.id === filter;
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Curriculum"), /*#__PURE__*/React.createElement("div", {
    className: "header-sub"
  }, "A1 \u2192 C2 \xB7 ", LESSONS.length, " lessons"))), /*#__PURE__*/React.createElement("div", {
    className: "roadmap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "roadmap-item ".concat(filter === "all" ? "active" : ""),
    onClick: function onClick() {
      return setFilter("all");
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "roadmap-level"
  }, "All"), /*#__PURE__*/React.createElement("div", {
    className: "roadmap-name"
  }, LESSONS.length)), LEVELS.map(function (lv) {
    var _lessonsByLevel$lv$id;
    return /*#__PURE__*/React.createElement("div", {
      key: lv.id,
      className: "roadmap-item ".concat(filter === lv.id ? "active" : ""),
      onClick: function onClick() {
        return setFilter(lv.id);
      },
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
  })), filteredLevels.map(function (lv) {
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
    }, "Coming soon"), (_lessonsByLevel$lv$id3 = lessonsByLevel[lv.id]) === null || _lessonsByLevel$lv$id3 === void 0 ? void 0 : _lessonsByLevel$lv$id3.map(function (lesson) {
      var _progress$lessons2;
      var lp = (_progress$lessons2 = progress.lessons) === null || _progress$lessons2 === void 0 ? void 0 : _progress$lessons2[lesson.id];
      var pct = lp ? lp.bestScore : 0;
      return /*#__PURE__*/React.createElement("div", {
        key: lesson.id,
        className: "lesson-card",
        onClick: function onClick() {
          return onPickLesson(lesson, false);
        }
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
          background: "".concat(lv.color, "22"),
          color: lv.color
        }
      }, lesson.level)), /*#__PURE__*/React.createElement("div", {
        className: "lesson-progress-bar"
      }, /*#__PURE__*/React.createElement("div", {
        className: "lesson-progress-fill",
        style: {
          width: "".concat(pct, "%")
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
  var _useState21 = useState(""),
    _useState22 = _slicedToArray(_useState21, 2),
    search = _useState22[0],
    setSearch = _useState22[1];
  var q = search.toLowerCase().trim();
  var matches = function matches(text) {
    return !q || text.toLowerCase().includes(q);
  };
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
    onChange: function onChange(e) {
      return setSearch(e.target.value);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "ref-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Conjugation Tables"), REFERENCE.conjugations.filter(function (t) {
    return matches(t.title) || t.verbs.some(function (v) {
      return matches(v.inf);
    });
  }).map(function (table, ti) {
    return /*#__PURE__*/React.createElement("div", {
      key: ti,
      className: "ref-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ref-card-title"
    }, table.title), table.verbs.map(function (v, vi) {
      return /*#__PURE__*/React.createElement("div", {
        key: vi,
        className: "ref-verb-row"
      }, /*#__PURE__*/React.createElement("div", {
        className: "ref-verb-name"
      }, v.inf), v.forms.map(function (f, fi) {
        return /*#__PURE__*/React.createElement("span", {
          key: fi,
          className: "ref-verb-form"
        }, f);
      }));
    }));
  })), /*#__PURE__*/React.createElement("div", {
    className: "ref-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Pronouns"), REFERENCE.pronouns.filter(function (t) {
    return matches(t.title) || t.rows.some(function (r) {
      return matches(r.join(" "));
    });
  }).map(function (p, pi) {
    return /*#__PURE__*/React.createElement("div", {
      key: pi,
      className: "ref-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ref-card-title"
    }, p.title), /*#__PURE__*/React.createElement("table", {
      className: "conj-table"
    }, /*#__PURE__*/React.createElement("tbody", null, p.rows.map(function (row, ri) {
      return /*#__PURE__*/React.createElement("tr", {
        key: ri
      }, row.map(function (cell, ci) {
        return /*#__PURE__*/React.createElement("td", {
          key: ci
        }, cell);
      }));
    }))));
  })), /*#__PURE__*/React.createElement("div", {
    className: "ref-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Quick Guides"), REFERENCE.guides.filter(function (g) {
    return matches(g.title) || matches(g.content);
  }).map(function (g, gi) {
    return /*#__PURE__*/React.createElement("div", {
      key: gi,
      className: "ref-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ref-card-title"
    }, g.title), /*#__PURE__*/React.createElement("div", {
      className: "guide-content"
    }, g.content));
  })));
}

// ═══════════════════════════════════════════════════════════════
// VOICE (VOZ) TAB
// ═══════════════════════════════════════════════════════════════
function VozTab() {
  var _useState23 = useState(""),
    _useState24 = _slicedToArray(_useState23, 2),
    text = _useState24[0],
    setText = _useState24[1];
  var _useState25 = useState(false),
    _useState26 = _slicedToArray(_useState25, 2),
    recognizing = _useState26[0],
    setRecognizing = _useState26[1];
  var _useState27 = useState(""),
    _useState28 = _slicedToArray(_useState27, 2),
    transcript = _useState28[0],
    setTranscript = _useState28[1];
  var recRef = useRef(null);
  var handleSpeak = function handleSpeak() {
    if (!text.trim()) return;
    Voice.speak(text);
  };
  var handleRecognize = function handleRecognize() {
    if (recognizing) {
      var _recRef$current;
      (_recRef$current = recRef.current) === null || _recRef$current === void 0 || _recRef$current.stop();
      return;
    }
    var r = Voice.createRecognition("es-MX");
    if (!r) {
      setTranscript("⚠️ Speech recognition not supported on this browser. iOS Safari should support it; try in Safari directly.");
      return;
    }
    recRef.current = r;
    r.onstart = function () {
      setRecognizing(true);
      setTranscript("Listening...");
    };
    r.onend = function () {
      return setRecognizing(false);
    };
    r.onerror = function (e) {
      setRecognizing(false);
      setTranscript("Error: ".concat(e.error));
    };
    r.onresult = function (e) {
      var result = e.results[0][0].transcript;
      var conf = e.results[0][0].confidence;
      setTranscript("".concat(result).concat(conf ? " (".concat(Math.round(conf * 100), "% confidence)") : ""));
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
    onChange: function onChange(e) {
      return setText(e.target.value);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "voice-controls"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn primary",
    onClick: handleSpeak,
    disabled: !text.trim()
  }, "\uD83D\uDD0A Speak"), /*#__PURE__*/React.createElement("button", {
    className: "btn secondary",
    onClick: function onClick() {
      return Voice.cancel();
    }
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
    className: "mic-btn ".concat(recognizing ? "recording" : ""),
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
  }, ["¿Cómo estás, mi amor?", "Quiero ir a la playa este fin de semana.", "No pude dormir bien anoche.", "Hablamos burda anoche, chamo.", "¿Qué hiciste ayer?"].map(function (p, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "fc-example"
    }, /*#__PURE__*/React.createElement("div", {
      className: "fc-example-text"
    }, /*#__PURE__*/React.createElement("div", {
      className: "fc-example-es"
    }, p)), /*#__PURE__*/React.createElement("button", {
      className: "fc-play",
      onClick: function onClick() {
        return Voice.speak(p);
      }
    }, "\uD83D\uDD0A"));
  })));
}

// ═══════════════════════════════════════════════════════════════
// VENEZOLANO TAB
// ═══════════════════════════════════════════════════════════════
function VenezolanoTab(_ref8) {
  var progress = _ref8.progress,
    onPickLesson = _ref8.onPickLesson;
  var _useState29 = useState("all"),
    _useState30 = _slicedToArray(_useState29, 2),
    filter = _useState30[0],
    setFilter = _useState30[1];
  var lessonsByLevel = useMemo(function () {
    var groups = {};
    VZ_LEVELS.forEach(function (lv) {
      return groups[lv.id] = [];
    });
    VZ_LESSONS.forEach(function (l) {
      if (groups[l.level]) groups[l.level].push(l);
    });
    return groups;
  }, []);
  var filteredLevels = filter === "all" ? VZ_LEVELS : VZ_LEVELS.filter(function (l) {
    return l.id === filter;
  });
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
  }, VZ_LEVELS.map(function (lv) {
    return /*#__PURE__*/React.createElement("div", {
      key: lv.id,
      className: "roadmap-item ".concat(filter === lv.id ? "active vz" : ""),
      onClick: function onClick() {
        return setFilter(filter === lv.id ? "all" : lv.id);
      },
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
    }, lv.name));
  })), filteredLevels.map(function (lv) {
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
    }, "Coming soon"), (_lessonsByLevel$lv$id5 = lessonsByLevel[lv.id]) === null || _lessonsByLevel$lv$id5 === void 0 ? void 0 : _lessonsByLevel$lv$id5.map(function (lesson) {
      var _progress$vzLessons;
      var lp = (_progress$vzLessons = progress.vzLessons) === null || _progress$vzLessons === void 0 ? void 0 : _progress$vzLessons[lesson.id];
      var pct = lp ? lp.bestScore : 0;
      return /*#__PURE__*/React.createElement("div", {
        key: lesson.id,
        className: "lesson-card",
        onClick: function onClick() {
          return onPickLesson(lesson, true);
        }
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
          background: "".concat(lv.color, "22"),
          color: lv.color
        }
      }, lesson.level)), /*#__PURE__*/React.createElement("div", {
        className: "lesson-progress-bar"
      }, /*#__PURE__*/React.createElement("div", {
        className: "lesson-progress-fill vz",
        style: {
          width: "".concat(pct, "%")
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
function App() {
  var _useState31 = useState("inicio"),
    _useState32 = _slicedToArray(_useState31, 2),
    tab = _useState32[0],
    setTab = _useState32[1];
  var _useState33 = useState({
      lessons: {},
      vzLessons: {},
      totalDrills: 0,
      totalCorrect: 0,
      srQueue: []
    }),
    _useState34 = _slicedToArray(_useState33, 2),
    progress = _useState34[0],
    setProgress = _useState34[1];
  var _useState35 = useState(true),
    _useState36 = _slicedToArray(_useState35, 2),
    loading = _useState36[0],
    setLoading = _useState36[1];

  // Active lesson state
  var _useState37 = useState(null),
    _useState38 = _slicedToArray(_useState37, 2),
    activeLesson = _useState38[0],
    setActiveLesson = _useState38[1];
  var _useState39 = useState(false),
    _useState40 = _slicedToArray(_useState39, 2),
    activeIsVz = _useState40[0],
    setActiveIsVz = _useState40[1];
  var _useState41 = useState(false),
    _useState42 = _slicedToArray(_useState41, 2),
    reviewMode = _useState42[0],
    setReviewMode = _useState42[1];
  useEffect(function () {
    _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var saved;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            _context4.n = 1;
            return db.get("dale-espanol-v2");
          case 1:
            saved = _context4.v;
            if (saved) setProgress(saved);
            setLoading(false);
          case 2:
            return _context4.a(2);
        }
      }, _callee4);
    }))();
  }, []);
  var saveProgress = useCallback(/*#__PURE__*/function () {
    var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(p) {
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            setProgress(p);
            _context5.n = 1;
            return db.set("dale-espanol-v2", p);
          case 1:
            return _context5.a(2);
        }
      }, _callee5);
    }));
    return function (_x) {
      return _ref0.apply(this, arguments);
    };
  }(), []);
  var dueReviews = useMemo(function () {
    return (progress.srQueue || []).filter(function (item) {
      return isDue(item.due);
    });
  }, [progress.srQueue]);
  var startReviewSession = function startReviewSession() {
    if (dueReviews.length === 0) return;
    var allDrills = [].concat(_toConsumableArray(LESSONS), _toConsumableArray(VZ_LESSONS)).flatMap(function (l) {
      return l.drills;
    });
    var reviewDrills = dueReviews.map(function (r) {
      return allDrills.find(function (d) {
        return d.id === r.drillId;
      });
    }).filter(Boolean);
    if (reviewDrills.length === 0) return;
    var fakeLesson = {
      id: "REVIEW",
      level: "Review",
      num: 0,
      title: "Daily Review",
      subtitle: "".concat(reviewDrills.length, " items from spaced repetition"),
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
      onExit: function onExit() {
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
    onPickLesson: function onPickLesson(l, isVz) {
      setActiveLesson(l);
      setActiveIsVz(isVz);
    }
  }), tab === "curso" && /*#__PURE__*/React.createElement(CursoTab, {
    progress: progress,
    onPickLesson: function onPickLesson(l, isVz) {
      setActiveLesson(l);
      setActiveIsVz(isVz);
    }
  }), tab === "ref" && /*#__PURE__*/React.createElement(ReferenciaTab, null), tab === "voz" && /*#__PURE__*/React.createElement(VozTab, null), tab === "vz" && /*#__PURE__*/React.createElement(VenezolanoTab, {
    progress: progress,
    onPickLesson: function onPickLesson(l, isVz) {
      setActiveLesson(l);
      setActiveIsVz(isVz);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "tabbar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "tabbar-item ".concat(tab === "inicio" ? "active" : ""),
    onClick: function onClick() {
      return setTab("inicio");
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "tabbar-icon"
  }, "\uD83C\uDFE0"), /*#__PURE__*/React.createElement("span", null, "Inicio")), /*#__PURE__*/React.createElement("button", {
    className: "tabbar-item ".concat(tab === "curso" ? "active" : ""),
    onClick: function onClick() {
      return setTab("curso");
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "tabbar-icon"
  }, "\uD83D\uDCDA"), /*#__PURE__*/React.createElement("span", null, "Curso")), /*#__PURE__*/React.createElement("button", {
    className: "tabbar-item ".concat(tab === "ref" ? "active" : ""),
    onClick: function onClick() {
      return setTab("ref");
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "tabbar-icon"
  }, "\uD83D\uDCD6"), /*#__PURE__*/React.createElement("span", null, "Refer.")), /*#__PURE__*/React.createElement("button", {
    className: "tabbar-item ".concat(tab === "voz" ? "active" : ""),
    onClick: function onClick() {
      return setTab("voz");
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "tabbar-icon"
  }, "\uD83C\uDFA4"), /*#__PURE__*/React.createElement("span", null, "Voz")), /*#__PURE__*/React.createElement("button", {
    className: "tabbar-item ".concat(tab === "vz" ? "active vz-tab" : ""),
    onClick: function onClick() {
      return setTab("vz");
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "tabbar-icon"
  }, "\uD83C\uDDFB\uD83C\uDDEA"), /*#__PURE__*/React.createElement("span", null, "Venez."))));
}
