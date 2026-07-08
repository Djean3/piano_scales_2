// Minor Pentatonic scale data — all 12 keys.
// Same template family as C_MAJOR in data.js: single octave up, repeat the top
// note via "now_backwards" audio, then descend. NOT the 2-octave arpeggio format
// used elsewhere in data.js.
//
// Pitches are MIDI note numbers (60 = middle C). Each key's tonic register
// (RH root MIDI, LH root MIDI) is anchored to that same key's existing
// "{Key} Minor" (natural minor) entry in data.js, so the pentatonic scale sits
// in the same register as the natural minor scale already built for that key.
//
// Scale degrees used: 1, b3, 4, 5, b7 of the natural minor scale (i.e. natural
// minor's own info.pentatonic.indices [0,2,3,4,6] — dropping the 2nd and b6th).
// Note spelling for each key matches the spelling already used by that key's
// existing Natural Minor entry in data.js (not necessarily the enharmonic
// spelling pianoscales.org happens to print) — see minor_pentatonic_review.md
// for the per-key sourcing notes, including the Db (=C#) special case.
//
// cross: null everywhere in this pass (no thumb-crossing cues built yet).
//
// This file is standalone (not yet merged into data.js). If concatenated
// directly into data.js, the "const V" line below is redundant with the one
// already at the top of data.js and can be dropped.

const V = "voices/";

