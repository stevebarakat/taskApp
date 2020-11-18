import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Spinner from './components/Spinner';
import ErrorBoundary from './components/ErrorBoundary';

ReactDOM.unstable_createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);