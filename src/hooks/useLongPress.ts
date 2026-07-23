import { useCallback, useRef } from 'react';

interface UseLongPressOptions {
  onLongPress: (e: React.TouchEvent | React.MouseEvent | React.PointerEvent) => void;
  onClick?: (e: React.TouchEvent | React.MouseEvent | React.PointerEvent) => void;
  ms?: number;
}

export function useLongPress({ onLongPress, onClick, ms = 500 }: UseLongPressOptions) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef(false);

  const start = useCallback(
    (e: React.TouchEvent | React.MouseEvent | React.PointerEvent) => {
      isLongPress.current = false;
      timerRef.current = setTimeout(() => {
        isLongPress.current = true;
        onLongPress(e);
      }, ms);
    },
    [onLongPress, ms]
  );

  const clear = useCallback(
    (e: React.TouchEvent | React.MouseEvent | React.PointerEvent, shouldTriggerClick = true) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (shouldTriggerClick && !isLongPress.current && onClick) {
        onClick(e);
      }
      isLongPress.current = false;
    },
    [onClick]
  );

  return {
    onPointerDown: start,
    onPointerUp: (e: React.PointerEvent) => clear(e),
    onPointerLeave: (e: React.PointerEvent) => clear(e, false),
    onPointerCancel: (e: React.PointerEvent) => clear(e, false),
  };
}
