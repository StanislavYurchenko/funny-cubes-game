const express = require('express');
const bodyParser = require('body-parser');

const routeCallback = require('../api/routeCallback');
const roman = require('../api/tasks/task1-roman.js');
const palindrome = require('../api/tasks/task2-palindrome.js');
const brackets = require('../api/tasks/task3-brackets.js');
const arraySort = require('../api/tasks/task4-arraySort.js');
const nextIndex = require('../api/tasks/task5-nextIndex.js');

const router = express.Router();
const jsonParser = bodyParser.json();

// TESTS TASK 1
router.post('/roman', jsonParser, (req, res) => {
  routeCallback(req, res, roman);
});

// TESTS TASK 2
router.post('/palindrome', jsonParser, (req, res) => {
  routeCallback(req, res, palindrome);
});

// TESTS TASK 3
router.post('/brackets', jsonParser, (req, res) => {
  routeCallback(req, res, brackets);
});

// TESTS TASK 4
router.post('/arraySort', jsonParser, (req, res) => {
  routeCallback(req, res, arraySort, 'arr1&arr2');
});

// TESTS TASK 5
router.post('/nextIndex', jsonParser, (req, res) => {
  routeCallback(req, res, nextIndex, 'nums&target');
});

// TESTS ERROR HANDLER
router.use((error, req, res, next) => {
  res.status(error.status); // 400, 500
  res.json({ result: error.message });
});

module.exports = router;
