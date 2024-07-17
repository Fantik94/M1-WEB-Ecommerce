import React, { createContext, useState } from 'react';

export const CommandeContext = createContext();

export const CommandeProvider = ({ children }) => {
  const [adresseLivraison, setAdresseLivraison] = useState(null);

  return (
    <CommandeContext.Provider value={{ adresseLivraison, setAdresseLivraison }}>
      {children}
    </CommandeContext.Provider>
  );
};

export default CommandeContext;
