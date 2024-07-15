// src/components/vues/Gaming.jsx
import React from 'react';
import Banner from './Banner';

const Gaming = () => {
  return (
    <div>
      <Banner text="Découvrez l'univers du gaming" image="../../categories/banner_gaming.webp" />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Gaming</h1>
        <p>Explorez notre sélection de produits gaming.</p>
      </div>
    </div>
  );
};

export default Gaming;
