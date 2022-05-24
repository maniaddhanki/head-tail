const firstNLines = (lines, count) => lines.slice(0, count);

const firstNCharacters = (content, count) => content.slice(0, count);

const splitLines = content => content.split('\n');

const joinLines = lines => lines.join('\n');

const countByLines = (content, count) => {
  const lines = splitLines(content);
  const firstLines = firstNLines(lines, count);
  return joinLines(firstLines);
};

const head = (content, { key, limit }) => {
  const countBases = { count: countByLines, byte: firstNCharacters };
  if (key === 'byte') {
    return countBases.byte(content, limit);
  }
  return countBases.count(content, limit);
};

exports.head = head;
exports.firstNLines = firstNLines;
exports.firstNCharacters = firstNCharacters;
exports.countByLines = countByLines;
