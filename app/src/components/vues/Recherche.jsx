// Recherche.jsx

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Card2 from '../vues/Card2';

const Recherche = () => {
  const [results, setResults] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');

    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`${apiUrl}/search`, {
          params: { query }
        });
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [location.search]);

  return (
    <div className="p-4 dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8">
        Résultats de recherche
      </h2>
      <div className="flex flex-wrap justify-center">
        {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {results.map(product => (
                <Card2
                key={product.product_id}
                image={`${product.image1}`}
                title={product.name}
                price={product.price}
                link={`/produit/${product.product_id}`}
                />
            ))}
            </div>
        ) : (
            <p className="text-gray-800 dark:text-gray-200">Aucun produit trouvé.</p>
        )}
        </div>
    </div>
  );
};

export default Recherche;
