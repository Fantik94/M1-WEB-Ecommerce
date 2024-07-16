// src/components/vues/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/products/${productId}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error(`There was an error fetching the product ${productId}:`, error);
      });
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white">
      <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-md p-6 rounded-lg">
          <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            <div className="px-4 py-10 rounded-lg shadow-md relative">
              <img src={`/images/${product.product_id}-1.jpg`} alt={product.name} className="w-3/4 rounded object-cover mx-auto" />
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
              {['1', '2', '3'].map(num => (
                <div key={num} className="w-24 h-20 flex items-center justify-center rounded-lg p-4 shadow-md cursor-pointer">
                  <img src={`/images/${product.product_id}-${num}.jpg`} alt={`${product.name} ${num}`} className="w-full" />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold text-gray-800">{product.name}</h2>

            <div className="flex space-x-2 mt-4">
              {[...Array(4)].map((_, i) => (
                <svg key={i} className="w-5 fill-blue-600" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
              ))}
              <svg className="w-5 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <h4 className="text-gray-800 text-base">500 Reviews</h4>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <p className="text-gray-800 text-3xl font-bold">{product.price}€</p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <h4 className={`text-base ${product.stock < 1 ? 'text-red-600' : 'text-gray-800'}`}>
                Stock : {product.stock < 1 ? 0 : product.stock}
              </h4>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <button type="button" className="min-w-[200px] px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded">Acheter maintenant</button>
              <button type="button" className="min-w-[200px] px-4 py-2.5 border border-blue-600 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded">Ajouter au panier</button>
            </div>
          </div>
        </div>

        <div className="mt-16 shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800">Description du produit</h3>
          &nbsp;
          <p className="text-gray-800 text-base">{product.description}</p>
        </div>

        <div className="mt-16 shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800">Reviews (10)</h3>
          <div className="grid md:grid-cols-2 gap-12 mt-4">
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating, i) => (
                <div key={i} className="flex items-center">
                  <p className="text-sm text-gray-800 font-bold">{rating}.0</p>
                  <svg className="w-5 fill-blue-600 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <div className="bg-gray-400 rounded w-full h-2 ml-3">
                    <div className={`w-${rating}/6 h-full rounded bg-blue-600`}></div>
                  </div>
                  <p className="text-sm text-gray-800 font-bold ml-3">{rating * 20}%</p>
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-start">
                <img src="https://readymadeui.com/team-2.webp" className="w-12 h-12 rounded-full border-2 border-white" alt="Reviewer" />
                <div className="ml-3">
                  <h4 className="text-sm font-bold text-gray-800">John Doe</h4>
                  <div className="flex space-x-1 mt-1">
                    {[...Array(3)].map((_, i) => (
                      <svg key={i} className="w-4 fill-blue-600" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                    ))}
                    {[...Array(2)].map((_, i) => (
                      <svg key={i} className="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                      </svg>
                    ))}
                    <p className="text-xs !ml-2 font-semibold text-gray-800">2 mins ago</p>
                  </div>
                  <p className="text-sm mt-4 text-gray-800">Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</p>
                </div>
              </div>

              <button type="button" className="w-full mt-10 px-4 py-2.5 bg-transparent hover:bg-gray-50 border border-blue-600 text-gray-800 font-bold rounded">Read all reviews</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
