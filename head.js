const fs = require('fs');
const { headMain } = require('./src/headLib.js');

const main = () => console.log(headMain(fs.readFileSync, args));

const args = process.argv.slice(2);

console.log('usage: head [-n lines | -c bytes] [file ...]');
main();
