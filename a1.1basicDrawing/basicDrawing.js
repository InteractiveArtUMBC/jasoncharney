var colors = new Array(100);
var pos = new Array(100);

function setup(){
  createCanvas(displayWidth,displayHeight);
  for (i = 0; i < colors.length; i++){
    colors[i] = createVector(map(i,0,colors.length,0,255),random(255),random(255));
    pos[i] = createVector(constrain(width/2+randomGaussian()*(width/4),0,width),constrain(height/2+randomGaussian()*(height/4),0,height),10);
  }
}

function draw(){
  background(0);
  stroke(255,100);
  strokeWeight(5);
  for (i = 0; i < colors.length; i++){
    var nextRand = int(random(0,colors.length));
    line(pos[i].x,pos[i].y,pos[nextRand].x,pos[nextRand].y);
  }
  noStroke();
  for (i = 0; i < colors.length; i++){
    fill(colors[i].x,colors[i].y,colors[i].z);
    ellipse(pos[i].x,pos[i].y,pos[i].z,pos[i].z);
    pos[i].x += randomGaussian();
    constrain(pos[i].x,0,width);
    pos[i].y += randomGaussian();
    constrain(pos[i].y,0,height);
    pos[i].z += ([i]/colors.length)*sin((frameCount+abs(randomGaussian()*[i])/16));
  }

}
