// Generator script for Hirajoshi + Spanish Gypsy scale data.
// Run with: node generate.js
// Produces hirajoshi_spanish_gypsy.js, _review.md, _missing_audio.txt,
// _needed_audio_names.txt in the same folder.

const fs = require("fs");
const path = require("path");

const NATURAL = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const LETTERS = ["C", "D", "E", "F", "G", "A", "B"];

function parseNote(s) {
  const letter = s[0];
  let acc = 0;
  if (s.length > 1) {
    if (s[1] === "#") acc = 1;
    else if (s[1] === "b") acc = -1;
  }
  if (s.length > 2) {
    // shouldn't happen in our tables, but just in case of ##/bb
    if (s.slice(1) === "##") acc = 2;
    if (s.slice(1) === "bb") acc = -2;
  }
  return { letter, acc };
}

function pcOf(letter, acc) {
  return ((NATURAL[letter] + acc) % 12 + 12) % 12;
}

function formatNote(letter, acc) {
  if (acc === 0) return letter;
  if (acc === 1) return letter + "#";
  if (acc === -1) return letter + "b";
  if (acc === 2) return letter + "##";
  if (acc === -2) return letter + "bb";
  throw new Error("bad acc " + acc);
}

function prevLetter(letter) {
  const i = LETTERS.indexOf(letter);
  return LETTERS[(i + 6) % 7];
}

// Flatten a note by one semitone, falling back to the previous natural
// letter if the naive result would be a double-flat (this only occurs
// for Db's b2/b6 and Ab's b2 among our 12 roots -- verified by hand).
function flattenNote(s) {
  const { letter, acc } = parseNote(s);
  const newAcc = acc - 1;
  if (newAcc >= -1) return formatNote(letter, newAcc);
  // newAcc === -2: fall back to previous letter, natural
  const pl = prevLetter(letter);
  const targetPc = pcOf(letter, newAcc);
  // sanity check it resolves to a natural on the previous letter
  if (pcOf(pl, 0) !== targetPc) {
    throw new Error(`Unexpected double-accidental fallback for ${s}`);
  }
  return pl; // natural
}

// Simplify E#/B# to F/C -- only ever applies to *unmodified* degrees
// (used as-is, not flattened). Established precedent: F# major's own
// natural 7th degree (E#) is spelled "F" throughout this app.
function simplifyUnmodified(s) {
  if (s === "E#") return "F";
  if (s === "B#") return "C";
  return s;
}

// True (unsimplified) major-scale degree spellings, degrees 1-7.
// Db uses C#'s sharp spelling as its computational basis (matching this
// app's existing "Db Minor" precedent, which plays C# minor's notes
// under the Db label because true Db minor needs a double-flat). Every
// other key's own native spelling is clean for both new scale types.
const TRUE_MAJOR = {
  C:  ["C", "D", "E", "F", "G", "A", "B"],
  Db: ["C#", "D#", "E#", "F#", "G#", "A#", "B#"], // = C# major, labeled Db
  D:  ["D", "E", "F#", "G", "A", "B", "C#"],
  Eb: ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
  E:  ["E", "F#", "G#", "A", "B", "C#", "D#"],
  F:  ["F", "G", "A", "Bb", "C", "D", "E"],
  "F#": ["F#", "G#", "A#", "B", "C#", "D#", "E#"],
  G:  ["G", "A", "B", "C", "D", "E", "F#"],
  Ab: ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
  A:  ["A", "B", "C#", "D", "E", "F#", "G#"],
  Bb: ["Bb", "C", "D", "Eb", "F", "G", "A"],
  B:  ["B", "C#", "D#", "E", "F#", "G#", "A#"],
};

const KEYS = [
  { label: "C",  pc: 0,  rhTonic: 60, lhTonic: 48 },
  { label: "Db", pc: 1,  rhTonic: 61, lhTonic: 49 },
  { label: "D",  pc: 2,  rhTonic: 62, lhTonic: 50 },
  { label: "Eb", pc: 3,  rhTonic: 63, lhTonic: 51 },
  { label: "E",  pc: 4,  rhTonic: 64, lhTonic: 52 },
  { label: "F",  pc: 5,  rhTonic: 65, lhTonic: 53 },
  { label: "F#", pc: 6,  rhTonic: 66, lhTonic: 54 },
  { label: "G",  pc: 7,  rhTonic: 67, lhTonic: 55 },
  { label: "Ab", pc: 8,  rhTonic: 68, lhTonic: 56 },
  { label: "A",  pc: 9,  rhTonic: 69, lhTonic: 57 },
  { label: "Bb", pc: 10, rhTonic: 70, lhTonic: 58 },
  { label: "B",  pc: 11, rhTonic: 71, lhTonic: 59 },
];

