import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GestionCommande = () => {
  const [commandes, setCommandes] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

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
    console.log('Edit commande with id:', commande.commande_id);
    // Handle edit functionality here
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/commandes/${id}`);
      setCommandes(commandes.filter(commande => commande.commande_id !== id));
    } catch (error) {
      console.error('Error deleting commande:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Gestion des Commandes</h2>
      <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b dark:border-gray-700">ID</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Client</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Date de création</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Date de modification</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Total</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Statut</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map((commande) => (
            <tr key={commande.commande_id}>
              <td className="py-2 px-4 border-b dark:border-gray-700">{commande.order_id}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{commande.user_id}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{new Date(commande.created_at).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{new Date(commande.updated_at).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{commande.total_amount}€</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{commande.order_status}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">
                <button
                  onClick={() => handleEdit(commande)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded-lg mr-2 hover:bg-yellow-600 focus:outline-none"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(commande.commande_id)}
                  className="px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionCommande;
