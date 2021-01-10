const { assert } = require('chai');
const fixtures = require('../../api/fixtures/fixtures4-arraySort.js');
const gotPost = require('../gotPost.js');

describe("route 'test/post'/. Positive.", () => {
  fixtures.forEach(({ name, input, expected }) => {
    it(name, async () => {
      const options = { json: { arr1: input.arr1, arr2: input.arr2 } };

      const body = await gotPost('api/tasks/arraySort', options);

      assert.deepEqual(body.result, expected.output, body?.message);
    });
  });
});
