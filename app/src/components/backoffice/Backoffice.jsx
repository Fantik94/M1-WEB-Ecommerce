import React from 'react';
import { Link } from 'react-router-dom';

const Backoffice = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-800">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="mr-2">
            <Link to="/backoffice/gestion-utilisateur" className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
              <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                
              </svg>
              Gestion Utilisateurs
            </Link>
          </li>
          <li className="mr-2">
            <Link to="/backoffice/gestion-commande" className="inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="page">
              <svg className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                
              </svg>
              Gestion des Commandes
            </Link>
          </li>
          <li className="mr-2">
            <Link to="/backoffice/gestion-categorie" className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
              <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                
              </svg>
              Gestion 
            </Link>
          </li>
          <li className="mr-2">
            <Link to="/backoffice/gestion-sous-categorie" className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
              <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                
              </svg>
              Contacts
            </Link>
          </li>
          <li>
            <span className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">Disabled</span>
          </li>
        </ul>
      </div>

      <div className="p-6 bg-gray-50 dark:bg-gray-800 text-medium text-gray-500 dark:text-gray-400 rounded-lg w-full flex-grow">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Mes Adresses</h3>
        <p>This is some placeholder content for the Addresses tab.</p>
      </div>
    </div>
  );
};

export default Backoffice;
