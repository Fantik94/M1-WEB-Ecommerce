import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GestionSousCategorie = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/allsubcategories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleEdit = (id) => {
    console.log('Edit category with id:', id);
    // Handle edit functionality here
  };

  const handleDelete = (id) => {
    console.log('Delete category with id:', id);
    // Handle delete functionality here
  };

  const handleAdd = () => {
    console.log('Add new category');
    // Handle add functionality here
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
      <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b dark:border-gray-700">ID</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Nom de la sous-catégorie</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Nom de la catégorie</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.subcategory_id}>
              <td className="py-2 px-4 border-b dark:border-gray-700">{category.subcategory_id}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{category.name}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{category.category_name}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">
                <button
                  onClick={() => handleEdit(category.subcategory_id)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded-lg mr-2 hover:bg-yellow-600 focus:outline-none"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(category.subcategory_id)}
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

export default GestionSousCategorie;
