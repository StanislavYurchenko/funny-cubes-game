const express = require('express');
const index = require('../controllers/index.controller');

const router = express.Router();

// INDEX
router.get('/', index.get);

module.exports = router;
