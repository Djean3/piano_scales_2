# Neapolitan Minor / Enigmatic — Sourcing & Confidence Review

Generated 2026-07-08. Covers 24 entries (12 keys x 2 scale types) in `neapolitan_enigmatic.js`. Not wired into `data.js` — output only.

## Note-spelling sourcing

Notes were computed directly from the semitone formulas given in the task (Neapolitan minor: 0,1,3,5,7,8,11; Enigmatic: 0,1,4,6,8,10,11), using a 7-consecutive-letter diatonic spelling algorithm (each scale degree gets the next letter name in sequence, with whatever accidental the semitone math requires), then cross-checked against `https://www.pianoscales.org/neapolitan.html` and `https://www.pianoscales.org/enigmatic.html` (fetched 2026-07-08). All 4 of the task's given ground-truth spellings (C and D Neapolitan; C and G Enigmatic) matched the algorithm's output exactly before any of the other 20 were generated, and all 24 computed scales matched pianoscales.org's own note lists pitch-for-pitch (differing only in the handful of spots noted below, which are deliberate, documented enharmonic simplifications, not disagreements about the actual pitches).

**Double-accidental / awkward-spelling simplifications** (per-degree, following this project's own established precedent in `FINGERING_REVIEW_LOG.md` — the mode-spelling algorithm's "simplest single-accidental fallback", and F# major/C# minor's E#->F and B#->C substitutions):

- **Db Neapolitan Minor**: degree 2 (D); degree 6 (A)
- **Db Enigmatic**: degree 2 (D)
- **D Enigmatic**: degree 6 (C)
- **E Enigmatic**: degree 5 (C); degree 6 (D)
- **F# Neapolitan Minor**: degree 7 (F)
- **F# Enigmatic**: degree 4 (C); degree 5 (D); degree 6 (E); degree 7 (F)
- **G Enigmatic**: degree 6 (F)
- **Ab Neapolitan Minor**: degree 2 (A)
- **Ab Enigmatic**: degree 2 (A)
- **A Enigmatic**: degree 5 (F); degree 6 (G)
- **B Enigmatic**: degree 4 (F); degree 5 (G); degree 6 (A)

These simplifications mean a small number of entries reuse a letter name twice within the 7-degree spelling (e.g. Db Neapolitan Minor's degree 2 collapses a theoretical E-double-flat down to plain "D", one semitone above the Db root) — this is a deliberate, documented divergence from strict letter-per-degree theory, matching how this app already handles the same situation elsewhere (e.g. the mode-building script's Eb Locrian -> "A" instead of "Bbb"). Pitch/MIDI correctness is unaffected either way; only the displayed note name and its voice-file lookup token are affected.

Db and Ab (both scales) and Eb/Bb (Enigmatic only) intentionally keep single Cb/Fb spellings where pianoscales.org's own default view shows the plain natural-note enharmonic instead (e.g. our Bb Enigmatic shows "Cb" where the site shows "B"). This matches the precedent already set in this app's Eb Minor / Ab Minor families, which explicitly use Cb/Fb voice files (`f1_Cb.wav`, `f1_Fb.wav`, etc. already exist in `voices/`) rather than their natural-note enharmonic equivalents — kept for internal spelling consistency across the app rather than following the source site's default choice.

## Fingering — reconstructed, no book/site precedent

**Neither pianoscales.org nor any other source found shows RH/LH fingering for these two scale types** (pianoscales.org gates fingering behind a member-only PDF; pianoencyclopedia.com and musmath.com's individual scale pages, which claim to include fingering, either omitted finger numbers in the fetched content or returned an HTTP 403). A WebSearch cross-check for "neapolitan minor scale piano fingering" and "enigmatic scale piano fingering" turned up the same handful of sites and no usable finger-number source for either scale type.

Fingering in this file is a from-scratch reconstruction, not a transcription of anything. The approach: reuse this app's own confirmed, standard 7-note scaffold verbatim in all 12 keys and both hands — RH ascending 1,2,3,(thumb-tuck)1,2,3,4,5 / LH ascending 5,4,3,2,(thumb-cross)1,3,2,1, mirrored on the way down — the same shape already confirmed for C/D/G/A/E major in this project, and the same "reuse the standard scaffold wholesale" approach already used (and accepted) for the modes (Dorian/Phrygian/Lydian/Mixolydian/Locrian) family, per `FINGERING_REVIEW_LOG.md`.

**This is a deliberate simplification, flagged the same way as the "no book coverage" modes entries:**
- No per-key adjustment was made for thumb-on-black-key avoidance. Unlike the major-key family (where Eb/Ab/Db/F/Bb/F#/B each got a custom, book-verified finger shape), Neapolitan Minor and Enigmatic have no book source to verify a custom shape against, so every key uses the identical generic scaffold regardless of which scale degrees land on black keys. In several keys (e.g. F# Enigmatic: F#, G, A#, C, D, E, F) the thumb will land on a black key at least once under this scaffold — a real pianist would likely adjust, but there is no source to say how.
- The scaffold assumes a hand-span/reach comparable to a major scale's. Both these scale types contain augmented-2nd gaps (3 semitones between two adjacent scale degrees) that a major scale never has — e.g. C Neapolitan Minor's Ab -> B jump, or every key's Enigmatic augmented-2nd pairs near the start. Whether the generic scaffold's finger assignment is actually comfortable across an augmented 2nd was not re-verified per key.
- `cross: null` was set on every slot per the task's instructions for this pass, so no thumb-crossing cue audio fires in this data despite the scaffold implying two crossings per octave (RH thumb-tuck after degree 3, LH thumb-cross after degree 5) — the crossings are physically implicit in the finger numbers but not called out with a cue.

**Bottom line:** treat every finger number in `neapolitan_enigmatic.js` as "reconstructed, no book/site precedent" — same standing as this project's other flagged, unconfirmed spots. Note/pitch data is high-confidence (cross-checked against a second source); fingering is low-confidence by construction and should be spot-checked against a teacher or a real fingered edition before being treated as authoritative.

## Register / octave anchor

RH root MIDI = 60 + pitch class of the key; LH root MIDI = 48 + pitch class of the key (e.g. F# -> RH 66, LH 54) — derived directly from each key's existing "{Key} Major" entry's first RH/LH slot in `data.js` (grepped and confirmed for all 12 keys before generating), so these scales sit in the same register as that key's already-built major scale.

## Audio

- `neapolitan_enigmatic_missing_audio.txt`: per-note voice clips (`f{finger}_{note}.wav`, `note_{note}.wav`) referenced by this data that do not yet exist in `voices/` (checked against a full listing of the 329 files there at generation time).
- `neapolitan_enigmatic_needed_audio_names.txt`: the 24 `nameAudio` TTS clips, none of which exist yet (all point at `TODO_*.wav` placeholders) — spoken text spelled out for each (e.g. "F Sharp Enigmatic", "D Flat Neapolitan Minor").

## Full computed note tables

| Key | Neapolitan Minor | Enigmatic |
|---|---|---|
| C | C, Db, Eb, F, G, Ab, B | C, Db, E, F#, G#, A#, B |
| Db | Db, D, Fb, Gb, Ab, A, C | Db, D, F, G, A, B, C |
| D | D, Eb, F, G, A, Bb, C# | D, Eb, F#, G#, A#, C, C# |
| Eb | Eb, Fb, Gb, Ab, Bb, Cb, D | Eb, Fb, G, A, B, C#, D |
| E | E, F, G, A, B, C, D# | E, F, G#, A#, C, D, D# |
| F | F, Gb, Ab, Bb, C, Db, E | F, Gb, A, B, C#, D#, E |
| F# | F#, G, A, B, C#, D, F | F#, G, A#, C, D, E, F |
| G | G, Ab, Bb, C, D, Eb, F# | G, Ab, B, C#, D#, F, F# |
| Ab | Ab, A, Cb, Db, Eb, Fb, G | Ab, A, C, D, E, F#, G |
| A | A, Bb, C, D, E, F, G# | A, Bb, C#, D#, F, G, G# |
| Bb | Bb, Cb, Db, Eb, F, Gb, A | Bb, Cb, D, E, F#, G#, A |
| B | B, C, D, E, F#, G, A# | B, C, D#, F, G, A, A# |
