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
  it('should give first ten lines of content by default', () => {
    assert.strictEqual(head('a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk'), 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj');
    assert.strictEqual(head('1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11'), '1\n2\n3\n4\n5\n6\n7\n8\n9\n10');
  });
  it('should give given count of lines from first', () => {
    assert.strictEqual(head('a\nb\nc\nd\ne\n', 3), 'a\nb\nc');
    assert.strictEqual(head('a\nb\nc\nd\ne\n', 4), 'a\nb\nc\nd');
  });
});
