const express = require('express');
const bodyParser = require("body-parser");
const serveStatic = require('serve-static');
const fs = require("fs");

const app = express();
const port = 3000;

// app.use(serveStatic('../frontend/build', { 'index': ['index.html'] }))
app.use(serveStatic('../backend/static', { 'index': ['index.html'] }))

const jsonParser = bodyParser.json()

app.use( (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.get('/results', (req, res) => {
  fs.readFile("./data/ratingList.json", "utf8", (error, rawData) => {
    if (error) throw error;

    const ratingList = [...JSON.parse(rawData)];
    const bestTenResult = ratingList.slice(0, 10);

    res.json(bestTenResult);
  });
})

app.post('/results', jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);

  let { name, score } = req.body;

  fs.readFile("./data/ratingList.json", "utf8", (error, rawData) => {
    if (error) throw error;

    const ratingList = [...JSON.parse(rawData)];    
    
    ratingList.push({ name, score, position: null })
    ratingList
      .sort((prev, next) => next.score - prev.score)
      .forEach((member, index) => (member.position = index + 1));
    
    const bestTenResult = ratingList.slice(0, 10);
    
    fs.writeFile("./data/ratingList.json", JSON.stringify(ratingList, null, 2),(err) => {
      if (err) throw err;
      res.json(bestTenResult);
    })  
  });
})

app.get('*', (req, res) => {
  res.send('<h1>404 not found</h1>')
})

app.listen(port, () => {
  console.log(`Go to page http://localhost:${port}/`)
})


