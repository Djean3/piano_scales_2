// Scale practice audio engine — Tone.js Transport drives piano (sampled grand
// piano via Tone.Sampler) and voice/cue clips (Tone.Player). Voice/cue clips
// play at fixed real-world duration; only their trigger time scales with tempo.

// Root-note dropdown labels. Uses whichever spelling this app's own scales
// actually use for each chromatic root (F# rather than Gb; Bb/Eb/Ab/Db
// rather than A#/D#/G#/C#) -- these are dropdown values, independent of the
// per-note accidental spelling used inside a scale's own voice clips.
const NOTE_NAMES = ["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
function midiToNote(midi) {
  return `${NOTE_NAMES[midi % 12]}${Math.floor(midi / 12) - 1}`;
}

function scalePitchRange(scale) {
  let lo = Infinity, hi = -Infinity;
  for (const section of scale.sections) {
    for (const slot of section.slots) {
      for (const p of slot.pitches) {
        if (p < lo) lo = p;
        if (p > hi) hi = p;
      }
    }
  }
  const loC = lo - ((lo % 12 + 12) % 12);
  return { min: loC, max: hi };
}

function labelFromAudio(path) {
  const file = path.split("/").pop().replace(".wav", "");
  const known = {
    "01_C_Major": "C Major",
    right_hand: "Right Hand",
    left_hand: "Left Hand",
    together: "Both Hands",
    now_backwards: "Now Backwards",
    cross_over: "Cross Over",
    cross_under: "Cross Under",
    cross_over_right: "Right — Cross Over",
    cross_under_right: "Right — Cross Under",
    cross_over_left: "Left — Cross Over",
    cross_under_left: "Left — Cross Under",
  };
  if (known[file]) return known[file];
  let m = file.match(/^f(\d)_(.+)$/);
  if (m) return `${m[1]} ${m[2]}`;
  m = file.match(/^note_(.+)$/);
  if (m) return m[1];
  return file;
}

// Build a flat list of timed events from a scale's section/slot data.
// Each event's `time` is a Tone.js "bar:beat:sixteenth" position — one slot = one bar.
// sectionStarts/sectionEnds map each playable target — "full", a section id
// (lh/rh/together), or its "<id>-fwd"/"<id>-bwd" half — to its start/end bar,
// used by the transport controls to jump/loop/stop at the right points.
function buildSequence(scale) {
  const seq = [];
  const sectionStarts = { full: 0 };
  const sectionEnds = {};
  const sectionIds = [];
  let bar = 0;

  seq.push({
    time: `${bar}:0:0`,
    voice: { audio: scale.nameAudio, gate: "cue" },
    label: scale.name,
  });
  bar++;

  for (const section of scale.sections) {
    sectionStarts[section.id] = bar;
    sectionIds.push(section.id);
    seq.push({
      time: `${bar}:0:0`,
      voice: { audio: section.announceAudio, gate: "cue" },
      label: labelFromAudio(section.announceAudio),
      section: section.id,
    });
    bar++;

    sectionStarts[`${section.id}-fwd`] = bar;
    const half = Math.floor(section.slots.length / 2);

    section.slots.forEach((slot, slotIndex) => {
      if (slotIndex === half) {
        sectionEnds[`${section.id}-fwd`] = bar;
        sectionStarts[`${section.id}-bwd`] = bar;
      }

      const fingers = slot.fingers || [slot.finger];
      // Single-hand (rh/lh) slots use a combined "finger, note" clip (e.g.
      // "f3_A.wav" = "3, A"). Derive note-only and finger-only alternatives
      // so exactly one clip plays based on the Note Names / Finger Numbers
      // toggles, instead of always speaking the finger number.
      let noteOnlyAudio = null;
      let fingerOnlyAudio = null;
      if (slot.finger != null) {
        const m = slot.voiceAudio.match(/f\d_(.+)\.wav$/);
        if (m) {
          noteOnlyAudio = `${V}note_${m[1]}.wav`;
          fingerOnlyAudio = FINGER_AUDIO[slot.finger];
        }
      }
      const noteName = noteNameFromAudio(slot.voiceAudio);
      // Structural clips (e.g. "now_backwards.wav") have no finger number, so
      // they go through the "cue" gate (Voice Cues toggle). Note/finger clips
      // are handled separately by the names/fingers toggles.
      const voiceGate = slot.finger != null ? "names" : "cue";
      seq.push({
        time: `${bar}:0:0`,
        piano: { pitches: slot.pitches, fingers, gate: "piano", noteName },
        voice: { audio: slot.voiceAudio, gate: voiceGate },
        noteOnlyAudio,
        fingerOnlyAudio,
        label: labelFromAudio(slot.voiceAudio),
        section: section.id,
        slotIndex,
      });

      if (slot.cross) {
        const handIndex = slot.cross.handIndex || 0;
        const nextSlot = section.slots[slotIndex + 1];
        seq.push({
          time: `${bar}:2:0`,
          voice: { audio: slot.cross.audio, gate: "cross" },
          label: labelFromAudio(slot.cross.audio),
          cross: {
            type: slot.cross.type,
            section: section.id,
            handIndex,
            fromMidi: slot.pitches[handIndex],
            toMidi: nextSlot.pitches[handIndex],
            fromSlot: slotIndex,
            toSlot: slotIndex + 1,
          },
        });
      }
      bar++;
    });

    sectionEnds[`${section.id}-bwd`] = bar;
  }

  seq.totalBars = bar;
  seq.sectionStarts = sectionStarts;
  seq.sectionEnds = sectionEnds;
  seq.sectionEnds.full = bar;
  sectionIds.forEach((id, i) => {
    seq.sectionEnds[id] = i + 1 < sectionIds.length ? sectionStarts[sectionIds[i + 1]] : bar;
  });
  return seq;
}

function collectAudioPaths(seq) {
  const set = new Set();
  for (const ev of seq) {
    if (ev.voice) set.add(ev.voice.audio);
    if (ev.noteOnlyAudio) set.add(ev.noteOnlyAudio);
    if (ev.fingerOnlyAudio) set.add(ev.fingerOnlyAudio);
  }
  return [...set];
}

// --- DOM refs ---
const scaleSelect = document.getElementById("scale-select");
const scaleTypeSelect = document.getElementById("scale-type-select");
const scaleUnavailableMsg = document.getElementById("scale-unavailable-msg");
const tempoSlider = document.getElementById("tempo-slider");
const tempoValue = document.getElementById("tempo-value");
const togglePiano = document.getElementById("toggle-piano");
const toggleNames = document.getElementById("toggle-names");
const toggleCross = document.getElementById("toggle-cross");
const toggleClick = document.getElementById("toggle-click");
const clickSoundSelect = document.getElementById("click-sound");
const beatDots = Array.from(document.querySelectorAll(".beat-dot"));
const swingSlider   = document.getElementById("swing-slider");
const swingValue    = document.getElementById("swing-value");
const toggleFingers = document.getElementById("toggle-fingers");
const toggleMetronome = document.getElementById("toggle-metronome");
const toggleVoiceCues  = document.getElementById("toggle-voice-cues");
const toggleSubdivision = document.getElementById("click-subdivision");
const togglePrecount   = document.getElementById("toggle-precount");
const toggleRamp       = document.getElementById("toggle-ramp");
const rampAmount       = document.getElementById("ramp-amount");
const rampLoops        = document.getElementById("ramp-loops");
const sessionTimerEl   = document.getElementById("session-timer");
const timerPlayPause   = document.getElementById("timer-playpause");
const timerResetBtn    = document.getElementById("timer-reset");
const pillButtons = Array.from(document.querySelectorAll(".pill"));
const playBtn = document.getElementById("play-btn");
const restartBtn = document.getElementById("restart-btn");
const loopToggleBtn = document.getElementById("loop-toggle-btn");
const stopBtn = document.getElementById("stop-btn");
const statusLabel = document.getElementById("status-label");
const statusBig = document.getElementById("status-big");
const currentScaleLabel = document.getElementById("current-scale-label");

// --- Populate Note / Type pickers ---
NOTE_NAMES.forEach((note) => {
  const opt = document.createElement("option");
  opt.value = note;
  opt.textContent = note;
  scaleSelect.appendChild(opt);
});
SCALE_TYPES.forEach((type) => {
  const opt = document.createElement("option");
  opt.value = type;
  opt.textContent = type;
  scaleTypeSelect.appendChild(opt);
});

// The two pickers combine into a SCALES key ("C Major", "D Dorian", ...).
// Most Note + Type combinations don't have data yet.
function currentScaleKey() {
  return `${scaleSelect.value} ${scaleTypeSelect.value}`;
}
function currentScale() {
  return SCALES[currentScaleKey()];
}

// Red-highlights options on each picker that have no data for the other
// picker's current value, so the user can see which combinations exist
// before picking one.
function updateAvailability() {
  for (const opt of scaleSelect.options) {
    opt.classList.toggle("unavailable", !SCALES[`${opt.value} ${scaleTypeSelect.value}`]);
  }
  for (const opt of scaleTypeSelect.options) {
    opt.classList.toggle("unavailable", !SCALES[`${scaleSelect.value} ${opt.value}`]);
  }
}

function updateScaleInfo() {
  const scale = currentScale();
  scaleUnavailableMsg.style.display = scale ? "none" : "block";
  if (scale) ScaleInfo.render(document.getElementById("scale-info"), scale);
  else document.getElementById("scale-info").innerHTML = "";
  currentScaleLabel.textContent = scale ? currentScaleKey() : "";
}
updateAvailability();
updateScaleInfo();

// --- Audio setup ---
// Sampled grand piano (Salamander samples hosted by the Tone.js project).
// Sampler is inherently polyphonic, so it takes the same triggerAttackRelease
// calls a PolySynth would.
let pianoReadyResolve;
const pianoReady = new Promise((resolve) => { pianoReadyResolve = resolve; });
setTimeout(() => pianoReadyResolve(), 12000); // don't hang forever if the CDN is unreachable

const synth = new Tone.Sampler({
  urls: {
    C3: "C3.mp3",
    "D#3": "Ds3.mp3",
    "F#3": "Fs3.mp3",
    A3: "A3.mp3",
    C4: "C4.mp3",
    "D#4": "Ds4.mp3",
    "F#4": "Fs4.mp3",
    A4: "A4.mp3",
    C5: "C5.mp3",
  },
  release: 1,
  baseUrl: "https://tonejs.github.io/audio/salamander/",
  onload: () => pianoReadyResolve(),
  onerror: (e) => {
    console.warn("Piano sample load error", e);
    pianoReadyResolve();
  },
}).toDestination();

// --- Click synth factory ---
// Each genre preset (and the click-sound selector) can swap the synthesized
// sound without ever touching the Transport event — the callback just calls
// triggerClick() which routes to whatever synth is current.
let clickSynth = null;
let currentClickSound = "woodblock";

function buildClickSynth(sound) {
  if (clickSynth) { try { clickSynth.dispose(); } catch (e) {} }
  currentClickSound = sound;
  switch (sound) {
    case "beep":
      return new Tone.Synth({
        oscillator: { type: "sine" },
        envelope: { attack: 0.001, decay: 0.06, sustain: 0, release: 0.05 },
        volume: -8,
      }).toDestination();
    case "rimshot":
      return new Tone.NoiseSynth({
        noise: { type: "white" },
        envelope: { attack: 0.001, decay: 0.04, sustain: 0, release: 0.01 },
        volume: -5,
      }).toDestination();
    case "cowbell":
      return new Tone.MetalSynth({
        envelope: { attack: 0.001, decay: 0.4, release: 0.1 },
        harmonicity: 5.1, modulationIndex: 32, resonance: 3200, octaves: 1.5,
        volume: -14,
      }).toDestination();
    case "hihat":
      return new Tone.MetalSynth({
        envelope: { attack: 0.001, decay: 0.08, release: 0.02 },
        harmonicity: 8, modulationIndex: 48, resonance: 6000, octaves: 1.5,
        volume: -12,
      }).toDestination();
    case "kick":
      return new Tone.MembraneSynth({
        pitchDecay: 0.05, octaves: 10,
        envelope: { attack: 0.001, decay: 0.3, sustain: 0, release: 0.1 },
        volume: -8,
      }).toDestination();
    default: // woodblock
      return new Tone.Synth({
        oscillator: { type: "square" },
        envelope: { attack: 0.001, decay: 0.05, sustain: 0, release: 0.05 },
        volume: -10,
      }).toDestination();
  }
}

function triggerClick(time, velocity) {
  if (!clickSynth || velocity <= 0) return;
  if (currentClickSound === "rimshot") {
    clickSynth.triggerAttackRelease("32n", time, velocity);
  } else if (currentClickSound === "kick") {
    clickSynth.triggerAttackRelease("C1", "16n", time, velocity);
  } else if (currentClickSound === "cowbell" || currentClickSound === "hihat") {
    clickSynth.triggerAttackRelease(velocity >= 0.9 ? "A5" : "A4", "32n", time, velocity);
  } else {
    clickSynth.triggerAttackRelease(velocity >= 0.9 ? "C6" : "G5", "32n", time, velocity);
  }
}

clickSynth = buildClickSynth("woodblock");

// --- Per-beat velocity grid ---
// level: 0=off, 1=ghost(0.2), 2=normal(0.6), 3=accent(1.0)
const LEVEL_TO_VEL = [0, 0.2, 0.6, 1.0];
let beatVelocities = [1.0, 0.6, 0.6, 0.6]; // matches default "Straight" preset

let clickEventId = null;
// Tracks the last global beat index that actually fired, to prevent
// floating-point rounding from triggering the same beat twice in a row.
let lastFiredBeat = -1;

function scheduleClick() {
  if (clickEventId !== null) return;
  clickEventId = Tone.Transport.scheduleRepeat((time) => {
    const PPQ          = Tone.Transport.PPQ;
    // Math.round instead of Math.floor: at certain BPMs (e.g. 129) floating
    // point accumulation can push a tick value to 191.9999 instead of 192,
    // causing the beat to land in the wrong sixteenth slot.
    const ticks        = Math.round(Tone.Transport.getTicksAtTime(time));
    const ticksPerBar  = PPQ * 4;
    const ticksPerBeat = PPQ;
    const ticksPer16n  = PPQ / 4;
    const barTick      = ticks % ticksPerBar;
    const beatIdx      = Math.floor(barTick / ticksPerBeat);   // 0–3
    const sixteenth    = Math.floor((barTick % ticksPerBeat) / ticksPer16n); // 0–3
    const onBeat       = sixteenth === 0;
    const totalBeat    = Math.floor(ticks / ticksPerBeat); // monotonic beat counter

    const sub    = toggleSubdivision.value;
    const step   = sub === "sixteenth" ? 1 : sub === "eighth" ? 2 : 4;
    const onGrid = sixteenth % step === 0;

    const barIdx     = Math.floor(ticks / (PPQ * 4));
    const inPrecount = precountFromBar >= 0 && barIdx < precountFromBar;

    if (onBeat) {
      // Deduplicate: skip if this beat already fired (guards against two
      // consecutive 16n callbacks rounding to the same beat boundary).
      if (totalBeat === lastFiredBeat) return;
      lastFiredBeat = totalBeat;

      const bi = beatIdx;
      Tone.Draw.schedule(() => {
        const dot = beatDots[bi];
        if (dot) { dot.classList.remove("lit"); void dot.offsetWidth; dot.classList.add("lit"); }
      }, time);

      // During pre-count, always fire the click (ignores metronome toggle)
      // so the count-in is audible regardless of user settings.
      if (inPrecount) {
        triggerClick(time, bi === 0 ? 1.0 : 0.7);
      } else if (sub !== "none" && toggleClick.checked) {
        const vel = beatVelocities[bi];
        if (vel > 0) triggerClick(time, vel);
      }
    } else if (!inPrecount && onGrid && sub !== "none" && toggleClick.checked) {
      triggerClick(time, 0.2);
    }
  }, "16n");
}
scheduleClick();

// --- Tap tempo ---
let tapTimes = [];
const TAP_RESET_MS = 2000;

function handleTap() {
  const now = Date.now();
  if (tapTimes.length > 0 && now - tapTimes[tapTimes.length - 1] > TAP_RESET_MS) {
    tapTimes = [];
  }
  tapTimes.push(now);
  if (tapTimes.length < 2) return;
  if (tapTimes.length > 8) tapTimes.shift();
  let total = 0;
  for (let i = 1; i < tapTimes.length; i++) total += tapTimes[i] - tapTimes[i - 1];
  const avgMs = total / (tapTimes.length - 1);
  const bpm = Math.min(200, Math.max(40, Math.round(60000 / avgMs)));
  tempoSlider.value = bpm;
  tempoValue.textContent = bpm;
  Tone.Transport.bpm.value = bpm;
}

document.getElementById("tap-btn").addEventListener("click", handleTap);

// --- Beat grid (per-beat accent cycle) ---
function clearPreset() {
  document.querySelectorAll(".preset-pill").forEach(p => p.classList.remove("active"));
}

// Repositions the Transport to the start of the current section so the
// metronome re-aligns cleanly after any setting change.
function restartIfPlaying() {
  if (currentSelection != null && !stopBtn.disabled) {
    lastFiredBeat = -1;
    Tone.Transport.position = `${seq.sectionStarts[currentSelection]}:0:0`;
  }
}

document.querySelectorAll(".beat-cell").forEach(cell => {
  cell.addEventListener("click", () => {
    const i = parseInt(cell.dataset.beat, 10);
    const level = parseInt(cell.dataset.level, 10);
    const next = (level + 1) % 4;
    cell.dataset.level = next;
    beatVelocities[i] = LEVEL_TO_VEL[next];
    clearPreset();
    restartIfPlaying();
  });
});

// --- Style presets ---
const PRESETS = {
  straight: { swing: 0,  sub: "quarter",   beats: [3,2,2,2], sound: "woodblock" },
  rock:     { swing: 0,  sub: "eighth",    beats: [2,3,2,3], sound: "rimshot"   },
  blues:    { swing: 35, sub: "eighth",    beats: [3,1,2,1], sound: "woodblock" },
  hiphop:   { swing: 20, sub: "sixteenth", beats: [3,1,2,1], sound: "hihat"     },
  // One-drop reggae: beat 1 silent (the "drop"), accent lands on beat 3
  reggae:   { swing: 0,  sub: "quarter",   beats: [0,2,3,2], sound: "woodblock" },
  funk:     { swing: 10, sub: "sixteenth", beats: [3,1,1,1], sound: "hihat"     },
  dance:    { swing: 0,  sub: "quarter",   beats: [3,3,3,3], sound: "kick"      },
  latin:    { swing: 15, sub: "eighth",    beats: [3,2,3,2], sound: "woodblock" },
  jazz:     { swing: 50, sub: "eighth",    beats: [2,3,2,3], sound: "beep"      },
  shuffle:  { swing: 50, sub: "eighth",    beats: [3,1,2,1], sound: "woodblock" },
  gospel:   { swing: 15, sub: "eighth",    beats: [2,3,2,3], sound: "woodblock" },
  country:  { swing: 0,  sub: "quarter",   beats: [3,2,3,2], sound: "cowbell"   },
};

function applyPreset(name) {
  const p = PRESETS[name];
  if (!p) return;
  swingSlider.value = p.swing;
  swingValue.textContent = p.swing;
  Tone.Transport.swingSubdivision = "8n";
  Tone.Transport.swing = p.swing / 100;
  toggleSubdivision.value = p.sub;
  p.beats.forEach((level, i) => {
    beatVelocities[i] = LEVEL_TO_VEL[level];
    const cell = document.querySelector(`.beat-cell[data-beat="${i}"]`);
    if (cell) cell.dataset.level = level;
  });
  clickSoundSelect.value = p.sound;
  clickSynth = buildClickSynth(p.sound);
  document.querySelectorAll(".preset-pill").forEach(pill => {
    pill.classList.toggle("active", pill.dataset.preset === name);
  });
  restartIfPlaying();
}

document.querySelectorAll(".preset-pill").forEach(pill => {
  pill.addEventListener("click", () => applyPreset(pill.dataset.preset));
});

const playerMap = new Map();
const LOAD_BATCH_SIZE = 4;
const LOAD_TIMEOUT_MS = 12000;

function loadOnePlayer(path) {
  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };
    const timeout = setTimeout(() => {
      console.warn("Timed out loading", path);
      finish();
    }, LOAD_TIMEOUT_MS);
    const player = new Tone.Player({
      url: path,
      onload: () => {
        clearTimeout(timeout);
        finish();
      },
      onerror: (e) => {
        console.warn("Failed to load", path, e);
        clearTimeout(timeout);
        finish();
      },
    }).toDestination();
    playerMap.set(path, player);
  });
}

