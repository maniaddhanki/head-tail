const { validate, validateArgs } = require('./validatorLib.js');

const defaultOption = function (args) {
  return { flag: '-n', countBy: 'line', value: 10 };
};

const constructOption = function (flag, value) {
  const keys = { '-n': 'line', '-c': 'byte' };
  const countBy = keys[flag];
  const limit = +value;
  return { flag, countBy, value: limit };
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

const isKey = arg => arg?.startsWith('-');

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
  if (options.length === 0) {
    options.push(defaultOption());
  }
  const files = args.slice(index);
  return { files, options };
};

const parseArgs = function (args) {
  validateArgs(args);
  const { files, options } = fetchOptions(args);
  const flag = options[0].flag;
  options.forEach(option => validate(option, flag));
  const option = options[options.length - 1];
  return { files, option };
};

exports.parseArgs = parseArgs;
exports.defaultOption = defaultOption;
exports.fetchOptions = fetchOptions;
exports.constructOption = constructOption;
exports.destructureOption = destructureOption;
