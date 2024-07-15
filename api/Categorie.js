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

  // Route pour ajouter une nouvelle catégorie
  router.post('/categories', async (req, res) => {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).send('Name is required');
    }
    console.log(`Route POST /categories called with name: ${name} and description: ${description}`);
    let connection;
    try {
      console.log('Connecting to the database...');
      connection = await mysql.createConnection(dbConfig);
      console.log('Connected to the database.');

      const [result] = await connection.execute('INSERT INTO Categories (name, description) VALUES (?, ?)', [name, description]);
      connection.end();

      if (result.affectedRows > 0) {
        console.log(`Category ${name} added.`);
        res.status(201).send(`Category ${name} added.`);
      } else {
        console.log(`Failed to add category ${name}.`);
        res.status(500).send(`Failed to add category ${name}.`);
      }
    } catch (error) {
      console.error(`Error adding category ${name}:`, error);
      if (connection) {
        connection.end();
      }
      res.status(500).send('Internal Server Error');
    }
  });

  // Route pour supprimer une catégorie
  router.delete('/categories/:categoryId', async (req, res) => {
    const categoryId = req.params.categoryId;
    console.log(`Route DELETE /categories/${categoryId} called`);
    let connection;
    try {
      console.log('Connecting to the database...');
      connection = await mysql.createConnection(dbConfig);
      console.log('Connected to the database.');

      // Vérifier s'il y a des sous-catégories dans cette catégorie
      const [subcategories] = await connection.execute('SELECT * FROM SubCategories WHERE category_id = ?', [categoryId]);
      if (subcategories.length > 0) {
        console.log(`Cannot delete category ${categoryId} because it has associated subcategories.`);
        connection.end();
        return res.status(400).send(`Cannot delete category ${categoryId} because it has associated subcategories.`);
      }

      // Supprimer la catégorie si aucune sous-catégorie n'est associée
      const [result] = await connection.execute('DELETE FROM Categories WHERE category_id = ?', [categoryId]);
      connection.end();

      if (result.affectedRows > 0) {
        console.log(`Category ${categoryId} deleted.`);
        res.status(200).send(`Category ${categoryId} deleted.`);
      } else {
        console.log(`Category ${categoryId} not found.`);
        res.status(404).send(`Category ${categoryId} not found.`);
      }
    } catch (error) {
      console.error(`Error deleting category ${categoryId}:`, error);
      if (connection) {
        connection.end();
      }
      res.status(500).send('Internal Server Error');
    }
  });

  return router;
};

export default categorieRoutes;
