var root = this;
var _this = this;
var pieces = root.pieces;
var slots = root.slots;
var restart = root.restart;
var Score = root.Score;
var positions1 = [];
var jawaban = [];

root.stop();

_this.popUpSalah.visible = !_this.popUpSalah.visible;
_this.popUpBenar.visible = !_this.popUpBenar.visible;
_this.popUpSelesai.visible = !_this.popUpSelesai.visible;
_this.popUpDanger.visible = !_this.popUpDanger.visible;

root.pp3.gotoAndStop(0);

root.g3.on("click", function () {
  root.pp3.gotoAndPlay(0);
});

root.pp2.gotoAndStop(0);

root.g2.on("click", function () {
  root.pp2.gotoAndPlay(0);
});

root.pp1.gotoAndStop(0);

root.g1.on("click", function () {
  root.pp1.gotoAndPlay(0);
});

root.popUpInfo.gotoAndStop(0);

root.btnInfo.on("click", function () {
  root.popUpInfo.gotoAndPlay(0);
});

root.setup = function () {
  document.body.style.backgroundColor = lib.properties.color;
  createjs.Touch.enable(stage);
  stage.mouseMoveOutside = true;
  root.drawStart = stage.on("drawstart", root.start, null, true);
};

root.start = function (e) {
  stage.off("drawstart", root.drawStart);
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
  jawaban = [];
  root.shuffle();
};

root.mouseDownHandler = function (e) {
  e.currentTarget.setChildIndex(e.target, e.currentTarget.children.length - 1);
  e.target.offsetX = e.stageX / stage.scaleX - e.target.x;
  e.target.offsetY = e.stageY / stage.scaleY - e.target.y;
  pieces.target = e.target;
  root.stageMouseMove = stage.on("stagemousemove", root.stageMouseMoveHandler);
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
  Score.text = 0;
  positions1.sort(function (a, b) {
    return 0.5 - Math.random();
  });

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
    if (pieces.target.x != pieces.target.originalX) {
      console.log("check");
      root.onMiss();
    }
    return;
  }

  root.slot = spot.parent;

  if (root.slot) {
    if (pieces.target.name.substring(0, 4) === root.slot.name.substring(0, 4)) {
      root.letakin();
      root.onMatch();
    } else {
      root.letakin();
      root.salahJawab();
    }
    if (pieces.count === pieces.children.length) root.onWin();
    if (Score.text === 100) {
      root.onWin();
    }

    root.slot = null;
  } else root.onMiss();

  jawaban.push(pieces.target);

  if (jawaban.length >= 2) {
    hapus = jawaban.shift();
    root.sembunyiin(hapus);
  }
  console.log(jawaban);
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

root.sembunyiin = function (hapus) {
  createjs.Tween.get(hapus).to(
    { x: root.slots.kotakKartuSembunyi.x, y: root.slots.kotakKartuSembunyi.y },
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
};

root.onMatch = function () {
  _this.sound2.play();
  _this.popUpBenar.visible = !_this.popUpBenar.visible;
  setTimeout(function () {
    _this.popUpBenar.visible = !_this.popUpBenar.visible;
  }, 3000);
  pieces.skor++;
  Score.text = pieces.skor * 33;
};

root.onWin = function () {
  _this.sound2.play();
  _this.popUpSelesai.visible = !_this.popUpSelesai.visible;
  setTimeout(function () {
    _this.popUpSelesai.visible = !_this.popUpSelesai.visible;
  }, 3000);
  Score.text = pieces.skor * 33 + 1;

  root.popUpJawabanAkhir.gotoAndPlay(0);
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
};

var tombol;
var _this = this;
function init() {
  _this.tandaSuaraOn.visible = !_this.tandaSuaraOn.visible;
  _this.nyala.visible = !_this.nyala.visible;

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
    _this.sound1.play({ loop: -1 });

    _this.nyala.on("click", function tombolKlikEd() {
      _this.sound1.play({ loop: -1 });
      _this.nyala.visible = !_this.nyala.visible;
      _this.tandaSuaraOff.visible = !_this.tandaSuaraOff.visible;
      _this.hening.visible = !_this.hening.visible;
      _this.tandaSuaraOn.visible = !_this.tandaSuaraOn.visible;
    });

    _this.hening.on("click", function tombolKlikEd() {
      // _this.sound3.play();
      createjs.Sound.stop();
      _this.hening.visible = !_this.hening.visible;
      _this.tandaSuaraOn.visible = !_this.tandaSuaraOn.visible;
      _this.nyala.visible = !_this.nyala.visible;
      _this.tandaSuaraOff.visible = !_this.tandaSuaraOff.visible;
    });
  }
}

init();
root.setup();
createjs.Sound.stop();
