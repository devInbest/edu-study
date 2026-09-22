import { lazy, Suspense } from 'react';

export default function dynamic(importer, options = {}) {
  const LazyComponent = lazy(importer);
  const Loading = options.loading;

  function DynamicComponent(props) {
    return (
      <Suspense fallback={Loading ? <Loading /> : null}>
        <LazyComponent {...props} />
      </Suspense>
    );
  }

  DynamicComponent.displayName = 'NextDynamicCompat';
  return DynamicComponent;
}
