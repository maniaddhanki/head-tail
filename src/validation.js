const usage = 'usage: head [-n lines | -c bytes] [file ...]';

const illegalflagError = (flag) => {
  return { message: `head: illegal option -- ${flag.slice(1)}\n${usage}` };
};

const illegalcountError = (option) => {
  const keys = { '-n': 'line', '-c': 'byte' };
  const key = keys[option.arg];
  const value = option.limit;
  return { message: `head: illegal ${key} count -- ${value}\n${usage}` };
};

const combinationError = () => {
  return { message: 'head: can\'t combine line and byte counts\n' + usage };
};

const isKnownflag = function (option) {
  const knownflags = ['-n', '-c'];
  return knownflags.includes(option.arg);
};

const isPositive = limit => limit > 0;

const isCombined = (key, optionKey) => key !== optionKey;

const validate = function (option, flag) {
  if (!isKnownflag(option)) {
    throw illegalflagError(option.arg);
  }
  if (!isPositive(option.limit)) {
    throw illegalcountError(option);
  }
  if (isCombined(option.arg, flag)) {
    throw combinationError();
  }
};

const validateArgs = function (args) {
  if (args.length <= 0) {
    throw { message: 'usage: head [-n lines | -c bytes] [file ...]' };
  }
};

exports.validate = validate;
exports.validateArgs = validateArgs;
