// One-off generator for Hungarian Minor + Byzantine scale data.
// Not part of the app itself — run with `node _generate.js` to (re)produce
// hungarian_byzantine.js, hungarian_byzantine_missing_audio.txt, and
// hungarian_byzantine_needed_audio_names.txt in this same folder.

const fs = require("fs");
const path = require("path");

const V_LITERAL = 'V + "'; // we emit `V + "...wav"` strings, V is defined in data.js

// ---------------------------------------------------------------------------
// Key metadata: display label (matches app's 12 note-name spellings), the
// const-variable-name fragment (matches data.js's existing D_FLAT/F_SHARP
// style), the audio-filename fragment (matches existing voice file naming,
// e.g. "58_Bb_Major.wav", "50_FSharp_Major.wav"), and the spoken-name
// fragment for TTS (matches the "F Sharp"/"D Flat" style implied by the task).
// ---------------------------------------------------------------------------
const KEYS = [
  { code: "C", disp: "C", varKey: "C", file: "C", spoken: "C", rh: 60, lh: 48 },
  { code: "Db", disp: "Db", varKey: "D_FLAT", file: "Db", spoken: "D Flat", rh: 61, lh: 49 },
  { code: "D", disp: "D", varKey: "D", file: "D", spoken: "D", rh: 62, lh: 50 },
  { code: "Eb", disp: "Eb", varKey: "E_FLAT", file: "Eb", spoken: "E Flat", rh: 63, lh: 51 },
  { code: "E", disp: "E", varKey: "E", file: "E", spoken: "E", rh: 64, lh: 52 },
  { code: "F", disp: "F", varKey: "F", file: "F", spoken: "F", rh: 65, lh: 53 },
  { code: "F#", disp: "F#", varKey: "F_SHARP", file: "FSharp", spoken: "F Sharp", rh: 66, lh: 54 },
  { code: "G", disp: "G", varKey: "G", file: "G", spoken: "G", rh: 67, lh: 55 },
  { code: "Ab", disp: "Ab", varKey: "A_FLAT", file: "Ab", spoken: "A Flat", rh: 68, lh: 56 },
  { code: "A", disp: "A", varKey: "A", file: "A", spoken: "A", rh: 69, lh: 57 },
  { code: "Bb", disp: "Bb", varKey: "B_FLAT", file: "Bb", spoken: "B Flat", rh: 70, lh: 58 },
  { code: "B", disp: "B", varKey: "B", file: "B", spoken: "B", rh: 71, lh: 59 },
];

// Hand-derived (see chat/review doc) note-name tokens for the 7 scale
// degrees of each scale, per key. Token strings match this project's voice
// file naming convention exactly (e.g. "Fs" for F#, "Bb" for Bb, "Cb"/"Fb"
// used where that's the practical single-accidental spelling).
const HUNGARIAN_SPELLING = {
  C: ["C", "D", "Eb", "Fs", "G", "Ab", "B"],
  Db: ["Cs", "Ds", "E", "G", "Gs", "A", "C"],
  D: ["D", "E", "F", "Gs", "A", "Bb", "Cs"],
  Eb: ["Eb", "F", "Gb", "A", "Bb", "Cb", "D"],
  E: ["E", "Fs", "G", "As", "B", "C", "Ds"],
  F: ["F", "G", "Ab", "B", "C", "Db", "E"],
  "F#": ["Fs", "Gs", "A", "C", "Cs", "D", "F"],
  G: ["G", "A", "Bb", "Cs", "D", "Eb", "Fs"],
  Ab: ["Ab", "Bb", "Cb", "D", "Eb", "Fb", "G"],
  A: ["A", "B", "C", "Ds", "E", "F", "Gs"],
  Bb: ["Bb", "C", "Db", "E", "F", "Gb", "A"],
  B: ["B", "Cs", "D", "F", "Fs", "G", "As"],
};

