import express from 'express';
import mysql from 'mysql2/promise';
import { body, validationResult } from 'express-validator';

const orderRoutes = (dbConfig) => {
  const router = express.Router();

  // Endpoint pour créer une nouvelle commande
  router.post('/orders',
    // Validation des champs
    body('user_id').isInt().withMessage('User ID must be an integer'),
    body('total_amount').isDecimal().withMessage('Total amount must be a decimal value'),
    body('shipping_address').isLength({ min: 1 }).withMessage('Shipping address is required'),
    body('payment_status').isLength({ min: 1 }).withMessage('Payment status is required'),
    body('order_status').isLength({ min: 1 }).withMessage('Order status is required'),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { user_id, total_amount, shipping_address, payment_status, order_status } = req.body;

      let connection;
      try {
        console.log('Connecting to the database...');
        connection = await mysql.createConnection(dbConfig);
        console.log('Connected to the database.');

        // Vérifier si l'utilisateur existe
        const [userRows] = await connection.execute('SELECT * FROM Users WHERE user_id = ?', [user_id]);
        if (userRows.length === 0) {
          connection.end();
          console.log(`User ID ${user_id} does not exist.`);
          return res.status(400).send(`User ID ${user_id} does not exist.`);
        }

        // Insérer la nouvelle commande dans la base de données
        const [result] = await connection.execute(
          'INSERT INTO Orders (user_id, total_amount, shipping_address, payment_status, order_status) VALUES (?, ?, ?, ?, ?)',
          [user_id, total_amount, shipping_address, payment_status, order_status]
        );
        connection.end();

        if (result.affectedRows > 0) {
          console.log(`Order for user ${user_id} added successfully.`);
          res.status(201).send(`Order for user ${user_id} added successfully.`);
        } else {
          console.log(`Failed to add order for user ${user_id}.`);
          res.status(500).send(`Failed to add order for user ${user_id}.`);
        }
      } catch (error) {
        console.error(`Error adding order for user ${user_id}:`, error);
        if (connection) {
          connection.end();
        }
        res.status(500).send('Internal Server Error');
      }
    }
  );

      // Endpoint pour récupérer toutes les commandes d'un utilisateur
      router.get('/orders/:user_id', async (req, res) => {
        const { user_id } = req.params;
        console.log(`Route GET /orders/${user_id} called`);
        let connection;
        try {
          console.log('Connecting to the database...');
          connection = await mysql.createConnection(dbConfig);
          console.log('Connected to the database.');
    
          // Récupérer les commandes de l'utilisateur
          const [rows] = await connection.execute('SELECT * FROM Orders WHERE user_id = ?', [user_id]);
          connection.end();
    
          if (rows.length > 0) {
            console.log(`Orders for user ${user_id} retrieved:`, rows);
            res.json(rows);
          } else {
            console.log(`No orders found for user ${user_id}.`);
            res.status(404).send(`No orders found for user ${user_id}.`);
          }
        } catch (error) {
          console.error(`Error fetching orders for user ${user_id}:`, error);
          if (connection) {
            connection.end();
          }
          res.status(500).send('Internal Server Error');
        }
      });

  // Endpoint pour modifier une commande
  router.patch('/orders/:user_id/:order_id',
    // Validation des champs
    body('order_status').isLength({ min: 1 }).withMessage('Order status is required'),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { user_id, order_id } = req.params;
      const { total_amount, shipping_address, payment_status, order_status } = req.body;

      let connection;
      try {
        console.log('Connecting to the database...');
        connection = await mysql.createConnection(dbConfig);
        console.log('Connected to the database.');

        // Vérifier si la commande existe
        const [orderRows] = await connection.execute('SELECT * FROM Orders WHERE order_id = ? AND user_id = ?', [order_id, user_id]);
        if (orderRows.length === 0) {
          connection.end();
          console.log(`Order ID ${order_id} for user ID ${user_id} does not exist.`);
          return res.status(404).send(`Order ID ${order_id} for user ID ${user_id} does not exist.`);
        }

        // Mettre à jour la commande dans la base de données
        const [result] = await connection.execute(
          'UPDATE Orders SET total_amount = ?, shipping_address = ?, payment_status = ?, order_status = ? WHERE order_id = ? AND user_id = ?',
          [total_amount, shipping_address, payment_status, order_status, order_id, user_id]
        );
        connection.end();

        if (result.affectedRows > 0) {
          console.log(`Order ${order_id} for user ${user_id} updated successfully.`);
          res.status(200).send(`Order ${order_id} for user ${user_id} updated successfully.`);
        } else {
          console.log(`Failed to update order ${order_id} for user ${user_id}.`);
          res.status(500).send(`Failed to update order ${order_id} for user ${user_id}.`);
        }
      } catch (error) {
        console.error(`Error updating order ${order_id} for user ${user_id}:`, error);
        if (connection) {
          connection.end();
        }
        res.status(500).send('Internal Server Error');
      }
    }
  );

  return router;
};

export default orderRoutes;
