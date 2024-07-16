import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { PanierContext } from "../../context/PanierContext";
import AuthContext from "../../context/AuthContext";

const Livraison = () => {
  const {
    ajouter,
    panier,
    retirer,
    supprimer,
    nombreProduits,
    getTotalProduit,
    getTotalPanier,
  } = useContext(PanierContext);

  const { isAuthenticated } = useContext(AuthContext);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const totalHT = getTotalPanier();
  const totalTTC = totalHT * 1.20;
  const discountedTotal = totalHT * (1 - discount) * 1.20;
  const savings = totalHT * discount * 1.20;
  
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

      <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-300 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">Récapitulatif de la commande</p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Prix d'origine</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">{new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(totalHT)}</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Économies</dt>
                    <dd className="text-base font-medium text-green-600">-{new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(savings)}</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Taxe</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">20 % TVA</dd>
                  </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-300 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">Total TTC</dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">{new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(discountedTotal)}</dd>
                </dl>
              </div>

              <button
                className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {isAuthenticated ? "Procéder au paiement" : "Se connecter"}
              </button>

              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> ou </span>
                <Link to="/rechercher" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                  Continuer vos achats
                  <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
    </section>
  );
};

export default Livraison;
