var waveOne = 120.;
var waveTwo = 69.;
var pointCount = 5000;
var angle = 5.;
var amplitude;

function setup(){
  createCanvas(displayWidth,displayHeight);
  background(0);
  stroke(255);
  strokeWeight(4);
  noFill();
  amplitude = displayHeight/4;
}

function draw(){
waveOne = map(mouseX,0,width,1,200);
waveTwo = map(mouseY,0,height,1,200);
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
