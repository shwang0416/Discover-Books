'use client';

import { useCallback, useEffect, useRef } from 'react';

type IntersectHandler = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver,
) => void;

type useIntersectionObserverProps = {
  onIntersect: IntersectHandler;
  options?: {
    root: Element | Document;
    rootMargin: string;
    threshold: number | number[];
  };
};
const useIntersectionObserver = ({
  onIntersect,
  options,
}: useIntersectionObserverProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onIntersect(entry, observer);
      });
    },
    [onIntersect],
  );

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, ref.current, callback]);

  return ref;
};

export default useIntersectionObserver;
