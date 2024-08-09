const express = require('express');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router(); // Create a router instance
const { initialPage, signup, login, feed, profile, editprofile_pre, editprofile_post } = require('../controllers/routesControllers');

// Define routes
router.post('/signup', signup); // Signup route
router.post('/login', login); // Login route

router.get('/feed', authenticateToken, feed); // Feed route
router.get('/profile', authenticateToken, profile); // Profile route
router.get('/editprofile', authenticateToken, editprofile_pre); // Edit profile (GET) route
router.post('/editprofile', authenticateToken, editprofile_post); // Edit profile (POST) route

module.exports = router;