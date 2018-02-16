//Implementation of Krell patch (Todd Burton)

var krellOsc;
var krellFM;
var krellEnv;
var carrierFreq, modulatorFreq;
var analyzer;
var endNote = true;
var releaseTime;
var envTime;

var filt;

var reverb;

var c1;
var c2;
var colorLFO = new Array(6);
var colorLFOAmp = new Array(6);

function setup(){
    createCanvas(window.innerWidth, window.innerHeight);
    c1 = createVector(100,100,100);
    c2 = createVector(127,127,127);
    rectMode(CENTER);
    textAlign(CENTER);

    krellEnv = new p5.Env();
    attackTime = random(0.01,1);
    decayTime = random(1,3);
    sustainTime = random(0.1,5);
    releaseTime = random(1,4);
    envTime = attackTime + decayTime + sustainTime + releaseTime;

    krellOsc = new p5.Oscillator('sawtooth');
    krellOsc.amp(krellEnv);
    krellOsc.freq(random(200,400));
    krellOsc.start();
    krellOsc.disconnect();

    krellFM = new p5.Oscillator('sawtooth');
    krellFM.start();
    krellFM.disconnect();

    krellOsc.freq(krellFM.mult(500).add(100));
   
    filtMod = new p5.Oscillator('triangle');
    filtMod.disconnect();
    filtMod.start();
    filtMod.freq(0.1);
    filtMod.mult(100).add(400);

    filt = new p5.BandPass();
    filt.res(10);
    filt.process(krellOsc);
    filt.freq(filtMod);

    analyzer = new p5.FFT(1.,2048);
    //analyzer.smooth(1);

    envLevel = new p5.Amplitude();
    envLevel.setInput(krellEnv);

    filtModLevel = new p5.Amplitude();
    filtModLevel.setInput(filtMod);

    krellOsc.disconnect();
    reverb = new p5.Reverb();
    reverb.process(krellOsc,2,2);

    //use p5 sound oscillators to change the colors being interpolated
    for (var i = 0; i < colorLFO.length; i++){
        colorLFO[i] = new p5.Oscillator();
        colorLFOAmp[i] = new p5.Amplitude();
        colorLFO[i].freq(random(0.01,0.05));
        colorLFO[i].amp(random(0.5,1.));
        colorLFO[i].phase(random(0.,1.));
        colorLFO[i].disconnect();
        colorLFO[i].start();
        colorLFOAmp[i].setInput(colorLFO[i]);
    }
}

function draw(){
    fill(0,100);
    rect(width/2,height/2,width,height);

    //trigger new note when envelope is done.

    if(envLevel.getLevel() < 0.0001){
        newParam();
        startNote();
    }
    colorChange();
    waveDisplay();
    fill(255);
    noStroke();
    info();
}
function startNote(){
        krellFM.freq(random(50,200));
        filtMod.freq(random(0.001,0.1));
        krellOsc.freq(krellFM*random(50,200));
        krellEnv.setADSR(attackTime,decayTime,random(0.7,1.),releaseTime);
        krellEnv.play(krellOsc,0,sustainTime);
    }

function newParam(){
    attackTime = Math.random(0.01,1);
    decayTime = Math.random(1,3);
    sustainTime = Math.random(0.1,5);
    releaseTime = Math.random(1,4);
    //envTime = attackTime + decayTime + sustainTime + releaseTime;
    startNote();
}

function waveDisplay(){
    waveform = analyzer.waveform();

    var col1 = color(c1.x,c1.y,c1.z);
    var col2 = color(c2.x,c2.y,c2.z);
    for (var i = 0; i < waveform.length; i++){
        var x = map(i, 0, waveform.length, 0, width);
        var y = map(waveform[i], -1, 1, -height/2, height/2);

        var colorInterp = i*(1/waveform.length);
        fill(lerpColor(col1,col2,colorInterp));

        ellipse(x, y + height/2,10,10);
    }
}
function colorChange(){
    //change each component of the color vector with LFOs
    c1.x = abs(colorLFOAmp[0].getLevel())*255;
    c1.y = abs(colorLFOAmp[1].getLevel())*255;
    c1.z = abs(colorLFOAmp[2].getLevel())*255;
    c2.x = abs(colorLFOAmp[3].getLevel())*255;
    c2.y = abs(colorLFOAmp[4].getLevel())*255;
    c2.z = abs(colorLFOAmp[5].getLevel())*255;
}
function info(){
    textSize(24);
    text('Implementation of generative Krell patch (Todd Burton)',width/2,height*0.75,width,100);
    textSize(10);
    text('still need way to change time between events dynamically...end of cycle notifiers',width/2,height*0.8,width,100);
}

