var _this = this;

_this.setup = function () {
  document.body.style.backgroundColor = lib.properties.color;
};

_this.setup();

_this.stop();

_this.btnMenuDasar1.on("click", function () {
  window.location.replace("../menu/index.html");
});

_this.btnNextDasar1.on("click", function () {
  window.location.replace("../game1/index.html");
});

_this.btnBack3.on("click", function () {
  window.location.replace("../materi16/index.html");
});

var s = "";

var F = f.bind(this);

var fI;

clearInterval(fI);

fI = setInterval(F, 50);

function f(e) {
  if (this.coba.text.length < s.length) {
    this.coba.text += s.charAt(this.coba.text.length);
  } else {
    clearInterval(fI);
  }
}
