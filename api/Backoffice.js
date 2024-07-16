import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';

const BackofficeRoutes = (dbConfig) => {
    const router = express.Router();

      // Route pour modifier un utilisateur et son profil
router.put('/users/:userId',
// Validation des champs
body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long')
  .matches(/^[a-zA-Z0-9 ]+$/).withMessage('Username must not contain special characters'),
body('email').isEmail().withMessage('Invalid email address')
  .matches(/^[a-zA-Z0-9@.]+$/).withMessage('Email must not contain special characters'),
body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  .matches(/^[a-zA-Z0-9]+$/).withMessage('Password must not contain special characters'),
body('firstName').isLength({ min: 1 }).withMessage('First name is required')
  .matches(/^[a-zA-Z]+$/).withMessage('First name must not contain special characters'),
body('lastName').isLength({ min: 1 }).withMessage('Last name is required')
  .matches(/^[a-zA-Z]+$/).withMessage('Last name must not contain special characters'),
body('phoneNumber').optional().matches(/^[0-9]+$/).withMessage('Phone number must be numeric'),
async (req, res) => {
  const { userId } = req.params;
  const { username, email, password, firstName, lastName, phoneNumber } = req.body;

  // Validation des champs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  console.log(`Route PUT /users/${userId} called with username: ${username}, email: ${email}, password: ${password ? '******' : 'not provided'}`);
  let connection;
  try {
    console.log('Connecting to the database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to the database.');

    // Commencer une transaction
    await connection.beginTransaction();

    // Mettre à jour l'utilisateur dans la base de données
    let userQuery = 'UPDATE Users SET username = ?, email = ?';
    const userParams = [username, email];

    if (password) {
      userQuery += ', password = ?';
      userParams.push(hashedPassword);
    }

    userQuery += ' WHERE user_id = ?';
    userParams.push(userId);

    await connection.execute(userQuery, userParams);

    // Mettre à jour le profil utilisateur dans la base de données
    await connection.execute(
      'UPDATE UserProfiles SET first_name = ?, last_name = ?, phone_number = ? WHERE user_id = ?',
      [firstName, lastName, phoneNumber, userId]
    );

    // Valider la transaction
    await connection.commit();
    connection.end();

    console.log(`User ${userId} updated successfully with profile.`);
    res.status(200).send(`User ${userId} updated successfully with profile.`);
  } catch (error) {
    console.error(`Error updating user ${userId}:`, error);
    if (connection) {
      await connection.rollback();
      connection.end();
    }
    res.status(500).send('Internal Server Error');
  }
}
);

  // Route pour récupérer les informations de tous les utilisateurs
  router.get('/users', async (req, res) => {
    console.log('Route GET /users called');
    let connection;
    try {
      console.log('Connecting to the database...');
      connection = await mysql.createConnection(dbConfig);
      console.log('Connected to the database.');

      const [rows] = await connection.execute('SELECT * FROM Users');
      connection.end();

      console.log('Users retrieved:', rows);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching users:', error);
      if (connection) {
        connection.end();
      }
      res.status(500).send('Internal Server Error');
    }
  });

    // Route pour récupérer les informations d'un utilisateur et de son profil
    router.get('/users/:userId', async (req, res) => {
        const { userId } = req.params;
        let connection;
        try {
          console.log('Connecting to the database...');
          connection = await mysql.createConnection(dbConfig);
          console.log('Connected to the database.');
    
          const [userRows] = await connection.execute('SELECT * FROM Users WHERE user_id = ?', [userId]);
          const [profileRows] = await connection.execute('SELECT * FROM UserProfiles WHERE user_id = ?', [userId]);
          connection.end();
    
          if (userRows.length > 0) {
            const user = userRows[0];
            const profile = profileRows[0] || {};
            console.log(`User ${userId} details retrieved:`, { ...user, ...profile });
            res.json({ ...user, ...profile });
          } else {
            console.log(`User ${userId} not found.`);
            res.status(404).send(`User ${userId} not found.`);
          }
        } catch (error) {
          console.error(`Error fetching user ${userId}:`, error);
          if (connection) {
            connection.end();
          }
          res.status(500).send('Internal Server Error');
        }
      });

      // Route pour supprimer un utilisateur et son profil
  router.delete('/users/:userId', async (req, res) => {
    const { userId } = req.params;
    console.log(`Route DELETE /users/${userId} called`);
    let connection;
    try {
      console.log('Connecting to the database...');
      connection = await mysql.createConnection(dbConfig);
      console.log('Connected to the database.');

      // Commencer une transaction
      await connection.beginTransaction();

      // Supprimer le profil utilisateur
      await connection.execute('DELETE FROM UserProfiles WHERE user_id = ?', [userId]);

      // Supprimer l'utilisateur
      const [result] = await connection.execute('DELETE FROM Users WHERE user_id = ?', [userId]);

      // Valider la transaction
      await connection.commit();
      connection.end();

      if (result.affectedRows > 0) {
        console.log(`User ${userId} and profile deleted.`);
        res.status(200).send(`User ${userId} and profile deleted.`);
      } else {
        console.log(`User ${userId} not found.`);
        res.status(404).send(`User ${userId} not found.`);
      }
    } catch (error) {
      console.error(`Error deleting user ${userId}:`, error);
      if (connection) {
        await connection.rollback();
        connection.end();
      }
      res.status(500).send('Internal Server Error');
    }
  });

    return router;
};

export default BackofficeRoutes;