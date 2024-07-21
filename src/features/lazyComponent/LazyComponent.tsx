import React, { Suspense } from 'react';
import ErrorBoundary from '../errorBoundary';

const LazyComponent = (Component: React.LazyExoticComponent<React.ComponentType<unknown>>) => (
  <ErrorBoundary>
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  </ErrorBoundary>
);

export default LazyComponent;