// Load in small concurrent batches (gentler on flaky tunnel connections),
// with a per-file timeout so one stuck file can't hang the whole app.
async function loadPlayers(paths, onProgress) {
  const toLoad = paths.filter((p) => !playerMap.has(p));
  let done = 0;
  for (let i = 0; i < toLoad.length; i += LOAD_BATCH_SIZE) {
    const batch = toLoad.slice(i, i + LOAD_BATCH_SIZE);
    await Promise.all(
      batch.map((p) =>
        loadOnePlayer(p).then(() => {
          done++;
          if (onProgress) onProgress(done, toLoad.length);
        })
      )
    );
  }
}

function gateOpen(gate) {
  if (gate === "piano") return togglePiano.checked;
  if (gate === "names") return toggleNames.checked;
  if (gate === "cross") return toggleCross.checked && toggleVoiceCues.checked;
  if (gate === "cue")   return toggleVoiceCues.checked;
  return true;
}

function updateStatus(text) {
  statusBig.textContent = text;
}

// Maps a playable target ("full", a section id, or its "<id>-fwd"/"<id>-bwd"
// half) to the human-readable name shown in the status line.
const SECTION_LABELS = {
  full: "Full",
  lh: "Left Hand",
  "lh-fwd": "Left Hand — Forward",
  "lh-bwd": "Left Hand — Backward",
  rh: "Right Hand",
  "rh-fwd": "Right Hand — Forward",
  "rh-bwd": "Right Hand — Backward",
  together: "Both Hands",
  "together-fwd": "Both Hands — Forward",
  "together-bwd": "Both Hands — Backward",
};

