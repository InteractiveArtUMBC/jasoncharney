//EYES-1

var eyeVid;
var eyeArray;
var eyesInEachRow = 5;
var playPhase = 0;
var numEyes = 50;
function preload(){
}

function setup(){
    createCanvas(window.innerWidth,window.innerHeight);
    //background(0);

//I want this for loop to make a grid of eyeballs, but it doesn't load past the first row.
//Something to do with asynchronous loading in for loops? (see eyeGrid() function)
//eyeGrid();

//Instead for now, put a bunch of random eyes all over the canvas.
    eyeArray = new Array(numEyes);
    for (i = 0; i < eyeArray.length; i++){
        eyeArray[i] = createVideo(['assets/eyeball.mp4']);
        if (i == 0){
            eyeArray[i].style('align','center');
            eyeArray[i].size(width,height);
            eyeArray[i].position(0,0);
            eyeArray[i].attribute('center');
            eyeArray[i].loop();
            eyeArray[i].speed(random(0.2,2.));
        }
        else{
        eyeArray[i].style('rotate',random(-45,45));
        eyeSize = random(50,500);
        eyeArray[i].size(eyeSize,eyeSize);
        eyeArray[i].position((width/4)+random(-eyeSize,eyeSize),(height/4)+random(-eyeSize,eyeSize));
        //eyeArray[i].translate((width/2)+random(-eyeSize,eyeSize),(height/2)+random(-eyeSize,eyeSize));
        eyeArray[i].loop();
        eyeArray[i].speed(random(0.2,2.));
        }
    }
}
function draw(){
}
function windowResized(){
resizeCanvas(window.innerWidth,window.innerHeight);
}

function eyeGrid(){
    var eyeWidth = width/eyesInEachRow;
    var numRows = ceil(height/eyeWidth);
    eyeArray = new Array(numRows*eyesInEachRow);
    console.log(eyeArray.length);

    var rowPos = 0;
   for (i = 1; i < numRows; i++){
    for (i = 0; i < eyesInEachRow; i++){
        eyeArray[i] = createVideo(['assets/eyeball.mp4']);
        eyeArray[i].size(width/eyesInEachRow,height/eyesInEachRow);
        //eyeArray[i].size(random(width),random(height));
        eyeArray[i].position(eyeWidth*i,(height/numRows)*rowPos);
        eyeArray[i].loop();
        eyeArray[i].speed(random(0.2,2.));
    }
    rowPos++;
}
}