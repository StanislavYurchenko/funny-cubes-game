const express = require('express');
const pug = require('pug');
const loginTemplate = pug.compileFile('./templates/login.pug');

const router = express.Router();

const mongoDb = require('../db/mongoDb');

// GET LOGIN
router.get('/', (req, res) => {
  if (req.session.isAuth) return res.redirect('/game');

  res.type('.html');
  res.send(loginTemplate());
});

// POST LOGIN
router.post('/', async (req, res) => {
  let users = await mongoDb.getUsersCursor();

  try {
    const user = await users.findOne({ login: req.body?.login, password: req.body?.password });
    if (user === null) {
      req.session.backRoute = '/login';
      req.session.errorMessage = `Login "${req.body?.login}" with this password was not found`;
      res.redirect('/error-page');
      return;
    }
    req.session.user = user;
    req.session.isAuth = true;
    res.redirect('/game');
    // client.close();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
