const express = require("express");
const bodyParser = require("body-parser");
const serveStatic = require("serve-static");
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");

// for tests
const routeCallback = require("./api/routeCallback");
const roman = require("./api/tasks/task1-roman.js");
const palindrome = require("./api/tasks/task2-palindrome.js");
const brackets = require("./api/tasks/task3-brackets.js");
const arraySort = require("./api/tasks/task4-arraySort.js");
const nextIndex = require("./api/tasks/task5-nextIndex.js");

const MongoClient = require("mongodb").MongoClient;
// const MONGO_DB_URL = "mongodb://mongo:27017/";
const MONGO_DB_URL = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const PORT = 9090;

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const cookieSession = require("cookie-session");
const { inherits } = require("util");

mongoClient.connect((err, client) => {
  if (err) return console.log(err);

  const db = client.db("funny-cubes-game");
  const collection = db.collection("users");

  const isAuth = (req, res) => {
    return req.cookies.isAuth === "yes";
  };

  const sendAuthCookies = (res) => {
    res.cookie("isAuth", "yes", {
      expires: new Date(Date.now() + 12 * 3600000),
      httpOnly: true,
    });
  };

  app.use(cookieParser());

  // ROOT
  app.get("/", async (req, res) => {
    if (isAuth(req, res)) {
      res.redirect("/game");
    } else {
      res.redirect("/login");
    }
  });

  // STATIC SERVER
  app.use(serveStatic("../backend/static", { index: ["login.html"] }));

  // HEADERS
  app.use((req, res, next) => {
    res.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      "Access-Control-Allow-Headers": "X-Requested-With,content-type",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
    });
    next();
  });

  // LOGOUT
  app.get("/logout", (req, res) => {
    if (isAuth(req, res)) {
      res.clearCookie("isAuth");
    }
    res.redirect("/");
  });

  // LOGIN
  app.get("/login", (req, res) => {
    if (isAuth(req, res)) {
      res.redirect("/game");
    } else {
      res.type(".html");
      res.sendFile(path.join(__dirname, "static/login.html"));
    }
  });

  // LOGIN
  app.post("/login", urlencodedParser, async (req, res) => {
    collection.findOne(
      { login: req?.body?.login, password: req?.body?.password },
      (err, result) => {
        if (err) return console.log("err", err);

        if (result !== null) {
          sendAuthCookies(res);
          res.redirect("/game");
        } else {
          res.redirect("/login-error");
        }
        // client.close();
      }
    );
  });

  // LOGIN ERROR
  app.post("/login-error", urlencodedParser, (req, res) => {
    res.redirect("/login");
  });

  // LOGIN ERROR
  app.get("/login-error", urlencodedParser, async (req, res) => {
    if (isAuth(req, res)) {
      res.redirect("/game");
    } else {
      res.type(".html");
      res.sendFile(path.join(__dirname, "static/loginError.html"));
    }
  });

  // REGISTRATION
  app.get("/registration", (req, res) => {
    if (isAuth(req, res)) {
      res.redirect("/game");
    } else {
      res.type(".html");
      res.sendFile(path.join(__dirname, "static/registration.html"));
    }
  });

  // REGISTRATION
  app.post("/registration", urlencodedParser, async (req, res) => {
    if (isAuth(req, res)) return res.redirect("/game");

    if (req.body?.password !== req?.body?.confirm) {
      //Try again
      return;
    }

    collection.findOne({ login: req.body?.login }, (err, result) => {
      if (err) return console.log("err", err);
      console.log("result.length", result);
      if (result !== null) {
        // user such name is exist
        return;
      }

      try {
        const user = {
          name: req.body?.name,
          login: req.body?.login,
          password: req.body?.password,
        };

        collection.insertOne(user, (err, result) => {
          if (err) return console.log("err", err);

          if (result.insertedCount === 1) {
            sendAuthCookies(res);
            res.redirect("/game");
          }

          return result.ops;
        });
      } catch (error) {
        console.log(error);
      }

      // client.close();
    });
  });

  // GAME
  app.get("/game", (req, res) => {
    if (isAuth(req, res)) {
      res.type(".html");
      res.sendFile(path.join(__dirname, "static/index.html"));
    } else {
      res.redirect("/");
    }
  });

  // GET GAME RESULT
  app.get("/results", (req, res) => {
    if (isAuth(req, res)) {
      fs.readFile("./data/ratingList.json", "utf8", (error, rawData) => {
        if (error) throw error;

        const ratingList = [...JSON.parse(rawData)];
        const bestTenResult = ratingList.slice(0, 10);

        res.json(bestTenResult);
      });
    } else {
      res.redirect("/");
    }
  });

  // POST GAME RESULT
  app.post("/results", jsonParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);

    if (isAuth(req, res)) {
      let { name, score } = req.body;

      fs.readFile("./data/ratingList.json", "utf8", (error, rawData) => {
        if (error) throw error;

        const ratingList = [...JSON.parse(rawData)];

        ratingList.push({ name, score, position: null });
        ratingList
          .sort((prev, next) => next.score - prev.score)
          .forEach((member, index) => (member.position = index + 1));

        const bestTenResult = ratingList.slice(0, 10);

        fs.writeFile(
          "./data/ratingList.json",
          JSON.stringify(ratingList, null, 2),
          (err) => {
            if (err) throw err;
            res.json(bestTenResult);
          }
        );
      });
    } else {
      res.redirect("/");
    }
  });

  // TASK 1
  app.post("/api/tasks/roman", jsonParser, (req, res) => {
    routeCallback(req, res, roman);
  });

  // TASK 2
  app.post("/api/tasks/palindrome", jsonParser, (req, res) => {
    routeCallback(req, res, palindrome);
  });

  // TASK 3
  app.post("/api/tasks/brackets", jsonParser, (req, res) => {
    routeCallback(req, res, brackets);
  });

  // TASK 4
  app.post("/api/tasks/arraySort", jsonParser, (req, res) => {
    routeCallback(req, res, arraySort, "arr1&arr2");
  });

  // TASK 5
  app.post("/api/tasks/nextIndex", jsonParser, (req, res) => {
    routeCallback(req, res, nextIndex, "nums&target");
  });

  //ERROR HANDLER
  app.use((error, req, res, next) => {
    console.log("error");
    console.log("status", error.status, error.message);
    res.status(error.status); // 400, 500
    res.json({ result: error.message });
  });

  // NOT FOUND
  app.get("*", (req, res) => {
    res.end("404 not found");
    res.status(404);
  });

  // PORT LISTENER
  app.listen(PORT, () => {
    console.log(`Go to page http://localhost:${PORT}/`);
  });
});
