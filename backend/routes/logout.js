const express = require('express');
const router = express.Router();

// LOGOUT
router.get('/', (req, res) => {
  req.session.isAuth = false;
  req.session.user = {};
  res.redirect('/');
});

module.exports = router;
