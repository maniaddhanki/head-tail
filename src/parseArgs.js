const defaultOption = function (args) {
  const files = args;
  const option = { count: 10 };
  return { files, option };
};

const fetchOptions = args => {
  const options = [];
  for (let index = 0; index < args.length; index++) {
    if (args[index].startsWith('-')) {
      options.push(args[index]);
    }
    if ((/^-[n c]$/).test(args[index])) {
      options.push(args[index + 1]);
      index++;
    }
  }
  return options;
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

const findSelection = option => option.includes('c') ? 'bytes' : 'count';

const isKey = arg => arg.startsWith('-');

const parseWithOption = function (args) {
  const option = {};
  const options = fetchOptions(args);
  const index = options.length - 1;
  const key = isKey(options[index]) ? options[index] : options[index - 1];
  const selection = findSelection(key);
  option[selection] = findValue(key, options[index]);
  const files = args.slice(index + 1);
  return { files, option };
};

const parseArgs = function (args) {
  return (/^-/).test(...args) ? parseWithOption(args) : defaultOption(args);
};

exports.parseArgs = parseArgs;
exports.parseWithOption = parseWithOption;
exports.defaultOption = defaultOption;
exports.fetchOptions = fetchOptions;
exports.findValue = findValue;
exports.isIntegratedOption = isIntegratedOption;
exports.findSelection = findSelection;
