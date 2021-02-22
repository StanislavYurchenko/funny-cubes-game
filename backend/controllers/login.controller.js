const pug = require('pug');
const loginTemplate = pug.compileFile('./templates/login.pug');

const User = require('..//models/User');

// GET LOGIN
const get = (req, res) => {
  if (req.session.isAuth) return res.redirect('/game');
  return res.type('.html').send(loginTemplate());
};

// POST LOGIN
const post = async (req, res) => {
  try {
    let user = await User.findOne({ login: req.body?.login, password: req.body?.password });
    if (user === null) {
      req.session.backRoute = '/login';
      req.session.errorMessage = `Login "${req.body?.login}" with this password was not found`;
      res.redirect('/error-page');
      return res.json(user);
    }
    req.session.user = user;
    req.session.isAuth = true;
    return res.redirect('/game');
  } catch (error) {
    console.log(error);
  }
};

module.exports = { get, post };
