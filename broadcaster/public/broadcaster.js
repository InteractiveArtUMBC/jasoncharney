var socket;

function setup(){
  createCanvas(window.innerWidth,window.innerHeight);
  background(0);
  socket = io.connect('http://localhost:3000');
}
  socket.on('mouse'
    function(data){
      fill(0,0,255);
      noStroke();
      ellipse(data.x,data.y,20,20);
    }
  };
function draw(){
  }
