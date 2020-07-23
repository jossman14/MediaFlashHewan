

var s =
  "Masukkan hewan hewan tersebut kedalam keranjang, kemudian kenali karakteristiknya";

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
