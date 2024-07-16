// src/components/vues/Alimentation.jsx
import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import Card from './Card';
import axios from 'axios';

const Alimentation = () => {
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/subcategories?category_id=2')
      .then(response => {
        setSubcategories(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the subcategories!", error);
      });
  }, []);

  return (
    <div className='dark:bg-gray-900'>
      <Banner text="Découvrez notre sélection d'aliments" image="/categories/banner_food.webp" />
      <div className="p-4">
        <h1 className="mb-4 text-center text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Alimentation
          </span>
        </h1>
        <p className="text-lg text-center font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Explorez notre sélection de produits alimentaires.
        </p>
        <br />
        <div className="flex flex-wrap justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subcategories.map(subcategory => (
              <Card
                key={subcategory.subcategory_id}
                image={`/subcategories/${subcategory.name}.webp`}
                title={subcategory.name}
                description={subcategory.description}
                link={`/categories/2/subcategories/${subcategory.subcategory_id}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alimentation;