let loopEnabled = false;
// selectedSection: the pill chosen by the user — what Play targets next.
// currentSelection: the target actually playing right now (drives loop
// bounds, the stop-at-end check, and the status label); null when stopped.
// currentSectionId: which structural section (lh/rh/together) is currently
// sounding, from each event's `section` field — used to show a "Full (Left
// Hand)" progress qualifier in the status line while playing "Full".
let selectedSection = "rh";
let currentSelection = null;
let currentSectionId = null;

// Metronome Mode runs only the click, on its own short loop, independent of
// any loaded scale's sequence — lets the click double as a standalone
// metronome. Scheduled sequence events become no-ops while it's active.
let metronomeMode = false;

// Applies (or clears) Transport looping for `currentSelection`, based on the
// persistent `loopEnabled` toggle. Called on every start, and again whenever
// the toggle is flipped while something is already playing.
function applyLoopState() {
  if (loopEnabled && currentSelection != null) {
    Tone.Transport.loopStart = `${seq.sectionStarts[currentSelection]}:0:0`;
    Tone.Transport.loopEnd = `${seq.sectionEnds[currentSelection]}:0:0`;
    Tone.Transport.loop = true;
  } else {
    Tone.Transport.loop = false;
  }
}

function updateStatusLabel() {
  const mode = loopEnabled ? "Looping" : "Playing Once";
  if (currentSelection === "full" && currentSectionId) {
    statusLabel.textContent = `${mode} — Full (${SECTION_LABELS[currentSectionId]})`;
  } else {
    const label = SECTION_LABELS[currentSelection] || "";
    statusLabel.textContent = mode + (label ? ` — ${label}` : "");
  }
}

