//Moiré
//learning how to use constructor functions in JS

var lineArray = new Array(3);

function setup(){
  createCanvas(window.innerWidth,window.innerHeight);
  noStroke();
  fill(0);
  for (i = 0; i < lineArray.length; i++){
    lineArray[i] = new One(0,0,width,height,random(1,3),random(1,2),(100)*(i/lineArray.length+1));
  }
}

function draw() {
  background(255);

translate(width/2,height/2);
  for (i = 0; i < lineArray.length; i++){
    push();
    scale(1.2,1.2);
    rotate(radians(i*2));
    translate(-width/2,-height/2);
    lineArray[i].display();
    pop();
  }
  
}

function One(horizPos,vertPos,horizSize,vertSize,minWidth,stripeAdd,stripeFill){
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
  this.display = function(){
    fill(0,this.stripeFill);
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
}

function windowResized(){
  resizeCanvas(window.innerWidth, window.innerHeight);
}