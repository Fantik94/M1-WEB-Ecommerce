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
import { CommandeProvider } from './context/CommandeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
       
        <PanierContextProvider>
        <CommandeProvider>
          <NotificationProvider>
            <div className="flex flex-col min-h-screen">
              <div className="flex-grow dark:bg-gray-900">
                <App />
              </div>
              <Footer />
            </div>
          </NotificationProvider>
          </CommandeProvider>
        </PanierContextProvider>
        
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
