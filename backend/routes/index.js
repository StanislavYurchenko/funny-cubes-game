const express = require('express');
const router = express.Router();

// LOGOUT
router.get('/', async (req, res) => {
  if (req.session.isAuth) return res.redirect('/game');
  res.redirect('/login');
});

module.exports = router;
