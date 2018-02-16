var m1 = [1,1,1,0,1,1,0,1,0,1,1,0];
var m2 = [1,1,0,1,1,0,1,0,1,1,0,1];
var m3 = [1,0,1,1,0,1,0,1,1,0,1,1];
var m4 = [0,1,1,0,1,0,1,1,0,1,1,1];
var m5 = [1,1,0,1,0,1,1,0,1,1,1,0];
var m6 = [1,0,1,0,1,1,0,1,1,1,0,1];
var m7 = [0,1,0,1,1,0,1,1,1,0,1,1];
var m8 = [1,0,1,1,0,1,1,1,0,1,1,0];
var m9 = [0,1,1,0,1,1,1,0,1,1,0,1];
var m10 = [1,1,0,1,1,1,0,1,1,0,1,0];
var m11 = [1,0,1,1,1,0,1,1,0,1,0,1];
var m12 = [0,1,1,1,0,1,1,0,1,0,1,1];

var steady, shifter;
var phrases = [m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11,m12];
var currentPhrase;
var step;

var clapImg;
function preload(){
    clapImg = loadImage('assets/clap.png');
}

function setup(){
    frameRate(8);
    createCanvas(window.innerWidth,window.innerHeight);

    steady = new Clap(-1);
    shifter = new Clap(1);

    step = 0;

    currentPhrase = 0;
}

function draw(){
    background(255);
    speed();
    steady.go(m1[step]);
    steady.recter(m1[step],0,0);
    shifter.go(phrases[currentPhrase][step]);
    steady.recter(phrases[currentPhrase][step],width/2,0);
    step++;

    if (step == 12){
        step = 0;
    }
    textAlign(CENTER);
    textSize(16);
    text('Clapping Music. Click to shift pattern. MouseX controls tempo.',width/2,100,300,100);
}

function Clap(pan){
    this.pan = pan;
    this.clapper = new p5.Noise('pink');
    this.env = new p5.Env();
    this.clapper.start();
    this.clapper.amp(this.env);
    this.env.mult(2);
    this.clapper.pan(this.pan);
    this.env.setADSR(0.0001,0.01,1.,0.001);
    
    this.go = function(value){
        if (value > 0){
        this.env.play();
        }
    }
    this.recter = function(value,topx,topy){
        if (value > 0){
            fill(0);
            image(clapImg,topx,topy,width/2,height);
        }
    }
}

function clapz(time, playbackRate){
    myClap.rate(playbackRate);
    myClap.play(time);
}

function mousePressed(){
    currentPhrase++;
    if (currentPhrase == 12){
        currentPhrase = 0;
    }
}

function speed(){
    frameRate(map(mouseX,0,width,1,12));
}