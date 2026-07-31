import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/onest/300.css';
import '@fontsource/onest/400.css';
import '@fontsource/onest/500.css';
import '@fontsource/onest/600.css';
import '@fontsource/onest/700.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/600.css';
import './index.css';
import App from './App';

// Reveal animations hide their targets until an observer fires, so the hidden
// state is scoped to this flag. It is set from a module that only runs when
// scripting works, which keeps every section readable if it does not.
document.documentElement.classList.add('has-reveal');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
