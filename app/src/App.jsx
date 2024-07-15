// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Produits from './components/vues/Produits';
import Home from './components/vues/Home';
import Navbar from './components/vues/Navbar';
import Gaming from './components/vues/Gaming';
import Alimentation from './components/vues/Alimentation';
import Panier from './components/vues/Panier';
import Subcategory from './components/vues/Subcategory';
import Login from './components/vues/Login';



const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
    <div className={`${darkMode ? 'dark' : ''}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produits" element={<Produits />} />
        <Route path="/gaming" element={<Gaming />} />
        <Route path="/panier" element={<Panier />} />
        <Route path="/login" element={<Login />} />
        <Route path="/categories/:categoryId/subcategories/:subcategoryId" element={<Subcategory />} />
        
      
        <Route path="/alimentation" element={<Alimentation />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </div>

    </Router>
  );
};

export default App;
