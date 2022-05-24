const assert = require('assert');

const { validate, areFilesGiven } = require('../src/validation.js');

describe('validate', () => {
  it('should throw error if unknown options are mentioned', () => {
    assert.throws(() => validate({ arg: '-a', key: undefined, limit: undefined }, '-n'), {
      message: 'head: illegal option -- a\nusage: head [-n lines | -c bytes] [file ...]'
    });
    assert.strictEqual(validate({ arg: '-n', key: 'count', limit: 2 }, '-n'), undefined);
  });
  it('should throw error if limit is not a positive number', () => {
    assert.throws(() => validate({ arg: '-n', key: 'count', limit: 0 }, '-n'), {
      message: 'head: illegal line count -- 0\nusage: head [-n lines | -c bytes] [file ...]'
    });
    assert.throws(() => validate({ arg: '-c', key: 'byte', limit: 0 }, '-n'), {
      message: 'head: illegal byte count -- 0\nusage: head [-n lines | -c bytes] [file ...]'
    });
    assert.strictEqual(validate({ arg: '-c', key: 'byte', limit: 1 }, '-c'), undefined);
  });
  it('shold throw error if there is combination of keys', () => {
    assert.throws(() => validate({ arg: '-n', key: 'count', limit: 2 }, '-c'), {
      message: 'head: can\'t combine line and byte counts\nusage: head [-n lines | -c bytes] [file ...]'
    });
  });
});

describe('areFilesGiven', () => {
  it('should throw error if files are not given', () => {
    assert.throws(() => areFilesGiven([]), { message: 'usage: head [-n lines | -c bytes] [file ...]' });
  });
});
