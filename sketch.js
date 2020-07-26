var sound;
var song;
var fft;
var spectrum;
var letters = [];
var button;
var circles = [];

function preload() {
    /*soundFormats('mp3');*/
    sound = loadSound('sounds/低血ボルト.mp3', loaded);
}

// 全体の初期化（最初に一回だけ呼ばれる）
function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont('sans-serif');
    textAlign(CENTER, CENTER);
    // 周波数を解析(滑らかに動かすための値、配列の長さ)
    //fft = new p5.FFT(0.8, 32);
    sound.amp(0.2);
    sound.loop();
    noStroke();

    button = createButton("play");
    button.mousePressed(togglePlaying);
    background(51);
}

function loaded() {
    console.log("loaded");
}

/*
function togglePlaying() {
    if (!sound.isPlaying()) {
        sound.play();
        sound.setVolume(1);
        button.html("pause");
    } else {
        sound.pause();
        button.html("play");
    }
}
*/

// マウスが押されたときに呼び出す関数
function mouseClicked() {
    // サウンドが再生中のとき
    if (sound.isPlaying()) {
        // サウンドを一時停止
        sound.pause();
        // サウンドが再生されていないとき
    } else {
        // サウンドをループ再生
        sound.loop();
    }
}

function draw() {
    clear();
    background(240);
    var waveform = fft.waveform();
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

    // 振幅値を計算する（0〜255）
    spectrum = fft.analyze();

    // 四角形の横幅
    var rectWidth = width / spectrum.length;

    // ぬりつぶす
    fill(0, 200, 255);

    // 配列の長さだけ処理する
    for (var i = 0; i < spectrum.length; i++) {
        // 四角形の縦幅
        var rectHeight = spectrum[i] * 1.5;

        // 四角形を描く
        rect(i * rectWidth, height, rectWidth - 2, -rectHeight);
    }
}

function keyTyped() {
    if (keyCode >= 32) {
        letters += key;
    }
}