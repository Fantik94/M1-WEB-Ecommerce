// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { PanierContextProvider } from './context/PanierContext';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <PanierContextProvider>
        <NotificationProvider>
          <AuthProvider>
          <App />
          </AuthProvider>
        </NotificationProvider>
      </PanierContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
