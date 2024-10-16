import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/AxiosInstance'; // Importez l'instance Axios personnalisée
import ProductForm from '../forms/Produit';
import ConfirmModal from '../vues/Confirm';
import { useNotification } from '../../context/NotificationContext';

const GestionProduits = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const imageUrl = import.meta.env.VITE_IMAGE_BASE_URL;
  const { addNotification } = useNotification();

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/products');
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
      await axiosInstance.delete(`/products/${id}`);
      setProducts(products.filter(product => product.product_id !== id));
      addNotification('Produit supprimé avec succès', 'success');
    } catch (error) {
      console.error('Error deleting product:', error);
      addNotification('Erreur lors de la suppression du produit', 'error');
    }
    setShowConfirmModal(false);
  };

  const confirmDelete = (id) => {
    setSelectedProductId(id);
    setShowConfirmModal(true);
  };

  const handleAdd = () => {
    setCurrentProduct(null);
    setShowForm(true);
  };

  const handleSave = async (form) => {
    try {
      if (currentProduct) {
        // Modifier un produit
        await axiosInstance.patch(`/products/${currentProduct.product_id}`, form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        addNotification('Produit mis à jour avec succès', 'success');
      } else {
        // Ajouter un produit
        await axiosInstance.post('/products', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        addNotification('Produit ajouté avec succès', 'success');
      }
      setShowForm(false);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      addNotification('Erreur lors de la sauvegarde du produit', 'error');
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
                <img src={`${product.image1}`} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
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
                  onClick={() => confirmDelete(product.product_id)}
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
        onConfirm={() => handleDelete(selectedProductId)}
        message="Êtes-vous sûr de vouloir supprimer ce produit ?"
      />
    </div>
  );
};

export default GestionProduits;
