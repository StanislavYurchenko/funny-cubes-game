const express = require('express');
const router = express.Router();
const pug = require('pug');
const errorTemplate = pug.compileFile('./templates/error.pug');

// ERROR-PAGE
router.use('/', async (req, res) => {
  res.type('.html');
  const backRoute = req.session.backRoute ?? '/';
  const message = req.session.errorMessage ?? 'Operation canceled. Try again!';
  res.send(errorTemplate({ message, backRoute }));
});

module.exports = router;
