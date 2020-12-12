import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { FirebaseAppProvider } from 'reactfire';
import ErrorBoundary from './components/ErrorBoundary';
import Spinner from './components/Spinner';
import App from './App';

const firebaseConfig = {
  apiKey: "AIzaSyAuFeyJGW-2b0i8vDzt3m2rfRgvhcUsXrA",
  authDomain: "task-app-swipe.firebaseapp.com",
  projectId: "task-app-swipe",
  storageBucket: "task-app-swipe.appspot.com",
  messagingSenderId: "22581657190",
  appId: "1:22581657190:web:289287ea928c479b3bf7a7"
};

ReactDOM.unstable_createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <App />
        </FirebaseAppProvider>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);