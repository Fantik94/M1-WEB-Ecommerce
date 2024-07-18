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

// Fonction de nettoyage pour les noms de fichiers
const cleanFileName = (fileName) => {
  return fileName.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
    .replace(/[^a-zA-Z0-9]/g, '_'); // Remplace les caractères spéciaux par des underscores
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'Gaming_avenue_images/categories',
    format: 'jpg',
    public_id: (req, file) => cleanFileName(file.originalname.split('.')[0])
  }
});

const upload = multer({ storage: storage });

const categorieRoutes = (dbConfig) => {
  const router = express.Router();

  // Endpoint pour récupérer toutes les catégories
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

  // Endpoint pour ajouter une nouvelle catégorie avec image
  router.post('/categories', upload.single('image'), async (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).send('Name and description are required');
    }
    const specialCharRegex = /[^a-zA-Z0-9 ]/g;
    if (specialCharRegex.test(name) || specialCharRegex.test(description)) {
      return res.status(400).send('No special characters allowed');
    }

    let connection;
    try {
      connection = await mysql.createConnection(dbConfig);
      const imageUrl = req.file ? req.file.path : null;
      const [result] = await connection.execute(
        'INSERT INTO Categories (name, description, image) VALUES (?, ?, ?)',
        [name, description, imageUrl]
      );
      const category_id = result.insertId;

      const [newCategory] = await connection.execute('SELECT * FROM Categories WHERE category_id = ?', [category_id]);
      connection.end();
      res.status(201).json(newCategory[0]);
    } catch (error) {
      console.error('Error adding category:', error);
      if (connection) connection.end();
      res.status(500).send('Internal Server Error');
    }
  });

  // Endpoint pour supprimer une catégorie et son image associée
  router.delete('/categories/:categoryId', async (req, res) => {
    const categoryId = req.params.categoryId;
    let connection;
    try {
      connection = await mysql.createConnection(dbConfig);

      const [subcategories] = await connection.execute('SELECT * FROM SubCategories WHERE category_id = ?', [categoryId]);
      if (subcategories.length > 0) {
        connection.end();
        return res.status(400).send(`Cannot delete category ${categoryId} because it has associated subcategories.`);
      }

      const [category] = await connection.execute('SELECT image FROM Categories WHERE category_id = ?', [categoryId]);
      const imageUrl = category[0]?.image;

      const [result] = await connection.execute('DELETE FROM Categories WHERE category_id = ?', [categoryId]);
      if (result.affectedRows > 0) {
        if (imageUrl) {
          const publicId = imageUrl.split('/').pop().split('.')[0];
          await cloudinary.v2.uploader.destroy(`Gaming_avenue_images/categories/${publicId}`);
        }
        connection.end();
        res.status(200).send(`Category ${categoryId} deleted.`);
      } else {
        connection.end();
        res.status(404).send(`Category ${categoryId} not found.`);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      if (connection) connection.end();
      res.status(500).send('Internal Server Error');
    }
  });

  // Endpoint pour modifier une catégorie avec image upload
  router.patch('/categories/:categoryId', upload.single('image'), async (req, res) => {
    const categoryId = req.params.categoryId;
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).send('Name and description are required');
    }
    const specialCharRegex = /[^a-zA-Z0-9 ]/g;
    if (specialCharRegex.test(name) || specialCharRegex.test(description)) {
      return res.status(400).send('No special characters allowed');
    }

    let connection;
    try {
      connection = await mysql.createConnection(dbConfig);

      // Récupérer l'ancienne image
      const [rows] = await connection.execute('SELECT image FROM Categories WHERE category_id = ?', [categoryId]);
      const oldImageUrl = rows.length > 0 ? rows[0].image : null;

      // Supprimer l'ancienne image de Cloudinary
      if (oldImageUrl) {
        const publicId = oldImageUrl.split('/').pop().split('.')[0];
        await cloudinary.v2.uploader.destroy(`Gaming_avenue_images/categories/${publicId}`);
      }

      const imageUrl = req.file ? req.file.path : null;

      if (imageUrl) {
        await connection.execute(
          'UPDATE Categories SET name = ?, description = ?, image = ? WHERE category_id = ?',
          [name, description, imageUrl, categoryId]
        );
      } else {
        await connection.execute(
          'UPDATE Categories SET name = ?, description = ? WHERE category_id = ?',
          [name, description, categoryId]
        );
      }

      connection.end();
      res.status(200).send(`Category ${categoryId} updated.`);
    } catch (error) {
      console.error('Error updating category:', error);
      if (connection) connection.end();
      res.status(500).send('Internal Server Error');
    }
  });

  return router;
};

export default categorieRoutes;
