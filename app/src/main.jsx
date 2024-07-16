// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { PanierContextProvider } from './context/PanierContext';
import Footer from './components/vues/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <PanierContextProvider>
          <NotificationProvider>
            <div className="flex flex-col min-h-screen">
              <div className="flex-grow">
                <App />
              </div>
              <Footer />
            </div>
          </NotificationProvider>
        </PanierContextProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
