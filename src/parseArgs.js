const { validate, validateArgs } = require('./validation.js');

const defaultOption = function (args) {
  const files = args;
  const option = { arg: '-n', key: 'count', limit: 10 };
  return { files, option };
};

const constructOption = function (arg, value) {
  const keys = { '-n': 'count', '-c': 'byte' };
  const key = keys[arg];
  const limit = +value;
  return { arg, key, limit };
};

const destructureOption = arg => {
  let key = arg.slice(0, 2);
  let value = arg.slice(2);

  if (isFinite(arg.slice(1))) {
    key = '-n';
    value = arg.slice(1);
  }
  return constructOption(key, value);
};

const isSoloKey = arg => arg.length === 2 && !isFinite(arg.slice(1));

const isKey = arg => (/^-/).test(arg);

const fetchOptions = function (args) {
  const options = [];
  let index = 0;
  while (isKey(args[index])) {
    if (isSoloKey(args[index])) {
      options.push(constructOption(args[index], args[index + 1]));
      index++;
    } else {
      options.push(destructureOption(args[index]));
    }
    index++;
  }
  const files = args.slice(index);
  return { files, options };
};

const parseWithOption = function (args) {
  const { files, options } = fetchOptions(args);
  const flag = options[0].arg;
  options.forEach(option => validate(option, flag));
  const option = options[options.length - 1];
  return { files, option };
};

const parseArgs = function (args) {
  validateArgs(args);
  return args[0].startsWith('-') ? parseWithOption(args) : defaultOption(args);
};

exports.parseArgs = parseArgs;
exports.parseWithOption = parseWithOption;
exports.defaultOption = defaultOption;
exports.fetchOptions = fetchOptions;
exports.constructOption = constructOption;
exports.destructureOption = destructureOption;
