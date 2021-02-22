const express = require('express');
const registration = require('../controllers/registration.controller');

const router = express.Router();

// REGISTRATION
router.get('/', registration.get);

// REGISTRATION
router.post('/', registration.post);

module.exports = router;
