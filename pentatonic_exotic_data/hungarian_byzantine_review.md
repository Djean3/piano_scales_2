# Hungarian Minor + Byzantine scale build — sourcing & confidence review

Covers `hungarian_byzantine.js`: 24 const objects (12 keys x 2 scale types).
Built by `_generate.js` (kept in this folder for reproducibility/audit — run
`node _generate.js` to regenerate `hungarian_byzantine.js` and the two raw
missing-audio/needed-names lists from scratch).

## Notes/pitch-class confidence: HIGH — cross-checked against the source site

Fetched both `https://www.pianoscales.org/hungarian.html` and
`https://www.pianoscales.org/byzantine.html` (paced one at a time, no 429s
hit). Both pages list all 12 keys' scale-tone spellings but confirmed **no
RH/LH fingering numbers anywhere on either page** (fingering is member-only,
as the task said to expect).

Cross-checking the site's 12-key tables against this build's computed pitch
classes: **100% match on pitch class for all 12 keys, both scale types.**
Every note in every key lands on the exact same piano key the site shows.
The only differences are enharmonic **spelling** choices (which letter name
to use for a given black key), and those diverge in exactly the 3 flat-side
keys where this app already has an established precedent to follow:

- **Db (both scale types) and Eb / Ab (both scale types):** the site defaults
  to a sharp-leaning spelling for these (e.g. Db Hungarian Minor as "C#, D#,
  E, G, G#, A, C"; Eb Hungarian Minor's 6th degree as "B" natural instead of
  "Cb"; G#/Ab Byzantine spelled with sharps). This build instead follows
  **this app's own already-established per-key convention**, confirmed by
  reading the existing `Db/Eb/Ab Natural Minor` and `Db Harmonic Minor`
  entries directly in `data.js`:
  - Db-minor-family scales in this app already use the practical C# minor
    substitution (Db minor needs a double-flat; this app's own `Db Natural
    Minor`/`Db Harmonic Minor` entries already play it as C# minor, with an
    explicit comment citing Alfred's Basic Piano Library for that
    substitution). Db Hungarian Minor follows the same substitution here.
    Db Byzantine does NOT need it (major-scale-derived, no double-flat
    problem) and keeps the flat "Db" spelling, matching `Db Major`.
  - Eb/Ab-minor-family scales in this app already use Cb and Fb where the
    plain diatonic spelling calls for them (confirmed directly from
    `Eb Natural Minor` and `Ab Natural Minor` in `data.js`, which already
    play `f1_Cb.wav` / `f1_Fb.wav` as real scale tones). This build's Eb/Ab
    Hungarian Minor and Byzantine scales do the same, rather than switching
    to the site's simpler "B"/sharp spellings.
  - One additional single-note divergence: this build spells Bb Byzantine's
    2nd degree as "Cb" (site says "B"). Both are the same piano key; "Cb" is
    what the letter-per-scale-degree math produces (Bb major's own 2nd
    degree is "C", flattened), and "Cb" is already a precedented token in
    this app's voice files and other scale entries, so it was kept for
    internal consistency rather than switched to match the site's simpler
    default.

None of these divergences change what note plays — only which spelling
label/audio file is used for that note. Flagged here for transparency, same
as the Db-minor precedent already documented elsewhere in this project.

## Fingering confidence: RECONSTRUCTED, NO BOOK/SITE PRECEDENT

Neither source page shows fingering (confirmed above), and there is no
Alfred's-Basic-Piano-Library-style precedent for either scale (they're not
part of that standard method book curriculum). All finger numbers in
`hungarian_byzantine.js` are reconstructed from general standard piano
technique, not transcribed from any authoritative source. Concretely:

- **Rule used (RH):** thumb (finger 1) never lands on a black key. One
  thumb-crossing per octave, placed at scale-degree 4 if that degree is a
  white key, else degree 5. Before the crossing, fingers ascend 1,2,3...
  (starting at 2 instead of 1 if the root itself is a black key, since the
  thumb can't open there). After the crossing, fingers continue ascending
  2,3,4,5. This exactly reproduces the shape already used for this app's own
  `C Major`/`C Harmonic Minor` (crossing at degree 4, ending on finger 5) and
  `F Major` (crossing at degree 5, ending on finger 4).
- **Rule used (LH):** mirrored logic with descending fingers — group 1
  descends from 5, thumb crosses at degree 5 (or 4), group 2 descends toward
  1 at the octave. Matches the "5,4,3,2,1,3,2,1" shape already used for most
  of this app's existing major-scale LH fingerings.
- **cross: null everywhere**, per the task spec — no thumb-crossing audio
  cues for this pass.

**Partial external validation found:** a web search for double-harmonic
scale fingering turned up a published example for E double harmonic
(E-F-G#-A-B-C-D#-E, RH fingers 1-2-3-1-2-3-4-5, "thumb tuck after G#").
This build's `_generate.js` algorithm independently produces the identical
note sequence AND the identical finger sequence for E Byzantine — a good
sign the reconstruction heuristic tracks real playable fingering at least in
that case, but this is one data point, not a systematic verification across
all 24 scales. **Treat every finger number in this file as reconstructed
and unverified against any book/site, exactly like the flagged spots in
`FINGERING_REVIEW_LOG.md` for this project's other scales** — a human
should sanity-check a few keys at the piano before trusting this for
practice, especially the 5 black-root keys called out below.

### Known rough edges from the fingering algorithm

- **5 keys have a black-key root** (Db/C#, Eb, F#, Ab, Bb). For those, the
  algorithm's LH always opens with finger 5 (pinky) on the root note, and in
  4 of the 5 keys (all but Bb, where an alternate crossing point could have
  avoided it but wasn't special-cased for consistency) the RH also lands
  finger 5 on the octave-repeat of that same black root. Standard technique
  says finger 5 CAN play a black key fine (only the thumb has a strict
  white-key rule) — but this project's voice library has never recorded a
  finger-5 clip for any accidental note, so these combos are silent until
  new audio is recorded. See `hungarian_byzantine_missing_audio.txt` for the
  exact list (9 combos total, 6 of which are this black-root pattern).
- No attempt was made to hand-verify comfort/ergonomics note-by-note beyond
  the algorithmic rule (e.g., whether a particular augmented-2nd stretch is
  actually comfortable at tempo) — augmented 2nds appear twice per octave in
  both scales and may want a slightly different finger substitution in
  practice than what's encoded here.

## Structural validation performed

Ran the generated file through a Node VM sandbox and checked, for all 24
scale objects: exactly 16 slots per section; RH/LH pitch arrays strictly
ascending across the 8 ascending slots; RH pitch always exactly 12 semitones
above the matching LH pitch; the `now_backwards` slot exactly repeats the
prior slot's pitch/finger; the 7 descending slots exactly mirror ascending
slots 7→1; every `together` slot's pitches/fingers match its RH/LH
counterparts; all finger values in range 1-5; `cross: null` everywhere. Zero
issues found. Also cross-checked every generated voice-file token's implied
pitch class against the actual MIDI pitch for all 8 RH ascending slots in
all 24 scales — zero mismatches, confirming the hardcoded per-key spelling
tables are internally consistent with the pitch-class math.

## Octave anchor

RH/LH tonic pitches were taken from each key's existing `{Key} Major` entry
in `data.js` (its slot-0 RH/LH pitch), per the task's instruction — e.g. Db
anchors at RH 61/LH 49 (from `Db Major`, which itself is spelled with flats,
even though `Db Hungarian Minor`'s own notes switch to the C#-minor
spelling per the precedent above). Confirmed all 12 anchors directly from
`data.js` rather than assuming the `+12`/`-12` pattern held for every key.

## Info-block choices

- `keyInfo.signature`: used the task's suggested "N/A — non-diatonic..."
  phrasing, with the scale's actual notes appended for quick reference.
- `keyInfo.relative`/`parallel`: "N/A" — neither scale has an established
  "relative" or "parallel" key concept the way major/minor do.
- `degrees`: simplified to a generic `names` array only (no solfège/
  functions), labeling each degree by its interval quality relative to the
  major scale (e.g. Hungarian Minor: "Raised 4th", "Minor 6th") since these
  aren't diatonic-major-derived scales.
- Omitted `pentatonic`, `progressions`, and `modeRotation` entirely, per the
  task's note that other scale types in this app already vary on which
  optional fields they include.

## Not done / left for integration

- `data.js`, `index.html`, `app.js` were not touched, per the task.
- `nameAudio` points at `TODO_*.wav` placeholders — no TTS clip exists yet.
  See `hungarian_byzantine_needed_audio_names.txt` for the 24 spoken-text
  strings needed.
- The 9 missing finger+note audio combos are logged in
  `hungarian_byzantine_missing_audio.txt` with a per-combo explanation of
  which scale(s)/hand(s) need them and why the gap exists.

## Aside: shared folder has other in-flight builds

This folder (`pentatonic_exotic_data/`) already contained several other
scale-type builds when this task started — `major_pentatonic.*`,
`minor_pentatonic.*`, `neapolitan_enigmatic.*`, `whole_tone_diminished.*`,
`hirajoshi_spanish_gypsy.*`, plus a `generate.js` and some `_raw_*.html`
files — all with timestamps from the same ~15-minute window as this task.
That looks like other concurrent sessions building different scale sets
into the same shared folder. None of those were touched, read in detail, or
altered by this task — only `hungarian_byzantine.js`, this review, the two
audio logs, and `_generate.js` were added. Worth a heads-up in case it
signals overlapping work across sessions.
