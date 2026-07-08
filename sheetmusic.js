// Sheet music visual — renders each section's notes via VexFlow with note-name
// annotations, plus a playhead line that tracks the currently-sounding slot.

const SM_PC_LETTER = { 0: "C", 1: "C", 2: "D", 3: "D", 4: "E", 5: "F", 6: "F", 7: "G", 8: "G", 9: "A", 10: "A", 11: "B" };
const SM_SVG_NS = "http://www.w3.org/2000/svg";

// Extract the note's display name from a slot's voiceAudio filename.
// "f3_Fs.wav" → "F#", "note_Cs.wav" → "C#", "f1_D.wav" → "D".
// Returns null for non-note clips (e.g. now_backwards.wav).
function noteNameFromAudio(voiceAudio) {
  if (!voiceAudio) return null;
  const file = voiceAudio.split("/").pop().replace(".wav", "");
  let part = null;
  let m = file.match(/^f\d_(.+)$/);
  if (m) part = m[1];
  else { m = file.match(/^note_(.+)$/); if (m) part = m[1]; }
  if (!part) return null;
  if (part.length === 2 && part[1] === "s") return part[0] + "#";
  if (part.length === 2 && part[1] === "b" && part[0] !== "B") return part[0] + "b";
  return part;
}

function sm_midiToVexKey(midi) {
  const pc = ((midi % 12) + 12) % 12;
  const letter = SM_PC_LETTER[pc].toLowerCase();
  const octave = Math.floor(midi / 12) - 1;
  return `${letter}/${octave}`;
}

