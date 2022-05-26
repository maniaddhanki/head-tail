const { head } = require('./headLib.js');
const { parseArgs } = require('./parseArgs.js');
const { validateArgs } = require('./validatorLib.js');

const noFormat = () => '';

const arrowFormat = file => `\n==> ${file} <==\n`;

const print = function (log, consoleError, result, formatter) {
  let displayer = log;
  let format = formatter(result.file);
  if (result.isError) {
    displayer = consoleError;
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

const headMain = (readFunction, log, consoleError, args) => {
  let parsedArgs;
  try {
    parsedArgs = parseArgs(args);
    validateArgs(parsedArgs.files);
  } catch (error) {
    consoleError(error.message);
    return;
  }
  const { files, option } = parsedArgs;
  const formatter = files.length === 1 ? noFormat : arrowFormat;
  const headedFiles = files.map(file => headFile(readFunction, file, option));
  headedFiles.forEach(result => print(log, consoleError, result, formatter));
};

exports.headFile = headFile;
exports.noFormat = noFormat;
exports.arrowFormat = arrowFormat;
exports.print = print;
exports.headMain = headMain;
