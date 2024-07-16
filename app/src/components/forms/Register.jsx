// src/components/forms/Register.jsx
import React, { useState } from 'react';
import { useNotification } from '../../context/NotificationContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  const navigate = useNavigate();
  const { addNotification, removeNotification } = useNotification();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/register', formData);
      if (response.status === 201) {
        addNotification('Inscription réussie!', 'success');
        setTimeout(() => {
          navigate('/login');
        }, 1000); // Redirect after 1 second
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        error.response.data.errors.forEach((err) => {
          addNotification(err.msg, 'error');
        });
      } else if (error.response && error.response.status === 400) {
        addNotification('Un utilisateur existe déjà avec cet e-mail.', 'error');
      } else {
        addNotification('Erreur lors de l\'inscription.', 'error');
      }
    }
  };

  return (
    <div className="font-sans bg-gradient-to-r from-purple-900 via-purple-800 to-purple-600 text-gray-800 dark:text-gray-200">
      <div className="min-h-screen flex flex-col items-center justify-center lg:p-6 p-4">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          <div>
            <Link to="/">
              <img src="/icon.webp" alt="logo" className="w-52 mb-12 rounded-full inline-block" />
            </Link>
            <h2 className="text-4xl font-extrabold lg:leading-[50px] text-white">
              Inscription
            </h2>
            <p className="text-sm mt-6 text-white">Rejoignez notre communauté de gamers et profitez de nombreux avantages.</p>
            <p className="text-sm mt-6 text-white">Déjà inscrit ? <Link to="/login" className="text-white font-semibold underline ml-1">Connectez-vous ici</Link></p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl px-6 py-8 space-y-6 max-w-md md:ml-auto w-full">
            <h3 className="text-3xl font-extrabold mb-12 dark:text-gray-100">
              S'inscrire
            </h3>
            <div>
              <input name="username" type="text" required className="bg-gray-100 dark:bg-gray-700 dark:text-gray-200 focus:bg-transparent w-full text-sm px-4 py-3.5 rounded-md outline-gray-800 dark:outline-gray-200" placeholder="Nom d'utilisateur" value={formData.username} onChange={handleChange} />
            </div>
            <div>
              <input name="email" type="email" autoComplete="email" required className="bg-gray-100 dark:bg-gray-700 dark:text-gray-200 focus:bg-transparent w-full text-sm px-4 py-3.5 rounded-md outline-gray-800 dark:outline-gray-200" placeholder="Adresse e-mail" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <input name="password" type="password" autoComplete="current-password" required className="bg-gray-100 dark:bg-gray-700 dark:text-gray-200 focus:bg-transparent w-full text-sm px-4 py-3.5 rounded-md outline-gray-800 dark:outline-gray-200" placeholder="Mot de passe" value={formData.password} onChange={handleChange} />
            </div>
            <div>
              <input name="firstName" type="text" required className="bg-gray-100 dark:bg-gray-700 dark:text-gray-200 focus:bg-transparent w-full text-sm px-4 py-3.5 rounded-md outline-gray-800 dark:outline-gray-200" placeholder="Prénom" value={formData.firstName} onChange={handleChange} />
            </div>
            <div>
              <input name="lastName" type="text" required className="bg-gray-100 dark:bg-gray-700 dark:text-gray-200 focus:bg-transparent w-full text-sm px-4 py-3.5 rounded-md outline-gray-800 dark:outline-gray-200" placeholder="Nom" value={formData.lastName} onChange={handleChange} />
            </div>
            <div>
              <input name="phoneNumber" type="text" className="bg-gray-100 dark:bg-gray-700 dark:text-gray-200 focus:bg-transparent w-full text-sm px-4 py-3.5 rounded-md outline-gray-800 dark:outline-gray-200" placeholder="Numéro de téléphone (optionnel)" value={formData.phoneNumber} onChange={handleChange} />
            </div>
            <div>
              <button type="submit" className="w-full shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-white bg-gray-800 hover:bg-[#222] dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none">
                S'inscrire
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
