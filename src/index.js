import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { FirebaseAppProvider } from 'reactfire';
import ErrorBoundary from './components/ErrorBoundary';
import Spinner from './components/Spinner';
import App from './App';

const firebaseConfig = {
  apiKey: "AIzaSyAA_xRLrWMlxNf88Ck5WrQETPuss7lHGyg",
  authDomain: "steves-task-app.firebaseapp.com",
  databaseURL: "https://steves-task-app.firebaseio.com",
  projectId: "steves-task-app",
  storageBucket: "steves-task-app.appspot.com",
  messagingSenderId: "839670568204",
  appId: "1:839670568204:web:4b5775865002cab2dc6529"
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