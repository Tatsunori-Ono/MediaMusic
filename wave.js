let sound, fft;
let letters = '吾輩わがはいは猫である。名前はまだ無い。どこで生れたかとんと見当けんとうがつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。'.split('');

function preload() {
  sound = loadSound('Catch_the_future.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  textFont('sans-serif');
  textAlign(CENTER, CENTER);

  fft = new p5.FFT();
  sound.amp(0.2);
  sound.loop();
}

function draw() {
  clear();
  background(50);

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
}

function keyTyped() {
  if (keyCode >= 32) {
    letters += key;
  }
}
