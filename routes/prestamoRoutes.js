const express = require('express');
const router = express.Router();
const prestamoController = require('../controllers/prestamoController');

router.get('/', prestamoController.getAllPrestamos);

module.exports = router;
