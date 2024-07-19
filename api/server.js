import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import categorieRoutes from './Categorie.js';
import subCategorieRoutes from './Subcategorie.js';
import produitRoutes from './Produit.js';
import inscriptionRoutes from './Inscription.js';
import BackofficeRoutes from './Backoffice.js';
import connexionRoutes from './Connexion.js';
import adresseRoutes from './Adresse.js';
import orderRoutes from './order.js';
import imageRoutes from './gestion_image.js';
import paymentRoutes from './Payement.js';

dotenv.config();  // Charge les variables d'environnement du fichier .env

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
  host: process.env.VITE_DB_HOST,
  user: process.env.VITE_DB_USER,
  password: process.env.VITE_DB_PASSWORD,
  database: process.env.VITE_DB_DATABASE,
  port: process.env.VITE_DB_PORT
};

app.get('/', (req, res) => res.send('Bienvenue sur notre API!'));
app.get('/test', (req, res) => res.send('Ceci est une route de test'));

app.use('/', imageRoutes);
app.use('/', categorieRoutes(dbConfig));
app.use('/', subCategorieRoutes(dbConfig));
app.use('/', produitRoutes(dbConfig));
app.use('/', inscriptionRoutes(dbConfig));
app.use('/', BackofficeRoutes(dbConfig));
app.use('/', connexionRoutes(dbConfig));
app.use('/', adresseRoutes(dbConfig));
app.use('/', orderRoutes(dbConfig));
app.use('/', paymentRoutes(dbConfig));

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

export default app;
