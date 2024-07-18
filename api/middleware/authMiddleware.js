// authMiddleware.js
import jwt from 'jsonwebtoken';

// Middleware pour vérifier le token JWT
export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'your_secret_key', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Middleware pour vérifier les rôles
export const authorizeRoles = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.roles)) {
      next();
    } else {
      res.sendStatus(403);
    }
  };
};
