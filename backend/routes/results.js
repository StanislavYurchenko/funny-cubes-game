const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const jsonParser = bodyParser.json();

// POST GAME RESULT
router.post('/', jsonParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  if (!req.session.isAuth) return res.redirect('/login');

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

    await req.session.users.updateOne(
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
  try {
    const user = await req.session.users
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
