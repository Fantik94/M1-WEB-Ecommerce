import express from 'express';
import mysql from 'mysql2/promise';

const produitRoutes = (dbConfig) => {
  const router = express.Router();

  // Route pour récupérer les produits d'une sous-catégorie spécifique
  // A MODIF SI JAMAIS 
  router.get('/categories/:categoryId/subcategories/:subCategoryId/products', async (req, res) => {
    const { subCategoryId } = req.params;
    console.log(`Route /categories/${req.params.categoryId}/subcategories/${subCategoryId}/products called`);
    let connection;
    try {
      console.log('Connecting to the database...');
      connection = await mysql.createConnection(dbConfig);
      console.log('Connected to the database.');

      const [rows] = await connection.execute('SELECT * FROM Products WHERE subcategory_id = ?', [subCategoryId]);
      connection.end();
      
      console.log(`Products for sub-category ${subCategoryId} retrieved:`, rows);
      res.json(rows);
    } catch (error) {
      console.error(`Error fetching products for sub-category ${subCategoryId}:`, error);
      if (connection) {
        connection.end();
      }
      res.status(500).send('Internal Server Error');
    }
  });

  // Route pour récupérer tous les produits
    router.get('/products', async (req, res) => {
    console.log('Route /products called');
    let connection;
    try {
      console.log('Connecting to the database...');
      connection = await mysql.createConnection(dbConfig);
      console.log('Connected to the database.');
      
      const [rows] = await connection.execute('SELECT * FROM Products');
      connection.end();
      
      console.log('All products retrieved:', rows);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching all products:', error);
      if (connection) {
        connection.end();
      }
      res.status(500).send('Internal Server Error');
    }
  });

  // Route pour récupérer les détails d'un produit en fonction de l'ID du produit
    router.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    console.log(`Route /products/${productId} called`);
    let connection;
    try {
      console.log('Connecting to the database...');
      connection = await mysql.createConnection(dbConfig);
      console.log('Connected to the database.');
  
      const [rows] = await connection.execute('SELECT * FROM Products WHERE product_id = ?', [productId]);
      connection.end();
  
      if (rows.length > 0) {
        console.log(`Product ${productId} details retrieved:`, rows[0]);
        res.json(rows[0]);
      } else {
        console.log(`Product ${productId} not found.`);
        res.status(404).send(`Product ${productId} not found.`);
      }
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error);
      if (connection) {
        connection.end();
      }
      res.status(500).send('Internal Server Error');
    }
  });

  // Route pour récupérer 3 produits au hasard
router.get('/rng-products', async (req, res) => {
  console.log('Route /products called');
  let connection;
  try {
    console.log('Connecting to the database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to the database.');
    
    const [rows] = await connection.execute('SELECT * FROM Products ORDER BY RAND() LIMIT 3');
    connection.end();
    
    console.log('Random products retrieved:', rows);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching random products:', error);
    if (connection) {
      connection.end();
    }
    res.status(500).send('Internal Server Error');
  }
});

// Route pour créer un nouveau produit
router.post('/products', async (req, res) => {
    const { subcategory_id, name, description, price, stock } = req.body;
  
    // Vérification des champs
    if (!subcategory_id || !name || !description || price === undefined || stock === undefined) {
      console.log('Missing fields:', { subcategory_id, name, description, price, stock });
      return res.status(400).send('All fields are required');
    }
    const specialCharRegex = /[^a-zA-Z0-9 ]/g;
    if (specialCharRegex.test(name) || specialCharRegex.test(description)) {
      return res.status(400).send('No special characters allowed');
    }
  
    console.log(`Route POST /products called with subcategory_id: ${subcategory_id}, name: ${name}, description: ${description}, price: ${price}, stock: ${stock}`);
    let connection;
    try {
      console.log('Connecting to the database...');
      connection = await mysql.createConnection(dbConfig);
      console.log('Connected to the database.');
  
      // Insérer le produit dans la base de données
      const [result] = await connection.execute(
        'INSERT INTO Products (subcategory_id, name, description, price, stock) VALUES (?, ?, ?, ?, ?)',
        [subcategory_id, name, description, price, stock]
      );
      connection.end();
  
      if (result.affectedRows > 0) {
        console.log(`Product ${name} added.`);
        res.status(201).send(`Product ${name} added.`);
      } else {
        console.log(`Failed to add product ${name}.`);
        res.status(500).send(`Failed to add product ${name}.`);
      }
    } catch (error) {
      console.error(`Error adding product ${name}:`, error);
      if (connection) {
        connection.end();
      }
      res.status(500).send('Internal Server Error');
    }
  });
  
// Route pour modifier un produit
router.put('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { subcategory_id, name, description, price, stock } = req.body;
  
    // Vérification des champs
    if (!subcategory_id || !name || !description || price === undefined || stock === undefined) {
      console.log('Missing fields:', { subcategory_id, name, description, price, stock });
      return res.status(400).send('All fields are required');
    }
    const specialCharRegex = /[^a-zA-Z0-9 ]/g;
    if (specialCharRegex.test(name) || specialCharRegex.test(description)) {
      return res.status(400).send('No special characters allowed');
    }
  
    console.log(`Route PUT /products/${productId} called with subcategory_id: ${subcategory_id}, name: ${name}, description: ${description}, price: ${price}, stock: ${stock}`);
    let connection;
    try {
      console.log('Connecting to the database...');
      connection = await mysql.createConnection(dbConfig);
      console.log('Connected to the database.');
  
      // Mettre à jour le produit dans la base de données
      const [result] = await connection.execute(
        'UPDATE Products SET subcategory_id = ?, name = ?, description = ?, price = ?, stock = ? WHERE product_id = ?',
        [subcategory_id, name, description, price, stock, productId]
      );
      connection.end();
  
      if (result.affectedRows > 0) {
        console.log(`Product ${productId} updated.`);
        res.status(200).send(`Product ${productId} updated.`);
      } else {
        console.log(`Product ${productId} not found.`);
        res.status(404).send(`Product ${productId} not found.`);
      }
    } catch (error) {
      console.error(`Error updating product ${productId}:`, error);
      if (connection) {
        connection.end();
      }
      res.status(500).send('Internal Server Error');
    }
  });

    // Route pour supprimer un produit
    router.delete('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    console.log(`Route DELETE /products/${productId} called`);
    let connection;
    try {
      console.log('Connecting to the database...');
      connection = await mysql.createConnection(dbConfig);
      console.log('Connected to the database.');
  
      const [result] = await connection.execute('DELETE FROM Products WHERE product_id = ?', [productId]);
      connection.end();
  
      if (result.affectedRows > 0) {
        console.log(`Product ${productId} deleted.`);
        res.status(200).send(`Product ${productId} deleted.`);
      } else {
        console.log(`Product ${productId} not found.`);
        res.status(404).send(`Product ${productId} not found.`);
      }
    } catch (error) {
      console.error(`Error deleting product ${productId}:`, error);
      if (connection) {
        connection.end();
      }
      res.status(500).send('Internal Server Error');
    }
  });

  return router;
};

export default produitRoutes;
