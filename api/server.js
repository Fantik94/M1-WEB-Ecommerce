import express from 'express';
import categorieRoutes from './Catégorie.js';

const app = express();
const port = 3000;

// Configurer la connexion à la base de données
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'your_database_name'
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
app.use('/api', categorieRoutes(dbConfig));

// Autres routes...

app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});