//REALLY DUMB granular synthesis
//click to make grains
//no windowing function (hope u like clicks and pops)

var sound;
var wave;
var grainMin = 0.01;
var grainMax = 0.5;
var pause = false;

function preload(){
    sound = loadSound('assets/cherokee.mp3');
}

function setup(){
    createCanvas(window.innerWidth,window.innerHeight);
    sound.playMode('restart');
    sound.loop();
    sound.play();
    wave = new p5.FFT();
    duration = sound.duration();
}

function draw(){
    background(0);
    var elapsed = sound.currentTime()/sound.duration();
    var mouseJump = (mouseX/width);
    var grainLength = (map(mouseY,0,height,grainMin,grainMax));
    var drawForm = wave.waveform();
    stroke(255);
    strokeWeight(2);
    beginShape(LINES);
    for(i = 0; i < drawForm.length;i++){
        var x = map(i,0,drawForm.length,0,width);
        var y = map(drawForm[i],-1,1,0,height);
        vertex(x,y);
    }
    endShape();
    fill(255);
    rect(elapsed*width,height*0.75,10,100);
    if (mouseIsPressed){
        sound.jump(random(duration-grainLength),grainLength);
        rect(elapsed*width,height*0.75,10,100);
        }

}

function windowResized(){
resizeCanvas(window.innerWidth,window.innerHeight);
}

function mouseReleased(){
    sound.stop();
    sound.loop(0);
    sound.loop(1);
    sound.play(1);
}