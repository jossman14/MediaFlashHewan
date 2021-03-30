this.setup = function () {
	document.body.style.backgroundColor = lib.properties.color;
}

this.setup();


this.btnMateri.addEventListener("click", btnMateriFunc.bind(this));

function btnMateriFunc() {
	this.gotoAndStop(1);
}

this.btnAnimasi.addEventListener("click", btnAnimasiFunc.bind(this));

function btnAnimasiFunc() {
	this.gotoAndStop(2);
}

this.btnMenu.addEventListener("click", btnMenuFunc.bind(this));

function btnMenuFunc() {
	this.gotoAndStop(0);
}