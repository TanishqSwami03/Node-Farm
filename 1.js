const fs = require('fs');

// In fs.readFile() method, we can read a file in a non-blocking asynchronous way, but in fs.readFileSync() method, we can read files in a synchronous way, i.e. we are telling node.js to block other parallel process and do the current file reading process. That is, when the fs.readFileSync() method is called the original node program stops executing, and node waits for the fs.readFileSync() function to get executed, after getting the result of the method the remaining node program is executed.

// Blocking and Synchronous Way

const textInp = fs.readFileSync('txt/input.txt', 'utf-8');                  // (path, encoding)
console.log(textInp);

//const textOut = `This is how you write to a file : ${textInp}. \n Created on ${Date.now}`;
const textOut = `${textInp}. \nThis is how you write to a file. Enjoy !\nCreated on ${Date.now()}`;
fs.writeFileSync('txt/output.txt', textOut);
console.log("File Written");