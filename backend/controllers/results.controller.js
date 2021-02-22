const User = require('..//models/User');
const Result = require('..//models/Result');

// GET GAME RESULT
const get = async (req, res) => {
  if (!req.session.isAuth) return res.redirect('/login');

  try {
    const user = await User.findOne({ login: req.session.user.login });
    const bestTenResults = await Result.find().sort({ score: -1 }).limit(10);
    return res.json({ bestTenResults, user });
  } catch (error) {
    console.log(error);
  }
};

// POST GAME RESULT
const post = async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  if (!req.session.isAuth) return res.redirect('/login');

  const date = new Date();
  const normalizedDate = date.toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric' });
  const result = {
    login: req.session.user.login,
    score: req.body.score,
    data: normalizedDate,
  };

  try {
    const bestUserResults = await Result.find({ login: req.session.user.login })
      .sort({ score: -1 })
      .limit(1);

    const bestUserResult = bestUserResults[0].score;

    await Result.create({ ...result });

    await User.updateOne(
      { login: req.session.user.login },
      {
        $inc: { totalGames: +1 },
        $set: { bestResult: result.score > bestUserResult ? result.score : bestUserResult },
      },
      {},
    );

    return res.json(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { get, post };
