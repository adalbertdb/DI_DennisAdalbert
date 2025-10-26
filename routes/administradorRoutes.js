const express = require('express');
const router = express.Router();
const administradorController = require('../controllers/administradorController');

router.get('/', administradorController.getAllAdministradores);

module.exports = router;
