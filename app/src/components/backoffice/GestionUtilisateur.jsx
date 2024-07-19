import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/AxiosInstance';
import ConfirmModal from '../vues/Confirm';
import { useNotification } from '../../context/NotificationContext';

const GestionUtilisateur = () => {
  const [users, setUsers] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/users/${id}`);
      setUsers(users.filter(user => user.user_id !== id));
      addNotification('Utilisateur supprimé avec succès', 'success');
    } catch (error) {
      console.error('Error deleting user:', error);
      addNotification('Erreur lors de la suppression de l\'utilisateur', 'error');
    }
    setShowConfirmModal(false); // Fermer la boite de dialoge
  };

  const confirmDelete = (id) => {
    setSelectedUserId(id);
    setShowConfirmModal(true);
  };

  return (
    <div className="p-6 bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Gestion des Utilisateurs</h2>
      <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b dark:border-gray-700">ID</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Nom</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Email</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Date de création</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Date de modification</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td className="py-2 px-4 border-b dark:border-gray-700">{user.user_id}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{user.username}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{user.email}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{new Date(user.created_at).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{new Date(user.updated_at).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">
                <button
                  onClick={() => confirmDelete(user.user_id)}
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
        onConfirm={() => handleDelete(selectedUserId)}
        message="Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
      />
    </div>
  );
};

export default GestionUtilisateur;
