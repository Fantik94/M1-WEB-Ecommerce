import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { PanierContext } from "../../context/PanierContext";
import AuthContext from "../../context/AuthContext";

const Panier = () => {
  const {
    ajouter,
    panier,
    retirer,
    supprimer,
    nombreProduits,
    getTotalProduit,
    getTotalPanier,
  } = useContext(PanierContext);

  const imageUrl = import.meta.env.VITE_IMAGE_BASE_URL;
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const totalHT = getTotalPanier();
  const totalTTC = totalHT * 1.20;

  const handleApplyPromoCode = (e) => {
    e.preventDefault();
    if (promoCode === "caca") {
      setDiscount(0.99); // 99% discount
    } else {
      setDiscount(0);
    }
  };

  const discountedTotal = totalHT * (1 - discount) * 1.20;
  const savings = totalHT * discount * 1.20;

  const descriptions = {
    1: 'Vérifiez les articles dans votre panier',
    2: 'Entrez votre adresse de livraison',
    3: 'Choisissez votre méthode de paiement',
    4: 'Commande terminée'
  };

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/livraison');
    } else {
      navigate('/login');
    }
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <ProgressBar currentStep={1} descriptions={descriptions} />
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Panier</h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              
              {panier.length === 0 ? (
                <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                  <center>
                    <p className="text-base font-medium text-gray-900 dark:text-white">Votre panier est vide. ☹️</p>
                    <br />
                    <Link to="/recherche" className="flex w-[200px] items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                      Voir notre catalogue
                    </Link>
                  </center>
                </div>
              ) : null}

              <div className="space-y-4">
                {panier.map(produit => (
                  <div key={produit.product_id} className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <Link to={`/produit/${produit.product_id}`} className="shrink-0 md:order-1">
                        <img className="h-20 w-20 dark:hidden" src={`${produit.image1}`} alt={produit.name} />
                        <img className="hidden h-20 w-20 dark:block" src={`${produit.image1}`} alt={produit.name} />
                      </Link>

                      <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                      <div className="flex flex-col items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                          <button type="button" onClick={() => retirer(produit)} className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                            <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                            </svg>
                          </button>
                          <input type="text" id="counter-input" className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" value={produit.quantite} readOnly />
                          <button type="button" onClick={() => ajouter(produit)} disabled={produit.quantite >= produit.stock} className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 ${produit.quantite >= produit.stock ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200'} focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700`}>
                            <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                            </svg>
                          </button>
                        </div>
                        {produit.quantite >= produit.stock && (
                          <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">Stock insuffisant</p>
                        )}
                      </div>

                      <div className="text-end md:order-4 md:w-32">
                        <p className="text-base font-bold text-gray-900 dark:text-white">{(produit.price * produit.quantite).toFixed(2)}€</p>
                      </div>

                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <Link to={`/produit/${produit.product_id}`} className="text-base font-medium text-gray-900 hover:underline dark:text-white">{produit.name}</Link>
                        <div className="flex items-center gap-4">
                          <button type="button" onClick={() => supprimer(produit)} className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                            <svg className="mr-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                            </svg>
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
                onClick={handleCheckout}
                className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {isAuthenticated ? "Étape suivante" : "Se connecter"}
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

            <div className="space-y-4 rounded-lg border border-gray-300 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <form className="space-y-4" onSubmit={handleApplyPromoCode}>
                <div>
                  <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Avez-vous un bon de réduction ou une carte cadeau? </label>
                  <input
                    type="text"
                    id="voucher"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder=""
                    required
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Appliquer le code
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Panier;
