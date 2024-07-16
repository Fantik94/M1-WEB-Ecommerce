import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';

const inscriptionRoutes = (dbConfig) => {
  const router = express.Router();

  // Endpoint pour l'inscription d'un nouvel utilisateur et son profil
  router.post('/register',
    // Validation des champs
    body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long')
      .matches(/^[a-zA-Z0-9 ]+$/).withMessage('Username must not contain special characters'),
    body('email').isEmail().withMessage('Invalid email address')
      .matches(/^[a-zA-Z0-9@.]+$/).withMessage('Email must not contain special characters'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
      .matches(/^[a-zA-Z0-9]+$/).withMessage('Password must not contain special characters'),
    body('firstName').isLength({ min: 1 }).withMessage('First name is required')
      .matches(/^[a-zA-Z]+$/).withMessage('First name must not contain special characters'),
    body('lastName').isLength({ min: 1 }).withMessage('Last name is required')
      .matches(/^[a-zA-Z]+$/).withMessage('Last name must not contain special characters'),
    body('phoneNumber').optional().matches(/^[0-9]+$/).withMessage('Phone number must be numeric'),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, email, password, firstName, lastName, phoneNumber } = req.body;

      let connection;
      try {
        console.log('Connecting to the database...');
        connection = await mysql.createConnection(dbConfig);
        console.log('Connected to the database.');

        // Vérifier si l'utilisateur existe déjà
        const [existingUser] = await connection.execute('SELECT * FROM Users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
          connection.end();
          return res.status(400).send('User already exists with this email');
        }

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Commencer une transaction
        await connection.beginTransaction();

        // Insérer le nouvel utilisateur dans la base de données
        const [userResult] = await connection.execute(
          'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)',
          [username, email, hashedPassword]
        );

        const userId = userResult.insertId;

        // Insérer le profil utilisateur dans la base de données
        await connection.execute(
          'INSERT INTO UserProfiles (user_id, first_name, last_name, phone_number) VALUES (?, ?, ?, ?)',
          [userId, firstName, lastName, phoneNumber]
        );

        // Assigner le rôle user à l'utilisateur
        const [roleResult] = await connection.execute(
          'SELECT role_id FROM UserRoles WHERE role_name = ?',
          ['user']
        );
        const roleId = roleResult[0].role_id;
        await connection.execute(
          'INSERT INTO UserRolesMapping (user_id, role_id) VALUES (?, ?)',
          [userId, roleId]
        );

        // Valider la transaction
        await connection.commit();
        connection.end();

        console.log(`User ${username} registered successfully with profile.`);
        res.status(201).send(`User ${username} registered successfully with profile.`);
      } catch (error) {
        console.error(`Error registering user ${username}:`, error);
        if (connection) {
          await connection.rollback();
          connection.end();
        }
        res.status(500).send('Internal Server Error');
      }
    }
  );

  return router;
};

export default inscriptionRoutes;
