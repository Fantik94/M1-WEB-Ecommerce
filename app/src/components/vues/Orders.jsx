import React, { useEffect, useState, useContext } from 'react';
import axiosInstance from '../../utils/AxiosInstance';  
import AuthContext from "../../context/AuthContext";

const Orders = () => {
  const { isAuthenticated, userInfo } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [userId] = useState(sessionStorage.getItem('userId'));
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const statusColors = {
    'Processing': 'text-yellow-500',
    'Validée': 'text-blue-500',
    'En cours d\'acheminement': 'text-purple-500',
    'Livrée': 'text-green-500',
    'Annulée': 'text-red-500',
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get(`${apiUrl}/orders/${userId}`);
        setOrders(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des commandes.');
        console.error('Error fetching orders:', err);
      }
    };

    if (isAuthenticated) {
      fetchOrders();
    }
  }, [apiUrl, isAuthenticated, userInfo]);

  if (error) {
    return <div className="text-red-600 dark:text-red-400 mt-4">{error}</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-8">Mes Commandes</h2>
      <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md w-full max-w-4xl">
        {orders.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">Aucune commande trouvée.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order, index) => (
              <li key={index} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Commande #{order.order_id}</h3>
                <p className="text-gray-700 dark:text-gray-300">Total: {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(order.total_amount)}</p>
                <p className={`${statusColors[order.order_status]  || ''} rounded`}>
                  Status: {order.order_status}
                </p>
                <p className="text-gray-700 dark:text-gray-300">Adresse de livraison: {order.shipping_address}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Orders;
