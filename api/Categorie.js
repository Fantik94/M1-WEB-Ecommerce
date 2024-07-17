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

// Route pour ajouter une nouvelle catégorie
router.post('/categories', async (req, res) => {
  const { name, description } = req.body;

  // Vérification des champs
  if (!name || !description) {
    return res.status(400).send('Name and description are required');
  }
  const specialCharRegex = /[^a-zA-Z0-9 ]/g;
  if (specialCharRegex.test(name) || specialCharRegex.test(description)) {
    return res.status(400).send('No special characters allowed');
  }

  console.log(`Route POST /categories called with name: ${name} and description: ${description}`);
  let connection;
  try {
    console.log('Connecting to the database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to the database.');

    const [result] = await connection.execute('INSERT INTO Categories (name, description) VALUES (?, ?)', [name, description]);

    if (result.affectedRows > 0) {
      const [newCategory] = await connection.execute('SELECT * FROM Categories WHERE category_id = ?', [result.insertId]);
      connection.end();
      console.log(`Category ${name} added.`);
      res.status(201).json(newCategory[0]);
    } else {
      console.log(`Failed to add category ${name}.`);
      connection.end();
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
      console.log(`Subcategories for category ${categoryId}:`, subcategories);
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

  // Endpoint pour modifier une catégorie
  router.patch('/categories/:categoryId', async (req, res) => {
    const categoryId = req.params.categoryId;
    const { name, description } = req.body;

    // Vérification des champs
    if (!name || !description) {
      return res.status(400).send('Name and description are required');
    }
    const specialCharRegex = /[^a-zA-Z0-9 ]/g;
    if (specialCharRegex.test(name) || specialCharRegex.test(description)) {
      return res.status(400).send('No special characters allowed');
    }

    console.log(`Route PATCH /categories/${categoryId} called with name: ${name} and description: ${description}`);
    let connection;
    try {
      console.log('Connecting to the database...');
      connection = await mysql.createConnection(dbConfig);
      console.log('Connected to the database.');

      const [result] = await connection.execute(
        'UPDATE Categories SET name = ?, description = ? WHERE category_id = ?',
        [name, description, categoryId]
      );
      connection.end();

      if (result.affectedRows > 0) {
        console.log(`Category ${categoryId} updated.`);
        res.status(200).send(`Category ${categoryId} updated.`);
      } else {
        console.log(`Category ${categoryId} not found.`);
        res.status(404).send(`Category ${categoryId} not found.`);
      }
    } catch (error) {
      console.error(`Error updating category ${categoryId}:`, error);
      if (connection) {
        connection.end();
      }
      res.status(500).send('Internal Server Error');
    }
  });
  
  return router;
};

export default categorieRoutes;
