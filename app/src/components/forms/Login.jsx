// src/components/forms/Login.jsx
import React, { useState, useContext } from 'react';
import { useNotification } from '../../context/NotificationContext';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { addNotification, removeNotification } = useNotification();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    removeNotification(); // Clear existing notifications
    try {
      const response = await axios.post(`${apiUrl}/login`, formData);
      if (response.status === 200) {
        const { token, userId } = response.data;
        login(token, userId); // Use context to log in
        addNotification('Connexion réussie!', 'success');
        navigate('/'); // Redirect to the homepage or another page
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        error.response.data.errors.forEach((err) => {
          addNotification(err.msg, 'error');
        });
      } else if (error.response && error.response.status === 401) {
        addNotification('Email ou mot de passe incorrect.', 'error');
      } else {
        addNotification('Erreur lors de la connexion.', 'error');
      }
    }
  };

  return (
    <div className="font-sans bg-gradient-to-r from-purple-900 via-purple-800 to-purple-600 text-gray-800 dark:text-gray-200">
      <div className="min-h-screen flex flex-col items-center justify-center lg:p-6 p-4">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          <div>
            <Link to="/">
              <img src="/icon.webp" alt="logo" className="w-52 rounded-full mb-12 inline-block" />
            </Link>
            <h2 className="text-4xl font-extrabold lg:leading-[50px] text-white">
              Connexion transparente pour un accès exclusif
            </h2>
            <p className="text-sm mt-6 text-white">Plongez dans une expérience de connexion sans tracas avec notre formulaire de connexion intuitif. Accédez facilement à votre compte.</p>
            <p className="text-sm mt-6 text-white">Vous n'avez pas de compte ? <Link to="/register" className="text-white font-semibold underline ml-1">Inscrivez-vous ici</Link></p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl px-6 py-8 space-y-6 max-w-md md:ml-auto w-full">
            <h3 className="text-3xl font-extrabold mb-12 dark:text-gray-100">
              Se connecter
            </h3>
            <div>
              <input name="email" type="email" autoComplete="email" required className="bg-gray-100 dark:bg-gray-700 dark:text-gray-200 focus:bg-transparent w-full text-sm px-4 py-3.5 rounded-md outline-gray-800 dark:outline-gray-200" placeholder="Adresse e-mail" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <input name="password" type="password" autoComplete="current-password" required className="bg-gray-100 dark:bg-gray-700 dark:text-gray-200 focus:bg-transparent w-full text-sm px-4 py-3.5 rounded-md outline-gray-800 dark:outline-gray-200" placeholder="Mot de passe" value={formData.password} onChange={handleChange} />
            </div>
            <div className="text-sm text-right">
              <Link to="/forgot-password" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>
            <div>
              <button type="submit" className="w-full shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-white bg-gray-800 hover:bg-[#222] dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none">
                Connexion
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;