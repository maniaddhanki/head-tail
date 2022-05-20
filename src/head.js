const firstNLines = (lines, count) => lines.slice(0, count);

const firstNCharacters = (content, count) => content.slice(0, count);

const splitLines = content => content.split('\n');

const joinLines = lines => lines.join('\n');

const countByLines = (content, count) => {
  const lineCount = count || 10;
  const lines = splitLines(content);
  const firstLines = firstNLines(lines, lineCount);
  return joinLines(firstLines);
};

const head = (content, countBy, count) => {
  const countBases = { line: countByLines, byte: firstNCharacters };
  const callee = countBy ? countBases[countBy] : countBases.line;
  return callee(content, count);
};

exports.head = head;
exports.firstNLines = firstNLines;
exports.firstNCharacters = firstNCharacters;
