const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  if (!req.session.isAuth) return res.redirect('/');
  res.type('.html');
  res.sendFile(path.join(__dirname, '../static/index.html'));
});

module.exports = router;
