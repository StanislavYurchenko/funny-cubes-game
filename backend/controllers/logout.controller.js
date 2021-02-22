// LOGOUT
const get = (req, res) => {
  req.session.isAuth = false;
  req.session.user = {};
  res.redirect('/');
};

module.exports = { get };
