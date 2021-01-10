const { assert } = require('chai');
const fixtures = require('../../api/fixtures/fixtures1-roman.js');
const gotPost = require('../gotPost.js');

describe("route 'test/post'/. Positive.", () => {
  fixtures.forEach(({ name, input, expected }) => {
    it(name, async () => {
      const options = { json: { input } };

      const body = await gotPost('api/tasks/roman', options);

      assert.equal(body?.result, expected.output, body?.message);
    });
  });
});
