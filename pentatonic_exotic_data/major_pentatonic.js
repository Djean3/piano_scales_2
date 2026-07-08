// Major Pentatonic scale data — all 12 keys.
// Built as a standalone companion file, NOT wired into data.js yet (per task
// instructions — the app owner will review and integrate manually).
//
// Template: single octave up (5 scale degrees: 1,2,3,5,6 of the parent major
// scale, i.e. the 4th and 7th dropped), repeat the top note via
// "now_backwards.wav", then descend the same 5 degrees back to the tonic —
// same shape as data.js's C_MAJOR (7-note) scales, just 5 notes instead of 7.
// This is NOT the 2-octave arpeggio format used elsewhere in data.js.
//
// Fingering source: pianoscales.org's Major Pentatonic Scales page, given
// directly by the task (cross-checked live via WebFetch on 2026-07-08 for
// C, F#/Gb, and B — all three matched exactly, including B major
// pentatonic's unusual LH "1,5,4,3,2,1" / RH "1,2,3,4,5,1", which is
// deliberate per the source, not a typo).
//
// Register anchor: each key's RH tonic pitch matches that key's existing
// "{Key} Major" entry in data.js (same first RH slot pitch); LH tonic is
// exactly one octave below (confirmed true for all 12 keys in data.js).
//
// cross: null everywhere in this pass (no thumb-crossing cues built yet).

const V = "voices/";

