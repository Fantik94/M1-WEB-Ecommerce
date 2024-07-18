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

// Fonction pour normaliser les noms de fichiers
const normalizeFileName = (originalname) => {
  return originalname
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-zA-Z0-9]/g, '_');  // Replace non-alphanumeric characters with underscores
};

// Configurer Multer avec Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: async (req, file) => {
    const normalizedFileName = normalizeFileName(file.originalname.split('.')[0]);
    return {
      folder: 'Gaming_avenue_images/subcategories',
      format: 'jpg',
      public_id: normalizedFileName
    };
  }
});

const upload = multer({ storage: storage });

const subCategorieRoutes = (dbConfig) => {
  const router = express.Router();

  // Route pour récupérer les sous-catégories d'une catégorie
  router.get('/subcategories', async (req, res) => {
    const { category_id } = req.query;
    if (!category_id) {
      return res.status(400).send('category_id is required');
    }

    let connection;
    try {
      connection = await mysql.createConnection(dbConfig);
      const [rows] = await connection.execute('SELECT * FROM SubCategories WHERE category_id = ?', [category_id]);
      connection.end();
      res.json(rows);
    } catch (error) {
      if (connection) connection.end();
      res.status(500).send('Internal Server Error');
    }
  });

  // Route pour récupérer toutes les sous-catégories avec les noms des catégories
  router.get('/allsubcategories', async (req, res) => {
    let connection;
    try {
      connection = await mysql.createConnection(dbConfig);
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

      res.json(subCategoriesWithCategoryNames);
    } catch (error) {
      if (connection) connection.end();
      res.status(500).send('Internal Server Error');
    }
  });

  // Route pour créer une nouvelle sous-catégorie
  router.post('/subcategories', upload.single('image'), async (req, res) => {
    const { category_id, name, description } = req.body;

    if (!category_id || !name || !description) {
      return res.status(400).send('Category ID, name, and description are required');
    }

    let connection;
    try {
      connection = await mysql.createConnection(dbConfig);
      const [result] = await connection.execute(
        'INSERT INTO SubCategories (category_id, name, description) VALUES (?, ?, ?)',
        [category_id, name, description]
      );

      const subcategory_id = result.insertId;
      const imageUrl = req.file.path;

      await connection.execute(
        'UPDATE SubCategories SET image = ? WHERE subcategory_id = ?',
        [imageUrl, subcategory_id]
      );

      connection.end();
      res.status(201).send({ message: `Sub-category ${name} added.`, subcategory_id, imageUrl });
    } catch (error) {
      if (connection) connection.end();
      res.status(500).send('Internal Server Error');
    }
  });

  // Route pour supprimer une sous-catégorie
  router.delete('/subcategories/:subCategoryId', async (req, res) => {
    const subCategoryId = req.params.subCategoryId;
    let connection;
    try {
      connection = await mysql.createConnection(dbConfig);
      
      // Vérifier s'il y a des produits dans cette sous-catégorie
      const [products] = await connection.execute('SELECT * FROM Products WHERE subcategory_id = ?', [subCategoryId]);
      if (products.length > 0) {
        connection.end();
        return res.status(400).send(`Cannot delete sub-category ${subCategoryId} because it has associated products.`);
      }

      // Récupérer l'URL de l'image
      const [subCategory] = await connection.execute('SELECT image FROM SubCategories WHERE subcategory_id = ?', [subCategoryId]);
      const imageUrl = subCategory[0]?.image;

      // Supprimer la sous-catégorie
      const [result] = await connection.execute('DELETE FROM SubCategories WHERE subcategory_id = ?', [subCategoryId]);

      if (result.affectedRows > 0) {
        if (imageUrl) {
          const publicId = imageUrl.split('/').pop().split('.')[0]; // Extraire l'ID public de l'URL de l'image
          await cloudinary.v2.uploader.destroy(`Gaming_avenue_images/subcategories/${publicId}`);
        }
        connection.end();
        res.status(200).send(`Sub-category ${subCategoryId} deleted.`);
      } else {
        connection.end();
        res.status(404).send(`Sub-category ${subCategoryId} not found.`);
      }
    } catch (error) {
      if (connection) connection.end();
      res.status(500).send('Internal Server Error');
    }
  });

  // Route pour modifier une sous-catégorie avec image upload
  router.patch('/subcategories/:subCategoryId', upload.single('image'), async (req, res) => {
    const subCategoryId = req.params.subCategoryId;
    const { category_id, name, description } = req.body;

    if (!category_id || !name || !description) {
      return res.status(400).send('Category ID, name, and description are required');
    }

    let connection;
    try {
      connection = await mysql.createConnection(dbConfig);

      // Récupérer l'ancienne image
      const [rows] = await connection.execute(
        'SELECT image FROM SubCategories WHERE subcategory_id = ?',
        [subCategoryId]
      );

      const oldImageUrl = rows.length > 0 ? rows[0].image : null;

      // Supprimer l'ancienne image de Cloudinary
      if (oldImageUrl) {
        const publicId = oldImageUrl.split('/').pop().split('.')[0];
        await cloudinary.v2.uploader.destroy(`Gaming_avenue_images/subcategories/${publicId}`, (error, result) => {
          if (error) {
            console.error('Error deleting old image from Cloudinary:', error);
          } else {
            console.log('Old image deleted from Cloudinary:', result);
          }
        });
      }

      const imageUrl = req.file ? req.file.path : null;

      if (imageUrl) {
        await connection.execute(
          'UPDATE SubCategories SET category_id = ?, name = ?, description = ?, image = ? WHERE subcategory_id = ?',
          [category_id, name, description, imageUrl, subCategoryId]
        );
      } else {
        await connection.execute(
          'UPDATE SubCategories SET category_id = ?, name = ?, description = ? WHERE subcategory_id = ?',
          [category_id, name, description, subCategoryId]
        );
      }

      connection.end();
      res.status(200).send(`Sub-category ${subCategoryId} updated.`);
    } catch (error) {
      if (connection) connection.end();
      res.status(500).send('Internal Server Error');
    }
  });

  return router;
};

export default subCategorieRoutes;
