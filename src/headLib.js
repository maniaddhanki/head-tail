const { validateArgs } = require('./validation.js');

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

const head = (content, { key, limit }) => {
  const countBases = { count: countByLines, byte: firstNCharacters };
  if (key === 'byte') {
    return countBases.byte(content, limit);
  }
  return countBases.count(content, limit);
};

const headMain = (readFunction, args) => {
  const { files, option } = parseArgs(args);
  validateArgs(files);
  let content;
  try {
    content = readFunction(files[0], 'utf8');
  } catch (error) {
    throw {
      message: `head: ${files[0]}: No such file or directory`
    };
  }
  return head(content, option);
};

exports.head = head;
exports.firstNLines = firstNLines;
exports.firstNCharacters = firstNCharacters;
exports.countByLines = countByLines;
exports.headMain = headMain;
