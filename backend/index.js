const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');

// ROUTES
const resultsRouter = require('./routes/results.route');
const apiRouter = require('./routes/api_tasks.route');
const gameRouter = require('./routes/game.route');
const adminRouter = require('./routes/admin.route');
const registrationRouter = require('./routes/registration.route');
const loginRouter = require('./routes/login.route');
const logoutRouter = require('./routes/logout.route');
const indexRouter = require('./routes/index.route');
const errorRouter = require('./routes/error_page.route');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// START MONGODB
const mongoDbInit = require('./db/mongoDb');

const dbInit = async () => {
  await mongoDbInit();
};

dbInit();

app.listen(PORT, () => {
  console.log(`Go to page http://localhost:${PORT}/`);
});

// COOKIE PARSER
app.use(cookieParser());

// JSON PARSER
app.use(jsonParser);

// SESSION
app.use(session({ secret: 'super game', cookie: {} }));

// STATIC SERVER
app.use(serveStatic('./static', { index: false }));

// URL PARSER
app.use(urlencodedParser);

// SET HEADERS
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

// GAMES ROUTES
app.use('/', indexRouter);
app.use('/logout', logoutRouter);
app.use('/login', loginRouter);
app.use('/registration', registrationRouter);
app.use('/game', gameRouter);
app.use('/admin', adminRouter);
app.use('/results', resultsRouter);
app.use('/error-page', errorRouter);

// API TASKS ROUTES
app.use('/api/tasks', apiRouter);

// NOT FOUND
app.get('*', (req, res) => {
  res.end('404 not found');
  res.status(404);
});

module.exports = app;
