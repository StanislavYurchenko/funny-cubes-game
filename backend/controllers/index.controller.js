// INDEX
const get = async (req, res) => {
  if (req.session.isAuth) return res.redirect('/game');
  res.redirect('/login');
};

module.exports = { get };
