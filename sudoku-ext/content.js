(() => {
  "use strict";

  // W/A/S/D -> arrow keys
  const keyMap = new Map([
    ["w", ["ArrowUp", "ArrowUp"]],
    ["a", ["ArrowLeft", "ArrowLeft"]],
    ["s", ["ArrowDown", "ArrowDown"]],
    ["d", ["ArrowRight", "ArrowRight"]],
  ]);

  function isEditable(target) {
    if (!(target instanceof Element)) return false;

    return Boolean(target.closest(
      'input, textarea, select, [contenteditable=""], ' +
      '[contenteditable="true"], [role="textbox"]'
    ));
  }

  function forwardArrow(event, key, code) {
    const target = event.target instanceof EventTarget
      ? event.target
      : document;

    target.dispatchEvent(new KeyboardEvent("keydown", {
      key,
      code,
      bubbles: true,
      cancelable: true,
      composed: true,
      shiftKey: event.shiftKey,
      ctrlKey: event.ctrlKey,
      altKey: event.altKey,
      metaKey: event.metaKey,
    }));
  }

  function findNotesButton() {
    const candidates = document.querySelectorAll(
      'button, [role="button"], input[type="button"], input[type="submit"]'
    );

    for (const el of candidates) {
      const text = [
        el.innerText,
        el.textContent,
        el.getAttribute("aria-label"),
        el.getAttribute("title"),
        el.getAttribute("data-testid"),
      ].filter(Boolean).join(" ").replace(/\s+/g, " ").trim();

      if (/\bnotes?\b/i.test(text) && el.getClientRects().length) {
        return el;
      }
    }

    return null;
  }

  window.addEventListener("keydown", (event) => {
    if (
      event.defaultPrevented ||
      event.isComposing ||
      isEditable(event.target)
    ) {
      return;
    }

    // Space: toggle Notes mode
    if (event.code === "Space" || event.key === " ") {
      if (
        event.target instanceof Element &&
        event.target.closest('button, [role="button"], a, input, select')
      ) {
        return;
      }

      const notesButton = findNotesButton();

      if (notesButton) {
        event.preventDefault();
        event.stopPropagation();
        notesButton.click();
      } else {
        console.warn(
          "[Sudoku WASD] Could not find the Notes button."
        );
      }

      return;
    }

    // WASD: forward as arrow keys
    const mapped = keyMap.get(event.key.toLowerCase());

    if (
      !mapped ||
      event.repeat ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey
    ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    forwardArrow(event, mapped[0], mapped[1]);
  }, true);

  console.info(
    "[Sudoku WASD] Loaded: WASD navigation, Space = Notes."
  );
})();
)();