const SPOKEN = {
  C: "C", Db: "D Flat", D: "D", Eb: "E Flat", E: "E", F: "F",
  "F#": "F Sharp", G: "G", Ab: "A Flat", A: "A", Bb: "B Flat", B: "B",
};

const CONST_KEY = {
  C: "C", Db: "D_FLAT", D: "D", Eb: "E_FLAT", E: "E", F: "F",
  "F#": "F_SHARP", G: "G", Ab: "A_FLAT", A: "A", Bb: "B_FLAT", B: "B",
};

const SLUG = {
  C: "C", Db: "Db", D: "D", Eb: "Eb", E: "E", F: "F",
  "F#": "Fs", G: "G", Ab: "Ab", A: "A", Bb: "Bb", B: "B",
};

// --- voice file inventory (from Glob of voices/*.wav) ---------------------
const F1_AVAILABLE = new Set(["C","D","E","F","G","A","B","Cs","Db","Ds","Eb","Fs","Gb","Gs","Ab","As","Bb","Cb","Fb"]);
const F2_AVAILABLE = new Set(["C","D","E","F","G","A","B","Cs","Db","Ds","Eb","Fs","Gb","Gs","Ab","As","Bb","Cb","Fb"]);
const F3_AVAILABLE = new Set(["C","D","E","F","G","A","B","Cs","Db","Ds","Eb","Fs","Gb","Gs","Ab","Bb","Cb"]); // missing As, Fb
const F4_AVAILABLE = new Set(["C","D","E","F","G","A","B","Cs","Db","Ds","Eb","Fs","Gb","Gs","Ab","As","Bb","Fb"]); // missing Cb
const F5_AVAILABLE = new Set(["C","D","E","F","G","A","B"]); // naturals only
const NOTE_AVAILABLE = new Set(["C","D","E","F","G","A","B","Cs","Db","Ds","Eb","Fs","Gb","Gs","Ab","As","Bb","Cb","Fb"]);

function toSuffix(noteStr) {
  const { letter, acc } = parseNote(noteStr);
  if (acc === 0) return letter;
  if (acc === 1) return letter + "s";
  if (acc === -1) return letter + "b";
  throw new Error("Unexpected accidental in output note: " + noteStr);
}

const missingAudio = [];
function fingerAudioPath(finger, noteStr, context) {
  const suffix = toSuffix(noteStr);
  const sets = { 1: F1_AVAILABLE, 2: F2_AVAILABLE, 3: F3_AVAILABLE, 4: F4_AVAILABLE, 5: F5_AVAILABLE };
  if (!sets[finger].has(suffix)) {
    missingAudio.push(`voices/f${finger}_${suffix}.wav  (needed for ${context})`);
  }
  return `V + "f${finger}_${suffix}.wav"`;
}
function noteAudioPath(noteStr, context) {
  const suffix = toSuffix(noteStr);
  if (!NOTE_AVAILABLE.has(suffix)) {
    missingAudio.push(`voices/note_${suffix}.wav  (needed for ${context})`);
  }
  return `V + "note_${suffix}.wav"`;
}

