// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { PanierContextProvider } from './context/PanierContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <PanierContextProvider>
        <App />
      </PanierContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
