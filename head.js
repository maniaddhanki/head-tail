const fs = require('fs');
const { headMain } = require('./src/headLib.js');

const main = () => {
  try {
    console.log(headMain(fs.readFileSync, args));
  } catch (error) {
    console.log(error.message);
  }
};

const args = process.argv.slice(2);

main();