// --- Spanish Gypsy fingering scaffolds (reused verbatim from each key's
// own confirmed/reconstructed Major-scale RH+LH finger-per-index shape,
// per this project's established mode precedent). Index 0-7 = scale
// degrees 1..7 then the octave. ---------------------------------------
const STANDARD_RH = [1, 2, 3, 1, 2, 3, 4, 5];
const STANDARD_LH = [5, 4, 3, 2, 1, 3, 2, 1];
const SPANISH_GYPSY_FINGERS = {
  C:  { rh: STANDARD_RH, lh: STANDARD_LH },
  D:  { rh: STANDARD_RH, lh: STANDARD_LH },
  G:  { rh: STANDARD_RH, lh: STANDARD_LH },
  A:  { rh: STANDARD_RH, lh: STANDARD_LH },
  E:  { rh: STANDARD_RH, lh: STANDARD_LH },
  B:  { rh: STANDARD_RH, lh: [4, 3, 2, 1, 4, 3, 2, 1] },
  "F#": { rh: [2, 3, 4, 1, 2, 3, 4, 1], lh: [4, 3, 2, 1, 4, 3, 2, 1] },
  F:  { rh: [1, 2, 3, 4, 1, 2, 3, 4], lh: STANDARD_LH },
  Bb: { rh: [4, 3, 2, 1, 4, 3, 2, 1], lh: [1, 2, 3, 4, 1, 2, 3, 4] },
  Eb: { rh: [2, 1, 2, 3, 4, 1, 2, 3], lh: [3, 2, 1, 4, 3, 2, 1, 4] },
  Ab: { rh: [2, 3, 1, 2, 3, 1, 2, 3], lh: [3, 2, 1, 4, 3, 2, 1, 4] },
  Db: { rh: [2, 3, 1, 2, 3, 4, 1, 2], lh: [3, 2, 1, 4, 3, 2, 1, 4] },
};

// --- Hirajoshi fingering (fully reconstructed, no book/site precedent) --
// RH: 1,2,3 on root/2nd/b3, thumb-restart 1,2,3 on 5th/b6/octave.
// LH: mirror-image complement (1<->4, 2<->3), avoiding finger 5 entirely
// (matching this app's own pattern of only ever using finger 5 on a
// natural-letter note -- see review notes).
const HIRAJOSHI_RH = [1, 2, 3, 1, 2, 3]; // root, 2nd, b3, 5th, b6, octave
const HIRAJOSHI_LH = [4, 3, 2, 4, 3, 2];

const out = [];
const reviewLines = [];
const neededAudioNames = [];

