(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib._1 = function() {
	this.initialize(img._1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,569,296);


(lib._11 = function() {
	this.initialize(img._11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,534,631);


(lib._3 = function() {
	this.initialize(img._3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,638,479);


(lib._11_1 = function() {
	this.initialize(img._11_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,379,448);


(lib._3_1 = function() {
	this.initialize(img._3_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,452,340);


(lib.Bitmap101copy = function() {
	this.initialize(img.Bitmap101copy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,199,124);


(lib.Bitmap103copy = function() {
	this.initialize(img.Bitmap103copy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,248,124);


(lib.Bitmap105 = function() {
	this.initialize(img.Bitmap105);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,212,124);


(lib.Bitmap110 = function() {
	this.initialize(img.Bitmap110);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,287,163);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);


(lib.Bitmap21 = function() {
	this.initialize(img.Bitmap21);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,331,173);


(lib.Bitmap3 = function() {
	this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,249,87);


(lib.Bitmap111 = function() {
	this.initialize(img.Bitmap111);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,239,160);


(lib.bookpngcopy = function() {
	this.initialize(img.bookpngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,399);


(lib.Bitmap102copy = function() {
	this.initialize(img.Bitmap102copy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,233,124);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Tween12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("klik gambar untuk memperjelas", "17px 'Roboto'");
	this.text.textAlign = "center";
	this.text.lineHeight = 22;
	this.text.lineWidth = 256;
	this.text.parent = this;
	this.text.setTransform(0,-10.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-130.2,-12.2,260.5,24.4);


(lib.Tween11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("klik gambar untuk memperjelas", "17px 'Roboto'");
	this.text.textAlign = "center";
	this.text.lineHeight = 22;
	this.text.lineWidth = 256;
	this.text.parent = this;
	this.text.setTransform(0,-10.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-130.2,-12.2,260.5,24.4);


(lib.Tween10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Eg/RAu4MAAAhdvMB+jAAAMAAABdvg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-405,-300,810,600);


(lib.Tween9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("klik gambar untuk memperjelas", "17px 'Roboto'");
	this.text.textAlign = "center";
	this.text.lineHeight = 22;
	this.text.lineWidth = 256;
	this.text.parent = this;
	this.text.setTransform(0,-10.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-130.2,-12.2,260.5,24.4);


(lib.Tween8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3498DB").s().p("EhB5AkpMAAAhJRMCDzAAAMAAABJRg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-421.8,-234.5,843.6,469.1);


(lib.Tween7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3498DB").s().p("EhB5AkpMAAAhJRMCDzAAAMAAABJRg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-421.8,-234.5,843.6,469.1);


(lib.Tween6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("klik untuk buka materi", "12px 'Roboto'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 18;
	this.text.lineWidth = 118;
	this.text.parent = this;
	this.text.setTransform(0,-7.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-60.8,-9.2,121.69999999999999,18.4);


(lib.Tween5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("klik untuk buka materi", "12px 'Roboto'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 18;
	this.text.lineWidth = 118;
	this.text.parent = this;
	this.text.setTransform(-0.05,-7.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-60.8,-9.2,121.6,18.4);


(lib.Tween4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("klik untuk buka materi", "12px 'Roboto'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 18;
	this.text.lineWidth = 118;
	this.text.parent = this;
	this.text.setTransform(0,-7.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-60.8,-9.2,121.69999999999999,18.4);


(lib.Tween3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape.setTransform(95.525,1.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_1.setTransform(88.725,2.225);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_2.setTransform(82.125,0.975);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAGAAQAMAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQADAAAEgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_3.setTransform(75.55,1.025);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgQAgIAAg+IAOAAIAAAHQAEgIAJAAIAGABIAAANIgHgBQgJAAgCAIIAAAqg");
	this.shape_4.setTransform(70.5,0.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgSAnQgIgFgEgKQgEgJgBgMIAAgEQABgMAEgKQAEgKAIgFQAJgFAJAAQALAAAHAFQAJAFAEAKQAEAJAAANIAAADQAAANgEAJQgEAKgJAFQgHAFgLAAQgJAAgJgFgAgOgXQgGAIABANIAAAEQgBAOAGAIQAFAIAJAAQAKAAAFgIQAGgHgBgPIAAgDQABgOgGgIQgGgHgJAAQgJAAgFAHg");
	this.shape_5.setTransform(63.95,-0.075);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgGIAQgTIARAAIgXAaIAaAlg");
	this.shape_6.setTransform(54.125,-0.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_7.setTransform(47.35,1.025);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgGAWIAAgjIgLAAIAAgLIALAAIAAgPIAMAAIAAAPIAMAAIAAALIgMAAIAAAiQAAAEACACQABABAEAAIAFAAIAAALIgJABQgPAAAAgSg");
	this.shape_8.setTransform(41.95,0.3);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgVAYQgHgJgBgPIAAAAQABgJAEgHQADgIAGgEQAIgEAHAAQANAAAIAIQAIAJAAANIAAADQAAAJgDAHQgDAIgIAEQgGAEgJAAQgMAAgJgJgAgKgPQgEAGAAAKQAAAJAEAGQAEAGAGAAQAIAAADgGQAEgGAAgKQAAgJgEgGQgEgFgHAAQgGAAgEAFg");
	this.shape_9.setTransform(36.65,1.025);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAQArIgZglIgJAKIAAAbIgPAAIAAhVIAPAAIAAAoIAIgKIAYgeIASAAIggAmIAiAvg");
	this.shape_10.setTransform(29.95,-0.075);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_11.setTransform(19.525,1.025);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgGIAQgTIARAAIgXAaIAaAlg");
	this.shape_12.setTransform(13.575,-0.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_13.setTransform(3.525,2.225);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_14.setTransform(-3.075,0.975);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_15.setTransform(-7.9,-0.175);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_16.setTransform(-12.775,0.975);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_17.setTransform(-19.425,1.075);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AARArIgaglIgJAKIAAAbIgPAAIAAhVIAPAAIAAAoIAIgKIAYgeIASAAIggAmIAiAvg");
	this.shape_18.setTransform(-26.05,-0.075);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgGIAQgTIARAAIgXAaIAaAlg");
	this.shape_19.setTransform(-35.975,-0.3);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgDACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_20.setTransform(-42.75,1.025);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgGAWIAAgjIgLAAIAAgLIALAAIAAgPIAMAAIAAAPIAMAAIAAALIgMAAIAAAiQABAEABACQABABAEAAIAFAAIAAALIgJABQgPAAAAgSg");
	this.shape_21.setTransform(-48.15,0.3);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgVAYQgHgJgBgPIAAAAQAAgJAFgHQADgIAHgEQAGgEAIAAQANAAAIAIQAIAJABANIAAADQgBAJgDAHQgDAIgIAEQgGAEgJAAQgMAAgJgJgAgKgPQgEAGAAAKQAAAJAEAGQAEAGAGAAQAIAAAEgGQADgGAAgKQAAgJgDgGQgFgFgHAAQgGAAgEAFg");
	this.shape_22.setTransform(-53.45,1.025);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AAQArIgZglIgJAKIAAAbIgPAAIAAhVIAPAAIAAAoIAIgKIAYgeIASAAIggAmIAiAvg");
	this.shape_23.setTransform(-60.15,-0.075);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IANAAIAAAHQAEgIAKAAIAEABIAAANIgFgBQgKAAgDAIIAAAqg");
	this.shape_24.setTransform(-69.2,0.975);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_25.setTransform(-74.775,1.025);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_26.setTransform(-81.175,1.025);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_27.setTransform(-87.425,1.025);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgPAnQgJgFgEgJQgEgJgBgMIAAgGQAAgTAKgLQAJgLAQAAQANAAAJAHQAIAHACAOIgOAAQgDgQgPAAQgKAAgFAHQgEAIgBANIAAAGQAAAOAGAHQAGAIAJAAQALAAAGgFIAAgRIgSAAIAAgKIAgAAIAAAgQgEAGgJADQgIADgKAAQgKAAgIgFg");
	this.shape_28.setTransform(-94.85,-0.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-100.8,-9.2,201.7,18.4);


(lib.Tween2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape.setTransform(95.475,1.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_1.setTransform(88.675,2.225);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_2.setTransform(82.075,0.975);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQADgCADgDIAAgMIgIAAQgHAAgEADg");
	this.shape_3.setTransform(75.5,1.025);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgQAgIAAg+IAOAAIAAAHQAFgIAJAAIAEABIAAANIgGgBQgJAAgDAIIAAAqg");
	this.shape_4.setTransform(70.45,0.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgSAnQgHgFgFgKQgFgJABgMIAAgEQgBgMAFgKQAFgKAHgFQAIgFAKAAQALAAAIAFQAHAFAFAKQAEAJAAANIAAADQABANgFAJQgFAKgHAFQgIAFgLAAQgKAAgIgFgAgOgXQgFAIgBANIAAAEQABAOAFAIQAGAIAIAAQAKAAAFgIQAFgHABgPIAAgDQgBgOgFgIQgGgHgJAAQgIAAgGAHg");
	this.shape_5.setTransform(63.9,-0.075);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgGIAQgTIARAAIgXAaIAaAlg");
	this.shape_6.setTransform(54.075,-0.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_7.setTransform(47.3,1.025);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgHAWIAAgjIgKAAIAAgLIAKAAIAAgPIAOAAIAAAPIALAAIAAALIgLAAIAAAiQgBAEACACQACABADAAIAFAAIAAALIgJABQgQAAAAgSg");
	this.shape_8.setTransform(41.9,0.3);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgUAYQgJgJABgPIAAAAQAAgJADgHQAEgIAGgEQAIgEAHAAQANAAAIAIQAIAJAAANIAAADQAAAJgDAHQgEAIgGAEQgHAEgJAAQgNAAgHgJgAgKgPQgEAGAAAKQAAAJAEAGQAEAGAGAAQAHAAAEgGQAFgGAAgKQAAgJgFgGQgEgFgHAAQgGAAgEAFg");
	this.shape_9.setTransform(36.6,1.025);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AARArIgZglIgKAKIAAAbIgPAAIAAhVIAPAAIAAAoIAIgKIAYgeIASAAIgfAmIAhAvg");
	this.shape_10.setTransform(29.9,-0.075);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_11.setTransform(19.475,1.025);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgGIAQgTIARAAIgXAaIAaAlg");
	this.shape_12.setTransform(13.525,-0.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_13.setTransform(3.475,2.225);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_14.setTransform(-3.125,0.975);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_15.setTransform(-7.95,-0.175);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_16.setTransform(-12.825,0.975);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_17.setTransform(-19.475,1.075);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAQArIgZglIgJAKIAAAbIgPAAIAAhVIAPAAIAAAoIAIgKIAYgeIASAAIgfAmIAhAvg");
	this.shape_18.setTransform(-26.1,-0.075);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgGIAQgTIARAAIgXAaIAaAlg");
	this.shape_19.setTransform(-36.025,-0.3);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAGAAQAMAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQADAAAEgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_20.setTransform(-42.8,1.025);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgHAWIAAgjIgKAAIAAgLIAKAAIAAgPIAOAAIAAAPIALAAIAAALIgLAAIAAAiQAAAEABACQABABAEAAIAFAAIAAALIgJABQgQAAAAgSg");
	this.shape_21.setTransform(-48.2,0.3);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgUAYQgJgJABgPIAAAAQAAgJADgHQAEgIAGgEQAIgEAHAAQANAAAIAIQAIAJAAANIAAADQABAJgEAHQgEAIgGAEQgHAEgJAAQgNAAgHgJgAgKgPQgEAGAAAKQAAAJAEAGQAEAGAGAAQAHAAAEgGQAFgGAAgKQAAgJgFgGQgEgFgHAAQgGAAgEAFg");
	this.shape_22.setTransform(-53.5,1.025);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AAQArIgYglIgKAKIAAAbIgPAAIAAhVIAPAAIAAAoIAIgKIAYgeIASAAIgfAmIAhAvg");
	this.shape_23.setTransform(-60.2,-0.075);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgQAgIAAg+IAOAAIAAAHQAFgIAIAAIAGABIAAANIgHgBQgJAAgCAIIAAAqg");
	this.shape_24.setTransform(-69.25,0.975);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_25.setTransform(-74.825,1.025);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_26.setTransform(-81.225,1.025);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_27.setTransform(-87.475,1.025);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgQAnQgHgFgFgJQgEgJgBgMIAAgGQAAgTAJgLQAKgLAPAAQAPAAAIAHQAJAHABAOIgPAAQgCgQgQAAQgJAAgEAHQgGAIAAANIAAAGQAAAOAGAHQAGAIAJAAQAMAAAEgFIAAgRIgSAAIAAgKIAhAAIAAAgQgEAGgJADQgIADgLAAQgJAAgJgFg");
	this.shape_28.setTransform(-94.9,-0.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-100.9,-9.2,201.8,18.4);


(lib.Tween1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape.setTransform(95.525,1.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_1.setTransform(88.725,2.225);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_2.setTransform(82.125,0.975);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAGAAQAMAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQADAAAEgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_3.setTransform(75.55,1.025);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgQAgIAAg+IAOAAIAAAHQAEgIAJAAIAGABIAAANIgHgBQgJAAgCAIIAAAqg");
	this.shape_4.setTransform(70.5,0.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgSAnQgIgFgEgKQgEgJgBgMIAAgEQABgMAEgKQAEgKAIgFQAJgFAJAAQALAAAHAFQAJAFAEAKQAEAJAAANIAAADQAAANgEAJQgEAKgJAFQgHAFgLAAQgJAAgJgFgAgOgXQgGAIABANIAAAEQgBAOAGAIQAFAIAJAAQAKAAAFgIQAGgHgBgPIAAgDQABgOgGgIQgGgHgJAAQgJAAgFAHg");
	this.shape_5.setTransform(63.95,-0.075);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgGIAQgTIARAAIgXAaIAaAlg");
	this.shape_6.setTransform(54.125,-0.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_7.setTransform(47.35,1.025);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgGAWIAAgjIgLAAIAAgLIALAAIAAgPIAMAAIAAAPIAMAAIAAALIgMAAIAAAiQAAAEACACQABABAEAAIAFAAIAAALIgJABQgPAAAAgSg");
	this.shape_8.setTransform(41.95,0.3);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgVAYQgHgJgBgPIAAAAQABgJAEgHQADgIAGgEQAIgEAHAAQANAAAIAIQAIAJAAANIAAADQAAAJgDAHQgDAIgIAEQgGAEgJAAQgMAAgJgJgAgKgPQgEAGAAAKQAAAJAEAGQAEAGAGAAQAIAAADgGQAEgGAAgKQAAgJgEgGQgEgFgHAAQgGAAgEAFg");
	this.shape_9.setTransform(36.65,1.025);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAQArIgZglIgJAKIAAAbIgPAAIAAhVIAPAAIAAAoIAIgKIAYgeIASAAIggAmIAiAvg");
	this.shape_10.setTransform(29.95,-0.075);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_11.setTransform(19.525,1.025);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgGIAQgTIARAAIgXAaIAaAlg");
	this.shape_12.setTransform(13.575,-0.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_13.setTransform(3.525,2.225);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_14.setTransform(-3.075,0.975);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_15.setTransform(-7.9,-0.175);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_16.setTransform(-12.775,0.975);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_17.setTransform(-19.425,1.075);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AARArIgaglIgJAKIAAAbIgPAAIAAhVIAPAAIAAAoIAIgKIAYgeIASAAIggAmIAiAvg");
	this.shape_18.setTransform(-26.05,-0.075);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgGIAQgTIARAAIgXAaIAaAlg");
	this.shape_19.setTransform(-35.975,-0.3);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgDACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_20.setTransform(-42.75,1.025);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgGAWIAAgjIgLAAIAAgLIALAAIAAgPIAMAAIAAAPIAMAAIAAALIgMAAIAAAiQABAEABACQABABAEAAIAFAAIAAALIgJABQgPAAAAgSg");
	this.shape_21.setTransform(-48.15,0.3);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgVAYQgHgJgBgPIAAAAQAAgJAFgHQADgIAHgEQAGgEAIAAQANAAAIAIQAIAJABANIAAADQgBAJgDAHQgDAIgIAEQgGAEgJAAQgMAAgJgJgAgKgPQgEAGAAAKQAAAJAEAGQAEAGAGAAQAIAAAEgGQADgGAAgKQAAgJgDgGQgFgFgHAAQgGAAgEAFg");
	this.shape_22.setTransform(-53.45,1.025);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AAQArIgZglIgJAKIAAAbIgPAAIAAhVIAPAAIAAAoIAIgKIAYgeIASAAIggAmIAiAvg");
	this.shape_23.setTransform(-60.15,-0.075);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IANAAIAAAHQAEgIAKAAIAEABIAAANIgFgBQgKAAgDAIIAAAqg");
	this.shape_24.setTransform(-69.2,0.975);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_25.setTransform(-74.775,1.025);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_26.setTransform(-81.175,1.025);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_27.setTransform(-87.425,1.025);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgPAnQgJgFgEgJQgEgJgBgMIAAgGQAAgTAKgLQAJgLAQAAQANAAAJAHQAIAHACAOIgOAAQgDgQgPAAQgKAAgFAHQgEAIgBANIAAAGQAAAOAGAHQAGAIAJAAQALAAAGgFIAAgRIgSAAIAAgKIAgAAIAAAgQgEAGgJADQgIADgKAAQgKAAgIgFg");
	this.shape_28.setTransform(-94.85,-0.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-100.8,-9.2,201.7,18.4);


(lib.target = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgDAeIAAg7IAHAAIAAA7g");
	this.shape.setTransform(7.225,-1.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgDAdIAAgqIAHAAIAAAqgAgCgVIgBgDIABgDIACgBIADABIABADIgBADIgDABIgCgBg");
	this.shape_1.setTransform(5.275,-1.375);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgHAUQgFgCgCgDQgCgEAAgDIAIAAQAAADACADQADACADAAQAEAAADgCQABAAAAgBQABAAAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBAAgBQAAAAgBgBQAAAAAAgBQgDgCgFgBQgFgBgDgBQgEgBgBgDQgBgCgBgCQABgGAEgDQAFgEAFAAQAHAAAFAEQAEAEABAFIgIAAQAAgDgCgCQgDgCgEAAQgCAAgDABQAAABgBABQAAAAAAABQgBAAAAABQAAAAAAABQAAABAAAAQAAABABAAQAAABAAAAQABABAAAAQACABAEABIAJADQAEABABACQACADAAAEQAAAFgFAEQgEADgIAAQgDAAgEgCg");
	this.shape_2.setTransform(2.2,-0.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgMATQgEgEAAgFQAAgIAFgCQAFgEAIAAIAHAAIAAgDQAAgEgDgCQgCgCgEAAQgDAAgDABQgCADAAADIgIAAQAAgDADgEQACgCAEgCQAEgCADAAQAHAAAFAEQAEADAAAHIAAASQAAAGABADIAAABIgHAAIgBgEQgFAFgGAAQgGAAgEgDgAgJAJQAAACACACQACACAEABQACgBADgCQADgBACgDIAAgIIgGAAQgMgBAAAJg");
	this.shape_3.setTransform(-2.025,-0.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAPAdIAAgbIgcAAIAAAbIgIAAIAAg5IAIAAIAAAZIAcAAIAAgZIAHAAIAAA5g");
	this.shape_4.setTransform(-7.05,-1.35);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFFFFF").ss(2,1,1).p("AqmjkIVNAAIAAHJI1NAAg");
	this.shape_5.setTransform(-0.85,-1.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(89,89,89,0.247)").s().p("AqlDlIAAnJIVLAAIAAHJg");
	this.shape_6.setTransform(-0.85,-1.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.target, new cjs.Rectangle(-69.7,-25.2,137.7,47.8), null);


(lib.RestoreIcon = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAEC/IgEgDIgBgFIgDgyIABgFIADgEIAFgCIAZgBQAtgDAhghQAkgjAAgyQAAgygkgkIgCgCQgggfgsgDIAAAAIgIAAQgxAAgkAkIAAABIgGAGIAvANQAEABACADQACAEgBAEQgBAEgEACIhwBAQgEACgEgBQgEgBgCgEIhBhwQgCgDABgEQABgEAEgCQADgCAEABIA6APQAMgTASgRIAAAAQA3g4BPgBIAKAAIABAAIABAAQBIAFA0A0QA4A4AABPQAABPg4A3IgBABQgzA0hIAEIgZABIgBABIgEgCgACgCAIAAABIABgCg");
	this.shape.setTransform(-0.006,0.0014);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21.3,-19.2,42.7,38.5);


(lib.materiBtn = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#004D92").s().p("AgMBlIAAiTIAYAAIAACTgAgKhLQgEgEAAgGQAAgHAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAHQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape.setTransform(36.175,-4.175);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#004D92").s().p("AgjBLIAAiTIAZAAIAAARQAMgTAXAAQAHAAAEACIAAAXIgNgBQgXAAgJAVIAABog");
	this.shape_1.setTransform(28.775,-1.625);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#004D92").s().p("AgrA5QgTgUAAghIAAgEQAAgVAJgSQAIgRAPgKQAPgKARAAQAdAAAQATQAQATAAAkIAAAKIhjAAQAAAVANAOQAMANASAAQANAAAJgGQAKgFAHgJIAPAMQgTAcglAAQgdAAgTgTgAgXgrQgKALgCATIBJAAIAAgCQgBgSgKgLQgJgLgQAAQgOAAgLAMg");
	this.shape_2.setTransform(15.975,-1.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#004D92").s().p("AgDBTQgJgLAAgSIAAhbIgbAAIAAgUIAbAAIAAgjIAYAAIAAAjIAcAAIAAAUIgcAAIAABbQAAAJAEAEQAEAFAIAAIAMgCIAAAVQgJACgKAAQgRAAgHgKg");
	this.shape_3.setTransform(3.425,-3.15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#004D92").s().p("AguBAQgOgMAAgTQAAgXARgMQASgNAfAAIAZAAIAAgLQgBgNgHgJQgJgHgOAAQgOAAgIAGQgJAIAAAJIgaAAQAAgLAIgKQAIgKANgHQAOgFAOgBQAaAAAPANQAOANABAXIAABCQAAAVAFAMIAAACIgbAAQgCgFgBgLQgSATgXgBQgWAAgOgMgAgjAdQAAAMAIAHQAIAGAMABQAMAAAKgHQAKgFAGgLIAAgeIgVAAQgtAAAAAbg");
	this.shape_4.setTransform(-8.3,-1.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#004D92").s().p("ABJBkIAAhOIAChSIhBCgIgTAAIhCigIAEBSIAABOIgbAAIAAjHIAiAAIBACiIBBiiIAiAAIAADHg");
	this.shape_5.setTransform(-28.15,-4.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#3498DB").s().p("AnHDZQg4AAgngnIgFgFQghglgCgxIAAipQAAg3AogoQAngnA4AAIOPAAQA3AAAoAnQAWAWAKAcQAHAVAAAYIAACpQAAAVgHAUQgJAYgSAVIgFAFQgoAng3AAg");
	this.shape_6.setTransform(-0.35,-3.875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#535353").s().p("AnHBcQg4AAgngnIgFgGQgagdgHglQgCgJAAgKIAAg1QACAxAhAlIAFAFQAnAmA4AAIOPAAQA3AAAogmIAFgFQASgVAJgYQAHgTAAgWIAAA1IAAAEIAAAFQgBAPgEAOIgCACQgJAZgSAUIgFAGQgoAng3AAg");
	this.shape_7.setTransform(-0.35,14);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#004D92").s().p("AgrA5QgTgUAAghIAAgEQAAgWAJgRQAIgRAPgKQAPgKARAAQAdABAQASQAQAUAAAjIAAAJIhjAAQAAAWANANQAMAOASAAQANAAAJgGQAKgFAHgJIAPAMQgTAcglABQgdAAgTgUgAgXgrQgKAKgCAUIBJAAIAAgBQgBgUgKgKQgJgLgQAAQgOAAgLAMg");
	this.shape_8.setTransform(15.975,0.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#004D92").s().p("AgDBTQgJgLAAgSIAAhbIgbAAIAAgTIAbAAIAAgkIAYAAIAAAkIAcAAIAAATIgcAAIAABbQAAAJAEAFQAEAEAIAAIAMgCIAAAUQgJADgKAAQgRAAgHgKg");
	this.shape_9.setTransform(3.425,-0.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#004D92").s().p("AguBBQgOgNAAgTQAAgXARgMQASgMAfAAIAZAAIAAgNQgBgNgHgIQgJgHgOgBQgOAAgIAHQgJAIAAAJIgaAAQAAgLAIgKQAIgLANgFQAOgHAOAAQAaAAAPANQAOANABAWIAABEQAAAUAFAMIAAACIgbAAQgCgEgBgLQgSARgXABQgWAAgOgMgAgjAeQAAAMAIAGQAIAHAMAAQAMgBAKgFQAKgHAGgKIAAgeIgVAAQgtAAAAAcg");
	this.shape_10.setTransform(-8.3,0.9);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#004D92").s().p("ABJBjIAAhNIAChTIhBCgIgTAAIhCifIAEBSIAABNIgbAAIAAjGIAiAAIBACiIBBiiIAiAAIAADGg");
	this.shape_11.setTransform(-28.15,-1.65);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#535353").s().p("AnHBQQg4AAgngnIgFgGQgagdgHglQgCgJAAgKIAAgdQACAyAhAjIAFAFQAnAoA4AAIOPAAQA3AAAogoIAFgFQASgUAJgYQAHgTAAgWIAAAdIAAAEIAAAFQgBAPgEAOIgCADQgJAYgSAUIgFAGQgoAng3AAg");
	this.shape_12.setTransform(-0.35,15.2);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#004D92").s().p("AgrA5QgTgUAAghIAAgEQAAgWAJgQQAIgSAPgKQAPgKARABQAdgBAQAUQAQATAAAjIAAAKIhjAAQAAAVANAOQAMANASAAQANAAAJgFQAKgGAHgJIAPAMQgTAdglAAQgdgBgTgTgAgXgsQgKALgCAVIBJAAIAAgDQgBgTgKgKQgJgLgQAAQgOAAgLALg");
	this.shape_13.setTransform(15.975,4.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#004D92").s().p("AgDBTQgJgKAAgTIAAhbIgbAAIAAgUIAbAAIAAgjIAYAAIAAAjIAcAAIAAAUIgcAAIAABbQAAAJAEAEQAEAFAIAAIAMgCIAAAVQgJACgKAAQgRAAgHgKg");
	this.shape_14.setTransform(3.425,2.45);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#004D92").s().p("AguBAQgOgMAAgTQAAgXARgMQASgNAfAAIAZAAIAAgLQgBgOgHgHQgJgJgOABQgOgBgIAIQgJAGAAAKIgaAAQAAgLAIgKQAIgKANgHQAOgFAOAAQAaAAAPAMQAOANABAXIAABCQAAAVAFAMIAAACIgbAAQgCgFgBgKQgSASgXAAQgWAAgOgNgAgjAdQAAAMAIAHQAIAGAMAAQAMABAKgHQAKgGAGgJIAAgfIgVAAQgtAAAAAbg");
	this.shape_15.setTransform(-8.3,4.1);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#004D92").s().p("ABJBkIAAhOIAChSIhBCgIgTAAIhCigIAEBSIAABOIgbAAIAAjGIAiAAIBAChIBBihIAiAAIAADGg");
	this.shape_16.setTransform(-28.15,1.55);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#3498DB").s().p("AnHDZQg4AAgngnIgFgFQgggjgCgvIgBgEIAAgDIAAimQAAg3AogoQAngnA4AAIOPAAQA3AAAoAnQAWAWAKAcQAHAVAAAYIAACpIAAABQAAAVgHATQgJAYgSAVIgFAFQgoAng3AAg");
	this.shape_17.setTransform(-0.35,1.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6,p:{y:-3.875}},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{y:-1.625}},{t:this.shape,p:{y:-4.175}}]}).to({state:[{t:this.shape_6,p:{y:-1.475}},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_1,p:{y:0.775}},{t:this.shape,p:{y:-1.775}}]},1).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_1,p:{y:3.975}},{t:this.shape,p:{y:1.425}}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.4,-25.6,118.1,49.1);


(lib.g3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._1();
	this.instance.setTransform(-55.3,-40.85,0.1944,0.2758);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g3, new cjs.Rectangle(-55.3,-40.8,110.6,81.6), null);


(lib.g2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._11();
	this.instance.setTransform(-55.3,-40.85,0.2071,0.1294);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g2, new cjs.Rectangle(-55.3,-40.8,110.6,81.6), null);


(lib.g1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._3();
	this.instance.setTransform(-56.65,-40.85,0.1775,0.1705);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g1, new cjs.Rectangle(-56.6,-40.8,113.2,81.6), null);


(lib.Path = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#606163").s().p("Ap/z/QEEAADvBlQDkBhCxCyQCxCwBiDmQBkDtAAEEQAAEEhkDuQhiDmixCxQixCxjkBhQjvBkkEAAg");
	this.shape.setTransform(64,127.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,128,255.9), null);


(lib.Tween10_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Eg/RAu4MAAAhdvMB+jAAAMAAABdvg");

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-405,-300,810,600);


(lib.Tween8_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#603AD8").s().p("EhB5AkqMAAAhJSMCDzAAAMAAABJSg");

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-421.8,-234.5,843.6,469.1);


(lib.Tween7_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#603AD8").s().p("EhB5AkpMAAAhJRMCDzAAAMAAABJRg");

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-421.8,-234.5,843.6,469.1);


(lib.targetcopy2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgIAdIAAgqIAQAAIAAAqgAgGgVQgBAAAAAAQgBgBAAAAQAAAAgBgBQAAAAAAgBQAAAAAAAAQABgBAAAAQAAgBABAAQAAAAABgBIAGgBIAHABQABABAAAAQABAAAAABQAAAAABABQAAAAAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAIgHABIgGgBg");
	this.shape.setTransform(47.525,-2.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAWAVIAAgbQAAgEgFgCQgFgDgKAAQgHAAgGADQgGACgEACIAAAdIgRAAIAAgpIAQAAIABAFQALgFARAAQAfAAABAOIAAAbg");
	this.shape_1.setTransform(40.175,-1.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgIAdIAAgqIAQAAIAAAqgAgGgVQgBAAAAAAQgBgBAAAAQAAAAgBgBQAAAAAAgBQAAAAAAAAQABgBAAAAQAAgBABAAQAAAAABgBIAGgBIAHABQABABAAAAQABAAAAABQAAAAABABQAAAAAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAIgHABIgGgBg");
	this.shape_2.setTransform(32.775,-2.475);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgSAUQgJgCgGgDQgFgDAAgEIARAAQABADAFADQAHACAJAAQAKAAAGgCQAFgCAAgCQAAgDgEgCQgGgCgMAAQgMgBgIgCQgHgBgEgDQgDgBgBgDQAAgGAKgDQALgEAPAAQARAAAKAEQAKAEAAAFIgRAAQAAgDgFgCQgHgCgIAAQgIAAgGABQgEADAAACQAAACAEACQAFACALAAIAVADQAIABAEACQADADAAAEQAAAFgLAEQgKADgRAAQgLAAgIgCg");
	this.shape_3.setTransform(25.6,-1.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgcAQQgNgGAAgJIAAgBQAAgFAGgGQAFgFAKgCQAKgDALAAQATAAALAGQALAFAAAKIAAACIhCAAQAAAGAJAEQAIAEALAAQAJAAAGgCQAGgBAFgDIAKADQgMAJgZAAQgTAAgMgGgAgPgMQgHADgBAGIAwAAIAAgBQgBgFgGgDQgGgDgLAAQgJAAgHADg");
	this.shape_4.setTransform(15.975,-1.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AAVAeIghgTIgLAEIAAAPIgQAAIAAg7IAQAAIAAAjIAJgEIAegOIAUAAIglARIAqAZg");
	this.shape_5.setTransform(6.9,-2.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgXAVIAAgpIARAAIAAAFQAHgGAPABIAIAAIAAAGIgIAAQgQABgGAFIAAAdg");
	this.shape_6.setTransform(-5.725,-1.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgcAQQgNgGAAgJIAAgBQAAgFAGgGQAFgFAKgCQAKgDALAAQATAAALAGQALAFAAAKIAAACIhCAAQAAAGAJAEQAIAEALAAQAJAAAGgCQAGgBAFgDIAKADQgMAJgZAAQgTAAgMgGgAgPgMQgHADgBAGIAwAAIAAgBQgBgFgGgDQgGgDgLAAQgJAAgHADg");
	this.shape_7.setTransform(-14.225,-1.7);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgTAUQgJgCgFgDQgFgDAAgEIARAAQAAADAGADQAHACAJAAQAKAAAFgCQAGgCABgCQgBgDgFgCQgFgCgMAAQgMgBgIgCQgIgBgDgDQgDgBgBgDQABgGAJgDQALgEAPAAQAQAAALAEQALAEgBAFIgQAAQgBgDgFgCQgHgCgIAAQgJAAgEABQgGADAAACQABACAEACQAFACAMAAIAUADQAIABADACQAEADAAAEQAAAFgLAEQgKADgRAAQgLAAgJgCg");
	this.shape_8.setTransform(-24.15,-1.7);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgcAQQgNgGAAgJIAAgBQAAgFAGgGQAFgFAKgCQAKgDALAAQATAAALAGQALAFAAAKIAAACIhCAAQAAAGAJAEQAIAEALAAQAJAAAGgCQAGgBAFgDIAKADQgMAJgZAAQgTAAgMgGgAgPgMQgHADgBAGIAwAAIAAgBQgBgFgGgDQgGgDgLAAQgJAAgHADg");
	this.shape_9.setTransform(-33.725,-1.7);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgYAaQgMgDgHgHQgGgGgBgHIAAgEQAAgNAOgHQAOgHAYAAQAVAAANAEQAMAFADAIIgSAAQgEgLgbAAQgQAAgJAFQgKAFAAAKIAAAEQAAAKALAFQAKAGAQAAIARgBQAIgBAEgCIAAgNIgeAAIAAgGIAwAAIAAAVQgHAEgMACQgMACgQAAQgPAAgNgDg");
	this.shape_10.setTransform(-45.25,-2.425);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#000000").ss(2,1,1).p("AqmjkIVNAAIAAHJI1NAAg");
	this.shape_11.setTransform(-0.85,-1.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("rgba(89,89,89,0.247)").s().p("AqlDlIAAnJIVLAAIAAHJg");
	this.shape_12.setTransform(-0.85,-1.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.targetcopy2, new cjs.Rectangle(-69.7,-25.2,137.7,47.8), null);


(lib.targetcopy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgHAeIAAg7IAPAAIAAA7g");
	this.shape.setTransform(18,-2.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgIAdIAAgqIAQAAIAAAqgAgGgVQgBAAAAAAQgBgBAAAAQAAAAgBgBQAAAAAAgBQAAAAAAAAQABgBAAAAQAAgBABAAQAAAAABgBIAGgBIAHABQABABAAAAQABAAAAABQAAAAABABQAAAAAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAIgHABIgGgBg");
	this.shape_1.setTransform(13.475,-2.475);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgTAUQgIgCgFgDQgGgDAAgEIARAAQAAADAHADQAGACAKAAQAJAAAFgCQAHgCAAgCQAAgDgGgCQgFgCgMAAQgNgBgHgCQgHgBgEgDQgDgBAAgDQAAgGAKgDQAKgEAPAAQAQAAALAEQALAEAAAFIgRAAQAAgDgHgCQgFgCgJAAQgJAAgFABQgEADgBACQAAACAFACQAFACAMAAIAUADQAHABAEACQAEADAAAEQAAAFgKAEQgLADgQAAQgLAAgKgCg");
	this.shape_2.setTransform(6.3,-1.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgfATQgJgFAAgEQAAgIAMgCQAMgDAUgBIAQAAIAAgDQAAgDgFgDQgGgCgJAAQgJAAgFABQgHACAAAEIgRAAQABgEAFgCQAFgEAJgCQAJgBAKAAQAQAAAKAEQAKADAAAHIAAASQAAAGADAEIAAAAIgRAAQgBgBgBgEQgMAGgPAAQgPAAgKgDgAgXAJQAAADAGABQAEACAJAAQAHAAAHgCQAHgBADgDIAAgIIgNAAQgeAAAAAIg");
	this.shape_3.setTransform(-3.5,-1.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AAhAcIAAgaIhBAAIAAAaIgSAAIAAg4IASAAIAAAZIBBAAIAAgZIASAAIAAA4g");
	this.shape_4.setTransform(-15.175,-2.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(2,1,1).p("AqmjkIVNAAIAAHJI1NAAg");
	this.shape_5.setTransform(-0.85,-1.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(89,89,89,0.247)").s().p("AqlDlIAAnJIVLAAIAAHJg");
	this.shape_6.setTransform(-0.85,-1.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.targetcopy, new cjs.Rectangle(-69.7,-25.2,137.7,47.8), null);


(lib.drag7G12copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap105();
	this.instance.setTransform(0,-3,0.4245,0.5645);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgQAWQgGgEAAgIIALAAQAAAEADADQACACAFAAQADgBADgBQADgCAAgDQABgFgHgCIgJgDQgKgDAAgJQABgHAGgFQAGgEAIAAQAIAAAGAEQAFAFAAAIIgMAAQAAgEgCgCQgCgDgEABQgDAAgCABQgDACAAAEQgBAEAGABIAKAEQAKADAAAJQgBAFgDAEQgDAEgFACQgFACgFAAQgJAAgFgGg");
	this.shape.setTransform(73.475,78.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgLAlIAJg0IALAAIgJA0gAABgYQAAgBgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQADgCADAAQAAAAABAAQAAAAABAAQAAAAABABQABAAAAABQABAAAAAAQAAABABAAQAAABAAABQAAAAAAABQAAABAAAAQAAABAAAAQgBABAAAAQAAABgBABQAAAAgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgCAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_1.setTransform(69.9,77.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgVAhQgEgHgBgJIAAgGIABgBQABgHADgGQADgHAFgDQAFgDAHAAQAHABAEAFIAFgbIAMAAIgNBKIgKAAIAAgFQgFAGgIAAQgIAAgEgFgAgKAAQgEAFAAAKQgBAGADAEQACADAEAAQAGABAFgHIAEgWQgCgGgHAAIAAAAQgGAAgEAGg");
	this.shape_2.setTransform(66.025,77.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgLAlIAJg0IALAAIgJA0gAABgYQAAgBgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQACgCAEAAQAAAAABAAQAAAAABAAQAAAAABABQABAAAAABQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQAAAAgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgCAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_3.setTransform(61.9,77.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgRAbIAJg0IAKAAIgBAGQAFgHAHAAIAFABIgBALIgFAAQgIgBgEAHIgFAjg");
	this.shape_4.setTransform(58.975,78.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgLAlIAJg0IALAAIgJA0gAABgYQAAgBgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQADgCADAAQAAAAABAAQAAAAABAAQAAAAABABQABAAAAABQABAAAAAAQAAABABAAQAAABAAABQAAAAAAABQAAABAAAAQAAABAAAAQgBABAAAAQAAABgBABQAAAAgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgCAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_5.setTransform(55.95,77.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgMAbIgKg0IAMAAIAFAkIAQgkIAMAAIgZA0g");
	this.shape_6.setTransform(52.525,78.6);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgMAYQgGgEgCgFQgCgGAAgHIAAgCQABgHAEgHQAEgGAGgDQAFgEAGABQAKAAAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgHIAGAHQgDAEgGADQgFACgGABQgGgBgFgDgAgJgEIAVAAIAAgBIAAgEQgBgEgCgCQgCgCgEAAQgIAAgEANg");
	this.shape_7.setTransform(44.7292,78.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgNAYQgFgDgCgHQgDgFABgIIAAgBQABgHAEgHQADgGAGgDQAGgEAGABQAJAAAFAFQAFAGAAAIIgLAAQAAgEgCgDQgCgDgFAAQgFAAgEAGQgEAGgBAJQAAAOAKAAQADAAADgCQADgDABgEIALAAQgBAFgDAFQgDAEgFACQgFACgFABQgHgBgEgDg");
	this.shape_8.setTransform(39.5607,78.6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgLAlIAJg0IALAAIgJA0gAABgYQAAgBgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQACgCAEAAQAAAAABAAQAAAAABAAQAAAAABABQABAAAAABQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQAAAAgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgCAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_9.setTransform(35.8,77.6);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AAHAbIAGgiIAAgDQgBgGgGAAQgGAAgFAGIgHAlIgLAAIAJg0IALAAIgBAGQAGgHAIAAQAIABADAFQAEAEgBAKIgGAhg");
	this.shape_10.setTransform(31.4781,78.55);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgRAYQgEgCgBgFQgCgDABgHIAGghIALAAIgGAhIAAAEQABAGAGAAQAGABAFgHIAHglIALAAIgJA0IgLAAIABgFQgFAGgJAAQgFAAgDgDg");
	this.shape_11.setTransform(26.3688,78.65);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgcAkIANhGIAsAAIgCAKIggAAIgEATIAcAAIgCAJIgbAAIgEAWIAgAAIgCAKg");
	this.shape_12.setTransform(21.05,77.7);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#E67E22").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_13.setTransform(45.05,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90.1,100.80000000000001);


(lib.drag7G11copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap103copy();
	this.instance.setTransform(90,-3,0.2823,0.7258,90);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgSAXQgEgEAAgHQABgJAGgDQAHgFALAAIAHABIABgFIAAgDQgBgFgGgBQgEAAgBACQgDADgBADIgMAAQABgFADgEQADgDAFgDQAFgCAFAAQAJABAFAFQAEAFAAAIIgEAYIgBAEIABAFIAAABIgMAAIAAgEQgHAFgGAAQgHABgFgFgAgGAEQgDACgBAFQAAADABACQACACAEAAQADAAACgCIAGgEIABgLIgFAAQgGAAgEADg");
	this.shape.setTransform(66.825,89.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgMAYQgGgDgCgGQgCgGAAgHIAAgCQABgHAEgGQAEgHAGgDQAFgDAGgBQAKABAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgGIAGAFQgDAFgGADQgFACgGAAQgGABgFgEgAgJgEIAVAAIAAgBIAAgEQgBgEgCgBQgCgDgEAAQgIAAgEANg");
	this.shape_1.setTransform(61.7792,89.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AAHAbIAGghIAAgEQgBgGgGAAQgGAAgFAHIgHAkIgLAAIAJg0IALAAIgBAHQAGgIAIAAQAIAAADAFQAEAGgBAJIgGAhg");
	this.shape_2.setTransform(56.1781,89.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgLAkIAJg0IALAAIgJA0gAABgZQAAAAgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAgBQADgCACAAQABAAABABQAAAAABAAQAAAAABABQABAAAAAAQAAABABAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAgBAAIgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBg");
	this.shape_3.setTransform(52.55,88.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgRAZQgEgDgBgEQgCgFABgFIAGgiIALAAIgGAiIAAADQABAGAGABQAGgBAFgGIAHglIALAAIgJA0IgLAAIABgFQgFAGgJAAQgFAAgDgCg");
	this.shape_4.setTransform(48.5688,89.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgSAjQgFgCgDgEIAGgHQAFAGAIAAQAFAAADgDQAEgEACgGIABgDQgHAGgGgBQgIABgEgGQgFgGAAgIIAAgHQABgIADgGQAEgHAFgDQAFgDAFgBQAJABAFAGIABgGIALAAIgJAzQgBAKgHAHQgIAFgJABQgGAAgFgDgAgFgWQgEAFgBAIIAAABIgBAGQABADACAEQACADAEAAQAGAAAFgGIAEgXQgDgFgGgBIgBAAQgFAAgDAFg");
	this.shape_5.setTransform(42.825,90.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AAHAbIAGghIAAgEQgBgGgGAAQgGAAgFAHIgHAkIgLAAIAJg0IALAAIgBAHQAGgIAIAAQAIAAADAFQAEAGgBAJIgGAhg");
	this.shape_6.setTransform(37.2281,89.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgSAXQgEgEAAgHQABgJAGgDQAHgFALAAIAHABIABgFIAAgDQgBgFgGgBQgEAAgBACQgDADgBADIgMAAQABgFADgEQADgDAFgDQAFgCAFAAQAJABAFAFQAEAFAAAIIgEAYIgBAEIABAFIAAABIgMAAIAAgEQgHAFgGAAQgHABgFgFgAgGAEQgDACgBAFQAAADABACQACACAEAAQADAAACgCIAGgEIABgLIgFAAQgGAAgEADg");
	this.shape_7.setTransform(31.975,89.35);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgQAXQgGgGAAgHIALAAQAAAEADACQACACAFAAQADAAADgBQADgCAAgDQABgFgHgCIgJgDQgKgDAAgJQABgHAGgEQAGgGAIAAQAIABAGAFQAFAEAAAHIgMAAQAAgDgCgCQgCgCgEgBQgDAAgCACQgDADAAACQgBAFAGACIAKADQAKADAAAJQgBAFgDAEQgDADgFACQgFACgFAAQgJAAgFgEg");
	this.shape_8.setTransform(26.875,89.35);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgSAXQgEgFAAgGQABgIAGgEQAHgFALAAIAHABIABgFIAAgDQgBgFgGgBQgEABgBACQgDACgBADIgMAAQABgFADgEQADgDAFgCQAFgCAFgBQAJABAFAFQAEAFAAAIIgEAXIgBAFIABAFIAAABIgMAAIAAgEQgHAFgGABQgHAAgFgFgAgGAEQgDADgBAEQAAADABACQACACAEAAQADAAACgCIAGgEIABgKIgFAAQgGAAgEACg");
	this.shape_9.setTransform(65.875,73.35);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgQAWQgGgEAAgIIALAAQAAAEADACQACACAFABQADAAADgCQADgCAAgDQABgFgHgCIgJgDQgKgDAAgJQABgHAGgFQAGgEAIgBQAIABAGAEQAFAFAAAHIgMAAQAAgDgCgCQgCgDgEAAQgDABgCACQgDACAAACQgBAFAGACIAKADQAKADAAAJQgBAFgDAEQgDADgFACQgFACgFABQgJgBgFgFg");
	this.shape_10.setTransform(60.775,73.35);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgaAkIABgJIACAAQAEAAADgBIAEgGIADgFIgJgzIAMAAIAFAkIAPgkIANAAIgeA9QgHAMgKAAIgGgBg");
	this.shape_11.setTransform(55.975,74.425);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AAHAlIAGghIAAgEQgBgFgGAAQgGAAgFAFIgHAlIgLAAIANhKIAKAAIgEAcQAGgGAIgBQAIABADAFQAEAFgBAJIgGAhg");
	this.shape_12.setTransform(50.6111,72.25);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgaAlIANhIIALAAIgBAFQAFgGAIAAQAFAAAEADQAEACACAFQACAFAAAFIgBAIQAAAHgEAGQgDAGgFAEQgFADgGAAQgHAAgFgGIgFAZgAgEgUIgEAWQACAGAGAAQAGAAAEgEQAEgEABgJIAAgEQAAgGgCgEQgCgDgEAAIgBAAQgGAAgEAGg");
	this.shape_13.setTransform(45.025,74.325);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgRAbIAJg0IAKAAIgBAGQAFgHAHAAIAFABIgBALIgFgBQgIABgEAGIgFAjg");
	this.shape_14.setTransform(41.075,73.3);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgSAXQgEgFAAgGQABgIAGgEQAHgFALAAIAHABIABgFIAAgDQgBgFgGgBQgEABgBACQgDACgBADIgMAAQABgFADgEQADgDAFgCQAFgCAFgBQAJABAFAFQAEAFAAAIIgEAXIgBAFIABAFIAAABIgMAAIAAgEQgHAFgGABQgHAAgFgFgAgGAEQgDADgBAEQAAADABACQACACAEAAQADAAACgCIAGgEIABgKIgFAAQgGAAgEACg");
	this.shape_15.setTransform(36.425,73.35);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AARAjIAEgXIAGgdIgbA0IgJAAIgLg2IgFAgIgDAWIgNAAIANhFIAPAAIALA1IAcg1IAQAAIgNBFg");
	this.shape_16.setTransform(29.75,72.45);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#E67E22").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_17.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


(lib.drag7G10copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap102copy();
	this.instance.setTransform(90,-3,0.3004,0.7259,90);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgEAFQAAAAgBgBQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAgDACgCQACgBACAAQADgBACACQACACAAACQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBgBAAg");
	this.shape.setTransform(67.275,80.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgaAlIANhIIALAAIgBAFQAFgGAIAAQAFAAAEADQAEACACAFQACAFAAAFIgBAIQAAAHgEAGQgDAGgFAEQgFADgGAAQgHAAgFgGIgFAZgAgEgUIgEAWQACAGAGAAQAGAAAEgEQAEgEABgJIAAgEQAAgGgCgEQgCgDgEAAIgBAAQgGAAgEAGg");
	this.shape_1.setTransform(63.225,79.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgQAWQgGgEAAgIIALAAQAAAEADADQACACAFAAQADgBADgBQADgCAAgDQABgFgHgCIgJgDQgKgDAAgJQABgHAGgFQAGgEAIAAQAIAAAGAEQAFAFAAAIIgMAAQAAgEgCgCQgCgDgEABQgDAAgCABQgDACAAAEQgBAEAGABIAKAEQAKADAAAJQgBAFgDAEQgDAEgFACQgFACgFAAQgJAAgFgGg");
	this.shape_2.setTransform(58.225,78.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgQAWQgGgEAAgIIALAAQAAAEADADQACACAFAAQADgBADgBQADgCAAgDQABgFgHgCIgJgDQgKgDAAgJQABgHAGgFQAGgEAIAAQAIAAAGAEQAFAFAAAIIgMAAQAAgEgCgCQgCgDgEABQgDAAgCABQgDACAAAEQgBAEAGABIAKAEQAKADAAAJQgBAFgDAEQgDAEgFACQgFACgFAAQgJAAgFgGg");
	this.shape_3.setTransform(50.725,78.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgLAlIAJg0IALAAIgJA0gAABgYQAAgBgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQADgCADAAQAAAAABAAQAAAAABAAQAAAAABABQABAAAAABQAAAAABAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAABQAAAAgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgCAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_4.setTransform(47.15,77.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgMAYQgGgEgCgFQgCgGAAgHIAAgCQABgHAEgHQAEgGAGgDQAFgEAGABQAKAAAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgHIAGAHQgDAEgGADQgFACgGABQgGgBgFgDgAgJgEIAVAAIAAgBIAAgEQgBgEgCgCQgCgCgEAAQgIAAgEANg");
	this.shape_5.setTransform(43.2292,78.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgRAbIAJg0IAKAAIgBAGQAFgHAHAAIAFABIgBALIgFAAQgIgBgEAHIgFAjg");
	this.shape_6.setTransform(39.025,78.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgMAYQgGgEgCgFQgCgGAAgHIAAgCQABgHAEgHQAEgGAGgDQAFgEAGABQAKAAAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgHIAGAHQgDAEgGADQgFACgGABQgGgBgFgDgAgJgEIAVAAIAAgBIAAgEQgBgEgCgCQgCgCgEAAQgIAAgEANg");
	this.shape_7.setTransform(34.5792,78.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AAKAkIgWgzIgJAzIgMAAIANhGIAMAAIAUAyIAJgyIAMAAIgMBGg");
	this.shape_8.setTransform(28.55,77.7);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#E67E22").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_9.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


(lib.drag7G9copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap101copy();
	this.instance.setTransform(0,-3,0.4523,0.5645);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgQAWQgGgEAAgIIALAAQAAAEADADQACACAFAAQADgBADgBQADgCAAgDQABgFgHgCIgJgDQgKgDAAgJQABgHAGgFQAGgEAIAAQAIAAAGAEQAFAFAAAIIgMAAQAAgEgCgCQgCgDgEABQgDAAgCABQgDACAAAEQgBAEAGABIAKAEQAKADAAAJQgBAFgDAEQgDAEgFACQgFACgFAAQgJAAgFgGg");
	this.shape.setTransform(72.475,78.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgSAXQgEgEAAgHQABgIAGgEQAHgFALAAIAHAAIABgDIAAgEQgBgFgGAAQgEAAgBABQgDADgBADIgMAAQABgFADgDQADgFAFgCQAFgBAFAAQAJAAAFAFQAEAFAAAIIgEAYIgBAEIABAGIAAABIgMAAIAAgGQgHAHgGAAQgHgBgFgEgAgGAEQgDACgBAFQAAADABACQACACAEAAQADAAACgBIAGgGIABgJIgFAAQgGAAgEACg");
	this.shape_1.setTransform(67.275,78.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgaAlIANhIIALAAIgBAFQAFgGAIAAQAFAAAEADQAEACACAFQACAFAAAFIgBAIQAAAHgEAGQgDAGgFAEQgFADgGAAQgHAAgFgGIgFAZgAgEgUIgEAWQACAGAGAAQAGAAAEgEQAEgEABgJIAAgEQAAgGgCgEQgCgDgEAAIgBAAQgGAAgEAGg");
	this.shape_2.setTransform(61.675,79.575);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgLAlIAJg0IALAAIgJA0gAABgYQgBgBAAAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQACgCACAAQABAAABAAQAAAAABAAQAAAAABABQAAAAABABQAAAAABAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAABQAAAAgBAAQAAAAgBABQAAAAgBAAQgBAAgBAAIgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_3.setTransform(58.15,77.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AAGAmIgKgXIgHAGIgDARIgLAAIANhLIALAAIgHAqIAEgEIAQgPIAOAAIgXAVIAPAfg");
	this.shape_4.setTransform(54.425,77.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgSAjQgFgDgDgEIAGgHQAFAHAIAAQAFAAADgDQAEgEACgFIABgEQgHAFgGABQgIgBgEgFQgFgGAAgIIAAgHQABgIADgHQAEgFAFgEQAFgEAFABQAJAAAFAGIABgFIALAAIgJAyQgBALgHAFQgIAHgJgBQgGABgFgDgAgFgWQgEAFgBAIIAAABIgBAGQABADACADQACAEAEAAQAGAAAFgHIAEgVQgDgHgGABIgBgBQgFAAgDAFg");
	this.shape_5.setTransform(46.325,79.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AAHAbIAGgiIAAgDQgBgGgGAAQgGAAgFAGIgHAlIgLAAIAJg0IALAAIgBAGQAGgHAIAAQAIABADAFQAEAEgBAKIgGAhg");
	this.shape_6.setTransform(40.7281,78.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgLAlIAJg0IALAAIgJA0gAABgYQgBgBAAAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQABgCADAAQABAAABAAQAAAAABAAQAAAAABABQAAAAABABQAAAAABAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAABQAAAAgBAAQAAAAgBABQAAAAgBAAQgBAAgBAAIgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_7.setTransform(37.1,77.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgNAYQgFgDgCgHQgDgFABgIIAAgBQABgHAEgHQADgGAGgDQAGgEAGABQAJAAAFAFQAFAGAAAIIgLAAQAAgEgCgDQgCgDgFAAQgFAAgEAGQgEAGgBAJQAAAOAKAAQADAAADgCQADgDABgEIALAAQgBAFgDAFQgDAEgFACQgFACgFABQgHgBgEgDg");
	this.shape_8.setTransform(33.2107,78.6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgSAXQgEgEAAgHQABgIAGgEQAHgFALAAIAHAAIABgDIAAgEQgBgFgGAAQgEAAgBABQgDADgBADIgMAAQABgFADgDQADgFAFgCQAFgBAFAAQAJAAAFAFQAEAFAAAIIgEAYIgBAEIABAGIAAABIgMAAIAAgGQgHAHgGAAQgHgBgFgEgAgGAEQgDACgBAFQAAADABACQACACAEAAQADAAACgBIAGgGIABgJIgFAAQgGAAgEACg");
	this.shape_9.setTransform(27.825,78.6);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgQAiQgFgEgEgFQgCgHgBgHIACgOQACgKAEgIQAEgHAIgEQAGgEAIABQALAAAFAGQAHAGAAAMIgMAAQAAgIgDgDQgDgDgGAAQgHgBgFAGQgGAGgCALIgBAGIAAAFIABAKQABAEADACQACACAFABQANAAADgPIANAAQgDALgIAHQgIAGgLABQgGAAgFgDg");
	this.shape_10.setTransform(22.35,77.7);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#E67E22").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_11.setTransform(45.05,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90.1,100.80000000000001);


(lib.Path_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#606163").s().p("Ap/z/QEEAADvBlQDkBhCxCyQCxCwBiDmQBkDtAAEEQAAEEhkDuQhiDmixCxQixCxjkBhQjvBkkEAAg");
	this.shape_1.setTransform(64,127.95);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1, new cjs.Rectangle(0,0,128,255.9), null);


(lib.drop7G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AATA5IAAg0QAAgHgFgEQgEgDgIAAQgNAAgHAJIAAA5IgWAAIAAhxIAWAAIAAAqQAMgKAPAAQAgAAAAAcIAAA1g");
	this.shape.setTransform(113.4,81.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgKA4IAAhQIAVAAIAABQgAgIgmQgEgDABgEQgBgEAEgCQADgEAFAAQAGAAADAEQADACAAAEQAAAEgDADQgDADgGAAQgFAAgDgDg");
	this.shape_1.setTransform(105.8,81.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgUAmQgKgDgFgHQgFgGAAgHIAWAAQAAAGAFAEQAGADAIAAQAJAAAFgCQAEgDAAgFQAAgEgFgDQgFgCgKgCQgLgCgIgDQgRgGAAgMQAAgLALgHQALgHAPAAQASAAALAIQALAHAAALIgWAAQAAgFgFgEQgEgDgJAAQgGAAgEADQgFACAAAFQAAAEAEACQAEADANACQANACAHAEQAIACADAEQAEAFAAAGQAAALgLAHQgLAHgSAAQgLAAgKgEg");
	this.shape_2.setTransform(98.5,83.425);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgZApIAAhQIAVAAIABAJQAGgKAPAAIAIABIAAARIgJAAQgPgBgFAKIAAA2g");
	this.shape_3.setTransform(90.8,83.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgdAfQgOgLAAgSIAAgCQAAgLAGgKQAGgJAKgFQALgGALAAQAVAAALALQALAKAAAUIAAAGIhAAAQABAKAHAGQAHAFAKAAQAPAAAKgKIAMAKQgGAHgKAEQgKAEgMAAQgUAAgNgLgAgNgVQgFAFgCAKIAqAAIAAgCQgBgJgFgEQgGgFgJAAQgIAAgGAFg");
	this.shape_4.setTransform(82.125,83.425);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgVAwIgBAIIgUAAIAAhxIAVAAIAAAqQALgKAPAAQARAAALALQAKALAAATIAAABQAAATgKALQgKALgSAAQgQAAgKgKgAgVAAIAAAhQAGAKAPAAQAKAAAFgGQAGgHAAgMIAAgDQAAgNgGgFQgFgHgKAAQgPAAgGAKg");
	this.shape_5.setTransform(71.9,81.825);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgKA4IAAhQIAVAAIAABQgAgIgmQgDgDgBgEQABgEADgCQADgEAFAAQAGAAADAEQAEACAAAEQAAAEgEADQgDADgGAAQgFAAgDgDg");
	this.shape_6.setTransform(59.3,81.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AggAuQgLgLABgUQgBgRALgLQALgMASAAQAOAAAKAJIAAgpIAWAAIAABxIgUAAIgBgIQgKAKgQAAQgQAAgMgMgAgOgDQgGAGAAAOQAAAMAGAHQAGAHAKAAQANAAAGgKIAAghQgGgKgNAAQgKAAgGAHg");
	this.shape_7.setTransform(51.4,81.825);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AggAjQgKgHAAgKQAAgNAMgGQAMgHAVAAIAOAAIAAgFQAAgGgFgEQgEgEgIAAQgHAAgFADQgFADAAAFIgWAAQAAgHAFgFQAFgGAKgDQAJgEAKAAQASAAAKAIQALAHAAAMIAAAkQAAALAEAGIAAABIgXAAIgDgHQgKAJgPAAQgPAAgJgHgAgNAGQgGADAAAHQAAAFAEADQAEADAHAAQAGAAAGgCQAGgDADgEIAAgPIgMAAQgMAAgGADg");
	this.shape_8.setTransform(41.225,83.425);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgUBGIAAgOIAIABQALAAAAgKIAAhXIAVAAIAABWQAAANgHAGQgIAHgNAAIgMgCgAAAg2QgDgDAAgEQAAgEADgDQADgDAGAAQAGAAADADQADADAAAEQAAAEgDADQgDADgGAAQgGAAgDgDg");
	this.shape_9.setTransform(32.875,83.525);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AATApIAAgzQAAgIgEgEQgEgDgKAAQgMAAgHAKIAAA4IgWAAIAAhQIAVAAIAAAKQAMgLAQAAQAgAAAAAdIAAA0g");
	this.shape_10.setTransform(26.25,83.35);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgdAfQgOgLAAgSIAAgCQAAgLAGgKQAGgJAKgFQALgGALAAQAVAAALALQALAKAAAUIAAAGIhAAAQABAKAHAGQAHAFAKAAQAPAAAKgKIAMAKQgGAHgKAEQgKAEgMAAQgUAAgNgLgAgNgVQgFAFgCAKIAqAAIAAgCQgBgJgFgEQgGgFgJAAQgIAAgGAFg");
	this.shape_11.setTransform(16.125,83.425);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AAwApIAAg0QAAgHgEgEQgEgDgKAAQgIAAgEADQgFADgCAGIAAA2IgVAAIAAg0QgBgOgRAAQgOAAgFAJIAAA5IgWAAIAAhQIAVAAIAAAJQALgKASAAQATAAAHAMQALgMATAAQARAAAIAIQAIAHAAAOIAAA0g");
	this.shape_12.setTransform(2.825,83.35);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgLAcIAAgtIgRAAIAAgNIARAAIAAgUIAVAAIAAAUIASAAIAAANIgSAAIAAAsQABAFACACQACACAGAAIAHgBIAAAOIgOACQgZAAAAgXg");
	this.shape_13.setTransform(250.9,60.925);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AggAiQgIgJAAgOIAAgzIAWAAIAAAzQAAAPAQAAQAPAAAGgJIAAg5IAWAAIAABQIgVAAIAAgIQgLAJgQAAQgRAAgIgHg");
	this.shape_14.setTransform(242.75,61.9);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AggAjQgKgHAAgKQAAgNAMgGQAMgHAVAAIAOAAIAAgFQAAgGgFgEQgEgEgIAAQgHAAgFADQgFADAAAFIgWAAQAAgHAFgFQAFgGAKgDQAJgEAKAAQASAAAKAIQALAHAAAMIAAAkQAAALAEAGIAAABIgXAAIgDgHQgKAJgPAAQgPAAgJgHgAgNAGQgGADAAAHQAAAFAEADQAEADAHAAQAGAAAGgCQAGgDADgEIAAgPIgMAAQgMAAgGADg");
	this.shape_15.setTransform(232.475,61.825);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgKA5IAAhxIAVAAIAABxg");
	this.shape_16.setTransform(225,60.15);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AggAjQgKgHAAgKQAAgNAMgGQAMgHAVAAIAOAAIAAgFQAAgGgFgEQgEgEgIAAQgHAAgFADQgFADAAAFIgWAAQAAgHAFgFQAFgGAKgDQAJgEAKAAQASAAAKAIQALAHAAAMIAAAkQAAALAEAGIAAABIgXAAIgDgHQgKAJgPAAQgPAAgJgHgAgNAGQgGADAAAHQAAAFAEADQAEADAHAAQAGAAAGgCQAGgDADgEIAAgPIgMAAQgMAAgGADg");
	this.shape_17.setTransform(204.225,61.825);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgVA1QgLgDgFgGIAKgLQAKAKAQAAQAKAAAGgFQAGgFAAgKIAAgFQgJAJgPAAQgSAAgLgLQgLgMAAgTQAAgSALgLQALgMASAAQAQAAAKAKIABgIIAUAAIAABNQAAAQgMAJQgNAJgTAAQgLAAgKgEgAgOgiQgHAHAAAOQAAAMAHAGQAGAHAJAAQAOAAAGgJIAAgjQgGgJgNAAQgKAAgGAHg");
	this.shape_18.setTransform(193.625,63.325);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgVA1QgLgDgFgGIAKgLQAKAKAQAAQAKAAAGgFQAGgFAAgKIAAgFQgJAJgPAAQgSAAgLgLQgLgMAAgTQAAgSALgLQALgMASAAQAQAAAKAKIABgIIAUAAIAABNQAAAQgMAJQgNAJgTAAQgLAAgKgEgAgOgiQgHAHAAAOQAAAMAHAGQAGAHAJAAQAOAAAGgJIAAgjQgGgJgNAAQgKAAgGAHg");
	this.shape_19.setTransform(182.975,63.325);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AATApIAAgzQAAgIgEgEQgEgDgKAAQgMAAgHAKIAAA4IgWAAIAAhQIAVAAIAAAKQAMgLAQAAQAgAAAAAdIAAA0g");
	this.shape_20.setTransform(172.6,61.75);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgKA4IAAhQIAVAAIAABQgAgIgmQgDgDAAgEQAAgEADgCQADgEAFAAQAGAAADAEQAEACAAAEQAAAEgEADQgDADgGAAQgFAAgDgDg");
	this.shape_21.setTransform(165.05,60.3);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AATA5IAAg0QAAgHgFgEQgEgDgIAAQgNAAgHAJIAAA5IgWAAIAAhxIAWAAIAAAqQAMgKAPAAQAfAAABAcIAAA1g");
	this.shape_22.setTransform(157.4,60.15);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgdAfQgOgLAAgSIAAgCQAAgLAGgKQAGgJAKgFQALgGALAAQAVAAALALQALAKAAAUIAAAGIhAAAQABAKAHAGQAHAFAKAAQAPAAAKgKIAMAKQgGAHgKAEQgKAEgMAAQgUAAgNgLgAgNgVQgFAFgCAKIAqAAIAAgCQgBgJgFgEQgGgFgJAAQgIAAgGAFg");
	this.shape_23.setTransform(147.275,61.825);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgUAmQgKgDgFgHQgFgGAAgHIAVAAQABAGAFAEQAGADAIAAQAJAAAEgCQAFgDAAgFQAAgEgFgDQgFgCgKgCQgMgCgHgDQgRgGAAgMQAAgLALgHQALgHAQAAQARAAAMAIQAKAHAAALIgWAAQAAgFgFgEQgFgDgHAAQgHAAgFADQgEACAAAFQAAAEAEACQAEADAMACQANACAIAEQAHACAFAEQADAFAAAGQAAALgLAHQgMAHgRAAQgMAAgJgEg");
	this.shape_24.setTransform(137.25,61.825);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgOAPQAGgGACgGQACgEAAgFIAAgOIATAAIAAANQAAAHgFAIQgFAHgHAGg");
	this.shape_25.setTransform(116.725,66.2);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgUAmQgJgDgGgHQgFgGAAgHIAWAAQAAAGAFAEQAGADAIAAQAJAAAEgCQAFgDAAgFQAAgEgFgDQgFgCgKgCQgLgCgIgDQgRgGAAgMQAAgLALgHQALgHAQAAQARAAALAIQALAHAAALIgWAAQAAgFgFgEQgFgDgHAAQgHAAgEADQgFACAAAFQAAAEAEACQAEADAMACQAOACAHAEQAIACADAEQAEAFAAAGQAAALgLAHQgLAHgSAAQgLAAgKgEg");
	this.shape_26.setTransform(110.1,61.825);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgKA5IAAhxIAVAAIAABxg");
	this.shape_27.setTransform(102.9,60.15);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AggAuQgKgLgBgUQABgRAKgLQALgMASAAQAPAAAJAJIAAgpIAXAAIAABxIgUAAIgBgIQgKAKgQAAQgSAAgLgMgAgOgDQgGAGAAAOQAAAMAGAHQAFAHAKAAQAOAAAGgKIAAghQgGgKgOAAQgKAAgFAHg");
	this.shape_28.setTransform(95,60.225);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgLAcIAAgtIgQAAIAAgNIAQAAIAAgUIAVAAIAAAUIASAAIAAANIgSAAIAAAsQAAAFACACQADACAFAAIAIgBIAAAOIgPACQgYAAAAgXg");
	this.shape_29.setTransform(73.3,60.925);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AggAiQgIgJAAgOIAAgzIAWAAIAAAzQAAAPAQAAQAPAAAGgJIAAg5IAWAAIAABQIgVAAIAAgIQgKAJgSAAQgPAAgJgHg");
	this.shape_30.setTransform(65.15,61.9);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AggAjQgKgHAAgKQAAgNAMgGQAMgHAVAAIAOAAIAAgFQAAgGgFgEQgEgEgIAAQgHAAgFADQgFADAAAFIgWAAQAAgHAFgFQAFgGAKgDQAJgEAKAAQASAAAKAIQALAHAAAMIAAAkQAAALAEAGIAAABIgXAAIgDgHQgKAJgPAAQgPAAgJgHgAgNAGQgGADAAAHQAAAFAEADQAEADAHAAQAGAAAGgCQAGgDADgEIAAgPIgMAAQgMAAgGADg");
	this.shape_31.setTransform(54.875,61.825);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgKA5IAAhxIAVAAIAABxg");
	this.shape_32.setTransform(47.4,60.15);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AggAiQgIgJAAgOIAAgzIAWAAIAAAzQAAAPAQAAQAPAAAGgJIAAg5IAWAAIAABQIgVAAIAAgIQgKAJgSAAQgPAAgJgHg");
	this.shape_33.setTransform(26.45,61.9);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AggAjQgKgHAAgKQAAgNAMgGQAMgHAVAAIAOAAIAAgFQAAgGgFgEQgEgEgIAAQgHAAgFADQgFADAAAFIgWAAQAAgHAFgFQAFgGAKgDQAJgEAKAAQASAAAKAIQALAHAAAMIAAAkQAAALAEAGIAAABIgXAAIgDgHQgKAJgPAAQgPAAgJgHgAgNAGQgGADAAAHQAAAFAEADQAEADAHAAQAGAAAGgCQAGgDADgEIAAgPIgMAAQgMAAgGADg");
	this.shape_34.setTransform(16.175,61.825);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgLAcIAAgtIgRAAIAAgNIARAAIAAgUIAWAAIAAAUIARAAIAAANIgRAAIAAAsQAAAFACACQACACAGAAIAIgBIAAAOIgQACQgYAAAAgXg");
	this.shape_35.setTransform(7.75,60.925);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AggAjQgKgHAAgKQAAgNAMgGQAMgHAVAAIAOAAIAAgFQAAgGgFgEQgEgEgIAAQgHAAgFADQgFADAAAFIgWAAQAAgHAFgFQAFgGAKgDQAJgEAKAAQASAAAKAIQALAHAAAMIAAAkQAAALAEAGIAAABIgXAAIgDgHQgKAJgPAAQgPAAgJgHgAgNAGQgGADAAAHQAAAFAEADQAEADAHAAQAGAAAGgCQAGgDADgEIAAgPIgMAAQgMAAgGADg");
	this.shape_36.setTransform(-0.275,61.825);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AATApIAAgzQAAgHgEgEQgEgEgKAAQgMAAgHAKIAAA4IgWAAIAAhPIAVAAIABAJQALgLAQAAQAgAAAAAdIAAA0g");
	this.shape_37.setTransform(249,40.1);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgKA3IAAhPIAVAAIAABPgAgIgmQgEgCAAgFQAAgEAEgDQADgCAFAAQAGAAAEACQACADAAAEQAAAFgCACQgEADgGAAQgFAAgDgDg");
	this.shape_38.setTransform(241.4,38.65);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AggAjQgKgHAAgKQAAgNAMgGQAMgHAVAAIAOAAIAAgFQAAgGgFgEQgEgEgIAAQgHAAgFADQgFADAAAFIgWAAQAAgHAFgFQAFgGAKgDQAJgEAKAAQASAAAKAIQALAHAAAMIAAAkQAAALAEAGIAAABIgXAAIgDgHQgKAJgPAAQgPAAgJgHgAgNAGQgGADAAAHQAAAFAEADQAEADAHAAQAGAAAGgCQAGgDADgEIAAgPIgMAAQgMAAgGADg");
	this.shape_39.setTransform(233.925,40.175);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgKA5IAAhxIAVAAIAABxg");
	this.shape_40.setTransform(226.45,38.5);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AATApIAAgzQAAgHgEgEQgEgEgJAAQgNAAgGAKIAAA4IgXAAIAAhPIAVAAIABAJQAKgLASAAQAfAAAAAdIAAA0g");
	this.shape_41.setTransform(207.2,40.1);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AggAjQgKgHAAgKQAAgNAMgGQAMgHAVAAIAOAAIAAgFQAAgGgFgEQgEgEgIAAQgHAAgFADQgFADAAAFIgWAAQAAgHAFgFQAFgGAKgDQAJgEAKAAQASAAAKAIQALAHAAAMIAAAkQAAALAEAGIAAABIgXAAIgDgHQgKAJgPAAQgPAAgJgHgAgNAGQgGADAAAHQAAAFAEADQAEADAHAAQAGAAAGgCQAGgDADgEIAAgPIgMAAQgMAAgGADg");
	this.shape_42.setTransform(196.925,40.175);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AAVAoIgVg2IgUA2IgTAAIgbhPIAWAAIARA2IAUg2IAQAAIAUA2IAQg2IAVAAIgbBPg");
	this.shape_43.setTransform(184.8,40.175);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgdAfQgOgLAAgSIAAgCQAAgLAGgKQAGgJAKgFQALgGALAAQAVAAALALQALAKAAAUIAAAGIhAAAQABAKAHAGQAHAFAKAAQAPAAAKgKIAMAKQgGAHgKAEQgKAEgMAAQgUAAgNgLgAgNgVQgFAFgCAKIAqAAIAAgCQgBgJgFgEQgGgFgJAAQgIAAgGAFg");
	this.shape_44.setTransform(172.925,40.175);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AATA5IAAg0QAAgHgFgDQgEgEgIAAQgNAAgGAJIAAA5IgXAAIAAhxIAXAAIAAArQAKgLAQAAQAfAAABAdIAAA0g");
	this.shape_45.setTransform(162.55,38.5);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AATApIAAgzQAAgHgEgEQgFgEgIAAQgNAAgGAKIAAA4IgXAAIAAhPIAVAAIAAAJQALgLASAAQAfAAAAAdIAAA0g");
	this.shape_46.setTransform(140.5,40.1);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AggAjQgKgHAAgKQAAgNAMgGQAMgHAVAAIAOAAIAAgFQAAgGgFgEQgEgEgIAAQgHAAgFADQgFADAAAFIgWAAQAAgHAFgFQAFgGAKgDQAJgEAKAAQASAAAKAIQALAHAAAMIAAAkQAAALAEAGIAAABIgXAAIgDgHQgKAJgPAAQgPAAgJgHgAgNAGQgGADAAAHQAAAFAEADQAEADAHAAQAGAAAGgCQAGgDADgEIAAgPIgMAAQgMAAgGADg");
	this.shape_47.setTransform(130.225,40.175);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgZApIAAhPIAVAAIAAAJQAIgLAOAAIAIABIAAARIgJgBQgQAAgEAKIAAA2g");
	this.shape_48.setTransform(122.25,40.1);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AggAeQgNgLAAgTIAAAAQAAgLAGgKQAGgJAKgFQAKgGANAAQAUAAANALQAMAKABASIAAADQAAAMgFAJQgGAJgLAGQgKAFgOAAQgUAAgMgMgAgQgTQgHAHAAANQAAAMAHAHQAGAHAKAAQALAAAHgHQAGgHAAgNQAAgMgGgHQgHgHgLAAQgKAAgGAHg");
	this.shape_49.setTransform(113.175,40.175);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgLAcIAAgtIgRAAIAAgNIARAAIAAgUIAWAAIAAAUIARAAIAAANIgRAAIAAAsQAAAFACACQACACAGAAIAIgBIAAAOIgQACQgYAAAAgXg");
	this.shape_50.setTransform(104.5,39.275);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AggAeQgNgLAAgTIAAAAQAAgLAGgKQAGgJAKgFQAKgGANAAQAUAAANALQAMAKABASIAAADQAAAMgFAJQgGAJgLAGQgKAFgOAAQgUAAgMgMgAgQgTQgHAHAAANQAAAMAHAHQAGAHAKAAQALAAAHgHQAGgHAAgNQAAgMgGgHQgHgHgLAAQgKAAgGAHg");
	this.shape_51.setTransform(96.325,40.175);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AASA5IgdgiIgKAIIAAAaIgWAAIAAhxIAWAAIAABAIAHgHIAbgXIAbAAIglAgIApAvg");
	this.shape_52.setTransform(86.675,38.5);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AggAjQgKgHAAgKQAAgNAMgGQAMgHAVAAIAOAAIAAgFQAAgGgFgEQgEgEgIAAQgHAAgFADQgFADAAAFIgWAAQAAgHAFgFQAFgGAKgDQAJgEAKAAQASAAAKAIQALAHAAAMIAAAkQAAALAEAGIAAABIgXAAIgDgHQgKAJgPAAQgPAAgJgHgAgNAGQgGADAAAHQAAAFAEADQAEADAHAAQAGAAAGgCQAGgDADgEIAAgPIgMAAQgMAAgGADg");
	this.shape_53.setTransform(64.425,40.175);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgUAmQgKgDgFgHQgFgGAAgHIAVAAQABAGAFAEQAGADAIAAQAJAAAEgCQAFgDAAgFQAAgEgFgDQgFgCgKgCQgMgCgHgDQgRgGAAgMQAAgLALgHQALgHAQAAQARAAAMAIQAKAHAAALIgWAAQAAgFgFgEQgFgDgHAAQgHAAgFADQgEACAAAFQAAAEAEACQAEADAMACQANACAIAEQAHACAFAEQADAFAAAGQAAALgLAHQgMAHgRAAQgMAAgJgEg");
	this.shape_54.setTransform(54.45,40.175);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgKA3IAAhPIAVAAIAABPgAgIgmQgEgCABgFQgBgEAEgDQADgCAFAAQAGAAADACQADADAAAEQAAAFgDACQgDADgGAAQgFAAgDgDg");
	this.shape_55.setTransform(47.3,38.65);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AgUAmQgKgDgFgHQgFgGAAgHIAWAAQAAAGAFAEQAGADAIAAQAJAAAFgCQAEgDAAgFQAAgEgFgDQgFgCgKgCQgLgCgIgDQgRgGAAgMQAAgLALgHQALgHAPAAQASAAALAIQALAHAAALIgWAAQAAgFgFgEQgEgDgJAAQgGAAgEADQgFACAAAFQAAAEAEACQAEADANACQANACAHAEQAIACADAEQAEAFAAAGQAAALgLAHQgMAHgRAAQgLAAgKgEg");
	this.shape_56.setTransform(40,40.175);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AgXAHIAAgNIAvAAIAAANg");
	this.shape_57.setTransform(32.05,39.6);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AggAjQgKgHAAgKQAAgNAMgGQAMgHAVAAIAOAAIAAgFQAAgGgFgEQgEgEgIAAQgHAAgFADQgFADAAAFIgWAAQAAgHAFgFQAFgGAKgDQAJgEAKAAQASAAAKAIQALAHAAAMIAAAkQAAALAEAGIAAABIgXAAIgDgHQgKAJgPAAQgPAAgJgHgAgNAGQgGADAAAHQAAAFAEADQAEADAHAAQAGAAAGgCQAGgDADgEIAAgPIgMAAQgMAAgGADg");
	this.shape_58.setTransform(23.925,40.175);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgUAmQgKgDgFgHQgFgGAAgHIAVAAQABAGAFAEQAGADAIAAQAJAAAEgCQAFgDAAgFQAAgEgFgDQgFgCgKgCQgMgCgHgDQgRgGAAgMQAAgLALgHQALgHAQAAQARAAAMAIQAKAHAAALIgWAAQAAgFgFgEQgFgDgHAAQgHAAgFADQgEACAAAFQAAAEAEACQAEADAMACQANACAIAEQAHACAFAEQADAFAAAGQAAALgLAHQgMAHgRAAQgMAAgJgEg");
	this.shape_59.setTransform(13.95,40.175);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgKA3IAAhPIAVAAIAABPgAgIgmQgDgCgBgFQABgEADgDQADgCAFAAQAGAAAEACQADADAAAEQAAAFgDACQgEADgGAAQgFAAgDgDg");
	this.shape_60.setTransform(6.75,38.65);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgUAmQgKgDgFgHQgFgGAAgHIAVAAQABAGAGAEQAFADAIAAQAJAAAEgCQAFgDAAgFQAAgEgFgDQgFgCgKgCQgMgCgHgDQgRgGAAgMQAAgLALgHQALgHAPAAQATAAALAIQAKAHAAALIgWAAQAAgFgFgEQgEgDgJAAQgGAAgFADQgEACAAAFQAAAEAEACQAEADANACQAMACAIAEQAHACAFAEQADAFAAAGQAAALgLAHQgMAHgRAAQgMAAgJgEg");
	this.shape_61.setTransform(-0.55,40.175);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AgOAPQAGgGACgGQACgEAAgFIAAgOIATAAIAAANQAAAHgFAIQgFAHgHAGg");
	this.shape_62.setTransform(251.875,22.9);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AgdAfQgOgLAAgSIAAgCQAAgLAGgKQAGgJAKgFQALgGALAAQAVAAALALQALAKAAAUIAAAGIhAAAQABAKAHAGQAHAFAKAAQAPAAAKgKIAMAKQgGAHgKAEQgKAEgMAAQgUAAgNgLgAgNgVQgFAFgCAKIAqAAIAAgCQgBgJgFgEQgGgFgJAAQgIAAgGAFg");
	this.shape_63.setTransform(245.175,18.525);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AgUAmQgJgDgGgHQgFgGAAgHIAVAAQABAGAGAEQAFADAIAAQAJAAAFgCQAEgDAAgFQAAgEgFgDQgFgCgKgCQgLgCgIgDQgRgGAAgMQAAgLALgHQALgHAPAAQATAAALAIQAKAHAAALIgWAAQAAgFgFgEQgEgDgJAAQgGAAgFADQgEACAAAFQAAAEAEACQAFADAMACQAMACAIAEQAHACAEAEQAEAFAAAGQAAALgLAHQgMAHgRAAQgLAAgKgEg");
	this.shape_64.setTransform(235.15,18.525);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AATApIAAgzQAAgIgEgEQgEgDgKAAQgMAAgHAKIAAA4IgWAAIAAhQIAVAAIAAAKQAMgLAQAAQAgAAAAAdIAAA0g");
	this.shape_65.setTransform(225.15,18.45);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AgdAfQgOgLAAgSIAAgCQAAgLAGgKQAGgJAKgFQALgGALAAQAVAAALALQALAKAAAUIAAAGIhAAAQABAKAHAGQAHAFAKAAQAPAAAKgKIAMAKQgGAHgKAEQgKAEgMAAQgUAAgNgLgAgNgVQgFAFgCAKIAqAAIAAgCQgBgJgFgEQgGgFgJAAQgIAAgGAFg");
	this.shape_66.setTransform(214.975,18.525);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AgrA4IAAhuIAVAAIABAJQAJgLARAAQARAAALAMQALAKAAAUIAAABQAAASgLALQgLALgRAAQgQAAgJgIIAAAlgAgUggIAAAjQAFAJAPAAQAJABAGgIQAGgFAAgPQAAgMgGgGQgFgIgKAAQgPAAgFAJg");
	this.shape_67.setTransform(204.8,20);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AgUAmQgKgDgFgHQgFgGAAgHIAVAAQABAGAGAEQAFADAIAAQAJAAAEgCQAFgDAAgFQAAgEgFgDQgFgCgKgCQgMgCgHgDQgRgGAAgMQAAgLALgHQALgHAQAAQARAAAMAIQAKAHAAALIgWAAQAAgFgFgEQgFgDgHAAQgHAAgFADQgEACAAAFQAAAEAEACQAEADAMACQANACAIAEQAHACAFAEQADAFAAAGQAAALgLAHQgMAHgRAAQgMAAgJgEg");
	this.shape_68.setTransform(194.4,18.525);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2C3E50").s().p("AggAiQgIgJAAgOIAAgzIAWAAIAAAzQAAAPAQAAQAPAAAGgJIAAg5IAWAAIAABQIgVAAIAAgIQgLAJgQAAQgRAAgIgHg");
	this.shape_69.setTransform(184.35,18.6);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2C3E50").s().p("AgUAmQgJgDgGgHQgFgGAAgHIAVAAQABAGAFAEQAGADAIAAQAJAAAEgCQAFgDAAgFQAAgEgFgDQgFgCgKgCQgMgCgHgDQgRgGAAgMQAAgLALgHQALgHAQAAQARAAAMAIQAKAHAAALIgWAAQAAgFgFgEQgFgDgHAAQgHAAgFADQgEACAAAFQAAAEAEACQAEADAMACQANACAIAEQAHACAFAEQADAFAAAGQAAALgLAHQgLAHgSAAQgMAAgJgEg");
	this.shape_70.setTransform(174.25,18.525);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2C3E50").s().p("AATApIAAgzQAAgIgEgEQgEgDgKAAQgMAAgGAKIAAA4IgXAAIAAhQIAVAAIABAKQAKgLASAAQAeAAABAdIAAA0g");
	this.shape_71.setTransform(157.8,18.45);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2C3E50").s().p("AggAjQgKgHAAgKQAAgNAMgGQAMgHAVAAIAOAAIAAgFQAAgGgFgEQgEgEgIAAQgHAAgFADQgFADAAAFIgWAAQAAgHAFgFQAFgGAKgDQAJgEAKAAQASAAAKAIQALAHAAAMIAAAkQAAALAEAGIAAABIgXAAIgDgHQgKAJgPAAQgPAAgJgHgAgNAGQgGADAAAHQAAAFAEADQAEADAHAAQAGAAAGgCQAGgDADgEIAAgPIgMAAQgMAAgGADg");
	this.shape_72.setTransform(147.525,18.525);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#2C3E50").s().p("AASA5IgdgjIgKAJIAAAaIgWAAIAAhxIAWAAIAABBIAHgHIAbgZIAbAAIglAhIApAvg");
	this.shape_73.setTransform(138.175,16.85);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#2C3E50").s().p("AggAjQgKgHAAgKQAAgNAMgGQAMgHAVAAIAOAAIAAgFQAAgGgFgEQgEgEgIAAQgHAAgFADQgFADAAAFIgWAAQAAgHAFgFQAFgGAKgDQAJgEAKAAQASAAAKAIQALAHAAAMIAAAkQAAALAEAGIAAABIgXAAIgDgHQgKAJgPAAQgPAAgJgHgAgNAGQgGADAAAHQAAAFAEADQAEADAHAAQAGAAAGgCQAGgDADgEIAAgPIgMAAQgMAAgGADg");
	this.shape_74.setTransform(127.525,18.525);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#2C3E50").s().p("AAwApIAAg0QAAgHgEgEQgEgDgKAAQgIAAgEADQgFADgCAGIAAA2IgVAAIAAg0QgBgOgRAAQgOAAgFAJIAAA5IgWAAIAAhQIAVAAIAAAJQALgKASAAQATAAAHAMQALgMATAAQARAAAIAIQAIAHAAAOIAAA0g");
	this.shape_75.setTransform(114.325,18.45);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#2C3E50").s().p("AgdAfQgOgLAAgSIAAgCQAAgLAGgKQAGgJAKgFQALgGALAAQAVAAALALQALAKAAAUIAAAGIhAAAQABAKAHAGQAHAFAKAAQAPAAAKgKIAMAKQgGAHgKAEQgKAEgMAAQgUAAgNgLgAgNgVQgFAFgCAKIAqAAIAAgCQgBgJgFgEQgGgFgJAAQgIAAgGAFg");
	this.shape_76.setTransform(101.225,18.525);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#2C3E50").s().p("AgqA4IAAhuIAUAAIABAJQAJgLAQAAQASAAALAMQALAKgBAUIAAABQABASgLALQgLALgRAAQgQAAgKgIIAAAlgAgVggIAAAjQAHAJANAAQAKABAGgIQAGgFAAgPQAAgMgGgGQgGgIgKAAQgNAAgHAJg");
	this.shape_77.setTransform(91,20);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#2C3E50").s().p("AgKA4IAAhQIAVAAIAABQgAgIgmQgEgDAAgEQAAgEAEgCQADgEAFAAQAGAAAEAEQACACAAAEQAAAEgCADQgEADgGAAQgFAAgDgDg");
	this.shape_78.setTransform(76.7,17);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#2C3E50").s().p("AATApIAAgzQAAgIgEgEQgEgDgJAAQgNAAgGAKIAAA4IgXAAIAAhQIAVAAIABAKQAKgLASAAQAfAAAAAdIAAA0g");
	this.shape_79.setTransform(69.05,18.45);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#2C3E50").s().p("AgKA4IAAhQIAVAAIAABQgAgIgmQgDgDAAgEQAAgEADgCQADgEAFAAQAGAAADAEQAEACAAAEQAAAEgEADQgDADgGAAQgFAAgDgDg");
	this.shape_80.setTransform(61.45,17);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#2C3E50").s().p("AATApIAAgzQAAgIgEgEQgEgDgKAAQgMAAgHAKIAAA4IgWAAIAAhQIAVAAIABAKQALgLAQAAQAgAAAAAdIAAA0g");
	this.shape_81.setTransform(47.4,18.45);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#2C3E50").s().p("AggAjQgKgHAAgKQAAgNAMgGQAMgHAVAAIAOAAIAAgFQAAgGgFgEQgEgEgIAAQgHAAgFADQgFADAAAFIgWAAQAAgHAFgFQAFgGAKgDQAJgEAKAAQASAAAKAIQALAHAAAMIAAAkQAAALAEAGIAAABIgXAAIgDgHQgKAJgPAAQgPAAgJgHgAgNAGQgGADAAAHQAAAFAEADQAEADAHAAQAGAAAGgCQAGgDADgEIAAgPIgMAAQgMAAgGADg");
	this.shape_82.setTransform(37.125,18.525);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#2C3E50").s().p("AAVAoIgVg2IgUA2IgSAAIgbhPIAVAAIAQA2IAUg2IAQAAIAVA2IAQg2IAWAAIgbBPg");
	this.shape_83.setTransform(25,18.525);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#2C3E50").s().p("AgdAfQgOgLAAgSIAAgCQAAgLAGgKQAGgJAKgFQALgGALAAQAVAAALALQALAKAAAUIAAAGIhAAAQABAKAHAGQAHAFAKAAQAPAAAKgKIAMAKQgGAHgKAEQgKAEgMAAQgUAAgNgLgAgNgVQgFAFgCAKIAqAAIAAgCQgBgJgFgEQgGgFgJAAQgIAAgGAFg");
	this.shape_84.setTransform(13.125,18.525);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#2C3E50").s().p("AAeA2IAAgwIg6AAIAAAwIgYAAIAAhrIAYAAIAAAtIA6AAIAAgtIAXAAIAABrg");
	this.shape_85.setTransform(1.3,17.15);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,2.031,-161.1,-88.3)).s().p("A5LNzIAA7mMAyXAAAIAAbmg");
	this.shape_86.setTransform(128.65,54.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop7G5, new cjs.Rectangle(-32.6,-34.2,322.5,176.7), null);


(lib.drop7G4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgWB0IAAiGIgWAAIAAgbIAWAAIAAgOQAAgbANgPQAMgOAYAAQAJAAAJACIgBAcIgMAAQgXAAAAAbIAAANIAdAAIAAAbIgdAAIAACGg");
	this.shape.setTransform(243,89.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgPBwIAAihIAfAAIAAChgAgMhNQgFgGAAgIQAAgJAFgFQAEgGAIAAQAJAAAEAGQAFAFAAAJQAAAIgFAGQgEAFgJAAQgIAAgEgFg");
	this.shape_1.setTransform(234.425,89.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgRA4IAAhbIgXAAIAAgbIAXAAIAAgnIAgAAIAAAnIAZAAIAAAbIgZAAIAABZQAAAKADAEQADAEAJAAIALgBIAAAcQgLADgLAAQgjAAgBgug");
	this.shape_2.setTransform(226.15,90.85);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AAaBzIgphGIgPARIAAA1IggAAIAAjlIAgAAIAACEIAKgOIAngyIAmAAIg1BCIA7Bfg");
	this.shape_3.setTransform(215.75,89.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AguBDQgMgQAAgdIAAhoIAgAAIAABoQAAAfAXAAQAWAAAIgTIAAh0IAgAAIAAChIgeAAIgBgPQgOASgZABQgXAAgMgQg");
	this.shape_4.setTransform(200.25,92.8);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AguBdQgQgWAAgoQAAgkAQgWQAPgYAaAAQAVABAOARIAAhSIAhAAIAADkIgdAAIgCgQQgOATgYABQgZAAgPgYgAgVgGQgJANAAAcQAAAYAJAOQAIAOAPAAQATAAAJgUIAAhEQgIgTgUgBQgPAAgIAPg");
	this.shape_5.setTransform(184.775,89.4);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgvA+QgTgXABgnIAAAAQgBgYAJgTQAIgTAPgKQAPgLATAAQAdAAASAVQASAVABAjIAAAHQAAAYgHAUQgIASgQAKQgPALgUAAQgdAAgSgWgAgYgoQgKAOAAAbQABAaAIAOQAKAOAPAAQAQAAAKgPQAJgOAAgaQAAgZgJgPQgKgOgQABQgPgBgJAOg");
	this.shape_6.setTransform(169.7,92.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AglBSIAAihIAfAAIABASQAKgUAVgBQAHAAAFACIAAAjIgOgCQgWAAgGAUIAABtg");
	this.shape_7.setTransform(157.85,92.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("Ag+BxIAAjfIAeAAIABARQAOgUAYAAQAaAAAPAXQAPAWAAAnIAAACQAAAlgPAWQgQAWgZABQgXAAgOgSIAABMgAgehAIAABGQAJAUAUAAQAOAAAJgOQAJgNAAgdQAAgYgJgOQgIgPgPAAQgUABgJASg");
	this.shape_8.setTransform(145.125,95.6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgrA/QgTgWAAglIAAgEQAAgXAIgUQAJgSAPgLQAPgLARAAQAdAAAQAVQAQAVAAAnIAAANIhdAAQACAVAKAMQAKALAPAAQAWAAAOgUIARATQgIAOgOAIQgPAIgSAAQgdAAgTgVgAgTgrQgIAKgCATIA8AAIAAgCQgBgTgHgJQgIgKgNABQgMAAgJAKg");
	this.shape_9.setTransform(130.05,92.65);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AglBSIAAihIAfAAIABASQAKgUAVgBQAHAAAEACIAAAjIgMgCQgXAAgGAUIAABtg");
	this.shape_10.setTransform(118.5,92.5);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgiAPIAAgdIBFAAIAAAdg");
	this.shape_11.setTransform(108.625,91.475);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AAbBSIAAhnQAAgQgGgHQgGgIgNAAQgTAAgJAVIAABxIggAAIAAihIAeAAIABAUQAQgXAZAAQAsAAABA7IAABpg");
	this.shape_12.setTransform(96.675,92.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgvA+QgTgXABgnIAAAAQgBgYAJgTQAIgTAPgKQAQgLASAAQAdAAASAVQASAVABAjIAAAHQAAAYgIAUQgIASgPAKQgPALgUAAQgdAAgSgWgAgYgoQgKAOAAAbQAAAaAJAOQAKAOAPAAQARAAAJgPQAIgOABgaQgBgZgIgPQgKgOgQABQgPgBgJAOg");
	this.shape_13.setTransform(81.4,92.65);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AAbBSIAAhnQAAgQgGgHQgGgIgNAAQgTAAgJAVIAABxIggAAIAAihIAeAAIABAUQAQgXAZAAQAsAAABA7IAABpg");
	this.shape_14.setTransform(66.175,92.5);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AguBDQgNgQAAgdIAAhoIAhAAIAABoQAAAfAWAAQAXAAAIgTIAAh0IAgAAIAAChIgeAAIgBgPQgOASgZABQgYAAgLgQg");
	this.shape_15.setTransform(44.3,92.8);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AguBdQgQgWAAgoQAAgkAQgWQAPgYAaAAQAVABAOARIAAhSIAhAAIAADkIgdAAIgCgQQgOATgYABQgZAAgPgYgAgVgGQgJANAAAcQAAAYAJAOQAIAOAPAAQATAAAJgUIAAhEQgIgTgUgBQgPAAgIAPg");
	this.shape_16.setTransform(28.825,89.4);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgPBwIAAihIAfAAIAAChgAgMhNQgFgGAAgIQAAgJAFgFQAEgGAIAAQAJAAAEAGQAFAFAAAJQAAAIgFAGQgEAFgJAAQgIAAgEgFg");
	this.shape_17.setTransform(18.025,89.575);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgNBRIgyihIAiAAIAdBzIAfhzIAhAAIgyChg");
	this.shape_18.setTransform(7.875,92.65);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgPBwIAAihIAfAAIAAChgAgMhNQgFgGAAgIQAAgJAFgFQAEgGAIAAQAJAAAEAGQAFAFAAAJQAAAIgFAGQgEAFgJAAQgIAAgEgFg");
	this.shape_19.setTransform(-2.275,89.575);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AguBdQgQgWAAgoQAAgkAQgWQAPgYAaAAQAVABAOARIAAhSIAhAAIAADkIgdAAIgCgQQgOATgYABQgZAAgPgYgAgVgGQgJANAAAcQAAAYAJAOQAIAOAPAAQATAAAJgUIAAhEQgIgTgUgBQgPAAgIAPg");
	this.shape_20.setTransform(-13.725,89.4);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AAbBSIAAhnQAAgQgGgHQgGgIgNAAQgTAAgJAVIAABxIggAAIAAihIAeAAIABAUQAQgXAZAAQAsAAABA7IAABpg");
	this.shape_21.setTransform(-28.575,92.5);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgPBwIAAihIAfAAIAAChgAgMhNQgFgGAAgIQAAgJAFgFQAEgGAIAAQAJAAAEAGQAFAFAAAJQAAAIgFAGQgEAFgJAAQgIAAgEgFg");
	this.shape_22.setTransform(-39.575,89.575);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgyB2IBLjrIAZAAIhKDrg");
	this.shape_23.setTransform(293.6,49.125);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgrA+QgTgWAAgkIAAgEQAAgXAIgUQAJgSAPgMQAPgKARAAQAdAAAQAVQAQAVAAAnIAAANIhcAAQABAVAKALQALAMAOAAQAXAAAOgUIARASQgJAPgOAIQgPAIgRAAQgeAAgTgWgAgTgrQgIAKgCATIA8AAIAAgDQgBgSgHgKQgIgJgOAAQgLAAgJALg");
	this.shape_24.setTransform(281.4,51);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AAaBzIgqhGIgOARIAAA1IggAAIAAjlIAgAAIAACEIALgOIAmgyIAmAAIg0BDIA6Beg");
	this.shape_25.setTransform(267.8,47.6);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgwA9QgRgXgBgmIAAgBQAAgXAJgTQAIgUAPgKQAQgKASAAQAdAAASAVQASAVACAjIAAAHQAAAZgJASQgHAUgQAJQgPALgUAAQgdAAgTgXgAgYgnQgJAOAAAaQgBAZAKAPQAJAOAPAAQARAAAIgOQAJgPAAgbQAAgYgJgOQgJgOgQgBQgPABgJAOg");
	this.shape_26.setTransform(252.1,51);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgQA4IAAhbIgYAAIAAgbIAYAAIAAgnIAfAAIAAAnIAZAAIAAAbIgZAAIAABZQAAAKADAEQADAEAJAAIALgCIAAAcQgLAEgKAAQglAAABgug");
	this.shape_27.setTransform(239.6,49.2);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AA1BtIgQgyIhJAAIgQAyIgjAAIBJjZIAdAAIBJDZgAgbAcIA3AAIgchag");
	this.shape_28.setTransform(226.375,48.2);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AAbBTIAAhpQAAgPgGgHQgGgIgNABQgTgBgJAVIAAByIggAAIAAihIAeAAIABATQAQgXAZAAQAsAAABA7IAABqg");
	this.shape_29.setTransform(169.325,50.85);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgvBGQgNgOAAgVQgBgZASgNQAQgOAfAAIAUAAIAAgLQAAgMgGgHQgHgIgMAAQgKAAgIAGQgGAGAAAKIghAAQAAgNAIgMQAIgMANgGQAOgHAQAAQAZAAAOAOQAPAOABAbIAABHQAAAXAFANIAAACIggAAQgCgFgCgKQgQASgVAAQgWAAgNgOgAgUAMQgIAHgBANQAAAKAHAHQAGAGAKAAQAJAAAIgFQAIgGAFgJIAAgeIgSAAQgQAAgKAHg");
	this.shape_30.setTransform(154.45,51);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AguBdQgQgXAAgmQAAglAQgWQAPgYAaAAQAVAAAOASIAAhTIAhAAIAADmIgdAAIgCgRQgOATgYAAQgZAAgPgXgAgVgHQgJANAAAdQAAAYAJAOQAIAOAPAAQATAAAJgUIAAhEQgIgTgUAAQgPAAgIANg");
	this.shape_31.setTransform(139.125,47.75);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgWB1IAAiGIgWAAIAAgbIAWAAIAAgPQAAgbANgPQAMgOAYAAQAJgBAJADIgBAcIgMgBQgXAAAAAbIAAAPIAdAAIAAAbIgdAAIAACGg");
	this.shape_32.setTransform(86.85,47.45);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgPBwIAAihIAfAAIAAChgAgMhNQgFgGAAgIQAAgJAFgFQAEgGAIAAQAJAAAEAGQAFAFAAAJQAAAIgFAGQgEAFgJAAQgIAAgEgFg");
	this.shape_33.setTransform(78.275,47.925);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgRA4IAAhbIgXAAIAAgbIAXAAIAAgnIAgAAIAAAnIAZAAIAAAbIgZAAIAABZQAAAKADAEQADAEAJAAIALgCIAAAcQgLAEgLAAQgjAAgBgug");
	this.shape_34.setTransform(70,49.2);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AAaBzIgphGIgPARIAAA1IggAAIAAjlIAgAAIAACEIAKgOIAngyIAmAAIg1BDIA7Beg");
	this.shape_35.setTransform(59.6,47.6);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AguBDQgMgQAAgdIAAhnIAgAAIAABnQAAAfAWAAQAXAAAIgTIAAhzIAgAAIAAChIgeAAIgBgQQgOASgZAAQgXAAgMgPg");
	this.shape_36.setTransform(44.1,51.15);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AguBdQgQgXAAgmQAAglAQgWQAPgYAaAAQAVAAAOASIAAhTIAhAAIAADmIgdAAIgCgRQgOATgYAAQgZAAgPgXgAgVgHQgJANAAAdQAAAYAJAOQAIAOAPAAQATAAAJgUIAAhEQgIgTgUAAQgPAAgIANg");
	this.shape_37.setTransform(28.625,47.75);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgvA9QgTgXABgmIAAgBQgBgXAJgTQAIgUAPgKQAPgKATAAQAdAAASAVQASAVABAjIAAAHQAAAZgHASQgIAUgQAJQgPALgUAAQgdAAgSgXgAgYgnQgKAOAAAaQABAZAIAPQAKAOAPAAQAQAAAKgOQAJgPAAgbQAAgYgJgOQgKgOgQgBQgPABgJAOg");
	this.shape_38.setTransform(13.55,51);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AglBTIAAihIAfAAIABASQAKgWAVAAQAHAAAFADIAAAiIgOgCQgWAAgGAUIAABug");
	this.shape_39.setTransform(1.7,50.85);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("Ag+ByIAAjfIAeAAIABAQQAOgTAYgBQAaABAPAWQAPAWAAAnIAAACQAAAlgPAWQgQAXgZgBQgXAAgOgRIAABNgAgehAIAABHQAJASAUABQAOgBAJgOQAJgNAAgcQAAgYgJgPQgIgNgPAAQgUAAgJASg");
	this.shape_40.setTransform(-11.075,53.95);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgrA+QgTgWAAgkIAAgEQAAgXAIgUQAJgSAOgMQAQgKARAAQAdAAAQAVQAQAVAAAnIAAANIhdAAQACAVAKALQAKAMAPAAQAWAAAOgUIARASQgIAPgOAIQgPAIgSAAQgdAAgTgWgAgTgrQgIAKgCATIA8AAIAAgDQgBgSgIgKQgHgJgNAAQgMAAgJALg");
	this.shape_41.setTransform(-26.1,51);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AglBTIAAihIAfAAIABASQAKgWAVAAQAHAAAEADIAAAiIgMgCQgXAAgGAUIAABug");
	this.shape_42.setTransform(-37.65,50.85);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AguBDQgMgQAAgdIAAhoIAgAAIAABoQAAAfAXAAQAWAAAIgTIAAh0IAhAAIAAChIgfAAIgBgPQgOATgZAAQgXAAgMgQg");
	this.shape_43.setTransform(291.75,9.45);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AguBdQgQgXAAgnQAAgkAQgWQAPgXAagBQAVABAOASIAAhTIAhAAIAADkIgdAAIgCgRQgOAVgYAAQgZAAgPgYgAgVgGQgJAMAAAdQAAAYAJAOQAIAOAPAAQATAAAJgUIAAhEQgIgTgUgBQgPAAgIAPg");
	this.shape_44.setTransform(276.275,6.05);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgPBwIAAihIAfAAIAAChgAgMhNQgFgGAAgIQAAgJAFgFQAEgGAIAAQAJAAAEAGQAFAFAAAJQAAAIgFAGQgEAFgJAAQgIAAgEgFg");
	this.shape_45.setTransform(265.475,6.225);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgNBRIgyihIAiAAIAdBzIAfhzIAhAAIgyChg");
	this.shape_46.setTransform(255.325,9.3);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AgPBwIAAihIAfAAIAAChgAgMhNQgFgGAAgIQAAgJAFgFQAEgGAIAAQAJAAAEAGQAFAFAAAJQAAAIgFAGQgEAFgJAAQgIAAgEgFg");
	this.shape_47.setTransform(245.175,6.225);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AguBdQgQgXAAgnQAAgkAQgWQAPgXAagBQAVABAOASIAAhTIAhAAIAADkIgdAAIgCgRQgOAVgYAAQgZAAgPgYgAgVgGQgJAMAAAdQAAAYAJAOQAIAOAPAAQATAAAJgUIAAhEQgIgTgUgBQgPAAgIAPg");
	this.shape_48.setTransform(233.725,6.05);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AAbBSIAAhnQAAgQgGgHQgGgIgNAAQgTAAgJAVIAABxIggAAIAAihIAeAAIABATQAQgVAZgBQAsABABA5IAABqg");
	this.shape_49.setTransform(218.875,9.15);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgPBwIAAihIAfAAIAAChgAgMhNQgFgGAAgIQAAgJAFgFQAEgGAIAAQAJAAAEAGQAFAFAAAJQAAAIgFAGQgEAFgJAAQgIAAgEgFg");
	this.shape_50.setTransform(207.875,6.225);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AgxB2IBKjrIAaAAIhLDrg");
	this.shape_51.setTransform(167.75,7.425);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AgrA/QgTgXAAgkIAAgEQAAgXAJgUQAHgTAPgKQAPgLASAAQAdAAAQAVQAQAWAAAmIAAANIhdAAQACAVALAMQAJALAQAAQAVAAAPgUIARATQgJAOgOAIQgPAIgSAAQgdAAgTgVgAgSgrQgJAKgCATIA8AAIAAgCQgBgTgIgJQgHgKgOABQgMAAgHAKg");
	this.shape_52.setTransform(155.55,9.3);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AAaBzIgphGIgPARIAAA1IggAAIAAjlIAgAAIAACEIAKgPIAngxIAmAAIg1BCIA7Bfg");
	this.shape_53.setTransform(141.95,5.9);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgvA+QgSgXAAgmIAAgBQAAgYAIgTQAIgUAPgJQAPgLATAAQAdAAASAVQASAWACAiIAAAHQgBAYgHAUQgJASgPAKQgPALgUAAQgdAAgSgWgAgYgoQgKAOAAAbQABAaAIAOQAKAOAPAAQAQAAAJgPQAKgOgBgaQABgZgKgPQgJgOgQABQgPgBgJAOg");
	this.shape_54.setTransform(126.25,9.3);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgRA4IAAhbIgXAAIAAgbIAXAAIAAgnIAgAAIAAAnIAZAAIAAAbIgZAAIAABaQAAAJADAEQADAEAJAAIALgBIAAAcQgLADgKAAQglAAAAgug");
	this.shape_55.setTransform(113.75,7.5);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AgPBwIAAihIAfAAIAAChgAgMhNQgFgGAAgIQAAgJAFgFQAEgGAIAAQAJAAAEAGQAFAFAAAJQAAAIgFAGQgEAFgJAAQgIAAgEgFg");
	this.shape_56.setTransform(106.075,6.225);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("Ag+BxIAAjfIAeAAIABARQAOgUAYAAQAaAAAPAXQAPAWAAAnIAAACQAAAlgPAWQgQAWgZABQgXAAgOgSIAABMgAgehAIAABGQAJAUAUgBQAOAAAJgNQAJgNAAgdQAAgYgJgOQgIgPgPAAQgUABgJASg");
	this.shape_57.setTransform(95.225,12.25);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("Ag+BtIAAjZIB8AAIAAAeIhbAAIAAA9IBOAAIAAAdIhOAAIAABDIBcAAIAAAeg");
	this.shape_58.setTransform(80.2,6.5);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgvBGQgNgOAAgUQAAgaAQgNQASgOAeAAIAUAAIAAgKQAAgNgHgIQgFgHgNAAQgKAAgIAGQgGAGgBAKIgfAAQgBgNAJgMQAHgLANgIQAOgGAPAAQAaAAAPAOQAOAPABAaIAABIQAAAVAFAOIAAACIggAAQgDgFgBgKQgPASgWAAQgVAAgOgOgAgUAMQgJAHAAANQABALAGAFQAGAHAKAAQAIAAAJgGQAIgFAFgIIAAgfIgSAAQgQAAgKAHg");
	this.shape_59.setTransform(33.65,9.3);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AglBSIAAihIAfAAIABASQAKgUAVgBQAHAAAFACIAAAjQgHgCgHABQgWgBgGAUIAABtg");
	this.shape_60.setTransform(22.15,9.15);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgvBGQgOgOAAgUQABgaAQgNQASgOAeAAIAUAAIAAgKQAAgNgGgIQgHgHgLAAQgMAAgGAGQgIAGAAAKIggAAQABgNAHgMQAIgLAOgIQANgGAPAAQAZAAAPAOQAQAPAAAaIAABIQAAAVAGAOIAAACIgiAAQgCgFgBgKQgPASgWAAQgWAAgNgOgAgTAMQgJAHAAANQgBALAHAFQAGAHAKAAQAIAAAJgGQAIgFAFgIIAAgfIgRAAQgSAAgIAHg");
	this.shape_61.setTransform(9.4,9.3);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AgrA+QgSgWAAgnIAAgCQAAglASgXQARgWAdAAQAaAAAQARQAQARABAbIgfAAQAAgOgIgIQgIgKgMABQgPAAgIAMQgJANAAAaIAAAFQAAAaAJANQAIANAPAAQAMAAAIgIQAIgIAAgLIAfAAQgBAOgIANQgHAOgOAHQgNAIgQAAQgdAAgRgWg");
	this.shape_62.setTransform(-4.925,9.3);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AgrA/QgTgXAAgkIAAgEQAAgXAIgUQAIgTAQgKQAOgLASAAQAdAAAQAVQAQAWAAAmIAAANIhcAAQABAVAKAMQALALAPAAQAWAAAOgUIARATQgJAOgOAIQgOAIgSAAQgeAAgTgVgAgSgrQgJAKgCATIA8AAIAAgCQgBgTgHgJQgIgKgOABQgMAAgHAKg");
	this.shape_63.setTransform(-19.3,9.3);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AgiBnQgSgIgKgQQgJgPAAgVIAhAAQAAASALALQALAKATAAQARAAAKgIQAIgIABgNQgBgPgIgHQgKgIgWgIQgXgIgOgJQgbgTABgdQgBgbAUgRQATgRAdAAQAUAAAQAIQAQAJAIAQQAKAPgBATIggAAQAAgSgKgJQgKgJgRAAQgQAAgIAIQgKAHAAAPQAAAMAKAHQAKAJAVAHQAXAHANAKQAOAJAHAMQAGANAAARQAAAbgTAQQgSAQggAAQgTAAgSgJg");
	this.shape_64.setTransform(-34.85,6.5);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.678,0,0,3.868,-208.7,-168.2)).s().p("EggoAaSMAAAg0jMBBRAAAMAAAA0jg");
	this.shape_65.setTransform(133.475,58.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop7G4, new cjs.Rectangle(-75.4,-110,417.79999999999995,336.4), null);


(lib.drop7G3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgcAiQgNgDgHgFQgHgHAAgGIAeAAQAAAGAHADQAIADAMAAQALAAAHgCQAGgCAAgEQAAgFgGgCQgIgDgOgBIgagEQgXgGABgKQAAgKAOgHQAPgFAWAAQAYgBAPAHQAPAGAAAKIgfAAQAAgEgGgDQgHgDgKAAQgKgBgFADQgHADAAAEQAAADAGADQAGACAQABIAdAGQAKACAFADQAFAFAAAFQAAALgPAFQgQAHgYAAQgQgBgNgDg");
	this.shape.setTransform(249.75,56);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgrAeQgMgHAAgNIAAguIAfAAIAAAuQAAANAUAAQAWAAAIgIIAAgzIAeAAIAABHIgcAAIgBgHQgOAJgYAAQgVAAgLgHg");
	this.shape_1.setTransform(236,56.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgOAzIAAhlIAdAAIAABlg");
	this.shape_2.setTransform(225.675,54.475);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgtAfQgMgGAAgJQAAgMAQgFQAQgGAdAAIATAAIAAgFQAAgGgHgDQgFgDgMAAQgKAAgHACQgGADAAAFIgfAAQAAgGAIgFQAHgGANgCQANgDAOAAQAZgBAOAHQAOAGAAAMIAAAgQAAAJAFAGIAAABIgfAAQgCgCgBgEQgPAIgUAAQgVgBgNgGgAgTAFQgIADAAAGQAAAFAGACQAGADAKAAQAHAAAJgCQAIgDAEgEIAAgNIgRAAQgQAAgJADg");
	this.shape_3.setTransform(215.45,56);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AAaAzIAAguQAAgHgGgDQgGgDgMAAQgRAAgKAIIAAAzIgeAAIAAhlIAeAAIAAAmQAQgJAVAAQArAAABAZIAAAvg");
	this.shape_4.setTransform(201.4,54.475);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AAaAzIAAguQAAgHgGgDQgHgDgLAAQgSAAgJAIIAAAzIgeAAIAAhlIAeAAIAAAmQAPgJAWAAQAsAAAAAZIAAAvg");
	this.shape_5.setTransform(180.75,54.475);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgtAfQgMgGAAgJQAAgMAQgFQAQgGAdAAIATAAIAAgFQAAgGgHgDQgFgDgMAAQgKAAgHACQgGADAAAFIgfAAQABgGAHgFQAIgGAMgCQANgDAOAAQAZgBAOAHQAOAGAAAMIAAAgQAAAJAFAGIAAABIgfAAQgCgCgBgEQgPAIgUAAQgUgBgOgGgAgTAFQgIADAAAGQAAAFAGACQAGADAKAAQAHAAAIgCQAIgDAFgEIAAgNIgRAAQgQAAgJADg");
	this.shape_6.setTransform(166.75,56);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgjAlIAAhHIAdAAIACAIQAJgKAUAAIAKABIAAAPIgMAAQgVAAgGAIIAAAxg");
	this.shape_7.setTransform(155.85,55.925);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgsAfQgNgGAAgJQAAgMAQgFQAQgGAdAAIASAAIAAgFQAAgGgFgDQgHgDgKAAQgLAAgGACQgHADAAAFIgeAAQgBgGAIgFQAIgGAMgCQANgDAPAAQAYgBANAHQAOAGABAMIAAAgQAAAJAFAGIAAABIgfAAQgCgCgCgEQgOAIgUAAQgVgBgMgGgAgSAFQgJADAAAGQAAAFAGACQAGADAJAAQAIAAAIgCQAJgDADgEIAAgNIgQAAQgQAAgIADg");
	this.shape_8.setTransform(143.85,56);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgsApQgOgKAAgRQAAgQAOgKQAPgKAYAAQAVAAANAIIAAglIAeAAIAABlIgbAAIgCgHQgNAJgWAAQgYAAgPgLgAgUgDQgIAGAAAMQAAAMAIAFQAIAHAOAAQASAAAJgJIAAgeQgIgJgTABQgOAAgIAFg");
	this.shape_9.setTransform(129.375,54.55);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AAaAzIAAguQAAgHgGgDQgHgDgLAAQgSAAgJAIIAAAzIgeAAIAAhlIAeAAIAAAmQAPgJAWAAQAsAAAAAZIAAAvg");
	this.shape_10.setTransform(108.95,54.475);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgsAeQgLgHAAgNIAAguIAeAAIAAAuQAAANAWAAQAVAAAHgIIAAgzIAfAAIAABHIgdAAIgBgHQgNAJgXAAQgXAAgLgHg");
	this.shape_11.setTransform(94.65,56.075);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgOAzIAAhlIAdAAIAABlg");
	this.shape_12.setTransform(84.325,54.475);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgsAeQgLgHAAgNIAAguIAeAAIAAAuQAAANAWAAQAVAAAIgIIAAgzIAeAAIAABHIgdAAIAAgHQgOAJgXAAQgXAAgLgHg");
	this.shape_13.setTransform(73.85,56.075);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgdAqIgCAIIgcAAIAAhlIAfAAIAAAlQANgIAWAAQAYAAAOAKQAPAJAAARIAAABQAAARgPAKQgNAKgZAAQgXAAgNgKgAgcAAIAAAdQAIAKAUAAQANgBAIgFQAIgGAAgLIAAgDQAAgLgIgFQgHgGgOABQgUAAgIAIg");
	this.shape_14.setTransform(59.8,54.55);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("ABCAlIAAguQgBgHgFgDQgGgDgNAAQgKAAgHADQgGACgDAFIAAAxIgdAAIAAgvQgBgMgYAAQgSAAgIAHIAAA0IgeAAIAAhHIAcAAIABAHQAPgJAZAAQAaAAAKALQAOgLAbAAQAXAAALAHQAKAGABANIAAAvg");
	this.shape_15.setTransform(41.15,55.925);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgpAcQgRgKgBgQIAAgCQABgKAHgIQAIgJAOgFQAPgFAPABQAdgBAPAKQAOAJAAASIAAAFIhXAAQABAJALAFQAJAGAOgBQAVAAANgJIAQAIQgHAHgOAEQgOADgRABQgbAAgTgKgAgRgTQgJAFgBAIIA4AAIAAgBQAAgIgIgFQgHgDgNgBQgLABgHAEg");
	this.shape_16.setTransform(23.25,56);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("Ag6AzIAAhjIAcAAIABAHQANgJAWAAQAZAAAOAKQAOAKAAARIAAABQAAAQgOAKQgOAKgYAAQgVAAgOgIIAAAjgAgcgcIAAAfQAIAIATAAQAOAAAIgGQAIgFAAgNQAAgLgIgGQgIgGgOAAQgTAAgIAIg");
	this.shape_17.setTransform(9.275,57.325);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgdAwQgPgDgIgGIAPgKQAOAJAVAAQANAAAKgEQAIgFABgIIAAgFQgOAIgVAAQgYAAgPgKQgOgKAAgRQAAgRAOgKQAPgKAZAAQAVAAAOAJIACgHIAbAAIAABFQAAANgRAJQgRAIgbAAQgOAAgOgDgAgUgeQgIAGAAANQAAAKAIAGQAIAFAOAAQASABAKgJIAAgfQgKgIgSAAQgOAAgIAHg");
	this.shape_18.setTransform(258.55,38.5);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AAaAlIAAguQAAgHgGgDQgFgDgNAAQgSAAgJAIIAAAzIgeAAIAAhHIAdAAIAAAIQAPgKAYAAQArAAAAAaIAAAvg");
	this.shape_19.setTransform(244.4,37.075);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgsAeQgLgHAAgNIAAguIAeAAIAAAuQAAANAWAAQAVAAAHgIIAAgzIAfAAIAABHIgdAAIgBgHQgNAJgXAAQgXAAgLgHg");
	this.shape_20.setTransform(230.1,37.225);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgsAqQgOgKAAgSQAAgQAOgKQAPgKAYAAQAVAAANAIIAAglIAeAAIAABmIgbAAIgCgIQgNAJgWAAQgYAAgPgKgAgUgCQgIAEAAAOQAAAKAIAHQAIAFAOAAQASABAJgJIAAgeQgIgJgTAAQgOAAgIAHg");
	this.shape_21.setTransform(215.475,35.7);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AAaAlIAAguQAAgHgFgDQgHgDgMAAQgRAAgKAIIAAAzIgeAAIAAhHIAdAAIAAAIQAPgKAYAAQAqAAABAaIAAAvg");
	this.shape_22.setTransform(201.4,37.075);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgsAfQgNgGAAgJQAAgMAQgFQAQgGAdAAIASAAIAAgFQAAgFgFgEQgHgDgKAAQgLAAgGADQgHACAAAFIgeAAQgBgGAIgGQAHgEANgEQANgDAPAAQAYABAOAGQANAGABAMIAAAfQAAAKAFAGIAAABIgfAAQgCgCgCgEQgOAHgUAAQgVABgMgHgAgSAFQgJAEAAAFQAAAFAGADQAGACAKAAQAHAAAJgCQAHgDAEgDIAAgOIgQAAQgQAAgIADg");
	this.shape_23.setTransform(187.4,37.15);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgeAwQgOgDgHgGIAOgKQAOAJAUAAQAOAAAKgEQAJgFAAgIIAAgFQgOAIgVAAQgXAAgPgKQgPgKgBgRQABgRAOgKQAPgKAYAAQAXAAANAJIABgHIAbAAIAABFQAAANgQAJQgQAIgcAAQgPAAgOgDgAgUgeQgJAGAAANQAAAKAJAGQAIAFAOAAQATABAJgJIAAgfQgJgIgTAAQgOAAgIAHg");
	this.shape_24.setTransform(172.9,38.5);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AAaAlIAAguQAAgHgFgDQgHgDgMAAQgSAAgIAIIAAAzIgfAAIAAhHIAdAAIAAAIQAQgKAXAAQAqAAABAaIAAAvg");
	this.shape_25.setTransform(158.75,37.075);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgoAbQgSgJAAgQIAAgCQgBgKAJgJQAHgIAOgFQAOgEARgBQAbAAAPAKQAQAJgBARIAAAGIhXAAQACAJAKAFQAJAFAOAAQAVABANgJIARAIQgJAGgNAEQgOADgRAAQgcAAgRgKgAgSgTQgIAFgCAIIA6AAIAAgBQgCgIgGgFQgIgDgMAAQgMgBgIAFg");
	this.shape_26.setTransform(144.9,37.15);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("ABBAlIAAguQAAgHgFgDQgGgDgNAAQgKAAgGADQgIACgCAFIAAAxIgdAAIAAgvQgBgMgYAAQgSAAgHAHIAAA0IgfAAIAAhHIAcAAIABAHQAPgJAZAAQAaAAAKALQAPgLAbAAQAWAAALAHQALAGAAANIAAAvg");
	this.shape_27.setTransform(126.75,37.075);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgsAfQgNgGAAgJQAAgMAQgFQAQgGAdAAIASAAIAAgFQABgFgHgEQgGgDgLAAQgJAAgHADQgHACAAAFIgfAAQAAgGAIgGQAHgEANgEQANgDAPAAQAXABAPAGQAOAGAAAMIAAAfQAAAKAFAGIAAABIgfAAQgCgCgCgEQgOAHgUAAQgVABgMgHgAgTAFQgIAEAAAFQAAAFAGADQAGACAKAAQAIAAAIgCQAHgDAEgDIAAgOIgQAAQgQAAgJADg");
	this.shape_28.setTransform(102.25,37.15);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgOAyIAAhHIAdAAIAABHgAgMgiQgEgDAAgDQAAgEAEgCQAFgDAHAAQAIAAAFADQAEACAAAEQAAADgEADQgFACgIAAQgHAAgFgCg");
	this.shape_29.setTransform(92.075,35.775);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgsAqQgOgKAAgSQAAgQAOgKQAPgKAYAAQAVAAANAIIAAglIAeAAIAABmIgbAAIgCgIQgNAJgWAAQgYAAgPgKgAgUgCQgIAEAAAOQAAAKAIAHQAIAFAOAAQASABAJgJIAAgeQgIgJgTAAQgOAAgIAHg");
	this.shape_30.setTransform(81.275,35.7);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgtAbQgRgKAAgRIAAAAQAAgLAIgIQAIgJAOgEQAOgEASgBQAbAAASAKQAQAJACAQIAAACQAAAMgIAHQgIAJgOAFQgOAEgTAAQgbABgSgLgAgXgRQgJAGAAALQAAAMAJAGQAIAGAPAAQAQAAAIgGQAJgHAAgLQAAgLgJgGQgJgHgPABQgOgBgJAHg");
	this.shape_31.setTransform(67,37.15);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("Ag6AzIAAhjIAcAAIABAHQANgJAWAAQAZAAAOAKQAOAKAAARIAAABQAAAQgOAKQgOAKgYAAQgVAAgOgIIAAAjgAgcgcIAAAfQAIAIATAAQAOAAAIgGQAIgFAAgNQAAgLgIgGQgIgGgOAAQgTAAgIAIg");
	this.shape_32.setTransform(52.725,38.475);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgsAfQgNgGAAgJQAAgMAQgFQAQgGAdAAIASAAIAAgFQABgFgHgEQgGgDgLAAQgJAAgHADQgHACAAAFIgfAAQAAgGAIgGQAHgEANgEQANgDAPAAQAXABAPAGQAOAGAAAMIAAAfQAAAKAFAGIAAABIgfAAQgCgCgCgEQgOAHgUAAQgVABgMgHgAgTAFQgIAEAAAFQAAAFAGADQAGACAKAAQAIAAAIgCQAHgDAEgDIAAgOIgQAAQgQAAgJADg");
	this.shape_33.setTransform(38.35,37.15);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgiAlIAAhHIAdAAIABAIQAJgKAUAAIAKABIAAAPIgMAAQgVAAgGAIIAAAxg");
	this.shape_34.setTransform(27.45,37.075);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgtAfQgMgGAAgJQAAgMAQgFQAQgGAdAAIATAAIAAgFQgBgFgFgEQgGgDgLAAQgKAAgIADQgGACAAAFIgfAAQABgGAHgGQAIgEAMgEQANgDAOAAQAYABAOAGQAOAGABAMIAAAfQAAAKAFAGIAAABIgfAAQgCgCgBgEQgPAHgUAAQgUABgOgHgAgSAFQgJAEAAAFQAAAFAGADQAGACAJAAQAJAAAHgCQAIgDAFgDIAAgOIgRAAQgQAAgIADg");
	this.shape_35.setTransform(15.45,37.15);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AhDAxIAAhhIBEAAQAfABASAIQASAIAAAOQAAAOgSAIQgRAHggABIgkAAIAAAkgAgjAAIAkAAQARAAAKgEQAJgFAAgIQAAgHgJgFQgKgFgQAAIglAAg");
	this.shape_36.setTransform(0.75,35.9);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,1.276,-161.1,-55.5)).s().p("A5MIrIAAxVMAyYAAAIAARVg");
	this.shape_37.setTransform(133.9,48.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop7G3, new cjs.Rectangle(-27.3,-6.5,322.5,110.9), null);


(lib.drop7G2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AA4BCIAAhTQAAgNgFgFQgFgHgLAAQgIABgGAFQgGAGgCAIIAABYIgZAAIAAhUQAAgYgVAAQgPAAgHAPIAABdIgaAAIAAiBIAZAAIABANQAMgQAVAAQAWAAAJAVQAMgVAXAAQATAAAJANQAKAMAAAXIAABUg");
	this.shape.setTransform(149.025,61.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AglA2QgKgMAAgYIAAhUIAaAAIAABUQAAAYATAAQARAAAHgPIAAhdIAaAAIAACCIgYAAIgBgNQgLAQgVAAQgTAAgJgNg");
	this.shape_1.setTransform(133.45,61.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgMBaIAAiCIAZAAIAACCgAgKg+QgEgFAAgHQAAgGAEgFQAEgEAGAAQAHAAAEAEQAEAFAAAGQAAAHgEAFQgEAEgHAAQgGAAgEgEg");
	this.shape_2.setTransform(124.6,59.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AA4BCIAAhTQAAgNgFgFQgFgHgLAAQgIABgGAFQgGAGgCAIIAABYIgZAAIAAhUQAAgYgVAAQgPAAgHAPIAABdIgaAAIAAiBIAZAAIABANQAMgQAVAAQAWAAAJAVQAMgVAXAAQATAAAJANQAKAMAAAXIAABUg");
	this.shape_3.setTransform(112.275,61.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgmAxQgPgSAAgfIAAAAQAAgTAHgQQAHgPAMgIQAMgJAPAAQAYAAAOARQAOARABAcIAAAGQAAAUgGAPQgGAPgNAIQgMAJgQAAQgXAAgPgTgAgTggQgIAMAAAVQAAAUAHAMQAIALAMAAQANAAAIgLQAHgMAAgVQAAgUgHgMQgIgLgNAAQgMAAgHALg");
	this.shape_4.setTransform(96.55,61.625);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgNAtIAAhJIgTAAIAAgWIATAAIAAgfIAZAAIAAAfIAUAAIAAAWIgUAAIAABIQAAAIACADQADADAGAAIAKgBIAAAXQgJACgJABQgcgBAAglg");
	this.shape_5.setTransform(86.5,60.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgXA+QgLgGgHgKQgGgKAAgMIAZAAQABAKAGAGQAHAGAJAAQALAAAFgFQAFgEAAgHQAAgIgFgEQgGgEgMgDQgOgEgIgEQgUgKAAgUQAAgRANgLQAMgMATAAQAUAAANAMQANALAAATIgaAAQAAgJgGgFQgFgGgJAAQgIAAgFAFQgGAEAAAIQAAAGAFAEQAFAEAPAEQAPADAJAGQAIAEAFAHQAEAIAAAKQAAASgNALQgNALgVAAQgNAAgLgGg");
	this.shape_6.setTransform(77.425,61.625);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgMBaIAAiCIAZAAIAACCgAgKg+QgDgFgBgHQABgGADgFQAEgEAGAAQAHAAAEAEQAEAFgBAGQABAHgEAFQgEAEgHAAQgGAAgEgEg");
	this.shape_7.setTransform(69.05,59.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgeBCIAAiBIAaAAIAAAOQAJgRAQAAQAFAAAFACIgBAcIgKgBQgSAAgFAPIAABYg");
	this.shape_8.setTransform(62.9,61.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgjAyQgPgRAAgeIAAgDQAAgTAHgPQAGgQAMgIQANgJANAAQAYAAANARQANARAAAfIAAALIhLAAQABAQAJAKQAIAJAMAAQASAAALgQIAOAPQgHAMgMAGQgLAHgPAAQgXAAgQgSgAgPgjQgHAJgBAPIAwAAIAAgCQgBgPgGgIQgGgHgLAAQgJAAgHAIg");
	this.shape_9.setTransform(52.825,61.625);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgyBcIAAi0IAYAAIABANQAMgPASgBQAWAAAMASQAMASAAAgIAAABQAAAegNASQgMASgUAAQgSAAgMgOIAAA+gAgYgzIAAA4QAHAPAQABQAMgBAHgKQAHgLAAgXQAAgTgHgMQgHgMgMAAQgQABgHAPg");
	this.shape_10.setTransform(40.925,64);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AAWBCIAAhTQAAgNgFgFQgFgHgLAAQgOABgIAQIAABbIgaAAIAAiBIAZAAIAAAPQANgRAUgBQAkABABAuIAABVg");
	this.shape_11.setTransform(22.975,61.5);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgmA4QgKgLgBgQQABgVAOgKQANgMAYAAIARAAIAAgIQAAgKgGgGQgEgGgKAAQgJAAgGAFQgFAFAAAHIgaAAQAAgKAGgKQAHgJAKgFQAMgGAMAAQAUAAAMAMQAMALABAVIAAA6QAAASADAKIAAACIgaAAIgDgMQgMAPgRAAQgRAAgMgMgAgPAKQgHAFgBALQAAAIAGAFQAEAFAJAAQAGAAAIgEQAGgEAEgHIAAgZIgPAAQgNAAgHAGg");
	this.shape_12.setTransform(11,61.625);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AglBLQgNgSAAggQAAgdANgSQAMgSAVgBQARAAAMAPIAAhDIAaAAIAAC4IgYAAIgBgNQgMAQgSAAQgVAAgMgTgAgRgFQgHAKAAAXQAAATAHAMQAHALALAAQAQAAAIgQIAAg3QgIgQgQAAQgLAAgHAMg");
	this.shape_13.setTransform(-1.3,59);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AA4BDIAAhVQAAgMgFgGQgFgFgLAAQgIgBgGAGQgGAGgCAIIAABZIgZAAIAAhWQAAgWgVAAQgPAAgHAOIAABeIgaAAIAAiCIAZAAIABAOQAMgQAVgBQAWABAJATQAMgTAXgBQATAAAJAMQAKANAAAWIAABWg");
	this.shape_14.setTransform(241.975,27.35);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AglA2QgKgNAAgXIAAhTIAaAAIAABSQAAAaASAAQASAAAHgQIAAhcIAaAAIAACBIgZAAIgBgNQgLAPgUABQgTAAgJgNg");
	this.shape_15.setTransform(226.35,27.6);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgMBaIAAiBIAZAAIAACBgAgKg/QgDgEgBgHQABgHADgDQAEgFAGAAQAHAAAEAFQAEADgBAHQABAHgEAEQgEAFgHAAQgGAAgEgFg");
	this.shape_16.setTransform(217.55,25);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AA4BDIAAhVQAAgMgFgGQgFgFgLAAQgIgBgGAGQgGAGgCAIIAABZIgZAAIAAhWQAAgWgVAAQgPAAgHAOIAABeIgaAAIAAiCIAZAAIABAOQAMgQAVgBQAWABAJATQAMgTAXgBQATAAAJAMQAKANAAAWIAABWg");
	this.shape_17.setTransform(205.225,27.35);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgmAxQgPgSAAgfIAAAAQABgTAGgQQAHgPAMgIQAMgJAPAAQAXAAAPARQAPARAAAcIAAAGQAAAUgGAPQgHAPgMAIQgMAJgQAAQgXAAgPgTgAgTggQgHAMgBAVQAAAUAIAMQAHALAMAAQAOAAAGgLQAIgMAAgVQAAgUgIgMQgHgLgNAAQgLAAgIALg");
	this.shape_18.setTransform(189.5,27.475);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgNAtIAAhJIgTAAIAAgVIATAAIAAghIAZAAIAAAhIAUAAIAAAVIgUAAIAABIQAAAHACAEQADADAHAAIAJgBIAAAWQgJADgJABQgcAAAAgmg");
	this.shape_19.setTransform(179.45,26);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgXA+QgLgGgHgKQgGgKAAgMIAZAAQABAKAGAGQAHAGAJAAQALAAAFgFQAFgEAAgHQAAgIgFgEQgGgEgMgDQgOgEgIgEQgUgKAAgUQAAgRANgLQAMgMATAAQAUAAANAMQANALAAATIgaAAQAAgJgGgFQgFgGgJAAQgIAAgFAFQgGAEAAAIQAAAGAFAEQAFAEAPAEQAPADAJAGQAIAEAFAHQAEAIAAAKQAAASgNALQgNALgVAAQgNAAgLgGg");
	this.shape_20.setTransform(170.325,27.475);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgmAxQgOgSAAgfIAAAAQgBgTAHgQQAHgPAMgIQAMgJAPAAQAYAAAOARQAOARACAcIAAAGQAAAUgHAPQgGAPgMAIQgNAJgQAAQgXAAgPgTgAgTggQgIAMABAVQAAAUAGAMQAIALAMAAQANAAAIgLQAHgMAAgVQAAgUgHgMQgIgLgNAAQgMAAgHALg");
	this.shape_21.setTransform(158.5,27.475);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgeBDIAAiCIAaAAIAAAPQAIgRARgBQAGABAEABIgBAbIgKgBQgSAAgFAQIAABZg");
	this.shape_22.setTransform(148.95,27.35);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgyBbIAAizIAYAAIABANQAMgQASAAQAWABAMARQAMASAAAfIAAADQAAAdgNASQgMASgUAAQgSAAgMgOIAAA9gAgYg0IAAA6QAHAOAQAAQAMAAAHgLQAHgKAAgXQAAgUgHgLQgHgLgMAAQgQAAgHAOg");
	this.shape_23.setTransform(138.675,29.85);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AAWBdIAAhUQAAgNgFgGQgGgFgKAAQgOAAgIAPIAABdIgaAAIAAi5IAaAAIAABFQANgQASAAQAlAAABAuIAABWg");
	this.shape_24.setTransform(118.275,24.725);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AglA2QgKgNAAgXIAAhTIAaAAIAABSQAAAaATAAQARAAAHgQIAAhcIAaAAIAACBIgZAAIAAgNQgLAPgVABQgTAAgJgNg");
	this.shape_25.setTransform(106.1,27.6);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgZBNIgBAPIgYAAIAAi5IAaAAIAABEQAMgPASgBQAVAAAMASQAMASAAAfIAAACQAAAegMASQgMASgVAAQgTAAgMgRgAgYAAIAAA1QAHARARAAQALAAAHgKQAHgLAAgUIAAgEQAAgVgHgKQgGgKgMAAQgRAAgHAQg");
	this.shape_26.setTransform(94.075,24.85);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AglA2QgKgNAAgXIAAhTIAaAAIAABSQAAAaATAAQARAAAHgQIAAhcIAaAAIAACBIgYAAIgBgNQgLAPgVABQgSAAgKgNg");
	this.shape_27.setTransform(81.6,27.6);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgNAtIAAhJIgTAAIAAgVIATAAIAAghIAZAAIAAAhIAUAAIAAAVIgUAAIAABIQAAAHADAEQACADAHAAIAJgBIAAAWQgJADgIABQgdAAAAgmg");
	this.shape_28.setTransform(71.7,26);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AAWBDIAAhUQAAgMgFgHQgFgFgLAAQgOAAgIAPIAABdIgaAAIAAiCIAZAAIAAAPQANgSAUAAQAkAAABAvIAABWg");
	this.shape_29.setTransform(54.225,27.35);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AglA4QgMgLAAgQQAAgVAPgKQANgMAYAAIAQAAIAAgIQAAgKgEgGQgGgGgJAAQgIAAgHAFQgFAFAAAHIgaAAQAAgKAGgKQAHgJAKgFQALgGAMAAQAVAAAMAMQAMALAAAVIAAA6QABASADAKIAAACIgaAAIgDgMQgMAPgRAAQgSAAgKgMgAgPAKQgIAFAAALQABAIAFAFQAEAFAJAAQAGAAAIgEQAGgEADgHIAAgZIgNAAQgOAAgHAGg");
	this.shape_30.setTransform(42.25,27.475);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgMBaIAAiBIAZAAIAACBgAgKg/QgEgEABgHQgBgHAEgDQAEgFAGAAQAHAAAEAFQADADABAHQgBAHgDAEQgEAFgHAAQgGAAgEgFg");
	this.shape_31.setTransform(33.55,25);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgZBWQgMgGgHgJIANgSQAMAQARAAQAMAAAIgIQAHgIAAgPIAAgJQgLAOgSAAQgUAAgNgSQgNgSAAggQAAgeANgSQAMgSAWAAQASAAALAPIABgNIAYAAIAAB+QAAAZgOAPQgOAPgXAAQgNAAgMgGgAgRg4QgHAMAAAWQAAAUAHAKQAHALAMAAQAQAAAHgPIAAg4QgHgPgQAAQgMAAgHALg");
	this.shape_32.setTransform(24.35,29.925);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgmA4QgLgLABgQQgBgVAOgKQAOgMAZAAIAQAAIAAgIQgBgKgFgGQgEgGgKAAQgJAAgFAFQgGAFAAAHIgaAAQAAgKAHgKQAFgJAMgFQAKgGAMAAQAVAAAMAMQAMALAAAVIAAA6QABASAEAKIAAACIgbAAIgDgMQgMAPgRAAQgSAAgLgMgAgPAKQgHAFAAALQAAAIAEAFQAGAFAIAAQAHAAAGgEQAHgEAEgHIAAgZIgOAAQgOAAgHAGg");
	this.shape_33.setTransform(12.5,27.475);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("Ag2BYIAAivIA1AAQAZAAAOAMQAOAMAAAYQAAAMgGAJQgGAKgLAFQANADAHALQAGAKAAAPQAAAZgOANQgOAOgaAAgAgbA/IAcAAQANAAAHgHQAHgHAAgNQAAgbgYgBIgfAAgAgbgNIAaAAQAMAAAHgGQAHgHAAgMQAAgNgHgGQgGgFgNAAIgaAAg");
	this.shape_34.setTransform(-0.075,25.225);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,2.88,-161.1,-125.2)).s().p("A5LTkMAAAgnHMAyXAAAMAAAAnHg");
	this.shape_35.setTransform(126.85,52.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop7G2, new cjs.Rectangle(-34.4,-73.1,322.5,250.5), null);


(lib.drop7G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgnAYQgKgFAAgLIAAglIAbAAIAAAlQAAAMATAAQATgBAHgGIAAgqIAbAAIAAA6IgaAAIAAgGQgMAHgVAAQgUAAgKgGg");
	this.shape.setTransform(201.475,55.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgOAUIAAggIgTAAIAAgKIATAAIAAgOIAaAAIAAAOIAWAAIAAAKIgWAAIAAAgQAAADADACQADABAHAAIAKAAIAAAKIgSABQgeAAgBgRg");
	this.shape_1.setTransform(191,54.625);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgoAaQgLgGAAgHQAAgKAOgDQAPgGAZAAIARAAIAAgDQAAgFgFgDQgFgCgKAAQgJAAgGACQgGACAAAEIgcAAQAAgGAHgDQAHgFALgCQALgCANAAQAWAAAMAEQANAGAAAKIAAAZQAAAIAFAEIAAABIgcAAQgCgBgBgEQgNAHgSgBQgSAAgMgEgAgQAEQgIADAAAEQAAAFAFACQAGACAIAAQAHAAAIgCQAHgCADgDIAAgLIgPAAQgOAAgHACg");
	this.shape_2.setTransform(181.275,55.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgaAjIgCAGIgYAAIAAhSIAbAAIAAAeQAMgHATAAQAWAAANAIQAMAIAAAOIAAAAQAAAOgMAIQgNAIgWAAQgUAAgMgHgAgZAAIAAAYQAHAIASAAQAMAAAHgFQAHgFAAgJIAAgCQAAgJgHgEQgHgFgMAAQgSAAgHAHg");
	this.shape_3.setTransform(168.825,54.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AAXAqIAAgmQAAgFgFgDQgGgCgKAAQgQAAgIAGIAAAqIgbAAIAAhTIAbAAIAAAfQANgHAUAAQAnAAAAAUIAAAng");
	this.shape_4.setTransform(149.975,54.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgoAaQgLgGAAgHQAAgKAOgDQAPgGAZAAIARAAIAAgDQAAgFgFgDQgFgCgKAAQgJAAgGACQgGACAAAEIgcAAQAAgGAHgDQAHgFALgCQALgCANAAQAWAAAMAEQANAGAAAKIAAAZQAAAIAFAEIAAABIgcAAQgCgBgBgEQgNAHgSgBQgSAAgMgEgAgQAEQgIADAAAEQAAAFAFACQAGACAIAAQAHAAAIgCQAHgCADgDIAAgLIgPAAQgOAAgHACg");
	this.shape_5.setTransform(137.425,55.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgNAqIAAhTIAbAAIAABTg");
	this.shape_6.setTransform(128.275,54.075);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgkAWQgQgHAAgOIAAgBQAAgIAHgHQAHgHAMgEQANgDAPAAQAYgBAOAIQANAIAAAOIAAAEIhOAAQABAHAJAFQAJAEAMAAQATAAAMgIIAOAHQgHAGgMACQgMADgPAAQgZAAgQgIgAgQgPQgHAEgCAGIAzAAIAAgBQAAgGgHgEQgGgDgMAAQgKAAgHAEg");
	this.shape_7.setTransform(119.325,55.3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgkAWQgPgHAAgPIAAAAQAAgOAOgIQAPgHAZAAQAVAAAOAFQAOAHAAAKIgZAAQgBgFgGgEQgHgDgKAAQgNAAgHAEQgHAGAAAJIAAABQAAAJAHAGQAHAEANAAQAKAAAGgDQAHgDABgEIAZAAQAAAGgHAEQgGAFgMADQgLACgNAAQgZAAgOgIg");
	this.shape_8.setTransform(107.225,55.3);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgqArIA/hVIAWAAIhABVg");
	this.shape_9.setTransform(90.55,54.625);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgfAeIAAg6IAaAAIABAHQAJgIARAAIAKAAIAAANIgLgBQgTABgGAGIAAAog");
	this.shape_10.setTransform(82.725,55.25);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgNApIAAg6IAaAAIAAA6gAgLgcQgDgCAAgDQAAgDADgCQAFgCAGAAQAIAAAEACQADACAAADQAAADgDACQgEACgIAAQgGAAgFgCg");
	this.shape_11.setTransform(75.25,54.175);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgZAcQgLgDgHgEQgGgFAAgFIAaAAQABAEAGADQAHADAKgBQALAAAGgCQAFgBAAgEQAAgDgGgCQgGgCgNgBQgOgBgJgDQgUgEAAgIQAAgJANgFQANgEAUAAQAVAAAOAEQANAGAAAIIgbAAQAAgDgGgDQgGgCgJAAQgIAAgGACQgGACAAADQAAADAGACIAUADQAQABAJADQAJACAFACQAEAEAAAFQAAAHgOAGQgNAEgWAAQgOAAgMgCg");
	this.shape_12.setTransform(66.325,55.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgoAaQgLgGAAgHQAAgKAOgDQAPgGAZAAIARAAIAAgDQAAgFgFgDQgFgCgKAAQgJAAgGACQgGACAAAEIgcAAQAAgGAHgDQAHgFALgCQALgCANAAQAWAAAMAEQANAGAAAKIAAAZQAAAIAFAEIAAABIgcAAQgCgBgBgEQgNAHgSgBQgSAAgMgEgAgQAEQgIADAAAEQAAAFAFACQAGACAIAAQAHAAAIgCQAHgCADgDIAAgLIgPAAQgOAAgHACg");
	this.shape_13.setTransform(54.275,55.3);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("Ag0ApIAAhQIAZAAIABAGQAMgHAUAAQAWAAAMAIQANAIAAAOIAAABQAAANgNAIQgNAIgVAAQgTAAgMgHIAAAcgAgZgXIAAAZQAIAHARAAQAMAAAHgFQAHgEAAgKQAAgJgHgFQgIgFgMAAQgRAAgHAGg");
	this.shape_14.setTransform(41.8,56.375);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgNApIAAg6IAbAAIAAA6gAgLgcQgDgCAAgDQAAgDADgCQAEgCAHAAQAHAAAFACQADACAAADQAAADgDACQgFACgHAAQgHAAgEgCg");
	this.shape_15.setTransform(249.2,38.725);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgNAqIAAhTIAbAAIAABTg");
	this.shape_16.setTransform(243.325,38.625);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgoAZQgLgEAAgIQAAgJAOgFQAPgEAZAAIARAAIAAgFQAAgEgFgDQgFgDgKAAQgJABgGACQgGACAAAEIgcAAQAAgFAHgEQAHgFALgCQALgDANABQAWAAAMAEQANAGAAAJIAAAaQAAAIAFAEIAAACIgcAAQgCgCgBgEQgNAHgSAAQgSgBgMgFgAgQAFQgIACAAAFQAAADAFACQAGADAIAAQAHAAAIgCQAHgCADgDIAAgLIgPAAQgOAAgHADg");
	this.shape_17.setTransform(234.225,39.85);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgaAnQgNgDgGgEIAMgIQANAHASAAQAMABAJgEQAHgEABgHIAAgEQgNAHgSAAQgWgBgNgHQgOgJABgOQAAgNANgIQAOgJAVABQAUgBAMAIIABgHIAZAAIAAA4QAAAMgPAHQgPAGgYAAQgNABgNgDgAgRgYQgIAFAAAJQAAAKAIAEQAHAFAMAAQAQAAAJgHIAAgZQgJgGgQgBQgMAAgHAGg");
	this.shape_18.setTransform(221.25,40.95);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgbAnQgMgDgHgEIANgIQANAHASAAQANABAHgEQAIgEAAgHIAAgEQgMAHgSAAQgVgBgNgHQgPgJAAgOQAAgNAOgIQANgJAXABQATgBAMAIIABgHIAYAAIAAA4QAAAMgOAHQgPAGgZAAQgNABgNgDgAgSgYQgHAFAAAJQAAAKAHAEQAIAFAMAAQARAAAHgHIAAgZQgHgGgRgBQgMAAgIAGg");
	this.shape_19.setTransform(208.25,40.95);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AAXAeIAAglQAAgGgFgCQgFgDgLAAQgQAAgIAHIAAApIgbAAIAAg6IAaAAIAAAHQAOgIAVAAQAmAAAAAVIAAAmg");
	this.shape_20.setTransform(195.575,39.8);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgkAXQgQgJAAgNIAAgBQAAgIAHgHQAHgHAMgEQANgDAPAAQAYAAAOAHQANAIAAAOIAAAEIhOAAQABAHAJAFQAJAEAMAAQATAAAMgHIAOAGQgHAGgMACQgMAEgPAAQgZgBgQgHgAgQgPQgHADgCAIIAzAAIAAgBQAAgHgHgEQgGgDgMAAQgKAAgHAEg");
	this.shape_21.setTransform(183.125,39.85);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AA6AeIAAglQAAgGgEgCQgGgDgLAAQgJAAgHACQgFADgDAEIAAAnIgaAAIAAgmQAAgKgWAAQgQAAgHAGIAAAqIgbAAIAAg6IAZAAIABAGQANgHAWAAQAYAAAJAJQANgJAYAAQAUAAAKAFQAKAFAAALIAAAmg");
	this.shape_22.setTransform(166.9,39.8);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AAXAeIAAglQAAgGgFgCQgFgDgLAAQgQAAgIAHIAAApIgbAAIAAg6IAaAAIAAAHQAOgIAVAAQAmAAAAAVIAAAmg");
	this.shape_23.setTransform(144.725,39.8);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgoAZQgLgEAAgIQAAgJAOgFQAPgEAZAAIARAAIAAgFQAAgEgFgDQgFgDgKAAQgJABgGACQgGACAAAEIgcAAQAAgFAHgEQAHgFALgCQALgDANABQAWAAAMAEQANAGAAAJIAAAaQAAAIAFAEIAAACIgcAAQgCgCgBgEQgNAHgSAAQgSgBgMgFgAgQAFQgIACAAAFQAAADAFACQAGADAIAAQAHAAAIgCQAHgCADgDIAAgLIgPAAQgOAAgHADg");
	this.shape_24.setTransform(132.125,39.85);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgnAiQgNgIAAgPQAAgMANgJQANgIAVAAQATAAAMAHIAAgeIAbAAIAABSIgZAAIgBgGQgMAHgUAAQgVAAgNgIgAgRgCQgIAEAAAKQAAAJAIAGQAGAFAMAAQARAAAIgIIAAgYQgHgHgSAAQgMAAgGAFg");
	this.shape_25.setTransform(119.2,38.675);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AAXAeIAAglQAAgGgFgCQgFgDgLAAQgQAAgIAHIAAApIgbAAIAAg6IAaAAIAAAHQAOgIAVAAQAmAAAAAVIAAAmg");
	this.shape_26.setTransform(100.825,39.8);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgoAZQgLgEAAgIQAAgJAOgFQAPgEAZAAIARAAIAAgFQAAgEgFgDQgFgDgKAAQgJABgGACQgGACAAAEIgcAAQAAgFAHgEQAHgFALgCQALgDANABQAWAAAMAEQANAGAAAJIAAAaQAAAIAFAEIAAACIgcAAQgCgCgBgEQgNAHgSAAQgSgBgMgFgAgQAFQgIACAAAFQAAADAFACQAGADAIAAQAHAAAIgCQAHgCADgDIAAgLIgPAAQgOAAgHADg");
	this.shape_27.setTransform(88.225,39.85);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AAWAqIgjgaIgMAHIAAATIgbAAIAAhTIAbAAIAAAvIAJgFIAggRIAgAAIgtAXIAzAjg");
	this.shape_28.setTransform(76.8,38.625);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgoAZQgLgEAAgIQAAgJAOgFQAPgEAZAAIARAAIAAgFQAAgEgFgDQgFgDgKAAQgJABgGACQgGACAAAEIgcAAQAAgFAHgEQAHgFALgCQALgDANABQAWAAAMAEQANAGAAAJIAAAaQAAAIAFAEIAAACIgcAAQgCgCgBgEQgNAHgSAAQgSgBgMgFgAgQAFQgIACAAAFQAAADAFACQAGADAIAAQAHAAAIgCQAHgCADgDIAAgLIgPAAQgOAAgHADg");
	this.shape_29.setTransform(63.875,39.85);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgfAeIAAg6IAaAAIABAGQAJgHARAAIAKAAIAAANIgLAAQgTgBgGAIIAAAng");
	this.shape_30.setTransform(54.125,39.8);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgkAXQgQgJAAgNIAAgBQAAgIAHgHQAHgHAMgEQANgDAPAAQAYAAAOAHQANAIAAAOIAAAEIhOAAQABAHAJAFQAJAEAMAAQATAAAMgHIAOAGQgHAGgMACQgMAEgPAAQgZgBgQgHgAgQgPQgHADgCAIIAzAAIAAgBQAAgHgHgEQgGgDgMAAQgKAAgHAEg");
	this.shape_31.setTransform(43.525,39.85);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgbAnQgMgDgHgEIANgIQANAHASAAQANABAHgEQAIgEAAgHIAAgEQgMAHgSAAQgVgBgOgHQgOgJAAgOQAAgNAOgIQANgJAXABQATgBAMAIIABgHIAYAAIAAA4QAAAMgOAHQgPAGgZAAQgNABgNgDgAgSgYQgHAFAAAJQAAAKAHAEQAIAFAMAAQARAAAHgHIAAgZQgHgGgRgBQgMAAgIAGg");
	this.shape_32.setTransform(30.5,40.95);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgfAeIAAg6IAaAAIABAGQAJgHARAAIAKAAIAAANIgLAAQgTgBgGAIIAAAng");
	this.shape_33.setTransform(20.725,39.8);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgkAXQgQgJAAgNIAAgBQAAgIAHgHQAHgHAMgEQANgDAPAAQAYAAAOAHQANAIAAAOIAAAEIhOAAQABAHAJAFQAJAEAMAAQATAAAMgHIAOAGQgHAGgMACQgMAEgPAAQgZgBgQgHgAgQgPQgHADgCAIIAzAAIAAgBQAAgHgHgEQgGgDgMAAQgKAAgHAEg");
	this.shape_34.setTransform(10.125,39.85);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("Ag0ApIAAhQIAZAAIABAGQAMgHAUAAQAWAAAMAIQANAIAAAOIAAABQAAANgNAIQgMAIgWAAQgTAAgMgHIAAAcgAgZgXIAAAZQAHAHASAAQAMAAAHgFQAHgEAAgKQAAgJgHgFQgHgFgNAAQgQAAgIAGg");
	this.shape_35.setTransform(-2.4,40.925);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,1.199,-161.1,-52.1)).s().p("A5LIJIAAwRMAyXAAAIAAQRg");
	this.shape_36.setTransform(125.05,48.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop7G1, new cjs.Rectangle(-36.2,-3.9,322.5,104.30000000000001), null);


(lib.drag8G12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap111();
	this.instance.setTransform(0,-3,0.3766,0.4375);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgNASQgEgEAAgGIAJAAQAAADACACQACACADAAQADAAACgCQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAAAQAAgEgFgCIgHgDQgIgCAAgHQAAgGAFgDQAFgEAGAAQAHAAAEAEQAEAEAAAFIgJAAQAAAAAAgBQAAgBAAAAQAAgBgBAAQAAgBAAAAQgCgCgDAAQgDAAgBABQgBABAAAAQgBABAAAAQAAABgBAAQAAABAAABQAAADAEABIAIADQAIACAAAIQAAAEgDADIgGAEIgIACQgHAAgFgEg");
	this.shape.setTransform(58.975,87.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgOAUQgDgCgBgEQgBgDABgFIAEgbIAJAAIgEAbIAAADQAAAFAFAAQAFAAAEgFIAFgeIAJAAIgHAqIgJAAIABgEQgEAFgHAAIgHgCg");
	this.shape_1.setTransform(54.9667,87.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgJAeIAJg7IAKAAIgKA7g");
	this.shape_2.setTransform(51.8,86.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgJAeIAKg7IAJAAIgKA7g");
	this.shape_3.setTransform(49.8,86.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgKATQgEgDgCgFQgCgEABgGIAAgBQAAgFADgFQADgGAFgCQAFgDAEAAQAIAAAEAGQAEAGgBAJIgBADIgZAAQgBAFADADQACADAEAAQAFABAFgGIAFAFIgHAGQgEACgEAAQgGAAgEgDgAgIgDIARAAIAAgBIAAgEQAAAAAAgBQAAAAAAgBQgBAAAAgBQgBAAAAAAQAAgBgBAAQAAgBgBAAQAAAAgBAAQgBgBgBAAQgGAAgEALg");
	this.shape_4.setTransform(46.605,87.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgJAZIgBAFIgJAAIALg8IAIAAIgEAXQAFgGAGABQAGAAAEAEQADAEAAAHIAAAFQgBAHgCAFQgEAGgDACQgEACgFABQgHgBgDgFgAgFAAIgCARQACAFAFAAQAEAAADgDQADgDABgIIAAgEQAAgEgCgDQgCgCgDAAQgEAAgFAFg");
	this.shape_5.setTransform(42.15,86.85);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgOAUQgDgCgBgEQgBgDABgFIAEgbIAJAAIgEAbIAAADQAAAFAFAAQAFAAAEgFIAFgeIAJAAIgHAqIgJAAIABgEQgEAFgHAAIgHgCg");
	this.shape_6.setTransform(38.0167,87.725);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgOAWIAIgqIAHAAIAAAFQAEgFAGgBIADABIgBAJIgDAAQgGgBgEAGIgEAcg");
	this.shape_7.setTransform(34.5,87.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgNASQgEgEAAgGIAJAAQAAADACACQACABADAAQADAAACgBQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAAAQAAgEgFgCIgHgCQgIgDAAgHQAAgFAFgEQAFgEAGAAQAHAAAEAEQAEADAAAHIgJAAQAAgBAAgBQAAgBAAAAQAAgBgBAAQAAgBAAAAQgCgCgDAAQgDAAgBABQgBABAAAAQgBABAAAAQAAABgBAAQAAABAAABQAAADAEABIAIADQAIACAAAIQAAAEgDADIgGAEIgIACQgHAAgFgEg");
	this.shape_8.setTransform(63.425,74.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgOAUQgDgCgBgEQgBgDABgFIAEgbIAJAAIgEAbIAAADQAAAFAFAAQAFAAAEgFIAFgeIAJAAIgHAqIgJAAIABgEQgEAFgHAAIgHgCg");
	this.shape_9.setTransform(59.4167,74.125);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgLATQgEgDgBgFQgCgFABgFIAAgBQAAgGADgFQADgFAFgCQAEgDAFAAQAHAAAEAFQAEAEAAAHIgJAAQAAgEgBgCQgCgCgEgBQgEABgDAEQgDAFAAAHQgBALAIAAQACAAADgCQACgCABgDIAJAAQgBAEgCADQgDAEgEACQgEACgDAAQgGAAgEgDg");
	this.shape_10.setTransform(55.1583,74.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgJAdIAIgpIAIAAIgHApgAABgTQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIABgEQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAABAAAAQAAAAgBABIgEABQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_11.setTransform(52.125,73.275);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgOAWIAIgqIAIAAIgBAFQAEgFAGAAIADAAIgBAJIgDAAQgGAAgEAEIgEAdg");
	this.shape_12.setTransform(49.8,74.05);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgJAZIgBAFIgJAAIAKg8IAJAAIgDAWQAEgEAGAAQAGAAAEAEQADAFAAAGIAAAFQgBAHgCAFQgEAGgEACQgDACgFABQgGgBgEgFgAgFAAIgDARQACAFAGABQAEgBADgDQACgDABgIIABgEQAAgEgCgCQgCgDgDAAQgEAAgFAFg");
	this.shape_13.setTransform(45.95,73.25);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AARAWIAFgbIAAgDQgBgFgFAAQgGAAgDAGIAAACIgFAbIgIAAIAEgbIAAgDQAAgFgFAAQgGAAgDAFIgFAeIgKAAIAIgqIAIAAIAAAEQAFgEAHAAQADAAADABQACACABADQAGgGAIAAQAGAAADADQADAFgBAHIgEAbg");
	this.shape_14.setTransform(40.3036,74.05);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgOAUQgDgCgBgEQgBgDABgFIAEgbIAJAAIgEAbIAAADQAAAFAFAAQAFAAAEgFIAFgeIAJAAIgHAqIgJAAIABgEQgEAFgHAAIgHgCg");
	this.shape_15.setTransform(35.0167,74.125);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgRAdIAKg5IAJAAIgIAxIAYAAIgBAIg");
	this.shape_16.setTransform(30.45,73.35);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#E67E22").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_17.setTransform(45.05,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90.1,100.80000000000001);


(lib.drag8G11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap110();
	this.instance.setTransform(0,-3,0.3136,0.4294);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AAHAaIgHgSIgNASIgNAAIAVgaIgMgaIAMAAIAGASIANgSIANAAIgUAaIAMAag");
	this.shape.setTransform(59.675,89.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgMAYQgGgDgCgGQgCgGAAgHIAAgCQABgHAEgGQAEgHAGgDQAFgDAGgBQAKABAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgGIAGAFQgDAFgGADQgFACgGAAQgGABgFgEgAgJgEIAVAAIAAgBIAAgEQgBgEgCgBQgCgDgEAAQgIAAgEANg");
	this.shape_1.setTransform(54.7292,89.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgRAmIAHgrIgIAAIACgJIAIAAIABgFQABgIAFgFQAFgFAIAAIAHABIgBAJIgFAAQgEAAgDACQgCACgBAEIgBAFIALAAIgCAJIgKAAIgHArg");
	this.shape_2.setTransform(50.925,88.1977);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgLAkIAJg0IALAAIgJA0gAABgZQgBAAAAAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABgBQACgCACAAQABAAABABQAAAAABAAQAAAAABABQAAAAABAAQAAABABAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAgBAAIgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBg");
	this.shape_3.setTransform(47.45,88.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgMAfIgBAGIgLAAIANhKIALAAIgFAbQAFgGAIAAQAIAAAEAGQAFAFAAAJIAAAHQgBAIgEAGQgDAHgFADQgFADgGAAQgIAAgFgHgAgGAAIgEAVQACAHAIABQAEgBAEgEQAEgFABgIIAAgHQAAgEgCgDQgCgDgEAAIgBAAQgGAAgEAGg");
	this.shape_4.setTransform(43.175,88.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgRAZQgEgDgBgEQgCgFABgFIAGgiIALAAIgGAiIAAADQABAGAGABQAGgBAFgGIAHglIALAAIgJA0IgLAAIABgFQgFAGgJAAQgFAAgDgCg");
	this.shape_5.setTransform(37.9688,89.4);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgIAdQgDgEAAgHIAFgdIgIAAIABgJIAJAAIACgMIAKAAIgCAMIAJAAIgBAJIgJAAIgFAdIAAACQAAADAEAAIAEAAIgBAJIgHABQgFAAgDgEg");
	this.shape_6.setTransform(33.675,88.775);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AAHAaIgHgSIgNASIgNAAIAVgaIgMgZIAMAAIAGARIANgRIANAAIgUAZIAMAag");
	this.shape_7.setTransform(62.225,73.35);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgMAYQgGgEgCgFQgCgGAAgHIAAgCQABgHAEgGQAEgHAGgDQAFgEAGAAQAKABAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgGIAGAFQgDAGgGACQgFADgGAAQgGAAgFgEgAgJgEIAVAAIAAgBIAAgEQgBgDgCgCQgCgCgEgBQgIAAgEANg");
	this.shape_8.setTransform(57.2792,73.35);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgRAmIAHgrIgIAAIACgJIAIAAIABgFQABgIAFgFQAFgFAIAAIAHABIgBAJIgFAAQgEAAgDACQgCACgBAEIgBAFIALAAIgCAJIgKAAIgHArg");
	this.shape_9.setTransform(53.475,72.1977);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgLAkIAJgzIALAAIgJAzgAABgYQAAgBgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQACgDAEAAQAAAAABABQAAAAABAAQAAAAABABQABAAAAABQABAAAAAAQAAABABAAQAAABAAABQAAAAAAABQAAABAAAAQAAABAAAAQgBABAAAAQAAABgBABQAAAAgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgCAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_10.setTransform(50,72.35);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgMAfIgBAGIgLAAIANhKIALAAIgFAcQAFgHAIAAQAIAAAEAGQAFAFAAAIIAAAIQgBAIgEAHQgDAGgFADQgFADgGAAQgIAAgFgHgAgGAAIgEAVQACAHAIABQAEgBAEgEQAEgFABgIIAAgHQAAgEgCgDQgCgDgEAAIgBAAQgGAAgEAGg");
	this.shape_11.setTransform(45.725,72.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgRAZQgEgDgBgEQgCgFABgFIAGgiIALAAIgGAiIAAADQABAGAGABQAGgBAFgGIAHglIALAAIgJA0IgLAAIABgFQgFAGgJAAQgFAAgDgCg");
	this.shape_12.setTransform(40.5188,73.4);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgQAjIAKg7IgVAAIACgKIA1AAIgBAKIgWAAIgJA7g");
	this.shape_13.setTransform(35.325,72.45);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#E67E22").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_14.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


(lib.drag7G8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFAAgEADg");
	this.shape.setTransform(119.175,23.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgFASIAAgdIgJAAIAAgJIAJAAIAAgMIAKAAIAAAMIAKAAIAAAJIgKAAIAAAdIABAEIAFABIAEAAIAAAJIgIABQgMAAAAgPg");
	this.shape_1.setTransform(114.65,22.525);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgGAFgEQAGgDAGgBQALAAAFAIQAGAGAAANIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAGQgDAFgFADQgFADgHgBQgKABgHgIgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_2.setTransform(110.475,23.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFAAgEADg");
	this.shape_3.setTransform(105.075,23.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AAKAlIAAgiQAAgEgCgDQgDgCgEAAQgGABgEAFIAAAlIgMAAIAAhJIAMAAIAAAcQAGgIAIAAQARAAAAATIAAAig");
	this.shape_4.setTransform(99.575,22);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgPAUQgHgHAAgNIAAAAQAAgMAHgHQAGgHAKgBQAKABAGAFQAFAGABAIIgLAAQgBgEgDgDQgCgDgFAAQgFAAgDAFQgDADAAAJIAAABQAAAIADAFQADAEAFAAQAEAAADgCQADgDABgEIALAAQAAAFgDAEQgDAEgFADQgFADgGgBQgKABgGgIg");
	this.shape_5.setTransform(94.275,23.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_6.setTransform(90.325,22.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgFAlIAAhJIALAAIAABJg");
	this.shape_7.setTransform(87.775,22);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgRAUQgGgIgBgMIAAAAQAAgHAEgGQADgHAFgDQAFgDAHgBQAKAAAIAIQAGAHABALIAAABQAAAIgEAHQgDAFgFAEQgGAEgHgBQgKAAgHgHgAgIgMQgEAFAAAHQAAAJAEAFQADAEAFAAQAGAAADgEQADgGAAgIQABgHgEgFQgDgFgGAAQgFAAgDAFg");
	this.shape_8.setTransform(83.65,23.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgaAjIAAhGIAbAAQAMAAAHAHQAHAGAAAKQAAAKgHAGQgHAFgMAAIgOAAIAAAagAgNAAIAOAAQAGAAAEgDQADgDAAgGQAAgGgDgDQgEgEgGAAIgOAAg");
	this.shape_9.setTransform(77.775,22.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgKAZQgFgCgDgFQgDgEAAgEIALAAQABAEADACQADACADAAQAFAAADgBQACgCAAgDQAAgDgCgCQgDgBgFgBIgKgEQgJgDAAgJQAAgGAGgEQAGgFAHgBQAKABAGAFQAFAEABAHIgNAAQABgDgDgCQgCgDgFAAQgDAAgCADQgCABgBADQABADACACQACABAGACIALADQAEACACADQACACAAAFQAAAGgGAFQgGAFgKgBQgFAAgFgCg");
	this.shape_10.setTransform(181.5,7.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_11.setTransform(176.275,7.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgFAlIAAhKIALAAIAABKg");
	this.shape_12.setTransform(172.275,6);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_13.setTransform(168.375,7.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AAOAjIgVgeIgIAJIAAAVIgMAAIAAhGIAMAAIAAAiIAHgJIAUgZIAPAAIgbAgIAcAmg");
	this.shape_14.setTransform(162.875,6.2);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_15.setTransform(154.075,7.05);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_16.setTransform(148.625,7.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AALAaIgLgjIgKAjIgKAAIgPg0IAMAAIAIAkIALgkIAIAAIAMAkIAIgkIAMAAIgPA0g");
	this.shape_17.setTransform(142.15,7.1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_18.setTransform(135.825,7.1);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AAKAlIAAghQAAgFgCgCQgDgCgEgBQgGAAgEAGIAAAlIgMAAIAAhKIAMAAIAAAcQAGgGAIgBQARABAAASIAAAig");
	this.shape_19.setTransform(130.325,6);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAHAAIAFABIAAALIgFgBQgIABgCAGIAAAjg");
	this.shape_20.setTransform(123.55,7.05);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_21.setTransform(118.875,7.1);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAIQAFAGAAANIAAAAQAAANgFAGQgGAIgJAAQgJAAgFgHgAgKAAIAAAVQADAIAHAAQAFgBADgEQADgEAAgJIAAgBQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_22.setTransform(113.425,6.05);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AAaAbIAAgiQAAgEgCgDQgDgCgFAAQgEAAgDACQgCADgBADIAAAjIgLAAIAAgiQAAgJgKAAQgGAAgEAGIAAAlIgLAAIAAg0IAKAAIABAGQAFgHALAAQAJAAAEAJQAFgJALAAQAJAAAEAFQAEAFAAAJIAAAig");
	this.shape_23.setTransform(106.15,7.05);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_24.setTransform(99.125,7.1);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgLAjQgFgCgDgEIAFgHQAGAGAIAAQAFAAADgDQADgDAAgHIAAgDQgFAGgHgBQgJABgGgIQgGgHAAgNQAAgMAGgHQAFgIAKAAQAIAAAFAHIABgGIAKAAIAAAzQAAAKgGAHQgHAFgKABQgFAAgGgDgAgHgWQgDAFAAAIQAAAJADAEQADAEAFAAQAHAAADgGIAAgXQgDgFgHgBQgFAAgDAFg");
	this.shape_25.setTransform(93.475,8.1);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AAKAlIAAghQAAgFgCgCQgDgCgEgBQgGAAgEAGIAAAlIgMAAIAAhKIAMAAIAAAcQAGgGAIgBQARABAAASIAAAig");
	this.shape_26.setTransform(85.475,6);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgRAUQgGgHAAgNIAAAAQAAgHACgGQAEgHAFgDQAGgEAGAAQAKABAIAGQAGAIAAALIAAABQAAAJgDAGQgDAFgFAEQgGADgHAAQgKABgHgIgAgIgMQgEAFAAAHQAAAJAEAFQADAEAFAAQAGAAAEgEQACgFAAgJQAAgHgDgFQgDgFgGAAQgFAAgDAFg");
	this.shape_27.setTransform(79.85,7.1);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgGASIAAgdIgIAAIAAgJIAIAAIAAgMIAMAAIAAAMIAJAAIAAAJIgJAAIAAAdIABAEIAEABIAEAAIAAAJIgHABQgOAAAAgPg");
	this.shape_28.setTransform(75.2,6.525);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_29.setTransform(70.875,7.05);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgRAUQgGgHAAgNIAAAAQAAgHACgGQADgHAGgDQAFgEAHAAQALABAGAGQAHAIAAALIAAABQAAAJgCAGQgDAFgGAEQgFADgIAAQgKABgHgIgAgJgMQgDAFAAAHQAAAJADAFQAEAEAFAAQAGAAAEgEQADgFAAgJQgBgHgDgFQgDgFgGAAQgFAAgEAFg");
	this.shape_30.setTransform(65.25,7.1);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgNIAAAAQAAgMAHgHQAGgIAKAAQAKAAAGAGQAFAGABAJIgLAAQgBgFgDgDQgCgDgFAAQgFAAgDAFQgDADAAAJIAAABQAAAJADAEQADAEAFAAQAEAAADgDQADgCABgEIALAAQAAAFgDAEQgDAEgFADQgFACgGAAQgKAAgGgGg");
	this.shape_31.setTransform(59.875,7.1);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_32.setTransform(52.025,7.1);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_33.setTransform(46.575,8.075);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_34.setTransform(40.975,7.1);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgNAbIAAg0IAMAAIAAAGQADgHAIAAIAEABIgBALIgEgBQgIABgCAGIAAAjg");
	this.shape_35.setTransform(36.75,7.05);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_36.setTransform(32.125,7.1);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAIQAFAGAAANIAAAAQAAANgFAGQgGAIgJAAQgJAAgFgHgAgKAAIAAAVQADAIAHAAQAFgBADgEQADgEAAgJIAAgBQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_37.setTransform(26.675,6.05);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_38.setTransform(21.125,7.1);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgZAjIAAhGIAZAAQALAAAHAFQAGAFAAAKQAAAEgDAFQgCADgFACQAFABAEAFQADAEAAAGQgBAKgGAFQgHAGgMgBgAgMAZIANAAQAFABAEgDQADgDAAgFQAAgMgLABIgOAAgAgMgEIAMAAQAFgBADgCQAEgDgBgEQAAgGgDgCQgCgCgGAAIgMAAg");
	this.shape_39.setTransform(15.35,6.2);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFE319").s().p("AvSikIelgJIAAFRI+lAKg");
	this.shape_40.setTransform(98.125,14.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0.3,-3.1,195.7,34.8);


(lib.drag7G7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape.setTransform(85.6,8.675);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgPAgIAAg+IANAAIAAAHQAEgIAKAAIAEABIAAANIgFgBQgKAAgDAIIAAAqg");
	this.shape_1.setTransform(82.25,9.825);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_2.setTransform(76.675,9.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgHAWIAAgjIgKAAIAAgLIAKAAIAAgPIAOAAIAAAPIALAAIAAALIgLAAIAAAjQgBADACACQACABADAAIAFAAIAAALIgJABQgQAAAAgSg");
	this.shape_3.setTransform(71.25,9.15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgDACQgEADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAHAAQAKAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_4.setTransform(66.15,9.875);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AAdArIAAgcIACglIgaBBIgJAAIgZhBIABAlIAAAcIgPAAIAAhVIAUAAIAXBBIAZhBIATAAIAABVg");
	this.shape_5.setTransform(57.625,8.775);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgPAgIAAg+IANAAIAAAHQAEgIAKAAIAEABIAAANIgFgBQgKAAgDAIIAAAqg");
	this.shape_6.setTransform(47.6,9.825);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAHAFAAALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_7.setTransform(41.95,9.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgNAlIgBAIIgNAAIAAhaIAOAAIAAAhQAGgHAKAAQALAAAHAJQAHAIAAAOIAAACQAAAOgHAJQgHAIgLAAQgKABgGgJgAgNAAIAAAaQAEAIAJAAQAGAAAEgFQADgFAAgKIAAgCQAAgKgDgEQgEgGgGAAQgJAAgEAIg");
	this.shape_8.setTransform(35.475,8.6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_9.setTransform(26.725,9.825);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgEAAgEACQgDADABAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCABgDIAAgMIgHAAQgHAAgEADg");
	this.shape_10.setTransform(18.25,9.875);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgQAnQgHgFgFgJQgEgJgBgMIAAgGQAAgTAJgLQAKgLAPAAQAPAAAIAHQAJAHABAOIgPAAQgCgQgQAAQgJAAgEAHQgGAIAAANIAAAGQAAAOAGAHQAGAIAJAAQAMAAAEgFIAAgRIgSAAIAAgKIAhAAIAAAgQgEAGgJADQgIADgLAAQgJAAgJgFg");
	this.shape_11.setTransform(10.85,8.775);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFE319").s().p("AnShxIOlgFIAADnIulAGg");
	this.shape_12.setTransform(46.975,8.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0.3,-3.1,93.4,23.900000000000002);


(lib.btnMenuKI = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#18B8C4").s().p("AhXBMIBNhMIhNhMIAygxIB9B9Ih9B+g");
	this.shape.setTransform(-43.283,1.4244,0.5328,0.5328,-90);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#18B8C4").s().p("Ah6CSICRiSIiRiRIAygyIDCDDIjCDDg");
	this.shape_1.setTransform(-43.283,-6.9012,0.5328,0.5328,-90);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAUAxIAAgUQgMANgHAEQgFADgIAAQgIAAgFgEQgGgFgDgHQgCgIAAgNIAAgqQAAgGgBgDQgCgDgDgBQgDgBgHAAIAAgEIAhAAIAAA/QAAANAFAEQAFAEAGAAQAEAAAFgCQAGgDAIgIIAAg1QAAgIgDgDQgDgDgJAAIAAgEIAgAAIAAA5IABAUQABAEABABIAEACQAEAAAEgCIABADIgcAMg");
	this.shape_2.setTransform(20.775,1.075);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAFAxIAAgEIACAAQAHAAADgCQACgCABgEIABgKIAAgmQAAgNgEgGQgDgFgIgBQgLAAgNAOIAAAxQAAAKABADQACADACABQADABAIAAIAAAEIgvAAIAAgEIACAAQAHAAADgEQACgDAAgLIAAgiQAAgRgBgEIgCgFQgBAAAAgBQAAAAgBAAQAAAAgBAAQgBgBAAAAIgHACIgCgEIAdgLIAEAAIAAAUQARgUAOAAQAIAAAGAEQAFADAEAKQACAGAAANIAAAnQAAAKABADQABADADABQADABAGAAIAAAEg");
	this.shape_3.setTransform(10.125,0.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgbAlQgMgNAAgXQAAgXAMgOQANgOASAAQAQAAAKALQAKALAAARIhBAAQAAAVALAMQAKAMANAAQAKAAAHgFQAGgGAFgMIADACQgCAOgKAMQgLAMgQAAQgQAAgMgOgAgRgjQgGAGgCAMIAsAAQgBgJgCgEQgCgGgFgDQgFgDgFAAQgJAAgHAHg");
	this.shape_4.setTransform(0.125,0.925);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAfBGIAAgDIAFAAQAJgBAEgFQACgDAAgMIAAheIg2B2IgDAAIg3h2IAABeQAAANADADQAEAFAIAAIAFAAIAAADIgxAAIAAgDIAFAAQAJgBAEgFQACgDAAgMIAAhbQAAgJgCgFQgBgDgEgCQgEgCgJAAIAAgDIAoAAIAzBtIAyhtIAoAAIAAADIgFAAQgJAAgEAGQgCADAAAMIAABbQAAANADADQAEAFAIAAIAFAAIAAADg");
	this.shape_5.setTransform(-14.225,-1.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2368CD").s().p("AgPDZQg3AAgngnIgGgFQggglgCgxIAAipQAAg3AogoQAngnA3AAIClAAIAAGxg");
	this.shape_6.setTransform(-44.4,-3.875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#4B7BEC").s().p("Am4DZIAAmxILqAAQA3AAAoAnQAWAWAKAcQAHAVAAAYIAACpQAAAVgHAUQgJAYgSAVIgFAFQgoAng3AAg");
	this.shape_7.setTransform(14.65,-3.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#535353").s().p("AnHBcQg4AAgngnIgFgGQgagdgHglQgCgJAAgKIAAg1QACAxAhAlIAFAFQAnAmA4AAIClAAILqAAQA3AAAogmIAFgFQASgVAJgYQAHgTAAgWIAAA1IAAAEIAAAFQgBAPgEAOIgCACQgJAZgSAUIgFAGQgoAng3AAg");
	this.shape_8.setTransform(-0.35,14);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAFAxIAAgEIACAAQAHAAADgBQACgDABgEIABgKIAAglQAAgOgEgFQgDgHgIAAQgLAAgNAOIAAAxQAAAKABADQACACACACQADACAIgBIAAAEIgvAAIAAgEIACAAQAHAAADgDQACgEAAgLIAAgiQAAgRgBgEIgCgFQgBAAAAgBQAAAAgBAAQAAAAgBAAQgBgBAAAAIgHACIgCgEIAdgLIAEAAIAAAUQARgUAOAAQAIAAAGAEQAFADAEAKQACAGAAANIAAAnQAAAJABAEQABACADACQADACAGgBIAAAEg");
	this.shape_9.setTransform(10.125,2.4);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAfBGIAAgDIAFAAQAJAAAEgGQACgDAAgMIAAhdIg2B1IgDAAIg3h1IAABdQAAANADADQAEAFAIAAIAFAAIAAADIgxAAIAAgDIAFAAQAJAAAEgGQACgDAAgMIAAhbQAAgKgCgEQgBgDgEgCQgEgCgJAAIAAgEIAoAAIAzBuIAyhuIAoAAIAAAEIgFAAQgJAAgEAFQgCAEAAAMIAABbQAAANADADQAEAFAIAAIAFAAIAAADg");
	this.shape_10.setTransform(-14.225,0.25);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#535353").s().p("AnHBUQg4AAgngnIgFgGQgagdgHglQgCgJAAgKIAAglQACAyAhAjIAFAFQAnAnA4AAIClAAILqAAQA3AAAognIAFgFQASgUAJgYQAHgTAAgWIAAAlIAAAEIAAAFQgBAPgEAOIgCADQgJAYgSAUIgFAGQgoAng3AAg");
	this.shape_11.setTransform(-0.35,14.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAFAxIAAgDIACAAQAHAAADgDQACgCABgEIABgJIAAgnQAAgMgEgHQgDgFgIAAQgLAAgNANIAAAyQAAAJABACQACADACACQADACAIAAIAAADIgvAAIAAgDIACAAQAHAAADgFQACgDAAgKIAAgjQAAgRgBgEIgCgFQgBAAAAgBQAAAAgBAAQAAAAgBAAQgBAAAAAAIgHABIgCgEIAdgLIAEAAIAAAUQARgUAOAAQAIAAAGAEQAFADAEAJQACAHAAAMIAAApQAAAIABADQABADADACQADACAGAAIAAADg");
	this.shape_12.setTransform(10.125,6.4);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAfBHIAAgFIAFAAQAJAAAEgFQACgDAAgMIAAheIg2B3IgDAAIg3h3IAABeQAAANADAEQAEADAIAAIAFAAIAAAFIgxAAIAAgFIAFAAQAJAAAEgFQACgDAAgMIAAhbQAAgKgCgEQgBgDgEgCQgEgCgJAAIAAgDIAoAAIAzBtIAyhtIAoAAIAAADIgFAAQgJAAgEAGQgCADAAAMIAABbQAAANADAEQAEADAIAAIAFAAIAAAFg");
	this.shape_13.setTransform(-14.225,4.25);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2368CD").s().p("AgPDZQg3AAgngnIgGgFQgfgjgDgvIAAgEIAAgDIAAimQAAg3AogoQAngnA3AAIClAAIAAGxg");
	this.shape_14.setTransform(-44.4,1.725);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#4B7BEC").s().p("Am4DZIAAmxILqAAQA3AAAoAnQAWAWAKAcQAHAVAAAYIAACpIAAABQAAAVgHATQgJAYgSAVIgFAFQgoAng3AAg");
	this.shape_15.setTransform(14.65,1.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7,p:{y:-3.875}},{t:this.shape_6,p:{y:-3.875}},{t:this.shape_5},{t:this.shape_4,p:{y:0.925}},{t:this.shape_3},{t:this.shape_2,p:{y:1.075}},{t:this.shape_1,p:{y:-6.9012}},{t:this.shape,p:{y:1.4244}}]}).to({state:[{t:this.shape_7,p:{y:-2.275}},{t:this.shape_11},{t:this.shape_6,p:{y:-2.275}},{t:this.shape_10},{t:this.shape_4,p:{y:2.525}},{t:this.shape_9},{t:this.shape_2,p:{y:2.675}},{t:this.shape_1,p:{y:-5.3012}},{t:this.shape,p:{y:3.0244}}]},1).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_4,p:{y:6.525}},{t:this.shape_12},{t:this.shape_2,p:{y:6.675}},{t:this.shape_1,p:{y:-1.3012}},{t:this.shape,p:{y:7.0244}}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.4,-25.6,118.1,49.1);


(lib.btnKINext = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.bookpngcopy();
	this.instance.setTransform(-53,-16,0.0628,0.0628);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#16681E").s().p("AgEA9QgEgCgCgFQgDgFAAgKIAAg/IgPAAIAAgEQAGgDAGgFQAGgFAFgIQACgDADgLIAEAAIAAAfIAWAAIAAAIIgWAAIAAA8QAAAKACADQADADAEAAQAEAAADgCQADgCACgFIAEAAQgEALgGAFQgHAFgHAAQgFAAgEgDg");
	this.shape.setTransform(31.175,-0.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#16681E").s().p("AAUAxIAAgUQgMANgHAEQgFADgIAAQgIAAgFgEQgGgFgDgHQgCgIAAgNIAAgqQAAgGgBgDQgCgDgDgBQgDgBgHAAIAAgEIAhAAIAAA/QAAANAFAEQAFAEAGAAQAEAAAFgCQAGgDAIgIIAAg1QAAgIgDgDQgDgDgJAAIAAgEIAgAAIAAA5IABAUIACAFIAEACQAEAAAEgCIABADIgcAMg");
	this.shape_1.setTransform(22.775,1.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#16681E").s().p("AgYBeQgEgEAAgDQAAgEADgDQADgCADAAQADgBACACQACAAAFAGQAFAEACAAQADAAADgCQACgCABgFQABgEAAgPIAAhDQAAgQgBgFQAAAAAAgBQAAgBgBAAQAAgBAAAAQgBgBAAAAQAAAAgBgBQAAAAgBAAQAAAAgBAAQgBgBgBAAIgFACIgCgEIAcgLIAEAAIAABfQAAAYgKAMQgKAMgQAAQgJAAgGgDgAALhOQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_2.setTransform(12.75,0.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#16681E").s().p("AAFAxIAAgEIACAAQAHAAADgCQACgCABgEIABgKIAAgmQAAgNgEgGQgDgFgIgBQgLAAgNAOIAAAxQAAAKABADQACADACABQADABAIAAIAAAEIgvAAIAAgEIACAAQAHAAADgEQACgDAAgLIAAgiQAAgRgBgEIgCgFQgBAAAAgBQAAAAgBAAQAAAAgBAAQgBgBAAAAIgHACIgCgEIAdgLIAEAAIAAAUQARgUAOAAQAIAAAGAEQAFADAEAKQACAGAAANIAAAnQAAAKABADQABADADABQADABAGAAIAAAEg");
	this.shape_3.setTransform(6.175,0.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#16681E").s().p("AANAvQgDgEAAgJIgRAOQgGACgGAAQgKAAgHgHQgGgHAAgLQAAgHADgFQAEgHALgGQAKgFAYgJIAAgEQAAgOgFgGQgEgFgIAAQgGAAgEADQgEAEAAAFIAAAGQAAAEgCADQgDADgEAAQgEAAgCgDQgDgCAAgFQAAgJAKgHQAJgIAQAAQAMAAAIAEQAGAEADAGQACAEAAAPIAAAfIABAQIABAEIADACIADgBIAIgHIAAAFQgLAQgLAAQgFAAgDgDgAgJAAQgJAEgDAGQgEAEAAAHQAAAHAFAFQAEAFAGAAQAIAAAMgKIAAgkIgTAIg");
	this.shape_4.setTransform(-3.525,0.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#16681E").s().p("Ag8BGIAAgDIAFAAQAKgBADgFQADgEAAgLIAAhbQAAgNgEgDQgDgFgJAAIgFAAIAAgDIA/AAIAAADQgKAAgEACQgFADgCADQgCADABANIAABYQgBAIACAEIAEACQACABANAAIAKAAQARAAAGgCQAHgCAFgHQAGgFAGgOIADABIgMAmg");
	this.shape_5.setTransform(-15.15,-1.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#16681E").s().p("AnHBcQg4AAgngnIgFgGQgagdgHglQgCgJAAgKIAAg1QACAxAhAlIAFAFQAnAmA4AAIClAAILqAAQA3AAAogmIAFgFQASgVAJgYQAHgTAAgWIAAA1IAAAEIAAAFQgBAPgEAOIgCACQgJAZgSAUIgFAGQgoAng3AAg");
	this.shape_6.setTransform(-0.35,14);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#27AE60").s().p("AgPDZQg3AAgngnIgGgFQggglgCgxIAAipQAAg3AogoQAngnA3AAIClAAIAAGxg");
	this.shape_7.setTransform(-44.4,-3.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2ECC71").s().p("Am4DZIAAmxILqAAQA3AAAoAnQAWAWAKAcQAHAVAAAYIAACpQAAAVgHAUQgJAYgSAVIgFAFQgoAng3AAg");
	this.shape_8.setTransform(14.65,-3.875);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#16681E").s().p("AgEA9QgEgCgCgFQgDgFAAgKIAAg/IgPAAIAAgEQAGgCAGgFQAGgHAFgHQACgEADgKIAEAAIAAAfIAWAAIAAAIIgWAAIAAA9QAAAIACAEQADADAEAAQAEAAADgCQADgDACgEIAEAAQgEALgGAFQgHAFgHAAQgFAAgEgDg");
	this.shape_9.setTransform(31.175,1.45);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#16681E").s().p("AgYBeQgEgEAAgEQAAgDADgDQADgDADAAQADABACABQACAAAFAGQAFAEACAAQADAAADgCQACgCABgFQABgEAAgPIAAhDQAAgQgBgFQAAAAAAgBQAAgBgBAAQAAgBAAAAQgBgBAAAAQAAAAgBgBQAAAAgBAAQAAAAgBAAQgBAAgBAAIgFABIgCgEIAcgLIAEAAIAABfQAAAYgKAMQgKAMgQAAQgJAAgGgDgAALhOQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_10.setTransform(12.75,2.6);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#16681E").s().p("AAFAxIAAgDIACAAQAHAAADgDQACgCABgEIABgJIAAgnQAAgMgEgHQgDgFgIAAQgLAAgNANIAAAyQAAAJABADQACACACACQADACAIAAIAAADIgvAAIAAgDIACAAQAHAAADgFQACgDAAgKIAAgjQAAgRgBgEIgCgFQgBAAAAgBQAAAAgBAAQAAAAgBAAQgBAAAAAAIgHABIgCgEIAdgLIAEAAIAAAUQARgUAOAAQAIAAAGAEQAFADAEAJQACAHAAAMIAAApQAAAIABAEQABACADACQADACAGAAIAAADg");
	this.shape_11.setTransform(6.175,2.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#16681E").s().p("AANAvQgDgEAAgIIgRANQgGACgGAAQgKAAgHgHQgGgHAAgKQAAgHADgGQAEgHALgGQAKgGAYgIIAAgEQAAgOgFgGQgEgFgIAAQgGAAgEADQgEAEAAAFIAAAGQAAAFgCACQgDADgEAAQgEAAgCgDQgDgDAAgEQAAgJAKgIQAJgHAQAAQAMAAAIAEQAGADADAHQACAFAAAOIAAAfIABAQIABAFIADABIADgBIAIgHIAAAGQgLAPgLAAQgFAAgDgDgAgJAAQgJAFgDAFQgEAFAAAFQAAAIAFAFQAEAFAGAAQAIAAAMgKIAAgkIgTAIg");
	this.shape_12.setTransform(-3.525,2.9);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#16681E").s().p("Ag8BHIAAgFIAFAAQAKAAADgFQADgDAAgMIAAhaQAAgOgEgDQgDgFgJAAIgFAAIAAgDIA/AAIAAADQgKAAgEACQgFACgCADQgCAEABANIAABYQgBAIACADIAEADQACACANAAIAKAAQARAAAGgDQAHgCAFgHQAGgFAGgOIADABIgMAng");
	this.shape_13.setTransform(-15.15,0.65);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#16681E").s().p("AnHBSQg4AAgngnIgFgGQgagdgHglQgCgJAAgKIAAghQACAxAhAkIAFAFQAnAoA4AAIClAAILqAAQA3AAAogoIAFgFQASgUAJgXQAHgVAAgVIAAAhIAAAEIAAAFQgBAPgEAOIgCADQgJAYgSAUIgFAGQgoAng3AAg");
	this.shape_14.setTransform(-0.35,15);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#16681E").s().p("AgEA+QgEgDgCgFQgDgFAAgLIAAg/IgPAAIAAgDQAGgDAGgFQAGgFAFgIQACgDADgLIAEAAIAAAfIAWAAIAAAHIgWAAIAAA9QAAAKACADQADADAEAAQAEAAADgCQADgDACgDIAEAAQgEAKgGAFQgHAFgHAAQgFAAgEgCg");
	this.shape_15.setTransform(31.175,5.45);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#16681E").s().p("AgYBdQgEgDAAgEQAAgDADgCQADgDADgBQADAAACACQACABAFAEQAFAFACAAQADAAADgCQACgCABgEQABgFAAgPIAAhDQAAgQgBgEQAAgBAAgBQAAgBgBAAQAAgBAAAAQgBgBAAAAQAAAAgBgBQAAAAgBAAQAAAAgBAAQgBgBgBAAIgFACIgCgDIAcgMIAEAAIAABfQAAAZgKALQgKAMgQAAQgJAAgGgEgAALhOQgDgDAAgFQAAgEADgDQADgDAEAAQAFAAADADQADADAAAEQAAAFgDADQgDADgFAAQgEAAgDgDg");
	this.shape_16.setTransform(12.75,6.6);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#16681E").s().p("AAFAxIAAgEIACAAQAHAAADgBQACgDABgEIABgKIAAglQAAgOgEgFQgDgHgIAAQgLAAgNAOIAAAxQAAAKABACQACAEACABQADACAIgBIAAAEIgvAAIAAgEIACAAQAHAAADgDQACgEAAgLIAAgiQAAgRgBgEIgCgFQgBAAAAgBQAAAAgBAAQAAAAgBAAQgBgBAAAAIgHACIgCgDIAdgMIAEAAIAAAUQARgUAOAAQAIAAAGAEQAFAEAEAIQACAHAAANIAAAnQAAAKABACQABAEADABQADACAGgBIAAAEg");
	this.shape_17.setTransform(6.175,6.8);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#16681E").s().p("AANAuQgDgDAAgJIgRANQgGADgGAAQgKAAgHgHQgGgGAAgMQAAgHADgEQAEgIALgGQAKgFAYgJIAAgEQAAgOgFgFQgEgGgIAAQgGAAgEAEQgEADAAAFIAAAGQAAAEgCADQgDADgEAAQgEAAgCgDQgDgDAAgFQAAgIAKgIQAJgHAQAAQAMAAAIAEQAGADADAHQACAEAAAOIAAAgIABARIABADIADACIADgBIAIgIIAAAGQgLAQgLAAQgFAAgDgEgAgJAAQgJAFgDAEQgEAGAAAFQAAAIAFAFQAEAFAGAAQAIAAAMgLIAAgjIgTAIg");
	this.shape_18.setTransform(-3.525,6.9);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#16681E").s().p("Ag8BGIAAgDIAFAAQAKAAADgGQADgEAAgMIAAhaQAAgNgEgEQgDgEgJAAIgFAAIAAgEIA/AAIAAAEQgKAAgEACQgFADgCADQgCADABAMIAABYQgBAJACAEIAEADQACAAANABIAKAAQARgBAGgCQAHgCAFgGQAGgHAGgMIADAAIgMAmg");
	this.shape_19.setTransform(-15.15,4.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8,p:{y:-3.875}},{t:this.shape_7,p:{y:-3.875}},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{y:1.075}},{t:this.shape},{t:this.instance,p:{y:-16}}]}).to({state:[{t:this.shape_8,p:{y:-1.875}},{t:this.shape_14},{t:this.shape_7,p:{y:-1.875}},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_1,p:{y:3.075}},{t:this.shape_9},{t:this.instance,p:{y:-14}}]},1).to({state:[{t:this.shape_8,p:{y:2.125}},{t:this.shape_7,p:{y:2.125}},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_1,p:{y:7.075}},{t:this.shape_15},{t:this.instance,p:{y:-10}}]},1).to({state:[{t:this.shape_8,p:{y:2.125}},{t:this.shape_7,p:{y:2.125}},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_1,p:{y:7.075}},{t:this.shape_15},{t:this.instance,p:{y:-10}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.4,-25.6,118.1,49.5);


(lib.btnKIBack = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#ED4F44").s().p("AgfAzQgGgEAAgHIAAhQQAAgGAGgEQAHgDAFAEIAzAoQAGAEAAAFQAAAHgGAEIgzAmQgDADgDAAIgGgBg");
	this.shape.setTransform(-38.9392,-3.0036,0.7124,0.7882,180);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#ED4F44").s().p("Ah3C3QgGgDAAgHIAAgiQAAgOAMgJICPhrQAEgEAAgFQAAgFgEgDIiPhsQgMgIAAgOIAAgiQAAgHAGgDQAHgDAFAEIDkCrQAFAEAAAGQAAAHgFAEIjkCrQgDACgEAAIgFgBg");
	this.shape_1.setTransform(-45.2259,-3.0233,0.7124,0.7882,180);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgVBKIAAgEQAGAAADgBQACgBACgDQACgDgBgKIAAglQAAgPgBgEQgBgDgBgBQAAAAgBgBQAAAAgBAAQAAAAgBAAQAAgBgBAAIgHACIgCgEIAcgLIAEAAIAABLQABAKABADQABADADABQACABAHAAIAAAEgAgGg3QgDgDAAgEQAAgFADgDQAEgDADAAQAFAAADADQACADAAAFQAAAEgCADQgDADgFAAQgDAAgEgDg");
	this.shape_2.setTransform(46.85,-1.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgWBKIAAgEQAHAAACgBQADgBABgDIABgNIAAhVIAAgUIgDgFQAAAAgBgBQAAAAAAAAQgBAAgBAAQAAAAgBAAIgHABIgBgDIAbgMIAFAAIAAB9QAAAKABADQABACADACQADABAHAAIAAAEg");
	this.shape_3.setTransform(41.025,-1.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AANAvQgDgEAAgJIgRAOQgGACgGAAQgKAAgHgHQgGgHAAgLQAAgHADgFQAEgHALgGQAKgFAYgJIAAgEQAAgOgFgGQgEgFgIAAQgGAAgEADQgEAEAAAFIAAAGQAAAEgCADQgDADgEAAQgEAAgCgDQgDgCAAgFQAAgJAKgHQAJgIAQAAQAMAAAIAEQAGAEADAGQACAEAAAPIAAAfIABAQIABAEIADACIADgBIAIgHIAAAFQgLAQgLAAQgFAAgDgDgAgJAAQgJAEgDAGQgEAEAAAHQAAAHAFAFQAEAFAGAAQAIAAAMgKIAAgkIgTAIg");
	this.shape_4.setTransform(33.525,0.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgPBIQgJgCgJgHIAAhiIAAgUIgDgEQAAgBgBAAQAAAAgBgBQAAAAgBAAQgBAAAAAAIgHACIgCgEIAdgLIAFAAIAABFQANgUAPAAQAPAAALANQALAMAAAVQAAAagRAPQgOAOgSAAQgHAAgJgEgAgFgHQgEACgGAFIAAA6QAFAFAGACQAEADAGAAQAKAAAIgKQAIgLAAgUQAAgSgIgJQgIgKgLAAQgFAAgFADg");
	this.shape_5.setTransform(22.725,-1.55);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAiAxIAAgEIADAAQAFAAAEgCQACgCABgDIABgLIAAgnQAAgNgDgEQgEgHgJAAQgGAAgFADQgGADgHAIIgBABIABAEIAAAsQAAAKABADQABACACABQADACAIAAIAAAEIgwAAIAAgEQAJAAACgCQADgCACgDIAAgLIAAgnQAAgNgDgFQgFgGgIAAQgFAAgGADQgJAEgFAHIAAAxQABAKABADQABADADABQACABAIAAIAAAEIgvAAIAAgEQAHAAACgBQACgBACgDQABgDAAgKIAAgjQAAgQgBgFQAAgDgCgBQAAAAgBgBQAAAAgBAAQAAAAgBAAQAAgBgBAAIgHACIgBgEIAcgLIAEAAIAAAUIANgMQAEgEAGgCQAGgCAFAAQAJAAAFAFQAGAFADAKQAKgNAIgDQAHgEAIAAQAHAAAHAEQAFADAEAKQACAFAAAOIAAAnQAAAKABADQABACAEABQACACAHAAIAAAEg");
	this.shape_6.setTransform(9.55,0.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgbAlQgMgNAAgXQAAgXAMgOQANgOASAAQAQAAAKALQAKALAAARIhBAAQAAAVALAMQAKAMANAAQAKAAAHgFQAGgGAFgMIADACQgCAOgKAMQgLAMgQAAQgQAAgMgOgAgRgjQgGAGgCAMIAsAAQgBgJgCgEQgCgGgFgDQgFgDgFAAQgJAAgHAHg");
	this.shape_7.setTransform(-3.425,0.925);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAJBGIAAgDQAGAAADgCQACgCAAgDIgBgEIgGgIIgwgwIAAAuQAAAKABADQABADAEACQAEACAFABIAFAAIAAADIg8AAIAAgDIAFAAQAJAAADgGQADgDAAgMIAAhbQAAgKgBgEQgBgDgEgCQgEgCgFAAIgFAAIAAgDIA8AAIAAADIgFAAQgFAAgEACQgEACgBAEQgBADAAAKIAAArIAOgMQAegdAHgJQACgFAAgDQAAgBAAAAQAAgBAAAAQgBAAAAgBQAAAAgBgBQgCgCgFAAIgDAAIAAgDIA0AAIAAADQgFAAgEABQgEABgFAEQgFADgIAIIgVAUIgVAWIAzAzQANANAJAEQAJAFAJABIAAADg");
	this.shape_8.setTransform(-15.675,-1.35);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#9E392B").s().p("AgPDZQg3AAgngnIgGgFQggglgCgxIAAipQAAg3AogoQAngnA3AAIClAAIAAGxg");
	this.shape_9.setTransform(-44.4,-3.875);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#E74C3C").s().p("Am4DZIAAmxILqAAQA3AAAoAnQAWAWAKAcQAHAVAAAYIAACpQAAAVgHAUQgJAYgSAVIgFAFQgoAng3AAg");
	this.shape_10.setTransform(14.65,-3.875);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#535353").s().p("AnHBcQg4AAgngnIgFgGQgagdgHglQgCgJAAgKIAAg1QACAxAhAlIAFAFQAnAmA4AAIClAAILqAAQA3AAAogmIAFgFQASgVAJgYQAHgTAAgWIAAA1IAAAEIAAAFQgBAPgEAOIgCACQgJAZgSAUIgFAGQgoAng3AAg");
	this.shape_11.setTransform(-0.35,14);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgVBKIAAgDQAGAAADgCQACgCACgCQACgEgBgIIAAglQAAgQgBgEQgBgDgBgBQAAAAgBgBQAAAAgBAAQAAAAgBAAQAAAAgBAAIgHABIgCgEIAcgLIAEAAIAABMQABAIABAEQABACADACQACACAHAAIAAADgAgGg3QgDgDAAgEQAAgFADgDQAEgDADAAQAFAAADADQACADAAAFQAAAEgCADQgDADgFAAQgDAAgEgDg");
	this.shape_12.setTransform(46.85,0.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgWBKIAAgDQAHAAACgCQADgCABgCIABgMIAAhWIAAgUIgDgFQAAAAgBgBQAAAAAAAAQgBAAgBAAQAAgBgBAAIgHACIgBgDIAbgMIAFAAIAAB+QAAAIABAEQABACADACQADACAHAAIAAADg");
	this.shape_13.setTransform(41.025,0.3);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AANAvQgDgEAAgIIgRANQgGACgGAAQgKAAgHgHQgGgHAAgKQAAgHADgGQAEgHALgGQAKgGAYgIIAAgEQAAgOgFgGQgEgFgIAAQgGAAgEADQgEAEAAAFIAAAGQAAAFgCACQgDADgEAAQgEAAgCgDQgDgDAAgEQAAgJAKgIQAJgHAQAAQAMAAAIAEQAGADADAHQACAFAAAOIAAAfIABAQIABAFIADABIADgBIAIgHIAAAGQgLAPgLAAQgFAAgDgDgAgJAAQgJAFgDAFQgEAFAAAFQAAAIAFAFQAEAFAGAAQAIAAAMgKIAAgkIgTAIg");
	this.shape_14.setTransform(33.525,2.9);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgPBJQgJgEgJgFIAAhiIAAgVIgDgEQAAgBgBAAQAAAAgBgBQAAAAgBAAQgBAAAAAAIgHACIgCgEIAdgMIAFAAIAABGQANgUAPABQAPAAALAMQALAMAAAVQAAAagRAPQgOAOgSAAQgHAAgJgDgAgFgHQgEACgGAFIAAA6QAFAEAGADQAEADAGAAQAKAAAIgKQAIgLAAgUQAAgSgIgJQgIgKgLAAQgFAAgFADg");
	this.shape_15.setTransform(22.725,0.45);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAiAxIAAgDIADAAQAFAAAEgDQACgCABgDIABgKIAAgpQAAgMgDgEQgEgHgJABQgGAAgFACQgGADgHAHIgBABIABAFIAAAtQAAAJABADQABACACABQADADAIAAIAAADIgwAAIAAgDQAJAAACgDQADgBACgEIAAgKIAAgpQAAgLgDgGQgFgGgIAAQgFAAgGADQgJAFgFAFIAAAzQABAJABADQABACADACQACACAIAAIAAADIgvAAIAAgDQAHAAACgCQACgCACgCQABgEAAgIIAAgkQAAgPgBgGQAAgDgCgBQAAAAgBgBQAAAAgBAAQAAAAgBAAQAAAAgBAAIgHABIgBgEIAcgLIAEAAIAAAUIANgMQAEgEAGgCQAGgCAFAAQAJAAAFAFQAGAFADAKQAKgNAIgDQAHgEAIAAQAHAAAHAEQAFADAEAJQACAGAAANIAAApQAAAIABAEQABACAEABQACADAHAAIAAADg");
	this.shape_16.setTransform(9.55,2.8);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AAJBHIAAgFQAGAAADgBQACgCAAgDIgBgEIgGgIIgwgwIAAAuQAAAKABADQABAEAEABQAEADAFgBIAFAAIAAAFIg8AAIAAgFIAFAAQAJAAADgEQADgEAAgMIAAhaQAAgLgBgEQgBgDgEgBQgEgDgFAAIgFAAIAAgDIA8AAIAAADIgFAAQgFAAgEADQgEABgBADQgBAEAAALIAAAqIAOgNQAegcAHgJQACgFAAgDQAAgBAAAAQAAgBAAAAQgBgBAAAAQAAgBgBAAQgCgCgFAAIgDAAIAAgDIA0AAIAAADQgFAAgEABQgEACgFADQgFADgIAHIgVAVIgVAWIAzAzQANANAJAFQAJAEAJAAIAAAFg");
	this.shape_17.setTransform(-15.675,0.65);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#535353").s().p("AnHBSQg4AAgngnIgFgGQgagdgHglQgCgJAAgKIAAghQACAxAhAkIAFAFQAnAoA4AAIClAAILqAAQA3AAAogoIAFgFQASgUAJgXQAHgVAAgVIAAAhIAAAEIAAAFQgBAPgEAOIgCADQgJAYgSAUIgFAGQgoAng3AAg");
	this.shape_18.setTransform(-0.35,15);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgVBKIAAgDQAGAAADgCQACgBACgDQACgEgBgIIAAgmQAAgPgBgEQgBgDgBgBQAAAAgBgBQAAAAgBAAQAAAAgBAAQAAAAgBAAIgHABIgCgEIAcgLIAEAAIAABMQABAIABAEQABADADABQACACAHAAIAAADgAgGg3QgDgDAAgEQAAgFADgDQAEgDADAAQAFAAADADQACADAAAFQAAAEgCADQgDADgFAAQgDAAgEgDg");
	this.shape_19.setTransform(46.85,3.8);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgWBKIAAgDQAHAAACgCQADgBABgDIABgMIAAhWIAAgUIgDgFQAAAAgBgBQAAAAAAAAQgBAAgBAAQAAAAgBgBIgHACIgBgDIAbgMIAFAAIAAB+QAAAIABAEQABACADACQADACAHAAIAAADg");
	this.shape_20.setTransform(41.025,3.8);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AANAvQgDgEAAgJIgRAOQgGACgGAAQgKAAgHgHQgGgHAAgLQAAgHADgFQAEgHALgGQAKgFAYgJIAAgEQAAgOgFgGQgEgFgIAAQgGAAgEADQgEAEAAAFIAAAGQAAAFgCACQgDADgEAAQgEAAgCgDQgDgCAAgFQAAgJAKgHQAJgIAQAAQAMAAAIAEQAGAEADAGQACAEAAAPIAAAfIABAQIABAFIADABIADgBIAIgHIAAAFQgLAQgLAAQgFAAgDgDgAgJAAQgJAEgDAGQgEAEAAAHQAAAHAFAFQAEAFAGAAQAIAAAMgKIAAgkIgTAIg");
	this.shape_21.setTransform(33.525,6.4);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgPBIQgJgCgJgHIAAhiIAAgUIgDgEQAAgBgBAAQAAAAgBgBQAAAAgBAAQgBAAAAAAIgHACIgCgEIAdgMIAFAAIAABGQANgUAPABQAPAAALAMQALAMAAAVQAAAagRAPQgOAOgSAAQgHAAgJgEgAgFgHQgEACgGAFIAAA6QAFAEAGADQAEADAGAAQAKAAAIgKQAIgLAAgUQAAgSgIgJQgIgKgLAAQgFAAgFADg");
	this.shape_22.setTransform(22.725,3.95);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AAiAxIAAgDIADAAQAFAAAEgDQACgCABgDIABgKIAAgpQAAgMgDgEQgEgHgJAAQgGAAgFADQgGADgHAIIgBAAIABAFIAAAtQAAAJABADQABACACABQADACAIABIAAADIgwAAIAAgDQAJgBACgCQADgCACgDIAAgKIAAgpQAAgMgDgFQgFgGgIAAQgFAAgGADQgJAFgFAGIAAAyQABAJABADQABADADABQACACAIAAIAAADIgvAAIAAgDQAHAAACgCQACgBACgDQABgEAAgIIAAgkQAAgPgBgGQAAgDgCgBQAAAAgBgBQAAAAgBAAQAAAAgBAAQAAAAgBAAIgHABIgBgEIAcgLIAEAAIAAAUIANgMQAEgEAGgCQAGgCAFAAQAJAAAFAFQAGAFADAKQAKgNAIgDQAHgEAIAAQAHAAAHAEQAFADAEAKQACAFAAANIAAApQAAAIABAEQABACAEABQACACAHABIAAADg");
	this.shape_23.setTransform(9.55,6.3);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AAJBGIAAgDQAGgBADgBQACgCAAgDIgBgEIgGgIIgwgwIAAAuQAAAKABADQABADAEACQAEACAFABIAFAAIAAADIg8AAIAAgDIAFAAQAJAAADgGQADgDAAgMIAAhaQAAgLgBgEQgBgCgEgDQgEgCgFAAIgFAAIAAgDIA8AAIAAADIgFAAQgFAAgEACQgEACgBADQgBAEAAALIAAAqIAOgMQAegdAHgJQACgEAAgEQAAgBAAAAQAAgBAAAAQgBgBAAAAQAAAAgBgBQgCgCgFAAIgDAAIAAgDIA0AAIAAADQgFAAgEABQgEABgFAEQgFADgIAHIgVAVIgVAWIAzAzQANANAJAEQAJAFAJABIAAADg");
	this.shape_24.setTransform(-15.675,4.15);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#9E392B").s().p("AgPDZQg3AAgngnIgGgFQgfgjgDgwIAAgBIAAgCIAAgCIAAinQAAg3AogoQAngnA3AAIClAAIAAGxg");
	this.shape_25.setTransform(-44.4,1.625);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#535353").s().p("AAAgBIAAACIAAABIAAgDg");
	this.shape_26.setTransform(58.6875,10.475);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#E74C3C").s().p("Am4DZIAAmxILqAAQA3AAAoAnQAWAWAKAcQAHAVAAAYIAACpIAAADQgBAUgGASQgJAYgSAVIgFAFQgoAng3AAg");
	this.shape_27.setTransform(14.65,1.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10,p:{y:-3.875}},{t:this.shape_9,p:{y:-3.875}},{t:this.shape_8},{t:this.shape_7,p:{y:0.925}},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{scaleX:0.7124,scaleY:0.7882,x:-45.2259,y:-3.0233}},{t:this.shape,p:{scaleX:0.7124,scaleY:0.7882,x:-38.9392,y:-3.0036}}]}).to({state:[{t:this.shape_10,p:{y:-1.875}},{t:this.shape_18},{t:this.shape_9,p:{y:-1.875}},{t:this.shape_17},{t:this.shape_7,p:{y:2.925}},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_1,p:{scaleX:0.7118,scaleY:0.7877,x:-45.2186,y:-2.5126}},{t:this.shape,p:{scaleX:0.7118,scaleY:0.7877,x:-38.937,y:-2.4929}}]},1).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_7,p:{y:6.425}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_1,p:{scaleX:0.7118,scaleY:0.7877,x:-45.2186,y:-0.6126}},{t:this.shape,p:{scaleX:0.7118,scaleY:0.7877,x:-38.937,y:-0.5929}}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.4,-25.6,118.1,49);


(lib.btnInfo = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#735D07").s().p("AgwA4QgSgVAAgjIAAAAQAAgWAIgRQAJgSAPgJQAPgKATABQAegBATAWQASAUAAAiIAAABQAAAWgIASQgIAQgQAKQgPAKgUAAQgdgBgTgUgAgdgoQgMAPAAAaQAAAaAMAOQALAPASAAQATAAAMgPQALgPAAgaQAAgYgLgPQgMgQgTAAQgSAAgLAPg");
	this.shape.setTransform(16.325,-2.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#735D07").s().p("AgUBrIAAiAIgYAAIAAgUIAYAAIAAgOQAAgYANgNQALgNAXgBQAJABAJACIgCAVQgGgCgHAAQgMAAgHAHQgHAIAAANIAAAPIAgAAIAAAUIggAAIAACAg");
	this.shape_1.setTransform(3.925,-5.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#735D07").s().p("AAhBLIAAhhQAAgQgHgHQgIgIgPAAQgLAAgJAHQgKAGgFALIAABoIgZAAIAAiTIAYAAIABATQARgVAaAAQAvAAAAA1IAABgg");
	this.shape_2.setTransform(-9.075,-2.325);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#735D07").s().p("AgMBkIAAjGIAZAAIAADGg");
	this.shape_3.setTransform(-20.575,-4.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F2C50F").s().p("AnHDZQg4AAgngnIgFgFQghglgCgxIAAipQAAg3AogoQAngnA4AAIOPAAQA3AAAoAnQAWAWAKAcQAHAVAAAYIAACpQAAAVgHAUQgJAYgSAVIgFAFQgoAng3AAg");
	this.shape_4.setTransform(-0.35,-3.875);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#535353").s().p("AnHBcQg4AAgngnIgFgGQgagdgHglQgCgJAAgKIAAg1QACAxAhAlIAFAFQAnAmA4AAIOPAAQA3AAAogmIAFgFQASgVAJgYQAHgTAAgWIAAA1IAAAEIAAAFQgBAPgEAOIgCACQgJAZgSAUIgFAGQgoAng3AAg");
	this.shape_5.setTransform(-0.35,14);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#735D07").s().p("AgwA4QgSgVAAgiIAAgBQAAgWAIgSQAJgRAPgJQAPgKATAAQAeAAATAWQASAUAAAiIAAACQAAAWgIAQQgIARgQAKQgPAJgUAAQgdABgTgVgAgdgoQgMAPAAAbQAAAZAMAOQALAPASAAQATAAAMgPQALgPAAgaQAAgZgLgPQgMgPgTAAQgSAAgLAPg");
	this.shape_6.setTransform(16.325,0.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#735D07").s().p("AgUBqIAAh/IgYAAIAAgUIAYAAIAAgPQAAgXANgOQALgNAXABQAJgBAJADIgCAUQgGgBgHAAQgMAAgHAHQgHAIAAANIAAAPIAgAAIAAAUIggAAIAAB/g");
	this.shape_7.setTransform(3.925,-3.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#735D07").s().p("AgMBjIAAjGIAZAAIAADGg");
	this.shape_8.setTransform(-20.575,-2.35);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#535353").s().p("AnHBQQg4AAgngnIgFgGQgagdgHglQgCgJAAgKIAAgdQACAyAhAjIAFAFQAnAoA4AAIOPAAQA3AAAogoIAFgFQASgUAJgYQAHgTAAgWIAAAdIAAAEIAAAFQgBAPgEAOIgCADQgJAYgSAUIgFAGQgoAng3AAg");
	this.shape_9.setTransform(-0.35,15.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#735D07").s().p("AgwA4QgSgVAAgjIAAgBQAAgVAIgRQAJgSAPgJQAPgJATAAQAeAAATAUQASAVAAAiIAAABQAAAXgIARQgIARgQAJQgPAKgUAAQgdAAgTgVgAgdgoQgMAPAAAaQAAAZAMAPQALAPASAAQATAAAMgPQALgPAAgbQAAgYgLgOQgMgQgTAAQgSAAgLAPg");
	this.shape_10.setTransform(16.325,3.4);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#735D07").s().p("AgUBrIAAiAIgYAAIAAgTIAYAAIAAgPQAAgYANgNQALgOAXAAQAJAAAJADIgCAVQgGgCgHAAQgMAAgHAIQgHAGAAAOIAAAQIAgAAIAAATIggAAIAACAg");
	this.shape_11.setTransform(3.925,0.15);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#F2C50F").s().p("AnHDZQg4AAgngnIgFgFQgggjgCgvIgBgEIAAgDIAAimQAAg3AogoQAngnA4AAIOPAAQA3AAAoAnQAWAWAKAcQAHAVAAAYIAACpIAAABQAAAVgHATQgJAYgSAVIgFAFQgoAng3AAg");
	this.shape_12.setTransform(-0.35,1.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4,p:{y:-3.875}},{t:this.shape_3,p:{y:-4.75}},{t:this.shape_2,p:{y:-2.325}},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_4,p:{y:-1.475}},{t:this.shape_9},{t:this.shape_8},{t:this.shape_2,p:{y:0.075}},{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_12},{t:this.shape_3,p:{y:0.85}},{t:this.shape_2,p:{y:3.275}},{t:this.shape_11},{t:this.shape_10}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.4,-25.6,118.1,49.1);


(lib.bg2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Eg9vAdGMAAAg6LMB7fAAAMAAAA6Lg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg2, new cjs.Rectangle(-395.1,-186.2,790.3,372.4), null);


(lib.bg1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0097E6").s().p("A82E7Qg1AAAAgYIAApFQAAgXA1AAMA5tAAAQA1AAABAXIAAJFQgBAYg1AAg");
	this.shape.setTransform(-20.05,1.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg1, new cjs.Rectangle(-210.1,-30,380.1,62.9), null);


(lib.text2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween4("synched",0);

	this.instance_1 = new lib.Tween5("synched",0);
	this.instance_1.setTransform(-12.45,0);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween6("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},31).to({state:[{t:this.instance_2}]},31).wait(3));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,x:-12.45},31).wait(34));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},31).to({_off:true,x:0},31).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-73.3,-9.2,134.2,18.4);


(lib.teksPenunjuk = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween1("synched",0);

	this.instance_1 = new lib.Tween2("synched",0);
	this.instance_1.setTransform(-38.95,0);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween3("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},43).to({state:[{t:this.instance_2}]},48).wait(5));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,x:-38.95},43).wait(53));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},43).to({_off:true,x:0},48).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-139.8,-9.2,240.70000000000002,18.4);


(lib.teksinfo = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween9("synched",0);

	this.instance_1 = new lib.Tween11("synched",0);
	this.instance_1.setTransform(0,-19);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween12("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},29).to({state:[{t:this.instance_2}]},30).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,y:-19},29).wait(31));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},29).to({_off:true,y:0},30).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-130.2,-31.2,260.5,43.4);


(lib.Restart = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// icon
	this.instance = new lib.RestoreIcon("single",0);
	this.instance.alpha = 0.75;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({rotation:-14.9983,alpha:1},0).wait(1).to({rotation:-45},0).to({_off:true},1).wait(1));

	// hit
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00FF00").s().p("AjkDlIAAnJIHJAAIAAHJg");
	this.shape.setTransform(-0.025,0.025);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-23.3,-22.9,46.2,45.9);


(lib.Pieces9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// pieces
	this.lima = new lib.drop7G5();
	this.lima.name = "lima";
	this.lima.setTransform(813.05,290.3,0.6164,0.906,0,0,0,128.8,54.1);
	new cjs.ButtonHelper(this.lima, 0, 1, 1);

	this.empat = new lib.drop7G4();
	this.empat.name = "empat";
	this.empat.setTransform(435.15,290.3,0.4758,0.4758,0,0,0,133.4,58.1);
	new cjs.ButtonHelper(this.empat, 0, 1, 1);

	this.tiga = new lib.drop7G3();
	this.tiga.name = "tiga";
	this.tiga.setTransform(623.7,418.45,0.6164,1.4436,0,0,0,133.9,48.9);
	new cjs.ButtonHelper(this.tiga, 0, 1, 1);

	this.dua = new lib.drop7G2();
	this.dua.name = "dua";
	this.dua.setTransform(812.95,418.5,0.6164,0.6388,0,0,0,126.9,52.1);
	new cjs.ButtonHelper(this.dua, 0, 1, 1);

	this.satu = new lib.drop7G1();
	this.satu.name = "satu";
	this.satu.setTransform(622.65,291.75,0.6166,1.5353,0,0,0,125,48.4);
	new cjs.ButtonHelper(this.satu, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.satu},{t:this.dua},{t:this.tiga},{t:this.empat},{t:this.lima}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces9, new cjs.Rectangle(335.8,210.3,576.5999999999999,288.3), null);


(lib.Slots1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// slots
	this.target = new lib.targetcopy2();
	this.target.name = "target";
	this.target.setTransform(517.2,176.7,0.6294,2.0456);

	this.kotakKartu2 = new lib.targetcopy();
	this.kotakKartu2.name = "kotakKartu2";
	this.kotakKartu2.setTransform(517.2,74.05,0.6294,2.0456);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.kotakKartu2},{t:this.target}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Slots1, new cjs.Rectangle(473.4,22.5,86.60000000000002,200.5), null);


(lib.Pieces1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// pieces
	this.drag2G1 = new lib.drag8G12();
	this.drag2G1.name = "drag2G1";
	this.drag2G1.setTransform(227.15,163.35,0.9278,0.9277,0,0,0,45,47);
	new cjs.ButtonHelper(this.drag2G1, 0, 1, 1);

	this.drag2G1_1 = new lib.drag8G11();
	this.drag2G1_1.name = "drag2G1_1";
	this.drag2G1_1.setTransform(336.55,163.3,0.9285,0.9277,0,0,0,45.1,47);
	new cjs.ButtonHelper(this.drag2G1_1, 0, 1, 1);

	this.target = new lib.drag7G12copy();
	this.target.name = "target";
	this.target.setTransform(120.8,163.3,0.9279,0.9279,0,0,0,45.1,47);
	new cjs.ButtonHelper(this.target, 0, 1, 1);

	this.target_1 = new lib.drag7G11copy();
	this.target_1.name = "target_1";
	this.target_1.setTransform(15.65,163.3,0.9279,0.9279,0,0,0,45.3,47);
	new cjs.ButtonHelper(this.target_1, 0, 1, 1);

	this.target_2 = new lib.drag7G10copy();
	this.target_2.name = "target_2";
	this.target_2.setTransform(-89.5,163.3,0.9279,0.9279,0,0,0,45,47);
	new cjs.ButtonHelper(this.target_2, 0, 1, 1);

	this.target_3 = new lib.drag7G9copy();
	this.target_3.name = "target_3";
	this.target_3.setTransform(-189.55,163.3,0.9279,0.9279,0,0,0,45,47);
	new cjs.ButtonHelper(this.target_3, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.target_3},{t:this.target_2},{t:this.target_1},{t:this.target},{t:this.drag2G1_1},{t:this.drag2G1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces1, new cjs.Rectangle(-231.3,116.5,609.5,93.6), null);


(lib.btnEit = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Path_1();
	this.instance.setTransform(191.55,128,1,1,0,0,0,64,128);
	this.instance.alpha = 0.1602;
	this.instance.compositeOperation = "multiply";

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EE3338").s().p("Ap7lMIEvkvIPIPIIkwEvg");
	this.shape.setTransform(127.95,127.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EE3338").s().p("Ap7FNIPHvIIEwEvIvIPIg");
	this.shape_1.setTransform(127.95,127.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AmcPQQi+hQiSiTQiSiThRi+QhTjFAAjXQAAjWBTjGQBRi+CSiSQCSiSC+hRQDGhTDWAAQDXAADFBTQC+BRCTCSQCTCSBQC+QBTDGAADWQAADXhTDFQhQC+iTCTQiTCTi+BQQjFBTjXAAQjWAAjGhTg");
	this.shape_2.setTransform(127.95,127.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EE3338").s().p("AnxSbQjmhhiwixQiyixhhjmQhljuAAkEQAAkDBljuQBhjmCyiwQCwiyDmhhQDuhlEDAAQEEAADuBlQDmBhCxCyQCxCwBhDmQBkDtAAEEQAAEEhkDuQhhDmixCxQixCxjmBhQjuBkkEAAQkEAAjthkg");
	this.shape_3.setTransform(127.95,127.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.btnEit, new cjs.Rectangle(0,0,255.9,255.9), null);


(lib.drag7G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape.setTransform(19.575,6.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgjBDQgOgMgBgUIAZAAQACALAGAHQAHAGAKAAQAMAAAGgJQAHgJAAgOQAAgPgIgIQgGgHgNAAQgHAAgEACQgGABgGAFIgVgFIAJhOIBTAAIAAAWIg9AAIgEAmQALgGAMAAQAXAAAMAOQAMANAAAYQAAAYgOAOQgNAOgYAAQgVAAgOgMg");
	this.shape_1.setTransform(10.6,0.125);

	this.instance = new lib.Tween8("synched",0);
	this.instance.setTransform(13.45,0.15,0.0361,0.0648);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgaBNQgMgGgGgIIAMgQQAMAOASAAQAMAAAHgHQAIgHAAgNIAAgIQgLAMgSAAQgVAAgMgQQgNgQAAgcQAAgbAMgQQANgQAVAAQATAAALAOIACgMIAXAAIAABwQAAAXgOANQgOANgYAAQgMAAgNgFgAgRgyQgHALAAAUQAAARAHAJQAHAKAMAAQAPAAAIgNIAAgzQgHgNgQAAQgMAAgHAKg");
	this.shape_2.setTransform(168.825,101.625);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAWA7IAAhKQAAgLgFgFQgEgGgMAAQgOAAgIAPIAABRIgaAAIAAhzIAYAAIACANQAMgPAUAAQAkAAABApIAABMg");
	this.shape_3.setTransform(156.65,99.325);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgMBQIAAhzIAZAAIAABzgAgKg3QgEgEAAgGQAAgGAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_4.setTransform(147.775,97.225);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgeA7IAAhzIAZAAIABANQAIgPARAAQAFAAAEABIAAAZIgKgBQgSAAgGAOIAABOg");
	this.shape_5.setTransform(141.6,99.325);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgmAsQgPgQAAgcIAAAAQAAgRAHgOQAHgNAMgIQAMgHAPAAQAYAAAOAPQAPAPABAZIAAAFQAAASgHANQgGAOgNAHQgMAHgQAAQgXAAgPgQgAgTgcQgIAKAAATQAAASAIAKQAHALAMAAQANAAAIgLQAHgKAAgTQAAgSgIgKQgHgKgNAAQgMAAgHAKg");
	this.shape_6.setTransform(130.9,99.425);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgNAoIAAhBIgTAAIAAgTIATAAIAAgcIAZAAIAAAcIAVAAIAAATIgVAAIAABAQAAAHADADQADADAGAAIAJgBIAAAUQgIACgJAAQgdAAAAghg");
	this.shape_7.setTransform(120.75,98.125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgMBQIAAhzIAZAAIAABzgAgKg3QgEgEAAgGQAAgGAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_8.setTransform(114.575,97.225);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAWA7IAAhKQAAgLgEgFQgGgGgKAAQgPAAgIAPIAABRIgaAAIAAhzIAYAAIABANQANgPAUAAQAkAAABApIAABMg");
	this.shape_9.setTransform(105.6,99.325);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgmAsQgPgQAAgcIAAAAQAAgRAHgOQAHgNAMgIQAMgHAPAAQAXAAAPAPQAPAPABAZIAAAFQAAASgHANQgGAOgNAHQgMAHgQAAQgYAAgOgQgAgTgcQgIAKAAATQAAASAIAKQAHALAMAAQANAAAIgLQAHgKAAgTQAAgSgIgKQgHgKgNAAQgMAAgHAKg");
	this.shape_10.setTransform(93.2,99.425);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AA4A7IAAhKQAAgLgFgGQgFgFgLAAQgJAAgFAFQgGAFgCAIIAABOIgZAAIAAhLQgBgVgUAAQgQAAgGANIAABTIgaAAIAAhzIAYAAIABAMQAMgOAVAAQAXAAAIASQANgSAXAAQATAAAKALQAJAKAAAVIAABLg");
	this.shape_11.setTransform(77.375,99.325);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgmAsQgPgQAAgcIAAAAQAAgRAHgOQAHgNAMgIQAMgHAPAAQAXAAAPAPQAPAPABAZIAAAFQAAASgHANQgGAOgNAHQgMAHgQAAQgXAAgPgQgAgTgcQgIAKAAATQAAASAIAKQAHALAMAAQANAAAIgLQAHgKAAgTQAAgSgIgKQgHgKgNAAQgMAAgHAKg");
	this.shape_12.setTransform(61.5,99.425);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgMBQIAAhzIAZAAIAABzgAgKg3QgEgEAAgGQAAgGAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_13.setTransform(52.475,97.225);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgaBFIAAAMIgYAAIAAikIAaAAIAAA9QALgOATAAQAUAAAMAQQANAPAAAcIAAABQAAAcgMAQQgNAQgUAAQgUAAgMgPgAgYAAIAAAvQAHAPARAAQALAAAHgJQAGgJABgTIAAgCQAAgUgHgIQgHgJgLAAQgRAAgHAOg");
	this.shape_14.setTransform(43.7,97.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgMBQIAAhzIAZAAIAABzgAgKg3QgEgEAAgGQAAgGAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_15.setTransform(177.175,66.825);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgmAyQgLgKAAgOQAAgTAOgJQAOgKAYAAIARAAIAAgHQAAgJgGgGQgEgFgKAAQgJAAgFAEQgHAFAAAHIgaAAQAAgKAHgIQAGgJAMgEQAKgFANAAQAUAAAMAKQAMAKABATIAAAzQgBAQAFAJIAAACIgbAAQgCgDAAgIQgNANgRAAQgRAAgMgKgAgPAJQgIAFABAJQgBAIAGAEQAEAEAIAAQAIAAAHgDQAGgEAEgGIAAgWIgPAAQgNAAgHAFg");
	this.shape_16.setTransform(168.4,69.025);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgaBNQgMgGgGgIIAMgQQAMAOASAAQAMAAAHgHQAIgHAAgNIAAgIQgLAMgSAAQgVAAgMgQQgNgQAAgcQAAgbAMgQQANgQAVAAQATAAALAOIACgMIAXAAIAABwQAAAXgOANQgOANgYAAQgMAAgNgFgAgRgyQgHALAAAUQAAARAHAJQAHAKAMAAQAPAAAIgNIAAgzQgHgNgQAAQgMAAgHAKg");
	this.shape_17.setTransform(156.025,71.225);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgmAyQgLgKAAgOQAAgTAOgJQAOgKAYAAIAQAAIAAgHQAAgJgEgGQgGgFgJAAQgJAAgGAEQgFAFAAAHIgaAAQAAgKAGgIQAHgJAKgEQALgFAMAAQAVAAAMAKQAMAKAAATIAAAzQABAQAEAJIAAACIgaAAQgCgDgCgIQgMANgRAAQgSAAgLgKgAgQAJQgGAFgBAJQABAIAEAEQAFAEAIAAQAIAAAGgDQAHgEADgGIAAgWIgNAAQgOAAgIAFg");
	this.shape_18.setTransform(144.05,69.025);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgZBFIgBANIgYAAIAAilIAaAAIAAA8QALgNASAAQAVAAAMAQQANAQAAAbIAAABQAAAbgMAQQgMAQgWABQgTAAgLgPgAgYAAIAAAvQAHAPARABQALAAAHgKQAHgJAAgTIAAgDQAAgSgHgJQgGgJgMAAQgRgBgHAPg");
	this.shape_19.setTransform(132.15,66.7);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgiAtQgQgQAAgaIAAgDQAAgQAHgOQAGgOANgIQAMgHAOAAQAYAAAMAPQANAPAAAcIAAAJIhLAAQACAPAIAIQAIAJAMAAQASAAAMgPIANANQgGALgMAGQgMAFgPAAQgYAAgOgPgAgPgfQgGAIgDANIAyAAIAAgCQgCgNgFgGQgHgHgKAAQgKAAgHAHg");
	this.shape_20.setTransform(119.9,69.025);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgYA3QgKgFgGgJQgHgJAAgKIAaAAQAAAJAGAFQAHAFAJAAQALAAAFgEQAGgEAAgGQAAgHgGgEQgGgEgMgCQgNgDgKgFQgTgIAAgSQAAgPANgKQAMgKATAAQAUAAANAKQANAKAAARIgaAAQAAgIgFgFQgGgFgJAAQgIAAgFAEQgFAEgBAHQAAAGAGADQAEAEAPADQAPADAJAFQAIAEAFAGQAEAHAAAJQAAAQgNAKQgNAJgVAAQgNAAgMgFg");
	this.shape_21.setTransform(108.15,69.025);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAWA7IAAhKQAAgLgFgFQgFgGgKAAQgPAAgIAPIAABRIgaAAIAAhzIAZAAIABANQAMgPAUAAQAkAAABApIAABMg");
	this.shape_22.setTransform(90.9,68.925);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgmAyQgLgKAAgOQAAgTAOgJQAOgKAYAAIARAAIAAgHQAAgJgGgGQgEgFgKAAQgJAAgFAEQgHAFAAAHIgaAAQAAgKAHgIQAGgJAMgEQAKgFANAAQAUAAAMAKQAMAKABATIAAAzQgBAQAFAJIAAACIgbAAQgCgDAAgIQgNANgRAAQgRAAgMgKgAgPAJQgIAFABAJQgBAIAGAEQAEAEAIAAQAIAAAHgDQAGgEAEgGIAAgWIgPAAQgNAAgHAFg");
	this.shape_23.setTransform(78.85,69.025);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AAYA6IgYhPIgXBPIgWAAIgghzIAaAAIATBOIAXhOIATAAIAYBPIAShPIAaAAIggBzg");
	this.shape_24.setTransform(64.7,69.05);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgjAtQgPgQAAgaIAAgDQAAgQAGgOQAIgOAMgIQALgHAPAAQAXAAAOAPQAMAPAAAcIAAAJIhLAAQACAPAIAIQAJAJALAAQASAAALgPIAPANQgIALgLAGQgMAFgOAAQgYAAgQgPgAgPgfQgGAIgCANIAwAAIAAgCQAAgNgHgGQgGgHgKAAQgKAAgHAHg");
	this.shape_25.setTransform(50.75,69.025);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAWBTIAAhMQAAgLgFgFQgFgEgLAAQgOgBgIAOIAABTIgaAAIAAilIAaAAIAAA+QANgPASAAQAmAAAAApIAABNg");
	this.shape_26.setTransform(38.65,66.6);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgdA7IAAhzIAYAAIABANQAJgPAQAAQAFAAAEABIAAAZIgLgBQgRAAgGAOIAABOg");
	this.shape_27.setTransform(179.05,38.525);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgmAyQgLgKAAgOQAAgTAOgJQAOgKAYAAIAQAAIAAgHQAAgJgEgGQgGgFgJAAQgJAAgGAEQgFAFAAAHIgaAAQgBgKAHgIQAHgJAKgEQALgFANAAQAUAAAMAKQAMAKABATIAAAzQAAAQAEAJIAAACIgaAAQgDgDgBgIQgMANgRAAQgRAAgMgKgAgQAJQgGAFgBAJQABAIAFAEQAFAEAHAAQAHAAAHgDQAHgEADgGIAAgWIgNAAQgOAAgIAFg");
	this.shape_28.setTransform(168.7,38.625);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgYA3QgKgFgHgJQgGgJAAgKIAZAAQABAJAGAFQAHAFAJAAQALAAAFgEQAGgEgBgGQABgHgGgEQgGgEgMgCQgNgDgKgFQgTgIAAgSQAAgPAMgKQANgKATAAQAUAAAOAKQANAKgBARIgaAAQAAgIgFgFQgGgFgJAAQgIAAgFAEQgFAEAAAHQAAAGAEADQAGAEAOADQAPADAJAFQAJAEAEAGQAEAHAAAJQAAAQgNAKQgNAJgVAAQgNAAgMgFg");
	this.shape_29.setTransform(157,38.625);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgjAtQgPgQAAgaIAAgDQAAgQAGgOQAIgOALgIQAMgHAOAAQAZAAANAPQAMAPAAAcIAAAJIhLAAQABAPAJAIQAJAJALAAQASAAALgPIAPANQgIALgLAGQgMAFgOAAQgZAAgPgPgAgPgfQgGAIgCANIAwAAIAAgCQAAgNgHgGQgFgHgMAAQgJAAgHAHg");
	this.shape_30.setTransform(145.6,38.625);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgZBFIgCANIgXAAIAAikIAaAAIAAA7QALgNASAAQAWAAAMAQQAMAQAAAbIAAACQAAAbgMAPQgMARgWgBQgTAAgLgOgAgYAAIAAAvQAHAQARAAQALAAAHgKQAGgJABgSIAAgEQAAgTgHgIQgGgKgMAAQgRABgHAOg");
	this.shape_31.setTransform(133.65,36.3);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAWA7IAAhKQAAgLgFgFQgFgGgKAAQgPAAgIAPIAABRIgaAAIAAhzIAZAAIABANQAMgPAUAAQAlAAAAApIAABMg");
	this.shape_32.setTransform(115.55,38.525);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgmAyQgLgKAAgOQAAgTAOgJQAOgKAZAAIAQAAIAAgHQgBgJgFgGQgEgFgKAAQgJAAgFAEQgHAFAAAHIgaAAQABgKAGgIQAHgJALgEQAKgFANAAQAUAAAMAKQAMAKABATIAAAzQgBAQAFAJIAAACIgbAAQgBgDgBgIQgNANgRAAQgRAAgMgKgAgPAJQgIAFABAJQAAAIAEAEQAFAEAJAAQAGAAAIgDQAGgEAEgGIAAgWIgPAAQgNAAgHAFg");
	this.shape_33.setTransform(103.5,38.625);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgMBQIAAhzIAZAAIAABzgAgKg3QgEgEAAgGQAAgGAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_34.setTransform(94.775,36.425);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgaBNQgMgGgGgIIAMgQQAMAOASAAQAMAAAHgHQAIgHAAgNIAAgIQgLAMgSAAQgVAAgMgQQgNgQAAgcQAAgbAMgQQANgQAVAAQATAAALAOIACgMIAXAAIAABwQAAAXgOANQgOANgYAAQgMAAgNgFgAgRgyQgHALAAAUQAAARAHAJQAHAKAMAAQAPAAAIgNIAAgzQgHgNgQAAQgMAAgHAKg");
	this.shape_35.setTransform(85.525,40.825);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgmAyQgLgKAAgOQAAgTAOgJQAOgKAYAAIARAAIAAgHQAAgJgGgGQgEgFgKAAQgJAAgFAEQgGAFgBAHIgaAAQAAgKAHgIQAGgJALgEQALgFANAAQAUAAAMAKQAMAKABATIAAAzQgBAQAFAJIAAACIgbAAQgCgDgBgIQgMANgRAAQgRAAgMgKgAgPAJQgIAFAAAJQAAAIAGAEQAFAEAHAAQAHAAAIgDQAGgEAEgGIAAgWIgPAAQgNAAgHAFg");
	this.shape_36.setTransform(73.55,38.625);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgZBFIgCANIgXAAIAAikIAaAAIAAA7QALgNASAAQAWAAAMAQQAMAQAAAbIAAACQAAAbgMAPQgMARgWgBQgTAAgLgOgAgYAAIAAAvQAHAQARAAQALAAAHgKQAGgJABgSIAAgEQAAgTgHgIQgGgKgMAAQgRABgHAOg");
	this.shape_37.setTransform(61.65,36.3);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgjAtQgPgQAAgaIAAgDQAAgQAGgOQAIgOAMgIQALgHAPAAQAXAAAOAPQAMAPAAAcIAAAJIhLAAQACAPAIAIQAJAJALAAQASAAALgPIAPANQgIALgLAGQgMAFgOAAQgYAAgQgPgAgPgfQgGAIgCANIAwAAIAAgCQAAgNgHgGQgGgHgKAAQgKAAgHAHg");
	this.shape_38.setTransform(49.4,38.625);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgbBKQgPgGgIgLQgHgLgBgPIAbAAQABANAIAIQAJAHAPAAQAPAAAHgGQAHgGAAgJQAAgKgHgGQgIgGgRgFQgTgGgMgGQgUgNAAgWQAAgTAPgMQAPgMAXAAQARAAANAGQAMAGAIALQAHALAAANIgbAAQAAgMgIgHQgHgHgPAAQgMAAgHAGQgHAGAAAKQgBAJAJAFQAHAGASAGQASAFALAGQALAHAFAJQAGAJgBAMQAAATgOAMQgPALgbAAQgPAAgOgGg");
	this.shape_39.setTransform(36.75,36.625);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FF8C2D").s().p("Aw3p3MAhvgAjIAAUSMghvAAjg");
	this.shape_40.setTransform(106.25,63.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.instance},{t:this.shape_1},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.7,-15,216,145.3);


(lib.drag7G4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape.setTransform(18.575,6.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAMBOIAAgjIhDAAIgBgPIBDhpIAbAAIAABjIATAAIAAAVIgTAAIAAAjgAAJgmIgmA8IApAAIAAhAg");
	this.shape_1.setTransform(9.35,0.025);

	this.instance = new lib.Tween8("synched",0);
	this.instance.setTransform(12.45,0.15,0.0361,0.0648);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgmAyQgLgKAAgOQAAgTAOgJQAOgKAYAAIAQAAIAAgHQABgJgGgGQgEgFgKAAQgJAAgGAEQgFAFgBAHIgZAAQgBgKAHgIQAGgJALgEQALgFANAAQAUAAAMAKQAMAKABATIAAAzQAAAQAEAJIAAACIgbAAQgCgDgBgIQgMANgRAAQgRAAgMgKgAgQAJQgHAFAAAJQAAAIAGAEQAFAEAHAAQAHAAAIgDQAGgEADgGIAAgWIgOAAQgNAAgIAFg");
	this.shape_2.setTransform(183,80.675);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgyBSIAAigIAYAAIABALQAMgOASAAQAWAAAMAQQAMAQAAAcIAAACQAAAagMAQQgNAQgUAAQgSAAgMgNIAAA4gAgYguIAAAzQAHAOAQAAQAMAAAHgLQAHgJAAgUQAAgSgHgKQgHgKgMAAQgQAAgHANg");
	this.shape_3.setTransform(171.075,82.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgmAwQgJgLAAgVIAAhKIAaAAIAABKQAAAWASAAQATAAAGgOIAAhSIAaAAIAABzIgZAAIAAgMQgLAOgVAAQgTAAgKgLg");
	this.shape_4.setTransform(158.5,80.8);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgeA7IAAhzIAZAAIABANQAIgPARAAQAGAAADABIAAAZIgKgBQgTAAgFAOIAABOg");
	this.shape_5.setTransform(149.05,80.575);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgjAtQgPgQAAgaIAAgDQAAgQAGgOQAIgOALgIQAMgHAOAAQAZAAANAPQAMAPAAAcIAAAJIhLAAQABAPAJAIQAJAJALAAQASAAALgPIAPANQgIALgLAGQgMAFgOAAQgZAAgPgPgAgPgfQgGAIgCANIAwAAIAAgCQAAgNgHgGQgFgHgMAAQgJAAgHAHg");
	this.shape_6.setTransform(138.85,80.675);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgZBFIgCAMIgXAAIAAijIAaAAIAAA7QALgNASAAQAWAAAMAQQAMAPAAAcIAAACQAAAagMARQgMAPgWAAQgTAAgLgOgAgYAAIAAAvQAHAPARAAQALAAAHgJQAGgJABgSIAAgDQAAgTgHgJQgGgKgMAAQgRAAgHAPg");
	this.shape_7.setTransform(126.9,78.35);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgMBQIAAhzIAZAAIAABzgAgKg3QgEgEAAgGQAAgGAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_8.setTransform(112.175,78.475);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAWA7IAAhKQAAgLgFgFQgEgGgMAAQgOAAgIAPIAABRIgaAAIAAhzIAZAAIABANQAMgPAUAAQAlAAAAApIAABMg");
	this.shape_9.setTransform(103.2,80.575);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgMBQIAAhzIAZAAIAABzgAgKg3QgEgEAAgGQAAgGAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_10.setTransform(94.325,78.475);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAWA7IAAhKQAAgLgEgFQgGgGgKAAQgPAAgIAPIAABRIgaAAIAAhzIAYAAIABANQANgPAUAAQAlAAAAApIAABMg");
	this.shape_11.setTransform(79.85,80.575);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgmAyQgLgKAAgOQAAgTAOgJQAOgKAYAAIARAAIAAgHQAAgJgGgGQgEgFgKAAQgJAAgGAEQgFAFgBAHIgZAAQgBgKAHgIQAGgJALgEQALgFANAAQAUAAAMAKQAMAKABATIAAAzQAAAQAEAJIAAACIgbAAQgCgDgBgIQgMANgRAAQgRAAgMgKgAgPAJQgIAFAAAJQAAAIAGAEQAFAEAHAAQAHAAAIgDQAGgEAEgGIAAgWIgPAAQgNAAgHAFg");
	this.shape_12.setTransform(67.8,80.675);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAYA6IgYhPIgXBPIgWAAIgghzIAaAAIATBOIAXhOIATAAIAYBPIAShPIAaAAIggBzg");
	this.shape_13.setTransform(53.65,80.7);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgiAtQgQgQAAgaIAAgDQAAgQAHgOQAGgOANgIQAMgHAOAAQAYAAANAPQAMAPAAAcIAAAJIhLAAQABAPAJAIQAJAJALAAQASAAAMgPIANANQgHALgLAGQgMAFgPAAQgYAAgOgPgAgPgfQgGAIgCANIAwAAIAAgCQgBgNgFgGQgHgHgKAAQgKAAgHAHg");
	this.shape_14.setTransform(39.7,80.675);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AAWBSIAAhKQAAgMgFgEQgGgFgKgBQgOAAgIAOIAABSIgaAAIAAijIAaAAIAAA9QANgPASAAQAmAAAAAqIAABLg");
	this.shape_15.setTransform(27.6,78.25);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgyBSIAAigIAYAAIABALQAMgNASAAQAWAAAMAPQAMARAAAbIAAACQAAAagMAQQgNAQgUAAQgSAAgMgMIAAA3gAgYguIAAAzQAHAOAQAAQAMgBAHgJQAHgKAAgUQAAgSgHgKQgHgKgMAAQgQAAgHANg");
	this.shape_16.setTransform(152.575,52.4);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AglAwQgKgLAAgVIAAhKIAaAAIAABKQAAAWATAAQASAAAGgOIAAhSIAaAAIAABzIgYAAIgBgLQgMANgUAAQgTAAgJgLg");
	this.shape_17.setTransform(140,50.4);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgmBDQgMgQAAgcQAAgbAMgQQANgQAVAAQASAAAKANIAAg8IAbAAIAACkIgYAAIgBgMQgMAPgSAAQgVgBgNgQgAgRgEQgHAIAAAVQAAARAHAKQAHALAMgBQAQAAAGgOIAAgxQgGgNgQAAQgMAAgHAKg");
	this.shape_18.setTransform(127.45,47.95);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgMBQIAAhzIAZAAIAABzgAgKg3QgEgEAAgGQAAgGAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_19.setTransform(118.725,48.075);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAWBSIAAhLQAAgLgFgFQgGgEgJAAQgPAAgIANIAABSIgaAAIAAikIAaAAIAAA+QANgPATAAQAkAAABAqIAABLg");
	this.shape_20.setTransform(109.8,47.85);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgeA7IAAhzIAZAAIABANQAJgPAQAAQAFAAAFABIgBAZIgKgBQgTAAgEAOIAABOg");
	this.shape_21.setTransform(94.85,50.175);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AglAwQgKgLAAgVIAAhKIAaAAIAABKQAAAWATAAQASAAAGgOIAAhSIAaAAIAABzIgYAAIgBgLQgMANgUAAQgTAAgJgLg");
	this.shape_22.setTransform(84.3,50.4);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgmAyQgLgKAAgOQAAgTAOgJQAOgKAZAAIAPAAIAAgHQAAgJgEgGQgGgFgJAAQgJAAgFAEQgHAFABAHIgbAAQABgKAGgIQAHgJALgEQAKgFAMAAQAVAAAMAKQAMAKAAATIAAAzQAAAQAFAJIAAACIgaAAQgCgDgBgIQgNANgRAAQgSAAgLgKgAgQAJQgGAFAAAJQAAAIAEAEQAGAEAIAAQAGAAAHgDQAHgEADgGIAAgWIgNAAQgOAAgIAFg");
	this.shape_23.setTransform(72.25,50.275);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("Ag5BOIAAibIAuAAQAUAAAQAJQAQAJAJARQAIARAAAWIAAAHQAAAWgIARQgJARgRAJQgQAJgUAAgAgeA5IASAAQAUAAALgOQAMgNAAgZIAAgIQAAgZgLgOQgLgNgUAAIgTAAg");
	this.shape_24.setTransform(59.375,48.275);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FF8C2D").s().p("Aw3p3MAhvgAjIAAUSMghvAAjg");
	this.shape_25.setTransform(105.25,63.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.instance},{t:this.shape_1},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.7,-15,216,145.3);


(lib.drag7G3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape.setTransform(21.325,12.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgkBEQgPgMAAgUIAaAAQAAALAHAGQAHAHALAAQAMAAAHgHQAHgGAAgNQAAgMgHgHQgIgGgNAAIgPAAIAAgUIAPAAQALAAAIgGQAGgGAAgMQAAgLgFgGQgHgGgLAAQgKAAgGAGQgIAGAAAKIgaAAQABgMAGgKQAGgKAMgGQALgFAOAAQAXAAANAMQANALAAAVQAAALgGAJQgHAJgKAFQANADAGAKQAHAJAAANQAAAVgOANQgPAMgXAAQgWAAgOgMg");
	this.shape_1.setTransform(11.9,5.775);

	this.instance = new lib.Tween8("synched",0);
	this.instance.setTransform(15.2,5.9,0.0361,0.0648);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgeA7IAAhzIAZAAIABANQAJgPAQAAQAFAAAFABIgBAZIgKgBQgTAAgEAOIAABOg");
	this.shape_2.setTransform(129.05,98.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgMBQIAAhzIAZAAIAABzgAgKg3QgEgEAAgGQAAgGAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_3.setTransform(121.875,96.775);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgmAyQgLgKAAgOQAAgTAOgJQAOgKAZAAIAPAAIAAgHQAAgJgEgGQgGgFgJAAQgJAAgGAEQgFAFAAAHIgaAAQAAgKAGgIQAHgJALgEQAKgFAMAAQAVAAAMAKQAMAKAAATIAAAzQABAQAEAJIAAACIgaAAQgCgDgCgIQgMANgRAAQgSAAgLgKgAgQAJQgGAFAAAJQAAAIAEAEQAFAEAJAAQAHAAAGgDQAHgEADgGIAAgWIgNAAQgOAAgIAFg");
	this.shape_4.setTransform(113.1,98.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgMBQIAAhzIAZAAIAABzgAgKg3QgEgEAAgGQAAgGAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_5.setTransform(98.875,96.775);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AglBDQgNgQAAgcQAAgbANgQQAMgQAVAAQARAAAMANIAAg8IAaAAIAACkIgYAAIgBgMQgMAPgTAAQgUAAgMgRgAgRgEQgHAJAAAUQAAARAHAKQAGAKAMAAQAQAAAIgOIAAgxQgIgNgQAAQgLAAgHAKg");
	this.shape_6.setTransform(89.6,96.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgyBRIAAifIAYAAIABAMQAMgOASgBQAWABAMAQQAMAQAAAcIAAABQAAAagMAQQgNAQgUAAQgSAAgMgNIAAA3gAgYguIAAAzQAHANAQAAQAMABAHgLQAHgJAAgUQAAgRgHgLQgHgKgMAAQgQAAgHANg");
	this.shape_7.setTransform(197.625,70.7);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgmAwQgJgLAAgVIAAhKIAaAAIAABKQAAAWASAAQATAAAGgOIAAhSIAaAAIAABzIgZAAIAAgLQgLANgVAAQgTAAgKgLg");
	this.shape_8.setTransform(185.05,68.7);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AglBDQgNgQAAgdQAAgZANgRQAMgQAVAAQARAAAMANIAAg8IAaAAIAAClIgYAAIgBgNQgMAOgSABQgVAAgMgRgAgRgFQgHAJAAAVQAAASAHAJQAGALAMAAQARAAAHgPIAAgxQgHgOgRABQgLgBgHAKg");
	this.shape_9.setTransform(172.5,66.25);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgMBQIAAhzIAZAAIAABzgAgKg3QgEgEAAgGQAAgGAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_10.setTransform(163.775,66.375);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAWBTIAAhMQAAgLgFgFQgFgEgLAAQgOgBgIAOIAABTIgaAAIAAilIAaAAIAAA+QANgPASAAQAmAAAAApIAABNg");
	this.shape_11.setTransform(154.85,66.15);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgmAyQgLgKAAgOQAAgTAOgJQAOgKAYAAIAQAAIAAgHQAAgJgEgGQgGgFgJAAQgJAAgGAEQgFAFAAAHIgaAAQAAgKAGgIQAHgJAKgEQALgFAMAAQAVAAAMAKQAMAKAAATIAAAzQABAQAEAJIAAACIgaAAQgCgDgCgIQgMANgRAAQgSAAgLgKgAgQAJQgGAFgBAJQABAIAEAEQAFAEAIAAQAIAAAGgDQAHgEADgGIAAgWIgNAAQgOAAgIAFg");
	this.shape_12.setTransform(137.3,68.575);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAVBTIgigzIgLAMIAAAnIgaAAIAAilIAaAAIAABfIAIgKIAfgjIAfAAIgrAuIAwBFg");
	this.shape_13.setTransform(126.375,66.15);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgMBQIAAhzIAZAAIAABzgAgKg3QgEgEAAgGQAAgGAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_14.setTransform(117.125,66.375);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgNAoIAAhBIgTAAIAAgTIATAAIAAgcIAZAAIAAAcIAVAAIAAATIgVAAIAABAQAAAHADADQADADAGAAIAJgBIAAAUQgIACgJAAQgdAAAAghg");
	this.shape_15.setTransform(110.4,67.275);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgiAtQgQgQAAgaIAAgDQAAgQAHgOQAHgOALgIQANgHANAAQAYAAANAPQANAPAAAcIAAAJIhLAAQABAPAJAIQAIAJAMAAQASAAAMgPIANANQgGALgMAGQgMAFgPAAQgXAAgPgPgAgPgfQgHAIgCANIAyAAIAAgCQgCgNgGgGQgFgHgMAAQgKAAgGAHg");
	this.shape_16.setTransform(101.2,68.575);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AAVBTIgigzIgLAMIAAAnIgaAAIAAilIAaAAIAABfIAIgKIAfgjIAfAAIgrAuIAwBFg");
	this.shape_17.setTransform(90.225,66.15);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgaBNQgMgGgGgIIAMgQQAMAOASAAQAMAAAHgHQAIgHAAgNIAAgIQgLAMgSAAQgVAAgMgQQgNgQAAgcQAAgbAMgQQANgQAVAAQATAAALAOIACgMIAXAAIAABwQAAAXgOANQgOANgYAAQgMAAgNgFgAgRgyQgHALAAAUQAAARAHAJQAHAKAMAAQAPAAAIgNIAAgzQgHgNgQAAQgMAAgHAKg");
	this.shape_18.setTransform(71.825,70.775);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAWA7IAAhKQAAgLgFgFQgEgGgMAAQgOAAgIAPIAABRIgaAAIAAhzIAZAAIABANQAMgPAUAAQAlAAAAApIAABMg");
	this.shape_19.setTransform(59.65,68.475);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgmAyQgLgKAAgOQAAgTAOgJQAOgKAZAAIAQAAIAAgHQgBgJgFgGQgEgFgKAAQgJAAgFAEQgHAFABAHIgbAAQABgKAGgIQAHgJALgEQAKgFAMAAQAVAAAMAKQAMAKAAATIAAAzQAAAQAFAJIAAACIgaAAQgCgDgBgIQgNANgRAAQgSAAgLgKgAgPAJQgIAFABAJQAAAIAEAEQAGAEAIAAQAGAAAHgDQAHgEAEgGIAAgWIgPAAQgNAAgHAFg");
	this.shape_20.setTransform(47.6,68.575);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgXA3QgMgFgFgJQgHgJAAgKIAaAAQAAAJAHAFQAGAFAKAAQAKAAAFgEQAFgEABgGQgBgHgFgEQgGgEgNgCQgNgDgIgFQgUgIAAgSQAAgPANgKQANgKASAAQAVAAAMAKQAOAKAAARIgbAAQAAgIgGgFQgFgFgJAAQgIAAgFAEQgGAEAAAHQABAGAFADQAFAEAOADQAPADAJAFQAIAEAFAGQAEAHAAAJQAAAQgNAKQgNAJgVAAQgNAAgLgFg");
	this.shape_21.setTransform(35.9,68.575);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAWA7IAAhKQAAgLgEgFQgGgGgLAAQgOAAgIAPIAABRIgaAAIAAhzIAYAAIABANQANgPAUAAQAkAAABApIAABMg");
	this.shape_22.setTransform(24.15,68.475);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgMBQIAAhzIAZAAIAABzgAgKg3QgEgEAAgGQAAgGAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_23.setTransform(15.275,66.375);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgMBQIAAhzIAZAAIAABzgAgKg3QgEgEAAgGQAAgGAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_24.setTransform(192.525,35.975);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgNAoIAAhBIgTAAIAAgTIATAAIAAgcIAZAAIAAAcIAVAAIAAATIgVAAIAABAQAAAHADADQADADAGAAIAJgBIAAAUQgJACgIAAQgdAAAAghg");
	this.shape_25.setTransform(185.8,36.875);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgdA7IAAhzIAYAAIABANQAJgPAQAAQAFAAAEABIAAAZIgLgBQgRAAgGAOIAABOg");
	this.shape_26.setTransform(179.05,38.075);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgiAtQgQgQAAgaIAAgDQAAgQAHgOQAGgOANgIQAMgHAOAAQAYAAANAPQAMAPAAAcIAAAJIhLAAQABAPAJAIQAJAJALAAQASAAAMgPIANANQgHALgLAGQgMAFgPAAQgYAAgOgPgAgPgfQgGAIgCANIAwAAIAAgCQgBgNgFgGQgHgHgKAAQgKAAgHAHg");
	this.shape_27.setTransform(168.85,38.175);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgyBRIAAifIAYAAIABAMQAMgOASgBQAWABAMAQQAMAPAAAdIAAABQAAAagMAQQgNAQgUAAQgSAAgMgNIAAA3gAgYguIAAAzQAHANAQAAQAMAAAHgKQAHgJAAgUQAAgRgHgLQgHgKgMAAQgQAAgHANg");
	this.shape_28.setTransform(156.875,40.3);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgiAtQgQgQAAgaIAAgDQAAgQAHgOQAGgOANgIQAMgHAOAAQAYAAAMAPQANAPAAAcIAAAJIhLAAQACAPAIAIQAIAJAMAAQASAAAMgPIANANQgGALgMAGQgMAFgPAAQgYAAgOgPgAgPgfQgGAIgDANIAyAAIAAgCQgCgNgFgGQgHgHgKAAQgKAAgHAHg");
	this.shape_29.setTransform(144.65,38.175);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgYA3QgKgFgGgJQgHgJAAgKIAaAAQAAAJAGAFQAHAFAJAAQALAAAFgEQAGgEAAgGQAAgHgGgEQgGgEgMgCQgNgDgKgFQgTgIAAgSQAAgPANgKQAMgKATAAQAUAAANAKQANAKAAARIgaAAQAAgIgFgFQgGgFgJAAQgIAAgFAEQgFAEgBAHQAAAGAGADQAEAEAPADQAPADAJAFQAIAEAFAGQAEAHAAAJQAAAQgNAKQgNAJgVAAQgNAAgMgFg");
	this.shape_30.setTransform(132.9,38.175);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgmAwQgJgLAAgVIAAhKIAaAAIAABKQAAAWASAAQATAAAGgOIAAhSIAaAAIAABzIgZAAIAAgMQgMAOgUAAQgTAAgKgLg");
	this.shape_31.setTransform(115.65,38.3);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgNAoIAAhBIgTAAIAAgTIATAAIAAgcIAZAAIAAAcIAVAAIAAATIgVAAIAABAQAAAHADADQACADAHAAIAJgBIAAAUQgJACgIAAQgdAAAAghg");
	this.shape_32.setTransform(105.65,36.875);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AAWA7IAAhKQAAgLgFgFQgEgGgMAAQgOAAgIAPIAABRIgaAAIAAhzIAZAAIABANQAMgPAUAAQAlAAAAApIAABMg");
	this.shape_33.setTransform(96.1,38.075);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgmAyQgLgKAAgOQAAgTAOgJQAOgKAZAAIAQAAIAAgHQgBgJgEgGQgFgFgKAAQgJAAgFAEQgHAFABAHIgbAAQABgKAGgIQAHgJALgEQAKgFAMAAQAVAAAMAKQAMAKAAATIAAAzQAAAQAFAJIAAACIgaAAQgCgDgBgIQgNANgRAAQgSAAgLgKgAgPAJQgIAFABAJQAAAIAEAEQAGAEAIAAQAGAAAHgDQAHgEAEgGIAAgWIgPAAQgNAAgHAFg");
	this.shape_34.setTransform(84.05,38.175);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgaBFIgBANIgXAAIAAikIAaAAIAAA7QALgNATAAQAVAAALAQQANAQAAAbIAAACQAAAbgMAPQgNARgUgBQgUAAgMgOgAgYAAIAAAvQAHAQARAAQALAAAHgKQAGgJABgSIAAgEQAAgTgHgIQgHgKgLAAQgRABgHAOg");
	this.shape_35.setTransform(72.15,35.85);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgNAoIAAhBIgTAAIAAgTIATAAIAAgcIAZAAIAAAcIAVAAIAAATIgVAAIAABAQAAAHADADQADADAGAAIAJgBIAAAUQgIACgJAAQgdAAAAghg");
	this.shape_36.setTransform(56.3,36.875);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgmAyQgLgKAAgOQAAgTAOgJQAOgKAZAAIAPAAIAAgHQAAgJgEgGQgGgFgJAAQgJAAgGAEQgFAFAAAHIgaAAQAAgKAGgIQAHgJALgEQAKgFAMAAQAVAAAMAKQAMAKAAATIAAAzQABAQAEAJIAAACIgaAAQgCgDgCgIQgMANgRAAQgSAAgLgKgAgQAJQgGAFAAAJQAAAIAEAEQAFAEAJAAQAHAAAGgDQAHgEADgGIAAgWIgNAAQgOAAgIAFg");
	this.shape_37.setTransform(46.95,38.175);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgMBTIAAikIAZAAIAACkg");
	this.shape_38.setTransform(38.2,35.75);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AArBOIgNgkIg7AAIgNAkIgcAAIA7ibIAXAAIA7CbgAgWAUIAtAAIgXhAg");
	this.shape_39.setTransform(28.075,36.175);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FF8C2D").s().p("Aw3p3MAhvgAjIAAUSMghvAAjg");
	this.shape_40.setTransform(108,66.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.instance},{t:this.shape_1},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-9.3,216,142.70000000000002);


(lib.drag7G2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape.setTransform(381.925,-41.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgyBPIAAgSIAzg5QALgLAFgIQAFgJAAgIQAAgMgGgGQgHgHgJAAQgNAAgHAHQgHAIAAAOIgaAAQAAgPAHgLQAGgMAMgGQAMgGAQAAQAWAAANALQANAMAAAUQAAALgHANQgGAMgPAQIglApIBHAAIAAAVg");
	this.shape_1.setTransform(372.725,-47.875);

	this.instance = new lib.Tween8("synched",0);
	this.instance.setTransform(375.8,-47.65,0.0361,0.0648);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgmAyQgLgKAAgOQAAgTAOgJQAOgKAZAAIAQAAIAAgHQgBgJgFgGQgEgFgKAAQgJAAgFAEQgHAFAAAHIgaAAQABgKAGgIQAHgJALgEQAKgFANAAQAUAAAMAKQAMAKABATIAAAzQgBAQAFAJIAAACIgbAAQgBgDgBgIQgNANgRAAQgSAAgLgKgAgPAJQgIAFABAJQAAAIAEAEQAGAEAIAAQAGAAAIgDQAGgEAEgGIAAgWIgPAAQgNAAgHAFg");
	this.shape_2.setTransform(531.9,45.425);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgMBSIAAikIAZAAIAACkg");
	this.shape_3.setTransform(523.15,43);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgmAyQgLgKAAgOQAAgTAOgJQAOgKAYAAIAQAAIAAgHQAAgJgEgGQgGgFgJAAQgJAAgGAEQgFAFAAAHIgaAAQAAgKAGgIQAHgJAKgEQALgFAMAAQAVAAAMAKQAMAKAAATIAAAzQABAQAEAJIAAACIgaAAQgDgDgBgIQgMANgRAAQgSAAgLgKgAgQAJQgGAFgBAJQABAIAEAEQAFAEAIAAQAIAAAGgDQAHgEADgGIAAgWIgNAAQgOAAgIAFg");
	this.shape_4.setTransform(514.4,45.425);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgyBSIAAigIAYAAIABALQAMgOASABQAWgBAMARQAMAPAAAcIAAACQAAAagMAQQgNAQgUAAQgSAAgMgMIAAA3gAgYguIAAAzQAHAOAQAAQAMAAAHgKQAHgKAAgUQAAgRgHgLQgHgKgMAAQgQAAgHANg");
	this.shape_5.setTransform(502.475,47.55);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgiAtQgQgQAAgaIAAgDQAAgQAHgOQAGgOANgIQAMgHAOAAQAYAAANAPQAMAPAAAcIAAAJIhLAAQACAPAIAIQAIAJAMAAQASAAAMgPIANANQgGALgMAGQgMAFgPAAQgYAAgOgPgAgPgfQgGAIgDANIAyAAIAAgCQgCgNgFgGQgHgHgKAAQgKAAgHAHg");
	this.shape_6.setTransform(490.25,45.425);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAVBSIgigxIgLALIAAAmIgaAAIAAikIAaAAIAABfIAIgKIAfgjIAfAAIgrAvIAwBDg");
	this.shape_7.setTransform(479.275,43);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAWBSIAAhLQAAgKgFgGQgFgEgLAAQgOAAgIANIAABSIgaAAIAAikIAaAAIAAA+QANgPASAAQAmAAAAApIAABMg");
	this.shape_8.setTransform(461.2,43);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgmAyQgLgKAAgOQAAgTAOgJQAOgKAYAAIAQAAIAAgHQAAgJgEgGQgGgFgJAAQgJAAgGAEQgFAFAAAHIgaAAQAAgKAGgIQAHgJAKgEQALgFAMAAQAVAAAMAKQAMAKAAATIAAAzQABAQAEAJIAAACIgaAAQgCgDgCgIQgMANgRAAQgSAAgLgKgAgQAJQgGAFgBAJQABAIAEAEQAFAEAIAAQAIAAAGgDQAHgEADgGIAAgWIgNAAQgOAAgIAFg");
	this.shape_9.setTransform(449.15,45.425);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgeA7IAAhzIAZAAIABANQAIgPARAAQAGAAADABIAAAZIgKgBQgSAAgGAOIAABOg");
	this.shape_10.setTransform(439.85,45.325);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgjAtQgPgQAAgaIAAgDQAAgQAGgOQAIgOAMgIQALgHAPAAQAXAAAOAPQAMAPAAAcIAAAJIhLAAQACAPAIAIQAJAJALAAQASAAALgPIAPANQgIALgLAGQgMAFgOAAQgYAAgQgPgAgPgfQgGAIgCANIAwAAIAAgCQAAgNgHgGQgGgHgKAAQgKAAgHAHg");
	this.shape_11.setTransform(429.65,45.425);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgmAyQgLgKAAgOQAAgTAOgJQAOgKAYAAIARAAIAAgHQAAgJgGgGQgEgFgKAAQgJAAgFAEQgHAFAAAHIgaAAQAAgKAHgIQAGgJAMgEQAKgFANAAQAUAAAMAKQAMAKABATIAAAzQgBAQAFAJIAAACIgbAAQgCgDAAgIQgNANgRAAQgRAAgMgKgAgPAJQgIAFABAJQgBAIAGAEQAEAEAIAAQAIAAAHgDQAGgEAEgGIAAgWIgPAAQgNAAgHAFg");
	this.shape_12.setTransform(417.7,45.425);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AglBDQgNgQAAgcQAAgbANgQQAMgQAVAAQARAAAMANIAAg8IAaAAIAACkIgYAAIgBgMQgMAPgTAAQgUAAgMgRgAgRgEQgHAJAAAUQAAARAHAKQAHAKALAAQAQAAAIgOIAAgxQgIgNgQAAQgLAAgHAKg");
	this.shape_13.setTransform(405.3,43.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgMBQIAAhzIAZAAIAABzgAgKg3QgEgEAAgGQAAgGAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_14.setTransform(558.925,12.825);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgmBDQgMgQAAgdQAAgZAMgRQANgQAVAAQASAAAKANIAAg8IAbAAIAAClIgYAAIgBgNQgMAOgTABQgUAAgNgRgAgRgFQgHAJAAAVQAAASAHAJQAHALAMAAQAQAAAGgPIAAgxQgGgOgQABQgMgBgHAKg");
	this.shape_15.setTransform(549.65,12.7);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgmAyQgLgKAAgOQAAgTAOgJQAOgKAZAAIAQAAIAAgHQgBgJgFgGQgEgFgKAAQgJAAgFAEQgHAFAAAHIgaAAQAAgKAHgIQAHgJALgEQAKgFANAAQAUAAAMAKQAMAKABATIAAAzQgBAQAFAJIAAACIgbAAQgBgDgBgIQgNANgRAAQgSAAgLgKgAgPAJQgIAFABAJQAAAIAEAEQAFAEAJAAQAGAAAIgDQAGgEAEgGIAAgWIgPAAQgNAAgHAFg");
	this.shape_16.setTransform(537.75,15.025);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgYBmIAAgVIAJABQANAAABgOIAAh+IAZAAIAAB9QAAASgJAJQgJAKgQAAQgIAAgGgCgAAAhPQgEgEAAgGQAAgGAEgEQADgEAHAAQAHAAAEAEQAEAEAAAGQAAAGgEAEQgEAEgHAAQgHAAgDgEg");
	this.shape_17.setTransform(528,15.175);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAWA7IAAhKQAAgLgEgFQgGgGgLAAQgOAAgIAPIAABRIgaAAIAAhzIAYAAIABANQANgPAUAAQAkAAABApIAABMg");
	this.shape_18.setTransform(520.15,14.925);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgiAtQgQgQAAgaIAAgDQAAgQAHgOQAGgOANgIQAMgHAOAAQAYAAAMAPQANAPAAAcIAAAJIhLAAQACAPAIAIQAIAJAMAAQASAAAMgPIANANQgHALgLAGQgMAFgPAAQgYAAgOgPgAgPgfQgGAIgDANIAyAAIAAgCQgCgNgFgGQgHgHgKAAQgKAAgHAHg");
	this.shape_19.setTransform(508.25,15.025);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AA4A7IAAhKQAAgLgFgGQgFgFgLAAQgJAAgFAFQgGAFgCAIIAABOIgZAAIAAhLQgBgVgUAAQgQAAgGANIAABTIgaAAIAAhzIAYAAIABAMQAMgOAVAAQAXAAAIASQANgSAXAAQATAAAKALQAJAKAAAVIAABLg");
	this.shape_20.setTransform(492.675,14.925);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAWA7IAAhKQAAgLgEgFQgGgGgKAAQgPAAgIAPIAABRIgaAAIAAhzIAYAAIABANQANgPAUAAQAkAAABApIAABMg");
	this.shape_21.setTransform(471.45,14.925);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgmAyQgLgKAAgOQAAgTAOgJQAOgKAYAAIAQAAIAAgHQAAgJgEgGQgGgFgJAAQgJAAgGAEQgFAFAAAHIgaAAQgBgKAHgIQAHgJAKgEQALgFAMAAQAVAAAMAKQAMAKAAATIAAAzQABAQAEAJIAAACIgaAAQgDgDgBgIQgMANgRAAQgRAAgMgKgAgQAJQgGAFgBAJQABAIAFAEQAFAEAHAAQAHAAAIgDQAGgEADgGIAAgWIgNAAQgOAAgIAFg");
	this.shape_22.setTransform(459.4,15.025);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AAVBTIgigzIgLAMIAAAnIgaAAIAAilIAaAAIAABfIAIgKIAfgjIAfAAIgrAuIAwBFg");
	this.shape_23.setTransform(448.475,12.6);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgmAyQgLgKAAgOQAAgTAOgJQAOgKAZAAIAQAAIAAgHQgBgJgFgGQgEgFgKAAQgJAAgFAEQgHAFAAAHIgaAAQABgKAGgIQAHgJALgEQAKgFANAAQAUAAAMAKQAMAKABATIAAAzQgBAQAFAJIAAACIgbAAQgBgDgBgIQgNANgRAAQgSAAgLgKgAgPAJQgIAFABAJQAAAIAEAEQAGAEAIAAQAGAAAIgDQAGgEAEgGIAAgWIgPAAQgNAAgHAFg");
	this.shape_24.setTransform(436.05,15.025);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgmBDQgMgQAAgdQAAgZAMgRQANgQAVAAQASAAAKANIAAg8IAbAAIAAClIgYAAIgBgNQgMAOgTABQgUAAgNgRgAgRgFQgHAJAAAVQAAASAHAJQAHALAMAAQAQAAAGgPIAAgxQgGgOgQABQgMgBgHAKg");
	this.shape_25.setTransform(423.65,12.7);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgjAtQgPgQAAgaIAAgDQAAgQAGgOQAHgOAMgIQAMgHAOAAQAYAAANAPQANAPAAAcIAAAJIhLAAQABAPAJAIQAJAJALAAQASAAALgPIAPANQgIALgLAGQgMAFgOAAQgZAAgPgPgAgPgfQgGAIgDANIAxAAIAAgCQAAgNgHgGQgFgHgMAAQgKAAgGAHg");
	this.shape_26.setTransform(411.9,15.025);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgaBFIgBANIgXAAIAAilIAaAAIAAA8QALgNASAAQAWAAAMAQQAMAQAAAbIAAABQAAAbgMAQQgMAQgWABQgTAAgMgPgAgYAAIAAAvQAHAPARABQALAAAHgKQAGgJABgTIAAgDQAAgSgHgJQgHgJgLAAQgRgBgHAPg");
	this.shape_27.setTransform(399.95,12.7);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgMBQIAAhzIAZAAIAABzgAgKg3QgEgEAAgGQAAgGAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_28.setTransform(390.725,12.825);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AglBDQgNgQAAgdQAAgZANgRQAMgQAVAAQARAAAMANIAAg8IAaAAIAAClIgYAAIgBgNQgMAOgTABQgUAAgMgRgAgRgFQgHAJAAAVQAAASAHAJQAHALAMAAQAPAAAIgPIAAgxQgIgOgPABQgMgBgHAKg");
	this.shape_29.setTransform(381.45,12.7);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AAWA7IAAhKQAAgLgFgFQgFgGgKAAQgPAAgIAPIAABRIgaAAIAAhzIAZAAIABANQAMgPAUAAQAlAAAAApIAABMg");
	this.shape_30.setTransform(528.65,-15.475);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgmAyQgLgKAAgOQAAgTAOgJQAOgKAZAAIAQAAIAAgHQgBgJgFgGQgEgFgKAAQgJAAgFAEQgHAFAAAHIgaAAQABgKAGgIQAHgJALgEQAKgFANAAQAUAAAMAKQAMAKABATIAAAzQgBAQAFAJIAAACIgbAAQgBgDgBgIQgNANgRAAQgRAAgMgKgAgPAJQgIAFABAJQAAAIAEAEQAFAEAJAAQAGAAAIgDQAGgEAEgGIAAgWIgPAAQgNAAgHAFg");
	this.shape_31.setTransform(516.6,-15.375);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAYA6IgYhPIgXBPIgWAAIgghzIAZAAIAUBOIAXhOIATAAIAYBPIAShPIAaAAIggBzg");
	this.shape_32.setTransform(502.45,-15.35);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgjAtQgPgQAAgaIAAgDQAAgQAGgOQAIgOALgIQAMgHAOAAQAZAAANAPQAMAPAAAcIAAAJIhLAAQABAPAJAIQAJAJALAAQASAAALgPIAPANQgIALgLAGQgMAFgOAAQgZAAgPgPgAgPgfQgGAIgCANIAwAAIAAgCQAAgNgHgGQgFgHgMAAQgJAAgHAHg");
	this.shape_33.setTransform(488.5,-15.375);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AAWBTIAAhLQAAgLgFgFQgFgGgLAAQgOABgIANIAABTIgaAAIAAikIAaAAIAAA9QANgPASAAQAmAAAAApIAABNg");
	this.shape_34.setTransform(476.4,-17.8);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AAWBTIAAhLQAAgLgFgFQgGgGgKAAQgOABgIANIAABTIgaAAIAAikIAaAAIAAA9QANgPASAAQAmAAAAApIAABNg");
	this.shape_35.setTransform(458.7,-17.8);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AglAwQgKgLAAgVIAAhKIAaAAIAABKQAAAWATAAQASAAAGgOIAAhSIAaAAIAABzIgYAAIgBgMQgMAOgUAAQgTAAgJgLg");
	this.shape_36.setTransform(446.45,-15.25);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgaBFIgBANIgXAAIAAikIAaAAIAAA7QALgNATAAQAVAAALAQQANAQAAAbIAAACQAAAbgMAPQgNARgUgBQgUAAgMgOgAgYAAIAAAvQAHAQARAAQALAAAHgKQAGgJABgSIAAgEQAAgTgHgIQgHgKgLAAQgRABgHAOg");
	this.shape_37.setTransform(434.4,-17.7);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AglAwQgKgLAAgVIAAhKIAaAAIAABKQAAAWATAAQASAAAGgOIAAhSIAaAAIAABzIgYAAIgBgMQgMAOgUAAQgTAAgJgLg");
	this.shape_38.setTransform(421.8,-15.25);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgNBOIAAiFIgwAAIAAgWIB7AAIAAAWIgxAAIAACFg");
	this.shape_39.setTransform(409.05,-17.375);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FF8C2D").s().p("Aw3p3MAhvgAjIAAUSMghvAAjg");
	this.shape_40.setTransform(468.6,13.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.instance},{t:this.shape_1},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(360.6,-62.8,216,142.7);


(lib.drag7G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape.setTransform(375.825,33.575);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAGBPIAAh9IglANIAAgWIA8gXIADAAIAACdg");
	this.shape_1.setTransform(365.375,27.05);

	this.instance = new lib.Tween8("synched",0);
	this.instance.setTransform(369.7,27.2,0.0361,0.0648);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgkAwQgLgKAAgOQAAgRAOgJQANgJAXgBIAQAAIAAgGQAAgJgFgGQgFgEgJgBQgIAAgGAFQgFAEAAAGIgZAAQAAgJAGgIQAGgHAKgFQALgFAMAAQATABAMAJQALAKABASIAAAxQAAAPAEAJIAAACIgaAAIgDgLQgLAMgRAAQgQAAgLgJgAgPAIQgHAFAAAJQAAAHAFAEQAFAFAIAAQAGgBAHgDQAGgDAEgHIAAgVIgOAAQgNABgHAEg");
	this.shape_2.setTransform(541.975,117.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgNAmIAAg+IgSAAIAAgSIASAAIAAgbIAZAAIAAAbIATAAIAAASIgTAAIAAA9QAAAHACACQACADAHAAIAIgBIAAATQgIADgIAAQgcAAAAggg");
	this.shape_3.setTransform(532.55,115.95);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AghAqQgPgPAAgYIAAgDQAAgQAHgNQAGgNAMgHQALgIAOAAQAWAAANAPQAMAPAAAaIAAAJIhIAAQACANAIAJQAIAIALAAQARAAALgOIANANQgHAKgLAFQgLAFgOAAQgWABgPgQgAgOgeQgGAIgCANIAuAAIAAgCQgBgNgFgGQgGgHgLABQgJAAgGAGg");
	this.shape_4.setTransform(523.775,117.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgWA1QgLgGgGgIQgGgIAAgLIAYAAQABAKAGAEQAGAFAKAAQAJAAAFgEQAGgDAAgGQgBgIgFgDQgGgDgLgDQgNgDgIgEQgTgIAAgRQAAgOAMgKQAMgKASAAQATABANAJQAMAKAAAQIgZAAQAAgHgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAFADQAFADANAEQAPADAJAEQAIADAEAHQAEAGAAAJQAAAPgNAJQgMAKgUgBQgMAAgLgEg");
	this.shape_5.setTransform(512.55,117.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgcA5IAAhuIAYAAIAAAMQAIgPAQAAQAGAAADACIAAAXIgKgBQgRAAgFANIAABMg");
	this.shape_6.setTransform(503.975,117.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AghAqQgPgPAAgYIAAgDQAAgQAHgNQAGgNAMgHQALgIAOAAQAWAAANAPQAMAPAAAaIAAAJIhIAAQACANAIAJQAIAIALAAQARAAALgOIANANQgHAKgLAFQgLAFgOAAQgWABgPgQgAgOgeQgGAIgCANIAuAAIAAgCQgBgNgFgGQgGgHgLABQgJAAgGAGg");
	this.shape_7.setTransform(494.275,117.2);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgYBCIgBAMIgXAAIAAidIAZAAIAAA5QALgMARAAQAVAAALAPQAMAPAAAaIAAABQAAAagMAQQgLAPgUAAQgTAAgLgOgAgXAAIAAAtQAHAOAQAAQALAAAGgIQAHgJAAgSIAAgDQAAgSgGgIQgHgJgLAAQgQAAgHAOg");
	this.shape_8.setTransform(482.875,114.975);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgkAwQgLgKAAgOQAAgRAOgJQANgJAXgBIAQAAIAAgGQAAgJgFgGQgFgEgJgBQgIAAgGAFQgFAEAAAGIgZAAQAAgJAGgIQAGgHAKgFQALgFAMAAQATABAMAJQALAKABASIAAAxQAAAPAEAJIAAACIgaAAIgDgLQgLAMgRAAQgQAAgLgJgAgPAIQgHAFAAAJQAAAHAFAEQAFAFAIAAQAGgBAHgDQAGgDAEgHIAAgVIgOAAQgNABgHAEg");
	this.shape_9.setTransform(465.825,117.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgMBNIAAhuIAYAAIAABugAgJg1QgEgDAAgHQAAgFAEgEQADgDAGAAQAHAAADADQAEAEAAAFQAAAHgEADQgDAEgHAAQgGAAgDgEg");
	this.shape_10.setTransform(457.5,115.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgkBAQgMgQAAgbQAAgYAMgQQAMgPAUAAQARAAALAMIAAg5IAZAAIAACdIgXAAIgBgMQgLAOgSAAQgUAAgMgQgAgQgEQgHAIAAAUQAAARAHAJQAGAJALAAQAQAAAHgNIAAgvQgHgNgQAAQgLAAgGAKg");
	this.shape_11.setTransform(448.675,114.975);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgkAqQgPgPAAgbIAAAAQAAgRAHgNQAGgMAMgIQAMgGAOgBQAWAAAOAPQAOAPABAXIABAFQAAARgHAMQgGAOgMAGQgMAIgPgBQgWAAgOgPgAgTgbQgHAKAAASQAAASAHAJQAHAKAMAAQANAAAHgKQAHgKAAgSQAAgRgHgJQgIgKgMAAQgLgBgIAKg");
	this.shape_12.setTransform(437.025,117.2);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgwBOIAAiZIAXAAIABAMQALgOASAAQAVAAALAPQAMAQAAAaIAAACQAAAZgMAPQgMAPgTAAQgSAAgLgMIAAA1gAgXgsIAAAwQAHANAQAAQAKAAAHgJQAHgJAAgTQAAgRgHgKQgGgJgMAAQgPAAgHAMg");
	this.shape_13.setTransform(425.375,119.225);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgkAwQgLgKAAgOQAAgRAOgJQANgJAXgBIAQAAIAAgGQAAgJgFgGQgFgEgJgBQgIAAgGAFQgFAEAAAGIgZAAQAAgJAGgIQAGgHAKgFQALgFAMAAQATABAMAJQALAKABASIAAAxQAAAPAEAJIAAACIgaAAIgDgLQgLAMgRAAQgQAAgLgJgAgPAIQgHAFAAAJQAAAHAFAEQAFAFAIAAQAGgBAHgDQAGgDAEgHIAAgVIgOAAQgNABgHAEg");
	this.shape_14.setTransform(413.575,117.2);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgcA5IAAhuIAYAAIAAAMQAIgPAQAAQAGAAADACIAAAXIgKgBQgRAAgFANIAABMg");
	this.shape_15.setTransform(404.675,117.1);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgkAwQgLgKAAgOQAAgRAOgJQANgJAXgBIAQAAIAAgGQAAgJgFgGQgFgEgJgBQgIAAgGAFQgFAEAAAGIgZAAQAAgJAGgIQAGgHAKgFQALgFAMAAQATABAMAJQALAKABASIAAAxQAAAPAEAJIAAACIgaAAIgDgLQgLAMgRAAQgQAAgLgJgAgPAIQgHAFAAAJQAAAHAFAEQAFAFAIAAQAGgBAHgDQAGgDAEgHIAAgVIgOAAQgNABgHAEg");
	this.shape_16.setTransform(394.825,117.2);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgwBOIAAiZIAXAAIABAMQALgOASAAQAVAAALAPQAMAQAAAaIAAACQAAAZgMAPQgMAPgTAAQgSAAgLgMIAAA1gAgXgsIAAAwQAHANAQAAQAKAAAHgJQAHgJAAgTQAAgRgHgKQgGgJgMAAQgPAAgHAMg");
	this.shape_17.setTransform(383.475,119.225);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgMBMIAAhuIAYAAIAABugAgJg1QgEgEAAgFQAAgGAEgEQADgEAGAAQAHAAAEAEQADAEAAAGQAAAFgDAEQgEAEgHAAQgGAAgDgEg");
	this.shape_18.setTransform(529.4,85.9);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAUBPIgggwIgLAMIAAAkIgZAAIAAidIAZAAIAABaIAIgKIAdghIAeAAIgpAtIAuBBg");
	this.shape_19.setTransform(521.925,85.675);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgMBMIAAhuIAYAAIAABugAgKg1QgDgEAAgFQAAgGADgEQAEgEAGAAQAGAAAFAEQADAEAAAGQAAAFgDAEQgFAEgGAAQgGAAgEgEg");
	this.shape_20.setTransform(513.1,85.9);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgLBPIAAidIAYAAIAACdg");
	this.shape_21.setTransform(507.75,85.675);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgMBMIAAhuIAYAAIAABugAgJg1QgEgEAAgFQAAgGAEgEQADgEAGAAQAHAAAEAEQADAEAAAGQAAAFgDAEQgEAEgHAAQgGAAgDgEg");
	this.shape_22.setTransform(502.4,85.9);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AA2A4IAAhHQAAgKgFgFQgEgFgLAAQgJAAgFAFQgFAEgDAHIABBLIgYAAIAAhIQgBgTgTAAQgPAAgHAMIAABPIgZAAIAAhuIAYAAIABAMQALgNAVAAQAVAAAIARQAMgRAWAAQATgBAJAKQAIALABATIAABIg");
	this.shape_23.setTransform(490.575,87.9);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AghArQgPgPAAgZIAAgDQAAgQAHgNQAGgNAMgHQALgHAOAAQAWAAANAOQAMAPAAAaIAAAJIhIAAQACAOAIAIQAIAHALAAQARAAALgNIANAMQgHAKgLAGQgLAGgOAAQgWAAgPgPgAgOgdQgGAHgCAMIAuAAIAAgBQgBgMgFgHQgGgGgLgBQgJAAgGAIg");
	this.shape_24.setTransform(475.925,88);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AA2A4IAAhHQAAgKgFgFQgEgFgLAAQgJAAgFAFQgFAEgDAHIABBLIgYAAIAAhIQgBgTgTAAQgPAAgHAMIAABPIgZAAIAAhuIAYAAIABAMQALgNAVAAQAVAAAIARQAMgRAWAAQATgBAJAKQAIALABATIAABIg");
	this.shape_25.setTransform(461.075,87.9);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAVBPIAAhIQAAgKgFgFQgFgFgKAAQgOAAgHANIAABPIgZAAIAAidIAZAAIAAA7QAMgOASAAQAjAAABAnIAABJg");
	this.shape_26.setTransform(440.875,85.675);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgkAuQgJgKAAgVIAAhHIAZAAIAABHQAAAVASAAQARAAAGgNIAAhPIAZAAIAABuIgXAAIgBgLQgLAOgTAAQgSAAgKgLg");
	this.shape_27.setTransform(429.2,88.1);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgYBCIgBAMIgXAAIAAidIAZAAIAAA5QALgMARAAQAVAAALAPQAMAPAAAaIAAABQAAAagMAQQgLAPgUAAQgTAAgLgOgAgXAAIAAAtQAHAOAQAAQALAAAGgIQAHgJAAgSIAAgDQAAgSgGgIQgHgJgLAAQgQAAgHAOg");
	this.shape_28.setTransform(417.725,85.775);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgjAuQgKgKAAgVIAAhHIAZAAIAABHQAAAVARAAQASAAAGgNIAAhPIAZAAIAABuIgYAAIAAgLQgLAOgTAAQgSAAgJgLg");
	this.shape_29.setTransform(405.75,88.1);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgNAnIAAg+IgSAAIAAgTIASAAIAAgbIAZAAIAAAbIATAAIAAATIgTAAIAAA9QAAAGACADQACADAHAAIAIgBIAAATQgIACgIAAQgcAAAAgfg");
	this.shape_30.setTransform(396.2,86.75);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AAVA4IAAhHQAAgKgEgFQgFgFgKAAQgPAAgHANIAABOIgZAAIAAhtIAYAAIAAAMQANgPATAAQAiAAABAoIAABIg");
	this.shape_31.setTransform(560.625,58.7);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AghArQgPgQAAgYIAAgDQAAgQAHgNQAGgNAMgHQALgIAOAAQAWAAANAPQAMAPAAAaIAAAJIhIAAQACAOAIAHQAIAJALgBQARAAALgNIANANQgHAKgLAFQgLAGgOgBQgWABgPgPgAgOgeQgGAIgCANIAuAAIAAgCQgBgNgFgGQgGgHgLABQgJAAgGAGg");
	this.shape_32.setTransform(549.275,58.8);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AA2A4IAAhHQAAgKgFgFQgEgFgLAAQgJAAgFAEQgFAFgDAIIABBKIgYAAIAAhHQgBgUgTAAQgPAAgHAMIAABPIgZAAIAAhtIAYAAIABALQALgOAVAAQAVAAAIARQAMgRAWAAQATAAAJALQAIAKABAUIAABHg");
	this.shape_33.setTransform(534.425,58.7);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgYBJQgMgFgGgIIAMgPQALAOARAAQAMAAAHgHQAHgHAAgNIAAgHQgLAMgRAAQgTAAgMgQQgNgPAAgbQAAgZAMgQQAMgPAVAAQASAAAKANIACgLIAWAAIAABqQAAAWgOANQgNAMgWAAQgMAAgMgFgAgQgvQgHAKAAATQAAAQAHAJQAHAJALAAQAPAAAHgMIAAgwQgHgNgPAAQgLAAgHAKg");
	this.shape_34.setTransform(519.125,60.875);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AghArQgPgQAAgYIAAgDQAAgQAHgNQAGgNAMgHQALgIAOAAQAWAAANAPQAMAPAAAaIAAAJIhIAAQACAOAIAHQAIAJALgBQARAAALgNIANANQgHAKgLAFQgLAGgOgBQgWABgPgPgAgOgeQgGAIgCANIAuAAIAAgCQgBgNgFgGQgGgHgLABQgJAAgGAGg");
	this.shape_35.setTransform(507.875,58.8);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgXA1QgKgGgGgIQgGgIAAgLIAYAAQABAKAGAEQAGAFAJAAQAKAAAGgEQAEgEAAgFQABgIgGgDQgFgDgMgDQgNgDgJgEQgSgIAAgRQAAgOAMgKQAMgKASAAQATAAANALQAMAJAAAQIgZAAQAAgIgFgEQgFgFgJAAQgIAAgFAEQgFAEAAAGQAAAGAFADQAFADAOAEQAOADAIAEQAJADAEAHQAEAGAAAJQAAAPgMAJQgNAKgUgBQgNAAgLgEg");
	this.shape_36.setTransform(496.65,58.8);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgwBOIAAiZIAXAAIABAMQALgOASAAQAVAAALAPQAMAQAAAaIAAACQAAAZgMAPQgMAPgTAAQgSAAgLgMIAAA1gAgXgsIAAAwQAHANAQAAQAKAAAHgJQAHgJAAgTQAAgRgHgKQgGgJgMAAQgPAAgHAMg");
	this.shape_37.setTransform(480.375,60.825);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgkAwQgLgJAAgOQAAgTAOgHQANgLAXAAIAQAAIAAgGQAAgJgFgGQgFgEgJAAQgIgBgGAFQgFAEAAAGIgZAAQAAgIAGgJQAGgHAKgFQALgFAMAAQATAAAMALQALAJABASIAAAxQAAAPAEAJIAAABIgaAAIgDgKQgLAMgRAAQgQAAgLgJgAgPAIQgHAFAAAJQAAAHAFAFQAFAEAIgBQAGAAAHgDQAGgDAEgGIAAgWIgOAAQgNABgHAEg");
	this.shape_38.setTransform(468.575,58.8);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgMBMIAAhtIAZAAIAABtgAgKg1QgDgDAAgHQAAgFADgEQAEgDAGgBQAGABAFADQADAEAAAFQAAAHgDADQgFAEgGAAQgGAAgEgEg");
	this.shape_39.setTransform(460.25,56.7);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgNAmIAAg+IgSAAIAAgSIASAAIAAgbIAYAAIAAAbIAUAAIAAASIgUAAIAAA9QABAHACACQACADAHAAIAIgBIAAATQgIADgIAAQgcAAAAggg");
	this.shape_40.setTransform(453.8,57.55);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AghArQgPgQAAgYIAAgDQAAgQAHgNQAGgNAMgHQALgIAOAAQAWAAANAPQAMAPAAAaIAAAJIhIAAQACAOAIAHQAIAJALgBQARAAALgNIANANQgHAKgLAFQgLAGgOgBQgWABgPgPgAgOgeQgGAIgCANIAuAAIAAgCQgBgNgFgGQgGgHgLABQgJAAgGAGg");
	this.shape_41.setTransform(445.025,58.8);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgaBHQgOgGgHgLQgIgKAAgOIAaAAQAAAMAJAHQAIAHAPAAQANAAAHgFQAHgGAAgJQAAgKgHgFQgHgFgRgGQgSgFgLgGQgUgNAAgUQAAgSAPgMQAOgMAXAAQAPAAANAGQAMAGAHALQAHAKAAANIgaAAQAAgMgHgGQgIgHgNAAQgMAAgHAGQgHAFAAAKQAAAIAHAFQAIAGARAFQARAFAKAGQALAGAFAJQAFAJAAALQAAATgOALQgPALgYAAQgPAAgOgGg");
	this.shape_42.setTransform(433.025,56.875);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgMBMIAAhtIAYAAIAABtgAgJg1QgEgDAAgHQAAgFAEgEQADgDAGgBQAHABAEADQADAEAAAFQAAAHgDADQgEAEgHAAQgGAAgDgEg");
	this.shape_43.setTransform(418.8,56.7);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgXA1QgKgGgGgIQgGgIAAgLIAYAAQABAKAGAEQAGAFAKAAQAJAAAGgEQAEgEAAgFQAAgIgFgDQgFgDgMgDQgNgDgJgEQgSgIAAgRQAAgOAMgKQAMgKASAAQATAAANALQAMAJAAAQIgZAAQAAgIgFgEQgGgFgIAAQgHAAgGAEQgFAEAAAGQAAAGAFADQAFADANAEQAPADAIAEQAJADAEAHQAEAGAAAJQAAAPgNAJQgMAKgUgBQgNAAgLgEg");
	this.shape_44.setTransform(410.6,58.8);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgYBJQgMgFgGgIIAMgPQALAOARAAQAMAAAHgHQAHgHAAgNIAAgHQgLAMgRAAQgTAAgMgQQgNgPAAgbQAAgZAMgQQAMgPAVAAQASAAAKANIACgLIAWAAIAABqQAAAWgOANQgNAMgWAAQgMAAgMgFgAgQgvQgHAKAAATQAAAQAHAJQAHAJALAAQAPAAAHgMIAAgwQgHgNgPAAQgLAAgHAKg");
	this.shape_45.setTransform(399.075,60.875);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AAVA4IAAhHQAAgKgEgFQgFgFgKAAQgPAAgHANIAABOIgZAAIAAhtIAYAAIAAAMQANgPATAAQAiAAABAoIAABIg");
	this.shape_46.setTransform(387.475,58.7);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgkAuQgJgLAAgTIAAhHIAZAAIAABGQAAAVASAAQARAAAGgNIAAhOIAZAAIAABtIgXAAIgBgKQgLANgTgBQgSAAgKgKg");
	this.shape_47.setTransform(375.8,58.9);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgvBLIAAiVIBeAAIAAAVIhEAAIAAAtIA7AAIAAATIg7AAIAABAg");
	this.shape_48.setTransform(364.7,56.875);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FF8C2D").s().p("Aw3p3MAhvgAjIAAUSMghvAAjg");
	this.shape_49.setTransform(462.5,88);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.instance},{t:this.shape_1},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(350.3,12,224.49999999999994,142.7);


(lib.btnEit_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance_1 = new lib.Path();
	this.instance_1.setTransform(191.55,128,1,1,0,0,0,64,128);
	this.instance_1.alpha = 0.1602;
	this.instance_1.compositeOperation = "multiply";

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EE3338").s().p("Ap7lMIEvkvIPIPIIkwEvg");
	this.shape_4.setTransform(127.95,127.95);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EE3338").s().p("Ap7FNIPHvIIEwEvIvIPIg");
	this.shape_5.setTransform(127.95,127.95);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AmcPQQi+hQiSiTQiSiThRi+QhTjFAAjXQAAjWBTjGQBRi+CSiSQCSiSC+hRQDGhTDWAAQDXAADFBTQC+BRCTCSQCTCSBQC+QBTDGAADWQAADXhTDFQhQC+iTCTQiTCTi+BQQjFBTjXAAQjWAAjGhTg");
	this.shape_6.setTransform(127.95,127.95);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#EE3338").s().p("AnxSbQjmhhiwixQiyixhhjmQhljuAAkEQAAkDBljuQBhjmCyiwQCwiyDmhhQDuhlEDAAQEEAADuBlQDmBhCxCyQCxCwBhDmQBkDtAAEEQAAEEhkDuQhhDmixCxQixCxjmBhQjuBkkEAAQkEAAjthkg");
	this.shape_7.setTransform(127.95,127.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.instance_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.btnEit_1, new cjs.Rectangle(0,0,255.9,255.9), null);


(lib.Slots9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// slots
	this.lima = new lib.drag7G5();
	this.lima.name = "lima";
	this.lima.setTransform(112.8,319.95,0.6777,0.6777,0,0,0,104.5,63.6);
	new cjs.ButtonHelper(this.lima, 0, 1, 2, false, new lib.drag7G5(), 3);

	this.empat = new lib.drag7G4();
	this.empat.name = "empat";
	this.empat.setTransform(113,211.65,0.6777,0.6777,0,0,0,103.8,63.8);
	new cjs.ButtonHelper(this.empat, 0, 1, 2, false, new lib.drag7G4(), 3);

	this.tiga = new lib.drag7G3();
	this.tiga.name = "tiga";
	this.tiga.setTransform(114.05,432.55,0.6777,0.6777,0,0,0,108.1,66.7);
	new cjs.ButtonHelper(this.tiga, 0, 1, 2, false, new lib.drag7G3(), 3);

	this.dua = new lib.drag7G2();
	this.dua.name = "dua";
	this.dua.setTransform(433.05,431.05,0.6777,0.6777,0,0,0,468.6,13.2);
	new cjs.ButtonHelper(this.dua, 0, 1, 2, false, new lib.drag7G2(), 3);

	this.satu = new lib.drag7G1();
	this.satu.name = "satu";
	this.satu.setTransform(275.8,431.95,0.6777,0.6777,0,0,0,467.1,88.3);
	new cjs.ButtonHelper(this.satu, 0, 1, 2, false, new lib.drag7G1(), 3);

	this.kotakKartu2 = new lib.target();
	this.kotakKartu2.name = "kotakKartu2";
	this.kotakKartu2.setTransform(808.3,195.8,1.0251,1.0175,0,0,0,0.2,0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.kotakKartu2},{t:this.satu},{t:this.dua},{t:this.tiga},{t:this.empat},{t:this.lima}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Slots9, new cjs.Rectangle(40.8,158.2,837,319.6), null);


(lib.pp3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		var _this = this;
		
		_this.stop();
	}
	this.frame_12 = function() {
		var _this = this;
		
		_this.stop();
		
		_this.cobaBG.on('click', function(){
		
		_this.play();
		});
		
		_this.exit.on('click', function(){
		
		_this.play();
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(12).call(this.frame_12).wait(13));

	// Layer_5
	this.instance = new lib._3_1();
	this.instance.setTransform(-147,-211,0.8385,1.0029);

	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_2
	this.instance_1 = new lib.Tween7_1("synched",0);
	this.instance_1.setTransform(42.25,-40.25);
	this.instance_1.alpha = 0;

	this.instance_2 = new lib.Tween8_1("synched",0);
	this.instance_2.setTransform(42.25,-40.25);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true,alpha:1},12).to({_off:false,alpha:0},12).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:false},12).to({_off:true,alpha:0},12).wait(1));

	// Layer_3
	this.cobaBG = new lib.Tween10_1();
	this.cobaBG.name = "cobaBG";
	this.cobaBG.setTransform(43.75,-42.75,1.1855,0.9051,0,0,0,0.2,-0.1);
	this.cobaBG.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.cobaBG).to({alpha:0.75},12).to({alpha:0},12).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-436.6,-314.2,960.2,543.1);


(lib.pp2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		var _this = this;
		
		_this.stop();
	}
	this.frame_12 = function() {
		var _this = this;
		
		_this.stop();
		
		_this.cobaBG.on('click', function(){
		
		_this.play();
		});
		
		_this.exit.on('click', function(){
		
		_this.play();
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(12).call(this.frame_12).wait(13));

	// Layer_5
	this.instance = new lib._11_1();
	this.instance.setTransform(-147,-211,1,0.7612);

	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_2
	this.instance_1 = new lib.Tween7_1("synched",0);
	this.instance_1.setTransform(42.25,-40.25);
	this.instance_1.alpha = 0;

	this.instance_2 = new lib.Tween8_1("synched",0);
	this.instance_2.setTransform(42.25,-40.25);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true,alpha:1},12).to({_off:false,alpha:0},12).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:false},12).to({_off:true,alpha:0},12).wait(1));

	// Layer_3
	this.cobaBG = new lib.Tween10_1();
	this.cobaBG.name = "cobaBG";
	this.cobaBG.setTransform(43.75,-42.75,1.1855,0.9051,0,0,0,0.2,-0.1);
	this.cobaBG.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.cobaBG).to({alpha:0.75},12).to({alpha:0},12).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-436.6,-314.2,960.2,543.1);


(lib.pp1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		var _this = this;
		
		_this.stop();
	}
	this.frame_12 = function() {
		var _this = this;
		
		_this.stop();
		
		_this.cobaBG.on('click', function(){
		
		_this.play();
		});
		
		_this.exit.on('click', function(){
		
		_this.play();
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(12).call(this.frame_12).wait(13));

	// Layer_5
	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);
	this.exit._off = true;

	this.timeline.addTween(cjs.Tween.get(this.exit).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_4
	this.instance = new lib.Bitmap21();
	this.instance.setTransform(-230,-211,1.6459,1.9711);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_2
	this.instance_1 = new lib.Tween7_1("synched",0);
	this.instance_1.setTransform(42.25,-40.25);
	this.instance_1.alpha = 0;

	this.instance_2 = new lib.Tween8_1("synched",0);
	this.instance_2.setTransform(42.25,-40.25);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true,alpha:1},12).to({_off:false,alpha:0},12).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:false},12).to({_off:true,alpha:0},12).wait(1));

	// Layer_3
	this.cobaBG = new lib.Tween10_1();
	this.cobaBG.name = "cobaBG";
	this.cobaBG.setTransform(43.75,-42.75,1.1855,0.9051,0,0,0,0.2,-0.1);
	this.cobaBG.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.cobaBG).to({alpha:0.75},12).to({alpha:0},12).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-436.6,-314.2,960.2,543.1);


(lib.popUpInfo = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		var _this = this;
		
		_this.stop();
	}
	this.frame_12 = function() {
		var _this = this;
		
		_this.stop();
		
		_this.cobaBG.on('click', function(){
		
		_this.play();
		});
		
		_this.exit.on('click', function(){
		
		_this.play();
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(12).call(this.frame_12).wait(13));

	// Layer_5
	this.exit = new lib.btnEit_1();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);
	this.exit._off = true;

	this.timeline.addTween(cjs.Tween.get(this.exit).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_4
	this.instance = new lib.RestoreIcon("single",0);
	this.instance.setTransform(-68.1,-41.55,1.2238,1.2238,0,0,0,-0.1,0);
	this.instance.alpha = 0.75;

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgQAAQgNAAgLAHQgKAHgFAMIAABzIgcAAIAAiiIAaAAIABAVQATgYAdAAQAzAAABA6IAABrg");
	this.shape.setTransform(320.85,27.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQATgOAiAAIAcAAIAAgNQgBgPgIgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAIgLAQgHQAOgGARAAQAcAAAQAOQAPAOABAYIAABKQABAXAFANIAAACIgdAAQgCgFgCgMQgUAUgZAAQgYAAgPgNgAgmAgQgBANAKAIQAIAHAOAAQAMAAALgHQANgGAFgLIAAgiIgWAAQgyAAAAAeg");
	this.shape_1.setTransform(304,27.625);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgQAAQgNAAgKAHQgLAHgFAMIAABzIgcAAIAAiiIAaAAIABAVQATgYAdAAQA0AAAAA6IAABrg");
	this.shape_2.setTransform(287.25,27.475);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgzBHQgPgOAAgVQAAgZAUgNQASgOAjAAIAbAAIAAgNQAAgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAIgLAPgHQAPgGARAAQAcAAAQAOQAQAOABAYIAABKQgBAXAGANIAAACIgdAAQgDgFgBgMQgTAUgaAAQgZAAgPgNgAgmAgQAAANAJAIQAIAHAOAAQAMAAAMgHQALgGAGgLIAAgiIgXAAQgyAAABAeg");
	this.shape_3.setTransform(270.4,27.625);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_4.setTransform(255.275,24.225);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AggBNQgPgHgIgMQgIgMAAgPIAbAAQABAOAKAIQAKAJARAAQAPAAAKgHQAJgGAAgLQABgLgJgGQgIgHgUgEQgWgFgMgFQgNgGgFgJQgGgJAAgMQAAgUARgNQARgOAZAAQAbAAASAOQARAOAAAWIgcAAQAAgLgJgIQgLgIgOAAQgOAAgJAGQgJAHABAKQAAAKAHAGQAIAFAVAEQAUAFANAGQANAGAHAJQAFAJAAANQAAAWgRANQgSANgbAAQgSAAgQgHg");
	this.shape_5.setTransform(230.9,27.625);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgzBHQgPgOAAgVQAAgZAUgNQASgOAjAAIAbAAIAAgNQAAgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAIgLAQgHQAOgGARAAQAcAAAQAOQAQAOABAYIAABKQAAAXAFANIAAACIgdAAQgDgFgBgMQgTAUgaAAQgZAAgPgNgAgmAgQAAANAJAIQAIAHAOAAQAMAAAMgHQALgGAGgLIAAgiIgXAAQgxAAAAAeg");
	this.shape_6.setTransform(214.7,27.625);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgEBbQgKgLAAgVIAAhjIgdAAIAAgWIAdAAIAAgnIAbAAIAAAnIAeAAIAAAWIgeAAIAABkQAAAJAEAFQAEAFAKAAIANgCIAAAWQgLADgKABQgTAAgIgMg");
	this.shape_7.setTransform(200.825,25.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgzBHQgPgOAAgVQAAgZAUgNQASgOAjAAIAbAAIAAgNQAAgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAJgLAOgHQAPgGARAAQAcAAAQAOQAPAOACAYIAABKQgBAXAGANIAAACIgdAAQgDgFgBgMQgTAUgbAAQgXAAgQgNgAgnAgQABANAIAIQAJAHAOAAQAMAAAMgHQALgGAGgLIAAgiIgXAAQgyAAAAAeg");
	this.shape_8.setTransform(187.95,27.625);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_9.setTransform(165.225,24.225);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQAUgOAhAAIAbAAIAAgNQAAgPgIgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAJgLAOgHQAPgGARAAQAcAAAQAOQAPAOABAYIAABKQAAAXAGANIAAACIgdAAQgCgFgCgMQgUAUgaAAQgYAAgOgNgAgnAgQAAANAJAIQAJAHAOAAQAMAAALgHQANgGAEgLIAAgiIgVAAQgzAAAAAeg");
	this.shape_10.setTransform(148.05,27.625);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgEBbQgKgLAAgVIAAhjIgdAAIAAgWIAdAAIAAgnIAbAAIAAAnIAeAAIAAAWIgeAAIAABkQAAAJAEAFQAEAFAKAAIANgCIAAAWQgLADgKABQgTAAgIgMg");
	this.shape_11.setTransform(134.225,25.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("Ag0A9QgVgXAAgmIAAgBQAAgXAKgTQAJgUARgKQARgKAUAAQAhAAAVAXQAUAXAAAlIAAACQAAAYgJASQgJATgRALQgRAKgWAAQggAAgUgXgAghgsQgMAQAAAeQAAAbAMAQQANARAUAAQAWAAAMgRQANgRAAgdQAAgagNgRQgNgQgVAAQgTAAgOAQg");
	this.shape_12.setTransform(120.9,27.625);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_13.setTransform(105.325,24.225);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgzBHQgPgOAAgVQAAgZAUgNQASgOAjAAIAbAAIAAgNQAAgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAIgLAQgHQAOgGARAAQAcAAAQAOQAQAOABAYIAABKQAAAXAFANIAAACIgdAAQgDgFgBgMQgTAUgaAAQgZAAgPgNgAgmAgQAAANAJAIQAIAHAOAAQAMAAAMgHQALgGAGgLIAAgiIgXAAQgxAAAAAeg");
	this.shape_14.setTransform(80.6,27.625);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgyBeQgRgYAAglIAAgCQAAgkARgXQASgXAdAAQAbAAARAUIAAhVIAcAAIAADmIgaAAIgBgSQgRAVgdAAQgcAAgSgXgAgcgLQgMAOAAAfQAAAcAMAQQALAPATAAQAbAAAMgYIAAhJQgNgXgaAAQgTAAgLAQg");
	this.shape_15.setTransform(63.15,24.375);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgzBHQgPgOAAgVQAAgZATgNQAUgOAhAAIAbAAIAAgNQABgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAJgLAOgHQAPgGARAAQAcAAAQAOQAPAOACAYIAABKQgBAXAGANIAAACIgdAAQgDgFgBgMQgTAUgbAAQgXAAgQgNgAgnAgQABANAIAIQAJAHAOAAQAMAAAMgHQALgGAFgLIAAgiIgVAAQgzAAAAAeg");
	this.shape_16.setTransform(46.55,27.625);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AhEByIAAjgIAaAAIABASQARgVAdAAQAdAAASAWQARAWAAAnIAAADQAAAkgRAXQgRAWgdABQgdAAgRgUIAABPgAgohDIAABNQANAWAZAAQATAAAMgQQAMgQAAgeQAAgcgMgQQgMgQgTAAQgZABgNAWg");
	this.shape_17.setTransform(29.875,30.6);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgRAAQgMAAgKAHQgKAHgGAMIAABzIgcAAIAAiiIAbAAIAAAVQATgYAdAAQA0AAAAA6IAABrg");
	this.shape_18.setTransform(4.9,27.475);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQATgOAiAAIAbAAIAAgNQAAgPgIgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAIgLAQgHQAOgGARAAQAcAAAQAOQAPAOABAYIAABKQABAXAFANIAAACIgdAAQgCgFgCgMQgUAUgZAAQgYAAgPgNgAgmAgQgBANAKAIQAIAHAOAAQAMAAALgHQANgGAEgLIAAgiIgVAAQgyAAAAAeg");
	this.shape_19.setTransform(-11.9,27.625);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_20.setTransform(-27.075,24.225);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_21.setTransform(-42.675,24.225);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgyBEQgNgPAAgeIAAhpIAcAAIAABoQgBAlAfAAQAfAAAKgYIAAh1IAcAAIAACiIgbAAIAAgQQgRATgdAAQgbAAgOgPg");
	this.shape_22.setTransform(-60,27.775);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgeCNIAAgWIANABQAJAAAFgFQAEgFAAgMIAAi1IAbAAIAAC0QAAAvgpgBQgJAAgIgCgAACh0QgDgEAAgGQAAgIADgEQAFgEAIgBQAHABAEAEQAFAEAAAIQAAAGgFAEQgEAFgHAAQgJAAgEgFg");
	this.shape_23.setTransform(-73.65,27.95);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgRAAQgMAAgKAHQgKAHgGAMIAABzIgcAAIAAiiIAbAAIAAAVQATgYAdAAQA0AAAAA6IAABrg");
	this.shape_24.setTransform(-84.2,27.475);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgyBEQgNgPAAgeIAAhpIAcAAIAABoQAAAlAeAAQAfAAAKgYIAAh1IAcAAIAACiIgaAAIgBgQQgQATgfAAQgZAAgPgPg");
	this.shape_25.setTransform(-101.15,27.775);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgEBbQgKgLAAgVIAAhjIgdAAIAAgWIAdAAIAAgnIAbAAIAAAnIAeAAIAAAWIgeAAIAABkQAAAJAEAFQAEAFAKAAIANgCIAAAWQgLADgKABQgTAAgIgMg");
	this.shape_26.setTransform(-115.075,25.8);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgNBvIAAiiIAaAAIAACigAgLhTQgEgEgBgHQABgHAEgEQAEgFAHAAQAIAAAEAFQAFAEAAAHQAAAHgFAEQgEAFgIAAQgHAAgEgFg");
	this.shape_27.setTransform(-123.35,24.675);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgyBeQgRgYAAglIAAgCQAAgkARgXQASgXAdAAQAbAAARAUIAAhVIAcAAIAADmIgaAAIgBgSQgRAVgdAAQgcAAgSgXgAgcgLQgMAOAAAfQAAAcAMAQQALAPATAAQAbAAAMgYIAAhJQgNgXgaAAQgTAAgLAQg");
	this.shape_28.setTransform(-136.2,24.375);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgwA/QgUgWAAglIAAgEQAAgYAJgTQAKgTAQgKQARgLASAAQAgAAARAVQASAUAAAnIAAALIhtAAQABAYANAPQANAPAUAAQAOAAALgGQAKgGAIgKIARANQgVAfgpAAQgfAAgWgVgAgZgwQgMAMgDAWIBRAAIAAgCQgBgVgKgMQgKgLgSAAQgQAAgLAMg");
	this.shape_29.setTransform(-160.1,27.625);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("ABWBTIAAhrQAAgRgIgIQgIgJgTAAQgPAAgLAJQgKAJgBAQIAABrIgbAAIAAhqQAAgjgjAAQgbAAgKAXIAAB2IgcAAIAAiiIAaAAIABASQASgVAeAAQAiAAALAaQAJgLANgIQANgHARAAQA2AAABA5IAABsg");
	this.shape_30.setTransform(-181.9,27.475);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQAUgOAhAAIAbAAIAAgNQABgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAJgLAOgHQAPgGARAAQAcAAAQAOQAPAOABAYIAABKQAAAXAGANIAAACIgdAAQgDgFgBgMQgUAUgaAAQgYAAgOgNgAgnAgQABANAIAIQAJAHAOAAQAMAAALgHQAMgGAFgLIAAgiIgVAAQgzAAAAAeg");
	this.shape_31.setTransform(-203.75,27.625);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AghBrQgSgHgIgNIAOgRQASAWAaAAQATAAAMgLQALgMAAgVIAAgNQgRATgbAAQgdAAgSgXQgRgXAAgnQAAgmARgWQASgXAdAAQAcAAARAVIABgSIAZAAIAACeQABAfgTATQgTASgfAAQgRAAgQgIgAgchKQgLAPAAAfQgBAcALAPQAMAPATAAQAbAAAMgYIAAhJQgNgXgZAAQgUAAgLAQg");
	this.shape_32.setTransform(-221.05,30.675);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgmBTIAAiiIAbAAIAAATQANgWAZAAQAIAAAEACIAAAaIgNgBQgbAAgJAXIAABzg");
	this.shape_33.setTransform(-241.325,27.475);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("Ag1A9QgUgXAAgmIAAgBQAAgXAKgTQAJgUARgKQAQgKAVAAQAhAAAVAXQAUAXAAAlIAAACQAAAYgJASQgJATgRALQgRAKgWAAQggAAgVgXgAghgsQgMAQAAAeQAAAbAMAQQANARAUAAQAVAAANgRQAMgRAAgdQABgagNgRQgNgQgVAAQgTAAgOAQg");
	this.shape_34.setTransform(-256.1,27.625);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_35.setTransform(-271.625,24.225);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgmBoQgTgJgLgPQgLgPAAgTIAeAAQAAAUAOALQAPAMAYAAQAWAAANgKQALgJABgQQAAgQgMgJQgLgJgdgIQglgLgRgOQgQgQgBgXQAAgaAVgQQAVgRAgAAQAXAAARAIQASAJAJAPQAKAQAAASIgdAAQAAgUgNgLQgMgMgXAAQgVAAgLAKQgNAJAAARQAAANAMAJQALAKAaAHQAcAIAQAIQAOAJAIANQAHAMAAARQAAAagUAQQgVAQgiAAQgWAAgUgIg");
	this.shape_36.setTransform(-289.55,24.825);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgMAMQgEgEAAgIQAAgGAEgEQAEgGAIAAQAJAAAEAGQAEAEAAAGQAAAIgEAEQgEAEgJABQgIgBgEgEg");
	this.shape_37.setTransform(-318.025,34.25);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgxBgQgUgRAAgbIAcAAQAAARAMAKQALALASAAQAUAAALgLQALgKAAgUQAAgTgMgKQgMgLgVAAIgVAAIAAgWIAVAAQATAAALgKQALgKAAgRQAAgngmAAQgRAAgLALQgLAKABARIgdAAQAAgaAUgRQASgRAdAAQAfAAARAQQASAQAAAdQAAAPgJANQgJANgRAHQATAFAKANQAJANABATQgBAegTARQgTARgfAAQgeAAgTgQg");
	this.shape_38.setTransform(-330.8,24.825);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgvA/QgVgWAAglIAAgEQAAgYAJgTQAJgTARgKQAQgLATAAQAfAAATAVQARAUAAAnIAAALIhtAAQAAAYAOAPQANAPAUAAQAOAAALgGQAKgGAIgKIARANQgVAfgoAAQghAAgUgVgAgZgwQgLAMgEAWIBRAAIAAgCQgBgVgLgMQgKgLgRAAQgQAAgLAMg");
	this.shape_39.setTransform(216.4,-37.625);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("ABWBTIAAhrQAAgRgIgIQgIgJgSAAQgQAAgLAJQgKAJgBAQIAABrIgbAAIAAhqQAAgjgjAAQgcAAgJAXIAAB2IgcAAIAAiiIAaAAIABASQASgVAeAAQAiAAALAaQAIgLANgIQAOgHASAAQA1AAABA5IAABsg");
	this.shape_40.setTransform(194.65,-37.775);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQAUgOAhAAIAbAAIAAgNQAAgPgIgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAJgLAOgHQAPgGARAAQAcAAAQAOQAPAOABAYIAABKQAAAXAGANIAAACIgdAAQgCgFgCgMQgUAUgaAAQgYAAgOgNgAgnAgQAAANAJAIQAJAHAOAAQAMAAALgHQANgGAEgLIAAgiIgVAAQgzAAAAAeg");
	this.shape_41.setTransform(172.8,-37.625);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AghBrQgRgHgKgNIAPgRQASAWAaAAQATAAALgLQAMgMAAgVIAAgNQgRATgcAAQgdAAgRgXQgSgXAAgnQAAgmASgWQARgXAdAAQAdAAARAVIACgSIAYAAIAACeQAAAfgSATQgSASggAAQgRAAgQgIgAgchKQgMAPAAAfQABAcAKAPQAMAPATAAQAaAAANgYIAAhJQgNgXgaAAQgTAAgLAQg");
	this.shape_42.setTransform(155.45,-34.575);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgNBvIAAiiIAaAAIAACigAgLhTQgFgEABgHQgBgHAFgEQAEgFAHAAQAIAAAFAFQADAEAAAHQAAAHgDAEQgFAFgIAAQgHAAgEgFg");
	this.shape_43.setTransform(135.9,-40.575);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgiBrQgQgHgKgNIAPgRQASAWAaAAQATAAALgLQAMgMAAgVIAAgNQgRATgcAAQgdAAgRgXQgSgXAAgnQAAgmASgWQARgXAdAAQAeAAAQAVIACgSIAYAAIAACeQAAAfgSATQgSASggAAQgRAAgRgIgAgchKQgMAPAAAfQAAAcAMAPQALAPATAAQAbAAAMgYIAAhJQgNgXgaAAQgTAAgLAQg");
	this.shape_44.setTransform(123.15,-34.575);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgQAAQgNAAgKAHQgLAHgFAMIAABzIgcAAIAAiiIAaAAIABAVQATgYAdAAQA0AAAAA6IAABrg");
	this.shape_45.setTransform(106.45,-37.775);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgzBHQgPgOAAgVQAAgZAUgNQASgOAjAAIAbAAIAAgNQAAgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAIgLAQgHQAOgGARAAQAcAAAQAOQAQAOABAYIAABKQAAAXAFANIAAACIgdAAQgDgFgBgMQgTAUgaAAQgZAAgPgNgAgmAgQAAANAJAIQAIAHAOAAQAMAAAMgHQALgGAGgLIAAgiIgXAAQgxAAAAAeg");
	this.shape_46.setTransform(89.6,-37.625);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgNBzIAAjlIAbAAIAADlg");
	this.shape_47.setTransform(77.525,-41.025);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgyBEQgNgPAAgeIAAhpIAcAAIAABoQAAAlAeAAQAfAAAKgYIAAh1IAcAAIAACiIgaAAIgBgQQgQATgfAAQgZAAgPgPg");
	this.shape_48.setTransform(65.35,-37.475);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_49.setTransform(42.525,-41.025);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgxBEQgOgPAAgeIAAhpIAbAAIAABoQAAAlAfAAQAfAAAKgYIAAh1IAcAAIAACiIgaAAIgBgQQgQATgfAAQgaAAgNgPg");
	this.shape_50.setTransform(25.2,-37.475);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgEBbQgKgLAAgVIAAhjIgdAAIAAgWIAdAAIAAgnIAbAAIAAAnIAeAAIAAAWIgeAAIAABkQAAAJAEAFQAEAFAKAAIANgCIAAAWQgLADgKABQgTAAgIgMg");
	this.shape_51.setTransform(11.275,-39.45);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgRAAQgMAAgLAHQgJAHgGAMIAABzIgcAAIAAiiIAaAAIABAVQATgYAdAAQAzAAABA6IAABrg");
	this.shape_52.setTransform(-1.7,-37.775);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgyBEQgNgPAAgeIAAhpIAcAAIAABoQgBAlAfAAQAeAAALgYIAAh1IAcAAIAACiIgaAAIgBgQQgRATgdAAQgaAAgPgPg");
	this.shape_53.setTransform(-18.7,-37.475);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgNBzIAAjlIAbAAIAADlg");
	this.shape_54.setTransform(-114.175,-41.025);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("Ag1A9QgUgXAAgmIAAgBQAAgXAJgTQAKgUARgKQAQgKAVAAQAhAAAUAXQAVAXAAAlIAAACQAAAYgJASQgJATgRALQgRAKgWAAQggAAgVgXgAgggsQgNAQAAAeQAAAbANAQQAMARAUAAQAVAAANgRQAMgRAAgdQAAgagNgRQgMgQgVAAQgUAAgMAQg");
	this.shape_55.setTransform(-126.65,-37.625);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgpBfIgBATIgaAAIAAjmIAcAAIAABWQARgVAcAAQAeAAARAXQARAWAAAmIAAACQAAAmgRAWQgRAXgdAAQgeAAgRgWgAgogCIAABGQANAZAbAAQATAAALgPQALgQAAgfQAAgcgLgPQgLgPgTAAQgcAAgMAZg");
	this.shape_56.setTransform(-143.725,-40.875);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("ABWBTIAAhrQAAgRgIgIQgIgJgTAAQgPAAgLAJQgKAJgBAQIAABrIgbAAIAAhqQAAgjgjAAQgbAAgKAXIAAB2IgcAAIAAiiIAaAAIABASQASgVAeAAQAiAAALAaQAJgLANgIQANgHARAAQA2AAABA5IAABsg");
	this.shape_57.setTransform(-166.15,-37.775);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("Ag1A9QgUgXAAgmIAAgBQAAgXAJgTQAKgUARgKQARgKAUAAQAhAAAUAXQAVAXAAAlIAAACQAAAYgJASQgJATgRALQgRAKgWAAQggAAgVgXgAghgsQgMAQAAAeQAAAbAMAQQANARAUAAQAWAAAMgRQAMgRAAgdQAAgagMgRQgNgQgVAAQgUAAgNAQg");
	this.shape_58.setTransform(-188.4,-37.625);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgEBbQgKgLAAgVIAAhjIgdAAIAAgWIAdAAIAAgnIAbAAIAAAnIAeAAIAAAWIgeAAIAABkQAAAJAEAFQAEAFAKAAIANgCIAAAWQgLADgKABQgTAAgIgMg");
	this.shape_59.setTransform(-202.675,-39.45);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgQAAQgNAAgLAHQgKAHgFAMIAABzIgcAAIAAiiIAaAAIABAVQATgYAdAAQAzAAABA6IAABrg");
	this.shape_60.setTransform(-223.2,-37.775);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQATgOAiAAIAbAAIAAgNQAAgPgIgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAIgLAQgHQAOgGARAAQAcAAAQAOQAPAOABAYIAABKQABAXAFANIAAACIgdAAQgCgFgCgMQgUAUgZAAQgYAAgPgNgAgmAgQgBANAKAIQAIAHAOAAQAMAAALgHQANgGAEgLIAAgiIgVAAQgyAAAAAeg");
	this.shape_61.setTransform(-240.05,-37.625);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_62.setTransform(-255.175,-41.025);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgwA/QgUgWAAglIAAgEQAAgYAJgTQAKgTAQgKQARgLASAAQAgAAARAVQASAUAAAnIAAALIhtAAQABAYANAPQANAPAUAAQAOAAALgGQAKgGAIgKIARANQgVAfgpAAQgfAAgWgVgAgZgwQgLAMgEAWIBRAAIAAgCQgBgVgLgMQgJgLgSAAQgQAAgLAMg");
	this.shape_63.setTransform(-272.05,-37.625);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgOBtIAAjCIhGAAIAAgXICoAAIAAAXIhGAAIAADCg");
	this.shape_64.setTransform(-289.5,-40.425);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgMAMQgEgEAAgIQAAgGAEgEQAEgGAIAAQAJAAAEAGQAEAEAAAGQAAAIgEAEQgEAEgJABQgIgBgEgEg");
	this.shape_65.setTransform(-318.025,-31);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AhFBvIAAgUIBLhUQARgSAGgMQAHgMAAgNQAAgRgLgLQgKgLgQAAQgVAAgLAMQgMALAAAVIgcAAQAAgeAUgSQATgTAhAAQAdAAASAQQASAQAAAbQAAAggpAsIg6A/IBtAAIAAAXg");
	this.shape_66.setTransform(-330.375,-40.575);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgNBvIAAiiIAbAAIAACigAgLhTQgFgEAAgHQAAgHAFgEQAEgFAHAAQAIAAAFAFQADAEAAAHQAAAHgDAEQgFAFgIAAQgHAAgEgFg");
	this.shape_67.setTransform(417.4,-105.875);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgzBHQgPgOAAgVQAAgZAUgNQASgOAjAAIAbAAIAAgNQAAgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAJgLAOgHQAPgGARAAQAcAAAQAOQAPAOACAYIAABKQgBAXAGANIAAACIgdAAQgDgFgBgMQgTAUgbAAQgXAAgQgNgAgnAgQABANAIAIQAJAHAOAAQAMAAAMgHQAMgGAFgLIAAgiIgXAAQgyAAAAAeg");
	this.shape_68.setTransform(405.3,-102.925);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgxBEQgOgPAAgeIAAhpIAbAAIAABoQABAlAeAAQAeAAALgYIAAh1IAcAAIAACiIgbAAIAAgQQgQATgfAAQgZAAgOgPg");
	this.shape_69.setTransform(388.5,-102.775);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AggBNQgPgHgIgMQgIgMAAgPIAbAAQABAOAKAIQAKAJARAAQAQAAAJgHQAJgGAAgLQABgLgJgGQgJgHgTgEQgWgFgMgFQgMgGgGgJQgGgJAAgMQAAgUARgNQARgOAZAAQAbAAASAOQARAOAAAWIgcAAQAAgLgJgIQgKgIgPAAQgPAAgIAGQgJAHAAAKQABAKAHAGQAJAFAUAEQAUAFANAGQANAGAGAJQAHAJgBANQAAAWgRANQgSANgbAAQgTAAgPgHg");
	this.shape_70.setTransform(372.1,-102.925);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgwA/QgUgWAAglIAAgEQAAgYAJgTQAKgTAQgKQARgLASAAQAgAAARAVQASAUAAAnIAAALIhtAAQABAYANAPQANAPAUAAQAOAAALgGQAKgGAIgKIARANQgVAfgpAAQgfAAgWgVgAgZgwQgMAMgDAWIBRAAIAAgCQgBgVgKgMQgKgLgSAAQgQAAgLAMg");
	this.shape_71.setTransform(356.15,-102.925);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgfBNQgQgHgIgMQgIgMgBgPIAcAAQABAOAKAIQALAJAQAAQAPAAAKgHQAJgGAAgLQABgLgJgGQgIgHgUgEQgWgFgMgFQgNgGgFgJQgGgJAAgMQAAgUARgNQAQgOAaAAQAbAAASAOQARAOAAAWIgcAAQAAgLgKgIQgKgIgOAAQgOAAgJAGQgJAHABAKQAAAKAIAGQAHAFAVAEQAUAFANAGQANAGAHAJQAFAJAAANQAAAWgRANQgRANgcAAQgTAAgOgHg");
	this.shape_72.setTransform(339.9,-102.925);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AghBrQgSgHgIgNIAOgRQASAWAaAAQATAAAMgLQALgMAAgVIAAgNQgRATgcAAQgcAAgSgXQgRgXAAgnQAAgmARgWQASgXAcAAQAdAAARAVIABgSIAZAAIAACeQAAAfgSATQgTASgfAAQgRAAgQgIgAgchKQgMAPAAAfQAAAcALAPQAMAPATAAQAbAAAMgYIAAhJQgNgXgZAAQgUAAgLAQg");
	this.shape_73.setTransform(315.45,-99.875);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgQAAQgNAAgLAHQgKAHgFAMIAABzIgcAAIAAiiIAaAAIABAVQATgYAdAAQA0AAAAA6IAABrg");
	this.shape_74.setTransform(298.7,-103.075);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQAUgOAhAAIAbAAIAAgNQABgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAJgLAOgHQAPgGARAAQAcAAAQAOQAPAOACAYIAABKQgBAXAGANIAAACIgdAAQgDgFgBgMQgTAUgbAAQgXAAgPgNgAgnAgQABANAIAIQAJAHAOAAQAMAAAMgHQALgGAFgLIAAgiIgWAAQgyAAAAAeg");
	this.shape_75.setTransform(281.9,-102.925);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgxByIgKgCIAAgXIAHABQAOAAAIgGQAIgFAFgQIAHgRIg6ifIAeAAIAnB5IAmh5IAeAAIhBC6QgOApgiAAg");
	this.shape_76.setTransform(266.275,-99.65);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_77.setTransform(244.625,-106.325);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQAUgOAhAAIAbAAIAAgNQABgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAJgLAOgHQAPgGARAAQAcAAAQAOQAPAOACAYIAABKQgBAXAGANIAAACIgdAAQgDgFgBgMQgTAUgbAAQgXAAgPgNgAgnAgQABANAIAIQAJAHAOAAQAMAAAMgHQALgGAFgLIAAgiIgWAAQgyAAAAAeg");
	this.shape_78.setTransform(227.45,-102.925);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgEBbQgKgLAAgVIAAhkIgdAAIAAgVIAdAAIAAgoIAbAAIAAAoIAeAAIAAAVIgeAAIAABkQAAAKAEAFQAEAFAKAAIANgCIAAAXQgLACgKAAQgTAAgIgLg");
	this.shape_79.setTransform(213.625,-104.75);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("Ag1A9QgUgXAAgmIAAgBQAAgXAKgTQAJgUARgKQARgKAUAAQAhAAAUAXQAVAXAAAlIAAACQAAAYgJASQgJATgRALQgRAKgWAAQggAAgVgXgAghgsQgMAQAAAeQAAAbAMAQQANARAUAAQAVAAANgRQAMgRAAgdQABgagNgRQgNgQgVAAQgUAAgNAQg");
	this.shape_80.setTransform(200.3,-102.925);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_81.setTransform(184.725,-106.325);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgxBEQgOgPAAgeIAAhpIAcAAIAABoQAAAlAeAAQAfAAAKgYIAAh1IAcAAIAACiIgaAAIgBgQQgQATgfAAQgZAAgOgPg");
	this.shape_82.setTransform(159.85,-102.775);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgeCNIAAgWIANABQAJAAAFgFQAEgFAAgNIAAi1IAbAAIAAC1QAAAugpAAQgJAAgIgCgAAChzQgDgFAAgHQAAgGADgFQAFgFAIABQAIgBAEAFQAEAFAAAGQAAAHgEAFQgEAEgIAAQgJAAgEgEg");
	this.shape_83.setTransform(146.2,-102.6);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgxBEQgOgPAAgeIAAhpIAbAAIAABoQABAlAeAAQAeAAALgYIAAh1IAcAAIAACiIgbAAIAAgQQgQATgeAAQgaAAgOgPg");
	this.shape_84.setTransform(135.6,-102.775);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgRAAQgMAAgKAHQgKAHgGAMIAABzIgcAAIAAiiIAbAAIAAAVQATgYAdAAQA0AAAAA6IAABrg");
	this.shape_85.setTransform(118.75,-103.075);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgvA/QgVgWAAglIAAgEQAAgYAJgTQAKgTAQgKQAQgLATAAQAfAAATAVQARAUAAAnIAAALIhtAAQABAYANAPQANAPAUAAQAOAAALgGQAKgGAIgKIARANQgVAfgoAAQghAAgUgVgAgZgwQgLAMgDAWIBQAAIAAgCQgBgVgLgMQgJgLgSAAQgQAAgLAMg");
	this.shape_86.setTransform(102.2,-102.925);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("ABWBTIAAhrQAAgRgIgIQgIgJgTAAQgPAAgLAJQgKAJgBAQIAABrIgbAAIAAhqQAAgjgjAAQgbAAgKAXIAAB2IgcAAIAAiiIAaAAIABASQASgVAeAAQAiAAALAaQAJgLANgIQANgHASAAQA1AAABA5IAABsg");
	this.shape_87.setTransform(80.45,-103.075);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgRAAQgMAAgLAHQgJAHgGAMIAABzIgcAAIAAiiIAaAAIABAVQATgYAdAAQAzAAABA6IAABrg");
	this.shape_88.setTransform(50.95,-103.075);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQAUgOAhAAIAbAAIAAgNQAAgPgIgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAIgLAQgHQAOgGARAAQAcAAAQAOQAPAOABAYIAABKQABAXAFANIAAACIgdAAQgCgFgCgMQgUAUgaAAQgYAAgOgNgAgnAgQAAANAJAIQAJAHAOAAQAMAAALgHQANgGAEgLIAAgiIgVAAQgyAAgBAeg");
	this.shape_89.setTransform(34.1,-102.925);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AAnBRIgnh6IgmB6IgXAAIgvihIAcAAIAgB4IAmh4IAVAAIAnB7IAfh7IAcAAIgwChg");
	this.shape_90.setTransform(14.225,-102.925);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgvA/QgVgWAAglIAAgEQAAgYAJgTQAKgTAQgKQAQgLATAAQAfAAATAVQARAUAAAnIAAALIhtAAQABAYANAPQANAPAUAAQAOAAALgGQAKgGAIgKIARANQgVAfgoAAQghAAgUgVgAgZgwQgLAMgDAWIBQAAIAAgCQgBgVgLgMQgJgLgSAAQgQAAgLAMg");
	this.shape_91.setTransform(-5.35,-102.925);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AAkBzIAAhrQAAgRgIgIQgIgJgQAAQgNAAgLAIQgKAHgFALIAABzIgcAAIAAjlIAcAAIAABXQASgWAdAAQAzAAABA5IAABrg");
	this.shape_92.setTransform(-22.05,-106.325);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgmBTIAAiiIAbAAIAAATQANgWAZAAQAIAAAEACIAAAaIgNgBQgbAAgJAXIAABzg");
	this.shape_93.setTransform(-42.525,-103.075);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQATgOAiAAIAbAAIAAgNQAAgPgIgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAIgLAQgHQAOgGARAAQAcAAAQAOQAPAOABAYIAABKQABAXAFANIAAACIgdAAQgCgFgCgMQgUAUgZAAQgYAAgPgNgAgmAgQgBANAKAIQAIAHAOAAQAMAAALgHQANgGAEgLIAAgiIgVAAQgyAAAAAeg");
	this.shape_94.setTransform(-56.9,-102.925);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AgpBfIgBATIgaAAIAAjmIAcAAIAABWQARgVAcAAQAeAAARAXQARAWAAAmIAAACQAAAmgRAWQgRAXgdAAQgeAAgRgWgAgogCIAABGQANAZAbAAQATAAALgPQALgQAAgfQAAgcgLgPQgLgPgTAAQgcAAgMAZg");
	this.shape_95.setTransform(-73.525,-106.175);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("ABWBTIAAhrQAAgRgIgIQgIgJgSAAQgQAAgKAJQgLAJgCAQIAABrIgaAAIAAhqQAAgjgjAAQgbAAgLAXIAAB2IgbAAIAAiiIAaAAIABASQASgVAeAAQAiAAAMAaQAHgLANgIQAOgHARAAQA2AAABA5IAABsg");
	this.shape_96.setTransform(-96,-103.075);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQAUgOAhAAIAbAAIAAgNQABgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAJgLAOgHQAPgGARAAQAcAAAQAOQAPAOABAYIAABKQAAAXAGANIAAACIgdAAQgDgFgBgMQgUAUgaAAQgYAAgOgNgAgnAgQABANAIAIQAJAHAOAAQAMAAALgHQAMgGAFgLIAAgiIgVAAQgzAAAAAeg");
	this.shape_97.setTransform(-117.8,-102.925);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AgiBrQgQgHgKgNIAPgRQASAWAaAAQATAAALgLQAMgMAAgVIAAgNQgRATgcAAQgdAAgRgXQgSgXAAgnQAAgmASgWQARgXAdAAQAeAAAQAVIACgSIAYAAIAACeQAAAfgSATQgSASggAAQgRAAgRgIgAgchKQgMAPAAAfQAAAcAMAPQALAPATAAQAbAAAMgYIAAhJQgNgXgaAAQgTAAgLAQg");
	this.shape_98.setTransform(-135.15,-99.875);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_99.setTransform(-157.825,-106.325);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQAUgOAhAAIAbAAIAAgNQABgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAJgLAOgHQAPgGARAAQAcAAAQAOQAPAOABAYIAABKQAAAXAGANIAAACIgdAAQgDgFgBgMQgUAUgaAAQgYAAgOgNgAgnAgQABANAIAIQAJAHAOAAQAMAAALgHQAMgGAFgLIAAgiIgVAAQgzAAAAAeg");
	this.shape_100.setTransform(-174.95,-102.925);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AgEBbQgKgLAAgVIAAhkIgdAAIAAgVIAdAAIAAgoIAbAAIAAAoIAeAAIAAAVIgeAAIAABkQAAAKAEAFQAEAFAKAAIANgCIAAAXQgLACgKAAQgTAAgIgLg");
	this.shape_101.setTransform(-188.825,-104.75);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("Ag1A9QgUgXAAgmIAAgBQAAgXAJgTQAKgUARgKQAQgKAVAAQAhAAAUAXQAVAXAAAlIAAACQAAAYgJASQgJATgRALQgRAKgWAAQggAAgVgXgAgggsQgNAQAAAeQAAAbANAQQAMARAUAAQAVAAANgRQANgRAAgdQAAgagOgRQgMgQgVAAQgUAAgMAQg");
	this.shape_102.setTransform(-202.15,-102.925);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_103.setTransform(-217.675,-106.325);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AgiBrQgQgHgKgNIAPgRQASAWAaAAQATAAALgLQAMgMAAgVIAAgNQgRATgcAAQgdAAgRgXQgSgXAAgnQAAgmASgWQARgXAdAAQAeAAAQAVIACgSIAZAAIAACeQgBAfgSATQgSASggAAQgRAAgRgIgAgchKQgMAPAAAfQAAAcAMAPQALAPATAAQAbAAAMgYIAAhJQgNgXgaAAQgTAAgLAQg");
	this.shape_104.setTransform(-243.05,-99.875);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AgzBHQgPgOAAgVQAAgZAUgNQASgOAjAAIAbAAIAAgNQAAgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAIgLAPgHQAPgGARAAQAcAAAQAOQAQAOABAYIAABKQgBAXAGANIAAACIgdAAQgCgFgCgMQgTAUgaAAQgZAAgPgNgAgmAgQAAANAJAIQAIAHAOAAQAMAAAMgHQALgGAGgLIAAgiIgXAAQgyAAABAeg");
	this.shape_105.setTransform(-259.7,-102.925);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AgmBTIAAiiIAbAAIAAATQANgWAZAAQAIAAAEACIAAAaIgNgBQgbAAgJAXIAABzg");
	this.shape_106.setTransform(-272.425,-103.075);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AhOBtIAAjZIA+AAQAbAAAWAMQAWANAMAXQAMAXAAAfIAAANQAAAegMAYQgMAXgWAMQgWANgcAAgAgyBWIAfAAQAgAAATgVQASgVAAgmIAAgMQAAglgRgVQgRgVgfAAIgjAAg");
	this.shape_107.setTransform(-288.25,-105.725);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgMAMQgEgFAAgGQAAgHAEgFQAEgEAIAAQAJAAAEAEQAEAFAAAHQAAAGgEAFQgEAFgJgBQgIABgEgFg");
	this.shape_108.setTransform(-318.025,-96.3);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AAOBuIAAi4Ig3AVIAAgaIBOgeIAFAAIAADbg");
	this.shape_109.setTransform(-332.4,-105.8);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgJgJQgJgKgUAAQgaAAgNAXIAACnIhAAAIAAjtIA9AAIABAcQAZggArAAQAlAAATAWQASAWABAtIAACYg");
	this.shape_110.setTransform(209.8,-167.7);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgfCmIAAjtIA/AAIAADtgAgYhtQgKgJAAgOQgBgPAKgJQAKgJAPAAQAQAAAKAJQAKAJgBAPQABAOgKAJQgKAKgQAAQgPAAgJgKg");
	this.shape_111.setTransform(191.25,-172.175);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AhRBnQgYgUAAgfQAAgmAcgTQAcgUA0AAIAeAAIAAgOQAAgQgJgKQgJgKgQAAQgRAAgIAHQgKAIAAAOIg/AAQgBgVANgSQANgRAXgKQAYgKAcAAQArAAAbAWQAZAWAAAoIAABmQAAAiAKARIAAAEIhAAAQgFgJgCgNQgXAagkAAQgjAAgWgUgAgpAsIAAADQAAAMAIAIQAIAIAPAAQANAAAMgHQAMgGAGgKIAAgpIgYAAQgvAAgDAhg");
	this.shape_112.setTransform(173.2,-167.475);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("ABqB5IAAiWQAAgVgHgJQgIgKgUAAQgdAAgLAcIAACiIg+AAIAAiWQAAgVgIgJQgIgKgUAAQgbABgMAWIAACnIg/AAIAAjtIA7AAIACAbQAZgfArAAQAtAAARAlQAZglAvAAQAmAAATAWQATAXAAAuIAACWg");
	this.shape_113.setTransform(141.725,-167.7);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AhCB5IAAjtIA8AAIABAdQATghAhAAQALAAAJADIgBA9QgNgCgJAAQglAAgKAYIAACbg");
	this.shape_114.setTransform(114.95,-167.7);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AhKBbQghggAAg1IAAgGQAAgjAOgcQAOgdAZgPQAZgPAgAAQAxAAAcAfQAcAeAAA5IAAAZIiXAAQADAXAQAOQAPAOAXAAQAlAAAUgbIAgAjQgPAVgYALQgYALgeAAQgzAAghgggAgbg6QgMANgDAXIBXAAIAAgFQAAgVgLgLQgLgMgUAAQgSAAgMANg");
	this.shape_115.setTransform(93.925,-167.475);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("Ah2CgIAAk/IBwAAQA5AAAfAWQAeAXAAArQAAAXgMASQgNASgVAIQAZAFAOATQAOATAAAbQAAAugeAYQgdAXg2ABgAg0BrIA4AAQAXAAANgLQANgLAAgUQAAgsgtAAIg8AAgAg0gZIAxAAQAxgBAAgnQAAgVgNgKQgNgKgaAAIguAAg");
	this.shape_116.setTransform(67.475,-171.575);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AAlCoIg8hfIgWAXIAABIIhAAAIAAlPIBAAAIAAC5IALgPIA8hHIBMAAIhVBiIBdCKg");
	this.shape_117.setTransform(31.1,-172.45);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AhRBjQgUgWAAgrIAAiaIA/AAIAACZQAAAlAhAAQAgAAAMgXIAAinIA/AAIAADsIg7AAIgCgYQgYAdgoAAQgmAAgUgWg");
	this.shape_118.setTransform(5,-167.25);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("Ag5DSIAAgyQAMACAIAAQAeAAAAgfIAAj6IA+AAIAAD6QAAAngVAWQgVAWgmAAQgRAAgPgEgAgDidQgKgJAAgOQAAgPAKgJQAIgJARAAQARAAAJAJQAJAJAAAPQAAAOgJAJQgKAKgQAAQgQAAgJgKg");
	this.shape_119.setTransform(-15.65,-167.375);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgIgJQgJgKgVAAQgZAAgOAXIAACnIhAAAIAAjtIA9AAIABAcQAZggArAAQAlAAATAWQASAWABAtIAACYg");
	this.shape_120.setTransform(-31.95,-167.7);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AhRBjQgUgWgBgrIAAiaIBAAAIAACZQAAAlAiAAQAfAAAMgXIAAinIBAAAIAADsIg8AAIgCgYQgYAdgoAAQgmAAgUgWg");
	this.shape_121.setTransform(-57.15,-167.25);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AgjBTIAAh/IgjAAIAAgvIAjAAIAAg6IA/AAIAAA6IAoAAIAAAvIgoAAIAAB1QAAANAFAGQAFAGAOAAQAKAAAJgCIAAAwQgTAGgUAAQhCAAgBhDg");
	this.shape_122.setTransform(-77.575,-170.175);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AhKBbQghggAAg1IAAgGQAAgjAOgcQAOgdAZgPQAZgPAgAAQAxAAAcAfQAcAeAAA5IAAAZIiXAAQADAXAQAOQAPAOAXAAQAlAAAUgbIAgAjQgPAVgYALQgYALgeAAQgzAAghgggAgbg6QgMANgDAXIBXAAIAAgFQAAgVgLgLQgLgMgUAAQgSAAgMANg");
	this.shape_123.setTransform(-96.725,-167.475);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("Ah6CgIAAk/IB8AAQAkAAAbANQAcANAPAZQAOAYAAAfQAAAvgfAaQghAbg5AAIg4AAIAABxgAg3gFIA5AAQAbAAANgNQAOgMAAgXQAAgXgOgPQgOgOgYgBIg7AAg");
	this.shape_124.setTransform(-123,-171.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_2
	this.instance_1 = new lib.Tween7("synched",0);
	this.instance_1.setTransform(42.25,-40.25);
	this.instance_1.alpha = 0;

	this.instance_2 = new lib.Tween8("synched",0);
	this.instance_2.setTransform(42.25,-40.25);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true,alpha:1},12).to({_off:false,alpha:0},12).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:false},12).to({_off:true,alpha:0},12).wait(1));

	// Layer_3
	this.cobaBG = new lib.Tween10();
	this.cobaBG.name = "cobaBG";
	this.cobaBG.setTransform(43.75,-42.75,1.1855,0.9051,0,0,0,0.2,-0.1);
	this.cobaBG.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.cobaBG).to({alpha:0.75},12).to({alpha:0},12).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-436.6,-314.2,960.2,543.1);


(lib.materi = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		var _this = this;
		
		_this.stop();
	}
	this.frame_12 = function() {
		var root1 = this;
		var pieces1 = root1.pieces1;
		var slots1 = root1.slots1;
		var restart1 = root1.restart1;
		var winMessage1 = root1.winMessage1;
		var Score1 = root1.Score1;
		var positions1 = [];
		
		root1.stop();
		
		root1.stop();
		
		root1.cobaBG.on("click", function () {
		  root1.shuffle();
		  root1.play();
		});
		
		root1.exit.on("click", function () {
		  root1.shuffle();
		  root1.play();
		});
		
		//#34495e
		
		// root1.pGam1.gotoAndStop(0);
		
		// root1.pieces1.laut.on("dblclick", function () {
		//   root1.pGam1.gotoAndPlay(0);
		// });
		
		// root1.pp3.gotoAndStop(0);
		
		// root1.pieces1.tana.on("dblclick", function () {
		//   root1.pp3.gotoAndPlay(0);
		// });
		
		// root1.pp4.gotoAndStop(0);
		
		// root1.pieces1.tana1.on("dblclick", function () {
		//   root1.pp4.gotoAndPlay(0);
		// });
		
		// root1.pp5.gotoAndStop(0);
		
		// root1.pieces1.laut1.on("dblclick", function () {
		//   root1.pp5.gotoAndPlay(0);
		// });
		
		// root1.pp6.gotoAndStop(0);
		
		// root1.pieces1.laut2.on("dblclick", function () {
		//   root1.pp6.gotoAndPlay(0);
		// });
		
		// root1.pp7.gotoAndStop(0);
		
		// root1.pieces1.laut3.on("dblclick", function () {
		//   root1.pp7.gotoAndPlay(0);
		// });
		
		// root1.pp8.gotoAndStop(0);
		
		// root1.pieces1.laut4.on("dblclick", function () {
		//   root1.pp8.gotoAndPlay(0);
		// });
		
		root1.pp1.gotoAndStop(0);
		
		root1.g3.on("click", function () {
		  root1.pp1.gotoAndPlay(0);
		});
		
		root1.pp2.gotoAndStop(0);
		
		root1.g2.on("click", function () {
		  root1.pp2.gotoAndPlay(0);
		});
		
		root1.pp3.gotoAndStop(0);
		
		root1.g1.on("click", function () {
		  root1.pp3.gotoAndPlay(0);
		});
		
		root1.setup = function () {
		  document.body.style.backgroundColor = lib.properties.color;
		  createjs.Touch.enable(stage);
		  stage.mouseMoveOutside = true;
		  root1.drawStart = stage.on("drawstart", root1.start, null, true);
		};
		
		root1.start = function (e) {
		  stage.off("drawstart", root1.drawStart);
		  winMessage1.originalY = winMessage1.y;
		  pieces1.children.forEach(function (child, index) {
		    positions1[index] = { x: child.x, y: child.y };
		  });
		
		  slots1.children.forEach(function (child, index) {
		    child.mouseChildren = false;
		  });
		
		  root1.restart1Handler(null);
		  restart1.on("click", root1.restart1Handler);
		  pieces1.on("mousedown", root1.mouseDownHandler);
		};
		
		root1.restart1Handler = function (e) {
		  pieces1.skor = 0;
		  pieces1.count = 0;
		  winMessage1.text = "";
		  root1.shuffle();
		};
		
		root1.mouseDownHandler = function (e) {
		  winMessage1.text = "Ayo, Letakkan pada kotak yang sesuai!";
		  winMessage1.alpha = 0;
		  winMessage1.y = winMessage1.originalY + 60;
		  createjs.Tween.get(winMessage1).to(
		    { alpha: 1, y: winMessage1.originalY },
		    500,
		    createjs.Ease.backInOut
		  );
		  e.currentTarget.setChildIndex(e.target, e.currentTarget.children.length - 1);
		  e.target.offsetX = e.stageX / stage.scaleX - e.target.x;
		  e.target.offsetY = e.stageY / stage.scaleY - e.target.y;
		  pieces1.target = e.target;
		  root1.stageMouseMove = stage.on(
		    "stagemousemove",
		    root1.stageMouseMoveHandler
		  );
		  root1.stageMouseUp = stage.on("stagemouseup", root1.stageMouseUpHandler);
		};
		
		root1.stageMouseMoveHandler = function (e) {
		  if (pieces1.target) {
		    pieces1.target.x = e.stageX / stage.scaleX - pieces1.target.offsetX;
		    pieces1.target.y = e.stageY / stage.scaleY - pieces1.target.offsetY;
		  }
		};
		
		root1.stageMouseUpHandler = function (e) {
		  stage.off("stagemousemove", root1.stageMouseMove);
		  stage.off("stagemouseup", root1.stageMouseUp);
		
		  if (pieces1.target) {
		    root1.check();
		    pieces1.target = null;
		  }
		};
		
		root1.shuffle = function () {
		  Score1.text = "score1";
		  positions1.sort(function (a, b) {
		    return 0.5 - Math.random();
		  });
		
		  pieces1.children.forEach(function (child, index) {
		    child.originalX = positions1[index].x;
		    child.originalY = positions1[index].y;
		    child.mouseEnabled = true;
		    createjs.Tween.get(child).to(
		      { x: child.originalX, y: child.originalY },
		      350,
		      createjs.Ease.backInOut
		    );
		  });
		};
		
		root1.check = function () {
		  var spot = slots1.getObjectUnderPoint(pieces1.target.x, pieces1.target.y);
		
		  if (!spot) {
		    root1.onMiss();
		    return;
		  }
		
		  root1.slot = spot.parent;
		
		  if (root1.slot) {
		    if (
		      pieces1.target.name.substring(0, 4) === root1.slot.name.substring(0, 4)
		    ) {
		      root1.letakin();
		      root1.onMatch();
		    } else {
		      root1.letakin();
		      root1.salahJawab();
		    }
		    if (pieces1.count === pieces1.children.length) root1.onWin();
		
		    root1.slot = null;
		  } else root1.onMiss();
		};
		
		root1.letakin = function () {
		  pieces1.target.mouseEnabled = false;
		  pieces1.count++;
		  console.log(pieces1.target);
		
		  createjs.Tween.get(pieces1.target).to(
		    { x: root1.slots1.kotakKartu2.x, y: root1.slots1.kotakKartu2.y },
		    350,
		    createjs.Ease.backInOut
		  );
		};
		
		root1.salahJawab = function () {
		  winMessage1.text = "Hemm, sepertinya Tebakan Anda Salah";
		  winMessage1.alpha = 0;
		  winMessage1.y = winMessage1.originalY + 60;
		  createjs.Tween.get(winMessage1).to(
		    { alpha: 1, y: winMessage1.originalY },
		    500,
		    createjs.Ease.backInOut
		  );
		};
		
		root1.onMatch = function () {
		  winMessage1.text = "Selamat! Tebakan Anda Benar!";
		  pieces1.skor++;
		  Score1.text = pieces1.skor * 25;
		  winMessage1.alpha = 0;
		  winMessage1.y = winMessage1.originalY + 60;
		  createjs.Tween.get(winMessage1).to(
		    { alpha: 1, y: winMessage1.originalY },
		    500,
		    createjs.Ease.backInOut
		  );
		};
		
		root1.onWin = function () {
		  winMessage1.text = "Yey!, Anda Berhasil Menyelesaikan Tantangan. Selamat!";
		  winMessage1.alpha = 0;
		  winMessage1.y = winMessage1.originalY + 60;
		  createjs.Tween.get(winMessage1).to(
		    { alpha: 1, y: winMessage1.originalY },
		    500,
		    createjs.Ease.backInOut
		  );
		};
		
		root1.onMiss = function () {
		  createjs.Tween.get(pieces1.target).to(
		    { x: pieces1.target.originalX, y: pieces1.target.originalY },
		    350,
		    createjs.Ease.backInOut
		  );
		  winMessage1.text = "Silahkan letakkan pada kotak yang sesuai ya..";
		  winMessage1.alpha = 0;
		  winMessage1.y = winMessage1.originalY + 60;
		  createjs.Tween.get(winMessage1).to(
		    { alpha: 1, y: winMessage1.originalY },
		    500,
		    createjs.Ease.backInOut
		  );
		};
		
		root1.setup();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(12).call(this.frame_12).wait(13));

	// pp3
	this.pp3 = new lib.pp3();
	this.pp3.name = "pp3";
	this.pp3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.pp3).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// pp2
	this.pp2 = new lib.pp2();
	this.pp2.name = "pp2";
	this.pp2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.pp2).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// pp1
	this.pp1 = new lib.pp1();
	this.pp1.name = "pp1";
	this.pp1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.pp1).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_5
	this.instance = new lib.teksinfo();
	this.instance.setTransform(28.05,21.2);

	this.exit = new lib.btnEit_1();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_6
	this.Score1 = new cjs.Text("score", "18px 'Roboto'", "#FFFFFF");
	this.Score1.name = "Score1";
	this.Score1.textAlign = "center";
	this.Score1.lineHeight = 26;
	this.Score1.lineWidth = 46;
	this.Score1.parent = this;
	this.Score1.setTransform(348.543,-257.1,1.9238,1.9238);
	this.Score1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.Score1).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_4
	this.restart1 = new lib.Restart();
	this.restart1.name = "restart1";
	this.restart1.setTransform(52.9,-183.15,0.7541,0.7541);
	this.restart1.shadow = new cjs.Shadow("rgba(0,0,0,1)",3,3,12);
	new cjs.ButtonHelper(this.restart1, 0, 1, 2, false, new lib.Restart(), 3);

	this.winMessage1 = new cjs.Text("Sepertinya Tebakan Anda Salah, Silahkan Coba Lagi", "17px 'Roboto'");
	this.winMessage1.name = "winMessage1";
	this.winMessage1.textAlign = "center";
	this.winMessage1.lineHeight = 22;
	this.winMessage1.lineWidth = 418;
	this.winMessage1.parent = this;
	this.winMessage1.setTransform(70.45,-161.1);

	this.pieces1 = new lib.Pieces1();
	this.pieces1.name = "pieces1";
	this.pieces1.setTransform(-125.45,-48.15,0.8714,0.8714);

	this.slots1 = new lib.Slots1();
	this.slots1.name = "slots1";
	this.slots1.setTransform(-125.45,-48.15,0.8714,0.8714);

	this.g3 = new lib.g3();
	this.g3.name = "g3";
	this.g3.setTransform(-23.7,-60.15);
	this.g3.shadow = new cjs.Shadow("rgba(0,0,0,1)",2,2,11);

	this.g2 = new lib.g2();
	this.g2.name = "g2";
	this.g2.setTransform(-146.7,-60.15);
	this.g2.shadow = new cjs.Shadow("rgba(0,0,0,1)",2,2,11);

	this.g1 = new lib.g1();
	this.g1.name = "g1";
	this.g1.setTransform(-270.35,-60.15);
	this.g1.shadow = new cjs.Shadow("rgba(0,0,0,1)",0,0,10);

	this.drag2G1 = new lib.drag7G8();
	this.drag2G1.name = "drag2G1";
	this.drag2G1.setTransform(-239.65,27.6,1.0649,1.0649,0,0,0,82.2,26.7);
	new cjs.ButtonHelper(this.drag2G1, 0, 1, 1);

	this.drag2G1_1 = new lib.drag7G7();
	this.drag2G1_1.name = "drag2G1_1";
	this.drag2G1_1.setTransform(-239.65,-103.05,1.0649,1.0649,0,0,0,82.2,26.7);
	new cjs.ButtonHelper(this.drag2G1_1, 0, 1, 1);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgfCmIAAjtIA/AAIAADtgAgYhtQgLgJABgOQAAgPAJgJQAKgJAPAAQAQAAAKAJQAKAJAAAPQAAAOgKAJQgKAKgQAAQgPAAgJgKg");
	this.shape.setTransform(101.9,-244.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhCB5IAAjsIA8AAIACAcQARghAjAAQAKAAAJADIAAA9QgNgCgLAAQgjAAgLAZIAACag");
	this.shape_1.setTransform(88.65,-239.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AhKBbQghggAAg1IAAgGQAAgjAOgcQAOgdAZgPQAZgPAgAAQAxAAAcAfQAcAeAAA5IAAAZIiXAAQADAXAQAOQAPAOAXAAQAlAAAUgbIAgAjQgPAVgYALQgYALgeAAQgzAAghgggAgbg6QgMANgDAXIBXAAIAAgFQAAgVgLgLQgLgMgUAAQgSAAgMANg");
	this.shape_2.setTransform(67.625,-239.525);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgjBTIAAh/IgjAAIAAgvIAjAAIAAg6IA/AAIAAA6IAoAAIAAAvIgoAAIAAB1QAAANAFAGQAFAGAOAAQAKAAAJgCIAAAwQgTAGgUAAQhCAAgBhDg");
	this.shape_3.setTransform(47.375,-242.225);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AhSBnQgWgUAAgfQAAgmAbgTQAcgUA1AAIAcAAIAAgOQAAgQgIgKQgIgKgSAAQgQAAgIAHQgKAIAAAOIhAAAQAAgVAOgSQAMgRAYgKQAXgKAcAAQAsAAAZAWQAaAWAAAoIAABmQABAiAIARIAAAEIhAAAQgEgJgCgNQgXAagkAAQgiAAgYgUgAgpAsIAAADQAAAMAIAIQAJAIAOAAQANAAAMgHQAMgGAFgKIAAgpIgXAAQgvAAgDAhg");
	this.shape_4.setTransform(28,-239.525);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("ABmCgIAAhYIAHiVIhXDtIgsAAIhWjtIAHCVIAABYIhCAAIAAk/IBWAAIBRDnIBSjnIBWAAIAAE/g");
	this.shape_5.setTransform(-3.775,-243.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.drag2G1_1},{t:this.drag2G1},{t:this.g1},{t:this.g2},{t:this.g3},{t:this.slots1},{t:this.pieces1},{t:this.winMessage1},{t:this.restart1}]},12).to({state:[]},1).wait(12));

	// Layer_8
	this.instance_1 = new lib.Tween8("synched",0);
	this.instance_1.setTransform(-148.3,-60.15,0.458,0.2157,0,0,0,-0.1,0);

	this.instance_2 = new lib.bg2();
	this.instance_2.setTransform(42.25,-18.75);
	this.instance_2.shadow = new cjs.Shadow("rgba(0,0,0,1)",2,2,11);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2},{t:this.instance_1}]},12).to({state:[]},1).wait(12));

	// Layer_2
	this.instance_3 = new lib.Tween7("synched",0);
	this.instance_3.setTransform(42.25,-40.25);
	this.instance_3.alpha = 0;

	this.instance_4 = new lib.Tween8("synched",0);
	this.instance_4.setTransform(42.25,-40.25);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({_off:true,alpha:1},12).to({_off:false,alpha:0},12).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({_off:false},12).to({_off:true,alpha:0},12).wait(1));

	// Layer_3
	this.cobaBG = new lib.Tween10();
	this.cobaBG.name = "cobaBG";
	this.cobaBG.setTransform(43.75,-42.75,1.1855,0.9051,0,0,0,0.2,-0.1);
	this.cobaBG.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.cobaBG).to({alpha:0.75},12).to({alpha:0},12).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-436.6,-314.2,960.2,543.1);


// stage content:
(lib.game10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.clearAllSoundStreams();
		 
		var root = this;
		
		root.btnMenuDasar1.on("click", function () {
		  window.location.replace("../menu/index.html");
		});
		
		root.btnNextDasar1.on("click", function () {
		  window.location.replace("../game11/index.html");
		});
		
		root.btnBack3.on("click", function () {
		  window.location.replace("../game9/index.html");
		});
		
		//#34495e
		var root = this;
		var pieces = root.pieces;
		var slots = root.slots;
		var restart = root.restart;
		var winMessage = root.winMessage;
		var Score = root.Score;
		var positions1 = [];
		
		root.stop();
		
		
		
		//#34495e
		
		// root.pGam1.gotoAndStop(0);
		
		// root.pieces.laut.on("dblclick", function () {
		//   root.pGam1.gotoAndPlay(0);
		// });
		
		// root.pp3.gotoAndStop(0);
		
		// root.pieces.tana.on("dblclick", function () {
		//   root.pp3.gotoAndPlay(0);
		// });
		
		// root.pp4.gotoAndStop(0);
		
		// root.pieces.tana1.on("dblclick", function () {
		//   root.pp4.gotoAndPlay(0);
		// });
		
		// root.pp5.gotoAndStop(0);
		
		// root.pieces.laut1.on("dblclick", function () {
		//   root.pp5.gotoAndPlay(0);
		// });
		
		// root.pp6.gotoAndStop(0);
		
		// root.pieces.laut2.on("dblclick", function () {
		//   root.pp6.gotoAndPlay(0);
		// });
		
		// root.pp7.gotoAndStop(0);
		
		// root.pieces.laut3.on("dblclick", function () {
		//   root.pp7.gotoAndPlay(0);
		// });
		
		// root.pp8.gotoAndStop(0);
		
		// root.pieces.laut4.on("dblclick", function () {
		//   root.pp8.gotoAndPlay(0);
		// });
		
		// root.pp9.gotoAndStop(0);
		
		// root.pieces.laut5.on("dblclick", function () {
		//   root.pp9.gotoAndPlay(0);
		// });
		
		// root.pp10.gotoAndStop(0);
		
		// root.pieces.laut6.on("dblclick", function () {
		//   root.pp10.gotoAndPlay(0);
		// });
		
		// root.pp11.gotoAndStop(0);
		
		// root.pieces.laut7.on("dblclick", function () {
		//   root.pp11.gotoAndPlay(0);
		// });
		
		root.popUpInfo.gotoAndStop(0);
		
		root.btnInfo.on("click", function () {
		  root.popUpInfo.gotoAndPlay(0);
		});
		
		root.popUpMateri.gotoAndStop(0);
		
		root.materiBtn.on("click", function () {
		  root.popUpMateri.gotoAndPlay(0);
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
		    positions1[index] = { x: child.x, y: child.y };
		  });
		
		  slots.children.forEach(function (child, index) {
		    child.mouseChildren = false;
		  });
		
		  root.restartHandler(null);
		  restart.on("click", root.restartHandler);
		  pieces.on("mousedown", root.mouseDownHandler);
		};
		
		root.restartHandler = function (e) {
		  pieces.skor = 0;
		  pieces.count = 0;
		  winMessage.text = "";
		  root.shuffle();
		};
		
		root.mouseDownHandler = function (e) {
		  winMessage.text = "Ayo, Letakkan pada kotak yang sesuai!";
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
		  positions1.sort(function (a, b) {
		    return 0.5 - Math.random();
		  });
		
		  pieces.children.forEach(function (child, index) {
		    child.originalX = positions1[index].x;
		    child.originalY = positions1[index].y;
		    child.mouseEnabled = true;
		    createjs.Tween.get(child).to(
		      { x: child.originalX, y: child.originalY },
		      350,
		      createjs.Ease.backInOut
		    );
		  });
		};
		
		root.check = function () {
		  var spot = slots.getObjectUnderPoint(pieces.target.x, pieces.target.y);
		
		  if (!spot) {
		    root.onMiss();
		    return;
		  }
		
		  root.slot = spot.parent;
		
		  if (root.slot) {
		    if (pieces.target.name.substring(0, 4) === root.slot.name.substring(0, 4)) {
		      root.letakin();
		      root.onMatch();
		    } else {
		      root.letakin();
		      root.salahJawab();
		    }
		    if (pieces.count === pieces.children.length) root.onWin();
		
		    root.slot = null;
		  } else root.onMiss();
		};
		
		root.letakin = function () {
		  pieces.target.mouseEnabled = false;
		  pieces.count++;
		  createjs.Tween.get(pieces.target).to(
		    { x: root.slots.kotakKartu2.x, y: root.slots.kotakKartu2.y },
		    350,
		    createjs.Ease.backInOut
		  );
		};
		
		root.salahJawab = function () {
		  winMessage.text = "Hemm, sepertinya Tebakan Anda Salah";
		  winMessage.alpha = 0;
		  winMessage.y = winMessage.originalY + 60;
		  createjs.Tween.get(winMessage).to(
		    { alpha: 1, y: winMessage.originalY },
		    500,
		    createjs.Ease.backInOut
		  );
		};
		
		root.onMatch = function () {
		  winMessage.text = "Selamat! Tebakan Anda Benar!";
		  pieces.skor++;
		  Score.text = pieces.skor * 20;
		  winMessage.alpha = 0;
		  winMessage.y = winMessage.originalY + 60;
		  createjs.Tween.get(winMessage).to(
		    { alpha: 1, y: winMessage.originalY },
		    500,
		    createjs.Ease.backInOut
		  );
		};
		
		root.onWin = function () {
		  winMessage.text = "Yey!, Anda Berhasil Menyelesaikan Tantangan. Selamat!";
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
		  winMessage.text = "Silahkan letakkan pada kotak yang sesuai ya..";
		  winMessage.alpha = 0;
		  winMessage.y = winMessage.originalY + 60;
		  createjs.Tween.get(winMessage).to(
		    { alpha: 1, y: winMessage.originalY },
		    500,
		    createjs.Ease.backInOut
		  );
		};
		
		root.setup();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// code
	this.popUpInfo = new lib.popUpInfo();
	this.popUpInfo.name = "popUpInfo";
	this.popUpInfo.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.popUpInfo).wait(1));

	// materi
	this.popUpMateri = new lib.materi();
	this.popUpMateri.name = "popUpMateri";
	this.popUpMateri.setTransform(436.6,314.2);

	this.timeline.addTween(cjs.Tween.get(this.popUpMateri).wait(1));

	// base
	this.instance = new lib.text2();
	this.instance.setTransform(670.45,167.3);

	this.instance_1 = new lib.teksPenunjuk();
	this.instance_1.setTransform(406.8,362.25);

	this.materiBtn = new lib.materiBtn();
	this.materiBtn.name = "materiBtn";
	this.materiBtn.setTransform(557.1,169.05,0.6435,0.6435,0,0,0,0.1,0);
	new cjs.ButtonHelper(this.materiBtn, 0, 1, 2, false, new lib.materiBtn(), 3);

	this.btnInfo = new lib.btnInfo();
	this.btnInfo.name = "btnInfo";
	this.btnInfo.setTransform(385.5,169.05,0.6435,0.6435,0,0,0,0.1,0);
	new cjs.ButtonHelper(this.btnInfo, 0, 1, 2, false, new lib.btnInfo(), 3);

	this.restart = new lib.Restart();
	this.restart.name = "restart";
	this.restart.setTransform(465.9,167.85,0.7541,0.7541);
	new cjs.ButtonHelper(this.restart, 0, 1, 2, false, new lib.Restart(), 3);

	this.Score = new cjs.Text("score", "18px 'Roboto'", "#FFFFFF");
	this.Score.name = "Score";
	this.Score.textAlign = "center";
	this.Score.lineHeight = 26;
	this.Score.lineWidth = 46;
	this.Score.parent = this;
	this.Score.setTransform(859.343,25.15,1.9238,1.9238);

	this.judulKI = new lib.bg1();
	this.judulKI.name = "judulKI";
	this.judulKI.setTransform(867.8,38,0.4108,0.8628,0,0,0,0.4,0.4);
	this.judulKI.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);

	this.pieces = new lib.Pieces9();
	this.pieces.name = "pieces";

	this.slots = new lib.Slots9();
	this.slots.name = "slots";

	this.winMessage = new cjs.Text("Sepertinya Tebakan Anda Salah, Silahkan Coba Lagi", "17px 'Roboto'", "#FFFFFF");
	this.winMessage.name = "winMessage";
	this.winMessage.textAlign = "center";
	this.winMessage.lineHeight = 22;
	this.winMessage.lineWidth = 418;
	this.winMessage.parent = this;
	this.winMessage.setTransform(476,189);

	this.btnBack3 = new lib.btnKIBack();
	this.btnBack3.name = "btnBack3";
	this.btnBack3.setTransform(749,508.25);
	new cjs.ButtonHelper(this.btnBack3, 0, 1, 2, false, new lib.btnKIBack(), 3);

	this.btnMenuDasar1 = new lib.btnMenuKI();
	this.btnMenuDasar1.name = "btnMenuDasar1";
	this.btnMenuDasar1.setTransform(616.75,508.25);
	new cjs.ButtonHelper(this.btnMenuDasar1, 0, 1, 2, false, new lib.btnMenuKI(), 3);

	this.btnNextDasar1 = new lib.btnKINext();
	this.btnNextDasar1.name = "btnNextDasar1";
	this.btnNextDasar1.setTransform(878.8,508.25);
	new cjs.ButtonHelper(this.btnNextDasar1, 0, 1, 2, false, new lib.btnKINext(), 3);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AABAPQAIgLAAgMIAAgNIARAAIAAAMQgBAJgEAHQgEAJgHAGgAgZAPQAIgLAAgMIAAgNIARAAIAAAMQgBAJgEAHQgEAJgHAGg");
	this.shape.setTransform(746.425,110.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAFAAACADQADACAAAEQAAAEgDADQgCADgFAAQgEAAgCgDg");
	this.shape_1.setTransform(741.15,115.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgKgFgFQgEgEgKAAQgHAAgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAAMQALgPARAAQAeABAAAhIAAA+g");
	this.shape_2.setTransform(733.975,116.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAEAAADADQADACAAAEQAAAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_3.setTransform(726.85,115.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgDAAgHQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgEgDgEQgEgGAAgHQAAgLAKgJQAKgHAPgBQAQAAAKAJQAKAIAAAOIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAHQgKAIgQAAQgKABgJgFg");
	this.shape_4.setTransform(715.525,116.85);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_5.setTransform(705.975,116.85);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_6.setTransform(698.925,114.85);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgbAlQgNgNAAgWIAAgCQAAgNAGgMQAGgLAJgGQAKgHAKAAQATAAAKANQALAMgBAXIAAAFIg/AAQAAAOAIAKQAIAIALAAQAJAAAFgEQAGgDAFgGIAKAIQgMASgYAAQgSAAgMgMgAgPgcQgGAIgCANIAvAAIAAgCQgBgMgFgHQgHgHgKAAQgIAAgIAHg");
	this.shape_7.setTransform(692.05,116.85);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_8.setTransform(683.275,114.85);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAzAwIAAg+QAAgKgFgFQgFgEgLAAQgJAAgGAFQgGAFgBAJIAAA+IgPAAIAAg9QAAgVgUABQgQAAgGANIAABEIgRAAIAAhdIAQAAIAAAKQALgNASAAQATAAAHAQQAEgHAIgEQAIgFAKAAQAfAAABAiIAAA+g");
	this.shape_9.setTransform(665.725,116.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_10.setTransform(652.925,116.85);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_11.setTransform(645.875,114.85);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_12.setTransform(638.775,116.85);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgcA3QgLgOAAgVIAAgCQAAgUAKgOQAKgOASAAQAPAAAKAMIAAgyIAQAAIAACGIgPAAIAAgKQgLAMgQAAQgRAAgJgNgAgQgGQgHAIAAASQAAAQAHAKQAGAIALABQAQgBAHgOIAAgqQgHgNgQAAQgLgBgGAKg");
	this.shape_13.setTransform(628.6,114.95);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgDAAgHQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgEgDgEQgEgGAAgHQAAgLAKgJQAKgHAPgBQAQAAAKAJQAKAIAAAOIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAHQgKAIgQAAQgKABgJgFg");
	this.shape_14.setTransform(614.625,116.85);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgbAlQgMgNAAgWIAAgCQgBgNAGgMQAGgLAJgGQAKgHAKAAQATAAAKANQALAMAAAXIAAAFIhAAAQAAAOAIAKQAIAIALAAQAJAAAFgEQAGgDAFgGIAKAIQgMASgYAAQgSAAgMgMgAgPgcQgGAIgCANIAvAAIAAgCQgBgMgGgHQgGgHgKAAQgIAAgIAHg");
	this.shape_15.setTransform(605.3,116.85);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_16.setTransform(598.3,115.125);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgDAAgHQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgEgDgEQgEgGAAgHQAAgLAKgJQAKgHAPgBQAQAAAKAJQAKAIAAAOIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAHQgKAIgQAAQgKABgJgFg");
	this.shape_17.setTransform(591.425,116.85);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgbAlQgMgNAAgWIAAgCQgBgNAGgMQAFgLAKgGQAKgHAKAAQATAAAKANQALAMAAAXIAAAFIhAAAQAAAOAIAKQAIAIALAAQAJAAAFgEQAHgDAEgGIAKAIQgMASgXAAQgTAAgMgMgAgOgcQgHAIgBANIAuAAIAAgCQAAgMgHgHQgFgHgLAAQgJAAgGAHg");
	this.shape_18.setTransform(582.1,116.85);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgnBDIAAiDIAPAAIABALQAKgNAQAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgJANgRAAQgRAAgKgLIAAAugAgXgnIAAAtQAIANAOAAQALAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgOAAgIANg");
	this.shape_19.setTransform(572.4,118.575);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgDAAgHQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgEgDgEQgEgGAAgHQAAgLAKgJQAKgHAPgBQAQAAAKAJQAKAIAAAOIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAHQgKAIgQAAQgKABgJgFg");
	this.shape_20.setTransform(562.475,116.85);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgKgFgFQgEgEgKAAQgHAAgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAAMQALgPARAAQAeABAAAhIAAA+g");
	this.shape_21.setTransform(548.425,116.75);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_22.setTransform(538.525,116.85);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_23.setTransform(529.725,114.85);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_24.setTransform(519.625,116.85);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgnBDIAAiDIAOAAIABALQALgNAQAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgJANgSAAQgQAAgKgLIAAAugAgXgnIAAAtQAHANAQAAQAKAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgPAAgHANg");
	this.shape_25.setTransform(509.9,118.575);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgdAnQgHgIAAgSIAAg8IAPAAIAAA8QAAAVASABQASgBAGgOIAAhDIARAAIAABdIgQAAIgBgJQgJALgSAAQgOAAgJgJg");
	this.shape_26.setTransform(499.7,116.95);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgWAwIAAhdIAQAAIAAALQAHgOAOAAQAFAAADACIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_27.setTransform(492.2,116.75);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgbAlQgNgNAAgWIAAgCQABgNAFgMQAGgLAJgGQAKgHAKAAQATAAAKANQAKAMAAAXIAAAFIg/AAQABAOAHAKQAIAIALAAQAJAAAGgEQAFgDAFgGIAKAIQgMASgYAAQgSAAgMgMgAgPgcQgGAIgCANIAvAAIAAgCQgBgMgFgHQgHgHgKAAQgIAAgIAHg");
	this.shape_28.setTransform(483.95,116.85);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AAzAwIAAg+QAAgKgFgFQgFgEgLAAQgJAAgGAFQgGAFgBAJIAAA+IgPAAIAAg9QAAgVgUABQgQAAgGANIAABEIgRAAIAAhdIAQAAIAAAKQALgNASAAQATAAAHAQQAEgHAIgEQAIgFAKAAQAfAAABAiIAAA+g");
	this.shape_29.setTransform(471.175,116.75);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_30.setTransform(453.625,118.625);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgKgFgFQgEgEgKAAQgHAAgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAAMQALgPARAAQAeABAAAhIAAA+g");
	this.shape_31.setTransform(443.775,116.75);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_32.setTransform(433.875,116.85);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgcBCIgGgBIAAgNIAFAAQAHAAAFgDQAFgDADgJIADgKIgihdIASAAIAXBGIAWhGIARAAIgmBtQgIAYgTAAg");
	this.shape_33.setTransform(424.75,118.775);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgKgFgFQgEgEgKAAQgHAAgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAAMQALgPARAAQAeABAAAhIAAA+g");
	this.shape_34.setTransform(411.075,116.75);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_35.setTransform(401.175,116.85);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AAXAvIgXhHIgWBHIgNAAIgchdIAQAAIATBFIAXhFIALAAIAXBHIAThHIAPAAIgbBdg");
	this.shape_36.setTransform(389.5,116.85);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgbAlQgNgNABgWIAAgCQgBgNAGgMQAGgLAJgGQAKgHAKAAQATAAAKANQALAMAAAXIAAAFIhAAAQAAAOAIAKQAIAIALAAQAJAAAFgEQAGgDAFgGIAKAIQgMASgYAAQgSAAgMgMgAgPgcQgGAIgCANIAvAAIAAgCQgBgMgGgHQgGgHgKAAQgIAAgIAHg");
	this.shape_37.setTransform(378.05,116.85);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AAVBDIAAg/QAAgJgFgFQgEgEgKAAQgHAAgGADQgGAFgDAGIAABDIgQAAIAAiGIAQAAIAAA0QALgOAQAAQAeABAAAgIAAA/g");
	this.shape_38.setTransform(368.275,114.85);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgUAHIAAgNIApAAIAAANg");
	this.shape_39.setTransform(360.825,116.175);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgKgFgFQgEgEgKAAQgHAAgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAAMQALgPARAAQAeABAAAhIAAA+g");
	this.shape_40.setTransform(353.375,116.75);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_41.setTransform(343.475,116.85);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AAXAvIgXhHIgWBHIgNAAIgchdIARAAIASBFIAWhFIANAAIAWBHIAShHIAQAAIgbBdg");
	this.shape_42.setTransform(331.8,116.85);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgbAlQgNgNAAgWIAAgCQAAgNAGgMQAGgLAJgGQAKgHAKAAQATAAAKANQALAMgBAXIAAAFIg/AAQAAAOAIAKQAIAIALAAQAJAAAFgEQAGgDAFgGIAKAIQgMASgYAAQgSAAgMgMgAgPgcQgGAIgCANIAvAAIAAgCQgBgMgFgHQgHgHgKAAQgIAAgIAHg");
	this.shape_43.setTransform(320.35,116.85);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AAVBDIAAg/QAAgJgFgFQgEgEgKAAQgHAAgGADQgGAFgDAGIAABDIgQAAIAAiGIAQAAIAAA0QALgOAQAAQAeABAAAgIAAA/g");
	this.shape_44.setTransform(310.575,114.85);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgKgFgFQgEgEgKAAQgHAAgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAAMQALgPARAAQAeABAAAhIAAA+g");
	this.shape_45.setTransform(296.175,116.75);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_46.setTransform(286.275,116.85);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_47.setTransform(277.475,114.85);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_48.setTransform(268.375,114.85);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgcAnQgJgIABgSIAAg8IAQAAIAAA8QgBAVATABQARgBAGgOIAAhDIAQAAIAABdIgPAAIgBgJQgJALgSAAQgPAAgHgJg");
	this.shape_49.setTransform(258.25,116.95);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgDAAgHQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgEgDgEQgEgGAAgHQAAgLAKgJQAKgHAPgBQAQAAAKAJQAKAIAAAOIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAHQgKAIgQAAQgKABgJgFg");
	this.shape_50.setTransform(248.625,116.85);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_51.setTransform(239.075,116.85);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AAzAwIAAg+QAAgKgFgFQgFgEgLAAQgJAAgGAFQgGAFgBAJIAAA+IgPAAIAAg9QAAgVgUABQgQAAgGANIAABEIgRAAIAAhdIAQAAIAAAKQALgNASAAQATAAAHAQQAEgHAIgEQAIgFAKAAQAfAAABAiIAAA+g");
	this.shape_52.setTransform(226.275,116.75);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgKgFgFQgEgEgKAAQgHAAgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAAMQALgPARAAQAeABAAAhIAAA+g");
	this.shape_53.setTransform(208.975,116.75);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_54.setTransform(199.075,116.85);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgdA3QgKgOAAgVIAAgCQAAgUAKgOQAKgOARAAQAQAAAKAMIAAgyIAQAAIAACGIgPAAIgBgKQgKAMgQAAQgRAAgKgNgAgQgGQgHAIAAASQAAAQAHAKQAGAIALABQAPgBAIgOIAAgqQgHgNgPAAQgMgBgGAKg");
	this.shape_55.setTransform(188.9,114.95);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_56.setTransform(783.975,91.25);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_57.setTransform(775.875,90.2);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgbAkQgMgMAAgVIAAgDQAAgOAFgKQAFgMAKgGQAKgGAKAAQATAAAKAMQALAMAAAXIAAAGIhAAAQABAOAHAIQAIAJALAAQAJAAAFgDQAHgEAEgGIAKAIQgMATgXAAQgTgBgMgNgAgOgcQgHAHgBANIAuAAIAAgBQAAgNgHgGQgFgHgLAAQgJAAgGAHg");
	this.shape_58.setTransform(768.5,91.25);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_59.setTransform(758.725,91.25);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AAVBEIAAg/QAAgKgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAiGIAQAAIAAAzQALgNAQAAQAegBAAAiIAAA/g");
	this.shape_60.setTransform(748.925,89.25);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgcAkQgLgNAAgWIAAgCQAAgOAFgLQAGgKAJgGQAJgHANABQAPAAALAJQAKAKABAPIgPAAQgBgJgGgGQgHgGgIAAQgMAAgHAJQgGAJAAAQIAAADQAAAQAGAJQAHAJAMAAQAIAAAGgFQAHgGABgIIAPAAQAAAJgGAHQgEAIgJAEQgJAEgJABQgTgBgMgNg");
	this.shape_61.setTransform(739.35,91.25);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_62.setTransform(732.4,89.525);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgHBEIAAiGIAPAAIAACGg");
	this.shape_63.setTransform(728.025,89.25);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgeAkQgMgNAAgXIAAAAQAAgOAFgLQAGgLAKgGQAJgHAMABQATAAAMANQAMANAAAWIAAABQAAAOgFALQgFALgKAGQgKAGgNABQgSAAgMgOgAgTgaQgHAKAAARQAAAQAHAJQAIAKALAAQAMAAAIgKQAHgJAAgRQAAgPgHgKQgIgKgMAAQgLAAgIAJg");
	this.shape_64.setTransform(720.775,91.25);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgtBAIAAh/IAuAAQAVAAAMALQAMAKAAASQAAATgLAJQgMAKgWAAIgdAAIAAAygAgcAAIAdAAQANAAAIgGQAHgFAAgNQAAgLgHgHQgIgHgMAAIgeAAg");
	this.shape_65.setTransform(710.4,89.6);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAIQgKAIgQAAQgKgBgJgEg");
	this.shape_66.setTransform(695.175,91.25);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_67.setTransform(685.625,91.25);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgHBEIAAiGIAPAAIAACGg");
	this.shape_68.setTransform(678.575,89.25);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgbAkQgNgMAAgVIAAgDQAAgOAGgKQAFgMAKgGQAKgGAKAAQATAAAKAMQAKAMAAAXIAAAGIg/AAQAAAOAIAIQAIAJALAAQAJAAAGgDQAFgEAFgGIAKAIQgMATgYAAQgSgBgMgNgAgPgcQgGAHgCANIAvAAIAAgBQgBgNgFgGQgHgHgKAAQgIAAgIAHg");
	this.shape_69.setTransform(671.7,91.25);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_70.setTransform(662.925,89.25);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_71.setTransform(649.375,89.25);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_72.setTransform(642.05,89.525);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_73.setTransform(636.625,90.2);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAIQgKAIgQAAQgKgBgJgEg");
	this.shape_74.setTransform(629.275,91.25);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQADACgBAEQABAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_75.setTransform(622.5,89.525);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAQAAIAAALQAHgNAOABQAFgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_76.setTransform(617.75,91.15);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgbAkQgNgMAAgVIAAgDQAAgOAGgKQAGgMAJgGQAKgGAKAAQATAAAKAMQAKAMAAAXIAAAGIg/AAQABAOAHAIQAIAJALAAQAJAAAGgDQAFgEAFgGIAKAIQgMATgYAAQgSgBgMgNgAgOgcQgHAHgCANIAvAAIAAgBQgBgNgFgGQgHgHgKAAQgIAAgHAHg");
	this.shape_77.setTransform(609.5,91.25);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_78.setTransform(601.425,90.2);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_79.setTransform(594.825,89.25);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_80.setTransform(584.725,91.25);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAPAAIABALQAHgNAPABQAFgBACACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_81.setTransform(577.3,91.15);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_82.setTransform(568.825,91.25);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_83.setTransform(560.025,89.25);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAQAAIAAALQAHgNAOABQAGgBACACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_84.setTransform(547.85,91.15);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_85.setTransform(539.375,91.25);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_86.setTransform(531.275,90.2);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AgNBFIAAhSIgPAAIAAgNIAPAAIAAgKQAAgOAIgJQAHgJAPAAIAMACIgBANIgJgBQgIABgEAEQgFAEAAAJIAAAKIAVAAIAAANIgVAAIAABSg");
	this.shape_87.setTransform(525.825,89.15);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_88.setTransform(517.475,91.25);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgcA2QgLgNAAgWIAAgBQAAgVAKgNQALgNARAAQAPAAAKALIAAgxIAQAAIAACGIgPAAIAAgKQgKALgRABQgQgBgKgOgAgQgHQgHAJAAASQAAAQAHAJQAGAJALAAQAQAAAHgNIAAgrQgIgOgPAAQgLABgGAIg");
	this.shape_89.setTransform(507.3,89.35);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_90.setTransform(493.025,91.15);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_91.setTransform(483.125,91.25);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_92.setTransform(473.025,93.025);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_93.setTransform(463.175,91.15);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AgbAkQgMgMAAgVIAAgDQAAgOAFgKQAFgMAKgGQAKgGAKAAQATAAAKAMQALAMAAAXIAAAGIhAAAQABAOAHAIQAIAJALAAQAJAAAFgDQAHgEAEgGIAKAIQgMATgXAAQgTgBgMgNgAgOgcQgHAHgBANIAuAAIAAgBQAAgNgHgGQgFgHgLAAQgJAAgGAHg");
	this.shape_94.setTransform(453.5,91.25);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AgdA2QgKgNAAgWIAAgBQAAgVAKgNQALgNAQAAQAQAAAKALIAAgxIAQAAIAACGIgPAAIgBgKQgJALgRABQgQgBgLgOgAgQgHQgHAJAAASQAAAQAHAJQAHAJAKAAQAPAAAIgNIAAgrQgIgOgOAAQgLABgHAIg");
	this.shape_95.setTransform(443.35,89.35);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_96.setTransform(429.075,91.15);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_97.setTransform(419.175,91.25);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AAXAwIgXhHIgWBHIgNAAIgchfIAQAAIATBGIAXhGIALAAIAXBIIAThIIAPAAIgbBfg");
	this.shape_98.setTransform(407.5,91.25);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AgbAkQgNgMABgVIAAgDQgBgOAGgKQAGgMAJgGQAKgGAKAAQATAAAKAMQALAMAAAXIAAAGIhAAAQAAAOAIAIQAIAJALAAQAJAAAFgDQAGgEAFgGIAKAIQgMATgYAAQgSgBgMgNgAgPgcQgGAHgCANIAvAAIAAgBQgBgNgGgGQgGgHgKAAQgIAAgIAHg");
	this.shape_99.setTransform(396.05,91.25);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AAVBEIAAg/QAAgKgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAiGIAQAAIAAAzQALgNAQAAQAegBAAAiIAAA/g");
	this.shape_100.setTransform(386.275,89.25);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_101.setTransform(372.925,89.25);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAFAAACADQACACABAEQgBAEgCADQgCADgFAAQgEAAgCgDg");
	this.shape_102.setTransform(365.6,89.525);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_103.setTransform(360.175,90.2);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAIQgKAIgQAAQgKgBgJgEg");
	this.shape_104.setTransform(352.825,91.25);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQADACAAAEQAAAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_105.setTransform(346.05,89.525);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAQAAIAAALQAHgNAOABQAGgBACACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_106.setTransform(341.3,91.15);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AgbAkQgNgMABgVIAAgDQgBgOAGgKQAGgMAJgGQAKgGAKAAQATAAAKAMQALAMAAAXIAAAGIhAAAQAAAOAIAIQAIAJALAAQAJAAAFgDQAGgEAFgGIAKAIQgMATgYAAQgSgBgMgNgAgPgcQgGAHgCANIAvAAIAAgBQgBgNgGgGQgGgHgKAAQgIAAgIAHg");
	this.shape_107.setTransform(333.05,91.25);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_108.setTransform(324.975,90.2);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_109.setTransform(318.375,89.25);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_110.setTransform(308.275,91.25);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAPAAIABALQAHgNAOABQAFgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_111.setTransform(300.85,91.15);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_112.setTransform(292.375,91.25);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_113.setTransform(283.575,89.25);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAPAAIABALQAHgNAPABQAEgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_114.setTransform(271.4,91.15);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_115.setTransform(262.925,91.25);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_116.setTransform(254.825,90.2);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AgNBFIAAhSIgPAAIAAgNIAPAAIAAgKQAAgOAIgJQAHgJAPAAIAMACIgBANIgJgBQgIABgEAEQgFAEAAAJIAAAKIAVAAIAAANIgVAAIAABSg");
	this.shape_117.setTransform(249.375,89.15);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_118.setTransform(241.025,91.25);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AgdA2QgKgNAAgWIAAgBQAAgVAKgNQAKgNARAAQAQAAAKALIAAgxIAQAAIAACGIgPAAIgBgKQgKALgQABQgRgBgKgOgAgQgHQgHAJAAASQAAAQAHAJQAHAJAKAAQAPAAAIgNIAAgrQgIgOgOAAQgLABgHAIg");
	this.shape_119.setTransform(230.85,89.35);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_120.setTransform(216.575,91.15);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_121.setTransform(206.675,91.25);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_122.setTransform(197.875,89.25);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AgeAkQgMgNAAgXIAAAAQAAgOAFgLQAGgLAKgGQAJgHAMABQATAAAMANQAMANAAAWIAAABQAAAOgFALQgFALgKAGQgKAGgNABQgSAAgMgOgAgTgaQgHAKAAARQAAAQAHAJQAIAKALAAQAMAAAIgKQAHgJAAgRQAAgPgHgKQgIgKgMAAQgLAAgIAJg");
	this.shape_123.setTransform(187.625,91.25);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AgbAkQgMgNAAgWIAAgCQAAgOAFgLQAGgKAJgGQAJgHAMABQARAAAKAJQALAKAAAPIgPAAQgBgJgGgGQgHgGgJAAQgLAAgHAJQgHAJABAQIAAADQgBAQAHAJQAHAJALAAQAJAAAGgFQAHgGABgIIAPAAQAAAJgGAHQgEAIgJAEQgJAEgKABQgSgBgLgNg");
	this.shape_124.setTransform(177.9,91.25);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AgeAkQgMgNAAgXIAAAAQAAgOAFgLQAGgLAKgGQAJgHAMABQATAAAMANQAMANAAAWIAAABQAAAOgFALQgFALgKAGQgKAGgNABQgSAAgMgOgAgTgaQgHAKAAARQAAAQAHAJQAIAKALAAQAMAAAIgKQAHgJAAgRQAAgPgHgKQgIgKgMAAQgLAAgIAJg");
	this.shape_125.setTransform(168.025,91.25);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AgjAxQgNgQAAgbIAAgMQAAgRAGgOQAGgNAMgIQAMgHAOAAQAVAAAMALQAMAMACAUIgRAAQgCgPgHgHQgIgHgNAAQgPAAgJAMQgJAMAAAWIAAALQAAAVAIAMQAJANAPAAQAOAAAHgHQAIgGACgQIARAAQgCAUgNAMQgMALgVAAQgWAAgOgRg");
	this.shape_126.setTransform(157.225,89.625);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AACAVIAAgKQAAgJAEgIQAEgJAHgFIAJAGQgIAMAAALIAAAMgAgZAVIAAgKQAAgJAEgIQAEgJAHgFIAKAGQgJAMAAALIAAAMg");
	this.shape_127.setTransform(148.425,84.45);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.bf(img.Bitmap2, null, new cjs.Matrix2D(1,0,0,1,-499,-300)).s().p("EhN9Au4MAAAhdvMCb7AAAMAAABdvg");
	this.shape_128.setTransform(471,261);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.btnNextDasar1},{t:this.btnMenuDasar1},{t:this.btnBack3},{t:this.winMessage},{t:this.slots},{t:this.pieces},{t:this.judulKI},{t:this.Score},{t:this.restart},{t:this.btnInfo},{t:this.materiBtn},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(452,231,518,330);
// library properties:
lib.properties = {
	id: 'E740BB847DF4864B949C99CD86B71105',
	width: 960,
	height: 540,
	fps: 24,
	color: "#34495E",
	opacity: 1.00,
	manifest: [
		{src:"images/_1.jpeg", id:"_1"},
		{src:"images/_11.jpeg", id:"_11"},
		{src:"images/_3.jpeg", id:"_3"},
		{src:"images/_11_1.jpeg", id:"_11_1"},
		{src:"images/_3_1.jpeg", id:"_3_1"},
		{src:"images/Bitmap101copy.png", id:"Bitmap101copy"},
		{src:"images/Bitmap103copy.png", id:"Bitmap103copy"},
		{src:"images/Bitmap105.png", id:"Bitmap105"},
		{src:"images/Bitmap110.png", id:"Bitmap110"},
		{src:"images/Bitmap2.png", id:"Bitmap2"},
		{src:"images/Bitmap21.png", id:"Bitmap21"},
		{src:"images/Bitmap3.png", id:"Bitmap3"},
		{src:"images/Bitmap111.png", id:"Bitmap111"},
		{src:"images/bookpngcopy.png", id:"bookpngcopy"},
		{src:"images/Bitmap102copy.png", id:"Bitmap102copy"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['E740BB847DF4864B949C99CD86B71105'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;