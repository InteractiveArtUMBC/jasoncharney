var bubNum = 500;
var bubbles = new Array(bubNum);
var bubColor = new Array(bubNum);
var bubRot = new Array(bubNum);
var bubTrans = new Array(bubNum);
var bubAdd = new Array(bubNum);
var bubDir = new Array(bubNum);
var bubLim = new Array(bubLim);
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
  for (i = 0; i < bubNum; i++){
    
    bubbles[i] = int(abs(randomGaussian()*10));
    bubColor[i] = lerpColor(c1,c2,i/bubNum);
    bubRot[i] = createVector(random(-PI,PI),random(-QUARTER_PI,QUARTER_PI),random(20,100));
    bubAdd[i] = createVector(0.01*random(100),0.01*random(100));
    bubDir[i] = random(5)*0.0005+0.0005;
    bubLim[i] = createVector(random(0.1,1.),random(0.1,1.));
  }
  noStroke();
}

function draw(){

  orbitWidth = sin(radians(frameCount*0.25))*1000+100;

  ambientLight(100,100,100);
  pointLight(255,255,255,0,0,0);
  background(0);
  noStroke();
  bubMove();

  }

function bubMove(){

  //if the bubble exceeds the boundaries in X or Y, change direction sign.
  //every distance is normalized from 0. - 1. so they can be eased using p5.ease

  for (i = 0; i < bubNum; i++){
      if (bubAdd[i].x > 1. || bubAdd[i].x < 0.){
        bubDir[i] = -bubDir[i];
        }

    bubAdd[i].x += bubDir[i];

      if (bubAdd[i].y > 1. || bubAdd[i].y < 0.){
      bubDir[i] = -bubDir[i];
      }

    bubAdd[i].y += bubDir[i];

    specularMaterial(bubColor[i]);

  //make the rotation of the whole window...
      rotateY(radians(frameCount/bubRot[i].z)*bubRot[i].x);
      rotateZ(radians(frameCount/bubRot[i].z)*bubRot[i].y);

  //translate within own matrix
    push();
      //(shake if mouse is pressed)
      if (shake = true && shakeNum < 20){
        translate(random(10),random(10),0);
      }

  //use easing function to translate

      var transX = e.dampedSinusoidReverse(bubAdd[i].x)
      var transY = e.dampedSinusoidReverse(bubAdd[i].y)

      translate(map(transX,0.,1.,0.,bubLim[i].x*bounds.x),map(transY,0.,1.,0.,bubLim[i].y*bounds.y),orbitWidth);

      sphere(bubbles[i]);

    pop();
  }
    shakeNum ++;
}

function windowResized(){
  resizeCanvas(innerWidth,innerHeight);
}

function mousePressed(){
  shake = true;
  shakeNum = 0;
}
