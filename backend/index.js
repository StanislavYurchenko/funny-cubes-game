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

let page = 1;

// MONGO CONNECT
mongoClient.connect((err, client) => {
  if (err) return console.log(err);

  const db = client.db('funny-cubes-game');
  const users = db.collection('users');
  const results = db.collection('results');
  users.createIndex({ login: 1 }, { unique: true });

  const isAuth = (req, res) => {
    // return true;
    return req.session?.isAuth;
  };

  const checkAuthRequest = req => {
    if (/[^a-z0-9]/.test(req.body?.login)) {
      req.session.errorMessage = `Login ${req.body?.login} should include only symbols "a-z", "0-9"`;
      res.redirect('/registration-error');
      return;
    }

    if (req.body?.password !== req.body?.confirm) {
      req.session.errorMessage = 'Password and confirm are not same';
      res.redirect('/registration-error');
      return;
    }

    if (req.body?.password.length < 8) {
      req.session.errorMessage = 'Password length les then 8 symbols';
      res.redirect('/registration-error');
      return;
    }

    if (!/\w|[а-яА-Я]/i.test(req.body?.name)) {
      req.session.errorMessage = `Name ${req.body?.name} can include only symbols "A-Z", "a-z", "А-Я", "а-я", "0-9", " " `;
      res.redirect('/registration-error');
      return;
    }
  };

  // COOKIE PARSER
  app.use(cookieParser());

  app.use(session(sessionParams));

  // STATIC SERVER
  app.use(serveStatic('../backend/static', { index: ['login.html'] }));
  // app.use(serveStatic('../frontend/static', { index: ['login.html'] }));

  // HEADERS
  app.use((req, res, next) => {
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
    if (isAuth(req, res)) {
      res.redirect('/game');
    } else {
      res.redirect('/login');
    }
  });

  // LOGOUT
  app.get('/logout', (req, res) => {
    if (isAuth(req, res)) {
      // res.clearCookie('isAuth');
      req.session.isAuth = false;
      req.session.user = {};
    }
    res.redirect('/');
  });

  // LOGIN
  app.get('/login', (req, res) => {
    if (isAuth(req, res)) {
      res.redirect('/game');
    } else {
      res.type('.html');
      res.send(loginTemplate());
    }
  });

  // LOGIN
  app.post('/login', urlencodedParser, async (req, res) => {
    users.findOne({ login: req.body?.login, password: req.body?.password }, (err, result) => {
      if (err) return console.log('err', err);
      if (result === null) return res.redirect('/login-error');
      req.session.user = result;
      req.session.isAuth = true;
      res.redirect('/game');
      // client.close();
    });
  });

  // LOGIN ERROR
  app.post('/login-error', urlencodedParser, (req, res) => {
    res.redirect('/login');
  });

  // LOGIN ERROR
  app.get('/login-error', urlencodedParser, async (req, res) => {
    if (isAuth(req, res)) {
      res.redirect('/game');
    } else {
      res.type('.html');
      const backRoute = '/login';
      const message = 'Login unsuccess. Name or password is invalid. Try again!';
      res.send(errorTemplate({ message, backRoute }));
    }
  });

  // REGISTRATION
  app.get('/registration', (req, res) => {
    if (isAuth(req, res)) {
      res.redirect('/game');
    } else {
      res.type('.html');
      res.send(registrationTemplate());
    }
  });

  // REGISTRATION
  app.post('/registration', urlencodedParser, async (req, res) => {
    if (isAuth(req, res)) return res.redirect('/game');
    checkAuthRequest(req);
    // users.drop();

    try {
      const user = {
        name: req.body?.name,
        login: req.body?.login,
        password: req.body?.password,
        ip: req.ip,
        registrationData: new Date().toString(),
        role: 'user',
        totalGames: 0,
        bestResult: 0,
      };

      users.insertOne(user, err => {
        if (err) {
          console.log(err);
          req.session.errorMessage = `Login "${req.body?.login}" isn't available`;
          res.redirect('/registration-error');
          return;
        }

        users.findOne({ login: req.body?.login, password: req.body?.password }, (err, result) => {
          if (err) return console.log('err', err);
          if (result === null) res.redirect('/login-error');
          req.session.user = result;
          req.session.isAuth = true;
          // client.close();
        });
        res.redirect('/game');
      });
    } catch (error) {
      console.log(error);
    }
  });

  // REGISTRATION ERROR
  app.post('/registration-error', urlencodedParser, (req, res) => {
    res.redirect('/login');
  });

  // REGISTRATION ERROR
  app.get('/registration-error', urlencodedParser, async (req, res) => {
    if (isAuth(req, res)) {
      res.redirect('/game');
    } else {
      res.type('.html');
      const backRoute = '/registration';
      const message =
        req.session.errorMessage ??
        'Registration unsuccess. Name or password is invalid. Try again!';
      res.send(errorTemplate({ message, backRoute }));
    }
  });

  // GAME
  app.get('/game', (req, res) => {
    if (isAuth(req, res)) {
      res.type('.html');
      res.sendFile(path.join(__dirname, 'static/index.html'));
    } else {
      res.redirect('/');
    }
  });

  // GET ADMIN PAGE
  app.get('/admin', async (req, res) => {
    // if (isAuth(req, res)) {
    if (true) {
      res.type('.html');
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');

      console.log(req.query?.page);
      const page = req.query?.page ?? 1;
      // if (pageAction === 'plus') page = page + 1;
      // if (pageAction === 'minus') page = page - 1;

      const limit = 5;
      let skip = limit * (page - 1);

      console.log('skip', skip);
      console.log('limit', limit);
      console.log('page', page);
      const userList = await users.find().skip(skip).limit(limit).toArray();

      res.send(adminTemplate({ userList, page }));
    } else {
      res.redirect('/');
    }

    // PAGINATE
  });

  // POST ADMIN PAGE
  // app.post('/admin', jsonParser, (req, res) => {
  //   if (!req.body) return res.sendStatus(400);

  //   if (isAuth(req, res)) {
  //   } else {
  //     res.redirect('/');
  //   }
  // });

  // POST GAME RESULT
  app.post('/results', jsonParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    if (isAuth(req, res)) {
      const result = {
        login: req.session.user.login,
        score: req.body.score,
        registrationData: new Date().toString(),
      };
      // users.drop();
      // results.drop();
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

        console.log('users2', await users.find({}).toArray());

        res.json(result);
      } catch (error) {
        console.log(error);
      }
    } else {
      res.redirect('/');
    }
  });

  // GET GAME RESULT
  app.get('/results', async (req, res) => {
    if (isAuth(req, res)) {
      // users.drop();
      // results.drop();

      const user = await users
        .find({ login: req.session.user.login })
        .sort({ score: -1 })
        .limit(1)
        .next();

      const bestTenResults = await results.find({}).sort({ score: -1 }).limit(10).toArray();

      res.json({ bestTenResults, user });
    } else {
      res.redirect('/');
    }
  });

  // TASK 1
  app.post('/api/tasks/roman', jsonParser, (req, res) => {
    routeCallback(req, res, roman);
  });

  // TASK 2
  app.post('/api/tasks/palindrome', jsonParser, (req, res) => {
    routeCallback(req, res, palindrome);
  });

  // TASK 3
  app.post('/api/tasks/brackets', jsonParser, (req, res) => {
    routeCallback(req, res, brackets);
  });

  // TASK 4
  app.post('/api/tasks/arraySort', jsonParser, (req, res) => {
    routeCallback(req, res, arraySort, 'arr1&arr2');
  });

  // TASK 5
  app.post('/api/tasks/nextIndex', jsonParser, (req, res) => {
    routeCallback(req, res, nextIndex, 'nums&target');
  });

  //ERROR HANDLER
  app.use((error, req, res, next) => {
    console.log('error');
    console.log('status', error.status, error.message);
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
