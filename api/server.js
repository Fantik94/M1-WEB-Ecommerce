import express from 'express';

const app = express();
const port = 3000;

// Route racine
app.get('/', (req, res) => {
    res.send('Bienvenue sur notre API!');
});

// Route de test
app.get('/test', (req, res) => {
    res.send('Ceci est une route de test');
});

// Autres routes...

app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