// ---------------------------------------------------------------------------
// C Minor Pentatonic
// Notes: C, Eb, F, G, Bb, (C)
// ---------------------------------------------------------------------------
const C_MINOR_PENTATONIC = {
  name: "C Minor Pentatonic",
  nameAudio: V + "TODO_C_minor_pentatonic.wav",
  info: {
    typeLabel: "Minor pentatonic scale",
    description: "C minor pentatonic is the C natural minor scale with the 2nd (D) and 6th (A♭) " +
      "removed, leaving just five notes — the classic blues/rock/hip-hop lead-soloing scale.",
    keyInfo: {
      signature: "3 flats — Bb, E♭, and A♭",
      relative: "E♭ Major",
      parallel: "C Major",
      genres: ["Blues", "Rock", "R&B", "Hip-Hop"],
    },
    degrees: {
      solfege:   ["Do", "Me", "Fa", "Sol", "Te"],
      names:     ["1st", "b3rd", "4th", "5th", "b7th"],
      functions: ["Home", "Color", "Passing", "Tension", "Color"],
    },
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [60], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [63], finger: 2, voiceAudio: V + "f2_Eb.wav", cross: null },
        { pitches: [65], finger: 3, voiceAudio: V + "f3_F.wav", cross: null },
        { pitches: [67], finger: 1, voiceAudio: V + "f1_G.wav", cross: null },
        { pitches: [70], finger: 2, voiceAudio: V + "f2_Bb.wav", cross: null },
        { pitches: [72], finger: 3, voiceAudio: V + "f3_C.wav", cross: null },
        { pitches: [72], finger: 3, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [70], finger: 2, voiceAudio: V + "f2_Bb.wav", cross: null },
        { pitches: [67], finger: 1, voiceAudio: V + "f1_G.wav", cross: null },
        { pitches: [65], finger: 3, voiceAudio: V + "f3_F.wav", cross: null },
        { pitches: [63], finger: 2, voiceAudio: V + "f2_Eb.wav", cross: null },
        { pitches: [60], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [48], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [51], finger: 3, voiceAudio: V + "f3_Eb.wav", cross: null },
        { pitches: [53], finger: 2, voiceAudio: V + "f2_F.wav", cross: null },
        { pitches: [55], finger: 1, voiceAudio: V + "f1_G.wav", cross: null },
        { pitches: [58], finger: 2, voiceAudio: V + "f2_Bb.wav", cross: null },
        { pitches: [60], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [60], finger: 1, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [58], finger: 2, voiceAudio: V + "f2_Bb.wav", cross: null },
        { pitches: [55], finger: 1, voiceAudio: V + "f1_G.wav", cross: null },
        { pitches: [53], finger: 2, voiceAudio: V + "f2_F.wav", cross: null },
        { pitches: [51], finger: 3, voiceAudio: V + "f3_Eb.wav", cross: null },
        { pitches: [48], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [60, 48], fingers: [1, 1], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [63, 51], fingers: [2, 3], voiceAudio: V + "note_Eb.wav", cross: null },
        { pitches: [65, 53], fingers: [3, 2], voiceAudio: V + "note_F.wav", cross: null },
        { pitches: [67, 55], fingers: [1, 1], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [70, 58], fingers: [2, 2], voiceAudio: V + "note_Bb.wav", cross: null },
        { pitches: [72, 60], fingers: [3, 1], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [72, 60], fingers: [3, 1], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [70, 58], fingers: [2, 2], voiceAudio: V + "note_Bb.wav", cross: null },
        { pitches: [67, 55], fingers: [1, 1], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [65, 53], fingers: [3, 2], voiceAudio: V + "note_F.wav", cross: null },
        { pitches: [63, 51], fingers: [2, 3], voiceAudio: V + "note_Eb.wav", cross: null },
        { pitches: [60, 48], fingers: [1, 1], voiceAudio: V + "note_C.wav", cross: null },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Db Minor Pentatonic (spelled/played as C# minor pentatonic — see review.md;
// matches how data.js's own "Db Minor" entry is internally C#-spelled)
// Notes: C#, E, F#, G#, B, (C#)
// ---------------------------------------------------------------------------
const D_FLAT_MINOR_PENTATONIC = {
  name: "Db Minor Pentatonic",
  nameAudio: V + "TODO_Db_minor_pentatonic.wav",
  info: {
    typeLabel: "Minor pentatonic scale",
    description: "Db minor pentatonic is played as C♯ minor pentatonic (its enharmonic equivalent, " +
      "same as this app's \"Db Minor\" entry) — the natural minor scale with the 2nd (D♯) and 6th " +
      "(A) removed, leaving five notes for blues/rock/hip-hop soloing.",
    keyInfo: {
      signature: "4 sharps (as C♯ minor) — F♯, C♯, G♯, and D♯",
      relative: "E Major",
      parallel: "D♭ Major (via C♯ minor's enharmonic parallel, C♯ Major)",
      genres: ["Blues", "Rock", "R&B", "Hip-Hop"],
    },
    degrees: {
      solfege:   ["Do", "Me", "Fa", "Sol", "Te"],
      names:     ["1st", "b3rd", "4th", "5th", "b7th"],
      functions: ["Home", "Color", "Passing", "Tension", "Color"],
    },
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [61], finger: 2, voiceAudio: V + "f2_Cs.wav", cross: null },
        { pitches: [64], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
        { pitches: [66], finger: 2, voiceAudio: V + "f2_Fs.wav", cross: null },
        { pitches: [68], finger: 3, voiceAudio: V + "f3_Gs.wav", cross: null },
        { pitches: [71], finger: 1, voiceAudio: V + "f1_B.wav", cross: null },
        { pitches: [73], finger: 2, voiceAudio: V + "f2_Cs.wav", cross: null },
        { pitches: [73], finger: 2, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [71], finger: 1, voiceAudio: V + "f1_B.wav", cross: null },
        { pitches: [68], finger: 3, voiceAudio: V + "f3_Gs.wav", cross: null },
        { pitches: [66], finger: 2, voiceAudio: V + "f2_Fs.wav", cross: null },
        { pitches: [64], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
        { pitches: [61], finger: 2, voiceAudio: V + "f2_Cs.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [49], finger: 2, voiceAudio: V + "f2_Cs.wav", cross: null },
        { pitches: [52], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
        { pitches: [54], finger: 3, voiceAudio: V + "f3_Fs.wav", cross: null },
        { pitches: [56], finger: 2, voiceAudio: V + "f2_Gs.wav", cross: null },
        { pitches: [59], finger: 1, voiceAudio: V + "f1_B.wav", cross: null },
        { pitches: [61], finger: 2, voiceAudio: V + "f2_Cs.wav", cross: null },
        { pitches: [61], finger: 2, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [59], finger: 1, voiceAudio: V + "f1_B.wav", cross: null },
        { pitches: [56], finger: 2, voiceAudio: V + "f2_Gs.wav", cross: null },
        { pitches: [54], finger: 3, voiceAudio: V + "f3_Fs.wav", cross: null },
        { pitches: [52], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
        { pitches: [49], finger: 2, voiceAudio: V + "f2_Cs.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [61, 49], fingers: [2, 2], voiceAudio: V + "note_Cs.wav", cross: null },
        { pitches: [64, 52], fingers: [1, 1], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [66, 54], fingers: [2, 3], voiceAudio: V + "note_Fs.wav", cross: null },
        { pitches: [68, 56], fingers: [3, 2], voiceAudio: V + "note_Gs.wav", cross: null },
        { pitches: [71, 59], fingers: [1, 1], voiceAudio: V + "note_B.wav", cross: null },
        { pitches: [73, 61], fingers: [2, 2], voiceAudio: V + "note_Cs.wav", cross: null },
        { pitches: [73, 61], fingers: [2, 2], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [71, 59], fingers: [1, 1], voiceAudio: V + "note_B.wav", cross: null },
        { pitches: [68, 56], fingers: [3, 2], voiceAudio: V + "note_Gs.wav", cross: null },
        { pitches: [66, 54], fingers: [2, 3], voiceAudio: V + "note_Fs.wav", cross: null },
        { pitches: [64, 52], fingers: [1, 1], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [61, 49], fingers: [2, 2], voiceAudio: V + "note_Cs.wav", cross: null },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// D Minor Pentatonic
// Notes: D, F, G, A, C, (D)
// ---------------------------------------------------------------------------
const D_MINOR_PENTATONIC = {
  name: "D Minor Pentatonic",
  nameAudio: V + "TODO_D_minor_pentatonic.wav",
  info: {
    typeLabel: "Minor pentatonic scale",
    description: "D minor pentatonic is the D natural minor scale with the 2nd (E) and 6th (Bb) " +
      "removed, leaving just five notes — the classic blues/rock/hip-hop lead-soloing scale.",
    keyInfo: {
      signature: "1 flat — Bb",
      relative: "F Major",
      parallel: "D Major",
      genres: ["Blues", "Rock", "R&B", "Hip-Hop"],
    },
    degrees: {
      solfege:   ["Do", "Me", "Fa", "Sol", "Te"],
      names:     ["1st", "b3rd", "4th", "5th", "b7th"],
      functions: ["Home", "Color", "Passing", "Tension", "Color"],
    },
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [62], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
        { pitches: [65], finger: 2, voiceAudio: V + "f2_F.wav", cross: null },
        { pitches: [67], finger: 3, voiceAudio: V + "f3_G.wav", cross: null },
        { pitches: [69], finger: 1, voiceAudio: V + "f1_A.wav", cross: null },
        { pitches: [72], finger: 2, voiceAudio: V + "f2_C.wav", cross: null },
        { pitches: [74], finger: 3, voiceAudio: V + "f3_D.wav", cross: null },
        { pitches: [74], finger: 3, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [72], finger: 2, voiceAudio: V + "f2_C.wav", cross: null },
        { pitches: [69], finger: 1, voiceAudio: V + "f1_A.wav", cross: null },
        { pitches: [67], finger: 3, voiceAudio: V + "f3_G.wav", cross: null },
        { pitches: [65], finger: 2, voiceAudio: V + "f2_F.wav", cross: null },
        { pitches: [62], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [50], finger: 3, voiceAudio: V + "f3_D.wav", cross: null },
        { pitches: [53], finger: 2, voiceAudio: V + "f2_F.wav", cross: null },
        { pitches: [55], finger: 1, voiceAudio: V + "f1_G.wav", cross: null },
        { pitches: [57], finger: 3, voiceAudio: V + "f3_A.wav", cross: null },
        { pitches: [60], finger: 2, voiceAudio: V + "f2_C.wav", cross: null },
        { pitches: [62], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
        { pitches: [62], finger: 1, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [60], finger: 2, voiceAudio: V + "f2_C.wav", cross: null },
        { pitches: [57], finger: 3, voiceAudio: V + "f3_A.wav", cross: null },
        { pitches: [55], finger: 1, voiceAudio: V + "f1_G.wav", cross: null },
        { pitches: [53], finger: 2, voiceAudio: V + "f2_F.wav", cross: null },
        { pitches: [50], finger: 3, voiceAudio: V + "f3_D.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [62, 50], fingers: [1, 3], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [65, 53], fingers: [2, 2], voiceAudio: V + "note_F.wav", cross: null },
        { pitches: [67, 55], fingers: [3, 1], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [69, 57], fingers: [1, 3], voiceAudio: V + "note_A.wav", cross: null },
        { pitches: [72, 60], fingers: [2, 2], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [74, 62], fingers: [3, 1], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [74, 62], fingers: [3, 1], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [72, 60], fingers: [2, 2], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [69, 57], fingers: [1, 3], voiceAudio: V + "note_A.wav", cross: null },
        { pitches: [67, 55], fingers: [3, 1], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [65, 53], fingers: [2, 2], voiceAudio: V + "note_F.wav", cross: null },
        { pitches: [62, 50], fingers: [1, 3], voiceAudio: V + "note_D.wav", cross: null },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Eb Minor Pentatonic
// Notes: Eb, Gb, Ab, Bb, Db, (Eb)
// ---------------------------------------------------------------------------
const E_FLAT_MINOR_PENTATONIC = {
  name: "Eb Minor Pentatonic",
  nameAudio: V + "TODO_Eb_minor_pentatonic.wav",
  info: {
    typeLabel: "Minor pentatonic scale",
    description: "Eb minor pentatonic is the E♭ natural minor scale with the 2nd (F) and 6th (C♭) " +
      "removed, leaving just five notes — the classic blues/rock/hip-hop lead-soloing scale.",
    keyInfo: {
      signature: "6 flats — Bb, E♭, A♭, D♭, G♭, and C♭",
      relative: "G♭ Major",
      parallel: "E♭ Major",
      genres: ["Blues", "Rock", "R&B", "Hip-Hop"],
    },
    degrees: {
      solfege:   ["Do", "Me", "Fa", "Sol", "Te"],
      names:     ["1st", "b3rd", "4th", "5th", "b7th"],
      functions: ["Home", "Color", "Passing", "Tension", "Color"],
    },
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [63], finger: 1, voiceAudio: V + "f1_Eb.wav", cross: null },
        { pitches: [66], finger: 2, voiceAudio: V + "f2_Gb.wav", cross: null },
        { pitches: [68], finger: 3, voiceAudio: V + "f3_Ab.wav", cross: null },
        { pitches: [70], finger: 1, voiceAudio: V + "f1_Bb.wav", cross: null },
        { pitches: [73], finger: 2, voiceAudio: V + "f2_Db.wav", cross: null },
        { pitches: [75], finger: 3, voiceAudio: V + "f3_Eb.wav", cross: null },
        { pitches: [75], finger: 3, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [73], finger: 2, voiceAudio: V + "f2_Db.wav", cross: null },
        { pitches: [70], finger: 1, voiceAudio: V + "f1_Bb.wav", cross: null },
        { pitches: [68], finger: 3, voiceAudio: V + "f3_Ab.wav", cross: null },
        { pitches: [66], finger: 2, voiceAudio: V + "f2_Gb.wav", cross: null },
        { pitches: [63], finger: 1, voiceAudio: V + "f1_Eb.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [51], finger: 3, voiceAudio: V + "f3_Eb.wav", cross: null },
        { pitches: [54], finger: 2, voiceAudio: V + "f2_Gb.wav", cross: null },
        { pitches: [56], finger: 1, voiceAudio: V + "f1_Ab.wav", cross: null },
        { pitches: [58], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [61], finger: 2, voiceAudio: V + "f2_Db.wav", cross: null },
        { pitches: [63], finger: 1, voiceAudio: V + "f1_Eb.wav", cross: null },
        { pitches: [63], finger: 1, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [61], finger: 2, voiceAudio: V + "f2_Db.wav", cross: null },
        { pitches: [58], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [56], finger: 1, voiceAudio: V + "f1_Ab.wav", cross: null },
        { pitches: [54], finger: 2, voiceAudio: V + "f2_Gb.wav", cross: null },
        { pitches: [51], finger: 3, voiceAudio: V + "f3_Eb.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [63, 51], fingers: [1, 3], voiceAudio: V + "note_Eb.wav", cross: null },
        { pitches: [66, 54], fingers: [2, 2], voiceAudio: V + "note_Gb.wav", cross: null },
        { pitches: [68, 56], fingers: [3, 1], voiceAudio: V + "note_Ab.wav", cross: null },
        { pitches: [70, 58], fingers: [1, 3], voiceAudio: V + "note_Bb.wav", cross: null },
        { pitches: [73, 61], fingers: [2, 2], voiceAudio: V + "note_Db.wav", cross: null },
        { pitches: [75, 63], fingers: [3, 1], voiceAudio: V + "note_Eb.wav", cross: null },
        { pitches: [75, 63], fingers: [3, 1], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [73, 61], fingers: [2, 2], voiceAudio: V + "note_Db.wav", cross: null },
        { pitches: [70, 58], fingers: [1, 3], voiceAudio: V + "note_Bb.wav", cross: null },
        { pitches: [68, 56], fingers: [3, 1], voiceAudio: V + "note_Ab.wav", cross: null },
        { pitches: [66, 54], fingers: [2, 2], voiceAudio: V + "note_Gb.wav", cross: null },
        { pitches: [63, 51], fingers: [1, 3], voiceAudio: V + "note_Eb.wav", cross: null },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// E Minor Pentatonic
// Notes: E, G, A, B, D, (E)
// ---------------------------------------------------------------------------
const E_MINOR_PENTATONIC = {
  name: "E Minor Pentatonic",
  nameAudio: V + "TODO_E_minor_pentatonic.wav",
  info: {
    typeLabel: "Minor pentatonic scale",
    description: "E minor pentatonic is the E natural minor scale with the 2nd (F♯) and 6th (C) " +
      "removed, leaving just five notes — the classic blues/rock/hip-hop lead-soloing scale.",
    keyInfo: {
      signature: "1 sharp — F♯",
      relative: "G Major",
      parallel: "E Major",
      genres: ["Blues", "Rock", "R&B", "Hip-Hop"],
    },
    degrees: {
      solfege:   ["Do", "Me", "Fa", "Sol", "Te"],
      names:     ["1st", "b3rd", "4th", "5th", "b7th"],
      functions: ["Home", "Color", "Passing", "Tension", "Color"],
    },
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [64], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
        { pitches: [67], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [69], finger: 3, voiceAudio: V + "f3_A.wav", cross: null },
        { pitches: [71], finger: 1, voiceAudio: V + "f1_B.wav", cross: null },
        { pitches: [74], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
        { pitches: [76], finger: 3, voiceAudio: V + "f3_E.wav", cross: null },
        { pitches: [76], finger: 3, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [74], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
        { pitches: [71], finger: 1, voiceAudio: V + "f1_B.wav", cross: null },
        { pitches: [69], finger: 3, voiceAudio: V + "f3_A.wav", cross: null },
        { pitches: [67], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [64], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [52], finger: 3, voiceAudio: V + "f3_E.wav", cross: null },
        { pitches: [55], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [57], finger: 1, voiceAudio: V + "f1_A.wav", cross: null },
        { pitches: [59], finger: 3, voiceAudio: V + "f3_B.wav", cross: null },
        { pitches: [62], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
        { pitches: [64], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
        { pitches: [64], finger: 1, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [62], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
        { pitches: [59], finger: 3, voiceAudio: V + "f3_B.wav", cross: null },
        { pitches: [57], finger: 1, voiceAudio: V + "f1_A.wav", cross: null },
        { pitches: [55], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [52], finger: 3, voiceAudio: V + "f3_E.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [64, 52], fingers: [1, 3], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [67, 55], fingers: [2, 2], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [69, 57], fingers: [3, 1], voiceAudio: V + "note_A.wav", cross: null },
        { pitches: [71, 59], fingers: [1, 3], voiceAudio: V + "note_B.wav", cross: null },
        { pitches: [74, 62], fingers: [2, 2], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [76, 64], fingers: [3, 1], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [76, 64], fingers: [3, 1], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [74, 62], fingers: [2, 2], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [71, 59], fingers: [1, 3], voiceAudio: V + "note_B.wav", cross: null },
        { pitches: [69, 57], fingers: [3, 1], voiceAudio: V + "note_A.wav", cross: null },
        { pitches: [67, 55], fingers: [2, 2], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [64, 52], fingers: [1, 3], voiceAudio: V + "note_E.wav", cross: null },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// F Minor Pentatonic
// Notes: F, Ab, Bb, C, Eb, (F)
// ---------------------------------------------------------------------------
const F_MINOR_PENTATONIC = {
  name: "F Minor Pentatonic",
  nameAudio: V + "TODO_F_minor_pentatonic.wav",
  info: {
    typeLabel: "Minor pentatonic scale",
    description: "F minor pentatonic is the F natural minor scale with the 2nd (G) and 6th (D♭) " +
      "removed, leaving just five notes — the classic blues/rock/hip-hop lead-soloing scale.",
    keyInfo: {
      signature: "4 flats — Bb, E♭, A♭, and D♭",
      relative: "A♭ Major",
      parallel: "F Major",
      genres: ["Blues", "Rock", "R&B", "Hip-Hop"],
    },
    degrees: {
      solfege:   ["Do", "Me", "Fa", "Sol", "Te"],
      names:     ["1st", "b3rd", "4th", "5th", "b7th"],
      functions: ["Home", "Color", "Passing", "Tension", "Color"],
    },
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [65], finger: 1, voiceAudio: V + "f1_F.wav", cross: null },
        { pitches: [68], finger: 2, voiceAudio: V + "f2_Ab.wav", cross: null },
        { pitches: [70], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [72], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [75], finger: 2, voiceAudio: V + "f2_Eb.wav", cross: null },
        { pitches: [77], finger: 3, voiceAudio: V + "f3_F.wav", cross: null },
        { pitches: [77], finger: 3, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [75], finger: 2, voiceAudio: V + "f2_Eb.wav", cross: null },
        { pitches: [72], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [70], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [68], finger: 2, voiceAudio: V + "f2_Ab.wav", cross: null },
        { pitches: [65], finger: 1, voiceAudio: V + "f1_F.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [53], finger: 4, voiceAudio: V + "f4_F.wav", cross: null },
        { pitches: [56], finger: 3, voiceAudio: V + "f3_Ab.wav", cross: null },
        { pitches: [58], finger: 2, voiceAudio: V + "f2_Bb.wav", cross: null },
        { pitches: [60], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [63], finger: 2, voiceAudio: V + "f2_Eb.wav", cross: null },
        { pitches: [65], finger: 1, voiceAudio: V + "f1_F.wav", cross: null },
        { pitches: [65], finger: 1, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [63], finger: 2, voiceAudio: V + "f2_Eb.wav", cross: null },
        { pitches: [60], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [58], finger: 2, voiceAudio: V + "f2_Bb.wav", cross: null },
        { pitches: [56], finger: 3, voiceAudio: V + "f3_Ab.wav", cross: null },
        { pitches: [53], finger: 4, voiceAudio: V + "f4_F.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [65, 53], fingers: [1, 4], voiceAudio: V + "note_F.wav", cross: null },
        { pitches: [68, 56], fingers: [2, 3], voiceAudio: V + "note_Ab.wav", cross: null },
        { pitches: [70, 58], fingers: [3, 2], voiceAudio: V + "note_Bb.wav", cross: null },
        { pitches: [72, 60], fingers: [1, 1], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [75, 63], fingers: [2, 2], voiceAudio: V + "note_Eb.wav", cross: null },
        { pitches: [77, 65], fingers: [3, 1], voiceAudio: V + "note_F.wav", cross: null },
        { pitches: [77, 65], fingers: [3, 1], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [75, 63], fingers: [2, 2], voiceAudio: V + "note_Eb.wav", cross: null },
        { pitches: [72, 60], fingers: [1, 1], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [70, 58], fingers: [3, 2], voiceAudio: V + "note_Bb.wav", cross: null },
        { pitches: [68, 56], fingers: [2, 3], voiceAudio: V + "note_Ab.wav", cross: null },
        { pitches: [65, 53], fingers: [1, 4], voiceAudio: V + "note_F.wav", cross: null },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// F# Minor Pentatonic
// Notes: F#, A, B, C#, E, (F#)
// ---------------------------------------------------------------------------
const F_SHARP_MINOR_PENTATONIC = {
  name: "F# Minor Pentatonic",
  nameAudio: V + "TODO_FSharp_minor_pentatonic.wav",
  info: {
    typeLabel: "Minor pentatonic scale",
    description: "F# minor pentatonic is the F♯ natural minor scale with the 2nd (G♯) and 6th (D) " +
      "removed, leaving just five notes — the classic blues/rock/hip-hop lead-soloing scale.",
    keyInfo: {
      signature: "3 sharps — F♯, C♯, and G♯",
      relative: "A Major",
      parallel: "F♯ Major",
      genres: ["Blues", "Rock", "R&B", "Hip-Hop"],
    },
    degrees: {
      solfege:   ["Do", "Me", "Fa", "Sol", "Te"],
      names:     ["1st", "b3rd", "4th", "5th", "b7th"],
      functions: ["Home", "Color", "Passing", "Tension", "Color"],
    },
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [66], finger: 2, voiceAudio: V + "f2_Fs.wav", cross: null },
        { pitches: [69], finger: 1, voiceAudio: V + "f1_A.wav", cross: null },
        { pitches: [71], finger: 2, voiceAudio: V + "f2_B.wav", cross: null },
        { pitches: [73], finger: 3, voiceAudio: V + "f3_Cs.wav", cross: null },
        { pitches: [76], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
        { pitches: [78], finger: 2, voiceAudio: V + "f2_Fs.wav", cross: null },
        { pitches: [78], finger: 2, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [76], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
        { pitches: [73], finger: 3, voiceAudio: V + "f3_Cs.wav", cross: null },
        { pitches: [71], finger: 2, voiceAudio: V + "f2_B.wav", cross: null },
        { pitches: [69], finger: 1, voiceAudio: V + "f1_A.wav", cross: null },
        { pitches: [66], finger: 2, voiceAudio: V + "f2_Fs.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [54], finger: 3, voiceAudio: V + "f3_Fs.wav", cross: null },
        { pitches: [57], finger: 2, voiceAudio: V + "f2_A.wav", cross: null },
        { pitches: [59], finger: 1, voiceAudio: V + "f1_B.wav", cross: null },
        { pitches: [61], finger: 2, voiceAudio: V + "f2_Cs.wav", cross: null },
        { pitches: [64], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
        { pitches: [66], finger: 3, voiceAudio: V + "f3_Fs.wav", cross: null },
        { pitches: [66], finger: 3, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [64], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
        { pitches: [61], finger: 2, voiceAudio: V + "f2_Cs.wav", cross: null },
        { pitches: [59], finger: 1, voiceAudio: V + "f1_B.wav", cross: null },
        { pitches: [57], finger: 2, voiceAudio: V + "f2_A.wav", cross: null },
        { pitches: [54], finger: 3, voiceAudio: V + "f3_Fs.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [66, 54], fingers: [2, 3], voiceAudio: V + "note_Fs.wav", cross: null },
        { pitches: [69, 57], fingers: [1, 2], voiceAudio: V + "note_A.wav", cross: null },
        { pitches: [71, 59], fingers: [2, 1], voiceAudio: V + "note_B.wav", cross: null },
        { pitches: [73, 61], fingers: [3, 2], voiceAudio: V + "note_Cs.wav", cross: null },
        { pitches: [76, 64], fingers: [1, 1], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [78, 66], fingers: [2, 3], voiceAudio: V + "note_Fs.wav", cross: null },
        { pitches: [78, 66], fingers: [2, 3], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [76, 64], fingers: [1, 1], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [73, 61], fingers: [3, 2], voiceAudio: V + "note_Cs.wav", cross: null },
        { pitches: [71, 59], fingers: [2, 1], voiceAudio: V + "note_B.wav", cross: null },
        { pitches: [69, 57], fingers: [1, 2], voiceAudio: V + "note_A.wav", cross: null },
        { pitches: [66, 54], fingers: [2, 3], voiceAudio: V + "note_Fs.wav", cross: null },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// G Minor Pentatonic
// Notes: G, Bb, C, D, F, (G)
// ---------------------------------------------------------------------------
const G_MINOR_PENTATONIC = {
  name: "G Minor Pentatonic",
  nameAudio: V + "TODO_G_minor_pentatonic.wav",
  info: {
    typeLabel: "Minor pentatonic scale",
    description: "G minor pentatonic is the G natural minor scale with the 2nd (A) and 6th (E♭) " +
      "removed, leaving just five notes — the classic blues/rock/hip-hop lead-soloing scale.",
    keyInfo: {
      signature: "2 flats — Bb and E♭",
      relative: "Bb Major",
      parallel: "G Major",
      genres: ["Blues", "Rock", "R&B", "Hip-Hop"],
    },
    degrees: {
      solfege:   ["Do", "Me", "Fa", "Sol", "Te"],
      names:     ["1st", "b3rd", "4th", "5th", "b7th"],
      functions: ["Home", "Color", "Passing", "Tension", "Color"],
    },
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [67], finger: 1, voiceAudio: V + "f1_G.wav", cross: null },
        { pitches: [70], finger: 2, voiceAudio: V + "f2_Bb.wav", cross: null },
        { pitches: [72], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [74], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
        { pitches: [77], finger: 3, voiceAudio: V + "f3_F.wav", cross: null },
        { pitches: [79], finger: 1, voiceAudio: V + "f1_G.wav", cross: null },
        { pitches: [79], finger: 1, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [77], finger: 3, voiceAudio: V + "f3_F.wav", cross: null },
        { pitches: [74], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
        { pitches: [72], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [70], finger: 2, voiceAudio: V + "f2_Bb.wav", cross: null },
        { pitches: [67], finger: 1, voiceAudio: V + "f1_G.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [55], finger: 1, voiceAudio: V + "f1_G.wav", cross: null },
        { pitches: [58], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [60], finger: 2, voiceAudio: V + "f2_C.wav", cross: null },
        { pitches: [62], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
        { pitches: [65], finger: 2, voiceAudio: V + "f2_F.wav", cross: null },
        { pitches: [67], finger: 1, voiceAudio: V + "f1_G.wav", cross: null },
        { pitches: [67], finger: 1, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [65], finger: 2, voiceAudio: V + "f2_F.wav", cross: null },
        { pitches: [62], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
        { pitches: [60], finger: 2, voiceAudio: V + "f2_C.wav", cross: null },
        { pitches: [58], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [55], finger: 1, voiceAudio: V + "f1_G.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [67, 55], fingers: [1, 1], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [70, 58], fingers: [2, 3], voiceAudio: V + "note_Bb.wav", cross: null },
        { pitches: [72, 60], fingers: [1, 2], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [74, 62], fingers: [2, 1], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [77, 65], fingers: [3, 2], voiceAudio: V + "note_F.wav", cross: null },
        { pitches: [79, 67], fingers: [1, 1], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [79, 67], fingers: [1, 1], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [77, 65], fingers: [3, 2], voiceAudio: V + "note_F.wav", cross: null },
        { pitches: [74, 62], fingers: [2, 1], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [72, 60], fingers: [1, 2], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [70, 58], fingers: [2, 3], voiceAudio: V + "note_Bb.wav", cross: null },
        { pitches: [67, 55], fingers: [1, 1], voiceAudio: V + "note_G.wav", cross: null },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Ab Minor Pentatonic (LOW CONFIDENCE on fingering only — see review.md)
// Notes: Ab, Cb, Db, Eb, Gb, (Ab)
// Requires audio not yet recorded: f5_Ab.wav, f5_Db.wav (logged in missing_audio.txt)
// ---------------------------------------------------------------------------
const A_FLAT_MINOR_PENTATONIC = {
  name: "Ab Minor Pentatonic",
  nameAudio: V + "TODO_Ab_minor_pentatonic.wav",
  info: {
    typeLabel: "Minor pentatonic scale",
    description: "Ab minor pentatonic is the A♭ natural minor scale with the 2nd (Bb) and 6th (F♭) " +
      "removed, leaving just five notes — the classic blues/rock/hip-hop lead-soloing scale. " +
      "pianoscales.org's own fingering for this key is unusually wide (uses the 5th finger going " +
      "up to the octave on both hands) — see review notes.",
    keyInfo: {
      signature: "7 flats — Bb, E♭, A♭, D♭, G♭, C♭, and F♭",
      relative: "C♭ Major",
      parallel: "A♭ Major",
      genres: ["Blues", "Rock", "R&B", "Hip-Hop"],
    },
    degrees: {
      solfege:   ["Do", "Me", "Fa", "Sol", "Te"],
      names:     ["1st", "b3rd", "4th", "5th", "b7th"],
      functions: ["Home", "Color", "Passing", "Tension", "Color"],
    },
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [68], finger: 2, voiceAudio: V + "f2_Ab.wav", cross: null },
        { pitches: [71], finger: 1, voiceAudio: V + "f1_Cb.wav", cross: null },
        { pitches: [73], finger: 2, voiceAudio: V + "f2_Db.wav", cross: null },
        { pitches: [75], finger: 3, voiceAudio: V + "f3_Eb.wav", cross: null },
        { pitches: [78], finger: 4, voiceAudio: V + "f4_Gb.wav", cross: null },
        { pitches: [80], finger: 5, voiceAudio: V + "f5_Ab.wav", cross: null },
        { pitches: [80], finger: 5, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [78], finger: 4, voiceAudio: V + "f4_Gb.wav", cross: null },
        { pitches: [75], finger: 3, voiceAudio: V + "f3_Eb.wav", cross: null },
        { pitches: [73], finger: 2, voiceAudio: V + "f2_Db.wav", cross: null },
        { pitches: [71], finger: 1, voiceAudio: V + "f1_Cb.wav", cross: null },
        { pitches: [68], finger: 2, voiceAudio: V + "f2_Ab.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [56], finger: 2, voiceAudio: V + "f2_Ab.wav", cross: null },
        { pitches: [59], finger: 1, voiceAudio: V + "f1_Cb.wav", cross: null },
        { pitches: [61], finger: 5, voiceAudio: V + "f5_Db.wav", cross: null },
        { pitches: [63], finger: 4, voiceAudio: V + "f4_Eb.wav", cross: null },
        { pitches: [66], finger: 3, voiceAudio: V + "f3_Gb.wav", cross: null },
        { pitches: [68], finger: 2, voiceAudio: V + "f2_Ab.wav", cross: null },
        { pitches: [68], finger: 2, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [66], finger: 3, voiceAudio: V + "f3_Gb.wav", cross: null },
        { pitches: [63], finger: 4, voiceAudio: V + "f4_Eb.wav", cross: null },
        { pitches: [61], finger: 5, voiceAudio: V + "f5_Db.wav", cross: null },
        { pitches: [59], finger: 1, voiceAudio: V + "f1_Cb.wav", cross: null },
        { pitches: [56], finger: 2, voiceAudio: V + "f2_Ab.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [68, 56], fingers: [2, 2], voiceAudio: V + "note_Ab.wav", cross: null },
        { pitches: [71, 59], fingers: [1, 1], voiceAudio: V + "note_Cb.wav", cross: null },
        { pitches: [73, 61], fingers: [2, 5], voiceAudio: V + "note_Db.wav", cross: null },
        { pitches: [75, 63], fingers: [3, 4], voiceAudio: V + "note_Eb.wav", cross: null },
        { pitches: [78, 66], fingers: [4, 3], voiceAudio: V + "note_Gb.wav", cross: null },
        { pitches: [80, 68], fingers: [5, 2], voiceAudio: V + "note_Ab.wav", cross: null },
        { pitches: [80, 68], fingers: [5, 2], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [78, 66], fingers: [4, 3], voiceAudio: V + "note_Gb.wav", cross: null },
        { pitches: [75, 63], fingers: [3, 4], voiceAudio: V + "note_Eb.wav", cross: null },
        { pitches: [73, 61], fingers: [2, 5], voiceAudio: V + "note_Db.wav", cross: null },
        { pitches: [71, 59], fingers: [1, 1], voiceAudio: V + "note_Cb.wav", cross: null },
        { pitches: [68, 56], fingers: [2, 2], voiceAudio: V + "note_Ab.wav", cross: null },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// A Minor Pentatonic
// Notes: A, C, D, E, G, (A)
// ---------------------------------------------------------------------------
const A_MINOR_PENTATONIC = {
  name: "A Minor Pentatonic",
  nameAudio: V + "TODO_A_minor_pentatonic.wav",
  info: {
    typeLabel: "Minor pentatonic scale",
    description: "A minor pentatonic is the A natural minor scale with the 2nd (B) and 6th (F) " +
      "removed, leaving just five notes — the classic blues/rock/hip-hop lead-soloing scale, and " +
      "the most commonly taught pentatonic key since it uses only the white keys.",
    keyInfo: {
      signature: "No sharps or flats",
      relative: "C Major",
      parallel: "A Major",
      genres: ["Blues", "Rock", "R&B", "Hip-Hop"],
    },
    degrees: {
      solfege:   ["Do", "Me", "Fa", "Sol", "Te"],
      names:     ["1st", "b3rd", "4th", "5th", "b7th"],
      functions: ["Home", "Color", "Passing", "Tension", "Color"],
    },
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [69], finger: 1, voiceAudio: V + "f1_A.wav", cross: null },
        { pitches: [72], finger: 2, voiceAudio: V + "f2_C.wav", cross: null },
        { pitches: [74], finger: 3, voiceAudio: V + "f3_D.wav", cross: null },
        { pitches: [76], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
        { pitches: [79], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [81], finger: 3, voiceAudio: V + "f3_A.wav", cross: null },
        { pitches: [81], finger: 3, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [79], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [76], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
        { pitches: [74], finger: 3, voiceAudio: V + "f3_D.wav", cross: null },
        { pitches: [72], finger: 2, voiceAudio: V + "f2_C.wav", cross: null },
        { pitches: [69], finger: 1, voiceAudio: V + "f1_A.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [57], finger: 3, voiceAudio: V + "f3_A.wav", cross: null },
        { pitches: [60], finger: 2, voiceAudio: V + "f2_C.wav", cross: null },
        { pitches: [62], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
        { pitches: [64], finger: 3, voiceAudio: V + "f3_E.wav", cross: null },
        { pitches: [67], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [69], finger: 1, voiceAudio: V + "f1_A.wav", cross: null },
        { pitches: [69], finger: 1, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [67], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [64], finger: 3, voiceAudio: V + "f3_E.wav", cross: null },
        { pitches: [62], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
        { pitches: [60], finger: 2, voiceAudio: V + "f2_C.wav", cross: null },
        { pitches: [57], finger: 3, voiceAudio: V + "f3_A.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [69, 57], fingers: [1, 3], voiceAudio: V + "note_A.wav", cross: null },
        { pitches: [72, 60], fingers: [2, 2], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [74, 62], fingers: [3, 1], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [76, 64], fingers: [1, 3], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [79, 67], fingers: [2, 2], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [81, 69], fingers: [3, 1], voiceAudio: V + "note_A.wav", cross: null },
        { pitches: [81, 69], fingers: [3, 1], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [79, 67], fingers: [2, 2], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [76, 64], fingers: [1, 3], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [74, 62], fingers: [3, 1], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [72, 60], fingers: [2, 2], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [69, 57], fingers: [1, 3], voiceAudio: V + "note_A.wav", cross: null },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Bb Minor Pentatonic
// Notes: Bb, Db, Eb, F, Ab, (Bb)
// ---------------------------------------------------------------------------
const B_FLAT_MINOR_PENTATONIC = {
  name: "Bb Minor Pentatonic",
  nameAudio: V + "TODO_Bb_minor_pentatonic.wav",
  info: {
    typeLabel: "Minor pentatonic scale",
    description: "Bb minor pentatonic is the Bb natural minor scale with the 2nd (C) and 6th (G♭) " +
      "removed, leaving just five notes — the classic blues/rock/hip-hop lead-soloing scale.",
    keyInfo: {
      signature: "5 flats — Bb, E♭, A♭, D♭, and G♭",
      relative: "D♭ Major",
      parallel: "Bb Major",
      genres: ["Blues", "Rock", "R&B", "Hip-Hop"],
    },
    degrees: {
      solfege:   ["Do", "Me", "Fa", "Sol", "Te"],
      names:     ["1st", "b3rd", "4th", "5th", "b7th"],
      functions: ["Home", "Color", "Passing", "Tension", "Color"],
    },
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [70], finger: 2, voiceAudio: V + "f2_Bb.wav", cross: null },
        { pitches: [73], finger: 3, voiceAudio: V + "f3_Db.wav", cross: null },
        { pitches: [75], finger: 4, voiceAudio: V + "f4_Eb.wav", cross: null },
        { pitches: [77], finger: 1, voiceAudio: V + "f1_F.wav", cross: null },
        { pitches: [80], finger: 2, voiceAudio: V + "f2_Ab.wav", cross: null },
        { pitches: [82], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [82], finger: 3, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [80], finger: 2, voiceAudio: V + "f2_Ab.wav", cross: null },
        { pitches: [77], finger: 1, voiceAudio: V + "f1_F.wav", cross: null },
        { pitches: [75], finger: 4, voiceAudio: V + "f4_Eb.wav", cross: null },
        { pitches: [73], finger: 3, voiceAudio: V + "f3_Db.wav", cross: null },
        { pitches: [70], finger: 2, voiceAudio: V + "f2_Bb.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [58], finger: 4, voiceAudio: V + "f4_Bb.wav", cross: null },
        { pitches: [61], finger: 3, voiceAudio: V + "f3_Db.wav", cross: null },
        { pitches: [63], finger: 2, voiceAudio: V + "f2_Eb.wav", cross: null },
        { pitches: [65], finger: 1, voiceAudio: V + "f1_F.wav", cross: null },
        { pitches: [68], finger: 4, voiceAudio: V + "f4_Ab.wav", cross: null },
        { pitches: [70], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [70], finger: 3, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [68], finger: 4, voiceAudio: V + "f4_Ab.wav", cross: null },
        { pitches: [65], finger: 1, voiceAudio: V + "f1_F.wav", cross: null },
        { pitches: [63], finger: 2, voiceAudio: V + "f2_Eb.wav", cross: null },
        { pitches: [61], finger: 3, voiceAudio: V + "f3_Db.wav", cross: null },
        { pitches: [58], finger: 4, voiceAudio: V + "f4_Bb.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [70, 58], fingers: [2, 4], voiceAudio: V + "note_Bb.wav", cross: null },
        { pitches: [73, 61], fingers: [3, 3], voiceAudio: V + "note_Db.wav", cross: null },
        { pitches: [75, 63], fingers: [4, 2], voiceAudio: V + "note_Eb.wav", cross: null },
        { pitches: [77, 65], fingers: [1, 1], voiceAudio: V + "note_F.wav", cross: null },
        { pitches: [80, 68], fingers: [2, 4], voiceAudio: V + "note_Ab.wav", cross: null },
        { pitches: [82, 70], fingers: [3, 3], voiceAudio: V + "note_Bb.wav", cross: null },
        { pitches: [82, 70], fingers: [3, 3], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [80, 68], fingers: [2, 4], voiceAudio: V + "note_Ab.wav", cross: null },
        { pitches: [77, 65], fingers: [1, 1], voiceAudio: V + "note_F.wav", cross: null },
        { pitches: [75, 63], fingers: [4, 2], voiceAudio: V + "note_Eb.wav", cross: null },
        { pitches: [73, 61], fingers: [3, 3], voiceAudio: V + "note_Db.wav", cross: null },
        { pitches: [70, 58], fingers: [2, 4], voiceAudio: V + "note_Bb.wav", cross: null },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// B Minor Pentatonic
// Notes: B, D, E, F#, A, (B)
// ---------------------------------------------------------------------------
const B_MINOR_PENTATONIC = {
  name: "B Minor Pentatonic",
  nameAudio: V + "TODO_B_minor_pentatonic.wav",
  info: {
    typeLabel: "Minor pentatonic scale",
    description: "B minor pentatonic is the B natural minor scale with the 2nd (C♯) and 6th (G) " +
      "removed, leaving just five notes — the classic blues/rock/hip-hop lead-soloing scale.",
    keyInfo: {
      signature: "2 sharps — F♯ and C♯",
      relative: "D Major",
      parallel: "B Major",
      genres: ["Blues", "Rock", "R&B", "Hip-Hop"],
    },
    degrees: {
      solfege:   ["Do", "Me", "Fa", "Sol", "Te"],
      names:     ["1st", "b3rd", "4th", "5th", "b7th"],
      functions: ["Home", "Color", "Passing", "Tension", "Color"],
    },
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [71], finger: 2, voiceAudio: V + "f2_B.wav", cross: null },
        { pitches: [74], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
        { pitches: [76], finger: 2, voiceAudio: V + "f2_E.wav", cross: null },
        { pitches: [78], finger: 3, voiceAudio: V + "f3_Fs.wav", cross: null },
        { pitches: [81], finger: 1, voiceAudio: V + "f1_A.wav", cross: null },
        { pitches: [83], finger: 2, voiceAudio: V + "f2_B.wav", cross: null },
        { pitches: [83], finger: 2, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [81], finger: 1, voiceAudio: V + "f1_A.wav", cross: null },
        { pitches: [78], finger: 3, voiceAudio: V + "f3_Fs.wav", cross: null },
        { pitches: [76], finger: 2, voiceAudio: V + "f2_E.wav", cross: null },
        { pitches: [74], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
        { pitches: [71], finger: 2, voiceAudio: V + "f2_B.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [59], finger: 3, voiceAudio: V + "f3_B.wav", cross: null },
        { pitches: [62], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
        { pitches: [64], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
        { pitches: [66], finger: 3, voiceAudio: V + "f3_Fs.wav", cross: null },
        { pitches: [69], finger: 2, voiceAudio: V + "f2_A.wav", cross: null },
        { pitches: [71], finger: 1, voiceAudio: V + "f1_B.wav", cross: null },
        { pitches: [71], finger: 1, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [69], finger: 2, voiceAudio: V + "f2_A.wav", cross: null },
        { pitches: [66], finger: 3, voiceAudio: V + "f3_Fs.wav", cross: null },
        { pitches: [64], finger: 1, voiceAudio: V + "f1_E.wav", cross: null },
        { pitches: [62], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
        { pitches: [59], finger: 3, voiceAudio: V + "f3_B.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [71, 59], fingers: [2, 3], voiceAudio: V + "note_B.wav", cross: null },
        { pitches: [74, 62], fingers: [1, 2], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [76, 64], fingers: [2, 1], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [78, 66], fingers: [3, 3], voiceAudio: V + "note_Fs.wav", cross: null },
        { pitches: [81, 69], fingers: [1, 2], voiceAudio: V + "note_A.wav", cross: null },
        { pitches: [83, 71], fingers: [2, 1], voiceAudio: V + "note_B.wav", cross: null },
        { pitches: [83, 71], fingers: [2, 1], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [81, 69], fingers: [1, 2], voiceAudio: V + "note_A.wav", cross: null },
        { pitches: [78, 66], fingers: [3, 3], voiceAudio: V + "note_Fs.wav", cross: null },
        { pitches: [76, 64], fingers: [2, 1], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [74, 62], fingers: [1, 2], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [71, 59], fingers: [2, 3], voiceAudio: V + "note_B.wav", cross: null },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Convenience export map, mirrors the SCALES keying convention in data.js.
// Not wired into data.js's SCALES object — for the integrator's reference only.
// ---------------------------------------------------------------------------
const MINOR_PENTATONIC_SCALES = {
  "C Minor Pentatonic": C_MINOR_PENTATONIC,
  "Db Minor Pentatonic": D_FLAT_MINOR_PENTATONIC,
  "D Minor Pentatonic": D_MINOR_PENTATONIC,
  "Eb Minor Pentatonic": E_FLAT_MINOR_PENTATONIC,
  "E Minor Pentatonic": E_MINOR_PENTATONIC,
  "F Minor Pentatonic": F_MINOR_PENTATONIC,
  "F# Minor Pentatonic": F_SHARP_MINOR_PENTATONIC,
  "G Minor Pentatonic": G_MINOR_PENTATONIC,
  "Ab Minor Pentatonic": A_FLAT_MINOR_PENTATONIC,
  "A Minor Pentatonic": A_MINOR_PENTATONIC,
  "Bb Minor Pentatonic": B_FLAT_MINOR_PENTATONIC,
  "B Minor Pentatonic": B_MINOR_PENTATONIC,
};
