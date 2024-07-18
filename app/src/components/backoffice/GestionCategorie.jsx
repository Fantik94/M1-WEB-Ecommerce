import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryForm from '../forms/Categorie';
import ConfirmModal from '../vues/Confirm'; // Importer le composant ConfirmModal
import { useNotification } from '../../context/NotificationContext'; // Importer le contexte de notification

const GestionCategorie = () => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // État pour la boîte de dialogue de confirmation
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // État pour l'ID de la catégorie sélectionnée
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { addNotification } = useNotification(); // Destructure addNotification from useNotification

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/categories/${id}`);
      setCategories(categories.filter(category => category.category_id !== id));
      addNotification('Catégorie supprimée avec succès', 'success');
    } catch (error) {
      console.error('Error deleting category:', error);
      addNotification('Erreur lors de la suppression de la catégorie', 'error');
    }
    setShowConfirmModal(false); // Fermer la boîte de dialogue après suppression
  };

  const confirmDelete = (id) => {
    setSelectedCategoryId(id);
    setShowConfirmModal(true); // Ouvrir la boîte de dialogue de confirmation
  };

  const handleAdd = () => {
    setCurrentCategory(null);
    setShowForm(true);
  };

  const handleSave = async (formData) => {
    try {
      if (currentCategory) {
        // Modifier une catégorie
        await axios.patch(`${apiUrl}/categories/${currentCategory.category_id}`, formData);
        addNotification('Catégorie modifiée avec succès', 'success');
      } else {
        // Ajouter une nouvelle catégorie
        await axios.post(`${apiUrl}/categories`, formData);
        addNotification('Catégorie ajoutée avec succès', 'success');
      }
      setShowForm(false);
      fetchCategories(); // Actualiser la liste des catégories
    } catch (error) {
      console.error('Error saving category:', error);
      addNotification('Erreur lors de la sauvegarde de la catégorie', 'error');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="p-6 bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Gestion des Catégories</h2>
      <button
        onClick={handleAdd}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
      >
        Ajouter une catégorie
      </button>
      {showForm && <CategoryForm currentCategory={currentCategory} onSave={handleSave} onCancel={handleCancel} />}
      <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b dark:border-gray-700">ID</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Image de bannière</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Nom</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Description</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.category_id}>
              <td className="py-2 px-4 border-b dark:border-gray-700">{category.category_id}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">
                <img src={category.image} alt={category.name} className="w-16 h-16 object-cover rounded-md" />
              </td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{category.name}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{category.description}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">
                <button
                  onClick={() => handleEdit(category)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded-lg mr-2 hover:bg-yellow-600 focus:outline-none"
                >
                  Modifier
                </button>
                <button
                  onClick={() => confirmDelete(category.category_id)}
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
        onConfirm={() => handleDelete(selectedCategoryId)}
        message="Êtes-vous sûr de vouloir supprimer cette catégorie ?"
      />
    </div>
  );
};

export default GestionCategorie;
