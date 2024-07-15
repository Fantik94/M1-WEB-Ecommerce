import express from 'express';
import mysql from 'mysql2/promise';

const categorieRoutes = (dbConfig) => {
  const router = express.Router();

  // Route pour récupérer toutes les catégories
  router.get('/categories', async (req, res) => {
    try {
      const connection = await mysql.createConnection(dbConfig);
      const [rows] = await connection.execute('SELECT * FROM Categories');
      connection.end();
      res.json(rows);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  // Route pour récupérer les sous-catégories d'une catégorie
  router.get('/categories/:categoryId/subcategories', async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
      const connection = await mysql.createConnection(dbConfig);
      const [rows] = await connection.execute('SELECT * FROM SubCategories WHERE category_id = ?', [categoryId]);
      connection.end();
      res.json(rows);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  return router;
};

export default categorieRoutes;