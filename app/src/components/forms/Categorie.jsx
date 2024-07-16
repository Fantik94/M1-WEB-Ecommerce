import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryForm = ({ currentCategory, onSave, onCancel }) => {
  const [form, setForm] = useState({ name: '', description: '' });

  useEffect(() => {
    if (currentCategory) {
      setForm({
        name: currentCategory.name,
        description: currentCategory.description,
      });
    }
  }, [currentCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data submitted:', form);
    onSave(form);
    setForm({ name: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">
          Nom de la catégorie
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

export default CategoryForm;
