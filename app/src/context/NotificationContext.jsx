import React, { createContext, useState, useContext, useCallback } from 'react';
import Notification from '../components/vues/Notification';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const addNotification = useCallback((message, type) => {
    const id = new Date().getTime();
    setNotification({ id, message, type });

    setTimeout(() => {
      setNotification((prevNotification) => (prevNotification && prevNotification.id === id ? null : prevNotification));
    }, 5000);
  }, []);

  const removeNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      {notification && (
        <div className="fixed top-0 right-0 p-4 z-50">
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={removeNotification}
          />
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
