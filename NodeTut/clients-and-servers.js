//Tutorial 12 - Creating a Server
//https://www.youtube.com/watch?v=lm86czWdrk0

//import the http module
var http = require('http');

//create a server with a function that has "req" (request) and "res" (response) as callbacks
var server = http.createServer(function(req, res){
    //req.url will take the specific url from the request to help direct server response.
    //Otherwise, it'll serve the same thing regardless of url added to the end of the server address.
    console.log('request was made: ' + req.url);
    //make a header for response: tell client to expect plain text
    res.writeHead(200,{'Content-Type': 'text/plain'});
    //close the response with the data: plain text string
    res.end('Hello world');
});

//listen to port 3000 on localhost
server.listen(3000, '127.0.0.1');
console.log('Now listening to port 3000');

//if you look in the developer in the console of the browser, you can see the 200 code in the header.