const BYZANTINE_SPELLING = {
  C: ["C", "Db", "E", "F", "G", "Ab", "B"],
  Db: ["Db", "D", "F", "Gb", "Ab", "A", "C"],
  D: ["D", "Eb", "Fs", "G", "A", "Bb", "Cs"],
  Eb: ["Eb", "Fb", "G", "Ab", "Bb", "Cb", "D"],
  E: ["E", "F", "Gs", "A", "B", "C", "Ds"],
  F: ["F", "Gb", "A", "Bb", "C", "Db", "E"],
  "F#": ["Fs", "G", "As", "B", "Cs", "D", "F"],
  G: ["G", "Ab", "B", "C", "D", "Eb", "Fs"],
  Ab: ["Ab", "A", "C", "Db", "Eb", "Fb", "G"],
  A: ["A", "Bb", "Cs", "D", "E", "F", "Gs"],
  Bb: ["Bb", "Cb", "D", "Eb", "F", "Gb", "A"],
  B: ["B", "C", "Ds", "E", "Fs", "G", "As"],
};

const HUNGARIAN_OFFSETS = [0, 2, 3, 6, 7, 8, 11, 12];
const BYZANTINE_OFFSETS = [0, 1, 4, 5, 7, 8, 11, 12];

const WHITE_PCS = new Set([0, 2, 4, 5, 7, 9, 11]);

// Voice files that actually exist on disk (from a Glob of voices/*.wav),
// used to detect + log combos this build needs that don't exist yet.
const FINGER_NOTE_EXISTS = {
  1: new Set(["A","Ab","As","B","Bb","C","Cb","Cs","D","Db","Ds","E","Eb","F","Fb","Fs","G","Gb","Gs"]),
  2: new Set(["A","Ab","As","B","Bb","C","Cb","Cs","D","Db","Ds","E","Eb","F","Fb","Fs","G","Gb","Gs"]),
  3: new Set(["A","Ab","B","Bb","C","Cb","Cs","D","Db","Ds","E","Eb","F","Fs","G","Gb","Gs"]), // missing: As, Fb
  4: new Set(["A","Ab","As","B","Bb","C","Cs","D","Db","Ds","E","Eb","F","Fb","Fs","G","Gb","Gs"]), // missing: Cb
  5: new Set(["A","B","C","D","E","F","G"]), // naturals only
};
const NOTE_EXISTS = new Set(["A","Ab","As","B","Bb","C","Cb","Cs","D","Db","Ds","E","Eb","F","Fb","Fs","G","Gb","Gs"]);

const missingAudio = [];
function fFile(finger, token) {
  const exists = FINGER_NOTE_EXISTS[finger].has(token);
  if (!exists) missingAudio.push(`f${finger}_${token}.wav`);
  return `f${finger}_${token}.wav`;
}
function noteFile(token) {
  if (!NOTE_EXISTS.has(token)) missingAudio.push(`note_${token}.wav`);
  return `note_${token}.wav`;
}

// ---------------------------------------------------------------------------
// Fingering reconstruction (no book/site precedent — see review doc).
// Standard-technique heuristic: thumb (finger 1) only ever lands on a white
// key; one thumb-crossing per octave, positioned at scale-degree 4 if that
// degree is white, else degree 5. RH group1 fingers ascend 1,2,3.. (or
// 2,3,4.. if the root itself is a black key, since the thumb can't open
// there); group2 fingers continue ascending 2,3,4,5. LH mirrors this with
// descending fingers, crossing point preferring degree 5 then degree 4,
// group1 descending from 5, group2 descending from (8-crossPos).
// ---------------------------------------------------------------------------
function computeRHFingers(whiteFlags7) {
  const w = [...whiteFlags7, whiteFlags7[0]]; // index7 = octave repeat, same key as root
  let k = w[3] ? 4 : w[4] ? 5 : 4; // 1-indexed crossing position
  const fingers = new Array(8);
  const startGroup1 = w[0] ? 1 : 2;
  for (let p = 1; p <= k - 1; p++) fingers[p - 1] = startGroup1 + (p - 1);
  fingers[k - 1] = 1;
  let f = 2;
  for (let p = k + 1; p <= 8; p++) { fingers[p - 1] = f; f++; }
  return fingers;
}

function computeLHFingers(whiteFlags7) {
  const w = [...whiteFlags7, whiteFlags7[0]];
  let k = w[4] ? 5 : w[3] ? 4 : 5;
  const fingers = new Array(8);
  let f = 5;
  for (let p = 1; p <= k - 1; p++) { fingers[p - 1] = f; f--; }
  fingers[k - 1] = 1;
  let g = 8 - k;
  for (let p = k + 1; p <= 8; p++) { fingers[p - 1] = g; g--; }
  return fingers;
}

