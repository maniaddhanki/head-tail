const defaultOption = function (args) {
  const files = args;
  const option = { count: 10 };
  return { files, option };
};

const parseWithOption = function (args) {
  const keys = { '-n': 'count', '-c': 'bytes' };
  const option = {};
  const key = args.find(item => (/^-.$/).test(item));
  const keyIndex = args.lastIndexOf(key);
  const value = args[keyIndex + 1];
  const files = args.slice(keyIndex + 2);
  option[keys[key]] = +value;
  return { files, option };
};

const parseArgs = function (args) {
  return (/^-/).test(...args) ? parseWithOption(args) : defaultOption(args);
};

exports.parseArgs = parseArgs;
exports.parseWithOption = parseWithOption;
exports.defaultOption = defaultOption;
