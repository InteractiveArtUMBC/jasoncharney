var socket;
var stream;
var capture;
function setup(){
    createCanvas(window.innerWidth, window.innerHeight);
    socket = io.connect();
    stream = ss.createStream();
    capture = createCapture(VIDEO);
}

function draw(){
    image(capture, 0, 0, width, width * capture.height / capture.width);
    socket.emit('webcam',stream, function(){
        createReadStream(capture).pipe(stream);
    });
    //background(255);
}