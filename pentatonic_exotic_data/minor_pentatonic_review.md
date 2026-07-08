# Minor Pentatonic — sourcing & confidence review

Built 2026-07-08. Ground truth for pitch content and fingering came directly
from the task prompt (already pulled from pianoscales.org), so this pass was
data-entry + reconstruction against `data.js`'s existing conventions, not
fresh research. One WebSearch was run to sanity-check two keys per the task's
instructions (see "Cross-check" below).

## Method

For every key, the five pentatonic pitch classes (1, b3, 4, 5, b7) and their
letter-name spelling were pulled directly from that key's existing
`"{Key} Minor"` (natural minor) entry already in `data.js` — specifically the
notes at the exact array positions each entry's own
`info.pentatonic.indices: [0, 2, 3, 4, 6]` and `info.pentatonic.dropped`
fields already point at. This means the pitch/spelling side of this build is
not a fresh transcription at all — it's a direct re-slice of data already
validated and shipped in this app for the Natural Minor entries. Fingerings
came from the task's pianoscales.org ground truth, applied positionally
(scale-degree position, not letter name) to those pitches.

RH/LH tonic register per key was anchored to that key's existing
`"{Key} Minor"` entry's RH/LH first-slot pitch (confirmed to follow a clean
`RH = 60 + NOTE_NAMES.indexOf(key)`, `LH = RH - 12` pattern across all 12
keys — no surprises).

## Per-key confidence

| Key | Notes | Confidence |
|---|---|---|
| C | C, Eb, F, G, Bb | High — matches parent Natural Minor entry exactly, standard fingering |
| Db (=C#) | C#, E, F#, G#, B | High on pitch/register (confirmed Db Minor is internally C#-spelled in data.js, matched that). Fingering ground truth given directly. |
| D | D, F, G, A, C | High |
| Eb | Eb, Gb, Ab, Bb, Db | High. Re-spelled from the task's given "D#,F#,G#,A#,C#" to match data.js's own flat spelling for this key (Eb Natural Minor already spells these pitches as Eb/Gb/Ab/Bb/Db, not sharps) — same pitches, different accidental choice, per the task's instruction to match each existing entry's spelling convention. |
| E | E, G, A, B, D | High |
| F | F, Ab, Bb, C, Eb | High |
| F# | F#, A, B, C#, E | High |
| G | G, Bb, C, D, F | High |
| Ab | Ab, Cb, Db, Eb, Gb | High on pitch/spelling (matches parent Ab Natural Minor's own Cb/Fb-heavy spelling exactly). **Medium on fingering** — see Cross-check below. |
| A | A, C, D, E, G | High |
| Bb | Bb, Db, Eb, F, Ab | High |
| B | B, D, E, F#, A | High |

## Cross-check (WebSearch)

Ran one search: "minor pentatonic scale piano fingering all keys A minor G#
minor Ab minor pentatonic". Findings:

- **Pitch content**: every generic secondary source agrees on the note
  content for both A minor pentatonic (A, C, D, E, G) and G#/Ab minor
  pentatonic (G#, B, C#, D#, F# — enharmonically identical to the flat
  spelling used here). No discrepancy on pitches for either key.
- **A minor fingering**: the search summary reported LH "1,3,2,1,2,1" for A
  minor, which does not match the task's ground truth for A
  (LH "3,2,1,3,2,1") — but it exactly matches the task's own ground truth for
  **C** minor pentatonic. This strongly suggests the AI-generated search
  summary conflated two different keys' fingering tables from the source
  page rather than reporting A's actual per-key row. Not treated as a real
  contradiction; the task's ground truth for A was kept as-is (it's also the
  generic/expected pattern for a scale starting on a white key with no
  black keys nearby).
- **Ab/G# fingering**: the search summary's generic answer ("LH 3,2,1,3,2,1
  RH 1,2,3,1,2,3") is the same boilerplate pattern used for several other
  keys, and does not reflect the wide, five-finger-reaching pattern
  pianoscales.org lists specifically for this key (LH 2,1,5,4,3,2 /
  RH 2,1,2,3,4,5). The task explicitly flagged this as pianoscales.org's own
  idiosyncratic-but-intentional choice, not a typo. Given (a) the task's
  explicit instruction to trust the given ground truth for this exact case,
  and (b) fingering choices for pentatonic scales are inherently
  pedagogy-dependent (multiple valid fingerings exist for the same scale),
  I kept pianoscales.org's fingering as given rather than substituting the
  generic/boilerplate alternative from the search summary.

**Net result: no pitch-content corrections were needed anywhere. Ab/G#
minor pentatonic's fingering is the one key where a second, more
generic-pattern source diverges from the ground truth used — flagged here
for your review, but not changed, per the task's own framing of that
fingering as deliberate.**

## Structural notes

- Slot count confirmed at 12 per section (6 ascending incl. octave repeat, 1
  "now_backwards" repeat, 5 descending), matching the task's spec and the
  reduced (5-degree vs. 7-degree) version of the `C_MAJOR` template shape.
- `cross: null` on every slot in all 12 keys, per instructions — no
  thumb-crossing cues built in this pass.
- `info.pentatonic` and `info.progressions` sub-fields omitted from all 12
  entries per instructions (they don't cleanly apply to an already-pentatonic
  scale). `info.advanced` also omitted (not requested) — only `typeLabel`,
  `description`, `keyInfo`, and `degrees` are present, which the task said is
  fine since other scale types in this app vary in which optional fields
  they include.
- `degrees` uses the reduced 5-note solfege/name/function set given in the
  task verbatim, identical across all 12 keys (this field is generic to the
  pentatonic pattern, not key-specific).

## Audio gaps

Two finger+note wav files don't exist yet in `voices/` and are needed only by
the Ab (G#) Minor Pentatonic entry: `f5_Ab.wav` and `f5_Db.wav` (both are a
direct consequence of that key's unusual finger-5 fingering — no other key in
this build reaches finger 5 on a black key). Full detail in
`minor_pentatonic_missing_audio.txt`. All other finger+note combos and all
`note_{Name}.wav` combos for the "together" sections, across all 12 keys,
were verified present in `voices/` before being referenced.

`nameAudio` clips don't exist for any of the 12 (expected — this is a new
scale type). All 12 are logged with their exact spoken text in
`minor_pentatonic_needed_audio_names.txt`.
