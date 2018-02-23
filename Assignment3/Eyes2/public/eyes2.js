//EYES-2

var eyeVid;
var eyeArray;
var eyeWidth;
var numRows;
var eyesInEachRow = 10;
var rowPos = 0;
var numEyes = 50;

function setup(){
    createCanvas(window.innerWidth,window.innerHeight);

    eyeWidth = width/eyesInEachRow;

    numRows = ceil(height/eyeWidth);
    eyeArray = new Array(numRows*eyesInEachRow);   
    for (i = 0; i < eyeArray.length; i++){
        eyeArray[i] = createVideo(['assets/eyeball.mp4']);
        eyeArray[i].loop();
       eyeArray[i].size(width/eyesInEachRow,height/eyesInEachRow);
        eyeArray[i].speed((random(100,1000)/1000));
        eyeArray[i].hide();
        }
    }

function draw(){
    drawEyes();
}
function windowResized(){
    resizeCanvas(window.innerWidth,window.innerHeight);
    numRows = ceil(height/eyeWidth);
    eyeWidth = width/eyesInEachRow;

}

function drawEyes(){
    for (i = 1; i < numRows; i++){
        for (i = 0; i < eyesInEachRow; i++){
            image(eyeArray[i],eyeWidth*i,(height/numRows)*rowPos);
         } 
        }
        if (rowPos < numRows){
        rowPos++;
        }
        else {
            rowPos = 0;
        }
}