let seq = null;
let isLoaded = false;

function scheduleSequence(seq) {
  for (const ev of seq) {
    // parseInt("4:0:0") === 4 — stops at the first ":"
    const evBar = parseInt(ev.time, 10);
    Tone.Transport.schedule((time) => {
      if (metronomeMode) return;
      // precountFromBar is the first bar that should sound; bars before it are silenced.
      if (precountFromBar >= 0 && evBar < precountFromBar) return;
      if (ev.piano && gateOpen(ev.piano.gate)) {
        const notes = ev.piano.pitches.map(midiToNote);
        synth.triggerAttackRelease(notes, "2n", time);
      }
      if (ev.noteOnlyAudio != null || ev.fingerOnlyAudio != null) {
        // rh/lh note slot: pick exactly one clip so finger number and note name
        // are never spoken on top of each other. Voice Cues toggle is separate.
        const names = toggleNames.checked;
        const fingers = toggleFingers.checked;
        let audio = null;
        if (names && fingers) audio = ev.voice.audio;
        else if (names) audio = ev.noteOnlyAudio;
        else if (fingers) audio = ev.fingerOnlyAudio;
        if (audio) {
          const player = playerMap.get(audio);
          if (player && player.loaded) player.start(time);
        }
      } else if (ev.voice && gateOpen(ev.voice.gate)) {
        const player = playerMap.get(ev.voice.audio);
        if (player && player.loaded) player.start(time);
      }
      Tone.Draw.schedule(() => {
        updateStatus(ev.label);
        if (ev.section) {
          SheetMusic.showSection(ev.section);
          currentSectionId = ev.section;
          updateStatusLabel();
        }
        if (ev.piano) {
          const notes = ev.piano.pitches.map((p, i) => ({
            midi: p,
            finger: toggleFingers.checked ? ev.piano.fingers[i] : null,
            noteName: ev.piano.noteName,
          }));
          PianoRoll.update(notes);
          if (ev.section != null && ev.slotIndex != null) {
            SheetMusic.highlight(ev.section, ev.slotIndex);
          }
        } else {
          PianoRoll.clear();
        }
        if (ev.cross) {
          PianoRoll.showCross(ev.cross);
          SheetMusic.showCross(ev.cross);
        }
      }, time);
    }, ev.time);
  }
}

