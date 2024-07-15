import express from 'express';
import categorieRoutes from './Categorie.js';

const app = express();
const port = 3000;

// Configurer la connexion à la base de données
const dbConfig = {
  host: 'localhost', // localhost
  user: 'myuser', // utilisateur de la base de données
  password: 'mypassword', // mot de passe de l'utilisateur de la base de données
  database: 'gaming_avenue', // nom de la base de données
  port: 3306 // port de la base de données, habituellement 3306 pour MySQL
};

// Route racine
app.get('/', (req, res) => {
    res.send('Bienvenue sur notre API!');
});

// Route de test
app.get('/test', (req, res) => {
    res.send('Ceci est une route de test');
});

// Utilisation des routes de Catégorie en passant la config de la BDD
app.use('/', categorieRoutes(dbConfig));

// Autres routes...

app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
    console.log(`Routes disponibles:`);
    console.log(`GET /categories`);
    console.log(`GET /categories/:categoryId/subcategories`);
});
