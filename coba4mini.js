this.stop();
var s1 =
  "Bioremediasi adalah penggunaan organisme hidup, terutama mikroorganisme, untuk mendegradasi kontaminan lingkungan ke dalam bentuk yang kurang beracun. bioremediasi terjadi karena enzim yang diproduksi oleh mikroorganisme memodifikasi polutan beracun dengan mengubah struktur kimia polutan tersebut, disebut biotransformasi. pada banyak kasus, biotransformasi berujung pada biodegradasi, dimana polutan beracun tergradasi, strukturnya menjadi tidak kompleks, dan akhirnya menjadi metabolit yang tidak berbahaya dan tidak beracun.                                                                ";

var F1 = f1.bind(this);

var fI1;

clearInterval(fI1);

fI1 = setInterval(F1, 60);

function f1(e) {
  if (this.desk.text.length < s1.length) {
    this.desk.text += s1.charAt(this.desk.text.length);
  } else {
    clearInterval(fI1);
  }

  if (this.desk.text.length >= s1.length) {
    // setTimeout(function () {
    // }, 1500);
    console.log(this.desk.visible);
    this.desk.visible = !this.desk.visible;
    console.log(this.desk.visible);
    s1 = "";
    this.play();
  }
}
