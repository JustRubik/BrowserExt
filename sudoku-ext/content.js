(() => {
  "use strict";

  const NOTES_SELECTOR = '.game-controls-item[data-action="pencil"]';

  const IGNORED_TARGETS =
    "input, textarea, [contenteditable='true']";

  const ARROW_KEYS = {
    KeyW: ["ArrowUp", 38],
    KeyA: ["ArrowLeft", 37],
    KeyS: ["ArrowDown", 40],
    KeyD: ["ArrowRight", 39],
  };

  document.addEventListener("keydown", (event) => {
    if (event.target.matches(IGNORED_TARGETS)) {
      return;
    }

    // Space -> toggle Notes
    if (event.code === "Space" && !event.repeat) {
      event.preventDefault();

      document.querySelector(NOTES_SELECTOR)?.dispatchEvent(
        new MouseEvent("mousedown", {
          bubbles: true,
          cancelable: true,
          view: window,
        }),
      );

      return;
    }

    // WASD -> Arrow keys
    const mapping = ARROW_KEYS[event.code];

    if (mapping && !event.repeat) {
      event.preventDefault();

      const [key, keyCode] = mapping;

      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          key,
          code: key,
          keyCode,
          which: keyCode,
          bubbles: true,
          cancelable: true,
        }),
      );
    }
  });
})();
