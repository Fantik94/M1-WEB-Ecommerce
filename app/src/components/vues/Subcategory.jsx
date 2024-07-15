// src/components/vues/Subcategory.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Subcategory = () => {
  const { subcategoryId } = useParams();
  const [subcategory, setSubcategory] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/subcategories/${subcategoryId}`)
      .then(response => {
        setSubcategory(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the subcategory details!", error);
      });
  }, [subcategoryId]);

  if (!subcategory) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{subcategory.name}</h1>
      <p>{subcategory.description}</p>
      {/* Afficher plus de détails sur la sous-catégorie ici */}
    </div>
  );
};

export default Subcategory;
