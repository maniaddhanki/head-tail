const { parseArgs, parseWithOption, defaultOption, fetchOptions, constructOption, integrateOption } = require('../src/parseArgs.js');

const assert = require('assert');

describe('parseArgs', () => {
  it('should give fileName and default count', () => {
    assert.deepStrictEqual(parseArgs(['a.txt']), { files: ['a.txt'], option: { count: 10 } });
  });
  it('should return options and fileName', () => {
    assert.deepStrictEqual(parseArgs(['-n', '5', 'a.txt']), { files: ['a.txt'], option: { count: 5 } });
  });
  it('should return byte when -n is specified', () => {
    assert.deepStrictEqual(parseArgs(['-c', '4', 'a.txt']), { files: ['a.txt'], option: { 'bytes': 4 } });
  });
  it('should accept multiple files and single option', () => {
    assert.deepStrictEqual(parseArgs(['-n', '5', 'a.txt', 'b.txt']), { files: ['a.txt', 'b.txt'], option: { 'count': 5 } });
  });
  it('should work for options without spaces', () => {
    assert.deepStrictEqual(parseArgs(['-n5', 'a.txt']), { files: ['a.txt'], option: { count: 5 } });
  });
  it('option is count if option does not have key', () => {
    assert.deepStrictEqual(parseArgs(['-4', 'a.txt']), { files: ['a.txt'], option: { count: 4 } });
  });
});

describe('parseWithOption', () => {
  it('should give count option when -n is specified', () => {
    assert.deepStrictEqual(parseWithOption(['-n', '5', 'a.txt', 'b.txt']), { files: ['a.txt', 'b.txt'], option: { count: 5 } });
  });
  it('should give byte option when -c is specified', () => {
    assert.deepStrictEqual(parseWithOption(['-c', '4', 'a.txt', 'b.txt']), { files: ['a.txt', 'b.txt'], option: { bytes: 4 } });
  });
  it('should overWrite option if repeated', () => {
    assert.deepStrictEqual(parseWithOption(['-n', '5', '-n', '2', 'a.txt', 'b.txt']), { files: ['a.txt', 'b.txt'], option: { count: 2 } });
  });
  it('should overWrite option if repeated in other formats also', () => {
    assert.deepStrictEqual(parseWithOption(['-n', '5', '-n2', 'a.txt', 'b.txt']), { files: ['a.txt', 'b.txt'], option: { count: 2 } });
  });
  it('should work for options without spaces', () => {
    assert.deepStrictEqual(parseWithOption(['-n5', 'a.txt']), { files: ['a.txt'], option: { count: 5 } });
  });
  it('option is count if option does not have key', () => {
    assert.deepStrictEqual(parseWithOption(['-4', 'a.txt']), { files: ['a.txt'], option: { count: 4 } });
  });
});

describe('defaultOption', () => {
  it('should give count:10 as defult option', () => {
    assert.deepStrictEqual(defaultOption(['a.txt', 'b.txt']), { files: ['a.txt', 'b.txt'], option: { count: 10 } });
  });
});

describe('fetchOptions', () => {
  it('should give all options in arguments', () => {
    const expected = {
      files: ['a.txt', 'b.txt'],
      options: [{ count: 5 },
      { count: 4 },
      { count: 5 }]
    };
    assert.deepStrictEqual(fetchOptions(['-n', '5', '-n4', '-5', 'a.txt', 'b.txt']), expected);
  });
  it('should give empty array when no options are specified', () => {
    const expected = {
      files: ['a.txt', 'b.txt'],
      options: []
    };
    assert.deepStrictEqual(fetchOptions(['a.txt', 'b.txt']), expected);
  });
});

describe('constructOption', () => {
  it('should contruct option with given values', () => {
    assert.deepStrictEqual(constructOption('-n', '2'), { count: 2 });
    assert.deepStrictEqual(constructOption('-c', '5'), { bytes: 5 });
  });
});

describe('integrateOption', () => {
  it('should contruct option of given key', () => {
    assert.deepStrictEqual(integrateOption('-n1'), { count: 1 });
    assert.deepStrictEqual(integrateOption('-c5'), { bytes: 5 });
  });
  it('should contstruct count option if key is not specified', () => {
    assert.deepStrictEqual(integrateOption('-7'), { count: 7 });
  });
});
