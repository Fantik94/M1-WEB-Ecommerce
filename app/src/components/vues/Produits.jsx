// src/components/vues/ProductDetail.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PanierContext } from "../../context/PanierContext";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { ajouter } = useContext(PanierContext);

  useEffect(() => {
    axios.get(`http://localhost:3000/products/${productId}`)
      .then(response => {
        setProduct(response.data);
        setMainImage(`/images/${response.data.product_id}-1.jpg`);
      })
      .catch(error => {
        console.error(`There was an error fetching the product ${productId}:`, error);
      });
  }, [productId]);

  useEffect(() => {
    axios.get(`http://localhost:3000/rng-products`)
      .then(response => {
        setSimilarProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the random products:', error);
      });
  }, []);

  const handleImageClick = (num) => {
    setMainImage(`/images/${product.product_id}-${num}.jpg`);
  };

  const handleAddToCart = () => {
    ajouter(product, quantity);
  };

  const handleIncrement = () => {
    setQuantity(prev => Math.min(prev + 1, product.stock));
  };

  const handleDecrement = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-md p-6 rounded-lg dark:shadow-gray-700 dark:bg-gray-800">
          <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            <div className="px-4 py-10 rounded-lg shadow-md relative dark:shadow-gray-700 dark:bg-gray-700">
              <img src={mainImage} alt={product.name} className="w-3/4 rounded object-cover mx-auto" />
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
              {['1', '2', '3'].map(num => (
                <div
                  key={num}
                  className="w-24 h-20 flex items-center justify-center rounded-lg p-4 shadow-md cursor-pointer dark:shadow-gray-700 dark:bg-gray-700"
                  onClick={() => handleImageClick(num)}
                >
                  <img src={`/images/${product.product_id}-${num}.jpg`} alt={`${product.name} ${num}`} className="w-full" />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold text-gray-800 dark:text-white">{product.name}</h2>

            <div className="flex space-x-2 mt-4">
              {[...Array(4)].map((_, i) => (
                <svg key={i} className="w-5 fill-primary-700 dark:fill-primary-300" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
              ))}
              <svg className="w-5 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <h4 className="text-gray-800 text-base dark:text-gray-200">500 Reviews</h4>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <p className="text-gray-800 text-3xl font-bold dark:text-white">{product.price}€</p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center">
                <button
                  type="button"
                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                  onClick={handleDecrement}
                >
                  <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                  </svg>
                </button>
                <input
                  type="text"
                  className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                  value={quantity}
                  readOnly
                />
                <button
                  type="button"
                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                  onClick={handleIncrement}
                >
                  <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <h4 className={`text-base ${product.stock < 1 ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-gray-200'}`}>
                Stock : {product.stock < 1 ? 0 : product.stock}
              </h4>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <button
                type="button"
                className={`min-w-[200px] px-4 py-3 ${product.stock < 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-700 hover:bg-blue-700'} text-white text-sm font-semibold rounded dark:bg-primary-600 dark:hover:bg-primary-500`}
                disabled={product.stock < 1}
              >
                Acheter maintenant
              </button>
              <button
                type="button"
                className={`min-w-[200px] px-4 py-2.5 ${product.stock < 1 ? 'border-gray-400 bg-gray-200 text-gray-400 cursor-not-allowed' : 'border-primary-700 bg-transparent hover:bg-gray-50 text-primary-700'} border text-sm font-semibold rounded dark:border-primary-600 dark:text-primary-500 dark:hover:bg-gray-600 dark:hover:text-white`}
                disabled={product.stock < 1}
                onClick={handleAddToCart}
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 shadow-md p-6 dark:shadow-gray-700 dark:bg-gray-800">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Description du produit</h3>
          <p className="text-gray-800 text-base dark:text-gray-200">{product.description}</p>
        </div>

        <div className="mt-16 shadow-md p-6 dark:shadow-gray-700 dark:bg-gray-800">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Autres Produits</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {similarProducts.map(similarProduct => (
              <div key={similarProduct.product_id} className="bg-white p-4 shadow-md rounded-lg dark:bg-gray-700 dark:shadow-gray-700">
                <img src={`/images/${similarProduct.product_id}-1.jpg`} alt={similarProduct.name} className="w-full h-48 object-cover rounded-md" />
                <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">{similarProduct.name}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{similarProduct.price}€</p>
                <a href={`/produit/${similarProduct.product_id}`} className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                  Voir le produit
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
