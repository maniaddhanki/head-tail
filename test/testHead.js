const assert = require('assert');

const head = content => {
  const lines = content.split('\n');
  if (lines.length <= 2) {
    return lines.join('\n');
  }
  return lines.slice(0, 2).join('\n') + '\n';
};

describe('head', () => {
  it('should give content back when it is of one line', () => {
    assert.strictEqual(head('hello'), 'hello');
    assert.strictEqual(head('hi'), 'hi');
  });
  it('should give content back when lines are less than default count', () => {
    assert.strictEqual(head('hello\nbye'), 'hello\nbye');
  });
  it('should give first two lines of content', () => {
    assert.strictEqual(head('a\nb\nc'), 'a\nb\n');
  });
});
