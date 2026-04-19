import { useState, useEffect } from "react";

const STORAGE_KEY = "psych_v3";

// ── CURRICULUM ────────────────────────────────────────────────────────────────
const CURRICULUM = [
  // כמותי – אלגברה
  { title: "יסודות אלגבריים", subject: "כמותי" },
  { title: "שברים – יסודות", subject: "כמותי" },
  { title: "שברים", subject: "כמותי" },
  { title: "ביטויים – יסודות", subject: "כמותי" },
  { title: "ביטויים", subject: "כמותי" },
  { title: "משוואות – יסודות", subject: "כמותי" },
  { title: "משוואות", subject: "כמותי" },
  { title: "חזקות – יסודות", subject: "כמותי" },
  { title: "שורשים – יסודות", subject: "כמותי" },
  { title: "חזקות ושורשים – יסודות", subject: "כמותי" },
  { title: "חזקות ושורשים", subject: "כמותי" },
  { title: "אי שוויונות", subject: "כמותי" },
  { title: "ערך מוחלט", subject: "כמותי" },
  { title: "מספרים ראשוניים", subject: "כמותי" },
  { title: "חלוקה ושארית", subject: "כמותי" },
  { title: "מספרים שלמים", subject: "כמותי" },
  { title: "ציר המספרים", subject: "כמותי" },
  { title: "תרגילים באותיות", subject: "כמותי" },
  { title: "הגדרת פעולה", subject: "כמותי" },
  { title: "הבנה אלגברית", subject: "כמותי" },
  // כמותי – גיאומטריה
  { title: "ישרים – יסודות", subject: "כמותי" },
  { title: "ישרים", subject: "כמותי" },
  { title: "משולשים – יסודות", subject: "כמותי" },
  { title: "משולשים", subject: "כמותי" },
  { title: "מרובעים – יסודות", subject: "כמותי" },
  { title: "מרובעים", subject: "כמותי" },
  { title: "מעגלים – יסודות", subject: "כמותי" },
  { title: "מעגלים", subject: "כמותי" },
  { title: "מצולעים", subject: "כמותי" },
  { title: "תלת ממד", subject: "כמותי" },
  { title: "דמיון", subject: "כמותי" },
  { title: "מערכת צירים", subject: "כמותי" },
  { title: "הבנה גיאומטרית", subject: "כמותי" },
  { title: "תרשימים – לימוד", subject: "כמותי" },
  { title: "תרשימים – תרגול", subject: "כמותי" },
  // כמותי – בעיות
  { title: "ניסוי וטעייה", subject: "כמותי" },
  { title: "כלליות", subject: "כמותי" },
  { title: "אחוזים", subject: "כמותי" },
  { title: "חפיפה", subject: "כמותי" },
  { title: "ממוצעים", subject: "כמותי" },
  { title: "הספק", subject: "כמותי" },
  { title: "תנועה", subject: "כמותי" },
  { title: "צירופים", subject: "כמותי" },
  { title: "הסתברות", subject: "כמותי" },
  // מילולי
  { title: "תרגול מילים – אפליקציה", subject: "מילולי" },
  { title: "אנלוגיות – יסודות", subject: "מילולי" },
  { title: "אנלוגיות – תרגול", subject: "מילולי" },
  { title: "השלמת משפטים – יסודות", subject: "מילולי" },
  { title: "השלמת משפטים – תרגול", subject: "מילולי" },
  { title: "הבנת הנקרא – יסודות", subject: "מילולי" },
  { title: "הבנת הנקרא – תרגול", subject: "מילולי" },
  // אנגלית
  { title: "תרגול מילים – אפליקציה", subject: "אנגלית" },
  { title: "אוצר מילים – יסודות", subject: "אנגלית" },
  { title: "אוצר מילים – תרגול", subject: "אנגלית" },
  { title: "קריאה והבנה – יסודות", subject: "אנגלית" },
  { title: "קריאה והבנה – תרגול", subject: "אנגלית" },
  { title: "דקדוק – יסודות", subject: "אנגלית" },
  { title: "דקדוק – תרגול", subject: "אנגלית" },
  // כללי
  { title: "ביצוע סימולציה", subject: "כללי" },
  { title: "חזרה על טעויות מסימולציה", subject: "כללי" },
];

const SUBJECTS = ["מילולי", "כמותי", "אנגלית", "כללי"];

// New color scheme: מילולי=purple, כמותי=blue, אנגלית=orange, כללי=green
const SC = {
  מילולי: { light: { bg: "#F3F0FF", text: "#6D3BB5", dot: "#8B5CF6", chip: "#EDE9FE" }, dark: { bg: "#2D1F4E", text: "#C4B5FD", dot: "#A78BFA", chip: "#2D1F4E" } },
  כמותי:  { light: { bg: "#EFF6FF", text: "#1D4ED8", dot: "#3B82F6", chip: "#DBEAFE" }, dark: { bg: "#1E2D4E", text: "#93C5FD", dot: "#60A5FA", chip: "#1E2D4E" } },
  אנגלית: { light: { bg: "#FFF7ED", text: "#C2410C", dot: "#F97316", chip: "#FED7AA" }, dark: { bg: "#3D1F0A", text: "#FDB97D", dot: "#FB923C", chip: "#3D1F0A" } },
  כללי:   { light: { bg: "#F0FDF4", text: "#15803D", dot: "#22C55E", chip: "#BBF7D0" }, dark: { bg: "#0F2E1A", text: "#86EFAC", dot: "#4ADE80", chip: "#0F2E1A" } },
};

function sc(subject, isDark) {
  return (SC[subject] || SC["כללי"])[isDark ? "dark" : "light"];
}

const DAYS_HE = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
const MONTH_HE = ["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"];
const MONTH_SH = ["ינ","פב","מר","אפ","מי","יו","יל","אב","ספ","אק","נו","דצ"];

