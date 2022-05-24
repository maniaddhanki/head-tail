const { head } = require('./headLib');
const { parseArgs } = require('./parseArgs.js');
const { validateArgs } = require('./validation.js');

const noFormat = () => '';

const arrowFormat = file => `\n==> ${file} <==\n`;

const print = function (logger, error, result, formatter) {
  let displayer = logger;
  let format = formatter(result.file);
  if (result.isError) {
    displayer = error;
    format = '';
  }
  displayer(format + result.output);
};

const headFile = function (readFunction, file, option) {
  let content;
  try {
    content = readFunction(file, 'utf8');
    const output = head(content, option);
    const isError = false;
    return { file, output, isError };
  } catch (error) {
    const output = `head: ${file}: No such file or directory`;
    const isError = true;
    return { file, output, isError };
  }
};

const headMain = (readFunction, logger, error, args) => {
  const { files, option } = parseArgs(args);
  validateArgs(files);
  const formatter = files.length === 0 ? noFormat : arrowFormat;
  const headedFiles = files.map(file => headFile(readFunction, file, option));
  headedFiles.forEach(result => print(logger, error, result, formatter));
};

exports.headFile = headFile;
exports.noFormat = noFormat;
exports.arrowFormat = arrowFormat;
exports.print = print;
exports.headMain = headMain;
