const assert = require('assert');
const { tail, lastNLines, lastNCharacters, countByLines } = require('../src/tailLib');

describe('tail', () => {
  it('should give given content when it is less than default count', () => {
    assert.strictEqual(tail('1\n2\n3', 'line'), '1\n2\n3');
  });
  it('should given last ten lines of given content', () => {
    assert.strictEqual(tail('a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk\nl', 'line'), 'c\nd\ne\nf\ng\nh\ni\nj\nk\nl');
  });
  it('should give last bytes of given content', () => {
    assert.strictEqual(tail('abcdefghijkl', 'byte', 10), 'cdefghijkl');
  });
  it('should given last lines of given count', () => {
    assert.strictEqual(tail('a\nb\nc\nd', 'line', 2), 'c\nd');
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
  it('should treate \\n as a character', () => {
    assert.strictEqual(tail('\n', 'byte', 2), '\n');
  });
});

describe('countByLines', () => {
  it('should give content back when it is of one line', () => {
    assert.strictEqual(countByLines('hello', 10), 'hello');
    assert.strictEqual(countByLines('hi', 10), 'hi');
  });
  it('should give content back when lines are less than default count', () => {
    assert.strictEqual(countByLines('hello\nbye', 10), 'hello\nbye');
  });
  it('should give first ten lines of content by default', () => {
    let content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    let expected = 'b\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    assert.strictEqual(countByLines(content, 10), expected);
    content = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11';
    expected = '2\n3\n4\n5\n6\n7\n8\n9\n10\n11';
    assert.strictEqual(countByLines(content, 10), expected);
  });
  it('should give given count of lines from first', () => {
    assert.strictEqual(countByLines('a\nb\nc\nd\ne', 3), 'c\nd\ne');
    assert.strictEqual(countByLines('a\nb\nc\nd\ne', 4), 'b\nc\nd\ne');
  });
});