const startButtons = [playBtn, ...pillButtons];

// Loads + schedules the current scale once; subsequent restarts just
// reposition the already-scheduled Transport (events re-fire when crossed again).
async function ensureLoaded() {
  if (isLoaded) return;
  const scale = currentScale();
  seq = buildSequence(scale);
  const range = scalePitchRange(scale);
  PianoRoll.render(document.getElementById("piano-roll"), range.min, range.max);
  SheetMusic.init(document.getElementById("sheet-music"), scale);
  await Promise.all([
    pianoReady,
    loadPlayers(collectAudioPaths(seq), (done, total) => {
      statusLabel.textContent = `Loading ${done}/${total}...`;
    }),
  ]);
  scheduleSequence(seq);
  isLoaded = true;
}

function setStartButtonsDisabled(disabled) {
  startButtons.forEach((b) => (b.disabled = disabled));
}

let stopEventId = null;

// Schedules a one-time check at the end bar of `selection`: if Transport is
// looping by then, this is a no-op (loopEnd already wraps it back around);
// otherwise it stops playback there, so "Playing Once" stops exactly at the
// end of whichever section/sub-section was selected (not just at totalBars).
function scheduleStopAt(endBar) {
  if (stopEventId != null) Tone.Transport.clear(stopEventId);
  stopEventId = Tone.Transport.scheduleOnce((time) => {
    Tone.Draw.schedule(() => {
      if (!Tone.Transport.loop) stopPlayback();
    }, time);
  }, `${endBar}:0:0`);
}

