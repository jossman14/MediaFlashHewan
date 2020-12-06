var root1 = this;
var pieces1 = root1.pieces1;
var slots1 = root1.slots1;
var restart1 = root1.restart1;
var winMessage1 = root1.winMessage1;
var Score1 = root1.Score1;
var positions2 = [];
var _this = this;

root1.stop();

_this.popUpSalah.visible = !_this.popUpSalah.visible;
_this.popUpBenar.visible = !_this.popUpBenar.visible;
_this.popUpSelesai.visible = !_this.popUpSelesai.visible;
_this.popUpDanger.visible = !_this.popUpDanger.visible;

root1.setup = function () {
  document.body.style.backgroundColor = lib.properties.color;
  createjs.Touch.enable(stage);
  stage.mouseMoveOutside = true;
  root1.drawStart = stage.on("drawstart", root1.start, null, true);
};

root1.start = function (e) {
  stage.off("drawstart", root1.drawStart);
  winMessage1.originalY = winMessage1.y;
  pieces1.children.forEach(function (child, index) {
    positions2[index] = { x: child.x, y: child.y };
  });

  slots1.children.forEach(function (child, index) {
    child.mouseChildren = false;
  });

  root1.restart1Handler(null);
  restart1.on("click", root1.restart1Handler);
  pieces1.on("mousedown", root1.mouseDownHandler);
};

root1.restart1Handler = function (e) {
  pieces1.skor = 0;
  pieces1.count = 0;
  winMessage1.text = "";
  root1.shuffle();
};

root1.mouseDownHandler = function (e) {
  winMessage1.text = "Ayo, Letakkan pada kotak yang sesuai!";
  winMessage1.alpha = 0;
  winMessage1.y = winMessage1.originalY + 60;
  createjs.Tween.get(winMessage1).to(
    { alpha: 1, y: winMessage1.originalY },
    500,
    createjs.Ease.backInOut
  );
  e.currentTarget.setChildIndex(e.target, e.currentTarget.children.length - 1);
  e.target.offsetX = e.stageX / stage.scaleX - e.target.x;
  e.target.offsetY = e.stageY / stage.scaleY - e.target.y;
  pieces1.target = e.target;
  root1.stageMouseMove = stage.on(
    "stagemousemove",
    root1.stageMouseMoveHandler
  );
  root1.stageMouseUp = stage.on("stagemouseup", root1.stageMouseUpHandler);
};

root1.stageMouseMoveHandler = function (e) {
  if (pieces1.target) {
    pieces1.target.x = e.stageX / stage.scaleX - pieces1.target.offsetX;
    pieces1.target.y = e.stageY / stage.scaleY - pieces1.target.offsetY;
  }
};

root1.stageMouseUpHandler = function (e) {
  stage.off("stagemousemove", root1.stageMouseMove);
  stage.off("stagemouseup", root1.stageMouseUp);

  if (pieces1.target) {
    root1.check();
    pieces1.target = null;
  }
};

root1.shuffle = function () {
  Score1.text = "score1";
  positions2.sort(function (a, b) {
    return 0.5 - Math.random();
  });
  console.log(pieces1);
  console.log(pieces1.children);
  pieces1.children.forEach(function (child, index) {
    child.originalX = positions2[index].x;
    child.originalY = positions2[index].y;
    child.mouseEnabled = true;
    createjs.Tween.get(child).to(
      { x: child.originalX, y: child.originalY },
      350,
      createjs.Ease.backInOut
    );
  });
};

root1.check = function () {
  var spot = slots1.getObjectUnderPoint(pieces1.target.x, pieces1.target.y);

  if (!spot) {
    root1.onMiss();
    return;
  }

  root1.slot = spot.parent;

  if (root1.slot) {
    console.log(root1.slot.name, pieces1.target.name);
    if (
      pieces1.target.name.substring(0, 4) === root1.slot.name.substring(0, 4)
    ) {
      root1.letakin();
      root1.onMatch();
    } else {
      root1.letakin();
      root1.salahJawab();
    }
    if (pieces1.count === pieces1.children.length) root1.onWin();

    root1.slot = null;
  } else root1.onMiss();
};

