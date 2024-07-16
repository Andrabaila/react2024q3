import React, { Suspense } from 'react';

const LazyComponent = (Component: React.LazyExoticComponent<React.ComponentType<unknown>>) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

export default LazyComponent;
