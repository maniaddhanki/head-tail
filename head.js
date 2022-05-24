const fs = require('fs');
const { headMain } = require('./src/headMain.js');

const main = () => {
  try {
    headMain(fs.readFileSync, console.log, console.error, args);
  } catch (error) {
    console.error(error.message);
  }
};

const args = process.argv.slice(2);

main();
