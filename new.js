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
  window.location.replace("../game9/index.html");
});

_this.btnBack3.on("click", function () {
  window.location.replace("../game8/index.html");
});

var s =
  "Spesies-spesies dalam Filum Annelida sangat penting bagi keseimbangan ekosistem lingkungan. Hal ini karena spesies tersebut merupakan bioindikator habitat lingkungannya. Bioindikator dapat diartikan sebagai organisme yang dapat menunjukkan kualitas lingkungan atau ekosistem dimana organisme tersebut berada. Habitat spesies dalam filum ini berada di tanah dan laut. Spesies yang hidup di tanah mempunyai kemampuan untuk mendaur bahan organik limbah ternak, atau limbah rumah tangga yang diubahnya menjadi bahan organik yang berguna untuk meningkatkan kesuburan tanah. Sedangkan, spesies yang habitatnya di laut mempunyai kemampuan sebagai metabolisme bahan pencemar.";

var F = f.bind(this);

var fI;

clearInterval(fI);

fI = setInterval(F, 200);

function f(e) {
  if (this.coba.text.length < s.length) {
    this.coba.text += s.charAt(this.coba.text.length);
  } else {
    clearInterval(fI);
  }
}
