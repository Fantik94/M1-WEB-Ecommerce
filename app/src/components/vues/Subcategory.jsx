import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Subcategory = () => {
  const { categoryId, subcategoryId } = useParams();
  const [subcategory, setSubcategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Récupérer les détails de la sous-catégorie
    axios.get(`http://localhost:3000/categories/${categoryId}/subcategories/${subcategoryId}/products`)
      .then(response => {
        setSubcategory(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the subcategory details!", error);
      });

    // Récupérer les produits de la sous-catégorie
    axios.get(`http://localhost:3000/categories/${categoryId}/subcategories/${subcategoryId}/products`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, [categoryId, subcategoryId]);

  if (!subcategory) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 dark:bg-gray-900">
      <h1 className="text-2xl font-bold">{subcategory.name}</h1>
      <p>{subcategory.description}</p>
      {/* Afficher les produits de la sous-catégorie */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {products.map(product => (
          <div key={product.product_id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img className="p-8 rounded-t-lg" src={`/images/${product.product_id}-1.jpg`} alt={product.name} />
            <div className="px-5 pb-5">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
              <p className="text-gray-700 dark:text-gray-400">{product.description}</p>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{product.price} €</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subcategory;
