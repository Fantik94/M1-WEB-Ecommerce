import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from 'cloudinary';
import categorieRoutes from './Categorie.js';
import subCategorieRoutes from './Subcategorie.js';
import produitRoutes from './Produit.js';
import inscriptionRoutes from './Inscription.js';
import BackofficeRoutes from './Backoffice.js';
import connexionRoutes from './Connexion.js';
import adresseRoutes from './Adresse.js';
import orderRoutes from './order.js';

dotenv.config();

const app = express();
const port = 3000;

// Utiliser le middleware CORS
app.use(cors());

// Ajouter le middleware pour parser le JSON
app.use(express.json());

// Configurer Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configurer Multer avec Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'Gaming_avenue_images', // dossier où les images seront stockées
    allowedFormats: ['jpg', 'jpeg', 'png']
  }
});

const upload = multer({ storage: storage });

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

// Route pour télécharger une image
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({ url: req.file.path, id: req.file.filename });
});

// Route pour supprimer une image
app.delete('/delete/:id', (req, res) => {
  cloudinary.v2.uploader.destroy(req.params.id, (error, result) => {
    if (error) {
      res.status(500).send('Error deleting image');
    } else {
      res.send('Image deleted successfully');
    }
  });
});

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
