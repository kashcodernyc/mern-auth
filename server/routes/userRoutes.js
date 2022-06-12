const express = require('express');
const router = express.Router();

const {registerUser, loginUser, getLoggedUser} = require('../controller/userController')

const {auth} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', auth, getLoggedUser)

module.exports = router