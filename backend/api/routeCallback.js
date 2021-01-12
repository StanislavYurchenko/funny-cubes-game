const createError = require('http-errors');

module.exports = (req, res, task, argumentType = 'input') => {
  const arguments = req?.body;
  if (!arguments) return res.sendStatus(400);

  try {
    let result;

    switch (argumentType) {
      case 'input':
        result = task(arguments['input']);
        break;

      case 'arr1&arr2':
        result = task(arguments['arr1'], arguments['arr2']);
        break;

      case 'nums&target':
        result = task(arguments['nums'], arguments['target']);
        break;
    }

    res.json({ result });
  } catch (error) {
    if (error.message.includes('EASTER EGG')) {
      throw createError(500, error.message);
    }

    throw createError(400, error.message);
  }
};
