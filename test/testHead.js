const assert = require('assert');
const { head, firstNLines, firstNCharacters } = require('../src/head.js');

describe('head', () => {
  it('should give content back when it is of one line', () => {
    assert.strictEqual(head('hello', 'line'), 'hello');
    assert.strictEqual(head('hi', 'line'), 'hi');
  });
  it('should give content back when lines are less than default count', () => {
    assert.strictEqual(head('hello\nbye', 'line'), 'hello\nbye');
  });
  it('should give first ten lines of content by default', () => {
    let content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    let expected = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj';
    assert.strictEqual(head(content, 'line'), expected);
    content = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11';
    expected = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10';
    assert.strictEqual(head(content, 'line'), expected);
  });
  it('should give given count of lines from first', () => {
    assert.strictEqual(head('a\nb\nc\nd\ne\n', 'line', 3), 'a\nb\nc');
    assert.strictEqual(head('a\nb\nc\nd\ne\n', 'line', 4), 'a\nb\nc\nd');
  });
  it('should count characters when byte is specified', () => {
    assert.strictEqual(head('hello', 'byte', 2), 'he');
    assert.strictEqual(head('\nhi', 'byte', 2), '\nh');
  });
});

describe('firstNLines', () => {
  it('should give all lines when count less or equal to its length', () => {
    assert.deepStrictEqual(firstNLines(['hi'], 1), ['hi']);
    assert.deepStrictEqual(firstNLines(['hello', 'hi'], 3), ['hello', 'hi']);
  });
  it('should give count number of lines', () => {
    assert.deepStrictEqual(firstNLines(['a', 'b', 'c'], 2), ['a', 'b']);
    assert.deepStrictEqual(firstNLines(['d', 'e'], 1), ['d']);
  });
});

describe('firstNCharacters', () => {
  it('should give first characters of given count', () => {
    assert.strictEqual(firstNCharacters('hello', 1), 'h');
    assert.strictEqual(firstNCharacters('hello', 3), 'hel');
  });
  it('should give content back when it has less bytes than mentioned', () => {
    assert.strictEqual(firstNCharacters('ab', 3), 'ab');
  });
  it('should treate \n as a character', () => {
    assert.strictEqual(head('\n', 'byte', 1), '\n');
  });
});
