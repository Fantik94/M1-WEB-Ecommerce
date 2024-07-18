import jwt from 'jsonwebtoken';

// Middleware pour vérifier le token JWT
export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'your_secret_key', (err, user) => {
      if (err) {
        console.log('Token verification failed:', err);
        return res.sendStatus(403);
      }

      req.user = user;
      console.log('Token verified successfully:', user);
      next();
    });
  } else {
    console.log('No auth header provided');
    res.sendStatus(401);
  }
};

// Middleware pour vérifier les rôles
export const authorizeRoles = (roles) => {
  return (req, res, next) => {
    console.log('Checking roles:', req.user.roles);
    if (req.user && roles.some(role => req.user.roles.includes(role))) {
      console.log('Role authorized:', req.user.roles);
      next();
    } else {
      console.log('Role not authorized:', req.user.roles);
      res.sendStatus(403);
    }
  };
};
