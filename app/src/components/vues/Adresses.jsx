  // src/components/vues/Addresses.jsx
  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { useNotification } from '../../context/NotificationContext';

  const Addresses = () => {
    const { addNotification } = useNotification();
    const [addresses, setAddresses] = useState([]);
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [editingAddressId, setEditingAddressId] = useState(null);
    const [userId] = useState(sessionStorage.getItem('userId'));
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
      fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`${apiUrl}/addresses/${userId}`);
        setAddresses(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des adresses:', error);
      }
    };

    const addAddress = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`${apiUrl}/addresses/${userId}`, {
          street,
          city,
          state,
          postal_code: postalCode,
          country
        });
        if (response.status === 201) {
          fetchAddresses(); // Refresh the address list
          setStreet('');
          setCity('');
          setState('');
          setPostalCode('');
          setCountry('');
          addNotification('Adresse ajoutée avec succès', 'success');
        }
      } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'adresse:', error);
        addNotification('Erreur lors de l\'ajout de l\'adresse', 'error');
      }
    };

    const deleteAddress = async (addressId) => {
      try {
        const response = await axios.delete(`${apiUrl}/addresses/${userId}/${addressId}`);
        if (response.status === 200) {
          fetchAddresses(); // Refresh the address list
          addNotification('Adresse supprimée avec succès', 'success');
        }
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'adresse:', error);
        addNotification('Erreur lors de la suppression de l\'adresse', 'error');
      }
    };

    const editAddress = (address) => {
      setEditingAddressId(address.address_id);
      setStreet(address.street);
      setCity(address.city);
      setState(address.state);
      setPostalCode(address.postal_code);
      setCountry(address.country);
    };

    const updateAddress = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.patch(`${apiUrl}/addresses/${userId}/${editingAddressId}`, {
          street,
          city,
          state,
          postal_code: postalCode,
          country
        });
        if (response.status === 200) {
          fetchAddresses(); // Refresh the address list
          setStreet('');
          setCity('');
          setState('');
          setPostalCode('');
          setCountry('');
          setEditingAddressId(null);
          addNotification('Adresse mise à jour avec succès', 'success');
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'adresse:', error);
        addNotification('Erreur lors de la mise à jour de l\'adresse', 'error');
      }
    };

    return (
      <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Mes Adresses</h3>
        <form onSubmit={editingAddressId ? updateAddress : addAddress} className="mb-4 space-y-4">
          <div>
            <label htmlFor="street" className="block text-gray-700 dark:text-gray-200">Rue:</label>
            <input
              id="street"
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-gray-700 dark:text-gray-200">Ville:</label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-gray-700 dark:text-gray-200">État / Région:</label>
            <input
              id="state"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="postalCode" className="block text-gray-700 dark:text-gray-200">Code Postal:</label>
            <input
              id="postalCode"
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-gray-700 dark:text-gray-200">Pays:</label>
            <input
              id="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            {editingAddressId ? 'Mettre à jour l\'adresse' : 'Ajouter l\'adresse'}
          </button>
          {editingAddressId && (
            <button
              type="button"
              onClick={() => {
                setEditingAddressId(null);
                setStreet('');
                setCity('');
                setState('');
                setPostalCode('');
                setCountry('');
              }}
              className="ml-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Annuler
            </button>
          )}
        </form>
        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Adresses existantes</h4>
        <ul className="space-y-2">
          {addresses.map(address => (
            <li key={address.address_id} className="p-4 border border-gray-300 rounded flex justify-between items-center">
              <span>{address.street}, {address.city}, {address.state}, {address.postal_code}, {address.country}</span>
              <div className="flex space-x-2">
                <button onClick={() => editAddress(address)} className="text-blue-500 hover:text-blue-700">
                  Modifier
                </button>
                <button onClick={() => deleteAddress(address.address_id)} className="text-red-500 hover:text-red-700">
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  export default Addresses;
