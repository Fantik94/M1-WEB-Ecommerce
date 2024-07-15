// src/components/vues/Gaming.jsx
import React from 'react';
import Banner from './Banner';

const Alimentation = () => {
  return (
    <div>
      <Banner text="Découvrez l'univers du gaming" image="../../categories/banner_food.webp" />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Alimentation</h1>
        <p>Explorez notre sélection de produits alimentaires.</p>
      </div>
    </div>
  );
};

export default Alimentation;
