const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'replace_with_a_strong_secret';

function authenticate(req, res, next){
  const auth = req.headers.authorization;
  if(!auth) return res.status(401).json({ message: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch(e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

function requireRole(role){
  return (req, res, next) => {
    if(!req.user) return res.status(401).json({ message: 'No user' });
    if(req.user.role !== role) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
}

module.exports = { authenticate, requireRole };
