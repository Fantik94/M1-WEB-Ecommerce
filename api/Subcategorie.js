import express from 'express';
import mysql from 'mysql2/promise';

const subCategorieRoutes = (dbConfig) => {
  const router = express.Router();

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

  // Route pour créer une nouvelle sous-catégorie
  router.post('/categories/:categoryId/subcategories', async (req, res) => {
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

    console.log(`Route POST /categories/${categoryId}/subcategories called with name: ${name} and description: ${description}`);
    let connection;
    try {
      console.log('Connecting to the database...');
      connection = await mysql.createConnection(dbConfig);
      console.log('Connected to the database.');

      const [result] = await connection.execute(
        'INSERT INTO SubCategories (category_id, name, description) VALUES (?, ?, ?)',
        [categoryId, name, description]
      );
      connection.end();

      if (result.affectedRows > 0) {
        console.log(`Sub-category ${name} added.`);
        res.status(201).send(`Sub-category ${name} added.`);
      } else {
        console.log(`Failed to add sub-category ${name}.`);
        res.status(500).send(`Failed to add sub-category ${name}.`);
      }
    } catch (error) {
      console.error(`Error adding sub-category ${name}:`, error);
      if (connection) {
        connection.end();
      }
      res.status(500).send('Internal Server Error');
    }
  });

  // Route pour supprimer une sous-catégorie
  router.delete('/categories/:categoryId/subcategories/:subCategoryId', async (req, res) => {
    const subCategoryId = req.params.subCategoryId;
    console.log(`Route DELETE /categories/${req.params.categoryId}/subcategories/${subCategoryId} called`);
    let connection;
    try {
      console.log('Connecting to the database...');
      connection = await mysql.createConnection(dbConfig);
      console.log('Connected to the database.');
  
      // Vérifier s'il y a des produits dans cette sous-catégorie
      const [products] = await connection.execute('SELECT * FROM Products WHERE subcategory_id = ?', [subCategoryId]);
      console.log(`Products for sub-category ${subCategoryId}:`, products);
      if (products.length > 0) {
        console.log(`Cannot delete sub-category ${subCategoryId} because it has associated products.`);
        connection.end();
        return res.status(400).send(`Cannot delete sub-category ${subCategoryId} because it has associated products.`);
      }
  
      // Supprimer la sous-catégorie si aucun produit n'est associé
      const [result] = await connection.execute('DELETE FROM SubCategories WHERE subcategory_id = ?', [subCategoryId]);
      connection.end();
  
      if (result.affectedRows > 0) {
        console.log(`Sub-category ${subCategoryId} deleted.`);
        res.status(200).send(`Sub-category ${subCategoryId} deleted.`);
      } else {
        console.log(`Sub-category ${subCategoryId} not found.`);
        res.status(404).send(`Sub-category ${subCategoryId} not found.`);
      }
    } catch (error) {
      console.error(`Error deleting sub-category ${subCategoryId}:`, error);
      if (connection) {
        connection.end();
      }
      res.status(500).send('Internal Server Error');
    }
  });

// Route pour modifier une sous-catégorie
router.put('/subcategories', async (req, res) => {
  const { category_id, name, description } = req.body;

  // Vérification des champs
  if (!category_id || !name || !description) {
    console.log('Missing fields:', { category_id, name, description });
    return res.status(400).send('Category ID, name, and description are required');
  }
  const specialCharRegex = /[^a-zA-Z0-9 ]/g;
  if (specialCharRegex.test(name) || specialCharRegex.test(description)) {
    return res.status(400).send('No special characters allowed');
  }

  console.log(`Route PUT /subcategories called with category_id: ${category_id}, name: ${name}, description: ${description}`);
  let connection;
  try {
    console.log('Connecting to the database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to the database.');

    const [result] = await connection.execute(
      'UPDATE SubCategories SET name = ?, description = ? WHERE category_id = ?',
      [name, description, category_id]
    );
    connection.end();

    if (result.affectedRows > 0) {
      console.log(`Sub-category with category_id ${category_id} updated.`);
      res.status(200).send(`Sub-category with category_id ${category_id} updated.`);
    } else {
      console.log(`Sub-category with category_id ${category_id} not found.`);
      res.status(404).send(`Sub-category with category_id ${category_id} not found.`);
    }
  } catch (error) {
    console.error(`Error updating sub-category with category_id ${category_id}:`, error);
    if (connection) {
      connection.end();
    }
    res.status(500).send('Internal Server Error');
  }
});


  return router;
};

export default subCategorieRoutes;
