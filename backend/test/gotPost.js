const got = require('got');

const defaultOptions = {
  responseType: 'json',
  throwHttpErrors: false,
  prefixUrl: 'http://localHost:9090',
};

module.exports = async function (url, newOptions) {
  const options = { ...defaultOptions, ...newOptions };

  const { body, statusCode, statusMessage } = await got.post(url, options);
  const errorMessage = `Response status: "${statusCode}", message: "${statusMessage}" `;

  console.log(
    `  REQUEST:
     URL: "${url}" 
     input: " ${Object.values(options.json)}"
  RESPONSE:
     status: "${statusCode}"
     result: "${body.result}" `,
  );

  return body ?? { result: errorMessage };
};
