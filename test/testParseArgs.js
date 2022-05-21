const { parseArgs } = require('../src/parseArgs.js');
const assert = require('assert');

describe('parseArgs', () => {
  it('should give fileName when no options are mentioned', () => {
    assert.deepStrictEqual(parseArgs(['a.txt']), { file: ['a.txt'], options: {} });
  });
  it('should return options and fileName', () => {
    assert.deepStrictEqual(parseArgs(['-n', '5', 'a.txt']), { file: ['a.txt'], options: { count: 5 } });
  });
  it('should return byte when -n is specified', () => {
    assert.deepStrictEqual(parseArgs(['-c', '4', 'a.txt']), { file: ['a.txt'], options: { 'byte': 4 } });
  });
  it('should accept multiple files and single option', () => {
    assert.deepStrictEqual(parseArgs(['-n', '5', 'a.txt', 'b.txt']), { file: ['a.txt', 'b.txt'], options: { 'count': 5 } });
  });
});
