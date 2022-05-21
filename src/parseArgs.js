const parseArgs = function (args) {
  const keys = { '-n': 'count', '-c': 'byte' };
  const options = {};
  let file = args[0];
  if (args[0].includes('-')) {
    const option = keys[args[0]];
    options[option] = +args[1];
    file = args[2];
  }
  return { file, options };
};

exports.parseArgs = parseArgs;