function toYMD(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function daysUntil(s) {
  if (!s) return null;
  const t = new Date(); t.setHours(0,0,0,0);
  return Math.ceil((new Date(s) - t) / 86400000);
}
function getWeekDates(offset = 0) {
  const t = new Date(); t.setHours(0,0,0,0);
  const sun = new Date(t); sun.setDate(t.getDate() - t.getDay() + offset * 7);
  return Array.from({length:7}, (_,i) => { const d=new Date(sun); d.setDate(sun.getDate()+i); return d; });
}
function getWeekSunday(offset) {
  const t = new Date(); t.setHours(0,0,0,0);
  const s = new Date(t); s.setDate(t.getDate() - t.getDay() + offset * 7);
  return toYMD(s);
}
function getWeekDatesFromSunday(ymd) {
  const b = new Date(ymd);
  return Array.from({length:7}, (_,i) => { const d=new Date(b); d.setDate(b.getDate()+i); return d; });
}
function weekLabel(offset, sunday) {
  const d = new Date(sunday);
  const e = new Date(d); e.setDate(d.getDate()+6);
  const f = x => `${x.getDate()}/${MONTH_SH[x.getMonth()]}`;
  const tag = offset === 0 ? " · השבוע" : offset < 0 ? " · עבר" : "";
  return `${f(d)} – ${f(e)}${tag}`;
}

function defaultData() {
  return { examDate: "", tasks: [], nextId: 1, planItems: [], nextPlanId: 1 };
}
function makeInitialPlanItems() {
  return CURRICULUM.map((c, i) => ({ id: i+1, title: c.title, subject: c.subject, weekOffsets: [0], days: [], notes: "", generated: false }));
}

// ── THEMES ────────────────────────────────────────────────────────────────────
const GREEN = "#22C55E";
const GREEN_DARK = "#4ADE80";
const GREEN_BG_L = "#F0FDF4";
const GREEN_BG_D = "#0A1F0F";
const GREEN_BORDER_L = "#BBF7D0";
const GREEN_BORDER_D = "#14532D";

const LIGHT = {
  isDark: false,
  page: "#F8F8F6",
  nav: "rgba(248,248,246,0.94)",
  navBorder: "#E5E5E0",
  card: "#FFFFFF",
  cardBorder: "#EBEBE6",
  cardHover: "#F4F4F1",
  input: "#FFFFFF",
  inputBorder: "#DDDDD8",
  text: "#111111",
  textSub: "#6B6B6B",
  textFaint: "#AAAAAA",
  textMuted: "#CCCCCC",
  accent: GREEN,
  accentText: "#FFFFFF",
  accentBg: GREEN_BG_L,
  accentBorder: GREEN_BORDER_L,
  progressBg: "#E8E8E4",
  progressFill: GREEN,
  divider: "#EBEBE6",
  taskHover: "#F4F4F1",
  weekHighlight: "#F0FDF4",
  weekHighlightBorder: GREEN_BORDER_L,
  shadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
  shadowMd: "0 4px 12px rgba(0,0,0,0.08)",
  navActive: GREEN,
};
const DARK = {
  isDark: true,
  page: "#0C0C0E",
  nav: "rgba(12,12,14,0.96)",
  navBorder: "#1E1E22",
  card: "#141416",
  cardBorder: "#1E1E22",
  cardHover: "#1A1A1E",
  input: "#1A1A1E",
  inputBorder: "#2A2A30",
  text: "#F0F0F2",
  textSub: "#8A8A96",
  textFaint: "#4A4A56",
  textMuted: "#3A3A44",
  accent: GREEN_DARK,
  accentText: "#0C0C0E",
  accentBg: GREEN_BG_D,
  accentBorder: GREEN_BORDER_D,
  progressBg: "#1E1E22",
  progressFill: GREEN_DARK,
  divider: "#1E1E22",
  taskHover: "#1A1A1E",
  weekHighlight: GREEN_BG_D,
  weekHighlightBorder: GREEN_BORDER_D,
  shadow: "0 1px 3px rgba(0,0,0,0.4)",
  shadowMd: "0 4px 16px rgba(0,0,0,0.5)",
  navActive: GREEN_DARK,
};

// ── STORAGE HELPERS ───────────────────────────────────────────────────────────
// Works in both Claude (window.storage) and GitHub Pages (localStorage)
const storage = {
  async get(key) {
    if (window.storage?.get) {
      try { const r = await window.storage.get(key); return r?.value ? JSON.parse(r.value) : null; } catch {}
    }
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch { return null; }
  },
  async set(key, value) {
    const str = JSON.stringify(value);
    if (window.storage?.set) {
      try { await window.storage.set(key, str); return; } catch {}
    }
    try { localStorage.setItem(key, str); } catch {}
  },
  async delete(key) {
    if (window.storage?.delete) {
      try { await window.storage.delete(key); } catch {}
    }
    try { localStorage.removeItem(key); } catch {}
  },
};
function loadData() {
  const items = makeInitialPlanItems();
  return { ...defaultData(), planItems: items, nextPlanId: items.length + 1 };
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [data, setData] = useState(loadData);
  const [hydrated, setHydrated] = useState(false);

  // PWA setup – runs once
  useEffect(() => {
    document.title = "📚 פסיכומטרי – מעקב למידה";

    // Viewport
    let vp = document.querySelector("meta[name='viewport']");
    if (!vp) { vp = document.createElement("meta"); vp.name = "viewport"; document.head.appendChild(vp); }
    vp.content = "width=device-width, initial-scale=1, viewport-fit=cover";

    // Favicon
    let icon = document.querySelector("link[rel~='icon']");
    if (!icon) { icon = document.createElement("link"); icon.rel = "icon"; document.head.appendChild(icon); }
    icon.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📚</text></svg>";

    // Apple touch icon
    let apple = document.querySelector("link[rel='apple-touch-icon']");
    if (!apple) { apple = document.createElement("link"); apple.rel = "apple-touch-icon"; document.head.appendChild(apple); }
    apple.href = icon.href;

    // Apple PWA meta
    const setMeta = (name, content) => {
      let m = document.querySelector(`meta[name='${name}']`);
      if (!m) { m = document.createElement("meta"); m.name = name; document.head.appendChild(m); }
      m.content = content;
    };
    setMeta("apple-mobile-web-app-title", "פסיכומטרי");
    setMeta("apple-mobile-web-app-capable", "yes");
    setMeta("apple-mobile-web-app-status-bar-style", "black-translucent");
    setMeta("theme-color", "#0C0C0E");
  }, []);
  const [tab, setTab] = useState("today");
  const [weekOffset, setWeekOffset] = useState(0);
  const [showAdd, setShowAdd] = useState(null);
  const [dark, setDark] = useState(false);
  const T = dark ? DARK : LIGHT;

  useEffect(() => {
    (async () => {
      try {
        const p = await storage.get(STORAGE_KEY);
        if (p) {
          const planItems = (p.planItems || []).map(item => ({
            ...item,
            weekOffsets: item.weekOffsets || (item.weekOffset !== undefined ? [item.weekOffset] : [0])
          }));
          const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 30);
          const cutoffStr = toYMD(cutoff);
          setData(d => ({ ...d, ...p, planItems, tasks: (p.tasks||[]).filter(t => t.date >= cutoffStr) }));
          if (p.dark !== undefined) setDark(p.dark);
        }
      } catch {}
      setHydrated(true);
    })();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    (async () => { try { await storage.set(STORAGE_KEY, {...data, dark}); } catch {} })();
  }, [data, dark, hydrated]);

  const update = patch => setData(d => ({ ...d, ...patch }));
  const toggle = id => update({ tasks: data.tasks.map(t => t.id === id ? {...t, done: !t.done} : t) });
  const remove = id => update({ tasks: data.tasks.filter(t => t.id !== id) });

  const todayStr = toYMD(new Date());
  const todayTasks = data.tasks.filter(t => t.date === todayStr || (!t.done && t.date < todayStr));
  const allTasks = data.tasks;
  const totalDone = allTasks.filter(t => t.done).length;
  const pct = allTasks.length ? Math.round(totalDone / allTasks.length * 100) : 0;
  const dLeft = daysUntil(data.examDate);
  const weekDates = getWeekDates(weekOffset);

  const addFromPlan = (item, date) => {
    const newTask = { id: data.nextId, date, done: false, title: item.title, subject: item.subject, notes: item.notes || "", planItemId: item.id };
    update({ tasks: [...data.tasks, newTask], nextId: data.nextId + 1 });
  };

  return (
    <div dir="rtl" style={{ minHeight: "100vh", background: T.page, fontFamily: "'Outfit', sans-serif", color: T.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        button { cursor: pointer; font-family: inherit; }
        input, select, textarea { font-family: inherit; outline: none; }
        ::-webkit-scrollbar { width: 3px; height: 3px; }
        ::-webkit-scrollbar-thumb { background: ${T.textFaint}; border-radius: 2px; }
        .t-item:hover { background: ${T.taskHover} !important; }
        .del-btn { opacity: 0 !important; transition: opacity 0.15s; }
        .t-item:hover .del-btn { opacity: 1 !important; }
        .day-col:hover .add-day-btn { opacity: 1 !important; }
        .nav-btn { transition: color 0.15s, border-color 0.15s; }
        .chip-btn { transition: all 0.12s; }
        .card { transition: box-shadow 0.15s; }
      `}</style>
      {/* ── NAV ── */}
      <header style={{ background: T.nav, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: `1px solid ${T.navBorder}`, position: "sticky", top: 0, zIndex: 200, paddingTop: "env(safe-area-inset-top)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
            {/* Brand */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <div>
                <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: 3, color: T.textFaint, textTransform: "uppercase", marginBottom: 1 }}>מעקב למידה</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 500, color: T.text, letterSpacing: "-0.02em", lineHeight: 1 }}>פסיכומטרי</div>
              </div>
              {dLeft !== null && (
                <div style={{ display: "flex", alignItems: "center", gap: 7, paddingBottom: 1 }}>
                  <div style={{ width: 1, height: 20, background: T.divider }} />
                  <span style={{ fontSize: 11.5, color: dLeft <= 14 ? "#EF4444" : T.textSub, fontWeight: 400 }}>
                    {dLeft > 0 ? `${dLeft} ימים` : dLeft === 0 ? "היום!" : "עבר"}
                  </span>
                </div>
              )}
            </div>

            {/* Right side */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* Progress */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 60, height: 2.5, background: T.progressBg, borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: T.progressFill, transition: "width 0.5s cubic-bezier(.4,0,.2,1)" }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: T.textSub, minWidth: 28 }}>{pct}%</span>
              </div>
              {/* Theme toggle */}
              <button onClick={() => setDark(d => !d)} style={{ width: 32, height: 32, borderRadius: "50%", border: `1px solid ${T.cardBorder}`, background: T.card, color: T.textSub, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: T.shadow }}>
                {dark ? "☀" : "◑"}
              </button>
            </div>
          </div>

          {/* Tab bar */}
          <div style={{ display: "flex", borderTop: `1px solid ${T.divider}`, marginTop: 0 }}>
            {[["today","היום"],["week","שבוע"],["plan","תכנית"],["overview","סקירה"]].map(([k,label]) => (
              <button key={k} className="nav-btn" onClick={() => setTab(k)} style={{
                padding: "10px 16px", border: "none", background: "transparent",
                fontSize: 12, fontWeight: tab === k ? 600 : 400, letterSpacing: "0.05em",
                color: tab === k ? T.navActive : T.textFaint,
                borderBottom: `2px solid ${tab === k ? T.navActive : "transparent"}`,
                marginBottom: -1,
              }}>{label}</button>
            ))}
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "28px 24px" }}>

        {/* ── TODAY ── */}
        {tab === "today" && (
          <div style={{ maxWidth: 540 }}>
            {!data.examDate && (
              <div onClick={() => setTab("overview")} style={{ background: T.isDark ? "#1A1A2E" : "#EFF6FF", border: `1px solid ${T.isDark ? "#3B82F620" : "#BFDBFE"}`, borderRadius: 12, padding: "10px 16px", marginBottom: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12.5, color: T.isDark ? "#93C5FD" : "#1D4ED8" }}>📅 הגדר תאריך מבחן לראות ספירה לאחור</span>
                <span style={{ fontSize: 11, color: T.isDark ? "#60A5FA" : "#3B82F6", fontWeight: 600 }}>הגדר ←</span>
              </div>
            )}
            <DaySummaryCard todayTasks={todayTasks} dLeft={dLeft} T={T} />
            <SectionHeader T={T} count={todayTasks.filter(t=>t.done).length} total={todayTasks.length} onAdd={() => setShowAdd(showAdd === "today" ? null : "today")} addLabel={showAdd === "today" ? "סגור" : "+ הוסף"} />
            {showAdd === "today" && <PlanPicker planItems={data.planItems} existingTasks={data.tasks} dateStr={todayStr} T={T} onAdd={item => addFromPlan(item, todayStr)} onClose={() => setShowAdd(null)} />}
            {todayTasks.length === 0 && showAdd !== "today"
              ? <Empty T={T} text="אין משימות להיום" />
              : todayTasks.map(task => <TaskRow key={task.id} task={task} todayStr={todayStr} T={T} onToggle={toggle} onDelete={remove} />)
            }
          </div>
        )}

        {/* ── WEEK ── */}
        {tab === "week" && (
          <div>
            {/* Week nav */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <button onClick={() => setWeekOffset(w=>w-1)} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${T.cardBorder}`, background: T.card, color: T.textSub, fontSize: 14, display:"flex", alignItems:"center", justifyContent:"center" }}>‹</button>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: T.textSub }}>
                  {weekOffset === 0 ? "השבוע" : weekOffset === -1 ? "שבוע שעבר" : weekOffset === 1 ? "שבוע הבא" : `${weekOffset > 0 ? "+" : ""}${weekOffset} שבועות`}
                </div>
                <div style={{ fontSize: 10.5, color: T.textFaint, marginTop: 1 }}>
                  {weekLabel(weekOffset, toYMD(weekDates[0]))}
                </div>
              </div>
              <button onClick={() => setWeekOffset(w=>w+1)} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${T.cardBorder}`, background: T.card, color: T.textSub, fontSize: 14, display:"flex", alignItems:"center", justifyContent:"center" }}>›</button>
              {weekOffset !== 0 && (
                <button onClick={() => setWeekOffset(0)} style={{ height: 32, borderRadius: 8, border: `1px solid ${T.cardBorder}`, background: T.card, color: T.textSub, fontSize: 11, fontWeight: 600, padding: "0 10px", whiteSpace: "nowrap" }}>היום</button>
              )}
            </div>

            {/* Week grid – horizontal scroll on mobile */}
            <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, WebkitOverflowScrolling: "touch", scrollSnapType: "x mandatory" }}>
              {weekDates.map((date, gi) => {
                  const ymd = toYMD(date);
                  const isToday = ymd === todayStr;
                  const isPast = date < new Date(new Date().setHours(0,0,0,0));
                  const dayTasks = data.tasks.filter(t => t.date === ymd);
                  const dayDone = dayTasks.filter(t => t.done).length;
                  const vibeColor = dayTasks.length === 0 ? null : dayDone === dayTasks.length ? "#22C55E" : dayTasks.length <= 3 ? "#60A5FA" : dayTasks.length <= 6 ? "#F59E0B" : "#EF4444";
                  const vibeLabel = dayTasks.length === 0 ? null : dayDone === dayTasks.length ? "✓" : dayTasks.length <= 3 ? "קל" : dayTasks.length <= 6 ? "עמוס" : "כבד";
                  return (
                    <div key={ymd} className="day-col" style={{
                      background: isToday ? T.accentBg : T.card,
                      border: `1px solid ${isToday ? T.accentBorder : T.cardBorder}`,
                      borderRadius: 12, padding: "12px 12px 36px",
                      minWidth: "calc(50% - 4px)", maxWidth: "calc(50% - 4px)",
                      flexShrink: 0, position: "relative",
                      opacity: isPast && !isToday ? 0.65 : 1,
                      boxShadow: isToday ? `0 0 0 1px ${T.accent}25, ${T.shadowMd}` : T.shadow,
                      scrollSnapAlign: "start",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                        <div>
                          <div style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: 1, color: isToday ? T.accent : T.textFaint, textTransform: "uppercase", marginBottom: 2 }}>{DAYS_HE[gi]}</div>
                          <div style={{ fontSize: 22, fontWeight: isToday ? 700 : 400, color: isToday ? T.accent : T.textSub, lineHeight: 1, fontFamily: isToday ? "inherit" : "'Playfair Display', serif" }}>{date.getDate()}</div>
                        </div>
                        {vibeLabel && (
                          <span style={{ fontSize: 9, fontWeight: 700, color: vibeColor, background: vibeColor + (dark ? "22" : "15"), borderRadius: 5, padding: "2px 6px", marginTop: 2, letterSpacing: 0.5 }}>{vibeLabel}</span>
                        )}
                      </div>
                      {dayTasks.map(t => {
                        const c = sc(t.subject, dark);
                        return (
                          <div key={t.id} title={t.title} style={{
                            fontSize: 11, padding: "4px 8px 4px 6px", borderRadius: 6, marginBottom: 4, cursor: "pointer",
                            background: c.bg, color: c.text,
                            border: dark ? `1px solid ${c.dot}30` : "none",
                            textDecoration: t.done ? "line-through" : "none",
                            opacity: t.done ? 0.4 : 1,
                            display: "flex", alignItems: "center", gap: 4,
                            fontWeight: 500,
                          }}>
                            <span onClick={() => toggle(t.id)} style={{ flex: 1, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{t.title}</span>
                            <span onClick={() => remove(t.id)} style={{ flexShrink: 0, opacity: 0.4, fontSize: 14, lineHeight: 1, cursor: "pointer" }}>×</span>
                          </div>
                        );
                      })}
                      {dayTasks.length > 0 && (
                        <div style={{ fontSize: 9, color: T.textFaint, position: "absolute", bottom: 22, right: 12 }}>{dayDone}/{dayTasks.length}</div>
                      )}
                      <button className="add-day-btn" onClick={() => setShowAdd(showAdd === ymd ? null : ymd)} style={{ opacity: 0, position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", background: T.accent, color: T.accentText, border: "none", borderRadius: 6, width: 24, height: 18, fontSize: 15, lineHeight: "18px", textAlign: "center", padding: 0, fontWeight: 300 }}>+</button>
                    </div>
                  );
              })}
            </div>

            {/* PlanPicker for selected day */}
            {showAdd && weekDates.some(d => toYMD(d) === showAdd) && (
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 11, color: T.textSub, marginBottom: 8, letterSpacing: 0.3 }}>הוסף ל-{showAdd?.slice(5).replace("-","/")} ·</div>
                <PlanPicker planItems={data.planItems} existingTasks={data.tasks} dateStr={showAdd} T={T} onAdd={item => addFromPlan(item, showAdd)} onClose={() => setShowAdd(null)} />
              </div>
            )}

            {/* Month calendar */}
            <MonthCal tasks={data.tasks} todayStr={todayStr} selectedDate={showAdd} onSelect={ymd => setShowAdd(showAdd === ymd ? null : ymd)} weekDates={weekDates} T={T} dark={dark} />

            {showAdd && !weekDates.some(d => toYMD(d) === showAdd) && (
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 11, color: T.textSub, marginBottom: 8 }}>הוסף ל-{showAdd?.slice(5).replace("-","/")} ·</div>
                <PlanPicker planItems={data.planItems} existingTasks={data.tasks} dateStr={showAdd} T={T} onAdd={item => addFromPlan(item, showAdd)} onClose={() => setShowAdd(null)} />
              </div>
            )}
          </div>
        )}

        {/* ── PLAN ── */}
        {tab === "plan" && <PlanTab data={data} update={update} T={T} dark={dark} />}

        {/* ── OVERVIEW ── */}
        {tab === "overview" && <OverviewTab data={data} update={update} T={T} dark={dark} todayStr={todayStr} allTasks={allTasks} totalDone={totalDone} pct={pct} dLeft={dLeft} />}
      </main>
    </div>
  );
}

// ── SECTION HEADER ────────────────────────────────────────────────────────────
function SectionHeader({ T, count, total, onAdd, addLabel }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: T.textSub, letterSpacing: 0.3 }}>
        משימות להיום {total > 0 && <span style={{ color: T.textFaint, fontWeight: 400 }}>{count}/{total}</span>}
      </div>
      <button onClick={onAdd} style={{ background: T.accent, color: T.accentText, border: "none", borderRadius: 20, padding: "5px 14px", fontSize: 11.5, fontWeight: 600, letterSpacing: 0.3 }}>{addLabel}</button>
    </div>
  );
}

function Empty({ T, text }) {
  return <div style={{ textAlign: "center", padding: "44px 0", color: T.textFaint, fontSize: 13 }}>{text}</div>;
}

// ── DAY SUMMARY CARD ──────────────────────────────────────────────────────────
function DaySummaryCard({ todayTasks, dLeft, T }) {
  const total = todayTasks.length;
  const done = todayTasks.filter(t => t.done).length;
  const rem = total - done;
  const now = new Date();
  const dateLabel = `${DAYS_HE[now.getDay()]}, ${now.getDate()} ב${MONTH_HE[now.getMonth()]}`;

  const vibe = (() => {
    if (total === 0) return { icon: "☀️", label: "יום פנוי", msg: "אין משימות – נוח להוסיף עכשיו", accent: T.textFaint };
    if (done === total) return { icon: "✅", label: "הכל הושלם", msg: "כל המשימות סומנו. יום מוצלח.", accent: T.accent };
    if (total <= 3) return { icon: "🌿", label: "יום קל", msg: `${rem} משימה – יום מרווח יחסית`, accent: "#60A5FA" };
    if (total <= 6) return { icon: "📖", label: "יום עמוס", msg: `${rem} משימות נותרו להיום`, accent: "#F59E0B" };
    return { icon: "🔥", label: "יום כבד", msg: `${rem} משימות – צעד אחר צעד`, accent: "#EF4444" };
  })();

  return (
    <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 16, padding: "20px 22px", marginBottom: 20, boxShadow: T.shadow }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10.5, color: T.textFaint, fontWeight: 500, letterSpacing: 0.5, marginBottom: 8 }}>{dateLabel}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 6 }}>
            <span style={{ fontSize: 16, color: vibe.accent, lineHeight: 1 }}>{vibe.icon}</span>
            <span style={{ fontSize: 16, fontWeight: 600, color: T.text, letterSpacing: "-0.01em" }}>{vibe.label}</span>
          </div>
          <div style={{ fontSize: 12.5, color: T.textSub, lineHeight: 1.6 }}>{vibe.msg}</div>
        </div>
        {total > 0 && (
          <div style={{ textAlign: "center", marginRight: 4, flexShrink: 0 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 500, color: T.text, lineHeight: 1 }}>{done}<span style={{ fontSize: 16, color: T.textFaint, fontWeight: 400 }}>/{total}</span></div>
            <div style={{ fontSize: 9.5, color: T.textFaint, marginTop: 3, letterSpacing: 0.5 }}>הושלם</div>
          </div>
        )}
      </div>
      {total > 0 && (
        <div style={{ marginTop: 14, height: 2, background: T.progressBg, borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${Math.round(done/total*100)}%`, background: vibe.accent, transition: "width 0.4s" }} />
        </div>
      )}
      {dLeft !== null && dLeft > 0 && (
        <div style={{ marginTop: 10, fontSize: 10.5, color: T.textFaint }}>{dLeft} ימים למבחן</div>
      )}
    </div>
  );
}

