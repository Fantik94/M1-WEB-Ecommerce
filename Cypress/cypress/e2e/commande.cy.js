describe('template spec', () => {
  it('passes', () => {
        //lien du site
        cy.visit('http://gamingavenue.ddns.net/');
    
        //Connexion
        cy.get('a[href="/login"]').click();
        cy.get('input[name="email"]').type('cypress@gmail.com');
        cy.get('input[name="password"]').type('cypress');
        cy.get('[data-cy=login-submit]').click();
    
        //attendre le chargement de la page d'acceuil
        cy.url().should('include', '/');
        cy.contains('Bienvenue dans le paradis du gamer');
    
        //aller sur la page d'un produit
        cy.visit('http://gamingavenue.ddns.net/produit/1');
    
        //Ajouter au panier
        cy.get('button').contains('Ajouter au panier').click();
    
        //aller sur la page du panier
        cy.visit('http://gamingavenue.ddns.net/panier');
    
        //procéder à la commande
        cy.get('button').contains('Étape suivante').click();
    
        //passer à l'étape de paiement
        cy.get('button').contains('Étape suivante').click();
    
        //passer la commande
        cy.get('button').contains('Procéder au paiement').click();
    
        //vérifier que la commande est terminée
        cy.url().should('include', '/thanks');
        cy.contains('Merci pour votre commande !');
  })
})