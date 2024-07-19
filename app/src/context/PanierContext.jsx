import { useState, useEffect } from "react";
import React from "react";

export const PanierContext = React.createContext();

export function PanierContextProvider({ children }) {
  const [panier, setPanier] = useState({});
  const [nombreProduits, setNombreProduits] = useState([]);

  useEffect(() => {
    const panierSession = sessionStorage.getItem("panier");
    const nombreProduitsSession = sessionStorage.getItem("nombreProduits");

    if (panierSession && nombreProduitsSession) {
      setPanier(JSON.parse(panierSession));
      setNombreProduits(Number(nombreProduitsSession));
    }
  }, []);

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
        setNombreProduits(nombreProduits + quantiteAJouter);
      }
    } else {
      const quantiteAJouter = Math.min(quantite, produit.stock);
      if (quantiteAJouter > 0) {
        nouveauPanier[produit.product_id] = { ...produit, quantite: quantiteAJouter };
        setPanier(nouveauPanier);
        setNombreProduits(nombreProduits + quantiteAJouter);
      }
    }
  }

  function retirer(produit) {
    const nouveauPanier = { ...panier };
    if (nouveauPanier[produit.product_id].quantite > 1) {
      nouveauPanier[produit.product_id].quantite -= 1;
    } else {
      delete nouveauPanier[produit.product_id];
    }
    setPanier(nouveauPanier);
    setNombreProduits(nombreProduits - 1);
  }

  function supprimer(produit) {
    const nouveauPanier = { ...panier };
    delete nouveauPanier[produit.product_id];
    setPanier(nouveauPanier);
    setNombreProduits(nombreProduits - produit.quantite);
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
