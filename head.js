const fs = require('fs');
const { headMain } = require('./src/headMain.js');

const main = (args) => {
  headMain(fs.readFileSync, console.log, console.error, args);
};

const args = process.argv.slice(2);

main(args);
