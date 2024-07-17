import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNotification } from '../../context/NotificationContext';

const PaymentMethods = () => {
  const { addNotification } = useNotification();
  const [payments, setPayments] = useState([]);
  const [numeroCarte, setNumeroCarte] = useState('');
  const [dateExpirationCarte, setDateExpirationCarte] = useState('');
  const [cvcCarte, setCvcCarte] = useState('');
  const [nomCarte, setNomCarte] = useState('');
  const [editingPaymentId, setEditingPaymentId] = useState(null);
  const [userId] = useState(localStorage.getItem('userId'));
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get(`${apiUrl}/payments/${userId}`);
      setPayments(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des moyens de paiement:', error);
    }
  };

  const isValidCardNumber = (number) => {
    return /^[0-9]{16,20}$/.test(number);
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

  const addPayment = async (e) => {
    e.preventDefault();
    if (!isValidCardNumber(numeroCarte.replace(/\s/g, ''))) {
      addNotification('Le numéro de carte doit être entre 16 et 20 chiffres', 'error');
      return;
    }
    if (!isValidCVC(cvcCarte)) {
      addNotification('Le CVC doit être de 3 ou 4 chiffres', 'error');
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/payments/${userId}`, {
        numero_carte: numeroCarte.replace(/\s/g, ''),
        date_expiration_carte: dateExpirationCarte,
        cvc_carte: cvcCarte,
        nom_carte: nomCarte
      });
      if (response.status === 201) {
        fetchPayments(); // Refresh the payment list
        setNumeroCarte('');
        setDateExpirationCarte('');
        setCvcCarte('');
        setNomCarte('');
        addNotification('Moyen de paiement ajouté avec succès', 'success');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du moyen de paiement:', error);
      addNotification('Erreur lors de l\'ajout du moyen de paiement', 'error');
    }
  };

  const deletePayment = async (paymentId) => {
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

  const editPayment = (payment) => {
    setEditingPaymentId(payment.payments_id);
    setNumeroCarte(payment.numero_carte);
    setDateExpirationCarte(payment.date_expiration_carte);
    setCvcCarte(payment.cvc_carte);
    setNomCarte(payment.nom_carte);
  };

  const updatePayment = async (e) => {
    e.preventDefault();
    if (!isValidCardNumber(numeroCarte.replace(/\s/g, ''))) {
      addNotification('Le numéro de carte doit être entre 16 et 20 chiffres', 'error');
      return;
    }
    if (!isValidCVC(cvcCarte)) {
      addNotification('Le CVC doit être de 3 ou 4 chiffres', 'error');
      return;
    }
    try {
      const response = await axios.patch(`${apiUrl}/payments/${userId}/${editingPaymentId}`, {
        numero_carte: numeroCarte.replace(/\s/g, ''),
        date_expiration_carte: dateExpirationCarte,
        cvc_carte: cvcCarte,
        nom_carte: nomCarte
      });
      if (response.status === 200) {
        fetchPayments(); // Refresh the payment list
        setNumeroCarte('');
        setDateExpirationCarte('');
        setCvcCarte('');
        setNomCarte('');
        setEditingPaymentId(null);
        addNotification('Moyen de paiement mis à jour avec succès', 'success');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du moyen de paiement:', error);
      addNotification('Erreur lors de la mise à jour du moyen de paiement', 'error');
    }
  };

  return (
    <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Mes moyens de paiement</h3>
      <form onSubmit={editingPaymentId ? updatePayment : addPayment} className="mb-4 space-y-4">
        <div>
          <label htmlFor="numeroCarte" className="block text-gray-700 dark:text-gray-200">Numéro de carte:</label>
          <input
            id="numeroCarte"
            type="text"
            value={numeroCarte}
            onChange={handleCardNumberChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="dateExpirationCarte" className="block text-gray-700 dark:text-gray-200">Date d'expiration:</label>
          <input
            id="dateExpirationCarte"
            type="date"
            value={dateExpirationCarte}
            onChange={(e) => setDateExpirationCarte(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="cvcCarte" className="block text-gray-700 dark:text-gray-200">CVC:</label>
          <input
            id="cvcCarte"
            type="text"
            value={cvcCarte}
            onChange={(e) => setCvcCarte(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="nomCarte" className="block text-gray-700 dark:text-gray-200">Nom sur la carte:</label>
          <input
            id="nomCarte"
            type="text"
            value={nomCarte}
            onChange={(e) => setNomCarte(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          {editingPaymentId ? 'Mettre à jour le moyen de paiement' : 'Ajouter le moyen de paiement'}
        </button>
        {editingPaymentId && (
          <button
            type="button"
            onClick={() => {
              setEditingPaymentId(null);
              setNumeroCarte('');
              setDateExpirationCarte('');
              setCvcCarte('');
              setNomCarte('');
            }}
            className="ml-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Annuler
          </button>
        )}
      </form>
      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Moyens de paiement existants</h4>
      <ul className="space-y-2">
        {payments.map(payment => (
          <li key={payment.payments_id} className="p-4 border border-gray-300 rounded flex justify-between items-center">
            <span>{maskCardNumber(payment.numero_carte)}, {payment.date_expiration_carte}, {payment.nom_carte}</span>
            <div className="flex space-x-2">
              <button onClick={() => editPayment(payment)} className="text-blue-500 hover:text-blue-700">
                Modifier
              </button>
              <button onClick={() => deletePayment(payment.payments_id)} className="text-red-500 hover:text-red-700">
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentMethods;
