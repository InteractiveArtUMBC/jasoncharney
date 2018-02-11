//number of stars and planets
var easycam;

var numPlanets = 10;
var numStars = 100;

var planetLoc = new Array(numPlanets);

//the maximum radius of the orbit – camera starts at edge of last planet
var orbitMag;
var orbitSpeed = new Array(numPlanets);
var planetSize = new Array(numPlanets);
var planetColor = new Array(numPlanets);
var planetDistance = new Array(numPlanets);//distance from sun
var minPlanetSize = 10;
var maxPlanetSize = 50;

var osc = new Array(numPlanets);
var panner = new Array(numPlanets);

var orbitTilt = new Array(numPlanets);

var sunColor;
var sunSize = 200;
var sunTexture;
var sunVid;

var reverb;
var bg;

var starLoc = new Array(numStars);
var starDelay;
var starEnv;
var starOsc;

//camera movement later
var cameraLoc;


function preload(){
  sunTexture = loadImage('assets/sun.jpg');
  //sunVid = createVideo('assets/sun-texture.mp4');
  //sunVid.hide();
  //sunVid.loop();
}

function setup(){
  createCanvas(window.innerWidth,window.innerHeight,WEBGL);

  easycam = createEasyCam();

  var fundamental = random(50,100);
  cameraLoc = createVector(0,0,0);
  reverb = new p5.Reverb();
  reverb.set(10,10);
  starOsc = new p5.Oscillator();
  starOsc.freq(fundamental*20);
  starEnv = new p5.Env();
  starDelay = new p5.Delay();
  starEnv.setADSR(0.01,0.1,0.2,0.01);
  starOsc.disconnect();
  starOsc.connect(starDelay);
  starDelay.feedback(0.4);
  starDelay.delayTime(0.35);
  starDelay.setType('pingPong');
  starOsc.start();
  starOsc.amp(starEnv);
  orbitMag = 800;
  sunColor = color(255,255,0);
  ambientLight(20,20,20);


  for (i = 0; i < numPlanets; i++){
    var startPoint = radians(random(orbitMag));
    planetLoc[i] = createVector(startPoint,random(0,PI),startPoint);
    osc[i] = new p5.Oscillator();
    panner[i] = new p5.Panner3D('HRTF','linear');
    panner[i].maxDist(orbitMag*4.);
    osc[i].setType('sine');
    osc[i].connect(panner[i]);
    osc[i].connect(reverb);
    osc[i].freq((i+1)*fundamental+random(-5,5));
    osc[i].amp(1.);
    osc[i].start();
    planetSize[i] = random(minPlanetSize,maxPlanetSize);
    orbitSpeed[i] = random(0.01,1.);

    //planets are at least the max size + sun size away from sun, each other, with a little bit of noise.
    planetDistance[i] = abs(randomGaussian())*orbitMag+(i*(orbitMag/numPlanets))+(maxPlanetSize+sunSize);
    orbitTilt[i] = random(-TWO_PI,TWO_PI);
    planetColor[i] = color(random(255),random(255),random(255));
  }

  for (i = 0; i < numStars; i++){
    starLoc[i] = createVector(random(-(orbitMag*2),orbitMag*2),random(-(orbitMag*2),orbitMag*2),random(-(orbitMag*4),orbitMag*4));
    //starLoc[i].limit(width/2);
  }
  //console.log(starLoc[0]);

planetSize.sort();
planetDistance.sort();
}

function draw() {
  background(0);
  normalMaterial();
  star();
  sun();
  planets();

}

function sun(){
  directionalLight(sunColor,0,sunSize,-orbitMag);
  pointLight(sunColor,0,-sunSize,-orbitMag);
  pointLight(sunColor,0,sunSize,-orbitMag);
  pointLight(sunColor,0,0,-orbitMag);
  push();
  translate(0,0,-orbitMag);
  texture(sunTexture);
  sphere(sunSize);
  pop();
}

function planets(){
  specularMaterial(255,255,0);
  for (i = 0; i < numPlanets; i++){
    planetLoc[i].x = cos(radians(orbitSpeed[i]*frameCount))*planetDistance[i];
    planetLoc[i].y = 0; //figure out orbital tilt eventually...
    planetLoc[i].z = sin(radians(orbitSpeed[i]*frameCount))*planetDistance[i];
      push();
        translate(planetLoc[i].x,planetLoc[i].y,planetLoc[i].z-orbitMag);
        specularMaterial(planetColor[i]);
        sphere(planetSize[i]);
      pop();
    osc[i].amp(map(planetSize[i],minPlanetSize,maxPlanetSize,0.,1./numPlanets));
    panner[i].set(planetLoc[i].x,planetLoc[i].y,planetLoc[i].z);
    panner[i].orient(0,0,-orbitMag);

  //var distancePan = dist(0,0,0,planetLoc[i].x,planetLoc[i].y,planetLoc[i].z);
  //distancePan = map(distancePan,0,orbitMag*2,0.,1.);
  //osc[i].amp(distancePan);
  }
}

function star(){
  for (i = 0; i < numStars; i++){
    push();
    translate(starLoc[i].x,starLoc[i].y,starLoc[i].z);
    pointLight(100,100,100,starLoc[i]);
    specularMaterial(255,255,255);
    //pointLight(sunColor,10,300,-200);
    //translate(0,-orbitMag*2,-orbitMag*4);
    sphere(3);
    pop();
  }
}

function keyPressed(){
  starEnv.play();
}

//eventually figure out how to move camera around, facing sun as if it were positioned on a planet
function moveView(){
  cameraLoc.y = sin(radians(0.1*frameCount))*orbitMag+orbitMag;
  cameraLoc.x = sin(0.5*radians(0.1*frameCount))*orbitMag+orbitMag;
  //cameraLoc.z = sin(radians(frameCount/2)) + (height/2.0) / tan(PI*30.0/180.0);
  cameraLoc.z = sin(0.5*radians(0.5*frameCount))*orbitMag+orbitMag;// + (height/2.0) / tan(PI*30.0/180.0);
  //push();
  translate(cameraLoc.x,cameraLoc.y,cameraLoc.z);
  camera(cameraLoc.x,cameraLoc.y,cameraLoc.z,0,0,-orbitMag,0,1,0);
  //pop();
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  //easycam.setViewport([0,0,windowWidth, windowHeight]);
}
