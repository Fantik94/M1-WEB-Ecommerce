import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { PanierContext } from "../../context/PanierContext";
import AuthContext from "../../context/AuthContext";
import axios from 'axios';
import { useNotification } from '../../context/NotificationContext';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';

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

  const descriptions = {
    1: 'Vérifiez les articles dans votre panier',
    2: 'Entrez votre adresse de livraison',
    3: 'Choisissez votre méthode de paiement',
    4: 'Commande terminée'
  };

  const { isAuthenticated } = useContext(AuthContext);
  const { addNotification } = useNotification();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [userId] = useState(localStorage.getItem('userId'));
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const totalHT = getTotalPanier();
  const totalTTC = totalHT * 1.20;
  const discountedTotal = totalHT * (1 - discount) * 1.20;
  const savings = totalHT * discount * 1.20;

  const navigate = useNavigate();

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/addresses/${userId}`);
      setAddresses(response.data);
      if (response.data.length > 0) {
        setSelectedAddress(response.data[0].address_id); // Sélectionner la première adresse par défaut
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des adresses:', error);
    }
  };

  const handleAddressSelection = (e) => {
    const addressId = e.target.value;
    setSelectedAddress(addressId);
    const address = addresses.find(addr => addr.address_id === addressId);
    if (address) {
      setStreet(address.street);
      setCity(address.city);
      setState(address.state);
      setPostalCode(address.postal_code);
      setCountry(address.country);
      setIsFormVisible(false);
    }
  };

  const handleAddOrUpdateAddress = async (e) => {
    e.preventDefault();
    const url = selectedAddress
      ? `http://localhost:3000/addresses/${userId}/${selectedAddress}`
      : `http://localhost:3000/addresses/${userId}`;
    const method = selectedAddress ? 'put' : 'post';
    try {
      const response = await axios[method](url, {
        street,
        city,
        state,
        postal_code: postalCode,
        country
      });
      if (response.status === 200 || response.status === 201) {
        fetchAddresses(); // Refresh the address list
        setStreet('');
        setCity('');
        setState('');
        setPostalCode('');
        setCountry('');
        addNotification(selectedAddress ? 'Adresse mise à jour avec succès' : 'Adresse ajoutée avec succès', 'success');
        setIsFormVisible(false);
      }
    } catch (error) {
      console.error(`Erreur lors de ${selectedAddress ? 'la mise à jour' : 'l\'ajout'} de l\'adresse:`, error);
      addNotification(`Erreur lors de ${selectedAddress ? 'la mise à jour' : 'l\'ajout'} de l\'adresse`, 'error');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedAddress) {
      console.log('Adresse de livraison sélectionnée:', selectedAddress);
      navigate('/paiement');
    } else {
      addNotification('Veuillez sélectionner ou ajouter une adresse de livraison.', 'error');
    }
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <ProgressBar currentStep={2} descriptions={descriptions} />
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Livraison</h2>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            {addresses.length > 0 && (
              <div className="mb-6">
                <label htmlFor="address-select" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Sélectionner une adresse de livraison</label>
                <select
                  id="address-select"
                  value={selectedAddress}
                  onChange={handleAddressSelection}
                  className="block w-full mt-1 rounded-lg border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                >
                  {addresses.map((address) => (
                    <option key={address.address_id} value={address.address_id}>
                      {address.street}, {address.city}, {address.state}, {address.postal_code}, {address.country}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={() => setIsFormVisible(!isFormVisible)}
              className="flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isFormVisible ? 'Masquer le formulaire' : 'Ajouter / Modifier une adresse'}
              {isFormVisible ? <ChevronUpIcon className="ml-2 h-5 w-5" /> : <ChevronDownIcon className="ml-2 h-5 w-5" />}
            </button>

            {isFormVisible && (
              <form className="space-y-6 mt-4" onSubmit={handleAddOrUpdateAddress}>
                <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="street" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Rue</label>
                      <input type="text" id="street" value={street} onChange={(e) => setStreet(e.target.value)} className="block w-full mt-1 rounded-lg border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400" required />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Ville</label>
                      <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} className="block w-full mt-1 rounded-lg border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400" required />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-200">État / Région</label>
                      <input type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} className="block w-full mt-1 rounded-lg border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400" required />
                    </div>
                    <div>
                      <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Code Postal</label>
                      <input type="text" id="postal-code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="block w-full mt-1 rounded-lg border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400" required />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Pays</label>
                      <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} className="block w-full mt-1 rounded-lg border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400" required />
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button type="submit" className="w-full py-3 px-6 text-sm font-semibold rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    {selectedAddress ? 'Mettre à jour l\'adresse' : 'Ajouter l\'adresse'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsFormVisible(false);
                      setSelectedAddress(null);
                      setStreet('');
                      setCity('');
                      setState('');
                      setPostalCode('');
                      setCountry('');
                    }}
                    className="w-full py-3 px-6 text-sm font-semibold rounded-lg text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            )}

            {addresses.length > 0 && (
              <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
                <button type="submit" className="w-full py-3 px-6 text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Suivant</button>
              </form>
            )}
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
        </div>
      </div>
    </section>
  );
};

export default Livraison;
