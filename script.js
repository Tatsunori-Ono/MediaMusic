// 変数
var sound;
var fft;
var spectrum;

// データのロード
function preload() {
    sound = loadSound('bgmSound.mp3');
}

// 全体の初期化（最初に一回だけ呼ばれる）
function setup() {
    // キャンバスをつくる
    createCanvas(500, 500);

    // 周波数を解析(滑らかに動かすための値、配列の長さ)
    fft = new p5.FFT(0.8, 32);

    // 輪郭（りんかく）を消す
    noStroke();
}

// 計算と表示
function draw() {
    // 背景をぬりつぶす
    background(240);

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