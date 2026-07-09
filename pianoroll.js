// Piano roll visual — a 2-octave on-screen keyboard (C3-C5) that highlights
// the currently-sounding note(s) in red, annotated with finger number + note name.

const PIANO_ROLL_MIN = 48; // C3
const PIANO_ROLL_MAX = 72; // C5
const SVG_NS = "http://www.w3.org/2000/svg";

const PC_LETTER = { 0: "C", 1: "C", 2: "D", 3: "D", 4: "E", 5: "F", 6: "F", 7: "G", 8: "G", 9: "A", 10: "A", 11: "B" };
const PC_IS_BLACK = new Set([1, 3, 6, 8, 10]);

const PianoRoll = (() => {
  let rootEl = null;

  function pitchClass(midi) {
    return ((midi % 12) + 12) % 12;
  }

  // Below this, white keys stop reading as piano keys and turn into an
  // illegible sliver -- past that point the board scrolls horizontally
  // instead of continuing to squeeze every key into the panel width.
  const MIN_WHITE_KEY_WIDTH = 26;

  function render(container, minMidi = PIANO_ROLL_MIN, maxMidi = PIANO_ROLL_MAX, coreMin, coreMax) {
    rootEl = container;
    rootEl.innerHTML = "";

    const board = document.createElement("div");
    board.className = "piano-roll-board";

    const whiteRow = document.createElement("div");
    whiteRow.className = "piano-roll-white-row";

    let whiteIndex = 0;
    const blackKeyDefs = [];

    for (let midi = minMidi; midi <= maxMidi; midi++) {
      const pc = pitchClass(midi);
      if (PC_IS_BLACK.has(pc)) {
        blackKeyDefs.push({ midi, boundary: whiteIndex });
        continue;
      }
      const key = document.createElement("div");
      key.className = "piano-key white";
      key.dataset.midi = String(midi);
      key.innerHTML = `
        <span class="key-finger"></span>
        <span class="key-note"></span>
      `;
      whiteRow.appendChild(key);
      whiteIndex++;
    }

    const whiteCount = whiteIndex;
    board.appendChild(whiteRow);

    const availableWidth = rootEl.clientWidth || 800;
    const naturalKeyWidth = availableWidth / whiteCount;
    if (naturalKeyWidth < MIN_WHITE_KEY_WIDTH) {
      board.style.width = `${MIN_WHITE_KEY_WIDTH * whiteCount}px`;
    }

    const whiteWidthPct = 100 / whiteCount;
    const blackWidthPct = whiteWidthPct * 0.62;

    for (const def of blackKeyDefs) {
      const key = document.createElement("div");
      key.className = "piano-key black";
      key.dataset.midi = String(def.midi);
      key.style.left = `calc(${def.boundary * whiteWidthPct}% - ${blackWidthPct / 2}%)`;
      key.style.width = `${blackWidthPct}%`;
      key.innerHTML = `
        <span class="key-finger"></span>
        <span class="key-note"></span>
      `;
      board.appendChild(key);
    }

    const wrap = document.createElement("div");
    wrap.className = "piano-roll-wrap";
    wrap.appendChild(board);

    const overlay = document.createElementNS(SVG_NS, "svg");
    overlay.setAttribute("class", "piano-roll-cross-overlay");
    overlay.setAttribute("width", "100%");
    overlay.setAttribute("height", "100%");
    wrap.appendChild(overlay);

    rootEl.appendChild(wrap);

    // Board is only wider than the wrap when keys hit MIN_WHITE_KEY_WIDTH
    // (see above) -- in that case, default scroll position 0 shows the
    // left edge of the padded display range instead of the scale's own
    // notes. Center on the scale's real range (coreMin/coreMax) instantly,
    // not smoothly -- this is the initial paint, not a followed transition.
    if (coreMin != null && coreMax != null) {
      centerOn([coreMin, coreMax], { smooth: false, force: true });
    }
  }

  // x-position of a key's horizontal center, relative to .piano-roll-board
  // (board is position:relative, so offsetLeft is stable layout geometry
  // regardless of the 3D scale()/rotateX() transform's purely visual effect).
  function keyCenterX(midi) {
    const board = rootEl && rootEl.querySelector(".piano-roll-board");
    const key = board && board.querySelector(`.piano-key[data-midi="${midi}"]`);
    if (!key) return null;
    return key.offsetLeft + key.offsetWidth / 2;
  }

  // Scrolls .piano-roll-wrap so the given midi note(s) sit centered.
  // force=true always scrolls (used on initial render). Otherwise only
  // scrolls when the target has drifted outside a comfortable middle zone
  // of the current viewport -- "stay centered and move when needed," not a
  // jittery re-center on every single note during playback.
  function centerOn(midis, { smooth = true, force = false } = {}) {
    const wrap = rootEl && rootEl.querySelector(".piano-roll-wrap");
    const board = rootEl && rootEl.querySelector(".piano-roll-board");
    if (!wrap || !board) return;
    const xs = midis.map(keyCenterX).filter((x) => x != null);
    if (!xs.length) return;
    const targetX = (Math.min(...xs) + Math.max(...xs)) / 2;
    const wrapWidth = wrap.clientWidth;
    const maxScroll = Math.max(0, board.offsetWidth - wrapWidth);
    if (maxScroll <= 0) return; // nothing to scroll -- board already fits/fills the wrap
    const desiredScroll = Math.min(maxScroll, Math.max(0, targetX - wrapWidth / 2));
    if (!force) {
      const visibleX = targetX - wrap.scrollLeft;
      const margin = wrapWidth * 0.225;
      if (visibleX > margin && visibleX < wrapWidth - margin) return;
    }
    if (smooth) {
      wrap.scrollTo({ left: desiredScroll, behavior: "smooth" });
    } else {
      // Direct assignment is always instant regardless of CSS
      // scroll-behavior -- scrollTo(behavior:"auto") would defer to that
      // CSS property instead of actually jumping immediately. (There is
      // no CSS scroll-behavior:smooth on .piano-roll-wrap for exactly
      // this reason -- it fought with rapid back-to-back calls here.)
      wrap.scrollLeft = desiredScroll;
    }
  }

  // Animates an arc between two keys for a "Cross Over" / "Cross Under" cue.
  function showCross({ type, fromMidi, toMidi }) {
    if (!rootEl) return;
    const wrap = rootEl.querySelector(".piano-roll-wrap");
    const board = rootEl.querySelector(".piano-roll-board");
    const overlay = rootEl.querySelector(".piano-roll-cross-overlay");
    const fromKey = board && board.querySelector(`.piano-key[data-midi="${fromMidi}"]`);
    const toKey = board && board.querySelector(`.piano-key[data-midi="${toMidi}"]`);
    if (!wrap || !overlay || !fromKey || !toKey) return;

    const wrapRect = wrap.getBoundingClientRect();
    const boardRect = board.getBoundingClientRect();
    const fromRect = fromKey.getBoundingClientRect();
    const toRect = toKey.getBoundingClientRect();

    const x1 = fromRect.left + fromRect.width / 2 - wrapRect.left;
    const x2 = toRect.left + toRect.width / 2 - wrapRect.left;
    const boardTop = boardRect.top - wrapRect.top;
    const boardBottom = boardRect.bottom - wrapRect.top;

    const isOver = type === "over";
    const y = isOver ? boardTop : boardBottom;
    const midY = isOver ? boardTop - 36 : boardBottom + 36;

    overlay.querySelectorAll(".cross-arc").forEach((el) => el.remove());

    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("class", `cross-arc cross-${type}`);
    path.setAttribute("d", `M ${x1} ${y} Q ${(x1 + x2) / 2} ${midY} ${x2} ${y}`);
    overlay.appendChild(path);

    setTimeout(() => {
      if (overlay.contains(path)) overlay.removeChild(path);
    }, 1500);
  }

  // notes: array of { midi, finger }
  // Every call is a fresh note-on (including a same-pitch retrigger, e.g. the
  // "now backwards" slot repeating the top note) -- always removes the "hit"
  // flash class and forces a reflow before re-adding it, so the flash
  // animation restarts even when the same key stays highlighted across two
  // consecutive events. Without the reflow, remove+re-add happens within one
  // synchronous call and the browser never paints the "no class" frame, so a
  // repeated note on the same key looked like nothing happened.
  function update(notes) {
    if (!rootEl) return;
    rootEl.querySelectorAll(".piano-key.active").forEach((key) => {
      key.classList.remove("active", "hit");
      key.querySelector(".key-finger").textContent = "";
      key.querySelector(".key-note").textContent = "";
    });
    const keys = [];
    for (const note of notes || []) {
      const key = rootEl.querySelector(`.piano-key[data-midi="${note.midi}"]`);
      if (!key) continue;
      key.classList.add("active");
      key.querySelector(".key-finger").textContent = note.finger != null ? note.finger : "";
      key.querySelector(".key-note").textContent = note.noteName || PC_LETTER[pitchClass(note.midi)];
      keys.push(key);
    }
    if (keys.length) {
      void rootEl.offsetWidth; // force reflow so the "hit" animation always restarts
      keys.forEach((key) => key.classList.add("hit"));
      // Follow playback when the current note(s) drift out of the
      // comfortable middle zone -- see centerOn's force=false comfort-zone
      // check. A no-op whenever the board already fits/fills the wrap.
      centerOn(notes.map((n) => n.midi));
    }
  }

  function clear() {
    update([]);
  }

  return { render, update, clear, showCross };
})();
