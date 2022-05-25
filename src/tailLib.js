const lastNLines = (lines, count) => lines.slice(-count);

const lastNCharacters = (content, count) => content.slice(-count);

const splitLines = content => content.split('\n');

const joinLines = lines => lines.join('\n');

const tail = function (content, countBy, count) {
  if (countBy === '-c') {
    return lastNCharacters(content, count);
  }
  const lineCount = count || 10;
  const lines = splitLines(content);
  const tailed = lastNLines(lines, lineCount);
  return joinLines(tailed);
};

exports.tail = tail;
