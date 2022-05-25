const assert = require('assert');
const { tail, lastNLines, lastNCharacters } = require('../src/tailLib');

describe('tail', () => {
  it('should give given content when it is less than default count', () => {
    assert.strictEqual(tail('1\n2\n3', '-n'), '1\n2\n3');
  });
  it('should given last ten lines of given content', () => {
    assert.strictEqual(tail('a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk\nl', '-n'), 'c\nd\ne\nf\ng\nh\ni\nj\nk\nl');
  });
  it('should give last bytes of given content', () => {
    assert.strictEqual(tail('abcdefghijkl', '-c', 10), 'cdefghijkl');
  });
  it('should given last lines of given count', () => {
    assert.strictEqual(tail('a\nb\nc\nd', '-n', 2), 'c\nd');
  });
});

describe('lastNLines', () => {
  it('should give all lines when count less or equal to its length', () => {
    assert.deepStrictEqual(lastNLines(['hi'], 1), ['hi']);
    assert.deepStrictEqual(lastNLines(['hello', 'hi'], 3), ['hello', 'hi']);
  });
  it('should give count number of lines', () => {
    assert.deepStrictEqual(lastNLines(['a', 'b', 'c'], 2), ['b', 'c']);
    assert.deepStrictEqual(lastNLines(['d', 'e'], 1), ['e']);
  });
});

describe('lastNCharacters', () => {
  it('should give last characters of given count', () => {
    assert.strictEqual(lastNCharacters('hello', 1), 'o');
    assert.strictEqual(lastNCharacters('hello', 3), 'llo');
  });
  it('should give content back when it has less bytes than mentioned', () => {
    assert.strictEqual(lastNCharacters('ab', 3), 'ab');
  });
  it('should treate \n as a character', () => {
    assert.strictEqual(tail('\n', 'byte', 2), '\n');
  });
});
