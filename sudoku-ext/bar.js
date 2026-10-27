(() => {
  "use strict";

  let bar = null;
  let input = null;
  let active = false;

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

    input = document.createElement("span");

    Object.assign(input.style, {
      minWidth: "20px",
      whiteSpace: "pre",
      outline: "none",
    });

    bar.appendChild(prompt);
    bar.appendChild(input);

    document.body.appendChild(bar);
  }

  function open() {
    create();

    active = true;

    input.textContent = "";

    bar.style.display = "flex";
  }

  function close() {
    if (!bar) return;

    active = false;

    bar.style.display = "none";
    input.textContent = "";
  }

  function submit() {
    const command = input.textContent;

    console.log("[Command]", command);

    close();

    // Sau này:
    // commandDispatcher(command);
  }

  document.addEventListener(
    "keydown",
    (event) => {
      /*
       * Command mode
       */
      if (active) {
        event.preventDefault();
        event.stopPropagation();

        if (event.key === "Escape") {
          close();
          return;
        }

        if (event.key === "Enter") {
          submit();
          return;
        }

        /*
         * Chỉ nhận ký tự bình thường.
         *
         * Ví dụ:
         * T -> "t"
         * 3 -> "3"
         */
        if (
          event.key.length === 1 &&
          !event.ctrlKey &&
          !event.altKey &&
          !event.metaKey
        ) {
          input.textContent += event.key;
        }

        /*
         * Backspace
         */
        if (event.key === "Backspace") {
          input.textContent = input.textContent.slice(0, -1);
        }

        return;
      }

      /*
       * Normal mode
       */
      if (
        event.code === "KeyT" &&
        !event.repeat &&
        !event.ctrlKey &&
        !event.altKey &&
        !event.metaKey
      ) {
        event.preventDefault();
        event.stopPropagation();

        open();
      }
    },
    true,
  );

  window.SudokuCommandBar = {
    open,
    close,
    isActive: () => active,
    getValue: () => input?.textContent ?? "",
  };
})();
