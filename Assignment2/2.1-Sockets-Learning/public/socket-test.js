//TEST OF SYNCED CLIENTS! Sync up to 3 clients to play a polyrhythm.
//This script automatically assigns roles based on order of connection (executing corresponding function in draw()).
//First-connected acts as master clock using its frame count.

var socket;
var myId = new String;
var myRole;
var sync;
var tempoSlider;
var loopPos;
var maxCount = 1000;

function setup(){
  frameRate(60);
  createCanvas(window.innerWidth, window.innerHeight);

  socket = io.connect('http://localhost:3000'); // this is named in the server file for new connections.
  
  //store assigned id string
  socket.on('hey', function(id){
    myId = id;
   });
  
   //assign a role
  socket.on('role', function(role){
    myRole = role;
  });

  //get sync from the first-connected instance 
  socket.on('sync', function(frame){
    sync = frame;
  });

  //initialize audio functions
  osc = new p5.Oscillator();
  env = new p5.Env();
  env.setADSR(0.01,0.1,0.2,0.5);
  osc.freq(200*int(random(1,6)));
  osc.start();
  osc.amp(env);

  noStroke();
}

function draw(){
  background(255);
  if (myRole == 0){
    syncer();
    textAlign(CENTER);
    textSize(height*0.1);
  }
  if (myRole == 1){
    role1(100);
  }
  if (myRole == 2){
    role2(66.66666666);
  }
  if (myRole == 3){
    role3(33.33333333);
  }
  if (myRole > 3){
    role3(16.666666*int(random(1,6)));
  }
}

//role 0 sets the master frame (eventually scene) for each connected device.

function syncer(){
  var syncFrame = frameCount % maxCount;
  loopPos = syncFrame/maxCount;
  socket.emit('mastersync',syncFrame);
  fill(255,0,0);
  rect(0,0,loopPos*width,height);
}

function role1(modulo){
if (sync % modulo < 1){
  env.triggerAttack();
  env.triggerRelease();
  }
if (sync % modulo < 10){
  rectMode(CENTER);
  fill(255,0,0);
  rect(width/2,height/2,width,height);
}
}

function role2(modulo){
  if (sync % modulo < 1){
    env.triggerAttack();
    env.triggerRelease();
  }
  if (sync % modulo < 10){
    rectMode(CENTER);
    fill(0);
    rect(width/2,height/2,width,height);

  }
}

function role3(modulo){
  if (sync % modulo < 1){

    env.triggerAttack();
    env.triggerRelease();
  }
  if (sync % modulo < 10){
    rectMode(CENTER);
    fill(0,255,0);
    rect(width/2,height/2,width,height);
  }
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}
