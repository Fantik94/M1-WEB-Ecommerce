// src/components/vues/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon, ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/solid';
import axios from 'axios';

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3000/categories/')
      .then(response => {
        const filteredCategories = response.data.filter(category => category.category_id !== 3);
        setCategories(filteredCategories);
        filteredCategories.forEach(category => {
          axios.get(`http://localhost:3000/categories/${category.category_id}/subcategories`)
            .then(subResponse => {
              setSubcategories(prevSubcategories => ({
                ...prevSubcategories,
                [category.category_id]: subResponse.data
              }));
            })
            .catch(subError => {
              console.error(`Error fetching subcategories for category ${category.category_id}:`, subError);
            });
        });
      })
      .catch(error => {
        console.error("There was an error fetching the categories!", error);
      });
  }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/icon.webp" className="h-16 rounded-3xl" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Gaming Avenue</span>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-multi-level">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {categories.map(category => (
              <li key={category.category_id}>
                <DropdownMenu title={category.name}>
                  {subcategories[category.category_id]?.map(subcategory => (
                    <DropdownItem key={subcategory.subcategory_id} to={`/categories/${category.category_id}/subcategories/${subcategory.subcategory_id}`}>
                      {subcategory.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </li>
            ))}
            <li>
              <Link to="/produits" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Produits</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/panier" className="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500">
            <ShoppingCartIcon className="h-6 w-6" />
          </Link>
          <Link to="/login" className="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500">
            <UserCircleIcon className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

const DropdownMenu = ({ title, children }) => (
  <Menu as="div" className="relative inline-block text-left">
    <Menu.Button className="flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
      {title}
      <ChevronDownIcon className="w-5 h-5 ml-2" aria-hidden="true" />
    </Menu.Button>
    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700 z-50">
      <div className="py-1">
        {children}
      </div>
    </Menu.Items>
  </Menu>
);

const DropdownItem = ({ to, children }) => (
  <Menu.Item>
    {({ active }) => (
      <Link to={to} className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 dark:bg-gray-600 dark:text-white' : 'text-gray-700 dark:text-gray-200'}`}>
        {children}
      </Link>
    )}
  </Menu.Item>
);

export default Navbar;