async function startFrom(selection) {
  await Tone.start();

  setStartButtonsDisabled(true);
  statusLabel.textContent = "Loading...";

  await ensureLoaded();

  Tone.Transport.bpm.value = parseInt(tempoSlider.value, 10);
  Tone.Transport.stop();
  currentSelection = selection;
  currentSectionId = null;
  applyLoopState();
  scheduleStopAt(seq.sectionEnds[selection]);

  const startBar = seq.sectionStarts[selection];
  if (togglePrecount.checked && startBar > 0) {
    precountFromBar = startBar;
    Tone.Transport.position = `${startBar - 1}:0:0`;
  } else {
    precountFromBar = -1;
    Tone.Transport.position = `${startBar}:0:0`;
  }

  Tone.Transport.start();

  setStartButtonsDisabled(false);
  stopBtn.disabled = false;
  restartBtn.disabled = false;
  updateStatusLabel();

  startTimer();
  startRampSchedule(selection);
}

function stopPlayback() {
  if (metronomeMode) {
    toggleMetronome.checked = false;
    stopMetronome();
    return;
  }
  Tone.Transport.stop();
  Tone.Transport.loop = false;
  Tone.Transport.position = 0;
  precountFromBar = -1;
  currentSelection = null;
  currentSectionId = null;
  setStartButtonsDisabled(false);
  stopBtn.disabled = true;
  restartBtn.disabled = true;
  statusLabel.textContent = "Ready";
  statusBig.textContent = " ";
  PianoRoll.clear();
  pauseTimer();
  stopRampSchedule();
}

// Starts a 1-bar click loop independent of any loaded scale, so the click
// can be used as a standalone metronome. Stops normal playback first if
// something's already playing.
async function startMetronome() {
  await Tone.start();
  if (!stopBtn.disabled) stopPlayback();

  metronomeMode = true;
  setStartButtonsDisabled(true);
  restartBtn.disabled = true;
  loopToggleBtn.disabled = true;
  toggleClick.checked = true;

  Tone.Transport.bpm.value = parseInt(tempoSlider.value, 10);
  Tone.Transport.stop();
  Tone.Transport.loop = true;
  Tone.Transport.loopStart = "0:0:0";
  Tone.Transport.loopEnd = "1:0:0";
  Tone.Transport.position = "0:0:0";
  Tone.Transport.start();

  stopBtn.disabled = false;
  statusLabel.textContent = "Metronome";
  statusBig.textContent = "Click";
}

function stopMetronome() {
  metronomeMode = false;
  Tone.Transport.stop();
  Tone.Transport.loop = false;
  Tone.Transport.position = 0;
  setStartButtonsDisabled(false);
  restartBtn.disabled = true;
  loopToggleBtn.disabled = false;
  stopBtn.disabled = true;
  statusLabel.textContent = "Ready";
  statusBig.textContent = " ";
}

// Picking a pill only changes what Play/Restart will target next — it
// doesn't interrupt anything already playing.
pillButtons.forEach((pill) => {
  pill.addEventListener("click", () => {
    selectedSection = pill.dataset.target;
    // Sync by data-target, not by exact element — the transport bar's quick
    // Left/Right/Both swap duplicates 3 of these targets (rh/lh/together) so
    // both sets of buttons need to reflect the same active selection.
    pillButtons.forEach((p) => p.classList.toggle("active", p.dataset.target === selectedSection));
  });
});

playBtn.addEventListener("click", () => startFrom(selectedSection));

// Restart jumps the Transport back to the start of whatever's currently
// playing, without going through the full (re)load/reset pipeline — for
// instantly restarting a loop. Disabled until something is playing.
restartBtn.addEventListener("click", () => {
  if (currentSelection == null) return;
  lastFiredBeat = -1;
  Tone.Transport.position = `${seq.sectionStarts[currentSelection]}:0:0`;
});

stopBtn.addEventListener("click", stopPlayback);

// Loop is a persistent mode toggle (not a one-shot action) — it applies to
// whichever selection is played next, and to whatever's currently playing if
// toggled mid-playback (looping just that selection from then on).
loopToggleBtn.addEventListener("click", () => {
  loopEnabled = !loopEnabled;
  loopToggleBtn.classList.toggle("active", loopEnabled);
  if (!stopBtn.disabled) {
    applyLoopState();
    if (!loopEnabled) {
      scheduleStopAt(seq.sectionEnds[currentSelection]);
      stopRampSchedule();
    } else {
      startRampSchedule(currentSelection);
    }
    updateStatusLabel();
  }
});

toggleMetronome.addEventListener("change", () => {
  if (toggleMetronome.checked) {
    startMetronome();
  } else {
    stopMetronome();
  }
});

// Note and Type pickers combine into one scale selection — re-check
// availability/highlighting on either change, and disable playback (stopping
// it first if running) when the combination has no data yet.
function onScaleSelectionChanged() {
  updateAvailability();
  if (!stopBtn.disabled) stopPlayback();
  stopRampSchedule();
  Tone.Transport.cancel();
  rampEventId = null; // cancel() wiped all events including ramp
  clickEventId = null; // event was wiped by cancel(); reschedule below
  scheduleClick();
  isLoaded = false;
  updateScaleInfo();
  const available = !!currentScale();
  setStartButtonsDisabled(!available);
}
scaleSelect.addEventListener("change", onScaleSelectionChanged);
scaleTypeSelect.addEventListener("change", onScaleSelectionChanged);

// Subdivision changes don't reschedule — the permanent 16n callback reads
// toggleSubdivision.value live. Just reset the beat counter so accents land on
// beat 1 immediately, and deselect any active preset (user is customizing).
toggleSubdivision.addEventListener("change", () => { clearPreset(); restartIfPlaying(); });

clickSoundSelect.addEventListener("change", () => {
  clickSynth = buildClickSynth(clickSoundSelect.value);
  clearPreset();
  restartIfPlaying();
});

swingSlider.addEventListener("input", () => {
  const pct = parseInt(swingSlider.value, 10);
  swingValue.textContent = pct;
  Tone.Transport.swingSubdivision = "8n";
  Tone.Transport.swing = pct / 100;
  clearPreset();
});
swingSlider.addEventListener("change", () => { restartIfPlaying(); });

