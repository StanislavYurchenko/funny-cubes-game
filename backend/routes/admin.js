const express = require('express');
const pug = require('pug');
const adminTemplate = pug.compileFile('./templates/admin.pug');

const router = express.Router();

const mongoDb = require('../db/mongoDb');

// GET ADMIN PAGE
router.get('/', async (req, res) => {
  if (!req.session.isAuth) return res.redirect('/');
  if (req.session?.user?.role !== 'admin') {
    req.session.backRoute = '/game';
    req.session.errorMessage = 'You do not have enough rights, contact the administrator';
    res.redirect('/error-page');
    return;
  }

  let users = await mongoDb.getUsersCursor();

  try {
    res.type('.html');
    const USER_PER_PAGE = 5;
    const page = Number(req.query?.page ?? req.session.adminPage ?? 1);
    const totalUsers = await users.countDocuments();
    const totalPages = Math.ceil(totalUsers / USER_PER_PAGE);
    let skip = USER_PER_PAGE * (page - 1);
    const userList = await users.find().skip(skip).limit(USER_PER_PAGE).toArray();
    res.send(adminTemplate({ userList, page, totalPages }));
  } catch (error) {
    console.log(error);
  }
});

// POST ADMIN PAGE
router.post('/', async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  if (req.session?.user?.role !== 'admin') {
    req.session.adminPage = req.query.page;
    const userRole = req.body.role;
    const selectedUser = req.query?.login;

    let users = await mongoDb.getUsersCursor();

    try {
      await users.updateOne({ login: selectedUser }, { $set: { role: userRole } }, {});
    } catch (error) {
      console.log(error);
    }
  }
  res.redirect('/admin');
});

module.exports = router;
