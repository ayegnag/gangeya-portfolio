'use client';

import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import { useEffect, useRef } from 'react';

export function GlobalProgress() {
  const ref = useRef<LoadingBarRef>(null);
  const fetching = useIsFetching();
  const mutating = useIsMutating();

  const active = fetching + mutating > 0;

  useEffect(() => {
    if (active) {
      ref.current?.continuousStart(30, 80); // smoother start
    } else {
      ref.current?.complete();
    }
  }, [active]);

  // Optional: force complete on unmount (safety net)
  useEffect(() => {
    return () => ref.current?.complete();
  }, []);

  return <LoadingBar ref={ref} color="oklch(0.985 0 0)" height={3} shadow={true} />;
}