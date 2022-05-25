const assert = require('assert');
const { tail } = require('../src/tailLib');

describe('tail', () => {
  it('should give given content when it is less than default count', () => {
    assert.strictEqual(tail('1\n2\n3', '-n'), '1\n2\n3');
  });
  it('should given last ten lines of given content', () => {
    assert.strictEqual(tail('a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk\nl', '-n'), 'c\nd\ne\nf\ng\nh\ni\nj\nk\nl');
  });
  it('should give last bytes of given content', () => {
    assert.strictEqual(tail('abcdefghijkl', '-c'), 'cdefghijkl');
  });
});
