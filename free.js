// 配列
var circles = [];
// 変数
var sound;
var fft;
var amp;
var waveform;

// データのロード
function preload() {
  sound = loadSound('sounds/低血ボルト.mp3');
}

// 全体の初期化（最初に一回だけ呼ばれる）
function setup() {
  // キャンバスをつくる
  createCanvas(windowWidth, windowHeight);
  // 周波数を解析(滑らかに動かすための値、配列の長さ)
  fft = new p5.FFT(0.8, 32);
  // 輪郭（りんかく）を消す
  noStroke();
}

// 計算と表示
function draw() {
  // 背景をぬりつぶす
  background(0, 200, 200);

  // マウスをクリックしている間、
  if (mouseIsPressed) {
    // circles配列に追加(マウスの座標)
    circles.push(new Circle(mouseX, mouseY));

    // circleが100を超えたら、先頭のcircleを一つ消す
    if (circles.length > 100) {
      circles.splice(01, 1);
    }
  }

  // 配列の数だけ処理する
  for (var i = 0; i < circles.length; i++) {
    // 移動する
    circles[i].move();
    // 表示する
    circles[i].draw();

    // 自分以外の Circle を参照
    for (var j = 0; j < circles.length; j++) {
      // （1）円の座標
      var position1 = circles[i].position;
      // （2）円の座標
      var position2 = circles[j].position;

      // （1）円と（2）円の距離を計算する
      var distance = dist(position1.x, position1.y,
        position2.x, position2.y);

      // 円の距離が50以下のとき
      if (distance < 50) {
        // 線の色
        stroke(255, 0, 0);
        // 線を描く
        line(position1.x, position1.y, position2.x, position2.y);
      }
    }
  }
}

// 円を発射するクラス
class Circle {
  // 初期化
  constructor(x, y) {
    // 座標（マウスの位置）
    this.position = createVector(x, y);
    // 動き
    this.velocity = p5.Vector.random2D();
    // 大きさ
    this.size = random(3, 10);
  }

  // 移動
  move() {
    // 座標に動きを加える
    this.position.add(this.velocity);
  }

  // 表示
  draw() {
    // ぬりつぶす
    fill(255, 0, 0);
    // 円を描く
    ellipse(this.position.x, this.position.y, this.size);
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