// src/forms/ProductForm.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ currentProduct, onSave, onCancel }) => {
  const [form, setForm] = useState({
    subcategory_id: '',
    name: '',
    description: '',
    price: '',
    stock: '',
  });
  const [subcategories, setSubcategories] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (currentProduct) {
      setForm({
        subcategory_id: currentProduct.subcategory_id,
        name: currentProduct.name,
        description: currentProduct.description,
        price: currentProduct.price,
        stock: currentProduct.stock,
      });
    }
  }, [currentProduct]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/allsubcategories`);
        setSubcategories(response.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSubcategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="subcategory_id">
          Sous-catégorie
        </label>
        <select
          id="subcategory_id"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={form.subcategory_id}
          onChange={(e) => setForm({ ...form, subcategory_id: e.target.value })}
          required
        >
          <option value="">Sélectionnez une sous-catégorie</option>
          {subcategories.map((sub) => (
            <option key={sub.subcategory_id} value={sub.subcategory_id}>
              {sub.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">
          Nom du produit
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
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="price">
          Prix
        </label>
        <input
          type="number"
          id="price"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="stock">
          Stock
        </label>
        <input
          type="number"
          id="stock"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          required
        />
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          {currentProduct ? 'Modifier' : 'Ajouter'}
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

export default ProductForm;
