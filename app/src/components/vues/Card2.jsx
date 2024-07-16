// src/components/vues/Card2.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/solid';

const Card2 = ({ image, title, price, link }) => {
  return (
    <div className="flex flex-wrap justify-center">
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4">
      <Link to={link}>
        <img className="p-8 rounded-t-lg" src={image} alt={title} />
      </Link>
      <div className="px-5 pb-5">
        <Link to={link}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        </Link>
        <div className="flex items-center justify-between mt-2.5 mb-5">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">{price} €</span>
          <Link to={link} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

Card2.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Card2;
