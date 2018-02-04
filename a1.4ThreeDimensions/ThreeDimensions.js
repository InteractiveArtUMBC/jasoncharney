var planeNum = 500;
var planes = new Array(planeNum);
var planeColor = new Array(planeNum);
var planeRot = new Array(planeNum);
var planeTrans = new Array(planeNum);
var planeAdd = new Array(planeNum);
var planeDir = new Array(planeNum);
var planeLim = new Array(planeLim);
// var distInc = 0.0005;
var boundingBox;
var c1;
var c2;
var e = new p5.Ease();
var orbitWidth;
var shake = false;
var shakeNum = 20;

function setup(){
  c1 = color(random(255),random(255),random(255));
  c2 = color(random(255),random(255),random(255));
  createCanvas(window.innerWidth,window.innerHeight,WEBGL);
  bounds= createVector(500,500,50);//maximum distance before start moving in opposite direction
  for (i = 0; i < planes.length; i++){
    //planes[i] = createVector(int(abs(randomGaussian()*20)),int(abs(randomGaussian()*20)));
    planes[i] = int(abs(randomGaussian()*10));
    planeColor[i] = lerpColor(c1,c2,i/planes.length);
    planeRot[i] = createVector(random(-PI,PI),random(-QUARTER_PI,QUARTER_PI),random(20,100));
    planeAdd[i] = createVector(0.01*random(100),0.01*random(100));
    planeDir[i] = random(5)*0.0005+0.0005;
    planeLim[i] = createVector(random(0.1,1.),random(0.1,1.));
  }
  noStroke();
}

function draw(){

  orbitWidth = sin(radians(frameCount*0.25))*1000+100;

  ambientLight(100,100,100);
  pointLight(255,255,255,orbitWidth,0,0);
  // ambientMaterial(250);
  background(0);
  noStroke();
  //rotateY(radians(frameCount/100));
  //translate(0,0,radians(frameCount/100)*-100)

  for (i = 0; i < planes.length; i++){
    if (planeAdd[i].x > 1. || planeAdd[i].x < 0.){
      planeDir[i] = -planeDir[i];
      }

    planeAdd[i].x += planeDir[i];

    if (planeAdd[i].y > 1. || planeAdd[i].y < 0.){
    planeDir[i] = -planeDir[i];
    }

    planeAdd[i].y += planeDir[i];

    ambientMaterial(planeColor[i]);

    rotateY(radians(frameCount/planeRot[i].z)*planeRot[i].x);
    rotateZ(radians(frameCount/planeRot[i].z)*planeRot[i].y);

    push();
    if (shake = true && shakeNum < 20){
    translate(random(10),random(10),0);
    }
    var transX = e.dampedSinusoidReverse(planeAdd[i].x)
    var transY = e.dampedSinusoidReverse(planeAdd[i].y)
    translate(map(transX,0.,1.,0.,planeLim[i].x*bounds.x),map(transY,0.,1.,0.,planeLim[i].y*bounds.y),orbitWidth);
    sphere(planes[i]);
    pop();
  }
  shakeNum ++;

}

function mousePressed(){
shake = true;
shakeNum = 0;
}
