import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon, ShoppingCartIcon, UserCircleIcon, MoonIcon, SunIcon, SearchIcon } from '@heroicons/react/solid';
import axios from 'axios';
import ThemeContext from '../../context/ThemeContext';
import { PanierContext } from "../../context/PanierContext";
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
  const { nombreProduits } = useContext(PanierContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, userInfo } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [openMenu, setOpenMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios.get(`${apiUrl}/categories/`)
      .then(response => {
        const filteredCategories = response.data.filter(category => category.category_id !== 3);
        setCategories(filteredCategories);
        filteredCategories.forEach(category => {
          axios.get(`${apiUrl}/subcategories?category_id=${category.category_id}`)
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
    // Close the dropdown menu when the route changes
    setOpenMenu(null);
  }, [location.pathname]);

  const handleCategoryClick = (categoryName) => {
    navigate(`/${categoryName.toLowerCase()}`);
  };

  const handleChevronClick = (categoryId) => {
    setOpenMenu(openMenu === categoryId ? null : categoryId);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/recherche?query=${searchQuery}`);
  };

  return (
    <nav className="bg-white border-b-2 border-gray-300 dark:bg-gray-900 dark:border-gray-700 z-50 relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/icon.webp" className="h-14 rounded-b-full rounded-t-full" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Gaming Avenue</span>
        </Link>
        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded"
            placeholder="Rechercher un produit..."
          />
          <button
            type="submit"
            className="p-2 bg-primary-700 text-white rounded hover:bg-primary-800 focus:outline-none"
          >
            <SearchIcon className="h-5 w-5" />
          </button>
        </form>
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
                    onClick={() => handleChevronClick(category.category_id)}
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
                          to={`/categories/${category.category_id}/subcategories/${subcategory.subcategory_id}/products`}
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
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
            aria-label="Toggle dark mode"
          >
            {theme === 'light' ? (
              <MoonIcon className="h-6 w-6" />
            ) : (
              <SunIcon className="h-6 w-6" />
            )}
          </button>
          <Link to={isAuthenticated ? "/profil" : "/login"} className="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500">
            <UserCircleIcon className="h-6 w-6" />
          </Link>
          <Link to="/panier" className="relative text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500">
            <ShoppingCartIcon className="h-6 w-6" />
            {nombreProduits > 0 && (
              <div className="absolute top-[-8px] right-[-8px] bg-red-600 text-white rounded-full w-5 h-5 flex justify-center items-center text-xs">
                {nombreProduits}
              </div>
            )}
          </Link>
          {isAuthenticated && userInfo?.roles.includes('admin') && (
            <Link to="/backoffice" className="relative text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500">BackOffice</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
