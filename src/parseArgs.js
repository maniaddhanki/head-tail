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

const integrateOption = arg => {
  let key = arg.slice(0, 2);
  let value = arg.slice(2);
  if (isFinite(arg.slice(1))) {
    key = '-n';
    value = arg.slice(1);
  }
  return constructOption(key, value);
};

const isSoloKey = arg => arg.length === 2 && !isFinite(arg.slice(1));

const isKey = arg => arg.startsWith('-');

const fetchOptions = function (args) {
  const options = [];
  let index = 0;
  while (isKey(args[index])) {
    if (isSoloKey(args[index])) {
      options.push(constructOption(args[index], args[index + 1]));
      index++;
    } else {
      options.push(integrateOption(args[index]));
    }
    index++;
  }
  const files = args.slice(index);
  return { files, options };
};

const isUnKnownKey = function (option) {
  const knownKeys = ['-n', '-c'];
  return !knownKeys.includes(option.arg);
};

const isNotPositive = option => !option.limit > 0;

const isCombined = (key, optionKey) => key !== optionKey;

const validate = function (options) {
  if (options.some(isUnKnownKey)) {
    throw { usage: 'usage: head [-n lines | -c bytes] [file ...]' };
  }
  if (options.some(isNotPositive)) {
    throw { usage: 'usage: head [-n lines | -c bytes] [file ...]' };
  }
  const key = options[0].arg;
  if (options.some(option => isCombined(key, option.arg))) {
    throw { usage: 'usage: head [-n lines | -c bytes] [file ...]' };
  }
};

const areFilesGiven = function (files) {
  if (files.length <= 0) {
    throw { usage: 'usage: head [-n lines | -c bytes] [file ...]' };
  }
};

const parseWithOption = function (args) {
  const { files, options } = fetchOptions(args);
  validate(options);
  areFilesGiven(files);
  const option = options[options.length - 1];
  return { files, option };
};

const parseArgs = function (args) {
  return args[0].startsWith('-') ? parseWithOption(args) : defaultOption(args);
};

exports.parseArgs = parseArgs;
exports.parseWithOption = parseWithOption;
exports.defaultOption = defaultOption;
exports.fetchOptions = fetchOptions;
exports.constructOption = constructOption;
exports.integrateOption = integrateOption;
exports.validate = validate;
exports.areFilesGiven = areFilesGiven;
