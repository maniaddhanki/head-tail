const lastNLines = (lines, count) => lines.slice(-count);

const lastNCharacters = (content, count) => content.slice(-count);

const splitLines = content => content.split('\n');

const joinLines = lines => lines.join('\n');

const countByLines = function (content, count) {
  const lineCount = count || 10;
  const lines = splitLines(content);
  const tailed = lastNLines(lines, lineCount);
  return joinLines(tailed);
};

const tail = function (content, countBy, count) {
  const countBases = { line: countByLines, byte: lastNCharacters };
  return countBases[countBy](content, count);
};

exports.tail = tail;
exports.lastNLines = lastNLines;
exports.lastNCharacters = lastNCharacters;
exports.countByLines = countByLines;
