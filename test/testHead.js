const assert = require('assert');
const { head } = require('../src/head.js');

describe('head', () => {
  it('should give content back when it is of one line', () => {
    assert.strictEqual(head('hello'), 'hello');
    assert.strictEqual(head('hi'), 'hi');
  });
  it('should give content back when lines are less than default count', () => {
    assert.strictEqual(head('hello\nbye'), 'hello\nbye');
  });
  it('should give first two of content by default', () => {
    assert.strictEqual(head('a\nb\nc'), 'a\nb');
    assert.strictEqual(head('b\na\nc\nd\ne'), 'b\na');
  });
  it('should give given count of lines from first', () => {
    assert.strictEqual(head('a\nb\nc\nd\ne\n', 3), 'a\nb\nc');
    assert.strictEqual(head('a\nb\nc\nd\ne\n', 4), 'a\nb\nc\nd');
  });
});
