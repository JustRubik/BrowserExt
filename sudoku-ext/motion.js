// Enhance movement in playing sudoku

(() => {
  "use strict";

  const SELECTOR = {
    Undo: '.game-controls-item[data-action="undo"]',
    Erase: '.game-controls-item[data-action="erase"]',
    Pencil: '.game-controls-item[data-action="pencil"]',
  };

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

    // Extend keys to toggle/click return and erase
    // if(!event.repeat) {
      switch (event.code) {
        case "KeyQ":
        event.preventDefault();

        document.querySelector(SELECTOR.Undo)?.dispatchEvent(
          new MouseEvent("mousedown", {
            bubbles: true,
            cancelable: true,
            view: window,
          }),
        );
        
        break;

        case "KeyE":
        event.preventDefault();

        document.querySelector(SELECTOR.Erase)?.dispatchEvent(
          new MouseEvent("mousedown", {
            bubbles: true,
            cancelable: true,
            view: window,
          }),
        );
        
      break;

      case "Space":
        event.preventDefault();

        document.querySelector(SELECTOR.Pencil)?.dispatchEvent(
          new MouseEvent("mousedown", {
            bubbles: true,
            cancelable: true,
            view: window,
          }),
        );
        
      break;
    // }
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
