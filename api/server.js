import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import categorieRoutes from './Categorie.js';
import subCategorieRoutes from './Subcategorie.js';
import produitRoutes from './Produit.js';
import inscriptionRoutes from './Inscription.js';
import BackofficeRoutes from './Backoffice.js';
import connexionRoutes from './Connexion.js';
import adresseRoutes from './Adresse.js';
import orderRoutes from './order.js';
import imageRoutes from './gestion_image.js'; // Importer les routes de gestion des images

dotenv.config();

const app = express();
const port = 3000;

// Utiliser le middleware CORS
app.use(cors());

// Ajouter le middleware pour parser le JSON
app.use(express.json());

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

// Utiliser les routes de gestion des images
app.use('/', imageRoutes);

// Utilisation des routes de Catégorie en passant la config de la BDD
app.use('/', categorieRoutes(dbConfig));
app.use('/', subCategorieRoutes(dbConfig));
app.use('/', produitRoutes(dbConfig));
app.use('/', inscriptionRoutes(dbConfig));
app.use('/', BackofficeRoutes(dbConfig));
app.use('/', connexionRoutes(dbConfig));
app.use('/', adresseRoutes(dbConfig));
app.use('/', orderRoutes(dbConfig));

// Autres routes...
app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
  console.log(`Routes disponibles:`);
  console.log(`GET /categories`);
  console.log(`GET /categories/:categoryId/subcategories`);
  console.log(`POST /categories`);
  console.log(`DELETE /categories/:categoryId`);
  console.log(`DELETE /categories/:categoryId/subcategories/:subCategoryId`);
  console.log(`GET /categories/:categoryId/subcategories/:subCategoryId/products`);
});
