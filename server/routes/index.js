const express = require('express');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router(); // Create a router instance
const { initialPage, signup, login, feed, profile, editprofile_pre, editprofile_post } = require('../controllers/routesControllers');

// Define routes
router.post('/app/signup', signup); // Signup route
router.post('/app/login', login); // Login route

router.get('/api/feed', authenticateToken, feed); // Feed route
router.get('/api/profile', authenticateToken, profile); // Profile route
router.get('/api/editprofile', authenticateToken, editprofile_pre); // Edit profile (GET) route
router.post('/api/editprofile', authenticateToken, editprofile_post); // Edit profile (POST) route

module.exports = router;