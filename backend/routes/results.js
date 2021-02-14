const express = require('express');
const router = express.Router();

const mongoDb = require('../db/mongoDb');

// POST GAME RESULT
router.post('/', async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  if (!req.session.isAuth) return res.redirect('/login');

  let users = await mongoDb.getUsersCursor();
  let results = await mongoDb.getResultsCursor();

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
router.get('/', async (req, res) => {
  if (!req.session.isAuth) return res.redirect('/login');

  let users = await mongoDb.getUsersCursor();
  let results = await mongoDb.getResultsCursor();

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

module.exports = router;
