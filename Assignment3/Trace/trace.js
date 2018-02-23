//Trace a circle that gets a little noisier on each lap
//click to reset

var numPoints = 250;
var radius;
var interpFrames = 0.01;
var moveCounter = 0;
var nextPoint = 0;

function setup(){
createCanvas(window.innerWidth,window.innerHeight);
radius = width/4;
points = new Array(numPoints);

for (i = 0; i < points.length; i++){
    var stepSize = map(i,0,points.length,0,TWO_PI);
    var x = width/2 + radius * cos(stepSize);
    var y = width/2 + radius * sin(stepSize);
    points[i] = createVector(x,y);
}
    noStroke();
    fill(255,255,0);
}
function draw(){
    fill(0,10);
    rect(0,0,width,height);
    fill(255,255,0);
    if (nextPoint + 1 == points.length){
        nextPoint = 0;
        for (i = 0; i < points.length; i++){
            points[i].x += randomGaussian()*2;
            points[i].y += randomGaussian()*2;
        }
    }
    var lerpX = lerp(points[nextPoint].x,points[(nextPoint+1)].x,moveCounter/interpFrames);
    var lerpY = lerp(points[nextPoint].y,points[(nextPoint+1)].y,moveCounter/interpFrames);
    ellipse(lerpX,lerpY,10,10);
    moveCounter++
    if (moveCounter > interpFrames){
        moveCounter = 0;
        nextPoint++;
    }
}
function mousePressed(){
for (i = 0; i < points.length; i++){
    var stepSize = map(i,0,points.length,0,TWO_PI);
    var x = width/2 + radius * cos(stepSize);
    var y = width/2 + radius * sin(stepSize);
    points[i] = createVector(x,y);
}
}
function windowResized(){
resizeCanvas(window.innerWidth,window.innerHeight);
}