const SheetMusic = (() => {
  let rootEl = null;
  let scaleData = null;
  const sections = new Map(); // id -> { el, xs, playhead, topY, bottomY }
  let currentSectionId = null;
  let vexAvailable = typeof Vex !== "undefined" && Vex.Flow;

  function init(container, scale) {
    rootEl = container;
    scaleData = scale;
    sections.clear();
    currentSectionId = null;
    rootEl.innerHTML = "";

    if (!vexAvailable) {
      rootEl.innerHTML = '<p class="sheet-music-error">Sheet music view unavailable (notation library failed to load).</p>';
      return;
    }

    try {
      for (const section of scale.sections) {
        const wrap = document.createElement("div");
        wrap.className = "sheet-music-section";
        wrap.dataset.section = section.id;
        wrap.style.display = "none";
        const scroller = document.createElement("div");
        scroller.className = "sheet-music-scroller";
        wrap.appendChild(scroller);
        rootEl.appendChild(wrap);

        const render = renderSection(scroller, section);
        sections.set(section.id, { el: wrap, scroller, ...render });
      }
    } catch (e) {
      console.warn("Sheet music rendering failed", e);
      vexAvailable = false;
      sections.clear();
      rootEl.innerHTML = '<p class="sheet-music-error">Sheet music view unavailable (rendering error).</p>';
    }
  }

  function makeClefNote(VF, midi, clef, noteName) {
    const note = new VF.StaveNote({ clef, keys: [sm_midiToVexKey(midi)], duration: "q" });
    const pc = ((midi % 12) + 12) % 12;
    const label = noteName || SM_PC_LETTER[pc];
    note.addAnnotation(
      0,
      new VF.Annotation(label)
        .setVerticalJustification(VF.Annotation.VerticalJustify.BOTTOM)
        .setFont("Arial", 10)
    );
    return note;
  }

  // A GhostNote takes up the correct tick width for grand-staff alignment but
  // draws nothing — a rest glyph would too, but rest glyphs and noteheads have
  // different built-in x-offsets, so a column of rests never lines up with the
  // notes on the other stave at the same tick.
  function makeRestNote(VF) {
    return new VF.GhostNote({ duration: "q" });
  }

  // Picks the pitch (if any) this section's slot has for the given stave.
  // RH/LH sections only have notes on their own clef; the other stave gets
  // ghost notes so the grand staff is always shown, just empty on the unused side.
  function makeSectionNote(VF, slot, sectionClef, staveClef) {
    let midi = null;
    if (sectionClef === "grand") {
      midi = staveClef === "treble" ? slot.pitches[0] : slot.pitches[1];
    } else if (sectionClef === staveClef) {
      midi = slot.pitches[0];
    }
    const noteName = noteNameFromAudio(slot.voiceAudio);
    return midi == null ? makeRestNote(VF) : makeClefNote(VF, midi, staveClef, noteName);
  }

  function renderSection(container, section) {
    const VF = Vex.Flow;
    const slotCount = section.slots.length;
    const width = slotCount * 65 + 70;
    const height = 280;

    container.innerHTML = "";
    const renderer = new VF.Renderer(container, VF.Renderer.Backends.SVG);
    renderer.resize(width, height);
    const context = renderer.getContext();

    const trebleStave = new VF.Stave(10, 20, width - 20);
    trebleStave.addClef("treble");
    trebleStave.setContext(context).draw();

    const bassStave = new VF.Stave(10, 150, width - 20);
    bassStave.addClef("bass");
    bassStave.setContext(context).draw();

    // Treble and bass clef glyphs have different widths, so each stave's
    // note-start x differs by default. Align them so grand-staff notes (and
    // the playhead/cross arcs, which reuse one set of x positions for both
    // staves) line up vertically across the treble and bass staves.
    const noteStartX = Math.max(trebleStave.getNoteStartX(), bassStave.getNoteStartX());
    trebleStave.setNoteStartX(noteStartX);
    bassStave.setNoteStartX(noteStartX);

    const trebleNotes = section.slots.map((slot) => makeSectionNote(VF, slot, section.clef, "treble"));
    const bassNotes = section.slots.map((slot) => makeSectionNote(VF, slot, section.clef, "bass"));

    const trebleVoice = new VF.Voice({ num_beats: slotCount, beat_value: 4 }).setStrict(false);
    trebleVoice.addTickables(trebleNotes);
    const bassVoice = new VF.Voice({ num_beats: slotCount, beat_value: 4 }).setStrict(false);
    bassVoice.addTickables(bassNotes);

    new VF.Formatter()
      .joinVoices([trebleVoice])
      .joinVoices([bassVoice])
      .format([trebleVoice, bassVoice], width - noteStartX - 10);

    trebleVoice.draw(context, trebleStave);
    bassVoice.draw(context, bassStave);

    // Use whichever stave has the real (non-ghost) notes for this section's
    // x-positions, so the playhead and cross-arcs line up with visible noteheads.
    const xNotes = section.clef === "bass" ? bassNotes : trebleNotes;
    const xs = xNotes.map((n) => n.getAbsoluteX());
    const topY = trebleStave.getYForLine(0) - 10;
    const bottomY = bassStave.getYForLine(4) + 30;

    const svg = container.querySelector("svg");
    const playhead = document.createElementNS("http://www.w3.org/2000/svg", "line");
    playhead.setAttribute("class", "sheet-music-playhead");
    playhead.setAttribute("y1", String(topY));
    playhead.setAttribute("y2", String(bottomY));
    playhead.setAttribute("x1", String(xs[0] - 25));
    playhead.setAttribute("x2", String(xs[0] - 25));
    svg.appendChild(playhead);

    return { xs, playhead, topY, bottomY, clef: section.clef };
  }

  function showSection(sectionId) {
    if (!vexAvailable) return;
    if (currentSectionId === sectionId) return;
    for (const [id, s] of sections) {
      s.el.style.display = id === sectionId ? "block" : "none";
    }
    currentSectionId = sectionId;
    const s = sections.get(sectionId);
    if (s) {
      s.playhead.setAttribute("x1", String(s.xs[0] - 25));
      s.playhead.setAttribute("x2", String(s.xs[0] - 25));
    }
  }

  // Animates an arc between two notes for a "Cross Over" / "Cross Under" cue.
  // Drawn above the treble staff if the crossing note is on the treble clef,
  // below the bass staff if it's on the bass clef. For "together" (grand
  // staff), handIndex 0 = RH (treble/above), handIndex 1 = LH (bass/below).
  // For RH/LH-only sections, handIndex is always 0 and the section's own
  // clef decides which staff the note lives on.
  function showCross({ type, section, handIndex, fromSlot, toSlot }) {
    if (!vexAvailable) return;
    const s = sections.get(section);
    if (!s) return;
    const x1 = s.xs[fromSlot];
    const x2 = s.xs[toSlot];
    if (x1 == null || x2 == null) return;

    const svg = s.scroller.querySelector("svg");
    if (!svg) return;
    svg.querySelectorAll(".sheet-music-cross").forEach((el) => el.remove());

    const above = s.clef === "grand" ? handIndex !== 1 : s.clef === "treble";
    const y = above ? s.topY + 6 : s.bottomY - 6;
    const midY = above ? s.topY - 14 : s.bottomY + 14;

    const path = document.createElementNS(SM_SVG_NS, "path");
    path.setAttribute("class", `sheet-music-cross cross-${type}`);
    path.setAttribute("d", `M ${x1} ${y} Q ${(x1 + x2) / 2} ${midY} ${x2} ${y}`);
    svg.appendChild(path);

    setTimeout(() => {
      if (svg.contains(path)) svg.removeChild(path);
    }, 1500);
  }

  function highlight(sectionId, slotIndex) {
    if (!vexAvailable) return;
    const s = sections.get(sectionId);
    if (!s) return;
    const x = s.xs[slotIndex];
    if (x == null) return;
    s.playhead.setAttribute("x1", String(x));
    s.playhead.setAttribute("x2", String(x));

    // Keep the playhead in view on narrow screens.
    s.scroller.scrollLeft = Math.max(0, x - s.scroller.clientWidth / 2);
  }

  return { init, showSection, highlight, showCross };
})();
