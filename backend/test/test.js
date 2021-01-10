const { assert } = require('chai');
const gotPost = require('./gotPost.js');

module.exports = function (message, fixtures, routeUrl, typeEqual = 'equal') {
  describe(message, () => {
    fixtures.forEach(({ name, input, expected }) => {
      const options = { json: { ...input } };

      it(name, async () => {
        const body = await gotPost(routeUrl, options);

        assert[typeEqual](body?.result, expected.output, expected.name);
      });
    });
  });
};
