import { useCallback, useEffect, useRef } from 'react';

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if(ref.current && ref.current !== e.target) {
      callback();
    }
  }, [callback, ref])

  useEffect(() => {
    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [handleClickOutside]);

  return ref;
};