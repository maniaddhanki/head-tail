const { parseArgs } = require('./parseArgs.js');

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
  if (isFinite(bytes)) {
    return countBases.bytes(content, bytes);
  }
  return countBases.count(content, count);
};

const headMain = (readFunction, args) => {
  const { files, option } = parseArgs(args);
  const content = readFunction(files[0], 'utf8');
  return head(content, option);
};

exports.head = head;
exports.firstNLines = firstNLines;
exports.firstNCharacters = firstNCharacters;
exports.countByLines = countByLines;
exports.headMain = headMain;