// ---------------------------------------------------------------------
// C MAJOR PENTATONIC (anchor: RH root = 60 / C4, LH root = 48 / C3)
// ---------------------------------------------------------------------
const C_MAJOR_PENTATONIC = {
  name: "C Major Pentatonic",
  nameAudio: V + "TODO_C_major_pentatonic.wav",
  info: {
    typeLabel: "Major pentatonic scale",
    description: "The major scale with the 4th and 7th removed — dropping the 4th (F) and 7th (B), " +
      "the most tension-heavy notes — leaves the \"no wrong notes\" scale, ubiquitous in blues, " +
      "rock, country, and pop soloing.",
    keyInfo: {
      signature: "No sharps or flats",
      relative: "A minor",
      parallel: "C minor",
      genres: ["Blues", "Rock", "Country", "Folk"],
    },
    degrees: {
      solfege:   ["Do", "Re", "Mi", "Sol", "La"],
      names:     ["1st", "2nd", "3rd", "5th", "6th"],
      functions: ["Home", "Passing", "Color", "Tension", "Color"],
    },
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [60], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [62], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
        { pitches: [64], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
        { pitches: [67], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [69], finger: 3, voiceAudio: V + "f3_A.wav", cross: null },
        { pitches: [72], finger: 5, voiceAudio: V + "f5_C.wav", cross: null },
        { pitches: [72], finger: 5, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [69], finger: 3, voiceAudio: V + "f3_A.wav", cross: null },
        { pitches: [67], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [64], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
        { pitches: [62], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
        { pitches: [60], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [48], finger: 3, voiceAudio: V + "f3_C.wav", cross: null },
        { pitches: [50], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
        { pitches: [52], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
        { pitches: [55], finger: 3, voiceAudio: V + "f3_G.wav", cross: null },
        { pitches: [57], finger: 2, voiceAudio: V + "f2_A.wav", cross: null },
        { pitches: [60], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [60], finger: 1, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [57], finger: 2, voiceAudio: V + "f2_A.wav", cross: null },
        { pitches: [55], finger: 3, voiceAudio: V + "f3_G.wav", cross: null },
        { pitches: [52], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
        { pitches: [50], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
        { pitches: [48], finger: 3, voiceAudio: V + "f3_C.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [60, 48], fingers: [1, 3], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [62, 50], fingers: [2, 2], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [64, 52], fingers: [1, 1], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [67, 55], fingers: [2, 3], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [69, 57], fingers: [3, 2], voiceAudio: V + "note_A.wav", cross: null },
        { pitches: [72, 60], fingers: [5, 1], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [72, 60], fingers: [5, 1], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [69, 57], fingers: [3, 2], voiceAudio: V + "note_A.wav", cross: null },
        { pitches: [67, 55], fingers: [2, 3], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [64, 52], fingers: [1, 1], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [62, 50], fingers: [2, 2], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [60, 48], fingers: [1, 3], voiceAudio: V + "note_C.wav", cross: null },
      ],
    },
  ],
};

// ---------------------------------------------------------------------
// Db MAJOR PENTATONIC (anchor: RH root = 61 / Db4, LH root = 49 / Db3)
// ---------------------------------------------------------------------
const D_FLAT_MAJOR_PENTATONIC = {
  name: "Db Major Pentatonic",
  nameAudio: V + "TODO_Db_major_pentatonic.wav",
  info: {
    typeLabel: "Major pentatonic scale",
    description: "The major scale with the 4th and 7th removed — dropping the 4th (G♭) and 7th (C), " +
      "the most tension-heavy notes — leaves the \"no wrong notes\" scale, ubiquitous in blues, " +
      "rock, country, and pop soloing.",
    keyInfo: {
      signature: "5 flats — Bb, E♭, A♭, D♭, and G♭",
      relative: "Bb minor",
      parallel: "D♭ minor (played here using its practical enharmonic spelling, C♯ minor)",
      genres: ["Blues", "Rock", "Country", "Folk"],
    },
    degrees: {
      solfege:   ["Do", "Re", "Mi", "Sol", "La"],
      names:     ["1st", "2nd", "3rd", "5th", "6th"],
      functions: ["Home", "Passing", "Color", "Tension", "Color"],
    },
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [61], finger: 2, voiceAudio: V + "f2_Db.wav", cross: null },
        { pitches: [63], finger: 3, voiceAudio: V + "f3_Eb.wav", cross: null },
        { pitches: [65], finger: 1, voiceAudio: V + "f1_F.wav", cross: null },
        { pitches: [68], finger: 2, voiceAudio: V + "f2_Ab.wav", cross: null },
        { pitches: [70], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [73], finger: 4, voiceAudio: V + "f4_Db.wav", cross: null },
        { pitches: [73], finger: 4, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [70], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [68], finger: 2, voiceAudio: V + "f2_Ab.wav", cross: null },
        { pitches: [65], finger: 1, voiceAudio: V + "f1_F.wav", cross: null },
        { pitches: [63], finger: 3, voiceAudio: V + "f3_Eb.wav", cross: null },
        { pitches: [61], finger: 2, voiceAudio: V + "f2_Db.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [49], finger: 3, voiceAudio: V + "f3_Db.wav", cross: null },
        { pitches: [51], finger: 2, voiceAudio: V + "f2_Eb.wav", cross: null },
        { pitches: [53], finger: 1, voiceAudio: V + "f1_F.wav", cross: null },
        { pitches: [56], finger: 4, voiceAudio: V + "f4_Ab.wav", cross: null },
        { pitches: [58], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [61], finger: 2, voiceAudio: V + "f2_Db.wav", cross: null },
        { pitches: [61], finger: 2, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [58], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [56], finger: 4, voiceAudio: V + "f4_Ab.wav", cross: null },
        { pitches: [53], finger: 1, voiceAudio: V + "f1_F.wav", cross: null },
        { pitches: [51], finger: 2, voiceAudio: V + "f2_Eb.wav", cross: null },
        { pitches: [49], finger: 3, voiceAudio: V + "f3_Db.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [61, 49], fingers: [2, 3], voiceAudio: V + "note_Db.wav", cross: null },
        { pitches: [63, 51], fingers: [3, 2], voiceAudio: V + "note_Eb.wav", cross: null },
        { pitches: [65, 53], fingers: [1, 1], voiceAudio: V + "note_F.wav", cross: null },
        { pitches: [68, 56], fingers: [2, 4], voiceAudio: V + "note_Ab.wav", cross: null },
        { pitches: [70, 58], fingers: [3, 3], voiceAudio: V + "note_Bb.wav", cross: null },
        { pitches: [73, 61], fingers: [4, 2], voiceAudio: V + "note_Db.wav", cross: null },
        { pitches: [73, 61], fingers: [4, 2], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [70, 58], fingers: [3, 3], voiceAudio: V + "note_Bb.wav", cross: null },
        { pitches: [68, 56], fingers: [2, 4], voiceAudio: V + "note_Ab.wav", cross: null },
        { pitches: [65, 53], fingers: [1, 1], voiceAudio: V + "note_F.wav", cross: null },
        { pitches: [63, 51], fingers: [3, 2], voiceAudio: V + "note_Eb.wav", cross: null },
        { pitches: [61, 49], fingers: [2, 3], voiceAudio: V + "note_Db.wav", cross: null },
      ],
    },
  ],
};

// ---------------------------------------------------------------------
// D MAJOR PENTATONIC (anchor: RH root = 62 / D4, LH root = 50 / D3)
// ---------------------------------------------------------------------
const D_MAJOR_PENTATONIC = {
  name: "D Major Pentatonic",
  nameAudio: V + "TODO_D_major_pentatonic.wav",
  info: {
    typeLabel: "Major pentatonic scale",
    description: "The major scale with the 4th and 7th removed — dropping the 4th (G) and 7th (C♯), " +
      "the most tension-heavy notes — leaves the \"no wrong notes\" scale, ubiquitous in blues, " +
      "rock, country, and pop soloing.",
    keyInfo: {
      signature: "2 sharps — F♯ and C♯",
      relative: "B minor",
      parallel: "D minor",
      genres: ["Blues", "Rock", "Country", "Folk"],
    },
    degrees: {
      solfege:   ["Do", "Re", "Mi", "Sol", "La"],
      names:     ["1st", "2nd", "3rd", "5th", "6th"],
      functions: ["Home", "Passing", "Color", "Tension", "Color"],
    },
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [62], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
        { pitches: [64], finger: 2, voiceAudio: V + "f2_E.wav", cross: null },
        { pitches: [66], finger: 3, voiceAudio: V + "f3_Fs.wav", cross: null },
        { pitches: [69], finger: 1, voiceAudio: V + "f1_A.wav", cross: null },
        { pitches: [71], finger: 2, voiceAudio: V + "f2_B.wav", cross: null },
        { pitches: [74], finger: 4, voiceAudio: V + "f4_D.wav", cross: null },
        { pitches: [74], finger: 4, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [71], finger: 2, voiceAudio: V + "f2_B.wav", cross: null },
        { pitches: [69], finger: 1, voiceAudio: V + "f1_A.wav", cross: null },
        { pitches: [66], finger: 3, voiceAudio: V + "f3_Fs.wav", cross: null },
        { pitches: [64], finger: 2, voiceAudio: V + "f2_E.wav", cross: null },
        { pitches: [62], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [50], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
        { pitches: [52], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
        { pitches: [54], finger: 3, voiceAudio: V + "f3_Fs.wav", cross: null },
        { pitches: [57], finger: 2, voiceAudio: V + "f2_A.wav", cross: null },
        { pitches: [59], finger: 1, voiceAudio: V + "f1_B.wav", cross: null },
        { pitches: [62], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
        { pitches: [62], finger: 2, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [59], finger: 1, voiceAudio: V + "f1_B.wav", cross: null },
        { pitches: [57], finger: 2, voiceAudio: V + "f2_A.wav", cross: null },
        { pitches: [54], finger: 3, voiceAudio: V + "f3_Fs.wav", cross: null },
        { pitches: [52], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
        { pitches: [50], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [62, 50], fingers: [1, 2], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [64, 52], fingers: [2, 1], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [66, 54], fingers: [3, 3], voiceAudio: V + "note_Fs.wav", cross: null },
        { pitches: [69, 57], fingers: [1, 2], voiceAudio: V + "note_A.wav", cross: null },
        { pitches: [71, 59], fingers: [2, 1], voiceAudio: V + "note_B.wav", cross: null },
        { pitches: [74, 62], fingers: [4, 2], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [74, 62], fingers: [4, 2], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [71, 59], fingers: [2, 1], voiceAudio: V + "note_B.wav", cross: null },
        { pitches: [69, 57], fingers: [1, 2], voiceAudio: V + "note_A.wav", cross: null },
        { pitches: [66, 54], fingers: [3, 3], voiceAudio: V + "note_Fs.wav", cross: null },
        { pitches: [64, 52], fingers: [2, 1], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [62, 50], fingers: [1, 2], voiceAudio: V + "note_D.wav", cross: null },
      ],
    },
  ],
};

// ---------------------------------------------------------------------
// Eb MAJOR PENTATONIC (anchor: RH root = 63 / Eb4, LH root = 51 / Eb3)
// ---------------------------------------------------------------------
const E_FLAT_MAJOR_PENTATONIC = {
  name: "Eb Major Pentatonic",
  nameAudio: V + "TODO_Eb_major_pentatonic.wav",
  info: {
    typeLabel: "Major pentatonic scale",
    description: "The major scale with the 4th and 7th removed — dropping the 4th (A♭) and 7th (D), " +
      "the most tension-heavy notes — leaves the \"no wrong notes\" scale, ubiquitous in blues, " +
      "rock, country, and pop soloing.",
    keyInfo: {
      signature: "3 flats — Bb, E♭, and A♭",
      relative: "C minor",
      parallel: "E♭ minor",
      genres: ["Blues", "Rock", "Country", "Folk"],
    },
    degrees: {
      solfege:   ["Do", "Re", "Mi", "Sol", "La"],
      names:     ["1st", "2nd", "3rd", "5th", "6th"],
      functions: ["Home", "Passing", "Color", "Tension", "Color"],
    },
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [63], finger: 2, voiceAudio: V + "f2_Eb.wav", cross: null },
        { pitches: [65], finger: 1, voiceAudio: V + "f1_F.wav", cross: null },
        { pitches: [67], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [70], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [72], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [75], finger: 2, voiceAudio: V + "f2_Eb.wav", cross: null },
        { pitches: [75], finger: 2, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [72], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [70], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [67], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [65], finger: 1, voiceAudio: V + "f1_F.wav", cross: null },
        { pitches: [63], finger: 2, voiceAudio: V + "f2_Eb.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [51], finger: 3, voiceAudio: V + "f3_Eb.wav", cross: null },
        { pitches: [53], finger: 2, voiceAudio: V + "f2_F.wav", cross: null },
        { pitches: [55], finger: 1, voiceAudio: V + "f1_G.wav", cross: null },
        { pitches: [58], finger: 2, voiceAudio: V + "f2_Bb.wav", cross: null },
        { pitches: [60], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [63], finger: 3, voiceAudio: V + "f3_Eb.wav", cross: null },
        { pitches: [63], finger: 3, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [60], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [58], finger: 2, voiceAudio: V + "f2_Bb.wav", cross: null },
        { pitches: [55], finger: 1, voiceAudio: V + "f1_G.wav", cross: null },
        { pitches: [53], finger: 2, voiceAudio: V + "f2_F.wav", cross: null },
        { pitches: [51], finger: 3, voiceAudio: V + "f3_Eb.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [63, 51], fingers: [2, 3], voiceAudio: V + "note_Eb.wav", cross: null },
        { pitches: [65, 53], fingers: [1, 2], voiceAudio: V + "note_F.wav", cross: null },
        { pitches: [67, 55], fingers: [2, 1], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [70, 58], fingers: [3, 2], voiceAudio: V + "note_Bb.wav", cross: null },
        { pitches: [72, 60], fingers: [1, 1], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [75, 63], fingers: [2, 3], voiceAudio: V + "note_Eb.wav", cross: null },
        { pitches: [75, 63], fingers: [2, 3], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [72, 60], fingers: [1, 1], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [70, 58], fingers: [3, 2], voiceAudio: V + "note_Bb.wav", cross: null },
        { pitches: [67, 55], fingers: [2, 1], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [65, 53], fingers: [1, 2], voiceAudio: V + "note_F.wav", cross: null },
        { pitches: [63, 51], fingers: [2, 3], voiceAudio: V + "note_Eb.wav", cross: null },
      ],
    },
  ],
};

// ---------------------------------------------------------------------
// E MAJOR PENTATONIC (anchor: RH root = 64 / E4, LH root = 52 / E3)
// ---------------------------------------------------------------------
const E_MAJOR_PENTATONIC = {
  name: "E Major Pentatonic",
  nameAudio: V + "TODO_E_major_pentatonic.wav",
  info: {
    typeLabel: "Major pentatonic scale",
    description: "The major scale with the 4th and 7th removed — dropping the 4th (A) and 7th (D♯), " +
      "the most tension-heavy notes — leaves the \"no wrong notes\" scale, ubiquitous in blues, " +
      "rock, country, and pop soloing.",
    keyInfo: {
      signature: "4 sharps — F♯, C♯, G♯, and D♯",
      relative: "C♯ minor",
      parallel: "E minor",
      genres: ["Blues", "Rock", "Country", "Folk"],
    },
    degrees: {
      solfege:   ["Do", "Re", "Mi", "Sol", "La"],
      names:     ["1st", "2nd", "3rd", "5th", "6th"],
      functions: ["Home", "Passing", "Color", "Tension", "Color"],
    },
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [64], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
        { pitches: [66], finger: 2, voiceAudio: V + "f2_Fs.wav", cross: null },
        { pitches: [68], finger: 3, voiceAudio: V + "f3_Gs.wav", cross: null },
        { pitches: [71], finger: 1, voiceAudio: V + "f1_B.wav", cross: null },
        { pitches: [73], finger: 2, voiceAudio: V + "f2_Cs.wav", cross: null },
        { pitches: [76], finger: 3, voiceAudio: V + "f3_E.wav", cross: null },
        { pitches: [76], finger: 3, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [73], finger: 2, voiceAudio: V + "f2_Cs.wav", cross: null },
        { pitches: [71], finger: 1, voiceAudio: V + "f1_B.wav", cross: null },
        { pitches: [68], finger: 3, voiceAudio: V + "f3_Gs.wav", cross: null },
        { pitches: [66], finger: 2, voiceAudio: V + "f2_Fs.wav", cross: null },
        { pitches: [64], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [52], finger: 4, voiceAudio: V + "f4_E.wav", cross: null },
        { pitches: [54], finger: 3, voiceAudio: V + "f3_Fs.wav", cross: null },
        { pitches: [56], finger: 2, voiceAudio: V + "f2_Gs.wav", cross: null },
        { pitches: [59], finger: 1, voiceAudio: V + "f1_B.wav", cross: null },
        { pitches: [61], finger: 2, voiceAudio: V + "f2_Cs.wav", cross: null },
        { pitches: [64], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
        { pitches: [64], finger: 1, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [61], finger: 2, voiceAudio: V + "f2_Cs.wav", cross: null },
        { pitches: [59], finger: 1, voiceAudio: V + "f1_B.wav", cross: null },
        { pitches: [56], finger: 2, voiceAudio: V + "f2_Gs.wav", cross: null },
        { pitches: [54], finger: 3, voiceAudio: V + "f3_Fs.wav", cross: null },
        { pitches: [52], finger: 4, voiceAudio: V + "f4_E.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [64, 52], fingers: [1, 4], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [66, 54], fingers: [2, 3], voiceAudio: V + "note_Fs.wav", cross: null },
        { pitches: [68, 56], fingers: [3, 2], voiceAudio: V + "note_Gs.wav", cross: null },
        { pitches: [71, 59], fingers: [1, 1], voiceAudio: V + "note_B.wav", cross: null },
        { pitches: [73, 61], fingers: [2, 2], voiceAudio: V + "note_Cs.wav", cross: null },
        { pitches: [76, 64], fingers: [3, 1], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [76, 64], fingers: [3, 1], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [73, 61], fingers: [2, 2], voiceAudio: V + "note_Cs.wav", cross: null },
        { pitches: [71, 59], fingers: [1, 1], voiceAudio: V + "note_B.wav", cross: null },
        { pitches: [68, 56], fingers: [3, 2], voiceAudio: V + "note_Gs.wav", cross: null },
        { pitches: [66, 54], fingers: [2, 3], voiceAudio: V + "note_Fs.wav", cross: null },
        { pitches: [64, 52], fingers: [1, 4], voiceAudio: V + "note_E.wav", cross: null },
      ],
    },
  ],
};

// ---------------------------------------------------------------------
// F MAJOR PENTATONIC (anchor: RH root = 65 / F4, LH root = 53 / F3)
// ---------------------------------------------------------------------
const F_MAJOR_PENTATONIC = {
  name: "F Major Pentatonic",
  nameAudio: V + "TODO_F_major_pentatonic.wav",
  info: {
    typeLabel: "Major pentatonic scale",
    description: "The major scale with the 4th and 7th removed — dropping the 4th (Bb) and 7th (E), " +
      "the most tension-heavy notes — leaves the \"no wrong notes\" scale, ubiquitous in blues, " +
      "rock, country, and pop soloing.",
    keyInfo: {
      signature: "1 flat — Bb",
      relative: "D minor",
      parallel: "F minor",
      genres: ["Blues", "Rock", "Country", "Folk"],
    },
    degrees: {
      solfege:   ["Do", "Re", "Mi", "Sol", "La"],
      names:     ["1st", "2nd", "3rd", "5th", "6th"],
      functions: ["Home", "Passing", "Color", "Tension", "Color"],
    },
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [65], finger: 1, voiceAudio: V + "f1_F.wav", cross: null },
        { pitches: [67], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [69], finger: 3, voiceAudio: V + "f3_A.wav", cross: null },
        { pitches: [72], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [74], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
        { pitches: [77], finger: 4, voiceAudio: V + "f4_F.wav", cross: null },
        { pitches: [77], finger: 4, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [74], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
        { pitches: [72], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [69], finger: 3, voiceAudio: V + "f3_A.wav", cross: null },
        { pitches: [67], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [65], finger: 1, voiceAudio: V + "f1_F.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [53], finger: 3, voiceAudio: V + "f3_F.wav", cross: null },
        { pitches: [55], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [57], finger: 1, voiceAudio: V + "f1_A.wav", cross: null },
        { pitches: [60], finger: 2, voiceAudio: V + "f2_C.wav", cross: null },
        { pitches: [62], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
        { pitches: [65], finger: 3, voiceAudio: V + "f3_F.wav", cross: null },
        { pitches: [65], finger: 3, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [62], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
        { pitches: [60], finger: 2, voiceAudio: V + "f2_C.wav", cross: null },
        { pitches: [57], finger: 1, voiceAudio: V + "f1_A.wav", cross: null },
        { pitches: [55], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [53], finger: 3, voiceAudio: V + "f3_F.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [65, 53], fingers: [1, 3], voiceAudio: V + "note_F.wav", cross: null },
        { pitches: [67, 55], fingers: [2, 2], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [69, 57], fingers: [3, 1], voiceAudio: V + "note_A.wav", cross: null },
        { pitches: [72, 60], fingers: [1, 2], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [74, 62], fingers: [2, 1], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [77, 65], fingers: [4, 3], voiceAudio: V + "note_F.wav", cross: null },
        { pitches: [77, 65], fingers: [4, 3], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [74, 62], fingers: [2, 1], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [72, 60], fingers: [1, 2], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [69, 57], fingers: [3, 1], voiceAudio: V + "note_A.wav", cross: null },
        { pitches: [67, 55], fingers: [2, 2], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [65, 53], fingers: [1, 3], voiceAudio: V + "note_F.wav", cross: null },
      ],
    },
  ],
};

// ---------------------------------------------------------------------
// F# MAJOR PENTATONIC (anchor: RH root = 66 / F#4, LH root = 54 / F#3)
// ---------------------------------------------------------------------
const F_SHARP_MAJOR_PENTATONIC = {
  name: "F# Major Pentatonic",
  nameAudio: V + "TODO_FSharp_major_pentatonic.wav",
  info: {
    typeLabel: "Major pentatonic scale",
    description: "The major scale with the 4th and 7th removed — dropping the 4th (B) and 7th (E♯), " +
      "the most tension-heavy notes — leaves the \"no wrong notes\" scale, ubiquitous in blues, " +
      "rock, country, and pop soloing.",
    keyInfo: {
      signature: "6 sharps — F♯, G♯, A♯, C♯, D♯, and E♯",
      relative: "D♯ minor",
      parallel: "F♯ minor",
      genres: ["Blues", "Rock", "Country", "Folk"],
    },
    degrees: {
      solfege:   ["Do", "Re", "Mi", "Sol", "La"],
      names:     ["1st", "2nd", "3rd", "5th", "6th"],
      functions: ["Home", "Passing", "Color", "Tension", "Color"],
    },
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [66], finger: 1, voiceAudio: V + "f1_Fs.wav", cross: null },
        { pitches: [68], finger: 2, voiceAudio: V + "f2_Gs.wav", cross: null },
        { pitches: [70], finger: 3, voiceAudio: V + "f3_As.wav", cross: null },
        { pitches: [73], finger: 1, voiceAudio: V + "f1_Cs.wav", cross: null },
        { pitches: [75], finger: 2, voiceAudio: V + "f2_Ds.wav", cross: null },
        { pitches: [78], finger: 3, voiceAudio: V + "f3_Fs.wav", cross: null },
        { pitches: [78], finger: 3, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [75], finger: 2, voiceAudio: V + "f2_Ds.wav", cross: null },
        { pitches: [73], finger: 1, voiceAudio: V + "f1_Cs.wav", cross: null },
        { pitches: [70], finger: 3, voiceAudio: V + "f3_As.wav", cross: null },
        { pitches: [68], finger: 2, voiceAudio: V + "f2_Gs.wav", cross: null },
        { pitches: [66], finger: 1, voiceAudio: V + "f1_Fs.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [54], finger: 3, voiceAudio: V + "f3_Fs.wav", cross: null },
        { pitches: [56], finger: 2, voiceAudio: V + "f2_Gs.wav", cross: null },
        { pitches: [58], finger: 1, voiceAudio: V + "f1_As.wav", cross: null },
        { pitches: [61], finger: 3, voiceAudio: V + "f3_Cs.wav", cross: null },
        { pitches: [63], finger: 2, voiceAudio: V + "f2_Ds.wav", cross: null },
        { pitches: [66], finger: 1, voiceAudio: V + "f1_Fs.wav", cross: null },
        { pitches: [66], finger: 1, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [63], finger: 2, voiceAudio: V + "f2_Ds.wav", cross: null },
        { pitches: [61], finger: 3, voiceAudio: V + "f3_Cs.wav", cross: null },
        { pitches: [58], finger: 1, voiceAudio: V + "f1_As.wav", cross: null },
        { pitches: [56], finger: 2, voiceAudio: V + "f2_Gs.wav", cross: null },
        { pitches: [54], finger: 3, voiceAudio: V + "f3_Fs.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [66, 54], fingers: [1, 3], voiceAudio: V + "note_Fs.wav", cross: null },
        { pitches: [68, 56], fingers: [2, 2], voiceAudio: V + "note_Gs.wav", cross: null },
        { pitches: [70, 58], fingers: [3, 1], voiceAudio: V + "note_As.wav", cross: null },
        { pitches: [73, 61], fingers: [1, 3], voiceAudio: V + "note_Cs.wav", cross: null },
        { pitches: [75, 63], fingers: [2, 2], voiceAudio: V + "note_Ds.wav", cross: null },
        { pitches: [78, 66], fingers: [3, 1], voiceAudio: V + "note_Fs.wav", cross: null },
        { pitches: [78, 66], fingers: [3, 1], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [75, 63], fingers: [2, 2], voiceAudio: V + "note_Ds.wav", cross: null },
        { pitches: [73, 61], fingers: [1, 3], voiceAudio: V + "note_Cs.wav", cross: null },
        { pitches: [70, 58], fingers: [3, 1], voiceAudio: V + "note_As.wav", cross: null },
        { pitches: [68, 56], fingers: [2, 2], voiceAudio: V + "note_Gs.wav", cross: null },
        { pitches: [66, 54], fingers: [1, 3], voiceAudio: V + "note_Fs.wav", cross: null },
      ],
    },
  ],
};

// ---------------------------------------------------------------------
// G MAJOR PENTATONIC (anchor: RH root = 67 / G4, LH root = 55 / G3)
// ---------------------------------------------------------------------
const G_MAJOR_PENTATONIC = {
  name: "G Major Pentatonic",
  nameAudio: V + "TODO_G_major_pentatonic.wav",
  info: {
    typeLabel: "Major pentatonic scale",
    description: "The major scale with the 4th and 7th removed — dropping the 4th (C) and 7th (F♯), " +
      "the most tension-heavy notes — leaves the \"no wrong notes\" scale, ubiquitous in blues, " +
      "rock, country, and pop soloing.",
    keyInfo: {
      signature: "1 sharp — F♯",
      relative: "E minor",
      parallel: "G minor",
      genres: ["Blues", "Rock", "Country", "Folk"],
    },
    degrees: {
      solfege:   ["Do", "Re", "Mi", "Sol", "La"],
      names:     ["1st", "2nd", "3rd", "5th", "6th"],
      functions: ["Home", "Passing", "Color", "Tension", "Color"],
    },
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [67], finger: 1, voiceAudio: V + "f1_G.wav", cross: null },
        { pitches: [69], finger: 2, voiceAudio: V + "f2_A.wav", cross: null },
        { pitches: [71], finger: 3, voiceAudio: V + "f3_B.wav", cross: null },
        { pitches: [74], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
        { pitches: [76], finger: 2, voiceAudio: V + "f2_E.wav", cross: null },
        { pitches: [79], finger: 4, voiceAudio: V + "f4_G.wav", cross: null },
        { pitches: [79], finger: 4, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [76], finger: 2, voiceAudio: V + "f2_E.wav", cross: null },
        { pitches: [74], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
        { pitches: [71], finger: 3, voiceAudio: V + "f3_B.wav", cross: null },
        { pitches: [69], finger: 2, voiceAudio: V + "f2_A.wav", cross: null },
        { pitches: [67], finger: 1, voiceAudio: V + "f1_G.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [55], finger: 3, voiceAudio: V + "f3_G.wav", cross: null },
        { pitches: [57], finger: 2, voiceAudio: V + "f2_A.wav", cross: null },
        { pitches: [59], finger: 1, voiceAudio: V + "f1_B.wav", cross: null },
        { pitches: [62], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
        { pitches: [64], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
        { pitches: [67], finger: 3, voiceAudio: V + "f3_G.wav", cross: null },
        { pitches: [67], finger: 3, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [64], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
        { pitches: [62], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
        { pitches: [59], finger: 1, voiceAudio: V + "f1_B.wav", cross: null },
        { pitches: [57], finger: 2, voiceAudio: V + "f2_A.wav", cross: null },
        { pitches: [55], finger: 3, voiceAudio: V + "f3_G.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [67, 55], fingers: [1, 3], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [69, 57], fingers: [2, 2], voiceAudio: V + "note_A.wav", cross: null },
        { pitches: [71, 59], fingers: [3, 1], voiceAudio: V + "note_B.wav", cross: null },
        { pitches: [74, 62], fingers: [1, 2], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [76, 64], fingers: [2, 1], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [79, 67], fingers: [4, 3], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [79, 67], fingers: [4, 3], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [76, 64], fingers: [2, 1], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [74, 62], fingers: [1, 2], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [71, 59], fingers: [3, 1], voiceAudio: V + "note_B.wav", cross: null },
        { pitches: [69, 57], fingers: [2, 2], voiceAudio: V + "note_A.wav", cross: null },
        { pitches: [67, 55], fingers: [1, 3], voiceAudio: V + "note_G.wav", cross: null },
      ],
    },
  ],
};

// ---------------------------------------------------------------------
// Ab MAJOR PENTATONIC (anchor: RH root = 68 / Ab4, LH root = 56 / Ab3)
// ---------------------------------------------------------------------
const A_FLAT_MAJOR_PENTATONIC = {
  name: "Ab Major Pentatonic",
  nameAudio: V + "TODO_Ab_major_pentatonic.wav",
  info: {
    typeLabel: "Major pentatonic scale",
    description: "The major scale with the 4th and 7th removed — dropping the 4th (D♭) and 7th (G), " +
      "the most tension-heavy notes — leaves the \"no wrong notes\" scale, ubiquitous in blues, " +
      "rock, country, and pop soloing.",
    keyInfo: {
      signature: "4 flats — Bb, E♭, A♭, and D♭",
      relative: "F minor",
      parallel: "A♭ minor",
      genres: ["Blues", "Rock", "Country", "Folk"],
    },
    degrees: {
      solfege:   ["Do", "Re", "Mi", "Sol", "La"],
      names:     ["1st", "2nd", "3rd", "5th", "6th"],
      functions: ["Home", "Passing", "Color", "Tension", "Color"],
    },
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [68], finger: 2, voiceAudio: V + "f2_Ab.wav", cross: null },
        { pitches: [70], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [72], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [75], finger: 2, voiceAudio: V + "f2_Eb.wav", cross: null },
        { pitches: [77], finger: 1, voiceAudio: V + "f1_F.wav", cross: null },
        { pitches: [80], finger: 2, voiceAudio: V + "f2_Ab.wav", cross: null },
        { pitches: [80], finger: 2, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [77], finger: 1, voiceAudio: V + "f1_F.wav", cross: null },
        { pitches: [75], finger: 2, voiceAudio: V + "f2_Eb.wav", cross: null },
        { pitches: [72], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [70], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [68], finger: 2, voiceAudio: V + "f2_Ab.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [56], finger: 3, voiceAudio: V + "f3_Ab.wav", cross: null },
        { pitches: [58], finger: 2, voiceAudio: V + "f2_Bb.wav", cross: null },
        { pitches: [60], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [63], finger: 2, voiceAudio: V + "f2_Eb.wav", cross: null },
        { pitches: [65], finger: 1, voiceAudio: V + "f1_F.wav", cross: null },
        { pitches: [68], finger: 3, voiceAudio: V + "f3_Ab.wav", cross: null },
        { pitches: [68], finger: 3, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [65], finger: 1, voiceAudio: V + "f1_F.wav", cross: null },
        { pitches: [63], finger: 2, voiceAudio: V + "f2_Eb.wav", cross: null },
        { pitches: [60], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [58], finger: 2, voiceAudio: V + "f2_Bb.wav", cross: null },
        { pitches: [56], finger: 3, voiceAudio: V + "f3_Ab.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [68, 56], fingers: [2, 3], voiceAudio: V + "note_Ab.wav", cross: null },
        { pitches: [70, 58], fingers: [3, 2], voiceAudio: V + "note_Bb.wav", cross: null },
        { pitches: [72, 60], fingers: [1, 1], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [75, 63], fingers: [2, 2], voiceAudio: V + "note_Eb.wav", cross: null },
        { pitches: [77, 65], fingers: [1, 1], voiceAudio: V + "note_F.wav", cross: null },
        { pitches: [80, 68], fingers: [2, 3], voiceAudio: V + "note_Ab.wav", cross: null },
        { pitches: [80, 68], fingers: [2, 3], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [77, 65], fingers: [1, 1], voiceAudio: V + "note_F.wav", cross: null },
        { pitches: [75, 63], fingers: [2, 2], voiceAudio: V + "note_Eb.wav", cross: null },
        { pitches: [72, 60], fingers: [1, 1], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [70, 58], fingers: [3, 2], voiceAudio: V + "note_Bb.wav", cross: null },
        { pitches: [68, 56], fingers: [2, 3], voiceAudio: V + "note_Ab.wav", cross: null },
      ],
    },
  ],
};

// ---------------------------------------------------------------------
// A MAJOR PENTATONIC (anchor: RH root = 69 / A4, LH root = 57 / A3)
// ---------------------------------------------------------------------
const A_MAJOR_PENTATONIC = {
  name: "A Major Pentatonic",
  nameAudio: V + "TODO_A_major_pentatonic.wav",
  info: {
    typeLabel: "Major pentatonic scale",
    description: "The major scale with the 4th and 7th removed — dropping the 4th (D) and 7th (G♯), " +
      "the most tension-heavy notes — leaves the \"no wrong notes\" scale, ubiquitous in blues, " +
      "rock, country, and pop soloing.",
    keyInfo: {
      signature: "3 sharps — F♯, C♯, and G♯",
      relative: "F♯ minor",
      parallel: "A minor",
      genres: ["Blues", "Rock", "Country", "Folk"],
    },
    degrees: {
      solfege:   ["Do", "Re", "Mi", "Sol", "La"],
      names:     ["1st", "2nd", "3rd", "5th", "6th"],
      functions: ["Home", "Passing", "Color", "Tension", "Color"],
    },
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [69], finger: 1, voiceAudio: V + "f1_A.wav", cross: null },
        { pitches: [71], finger: 2, voiceAudio: V + "f2_B.wav", cross: null },
        { pitches: [73], finger: 3, voiceAudio: V + "f3_Cs.wav", cross: null },
        { pitches: [76], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
        { pitches: [78], finger: 2, voiceAudio: V + "f2_Fs.wav", cross: null },
        { pitches: [81], finger: 1, voiceAudio: V + "f1_A.wav", cross: null },
        { pitches: [81], finger: 1, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [78], finger: 2, voiceAudio: V + "f2_Fs.wav", cross: null },
        { pitches: [76], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
        { pitches: [73], finger: 3, voiceAudio: V + "f3_Cs.wav", cross: null },
        { pitches: [71], finger: 2, voiceAudio: V + "f2_B.wav", cross: null },
        { pitches: [69], finger: 1, voiceAudio: V + "f1_A.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [57], finger: 2, voiceAudio: V + "f2_A.wav", cross: null },
        { pitches: [59], finger: 1, voiceAudio: V + "f1_B.wav", cross: null },
        { pitches: [61], finger: 2, voiceAudio: V + "f2_Cs.wav", cross: null },
        { pitches: [64], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
        { pitches: [66], finger: 3, voiceAudio: V + "f3_Fs.wav", cross: null },
        { pitches: [69], finger: 2, voiceAudio: V + "f2_A.wav", cross: null },
        { pitches: [69], finger: 2, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [66], finger: 3, voiceAudio: V + "f3_Fs.wav", cross: null },
        { pitches: [64], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
        { pitches: [61], finger: 2, voiceAudio: V + "f2_Cs.wav", cross: null },
        { pitches: [59], finger: 1, voiceAudio: V + "f1_B.wav", cross: null },
        { pitches: [57], finger: 2, voiceAudio: V + "f2_A.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [69, 57], fingers: [1, 2], voiceAudio: V + "note_A.wav", cross: null },
        { pitches: [71, 59], fingers: [2, 1], voiceAudio: V + "note_B.wav", cross: null },
        { pitches: [73, 61], fingers: [3, 2], voiceAudio: V + "note_Cs.wav", cross: null },
        { pitches: [76, 64], fingers: [1, 1], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [78, 66], fingers: [2, 3], voiceAudio: V + "note_Fs.wav", cross: null },
        { pitches: [81, 69], fingers: [1, 2], voiceAudio: V + "note_A.wav", cross: null },
        { pitches: [81, 69], fingers: [1, 2], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [78, 66], fingers: [2, 3], voiceAudio: V + "note_Fs.wav", cross: null },
        { pitches: [76, 64], fingers: [1, 1], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [73, 61], fingers: [3, 2], voiceAudio: V + "note_Cs.wav", cross: null },
        { pitches: [71, 59], fingers: [2, 1], voiceAudio: V + "note_B.wav", cross: null },
        { pitches: [69, 57], fingers: [1, 2], voiceAudio: V + "note_A.wav", cross: null },
      ],
    },
  ],
};

// ---------------------------------------------------------------------
// Bb MAJOR PENTATONIC (anchor: RH root = 70 / Bb4, LH root = 58 / Bb3)
// ---------------------------------------------------------------------
const B_FLAT_MAJOR_PENTATONIC = {
  name: "Bb Major Pentatonic",
  nameAudio: V + "TODO_Bb_major_pentatonic.wav",
  info: {
    typeLabel: "Major pentatonic scale",
    description: "The major scale with the 4th and 7th removed — dropping the 4th (E♭) and 7th (A), " +
      "the most tension-heavy notes — leaves the \"no wrong notes\" scale, ubiquitous in blues, " +
      "rock, country, and pop soloing.",
    keyInfo: {
      signature: "2 flats — Bb and E♭",
      relative: "G minor",
      parallel: "Bb minor",
      genres: ["Blues", "Rock", "Country", "Folk"],
    },
    degrees: {
      solfege:   ["Do", "Re", "Mi", "Sol", "La"],
      names:     ["1st", "2nd", "3rd", "5th", "6th"],
      functions: ["Home", "Passing", "Color", "Tension", "Color"],
    },
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [70], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [72], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [74], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
        { pitches: [77], finger: 1, voiceAudio: V + "f1_F.wav", cross: null },
        { pitches: [79], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [82], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [82], finger: 3, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [79], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [77], finger: 1, voiceAudio: V + "f1_F.wav", cross: null },
        { pitches: [74], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
        { pitches: [72], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [70], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [58], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [60], finger: 2, voiceAudio: V + "f2_C.wav", cross: null },
        { pitches: [62], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
        { pitches: [65], finger: 2, voiceAudio: V + "f2_F.wav", cross: null },
        { pitches: [67], finger: 1, voiceAudio: V + "f1_G.wav", cross: null },
        { pitches: [70], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [70], finger: 3, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [67], finger: 1, voiceAudio: V + "f1_G.wav", cross: null },
        { pitches: [65], finger: 2, voiceAudio: V + "f2_F.wav", cross: null },
        { pitches: [62], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
        { pitches: [60], finger: 2, voiceAudio: V + "f2_C.wav", cross: null },
        { pitches: [58], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [70, 58], fingers: [3, 3], voiceAudio: V + "note_Bb.wav", cross: null },
        { pitches: [72, 60], fingers: [1, 2], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [74, 62], fingers: [2, 1], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [77, 65], fingers: [1, 2], voiceAudio: V + "note_F.wav", cross: null },
        { pitches: [79, 67], fingers: [2, 1], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [82, 70], fingers: [3, 3], voiceAudio: V + "note_Bb.wav", cross: null },
        { pitches: [82, 70], fingers: [3, 3], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [79, 67], fingers: [2, 1], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [77, 65], fingers: [1, 2], voiceAudio: V + "note_F.wav", cross: null },
        { pitches: [74, 62], fingers: [2, 1], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [72, 60], fingers: [1, 2], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [70, 58], fingers: [3, 3], voiceAudio: V + "note_Bb.wav", cross: null },
      ],
    },
  ],
};

// ---------------------------------------------------------------------
// B MAJOR PENTATONIC (anchor: RH root = 71 / B4, LH root = 59 / B3)
// NOTE: unusual fingering, matches pianoscales.org exactly (cross-checked
// live via WebFetch 2026-07-08). RH uses finger 5 on G# (2nd-to-last
// ascending note) and LH uses finger 5 on C# (2nd ascending note) — both
// combos (f5_Gs.wav, f5_Cs.wav) do NOT exist in voices/ yet (only natural
// note names have finger-5 clips). Logged in missing_audio.txt.
// ---------------------------------------------------------------------
const B_MAJOR_PENTATONIC = {
  name: "B Major Pentatonic",
  nameAudio: V + "TODO_B_major_pentatonic.wav",
  info: {
    typeLabel: "Major pentatonic scale",
    description: "The major scale with the 4th and 7th removed — dropping the 4th (E) and 7th (A♯), " +
      "the most tension-heavy notes — leaves the \"no wrong notes\" scale, ubiquitous in blues, " +
      "rock, country, and pop soloing. Like B major itself, its pentatonic fingering is unusual: " +
      "the right hand's pinky lands on G♯ and the left hand's pinky lands on C♯, per pianoscales.org.",
    keyInfo: {
      signature: "5 sharps — F♯, C♯, G♯, D♯, and A♯",
      relative: "G♯ minor",
      parallel: "B minor",
      genres: ["Blues", "Rock", "Country", "Folk"],
    },
    degrees: {
      solfege:   ["Do", "Re", "Mi", "Sol", "La"],
      names:     ["1st", "2nd", "3rd", "5th", "6th"],
      functions: ["Home", "Passing", "Color", "Tension", "Color"],
    },
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [71], finger: 1, voiceAudio: V + "f1_B.wav", cross: null },
        { pitches: [73], finger: 2, voiceAudio: V + "f2_Cs.wav", cross: null },
        { pitches: [75], finger: 3, voiceAudio: V + "f3_Ds.wav", cross: null },
        { pitches: [78], finger: 4, voiceAudio: V + "f4_Fs.wav", cross: null },
        { pitches: [80], finger: 5, voiceAudio: V + "f5_Gs.wav", cross: null },
        { pitches: [83], finger: 1, voiceAudio: V + "f1_B.wav", cross: null },
        { pitches: [83], finger: 1, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [80], finger: 5, voiceAudio: V + "f5_Gs.wav", cross: null },
        { pitches: [78], finger: 4, voiceAudio: V + "f4_Fs.wav", cross: null },
        { pitches: [75], finger: 3, voiceAudio: V + "f3_Ds.wav", cross: null },
        { pitches: [73], finger: 2, voiceAudio: V + "f2_Cs.wav", cross: null },
        { pitches: [71], finger: 1, voiceAudio: V + "f1_B.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [59], finger: 1, voiceAudio: V + "f1_B.wav", cross: null },
        { pitches: [61], finger: 5, voiceAudio: V + "f5_Cs.wav", cross: null },
        { pitches: [63], finger: 4, voiceAudio: V + "f4_Ds.wav", cross: null },
        { pitches: [66], finger: 3, voiceAudio: V + "f3_Fs.wav", cross: null },
        { pitches: [68], finger: 2, voiceAudio: V + "f2_Gs.wav", cross: null },
        { pitches: [71], finger: 1, voiceAudio: V + "f1_B.wav", cross: null },
        { pitches: [71], finger: 1, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [68], finger: 2, voiceAudio: V + "f2_Gs.wav", cross: null },
        { pitches: [66], finger: 3, voiceAudio: V + "f3_Fs.wav", cross: null },
        { pitches: [63], finger: 4, voiceAudio: V + "f4_Ds.wav", cross: null },
        { pitches: [61], finger: 5, voiceAudio: V + "f5_Cs.wav", cross: null },
        { pitches: [59], finger: 1, voiceAudio: V + "f1_B.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [71, 59], fingers: [1, 1], voiceAudio: V + "note_B.wav", cross: null },
        { pitches: [73, 61], fingers: [2, 5], voiceAudio: V + "note_Cs.wav", cross: null },
        { pitches: [75, 63], fingers: [3, 4], voiceAudio: V + "note_Ds.wav", cross: null },
        { pitches: [78, 66], fingers: [4, 3], voiceAudio: V + "note_Fs.wav", cross: null },
        { pitches: [80, 68], fingers: [5, 2], voiceAudio: V + "note_Gs.wav", cross: null },
        { pitches: [83, 71], fingers: [1, 1], voiceAudio: V + "note_B.wav", cross: null },
        { pitches: [83, 71], fingers: [1, 1], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [80, 68], fingers: [5, 2], voiceAudio: V + "note_Gs.wav", cross: null },
        { pitches: [78, 66], fingers: [4, 3], voiceAudio: V + "note_Fs.wav", cross: null },
        { pitches: [75, 63], fingers: [3, 4], voiceAudio: V + "note_Ds.wav", cross: null },
        { pitches: [73, 61], fingers: [2, 5], voiceAudio: V + "note_Cs.wav", cross: null },
        { pitches: [71, 59], fingers: [1, 1], voiceAudio: V + "note_B.wav", cross: null },
      ],
    },
  ],
};

// ---------------------------------------------------------------------
// Export table — mirrors the SCALES lookup convention in data.js.
// Not wired into data.js's SCALES object; provided for the reviewer to
// merge in manually.
// ---------------------------------------------------------------------
const MAJOR_PENTATONIC_SCALES = {
  "C Major Pentatonic": C_MAJOR_PENTATONIC,
  "Db Major Pentatonic": D_FLAT_MAJOR_PENTATONIC,
  "D Major Pentatonic": D_MAJOR_PENTATONIC,
  "Eb Major Pentatonic": E_FLAT_MAJOR_PENTATONIC,
  "E Major Pentatonic": E_MAJOR_PENTATONIC,
  "F Major Pentatonic": F_MAJOR_PENTATONIC,
  "F# Major Pentatonic": F_SHARP_MAJOR_PENTATONIC,
  "G Major Pentatonic": G_MAJOR_PENTATONIC,
  "Ab Major Pentatonic": A_FLAT_MAJOR_PENTATONIC,
  "A Major Pentatonic": A_MAJOR_PENTATONIC,
  "Bb Major Pentatonic": B_FLAT_MAJOR_PENTATONIC,
  "B Major Pentatonic": B_MAJOR_PENTATONIC,
};
