const express = require('express');
const admin = require('../controllers/admin.controller');

const router = express.Router();

// GET ADMIN PAGE
router.get('/', admin.get);

// POST ADMIN PAGE
router.post('/', admin.post);

module.exports = router;
