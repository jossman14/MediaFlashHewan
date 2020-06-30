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



(lib._15 = function() {
	this.initialize(img._15);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,681,451);


(lib.Bitmap147 = function() {
	this.initialize(img.Bitmap147);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,143,136);


(lib.Bitmap152 = function() {
	this.initialize(img.Bitmap152);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,287,152);


(lib.Bitmap153 = function() {
	this.initialize(img.Bitmap153);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,264,152);


(lib.Bitmap149 = function() {
	this.initialize(img.Bitmap149);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,304,166);


(lib.Bitmap3 = function() {
	this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,249,87);


(lib.Bitmap148 = function() {
	this.initialize(img.Bitmap148);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,195,145);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);


(lib.bookpngcopy = function() {
	this.initialize(img.bookpngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,399);


(lib.Bitmap154 = function() {
	this.initialize(img.Bitmap154);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,280,139);// helper functions:

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


(lib.g2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._15();
	this.instance.setTransform(-52.2,-37.5,0.1534,0.1663);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g2, new cjs.Rectangle(-52.2,-37.5,104.5,75), null);


(lib.g1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap149();
	this.instance.setTransform(-52.2,-37.5,0.3436,0.4518);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g1, new cjs.Rectangle(-52.2,-37.5,104.5,75), null);


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


(lib.drop15G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape.setTransform(215.675,71.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgUA4IgCALIgTAAIAAiGIAWAAIAAAwQAJgKAOgBQASABAKANQAKANAAAWIAAABQAAAWgKANQgKANgRAAQgQAAgJgMgAgTAAIAAAnQAFAMAOAAQAJAAAGgIQAFgHAAgPIAAgDQAAgPgFgHQgGgIgJAAQgOAAgFAMg");
	this.shape_1.setTransform(205.925,69.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_2.setTransform(195.775,71.65);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAVAAIAAALQAHgNANAAQAFABADABIAAAUIgJgBQgPAAgDAMIAABAg");
	this.shape_3.setTransform(188.15,71.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgNAGgLQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALAKQgFAJgKAFQgKAEgLAAQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_4.setTransform(179.825,71.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgoBDIAAiDIATAAIABAKQAJgMAQAAQARAAAKANQAJANAAAXIAAACQABAVgKANQgKANgRAAQgPAAgJgKIAAAtgAgTglIAAApQAFALANAAQAKAAAFgIQAGgHABgRQAAgOgGgJQgGgIgKAAQgNAAgFALg");
	this.shape_5.setTransform(170,73.375);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAVAAIAABfgAgIgtQgDgDAAgFQAAgFADgDQADgEAFAAQAGAAADAEQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_6.setTransform(157.95,69.85);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_7.setTransform(150.775,71.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgVA/QgJgFgFgHIAKgMQAKALAOAAQAKAAAFgFQAHgGgBgLIAAgHQgJALgOAAQgQAAgLgOQgLgNAAgXQAAgWAKgNQALgNARAAQAQAAAJALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgKgEgAgOgoQgFAIgBAQQABAPAFAHQAGAIAKAAQANAAAFgLIAAgpQgFgLgNAAQgKAAgGAJg");
	this.shape_8.setTransform(140.6,73.425);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_9.setTransform(130.825,71.65);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgUA4IgCALIgTAAIAAiGIAWAAIAAAwQAJgKAOgBQASABAKANQAKANAAAWIAAABQAAAWgKANQgKANgRAAQgQAAgJgMgAgTAAIAAAnQAFAMAOAAQAJAAAGgIQAFgHAAgPIAAgDQAAgPgFgHQgGgIgJAAQgOAAgFAMg");
	this.shape_10.setTransform(121.075,69.75);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgNAGgLQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALAKQgFAJgKAFQgKAEgLAAQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_11.setTransform(111.075,71.65);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgTAtQgJgEgFgIQgFgHgBgIIAWAAQAAAHAFAEQAGAFAHgBQAIABAFgEQAEgDAAgGQAAgFgFgDQgEgDgKgDQgLgBgHgEQgQgHAAgPQAAgMAKgIQALgJAPAAQARAAAKAJQAKAIAAAOIgVAAQAAgGgFgEQgEgEgHAAQgHAAgEADQgEADAAAFQgBAFAEADQAFADALADQANACAHAEQAIADADAFQADAGAAAIQABANgLAHQgLAJgRgBQgLAAgJgEg");
	this.shape_12.setTransform(101.45,71.65);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgKAhIAAg1IgQAAIAAgQIAQAAIAAgXIAUAAIAAAXIARAAIAAAQIgRAAIAAA0QAAAFACACQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgbg");
	this.shape_13.setTransform(89.125,70.6);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKALgQAAQgPAAgIgJg");
	this.shape_14.setTransform(81.325,71.75);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgKBEIAAiGIAUAAIAACGg");
	this.shape_15.setTransform(74.05,69.65);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKALgQAAQgPAAgIgJg");
	this.shape_16.setTransform(66.725,71.75);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AAuAxIAAg+QAAgJgEgDQgEgFgJAAQgHAAgFAEQgFAEgBAHIAABAIgVAAIAAg+QAAgRgRAAQgNAAgFAKIAABFIgVAAIAAhfIAUAAIAAAKQAKgLASgBQASAAAHAPQAKgPATAAQAQAAAIAJQAHAJAAARIAAA+g");
	this.shape_17.setTransform(53.925,71.55);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgJBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_18.setTransform(229.7,44.25);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgUA/QgKgFgGgHIAKgMQAKALAPAAQAJAAAHgFQAFgGABgLIAAgHQgKALgOAAQgRAAgKgOQgLgNAAgXQAAgWALgNQAKgNASAAQAPAAAJALIABgJIATAAIAABbQAAATgLAKQgMALgTAAQgKAAgKgEgAgNgoQgHAIABAQQgBAPAHAHQAFAIAJAAQANAAAHgLIAAgpQgHgLgNAAQgJAAgFAJg");
	this.shape_19.setTransform(222.1,47.825);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABCIgVAAIAAhdIAUAAIAAAKQALgMAQAAQAeAAABAhIAAA+g");
	this.shape_20.setTransform(212.2,45.95);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_21.setTransform(204.9,44.25);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgJBDIAAiGIATAAIAACGg");
	this.shape_22.setTransform(200.3,44.05);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_23.setTransform(195.7,44.25);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgJBDIAAiGIATAAIAACGg");
	this.shape_24.setTransform(191.1,44.05);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgVIAAgCQAAgNAGgMQAFgLAKgGQAKgHALABQAUAAAKAMQALAMAAAXIAAAIIg9AAQABALAGAHQAHAHAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_25.setTransform(184.075,46.05);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgUA/QgLgFgFgHIAKgMQAKALAPAAQAJAAAHgFQAFgGAAgLIAAgHQgIALgPAAQgQAAgLgOQgLgNAAgXQAAgWALgNQAKgNASAAQAOAAAKALIABgJIATAAIAABbQAAATgLAKQgMALgTAAQgKAAgKgEgAgNgoQgHAIABAQQgBAPAHAHQAFAIAJAAQANAAAGgLIAAgpQgGgLgNAAQgJAAgFAJg");
	this.shape_26.setTransform(173.85,47.825);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABCIgVAAIAAhdIAUAAIAAAKQALgMAQAAQAeAAABAhIAAA+g");
	this.shape_27.setTransform(163.95,45.95);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgVIAAgCQAAgNAGgMQAFgLAKgGQAKgHALABQAUAAAKAMQALAMAAAXIAAAIIg9AAQABALAGAHQAHAHAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_28.setTransform(154.225,46.05);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AAuAwIAAg8QAAgKgEgEQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAJQAKgLASAAQASAAAHAOQAKgOATAAQAQAAAIAJQAHAIAAARIAAA9g");
	this.shape_29.setTransform(141.475,45.95);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgJBDIAAiGIATAAIAACGg");
	this.shape_30.setTransform(108.85,44.05);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgVIAAgCQAAgNAGgMQAFgLAKgGQAKgHALABQAUAAAKAMQALAMAAAXIAAAIIg9AAQABALAGAHQAHAHAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_31.setTransform(101.825,46.05);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAKIAAAeIgWAAIAAiGIAWAAIAABNIAGgIIAagcIAZAAIgjAmIAnA3g");
	this.shape_32.setTransform(92.775,44.05);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAAqQAAANAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_33.setTransform(82.625,46.05);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAGACACQACACAGAAIAHgBIAAARQgHACgHAAQgXAAAAgcg");
	this.shape_34.setTransform(74.525,45);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABCIgVAAIAAhdIAUAAIAAAKQALgMAQAAQAeAAABAhIAAA+g");
	this.shape_35.setTransform(66.75,45.95);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgVIAAgCQAAgNAGgMQAFgLAKgGQAKgHALABQAUAAAKAMQALAMAAAXIAAAIIg9AAQABALAGAHQAHAHAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_36.setTransform(57.025,46.05);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAGACACQACACAGAAIAHgBIAAARQgHACgHAAQgXAAAAgcg");
	this.shape_37.setTransform(48.875,45);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgKBBIAAheIAUAAIAABegAgIgtQgDgDAAgFQAAgFADgDQADgDAFgBQAGABADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_38.setTransform(229.65,18.65);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AARBDIgbgpIgJALIAAAeIgWAAIAAiGIAWAAIAABOIAGgJIAagdIAZAAIgjAnIAnA3g");
	this.shape_39.setTransform(223.225,18.45);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgKBBIAAheIAVAAIAABegAgIgtQgDgDAAgFQAAgFADgDQADgDAFgBQAGABADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_40.setTransform(215.65,18.65);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgKBDIAAiGIAVAAIAACGg");
	this.shape_41.setTransform(211.05,18.45);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgKBBIAAheIAVAAIAABegAgIgtQgDgDAAgFQAAgFADgDQADgDAFgBQAGABADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_42.setTransform(206.45,18.65);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgJgEgDQgEgFgJAAQgHAAgFAEQgFAEgBAHIAAA/IgVAAIAAg9QAAgRgRAAQgNAAgFAKIAABEIgVAAIAAheIAUAAIAAALQAKgMASgBQASAAAHAPQAKgPATAAQAQABAIAIQAHAJAAARIAAA9g");
	this.shape_43.setTransform(196.325,20.35);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgWIAAgCQAAgNAGgLQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABAMAGAIQAHAGAKAAQAOAAAKgLIALAKQgFAJgKAFQgKAEgLAAQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_44.setTransform(183.775,20.45);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgJgEgDQgEgFgJAAQgHAAgFAEQgFAEgBAHIAAA/IgVAAIAAg9QAAgRgRAAQgNAAgFAKIAABEIgVAAIAAheIAUAAIAAALQAKgMASgBQASAAAHAPQAKgPATAAQAQABAIAIQAHAJAAARIAAA9g");
	this.shape_45.setTransform(171.025,20.35);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgKBBIAAheIAUAAIAABegAgIgtQgDgDAAgFQAAgFADgDQADgDAFgBQAGABADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_46.setTransform(139.75,18.65);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABCIgVAAIAAheIAUAAIAAAMQALgNAQgBQAeAAABAiIAAA+g");
	this.shape_47.setTransform(132.45,20.35);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgJBBIAAheIATAAIAABegAgIgtQgDgDAAgFQAAgFADgDQADgDAFgBQAGABADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_48.setTransform(125.15,18.65);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgLAAgHAMIAABCIgVAAIAAheIAUAAIABAMQAKgNAQgBQAeAAAAAiIAAA+g");
	this.shape_49.setTransform(96.7,20.35);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgHQAMgHAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgHQgLAMgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_50.setTransform(86.825,20.45);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AAUAvIgUhAIgTBAIgSAAIgaheIAVAAIAPBBIAUhBIAPAAIAUBBIAPhBIAVAAIgaBeg");
	this.shape_51.setTransform(75.225,20.45);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgWIAAgCQAAgNAGgLQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABAMAGAIQAHAGAKAAQAOAAAKgLIALAKQgFAJgKAFQgKAEgLAAQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_52.setTransform(63.825,20.45);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AAdBAIAAg5Ig5AAIAAA5IgWAAIAAh/IAWAAIAAA1IA5AAIAAg1IAWAAIAAB/g");
	this.shape_53.setTransform(52.475,18.8);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.181,0,0,1.555,-147,-67.8)).s().p("A29KkIAA1IMAt7AAAIAAVIg");
	this.shape_54.setTransform(146.2,51.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop15G5, new cjs.Rectangle(-0.8,-16.2,294.1,135.29999999999998), null);


(lib.drop15G4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgTAtQgJgEgGgHQgEgIAAgIIAVAAQAAAHAFAEQAFAFAIAAQAIAAAFgEQAEgDAAgGQAAgFgFgDQgEgDgKgCQgLgCgHgEQgQgHAAgOQAAgNAKgIQAKgJAPAAQARAAALAJQAKAJAAANIgVAAQAAgGgFgEQgEgEgIgBQgFABgFADQgEADgBAGQAAAFAFACQAEADAMADQAMACAHAFQAIACADAGQAEAFgBAHQAAANgLAJQgKAHgRAAQgLABgJgFg");
	this.shape.setTransform(103,89.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgMIAAhCIAVAAIAABdIgUAAIAAgJQgKAMgQgBQgPABgIgKg");
	this.shape_1.setTransform(93.375,89.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABCIgVAAIAAhdIAUAAIAAALQALgOAQAAQAeABABAhIAAA+g");
	this.shape_2.setTransform(83.4,88.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAOIAAArQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_3.setTransform(73.525,89.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgJBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_4.setTransform(61.85,87.25);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAOIAAArQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_5.setTransform(54.675,89.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgoBDIAAiDIATAAIABAKQAJgMAQAAQARAAAKANQAKANgBAXIAAACQABAVgKANQgKANgRAAQgPAAgJgKIAAAtgAgTglIAAApQAFALANAAQAKAAAFgIQAGgHABgRQAAgOgGgJQgGgIgKAAQgNAAgFALg");
	this.shape_6.setTransform(44.9,90.775);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgEQgEgFgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgNASAAQASAAAHAPQAKgPATAAQAQABAIAIQAHAJAAARIAAA9g");
	this.shape_7.setTransform(31.825,88.95);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAOIAAArQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_8.setTransform(19.125,89.05);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgTAtQgJgEgFgHQgGgIAAgIIAWAAQAAAHAFAEQAGAFAHAAQAIAAAFgEQAEgDAAgGQAAgFgFgDQgEgDgKgCQgLgCgHgEQgQgHAAgOQAAgNAKgIQAKgJAQAAQAQAAALAJQALAJAAANIgWAAQAAgGgEgEQgFgEgHgBQgHABgEADQgEADAAAGQAAAFADACQAFADALADQANACAHAFQAHACAEAGQADAFAAAHQABANgLAJQgLAHgRAAQgLABgJgFg");
	this.shape_9.setTransform(9.55,89.05);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgEAKAAQARABAKAIQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNAAQgPgBgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_10.setTransform(251.275,63.45);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AARBEIgbgqIgJAKIAAAgIgWAAIAAiGIAWAAIAABMIAGgIIAagdIAZAAIgjAnIAnA4g");
	this.shape_11.setTransform(242.275,61.45);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgEAKAAQARABAKAIQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNAAQgPgBgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_12.setTransform(232.125,63.45);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgfAkQgMgNAAgXIAAAAQAAgOAFgLQAGgMAKgFQAKgHAMAAQATAAAMANQAMAMABAVIAAAEQAAAOgFALQgGALgKAGQgKAGgNABQgTgBgMgNgAgQgXQgGAJAAAPQAAAOAGAJQAGAIAKAAQALAAAGgIQAGgJAAgPQAAgOgGgJQgHgIgKAAQgKAAgGAIg");
	this.shape_13.setTransform(222.175,63.45);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgKBEIAAiGIAVAAIAACGg");
	this.shape_14.setTransform(214.75,61.45);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AARBEIgbgqIgJAKIAAAgIgWAAIAAiGIAWAAIAABMIAGgIIAagdIAZAAIgjAnIAnA4g");
	this.shape_15.setTransform(208.325,61.45);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgNASQAFgIACgGQACgFAAgGIAAgRIASAAIAAAPQAAAJgFAJQgEAKgHAGg");
	this.shape_16.setTransform(194.65,68.625);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgTAtQgJgEgFgIQgFgHgBgJIAWAAQAAAIAFAEQAGAFAHgBQAIABAFgEQAEgDAAgFQAAgGgFgDQgEgDgKgDQgLgCgHgDQgQgHAAgPQAAgMAKgIQALgIAPgBQARABAKAIQAKAJAAANIgVAAQAAgGgFgEQgEgFgHABQgHgBgEAEQgEADgBAFQAAAFAEADQAFADALADQANACAHAEQAIADADAFQADAGAAAIQABANgLAHQgLAJgRAAQgLgBgJgEg");
	this.shape_17.setTransform(188.3,63.45);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKAMgQAAQgPgBgIgJg");
	this.shape_18.setTransform(178.675,63.55);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgTAtQgJgEgGgIQgEgHAAgJIAUAAQABAIAFAEQAGAFAHgBQAJABAEgEQAEgDAAgFQAAgGgEgDQgFgDgKgDQgLgCgHgDQgQgHAAgPQAAgMAKgIQALgIAOgBQASABAKAIQALAJAAANIgWAAQAAgGgEgEQgFgFgIABQgFgBgFAEQgFADABAFQAAAFADADQAFADAMADQAMACAHAEQAIADADAFQAEAGAAAIQAAANgMAHQgKAJgRAAQgLgBgJgEg");
	this.shape_19.setTransform(169,63.45);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKAMgQAAQgPgBgIgJg");
	this.shape_20.setTransform(159.375,63.55);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgNASQAFgIACgGQACgFAAgGIAAgRIASAAIAAAPQAAAJgEAJQgFAKgHAGg");
	this.shape_21.setTransform(146,68.625);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgVA/QgKgFgFgHIALgMQAJALAPAAQAKAAAFgFQAHgGAAgLIAAgHQgKALgOAAQgRAAgKgOQgLgNAAgXQAAgWAKgNQALgNARAAQAQAAAJALIABgJIATAAIAABbQAAATgLAKQgMALgTAAQgKAAgLgEgAgNgoQgHAIAAAQQAAAPAHAHQAFAIAKAAQAMAAAHgLIAAgpQgHgLgMAAQgKAAgFAJg");
	this.shape_22.setTransform(139.05,65.225);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgWAAIAAhfIAVAAIAAALQALgNAQAAQAeAAABAjIAAA+g");
	this.shape_23.setTransform(129.15,63.35);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKAMgQAAQgPgBgIgJg");
	this.shape_24.setTransform(119.125,63.55);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgUA4IgCALIgTAAIAAiGIAWAAIAAAwQAJgLAOAAQASAAAKANQAKAOAAAVIAAACQAAAWgKANQgKANgRABQgQAAgJgNgAgTAAIAAAnQAFAMAOAAQAJAAAGgIQAFgHAAgPIAAgDQAAgPgFgHQgGgIgJAAQgOAAgFAMg");
	this.shape_25.setTransform(109.275,61.55);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AAuAxIAAg9QAAgJgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAHIAABAIgVAAIAAg+QAAgRgRAAQgNAAgFAKIAABFIgVAAIAAhfIAUAAIAAAKQAKgMASAAQASAAAHAPQAKgPATAAQAQAAAIAJQAHAJAAARIAAA+g");
	this.shape_26.setTransform(96.175,63.35);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgEAKAAQARABAKAIQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNAAQgPgBgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_27.setTransform(83.475,63.45);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgKBEIAAiGIAUAAIAACGg");
	this.shape_28.setTransform(76.3,61.45);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgNASQAFgIACgGQACgFAAgGIAAgRIASAAIAAAPQAAAJgFAJQgEAKgHAGg");
	this.shape_29.setTransform(65.6,68.625);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AARBEIgbgqIgJAKIAAAgIgWAAIAAiGIAWAAIAABMIAGgIIAagdIAZAAIgjAnIAnA4g");
	this.shape_30.setTransform(59.825,61.45);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALAKQgFAJgKAEQgKAGgLAAQgUAAgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_31.setTransform(49.825,63.45);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgVAKgNQALgNARgBQAOAAAJALIAAgwIAWAAIAACGIgUAAIgBgKQgJAMgPAAQgRgBgKgNgAgOgDQgFAGAAARQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAJg");
	this.shape_32.setTransform(39.625,61.55);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgVAAIAAhfIAUAAIAAALQALgNAQAAQAeAAAAAjIAAA+g");
	this.shape_33.setTransform(29.75,63.35);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALAKQgFAJgKAEQgKAGgLAAQgUAAgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_34.setTransform(20.025,63.45);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgpBDIAAiDIAUAAIABAKQAKgMAOAAQASAAAKANQAKANgBAXIAAACQAAAVgKANQgJANgRAAQgPAAgJgKIAAAtgAgTglIAAApQAGALANAAQAJAAAFgIQAHgHgBgRQAAgOgFgJQgGgIgJAAQgNAAgGALg");
	this.shape_35.setTransform(10.2,65.175);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABCIgVAAIAAhdIAUAAIAAALQALgNAQAAQAeAAABAhIAAA+g");
	this.shape_36.setTransform(251.25,37.75);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAArQAAAMAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_37.setTransform(241.375,37.85);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgUA/QgKgFgGgHIAKgMQALALAOAAQAJAAAGgFQAGgGABgLIAAgHQgJALgPAAQgRAAgKgOQgLgNAAgXQAAgWALgNQAKgNARAAQAQAAAJALIABgJIATAAIAABbQAAATgLAKQgMALgTAAQgKAAgKgEgAgNgoQgHAIAAAQQAAAPAHAHQAFAIAKAAQAMAAAHgLIAAgpQgHgLgMAAQgKAAgFAJg");
	this.shape_38.setTransform(231.2,39.625);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABCIgWAAIAAhdIAVAAIAAALQALgNAQAAQAeAAABAhIAAA+g");
	this.shape_39.setTransform(221.3,37.75);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgfAkQgMgOAAgWIAAAAQAAgOAFgLQAGgLAKgHQAKgFAMAAQATAAAMAMQAMANABAUIAAAEQAAAOgFALQgGALgKAGQgKAHgNAAQgTAAgMgOgAgQgXQgGAIAAAQQAAAPAGAIQAGAIAKAAQALAAAGgIQAGgIAAgQQAAgOgGgJQgHgIgKAAQgKAAgGAIg");
	this.shape_40.setTransform(211.225,37.85);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAKIAAAeIgWAAIAAiGIAWAAIAABNIAGgIIAagcIAZAAIgjAmIAnA3g");
	this.shape_41.setTransform(201.975,35.85);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgUA/QgLgFgFgHIAKgMQAKALAPAAQAJAAAHgFQAFgGAAgLIAAgHQgIALgPAAQgQAAgLgOQgLgNAAgXQAAgWALgNQAKgNASAAQAOAAAKALIABgJIATAAIAABbQAAATgLAKQgMALgTAAQgKAAgKgEgAgNgoQgHAIABAQQgBAPAHAHQAFAIAJAAQANAAAGgLIAAgpQgGgLgNAAQgJAAgFAJg");
	this.shape_42.setTransform(191.4,39.625);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABCIgVAAIAAhdIAUAAIAAALQALgNAQAAQAeAAABAhIAAA+g");
	this.shape_43.setTransform(181.5,37.75);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgfAkQgMgOAAgWIAAAAQAAgOAFgLQAGgLAKgHQAKgFAMAAQATAAAMAMQAMANABAUIAAAEQAAAOgFALQgGALgKAGQgKAHgNAAQgTAAgMgOgAgQgXQgGAIAAAQQAAAPAGAIQAGAIAKAAQALAAAGgIQAGgIAAgQQAAgOgGgJQgHgIgKAAQgKAAgGAIg");
	this.shape_44.setTransform(171.425,37.85);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAUAAIABAKQAGgMAPAAQAEAAADABIgBAUIgIgBQgOAAgFALIAABAg");
	this.shape_45.setTransform(163.55,37.75);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALABQAUAAAKAMQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_46.setTransform(155.225,37.85);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAKIAAAeIgWAAIAAiGIAWAAIAABNIAGgIIAagcIAZAAIgjAmIAnA3g");
	this.shape_47.setTransform(146.175,35.85);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgNASQAFgIACgGQACgFAAgGIAAgRIASAAIAAAPQAAAJgEAJQgFAKgHAGg");
	this.shape_48.setTransform(111.15,43.025);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAGACACQACACAGAAIAHgBIAAARQgHACgHAAQgXAAAAgcg");
	this.shape_49.setTransform(106.275,36.8);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgMIAAhCIAVAAIAABdIgUAAIAAgJQgKAMgQAAQgPAAgIgKg");
	this.shape_50.setTransform(98.475,37.95);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AgJBDIAAiGIATAAIAACGg");
	this.shape_51.setTransform(91.2,35.85);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgMIAAhCIAVAAIAABdIgUAAIAAgJQgKAMgQAAQgPAAgIgKg");
	this.shape_52.setTransform(83.875,37.95);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgMASAAQASAAAHAOQAKgOATAAQAQAAAIAJQAHAIAAARIAAA9g");
	this.shape_53.setTransform(71.075,37.75);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgJBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_54.setTransform(33.5,36.05);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAUAAIABAKQAGgMAPAAQAEAAADABIgBAUIgIgBQgOAAgFALIAABAg");
	this.shape_55.setTransform(28.45,37.75);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAArQAAAMAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_56.setTransform(19.975,37.85);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgUAKgOQALgNARAAQAOgBAJALIAAgxIAWAAIAACGIgUAAIgBgKQgJANgPAAQgRAAgKgOgAgOgEQgFAHAAARQAAAPAFAIQAGAIAJAAQANAAAGgMIAAgnQgGgMgNAAQgJAAgGAIg");
	this.shape_57.setTransform(9.825,35.95);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgDAAgFQAAgFADgDQADgEAFAAQAGAAADAEQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_58.setTransform(253.85,10.45);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_59.setTransform(246.675,12.25);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgKBEIAAiGIAVAAIAACGg");
	this.shape_60.setTransform(239.5,10.25);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKALgQAAQgPAAgIgJg");
	this.shape_61.setTransform(232.175,12.35);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AAuAxIAAg9QAAgKgEgDQgEgFgJAAQgHAAgFAEQgFAEgBAHIAABAIgVAAIAAg+QAAgRgRAAQgNAAgFAKIAABFIgVAAIAAhfIAUAAIAAAKQAKgLASgBQASAAAHAPQAKgPATAAQAQAAAIAJQAHAJAAARIAAA+g");
	this.shape_62.setTransform(219.375,12.15);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAVAAIAABfgAgIgtQgDgDAAgFQAAgFADgDQADgEAFAAQAGAAADAEQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_63.setTransform(209.25,10.45);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgVAKgNQALgOARAAQAOAAAJALIAAgwIAWAAIAACGIgUAAIgBgKQgJAMgPgBQgRAAgKgNgAgOgEQgFAIAAAQQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAIg");
	this.shape_64.setTransform(201.675,10.35);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgEQgEgFgJAAQgLAAgHAMIAABDIgWAAIAAhfIAVAAIABAMQAKgNAQgBQAeAAAAAjIAAA+g");
	this.shape_65.setTransform(184.8,12.15);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_66.setTransform(174.925,12.25);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AgUA/QgLgFgFgHIAKgMQALALAOAAQAJAAAHgFQAFgGAAgLIAAgHQgIALgPAAQgQAAgLgOQgLgNAAgXQAAgWALgNQAKgNASAAQAOAAAKALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgJgEgAgOgoQgFAIAAAQQAAAPAFAHQAGAIAJAAQAOAAAFgLIAAgpQgFgLgOAAQgJAAgGAJg");
	this.shape_67.setTransform(164.75,14.025);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAVAAIAAALQAHgNANAAQAFABADABIAAAUIgJgBQgPAAgDAMIAABAg");
	this.shape_68.setTransform(157.1,12.15);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2C3E50").s().p("AgfAkQgMgNAAgXIAAAAQAAgOAFgLQAGgMAKgFQAKgHAMAAQATAAAMANQAMAMABAVIAAAEQAAAOgFALQgGALgKAGQgKAGgNAAQgTAAgMgNgAgQgXQgGAJAAAPQAAAOAGAJQAGAIAKAAQALAAAGgIQAGgJAAgPQAAgOgGgJQgHgIgKAAQgKAAgGAIg");
	this.shape_69.setTransform(148.425,12.25);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAVAAIAABfgAgIgtQgDgDAAgFQAAgFADgDQADgEAFAAQAGAAADAEQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_70.setTransform(134,10.45);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2C3E50").s().p("AARBEIgbgqIgJAKIAAAgIgWAAIAAiGIAWAAIAABNIAGgJIAagdIAZAAIgjAnIAnA4g");
	this.shape_71.setTransform(127.575,10.25);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgDAAgFQAAgFADgDQADgEAFAAQAGAAADAEQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_72.setTransform(120,10.45);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#2C3E50").s().p("AgJBEIAAiGIAUAAIAACGg");
	this.shape_73.setTransform(115.4,10.25);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAVAAIAABfgAgIgtQgDgDAAgFQAAgFADgDQADgEAFAAQAGAAADAEQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_74.setTransform(110.8,10.45);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#2C3E50").s().p("AAuAxIAAg9QAAgKgEgDQgEgFgJAAQgHAAgFAEQgFAEgBAHIAABAIgVAAIAAg+QAAgRgRAAQgNAAgFAKIAABFIgVAAIAAhfIAUAAIAAAKQAKgLASgBQASAAAHAPQAKgPATAAQAQAAAIAJQAHAJAAARIAAA+g");
	this.shape_75.setTransform(100.675,12.15);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgNAGgLQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALAKQgFAJgKAFQgKAEgLAAQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_76.setTransform(88.125,12.25);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#2C3E50").s().p("AAuAxIAAg9QAAgKgEgDQgEgFgJAAQgHAAgFAEQgFAEgBAHIAABAIgVAAIAAg+QAAgRgRAAQgNAAgFAKIAABFIgVAAIAAhfIAUAAIAAAKQAKgLASgBQASAAAHAPQAKgPATAAQAQAAAIAJQAHAJAAARIAAA+g");
	this.shape_77.setTransform(75.375,12.15);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgEQgEgFgJAAQgLAAgHAMIAABDIgWAAIAAhfIAVAAIABAMQAKgNAQgBQAeAAAAAjIAAA+g");
	this.shape_78.setTransform(55.55,12.15);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_79.setTransform(45.675,12.25);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#2C3E50").s().p("AAUAwIgUhBIgTBBIgSAAIgahfIAVAAIAPBBIAUhBIAPAAIAUBBIAPhBIAVAAIgaBfg");
	this.shape_80.setTransform(34.075,12.25);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgNAGgLQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALAKQgFAJgKAFQgKAEgLAAQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_81.setTransform(22.675,12.25);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#2C3E50").s().p("AAdBAIAAg5Ig5AAIAAA5IgWAAIAAh/IAWAAIAAA1IA5AAIAAg1IAWAAIAAB/g");
	this.shape_82.setTransform(11.325,10.6);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.279,0,0,1.903,-159.2,-82.9)).s().p("A43M8IAA53MAxwAAAIAAZ3g");
	this.shape_83.setTransform(137.35,58.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop15G4, new cjs.Rectangle(-21.9,-24.3,318.5,165.60000000000002), null);


(lib.drop15G3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABDIgWAAIAAhfIAVAAIABALQAKgNAQABQAegBAAAjIAAA+g");
	this.shape.setTransform(194.7,105.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgIAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAJAAAOIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_1.setTransform(184.825,105.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgTAtQgJgEgFgHQgFgIgBgJIAWAAQAAAIAFAEQAGAEAHABQAIgBAFgDQAEgDAAgFQAAgGgFgDQgEgDgKgDQgLgCgHgDQgQgHAAgOQAAgNAKgIQALgIAPAAQARAAAKAIQAKAJAAANIgVAAQAAgGgFgEQgEgFgHABQgHAAgEADQgEADgBAGQAAAEAEADQAFADALADQANADAHADQAIADADAFQADAGAAAIQABANgLAIQgLAHgRABQgLgBgJgEg");
	this.shape_2.setTransform(175.25,105.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgIAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAJAAAOIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_3.setTransform(165.775,105.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgpBDIAAiDIAUAAIABAKQAKgMAOAAQASAAAKANQAKANgBAXIAAACQAAAVgKANQgJANgRAAQgPAAgJgKIAAAtgAgTglIAAApQAGALANAAQAJAAAFgIQAHgHgBgRQAAgOgFgJQgGgIgJAAQgNAAgGALg");
	this.shape_4.setTransform(156,107.275);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgIAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAJAAAOIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_5.setTransform(145.875,105.55);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABDIgWAAIAAhfIAVAAIABALQAKgNAQABQAegBAAAjIAAA+g");
	this.shape_6.setTransform(136,105.45);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAVAAIAAALQAGgMAOAAQAFgBADACIgBAUIgIgBQgPAAgEALIAABBg");
	this.shape_7.setTransform(128.25,105.45);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgNAGgMQAFgLAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_8.setTransform(119.925,105.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgpBDIAAiDIAUAAIABAKQAKgMAOAAQASAAAKANQAKANgBAXIAAACQAAAVgKANQgJANgRAAQgPAAgJgKIAAAtgAgTglIAAApQAGALANAAQAJAAAFgIQAHgHgBgRQAAgOgFgJQgGgIgJAAQgNAAgGALg");
	this.shape_9.setTransform(110.1,107.275);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABDIgVAAIAAhfIAUAAIABALQAKgNAQABQAegBAAAjIAAA+g");
	this.shape_10.setTransform(95.35,105.45);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgIAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAJAAAOIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_11.setTransform(85.475,105.55);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgeA3QgLgOAAgXQAAgVAKgNQALgNARAAQAOAAAJAKIAAgwIAWAAIAACGIgUAAIgBgLQgJAMgPABQgRAAgKgOgAgOgDQgFAGAAARQAAAPAFAIQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAJg");
	this.shape_12.setTransform(75.325,103.65);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgIAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAJAAAOIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_13.setTransform(61.075,105.55);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgTAtQgJgEgFgHQgFgIgBgJIAWAAQAAAIAFAEQAGAEAHABQAIgBAFgDQAEgDAAgFQAAgGgFgDQgEgDgKgDQgLgCgHgDQgQgHAAgOQAAgNAKgIQALgIAPAAQARAAAKAIQALAJgBANIgVAAQAAgGgFgEQgEgFgHABQgHAAgEADQgEADAAAGQgBAEAEADQAFADALADQANADAHADQAIADADAFQADAGAAAIQABANgLAIQgLAHgRABQgLgBgJgEg");
	this.shape_14.setTransform(51.5,105.55);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgIAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAJAAAOIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_15.setTransform(42.025,105.55);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAUAAIABALQAGgMAPAAQAEgBADACIgBAUIgIgBQgOAAgFALIAABBg");
	this.shape_16.setTransform(34.4,105.45);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgNAGgMQAFgLAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_17.setTransform(26.075,105.55);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgpBDIAAiDIAUAAIABAKQAJgMAQAAQARAAAKANQAKANAAAXIAAACQgBAVgJANQgLANgQAAQgPAAgJgKIAAAtgAgTglIAAApQAGALANAAQAJAAAGgIQAFgHAAgRQABgOgGgJQgGgIgJAAQgNAAgGALg");
	this.shape_18.setTransform(16.25,107.275);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgEQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_19.setTransform(252.25,78.15);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgHQAMgIAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_20.setTransform(245.075,79.95);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgVA/QgKgFgFgHIALgMQAJALAPAAQAKAAAFgFQAHgGAAgLIAAgHQgKALgOAAQgRAAgKgOQgLgNAAgXQAAgWALgNQAKgNARAAQAQAAAJALIABgJIATAAIAABbQAAATgLAKQgMALgTAAQgKAAgLgEgAgNgoQgHAIAAAQQAAAPAHAHQAFAIAKAAQAMAAAHgLIAAgpQgHgLgMAAQgKAAgFAJg");
	this.shape_21.setTransform(234.9,81.725);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgHQAMgIAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_22.setTransform(225.125,79.95);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgUA4IgCAKIgTAAIAAiGIAWAAIAAAyQAJgMAOAAQASAAAKAOQAKANAAAWIAAABQAAAWgKANQgKANgRAAQgQAAgJgMgAgTAAIAAAnQAFAMAOAAQAJAAAGgHQAFgIAAgPIAAgDQAAgQgFgGQgGgIgJAAQgOAAgFAMg");
	this.shape_23.setTransform(215.375,78.05);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgWIAAgCQAAgNAGgLQAFgMAKgGQAKgHALAAQAUAAAKANQALAMAAAXIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgMgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_24.setTransform(205.375,79.95);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgTAtQgJgEgFgHQgGgIAAgIIAVAAQABAHAFAEQAFAFAIAAQAIAAAFgEQAEgDAAgGQAAgFgFgDQgEgDgKgCQgLgCgHgEQgQgHAAgOQAAgNAKgIQAKgJAQAAQAQAAALAJQALAIAAAOIgWAAQAAgGgEgEQgFgEgHgBQgHABgEADQgFADABAFQAAAGADACQAFADALADQANADAHAEQAHACAEAGQADAFABAHQgBAOgKAHQgLAIgRAAQgLABgJgFg");
	this.shape_25.setTransform(195.75,79.95);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgKBDIAAiGIAVAAIAACGg");
	this.shape_26.setTransform(173.7,77.95);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgHQAMgIAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_27.setTransform(166.525,79.95);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgTAtQgJgEgFgHQgGgIABgIIAUAAQABAHAFAEQAFAFAIAAQAJAAAEgEQAEgDAAgGQAAgFgEgDQgFgDgKgCQgLgCgHgEQgQgHAAgOQAAgNAKgIQALgJAOAAQASAAAKAJQALAIAAAOIgWAAQAAgGgEgEQgFgEgIgBQgFABgFADQgFADABAFQAAAGADACQAFADAMADQAMADAHAEQAIACADAGQADAFABAHQgBAOgKAHQgLAIgRAAQgLABgJgFg");
	this.shape_28.setTransform(156.95,79.95);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAUAAIABAKQAGgNAPAAQAEAAADACIgBAUIgIgBQgOAAgFAMIAAA/g");
	this.shape_29.setTransform(149.6,79.85);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgfAkQgMgOAAgWIAAAAQAAgOAFgLQAGgLAKgHQAKgFAMgBQATAAAMANQAMAMABAVIAAAEQAAAOgFALQgGALgKAGQgKAHgNgBQgTAAgMgNgAgQgXQgGAIAAAQQAAAPAGAIQAGAIAKAAQALAAAGgIQAGgJAAgPQAAgPgGgIQgHgIgKAAQgKAAgGAIg");
	this.shape_30.setTransform(140.925,79.95);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgeA3QgLgOAAgXQAAgUAKgOQALgOARAAQAOAAAJALIAAgxIAWAAIAACGIgUAAIgBgKQgJAMgPAAQgRAAgKgNgAgOgEQgFAIAAAQQAAAPAFAIQAGAIAJAAQANAAAGgMIAAgnQgGgMgNAAQgJAAgGAIg");
	this.shape_31.setTransform(130.525,78.05);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgLAAgHAMIAABCIgWAAIAAhdIAVAAIABALQAKgOAQAAQAeABAAAhIAAA+g");
	this.shape_32.setTransform(105.5,79.85);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgHQAMgIAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_33.setTransform(95.625,79.95);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgEQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_34.setTransform(88.45,78.15);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgVA/QgJgFgFgHIAKgMQAKALAOAAQAKAAAFgFQAHgGgBgLIAAgHQgJALgOAAQgQAAgLgOQgLgNAAgXQAAgWAKgNQALgNARAAQAQAAAJALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgKgEgAgOgoQgFAIAAAQQAAAPAFAHQAGAIAKAAQANAAAFgLIAAgpQgFgLgNAAQgKAAgGAJg");
	this.shape_35.setTransform(80.85,81.725);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgHQAMgIAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_36.setTransform(71.075,79.95);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgUA4IgCAKIgTAAIAAiGIAWAAIAAAyQAJgMAOAAQASAAAKAOQAKANAAAWIAAABQAAAWgKANQgKANgRAAQgQAAgJgMgAgTAAIAAAnQAFAMAOAAQAJAAAGgHQAFgIAAgPIAAgDQAAgQgFgGQgGgIgJAAQgOAAgFAMg");
	this.shape_37.setTransform(61.325,78.05);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgHQAMgIAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_38.setTransform(36.025,79.95);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgMIAAhCIAVAAIAABdIgUAAIAAgJQgKALgQAAQgPAAgIgJg");
	this.shape_39.setTransform(26.125,80.05);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgeA3QgLgOAAgXQAAgUAKgOQALgOARAAQAOAAAJALIAAgxIAWAAIAACGIgUAAIgBgKQgJAMgPAAQgRAAgKgNgAgOgEQgFAIAAAQQAAAPAFAIQAGAIAJAAQANAAAGgMIAAgnQgGgMgNAAQgJAAgGAIg");
	this.shape_40.setTransform(15.875,78.05);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAVAAIAABfgAgIgtQgDgDAAgGQAAgEADgEQADgDAFAAQAGAAADADQADAEAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_41.setTransform(252.35,52.55);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgVAKgNQALgNARAAQAOAAAJAKIAAgwIAWAAIAACGIgUAAIgBgKQgJALgPABQgRAAgKgOgAgOgDQgFAGAAARQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAJg");
	this.shape_42.setTransform(244.775,52.45);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgWAAIAAhfIAVAAIAAALQALgNAQABQAegBABAjIAAA+g");
	this.shape_43.setTransform(221.3,54.25);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_44.setTransform(211.425,54.35);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgVAKgNQALgNARAAQAOAAAJAKIAAgwIAWAAIAACGIgUAAIgBgKQgJALgPABQgRAAgKgOgAgOgDQgFAGAAARQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAJg");
	this.shape_45.setTransform(201.275,52.45);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgoBDIAAiDIATAAIABAKQAJgMAQAAQARAAAKANQAKANAAAXIAAACQgBAVgJANQgLANgQAAQgPAAgJgKIAAAtgAgTglIAAApQAGALAMAAQAKAAAGgIQAFgHAAgRQABgOgGgJQgGgIgKAAQgMAAgGALg");
	this.shape_46.setTransform(177.9,56.075);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_47.setTransform(167.775,54.35);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgTAtQgJgEgGgIQgEgHAAgJIAUAAQABAIAFAEQAGAEAHAAQAJAAAEgDQAEgDAAgFQAAgGgEgDQgFgDgKgDQgLgCgHgDQgQgHAAgPQAAgMAKgIQALgIAOAAQASAAAKAIQALAJAAANIgWAAQAAgGgEgEQgFgFgIABQgFgBgFAEQgFADABAGQAAAEAEADQAEADAMADQAMACAHAEQAIADADAFQAEAGAAAIQAAAMgMAJQgKAIgRAAQgLgBgJgEg");
	this.shape_48.setTransform(158.2,54.35);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAVAAIAABfgAgIgtQgDgDAAgGQAAgEADgEQADgDAFAAQAGAAADADQADAEAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_49.setTransform(151.3,52.55);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AASBEIAAg+QAAgIgFgFQgDgEgJAAQgMAAgGALIAABEIgWAAIAAiGIAWAAIAAAyQALgMAOAAQAfgBABAjIAAA+g");
	this.shape_50.setTransform(144,52.35);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AgUA/QgLgFgEgHIAJgMQALALAOAAQAJAAAHgFQAFgGAAgLIAAgHQgIALgPAAQgQAAgLgOQgLgNAAgXQAAgWALgNQAKgNASAAQAOAAAKALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgJgEgAgOgoQgFAIAAAQQAAAPAFAHQAGAIAJAAQAOAAAFgLIAAgpQgFgLgOAAQgJAAgGAJg");
	this.shape_51.setTransform(133.7,56.125);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgVAAIAAhfIAUAAIAAALQALgNAQABQAegBAAAjIAAA+g");
	this.shape_52.setTransform(123.8,54.25);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_53.setTransform(114.075,54.35);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgpBDIAAiDIAUAAIABAKQAKgMAOAAQASAAAKANQAKANgBAXIAAACQAAAVgKANQgJANgRAAQgPAAgJgKIAAAtgAgTglIAAApQAGALANAAQAJAAAFgIQAHgHgBgRQAAgOgFgJQgGgIgJAAQgNAAgGALg");
	this.shape_54.setTransform(104.25,56.075);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AARBEIgbgqIgJAKIAAAgIgWAAIAAiGIAWAAIAABMIAGgIIAagdIAZAAIgjAnIAnA4g");
	this.shape_55.setTransform(81.275,52.35);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKAMgQAAQgPAAgIgKg");
	this.shape_56.setTransform(70.975,54.45);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AARBEIgbgqIgJAKIAAAgIgWAAIAAiGIAWAAIAABMIAGgIIAagdIAZAAIgjAnIAnA4g");
	this.shape_57.setTransform(61.875,52.35);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AgVA/QgKgFgFgHIALgMQAJALAPAAQAKAAAFgFQAHgGAAgLIAAgHQgKALgOAAQgRAAgKgOQgLgNAAgXQAAgWAKgNQALgNARAAQAQAAAJALIABgJIATAAIAABbQAAATgLAKQgMALgTAAQgKAAgLgEgAgNgoQgHAIAAAQQAAAPAHAHQAFAIAKAAQAMAAAHgLIAAgpQgHgLgMAAQgKAAgFAJg");
	this.shape_58.setTransform(51.3,56.125);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgWAAIAAhfIAVAAIAAALQALgNAQABQAegBABAjIAAA+g");
	this.shape_59.setTransform(41.4,54.25);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_60.setTransform(31.525,54.35);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AAuAxIAAg9QAAgJgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABBIgVAAIAAg+QAAgRgRAAQgNAAgFALIAABEIgVAAIAAhfIAUAAIAAAKQAKgMASABQASAAAHAOQAKgOATAAQAQgBAIAKQAHAIAAARIAAA+g");
	this.shape_61.setTransform(18.825,54.25);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgLAAgHAMIAABCIgWAAIAAhdIAVAAIABALQAKgOAQAAQAeABAAAhIAAA+g");
	this.shape_62.setTransform(249.6,28.65);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAOIAAArQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_63.setTransform(239.725,28.75);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AgUA/QgLgFgFgHIAKgMQALALAOAAQAJAAAHgFQAFgGAAgLIAAgHQgIALgPAAQgQAAgLgOQgLgNAAgXQAAgWALgNQAKgNASAAQAOAAAKALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgJgEgAgOgoQgFAIAAAQQAAAPAFAHQAGAIAJAAQAOAAAFgLIAAgpQgFgLgOAAQgJAAgGAJg");
	this.shape_64.setTransform(229.55,30.525);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABCIgVAAIAAhdIAUAAIABALQAKgOAQAAQAeABAAAhIAAA+g");
	this.shape_65.setTransform(219.65,28.65);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALAAQAUAAAKANQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgNgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_66.setTransform(209.925,28.75);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AgeA3QgLgOAAgXQAAgUAKgOQALgOARAAQAOAAAJALIAAgxIAWAAIAACGIgUAAIgBgKQgJAMgPAAQgRAAgKgNgAgOgEQgFAHAAARQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgnQgGgMgNAAQgJAAgGAIg");
	this.shape_67.setTransform(199.725,26.85);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAKIAAAeIgWAAIAAiGIAWAAIAABOIAGgJIAagcIAZAAIgjAmIAnA3g");
	this.shape_68.setTransform(173.175,26.75);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAOIAAArQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_69.setTransform(163.025,28.75);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAVAAIAAAKQAHgNANAAQAFAAADACIAAAUIgJgBQgPAAgDAMIAAA/g");
	this.shape_70.setTransform(155.4,28.65);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALAAQAUAAAKANQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgNgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_71.setTransform(147.075,28.75);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2C3E50").s().p("AgUA/QgLgFgFgHIAKgMQALALAOAAQAJAAAHgFQAFgGAAgLIAAgHQgIALgPAAQgQAAgLgOQgLgNAAgXQAAgWALgNQAKgNASAAQAOAAAKALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgJgEgAgOgoQgFAIAAAQQAAAPAFAHQAGAIAJAAQAOAAAFgLIAAgpQgFgLgOAAQgJAAgGAJg");
	this.shape_72.setTransform(136.85,30.525);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#2C3E50").s().p("AgVA/QgJgFgFgHIAKgMQAKALAOAAQAKAAAFgFQAHgGgBgLIAAgHQgJALgOAAQgQAAgLgOQgLgNAAgXQAAgWAKgNQALgNARAAQAQAAAJALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgKgEgAgOgoQgFAIgBAQQABAPAFAHQAGAIAKAAQANAAAFgLIAAgpQgFgLgNAAQgKAAgGAJg");
	this.shape_73.setTransform(126.65,30.525);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgLAAgHAMIAABCIgWAAIAAhdIAVAAIABALQAKgOAQAAQAeABAAAhIAAA+g");
	this.shape_74.setTransform(116.75,28.65);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALAAQAUAAAKANQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgNgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_75.setTransform(107.025,28.75);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#2C3E50").s().p("AgoBDIAAiDIATAAIABAKQAJgMAQAAQARAAAKANQAJANAAAXIAAACQABAVgLANQgKANgQAAQgPAAgJgKIAAAtgAgTglIAAApQAFALANAAQAKAAAFgIQAHgHAAgRQgBgOgFgJQgGgIgKAAQgNAAgFALg");
	this.shape_76.setTransform(97.2,30.475);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_77.setTransform(72.1,26.95);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAOIAAArQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_78.setTransform(64.925,28.75);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#2C3E50").s().p("AgVA/QgJgFgFgHIAKgMQAKALAOAAQAKAAAFgFQAHgGgBgLIAAgHQgJALgOAAQgQAAgLgOQgLgNAAgXQAAgWAKgNQALgNARAAQAQAAAJALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgKgEgAgOgoQgFAIAAAQQAAAPAFAHQAGAIAJAAQAOAAAFgLIAAgpQgFgLgOAAQgJAAgGAJg");
	this.shape_79.setTransform(54.75,30.525);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAOIAAArQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_80.setTransform(44.975,28.75);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#2C3E50").s().p("AgUA4IgCAKIgTAAIAAiGIAWAAIAAAyQAJgMAOAAQASAAAKAOQAKAMAAAXIAAABQAAAWgKANQgKANgRAAQgQAAgJgMgAgTAAIAAAmQAFANAOAAQAJAAAGgHQAFgIAAgPIAAgDQAAgQgFgGQgGgIgJAAQgOAAgFAMg");
	this.shape_81.setTransform(35.225,26.85);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALAAQAUAAAKANQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgNgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_82.setTransform(25.225,28.75);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#2C3E50").s().p("AgTAtQgJgEgGgHQgEgIgBgIIAWAAQAAAHAFAEQAFAFAIAAQAJAAAEgEQAEgDAAgGQAAgFgFgDQgEgDgKgCQgLgCgHgEQgQgHAAgOQAAgNAKgIQALgJAPAAQARAAAKAJQAKAJAAANIgVAAQAAgGgFgEQgEgEgHgBQgHABgEADQgEADgBAGQAAAFAFACQAEADALADQANACAHAFQAIACADAGQAEAFgBAHQABANgMAJQgKAHgRAAQgLABgJgFg");
	this.shape_83.setTransform(15.6,28.75);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#2C3E50").s().p("AgJBEIAAiGIAUAAIAACGg");
	this.shape_84.setTransform(252.2,1.15);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgEAKAAQARABAKAIQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_85.setTransform(245.025,3.15);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAVAAIAAALQAHgNANAAQAFABADABIgBAUIgIgBQgPAAgDAMIAABAg");
	this.shape_86.setTransform(237.4,3.05);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAFACACQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgcg");
	this.shape_87.setTransform(230.575,2.1);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgVAAIAAhfIAUAAIAAALQALgNAQAAQAeAAAAAjIAAA+g");
	this.shape_88.setTransform(222.8,3.05);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALAKQgFAJgKAEQgKAGgLgBQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_89.setTransform(213.075,3.15);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#2C3E50").s().p("AgIAwIghhfIAWAAIATBEIAUhEIAWAAIghBfg");
	this.shape_90.setTransform(203.675,3.15);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABDIgWAAIAAhfIAVAAIABALQAKgNAQAAQAeAAAAAjIAAA+g");
	this.shape_91.setTransform(186.15,3.05);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgEAKAAQARABAKAIQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_92.setTransform(176.275,3.15);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAVAAIAABfgAgIgtQgDgDAAgGQAAgEADgDQADgEAFAAQAGAAADAEQADADAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_93.setTransform(169.1,1.35);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#2C3E50").s().p("AgUA/QgLgFgEgHIAJgMQALALAOAAQAJAAAHgFQAFgGAAgLIAAgHQgIALgPAAQgQAAgLgOQgLgNAAgXQAAgWAKgNQALgNASAAQAOAAAKALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgKAAgKgEgAgOgoQgFAIAAAQQAAAPAFAHQAGAIAJAAQAOAAAFgLIAAgpQgFgLgOAAQgJAAgGAJg");
	this.shape_94.setTransform(161.5,4.925);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgEAKAAQARABAKAIQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_95.setTransform(151.725,3.15);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#2C3E50").s().p("AgUA4IgCALIgTAAIAAiGIAWAAIAAAwQAJgLAOAAQASAAAKANQAKAOAAAVIAAACQAAAWgKANQgKANgRAAQgQAAgJgMgAgTAAIAAAnQAFAMAOAAQAJAAAGgIQAFgHAAgPIAAgDQAAgPgFgHQgGgIgJAAQgOAAgFAMg");
	this.shape_96.setTransform(141.975,1.25);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgEAKAAQARABAKAIQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_97.setTransform(123.725,3.15);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#2C3E50").s().p("AgUA/QgLgFgFgHIAKgMQAKALAPAAQAJAAAHgFQAFgGAAgLIAAgHQgIALgPAAQgQAAgLgOQgLgNAAgXQAAgWALgNQAKgNASAAQAOAAAKALIABgJIATAAIAABbQAAATgLAKQgMALgTAAQgKAAgKgEgAgNgoQgHAIABAQQgBAPAHAHQAFAIAJAAQANAAAGgLIAAgpQgGgLgNAAQgJAAgFAJg");
	this.shape_98.setTransform(113.55,4.925);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAUAAIAABfgAgIgtQgDgDAAgGQAAgEADgDQADgEAFAAQAGAAADAEQADADAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_99.setTransform(106.35,1.35);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAFACACQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgcg");
	this.shape_100.setTransform(100.825,2.1);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAVAAIAABfgAgIgtQgDgDAAgGQAAgEADgDQADgEAFAAQAGAAADAEQADADAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_101.setTransform(87.65,1.35);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgVAKgNQALgOARAAQAOAAAJALIAAgwIAWAAIAACGIgUAAIgBgKQgJAMgPgBQgRAAgKgNgAgOgDQgFAGAAARQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAJg");
	this.shape_102.setTransform(80.075,1.25);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#2C3E50").s().p("AgUA/QgLgFgFgHIAKgMQAKALAPAAQAJAAAHgFQAFgGAAgLIAAgHQgIALgPAAQgQAAgLgOQgLgNAAgXQAAgWALgNQAKgNASAAQAOAAAKALIABgJIATAAIAABbQAAATgLAKQgMALgTAAQgKAAgKgEgAgNgoQgHAIABAQQgBAPAHAHQAFAIAJAAQANAAAGgLIAAgpQgGgLgNAAQgJAAgFAJg");
	this.shape_103.setTransform(61.8,4.925);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgVAAIAAhfIAUAAIAAALQALgNAQAAQAeAAABAjIAAA+g");
	this.shape_104.setTransform(51.9,3.05);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKALgQAAQgPAAgIgJg");
	this.shape_105.setTransform(41.875,3.25);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#2C3E50").s().p("AgUA4IgCALIgTAAIAAiGIAWAAIAAAwQAJgLAOAAQASAAAKANQAKAOAAAVIAAACQAAAWgKANQgKANgRAAQgQAAgJgMgAgTAAIAAAnQAFAMAOAAQAJAAAGgIQAFgHAAgPIAAgDQAAgPgFgHQgGgIgJAAQgOAAgFAMg");
	this.shape_106.setTransform(32.025,1.25);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgEAKAAQARABAKAIQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_107.setTransform(21.875,3.15);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAFACACQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgcg");
	this.shape_108.setTransform(13.775,2.1);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#2C3E50").s().p("AgJBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_109.setTransform(252.3,-24.25);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAKIAAAeIgWAAIAAiGIAWAAIAABNIAGgIIAagcIAZAAIgjAmIAnA3g");
	this.shape_110.setTransform(245.875,-24.45);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAArQAAAMAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_111.setTransform(235.725,-22.45);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAKIAAAeIgWAAIAAiGIAWAAIAABNIAGgIIAagcIAZAAIgjAmIAnA3g");
	this.shape_112.setTransform(226.725,-24.45);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#2C3E50").s().p("AgJBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_113.setTransform(196.85,-24.25);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAKIAAAeIgWAAIAAiGIAWAAIAABNIAGgIIAagcIAZAAIgjAmIAnA3g");
	this.shape_114.setTransform(190.425,-24.45);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_115.setTransform(182.85,-24.25);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#2C3E50").s().p("AgJBDIAAiGIATAAIAACGg");
	this.shape_116.setTransform(178.25,-24.45);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_117.setTransform(173.65,-24.25);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgMASAAQASAAAHAOQAKgOATAAQAQAAAIAJQAHAIAAARIAAA9g");
	this.shape_118.setTransform(163.525,-22.55);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALABQAUAAAKAMQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_119.setTransform(150.975,-22.45);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgMASAAQASAAAHAOQAKgOATAAQAQAAAIAJQAHAIAAARIAAA9g");
	this.shape_120.setTransform(138.225,-22.55);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_121.setTransform(105.8,-24.25);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABCIgVAAIAAhdIAUAAIABAKQAKgMAQAAQAeAAAAAhIAAA+g");
	this.shape_122.setTransform(98.5,-22.55);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_123.setTransform(91.2,-24.25);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABCIgVAAIAAhdIAUAAIABAKQAKgMAQAAQAeAAAAAhIAAA+g");
	this.shape_124.setTransform(61.6,-22.55);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAArQAAAMAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_125.setTransform(51.725,-22.45);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#2C3E50").s().p("AAUAvIgUhAIgTBAIgSAAIgahdIAVAAIAPA/IAUg/IAPAAIAUBAIAPhAIAVAAIgaBdg");
	this.shape_126.setTransform(40.125,-22.45);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALABQAUAAAKAMQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_127.setTransform(28.725,-22.45);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#2C3E50").s().p("AAdBAIAAg5Ig5AAIAAA5IgWAAIAAh/IAWAAIAAA2IA5AAIAAg2IAWAAIAAB/g");
	this.shape_128.setTransform(17.375,-24.1);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.258,0,0,2.969,-156.6,-129.5)).s().p("A4eULMAAAgoWMAw8AAAMAAAAoWg");
	this.shape_129.setTransform(134.6,51.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop15G3, new cjs.Rectangle(-22,-77.5,313.3,258.3), null);


(lib.drop15G2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape.setTransform(204.475,68.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgdAnQgIgIAAgLQAAgOAKgHQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgFADAAAFIgUAAQAAgHAGgHQAEgGAIgEQAJgDAJAAQAQAAAKAHQAJAJAAAOIAAAnQAAAMADAIIAAABIgUAAIgCgIQgKAKgNAAQgNgBgJgHgAgLAGQgHAFAAAHQAAAGAFADQAEADAGAAQAFAAAFgCQAGgDACgFIAAgRIgLAAQgKAAgFADg");
	this.shape_1.setTransform(197.7,70.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_2.setTransform(188.375,70.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgCAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDACQgDADgFAAQgEAAgDgDg");
	this.shape_3.setTransform(181.475,69.15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgcA0QgKgNAAgVQAAgVAJgMQAKgMAQAAQAOAAAIAKIAAguIAUAAIAAB+IgSAAIgBgJQgJAKgOABQgQAAgJgNgAgNgDQgFAGAAAQQAAAOAFAHQAGAIAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_4.setTransform(174.275,69.05);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_5.setTransform(164.975,70.925);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgWIATAAIAAAWIAQAAIAAAPIgQAAIAAAyQAAAEACADQACACAGAAIAHgBIAAAQIgOACQgWgBAAgZg");
	this.shape_6.setTransform(157.225,69.85);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgCAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDACQgDADgFAAQgEAAgDgDg");
	this.shape_7.setTransform(152.425,69.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgUA7QgJgEgFgGIAKgMQAJAKANABQAJgBAHgFQAFgGABgKIAAgGQgJAKgOAAQgPAAgLgNQgKgNABgUQgBgWAKgMQAKgMAQAAQAPgBAJALIABgJIASAAIAABWQgBASgKAKQgMALgRAAQgKAAgKgFgAgNgmQgFAIgBAPQABAOAFAGQAGAIAIAAQAMAAAHgKIAAgmQgHgLgLAAQgJAAgGAIg");
	this.shape_8.setTransform(145.25,72.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_9.setTransform(135.875,70.775);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgdAiQgMgNAAgUIAAgBQAAgNAGgKQAFgLAJgGQAKgFALAAQASgBAMAMQALAMABATIAAAEQAAAOgFAJQgFALgKAGQgJAFgNABQgSAAgLgNgAgPgWQgGAJAAAOQAAAOAGAIQAGAHAJAAQAKABAGgJQAGgHAAgPQAAgNgGgJQgGgHgKgBQgJABgGAHg");
	this.shape_10.setTransform(126.275,70.85);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_11.setTransform(119.275,68.975);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_12.setTransform(108.125,70.775);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgdAnQgIgIgBgLQABgOAKgHQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgFADAAAFIgUAAQAAgHAGgHQAEgGAIgEQAJgDAJAAQAQAAAJAHQAKAJAAAOIAAAnQAAAMAEAIIAAABIgVAAIgDgIQgJAKgNAAQgNgBgJgHgAgLAGQgHAFAAAHQAAAGAFADQAEADAGAAQAFAAAFgCQAFgDADgFIAAgRIgLAAQgKAAgFADg");
	this.shape_13.setTransform(98.8,70.85);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgcA0QgKgNAAgVQAAgVAJgMQAKgMAQAAQAOAAAIAKIAAguIAUAAIAAB+IgSAAIgBgJQgJAKgOABQgQAAgJgNgAgNgDQgFAGAAAQQAAAOAFAHQAGAIAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_14.setTransform(89.175,69.05);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgWAuIAAhZIATAAIAAAKQAGgMANAAIAHABIAAATIgIAAQgOAAgDAKIAAA9g");
	this.shape_15.setTransform(77.75,70.775);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgdAnQgJgIAAgLQAAgOALgHQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEAEQgFADABAFIgVAAQABgHAEgHQAFgGAIgEQAJgDAKAAQAPAAAJAHQAKAJAAAOIAAAnQAAAMAEAIIAAABIgVAAIgDgIQgJAKgNAAQgOgBgIgHgAgMAGQgFAFgBAHQABAGAEADQADADAHAAQAFAAAFgCQAFgDADgFIAAgRIgLAAQgKAAgGADg");
	this.shape_16.setTransform(69.75,70.85);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_17.setTransform(62.975,68.975);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_18.setTransform(56.075,70.925);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AAQBAIgagnIgJAJIAAAeIgTAAIAAh/IATAAIAABJIAHgIIAYgbIAYAAIghAkIAlA1g");
	this.shape_19.setTransform(47.5,68.975);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgXAuIAAhZIATAAIABAKQAGgMAOAAIAGABIAAATIgIAAQgNAAgFAKIAAA9g");
	this.shape_20.setTransform(39.9,70.775);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgCAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDACQgDADgFAAQgEAAgDgDg");
	this.shape_21.setTransform(34.325,69.15);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgSAqQgIgDgFgIQgFgGAAgIIAUAAQAAAHAFAEQAFADAHAAQAIAAAEgCQAEgEAAgEQAAgGgEgDQgEgCgKgCQgKgDgHgDQgPgGAAgOQAAgMAKgIQAKgHAOAAQAQAAAKAHQAKAIAAANIgVAAQAAgFgEgEQgEgFgHAAQgGAAgEAEQgEADAAAFQAAAEAEADQADADALADQAMACAHAEQAHACADAFQADAFAAAIQAAAMgKAHQgKAHgQABQgKAAgJgFg");
	this.shape_22.setTransform(27.725,70.85);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgWIATAAIAAAWIAQAAIAAAPIgQAAIAAAyQAAAFACACQACACAGAAIAHgBIAAAQIgOACQgWgBAAgZg");
	this.shape_23.setTransform(245.375,45.45);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgdAiQgMgNAAgUIAAgBQAAgNAGgKQAFgLAJgGQAKgFALgBQASAAAMAMQALAMABATIAAAEQAAAOgFAJQgFALgKAGQgJAFgNABQgSAAgLgNgAgPgWQgGAJAAAOQAAAOAGAIQAGAHAJAAQAKABAGgJQAGgHAAgPQAAgNgGgJQgGgHgKgBQgJABgGAHg");
	this.shape_24.setTransform(237.875,46.45);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgWIATAAIAAAWIAQAAIAAAPIgQAAIAAAyQAAAFACACQACACAGAAIAHgBIAAAQIgOACQgWgBAAgZg");
	this.shape_25.setTransform(230.025,45.45);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgdAiQgMgNAAgUIAAgBQAAgNAGgKQAFgLAJgGQAKgFALgBQASAAAMAMQALAMABATIAAAEQAAAOgFAJQgFALgKAGQgJAFgNABQgSAAgLgNgAgPgWQgGAJAAAOQAAAOAGAIQAGAHAJAAQAKABAGgJQAGgHAAgPQAAgNgGgJQgGgHgKgBQgJABgGAHg");
	this.shape_26.setTransform(222.525,46.45);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_27.setTransform(201.425,44.75);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgSAqQgIgDgFgIQgFgGAAgJIAUAAQAAAIAFAEQAFADAHAAQAIAAAEgCQAEgDAAgFQAAgGgEgCQgEgDgKgDQgKgCgHgDQgPgGAAgOQAAgMAKgIQAKgHAOgBQAQABAKAHQAKAJAAAMIgVAAQAAgFgEgEQgEgFgHAAQgGAAgEADQgEAEAAAFQAAAEAEADQADADALADQAMACAHADQAHADADAFQADAFAAAIQAAAMgKAHQgKAIgQAAQgKAAgJgFg");
	this.shape_28.setTransform(194.825,46.45);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AAQBAIgagnIgJAJIAAAeIgUAAIAAh/IAUAAIAABJIAHgIIAYgbIAYAAIghAkIAlA1g");
	this.shape_29.setTransform(186.65,44.575);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgdAnQgJgIAAgLQAAgPALgGQALgIATAAIAMAAIAAgGQAAgHgEgEQgEgEgHAAQgGAAgFAEQgEADAAAFIgUAAQAAgIAEgFQAFgHAJgEQAIgEAKAAQAPABAKAHQAJAJAAAOIAAAnQAAANADAGIAAACIgUAAIgDgIQgJAJgNABQgNAAgJgIgAgMAGQgFAFAAAHQAAAGADADQAEADAHAAQAFABAFgDQAFgEADgEIAAgRIgLAAQgKAAgGADg");
	this.shape_30.setTransform(177.05,46.45);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgXAuIAAhZIATAAIABAKQAGgMAOAAIAGABIAAATIgIAAQgNAAgFAKIAAA9g");
	this.shape_31.setTransform(169.85,46.375);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgWIATAAIAAAWIAQAAIAAAPIgQAAIAAAyQAAAFACACQACACAGAAIAHgBIAAAQIgOACQgWgBAAgZg");
	this.shape_32.setTransform(163.425,45.45);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_33.setTransform(156.075,46.375);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgdAiQgMgNAAgUIAAgBQAAgNAGgKQAFgLAJgGQAKgFALgBQASAAAMAMQALAMABATIAAAEQAAAOgFAJQgFALgKAGQgJAFgNABQgSAAgLgNgAgPgWQgGAJAAAOQAAAOAGAIQAGAHAJAAQAKABAGgJQAGgHAAgPQAAgNgGgJQgGgHgKgBQgJABgGAHg");
	this.shape_34.setTransform(146.475,46.45);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AAQBAIgagnIgJAJIAAAeIgUAAIAAh/IAUAAIAABJIAHgIIAYgbIAYAAIghAkIAkA1g");
	this.shape_35.setTransform(137.8,44.575);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_36.setTransform(113.975,46.375);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgdAnQgIgIgBgLQAAgPALgGQALgIATAAIAMAAIAAgGQAAgHgEgEQgEgEgHAAQgGAAgFAEQgFADAAAFIgUAAQAAgIAGgFQAEgHAIgEQAJgEAJAAQAQABAJAHQAKAJAAAOIAAAnQAAANAEAGIAAACIgVAAIgDgIQgJAJgNABQgNAAgJgIgAgLAGQgHAFAAAHQAAAGAFADQAEADAGAAQAFABAFgDQAFgEADgEIAAgRIgLAAQgKAAgFADg");
	this.shape_37.setTransform(104.65,46.45);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgcA0QgKgNAAgVQAAgVAJgMQAKgNAQAAQAOAAAIALIAAgvIAUAAIAAB/IgSAAIgBgJQgJAKgOABQgQAAgJgNgAgNgDQgFAGAAAQQAAAOAFAHQAGAIAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_38.setTransform(95.025,44.65);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgUA7QgJgEgFgGIAKgMQAJAKANABQAJgBAHgFQAFgGAAgKIAAgGQgIAKgOAAQgPAAgKgNQgLgNABgUQAAgWAJgMQAKgNAQAAQAOAAAKALIABgJIASAAIAABWQAAASgMAKQgKALgSAAQgKgBgKgEgAgNgmQgFAIgBAPQABAOAFAGQAGAIAIAAQANAAAFgKIAAgnQgGgKgMAAQgIAAgGAIg");
	this.shape_39.setTransform(71.35,48.15);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_40.setTransform(61.975,46.375);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_41.setTransform(52.525,46.525);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgTA2IgBAJIgSAAIAAh/IAUAAIAAAvQAIgLAOAAQARAAAJANQAJAMAAAVIAAABQAAAVgJAMQgJAMgRABQgOgBgJgKgAgSAAIAAAlQAFALANAAQAJAAAFgHQAFgHAAgOIAAgCQAAgQgFgGQgFgHgJAAQgNAAgFALg");
	this.shape_42.setTransform(43.225,44.65);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgdAnQgJgIAAgLQAAgPALgGQALgIATAAIAMAAIAAgGQAAgHgEgEQgEgEgHAAQgHAAgEAEQgFADABAFIgVAAQABgIAFgFQAEgHAIgEQAJgEAJAAQAQABAJAHQAKAJAAAOIAAAnQAAANAEAGIAAACIgVAAIgDgIQgJAJgNABQgOAAgIgIgAgMAGQgFAFgBAHQAAAGAFADQAEADAGAAQAFABAFgDQAFgEADgEIAAgRIgLAAQgKAAgGADg");
	this.shape_43.setTransform(33.65,46.45);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgWIATAAIAAAWIAQAAIAAAPIgQAAIAAAyQAAAFACACQACACAGAAIAHgBIAAAQIgOACQgWgBAAgZg");
	this.shape_44.setTransform(26.025,45.45);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_45.setTransform(246.225,20.35);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AAQBAIgagnIgJAJIAAAeIgTAAIAAh/IATAAIAABJIAHgIIAYgbIAYAAIghAkIAlA1g");
	this.shape_46.setTransform(240.2,20.175);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AgdAnQgJgIAAgLQAAgPALgGQALgIASAAIANAAIAAgGQAAgHgEgEQgEgEgHAAQgGAAgFADQgEAEAAAFIgUAAQAAgIAEgFQAFgHAJgEQAIgEAKAAQAPABAKAHQAJAJAAAOIAAAnQAAANADAGIAAACIgUAAIgDgIQgJAJgNABQgNAAgJgIgAgMAGQgFAFAAAHQAAAFADAEQAEADAHABQAFAAAFgDQAFgDADgFIAAgRIgLAAQgKAAgGADg");
	this.shape_47.setTransform(230.6,22.05);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AAQBAIgZgnIgJAJIAAAeIgVAAIAAh/IAVAAIAABJIAGgIIAXgbIAZAAIgiAkIAlA1g");
	this.shape_48.setTransform(222.15,20.175);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_49.setTransform(195.575,20.35);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AAQBAIgagnIgJAJIAAAeIgUAAIAAh/IAUAAIAABJIAHgIIAYgbIAYAAIghAkIAkA1g");
	this.shape_50.setTransform(189.55,20.175);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_51.setTransform(182.375,20.35);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_52.setTransform(178.025,20.175);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_53.setTransform(173.675,20.35);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AAsAuIAAg6QAAgIgFgEQgDgEgIAAQgIAAgEAEQgEADgCAGIAAA9IgTAAIAAg6QgBgQgPAAQgNAAgEAKIAABAIgUAAIAAhZIATAAIAAAJQAJgLARAAQARAAAHAOQAJgOASAAQAPAAAHAIQAHAJABAQIAAA6g");
	this.shape_54.setTransform(164.1,21.975);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgbAiQgMgMABgTIAAgDQAAgNAEgKQAGgKAJgGQAJgGALgBQATAAAJAMQALAMAAAVIAAAHIg6AAQABALAGAHQAHAGAJABQAOgBAIgKIALAKQgGAIgIAEQgKAFgKAAQgTAAgMgNgAgLgXQgGAFgBALIAlAAIAAgCQAAgKgFgFQgFgFgIgBQgIAAgEAHg");
	this.shape_55.setTransform(152.25,22.05);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AArAuIAAg6QAAgIgDgEQgEgEgJAAQgGAAgFAEQgFADgBAGIAAA9IgTAAIAAg6QAAgQgRAAQgLAAgGAKIAABAIgUAAIAAhZIATAAIABAJQAKgLAQAAQARAAAGAOQAKgOASAAQAPAAAHAIQAIAJgBAQIAAA6g");
	this.shape_56.setTransform(140.2,21.975);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_57.setTransform(111.225,20.35);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_58.setTransform(104.325,21.975);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_59.setTransform(97.425,20.35);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_60.setTransform(71.125,21.975);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgdAnQgIgIAAgLQAAgPAKgGQALgIASAAIANAAIAAgGQAAgHgEgEQgEgEgHAAQgGAAgFADQgFAEAAAFIgUAAQAAgIAGgFQAEgHAIgEQAJgEAJAAQAQABAJAHQAKAJAAAOIAAAnQAAANADAGIAAACIgUAAIgCgIQgKAJgNABQgNAAgJgIgAgLAGQgHAFAAAHQAAAFAFAEQAEADAGABQAFAAAFgDQAGgDACgFIAAgRIgLAAQgKAAgFADg");
	this.shape_61.setTransform(61.8,22.05);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AATAtIgTg8IgSA8IgQAAIgZhZIAUAAIAOA8IATg8IAOAAIASA9IAPg9IATAAIgYBZg");
	this.shape_62.setTransform(50.875,22.05);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AgaAiQgMgMgBgTIAAgDQAAgNAGgKQAFgKAJgGQAKgGAKgBQATAAAKAMQAKAMgBAVIAAAHIg6AAQACALAGAHQAGAGAJABQAOgBAJgKIALAKQgFAIgKAEQgIAFgMAAQgSAAgLgNgAgMgXQgEAFgCALIAmAAIAAgCQgBgKgFgFQgFgFgIgBQgHAAgGAHg");
	this.shape_63.setTransform(40.15,22.05);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AAbA8IAAg1Ig1AAIAAA1IgVAAIAAh3IAVAAIAAAyIA1AAIAAgyIAVAAIAAB3g");
	this.shape_64.setTransform(29.425,20.5);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.165,0,0,1.778,-145,-77.5)).s().p("A2qMFIAA4JMAtVAAAIAAYJg");
	this.shape_65.setTransform(136.6,52.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop15G2, new cjs.Rectangle(-8.5,-25.1,290.2,154.7), null);


(lib.drop15G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgVAAIAAhfIAUAAIAAALQALgNAQABQAegBABAjIAAA+g");
	this.shape.setTransform(84.4,70.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKAMgQAAQgPAAgIgKg");
	this.shape_1.setTransform(74.375,71.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AAuAxIAAg9QAAgJgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABBIgVAAIAAg+QAAgRgRAAQgNAAgFAKIAABFIgVAAIAAhfIAUAAIAAAKQAKgMASABQASAAAHAOQAKgOATAAQAQgBAIAKQAHAIAAARIAAA+g");
	this.shape_2.setTransform(61.575,70.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAUAAIAABfgAgIgtQgDgDAAgGQAAgEADgEQADgDAFAAQAGAAADADQADAEAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_3.setTransform(51.45,69.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAFACACQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgcg");
	this.shape_4.setTransform(45.925,69.95);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_5.setTransform(38.425,71);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AARBEIgbgqIgJAKIAAAgIgWAAIAAiGIAWAAIAABMIAGgIIAagdIAZAAIgjAnIAnA4g");
	this.shape_6.setTransform(29.375,69);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgJBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_7.setTransform(230.6,43.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgKAhIAAg1IgQAAIAAgQIAQAAIAAgXIAUAAIAAAXIARAAIAAAQIgRAAIAAA0QAAAGACACQACACAGAAIAHgBIAAARQgHACgHAAQgXAAAAgbg");
	this.shape_8.setTransform(225.075,44.35);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAUAAIABAKQAHgNAOAAQAEAAADACIAAAUIgJgBQgPAAgDALIAABAg");
	this.shape_9.setTransform(219.55,45.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALAAQAUAAAKANQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgNgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_10.setTransform(211.225,45.4);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgoBDIAAiDIATAAIABAKQAKgMAPAAQARAAAKANQAKANAAAXIAAACQAAAVgKANQgKANgRAAQgPAAgJgKIAAAtgAgTglIAAApQAFALANAAQAKAAAGgIQAFgHABgRQAAgOgGgJQgGgIgKAAQgNAAgFALg");
	this.shape_11.setTransform(201.4,47.125);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALAAQAUAAAKANQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgNgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_12.setTransform(191.425,45.4);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgTAtQgJgEgFgHQgGgIAAgIIAVAAQABAHAFAEQAFAFAIAAQAIAAAFgEQAEgDAAgGQAAgFgFgDQgEgDgKgCQgLgCgHgEQgQgHAAgOQAAgNAKgIQAKgJAQAAQAQAAALAJQALAJAAANIgWAAQAAgGgEgEQgFgEgHgBQgHABgEADQgFADABAGQAAAFADACQAFADALADQANACAHAFQAHACAEAGQADAFABAHQgBANgKAJQgLAHgRAAQgLABgJgFg");
	this.shape_13.setTransform(181.8,45.4);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgVA/QgKgFgEgHIAKgMQAJALAPAAQAKAAAFgFQAHgGAAgLIAAgHQgKALgOAAQgRAAgKgOQgLgNAAgXQAAgWAKgNQALgNARAAQAPAAAKALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgKgEgAgOgoQgFAIgBAQQABAPAFAHQAGAIAKAAQAMAAAHgLIAAgpQgHgLgMAAQgKAAgGAJg");
	this.shape_14.setTransform(113.95,47.175);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgLAAgHAMIAABCIgWAAIAAhdIAVAAIABALQAKgOAQAAQAeABABAhIAAA+g");
	this.shape_15.setTransform(104.05,45.3);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAOIAAArQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_16.setTransform(94.175,45.4);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgTBTIAAgRIAHABQALAAAAgMIAAhnIAUAAIAABnQAAAOgHAIQgHAIgNAAIgLgCgAAAhAQgDgEAAgFQAAgEADgEQADgDAFAAQAGAAADADQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_17.setTransform(86.175,45.525);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABCIgVAAIAAhdIAUAAIAAALQALgOAQAAQAeABABAhIAAA+g");
	this.shape_18.setTransform(79.8,45.3);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAOIAAArQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_19.setTransform(69.925,45.4);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgEQgEgFgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgNASAAQASAAAHAPQAKgPATAAQAQABAIAIQAHAJAAARIAAA9g");
	this.shape_20.setTransform(57.225,45.3);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALAAQAUAAAKANQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgNgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_21.setTransform(44.675,45.4);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgEQgEgFgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgNASAAQASAAAHAPQAKgPATAAQAQABAIAIQAHAJAAARIAAA9g");
	this.shape_22.setTransform(31.925,45.3);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AASBEIAAg+QAAgIgEgFQgFgEgIAAQgMAAgGALIAABEIgVAAIAAiGIAVAAIAAAyQAKgNAPAAQAfAAABAjIAAA+g");
	this.shape_23.setTransform(227.85,17.8);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKAMgQAAQgPgBgIgJg");
	this.shape_24.setTransform(217.825,19.9);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgUA4IgCALIgTAAIAAiGIAWAAIAAAwQAJgLAOAAQASAAAKANQAKAOAAAVIAAACQAAAWgKANQgKANgRABQgQAAgJgNgAgTAAIAAAnQAFAMAOAAQAJAAAGgIQAFgHAAgPIAAgDQAAgPgFgHQgGgIgJAAQgOAAgFAMg");
	this.shape_25.setTransform(207.975,17.9);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKAMgQAAQgPgBgIgJg");
	this.shape_26.setTransform(197.675,19.9);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAFACACQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgcg");
	this.shape_27.setTransform(189.475,18.75);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgDAAgGQAAgEADgDQADgEAFAAQAGAAADAEQADADAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_28.setTransform(178.05,18);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AARBEIgbgqIgJAKIAAAgIgWAAIAAiGIAWAAIAABMIAGgIIAagdIAZAAIgjAnIAnA4g");
	this.shape_29.setTransform(171.625,17.8);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAUAAIAABfgAgIgtQgDgDAAgGQAAgEADgDQADgEAFAAQAGAAADAEQADADAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_30.setTransform(164.05,18);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgKBEIAAiGIAUAAIAACGg");
	this.shape_31.setTransform(159.45,17.8);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgDAAgGQAAgEADgDQADgEAFAAQAGAAADAEQADADAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_32.setTransform(154.85,18);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AAuAxIAAg9QAAgJgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAHIAABAIgVAAIAAg+QAAgRgRAAQgNAAgFAKIAABFIgVAAIAAhfIAUAAIAAAKQAKgMASAAQASAAAHAPQAKgPATAAQAQAAAIAKQAHAIAAARIAAA+g");
	this.shape_33.setTransform(144.725,19.7);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALAKQgFAJgKAEQgKAGgLgBQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_34.setTransform(132.175,19.8);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AAuAxIAAg9QAAgJgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAHIAABAIgVAAIAAg+QAAgRgRAAQgNAAgFAKIAABFIgVAAIAAhfIAUAAIAAAKQAKgMASAAQASAAAHAPQAKgPATAAQAQAAAIAKQAHAIAAARIAAA+g");
	this.shape_35.setTransform(119.425,19.7);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAVAAIAABfgAgIgtQgDgDAAgGQAAgEADgDQADgEAFAAQAGAAADAEQADADAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_36.setTransform(102.95,18);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgVAAIAAhfIAUAAIAAALQALgNAQAAQAeAAABAjIAAA+g");
	this.shape_37.setTransform(95.65,19.7);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAUAAIAABfgAgIgtQgDgDAAgGQAAgEADgDQADgEAFAAQAGAAADAEQADADAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_38.setTransform(88.35,18);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgWAAIAAhfIAVAAIAAALQALgNAQAAQAeAAABAjIAAA+g");
	this.shape_39.setTransform(74.7,19.7);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgEAKAAQARABAKAIQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_40.setTransform(64.825,19.8);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AAUAwIgUhBIgTBBIgSAAIgahfIAVAAIAPBAIAUhAIAPAAIAUBBIAPhBIAVAAIgaBfg");
	this.shape_41.setTransform(53.225,19.8);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALAKQgFAJgKAEQgKAGgLgBQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_42.setTransform(41.825,19.8);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AAdBAIAAg5Ig5AAIAAA5IgWAAIAAh/IAWAAIAAA2IA5AAIAAg2IAWAAIAAB/g");
	this.shape_43.setTransform(30.475,18.15);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.176,0,0,1.806,-146.5,-78.8)).s().p("A24MSIAA4jMAtxAAAIAAYjg");
	this.shape_44.setTransform(128.525,49.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop15G1, new cjs.Rectangle(-17.9,-29.3,292.9,157.20000000000002), null);


(lib.drag15G11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap154();
	this.instance.setTransform(0,-3,0.3214,0.5036);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgOASQgDgDAAgGQAAgGAGgDQAFgEAIAAIAGAAIABgCIAAgEQgBgEgFAAQgDAAgBACQgCABgBADIgJAAQAAgEADgDQACgDAEgCIAIgBQAHAAAEAEQAEAEgBAHIgDATIAAADIAAAFIAAAAIgJAAIAAgEQgGAFgFAAQgFAAgEgEgAgEADQgDACgBADQAAABAAABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQAAAAABABQAAAAABAAQABAAAAAAQADAAACgBIAEgEIACgIIgFAAQgEAAgDACg");
	this.shape.setTransform(71.0278,80);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgOAVIAIgpIAHAAIAAAFQAEgGAGAAIADABIgBAJIgDgBQgGABgEAEIgEAcg");
	this.shape_1.setTransform(67.8,79.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgHAXQgCgDAAgFIAEgXIgGAAIABgIIAHAAIABgJIAJAAIgCAJIAHAAIgBAIIgHAAIgEAWIAAACQAAABAAAAQAAABABAAQAAAAAAABQABAAABAAIADAAIgBAHIgFABQgEAAgDgEg");
	this.shape_2.setTransform(65.175,79.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgOASQgDgDAAgGQAAgGAGgDQAFgEAIAAIAGAAIABgCIAAgEQgBgEgFAAQgDAAgBACQgCABgBADIgJAAQAAgEADgDQACgDAEgCIAIgBQAHAAAEAEQAEAEgBAHIgDATIAAADIAAAFIAAAAIgJAAIAAgEQgGAFgFAAQgFAAgEgEgAgEADQgDACgBADQAAABAAABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQAAAAABABQAAAAABAAQABAAAAAAQADAAACgBIAEgEIACgIIgFAAQgEAAgDACg");
	this.shape_3.setTransform(61.4278,80);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgOASQgDgDAAgGQAAgGAGgDQAFgEAIAAIAGAAIABgCIAAgEQgBgEgFAAQgDAAgBACQgCABgBADIgJAAQAAgEADgDQACgDAEgCIAIgBQAHAAAEAEQAEAEgBAHIgDATIAAADIAAAFIAAAAIgJAAIAAgEQgGAFgFAAQgFAAgEgEgAgEADQgDACgBADQAAABAAABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQAAAAABABQAAAAABAAQABAAAAAAQADAAACgBIAEgEIACgIIgFAAQgEAAgDACg");
	this.shape_4.setTransform(55.2278,80);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgJAdIAIgpIAIAAIgHApgAABgTQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIABgEQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAABgBAAQAAAAAAABQAAAAgBABIgEABQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_5.setTransform(52.325,79.175);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgOAVIAIgpIAHAAIAAAFQAEgGAGAAIAEABIgBAJIgFgBQgFABgEAEIgEAcg");
	this.shape_6.setTransform(50,79.95);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgOAUQgDgCgBgEQgBgDABgFIAEgbIAJAAIgEAbIAAADQAAAFAFAAQAFAAAEgFIAFgeIAJAAIgHAqIgJAAIABgEQgEAFgHAAIgHgCg");
	this.shape_7.setTransform(46.4167,80.025);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AAFAeIAFgbIAAgDQAAgEgFAAQgFgBgEAFIgFAeIgJAAIAKg7IAIAAIgDAXQAEgGAHAAQAGAAADAEQADAFgBAGIgEAbg");
	this.shape_8.setTransform(41.7792,79.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgHAXQgCgDAAgFIAEgXIgGAAIABgIIAHAAIABgJIAJAAIgCAJIAHAAIgBAIIgHAAIgEAWIAAACQAAABAAAAQAAABAAAAQABAAAAABQABAAABAAIADAAIgBAHIgFABQgEAAgDgEg");
	this.shape_9.setTransform(38.675,79.5);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgLATQgEgDgCgEQgCgGABgGIAAAAQABgGADgFQADgFAEgDQAFgCAFAAQAFAAAEADQAEADACAEQACAFgBAGQAAAGgDAGQgDAFgFACQgFADgFAAQgFgBgEgCgAgGgIQgCAEgBAEIAAAFQAAAEACADQACACAEAAQAEAAADgDQADgEABgHIAAgCQAAgFgCgEQgCgCgEAAQgFAAgDAFg");
	this.shape_10.setTransform(34.925,80);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgJAeIAJg7IAKAAIgKA7g");
	this.shape_11.setTransform(31.85,79.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgLATQgEgDgCgEQgCgGABgGIAAAAQABgGADgFQADgFAEgDQAFgCAFAAQAFAAAEADQAEADACAEQACAFgBAGQAAAGgDAGQgDAFgFACQgFADgFAAQgFgBgEgCgAgGgIQgCAEgBAEIAAAFQAAAEACADQACACAEAAQAEAAADgDQADgEABgHIAAgCQAAgFgCgEQgCgCgEAAQgFAAgDAFg");
	this.shape_12.setTransform(28.475,80);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AAIAcIADgZIgXAAIgEAZIgKAAIAKg3IAKAAIgFAYIAYAAIAEgYIAKAAIgKA3g");
	this.shape_13.setTransform(23.6,79.25);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FF8C2D").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_14.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


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


(lib.drag15G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgFAlIAAhKIALAAIAABKg");
	this.shape.setTransform(45.475,32.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_1.setTransform(41.575,33.65);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAKAlIgPgWIgFAFIAAARIgMAAIAAhKIAMAAIAAArIADgFIAOgQIAOAAIgTAWIAVAeg");
	this.shape_2.setTransform(36.575,32.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAXQAAAIACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_3.setTransform(30.975,33.65);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgFASIAAgdIgJAAIAAgJIAJAAIAAgMIALAAIAAAMIAJAAIAAAJIgJAAIAAAdIAAAEIAFABIAEAAIAAAJIgIABQgMAAAAgPg");
	this.shape_4.setTransform(26.45,33.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_5.setTransform(22.125,33.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_6.setTransform(16.725,33.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgGASIAAgdIgIAAIAAgJIAIAAIAAgMIAMAAIAAAMIAJAAIAAAJIgJAAIAAAdIABAEIAEABIAEAAIAAAJIgHABQgOAAAAgPg");
	this.shape_7.setTransform(12.2,33.075);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAIACADIAAACIgNAAIgBgGQgGAGgHABQgIAAgFgFgAgHAEQgDACAAAFQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFgBgEADg");
	this.shape_8.setTransform(151.025,17.65);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_9.setTransform(145.575,18.625);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAIACADIAAACIgNAAIgBgGQgGAGgHABQgIAAgFgFgAgHAEQgDACAAAFQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFgBgEADg");
	this.shape_10.setTransform(139.975,17.65);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IAMAAIAAAGQADgHAIAAIAEABIgBALIgEgBQgIAAgCAHIAAAjg");
	this.shape_11.setTransform(135.75,17.6);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgGAFgEQAGgDAGAAQALAAAFAGQAGAIAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgGIAGAGQgDAFgFACQgFADgHAAQgKgBgHgGgAgGgOQgDAEgBAGIAWAAIAAAAQgBgGgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_12.setTransform(131.125,17.65);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAIQAFAGAAAMIAAABQAAANgFAGQgGAIgJAAQgJAAgFgHgAgKAAIAAAVQADAIAHgBQAFAAADgEQADgEAAgJIAAgBQAAgJgDgDQgDgEgFAAQgHAAgDAGg");
	this.shape_13.setTransform(125.675,16.6);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgGAFgEQAGgDAGAAQALAAAFAGQAGAIAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgGIAGAGQgDAFgFACQgFADgHAAQgKgBgHgGgAgGgOQgDAEgBAGIAWAAIAAAAQgBgGgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_14.setTransform(120.125,17.65);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAIQAFAGAAAMIAAABQAAANgFAGQgGAIgJAAQgJAAgFgHgAgKAAIAAAVQADAIAHgBQAFAAADgEQADgEAAgJIAAgBQAAgJgDgDQgDgEgFAAQgHAAgDAGg");
	this.shape_15.setTransform(114.675,16.6);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAAAQACgCACgBQADABACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_16.setTransform(103.325,16.65);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AAKAmIgPgXIgFAGIAAARIgMAAIAAhLIAMAAIAAArIADgFIAOgPIAOAAIgTAUIAVAgg");
	this.shape_17.setTransform(99.775,16.55);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgCACgBQADABACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_18.setTransform(95.575,16.65);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgFAmIAAhLIALAAIAABLg");
	this.shape_19.setTransform(93.025,16.55);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAAAQACgCACgBQADABACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_20.setTransform(90.475,16.65);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAZAbIAAgiQAAgEgBgDQgDgCgFAAQgEAAgDACQgCACgBAEIAAAjIgLAAIAAgiQAAgJgJAAQgHAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAFgHAKAAQAKAAAEAIQAGgIAKAAQAJAAAEAFQAFAFgBAJIAAAig");
	this.shape_21.setTransform(84.85,17.6);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgGAFgEQAGgDAGAAQALAAAFAGQAGAIAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgGIAGAGQgDAFgFACQgFADgHAAQgKgBgHgGgAgGgOQgDAEgBAGIAWAAIAAAAQgBgGgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_22.setTransform(77.875,17.65);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AAZAbIAAgiQABgEgCgDQgDgCgFAAQgEAAgDACQgCACgBAEIAAAjIgLAAIAAgiQAAgJgKAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAFgHALAAQAJAAAEAIQAGgIAKAAQAJAAAEAFQAFAFgBAJIAAAig");
	this.shape_23.setTransform(70.8,17.6);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgCACgBQADABACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_24.setTransform(58.025,16.65);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_25.setTransform(53.975,17.6);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgCACgBQADABACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_26.setTransform(49.925,16.65);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_27.setTransform(38.725,17.6);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAIACADIAAACIgNAAIgBgGQgGAGgHABQgIAAgFgFgAgHAEQgDACAAAFQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFgBgEADg");
	this.shape_28.setTransform(33.275,17.65);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AAMAbIgMgkIgKAkIgKAAIgPg0IAMAAIAJAjIALgjIAIAAIALAjIAIgjIALAAIgOA0g");
	this.shape_29.setTransform(26.8,17.65);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgGAFgEQAGgDAGAAQALAAAFAGQAGAIAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgGIAGAGQgDAFgFACQgFADgHAAQgKgBgHgGgAgGgOQgDAEgBAGIAWAAIAAAAQgBgGgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_30.setTransform(20.475,17.65);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AAQAkIAAggIgfAAIAAAgIgMAAIAAhGIAMAAIAAAdIAfAAIAAgdIAMAAIAABGg");
	this.shape_31.setTransform(14.175,16.75);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FF8C2D").s().p("AtPjSIafgKIAAGuI6fALg");
	this.shape_32.setTransform(82.225,24.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.6,2.5,169.7,44.3);


(lib.drag15G4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgFQgDgEAAgEIALAAQABAEADACQADACAEAAQAFAAACgBQACgCAAgDQAAgDgDgCQgCgCgFAAIgKgEQgJgDAAgJQAAgGAFgEQAGgFAJgBQAJABAFAFQAHAEAAAHIgMAAQAAgDgDgCQgCgDgEAAQgDAAgDADQgCABAAADQAAADACACQACABAGACIALADQAEACACADQACACAAAFQAAAGgGAFQgGAFgJgBQgGAAgFgCg");
	this.shape.setTransform(61.75,12.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgJIAAgiIAMAAIAAAiQAAAKAIAAQAIgBADgGIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_1.setTransform(56.425,12.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_2.setTransform(50.875,12.45);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAXQAAAIACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_3.setTransform(45.425,12.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAXQAAAIACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_4.setTransform(37.525,12.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgSAkIAAgJIACAAQAEAAADgBIADgGIACgFIgTgzIANAAIAKAkIALgkIANAAIgVA8QgEANgMAAIgFgBg");
	this.shape_5.setTransform(32.375,13.575);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_6.setTransform(27.175,12.45);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_7.setTransform(21.625,12.45);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_8.setTransform(17.575,11.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAXQAAAIACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_9.setTransform(13.625,12.5);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgFAlIAAhJIALAAIAABJg");
	this.shape_10.setTransform(9.625,11.4);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgLAjQgFgCgDgEIAFgHQAGAGAIAAQAFAAADgDQADgDAAgHIAAgDQgFAGgHgBQgJABgGgIQgGgHAAgNQAAgMAGgHQAFgIAKAAQAIAAAFAHIABgGIAKAAIAAAzQAAAKgGAGQgHAGgKABQgFAAgGgDgAgHgWQgDAFAAAIQAAAJADAEQADAEAFAAQAHAAADgGIAAgXQgDgFgHgBQgFAAgDAFg");
	this.shape_11.setTransform(2.925,13.5);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_12.setTransform(-2.575,12.45);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgJIAAgiIAMAAIAAAiQAAAKAIAAQAIgBADgGIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_13.setTransform(-8.125,12.55);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgKAuIAAgJIAEAAQAGAAAAgGIAAg5IALAAIAAA4QAAAJgEAEQgEAEgHAAIgGgBgAAAgjQAAgBAAAAQgBgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABgCAEAAQAAAAABAAQABAAAAAAQABAAAAABQABAAAAABQABAAAAABQAAAAABABQAAAAAAABQAAAAAAABQAAABAAAAQAAABAAABQgBAAAAABQAAAAgBABQAAAAgBAAQAAABgBAAQAAAAgBAAQgBAAAAAAQgEAAgBgBg");
	this.shape_14.setTransform(-12.625,12.575);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgJIAAgiIAMAAIAAAiQAAAKAIAAQAIgBADgGIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_15.setTransform(-16.175,12.55);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_16.setTransform(-24.225,12.45);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAXQAAAIACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_17.setTransform(-29.675,12.5);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgLAjQgFgCgDgEIAFgHQAGAGAIAAQAFAAADgDQADgDAAgHIAAgDQgFAGgHgBQgJABgGgIQgGgHAAgNQAAgMAGgHQAFgIAKAAQAIAAAFAHIABgGIAKAAIAAAzQAAAKgGAGQgHAGgKABQgFAAgGgDgAgHgWQgDAFAAAIQAAAJADAEQADAEAFAAQAHAAADgGIAAgXQgDgFgHgBQgFAAgDAFg");
	this.shape_18.setTransform(-35.325,13.5);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_19.setTransform(-40.825,12.45);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_20.setTransform(-46.225,12.5);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgQAeQgGgHAAgNQAAgLAGgHQAFgIAKAAQAHAAAFAGIAAgbIAMAAIAABKIgLAAIAAgGQgGAHgHAAQgKAAgFgIgAgHgCQgDAEAAAJQAAAJADAEQADAEAFABQAHgBADgGIAAgWQgDgGgHAAQgFAAgDAEg");
	this.shape_21.setTransform(-51.9,11.45);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgGASIAAgdIgIAAIAAgJIAIAAIAAgMIAMAAIAAAMIAJAAIAAAJIgJAAIAAAdIABAEIAEABIAEAAIAAAJIgHABQgNAAgBgPg");
	this.shape_22.setTransform(80.95,-4.075);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgKIAAghIAMAAIAAAhQAAALAIgBQAIAAADgGIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_23.setTransform(76.625,-3.45);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgFAmIAAhLIALAAIAABLg");
	this.shape_24.setTransform(72.575,-4.6);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgKIAAghIAMAAIAAAhQAAALAIgBQAIAAADgGIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_25.setTransform(68.525,-3.45);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAaAbIAAgiQgBgEgCgDQgCgCgFAAQgEAAgCACQgDACgBAEIAAAjIgLAAIAAgiQAAgJgKAAQgHAAgCAGIAAAlIgMAAIAAg0IALAAIAAAGQAGgHAKAAQAJAAAEAIQAGgIAKAAQAJAAAEAFQAEAFABAJIAAAig");
	this.shape_26.setTransform(61.4,-3.55);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAKAmIAAgiQAAgFgCgCQgDgCgEAAQgGgBgEAGIAAAmIgMAAIAAhLIAMAAIAAAcQAGgGAIAAQARAAAAASIAAAjg");
	this.shape_27.setTransform(51.775,-4.6);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgKIAAghIAMAAIAAAhQAAALAIgBQAIAAADgGIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_28.setTransform(46.225,-3.45);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAIQAFAGAAAMIAAABQAAANgFAGQgGAIgJAAQgJAAgFgHgAgKAAIAAAVQADAIAHgBQAFAAADgEQADgEAAgJIAAgBQAAgJgDgDQgDgEgFAAQgHAAgDAGg");
	this.shape_29.setTransform(40.725,-4.55);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgKIAAghIAMAAIAAAhQAAALAIgBQAIAAADgGIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_30.setTransform(35.025,-3.45);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgGASIAAgdIgIAAIAAgJIAIAAIAAgMIALAAIAAAMIAKAAIAAAJIgKAAIAAAdIACAEIAEABIAEAAIAAAJIgHABQgNAAgBgPg");
	this.shape_31.setTransform(30.45,-4.075);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgLAjQgFgDgDgDIAFgIQAGAHAIAAQAFAAADgDQADgDAAgHIAAgDQgFAGgHAAQgJAAgGgIQgGgHAAgMQAAgNAGgHQAFgIAKABQAIgBAFAHIABgFIAKAAIAAAyQAAALgGAFQgHAHgKAAQgFgBgGgCgAgHgWQgDAEAAAKQAAAHADAEQADAFAFAAQAHAAADgGIAAgXQgDgFgHAAQgFgBgDAFg");
	this.shape_32.setTransform(23.475,-2.5);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_33.setTransform(17.975,-3.55);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgKIAAghIAMAAIAAAhQAAALAIgBQAIAAADgGIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_34.setTransform(12.425,-3.45);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgKAuIAAgJIAEAAQAGAAAAgGIAAg5IALAAIAAA4QAAAJgEAEQgEAEgHAAIgGgBgAAAgjQAAgBAAAAQAAgBgBAAQAAgBAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQABgBAAAAQAAgBAAAAQABgCAEAAQAAAAABAAQABAAAAAAQABABAAAAQABAAAAABQABAAAAABQAAAAABABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAABQgBAAAAABQAAAAgBABQAAAAgBAAQAAABgBAAQAAAAgBAAQgBAAAAAAQgEAAgBgBg");
	this.shape_35.setTransform(7.925,-3.425);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgKIAAghIAMAAIAAAhQAAALAIgBQAIAAADgGIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_36.setTransform(4.375,-3.45);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgCACgBQADABACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_37.setTransform(-2.175,-4.5);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAIAAIAEABIgBALIgEgBQgIAAgCAHIAAAjg");
	this.shape_38.setTransform(-4.95,-3.55);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAIACADIAAACIgNAAIgBgGQgGAGgHABQgIAAgFgFgAgHAEQgDACAAAFQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFgBgEADg");
	this.shape_39.setTransform(-9.625,-3.5);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgQAeQgGgHAAgNQAAgLAGgHQAFgIAJAAQAIAAAGAGIAAgbIALAAIAABKIgKAAIgBgGQgFAHgJAAQgIAAgGgIgAgHgBQgDADgBAJQABAIADAFQADAEAFAAQAHAAAEgGIAAgWQgEgGgHAAQgFAAgDAFg");
	this.shape_40.setTransform(-15.3,-4.55);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_41.setTransform(-23.275,-3.55);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAIACADIAAACIgNAAIgBgGQgGAGgHABQgIAAgFgFgAgHAEQgDACAAAFQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFgBgEADg");
	this.shape_42.setTransform(-28.725,-3.5);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAIACADIAAACIgNAAIgBgGQgGAGgHABQgIAAgFgFgAgHAEQgDACAAAFQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFgBgEADg");
	this.shape_43.setTransform(-34.125,-3.5);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_44.setTransform(-39.625,-3.55);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAIAAIAEABIgBALIgEgBQgIAAgCAHIAAAjg");
	this.shape_45.setTransform(-43.9,-3.55);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgGAFgEQAGgDAGAAQALAAAFAGQAGAIAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgGIAGAGQgDAFgFACQgFADgHAAQgKgBgHgGgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_46.setTransform(-48.525,-3.5);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgMIAAgBQAAgMAHgHQAGgIAKABQAKgBAGAGQAFAFABAKIgLAAQgBgFgDgDQgCgDgFAAQgFAAgDAEQgDAEAAAJIAAABQAAAIADAFQADAEAFAAQAEAAADgDQADgCABgEIALAAQAAAFgDAEQgDAEgFADQgFADgGAAQgKgBgGgGg");
	this.shape_47.setTransform(-53.775,-3.5);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_48.setTransform(-59.225,-3.55);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgGAFgEQAGgDAGAAQALAAAFAGQAGAIAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgGIAGAGQgDAFgFACQgFADgHAAQgKgBgHgGgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_49.setTransform(-64.625,-3.5);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_50.setTransform(-70.075,-2.525);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AAZAbIAAgiQAAgEgBgCQgDgDgFAAQgEAAgDACQgCADgBADIAAAjIgLAAIAAgiQAAgJgJAAQgHAAgEAFIAAAmIgMAAIAAg0IALAAIABAFQAFgGAKAAQAKAAAEAIQAGgIAKAAQAJAAAEAFQAFAFgBAJIAAAig");
	this.shape_51.setTransform(59.2,-19.55);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgEAGABQALgBAFAIQAGAGAAANIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgGgDgDQgCgDgFAAQgEAAgDADg");
	this.shape_52.setTransform(52.225,-19.5);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgFASIAAgdIgJAAIAAgJIAJAAIAAgMIAKAAIAAAMIAKAAIAAAJIgKAAIAAAdIABAEIAFABIAEAAIAAAJIgIABQgNAAABgPg");
	this.shape_53.setTransform(47.7,-20.075);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgEQgDgEAAgFIALAAQABAEADADQADACADAAQAGgBACgBQACgCAAgDQAAgDgDgBQgCgCgFgCIgKgDQgJgDAAgIQAAgHAGgFQAGgEAHAAQAKAAAFAEQAHAFAAAIIgNAAQAAgEgCgCQgDgDgEABQgDAAgCABQgDACAAADQAAADADABQACACAGABIALAEQAEABACADQACAEAAADQAAAIgGAEQgGAEgKABQgFgBgFgCg");
	this.shape_54.setTransform(43.55,-19.5);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_55.setTransform(39.725,-20.5);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgEQgDgEAAgFIAMAAQAAAEADADQADACAEAAQAEgBADgBQACgCAAgDQAAgDgCgBQgDgCgFgCIgKgDQgJgDAAgIQAAgHAFgFQAHgEAIAAQAJAAAGAEQAFAFAAAIIgLAAQgBgEgCgCQgDgDgDABQgDAAgDABQgDACABADQgBADADABQACACAGABIALAEQAEABACADQACAEAAADQAAAIgGAEQgGAEgJABQgGgBgFgCg");
	this.shape_56.setTransform(35.85,-19.5);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_57.setTransform(29.525,-20.5);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AAKAmIgPgXIgFAGIAAARIgMAAIAAhLIAMAAIAAArIADgFIAOgPIAOAAIgTAUIAVAgg");
	this.shape_58.setTransform(25.975,-20.6);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_59.setTransform(21.775,-20.5);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgFAmIAAhLIALAAIAABLg");
	this.shape_60.setTransform(19.225,-20.6);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_61.setTransform(16.675,-20.5);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AAZAbIAAgiQAAgEgBgCQgDgDgFAAQgEAAgDACQgCADgBADIAAAjIgLAAIAAgiQAAgJgJAAQgHAAgEAFIAAAmIgMAAIAAg0IALAAIABAFQAFgGAKAAQAKAAAEAIQAGgIAKAAQAJAAAEAFQAFAFgBAJIAAAig");
	this.shape_62.setTransform(11.05,-19.55);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgEAGABQALgBAFAIQAGAGAAANIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgGgDgDQgCgDgFAAQgEAAgDADg");
	this.shape_63.setTransform(4.075,-19.5);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AAZAbIAAgiQAAgEgBgCQgDgDgFAAQgEAAgDACQgCADgBADIAAAjIgLAAIAAgiQAAgJgKAAQgGAAgEAFIAAAmIgMAAIAAg0IALAAIABAFQAFgGAKAAQAKAAAEAIQAGgIAKAAQAJAAAEAFQAFAFgBAJIAAAig");
	this.shape_64.setTransform(-3,-19.55);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_65.setTransform(-11.125,-20.5);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_66.setTransform(-15.175,-19.55);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_67.setTransform(-19.225,-20.5);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_68.setTransform(-25.775,-19.55);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_69.setTransform(-31.225,-19.5);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AAMAbIgMgkIgKAkIgKAAIgOg0IALAAIAJAjIAKgjIAIAAIALAjIAJgjIAMAAIgPA0g");
	this.shape_70.setTransform(-37.7,-19.5);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgEAGABQALgBAFAIQAGAGAAANIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgGgDgDQgCgDgFAAQgEAAgDADg");
	this.shape_71.setTransform(-44.025,-19.5);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AAQAkIAAggIgfAAIAAAgIgMAAIAAhGIAMAAIAAAdIAfAAIAAgdIAMAAIAABGg");
	this.shape_72.setTransform(-50.325,-20.4);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_73.setTransform(4.425,-3.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-79.8,-31.3,168.5,55.6);


(lib.drag15G3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJgBAGAGQAFAEABAIIAAAYQAAAHACAEIAAAAIgNAAIgBgFQgGAHgHgBQgIAAgFgEgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFABgEACg");
	this.shape.setTransform(123.225,34.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgSAkIAAgJIACAAQAEAAADgBIADgGIACgFIgTgzIANAAIAKAkIALgkIANAAIgVA8QgEANgMAAIgFgBg");
	this.shape_1.setTransform(118.075,35.775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_2.setTransform(112.875,34.65);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAKAlIAAgiQAAgEgCgDQgDgCgEAAQgGABgEAFIAAAlIgMAAIAAhJIAMAAIAAAcQAGgIAIABQARgBAAATIAAAig");
	this.shape_3.setTransform(107.325,33.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgKIAAghIAMAAIAAAhQAAALAIAAQAIAAADgHIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_4.setTransform(101.775,34.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgLAgIAAAFIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAHQAFAIAAAMIAAAAQAAAMgFAIQgGAHgJAAQgJAAgFgGgAgKAAIAAAWQADAGAHABQAFAAADgFQADgEAAgIIAAgCQAAgJgDgDQgDgEgFAAQgHAAgDAGg");
	this.shape_5.setTransform(96.275,33.65);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgKIAAghIAMAAIAAAhQAAALAIAAQAIAAADgHIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_6.setTransform(90.575,34.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgGASIAAgdIgIAAIAAgJIAIAAIAAgMIAMAAIAAAMIAJAAIAAAJIgJAAIAAAdIABAEIAEABIAEAAIAAAJIgHABQgOAAAAgPg");
	this.shape_7.setTransform(86,34.125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_8.setTransform(79.175,34.65);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJgBAGAGQAFAEABAIIAAAYQAAAHACAEIAAAAIgNAAIgBgFQgGAHgHgBQgIAAgFgEgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFABgEACg");
	this.shape_9.setTransform(73.725,34.7);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_10.setTransform(69.725,33.7);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgLAjQgFgDgDgEIAFgGQAGAGAIAAQAFAAADgDQADgEAAgFIAAgEQgFAFgHAAQgJAAgGgHQgGgIAAgMQAAgLAGgIQAFgHAKAAQAIAAAFAGIABgGIAKAAIAAAzQAAAKgGAHQgHAFgKAAQgFAAgGgCgAgHgWQgDAEAAAJQAAAIADAFQADAEAFAAQAHAAADgHIAAgVQgDgHgHAAQgFABgDAEg");
	this.shape_11.setTransform(65.525,35.7);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJgBAGAGQAFAEABAIIAAAYQAAAHACAEIAAAAIgNAAIgBgFQgGAHgHgBQgIAAgFgEgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFABgEACg");
	this.shape_12.setTransform(60.125,34.7);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgLAgIAAAFIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAHQAFAIAAAMIAAAAQAAAMgFAIQgGAHgJAAQgJAAgFgGgAgKAAIAAAWQADAGAHABQAFAAADgFQADgEAAgIIAAgCQAAgJgDgDQgDgEgFAAQgHAAgDAGg");
	this.shape_13.setTransform(54.675,33.65);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJgBAGAGQAFAEABAIIAAAYQAAAHACAEIAAAAIgNAAIgBgFQgGAHgHgBQgIAAgFgEgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFABgEACg");
	this.shape_14.setTransform(46.575,34.7);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_15.setTransform(41.125,35.675);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJgBAGAGQAFAEABAIIAAAYQAAAHACAEIAAAAIgNAAIgBgFQgGAHgHgBQgIAAgFgEgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFABgEACg");
	this.shape_16.setTransform(35.525,34.7);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAHAAIAFABIAAALIgFAAQgIAAgCAGIAAAjg");
	this.shape_17.setTransform(31.3,34.65);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgGAFgEQAGgDAGAAQALgBAFAIQAGAHAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFADgHgBQgKABgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_18.setTransform(26.675,34.7);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgLAgIAAAFIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAHQAFAIAAAMIAAAAQAAAMgFAIQgGAHgJAAQgJAAgFgGgAgKAAIAAAWQADAGAHABQAFAAADgFQADgEAAgIIAAgCQAAgJgDgDQgDgEgFAAQgHAAgDAGg");
	this.shape_19.setTransform(21.225,33.65);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgGAFgEQAGgDAGAAQALgBAFAIQAGAHAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFADgHgBQgKABgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_20.setTransform(15.675,34.7);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgLAgIAAAFIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAHQAFAIAAAMIAAAAQAAAMgFAIQgGAHgJAAQgJAAgFgGgAgKAAIAAAWQADAGAHABQAFAAADgFQADgEAAgIIAAgCQAAgJgDgDQgDgEgFAAQgHAAgDAGg");
	this.shape_21.setTransform(10.225,33.65);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_22.setTransform(164.125,17.7);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgRAeQgFgHAAgNQAAgLAFgHQAGgIAKAAQAHAAAFAGIAAgbIAMAAIAABKIgKAAIgBgGQgFAHgIAAQgJAAgHgIgAgHgCQgDAEAAAJQAAAIADAFQADAEAEABQAIgBADgGIAAgWQgDgGgIAAQgEAAgDAEg");
	this.shape_23.setTransform(159.9,17.65);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgLAjQgFgCgDgEIAFgHQAGAGAIAAQAFAAADgDQADgEAAgGIAAgDQgFAGgHgBQgJABgGgIQgGgIAAgMQAAgMAGgHQAFgIAKAAQAIABAFAGIABgGIAKAAIAAAzQAAAKgGAHQgHAFgKABQgFAAgGgDgAgHgWQgDAFAAAIQAAAIADAFQADAEAFAAQAHAAADgGIAAgXQgDgFgHgBQgFAAgDAFg");
	this.shape_24.setTransform(150.125,19.7);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_25.setTransform(144.625,18.65);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgJIAAgiIAMAAIAAAiQAAAJAIABQAIgBADgGIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_26.setTransform(139.075,18.75);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAIQAFAGAAANIAAAAQAAAMgFAHQgGAIgJAAQgJAAgFgHgAgKAAIAAAVQADAIAHAAQAFgBADgEQADgEAAgIIAAgCQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_27.setTransform(133.575,17.65);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgCACgCIAAgLIgHAAQgFAAgEADg");
	this.shape_28.setTransform(127.975,18.7);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgGASIAAgdIgIAAIAAgJIAIAAIAAgMIAMAAIAAAMIAJAAIAAAJIgJAAIAAAdIABAEIAEABIAEAAIAAAJIgIABQgNAAAAgPg");
	this.shape_29.setTransform(123.45,18.125);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_30.setTransform(116.475,17.7);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AAKAlIgPgWIgFAFIAAARIgMAAIAAhJIAMAAIAAAqIADgFIAOgQIAOAAIgTAWIAVAeg");
	this.shape_31.setTransform(112.925,17.6);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgCACgCIAAgLIgHAAQgFAAgEADg");
	this.shape_32.setTransform(107.325,18.7);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AAKAlIgPgWIgFAFIAAARIgMAAIAAhJIAMAAIAAAqIADgFIAOgQIAOAAIgTAWIAVAeg");
	this.shape_33.setTransform(102.325,17.6);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_34.setTransform(93.975,17.7);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AAKAlIgPgWIgFAFIAAARIgMAAIAAhJIAMAAIAAAqIADgFIAOgQIAOAAIgTAWIAVAeg");
	this.shape_35.setTransform(90.425,17.6);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_36.setTransform(86.225,17.7);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgFAlIAAhJIALAAIAABJg");
	this.shape_37.setTransform(83.675,17.6);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_38.setTransform(81.125,17.7);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AAZAbIAAghQAAgFgCgDQgCgCgFAAQgEAAgDACQgCADgBADIAAAjIgLAAIAAgiQAAgJgJAAQgIAAgCAFIAAAmIgNAAIAAg0IALAAIABAFQAFgGAKAAQAKAAAEAJQAGgJAKAAQAJAAAEAFQAFAFAAAKIAAAhg");
	this.shape_39.setTransform(75.5,18.65);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgMIAAgBQAAgHADgGQADgHAFgDQAGgDAGgBQALAAAFAHQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_40.setTransform(68.525,18.7);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AAZAbIAAghQAAgFgBgDQgDgCgFAAQgEAAgDACQgCADgBADIAAAjIgLAAIAAgiQAAgJgJAAQgHAAgEAFIAAAmIgMAAIAAg0IALAAIABAFQAFgGAKAAQAKAAAEAJQAGgJAKAAQAJAAAEAFQAFAFgBAKIAAAhg");
	this.shape_41.setTransform(61.45,18.65);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_42.setTransform(51.675,17.7);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_43.setTransform(47.625,18.65);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_44.setTransform(43.575,17.7);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_45.setTransform(35.375,18.65);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgCACgCIAAgLIgHAAQgFAAgEADg");
	this.shape_46.setTransform(29.925,18.7);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AALAaIgLgjIgKAjIgKAAIgPg0IAMAAIAIAkIAMgkIAIAAIALAkIAIgkIAMAAIgPA0g");
	this.shape_47.setTransform(23.45,18.7);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgMIAAgBQAAgHADgGQADgHAFgDQAGgDAGgBQALAAAFAHQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_48.setTransform(17.125,18.7);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AAQAjIAAgfIgfAAIAAAfIgMAAIAAhGIAMAAIAAAeIAfAAIAAgeIAMAAIAABGg");
	this.shape_49.setTransform(10.825,17.8);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FF8C2D").s().p("AtQkAIahgPIAAIQI6hAOg");
	this.shape_50.setTransform(86.3,25.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1.5,-1.2,169.7,54.300000000000004);


(lib.drag15G2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgJIgHAAQgFAAgEACg");
	this.shape.setTransform(129.925,36.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgSAkIAAgJIACAAQAEAAADgBIADgGIACgFIgTgzIANAAIAKAkIALgkIANAAIgVA8QgEANgMAAIgFgBg");
	this.shape_1.setTransform(124.775,37.375);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_2.setTransform(119.575,36.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_3.setTransform(115.525,35.3);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAKAmIgPgXIgFAGIAAARIgMAAIAAhLIAMAAIAAArIADgFIAOgPIAOAAIgTAUIAVAgg");
	this.shape_4.setTransform(111.975,35.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_5.setTransform(107.775,35.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgFAmIAAhLIALAAIAABLg");
	this.shape_6.setTransform(105.225,35.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_7.setTransform(102.675,35.3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAaAbIAAgiQAAgEgDgCQgCgDgFAAQgEAAgCACQgDADgBADIAAAjIgLAAIAAgiQAAgJgKAAQgGAAgDAFIAAAmIgMAAIAAg0IALAAIAAAGQAGgHAKAAQAJAAAEAIQAFgIALAAQAJAAAEAFQAEAFAAAJIAAAig");
	this.shape_8.setTransform(97.05,36.25);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_9.setTransform(91.425,35.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgRAfQgFgIAAgNQAAgLAFgIQAGgHAJAAQAIAAAGAGIAAgbIALAAIAABKIgKAAIgBgFQgFAGgJAAQgJAAgGgHgAgHgBQgDADgBAJQABAJADAEQADAFAEgBQAIABAEgHIAAgWQgEgGgIAAQgEAAgDAFg");
	this.shape_10.setTransform(87.2,35.25);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgLAjQgFgDgDgEIAFgHQAGAHAIAAQAFAAADgDQADgEAAgFIAAgEQgFAFgHABQgJgBgGgHQgGgHAAgMQAAgMAGgIQAFgHAKAAQAIAAAFAGIABgFIAKAAIAAAyQAAALgGAFQgHAHgKgBQgFABgGgDgAgHgWQgDAEAAAKQAAAHADAEQADAFAFAAQAHAAADgHIAAgVQgDgHgHABQgFAAgDAEg");
	this.shape_11.setTransform(79.075,37.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_12.setTransform(73.575,36.25);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgJIgHAAQgFAAgEACg");
	this.shape_13.setTransform(68.125,36.3);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgSAkIAAgJIACAAQAEAAADgBIADgGIACgFIgTgzIANAAIAKAkIALgkIANAAIgVA8QgEANgMAAIgFgBg");
	this.shape_14.setTransform(62.975,37.375);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_15.setTransform(55.275,36.25);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgJIgHAAQgFAAgEACg");
	this.shape_16.setTransform(49.825,36.3);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgLAjQgFgDgDgEIAFgHQAGAHAIAAQAFAAADgDQADgEAAgFIAAgEQgFAFgHABQgJgBgGgHQgGgHAAgMQAAgMAGgIQAFgHAKAAQAIAAAFAGIABgFIAKAAIAAAyQAAALgGAFQgHAHgKgBQgFABgGgDgAgHgWQgDAEAAAKQAAAHADAEQADAFAFAAQAHAAADgHIAAgVQgDgHgHABQgFAAgDAEg");
	this.shape_17.setTransform(44.175,37.3);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAHAAIAFABIAAALIgFAAQgIgBgCAHIAAAjg");
	this.shape_18.setTransform(39.95,36.25);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgRAUQgGgIAAgMIAAAAQAAgHACgHQADgFAGgEQAFgEAHABQALgBAGAIQAHAGAAAMIAAACQAAAHgCAGQgDAHgGADQgFADgIABQgKgBgHgHgAgJgMQgDAEAAAJQAAAIADAEQAEAFAFAAQAGAAAEgFQADgFAAgIQgBgIgDgEQgDgFgGAAQgFAAgEAFg");
	this.shape_19.setTransform(35.1,36.3);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_20.setTransform(154.525,20.25);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAJIAAAXQAAAHACAEIAAAAIgNAAIgBgFQgGAHgHgBQgIAAgFgEgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFABgEACg");
	this.shape_21.setTransform(149.075,20.3);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgLAjQgFgDgDgEIAFgGQAGAGAIAAQAFAAADgDQADgEAAgFIAAgEQgFAFgHAAQgJAAgGgHQgGgIAAgMQAAgLAGgIQAFgHAKgBQAIABAFAGIABgGIAKAAIAAAzQAAAKgGAHQgHAFgKAAQgFAAgGgCgAgHgWQgDAEAAAJQAAAJADAEQADAEAFAAQAHAAADgHIAAgVQgDgHgHAAQgFABgDAEg");
	this.shape_22.setTransform(143.425,21.3);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_23.setTransform(137.925,20.25);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgGAFgEQAGgDAGgBQALAAAFAIQAGAHAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAGQgDAFgFADQgFADgHgBQgKABgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_24.setTransform(132.525,20.3);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgRAfQgFgIAAgNQAAgLAFgIQAGgHAKAAQAHAAAFAGIAAgbIAMAAIAABKIgLAAIAAgFQgGAGgHAAQgKAAgGgHgAgHgCQgEAEABAJQgBAIAEAFQADAFAFAAQAHAAADgHIAAgWQgDgGgHAAQgFAAgDAEg");
	this.shape_25.setTransform(126.85,19.25);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAKAlIgPgWIgFAFIAAARIgMAAIAAhJIAMAAIAAAqIADgFIAOgQIAOAAIgTAWIAVAeg");
	this.shape_26.setTransform(119.375,19.2);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAJIAAAXQAAAHACAEIAAAAIgNAAIgBgFQgGAHgHgBQgIAAgFgEgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFABgEACg");
	this.shape_27.setTransform(113.775,20.3);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAIAAIAEABIgBALIgEAAQgIAAgCAGIAAAjg");
	this.shape_28.setTransform(109.55,20.25);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgGAFgEQAGgDAGgBQALAAAFAIQAGAHAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAGQgDAFgFADQgFADgHgBQgKABgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_29.setTransform(104.925,20.3);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgLAjQgFgDgDgEIAFgGQAGAGAIAAQAFAAADgDQADgEAAgFIAAgEQgFAFgHAAQgJAAgGgHQgGgIAAgMQAAgLAGgIQAFgHAKgBQAIABAFAGIABgGIAKAAIAAAzQAAAKgGAHQgHAFgKAAQgFAAgGgCgAgHgWQgDAEAAAJQAAAJADAEQADAEAFAAQAHAAADgHIAAgVQgDgHgHAAQgFABgDAEg");
	this.shape_30.setTransform(99.275,21.3);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAIAAIAEABIgBALIgEAAQgIAAgCAGIAAAjg");
	this.shape_31.setTransform(95.05,20.25);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgGAFgEQAGgDAGgBQALAAAFAIQAGAHAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAGQgDAFgFADQgFADgHgBQgKABgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_32.setTransform(90.425,20.3);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgLAgIAAAFIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAHQAFAIAAAMIAAAAQAAAMgFAIQgGAHgJAAQgJAAgFgGgAgKAAIAAAWQADAGAHABQAFAAADgFQADgEAAgIIAAgCQAAgJgDgDQgDgEgFAAQgHAAgDAGg");
	this.shape_33.setTransform(84.975,19.25);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgFASIAAgdIgJAAIAAgJIAJAAIAAgMIAKAAIAAAMIAKAAIAAAJIgKAAIAAAdIABAEIAFABIAEAAIAAAJIgIABQgMAAAAgPg");
	this.shape_34.setTransform(77.75,19.725);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAJIAAAXQAAAHACAEIAAAAIgNAAIgBgFQgGAHgHgBQgIAAgFgEgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFABgEACg");
	this.shape_35.setTransform(73.525,20.3);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_36.setTransform(68.075,21.275);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAJIAAAXQAAAHACAEIAAAAIgNAAIgBgFQgGAHgHgBQgIAAgFgEgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFABgEACg");
	this.shape_37.setTransform(62.475,20.3);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgQAfQgGgIAAgNQAAgLAGgIQAFgHAJAAQAIAAAGAGIAAgbIALAAIAABKIgLAAIAAgFQgFAGgJAAQgIAAgGgHgAgHgCQgEAEAAAJQAAAIAEAFQADAFAFAAQAHAAAEgHIAAgWQgEgGgHAAQgFAAgDAEg");
	this.shape_38.setTransform(56.8,19.25);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_39.setTransform(50.325,19.3);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_40.setTransform(46.275,20.25);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_41.setTransform(42.225,19.3);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_42.setTransform(35.675,20.25);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAJIAAAXQAAAHACAEIAAAAIgNAAIgBgFQgGAHgHgBQgIAAgFgEgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFABgEACg");
	this.shape_43.setTransform(30.225,20.3);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AAMAaIgMgjIgKAjIgKAAIgPg0IAMAAIAJAkIALgkIAIAAIAKAkIAJgkIALAAIgOA0g");
	this.shape_44.setTransform(23.75,20.3);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgGAFgEQAGgDAGgBQALAAAFAIQAGAHAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAGQgDAFgFADQgFADgHgBQgKABgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_45.setTransform(17.425,20.3);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AAQAjIAAgfIgfAAIAAAfIgMAAIAAhGIAMAAIAAAeIAfAAIAAgeIAMAAIAABGg");
	this.shape_46.setTransform(11.125,19.4);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_47.setTransform(82.475,29.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.7,1.5,172.29999999999998,55.6);


(lib.drag15G1 = function(mode,startPosition,loop) {
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


(lib.drag14GJud = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgQAXQgFgFAAgGQAAgJAGgDQAHgFAKABIAJAAIAAgFQAAgEgDgDQgDgDgFAAQgEAAgDACQgEADAAAEIgJAAQAAgEADgFQADgDAFgCQAEgCAFgBQAJAAAFAGQAGAEAAAIIAAAXQAAAIACADIAAABIgKAAIgBgFQgGAGgIAAQgIABgFgFgAgMAKQAAAFADACQADACAEAAQADAAAEgCQAEgCACgEIAAgKIgHAAQgQAAAAAJg");
	this.shape.setTransform(126.975,23.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgOAUQgIgGAAgNIAAgBQAAgHAEgGQADgGAFgEQAFgDAGgBQAKAAAGAIQAFAGAAANIAAACIgjAAQABAJAEAFQAFAEAFAAQAFAAAEgCIAFgFIAFAEQgGALgNgBQgKABgGgIgAgHgPQgFAEAAAIIAZAAIAAgBQAAgIgDgDQgDgEgGAAQgFAAgDAEg");
	this.shape_1.setTransform(121.7,23.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgPAfQgGgIAAgMIAAgBQAAgLAGgIQAFgHAKAAQAIAAAFAGIAAgbIAJAAIAABKIgIAAIAAgGQgGAHgIAAQgKAAgFgHgAgIgDQgEAEAAAKQAAAJAEAFQADAFAGABQAIAAAEgJIAAgXQgEgHgIAAQgGAAgDAFg");
	this.shape_2.setTransform(116.025,22.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgEAkIAAg0IAIAAIAAA0gAgDgaQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAABgBAAQAAAAAAgBQgBAAAAAAQgBAAAAAAQAAgBgBAAg");
	this.shape_3.setTransform(112.125,22.15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgRAUQgGgIAAgMIAAAAQAAgHADgGQADgHAGgDQAFgDAGgBQAKABAHAHQAHAIAAALIAAAAQAAAIgDAHQgDAFgGAEQgFAEgHgBQgJAAgIgHgAgKgNQgEAFAAAIQAAAKAEAFQAEAFAGAAQAHAAAEgFQAEgGAAgJQAAgIgEgFQgEgGgHAAQgGAAgEAGg");
	this.shape_4.setTransform(108.05,23.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgMAbIAAg0IAJAAIAAAGQADgHAJAAIAEABIAAAJIgFgBQgIAAgDAHIAAAlg");
	this.shape_5.setTransform(103.775,23.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgPAWQgFgFAAgJIAAgiIAJAAIAAAiQAAALAKABQAKAAADgJIAAglIAJAAIAAA0IgJAAIAAgFQgFAGgJAAQgJAAgEgFg");
	this.shape_6.setTransform(99.025,23.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AAMAlIAAgjQAAgEgDgDQgDgCgFgBQgDABgEABQgDADgCADIAAAlIgJAAIAAhJIAJAAIAAAcQAGgHAJgBQAQABABARIAAAjg");
	this.shape_7.setTransform(93.575,22);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgBAeQgDgEAAgHIAAggIgJAAIAAgHIAJAAIAAgMIAIAAIAAAMIAKAAIAAAHIgKAAIAAAgQAAABAAABQAAAAABABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQABABABAAQAAAAABAAIAEgBIAAAHIgGABQgHAAgCgDg");
	this.shape_8.setTransform(89.025,22.525);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgQAUQgHgIAAgMIAAAAQAAgHADgGQADgHAFgDQAGgDAGgBQAKABAIAHQAGAIAAALIAAAAQAAAIgDAHQgDAFgGAEQgFAEgHgBQgKAAgGgHgAgKgNQgEAFAAAIQAAAKAEAFQAEAFAGAAQAHAAAEgFQAEgGAAgJQAAgIgEgFQgEgGgHAAQgGAAgEAGg");
	this.shape_9.setTransform(84.7,23.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgDAlIAAhJIAIAAIAABJg");
	this.shape_10.setTransform(80.6,22);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgRAUQgGgIAAgMIAAAAQAAgHADgGQADgHAGgDQAFgDAGgBQAKABAHAHQAHAIAAALIAAAAQAAAIgDAHQgDAFgGAEQgFAEgHgBQgJAAgIgHgAgKgNQgEAFAAAIQAAAKAEAFQAEAFAGAAQAHAAAEgFQAEgGAAgJQAAgIgEgFQgEgGgHAAQgGAAgEAGg");
	this.shape_11.setTransform(76.55,23.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AASAjIAAghIgjAAIAAAhIgJAAIAAhGIAJAAIAAAfIAjAAIAAgfIAJAAIAABGg");
	this.shape_12.setTransform(70.125,22.2);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgKAZQgFgCgDgFQgDgEAAgEIALAAQABAEADACQADACADAAQAFAAADgBQACgCAAgDQAAgDgCgCQgDgBgFgBIgKgEQgJgDAAgJQAAgGAGgEQAGgFAHgBQAKABAGAFQAFAEABAHIgNAAQABgDgDgCQgCgDgFAAQgDAAgCADQgCABgBADQABADACACQACABAGACIALADQAEACACADQACACAAAFQAAAGgGAFQgGAFgKgBQgFAAgFgCg");
	this.shape_13.setTransform(181.5,7.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_14.setTransform(176.275,7.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgFAlIAAhKIALAAIAABKg");
	this.shape_15.setTransform(172.275,6);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_16.setTransform(168.375,7.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AAOAjIgVgeIgIAJIAAAVIgMAAIAAhGIAMAAIAAAiIAHgJIAUgZIAPAAIgbAgIAcAmg");
	this.shape_17.setTransform(162.875,6.2);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_18.setTransform(154.075,7.05);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_19.setTransform(148.625,7.1);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AALAaIgLgjIgKAjIgKAAIgPg0IAMAAIAIAkIALgkIAIAAIAMAkIAIgkIAMAAIgPA0g");
	this.shape_20.setTransform(142.15,7.1);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_21.setTransform(135.825,7.1);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AAKAlIAAghQAAgFgCgCQgDgCgEgBQgGAAgEAGIAAAlIgMAAIAAhKIAMAAIAAAcQAGgGAIgBQARABAAASIAAAig");
	this.shape_22.setTransform(130.325,6);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAHAAIAFABIAAALIgFgBQgIABgCAGIAAAjg");
	this.shape_23.setTransform(123.55,7.05);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_24.setTransform(118.875,7.1);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAIQAFAGAAANIAAAAQAAANgFAGQgGAIgJAAQgJAAgFgHgAgKAAIAAAVQADAIAHAAQAFgBADgEQADgEAAgJIAAgBQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_25.setTransform(113.425,6.05);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AAaAbIAAgiQAAgEgCgDQgDgCgFAAQgEAAgDACQgCADgBADIAAAjIgLAAIAAgiQAAgJgKAAQgGAAgEAGIAAAlIgLAAIAAg0IAKAAIABAGQAFgHALAAQAJAAAEAJQAFgJALAAQAJAAAEAFQAEAFAAAJIAAAig");
	this.shape_26.setTransform(106.15,7.05);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_27.setTransform(99.125,7.1);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgLAjQgFgCgDgEIAFgHQAGAGAIAAQAFAAADgDQADgDAAgHIAAgDQgFAGgHgBQgJABgGgIQgGgHAAgNQAAgMAGgHQAFgIAKAAQAIAAAFAHIABgGIAKAAIAAAzQAAAKgGAHQgHAFgKABQgFAAgGgDgAgHgWQgDAFAAAIQAAAJADAEQADAEAFAAQAHAAADgGIAAgXQgDgFgHgBQgFAAgDAFg");
	this.shape_28.setTransform(93.475,8.1);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AAKAlIAAghQAAgFgCgCQgDgCgEgBQgGAAgEAGIAAAlIgMAAIAAhKIAMAAIAAAcQAGgGAIgBQARABAAASIAAAig");
	this.shape_29.setTransform(85.475,6);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgRAUQgGgHAAgNIAAAAQAAgHACgGQAEgHAFgDQAGgEAGAAQAKABAIAGQAGAIAAALIAAABQAAAJgDAGQgDAFgFAEQgGADgHAAQgKABgHgIgAgIgMQgEAFAAAHQAAAJAEAFQADAEAFAAQAGAAAEgEQACgFAAgJQAAgHgDgFQgDgFgGAAQgFAAgDAFg");
	this.shape_30.setTransform(79.85,7.1);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgGASIAAgdIgIAAIAAgJIAIAAIAAgMIAMAAIAAAMIAJAAIAAAJIgJAAIAAAdIABAEIAEABIAEAAIAAAJIgHABQgOAAAAgPg");
	this.shape_31.setTransform(75.2,6.525);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_32.setTransform(70.875,7.05);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgRAUQgGgHAAgNIAAAAQAAgHACgGQADgHAGgDQAFgEAHAAQALABAGAGQAHAIAAALIAAABQAAAJgCAGQgDAFgGAEQgFADgIAAQgKABgHgIgAgJgMQgDAFAAAHQAAAJADAFQAEAEAFAAQAGAAAEgEQADgFAAgJQgBgHgDgFQgDgFgGAAQgFAAgEAFg");
	this.shape_33.setTransform(65.25,7.1);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgNIAAAAQAAgMAHgHQAGgIAKAAQAKAAAGAGQAFAGABAJIgLAAQgBgFgDgDQgCgDgFAAQgFAAgDAFQgDADAAAJIAAABQAAAJADAEQADAEAFAAQAEAAADgDQADgCABgEIALAAQAAAFgDAEQgDAEgFADQgFACgGAAQgKAAgGgGg");
	this.shape_34.setTransform(59.875,7.1);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_35.setTransform(52.025,7.1);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_36.setTransform(46.575,8.075);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_37.setTransform(40.975,7.1);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgNAbIAAg0IAMAAIAAAGQADgHAIAAIAEABIgBALIgEgBQgIABgCAGIAAAjg");
	this.shape_38.setTransform(36.75,7.05);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_39.setTransform(32.125,7.1);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAIQAFAGAAANIAAAAQAAANgFAGQgGAIgJAAQgJAAgFgHgAgKAAIAAAVQADAIAHAAQAFgBADgEQADgEAAgJIAAgBQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_40.setTransform(26.675,6.05);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_41.setTransform(21.125,7.1);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgZAjIAAhGIAZAAQALAAAHAFQAGAFAAAKQAAAEgDAFQgCADgFACQAFABAEAFQADAEAAAGQgBAKgGAFQgHAGgMgBgAgMAZIANAAQAFABAEgDQADgDAAgFQAAgMgLABIgOAAgAgMgEIAMAAQAFgBADgCQAEgDgBgEQAAgGgDgCQgCgCgGAAIgMAAg");
	this.shape_42.setTransform(15.35,6.2);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFE319").s().p("AvSikIelgJIAAFRI+lAKg");
	this.shape_43.setTransform(98.125,14.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

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
	this.shape.setTransform(230.925,474.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgjBDQgOgMgBgUIAZAAQABALAIAHQAGAGAKAAQALAAAIgJQAGgJAAgOQAAgPgHgIQgIgHgMAAQgHAAgEACQgFABgGAFIgWgFIAJhOIBTAAIAAAWIg9AAIgFAmQAMgGAMAAQAXAAAMAOQAMANAAAYQAAAYgNAOQgOAOgYAAQgUAAgPgMg");
	this.shape_1.setTransform(221.95,468.325);

	this.instance = new lib.Tween8_1("synched",0);
	this.instance.setTransform(224.8,468.35,0.0361,0.0648);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_2.setTransform(230.925,417.375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AALBOIAAgjIhCAAIgBgPIBDhpIAaAAIAABjIAUAAIAAAVIgUAAIAAAjgAAKgmIgmA8IAnAAIAAhAg");
	this.shape_3.setTransform(221.7,410.875);

	this.instance_1 = new lib.Tween8_1("synched",0);
	this.instance_1.setTransform(224.8,411,0.0361,0.0648);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_4.setTransform(230.925,361.925);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AglBEQgOgMAAgUIAaAAQAAALAHAGQAHAHALAAQAMAAAHgHQAHgGAAgNQAAgMgHgHQgIgGgNAAIgPAAIAAgUIAPAAQAMAAAGgGQAIgGgBgMQAAgLgFgGQgHgGgLAAQgKAAgGAGQgIAGABAKIgbAAQABgMAGgKQAHgKALgGQALgFAOAAQAXAAANAMQANALAAAVQAAALgGAJQgHAJgLAFQAOADAGAKQAHAJAAANQAAAVgOANQgPAMgXAAQgWAAgPgMg");
	this.shape_5.setTransform(221.5,355.425);

	this.instance_2 = new lib.Tween8_1("synched",0);
	this.instance_2.setTransform(224.8,355.55,0.0361,0.0648);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_6.setTransform(230.925,303.825);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgyBPIAAgSIAzg5QALgLAFgIQAFgJAAgIQAAgMgGgGQgHgHgJAAQgNAAgHAHQgHAIAAAOIgaAAQAAgPAHgLQAGgMAMgGQAMgGAQAAQAWAAANALQANAMAAAUQAAALgHANQgGAMgPAQIglApIBHAAIAAAVg");
	this.shape_7.setTransform(221.725,297.225);

	this.instance_3 = new lib.Tween8_1("synched",0);
	this.instance_3.setTransform(224.8,297.45,0.0361,0.0648);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_8.setTransform(230.925,249.425);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAGBOIAAh8IglANIAAgWIA8gWIADAAIAACbg");
	this.shape_9.setTransform(220.475,242.9);

	this.instance_4 = new lib.Tween8_1("synched",0);
	this.instance_4.setTransform(224.8,243.05,0.0361,0.0648);

	this.lima = new lib.drag15G5();
	this.lima.name = "lima";
	this.lima.setTransform(308.1,471.05,0.8086,0.8086,0,0,0,82.2,24.6);

	this.empat = new lib.drag15G4();
	this.empat.name = "empat";
	this.empat.setTransform(308.15,418.25,0.8086,0.8086,0,0,0,4.5,-3.5);

	this.tiga = new lib.drag15G3();
	this.tiga.name = "tiga";
	this.tiga.setTransform(308.15,362.3,0.8086,0.8086,0,0,0,86.3,25.9);

	this.dua = new lib.drag15G2();
	this.dua.name = "dua";
	this.dua.setTransform(308.15,304.8,0.8086,0.8086,0,0,0,82.5,29.4);

	this.satu = new lib.drag15G1();
	this.satu.name = "satu";
	this.satu.setTransform(308.1,250.25,0.8086,0.8086,0,0,0,81.5,27.4);

	this.kotakKartu2 = new lib.target();
	this.kotakKartu2.name = "kotakKartu2";
	this.kotakKartu2.setTransform(485.9,264.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.kotakKartu2},{t:this.satu},{t:this.dua},{t:this.tiga},{t:this.empat},{t:this.lima},{t:this.instance_4},{t:this.shape_9},{t:this.shape_8},{t:this.instance_3},{t:this.shape_7},{t:this.shape_6},{t:this.instance_2},{t:this.shape_5},{t:this.shape_4},{t:this.instance_1},{t:this.shape_3},{t:this.shape_2},{t:this.instance},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Slots10, new cjs.Rectangle(209.6,227.9,344.29999999999995,261.1), null);


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
	this.lima = new lib.drop15G5();
	this.lima.name = "lima";
	this.lima.setTransform(134.4,466.1,0.4136,0.4136,0,0,0,146.2,51.4);
	new cjs.ButtonHelper(this.lima, 0, 1, 1);

	this.empat = new lib.drop15G4();
	this.empat.name = "empat";
	this.empat.setTransform(134.4,355.05,0.4136,0.4136,0,0,0,137.3,58.5);
	new cjs.ButtonHelper(this.empat, 0, 1, 1);

	this.tiga = new lib.drop15G3();
	this.tiga.name = "tiga";
	this.tiga.setTransform(134.4,278.3,0.4136,0.4136,0,0,0,134.6,51.6);
	new cjs.ButtonHelper(this.tiga, 0, 1, 1);

	this.dua = new lib.drop15G2();
	this.dua.name = "dua";
	this.dua.setTransform(134.4,201.6,0.4136,0.4136,0,0,0,136.6,52.2);
	new cjs.ButtonHelper(this.dua, 0, 1, 1);

	this.satu = new lib.drop15G1();
	this.satu.name = "satu";
	this.satu.setTransform(134.4,415.5,0.4136,0.4136,0,0,0,128.5,49.2);
	new cjs.ButtonHelper(this.satu, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.satu},{t:this.dua},{t:this.tiga},{t:this.empat},{t:this.lima}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces10, new cjs.Rectangle(68.6,169.6,131.70000000000002,324.5), null);


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
	this.target = new lib.drag15G11();
	this.target.name = "target";
	this.target.setTransform(269.3,383.5,0.9294,0.9456,0,0,0,45.1,46.9);
	new cjs.ButtonHelper(this.target, 0, 1, 1);

	this.target_1 = new lib.drag15G10();
	this.target_1.name = "target_1";
	this.target_1.setTransform(178,383.5,0.9294,0.9456,0,0,0,45.1,46.9);
	new cjs.ButtonHelper(this.target_1, 0, 1, 1);

	this.target_2 = new lib.drag15G9();
	this.target_2.name = "target_2";
	this.target_2.setTransform(87.3,383.5,0.9294,0.9456,0,0,0,45.1,46.9);
	new cjs.ButtonHelper(this.target_2, 0, 1, 1);

	this.hemmm = new lib.drag14G11();
	this.hemmm.name = "hemmm";
	this.hemmm.setTransform(451.8,383.25,0.928,0.9416,0,0,0,45.1,47);
	new cjs.ButtonHelper(this.hemmm, 0, 1, 1);

	this.hemmm_1 = new lib.drag14G10();
	this.hemmm_1.name = "hemmm_1";
	this.hemmm_1.setTransform(359.8,383.25,0.928,0.9416,0,0,0,45.1,47);
	new cjs.ButtonHelper(this.hemmm_1, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.hemmm_1},{t:this.hemmm},{t:this.target_2},{t:this.target_1},{t:this.target}]}).wait(1));

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
	this.instance = new lib._15();
	this.instance.setTransform(-258,-256,0.8813,0.9553);

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
	this.instance = new lib.Bitmap149();
	this.instance.setTransform(-248,-249,1.9099,2.5109);

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


// stage content:
(lib.game18_temp = function(mode,startPosition,loop) {
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
		  window.location.replace("../game17/index.html");
		});
		
		root.btnBack3.on("click", function () {
		  window.location.replace("../game15/index.html");
		});
		
		root.pp1.gotoAndStop(0);
		
		root.g1.on("click", function () {
		  root.pp1.gotoAndPlay(0);
		});
		
		root.pp2.gotoAndStop(0);
		
		root.g2.on("click", function () {
		  root.pp2.gotoAndPlay(0);
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

	// base
	this.g2 = new lib.g2();
	this.g2.name = "g2";
	this.g2.setTransform(794.2,270.5);

	this.g1 = new lib.g1();
	this.g1.name = "g1";
	this.g1.setTransform(670.2,270.5);

	this.instance = new lib.info();
	this.instance.setTransform(801.15,190.3);

	this.cobaha = new lib.bg5();
	this.cobaha.name = "cobaha";
	this.cobaha.setTransform(675.75,358.05);

	this.drag2G1 = new lib.drag7G7();
	this.drag2G1.name = "drag2G1";
	this.drag2G1.setTransform(854.45,223.6,0.8086,0.8086,0,0,0,82.2,26.7);
	new cjs.ButtonHelper(this.drag2G1, 0, 1, 1);

	this.btnInfo = new lib.btnInfo();
	this.btnInfo.name = "btnInfo";
	this.btnInfo.setTransform(441.9,175.45,0.6435,0.6435,0,0,0,0.1,0);
	new cjs.ButtonHelper(this.btnInfo, 0, 1, 2, false, new lib.btnInfo(), 3);

	this.restart = new lib.Restart();
	this.restart.name = "restart";
	this.restart.setTransform(522.3,174.25,0.7541,0.7541);
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

	this.pieces = new lib.Pieces10();
	this.pieces.name = "pieces";

	this.slots = new lib.Slots10();
	this.slots.name = "slots";

	this.winMessage = new cjs.Text("Sepertinya Tebakan Anda Salah, Silahkan Coba Lagi", "17px 'Roboto'", "#FFFFFF");
	this.winMessage.name = "winMessage";
	this.winMessage.textAlign = "center";
	this.winMessage.lineHeight = 22;
	this.winMessage.lineWidth = 418;
	this.winMessage.parent = this;
	this.winMessage.setTransform(476,193);

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
	this.shape.graphics.f("#FFFFFF").s().p("AABAOQAIgKAAgLIAAgMIAPAAIAAALQAAAIgEAHQgEAIgGAFgAgXAOQAHgKABgLIAAgMIAPAAIAAALQAAAIgEAHQgEAIgHAFg");
	this.shape.setTransform(730.825,113.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_1.setTransform(725.825,118.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_2.setTransform(719.05,119.675);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_3.setTransform(712.275,118.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgGAAgIIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgFQgEgEAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgGgFgFQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEADALACQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKABgIgEg");
	this.shape_4.setTransform(701.625,119.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgbAnQgJgIAAgLQAAgOALgGQAKgJASAAIAPAAIAAgHQAAgHgEgFQgFgFgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgHAFgGQAEgGAIgEQAJgDAIAAQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgHQgLAMgOgBQgNAAgIgHgAgUASQgBAHAFAEQAFAEAIABQAGAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_5.setTransform(692.6,119.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_6.setTransform(685.925,117.875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgLAJgFQAKgHAJABQASAAAJALQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLASgXgBQgRABgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_7.setTransform(679.425,119.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_8.setTransform(671.125,117.875);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAvAuIAAg7QAAgJgEgFQgEgFgKAAQgJAAgGAFQgGAGAAAIIAAA7IgPAAIAAg6QAAgUgTAAQgPAAgFANIAABBIgQAAIAAhZIAOAAIABAKQAKgMAQAAQAUAAAFAPQAFgHAHgEQAHgEAKAAQAdAAABAgIAAA7g");
	this.shape_9.setTransform(654.6,119.675);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgLQAAgOALgGQAKgJATAAIAOAAIAAgHQABgHgFgFQgFgFgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAEgGAIgEQAJgDAIAAQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgHQgLAMgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAEAIABQAGAAAGgFQAHgDACgGIAAgTIgMAAQgbAAAAARg");
	this.shape_10.setTransform(642.5,119.75);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_11.setTransform(635.825,117.875);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgLQAAgOALgGQAKgJATAAIAPAAIAAgHQAAgHgFgFQgFgFgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgHAEgGQAFgGAJgEQAIgDAJAAQAPgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgHQgLAMgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAEAHABQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_12.setTransform(629.1,119.75);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgVIAAgBQAAgUAKgMQAKgMAQAAQAOgBAKALIAAguIAPAAIAAB+IgOAAIgBgKQgJAMgQgBQgPAAgKgMgAgPgGQgHAIAAARQAAAQAHAIQAGAJAKAAQAPgBAHgNIAAgnQgHgOgPAAQgKABgGAIg");
	this.shape_13.setTransform(619.475,117.95);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgGAAgIIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgFQgEgEAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgGgFgFQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEADALACQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKABgIgEg");
	this.shape_14.setTransform(606.325,119.75);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgLAJgFQAKgHAJABQASAAAJALQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLASgXgBQgRABgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_15.setTransform(597.525,119.75);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_16.setTransform(590.875,118.125);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgGAAgIIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgFQgEgEAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgGgFgFQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEADALACQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKABgIgEg");
	this.shape_17.setTransform(584.425,119.75);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgLAJgFQAKgHAJABQASAAAJALQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLASgXgBQgRABgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_18.setTransform(575.625,119.75);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AglA/IAAh7IAOAAIABAKQAKgMAPAAQAQAAAKAMQAJAMAAAWIAAACQAAATgJAMQgKANgQAAQgPAAgJgKIAAArgAgVglIAAAqQAGAMAOAAQAKABAHgJQAGgJABgQQgBgPgGgJQgHgJgKAAQgOAAgGAMg");
	this.shape_19.setTransform(566.45,121.4);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgGAAgIIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgFQgEgEAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgGgFgFQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEADALACQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKABgIgEg");
	this.shape_20.setTransform(557.125,119.75);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIAAALQALgNAQAAQAcAAAAAgIAAA7g");
	this.shape_21.setTransform(543.85,119.675);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgLQAAgOALgGQAKgJATAAIAOAAIAAgHQABgHgFgFQgFgFgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAEgGAIgEQAJgDAIAAQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgHQgLAMgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAEAIABQAGAAAGgFQAHgDACgGIAAgTIgMAAQgbAAAAARg");
	this.shape_22.setTransform(534.5,119.75);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_23.setTransform(526.175,117.875);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgbAnQgJgIAAgLQAAgOALgGQAKgJASAAIAPAAIAAgHQAAgHgEgFQgFgFgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgHAFgGQAEgGAIgEQAJgDAIAAQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgHQgLAMgOgBQgNAAgIgHgAgUASQgBAHAFAEQAFAEAIABQAGAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_24.setTransform(516.65,119.75);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AglA/IAAh7IAOAAIABAKQAJgMAQAAQAQAAAJAMQAKAMAAAWIAAACQAAATgKAMQgJANgQAAQgPAAgKgKIAAArgAgWglIAAAqQAIAMAOAAQAJABAHgJQAHgJgBgQQABgPgHgJQgHgJgJAAQgOAAgIAMg");
	this.shape_25.setTransform(507.45,121.4);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgJALgQAAQgOAAgIgIg");
	this.shape_26.setTransform(497.825,119.825);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_27.setTransform(490.725,119.675);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgLAJgFQAKgHAJABQASAAAJALQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLASgXgBQgRABgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_28.setTransform(482.975,119.75);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgJgFgFQgEgFgLAAQgIAAgGAFQgFAGgCAIIAAA7IgOAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgPAAIAAhZIAPAAIAAAKQAKgMARAAQASAAAHAPQAEgHAHgEQAHgEAKAAQAeAAAAAgIAAA7g");
	this.shape_29.setTransform(470.95,119.675);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgSA7QgKgEgFgHIAIgKQALANAOAAQAKAAAGgGQAHgHgBgLIAAgIQgJAKgPAAQgPAAgKgMQgKgMAAgWQAAgVAKgMQAJgMARAAQAPAAAJALIABgKIAOAAIAABXQAAASgKAKQgLAKgRAAQgJgBgJgEgAgQgpQgFAJgBARQABAPAFAIQAHAJAKAAQAOgBAHgNIAAgnQgHgOgOAAQgKABgHAIg");
	this.shape_30.setTransform(454.35,121.45);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_31.setTransform(445.05,119.675);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgLQAAgOALgGQALgJARAAIAQAAIAAgHQAAgHgFgFQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAEgGQAGgGAIgEQAIgDAJAAQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgHQgLAMgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAEAHABQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_32.setTransform(435.7,119.75);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgbA/IgFgBIAAgNIAEABQAIAAAEgEQAEgDADgIIAEgJIgghYIAQAAIAWBCIAVhCIAQAAIgkBnQgHAWgTAAg");
	this.shape_33.setTransform(427.075,121.575);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAAAAgIAAA7g");
	this.shape_34.setTransform(414.15,119.675);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgLQAAgOALgGQAKgJATAAIAOAAIAAgHQABgHgFgFQgFgFgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAFgGAHgEQAJgDAIAAQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgHQgLAMgNgBQgOAAgJgHgAgUASQAAAHAEAEQAFAEAIABQAGAAAGgFQAHgDACgGIAAgTIgMAAQgaAAAAARg");
	this.shape_35.setTransform(404.8,119.75);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AAVAtIgVhDIgVBDIgMAAIgahZIAPAAIASBDIAVhDIALAAIAVBEIAShEIAPAAIgaBZg");
	this.shape_36.setTransform(393.775,119.75);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgLAJgFQAKgHAJABQASAAAJALQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLASgXgBQgRABgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_37.setTransform(382.975,119.75);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAh/IAQAAIAAAxQAKgNAPAAQAdAAAAAfIAAA8g");
	this.shape_38.setTransform(373.75,117.875);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgTAGIAAgLIAnAAIAAALg");
	this.shape_39.setTransform(366.675,119.125);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_40.setTransform(359.65,119.675);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgbAnQgJgIAAgLQAAgOALgGQALgJARAAIAQAAIAAgHQgBgHgEgFQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAGgGAIgEQAIgDAJAAQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgHQgLAMgOgBQgNAAgIgHgAgVASQAAAHAFAEQAFAEAHABQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_41.setTransform(350.3,119.75);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AAVAtIgVhDIgVBDIgMAAIgahZIAPAAIASBDIAVhDIALAAIAVBEIAShEIAPAAIgaBZg");
	this.shape_42.setTransform(339.275,119.75);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgLAJgFQAKgHAJABQASAAAJALQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLASgXgBQgRABgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_43.setTransform(328.475,119.75);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgPAAIAAh/IAPAAIAAAxQAKgNAPAAQAdAAABAfIAAA8g");
	this.shape_44.setTransform(319.25,117.875);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_45.setTransform(305.65,119.675);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgbAnQgJgIAAgLQAAgOALgGQALgJARAAIAQAAIAAgHQgBgHgEgFQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAGgGAIgEQAIgDAJAAQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgHQgLAMgOgBQgNAAgIgHgAgVASQAAAHAFAEQAFAEAHABQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_46.setTransform(296.3,119.75);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_47.setTransform(287.975,117.875);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_48.setTransform(279.375,117.875);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgJALgQAAQgOAAgIgIg");
	this.shape_49.setTransform(269.825,119.825);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgGAAgIIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgFQgEgEAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgGgFgFQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEADALACQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKABgIgEg");
	this.shape_50.setTransform(260.775,119.75);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgbAnQgJgIAAgLQAAgOALgGQALgJARAAIAQAAIAAgHQgBgHgEgFQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAGgGAIgEQAIgDAJAAQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgHQgLAMgNgBQgOAAgIgHgAgVASQAAAHAFAEQAFAEAHABQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_51.setTransform(251.75,119.75);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AAvAuIAAg7QAAgJgEgFQgEgFgKAAQgJAAgGAFQgGAGAAAIIAAA7IgPAAIAAg6QAAgUgTAAQgPAAgFANIAABBIgQAAIAAhZIAOAAIABAKQAKgMAQAAQAUAAAFAPQAFgHAHgEQAHgEAKAAQAdAAABAgIAAA7g");
	this.shape_52.setTransform(239.7,119.675);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAAAAgIAAA7g");
	this.shape_53.setTransform(223.35,119.675);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgLQAAgOALgGQAKgJATAAIAOAAIAAgHQABgHgFgFQgFgFgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAFgGAHgEQAJgDAIAAQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgHQgLAMgNgBQgOAAgJgHgAgUASQAAAHAEAEQAFAEAIABQAGAAAGgFQAHgDACgGIAAgTIgMAAQgaAAAAARg");
	this.shape_54.setTransform(214,119.75);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgVIAAgBQAAgUAKgMQAKgMAQAAQAOgBAKALIAAguIAPAAIAAB+IgOAAIgBgKQgJAMgQgBQgPAAgKgMgAgPgGQgHAIAAARQAAAQAHAIQAGAJAKAAQAPgBAHgNIAAgnQgHgOgPAAQgKABgGAIg");
	this.shape_55.setTransform(204.375,117.95);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQAKgJATABIAOAAIAAgIQABgHgFgFQgFgFgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAFgHQAFgGAHgEQAJgEAIABQAQgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgGQgLALgNgBQgOAAgJgHgAgUASQAAAHAEAEQAFAFAIAAQAGAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_56.setTransform(780.1,95.35);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgKAJgHQAKgFAJAAQASAAAJALQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLARgXAAQgRABgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_57.setTransform(771.075,95.35);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgMAQAAQAOgBAKALIAAguIAPAAIAAB+IgOAAIgBgJQgJALgQgBQgPAAgKgMgAgPgGQgHAIAAARQAAAQAHAIQAGAJAKAAQAPAAAHgOIAAgnQgHgNgPgBQgKABgGAIg");
	this.shape_58.setTransform(761.475,93.55);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_59.setTransform(754.825,93.725);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgdAiQgLgMAAgVIAAgBQAAgNAGgLQAEgKAJgGQAKgFALAAQASAAAMAMQALANAAAUIAAABQAAANgFALQgFAKgJAGQgKAFgMAAQgRAAgMgMgAgSgYQgGAJAAAQQAAAPAGAJQAIAJAKAAQALAAAIgJQAGgJAAgQQAAgOgGgKQgIgJgLAAQgKAAgIAJg");
	this.shape_60.setTransform(747.9,95.35);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_61.setTransform(740.625,95.275);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgJALgQAAQgOAAgIgIg");
	this.shape_62.setTransform(732.625,95.425);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAh/IAQAAIAAAxQAKgNAQAAQAcAAAAAfIAAA8g");
	this.shape_63.setTransform(723.3,93.475);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgVIAPAAIAAAVIAQAAIAAAMIgQAAIAAA3QAAAFABADQADADAFAAIAIgBIAAAMIgMABQgLABgDgHg");
	this.shape_64.setTransform(715.55,94.35);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgdAiQgLgMAAgVIAAgBQAAgNAFgLQAFgKAJgGQAKgFALAAQASAAAMAMQALANAAAUIAAABQAAANgFALQgFAKgJAGQgKAFgMAAQgRAAgMgMgAgSgYQgGAJAAAQQAAAPAGAJQAIAJAKAAQAMAAAGgJQAIgJgBgQQABgOgIgKQgGgJgMAAQgKAAgIAJg");
	this.shape_65.setTransform(708.2,95.35);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_66.setTransform(701.275,93.475);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgdAiQgLgMAAgVIAAgBQAAgNAGgLQAEgKAJgGQAKgFALAAQASAAAMAMQALANAAAUIAAABQAAANgFALQgFAKgJAGQgKAFgMAAQgRAAgMgMgAgSgYQgGAJAAAQQAAAPAGAJQAIAJAKAAQALAAAIgJQAGgJAAgQQAAgOgGgKQgIgJgLAAQgKAAgIAJg");
	this.shape_67.setTransform(694.35,95.35);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AAfA8IAAg4Ig9AAIAAA4IgQAAIAAh3IAQAAIAAA0IA9AAIAAg0IAQAAIAAB3g");
	this.shape_68.setTransform(683.45,93.8);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgEQgEgFAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgHgFgEQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEACALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKAAgIgDg");
	this.shape_69.setTransform(668.825,95.35);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQALgJARABIAQAAIAAgIQAAgHgFgFQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgGAEgHQAGgGAIgEQAIgEAJABQAPgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAFAHAAQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_70.setTransform(659.8,95.35);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_71.setTransform(653.125,93.475);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgKAJgHQAKgFAJAAQASAAAJALQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLARgXAAQgRABgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_72.setTransform(646.625,95.35);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_73.setTransform(638.325,93.475);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_74.setTransform(625.525,93.475);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_75.setTransform(618.575,93.725);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgQAAIAAgMIAQAAIAAgVIAOAAIAAAVIARAAIAAAMIgRAAIAAA3QAAAFADADQACADAGAAIAGgBIAAAMIgLABQgKABgFgHg");
	this.shape_76.setTransform(613.45,94.35);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgEQgEgFAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgHgFgEQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEACALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKAAgIgDg");
	this.shape_77.setTransform(606.575,95.35);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_78.setTransform(600.125,93.725);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_79.setTransform(595.625,95.275);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgKAJgHQAKgFAJAAQASAAAJALQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLARgXAAQgRABgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_80.setTransform(587.875,95.35);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgRAAIAAgMIARAAIAAgVIAPAAIAAAVIAQAAIAAAMIgQAAIAAA3QAAAFACADQACADAGAAIAGgBIAAAMIgLABQgKABgFgHg");
	this.shape_81.setTransform(580.25,94.35);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_82.setTransform(574.025,93.475);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgGQALgJARABIAQAAIAAgIQgBgHgEgFQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAEgHQAGgGAIgEQAIgEAJABQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgOgBQgNAAgIgHgAgVASQAAAHAFAEQAFAFAHAAQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_83.setTransform(564.5,95.35);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_84.setTransform(557.475,95.275);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgGQAKgJASABIAPAAIAAgIQAAgHgEgFQgFgFgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgGAFgHQAFgGAHgEQAJgEAIABQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgGQgLALgOgBQgNAAgIgHgAgUASQgBAHAFAEQAFAFAIAAQAGAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_85.setTransform(549.5,95.35);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_86.setTransform(541.175,93.475);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_87.setTransform(529.675,95.275);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQALgJASABIAOAAIAAgIQABgHgFgFQgFgFgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAFgHQAFgGAHgEQAJgEAIABQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgGQgLALgOgBQgNAAgJgHgAgUASQgBAHAFAEQAFAFAIAAQAGAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_88.setTransform(521.7,95.35);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgVIAOAAIAAAVIARAAIAAAMIgRAAIAAA3QAAAFACADQADADAFAAIAIgBIAAAMIgMABQgLABgDgHg");
	this.shape_89.setTransform(514.05,94.35);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AgMBAIAAhMIgOAAIAAgNIAOAAIAAgJQAAgOAIgIQAGgHAOgBIALABIgBANIgIAAQgIAAgEAEQgEAEAAAIIAAAJIATAAIAAANIgTAAIAABMg");
	this.shape_90.setTransform(508.875,93.4);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQALgJASABIAOAAIAAgIQABgHgFgFQgFgFgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAFgHQAFgGAHgEQAJgEAIABQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgGQgLALgOgBQgNAAgJgHgAgUASQgBAHAFAEQAFAFAIAAQAGAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_91.setTransform(501,95.35);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgMAQAAQAOgBAKALIAAguIAPAAIAAB+IgOAAIgBgJQgJALgQgBQgPAAgKgMgAgPgGQgHAIAAARQAAAQAHAIQAGAJAKAAQAPAAAHgOIAAgnQgHgNgPgBQgKABgGAIg");
	this.shape_92.setTransform(491.375,93.55);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_93.setTransform(477.9,95.275);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQALgJARABIAQAAIAAgIQAAgHgFgFQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgGAEgHQAGgGAIgEQAIgEAJABQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAFAHAAQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_94.setTransform(468.55,95.35);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AgTA7QgIgEgFgHIAIgKQAJANAOAAQALAAAGgGQAGgHABgLIAAgIQgKAKgPAAQgQAAgJgMQgKgMAAgVQAAgWAJgMQALgMAPAAQAQAAAJALIABgKIAOAAIAABXQAAASgKAKQgLAKgRAAQgJgBgKgEgAgPgpQgHAJAAARQAAAPAHAIQAGAJAKAAQAOAAAIgOIAAgnQgIgNgOgBQgKABgGAIg");
	this.shape_95.setTransform(459,97.05);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAAAAgIAAA7g");
	this.shape_96.setTransform(449.7,95.275);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgKAJgHQAKgFAJAAQASAAAJALQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLARgXAAQgRABgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_97.setTransform(440.575,95.35);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgMAQAAQAOgBAKALIAAguIAPAAIAAB+IgOAAIgBgJQgJALgQgBQgPAAgKgMgAgPgGQgHAIAAARQAAAQAHAIQAGAJAKAAQAPAAAHgOIAAgnQgHgNgPgBQgKABgGAIg");
	this.shape_98.setTransform(430.975,93.55);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_99.setTransform(417.5,95.275);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQAKgJATABIAPAAIAAgIQAAgHgFgFQgFgFgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgGAEgHQAFgGAJgEQAIgEAJABQAPgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAFAHAAQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_100.setTransform(408.15,95.35);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AAVAtIgVhDIgVBDIgMAAIgahZIAPAAIASBCIAVhCIALAAIAVBEIAShEIAPAAIgaBZg");
	this.shape_101.setTransform(397.125,95.35);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgKAJgHQAKgFAJAAQASAAAJALQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLARgXAAQgRABgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_102.setTransform(386.325,95.35);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAGIAABAIgPAAIAAh/IAPAAIAAAxQAKgNAPAAQAdAAAAAfIAAA8g");
	this.shape_103.setTransform(377.1,93.475);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_104.setTransform(364.475,93.475);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_105.setTransform(357.525,93.725);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgVIAPAAIAAAVIAQAAIAAAMIgQAAIAAA3QAAAFABADQADADAFAAIAIgBIAAAMIgMABQgLABgDgHg");
	this.shape_106.setTransform(352.4,94.35);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgEQgEgFAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgHgFgEQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEACALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKAAgIgDg");
	this.shape_107.setTransform(345.525,95.35);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_108.setTransform(339.075,93.725);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_109.setTransform(334.575,95.275);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgKAJgHQAKgFAJAAQASAAAJALQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLARgXAAQgRABgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_110.setTransform(326.825,95.35);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgVIAOAAIAAAVIARAAIAAAMIgRAAIAAA3QAAAFACADQADADAFAAIAIgBIAAAMIgMABQgLABgDgHg");
	this.shape_111.setTransform(319.2,94.35);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_112.setTransform(312.975,93.475);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgGQALgJASABIAOAAIAAgIQABgHgFgFQgFgFgJAAQgHAAgGAEQgFAEAAAGIgQAAQAAgGAFgHQAFgGAHgEQAJgEAIABQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgGQgLALgOgBQgNAAgIgHgAgUASQgBAHAFAEQAFAFAIAAQAGAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_113.setTransform(303.45,95.35);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_114.setTransform(296.425,95.275);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQAKgJATABIAPAAIAAgIQAAgHgFgFQgFgFgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgGAEgHQAFgGAJgEQAIgEAJABQAPgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAFAIAAQAGAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_115.setTransform(288.45,95.35);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_116.setTransform(280.125,93.475);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_117.setTransform(268.625,95.275);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQALgJASABIAPAAIAAgIQAAgHgFgFQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgGAEgHQAGgGAIgEQAIgEAJABQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAFAHAAQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_118.setTransform(260.65,95.35);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgQAAIAAgMIAQAAIAAgVIAOAAIAAAVIARAAIAAAMIgRAAIAAA3QABAFACADQACADAGAAIAGgBIAAAMIgLABQgKABgFgHg");
	this.shape_119.setTransform(253,94.35);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AgMBAIAAhMIgOAAIAAgNIAOAAIAAgJQAAgOAIgIQAGgHAOgBIALABIgBANIgIAAQgIAAgEAEQgEAEAAAIIAAAJIATAAIAAANIgTAAIAABMg");
	this.shape_120.setTransform(247.825,93.4);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQALgJASABIAPAAIAAgIQAAgHgFgFQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgGAEgHQAGgGAIgEQAIgEAJABQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAFAHAAQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_121.setTransform(239.95,95.35);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgMAQAAQAOgBAKALIAAguIAPAAIAAB+IgOAAIgBgJQgJALgQgBQgPAAgKgMgAgPgGQgHAIAAARQAAAQAHAIQAGAJAKAAQAPAAAHgOIAAgnQgHgNgPgBQgKABgGAIg");
	this.shape_122.setTransform(230.325,93.55);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_123.setTransform(216.85,95.275);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgGQAKgJASABIAPAAIAAgIQAAgHgEgFQgFgFgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgGAFgHQAFgGAHgEQAJgEAIABQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgGQgLALgOgBQgNAAgIgHgAgUASQgBAHAFAEQAFAFAIAAQAGAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_124.setTransform(207.5,95.35);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_125.setTransform(199.175,93.475);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AgdAiQgLgMAAgVIAAgBQAAgNAGgLQAEgKAJgGQAKgFALAAQASAAAMAMQALANAAAUIAAABQAAANgFALQgFAKgJAGQgKAFgMAAQgRAAgMgMgAgSgYQgGAJAAAQQAAAPAGAJQAIAJAKAAQALAAAIgJQAGgJAAgQQAAgOgGgKQgIgJgLAAQgKAAgIAJg");
	this.shape_126.setTransform(189.45,95.35);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AgaAjQgLgNAAgVIAAgBQAAgOAFgKQAFgKAJgGQAJgGALABQAPgBAKAKQAKAIABAPIgOAAQgCgIgFgGQgGgGgJAAQgLAAgGAIQgGAJAAAQIAAACQAAAPAGAJQAGAIALAAQAJAAAFgFQAHgFABgHIAOAAQgBAHgEAHQgFAHgJAFQgHADgKAAQgRABgLgMg");
	this.shape_127.setTransform(180.25,95.35);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AgcAiQgMgMAAgVIAAgBQAAgNAGgLQAFgKAIgGQAKgFALAAQASAAALAMQAMANAAAUIAAABQAAANgFALQgFAKgKAGQgJAFgMAAQgSAAgKgMgAgRgYQgIAJABAQQgBAPAIAJQAGAJALAAQALAAAIgJQAGgJABgQQgBgOgGgKQgIgJgLAAQgLAAgGAJg");
	this.shape_128.setTransform(170.85,95.35);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AggAvQgOgQAAgaIAAgKQABgRAFgMQAGgNAMgHQALgHANAAQAUAAALALQAMAKACATIgQAAQgDgOgGgHQgIgGgMAAQgPAAgIAMQgJAKAAAVIAAALQAAAUAIAMQAJALAOAAQANAAAHgGQAHgGADgPIAQAAQgDATgMALQgMAKgTAAQgVAAgMgPg");
	this.shape_129.setTransform(160.65,93.8);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AACAUIAAgKQAAgIAEgIQAEgIAGgFIAJAGQgIALAAALIAAALgAgYAUIAAgKQAAgIAEgIQAEgIAHgFIAJAGQgIALAAALIAAALg");
	this.shape_130.setTransform(152.325,88.95);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.bf(img.Bitmap2, null, new cjs.Matrix2D(1,0,0,1,-499,-300)).s().p("EhN9Au4MAAAhdvMCb7AAAMAAABdvg");
	this.shape_131.setTransform(471,266.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.btnNextDasar1},{t:this.btnMenuDasar1},{t:this.btnBack3},{t:this.winMessage},{t:this.slots},{t:this.pieces},{t:this.judulKI},{t:this.Score},{t:this.restart},{t:this.btnInfo},{t:this.drag2G1},{t:this.cobaha},{t:this.instance},{t:this.g1},{t:this.g2}]}).wait(1));

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
		{src:"images/_15.jpeg?1593503506247", id:"_15"},
		{src:"images/Bitmap147.png?1593503506248", id:"Bitmap147"},
		{src:"images/Bitmap152.png?1593503506248", id:"Bitmap152"},
		{src:"images/Bitmap153.png?1593503506248", id:"Bitmap153"},
		{src:"images/Bitmap149.png?1593503506248", id:"Bitmap149"},
		{src:"images/Bitmap3.png?1593503506248", id:"Bitmap3"},
		{src:"images/Bitmap148.png?1593503506248", id:"Bitmap148"},
		{src:"images/Bitmap2.png?1593503506248", id:"Bitmap2"},
		{src:"images/bookpngcopy.png?1593503506248", id:"bookpngcopy"},
		{src:"images/Bitmap154.png?1593503506248", id:"Bitmap154"}
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