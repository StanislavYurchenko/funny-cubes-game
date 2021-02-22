const express = require('express');
const game = require('../controllers/game.controller');

const router = express.Router();

router.get('/', game.get);

module.exports = router;
