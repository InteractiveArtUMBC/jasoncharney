//"Dumb Kandinsky"
//refresh page for new Composition
//press 's' to save the image

var cols = new Array(5);
var bgcols = new Array(5);

function setup(){
    createCanvas(1000,600);
    cols = [createVector(0,60,115),createVector(48,216,0),createVector(239,224,3),createVector(89,1,1),createVector(194,10,8)];
    bgcols = [createVector(0,89,171),createVector(25,115,0),createVector(130,122,2),createVector(166,2,2),createVector(214,190,114)];

    //noLoop();
    makeBG();
    filter(BLUR,8);
    makeArcs();
    makeLines(20);
    makeCircles(4);
}

function draw(){
}

function makeBG(){
    //Perlin noise colored background

    var bgColor = bgcols[int(random(bgcols.length))];
    noStroke();
    fill(bgColor.x+100,bgColor.y+100,bgColor.z+100);

    bgColor.x = bgColor.x + (random(1,2) * 40) * negOrPos();
    bgColor.y = bgColor.y + (random(1,2) * 40) * negOrPos();
    bgColor.z = bgColor.z + (random(1,2) * 40) * negOrPos();

    for (var x = 0; x < width; x+=2) {
		for (var y = 0; y < height; y+=2) {
			var c = 100 * noise(0.01 * x, 0.01 * y);
            fill(bgColor.x,bgColor.y,bgColor.z,c);
			rect(x, y, 10, 10);
        }
    }
}

function makeCircles(numCircles){
    for (i = 0; i < numCircles; i++){
        //choose two different fill colors for nested circles
        var circFills = int(random(cols.length-1));
        var outerCircFill = cols[circFills];
        var innerCircFill = cols[circFills+1];

        //choose circle size and position
        var circleSize = random(0.03*width,0.15*width);
        var circlePos = createVector((randomGaussian()*width/4)+width/2,(randomGaussian()*height/4)+height/2);

        //draw outer circle
        stroke(innerCircFill.x,innerCircFill.y,innerCircFill.z);
        fill(outerCircFill.x,outerCircFill.y,outerCircFill.z);
        ellipse(circlePos.x,circlePos.y,circleSize,circleSize);

        //draw inner circle
        var circleInner1 = circleSize*random(0.4,0.9);
        noStroke();
        fill(innerCircFill.x, innerCircFill.y, innerCircFill.z);
        ellipse(circlePos.x,circlePos.y,circleInner1,circleInner1);
    }
}

function makeLines(numLines){

    //make some random lines
    stroke(0);
    for (i = 0; i < numLines; i++){
        strokeWeight(abs(randomGaussian()*3)+0.5);
        var linePos = createVector(random(width),random(height));
        line(linePos.x,linePos.y,linePos.x+random(10, width*0.3)*negOrPos(),linePos.y+random(10, width*0.3)*negOrPos());
    }

}

function makeArcs(){
    var numArcs = int(random(15))+4;
    var arcStart = createVector(random(width/2),random(height));
    var arcLength = random(100)+50;
    var arcColor =  cols[int(random(cols.length))];
    for (i = 0; i < numArcs; i++){
        fill(arcColor.x,arcColor.y,arcColor.z,map(i,0,numArcs,0,220));
        stroke(arcColor.x,arcColor.y,arcColor.z);
        strokeWeight(noise(0.01*i)*2);
        arc(arcStart.x+(i*arcLength), arcStart.y, arcLength, arcLength,PI,TWO_PI,);
    }
}

function negOrPos(){
    //Choose -1 or +1
    var dir = [-1,1];
    return dir[round(random())];
}

function keyTyped(){
    if (key === 's'){
        saveCanvas();
    }
}