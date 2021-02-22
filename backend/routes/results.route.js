const express = require('express');
const results = require('../controllers/results.controller');

const router = express.Router();

// GET GAME RESULT
router.get('/', results.get);

// POST GAME RESULT
router.post('/', results.post);

module.exports = router;
