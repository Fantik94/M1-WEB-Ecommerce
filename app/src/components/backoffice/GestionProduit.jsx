import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from '../forms/Produit';

const GestionProduits = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      setProducts(products.filter(product => product.product_id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleAdd = () => {
    setCurrentProduct(null);
    setShowForm(true);
  };

  const handleSave = async (form) => {
    try {
      if (currentProduct) {
        // Update product
        console.log('Updating product:', form);
        await axios.put(`http://localhost:3000/products/${currentProduct.product_id}`, form);
      } else {
        // Add new product
        console.log('Adding product:', form);
        await axios.post('http://localhost:3000/products', form);
      }
      setShowForm(false);
      fetchProducts(); // Refresh the products list
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="p-6 bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Gestion des Produits</h2>
      <button
        onClick={handleAdd}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
      >
        Ajouter un produit
      </button>
      {showForm && <ProductForm currentProduct={currentProduct} onSave={handleSave} onCancel={handleCancel} />}
      <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b dark:border-gray-700">ID</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Image</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Nom</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Description</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Prix</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Stock</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.product_id}>
              <td className="py-2 px-4 border-b dark:border-gray-700">{product.product_id}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">
                <img src={`/images/${product.product_id}-1.jpg`} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
              </td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{product.name}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{product.description}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{product.price}€</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{product.stock}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">
                <button
                  onClick={() => handleEdit(product)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded-lg mr-2 hover:bg-yellow-600 focus:outline-none"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(product.product_id)}
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

export default GestionProduits;
