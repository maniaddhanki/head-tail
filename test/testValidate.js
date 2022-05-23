const assert = require('assert');

const { validate } = require('../src/parseArgs.js');

describe('validate', () => {
  it('should throw error if unknown options are mentioned', () => {
    assert.throws(() => validate(['-n5', '-a', '4', 'a.txt']), {
      usage: 'usage: head [-n lines | -c bytes] [file ...]'
    });
  });
});
