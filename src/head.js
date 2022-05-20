const head = (content, count) => {
  const lineCount = count || 2;
  const lines = content.split('\n');
  const firstLines = lines.slice(0, lineCount);
  return firstLines.join('\n');
};

exports.head = head;
