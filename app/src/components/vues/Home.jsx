// src/components/vues/Home.jsx
import React from 'react';
import Banner from './Banner';

const Home = () => {
  return (
    <div>
      <Banner text="L'espace inspiré de gamer pour les gamer." image="../../banner.webp" />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Accueil</h1>
        <p>Bienvenue sur notre page d'accueil.</p>
      </div>
    </div>
  );
};

export default Home;
