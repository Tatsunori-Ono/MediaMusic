var circles = [];
var sound;
var fft;
var spectrum;
var amp;
var waveform;
let letters = '怖がることはもういーかい惑わされてくなら頭でっ価値 ずっとうんと砕いてもっと乱してあげて脳みそ達止められない 操れない僕に期待したいんだ切り刻まれこの皮膚に従うほど無敵になれた'.split('');

function preload() {
  sound = loadSound('sounds/低血ボルト.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(230);
  angleMode(DEGREES);
  textFont('sans-serif');
  textAlign(CENTER, CENTER);
  fft = new p5.FFT(0.8, 32);
  sound.amp(0.2);
  noStroke();
}

function draw() {
  /*
  rotateX(60);

  waveform = fft.waveform();

  var angle = 360 / waveform.length;

  for (var i = 0; i < waveform.length; i++) {
    rotateZ(angle);
    push();
    translate(150, 0, 0);
    var size = waveform[i] * 500;
    if (size > 50) {
      fill(250, 0, 200);
    }
    else {
      fill(0, 220, 220);
    }
    box(5, 5, 5 + size);
    pop();
  }
  */

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

/*
  spectrum = fft.analyze();
  var rectWidth = width / spectrum.length;

  fill(0, 200, 255);

  for (var i = 0; i < spectrum.length; i++) {
    var rectHeight = spectrum[i] * 1.5;
    rect(i * rectWidth, height, rectWidth - 2, -rectHeight);
  }

  let waveform = fft.waveform();

  beginShape();
  noFill();
  stroke(255);
  for (i = 0; i < waveform.length; i++) {
    var x = map(i, 0, waveform.length, 0, width);
    var y = map(waveform[i], -1, 1, height, 0);
    vertex(x, y);
  }
  endShape();

  fill(0);
  noStroke();
  for (i = 0; i < letters.length; i++) {
    var j = Math.round(map(i, 0, letters.length, 0, waveform.length));
    var x = map(j, 0, waveform.length, 0, width);
    var y = map(waveform[j] * 3, -1, 1, height, 0);
    fill(color(random(100, 255), random(100, 255), random(100, 255)));
    textSize(Math.abs(waveform[j]) * 300 + 5);
    text(letters[i], x, y);
  }
  */

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

function mouseClicked() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}

function keyTyped() {
  if (keyCode >= 32) {
    letters += key;
  }
}