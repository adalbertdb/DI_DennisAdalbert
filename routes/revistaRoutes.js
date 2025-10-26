const express = require('express');
const router = express.Router();
const revistaController = require('../controllers/revistaController');

router.get('/', revistaController.getAllRevistas);

module.exports = router;
