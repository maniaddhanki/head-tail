const assert = require('assert');

const head = content => content;

describe('head', () => {
  it('should give content back when it is of one line', () => {
    assert.strictEqual(head('hello'), 'hello');
    assert.strictEqual(head('hi'), 'hi');
  });
  it('should give content back when it is less than 10 lines', () => {
    assert.strictEqual(head('hello\nbye'), 'hello\nbye');
  });
});
