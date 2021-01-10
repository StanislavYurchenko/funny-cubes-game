const { assert } = require('chai');
const fixtures = require('../../api/fixtures/fixtures5-nextIndex.js');
const gotPost = require('../gotPost.js');

describe("route 'test/post'/. Positive.", () => {
  fixtures.forEach(({ name, input, expected }) => {
    it(name, async () => {
      const options = { json: { nums: input.nums, target: input.target } };

      const body = await gotPost('api/tasks/nextIndex', options);

      assert.deepEqual(body.result, expected.output, body?.message);
    });
  });
});
