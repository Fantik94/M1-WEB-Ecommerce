import express from 'express';
import mysql from 'mysql2/promise';
import { body, validationResult } from 'express-validator';

const adresseRoutes = (dbConfig) => {
  const router = express.Router();

  // Endpoint pour créer une nouvelle adresse
  router.post('/addresses/:user_id',
    // Validation des champs
    body('street').isLength({ min: 1 }).withMessage('Street is required'),
    body('city').isLength({ min: 1 }).withMessage('City is required'),
    body('state').isLength({ min: 1 }).withMessage('State is required'),
    body('postal_code').isLength({ min: 1 }).withMessage('Postal code is required')
      .matches(/^[a-zA-Z0-9 ]+$/).withMessage('Postal code must not contain special characters'),
    body('country').isLength({ min: 1 }).withMessage('Country is required'),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { user_id } = req.params;
      const { street, city, state, postal_code, country } = req.body;

      try {
        console.log('Connecting to the database...');
        const connection = await mysql.createConnection(dbConfig);
        console.log('Connected to the database.');

        // Insérer la nouvelle adresse dans la base de données
        const [result] = await connection.execute(
          'INSERT INTO addresses (user_id, street, city, state, postal_code, country) VALUES (?, ?, ?, ?, ?, ?)',
          [user_id, street, city, state, postal_code, country]
        );
        connection.end();

        if (result.affectedRows > 0) {
          console.log(`Address for user ${user_id} added successfully.`);
          res.status(201).send(`Address for user ${user_id} added successfully.`);
        } else {
          console.log(`Failed to add address for user ${user_id}.`);
          res.status(500).send(`Failed to add address for user ${user_id}.`);
        }
      } catch (error) {
        console.error(`Error adding address for user ${user_id}:`, error);
        res.status(500).send('Internal Server Error');
      }
    }
  );

  // Endpoint pour récupérer les adresses d'un utilisateur
  router.get('/addresses/:user_id', async (req, res) => {
    const { user_id } = req.params;
    console.log(`Route GET /addresses/${user_id} called`);
    let connection;
    try {
      console.log('Connecting to the database...');
      connection = await mysql.createConnection(dbConfig);
      console.log('Connected to the database.');

      // Récupérer les adresses de l'utilisateur
      const [rows] = await connection.execute('SELECT * FROM Addresses WHERE user_id = ?', [user_id]);
      connection.end();

      if (rows.length > 0) {
        console.log(`Addresses for user ${user_id} retrieved:`, rows);
        res.json(rows);
      } else {
        console.log(`No addresses found for user ${user_id}.`);
        res.status(404).send(`No addresses found for user ${user_id}.`);
      }
    } catch (error) {
      console.error(`Error fetching addresses for user ${user_id}:`, error);
      if (connection) {
        connection.end();
      }
      res.status(500).send('Internal Server Error');
    }
  });

  // Endpoint pour supprimer une adresse
  router.delete('/addresses/:user_id/:address_id', async (req, res) => {
    const { user_id, address_id } = req.params;
    console.log(`Route DELETE /addresses/${user_id}/${address_id} called`);
    let connection;
    try {
      console.log('Connecting to the database...');
      connection = await mysql.createConnection(dbConfig);
      console.log('Connected to the database.');

      // Supprimer l'adresse de l'utilisateur
      const [result] = await connection.execute('DELETE FROM Addresses WHERE user_id = ? AND address_id = ?', [user_id, address_id]);
      connection.end();

      if (result.affectedRows > 0) {
        console.log(`Address ${address_id} for user ${user_id} deleted successfully.`);
        res.status(200).send(`Address ${address_id} for user ${user_id} deleted successfully.`);
      } else {
        console.log(`Address ${address_id} for user ${user_id} not found.`);
        res.status(404).send(`Address ${address_id} for user ${user_id} not found.`);
      }
    } catch (error) {
      console.error(`Error deleting address ${address_id} for user ${user_id}:`, error);
      if (connection) {
        connection.end();
      }
      res.status(500).send('Internal Server Error');
    }
  });

  // Endpoint pour modifier une adresse
  router.put('/addresses/:user_id/:address_id',
    // Validation des champs
    body('street').isLength({ min: 1 }).withMessage('Street is required'),
    body('city').isLength({ min: 1 }).withMessage('City is required'),
    body('state').isLength({ min: 1 }).withMessage('State is required'),
    body('postal_code').isLength({ min: 1 }).withMessage('Postal code is required')
      .matches(/^[a-zA-Z0-9 ]+$/).withMessage('Postal code must not contain special characters'),
    body('country').isLength({ min: 1 }).withMessage('Country is required'),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { user_id, address_id } = req.params;
      const { street, city, state, postal_code, country } = req.body;

      try {
        console.log('Connecting to the database...');
        const connection = await mysql.createConnection(dbConfig);
        console.log('Connected to the database.');

        // Mettre à jour l'adresse dans la base de données
        const [result] = await connection.execute(
          'UPDATE Addresses SET street = ?, city = ?, state = ?, postal_code = ?, country = ? WHERE user_id = ? AND address_id = ?',
          [street, city, state, postal_code, country, user_id, address_id]
        );
        connection.end();

        if (result.affectedRows > 0) {
          console.log(`Address ${address_id} for user ${user_id} updated successfully.`);
          res.status(200).send(`Address ${address_id} for user ${user_id} updated successfully.`);
        } else {
          console.log(`Address ${address_id} for user ${user_id} not found.`);
          res.status(404).send(`Address ${address_id} for user ${user_id} not found.`);
        }
      } catch (error) {
        console.error(`Error updating address ${address_id} for user ${user_id}:`, error);
        res.status(500).send('Internal Server Error');
      }
    }
  );

  return router;
};

export default adresseRoutes;
