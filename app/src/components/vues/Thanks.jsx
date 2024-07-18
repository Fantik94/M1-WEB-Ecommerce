import React from 'react';
import { Link } from 'react-router-dom';


const Thanks = () => {



  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Merci pour votre commande ! 🎉</h2>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md w-full max-w-lg p-6 text-center">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          Vous pouvez consulter vos commandes en allant dans votre profil.
        </p>
        <Link to="/profil/orders" className="flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-700 dark:hover:bg-primary-800 dark:focus:ring-gray-900">
          Voir mes commandes
        </Link>
      </div>
    </div>
  );
};

export default Thanks;
