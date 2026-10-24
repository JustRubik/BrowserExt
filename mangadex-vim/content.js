(() => {
    "use strict";

    function isTyping() {
        const el = document.activeElement;

        return el &&
            (
                el.tagName === "INPUT" ||
                el.tagName === "TEXTAREA" ||
                el.tagName === "SELECT" ||
                el.isContentEditable
            );
    }

    function readerClick(ratio) {
        const reader = document.querySelector(".md--reader-pages");

        if (!reader) {
            return false;
        }

        const rect = reader.getBoundingClientRect();
        const x = rect.left + rect.width * ratio;
        const y = window.innerHeight / 2;

        const target = document.elementFromPoint(x, y);

        if (!target) {
            return false;
        }

        target.dispatchEvent(new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: x,
            clientY: y
        }));

        return true;
    }

    document.addEventListener("keydown", event => {
        if (event.ctrlKey || event.altKey || event.metaKey) {
            return;
        }

        if (isTyping()) {
            return;
        }

        switch (event.key) {
        case "h":
            if (readerClick(0.25)) {
                event.preventDefault();
            }
            break;

        case "l":
            if (readerClick(0.75)) {
                event.preventDefault();
            }
            break;

        case "j":
            window.scrollBy({
                top: window.innerHeight * 0.25,
                behavior: "smooth"
            });
            event.preventDefault();
            break;

        case "k":
            window.scrollBy({
                top: -window.innerHeight * 0.25,
                behavior: "smooth"
            });
            event.preventDefault();
            break;

        case "/": {
            const input = document.querySelector(
                'input[type="search"], input[placeholder*="search" i]'
            );

            if (input) {
                input.focus();
                input.select();
                event.preventDefault();
            }

            break;
        }

        case "Escape":
            document.activeElement?.blur();
            break;
        }
    });
})();
