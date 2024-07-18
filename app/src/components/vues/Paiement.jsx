import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { PanierContext } from "../../context/PanierContext";
import AuthContext from "../../context/AuthContext";
import CommandeContext from "../../context/CommandeContext";
import axios from 'axios';
import { useNotification } from '../../context/NotificationContext';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';

const Paiement = () => {
  const { panier, getTotalPanier } = useContext(PanierContext);
  const { adresseLivraison } = useContext(CommandeContext);
  const descriptions = {
    1: 'Vérifiez les articles dans votre panier',
    2: 'Entrez votre adresse de livraison',
    3: 'Choisissez votre méthode de paiement',
    4: 'Commande terminée'
  };

  const { isAuthenticated } = useContext(AuthContext);
  const { addNotification } = useNotification();
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [numeroCarte, setNumeroCarte] = useState('');
  const [dateExpirationCarte, setDateExpirationCarte] = useState('');
  const [cvcCarte, setCvcCarte] = useState('');
  const [nomCarte, setNomCarte] = useState('');
  const [editingPaymentId, setEditingPaymentId] = useState(null);
  const [userId] = useState(sessionStorage.getItem('userId'));
  const [isFormVisible, setIsFormVisible] = useState(false);
  const totalHT = getTotalPanier();
  const totalTTC = totalHT * 1.20;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get(`${apiUrl}/payments/${userId}`);
      setPayments(response.data);
      if (response.data.length > 0) {
        setSelectedPayment(response.data[0].payments_id); // Sélectionner la première méthode de paiement par défaut
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des moyens de paiement:', error);
    }
  };

  const isValidCardNumber = (number) => {
    return /^[0-9]{16,20}$/.test(number.replace(/\s/g, ''));
  };

  const isValidCVC = (cvc) => {
    return /^[0-9]{3,4}$/.test(cvc);
  };

  const formatCardNumber = (number) => {
    return number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const maskCardNumber = (number) => {
    const lastFourDigits = number.slice(-4);
    return `**** **** **** ${lastFourDigits}`;
  };

  const handleCardNumberChange = (e) => {
    const formattedNumber = formatCardNumber(e.target.value);
    setNumeroCarte(formattedNumber);
  };

  const handleAddOrUpdatePayment = async (e) => {
    e.preventDefault();
    if (!isValidCardNumber(numeroCarte)) {
      addNotification('Le numéro de carte doit être entre 16 et 20 chiffres', 'error');
      return;
    }
    if (!isValidCVC(cvcCarte)) {
      addNotification('Le CVC doit être de 3 ou 4 chiffres', 'error');
      return;
    }

    const url = editingPaymentId
      ? `${apiUrl}/payments/${userId}/${editingPaymentId}`
      : `${apiUrl}/payments/${userId}`;
    const method = editingPaymentId ? 'patch' : 'post';

    try {
      const response = await axios[method](url, {
        numero_carte: numeroCarte.replace(/\s/g, ''),
        date_expiration_carte: dateExpirationCarte,
        cvc_carte: cvcCarte,
        nom_carte: nomCarte
      });

      if (response.status === 200 || response.status === 201) {
        fetchPayments(); // Refresh the payment list
        setNumeroCarte('');
        setDateExpirationCarte('');
        setCvcCarte('');
        setNomCarte('');
        addNotification(editingPaymentId ? 'Moyen de paiement mis à jour avec succès' : 'Moyen de paiement ajouté avec succès', 'success');
        setIsFormVisible(false);
        setEditingPaymentId(null);
      }
    } catch (error) {
      console.error(`Erreur lors de ${editingPaymentId ? 'la mise à jour' : 'l\'ajout'} du moyen de paiement:`, error);
      addNotification(`Erreur lors de ${editingPaymentId ? 'la mise à jour' : 'l\'ajout'} du moyen de paiement`, 'error');
    }
  };

  const handleEditPayment = (payment) => {
    setEditingPaymentId(payment.payments_id);
    setNumeroCarte(formatCardNumber(payment.numero_carte));
    setDateExpirationCarte(payment.date_expiration_carte);
    setCvcCarte(payment.cvc_carte);
    setNomCarte(payment.nom_carte);
    setIsFormVisible(true);
  };

  const handleDeletePayment = async (paymentId) => {
    try {
      const response = await axios.delete(`${apiUrl}/payments/${userId}/${paymentId}`);
      if (response.status === 200) {
        fetchPayments(); // Refresh the payment list
        addNotification('Moyen de paiement supprimé avec succès', 'success');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du moyen de paiement:', error);
      addNotification('Erreur lors de la suppression du moyen de paiement', 'error');
    }
  };

  const handlePaymentSelection = (e) => {
    const paymentId = e.target.value;
    setSelectedPayment(paymentId);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedPayment) {
      addNotification('Veuillez sélectionner ou ajouter une méthode de paiement.', 'error');
      return;
    }

    if (!adresseLivraison) {
      addNotification('Veuillez sélectionner ou ajouter une adresse de livraison.', 'error');
      navigate('/livraison');
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/orders`, {
        user_id: userId,
        total_amount: totalTTC,
        shipping_address: `${adresseLivraison.street}, ${adresseLivraison.city}, ${adresseLivraison.state}, ${adresseLivraison.postal_code}, ${adresseLivraison.country}`,
        payment_status: 'Paid',
        order_status: 'Processing'
      });

      if (response.status === 201) {
        addNotification('Commande créée avec succès', 'success');
        navigate('/thanks');
      } else {
        addNotification('Erreur lors de la création de la commande', 'error');
      }
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      addNotification('Erreur lors de la création de la commande', 'error');
    }
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <ProgressBar currentStep={3} descriptions={descriptions} />
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Paiement</h2>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            {payments.length > 0 && (
              <div className="mb-6">
                <label htmlFor="payment-select" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Sélectionner une méthode de paiement</label>
                <select
                  id="payment-select"
                  value={selectedPayment}
                  onChange={handlePaymentSelection}
                  className="block w-full mt-1 rounded-lg border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                >
                  {payments.map((payment) => (
                    <option key={payment.payments_id} value={payment.payments_id}>
                      {maskCardNumber(payment.numero_carte)}, {payment.date_expiration_carte}, {payment.nom_carte}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={() => setIsFormVisible(!isFormVisible)}
              className="flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isFormVisible ? 'Masquer le formulaire' : 'Ajouter / Modifier une méthode de paiement'}
              {isFormVisible ? <ChevronUpIcon className="ml-2 h-5 w-5" /> : <ChevronDownIcon className="ml-2 h-5 w-5" />}
            </button>

            {isFormVisible && (
              <form className="space-y-6 mt-4" onSubmit={handleAddOrUpdatePayment}>
                <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Numéro de Carte</label>
                      <input
                        type="text"
                        id="card-number"
                        value={numeroCarte}
                        onChange={handleCardNumberChange}
                        className="block w-full mt-1 rounded-lg border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Date d'expiration</label>
                      <input
                        type="date"
                        id="expiry-date"
                        value={dateExpirationCarte}
                        onChange={(e) => setDateExpirationCarte(e.target.value)}
                        className="block w-full mt-1 rounded-lg border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-200">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        value={cvcCarte}
                        onChange={(e) => setCvcCarte(e.target.value)}
                        className="block w-full mt-1 rounded-lg border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="card-name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nom sur la carte</label>
                      <input
                        type="text"
                        id="card-name"
                        value={nomCarte}
                        onChange={(e) => setNomCarte(e.target.value)}
                        className="block w-full mt-1 rounded-lg border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button type="submit" className="w-full py-3 px-6 text-sm font-semibold rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    {editingPaymentId ? 'Mettre à jour la méthode de paiement' : 'Ajouter la méthode de paiement'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsFormVisible(false);
                      setEditingPaymentId(null);
                      setNumeroCarte('');
                      setDateExpirationCarte('');
                      setCvcCarte('');
                      setNomCarte('');
                    }}
                    className="w-full py-3 px-6 text-sm font-semibold rounded-lg text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            )}

            {payments.length > 0 && (
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
                    <dd className="text-base font-medium text-green-600">-{new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(totalHT * 0.2)}</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Taxe</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">20 % TVA</dd>
                  </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-300 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">Total TTC</dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">{new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(totalTTC)}</dd>
                </dl>
              </div>

              <button
                onClick={handleSubmit}
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

export default Paiement;
