const defaultOption = function (args) {
  const files = args;
  const option = { count: 10 };
  return { files, option };
};

const parseWithOption = function (args) {
  const keys = { '-n': 'count', '-c': 'byte' };
  const option = {};
  const key = keys[args[0]];
  option[key] = +args[1];
  const files = args.slice(2);
  return { files, option };
};

const parseArgs = function (args) {
  return (/^-/).test(...args) ? parseWithOption(args) : defaultOption(args);
};

exports.parseArgs = parseArgs;
exports.parseWithOption = parseWithOption;
exports.defaultOption = defaultOption;
