const express = require('express');
const cors = require('cors');
const router = express.Router();
const { test, registerUser, loginUser, getProfile, logout,getEmployeeDetails } = require('../controllers/authController'); 
const authenticateToken = require('../config/authiMddleware')


router.use(cors({
  credentials: true,
  origin: 'http://localhost:5173' 
}));

router.get('/', test);
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logout)
router.get('/profile', authenticateToken, getProfile);
router.get('/employees/:id', authenticateToken, getEmployeeDetails);


module.exports = router;