function buildScale(key, type) {
  const kc = key; // key config
  const trueMajor = TRUE_MAJOR[kc.label];
  const rhTonic = kc.rhTonic;
  const lhTonic = kc.lhTonic;

  let degreeNotes; // array of note strings (letter+accidental), in scale-degree order
  let intervals; // semitone offsets matching degreeNotes

  if (type === "hirajoshi") {
    const d1 = trueMajor[0];
    const d2 = simplifyUnmodified(trueMajor[1]);
    const d3 = flattenNote(trueMajor[2]);
    const d5 = simplifyUnmodified(trueMajor[4]);
    const d6 = flattenNote(trueMajor[5]);
    degreeNotes = [d1, d2, d3, d5, d6];
    intervals = [0, 2, 3, 7, 8];
  } else {
    const d1 = trueMajor[0];
    const d2 = flattenNote(trueMajor[1]);
    const d3 = simplifyUnmodified(trueMajor[2]);
    const d4 = simplifyUnmodified(trueMajor[3]);
    const d5 = simplifyUnmodified(trueMajor[4]);
    const d6 = flattenNote(trueMajor[5]);
    const d7 = flattenNote(trueMajor[6]);
    degreeNotes = [d1, d2, d3, d4, d5, d6, d7];
    intervals = [0, 1, 4, 5, 7, 8, 10];
  }

  // sanity-check pitch classes match the formula intervals
  intervals.forEach((iv, idx) => {
    const { letter, acc } = parseNote(degreeNotes[idx]);
    const gotPc = pcOf(letter, acc);
    const wantPc = (kc.pc + iv) % 12;
    if (gotPc !== wantPc) {
      throw new Error(
        `PC mismatch ${kc.label} ${type} degree${idx}: ${degreeNotes[idx]} -> ${gotPc}, expected ${wantPc}`
      );
    }
  });

  const n = degreeNotes.length; // 5 or 7
  const rootNote = degreeNotes[0];

  // ascending: n unique degrees + octave repeat of root
  const ascNotes = degreeNotes.concat([rootNote]);
  const ascIntervals = intervals.concat([12]);
  const ascRhPitches = ascIntervals.map((iv) => rhTonic + iv);
  const ascLhPitches = ascIntervals.map((iv) => lhTonic + iv);

  let ascRhFingers, ascLhFingers;
  if (type === "hirajoshi") {
    ascRhFingers = HIRAJOSHI_RH.concat([3]); // octave = finger 3 (thumb-restart run ends here)
    ascLhFingers = HIRAJOSHI_LH.concat([2]); // octave = finger 2 (mirror complement of 3)
  } else {
    const fk = SPANISH_GYPSY_FINGERS[kc.label];
    ascRhFingers = fk.rh.slice();
    ascLhFingers = fk.lh.slice();
  }

  const scaleTag = `${kc.label} ${type === "hirajoshi" ? "Hirajoshi" : "Spanish Gypsy"}`;

  function makeSlot(pitch, finger, noteStr, hand) {
    const context = `${scaleTag} ${hand} (${noteStr})`;
    return {
      pitch,
      finger,
      audio: fingerAudioPath(finger, noteStr, context),
    };
  }

  // RH ascending slots
  const rhAsc = ascNotes.map((note, i) => makeSlot(ascRhPitches[i], ascRhFingers[i], note, "RH"));
  // RH now_backwards
  const rhBackwards = { pitch: ascRhPitches[n], finger: ascRhFingers[n], audio: 'V + "now_backwards.wav"' };
  // RH descending: mirror of first n ascending, reversed
  const rhDesc = [];
  for (let i = n - 1; i >= 0; i--) {
    rhDesc.push(makeSlot(ascRhPitches[i], ascRhFingers[i], ascNotes[i], "RH"));
  }

  const lhAsc = ascNotes.map((note, i) => makeSlot(ascLhPitches[i], ascLhFingers[i], note, "LH"));
  const lhBackwards = { pitch: ascLhPitches[n], finger: ascLhFingers[n], audio: 'V + "now_backwards.wav"' };
  const lhDesc = [];
  for (let i = n - 1; i >= 0; i--) {
    lhDesc.push(makeSlot(ascLhPitches[i], ascLhFingers[i], ascNotes[i], "LH"));
  }

  // together section
  function makeTogetherSlot(idx, note) {
    const context = `${scaleTag} together (${note})`;
    return {
      pitches: [ascRhPitches[idx], ascLhPitches[idx]],
      fingers: [ascRhFingers[idx], ascLhFingers[idx]],
      audio: noteAudioPath(note, context),
    };
  }
  const togAsc = ascNotes.map((note, i) => makeTogetherSlot(i, note));
  const togBackwards = {
    pitches: [ascRhPitches[n], ascLhPitches[n]],
    fingers: [ascRhFingers[n], ascLhFingers[n]],
    audio: 'V + "now_backwards.wav"',
  };
  const togDesc = [];
  for (let i = n - 1; i >= 0; i--) {
    togDesc.push(makeTogetherSlot(i, ascNotes[i]));
  }

  return {
    key: kc, type, degreeNotes, rootNote, n,
    rhSlots: [...rhAsc, rhBackwards, ...rhDesc],
    lhSlots: [...lhAsc, lhBackwards, ...lhDesc],
    togSlots: [...togAsc, togBackwards, ...togDesc],
    usedC_SharpSubstitution: kc.label === "Db",
  };
}

function slotToJs(slot, indent, isTogether) {
  if (isTogether) {
    return `${indent}{ pitches: [${slot.pitches[0]}, ${slot.pitches[1]}], fingers: [${slot.fingers[0]}, ${slot.fingers[1]}], voiceAudio: ${slot.audio}, cross: null },`;
  }
  return `${indent}{ pitches: [${slot.pitch}], finger: ${slot.finger}, voiceAudio: ${slot.audio}, cross: null },`;
}

function parentHarmonicMinorLabel(kc) {
  const parentPc = (kc.pc + 5) % 12;
  const found = KEYS.find((k) => k.pc === parentPc);
  return found.label;
}

function buildInfo(kc, type) {
  if (type === "hirajoshi") {
    return `  info: {
    typeLabel: "Hirajoshi scale (Japanese pentatonic)",
    description: "A traditional Japanese pentatonic scale, associated with koto tunings. Its two " +
      "half-step intervals (2nd→♭3rd and 5th→♭6th) give it a distinctive, austere character " +
      "widely used in Japanese folk music and in film/game scoring to evoke a \\"Japan\\" atmosphere.",
    keyInfo: {
      signature: "N/A — non-diatonic, no standard key signature",
      relative: "N/A",
      parallel: "N/A",
      genres: ["World", "Film Score"],
    },
    degrees: {
      names: ["1st", "2nd", "3rd", "4th", "5th"],
    },
  },`;
  }
  const parentLabel = parentHarmonicMinorLabel(kc);
  return `  info: {
    typeLabel: "Spanish Gypsy scale (Phrygian dominant)",
    description: "A flamenco and Middle-Eastern-flavored scale — the 5th mode of the harmonic minor " +
      "scale. Its raised 3rd combined with a lowered 2nd creates the scale's signature Phrygian-" +
      "dominant sound, common in flamenco guitar, metal, and Middle-Eastern-influenced music.",
    keyInfo: {
      signature: "N/A — non-diatonic; 5th mode of ${parentLabel} Harmonic Minor",
      relative: "N/A",
      parallel: "N/A",
      genres: ["Flamenco", "Metal", "World"],
    },
    degrees: {
      names: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th"],
    },
  },`;
}

