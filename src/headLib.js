const firstNLines = (lines, count) => lines.slice(0, count);

const firstNCharacters = (content, count) => content.slice(0, count);

const splitLines = content => content.split('\n');

const joinLines = lines => lines.join('\n');

const countByLines = (content, count) => {
  const lines = splitLines(content);
  const firstLines = firstNLines(lines, count);
  return joinLines(firstLines);
};

const head = (content, { count, bytes }) => {
  const countBases = { count: countByLines, bytes: firstNCharacters };
  const callee = bytes ? countBases.bytes : countBases.count;
  const parameter = bytes || count || 10;
  return callee(content, parameter);
};

const headMain = (readFunction, fileName, options) => {
  const content = readFunction(fileName, 'utf8');
  return head(content, options);
};

exports.head = head;
exports.firstNLines = firstNLines;
exports.firstNCharacters = firstNCharacters;
exports.countByLines = countByLines;
exports.headMain = headMain;
