const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const path = require('path');
const cookieParser = require('cookie-parser');
const pug = require('pug');

// for tests
const routeCallback = require('./api/routeCallback');
const roman = require('./api/tasks/task1-roman.js');
const palindrome = require('./api/tasks/task2-palindrome.js');
const brackets = require('./api/tasks/task3-brackets.js');
const arraySort = require('./api/tasks/task4-arraySort.js');
const nextIndex = require('./api/tasks/task5-nextIndex.js');

// TEMPLATES
const errorTemplate = pug.compileFile('./templates/error.pug');
const loginTemplate = pug.compileFile('./templates/login.pug');
const registrationTemplate = pug.compileFile('./templates/registration.pug');
const adminTemplate = pug.compileFile('./templates/admin.pug');

const MongoClient = require('mongodb').MongoClient;
// const MONGO_DB_URL = "mongodb://mongo:27017/";
const MONGO_DB_URL = 'mongodb://localhost:27017/';
const mongoClient = new MongoClient(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const session = require('express-session');
const sessionParams = {
  secret: 'super game',
  cookie: {},
};

const app = express();
const PORT = 9090;

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// MONGODB CONNECT
mongoClient.connect((err, client) => {
  if (err) return console.log(err);

  const db = client.db('funny-cubes-game');
  const users = db.collection('users');
  const results = db.collection('results');
  users.createIndex({ login: 1 }, { unique: true });

  const isAuth = req => {
    // return true;
    return req.session?.isAuth;
  };

  const isAdmin = req => {
    return req.session?.user?.role === 'admin';
  };

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

  // COOKIE PARSER
  app.use(cookieParser());

  app.use(session(sessionParams));

  // STATIC SERVER
  app.use(serveStatic('../backend/static', { index: ['login.html'] }));

  // HEADERS
  app.use((_, res, next) => {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json',
    });
    next();
  });

  // ROOT
  app.get('/', async (req, res) => {
    if (isAuth(req, res)) return res.redirect('/game');
    res.redirect('/login');
  });

  // LOGOUT
  app.get('/logout', (req, res) => {
    req.session.isAuth = false;
    req.session.user = {};
    res.redirect('/');
  });

  // LOGIN
  app.get('/login', (req, res) => {
    if (isAuth(req, res)) return res.redirect('/game');

    res.type('.html');
    res.send(loginTemplate());
  });

  // LOGIN
  app.post('/login', urlencodedParser, async (req, res) => {
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

  // REGISTRATION
  app.get('/registration', (req, res) => {
    if (isAuth(req, res)) return res.redirect('/game');

    res.type('.html');
    res.send(registrationTemplate());
  });

  // REGISTRATION
  app.post('/registration', urlencodedParser, async (req, res) => {
    if (isAuth(req, res)) return res.redirect('/game');
    checkAuthRequest(req);

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

  // GAME
  app.get('/game', (req, res) => {
    if (!isAuth(req)) return res.redirect('/');
    res.type('.html');
    res.sendFile(path.join(__dirname, 'static/index.html'));
  });

  // GET ADMIN PAGE
  app.get('/admin', async (req, res) => {
    if (!isAuth(req)) return res.redirect('/');
    if (!isAdmin(req)) {
      console.log('test');
      req.session.backRoute = '/game';
      req.session.errorMessage = 'You do not have enough rights, contact the administrator';
      res.redirect('/error-page');
      return;
    }

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
  app.post('/admin', urlencodedParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    if (isAdmin(req)) {
      req.session.adminPage = req.query.page;
      const userRole = req.body.role;
      const selectedUser = req.query?.login;

      try {
        await users.updateOne({ login: selectedUser }, { $set: { role: userRole } }, {});
      } catch (error) {
        console.log(error);
      }
    }
    res.redirect('/admin');
  });

  // POST GAME RESULT
  app.post('/results', jsonParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    if (!isAuth(req, res)) return res.redirect('/login');

    const result = {
      login: req.session.user.login,
      score: req.body.score,
      registrationData: new Date().toString(),
    };

    try {
      let bestUserResult = 0;

      await results
        .find({ login: req.session.user.login })
        .sort({ score: -1 })
        .limit(1)
        .forEach(result => (bestUserResult = result.score));

      await results.insertOne(result);

      await users.updateOne(
        { login: req.session.user.login },
        {
          $inc: { totalGames: +1 },
          $set: { bestResult: result.score > bestUserResult ? result.score : bestUserResult },
        },
        {},
      );

      res.json(result);
    } catch (error) {
      console.log(error);
    }
  });

  // GET GAME RESULT
  app.get('/results', async (req, res) => {
    if (!isAuth(req, res)) return res.redirect('/login');
    try {
      const user = await users
        .find({ login: req.session.user.login })
        .sort({ score: -1 })
        .limit(1)
        .next();

      const bestTenResults = await results.find({}).sort({ score: -1 }).limit(10).toArray();

      res.json({ bestTenResults, user });
    } catch (error) {
      console.log(error);
    }
  });

  // ERROR-PAGE
  app.use('/error-page', async (req, res) => {
    res.type('.html');
    const backRoute = req.session.backRoute ?? '/';
    const message = req.session.errorMessage ?? 'Operation canceled. Try again!';
    res.send(errorTemplate({ message, backRoute }));
  });

  // TESTS TASK 1
  app.post('/api/tasks/roman', jsonParser, (req, res) => {
    routeCallback(req, res, roman);
  });

  // TESTS TASK 2
  app.post('/api/tasks/palindrome', jsonParser, (req, res) => {
    routeCallback(req, res, palindrome);
  });

  // TESTS TASK 3
  app.post('/api/tasks/brackets', jsonParser, (req, res) => {
    routeCallback(req, res, brackets);
  });

  // TESTS TASK 4
  app.post('/api/tasks/arraySort', jsonParser, (req, res) => {
    routeCallback(req, res, arraySort, 'arr1&arr2');
  });

  // TESTS TASK 5
  app.post('/api/tasks/nextIndex', jsonParser, (req, res) => {
    routeCallback(req, res, nextIndex, 'nums&target');
  });

  // TESTS ERROR HANDLER
  app.use((error, req, res, next) => {
    res.status(error.status); // 400, 500
    res.json({ result: error.message });
  });

  // NOT FOUND
  app.get('*', (req, res) => {
    res.end('404 not found');
    res.status(404);
  });

  // PORT LISTENER
  app.listen(PORT, () => {
    console.log(`Go to page http://localhost:${PORT}/`);
  });
});
