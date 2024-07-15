import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ name, dateJoined, rating, title, reviewDate, reviewText, helpfulCount }) => {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <svg
      key={i}
      className={`w-4 h-4 ${i < rating ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-600'}`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 22 20"
    >
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  ));

  return (
    <article className="p-6 mb-6 text-base bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center mb-4">
        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
          </svg>
        </div>
        <div className="font-medium text-gray-900 dark:text-white">
          <p>
            {name} <time className="block text-sm text-gray-500 dark:text-gray-400">A rejoint en {dateJoined}</time>
          </p>
        </div>
      </div>
      <div className="flex items-center mb-1 space-x-1">{stars}</div>
      <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{title}</h3>
      <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
        <p>Commenté en France le <time>{reviewDate}</time></p>
      </footer>
      <p className="mb-2 text-gray-500 dark:text-gray-400">{reviewText}</p>
      <a href="#" className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Lire plus</a>
      <aside>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{helpfulCount} personnes ont trouvé cela utile</p>
        <div className="flex items-center mt-3">
          <a href="#" className="px-2 py-1.5 text-xs font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-700">Utile</a>
        </div>
      </aside>
    </article>
  );
};

Comment.propTypes = {
  name: PropTypes.string.isRequired,
  dateJoined: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  reviewDate: PropTypes.string.isRequired,
  reviewText: PropTypes.string.isRequired,
  helpfulCount: PropTypes.number.isRequired,
};

export default Comment;
