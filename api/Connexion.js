import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

const connexionRoutes = (dbConfig, jwtSecret) => {
  const router = express.Router();

  // Endpoint pour la connexion d'un utilisateur
  router.post('/login',
    // Validation des champs
    body('email').isEmail().withMessage('Invalid email address')
      .matches(/^[a-zA-Z0-9@.]+$/).withMessage('Email must not contain special characters'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
      .matches(/^[a-zA-Z0-9]+$/).withMessage('Password must not contain special characters'),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      try {
        console.log('Connecting to the database...');
        const connection = await mysql.createConnection(dbConfig);
        console.log('Connected to the database.');

        // Vérifier si l'utilisateur existe
        const [userRows] = await connection.execute('SELECT * FROM Users WHERE email = ?', [email]);
        if (userRows.length === 0) {
          connection.end();
          return res.status(401).send('Invalid email or password');
        }

        const user = userRows[0];

        // Vérifier le mot de passe
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          connection.end();
          return res.status(401).send('Invalid email or password');
        }

        // Récupérer le rôle de l'utilisateur
        const [roleRows] = await connection.execute('SELECT role_name FROM UserRoles ur INNER JOIN UserRolesMapping urm ON ur.role_id = urm.role_id WHERE urm.user_id = ?', [user.user_id]);
        connection.end();

        if (roleRows.length === 0) {
          return res.status(401).send('No roles assigned to this user');
        }

        const roles = roleRows.map(row => row.role_name);

        // Générer le token JWT
        const token = jwt.sign({
          userId: user.user_id,
          email: user.email,
          roles: roles
        }, jwtSecret, { expiresIn: '1h' });

        console.log(`User ${user.username} logged in successfully`);
        res.status(200).json({ token, userId: user.user_id });
      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
      }
    }
  );

  return router;
};

export default connexionRoutes;