for (const kc of KEYS) {
  for (const type of ["hirajoshi", "spanishGypsy"]) {
    const typeKeyPart = type === "hirajoshi" ? "hirajoshi" : "spanishGypsy";
    const built = buildScale(kc, type === "hirajoshi" ? "hirajoshi" : "spanish_gypsy");
    const constName = `${CONST_KEY[kc.label]}_${type === "hirajoshi" ? "HIRAJOSHI" : "SPANISH_GYPSY"}`;
    const displayName = `${kc.label} ${type === "hirajoshi" ? "Hirajoshi" : "Spanish Gypsy"}`;
    const slug = SLUG[kc.label];
    const nameAudioFile = type === "hirajoshi" ? `TODO_${slug}_hirajoshi.wav` : `TODO_${slug}_spanish_gypsy.wav`;
    const spoken = `${SPOKEN[kc.label]} ${type === "hirajoshi" ? "Hirajoshi" : "Spanish Gypsy"}`;
    neededAudioNames.push(`${nameAudioFile}  =>  "${spoken}"`);

    const infoBlock = buildInfo(kc, type === "hirajoshi" ? "hirajoshi" : "spanish_gypsy");

    const rhSlotsJs = built.rhSlots.map((s) => slotToJs(s, "        ", false)).join("\n");
    const lhSlotsJs = built.lhSlots.map((s) => slotToJs(s, "        ", false)).join("\n");
    const togSlotsJs = built.togSlots.map((s) => slotToJs(s, "        ", true)).join("\n");

    const js = `const ${constName} = {
  name: "${displayName}",
  nameAudio: V + "${nameAudioFile}",
${infoBlock}
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
${rhSlotsJs}
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
${lhSlotsJs}
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
${togSlotsJs}
      ],
    },
  ],
};
`;
    out.push(js);

    reviewLines.push({ kc, type: type === "hirajoshi" ? "Hirajoshi" : "Spanish Gypsy", built, degreeNotes: built.degreeNotes });
  }
}

const header = `// Hirajoshi + Spanish Gypsy scale data for all 12 keys.
// Generated by generate.js -- see hirajoshi_spanish_gypsy_review.md for
// sourcing notes, fingering-reconstruction rationale, and confidence
// levels. NOT wired into data.js -- for manual review/integration.
//
// Requires the same V, FINGER_AUDIO, CROSS_* constants already defined
// in data.js to be in scope (V = "voices/"). cross is null throughout
// this file -- no thumb-crossing cues were added in this pass.

`;

fs.writeFileSync(path.join(__dirname, "hirajoshi_spanish_gypsy.js"), header + out.join("\n"));

// --- missing_audio.txt -----------------------------------------------
const uniqueMissing = [...new Set(missingAudio)];
fs.writeFileSync(
  path.join(__dirname, "hirajoshi_spanish_gypsy_missing_audio.txt"),
  uniqueMissing.length
    ? uniqueMissing.join("\n") + "\n"
    : "(none -- every voice file referenced by these 24 scales already exists.)\n"
);

// --- needed_audio_names.txt -------------------------------------------
fs.writeFileSync(
  path.join(__dirname, "hirajoshi_spanish_gypsy_needed_audio_names.txt"),
  neededAudioNames.join("\n") + "\n"
);

console.log("Done. Missing audio entries:", uniqueMissing.length);
console.log(uniqueMissing.join("\n"));

// dump computed degree spellings for the review doc to consume
fs.writeFileSync(
  path.join(__dirname, "_degrees_dump.json"),
  JSON.stringify(
    reviewLines.map((r) => ({
      key: r.kc.label,
      type: r.type,
      degrees: r.degreeNotes,
    })),
    null,
    2
  )
);
