import { Suspense, lazy, ComponentType } from 'react';
import { ErrorBoundary } from './ErrorBoundary.component';
import { LoadingScreen } from '../UI/LoadingScreen/LoadingScreen.component';
type AsyncComponentProps<T> = {
  importFn: () => Promise<{ default: ComponentType<T> }>;
  props?: T;
};

export function AsyncComponent<T>({ importFn, props }: AsyncComponentProps<T>) {
  const LazyComponent = lazy(importFn);

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen />}>
        <LazyComponent {...(props as any)} />
      </Suspense>
    </ErrorBoundary>
  );
}
