const { validate, validateArgs } = require('./validatorLib.js');

const defaultOption = function (args) {
  return { flag: '-n', limit: 10 };
};

const constructOption = function (arg) {
  const [flag, limit] = destructureOption(arg);
  return { flag, limit };
};

const destructureOption = arg => {
  let key = arg.slice(0, 2);
  let value = arg.slice(2);

  if (isFinite(arg.slice(1))) {
    key = '-n';
    value = arg.slice(1);
  }
  return [key, value];
};

const isKey = arg => arg?.startsWith('-');

const fetchOptions = function (args) {
  const options = [];
  let index = 0;
  while (isKey(args[index])) {
    const option = constructOption(args[index]);
    if (option.limit === '') {
      index++;
      option.limit = args[index];
    }
    option.limit = +option.limit
    options.push(option);
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
