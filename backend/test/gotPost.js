const got = require('got');

const defaultOptions = {
  responseType: 'json',
  resolveBodyOnly: true,
  prefixUrl: 'http://localHost:9090',
};

module.exports = async function (url, newOptions) {
  const options = { ...defaultOptions, ...newOptions };

  const body = await got.post(url, options);

  return body;
};
