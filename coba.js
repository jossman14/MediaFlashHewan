var root = this;
var pieces = root.pieces;
var slots = root.slots;
var restart = root.restart;
var winMessage = root.winMessage;
var Score = root.Score;
root.positions = [];

root.stop();

root.btnMenuDasar1.on("click", function () {
  root.shuffle();

  root.gotoAndStop("menu");
});

root.btnNextDasar1.on("click", function () {
  root.shuffle();

  root.gotoAndStop("menu");
});

root.btnBack3.on("click", function () {
  root.shuffle();

  root.gotoAndStop("game5");
});

root.pGam1.gotoAndStop(0);

root.pieces.laut.on("dblclick", function () {
  root.pGam1.gotoAndPlay(0);
});

root.pp3.gotoAndStop(0);

root.pieces.tana.on("dblclick", function () {
  root.pp3.gotoAndPlay(0);
});

root.pp4.gotoAndStop(0);

root.pieces.tana1.on("dblclick", function () {
  root.pp4.gotoAndPlay(0);
});

root.pp5.gotoAndStop(0);

root.pieces.laut1.on("dblclick", function () {
  root.pp5.gotoAndPlay(0);
});

root.pp6.gotoAndStop(0);

root.pieces.laut2.on("dblclick", function () {
  root.pp6.gotoAndPlay(0);
});

root.pp7.gotoAndStop(0);

root.pieces.laut3.on("dblclick", function () {
  root.pp7.gotoAndPlay(0);
});

root.pp8.gotoAndStop(0);

root.pieces.laut4.on("dblclick", function () {
  root.pp8.gotoAndPlay(0);
});

root.pp9.gotoAndStop(0);

root.pieces.laut5.on("dblclick", function () {
  root.pp9.gotoAndPlay(0);
});

root.pp10.gotoAndStop(0);

root.pieces.laut6.on("dblclick", function () {
  root.pp10.gotoAndPlay(0);
});

root.pp11.gotoAndStop(0);

root.pieces.laut7.on("dblclick", function () {
  root.pp11.gotoAndPlay(0);
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
  winMessage.originalY = winMessage.y;

  pieces.children.forEach(function (child, index) {
    root.positions[index] = { x: child.x, y: child.y };
  });

  slots.children.forEach(function (child, index) {
    child.mouseChildren = false;
  });

  root.restartHandler(null);
  restart.on("click", root.restartHandler);
  pieces.on("mousedown", root.mouseDownHandler);
};

root.restartHandler = function (e) {
  pieces.count = 0;
  winMessage.text = "";
  root.shuffle();
};

root.mouseDownHandler = function (e) {
  winMessage.text = "Ayo...silahkan letakkan pada kotak yang sesuai!";
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
  Score.text = "score";

  root.positions.sort(function (a, b) {
    return 0.5 - Math.random();
  });

  pieces.children.forEach(function (child, index) {
    child.originalX = root.positions[index].x;
    child.originalY = root.positions[index].y;
    child.mouseEnabled = true;
    createjs.Tween.get(child).to(
      { x: child.originalX, y: child.originalY },
      350,
      createjs.Ease.backInOut
    );
  });
};

root.check = function () {
  console.log(pieces.target.name.substring(0, 4));
  var spot = slots.getObjectUnderPoint(pieces.target.x, pieces.target.y);
  console.log(spot);
  if (!spot) {
    root.onMiss();
    return;
  }

  root.slot = spot.parent;
  console.log(root.slot);
  console.log(root.slot.name);

  if (root.slot) {
    if (pieces.target.name.substring(0, 4) === root.slot.name) {
      root.onMatch();

      if (pieces.count === pieces.children.length) root.onWin();
    } else root.onMiss();

    root.slot = null;
  } else root.onMiss();
};

root.onMatch = function () {
  pieces.target.mouseEnabled = false;
  pieces.count++;
  createjs.Tween.get(pieces.target).to(
    { x: root.slots.kotakKartu2.x, y: root.slots.kotakKartu2.y },
    350,
    createjs.Ease.backInOut
  );
  winMessage.text = "Selamat! Tebakan Anda Benar!";
  Score.text = pieces.count * 10;
  winMessage.alpha = 0;
  winMessage.y = winMessage.originalY + 60;
  createjs.Tween.get(winMessage).to(
    { alpha: 1, y: winMessage.originalY },
    500,
    createjs.Ease.backInOut
  );
};

root.onWin = function () {
  winMessage.text = "Anda Berhasil Menyelesaikan Tantangan!";
  winMessage.alpha = 0;
  winMessage.y = winMessage.originalY + 60;
  createjs.Tween.get(winMessage).to(
    { alpha: 1, y: winMessage.originalY },
    500,
    createjs.Ease.backInOut
  );
};

root.onMiss = function () {
  createjs.Tween.get(pieces.target).to(
    { x: pieces.target.originalX, y: pieces.target.originalY },
    350,
    createjs.Ease.backInOut
  );
  winMessage.text = "Sepertinya Tebakan Anda Salah, Silahkan Coba Lagi";
  winMessage.alpha = 0;
  winMessage.y = winMessage.originalY + 60;
  createjs.Tween.get(winMessage).to(
    { alpha: 1, y: winMessage.originalY },
    500,
    createjs.Ease.backInOut
  );
};

root.setup();