// ── TASK ROW ──────────────────────────────────────────────────────────────────
function TaskRow({ task, todayStr, T, onToggle, onDelete }) {
  const c = sc(task.subject, T.isDark);
  const overdue = task.date < todayStr;
  return (
    <div className="t-item" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, marginBottom: 2, background: "transparent", transition: "background 0.12s" }}>
      <div onClick={() => onToggle(task.id)} style={{ width: 18, height: 18, borderRadius: "50%", flexShrink: 0, cursor: "pointer", border: task.done ? "none" : `1.5px solid ${overdue ? "#EF4444" : T.inputBorder}`, background: task.done ? T.accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
        {task.done && <span style={{ color: T.accentText, fontSize: 9 }}>✓</span>}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          {overdue && <span style={{ fontSize: 9.5, fontWeight: 600, color: "#EF4444", background: "#FEF2F2", borderRadius: 4, padding: "1px 6px", flexShrink: 0, border: "1px solid #FECACA" }}>↩ {new Date(task.date).getDate()}/{new Date(task.date).getMonth()+1}</span>}
          <span style={{ fontSize: 13.5, color: task.done ? T.textFaint : T.text, textDecoration: task.done ? "line-through" : "none" }}>{task.title}</span>
        </div>
        {task.notes && <div style={{ fontSize: 11, color: T.textSub, marginTop: 1 }}>{task.notes}</div>}
      </div>
      <span style={{ fontSize: 10.5, padding: "2px 8px", borderRadius: 5, background: c.chip, color: c.text, flexShrink: 0, fontWeight: 500 }}>{task.subject}</span>
      <button className="del-btn" onClick={() => onDelete(task.id)} style={{ background: "none", border: "none", color: T.textFaint, fontSize: 16, padding: "0 2px", lineHeight: 1, flexShrink: 0 }}>×</button>
    </div>
  );
}

