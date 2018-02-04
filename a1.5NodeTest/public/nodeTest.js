var socket;
var newCircle = random(400);

function setup(){
  createCanvas(window.innerWidth,window.innerHeight);
  socket = io.connect('http://localhost:3000');
  socket.on('mouse',newDrawing);
}

function newDrawing(data){
  noStroke();
  fill(255,0,100);
  ellipse(data.x,data.y,36,36);
}

function draw(){

}



function mouseDragged()
{

  var data = {
    x: mouseX,
    y: mouseY
  }

    noStroke();
    fill(0);
    ellipse(data.x,data.y,36,36);

  socket.emit('mouse', data);

  console.log('Sending: ' + mouseX + ',' + mouseY);
}
