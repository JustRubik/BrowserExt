// Providing a command bar for fast movement
(() => {
  "use strict";

  let bar = null;
  let display = null;
  let active = false;
  let row = 0;

  function create() {
    if (bar) return;

    bar = document.createElement("div");
    bar.id = "sudoku-command-bar";

    Object.assign(bar.style, {
      position: "fixed",
      left: "50%",
      bottom: "24px",
      transform: "translateX(-50%)",
      display: "none",
      alignItems: "center",
      minWidth: "280px",
      height: "36px",
      padding: "0 12px",
      boxSizing: "border-box",
      background: "#202124",
      color: "#e8eaed",
      border: "1px solid #5f6368",
      borderRadius: "6px",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.35)",
      fontFamily: "monospace",
      fontSize: "15px",
      zIndex: "2147483647",
    });

    const prompt = document.createElement("span");
    prompt.textContent = "T: ";

    Object.assign(prompt.style, {
      marginRight: "8px",
      color: "#8ab4f8",
      fontWeight: "bold",
    });

    display = document.createElement("span");

    Object.assign(display.style, {
      minWidth: "20px",
      whiteSpace: "pre",
    });

    bar.append(prompt, display);
    document.body.appendChild(bar);
  }

  function open() {
    create();

    active = true;
    row = 0;
    display.textContent = "";
    bar.style.display = "flex";
  }

  function close() {
    active = false;
    row = 0;

    if (bar) {
      bar.style.display = "none";
      display.textContent = "";
    }
  }

  function moveToCell(row, col) {
    window.dispatchEvent(
      new CustomEvent("sudoku:move-to-cell", {
        detail: {
          row,
          col,
          index: 9 * (row - 1) + (col - 1),
        },
      }),
    );
  }

  function handleKey(event) {
    if (event.key === "Escape") {
      close();
      return;
    }

    if (event.repeat || !/^[1-9]$/.test(event.key)) {
      return;
    }

    const digit = Number(event.key);

    if (row === 0) {
      row = digit;
      display.textContent = String(digit);
      return;
    }

    const col = digit;
    display.textContent += String(col);

    moveToCell(row, col);
    close();
  }

  document.addEventListener(
    "keydown",
    (event) => {
      if (active) {
        event.preventDefault();
        event.stopImmediatePropagation();
        handleKey(event);
        return;
      }

      if (
        event.code === "KeyT" &&
        !event.repeat &&
        !event.ctrlKey &&
        !event.altKey &&
        !event.metaKey
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
        open();
      }
    },
    true,
  );

  window.SudokuCommandBar = {
    open,
    close,
    isActive: () => active,
  };
})();