// ── PLAN PICKER ───────────────────────────────────────────────────────────────
// Shared last-used subject memory across PlanPicker instances
let _lastPickerSubject = "כמותי";

function PlanPicker({ planItems, existingTasks, dateStr, T, onAdd, onClose }) {
  const [activeSub, setActiveSub] = useState(_lastPickerSubject);
  const added = new Set(existingTasks.filter(t => t.date === dateStr && t.planItemId).map(t => t.planItemId));
  const filtered = planItems.filter(p => p.subject === activeSub);
  // Sort: not-yet-added first, already-added at bottom
  const sorted = [...filtered].sort((a, b) => {
    const aDone = added.has(a.id) ? 1 : 0;
    const bDone = added.has(b.id) ? 1 : 0;
    return aDone - bDone;
  });

  const handleSubject = (s) => { _lastPickerSubject = s; setActiveSub(s); };

  return (
    <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 14, overflow: "hidden", marginBottom: 14, boxShadow: T.shadowMd }}>
      {/* Subject tabs */}
      <div style={{ display: "flex", borderBottom: `1px solid ${T.divider}`, padding: "0 4px" }}>
        {SUBJECTS.map(s => {
          const c = sc(s, T.isDark);
          const active = s === activeSub;
          return (
            <button key={s} onClick={() => handleSubject(s)} style={{ padding: "10px 14px", border: "none", background: "transparent", fontSize: 12, fontWeight: active ? 600 : 400, color: active ? c.dot : T.textFaint, borderBottom: `2px solid ${active ? c.dot : "transparent"}`, marginBottom: -1, transition: "all 0.12s" }}>{s}</button>
          );
        })}
      </div>
      {/* Items */}
      <div style={{ maxHeight: 240, overflowY: "auto", padding: "8px" }}>
        {filtered.length === 0 && <div style={{ textAlign: "center", padding: "24px 0", color: T.textFaint, fontSize: 12.5 }}>אין פריטים בתכנית לנושא זה</div>}
        {added.size > 0 && filtered.some(p => !added.has(p.id)) && filtered.some(p => added.has(p.id)) && (
          <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1.5, color: T.textFaint, textTransform: "uppercase", padding: "4px 10px 2px", marginTop: 4 }}>טרם נוסף</div>
        )}
        {sorted.map((item, idx) => {
          const prevDone = idx > 0 && added.has(sorted[idx-1].id);
          const thisDone = added.has(item.id);
          return (
            <div key={item.id}>
              {thisDone && !prevDone && idx > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px 2px" }}>
                  <div style={{ flex: 1, height: 1, background: T.divider }} />
                  <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1.5, color: T.textFaint, textTransform: "uppercase" }}>כבר נוסף</span>
                  <div style={{ flex: 1, height: 1, background: T.divider }} />
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", borderRadius: 9, marginBottom: 3, background: thisDone ? T.cardHover : "transparent", opacity: thisDone ? 0.6 : 1 }}>
                <span style={{ fontSize: 13, color: T.text }}>{item.title}</span>
                {thisDone
                  ? <span style={{ fontSize: 10.5, color: "#22C55E", background: T.isDark ? "#0F2E1A" : "#F0FDF4", borderRadius: 5, padding: "2px 8px", fontWeight: 600 }}>✓ נוסף</span>
                  : <button onClick={() => onAdd(item)} style={{ background: sc(item.subject, T.isDark).dot, color: "#fff", border: "none", borderRadius: 7, padding: "4px 12px", fontSize: 11.5, fontWeight: 600, cursor: "pointer" }}>+ הוסף</button>
                }
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ borderTop: `1px solid ${T.divider}`, padding: "8px", textAlign: "center" }}>
        <button onClick={onClose} style={{ background: "none", border: "none", color: T.textFaint, fontSize: 11.5, cursor: "pointer" }}>סגור</button>
      </div>
    </div>
  );
}

