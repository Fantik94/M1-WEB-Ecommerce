import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConfirmModal from '../vues/Confirm';
import { useNotification } from '../../context/NotificationContext';

const GestionCommande = () => {
  const [commandes, setCommandes] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedCommandeId, setSelectedCommandeId] = useState(null);
  const [editCommande, setEditCommande] = useState(null);
  const [orderStatus, setOrderStatus] = useState('');
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const response = await axios.get(`${apiUrl}/allorders`);
        setCommandes(response.data);
      } catch (error) {
        console.error('Error fetching commandes:', error);
      }
    };

    fetchCommandes();
  }, []);

  const handleEdit = (commande) => {
    setEditCommande(commande);
    setOrderStatus(commande.order_status);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/orders/${id}`);
      setCommandes(commandes.filter(commande => commande.order_id !== id));
      addNotification('Commande supprimée avec succès', 'success');
    } catch (error) {
      console.error('Error deleting commande:', error);
      addNotification('Erreur lors de la suppression de la commande', 'error');
    }
    setShowConfirmModal(false);
  };

  const confirmDelete = (id) => {
    setSelectedCommandeId(id);
    setShowConfirmModal(true);
  };

  const handleUpdate = async () => {
    if (!editCommande) {
      addNotification('Aucune commande sélectionnée pour la mise à jour', 'error');
      return;
    }
    const { order_id } = editCommande;
    const payload = { order_status: orderStatus };

    try {
      await axios.patch(`${apiUrl}/orders/${order_id}`, payload);
      setCommandes(commandes.map(commande => 
        commande.order_id === order_id ? { ...commande, order_status: orderStatus } : commande
      ));
      addNotification('Commande mise à jour avec succès', 'success');
      setEditCommande(null);
    } catch (error) {
      console.error('Error updating commande:', error);
      addNotification('Erreur lors de la mise à jour de la commande', 'error');
    }
  };

  return (
    <div className="p-6 bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Gestion des Commandes</h2>
      
      {editCommande && (
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <h3 className="text-xl font-bold mb-4">Modifier le statut de la commande #{editCommande.order_id}</h3>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Statut de la commande</label>
            <select
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="Validée">Validée</option>
              <option value="En cours d'acheminement">En cours d'acheminement</option>
              <option value="Livrée">Livrée</option>
              <option value="Annulée">Annulée</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none mr-2"
            >
              Mettre à jour
            </button>
            <button
              onClick={() => setEditCommande(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b dark:border-gray-700">ID</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Client</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Date de création</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Date de modification</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Total</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Statut de paiement</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Statut</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map((commande) => (
            <tr key={commande.order_id}>
              <td className="py-2 px-4 border-b dark:border-gray-700">{commande.order_id}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{commande.user_id}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{new Date(commande.created_at).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{new Date(commande.updated_at).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{commande.total_amount}€</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{commande.payment_status}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{commande.order_status}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">
                <button
                  onClick={() => handleEdit(commande)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded-lg mr-2 hover:bg-yellow-600 focus:outline-none"
                >
                  Modifier
                </button>
                <button
                  onClick={() => confirmDelete(commande.order_id)}
                  className="px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => handleDelete(selectedCommandeId)}
        message="Êtes-vous sûr de vouloir supprimer cette commande ?"
      />
    </div>
  );
};

export default GestionCommande;
