var sound;
var fft;
var circles = [];

function preload() {
  sound = loadSound('sounds/低血ボルト.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(220);
  angleMode(DEGREES);
  textFont('sans-serif');
  textAlign(CENTER, CENTER);
  fft = new p5.FFT(0.8, 32);
  sound.amp(0.2);
  noStroke();
}

function draw() {
  if (mouseIsPressed) {
    circles.push(new Circle(mouseX, mouseY));
    if (circles.length > 100) {
      circles.splice(01, 1);
    }
  }
  for (var i = 0; i < circles.length; i++) {
    circles[i].move();
    circles[i].draw();

    for (var j = 0; j < circles.length; j++) {
      var position1 = circles[i].position;
      var position2 = circles[j].position;

      var distance = dist(position1.x, position1.y,
        position2.x, position2.y);

      if (distance < 50) {
        stroke(255, 0, 0);
        line(position1.x, position1.y, position2.x, position2.y);
      }
    }
  }
}

function mouseClicked() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}

class Circle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.size = random(3, 10);
  }

  move() {
    this.position.add(this.velocity);
  }

  draw() {
    fill(255, 0, 0);
    ellipse(this.position.x, this.position.y, this.size);
  }
}