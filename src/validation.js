const isKnownKey = function (option) {
  const knownKeys = ['-n', '-c'];
  return knownKeys.includes(option.arg);
};

const isPositive = limit => limit > 0;

const isCombined = (key, optionKey) => key !== optionKey;

const validate = function (option, flag) {
  const keys = { '-n': 'line', '-c': 'byte' };
  const usage = 'usage: head [-n lines | -c bytes] [file ...]';
  const value = option.limit;

  if (!isKnownKey(option)) {
    throw { message: `head: illegal option -- ${option.arg[1]}\n${usage}` };
  }
  if (!isPositive(value)) {
    const key = keys[option.arg];
    throw { message: `head: illegal ${key} count -- ${value}\n${usage}` };
  }
  if (isCombined(option.arg, flag)) {
    throw { message: 'head: can\'t combine line and byte counts\n' + usage };
  }
};

const areFilesGiven = function (files) {
  if (files.length <= 0) {
    throw { message: 'usage: head [-n lines | -c bytes] [file ...]' };
  }
};

exports.validate = validate;
exports.areFilesGiven = areFilesGiven;
