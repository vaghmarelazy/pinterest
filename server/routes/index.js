const express = require('express');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router(); // router
const { initialPage, signup, login, feed, profile, editprofile_pre , editprofile_post, uploadpost} = require('../controllers/routesControllers');





router.post('/', signup)

router.post('/login', login); // login route

router.get('/feed', authenticateToken, feed); // feed route

router.get('/profile', authenticateToken, profile)

router.get('/editprofile', authenticateToken, editprofile_pre)
router.post('/editprofile', authenticateToken, editprofile_post)


module.exports = router;