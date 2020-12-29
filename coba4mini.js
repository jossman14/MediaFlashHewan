this.stop();
var s =
  "Yuk bantu bapak nelayan untuk memilih hewan yang dapat dijadikan sebagai obat typus";

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

if (!spot) {
  if (pieces.target.x != pieces.target.originalX) {
    console.log("check");
    root.onMiss();
  }
  return;
}

this.gotoAndStop(0);

if (!spot) {
  if (pieces1.target.x != pieces1.target.originalX) {
    console.log("check");
    root1.onMiss();
  }
  return;
}
