// Command mode for "fast travel" on cells
(() => {
  "use strict";

  function moveToCell(row, col) {
    const canvas = document.querySelector(".game canvas");

    if (!canvas || row < 1 || row > 9 || col < 1 || col > 9) {
      return;
    }

    const rect = canvas.getBoundingClientRect();

    if (!rect.width || !rect.height) {
      return;
    }

    const x = rect.left + (rect.width * (col - 0.5)) / 9;
    const y = rect.top + (rect.height * (row - 0.5)) / 9;

    canvas.dispatchEvent(
      new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
        clientX: x,
        clientY: y,
        button: 0,
        buttons: 1,
        view: window,
      }),
    );
  }

  window.addEventListener("sudoku:move-to-cell", (event) => {
    const { row, col } = event.detail;
    moveToCell(row, col);
  });
})();

