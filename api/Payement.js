import express from 'express';
import mysql from 'mysql2/promise';
import { body, validationResult } from 'express-validator';

const paymentRoutes = (dbConfig) => {
  const router = express.Router();

  // Endpoint pour ajouter un nouveau paiement
  router.post('/payments/:user_id',
    // Validation des champs
    body('numero_carte').isLength({ min: 16, max: 20 }).withMessage('Card number must be between 16 and 20 characters'),
    body('date_expiration_carte').isDate().withMessage('Expiration date must be a valid date'),
    body('cvc_carte').isLength({ min: 3, max: 4 }).withMessage('CVC must be 3 or 4 characters'),
    body('nom_carte').isLength({ min: 1 }).withMessage('Name on card is required'),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { user_id } = req.params;
      const { numero_carte, date_expiration_carte, cvc_carte, nom_carte } = req.body;

      let connection;
      try {
        console.log('Connecting to the database...');
        connection = await mysql.createConnection(dbConfig);
        console.log('Connected to the database.');

        // Ajouter un nouveau paiement dans la base de données
        const [result] = await connection.execute(
          'INSERT INTO Payments (user_id, numero_carte, date_expiration_carte, cvc_carte, nom_carte) VALUES (?, ?, ?, ?, ?)',
          [user_id, numero_carte, date_expiration_carte, cvc_carte, nom_carte]
        );
        connection.end();

        if (result.affectedRows > 0) {
          console.log(`Payment added successfully for user ${user_id}.`);
          res.status(201).send(`Payment added successfully for user ${user_id}.`);
        } else {
          console.log(`Failed to add payment for user ${user_id}.`);
          res.status(500).send(`Failed to add payment for user ${user_id}.`);
        }
      } catch (error) {
        console.error(`Error adding payment for user ${user_id}:`, error);
        res.status(500).send('Internal Server Error');
      }
    }
  );


  // Endpoint pour obtenir toutes les méthodes de paiement d'un utilisateur
  router.get('/payments/:user_id', async (req, res) => {
    const { user_id } = req.params;
    console.log(`Route GET /payments/${user_id} called`);
    let connection;
    try {
      console.log('Connecting to the database...');
      connection = await mysql.createConnection(dbConfig);
      console.log('Connected to the database.');

      // Récupérer les méthodes de paiement de l'utilisateur
      const [rows] = await connection.execute('SELECT * FROM Payments WHERE user_id = ?', [user_id]);
      connection.end();

      if (rows.length > 0) {
        console.log(`Payments for user ${user_id} retrieved:`, rows);
        res.json(rows);
      } else {
        console.log(`No payments found for user ${user_id}.`);
        res.status(404).send(`No payments found for user ${user_id}.`);
      }
    } catch (error) {
      console.error(`Error fetching payments for user ${user_id}:`, error);
      if (connection) {
        connection.end();
      }
      res.status(500).send('Internal Server Error');
    }
  });

  // Endpoint pour supprimer une méthode de paiement
  router.delete('/payments/:user_id/:payments_id', async (req, res) => {
    const { user_id, payments_id } = req.params;
    console.log(`Route DELETE /payments/${user_id}/${payments_id} called`);
    let connection;
    try {
      console.log('Connecting to the database...');
      connection = await mysql.createConnection(dbConfig);
      console.log('Connected to the database.');

      // Supprimer la méthode de paiement de l'utilisateur
      const [result] = await connection.execute('DELETE FROM Payments WHERE user_id = ? AND payments_id = ?', [user_id, payments_id]);
      connection.end();

      if (result.affectedRows > 0) {
        console.log(`Payment ${payments_id} for user ${user_id} deleted successfully.`);
        res.status(200).send(`Payment ${payments_id} for user ${user_id} deleted successfully.`);
      } else {
        console.log(`Payment ${payments_id} for user ${user_id} not found.`);
        res.status(404).send(`Payment ${payments_id} for user ${user_id} not found.`);
      }
    } catch (error) {
      console.error(`Error deleting payment ${payments_id} for user ${user_id}:`, error);
      if (connection) {
        connection.end();
      }
      res.status(500).send('Internal Server Error');
    }
  });

   // Endpoint pour modifier une méthode de paiement
   router.patch('/payments/:user_id/:payments_id',
   // Validation des champs
   body('numero_carte').optional().isLength({ min: 16, max: 20 }).withMessage('Card number must be between 16 and 20 characters'),
   body('date_expiration_carte').optional().isDate().withMessage('Expiration date must be a valid date'),
   body('cvc_carte').optional().isLength({ min: 3, max: 4 }).withMessage('CVC must be 3 or 4 characters'),
   body('nom_carte').optional().isLength({ min: 1 }).withMessage('Name on card is required'),
   async (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }

     const { user_id, payments_id } = req.params;
     const { numero_carte, date_expiration_carte, cvc_carte, nom_carte } = req.body;

     let connection;
     try {
       console.log('Connecting to the database...');
       connection = await mysql.createConnection(dbConfig);
       console.log('Connected to the database.');

       // Vérifier si la méthode de paiement existe
       const [paymentRows] = await connection.execute('SELECT * FROM Payments WHERE user_id = ? AND payments_id = ?', [user_id, payments_id]);
       if (paymentRows.length === 0) {
         connection.end();
         console.log(`Payment ID ${payments_id} for user ID ${user_id} does not exist.`);
         return res.status(404).send(`Payment ID ${payments_id} for user ID ${user_id} does not exist.`);
       }

       // Mettre à jour la méthode de paiement dans la base de données
       const [result] = await connection.execute(
         'UPDATE Payments SET numero_carte = IFNULL(?, numero_carte), date_expiration_carte = IFNULL(?, date_expiration_carte), cvc_carte = IFNULL(?, cvc_carte), nom_carte = IFNULL(?, nom_carte) WHERE user_id = ? AND payments_id = ?',
         [numero_carte, date_expiration_carte, cvc_carte, nom_carte, user_id, payments_id]
       );
       connection.end();

       if (result.affectedRows > 0) {
         console.log(`Payment ${payments_id} for user ${user_id} updated successfully.`);
         res.status(200).send(`Payment ${payments_id} for user ${user_id} updated successfully.`);
       } else {
         console.log(`Failed to update payment ${payments_id} for user ${user_id}.`);
         res.status(500).send(`Failed to update payment ${payments_id} for user ${user_id}.`);
       }
     } catch (error) {
       console.error(`Error updating payment ${payments_id} for user ${user_id}:`, error);
       if (connection) {
         connection.end();
       }
       res.status(500).send('Internal Server Error');
     }
   }
 );

  return router;
};

export default paymentRoutes;
