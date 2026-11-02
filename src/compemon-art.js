/* ---------- creatures (doodle SVG) ---------- */
const BODY = {
  round: { d: '<ellipse cx="50" cy="62" rx="27" ry="24"/>', t: 38, e: 54, l: 23, r: 77, b: 84 },
  tall: { d: '<rect x="32" y="30" width="36" height="54" rx="17"/>', t: 30, e: 46, l: 32, r: 68, b: 84 },
  wide: { d: '<ellipse cx="50" cy="66" rx="36" ry="19"/>', t: 47, e: 60, l: 14, r: 86, b: 83 },
  tri: { d: '<path d="M50 28 Q54 28 82 82 Q50 88 18 82 Q46 28 50 28Z"/>', t: 30, e: 58, l: 28, r: 72, b: 84 },
  blob: { d: '<path d="M28 70 C16 50 32 32 50 34 C70 30 88 50 76 72 C68 88 36 88 28 70Z"/>', t: 34, e: 52, l: 20, r: 80, b: 84 }
};
const EARS = {
  none: () => "",
  cat: t => `<path d="M35 ${t + 8} L31 ${t - 12} L47 ${t + 2}Z M65 ${t + 8} L69 ${t - 12} L53 ${t + 2}Z"/>`,
  round: t => `<circle cx="33" cy="${t + 3}" r="9"/><circle cx="67" cy="${t + 3}" r="9"/>`,
  biground: t => `<circle cx="30" cy="${t + 1}" r="13"/><circle cx="70" cy="${t + 1}" r="13"/>`,
  antenna: t => `<path d="M44 ${t + 2} L38 ${t - 14} M56 ${t + 2} L62 ${t - 14}" fill="none"/><circle cx="38" cy="${t - 16}" r="3" fill="#111"/><circle cx="62" cy="${t - 16}" r="3" fill="#111"/>`,
  horns: t => `<path d="M38 ${t + 6} Q28 ${t - 4} 32 ${t - 17} Q38 ${t - 4} 46 ${t + 2}Z M62 ${t + 6} Q72 ${t - 4} 68 ${t - 17} Q62 ${t - 4} 54 ${t + 2}Z"/>`,
  crest: t => `<path d="M50 ${t + 2} Q44 ${t - 14} 52 ${t - 20} M50 ${t + 2} Q58 ${t - 10} 64 ${t - 13}" fill="none"/>`
};
const EYES = {
  dot: e => `<circle cx="43" cy="${e}" r="3" fill="#111"/><circle cx="57" cy="${e}" r="3" fill="#111"/>`,
  big: e => `<circle cx="42" cy="${e}" r="6.5"/><circle cx="58" cy="${e}" r="6.5"/><circle cx="43" cy="${e + 1}" r="2.6" fill="#111"/><circle cx="59" cy="${e + 1}" r="2.6" fill="#111"/>`,
  angry: e => `<circle cx="43" cy="${e}" r="3" fill="#111"/><circle cx="57" cy="${e}" r="3" fill="#111"/><path d="M36 ${e - 9} L47 ${e - 4} M64 ${e - 9} L53 ${e - 4}" fill="none"/>`,
  sleepy: e => `<path d="M38 ${e} Q43 ${e + 4} 48 ${e} M52 ${e} Q57 ${e + 4} 62 ${e}" fill="none"/>`,
  ko: e => `<path d="M39 ${e - 4} L47 ${e + 4} M47 ${e - 4} L39 ${e + 4} M53 ${e - 4} L61 ${e + 4} M61 ${e - 4} L53 ${e + 4}" fill="none"/>`
};
const MOUTH = {
  smile: m => `<path d="M44 ${m} Q50 ${m + 6} 56 ${m}" fill="none"/>`,
  open: m => `<ellipse cx="50" cy="${m + 2}" rx="4" ry="4.5"/>`,
  zig: m => `<path d="M42 ${m} L45 ${m + 4} L48 ${m} L51 ${m + 4} L54 ${m} L57 ${m + 4}" fill="none"/>`,
  flat: m => `<path d="M45 ${m + 1} L55 ${m + 1}" fill="none"/>`
};
function starPts(cx, cy, R, r) { let s = ""; for (let i = 0; i < 10; i++) { const a = Math.PI / 5 * i - Math.PI / 2, rr = i % 2 ? r : R; s += (cx + rr * Math.cos(a)).toFixed(1) + "," + (cy + rr * Math.sin(a)).toFixed(1) + " "; } return s; }
const ACC = {
  halo: t => `<ellipse cx="50" cy="${t - 15}" rx="16" ry="4.5" fill="none"/>`,
  crown: t => `<path d="M37 ${t + 1} L37 ${t - 14} L43.5 ${t - 6} L50 ${t - 17} L56.5 ${t - 6} L63 ${t - 14} L63 ${t + 1}Z"/>`,
  gradcap: t => `<path d="M30 ${t - 3} L50 ${t - 11} L70 ${t - 3} L50 ${t + 5}Z" fill="#111"/><path d="M66 ${t - 2} L68 ${t + 10}" fill="none"/>`,
  arrowUp: t => `<path d="M84 ${t + 10} L84 ${t - 14} M76 ${t - 6} L84 ${t - 14} L92 ${t - 6}" fill="none" stroke-width="3.6"/>`,
  arrowDown: t => `<path d="M84 ${t - 14} L84 ${t + 10} M76 ${t + 2} L84 ${t + 10} L92 ${t + 2}" fill="none" stroke-width="3.6"/>`,
  dollar: t => `<text x="77" y="${t + 4}" font-size="26" font-family="Georgia,serif" font-weight="bold" fill="#111" stroke="none">$</text>`,
  pie: t => `<circle cx="84" cy="${t - 4}" r="9"/><path d="M84 ${t - 4} L84 ${t - 13} A9 9 0 0 1 92.6 ${t - 1.2} Z" fill="#111"/>`,
  chart: t => `<path d="M73 ${t + 5} L95 ${t + 5}" fill="none"/><rect x="76" y="${t - 1}" width="4" height="6"/><rect x="82" y="${t - 7}" width="4" height="12"/><rect x="88" y="${t - 14}" width="4" height="19"/><path d="M73 ${t + 1} L96 ${t - 18}" fill="none" stroke-width="1.8" stroke-dasharray="2 3"/>`,
  stairs: t => `<path d="M72 ${t + 6} L72 ${t} L78 ${t} L78 ${t - 6} L84 ${t - 6} L84 ${t - 12} L90 ${t - 12} L90 ${t + 6} Z"/>`,
  glasses: (t, e) => `<circle cx="42" cy="${e}" r="7.5" fill="none"/><circle cx="58" cy="${e}" r="7.5" fill="none"/><path d="M49.5 ${e - 1} L50.5 ${e - 1}" fill="none"/>`,
  tie: (t, e) => `<path d="M47 ${e + 13} L53 ${e + 13} L51 ${e + 17} L54 ${e + 28} L50 ${e + 32} L46 ${e + 28} L49 ${e + 17} Z" fill="#111"/>`,
  star: t => `<polygon points="${starPts(84, t - 4, 10, 4.2)}"/>`,
  scale: t => `<path d="M84 ${t + 8} L84 ${t - 14} M73 ${t - 10} L95 ${t - 10} M73 ${t - 10} L70 ${t - 1} M73 ${t - 10} L76 ${t - 1} M95 ${t - 10} L92 ${t - 1} M95 ${t - 10} L98 ${t - 1} M69 ${t - 1} Q73 ${t + 4} 77 ${t - 1} M91 ${t - 1} Q95 ${t + 4} 99 ${t - 1}" fill="none" stroke-width="2.2"/>`,
  stopwatch: t => `<circle cx="84" cy="${t - 2}" r="9"/><path d="M84 ${t - 11} L84 ${t - 15} M81 ${t - 15} L87 ${t - 15} M84 ${t - 2} L88 ${t - 7}" fill="none"/>`,
  pyramid: t => `<path d="M84 ${t - 17} L96 ${t + 6} L72 ${t + 6} Z M78 ${t - 4} L90 ${t - 4} M81 ${t - 10} L87 ${t - 10}"/>`,
  ruler: t => `<rect x="72" y="${t - 7}" width="25" height="9"/><path d="M76 ${t - 7} v3 M80 ${t - 7} v5 M84 ${t - 7} v3 M88 ${t - 7} v5 M92 ${t - 7} v3" fill="none" stroke-width="1.6"/>`,
  one: t => `<text x="72" y="${t + 2}" font-size="17" font-weight="bold" fill="#111" stroke="none">#1</text>`,
  gear: t => { let s = `<circle cx="84" cy="${t - 4}" r="7.5"/><circle cx="84" cy="${t - 4}" r="2.4" fill="#111"/><path d="`; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; s += `M${(84 + 7.5 * Math.cos(a)).toFixed(1)} ${(t - 4 + 7.5 * Math.sin(a)).toFixed(1)} L${(84 + 11 * Math.cos(a)).toFixed(1)} ${(t - 4 + 11 * Math.sin(a)).toFixed(1)} `; } return s + `" fill="none" stroke-width="3"/>`; }
};
const PAT = {
  stripes: b => `<path d="M${b.l + 7} ${b.e + 9} q5 3 9 0 M${b.l + 7} ${b.e + 17} q5 3 9 0 M${b.r - 16} ${b.e + 9} q5 3 9 0 M${b.r - 16} ${b.e + 17} q5 3 9 0" fill="none" stroke-width="2"/>`,
  spots: b => `<circle cx="38" cy="${b.e + 17}" r="2.6" fill="#111"/><circle cx="61" cy="${b.e + 19}" r="2.6" fill="#111"/><circle cx="51" cy="${b.e + 24}" r="2" fill="#111"/>`,
  belly: b => `<ellipse cx="50" cy="${b.b - 6}" rx="10" ry="4.5" fill="none" stroke-width="2"/>`,
  bands: b => `<path d="M${b.l + 10} ${b.e + 12} L${b.r - 10} ${b.e + 12} M${b.l + 14} ${b.e + 18} L${b.r - 14} ${b.e + 18}" fill="none" stroke-width="2.4"/>`,
  mask: b => `<rect x="32" y="${b.e - 7}" width="36" height="14" rx="7" fill="#111"/>`,
  fluffy: () => ""
};
function fluff() { let s = ""; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2; s += `<circle cx="${(50 + 28 * Math.cos(a)).toFixed(1)}" cy="${(62 + 25 * Math.sin(a)).toFixed(1)}" r="8"/>`; } return s; }
function drawParts(p, ko) {
  const b = BODY[p.body], t = b.t, e = b.e; let s = "";
  if (p.tail) s += `<path d="M${b.r - 4} ${b.b - 8} Q${b.r + 15} ${b.b - 6} ${b.r + 10} ${b.b - 25}" fill="none"/>`;
  s += EARS[p.ears || "none"](t);
  s += `<path d="M40 ${b.b - 3} L38 ${b.b + 9} L33 ${b.b + 9} M60 ${b.b - 3} L62 ${b.b + 9} L67 ${b.b + 9}" fill="none"/>`;
  if (p.pat === "fluffy") s += fluff();
  s += b.d;
  if (p.pat && PAT[p.pat]) s += PAT[p.pat](b);
  s += `<path d="M${b.l + 3} ${e + 14} L${b.l - 9} ${e + 6} M${b.r - 3} ${e + 14} L${b.r + 9} ${e + 6}" fill="none"/>`;
  s += ko ? EYES.ko(e) : EYES[p.eyes || "dot"](e);
  s += MOUTH[ko ? "flat" : (p.mouth || "smile")](e + 11);
  (p.acc || []).forEach(a => s += ACC[a](t, e));
  return s;
}
