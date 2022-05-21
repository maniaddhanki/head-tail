const { parseArgs, parseWithOption, defaultOption } = require('../src/parseArgs.js');
const assert = require('assert');

describe('parseArgs', () => {
  it('should give fileName and default count', () => {
    assert.deepStrictEqual(parseArgs(['a.txt']), { files: ['a.txt'], option: { count: 10 } });
  });
  it('should return options and fileName', () => {
    assert.deepStrictEqual(parseArgs(['-n', '5', 'a.txt']), { files: ['a.txt'], option: { count: 5 } });
  });
  it('should return byte when -n is specified', () => {
    assert.deepStrictEqual(parseArgs(['-c', '4', 'a.txt']), { files: ['a.txt'], option: { 'byte': 4 } });
  });
  it('should accept multiple files and single option', () => {
    assert.deepStrictEqual(parseArgs(['-n', '5', 'a.txt', 'b.txt']), { files: ['a.txt', 'b.txt'], option: { 'count': 5 } });
  });
});

describe('parseWithOption', () => {
  it('should give count option when -n is specified', () => {
    assert.deepStrictEqual(parseWithOption(['-n', '5', 'a.txt', 'b.txt']), { files: ['a.txt', 'b.txt'], option: { count: 5 } });
  });
  it('should give byte option when -c is specified', () => {
    assert.deepStrictEqual(parseWithOption(['-c', '4', 'a.txt', 'b.txt']), { files: ['a.txt', 'b.txt'], option: { byte: 4 } });
  });
});

describe('defaultOption', () => {
  it('should give count:10 as defult option', () => {
    assert.deepStrictEqual(defaultOption(['a.txt', 'b.txt']), { files: ['a.txt', 'b.txt'], option: { count: 10 } });
  });
});
