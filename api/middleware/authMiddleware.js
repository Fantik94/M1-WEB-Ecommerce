import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const { roles } = req.user;
    if (!roles) return res.sendStatus(403);

    const hasRole = roles.some(role => allowedRoles.includes(role));
    if (!hasRole) return res.sendStatus(403);

    next();
  };
};
