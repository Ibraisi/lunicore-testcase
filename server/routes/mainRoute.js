const express = require('express');
const router = express.Router();
const { getAllEmployees, getAllCarModels, createCarModel, deleteCarModel, getTotalSales } = require('../controllers/mainControllers');
const authenticateToken = require('../config/authiMddleware')
router.get('/employees', authenticateToken, getAllEmployees);
router.get('/carmodels', authenticateToken, getAllCarModels);
router.post('/carmodels', authenticateToken, createCarModel);
router.delete('/carmodels/:id', authenticateToken, deleteCarModel);
router.get('/total_sales', authenticateToken, getTotalSales);

module.exports = router;