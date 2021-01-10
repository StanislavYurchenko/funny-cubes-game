const createError = require('http-errors');

module.exports = (req, res, task) => {
  if (!req.body) return res.sendStatus(400);

  try {
    // console.log('+++++++++++++++++++++++++++++');
    // console.log(...Object.values(req?.body));
    // console.log('-----------------------------');
    const result = task(req?.body?.input);
    // const result = task(...Object.values(req?.body));

    res.json({ result });
  } catch (error) {
    if (error.status >= 500 && error.status < 600) {
      throw createError(500, error.message);
    } else {
      throw createError(400, error.message);
    }
  }
};
