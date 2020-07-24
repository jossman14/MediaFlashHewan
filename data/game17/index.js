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



(lib._8 = function() {
	this.initialize(img._8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,546,535);


(lib._9 = function() {
	this.initialize(img._9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,462,570);


(lib.Bitmap143 = function() {
	this.initialize(img.Bitmap143);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,206,194);


(lib.Bitmap146 = function() {
	this.initialize(img.Bitmap146);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,224,136);


(lib.Bitmap144 = function() {
	this.initialize(img.Bitmap144);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,239,202);


(lib.Bitmap152 = function() {
	this.initialize(img.Bitmap152);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,287,152);


(lib.Bitmap148 = function() {
	this.initialize(img.Bitmap148);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,195,145);


(lib.Bitmap153 = function() {
	this.initialize(img.Bitmap153);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,264,152);


(lib.bookpngcopy = function() {
	this.initialize(img.bookpngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,399);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);


(lib.Bitmap3 = function() {
	this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,249,87);


(lib.Bitmap145 = function() {
	this.initialize(img.Bitmap145);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,175,195);


(lib.Bitmap147 = function() {
	this.initialize(img.Bitmap147);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,143,136);// helper functions:

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
	this.instance = new lib.Bitmap145();
	this.instance.setTransform(-49,-37.5,0.5602,0.3846);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g3, new cjs.Rectangle(-49,-37.5,98.1,75), null);


(lib.g2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap144();
	this.instance.setTransform(-49,-37.5,0.4101,0.3713);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g2, new cjs.Rectangle(-49,-37.5,98,75), null);


(lib.g1a = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap143();
	this.instance.setTransform(-49,-37.5,0.4759,0.3866);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g1a, new cjs.Rectangle(-49,-37.5,98.1,75), null);


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


(lib.Path_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#606163").s().p("Ap/z/QEEAADvBlQDkBhCxCyQCxCwBiDmQBkDtAAEEQAAEEhkDuQhiDmixCxQixCxjkBhQjvBkkEAAg");
	this.shape_1.setTransform(64,127.95);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1, new cjs.Rectangle(0,0,128,255.9), null);


(lib.drop14G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAGACACQACACAGAAIAHgBIAAARQgHACgHAAQgXAAAAgcg");
	this.shape.setTransform(215.475,69.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgVIAAgCQAAgNAGgMQAFgLAKgGQAKgHALABQAUAAAKAMQALAMAAAXIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_1.setTransform(207.975,70.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgJBDIAAiGIATAAIAACGg");
	this.shape_2.setTransform(200.75,68.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgVIAAgCQAAgNAGgMQAFgLAKgGQAKgHALABQAUAAAKAMQALAMAAAXIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_3.setTransform(193.725,70.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgpBDIAAiDIAUAAIABAKQAKgMAOAAQASAAAKANQAKANgBAXIAAACQAAAVgKANQgJANgRAAQgPAAgJgKIAAAtgAgTglIAAApQAGALANAAQAJAAAFgIQAHgHgBgRQAAgOgFgJQgGgIgJAAQgNAAgGALg");
	this.shape_4.setTransform(183.9,72.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_5.setTransform(171.85,68.55);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAGACACQACACAGAAIAHgBIAAARQgHACgHAAQgXAAAAgcg");
	this.shape_6.setTransform(166.325,69.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAVAAIAAAKQAHgMANAAQAFAAADABIAAAUIgJgBQgPAAgDALIAABAg");
	this.shape_7.setTransform(160.8,70.25);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgVIAAgCQAAgNAGgMQAFgLAKgGQAKgHALABQAUAAAKAMQALAMAAAXIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_8.setTransform(152.475,70.35);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgoBDIAAiDIATAAIABAKQAJgMAPAAQASAAAKANQAJANAAAXIAAACQABAVgKANQgLANgQAAQgPAAgJgKIAAAtgAgTglIAAApQAFALANAAQAKAAAFgIQAHgHAAgRQgBgOgFgJQgGgIgKAAQgNAAgFALg");
	this.shape_9.setTransform(142.65,72.075);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgVIAAgCQAAgNAGgMQAFgLAKgGQAKgHALABQAUAAAKAMQALAMAAAXIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_10.setTransform(132.675,70.35);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgTAtQgJgEgFgHQgFgIgBgJIAWAAQAAAIAFAEQAGAEAHABQAIgBAFgDQAEgDAAgFQAAgGgFgDQgEgDgKgDQgLgCgHgDQgQgHAAgOQAAgNAKgIQALgJAPABQARgBAKAJQAKAJABANIgWAAQAAgGgFgEQgEgFgHAAQgHAAgEAEQgEADAAAGQAAAEADADQAFADALADQANADAHADQAIADADAFQADAGAAAHQABANgLAJQgLAHgRABQgLAAgJgFg");
	this.shape_11.setTransform(123.05,70.35);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAKIAAAeIgWAAIAAiGIAWAAIAABNIAGgIIAagcIAZAAIgjAmIAnA3g");
	this.shape_12.setTransform(109.825,68.35);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgMIAAhCIAVAAIAABdIgUAAIAAgJQgKAMgQAAQgPAAgIgKg");
	this.shape_13.setTransform(99.525,70.45);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAGACACQACACAGAAIAHgBIAAARQgHACgHAAQgXAAAAgcg");
	this.shape_14.setTransform(91.325,69.3);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABCIgWAAIAAhdIAVAAIABAKQAKgMAQAAQAeAAAAAhIAAA+g");
	this.shape_15.setTransform(83.55,70.25);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgVIAAgCQAAgNAGgMQAFgLAKgGQAKgHALABQAUAAAKAMQALAMAAAXIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_16.setTransform(73.825,70.35);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgUA4IgCAKIgTAAIAAiGIAWAAIAAAyQAJgLAOAAQASAAAKAMQAKANAAAWIAAACQAAAWgKANQgKAOgRAAQgQAAgJgNgAgTAAIAAAmQAFANAOAAQAJAAAGgHQAFgIAAgPIAAgDQAAgQgFgGQgGgIgJAAQgOAAgFAMg");
	this.shape_17.setTransform(64.025,68.45);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAUAAIABAKQAGgMAPAAQAEAAADABIgBAUIgIgBQgOAAgFALIAABAg");
	this.shape_18.setTransform(56,70.25);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgVIAAgCQAAgNAGgMQAFgLAKgGQAKgHALABQAUAAAKAMQALAMAAAXIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_19.setTransform(47.675,70.35);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgUA4IgCAKIgTAAIAAiGIAWAAIAAAyQAJgLAOAAQASAAAKAMQAKANAAAWIAAACQAAAWgKANQgKAOgRAAQgQAAgJgNgAgTAAIAAAmQAFANAOAAQAJAAAGgHQAFgIAAgPIAAgDQAAgQgFgGQgGgIgJAAQgOAAgFAMg");
	this.shape_20.setTransform(37.875,68.45);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgVA/QgJgFgFgHIAKgMQAKALAOAAQAKAAAFgFQAHgGgBgLIAAgHQgJALgOAAQgQAAgLgOQgLgNAAgXQAAgWAKgNQALgNARAAQAQAAAJALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgKgEgAgOgoQgFAIAAAQQAAAPAFAHQAGAIAKAAQANAAAFgLIAAgpQgFgLgNAAQgKAAgGAJg");
	this.shape_21.setTransform(226.65,46.525);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgEQgEgFgJAAQgLAAgHAMIAABDIgWAAIAAhfIAVAAIABAMQAKgNAQgBQAeAAAAAjIAAA+g");
	this.shape_22.setTransform(216.75,44.65);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgHQAMgHAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAACIgWAAQgBgDgBgHQgLAMgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_23.setTransform(206.875,44.75);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgiBBIAAgRIAEABQAIAAAEgDQAEgDADgHIADgIIgiheIAXAAIATBBIAUhBIAXAAIgmBtQgIAYgVAAIgKgCg");
	this.shape_24.setTransform(197.625,46.675);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgEQgEgFgJAAQgLAAgHAMIAABDIgWAAIAAhfIAVAAIABAMQAKgNAQgBQAeAAABAjIAAA+g");
	this.shape_25.setTransform(155.35,44.65);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgHQAMgHAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAACIgWAAQgBgDgBgHQgLAMgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_26.setTransform(145.475,44.75);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAVAAIAAALQAHgNANAAQAFABADABIAAAUIgJgBQgPAAgDAMIAABAg");
	this.shape_27.setTransform(137.85,44.65);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgfAkQgMgNAAgXIAAAAQAAgOAFgLQAGgMAKgFQAKgHAMAAQATAAAMANQAMAMABAVIAAAEQAAAOgFALQgGALgKAGQgKAGgNAAQgTAAgMgNgAgQgXQgGAIAAAQQAAAOAGAJQAGAIAKAAQALAAAGgIQAGgJAAgPQAAgPgGgIQgHgIgKAAQgKAAgGAIg");
	this.shape_28.setTransform(129.175,44.75);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgKAhIAAg1IgQAAIAAgQIAQAAIAAgXIAUAAIAAAXIARAAIAAAQIgRAAIAAA0QAAAGACABQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgbg");
	this.shape_29.setTransform(120.825,43.7);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgfAkQgMgNAAgXIAAAAQAAgOAFgLQAGgMAKgFQAKgHAMAAQATAAAMANQAMAMABAVIAAAEQAAAOgFALQgGALgKAGQgKAGgNAAQgTAAgMgNgAgQgXQgGAIAAAQQAAAOAGAJQAGAIAKAAQALAAAGgIQAGgJAAgPQAAgPgGgIQgHgIgKAAQgKAAgGAIg");
	this.shape_30.setTransform(112.975,44.75);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AARBEIgbgqIgJALIAAAfIgWAAIAAiHIAWAAIAABOIAGgJIAagdIAZAAIgjAnIAnA4g");
	this.shape_31.setTransform(103.725,42.75);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgHQAMgHAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAACIgWAAQgBgDgBgHQgLAMgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_32.setTransform(60.675,44.75);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgTAtQgJgEgGgIQgEgHAAgIIAUAAQABAHAFAEQAGAFAHgBQAJAAAEgDQAEgDAAgGQAAgFgEgDQgFgDgKgCQgLgDgHgDQgQgHAAgPQAAgMAKgIQALgJAOAAQASAAAKAJQALAIAAAOIgWAAQAAgGgEgEQgFgEgIgBQgFABgFADQgFADABAFQAAAFAEADQAEADAMADQAMADAHAEQAIACADAGQAEAFAAAHQAAAOgMAHQgKAJgRgBQgLABgJgFg");
	this.shape_33.setTransform(51.1,44.75);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgKBBIAAheIAVAAIAABegAgIgtQgDgDAAgFQAAgFADgDQADgDAFgBQAGABADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_34.setTransform(44.2,42.95);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgTAtQgJgEgGgIQgEgHgBgIIAWAAQAAAHAFAEQAFAFAIgBQAJAAAEgDQAEgDAAgGQAAgFgFgDQgEgDgKgCQgLgDgHgDQgQgHAAgPQAAgMAKgIQALgJAPAAQARAAAKAJQAKAIAAAOIgVAAQAAgGgFgEQgEgEgHgBQgHABgEADQgEADgBAFQAAAFAFADQAEADALADQANADAHAEQAIACADAGQAEAFgBAHQABAOgMAHQgKAJgRgBQgLABgJgFg");
	this.shape_35.setTransform(37.2,44.75);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABDIgWAAIAAhfIAVAAIABALQAKgNAQABQAegBAAAjIAAA+g");
	this.shape_36.setTransform(226.9,19.05);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgIAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAJAAAOIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_37.setTransform(217.025,19.15);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AARBEIgbgqIgJAKIAAAgIgWAAIAAiGIAWAAIAABMIAGgIIAagdIAZAAIgjAnIAnA4g");
	this.shape_38.setTransform(208.025,17.15);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAUAAIABALQAGgMAPAAQAEgBADACIgBAUIgIgBQgOAAgFALIAABBg");
	this.shape_39.setTransform(200,19.05);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgIAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAJAAAOIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_40.setTransform(191.525,19.15);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKAMgQAAQgPAAgIgKg");
	this.shape_41.setTransform(181.625,19.25);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgJBEIAAiGIAUAAIAACGg");
	this.shape_42.setTransform(174.35,17.15);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgNAGgMQAFgLAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_43.setTransform(167.325,19.15);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgUA/QgLgFgFgHIAKgMQALALAOAAQAJAAAHgFQAFgGAAgLIAAgHQgIALgPAAQgQAAgLgOQgLgNAAgXQAAgWALgNQAKgNASAAQAOAAAKALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgJgEgAgOgoQgFAIAAAQQAAAPAFAHQAGAIAJAAQAOAAAFgLIAAgpQgFgLgOAAQgJAAgGAJg");
	this.shape_44.setTransform(157.1,20.925);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgVAAIAAhfIAUAAIAAALQALgNAQABQAegBAAAjIAAA+g");
	this.shape_45.setTransform(147.2,19.05);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgNAGgMQAFgLAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_46.setTransform(137.475,19.15);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AAuAxIAAg9QAAgJgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABBIgVAAIAAg+QAAgRgRAAQgNAAgFALIAABEIgVAAIAAhfIAUAAIAAAKQAKgMASABQASAAAHAOQAKgOATAAQAQgBAIAKQAHAIAAARIAAA+g");
	this.shape_47.setTransform(124.725,19.05);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgEAAgFQAAgEADgEQADgDAFABQAGgBADADQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_48.setTransform(109.85,17.35);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABDIgVAAIAAhfIAUAAIABALQAKgNAQABQAegBAAAjIAAA+g");
	this.shape_49.setTransform(102.55,19.05);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgEAAgFQAAgEADgEQADgDAFABQAGgBADADQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_50.setTransform(95.25,17.35);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABDIgVAAIAAhfIAUAAIABALQAKgNAQABQAegBAAAjIAAA+g");
	this.shape_51.setTransform(83.2,19.05);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgIAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAJAAAOIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_52.setTransform(73.325,19.15);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AAUAwIgUhBIgTBBIgSAAIgahfIAVAAIAPBAIAUhAIAPAAIAUBBIAPhBIAVAAIgaBfg");
	this.shape_53.setTransform(61.725,19.15);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgNAGgMQAFgLAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_54.setTransform(50.325,19.15);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AAdBAIAAg5Ig5AAIAAA5IgWAAIAAh/IAWAAIAAA2IA5AAIAAg2IAWAAIAAB/g");
	this.shape_55.setTransform(38.975,17.5);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.181,0,0,1.555,-147,-67.8)).s().p("A29KlIAA1IMAt7AAAIAAVIg");
	this.shape_56.setTransform(132.7,50.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop14G5, new cjs.Rectangle(-14.3,-17.5,294.1,135.3), null);


(lib.drop14G4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgWAAIAAhfIAVAAIAAALQALgNAQAAQAeAAABAjIAAA+g");
	this.shape.setTransform(234.9,49.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKgBQARABAKAIQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNAAQgPgBgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_1.setTransform(225.025,49.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAFACACQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgcg");
	this.shape_2.setTransform(216.925,48.45);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKgBQARABAKAIQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNAAQgPgBgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_3.setTransform(209.275,49.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgVAKgNQALgNARgBQAOABAJAKIAAgwIAWAAIAACGIgUAAIgBgKQgJAMgPAAQgRAAgKgOgAgOgDQgFAGAAARQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAJg");
	this.shape_4.setTransform(199.125,47.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKgBQARABAKAIQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNAAQgPgBgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_5.setTransform(189.375,49.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AAuAxIAAg9QAAgJgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAHIAABAIgVAAIAAg+QAAgRgRAAQgNAAgFAKIAABFIgVAAIAAhfIAUAAIAAAKQAKgMASAAQASAAAHAPQAKgPATAAQAQAAAIAKQAHAIAAARIAAA+g");
	this.shape_6.setTransform(176.675,49.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALAKQgFAJgKAEQgKAGgLAAQgUAAgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_7.setTransform(164.125,49.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgpBDIAAiDIAUAAIABAKQAKgMAOAAQASAAAKANQAKANAAAXIAAACQAAAVgLANQgJANgRAAQgPAAgJgKIAAAtgAgTglIAAApQAGALANAAQAJAAAGgIQAFgHAAgRQABgOgGgJQgGgIgJAAQgNAAgGALg");
	this.shape_8.setTransform(154.3,51.225);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgVAAIAAhfIAUAAIAAALQALgNAQAAQAeAAAAAjIAAA+g");
	this.shape_9.setTransform(139.55,49.4);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKgBQARABAKAIQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNAAQgPgBgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_10.setTransform(129.675,49.5);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgVAKgNQALgNARgBQAOABAJAKIAAgwIAWAAIAACGIgUAAIgBgKQgJAMgPAAQgRAAgKgOgAgOgDQgFAGAAARQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAJg");
	this.shape_11.setTransform(119.525,47.6);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABDIgWAAIAAhfIAVAAIABALQAKgNAQAAQAeAAAAAjIAAA+g");
	this.shape_12.setTransform(105.15,49.4);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKgBQARABAKAIQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNAAQgPgBgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_13.setTransform(95.275,49.5);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKgBQARABAKAIQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNAAQgPgBgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_14.setTransform(85.525,49.5);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgVAAIAAhfIAUAAIAAALQALgNAQAAQAeAAAAAjIAAA+g");
	this.shape_15.setTransform(75.65,49.4);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAUAAIABALQAHgNAOAAQAEABADABIAAAUIgJgBQgPAAgDAMIAABAg");
	this.shape_16.setTransform(67.9,49.4);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALAKQgFAJgKAEQgKAGgLAAQgUAAgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_17.setTransform(59.575,49.5);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgdAlQgLgOAAgWIAAgCQAAgVALgOQAMgNATAAQARAAALAKQALALAAAPIgUAAQAAgIgGgFQgFgFgIAAQgJAAgGAIQgGAHAAAPIAAADQAAAPAGAHQAGAIAJAAQAIAAAFgEQAGgFAAgHIAUAAQAAAJgFAHQgGAJgIAEQgJAEgKABQgUAAgMgNg");
	this.shape_18.setTransform(50.05,49.5);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABDIgWAAIAAhfIAVAAIABALQAKgNAQAAQAeAAAAAjIAAA+g");
	this.shape_19.setTransform(40.25,49.4);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALAKQgFAJgKAEQgKAGgLAAQgUAAgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_20.setTransform(30.525,49.5);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgoBDIAAiDIATAAIABAKQAJgMAPAAQASAAAKANQAJANAAAXIAAACQABAVgKANQgLANgQAAQgPAAgJgKIAAAtgAgTglIAAApQAFALANAAQAKAAAFgIQAHgHAAgRQgBgOgFgJQgGgIgKAAQgNAAgFALg");
	this.shape_21.setTransform(20.7,51.225);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgTAtQgJgEgGgHQgEgIAAgJIAVAAQAAAIAFAEQAFAEAIABQAIgBAFgDQAEgDAAgGQAAgFgFgDQgEgDgKgCQgLgCgHgEQgQgHAAgOQAAgNAKgIQAKgJAQABQAQgBALAJQAKAJAAANIgVAAQAAgGgFgEQgEgFgHAAQgGAAgFAEQgEADgBAGQAAAFAFACQAEADAMADQAMADAHAEQAIACADAGQAEAFgBAHQAAANgLAJQgKAHgRABQgLAAgJgFg");
	this.shape_22.setTransform(253.3,23.9);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALABQAUAAAKAMQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALAMQgFAIgKAFQgKAEgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_23.setTransform(243.975,23.9);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgTAtQgJgEgFgHQgGgIAAgJIAVAAQABAIAFAEQAFAEAIABQAJgBAEgDQAEgDAAgGQAAgFgEgDQgFgDgKgCQgLgCgHgEQgQgHAAgOQAAgNAKgIQALgJAOABQASgBAKAJQALAJAAANIgWAAQAAgGgEgEQgFgFgIAAQgFAAgFAEQgFADABAGQAAAFADACQAFADALADQANADAHAEQAHACAEAGQADAFABAHQgBANgKAJQgLAHgRABQgLAAgJgFg");
	this.shape_24.setTransform(234.35,23.9);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgfAkQgMgOAAgWIAAAAQAAgOAFgLQAGgLAKgHQAKgFAMAAQATAAAMAMQAMANABAUIAAAEQAAAOgFALQgGALgKAGQgKAHgNAAQgTAAgMgOgAgQgXQgGAIAAAQQAAAPAGAIQAGAIAKAAQALAAAGgIQAGgIAAgQQAAgOgGgJQgHgIgKAAQgKAAgGAIg");
	this.shape_25.setTransform(224.675,23.9);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAVAAIAAAKQAGgMAOAAQAFAAADABIgBAUIgIgBQgPAAgEALIAABAg");
	this.shape_26.setTransform(216.8,23.8);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgpBDIAAiDIAUAAIABAKQAKgMAOAAQASAAAKANQAKANAAAXIAAACQAAAVgLANQgJANgRAAQgPAAgJgKIAAAtgAgTglIAAApQAGALANAAQAJAAAGgIQAFgHAAgRQABgOgGgJQgGgIgJAAQgNAAgGALg");
	this.shape_27.setTransform(208.3,25.625);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_28.setTransform(193.1,22.1);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgMASAAQASAAAHAOQAKgOATAAQAQAAAIAJQAHAIAAARIAAA9g");
	this.shape_29.setTransform(182.975,23.8);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKAAQARgBAKAJQAKAJAAAOIAAArQAAAMAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_30.setTransform(170.275,23.9);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgJBDIAAiGIAUAAIAACGg");
	this.shape_31.setTransform(163.1,21.9);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKAAQARgBAKAJQAKAJAAAOIAAArQAAAMAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_32.setTransform(155.925,23.9);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgUA/QgLgFgEgHIAJgMQALALAOAAQAJAAAHgFQAFgGAAgLIAAgHQgIALgPAAQgQAAgLgOQgLgNAAgXQAAgWAKgNQALgNASAAQAOAAAKALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgKAAgKgEgAgOgoQgFAIAAAQQAAAPAFAHQAGAIAJAAQAOAAAFgLIAAgpQgFgLgOAAQgJAAgGAJg");
	this.shape_33.setTransform(145.75,25.675);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABCIgVAAIAAhdIAUAAIABALQAKgNAQAAQAeAAAAAhIAAA+g");
	this.shape_34.setTransform(135.85,23.8);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALABQAUAAAKAMQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALAMQgFAIgKAFQgKAEgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_35.setTransform(126.125,23.9);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgMASAAQASAAAHAOQAKgOATAAQAQAAAIAJQAHAIAAARIAAA9g");
	this.shape_36.setTransform(113.375,23.8);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgJBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_37.setTransform(95.6,22.1);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABCIgWAAIAAhdIAVAAIABALQAKgNAQAAQAeAAABAhIAAA+g");
	this.shape_38.setTransform(88.3,23.8);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_39.setTransform(81,22.1);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABCIgWAAIAAhdIAVAAIAAALQALgNAQAAQAeAAABAhIAAA+g");
	this.shape_40.setTransform(66.05,23.8);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKAAQARgBAKAJQAKAJAAAOIAAArQAAAMAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_41.setTransform(56.175,23.9);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AAUAvIgUhAIgTBAIgSAAIgahdIAVAAIAPA/IAUg/IAPAAIAUBAIAPhAIAVAAIgaBdg");
	this.shape_42.setTransform(44.575,23.9);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALABQAUAAAKAMQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALAMQgFAIgKAFQgKAEgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_43.setTransform(33.175,23.9);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AAdBAIAAg5Ig5AAIAAA5IgWAAIAAh/IAWAAIAAA2IA5AAIAAg2IAWAAIAAB/g");
	this.shape_44.setTransform(21.825,22.25);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.165,0,0,1.218,-145,-53)).s().p("A2qISIAAwjMAtVAAAIAAQjg");
	this.shape_45.setTransform(139.75,40.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop14G4, new cjs.Rectangle(-5.3,-12.7,290.2,106), null);


(lib.drop14G3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKAAQARgBAKAJQAKAJAAAOIAAArQAAAMAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape.setTransform(97.625,68.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_1.setTransform(90.45,66.65);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAVAAIAAAKQAGgMAOAAQAFAAADABIgBAUIgIgBQgPAAgEALIAABAg");
	this.shape_2.setTransform(85.4,68.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKAAQARgBAKAJQAKAJAAAOIAAArQAAAMAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_3.setTransform(76.925,68.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgKBDIAAiGIAVAAIAACGg");
	this.shape_4.setTransform(69.75,66.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALABQAUAAAKAMQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALAMQgFAIgKAFQgKAEgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_5.setTransform(62.725,68.45);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgTAtQgJgEgFgHQgGgIAAgJIAVAAQABAIAFAEQAFAEAIABQAIgBAFgDQAEgDAAgGQAAgFgEgDQgFgDgKgCQgLgCgHgEQgQgHAAgOQAAgNAKgIQAKgJAQABQAQgBALAJQALAJAAANIgWAAQAAgGgEgEQgFgFgHAAQgHAAgEAEQgFADABAGQAAAFADACQAFADALADQANADAHAEQAHACAEAGQADAFABAHQgBANgKAJQgLAHgRABQgLAAgJgFg");
	this.shape_6.setTransform(53.1,68.45);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_7.setTransform(46.2,66.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgUAKgOQALgNARAAQAOgBAJALIAAgxIAWAAIAACGIgUAAIgBgKQgJANgPAAQgRAAgKgOgAgOgEQgFAHAAARQAAAPAFAIQAGAIAJAAQANAAAGgMIAAgnQgGgMgNAAQgJAAgGAIg");
	this.shape_8.setTransform(38.625,66.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALABQAUAAAKAMQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALAMQgFAIgKAFQgKAEgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_9.setTransform(29.025,68.45);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgpBDIAAiDIAUAAIABAKQAKgMAOAAQASAAAKANQAKANgBAXIAAACQAAAVgKANQgJANgRAAQgPAAgJgKIAAAtgAgTglIAAApQAGALANAAQAJAAAFgIQAHgHgBgRQAAgOgFgJQgGgIgJAAQgNAAgGALg");
	this.shape_10.setTransform(19.2,70.175);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgEQgEgFgJAAQgLAAgHAMIAABDIgWAAIAAhfIAVAAIABAMQAKgNAQgBQAeAAAAAjIAAA+g");
	this.shape_11.setTransform(252.55,42.75);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKALgQAAQgPAAgIgJg");
	this.shape_12.setTransform(242.525,42.95);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgoBDIAAiDIATAAIABAKQAJgMAPAAQASAAAKANQAJANAAAXIAAACQABAVgKANQgLANgQAAQgPAAgJgKIAAAtgAgTglIAAApQAFALANAAQAKAAAFgIQAHgHAAgRQgBgOgFgJQgGgIgKAAQgNAAgFALg");
	this.shape_13.setTransform(232.65,44.575);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKALgQAAQgPAAgIgJg");
	this.shape_14.setTransform(222.375,42.95);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_15.setTransform(212.525,42.85);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AAuAxIAAg+QAAgJgEgDQgEgFgJAAQgHAAgFAEQgFAEgBAHIAABAIgVAAIAAg+QAAgRgRAAQgNAAgFAKIAABFIgVAAIAAhfIAUAAIAAAKQAKgLASgBQASAAAHAPQAKgPATAAQAQAAAIAJQAHAJAAARIAAA+g");
	this.shape_16.setTransform(199.825,42.75);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgNASQAFgIACgGQACgFAAgGIAAgRIASAAIAAAPQAAAJgFAJQgEAKgHAGg");
	this.shape_17.setTransform(164.6,48.025);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAVAAIAABfgAgIgtQgDgDAAgFQAAgFADgDQADgEAFAAQAGAAADAEQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_18.setTransform(160.65,41.05);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAVAAIAAALQAGgNAOAAQAFABADABIgBAUIgIgBQgPAAgDAMIAABAg");
	this.shape_19.setTransform(155.6,42.75);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKALgQAAQgPAAgIgJg");
	this.shape_20.setTransform(146.975,42.95);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgVAKgNQALgOARAAQAOAAAJALIAAgwIAWAAIAACGIgUAAIgBgKQgJAMgPgBQgRAAgKgNgAgOgEQgFAIAAAQQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAIg");
	this.shape_21.setTransform(136.725,40.95);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgNASQAFgIACgGQACgFAAgGIAAgRIASAAIAAAPQAAAJgFAJQgEAKgGAGg");
	this.shape_22.setTransform(104.45,48.025);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgKAhIAAg1IgQAAIAAgQIAQAAIAAgXIAUAAIAAAXIARAAIAAAQIgRAAIAAA0QAAAFACACQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgbg");
	this.shape_23.setTransform(99.575,41.8);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAVAAIAABfgAgIgtQgDgDAAgFQAAgFADgDQADgEAFAAQAGAAADAEQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_24.setTransform(94.5,41.05);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAVAAIAAALQAGgNAOAAQAFABADABIgBAUIgIgBQgPAAgEAMIAABAg");
	this.shape_25.setTransform(89.45,42.75);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgfAkQgMgNAAgXIAAAAQAAgOAFgLQAGgMAKgFQAKgHAMAAQATAAAMANQAMAMABAVIAAAEQAAAOgFALQgGALgKAGQgKAGgNAAQgTAAgMgNgAgQgXQgGAJAAAPQAAAOAGAJQAGAIAKAAQALAAAGgIQAGgJAAgPQAAgOgGgJQgHgIgKAAQgKAAgGAIg");
	this.shape_26.setTransform(80.775,42.85);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgpBDIAAiDIAUAAIABAKQAJgMAPAAQASAAAKANQAJANAAAXIAAACQABAVgLANQgKANgQAAQgPAAgJgKIAAAtgAgTglIAAApQAFALANAAQAKAAAFgIQAHgHAAgRQgBgOgFgJQgGgIgKAAQgNAAgFALg");
	this.shape_27.setTransform(70.75,44.575);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgNAGgLQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALAKQgFAJgKAFQgKAEgLAAQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_28.setTransform(60.775,42.85);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAUAAIABALQAGgNAOAAQAFABADABIgBAUIgIgBQgPAAgEAMIAABAg");
	this.shape_29.setTransform(53.1,42.75);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgVAKgNQALgOARAAQAOAAAJALIAAgwIAWAAIAACGIgUAAIgBgKQgJAMgPgBQgRAAgKgNgAgOgEQgFAIAAAQQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAIg");
	this.shape_30.setTransform(44.225,40.95);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_31.setTransform(34.475,42.85);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AAuAxIAAg+QAAgJgEgDQgEgFgJAAQgHAAgFAEQgFAEgBAHIAABAIgVAAIAAg+QAAgRgRAAQgNAAgFAKIAABFIgVAAIAAhfIAUAAIAAAKQAKgLASgBQASAAAHAPQAKgPATAAQAQAAAIAJQAHAJAAARIAAA+g");
	this.shape_32.setTransform(21.775,42.75);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_33.setTransform(255.25,15.45);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAJIAAAfIgWAAIAAiGIAWAAIAABNIAGgIIAagcIAZAAIgjAmIAnA3g");
	this.shape_34.setTransform(248.825,15.25);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_35.setTransform(241.25,15.45);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgJBDIAAiGIATAAIAACGg");
	this.shape_36.setTransform(236.65,15.25);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_37.setTransform(232.05,15.45);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AAuAwIAAg8QAAgKgEgEQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgMASAAQASAAAHAOQAKgOATAAQAQAAAIAJQAHAIAAARIAAA9g");
	this.shape_38.setTransform(221.925,17.15);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgVIAAgCQAAgNAGgMQAFgLAKgGQAKgHALABQAUAAAKAMQALAMAAAXIAAAIIg9AAQABALAGAHQAHAHAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_39.setTransform(209.375,17.25);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AAuAwIAAg8QAAgKgEgEQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgMASAAQASAAAHAOQAKgOATAAQAQAAAIAJQAHAIAAARIAAA9g");
	this.shape_40.setTransform(196.625,17.15);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAJIAAAfIgWAAIAAiGIAWAAIAABNIAGgIIAagcIAZAAIgjAmIAnA3g");
	this.shape_41.setTransform(164.625,15.25);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAAqQAAANAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_42.setTransform(154.475,17.25);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgeA3QgLgOAAgXQAAgUAKgOQALgNARAAQAOAAAJAKIAAgxIAWAAIAACGIgUAAIgBgKQgJANgPAAQgRAAgKgOgAgOgDQgFAHAAAQQAAAPAFAIQAGAIAJAAQANAAAGgMIAAgnQgGgMgNAAQgJAAgGAJg");
	this.shape_43.setTransform(144.325,15.35);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_44.setTransform(137.15,15.45);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAGACACQACACAGAAIAHgBIAAARQgHACgHAAQgXAAAAgcg");
	this.shape_45.setTransform(131.625,16.2);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_46.setTransform(106.5,15.45);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABCIgWAAIAAhdIAVAAIABAKQAKgMAQAAQAeAAAAAhIAAA+g");
	this.shape_47.setTransform(99.2,17.15);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_48.setTransform(91.9,15.45);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABCIgWAAIAAhdIAVAAIABAKQAKgMAQAAQAeAAAAAhIAAA+g");
	this.shape_49.setTransform(64.55,17.15);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAAqQAAANAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_50.setTransform(54.675,17.25);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AAUAvIgUhAIgTBAIgSAAIgahdIAVAAIAPA/IAUg/IAPAAIAUBAIAPhAIAVAAIgaBdg");
	this.shape_51.setTransform(43.075,17.25);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgVIAAgCQAAgNAGgMQAFgLAKgGQAKgHALABQAUAAAKAMQALAMAAAXIAAAIIg9AAQABALAGAHQAHAHAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_52.setTransform(31.675,17.25);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AAdBAIAAg5Ig5AAIAAA5IgWAAIAAh/IAWAAIAAA2IA5AAIAAg2IAWAAIAAB/g");
	this.shape_53.setTransform(20.325,15.6);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.258,0,0,1.762,-156.6,-76.8)).s().p("A4dL+IAA37MAw8AAAIAAX7g");
	this.shape_54.setTransform(137.55,45.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop14G3, new cjs.Rectangle(-19.1,-30.7,313.3,153.29999999999998), null);


(lib.drop14G2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgSArQgIgFgFgHQgFgHAAgHIAUAAQAAAHAFAEQAFADAHAAQAIAAAEgDQAEgDAAgFQAAgFgEgDQgEgCgKgCQgKgDgHgDQgPgHAAgNQAAgMAKgHQAKgIAOAAQAQAAAKAIQAKAHAAANIgVAAQAAgFgEgEQgEgFgHAAQgGAAgEAEQgEADAAAFQAAAEAEADQADADALADQAMACAHAEQAHACADAFQADAGAAAGQAAAMgKAIQgKAHgQAAQgKAAgJgDg");
	this.shape.setTransform(50.725,75.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgdAnQgJgIABgLQAAgPAKgGQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEAEQgEADgBAFIgTAAQAAgHAEgHQAFgGAJgEQAIgEAJABQAQAAAKAIQAJAHAAAOIAAAoQAAAMADAIIAAABIgUAAIgCgIQgKAKgNgBQgNAAgJgHgAgLAHQgHAEABAHQAAAGADADQAFAEAGgBQAFAAAFgCQAGgDACgFIAAgRIgLAAQgKAAgFAEg");
	this.shape_1.setTransform(41.8,75.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgWIATAAIAAAWIAQAAIAAAPIgQAAIAAAxQAAAFACADQACACAGAAIAHgBIAAAQIgOABQgWABAAgag");
	this.shape_2.setTransform(34.175,74.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgdAnQgJgIABgLQAAgPAKgGQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEAEQgEADgBAFIgTAAQAAgHAEgHQAFgGAJgEQAIgEAJABQAQAAAKAIQAJAHAAAOIAAAoQAAAMADAIIAAABIgUAAIgCgIQgKAKgNgBQgNAAgJgHgAgLAHQgHAEABAHQAAAGADADQAFAEAGgBQAFAAAFgCQAGgDACgFIAAgRIgLAAQgKAAgFAEg");
	this.shape_3.setTransform(26.95,75.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgbAjQgMgNABgTIAAgDQAAgNAEgKQAGgKAJgHQAJgFALAAQASgBALAMQAJAMABAWIAAAGIg7AAQACALAGAHQAHAGAJAAQANABAJgLIALAKQgFAIgJAEQgKAFgKAAQgTgBgMgLgAgLgYQgFAGgCALIAlAAIAAgCQAAgKgFgFQgEgGgJAAQgIABgEAFg");
	this.shape_4.setTransform(242.8,51.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AAQBAIgZgnIgJAJIAAAeIgVAAIAAh/IAVAAIAABJIAGgIIAXgbIAZAAIgiAkIAlA1g");
	this.shape_5.setTransform(234.3,49.625);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgmA/IAAh8IASAAIABAKQAJgLAOAAQARAAAJAMQAJANAAAVIAAABQAAAVgJAMQgKAMgQAAQgNAAgJgKIAAArgAgSgjIAAAmQAFALANAAQAIAAAGgHQAFgIAAgPQAAgOgFgHQgGgJgJABQgMAAgFAKg");
	this.shape_6.setTransform(212.625,53.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgdAnQgJgIAAgLQAAgOALgHQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgFADABAFIgUAAQAAgHAEgHQAFgGAJgEQAIgDAKAAQAPAAAJAHQAKAJAAAOIAAAnQAAAMAEAIIAAABIgVAAIgDgIQgJAKgNAAQgOgBgIgHgAgMAGQgFAFAAAHQAAAGADADQAEADAHAAQAFAAAFgCQAFgDADgFIAAgRIgLAAQgKAAgGADg");
	this.shape_7.setTransform(203.05,51.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgcA0QgKgNAAgVQAAgVAJgMQAKgMAQAAQAOAAAIAKIAAguIAUAAIAAB+IgSAAIgBgJQgJAKgOABQgQAAgJgNgAgNgDQgFAGAAAQQAAAOAFAHQAGAIAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_8.setTransform(193.425,49.7);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgdAnQgJgIAAgLQAAgOALgHQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgEADAAAFIgUAAQAAgHAEgHQAFgGAJgEQAIgDAKAAQAPAAAKAHQAJAJAAAOIAAAnQAAAMADAIIAAABIgUAAIgDgIQgJAKgNAAQgNgBgJgHgAgMAGQgFAFAAAHQAAAGADADQAEADAHAAQAFAAAFgCQAFgDADgFIAAgRIgLAAQgKAAgGADg");
	this.shape_9.setTransform(184.25,51.5);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AARBAIAAg6QAAgIgEgEQgEgEgIAAQgLAAgGAKIAABAIgUAAIAAh/IAUAAIAAAwQAKgMAOAAQAdAAAAAgIAAA7g");
	this.shape_10.setTransform(174.925,49.625);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgTA7QgKgEgFgHIAKgLQAJAKAOABQAJgBAGgFQAFgGAAgKIAAgGQgIAKgOAAQgPAAgKgNQgKgNAAgUQAAgWAJgMQAKgMAQAAQAPgBAIALIABgJIASAAIAABWQAAASgLAKQgKALgSAAQgKAAgJgFgAgNgmQgFAIAAAPQAAAOAFAGQAFAIAJAAQANAAAFgKIAAgmQgFgLgNAAQgJAAgFAIg");
	this.shape_11.setTransform(165.2,53.2);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_12.setTransform(155.825,51.425);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgaAjQgMgNAAgTIAAgDQAAgNAEgKQAGgKAJgHQAKgFAKAAQASgBAKAMQAKAMAAAWIAAAGIg5AAQABALAGAHQAHAGAIAAQAOABAJgLIALAKQgGAIgIAEQgKAFgLAAQgSgBgLgLgAgLgYQgGAGgBALIAlAAIAAgCQAAgKgFgFQgFgGgIAAQgIABgEAFg");
	this.shape_13.setTransform(146.65,51.5);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AAsAuIAAg6QAAgIgFgEQgDgEgJAAQgGAAgFAEQgEADgCAGIAAA9IgTAAIAAg6QgBgQgQAAQgLAAgGAKIAABAIgTAAIAAhZIASAAIABAJQAJgLARAAQARAAAHAOQAJgOASAAQAPAAAHAIQAHAJAAAQIAAA6g");
	this.shape_14.setTransform(134.6,51.425);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_15.setTransform(112.925,49.625);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgdAnQgJgIABgLQAAgOAKgHQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEAEQgEADgBAFIgTAAQAAgHAEgHQAFgGAJgEQAIgDAJAAQAQAAAKAHQAJAJAAAOIAAAnQAAAMADAIIAAABIgUAAIgCgIQgKAKgNAAQgNgBgJgHgAgLAGQgHAFABAHQAAAGADADQAFADAGAAQAFAAAFgCQAGgDACgFIAAgRIgLAAQgKAAgFADg");
	this.shape_16.setTransform(106.15,51.5);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgXAuIAAhZIATAAIABAKQAHgMANAAIAHABIAAATIgJAAQgOAAgDAKIAAA9g");
	this.shape_17.setTransform(98.95,51.425);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgdAiQgMgNAAgUIAAgBQAAgNAGgLQAFgKAJgGQAKgFALAAQASgBAMAMQALAMABATIAAAEQAAAOgFAJQgFALgKAGQgJAFgNABQgSAAgLgNgAgPgWQgGAJAAAOQAAAOAGAIQAGAHAJAAQAKABAGgJQAGgHAAgPQAAgNgGgJQgGgHgKgBQgJABgGAHg");
	this.shape_18.setTransform(90.675,51.5);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_19.setTransform(69.025,51.425);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgdAnQgJgIABgLQgBgOALgHQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEAEQgEADgBAFIgTAAQAAgHAEgHQAFgGAJgEQAIgDAKAAQAPAAAKAHQAJAJAAAOIAAAnQAAAMADAIIAAABIgUAAIgCgIQgKAKgNAAQgNgBgJgHgAgMAGQgFAFAAAHQAAAGADADQAFADAGAAQAFAAAFgCQAGgDACgFIAAgRIgLAAQgKAAgGADg");
	this.shape_20.setTransform(59.7,51.5);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_21.setTransform(52.925,49.8);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgTA7QgKgEgFgHIAKgLQAJAKAOABQAIgBAGgFQAHgGAAgKIAAgGQgKAKgNAAQgQAAgJgNQgLgNAAgUQAAgWAKgMQAKgMAQAAQAOgBAJALIABgJIASAAIAABWQABASgMAKQgKALgSAAQgKAAgJgFgAgNgmQgGAIABAPQgBAOAGAGQAGAIAIAAQANAAAGgKIAAgmQgGgLgNAAQgJAAgFAIg");
	this.shape_22.setTransform(45.75,53.2);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgdAnQgIgIAAgLQAAgOAKgHQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgEADgBAFIgUAAQAAgHAGgHQAEgGAIgEQAJgDAJAAQAQAAAKAHQAJAJAAAOIAAAnQAAAMADAIIAAABIgUAAIgCgIQgKAKgNAAQgNgBgJgHgAgLAGQgHAFAAAHQAAAGAEADQAFADAGAAQAFAAAFgCQAGgDACgFIAAgRIgLAAQgKAAgFADg");
	this.shape_23.setTransform(36.5,51.5);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgTA2IgBAJIgSAAIAAh+IAUAAIAAAuQAIgLAOABQARAAAJAMQAJAMAAAVIAAABQAAAVgJANQgJALgRABQgOgBgJgKgAgSAAIAAAlQAFALANAAQAJAAAFgHQAFgHAAgOIAAgCQAAgPgFgHQgFgHgJAAQgNAAgFALg");
	this.shape_24.setTransform(27.325,49.7);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_25.setTransform(245.175,25.4);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgcA0QgKgNAAgVQAAgVAJgMQAKgNAQAAQAOAAAIALIAAgvIAUAAIAAB/IgSAAIgBgJQgJAKgOABQgQAAgJgNgAgNgDQgFAGAAAQQAAAOAFAHQAGAIAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_26.setTransform(237.975,25.3);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgWIATAAIAAAWIAQAAIAAAPIgQAAIAAAyQAAAFACACQACACAGAAIAHgBIAAAQIgOACQgWgBAAgZg");
	this.shape_27.setTransform(222.425,26.1);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_28.setTransform(215.075,27.175);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_29.setTransform(208.175,25.225);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_30.setTransform(201.275,27.175);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AArAuIAAg6QAAgIgDgEQgEgEgJAAQgGAAgFAEQgEADgCAGIAAA9IgTAAIAAg6QgBgQgQAAQgLAAgGAKIAABAIgUAAIAAhZIATAAIABAJQAJgLARAAQARAAAHAOQAJgOASAAQAPAAAHAIQAHAJAAAQIAAA6g");
	this.shape_31.setTransform(189.15,27.025);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_32.setTransform(171.625,25.4);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AAQBAIgagnIgJAJIAAAeIgUAAIAAh/IAUAAIAABJIAHgIIAYgbIAYAAIghAkIAlA1g");
	this.shape_33.setTransform(165.6,25.225);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_34.setTransform(158.425,25.4);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_35.setTransform(154.075,25.225);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_36.setTransform(149.725,25.4);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AAsAuIAAg6QgBgIgEgEQgDgEgIAAQgIAAgEAEQgEADgCAGIAAA9IgTAAIAAg6QgBgQgPAAQgNAAgEAKIAABAIgUAAIAAhZIATAAIAAAJQAKgLAQAAQARAAAGAOQAKgOASAAQAPAAAHAIQAIAJAAAQIAAA6g");
	this.shape_37.setTransform(140.15,27.025);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgaAiQgMgLAAgUIAAgDQAAgNAEgKQAGgKAJgHQAKgFAKgBQATAAAJAMQAKAMAAAVIAAAHIg5AAQABALAGAHQAHAGAJAAQAOABAIgLIALAKQgGAIgIAEQgKAFgLAAQgSgBgLgMgAgLgXQgFAFgCALIAlAAIAAgCQAAgKgFgFQgFgFgIgBQgIAAgEAHg");
	this.shape_38.setTransform(128.3,27.1);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AArAuIAAg6QAAgIgDgEQgEgEgJAAQgGAAgFAEQgEADgCAGIAAA9IgTAAIAAg6QAAgQgRAAQgLAAgGAKIAABAIgUAAIAAhZIATAAIABAJQAJgLARAAQARAAAHAOQAJgOASAAQAPAAAHAIQAHAJAAAQIAAA6g");
	this.shape_39.setTransform(116.25,27.025);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_40.setTransform(98.725,25.4);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_41.setTransform(91.825,27.025);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_42.setTransform(84.925,25.4);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_43.setTransform(70.075,27.025);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgdAnQgJgIAAgLQAAgPALgGQALgIATAAIAMAAIAAgGQAAgHgEgEQgEgEgHAAQgHAAgEAEQgFADABAFIgVAAQABgIAEgFQAFgHAIgEQAJgEAKAAQAPABAJAHQAKAJAAAOIAAAnQAAANAEAGIAAACIgVAAIgDgIQgJAJgNABQgOAAgIgIgAgMAGQgFAFgBAHQABAGAEADQADADAHAAQAFABAFgDQAFgEADgEIAAgRIgLAAQgKAAgGADg");
	this.shape_44.setTransform(60.75,27.1);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AATAtIgTg8IgSA8IgQAAIgZhZIAUAAIAOA8IATg8IAOAAIASA9IAPg9IATAAIgYBZg");
	this.shape_45.setTransform(49.825,27.1);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgaAiQgMgLAAgUIAAgDQAAgNAEgKQAGgKAJgHQAKgFAKgBQASAAAKAMQAKAMAAAVIAAAHIg5AAQABALAGAHQAHAGAIAAQAOABAJgLIALAKQgGAIgIAEQgKAFgLAAQgSgBgLgMgAgLgXQgGAFgBALIAlAAIAAgCQAAgKgFgFQgFgFgIgBQgIAAgEAHg");
	this.shape_46.setTransform(39.1,27.1);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AAbA8IAAg1Ig1AAIAAA1IgVAAIAAh3IAVAAIAAAyIA1AAIAAgyIAVAAIAAB3g");
	this.shape_47.setTransform(28.375,25.55);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.165,0,0,1.778,-145,-77.5)).s().p("A2qMGIAA4KMAtVAAAIAAYKg");
	this.shape_48.setTransform(135.55,57.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop14G2, new cjs.Rectangle(-9.5,-20.1,290.2,154.7), null);


(lib.drop14G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgMIAAhCIAVAAIAABdIgUAAIAAgJQgKALgQAAQgPAAgIgJg");
	this.shape.setTransform(49.825,105.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgKBDIAAiGIAUAAIAACGg");
	this.shape_1.setTransform(42.55,103.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgMIAAhCIAVAAIAABdIgUAAIAAgJQgKALgQAAQgPAAgIgJg");
	this.shape_2.setTransform(35.225,105.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgUA4IgCAKIgTAAIAAiGIAWAAIAAAyQAJgMAOAAQASAAAKAOQAKANAAAWIAAABQAAAWgKANQgKANgRAAQgQAAgJgMgAgTAAIAAAmQAFANAOAAQAJAAAGgHQAFgIAAgPIAAgDQAAgQgFgGQgGgIgJAAQgOAAgFAMg");
	this.shape_3.setTransform(25.375,103.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgUA/QgLgFgEgHIAJgMQALALAOAAQAJAAAHgFQAFgGAAgLIAAgHQgIALgPAAQgQAAgLgOQgLgNAAgXQAAgWAKgNQALgNASAAQAOAAAKALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgKAAgKgEgAgOgoQgFAIAAAQQAAAPAFAHQAGAIAJAAQAOAAAFgLIAAgpQgFgLgOAAQgJAAgGAJg");
	this.shape_4.setTransform(223.6,81.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABDIgVAAIAAhfIAUAAIABALQAKgNAQABQAegBAAAjIAAA+g");
	this.shape_5.setTransform(213.7,79.45);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_6.setTransform(203.825,79.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAFACACQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgcg");
	this.shape_7.setTransform(195.725,78.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABDIgWAAIAAhfIAVAAIABALQAKgNAQABQAegBAAAjIAAA+g");
	this.shape_8.setTransform(187.95,79.45);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgJBCIAAhfIAUAAIAABfgAgIgtQgDgDAAgGQAAgEADgEQADgDAFAAQAGAAADADQADAEAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_9.setTransform(180.65,77.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgUA4IgCALIgTAAIAAiGIAWAAIAAAwQAJgLAOABQASgBAKANQAKAOAAAVIAAACQAAAWgKANQgKAOgRAAQgQAAgJgNgAgTAAIAAAnQAFAMAOAAQAJAAAGgIQAFgHAAgPIAAgDQAAgPgFgHQgGgIgJAAQgOAAgFAMg");
	this.shape_10.setTransform(173.475,77.65);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAUAAIAABfgAgIgtQgDgDAAgGQAAgEADgEQADgDAFAAQAGAAADADQADAEAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_11.setTransform(149.55,77.75);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAFACACQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgcg");
	this.shape_12.setTransform(144.025,78.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAVAAIAAALQAGgMAOAAQAFgBADACIgBAUIgIgBQgPAAgEALIAABBg");
	this.shape_13.setTransform(138.5,79.45);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_14.setTransform(130.175,79.55);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgpBDIAAiDIAUAAIABAKQAKgMAOAAQASAAAKANQAJANAAAXIAAACQAAAVgKANQgKANgQAAQgPAAgJgKIAAAtgAgTglIAAApQAFALAOAAQAJAAAFgIQAHgHAAgRQgBgOgFgJQgGgIgJAAQgOAAgFALg");
	this.shape_15.setTransform(120.35,81.275);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_16.setTransform(110.375,79.55);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgTAtQgJgEgGgIQgEgHAAgJIAVAAQAAAIAFAEQAFAEAIAAQAIAAAFgDQAEgDAAgFQAAgGgFgDQgEgDgKgDQgLgCgHgDQgQgHAAgPQAAgMAKgIQAKgIAPAAQARAAALAIQAKAJAAANIgVAAQAAgGgFgEQgEgFgIABQgFgBgFAEQgEADgBAGQAAAEAFADQAEADAMADQAMACAHAEQAIADADAFQAEAGgBAIQAAAMgLAIQgKAJgRAAQgLgBgJgEg");
	this.shape_17.setTransform(100.75,79.55);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAVAAIAABfgAgIgtQgDgDAAgGQAAgEADgEQADgDAFAAQAGAAADADQADAEAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_18.setTransform(77.5,77.75);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_19.setTransform(70.325,79.55);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AARBEIgbgqIgJAKIAAAgIgWAAIAAiGIAWAAIAABMIAGgIIAagdIAZAAIgjAnIAnA4g");
	this.shape_20.setTransform(61.325,77.55);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgVA/QgJgFgGgHIAKgMQALALAOAAQAJAAAHgFQAFgGABgLIAAgHQgJALgPAAQgRAAgKgOQgLgNAAgXQAAgWALgNQAKgNARAAQAQAAAJALIABgJIATAAIAABbQAAATgLAKQgMALgTAAQgKAAgLgEgAgNgoQgHAIAAAQQAAAPAHAHQAFAIAKAAQAMAAAHgLIAAgpQgHgLgMAAQgKAAgFAJg");
	this.shape_21.setTransform(50.75,81.325);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgWAAIAAhfIAVAAIAAALQALgNAQABQAegBABAjIAAA+g");
	this.shape_22.setTransform(40.85,79.45);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_23.setTransform(30.975,79.55);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAFACACQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgcg");
	this.shape_24.setTransform(22.875,78.5);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_25.setTransform(226.5,52.15);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAKIAAAeIgWAAIAAiGIAWAAIAABOIAGgJIAagcIAZAAIgjAmIAnA3g");
	this.shape_26.setTransform(220.075,51.95);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_27.setTransform(212.5,52.15);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgKBDIAAiGIAVAAIAACGg");
	this.shape_28.setTransform(207.9,51.95);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_29.setTransform(203.3,52.15);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgEQgEgFgJAAQgHAAgFAEQgFAEgBAHIAAA/IgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgNASAAQASAAAHAPQAKgPATAAQAQABAIAIQAHAJAAARIAAA9g");
	this.shape_30.setTransform(193.175,53.85);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALAAQAUAAAKANQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgNgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_31.setTransform(180.625,53.95);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgEQgEgFgJAAQgHAAgFAEQgFAEgBAHIAAA/IgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgNASAAQASAAAHAPQAKgPATAAQAQABAIAIQAHAJAAARIAAA9g");
	this.shape_32.setTransform(167.875,53.85);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAKIAAAeIgWAAIAAiGIAWAAIAABOIAGgJIAagcIAZAAIgjAmIAnA3g");
	this.shape_33.setTransform(140.725,51.95);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAPIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_34.setTransform(130.575,53.95);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgKAhIAAg1IgQAAIAAgQIAQAAIAAgXIAUAAIAAAXIARAAIAAAQIgRAAIAAA0QAAAGACACQACACAGAAIAHgBIAAARQgHACgHAAQgXAAAAgbg");
	this.shape_35.setTransform(122.475,52.9);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgVA/QgJgFgFgHIAKgMQAKALAOAAQAKAAAFgFQAHgGgBgLIAAgHQgJALgOAAQgQAAgLgOQgLgNAAgXQAAgWAKgNQALgNARAAQAQAAAJALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgKgEgAgOgoQgFAIgBAQQABAPAFAHQAGAIAKAAQANAAAFgLIAAgpQgFgLgNAAQgKAAgGAJg");
	this.shape_36.setTransform(99.2,55.725);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgLAAgHAMIAABCIgWAAIAAhdIAVAAIABALQAKgOAQAAQAeABAAAhIAAA+g");
	this.shape_37.setTransform(89.3,53.85);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAPIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_38.setTransform(79.425,53.95);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgiBBIAAgRIAEABQAIAAAEgDQAEgDADgHIADgIIgiheIAXAAIATBBIAUhBIAXAAIgmBtQgIAYgVAAIgKgCg");
	this.shape_39.setTransform(70.175,55.875);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_40.setTransform(48.3,52.15);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgoBDIAAiDIATAAIABAKQAJgMAQAAQARAAAKANQAKANAAAXIAAACQgBAVgJANQgLANgQAAQgPAAgJgKIAAAtgAgTglIAAApQAGALANAAQAJAAAGgIQAFgHAAgRQABgOgGgJQgGgIgJAAQgNAAgGALg");
	this.shape_41.setTransform(41.1,55.675);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAPIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_42.setTransform(30.975,53.95);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgKAhIAAg1IgQAAIAAgQIAQAAIAAgXIAUAAIAAAXIARAAIAAAQIgRAAIAAA0QAAAGACACQACACAGAAIAHgBIAAARQgHACgHAAQgXAAAAgbg");
	this.shape_43.setTransform(22.875,52.9);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgNASQAFgIACgGQACgFAAgGIAAgRIASAAIAAAPQAAAJgFAJQgEAKgGAGg");
	this.shape_44.setTransform(226.5,33.525);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAUAAIAABfgAgIgtQgDgDAAgGQAAgEADgDQADgEAFAAQAGAAADAEQADADAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_45.setTransform(222.55,26.55);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgKBEIAAiGIAUAAIAACGg");
	this.shape_46.setTransform(217.95,26.35);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgDAAgGQAAgEADgDQADgEAFAAQAGAAADAEQADADAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_47.setTransform(213.35,26.55);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgJBEIAAiGIATAAIAACGg");
	this.shape_48.setTransform(208.75,26.35);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgEAKAAQARABAKAIQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_49.setTransform(193.125,28.35);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgUA/QgKgFgGgHIAKgMQAKALAPAAQAJAAAHgFQAFgGABgLIAAgHQgKALgOAAQgRAAgKgOQgLgNAAgXQAAgWALgNQAKgNASAAQAPAAAJALIABgJIATAAIAABbQAAATgLAKQgMALgTAAQgKAAgKgEgAgNgoQgHAIAAAQQAAAPAHAHQAFAIAJAAQANAAAHgLIAAgpQgHgLgNAAQgJAAgFAJg");
	this.shape_50.setTransform(182.95,30.125);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgVAAIAAhfIAUAAIAAALQALgNAQAAQAeAAABAjIAAA+g");
	this.shape_51.setTransform(173.05,28.25);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKALgQAAQgPABgIgKg");
	this.shape_52.setTransform(163.025,28.45);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AgUA4IgCALIgTAAIAAiGIAWAAIAAAwQAJgLAOAAQASAAAKANQAKAOAAAVIAAACQAAAWgKANQgKANgRAAQgQABgJgNgAgTAAIAAAnQAFAMAOAAQAJAAAGgIQAFgHAAgPIAAgDQAAgPgFgHQgGgIgJAAQgOAAgFAMg");
	this.shape_53.setTransform(153.175,26.45);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAVAAIAABfgAgIgtQgDgDAAgGQAAgEADgDQADgEAFAAQAGAAADAEQADADAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_54.setTransform(137.15,26.55);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAFACACQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgcg");
	this.shape_55.setTransform(131.625,27.3);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAUAAIABALQAGgMAPgBQAEABADABIgBAUIgIgBQgOAAgFAMIAABAg");
	this.shape_56.setTransform(126.1,28.25);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALgBQAUABAKAMQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLgBQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_57.setTransform(117.775,28.35);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AgpBDIAAiDIAUAAIABAKQAKgMAOAAQASAAAKANQAKANAAAXIAAACQAAAVgLANQgJANgRAAQgPAAgJgKIAAAtgAgTglIAAApQAGALANAAQAJAAAGgIQAFgHAAgRQABgOgGgJQgGgIgJAAQgNAAgGALg");
	this.shape_58.setTransform(107.95,30.075);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALgBQAUABAKAMQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLgBQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_59.setTransform(97.975,28.35);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgTAtQgJgEgGgIQgEgHAAgJIAUAAQABAIAFAEQAGAFAHgBQAIABAFgEQAEgDAAgFQAAgGgEgDQgFgDgKgDQgLgCgHgDQgQgHAAgPQAAgMAKgIQALgIAOgBQARABALAIQALAJgBANIgVAAQAAgGgEgEQgFgFgIABQgFgBgFAEQgFADAAAFQABAFAEADQAEADAMADQAMACAHAEQAHADAEAFQAEAGAAAIQAAANgMAHQgKAJgRgBQgLAAgJgEg");
	this.shape_60.setTransform(88.35,28.35);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AARBEIgbgqIgJAKIAAAgIgWAAIAAiGIAWAAIAABMIAGgIIAagdIAZAAIgjAnIAnA4g");
	this.shape_61.setTransform(71.175,26.35);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKALgQAAQgPABgIgKg");
	this.shape_62.setTransform(60.875,28.45);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAFACACQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgcg");
	this.shape_63.setTransform(52.675,27.3);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgVAAIAAhfIAUAAIAAALQALgNAQAAQAeAAABAjIAAA+g");
	this.shape_64.setTransform(44.9,28.25);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALgBQAUABAKAMQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLgBQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_65.setTransform(35.175,28.35);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AgUA4IgCALIgTAAIAAiGIAWAAIAAAwQAJgLAOAAQASAAAKANQAKAOAAAVIAAACQAAAWgKANQgKANgRAAQgQABgJgNgAgTAAIAAAnQAFAMAOAAQAJAAAGgIQAFgHAAgPIAAgDQAAgPgFgHQgGgIgJAAQgOAAgFAMg");
	this.shape_66.setTransform(25.375,26.45);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AgJBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_67.setTransform(226.55,0.95);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAKIAAAeIgWAAIAAiGIAWAAIAABNIAGgIIAagcIAZAAIgjAmIAnA3g");
	this.shape_68.setTransform(220.125,0.75);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_69.setTransform(212.55,0.95);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2C3E50").s().p("AgJBDIAAiGIATAAIAACGg");
	this.shape_70.setTransform(207.95,0.75);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_71.setTransform(203.35,0.95);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgMASAAQASAAAHAOQAKgOATAAQAQAAAIAJQAHAIAAARIAAA9g");
	this.shape_72.setTransform(193.225,2.65);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALABQAUAAAKAMQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_73.setTransform(180.675,2.75);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgMASAAQASAAAHAOQAKgOATAAQAQAAAIAJQAHAIAAARIAAA9g");
	this.shape_74.setTransform(167.925,2.65);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_75.setTransform(125.2,0.95);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABCIgWAAIAAhdIAVAAIAAAKQALgMAQAAQAeAAABAhIAAA+g");
	this.shape_76.setTransform(117.9,2.65);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_77.setTransform(110.6,0.95);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABCIgVAAIAAhdIAUAAIAAAKQALgMAQAAQAeAAAAAhIAAA+g");
	this.shape_78.setTransform(70.7,2.65);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAArQAAAMAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_79.setTransform(60.825,2.75);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#2C3E50").s().p("AAUAvIgUhAIgTBAIgSAAIgahdIAVAAIAPBAIAUhAIAPAAIAUBAIAPhAIAVAAIgaBdg");
	this.shape_80.setTransform(49.225,2.75);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALABQAUAAAKAMQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_81.setTransform(37.825,2.75);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#2C3E50").s().p("AAdBAIAAg5Ig5AAIAAA5IgWAAIAAh/IAWAAIAAA2IA5AAIAAg2IAWAAIAAB/g");
	this.shape_82.setTransform(26.475,1.1);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.176,0,0,2.514,-146.5,-109.6)).s().p("A24RGMAAAgiLMAtxAAAMAAAAiLg");
	this.shape_83.setTransform(124.525,62.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop14G1, new cjs.Rectangle(-21.9,-46.4,292.9,218.8), null);


(lib.drag15G10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap153();
	this.instance.setTransform(0,-3,0.3409,0.4605);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgNASQgEgEAAgGIAJAAQAAADACACQACACADAAQADAAACgCQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAgBQAAgDgFgCIgHgDQgIgCAAgHQAAgGAFgDQAFgEAGAAQAHAAAEAEQAEAEAAAGIgJAAQAAgBAAgBQAAgBAAAAQAAgBgBAAQAAgBAAAAQgCgCgDAAQgDAAgBABQgBABAAAAQgBABAAAAQAAABgBAAQAAABAAABQAAADAEABIAIADQAIACAAAIQAAAEgDADIgGAEIgIACQgHAAgFgEg");
	this.shape.setTransform(62.225,88.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AAFAWIAFgbIAAgDQAAgEgFgBQgFAAgEAFIgFAeIgJAAIAHgqIAJAAIgBAFQAEgFAHAAQAGgBADAEQADAFgBAHIgEAbg");
	this.shape_1.setTransform(57.9375,88.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgKATQgEgDgCgFQgCgEABgGIAAgBQAAgFADgFQADgGAFgCQAFgDAEAAQAIAAAEAGQAEAGgBAJIgBADIgZAAQgBAFADADQACADAEAAQAFABAFgGIAFAFIgHAGQgEACgEAAQgGAAgEgDgAgIgDIARAAIAAgBIAAgDQAAgBAAgBQAAAAAAgBQgBAAAAgBQgBAAAAAAQAAgBgBAAQAAgBgBAAQAAAAgBAAQgBgBgBAAQgGAAgEALg");
	this.shape_2.setTransform(53.855,88.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgJAdIAIgpIAIAAIgHApgAABgTQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIABgEQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAABAAQAAAAAAABQABAAAAAAQABABAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAABgBAAQAAABAAAAQAAAAgBABIgEABQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_3.setTransform(50.825,87.775);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgHAXQgCgDAAgFIAEgXIgGAAIABgHIAHAAIABgLIAJAAIgCALIAHAAIgBAHIgHAAIgEAWIAAACQAAABAAAAQAAABAAAAQABAAAAABQABAAABAAIADgBIgBAIIgFAAQgEAAgDgDg");
	this.shape_4.setTransform(48.625,88.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgOASQgDgDAAgGQAAgGAGgDQAFgEAIAAIAGAAIABgDIAAgCQgBgFgFAAQgDAAgBABQgCACgBADIgJAAQAAgEADgDQACgDAEgBIAIgCQAHAAAEAEQAEAEgBAGIgDATIAAAEIAAAEIAAABIgJAAIAAgEQgGAFgFAAQgFgBgEgDgAgEADQgDACgBAEQAAAAAAABQAAAAAAABQAAAAABABQAAAAAAAAQABABAAAAQAAAAABABQAAAAABAAQABAAAAAAQADAAACgBIAEgEIACgIIgFAAQgEAAgDACg");
	this.shape_5.setTransform(44.8778,88.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgUAeIAKg6IAIAAIgBAEQAEgFAHAAQAEAAADACQADACACAEQABAEAAAFIAAAFQgBAHgCAEQgDAFgEADQgEACgFAAQgGAAgDgFIgEAVgAgDgQIgDASQABAEAFAAQAEABAEgEQADgDABgIIAAgCQAAgFgCgDQgBgDgEAAQgFAAgDAFg");
	this.shape_6.setTransform(40.425,89.375);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AARAWIAFgbIAAgDQgBgEgFgBQgGAAgDAHIAAABIgFAbIgIAAIAEgbIAAgDQAAgEgFgBQgGAAgDAFIgFAeIgKAAIAIgqIAIAAIAAAFQAFgGAHABQADgBADACQACACABADQAGgGAIAAQAGgBADAEQADAFgBAHIgEAbg");
	this.shape_7.setTransform(34.9036,88.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgJAdIAIgpIAIAAIgHApgAABgTQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIABgEQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAABAAQAAAAAAABQABAAAAAAQABABAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAABgBAAQAAABAAAAQAAAAgBABIgEABQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_8.setTransform(30.775,87.775);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgOATQgDgEAAgFQAAgHAGgDQAFgEAIAAIAGAAIABgDIAAgCQgBgFgFAAQgDAAgBABQgCACgBADIgJAAQAAgEADgDQACgDAEgBQAEgCAEAAQAHAAAEAEQAEAEgBAGIgDATIAAAEIAAAEIAAABIgJAAIAAgEQgGAFgFAAQgFAAgEgDgAgEADQgDACgBAEQAAAAAAABQAAAAAAABQAAAAABABQAAAAAAAAQABABAAAAQAAAAABABQAAAAABAAQABAAAAAAQADABACgCIAEgEIACgIIgFAAQgEAAgDACg");
	this.shape_9.setTransform(63.1278,75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgJAdIAIgpIAIAAIgHApgAABgTQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIABgEQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAABAAAAQAAAAgBABIgEABQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_10.setTransform(60.225,74.175);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgOAWIAIgqIAHAAIAAAFQAEgFAGAAIADAAIgBAJIgDAAQgGAAgEAEIgEAdg");
	this.shape_11.setTransform(57.9,74.95);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgOAUQgDgCgBgEQgBgDABgFIAEgbIAJAAIgEAbIAAADQAAAFAFAAQAFAAAEgFIAFgeIAJAAIgHAqIgJAAIABgEQgEAFgHAAIgHgCg");
	this.shape_12.setTransform(54.3167,75.025);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AAFAeIAFgcIAAgCQAAgEgFgBQgFABgEAEIgFAeIgJAAIAKg7IAIAAIgDAWQAEgFAHAAQAGAAADAFQADADgBAHIgEAbg");
	this.shape_13.setTransform(49.6792,74.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgHAYQgCgEAAgFIAEgXIgGAAIABgIIAHAAIABgKIAJAAIgCAKIAHAAIgBAIIgHAAIgEAXIAAABQAAABAAAAQAAABAAAAQABAAAAABQABAAABAAIADgBIgBAIIgFAAQgEAAgDgCg");
	this.shape_14.setTransform(46.575,74.5);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgLATQgEgDgCgFQgCgFABgFIAAgBQABgGADgEQADgGAEgCQAFgDAFAAQAFAAAEADQAEACACAGQACAEgBAGQAAAGgDAFQgDAFgFADQgFADgFAAQgFAAgEgDgAgGgHQgCADgBAEIAAAFQAAAEACACQACADAEAAQAEAAADgEQADgDABgHIAAgDQAAgEgCgDQgCgEgEAAQgFAAgDAHg");
	this.shape_15.setTransform(42.825,75);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgJAeIAJg7IAKAAIgKA7g");
	this.shape_16.setTransform(39.75,74.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgLATQgEgDgCgFQgCgFABgFIAAgBQABgGADgEQADgGAEgCQAFgDAFAAQAFAAAEADQAEACACAGQACAEgBAGQAAAGgDAFQgDAFgFADQgFADgFAAQgFAAgEgDgAgGgHQgCADgBAEIAAAFQAAAEACACQACADAEAAQAEAAADgEQADgDABgHIAAgDQAAgEgCgDQgCgEgEAAQgFAAgDAHg");
	this.shape_17.setTransform(36.375,75);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AAHAdIAFgZIgYAAIgEAZIgKAAIAKg5IAKAAIgFAYIAYAAIAEgYIAKAAIgKA5g");
	this.shape_18.setTransform(31.5,74.25);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FF8C2D").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_19.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


(lib.drag15G9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap152();
	this.instance.setTransform(0,-3,0.3136,0.4605);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgOATQgDgEAAgFQAAgHAGgDQAFgEAIAAIAGAAIABgCIAAgEQgBgEgFAAQgDAAgBACQgCABgBADIgJAAQAAgEADgDQACgDAEgCIAIgBQAHAAAEAEQAEAEgBAHIgDATIAAADIAAAFIAAAAIgJAAIAAgEQgGAFgFAAQgFgBgEgCgAgEADQgDACgBADQAAABAAABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQAAAAABABQAAAAABAAQABAAAAAAQADABACgCIAEgEIACgIIgFAAQgEAAgDACg");
	this.shape.setTransform(56.6778,89.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgNAVIAHgpIAIAAIgBAFQAEgGAGABIADAAIAAAJIgFAAQgGAAgDAEIgEAcg");
	this.shape_1.setTransform(53.45,89.05);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgJAZIgCAEIgIAAIALg6IAIAAIgEAVQAEgEAHAAQAGgBADAFQAEAEAAAHIAAAFQgBAHgDAFQgDAFgDADQgEACgFAAQgGAAgEgFgAgFAAIgCARQACAGAFAAQADAAADgEQAEgEABgHIAAgFQAAgDgCgCQgBgCgEgBQgFAAgEAFg");
	this.shape_2.setTransform(49.6,88.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgOATQgDgEAAgFQAAgHAGgDQAFgEAIAAIAGAAIABgCIAAgEQgBgEgFAAQgDAAgBACQgCABgBADIgJAAQAAgEADgDQACgDAEgCIAIgBQAHAAAEAEQAEAEgBAHIgDATIAAADIAAAFIAAAAIgJAAIAAgEQgGAFgFAAQgFgBgEgCgAgEADQgDACgBADQAAABAAABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQAAAAABABQAAAAABAAQABAAAAAAQADABACgCIAEgEIACgIIgFAAQgEAAgDACg");
	this.shape_3.setTransform(45.2778,89.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgLATQgEgDgBgEQgCgGABgFIAAgBQAAgGADgFQADgFAFgDQAEgCAFAAQAHAAAEAFQAEAEAAAHIgJAAQAAgDgBgDQgCgDgEABQgEAAgDAEQgDAFAAAIQgBAKAIAAQACABADgCQACgCABgEIAJAAQgBAEgCADQgDAEgEACQgEACgDAAQgGgBgEgCg");
	this.shape_4.setTransform(41.3083,89.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgNASQgEgEAAgHIAJAAQAAAEACACQACACADgBQADABACgCQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAAAQAAgEgFgCIgHgCQgIgDAAgHQAAgFAFgFQAFgDAGAAQAHAAAEADQAEAFAAAGIgJAAQAAgBAAgBQAAgBAAAAQAAgBgBAAQAAgBAAAAQgCgCgDAAQgDAAgBACQgBAAAAAAQgBABAAAAQAAABgBAAQAAABAAAAQAAAEAEACIAIACQAIADAAAGQAAAFgDADIgGAFIgIABQgHgBgFgDg");
	this.shape_5.setTransform(37.075,89.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgOASQgDgDAAgGQAAgGAGgDQAFgEAIAAIAGAAIABgCIAAgEQgBgEgFAAQgDAAgBACQgCABgBADIgJAAQAAgEADgDQACgDAEgCIAIgBQAHAAAEAEQAEAEgBAHIgDATIAAADIAAAFIAAAAIgJAAIAAgEQgGAFgFAAQgFAAgEgEgAgEADQgDACgBADQAAABAAABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQAAAAABABQAAAAABAAQABAAAAAAQADAAACgBIAEgEIACgIIgFAAQgEAAgDACg");
	this.shape_6.setTransform(63.1278,75.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgJAdIAIgpIAIAAIgHApgAABgTQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIABgEQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAABgBAAQAAAAAAABQAAAAgBABIgEABQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_7.setTransform(60.225,74.675);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgOAVIAIgpIAHAAIAAAFQAEgGAGAAIADABIgBAJIgDgBQgGABgEAEIgEAcg");
	this.shape_8.setTransform(57.9,75.45);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgOAUQgDgCgBgEQgBgDABgFIAEgbIAJAAIgEAbIAAADQAAAFAFAAQAFAAAEgFIAFgeIAJAAIgHAqIgJAAIABgEQgEAFgHAAIgHgCg");
	this.shape_9.setTransform(54.3167,75.525);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AAFAeIAFgbIAAgDQAAgEgFAAQgFgBgEAFIgFAeIgJAAIAKg7IAIAAIgDAXQAEgGAHAAQAGAAADAEQADAFgBAGIgEAbg");
	this.shape_10.setTransform(49.6792,74.6);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgHAXQgCgDAAgFIAEgXIgGAAIABgIIAHAAIABgJIAJAAIgCAJIAHAAIgBAIIgHAAIgEAWIAAACQAAABAAAAQAAABAAAAQABAAAAABQABAAABAAIADAAIgBAHIgFABQgEAAgDgEg");
	this.shape_11.setTransform(46.575,75);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgLATQgEgDgCgEQgCgGABgGIAAAAQABgGADgFQADgFAEgDQAFgCAFAAQAFAAAEADQAEADACAEQACAFgBAGQAAAGgDAGQgDAFgFACQgFADgFAAQgFgBgEgCgAgGgIQgCAEgBAEIAAAFQAAAEACADQACACAEAAQAEAAADgDQADgEABgHIAAgCQAAgFgCgEQgCgCgEAAQgFAAgDAFg");
	this.shape_12.setTransform(42.825,75.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgJAeIAJg7IAKAAIgKA7g");
	this.shape_13.setTransform(39.75,74.6);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgLATQgEgDgCgEQgCgGABgGIAAAAQABgGADgFQADgFAEgDQAFgCAFAAQAFAAAEADQAEADACAEQACAFgBAGQAAAGgDAGQgDAFgFACQgFADgFAAQgFgBgEgCgAgGgIQgCAEgBAEIAAAFQAAAEACADQACACAEAAQAEAAADgDQADgEABgHIAAgCQAAgFgCgEQgCgCgEAAQgFAAgDAFg");
	this.shape_14.setTransform(36.375,75.5);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AAHAcIAFgZIgYAAIgEAZIgKAAIAKg3IAKAAIgFAYIAYAAIAEgYIAKAAIgKA3g");
	this.shape_15.setTransform(31.5,74.75);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FF8C2D").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_16.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


(lib.drag14GJud = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgRAXQgEgFAAgGQABgIAGgEQAHgFAKABIAJAAIABgFQAAgEgCgDQgCgDgFAAQgEAAgCACQgEADgBAEIgJAAQABgFACgEQAEgEAFgCQAEgCAFAAQAJABAEAFQAFAFgBAHIgEAZIAAAEIAAAFIAAABIgJAAIAAgCIAAgDQgIAGgHAAQgHABgEgFgAgHAEQgFACAAAFQAAADACADQACACAEAAQAEABADgDQAEgCADgDIABgLIgHAAQgGAAgFADg");
	this.shape.setTransform(116.05,23.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgQAUQgGgHABgLIAAgCQABgHAEgGQAEgHAFgDQAGgDAFgBQAIABAFAFQAFAGAAAIIAAAGIgBADIghAAQgBAIADAFQADAFAHAAQAHABAGgIIAFAEQgDAFgFADQgFADgGgBQgKAAgFgHgAgFgPQgEADgCAJIAYAAIABgBQAAgGgCgFQgDgEgFAAQgFAAgEAEg");
	this.shape_1.setTransform(110.9729,23.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgUAgQgFgFAAgKIAAgGQABgJAEgFQADgGAFgEQAFgDAGAAQAIABAFAFIAFgbIAJAAIgNBKIgIAAIABgGQgGAHgJAAQgHAAgEgGgAgIgFQgEAEgCAEQgCAGAAAGQAAAIACADQADAEAFABQAHAAAGgJIAEgXQgDgHgIAAIAAAAQgFAAgDADg");
	this.shape_2.setTransform(105.8125,22.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgJAkIAJg0IAIAAIgJA0gAABgaQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQABAAAAgBQAAAAAAAAQABgBAAAAQABAAAAgBQABAAAAAAQABAAABAAIADABQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAIgDACQgBAAgBgBQAAAAgBAAQAAAAgBAAQAAgBgBAAg");
	this.shape_3.setTransform(101.75,22.15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgOAYQgFgEgCgFQgCgHAAgHQABgHAEgHQAEgGAGgEQAFgDAGgBQAHABAFAEQAFADACAGQACAGAAAHIgBAAQgBAIgEAHQgDAFgGAEQgGAEgFgBQgHABgFgEgAgHgNQgFAFgCAIIAAABIAAAHQABAFADADQADAEAFAAQADABAEgDQADgDADgEQACgEACgHIAAgGQgBgGgDgEQgDgDgFAAQgGAAgEAGg");
	this.shape_4.setTransform(97.6,23.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AAIAbIAGghIAAgFQgBgHgHAAQgHAAgGAIIgGAlIgJAAIAJg0IAIAAIgBAHQAGgIAJAAQAIABADAEQAEAGgBAJIgGAhg");
	this.shape_5.setTransform(91.9111,23.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgKAkIAJg0IAIAAIgIA0gAABgaQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQABAAAAgBQAAAAAAAAQABgBAAAAQABAAAAgBQABAAAAAAQABAAABAAIADABQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAIgDACQgBAAgBgBQAAAAgBAAQAAAAgBAAQAAgBgBAAg");
	this.shape_6.setTransform(88.35,22.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgQAbIAJg0IAHAAIAAAGQAFgHAHAAIAFABIgBAIIgFAAQgIAAgDAHIgHAlg");
	this.shape_7.setTransform(85.55,23.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgFAkQgGAAgFgDQgFgDgDgGQgDgGAAgHIAAgIIABgFQADgQAJgJQAIgJAMAAQAKAAAGAHQAGAGAAALIgJAAQAAgOgLgCIgCAAQgIAAgGAHQgHAHgBAMIgCAGIAAAFQAAAJADAFQAEAFAHABQAGAAAFgEQAFgEACgIIAJAAQgCALgIAGQgHAHgJAAIgCgBg");
	this.shape_8.setTransform(80.7375,22.2005);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgKAZQgFgCgDgFQgDgEAAgEIALAAQABAEADACQADACADAAQAFAAADgBQACgCAAgDQAAgDgCgCQgDgBgFgBIgKgEQgJgDAAgJQAAgGAGgEQAGgFAHgBQAKABAGAFQAFAEABAHIgNAAQABgDgDgCQgCgDgFAAQgDAAgCADQgCABgBADQABADACACQACABAGACIALADQAEACACADQACACAAAFQAAAGgGAFQgGAFgKgBQgFAAgFgCg");
	this.shape_9.setTransform(181.5,7.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_10.setTransform(176.275,7.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgFAlIAAhKIALAAIAABKg");
	this.shape_11.setTransform(172.275,6);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_12.setTransform(168.375,7.1);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AAOAjIgVgeIgIAJIAAAVIgMAAIAAhGIAMAAIAAAiIAHgJIAUgZIAPAAIgbAgIAcAmg");
	this.shape_13.setTransform(162.875,6.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_14.setTransform(154.075,7.05);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_15.setTransform(148.625,7.1);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AALAaIgLgjIgKAjIgKAAIgPg0IAMAAIAIAkIALgkIAIAAIAMAkIAIgkIAMAAIgPA0g");
	this.shape_16.setTransform(142.15,7.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_17.setTransform(135.825,7.1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AAKAlIAAghQAAgFgCgCQgDgCgEgBQgGAAgEAGIAAAlIgMAAIAAhKIAMAAIAAAcQAGgGAIgBQARABAAASIAAAig");
	this.shape_18.setTransform(130.325,6);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAHAAIAFABIAAALIgFgBQgIABgCAGIAAAjg");
	this.shape_19.setTransform(123.55,7.05);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_20.setTransform(118.875,7.1);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAIQAFAGAAANIAAAAQAAANgFAGQgGAIgJAAQgJAAgFgHgAgKAAIAAAVQADAIAHAAQAFgBADgEQADgEAAgJIAAgBQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_21.setTransform(113.425,6.05);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AAaAbIAAgiQAAgEgCgDQgDgCgFAAQgEAAgDACQgCADgBADIAAAjIgLAAIAAgiQAAgJgKAAQgGAAgEAGIAAAlIgLAAIAAg0IAKAAIABAGQAFgHALAAQAJAAAEAJQAFgJALAAQAJAAAEAFQAEAFAAAJIAAAig");
	this.shape_22.setTransform(106.15,7.05);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_23.setTransform(99.125,7.1);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgLAjQgFgCgDgEIAFgHQAGAGAIAAQAFAAADgDQADgDAAgHIAAgDQgFAGgHgBQgJABgGgIQgGgHAAgNQAAgMAGgHQAFgIAKAAQAIAAAFAHIABgGIAKAAIAAAzQAAAKgGAHQgHAFgKABQgFAAgGgDgAgHgWQgDAFAAAIQAAAJADAEQADAEAFAAQAHAAADgGIAAgXQgDgFgHgBQgFAAgDAFg");
	this.shape_24.setTransform(93.475,8.1);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AAKAlIAAghQAAgFgCgCQgDgCgEgBQgGAAgEAGIAAAlIgMAAIAAhKIAMAAIAAAcQAGgGAIgBQARABAAASIAAAig");
	this.shape_25.setTransform(85.475,6);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgRAUQgGgHAAgNIAAAAQAAgHACgGQAEgHAFgDQAGgEAGAAQAKABAIAGQAGAIAAALIAAABQAAAJgDAGQgDAFgFAEQgGADgHAAQgKABgHgIgAgIgMQgEAFAAAHQAAAJAEAFQADAEAFAAQAGAAAEgEQACgFAAgJQAAgHgDgFQgDgFgGAAQgFAAgDAFg");
	this.shape_26.setTransform(79.85,7.1);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgGASIAAgdIgIAAIAAgJIAIAAIAAgMIAMAAIAAAMIAJAAIAAAJIgJAAIAAAdIABAEIAEABIAEAAIAAAJIgHABQgOAAAAgPg");
	this.shape_27.setTransform(75.2,6.525);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_28.setTransform(70.875,7.05);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgRAUQgGgHAAgNIAAAAQAAgHACgGQADgHAGgDQAFgEAHAAQALABAGAGQAHAIAAALIAAABQAAAJgCAGQgDAFgGAEQgFADgIAAQgKABgHgIgAgJgMQgDAFAAAHQAAAJADAFQAEAEAFAAQAGAAAEgEQADgFAAgJQgBgHgDgFQgDgFgGAAQgFAAgEAFg");
	this.shape_29.setTransform(65.25,7.1);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgNIAAAAQAAgMAHgHQAGgIAKAAQAKAAAGAGQAFAGABAJIgLAAQgBgFgDgDQgCgDgFAAQgFAAgDAFQgDADAAAJIAAABQAAAJADAEQADAEAFAAQAEAAADgDQADgCABgEIALAAQAAAFgDAEQgDAEgFADQgFACgGAAQgKAAgGgGg");
	this.shape_30.setTransform(59.875,7.1);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_31.setTransform(52.025,7.1);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_32.setTransform(46.575,8.075);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_33.setTransform(40.975,7.1);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgNAbIAAg0IAMAAIAAAGQADgHAIAAIAEABIgBALIgEgBQgIABgCAGIAAAjg");
	this.shape_34.setTransform(36.75,7.05);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_35.setTransform(32.125,7.1);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAIQAFAGAAANIAAAAQAAANgFAGQgGAIgJAAQgJAAgFgHgAgKAAIAAAVQADAIAHAAQAFgBADgEQADgEAAgJIAAgBQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_36.setTransform(26.675,6.05);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_37.setTransform(21.125,7.1);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgZAjIAAhGIAZAAQALAAAHAFQAGAFAAAKQAAAEgDAFQgCADgFACQAFABAEAFQADAEAAAGQgBAKgGAFQgHAGgMgBgAgMAZIANAAQAFABAEgDQADgDAAgFQAAgMgLABIgOAAgAgMgEIAMAAQAFgBADgCQAEgDgBgEQAAgGgDgCQgCgCgGAAIgMAAg");
	this.shape_38.setTransform(15.35,6.2);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFE319").s().p("AvSikIelgJIAAFRI+lAKg");
	this.shape_39.setTransform(98.125,14.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0.3,-3.1,195.7,34.8);


(lib.drag14G11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap148();
	this.instance.setTransform(0,-3,0.4615,0.4828);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgNASQgEgEAAgHIAJAAQAAAEACACQACABADABQADgBACgBQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAgBQAAgEgFgBIgHgDQgIgCAAgHQAAgGAFgEQAFgDAGAAQAHAAAEADQAEAEAAAGIgJAAQAAAAAAgBQAAgBAAAAQAAgBgBAAQAAgBAAAAQgCgCgDAAQgDAAgBACQgBAAAAAAQgBABAAAAQAAABgBAAQAAABAAAAQAAAEAEACIAIACQAIADAAAGQAAAFgDADIgGAEQgFACgDAAQgHgBgFgDg");
	this.shape.setTransform(60.075,88.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgOAUQgDgCgBgEQgBgDABgFIAEgbIAJAAIgEAbIAAADQAAAFAFAAQAFAAAEgFIAFgeIAJAAIgHAqIgJAAIABgEQgEAFgHAAIgHgCg");
	this.shape_1.setTransform(56.0667,88.375);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgHAXQgCgDAAgFIAEgXIgGAAIABgHIAHAAIABgKIAJAAIgCAKIAHAAIgBAHIgHAAIgEAWIAAACQAAABAAAAQAAABAAAAQABAAAAABQABAAABAAIADAAIgBAHIgFABQgEgBgDgDg");
	this.shape_2.setTransform(52.675,87.85);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgOASQgDgDAAgGQAAgGAGgDQAFgEAIAAIAGAAIABgDIAAgDQgBgDgFgBQgDAAgBACQgCABgBADIgJAAQAAgEADgDQACgDAEgBIAIgCQAHAAAEAEQAEAEgBAGIgDAUIAAADIAAAEIAAABIgJAAIAAgEQgGAFgFAAQgFgBgEgDgAgEADQgDACgBADQAAABAAABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQAAAAABABQAAAAABAAQABAAAAAAQADAAACgBIAEgEIACgIIgFAAQgEAAgDACg");
	this.shape_3.setTransform(48.9278,88.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AAFAVIAFgaIAAgDQAAgEgFgBQgFAAgEAGIgFAcIgJAAIAHgpIAJAAIgBAFQAEgFAHgBQAGAAADAFQADAEgBAHIgEAag");
	this.shape_4.setTransform(44.5875,88.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AAFAVIAFgaIAAgDQAAgEgFgBQgFAAgEAGIgFAcIgJAAIAHgpIAJAAIgBAFQAEgFAHgBQAGAAADAFQADAEgBAHIgEAag");
	this.shape_5.setTransform(40.2375,88.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgJAdIAIgpIAIAAIgHApgAABgTQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIABgEQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAABAAQAAAAAAABQABAAAAAAQABABAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAABgBAAQAAABAAAAQAAAAgBABIgEABQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_6.setTransform(37.325,87.525);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgUAeIAKg6IAIAAIgBAEQAEgFAHAAQAEAAADACQADACACAEQABAEAAAFIAAAFQgBAHgCAEQgDAFgEADQgEACgFAAQgGAAgDgFIgEAVgAgDgQIgDASQABAEAFAAQAEABAEgEQADgDABgIIAAgCQAAgFgCgDQgBgDgEAAQgFAAgDAFg");
	this.shape_7.setTransform(33.775,89.125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgNASQgEgEAAgGIAJAAQAAADACACQACACADAAQADAAACgCQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAgBQAAgDgFgCIgHgDQgIgCAAgHQAAgGAFgDQAFgEAGAAQAHAAAEAEQAEAEAAAFIgJAAQAAAAAAgBQAAgBAAAAQAAgBgBAAQAAgBAAAAQgCgCgDAAQgDAAgBACQgBAAAAAAQgBABAAAAQAAABgBAAQAAABAAAAQAAAEAEACIAIACQAIADAAAGQAAAFgDADIgGAEIgIACQgHAAgFgEg");
	this.shape_8.setTransform(63.725,74.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgOAUQgDgCgBgEQgBgDABgFIAEgbIAJAAIgEAbIAAADQAAAFAFAAQAFAAAEgFIAFgeIAJAAIgHAqIgJAAIABgEQgEAFgHAAIgHgCg");
	this.shape_9.setTransform(59.7167,74.775);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AAFAWIAFgbIAAgDQAAgEgFgBQgFAAgEAGIgFAdIgJAAIAHgqIAJAAIgBAFQAEgFAHgBQAGAAADAFQADAEgBAHIgEAbg");
	this.shape_10.setTransform(55.0875,74.7);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgJAdIAIgpIAIAAIgHApgAABgTQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIABgEQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAABAAQAAAAAAABQABAAAAAAQABABAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAABgBAAQAAABAAAAQAAAAgBABIgEABQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_11.setTransform(52.175,73.925);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgNAWIAHgqIAIAAIgBAFQAEgFAGgBIADABIAAAJIgFgBQgGAAgDAGIgEAcg");
	this.shape_12.setTransform(49.85,74.7);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgLATQgEgDgBgFQgCgEABgHIAAAAQAAgGADgFQADgFAFgCQAEgDAFAAQAHAAAEAEQAEAFAAAHIgJAAQAAgDgBgDQgCgDgEAAQgEAAgDAFQgDAFAAAHQgBALAIAAQACABADgDQACgBABgEIAJAAQgBAEgCAEQgDADgEACQgEACgDAAQgGAAgEgDg");
	this.shape_13.setTransform(46.3583,74.75);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgLATQgEgDgCgFQgCgEABgHIAAAAQABgFADgFQADgGAEgCQAFgDAFAAQAFAAAEADQAEADACAFQACAFgBAFQAAAGgDAFQgDAFgFADQgFADgFAAQgFAAgEgDgAgGgIQgCAEgBAEIAAAFQAAAEACACQACADAEAAQAEABADgFQADgDABgHIAAgCQAAgGgCgCQgCgDgEgBQgFABgDAFg");
	this.shape_14.setTransform(41.975,74.75);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgJAeIAKg7IAJAAIgKA7g");
	this.shape_15.setTransform(38.9,73.85);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgJAdIAIgpIAIAAIgHApgAABgTQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIABgEQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAABAAQAAAAAAABQABAAAAAAQABABAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAABgBAAQAAABAAAAQAAAAgBABIgEABQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_16.setTransform(36.875,73.925);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgHAXQgCgDAAgFIAEgXIgGAAIABgHIAHAAIABgKIAJAAIgCAKIAHAAIgBAHIgHAAIgEAWIAAACQAAABAAAAQAAABAAAAQABAAAAABQABAAABAAIADAAIgBAHIgFAAQgEAAgDgDg");
	this.shape_17.setTransform(34.675,74.25);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgXAdIAKg4IASAAQAJAAAFAEQAFAFAAAJQgBAIgGAEQgGAEgKABIgLAAIgEAVgAgJAAIALAAQAFAAADgCQADgDABgEQABgFgDgCQgCgDgEgBIgLAAg");
	this.shape_18.setTransform(30.7523,74);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FF8C2D").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_19.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


(lib.drag14G10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap147();
	this.instance.setTransform(0,-3,0.6294,0.5147);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgNASQgEgEAAgHIAJAAQAAAEACACQACABADABQADgBACgBQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAgBQAAgEgFgBIgHgDQgIgCAAgHQAAgFAFgFQAFgDAGAAQAHAAAEADQAEAFAAAFIgJAAQAAAAAAgBQAAgBAAAAQAAgBgBAAQAAgBAAAAQgCgCgDAAQgDAAgBACQgBAAAAAAQgBABAAAAQAAABgBAAQAAABAAAAQAAAEAEACIAIACQAIADAAAGQAAAFgDADIgGAFIgIABQgHgBgFgDg");
	this.shape.setTransform(62.725,87.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgOAUQgDgCgBgEQgBgDABgFIAEgbIAJAAIgEAbIAAADQAAAFAFAAQAFAAAEgFIAFgeIAJAAIgHAqIgJAAIABgEQgEAFgHAAIgHgCg");
	this.shape_1.setTransform(58.7167,87.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgHAXQgCgDAAgFIAEgXIgGAAIABgHIAHAAIABgKIAJAAIgCAKIAHAAIgBAHIgHAAIgEAWIAAACQAAABAAAAQAAABAAAAQABAAAAABQABAAABAAIADAAIgBAHIgFABQgEAAgDgEg");
	this.shape_2.setTransform(55.325,87.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgUAeIAKg6IAIAAIgBAEQAEgFAHAAQAEAAADACQADACACAEQABAEAAAFIAAAFQgBAHgCAEQgDAFgEADQgEACgFAAQgGAAgDgFIgEAVgAgDgQIgDASQABAEAFAAQAEABAEgEQADgDABgIIAAgCQAAgFgCgDQgBgDgEAAQgFAAgDAFg");
	this.shape_3.setTransform(51.375,88.325);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgOAUQgDgCgBgEQgBgDABgFIAEgbIAJAAIgEAbIAAADQAAAFAFAAQAFAAAEgFIAFgeIAJAAIgHAqIgJAAIABgEQgEAFgHAAIgHgCg");
	this.shape_4.setTransform(47.3667,87.575);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgOAVIAIgpIAIAAIgBAFQAEgGAGAAIADABIgBAJIgDgBQgHABgDAFIgEAbg");
	this.shape_5.setTransform(43.85,87.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgKATQgEgCgCgFQgCgFABgGIAAgBQAAgGADgEQADgGAFgDQAFgCAEAAQAIAAAEAGQAEAFgBAKIgBADIgZAAQgBAFADADQACADAEAAQAFAAAFgFIAFAFIgHAGQgEACgEAAQgGgBgEgCgAgIgDIARAAIAAgBIAAgEQAAAAAAgBQAAAAAAgBQgBAAAAgBQgBAAAAAAQAAgBgBAAQAAgBgBAAQAAAAgBAAQgBAAgBAAQgGAAgEAKg");
	this.shape_6.setTransform(40.255,87.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgHAXQgCgDAAgFIAEgXIgGAAIABgHIAHAAIABgKIAJAAIgCAKIAHAAIgBAHIgHAAIgEAWIAAACQAAABAAAAQAAABAAAAQABAAAAABQABAAABAAIADAAIgBAHIgFABQgEAAgDgEg");
	this.shape_7.setTransform(37.025,87.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AAFAVIAFgaIAAgDQAAgEgFgBQgFAAgEAGIgFAcIgJAAIAHgpIAJAAIgBAFQAEgGAHAAQAGAAADAFQADAEgBAHIgEAag");
	this.shape_8.setTransform(33.1875,87.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgJAdIAIgpIAIAAIgHApgAABgTQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIABgEQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAABgBAAQAAABAAAAQAAAAgBABIgEABQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_9.setTransform(30.275,86.725);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgNASQgEgEAAgHIAJAAQAAAEACACQACABADABQADgBACgBQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAgBQAAgEgFgBIgHgDQgIgCAAgHQAAgGAFgEQAFgDAGAAQAHAAAEADQAEAEAAAGIgJAAQAAAAAAgBQAAgBAAAAQAAgBgBAAQAAgBAAAAQgCgCgDAAQgDAAgBACQgBAAAAAAQgBABAAAAQAAABgBAAQAAABAAAAQAAAEAEACIAIACQAIADAAAGQAAAFgDADIgGAEQgFACgDAAQgHgBgFgDg");
	this.shape_10.setTransform(64.675,73.95);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgOAUQgDgCgBgEQgBgDABgFIAEgbIAJAAIgEAbIAAADQAAAFAFAAQAFAAAEgFIAFgeIAJAAIgHAqIgJAAIABgEQgEAFgHAAIgHgCg");
	this.shape_11.setTransform(60.6667,73.975);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AAFAVIAFgaIAAgDQAAgEgFgBQgFAAgEAGIgFAcIgJAAIAHgpIAJAAIgBAFQAEgFAHgBQAGAAADAFQADAEgBAHIgEAag");
	this.shape_12.setTransform(56.0375,73.9);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgJAdIAIgpIAIAAIgHApgAABgTQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIABgEQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAABgBAAQAAABAAAAQAAAAgBABIgEABQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_13.setTransform(53.125,73.125);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgOAVIAIgpIAHAAIAAAFQAEgFAGgBIAEABIgCAJIgDgBQgGAAgEAGIgEAbg");
	this.shape_14.setTransform(50.8,73.9);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgLATQgEgDgBgFQgCgEABgHIAAAAQAAgGADgFQADgFAFgDQAEgCAFAAQAHAAAEAEQAEAFAAAHIgJAAQAAgDgBgDQgCgCgEAAQgEgBgDAFQgDAFAAAIQgBAKAIAAQACAAADgBQACgDABgDIAJAAQgBAEgCAEQgDADgEACQgEACgDAAQgGgBgEgCg");
	this.shape_15.setTransform(47.3083,73.95);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgOASQgDgDAAgGQAAgGAGgDQAFgEAIAAIAGAAIABgDIAAgCQgBgEgFgBQgDAAgBACQgCABgBADIgJAAQAAgEADgDQACgDAEgBIAIgCQAHAAAEAEQAEAEgBAGIgDAUIAAADIAAAEIAAABIgJAAIAAgEQgGAFgFAAQgFgBgEgDgAgEADQgDACgBADQAAABAAABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQAAAAABABQAAAAABAAQABAAAAAAQADAAACgBIAEgEIACgIIgFAAQgEAAgDACg");
	this.shape_16.setTransform(42.9278,73.95);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgHAXQgCgDAAgFIAEgXIgGAAIABgHIAHAAIABgKIAJAAIgCAKIAHAAIgBAHIgHAAIgEAWIAAACQAAABAAAAQAAABAAAAQABAAAAABQABAAABAAIADAAIgBAHIgFABQgEgBgDgDg");
	this.shape_17.setTransform(39.825,73.45);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgKATQgEgCgCgGQgCgEABgGIAAgBQAAgGADgEQADgGAFgDQAFgCAEAAQAIAAAEAGQAEAFgBAKIgBADIgZAAQgBAFADADQACADAEAAQAFAAAFgFIAFAFIgHAGQgEACgEAAQgGgBgEgCgAgIgDIARAAIAAgBIAAgEQAAAAAAgBQAAAAAAgBQgBAAAAgBQgBAAAAAAQAAgBgBAAQAAgBgBAAQAAAAgBAAQgBAAgBAAQgGgBgEALg");
	this.shape_18.setTransform(36.255,73.95);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AAOAcIADgTIAFgXIgWAqIgHAAIgJgrIgDAaIgEARIgJAAIAKg3IAMAAIAIAqIAXgqIAMAAIgKA3g");
	this.shape_19.setTransform(30.775,73.2);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FF8C2D").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_20.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


(lib.drag14G9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap146();
	this.instance.setTransform(0,-3,0.4018,0.5147);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgUAeIAKg6IAIAAIgBAEQAEgFAHAAQAEAAADACQADACACAEQABAEAAAFIAAAFQgBAHgCAEQgDAFgEADQgEACgFAAQgGAAgDgFIgEAVgAgDgQIgDASQABAEAFAAQAEABAEgEQADgDABgIIAAgCQAAgFgCgDQgBgDgEAAQgFAAgDAFg");
	this.shape.setTransform(66.725,80.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgNASQgEgEAAgGIAJAAQAAADACACQACACADAAQADAAACgCQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAgBQAAgDgFgCIgHgDQgIgCAAgHQAAgGAFgEQAFgDAGAAQAHAAAEADQAEAFAAAFIgJAAQAAAAAAgBQAAgBAAAAQAAgBgBAAQAAgBAAAAQgCgCgDAAQgDAAgBACQgBAAAAAAQgBABAAAAQAAABgBAAQAAABAAAAQAAAEAEACIAIACQAIADAAAGQAAAFgDADIgGAEIgIACQgHAAgFgEg");
	this.shape_1.setTransform(62.675,79.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AAFAWIAFgbIAAgDQAAgFgFAAQgFAAgEAGIgFAdIgJAAIAHgqIAJAAIgBAFQAEgFAHgBQAGAAADAFQADAEgBAHIgEAbg");
	this.shape_2.setTransform(56.4375,79.65);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgLATQgEgDgCgFQgCgEABgHIAAAAQABgFADgFQADgGAEgCQAFgDAFAAQAFAAAEADQAEADACAFQACAFgBAFQAAAGgDAFQgDAFgFADQgFADgFAAQgFAAgEgDgAgGgIQgCAEgBAEIAAAFQAAAEACACQACADAEAAQAEABADgFQADgDABgHIAAgCQAAgGgCgCQgCgDgEgBQgFABgDAFg");
	this.shape_3.setTransform(52.175,79.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgQAaQgEgEgBgIIAAgFIAAAAQACgHACgFQADgEAEgDQAEgCAFgBQAGABADAEIAEgWIAJAAIgKA8IgJAAIABgFQgEAFgGABQgGgBgDgEgAgIAAQgDADgBAJQAAAFACADQACACADAAQAFAAADgEIAEgSQgCgFgFAAQgEAAgEAFg");
	this.shape_4.setTransform(48,78.85);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AAFAWIAFgbIAAgDQAAgFgFAAQgFAAgEAGIgFAdIgJAAIAHgqIAJAAIgBAFQAEgFAHgBQAGAAADAFQADAEgBAHIgEAbg");
	this.shape_5.setTransform(43.2375,79.65);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgKATQgEgDgCgFQgCgEABgGIAAgBQAAgGADgEQADgGAFgCQAFgDAEAAQAIAAAEAGQAEAGgBAJIgBADIgZAAQgBAFADADQACADAEAAQAFAAAFgFIAFAFIgHAGQgEACgEAAQgGAAgEgDgAgIgDIARAAIAAgBIAAgEQAAAAAAgBQAAAAAAgBQgBAAAAgBQgBAAAAAAQAAgBgBAAQAAgBgBAAQAAAAgBAAQgBgBgBAAQgGAAgEALg");
	this.shape_6.setTransform(39.155,79.7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgHAXQgCgDAAgFIAEgXIgGAAIABgHIAHAAIABgKIAJAAIgCAKIAHAAIgBAHIgHAAIgEAWIAAACQAAABAAAAQAAABABAAQAAAAAAABQABAAABAAIADAAIgBAHIgFAAQgEAAgDgDg");
	this.shape_7.setTransform(35.925,79.2);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AAFAWIAFgbIAAgDQAAgFgFAAQgFAAgEAGIgFAdIgJAAIAHgqIAJAAIgBAFQAEgFAHgBQAGAAADAFQADAEgBAHIgEAbg");
	this.shape_8.setTransform(32.0875,79.65);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AAPAdIgCgOIgUAAIgHAOIgKAAIAdg4IAJAAIALA4gAgDAIIAPAAIgEgXg");
	this.shape_9.setTransform(27.075,78.95);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FF8C2D").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_10.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


(lib.drag14G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgFQgDgEAAgEIALAAQABAEADACQADACADAAQAFAAADgBQACgCAAgDQAAgDgCgCQgDgCgFAAIgKgEQgJgDAAgJQAAgGAGgEQAGgFAHgBQAKABAGAFQAFAEABAHIgNAAQABgDgDgCQgCgDgFAAQgDAAgCADQgCABgBADQABADACACQACABAGACIALADQAEACACADQACACAAAFQAAAGgGAFQgGAFgKgBQgFAAgFgCg");
	this.shape.setTransform(76.65,40.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgJIAAgiIAMAAIAAAiQAAAKAIAAQAIgBADgGIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_1.setTransform(71.325,40.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgFQgDgEAAgEIALAAQABAEADACQADACADAAQAFAAADgBQACgCAAgDQAAgDgDgCQgCgCgFAAIgKgEQgJgDAAgJQAAgGAGgEQAGgFAHgBQAKABAFAFQAGAEABAHIgNAAQAAgDgCgCQgDgDgEAAQgDAAgCADQgDABAAADQAAADADACQACABAGACIALADQAEACACADQACACAAAFQAAAGgGAFQgGAFgKgBQgFAAgFgCg");
	this.shape_2.setTransform(65.95,40.85);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgJIAAgiIAMAAIAAAiQAAAKAIAAQAIgBADgGIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_3.setTransform(60.625,40.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgLAjQgFgCgDgEIAFgHQAGAGAIAAQAFAAADgDQADgDAAgHIAAgDQgFAGgHgBQgJABgGgIQgGgHAAgNQAAgMAGgHQAFgIAKAAQAIAAAFAHIABgGIAKAAIAAAzQAAAKgGAGQgHAGgKABQgFAAgGgDgAgHgWQgDAFAAAIQAAAJADAEQADAEAFAAQAHAAADgGIAAgXQgDgFgHgBQgFAAgDAFg");
	this.shape_4.setTransform(52.425,41.85);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_5.setTransform(46.925,40.8);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAXQAAAIACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_6.setTransform(41.475,40.85);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAKAlIgPgWIgFAFIAAARIgMAAIAAhKIAMAAIAAArIADgFIAOgQIAOAAIgTAWIAVAeg");
	this.shape_7.setTransform(36.475,39.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAXQAAAIACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_8.setTransform(30.875,40.85);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgFAlIAAhKIALAAIAABKg");
	this.shape_9.setTransform(26.875,39.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_10.setTransform(22.975,40.85);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAIQAFAGAAANIAAAAQAAANgFAGQgGAIgJAAQgJAAgFgHgAgKAAIAAAVQADAIAHAAQAFgBADgEQADgEAAgIIAAgCQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_11.setTransform(17.525,39.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_12.setTransform(154.875,24.8);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAIACADIAAACIgNAAIgBgGQgGAGgHABQgIAAgFgFgAgHAEQgDACAAAFQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFgBgEADg");
	this.shape_13.setTransform(149.425,24.85);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgCACgBQADABACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_14.setTransform(145.425,23.85);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgLAjQgFgDgDgDIAFgIQAGAHAIAAQAFAAADgDQADgDAAgHIAAgDQgFAGgHAAQgJAAgGgIQgGgHAAgMQAAgNAGgHQAFgIAKABQAIgBAFAHIABgFIAKAAIAAAyQAAALgGAFQgHAHgKAAQgFgBgGgCgAgHgWQgDAEAAAKQAAAHADAEQADAFAFAAQAHAAADgGIAAgXQgDgFgHAAQgFgBgDAFg");
	this.shape_15.setTransform(141.225,25.85);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAIACADIAAACIgNAAIgBgGQgGAGgHABQgIAAgFgFgAgHAEQgDACAAAFQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFgBgEADg");
	this.shape_16.setTransform(135.825,24.85);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAIQAFAGAAAMIAAABQAAANgFAGQgGAIgJAAQgJAAgFgHgAgKAAIAAAVQADAIAHgBQAFAAADgEQADgEAAgJIAAgBQAAgJgDgDQgDgEgFAAQgHAAgDAGg");
	this.shape_17.setTransform(130.375,23.8);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgGAFgEQAGgDAGAAQALAAAFAGQAGAIAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgGIAGAGQgDAFgFACQgFADgHAAQgKgBgHgGgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_18.setTransform(108.825,24.85);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAKAmIgPgXIgFAGIAAARIgMAAIAAhLIAMAAIAAArIADgFIAOgPIAOAAIgTAUIAVAgg");
	this.shape_19.setTransform(103.825,23.75);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgEQgDgEAAgFIAMAAQAAAEADACQADADADAAQAFAAADgCQACgCAAgDQAAgDgCgCQgDgCgFgBIgKgDQgJgDAAgJQAAgGAFgFQAGgEAIAAQAKAAAGAEQAFAFAAAHIgLAAQgBgDgCgCQgDgCgEAAQgCAAgDACQgCABgBADQABADACACQACABAGABIALAEQAEABACADQACAEAAAEQAAAGgGAFQgGAFgKAAQgFAAgFgDg");
	this.shape_20.setTransform(82.3,24.85);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgKIAAghIAMAAIAAAhQAAALAIgBQAIAAADgGIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_21.setTransform(76.975,24.9);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_22.setTransform(71.425,24.8);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAIACADIAAACIgNAAIgBgGQgGAGgHABQgIAAgFgFgAgHAEQgDACAAAFQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFgBgEADg");
	this.shape_23.setTransform(65.975,24.85);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgCACgBQADABACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_24.setTransform(45.975,23.85);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgKIAAghIAMAAIAAAhQAAALAIgBQAIAAADgGIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_25.setTransform(41.925,24.9);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgFAmIAAhLIALAAIAABLg");
	this.shape_26.setTransform(37.875,23.75);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAIACADIAAACIgNAAIgBgGQgGAGgHABQgIAAgFgFgAgHAEQgDACAAAFQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFgBgEADg");
	this.shape_27.setTransform(33.925,24.85);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgFAmIAAhLIALAAIAABLg");
	this.shape_28.setTransform(29.925,23.75);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgGAFgEQAGgDAGAAQALAAAFAGQAGAIAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgGIAGAGQgDAFgFACQgFADgHAAQgKgBgHgGgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_29.setTransform(26.025,24.85);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AAaAbIAAgiQAAgEgCgDQgDgCgFAAQgEAAgDACQgCACgBAEIAAAjIgLAAIAAgiQAAgJgKAAQgHAAgDAGIAAAlIgLAAIAAg0IAKAAIABAGQAFgHALAAQAJAAAEAIQAFgIALAAQAJAAAEAFQAFAFgBAJIAAAig");
	this.shape_30.setTransform(18.95,24.8);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IAMAAIAAAGQADgHAHAAIAFABIAAALIgFAAQgIgBgCAHIAAAjg");
	this.shape_31.setTransform(156.2,8.8);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_32.setTransform(152.925,7.85);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgJIgHAAQgFAAgEACg");
	this.shape_33.setTransform(148.975,8.85);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgFASIAAgdIgJAAIAAgJIAJAAIAAgMIAKAAIAAAMIAKAAIAAAJIgKAAIAAAdIABAEIAFABIAEAAIAAAJIgIABQgMAAAAgPg");
	this.shape_34.setTransform(140.3,8.275);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgRAUQgGgIAAgMIAAAAQAAgHACgHQADgFAGgEQAFgEAHABQALgBAGAIQAHAGAAAMIAAACQAAAHgCAGQgDAHgGADQgFADgIABQgKgBgHgHgAgJgMQgDAEAAAJQAAAIADAEQAEAFAFAAQAGAAAEgFQADgFAAgIQgBgIgDgEQgDgFgGAAQgFAAgEAFg");
	this.shape_35.setTransform(135.9,8.85);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgRAfQgFgIAAgNQAAgLAFgIQAGgHAKAAQAHAAAFAGIAAgbIAMAAIAABKIgLAAIAAgFQgGAGgHAAQgJAAgHgHgAgHgBQgEADABAJQgBAJAEAEQADAFAEgBQAIABADgHIAAgWQgDgGgIAAQgEAAgDAFg");
	this.shape_36.setTransform(130.1,7.8);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgMIAAgCQAAgHADgGQADgHAFgDQAGgEAGABQALgBAFAIQAGAGAAANIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgGgDgDQgCgDgFAAQgEAAgDADg");
	this.shape_37.setTransform(124.775,8.85);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgSAkIAAgJIACAAQAEAAADgBIADgGIACgFIgTgzIANAAIAKAkIALgkIANAAIgVA8QgEANgMAAIgFgBg");
	this.shape_38.setTransform(119.625,9.925);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_39.setTransform(114.425,8.8);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgMIAAgCQAAgHADgGQADgHAFgDQAGgEAGABQALgBAFAIQAGAGAAANIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgGgDgDQgCgDgFAAQgEAAgDADg");
	this.shape_40.setTransform(109.025,8.85);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AAZAbIAAgiQAAgEgBgCQgDgDgFAAQgEAAgDACQgCADgBADIAAAjIgLAAIAAgiQAAgJgJAAQgHAAgEAGIAAAlIgMAAIAAg0IALAAIABAFQAFgGAKAAQAKAAAEAIQAGgIAKAAQAJAAAEAFQAFAFgBAJIAAAig");
	this.shape_41.setTransform(101.95,8.8);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_42.setTransform(92.175,7.85);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_43.setTransform(88.125,8.8);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_44.setTransform(84.075,7.85);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_45.setTransform(75.875,8.8);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgJIgHAAQgFAAgEACg");
	this.shape_46.setTransform(70.425,8.85);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AALAbIgLgkIgKAkIgKAAIgPg0IAMAAIAIAjIAMgjIAIAAIALAjIAIgjIALAAIgOA0g");
	this.shape_47.setTransform(63.95,8.85);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgMIAAgCQAAgHADgGQADgHAFgDQAGgEAGABQALgBAFAIQAGAGAAANIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgGgDgDQgCgDgFAAQgEAAgDADg");
	this.shape_48.setTransform(57.625,8.85);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AAKAmIAAgjQAAgEgCgDQgDgBgEAAQgGAAgEAFIAAAmIgMAAIAAhLIAMAAIAAAdQAGgIAIABQARAAAAASIAAAjg");
	this.shape_49.setTransform(52.125,7.75);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_50.setTransform(42.425,8.8);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgJIgHAAQgFAAgEACg");
	this.shape_51.setTransform(36.975,8.85);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgKIAAghIAMAAIAAAhQAAAKAIAAQAIABADgHIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_52.setTransform(31.475,8.9);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgKAuIAAgJIAEAAQAGAAAAgGIAAg5IALAAIAAA4QAAAJgEAEQgEAEgHAAIgGgBgAAAgjQAAgBAAAAQgBgBAAAAQAAgBAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABAAQAAgBAAAAQABgCAEAAQAAAAABAAQABAAAAAAQABABAAAAQABAAAAABQABAAAAABQAAAAABABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAABQgBAAAAABQAAAAgBABQAAAAgBAAQAAABgBAAQAAAAgBAAQgBAAAAAAQgEAAgBgBg");
	this.shape_53.setTransform(26.975,8.925);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgKIAAghIAMAAIAAAhQAAAKAIAAQAIABADgHIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_54.setTransform(23.425,8.9);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgFAkIAAg8IgWAAIAAgKIA3AAIAAAKIgWAAIAAA8g");
	this.shape_55.setTransform(17.625,7.95);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FF8C2D").s().p("AtPknIafgQIAAJeI6fARg");
	this.shape_56.setTransform(86.175,25.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1.4,-6.1,169.6,62.4);


(lib.drag14G4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgEQgDgFAAgEIAMAAQAAAEADADQADACAEAAQAEgBADgBQACgCAAgDQAAgDgCgBQgDgDgFgBIgKgDQgJgDAAgJQAAgGAFgFQAHgEAIAAQAJAAAGAEQAFAFAAAIIgLAAQgBgEgCgCQgDgCgDAAQgDAAgDACQgDABABADQgBADADACQACABAGABIALAEQAEABACADQACADAAAEQAAAHgGAFQgGAEgJABQgGgBgFgCg");
	this.shape.setTransform(21.45,14.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgKIAAghIAMAAIAAAhQAAALAIgBQAIAAADgGIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_1.setTransform(16.125,14.65);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgEQgDgFAAgEIAMAAQAAAEADADQADACAEAAQAEgBADgBQACgCAAgDQAAgDgCgBQgDgDgFgBIgKgDQgJgDAAgJQAAgGAFgFQAGgEAJAAQAJAAAGAEQAFAFAAAIIgMAAQAAgEgCgCQgDgCgDAAQgDAAgDACQgCABgBADQABADACACQACABAGABIALAEQAEABACADQACADAAAEQAAAHgGAFQgGAEgJABQgGgBgFgCg");
	this.shape_2.setTransform(10.75,14.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgKIAAghIAMAAIAAAhQAAALAIgBQAIAAADgGIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_3.setTransform(5.425,14.65);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgBQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_4.setTransform(-2.625,14.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgHQAAgIAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgCACgDIAAgJIgHAAQgFgBgEADg");
	this.shape_5.setTransform(-8.075,14.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgQAeQgGgHAAgNQAAgLAGgIQAFgHAJAAQAIAAAFAGIAAgbIAMAAIAABKIgLAAIAAgFQgGAGgIAAQgIAAgGgIgAgHgBQgEADAAAJQAAAIAEAFQADAFAFgBQAHAAADgGIAAgWQgDgGgHAAQgFAAgDAFg");
	this.shape_6.setTransform(-13.75,13.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgHAKIAEgIIABgFIAAgKIAKAAIAAAJQAAAEgDAFQgCAFgDAEg");
	this.shape_7.setTransform(69.675,1.475);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgFASIAAgdIgJAAIAAgJIAJAAIAAgMIAKAAIAAAMIAKAAIAAAJIgKAAIAAAdIABAEIAFABIAEAAIAAAJIgIABQgMAAAAgPg");
	this.shape_8.setTransform(66.95,-1.975);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgKIAAghIAMAAIAAAhQAAAKAIAAQAIABADgHIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_9.setTransform(62.625,-1.35);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IAMAAIAAAGQADgHAIAAIAEABIgBALIgEAAQgIgBgCAHIAAAjg");
	this.shape_10.setTransform(58.35,-1.45);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgDAGAAQALgBAFAIQAGAGAAANIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_11.setTransform(53.725,-1.4);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_12.setTransform(48.275,-0.425);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgHAKIAEgIIABgFIAAgKIAKAAIAAAJQAAAEgDAFQgCAFgDAEg");
	this.shape_13.setTransform(41.575,1.475);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgFQgDgDAAgFIALAAQABAEADADQADABADAAQAFAAADgBQACgCAAgDQAAgDgDgBQgCgCgFgCIgKgDQgJgDAAgIQAAgHAGgFQAGgEAHAAQAKAAAFAEQAGAFABAIIgNAAQAAgEgCgCQgDgDgEABQgDAAgCABQgDACAAADQAAADADABQACACAGABIALAEQAEACACACQACAEAAADQAAAIgGAEQgGAEgKABQgFgBgFgCg");
	this.shape_14.setTransform(38.05,-1.4);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgFAlIAAg1IALAAIAAA1gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_15.setTransform(34.225,-2.4);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgLAjQgFgCgDgFIAFgHQAGAHAIAAQAFAAADgDQADgEAAgFIAAgEQgFAFgHABQgJgBgGgHQgGgIAAgLQAAgMAGgIQAFgHAKAAQAIAAAFAGIABgGIAKAAIAAAzQAAAKgGAHQgHAFgKAAQgFABgGgDgAgHgWQgDAEAAAJQAAAJADADQADAFAFAAQAHAAADgHIAAgVQgDgHgHAAQgFABgDAEg");
	this.shape_16.setTransform(30.025,-0.4);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAXQAAAGACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_17.setTransform(24.625,-1.4);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgHAmIAAgrIgJAAIAAgJIAJAAIAAgFQAAgJAEgEQAEgFAJAAIAHABIgBAJIgEgBQgJAAAAAJIAAAFIALAAIAAAJIgLAAIAAArg");
	this.shape_18.setTransform(20.225,-2.55);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgRAUQgGgIAAgMIAAAAQgBgHADgHQAEgFAFgEQAGgDAGAAQAKgBAIAIQAGAGAAAMIAAABQAAAJgDAGQgDAGgFADQgGADgHABQgKgBgHgHgAgIgMQgEAEAAAIQAAAJAEAEQADAFAFAAQAGAAAEgFQACgEAAgJQAAgIgDgEQgDgFgGAAQgFAAgDAFg");
	this.shape_19.setTransform(15.5,-1.4);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgFQgDgDAAgFIALAAQABAEADADQADABADAAQAFAAADgBQACgCAAgDQAAgDgCgBQgDgCgFgCIgKgDQgJgDAAgIQAAgHAGgFQAGgEAHAAQAKAAAGAEQAFAFABAIIgNAAQABgEgDgCQgCgDgFABQgDAAgCABQgCACgBADQABADACABQACACAGABIALAEQAEACACACQACAEAAADQAAAIgGAEQgGAEgKABQgFgBgFgCg");
	this.shape_20.setTransform(10.05,-1.4);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgDAGAAQALgBAFAIQAGAGAAANIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_21.setTransform(4.875,-1.4);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgHAKIAEgIIABgFIAAgKIAKAAIAAAJQAAAEgDAFQgCAFgDAEg");
	this.shape_22.setTransform(-1.625,1.475);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgGASIAAgdIgIAAIAAgJIAIAAIAAgMIAMAAIAAAMIAJAAIAAAJIgJAAIAAAdIABAEIAEABIAEAAIAAAJIgIABQgNAAAAgPg");
	this.shape_23.setTransform(-4.35,-1.975);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgKIAAghIAMAAIAAAhQAAAKAIAAQAIABADgHIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_24.setTransform(-8.675,-1.35);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgFAmIAAhKIALAAIAABKg");
	this.shape_25.setTransform(-12.725,-2.5);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgKIAAghIAMAAIAAAhQAAAKAIAAQAIABADgHIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_26.setTransform(-16.775,-1.35);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAaAbIAAghQAAgGgCgBQgDgDgFAAQgEAAgDACQgCACgBAEIAAAjIgLAAIAAgiQAAgJgKAAQgGAAgEAFIAAAmIgLAAIAAg0IAKAAIABAFQAFgGALAAQAJAAAEAIQAFgIALAAQAJAAAEAFQAEAFAAAKIAAAhg");
	this.shape_27.setTransform(-23.9,-1.45);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgFAlIAAg1IALAAIAAA1gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_28.setTransform(-32.025,-2.4);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgKIAAghIAMAAIAAAhQAAAKAIAAQAIABADgHIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_29.setTransform(-36.075,-1.35);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgFAmIAAhKIALAAIAABKg");
	this.shape_30.setTransform(-40.125,-2.5);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAXQAAAGACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_31.setTransform(-44.075,-1.4);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgFAmIAAhKIALAAIAABKg");
	this.shape_32.setTransform(-48.075,-2.5);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgDAGAAQALgBAFAIQAGAGAAANIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_33.setTransform(-51.975,-1.4);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AAZAbIAAghQAAgGgCgBQgCgDgFAAQgEAAgDACQgCACgBAEIAAAjIgLAAIAAgiQAAgJgJAAQgIAAgCAFIAAAmIgNAAIAAg0IALAAIABAFQAFgGAKAAQAKAAAEAIQAGgIAKAAQAJAAAEAFQAFAFAAAKIAAAhg");
	this.shape_34.setTransform(-59.05,-1.45);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_35.setTransform(68.325,-17.45);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFAAgEADg");
	this.shape_36.setTransform(62.875,-17.4);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_37.setTransform(57.375,-17.45);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFAAgEADg");
	this.shape_38.setTransform(51.925,-17.4);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AAKAlIgPgWIgFAFIAAARIgMAAIAAhJIAMAAIAAAqIADgFIAOgQIAOAAIgTAWIAVAeg");
	this.shape_39.setTransform(46.925,-18.5);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFAAgEADg");
	this.shape_40.setTransform(41.325,-17.4);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AAaAbIAAghQAAgGgCgCQgDgCgFAAQgEAAgDACQgCADgBADIAAAjIgLAAIAAgiQAAgJgKAAQgHAAgDAFIAAAmIgLAAIAAg0IAKAAIABAFQAFgGALAAQAJAAAEAJQAFgJALAAQAJAAAEAFQAFAFgBAKIAAAhg");
	this.shape_41.setTransform(34.25,-17.45);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AAKAlIAAgiQAAgEgCgDQgDgCgEAAQgGABgEAFIAAAlIgMAAIAAhJIAMAAIAAAcQAGgIAIAAQARAAAAATIAAAig");
	this.shape_42.setTransform(24.625,-18.5);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFAAgEADg");
	this.shape_43.setTransform(19.175,-17.4);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgFAlIAAhJIALAAIAABJg");
	this.shape_44.setTransform(15.175,-18.5);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgRAUQgHgIABgMIAAAAQAAgHADgGQADgHAFgDQAGgDAGgBQALAAAGAIQAHAHAAALIAAABQAAAIgCAHQgEAFgFAEQgGAEgHgBQgKAAgHgHgAgJgMQgDAFAAAHQAAAJADAFQAEAEAFAAQAGAAADgEQAEgGAAgIQAAgHgEgFQgDgFgGAAQgFAAgEAFg");
	this.shape_45.setTransform(11.05,-17.4);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgLAjQgFgDgDgEIAFgGQAGAGAIAAQAFAAADgDQADgEAAgGIAAgDQgFAGgHgBQgJAAgGgHQgGgIAAgMQAAgMAGgHQAFgHAKgBQAIABAFAGIABgGIAKAAIAAAzQAAAKgGAHQgHAFgKAAQgFAAgGgCgAgHgWQgDAFAAAIQAAAIADAFQADAEAFAAQAHAAADgHIAAgVQgDgHgHAAQgFABgDAEg");
	this.shape_46.setTransform(5.275,-16.4);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_47.setTransform(-0.225,-17.45);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgGAFgEQAGgDAGgBQALAAAFAIQAGAGAAANIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAGQgDAFgFADQgFADgHgBQgKABgHgIgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_48.setTransform(-5.625,-17.4);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AAZAbIAAghQAAgGgCgCQgCgCgFAAQgEAAgDACQgCADgBADIAAAjIgLAAIAAgiQAAgJgJAAQgIAAgCAFIAAAmIgNAAIAAg0IALAAIABAFQAFgGAKAAQAKAAAEAJQAGgJAKAAQAJAAAEAFQAFAFAAAKIAAAhg");
	this.shape_49.setTransform(-12.7,-17.45);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_50.setTransform(-20.825,-18.4);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_51.setTransform(-24.875,-17.45);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_52.setTransform(-28.925,-18.4);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_53.setTransform(-35.475,-17.45);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFAAgEADg");
	this.shape_54.setTransform(-40.925,-17.4);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AALAaIgLgjIgKAjIgKAAIgOg0IALAAIAIAkIALgkIAIAAIAMAkIAIgkIAMAAIgPA0g");
	this.shape_55.setTransform(-47.4,-17.4);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgGAFgEQAGgDAGgBQALAAAFAIQAGAGAAANIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAGQgDAFgFADQgFADgHgBQgKABgHgIgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_56.setTransform(-53.725,-17.4);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AAQAjIAAgfIgfAAIAAAfIgMAAIAAhGIAMAAIAAAeIAfAAIAAgeIAMAAIAABGg");
	this.shape_57.setTransform(-60.025,-18.3);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_58.setTransform(3.825,-3.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-80.4,-31,168.5,55.6);


(lib.drag14G3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape.setTransform(82.175,33.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAAAQACgCACgBQADABACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_1.setTransform(78.125,32.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAIACADIAAACIgNAAIgBgGQgGAGgHABQgIAAgFgFgAgHAEQgDACAAAFQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFgBgEADg");
	this.shape_2.setTransform(74.175,33.85);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgFAmIAAhLIALAAIAABLg");
	this.shape_3.setTransform(70.175,32.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgLAjQgFgDgDgDIAFgIQAGAHAIAAQAFAAADgDQADgDAAgHIAAgDQgFAGgHAAQgJAAgGgIQgGgHAAgMQAAgNAGgHQAFgIAKABQAIgBAFAHIABgFIAKAAIAAAyQAAALgGAFQgHAHgKAAQgFgBgGgCgAgHgWQgDAEAAAKQAAAHADAEQADAFAFAAQAHAAADgGIAAgXQgDgFgHAAQgFgBgDAFg");
	this.shape_4.setTransform(63.475,34.85);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_5.setTransform(57.975,33.8);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAIACADIAAACIgNAAIgBgGQgGAGgHABQgIAAgFgFgAgHAEQgDACAAAFQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFgBgEADg");
	this.shape_6.setTransform(52.525,33.85);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgSAkIAAgJIACAAQAEAAADgBIADgGIACgFIgTgzIANAAIAKAkIALgkIANAAIgVA8QgEANgMAAIgFgBg");
	this.shape_7.setTransform(47.375,34.925);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAIACADIAAACIgNAAIgBgGQgGAGgHABQgIAAgFgFgAgHAEQgDACAAAFQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFgBgEADg");
	this.shape_8.setTransform(39.775,33.85);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgGASIAAgdIgIAAIAAgJIAIAAIAAgMIAMAAIAAAMIAJAAIAAAJIgJAAIAAAdIABAEIAEABIAEAAIAAAJIgHABQgOAAAAgPg");
	this.shape_9.setTransform(35.25,33.275);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAIACADIAAACIgNAAIgBgGQgGAGgHABQgIAAgFgFgAgHAEQgDACAAAFQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFgBgEADg");
	this.shape_10.setTransform(31.025,33.85);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAZAbIAAgiQAAgEgCgDQgCgCgFAAQgEAAgCACQgDACgBAEIAAAjIgLAAIAAgiQAAgJgJAAQgIAAgCAGIAAAlIgNAAIAAg0IAMAAIAAAGQAGgHAJAAQAKAAAEAJQAGgJAKAAQAJAAAEAFQAEAFABAJIAAAig");
	this.shape_11.setTransform(23.95,33.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAIAAIAEABIgBALIgEgBQgIAAgCAHIAAAjg");
	this.shape_12.setTransform(18.1,33.8);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgGAFgEQAGgDAGAAQALAAAFAGQAGAIAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgGIAGAGQgDAFgFACQgFADgHAAQgKgBgHgGgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_13.setTransform(13.475,33.85);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgRAeQgFgHAAgNQAAgLAFgHQAGgIAKAAQAHAAAFAGIAAgbIAMAAIAABKIgKAAIgBgGQgFAHgIAAQgJAAgHgIgAgHgBQgDADAAAJQAAAIADAFQADAEAEAAQAIAAADgGIAAgWQgDgGgIAAQgEAAgDAFg");
	this.shape_14.setTransform(7.8,32.8);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgRAUQgGgIAAgMIAAAAQAAgHACgHQADgFAGgEQAGgEAGABQAKgBAIAIQAGAGAAAMIAAACQAAAHgDAGQgCAHgGADQgFADgIABQgKgBgHgHgAgIgMQgEAEAAAJQAAAIAEAEQADAFAFAAQAGAAAEgFQADgFAAgIQgBgIgDgEQgDgFgGAAQgFAAgDAFg");
	this.shape_15.setTransform(160.3,17.85);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_16.setTransform(154.675,17.8);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_17.setTransform(150.625,16.85);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAKAmIAAgiQAAgFgCgDQgDgBgEAAQgGAAgEAFIAAAmIgMAAIAAhLIAMAAIAAAdQAGgIAIABQARAAAAASIAAAjg");
	this.shape_18.setTransform(146.575,16.75);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgPAUQgHgHAAgMIAAgBQAAgMAHgHQAGgHAKAAQAKgBAGAGQAFAFABAKIgLAAQgBgFgDgDQgCgDgFAAQgFAAgDAEQgDAFAAAIIAAABQAAAJADAEQADAEAFAAQAEAAADgCQADgDABgEIALAAQAAAFgDAEQgDAFgFACQgFACgGABQgKAAgGgIg");
	this.shape_19.setTransform(141.275,17.85);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgEAGABQALgBAFAIQAGAGAAANIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgGgDgDQgCgDgFAAQgEAAgDADg");
	this.shape_20.setTransform(135.975,17.85);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_21.setTransform(123.575,16.85);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgFASIAAgdIgJAAIAAgJIAJAAIAAgMIAKAAIAAAMIAKAAIAAAJIgKAAIAAAdIABAEIAFABIAEAAIAAAJIgIABQgMAAAAgPg");
	this.shape_22.setTransform(120.5,17.275);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAIAAIAEABIgBALIgEAAQgIgBgCAHIAAAjg");
	this.shape_23.setTransform(117.45,17.8);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgEAGABQALgBAFAIQAGAGAAANIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgGgDgDQgCgDgFAAQgEAAgDADg");
	this.shape_24.setTransform(112.825,17.85);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_25.setTransform(107.375,18.825);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgEAGABQALgBAFAIQAGAGAAANIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgGgDgDQgCgDgFAAQgEAAgDADg");
	this.shape_26.setTransform(101.825,17.85);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgEQgDgEAAgFIAMAAQAAAEADADQADACAEAAQAEgBADgBQACgCAAgDQAAgDgCgBQgDgCgFgCIgKgDQgJgDAAgIQAAgHAFgFQAHgEAIAAQAJAAAFAEQAHAFgBAIIgLAAQgBgEgCgCQgCgDgEABQgEAAgCABQgDACABADQgBADADACQACABAGABIALAEQAEABACADQACAEAAADQAAAIgGAEQgGAEgJABQgGgBgFgCg");
	this.shape_27.setTransform(96.5,17.85);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AAKAmIgPgXIgFAGIAAARIgMAAIAAhLIAMAAIAAArIADgFIAOgPIAOAAIgTAUIAVAgg");
	this.shape_28.setTransform(83.275,16.75);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_29.setTransform(77.675,17.85);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgQAfQgGgIAAgNQAAgLAGgIQAFgHAJAAQAIAAAGAGIAAgbIALAAIAABKIgKAAIgBgFQgFAGgJAAQgIAAgGgHgAgHgBQgDADgBAJQABAJADAEQADAFAFgBQAHABAEgHIAAgWQgEgGgHAAQgFAAgDAFg");
	this.shape_30.setTransform(72,16.8);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_31.setTransform(68.025,16.85);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgGASIAAgdIgIAAIAAgJIAIAAIAAgMIAMAAIAAAMIAJAAIAAAJIgJAAIAAAdIABAEIAEABIAEAAIAAAJIgIABQgNAAAAgPg");
	this.shape_32.setTransform(64.95,17.275);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_33.setTransform(53.725,16.85);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_34.setTransform(49.675,17.8);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_35.setTransform(45.625,16.85);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_36.setTransform(33.175,17.8);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_37.setTransform(27.725,17.85);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AAMAbIgMgkIgKAkIgKAAIgOg0IALAAIAJAjIAKgjIAIAAIALAjIAJgjIAMAAIgPA0g");
	this.shape_38.setTransform(21.25,17.85);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgEAGABQALgBAFAIQAGAGAAANIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgGgDgDQgCgDgFAAQgEAAgDADg");
	this.shape_39.setTransform(14.925,17.85);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AAQAkIAAggIgfAAIAAAgIgMAAIAAhGIAMAAIAAAdIAfAAIAAgdIAMAAIAABGg");
	this.shape_40.setTransform(8.625,16.95);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FF8C2D").s().p("AtPkBIafgNIAAIPI6fAPg");
	this.shape_41.setTransform(84.1,25.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.7,-2.1,169.7,54.300000000000004);


(lib.drag14G2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgHQAAgIAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgCACgDIAAgJIgHAAQgFgBgEADg");
	this.shape.setTransform(108.775,46.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgSAkIAAgJIACAAQAEAAADgBIADgGIACgFIgTgzIANAAIAKAkIALgkIANAAIgVA8QgEANgMAAIgFgBg");
	this.shape_1.setTransform(103.625,47.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgBQgCgDgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_2.setTransform(98.425,46.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgBQgCgDgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_3.setTransform(92.875,46.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_4.setTransform(88.825,45.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgHQAAgIAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgCACgDIAAgJIgHAAQgFgBgEADg");
	this.shape_5.setTransform(84.875,46.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgFAmIAAhLIALAAIAABLg");
	this.shape_6.setTransform(80.875,45);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgEQgDgFAAgEIALAAQABAEADADQADACADAAQAFgBADgBQACgCAAgDQAAgDgDgBQgCgDgFgBIgKgDQgJgDAAgJQAAgGAGgFQAGgEAHAAQAKAAAFAEQAGAFABAIIgNAAQAAgEgCgCQgDgCgEAAQgDAAgCACQgDABAAADQAAADADACQACABAGABIALAEQAEABACADQACADAAAEQAAAHgGAFQgGAEgKABQgFgBgFgCg");
	this.shape_7.setTransform(74.5,46.1);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgHQAAgIAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgCACgDIAAgJIgHAAQgFgBgEADg");
	this.shape_8.setTransform(69.275,46.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgFAmIAAhLIALAAIAABLg");
	this.shape_9.setTransform(65.275,45);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgPAUQgHgHAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGABQALAAAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAHQgDAFgFACQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_10.setTransform(61.375,46.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAKAmIgPgXIgFAGIAAARIgMAAIAAhLIAMAAIAAArIADgFIAOgPIAOAAIgTAUIAVAgg");
	this.shape_11.setTransform(56.375,45);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_12.setTransform(162.775,30.05);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAXQAAAGACAFIAAABIgNAAIgBgGQgGAHgHgBQgIAAgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_13.setTransform(157.325,30.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgLAjQgFgCgDgFIAFgHQAGAHAIAAQAFAAADgDQADgEAAgFIAAgEQgFAFgHAAQgJAAgGgHQgGgIAAgLQAAgMAGgIQAFgHAKAAQAIAAAFAGIABgGIAKAAIAAAzQAAAKgGAHQgHAFgKAAQgFABgGgDgAgHgWQgDAEAAAJQAAAJADADQADAFAFAAQAHAAADgHIAAgVQgDgHgHABQgFAAgDAEg");
	this.shape_14.setTransform(151.675,31.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_15.setTransform(146.175,30.05);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgDAGAAQALgBAFAIQAGAGAAANIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHAAQgKABgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_16.setTransform(140.775,30.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgQAfQgGgIAAgNQAAgLAGgIQAFgHAJAAQAIAAAGAGIAAgbIALAAIAABKIgLAAIAAgFQgFAGgJAAQgIAAgGgHgAgHgCQgEAEAAAJQAAAJAEAEQADAFAFgBQAHABAEgHIAAgWQgEgGgHAAQgFAAgDAEg");
	this.shape_17.setTransform(135.1,29.05);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAXQAAAGACAFIAAABIgNAAIgBgGQgGAHgHgBQgIAAgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_18.setTransform(127.225,30.1);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgRAfQgFgIAAgNQAAgLAFgIQAGgHAKAAQAHAAAFAGIAAgbIAMAAIAABKIgLAAIAAgFQgGAGgHAAQgJAAgHgHgAgHgCQgEAEABAJQgBAJAEAEQADAFAEgBQAIABADgHIAAgWQgDgGgIAAQgEAAgDAEg");
	this.shape_19.setTransform(121.55,29.05);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgDAGAAQALgBAFAIQAGAGAAANIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHAAQgKABgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_20.setTransform(116.225,30.1);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgLAgIAAAFIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAHQAFAIAAALIAAABQAAAMgFAIQgGAHgJAAQgJAAgFgGgAgKAAIAAAWQADAGAHAAQAFABADgFQADgEAAgIIAAgCQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_21.setTransform(110.775,29.05);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IAMAAIAAAGQADgHAHAAIAFABIAAALIgFAAQgIgBgCAHIAAAjg");
	this.shape_22.setTransform(106.35,30.05);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgDAGAAQALgBAFAIQAGAGAAANIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHAAQgKABgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_23.setTransform(101.725,30.1);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgLAgIAAAFIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAHQAFAIAAALIAAABQAAAMgFAIQgGAHgJAAQgJAAgFgGgAgKAAIAAAWQADAGAHAAQAFABADgFQADgEAAgIIAAgCQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_24.setTransform(96.275,29.05);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgLAjQgFgCgDgFIAFgHQAGAHAIAAQAFAAADgDQADgEAAgFIAAgEQgFAFgHAAQgJAAgGgHQgGgIAAgLQAAgMAGgIQAFgHAKAAQAIAAAFAGIABgGIAKAAIAAAzQAAAKgGAHQgHAFgKAAQgFABgGgDgAgHgWQgDAEAAAJQAAAJADADQADAFAFAAQAHAAADgHIAAgVQgDgHgHABQgFAAgDAEg");
	this.shape_25.setTransform(87.925,31.1);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_26.setTransform(82.425,30.05);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAXQAAAGACAFIAAABIgNAAIgBgGQgGAHgHgBQgIAAgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_27.setTransform(76.975,30.1);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgSAkIAAgJIACAAQAEAAADgBIADgGIACgFIgTgzIANAAIAKAkIALgkIANAAIgVA8QgEANgMAAIgFgBg");
	this.shape_28.setTransform(71.825,31.175);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAXQAAAGACAFIAAABIgNAAIgBgGQgGAHgHgBQgIAAgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_29.setTransform(64.225,30.1);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgGASIAAgdIgIAAIAAgJIAIAAIAAgMIALAAIAAAMIAKAAIAAAJIgKAAIAAAdIACAEIAEABIAEAAIAAAJIgHABQgNAAgBgPg");
	this.shape_30.setTransform(59.7,29.525);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAXQAAAGACAFIAAABIgNAAIgBgGQgGAHgHgBQgIAAgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_31.setTransform(55.475,30.1);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAZAbIAAghQAAgGgBgBQgDgDgFAAQgEAAgDACQgCACgBAEIAAAjIgLAAIAAgiQAAgJgJAAQgHAAgEAFIAAAmIgMAAIAAg0IALAAIABAFQAFgGAKAAQAKAAAEAIQAGgIAKAAQAJAAAEAFQAFAFgBAKIAAAhg");
	this.shape_32.setTransform(48.4,30.05);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAHAAIAFABIAAALIgFAAQgIgBgCAHIAAAjg");
	this.shape_33.setTransform(42.55,30.05);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgDAGAAQALgBAFAIQAGAGAAANIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHAAQgKABgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_34.setTransform(37.925,30.1);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgQAfQgGgIAAgNQAAgLAGgIQAFgHAKAAQAHAAAFAGIAAgbIAMAAIAABKIgLAAIAAgFQgGAGgHAAQgKAAgFgHgAgHgCQgDAEAAAJQAAAJADAEQADAFAFgBQAHABADgHIAAgWQgDgGgHAAQgFAAgDAEg");
	this.shape_35.setTransform(32.25,29.05);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgRAUQgHgIAAgMIAAAAQABgHADgHQADgFAFgEQAGgDAGAAQAKgBAHAIQAHAGABAMIAAABQAAAJgDAGQgDAGgGADQgFADgIAAQgKAAgHgHgAgJgMQgDAEAAAIQAAAJADAEQAEAFAFAAQAGAAADgFQADgEABgJQAAgIgEgEQgDgFgGAAQgFAAgEAFg");
	this.shape_36.setTransform(26.7,30.1);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_37.setTransform(21.075,30.05);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgFAlIAAg1IALAAIAAA1gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_38.setTransform(17.025,29.1);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AAKAmIAAgjQAAgEgCgDQgDgCgEABQgGAAgEAFIAAAmIgMAAIAAhKIAMAAIAAAcQAGgIAIABQARgBAAATIAAAjg");
	this.shape_39.setTransform(12.975,29);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgPAUQgHgHAAgNIAAAAQAAgMAHgHQAGgHAKAAQAKAAAGAFQAFAFABAJIgLAAQgBgEgDgDQgCgDgFAAQgFAAgDAEQgDAFAAAIIAAABQAAAJADAEQADAEAFAAQAEAAADgCQADgDABgEIALAAQAAAFgDAEQgDAFgFACQgFACgGAAQgKABgGgIg");
	this.shape_40.setTransform(7.675,30.1);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgWAkIAAhHIAtAAIAAAKIghAAIAAAUIAdAAIAAAJIgdAAIAAAWIAhAAIAAAKg");
	this.shape_41.setTransform(2.375,29.2);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFAAgEADg");
	this.shape_42.setTransform(158.425,14.1);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgSAkIAAgJIACAAQAEAAADgBIADgGIACgFIgTgzIANAAIAKAkIALgkIANAAIgVA8QgEANgMAAIgFgBg");
	this.shape_43.setTransform(153.275,15.175);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_44.setTransform(148.075,14.05);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgJIAAgiIAMAAIAAAiQAAAJAIABQAIAAADgHIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_45.setTransform(142.525,14.15);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgFASIAAgdIgJAAIAAgJIAJAAIAAgMIALAAIAAAMIAJAAIAAAJIgJAAIAAAdIAAAEIAFABIAEAAIAAAJIgIABQgMAAAAgPg");
	this.shape_46.setTransform(137.95,13.525);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFAAgEADg");
	this.shape_47.setTransform(133.725,14.1);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgFQgDgEAAgEIALAAQABAEADACQADACADAAQAFABADgCQACgCAAgDQAAgDgDgCQgCgBgFgBIgKgEQgJgDAAgIQAAgHAGgEQAGgGAHAAQAKAAAGAGQAFAEABAIIgNAAQABgEgDgCQgCgCgFgBQgDAAgCACQgCACgBADQABADACABQACACAGACIALADQAEABACAEQACADAAADQAAAIgGAEQgGAFgKgBQgFABgFgDg");
	this.shape_48.setTransform(128.4,14.1);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgMAFIAAgJIAZAAIAAAJg");
	this.shape_49.setTransform(124.175,13.725);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgJIAAgiIAMAAIAAAiQAAAJAIABQAIAAADgHIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_50.setTransform(119.775,14.15);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgFASIAAgdIgJAAIAAgJIAJAAIAAgMIAKAAIAAAMIAKAAIAAAJIgKAAIAAAdIABAEIAFABIAEAAIAAAJIgIABQgNAAABgPg");
	this.shape_51.setTransform(115.2,13.525);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFAAgEADg");
	this.shape_52.setTransform(110.975,14.1);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgFQgDgEAAgEIALAAQABAEADACQADACADAAQAGABACgCQACgCAAgDQAAgDgDgCQgCgBgFgBIgKgEQgJgDAAgIQAAgHAGgEQAGgGAHAAQAKAAAFAGQAHAEAAAIIgNAAQAAgEgCgCQgDgCgEgBQgDAAgCACQgDACAAADQAAADADABQACACAGACIALADQAEABACAEQACADAAADQAAAIgGAEQgGAFgKgBQgFABgFgDg");
	this.shape_53.setTransform(105.65,14.1);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_54.setTransform(97.825,14.05);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFAAgEADg");
	this.shape_55.setTransform(92.375,14.1);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AAKAlIgPgWIgFAFIAAARIgMAAIAAhJIAMAAIAAAqIADgFIAOgQIAOAAIgTAWIAVAeg");
	this.shape_56.setTransform(87.375,13);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFAAgEADg");
	this.shape_57.setTransform(81.775,14.1);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_58.setTransform(76.325,15.075);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgJIAAgiIAMAAIAAAiQAAAJAIABQAIAAADgHIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_59.setTransform(70.625,14.15);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAIAAIAEABIgBALIgEAAQgIAAgCAGIAAAjg");
	this.shape_60.setTransform(66.35,14.05);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgGAFgEQAGgDAGgBQALAAAFAIQAGAGAAANIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAGQgDAFgFADQgFADgHgBQgKABgHgIgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_61.setTransform(61.725,14.1);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AAaAbIAAghQgBgGgCgCQgCgCgFAAQgEAAgCACQgDADgBADIAAAjIgLAAIAAgiQAAgJgKAAQgHAAgCAFIAAAmIgMAAIAAg0IALAAIAAAFQAGgGAKAAQAJAAAEAJQAGgJAKAAQAJAAAEAFQAEAFABAKIAAAhg");
	this.shape_62.setTransform(54.65,14.05);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_63.setTransform(46.525,13.1);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_64.setTransform(42.475,14.05);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_65.setTransform(38.425,13.1);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_66.setTransform(31.875,14.05);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFAAgEADg");
	this.shape_67.setTransform(26.425,14.1);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AALAaIgLgjIgKAjIgKAAIgPg0IAMAAIAIAkIAMgkIAIAAIALAkIAIgkIALAAIgOA0g");
	this.shape_68.setTransform(19.95,14.1);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgGAFgEQAGgDAGgBQALAAAFAIQAGAGAAANIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAGQgDAFgFADQgFADgHgBQgKABgHgIgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_69.setTransform(13.625,14.1);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AAQAjIAAgfIgfAAIAAAfIgMAAIAAhGIAMAAIAAAeIAfAAIAAgeIAMAAIAABGg");
	this.shape_70.setTransform(7.325,13.2);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_71.setTransform(82.475,29.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.7,1.5,172.29999999999998,55.6);


(lib.drag14G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgLAcQgGgDgDgFQgDgEAAgFIANAAQAAAEADADQAEACADAAQAGAAADgBQACgCAAgEQAAgEgCgBQgDgCgGgCQgHAAgEgDQgKgDAAgKQAAgHAGgFQAGgFAJAAQALAAAGAFQAGAFABAIIgOAAQABgEgDgCQgDgDgFAAQgDABgDACQgDACAAADQABADACACIAJADQAIACAFACQAEABACADQACAEAAAEQAAAJgHAEQgGAFgLAAQgFAAgGgCg");
	this.shape.setTransform(105.8,38);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgIQAAgJAHgDQAHgGAMAAIAIAAIAAgDQAAgFgDgCQgCgDgFgBQgEAAgDADQgDACAAADIgNAAQAAgEADgFQAEgEAFgCQAGgCAFAAQAKAAAHAFQAGAFAAAKIAAAYQAAAJACAEIAAABIgNAAIgCgGQgGAHgIAAQgJAAgFgFgAgHAEQgEADAAAEQAAAEADADQACACAEAAQADAAAEgCQADgCACgEIAAgKIgHAAQgHgBgDADg");
	this.shape_1.setTransform(100.025,38);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AALApIAAglQAAgFgCgDQgDgCgFAAQgHAAgEAGIAAApIgNAAIAAhRIANAAIAAAeQAHgHAIAAQATAAAAAUIAAAmg");
	this.shape_2.setTransform(94,36.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AALApIgRgZIgFAGIAAATIgOAAIAAhRIAOAAIAAAuIAEgFIAPgRIAPAAIgVAXIAYAig");
	this.shape_3.setTransform(88.475,36.775);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AALApIAAglQAAgFgDgDQgCgCgFAAQgHAAgEAGIAAApIgNAAIAAhRIANAAIAAAeQAHgHAIAAQATAAAAAUIAAAmg");
	this.shape_4.setTransform(79.45,36.775);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgSAYQgFgGAAgKIAAglIANAAIAAAlQAAALAJAAQAIAAAEgHIAAgpIANAAIAAA5IgMAAIAAgFQgHAHgJAAQgJAAgFgGg");
	this.shape_5.setTransform(73.35,38.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgMAiIAAAHIgNAAIAAhSIAOAAIAAAeQAFgGAJAAQALAAAFAHQAHAIgBAOIAAAAQABAOgHAIQgFAIgLAAQgJAAgGgIgAgLAAIAAAYQADAHAIAAQAGAAADgEQAEgFAAgJIAAgCQAAgJgEgEQgDgFgGAAQgIAAgDAHg");
	this.shape_6.setTransform(67.3,36.825);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgSAYQgFgGAAgKIAAglIANAAIAAAlQAAALAJAAQAIAAAEgHIAAgpIANAAIAAA5IgNAAIAAgFQgFAHgKAAQgJAAgFgGg");
	this.shape_7.setTransform(61.05,38.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgGAUIAAggIgKAAIAAgKIAKAAIAAgOIAMAAIAAAOIAKAAIAAAKIgKAAIAAAgQAAADABABQABABAAAAQABAAAAABQABAAAAAAQABAAABAAIAEgBIAAAKIgIACQgOgBAAgQg");
	this.shape_8.setTransform(56.05,37.35);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AALApIgRgZIgFAGIAAATIgOAAIAAhRIAOAAIAAAuIAEgFIAPgRIAPAAIgVAXIAYAig");
	this.shape_9.setTransform(143.775,19.575);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgSAYQgFgGAAgKIAAgkIANAAIAAAkQAAALAJAAQAIAAAEgHIAAgoIANAAIAAA4IgMAAIAAgFQgHAHgJgBQgJABgFgGg");
	this.shape_10.setTransform(137.5,20.85);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgGAUIAAggIgJAAIAAgJIAJAAIAAgPIAMAAIAAAPIALAAIAAAJIgLAAIAAAgQAAADACABQAAABAAAAQABAAAAABQABAAAAAAQABAAABAAIAFgBIAAAKIgJABQgOAAAAgQg");
	this.shape_11.setTransform(132.5,20.15);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AALAdIAAgkQAAgGgCgDQgDgCgFAAQgHAAgEAHIAAAoIgNAAIAAg4IANAAIAAAGQAGgHAKAAQARgBABAVIAAAlg");
	this.shape_12.setTransform(127.75,20.75);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgRAWQgHgHAAgNIAAgCQAAgIADgGQADgIAGgDQAGgEAHAAQAMAAAGAHQAHAIAAAOIAAAEIgmAAQABAHAEAEQAEAFAGAAQAJAAAGgIIAHAHQgEAGgFACQgGADgIAAQgLAAgIgIgAgHgPQgEAEAAAGIAXAAIAAAAQABgHgEgDQgDgDgFgBQgEAAgEAEg");
	this.shape_13.setTransform(121.8,20.8);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgMAiIAAAHIgNAAIAAhSIAOAAIAAAeQAFgGAJAAQALAAAFAHQAHAIgBAOIAAAAQABAOgHAIQgFAIgLAAQgJAAgGgIgAgLAAIAAAYQADAHAIAAQAGAAADgEQAEgFAAgJIAAgCQgBgJgDgEQgDgFgGAAQgIAAgDAHg");
	this.shape_14.setTransform(115.8,19.625);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgFAoIAAg5IALAAIAAA5gAgEgcQgBAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAgDACgCQACgCACAAQADAAACACQACACAAADQAAABAAAAQAAABAAAAQAAABgBAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_15.setTransform(108.45,19.7);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AALApIgRgZIgFAGIAAATIgOAAIAAhRIAOAAIAAAuIAEgFIAPgRIAPAAIgVAXIAYAig");
	this.shape_16.setTransform(104.575,19.575);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgGAoIAAg5IANAAIAAA5gAgFgcQAAAAAAgBQgBAAAAgBQAAAAAAgBQgBAAAAgBQAAgDACgCQADgCACAAQAEAAACACQACACAAADQAAABgBAAQAAABAAAAQAAABgBAAQAAABAAAAQgCACgEAAQgCAAgDgCg");
	this.shape_17.setTransform(99.95,19.7);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgGApIAAhRIANAAIAABRg");
	this.shape_18.setTransform(97.15,19.575);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgGAoIAAg5IANAAIAAA5gAgFgcQAAAAAAgBQgBAAAAgBQAAAAAAgBQgBAAAAgBQAAgDACgCQACgCADAAQAEAAABACQADACAAADQAAABgBAAQAAABAAAAQAAABgBAAQAAABgBAAQgBACgEAAQgDAAgCgCg");
	this.shape_19.setTransform(94.35,19.7);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAcAdIAAglQAAgFgCgDQgDgCgFAAQgFAAgCACQgDADgBAEIAAAmIgMAAIAAglQgBgKgKAAQgIAAgDAHIAAAoIgNAAIAAg4IAMAAIABAGQAGgIAKABQALAAAEAIQAHgIALAAQAKAAAEAEQAFAGAAAKIAAAlg");
	this.shape_20.setTransform(88.175,20.75);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgRAWQgHgHgBgNIAAgCQABgIADgGQADgIAGgDQAGgEAHAAQALAAAHAHQAGAIABAOIAAAEIglAAQAAAHAEAEQAEAFAGAAQAJAAAGgIIAHAHQgEAGgFACQgHADgHAAQgLAAgIgIgAgHgPQgEAEAAAGIAXAAIAAAAQABgHgEgDQgDgDgGgBQgDAAgEAEg");
	this.shape_21.setTransform(80.5,20.8);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAcAdIAAglQAAgFgCgDQgDgCgFAAQgFAAgCACQgDADgBAEIAAAmIgMAAIAAglQgBgKgKAAQgIAAgDAHIAAAoIgNAAIAAg4IAMAAIABAGQAGgIAKABQALAAAEAIQAHgIALAAQAKAAAEAEQAFAGAAAKIAAAlg");
	this.shape_22.setTransform(72.725,20.75);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgFAoIAAg5IALAAIAAA5gAgEgcQgBAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAgDACgCQACgCACAAQADAAACACQACACAAADQAAABAAAAQAAABAAAAQAAABgBAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_23.setTransform(63.8,19.7);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AALAdIAAgkQAAgGgCgDQgDgCgFAAQgHAAgEAHIAAAoIgNAAIAAg4IANAAIAAAGQAGgHAKAAQARgBABAVIAAAlg");
	this.shape_24.setTransform(59.35,20.75);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgFAoIAAg5IALAAIAAA5gAgEgcQgBAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAgDACgCQACgCACAAQADAAACACQACACAAADQAAABAAAAQAAABAAAAQAAABgBAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_25.setTransform(54.9,19.7);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AALAdIAAgkQAAgGgDgDQgCgCgFAAQgHAAgEAHIAAAoIgNAAIAAg4IAMAAIAAAGQAHgHAJAAQASgBABAVIAAAlg");
	this.shape_26.setTransform(47.7,20.75);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgIQAAgJAHgEQAHgEAMAAIAIAAIAAgFQAAgEgDgCQgCgEgFAAQgEAAgDADQgDACAAADIgNAAQAAgEADgFQAEgEAFgCQAGgCAFAAQAKAAAHAFQAGAFAAAJIAAAZQAAAJACAEIAAABIgNAAIgCgGQgGAHgIAAQgJAAgFgFgAgHAEQgEADAAAFQAAADADADQACACAEAAQADAAAEgCQADgCACgEIAAgKIgHAAQgHgBgDADg");
	this.shape_27.setTransform(41.675,20.8);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AAMAdIgMgnIgLAnIgLAAIgQg5IANAAIAJAnIAMgnIAJAAIAMAnIAJgnIANAAIgQA5g");
	this.shape_28.setTransform(34.575,20.8);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgRAWQgIgHAAgNIAAgCQAAgIAEgGQADgIAGgDQAHgEAGAAQALAAAHAHQAGAIAAAOIAAAEIgkAAQAAAHAEAEQAFAFAFAAQAJAAAFgIIAIAHQgEAGgFACQgHADgHAAQgLAAgIgIgAgHgPQgDAEgBAGIAYAAIAAAAQAAgHgEgDQgDgDgGgBQgDAAgEAEg");
	this.shape_29.setTransform(27.6,20.8);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AARAnIAAgjIghAAIAAAjIgOAAIAAhNIAOAAIAAAhIAhAAIAAghIAOAAIAABNg");
	this.shape_30.setTransform(20.7,19.8);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_31.setTransform(81.525,27.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.7,-0.3,168.5,55.599999999999994);


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
	this.shape.setTransform(70.425,459.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgjBDQgOgMgBgUIAZAAQACALAGAHQAHAGAKAAQAMAAAGgJQAHgJAAgOQAAgPgIgIQgGgHgMAAQgIAAgEACQgGABgGAFIgVgFIAJhOIBTAAIAAAWIg9AAIgFAmQAMgGAMAAQAXAAAMAOQAMANAAAYQAAAYgOAOQgNAOgYAAQgVAAgOgMg");
	this.shape_1.setTransform(61.45,452.675);

	this.instance = new lib.Tween8_1("synched",0);
	this.instance.setTransform(64.3,452.7,0.0361,0.0648);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_2.setTransform(70.425,403.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAMBOIAAgjIhDAAIgBgPIBDhpIAbAAIAABjIATAAIAAAVIgTAAIAAAjgAAKgmIgnA8IApAAIAAhAg");
	this.shape_3.setTransform(61.2,396.525);

	this.instance_1 = new lib.Tween8_1("synched",0);
	this.instance_1.setTransform(64.3,396.65,0.0361,0.0648);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_4.setTransform(70.425,353.475);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AglBEQgOgMAAgUIAaAAQAAALAHAGQAHAHALAAQAMAAAHgHQAHgGAAgNQAAgMgIgHQgHgGgNAAIgQAAIAAgUIAQAAQAMAAAGgGQAIgGAAgMQAAgLgHgGQgFgGgMAAQgKAAgHAGQgGAGAAAKIgaAAQgBgMAHgKQAGgKAMgGQALgFAOAAQAXAAANAMQAOALAAAVQgBALgGAJQgHAJgLAFQANADAHAKQAHAJAAANQAAAVgPANQgOAMgXAAQgWAAgPgMg");
	this.shape_5.setTransform(61,346.975);

	this.instance_2 = new lib.Tween8_1("synched",0);
	this.instance_2.setTransform(64.3,347.1,0.0361,0.0648);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_6.setTransform(70.425,299.875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgyBPIAAgSIAzg5QALgLAFgIQAFgJAAgIQAAgMgGgGQgHgHgJAAQgNAAgHAHQgHAIAAAOIgaAAQAAgPAHgLQAGgMAMgGQAMgGAQAAQAWAAANALQANAMAAAUQAAALgHANQgGAMgPAQIglApIBHAAIAAAVg");
	this.shape_7.setTransform(61.225,293.275);

	this.instance_3 = new lib.Tween8_1("synched",0);
	this.instance_3.setTransform(64.3,293.5,0.0361,0.0648);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_8.setTransform(70.425,248.975);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAGBOIAAh8IglANIAAgWIA8gWIADAAIAACbg");
	this.shape_9.setTransform(59.975,242.45);

	this.instance_4 = new lib.Tween8_1("synched",0);
	this.instance_4.setTransform(64.3,242.6,0.0361,0.0648);

	this.lima = new lib.drag14G5();
	this.lima.name = "lima";
	this.lima.setTransform(140.15,462.35,0.7557,0.7557,0,0,0,82.2,26.8);

	this.empat = new lib.drag14G4();
	this.empat.name = "empat";
	this.empat.setTransform(140.25,404.9,0.7557,0.7557);

	this.tiga = new lib.drag14G3();
	this.tiga.name = "tiga";
	this.tiga.setTransform(141.65,353.75,0.7557,0.7557,0,0,0,82.2,26.8);

	this.dua = new lib.drag14G2();
	this.dua.name = "dua";
	this.dua.setTransform(142.95,297.4,0.7557,0.7557,0,0,0,82.2,26.8);

	this.satu = new lib.drag14G1();
	this.satu.name = "satu";
	this.satu.setTransform(143.65,247.9,0.7557,0.7557,0,0,0,82.2,26.8);

	this.kotakKartu2 = new lib.target();
	this.kotakKartu2.name = "kotakKartu2";
	this.kotakKartu2.setTransform(485.9,264.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.kotakKartu2},{t:this.satu},{t:this.dua},{t:this.tiga},{t:this.empat},{t:this.lima},{t:this.instance_4},{t:this.shape_9},{t:this.shape_8},{t:this.instance_3},{t:this.shape_7},{t:this.shape_6},{t:this.instance_2},{t:this.shape_5},{t:this.shape_4},{t:this.instance_1},{t:this.shape_3},{t:this.shape_2},{t:this.instance},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Slots10, new cjs.Rectangle(49.1,227.4,504.79999999999995,257.20000000000005), null);


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
	this.lima = new lib.drop14G5();
	this.lima.name = "lima";
	this.lima.setTransform(343.8,471.45,0.436,0.436,0,0,0,132.8,50.2);
	new cjs.ButtonHelper(this.lima, 0, 1, 1);

	this.empat = new lib.drop14G4();
	this.empat.name = "empat";
	this.empat.setTransform(343.8,418.85,0.436,0.436,0,0,0,139.9,40.6);
	new cjs.ButtonHelper(this.empat, 0, 1, 1);

	this.tiga = new lib.drop14G3();
	this.tiga.name = "tiga";
	this.tiga.setTransform(343.8,374.95,0.436,0.436,0,0,0,137.8,46.1);
	new cjs.ButtonHelper(this.tiga, 0, 1, 1);

	this.dua = new lib.drop14G2();
	this.dua.name = "dua";
	this.dua.setTransform(343.8,320.85,0.436,0.436,0,0,0,135.7,57.5);
	new cjs.ButtonHelper(this.dua, 0, 1, 1);

	this.satu = new lib.drop14G1();
	this.satu.name = "satu";
	this.satu.setTransform(343.8,258.25,0.436,0.436,0,0,0,124.5,63.4);
	new cjs.ButtonHelper(this.satu, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.satu},{t:this.dua},{t:this.tiga},{t:this.empat},{t:this.lima}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces10, new cjs.Rectangle(275.4,210.4,136.60000000000002,290.5), null);


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
	this.target = new lib.drag14G9();
	this.target.name = "target";
	this.target.setTransform(268.35,383.75,0.9308,0.9426,0,0,0,45.1,47);
	new cjs.ButtonHelper(this.target, 0, 1, 1);

	this.hemm = new lib.drag15G10();
	this.hemm.name = "hemm";
	this.hemm.setTransform(178,383.5,0.9294,0.9456,0,0,0,45.1,46.9);
	new cjs.ButtonHelper(this.hemm, 0, 1, 1);

	this.hemm_1 = new lib.drag15G9();
	this.hemm_1.name = "hemm_1";
	this.hemm_1.setTransform(87.3,383.5,0.9294,0.9456,0,0,0,45.1,46.9);
	new cjs.ButtonHelper(this.hemm_1, 0, 1, 1);

	this.target_1 = new lib.drag14G11();
	this.target_1.name = "target_1";
	this.target_1.setTransform(451.8,383.25,0.928,0.9416,0,0,0,45.1,47);
	new cjs.ButtonHelper(this.target_1, 0, 1, 1);

	this.target_2 = new lib.drag14G10();
	this.target_2.name = "target_2";
	this.target_2.setTransform(359.8,383.25,0.928,0.9416,0,0,0,45.1,47);
	new cjs.ButtonHelper(this.target_2, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.target_2},{t:this.target_1},{t:this.hemm_1},{t:this.hemm},{t:this.target}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces1, new cjs.Rectangle(45.4,335.8,448.1,95.39999999999998), null);


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
		  Score1.text = pieces1.skor * 33;
			if (pieces1.skor === 3) {
		    Score1.text = pieces1.skor * 33 + 1;
		  }
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
	this.drag2G1 = new lib.drag14GJud();
	this.drag2G1.name = "drag2G1";
	this.drag2G1.setTransform(-12.8,-13.1,0.8086,0.8086,0,0,0,98.2,14.5);
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
	this.instance = new lib.Bitmap145();
	this.instance.setTransform(-227,-246,3.0732,2.1098);

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
	this.instance = new lib._8();
	this.instance.setTransform(2,-141,1.0072,1.0072);

	this.instance_1 = new lib.Bitmap144();
	this.instance_1.setTransform(-242,-258,2.3782,2.1528);

	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance_1},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_2
	this.instance_2 = new lib.Tween7_1("synched",0);
	this.instance_2.setTransform(42.25,-40.25);
	this.instance_2.alpha = 0;

	this.instance_3 = new lib.Tween8copy("synched",0);
	this.instance_3.setTransform(42.25,-40.25);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:true,alpha:1},12).to({_off:false,alpha:0},12).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({_off:false},12).to({_off:true,alpha:0},12).wait(1));

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
	this.instance = new lib._9();
	this.instance.setTransform(-134,-259,1.0025,1.0025);

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
	this.shape.setTransform(-297.425,114.875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAQBUIAAgnIhMAAIAAgMIBLh0IAWAAIAABuIAYAAIAAASIgYAAIAAAngAANgyIgwBNIAzAAIAAhRg");
	this.shape_1.setTransform(-306.975,107.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgJAJQgDgEAAgFQAAgFADgDQADgEAGAAQAHAAADAEQADADAAAFQAAAFgDAEQgDAEgHAAQgGAAgDgEg");
	this.shape_2.setTransform(-297.425,55.625);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AglBKQgPgNAAgWIAVAAQAAAOAJAIQAIAIAOAAQAPAAAJgIQAIgJAAgOQAAgPgJgIQgJgIgQAAIgQAAIAAgQIAQAAQAOgBAJgHQAIgIAAgOQAAgdgdAAQgNAAgIAIQgJAIAAANIgVAAQAAgUAPgNQAOgNAWgBQAYAAANANQAOAMAAAXQAAALgHALQgHAKgNAEQAOAEAIAKQAHAKAAAPQAAAWgPAOQgOANgYAAQgXAAgOgMg");
	this.shape_3.setTransform(-307.225,48.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJAJQgDgEAAgFQAAgFADgDQADgEAGAAQAHAAADAEQADADAAAFQAAAFgDAEQgDAEgHAAQgGAAgDgEg");
	this.shape_4.setTransform(-297.425,-1.425);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("Ag0BVIAAgPIA5hBQANgNAFgKQAFgJAAgKQAAgNgIgIQgIgJgNAAQgPAAgJAJQgJAJAAARIgWAAQAAgYAQgOQAOgOAZAAQAXAAAOAMQANAMAAAVQAAAZgfAhIgtAxIBUAAIAAARg");
	this.shape_5.setTransform(-306.925,-8.825);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgJAJQgDgEAAgFQAAgFADgDQADgEAGAAQAHAAADAEQADADAAAFQAAAFgDAEQgDAEgHAAQgGAAgDgEg");
	this.shape_6.setTransform(-297.425,-112.225);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AALBVIAAiOIgqAQIAAgUIA8gWIADAAIAACog");
	this.shape_7.setTransform(-308.475,-119.55);

	this.instance = new lib.RestoreIcon("single",0);
	this.instance.setTransform(-96.85,51.9,0.8085,0.8085,0,0,0,-0.1,0);
	this.instance.alpha = 0.75;

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_8.setTransform(205.475,109.625);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgLgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_9.setTransform(192.475,109.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_10.setTransform(179.525,109.625);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgLgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_11.setTransform(166.525,109.75);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_12.setTransform(154.95,107.125);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgYA8QgMgGgGgJQgHgKAAgLIAWAAQAAALAIAGQAIAGAMAAQANAAAHgEQAHgGAAgIQAAgIgGgFQgHgFgPgDQgQgEgKgEQgJgEgFgHQgEgHAAgJQAAgQANgKQANgLATAAQAVAAANALQANALAAARIgVAAQAAgJgHgGQgIgHgLABQgLgBgHAGQgGAFAAAIQAAAIAGAEQAGAEAPAEQAQADAKAFQAKAEAFAHQAFAHAAAKQAAARgOAKQgNAKgWAAQgOAAgLgFg");
	this.shape_13.setTransform(136.125,109.75);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgLgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_14.setTransform(123.575,109.75);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAXAAIAAAQIgXAAIAABMQAAAIADAEQADADAIAAIAKgBIAAASQgJACgIAAQgOAAgGgJg");
	this.shape_15.setTransform(112.95,108.35);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgLgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_16.setTransform(102.975,109.75);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_17.setTransform(85.5,107.125);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgLgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_18.setTransform(72.225,109.75);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIADAEQAEADAHAAIAKgBIAAASQgJACgHAAQgOAAgHgJg");
	this.shape_19.setTransform(61.6,108.35);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgdIAAAAQAAgSAHgPQAIgPAMgIQANgIAQAAQAZAAAQASQAQASAAAcIAAABQAAASgHAPQgHAPgNAHQgNAJgRAAQgZAAgPgSgAgZgiQgJANAAAWQAAAVAJANQAKAMAPAAQAQABAKgNQAKgNAAgWQAAgUgLgOQgJgMgQAAQgPAAgKAMg");
	this.shape_20.setTransform(51.4,109.75);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgVAAIAAixIAVAAIAABrIALgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_21.setTransform(39.5,107.125);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgLgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_22.setTransform(20.275,109.75);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgmBIQgOgSAAgdIAAgBQAAgcAOgRQANgSAXAAQAVAAAMAPIAAhBIAWAAIAACxIgUAAIgBgOQgNAQgWAAQgVAAgOgSgAgWgJQgIALAAAYQAAAWAIAMQAJAMAPgBQAUAAAJgSIAAg4QgJgRgUAAQgPgBgJAMg");
	this.shape_23.setTransform(6.875,107.25);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgLgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_24.setTransform(-5.975,109.75);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("Ag0BYIAAisIATAAIACAOQANgRAWAAQAXAAANARQANARAAAfIAAACQAAAbgNASQgOARgVAAQgWAAgNgOIAAA8gAgegzIAAA7QAJARAUAAQAPAAAJgNQAIgMABgXQgBgVgIgMQgKgMgOAAQgUAAgJARg");
	this.shape_25.setTransform(-18.75,112.025);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_26.setTransform(-38.075,109.625);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgLgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_27.setTransform(-51.075,109.75);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_28.setTransform(-62.65,107.125);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_29.setTransform(-74.6,107.125);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_30.setTransform(-87.925,109.875);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgXBtIAAgRIAKABQAHgBAEgDQADgFAAgJIAAiLIAVAAIAACKQAAAlgggBQgHAAgGgBgAAChYQgDgEAAgFQAAgFADgEQADgEAGAAQAGAAADAEQAEAEAAAFQAAAFgEAEQgDADgGAAQgGAAgDgDg");
	this.shape_31.setTransform(-98.475,110);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_32.setTransform(-106.575,109.625);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_33.setTransform(-119.625,109.875);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAXAAIAAAQIgXAAIAABMQAAAIADAEQADADAIAAIAKgBIAAASQgJACgHAAQgPAAgGgJg");
	this.shape_34.setTransform(-130.3,108.35);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAVAAIAAB8gAgIg/QgEgEAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQACAEAAAFQAAAFgCAEQgEADgGAAQgFAAgDgDg");
	this.shape_35.setTransform(-136.7,107.475);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgmBIQgOgSAAgdIAAgBQAAgcAOgRQANgSAXAAQAVAAAMAPIAAhBIAWAAIAACxIgUAAIgBgOQgNAQgWAAQgVAAgOgSgAgWgJQgIALAAAYQAAAWAIAMQAJAMAPgBQAUAAAJgSIAAg4QgJgRgUAAQgPgBgJAMg");
	this.shape_36.setTransform(-146.625,107.25);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgdIAAgDQAAgSAHgPQAHgPANgHQANgJAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABATAKALQALALAOAAQAMAAAIgEQAIgFAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAJgCASIA+AAIAAgCQgBgRgIgIQgIgJgNAAQgMAAgJAJg");
	this.shape_37.setTransform(-164.925,109.75);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_38.setTransform(-181.675,109.625);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgLgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_39.setTransform(-198.475,109.75);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_40.setTransform(-211.825,112.075);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_41.setTransform(-227.525,109.625);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgdIAAAAQAAgSAIgPQAGgPAOgIQAMgIAQAAQAaAAAPASQAQASAAAcIAAABQAAASgHAPQgHAPgNAHQgNAJgRAAQgYAAgQgSgAgZgiQgKANAAAWQAAAVAKANQAKAMAPAAQARABAJgNQAJgNAAgWQABgUgKgOQgKgMgQAAQgPAAgKAMg");
	this.shape_42.setTransform(-238.9,109.75);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgVAAIAAixIAVAAIAABrIAMgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_43.setTransform(-250.8,107.125);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgdBQQgPgHgIgLQgIgMAAgPIAWAAQAAAQAMAJQALAIASAAQARAAAKgHQAJgHAAgMQAAgNgJgGQgIgIgWgGQgdgIgNgLQgNgMAAgRQAAgVAQgMQAQgOAZAAQARAAANAHQAOAHAIALQAHAMAAAOIgWAAQAAgPgKgJQgKgIgRgBQgQAAgJAIQgJAHAAANQAAALAJAGQAIAHAUAHQAVAFAMAGQAMAIAGAJQAFAJAAANQAAAVgQAMQgQANgaAAQgRgBgPgGg");
	this.shape_44.setTransform(-264.625,107.6);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgPQAHgPANgHQANgJAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALALAOAAQAMAAAIgEQAIgFAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAJgCASIA+AAIAAgCQgBgRgIgIQgIgJgNAAQgMgBgJAKg");
	this.shape_45.setTransform(125.675,52.95);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_46.setTransform(108.975,52.825);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAARAFAKIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_47.setTransform(92.125,52.95);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_48.setTransform(78.825,55.275);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQADAEABAFQgBAFgDAEQgDADgGAAQgGAAgDgDg");
	this.shape_49.setTransform(63.6,50.675);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_50.setTransform(53.825,55.275);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_51.setTransform(40.975,52.825);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAARAFAKIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_52.setTransform(27.975,52.95);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_53.setTransform(18.625,50.325);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_54.setTransform(9.225,53.075);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgVAAIAAixIAVAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_55.setTransform(-8.35,50.325);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_56.setTransform(-21.675,53.075);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIAEAEQADADAHAAIAKAAIAAARQgIACgJAAQgNAAgHgJg");
	this.shape_57.setTransform(-32.35,51.55);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_58.setTransform(-42.325,52.825);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_59.setTransform(-55.375,53.075);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_60.setTransform(-129.875,50.325);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgcIAAgBQAAgSAHgPQAIgPAMgIQANgIAQAAQAZAAAQASQAQARAAAdIAAABQAAASgHAPQgHAPgNAHQgNAJgRAAQgYAAgQgSgAgZgiQgKANABAWQgBAVAKANQAKAMAPAAQAQABAKgNQAKgNgBgWQAAgUgKgOQgJgMgQAAQgPAAgKAMg");
	this.shape_61.setTransform(-139.5,52.95);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgfBJIgBAPIgUAAIAAixIAVAAIAABCQAOgQAVAAQAXAAANASQANARAAAdIAAABQAAAdgNARQgNASgXAAQgWAAgNgRgAgfgBIAAA1QALAUAUgBQAOAAAJgLQAJgMgBgYQABgWgJgLQgIgLgPAAQgVAAgKATg");
	this.shape_62.setTransform(-152.6,50.45);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_63.setTransform(-169.825,52.825);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgcIAAgBQAAgSAIgPQAGgPANgIQANgIAQAAQAZAAAQASQAQARAAAdIAAABQAAASgHAPQgHAPgNAHQgNAJgRAAQgZAAgPgSgAgZgiQgKANAAAWQAAAVAKANQAKAMAPAAQAQABAKgNQAJgNAAgWQABgUgLgOQgJgMgQAAQgPAAgKAMg");
	this.shape_64.setTransform(-186.95,52.95);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIAEAEQADADAHAAIAKAAIAAARQgIACgJAAQgNAAgHgJg");
	this.shape_65.setTransform(-197.85,51.55);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_66.setTransform(-213.775,52.825);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAARAFAKIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_67.setTransform(-226.775,52.95);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_68.setTransform(-238.35,50.325);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgPQAHgPANgHQANgJAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALALAOAAQAMAAAIgEQAIgFAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAJgCASIA+AAIAAgCQgBgRgIgIQgIgJgNAAQgMgBgJAKg");
	this.shape_69.setTransform(-251.225,52.95);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgKBUIAAiVIg2AAIAAgSICBAAIAAASIg2AAIAACVg");
	this.shape_70.setTransform(-264.575,50.8);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgPIAAhNIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAYAAIAAARIgYAAIAABNQAAAHAEAEQADADAHAAIAKgBIAAARQgIADgJAAQgNAAgHgJg");
	this.shape_71.setTransform(371.3,-5.2);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_72.setTransform(361.225,-3.675);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgfBJIgBAOIgUAAIAAiwIAVAAIAABCQANgQAWAAQAXAAANARQANARAAAdIAAACQAAAdgNASQgNARgXAAQgWAAgNgRgAgfgBIAAA1QAKATAVAAQAOABAJgMQAIgMAAgYQAAgWgIgLQgIgMgPAAQgVAAgKAUg");
	this.shape_73.setTransform(348.4,-6.3);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgOQAHgQANgIQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABATAKALQALAMAOAAQAMgBAIgFQAIgEAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgQgIgKQgIgJgNAAQgMAAgJAKg");
	this.shape_74.setTransform(335.475,-3.8);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgYA8QgMgGgGgKQgHgJAAgLIAWAAQAAALAIAGQAIAHAMAAQANgBAHgFQAHgEAAgIQAAgKgGgEQgHgFgPgEQgQgDgKgEQgJgFgFgGQgEgHAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgGgLgBQgLABgHAFQgGAFAAAIQAAAIAGAEQAGADAPAEQAQAEAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgFg");
	this.shape_75.setTransform(322.975,-3.8);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_76.setTransform(313.475,-3.925);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgOQAHgQANgIQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABATAKALQALAMAOAAQAMgBAIgFQAIgEAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgQgIgKQgIgJgNAAQgMAAgJAKg");
	this.shape_77.setTransform(302.825,-3.8);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgPIAAhNIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAXAAIAAARIgXAAIAABNQAAAHADAEQADADAIAAIAKgBIAAARQgJADgHAAQgPAAgGgJg");
	this.shape_78.setTransform(292.25,-5.2);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_79.setTransform(276.325,-3.925);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgKQAPgLAaABIAVAAIAAgKQAAgLgHgHQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFALIAAABIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_80.setTransform(263.325,-3.8);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AAeA+IgehdIgdBdIgRAAIglh8IAVAAIAZBdIAdhdIAQAAIAeBfIAYhfIAWAAIglB8g");
	this.shape_81.setTransform(248.025,-3.8);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgOQAHgQANgIQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABATAKALQALAMAOAAQAMgBAIgFQAIgEAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgQgIgKQgIgJgNAAQgMAAgJAKg");
	this.shape_82.setTransform(233.125,-3.8);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AAcBZIAAhTQAAgNgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAIIAABZIgVAAIAAixIAVAAIAABEQAPgSAVAAQAoAAAAAsIAABTg");
	this.shape_83.setTransform(220.225,-6.425);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgYA8QgMgGgGgKQgHgJAAgLIAWAAQAAALAIAGQAIAHAMAAQANgBAHgFQAHgEAAgIQAAgKgGgEQgHgFgPgEQgQgDgKgEQgJgFgFgGQgEgHAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgGgLgBQgLABgHAFQgGAFAAAIQAAAIAGAEQAGADAPAEQAQAEAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgFg");
	this.shape_84.setTransform(201.675,-3.8);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgKQAPgLAaABIAVAAIAAgKQAAgLgHgHQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFALIAAABIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_85.setTransform(189.125,-3.8);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_86.setTransform(179.775,-6.425);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgOQAHgQANgIQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABATAKALQALAMAOAAQAMgBAIgFQAIgEAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgQgIgKQgIgJgNAAQgMAAgJAKg");
	this.shape_87.setTransform(170.875,-3.8);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_88.setTransform(159.35,-6.425);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_89.setTransform(140.125,-3.925);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgKQAPgLAaABIAVAAIAAgKQAAgLgHgHQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFALIAAABIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_90.setTransform(127.125,-3.8);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_91.setTransform(113.825,-1.475);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_92.setTransform(100.975,-3.925);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgOQAHgQANgIQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABATAKALQALAMAOAAQAMgBAIgFQAIgEAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgQgIgKQgIgJgNAAQgMAAgJAKg");
	this.shape_93.setTransform(88.375,-3.8);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AgmBIQgOgSAAgdIAAgBQAAgcAOgSQANgRAXAAQAVAAAMAPIAAhBIAWAAIAACwIgUAAIgBgNQgNAQgWAAQgVAAgOgSgAgWgJQgIAMAAAXQAAAVAIAMQAJAMAPAAQAUABAJgTIAAg4QgJgSgUAAQgPABgJALg");
	this.shape_94.setTransform(75.025,-6.3);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAVAAIAAB8gAgJg/QgDgEAAgFQAAgFADgEQAEgDAFAAQAGAAAEADQADAEAAAFQAAAFgDAEQgEADgGAAQgFAAgEgDg");
	this.shape_95.setTransform(59.85,-6.075);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgKQAPgLAaABIAVAAIAAgKQAAgLgHgHQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFALIAAABIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_96.setTransform(50.475,-3.8);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_97.setTransform(37.475,-3.675);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AgYA8QgMgGgGgKQgHgJAAgLIAWAAQAAALAIAGQAIAHAMAAQANgBAHgFQAHgEAAgIQAAgKgGgEQgHgFgPgEQgQgDgKgEQgJgFgFgGQgEgHAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgGgLgBQgLABgHAFQgGAFAAAIQAAAIAGAEQAGADAPAEQAQAEAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgFg");
	this.shape_98.setTransform(24.925,-3.8);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgOQAHgQANgIQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABATAKALQALAMAOAAQAMgBAIgFQAIgEAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgQgIgKQgIgJgNAAQgMAAgJAKg");
	this.shape_99.setTransform(12.775,-3.8);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AgYA8QgMgGgGgKQgHgJAAgLIAWAAQAAALAIAGQAIAHAMAAQANgBAHgFQAHgEAAgIQAAgKgGgEQgHgFgPgEQgQgDgKgEQgJgFgFgGQgEgHAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgGgLgBQgLABgHAFQgGAFAAAIQAAAIAGAEQAGADAPAEQAQAEAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgFg");
	this.shape_100.setTransform(0.275,-3.8);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_101.setTransform(-18.575,-1.475);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_102.setTransform(-31.425,-3.925);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgKQAPgLAaABIAVAAIAAgKQAAgLgHgHQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFALIAAABIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_103.setTransform(-44.425,-3.8);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AglBXIgIgBIAAgRIAGAAQALAAAGgEQAGgFAEgLIAEgNIgsh7IAXAAIAeBdIAdhdIAXAAIgyCQQgLAfgZAAg");
	this.shape_104.setTransform(-56.525,-1.275);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_105.setTransform(-74.525,-3.925);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgKQAPgLAaABIAVAAIAAgKQAAgLgHgHQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFALIAAABIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_106.setTransform(-87.525,-3.8);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AAeA+IgehdIgdBdIgRAAIglh8IAVAAIAZBdIAdhdIAQAAIAeBfIAYhfIAWAAIglB8g");
	this.shape_107.setTransform(-102.825,-3.8);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgOQAHgQANgIQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABATAKALQALAMAOAAQAMgBAIgFQAIgEAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgQgIgKQgIgJgNAAQgMAAgJAKg");
	this.shape_108.setTransform(-117.725,-3.8);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AAcBZIAAhTQAAgNgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAIIAABZIgVAAIAAixIAVAAIAABEQAPgSAVAAQAoAAAAAsIAABTg");
	this.shape_109.setTransform(-130.575,-6.425);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AAcBZIAAhTQAAgNgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAIIAABZIgVAAIAAixIAVAAIAABEQAPgSAVAAQAoAAAAAsIAABTg");
	this.shape_110.setTransform(-149.525,-6.425);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgdIAAAAQAAgTAHgOQAIgPAMgIQANgIAQAAQAZAAAQASQAQASAAAcIAAABQAAASgHAPQgHAPgNAIQgNAIgRAAQgZAAgPgSgAgZgiQgJANAAAWQAAAVAJANQAKANAPAAQAQAAAKgOQAKgMAAgWQAAgVgLgNQgJgNgQAAQgPAAgKANg");
	this.shape_111.setTransform(-162.8,-3.8);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgPIAAhNIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAYAAIAAARIgYAAIAABNQAAAHADAEQAEADAHAAIAKgBIAAARQgJADgHAAQgOAAgHgJg");
	this.shape_112.setTransform(-173.75,-5.2);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_113.setTransform(-183.725,-3.925);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgdIAAAAQAAgTAHgOQAIgPAMgIQANgIAQAAQAZAAAQASQAQASAAAcIAAABQAAASgHAPQgHAPgNAIQgNAIgRAAQgZAAgPgSgAgZgiQgJANAAAWQAAAVAJANQAKANAPAAQAQAAAKgOQAKgMAAgWQAAgVgLgNQgJgNgQAAQgPAAgKANg");
	this.shape_114.setTransform(-197,-3.8);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgeIAAgDQAAgRAHgPQAHgOAMgIQANgIAQAAQAVAAAOANQAOANABATIgUAAQgBgMgJgHQgIgJgMAAQgPAAgJAMQgJAMAAAWIAAAEQAAAVAJALQAJANAPAAQAMgBAIgGQAJgIABgKIAUAAQgBALgHAJQgGALgMAFQgLAGgNAAQgYAAgPgRg");
	this.shape_115.setTransform(-209.725,-3.8);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_116.setTransform(-228.825,-1.475);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgKQAPgLAaABIAVAAIAAgKQAAgLgHgHQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFALIAAABIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_117.setTransform(-241.675,-3.8);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_118.setTransform(-251.525,-3.925);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("Ag8BUIAAinIAwAAQAVAAARAJQAQAKAKASQAJASAAAXIAAAKQAAAYgJASQgJARgRAKQgSAKgVAAgAgmBCIAYAAQAYAAAPgQQAOgQAAgdIAAgJQAAgdgNgQQgOgQgYAAIgaAAg");
	this.shape_119.setTransform(-263.625,-5.95);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAVAAIAAB8gAgJg/QgDgEAAgFQAAgFADgEQAEgDAFAAQAGAAAEADQADAEAAAFQAAAFgDAEQgEADgGAAQgFAAgEgDg");
	this.shape_120.setTransform(-74.7,-62.825);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_121.setTransform(-84.075,-60.55);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_122.setTransform(-97.025,-60.425);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgJQgHgKAAgLIAWAAQAAALAIAGQAIAGAMAAQANABAHgGQAHgEAAgJQAAgJgGgEQgHgFgPgDQgQgEgKgEQgJgFgFgHQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgHgLAAQgLAAgHAGQgGAFAAAIQAAAIAGAEQAGAEAPAEQAQADAKAFQAKAEAFAHQAFAHAAAKQAAARgOAKQgNAKgWAAQgOAAgLgGg");
	this.shape_123.setTransform(-109.625,-60.55);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgPQAHgOANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALALAOAAQAMABAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgQgIgKQgIgIgNgBQgMAAgJAKg");
	this.shape_124.setTransform(-121.775,-60.55);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgJQgHgKAAgLIAWAAQAAALAIAGQAIAGAMAAQANABAHgGQAHgEAAgJQAAgJgGgEQgHgFgPgDQgQgEgKgEQgJgFgFgHQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgHgLAAQgLAAgHAGQgGAFAAAIQAAAIAGAEQAGAEAPAEQAQADAKAFQAKAEAFAHQAFAHAAAKQAAARgOAKQgNAKgWAAQgOAAgLgGg");
	this.shape_125.setTransform(-134.225,-60.55);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_126.setTransform(-153.125,-58.225);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_127.setTransform(-165.975,-60.675);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_128.setTransform(-178.975,-60.55);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AglBXIgIgBIAAgRIAGAAQALAAAGgEQAGgFAEgLIAEgNIgsh7IAXAAIAeBdIAdhdIAXAAIgyCQQgLAfgZAAg");
	this.shape_129.setTransform(-191.075,-58.025);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_130.setTransform(-209.025,-60.675);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_131.setTransform(-222.025,-60.55);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("AAeA/IgeheIgdBeIgRAAIglh8IAVAAIAZBcIAdhcIAQAAIAeBeIAYheIAWAAIglB8g");
	this.shape_132.setTransform(-237.325,-60.55);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgPQAHgOANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALALAOAAQAMABAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgQgIgKQgIgIgNgBQgMAAgJAKg");
	this.shape_133.setTransform(-252.275,-60.55);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("AAcBZIAAhTQAAgNgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAIIAABZIgVAAIAAixIAVAAIAABEQAPgSAVAAQAoAAAAAsIAABTg");
	this.shape_134.setTransform(-265.125,-63.175);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgJQgHgKAAgLIAWAAQAAALAIAGQAIAGAMABQANAAAHgGQAHgFAAgHQAAgKgGgEQgHgFgPgEQgQgDgKgEQgJgFgFgHQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgHgLAAQgLAAgHAGQgGAFAAAIQAAAIAGAEQAGADAPAFQAQADAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgGg");
	this.shape_135.setTransform(391.025,-117.35);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_136.setTransform(378.475,-117.35);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_137.setTransform(369.125,-119.975);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALAMAOAAQAMAAAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgRgIgJQgIgIgNgBQgMAAgJAKg");
	this.shape_138.setTransform(360.175,-117.35);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgVAAIAAixIAVAAIAABrIALgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_139.setTransform(348.65,-119.975);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_140.setTransform(330.7,-119.975);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQADAEABAFQgBAFgDAEQgDADgGAAQgGAAgDgDg");
	this.shape_141.setTransform(321,-119.625);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIAEAEQADADAHABIAKgBIAAARQgIACgJAAQgNAAgHgJg");
	this.shape_142.setTransform(313.9,-118.75);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgJQgHgKAAgLIAWAAQAAALAIAGQAIAGAMABQANAAAHgGQAHgFAAgHQAAgKgGgEQgHgFgPgEQgQgDgKgEQgJgFgFgHQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgHgLAAQgLAAgHAGQgGAFAAAIQAAAIAGAEQAGADAPAFQAQADAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgGg");
	this.shape_143.setTransform(304.275,-117.35);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAVAAIAAB8gAgIg/QgEgEAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQACAEAAAFQAAAFgCAEQgEADgGAAQgFAAgDgDg");
	this.shape_144.setTransform(295.3,-119.625);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_145.setTransform(288.975,-117.475);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALAMAOAAQAMAAAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgRgIgJQgIgIgNgBQgMAAgJAKg");
	this.shape_146.setTransform(278.325,-117.35);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAXAAIAAAQIgXAAIAABMQAAAIAEAEQACADAIABIAKgBIAAARQgJACgIAAQgOAAgGgJg");
	this.shape_147.setTransform(267.75,-118.75);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_148.setTransform(259.1,-119.975);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_149.setTransform(245.825,-117.35);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_150.setTransform(235.975,-117.475);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_151.setTransform(224.875,-117.35);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_152.setTransform(213.3,-119.975);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_153.setTransform(195.3,-119.975);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_154.setTransform(182.025,-117.35);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAXAAIAAAQIgXAAIAABMQAAAIAEAEQACADAIABIAKgBIAAARQgJACgIAAQgOAAgGgJg");
	this.shape_155.setTransform(171.45,-118.75);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("AgoAvQgQgRAAgdIAAgBQAAgSAHgPQAIgPAMgIQANgIAQAAQAZAAAQASQAQARAAAdIAAACQAAARgHAPQgHAOgNAJQgNAIgRAAQgZAAgPgSgAgZghQgJAMAAAXQAAAUAJANQAKANAPAAQAQgBAKgNQAKgMAAgWQAAgVgLgMQgJgOgQAAQgPAAgKAOg");
	this.shape_156.setTransform(161.2,-117.35);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_157.setTransform(149.3,-119.975);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_158.setTransform(129.925,-117.225);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FFFFFF").s().p("AgXBsIAAgQIAKABQAHAAAEgFQADgDAAgKIAAiLIAVAAIAACLQAAAjggABQgHAAgGgDgAAChZQgDgDAAgFQAAgFADgEQADgDAGgBQAGABADADQAEAEAAAFQAAAFgEADQgDAEgGAAQgGAAgDgEg");
	this.shape_159.setTransform(119.375,-117.1);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_160.setTransform(111.225,-117.225);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_161.setTransform(98.225,-117.475);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALAMAOAAQAMAAAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgRgIgJQgIgIgNgBQgMAAgJAKg");
	this.shape_162.setTransform(85.675,-117.35);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_163.setTransform(68.975,-117.475);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_164.setTransform(46.075,-117.475);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_165.setTransform(33.075,-117.35);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FFFFFF").s().p("AAeA/IgeheIgdBeIgRAAIglh8IAVAAIAZBcIAdhcIAQAAIAeBeIAYheIAWAAIglB8g");
	this.shape_166.setTransform(17.775,-117.35);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALAMAOAAQAMAAAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgRgIgJQgIgIgNgBQgMAAgJAKg");
	this.shape_167.setTransform(2.825,-117.35);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#FFFFFF").s().p("AAcBZIAAhTQAAgNgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAIIAABZIgVAAIAAixIAVAAIAABEQAPgSAVAAQAoAAAAAsIAABTg");
	this.shape_168.setTransform(-10.025,-119.975);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_169.setTransform(-27.75,-119.975);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAVAAIAAB8gAgJg/QgDgEAAgFQAAgFADgEQAEgDAFAAQAGAAADADQAEAEAAAFQAAAFgEAEQgDADgGAAQgFAAgEgDg");
	this.shape_170.setTransform(-37.45,-119.625);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIAEAEQADADAHABIAKgBIAAARQgIACgJAAQgNAAgHgJg");
	this.shape_171.setTransform(-44.5,-118.75);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgJQgHgKAAgLIAWAAQAAALAIAGQAIAGAMABQANAAAHgGQAHgFAAgHQAAgKgGgEQgHgFgPgEQgQgDgKgEQgJgFgFgHQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgHgLAAQgLAAgHAGQgGAFAAAIQAAAIAGAEQAGADAPAFQAQADAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgGg");
	this.shape_172.setTransform(-54.125,-117.35);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAVAAIAAB8gAgJg/QgDgEAAgFQAAgFADgEQAEgDAFAAQAGAAADADQAEAEAAAFQAAAFgEAEQgDADgGAAQgFAAgEgDg");
	this.shape_173.setTransform(-63.1,-119.625);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_174.setTransform(-69.425,-117.475);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALAMAOAAQAMAAAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgRgIgJQgIgIgNgBQgMAAgJAKg");
	this.shape_175.setTransform(-80.125,-117.35);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAXAAIAAAQIgXAAIAABMQAAAIAEAEQADADAHABIAKgBIAAARQgIACgJAAQgNAAgHgJg");
	this.shape_176.setTransform(-90.65,-118.75);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_177.setTransform(-99.3,-119.975);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_178.setTransform(-112.575,-117.35);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_179.setTransform(-122.425,-117.475);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_180.setTransform(-133.525,-117.35);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgVAAIAAixIAVAAIAABrIALgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_181.setTransform(-145.1,-119.975);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgVAAIAAixIAVAAIAABrIALgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_182.setTransform(-163.1,-119.975);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_183.setTransform(-176.375,-117.35);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAXAAIAAAQIgXAAIAABMQAAAIADAEQADADAIABIAKgBIAAARQgJACgHAAQgPAAgGgJg");
	this.shape_184.setTransform(-187,-118.75);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#FFFFFF").s().p("AgoAvQgQgRAAgdIAAgBQAAgSAHgPQAIgPANgIQAMgIAQAAQAaAAAPASQAQARAAAdIAAACQAAARgHAPQgHAOgNAJQgNAIgRAAQgZAAgPgSgAgZghQgJAMAAAXQAAAUAJANQAKANAPAAQARgBAJgNQAKgMAAgWQgBgVgJgMQgKgOgQAAQgPAAgKAOg");
	this.shape_185.setTransform(-197.25,-117.35);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_186.setTransform(-209.15,-119.975);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_187.setTransform(-228.825,-115.025);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_188.setTransform(-241.675,-117.35);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_189.setTransform(-251.525,-117.475);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#FFFFFF").s().p("Ag8BUIAAinIAwAAQAVAAARAJQAQAKAKASQAJASAAAXIAAAKQAAAYgJASQgJASgRAJQgSAKgVAAgAgmBCIAYAAQAYAAAPgQQAOgQAAgeIAAgJQAAgcgNgQQgOgQgYAAIgaAAg");
	this.shape_190.setTransform(-263.625,-119.5);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgJgJQgIgKgVAAQgZAAgOAYIAACmIg/AAIAAjtIA7AAIACAcQAaggApAAQAnAAARAWQATAWAAAsIAACZg");
	this.shape_191.setTransform(212.35,-177.25);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#FFFFFF").s().p("AgfCmIAAjtIA/AAIAADtgAgZhtQgKgJABgOQAAgPAJgJQAJgJAQAAQAQAAAKAJQAKAJAAAPQAAAOgKAJQgKAKgQAAQgPAAgKgKg");
	this.shape_192.setTransform(193.8,-181.725);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#FFFFFF").s().p("AhSBnQgXgUABgfQAAgmAcgTQAcgUA0AAIAdAAIAAgOQAAgQgJgKQgJgKgRAAQgPAAgKAHQgJAIAAAOIhAAAQABgVANgSQAMgRAYgKQAWgKAcAAQAtAAAZAWQAaAWAAAoIAABmQAAAiAKARIAAAEIhAAAQgFgJgCgNQgXAagkAAQgjAAgXgUgAgpAsIAAADQAAAMAIAIQAIAIAPAAQANAAAMgHQAMgGAGgKIAAgpIgYAAQgvAAgDAhg");
	this.shape_193.setTransform(175.75,-177.025);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#FFFFFF").s().p("ABqB5IAAiWQAAgUgHgKQgIgKgUAAQgdAAgLAcIAACiIg+AAIAAiWQAAgVgIgJQgIgKgUAAQgbABgMAWIAACnIg/AAIAAjtIA7AAIACAbQAZgfArAAQAtAAARAlQAZglAvAAQAmAAATAWQATAXAAAuIAACWg");
	this.shape_194.setTransform(144.275,-177.25);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#FFFFFF").s().p("AhCB5IAAjtIA8AAIABAdQATghAhAAQALAAAJADIgBA9QgNgCgJAAQglAAgJAYIAACbg");
	this.shape_195.setTransform(117.5,-177.25);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#FFFFFF").s().p("AhKBbQghggAAg1IAAgGQAAgjAOgcQAOgdAZgPQAZgPAgAAQAxAAAcAfQAcAeAAA5IAAAZIiXAAQADAXAQAOQAPAOAXAAQAlAAAUgbIAgAjQgPAVgYALQgYALgeAAQgzAAghgggAgbg6QgMANgDAXIBXAAIAAgFQAAgVgLgLQgLgMgUAAQgSAAgMANg");
	this.shape_196.setTransform(96.475,-177.025);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#FFFFFF").s().p("Ah2CgIAAk/IBwAAQA5AAAfAWQAeAXAAArQAAAXgMASQgNASgVAIQAZAFAOATQAOATAAAbQAAAugeAYQgdAXg2ABgAg0BrIA4AAQAXAAANgLQANgLAAgUQAAgsgtAAIg8AAgAg0gZIAxAAQAxgBAAgnQAAgVgNgKQgNgKgaAAIguAAg");
	this.shape_197.setTransform(70.025,-181.125);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#FFFFFF").s().p("AAlCoIg8hfIgXAXIAABIIg/AAIAAlPIA/AAIAAC5IANgPIA7hHIBNAAIhWBiIBdCKg");
	this.shape_198.setTransform(33.65,-182);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#FFFFFF").s().p("AhRBjQgUgWgBgqIAAibIBAAAIAACZQAAAkAiABQAfAAAMgXIAAinIBAAAIAADsIg8AAIgCgYQgXAdgpAAQgmAAgUgWg");
	this.shape_199.setTransform(7.55,-176.8);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#FFFFFF").s().p("Ag4DSIAAgyQALACAJAAQAcAAAAgfIAAj6IA/AAIAAD6QAAAngVAWQgVAWgmAAQgRAAgOgEgAgDidQgKgJAAgOQAAgPAKgJQAJgJAQAAQAQAAAKAJQAJAJAAAPQAAAOgJAJQgKAKgQAAQgQAAgJgKg");
	this.shape_200.setTransform(-13.1,-176.925);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgJgJQgIgKgVAAQgaAAgNAYIAACmIhAAAIAAjtIA8AAIACAcQAaggAqAAQAmAAARAWQATAWAAAsIAACZg");
	this.shape_201.setTransform(-29.4,-177.25);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#FFFFFF").s().p("AhRBjQgUgWgBgqIAAibIBAAAIAACZQAAAkAhABQAgAAAMgXIAAinIA/AAIAADsIg7AAIgCgYQgYAdgoAAQgmAAgUgWg");
	this.shape_202.setTransform(-54.6,-176.8);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#FFFFFF").s().p("AgjBTIAAh/IgjAAIAAgvIAjAAIAAg6IA/AAIAAA6IAoAAIAAAvIgoAAIAAB1QAAANAFAGQAFAGAOAAQAKAAAJgCIAAAwQgTAGgUAAQhCAAgBhDg");
	this.shape_203.setTransform(-75.025,-179.725);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#FFFFFF").s().p("AhKBbQghggAAg1IAAgGQAAgjAOgcQAOgdAZgPQAZgPAgAAQAxAAAcAfQAcAeAAA5IAAAZIiXAAQADAXAQAOQAPAOAXAAQAlAAAUgbIAgAjQgPAVgYALQgYALgeAAQgzAAghgggAgbg6QgMANgDAXIBXAAIAAgFQAAgVgLgLQgLgMgUAAQgSAAgMANg");
	this.shape_204.setTransform(-94.175,-177.025);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#FFFFFF").s().p("Ah5CgIAAk/IB7AAQAlAAAaANQAcANAOAZQAPAYABAfQAAAvghAaQggAbg5AAIg4AAIAABxgAg3gFIA5AAQAaAAAOgNQAOgMAAgXQAAgXgOgPQgOgOgYgBIg7AAg");
	this.shape_205.setTransform(-120.45,-181.125);

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
(lib.game17_temp = function(mode,startPosition,loop) {
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
		var pieces = root.pieces;
		var slots = root.slots;
		var restart = root.restart;
		var winMessage = root.winMessage;
		var Score = root.Score;
		var positions1 = [];
		
		root.stop();
		
		root.btnMenuDasar1.on("click", function () {
		  window.location.replace("../menu/index.html");
		});
		
		root.btnNextDasar1.on("click", function () {
		  window.location.replace("../game18/index.html");
		});
		
		root.btnBack3.on("click", function () {
		  window.location.replace("../game16/index.html");
		});
		
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
	this.winMessage.setTransform(397.5516,164.75,0.9382,0.9382);

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
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJApQgKAAgHgGQgHgHABgKQAAgMALgGQAKgHAQAAIAOAAIAAgHQACgHgEgEQgEgEgGAAQgHAAgFADQgFAEgBAFIgOAAQACgGAEgGQAFgFAHgDQAHgDAIAAQAMAAAHAIQAHAHgBAMIgGAmIgBAGIABAIIAAABIgOAAIgBgEIABgFQgLAKgKAAIgBAAgAgLAFQgGAEgBAHQgCAGAEAEQADADAGAAQAHABAEgEQAGgDAFgFIACgRIgKAAQgLAAgHAEg");
	this.shape_1.setTransform(164.2,210.7761);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgZAeQgIgKABgRIAAgDQACgLAGgKQAFgJAJgFQAIgFAIAAQANAAAHAIQAHAIAAANIAAAKIgBAFIgzAAQgBALAFAHQAFAIAJAAQALAAAKgKIAIAGQgFAHgIAEQgIAEgJAAQgOAAgJgLgAgIgXQgGAFgDAMIAlAAIABgBQABgJgEgHQgFgGgHAAIgCAAQgGAAgGAGg");
	this.shape_2.setTransform(156.5888,210.7977);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgOA5QgKgBgHgIQgHgIAAgOIABgLQABgMAFgIQAGgKAHgFQAHgFAKAAQAMABAHAJIAIgpIANAAIgUBvIgLAAIABgIQgJAKgMAAIgCAAgAgNgIQgFAFgEAHQgDAJAAAKQAAAKAEAGQAEAGAIAAQAKABAJgMIAHgkQgFgLgLAAQgIAAgGAFg");
	this.shape_3.setTransform(148.8,209.2011);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgPA2IAOhOIAMAAIgNBOgAACgnQgCgCAAgEQAAgDACgDQACgCAEAAQADAAADACQACACAAAEQAAADgCACQgDADgDAAQgEAAgCgCg");
	this.shape_4.setTransform(142.7,209.3458);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgEApQgKAAgHgFQgIgGgDgJQgDgJABgLQABgLAFgKQAGgJAJgGQAIgFAKAAQAKAAAHAFQAHAGAEAJQADAJgBALIAAABQgCALgFAJQgGAKgIAFQgIAFgIAAIgCAAgAgMgVQgHAIgCANIAAACIAAAJQABAJAEAEQAFAGAHAAQAGAAAFgDQAGgEAEgHQADgHACgIIAAgKQgBgKgFgFQgEgFgHAAIgBAAQgJAAgHAIg");
	this.shape_5.setTransform(136.5114,210.8);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAMAoIAJgzIAAgGQgBgLgLAAQgLAAgJANIgKA3IgNAAIAOhOIAMAAIgCAKQAKgMAOABQALAAAFAHQAGAIgCANIgIAzg");
	this.shape_6.setTransform(128.0161,210.724);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgPA2IAOhOIAMAAIgNBOgAADgnQgDgCAAgEQAAgDADgDQABgCAEAAQAEAAACACQACACAAAEQAAADgCACQgCADgEAAQgEAAgBgCg");
	this.shape_7.setTransform(122.65,209.3458);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgYAoIANhOIAMAAIgBAJQAIgKALgBIAGABIgBAOIgGgBQgNgBgGAMIgKA3g");
	this.shape_8.setTransform(118.475,210.7);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgIA3QgKgBgHgEQgHgFgEgJQgFgIAAgLQAAgGABgGIABgHQADgYAOgOQANgOASAAQAPAAAJAKQAJAJAAARIgNAAQgBgWgRgCIgCAAQgNgBgJALQgKALgCASIgCAKIAAAHQgBANAFAIQAGAIAKAAQAKABAHgGQAIgGAEgNIANAAQgDARgMAJQgMAKgOAAIgCAAg");
	this.shape_9.setTransform(111.2417,209.4253);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgPAmQgHgEgFgGQgDgGAAgHIANAAQABAHAFAEQAEAEAIAAQAHAAAGgDQAEgDAAgFQAAgGgEgDQgEgDgKgDQgKgBgGgDQgGgDgDgEQgDgEAAgGQAAgKAIgGQAJgHALAAQAOAAAJAHQAHAGABAMIgOAAQAAgGgEgEQgGgEgHAAQgGAAgEADQgFADABAFQAAAGADACQAEADAKACQAKACAGADQAGACADAFQAEAEAAAGQAAALgJAGQgIAHgOAAQgIAAgIgDg");
	this.shape_10.setTransform(195.55,190.8);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_11.setTransform(187.625,190.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_12.setTransform(181.725,189.125);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgXAfQgKgLABgSIAAgCQAAgLAEgKQAEgJAJgFQAIgFAIAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAIQAIAHAIAAQAIAAAEgDQAGgDADgFIAIAGQgKAQgTAAQgPAAgLgKgAgMgXQgFAGgCALIAnAAIAAgBQAAgLgGgFQgEgGgJAAQgHAAgGAGg");
	this.shape_13.setTransform(176.05,190.8);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAYA1IglgxIgNANIAAAkIgOAAIAAhpIAOAAIAAA0IAvg0IARAAIgpAvIAsA6g");
	this.shape_14.setTransform(167.925,189.425);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_15.setTransform(155.625,189.125);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCADgEgBQgDABgCgDg");
	this.shape_16.setTransform(149.5,189.35);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgCAsQgEgFAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAALIgLABQgJAAgEgGg");
	this.shape_17.setTransform(145.025,189.9);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgPAmQgIgEgDgGQgFgGAAgHIAOAAQAAAHAFAEQAGAEAHAAQAIAAAEgDQAFgDAAgFQAAgGgEgDQgEgDgKgDQgKgBgGgDQgGgDgDgEQgDgEAAgGQAAgKAJgGQAHgHANAAQANAAAIAHQAJAGgBAMIgNAAQAAgGgFgEQgFgEgGAAQgHAAgEADQgEADgBAFQAAAGAFACQADADAJACQALACAGADQAHACACAFQADAEAAAGQABALgJAGQgJAHgNAAQgIAAgIgDg");
	this.shape_18.setTransform(138.9,190.8);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCADgEgBQgDABgCgDg");
	this.shape_19.setTransform(133.25,189.35);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgFALIAAA3g");
	this.shape_20.setTransform(129.25,190.725);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgXAfQgJgLgBgSIAAgCQAAgLAFgKQAFgJAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAIQAHAHAIAAQAHAAAGgDQAEgDAEgFIAJAGQgKAQgVAAQgPAAgKgKgAgMgXQgFAGgBALIAmAAIAAgBQAAgLgFgFQgGgGgIAAQgHAAgGAGg");
	this.shape_21.setTransform(122.45,190.8);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgCAsQgEgFAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAALIgLABQgJAAgEgGg");
	this.shape_22.setTransform(115.775,189.9);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_23.setTransform(110.275,189.125);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_24.setTransform(101.875,190.8);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_25.setTransform(95.65,190.725);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_26.setTransform(88.625,190.8);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAYA1IglgxIgNANIAAAkIgOAAIAAhpIAOAAIAAA0IAvg0IARAAIgpAvIAsA6g");
	this.shape_27.setTransform(80.475,189.425);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQAAgIgDgEQgEgEgHAAQgGAAgEADQgEAEgEAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_28.setTransform(402.9,208.675);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgWAgQgIgGABgJQgBgMAKgFQAIgHAPAAIANAAIAAgGQAAgGgFgEQgDgEgIAAQgGAAgEADQgFADgBAFIgMAAQAAgFAEgFQAEgGAHgDQAHgCAGAAQANgBAHAHQAIAHAAAKIAAAhQAAALADAGIAAABIgOAAIgBgIQgKAJgKAAQgMAAgGgGgAgRAPQAAAGAEADQAEADAGABQAFAAAGgDQAFgEADgEIAAgQIgKAAQgXAAAAAOg");
	this.shape_29.setTransform(395.25,208.75);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AASAlIgSg3IgRA3IgKAAIgWhJIANAAIAOA2IASg2IAJAAIARA3IAPg3IAMAAIgVBJg");
	this.shape_30.setTransform(386.2,208.75);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgKgEgFQgFgFgIAAQgHAAgFAFg");
	this.shape_31.setTransform(377.325,208.75);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAZAyIAAguIgxAAIAAAuIgNAAIAAhjIANAAIAAArIAxAAIAAgrIANAAIAABjg");
	this.shape_32.setTransform(368.525,207.475);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AAQA1IgZgiIgIAIIAAAaIgNAAIAAhoIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgArg");
	this.shape_33.setTransform(357.025,207.2);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgGAzIAAhKIANAAIAABKgAgFglQgBgCgBgDQABgDABgCQACgDADAAQAEAAABADQADACAAADQAAADgDACQgBACgEAAQgDAAgCgCg");
	this.shape_34.setTransform(351.3,207.4);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_35.setTransform(347.125,207.925);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgDgFQgFgGAAgHIANAAQABAGAEAFQAFADAHAAQAHAAAFgDQADgDAAgEQABgFgEgEQgEgCgJgDQgJgCgGgCQgGgCgCgEQgDgEAAgGQAAgJAHgGQAJgHAKABQANgBAIAHQAIAGAAALIgNAAQAAgGgEgDQgFgEgHAAQgGAAgEADQgDADAAAFQAAAEADADIANAEQAJACAFADQAHACACAFQAEADAAAHQgBAKgHAGQgJAFgMAAQgIABgHgEg");
	this.shape_36.setTransform(341.45,208.75);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgFAzIAAhKIALAAIAABKgAgEglQgCgCAAgDQAAgDACgCQACgDACAAQAEAAABADQACACAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_37.setTransform(336.15,207.4);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgGAAQgMAAgEAKIAAA0g");
	this.shape_38.setTransform(332.45,208.675);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgKgEgFQgFgFgIAAQgHAAgFAFg");
	this.shape_39.setTransform(326.075,208.75);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_40.setTransform(319.825,207.925);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AAQA1IgZgiIgIAIIAAAaIgNAAIAAhoIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgArg");
	this.shape_41.setTransform(314.675,207.2);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgXAgQgGgGAAgJQAAgMAJgFQAIgHAPAAIANAAIAAgGQAAgGgFgEQgEgEgHAAQgGAAgEADQgGADAAAFIgMAAQAAgFAEgFQAEgGAGgDQAHgCAHAAQANgBAHAHQAIAHAAAKIAAAhQAAALACAGIAAABIgNAAIgBgIQgKAJgLAAQgLAAgHgGgAgRAPQAAAGAEADQAEADAGABQAFAAAGgDQAFgEADgEIAAgQIgKAAQgXAAAAAOg");
	this.shape_42.setTransform(306.85,208.75);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgGAAQgMAAgEAKIAAA0g");
	this.shape_43.setTransform(301.05,208.675);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgXAgQgGgGgBgJQABgMAIgFQAJgHAPAAIAMAAIAAgGQAAgGgEgEQgEgEgHAAQgGAAgFADQgEADAAAFIgNAAQAAgFAEgFQAEgGAGgDQAIgCAHAAQAMgBAHAHQAIAHAAAKIAAAhQAAALACAGIAAABIgNAAIgCgIQgIAJgMAAQgKAAgIgGgAgRAPQAAAGAEADQAEADAGABQAFAAAGgDQAFgEACgEIAAgQIgKAAQgWAAAAAOg");
	this.shape_44.setTransform(294.5,208.75);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AAWAyIgigvIgMANIAAAiIgNAAIAAhjIANAAIAAAxIArgxIAQAAIgmAsIApA3g");
	this.shape_45.setTransform(286.875,207.475);

	this.instance_1 = new lib.infod();
	this.instance_1.setTransform(253.05,376.5,0.8839,0.8839);

	this.instance_2 = new lib.infod();
	this.instance_2.setTransform(556.65,384.6,0.8839,0.8839);

	this.g3 = new lib.g3();
	this.g3.name = "g3";
	this.g3.setTransform(851,270.5);

	this.g2 = new lib.g2();
	this.g2.name = "g2";
	this.g2.setTransform(735,270.5);

	this.g1 = new lib.g1a();
	this.g1.name = "g1";
	this.g1.setTransform(613,270.5);

	this.instance_3 = new lib.info();
	this.instance_3.setTransform(801.15,190.3);

	this.drag2G1 = new lib.drag7G7();
	this.drag2G1.name = "drag2G1";
	this.drag2G1.setTransform(854.45,223.6,0.8086,0.8086,0,0,0,82.2,26.7);
	new cjs.ButtonHelper(this.drag2G1, 0, 1, 1);

	this.cobaha = new lib.bg5();
	this.cobaha.name = "cobaha";
	this.cobaha.setTransform(675.75,358.05);

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

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AABAOQAIgKAAgLIAAgMIAPAAIAAALQAAAIgEAHQgEAIgGAFgAgXAOQAHgKABgLIAAgMIAPAAIAAALQAAAIgEAHQgEAIgHAFg");
	this.shape_46.setTransform(714.625,113.525);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_47.setTransform(709.625,118.125);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_48.setTransform(702.85,119.675);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_49.setTransform(696.075,118.125);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgGAAgIIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgFQgEgEAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgGgFgFQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEADALACQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKABgIgEg");
	this.shape_50.setTransform(685.425,119.75);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgbAnQgJgIAAgLQAAgOALgGQAKgJASAAIAPAAIAAgHQAAgHgEgFQgFgFgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgHAFgGQAEgGAIgEQAJgDAIAAQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgHQgLAMgOgBQgNAAgIgHgAgUASQgBAHAFAEQAFAEAIABQAGAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_51.setTransform(676.4,119.75);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_52.setTransform(669.725,117.875);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgLAJgFQAKgHAJABQASAAAJALQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLASgXgBQgRABgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_53.setTransform(663.225,119.75);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_54.setTransform(654.925,117.875);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AAvAuIAAg7QAAgJgEgFQgEgFgLAAQgIAAgGAFQgGAGAAAIIAAA7IgPAAIAAg6QAAgUgTAAQgPAAgFANIAABBIgQAAIAAhZIAOAAIABAKQAKgMAQAAQAUAAAFAPQAFgHAHgEQAHgEAKAAQAdAAABAgIAAA7g");
	this.shape_55.setTransform(638.4,119.675);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgLQAAgOALgGQAKgJATAAIAOAAIAAgHQABgHgFgFQgFgFgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAEgGAIgEQAJgDAIAAQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgHQgLAMgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAEAIABQAGAAAGgFQAHgDACgGIAAgTIgMAAQgbAAAAARg");
	this.shape_56.setTransform(626.3,119.75);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_57.setTransform(619.625,117.875);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgLQAAgOALgGQAKgJATAAIAPAAIAAgHQAAgHgFgFQgFgFgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgHAEgGQAFgGAJgEQAIgDAJAAQAPgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgHQgLAMgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAEAIABQAGAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_58.setTransform(612.9,119.75);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgVIAAgBQAAgUAKgMQAKgMAQAAQAOgBAKALIAAguIAPAAIAAB+IgOAAIgBgKQgJAMgQgBQgPAAgKgMgAgPgGQgHAIAAARQAAAQAHAIQAGAJAKAAQAPgBAHgNIAAgnQgHgOgPAAQgKABgGAIg");
	this.shape_59.setTransform(603.275,117.95);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgGAAgIIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgFQgEgEAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgGgFgFQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEADALACQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKABgIgEg");
	this.shape_60.setTransform(590.125,119.75);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgLAJgFQAKgHAJABQASAAAJALQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLASgXgBQgRABgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_61.setTransform(581.325,119.75);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_62.setTransform(574.675,118.125);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgGAAgIIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgFQgEgEAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgGgFgFQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEADALACQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKABgIgEg");
	this.shape_63.setTransform(568.225,119.75);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgLAJgFQAKgHAJABQASAAAJALQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLASgXgBQgRABgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_64.setTransform(559.425,119.75);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AglA/IAAh7IAOAAIABAKQAKgMAPAAQAQAAAKAMQAJAMAAAWIAAACQAAATgJAMQgKANgQAAQgPAAgJgKIAAArgAgVglIAAAqQAGAMAOAAQAKABAHgJQAGgJABgQQgBgPgGgJQgHgJgKAAQgOAAgGAMg");
	this.shape_65.setTransform(550.25,121.4);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgGAAgIIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgFQgEgEAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgGgFgFQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEADALACQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKABgIgEg");
	this.shape_66.setTransform(540.925,119.75);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_67.setTransform(527.65,119.675);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgLQAAgOALgGQAKgJATAAIAOAAIAAgHQABgHgFgFQgFgFgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAEgGAIgEQAJgDAIAAQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgHQgLAMgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAEAIABQAGAAAGgFQAHgDACgGIAAgTIgMAAQgbAAAAARg");
	this.shape_68.setTransform(518.3,119.75);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_69.setTransform(509.975,117.875);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgbAnQgJgIAAgLQAAgOALgGQAKgJASAAIAPAAIAAgHQAAgHgEgFQgFgFgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgHAFgGQAEgGAIgEQAJgDAIAAQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgHQgLAMgOgBQgNAAgIgHgAgUASQgBAHAFAEQAFAEAIABQAGAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_70.setTransform(500.45,119.75);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AglA/IAAh7IAOAAIABAKQAJgMAQAAQAQAAAKAMQAJAMAAAWIAAACQAAATgJAMQgKANgQAAQgPAAgKgKIAAArgAgWglIAAAqQAIAMAOAAQAJABAHgJQAHgJgBgQQABgPgHgJQgHgJgJAAQgOAAgIAMg");
	this.shape_71.setTransform(491.25,121.4);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgJALgQAAQgOAAgIgIg");
	this.shape_72.setTransform(481.625,119.825);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_73.setTransform(474.525,119.675);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgLAJgFQAKgHAJABQASAAAJALQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLASgXgBQgRABgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_74.setTransform(466.775,119.75);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgJgFgFQgEgFgLAAQgIAAgGAFQgFAGgCAIIAAA7IgOAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgPAAIAAhZIAPAAIAAAKQAKgMARAAQASAAAHAPQAEgHAHgEQAHgEAKAAQAeAAAAAgIAAA7g");
	this.shape_75.setTransform(454.75,119.675);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgSA7QgKgEgFgHIAJgKQAKANAOAAQAKAAAGgGQAHgHgBgLIAAgIQgJAKgPAAQgPAAgKgMQgKgMAAgWQAAgVAKgMQAJgMARAAQAPAAAJALIABgKIAOAAIAABXQAAASgKAKQgLAKgRAAQgJgBgJgEgAgPgpQgGAJgBARQABAPAGAIQAGAJAKAAQAPgBAGgNIAAgnQgGgOgPAAQgKABgGAIg");
	this.shape_76.setTransform(438.15,121.45);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_77.setTransform(428.85,119.675);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgLQAAgOALgGQALgJASAAIAPAAIAAgHQAAgHgFgFQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAEgGQAGgGAIgEQAIgDAJAAQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgHQgLAMgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAEAHABQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_78.setTransform(419.5,119.75);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgbA/IgFgBIAAgNIAEABQAIAAAEgEQAEgDADgIIAEgJIgghYIAQAAIAWBCIAVhCIAQAAIgkBnQgHAWgTAAg");
	this.shape_79.setTransform(410.875,121.575);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAAAAgIAAA7g");
	this.shape_80.setTransform(397.95,119.675);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgLQAAgOALgGQAKgJATAAIAOAAIAAgHQABgHgFgFQgFgFgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAFgGAHgEQAJgDAIAAQAQgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgHQgLAMgNgBQgOAAgJgHgAgUASQAAAHAEAEQAFAEAIABQAGAAAGgFQAHgDACgGIAAgTIgMAAQgaAAAAARg");
	this.shape_81.setTransform(388.6,119.75);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AAVAtIgVhDIgVBDIgMAAIgahZIAPAAIASBDIAVhDIALAAIAVBEIAShEIAPAAIgaBZg");
	this.shape_82.setTransform(377.575,119.75);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgLAJgFQAKgHAJABQASAAAJALQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLASgXgBQgRABgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_83.setTransform(366.775,119.75);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAh/IAQAAIAAAxQAKgNAPAAQAdAAAAAfIAAA8g");
	this.shape_84.setTransform(357.55,117.875);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgTAGIAAgLIAnAAIAAALg");
	this.shape_85.setTransform(350.475,119.125);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_86.setTransform(343.45,119.675);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AgbAnQgJgIAAgLQAAgOALgGQALgJARAAIAQAAIAAgHQgBgHgEgFQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAGgGAIgEQAIgDAJAAQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgHQgLAMgOgBQgNAAgIgHgAgVASQAAAHAFAEQAFAEAHABQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_87.setTransform(334.1,119.75);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AAVAtIgVhDIgVBDIgMAAIgahZIAPAAIASBDIAVhDIALAAIAVBEIAShEIAPAAIgaBZg");
	this.shape_88.setTransform(323.075,119.75);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgLAJgFQAKgHAJABQASAAAJALQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLASgXgBQgRABgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_89.setTransform(312.275,119.75);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgPAAIAAh/IAPAAIAAAxQAKgNAPAAQAdAAABAfIAAA8g");
	this.shape_90.setTransform(303.05,117.875);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_91.setTransform(289.45,119.675);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AgbAnQgJgIAAgLQAAgOALgGQALgJARAAIAQAAIAAgHQgBgHgEgFQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAGgGAIgEQAIgDAJAAQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgHQgLAMgOgBQgNAAgIgHgAgVASQAAAHAFAEQAFAEAHABQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_92.setTransform(280.1,119.75);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_93.setTransform(271.775,117.875);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_94.setTransform(263.175,117.875);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgJALgQAAQgOAAgIgIg");
	this.shape_95.setTransform(253.625,119.825);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgGAAgIIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgFQgEgEAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgGgFgFQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEADALACQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKABgIgEg");
	this.shape_96.setTransform(244.575,119.75);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AgbAnQgJgIAAgLQAAgOALgGQALgJARAAIAQAAIAAgHQgBgHgEgFQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAGgGAIgEQAIgDAJAAQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgHQgLAMgOgBQgNAAgIgHgAgVASQAAAHAFAEQAFAEAHABQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_97.setTransform(235.55,119.75);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AAvAuIAAg7QAAgJgEgFQgEgFgLAAQgIAAgGAFQgGAGAAAIIAAA7IgPAAIAAg6QAAgUgTAAQgPAAgFANIAABBIgQAAIAAhZIAOAAIABAKQAKgMAQAAQAUAAAFAPQAFgHAHgEQAHgEAKAAQAdAAABAgIAAA7g");
	this.shape_98.setTransform(223.5,119.675);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_99.setTransform(777.9,95.275);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgGQAKgJASABIAPAAIAAgIQAAgHgEgFQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAFgHQAEgGAIgEQAJgEAIABQAQgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgGQgLALgOgBQgNAAgIgHgAgUASQgBAHAFAEQAFAFAHAAQAHAAAHgFQAGgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_100.setTransform(768.55,95.35);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgMAQAAQAOgBAKALIAAguIAPAAIAAB+IgOAAIgBgJQgJALgQgBQgPAAgKgMgAgPgGQgHAIAAARQAAAQAHAIQAGAJAKAAQAPAAAHgOIAAgnQgHgNgPgBQgKABgGAIg");
	this.shape_101.setTransform(758.925,93.55);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AgKAuQgMAAgIgHQgHgHABgLQAAgPAMgHQAMgIASAAIAQAAIAAgHQABgIgEgFQgEgEgHAAQgIgBgFAEQgGAEgBAHIgPAAQAAgIAGgGQAFgGAJgEQAHgDAJAAQAOABAIAIQAIAIgCANIgHAsIAAAGIABAJIAAACIgQAAIAAgFIAAgFQgMAMgMAAIgBgBgAgMAGQgIAEgBAIQgBAHAEAEQAEAEAHAAQAHAAAFgDQAHgEAEgGIAEgTIgMAAQgNAAgHAFg");
	this.shape_102.setTransform(745.331,95.351);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AgCAuQgRAAgKgMQgJgMABgTIABgDQABgNAHgLQAGgLAKgFQAJgGAKAAQAOABAIAIQAIAJAAAQIAAAKIgBAGIg6AAQgBAMAFAJQAGAJALAAQAMAAALgMIAJAHQgGAIgIAFQgIAFgJAAIgCgBgAgJgbQgHAHgEANIArAAIAAgCQABgKgEgHQgFgHgJAAQgIAAgHAGg");
	this.shape_103.setTransform(736.7523,95.3525);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AgPBAQgMAAgIgJQgHgKgBgQIABgLQABgOAGgKQAGgLAJgGQAIgFALAAQAOABAIAKIAIgvIAPAAIgWB/IgNAAIABgKQgKAMgOAAIgBgBgAgOgJQgHAFgDAJQgEAKAAALQAAAMAEAHQAFAGAIAAQAMABALgOIAHgoQgFgMgNgBIgBAAQgIAAgGAGg");
	this.shape_104.setTransform(727.9417,93.551);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AgRA9IAPhZIAPAAIgPBZgAADgtQgCgCAAgEQAAgEACgDQADgCADAAQAEgBACADQADACAAAEQAAAEgDADQgCACgEAAIgBAAQgDAAgCgCg");
	this.shape_105.setTransform(721,93.7208);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AgFAuQgLAAgIgGQgJgFgDgLQgEgKABgNQABgNAHgLQAGgKAKgHQAKgGALABQALAAAIAFQAIAGAEALQAEAKgBANIgBABQgBANgGALQgHAKgJAGQgJAGgKAAIgCgBgAgOgYQgIAJgCAPIAAABIAAALQABAKAFAGQAFAGAIAAQAHABAGgFQAHgDAEgJQAEgIABgJIABgMQgBgKgFgGQgFgFgJgBQgKAAgJAJg");
	this.shape_106.setTransform(713.9657,95.3501);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AAOAuIAKg6IAAgIQgBgLgMgBQgNAAgKAPIgLA/IgPAAIAPhZIAPAAIgDALQAMgNAPAAQANABAGAIQAGAJgCAPIgKA6g");
	this.shape_107.setTransform(704.29,95.2741);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgRA9IAQhZIAOAAIgPBZgAADgtQgDgCAAgEQAAgEADgDQACgCAEAAQAEgBACADQADACAAAEQAAAEgDADQgCACgEAAIgBAAQgDAAgCgCg");
	this.shape_108.setTransform(698.2,93.7208);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AgcAuIAQhZIANAAIgBAKQAJgMANAAIAHABIgCAPIgHgBQgOAAgIANIgLA/g");
	this.shape_109.setTransform(693.475,95.274);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AgJA+QgLAAgJgGQgIgFgFgKQgEgJgBgNQAAgHABgGIABgJQAEgbAPgPQAQgRAUABQARAAAKALQAKAKABATIgQAAQgBgZgTgCIgCAAQgPgBgKANQgLAMgDAUIgCAMIAAAHQgBAQAGAJQAGAJAMAAQALAAAJgGQAIgGAEgPIAPAAQgDASgOALQgNALgRAAIgBAAg");
	this.shape_110.setTransform(685.3167,93.8003);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgEQgEgFAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgHgFgEQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEACALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKAAgIgDg");
	this.shape_111.setTransform(670.975,95.35);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQAKgJATABIAPAAIAAgIQAAgHgFgFQgFgFgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgGAEgHQAFgGAJgEQAIgEAJABQAPgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAFAHAAQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_112.setTransform(661.95,95.35);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_113.setTransform(655.275,93.475);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgKAJgHQAKgFAJAAQASAAAJALQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLARgXAAQgRABgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_114.setTransform(648.775,95.35);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_115.setTransform(640.475,93.475);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_116.setTransform(627.675,93.475);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_117.setTransform(620.725,93.725);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgQAAIAAgMIAQAAIAAgVIAOAAIAAAVIARAAIAAAMIgRAAIAAA3QAAAFADADQACADAFAAIAHgBIAAAMIgLABQgKABgFgHg");
	this.shape_118.setTransform(615.6,94.35);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgEQgEgFAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgHgFgEQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEACALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKAAgIgDg");
	this.shape_119.setTransform(608.725,95.35);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_120.setTransform(602.275,93.725);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_121.setTransform(597.775,95.275);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgKAJgHQAKgFAJAAQASAAAJALQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLARgXAAQgRABgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_122.setTransform(590.025,95.35);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgQAAIAAgMIAQAAIAAgVIAOAAIAAAVIARAAIAAAMIgRAAIAAA3QABAFACADQACADAGAAIAGgBIAAAMIgLABQgKABgFgHg");
	this.shape_123.setTransform(582.4,94.35);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_124.setTransform(576.175,93.475);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQALgJARABIAQAAIAAgIQAAgHgFgFQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgGAEgHQAGgGAIgEQAIgEAJABQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgNgBQgOAAgJgHgAgVASQAAAHAFAEQAFAFAHAAQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_125.setTransform(566.65,95.35);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_126.setTransform(559.625,95.275);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgGQAKgJASABIAPAAIAAgIQAAgHgEgFQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAFgHQAEgGAIgEQAJgEAJABQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgGQgLALgOgBQgNAAgIgHgAgUASQgBAHAFAEQAFAFAHAAQAHAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_127.setTransform(551.65,95.35);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_128.setTransform(543.325,93.475);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_129.setTransform(531.825,95.275);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgGQAKgJASABIAPAAIAAgIQAAgHgEgFQgFgFgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgGAFgHQAEgGAIgEQAJgEAIABQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgGQgLALgOgBQgNAAgIgHgAgUASQgBAHAFAEQAFAFAIAAQAGAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_130.setTransform(523.85,95.35);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgVIAPAAIAAAVIAQAAIAAAMIgQAAIAAA3QAAAFABADQADADAGAAIAHgBIAAAMIgMABQgLABgDgHg");
	this.shape_131.setTransform(516.2,94.35);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("AgMBAIAAhMIgOAAIAAgNIAOAAIAAgJQAAgOAIgIQAGgHAOgBIALABIgBANIgIAAQgIAAgEAEQgEAEAAAIIAAAJIATAAIAAANIgTAAIAABMg");
	this.shape_132.setTransform(511.025,93.4);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgGQAKgJASABIAPAAIAAgIQAAgHgEgFQgFgFgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgGAFgHQAFgGAHgEQAJgEAIABQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgGQgLALgOgBQgNAAgIgHgAgUASQgBAHAFAEQAFAFAIAAQAGAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_133.setTransform(503.15,95.35);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgMAQAAQAOgBAKALIAAguIAPAAIAAB+IgOAAIgBgJQgJALgQgBQgPAAgKgMgAgPgGQgHAIAAARQAAAQAHAIQAGAJAKAAQAPAAAHgOIAAgnQgHgNgPgBQgKABgGAIg");
	this.shape_134.setTransform(493.525,93.55);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_135.setTransform(480.05,95.275);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQAKgJATABIAPAAIAAgIQAAgHgFgFQgFgFgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgGAEgHQAFgGAJgEQAIgEAJABQAPgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAFAIAAQAGAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_136.setTransform(470.7,95.35);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("AgTA7QgIgEgFgHIAIgKQAJANAOAAQALAAAGgGQAGgHABgLIAAgIQgKAKgPAAQgQAAgJgMQgKgMAAgVQAAgWAJgMQALgMAPAAQAQAAAJALIABgKIAOAAIAABXQAAASgLAKQgKAKgRAAQgJgBgKgEgAgPgpQgHAJABARQgBAPAHAIQAGAJAKAAQAOAAAIgOIAAgnQgIgNgOgBQgKABgGAIg");
	this.shape_137.setTransform(461.15,97.05);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAAAAgIAAA7g");
	this.shape_138.setTransform(451.85,95.275);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgKAJgHQAKgFAJAAQASAAAJALQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLARgXAAQgRABgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_139.setTransform(442.725,95.35);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgMAQAAQAOgBAKALIAAguIAPAAIAAB+IgOAAIgBgJQgJALgQgBQgPAAgKgMgAgPgGQgHAIAAARQAAAQAHAIQAGAJAKAAQAPAAAHgOIAAgnQgHgNgPgBQgKABgGAIg");
	this.shape_140.setTransform(433.125,93.55);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAPAAQAdAAAAAgIAAA7g");
	this.shape_141.setTransform(419.65,95.275);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQAKgJATABIAOAAIAAgIQABgHgFgFQgFgFgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAEgHQAFgGAIgEQAJgEAIABQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAFAIAAQAGAAAGgFQAHgDACgGIAAgTIgMAAQgbAAAAARg");
	this.shape_142.setTransform(410.3,95.35);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("AAVAtIgVhDIgVBDIgMAAIgahZIAPAAIASBCIAVhCIALAAIAVBEIAShEIAPAAIgaBZg");
	this.shape_143.setTransform(399.275,95.35);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgKAJgHQAKgFAJAAQASAAAJALQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLARgXAAQgRABgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_144.setTransform(388.475,95.35);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAGIAABAIgQAAIAAh/IAQAAIAAAxQAKgNAPAAQAdAAAAAfIAAA8g");
	this.shape_145.setTransform(379.25,93.475);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_146.setTransform(366.625,93.475);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_147.setTransform(359.675,93.725);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFFF").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgVIAPAAIAAAVIAQAAIAAAMIgQAAIAAA3QAAAFABADQADADAGAAIAHgBIAAAMIgMABQgLABgDgHg");
	this.shape_148.setTransform(354.55,94.35);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgEQgEgFAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgHgFgEQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEACALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKAAgIgDg");
	this.shape_149.setTransform(347.675,95.35);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_150.setTransform(341.225,93.725);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_151.setTransform(336.725,95.275);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgKAJgHQAKgFAJAAQASAAAJALQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLARgXAAQgRABgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_152.setTransform(328.975,95.35);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgVIAPAAIAAAVIAQAAIAAAMIgQAAIAAA3QAAAFABADQADADAGAAIAHgBIAAAMIgMABQgLABgDgHg");
	this.shape_153.setTransform(321.35,94.35);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_154.setTransform(315.125,93.475);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgGQAKgJASABIAPAAIAAgIQAAgHgEgFQgFgFgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgGAFgHQAFgGAHgEQAJgEAIABQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgGQgLALgOgBQgNAAgIgHgAgUASQgBAHAFAEQAFAFAIAAQAGAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_155.setTransform(305.6,95.35);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_156.setTransform(298.575,95.275);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQAKgJATABIAOAAIAAgIQABgHgFgFQgFgFgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAEgHQAFgGAIgEQAJgEAIABQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAFAIAAQAGAAAGgFQAHgDACgGIAAgTIgMAAQgbAAAAARg");
	this.shape_157.setTransform(290.6,95.35);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_158.setTransform(282.275,93.475);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_159.setTransform(270.775,95.275);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQAKgJATABIAPAAIAAgIQAAgHgFgFQgFgFgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgGAEgHQAFgGAJgEQAIgEAJABQAPgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAFAIAAQAGAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_160.setTransform(262.8,95.35);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgQAAIAAgMIAQAAIAAgVIAOAAIAAAVIARAAIAAAMIgRAAIAAA3QAAAFADADQACADAFAAIAHgBIAAAMIgLABQgKABgFgHg");
	this.shape_161.setTransform(255.15,94.35);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FFFFFF").s().p("AgMBAIAAhMIgOAAIAAgNIAOAAIAAgJQAAgOAIgIQAGgHAOgBIALABIgBANIgIAAQgIAAgEAEQgEAEAAAIIAAAJIATAAIAAANIgTAAIAABMg");
	this.shape_162.setTransform(249.975,93.4);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQAKgJATABIAPAAIAAgIQAAgHgFgFQgFgFgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgGAEgHQAFgGAJgEQAIgEAJABQAPgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAFAHAAQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_163.setTransform(242.1,95.35);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgMAQAAQAOgBAKALIAAguIAPAAIAAB+IgOAAIgBgJQgJALgQgBQgPAAgKgMgAgPgGQgHAIAAARQAAAQAHAIQAGAJAKAAQAPAAAHgOIAAgnQgHgNgPgBQgKABgGAIg");
	this.shape_164.setTransform(232.475,93.55);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_165.setTransform(219,95.275);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgGQAKgJASABIAQAAIAAgIQgBgHgEgFQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAFgHQAEgGAIgEQAJgEAIABQAQgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgGQgLALgOgBQgNAAgIgHgAgUASQgBAHAFAEQAFAFAHAAQAHAAAGgFQAHgDADgGIAAgTIgMAAQgbAAAAARg");
	this.shape_166.setTransform(209.65,95.35);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_167.setTransform(201.325,93.475);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#FFFFFF").s().p("AgdAiQgLgMAAgVIAAgBQAAgNAFgLQAGgKAIgGQAKgFALAAQASAAAMAMQALANAAAUIAAABQAAANgFALQgFAKgJAGQgKAFgMAAQgRAAgMgMgAgSgYQgGAJAAAQQAAAPAGAJQAIAJAKAAQAMAAAGgJQAIgJgBgQQABgOgIgKQgGgJgMAAQgKAAgIAJg");
	this.shape_168.setTransform(191.6,95.35);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FFFFFF").s().p("AgaAjQgLgNAAgVIAAgBQAAgOAFgKQAFgKAJgGQAJgGALABQAPgBAKAKQAKAIABAPIgOAAQgBgIgGgGQgGgGgJAAQgLAAgGAIQgHAJABAQIAAACQgBAPAHAJQAGAIALAAQAJAAAGgFQAFgFACgHIAOAAQgBAHgEAHQgGAHgIAFQgHADgKAAQgRABgLgMg");
	this.shape_169.setTransform(182.4,95.35);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FFFFFF").s().p("AgdAiQgLgMAAgVIAAgBQAAgNAGgLQAFgKAIgGQAKgFALAAQASAAALAMQAMANAAAUIAAABQAAANgFALQgFAKgKAGQgJAFgMAAQgRAAgMgMgAgRgYQgIAJABAQQgBAPAIAJQAGAJALAAQALAAAIgJQAGgJABgQQgBgOgGgKQgIgJgLAAQgLAAgGAJg");
	this.shape_170.setTransform(173,95.35);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FFFFFF").s().p("AggAvQgNgQgBgaIAAgKQAAgRAHgMQAFgNAMgHQALgHANAAQAUAAALALQALAKADATIgQAAQgDgOgGgHQgIgGgMAAQgOAAgJAMQgIAKgBAVIAAALQAAAUAJAMQAIALANAAQAOAAAHgGQAHgGADgPIAQAAQgDATgLALQgMAKgVAAQgUAAgMgPg");
	this.shape_171.setTransform(162.8,93.8);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FFFFFF").s().p("AACAUIAAgKQAAgIAEgIQAEgIAGgFIAJAGQgIALAAALIAAALgAgYAUIAAgKQAAgIAEgIQAEgIAHgFIAJAGQgIALAAALIAAALg");
	this.shape_172.setTransform(154.475,88.95);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.bf(img.Bitmap2, null, new cjs.Matrix2D(1,0,0,1,-499,-300)).s().p("EhN9Au4MAAAhdvMCb7AAAMAAABdvg");
	this.shape_173.setTransform(471,266.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.btnNextDasar1},{t:this.btnMenuDasar1},{t:this.btnBack3},{t:this.slots},{t:this.pieces},{t:this.judulKI},{t:this.Score},{t:this.cobaha},{t:this.drag2G1},{t:this.instance_3},{t:this.g1},{t:this.g2},{t:this.g3},{t:this.instance_2},{t:this.instance_1},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.restart},{t:this.btnInfo},{t:this.shape},{t:this.winMessage}]}).wait(1));

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
		{src:"images/_8.png", id:"_8"},
		{src:"images/_9.png", id:"_9"},
		{src:"images/Bitmap143.png", id:"Bitmap143"},
		{src:"images/Bitmap146.png", id:"Bitmap146"},
		{src:"images/Bitmap144.png", id:"Bitmap144"},
		{src:"images/Bitmap152.png", id:"Bitmap152"},
		{src:"images/Bitmap148.png", id:"Bitmap148"},
		{src:"images/Bitmap153.png", id:"Bitmap153"},
		{src:"images/bookpngcopy.png", id:"bookpngcopy"},
		{src:"images/Bitmap2.png", id:"Bitmap2"},
		{src:"images/Bitmap3.png", id:"Bitmap3"},
		{src:"images/Bitmap145.png", id:"Bitmap145"},
		{src:"images/Bitmap147.png", id:"Bitmap147"}
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