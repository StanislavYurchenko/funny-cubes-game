const pug = require('pug');
const adminTemplate = pug.compileFile('./templates/admin.pug');

const User = require('..//models/User');

// GET ADMIN PAGE
const get = async (req, res) => {
  if (!req.session.isAuth) return res.redirect('/');
  if (req.session?.user?.role !== 'admin') {
    req.session.backRoute = '/game';
    req.session.errorMessage = 'You do not have enough rights, contact the administrator';
    return res.redirect('/error-page');
  }

  res.type('.html');
  const USER_PER_PAGE = 5;
  const page = Number(req.query?.page ?? req.session.adminPage ?? 1);

  try {
    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / USER_PER_PAGE);
    let skip = USER_PER_PAGE * (page - 1);
    const userList = await User.find().skip(skip).limit(USER_PER_PAGE);
    return res.send(adminTemplate({ userList, page, totalPages }));
  } catch (error) {
    console.log(error);
  }
};

// POST ADMIN PAGE
const post = async (req, res) => {
  console.log('POST ADMIN PAGE');
  console.log(req.session?.user?.role);
  if (!req.body) return res.sendStatus(400);
  if (req.session?.user?.role !== 'admin') {
    req.session.backRoute = '/game';
    req.session.errorMessage = 'You do not have enough rights, contact the administrator';
    return res.redirect('/error-page');
  }
  req.session.adminPage = req.query.page;
  const userRole = req.body.role;
  const selectedUser = req.query?.login;
  console.log('selectedUser', selectedUser);
  console.log('userRole', userRole);

  try {
    await User.updateOne({ login: selectedUser }, { $set: { role: userRole } }, {});
  } catch (error) {
    console.log(error);
  }

  return res.redirect('/admin');
};

module.exports = { get, post };
