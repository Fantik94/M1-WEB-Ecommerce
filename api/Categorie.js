import express from 'express';
import mysql from 'mysql2/promise';

const categorieRoutes = (dbConfig) => {
  const router = express.Router();

  // Route pour récupérer toutes les catégories
  router.get('/categories', async (req, res) => {
    console.log('Route /categories called');
    try {
      console.log('Connecting to the database...');
      const connection = await mysql.createConnection(dbConfig);
      console.log('Connected to the database.');
      
      const [rows] = await connection.execute('SELECT * FROM Categories');
      connection.end();
      
      console.log('Categories retrieved:', rows);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  // Route pour récupérer les sous-catégories d'une catégorie
  router.get('/categories/:categoryId/subcategories', async (req, res) => {
    const categoryId = req.params.categoryId;
    console.log(`Route /categories/${categoryId}/subcategories called`);
    try {
      console.log('Connecting to the database...');
      const connection = await mysql.createConnection(dbConfig);
      console.log('Connected to the database.');

      const [rows] = await connection.execute('SELECT * FROM SubCategories WHERE category_id = ?', [categoryId]);
      connection.end();
      
      console.log(`Subcategories for category ${categoryId} retrieved:`, rows);
      res.json(rows);
    } catch (error) {
      console.error(`Error fetching subcategories for category ${categoryId}:`, error);
      res.status(500).send('Internal Server Error');
    }
  });

  return router;
};

export default categorieRoutes;
