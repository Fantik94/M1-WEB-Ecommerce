// src/components/vues/Gaming.jsx
import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import Card from './Card';
import axios from 'axios';

const Gaming = () => {
  const [subcategories, setSubcategories] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const imageUrl = import.meta.env.VITE_IMAGE_BASE_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/subcategories?category_id=1`)
      .then(response => {
        setSubcategories(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the subcategories!", error);
      });
  }, []);

  return (
    <div className='dark:bg-gray-900'>
      <Banner text="Découvrez l'univers du gaming" image={`${imageUrl}/categories/1.jpg`} />
      <div className="p-4">
        <h1 className="mb-4 text-center text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Gaming
          </span>
        </h1>
        <p className="text-lg text-center font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Explorez notre sélection de produits gaming.
        </p>
        <br />
        <div className="flex flex-wrap justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subcategories.map(subcategory => (
              <Card
                key={subcategory.subcategory_id}
                image={`${imageUrl}/subcategories/${subcategory.subcategory_id}.jpg`}
                title={subcategory.name}
                description={subcategory.description}
                link={`/categories/1/subcategories/${subcategory.subcategory_id}/products`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gaming;
