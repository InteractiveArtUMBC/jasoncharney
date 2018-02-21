//new sweep according to mouse position
//click to reset/choose a new easing function

var sweepStatus = 0;
var sweepDir = 1;
var sweepRate = 0.01;
var sweepEase;
var pos;
var sizer = 101;
var styles;
var curstyle;
var startPoint;
var growthRate = 1.06;
var minSizer = 100;
var colors;

function setup(){
    createCanvas(window.innerWidth,window.innerHeight);
    background(255,255,230);
    colors = [createVector(50,77,92),createVector(70,178,157),createVector(240,202,77),createVector(227,123,64),createVector(245,56,85)];
    stroke(colors[1].x,colors[1].y,colors[1].z);
    sweepEase = new p5.Ease();
    styles = sweepEase.listAlgos();
    curstyle = pickrand(styles);

    pos = createVector(width/2,height/2);
    ellipseMode(CENTER);
    noFill();
    strokeCap(ROUND);
    //start at random point around the circle
    startPoint = random(TWO_PI);
    smooth(16);
}
function draw(){
    sweep();
}

function windowResized(){
resizeCanvas(window.innerWidth,window.innerHeight);
}

function sweep(){
    sweepStatus += sweepDir*sweepRate;
    sweepStatus = sweepStatus % 1;
    //sweepRate = map(cos(radians(frameCount)),0,TWO_PI,0.01,0.06);
    if (sweepStatus > 0.999 || sweepStatus < 0.0001){
        var newColorChoice = int(random(0,colors.length));
        var newColor = color(colors[newColorChoice].x,colors[newColorChoice].y,colors[newColorChoice].z,10);

        pos.x = mouseX;
        pos.y = mouseY;

        if (sizer > height/2 || sizer < minSizer){
        growthRate = -growthRate;
        }
        //grow and shrink the size exponentially, but add a little variation
        sizer *= pow(2,growthRate);
        sizer += random(-sizer*0.1,sizer*0.1);

        stroke(colors[newColorChoice].x,colors[newColorChoice].y,colors[newColorChoice].z,255);
        strokeWeight(map(sizer,minSizer,height,1.,3.));
        startPoint+=QUARTER_PI/2;
        fill(newColor);
    }

    push();
    translate(pos.x,pos.y);
    rotate(startPoint);
    arc(0,0,sizer,sizer,0,sweepEase[curstyle](sweepStatus)*(TWO_PI-0.001),PIE);
    pop();
}

function mousePressed(){
background(255,255,230);
curstyle = pickrand(styles);
}
