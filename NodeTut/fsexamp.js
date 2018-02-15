//Tutorial #9 - Reading and Writing Files
//https://www.youtube.com/watch?v=U57kU311-nE
var fs = require('fs');

//synchronous - BLOCKING code. Must complete Sync() before moving on.

// // readMe will read the file using utf8 encoding and store it in readMe.
// var readMe = fs.readFileSync('readMe.txt', 'utf8');
// //blocking code that will write the contents of readMe to "writeMe.txt"
// fs.writeFileSync('writeMe.txt', readMe);

//asynchronous
// // not blocked! Others after can still fire while the file is being read
// // err just means the error tag on the beginning if it exists
fs.readFile('readMe.txt','utf8', function(err,data){
    //and write asynchrnously
    fs.writeFile('writeMe.txt', data);
});

//this way many many requests can happen simultaneously instead of synchronous bottlenecks
