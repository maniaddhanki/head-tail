const assert = require('assert');
const { head, firstNLines, firstNCharacters, countByLines, headMain } = require('../src/headLib.js');

describe('head', () => {
  it('should give content back when it is of one line', () => {
    assert.strictEqual(head('hello', { arg: '-n', key: 'count', limit: 10 }), 'hello');
    assert.strictEqual(head('hi', { arg: '-n', key: 'count', limit: 10 }), 'hi');
  });
  it('should give content back when lines are less than default count', () => {
    assert.strictEqual(head('hello\nbye', { arg: '-n', key: 'count', limit: 10 }), 'hello\nbye');
  });
  it('should give first ten lines of content by default', () => {
    let content = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk';
    let expected = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj';
    assert.strictEqual(head(content, { arg: '-n', key: 'count', limit: 10 }), expected);
    content = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11';
    expected = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10';
    assert.strictEqual(head(content, { arg: '-n', key: 'count', limit: 10 }), expected);
  });
  it('should give given count of lines from first', () => {
    assert.strictEqual(head('a\nb\nc\nd\ne\n', { arg: '-n', key: 'count', limit: 3 }), 'a\nb\nc');
    assert.strictEqual(head('a\nb\nc\nd\ne\n', { arg: '-n', key: 'count', limit: 4 }), 'a\nb\nc\nd');
  });
  it('should give first characters when byte is specified', () => {
    assert.strictEqual(head('hello', { arg: '-c', key: 'byte', limit: 2 }), 'he');
    assert.strictEqual(head('\nhi', { arg: '-c', key: 'byte', limit: 2 }), '\nh');
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
    let expected = 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj';
    assert.strictEqual(countByLines(content, 10), expected);
    content = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11';
    expected = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10';
    assert.strictEqual(countByLines(content, 10), expected);
  });
  it('should give given count of lines from first', () => {
    assert.strictEqual(countByLines('a\nb\nc\nd\ne\n', 3), 'a\nb\nc');
    assert.strictEqual(countByLines('a\nb\nc\nd\ne\n', 4), 'a\nb\nc\nd');
  });
});
describe('headMain', () => {
  const mockReadFileSync = (file, encode, content) => {
    return (fileName, encoding) => {
      assert.strictEqual(file, fileName);
      assert.strictEqual(encode, encoding);
      return content;
    };
  };

  it('Should give first 10 lines if no option is specified', () => {
    const content = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11';
    const expected = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10';
    const readFunction = mockReadFileSync('a.txt', 'utf8', content);
    assert.strictEqual(headMain(readFunction, ['a.txt']), expected);
  });
  it('should give given number of lines', () => {
    const readFunction = mockReadFileSync('a.txt', 'utf8', 'a\nb\nc');
    assert.strictEqual(headMain(readFunction, ['-n', '2', 'a.txt']), 'a\nb');
  });
  it('should give given number of bytes from file', () => {
    const readFunction = mockReadFileSync('a.txt', 'utf8', 'a\nb\nc');
    assert.strictEqual(headMain(readFunction, ['-c', '1', 'a.txt']), 'a');
  });
  it('should throw error if file is not found', () => {
    const readFunction = mockReadFileSync('a.txt', 'utf8', 'a\nb\nc');
    assert.throws(() => headMain(readFunction, ['-n', '5', 'b.txt']), {
      message: 'head: b.txt: No such file or directory'
    });
  });
  it('should throw error if no arguments are given', () => {
    const readFunction = mockReadFileSync('a.txt', 'utf8', 'a\nb\nc');
    assert.throws(() => headMain(readFunction, []), { message: 'usage: head [-n lines | -c bytes] [file ...]' });
  });
  it('should throw error if no files are given', () => {
    const readFunction = mockReadFileSync('a.txt', 'utf8', 'a\nb\nc');
    assert.throws(() => headMain(readFunction, ['-n', '5']), { message: 'usage: head [-n lines | -c bytes] [file ...]' });
  });
});