// ── MONTH CALENDAR ────────────────────────────────────────────────────────────
function MonthCal({ tasks, todayStr, selectedDate, onSelect, weekDates, T, dark }) {
  const [mo, setMo] = useState(0);
  const base = new Date(); base.setDate(1); base.setMonth(base.getMonth() + mo);
  const year = base.getFullYear(), month = base.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const weekSet = new Set(weekDates.map(d => toYMD(d)));
  const cells = [...Array(firstDay).fill(null), ...Array.from({length: days}, (_,i) => i+1)];

  return (
    <div style={{ marginTop: 14, background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 14, padding: "14px", boxShadow: T.shadow }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <button onClick={() => setMo(m=>m-1)} style={{ width: 28, height: 28, borderRadius: 7, border: `1px solid ${T.cardBorder}`, background: T.page, color: T.textSub, fontSize: 13, display:"flex", alignItems:"center", justifyContent:"center" }}>‹</button>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: T.text }}>{MONTH_HE[month]} {year}</span>
        <button onClick={() => setMo(m=>m+1)} style={{ width: 28, height: 28, borderRadius: 7, border: `1px solid ${T.cardBorder}`, background: T.page, color: T.textSub, fontSize: 13, display:"flex", alignItems:"center", justifyContent:"center" }}>›</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1, marginBottom: 3 }}>
        {["א","ב","ג","ד","ה","ו","ש"].map(d => <div key={d} style={{ textAlign: "center", fontSize: 9.5, color: T.textFaint, fontWeight: 600, padding: "2px 0" }}>{d}</div>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1 }}>
        {cells.map((day, idx) => {
          if (!day) return <div key={`e${idx}`} />;
          const ymd = `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
          const dayTasks = tasks.filter(t => t.date === ymd);
          const isToday = ymd === todayStr;
          const isSel = ymd === selectedDate;
          const inWeek = weekSet.has(ymd);
          const subjects = [...new Set(dayTasks.map(t => t.subject))];
          return (
            <div key={ymd} onClick={() => onSelect(ymd)} style={{ textAlign: "center", padding: "4px 1px", borderRadius: 7, cursor: "pointer", background: isSel ? T.accent : inWeek ? T.weekHighlight : "transparent", border: isToday && !isSel ? `1.5px solid ${T.accent}` : `1px solid ${inWeek && !isSel ? T.weekHighlightBorder : "transparent"}` }}>
              <div style={{ fontSize: 11, fontWeight: isToday ? 700 : inWeek ? 600 : 400, color: isSel ? T.accentText : isToday ? T.accent : T.textSub, lineHeight: 1.5 }}>{day}</div>
              {subjects.length > 0 && (
                <div style={{ display: "flex", justifyContent: "center", gap: 1.5 }}>
                  {subjects.slice(0,3).map(s => <span key={s} style={{ width: 4, height: 4, borderRadius: "50%", background: isSel ? T.accentText : sc(s, dark).dot, display: "inline-block", opacity: isSel ? 0.5 : 0.8 }} />)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── PLAN TAB ──────────────────────────────────────────────────────────────────
function PlanTab({ data, update, T, dark }) {
  const [form, setForm] = useState({ title: "", subject: "כמותי", weekOffsets: [0], days: [], notes: "" });
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editDraft, setEditDraft] = useState(null);
  const DAYS = ["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת"];

  const weeks = (() => {
    const t = new Date(); t.setHours(0,0,0,0);
    const sun = new Date(t); sun.setDate(t.getDate() - t.getDay());
    const end = data.examDate ? new Date(data.examDate) : new Date(sun);
    const arr = []; const cur = new Date(sun); let i = 0;
    while (cur <= end || arr.length < 6) { arr.push({ offset: i, sunday: toYMD(new Date(cur)) }); cur.setDate(cur.getDate()+7); i++; if (i > 52) break; }
    return arr;
  })();

  const addItem = () => {
    if (!form.title.trim()) return;
    update({ planItems: [...data.planItems, { ...form, id: data.nextPlanId, generated: false }], nextPlanId: data.nextPlanId + 1 });
    setForm({ title: "", subject: "כמותי", weekOffsets: [0], days: [], notes: "" });
    setShowForm(false);
  };

  const deleteItem = id => update({ planItems: data.planItems.filter(p => p.id !== id), tasks: data.tasks.filter(t => t.planItemId !== id) });

  const saveEdit = id => {
    const old = data.planItems.find(p => p.id === id);
    const changed = editDraft.title !== old.title || editDraft.subject !== old.subject || JSON.stringify(editDraft.weekOffsets) !== JSON.stringify(old.weekOffsets || [old.weekOffset]) || JSON.stringify(editDraft.days) !== JSON.stringify(old.days);
    update({ planItems: data.planItems.map(p => p.id === id ? { ...p, ...editDraft, generated: changed ? false : p.generated } : p), tasks: changed ? data.tasks.filter(t => t.planItemId !== id) : data.tasks });
    setEditId(null); setEditDraft(null);
  };

  const generate = item => {
    const dayMap = { ראשון:0, שני:1, שלישי:2, רביעי:3, חמישי:4, שישי:5, שבת:6 };
    const offsets = item.weekOffsets || [item.weekOffset || 0];
    let nextId = data.nextId;
    const newTasks = [];
    offsets.forEach(wo => {
      const wdates = getWeekDatesFromSunday(getWeekSunday(wo));
      item.days.forEach(day => {
        newTasks.push({ id: nextId++, date: toYMD(wdates[dayMap[day]]), done: false, title: item.title, subject: item.subject, notes: item.notes, planItemId: item.id });
      });
    });
    update({ tasks: [...data.tasks, ...newTasks], nextId, planItems: data.planItems.map(p => p.id === item.id ? { ...p, generated: true } : p) });
  };

  const generateAll = () => {
    const dayMap = { ראשון:0, שני:1, שלישי:2, רביעי:3, חמישי:4, שישי:5, שבת:6 };
    let nextId = data.nextId; const all = [];
    const updated = data.planItems.map(item => {
      if (item.generated) return item;
      const offsets = item.weekOffsets || [item.weekOffset || 0];
      offsets.forEach(wo => {
        const wdates = getWeekDatesFromSunday(getWeekSunday(wo));
        item.days.forEach(day => all.push({ id: nextId++, date: toYMD(wdates[dayMap[day]]), done: false, title: item.title, subject: item.subject, notes: item.notes, planItemId: item.id }));
      });
      return { ...item, generated: true };
    });
    update({ tasks: [...data.tasks, ...all], nextId, planItems: updated });
  };

  const byWeek = {};
  data.planItems.forEach(item => {
    const offsets = item.weekOffsets || [item.weekOffset || 0];
    offsets.forEach(wo => {
      if (!byWeek[wo]) byWeek[wo] = [];
      if (!byWeek[wo].find(x => x.id === item.id)) byWeek[wo].push(item);
    });
  });

  const ungenerated = data.planItems.filter(p => !p.generated).length;

  const FormFields = ({ vals, setVals }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <input value={vals.title} onChange={e => setVals({...vals, title: e.target.value})} placeholder="שם המשימה / נושא" style={{ border: `1.5px solid ${T.accent}`, borderRadius: 9, padding: "10px 13px", fontSize: 13.5, background: T.input, color: T.text, direction: "rtl", width: "100%" }} />
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <Label T={T}>נושא</Label>
          <select value={vals.subject} onChange={e => setVals({...vals, subject: e.target.value})} style={{ width: "100%", border: `1px solid ${T.inputBorder}`, borderRadius: 8, padding: "8px 10px", fontSize: 13, background: T.input, color: T.text, direction: "rtl" }}>
            {SUBJECTS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div>
        <Label T={T}>שבועות (בחר כמה שרוצה)</Label>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {weeks.map(w => {
            const sel = vals.weekOffsets.includes(w.offset);
            return (
              <button key={w.offset} className="chip-btn" onClick={() => setVals(v => ({ ...v, weekOffsets: sel ? v.weekOffsets.filter(x => x !== w.offset) : [...v.weekOffsets, w.offset] }))} style={{ padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: sel ? 600 : 400, border: `1px solid ${sel ? T.accent : T.inputBorder}`, background: sel ? T.accent : T.input, color: sel ? T.accentText : T.textSub }}>
                {weekLabel(w.offset, w.sunday)}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <Label T={T}>ימים בשבוע</Label>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {DAYS.map(day => {
            const sel = vals.days.includes(day);
            return (
              <button key={day} className="chip-btn" onClick={() => setVals(v => ({ ...v, days: sel ? v.days.filter(d => d !== day) : [...v.days, day] }))} style={{ padding: "4px 10px", borderRadius: 20, fontSize: 11.5, fontWeight: sel ? 600 : 400, border: `1px solid ${sel ? T.accent : T.inputBorder}`, background: sel ? T.accent : T.input, color: sel ? T.accentText : T.textSub }}>
                {day}
              </button>
            );
          })}
        </div>
      </div>
      <input value={vals.notes} onChange={e => setVals({...vals, notes: e.target.value})} placeholder="הערה (אופציונלי)" style={{ border: `1px solid ${T.inputBorder}`, borderRadius: 8, padding: "8px 12px", fontSize: 12.5, background: T.input, color: T.text, direction: "rtl", width: "100%" }} />
    </div>
  );

  return (
    <div style={{ maxWidth: 640 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 600, color: T.text, letterSpacing: "-0.01em" }}>תכנית לימודים</div>
          <div style={{ fontSize: 11.5, color: T.textSub, marginTop: 3 }}>{data.planItems.length} נושאים · {ungenerated} טרם נוצרו</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {ungenerated > 0 && (
            <button onClick={generateAll} style={{ background: T.accent, color: T.accentText, border: "none", borderRadius: 9, padding: "8px 16px", fontSize: 12, fontWeight: 600, letterSpacing: 0.3 }}>✦ צור {ungenerated}</button>
          )}
          <button onClick={() => setShowForm(f => !f)} style={{ background: T.card, color: T.text, border: `1px solid ${T.cardBorder}`, borderRadius: 9, padding: "8px 14px", fontSize: 12, fontWeight: 500, boxShadow: T.shadow }}>{showForm ? "ביטול" : "+ הוסף"}</button>
        </div>
      </div>

      {/* Add form */}
      {showForm && (
        <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 14, padding: 18, marginBottom: 18, boxShadow: T.shadowMd }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, color: T.textFaint, textTransform: "uppercase", marginBottom: 14 }}>פריט חדש</div>
          <FormFields vals={form} setVals={setForm} />
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <button onClick={addItem} style={{ background: T.accent, color: T.accentText, border: "none", borderRadius: 9, padding: "9px 22px", fontSize: 13, fontWeight: 600 }}>הוסף לתכנית</button>
            <button onClick={() => setShowForm(false)} style={{ background: "none", border: `1px solid ${T.cardBorder}`, color: T.textSub, borderRadius: 9, padding: "9px 14px", fontSize: 13 }}>ביטול</button>
          </div>
        </div>
      )}

      {/* Items by week */}
      {data.planItems.length === 0 && !showForm
        ? <div style={{ textAlign: "center", padding: "60px 0", color: T.textFaint, fontSize: 13 }}><div style={{ fontSize: 28, marginBottom: 10 }}>◻</div>התכנית ריקה – הוסף פריטים</div>
        : Object.entries(byWeek).sort(([a],[b]) => Number(a)-Number(b)).map(([oStr, items]) => {
            const offset = Number(oStr);
            const wk = weeks.find(w => w.offset === offset) || { sunday: getWeekSunday(offset) };
            return (
              <div key={oStr} style={{ marginBottom: 22 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, paddingBottom: 7, borderBottom: `1px solid ${T.divider}` }}>
                  <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 1.5, color: T.textFaint, textTransform: "uppercase" }}>{weekLabel(offset, wk.sunday)}</span>
                  <span style={{ fontSize: 10.5, color: T.textFaint }}>{items.filter(i=>i.generated).length}/{items.length} נוצרו</span>
                </div>
                {items.map(item => {
                  const c = sc(item.subject, dark);
                  const isEdit = editId === item.id;
                  if (isEdit && editDraft) return (
                    <div key={item.id} style={{ background: T.card, border: `1.5px solid ${T.accent}`, borderRadius: 12, padding: 16, marginBottom: 8, boxShadow: T.shadowMd }}>
                      <FormFields vals={editDraft} setVals={setEditDraft} />
                      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                        <button onClick={() => saveEdit(item.id)} style={{ background: T.accent, color: T.accentText, border: "none", borderRadius: 8, padding: "7px 18px", fontSize: 12.5, fontWeight: 600 }}>שמור</button>
                        <button onClick={() => { setEditId(null); setEditDraft(null); }} style={{ background: "none", border: `1px solid ${T.cardBorder}`, color: T.textSub, borderRadius: 8, padding: "7px 12px", fontSize: 12.5 }}>ביטול</button>
                      </div>
                    </div>
                  );
                  return (
                    <div key={item.id} style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 11, padding: "11px 14px", marginBottom: 5, display: "flex", alignItems: "flex-start", gap: 12, boxShadow: T.shadow }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 13.5, fontWeight: 500, color: T.text }}>{item.title}</span>
                          <span style={{ fontSize: 10.5, padding: "1px 8px", borderRadius: 5, background: c.chip, color: c.text, fontWeight: 600 }}>{item.subject}</span>
                          {item.generated && <span style={{ fontSize: 10, color: T.isDark ? GREEN_DARK : GREEN, background: T.accentBg, padding: "1px 7px", borderRadius: 5, fontWeight: 600, border: `1px solid ${T.accentBorder}` }}>✓ נוצר</span>}
                        </div>
                        {item.days.length > 0 && <div style={{ fontSize: 11, color: T.textSub }}>{item.days.join(" · ")}{item.notes ? ` — ${item.notes}` : ""}</div>}
                      </div>
                      <div style={{ display: "flex", gap: 5, flexShrink: 0, alignItems: "center" }}>
                        {!item.generated && <button onClick={() => generate(item)} style={{ background: T.page, border: `1px solid ${T.cardBorder}`, borderRadius: 7, padding: "4px 10px", fontSize: 11, color: T.textSub, whiteSpace: "nowrap" }}>צור</button>}
                        <button onClick={() => { setEditId(item.id); setEditDraft({ title: item.title, subject: item.subject, weekOffsets: item.weekOffsets || [item.weekOffset || 0], days: [...item.days], notes: item.notes }); }} style={{ background: "none", border: `1px solid ${T.cardBorder}`, borderRadius: 7, padding: "4px 10px", fontSize: 11, color: T.textSub }}>ערוך</button>
                        <button onClick={() => deleteItem(item.id)} style={{ background: "none", border: "none", color: T.textFaint, fontSize: 17, padding: "0 2px", lineHeight: 1 }}>×</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })
      }
    </div>
  );
}

// ── OVERVIEW TAB ──────────────────────────────────────────────────────────────
function OverviewTab({ data, update, T, dark, todayStr, allTasks, totalDone, pct, dLeft }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      {/* Exam date */}
      <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 14, padding: 20, gridColumn: "1 / -1", boxShadow: T.shadow }}>
        <Label T={T}>תאריך מבחן</Label>
        <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", marginTop: 8 }}>
          <input type="date" value={data.examDate} onChange={e => update({ examDate: e.target.value })} style={{ border: `1px solid ${T.inputBorder}`, borderRadius: 9, padding: "9px 13px", fontSize: 14, background: T.input, color: T.text, direction: "ltr" }} />
          {dLeft !== null && (
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 46, lineHeight: 1, color: dLeft <= 14 ? "#EF4444" : T.text, fontWeight: 500 }}>{dLeft}</span>
              <span style={{ fontSize: 14, color: T.textSub }}>ימים</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress ring */}
      <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 14, padding: 20, boxShadow: T.shadow }}>
        <Label T={T}>התקדמות כללית</Label>
        <div style={{ position: "relative", width: 100, height: 100, margin: "14px auto 10px" }}>
          <svg viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)", width: "100%", height: "100%" }}>
            <circle cx="50" cy="50" r="42" fill="none" stroke={T.progressBg} strokeWidth="8" />
            <circle cx="50" cy="50" r="42" fill="none" stroke={T.progressFill} strokeWidth="8"
              strokeDasharray={`${2*Math.PI*42}`} strokeDashoffset={`${2*Math.PI*42*(1-pct/100)}`}
              strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.6s" }} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: T.text }}>{pct}%</span>
          </div>
        </div>
        <div style={{ textAlign: "center", fontSize: 11.5, color: T.textSub }}>{totalDone} / {allTasks.length} משימות</div>
      </div>

      {/* By subject */}
      <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 14, padding: 20, boxShadow: T.shadow }}>
        <Label T={T}>לפי נושא</Label>
        <div style={{ marginTop: 10 }}>
          {SUBJECTS.map(subj => {
            const st = allTasks.filter(t => t.subject === subj);
            if (!st.length) return null;
            const sd = st.filter(t => t.done).length;
            const sp = Math.round(sd/st.length*100);
            const c = sc(subj, dark);
            return (
              <div key={subj} style={{ marginBottom: 11 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: T.text, fontWeight: 500 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: c.dot }} />{subj}
                  </span>
                  <span style={{ color: T.textSub }}>{sd}/{st.length}</span>
                </div>
                <div style={{ height: 4, background: T.progressBg, borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${sp}%`, background: c.dot, borderRadius: 2, transition: "width 0.4s" }} />
                </div>
              </div>
            );
          })}
          {allTasks.length === 0 && <div style={{ color: T.textFaint, fontSize: 12 }}>אין משימות עדיין</div>}
        </div>
      </div>

      {/* Upcoming */}
      <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 14, padding: 20, gridColumn: "1 / -1", boxShadow: T.shadow }}>
        <Label T={T}>קרובות</Label>
        <div style={{ marginTop: 8 }}>
          {allTasks.filter(t => !t.done && t.date >= todayStr).sort((a,b) => a.date.localeCompare(b.date)).slice(0,6).map(t => {
            const c = sc(t.subject, dark);
            return (
              <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${T.divider}` }}>
                <span style={{ fontSize: 10.5, color: T.textFaint, minWidth: 36, fontWeight: 500 }}>{t.date.slice(5).replace("-","/")}</span>
                <span style={{ fontSize: 10.5, padding: "1px 8px", borderRadius: 5, background: c.chip, color: c.text, fontWeight: 600 }}>{t.subject}</span>
                <span style={{ fontSize: 13, flex: 1, color: T.text }}>{t.title}</span>
              </div>
            );
          })}
          {allTasks.filter(t => !t.done && t.date >= todayStr).length === 0 && <div style={{ color: T.textFaint, fontSize: 12.5 }}>אין משימות פתוחות קרובות</div>}
        </div>
      </div>

      {/* Controls */}
      <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "center", gap: 20, paddingTop: 4 }}>
        <button onClick={async () => {
          await storage.delete(STORAGE_KEY);
          const p = makeInitialPlanItems();
          update({ ...defaultData(), examDate: data.examDate, planItems: p, nextPlanId: p.length+1 });
        }} style={{ background: "none", border: "none", color: "#3B82F6", fontSize: 11.5, textDecoration: "underline", cursor: "pointer" }}>טען תכנית מחדש</button>
        <button onClick={async () => {
          await storage.delete(STORAGE_KEY);
          update({ ...defaultData(), examDate: data.examDate });
        }} style={{ background: "none", border: "none", color: T.textFaint, fontSize: 11.5, textDecoration: "underline", cursor: "pointer" }}>מחק משימות</button>
      </div>
    </div>
  );
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function Label({ T, children }) {
  return <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 2, color: T.textFaint, textTransform: "uppercase", marginBottom: 2 }}>{children}</div>;
}