root1.letakin = function () {
  pieces1.target.mouseEnabled = false;
  pieces1.count++;
  createjs.Tween.get(pieces1.target).to(
    { x: root1.slots1.kotakKartu2.x, y: root1.slots1.kotakKartu2.y },
    350,
    createjs.Ease.backInOut
  );
};

root1.salahJawab = function () {
  _this.sound3.play();
  _this.popUpSalah.visible = !_this.popUpSalah.visible;
  setTimeout(function () {
    _this.popUpSalah.visible = !_this.popUpSalah.visible;
  }, 3000);
  winMessage1.text = "Hemm, sepertinya Tebakan Anda Salah";
  winMessage1.alpha = 0;
  winMessage1.y = winMessage1.originalY + 60;
  createjs.Tween.get(winMessage1).to(
    { alpha: 1, y: winMessage1.originalY },
    500,
    createjs.Ease.backInOut
  );
};

root1.onMatch = function () {
  _this.sound2.play();
  _this.popUpBenar.visible = !_this.popUpBenar.visible;
  setTimeout(function () {
    _this.popUpBenar.visible = !_this.popUpBenar.visible;
  }, 3000);
  winMessage1.text = "Selamat! Tebakan Anda Benar!";
  pieces1.skor++;
  Score1.text = pieces1.skor * 25;
  winMessage1.alpha = 0;
  winMessage1.y = winMessage1.originalY + 60;
  createjs.Tween.get(winMessage1).to(
    { alpha: 1, y: winMessage1.originalY },
    500,
    createjs.Ease.backInOut
  );
};

root1.onWin = function () {
  _this.sound2.play();
  _this.popUpSelesai.visible = !_this.popUpSelesai.visible;
  setTimeout(function () {
    _this.popUpSelesai.visible = !_this.popUpSelesai.visible;
  }, 3000);
  winMessage1.text = "Yey!, Anda Berhasil Menyelesaikan Tantangan. Selamat!";
  winMessage1.alpha = 0;
  winMessage1.y = winMessage1.originalY + 60;
  createjs.Tween.get(winMessage1).to(
    { alpha: 1, y: winMessage1.originalY },
    500,
    createjs.Ease.backInOut
  );
  root1.popUpJawabanAkhir.gotoAndPlay(0);
};

root1.onMiss = function () {
  _this.sound3.play();
  _this.popUpDanger.visible = !_this.popUpDanger.visible;
  setTimeout(function () {
    _this.popUpDanger.visible = !_this.popUpDanger.visible;
  }, 3000);
  createjs.Tween.get(pieces1.target).to(
    { x: pieces1.target.originalX, y: pieces1.target.originalY },
    350,
    createjs.Ease.backInOut
  );
  winMessage1.text = "Silahkan letakkan pada kotak yang sesuai ya..";
  winMessage1.alpha = 0;
  winMessage1.y = winMessage1.originalY + 60;
  createjs.Tween.get(winMessage1).to(
    { alpha: 1, y: winMessage1.originalY },
    500,
    createjs.Ease.backInOut
  );
  
};

var tombol;
var _this = this;

function init() {
  var queue = new createjs.LoadQueue();
  queue.installPlugin(createjs.Sound);
  queue.addEventListener("complete", handleComplete);

  queue.loadManifest([
    {
      src: "./sounds/musicBG.mp3",
      id: "tombolGan",
    },
    {
      src: "./sounds/benar.mp3",
      id: "benar",
    },
    {
      src: "./sounds/salah.mp3",
      id: "salah",
    },
  ]);

  function handleComplete(event) {
    // assign each sound to unique variable
    _this.sound1 = createjs.Sound.createInstance("tombolGan");
    _this.sound2 = createjs.Sound.createInstance("benar");
    _this.sound3 = createjs.Sound.createInstance("salah");
  }
}

init();
root1.setup();
createjs.Sound.stop();
