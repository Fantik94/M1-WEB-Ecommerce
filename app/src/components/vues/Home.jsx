// src/components/vues/Home.jsx
import React from 'react';
import Banner from './Banner';
import Comment from './Comment';

const Home = () => {
  return (
    <div>
      <Banner text="L'espace inspiré de gamer pour les gamer." image="../../banner.webp" />
      <div className="p-4 dark:bg-gray-900 ">
        <h1 className="text-2xl font-bold text-center text-gray-900 md:text-5xl lg:text-6xl">
          <br />
          
          <span className="text-transparent text-center bg-clip-text bg-gradient-to-r to-blue-800 from-violet-400">
            Bienvenue dans le paradis du gamer
          </span>
        </h1>
        <br />
        <br />
        <p className="mt-4 text-lg font-normal text-gray-500 lg:text-xl">
          Chez Gaming Avenue, nous comprenons les besoins des gamers. Que vous soyez à la recherche du dernier PC gaming, des périphériques les plus performants, ou des snacks et boissons pour vos sessions de jeu marathons, nous avons tout ce qu'il vous faut. Découvrez notre sélection et faites de votre espace de jeu un véritable paradis.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="relative">
            <img src="/setup-gaming.jpg" alt="Gaming Setup" className="w-full h-full object-cover rounded-lg shadow-lg" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <h2 className="text-white text-2xl font-bold">Setups Gaming</h2>
            </div>
          </div>
          <div className="relative">
            <img src="/pc.jpg" alt="PC Gaming" className="w-full h-full object-cover rounded-lg shadow-lg" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <h2 className="text-white text-2xl font-bold">PC Gaming</h2>
            </div>
          </div>
          <div className="relative">
            <img src="/snack.webp" alt="Gaming Snacks" className="w-full h-full object-cover rounded-lg shadow-lg" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <h2 className="text-white text-2xl font-bold">Snacks & Boissons</h2>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl lg:text-4xl">Avis </h2>
          <p className="mt-4 text-lg font-normal text-gray-500 lg:text-xl">
            Voici ce que disent nos clients :
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Comment
              name="Damien Raunier"
              dateJoined="Juillet 2024"
              rating={2}
              title="Je pense en acheter un autre !"
              reviewDate="15 juillet 2024"
              reviewText="J'adore Hitema, c'est faux c trop de la merde"
              helpfulCount={1259}
            />
            <Comment
              name="Baptiste RINGLER"
              dateJoined="Juin 2024"
              rating={5}
              title="Parfait pour les longues sessions de jeu !"
              reviewDate="15 juillet 2024"
              reviewText="Les snacks et boissons disponibles sont parfaits pour mes sessions de jeu marathon. Je recommande vivement !"
              helpfulCount={25}
            />
            <Comment
              name="Romain CASCIO"
              dateJoined="Juin 2024"
              rating={5}
              title="Meilleur magasin de jeux !"
              reviewDate="15 juillet 2024"
              reviewText="Le meilleur endroit pour tous les gamers. Un large choix de produits et un service client au top !"
              helpfulCount={30}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
