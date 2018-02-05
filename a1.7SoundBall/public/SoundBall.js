//number of balls + number of sounds
var numBalls = 20;
var numSounds = 7;

var sounds = new Array(numSounds);
var ballProperties = new Array(numBalls);
var balls = new Array(numBalls);
var speed = new Array(numBalls);
var ballColor = new Array(numBalls);

var maxSpeed = 5;
var minSpeed = 1;
var minDiameter = 5;
var maxDiameter = 50;
var ballLoc = new Array(10);
var reverb;

var c1;
var c2;
var mousePos;
var nextSound;
var player = false;


  function preload(){
  soundFormats('wav','mp3');
  for (i = 0; i < sounds.length; i++)
  {
    sounds[i] = loadSound('assets/'+i+'.wav');
  }
}

function setup(){
  createCanvas(window.innerWidth,window.innerHeight);

  //create reverb and process sounds through it
  reverb = new p5.Reverb();
  for (i=0; i < sounds.length;i++){
    reverb.process(sounds[i], 5, 1);
  }

  //create two colors to interpolate for the background regions
  var _c1 = createVector(random(255),random(255),random(255));
  c1 = color(_c1.x,_c1.y,_c1.z);
  c2 = color(abs(255-_c1.x),abs(255-_c1.y),abs(255-_c1.z));

  //populate an array with random values between 0 and 1.
  //These will be used to control behavior of the bouncing balls.

  for (i=0;i < balls.length;i++){
}
  //create initial locations and speed. Smaller balls move faster.
  for (i=0;i < balls.length;i++){
  ballProperties[i] = random();
  ballColor[i] = color(255,0);
  ballLoc[i] = createVector(random(width),random(height));
  speed[i] =  createVector(random(minSpeed,(1-ballProperties[i])*maxSpeed),random(minSpeed,(1-ballProperties[i])*maxSpeed));
  }
}

function draw(){
  soundRegions();
  ballBounce();
}

function soundRegions(){
  noStroke();
  var regionWidth = width/sounds.length;
  var interColor;
    for (i = 0; i < sounds.length; i++){
      interColor = lerpColor(c1,c2,i/sounds.length);
      fill(interColor);
      rect(regionWidth*i,0,regionWidth,height);
    }
  }

function ballBounce(){
  stroke(0);
  noFill();
  for (i = 0; i < balls.length; i++){



    var prop = ballProperties[i];
    var dia = map(prop,0.,1.,minDiameter,maxDiameter);
    strokeWeight(map(prop,0,1,0.5,3));
    var nextSound = int(map(ballLoc[i].x,0,width-dia,0,sounds.length-1));
    var nextPan = map(ballLoc[i].x,0,width,-1.,1.);
    var nextAmp = map(prop,0.,1.,0.5,1.);



    if (ballLoc[i].x >= width || ballLoc[i].x <= 0){
      speed[i].x = -speed[i].x;
      sounds[nextSound].pan(nextPan);
      sounds[nextSound].setVolume(nextAmp);
      sounds[nextSound].play();
      ballColor[i] = color(255,255);
    }
    else{
      ballColor[i] = color(255,0);
    }
    if (ballLoc[i].y >= height || ballLoc[i].y <= 0){
      speed[i].y = -speed[i].y;
      sounds[nextSound].pan(nextPan);
      sounds[nextSound].setVolume(nextAmp);
      sounds[nextSound].play();
      ballColor[i] = color(255,255);
    }
    else{
      ballColor[i] = color(255,0);
    }

    ballLoc[i].x += speed[i].x;
    ballLoc[i].y += speed[i].y;

    fill(ballColor[i]);
    ellipse(ballLoc[i].x,ballLoc[i].y,dia,dia);

  }
}
