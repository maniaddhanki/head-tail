const assert = require('assert');

const { validate, areFilesGiven } = require('../src/parseArgs.js');

describe('validate', () => {
  it('should throw error if unknown options are mentioned', () => {
    assert.throws(() => validate([{ arg: '-n', key: 'count', limit: 2 }, { arg: '-a', key: undefined, limit: undefined }]), {
      usage: 'usage: head [-n lines | -c bytes] [file ...]'
    });
  });
  it('should throw error if limit is not a positive number', () => {
    assert.throws(() => validate([{ arg: '-n', key: 'count', limit: 2 }, { arg: '-n', key: 'count', limit: 0 }]), {
      usage: 'usage: head [-n lines | -c bytes] [file ...]'
    });
  });
  it('shold throw error if there is combination of keys', () => {
    assert.throws(() => validate([{ arg: '-n', key: 'count', limit: 2 }, { arg: '-c', key: 'byte', limit: 2 }]), {
      usage: 'usage: head [-n lines | -c bytes] [file ...]'
    });
  });
});

describe('areFilesGiven', () => {
  it('should throw error if files are not given', () => {
    assert.throws(() => areFilesGiven([]), { usage: 'usage: head [-n lines | -c bytes] [file ...]' });
  });
});
