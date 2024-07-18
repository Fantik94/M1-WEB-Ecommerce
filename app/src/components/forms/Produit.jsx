import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ currentProduct, onSave, onCancel }) => {
  const [form, setForm] = useState({
    subcategory_id: '',
    name: '',
    description: '',
    price: '',
    stock: '',
    image1: null,
    image2: null,
    image3: null,
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
        image1: null,
        image2: null,
        image3: null,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setForm({ ...form, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('subcategory_id', form.subcategory_id);
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('stock', form.stock);
    if (form.image1) formData.append('image1', form.image1);
    if (form.image2) formData.append('image2', form.image2);
    if (form.image3) formData.append('image3', form.image3);
    
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="subcategory_id">
          Sous-catégorie
        </label>
        <select
          id="subcategory_id"
          name="subcategory_id"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={form.subcategory_id}
          onChange={handleChange}
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
          name="name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={form.description}
          onChange={handleChange}
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
          name="price"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={form.price}
          onChange={handleChange}
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
          name="stock"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={form.stock}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="image1">
          Image 1
        </label>
        <input
          type="file"
          id="image1"
          name="image1"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleFileChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="image2">
          Image 2
        </label>
        <input
          type="file"
          id="image2"
          name="image2"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleFileChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="image3">
          Image 3
        </label>
        <input
          type="file"
          id="image3"
          name="image3"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleFileChange}
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
