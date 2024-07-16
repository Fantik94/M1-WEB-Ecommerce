import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GestionCommande = () => {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/allorders');
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
      await axios.delete(`http://localhost:3000/commandes/${id}`);
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
            <th className="py-2 px-4 border-b dark:border-gray-700">Date</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Total</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Statut</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map((commande) => (
            <tr key={commande.commande_id}>
              <td className="py-2 px-4 border-b dark:border-gray-700">{commande.commande_id}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{commande.client_name}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{new Date(commande.date).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{commande.total.toFixed(2)}€</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{commande.status}</td>
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
