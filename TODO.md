# Tail

- **TODO :**
  - [ ] implement `tail file`
  - [ ] parse -n option from command line

- **MAYBE :**
  - [ ] Extract countLines function from tail

- **DONE :**
  - [x] make testTail.js and tail.js
  - [x] write a main for tail


# Head

- **TODO :**
  - [ ] add detail to validation error messages
  - [ ] deal with other error messages that are thrown while reading
  - [ ] extract a readFile function
  - [ ] refactor fetchOptions
- **MAYBE :**
  - [ ] instead of passing key of fuction pass reference to head
  - [ ] consider an edge case of traling newlines

- **DONE :**
  - [x] make `src` and `test` directories
  - [x] make `testHead.js`
  - [x] write a test case for head
  - [x] make head work on provided content instead of file
  - [x] make head work for 1 line content
  - [x] make head work for content less than default count
  - [x] make default count 2 
  - [x] make `head.js` src directory
  - [x] make head work for variable line count
  - [x] consider extracting spliting and joining of lines to functions
  - [x] refactor head
  - [x] set default count to 10
  - [x] test firstNLines
  - [x] implement first bytes -c
  - [x] refactor head
    - [x] think for a better way of choosing option
  - [x] test countByLines function
  - [x] consider extracting count and byte to new functions
  - [x] consider a richer structure of handling data
  - [x] set default count in head instead of countByLines
  - [x] make a headMain function
  - [x] rename `src/head.js` to `src/headLib.js`
  - [x] implementation and testing of parseArgs are in half way
  - [x] make parseArgs accept multiple files
  - [x] refactor parseArgs
  - [x] test parseWithOption and defaultOption
  - [x] make parseArgs over write options
  - [x] introduced parsing in headMain
  - [x] make head work for options with and without space;
  - [x] implement parseArgs function
  - [x] read commandline arguments in head.js
  - [x] make testValidate.js
  - [x] validate options
  - [x] give appropriate error message
  - [x] give error in error strem
  - [x] make head to work for multiple files
  - [x] make headMain.js and testHeadMain.js
  - [x] get rid of `countBy` key in option object
