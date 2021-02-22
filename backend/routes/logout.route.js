const express = require('express');
const logout = require('../controllers/logout.controller');

const router = express.Router();

// LOGOUT
router.get('/', logout.get);

module.exports = router;
