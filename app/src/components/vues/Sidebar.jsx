import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserCircleIcon, MapIcon, CreditCardIcon, ClipboardListIcon, LogoutIcon } from '@heroicons/react/solid';
import AuthContext from '../../context/AuthContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 h-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 fixed top-0 left-0 pt-20">
      <ul className="flex flex-col space-y-4 p-4">
        <li>
          <Link
            to="/profil"
            className={`flex items-center px-4 py-3 rounded-lg ${
              isActive('/profil') ? 'bg-primary-700 text-white' : 'bg-gray-50 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
            }`}
          >
            <UserCircleIcon className="w-5 h-5 mr-3" />
            Profile
          </Link>
        </li>
        <li>
          <Link
            to="/profil/addresses"
            className={`flex items-center px-4 py-3 rounded-lg ${
              isActive('/profil/addresses') ? 'bg-primary-700 text-white' : 'bg-gray-50 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
            }`}
          >
            <MapIcon className="w-5 h-5 mr-3" />
            Mes Adresses
          </Link>
        </li>
        <li>
          <Link
            to="/profil/payment-methods"
            className={`flex items-center px-4 py-3 rounded-lg ${
              isActive('/profil/payment-methods') ? 'bg-primary-700 text-white' : 'bg-gray-50 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
            }`}
          >
            <CreditCardIcon className="w-5 h-5 mr-3" />
            Mes moyens de paiement
          </Link>
        </li>
        <li>
          <Link
            to="/profil/orders"
            className={`flex items-center px-4 py-3 rounded-lg ${
              isActive('/profil/orders') ? 'bg-primary-700 text-white' : 'bg-gray-50 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
            }`}
          >
            <ClipboardListIcon className="w-5 h-5 mr-3" />
            Mes commandes
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 w-full text-left"
          >
            <LogoutIcon className="w-5 h-5 mr-3" />
            Deconnexion
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
