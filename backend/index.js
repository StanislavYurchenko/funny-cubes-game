const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const fs = require('fs');
const createError = require('http-errors');

const routeCallback = require('./api/routeCallback');

const roman = require('./api/tasks/task1-roman.js');
const palindrome = require('./api/tasks/task2-palindrome.js');
const brackets = require('./api/tasks/task3-brackets.js');
const arraySort = require('./api/tasks/task4-arraySort.js');
const nextIndex = require('./api/tasks/task5-nextIndex.js');

const app = express();
const port = 9090;

// STATIC SERVER
// app.use(serveStatic('../frontend/build', { 'index': ['index.html'] }))
app.use(serveStatic('../backend/static', { index: ['index.html'] }));

const jsonParser = bodyParser.json();

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

// GET GAME RESULT
app.get('/results', (req, res) => {
  fs.readFile('./data/ratingList.json', 'utf8', (error, rawData) => {
    if (error) throw error;

    const ratingList = [...JSON.parse(rawData)];
    const bestTenResult = ratingList.slice(0, 10);

    res.json(bestTenResult);
  });
});

// POST GAME RESULT
app.post('/results', jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);

  let { name, score } = req.body;

  fs.readFile('./data/ratingList.json', 'utf8', (error, rawData) => {
    if (error) throw error;

    const ratingList = [...JSON.parse(rawData)];

    ratingList.push({ name, score, position: null });
    ratingList
      .sort((prev, next) => next.score - prev.score)
      .forEach((member, index) => (member.position = index + 1));

    const bestTenResult = ratingList.slice(0, 10);

    fs.writeFile('./data/ratingList.json', JSON.stringify(ratingList, null, 2), err => {
      if (err) throw err;
      res.json(bestTenResult);
    });
  });
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
// TODO Может быть глюк, нужно переделать - Object.values - последовательность
// app.post('/api/tasks/arraySort', jsonParser, (req, res) => {
//   routeCallback(req, res, arraySort);
// });

app.post('/api/tasks/arraySort', jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);

  try {
    const { arr1, arr2 } = req.body;
    const result = arraySort(arr1, arr2);
    res.json({ result, message: 'ok' });
  } catch (err) {
    throw createError(400, err.message);
  }
});

// TASK 5
app.post('/api/tasks/nextIndex', jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);

  try {
    const { nums, target } = req.body;
    const result = nextIndex(nums, target);
    res.json({ result, message: 'ok' });
  } catch (err) {
    throw createError(400, err.message);
  }
});

//ERROR HANDLER
app.use((error, req, res, next) => {
  // console.log('Error status: ', error.status);
  // console.log('Message: ', error.message);
  res.status(error.status); // 400
  res.json({ result: error.message });
});

// NOT FOUND
app.get('*', (req, res) => {
  res.end('404 not found');
  res.status(404);
});

// PORT LISTENER
app.listen(port, () => {
  console.log(`Go to page http://localhost:${port}/`);
});
