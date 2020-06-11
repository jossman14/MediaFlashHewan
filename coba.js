var root = this;
root.stop();

root.btnMenuDasar1.on("click", function () {
  root.sleep(600);
  root.shuffle();
  root.restartHandler();
  root.sleep(1000);
  root.gotoAndStop("menu");
});

root.btnNextDasar1.on("click", function () {
  root.sleep(600);
  root.shuffle();
  root.restartHandler();
  root.sleep(1000);
  root.gotoAndStop("game10");
});

root.btnBack3.on("click", function () {
  root.sleep(600);
  root.shuffle();
  root.restartHandler();
  root.sleep(1000);
  root.gotoAndStop("game8");
});

root.sleep = function (milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
};