tempoSlider.addEventListener("input", () => {
  tempoValue.textContent = tempoSlider.value;
  Tone.Transport.bpm.value = parseInt(tempoSlider.value, 10);
});

// ── Session timer ────────────────────────────────────────────────────────────
let timerInterval    = null;
let timerElapsed     = 0;
let timerManualPause = false; // user paused via micro-button

function formatTime(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

function startTimer() {
  if (timerManualPause) return; // respect manual pause
  if (timerInterval) return;
  let last = Date.now();
  timerInterval = setInterval(() => {
    const now = Date.now();
    timerElapsed += now - last;
    last = now;
    sessionTimerEl.textContent = formatTime(timerElapsed);
  }, 250);
  if (timerPlayPause) timerPlayPause.textContent = "⏸";
}

function pauseTimer() {
  if (!timerInterval) return;
  clearInterval(timerInterval);
  timerInterval = null;
  if (timerPlayPause) timerPlayPause.textContent = "▶";
}

function resetTimer() {
  pauseTimer();
  timerElapsed = 0;
  timerManualPause = false;
  sessionTimerEl.textContent = "00:00";
  if (timerPlayPause) timerPlayPause.textContent = "▶";
}

if (timerPlayPause) {
  timerPlayPause.addEventListener("click", () => {
    if (timerInterval) {
      timerManualPause = true;
      pauseTimer();
    } else {
      timerManualPause = false;
      startTimer();
    }
  });
}
if (timerResetBtn) {
  timerResetBtn.addEventListener("click", () => {
    timerManualPause = false;
    resetTimer();
  });
}

// ── Speed ramp ───────────────────────────────────────────────────────────────
// Uses Tone.Transport.scheduleRepeat — fires once per section-length so it
// reliably detects each loop completion without relying on RAF polling.
let rampEventId   = null;
let rampLoopCount = 0;

function startRampSchedule(selection) {
  stopRampSchedule();
  if (!toggleRamp.checked || !loopEnabled) return;
  rampLoopCount = 0;
  const sectionLen = seq.sectionEnds[selection] - seq.sectionStarts[selection];
  if (sectionLen <= 0) return;
  // Fire at the end of each section pass (= start of next loop pass on timeline)
  rampEventId = Tone.Transport.scheduleRepeat((time) => {
    rampLoopCount++;
    const every = Math.max(1, parseInt(rampLoops.value, 10));
    if (rampLoopCount % every !== 0 || !toggleRamp.checked) return;
    Tone.Draw.schedule(() => {
      const bump   = Math.max(1, parseInt(rampAmount.value, 10));
      const newBpm = Math.min(220, Math.round(Tone.Transport.bpm.value) + bump);
      Tone.Transport.bpm.value = newBpm;
      tempoSlider.value = newBpm;
      tempoValue.textContent = newBpm;
    }, time);
  }, `${sectionLen}m`, `${seq.sectionEnds[selection]}:0:0`);
}

function stopRampSchedule() {
  if (rampEventId !== null) { Tone.Transport.clear(rampEventId); rampEventId = null; }
  rampLoopCount = 0;
}

// ── Pre-count ────────────────────────────────────────────────────────────────
// First bar of the section that should make sound. Events at bars < this are
// silenced so only the click plays during the count-in bar. -1 = off.
let precountFromBar = -1;

// ── Theme switching ──────────────────────────────────────────────────────────
(function () {
  const html = document.documentElement;
  const pills = document.querySelectorAll(".theme-pill");
  const STORAGE_KEY = "scalePracticeTheme";

  function applyTheme(val) {
    html.dataset.theme = val;
    pills.forEach((p) => p.classList.toggle("active", p.dataset.themeVal === val));
    try { localStorage.setItem(STORAGE_KEY, val); } catch (e) {}
  }

  pills.forEach((p) => p.addEventListener("click", () => applyTheme(p.dataset.themeVal)));

  // Restore saved theme (default: "dark")
  const saved = (() => { try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; } })();
  applyTheme(saved && ["dark", "light", "hc"].includes(saved) ? saved : "dark");
})();

// ── Piano-centric redesign: popouts, notes-in-scale pills, status card, volume ──
// Purely additive — reuses the existing element IDs/state above, no engine changes.

function closeAllPopouts() {
  document.querySelectorAll(".popout").forEach((p) => p.classList.remove("open"));
  document.querySelectorAll(".nav-btn").forEach((b) => b.classList.remove("active"));
}
function openPopout(panel) {
  closeAllPopouts();
  const panelEl = document.querySelector(`.popout[data-panel="${panel}"]`);
  const btnEl = document.querySelector(`.nav-btn[data-panel="${panel}"]`);
  if (panelEl) panelEl.classList.add("open");
  if (btnEl) btnEl.classList.add("active");
}
document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const panel = btn.dataset.panel;
    const alreadyOpen = document.querySelector(`.popout[data-panel="${panel}"]`)?.classList.contains("open");
    if (alreadyOpen) closeAllPopouts();
    else openPopout(panel);
  });
});
document.querySelectorAll("[data-close-panel]").forEach((btn) => {
  btn.addEventListener("click", closeAllPopouts);
});
document.getElementById("scale-apply-btn")?.addEventListener("click", closeAllPopouts);

