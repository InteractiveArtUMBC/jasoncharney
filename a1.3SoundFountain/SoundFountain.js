var mic;
var threshold = 0.01;
var f;

function setup(){
  createCanvas(window.innerWidth,window.innerHeight);
  background(0);
  pour = false;
  mic = new p5.AudioIn();
  mic.start();
  f =
  {
      name: "fountain-test",
      shape: "ellipse2",
      colors: ["red","orange","yellow","green","blue","purple"],
      rate: [100,100],
      lifetime: 500,
      angle: [0,45],
      size: [10,0],
      speed: 1,
      dxy: [0.1, 0.1],
      gravity: 0.05,
      x: 0.5,
      y: 0.,
      sizePercent: 0.99,
      speedx: 0.5
    }
    fount = new Fountain(null, f);
}

function draw(){

  micLevel = mic.getLevel();
  var partSize = map(micLevel,0.,1.,0.,50.);

  background(0);


  if (micLevel > threshold) {
    f.size = [partSize,0];
    fount.Create(mouseX,mouseY,micLevel);

  }
    fount.Step();
    fount.Draw();


  }
