const express = require('express');
const login = require('../controllers/login.controller');

const router = express.Router();

// GET LOGIN
router.get('/', login.get);

// POST LOGIN
router.post('/', login.post);

module.exports = router;
