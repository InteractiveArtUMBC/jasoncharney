var oceanSound;
var osc;
var playing = false;

var attack = 0.1;
var decay = 0.1;
var sustain = 0.5;
var release = 2;
var freqlist = new Array(20);

var envStatus = env.getLevel();

function setup(){
  createCanvas(window.innerWidth,window.innerHeight);
  background(66,188,244);
  soundFormats('wav','mp3');
  oceanSound = loadSound("assets/ocean.wav", loaded);

  osc = new p5.Oscillator();
  env = new p5.Env();

  env.setADSR(attack,decay,sustain,release);

  for (i = 0; i < freqlist.length; i++){
    freqlist[i] = 20. * (i + 1) + 80;
  }

  osc.setType('sine');
  osc.amp(env);
  osc.start();
  osc.freq(20);



}
function draw(){
  // if (playing = true){
  //   fill(255,0,0);
  //   ellipse(random(width),random(height),100,100);
  // }
}

function loaded(){
  oceanSound.loop();
}

function mouseClicked(){
  if (!playing){
    env.play();
    playing = true;
  }
  else {
    playing = false;
    var nextFreq = int(random(freqlist.length));
    osc.freq(freqlist[nextFreq]);
  }
}
