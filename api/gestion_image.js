import express from 'express';
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
      folder: 'Gaming_avenue_images',
      format: 'jpg', // format de l'image (vous pouvez le rendre dynamique en fonction du fichier)
      public_id: file.originalname.split('.')[0] // Utiliser le nom original du fichier sans extension
    };
  }
});

const upload = multer({ storage: storage });

// Créer un routeur pour les routes de gestion des images
const router = express.Router();

// Route pour télécharger une image
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    res.json({ url: req.file.path, id: req.file.filename });
  } catch (error) {
    res.status(400).send('Error uploading image');
  }
});

// Route pour télécharger plusieurs images
router.post('/upload-multiple', upload.array('images', 10), (req, res) => {
  try {
    const files = req.files;
    const urls = files.map(file => ({ url: file.path, id: file.filename }));
    res.json(urls);
  } catch (error) {
    res.status(400).send('Error uploading images');
  }
});

// Route pour supprimer une image
router.delete('/delete/:id', (req, res) => {
  cloudinary.v2.uploader.destroy(req.params.id, (error, result) => {
    if (error) {
      res.status(500).send('Error deleting image');
    } else {
      res.send('Image deleted successfully');
    }
  });
});

export default router;
