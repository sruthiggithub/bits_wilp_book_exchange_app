import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authExcludeEndpoints = ['/api/auth/login','/api/auth/register','/api/auth/passwordReset', '/api/auth/clickResetPasswordLink' ]


// Middleware to authenticate user via JWT
const authenticateToken = (req, res, next) => {
  if (authExcludeEndpoints.includes(req.path)) {
    return next(); 
  }

  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ msg: 'Access denied, token not provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ msg: 'Invalid or expired token' });
    }

    // Check if the user exists in DB
    try {
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      // Add the user information to the request object
      req.user = user;
      
      next(); // Pass control to the next middleware/route handler
    } catch (error) {
      return res.status(500).json({ msg: 'Unable to retrieve user information. Please check if the user is valid.', error });
    }
  });
};

export default authenticateToken;