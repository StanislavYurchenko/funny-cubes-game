const express = require('express');
const pug = require('pug');
const registrationTemplate = pug.compileFile('./templates/registration.pug');

const router = express.Router();

const mongoDb = require('../db/mongoDb');

const checkAuthRequest = req => {
  if (/[^a-z0-9]/.test(req.body?.login)) {
    req.session.backRoute = '/registration';
    req.session.errorMessage = `Login ${req.body?.login} should include only symbols "a-z", "0-9"`;
    res.redirect('/error-page');
    return;
  }

  if (req.body?.password !== req.body?.confirm) {
    req.session.backRoute = '/registration';
    req.session.errorMessage = 'Password and confirm are not same';
    res.redirect('/error-page');
    return;
  }

  if (req.body?.password.length < 8) {
    req.session.backRoute = '/registration';
    req.session.errorMessage = 'Password length les then 8 symbols';
    res.redirect('/error-page');
    return;
  }

  if (!/\w|[а-яА-Я]/i.test(req.body?.name)) {
    req.session.backRoute = '/registration';
    req.session.errorMessage = `Name ${req.body?.name} can include only symbols "A-Z", "a-z", "А-Я", "а-я", "0-9", " " `;
    res.redirect('/error-page');
    return;
  }
};

/// REGISTRATION
router.get('/', (req, res) => {
  if (req.session.isAuth) return res.redirect('/game');

  res.type('.html');
  res.send(registrationTemplate());
});

// REGISTRATION
router.post('/', async (req, res) => {
  if (req.session.isAuth) return res.redirect('/game');
  checkAuthRequest(req);

  let users = await mongoDb.getUsersCursor();

  const date = new Date();
  const normalizedDate = date.toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric' });

  // only for development !!!!!!
  const role = req.body?.login === 'superadmin' ? 'admin' : 'gamer';

  try {
    const user = {
      name: req.body?.name,
      login: req.body?.login,
      password: req.body?.password,
      ip: req.ip,
      registrationData: normalizedDate,
      role: role,
      totalGames: 0,
      bestResult: 0,
    };

    users.insertOne(user, err => {
      if (err) {
        console.log(err);

        req.session.backRoute = '/registration';
        req.session.errorMessage = `Login "${req.body?.login}" isn't available`;
        res.redirect('/error-page');
        return;
      }

      users.findOne({ login: req.body?.login, password: req.body?.password }, (err, result) => {
        if (err) return console.log('err', err);
        if (result === null) res.redirect('/login-error');
        req.session.user = result;
        req.session.isAuth = true;
        res.redirect('/game');
        // client.close();
      });
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
