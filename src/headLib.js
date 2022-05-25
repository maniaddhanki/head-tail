const firstNLines = (lines, count) => lines.slice(0, count);

const firstNCharacters = (content, count) => content.slice(0, count);

const splitLines = content => content.split('\n');

const joinLines = lines => lines.join('\n');

const countByLines = (content, count) => {
  const lines = splitLines(content);
  const firstLines = firstNLines(lines, count);
  return joinLines(firstLines);
};

const head = (content, { countBy, value }) => {
  const countBases = { line: countByLines, byte: firstNCharacters };
  return countBases[countBy](content, value);
};

exports.head = head;
exports.firstNLines = firstNLines;
exports.firstNCharacters = firstNCharacters;
exports.countByLines = countByLines;
