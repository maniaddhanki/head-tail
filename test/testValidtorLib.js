const assert = require('assert');

const { validate, validateArgs } = require('../src/validatorLib.js');

describe('validate', () => {
  it('should throw error if unknown options are mentioned', () => {
    const error = {
      name: 'illegal option',
      flag: '-a',
      message: 'head: illegal option -- a'
    };
    assert.throws(() => validate({ flag: '-a', limit: undefined }, '-n'), error);
    assert.strictEqual(validate({ flag: '-n', limit: 2 }, '-n'), undefined);
  });
  it('should throw error if limit is not a positive number', () => {
    assert.throws(() => validate({ flag: '-n', limit: 0 }, '-n'), {
      message: 'head: illegal line count -- 0\nusage: head [-n lines | -c bytes] [file ...]'
    });
    assert.throws(() => validate({ flag: '-c', limit: 0 }, '-c'), {
      message: 'head: illegal byte count -- 0\nusage: head [-n lines | -c bytes] [file ...]'
    });
    assert.strictEqual(validate({ flag: '-c', limit: 1 }, '-c'), undefined);
  });
  it('shold throw error if there is combination of keys', () => {
    assert.throws(() => validate({ flag: '-n', limit: 2 }, '-c'), {
      message: 'head: can\'t combine line and byte counts\nusage: head [-n lines | -c bytes] [file ...]'
    });
  });
});

describe('validateArgs', () => {
  it('should throw error if arguments are not given', () => {
    assert.throws(() => validateArgs([]), { message: 'usage: head [-n lines | -c bytes] [file ...]' });
  });
  it('should not given error if arguments are given', () => {
    assert.strictEqual(validateArgs(['-n', '1']), undefined);
  });
});
