import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider } from '@theme/ThemeProvider.jsx';
import { LanguageProvider } from '@i18n/LanguageProvider.jsx';
import { A11yProvider } from '@a11y/A11yProvider.jsx';

import '@styles/reset.css';
import '@styles/variables.css';
import '@styles/globals.css';
import '@styles/animations.css';
import '@styles/a11y.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <A11yProvider>
          <App />
        </A11yProvider>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
