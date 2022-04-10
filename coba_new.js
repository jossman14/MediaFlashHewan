var root = this;
var pieces = root.pieces;
var slots = root.slots;
var restart = root.restart;
var winMessage = root.winMessage;
var Score = root.Score;
var positions1 = [];
var _this = this;

root.popUpInfo.gotoAndStop(0);

root.btnInfo.on("click", function () {
  root.popUpInfo.gotoAndPlay(0);
});

root.stop();

_this.popUpSalah.visible = !_this.popUpSalah.visible;
_this.popUpBenar.visible = !_this.popUpBenar.visible;
_this.popUpSelesai.visible = !_this.popUpSelesai.visible;
_this.popUpDanger.visible = !_this.popUpDanger.visible;

root.setup = function () {
  document.body.style.backgroundColor = lib.properties.color;
  createjs.Touch.enable(stage);
  stage.mouseMoveOutside = true;
  root.drawStart = stage.on("drawstart", root.start, null, true);
};

root.start = function (e) {
  stage.off("drawstart", root.drawStart);
  winMessage.originalY = winMessage.y;
  pieces.children.forEach(function (child, index) {
    positions1[index] = { x: child.x, y: child.y };
  });

  slots.children.forEach(function (child, index) {
    child.mouseChildren = false;
  });

  root.restartHandler(null);
  restart.on("click", root.restartHandler);
  pieces.on("mousedown", root.mouseDownHandler);
};

root.restartHandler = function (e) {
  pieces.skor = 0;
  pieces.count = 0;
  winMessage.text = "";
  root.shuffle();
};

root.mouseDownHandler = function (e) {
  winMessage.text = "Ayo, Letakkan pada kotak yang sesuai!";
  winMessage.alpha = 0;
  winMessage.y = winMessage.originalY + 60;
  createjs.Tween.get(winMessage).to(
    { alpha: 1, y: winMessage.originalY },
    500,
    createjs.Ease.backInOut
  );
  e.currentTarget.setChildIndex(e.target, e.currentTarget.children.length - 1);
  e.target.offsetX = e.stageX / stage.scaleX - e.target.x;
  e.target.offsetY = e.stageY / stage.scaleY - e.target.y;
  pieces.target = e.target;
  root.stageMouseMove = stage.on(
    "stagemousemove",
    root.stageMouseMoveHandler
  );
  root.stageMouseUp = stage.on("stagemouseup", root.stageMouseUpHandler);
};

root.stageMouseMoveHandler = function (e) {
  if (pieces.target) {
    pieces.target.x = e.stageX / stage.scaleX - pieces.target.offsetX;
    pieces.target.y = e.stageY / stage.scaleY - pieces.target.offsetY;
  }
};

root.stageMouseUpHandler = function (e) {
  stage.off("stagemousemove", root.stageMouseMove);
  stage.off("stagemouseup", root.stageMouseUp);

  if (pieces.target) {
    root.check();
    pieces.target = null;
  }
};

root.shuffle = function () {
  Score.text = "score";
  positions1.sort(function (a, b) {
    return 0.5 - Math.random();
  });
  console.log(pieces);
  console.log(pieces.children);
  pieces.children.forEach(function (child, index) {
    child.originalX = positions1[index].x;
    child.originalY = positions1[index].y;
    child.mouseEnabled = true;
    createjs.Tween.get(child).to(
      { x: child.originalX, y: child.originalY },
      350,
      createjs.Ease.backInOut
    );
  });
};

root.check = function () {
  var spot = slots.getObjectUnderPoint(pieces.target.x, pieces.target.y);

  if (!spot) {
    root.onMiss();
    return;
  }

  root.slot = spot.parent;

  if (root.slot) {
    console.log(root.slot.name, pieces.target.name);
    if (
      pieces.target.name.substring(0, 4) === root.slot.name.substring(0, 4)
    ) {
      root.letakin();
      root.onMatch();
    } else {
      // root.letakin();
      root.onMiss();
    }
    if (pieces.count === pieces.children.length) root.onWin();

    root.slot = null;
  } else root.onMiss();
};

root.letakin = function () {
  pieces.target.mouseEnabled = false;
  pieces.count++;
  createjs.Tween.get(pieces.target).to(
    { x: root.slots.kotakKartu2.x, y: root.slots.kotakKartu2.y },
    350,
    createjs.Ease.backInOut
  );
};

root.salahJawab = function () {
  _this.sound3.play();
  _this.popUpSalah.visible = !_this.popUpSalah.visible;
  setTimeout(function () {
    _this.popUpSalah.visible = !_this.popUpSalah.visible;
  }, 3000);
  winMessage.text = "Hemm, sepertinya Tebakan Anda Salah";
  winMessage.alpha = 0;
  winMessage.y = winMessage.originalY + 60;
  createjs.Tween.get(winMessage).to(
    { alpha: 1, y: winMessage.originalY },
    500,
    createjs.Ease.backInOut
  );
};

root.onMatch = function () {
  _this.sound2.play();
  _this.popUpBenar.visible = !_this.popUpBenar.visible;
  setTimeout(function () {
    _this.popUpBenar.visible = !_this.popUpBenar.visible;
  }, 3000);
  winMessage.text = "Selamat! Tebakan Anda Benar!";
  pieces.skor++;
  Score.text = pieces.skor * 10;
  winMessage.alpha = 0;
  winMessage.y = winMessage.originalY + 60;
  createjs.Tween.get(winMessage).to(
    { alpha: 1, y: winMessage.originalY },
    500,
    createjs.Ease.backInOut
  );
};

root.onWin = function () {
  _this.sound2.play();
  _this.popUpSelesai.visible = !_this.popUpSelesai.visible;
  setTimeout(function () {
    _this.popUpSelesai.visible = !_this.popUpSelesai.visible;
  }, 3000);
  winMessage.text = "Yey!, Anda Berhasil Menyelesaikan Tantangan. Selamat!";
  winMessage.alpha = 0;
  winMessage.y = winMessage.originalY + 60;
  createjs.Tween.get(winMessage).to(
    { alpha: 1, y: winMessage.originalY },
    500,
    createjs.Ease.backInOut
  );
};

root.onMiss = function () {
  _this.sound3.play();
  _this.popUpDanger.visible = !_this.popUpDanger.visible;
  setTimeout(function () {
    _this.popUpDanger.visible = !_this.popUpDanger.visible;
  }, 3000);
  createjs.Tween.get(pieces.target).to(
    { x: pieces.target.originalX, y: pieces.target.originalY },
    350,
    createjs.Ease.backInOut
  );
  winMessage.text = "Silahkan letakkan pada kotak yang sesuai ya..";
  winMessage.alpha = 0;
  winMessage.y = winMessage.originalY + 60;
  createjs.Tween.get(winMessage).to(
    { alpha: 1, y: winMessage.originalY },
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
root.setup();
createjs.Sound.stop();