// Notes-in-Scale pills — unique pitch classes from the RH section, in ascending
// order of first appearance, root highlighted. Works for any slot count (5-note
// pentatonics, 7-note scales, 6/8-note exotic scales, 2-octave arpeggios).
function renderNotesInScale() {
  const container = document.getElementById("notes-in-scale");
  if (!container) return;
  const scale = currentScale();
  if (!scale) { container.innerHTML = ""; return; }
  const rh = scale.sections.find((s) => s.id === "rh");
  if (!rh || !rh.slots.length) { container.innerHTML = ""; return; }
  const seen = new Set();
  const pcs = [];
  for (const slot of rh.slots) {
    for (const p of slot.pitches) {
      const pc = ((p % 12) + 12) % 12;
      if (!seen.has(pc)) { seen.add(pc); pcs.push(pc); }
    }
  }
  const rootPc = ((rh.slots[0].pitches[0] % 12) + 12) % 12;
  container.innerHTML = pcs
    .map((pc) => `<span class="note-pill${pc === rootPc ? " root" : ""}">${NOTE_NAMES[pc]}</span>`)
    .join("");
}
renderNotesInScale();
scaleSelect.addEventListener("change", renderNotesInScale);
scaleTypeSelect.addEventListener("change", renderNotesInScale);

// Status card (top-right): current scale name, BPM, loop/ramp progress. Polls
// existing state on a light interval rather than hooking every mutation site —
// this is display-only and every value it reads is already cheap DOM/state access.
function syncStatusCard() {
  const scaleEl = document.getElementById("status-card-scale");
  if (!scaleEl) return;
  const bpmEl = document.getElementById("status-card-bpm");
  const loopEl = document.getElementById("status-card-loop");
  const scale = currentScale();
  scaleEl.textContent = scale ? scale.name : "No scale selected";
  bpmEl.textContent = `${tempoValue.textContent} BPM`;
  if (loopEnabled && currentSelection) {
    loopEl.textContent = toggleRamp.checked
      ? `Looping · +${rampAmount.value} BPM / ${rampLoops.value} loops`
      : "Looping";
  } else {
    loopEl.textContent = "";
  }
}
setInterval(syncStatusCard, 500);
syncStatusCard();

// Size mode (Mobile / Tablet / Computer) — a manual layout-density override,
// separate from the theme system. Persists the same way (localStorage,
// html.dataset), but "desktop" is the implicit default and never gets its
// own `html[data-size="desktop"]` CSS block since it just uses the :root
// values already sized for computer screens.
(function () {
  const htmlEl = document.documentElement;
  const sizePills = document.querySelectorAll(".size-pill");
  const SIZE_STORAGE_KEY = "scalePracticeSize";

  function applySize(val) {
    if (val === "desktop") delete htmlEl.dataset.size;
    else htmlEl.dataset.size = val;
    sizePills.forEach((p) => p.classList.toggle("active", p.dataset.sizeVal === val));
    try { localStorage.setItem(SIZE_STORAGE_KEY, val); } catch (e) {}
  }

  sizePills.forEach((p) => p.addEventListener("click", () => applySize(p.dataset.sizeVal)));

  const savedSize = (() => { try { return localStorage.getItem(SIZE_STORAGE_KEY); } catch (e) { return null; } })();
  applySize(savedSize && ["mobile", "tablet", "desktop"].includes(savedSize) ? savedSize : "desktop");
})();

// Re-render sheet music notation when the theme changes. VexFlow bakes ink
// color into the SVG at draw time (not live CSS) via the --sheet-ink read in
// sheetmusic.js, so switching themes after a scale is already drawn leaves
// the old ink color stuck — e.g. black notation drawn in light mode stays
// black even after switching to dark mode's now-dark panel (invisible).
// Re-init picks up the new --sheet-ink value; re-showing whichever section
// was visible keeps the user's current view instead of blanking it.
document.querySelectorAll(".theme-pill").forEach((pill) => {
  pill.addEventListener("click", () => {
    const scale = currentScale();
    const sheetMusicEl = document.getElementById("sheet-music");
    if (!scale || !sheetMusicEl) return;
    let visibleSectionId = null;
    sheetMusicEl.querySelectorAll(".sheet-music-section").forEach((el) => {
      if (el.style.display !== "none") visibleSectionId = el.dataset.section;
    });
    SheetMusic.init(sheetMusicEl, scale);
    if (visibleSectionId) SheetMusic.showSection(visibleSectionId);
  });
});

// Master volume slider (new control, not in the original engine) — drives the
// shared Tone.js output every sound in this app already renders through
// (Sampler and click synths all call .toDestination()).
const masterVolumeSlider = document.getElementById("master-volume");
if (masterVolumeSlider) {
  masterVolumeSlider.addEventListener("input", () => {
    const pct = parseInt(masterVolumeSlider.value, 10) / 100;
    Tone.Destination.volume.value = pct <= 0 ? -Infinity : -40 + pct * 40;
  });
  Tone.Destination.volume.value = -40 + (parseInt(masterVolumeSlider.value, 10) / 100) * 40;
}

// Quick tempo nudge (transport bar) — adjusts the same tempoSlider the Tempo
// popout uses, via a real "input" event, so it stays the single source of
// truth (Tone.Transport.bpm update, tempo-value text) with no duplicated logic.
const tempoNudgeDown = document.getElementById("tempo-nudge-down");
const tempoNudgeUp = document.getElementById("tempo-nudge-up");
const quickTempoDisplay = document.getElementById("quick-tempo-display");
function nudgeTempo(delta) {
  const min = parseInt(tempoSlider.min, 10);
  const max = parseInt(tempoSlider.max, 10);
  const next = Math.min(max, Math.max(min, parseInt(tempoSlider.value, 10) + delta));
  tempoSlider.value = next;
  tempoSlider.dispatchEvent(new Event("input"));
}
tempoNudgeDown?.addEventListener("click", () => nudgeTempo(-1));
tempoNudgeUp?.addEventListener("click", () => nudgeTempo(1));
if (quickTempoDisplay) {
  const syncQuickTempo = () => { quickTempoDisplay.textContent = tempoValue.textContent; };
  setInterval(syncQuickTempo, 250);
  syncQuickTempo();
}
