import { Suspense, lazy, ComponentType } from 'react';
import { LoadingFallback } from './LoadingFallback.component';
import { ErrorBoundary } from './ErrorBoundary.component';

type AsyncComponentProps<T> = {
  importFn: () => Promise<{ default: ComponentType<T> }>;
  props?: T;
};

export function AsyncComponent<T>({ importFn, props }: AsyncComponentProps<T>) {
  const LazyComponent = lazy(importFn);

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <LazyComponent {...(props as any)} />
      </Suspense>
    </ErrorBoundary>
  );
} 