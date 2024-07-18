import express from 'express';
import mysql from 'mysql2/promise';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import { authenticateJWT, authorizeRoles } from './middleware/authMiddleware.js'; 

dotenv.config();

// Configurer Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Fonction pour normaliser les noms de fichiers
const normalizeFileName = (originalname) => {
  return originalname
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '_');  // Remplace les char non-alphanumeric avec un _
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: async (req, file) => {
    const normalizedFileName = normalizeFileName(file.originalname.split('.')[0]);
    return {
      folder: 'Gaming_avenue_images/images',
      format: 'jpg',
      public_id: `${req.body.name}_${file.fieldname}_${normalizedFileName}`
    };
  }
});

const upload = multer({ storage: storage });

const produitRoutes = (dbConfig) => {
  const router = express.Router();
  //Endpoint pour prduit en fonction de la categorie et sa subcategorie
  router.get('/categories/:categoryId/subcategories/:subCategoryId/products', async (req, res) => {
    const { subCategoryId } = req.params;
    let connection;
    try {
      connection = await mysql.createConnection(dbConfig);
      const [rows] = await connection.execute('SELECT * FROM Products WHERE subcategory_id = ?', [subCategoryId]);
      connection.end();
      res.json(rows);
    } catch (error) {
      console.error('Error fetching products:', error);
      if (connection) connection.end();
      res.status(500).send('Internal Server Error');
    }
  });
  //Endpoint de tout les produits
  router.get('/products', async (req, res) => {
    let connection;
    try {
      connection = await mysql.createConnection(dbConfig);
      const [rows] = await connection.execute('SELECT * FROM Products');
      connection.end();
      res.json(rows);
    } catch (error) {
      console.error('Error fetching products:', error);
      if (connection) connection.end();
      res.status(500).send('Internal Server Error');
    }
  });

  //Endpoint pour un produit en fonction de son ID
  router.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    let connection;
    try {
      connection = await mysql.createConnection(dbConfig);
      const [rows] = await connection.execute('SELECT * FROM Products WHERE product_id = ?', [productId]);
      connection.end();
      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.status(404).send(`Product ${productId} not found.`);
      }
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      if (connection) connection.end();
      res.status(500).send('Internal Server Error');
    }
  });

  //Endpoint pour avoir 3 produits aléatiore
  router.get('/rng-products', async (req, res) => {
    let connection;
    try {
      connection = await mysql.createConnection(dbConfig);
      const [rows] = await connection.execute('SELECT * FROM Products ORDER BY RAND() LIMIT 3');
      connection.end();
      res.json(rows);
    } catch (error) {
      console.error('Error fetching random products:', error);
      if (connection) connection.end();
      res.status(500).send('Internal Server Error');
    }
  });
  //Endpoint pour ajouter un produit
  router.post('/products', upload.fields([{ name: 'image1' }, { name: 'image2' }, { name: 'image3' }]), async (req, res) => {
    const { subcategory_id, name, description, price, stock } = req.body;

    // Vérification des champs
    if (!subcategory_id || !name || !description || price === undefined || stock === undefined) {
      return res.status(400).send('All fields are required');
    }
    const specialCharRegex = /[^a-zA-Z0-9 ]/g;
    if (specialCharRegex.test(name) || specialCharRegex.test(description)) {
      return res.status(400).send('No special characters allowed');
    }

    let connection;
    try {
      connection = await mysql.createConnection(dbConfig);

      // Insérer le produit dans la base de données
      const [result] = await connection.execute(
        'INSERT INTO Products (subcategory_id, name, description, price, stock, image1, image2, image3) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [subcategory_id, name, description, price, stock, '', '', '']
      );

      if (result.affectedRows > 0) {
        const product_id = result.insertId;
        const imageUrls = {
          image1: req.files.image1 ? req.files.image1[0].path : '',
          image2: req.files.image2 ? req.files.image2[0].path : '',
          image3: req.files.image3 ? req.files.image3[0].path : ''
        };

        // Mettre à jour les URL des images dans la base de données
        await connection.execute(
          'UPDATE Products SET image1 = ?, image2 = ?, image3 = ? WHERE product_id = ?',
          [imageUrls.image1, imageUrls.image2, imageUrls.image3, product_id]
        );

        res.status(201).send({ message: `Product ${name} added.`, product_id });
      } else {
        res.status(500).send(`Failed to add product ${name}.`);
      }
      connection.end();
    } catch (error) {
      console.error('Error adding product:', error);
      if (connection) connection.end();
      res.status(500).send('Internal Server Error');
    }
  });
  //Endpoint pour modifier un produit
  router.patch('/products/:productId', upload.fields([{ name: 'image1' }, { name: 'image2' }, { name: 'image3' }]), async (req, res) => {
    const { productId } = req.params;
    const { subcategory_id, name, description, price, stock } = req.body;

    // Vérification des champs
    if (!subcategory_id || !name || !description || price === undefined || stock === undefined) {
      return res.status(400).send('All fields are required');
    }

    const specialCharRegex = /[^a-zA-Z0-9 ]/g;
    if (specialCharRegex.test(name) || specialCharRegex.test(description)) {
      return res.status(400).send('No special characters allowed');
    }

    let connection;
    try {
      connection = await mysql.createConnection(dbConfig);

      // Récupérer les anciennes images
      const [rows] = await connection.execute(
        'SELECT image1, image2, image3 FROM Products WHERE product_id = ?',
        [productId]
      );

      const oldImageUrls = rows.length > 0 ? rows[0] : {};

      // Supprimer les anciennes images de Cloudinary
      for (const [key, url] of Object.entries(oldImageUrls)) {
        if (url) {
          const publicId = url.split('/').pop().split('.')[0];
          await cloudinary.v2.uploader.destroy(`Gaming_avenue_images/images/${publicId}`, (error, result) => {
            if (error) {
              console.error('Error deleting old image from Cloudinary:', error);
            } else {
              console.log('Old image deleted from Cloudinary:', result);
            }
          });
        }
      }

      const imageUrls = {
        image1: req.files.image1 ? req.files.image1[0].path : '',
        image2: req.files.image2 ? req.files.image2[0].path : '',
        image3: req.files.image3 ? req.files.image3[0].path : ''
      };

      // Mettre à jour le produit dans la base de données
      const [result] = await connection.execute(
        'UPDATE Products SET subcategory_id = ?, name = ?, description = ?, price = ?, stock = ?, image1 = ?, image2 = ?, image3 = ? WHERE product_id = ?',
        [subcategory_id, name, description, price, stock, imageUrls.image1, imageUrls.image2, imageUrls.image3, productId]
      );

      if (result.affectedRows > 0) {
        res.status(200).send(`Product ${productId} updated.`);
      } else {
        res.status(404).send(`Product ${productId} not found.`);
      }
      connection.end();
    } catch (error) {
      console.error('Error updating product:', error);
      if (connection) connection.end();
      res.status(500).send('Internal Server Error');
    }
  });
  //Endpoint pour supprimer un produit
  router.delete('/products/:productId', authenticateJWT, authorizeRoles(['admin']), async (req, res) => {
    const { productId } = req.params;
    let connection;
    try {
      connection = await mysql.createConnection(dbConfig);

      // Récupérer les images associées
      const [rows] = await connection.execute('SELECT image1, image2, image3 FROM Products WHERE product_id = ?', [productId]);
      const images = rows[0];

      // Supprimer le produit de la base de données
      const [result] = await connection.execute('DELETE FROM Products WHERE product_id = ?', [productId]);

      if (result.affectedRows > 0) {
        // Supprimer les images associées du cloud
        for (const [key, url] of Object.entries(images)) {
          if (url) {
            const publicId = url.split('/').pop().split('.')[0];
            await cloudinary.v2.uploader.destroy(`Gaming_avenue_images/images/${publicId}`, (error, result) => {
              if (error) {
                console.error('Error deleting image from Cloudinary:', error);
              } else {
                console.log('Image deleted from Cloudinary:', result);
              }
            });
          }
        }

        res.status(200).send(`Product ${productId} deleted.`);
      } else {
        res.status(404).send(`Product ${productId} not found.`);
      }
      connection.end();
    } catch (error) {
      console.error('Error deleting product:', error);
      if (connection) connection.end();
      res.status(500).send('Internal Server Error');
    }
  });

  //Page Recherche
  router.get('/search', async (req, res) => {
    const { query } = req.query;
    if (!query) {
      return res.status(400).send('Query parameter is required');
    }
  
    let connection;
    try {
      connection = await mysql.createConnection(dbConfig);
  
      const [results] = await connection.execute(
        'SELECT * FROM Products WHERE name LIKE ? OR description LIKE ?',
        [`%${query}%`, `%${query}%`]
      );
  
      connection.end();
      res.json(results);
    } catch (error) {
      if (connection) connection.end();
      res.status(500).send('Internal Server Error');
    }
  });

  return router;
};

export default produitRoutes;
