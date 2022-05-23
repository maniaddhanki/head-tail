const { parseArgs, parseWithOption, defaultOption, fetchOptions, findValue, isIntegratedOption, findSelection } = require('../src/parseArgs.js');
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
    assert.deepStrictEqual(fetchOptions(['-n', '5', '-n4', '-5', 'a.txt', 'b.txt']), ['-n', '5', '-n4', '-5']);
  });
  it('should give empty array when no options are specified', () => {
    assert.deepStrictEqual(fetchOptions(['a.txt', 'b.txt']), []);
  });
});

describe('findValue', () => {
  it('option has value in it', () => {
    assert.strictEqual(findValue('-n5', 'a.txt'), 5);
  });
  it('option has value but not key', () => {
    assert.strictEqual(findValue('-2', 'a.txt'), 2);
  });
  it('opion has value as next element', () => {
    assert.strictEqual(findValue('-n', '3'), 3);
  });
});

describe('isIntegratedOption', () => {
  it('is true if opition has both key and value', () => {
    assert.strictEqual(isIntegratedOption('-n5'), true);
  });
  it('is false if either option does not have key or option doesnot have valude', () => {
    assert.strictEqual(isIntegratedOption('-5'), false);
    assert.strictEqual(isIntegratedOption('-n'), false);
  });
});

describe('findSelection', () => {
  it('should give count if c is not specified', () => {
    assert.strictEqual(findSelection('-n'), 'count');
    assert.strictEqual(findSelection('-n5'), 'count');
    assert.strictEqual(findSelection('-5'), 'count');
  });
  it('should give byte if c is specified', () => {
    assert.strictEqual(findSelection('-c5'), 'bytes');
    assert.strictEqual(findSelection('-c'), 'bytes');
  });
});
