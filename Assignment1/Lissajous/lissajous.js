var waveOne = 120.;
var waveTwo = 69.;
var pointCount = 5000;
var angle = 5.;
var amplitude;
var c1, c2, c;
var colorInterp = 0.;
var colorInterpInterval = 0.01;
var thickness = 9;//number from 0-9

function setup(){
  createCanvas(window.innerWidth,window.innerHeight);
  background(0);
  noFill();
  c1 = color(random(255),random(255),random(255));
  c2 = color(random(255),random(255),random(255));
}

function draw(){

  amplitude = height/4;

  waveOne = map(mouseX,0,width,1,200);
  waveTwo = map(mouseY,0,height,1,200);

  //interpolate color
  strokeChange();
  background(0);
  translate(width/2,height/2);
  rotate(frameCount*0.001);
  for (i = 0; i < pointCount; i++){
  beginShape();
    for (i = 0; i < pointCount; i++){
      angle = i/(waveOne*QUARTER_PI);
      var x = cos(angle)*amplitude;
      angle = i/(waveTwo*QUARTER_PI);
      var y = cos(angle)*amplitude;
    curveVertex(x,y);
    }
  }
  endShape();
}

//choose new colors when incrementer gets to extremes of interpolation
function strokeChange(){

  if (colorInterp > 0.999){
    c1 = color(random(255),random(255),random(255));
    colorInterpInterval = -colorInterpInterval;
  }

  if (colorInterp < 0.001){
    c2 = color(random(255),random(255),random(255));
    colorInterpInterval = -colorInterpInterval;
  }

  colorInterp += colorInterpInterval;
  c = lerpColor(c1,c2,colorInterp);

  strokeWeight(map(thickness,0,9,0,height*0.005));

  stroke(c);

}

function windowResized(){
  resizeCanvas(innerWidth,innerHeight);
}
