import React, { useEffect, useContext } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';


const Thanks = () => {



  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Merci pour votre commande ! 🎉</h2>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md w-full max-w-lg p-6 text-center">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          Vous pouvez consulter vos commandes en allant dans votre profil.
        </p>
        <Navigate to="/profil/orders" className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Voir mes commandes
        </Navigate>
      </div>
    </div>
  );
};

export default Thanks;