function buildScale(keyMeta, scaleKind) {
  const isHungarian = scaleKind === "hungarian";
  const offsets = isHungarian ? HUNGARIAN_OFFSETS : BYZANTINE_OFFSETS;
  const spelling = (isHungarian ? HUNGARIAN_SPELLING : BYZANTINE_SPELLING)[keyMeta.code];
  const tokens8 = [...spelling, spelling[0]]; // octave repeat reuses root token

  const rhPitches = offsets.map((o) => keyMeta.rh + o);
  const lhPitches = offsets.map((o) => keyMeta.lh + o);

  const whiteFlags7 = spelling.map((_, i) => WHITE_PCS.has(rhPitches[i] % 12));
  const rhFingers = computeRHFingers(whiteFlags7);
  const lhFingers = computeLHFingers(whiteFlags7);

  // Build 16 slots per section: 8 ascending, 1 now_backwards repeat, 7 descending.
  function buildHandSlots(pitches8, fingers8) {
    const asc = [];
    for (let i = 0; i < 8; i++) {
      asc.push({
        pitch: pitches8[i],
        finger: fingers8[i],
        token: tokens8[i],
        voiceAudio: fFile(fingers8[i], tokens8[i]),
      });
    }
    const nowBack = { ...asc[7], voiceAudio: "now_backwards.wav" };
    const desc = asc.slice(0, 7).slice().reverse();
    return [...asc, nowBack, ...desc];
  }

  const rhSlots = buildHandSlots(rhPitches, rhFingers);
  const lhSlots = buildHandSlots(lhPitches, lhFingers);

  const togetherSlots = rhSlots.map((rhSlot, i) => {
    const lhSlot = lhSlots[i];
    const isNowBack = rhSlot.voiceAudio === "now_backwards.wav";
    return {
      pitches: [rhSlot.pitch, lhSlot.pitch],
      fingers: [rhSlot.finger, lhSlot.finger],
      voiceAudio: isNowBack ? "now_backwards.wav" : noteFile(rhSlot.token),
    };
  });

  return { rhSlots, lhSlots, togetherSlots, whiteFlags7, rhFingers, lhFingers, spelling };
}

