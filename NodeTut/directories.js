//Tutorial #10 - creating and removing directories

var fs = require('fs');

//synchronous (blocking) for making directories using fs
//fs.mkdirSync('stuff');
//fs.rmdirSync('stuff');

//have to remove all items before deleting directory. Not sure about what's going on with callback functions etc.
fs.unlink('./stuff/writeMe.txt',function(){
    fs.rmdirSync('stuff');
});

// fs.mkdir('stuff', function(){
//     //read the file asynchronously
//     fs.readFile('readme.txt', 'utf8', function(err, data){
//         //this one remains synchronous because it does not call back. It's done.
//         fs.writeFileSync('./stuff/writeMe.txt', data);
//     });
// });
