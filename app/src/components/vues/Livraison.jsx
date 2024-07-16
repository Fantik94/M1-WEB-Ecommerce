import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';

const Livraison = () => {
  const descriptions = {
    1: 'Vérifiez les articles dans votre panier',
    2: 'Entrez votre adresse de livraison',
    3: 'Choisissez votre méthode de paiement',
    4: 'Commande terminée'
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Ajoutez ici la logique de traitement du formulaire si nécessaire
    navigate('/paiement');
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <ProgressBar currentStep={2} descriptions={descriptions} />
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Livraison</h2>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Adresse</label>
                    <input type="text" id="address" className="block w-full mt-1 rounded-lg border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400" required />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Ville</label>
                    <input type="text" id="city" className="block w-full mt-1 rounded-lg border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400" required />
                  </div>
                  <div>
                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Code Postal</label>
                    <input type="text" id="postal-code" className="block w-full mt-1 rounded-lg border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400" required />
                  </div>
                </div>
              </div>
              <button type="submit" className="w-full py-3 px-6 text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Suivant</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Livraison;
