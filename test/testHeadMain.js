const assert = require('assert');
const { headMain, noFormat, arrowFormat, headFile, print } = require('../src/headMain.js');

const mockReadFileSync = (file, encode, content) => {
  let index = 0;
  return (fileName, encoding) => {
    assert.strictEqual(file[index], fileName);
    assert.strictEqual(encode, encoding);
    index++;
    return content[index - 1];
  };
};

const mockConsole = (expected) => {
  let index = 0;
  return content => {
    index++;
    assert.strictEqual(expected[index - 1], content);
  };
};

describe('headMain', () => {
  it('Should give first 10 lines if no option is specified', () => {
    const content = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11';
    const consoleLog = mockConsole(['1\n2\n3\n4\n5\n6\n7\n8\n9\n10']);
    const consoleError = mockConsole([]);
    const readFunction = mockReadFileSync(['a.txt'], 'utf8', [content]);
    headMain(readFunction, consoleLog, consoleError, ['a.txt']);
  });
  it('should give given number of lines', () => {
    const consoleLog = mockConsole(['a\nb']);
    const consoleError = mockConsole([]);
    const readFunction = mockReadFileSync(['a.txt'], 'utf8', ['a\nb\nc']);
    headMain(readFunction, consoleLog, consoleError, ['-n', '2', 'a.txt']);
  });
  it('should give given number of bytes from file', () => {
    const consoleLog = mockConsole(['a']);
    const consoleError = mockConsole([]);
    const readFunction = mockReadFileSync(['a.txt'], 'utf8', ['a\nb\nc']);
    headMain(readFunction, consoleLog, consoleError, ['-c', '1', 'a.txt']);
  });
  it('should throw error if file is not found', () => {
    const readFunction = mockReadFileSync(['a.txt'], 'utf8', ['a\nb\nc']);
    const consoleLog = mockConsole(['\n==> a.txt <==\na']);
    const consoleError = mockConsole(['head: b.txt: No such file or directory']);
    headMain(readFunction, consoleLog, consoleError, ['-n', '1', 'a.txt', 'b.txt']);
  });
  it('should throw error if no arguments are given', () => {
    const readFunction = mockReadFileSync(['a.txt'], 'utf8', ['a\nb\nc']);
    const consoleLog = mockConsole([]);
    const consoleError = mockConsole(['usage: head [-n lines | -c bytes] [file ...]']);
    headMain(readFunction, consoleLog, consoleError, []);
  });
  it('should throw error if no files are given', () => {
    const readFunction = mockReadFileSync(['a.txt'], 'utf8', ['a\nb\nc']);
    const consoleLog = mockConsole([]);
    const consoleError = mockConsole(['usage: head [-n lines | -c bytes] [file ...]']);
    headMain(readFunction, consoleLog, consoleError, ['-n', '5']);
  });
  it('should print results in error and output streams respictively', () => {
    const readFunction = mockReadFileSync(['a.txt', 'b.txt', 'c.txt'], 'utf8', ['ab', 'abc', 'abcdef']);
    const consoleLog = mockConsole(['\n==> a.txt <==\nab', '\n==> b.txt <==\nabc', '\n==> c.txt <==\nabcde']);
    const consoleError = mockConsole(['head: d.txt: No such file or directory']);
    headMain(readFunction, consoleLog, consoleError, ['-c', '5', 'a.txt', 'b.txt', 'c.txt', 'd.txt']);
  });
});

describe('headFile', () => {
  it('should give object of file name,headed contents and error status', () => {
    const readFunction = mockReadFileSync(['a.txt'], 'utf8', ['a\nb\nc']);
    assert.deepStrictEqual(headFile(readFunction, 'a.txt', { flag: '-n', countBy: 'line', value: 2 }), { file: 'a.txt', output: 'a\nb', isError: false });
  });
  it('isError should be true if head was not successfull', () => {
    const readFunction = mockReadFileSync(['b.txt'], 'utf8', ['a\nb\nc']);
    assert.deepStrictEqual(headFile(readFunction, 'a.txt', { flag: '-n', countBy: 'line', value: 2 }), { file: 'a.txt', output: 'head: a.txt: No such file or directory', isError: true });
  });
});

describe('print', () => {
  it('should print with given format', () => {
    const consoleLog = mockConsole(['\n==> a.txt <==\na\nb', 'a\nb']);
    const consoleError = mockConsole([]);
    const result = { file: 'a.txt', output: 'a\nb', isError: false };
    print(consoleLog, consoleError, result, arrowFormat);
    print(consoleLog, consoleError, result, noFormat);
  });
  it('should print to error stream if error occured', () => {
    const consoleLog = mockConsole([]);
    const consoleError = mockConsole(['head: a.txt: No such file or directory']);
    const result = { file: 'a.txt', output: 'head: a.txt: No such file or directory', isError: true };
    print(consoleLog, consoleError, result, arrowFormat);
  });
});

describe('noFormat', () => {
  it('should give \'\' when called', () => {
    assert.strictEqual(noFormat(), '');
  });
});

describe('arrowFormat', () => {
  it('should give arrow format with filename', () => {
    assert.strictEqual(arrowFormat('a.txt'), '\n==> a.txt <==\n');
    assert.strictEqual(arrowFormat('b.txt'), '\n==> b.txt <==\n');
  });
});
