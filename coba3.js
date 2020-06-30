var root1 = this;
var pieces1 = root1.pieces1;
var slots1 = root1.slots1;
var restart1 = root1.restart1;
var winMessage1 = root1.winMessage1;
var Score1 = root1.Score1;
var positions2 = [];

root1.stop();

// root1.btnMenuDasar1.on("click", function () {
//   window.location.replace("../menu/index.html");
// });

// root1.btnNextDasar1.on("click", function () {
//   window.location.replace("../game12/index.html");
// });

// root1.btnBack3.on("click", function () {
//   window.location.replace("../game10/index.html");
// });

//#34495e

// root1.pGam1.gotoAndStop(0);

// root1.pieces1.laut.on("dblclick", function () {
//   root1.pGam1.gotoAndPlay(0);
// });

// root1.pp3.gotoAndStop(0);

// root1.pieces1.tana.on("dblclick", function () {
//   root1.pp3.gotoAndPlay(0);
// });

// root1.pp4.gotoAndStop(0);

// root1.pieces1.tana1.on("dblclick", function () {
//   root1.pp4.gotoAndPlay(0);
// });

// root1.pp5.gotoAndStop(0);

// root1.pieces1.laut1.on("dblclick", function () {
//   root1.pp5.gotoAndPlay(0);
// });

// root1.pp6.gotoAndStop(0);

// root1.pieces1.laut2.on("dblclick", function () {
//   root1.pp6.gotoAndPlay(0);
// });

// root1.pp7.gotoAndStop(0);

// root1.pieces1.laut3.on("dblclick", function () {
//   root1.pp7.gotoAndPlay(0);
// });

// root1.pp8.gotoAndStop(0);

// root1.pieces1.laut4.on("dblclick", function () {
//   root1.pp8.gotoAndPlay(0);
// });

// root1.pp9.gotoAndStop(0);

// root1.pieces1.laut5.on("dblclick", function () {
//   root1.pp9.gotoAndPlay(0);
// });

// root1.pp10.gotoAndStop(0);

// root1.pieces1.laut6.on("dblclick", function () {
//   root1.pp10.gotoAndPlay(0);
// });

// root1.pp11.gotoAndStop(0);

// root1.pieces1.laut7.on("dblclick", function () {
//   root1.pp11.gotoAndPlay(0);
// });

// root1.popUpInfo.gotoAndStop(0);

// root1.btnInfo.on("click", function () {
//   root1.popUpInfo.gotoAndPlay(0);
// });

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
  winMessage1.text = "Selamat! Tebakan Anda Benar!";
  pieces1.skor++;
  Score1.text = pieces1.skor * 33;
  winMessage1.alpha = 0;
  winMessage1.y = winMessage1.originalY + 60;
  createjs.Tween.get(winMessage1).to(
    { alpha: 1, y: winMessage1.originalY },
    500,
    createjs.Ease.backInOut
  );
};

root1.onWin = function () {
  if (pieces1.skor === 3) {
    Score1.text = pieces1.skor * 33 + 1;
  }
  winMessage1.text = "Yey!, Anda Berhasil Menyelesaikan Tantangan. Selamat!";
  winMessage1.alpha = 0;
  winMessage1.y = winMessage1.originalY + 60;
  createjs.Tween.get(winMessage1).to(
    { alpha: 1, y: winMessage1.originalY },
    500,
    createjs.Ease.backInOut
  );
};

root1.onMiss = function () {
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

root1.setup();
