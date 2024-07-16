// src/context/NotificationContext.js
import React, { createContext, useState, useContext, useCallback } from 'react';
import Notification from '../components/vues/Notification';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type) => {
    const id = new Date().getTime();
    setNotifications((prevNotifications) => [...prevNotifications, { id, message, type }]);

    setTimeout(() => {
      setNotifications((prevNotifications) => prevNotifications.filter((notif) => notif.id !== id));
    }, 5000);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prevNotifications) => prevNotifications.filter((notif) => notif.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={addNotification}>
      {children}
      <div className="fixed top-0 right-0 p-4 z-50">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
