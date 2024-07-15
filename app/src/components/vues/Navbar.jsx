import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon, ShoppingCartIcon, UserCircleIcon, SunIcon, MoonIcon } from '@heroicons/react/solid';
import axios from 'axios';

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [openMenu, setOpenMenu] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/${categoryName.toLowerCase()}`);
  };

  const handleChevronClick = (event, categoryId) => {
    event.stopPropagation();  // Empêche l'événement de propagation pour éviter de déclencher handleCategoryClick
    setOpenMenu(openMenu === categoryId ? null : categoryId);
  };

  const toggleDarkMode = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="bg-white border-b-2 border-gray-900 dark:bg-gray-900 dark:border-gray-700 bor">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/icon.webp" className="h-14 rounded-b-full rounded-t-full" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Gaming Avenue</span>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-multi-level">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {categories.map(category => (
              <li key={category.category_id} className="relative group">
                <div className="flex items-center">
                  <span
                    onClick={() => handleCategoryClick(category.name)}
                    className="flex items-center py-2 px-3 text-gray-900 cursor-pointer hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    {category.name}
                  </span>
                  <button
                    onClick={(event) => handleChevronClick(event, category.category_id)}
                    className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-white"
                    aria-label={`Toggle ${category.name} menu`}
                  >
                    <ChevronDownIcon className="w-5 h-5" />
                  </button>
                </div>
                {openMenu === category.category_id && (
                  <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700 z-50">
                    <div className="py-1">
                      {subcategories[category.category_id]?.map(subcategory => (
                        <Link
                          key={subcategory.subcategory_id}
                          to={`/categories/${category.category_id}/subcategories/${subcategory.subcategory_id}`}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
            <li>
              <Link to="/produits" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Produits</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={toggleDarkMode} className="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500">
            {isDarkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
          </button>
          <Link to="/login" className="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500">
            <UserCircleIcon className="h-6 w-6" />
          </Link>
          <Link to="/panier" className="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500">
            <ShoppingCartIcon className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
