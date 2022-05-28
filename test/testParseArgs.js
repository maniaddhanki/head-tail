const { parseArgs, defaultOption, fetchOptions, constructOption, destructureOption } = require('../src/parseArgs.js');

const assert = require('assert');

describe('parseArgs', () => {
  it('should give fileName and default count', () => {
    assert.deepStrictEqual(parseArgs(['a.txt']), { files: ['a.txt'], option: { flag: '-n', limit: 10 } });
  });
  it('should return options and fileName', () => {
    assert.deepStrictEqual(parseArgs(['-n', '5', 'a.txt']), { files: ['a.txt'], option: { flag: '-n', limit: 5 } });
  });
  it('should give count option when -n is specified', () => {
    assert.deepStrictEqual(parseArgs(['-n', '5', 'a.txt', 'b.txt']), { files: ['a.txt', 'b.txt'], option: { flag: '-n', limit: 5 } });
  });
  it('should give byte option when -c is specified', () => {
    assert.deepStrictEqual(parseArgs(['-c', '4', 'a.txt', 'b.txt']), { files: ['a.txt', 'b.txt'], option: { flag: '-c', limit: 4 } });
  });
  it('should overWrite option if repeated', () => {
    assert.deepStrictEqual(parseArgs(['-n', '5', '-n', '2', 'a.txt', 'b.txt']), { files: ['a.txt', 'b.txt'], option: { flag: '-n', limit: 2 } });
  });
  it('should overWrite option if repeated in other formats also', () => {
    assert.deepStrictEqual(parseArgs(['-n', '5', '-n2', 'a.txt', 'b.txt']), { files: ['a.txt', 'b.txt'], option: { flag: '-n', limit: 2 } });
  });
  it('should work for options without spaces', () => {
    assert.deepStrictEqual(parseArgs(['-n5', 'a.txt']), { files: ['a.txt'], option: { flag: '-n', limit: 5 } });
  });
  it('option is count if option does not have key', () => {
    assert.deepStrictEqual(parseArgs(['-4', 'a.txt']), { files: ['a.txt'], option: { flag: '-n', limit: 4 } });
  });
  it('should throw illegal options are given', () => {
    const error = {
      name: 'illegal option',
      flag: '-a',
      message: 'head: illegal option -- a'
    };
    assert.throws(() => parseArgs(['-a', '5', 'a.txt']), error);
  });
  it('should throw illegal limits are given', () => {
    assert.throws(() => parseArgs(['-n', '0', 'a.txt']), { message: 'head: illegal line count -- 0\nusage: head [-n lines | -c bytes] [file ...]' });
  });
  it('should throw illegal options are given', () => {
    assert.throws(() => parseArgs(['-n', '5', '-c1', 'a.txt']), { message: 'head: can\'t combine line and byte counts\nusage: head [-n lines | -c bytes] [file ...]' });
  });
  it('should throw error if no arguments are given', () => {
    assert.throws(() => parseArgs([]), { message: 'usage: head [-n lines | -c bytes] [file ...]' });
  });
});

describe('defaultOption', () => {
  it('should give count:10 as defult option', () => {
    assert.deepStrictEqual(defaultOption(['a.txt', 'b.txt']), { flag: '-n', limit: 10 });
  });
});

describe('fetchOptions', () => {
  it('should give all options in arguments', () => {
    const expected = {
      files: ['a.txt', 'b.txt'],
      options: [{ flag: '-n', limit: 5 },
      { flag: '-n', limit: 4 },
      { flag: '-n', limit: 5 }]
    };
    assert.deepStrictEqual(fetchOptions(['-n', '5', '-n4', '-5', 'a.txt', 'b.txt']), expected);
  });
  it('should give empty array when no options are specified', () => {
    const expected = {
      files: ['a.txt', 'b.txt'],
      options: [{ flag: '-n', limit: 10 }]
    };
    assert.deepStrictEqual(fetchOptions(['a.txt', 'b.txt']), expected);
  });
});

describe('constructOption', () => {
  it('should contruct option with given limits', () => {
    assert.deepStrictEqual(constructOption('-n', '2'), { flag: '-n', limit: '' });
    assert.deepStrictEqual(constructOption('-c', '5'), { flag: '-c', limit: '' });
  });
});

describe('destructureOption', () => {
  it('should contruct option of given key', () => {
    assert.deepStrictEqual(destructureOption('-n1'), ['-n', '1']);
    assert.deepStrictEqual(destructureOption('-c5'), ['-c', '5']);
  });
  it('should contstruct count option if key is not specified', () => {
    assert.deepStrictEqual(destructureOption('-7'), ['-n', '7']);
  });
});
