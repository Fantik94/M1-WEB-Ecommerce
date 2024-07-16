import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Produits from './components/vues/Produits';
import Home from './components/vues/Home';
import Navbar from './components/vues/Navbar';
import Gaming from './components/vues/Gaming';
import Alimentation from './components/vues/Alimentation';
import Panier from './components/vues/Panier';
import Subcategory from './components/vues/Subcategory';
import Login from './components/forms/Login';
import ThemeContext from './context/ThemeContext';
import Register from './components/forms/Register';
import Paiement from './components/vues/Paiement';
import Livraison from './components/vues/Livraison';

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
          <Route path="/gaming" element={<Gaming />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/categories/:categoryId/subcategories/:subcategoryId/products" element={<Subcategory />} />
          <Route path="/produit/:productId" element={<Produits />} />
          <Route path="/alimentation" element={<Alimentation />} />
          <Route path="/paiement" element={<Paiement />} />
          <Route path="/livraison" element={<Livraison />} />


          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
