const tail = function (content, countBy, count = 10) {
  const data = countBy === '-c' ? content : content.split('\n');
  const tailed = data.slice(-count);
  return countBy === '-c' ? tailed : tailed.join('\n');
};

exports.tail = tail;
