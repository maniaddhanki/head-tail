const assert = require('assert');

const { validate, validateArgs } = require('../src/validatorLib.js');

describe('validate', () => {
  it('should throw error if unknown options are mentioned', () => {
    assert.throws(() => validate({ flag: '-a', countBy: undefined, value: undefined }, '-n'), {
      message: 'head: illegal option -- a\nusage: head [-n lines | -c bytes] [file ...]'
    });
    assert.strictEqual(validate({ flag: '-n', countBy: 'line', value: 2 }, '-n'), undefined);
  });
  it('should throw error if limit is not a positive number', () => {
    assert.throws(() => validate({ flag: '-n', countBy: 'line', value: 0 }, '-n'), {
      message: 'head: illegal line count -- 0\nusage: head [-n lines | -c bytes] [file ...]'
    });
    assert.throws(() => validate({ flag: '-c', countBy: 'byte', value: 0 }, '-n'), {
      message: 'head: illegal byte count -- 0\nusage: head [-n lines | -c bytes] [file ...]'
    });
    assert.strictEqual(validate({ flag: '-c', countBy: 'byte', value: 1 }, '-c'), undefined);
  });
  it('shold throw error if there is combination of keys', () => {
    assert.throws(() => validate({ flag: '-n', countBy: 'line', value: 2 }, '-c'), {
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
