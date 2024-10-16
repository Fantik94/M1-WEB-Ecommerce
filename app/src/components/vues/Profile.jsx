import React, { useContext, useState, useEffect } from 'react';
import axiosInstance from '../../utils/AxiosInstance';
import AuthContext from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

const Profile = () => {
  const { userInfo, fetchUserInfo } = useContext(AuthContext);
  const { addNotification } = useNotification();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    if (userInfo) {
      setFormData(userInfo);
    }
  }, [userInfo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.patch(`/users/${userId}`, formData);
      addNotification('Profile updated successfully!', 'success');
      setIsEditing(false);
      fetchUserInfo(userId);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const newErrors = {};
        error.response.data.errors.forEach(err => {
          newErrors[err.path] = err.msg;
        });
        setErrors(newErrors);
      } else {
        addNotification('Error updating profile.', 'error');
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Profil</h3>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nom d'utilisateur</label>
            <input
              type="text"
              name="username"
              value={formData.username || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            {errors.username && <p className="text-red-600 text-sm">{errors.username}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Prénom</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            {errors.first_name && <p className="text-red-600 text-sm">{errors.first_name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nom</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            {errors.last_name && <p className="text-red-600 text-sm">{errors.last_name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Numéro de téléphone</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            {errors.phone_number && <p className="text-red-600 text-sm">{errors.phone_number}</p>}
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Sauvegarder
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
              onClick={() => setIsEditing(false)}
            >
              Annuler
            </button>
          </div>
        </form>
      ) : (
        <div>
          <p><strong>Nom d'utilisateur:</strong> {userInfo.username}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Prénom:</strong> {userInfo.first_name}</p>
          <p><strong>Nom:</strong> {userInfo.last_name}</p>
          <p><strong>Numéro de téléphone:</strong> {userInfo.phone_number}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={handleEdit}
          >
            Modifier
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
