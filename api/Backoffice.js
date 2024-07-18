import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';

const BackofficeRoutes = (dbConfig) => {
  const router = express.Router();

    // Endpoint pour modifier un user
  router.patch('/users/:userId',
    // validation des champs
    body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long')
      .matches(/^[a-zA-Z0-9 ]+$/).withMessage('Username must not contain special characters'),
    body('email').isEmail().withMessage('Invalid email address')
      .matches(/^[a-zA-Z0-9@.]+$/).withMessage('Email must not contain special characters'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
      .matches(/^[a-zA-Z0-9]+$/).withMessage('Password must not contain special characters'),
    body('first_name').isLength({ min: 1 }).withMessage('First name is required')
      .matches(/^[a-zA-Z]+$/).withMessage('First name must not contain special characters'),
    body('last_name').isLength({ min: 1 }).withMessage('Last name is required')
      .matches(/^[a-zA-Z]+$/).withMessage('Last name must not contain special characters'),
    body('phone_number').optional().matches(/^[0-9]+$/).withMessage('Phone number must be numeric'),
    async (req, res) => {
      const { userId } = req.params;
      const { username, email, password, first_name, last_name, phone_number } = req.body;

    // validation des champs
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let hashedPassword;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      console.log(`Route PATCH /users/${userId} called with username: ${username}, email: ${email}, password: ${password ? '******' : 'not provided'}`);
      let connection;
      try {
        console.log('Connecting to the database...');
        connection = await mysql.createConnection(dbConfig);
        console.log('Connected to the database.');

        await connection.beginTransaction();

        // Update le user
        let userQuery = 'UPDATE Users SET username = ?, email = ?';
        const userParams = [username, email];

        if (password) {
          userQuery += ', password = ?';
          userParams.push(hashedPassword);
        }

        userQuery += ' WHERE user_id = ?';
        userParams.push(userId);

        await connection.execute(userQuery, userParams);

        // Update le user
        await connection.execute(
          'UPDATE UserProfiles SET first_name = ?, last_name = ?, phone_number = ? WHERE user_id = ?',
          [first_name, last_name, phone_number, userId]
        );

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

    // Endpoint pour avoir tout les user
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

    // Endpoint pour avoir un user
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

  // Endpoint pour supprimer un utilisateur
  router.delete('/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    console.log(`Route DELETE /users/${userId} called`);
    let connection;
    try {
      console.log('Connecting to the database...');
      connection = await mysql.createConnection(dbConfig);
      console.log('Connected to the database.');

      await connection.beginTransaction();

      // Supprimer les entrées dans les tables dépendantes
      await connection.execute('DELETE FROM addresses WHERE user_id = ?', [userId]);
      await connection.execute('DELETE FROM payments WHERE user_id = ?', [userId]);
      await connection.execute('DELETE FROM userrolesmapping WHERE user_id = ?', [userId]);
      await connection.execute('DELETE FROM userprofiles WHERE user_id = ?', [userId]);
      await connection.execute('DELETE FROM orders WHERE user_id = ?', [userId]);

      // Supprimer l'utilisateur
      const [result] = await connection.execute('DELETE FROM users WHERE user_id = ?', [userId]);

      if (result.affectedRows > 0) {
        console.log(`User ${userId} deleted.`);
        await connection.commit();
        res.status(200).send(`User ${userId} deleted.`);
      } else {
        console.log(`User ${userId} not found.`);
        await connection.rollback();
        res.status(404).send(`User ${userId} not found.`);
      }
      connection.end();
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
