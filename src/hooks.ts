import { RefObject, useEffect } from "react";

export const useOutsideClick = <T extends HTMLElement>(target: RefObject<T>, callback: () => void) => {
  useEffect(() => {
    const onOutsideClick = (event: MouseEvent) => {
      if (!target.current || target.current.contains(event.target as Node)) {
        return;
      }
      callback();
    };

    window.addEventListener("mousedown", onOutsideClick);

    return () => {
      window.removeEventListener("mousedown", onOutsideClick);
    };
  }, [callback, target]);
};
