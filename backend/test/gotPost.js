const got = require('got');

const defaultOptions = {
  responseType: 'json',
  resolveBodyOnly: true,
  prefixUrl: 'http://localHost:9090',
};

module.exports = async function (url, newOptions) {
  const options = { ...defaultOptions, ...newOptions };

  try {
    return await got.post(url, options);
  } catch (error) {
    return error?.response?.body ?? { body: error.message };
  }
};
