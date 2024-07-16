import { useCallback, useLayoutEffect, useRef } from 'react';

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if(ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  }, [callback, ref])

  useLayoutEffect(() => {
    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [handleClickOutside]);

  return ref;
};