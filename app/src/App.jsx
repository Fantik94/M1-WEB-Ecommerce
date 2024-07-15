import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Produits from './components/vues/Produits';
import Home from './components/vues/Home';
import Navbar from './components/vues/Navbar';
import Gaming from './components/vues/Gaming';
import Alimentation from './components/vues/Alimentation';
import Panier from './components/vues/Panier';
import Subcategory from './components/vues/Subcategory';
import Login from './components/vues/Login';
import ThemeContext from './context/ThemeContext';

const App = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <div className={`${theme === 'dark' ? 'dark' : ''} font-inter`}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produits" element={<Produits />} />
          <Route path="/gaming" element={<Gaming />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/login" element={<Login />} />
          <Route path="/categories/:categoryId/subcategories/:subcategoryId/products" element={<Subcategory />} />
          <Route path="/alimentation" element={<Alimentation />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
