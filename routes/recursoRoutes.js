const express = require('express');
const router = express.Router();
const recursoController = require('../controllers/recursoController');

router.get('/', recursoController.getAllRecursos);

module.exports = router;
