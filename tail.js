const fs = require('fs');
const { tail } = require('./src/tailLib.js');

const main = function (args) {
  let contents;
  try {
    contents = fs.readFileSync(args[2], 'utf-8');
    console.log(tail(contents, args[0], +args[1]));
  } catch (error) {
    console.error(`tail: ${args[2]}: no such file or directory`);
  }
};

const args = process.argv.slice(2);
main(args);