function esc(s) {
  // Defensive: escape any stray double-quotes so generated strings never
  // break the surrounding JS string literal (we normally use curly quotes
  // in prose instead, but this is a safety net).
  return s.replace(/"/g, '\\"');
}

function fmtNote(token) {
  // Pretty-print a voice-file token as a display note name, e.g. "Fs" -> "F#", "Bb" -> "Bb", "Cb" -> "Cb"
  if (token.endsWith("s")) return token[0] + "#";
  return token;
}

function slotsToJs(slots, indent, kind) {
  return slots
    .map((s) => {
      if (kind === "together") {
        return `${indent}{ pitches: [${s.pitches[0]}, ${s.pitches[1]}], fingers: [${s.fingers[0]}, ${s.fingers[1]}], voiceAudio: V + "${s.voiceAudio}", cross: null },`;
      }
      return `${indent}{ pitches: [${s.pitch}], finger: ${s.finger}, voiceAudio: V + "${s.voiceAudio}", cross: null },`;
    })
    .join("\n");
}

function buildInfo(keyMeta, scaleKind, built) {
  const notesDisplay = built.spelling.map(fmtNote).join(", ");
  const isHungarian = scaleKind === "hungarian";
  const typeLabel = isHungarian ? "Hungarian Minor scale" : "Byzantine (Double Harmonic) scale";
  const description = isHungarian
    ? `Also called the “Gypsy minor,” ${keyMeta.disp} Hungarian Minor stacks a second augmented-2nd gap onto a harmonic-minor frame — ${notesDisplay} — for the dramatic, Eastern-European sound heard in Romani-influenced classical and folk music, and later borrowed by neoclassical metal soloists.`
    : `Also known as the double harmonic scale (and, in some sources, the “Arabic” scale), ${keyMeta.disp} Byzantine flattens the 2nd and 6th degrees of the major scale — ${notesDisplay} — packing two augmented-2nd gaps into one octave for a strong Middle Eastern/Balkan flavor also favored by neoclassical metal soloists.`;
  const advanced = isHungarian
    ? "Built from the natural minor scale with the 4th degree raised a half step, on top of harmonic minor's already-raised 7th — that second raised note is what creates the extra augmented-2nd gap. Interval pattern from the root (in semitones): 0, 2, 3, 6, 7, 8, 11."
    : "Built from the major scale with both the 2nd and 6th degrees lowered a half step, which creates its two augmented-2nd gaps (2nd-to-3rd and 6th-to-7th). Interval pattern from the root (in semitones): 0, 1, 4, 5, 7, 8, 11.";
  const degreeNames = isHungarian
    ? ["Tonic", "2nd", "Minor 3rd", "Raised 4th", "5th", "Minor 6th", "Major 7th"]
    : ["Tonic", "Minor 2nd", "Major 3rd", "4th", "5th", "Minor 6th", "Major 7th"];

  return `  info: {
    typeLabel: "${esc(typeLabel)}",
    description: "${esc(description)}",
    advanced: "${esc(advanced)}",
    keyInfo: {
      signature: "N/A — non-diatonic, no standard key signature (scale notes: ${esc(notesDisplay)})",
      relative: "N/A",
      parallel: "N/A",
      genres: ["World", "Classical", "Film Score", "Metal"],
    },
    degrees: {
      names: [${degreeNames.map((d) => `"${d}"`).join(", ")}],
    },
  },`;
}

function buildScaleObject(keyMeta, scaleKind) {
  const isHungarian = scaleKind === "hungarian";
  const built = buildScale(keyMeta, scaleKind);
  const varName = `${keyMeta.varKey}_${isHungarian ? "HUNGARIAN_MINOR" : "BYZANTINE"}`;
  const name = `${keyMeta.disp} ${isHungarian ? "Hungarian Minor" : "Byzantine"}`;
  const nameAudio = `TODO_${keyMeta.file}_${isHungarian ? "hungarian_minor" : "byzantine"}.wav`;
  const info = buildInfo(keyMeta, scaleKind, built);

  return `const ${varName} = {
  name: "${name}",
  nameAudio: V + "${nameAudio}",
${info}
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
${slotsToJs(built.rhSlots, "        ", "hand")}
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
${slotsToJs(built.lhSlots, "        ", "hand")}
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
${slotsToJs(built.togetherSlots, "        ", "together")}
      ],
    },
  ],
};`;
}

// ---------------------------------------------------------------------------
// Assemble output
// ---------------------------------------------------------------------------
let out = `// Hungarian Minor + Byzantine (Double Harmonic) scale data — all 12 keys.
// Generated by _generate.js. Uses the same "V" constant, slot shape, and
// single-octave-up/now_backwards/descend structure as data.js's C_MAJOR
// template. NOT wired into data.js's SCALES object — see
// hungarian_byzantine_review.md for integration notes and fingering caveats.
//
// const V = "voices/"; // <- already defined in data.js; this file assumes
// it's in scope when concatenated/loaded alongside data.js.

`;

const neededAudioNames = [];

for (const keyMeta of KEYS) {
  for (const kind of ["hungarian", "byzantine"]) {
    out += buildScaleObject(keyMeta, kind) + "\n\n";
    neededAudioNames.push(
      `${V_LITERAL}TODO_${keyMeta.file}_${kind === "hungarian" ? "hungarian_minor" : "byzantine"}.wav" -> spoken: "${keyMeta.spoken} ${kind === "hungarian" ? "Hungarian Minor" : "Byzantine"}"`
    );
  }
}

fs.writeFileSync(path.join(__dirname, "hungarian_byzantine.js"), out, "utf8");

// Missing audio log (dedupe, keep first-seen order)
const seenMissing = new Set();
const missingLines = [];
for (const m of missingAudio) {
  if (!seenMissing.has(m)) {
    seenMissing.add(m);
    missingLines.push(m);
  }
}
fs.writeFileSync(
  path.join(__dirname, "_missing_audio_raw.txt"),
  missingLines.join("\n") + "\n",
  "utf8"
);

fs.writeFileSync(
  path.join(__dirname, "_needed_audio_names_raw.txt"),
  neededAudioNames.join("\n") + "\n",
  "utf8"
);

console.log("Done. Missing audio combos:", missingLines.length);
console.log(missingLines.join("\n"));
