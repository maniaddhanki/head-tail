const defaultOption = function (args) {
  const files = args;
  const option = { count: 10 };
  return { files, option };
};

const fetchOptions = args => {
  return args.filter(arg => (/^-..*$/).test(arg));
};

const isIntegratedOption = option => {
  return (option.includes('n') || option.includes('c')) && option.length === 3;
};

const findValue = function (option, nextElement) {
  if (isIntegratedOption(option)) {
    return +option[2];
  }
  if (isFinite(option)) {
    return +option[1];
  }
  return +nextElement;
};

const fetchFiles = (args, option, optionIndex) => {
  let fileIndex = optionIndex + 2;
  if (isIntegratedOption(option) || isFinite(option)) {
    fileIndex = optionIndex + 1;
  }
  return args.slice(fileIndex);
};

const findSelection = option => option.includes('c') ? 'bytes' : 'count';

const parseWithOption = function (args) {
  const option = {};
  const options = fetchOptions(args);
  const key = options[options.length - 1];
  const keyIndex = args.lastIndexOf(key);
  const selection = findSelection(key);
  option[selection] = findValue(key, args[keyIndex + 1]);
  const files = fetchFiles(args, key, keyIndex);
  return { files, option };
};

const parseArgs = function (args) {
  return (/^-/).test(...args) ? parseWithOption(args) : defaultOption(args);
};

exports.parseArgs = parseArgs;
exports.parseWithOption = parseWithOption;
exports.defaultOption = defaultOption;
exports.fetchOptions = fetchOptions;
exports.fetchFiles = fetchFiles;
exports.findValue = findValue;
exports.isIntegratedOption = isIntegratedOption;
exports.findSelection = findSelection;
