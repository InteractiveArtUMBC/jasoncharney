//Stripes
//learning how to use constructor functions in JS
//now with sound!


var lineArray = new Array(19);
var colors = ['#FF0000','#FFC000','#E0FF00','#7EFF00','#21FF00','#00FF41','#00FF9F','#00FDFF','#009FFF','#003DFF','#2100FF','#8300FF','#E500FF','#0052FF','#FF007C','#1000FF','#FFFFFF'];
function setup(){
  createCanvas(window.innerWidth,window.innerHeight);
  noStroke();
  fill(0);
  for (i = 0; i < lineArray.length; i++){
    lineArray[i] = new Liner(0,i*(height/lineArray.length),width,height/lineArray.length,random(1,3),random(1,10),color(colors[int(random(0,colors.length-1))]));
  }
}

function draw() {
  background(0);

  for (i = 0; i < lineArray.length; i++){
    lineArray[i].display();
    lineArray[i].sounder(map(i,0,lineArray.length,-1,1),20*i,100*i);
  }
  
}

function Liner(horizPos,vertPos,horizSize,vertSize,minWidth,stripeAdd,stripeFill){
  this.stripeFill = stripeFill;
  this.horizPos = horizPos;
  this.vertPos = vertPos;
  this.horizSize = horizSize;
  this.vertSize = vertSize;
  this.stripeDir = 1;
  this.stripeAdd = stripeAdd;
  this.minWidth = minWidth;
  this.numStripes = 1;
  this.maxStripes = int(horizSize/minWidth);
  this.stripeWidth;
  this.lineOsc = new p5.Oscillator();
  this.lineEnv = new p5.Env();
  this.lineEnvLFO = new p5.Oscillator();
  this.lineOsc.setType('sawtooth');
  this.lineOsc.start();
  this.lineEnvLFO.setType('square');
  this.lineEnvLFO.start();
  this.display = function(){
    fill(this.stripeFill);
    if (this.stripeWidth <= this.minWidth || this.stripeWidth > this.horizSize){
      this.stripeDir = -this.stripeDir;
      }

    this.numStripes += this.stripeAdd * this.stripeDir;
    this.stripeWidth = this.horizSize/this.numStripes;
    for (var i = 0; i < this.numStripes+1; i++){
      if (i % 2 == 0){
        rect(this.stripeWidth*i,this.vertPos,this.stripeWidth,this.vertSize);
        }
      }
  }
  this.sounder = function(pan,freqRangelow,freqRangehi){
    this.lineOsc.freq(map(this.numStripes,1,this.maxStripes,freqRangelow,freqRangehi));
    this.lineEnvLFO.freq(map(this.stripeWidth,this.minWidth,this.horizSize,10,1));
    this.lineOsc.pan(pan);
    this.lineOsc.amp(this.lineEnvLFO);
  }
}

function windowResized(){
  resizeCanvas(window.innerWidth, window.innerHeight);
}

function mousePressed(){
  for (i = 0; i < lineArray.length; i++){
    lineArray[i].stripeAdd = map(randomGaussian(),-1.,1,1,10);
  }
}