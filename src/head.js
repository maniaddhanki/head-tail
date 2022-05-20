const firstNLines = (lines, count) => lines.slice(0, count);

const firstNCharacters = (content, count) => content.slice(0, count);

const splitLines = content => content.split('\n');

const joinLines = lines => lines.join('\n');

const head = (content, countBy, count) => {
  if (countBy === 'byte') {
    return firstNCharacters(content, count);
  }
  const lineCount = count || 10;
  const lines = splitLines(content);
  const firstLines = firstNLines(lines, lineCount);
  return joinLines(firstLines);
};

exports.head = head;
exports.firstNLines = firstNLines;
exports.firstNCharacters = firstNCharacters;
