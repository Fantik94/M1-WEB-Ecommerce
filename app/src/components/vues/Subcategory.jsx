// src/components/vues/Subcategory.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card2 from './Card2'; // Assurez-vous que le chemin vers Card2 est correct

const Subcategory = () => {
  const { categoryId, subcategoryId } = useParams();
  const [subcategory, setSubcategory] = useState(null);
  const [products, setProducts] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    // Récupérer les détails de la sous-catégorie
    axios.get(`${apiUrl}/categories/${categoryId}/subcategories/${subcategoryId}/products`)
      .then(response => {
        setSubcategory(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the subcategory details!", error);
      });

    // Récupérer les produits de la sous-catégorie
    axios.get(`${apiUrl}/categories/${categoryId}/subcategories/${subcategoryId}/products`)
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
      <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8">
        Sous-Catégories
      </h2>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{subcategory.name}</h1>
      <div className="flex flex-wrap justify-center">
          
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {products.map(product => (
          <Card2
            key={product.product_id}
            image={`/images/${product.product_id}-1.jpg`}
            title={product.name}
            price={product.price}
            link={`/produit/${product.product_id}`}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default Subcategory;
