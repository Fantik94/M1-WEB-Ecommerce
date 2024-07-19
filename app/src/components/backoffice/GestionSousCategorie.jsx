import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/AxiosInstance';
import SousCategorieForm from '../forms/SousCategorie';
import ConfirmModal from '../vues/Confirm';
import { useNotification } from '../../context/NotificationContext';

const GestionSousCategorie = () => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { addNotification } = useNotification();

  const fetchSubCategories = async () => {
    try {
      const response = await axiosInstance.get('/allsubcategories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/subcategories/${id}`);
      setCategories(categories.filter(category => category.subcategory_id !== id));
      addNotification('Sous-catégorie supprimée avec succès', 'success');
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      addNotification('Erreur lors de la suppression de la sous-catégorie', 'error');
    }
    setShowConfirmModal(false);
  };

  const confirmDelete = (id) => {
    setSelectedCategoryId(id);
    setShowConfirmModal(true);
  };

  const handleAdd = () => {
    setCurrentCategory(null);
    setShowForm(true);
  };

  const handleSave = async (formData) => {
    try {
      if (currentCategory) {
        // Update subcategory
        await axiosInstance.patch(`/subcategories/${currentCategory.subcategory_id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        addNotification('Sous-catégorie mise à jour avec succès', 'success');
      } else {
        // Add new subcategory
        await axiosInstance.post('/subcategories', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        addNotification('Sous-catégorie ajoutée avec succès', 'success');
      }
      setShowForm(false);
      fetchSubCategories(); // Refresh the subcategories list
    } catch (error) {
      console.error('Error saving subcategory:', error);
      addNotification('Erreur lors de la sauvegarde de la sous-catégorie', 'error');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="p-6 bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Gestion des Sous-Catégories</h2>
      <button
        onClick={handleAdd}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
      >
        Ajouter une sous-catégorie
      </button>
      {showForm && <SousCategorieForm currentCategory={currentCategory} onSave={handleSave} onCancel={handleCancel} />}
      <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b dark:border-gray-700">ID</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Image</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Nom de la sous-catégorie</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Nom de la catégorie</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Description</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.subcategory_id}>
              <td className="py-2 px-4 border-b dark:border-gray-700">{category.subcategory_id}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">
                <img src={`${category.image}`} alt={category.name} className="w-16 h-16 object-cover rounded-md" />
              </td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{category.name}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{category.category_name}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{category.description}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">
                <button
                  onClick={() => handleEdit(category)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded-lg mr-2 hover:bg-yellow-600 focus:outline-none"
                >
                  Modifier
                </button>
                <button
                  onClick={() => confirmDelete(category.subcategory_id)}
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
        message="Êtes-vous sûr de vouloir supprimer cette sous-catégorie ?"
      />
    </div>
  );
};

export default GestionSousCategorie;
