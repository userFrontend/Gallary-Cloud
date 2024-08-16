import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { InfoProvider } from './context/InfoContext';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <InfoProvider>
      <GoogleOAuthProvider clientId="507113210143-cg0p3uhnf34npclf18h94gt68mj1384r.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </InfoProvider>
  </BrowserRouter>
);
 