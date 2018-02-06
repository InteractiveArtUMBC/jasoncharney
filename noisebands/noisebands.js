var numBands = 20;

var bands = new Array(numBands);
var noiseGens = new Array(numBands);
var fundamental = 50;
var filterFreq = new Array(numBands);
var filterLevel = new Array(numBands);
var rampAmt = 0.005;
var initLevel = 0.75;
var delayers = new Array(numBands);
var env = new Array(numBands);
var envAmplitude = new Array(numBands);
var reverb;

function setup(){
createCanvas(window.innerWidth,window.innerHeight);
background(0);
rectMode(CORNERS);

reverb = new p5.Reverb();

  for (i = 0; i < noiseGens.length; i++){
    noiseGens[i] = new p5.Noise();
    env[i] = new p5.Env();
    env[i].setADSR(random(),random(),1.,random());
    envAmplitude[i] = new p5.Amplitude();
    envAmplitude[i].setInput = noiseGens[i];
    //delayers[i] = new p5.Delay();
    //reverb.process(noiseGens[i],10,1);
    noiseGens[i].amp(env[i]);
    noiseGens[i].pan(map(i,0,noiseGens.length,-1.,1.));
    noiseGens[i].start();
    noiseGens[i].disconnect();
    bands[i] = new p5.BandPass();
    bands[i].process(noiseGens[i]);
    //delayers[i].process(noiseGens[i],0.2,0.01,0);
    bands[i].set(fundamental*(i+1),200)
    filterLevel[i] = initLevel;
    bands[i].gain(filterLevel[i]);
  }

}

function draw(){
  background(0);


  for (i = 0; i < noiseGens.length; i++){
    var attackRelease = int((frameCount / random(4,8)) % i);
    var upDown = random(-1,1);
    filterLevel[i] += rampAmt * upDown;
    constrain(filterLevel[i],0.,1.)
    bands[i].gain(filterLevel[i]);

    if (attackRelease == 0){
        env[i].triggerAttack();
      }

    if (attackRelease == 1){
        env[i].triggerRelease();
    }

  }
  displayBars();
}

function displayBars(){
  stroke(0);
  strokeWeight(1);
  var barWidth = width/numBands;
  for (i = 0; i < numBands; i++){
    fill(500*envAmplitude[i].getLevel()+100,255);
    rect(barWidth*i,height,barWidth*(i+1),height*filterLevel[i]);
  }
}
