var tombol;
var _this = this;
function init() {
  _this.tandaSuaraOn.visible = !_this.tandaSuaraOn.visible;
  _this.nyala.visible = !_this.nyala.visible;

  var queue = new createjs.LoadQueue();
  queue.installPlugin(createjs.Sound);
  queue.addEventListener("complete", handleComplete);

  queue.loadManifest([{ src: "/sounds/musicBG.mp3", id: "tombolGan" }]);

  function handleComplete(event) {
    // assign each sound to unique variable
    _this.sound1 = createjs.Sound.createInstance("tombolGan");
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
createjs.Sound.stop();
