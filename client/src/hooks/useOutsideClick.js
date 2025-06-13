import { useEffect } from "react";

export function useOutsideClick(onClose, options = {}) {
  const { selector = "[data-dropdown], [data-dropdown-trigger]" } = options;

  useEffect(() => {
    function handleClick(event) {
      const isInside = event.target.closest(selector);
      if (!isInside) onClose?.();
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose, selector]);
}
