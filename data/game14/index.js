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



(lib._16 = function() {
	this.initialize(img._16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,320,292);


(lib.Bitmap102copy = function() {
	this.initialize(img.Bitmap102copy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,233,124);


(lib.Bitmap125 = function() {
	this.initialize(img.Bitmap125);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,302,222);


(lib.Bitmap123 = function() {
	this.initialize(img.Bitmap123);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,222);


(lib.Bitmap128 = function() {
	this.initialize(img.Bitmap128);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,266,157);


(lib.Bitmap126 = function() {
	this.initialize(img.Bitmap126);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,226,157);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);


(lib.Bitmap124 = function() {
	this.initialize(img.Bitmap124);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,296,222);


(lib.Bitmap127 = function() {
	this.initialize(img.Bitmap127);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,243,157);


(lib.Bitmap3 = function() {
	this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,249,87);


(lib.bookpngcopy = function() {
	this.initialize(img.bookpngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,399);// helper functions:

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


(lib.Tween10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Eg/RAu4MAAAhdvMB+jAAAMAAABdvg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-405,-300,810,600);


(lib.Tween8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#603AD8").s().p("EhB5AkqMAAAhJSMCDzAAAMAAABJSg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-421.8,-234.5,843.6,469.1);


(lib.Tween7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#603AD8").s().p("EhB5AkpMAAAhJRMCDzAAAMAAABJRg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-421.8,-234.5,843.6,469.1);


(lib.Tween6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("Klik gambar untuk memperjelas", "12px 'Roboto'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 16;
	this.text.lineWidth = 170;
	this.text.parent = this;
	this.text.setTransform(0,-7.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-87,-9.2,174.1,18.4);


(lib.Tween5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("Klik gambar untuk memperjelas", "12px 'Roboto'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 16;
	this.text.lineWidth = 170;
	this.text.parent = this;
	this.text.setTransform(0,-7.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-87,-9.2,174.1,18.4);


(lib.Tween4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("Klik gambar untuk memperjelas", "12px 'Roboto'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 16;
	this.text.lineWidth = 170;
	this.text.parent = this;
	this.text.setTransform(0,-7.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-87,-9.2,174.1,18.4);


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


(lib.sustain = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("Game Sustainability", "italic 28px 'Roboto Medium'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 36;
	this.text.lineWidth = 248;
	this.text.parent = this;
	this.text.setTransform(127.4,7);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3498DB").s().p("AzCC2IAAlrMAmFAAAIAAFrg");
	this.shape.setTransform(128.975,18.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sustain, new cjs.Rectangle(1.5,0.7,251.9,41.9), null);


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


(lib.g3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap125();
	this.instance.setTransform(-50.45,-37.5,0.3343,0.3378);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g3, new cjs.Rectangle(-50.4,-37.5,100.9,75), null);


(lib.g2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap124();
	this.instance.setTransform(-50.45,-37.5,0.341,0.3378);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g2, new cjs.Rectangle(-50.4,-37.5,100.9,75), null);


(lib.g1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap123();
	this.instance.setTransform(-50.45,-37.5,0.3365,0.3378);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g1, new cjs.Rectangle(-50.4,-37.5,100.9,75), null);


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


(lib.Tween8copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#603AD8").s().p("EhB5AkqMAAAhJSMCDzAAAMAAABJSg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-421.8,-234.5,843.6,469.1);


(lib.Tween8_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3498DB").s().p("EhB5AkpMAAAhJRMCDzAAAMAAABJRg");

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


(lib.Tween5copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IALAAIAAAHQAFgIAJAAIAGABIAAAKIgGgBQgKAAgEAJIAAAsg");
	this.shape.setTransform(21.55,0.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_1.setTransform(16.125,1.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_2.setTransform(9.775,1.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_3.setTransform(3.625,1.025);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgPAnQgIgFgEgJQgFgJAAgMIAAgGQAAgUAJgKQAJgLAPAAQAOAAAIAHQAIAHACAMIgMAAQgDgRgRAAQgKAAgGAIQgFAIgBAPIAAAGQAAAPAHAIQAGAJALAAQAGAAAFgCQAEgBADgDIAAgUIgTAAIAAgJIAfAAIAAAgQgFAGgHADQgIADgLAAQgJAAgIgFg");
	this.shape_4.setTransform(-3.75,-0.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgNAEIAAgHIAcAAIAAAHg");
	this.shape_5.setTransform(-12.35,0.575);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgOAEIAAgHIAcAAIAAAHg");
	this.shape_6.setTransform(-15.65,0.575);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgXAEIAAgHIAvgXIAAAMIgkAOIAkAPIAAAMg");
	this.shape_7.setTransform(-20.6,0.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25.4,-9.2,50.9,18.4);


(lib.Tween4copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgOAgIAAg+IALAAIAAAHQAEgIAKAAIAEABIAAAKIgFgBQgKAAgDAJIAAAsg");
	this.shape.setTransform(21.5,0.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_1.setTransform(16.075,1.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_2.setTransform(9.725,1.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_3.setTransform(3.575,1.025);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgPAnQgIgFgFgJQgDgJgBgMIAAgGQAAgUAJgKQAJgLAPAAQAOAAAIAHQAIAHACAMIgLAAQgEgRgRAAQgKAAgFAIQgHAIABAPIAAAGQAAAPAGAIQAHAJAKAAQAGAAAFgCQAEgBAEgDIAAgUIgUAAIAAgJIAfAAIAAAgQgEAGgIADQgIADgKAAQgJAAgJgFg");
	this.shape_4.setTransform(-3.8,-0.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgOAEIAAgHIAcAAIAAAHg");
	this.shape_5.setTransform(-12.4,0.575);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgOAEIAAgHIAdAAIAAAHg");
	this.shape_6.setTransform(-15.7,0.575);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgXAEIAAgHIAvgXIAAAMIgjAOIAjAPIAAAMg");
	this.shape_7.setTransform(-20.65,0.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25.4,-9.2,50.8,18.4);


(lib.Tween3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IALAAIAAAHQAFgIAJAAIAGABIAAAKIgGgBQgKAAgEAJIAAAsg");
	this.shape.setTransform(21.55,0.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_1.setTransform(16.125,1.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_2.setTransform(9.775,1.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_3.setTransform(3.625,1.025);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgPAnQgIgFgEgJQgFgJAAgMIAAgGQAAgUAJgKQAJgLAPAAQAOAAAIAHQAIAHACAMIgMAAQgDgRgRAAQgKAAgGAIQgFAIgBAPIAAAGQAAAPAHAIQAGAJALAAQAGAAAFgCQAEgBADgDIAAgUIgTAAIAAgJIAfAAIAAAgQgFAGgHADQgIADgLAAQgJAAgIgFg");
	this.shape_4.setTransform(-3.75,-0.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgNAEIAAgHIAcAAIAAAHg");
	this.shape_5.setTransform(-12.35,0.575);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgOAEIAAgHIAcAAIAAAHg");
	this.shape_6.setTransform(-15.65,0.575);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgXAEIAAgHIAvgXIAAAMIgkAOIAkAPIAAAMg");
	this.shape_7.setTransform(-20.6,0.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25.4,-9.2,50.9,18.4);


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
	this.shape_9.graphics.f("#FF8C2D").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_9.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


(lib.Path_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#606163").s().p("Ap/z/QEEAADvBlQDkBhCxCyQCxCwBiDmQBkDtAAEEQAAEEhkDuQhiDmixCxQixCxjkBhQjvBkkEAAg");
	this.shape_1.setTransform(64,127.95);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1, new cjs.Rectangle(0,0,128,255.9), null);


(lib.drop11G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape.setTransform(121.175,86.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAUAAIAABfgAgIgtQgDgDAAgGQAAgEADgEQADgDAFAAQAGAAADADQADAEAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_1.setTransform(114,84.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAVAAIAAALQAHgMANAAQAFgBADACIAAAUIgJgBQgPAAgDALIAABBg");
	this.shape_2.setTransform(108.95,86.65);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_3.setTransform(100.475,86.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgJBEIAAiGIATAAIAACGg");
	this.shape_4.setTransform(93.3,84.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_5.setTransform(86.275,86.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgTAtQgJgEgGgIQgEgHAAgJIAUAAQABAIAFAEQAGAEAHAAQAIAAAFgDQAEgDAAgFQAAgGgEgDQgFgDgKgDQgLgCgHgDQgQgHAAgPQAAgMAKgIQALgIAOAAQARAAALAIQALAJgBANIgVAAQAAgGgEgEQgFgFgIABQgFgBgFAEQgFADAAAFQABAFAEADQAEADAMADQAMACAHAEQAHADAEAFQAEAGAAAIQAAAMgMAJQgKAIgRAAQgLgBgJgEg");
	this.shape_6.setTransform(76.65,86.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAVAAIAABfgAgIgtQgDgDAAgGQAAgEADgEQADgDAFAAQAGAAADADQADAEAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_7.setTransform(69.75,84.95);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgVAKgNQALgNARAAQAOAAAJAKIAAgwIAWAAIAACGIgUAAIgBgKQgJALgPABQgRAAgKgOgAgOgDQgFAGAAARQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAJg");
	this.shape_8.setTransform(62.175,84.85);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_9.setTransform(52.575,86.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgoBDIAAiDIATAAIABAKQAJgMAQAAQARAAAKANQAJANAAAXIAAACQABAVgLANQgKANgQAAQgPAAgJgKIAAAtgAgTglIAAApQAFALANAAQAKAAAFgIQAHgHAAgRQgBgOgFgJQgGgIgKAAQgNAAgFALg");
	this.shape_10.setTransform(42.75,88.475);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AghBFIAyiKIARAAIgyCKg");
	this.shape_11.setTransform(225.425,60.05);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgKAhIAAg1IgQAAIAAgQIAQAAIAAgXIAUAAIAAAXIARAAIAAAQIgRAAIAAA0QAAAGACACQACACAGAAIAHgBIAAARQgHACgHAAQgXAAAAgbg");
	this.shape_12.setTransform(218.825,60.1);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgMIAAhCIAVAAIAABdIgUAAIAAgJQgKAMgQgBQgPABgIgKg");
	this.shape_13.setTransform(211.025,61.25);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgKAhIAAg1IgQAAIAAgQIAQAAIAAgXIAUAAIAAAXIARAAIAAAQIgRAAIAAA0QAAAGACACQACACAGAAIAHgBIAAARQgHACgHAAQgXAAAAgbg");
	this.shape_14.setTransform(202.825,60.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAOIAAArQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_15.setTransform(195.175,61.15);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgcAkQgMgMAAgXIAAgBQAAgXAMgMQALgOATAAQARAAALALQAKAJABAQIgUAAQAAgHgFgGQgGgFgIAAQgKAAgFAHQgGAIABAPIAAACQgBAQAGAIQAFAHAKAAQAIAAAGgEQAFgFAAgHIAUAAQgBAJgEAIQgGAHgJAFQgIAFgLgBQgTAAgLgNg");
	this.shape_16.setTransform(185.7,61.15);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAKIAAAeIgWAAIAAiGIAWAAIAABOIAGgJIAagcIAZAAIgjAmIAnA3g");
	this.shape_17.setTransform(160.525,59.15);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgMIAAhCIAVAAIAABdIgUAAIAAgJQgKAMgQgBQgPABgIgKg");
	this.shape_18.setTransform(150.225,61.25);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgKAhIAAg1IgQAAIAAgQIAQAAIAAgXIAUAAIAAAXIARAAIAAAQIgRAAIAAA0QAAAGACACQACACAGAAIAHgBIAAARQgHACgHAAQgXAAAAgbg");
	this.shape_19.setTransform(142.025,60.1);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABCIgVAAIAAhdIAUAAIAAALQALgOAQAAQAeABABAhIAAA+g");
	this.shape_20.setTransform(134.25,61.05);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALAAQAUAAAKANQALANAAAWIAAAIIg9AAQABAMAGAHQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgNgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_21.setTransform(124.525,61.15);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgUA4IgCAKIgTAAIAAiGIAWAAIAAAyQAJgMAOAAQASAAAKAOQAKAMAAAXIAAABQAAAWgKANQgKANgRAAQgQAAgJgMgAgTAAIAAAmQAFANAOAAQAJAAAGgHQAFgIAAgPIAAgDQAAgQgFgGQgGgIgJAAQgOAAgFAMg");
	this.shape_22.setTransform(114.725,59.25);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_23.setTransform(90.9,59.35);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgKAhIAAg1IgQAAIAAgQIAQAAIAAgXIAUAAIAAAXIARAAIAAAQIgRAAIAAA0QAAAGACACQACACAGAAIAHgBIAAARQgHACgHAAQgXAAAAgbg");
	this.shape_24.setTransform(85.375,60.1);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAUAAIABAKQAGgNAPAAQAEAAADACIgBAUIgIgBQgOAAgFALIAABAg");
	this.shape_25.setTransform(79.85,61.05);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALAAQAUAAAKANQALANAAAWIAAAIIg9AAQABAMAGAHQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgNgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_26.setTransform(71.525,61.15);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgpBDIAAiDIAUAAIABAKQAJgMAQAAQARAAAKANQAKANAAAXIAAACQgBAVgJANQgLANgQAAQgPAAgJgKIAAAtgAgTglIAAApQAGALANAAQAJAAAGgIQAFgHAAgRQABgOgGgJQgGgIgJAAQgNAAgGALg");
	this.shape_27.setTransform(61.7,62.875);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALAAQAUAAAKANQALANAAAWIAAAIIg9AAQABAMAGAHQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgNgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_28.setTransform(51.725,61.15);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgTAtQgJgEgGgHQgEgIAAgIIAUAAQABAHAFAEQAGAFAHAAQAJAAAEgEQAEgDAAgGQAAgFgEgDQgFgDgKgCQgLgCgHgEQgQgHAAgOQAAgNAKgIQALgJAOAAQASAAAKAJQALAJAAANIgWAAQAAgGgEgEQgFgEgIgBQgFABgFADQgFADABAGQAAAFAEACQAEADAMADQAMACAHAFQAIACADAGQAEAFAAAHQAAANgMAJQgKAHgRAAQgLABgJgFg");
	this.shape_29.setTransform(42.1,61.15);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgDAAgGQAAgEADgDQADgEAFAAQAGAAADAEQADADAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_30.setTransform(226.85,33.75);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgTAtQgJgEgGgIQgEgHAAgJIAUAAQABAIAFAEQAGAFAHgBQAJABAEgEQAEgDAAgFQAAgGgEgDQgFgDgKgDQgLgCgHgDQgQgHAAgPQAAgMAKgIQALgIAOAAQASAAAKAIQALAJAAANIgWAAQAAgGgEgEQgFgFgIABQgFgBgFAEQgFADABAFQAAAFADADQAFADAMADQAMACAHAEQAIADADAFQAEAGAAAIQAAANgMAHQgKAJgRAAQgLgBgJgEg");
	this.shape_31.setTransform(219.85,35.55);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNAAQgPgBgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_32.setTransform(210.375,35.55);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AARBEIgbgqIgJAKIAAAgIgWAAIAAiGIAWAAIAABMIAGgIIAagdIAZAAIgjAnIAnA4g");
	this.shape_33.setTransform(201.375,33.55);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgDAAgGQAAgEADgDQADgEAFAAQAGAAADAEQADADAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_34.setTransform(193.8,33.75);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgPBFIAAhPIgOAAIAAgQIAOAAIAAgJQAAgPAJgIQAIgJAQAAIAMABIgBARIgIgBQgPAAAAAQIAAAIIATAAIAAAQIgTAAIAABPg");
	this.shape_35.setTransform(188.5,33.45);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAVAAIAABfgAgIgtQgDgDAAgGQAAgEADgDQADgEAFAAQAGAAADAEQADADAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_36.setTransform(182.8,33.75);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgVAKgNQALgOARABQAOAAAJAKIAAgwIAWAAIAACGIgUAAIgBgKQgJAMgPAAQgRAAgKgOgAgOgDQgFAGAAARQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAJg");
	this.shape_37.setTransform(175.225,33.65);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgfAkQgMgNAAgXIAAAAQAAgOAFgLQAGgMAKgFQAKgHAMABQATAAAMAMQAMAMABAVIAAAEQAAAOgFALQgGALgKAGQgKAGgNABQgTAAgMgOgAgQgXQgGAJAAAPQAAAOAGAJQAGAIAKAAQALAAAGgIQAGgJAAgPQAAgOgGgJQgHgIgKAAQgKAAgGAIg");
	this.shape_38.setTransform(165.275,35.55);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AAuAxIAAg9QAAgJgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAHIAABAIgVAAIAAg+QAAgRgRAAQgNAAgFAKIAABFIgVAAIAAhfIAUAAIAAAKQAKgMASABQASgBAHAPQAKgPATABQAQgBAIAJQAHAJAAARIAAA+g");
	this.shape_39.setTransform(152.325,35.45);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAVAAIAAALQAGgMAOAAQAFAAADABIgBAUIgIgBQgPAAgEAMIAABAg");
	this.shape_40.setTransform(141.75,35.45);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALAAQAUAAAKAMQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUAAgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_41.setTransform(133.425,35.55);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAFACACQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgcg");
	this.shape_42.setTransform(125.275,34.5);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgUA/QgKgFgGgHIAKgMQAKALAPAAQAJAAAHgFQAFgGABgLIAAgHQgKALgOAAQgRAAgKgOQgLgNAAgXQAAgWALgNQAKgNASAAQAPAAAJALIABgJIATAAIAABbQAAATgLAKQgMALgTAAQgKAAgKgEgAgNgoQgHAIAAAQQAAAPAHAHQAFAIAJAAQANAAAHgLIAAgpQgHgLgNAAQgJAAgFAJg");
	this.shape_43.setTransform(70.9,37.325);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgVAAIAAhfIAUAAIAAALQALgNAQABQAegBABAjIAAA+g");
	this.shape_44.setTransform(61,35.45);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNAAQgPgBgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_45.setTransform(51.125,35.55);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgiBBIAAgRIAEABQAIAAAEgDQAEgDADgHIADgIIgiheIAXAAIATBBIAUhBIAXAAIgmBtQgIAYgVAAIgKgCg");
	this.shape_46.setTransform(41.875,37.475);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_47.setTransform(226.8,8.15);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAVAAIAAAKQAGgMAOAAQAFAAADABIgBAUIgIgBQgPAAgEALIAABAg");
	this.shape_48.setTransform(221.75,9.85);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgMIAAhCIAVAAIAABdIgUAAIAAgJQgKAMgQAAQgPAAgIgKg");
	this.shape_49.setTransform(213.125,10.05);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgUAKgOQALgNARAAQAOgBAJALIAAgxIAWAAIAACGIgUAAIgBgKQgJANgPAAQgRAAgKgOgAgOgEQgFAHAAARQAAAPAFAIQAGAIAJAAQANAAAGgMIAAgnQgGgMgNAAQgJAAgGAIg");
	this.shape_50.setTransform(202.875,8.05);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_51.setTransform(190.05,8.15);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAKIAAAeIgWAAIAAiGIAWAAIAABOIAGgJIAagcIAZAAIgjAmIAnA3g");
	this.shape_52.setTransform(183.625,7.95);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_53.setTransform(176.05,8.15);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgKBDIAAiGIAVAAIAACGg");
	this.shape_54.setTransform(171.45,7.95);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_55.setTransform(166.85,8.15);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgMASAAQASAAAHAOQAKgOATAAQAQAAAIAJQAHAIAAARIAAA9g");
	this.shape_56.setTransform(156.725,9.85);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALABQAUAAAKAMQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_57.setTransform(144.175,9.95);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgMASAAQASAAAHAOQAKgOATAAQAQAAAIAJQAHAIAAARIAAA9g");
	this.shape_58.setTransform(131.425,9.85);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_59.setTransform(115.65,8.15);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABCIgVAAIAAhdIAUAAIAAAKQALgMAQAAQAeAAABAhIAAA+g");
	this.shape_60.setTransform(108.35,9.85);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_61.setTransform(101.05,8.15);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABCIgVAAIAAhdIAUAAIAAAKQALgMAQAAQAeAAABAhIAAA+g");
	this.shape_62.setTransform(88.1,9.85);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKAAQARgBAKAJQAKAJAAAOIAAArQAAAMAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_63.setTransform(78.225,9.95);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AAUAvIgUhAIgTBAIgSAAIgahdIAVAAIAPA/IAUg/IAPAAIAUBAIAPhAIAVAAIgaBdg");
	this.shape_64.setTransform(66.625,9.95);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALABQAUAAAKAMQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_65.setTransform(55.225,9.95);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AAdBAIAAg5Ig5AAIAAA5IgWAAIAAh/IAWAAIAAA2IA5AAIAAg2IAWAAIAAB/g");
	this.shape_66.setTransform(43.875,8.3);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.019,0,0,1.873,-126.8,-81.7)).s().p("Az0MvIAA5dMAnpAAAIAAZdg");
	this.shape_67.setTransform(134,54.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop11G5, new cjs.Rectangle(7.1,-26.7,253.79999999999998,162.89999999999998), null);


(lib.drop11G4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgJBEIAAiGIAUAAIAACGg");
	this.shape.setTransform(161.3,58.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_1.setTransform(154.125,60.65);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAVAAIAAALQAHgMANAAQAFgBADACIgBAUIgIgBQgPAAgDALIAABBg");
	this.shape_2.setTransform(146.5,60.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AARBEIgbgqIgJAKIAAAgIgWAAIAAiGIAWAAIAABMIAGgIIAagdIAZAAIgjAnIAnA4g");
	this.shape_3.setTransform(138.775,58.65);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_4.setTransform(128.625,60.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgJBEIAAiGIATAAIAACGg");
	this.shape_5.setTransform(121.45,58.65);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKAMgQAAQgPAAgIgKg");
	this.shape_6.setTransform(114.125,60.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgUA4IgCALIgTAAIAAiGIAWAAIAAAwQAJgLAOABQASgBAKANQAKAOAAAVIAAACQAAAWgKANQgKAOgRAAQgQAAgJgNgAgTAAIAAAnQAFAMAOAAQAJAAAGgIQAFgHAAgPIAAgDQAAgPgFgHQgGgIgJAAQgOAAgFAMg");
	this.shape_7.setTransform(104.275,58.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AAuAxIAAg9QAAgJgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABBIgVAAIAAg+QAAgRgRAAQgNAAgFAKIAABFIgVAAIAAhfIAUAAIAAAKQAKgMASABQASAAAHAOQAKgOATAAQAQgBAIAKQAHAIAAARIAAA+g");
	this.shape_8.setTransform(91.175,60.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_9.setTransform(78.475,60.65);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_10.setTransform(211.4,33.25);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAKIAAAeIgWAAIAAiGIAWAAIAABOIAGgJIAagcIAZAAIgjAmIAnA3g");
	this.shape_11.setTransform(204.975,33.05);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAOIAAArQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_12.setTransform(194.825,35.05);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAKIAAAeIgWAAIAAiGIAWAAIAABOIAGgJIAagcIAZAAIgjAmIAnA3g");
	this.shape_13.setTransform(185.825,33.05);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_14.setTransform(173.75,33.25);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAKIAAAeIgWAAIAAiGIAWAAIAABOIAGgJIAagcIAZAAIgjAmIAnA3g");
	this.shape_15.setTransform(167.325,33.05);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_16.setTransform(159.75,33.25);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgKBDIAAiGIAVAAIAACGg");
	this.shape_17.setTransform(155.15,33.05);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_18.setTransform(150.55,33.25);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgEQgEgFgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgNASAAQASAAAHAPQAKgPATAAQAQABAIAIQAHAJAAARIAAA9g");
	this.shape_19.setTransform(140.425,34.95);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALAAQAUAAAKANQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgMgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_20.setTransform(127.875,35.05);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgEQgEgFgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgNASAAQASAAAHAPQAKgPATAAQAQABAIAIQAHAJAAARIAAA9g");
	this.shape_21.setTransform(115.125,34.95);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_22.setTransform(100.5,33.25);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABCIgVAAIAAhdIAUAAIAAALQALgOAQAAQAeABAAAhIAAA+g");
	this.shape_23.setTransform(93.2,34.95);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_24.setTransform(85.9,33.25);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgLAAgHAMIAABCIgWAAIAAhdIAVAAIABALQAKgOAQAAQAeABAAAhIAAA+g");
	this.shape_25.setTransform(74.1,34.95);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAOIAAArQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_26.setTransform(64.225,35.05);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AAUAvIgUhAIgTBAIgSAAIgahdIAVAAIAPBAIAUhAIAPAAIAUBAIAPhAIAVAAIgaBdg");
	this.shape_27.setTransform(52.625,35.05);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALAAQAUAAAKANQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgMgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_28.setTransform(41.225,35.05);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AAdBAIAAg5Ig5AAIAAA5IgWAAIAAh/IAWAAIAAA1IA5AAIAAg1IAWAAIAAB/g");
	this.shape_29.setTransform(29.875,33.4);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.165,0,0,1.218,-145,-53)).s().p("A2qISIAAwjMAtVAAAIAAQjg");
	this.shape_30.setTransform(121.65,48.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop11G4, new cjs.Rectangle(-23.4,-4.4,290.2,106), null);


(lib.drop11G3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgKBEIAAiGIAUAAIAACGg");
	this.shape.setTransform(206.35,73.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_1.setTransform(199.175,75.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAUAAIABALQAGgMAPAAQAEgBADACIAAAUIgJgBQgOAAgFALIAABBg");
	this.shape_2.setTransform(191.55,75.85);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgfAkQgMgNAAgXIAAAAQAAgOAFgLQAGgMAKgFQAKgHAMABQATAAAMAMQAMANABAUIAAAEQAAAOgFALQgGALgKAGQgKAGgNABQgTAAgMgOgAgQgXQgGAJAAAPQAAAOAGAJQAGAIAKAAQALAAAGgIQAGgJAAgPQAAgOgGgJQgHgIgKAAQgKAAgGAIg");
	this.shape_3.setTransform(182.875,75.95);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_4.setTransform(168.375,75.95);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgVAKgNQALgNARAAQAOAAAJAKIAAgwIAWAAIAACGIgUAAIgBgKQgJALgPABQgRAAgKgOgAgOgDQgFAGAAARQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAJg");
	this.shape_5.setTransform(158.225,74.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_6.setTransform(148.475,75.95);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgoBDIAAiDIATAAIABAKQAJgMAPAAQASAAAKANQAJANAAAXIAAACQABAVgLANQgKANgQAAQgPAAgJgKIAAAtgAgTglIAAApQAFALANAAQAKAAAFgIQAHgHAAgRQgBgOgFgJQgGgIgKAAQgNAAgFALg");
	this.shape_7.setTransform(138.7,77.675);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAFACACQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgcg");
	this.shape_8.setTransform(125.725,74.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKAMgQAAQgPAAgIgKg");
	this.shape_9.setTransform(117.925,76.05);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgJBEIAAiGIATAAIAACGg");
	this.shape_10.setTransform(110.65,73.95);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKAMgQAAQgPAAgIgKg");
	this.shape_11.setTransform(103.325,76.05);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AAuAxIAAg9QAAgJgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABBIgVAAIAAg+QAAgRgRAAQgNAAgFAKIAABFIgVAAIAAhfIAUAAIAAAKQAKgMASABQASAAAHAOQAKgOATAAQAQgBAIAKQAHAIAAARIAAA+g");
	this.shape_12.setTransform(90.525,75.85);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABDIgWAAIAAhfIAVAAIABALQAKgNAQABQAegBAAAjIAAA+g");
	this.shape_13.setTransform(73.2,75.85);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_14.setTransform(63.325,75.95);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgVAKgNQALgNARAAQAOAAAJAKIAAgwIAWAAIAACGIgUAAIgBgKQgJALgPABQgRAAgKgOgAgOgDQgFAGAAARQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAJg");
	this.shape_15.setTransform(53.175,74.05);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AASBDIAAg9QAAgJgFgDQgDgFgJAAQgLAAgHALIAABDIgWAAIAAiGIAWAAIAAAzQAKgNAQAAQAeABAAAhIAAA+g");
	this.shape_16.setTransform(213.5,48.35);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAOIAAArQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_17.setTransform(203.625,50.35);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgUA/QgLgFgEgHIAKgMQAKALAOAAQAJAAAHgFQAFgGAAgLIAAgHQgIALgPAAQgQAAgLgOQgLgNAAgXQAAgWAKgNQALgNASAAQAOAAAKALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgKAAgKgEgAgOgoQgFAIAAAQQAAAPAFAHQAGAIAJAAQAOAAAFgLIAAgpQgFgLgOAAQgJAAgGAJg");
	this.shape_18.setTransform(193.45,52.125);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgEQgEgFgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgNASAAQASAAAHAPQAKgPATAAQAQABAIAIQAHAJAAARIAAA9g");
	this.shape_19.setTransform(180.725,50.25);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALAAQAUAAAKANQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgMgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_20.setTransform(168.175,50.35);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgKAhIAAg1IgQAAIAAgQIAQAAIAAgXIAUAAIAAAXIARAAIAAAQIgRAAIAAA0QAAAGACACQACACAGAAIAHgBIAAARQgHACgHAAQgXAAAAgbg");
	this.shape_21.setTransform(160.025,49.3);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_22.setTransform(150.45,48.55);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgeA3QgLgOAAgXQAAgUAKgOQALgOARAAQAOAAAJALIAAgxIAWAAIAACGIgUAAIgBgKQgJAMgPAAQgRAAgKgNgAgOgEQgFAHAAARQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgnQgGgMgNAAQgJAAgGAIg");
	this.shape_23.setTransform(142.875,48.45);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgKBDIAAiGIAUAAIAACGg");
	this.shape_24.setTransform(131.2,48.35);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAOIAAArQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_25.setTransform(124.025,50.35);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAUAAIABAKQAGgNAPAAQAEAAADACIAAAUIgJgBQgOAAgFALIAABAg");
	this.shape_26.setTransform(116.4,50.25);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgfAkQgMgOAAgWIAAAAQAAgOAFgLQAGgLAKgHQAKgFAMgBQATAAAMANQAMAMABAVIAAAEQAAAOgFALQgGALgKAGQgKAHgNgBQgTAAgMgNgAgQgXQgGAIAAAQQAAAOAGAJQAGAIAKAAQALAAAGgIQAGgIAAgQQAAgPgGgIQgHgIgKAAQgKAAgGAIg");
	this.shape_27.setTransform(107.725,50.35);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgUA4IgCAKIgTAAIAAiGIAWAAIAAAyQAJgMAOAAQASAAAKAOQAKAMAAAXIAAABQAAAWgKANQgKANgRAAQgQAAgJgMgAgTAAIAAAmQAFANAOAAQAJAAAGgHQAFgIAAgPIAAgDQAAgQgFgGQgGgIgJAAQgOAAgFAMg");
	this.shape_28.setTransform(97.725,48.45);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAOIAAArQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_29.setTransform(87.575,50.35);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAOIAAArQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_30.setTransform(73.325,50.35);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgeA3QgLgOAAgXQAAgUAKgOQALgOARAAQAOAAAJALIAAgxIAWAAIAACGIgUAAIgBgKQgJAMgPAAQgRAAgKgNgAgOgEQgFAHAAARQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgnQgGgMgNAAQgJAAgGAIg");
	this.shape_31.setTransform(63.175,48.45);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAOIAAArQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_32.setTransform(53.425,50.35);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgoBDIAAiDIATAAIABAKQAJgMAPAAQASAAAKANQAJANAAAXIAAACQABAVgLANQgKANgQAAQgPAAgJgKIAAAtgAgTglIAAApQAFALANAAQAKAAAFgIQAHgHAAgRQgBgOgFgJQgGgIgKAAQgNAAgFALg");
	this.shape_33.setTransform(43.65,52.075);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgTAtQgJgEgGgIQgEgHAAgJIAVAAQAAAIAFAEQAFAFAIgBQAIABAFgEQAEgDAAgFQAAgGgFgDQgEgDgKgDQgLgCgHgDQgQgHAAgPQAAgMAKgIQAKgIAPgBQARABALAIQAKAJAAANIgVAAQAAgGgFgEQgEgFgIABQgFgBgFAEQgEADgBAFQAAAFAFADQAEADAMADQAMACAHAEQAIADADAFQAEAGgBAIQAAANgLAHQgKAJgRgBQgLAAgJgEg");
	this.shape_34.setTransform(221.8,24.75);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKALgQAAQgPAAgIgJg");
	this.shape_35.setTransform(212.175,24.85);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgVAAIAAhfIAUAAIAAALQALgNAQAAQAeAAABAjIAAA+g");
	this.shape_36.setTransform(202.2,24.65);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgEAKAAQARABAKAIQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_37.setTransform(192.325,24.75);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgJBCIAAhfIAUAAIAABfgAgIgtQgDgDAAgGQAAgEADgDQADgEAFAAQAGAAADAEQADADAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_38.setTransform(180.65,22.95);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AARBEIgbgqIgJAKIAAAgIgWAAIAAiGIAWAAIAABMIAGgIIAagdIAZAAIgjAnIAnA4g");
	this.shape_39.setTransform(174.225,22.75);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAUAAIAABfgAgIgtQgDgDAAgGQAAgEADgDQADgEAFAAQAGAAADAEQADADAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_40.setTransform(166.65,22.95);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgJBEIAAiGIATAAIAACGg");
	this.shape_41.setTransform(162.05,22.75);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgDAAgGQAAgEADgDQADgEAFAAQAGAAADAEQADADAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_42.setTransform(157.45,22.95);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AAuAxIAAg9QAAgJgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAHIAABAIgVAAIAAg+QAAgRgRAAQgNAAgFAKIAABFIgVAAIAAhfIAUAAIAAAKQAKgMASAAQASABAHAOQAKgOATgBQAQAAAIAJQAHAJAAARIAAA+g");
	this.shape_43.setTransform(147.325,24.65);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALAKQgFAJgKAEQgKAGgLgBQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_44.setTransform(134.775,24.75);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AAuAxIAAg9QAAgJgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAHIAABAIgVAAIAAg+QAAgRgRAAQgNAAgFAKIAABFIgVAAIAAhfIAUAAIAAAKQAKgMASAAQASABAHAOQAKgOATgBQAQAAAIAJQAHAJAAARIAAA+g");
	this.shape_45.setTransform(122.025,24.65);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgDAAgGQAAgEADgDQADgEAFAAQAGAAADAEQADADAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_46.setTransform(107.4,22.95);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABDIgWAAIAAhfIAVAAIABALQAKgNAQAAQAeAAAAAjIAAA+g");
	this.shape_47.setTransform(100.1,24.65);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAVAAIAABfgAgIgtQgDgDAAgGQAAgEADgDQADgEAFAAQAGAAADAEQADADAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_48.setTransform(92.8,22.95);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgWAAIAAhfIAVAAIAAALQALgNAQAAQAeAAABAjIAAA+g");
	this.shape_49.setTransform(81,24.65);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgEAKAAQARABAKAIQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_50.setTransform(71.125,24.75);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AAUAwIgUhBIgTBBIgSAAIgahfIAVAAIAPBAIAUhAIAPAAIAUBBIAPhBIAVAAIgaBfg");
	this.shape_51.setTransform(59.525,24.75);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALAKQgFAJgKAEQgKAGgLgBQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_52.setTransform(48.125,24.75);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AAdBAIAAg5Ig5AAIAAA5IgWAAIAAh/IAWAAIAAA1IA5AAIAAg1IAWAAIAAB/g");
	this.shape_53.setTransform(36.775,23.1);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.165,0,0,1.483,-145,-64.6)).s().p("A2qKFIAA0JMAtVAAAIAAUJg");
	this.shape_54.setTransform(128.45,53.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop11G3, new cjs.Rectangle(-16.6,-11.2,290.20000000000005,129), null);


(lib.drop11G2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape.setTransform(163.175,84.825);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgdAnQgJgIABgLQAAgPAKgGQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEAEQgEADgBAFIgTAAQAAgHAEgHQAFgGAJgEQAIgEAJABQAQAAAKAIQAJAHAAAOIAAAoQAAAMADAIIAAABIgUAAIgCgIQgKAKgNgBQgNAAgJgHgAgLAHQgHAEABAHQAAAGADADQAFAEAGgBQAFAAAFgCQAGgDACgFIAAgRIgLAAQgKAAgFAEg");
	this.shape_1.setTransform(153.85,84.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgUA7QgJgEgFgHIAKgLQAJALANgBQAJAAAHgFQAFgGAAgKIAAgGQgIAJgOAAQgPAAgKgMQgLgNABgUQAAgWAJgMQAKgMAQAAQAOAAAKAKIABgJIASAAIAABXQAAARgMAKQgKALgSAAQgKAAgKgFgAgNgmQgFAIgBAPQABAOAFAGQAGAIAIAAQANAAAFgKIAAgmQgGgLgMAAQgIAAgGAIg");
	this.shape_2.setTransform(144.25,86.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_3.setTransform(134.875,84.825);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgbAjQgMgMABgVIAAgCQAAgNAEgKQAGgKAJgHQAJgFALAAQATAAAJALQALAMAAAWIAAAHIg7AAQACAKAGAHQAHAGAJAAQAOABAIgMIALAKQgGAJgIAFQgKADgKAAQgTABgMgMgAgLgYQgGAHgBAKIAlAAIAAgCQAAgKgFgFQgFgGgIAAQgIABgEAFg");
	this.shape_4.setTransform(125.7,84.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_5.setTransform(118.875,83.025);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgfBCIAviDIAQAAIgvCDg");
	this.shape_6.setTransform(108.925,83.875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_7.setTransform(103.575,83.025);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgdAnQgIgIAAgLQAAgPAKgGQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgEADgBAFIgTAAQgBgHAGgHQAEgGAIgEQAJgEAJABQAQAAAKAIQAJAHAAAOIAAAoQAAAMADAIIAAABIgUAAIgCgIQgKAKgNgBQgNAAgJgHgAgLAHQgHAEAAAHQAAAGAEADQAFAEAGgBQAFAAAFgCQAGgDACgFIAAgRIgLAAQgKAAgFAEg");
	this.shape_8.setTransform(96.8,84.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_9.setTransform(90.025,83.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgcA0QgKgNAAgVQAAgVAJgMQAKgMAQAAQAOAAAIAKIAAguIAUAAIAAB+IgSAAIgBgJQgJALgOgBQgQAAgJgMgAgNgDQgFAGAAAQQAAAOAFAHQAGAIAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_10.setTransform(82.825,83.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgdAnQgJgIABgLQgBgPALgGQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEAEQgEADgBAFIgTAAQAAgHAEgHQAFgGAJgEQAIgEAKABQAPAAAKAIQAJAHAAAOIAAAoQAAAMADAIIAAABIgUAAIgCgIQgKAKgNgBQgNAAgJgHgAgMAHQgFAEAAAHQAAAGADADQAFAEAGgBQAFAAAFgCQAGgDACgFIAAgRIgLAAQgKAAgGAEg");
	this.shape_11.setTransform(73.65,84.9);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgXAuIAAhZIATAAIABAKQAGgMAOAAIAGABIAAATIgIAAQgNAAgFAKIAAA9g");
	this.shape_12.setTransform(66.45,84.825);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AARBAIAAg6QAAgIgEgEQgEgEgIAAQgLAAgGAKIAABAIgUAAIAAh/IAUAAIAAAwQAKgMAOAAQAdAAAAAgIAAA7g");
	this.shape_13.setTransform(54.075,83.025);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_14.setTransform(44.625,84.975);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgTA2IgBAJIgSAAIAAh+IAUAAIAAAuQAIgKAOAAQARAAAJALQAJANAAAVIAAABQAAAVgJANQgJAMgRgBQgOABgJgLgAgSAAIAAAlQAFALANAAQAJAAAFgHQAFgHAAgOIAAgCQAAgPgFgHQgFgHgJAAQgNAAgFALg");
	this.shape_15.setTransform(35.325,83.1);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_16.setTransform(25.625,84.975);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgWIATAAIAAAWIAQAAIAAAPIgQAAIAAAxQAAAFACADQACACAGAAIAHgBIAAAQIgOABQgWABAAgag");
	this.shape_17.setTransform(17.875,83.9);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgdAnQgIgIAAgLQAAgOAKgHQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgFADAAAFIgUAAQAAgHAGgHQAEgGAIgEQAJgDAJAAQAQAAAJAHQAKAJAAAOIAAAnQAAAMAEAIIAAABIgVAAIgDgIQgJAKgNAAQgNgBgJgHgAgLAGQgHAFAAAHQAAAGAFADQAEADAGAAQAFAAAFgCQAFgDADgFIAAgRIgLAAQgKAAgFADg");
	this.shape_18.setTransform(235.6,60.5);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_19.setTransform(226.275,60.575);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgcA0QgKgNAAgVQAAgVAJgMQAKgMAQAAQAOAAAIAKIAAguIAUAAIAAB+IgSAAIgBgJQgJAKgOABQgQAAgJgNgAgNgDQgFAGAAAQQAAAOAFAHQAGAIAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_20.setTransform(216.525,58.7);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgdAnQgJgIAAgLQAAgOALgHQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgFADABAFIgUAAQAAgHAEgHQAFgGAJgEQAIgDAKAAQAPAAAJAHQAKAJAAAOIAAAnQAAAMAEAIIAAABIgVAAIgDgIQgJAKgNAAQgOgBgIgHgAgMAGQgFAFAAAHQAAAGAEADQADADAHAAQAFAAAFgCQAFgDADgFIAAgRIgLAAQgKAAgGADg");
	this.shape_21.setTransform(201.7,60.5);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgXAuIAAhZIATAAIABAKQAGgMANAAIAHABIAAATIgIAAQgNAAgFAKIAAA9g");
	this.shape_22.setTransform(194.5,60.425);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgdAnQgJgIAAgLQAAgOALgHQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgEADAAAFIgUAAQAAgHAEgHQAFgGAJgEQAIgDAKAAQAPAAAKAHQAJAJAAAOIAAAnQAAAMADAIIAAABIgUAAIgDgIQgJAKgNAAQgNgBgJgHgAgMAGQgFAFAAAHQAAAGADADQAEADAHAAQAFAAAFgCQAFgDADgFIAAgRIgLAAQgKAAgGADg");
	this.shape_23.setTransform(186.5,60.5);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgWIATAAIAAAWIAQAAIAAAPIgQAAIAAAxQAAAFACADQACACAGAAIAHgBIAAAQIgOACQgWgBAAgZg");
	this.shape_24.setTransform(178.875,59.5);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_25.setTransform(171.525,60.425);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgdAnQgJgIAAgLQAAgOALgHQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgEADAAAFIgUAAQAAgHAEgHQAFgGAJgEQAIgDAKAAQAPAAAKAHQAJAJAAAOIAAAnQAAAMAEAIIAAABIgVAAIgDgIQgJAKgNAAQgNgBgJgHgAgMAGQgFAFAAAHQAAAGADADQAEADAHAAQAFAAAFgCQAFgDADgFIAAgRIgLAAQgKAAgGADg");
	this.shape_26.setTransform(162.2,60.5);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_27.setTransform(147.225,60.425);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgdAnQgJgIAAgLQAAgOALgHQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgEADAAAFIgUAAQAAgHAEgHQAFgGAJgEQAIgDAKAAQAPAAAKAHQAJAJAAAOIAAAnQAAAMADAIIAAABIgUAAIgDgIQgJAKgNAAQgNgBgJgHgAgMAGQgFAFAAAHQAAAGADADQAEADAHAAQAFAAAFgCQAFgDADgFIAAgRIgLAAQgKAAgGADg");
	this.shape_28.setTransform(137.9,60.5);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_29.setTransform(131.125,58.8);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgUA7QgJgEgFgHIAKgLQAJAKANABQAKgBAFgFQAHgGAAgKIAAgGQgKAKgNAAQgPAAgLgNQgJgNgBgUQAAgWAKgMQAKgMAQAAQAOgBAJALIABgJIASAAIAABWQABASgLAKQgMALgRAAQgKAAgKgFgAgNgmQgGAIABAPQgBAOAGAGQAGAIAIAAQAMAAAHgKIAAgmQgHgLgLAAQgKAAgFAIg");
	this.shape_30.setTransform(123.95,62.2);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgdAnQgJgIABgLQAAgOAKgHQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEAEQgEADgBAFIgTAAQAAgHAEgHQAFgGAJgEQAIgDAKAAQAPAAAKAHQAJAJAAAOIAAAnQAAAMADAIIAAABIgUAAIgCgIQgKAKgNAAQgNgBgJgHgAgLAGQgHAFABAHQAAAGADADQAFADAGAAQAFAAAFgCQAGgDACgFIAAgRIgLAAQgKAAgFADg");
	this.shape_31.setTransform(114.7,60.5);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgTA2IgBAJIgSAAIAAh+IAUAAIAAAuQAIgLAOABQARAAAJAMQAJAMAAAVIAAABQAAAVgJANQgJALgRABQgOgBgJgKgAgSAAIAAAlQAFALANAAQAJAAAFgHQAFgHAAgOIAAgCQAAgPgFgHQgFgHgJAAQgNAAgFALg");
	this.shape_32.setTransform(105.525,58.7);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_33.setTransform(90.175,60.575);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgWIATAAIAAAWIAQAAIAAAPIgQAAIAAAxQAAAFACADQACACAGAAIAHgBIAAAQIgOACQgWgBAAgZg");
	this.shape_34.setTransform(82.425,59.5);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgdAnQgIgIAAgLQAAgOAKgHQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgEADgBAFIgUAAQAAgHAGgHQAEgGAIgEQAJgDAJAAQAQAAAKAHQAJAJAAAOIAAAnQAAAMADAIIAAABIgUAAIgCgIQgKAKgNAAQgNgBgJgHgAgLAGQgHAFAAAHQABAGADADQAFADAGAAQAFAAAFgCQAGgDACgFIAAgRIgLAAQgKAAgFADg");
	this.shape_35.setTransform(75.2,60.5);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgSAqQgIgDgFgIQgFgGAAgIIAUAAQAAAHAFAEQAFADAHAAQAIAAAEgCQAEgEAAgFQAAgFgEgDQgEgCgKgCQgKgDgHgDQgPgGAAgOQAAgMAKgIQAKgHAOAAQAQAAAKAHQAKAIAAANIgVAAQAAgFgEgEQgEgFgHAAQgGAAgEAEQgEADAAAFQAAAEAEADQADADALADQAMACAHAEQAHACADAFQADAFAAAIQAAAMgKAHQgKAHgQABQgKAAgJgFg");
	this.shape_36.setTransform(66.175,60.5);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AARBAIAAg6QAAgIgEgEQgEgEgIAAQgLAAgGAKIAABAIgUAAIAAh/IAUAAIAAAwQAKgMAOAAQAdAAAAAgIAAA7g");
	this.shape_37.setTransform(51.475,58.625);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgdAnQgJgIABgLQgBgOALgHQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEAEQgEADAAAFIgUAAQAAgHAEgHQAFgGAJgEQAIgDAKAAQAPAAAKAHQAJAJAAAOIAAAnQAAAMADAIIAAABIgUAAIgCgIQgKAKgNAAQgNgBgJgHgAgMAGQgFAFAAAHQAAAGADADQAFADAGAAQAFAAAFgCQAGgDACgFIAAgRIgLAAQgKAAgGADg");
	this.shape_38.setTransform(42.15,60.5);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_39.setTransform(35.375,58.625);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgdAnQgIgIgBgLQAAgOALgHQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgFADAAAFIgUAAQAAgHAGgHQAEgGAIgEQAJgDAJAAQAQAAAJAHQAKAJAAAOIAAAnQAAAMAEAIIAAABIgVAAIgDgIQgJAKgNAAQgNgBgJgHgAgLAGQgHAFAAAHQAAAGAFADQAEADAGAAQAFAAAFgCQAFgDADgFIAAgRIgLAAQgKAAgFADg");
	this.shape_40.setTransform(28.6,60.5);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgSAqQgIgDgFgIQgFgGAAgIIAUAAQAAAHAFAEQAFADAHAAQAIAAAEgCQAEgEAAgFQAAgFgEgDQgEgCgKgCQgKgDgHgDQgPgGAAgOQAAgMAKgIQAKgHAOAAQAQAAAKAHQAKAIAAANIgVAAQAAgFgEgEQgEgFgHAAQgGAAgEAEQgEADAAAFQAAAEAEADQADADALADQAMACAHAEQAHACADAFQADAFAAAIQAAAMgKAHQgKAHgQABQgKAAgJgFg");
	this.shape_41.setTransform(19.575,60.5);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgdAnQgIgIAAgLQAAgPAKgGQALgIATAAIAMAAIAAgGQAAgHgEgEQgEgEgHAAQgGAAgFAEQgFADAAAFIgUAAQAAgIAGgGQAEgGAIgEQAJgEAJAAQAQABAJAHQAKAJAAAOIAAAnQAAANAEAGIAAACIgVAAIgDgIQgJAJgNABQgNAAgJgIgAgLAGQgHAFAAAHQAAAGAFADQAEADAGAAQAFAAAFgCQAFgEADgEIAAgRIgLAAQgKAAgFADg");
	this.shape_42.setTransform(235.6,36.1);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgcA0QgKgNAAgVQAAgVAJgMQAKgNAQAAQAOAAAIALIAAgvIAUAAIAAB/IgSAAIgBgJQgJAKgOABQgQAAgJgNgAgNgDQgFAGAAAQQAAAOAFAHQAGAIAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_43.setTransform(225.975,34.3);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgdAnQgJgIAAgLQAAgPALgGQALgIATAAIAMAAIAAgGQAAgHgEgEQgEgEgHAAQgHAAgEAEQgFADABAFIgVAAQABgIAFgGQAEgGAIgEQAJgEAJAAQAQABAJAHQAKAJAAAOIAAAnQAAANAEAGIAAACIgVAAIgDgIQgJAJgNABQgOAAgIgIgAgLAGQgGAFgBAHQAAAGAFADQAEADAGAAQAFAAAFgCQAFgEADgEIAAgRIgLAAQgKAAgFADg");
	this.shape_44.setTransform(216.8,36.1);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgmA/IAAh8IASAAIABAKQAJgLAOAAQARAAAJAMQAJAMAAAWIAAABQAAAVgJAMQgKAMgQAAQgNAAgJgKIAAArgAgSgjIAAAmQAFALANAAQAIAAAGgHQAFgIAAgPQAAgOgFgHQgGgJgJABQgMAAgFAKg");
	this.shape_45.setTransform(207.625,37.75);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgWIATAAIAAAWIAQAAIAAAPIgQAAIAAAyQAAAFACACQACACAGAAIAHgBIAAAQIgOACQgWgBAAgZg");
	this.shape_46.setTransform(180.925,35.1);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_47.setTransform(176.125,34.4);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgWAuIAAhZIATAAIAAAKQAGgMANAAIAHABIAAATIgIAAQgOAAgDAKIAAA9g");
	this.shape_48.setTransform(171.35,36.025);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AgdAiQgMgNAAgUIAAgBQAAgNAGgKQAFgLAJgGQAKgFALgBQASAAAMAMQALAMABATIAAAEQAAAOgFAJQgFALgKAGQgJAFgNABQgSAAgLgNgAgPgWQgGAJAAAOQAAAOAGAIQAGAHAJAAQAKABAGgJQAGgHAAgPQAAgNgGgJQgGgHgKgBQgJABgGAHg");
	this.shape_49.setTransform(163.075,36.1);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgmA/IAAh8IASAAIABAKQAJgLAOAAQARAAAJAMQAJAMAAAWIAAABQAAAVgJAMQgKAMgQAAQgNAAgJgKIAAArgAgSgjIAAAmQAFALANAAQAIAAAGgHQAFgIAAgPQAAgOgFgHQgGgJgJABQgMAAgFAKg");
	this.shape_50.setTransform(153.675,37.75);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AgbAiQgMgLABgUIAAgDQAAgNAEgKQAGgKAJgHQAJgFALgBQASAAALAMQAJAMABAVIAAAHIg7AAQACALAGAHQAHAGAJAAQANABAJgLIALAKQgFAIgJAEQgKAFgKAAQgTgBgMgMgAgLgXQgFAFgCALIAlAAIAAgCQAAgKgFgFQgEgFgJgBQgIAAgEAHg");
	this.shape_51.setTransform(144.25,36.1);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AgXAuIAAhZIATAAIABAKQAGgMAOAAIAGABIAAATIgIAAQgNAAgFAKIAAA9g");
	this.shape_52.setTransform(137,36.025);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AgcA0QgKgNAAgVQAAgVAJgMQAKgNAQAAQAOAAAIALIAAgvIAUAAIAAB/IgSAAIgBgJQgJAKgOABQgQAAgJgNgAgNgDQgFAGAAAQQAAAOAFAHQAGAIAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_53.setTransform(128.575,34.3);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgdAnQgIgIAAgLQAAgPAKgGQALgIASAAIANAAIAAgGQAAgHgEgEQgEgEgHAAQgGAAgFAEQgFADAAAFIgUAAQAAgIAGgGQAEgGAIgEQAJgEAJAAQAQABAJAHQAKAJAAAOIAAAnQAAANADAGIAAACIgUAAIgCgIQgKAJgNABQgNAAgJgIgAgLAGQgHAFAAAHQAAAGAFADQAEADAGAAQAFAAAFgCQAGgEACgEIAAgRIgLAAQgKAAgFADg");
	this.shape_54.setTransform(119.4,36.1);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AAsAuIAAg6QAAgIgFgEQgDgEgIAAQgIAAgEAEQgEADgCAGIAAA9IgTAAIAAg6QgBgQgPAAQgNAAgFAKIAABAIgTAAIAAhZIATAAIAAAJQAKgLAQAAQARAAAHAOQAJgOASAAQAPAAAHAIQAHAJABAQIAAA6g");
	this.shape_55.setTransform(107.4,36.025);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_56.setTransform(76.575,36.025);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AgdAnQgJgIAAgLQAAgPALgGQALgIATAAIAMAAIAAgGQAAgHgEgEQgEgEgHAAQgGAAgFAEQgEADAAAFIgUAAQAAgIAEgGQAFgGAJgEQAIgEAKAAQAPABAKAHQAJAJAAAOIAAAnQAAANADAGIAAACIgUAAIgDgIQgJAJgNABQgNAAgJgIgAgMAGQgFAFAAAHQAAAGADADQAEADAHAAQAFAAAFgCQAFgEADgEIAAgRIgLAAQgKAAgGADg");
	this.shape_57.setTransform(67.25,36.1);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AgTA7QgKgEgFgGIAKgMQAJAKAOABQAJgBAGgFQAFgGAAgKIAAgGQgIAKgOAAQgPAAgKgNQgKgNAAgUQAAgWAJgMQAKgNAQAAQAPAAAIALIABgJIASAAIAABWQAAASgLAKQgKALgSAAQgKgBgJgEgAgNgmQgFAIAAAPQAAAOAFAGQAFAIAJAAQANAAAFgKIAAgnQgFgKgNAAQgJAAgFAIg");
	this.shape_58.setTransform(57.65,37.8);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_59.setTransform(48.275,36.025);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_60.setTransform(41.375,34.4);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgWAuIAAhZIATAAIAAAKQAHgMAMAAIAIABIAAATIgJAAQgOAAgDAKIAAA9g");
	this.shape_61.setTransform(36.6,36.025);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AgdAnQgIgIgBgLQAAgPALgGQALgIATAAIAMAAIAAgGQAAgHgEgEQgEgEgHAAQgGAAgFAEQgFADAAAFIgUAAQAAgIAGgGQAEgGAIgEQAJgEAJAAQAQABAJAHQAKAJAAAOIAAAnQAAANAEAGIAAACIgVAAIgDgIQgJAJgNABQgNAAgJgIgAgLAGQgHAFAAAHQAAAGAFADQAEADAGAAQAFAAAFgCQAFgEADgEIAAgRIgLAAQgKAAgFADg");
	this.shape_62.setTransform(28.6,36.1);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AgSAqQgIgDgFgIQgFgGAAgJIAUAAQAAAIAFAEQAFADAHAAQAIAAAEgCQAEgDAAgFQAAgGgEgDQgEgCgKgDQgKgCgHgDQgPgGAAgOQAAgMAKgIQAKgHAOgBQAQABAKAHQAKAJAAAMIgVAAQAAgFgEgEQgEgFgHAAQgGAAgEADQgEAEAAAFQAAAEAEADQADADALADQAMACAHADQAHADADAFQADAFAAAIQAAAMgKAHQgKAIgQAAQgKAAgJgFg");
	this.shape_63.setTransform(19.575,36.1);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AgTA8QgKgFgFgGIAKgNQAJAMAOAAQAIAAAGgGQAHgFgBgLIAAgGQgJAKgNAAQgQAAgJgNQgLgMAAgWQAAgUAKgNQAKgNAQAAQAOAAAJALIABgJIASAAIAABWQABASgLAKQgLALgSgBQgKAAgJgDgAgNgmQgGAIABAPQgBANAGAHQAGAIAIAAQANAAAFgKIAAgnQgFgKgNAAQgJAAgFAIg");
	this.shape_64.setTransform(235.2,13.4);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_65.setTransform(225.825,11.625);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AgaAiQgNgMAAgTIAAgDQABgMAFgLQAFgKAJgGQAJgGALgBQATAAAJAMQALAMgBAVIAAAHIg5AAQAAALAHAHQAGAGAJABQAPgBAIgKIALAKQgFAIgKAEQgIAFgMAAQgSAAgLgNgAgMgXQgFAFgBALIAmAAIAAgCQgBgKgFgFQgFgFgIgBQgHAAgGAHg");
	this.shape_66.setTransform(216.65,11.7);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AgmA/IAAh8IASAAIABAKQAJgLAOAAQARAAAJAMQAJAMAAAWIAAABQAAAVgJAMQgKAMgQAAQgNAAgJgKIAAArgAgSgjIAAAmQAFALANAAQAIAAAGgHQAFgHAAgQQAAgOgFgHQgGgIgJAAQgMAAgFAKg");
	this.shape_67.setTransform(207.425,13.35);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AAsAuIAAg6QgBgIgEgEQgDgEgIAAQgIAAgEAEQgFADgBAGIAAA9IgTAAIAAg6QgBgQgPAAQgNAAgEAKIAABAIgUAAIAAhZIATAAIAAAJQAKgLAQAAQARAAAGAOQAKgOASAAQAPAAAHAIQAIAJAAAQIAAA6g");
	this.shape_68.setTransform(195.05,11.625);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2C3E50").s().p("AgbAiQgLgMAAgTIAAgDQAAgMAEgLQAGgKAJgGQAKgGAKgBQATAAAJAMQAKAMAAAVIAAAHIg5AAQABALAGAHQAHAGAJABQAOgBAIgKIALAKQgGAIgIAEQgKAFgLAAQgSAAgMgNgAgLgXQgFAFgCALIAlAAIAAgCQAAgKgFgFQgFgFgIgBQgIAAgEAHg");
	this.shape_69.setTransform(183.2,11.7);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2C3E50").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_70.setTransform(176.375,9.825);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_71.setTransform(164.225,10);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2C3E50").s().p("AAQBAIgagnIgJAJIAAAeIgTAAIAAh/IATAAIAABJIAHgIIAYgbIAYAAIghAkIAlA1g");
	this.shape_72.setTransform(158.2,9.825);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_73.setTransform(151.025,10);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#2C3E50").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_74.setTransform(146.675,9.825);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_75.setTransform(142.325,10);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#2C3E50").s().p("AArAuIAAg6QAAgIgDgEQgEgEgIAAQgIAAgEAEQgFADgBAGIAAA9IgTAAIAAg6QAAgQgQAAQgMAAgFAKIAABAIgVAAIAAhZIAUAAIAAAJQAKgLAQAAQARAAAGAOQAKgOASAAQAPAAAHAIQAIAJAAAQIAAA6g");
	this.shape_76.setTransform(132.75,11.625);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#2C3E50").s().p("AgaAiQgNgMAAgTIAAgDQABgMAEgLQAGgKAJgGQAKgGAKgBQASAAAKAMQALAMgBAVIAAAHIg5AAQABALAGAHQAHAGAIABQAPgBAIgKIALAKQgGAIgJAEQgIAFgMAAQgSAAgLgNgAgMgXQgFAFgBALIAlAAIAAgCQAAgKgFgFQgEgFgJgBQgHAAgGAHg");
	this.shape_77.setTransform(120.9,11.7);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#2C3E50").s().p("AAsAuIAAg6QAAgIgFgEQgDgEgJAAQgGAAgFAEQgEADgCAGIAAA9IgTAAIAAg6QgBgQgQAAQgMAAgFAKIAABAIgTAAIAAhZIATAAIAAAJQAJgLARAAQARAAAHAOQAJgOASAAQAPAAAHAIQAHAJAAAQIAAA6g");
	this.shape_78.setTransform(108.85,11.625);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_79.setTransform(91.475,10);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_80.setTransform(84.575,11.625);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_81.setTransform(77.675,10);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_82.setTransform(62.975,11.625);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#2C3E50").s().p("AgdAnQgJgIAAgLQAAgPALgGQALgIATAAIAMAAIAAgGQAAgHgEgEQgEgEgHAAQgGAAgFADQgFAEABAFIgUAAQAAgIAEgFQAFgHAJgEQAIgEAKAAQAPABAJAHQAKAJAAAOIAAAnQAAANAEAGIAAACIgVAAIgDgIQgJAJgNABQgOAAgIgIgAgMAGQgFAFAAAHQAAAFAEAEQADADAHABQAFAAAFgDQAGgDACgFIAAgRIgLAAQgKAAgGADg");
	this.shape_83.setTransform(53.65,11.7);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#2C3E50").s().p("AATAtIgTg8IgSA8IgQAAIgZhZIAUAAIAOA8IATg8IAOAAIASA9IAPg9IATAAIgYBZg");
	this.shape_84.setTransform(42.725,11.7);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#2C3E50").s().p("AgbAiQgLgMAAgTIAAgDQAAgMAEgLQAGgKAJgGQAKgGAKgBQATAAAJAMQAKAMAAAVIAAAHIg5AAQABALAGAHQAHAGAJABQAOgBAIgKIALAKQgGAIgIAEQgKAFgLAAQgSAAgMgNgAgLgXQgFAFgCALIAlAAIAAgCQAAgKgFgFQgFgFgIgBQgIAAgEAHg");
	this.shape_85.setTransform(32,11.7);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#2C3E50").s().p("AAbA8IAAg1Ig1AAIAAA1IgVAAIAAh3IAVAAIAAAyIA1AAIAAgyIAVAAIAAB3g");
	this.shape_86.setTransform(21.275,10.15);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.165,0,0,1.778,-145,-77.5)).s().p("A2qMFIAA4JMAtVAAAIAAYJg");
	this.shape_87.setTransform(128.45,52.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop11G2, new cjs.Rectangle(-16.6,-24.7,290.20000000000005,154.7), null);


(lib.drop11G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgcA3QgMgKgBgQIAVAAQABAJAFAFQAGAEAIABQAKAAAFgIQAFgGAAgNQAAgLgGgHQgGgGgJAAQgGAAgEACQgEABgFAEIgRgEIAHhAIBEAAIAAATIgyAAIgEAeQAJgFAKAAQATAAAKAMQAKAKAAAUQAAATgLAMQgMAMgTAAQgRAAgLgKg");
	this.shape.setTransform(164.525,58.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgLAAgHAMIAABCIgWAAIAAhdIAVAAIABALQAKgOAQAAQAeABAAAhIAAA+g");
	this.shape_1.setTransform(149.7,60.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAOIAAArQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_2.setTransform(139.825,60.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgUA/QgLgFgFgHIAKgMQALALAOAAQAJAAAHgFQAFgGAAgLIAAgHQgIALgPAAQgQAAgLgOQgLgNAAgXQAAgWALgNQAKgNASAAQAOAAAKALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgJgEgAgOgoQgFAIAAAQQAAAPAFAHQAGAIAJAAQAOAAAFgLIAAgpQgFgLgOAAQgJAAgGAJg");
	this.shape_3.setTransform(129.65,62.025);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABCIgVAAIAAhdIAUAAIABALQAKgOAQAAQAeABAAAhIAAA+g");
	this.shape_4.setTransform(119.75,60.15);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALAAQAUAAAKANQALANAAAWIAAAIIg9AAQABAMAGAHQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgMgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_5.setTransform(110.025,60.25);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgJBDIAAiGIAUAAIAACGg");
	this.shape_6.setTransform(102.8,58.25);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAUAAIABAKQAHgNAOAAQAEAAADACIgBAUIgIgBQgOAAgFAMIAAA/g");
	this.shape_7.setTransform(97.75,60.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALAAQAUAAAKANQALANAAAWIAAAIIg9AAQABAMAGAHQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgMgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_8.setTransform(89.425,60.25);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgUA4IgCAKIgTAAIAAiGIAWAAIAAAyQAJgMAOAAQASAAAKAOQAKAMAAAXIAAABQAAAWgKANQgKANgRAAQgQAAgJgMgAgTAAIAAAmQAFANAOAAQAJAAAGgHQAFgIAAgPIAAgDQAAgQgFgGQgGgIgJAAQgOAAgFAMg");
	this.shape_9.setTransform(79.625,58.35);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AASBEIAAg+QAAgIgEgFQgFgEgIAAQgMAAgGALIAABEIgVAAIAAiGIAVAAIAAAyQAKgNAPAAQAfAAAAAjIAAA+g");
	this.shape_10.setTransform(181.85,32.65);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKALgQAAQgPAAgIgJg");
	this.shape_11.setTransform(171.825,34.75);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgUA4IgCALIgTAAIAAiGIAWAAIAAAwQAJgLAOAAQASAAAKANQAKAOAAAVIAAACQAAAWgKANQgKANgRAAQgQAAgJgMgAgTAAIAAAnQAFAMAOAAQAJAAAGgIQAFgHAAgPIAAgDQAAgPgFgHQgGgIgJAAQgOAAgFAMg");
	this.shape_12.setTransform(161.975,32.75);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKALgQAAQgPAAgIgJg");
	this.shape_13.setTransform(151.675,34.75);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAFACACQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgcg");
	this.shape_14.setTransform(143.475,33.6);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAUAAIAABfgAgIgtQgDgDAAgGQAAgEADgDQADgEAFAAQAGAAADAEQADADAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_15.setTransform(133.9,32.85);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgVAAIAAhfIAUAAIAAALQALgNAQAAQAeAAABAjIAAA+g");
	this.shape_16.setTransform(126.6,34.55);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgDAAgGQAAgEADgDQADgEAFAAQAGAAADAEQADADAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_17.setTransform(119.3,32.85);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABDIgVAAIAAhfIAUAAIABALQAKgNAQAAQAeAAAAAjIAAA+g");
	this.shape_18.setTransform(107.5,34.55);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgEAKAAQARABAKAIQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_19.setTransform(97.625,34.65);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AAUAwIgUhBIgTBBIgSAAIgahfIAVAAIAPBAIAUhAIAPAAIAUBBIAPhBIAVAAIgaBfg");
	this.shape_20.setTransform(86.025,34.65);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALAKQgFAJgKAEQgKAGgLgBQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_21.setTransform(74.625,34.65);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AAdBAIAAg5Ig5AAIAAA5IgWAAIAAh/IAWAAIAAA2IA5AAIAAg2IAWAAIAAB/g");
	this.shape_22.setTransform(63.275,33);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.176,0,0,1.048,-146.5,-45.6)).s().p("A24HIIAAuPMAtxAAAIAAOPg");
	this.shape_23.setTransform(121.925,48.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop11G1, new cjs.Rectangle(-24.5,3.2,292.9,91.2), null);


(lib.drag11GJudul = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgSAXQgEgFAAgGQABgJAGgDQAHgFALAAIAHABIABgFIAAgDQgBgFgGgBQgEAAgBACQgDACgBAEIgMAAQABgFADgEQADgEAFgCQAFgCAFAAQAJABAFAFQAEAFAAAIIgEAYIgBAEIABAFIAAABIgMAAIAAgEQgHAFgGAAQgHABgFgFgAgGAEQgDADgBAEQAAADABACQACACAEAAQADAAACgCIAGgFIABgKIgFAAQgGAAgEADg");
	this.shape.setTransform(119.075,23.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgMAYQgGgDgCgGQgCgGAAgHIAAgCQABgHAEgGQAEgHAGgDQAFgDAGgBQAKABAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgHIAGAGQgDAFgGADQgFADgGgBQgGABgFgEgAgJgEIAVAAIAAgBIAAgEQgBgDgCgDQgCgBgEgBQgIAAgEANg");
	this.shape_1.setTransform(114.0292,23.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgVAgQgEgFgBgKIAAgFIABgBQABgJADgFQADgGAFgEQAFgDAHAAQAHAAAEAGIAFgbIAMAAIgNBKIgKAAIAAgGQgFAHgIAAQgIAAgEgGgAgKgBQgEAGAAAKQgBAGADADQACAFAEAAQAGAAAFgHIAEgWQgCgGgHAAIAAAAQgGAAgEAFg");
	this.shape_2.setTransform(108.875,22.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgLAkIAJg0IALAAIgJA0gAABgZQAAAAgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAgBQADgCACAAQABAAABABQAAAAABAAQAAAAABABQABAAAAAAQAAABABAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAgBAAIgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBg");
	this.shape_3.setTransform(104.75,22.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgOAYQgFgEgCgFQgCgHAAgHIAAgBQABgHAEgGQAEgGAFgEQAGgDAGgBQAHABAFAEQAFADACAGQADAGgBAHQgBAIgEAHQgDAGgGAEQgGACgGAAQgHABgFgEgAgIgKQgCAFgBAFIAAAHQAAAEACAEQADADAEAAQAFAAAEgEQAEgGABgIIABgDQAAgHgDgDQgCgDgFgBQgHAAgEAHg");
	this.shape_4.setTransform(100.5843,23.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgRAbIAJg0IAKAAIgBAGQAFgHAHAAIAFABIgBALIgFAAQgIAAgEAGIgFAjg");
	this.shape_5.setTransform(96.275,23.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgMAYQgGgDgCgGQgCgGAAgHIAAgCQABgHAEgGQAEgHAGgDQAFgDAGgBQAKABAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgHIAGAGQgDAFgGADQgFADgGgBQgGABgFgEgAgJgEIAVAAIAAgBIAAgEQgBgDgCgDQgCgBgEgBQgIAAgEANg");
	this.shape_6.setTransform(91.8292,23.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgIAdQgDgEAAgHIAFgdIgIAAIABgJIAJAAIACgMIAKAAIgCAMIAJAAIgBAJIgJAAIgFAdIAAACQAAADAEAAIAEAAIgBAJIgHABQgFAAgDgEg");
	this.shape_7.setTransform(87.725,22.525);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgQAXQgGgGAAgHIALAAQAAAEADACQACACAFAAQADABADgCQADgCAAgDQABgFgHgCIgJgDQgKgDAAgJQABgHAGgEQAGgGAIAAQAIABAGAFQAFAEAAAHIgMAAQAAgDgCgCQgCgCgEgBQgDAAgCACQgDACAAAEQgBAEAGACIAKADQAKADAAAJQgBAFgDAEQgDADgFACQgFACgFAAQgJAAgFgEg");
	this.shape_8.setTransform(83.275,23.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AAUAjIgEgQIgZAAIgIAQIgOAAIAmhGIALAAIANBGgAgEAJIATAAIgFgcg");
	this.shape_9.setTransform(77.05,22.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgKAZQgFgCgDgFQgDgEAAgEIAMAAQAAAEADACQADACADAAQAFAAADgBQACgCAAgDQAAgDgCgCQgDgBgFgBIgKgEQgJgDAAgJQAAgGAFgEQAGgFAIgBQAKABAGAFQAFAEAAAHIgMAAQABgDgDgCQgDgDgEAAQgCAAgDADQgCABgBADQABADACACQACABAGACIALADQAEACACADQACACAAAFQAAAGgGAFQgGAFgKgBQgFAAgFgCg");
	this.shape_10.setTransform(182.75,7.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_11.setTransform(177.525,7.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgFAlIAAhKIALAAIAABKg");
	this.shape_12.setTransform(173.525,6);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_13.setTransform(169.625,7.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AAOAjIgVgeIgIAJIAAAVIgMAAIAAhGIAMAAIAAAiIAHgJIAUgZIAPAAIgbAgIAcAmg");
	this.shape_14.setTransform(164.125,6.2);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_15.setTransform(152.825,7.05);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_16.setTransform(147.375,7.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AALAaIgLgjIgKAjIgKAAIgPg0IAMAAIAIAkIAMgkIAIAAIALAkIAIgkIALAAIgOA0g");
	this.shape_17.setTransform(140.9,7.1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_18.setTransform(134.575,7.1);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AAKAlIAAghQAAgFgCgCQgDgCgEgBQgGAAgEAGIAAAlIgMAAIAAhKIAMAAIAAAcQAGgGAIgBQARABAAASIAAAig");
	this.shape_19.setTransform(129.075,6);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAHAAIAFABIAAALIgFgBQgIABgCAGIAAAjg");
	this.shape_20.setTransform(122.3,7.05);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_21.setTransform(117.625,7.1);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAIQAFAGAAANIAAAAQAAANgFAGQgGAIgJAAQgJAAgFgHgAgKAAIAAAVQADAIAHAAQAFgBADgEQADgEAAgJIAAgBQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_22.setTransform(112.175,6.05);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AAaAbIAAgiQAAgEgCgDQgDgCgFAAQgEAAgDACQgCADgBADIAAAjIgLAAIAAgiQAAgJgKAAQgHAAgDAGIAAAlIgLAAIAAg0IAKAAIABAGQAFgHALAAQAJAAAEAJQAFgJALAAQAJAAAEAFQAFAFgBAJIAAAig");
	this.shape_23.setTransform(104.9,7.05);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_24.setTransform(97.875,7.1);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgLAjQgFgCgDgEIAFgHQAGAGAIAAQAFAAADgDQADgDAAgHIAAgDQgFAGgHgBQgJABgGgIQgGgHAAgNQAAgMAGgHQAFgIAKAAQAIAAAFAHIABgGIAKAAIAAAzQAAAKgGAHQgHAFgKABQgFAAgGgDgAgHgWQgDAFAAAIQAAAJADAEQADAEAFAAQAHAAADgGIAAgXQgDgFgHgBQgFAAgDAFg");
	this.shape_25.setTransform(92.225,8.1);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AAKAlIAAghQAAgFgCgCQgDgCgEgBQgGAAgEAGIAAAlIgMAAIAAhKIAMAAIAAAcQAGgGAIgBQARABAAASIAAAig");
	this.shape_26.setTransform(84.225,6);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgRAUQgGgHgBgNIAAAAQAAgHADgGQADgHAGgDQAFgEAHAAQAKABAIAGQAGAIABALIAAABQgBAJgDAGQgDAFgFAEQgGADgHAAQgKABgHgIgAgIgMQgEAFAAAHQAAAJAEAFQADAEAFAAQAGAAAEgEQACgFAAgJQABgHgEgFQgDgFgGAAQgFAAgDAFg");
	this.shape_27.setTransform(78.6,7.1);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgGASIAAgdIgIAAIAAgJIAIAAIAAgMIAMAAIAAAMIAJAAIAAAJIgJAAIAAAdIABAEIAEABIAEAAIAAAJIgIABQgNAAAAgPg");
	this.shape_28.setTransform(73.95,6.525);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_29.setTransform(69.625,7.05);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgRAUQgGgHAAgNIAAAAQAAgHACgGQADgHAGgDQAGgEAGAAQAKABAIAGQAGAIAAALIAAABQAAAJgCAGQgDAFgGAEQgFADgIAAQgKABgHgIgAgIgMQgEAFAAAHQAAAJAEAFQADAEAFAAQAGAAAEgEQADgFAAgJQgBgHgDgFQgDgFgGAAQgFAAgDAFg");
	this.shape_30.setTransform(64,7.1);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgNIAAAAQAAgMAHgHQAGgIAKAAQAKAAAGAGQAFAGABAJIgLAAQgBgFgDgDQgCgDgFAAQgFAAgDAFQgDADAAAJIAAABQAAAJADAEQADAEAFAAQAEAAADgDQADgCABgEIALAAQAAAFgDAEQgDAEgFADQgFACgGAAQgKAAgGgGg");
	this.shape_31.setTransform(58.625,7.1);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_32.setTransform(50.775,7.1);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_33.setTransform(45.325,8.075);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_34.setTransform(39.725,7.1);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgNAbIAAg0IAMAAIAAAGQADgHAIAAIAEABIgBALIgEgBQgIABgCAGIAAAjg");
	this.shape_35.setTransform(35.5,7.05);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_36.setTransform(30.875,7.1);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAIQAFAGAAANIAAAAQAAANgFAGQgGAIgJAAQgJAAgFgHgAgKAAIAAAVQADAIAHAAQAFgBADgEQADgEAAgJIAAgBQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_37.setTransform(25.425,6.05);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_38.setTransform(19.875,7.1);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgZAjIAAhGIAZAAQALAAAGAFQAHAFAAAKQAAAEgDAFQgCADgFACQAFABAEAFQADAEgBAGQAAAKgGAFQgHAGgMgBgAgMAZIANAAQAGABADgDQADgDAAgFQAAgMgLABIgOAAgAgMgEIAMAAQAFgBADgCQADgDAAgEQAAgGgDgCQgDgCgFAAIgMAAg");
	this.shape_39.setTransform(14.1,6.2);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFE319").s().p("AvSikIelgJIAAFRI+lAKg");
	this.shape_40.setTransform(98.125,14.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0.3,-3.1,195.7,34.8);


(lib.drag11G13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._16();
	this.instance.setTransform(0,-3,0.2813,0.2397);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgLAlIAJg0IALAAIgJA0gAABgYQAAgBgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQACgCAEgBQAAAAABABQAAAAABAAQAAAAABABQABAAAAABQABAAAAAAQAAABABAAQAAABAAABQAAAAAAABQAAABAAAAQAAABAAAAQgBABAAAAQAAABgBABQAAAAgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgCAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape.setTransform(61.25,87.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgQAWQgGgEAAgIIALAAQAAAEADACQACADAFAAQADAAADgCQADgCAAgDQABgFgHgCIgJgDQgKgDAAgJQABgHAGgFQAGgEAIAAQAIAAAGAEQAFAFAAAHIgMAAQAAgDgCgCQgCgCgEAAQgDAAgCACQgDABAAADQgBAFAGABIAKAEQAKADAAAJQgBAFgDAEQgDAEgFABQgFADgFAAQgJgBgFgFg");
	this.shape_1.setTransform(57.275,88.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgMAYQgGgDgCgGQgCgGAAgHIAAgCQABgHAEgHQAEgGAGgDQAFgDAGAAQAKAAAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgGIAGAGQgDAFgGACQgFADgGAAQgGAAgFgEgAgJgEIAVAAIAAgBIAAgEQgBgDgCgCQgCgCgEgBQgIAAgEANg");
	this.shape_2.setTransform(52.2792,88.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgMAfIgBAGIgLAAIANhKIALAAIgFAcQAFgHAIAAQAIABAEAFQAFAFAAAIIAAAIQgBAIgEAHQgDAGgFADQgFADgGAAQgIAAgFgHgAgGAAIgEAVQACAHAIAAQAEAAAEgEQAEgFABgIIAAgHQAAgEgCgDQgCgDgEAAIgBAAQgGAAgEAGg");
	this.shape_3.setTransform(46.725,87.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgRAbIAJg0IAKAAIgBAGQAFgHAHAAIAFABIgBALIgFgBQgIAAgEAHIgFAjg");
	this.shape_4.setTransform(42.575,88.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgOAYQgFgDgCgHQgCgGAAgHIAAgBQABgHAEgGQAEgGAFgEQAGgDAGAAQAHAAAFAEQAFADACAGQADAGgBAHQgBAIgEAGQgDAHgGADQgGAEgGAAQgHAAgFgEgAgIgKQgCAFgBAFIAAAGQAAAGACADQADADAEAAQAFAAAEgFQAEgFABgHIABgFQAAgFgDgEQgCgEgFAAQgHAAgEAHg");
	this.shape_5.setTransform(37.8843,88.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgRAmIAHgrIgIAAIACgJIAIAAIABgFQABgIAFgFQAFgFAIAAIAHABIgBAJIgFAAQgEAAgDACQgCACgBAEIgBAFIALAAIgCAJIgKAAIgHArg");
	this.shape_6.setTransform(33.975,87.5977);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgQAWQgGgEAAgIIALAAQAAAEADADQACACAFAAQADgBADgBQADgCAAgDQABgFgHgCIgJgDQgKgDAAgJQABgHAGgFQAGgEAIAAQAIAAAGAEQAFAFAAAIIgMAAQAAgEgCgCQgCgDgEABQgDAAgCABQgDACAAAEQgBAEAGABIAKAEQAKADAAAJQgBAFgDAEQgDAEgFACQgFACgFAAQgJAAgFgGg");
	this.shape_7.setTransform(62.575,72.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgSAXQgEgEAAgHQABgIAGgEQAHgFALAAIAHAAIABgDIAAgEQgBgFgGAAQgEAAgBABQgDADgBADIgMAAQABgFADgDQADgFAFgCQAFgBAFAAQAJAAAFAFQAEAFAAAIIgEAYIgBAEIABAGIAAABIgMAAIAAgGQgHAHgGAAQgHgBgFgEgAgGAEQgDACgBAFQAAADABACQACACAEAAQADAAACgBIAGgGIABgJIgFAAQgGAAgEACg");
	this.shape_8.setTransform(57.375,72.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgLAlIAJg0IALAAIgJA0gAABgYQgBgBAAAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQACgCACAAQABAAABAAQAAAAABAAQAAAAABABQAAAAABABQAAAAABAAQAAABABAAQAAABAAABQAAAAAAABQAAABAAAAQAAABAAAAQgBABAAAAQgBABAAABQAAAAgBAAQAAAAgBABQAAAAgBAAQgBAAgBAAIgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_9.setTransform(53.75,71.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgRAbIAJg0IAKAAIgBAGQAFgHAHAAIAFABIgBALIgFAAQgIgBgEAHIgFAjg");
	this.shape_10.setTransform(50.825,72.7);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgMAYQgGgEgCgFQgCgGAAgHIAAgCQABgHAEgHQAEgGAGgDQAFgEAGABQAKAAAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgHIAGAHQgDAEgGADQgFACgGABQgGgBgFgDgAgJgEIAVAAIAAgBIAAgEQgBgEgCgCQgCgCgEAAQgIAAgEANg");
	this.shape_11.setTransform(46.3792,72.75);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgIAdQgDgEAAgHIAFgdIgIAAIABgJIAJAAIACgMIAKAAIgCAMIAJAAIgBAJIgJAAIgFAdIAAACQAAADAEAAIAEAAIgBAJIgHABQgFAAgDgEg");
	this.shape_12.setTransform(42.275,72.175);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgQAWQgGgEAAgIIALAAQAAAEADADQACACAFAAQADgBADgBQADgCAAgDQABgFgHgCIgJgDQgKgDAAgJQABgHAGgFQAGgEAIAAQAIAAAGAEQAFAFAAAIIgMAAQAAgEgCgCQgCgDgEABQgDAAgCABQgDACAAAEQgBAEAGABIAKAEQAKADAAAJQgBAFgDAEQgDAEgFACQgFACgFAAQgJAAgFgGg");
	this.shape_13.setTransform(37.825,72.75);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AAUAkIgEgRIgZAAIgIARIgOAAIAmhGIALAAIANBGgAgEAJIATAAIgFgcg");
	this.shape_14.setTransform(31.6,71.85);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FF8C2D").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_15.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


(lib.drag11G12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap127();
	this.instance.setTransform(0,-3,0.3704,0.4459);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgMAYQgGgDgCgGQgCgGAAgHIAAgCQABgHAEgHQAEgGAGgDQAFgDAGAAQAKAAAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgHIAGAHQgDAEgGADQgFADgGgBQgGAAgFgDgAgJgEIAVAAIAAgBIAAgEQgBgEgCgCQgCgBgEgBQgIAAgEANg");
	this.shape.setTransform(74.9292,89.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgSAXQgEgFAAgGQABgIAGgEQAHgFALAAIAHAAIABgEIAAgDQgBgFgGgBQgEAAgBACQgDACgBAEIgMAAQABgFADgDQADgEAFgDQAFgCAFABQAJAAAFAFQAEAFAAAIIgEAYIgBAEIABAGIAAAAIgMAAIAAgFQgHAHgGgBQgHAAgFgEgAgGAEQgDACgBAFQAAADABACQACACAEAAQADAAACgBIAGgGIABgKIgFAAQgGABgEACg");
	this.shape_1.setTransform(69.525,89.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgMAYQgGgDgCgGQgCgGAAgHIAAgCQABgHAEgHQAEgGAGgDQAFgDAGAAQAKAAAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgHIAGAHQgDAEgGADQgFADgGgBQgGAAgFgDgAgJgEIAVAAIAAgBIAAgEQgBgEgCgCQgCgBgEgBQgIAAgEANg");
	this.shape_2.setTransform(64.4792,89.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AAHAbIAGghIAAgEQgBgGgGAAQgGAAgFAGIgHAlIgLAAIAJg0IALAAIgBAGQAGgHAIAAQAIABADAEQAEAGgBAJIgGAhg");
	this.shape_3.setTransform(58.8781,89.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgLAkIAJg0IALAAIgJA0gAABgZQAAAAgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAgBQADgBACAAQABAAABAAQAAAAABAAQAAAAABABQABAAAAAAQAAABABAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAgBAAIgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBg");
	this.shape_4.setTransform(55.25,88.15);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgRAYQgEgCgBgEQgCgFABgGIAGghIALAAIgGAhIAAAEQABAGAGABQAGAAAFgHIAHglIALAAIgJA0IgLAAIABgFQgFAGgJAAQgFAAgDgDg");
	this.shape_5.setTransform(51.2688,89.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgSAjQgFgDgDgEIAGgGQAFAGAIAAQAFAAADgDQAEgEACgFIABgEQgHAFgGAAQgIAAgEgFQgFgFAAgJIAAgHQABgIADgHQAEgGAFgDQAFgDAFAAQAJAAAFAGIABgGIALAAIgJAzQgBAKgHAHQgIAFgJAAQgGAAgFgCgAgFgWQgEAEgBAJIAAABIgBAGQABADACAEQACADAEAAQAGAAAFgHIAEgVQgDgHgGAAIgBAAQgFAAgDAFg");
	this.shape_6.setTransform(45.525,90.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgMAYQgGgDgCgGQgCgGAAgHIAAgCQABgHAEgHQAEgGAGgDQAFgDAGAAQAKAAAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgHIAGAHQgDAEgGADQgFADgGgBQgGAAgFgDgAgJgEIAVAAIAAgBIAAgEQgBgEgCgCQgCgBgEgBQgIAAgEANg");
	this.shape_7.setTransform(40.3292,89.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgSAXQgEgFAAgGQABgIAGgEQAHgFALAAIAHAAIABgEIAAgDQgBgFgGgBQgEAAgBACQgDACgBAEIgMAAQABgFADgDQADgEAFgDQAFgCAFABQAJAAAFAFQAEAFAAAIIgEAYIgBAEIABAGIAAAAIgMAAIAAgFQgHAHgGgBQgHAAgFgEgAgGAEQgDACgBAFQAAADABACQACACAEAAQADAAACgBIAGgGIABgKIgFAAQgGABgEACg");
	this.shape_8.setTransform(34.925,89.15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgMAaIgKg0IAMAAIAFAlIAQglIAMAAIgZA0g");
	this.shape_9.setTransform(30.375,89.15);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgOAYQgFgEgCgFQgCgHAAgHIAAgBQABgHAEgGQAEgGAFgEQAGgDAGAAQAHAAAFADQAFAEACAGQADAGgBAHQgBAIgEAHQgDAGgGAEQgGACgGAAQgHAAgFgDgAgIgJQgCAEgBAFIAAAHQAAAEACAEQADADAEAAQAFAAAEgEQAEgGABgIIABgDQAAgHgDgDQgCgDgFgBQgHAAgEAIg");
	this.shape_10.setTransform(24.7843,89.15);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AAHAbIAGghIAAgEQgBgGgGAAQgGAAgFAGIgHAlIgLAAIAJg0IALAAIgBAGQAGgHAIAAQAIABADAEQAEAGgBAJIgGAhg");
	this.shape_11.setTransform(19.0781,89.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgSAXQgEgEAAgHQABgJAGgDQAHgFALAAIAHABIABgFIAAgDQgBgFgGgBQgEAAgBACQgDADgBADIgMAAQABgFADgEQADgDAFgDQAFgCAFAAQAJABAFAFQAEAFAAAIIgEAXIgBAFIABAFIAAABIgMAAIAAgEQgHAFgGAAQgHABgFgFgAgGAEQgDACgBAFQAAADABACQACACAEAAQADAAACgCIAGgEIABgLIgFAAQgGAAgEADg");
	this.shape_12.setTransform(59.525,73.15);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgIAdQgDgEAAgHIAFgdIgIAAIABgJIAJAAIACgMIAKAAIgCAMIAJAAIgBAJIgJAAIgFAdIAAACQAAADAEAAIAEAAIgBAJIgHABQgFAAgDgEg");
	this.shape_13.setTransform(55.575,72.575);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgLAkIAJg0IALAAIgJA0gAABgZQAAAAgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAgBQACgCAEAAQAAAAABABQAAAAABAAQAAAAABABQABAAAAAAQABABAAAAQAAABABAAQAAABAAABQAAAAAAABQAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgCAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBg");
	this.shape_14.setTransform(52.6,72.15);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgNAYQgFgEgCgFQgDgHABgHIAAgBQABgHAEgGQADgHAGgDQAGgDAGgBQAJABAFAGQAFAFAAAIIgLAAQAAgEgCgDQgCgCgFgBQgFAAgEAGQgEAGgBAKQAAANAKAAQADAAADgDQADgCABgEIALAAQgBAFgDAEQgDAFgFACQgFACgFAAQgHABgEgEg");
	this.shape_15.setTransform(48.7107,73.15);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgLAlIAMhJIALAAIgMBJg");
	this.shape_16.setTransform(44.975,72.05);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgRAZQgEgDgBgEQgCgFABgFIAGgiIALAAIgGAiIAAADQABAGAGABQAGgBAFgGIAHglIALAAIgJA0IgLAAIABgFQgFAGgJAAQgFAAgDgCg");
	this.shape_17.setTransform(40.9688,73.2);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgRAhQgFgDgDgGQgDgFAAgIIABgOQADgKAEgHQAFgIAHgEQAHgDAHgBQAKABAHAGQAGAHAAALIgMAAQAAgIgDgDQgDgEgGAAQgGAAgGAGQgGAGgCAMIgBAFIAAAFIABAJQABAFADACQACADAFgBQAMABAEgOIANAAQgDAKgHAHQgJAHgLgBQgHAAgFgDg");
	this.shape_18.setTransform(35.15,72.25);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FF8C2D").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_19.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


(lib.drag11G11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap128();
	this.instance.setTransform(0,-3,0.3383,0.4459);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgSAXQgEgFAAgGQABgJAGgDQAHgFALAAIAHAAIABgDIAAgEQgBgFgGAAQgEAAgBACQgDACgBADIgMAAQABgFADgDQADgFAFgBQAFgCAFAAQAJAAAFAFQAEAFAAAIIgEAXIgBAFIABAGIAAABIgMAAIAAgGQgHAHgGAAQgHgBgFgEgAgGAEQgDADgBAEQAAADABACQACACAEAAQADAAACgBIAGgGIABgJIgFAAQgGgBgEADg");
	this.shape.setTransform(64.075,89.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgIAdQgDgEAAgHIAFgdIgIAAIABgJIAJAAIACgMIAKAAIgCAMIAJAAIgBAJIgJAAIgFAdIAAACQAAADAEAAIAEAAIgBAJIgHABQgFAAgDgEg");
	this.shape_1.setTransform(60.125,88.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgSAXQgEgFAAgGQABgJAGgDQAHgFALAAIAHAAIABgDIAAgEQgBgFgGAAQgEAAgBACQgDACgBADIgMAAQABgFADgDQADgFAFgBQAFgCAFAAQAJAAAFAFQAEAFAAAIIgEAXIgBAFIABAGIAAABIgMAAIAAgGQgHAHgGAAQgHgBgFgEgAgGAEQgDADgBAEQAAADABACQACACAEAAQADAAACgBIAGgGIABgJIgFAAQgGgBgEADg");
	this.shape_2.setTransform(55.525,89.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgSAjQgFgDgDgDIAGgIQAFAHAIAAQAFAAADgDQAEgDACgGIABgEQgHAFgGABQgIgBgEgFQgFgGAAgIIAAgHQABgIADgHQAEgFAFgEQAFgEAFABQAJAAAFAGIABgFIALAAIgJAyQgBALgHAFQgIAHgJgBQgGAAgFgCgAgFgWQgEAFgBAIIAAABIgBAFQABAFACACQACAEAEAAQAGAAAFgHIAEgWQgDgFgGAAIgBgBQgFAAgDAFg");
	this.shape_3.setTransform(50.125,90.3);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgLAlIAJg0IALAAIgJA0gAABgYQgBgBAAAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQACgCACAAQABAAABAAQAAAAABAAQAAAAABABQAAAAABABQAAAAABAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAABQAAAAgBAAQAAAAgBABQAAAAgBAAQgBAAgBAAIgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAg");
	this.shape_4.setTransform(46.35,88.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgMAbIgKg0IAMAAIAFAkIAQgkIAMAAIgZA0g");
	this.shape_5.setTransform(42.925,89.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgMAYQgGgEgCgFQgCgGAAgHIAAgCQABgHAEgHQAEgGAGgDQAFgEAGABQAKAAAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgHIAGAHQgDAFgGACQgFACgGABQgGgBgFgDgAgJgEIAVAAIAAgBIAAgEQgBgDgCgCQgCgDgEAAQgIAAgEANg");
	this.shape_6.setTransform(37.5792,89.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgSAXQgEgFAAgGQABgJAGgDQAHgFALAAIAHAAIABgDIAAgEQgBgFgGAAQgEAAgBACQgDACgBADIgMAAQABgFADgDQADgFAFgBQAFgCAFAAQAJAAAFAFQAEAFAAAIIgEAXIgBAFIABAGIAAABIgMAAIAAgGQgHAHgGAAQgHgBgFgEgAgGAEQgDADgBAEQAAADABACQACACAEAAQADAAACgBIAGgGIABgJIgFAAQgGgBgEADg");
	this.shape_7.setTransform(32.175,89.3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgLAmIAMhLIALAAIgMBLg");
	this.shape_8.setTransform(28.575,88.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgSAXQgEgFAAgGQABgIAGgEQAHgFALAAIAHAAIABgDIAAgEQgBgFgGAAQgEAAgBABQgDACgBAEIgMAAQABgFADgDQADgFAFgCQAFgBAFAAQAJAAAFAFQAEAFAAAIIgEAYIgBAEIABAGIAAABIgMAAIAAgGQgHAHgGgBQgHAAgFgEgAgGAEQgDACgBAFQAAADABACQACACAEAAQADAAACgBIAGgGIABgKIgFAAQgGABgEACg");
	this.shape_9.setTransform(59.875,73.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgLAlIAJg0IALAAIgJA0gAABgZQgBAAAAAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABgBQACgBACAAQABAAABAAQAAAAABAAQAAAAABABQAAAAABAAQAAABABAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAgBAAIgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAgBg");
	this.shape_10.setTransform(56.25,72.3);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AAGAmIgKgXIgHAGIgDARIgLAAIANhKIALAAIgHApIAEgEIAQgPIAOAAIgXAVIAPAfg");
	this.shape_11.setTransform(52.525,72.2);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgNAYQgFgDgCgGQgDgHABgHIAAgBQABgIAEgGQADgGAGgDQAGgDAGAAQAJAAAFAGQAFAFAAAIIgLAAQAAgEgCgDQgCgDgFAAQgFAAgEAGQgEAGgBAJQAAAOAKAAQADAAADgCQADgDABgEIALAAQgBAFgDAFQgDAEgFACQgFACgFAAQgHAAgEgDg");
	this.shape_12.setTransform(47.2607,73.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AAHAbIAGghIAAgEQgBgGgGAAQgGAAgFAGIgHAlIgLAAIAJg0IALAAIgBAGQAGgHAIAAQAIABADAEQAEAFgBAKIgGAhg");
	this.shape_13.setTransform(41.6781,73.25);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgLAlIAJg0IALAAIgJA0gAABgZQAAAAgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAgBQACgBAEAAQAAAAABAAQAAAAABAAQAAAAABABQABAAAAAAQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgCAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAgBg");
	this.shape_14.setTransform(38.05,72.3);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgVAkIAMhHIALAAIgKA9IAfAAIgCAKg");
	this.shape_15.setTransform(33.9,72.4);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FF8C2D").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_16.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


(lib.drag11G10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap126();
	this.instance.setTransform(0,-3,0.3982,0.4459);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgNASQgEgEAAgHIAJAAQAAAEACACQACACADgBQADABACgCQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAAAQAAgFgFgBIgHgCQgIgDAAgHQAAgFAFgEQAFgEAGAAQAHAAAEAEQAEADAAAHIgJAAQAAgBAAgBQAAgBAAAAQAAgBgBAAQAAgBAAAAQgCgCgDAAQgDAAgBABQgBABAAAAQgBABAAAAQAAABgBAAQAAABAAABQAAADAEABIAIADQAIACAAAIQAAAEgDADIgGAFIgIABQgHgBgFgDg");
	this.shape.setTransform(57.575,88.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgOAUQgDgCgBgEQgBgDABgFIAEgbIAJAAIgEAbIAAADQAAAFAFAAQAFAAAEgFIAFgeIAJAAIgHAqIgJAAIABgEQgEAFgHAAIgHgCg");
	this.shape_1.setTransform(53.5667,88.775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgLATQgEgDgBgEQgCgFABgGIAAgBQAAgGADgFQADgFAFgDQAEgCAFAAQAHAAAEAFQAEAEAAAHIgJAAQAAgEgBgCQgCgCgEgBQgEABgDAEQgDAFAAAHQgBALAIAAQACABADgCQACgDABgDIAJAAQgBAEgCADQgDAEgEACQgEACgDAAQgGgBgEgCg");
	this.shape_2.setTransform(49.3083,88.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgJAdIAIgpIAIAAIgHApgAABgTQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIABgEQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAABQAAAAgBABIgEABQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_3.setTransform(46.275,87.925);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgUAeIAKg6IAIAAIgBAEQAEgFAHAAQAEAAADACQADACACAEQABAEAAAFIAAAFQgBAHgCAEQgDAFgEADQgEACgFAAQgGAAgDgFIgEAVgAgDgQIgDASQABAEAFAAQAEABAEgEQADgDABgIIAAgCQAAgFgCgDQgBgDgEAAQgFAAgDAFg");
	this.shape_4.setTransform(42.725,89.525);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgQAeIgFgBIABgHIACAAQADAAACgBQADgCABgDIACgEIgHgpIAKAAIADAdIANgdIAKAAIgYAxQgFAKgIAAIgBAAg");
	this.shape_5.setTransform(38.875,89.5762);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgHAYQgCgEAAgFIAEgXIgGAAIABgIIAHAAIABgKIAJAAIgCAKIAHAAIgBAIIgHAAIgEAXIAAABQAAABAAAAQAAABAAAAQABAAAAABQABAAABAAIADgBIgBAIIgFABQgEgBgDgCg");
	this.shape_6.setTransform(35.875,88.25);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgNAVIAHgpIAIAAIgBAFQAEgGAGABIADAAIAAAJIgFAAQgGAAgDAEIgEAcg");
	this.shape_7.setTransform(62.9,75.1);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgKATQgEgDgCgEQgCgFABgFIAAgCQAAgFADgGQADgFAFgDQAFgCAEAAQAIAAAEAGQAEAGgBAJIgBADIgZAAQgBAFADADQACADAEAAQAFAAAFgFIAFAFIgHAGQgEACgEAAQgGgBgEgCgAgIgDIARAAIAAgBIAAgDQAAgBAAgBQAAAAAAgBQgBAAAAgBQgBAAAAgBQAAAAgBAAQAAgBgBAAQAAAAgBAAQgBAAgBAAQgGAAgEAKg");
	this.shape_8.setTransform(59.305,75.15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgHAYQgCgEAAgFIAEgXIgGAAIABgIIAHAAIABgKIAJAAIgCAKIAHAAIgBAIIgHAAIgEAXIAAABQAAABAAAAQAAABABAAQAAAAAAABQABAAABAAIADgBIgBAIIgFABQgEAAgDgDg");
	this.shape_9.setTransform(56.075,74.65);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgNASQgEgEAAgHIAJAAQAAAEACACQACACADgBQADABACgCQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAAAQAAgEgFgCIgHgCQgIgDAAgHQAAgFAFgFQAFgDAGAAQAHAAAEADQAEAFAAAGIgJAAQAAgBAAgBQAAgBAAAAQAAgBgBAAQAAgBAAAAQgCgCgDAAQgDAAgBABQgBABAAAAQgBABAAAAQAAABgBAAQAAABAAAAQAAAEAEABIAIADQAIADAAAGQAAAFgDADIgGAFIgIABQgHgBgFgDg");
	this.shape_10.setTransform(52.475,75.15);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgOATQgDgEAAgFQAAgHAGgDQAFgEAIAAIAGAAIABgCIAAgEQgBgEgFAAQgDAAgBABQgCACgBADIgJAAQAAgEADgDQACgDAEgCIAIgBQAHAAAEAEQAEAEgBAHIgDATIAAADIAAAFIAAAAIgJAAIAAgEQgGAFgFAAQgFgBgEgCgAgEADQgDACgBADQAAABAAABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQAAAAABABQAAAAABAAQABAAAAAAQADABACgCIAEgEIACgIIgFAAQgEAAgDACg");
	this.shape_11.setTransform(48.2778,75.15);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AAFAeIAFgbIAAgDQAAgEgFAAQgFAAgEAEIgFAeIgJAAIAKg7IAIAAIgDAXQAEgGAHAAQAGAAADAFQADAEgBAGIgEAbg");
	this.shape_12.setTransform(43.9292,74.25);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgLATQgEgDgBgEQgCgGABgFIAAgBQAAgGADgFQADgFAFgDQAEgCAFAAQAHAAAEAFQAEAEAAAHIgJAAQAAgDgBgDQgCgDgEABQgEAAgDAEQgDAFAAAIQgBAKAIAAQACABADgCQACgCABgEIAJAAQgBAEgCADQgDAEgEACQgEACgDAAQgGgBgEgCg");
	this.shape_13.setTransform(39.9583,75.15);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgNAVIAHgpIAHAAIAAAFQAEgGAGABIAEAAIgBAJIgFAAQgFAAgEAEIgEAcg");
	this.shape_14.setTransform(36.6,75.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AAPAcIgCgMIgUAAIgHAMIgKAAIAdg4IAJAAIALA4gAgDAIIAPAAIgEgXg");
	this.shape_15.setTransform(32.075,74.4);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FF8C2D").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_16.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


(lib.drag11G4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IANAAIAAAHQAEgIAKAAIAEABIAAANIgFgBQgKAAgDAIIAAAqg");
	this.shape.setTransform(112.05,45.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgDADgBAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_1.setTransform(106.4,45.275);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_2.setTransform(100.025,45.275);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_3.setTransform(93.7,45.275);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgUAkQgHgIAAgPQAAgPAHgIQAHgJALAAQAJAAAHAHIAAghIAOAAIAABZIgNAAIgBgGQgGAIgKgBQgLAAgHgJgAgJgCQgDAEAAAMQAAAJADAGQAEAFAGAAQAJAAAEgIIAAgaQgEgIgJAAQgGAAgEAGg");
	this.shape_4.setTransform(86.925,44);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_5.setTransform(77.375,45.325);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgGAWIAAgjIgLAAIAAgKIALAAIAAgQIAMAAIAAAQIAMAAIAAAKIgMAAIAAAjQABADABACQACACADAAIAFgBIAAALIgJABQgPAAAAgSg");
	this.shape_6.setTransform(71.9,44.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_7.setTransform(66.925,45.275);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_8.setTransform(60.525,45.325);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_9.setTransform(54.075,45.275);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgbAsIAAhXIANAAIABAHQAGgIAKAAQALAAAHAJQAHAIAAAQIAAABQAAAOgHAJQgHAIgLAAQgJAAgHgGIAAAdgAgNgZIAAAbQAEAIAJAAQAGAAAEgFQADgFAAgLQAAgKgDgGQgEgFgGAAQgJAAgEAHg");
	this.shape_10.setTransform(153.425,28.05);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgDACQgDADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAGAAQAMAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQADAAAEgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_11.setTransform(146.65,26.875);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_12.setTransform(140.275,26.875);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_13.setTransform(135.7,25.675);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgFgDgDQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAhQAHgHAKgBQAUAAAAAXIAAApg");
	this.shape_14.setTransform(130.825,25.55);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_15.setTransform(123.975,28.075);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_16.setTransform(117.375,26.825);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_17.setTransform(110.875,26.875);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_18.setTransform(102.375,26.825);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_19.setTransform(90.825,26.825);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAHAFAAALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_20.setTransform(84.25,26.875);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_21.setTransform(77.475,28.075);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_22.setTransform(70.875,26.825);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_23.setTransform(64.375,26.875);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgUAkQgHgJAAgPQAAgNAHgJQAHgJALAAQAJAAAHAHIAAggIAOAAIAABZIgNAAIgBgHQgGAHgKAAQgLABgHgKgAgJgCQgDAFAAAKQAAAKADAFQAEAGAGAAQAJAAAEgHIAAgbQgEgHgJgBQgGABgEAFg");
	this.shape_24.setTransform(57.575,25.6);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgHAWIAAgjIgKAAIAAgLIAKAAIAAgPIAOAAIAAAPIALAAIAAALIgLAAIAAAiQgBAEACACQACACADgBIAFAAIAAALIgJABQgQAAAAgSg");
	this.shape_25.setTransform(49.2,26.15);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgDACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_26.setTransform(44.1,26.875);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAGIAAAVIgOAAIAAhZIAOAAIAAAzIAFgFIAQgUIARAAIgXAaIAaAlg");
	this.shape_27.setTransform(38.175,25.55);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_28.setTransform(31.475,26.875);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgGAtIAAhZIANAAIAABZg");
	this.shape_29.setTransform(26.675,25.55);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_30.setTransform(21.975,26.875);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_31.setTransform(13.475,26.825);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_32.setTransform(158.975,8.425);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgFAAgCACQgDADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_33.setTransform(152.4,8.475);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgUAlQgHgKAAgOQAAgPAHgIQAHgJALAAQAJAAAHAHIAAghIAOAAIAABZIgNAAIgBgGQgGAIgKAAQgLgBgHgIgAgJgCQgDAEAAAMQAAAJADAGQAEAFAGAAQAJAAAEgIIAAgaQgEgIgJABQgGgBgEAGg");
	this.shape_34.setTransform(145.625,7.2);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgGIAQgSIARAAIgXAZIAaAlg");
	this.shape_35.setTransform(136.725,7.15);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQADgCADgDIAAgMIgIAAQgHAAgEADg");
	this.shape_36.setTransform(129.95,8.475);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgQAgIAAg+IAOAAIAAAHQAFgIAJAAIAEABIAAANIgGgBQgJAAgCAIIAAAqg");
	this.shape_37.setTransform(124.9,8.425);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_38.setTransform(119.325,8.475);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_39.setTransform(112.525,9.675);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IANAAIAAAHQAEgIAKAAIAEABIAAANIgFgBQgKAAgDAIIAAAqg");
	this.shape_40.setTransform(107.45,8.425);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_41.setTransform(101.875,8.475);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgNAmIgBAGIgNAAIAAhZIAOAAIAAAhQAGgHAKAAQALAAAHAIQAHAJAAAPIAAABQAAAOgHAJQgHAJgLAAQgKgBgGgHgAgNAAIAAAaQAEAIAJAAQAGAAAEgFQADgFAAgKIAAgCQAAgKgDgFQgEgEgGAAQgJAAgEAHg");
	this.shape_42.setTransform(95.375,7.2);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgHAWIAAgjIgKAAIAAgKIAKAAIAAgQIAOAAIAAAQIALAAIAAAKIgLAAIAAAiQAAAEABACQACABADABIAFgBIAAALIgJABQgQAAAAgSg");
	this.shape_43.setTransform(86.7,7.75);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgFAAgDACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_44.setTransform(81.6,8.475);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgbAtIAAhXIANAAIABAGQAGgHAKAAQALAAAHAIQAHAJAAAPIAAABQAAANgHAJQgHAJgLAAQgJAAgHgHIAAAfgAgNgYIAAAaQAEAIAJAAQAGAAAEgGQADgEAAgMQAAgJgDgFQgEgGgGAAQgJAAgEAIg");
	this.shape_45.setTransform(75.125,9.65);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgDACQgDADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQADAAAEgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_46.setTransform(68.35,8.475);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgUAlQgHgKAAgOQAAgPAHgIQAHgJALAAQAJAAAHAHIAAghIAOAAIAABZIgNAAIgBgGQgGAIgKAAQgLgBgHgIgAgJgCQgDAEAAAMQAAAJADAGQAEAFAGAAQAJAAAEgIIAAgaQgEgIgJABQgGgBgEAGg");
	this.shape_47.setTransform(61.575,7.2);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_48.setTransform(53.85,7.275);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_49.setTransform(48.975,8.425);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_50.setTransform(44.15,7.275);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_51.setTransform(36.275,8.425);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgDACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_52.setTransform(29.7,8.475);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AANAgIgNgrIgNArIgLAAIgSg/IAPAAIAKArIAMgrIALAAIANArIAJgrIAPAAIgSA/g");
	this.shape_53.setTransform(22,8.475);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_54.setTransform(14.375,8.475);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AATArIAAgmIglAAIAAAmIgPAAIAAhVIAPAAIAAAkIAlAAIAAgkIAPAAIAABVg");
	this.shape_55.setTransform(6.8,7.375);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_56.setTransform(82.475,24.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.7,-3.1,172.29999999999998,56.6);


(lib.drag11G3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape.setTransform(110.625,34.825);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_1.setTransform(104.05,34.875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQADgCADgDIAAgMIgIAAQgHAAgEADg");
	this.shape_2.setTransform(97.55,34.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_3.setTransform(90.975,34.825);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IANAAIAAAHQAEgIAKAAIAEABIAAANIgFgBQgKAAgDAIIAAAqg");
	this.shape_4.setTransform(85.85,34.825);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_5.setTransform(80.275,34.875);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgTAYQgIgIAAgPIAAgBQAAgOAIgJQAIgJAMAAQAMAAAHAHQAHAGAAALIgNAAQgBgFgDgEQgDgDgGAAQgGAAgEAFQgDAFAAAKIAAABQAAAKADAGQAEAFAGAAQAGAAADgEQADgDABgEIANAAQAAAGgDAFQgEAFgFADQgHADgHAAQgMAAgIgJg");
	this.shape_6.setTransform(73.95,34.875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_7.setTransform(67.425,34.825);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_8.setTransform(60.925,34.875);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgbAtIAAhYIANAAIABAHQAGgHAKgBQALAAAHAJQAHAIAAAQIAAABQAAAOgHAIQgHAJgLAAQgJAAgHgGIAAAegAgNgZIAAAbQAEAIAJAAQAGAAAEgFQADgFAAgLQAAgKgDgGQgEgFgGAAQgJAAgEAHg");
	this.shape_9.setTransform(54.425,36.05);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgHAWIAAgjIgKAAIAAgKIAKAAIAAgQIAOAAIAAAQIALAAIAAAKIgLAAIAAAjQAAADABACQABACAEAAIAFgBIAAALIgJABQgQAAAAgSg");
	this.shape_10.setTransform(142.6,15.75);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCABgDIAAgMIgHAAQgHAAgEADg");
	this.shape_11.setTransform(137.5,16.475);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgGAtIAAhZIANAAIAABZg");
	this.shape_12.setTransform(132.725,15.15);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgFAAgDACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_13.setTransform(127.95,16.475);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_14.setTransform(120.2,15.275);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgFIAQgTIARAAIgXAZIAaAlg");
	this.shape_15.setTransform(115.975,15.15);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_16.setTransform(110.95,15.275);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgGAtIAAhZIANAAIAABZg");
	this.shape_17.setTransform(107.875,15.15);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_18.setTransform(104.85,15.275);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_19.setTransform(98.075,16.425);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_20.setTransform(89.675,16.475);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_21.setTransform(81.175,16.425);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_22.setTransform(71.45,15.275);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_23.setTransform(66.575,16.425);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_24.setTransform(61.75,15.275);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_25.setTransform(53.875,16.425);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_26.setTransform(47.3,16.475);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAOAgIgOgrIgNArIgLAAIgRg/IANAAIAKArIAOgrIAJAAIAOArIAKgrIANAAIgRA/g");
	this.shape_27.setTransform(39.6,16.475);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_28.setTransform(31.975,16.475);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AATArIAAgmIglAAIAAAmIgPAAIAAhVIAPAAIAAAkIAlAAIAAgkIAPAAIAABVg");
	this.shape_29.setTransform(24.4,15.375);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_30.setTransform(82.475,24.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.7,-3.1,172.29999999999998,55.6);


(lib.drag11G2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape.setTransform(153.375,39.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_1.setTransform(144.975,39.475);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgHAWIAAgjIgKAAIAAgLIAKAAIAAgPIAOAAIAAAPIALAAIAAALIgLAAIAAAiQgBAEACACQACACADgBIAFAAIAAALIgJABQgQAAAAgSg");
	this.shape_2.setTransform(139.55,38.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_3.setTransform(134.575,39.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgWArIAAgKIADAAQAFAAACgCQAEgCABgFIACgGIgWg+IAPAAIANArIAMgrIAPAAIgZBIQgEARgOgBIgHgBg");
	this.shape_4.setTransform(128.55,40.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_5.setTransform(122.525,39.475);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_6.setTransform(111.225,39.425);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgFAAgDACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_7.setTransform(102.75,39.475);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgGAtIAAhZIANAAIAABZg");
	this.shape_8.setTransform(97.975,38.15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_9.setTransform(93.2,39.475);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgUAkQgHgJAAgPQAAgNAHgJQAHgJALAAQAJAAAHAHIAAggIAOAAIAABZIgNAAIgBgHQgGAHgKAAQgLABgHgKgAgJgCQgDAFAAAKQAAAKADAFQAEAGAGAAQAJAAAEgHIAAgbQgEgHgJgBQgGABgEAFg");
	this.shape_10.setTransform(86.425,38.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IANAAIAAAHQAEgIAKAAIAEABIAAANIgFgBQgKAAgDAIIAAAqg");
	this.shape_11.setTransform(78.4,39.425);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_12.setTransform(74.5,38.275);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAGAAQAMAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQADAAAEgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_13.setTransform(69.7,39.475);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQADgCADgDIAAgMIgIAAQgHAAgEADg");
	this.shape_14.setTransform(60.2,39.475);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgWArIAAgKIACAAQAGAAACgCQADgCACgFIACgGIgXg+IAQAAIANArIAMgrIAQAAIgZBIQgGARgNgBIgHgBg");
	this.shape_15.setTransform(54,40.75);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_16.setTransform(47.775,39.425);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgGAWIAAgjIgLAAIAAgLIALAAIAAgPIAMAAIAAAPIAMAAIAAALIgMAAIAAAiQABAEABACQABACAEgBIAFAAIAAALIgJABQgPAAAAgSg");
	this.shape_17.setTransform(42.3,38.75);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgFAAgCACQgDADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_18.setTransform(37.2,39.475);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgbAsIAAhXIANAAIABAHQAGgIAKAAQALAAAHAJQAHAIAAAQIAAABQAAAOgHAJQgHAIgLAAQgJAAgHgGIAAAdgAgNgZIAAAbQAEAIAJAAQAGAAAEgFQADgFAAgLQAAgKgDgGQgEgFgGAAQgJAAgEAHg");
	this.shape_19.setTransform(30.725,40.65);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_20.setTransform(21.975,39.425);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_21.setTransform(13.575,39.475);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgHAWIAAgjIgKAAIAAgLIAKAAIAAgPIAOAAIAAAPIALAAIAAALIgLAAIAAAiQgBAEACACQACACADgBIAFAAIAAALIgJABQgQAAAAgSg");
	this.shape_22.setTransform(8.15,38.75);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgGAtIAAhZIANAAIAABZg");
	this.shape_23.setTransform(146.625,19.75);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_24.setTransform(141.85,21.075);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IANAAIAAAHQAEgIAKAAIAEABIAAANIgFgBQgKAAgDAIIAAAqg");
	this.shape_25.setTransform(136.8,21.025);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgGIAQgSIARAAIgXAZIAaAlg");
	this.shape_26.setTransform(131.725,19.75);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgFAAgCACQgDADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_27.setTransform(124.95,21.075);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgGAtIAAhZIANAAIAABZg");
	this.shape_28.setTransform(120.175,19.75);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_29.setTransform(115.325,21.125);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgNAmIgBAGIgNAAIAAhZIAOAAIAAAhQAGgHAKAAQALAAAHAIQAHAJAAAPIAAAAQAAAPgHAJQgHAJgLAAQgKgBgGgHgAgNAAIAAAaQAEAIAJAAQAGAAAEgFQADgFAAgKIAAgCQAAgKgDgFQgEgEgGAAQgJAAgEAHg");
	this.shape_30.setTransform(108.775,19.8);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_31.setTransform(100.025,21.025);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgDADgBAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_32.setTransform(91.55,21.075);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgWAvIAhhdIALAAIggBdg");
	this.shape_33.setTransform(82.8,20.35);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IANAAIAAAHQAEgIAKAAIAEABIAAANIgFgBQgKAAgDAIIAAAqg");
	this.shape_34.setTransform(78.75,21.025);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_35.setTransform(74.85,19.875);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgFAAgCACQgDADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_36.setTransform(70.05,21.075);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IANAAIAAAHQAEgIAKAAIAEABIAAANIgFgBQgKAAgDAIIAAAqg");
	this.shape_37.setTransform(62,21.025);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_38.setTransform(56.35,21.075);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgGAtIAAhZIANAAIAABZg");
	this.shape_39.setTransform(51.575,19.75);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_40.setTransform(46.725,21.125);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgSAYQgJgIABgPIAAgBQgBgOAJgJQAHgJAMAAQAMAAAHAHQAHAGABALIgOAAQAAgFgEgEQgEgDgFAAQgGAAgDAFQgEAFAAAKIAAABQAAAKAEAGQADAFAGAAQAFAAAEgEQAEgDAAgEIAOAAQgBAGgEAFQgDAFgGADQgFADgIAAQgMAAgHgJg");
	this.shape_41.setTransform(40.35,21.075);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_42.setTransform(34.025,21.075);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgEAAgEACQgCADgBAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCABgDIAAgMIgHAAQgHAAgEADg");
	this.shape_43.setTransform(27.7,21.075);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgGArIgfhVIARAAIAUBCIAWhCIAQAAIgfBVg");
	this.shape_44.setTransform(20.575,19.975);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_45.setTransform(82.475,29.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.7,1.5,172.29999999999998,55.6);


(lib.drag11G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgLAcQgFgDgEgFQgDgEAAgFIANAAQAAAEADADQAEACAEAAQAFAAADgBQACgCAAgEQAAgEgCgBQgDgCgGgCQgHAAgFgDQgJgDAAgKQAAgHAGgFQAHgFAJAAQAKAAAHAFQAFAFAAAIIgNAAQAAgEgCgCQgDgDgEAAQgEABgDACQgCACAAADQgBADADACIAJADQAIACAFACQAEABACADQACAEAAAEQAAAJgGAEQgHAFgKAAQgHAAgFgCg");
	this.shape.setTransform(99.3,38);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgIQAAgJAHgDQAHgGAMAAIAIAAIAAgDQAAgFgDgCQgCgDgFgBQgEAAgDADQgDACAAADIgNAAQAAgEADgFQAEgEAFgCQAGgCAFAAQAKAAAHAFQAGAFAAAKIAAAYQAAAJACAEIAAABIgNAAIgCgGQgGAHgIAAQgJAAgFgFgAgHAEQgEADAAAEQAAAEADADQACACAEAAQADAAAEgCQADgCACgEIAAgKIgHAAQgHgBgDADg");
	this.shape_1.setTransform(93.525,38);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AALApIAAglQAAgFgCgDQgDgCgFAAQgHAAgEAGIAAApIgNAAIAAhRIANAAIAAAeQAGgHAJAAQATAAAAAUIAAAmg");
	this.shape_2.setTransform(87.5,36.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AALApIgRgZIgFAGIAAATIgOAAIAAhRIAOAAIAAAuIAEgFIAPgRIAPAAIgVAXIAYAig");
	this.shape_3.setTransform(81.975,36.775);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgFAoIAAg5IALAAIAAA5gAgEgcQgBAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAgDACgCQACgCACAAQADAAADACQABACAAADQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgDACgDABQgCgBgCgCg");
	this.shape_4.setTransform(74.6,36.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgOAdIAAg5IAMAAIABAHQADgHAJAAIAEAAIAAAMIgFAAQgJAAgCAHIAAAmg");
	this.shape_5.setTransform(71.525,37.95);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgFAoIAAg5IALAAIAAA5gAgEgcQgBAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAgDACgCQACgCACAAQADAAACACQACACAAADQAAABAAAAQAAABAAAAQAAABgBAAQAAABgBAAQgCACgDABQgCgBgCgCg");
	this.shape_6.setTransform(67.95,36.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgRAWQgHgIAAgNIAAgBQAAgNAHgIQAHgIALAAQALAAAGAGQAHAGAAAKIgMAAQAAgGgEgCQgDgDgFAAQgFgBgDAFQgEAEAAAKIAAABQAAAKADAEQAEAEAFABQAFgBADgCQAEgDAAgEIAMAAQAAAFgDAFQgDAFgGADQgFACgHAAQgLAAgHgIg");
	this.shape_7.setTransform(63.775,38);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgGAoIAAg5IAMAAIAAA5gAgFgcQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAgDABgCQACgCADAAQADAAACACQACACABADQAAABgBAAQAAABAAAAQAAABgBAAQAAABgBAAQgCACgDAAQgDAAgCgCg");
	this.shape_8.setTransform(154.55,19.7);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AALApIgRgZIgFAGIAAATIgOAAIAAhRIAOAAIAAAuIAEgFIAPgRIAPAAIgVAXIAYAig");
	this.shape_9.setTransform(150.675,19.575);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgFAoIAAg5IALAAIAAA5gAgEgcQgBAAAAgBQgBAAAAgBQAAAAAAgBQgBAAAAgBQABgDACgCQACgCACAAQAEAAACACQABACAAADQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgCACgEAAQgCAAgCgCg");
	this.shape_10.setTransform(146.05,19.7);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgGApIAAhRIANAAIAABRg");
	this.shape_11.setTransform(143.25,19.575);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgGAoIAAg5IANAAIAAA5gAgFgcQAAAAAAgBQgBAAAAgBQAAAAAAgBQgBAAAAgBQAAgDACgCQADgCACAAQAEAAACACQACACAAADQAAABgBAAQAAABAAAAQAAABgBAAQAAABAAAAQgCACgEAAQgCAAgDgCg");
	this.shape_12.setTransform(140.45,19.7);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAcAdIAAglQAAgFgCgDQgDgCgFAAQgFAAgCACQgDADgBAEIAAAmIgMAAIAAglQgBgKgKAAQgIAAgDAHIAAAoIgNAAIAAg4IAMAAIABAGQAGgIAKABQALAAAEAIQAHgIALAAQAKAAAEAEQAFAGAAAKIAAAlg");
	this.shape_13.setTransform(134.275,20.75);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgRAWQgIgHAAgNIAAgCQAAgIAEgGQADgIAGgDQAHgEAGAAQALAAAHAHQAGAIAAAOIAAAEIgkAAQAAAHAEAEQAFAFAFAAQAJAAAFgIIAIAHQgEAGgFACQgHADgHAAQgLAAgIgIgAgHgPQgDAEgBAGIAYAAIAAAAQAAgHgEgDQgDgDgGgBQgDAAgEAEg");
	this.shape_14.setTransform(126.6,20.8);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AAcAdIAAglQAAgFgCgDQgDgCgFAAQgFAAgCACQgDADgBAEIAAAmIgMAAIAAglQgBgKgKAAQgIAAgDAHIAAAoIgNAAIAAg4IAMAAIABAGQAGgIAKABQALAAAEAIQAHgIALAAQAKAAAEAEQAFAGAAAKIAAAlg");
	this.shape_15.setTransform(118.825,20.75);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgFAoIAAg5IALAAIAAA5gAgFgcQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAgDABgCQADgCACAAQADAAACACQACACAAADQAAABAAAAQAAABAAAAQAAABgBAAQAAABgBAAQgCACgDAAQgCAAgDgCg");
	this.shape_16.setTransform(109.9,19.7);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AALAdIAAgkQAAgGgDgDQgCgCgFAAQgHAAgEAHIAAAoIgNAAIAAg4IANAAIAAAGQAGgHAKAAQARgBABAVIAAAlg");
	this.shape_17.setTransform(105.45,20.75);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgGAoIAAg5IAMAAIAAA5gAgFgcQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAgDABgCQACgCADAAQADAAACACQACACABADQAAABgBAAQAAABAAAAQAAABgBAAQAAABgBAAQgCACgDAAQgDAAgCgCg");
	this.shape_18.setTransform(101,19.7);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgLAcQgGgDgDgEQgDgFAAgFIAMAAQABAEADADQADACAEABQAGAAACgCQAEgCAAgEQAAgEgEgBQgDgCgFgCQgHgBgFgCQgJgDAAgKQAAgHAHgFQAGgFAIAAQALAAAGAFQAHAFgBAIIgMAAQAAgEgDgCQgDgDgFAAQgDAAgCADQgEABAAAEQAAADADACIAKADQAHACAEACQAFABACADQACAEAAAEQAAAJgHAEQgGAFgLAAQgFAAgGgCg");
	this.shape_19.setTransform(93.95,20.8);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgIQAAgJAHgEQAHgEAMAAIAIAAIAAgFQAAgEgDgCQgCgEgFAAQgEAAgDADQgDACAAADIgNAAQAAgEADgFQAEgEAFgCQAGgCAFAAQAKAAAHAFQAGAFAAAJIAAAZQAAAJACAEIAAABIgNAAIgCgGQgGAHgIAAQgJAAgFgFgAgHAEQgEADAAAFQAAADADADQACACAEAAQADAAAEgCQADgCACgEIAAgKIgHAAQgHgBgDADg");
	this.shape_20.setTransform(88.175,20.8);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgFApIAAhRIALAAIAABRg");
	this.shape_21.setTransform(83.8,19.575);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgRAWQgHgHgBgNIAAgCQABgIADgGQADgIAGgDQAGgEAHAAQAMAAAGAHQAHAIAAAOIAAAEIgmAAQABAHAEAEQAEAFAGAAQAJAAAGgIIAHAHQgEAGgFACQgGADgIAAQgLAAgIgIgAgHgPQgEAEAAAGIAXAAIAAAAQABgHgEgDQgDgDgFgBQgEAAgEAEg");
	this.shape_22.setTransform(79.5,20.8);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AALApIgRgZIgFAGIAAATIgOAAIAAhRIAOAAIAAAuIAEgFIAPgRIAPAAIgVAXIAYAig");
	this.shape_23.setTransform(74.025,19.575);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgIQAAgJAHgEQAHgEAMAAIAIAAIAAgFQAAgEgDgCQgCgEgFAAQgEAAgDADQgDACAAADIgNAAQAAgEADgFQAEgEAFgCQAGgCAFAAQAKAAAHAFQAGAFAAAJIAAAZQAAAJACAEIAAABIgNAAIgCgGQgGAHgIAAQgJAAgFgFgAgHAEQgEADAAAFQAAADADADQACACAEAAQADAAAEgCQADgCACgEIAAgKIgHAAQgHgBgDADg");
	this.shape_24.setTransform(65.075,20.8);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgSAiQgHgJABgOQgBgMAHgIQAGgIAKAAQAJAAAGAGIAAgeIAMAAIAABSIgLAAIgBgGQgFAHgKAAQgKAAgGgIgAgIgCQgDAEAAAKQAAAJADAFQAEAFAFAAQAIAAAEgHIAAgYQgEgHgIAAQgFAAgEAFg");
	this.shape_25.setTransform(58.85,19.625);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgIQAAgJAHgEQAHgEAMAAIAIAAIAAgFQAAgEgDgCQgCgEgFAAQgEAAgDADQgDACAAADIgNAAQAAgEADgFQAEgEAFgCQAGgCAFAAQAKAAAHAFQAGAFAAAJIAAAZQAAAJACAEIAAABIgNAAIgCgGQgGAHgIAAQgJAAgFgFgAgHAEQgEADAAAFQAAADADADQACACAEAAQADAAAEgCQADgCACgEIAAgKIgHAAQgHgBgDADg");
	this.shape_26.setTransform(52.925,20.8);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgZApIAAhQIANAAIAAAGQAGgHAJAAQALAAAFAIQAHAIgBAOIAAABQABAMgHAIQgFAIgLAAQgJAAgFgGIAAAcgAgLgXIAAAZQAEAHAHAAQAFAAAEgFQAEgEAAgKQAAgJgEgFQgEgFgFAAQgIAAgDAGg");
	this.shape_27.setTransform(46.95,21.875);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AALAdIAAgkQAAgGgDgDQgCgCgFAAQgHAAgEAHIAAAoIgNAAIAAg4IANAAIAAAGQAGgHAKAAQARgBABAVIAAAlg");
	this.shape_28.setTransform(37.95,20.75);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgIQAAgJAHgEQAHgEAMAAIAIAAIAAgFQAAgEgDgCQgCgEgFAAQgEAAgDADQgDACAAADIgNAAQAAgEADgFQAEgEAFgCQAGgCAFAAQAKAAAHAFQAGAFAAAJIAAAZQAAAJACAEIAAABIgNAAIgCgGQgGAHgIAAQgJAAgFgFgAgHAEQgEADAAAFQAAADADADQACACAEAAQADAAAEgCQADgCACgEIAAgKIgHAAQgHgBgDADg");
	this.shape_29.setTransform(31.925,20.8);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AAMAdIgMgnIgLAnIgLAAIgQg5IANAAIAJAnIAMgnIAJAAIAMAnIAJgnIANAAIgQA5g");
	this.shape_30.setTransform(24.825,20.8);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgRAWQgHgHAAgNIAAgCQAAgIADgGQADgIAGgDQAGgEAHAAQAMAAAGAHQAHAIAAAOIAAAEIgmAAQABAHAFAEQADAFAGAAQAJAAAGgIIAHAHQgEAGgFACQgGADgIAAQgLAAgIgIgAgHgPQgEAEAAAGIAXAAIAAAAQABgHgEgDQgDgDgFgBQgEAAgEAEg");
	this.shape_31.setTransform(17.85,20.8);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AARAnIAAgjIgiAAIAAAjIgNAAIAAhNIANAAIAAAhIAiAAIAAghIAOAAIAABNg");
	this.shape_32.setTransform(10.95,19.8);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_33.setTransform(81.525,27.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.7,-0.3,168.5,55.599999999999994);


(lib.drag11G = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgGgDgCQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAiQAHgIAKAAQAUAAAAAVIAAAqg");
	this.shape.setTransform(146.475,44.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_1.setTransform(139.825,45.775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgNAmIgBAGIgNAAIAAhZIAOAAIAAAhQAGgHAKAAQALAAAHAIQAHAJAAAPIAAABQAAAOgHAJQgHAJgLgBQgKAAgGgHgAgNAAIAAAaQAEAIAJAAQAGAAAEgFQADgFAAgKIAAgCQAAgKgDgFQgEgEgGgBQgJABgEAHg");
	this.shape_2.setTransform(133.275,44.45);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_3.setTransform(126.425,45.775);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgGAWIAAgjIgLAAIAAgKIALAAIAAgQIAMAAIAAAQIAMAAIAAAKIgMAAIAAAjQABADABACQACACADAAIAFgBIAAALIgJABQgPAAAAgSg");
	this.shape_4.setTransform(120.95,45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_5.setTransform(112.775,45.675);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgDACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_6.setTransform(106.2,45.725);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCABgDIAAgMIgHAAQgHAAgEADg");
	this.shape_7.setTransform(99.7,45.725);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgGIAQgSIARAAIgXAZIAaAlg");
	this.shape_8.setTransform(93.775,44.4);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_9.setTransform(86.925,45.775);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_10.setTransform(78.375,45.675);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgQAgIAAg+IAOAAIAAAHQAFgIAJAAIAEABIAAANIgGgBQgJAAgDAIIAAAqg");
	this.shape_11.setTransform(71.35,45.675);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_12.setTransform(65.775,45.725);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgbAtIAAhXIANAAIABAGQAGgIAKABQALgBAHAJQAHAJAAAPIAAABQAAANgHAJQgHAJgLAAQgJAAgHgHIAAAfgAgNgYIAAAbQAEAHAJAAQAGAAAEgGQADgEAAgMQAAgJgDgFQgEgGgGAAQgJAAgEAIg");
	this.shape_13.setTransform(59.275,46.9);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_14.setTransform(49.225,46.925);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_15.setTransform(42.625,45.675);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_16.setTransform(36.05,45.725);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_17.setTransform(29.675,45.725);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_18.setTransform(23.275,45.675);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_19.setTransform(18.45,44.525);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_20.setTransform(152.55,26.125);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_21.setTransform(147.475,28.525);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_22.setTransform(140.875,27.275);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_23.setTransform(134.225,27.375);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgUAkQgHgJAAgPQAAgNAHgJQAHgJALAAQAJAAAHAHIAAggIAOAAIAABZIgNAAIgBgHQgGAHgKABQgLAAgHgKgAgJgCQgDAFAAAKQAAAKADAFQAEAGAGAAQAJAAAEgHIAAgbQgEgHgJgBQgGABgEAFg");
	this.shape_24.setTransform(127.375,26.05);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_25.setTransform(120.825,27.275);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_26.setTransform(116,26.125);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgGAtIAAhZIANAAIAABZg");
	this.shape_27.setTransform(112.925,26);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_28.setTransform(108.225,27.325);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_29.setTransform(99.725,27.275);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_30.setTransform(88.175,27.275);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgFAAgDACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_31.setTransform(81.6,27.325);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgUAkQgHgJAAgPQAAgNAHgJQAHgJALAAQAJAAAHAHIAAggIAOAAIAABZIgNAAIgBgHQgGAHgKABQgLAAgHgKgAgJgCQgDAFAAAKQAAAKADAFQAEAGAGAAQAJAAAEgHIAAgbQgEgHgJgBQgGABgEAFg");
	this.shape_32.setTransform(74.825,26.05);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_33.setTransform(65.35,27.325);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_34.setTransform(58.775,27.275);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgDACQgEADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAHAAQAKAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_35.setTransform(52.2,27.325);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_36.setTransform(45.625,27.275);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQADgCADgDIAAgMIgIAAQgHAAgEADg");
	this.shape_37.setTransform(39.05,27.325);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAGIAAAVIgOAAIAAhZIAOAAIAAAzIAFgFIAQgUIARAAIgXAaIAaAlg");
	this.shape_38.setTransform(33.125,26);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAHAFAAALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCABgDIAAgMIgHAAQgHAAgEADg");
	this.shape_39.setTransform(26.35,27.325);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_40.setTransform(17.875,27.275);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgbAtIAAhXIANAAIABAGQAGgHAKAAQALAAAHAIQAHAJAAAPIAAABQAAANgHAJQgHAJgLAAQgJAAgHgHIAAAfgAgNgYIAAAaQAEAIAJAAQAGAAAEgGQADgEAAgMQAAgJgDgFQgEgGgGAAQgJAAgEAIg");
	this.shape_41.setTransform(156.225,10.1);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_42.setTransform(149.45,8.925);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgGIAQgSIARAAIgXAZIAaAlg");
	this.shape_43.setTransform(143.525,7.6);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_44.setTransform(136.475,10.125);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_45.setTransform(129.875,8.875);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgDACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_46.setTransform(123.3,8.925);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_47.setTransform(116.725,8.875);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_48.setTransform(110.225,8.925);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_49.setTransform(101.725,8.875);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgGAWIAAgjIgLAAIAAgKIALAAIAAgQIAMAAIAAAQIAMAAIAAAKIgMAAIAAAiQABAEABACQABABAEABIAFgBIAAALIgJABQgPAAAAgSg");
	this.shape_50.setTransform(91.35,8.2);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgFAAgCACQgDADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_51.setTransform(86.25,8.925);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgbAtIAAhXIANAAIABAGQAGgHAKAAQALAAAHAIQAHAJAAAPIAAABQAAANgHAJQgHAJgLAAQgJAAgHgHIAAAfgAgNgYIAAAaQAEAIAJAAQAGAAAEgGQADgEAAgMQAAgJgDgFQgEgGgGAAQgJAAgEAIg");
	this.shape_52.setTransform(79.775,10.1);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAHAFAAALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_53.setTransform(73,8.925);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgUAlQgHgKAAgOQAAgPAHgIQAHgJALAAQAJAAAHAHIAAghIAOAAIAABZIgNAAIgBgGQgGAIgKAAQgLgBgHgIgAgJgCQgDAEAAAMQAAAJADAGQAEAFAGAAQAJAAAEgIIAAgaQgEgIgJABQgGgBgEAGg");
	this.shape_54.setTransform(66.225,7.65);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_55.setTransform(58.5,7.725);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_56.setTransform(53.625,8.875);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_57.setTransform(48.8,7.725);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_58.setTransform(40.925,8.875);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgFAAgDACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_59.setTransform(34.35,8.925);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AANAgIgNgrIgNArIgLAAIgRg/IANAAIALArIANgrIAJAAIAOArIAKgrIANAAIgRA/g");
	this.shape_60.setTransform(26.65,8.925);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_61.setTransform(19.025,8.925);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AATArIAAgmIglAAIAAAmIgPAAIAAhVIAPAAIAAAkIAlAAIAAgkIAPAAIAABVg");
	this.shape_62.setTransform(11.45,7.825);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_63.setTransform(82.475,25.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.7,-2.2,168.39999999999998,56.1);


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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10,p:{y:-3.875}},{t:this.shape_9,p:{y:-3.875}},{t:this.shape_8},{t:this.shape_7,p:{y:0.925}},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{scaleX:0.7124,scaleY:0.7882,x:-45.2259,y:-3.0233}},{t:this.shape,p:{scaleX:0.7124,scaleY:0.7882,x:-38.9392,y:-3.0036}}]}).to({state:[{t:this.shape_10,p:{y:-1.875}},{t:this.shape_18},{t:this.shape_9,p:{y:-1.875}},{t:this.shape_17},{t:this.shape_7,p:{y:2.925}},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_1,p:{scaleX:0.7118,scaleY:0.7877,x:-45.2186,y:-2.3132}},{t:this.shape,p:{scaleX:0.7118,scaleY:0.7877,x:-38.937,y:-2.2935}}]},1).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_7,p:{y:6.425}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_1,p:{scaleX:0.7118,scaleY:0.7877,x:-45.2186,y:-0.3132}},{t:this.shape,p:{scaleX:0.7118,scaleY:0.7877,x:-38.937,y:-0.2935}}]},1).wait(2));

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


(lib.bg1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0097E6").s().p("A82E7Qg1AAAAgYIAApFQAAgXA1AAMA5tAAAQA1AAABAXIAAJFQgBAYg1AAg");
	this.shape.setTransform(-20.05,1.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg1, new cjs.Rectangle(-210.1,-30,380.1,62.9), null);


(lib.Slots10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// slots
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape.setTransform(63.075,460.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgjBDQgOgMgBgUIAZAAQABALAIAHQAGAGAKAAQALAAAIgJQAGgJAAgOQAAgPgHgIQgIgHgMAAQgHAAgFACQgEABgGAFIgWgFIAJhOIBTAAIAAAWIg9AAIgFAmQAMgGAMAAQAXAAAMAOQAMANAAAYQAAAYgNAOQgOAOgYAAQgUAAgPgMg");
	this.shape_1.setTransform(54.1,453.675);

	this.instance = new lib.Tween8_1("synched",0);
	this.instance.setTransform(56.95,453.7,0.0361,0.0648);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_2.setTransform(62.525,401.375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAMBOIAAgjIhDAAIgBgPIBDhpIAbAAIAABjIATAAIAAAVIgTAAIAAAjgAAKgmIgnA8IApAAIAAhAg");
	this.shape_3.setTransform(53.3,394.875);

	this.instance_1 = new lib.Tween8_1("synched",0);
	this.instance_1.setTransform(56.4,395,0.0361,0.0648);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_4.setTransform(62.525,343.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AglBEQgOgMAAgUIAaAAQAAALAHAGQAHAHALAAQAMAAAHgHQAHgGAAgNQAAgMgHgHQgIgGgNAAIgQAAIAAgUIAQAAQAMAAAGgGQAIgGgBgMQABgLgHgGQgGgGgLAAQgKAAgGAGQgIAGABAKIgaAAQAAgMAGgKQAHgKALgGQALgFAOAAQAXAAANAMQANALAAAVQAAALgGAJQgHAJgLAFQAOADAGAKQAHAJAAANQAAAVgOANQgPAMgXAAQgWAAgPgMg");
	this.shape_5.setTransform(53.1,336.875);

	this.instance_2 = new lib.Tween8_1("synched",0);
	this.instance_2.setTransform(56.4,337,0.0361,0.0648);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_6.setTransform(62.525,289.775);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgyBPIAAgSIAzg5QALgLAFgIQAFgJAAgIQAAgMgGgGQgHgHgJAAQgNAAgHAHQgHAIAAAOIgaAAQAAgPAHgLQAGgMAMgGQAMgGAQAAQAWAAANALQANAMAAAUQAAALgHANQgGAMgPAQIglApIBHAAIAAAVg");
	this.shape_7.setTransform(53.325,283.175);

	this.instance_3 = new lib.Tween8_1("synched",0);
	this.instance_3.setTransform(56.4,283.4,0.0361,0.0648);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_8.setTransform(62.525,235.375);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAGBOIAAh8IglANIAAgWIA8gWIADAAIAACbg");
	this.shape_9.setTransform(52.075,228.85);

	this.instance_4 = new lib.Tween8_1("synched",0);
	this.instance_4.setTransform(56.4,229,0.0361,0.0648);

	this.lima = new lib.drag11G();
	this.lima.name = "lima";
	this.lima.setTransform(140.35,461.25,0.8086,0.8086,0,0,0,82.5,25.9);

	this.empat = new lib.drag11G4();
	this.empat.name = "empat";
	this.empat.setTransform(140.35,402.7,0.8086,0.8086,0,0,0,82.5,25.2);

	this.tiga = new lib.drag11G3();
	this.tiga.name = "tiga";
	this.tiga.setTransform(140.1,345.95,0.8086,0.8086,0,0,0,82.2,26.8);

	this.dua = new lib.drag11G2();
	this.dua.name = "dua";
	this.dua.setTransform(140.35,290.6,0.8086,0.8086,0,0,0,82.5,29.2);

	this.satu = new lib.drag11G1();
	this.satu.name = "satu";
	this.satu.setTransform(139.65,236.35,0.8086,0.8086,0,0,0,81.6,27.6);

	this.kotakKartu2 = new lib.target();
	this.kotakKartu2.name = "kotakKartu2";
	this.kotakKartu2.setTransform(485.9,264.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.kotakKartu2},{t:this.satu},{t:this.dua},{t:this.tiga},{t:this.empat},{t:this.lima},{t:this.instance_4},{t:this.shape_9},{t:this.shape_8},{t:this.instance_3},{t:this.shape_7},{t:this.shape_6},{t:this.instance_2},{t:this.shape_5},{t:this.shape_4},{t:this.instance_1},{t:this.shape_3},{t:this.shape_2},{t:this.instance},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Slots10, new cjs.Rectangle(41.2,213.8,512.6999999999999,270.09999999999997), null);


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


(lib.Pieces10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// pieces
	this.lima = new lib.drop11G5();
	this.lima.name = "lima";
	this.lima.setTransform(348,466.1,0.4758,0.4758,0,0,0,134,54.6);
	new cjs.ButtonHelper(this.lima, 0, 1, 1);

	this.empat = new lib.drop11G4();
	this.empat.name = "empat";
	this.empat.setTransform(348,411.75,0.4758,0.4758,0,0,0,121.6,48.6);
	new cjs.ButtonHelper(this.empat, 0, 1, 1);

	this.tiga = new lib.drop11G3();
	this.tiga.name = "tiga";
	this.tiga.setTransform(348,361.95,0.4758,0.4758,0,0,0,128.4,53.3);
	new cjs.ButtonHelper(this.tiga, 0, 1, 1);

	this.dua = new lib.drop11G2();
	this.dua.name = "dua";
	this.dua.setTransform(348,300.35,0.4758,0.4758,0,0,0,128.4,52.6);
	new cjs.ButtonHelper(this.dua, 0, 1, 1);

	this.satu = new lib.drop11G1();
	this.satu.name = "satu";
	this.satu.setTransform(348,245.7,0.4758,0.4758,0,0,0,121.9,48.8);
	new cjs.ButtonHelper(this.satu, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.satu},{t:this.dua},{t:this.tiga},{t:this.empat},{t:this.lima}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces10, new cjs.Rectangle(278.3,224,139.39999999999998,280.9), null);


(lib.infod = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween3("synched",0);

	this.instance_1 = new lib.Tween4copy("synched",0);
	this.instance_1.setTransform(-33.25,0);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween5copy("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},23).to({state:[{t:this.instance_2}]},29).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,x:-33.25},23).wait(30));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},23).to({_off:true,x:0},29).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-58.7,-9.2,84.2,18.4);


(lib.info = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween4("synched",0);

	this.instance_1 = new lib.Tween5("synched",0);
	this.instance_1.setTransform(0,-10);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween6("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},24).to({state:[{t:this.instance_2}]},23).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,y:-10},24).wait(24));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},24).to({_off:true,y:0},23).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-87,-19.2,174.1,28.4);


(lib.Slots1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// slots
	this.target = new lib.targetcopy2();
	this.target.name = "target";
	this.target.setTransform(-12.65,384.2,0.6294,2.0456);

	this.kotakKartu2 = new lib.targetcopy();
	this.kotakKartu2.name = "kotakKartu2";
	this.kotakKartu2.setTransform(-12.65,281.55,0.6294,2.0456);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.kotakKartu2},{t:this.target}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Slots1, new cjs.Rectangle(-56.5,230,86.7,200.5), null);


(lib.Pieces1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// pieces
	this.target = new lib.drag11G13();
	this.target.name = "target";
	this.target.setTransform(365,383.3,0.928,0.9446,0,0,0,45.1,46.9);
	new cjs.ButtonHelper(this.target, 0, 1, 1);

	this.target_1 = new lib.drag11G11();
	this.target_1.name = "target_1";
	this.target_1.setTransform(274.9,383.25,0.928,0.9446,0,0,0,45.1,46.9);
	new cjs.ButtonHelper(this.target_1, 0, 1, 1);

	this.target_2 = new lib.drag11G12();
	this.target_2.name = "target_2";
	this.target_2.setTransform(183.05,383.25,0.928,0.9446,0,0,0,45.1,46.9);
	new cjs.ButtonHelper(this.target_2, 0, 1, 1);

	this.target_3 = new lib.drag11G10();
	this.target_3.name = "target_3";
	this.target_3.setTransform(92.85,383.3,0.928,0.9446,0,0,0,45.1,46.9);
	new cjs.ButtonHelper(this.target_3, 0, 1, 1);

	this.hemm = new lib.drag7G10copy();
	this.hemm.name = "hemm";
	this.hemm.setTransform(456.05,382.5,0.9279,0.9279,0,0,0,45,47);
	new cjs.ButtonHelper(this.hemm, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.hemm},{t:this.target_3},{t:this.target_2},{t:this.target_1},{t:this.target}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces1, new cjs.Rectangle(51,335.7,446.8,95.30000000000001), null);


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


(lib.bg5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		var root1 = this;
		var pieces1 = root1.pieces1;
		var slots1 = root1.slots1;
		var restart1 = root1.restart1;
		var winMessage1 = root1.winMessage1;
		var Score1 = root1.Score1;
		var positions2 = [];
		
		root1.stop();
		
		// root1.btnMenuDasar1.on("click", function () {
		//   window.location.replace("../menu/index.html");
		// });
		
		// root1.btnNextDasar1.on("click", function () {
		//   window.location.replace("../game12/index.html");
		// });
		
		// root1.btnBack3.on("click", function () {
		//   window.location.replace("../game10/index.html");
		// });
		
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
		
		// root1.pp9.gotoAndStop(0);
		
		// root1.pieces1.laut5.on("dblclick", function () {
		//   root1.pp9.gotoAndPlay(0);
		// });
		
		// root1.pp10.gotoAndStop(0);
		
		// root1.pieces1.laut6.on("dblclick", function () {
		//   root1.pp10.gotoAndPlay(0);
		// });
		
		// root1.pp11.gotoAndStop(0);
		
		// root1.pieces1.laut7.on("dblclick", function () {
		//   root1.pp11.gotoAndPlay(0);
		// });
		
		// root1.popUpInfo.gotoAndStop(0);
		
		// root1.btnInfo.on("click", function () {
		//   root1.popUpInfo.gotoAndPlay(0);
		// });
		
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
		    positions2[index] = { x: child.x, y: child.y };
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
		  positions2.sort(function (a, b) {
		    return 0.5 - Math.random();
		  });
		  console.log(pieces1);
		  console.log(pieces1.children);
		  pieces1.children.forEach(function (child, index) {
		    child.originalX = positions2[index].x;
		    child.originalY = positions2[index].y;
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
		    console.log(root1.slot.name, pieces1.target.name);
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
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// Layer_1
	this.drag2G1 = new lib.drag11GJudul();
	this.drag2G1.name = "drag2G1";
	this.drag2G1.setTransform(-12.8,-13.35,0.8086,0.8086,0,0,0,98.2,14.3);
	new cjs.ButtonHelper(this.drag2G1, 0, 1, 1);

	this.restart1 = new lib.Restart();
	this.restart1.name = "restart1";
	this.restart1.setTransform(88.65,-13.95,0.5444,0.5444,0,0,0,0.1,0);
	new cjs.ButtonHelper(this.restart1, 0, 1, 2, false, new lib.Restart(), 3);

	this.winMessage1 = new cjs.Text("Sepertinya Tebakan Anda Salah, Silahkan Coba Lagi", "12px 'Roboto'", "#FFFFFF");
	this.winMessage1.name = "winMessage1";
	this.winMessage1.textAlign = "center";
	this.winMessage1.lineHeight = 16;
	this.winMessage1.lineWidth = 277;
	this.winMessage1.parent = this;
	this.winMessage1.setTransform(48.7,14.2);

	this.Score1 = new cjs.Text("score", "12px 'Roboto'", "#FFFFFF");
	this.Score1.name = "Score1";
	this.Score1.textAlign = "center";
	this.Score1.lineHeight = 18;
	this.Score1.lineWidth = 31;
	this.Score1.parent = this;
	this.Score1.setTransform(142.243,-27.35,1.9238,1.9238);

	this.slots1 = new lib.Slots1();
	this.slots1.name = "slots1";
	this.slots1.setTransform(-201.05,-254.8,0.8714,0.8714);

	this.pieces1 = new lib.Pieces1();
	this.pieces1.name = "pieces1";
	this.pieces1.setTransform(-201.05,-254.8,0.8714,0.8714);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,102,255,0.008)").s().p("EgmrAPdIAA+5MBNXAAAIAAe5g");
	this.shape.setTransform(-12.625,28.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.pieces1},{t:this.slots1},{t:this.Score1},{t:this.winMessage1},{t:this.restart1},{t:this.drag2G1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg5, new cjs.Rectangle(-260.2,-69.9,495.2,197.7), null);


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
	this.instance = new lib.Bitmap125();
	this.instance.setTransform(-257,-263,1.9838,2.0049);

	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_2
	this.instance_1 = new lib.Tween7_1("synched",0);
	this.instance_1.setTransform(42.25,-40.25);
	this.instance_1.alpha = 0;

	this.instance_2 = new lib.Tween8copy("synched",0);
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
	this.instance = new lib.Bitmap124();
	this.instance.setTransform(-257,-263,2.0227,2.0037);

	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_2
	this.instance_1 = new lib.Tween7_1("synched",0);
	this.instance_1.setTransform(42.25,-40.25);
	this.instance_1.alpha = 0;

	this.instance_2 = new lib.Tween8copy("synched",0);
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
	this.instance = new lib.Bitmap123();
	this.instance.setTransform(-260,-265,2.0138,2.0219);

	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_2
	this.instance_1 = new lib.Tween7_1("synched",0);
	this.instance_1.setTransform(42.25,-40.25);
	this.instance_1.alpha = 0;

	this.instance_2 = new lib.Tween8copy("synched",0);
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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAJQgDgEAAgFQAAgFADgDQADgEAGAAQAHAAADAEQADADAAAFQAAAFgDAEQgDAEgHAAQgGAAgDgEg");
	this.shape.setTransform(-299.975,124.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAQBUIAAgnIhMAAIAAgMIBLh0IAWAAIAABuIAYAAIAAASIgYAAIAAAngAANgxIgwBMIAzAAIAAhRg");
	this.shape_1.setTransform(-309.525,117.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgJAJQgDgEAAgFQAAgFADgDQADgEAGAAQAHAAADAEQADADAAAFQAAAFgDAEQgDAEgHAAQgGAAgDgEg");
	this.shape_2.setTransform(-299.975,65.175);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AglBKQgPgNAAgWIAVAAQAAAOAJAIQAIAIAOAAQAPAAAJgIQAIgJAAgPQAAgOgJgIQgJgIgQAAIgQAAIAAgQIAQAAQAOgBAJgHQAIgIAAgOQAAgdgdAAQgNAAgIAIQgJAIAAANIgVAAQAAgUAPgNQAOgNAWgBQAYAAANANQAOAMAAAXQAAALgHALQgHAJgNAGQAOADAIAKQAHAKAAAPQAAAWgPAOQgOANgYAAQgXAAgOgMg");
	this.shape_3.setTransform(-309.775,57.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJAJQgDgEAAgFQAAgFADgDQADgEAGAAQAHAAADAEQADADAAAFQAAAFgDAEQgDAEgHAAQgGAAgDgEg");
	this.shape_4.setTransform(-299.975,8.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("Ag0BVIAAgPIA5hBQANgNAFgKQAFgJAAgKQAAgNgIgIQgIgJgNAAQgPAAgJAJQgJAJAAARIgWAAQAAgYAQgOQAOgOAZAAQAXAAAOAMQANAMAAAVQAAAZgfAhIgtAxIBUAAIAAARg");
	this.shape_5.setTransform(-309.475,0.675);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgJAJQgDgEAAgFQAAgFADgDQADgEAGAAQAHAAADAEQADADAAAFQAAAFgDAEQgDAEgHAAQgGAAgDgEg");
	this.shape_6.setTransform(-299.975,-102.675);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AALBVIAAiOIgqAQIAAgUIA8gWIADAAIAACog");
	this.shape_7.setTransform(-311.025,-110);

	this.instance = new lib.RestoreIcon("single",0);
	this.instance.setTransform(-99.4,61.45,0.8085,0.8085,0,0,0,-0.1,0);
	this.instance.alpha = 0.75;

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_8.setTransform(202.925,119.175);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgMgHgGQgHgGgMAAQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_9.setTransform(189.925,119.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_10.setTransform(176.975,119.175);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgMgHgGQgHgGgMAAQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_11.setTransform(163.975,119.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgVAAIAAixIAVAAIAABrIAMgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_12.setTransform(152.4,116.675);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgYA8QgMgGgGgJQgHgKAAgLIAWAAQAAALAIAGQAIAHAMgBQANAAAHgEQAHgGAAgIQAAgIgGgFQgHgFgPgDQgQgEgKgEQgJgEgFgHQgEgHAAgJQAAgQANgKQANgLATAAQAVAAANALQANALAAARIgVAAQAAgJgHgGQgIgGgLAAQgLgBgHAGQgGAFAAAIQAAAIAGAEQAGAEAPADQAQAEAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgFg");
	this.shape_13.setTransform(133.575,119.3);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgMgHgGQgHgGgMAAQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_14.setTransform(121.025,119.3);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgPIAAhNIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAYAAIAAARIgYAAIAABNQAAAHAEAEQADAEAHgBIAKgBIAAASQgIACgJAAQgNAAgHgJg");
	this.shape_15.setTransform(110.4,117.9);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgMgHgGQgHgGgMAAQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_16.setTransform(100.425,119.3);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_17.setTransform(82.95,116.675);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgMgHgGQgHgGgMAAQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_18.setTransform(69.675,119.3);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgPIAAhNIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAXAAIAAARIgXAAIAABNQAAAHADAEQADAEAIgBIAKgBIAAASQgJACgHAAQgPAAgGgJg");
	this.shape_19.setTransform(59.05,117.9);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgdIAAAAQAAgSAIgPQAGgPANgIQANgIAQAAQAZAAAQASQAQARAAAdIAAABQAAATgHAOQgHAPgNAHQgNAJgRAAQgZAAgPgSgAgZgiQgKANAAAWQAAAVAKANQAKAMAPAAQAQAAAKgMQAJgNAAgWQABgUgLgOQgJgNgQABQgPgBgKANg");
	this.shape_20.setTransform(48.85,119.3);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_21.setTransform(36.95,116.675);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgMgHgGQgHgGgMAAQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_22.setTransform(17.725,119.3);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgmBIQgOgSAAgdIAAgBQAAgcAOgRQANgSAXAAQAVAAAMAPIAAhBIAWAAIAACxIgUAAIgBgOQgNAQgWAAQgVAAgOgSgAgWgJQgIALAAAYQAAAWAIAMQAJAMAPgBQAUABAJgTIAAg4QgJgRgUAAQgPgBgJAMg");
	this.shape_23.setTransform(4.325,116.8);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgMgHgGQgHgGgMAAQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_24.setTransform(-8.525,119.3);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("Ag0BYIAAisIATAAIABAOQAOgRAWAAQAWAAANARQAOARAAAfIAAACQAAAbgOASQgNARgWAAQgVAAgOgOIAAA8gAgfgzIAAA7QAKARAUAAQAPAAAIgNQAJgMAAgXQAAgVgJgMQgIgMgPAAQgUAAgKARg");
	this.shape_25.setTransform(-21.3,121.575);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_26.setTransform(-40.625,119.175);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgMgHgGQgHgGgMAAQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_27.setTransform(-53.625,119.3);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_28.setTransform(-65.2,116.675);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgVAAIAAixIAVAAIAABrIALgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_29.setTransform(-77.15,116.675);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_30.setTransform(-90.475,119.425);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgXBtIAAgSIAKABQAHAAAEgDQADgFAAgJIAAiLIAVAAIAACKQAAAlgggBQgHAAgGgBgAAChYQgDgEAAgFQAAgFADgEQADgDAGAAQAGAAADADQAEAEAAAFQAAAFgEAEQgDADgGAAQgGAAgDgDg");
	this.shape_31.setTransform(-101.025,119.55);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_32.setTransform(-109.125,119.175);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_33.setTransform(-122.175,119.425);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgPIAAhNIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAXAAIAAARIgXAAIAABNQAAAHAEAEQACAEAIgBIAKgBIAAASQgIACgJAAQgOAAgGgJg");
	this.shape_34.setTransform(-132.85,117.9);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQAEAEAAAFQAAAFgEAEQgDADgGAAQgGAAgDgDg");
	this.shape_35.setTransform(-139.25,117.025);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgmBIQgOgSAAgdIAAgBQAAgcAOgRQANgSAXAAQAVAAAMAPIAAhBIAWAAIAACxIgUAAIgBgOQgNAQgWAAQgVAAgOgSgAgWgJQgIALAAAYQAAAWAIAMQAJAMAPgBQAUABAJgTIAAg4QgJgRgUAAQgPgBgJAMg");
	this.shape_36.setTransform(-149.175,116.8);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgdIAAgDQAAgSAHgPQAHgPANgHQANgJAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABATAKALQALALAOAAQAMAAAIgEQAIgFAFgIIANALQgPAYggAAQgYAAgQgRgAgTglQgJAKgCARIA+AAIAAgCQgBgRgIgIQgIgKgNABQgMAAgJAJg");
	this.shape_37.setTransform(-167.475,119.3);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_38.setTransform(-184.225,119.175);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgMgHgGQgHgGgMAAQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_39.setTransform(-201.025,119.3);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_40.setTransform(-214.375,121.625);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_41.setTransform(-230.075,119.175);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgdIAAAAQAAgSAHgPQAHgPANgIQANgIAQAAQAaAAAPASQAQARAAAdIAAABQAAATgHAOQgHAPgNAHQgNAJgRAAQgZAAgPgSgAgZgiQgJANAAAWQAAAVAJANQAKAMAPAAQAQAAAKgMQAKgNAAgWQgBgUgJgOQgKgNgQABQgPgBgKANg");
	this.shape_42.setTransform(-241.45,119.3);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_43.setTransform(-253.35,116.675);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgdBPQgPgGgIgMQgIgLAAgPIAWAAQAAAPAMAKQALAIASAAQARAAAKgHQAJgHAAgMQAAgNgJgGQgIgIgWgGQgdgIgNgLQgNgMAAgRQAAgVAQgNQAQgMAZAAQARgBANAHQAOAHAIALQAHAMAAAOIgWAAQAAgPgKgIQgKgJgRAAQgQgBgJAIQgJAHAAANQAAAKAJAIQAIAHAUAFQAVAGAMAGQAMAIAGAJQAFAJAAANQAAAVgQAMQgQANgaAAQgRAAgPgIg");
	this.shape_44.setTransform(-267.175,117.15);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgdIAAgDQAAgSAHgPQAHgPANgHQANgJAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABATAKALQALALAOAAQAMAAAIgEQAIgFAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAJgCASIA+AAIAAgCQgBgRgIgIQgIgJgNAAQgMAAgJAJg");
	this.shape_45.setTransform(123.125,62.5);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_46.setTransform(106.425,62.375);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgLgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_47.setTransform(89.575,62.5);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_48.setTransform(76.275,64.825);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgIg/QgDgEgBgFQABgFADgEQADgDAFAAQAGAAAEADQACAEAAAFQAAAFgCAEQgEADgGAAQgFAAgDgDg");
	this.shape_49.setTransform(61.05,60.225);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_50.setTransform(51.275,64.825);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_51.setTransform(38.425,62.375);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgLgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_52.setTransform(25.425,62.5);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_53.setTransform(16.075,59.875);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_54.setTransform(6.675,62.625);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_55.setTransform(-10.9,59.875);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_56.setTransform(-24.225,62.625);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAXAAIAAARIgXAAIAABMQAAAIADAEQADADAIAAIAKgBIAAASQgJACgHAAQgPAAgGgJg");
	this.shape_57.setTransform(-34.9,61.1);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_58.setTransform(-44.875,62.375);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_59.setTransform(-57.925,62.625);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_60.setTransform(-132.425,59.875);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgdIAAAAQAAgSAIgPQAGgPAOgIQAMgIAQAAQAZAAAQASQAQASAAAcIAAABQAAASgHAPQgHAPgNAHQgNAJgRAAQgZAAgPgSgAgZgiQgKANAAAWQAAAVAKANQAKAMAPAAQAQABAKgNQAJgNAAgWQABgUgLgOQgJgMgQAAQgPAAgKAMg");
	this.shape_61.setTransform(-142.05,62.5);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgfBJIgBAPIgUAAIAAixIAVAAIAABCQANgQAWAAQAXAAANASQANARAAAdIAAABQAAAdgNARQgNASgXAAQgWAAgNgRgAgfgBIAAA1QAKAUAVgBQAOAAAJgLQAIgMAAgYQAAgWgIgLQgIgLgPAAQgVAAgKATg");
	this.shape_62.setTransform(-155.15,60);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_63.setTransform(-172.375,62.375);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgdIAAAAQAAgSAHgPQAIgPANgIQAMgIAQAAQAaAAAPASQAQASAAAcIAAABQAAASgHAPQgHAPgNAHQgNAJgRAAQgYAAgQgSgAgZgiQgKANAAAWQAAAVAKANQAKAMAPAAQARABAJgNQAKgNAAgWQAAgUgKgOQgKgMgQAAQgPAAgKAMg");
	this.shape_64.setTransform(-189.5,62.5);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAYAAIAAARIgYAAIAABMQAAAIADAEQAEADAHAAIAKgBIAAASQgJACgHAAQgPAAgGgJg");
	this.shape_65.setTransform(-200.4,61.1);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_66.setTransform(-216.325,62.375);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgLgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_67.setTransform(-229.325,62.5);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgVAAIAAixIAVAAIAABrIAMgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_68.setTransform(-240.9,59.875);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgdIAAgDQAAgSAHgPQAHgPANgHQANgJAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABATAKALQALALAOAAQAMAAAIgEQAIgFAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAJgCASIA+AAIAAgCQgBgRgIgIQgIgJgNAAQgMAAgJAJg");
	this.shape_69.setTransform(-253.775,62.5);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgKBUIAAiVIg2AAIAAgSICBAAIAAASIg2AAIAACVg");
	this.shape_70.setTransform(-267.125,60.35);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgPIAAhNIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAXAAIAAARIgXAAIAABNQAAAHADAEQADAEAIAAIAKgCIAAARQgJADgHAAQgPAAgGgJg");
	this.shape_71.setTransform(368.75,4.35);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_72.setTransform(358.675,5.875);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgfBJIgBAOIgUAAIAAiwIAWAAIAABCQANgQAWAAQAWAAANARQANARAAAdIAAADQAAAcgNASQgOARgVAAQgXAAgNgRgAgegBIAAA1QAKATAUABQAPAAAIgMQAJgMAAgYQAAgWgJgLQgIgMgPAAQgVAAgJAUg");
	this.shape_73.setTransform(345.85,3.25);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMgBAIgFQAIgEAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgQgIgKQgIgJgNAAQgMAAgJAKg");
	this.shape_74.setTransform(332.925,5.75);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgKQgHgJAAgLIAWAAQAAALAIAGQAIAHAMAAQANgBAHgFQAHgFAAgHQAAgKgGgEQgHgFgPgEQgQgDgKgEQgJgEgFgIQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgJgHgGQgIgGgLgBQgLABgHAFQgGAFAAAIQAAAIAGAEQAGADAPAEQAQAEAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgGg");
	this.shape_75.setTransform(320.425,5.75);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_76.setTransform(310.925,5.625);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMgBAIgFQAIgEAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgQgIgKQgIgJgNAAQgMAAgJAKg");
	this.shape_77.setTransform(300.275,5.75);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgPIAAhNIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAXAAIAAARIgXAAIAABNQAAAHAEAEQACAEAIAAIAKgCIAAARQgIADgJAAQgOAAgGgJg");
	this.shape_78.setTransform(289.7,4.35);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_79.setTransform(273.775,5.625);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgTAPgLQAPgLAaABIAVAAIAAgKQAAgMgHgGQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_80.setTransform(260.775,5.75);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AAeA+IgehdIgdBdIgRAAIglh8IAVAAIAZBdIAdhdIAQAAIAeBfIAYhfIAWAAIglB8g");
	this.shape_81.setTransform(245.475,5.75);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMgBAIgFQAIgEAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgQgIgKQgIgJgNAAQgMAAgJAKg");
	this.shape_82.setTransform(230.575,5.75);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AAcBZIAAhTQAAgNgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAIIAABZIgVAAIAAixIAVAAIAABEQAPgSAVAAQAoAAAAAsIAABTg");
	this.shape_83.setTransform(217.675,3.125);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgKQgHgJAAgLIAWAAQAAALAIAGQAIAHAMAAQANgBAHgFQAHgFAAgHQAAgKgGgEQgHgFgPgEQgQgDgKgEQgJgEgFgIQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgJgHgGQgIgGgLgBQgLABgHAFQgGAFAAAIQAAAIAGAEQAGADAPAEQAQAEAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgGg");
	this.shape_84.setTransform(199.125,5.75);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgTAPgLQAPgLAaABIAVAAIAAgKQAAgMgHgGQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_85.setTransform(186.575,5.75);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_86.setTransform(177.225,3.125);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMgBAIgFQAIgEAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgQgIgKQgIgJgNAAQgMAAgJAKg");
	this.shape_87.setTransform(168.325,5.75);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgVAAIAAixIAVAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_88.setTransform(156.8,3.125);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_89.setTransform(137.575,5.625);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgTAPgLQAPgLAaABIAVAAIAAgKQAAgMgHgGQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_90.setTransform(124.575,5.75);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_91.setTransform(111.275,8.075);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_92.setTransform(98.425,5.625);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMgBAIgFQAIgEAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgQgIgKQgIgJgNAAQgMAAgJAKg");
	this.shape_93.setTransform(85.825,5.75);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AgmBIQgOgSAAgdIAAgBQAAgcAOgSQANgRAXAAQAVAAAMAPIAAhBIAWAAIAACwIgUAAIgBgNQgNAQgWAAQgVAAgOgSgAgWgIQgIAKAAAZQAAAUAIAMQAJANAPAAQAUAAAJgSIAAg5QgJgSgUAAQgPABgJAMg");
	this.shape_94.setTransform(72.475,3.25);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQADAEABAFQgBAFgDAEQgDADgGAAQgGAAgDgDg");
	this.shape_95.setTransform(57.3,3.475);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgTAPgLQAPgLAaABIAVAAIAAgKQAAgMgHgGQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_96.setTransform(47.925,5.75);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_97.setTransform(34.925,5.875);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgKQgHgJAAgLIAWAAQAAALAIAGQAIAHAMAAQANgBAHgFQAHgFAAgHQAAgKgGgEQgHgFgPgEQgQgDgKgEQgJgEgFgIQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgJgHgGQgIgGgLgBQgLABgHAFQgGAFAAAIQAAAIAGAEQAGADAPAEQAQAEAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgGg");
	this.shape_98.setTransform(22.375,5.75);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMgBAIgFQAIgEAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgQgIgKQgIgJgNAAQgMAAgJAKg");
	this.shape_99.setTransform(10.225,5.75);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgKQgHgJAAgLIAWAAQAAALAIAGQAIAHAMAAQANgBAHgFQAHgFAAgHQAAgKgGgEQgHgFgPgEQgQgDgKgEQgJgEgFgIQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgJgHgGQgIgGgLgBQgLABgHAFQgGAFAAAIQAAAIAGAEQAGADAPAEQAQAEAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgGg");
	this.shape_100.setTransform(-2.275,5.75);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_101.setTransform(-21.125,8.075);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_102.setTransform(-33.975,5.625);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgTAPgLQAPgLAaABIAVAAIAAgKQAAgMgHgGQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_103.setTransform(-46.975,5.75);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AglBXIgIgBIAAgRIAGAAQALAAAGgEQAGgFAEgLIAEgNIgsh7IAXAAIAeBdIAdhdIAXAAIgyCQQgLAfgZAAg");
	this.shape_104.setTransform(-59.075,8.275);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_105.setTransform(-77.075,5.625);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgTAPgLQAPgLAaABIAVAAIAAgKQAAgMgHgGQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_106.setTransform(-90.075,5.75);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AAeA+IgehdIgdBdIgRAAIglh8IAVAAIAZBdIAdhdIAQAAIAeBfIAYhfIAWAAIglB8g");
	this.shape_107.setTransform(-105.375,5.75);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMgBAIgFQAIgEAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgQgIgKQgIgJgNAAQgMAAgJAKg");
	this.shape_108.setTransform(-120.275,5.75);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AAcBZIAAhTQAAgNgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAIIAABZIgVAAIAAixIAVAAIAABEQAPgSAVAAQAoAAAAAsIAABTg");
	this.shape_109.setTransform(-133.125,3.125);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AAcBZIAAhTQAAgNgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAIIAABZIgVAAIAAixIAVAAIAABEQAPgSAVAAQAoAAAAAsIAABTg");
	this.shape_110.setTransform(-152.075,3.125);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgoAvQgQgRAAgeIAAAAQAAgTAIgOQAGgPANgIQANgIAQAAQAZAAAQASQAQASAAAcIAAACQAAASgHAOQgHAOgNAJQgNAIgRAAQgZAAgPgSgAgZghQgKAMAAAXQAAAUAKANQAKANAPAAQAQAAAKgOQAJgMAAgWQABgVgLgMQgJgNgQgBQgPABgKANg");
	this.shape_111.setTransform(-165.35,5.75);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgPIAAhNIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAXAAIAAARIgXAAIAABNQAAAHADAEQADAEAIAAIAKgCIAAARQgJADgHAAQgPAAgGgJg");
	this.shape_112.setTransform(-176.3,4.35);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_113.setTransform(-186.275,5.625);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AgoAvQgQgRAAgeIAAAAQAAgTAIgOQAGgPANgIQANgIAQAAQAZAAAQASQAQASAAAcIAAACQAAASgHAOQgHAOgNAJQgNAIgRAAQgZAAgPgSgAgZghQgKAMAAAXQAAAUAKANQAKANAPAAQAQAAAKgOQAJgMAAgWQABgVgLgMQgJgNgQgBQgPABgKANg");
	this.shape_114.setTransform(-199.55,5.75);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AgkAwQgQgSAAgdIAAgDQAAgRAHgPQAHgOAMgIQANgIAQAAQAVAAAOANQAOANABATIgUAAQgBgLgJgJQgIgIgMAAQgPABgJALQgJAMAAAWIAAAEQAAAVAJALQAJANAPAAQAMgBAIgGQAJgIABgKIAUAAQgBALgHAJQgGALgMAFQgLAGgNAAQgYAAgPgRg");
	this.shape_115.setTransform(-212.275,5.75);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_116.setTransform(-231.375,8.075);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgTAPgLQAPgLAaABIAVAAIAAgKQAAgMgHgGQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_117.setTransform(-244.225,5.75);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_118.setTransform(-254.075,5.625);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("Ag8BUIAAinIAwAAQAVAAARAJQAQAKAKASQAJASAAAXIAAAKQAAAYgJASQgJASgRAJQgSAKgVAAgAgmBCIAYAAQAYAAAPgQQAOgQAAgeIAAgIQAAgdgNgQQgOgQgYAAIgaAAg");
	this.shape_119.setTransform(-266.175,3.6);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQADAEABAFQgBAFgDAEQgDADgGAAQgGAAgDgDg");
	this.shape_120.setTransform(-77.25,-53.275);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAARAFAKIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_121.setTransform(-86.625,-51);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_122.setTransform(-99.575,-50.875);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgJQgHgKAAgLIAWAAQAAALAIAGQAIAGAMAAQANAAAHgEQAHgGAAgIQAAgJgGgEQgHgFgPgDQgQgEgKgEQgJgFgFgHQgEgGAAgJQAAgQANgKQANgLATAAQAVAAANALQANALAAARIgVAAQAAgJgHgGQgIgHgLABQgLgBgHAGQgGAFAAAIQAAAIAGAEQAGADAPAFQAQADAKAFQAKAEAFAHQAFAHAAAKQAAARgOAKQgNAKgWAAQgOAAgLgGg");
	this.shape_123.setTransform(-112.175,-51);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgPQAHgPANgHQANgJAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALALAOAAQAMAAAIgEQAIgFAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAJgCASIA+AAIAAgCQgBgRgIgIQgIgJgNAAQgMgBgJAKg");
	this.shape_124.setTransform(-124.325,-51);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgJQgHgKAAgLIAWAAQAAALAIAGQAIAGAMAAQANAAAHgEQAHgGAAgIQAAgJgGgEQgHgFgPgDQgQgEgKgEQgJgFgFgHQgEgGAAgJQAAgQANgKQANgLATAAQAVAAANALQANALAAARIgVAAQAAgJgHgGQgIgHgLABQgLgBgHAGQgGAFAAAIQAAAIAGAEQAGADAPAFQAQADAKAFQAKAEAFAHQAFAHAAAKQAAARgOAKQgNAKgWAAQgOAAgLgGg");
	this.shape_125.setTransform(-136.775,-51);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_126.setTransform(-155.675,-48.675);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_127.setTransform(-168.525,-51.125);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAARAFAKIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_128.setTransform(-181.525,-51);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AglBXIgIgBIAAgRIAGAAQALAAAGgEQAGgFAEgLIAEgNIgsh7IAXAAIAeBdIAdhdIAXAAIgyCQQgLAfgZAAg");
	this.shape_129.setTransform(-193.625,-48.475);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_130.setTransform(-211.575,-51.125);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAARAFAKIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_131.setTransform(-224.575,-51);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("AAeA/IgeheIgdBeIgRAAIglh8IAVAAIAZBcIAdhcIAQAAIAeBeIAYheIAWAAIglB8g");
	this.shape_132.setTransform(-239.875,-51);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgPQAHgPANgHQANgJAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALALAOAAQAMAAAIgEQAIgFAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAJgCASIA+AAIAAgCQgBgRgIgIQgIgJgNAAQgMgBgJAKg");
	this.shape_133.setTransform(-254.825,-51);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("AAcBZIAAhTQAAgNgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAIIAABZIgVAAIAAixIAVAAIAABEQAPgSAVAAQAoAAAAAsIAABTg");
	this.shape_134.setTransform(-267.675,-53.625);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgJQgHgKAAgLIAWAAQAAALAIAGQAIAGAMAAQANABAHgGQAHgEAAgJQAAgJgGgEQgHgFgPgDQgQgEgKgEQgJgFgFgHQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgHgLAAQgLAAgHAGQgGAFAAAIQAAAIAGAEQAGAEAPAEQAQADAKAFQAKAEAFAHQAFAHAAAKQAAARgOAKQgNAKgWAAQgOAAgLgGg");
	this.shape_135.setTransform(388.475,-107.8);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_136.setTransform(375.925,-107.8);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_137.setTransform(366.575,-110.425);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgPQAHgOANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALALAOAAQAMABAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgQgIgKQgIgIgNgBQgMAAgJAKg");
	this.shape_138.setTransform(357.625,-107.8);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_139.setTransform(346.1,-110.425);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_140.setTransform(328.15,-110.425);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAVAAIAAB8gAgIg/QgDgEgBgFQABgFADgEQADgDAFAAQAGAAAEADQACAEAAAFQAAAFgCAEQgEADgGAAQgFAAgDgDg");
	this.shape_141.setTransform(318.45,-110.075);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgQIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIADAEQAEADAHABIAKgBIAAARQgJACgHAAQgOAAgHgJg");
	this.shape_142.setTransform(311.35,-109.2);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgJQgHgKAAgLIAWAAQAAALAIAGQAIAGAMAAQANABAHgGQAHgEAAgJQAAgJgGgEQgHgFgPgDQgQgEgKgEQgJgFgFgHQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgHgLAAQgLAAgHAGQgGAFAAAIQAAAIAGAEQAGAEAPAEQAQADAKAFQAKAEAFAHQAFAHAAAKQAAARgOAKQgNAKgWAAQgOAAgLgGg");
	this.shape_143.setTransform(301.725,-107.8);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQAEAEAAAFQAAAFgEAEQgDADgGAAQgGAAgDgDg");
	this.shape_144.setTransform(292.75,-110.075);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_145.setTransform(286.425,-107.925);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgPQAHgOANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALALAOAAQAMABAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgQgIgKQgIgIgNgBQgMAAgJAKg");
	this.shape_146.setTransform(275.775,-107.8);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgQIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIAEAEQADADAHABIAKgBIAAARQgIACgJAAQgNAAgHgJg");
	this.shape_147.setTransform(265.2,-109.2);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_148.setTransform(256.55,-110.425);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_149.setTransform(243.275,-107.8);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_150.setTransform(233.425,-107.925);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_151.setTransform(222.325,-107.8);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_152.setTransform(210.75,-110.425);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_153.setTransform(192.75,-110.425);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_154.setTransform(179.475,-107.8);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgQIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIAEAEQADADAHABIAKgBIAAARQgIACgJAAQgNAAgHgJg");
	this.shape_155.setTransform(168.9,-109.2);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgcIAAgBQAAgSAIgPQAGgPANgIQANgIAQAAQAZAAAQASQAQARAAAdIAAACQAAARgHAPQgHAOgNAIQgNAJgRAAQgZAAgPgSgAgZghQgKAMAAAXQAAAUAKANQAKAMAPAAQAQABAKgNQAJgNAAgWQABgUgLgNQgJgOgQAAQgPAAgKAOg");
	this.shape_156.setTransform(158.65,-107.8);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_157.setTransform(146.75,-110.425);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_158.setTransform(127.375,-107.675);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FFFFFF").s().p("AgXBtIAAgRIAKABQAHAAAEgFQADgDAAgKIAAiLIAVAAIAACLQAAAjggABQgHAAgGgCgAAChYQgDgEAAgFQAAgGADgDQADgDAGgBQAGABADADQAEADAAAGQAAAFgEAEQgDADgGAAQgGAAgDgDg");
	this.shape_159.setTransform(116.825,-107.55);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_160.setTransform(108.675,-107.675);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_161.setTransform(95.675,-107.925);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgPQAHgOANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALALAOAAQAMABAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgQgIgKQgIgIgNgBQgMAAgJAKg");
	this.shape_162.setTransform(83.125,-107.8);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_163.setTransform(66.425,-107.925);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_164.setTransform(43.525,-107.925);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_165.setTransform(30.525,-107.8);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FFFFFF").s().p("AAeA/IgeheIgdBeIgRAAIglh8IAVAAIAZBcIAdhcIAQAAIAeBeIAYheIAWAAIglB8g");
	this.shape_166.setTransform(15.225,-107.8);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgPQAHgOANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALALAOAAQAMABAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgQgIgKQgIgIgNgBQgMAAgJAKg");
	this.shape_167.setTransform(0.275,-107.8);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#FFFFFF").s().p("AAcBZIAAhTQAAgNgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAIIAABZIgVAAIAAixIAVAAIAABEQAPgSAVAAQAoAAAAAsIAABTg");
	this.shape_168.setTransform(-12.575,-110.425);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgVAAIAAixIAVAAIAABrIAMgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_169.setTransform(-30.3,-110.425);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQADAEAAAFQAAAFgDAEQgDADgGAAQgGAAgDgDg");
	this.shape_170.setTransform(-40,-110.075);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgQIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAXAAIAAAQIgXAAIAABMQAAAIADAEQADADAIABIAKgBIAAARQgJACgHAAQgPAAgGgJg");
	this.shape_171.setTransform(-47.05,-109.2);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgJQgHgKAAgLIAWAAQAAALAIAGQAIAGAMAAQANABAHgGQAHgEAAgJQAAgJgGgEQgHgFgPgDQgQgEgKgEQgJgFgFgHQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgHgLAAQgLAAgHAGQgGAFAAAIQAAAIAGAEQAGAEAPAEQAQADAKAFQAKAEAFAHQAFAHAAAKQAAARgOAKQgNAKgWAAQgOAAgLgGg");
	this.shape_172.setTransform(-56.675,-107.8);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQADAEAAAFQAAAFgDAEQgDADgGAAQgGAAgDgDg");
	this.shape_173.setTransform(-65.65,-110.075);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_174.setTransform(-71.975,-107.925);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgPQAHgOANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALALAOAAQAMABAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgQgIgKQgIgIgNgBQgMAAgJAKg");
	this.shape_175.setTransform(-82.675,-107.8);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgQIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIADAEQAEADAHABIAKgBIAAARQgJACgHAAQgOAAgHgJg");
	this.shape_176.setTransform(-93.2,-109.2);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgVAAIAAixIAVAAIAABrIAMgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_177.setTransform(-101.85,-110.425);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_178.setTransform(-115.125,-107.8);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_179.setTransform(-124.975,-107.925);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_180.setTransform(-136.075,-107.8);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_181.setTransform(-147.65,-110.425);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_182.setTransform(-165.65,-110.425);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_183.setTransform(-178.925,-107.8);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgQIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAXAAIAAAQIgXAAIAABMQAAAIAEAEQACADAIABIAKgBIAAARQgIACgJAAQgOAAgGgJg");
	this.shape_184.setTransform(-189.55,-109.2);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgcIAAgBQAAgSAHgPQAIgPAMgIQANgIAQAAQAZAAAQASQAQARAAAdIAAACQAAARgHAPQgHAOgNAIQgNAJgRAAQgYAAgQgSgAgZghQgKAMABAXQgBAUAKANQAKAMAPAAQAQABAKgNQAKgNgBgWQAAgUgKgNQgJgOgQAAQgPAAgKAOg");
	this.shape_185.setTransform(-199.8,-107.8);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgVAAIAAixIAVAAIAABrIALgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_186.setTransform(-211.7,-110.425);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_187.setTransform(-231.375,-105.475);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_188.setTransform(-244.225,-107.8);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_189.setTransform(-254.075,-107.925);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#FFFFFF").s().p("Ag8BUIAAinIAwAAQAVAAARAKQAQAJAKASQAJASAAAXIAAAKQAAAYgJARQgJASgRAKQgSAKgVAAgAgmBCIAYAAQAYAAAPgQQAOgQAAgeIAAgJQAAgcgNgQQgOgQgYAAIgaAAg");
	this.shape_190.setTransform(-266.175,-109.95);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgJgJQgJgKgUAAQgaAAgNAXIAACnIhAAAIAAjtIA9AAIABAcQAZggArAAQAlAAATAWQASAWABAtIAACYg");
	this.shape_191.setTransform(209.8,-167.7);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#FFFFFF").s().p("AgfCmIAAjtIA/AAIAADtgAgYhtQgKgJAAgOQgBgPAKgJQAKgJAPAAQAQAAAKAJQAKAJgBAPQABAOgKAJQgKAKgQAAQgPAAgJgKg");
	this.shape_192.setTransform(191.25,-172.175);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#FFFFFF").s().p("AhRBnQgYgUAAgfQAAgmAcgTQAcgUA0AAIAeAAIAAgOQAAgQgJgKQgJgKgQAAQgRAAgIAHQgKAIAAAOIg/AAQgBgVANgSQANgRAXgKQAYgKAcAAQArAAAbAWQAZAWAAAoIAABmQAAAiAKARIAAAEIhAAAQgFgJgCgNQgXAagkAAQgjAAgWgUgAgpAsIAAADQAAAMAIAIQAIAIAPAAQANAAAMgHQAMgGAGgKIAAgpIgYAAQgvAAgDAhg");
	this.shape_193.setTransform(173.2,-167.475);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#FFFFFF").s().p("ABqB5IAAiWQAAgVgHgJQgIgKgUAAQgdAAgLAcIAACiIg+AAIAAiWQAAgVgIgJQgIgKgUAAQgbABgMAWIAACnIg/AAIAAjtIA7AAIACAbQAZgfArAAQAtAAARAlQAZglAvAAQAmAAATAWQATAXAAAuIAACWg");
	this.shape_194.setTransform(141.725,-167.7);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#FFFFFF").s().p("AhCB5IAAjtIA8AAIABAdQATghAhAAQALAAAJADIgBA9QgNgCgJAAQglAAgKAYIAACbg");
	this.shape_195.setTransform(114.95,-167.7);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#FFFFFF").s().p("AhKBbQghggAAg1IAAgGQAAgjAOgcQAOgdAZgPQAZgPAgAAQAxAAAcAfQAcAeAAA5IAAAZIiXAAQADAXAQAOQAPAOAXAAQAlAAAUgbIAgAjQgPAVgYALQgYALgeAAQgzAAghgggAgbg6QgMANgDAXIBXAAIAAgFQAAgVgLgLQgLgMgUAAQgSAAgMANg");
	this.shape_196.setTransform(93.925,-167.475);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#FFFFFF").s().p("Ah2CgIAAk/IBwAAQA5AAAfAWQAeAXAAArQAAAXgMASQgNASgVAIQAZAFAOATQAOATAAAbQAAAugeAYQgdAXg2ABgAg0BrIA4AAQAXAAANgLQANgLAAgUQAAgsgtAAIg8AAgAg0gZIAxAAQAxgBAAgnQAAgVgNgKQgNgKgaAAIguAAg");
	this.shape_197.setTransform(67.475,-171.575);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#FFFFFF").s().p("AAlCoIg8hfIgWAXIAABIIhAAAIAAlPIBAAAIAAC5IALgPIA8hHIBMAAIhVBiIBdCKg");
	this.shape_198.setTransform(31.1,-172.45);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#FFFFFF").s().p("AhRBjQgUgWAAgrIAAiaIA/AAIAACZQAAAlAhAAQAgAAAMgXIAAinIA/AAIAADsIg7AAIgCgYQgYAdgoAAQgmAAgUgWg");
	this.shape_199.setTransform(5,-167.25);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#FFFFFF").s().p("Ag5DSIAAgyQAMACAIAAQAeAAAAgfIAAj6IA+AAIAAD6QAAAngVAWQgVAWgmAAQgRAAgPgEgAgDidQgKgJAAgOQAAgPAKgJQAIgJARAAQARAAAJAJQAJAJAAAPQAAAOgJAJQgKAKgQAAQgQAAgJgKg");
	this.shape_200.setTransform(-15.65,-167.375);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgIgJQgJgKgVAAQgZAAgOAXIAACnIhAAAIAAjtIA9AAIABAcQAZggArAAQAlAAATAWQASAWABAtIAACYg");
	this.shape_201.setTransform(-31.95,-167.7);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#FFFFFF").s().p("AhRBjQgUgWgBgrIAAiaIBAAAIAACZQAAAlAiAAQAfAAAMgXIAAinIBAAAIAADsIg8AAIgCgYQgYAdgoAAQgmAAgUgWg");
	this.shape_202.setTransform(-57.15,-167.25);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#FFFFFF").s().p("AgjBTIAAh/IgjAAIAAgvIAjAAIAAg6IA/AAIAAA6IAoAAIAAAvIgoAAIAAB1QAAANAFAGQAFAGAOAAQAKAAAJgCIAAAwQgTAGgUAAQhCAAgBhDg");
	this.shape_203.setTransform(-77.575,-170.175);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#FFFFFF").s().p("AhKBbQghggAAg1IAAgGQAAgjAOgcQAOgdAZgPQAZgPAgAAQAxAAAcAfQAcAeAAA5IAAAZIiXAAQADAXAQAOQAPAOAXAAQAlAAAUgbIAgAjQgPAVgYALQgYALgeAAQgzAAghgggAgbg6QgMANgDAXIBXAAIAAgFQAAgVgLgLQgLgMgUAAQgSAAgMANg");
	this.shape_204.setTransform(-96.725,-167.475);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#FFFFFF").s().p("Ah6CgIAAk/IB8AAQAkAAAbANQAcANAPAZQAOAYAAAfQAAAvgfAaQghAbg5AAIg4AAIAABxgAg3gFIA5AAQAbAAANgNQAOgMAAgXQAAgXgOgPQgOgOgYgBIg7AAg");
	this.shape_205.setTransform(-123,-171.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.instance},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).to({state:[]},1).wait(12));

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


// stage content:
(lib.game14_temp = function(mode,startPosition,loop) {
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
		  window.location.replace("../game15/index.html");
		});
		
		root.btnBack3.on("click", function () {
		  window.location.replace("../game13/index.html");
		});
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
		root.pp1.gotoAndStop(0);
		
		root.g1.on("click", function () {
		  root.pp1.gotoAndPlay(0);
		});
		
		root.pp2.gotoAndStop(0);
		
		root.g2.on("click", function () {
		  root.pp2.gotoAndPlay(0);
		});
		
		root.pp3.gotoAndStop(0);
		
		root.g3.on("click", function () {
		  root.pp3.gotoAndPlay(0);
		});
		
		root.popUpInfo.gotoAndStop(0);
		
		root.btnInfo.on("click", function () {
		  root.popUpInfo.gotoAndPlay(0);
		});
		
		root.setup = function () {
		  document.body.style.backgroundColor = lib.properties.color;
		  createjs.Touch.enable(stage);
		  stage.mouseMoveOutside = true;
		  root.drawStart = stage.on("drawstart", root.start, null, true);
		};
		
		root.start = function (e) {
		  stage.off("drawstart", root.drawStart);
		  winMessage.originalY1 = winMessage.y;
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
		  winMessage.y = winMessage.originalY1 + 60;
		  createjs.Tween.get(winMessage).to(
		    { alpha: 1, y: winMessage.originalY1 },
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
		  console.log(pieces);
		  console.log(pieces.children);
		  pieces.children.forEach(function (child1, index) {
		    child1.originalX1 = positions1[index].x;
		    child1.originalY1 = positions1[index].y;
		    child1.mouseEnabled = true;
		    createjs.Tween.get(child1).to(
		      { x: child1.originalX1, y: child1.originalY1 },
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
		    console.log(root.slot.name, pieces.target.name);
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
		  winMessage.y = winMessage.originalY1 + 60;
		  createjs.Tween.get(winMessage).to(
		    { alpha: 1, y: winMessage.originalY1 },
		    500,
		    createjs.Ease.backInOut
		  );
		};
		
		root.onMatch = function () {
		  winMessage.text = "Selamat! Tebakan Anda Benar!";
		  pieces.skor++;
		  Score.text = pieces.skor * 20;
		  winMessage.alpha = 0;
		  winMessage.y = winMessage.originalY1 + 60;
		  createjs.Tween.get(winMessage).to(
		    { alpha: 1, y: winMessage.originalY1 },
		    500,
		    createjs.Ease.backInOut
		  );
		};
		
		root.onWin = function () {
		  winMessage.text = "Yey!, Anda Berhasil Menyelesaikan Tantangan. Selamat!";
		  winMessage.alpha = 0;
		  winMessage.y = winMessage.originalY1 + 60;
		  createjs.Tween.get(winMessage).to(
		    { alpha: 1, y: winMessage.originalY1 },
		    500,
		    createjs.Ease.backInOut
		  );
		};
		
		root.onMiss = function () {
		  createjs.Tween.get(pieces.target).to(
		    { x: pieces.target.originalX1, y: pieces.target.originalY1 },
		    350,
		    createjs.Ease.backInOut
		  );
		  winMessage.text = "Silahkan letakkan pada kotak yang sesuai ya..";
		  winMessage.alpha = 0;
		  winMessage.y = winMessage.originalY1 + 60;
		  createjs.Tween.get(winMessage).to(
		    { alpha: 1, y: winMessage.originalY1 },
		    500,
		    createjs.Ease.backInOut
		  );
		};
		
		root.setup();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// pp3
	this.pp3 = new lib.pp3();
	this.pp3.name = "pp3";
	this.pp3.setTransform(436.6,314.2);

	this.timeline.addTween(cjs.Tween.get(this.pp3).wait(1));

	// pp2
	this.pp2 = new lib.pp2();
	this.pp2.name = "pp2";
	this.pp2.setTransform(436.6,314.2);

	this.timeline.addTween(cjs.Tween.get(this.pp2).wait(1));

	// pp1
	this.pp1 = new lib.pp1();
	this.pp1.name = "pp1";
	this.pp1.setTransform(436.6,314.2);

	this.timeline.addTween(cjs.Tween.get(this.pp1).wait(1));

	// code
	this.popUpInfo = new lib.popUpInfo();
	this.popUpInfo.name = "popUpInfo";
	this.popUpInfo.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.popUpInfo).wait(1));

	// Layer_1
	this.instance = new lib.sustain();
	this.instance.setTransform(141.5,44.2,1,1,0,0,0,125.9,18.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// base
	this.winMessage = new cjs.Text("Sepertinya Tebakan Anda Salah, Silahkan Coba Lagi", "17px 'Roboto'", "#FFFFFF");
	this.winMessage.name = "winMessage";
	this.winMessage.textAlign = "center";
	this.winMessage.lineHeight = 22;
	this.winMessage.lineWidth = 418;
	this.winMessage.parent = this;
	this.winMessage.setTransform(397.6315,164.85,0.9382,0.9382);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E74C3C").s().p("Egg7ACMIAAkXMBB3AAAIAAEXg");
	this.shape.setTransform(398.1157,173.6031,0.9383,0.9383);

	this.btnInfo = new lib.btnInfo();
	this.btnInfo.name = "btnInfo";
	this.btnInfo.setTransform(638.35,176.05,0.6435,0.6435,0,0,0,0.1,0);
	new cjs.ButtonHelper(this.btnInfo, 0, 1, 2, false, new lib.btnInfo(), 3);

	this.restart = new lib.Restart();
	this.restart.name = "restart";
	this.restart.setTransform(697.75,174.85,0.7541,0.7541);
	new cjs.ButtonHelper(this.restart, 0, 1, 2, false, new lib.Restart(), 3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJApQgKAAgHgGQgHgHABgKQAAgMALgGQAKgHAQAAIAOAAIABgHQAAgHgDgEQgDgEgIAAQgGAAgFADQgFAEgBAFIgNAAQABgGAEgGQAFgFAIgDQAGgDAIAAQAMAAAHAIQAHAHgBAMIgGAmIgBAGIABAIIAAABIgOAAIgBgEIABgFQgKAKgLAAIgBAAgAgLAFQgGAEgCAHQgBAGAEAEQADADAHAAQAGABAEgEQAGgDAEgFIADgRIgKAAQgMAAgGAEg");
	this.shape_1.setTransform(163.45,195.7761);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgZAeQgIgKABgRIAAgDQACgLAGgKQAFgJAJgFQAIgFAIAAQANAAAHAIQAHAIAAANIAAAKIgBAFIgzAAQgBALAFAHQAFAIAJAAQALAAAKgKIAIAGQgFAHgIAEQgIAEgJAAQgOAAgJgLgAgIgXQgGAFgDAMIAlAAIABgBQABgJgEgHQgFgGgHAAIgCAAQgGAAgGAGg");
	this.shape_2.setTransform(155.8388,195.7977);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgNA5QgLgBgHgIQgGgIgBgOIAAgLQACgMAFgIQAFgKAIgFQAHgFAKAAQAMABAHAJIAIgpIANAAIgTBvIgNAAIACgIQgJAKgMAAIgBAAgAgNgIQgFAFgDAHQgDAJAAAKQgBAKAEAGQAEAGAHAAQALABAJgMIAGgkQgEgLgLAAQgIAAgGAFg");
	this.shape_3.setTransform(148.05,194.2011);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgPA2IANhOIANAAIgNBOgAACgnQgCgCABgEQAAgDABgDQADgCADAAQADAAACACQADACAAAEQAAADgDACQgCADgDAAQgDAAgDgCg");
	this.shape_4.setTransform(141.95,194.3458);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgEApQgKAAgHgGQgIgEgDgKQgDgJABgLQABgLAFgKQAGgJAJgGQAIgGAKABQAKAAAHAFQAHAGAEAJQADAJgBALIAAAAQgCAMgFAJQgGAKgIAFQgIAFgIAAIgCAAgAgMgVQgHAIgCANIAAABIAAAKQABAIAEAGQAFAFAHAAQAGAAAFgDQAGgEAEgHQADgHACgJIAAgJQgBgJgFgGQgEgFgHAAIgBAAQgJAAgHAIg");
	this.shape_5.setTransform(135.7614,195.8);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgYAoIANhNIAMgBIgBAKQAIgMALAAIAGACIgBANIgGgBQgNAAgGALIgKA3g");
	this.shape_6.setTransform(129.425,195.7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgZAeQgIgKABgRIAAgDQACgLAGgKQAFgJAJgFQAIgFAIAAQANAAAHAIQAHAIAAANIAAAKIgBAFIgzAAQgBALAFAHQAFAIAJAAQALAAAKgKIAIAGQgFAHgIAEQgIAEgJAAQgOAAgJgLgAgIgXQgGAFgDAMIAlAAIABgBQABgJgEgHQgFgGgHAAIgCAAQgGAAgGAGg");
	this.shape_7.setTransform(122.7888,195.7977);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgMAsQgEgGABgJIAIgwIgOAAIACgKIAOAAIADgUIANAAIgEAUIAPAAIgCAKIgPAAIgHAwIAAAEQABAFAEAAIAHgBIgBALIgJACQgIAAgEgGg");
	this.shape_8.setTransform(116.675,194.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgMIAOAAQAAAHADAEQAFAEAHAAQAHAAAFgDQAFgDABgGQABgIgKgDIgNgEQgRgFAAgOQABgLAJgGQAJgHALAAQAMAAAIAHQAHAHAAALIgOAAQABgGgEgEQgEgEgHAAQgGAAgFAEQgEADAAAFQgCAHAKADIAFACQAOAEAGAEQAFAGAAAIQgBAIgEAFQgEAGgIADQgHACgHAAQgNAAgIgHg");
	this.shape_9.setTransform(110.1,195.7983);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAgA1IgFgcIgqAAIgOAcIgQAAIA5hpIANAAIAUBpgAgJAOIAiAAIgJgxg");
	this.shape_10.setTransform(100.85,194.425);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgPAmQgHgEgEgGQgFgGAAgHIAOAAQAAAHAFAEQAGAEAHAAQAIAAAEgDQAFgEAAgEQAAgGgEgDQgFgDgJgDQgKgCgGgCQgGgCgDgFQgDgEAAgGQAAgJAIgIQAJgGAMAAQANAAAIAGQAJAIgBAKIgNAAQAAgFgFgEQgFgEgGAAQgHAAgEADQgEAEgBAFQAAAEAEADQAFACAJACQAKADAGADQAHACADAFQACAEAAAHQAAAKgIAHQgJAGgNAAQgIAAgIgDg");
	this.shape_11.setTransform(190.55,175.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_12.setTransform(182.625,175.8);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_13.setTransform(176.725,174.125);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgXAeQgJgKgBgSIAAgCQAAgLAFgKQAFgIAHgGQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAAMAHAGQAHAIAIAAQAHAAAGgDQAEgDAEgFIAJAHQgKAPgVAAQgPAAgKgLgAgMgXQgFAGgBALIAmAAIAAgBQAAgKgFgHQgGgFgIAAQgHAAgGAGg");
	this.shape_14.setTransform(171.05,175.8);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AAYA1IglgxIgNANIAAAkIgOAAIAAhpIAOAAIAAA0IAvg0IARAAIgpAvIAsA6g");
	this.shape_15.setTransform(162.925,174.425);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_16.setTransform(150.625,174.125);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_17.setTransform(144.5,174.35);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgLIAPAAIAAgTIAMAAIAAATIAPAAIAAALIgPAAIAAAwQAAAEACADQACADAFgBIAHgBIAAALIgLACQgJAAgEgFg");
	this.shape_18.setTransform(140.025,174.9);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgPAmQgHgEgFgGQgDgGAAgHIANAAQABAHAFAEQAEAEAIAAQAHAAAGgDQAEgEAAgEQAAgGgEgDQgEgDgKgDQgKgCgGgCQgGgCgDgFQgDgEAAgGQAAgJAIgIQAJgGALAAQAOAAAJAGQAHAIABAKIgOAAQAAgFgEgEQgGgEgHAAQgGAAgEADQgFAEABAFQAAAEADADQAEACAKACQAKADAGADQAGACADAFQAEAEAAAHQAAAKgJAHQgIAGgOAAQgIAAgIgDg");
	this.shape_19.setTransform(133.9,175.8);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_20.setTransform(128.25,174.35);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_21.setTransform(124.25,175.725);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgWAeQgLgKABgSIAAgCQgBgLAFgKQAEgIAJgGQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAAMAGAGQAIAIAJAAQAGAAAFgDQAFgDAEgFIAIAHQgKAPgTAAQgPAAgKgLgAgMgXQgGAGgBALIAnAAIAAgBQgBgKgFgHQgEgFgJAAQgHAAgGAGg");
	this.shape_22.setTransform(117.45,175.8);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgLIAPAAIAAgTIAMAAIAAATIAPAAIAAALIgPAAIAAAwQAAAEACADQACADAFgBIAHgBIAAALIgLACQgJAAgEgFg");
	this.shape_23.setTransform(110.775,174.9);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_24.setTransform(105.275,174.125);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_25.setTransform(96.875,175.8);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_26.setTransform(90.65,175.725);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_27.setTransform(83.625,175.8);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AAYA1IglgxIgNANIAAAkIgOAAIAAhpIAOAAIAAA0IAvg0IARAAIgpAvIAsA6g");
	this.shape_28.setTransform(75.475,174.425);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AARAmIAAgwQgBgIgDgEQgEgEgHAAQgGAAgEADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_29.setTransform(401.9,210.675);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgXAgQgGgGAAgKQAAgLAJgGQAIgGAPAAIANAAIAAgFQAAgIgFgDQgDgEgIAAQgGAAgEADQgGAEAAAEIgMAAQAAgFAEgFQAEgGAGgDQAIgCAGAAQANAAAHAGQAIAHAAALIAAAgQAAALACAGIAAABIgNAAIgBgIQgKAKgLgBQgKABgIgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAGgCQAFgEADgFIAAgPIgKAAQgXAAAAAOg");
	this.shape_30.setTransform(394.25,210.75);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AARAlIgRg3IgRA3IgKAAIgVhJIAMAAIAOA2IASg2IAJAAIARA3IAPg3IAMAAIgVBJg");
	this.shape_31.setTransform(385.2,210.75);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgVAcQgJgJAAgRIAAgCQAAgLAEgIQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAKAAARIAAAFIgxAAQABAKAGAIQAGAGAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPAAgJgKgAgLgVQgFAFgBAKIAkAAIAAgBQgBgJgEgFQgFgGgIAAQgHAAgFAGg");
	this.shape_32.setTransform(376.325,210.75);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AAZAyIAAguIgxAAIAAAuIgNAAIAAhjIANAAIAAArIAxAAIAAgrIANAAIAABjg");
	this.shape_33.setTransform(367.525,209.475);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AAQA1IgZgiIgIAIIAAAaIgNAAIAAhpIANAAIAAA/IAHgIIAWgXIAPAAIgcAdIAgAsg");
	this.shape_34.setTransform(356.025,209.2);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgGAzIAAhJIAMAAIAABJgAgFglQgBgCAAgDQAAgDABgCQACgCADAAQAEAAABACQACACABADQgBADgCACQgBACgEAAQgDAAgCgCg");
	this.shape_35.setTransform(350.3,209.4);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_36.setTransform(346.125,209.925);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgEgGQgEgFABgHIAMAAQABAHAEAEQAFADAHAAQAHAAAFgDQADgDAAgFQAAgFgDgDQgEgCgJgCQgKgCgFgDQgFgDgDgDQgDgEAAgGQAAgJAHgGQAIgGALAAQANAAAIAGQAIAHgBAKIgMAAQAAgFgEgEQgFgEgHAAQgGAAgEADQgDADAAAFQAAAEADADIANAFQAJACAFACQAHADACAEQADAEABAFQgBAKgHAHQgJAFgMAAQgIAAgHgDg");
	this.shape_37.setTransform(340.45,210.75);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgFAzIAAhJIALAAIAABJgAgEglQgCgCAAgDQAAgDACgCQACgCACAAQAEAAABACQACACAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_38.setTransform(335.15,209.4);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgGAAQgMAAgEAKIAAA0g");
	this.shape_39.setTransform(331.45,210.675);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgVAcQgJgJAAgRIAAgCQAAgLAEgIQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAKAAARIAAAFIgxAAQABAKAGAIQAGAGAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPAAgJgKgAgLgVQgFAFgBAKIAkAAIAAgBQgBgJgEgFQgFgGgIAAQgHAAgFAGg");
	this.shape_40.setTransform(325.075,210.75);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_41.setTransform(318.825,209.925);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AAQA1IgZgiIgIAIIAAAaIgNAAIAAhpIANAAIAAA/IAHgIIAWgXIAPAAIgcAdIAgAsg");
	this.shape_42.setTransform(313.675,209.2);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgXAgQgGgGgBgKQABgLAIgGQAJgGAPAAIANAAIAAgFQgBgIgEgDQgEgEgHAAQgGAAgEADQgGAEAAAEIgMAAQAAgFAEgFQAEgGAGgDQAHgCAIAAQAMAAAHAGQAIAHAAALIAAAgQAAALACAGIAAABIgNAAIgBgIQgKAKgLgBQgLABgHgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAGgCQAFgEADgFIAAgPIgLAAQgWAAAAAOg");
	this.shape_43.setTransform(305.85,210.75);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgGAAQgMAAgEAKIAAA0g");
	this.shape_44.setTransform(300.05,210.675);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgXAgQgHgGAAgKQABgLAIgGQAJgGAPAAIAMAAIAAgFQAAgIgDgDQgEgEgIAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgGAGgDQAIgCAHAAQAMAAAIAGQAGAHABALIAAAgQAAALACAGIAAABIgNAAIgCgIQgIAKgMgBQgKABgIgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgCQAGgEACgFIAAgPIgKAAQgWAAAAAOg");
	this.shape_45.setTransform(293.5,210.75);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AAWAyIgigvIgMANIAAAiIgNAAIAAhjIANAAIAAAxIArgxIAQAAIgmAsIApA3g");
	this.shape_46.setTransform(285.875,209.475);

	this.instance_1 = new lib.infod();
	this.instance_1.setTransform(258.05,376.5,0.8839,0.8839);

	this.instance_2 = new lib.infod();
	this.instance_2.setTransform(556.65,384.6,0.8839,0.8839);

	this.instance_3 = new lib.info();
	this.instance_3.setTransform(801.15,190.3);

	this.g3 = new lib.g3();
	this.g3.name = "g3";
	this.g3.setTransform(849.45,270.5);

	this.g2 = new lib.g2();
	this.g2.name = "g2";
	this.g2.setTransform(730.45,270.5);

	this.g1 = new lib.g1();
	this.g1.name = "g1";
	this.g1.setTransform(614.45,270.5);

	this.cobaha = new lib.bg5();
	this.cobaha.name = "cobaha";
	this.cobaha.setTransform(675.75,358.05);

	this.drag2G1 = new lib.drag7G7();
	this.drag2G1.name = "drag2G1";
	this.drag2G1.setTransform(854.45,223.6,0.8086,0.8086,0,0,0,82.2,26.7);
	new cjs.ButtonHelper(this.drag2G1, 0, 1, 1);

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

	this.pieces = new lib.Pieces10();
	this.pieces.name = "pieces";

	this.slots = new lib.Slots10();
	this.slots.name = "slots";

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

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AABAOQAIgKAAgLIAAgMIAPAAIAAALQAAAIgEAHQgEAIgGAFgAgXAOQAHgKABgLIAAgMIAPAAIAAALQAAAIgEAHQgEAIgHAFg");
	this.shape_47.setTransform(714.625,114.725);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_48.setTransform(709.625,119.325);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_49.setTransform(702.85,120.875);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_50.setTransform(696.075,119.325);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgGAAgJIAPAAQABAIAGAFQAFAEAJAAQAJAAAFgDQAFgEAAgGQAAgGgEgDQgFgEgLgCQgMgDgGgDQgHgDgDgFQgEgFAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAIAAAMIgQAAQAAgGgFgFQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALACAHAEQAIADADAFQAEAFAAAHQAAAMgKAIQgKAGgPABQgKAAgIgEg");
	this.shape_51.setTransform(685.425,120.95);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASgBIAPAAIAAgGQAAgJgEgFQgFgEgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgGAFgHQAEgGAIgEQAJgDAIgBQAQABAJAHQAIAIABANIAAApQAAAMADAHIAAACIgQAAQgBgCgBgIQgLAMgOAAQgNAAgIgIgAgUASQgBAHAFAEQAFAEAIAAQAGAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_52.setTransform(676.4,120.95);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_53.setTransform(669.725,119.075);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgLAJgFQAKgHAJAAQASAAAJAMQAKALAAAWIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_54.setTransform(663.225,120.95);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_55.setTransform(654.925,119.075);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AAvAuIAAg7QAAgJgEgFQgEgFgLAAQgIAAgGAFQgGAGAAAIIAAA7IgPAAIAAg6QAAgUgTAAQgPAAgFANIAABBIgQAAIAAhZIAOAAIABAKQAKgMAQAAQAUAAAFAPQAFgHAHgEQAHgEAKAAQAdAAABAgIAAA7g");
	this.shape_56.setTransform(638.4,120.875);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgGQABgJgFgFQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAFgHQAEgGAIgEQAJgDAIgBQAQABAJAHQAIAIABANIAAApQAAAMADAHIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgJgIgAgVASQABAHAEAEQAFAEAIAAQAGAAAGgDQAHgEACgGIAAgSIgMAAQgbAAAAAQg");
	this.shape_57.setTransform(626.3,120.95);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_58.setTransform(619.625,119.075);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAPAAIAAgGQAAgJgFgFQgFgEgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgGAEgHQAFgGAJgEQAIgDAJgBQAPABAJAHQAIAIABANIAAApQAAAMADAHIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgJgIgAgVASQABAHAEAEQAFAEAIAAQAGAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_59.setTransform(612.9,120.95);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgVIAAgBQAAgTAKgNQAKgNAQAAQAOABAKAKIAAgvIAPAAIAAB/IgOAAIgBgKQgJAMgQAAQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAIAKAAQAPABAHgNIAAgpQgHgMgPAAQgKAAgGAJg");
	this.shape_60.setTransform(603.275,119.15);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgGAAgJIAPAAQABAIAGAFQAFAEAJAAQAJAAAFgDQAFgEAAgGQAAgGgEgDQgFgEgLgCQgMgDgGgDQgHgDgDgFQgEgFAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAIAAAMIgQAAQAAgGgFgFQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALACAHAEQAIADADAFQAEAFAAAHQAAAMgKAIQgKAGgPABQgKAAgIgEg");
	this.shape_61.setTransform(590.125,120.95);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgLAJgFQAKgHAJAAQASAAAJAMQAKALAAAWIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_62.setTransform(581.325,120.95);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_63.setTransform(574.675,119.325);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgGAAgJIAPAAQABAIAGAFQAFAEAJAAQAJAAAFgDQAFgEAAgGQAAgGgEgDQgFgEgLgCQgMgDgGgDQgHgDgDgFQgEgFAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAIAAAMIgQAAQAAgGgFgFQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALACAHAEQAIADADAFQAEAFAAAHQAAAMgKAIQgKAGgPABQgKAAgIgEg");
	this.shape_64.setTransform(568.225,120.95);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgLAJgFQAKgHAJAAQASAAAJAMQAKALAAAWIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_65.setTransform(559.425,120.95);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AglA/IAAh7IAOAAIABAJQAKgLAPAAQAQAAAKAMQAJAMAAAWIAAABQAAAUgJANQgKAMgQAAQgPAAgJgKIAAArgAgVgkIAAApQAGANAOAAQAKAAAHgJQAGgJABgQQgBgQgGgIQgHgJgKAAQgOAAgGANg");
	this.shape_66.setTransform(550.25,122.6);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgGAAgJIAPAAQABAIAGAFQAFAEAJAAQAJAAAFgDQAFgEAAgGQAAgGgEgDQgFgEgLgCQgMgDgGgDQgHgDgDgFQgEgFAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAIAAAMIgQAAQAAgGgFgFQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALACAHAEQAIADADAFQAEAFAAAHQAAAMgKAIQgKAGgPABQgKAAgIgEg");
	this.shape_67.setTransform(540.925,120.95);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_68.setTransform(527.65,120.875);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgGQABgJgFgFQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAFgHQAEgGAIgEQAJgDAIgBQAQABAJAHQAIAIABANIAAApQAAAMADAHIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgJgIgAgVASQABAHAEAEQAFAEAIAAQAGAAAGgDQAHgEACgGIAAgSIgMAAQgbAAAAAQg");
	this.shape_69.setTransform(518.3,120.95);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_70.setTransform(509.975,119.075);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASgBIAPAAIAAgGQAAgJgEgFQgFgEgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgGAFgHQAEgGAIgEQAJgDAIgBQAQABAJAHQAIAIABANIAAApQAAAMADAHIAAACIgQAAQgBgCgBgIQgLAMgOAAQgNAAgIgIgAgUASQgBAHAFAEQAFAEAIAAQAGAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_71.setTransform(500.45,120.95);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AglA/IAAh7IAOAAIABAJQAJgLAQAAQAQAAAKAMQAJAMAAAWIAAABQAAAUgJANQgKAMgQAAQgPAAgKgKIAAArgAgWgkIAAApQAIANAOAAQAJAAAHgJQAHgJgBgQQABgQgHgIQgHgJgJAAQgOAAgIANg");
	this.shape_72.setTransform(491.25,122.6);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgJALgQAAQgOAAgIgIg");
	this.shape_73.setTransform(481.625,121.025);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_74.setTransform(474.525,120.875);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgLAJgFQAKgHAJAAQASAAAJAMQAKALAAAWIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_75.setTransform(466.775,120.95);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgJgFgFQgEgFgLAAQgIAAgGAFQgFAGgCAIIAAA7IgOAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgPAAIAAhZIAPAAIAAAKQAKgMARAAQASAAAHAPQAEgHAHgEQAHgEAKAAQAeAAAAAgIAAA7g");
	this.shape_76.setTransform(454.75,120.875);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgSA7QgKgEgFgHIAJgJQAKAMAOAAQAKAAAGgHQAHgGgBgLIAAgIQgJALgPAAQgPAAgKgNQgKgMAAgWQAAgUAKgNQAJgNARAAQAPAAAJAMIABgKIAOAAIAABXQAAARgKAKQgLAKgRAAQgJABgJgFgAgPgoQgGAIgBARQABAPAGAIQAGAIAKAAQAPABAGgNIAAgpQgGgMgPAAQgKAAgGAJg");
	this.shape_77.setTransform(438.15,122.65);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_78.setTransform(428.85,120.875);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQALgHASgBIAPAAIAAgGQAAgJgFgFQgFgEgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgGAEgHQAGgGAIgEQAIgDAJgBQAPABAJAHQAJAIAAANIAAApQAAAMADAHIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgJgIgAgVASQABAHAEAEQAFAEAHAAQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_79.setTransform(419.5,120.95);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgbA/IgFgBIAAgNIAEABQAIAAAEgEQAEgDADgIIAEgJIgghYIAQAAIAWBCIAVhCIAQAAIgkBnQgHAWgTAAg");
	this.shape_80.setTransform(410.875,122.775);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAAAAgIAAA7g");
	this.shape_81.setTransform(397.95,120.875);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgGQABgJgFgFQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAFgHQAFgGAHgEQAJgDAIgBQAQABAJAHQAJAIAAANIAAApQAAAMADAHIAAACIgQAAQgBgCgBgIQgLAMgNAAQgOAAgJgIgAgUASQAAAHAEAEQAFAEAIAAQAGAAAGgDQAHgEACgGIAAgSIgMAAQgaAAAAAQg");
	this.shape_82.setTransform(388.6,120.95);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AAVAtIgVhDIgVBDIgMAAIgahZIAPAAIASBDIAVhDIALAAIAVBEIAShEIAPAAIgaBZg");
	this.shape_83.setTransform(377.575,120.95);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgLAJgFQAKgHAJAAQASAAAJAMQAKALAAAWIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_84.setTransform(366.775,120.95);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAh/IAQAAIAAAxQAKgNAPAAQAdAAAAAfIAAA8g");
	this.shape_85.setTransform(357.55,119.075);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgTAGIAAgLIAnAAIAAALg");
	this.shape_86.setTransform(350.475,120.325);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_87.setTransform(343.45,120.875);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQALgHARgBIAQAAIAAgGQgBgJgEgFQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAEgHQAGgGAIgEQAIgDAJgBQAPABAJAHQAJAIAAANIAAApQAAAMADAHIAAACIgQAAQgCgCAAgIQgLAMgOAAQgNAAgIgIgAgVASQAAAHAFAEQAFAEAHAAQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_88.setTransform(334.1,120.95);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AAVAtIgVhDIgVBDIgMAAIgahZIAPAAIASBDIAVhDIALAAIAVBEIAShEIAPAAIgaBZg");
	this.shape_89.setTransform(323.075,120.95);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgLAJgFQAKgHAJAAQASAAAJAMQAKALAAAWIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_90.setTransform(312.275,120.95);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgPAAIAAh/IAPAAIAAAxQAKgNAPAAQAdAAABAfIAAA8g");
	this.shape_91.setTransform(303.05,119.075);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_92.setTransform(289.45,120.875);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQALgHARgBIAQAAIAAgGQgBgJgEgFQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAEgHQAGgGAIgEQAIgDAJgBQAPABAJAHQAJAIAAANIAAApQAAAMADAHIAAACIgQAAQgCgCAAgIQgLAMgOAAQgNAAgIgIgAgVASQAAAHAFAEQAFAEAHAAQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_93.setTransform(280.1,120.95);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_94.setTransform(271.775,119.075);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_95.setTransform(263.175,119.075);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgJALgQAAQgOAAgIgIg");
	this.shape_96.setTransform(253.625,121.025);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgGAAgJIAPAAQABAIAGAFQAFAEAJAAQAJAAAFgDQAFgEAAgGQAAgGgEgDQgFgEgLgCQgMgDgGgDQgHgDgDgFQgEgFAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAIAAAMIgQAAQAAgGgFgFQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALACAHAEQAIADADAFQAEAFAAAHQAAAMgKAIQgKAGgPABQgKAAgIgEg");
	this.shape_97.setTransform(244.575,120.95);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQALgHARgBIAQAAIAAgGQgBgJgEgFQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAEgHQAGgGAIgEQAIgDAJgBQAPABAJAHQAJAIAAANIAAApQAAAMADAHIAAACIgQAAQgCgCAAgIQgLAMgOAAQgNAAgIgIgAgVASQAAAHAFAEQAFAEAHAAQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_98.setTransform(235.55,120.95);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AAvAuIAAg7QAAgJgEgFQgEgFgLAAQgIAAgGAFQgGAGAAAIIAAA7IgPAAIAAg6QAAgUgTAAQgPAAgFANIAABBIgQAAIAAhZIAOAAIABAKQAKgMAQAAQAUAAAFAPQAFgHAHgEQAHgEAKAAQAdAAABAgIAAA7g");
	this.shape_99.setTransform(223.5,120.875);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_100.setTransform(785.1,96.225);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASgBIAPAAIAAgGQAAgIgEgGQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAFgGQAEgGAIgEQAJgEAIAAQAQABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgBgCgBgIQgLAMgOAAQgNAAgIgIgAgUASQgBAHAFAEQAFAFAHgBQAHAAAHgDQAGgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_101.setTransform(775.75,96.3);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgCQAAgTAKgNQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgKQgJAMgQAAQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAIAKAAQAPABAHgNIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_102.setTransform(766.125,94.5);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AgfApQgIgHAAgMQABgPANgHQAMgJATAAIARAAIABgHQABgJgEgFQgFgFgIAAQgIAAgFADQgHAFgBAGIgQABQABgIAFgHQAGgHAJgDQAIgDAKgBQAOABAJAIQAIAJgBAPIgIAuIgBAHQAAAEACAFIgBABIgQAAIAAgFIAAgEQgNAMgOgBQgNAAgHgIgAgNAGQgIAFgBAJQgBAGAEAEQAEAFAHAAQAIABAGgFQAGgEAFgGIAEgTIgMAAQgOAAgIAEg");
	this.shape_103.setTransform(752.2291,96.05);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AgeAkQgKgMABgVIABgDQABgOAHgLQAHgMAKgFQAKgHALAAQAOABAJAJQAIAKABAQIgBALIgBAGIg9AAQgBANAGAKQAFAIAMABQANAAAMgNIAJAIQgGAIgJAGQgKAEgKAAQgSAAgKgNgAgJgdQgIAIgEAOIAtAAIAAgCQACgLgFgHQgFgIgJAAIgBAAQgJAAgGAGg");
	this.shape_104.setTransform(743.1152,96.05);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AglA6QgIgKgBgRIABgMQABgOAHgLQAGgMAJgGQAJgFALgBQAPABAIALIAKgyIAQAAIgYCGIgOAAIABgJQgKAMgQgBQgOAAgHgKgAgPgKQgIAGgDAJQgEALAAAMQAAAMAEAIQAFAGAJABQANAAALgPIAHgrQgFgNgOABIAAgBQgJAAgGAGg");
	this.shape_105.setTransform(733.8167,94.15);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AgSBBIAQheIAPAAIgPBegAADgvQgDgDAAgEQABgEACgDQADgCAEgBQAEAAADACQACADAAAEQAAAEgCADQgDADgEAAQgEAAgDgCg");
	this.shape_106.setTransform(726.475,94.3);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AgaArQgIgHgEgKQgEgLABgNQABgOAHgMQAHgMAKgGQALgGALgBQAMABAJAGQAIAHAEALQAEALgBANIAAABQgCANgGAMQgHALgKAHQgLAFgLAAQgMAAgJgGgAgOgZQgJAJgCAQIAAACIAAALQABAKAFAHQAFAGAJAAQAHAAAHgEQAHgEAEgIQAFgJABgKIAAgNQgBgKgFgHQgFgGgJAAIgBAAQgLAAgIAKg");
	this.shape_107.setTransform(719.025,96.05);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgdAxIAQheIAOAAIgBALQAKgOANABIAHABIgBAPIgIgBQgPAAgHAOIgNBDg");
	this.shape_108.setTransform(711.4,95.9491);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AgeAkQgKgMABgVIABgDQABgOAHgLQAHgMAKgFQAKgHALAAQAOABAJAJQAIAKABAQIgBALIgBAGIg9AAQgBANAGAKQAFAIAMABQANAAAMgNIAJAIQgGAIgJAGQgKAEgKAAQgSAAgKgNgAgJgdQgIAIgEAOIAtAAIAAgCQACgLgFgHQgFgIgJAAIgBAAQgJAAgGAGg");
	this.shape_109.setTransform(703.4652,96.05);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AgOA1QgFgHABgLIAJg6IgQAAIACgNIARAAIAEgXIAPAAIgFAXIASAAIgCANIgSAAIgJA6IAAAEQABAHAGAAIAIgBIgBANQgGACgFAAQgKAAgEgHg");
	this.shape_110.setTransform(696.15,94.975);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgdAoQgKgIABgOIAQAAQAAAIAFAFQAFAFAJAAQAHAAAHgEQAGgDABgIQABgJgMgEIgPgFQgVgGAAgRQABgMALgJQALgHANgBQAPABAJAIQAJAIgBAOIgPAAQAAgIgFgEQgFgFgHAAQgIAAgGAEQgFAEgBAGQgBAJALAEIAHACQAQAEAHAFQAHAIAAAJQgBAKgFAGQgFAHgJADQgJAEgJgBQgPAAgKgJg");
	this.shape_111.setTransform(688.2251,96.05);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AAmBAIgGghIgyAAIgSAhIgRAAIBEh/IAOAAIAaB/gAgLAQIApAAIgLg6g");
	this.shape_112.setTransform(677.1,94.4);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgIIAPAAQABAIAGAFQAFAEAJAAQAJAAAFgDQAFgEAAgGQAAgGgEgDQgFgEgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAJAAALIgQAAQAAgFgFgGQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALACAHAEQAIADADAFQAEAFAAAHQAAAMgKAIQgKAGgPABQgKAAgIgEg");
	this.shape_113.setTransform(663.775,96.3);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAPAAIAAgGQAAgIgFgGQgFgEgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgHAEgGQAFgGAJgEQAIgEAJAAQAPABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgJgIgAgVASQABAHAEAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_114.setTransform(654.75,96.3);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_115.setTransform(648.075,94.425);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_116.setTransform(641.575,96.3);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_117.setTransform(633.275,94.425);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_118.setTransform(620.475,94.425);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_119.setTransform(613.525,94.675);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgQAAIAAgMIAQAAIAAgWIAOAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFADADQACADAFgBIAHgBIAAANIgLACQgKgBgFgGg");
	this.shape_120.setTransform(608.4,95.3);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgIIAPAAQABAIAGAFQAFAEAJAAQAJAAAFgDQAFgEAAgGQAAgGgEgDQgFgEgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAJAAALIgQAAQAAgFgFgGQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALACAHAEQAIADADAFQAEAFAAAHQAAAMgKAIQgKAGgPABQgKAAgIgEg");
	this.shape_121.setTransform(601.525,96.3);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_122.setTransform(595.075,94.675);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_123.setTransform(590.575,96.225);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_124.setTransform(582.825,96.3);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgQAAIAAgMIAQAAIAAgWIAOAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFADADQACADAGgBIAGgBIAAANIgLACQgKgBgFgGg");
	this.shape_125.setTransform(575.2,95.3);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_126.setTransform(568.975,94.425);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQALgHARgBIAQAAIAAgGQAAgIgFgGQgFgEgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAEgGQAGgGAIgEQAIgEAJAAQAPABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgJgIgAgVASQABAHAEAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_127.setTransform(559.45,96.3);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_128.setTransform(552.425,96.225);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASgBIAPAAIAAgGQAAgIgEgGQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAFgGQAEgGAJgEQAIgEAIAAQAQABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgBgCgBgIQgLAMgOAAQgNAAgIgIgAgUASQgBAHAFAEQAFAFAHgBQAHAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_129.setTransform(544.45,96.3);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_130.setTransform(536.125,94.425);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_131.setTransform(524.625,96.225);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASgBIAPAAIAAgGQAAgIgEgGQgFgEgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgHAFgGQAEgGAIgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgBgCgBgIQgLAMgOAAQgNAAgIgIgAgUASQgBAHAFAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_132.setTransform(516.65,96.3);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgWIAPAAIAAAWIAQAAIAAAMIgQAAIAAA3QAAAFABADQADADAGgBIAHgBIAAANIgMACQgLgBgDgGg");
	this.shape_133.setTransform(509,95.3);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("AgMBAIAAhNIgOAAIAAgMIAOAAIAAgIQAAgPAIgIQAGgIAOABIALABIgBAMIgIgBQgIAAgEAFQgEAEAAAIIAAAJIATAAIAAAMIgTAAIAABNg");
	this.shape_134.setTransform(503.825,94.35);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASgBIAPAAIAAgGQAAgIgEgGQgFgEgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgHAFgGQAEgGAIgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgBgCgBgIQgLAMgOAAQgNAAgIgIgAgUASQgBAHAFAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_135.setTransform(495.95,96.3);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgCQAAgTAKgNQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgKQgJAMgQAAQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAIAKAAQAPABAHgNIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_136.setTransform(486.325,94.5);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_137.setTransform(472.85,96.225);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAPAAIAAgGQAAgIgFgGQgFgEgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgHAEgGQAFgGAJgEQAIgEAJAAQAPABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgJgIgAgVASQABAHAEAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_138.setTransform(463.5,96.3);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("AgTA7QgIgEgFgHIAIgJQAJAMAOAAQALAAAGgHQAGgGABgLIAAgIQgKALgPAAQgQAAgJgNQgKgMAAgWQAAgUAJgNQALgNAPAAQAQAAAJAMIABgKIAOAAIAABXQAAASgLAJQgKAKgRAAQgJABgKgFgAgPgoQgHAIABARQgBAPAHAIQAGAIAKAAQAOABAIgNIAAgpQgIgNgOABQgKgBgGAKg");
	this.shape_139.setTransform(453.95,98);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAAAAgIAAA7g");
	this.shape_140.setTransform(444.65,96.225);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_141.setTransform(435.525,96.3);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgCQAAgTAKgNQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgKQgJAMgQAAQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAIAKAAQAPABAHgNIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_142.setTransform(425.925,94.5);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIAAALQALgNAQAAQAcAAAAAgIAAA7g");
	this.shape_143.setTransform(412.45,96.225);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgGQABgIgFgGQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAEgGQAFgGAIgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgJgIgAgVASQABAHAEAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgMAAQgbAAAAAQg");
	this.shape_144.setTransform(403.1,96.3);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("AAVAtIgVhDIgVBDIgMAAIgahZIAPAAIASBCIAVhCIALAAIAVBEIAShEIAPAAIgaBZg");
	this.shape_145.setTransform(392.075,96.3);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_146.setTransform(381.275,96.3);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAGIAABAIgQAAIAAh/IAQAAIAAAxQAKgNAPAAQAdAAAAAfIAAA8g");
	this.shape_147.setTransform(372.05,94.425);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_148.setTransform(359.425,94.425);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_149.setTransform(352.475,94.675);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgWIAPAAIAAAWIAQAAIAAAMIgQAAIAAA3QAAAFABADQADADAGgBIAHgBIAAANIgMACQgLgBgDgGg");
	this.shape_150.setTransform(347.35,95.3);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgIIAPAAQABAIAGAFQAFAEAJAAQAJAAAFgDQAFgEAAgGQAAgGgEgDQgFgEgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAJAAALIgQAAQAAgFgFgGQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALACAHAEQAIADADAFQAEAFAAAHQAAAMgKAIQgKAGgPABQgKAAgIgEg");
	this.shape_151.setTransform(340.475,96.3);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_152.setTransform(334.025,94.675);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_153.setTransform(329.525,96.225);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_154.setTransform(321.775,96.3);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgWIAPAAIAAAWIAQAAIAAAMIgQAAIAAA3QAAAFABADQADADAFgBIAIgBIAAANIgMACQgLgBgDgGg");
	this.shape_155.setTransform(314.15,95.3);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_156.setTransform(307.925,94.425);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASgBIAPAAIAAgGQAAgIgEgGQgFgEgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgHAFgGQAFgGAHgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgBgCgBgIQgLAMgOAAQgNAAgIgIgAgUASQgBAHAFAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_157.setTransform(298.4,96.3);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_158.setTransform(291.375,96.225);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgGQABgIgFgGQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAEgGAIgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgJgIgAgUASQAAAHAEAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgMAAQgbAAABAQg");
	this.shape_159.setTransform(283.4,96.3);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_160.setTransform(275.075,94.425);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_161.setTransform(263.575,96.225);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAPAAIAAgGQAAgIgFgGQgFgEgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgHAEgGQAFgGAJgEQAIgEAJAAQAPABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgJgIgAgVASQABAHAEAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_162.setTransform(255.6,96.3);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgQAAIAAgMIAQAAIAAgWIAOAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFADADQACADAFgBIAHgBIAAANIgLACQgKgBgFgGg");
	this.shape_163.setTransform(247.95,95.3);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#FFFFFF").s().p("AgMBAIAAhNIgOAAIAAgMIAOAAIAAgIQAAgPAIgIQAGgIAOABIALABIgBAMIgIgBQgIAAgEAFQgEAEAAAIIAAAJIATAAIAAAMIgTAAIAABNg");
	this.shape_164.setTransform(242.775,94.35);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAPAAIAAgGQAAgIgFgGQgFgEgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgHAEgGQAFgGAJgEQAIgEAJAAQAPABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgJgIgAgVASQABAHAEAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_165.setTransform(234.9,96.3);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgCQAAgTAKgNQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgKQgJAMgQAAQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAIAKAAQAPABAHgNIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_166.setTransform(225.275,94.5);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_167.setTransform(211.8,96.225);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASgBIAQAAIAAgGQgBgIgEgGQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAFgGQAEgGAIgEQAJgEAJAAQAPABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgBgCgBgIQgLAMgOAAQgNAAgIgIgAgUASQgBAHAFAEQAFAFAHgBQAHAAAGgDQAHgEADgGIAAgSIgMAAQgbAAAAAQg");
	this.shape_168.setTransform(202.45,96.3);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_169.setTransform(194.125,94.425);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FFFFFF").s().p("AgdAiQgLgNAAgUIAAgBQAAgNAFgKQAGgLAIgGQAKgFALgBQASAAAMANQALANAAAUIAAABQAAANgFAKQgFALgJAGQgKAGgMAAQgRAAgMgNgAgSgYQgGAJAAAQQAAAPAGAJQAIAJAKAAQAMAAAGgJQAIgJgBgQQABgPgIgIQgGgKgMAAQgKAAgIAJg");
	this.shape_170.setTransform(184.4,96.3);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgVIAAgCQAAgNAFgKQAFgKAJgGQAJgGALAAQAPABAKAIQAKAJABAPIgOAAQgBgJgGgFQgGgGgJAAQgLAAgGAJQgHAIABAQIAAACQgBAQAHAHQAGAJALAAQAJAAAFgFQAGgFACgIIAOAAQgBAIgEAHQgGAIgIADQgHAFgKAAQgRAAgLgNg");
	this.shape_171.setTransform(175.2,96.3);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FFFFFF").s().p("AgdAiQgLgNAAgUIAAgBQAAgNAGgKQAFgLAIgGQAKgFALgBQASAAALANQAMANAAAUIAAABQAAANgFAKQgFALgKAGQgJAGgMAAQgRAAgMgNgAgRgYQgIAJABAQQgBAPAIAJQAGAJALAAQALAAAIgJQAGgJABgQQgBgPgGgIQgIgKgLAAQgLAAgGAJg");
	this.shape_172.setTransform(165.8,96.3);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#FFFFFF").s().p("AggAvQgNgPgBgaIAAgLQAAgRAHgNQAFgNAMgGQALgHANAAQAUAAALALQALAKADAUIgQAAQgDgPgGgGQgIgHgMAAQgOAAgJALQgIALAAAWIAAAKQgBAUAJALQAIAMANAAQAOAAAHgGQAHgGADgPIAQAAQgDAUgMAKQgLAKgVAAQgUAAgMgPg");
	this.shape_173.setTransform(155.6,94.75);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#FFFFFF").s().p("AACAUIAAgJQAAgJAEgHQAEgJAGgFIAJAGQgIAKAAALIAAAMgAgYAUIAAgJQAAgJAEgHQAEgJAHgFIAJAGQgIAKAAALIAAAMg");
	this.shape_174.setTransform(147.275,89.9);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.bf(img.Bitmap2, null, new cjs.Matrix2D(1,0,0,1,-499,-300)).s().p("EhN9Au4MAAAhdvMCb7AAAMAAABdvg");
	this.shape_175.setTransform(471,266.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.btnNextDasar1},{t:this.btnMenuDasar1},{t:this.btnBack3},{t:this.slots},{t:this.pieces},{t:this.judulKI},{t:this.Score},{t:this.drag2G1},{t:this.cobaha},{t:this.g1},{t:this.g2},{t:this.g3},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.restart},{t:this.btnInfo},{t:this.shape},{t:this.winMessage}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(452,236.2,518,330.00000000000006);
// library properties:
lib.properties = {
	id: 'E740BB847DF4864B949C99CD86B71105',
	width: 960,
	height: 540,
	fps: 24,
	color: "#34495E",
	opacity: 1.00,
	manifest: [
		{src:"images/_16.jpeg", id:"_16"},
		{src:"images/Bitmap102copy.png", id:"Bitmap102copy"},
		{src:"images/Bitmap125.png", id:"Bitmap125"},
		{src:"images/Bitmap123.png", id:"Bitmap123"},
		{src:"images/Bitmap128.png", id:"Bitmap128"},
		{src:"images/Bitmap126.png", id:"Bitmap126"},
		{src:"images/Bitmap2.png", id:"Bitmap2"},
		{src:"images/Bitmap124.png", id:"Bitmap124"},
		{src:"images/Bitmap127.png", id:"Bitmap127"},
		{src:"images/Bitmap3.png", id:"Bitmap3"},
		{src:"images/bookpngcopy.png", id:"bookpngcopy"}
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