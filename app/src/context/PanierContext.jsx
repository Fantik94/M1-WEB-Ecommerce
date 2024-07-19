import { useState, useEffect } from "react";
import React from "react";

export const PanierContext = React.createContext();

export function PanierContextProvider({ children }) {
  const [panier, setPanier] = useState(() => {
    const panierSession = sessionStorage.getItem("panier");
    return panierSession ? JSON.parse(panierSession) : {};
  });
  
  const [nombreProduits, setNombreProduits] = useState(() => {
    const nombreProduitsSession = sessionStorage.getItem("nombreProduits");
    return nombreProduitsSession ? Number(nombreProduitsSession) : 0;
  });

  useEffect(() => {
    sessionStorage.setItem("panier", JSON.stringify(panier));
    sessionStorage.setItem("nombreProduits", nombreProduits.toString());
  }, [panier, nombreProduits]);

  function ajouter(produit, quantite = 1) {
    const nouveauPanier = { ...panier };
    if (nouveauPanier[produit.product_id]) {
      const quantiteDisponible = produit.stock - nouveauPanier[produit.product_id].quantite;
      const quantiteAJouter = Math.min(quantite, quantiteDisponible);
      if (quantiteAJouter > 0) {
        nouveauPanier[produit.product_id].quantite += quantiteAJouter;
        setPanier(nouveauPanier);
        setNombreProduits(prevNombre => prevNombre + quantiteAJouter);
      }
    } else {
      const quantiteAJouter = Math.min(quantite, produit.stock);
      if (quantiteAJouter > 0) {
        nouveauPanier[produit.product_id] = { ...produit, quantite: quantiteAJouter };
        setPanier(nouveauPanier);
        setNombreProduits(prevNombre => prevNombre + quantiteAJouter);
      }
    }
  }

  function retirer(produit) {
    const nouveauPanier = { ...panier };
    if (nouveauPanier[produit.product_id].quantite > 1) {
      nouveauPanier[produit.product_id].quantite -= 1;
      setPanier(nouveauPanier);
      setNombreProduits(prevNombre => prevNombre - 1);
    } else {
      delete nouveauPanier[produit.product_id];
      setPanier(nouveauPanier);
      setNombreProduits(prevNombre => prevNombre - 1);
    }
  }

  function supprimer(produit) {
    const nouveauPanier = { ...panier };
    const quantiteASupprimer = nouveauPanier[produit.product_id].quantite;
    delete nouveauPanier[produit.product_id];
    setPanier(nouveauPanier);
    setNombreProduits(prevNombre => prevNombre - quantiteASupprimer);
  }

  function getTotalProduit(produit) {
    const prix = parseFloat(produit.price) || 0;
    return prix * produit.quantite;
  }

  function getTotalPanier() {
    let total = 0;
    Object.values(panier).forEach(produit => {
      total += getTotalProduit(produit);
    });
    return total;
  }

  function reinitialiserPanier() {
    setPanier({});
    setNombreProduits(0);
  }

  return (
    <PanierContext.Provider
      value={{ panier: Object.values(panier), nombreProduits, ajouter, retirer, supprimer, getTotalProduit, getTotalPanier, reinitialiserPanier }}
    >
      {children}
    </PanierContext.Provider>
  );
}

export default PanierContextProvider;
