var grid = new Grid(16, 10);
var dancers = new Array(1);
var isSetup = false;

var retina = 2;
var sc = 90 / retina;

function setup() {
  createCanvas(1920/2, 1080/2);
  noCursor();
  frameRate(30);
}

function draw() {
  background(0);

  push();
  translate(width * 0.5, height * 0.5);
  scale(sc, sc);

  grid.draw();

  if (!isSetup) {
    if (millis() < 0){//5000*2) {
    } else {
      // Ani.init(this);

      for (let i = 0; i < dancers.length; i++)
        dancers[i] = new Dancer();

      isSetup = true;
    }
  }

  if (isSetup) {
    for (let d of dancers) {
      d.draw();
    }
  }

  pop();

  if (key == ' ') {
    saveFrame("######.png");
  }
}

function keyPressed() {
}