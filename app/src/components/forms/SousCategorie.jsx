import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SousCategorieForm = ({ currentCategory, onSave, onCancel }) => {
  const [form, setForm] = useState({ name: '', category_id: '', description: '' });
  const [image, setImage] = useState(null);  // State for image file
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    if (currentCategory) {
      setForm({
        name: currentCategory.name,
        category_id: currentCategory.category_id,
        description: currentCategory.description,
      });
      setImage(currentCategory.image);  // Load current image if available
    }
  }, [currentCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/categories');
        setAllCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('category_id', form.category_id);
    formData.append('description', form.description);
    if (image) {
      formData.append('image', image);
    }
    console.log('Form data submitted:', form);
    onSave(formData);
    setForm({ name: '', category_id: '', description: '' });
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg" encType="multipart/form-data">
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">
          Nom de la sous-catégorie
        </label>
        <input
          type="text"
          id="name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="category_id">
          Catégorie
        </label>
        <select
          id="category_id"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={form.category_id}
          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          required
        >
          <option value="">Sélectionnez une catégorie</option>
          {allCategories.map((cat) => (
            <option key={cat.category_id} value={cat.category_id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="image">
          Image
        </label>
        <input
          type="file"
          id="image"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleImageChange}
        />
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          {currentCategory ? 'Modifier' : 'Ajouter'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none"
        >
          Annuler
        </button>
      </div>
    </form>
  );
};

export default SousCategorieForm;
