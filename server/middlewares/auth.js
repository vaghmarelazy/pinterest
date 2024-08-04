const jwt = require('jsonwebtoken');
const userRouter = require('../Models/users')
const secret = process.env.JWT_SECRET || 'your_jwt_secret';

function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
  
    if (!token) return res.sendStatus(401); // Unauthorized
  
    jwt.verify(token, secret, async (err, user) => {
      if (err) return res.sendStatus(403); // Forbidden
  
      // Fetch user from the database using userId from the token
      try {
        const fullUser = await userRouter.findById(user.userId);
        if (!fullUser) return res.sendStatus(404); // User not found
  
        req.user = fullUser;
        next();
      } catch (err) {
        res.sendStatus(500); // Internal Server Error
      }
    });
  }

module.exports = { authenticateToken };
