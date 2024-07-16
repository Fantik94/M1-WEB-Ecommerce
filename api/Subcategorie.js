import express from 'express';
import mysql from 'mysql2/promise';

const subCategorieRoutes = (dbConfig) => {
  const router = express.Router();

  // Route pour récupérer les sous-catégories d'une catégorie
  router.get('/subcategories', async (req, res) => {
  const { category_id } = req.query;
  console.log(`Route /subcategories called with category_id: ${category_id}`);
  if (!category_id) {
    return res.status(400).send('category_id is required');
  }

  let connection;
  try {
    console.log('Connecting to the database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to the database.');

    const [rows] = await connection.execute('SELECT * FROM SubCategories WHERE category_id = ?', [category_id]);
    connection.end();

    console.log(`Subcategories for category ${category_id} retrieved:`, rows);
    res.json(rows);
  } catch (error) {
    console.error(`Error fetching subcategories for category ${category_id}:`, error);
    if (connection) {
      connection.end();
    }
    res.status(500).send('Internal Server Error');
  }
});


// Route pour récupérer toutes les sous-catégories avec les noms des catégories
router.get('/allsubcategories', async (req, res) => {
  console.log('Route /allsubcategories called');
  
  let connection;
  try {
    console.log('Connecting to the database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to the database.');

    const [subCategories] = await connection.execute('SELECT * FROM SubCategories');
    const [categories] = await connection.execute('SELECT * FROM Categories');
    connection.end();

    const subCategoriesWithCategoryNames = subCategories.map(subCategory => {
      const category = categories.find(category => category.category_id === subCategory.category_id);
      return {
        ...subCategory,
        category_name: category ? category.name : 'Unknown'
      };
    });

    console.log('All subcategories with category names retrieved:', subCategoriesWithCategoryNames);
    res.json(subCategoriesWithCategoryNames);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    if (connection) {
      connection.end();
    }
    res.status(500).send('Internal Server Error');
  }
});


// Route pour créer une nouvelle sous-catégorie
router.post('/subcategories', async (req, res) => {
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

  console.log(`Route POST /subcategories called with category_id: ${category_id}, name: ${name}, description: ${description}`);
  let connection;
  try {
    console.log('Connecting to the database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to the database.');

    const [result] = await connection.execute(
      'INSERT INTO SubCategories (category_id, name, description) VALUES (?, ?, ?)',
      [category_id, name, description]
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
router.delete('/subcategories/:subCategoryId', async (req, res) => {
  const subCategoryId = req.params.subCategoryId;
  console.log(`Route DELETE /subcategories/${subCategoryId} called`);
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
router.put('/subcategories/:subcategory_id', async (req, res) => {
  const subcategory_id = req.params.subcategory_id;
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

  console.log(`Route PUT /subcategories/${subcategory_id} called with category_id: ${category_id}, name: ${name}, description: ${description}`);
  let connection;
  try {
    console.log('Connecting to the database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to the database.');

    const [result] = await connection.execute(
      'UPDATE SubCategories SET category_id = ?, name = ?, description = ? WHERE subcategory_id = ?',
      [category_id, name, description, subcategory_id]
    );
    connection.end();

    if (result.affectedRows > 0) {
      console.log(`Sub-category ${subcategory_id} updated.`);
      res.status(200).send(`Sub-category ${subcategory_id} updated.`);
    } else {
      console.log(`Sub-category ${subcategory_id} not found.`);
      res.status(404).send(`Sub-category ${subcategory_id} not found.`);
    }
  } catch (error) {
    console.error(`Error updating sub-category ${subcategory_id}:`, error);
    if (connection) {
      connection.end();
    }
    res.status(500).send('Internal Server Error');
  }
});

  return router;
};

export default subCategorieRoutes;
