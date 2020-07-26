// 配列
var circles = [];
var letters = '怖がることはもういーかい惑わされてくなら頭でっ価値 ずっとうんと砕いてもっと乱してあげて脳みそ達止められない 操れない僕に期待したいんだ切り刻まれこの皮膚に従うほど無敵になれた'.split('');
// 変数
var sound;
var fft;
var amp;
var waveform;
var slider;
var positionX;
var positionY;
var velocityX;
var velocityY;

// データのロード
function preload() {
  sound = loadSound('sounds/低血ボルト.mp3');
}

// 全体の初期化（最初に一回だけ呼ばれる）
function setup() {
  // キャンバスをつくる
  createCanvas(windowWidth, windowHeight, WEBGL);
  // 角度を度数法に設定
  angleMode(DEGREES);
  // 周波数を解析(滑らかに動かすための値、配列の長さ)
  fft = new p5.FFT(0.8, 64);
  // 音量を制限する
  sound.amp(0.2);
  // mic
  mic = new p5.AudioIn();
  mic.start();
  // 輪郭（りんかく）を消す
  noStroke();
  // Xの速度を設定
  velocityX = 5;
  // Yの速度を設定
  velocityY = 3;
  // スライダーをつくる（最小値、最大値、デフォルト値、ステップ）
  /*slider = createSlider(1, 50, 1, 1);
  // スライダーの表示位置
  slider.position(20, 20);
  // スライダーの横幅
  slider.style('width', '200px');
  // 円の座標を初期化
  positionX = width / 2;
  positionY = height / 2;*/
}

// 計算と表示
function draw() {
  // 背景をぬりつぶす
  background(0, 200, 200);

  /*
  let val = slider.value();
  sound.volume(val);
  */
  /*
  // スライダーの値を、速度として設定
  var velocityX = slider.value();
  // X座標を右に移動
  positionX += velocityX;
  // X座標がキャンバスの右端を超えたら
  if (positionX > width + 50) {
  // 左端に戻す
  positionX = -50;
  // 円を描く
  text.letters(positionX, positionY, 100);
  */

    /*
    // ぬりつぶす
    fill(positionX / 2, 255, 0);
    // 円を描く
    ellipse(positionX, positionY, 80);
    // X座標を移動
    positionX += velocityX;
    // Y座標を移動
    positionY += velocityY;
    // 円が右側の壁にぶつかったら はねかえる
    if (positionX > width - 40) {
      velocityX *= -1;
    }
    // 円が左側の壁にぶつかったら はねかえる
    if (positionX < 40) {
      velocityX *= -1;
    }
    // 円が下側の壁にぶつかったら はねかえる
    if (positionY > height - 40) {
      velocityY *= -1;
    }
    // 円が上側の壁にぶつかったら はねかえる
    if (positionY < 40) {
      velocityY *= -1;
    }
    */

  // 60度かたむける（X軸）
  rotateX(60);

  // 波形の値を計算する（-1.0〜1.0）
  waveform = fft.waveform();
  // 四角形を並べる角度
  var angle = 360 / waveform.length;
  // 配列の長さだけ処理する
  for (var i = 0; i < waveform.length; i++) {
    // 少しずつずらす
    rotateZ(angle);
    // 現在の座標を一時保存
    push();
    // 座標の基準を移動する（boxの座標が0となる）
    translate(150, 0, 0);
    // 大きさ
    var size = waveform[i] * 500;
    // ボックスの大きさが100をこえたら、ピンクにぬりつぶす
    if (size > 50) {
      fill(250, 0, 200);
    }
    // それ以外は、青緑にぬりつぶす
    else {
      fill(0, 220, 220);
    }
    // ボックスを描く
    box(5, 5, 5 + size);
    //box(5 + size, 5, 5);

    // 一時保存した座標に戻す
    pop();
  }

  for (var l = 0; l < letters.length; l++) {
    var j = Math.round(map(l, 0, letters.length, 0, waveform.length));
    var x = map(j, 0, waveform.length, 0, width);
    var y = map(waveform[j] * 3, -1, 1, height, 0);
    fill(color(random(100, 255), random(100, 255), random(100, 255)));
    textSize(Math.abs(waveform[j]) * 300 + 5);
    text(letters[l], x, y);
  }

  /*
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
  */
  if (keyIsPressed === true) {
    sound.play();
  }
  // マウスをクリックしている間、
  if (mouseIsPressed) {
    // circles配列に追加(マウスの座標)
    /* if (sound.isPlaying()) {
      // サウンドを一時停止
      sound.pause();
      // サウンドが再生されていないとき
    } else {
      // サウンドをループ再生
      sound.loop();
    } */
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

    /*
    // 文字の色
    fill(255);
    // フォント
    textFont('Chewy');
    // 文字の位置
    textAlign(CENTER, CENTER);
    var volume = mic.getLevel();
    var volsize = volume * 200;
    // 文字のサイズ
    textSize(100 + volsize);
    // 文字を表示する
    text('低血ボルト', width / 4 * 2, height / 4 * 1.25);
    // 文字のサイズ
    textSize(75 + volsize);
    // 文字を表示する
    text('ずっと真夜中でいいのに。', width / 4 * 2, height / 4 * 2.25);

    textFont('geo');
    // テキストの色
    fill(255);
    // テキストのサイズ
    textSize(75);
    // テキストの位置
    textAlign(CENTER, CENTER);
    // テキストを表示
    text(hour() + ':' + minute() + ':' + second(), width / 2, height * 0.9);
    */
  }

  /*
  positionX = random(width);
  // Y座標を5ずつへらす
  positionY -= 5;
  // ぬりつぶす
  fill(random(255), random(255), 255, 120);
  // 円を描く
  var lyrics = letters;
  lyrics(positionX, positionY, random(50, 150));
  // Y座標がキャンバスの外（上側）にで出たら
  if (positionY < 0) {
    // Y座標をheight（下側）に戻す
    positionY = height;
  }
  */
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
