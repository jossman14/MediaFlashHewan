var tombol;
var _this = this;
function init() {
  stage.enableMouseOver(20);
  _this.tandaSuaraOn.visible = !_this.tandaSuaraOn.visible;
  _this.hening.visible = !_this.hening.visible;

  var queue = new createjs.LoadQueue();
  queue.installPlugin(createjs.Sound);
  queue.addEventListener("complete", handleComplete);

  queue.loadManifest([
    { src: "/sounds/musicBG.mp3", id: "tombolGan" },
    { src: "/sounds/benar.mp3", id: "benar" },
    { src: "/sounds/salah.mp3", id: "salah" },
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
createjs.Sound.stop();
