import express from 'express';
import mysql from 'mysql2/promise';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configurer Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configurer Multer avec Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: async (req, file) => {
    return {
      folder: 'Gaming_avenue_images/images',
      format: 'jpg',
      public_id: `${req.body.name}_${file.fieldname}_${Date.now()}`
    };
  }
});

const upload = multer({ storage: storage });

const produitRoutes = (dbConfig) => {
  const router = express.Router();

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

  router.post('/products', upload.fields([{ name: 'image1' }, { name: 'image2' }, { name: 'image3' }]), async (req, res) => {
    const { subcategory_id, name, description, price, stock } = req.body;
    console.log(`Route POST /products called with subcategory_id: ${subcategory_id}, name: ${name}, description: ${description}, price: ${price}, stock: ${stock}`);
  
    // Vérification des champs
    if (!subcategory_id || !name || !description || price === undefined || stock === undefined) {
      console.log('Missing fields:', { subcategory_id, name, description, price, stock });
      return res.status(400).send('All fields are required');
    }
    const specialCharRegex = /[^a-zA-Z0-9 ]/g;
    if (specialCharRegex.test(name) || specialCharRegex.test(description)) {
      return res.status(400).send('No special characters allowed');
    }
  
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
  
      if (result.affectedRows > 0) {
        const product_id = result.insertId;
        const imageUrls = {
          image1: req.files.image1 ? req.files.image1[0].path : null,
          image2: req.files.image2 ? req.files.image2[0].path : null,
          image3: req.files.image3 ? req.files.image3[0].path : null
        };
  
        // Mettre à jour les URL des images dans la base de données
        await connection.execute(
          'UPDATE Products SET image1 = ?, image2 = ?, image3 = ? WHERE product_id = ?',
          [imageUrls.image1, imageUrls.image2, imageUrls.image3, product_id]
        );
  
        console.log(`Product ${name} added with images.`);
        res.status(201).send(`Product ${name} added.`);
      } else {
        console.log(`Failed to add product ${name}.`);
        res.status(500).send(`Failed to add product ${name}.`);
      }
      connection.end();
    } catch (error) {
      console.error(`Error adding product ${name}:`, error);
      if (connection) {
        connection.end();
      }
      res.status(500).send('Internal Server Error');
    }
  });
  
  router.patch('/products/:productId', upload.fields([{ name: 'image1' }, { name: 'image2' }, { name: 'image3' }]), async (req, res) => {
    const { productId } = req.params;
    const { subcategory_id, name, description, price, stock } = req.body;
    console.log(`Route PATCH /products/${productId} called with subcategory_id: ${subcategory_id}, name: ${name}, description: ${description}, price: ${price}, stock: ${stock}`);
  
    // Vérification des champs
    if (!subcategory_id || !name || !description || price === undefined || stock === undefined) {
      console.log('Missing fields:', { subcategory_id, name, description, price, stock });
      return res.status(400).send('All fields are required');
    }
  
    const specialCharRegex = /[^a-zA-Z0-9 ]/g;
    if (specialCharRegex.test(name) || specialCharRegex.test(description)) {
      return res.status(400).send('No special characters allowed');
    }
  
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
  
      if (result.affectedRows > 0) {
        const imageUrls = {
          image1: req.files.image1 ? req.files.image1[0].path : null,
          image2: req.files.image2 ? req.files.image2[0].path : null,
          image3: req.files.image3 ? req.files.image3[0].path : null
        };
  
        // Mettre à jour les URL des images dans la base de données
        await connection.execute(
          'UPDATE Products SET image1 = ?, image2 = ?, image3 = ? WHERE product_id = ?',
          [imageUrls.image1, imageUrls.image2, imageUrls.image3, productId]
        );
  
        console.log(`Product ${productId} updated with images.`);
        res.status(200).send(`Product ${productId} updated.`);
      } else {
        console.log(`Product ${productId} not found.`);
        res.status(404).send(`Product ${productId} not found.`);
      }
      connection.end();
    } catch (error) {
      console.error(`Error updating product ${productId}:`, error);
      if (connection) {
        connection.end();
      }
      res.status(500).send('Internal Server Error');
    }
  });
  
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
        // Supprimer les images associées du cloud
        await cloudinary.v2.uploader.destroy(`products/${productId}-image1`);
        await cloudinary.v2.uploader.destroy(`products/${productId}-image2`);
        await cloudinary.v2.uploader.destroy(`products/${productId}-image3`);
  
        console.log(`Product ${productId} deleted along with images.`);
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
