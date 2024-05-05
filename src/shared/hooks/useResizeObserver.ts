import { useState, useEffect, useRef } from 'react';

type Size = { width?: number; height?: number };

function useResizeObserver(): [React.RefObject<HTMLDivElement>, Size] {
  const [size, setSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      });
    });

    if (observeTarget) {
      resizeObserver.observe(observeTarget);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return [ref, size];
}

export default useResizeObserver;
