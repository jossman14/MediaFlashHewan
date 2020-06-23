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


(lib.Bitmap101copy = function() {
	this.initialize(img.Bitmap101copy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,199,124);


(lib._3 = function() {
	this.initialize(img._3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,638,479);


(lib.Bitmap103copy = function() {
	this.initialize(img.Bitmap103copy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,248,124);


(lib.Bitmap105 = function() {
	this.initialize(img.Bitmap105);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,212,124);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);


(lib.Bitmap3 = function() {
	this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,249,87);


(lib.bookpngcopy = function() {
	this.initialize(img.bookpngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,399);


(lib._11 = function() {
	this.initialize(img._11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,534,631);


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


(lib.TriangleSlot = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.498)").s().p("AncHmQgEgCgBgEQgCgEACgEIAbg2QACgDAEgBQAEgCAEACQADACACAEQABAEgCADIgZAyIgCAEQgCAEgEACIgDAAIgEgBgAmxHkQgDgDAAgEQAAgEADgDQADgDAEAAIA8AAQAEAAADADQADACAAAFIAAAAQAAAEgDADQgDACgEABIg8AAQgEAAgDgDgAGdHnQgEgBgDgCQgDgDAAgEIAAAAQAAgFADgCQADgDAEAAIA8AAQAEAAADADQADACAAAFQAAAEgDADQgDACgEABgAElHnQgEgBgDgCQgDgDAAgEIAAAAQAAgFADgCQADgDAEAAIA8AAQAEAAADADQADACAAAFIAAAAQAAAEgDADQgDACgEABgACtHnQgEgBgDgCQgDgDAAgEIAAAAQAAgFADgCQADgDAEAAIA8AAQAEAAADADQADACAAAFIAAAAQAAAEgDADQgDACgEABgAA1HnQgEgBgDgCQgDgDAAgEIAAAAQAAgFADgCQADgDAEAAIA8AAQAEAAADADQADACAAAFIAAAAQAAAEgDADQgDACgEABgAhCHnQgEgBgDgCQgDgDAAgEIAAAAQAAgFADgCQADgDAEAAIA8AAQAEAAACADQADACAAAFIAAAAQAAAEgDADQgCACgEABgAi6HnQgEgBgDgCQgDgDAAgEIAAAAQAAgFADgCQADgDAEAAIA8AAQAEAAADADQADACAAAFIAAAAQAAAEgDADQgDACgEABgAkyHnQgEgBgDgCQgDgDAAgEIAAAAQAAgFADgCQADgDAEAAIA8AAQAEAAADADQADACAAAFIAAAAQAAAEgDADQgDACgEABgAHSHCQgEgBgCgEIgag2QgCgEABgEQABgDAEgCIAAAAQAEgCAEABQAEABACAEIAaA2QACAEgBAEQgCAEgDACIgBAAIgEABIgDgBgAmmF6QgEgCgBgEQgCgEACgEIAbg2QACgDAEgBQAEgCAEACQADACACAEQABAEgCADIgbA2QgCAEgEACIgDAAIgEgBgAGcFXQgEgCgBgEIgbg2QgCgDABgEQABgEAEgCQAEgCAEACQAEABACADIAbA2QABAEgBAEQgBAEgEACIAAAAIgFABIgDAAgAlwEOQgEgCgBgEQgCgEACgEIAbg2QACgDAEgBQAEgCAEACIAAAAQADACACAEQABAEgCADIgbA2QgCAEgEACIgDAAIgEgBgAFmDrQgEgCgBgEIgbg2QgCgDABgEQABgEAEgCQAEgCAEACQAEABACADIAbA2QABAEgBAEQgBAEgEACIgEABIgEAAgAk6CiIAAAAQgEgCgBgEQgCgEACgEIAbg2QACgDAEgBQAEgCAEACIAAAAQADACACAEQABAEgCADIgbA2QgCAEgEACIgDAAIgEgBgAEwB/QgEgCgBgEIgbg2QgCgDABgEQABgEAEgCQAEgCAEACQAEABACADIAbA2QABAEgBAEQgBAEgEACIgEABIgEAAgAkEA2IAAAAQgEgCgBgEQgCgEACgEIAbg1QACgDAEgBQAEgCAEACIAAAAQADACACAEQABAEgCADIgbA1QgCAEgEACIgDAAIgEgBgAD6ATQgEgCgBgEIgbg1QgCgDABgEQABgEAEgCQAEgCAEACQAEABACADIAbA1QABAEgBAEQgBAEgEACIgEABIgEAAgAjOg1IAAAAQgEgCgBgEQgCgEACgEIAbg2QACgDAEgBQAEgCAEACIAAAAQADACACAEQABAEgCADIgbA2QgCAEgEACIgDAAIgEgBgADEhYQgEgCgBgEIgbg2QgCgDABgEQABgEAEgCQAEgCAEACQAEABACADIAbA2QABAEgBAEQgBAEgEACIgEABIgEAAgAiYihIAAAAQgEgCgBgEQgCgEACgEIAbg2QACgDAEgBQAEgCAEACIAAAAQADACACAEQABAEgCADIgbA2QgCAEgEACIgDAAIgEgBgACOjEQgEgCgBgEIgbg2QgCgDABgEQABgEAEgCQAEgCAEACQAEABACADIAbA2QABAEgBAEQgBAEgEACIgEABIgEAAgAhikNIAAAAQgEgCgBgEQgCgEACgEIAbg2QACgDAEgBQAEgCAEACIAAAAQADACACAEQABAEgCADIgbA2QgCAEgEACIgDAAIgEgBgABYkwQgEgCgBgEIgbg2QgCgDABgEQABgEAEgCQAEgCAEACQAEABACADIAbA2QABAEgBAEQgBAEgEACIgEABIgEAAgAgsl5IAAAAQgEgCgBgEQgCgEACgEIAbg2QACgDAEgBQAEgCAEACIAAAAQADACACAEQABAEgCADIgbA2QgCAEgEACIgDAAIgEgBgAAimcQgEgCgBgEIgbg1IAAgBQgCgDABgEQABgEAEgCQAEgCAEACQAEABACADIAbA2QABAEgBAEQgBAEgEACIgEABIgEAAg");
	this.shape.setTransform(-0.703,0.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.2)").s().p("AiBHaIAAAAQAAgEgDgDQgDgDgEAAIg8AAQgEAAgDADQgDADAAAEIAAAAIgoAAIAAAAQAAgEgDgDQgDgDgEAAIg8AAQgEAAgDADQgDADAAAEIAAAAIgoAAIAAAAQAAgEgDgDQgDgDgEAAIg8AAQgEAAgDADQgDADAAAEIgYAAIAYgxQACgEgBgEQgBgEgEgCIASgkQAEACAEgBQAEgBABgEIAbg2QACgEgBgEQgBgEgEgCIASgkQAEACAEgBQAEgBABgEIAbg2QACgEgBgEQgBgEgEgCIASgkQAEACAEgBQAEgBABgEIAbg2QACgEgBgEQgBgEgEgCIASgkQAEACAEgBQAEgBABgEIAbg1QACgEgBgEQgBgEgEgBIASgkQAEABAEgBQAEgBABgEIAbg2QACgEgBgEQgBgEgEgBIASgkQAEABAEgBQAEgBABgEIAbg2QACgEgBgEQgBgEgEgBIASgkQAEABAEgBQAEgBABgEIAbg2QACgEgBgEQgBgEgEgBIASgkQAEABAEgBQAEgBABgEIAbg2QACgEgBgEQgBgEgEgBIALgWIAaA1QACAEAEABQAEABADgCIASAkQgDACgCAEQgBAEACAEIAbA2QACAEAEABQAEABADgCIASAkQgDACgCAEQgBAEACAEIAbA2QACAEAEABQAEABADgCIASAkQgDACgCAEQgBAEACAEIAbA2QACAEAEABQAEABADgCIASAkQgDACgCAEQgBAEACAEIAbA1QACAEAEABQAEABADgCIASAkQgDACgCAEQgBAEACAEIAbA2QACAEAEABQAEABADgCIASAkQgDACgCAEQgBAEACAEIAbA2QACAEAEABQAEABADgCIASAkQgDACgCAEQgBAEACAEIAbA2QACAEAEABQAEABADgCIASAkQgDACgCAEQgBADACAEIAaA2QACAEAEABQAEACAEgCIAAAAIANAbIgEAAQAAgEgDgDQgDgDgEAAIg8AAQgEAAgDADQgDADAAAEIAAAAIgoAAIAAAAQAAgEgDgDQgDgDgEAAIg8AAQgEAAgDADQgDADAAAEIAAAAIgoAAIAAAAQAAgEgDgDQgDgDgEAAIg8AAQgEAAgDADQgDADAAAEIAAAAIgoAAIAAAAQAAgEgDgDQgDgDgEAAIg8AAQgEAAgDADQgDADAAAEIAAAAIgnAAIAAAAQAAgEgDgDQgDgDgEAAIg8AAQgEAAgDADQgDADAAAEIAAAAg");
	this.shape_1.setTransform(0.5625,0.5625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.TriangleSlot, new cjs.Rectangle(-49,-48.4,96.6,97.4), null);


(lib.Triangle = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// highlight
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(3,1,1).p("AnfHgIHgu/IHfO/g");
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(2));

	// icon
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#933BD9").ss(2,1,1).p("AnfHgIHgu/IHfO/g");

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#933BD9").s().p("AABnfIHfO/Iu/AAg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(3));

	// shadow
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.149)").s().p("AAAnfIHgO/Iu/AAg");
	this.shape_3.setTransform(-10,10);
	this.shape_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1).to({_off:false},0).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-58,-49.5,107.5,107.5);


(lib.targetcopy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgHAeIAAg7IAPAAIAAA7g");
	this.shape.setTransform(18,-2.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgIAdIAAgqIAQAAIAAAqgAgGgVQgBAAAAAAQgBgBAAAAQAAAAgBgBQAAAAAAgBQAAAAAAAAQABgBAAAAQAAgBABAAQAAAAABgBIAGgBIAHABQABABAAAAQABAAAAABQAAAAABABQAAAAAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAIgHABIgGgBg");
	this.shape_1.setTransform(13.475,-2.475);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgTAUQgIgCgFgDQgGgDAAgEIARAAQAAADAHADQAGACAKAAQAJAAAFgCQAHgCAAgCQAAgDgGgCQgFgCgMAAQgNgBgHgCQgHgBgEgDQgDgBAAgDQAAgGAKgDQAKgEAPAAQAQAAALAEQALAEAAAFIgRAAQAAgDgHgCQgFgCgJAAQgJAAgFABQgEADgBACQAAACAFACQAFACAMAAIAUADQAHABAEACQAEADAAAEQAAAFgKAEQgLADgQAAQgLAAgKgCg");
	this.shape_2.setTransform(6.3,-1.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgfATQgJgFAAgEQAAgIAMgCQAMgDAUgBIAQAAIAAgDQAAgDgFgDQgGgCgJAAQgJAAgFABQgHACAAAEIgRAAQABgEAFgCQAFgEAJgCQAJgBAKAAQAQAAAKAEQAKADAAAHIAAASQAAAGADAEIAAAAIgRAAQgBgBgBgEQgMAGgPAAQgPAAgKgDgAgXAJQAAADAGABQAEACAJAAQAHAAAHgCQAHgBADgDIAAgIIgNAAQgeAAAAAIg");
	this.shape_3.setTransform(-3.5,-1.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAhAcIAAgaIhBAAIAAAaIgSAAIAAg4IASAAIAAAZIBBAAIAAgZIASAAIAAA4g");
	this.shape_4.setTransform(-15.175,-2.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFFFFF").ss(2,1,1).p("AqmjkIVNAAIAAHJI1NAAg");
	this.shape_5.setTransform(-0.85,-1.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(89,89,89,0.247)").s().p("AqlDlIAAnJIVLAAIAAHJg");
	this.shape_6.setTransform(-0.85,-1.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.targetcopy, new cjs.Rectangle(-69.7,-25.2,137.7,47.8), null);


(lib.StarSlot = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.498)").s().p("AEdHlIg0gdQgEgCgBgEQgBgEACgDIAAgBQACgDAEgBQAEgBADACIA1AdQADACACAEQABADgCAEIAAAAQgCAEgEABIgDABIgFgCgAkhHbQgEgBgCgDIAAgBQgCgDABgEQABgEAEgCIA0gdQADgCAEABQAEABACAEIAAAAQACAEgBADQgBAEgEACIg0AdIgEACIgDgBgAk8HWIAAAAQgEAAgDgEQgCgDABgEIALg7QAAgEAEgDQADgCAEABIABAAQAEABACADQACADgBAEIgLA7QAAAEgEADQgCABgDAAIgCAAgAEjHBQgEgCgBgEIgMg7QgBgFADgDQACgDAEgBIABAAQADgBAEACQADADABAEIAMA7QABAEgDADQgCADgEABIgBAAIgBAAQgDAAgCgBgAC1GrIg1gdQgEgCgBgEQgBgEACgDIAAgBQACgDAEgBQAEgBADACIA1AdQAEACABAEQABAEgCADIAAAAQgCAEgEABIgDABIgEgCgAi4GhQgEgBgCgDIAAgBQgCgDABgEQABgEAEgCIA0gdQADgCAEABQAEABACAEIABAAQABAEgBADQgBAEgEACIg0AdIgEACIgDgBgABMFxIg1gdQgEgCgBgEQgBgEACgDIAAgBQACgDAEgBQAEgBADACIA1AdQAEACABAEQABAEgCADIAAAAQgCAEgEABIgDABIgEgCgAhPFnQgEgBgCgDIAAgBQgCgDABgEQABgEAEgCIA1gdQADgCAEABQAEABACAEIAAAAQACAEgBADQgBAEgEACIg1AdIgEACIgDgBgAklFhIgBgBQgFgBgCgDQgCgDABgEIAMg7QABgEADgDQADgCAEABIABAAQAEABACADQACADgBAFIgMA7QgBAEgDACQgDACgDAAIAAAAgAELFLQgDgCgBgEIgMg7QgBgFADgDQACgDAEgBIABAAQAEgBACACQAEADABAEIAMA7QABAEgDADQgCADgEABIgCABQgDAAgDgCgAkPDqIgBAAQgEgBgCgDQgCgDABgEIAMg7QABgEADgDQADgCAEABIABAAQAEABACADQACADgBAFIgMA7QgBAEgDACQgCABgDAAIgCAAgAD0DVQgDgDgBgEIgLg7QgBgEADgDQACgEAEAAIABAAQADgBAEACQADADABAEIALA7QABAEgDADQgCADgEABIAAAAIgCABQgDAAgDgCgAkVB7IgsgpQgDgDgBgEQAAgEADgDQADgDAEAAQAEgBADADIAsApQADADAAAEQABAEgDADIAAABQgDACgEABIgBAAQgDAAgDgDgAEQBvQgEgBgDgCQgDgEAAgEQAAgEADgDIArgpQADgDAEAAQAEAAADADIABABQACADAAADQAAAEgDADIgrAqQgDADgEAAIAAAAgAltApIgsgpQgDgCgBgEQAAgEADgDIABAAQACgDAEAAQAEgBADADIAsAoQADADABAEQAAAEgDADQgDADgEABIgBAAQgDAAgDgDgAFnAcQgEAAgCgCIgBgBQgDgDAAgEQAAgEADgDIAsgoQADgDAEAAQAEAAADADIABABQACADAAADQAAAEgDADIgsAoQgDADgEAAIAAAAgAnFgoIgsgpQgDgDAAgEQAAgEADgDQADgDAEAAQAEgBADADIArApQADADABAEQAAAEgDADIAAAAQgDADgEABIgBAAQgDAAgDgDgAG/g1QgEAAgDgDIAAAAQgDgDAAgEQAAgEADgDIAsgpIAAAAQADgDAEAAQAEAAADADQADADAAAEQAAAEgDADIgsApQgDADgEAAIAAAAgAnohpQgDgDgBgDIAAgBQAAgEACgDQADgDAEgBIA8gHQAEAAADACQAEADAAAEQAAAEgCADQgDAEgEAAIg8AHIgBAAQgDAAgDgCgAG6hqIg7gHQgEAAgDgEQgCgDAAgEQAAgEAEgDQADgCAEAAIA7AHQAEABADADQACADAAAEIAAABQgBADgDADQgDACgDAAIgBAAgAlwh3QgDgDgBgEIAAAAQAAgEACgDQADgDAEgBIA8gIQAEAAADACQADADABAEQABAEgDADQgDADgEABIg8AIIgBAAQgDAAgDgCgAFEh5Ig7gHQgEAAgDgEQgCgDAAgEIAAAAQAAgEAEgDQADgCAEAAIA7AHQAEABADADQACADAAAEIAAABQgBAEgDACQgDACgDAAIgBAAgAj4iGQgDgDgBgEIAAAAQAAgEACgDQADgDAEgBIA8gIQAEAAADACQADADABAEQABAEgDADQgDADgEABIg8AIIgBAAQgDAAgDgCgADOiIIg8gHQgEAAgCgEQgDgDABgEQAAgEACgCIABgBQAEgCAEAAIA7AHQAEABADADQACADAAAEIAAABQgBAEgDACQgDACgDAAIgBAAgAiUiuQgEgCgCgDQgBgEACgEIAZg2QACgEAEgBQAEgCAEACQAEACABAEQABADgCAEIgZA2QgCAEgDACIgEAAIgEgBgAB0jDQgEgCgBgEIgag2QgCgDABgEQABgEAEgCIAAAAQAEgCAEACQAEABACAEIAaA2QABADgBAEQgBAEgEACIgBAAIgDABIgEAAgAhgkaIgBAAQgDgCgCgDQgBgEABgEIAag3QABgDAEgCQAEgBADACIABAAQADABACAEQABAEgBAEIgaA2QgBAEgEABIgDABIgEgBgABBkwQgEgBgCgEIgag2QgBgEABgEQABgEAEgBIABgBQADgBAEABQAEACABADIAbA2QABAEgBAEQgBAEgEACIgBAAIgEABIgDgBgAgumGIAAgBQgDgCgCgDQgBgEACgEIAYg3QACgDAEgCQAEgBAEACIAAAAIAAAAIAAgBIgDgHQgCgEABgEQABgEAEgBQAEgCAEABQADACACADIAYA2QACAEgBAEQgBAEgEACIAAAAQgEABgEgBQgEgBgCgEIgPgjIgBACIgYA3QgCADgEACIgDAAIgFAAg");
	this.shape.setTransform(0.8,-0.3553);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.2)").s().p("AE6HXQABgDgBgEQgBgEgEgCIg0gdQgEgCgEACQgDABgCADIgjgTQACgEgBgEQgCgEgDgCIg1gdQgEgCgEACQgDABgCADIgjgTQACgEgBgEQgCgEgDgCIg1gdQgEgCgEACQgDABgCADIgbgPIgHAFIAAgBQgCgDgEgBQgEgCgEACIg1AdQgDACgBAEQgCAEACAEIABAAIgkAUIAAgBQgCgDgEgBQgEgCgEACIg0AdQgDACgBAEQgCAEACAEIABAAIgkAUIAAgBQgCgDgEgBQgEgCgEACIg0AdQgDACgBAEQgCAEACAEIABAAIgYANIADgNQAEABADgDQADgCABgEIALg7QABgEgDgEQgCgDgDAAIAHgoQAEAAADgCQADgCABgEIAMg7QABgEgDgDQgCgEgEgBIAIgnQADAAAEgCQADgCABgEIAMg7QABgEgDgDQgCgEgEgBIAAAAIAEgWIgMgLIAAAAQADgDAAgEQAAgEgDgDIgsgpQgDgDgEAAQgEAAgDADIgegbQADgDAAgEQAAgEgDgDIgsgoQgDgDgEAAQgEAAgDADIgdgbQACgDAAgEQAAgEgDgDIgsgpQgDgDgEAAQgEAAgDADIgOgNIAUgDQAAAEADACQAEADAEAAIA8gHQAEgBACgDQADgDAAgFIAogFIAAABQAAAEAEADQADACAEAAIA8gIQAEgBADgDQACgEAAgEIAogFIAAABQAAAEAEADQADACAEAAIA8gIQAEgBADgDQACgEAAgEIAOgBIAJgVQAEABAEgBQAEgBACgEIAZg2QACgEgBgEQgCgEgEgBIARglIABABQAEABAEgBQADgBACgEIAZg3QACgDgCgEQgBgEgEgCIARgkIABAAQAEACAEgCQADgBACgEIAYg3IABgCIAQAjQACAEAEACQAEABADgCIABAAIAQAkIAAAAQgEACgBAEQgCAEACADIAaA2QACAEAEACQAEABADgCIARAkIAAABQgEABgBAEQgCAEACAEIAaA2QACAEAEABQAEABADgBIARAkQgCACgBADQAAAFACADQADADAEABIA7AHQAFAAADgDQADgCAAgDIAoAFQgBAEADADQACADAEABIA7AHQAFAAADgDQADgCABgDIAnAEQgBAFADADQACADAEABIA7AHQAFAAADgDQADgCABgEIAeAEIgrAoQgDADAAAEQAAAEACADIABABIgeAbIAAAAQgDgDgEAAQgEAAgDACIgsAoQgDADAAAEQAAAEACADIABABIgdAcIgBgBQgDgDgEAAQgEAAgDACIgrAqQgDADAAAEQAAAEACADIgbAaIAAACIAAAAQgEABgDADQgCAEABAEIALA7QABAEADACQADADAEgBIABAAIAIAnIgBAAQgEABgDAEQgCADABAEIAMA7QABAEADACQAEADAEgBIAHAnIAAAAQgEABgDAEQgCADABAEIAMA7QABAEADACQADADAEgBIAHAhgAABnZIABAAIAAABIgBgBg");
	this.shape_1.setTransform(-0.6625,0.5875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.StarSlot, new cjs.Rectangle(-49.3,-49,100.19999999999999,97.3), null);


(lib.Star = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// highlight
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(3,1,1).p("AABnfICXFCIFhAsIkEDzIBDFeIk3isIk4CsIBDleIkEjzIFigsg");
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(2));

	// icon
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#933BD9").ss(2,1,1).p("AABnfICXFCIFhAsIkEDzIBDFeIk3isIk4CsIBDleIkEjzIFigsg");

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#933BD9").s().p("AABE0Ik3CsIBCleIkEjyIFigtICXlCICWFCIFiAtIkEDyIBDFeg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(3));

	// shadow
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.149)").s().p("AAAE0Ik2CsIBCleIkEjzIFigsICWlCICXFCIFiAsIkEDzIBDFeg");
	this.shape_3.setTransform(-10,10);
	this.shape_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1).to({_off:false},0).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-60.5,-49.5,112.5,107.5);


(lib.SquareSlot = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.498)").s().p("AGkHqQgEAAgDgDQgDgDAAgEQAAgEADgDQADgDAEAAIA8AAQAEAAADADQADADAAAEQAAAEgDADQgDADgEAAgAEsHqQgEAAgDgDQgDgDAAgEQAAgEADgDQADgDAEAAIA8AAQAEAAADADQADADAAAEQAAAEgDADQgDADgEAAgAC0HqQgEAAgDgDQgDgDAAgEQAAgEADgDQADgDAEAAIA8AAQAEAAADADQADADAAAEQAAAEgDADQgDADgEAAgAA8HqQgEAAgDgDQgDgDAAgEQAAgEADgDQADgDAEAAIA8AAQAEAAADADQADADAAAEQAAAEgDADQgDADgEAAgAg7HqQgEAAgDgDQgDgDAAgEQAAgEADgDQADgDAEAAIA7AAQAEAAADADQADADAAAEQAAAEgDADQgDADgEAAgAizHqQgEAAgDgDQgDgDAAgEQAAgEADgDQADgDAEAAIA8AAQAEAAADADQADADAAAEQAAAEgDADQgDADgEAAgAkrHqQgEAAgDgDQgDgDAAgEQAAgEADgDQADgDAEAAIA8AAQAEAAADADQADADAAAEQAAAEgDADQgDADgEAAgAmjHqQgEAAgDgDQgDgDAAgEQAAgEADgDQADgDAEAAIA8AAQAEAAADADQADADAAAEQAAAEgDADQgDADgEAAgAnmHnQgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgAHZGrQgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgAnmFvQgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgAHZEzQgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgAnmD3QgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgAHZC7QgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgAnmB/QgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgAHZBDQgDgDAAgEIAAg8QAAgDADgDQADgDAEAAQAEAAADADQADADAAADIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgAnmAHQgDgDAAgEIAAg7QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA7QAAAEgDADQgDADgEAAQgEAAgDgDgAHZg0QgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgAnmhwQgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgAHZisQgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgAnmjoQgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgAHZkkQgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgAnmlgQgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgAHZmcQgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgAFonVQgEAAgDgDQgDgDAAgEQAAgEADgDQADgDAEAAIA8AAQAEAAADADQADADAAAEQAAAEgDADQgDADgEAAgADwnVQgEAAgDgDQgDgDAAgEQAAgEADgDQADgDAEAAIA8AAQAEAAADADQADADAAAEQAAAEgDADQgDADgEAAgAB4nVQgEAAgDgDQgDgDAAgEQAAgEADgDQADgDAEAAIA8AAQAEAAADADQADADAAAEQAAAEgDADQgDADgEAAgAAAnVQgDAAgDgDQgDgDAAgEQAAgEADgDQADgDADAAIA8AAQAEAAADADQADADAAAEQAAAEgDADQgDADgEAAgAh3nVQgEAAgDgDQgDgDAAgEQAAgEADgDQADgDAEAAIA8AAQAEAAADADQADADAAAEQAAAEgDADQgDADgEAAgAjvnVQgEAAgDgDQgDgDAAgEQAAgEADgDQADgDAEAAIA8AAQAEAAADADQADADAAAEQAAAEgDADQgDADgEAAgAlnnVQgEAAgDgDQgDgDAAgEQAAgEADgDQADgDAEAAIA8AAQAEAAADADQADADAAAEQAAAEgDADQgDADgEAAgAnfnVQgEAAgDgDQgDgDAAgEQAAgEADgDQADgDAEAAIA8AAQAEAAADADQADADAAAEQAAAEgDADQgDADgEAAg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.2)").s().p("AFyHgQAAgEgDgDQgDgDgEAAIg8AAQgEAAgDADQgDADAAAEIgoAAQAAgEgDgDQgDgDgEAAIg8AAQgEAAgDADQgDADAAAEIgoAAQAAgEgDgDQgDgDgEAAIg8AAQgEAAgDADQgDADAAAEIgoAAQAAgEgDgDQgDgDgEAAIg7AAQgEAAgDADQgDADAAAEIgoAAQAAgEgDgDQgDgDgEAAIg8AAQgEAAgDADQgDADAAAEIgoAAQAAgEgDgDQgDgDgEAAIg8AAQgEAAgDADQgDADAAAEIgoAAQAAgEgDgDQgDgDgEAAIg8AAQgEAAgDADQgDADAAAEIgoAAIAAg8QAAgEgDgDQgDgDgEAAIAAgoQAEAAADgDQADgDAAgEIAAg8QAAgEgDgDQgDgDgEAAIAAgoQAEAAADgDQADgDAAgEIAAg8QAAgEgDgDQgDgDgEAAIAAgoQAEAAADgDQADgDAAgEIAAg8QAAgEgDgDQgDgDgEAAIAAgoQAEAAADgDQADgDAAgEIAAg7QAAgEgDgDQgDgDgEAAIAAgoQAEAAADgDQADgDAAgEIAAg8QAAgEgDgDQgDgDgEAAIAAgoQAEAAADgDQADgDAAgEIAAg8QAAgEgDgDQgDgDgEAAIAAgoQAEAAADgDQADgDAAgEIAAg8QAAgEgDgDQgDgDgEAAIAAgoIA8AAQAEAAADgDQADgDAAgEIAoAAQAAAEADADQADADAEAAIA8AAQAEAAADgDQADgDAAgEIAoAAQAAAEADADQADADAEAAIA8AAQAEAAADgDQADgDAAgEIAoAAQAAAEADADQADADAEAAIA8AAQAEAAADgDQADgDAAgEIAoAAQAAAEADADQADADADAAIA8AAQAEAAADgDQADgDAAgEIAoAAQAAAEADADQADADAEAAIA8AAQAEAAADgDQADgDAAgEIAoAAQAAAEADADQADADAEAAIA8AAQAEAAADgDQADgDAAgEIAoAAQAAAEADADQADADAEAAIA8AAQAEAAADgDQADgDAAgEIAoAAIAAA8QAAAEADADQADADAEAAIAAAoQgEAAgDADQgDADAAAEIAAA8QAAAEADADQADADAEAAIAAAoQgEAAgDADQgDADAAAEIAAA8QAAAEADADQADADAEAAIAAAoQgEAAgDADQgDADAAAEIAAA8QAAAEADADQADADAEAAIAAAoQgEAAgDADQgDADAAADIAAA8QAAAEADADQADADAEAAIAAAoQgEAAgDADQgDADAAAEIAAA8QAAAEADADQADADAEAAIAAAoQgEAAgDADQgDADAAAEIAAA8QAAAEADADQADADAEAAIAAAoQgEAAgDADQgDADAAAEIAAA8QAAAEADADQADADAEAAIAAAoIg8AAQgEAAgDADQgDADAAAEg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.SquareSlot, new cjs.Rectangle(-49,-49,98,98), null);


(lib.Square = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// highlight
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("AnfnfIO/AAIAAO/Iu/AAg");
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(2));

	// icon
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#933BD9").ss(2,1,1).p("AnfnfIO/AAIAAO/Iu/AAg");

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#933BD9").s().p("AnfHgIAAu/IO/AAIAAO/g");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(3));

	// shadow
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.149)").s().p("AnfHgIAAu/IO/AAIAAO/g");
	this.shape_3.setTransform(-10,10);
	this.shape_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1).to({_off:false},0).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-58,-49,107,107);


(lib.RoundedSquareSlot = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.498)").s().p("ABlHqQgEAAgDgDQgDgDAAgEQAAgEADgDQADgDAEAAIA8AAQAEAAADADQADADAAAEQAAAEgDADQgDADgEAAgAgSHqQgEAAgDgDQgDgDAAgEQAAgEADgDQADgDAEAAIA7AAQAEAAADADQADADAAAEQAAAEgDADQgDADgEAAgAiKHqQgEAAgDgDQgDgDAAgEQAAgEADgDQADgDAEAAIA8AAQAEAAADADQADADAAAEQAAAEgDADQgDADgEAAgAjGHpQgggBgegIQgDgBgCgDQgDgEABgEIAAAAQACgEADgCQAEgCADABQAcAHAeABQAEABADADQADADgBAEQAAAEgDADQgDADgDAAIgBgBgADYHmQgDgDgBgEIAAgBQAAgDACgEQADgDAEgBQAegDAbgJQAEgCADACQAEACABADIABABQABAEgCADQgCAEgEACQgdAJgfAEIgCABQgDAAgDgCgAk+HKQgagOgZgTQgEgDAAgEQAAgEACgDQADgEAEAAQAEAAADACQAXATAZANQAEACABAEQACADgCADIAAABQgCAEgEABIgDABIgFgCgAFMHAQgEgBgCgEIAAAAQgCgDABgEQABgEADgCQAYgPAWgVQADgDAEABQAEAAADADQADADAAAEQAAAEgDADQgXAVgaARQgDABgCAAIgDAAgAmXGCQgEgBgDgDQgVgYgPgZQgCgEABgEQABgEAEgCIAAAAQAEgCADABQAFABACAEQAOAYATAWQADADgBAEQAAAEgDADIAAAAQgDADgEAAIAAAAgAGiFsIgBAAQgDgDgBgDQAAgFACgDQASgYALgaQACgDAEgCQAEgBADABIABABQADABACAEQABAEgBADQgNAdgTAZQgCADgEABIgBAAQgEAAgCgCgAnWEaQgDgCgCgEQgJgegEggQAAgEADgDQACgEAEAAIABAAQAEAAADACQADADAAAEQADAeAKAcQABAEgCAEQgCADgEABIAAAAIgDABIgFgBgAHWECQgEgBgCgDQgCgEABgEQAGgbABgeQAAgEADgDQADgDAEAAIAAAAQAEAAADADQADADAAAEQgBAggHAeQgBAEgDACQgDACgCAAIgDgBgAnmCgQgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgAHZCIQgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgAnmAoQgDgDAAgEIAAg7QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA7QAAAEgDADQgDADgEAAQgEAAgDgDgAHZAQQgDgDAAgEIAAg7QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA7QAAAEgDADQgDADgEAAQgEAAgDgDgAnmhPQgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgAHZhnQgDgDAAgEIAAg8QAAgEADgDQADgDAEAAQAEAAADADQADADAAAEIAAA8QAAAEgDADQgDADgEAAQgEAAgDgDgAnfjEIAAAAQgEAAgDgDQgCgDAAgEQADggAIgdQABgEAEgCQADgCAEACQAEABACADQACAEgBAEQgIAbgCAdQAAAEgEADQgCADgEAAIgBgBgAHWjfQgDgCgBgEQgFgdgKgbQgBgDABgEQACgEAEgBIAAAAQAEgCADACQAEACACAEQALAcAFAfQAAAEgCADQgCAEgEAAIgBAAIgBAAQgDAAgDgCgAnCk2QgDgCgBgEQgCgEACgEQAPgaAUgZQACgDAEAAQAFAAADACQADADABAEQAAAEgDAEQgTAWgNAZQgCADgEACIgDAAIgFgBgAGulMQgEgBgCgDQgPgYgVgVQgDgDAAgEQAAgEADgDIAAAAQADgDAEAAQAEAAADADQAWAXARAZQACADgBAEQgBAFgDACQgDABgCAAIgDAAgAlxmSQgEAAgDgDIAAgBQgCgDAAgEQAAgEAEgDQAYgUAagOQAEgCAEABQAEACACADQACAEgBAEQgCAEgDACQgZANgXATQgCACgEAAIgBAAgAFZmiQgYgRgcgMQgDgBgCgEQgBgEABgEIAAAAQACgEAEgBQAEgCAEACQAcAMAaATQAEACAAAEQABAEgDAEQgCADgEABIgCAAQgDAAgCgCgAkNnLQgDgCgBgEIAAAAQgBgEACgEQACgEAEgBQAegIAggCQAEAAADACQAEADAAAEIAAABQAAADgDAEQgCADgEAAQgfACgcAIIgCAAIgGgBgADunQQgcgFgeAAQgEAAgDgDQgDgDAAgEQAAgEADgDQADgDAEAAQAgAAAeAGQAEAAACAEQADADgBAEIAAABQgBADgDADQgDABgDAAIgCAAgAA8nVQgEAAgDgDQgDgDAAgEQAAgEADgDQADgDAEAAIA8AAQAEAAADADQADADAAAEQAAAEgDADQgDADgEAAgAg7nVQgEAAgDgDQgDgDAAgEQAAgEADgDQADgDAEAAIA7AAQAEAAADADQADADAAAEQAAAEgDADQgDADgEAAgAiznVQgEAAgDgDQgDgDAAgEIAAAAQAAgEADgDQADgDAEAAIA8AAQAEAAADADQADADAAAEQAAAEgDADQgDADgEAAg");
	this.shape.setTransform(0.0002,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.2)").s().p("ACrHgQAAgEgDgDQgDgDgEAAIg8AAQgEAAgDADQgDADAAAEIgoAAQAAgEgDgDQgDgDgEAAIg7AAQgEAAgDADQgDADAAAEIgoAAQAAgEgDgDQgDgDgEAAIg8AAQgEAAgDADQgDADAAAEIgfAAIgJAAQABgEgDgDQgDgDgEgBQgegBgbgHQgEgBgEACQgDACgCAEQgTgGgSgJQACgDgCgDQgBgEgDgCQgagNgXgTQgDgCgEAAQgEAAgDAEIgUgTIgJgJQADgDAAgEQABgEgDgDQgTgWgOgYQgCgEgFgBQgDgBgEACQgJgSgHgTQAEgBACgDQACgEgBgEQgKgcgDgeQAAgEgDgDQgDgCgEAAIgBgXIAAgRQAEAAADgDQADgDAAgEIAAg8QAAgEgDgDQgDgDgEAAIAAgoQAEAAADgDQADgDAAgEIAAg7QAAgEgDgDQgDgDgEAAIAAgoQAEAAADgDQADgDAAgEIAAg8QAAgEgDgDQgDgDgEAAIAAgXIAAgRQAEABAEgDQADgDAAgEQACgdAIgbQABgEgCgEQgCgDgEgBQAGgTAJgSQAEACAEgBQAEgCACgDQANgZATgWQADgEAAgEQgBgEgDgDIAOgPIAPgOQADADAEAAQAEAAADgCQAXgTAZgNQADgCACgEQABgEgCgEQASgJATgGQABAEADACQAEACAEgBQAcgIAfgCQAEAAACgDQADgEAAgDIAEgBQAAAEADADQADADAEAAIA8AAQAEAAADgDQADgDAAgEIAoAAQAAAEADADQADADAEAAIA7AAQAEAAADgDQADgDAAgEIAoAAQAAAEADADQADADAEAAIA8AAQAEAAADgDQADgDAAgEIAoAAQAAAEADADQADADAEAAQAeAAAcAFQAEABAEgCQADgDABgDQAUAEASAHQgBAEABAEQACAEAEABQAbAMAYARQADACAEAAQAEgBACgDQAQALAOAOQgDADAAAEQAAAEADADQAVAVAPAYQACADAEABQAFABADgCQALARAIATQgEABgCAEQgBAEABADQAKAbAFAdQABAEADACQAEADADgBQADAUAAAVQgEAAgDADQgDADAAAEIAAA8QAAAEADADQADADAEAAIAAAoQgEAAgDADQgDADAAAEIAAA7QAAAEADADQADADAEAAIAAAoQgEAAgDADQgDADAAAEIAAA8QAAAEADADQADADAEAAIAAAoQgEAAgDADQgDADAAAEQgBAegGAbQgBAEACAEQACADAEABQgFATgHATIgBgBQgDgBgEABQgEACgCADQgLAagSAYQgCADAAAFQABADADADQgLAOgOAOIgDADQgDgDgEAAQgEgBgDADQgWAVgYAPQgDACgBAEQgBAEACADQgRAKgTAHQgBgDgEgCQgDgCgEACQgbAJgeADQgEABgDADQgCAEABADQgQACgRAAg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.RoundedSquareSlot, new cjs.Rectangle(-49,-49,98,98), null);


(lib.RoundedSquare = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// highlight
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(3,1,1).p("AiznfIFnAAQB8AABYBYQBYBYAAB8IAAFnQAAB8hYBYQhYBYh8AAIlnAAQh8AAhYhYQhYhYAAh8IAAlnQAAh8BYhYQBYhYB8AAg");
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(2));

	// icon
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#933BD9").ss(2,1,1).p("AiznfIFnAAQB8AABYBYQBYBYAAB8IAAFnQAAB8hYBYQhYBYh8AAIlnAAQh8AAhYhYQhYhYAAh8IAAlnQAAh8BYhYQBYhYB8AAg");

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#933BD9").s().p("AizHgQh8AAhYhYQhYhYAAh8IAAlnQAAh8BYhYQBYhYB8AAIFnAAQB8AABYBYQBYBYAAB8IAAFnQAAB8hYBYQhYBYh8AAg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(3));

	// shadow
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.149)").s().p("AizHgQh8AAhYhYQhYhYAAh8IAAlnQAAh8BYhYQBYhYB8AAIFnAAQB8AABYBYQBYBYAAB8IAAFnQAAB8hYBYQhYBYh8AAg");
	this.shape_3.setTransform(-10,10);
	this.shape_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1).to({_off:false},0).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-58,-49.5,107.5,107.5);


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


(lib.CircleSlot = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.498)").s().p("AgTHqQgEgBgDgDQgCgDAAgEIAAAAQAAgEADgDQADgDAEABIASAAIAmgBQAEgBADADQADADABAEQAAAEgDADQgCADgEABQgUABgUAAIAAAAIgTAAgAhPHkQgegFgdgIQgEgBgCgEQgCgDABgEQABgEADgCQAEgCAEABQAcAIAdAEQAEABACADQADADgBAEQAAAFgEACQgDACgDAAIgBAAgABdHfQgEgCAAgEIAAAAQgBgEACgEQACgDAEgBQAdgGAbgJQAEgBAEACQAEABABAEIAAAAQACAEgCAEQgCAEgEABQgdAKgeAGIgCAAQgDAAgCgCgAjEHCQgcgMgbgQQgDgCgBgEQgBgEACgEIABAAQACgDAEgBQADgBAEACQAZAPAbAMQAEABABAEQACAEgCAEQgCAEgEABIgDABIgEgBgADQG6QgEgBgCgEIAAAAQgCgEACgEQABgEAEgBQAagNAYgRQAEgCAEABQAEABACADIAAAAQACADAAAEQgBAEgEADQgZARgbAOIgFABIgDgBgAktGDQgWgTgWgVQgDgDAAgEQAAgEADgDQADgDAEAAQAEAAADADQAVAVAWARQADADAAAEQABAEgDADIAAAAQgDAEgEAAIgBAAQgDAAgDgCgAE2F4QgFAAgCgDQgDgEAAgEQABgEADgDIAcgaIAAgBIAKgJQADgDAEAAQAEgBAEADQADADAAAEQAAAEgDADIgLAMIAAgBIgdAcQgDACgEAAIAAAAgAl7ExQgEAAgDgDQgSgYgQgaQgCgDAAgEQABgEAEgCQAEgDAEABQAEABACAEQAPAYASAXQADAEgBAEQAAAEgDACQgDADgEAAIgBgBgAF/EiIAAgBQgDgCgBgEQAAgEACgDQASgYAOgaQACgDAEgBQAEgCAEACQADACABAEQABAEgBAEQgPAagTAZQgCAEgEABIgCAAQgDAAgDgCgAm7DMQgEgCgBgDQgNgcgJgeQgBgEACgEQACgDAEgBQAEgCAEACQADACABAEQAJAcAMAbQABAEgBAEQgBAEgEACIAAAAIgEAAIgEAAgAG8C6QgEgCgBgDQgCgEACgEQAKgcAHgcQABgEADgCQAEgDAEABIAAAAQAEABACAEQACADAAAEQgIAfgLAcQgBAEgEACIgEABIgEgBgAnfBXQgEgCAAgEQgFgegBgeQAAgEADgDQADgDAEAAIAAAAQAEgBADADQADADAAAEQABAeAFAcQAAAEgCAEQgDADgEAAIgBABQgDAAgDgDgAHbBFIAAAAQgEAAgDgDQgCgEAAgEQAEgcAAgeIAAAAIgBgVQAAgFADgDQADgDAEAAQAEAAADADQADACAAAFIABAWIAAAAQAAAfgEAeQAAAEgDACQgDADgEAAIgBgBgAnegfIAAAAQgFAAgDgDQgCgEAAgEQADgeAGgeQABgEADgCQAEgDAEABQAEABACAEQACADAAAEQgGAcgDAeQAAAEgDADQgDACgDAAIgBAAgAHThKQgDgCAAgFQgFgegJgcQgBgEABgEQACgDAEgBQAEgCAEACQAEACABAEQAJAeAFAgQABADgDAEQgCADgEABIgCAAQgDAAgDgCgAnJiUQgEgBgCgEQgCgEACgEQAJgdAOgcQACgDAEgBQAEgCAEACIAAAAQADACACAEQABAEgCADQgNAbgJAcQgCAEgDACIgFABIgDgBgAGyi9QgEgBgBgEQgNgbgPgZQgCgDABgEQAAgEAEgCIAAgBQAEgCAEABQAEABACAEQAQAaANAbQACAEgCAEQgBAEgEABIgEACIgEgBgAmWkAQgDgCgBgFQgBgEADgDQAQgaAVgXQADgEAEAAQAEAAADADIABAAQACACABAEQAAAEgDADQgUAYgQAYQgCADgEABIgCAAQgDAAgDgBgAF1kiQgEgBgDgDQgQgUgSgSIgGgGQgDgDAAgEQAAgEADgDIAAAAQADgDAEAAQAEAAADADIAGAGQATATARAUQACADAAAFQgBADgDADIAAAAQgDADgDAAIgBAAgAlBlaQgEgBgDgCIAAgBQgDgDAAgEQAAgEAEgDQAWgVAZgRQADgDAFABQAEABACADIAAABQACADAAAEQgBAEgEACQgXARgWAUQgDADgEAAIAAAAgAEbl3QgYgTgZgOQgEgDgBgEQgBgDACgEIAAAAQACgEAEgBQAEgBAEADQAaAPAZATQADACABAEQAAAEgCADIgBABQgCADgEABIgBAAQgEAAgCgCgAjimgQgEgBgCgDIAAgBQgCgDABgEQABgEAEgCQAbgPAdgKQAEgCADACQAEACABAEIAAAAQACADgCAEQgBAEgEABQgcALgZANIgFABIgDAAgAC0mzQgagLgdgHQgEgBgCgEQgCgEABgDQABgEAEgCQADgDAEABQAeAIAcAMQAEABACAEQABAEgBAEIAAAAQgCAEgEABIgEABIgEgBgAh1nLQgEgCAAgDIAAgBQgBgEACgDQACgEAEgBQAegGAggEQAEAAADADQAEACAAAEQABAFgDADQgDADgEABQgfACgcAHIgDAAQgDAAgCgCgABDnQQgdgEgegBQgEAAgDgDQgBgDAAgEIAAAAQAAgEACgDQADgDAEAAQAfAAAeAFQAEAAACAEQADADgBAEQAAAEgEADQgCACgEAAIgBAAg");
	this.shape.setTransform(0.0248,-0.0002);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.2)").s().p("AhDHcQABgEgDgEQgCgDgFgBQgcgEgcgIQgEgBgEACQgDACgBAEQgUgGgSgIQABgDgBgEQgCgEgEgCQgagMgZgPQgEgCgEABQgEABgCADQgRgKgQgNQACgDAAgEQAAgEgEgCQgVgSgVgVQgDgDgEAAQgEAAgDADIgbgdQAEgDAAgEQAAgEgCgDQgSgXgQgZQgCgDgEgBQgEgBgDACQgKgRgJgSIABAAQADgCACgEQABgEgCgDQgMgbgIgcQgBgEgEgCQgDgCgEABQgFgTgEgUQAEgBACgDQADgEgBgEQgEgcgBgdQAAgFgDgCQgDgDgEAAIAAAAIAAgLIABgfQADABAEgDQADgDAAgEQACgdAGgdQABgEgCgDQgCgEgFAAQAFgUAGgTQAEACADgCQAEgCACgEQAJgcANgaQACgEgCgEQgBgEgDgBQAJgSALgRQADACAFAAQAEgBACgEQAQgYAUgXQADgDAAgEQgBgEgDgDIASgTIALgKQADADADAAQAFAAADgDQAWgUAXgQQAEgDAAgEQABgEgCgDQARgLARgKQACADAEABQAEACADgCQAagOAcgKQADgCACgEQACgDgCgEQATgGATgFQABAEAEACQADACAEgBQAdgGAfgDQAEgBADgDQACgDAAgEIAogCQAAAEACADQADADAEAAQAeABAdAEQAEAAADgCQADgDABgEQAUADAUAFQgBAEACADQACAEAEABQAcAHAbAMQAEABAEgBQADgCACgEQATAJASAKQgCADABAEQABAEADACQAZAPAYASQAEACAEAAQAEgBACgDIAeAaQgDACAAAEQAAAEADADIAGAGQASATAQATQACADAEABQAFAAADgCIAAgBQANARALARIAAAAQgEACgBAEQgBAEADAEQAPAZANAaQABAEAEABQAEACAEgCQAIATAGATQgEABgCAEQgCADACAEQAIAdAFAeQABAEADACQAEADAEgBQACAUABAUQgEABgCADQgDADAAAEIAAAVIAAABQAAAdgDAdQAAAEACADQADADAEABIAAAAQgDAUgEAUIAAAAQgEgBgEACQgDACgBAEQgHAdgLAbQgBAEABAEQACAEAEABQgIATgKASQgDgCgEABQgEABgCAEQgOAZgSAYQgDADABAEQABAEADADQgNAQgOAPQgDgCgEAAQgEAAgDADIgKAKIAAAAIgcAbQgEADAAAEQAAAEADADQgQANgQALQgDgDgEgBQgEgBgDADQgZAQgaANQgDACgCAEQgBADACAEQgSAJgTAGQgBgDgEgCQgEgCgEABQgbAKgdAGQgEAAgCAEQgCADAAAEQgTADgVACQAAgEgDgDQgDgCgEAAIgmABIgSAAQgEAAgDACQgDADAAAEIAAABQgVgBgTgDg");
	this.shape_1.setTransform(-0.05,-0.0375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CircleSlot, new cjs.Rectangle(-48.9,-49,97.9,98), null);


(lib.Circle = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// highlight
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(3,1,1).p("AHgAAQAADHiMCMQiNCNjHAAQjGAAiNiNQiMiMAAjHQAAjGCMiNQCNiMDGAAQDHAACNCMQCMCNAADGg");
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(2));

	// icon
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#933BD9").ss(2,1,1).p("AHgAAQAADHiMCMQiNCNjHAAQjGAAiNiNQiMiMAAjHQAAjGCMiNQCNiMDGAAQDHAACNCMQCMCNAADGg");

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#933BD9").s().p("AlSFTQiNiNAAjGQAAjGCNiNQCMiMDGAAQDHAACMCMQCNCNAADGQAADGiNCNQiMCNjHAAQjGAAiMiNg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(3));

	// shadow
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.149)").s().p("AlSFTQiNiNAAjGQAAjGCNiNQCMiMDGAAQDHAACMCMQCNCNAADGQAADGiNCNQiMCNjHAAQjGAAiMiNg");
	this.shape_3.setTransform(-10,10);
	this.shape_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1).to({_off:false},0).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-58,-49.5,107.5,107.5);


(lib.drop7G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AARAzIAAguQAAgHgEgDQgEgDgIAAQgLAAgGAIIAAAzIgUAAIAAhlIAUAAIAAAmQAKgJAOAAQAdAAAAAZIAAAvg");
	this.shape.setTransform(116.275,75.675);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgKAyIAAhHIAUAAIAABHgAgHgiQgEgDAAgDQAAgEAEgCQADgDAEAAQAFAAADADQAEACAAAEQAAADgEADQgDACgFAAQgEAAgDgCg");
	this.shape_1.setTransform(109.35,75.825);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgSAiQgJgDgFgGQgEgFAAgHIATAAQABAGAFADQAFADAHAAQAIAAAEgCQAEgDAAgEQAAgEgEgCQgFgCgJgCIgRgFQgPgFAAgKQAAgKAJgGQAKgHAOAAQARABAKAGQAJAGAAALIgUAAQAAgFgEgDQgEgDgIgBQgFAAgEADQgFACAAAEQAAAFAEABQAEACALADQAMACAHACQAHADADAEQADAEAAAFQAAAKgKAHQgKAFgQAAQgKAAgJgDg");
	this.shape_2.setTransform(102.725,77.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgXAlIAAhHIATAAIABAIQAGgKAOAAIAGABIAAAPIgHAAQgOAAgFAIIAAAxg");
	this.shape_3.setTransform(95.7,77.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgbAbQgMgJAAgRIAAgBQAAgKAFgJQAGgIAJgFQAJgEALgBQASAAALAKQAKAJAAARIAAAGIg6AAQABAJAGAFQAHAFAJABQANAAAJgKIALAJQgFAGgJAEQgJADgMAAQgSAAgMgKgAgLgTQgGAFgBAIIAmAAIAAgBQgBgIgFgEQgFgEgIAAQgHgBgFAFg");
	this.shape_4.setTransform(87.825,77.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgTArIgBAIIgSAAIAAhmIATAAIAAAlQAKgIANAAQAQAAAKAKQAKAJAAARIAAABQAAARgKAKQgJAKgQAAQgPAAgJgJgAgTAAIAAAdQAGAKANgBQAJABAFgGQAFgFAAgMIAAgCQABgMgGgFQgFgGgJAAQgNAAgGAJg");
	this.shape_5.setTransform(78.55,75.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgJAyIAAhHIATAAIAABHgAgIgiQgCgDAAgDQAAgEACgCQADgDAFAAQAGAAACADQADACAAAEQAAADgDADQgCACgGAAQgFAAgDgCg");
	this.shape_6.setTransform(67.1,75.825);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgcAqQgKgKAAgSQAAgQAKgKQAJgKAQAAQAOAAAIAIIAAglIAUAAIAABmIgSAAIgBgIQgJAJgOAAQgQAAgJgKgAgNgCQgFAEAAANQAAALAFAHQAFAFAJAAQANAAAFgJIAAgdQgFgJgNAAQgJAAgFAHg");
	this.shape_7.setTransform(59.9,75.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgdAfQgJgGAAgJQAAgMALgFQALgGATAAIAMAAIAAgFQAAgFgEgEQgEgDgHAAQgHAAgEADQgFACAAAFIgUAAQAAgGAFgGQAFgEAJgEQAIgDAJAAQAQABAKAGQAJAGAAAMIAAAfQAAAKAEAGIAAABIgVAAIgCgGQgKAHgNAAQgOABgIgHgAgMAFQgFAEAAAFQAAAFADADQAEACAHABQAFgBAFgCQAFgDADgEIAAgNIgLAAQgKAAgGADg");
	this.shape_8.setTransform(50.675,77.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgSA/IAAgNIAHABQAKAAABgJIAAhOIATAAIAABOQAAALgIAGQgGAFgMAAIgLgBgAAAgxQgCgCgBgEQABgDACgDQADgCAFAAQAFAAAEACQADADAAADQAAAEgDACQgEADgFAAQgFAAgDgDg");
	this.shape_9.setTransform(43.05,77.275);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AARAlIAAguQAAgHgDgDQgEgEgJAAQgLAAgGAJIAAAzIgUAAIAAhHIATAAIABAIQAKgKAPAAQAcAAAAAaIAAAvg");
	this.shape_10.setTransform(36.975,77.125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgbAbQgMgJAAgRIAAgBQAAgKAFgJQAGgIAJgFQAJgEALgBQASAAALAKQAKAJAAARIAAAGIg6AAQABAJAGAFQAHAFAJABQANAAAJgKIALAJQgFAGgJAEQgJADgMAAQgSAAgMgKgAgLgTQgGAFgBAIIAmAAIAAgBQgBgIgFgEQgFgEgIAAQgHgBgFAFg");
	this.shape_11.setTransform(27.775,77.2);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AAsAlIAAguQAAgHgEgDQgEgEgJAAQgGAAgFADQgEADgCAFIAAAxIgTAAIAAgvQgBgNgPAAQgNAAgFAIIAAA0IgUAAIAAhHIATAAIABAHQAJgJARAAQARAAAHALQAJgLASAAQAPAAAHAHQAIAGAAANIAAAvg");
	this.shape_12.setTransform(15.675,77.125);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgKAZIAAgoIgPAAIAAgMIAPAAIAAgSIAUAAIAAASIAPAAIAAAMIgPAAIAAAnQAAAEACACQACACAFAAIAHgBIAAANIgNACQgXAAAAgVg");
	this.shape_13.setTransform(241.325,56.925);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgdAeQgHgHAAgNIAAguIAUAAIAAAuQAAANAOAAQAOAAAFgIIAAgzIAUAAIAABHIgTAAIAAgHQgJAJgQAAQgOAAgIgHg");
	this.shape_14.setTransform(233.925,57.825);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgdAfQgJgGAAgJQAAgMALgFQALgGATAAIAMAAIAAgFQAAgGgEgDQgEgDgHAAQgHAAgEADQgFADAAADIgUAAQAAgFAFgGQAFgEAJgEQAIgDAJAAQAQABAKAGQAJAGAAAMIAAAfQAAAKAEAGIAAABIgVAAIgCgHQgKAIgNAAQgOABgIgHgAgMAFQgFADAAAGQAAAFADADQAEADAHAAQAFgBAFgCQAFgDADgDIAAgOIgLAAQgKAAgGADg");
	this.shape_15.setTransform(224.575,57.75);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgJAzIAAhlIATAAIAABlg");
	this.shape_16.setTransform(217.775,56.225);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgdAfQgJgGAAgJQAAgMALgFQALgGATAAIAMAAIAAgFQAAgGgEgDQgEgDgHAAQgHAAgEADQgFADAAADIgUAAQAAgFAFgGQAFgEAJgEQAIgDAJAAQAQABAKAGQAJAGAAAMIAAAfQAAAKAEAGIAAABIgVAAIgCgHQgKAIgNAAQgOABgIgHgAgMAFQgFADAAAGQAAAFADADQAEADAHAAQAFgBAFgCQAFgDADgDIAAgOIgLAAQgKAAgGADg");
	this.shape_17.setTransform(198.875,57.75);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgUAvQgJgDgFgFIAKgKQAJAJAOAAQAJAAAGgEQAFgEAAgJIAAgFQgIAIgOAAQgQAAgKgKQgKgLAAgQQAAgRAKgKQAKgKAQAAQAPAAAIAIIABgGIATAAIAABEQAAAOgLAJQgLAIgSAAQgKAAgKgEgAgNgeQgGAGAAAMQAAALAGAGQAFAFAJAAQAMABAGgJIAAgeQgFgJgNAAQgJAAgFAHg");
	this.shape_18.setTransform(189.225,59.1);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgUAvQgJgDgFgFIAKgKQAJAJAOAAQAJAAAGgEQAFgEAAgJIAAgFQgIAIgOAAQgQAAgKgKQgKgLAAgQQAAgRAKgKQAKgKAQAAQAPAAAIAIIABgGIATAAIAABEQAAAOgLAJQgLAIgSAAQgKAAgKgEgAgNgeQgGAGAAAMQAAALAGAGQAFAFAJAAQAMABAGgJIAAgeQgFgJgNAAQgJAAgFAHg");
	this.shape_19.setTransform(179.575,59.1);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AARAlIAAguQAAgHgDgDQgEgEgJAAQgLAAgGAJIAAAzIgUAAIAAhHIATAAIABAIQAKgKAPAAQAcAAAAAaIAAAvg");
	this.shape_20.setTransform(170.125,57.675);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgKAyIAAhHIAUAAIAABHgAgIgiQgDgDAAgDQAAgEADgCQADgDAFAAQAFAAADADQAEACAAAEQAAADgEADQgDACgFAAQgFAAgDgCg");
	this.shape_21.setTransform(163.25,56.375);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AARAzIAAguQAAgHgEgDQgEgDgIAAQgLAAgGAIIAAAzIgUAAIAAhlIAUAAIAAAmQAKgJAOAAQAdAAAAAZIAAAvg");
	this.shape_22.setTransform(156.275,56.225);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgbAbQgMgJAAgRIAAgBQAAgKAFgJQAGgIAJgFQAJgEALgBQASAAALAKQAKAJAAARIAAAGIg6AAQABAJAGAFQAHAFAJABQANAAAJgJIALAIQgFAGgJAEQgJAEgMgBQgSAAgMgKgAgLgTQgGAFgBAIIAmAAIAAgBQgBgIgFgEQgFgEgIgBQgHAAgFAFg");
	this.shape_23.setTransform(147.075,57.75);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgSAiQgJgDgFgGQgEgFAAgHIATAAQABAGAFADQAFADAHAAQAIAAAEgCQAEgDAAgEQAAgEgEgCQgFgDgJgBIgRgFQgPgEAAgMQAAgJAJgGQAKgHAOAAQARABAKAGQAJAGAAALIgUAAQAAgFgEgDQgEgEgIAAQgFAAgEADQgFACAAAEQAAAFAEACQAEABALACQAMADAHACQAHACADAFQADADAAAHQAAAJgKAHQgKAFgQAAQgKABgJgEg");
	this.shape_24.setTransform(137.975,57.75);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgMANIAGgKQACgEAAgEIAAgNIARAAIAAAMQAAAGgEAHQgFAHgFAFg");
	this.shape_25.setTransform(119.325,61.675);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgSAiQgJgDgFgGQgEgFAAgHIATAAQABAGAFADQAFADAHAAQAIAAAEgCQAEgDAAgEQAAgEgEgCQgFgDgJgBIgRgFQgPgEAAgMQAAgJAJgGQAKgHAOAAQARABAKAGQAJAGAAALIgUAAQAAgFgEgDQgEgEgIAAQgFAAgEADQgFACAAAEQAAAFAEACQAEABALACQAMADAHACQAHACADAFQADADAAAHQAAAJgKAHQgKAFgQAAQgKABgJgEg");
	this.shape_26.setTransform(113.275,57.75);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgJAzIAAhlIATAAIAABlg");
	this.shape_27.setTransform(106.725,56.225);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgdAqQgJgLgBgRQABgQAJgKQAKgKAQAAQANAAAKAIIAAglIAUAAIAABmIgTAAIAAgIQgKAJgOAAQgQAAgKgKgAgNgCQgFAEAAANQAAALAFAHQAGAFAIAAQAMAAAHgJIAAgdQgGgJgMAAQgKAAgFAHg");
	this.shape_28.setTransform(99.55,56.3);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgKAZIAAgoIgPAAIAAgMIAPAAIAAgSIAUAAIAAASIAPAAIAAAMIgPAAIAAAnQAAAEACACQACACAFAAIAHgBIAAANIgNACQgXAAAAgVg");
	this.shape_29.setTransform(79.775,56.925);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgdAeQgHgHAAgNIAAguIAUAAIAAAuQAAANAOAAQAOAAAFgIIAAgzIAUAAIAABHIgTAAIAAgHQgJAJgQAAQgOAAgIgHg");
	this.shape_30.setTransform(72.375,57.825);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgdAfQgJgGAAgJQAAgMALgFQALgGATAAIAMAAIAAgFQAAgGgEgDQgEgDgHAAQgHAAgEADQgFADAAADIgUAAQAAgFAFgGQAFgEAJgEQAIgDAJAAQAQABAKAGQAJAGAAAMIAAAfQAAAKAEAGIAAABIgVAAIgCgHQgKAIgNAAQgOABgIgHgAgMAFQgFADAAAGQAAAFADADQAEADAHAAQAFgBAFgCQAFgDADgDIAAgOIgLAAQgKAAgGADg");
	this.shape_31.setTransform(63.025,57.75);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgJAzIAAhlIATAAIAABlg");
	this.shape_32.setTransform(56.225,56.225);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgdAeQgHgHAAgNIAAguIAUAAIAAAuQAAANAOAAQAOAAAFgIIAAgzIAUAAIAABHIgTAAIAAgHQgJAJgQAAQgOAAgIgHg");
	this.shape_33.setTransform(37.175,57.825);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgdAfQgJgGAAgJQAAgMALgFQALgGATAAIAMAAIAAgFQAAgGgEgDQgEgDgHAAQgHAAgEADQgFADAAADIgUAAQAAgFAFgGQAFgEAJgEQAIgDAJAAQAQABAKAGQAJAGAAAMIAAAfQAAAKAEAGIAAABIgVAAIgCgHQgKAIgNAAQgOABgIgHgAgMAFQgFADAAAGQAAAFADADQAEADAHAAQAFgBAFgCQAFgDADgDIAAgOIgLAAQgKAAgGADg");
	this.shape_34.setTransform(27.825,57.75);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgKAZIAAgoIgPAAIAAgMIAPAAIAAgSIAUAAIAAASIAPAAIAAAMIgPAAIAAAnQAAAEACACQACACAFAAIAHgBIAAANIgNACQgXAAAAgVg");
	this.shape_35.setTransform(20.125,56.925);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgdAfQgJgGAAgJQAAgMALgFQALgGATAAIAMAAIAAgFQAAgGgEgDQgEgDgHAAQgHAAgEADQgFADAAADIgUAAQAAgFAFgGQAFgEAJgEQAIgDAJAAQAQABAKAGQAJAGAAAMIAAAfQAAAKAEAGIAAABIgVAAIgCgHQgKAIgNAAQgOABgIgHgAgMAFQgFADAAAGQAAAFADADQAEADAHAAQAFgBAFgCQAFgDADgDIAAgOIgLAAQgKAAgGADg");
	this.shape_36.setTransform(12.875,57.75);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AARAlIAAguQAAgHgDgDQgEgEgJAAQgLAAgGAJIAAAzIgUAAIAAhHIATAAIABAIQAKgKAPAAQAcAAAAAaIAAAvg");
	this.shape_37.setTransform(239.625,38.225);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgKAyIAAhHIAUAAIAABHgAgHgiQgEgDAAgDQAAgEAEgCQADgDAEAAQAGAAADADQADACAAAEQAAADgDADQgDACgGAAQgEAAgDgCg");
	this.shape_38.setTransform(232.75,36.925);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgdAfQgJgGAAgJQAAgMALgFQALgGATAAIAMAAIAAgFQAAgGgEgDQgEgDgHAAQgHAAgEADQgFADAAADIgUAAQAAgGAFgFQAFgFAJgDQAIgCAJAAQAQAAAKAGQAJAGAAAMIAAAfQAAAKAEAGIAAABIgVAAIgCgHQgKAJgNgBQgOAAgIgGgAgMAFQgFAEAAAFQAAAFADACQAEAEAHAAQAFgBAFgCQAFgCADgEIAAgOIgLAAQgKAAgGADg");
	this.shape_39.setTransform(225.925,38.3);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgJAzIAAhlIATAAIAABlg");
	this.shape_40.setTransform(219.075,36.775);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AARAlIAAguQAAgHgDgDQgEgEgJAAQgLAAgGAJIAAAzIgUAAIAAhHIATAAIABAIQAKgKAPAAQAcAAAAAaIAAAvg");
	this.shape_41.setTransform(201.575,38.225);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgdAfQgJgGAAgJQAAgMALgFQALgGATAAIAMAAIAAgFQAAgGgEgDQgEgDgHAAQgHAAgEADQgFADAAADIgUAAQAAgGAFgFQAFgFAJgDQAIgCAJAAQAQAAAKAGQAJAGAAAMIAAAfQAAAKAEAGIAAABIgVAAIgCgHQgKAJgNgBQgOAAgIgGgAgMAFQgFAEAAAFQAAAFADACQAEAEAHAAQAFgBAFgCQAFgCADgEIAAgOIgLAAQgKAAgGADg");
	this.shape_42.setTransform(192.225,38.3);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AATAkIgTgwIgSAwIgRAAIgYhHIATAAIAPAwIASgwIAPAAIASAxIAPgxIATAAIgYBHg");
	this.shape_43.setTransform(181.225,38.3);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgbAbQgMgJAAgRIAAgBQAAgKAFgIQAGgJAJgFQAJgEALAAQASAAALAJQAKAKAAARIAAAFIg6AAQABAJAGAFQAHAFAJABQANgBAJgIIALAIQgFAGgJAEQgJAEgMgBQgSABgMgLgAgLgTQgGAFgBAIIAmAAIAAgBQgBgIgFgEQgFgFgIAAQgHAAgFAFg");
	this.shape_44.setTransform(170.425,38.3);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AARAzIAAguQAAgHgEgDQgEgDgIAAQgLAAgGAIIAAAzIgUAAIAAhlIAUAAIAAAmQAKgJAOAAQAdAAAAAZIAAAvg");
	this.shape_45.setTransform(160.975,36.775);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AARAlIAAguQAAgHgDgDQgEgEgJAAQgLAAgGAJIAAAzIgUAAIAAhHIATAAIABAIQAKgKAPAAQAcAAAAAaIAAAvg");
	this.shape_46.setTransform(140.925,38.225);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AgdAfQgJgGAAgJQAAgMALgFQALgGATAAIAMAAIAAgFQAAgGgEgDQgEgDgHAAQgHAAgEADQgFADAAADIgUAAQAAgGAFgFQAFgFAJgDQAIgCAJAAQAQAAAKAGQAJAGAAAMIAAAfQAAAKAEAGIAAABIgVAAIgCgHQgKAJgNgBQgOAAgIgGgAgMAFQgFAEAAAFQAAAFADACQAEAEAHAAQAFgBAFgCQAFgCADgEIAAgOIgLAAQgKAAgGADg");
	this.shape_47.setTransform(131.575,38.3);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgXAlIAAhHIATAAIABAIQAGgKANAAIAHABIAAAPIgIAAQgNAAgFAIIAAAxg");
	this.shape_48.setTransform(124.3,38.225);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AgeAbQgLgKAAgRIAAAAQAAgKAFgJQAGgIAJgFQAJgEAMAAQASAAAMAJQALAJABAQIAAACQAAAMgFAHQgFAJgKAFQgJAEgNAAQgSAAgMgKgAgPgRQgFAGgBALQABAMAFAGQAGAGAJABQAKgBAGgGQAGgHAAgLQAAgKgGgHQgGgHgKAAQgJAAgGAHg");
	this.shape_49.setTransform(116.1,38.3);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgKAZIAAgoIgPAAIAAgMIAPAAIAAgSIAUAAIAAASIAPAAIAAAMIgPAAIAAAnQAAAEACACQACACAFAAIAHgBIAAANIgNACQgXAAAAgVg");
	this.shape_50.setTransform(108.175,37.475);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AgdAbQgMgKAAgRIAAAAQAAgKAGgJQAEgIAKgFQAKgEALAAQASAAALAJQAMAJABAQIAAACQAAAMgFAHQgFAJgKAFQgKAEgMAAQgSAAgLgKgAgPgRQgGAGABALQgBAMAGAGQAGAGAJABQALgBAFgGQAGgHAAgLQAAgKgGgHQgGgHgKAAQgJAAgGAHg");
	this.shape_51.setTransform(100.75,38.3);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AAQAzIgagfIgJAIIAAAXIgUAAIAAhlIAUAAIAAA6IAHgGIAYgWIAYAAIghAdIAlAqg");
	this.shape_52.setTransform(91.975,36.775);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AgdAfQgJgGAAgJQAAgMALgFQALgGATAAIAMAAIAAgFQAAgGgEgDQgEgDgHAAQgHAAgEADQgFADAAADIgUAAQAAgGAFgFQAFgFAJgDQAIgCAJAAQAQAAAKAGQAJAGAAAMIAAAfQAAAKAEAGIAAABIgVAAIgCgHQgKAJgNgBQgOAAgIgGgAgMAFQgFAEAAAFQAAAFADACQAEAEAHAAQAFgBAFgCQAFgCADgEIAAgOIgLAAQgKAAgGADg");
	this.shape_53.setTransform(71.775,38.3);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgSAiQgJgDgFgFQgEgHAAgGIATAAQABAGAFADQAFADAHAAQAIAAAEgCQAEgDAAgDQAAgFgEgCQgFgDgJgBIgRgFQgPgEAAgMQAAgJAJgGQAKgHAOABQARAAAKAGQAJAGAAAKIgUAAQAAgEgEgDQgEgEgIAAQgFABgEACQgFACAAAEQAAAFAEACQAEABALACQAMACAHAEQAHABADAFQADADAAAHQAAAKgKAGQgKAFgQAAQgKABgJgEg");
	this.shape_54.setTransform(62.675,38.3);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgKAyIAAhHIAUAAIAABHgAgIgiQgDgDAAgDQAAgEADgCQADgDAFAAQAFAAADADQAEACAAAEQAAADgEADQgDACgFAAQgFAAgDgCg");
	this.shape_55.setTransform(56.15,36.925);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AgSAiQgJgDgFgFQgEgHAAgGIATAAQABAGAFADQAFADAHAAQAIAAAEgCQAEgDAAgDQAAgFgEgCQgFgDgJgBIgRgFQgPgEAAgMQAAgJAJgGQAKgHAOABQARAAAKAGQAJAGAAAKIgUAAQAAgEgEgDQgEgEgIAAQgFABgEACQgFACAAAEQAAAFAEACQAEABALACQAMACAHAEQAHABADAFQADADAAAHQAAAKgKAGQgKAFgQAAQgKABgJgEg");
	this.shape_56.setTransform(49.525,38.3);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AgVAHIAAgNIArAAIAAANg");
	this.shape_57.setTransform(42.325,37.75);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AgdAfQgJgGAAgJQAAgMALgFQALgGATAAIAMAAIAAgFQAAgGgEgDQgEgDgHAAQgHAAgEADQgFADAAADIgUAAQAAgGAFgFQAFgFAJgDQAIgCAJAAQAQAAAKAGQAJAGAAAMIAAAfQAAAKAEAGIAAABIgVAAIgCgHQgKAJgNgBQgOAAgIgGgAgMAFQgFAEAAAFQAAAFADACQAEAEAHAAQAFgBAFgCQAFgCADgEIAAgOIgLAAQgKAAgGADg");
	this.shape_58.setTransform(34.925,38.3);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgSAiQgJgDgFgFQgEgHAAgGIATAAQABAGAFADQAFADAHAAQAIAAAEgCQAEgDAAgDQAAgFgEgCQgFgDgJgBIgRgFQgPgEAAgMQAAgJAJgGQAKgHAOABQARAAAKAGQAJAGAAAKIgUAAQAAgEgEgDQgEgEgIAAQgFABgEACQgFACAAAEQAAAFAEACQAEABALACQAMACAHAEQAHABADAFQADADAAAHQAAAKgKAGQgKAFgQAAQgKABgJgEg");
	this.shape_59.setTransform(25.825,38.3);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgJAyIAAhHIATAAIAABHgAgIgiQgCgDAAgDQAAgEACgCQADgDAFAAQAGAAADADQACACAAAEQAAADgCADQgDACgGAAQgFAAgDgCg");
	this.shape_60.setTransform(19.3,36.925);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgSAiQgJgDgFgFQgEgHAAgGIATAAQABAGAFADQAFADAHAAQAIAAAEgCQAEgDAAgDQAAgFgEgCQgFgDgJgBIgRgFQgPgEAAgMQAAgJAJgGQAKgHAOABQARAAAKAGQAJAGAAAKIgUAAQAAgEgEgDQgEgEgIAAQgFABgEACQgFACAAAEQAAAFAEACQAEABALACQAMACAHAEQAHABADAFQADADAAAHQAAAKgKAGQgKAFgQAAQgKABgJgEg");
	this.shape_61.setTransform(12.625,38.3);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AgMANIAGgKQACgEAAgEIAAgNIARAAIAAAMQAAAGgEAHQgFAHgFAFg");
	this.shape_62.setTransform(242.225,22.775);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AgbAcQgMgKAAgRIAAgBQAAgKAFgIQAGgJAJgFQAJgFALABQASAAALAJQAKAKAAARIAAAFIg6AAQABAJAGAFQAHAGAJAAQANgBAJgIIALAIQgFAGgJAEQgJADgMAAQgSABgMgKgAgLgTQgGAFgBAIIAmAAIAAgBQgBgIgFgEQgFgFgIAAQgHABgFAEg");
	this.shape_63.setTransform(236.175,18.85);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AgSAiQgJgDgFgFQgEgHAAgGIATAAQABAGAFADQAFADAHAAQAIAAAEgCQAEgCAAgEQAAgFgEgCQgFgDgJgBIgRgFQgPgEAAgMQAAgJAJgHQAKgFAOAAQARAAAKAGQAJAGAAAKIgUAAQAAgEgEgEQgEgDgIAAQgFABgEACQgFADAAADQAAAEAEADQAEABALACQAMADAHADQAHABADAFQADADAAAHQAAAJgKAGQgKAHgQgBQgKAAgJgDg");
	this.shape_64.setTransform(227.025,18.85);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AARAlIAAguQAAgHgDgDQgEgEgJAAQgLAAgGAJIAAAzIgUAAIAAhHIATAAIABAIQAKgKAPAAQAcAAAAAaIAAAvg");
	this.shape_65.setTransform(217.875,18.775);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AgbAcQgMgKAAgRIAAgBQAAgKAFgIQAGgJAJgFQAJgFALABQASAAALAJQAKAKAAARIAAAFIg6AAQABAJAGAFQAHAGAJAAQANgBAJgIIALAIQgFAGgJAEQgJADgMAAQgSABgMgKgAgLgTQgGAFgBAIIAmAAIAAgBQgBgIgFgEQgFgFgIAAQgHABgFAEg");
	this.shape_66.setTransform(208.675,18.85);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AgmAzIAAhjIASAAIABAHQAJgJAOAAQAQAAAKAKQAKAKgBARIAAABQABAQgKAKQgKAKgPAAQgPAAgIgIIAAAjgAgSgcIAAAfQAFAIANAAQAJAAAFgGQAFgFAAgNQAAgLgFgGQgFgHgJAAQgNAAgFAJg");
	this.shape_67.setTransform(199.4,20.175);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AgSAiQgJgDgFgFQgEgHAAgGIATAAQABAGAFADQAFADAHAAQAIAAAEgCQAEgCAAgEQAAgFgEgCQgFgDgJgBIgRgFQgPgEAAgMQAAgJAJgHQAKgFAOAAQARAAAKAGQAJAGAAAKIgUAAQAAgEgEgEQgEgDgIAAQgFABgEACQgFADAAADQAAAEAEADQAEABALACQAMADAHADQAHABADAFQADADAAAHQAAAJgKAGQgKAHgQgBQgKAAgJgDg");
	this.shape_68.setTransform(189.925,18.85);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2C3E50").s().p("AgdAeQgHgHAAgNIAAguIAUAAIAAAuQAAANAOAAQAOAAAFgIIAAgzIAUAAIAABHIgTAAIAAgHQgJAJgQAAQgOAAgIgHg");
	this.shape_69.setTransform(180.825,18.925);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2C3E50").s().p("AgSAiQgJgDgFgFQgEgHAAgGIATAAQABAGAFADQAFADAHAAQAIAAAEgCQAEgCAAgEQAAgFgEgCQgFgDgJgBIgRgFQgPgEAAgMQAAgJAJgHQAKgFAOAAQARAAAKAGQAJAGAAAKIgUAAQAAgEgEgEQgEgDgIAAQgFABgEACQgFADAAADQAAAEAEADQAEABALACQAMADAHADQAHABADAFQADADAAAHQAAAJgKAGQgKAHgQgBQgKAAgJgDg");
	this.shape_70.setTransform(171.625,18.85);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2C3E50").s().p("AARAlIAAguQAAgHgDgDQgEgEgJAAQgLAAgGAJIAAAzIgUAAIAAhHIATAAIABAIQAKgKAPAAQAcAAAAAaIAAAvg");
	this.shape_71.setTransform(156.675,18.775);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2C3E50").s().p("AgdAfQgJgGAAgJQAAgMALgFQALgGATAAIAMAAIAAgFQAAgFgEgEQgEgDgHAAQgHAAgEACQgFAEAAADIgUAAQAAgGAFgFQAFgEAJgEQAIgCAJAAQAQAAAKAGQAJAGAAALIAAAgQAAAKAEAGIAAABIgVAAIgCgHQgKAJgNgBQgOAAgIgGgAgMAFQgFAEAAAFQAAAFADACQAEAEAHAAQAFAAAFgDQAFgCADgEIAAgOIgLAAQgKAAgGADg");
	this.shape_72.setTransform(147.325,18.85);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#2C3E50").s().p("AAQAzIgagfIgJAIIAAAXIgUAAIAAhlIAUAAIAAA6IAHgGIAYgWIAYAAIghAdIAlAqg");
	this.shape_73.setTransform(138.775,17.325);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#2C3E50").s().p("AgdAfQgJgGAAgJQAAgMALgFQALgGATAAIAMAAIAAgFQAAgFgEgEQgEgDgHAAQgHAAgEACQgFAEAAADIgUAAQAAgGAFgFQAFgEAJgEQAIgCAJAAQAQAAAKAGQAJAGAAALIAAAgQAAAKAEAGIAAABIgVAAIgCgHQgKAJgNgBQgOAAgIgGgAgMAFQgFAEAAAFQAAAFADACQAEAEAHAAQAFAAAFgDQAFgCADgEIAAgOIgLAAQgKAAgGADg");
	this.shape_74.setTransform(129.125,18.85);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#2C3E50").s().p("AAsAlIAAguQAAgHgEgDQgEgEgJAAQgGAAgFADQgEADgCAFIAAAxIgTAAIAAgvQgBgNgPAAQgNAAgFAIIAAA0IgUAAIAAhHIATAAIABAHQAJgJARAAQARAAAHALQAJgLASAAQAPAAAHAHQAIAGAAANIAAAvg");
	this.shape_75.setTransform(117.125,18.775);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#2C3E50").s().p("AgbAcQgMgKAAgRIAAgBQAAgKAFgIQAGgJAJgFQAJgFALABQASAAALAJQAKAKAAARIAAAFIg6AAQABAJAGAFQAHAGAJAAQANgBAJgIIALAIQgFAGgJAEQgJADgMAAQgSABgMgKgAgLgTQgGAFgBAIIAmAAIAAgBQgBgIgFgEQgFgFgIAAQgHABgFAEg");
	this.shape_76.setTransform(105.225,18.85);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#2C3E50").s().p("AgmAzIAAhjIASAAIABAHQAJgJAOAAQAQAAAKAKQAKAKgBARIAAABQABAQgKAKQgKAKgPAAQgPAAgIgIIAAAjgAgSgcIAAAfQAFAIANAAQAJAAAFgGQAFgFAAgNQAAgLgFgGQgFgHgJAAQgNAAgFAJg");
	this.shape_77.setTransform(95.9,20.175);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#2C3E50").s().p("AgKAyIAAhHIAUAAIAABHgAgHgiQgEgDAAgDQAAgEAEgCQADgDAEAAQAGAAADADQADACAAAEQAAADgDADQgDACgGAAQgEAAgDgCg");
	this.shape_78.setTransform(82.9,17.475);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#2C3E50").s().p("AARAlIAAguQAAgHgDgDQgEgEgJAAQgLAAgGAJIAAAzIgUAAIAAhHIATAAIABAIQAKgKAPAAQAcAAAAAaIAAAvg");
	this.shape_79.setTransform(75.925,18.775);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#2C3E50").s().p("AgJAyIAAhHIATAAIAABHgAgHgiQgDgDgBgDQABgEADgCQADgDAEAAQAFAAAEADQACACAAAEQAAADgCADQgEACgFAAQgEAAgDgCg");
	this.shape_80.setTransform(69.05,17.475);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#2C3E50").s().p("AARAlIAAguQAAgHgDgDQgEgEgJAAQgLAAgGAJIAAAzIgUAAIAAhHIATAAIABAIQAKgKAPAAQAcAAAAAaIAAAvg");
	this.shape_81.setTransform(56.275,18.775);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#2C3E50").s().p("AgdAfQgJgGAAgJQAAgMALgFQALgGATAAIAMAAIAAgFQAAgFgEgEQgEgDgHAAQgHAAgEACQgFAEAAADIgUAAQAAgGAFgFQAFgEAJgEQAIgCAJAAQAQAAAKAGQAJAGAAALIAAAgQAAAKAEAGIAAABIgVAAIgCgHQgKAJgNgBQgOAAgIgGgAgMAFQgFAEAAAFQAAAFADACQAEAEAHAAQAFAAAFgDQAFgCADgEIAAgOIgLAAQgKAAgGADg");
	this.shape_82.setTransform(46.925,18.85);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#2C3E50").s().p("AATAkIgTgxIgSAxIgRAAIgYhHIATAAIAPAwIASgwIAPAAIASAwIAPgwIATAAIgYBHg");
	this.shape_83.setTransform(35.875,18.85);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#2C3E50").s().p("AgbAcQgMgKAAgRIAAgBQAAgKAFgIQAGgJAJgFQAJgFALABQASAAALAJQAKAKAAARIAAAFIg6AAQABAJAGAFQAHAGAJAAQANgBAJgIIALAIQgFAGgJAEQgJADgMAAQgSABgMgKgAgLgTQgGAFgBAIIAmAAIAAgBQgBgIgFgEQgFgFgIAAQgHABgFAEg");
	this.shape_84.setTransform(25.075,18.85);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#2C3E50").s().p("AAbAwIAAgqIg1AAIAAAqIgVAAIAAhfIAVAAIAAAnIA1AAIAAgnIAVAAIAABfg");
	this.shape_85.setTransform(14.3,17.6);

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
	this.shape.graphics.f("#2C3E50").s().p("AgbAlQgIgIAAgKQAAgOAKgGQAKgHASAAIALAAIAAgGQAAgGgDgEQgEgEgHAAQgGAAgEADQgEADAAAFIgTAAQAAgHAEgGQAFgGAIgDQAIgEAIAAQAPAAAJAIQAJAHAAAOIAAAlQAAALADAHIAAABIgTAAIgCgIQgJAKgMAAQgNAAgIgHgAgLAGQgFAEAAAHQAAAFADADQAEAEAGAAQAFAAAFgDQAFgDACgEIAAgQIgKAAQgKAAgFADg");
	this.shape.setTransform(124.475,124.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgRAoQgIgEgFgGQgEgHAAgHIATAAQAAAGAEAEQAFAEAHAAQAIAAADgDQAEgDAAgFQAAgFgEgCQgEgDgJgCQgKgCgGgDQgOgGAAgNQAAgLAJgHQAJgIANAAQAQAAAJAIQAJAHAAAMIgTAAQAAgFgEgEQgEgEgHAAQgFAAgEADQgEADAAAFQAAAEAEADQADACALADQALACAHAEQAFACAEAFQADAEAAAHQAAAMgKAHQgJAHgQAAQgJAAgIgEg");
	this.shape_1.setTransform(116,124.475);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgbAlQgIgIAAgKQAAgOAKgGQAKgHASAAIALAAIAAgGQAAgGgDgEQgEgEgHAAQgGAAgEADQgEADAAAFIgTAAQAAgHAEgGQAFgGAIgDQAIgEAIAAQAPAAAJAIQAJAHAAAOIAAAlQAAALADAHIAAABIgTAAIgCgIQgJAKgMAAQgNAAgIgHgAgLAGQgFAEAAAHQAAAFADADQAEAEAGAAQAFAAAFgDQAFgDACgEIAAgQIgKAAQgKAAgFADg");
	this.shape_2.setTransform(107.575,124.475);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AASAqIgSg5IgRA5IgQAAIgXhTIATAAIAOA4IARg4IANAAIASA5IANg5IATAAIgXBTg");
	this.shape_3.setTransform(97.275,124.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgZAgQgLgLAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAKAAQARAAAKALQAJALAAAUIAAAHIg2AAQABAKAGAHQAGAGAIAAQANAAAJgLIAKAKQgFAHgJAFQgIAEgLAAQgRAAgLgMgAgLgWQgEAFgCAKIAjAAIAAgBQAAgKgFgFQgEgFgIAAQgHAAgFAGg");
	this.shape_4.setTransform(87.125,124.475);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgbAxQgJgMAAgVQAAgSAJgMQAJgMAQAAQAMAAAIAKIAAgsIATAAIAAB3IgRAAIgBgIQgJAKgMAAQgPAAgKgMgAgMgDQgFAGAAAPQAAANAFAHQAFAHAIAAQAMAAAFgKIAAgjQgFgKgMAAQgIAAgFAHg");
	this.shape_5.setTransform(78,122.775);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AApArIAAg2QAAgIgDgEQgEgEgIABQgGgBgFAEQgEADgBAGIAAA5IgSAAIAAg3QgBgOgPAAQgLAAgFAJIAAA8IgTAAIAAhUIASAAIAAAJQAKgKAPAAQAQAAAGANQAKgNAQAAQAOAAAHAIQAHAHAAAPIAAA3g");
	this.shape_6.setTransform(62.75,124.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgbAjQgHgIAAgPIAAg2IATAAIAAA2QAAAPANAAQANAAAFgKIAAg7IATAAIAABTIgSAAIAAgIQgJAKgPAAQgNAAgHgIg");
	this.shape_7.setTransform(51.35,124.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgIA8IAAh3IASAAIAAB3g");
	this.shape_8.setTransform(44.85,122.7);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgZAgQgLgLAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAKAAQARAAAKALQAJALAAAUIAAAHIg2AAQABAKAGAHQAGAGAIAAQANAAAJgLIAKAKQgFAHgJAFQgIAEgLAAQgRAAgLgMgAgLgWQgEAFgCAKIAjAAIAAgBQAAgKgFgFQgEgFgIAAQgHAAgFAGg");
	this.shape_9.setTransform(38.575,124.475);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgSAyIgBAJIgRAAIAAh3IATAAIAAAsQAIgKANAAQAQAAAIAMQAJALAAAUIAAABQAAAUgJALQgIAMgQAAQgOAAgIgLgAgRAAIAAAiQAFALAMAAQAIAAAFgGQAFgHAAgNIAAgDQAAgOgFgFQgFgHgIAAQgMAAgFAKg");
	this.shape_10.setTransform(29.875,122.775);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgSA4QgJgEgFgGIAJgMQAJALANAAQAIAAAGgGQAFgFAAgKIAAgFQgIAJgNAAQgPAAgJgMQgJgMAAgUQAAgTAJgMQAJgMAPAAQAOAAAIAKIABgIIARAAIAABRQAAAQgKAKQgLAKgQAAQgJAAgJgEgAgMgkQgFAIAAAOQAAANAFAGQAFAHAIAAQAMAAAFgJIAAglQgFgJgMAAQgIAAgFAHg");
	this.shape_11.setTransform(16.525,126.075);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AAQArIAAg2QAAgIgEgEQgDgDgIAAQgLAAgFAKIAAA7IgTAAIAAhUIASAAIAAAKQAKgLAOAAQAaAAABAeIAAA3g");
	this.shape_12.setTransform(7.7,124.4);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgJA6IAAhTIASAAIAABTgAgHgoQgDgDAAgEQAAgFADgCQADgDAEAAQAFAAADADQADACAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_13.setTransform(1.225,122.875);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgZAgQgKgLAAgUIAAgBQAAgUAKgLQAKgMARAAQAPAAAKAJQAJAJAAAOIgRAAQgBgHgEgFQgFgFgHAAQgJAAgEAHQgGAHAAANIAAACQAAAOAGAHQAEAHAJAAQAHAAAFgEQAEgFABgGIARAAQABAIgGAHQgEAHgIAEQgIAEgJAAQgRAAgKgMg");
	this.shape_14.setTransform(-5,124.475);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgbAlQgIgIAAgKQAAgOAKgGQAKgHASAAIALAAIAAgGQAAgGgDgEQgEgEgHAAQgGAAgEADQgEADAAAFIgTAAQAAgHAEgGQAFgGAIgDQAIgEAIAAQAPAAAJAIQAJAHAAAOIAAAlQAAALADAHIAAABIgTAAIgCgIQgJAKgMAAQgNAAgIgHgAgLAGQgFAEAAAHQAAAFADADQAEAEAGAAQAFAAAFgDQAFgDACgEIAAgQIgKAAQgKAAgFADg");
	this.shape_15.setTransform(-13.575,124.475);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgZAgQgLgLAAgUIAAgBQAAgUALgLQALgMAQAAQAPAAAJAJQAKAJABAOIgSAAQgBgHgEgFQgFgFgHAAQgIAAgGAHQgEAHAAANIAAACQAAAOAEAHQAGAHAIAAQAHAAAFgEQAEgFABgGIASAAQgBAIgFAHQgEAHgIAEQgHAEgKAAQgQAAgLgMg");
	this.shape_16.setTransform(-22.05,124.475);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgbAjQgHgIAAgPIAAg2IATAAIAAA2QAAAQANAAQANgBAFgJIAAg8IATAAIAABTIgSAAIAAgIQgJAKgOAAQgOAAgHgIg");
	this.shape_17.setTransform(285.05,101.35);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgbAxQgJgMAAgVQAAgSAJgMQAKgMAOAAQANAAAJAKIAAgsIASAAIAAB3IgRAAIgBgIQgJAKgNAAQgOAAgKgMgAgMgDQgFAGAAAPQAAANAFAHQAFAHAIAAQAMAAAGgKIAAgjQgGgKgLAAQgJAAgFAHg");
	this.shape_18.setTransform(275.85,99.575);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgJA6IAAhTIASAAIAABTgAgHgoQgDgDAAgEQAAgFADgCQADgDAEAAQAFAAADADQADACAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_19.setTransform(269.525,99.675);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgHAqIgehTIAUAAIARA7IASg7IAUAAIgeBTg");
	this.shape_20.setTransform(263.475,101.275);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgJA6IAAhTIASAAIAABTgAgHgoQgDgDAAgEQAAgFADgCQADgDAEAAQAFAAADADQADACAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_21.setTransform(257.525,99.675);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgbAxQgJgMAAgVQAAgSAJgMQAKgMAPAAQAMAAAIAKIAAgsIATAAIAAB3IgRAAIgBgIQgIAKgNAAQgPAAgKgMgAgMgDQgFAGAAAPQAAANAFAHQAFAHAIAAQAMAAAFgKIAAgjQgFgKgMAAQgIAAgFAHg");
	this.shape_22.setTransform(250.7,99.575);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AAQArIAAg2QAAgIgEgEQgDgDgIAAQgKAAgGAKIAAA7IgTAAIAAhUIASAAIABAKQAJgLAOAAQAaAAABAeIAAA3g");
	this.shape_23.setTransform(241.95,101.2);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgJA6IAAhTIASAAIAABTgAgHgoQgDgDAAgEQAAgFADgCQADgDAEAAQAFAAADADQADACAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_24.setTransform(235.475,99.675);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgHApQgDgDAAgFQAAgEADgDQADgDAEAAQAFAAADADQADADAAAEQAAAFgDADQgDADgFAAQgEAAgDgDgAgHgZQgDgCAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_25.setTransform(211.525,101.225);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgNA9IAAhGIgMAAIAAgOIAMAAIAAgIQAAgOAIgHQAHgIAOAAIALACIAAAOIgIAAQgOAAAAAOIAAAHIARAAIAAAOIgRAAIAABGg");
	this.shape_26.setTransform(206.75,99.425);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgJA6IAAhTIASAAIAABTgAgHgoQgDgDAAgEQAAgFADgCQADgDAEAAQAFAAADADQADACAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_27.setTransform(201.725,99.675);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgJAdIAAgvIgOAAIAAgOIAOAAIAAgUIASAAIAAAUIAPAAIAAAOIgPAAIAAAuQAAAFACADQACACAFAAIAGgBIAAAPIgMABQgVAAAAgYg");
	this.shape_28.setTransform(196.825,100.325);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AAPA8IgYgkIgIAJIAAAbIgTAAIAAh3IATAAIAABEIAFgHIAXgaIAXAAIgfAiIAiAyg");
	this.shape_29.setTransform(190.7,99.5);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgbAjQgHgIAAgPIAAg2IATAAIAAA2QAAAQANAAQANgBAFgJIAAg8IATAAIAABTIgSAAIAAgIQgJAKgOAAQgOAAgHgIg");
	this.shape_30.setTransform(181.55,101.35);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgbAxQgJgMAAgVQAAgSAJgMQAKgMAOAAQANAAAJAKIAAgsIASAAIAAB3IgRAAIgBgIQgJAKgNAAQgOAAgKgMgAgMgDQgFAGAAAPQAAANAFAHQAFAHAIAAQAMAAAGgKIAAgjQgGgKgLAAQgJAAgFAHg");
	this.shape_31.setTransform(172.35,99.575);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgcAgQgLgMABgUIAAAAQAAgMAEgKQAGgKAJgFQAJgGAKAAQARAAAKALQAMALAAASIABAEQgBAMgFAKQgEAKgJAFQgJAGgMAAQgRAAgLgMgAgOgUQgFAHAAAOQAAANAFAHQAFAIAJAAQAJAAAGgIQAGgHgBgOQABgNgGgHQgGgIgJAAQgJAAgFAIg");
	this.shape_32.setTransform(163.5,101.275);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgVArIAAhUIASAAIABAKQAFgLANAAIAGABIAAASIgHgBQgOAAgDAKIAAA5g");
	this.shape_33.setTransform(156.475,101.2);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgkA7IAAh0IARAAIABAJQAJgKANAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgNAAgIgJIAAAogAgRghIAAAkQAFAKAMAAQAIAAAFgHQAFgGAAgPQAAgNgFgHQgFgIgIAAQgMAAgFAKg");
	this.shape_34.setTransform(148.975,102.825);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgZAgQgLgLAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAKAAQARAAAKALQAJALAAAUIAAAHIg2AAQABAKAGAHQAGAGAIAAQANAAAJgLIAKAKQgFAHgJAFQgIAEgLAAQgRAAgLgMgAgLgWQgEAFgCAKIAjAAIAAgBQAAgKgFgFQgEgFgIAAQgHAAgFAGg");
	this.shape_35.setTransform(140.075,101.275);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgVArIAAhUIASAAIABAKQAFgLANAAIAGABIAAASIgHgBQgOAAgDAKIAAA5g");
	this.shape_36.setTransform(133.225,101.2);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgTAIIAAgPIAnAAIAAAPg");
	this.shape_37.setTransform(127.4,100.675);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AAQArIAAg2QAAgIgEgEQgDgDgIAAQgLAAgFAKIAAA7IgTAAIAAhUIASAAIABAKQAJgLAOAAQAaAAABAeIAAA3g");
	this.shape_38.setTransform(120.35,101.2);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgbAgQgMgMAAgUIAAAAQABgMAFgKQAFgKAIgFQAJgGALAAQARAAALALQALALAAASIAAAEQAAAMgEAKQgGAKgIAFQgJAGgMAAQgRAAgKgMgAgOgUQgGAHAAAOQAAANAGAHQAGAIAIAAQAJAAAGgIQAFgHABgOQgBgNgFgHQgGgIgJAAQgIAAgGAIg");
	this.shape_39.setTransform(111.35,101.275);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AAQArIAAg2QAAgIgEgEQgDgDgIAAQgLAAgFAKIAAA7IgTAAIAAhUIASAAIABAKQAJgLAOAAQAaAAABAeIAAA3g");
	this.shape_40.setTransform(102.35,101.2);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgbAjQgHgIAAgPIAAg2IATAAIAAA2QAAAQANAAQANgBAFgJIAAg8IATAAIAABTIgSAAIgBgIQgIAKgOAAQgOAAgHgIg");
	this.shape_41.setTransform(73.7,101.35);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgbAxQgJgMAAgVQAAgSAJgMQAJgMAQAAQAMAAAIAKIAAgsIATAAIAAB3IgRAAIgBgIQgJAKgMAAQgPAAgKgMgAgMgDQgFAGAAAPQAAANAFAHQAFAHAIAAQAMAAAFgKIAAgjQgFgKgMAAQgIAAgFAHg");
	this.shape_42.setTransform(64.5,99.575);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgJA6IAAhTIASAAIAABTgAgHgoQgDgDAAgEQAAgFADgCQADgDAEAAQAFAAADADQADACAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_43.setTransform(58.175,99.675);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgHAqIgehTIAUAAIARA7IASg7IAUAAIgeBTg");
	this.shape_44.setTransform(52.125,101.275);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgJA6IAAhTIASAAIAABTgAgHgoQgDgDAAgEQAAgFADgCQADgDAEAAQAFAAADADQADACAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_45.setTransform(46.175,99.675);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgaAxQgKgMAAgVQAAgSAJgMQAKgMAOAAQANAAAJAKIAAgsIASAAIAAB3IgRAAIgBgIQgIAKgOAAQgPAAgIgMgAgMgDQgFAGAAAPQAAANAFAHQAFAHAIAAQAMAAAGgKIAAgjQgGgKgLAAQgJAAgFAHg");
	this.shape_46.setTransform(39.35,99.575);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AAQArIAAg2QAAgIgDgEQgEgDgIAAQgKAAgGAKIAAA7IgTAAIAAhUIASAAIABAKQAJgLAOAAQAbAAAAAeIAAA3g");
	this.shape_47.setTransform(30.6,101.2);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgJA6IAAhTIASAAIAABTgAgHgoQgDgDAAgEQAAgFADgCQADgDAEAAQAFAAADADQADACAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_48.setTransform(24.125,99.675);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AgdA+IAsh7IAPAAIgsB7g");
	this.shape_49.setTransform(18.7,100.325);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgZAgQgLgLAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAKAAQARAAAKALQAJALAAAUIAAAHIg2AAQABAKAGAHQAGAGAIAAQANAAAJgLIAKAKQgFAHgJAFQgIAEgLAAQgRAAgLgMgAgLgWQgEAFgCAKIAjAAIAAgBQAAgKgFgFQgEgFgIAAQgHAAgFAGg");
	this.shape_50.setTransform(11.475,101.275);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AAQA8IgZgkIgIAJIAAAbIgTAAIAAh3IATAAIAABEIAFgHIAXgaIAXAAIggAiIAjAyg");
	this.shape_51.setTransform(3.45,99.5);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AgbAgQgLgMAAgUIAAAAQAAgMAEgKQAGgKAJgFQAIgGALAAQARAAAKALQAMALAAASIAAAEQAAAMgEAKQgFAKgJAFQgJAGgMAAQgRAAgKgMgAgOgUQgGAHABAOQgBANAGAHQAFAIAJAAQAJAAAGgIQAGgHgBgOQABgNgGgHQgGgIgJAAQgJAAgFAIg");
	this.shape_52.setTransform(-5.8,101.275);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AgJAdIAAgvIgOAAIAAgOIAOAAIAAgUIASAAIAAAUIAPAAIAAAOIgPAAIAAAuQAAAFACADQACACAFAAIAGgBIAAAPIgMABQgVAAAAgYg");
	this.shape_53.setTransform(-13.175,100.325);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AAfA5IgJgbIgrAAIgJAbIgVAAIArhxIARAAIArBxgAgQAOIAgAAIgQgug");
	this.shape_54.setTransform(-20.975,99.825);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgHAHQgDgDAAgEQAAgDADgDQADgEAEAAQAFAAADAEQADADAAADQAAAEgDADQgDADgFABQgEgBgDgDg");
	this.shape_55.setTransform(46.25,81.35);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AgSA4QgJgEgFgGIAJgMQAJALANAAQAIAAAGgGQAFgFAAgKIAAgFQgIAJgNAAQgPAAgJgMQgJgMAAgUQAAgTAJgMQAJgMAPAAQAOAAAIAKIABgIIARAAIAABRQAAAQgKAKQgLAKgQAAQgJAAgJgEgAgMgkQgFAIAAAOQAAANAFAGQAFAHAIAAQAMAAAFgJIAAglQgFgJgMAAQgIAAgFAHg");
	this.shape_56.setTransform(39.425,79.675);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AAQArIAAg2QAAgIgDgDQgEgFgIAAQgKAAgGALIAAA7IgTAAIAAhTIASAAIABAJQAJgLAOAAQAbAAAAAeIAAA3g");
	this.shape_57.setTransform(30.6,78);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AgJA6IAAhTIASAAIAABTgAgHgoQgDgDAAgEQAAgFADgCQADgDAEAAQAFAAADADQADACAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_58.setTransform(24.125,76.475);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AApArIAAg2QAAgIgEgEQgDgDgIgBQgHABgEADQgEAEgCAFIAAA5IgSAAIAAg2QAAgPgOgBQgMAAgFAKIAAA8IgTAAIAAhTIASAAIABAJQAIgLAQAAQAQAAAGANQAJgNARAAQAOAAAHAHQAHAJAAAPIAAA2g");
	this.shape_59.setTransform(15.1,78);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgVArIAAhTIASAAIABAJQAFgLANAAIAGABIAAASIgHgBQgOAAgDAKIAAA5g");
	this.shape_60.setTransform(5.675,78);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgbAlQgIgIAAgKQAAgOAKgGQAKgHASAAIALAAIAAgGQAAgGgDgEQgEgEgHAAQgGAAgEADQgEADAAAFIgTAAQAAgHAEgGQAFgGAIgDQAIgEAIAAQAPAAAJAIQAJAHAAAOIAAAlQAAALADAHIAAABIgTAAIgCgIQgJAKgMAAQgNAAgIgHgAgLAGQgFAEAAAHQAAAFADADQAEAEAGAAQAFAAAFgDQAFgDACgEIAAgQIgKAAQgKAAgFADg");
	this.shape_61.setTransform(-1.825,78.075);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AASAqIgSg5IgRA5IgQAAIgXhTIATAAIAOA4IARg4IANAAIASA5IANg5IATAAIgXBTg");
	this.shape_62.setTransform(-12.125,78.075);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AgRAoQgIgEgFgGQgEgHAAgHIASAAQAAAGAGAEQAEAEAHAAQAHAAAEgDQAEgDAAgFQAAgFgEgCQgEgDgJgCQgKgCgGgDQgPgGAAgNQAAgLAKgHQAJgIAOAAQAOAAAKAIQAJAHAAAMIgTAAQAAgFgEgEQgEgEgGAAQgGAAgEADQgEADAAAFQAAAEAEADQAEACAJADQAMACAGAEQAHACACAFQAEAEAAAHQAAAMgJAHQgKAHgPAAQgKAAgIgEg");
	this.shape_63.setTransform(-22.2,78.075);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AgJAdIAAgvIgOAAIAAgOIAOAAIAAgUIASAAIAAAUIAPAAIAAAOIgPAAIAAAuQAAAFACADQACACAFAAIAGgBIAAAPIgMABQgVAAAAgYg");
	this.shape_64.setTransform(286.675,53.925);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AgbAjQgHgIAAgQIAAg1IATAAIAAA1QAAARANgBQANABAFgKIAAg8IATAAIAABUIgSAAIAAgJQgJAKgPAAQgNAAgHgIg");
	this.shape_65.setTransform(279.75,54.95);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AgSAyIgBAJIgRAAIAAh3IATAAIAAAsQAIgKANAAQAQAAAIAMQAJALAAAUIAAABQAAAUgJALQgIAMgQAAQgOAAgIgLgAgRAAIAAAiQAFALAMAAQAIAAAFgGQAFgHAAgNIAAgDQAAgOgFgFQgFgHgIAAQgMAAgFAKg");
	this.shape_66.setTransform(270.975,53.175);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AgZAgQgLgLAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAKAAQARAAAKALQAJALAAAUIAAAHIg2AAQABAKAGAHQAGAGAIAAQANAAAJgLIAKAKQgFAHgJAFQgIAEgLAAQgRAAgLgMgAgLgWQgEAFgCAKIAjAAIAAgBQAAgKgFgFQgEgFgIAAQgHAAgFAGg");
	this.shape_67.setTransform(262.075,54.875);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AgRAoQgIgEgFgGQgEgHAAgHIATAAQAAAGAEAEQAFAEAHAAQAHAAAEgDQAEgDAAgFQAAgFgEgCQgEgDgJgCQgJgCgHgDQgPgGAAgNQAAgLAKgHQAJgIAOAAQAOAAAKAIQAJAHAAAMIgTAAQAAgFgEgEQgEgEgGAAQgGAAgEADQgEADAAAFQAAAEAEADQADACAKADQAMACAGAEQAHACACAFQAEAEAAAHQAAAMgJAHQgKAHgPAAQgKAAgIgEg");
	this.shape_68.setTransform(253.55,54.875);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2C3E50").s().p("AgJA6IAAhTIASAAIAABTgAgHgoQgDgDAAgEQAAgFADgCQADgDAEAAQAFAAADADQADACAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_69.setTransform(247.425,53.275);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2C3E50").s().p("AgaAxQgKgMAAgVQAAgSAJgMQAJgMAPAAQANAAAJAKIAAgsIASAAIAAB3IgRAAIgBgIQgJAKgNAAQgPAAgIgMgAgMgDQgFAGAAAPQAAANAFAHQAFAHAIAAQAMAAAGgKIAAgjQgGgKgMAAQgIAAgFAHg");
	this.shape_70.setTransform(240.6,53.175);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2C3E50").s().p("AgJA6IAAhTIASAAIAABTgAgHgoQgDgDAAgEQAAgFADgCQADgDAEAAQAFAAADADQADACAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_71.setTransform(221.625,53.275);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2C3E50").s().p("AAQArIAAg2QAAgIgDgDQgEgFgIAAQgKAAgGALIAAA7IgTAAIAAhTIASAAIABAJQAJgLAOAAQAbAAAAAeIAAA3g");
	this.shape_72.setTransform(215.1,54.8);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#2C3E50").s().p("AgJA6IAAhTIASAAIAABTgAgHgoQgDgDAAgEQAAgFADgCQADgDAEAAQAFAAADADQADACAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_73.setTransform(208.625,53.275);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#2C3E50").s().p("AgbAlQgIgIAAgKQAAgOAKgGQAKgHASAAIALAAIAAgGQAAgGgDgEQgEgEgHAAQgGAAgEADQgEADAAAFIgTAAQAAgHAEgGQAFgGAIgDQAIgEAIAAQAPAAAJAIQAJAHAAAOIAAAlQAAALADAHIAAABIgTAAIgCgIQgJAKgMAAQgNAAgIgHgAgLAGQgFAEAAAHQAAAFADADQAEAEAGAAQAFAAAFgDQAFgDACgEIAAgQIgKAAQgKAAgFADg");
	this.shape_74.setTransform(189.575,54.875);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#2C3E50").s().p("AASAqIgSg5IgRA5IgQAAIgXhTIATAAIAOA4IARg4IANAAIASA5IANg5IATAAIgXBTg");
	this.shape_75.setTransform(179.275,54.875);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#2C3E50").s().p("AgJA6IAAhTIASAAIAABTgAgHgoQgDgDAAgEQAAgFADgCQADgDAEAAQAFAAADADQADACAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_76.setTransform(171.325,53.275);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#2C3E50").s().p("AgJAdIAAgvIgOAAIAAgOIAOAAIAAgUIASAAIAAAUIAPAAIAAAOIgPAAIAAAuQAAAFACADQACACAFAAIAGgBIAAAPIgMABQgVAAAAgYg");
	this.shape_77.setTransform(166.425,53.925);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#2C3E50").s().p("AgRAoQgIgEgEgGQgFgHAAgHIASAAQAAAGAGAEQAEAEAHAAQAHAAAEgDQAEgDAAgFQAAgFgEgCQgEgDgJgCQgJgCgHgDQgPgGAAgNQAAgLAKgHQAJgIANAAQAQAAAJAIQAJAHAAAMIgTAAQAAgFgEgEQgEgEgHAAQgFAAgEADQgEADAAAFQAAAEAEADQAEACAKADQALACAHAEQAFACAEAFQADAEAAAHQAAAMgJAHQgKAHgQAAQgJAAgIgEg");
	this.shape_78.setTransform(159.8,54.875);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#2C3E50").s().p("AgJA6IAAhTIASAAIAABTgAgHgoQgDgDAAgEQAAgFADgCQADgDAEAAQAFAAADADQADACAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_79.setTransform(153.675,53.275);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#2C3E50").s().p("AgVArIAAhTIASAAIABAJQAFgLANAAIAGABIAAASIgHgBQgOAAgDAKIAAA5g");
	this.shape_80.setTransform(149.125,54.8);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#2C3E50").s().p("AgZAgQgLgLAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAKAAQARAAAKALQAJALAAAUIAAAHIg2AAQABAKAGAHQAGAGAIAAQANAAAJgLIAKAKQgFAHgJAFQgIAEgLAAQgRAAgLgMgAgLgWQgEAFgCAKIAjAAIAAgBQAAgKgFgFQgEgFgIAAQgHAAgFAGg");
	this.shape_81.setTransform(141.725,54.875);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#2C3E50").s().p("AgkA7IAAh0IARAAIABAJQAJgKANAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgNAAgIgJIAAAogAgRghIAAAkQAFAKAMAAQAIAAAFgHQAFgGAAgPQAAgNgFgHQgFgIgIAAQgMAAgFAKg");
	this.shape_82.setTransform(133.025,56.425);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#2C3E50").s().p("AgMAQQAFgHACgGQABgEAAgFIAAgPIARAAIgBAOQAAAHgEAIQgEAJgFAFg");
	this.shape_83.setTransform(113.675,59.45);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#2C3E50").s().p("AgVArIAAhTIASAAIABAJQAFgLANAAIAGABIAAASIgHgBQgOAAgDAKIAAA5g");
	this.shape_84.setTransform(109.725,54.8);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#2C3E50").s().p("AgbAjQgHgIAAgQIAAg1IATAAIAAA1QAAARANgBQANABAFgKIAAg8IATAAIAABUIgSAAIAAgJQgJAKgPAAQgNAAgHgIg");
	this.shape_85.setTransform(102.1,54.95);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#2C3E50").s().p("AgIA8IAAh3IASAAIAAB3g");
	this.shape_86.setTransform(95.6,53.1);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#2C3E50").s().p("AgZAgQgLgLAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAKAAQARAAAKALQAJALAAAUIAAAHIg2AAQABAKAGAHQAGAGAIAAQANAAAJgLIAKAKQgFAHgJAFQgIAEgLAAQgRAAgLgMgAgLgWQgEAFgCAKIAjAAIAAgBQAAgKgFgFQgEgFgIAAQgHAAgFAGg");
	this.shape_87.setTransform(89.325,54.875);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#2C3E50").s().p("AgJAdIAAgvIgOAAIAAgOIAOAAIAAgUIASAAIAAAUIAPAAIAAAOIgPAAIAAAuQAAAFACADQACACAFAAIAGgBIAAAPIgMABQgVAAAAgYg");
	this.shape_88.setTransform(82.125,53.925);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#2C3E50").s().p("AAQArIAAg2QAAgIgDgDQgEgFgIAAQgKAAgGALIAAA7IgTAAIAAhTIASAAIABAJQAJgLAOAAQAbAAAAAeIAAA3g");
	this.shape_89.setTransform(62.55,54.8);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#2C3E50").s().p("AgbAlQgIgIAAgKQAAgOAKgGQAKgHASAAIALAAIAAgGQAAgGgDgEQgEgEgHAAQgGAAgEADQgEADAAAFIgTAAQAAgHAEgGQAFgGAIgDQAIgEAIAAQAPAAAJAIQAJAHAAAOIAAAlQAAALADAHIAAABIgTAAIgCgIQgJAKgMAAQgNAAgIgHgAgLAGQgFAEAAAHQAAAFADADQAEAEAGAAQAFAAAFgDQAFgDACgEIAAgQIgKAAQgKAAgFADg");
	this.shape_90.setTransform(53.775,54.875);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#2C3E50").s().p("AgbAxQgJgMAAgVQAAgSAJgMQAJgMAQAAQAMAAAIAKIAAgsIATAAIAAB3IgRAAIgBgIQgJAKgMAAQgPAAgKgMgAgMgDQgFAGAAAPQAAANAFAHQAFAHAIAAQAMAAAFgKIAAgjQgFgKgMAAQgIAAgFAHg");
	this.shape_91.setTransform(44.7,53.175);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#2C3E50").s().p("AgbAlQgIgIAAgKQAAgOAKgGQAKgHASAAIALAAIAAgGQAAgGgDgEQgEgEgHAAQgGAAgEADQgEADAAAFIgTAAQAAgHAEgGQAFgGAIgDQAIgEAIAAQAPAAAJAIQAJAHAAAOIAAAlQAAALADAHIAAABIgTAAIgCgIQgJAKgMAAQgNAAgIgHgAgLAGQgFAEAAAHQAAAFADADQAEAEAGAAQAFAAAFgDQAFgDACgEIAAgQIgKAAQgKAAgFADg");
	this.shape_92.setTransform(23.425,54.875);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#2C3E50").s().p("AApArIAAg2QAAgIgDgEQgEgEgIAAQgGAAgFAEQgEADgBAGIAAA5IgTAAIAAg3QAAgPgOAAQgMAAgFAKIAAA8IgTAAIAAhTIASAAIABAJQAJgLAPAAQAQAAAGANQAJgNARAAQAOAAAHAHQAHAJAAAOIAAA3g");
	this.shape_93.setTransform(12.15,54.8);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#2C3E50").s().p("AgVArIAAhTIASAAIABAJQAFgLANAAIAGABIAAASIgHgBQgOAAgDAKIAAA5g");
	this.shape_94.setTransform(2.725,54.8);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#2C3E50").s().p("AgZAgQgLgLAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAKAAQARAAAKALQAJALAAAUIAAAHIg2AAQABAKAGAHQAGAGAIAAQANAAAJgLIAKAKQgFAHgJAFQgIAEgLAAQgRAAgLgMgAgLgWQgEAFgCAKIAjAAIAAgBQAAgKgFgFQgEgFgIAAQgHAAgFAGg");
	this.shape_95.setTransform(-4.675,54.875);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#2C3E50").s().p("AgkA7IAAh0IARAAIABAJQAJgKANAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgNAAgIgJIAAAogAgRghIAAAkQAFAKAMAAQAIAAAFgHQAFgGAAgPQAAgNgFgHQgFgIgIAAQgMAAgFAKg");
	this.shape_96.setTransform(-13.375,56.425);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#2C3E50").s().p("AgRAoQgIgEgFgGQgEgHAAgHIASAAQAAAGAGAEQAEAEAHAAQAHAAAEgDQAEgDAAgFQAAgFgEgCQgEgDgJgCQgKgCgGgDQgPgGAAgNQAAgLAKgHQAJgIAOAAQAOAAAKAIQAJAHAAAMIgTAAQAAgFgEgEQgEgEgGAAQgGAAgEADQgEADAAAFQAAAEAEADQAEACAJADQAMACAGAEQAHACACAFQAEAEAAAHQAAAMgJAHQgKAHgPAAQgKAAgIgEg");
	this.shape_97.setTransform(-22.2,54.875);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#2C3E50").s().p("AAQArIAAg2QAAgIgEgEQgDgDgIAAQgKgBgGALIAAA7IgTAAIAAhUIASAAIABAKQAJgLAOAAQAbAAAAAeIAAA3g");
	this.shape_98.setTransform(284.95,31.6);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#2C3E50").s().p("AgbAlQgIgIAAgKQAAgOAKgGQAKgHASAAIALAAIAAgGQAAgGgDgEQgEgEgHAAQgGAAgEADQgEADAAAFIgTAAQAAgHAEgGQAFgGAIgDQAIgEAIAAQAPAAAJAIQAJAHAAAOIAAAlQAAALADAHIAAABIgTAAIgCgIQgJAKgMAAQgNAAgIgHgAgLAGQgFAEAAAHQAAAFADADQAEAEAGAAQAFAAAFgDQAFgDACgEIAAgQIgKAAQgKAAgFADg");
	this.shape_99.setTransform(276.175,31.675);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#2C3E50").s().p("AAPA8IgYgkIgIAIIAAAcIgTAAIAAh3IATAAIAABEIAFgHIAXgaIAXAAIgfAjIAiAxg");
	this.shape_100.setTransform(268.2,29.9);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#2C3E50").s().p("AgRAoQgIgEgEgGQgFgHAAgHIASAAQABAGAFAEQAEAEAHAAQAHAAAEgDQAEgDAAgFQAAgFgEgCQgEgDgJgCQgJgCgHgDQgOgGAAgNQgBgLAKgHQAJgIANAAQAQAAAJAIQAJAHAAAMIgTAAQAAgFgEgEQgEgEgHAAQgFAAgEADQgEADAAAFQAAAEAEADQAEACAKADQALACAHAEQAFACAEAFQADAEAAAHQAAAMgKAHQgJAHgQAAQgJAAgIgEg");
	this.shape_101.setTransform(259.35,31.675);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#2C3E50").s().p("AgbAlQgIgIAAgKQAAgOAKgGQAKgHASAAIALAAIAAgGQAAgGgDgEQgEgEgHAAQgGAAgEADQgEADAAAFIgTAAQAAgHAEgGQAFgGAIgDQAIgEAIAAQAPAAAJAIQAJAHAAAOIAAAlQAAALADAHIAAABIgTAAIgCgIQgJAKgMAAQgNAAgIgHgAgLAGQgFAEAAAHQAAAFADADQAEAEAGAAQAFAAAFgDQAFgDACgEIAAgQIgKAAQgKAAgFADg");
	this.shape_102.setTransform(250.925,31.675);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#2C3E50").s().p("AgkA7IAAh0IARAAIABAJQAJgKANAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgNAAgIgJIAAAogAgRghIAAAkQAFAKAMAAQAIAAAFgHQAFgGAAgPQAAgNgFgHQgFgIgIAAQgMAAgFAKg");
	this.shape_103.setTransform(242.275,33.225);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#2C3E50").s().p("AgZAgQgLgLAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAKAAQARAAAKALQAJALAAAUIAAAHIg2AAQABAKAGAHQAGAGAIAAQANAAAJgLIAKAKQgFAHgJAFQgIAEgLAAQgRAAgLgMgAgLgWQgEAFgCAKIAjAAIAAgBQAAgKgFgFQgEgFgIAAQgHAAgFAGg");
	this.shape_104.setTransform(233.375,31.675);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#2C3E50").s().p("AgJA8IAAh3IASAAIAAB3g");
	this.shape_105.setTransform(226.95,29.9);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#2C3E50").s().p("AgZAgQgLgLAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAKAAQARAAAKALQAJALAAAUIAAAHIg2AAQABAKAGAHQAGAGAIAAQANAAAJgLIAKAKQgFAHgJAFQgIAEgLAAQgRAAgLgMgAgLgWQgEAFgCAKIAjAAIAAgBQAAgKgFgFQgEgFgIAAQgHAAgFAGg");
	this.shape_106.setTransform(220.675,31.675);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#2C3E50").s().p("AApArIAAg2QAAgIgDgEQgEgDgIAAQgGAAgFADQgEAEgBAFIAAA5IgSAAIAAg3QgBgOgOAAQgMgBgFAKIAAA8IgTAAIAAhUIASAAIAAAKQAKgLAPAAQAQAAAGANQAJgNARAAQAOAAAHAIQAHAHAAAPIAAA3g");
	this.shape_107.setTransform(209.35,31.6);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#2C3E50").s().p("AAPA8IgYgkIgIAIIAAAcIgTAAIAAh3IATAAIAABEIAFgHIAXgaIAXAAIgfAjIAiAxg");
	this.shape_108.setTransform(188.9,29.9);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#2C3E50").s().p("AgbAjQgHgIAAgPIAAg2IATAAIAAA2QAAAPANAAQANAAAFgKIAAg7IATAAIAABUIgSAAIAAgJQgJAKgOAAQgOAAgHgIg");
	this.shape_109.setTransform(179.75,31.75);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#2C3E50").s().p("AgJAdIAAgvIgOAAIAAgOIAOAAIAAgUIASAAIAAAUIAPAAIAAAOIgPAAIAAAuQAAAFACADQACACAFAAIAGgBIAAAPIgMABQgVAAAAgYg");
	this.shape_110.setTransform(172.475,30.725);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#2C3E50").s().p("AAQArIAAg2QAAgIgEgEQgDgDgIAAQgLgBgFALIAAA7IgTAAIAAhUIASAAIAAAKQAKgLAOAAQAaAAABAeIAAA3g");
	this.shape_111.setTransform(165.55,31.6);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#2C3E50").s().p("AgbAjQgHgIAAgPIAAg2IATAAIAAA2QAAAPANAAQANAAAFgKIAAg7IATAAIAABUIgSAAIAAgJQgJAKgPAAQgNAAgHgIg");
	this.shape_112.setTransform(156.65,31.75);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#2C3E50").s().p("AgJA6IAAhTIASAAIAABTgAgHgoQgDgDAAgEQAAgFADgCQADgDAEAAQAFAAADADQADACAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_113.setTransform(140.325,30.075);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#2C3E50").s().p("AgVArIAAhUIASAAIABAKQAFgLANAAIAGABIAAASIgHgBQgOAAgDAKIAAA5g");
	this.shape_114.setTransform(135.775,31.6);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#2C3E50").s().p("AgbAlQgIgIAAgKQAAgOAKgGQAKgHASAAIALAAIAAgGQAAgGgDgEQgEgEgHAAQgGAAgEADQgEADAAAFIgTAAQAAgHAEgGQAFgGAIgDQAIgEAIAAQAPAAAJAIQAJAHAAAOIAAAlQAAALADAHIAAABIgTAAIgCgIQgJAKgMAAQgNAAgIgHgAgLAGQgFAEAAAHQAAAFADADQAEAEAGAAQAFAAAFgDQAFgDACgEIAAgQIgKAAQgKAAgFADg");
	this.shape_115.setTransform(128.275,31.675);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#2C3E50").s().p("AAQA8IAAg3QAAgHgEgEQgEgDgHAAQgLAAgFAJIAAA8IgTAAIAAh3IATAAIAAAtQAJgLANAAQAcAAAAAeIAAA3g");
	this.shape_116.setTransform(119.5,29.9);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#2C3E50").s().p("AgSA4QgJgEgFgGIAJgMQAJALANAAQAIAAAGgGQAFgFAAgKIAAgFQgIAJgNAAQgPAAgJgMQgJgMAAgUQAAgTAJgMQAJgMAPAAQAOAAAIAKIABgIIARAAIAABRQAAAQgKAKQgLAKgQAAQgJAAgJgEgAgMgkQgFAIAAAOQAAANAFAGQAFAHAIAAQAMAAAFgJIAAglQgFgJgMAAQgIAAgFAHg");
	this.shape_117.setTransform(100.525,33.275);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#2C3E50").s().p("AAQArIAAg2QAAgIgDgEQgEgDgIAAQgKgBgGALIAAA7IgTAAIAAhUIASAAIABAKQAJgLAOAAQAbAAAAAeIAAA3g");
	this.shape_118.setTransform(91.7,31.6);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#2C3E50").s().p("AgbAlQgIgIAAgKQAAgOAKgGQAKgHASAAIALAAIAAgGQAAgGgDgEQgEgEgHAAQgGAAgEADQgEADAAAFIgTAAQAAgHAEgGQAFgGAIgDQAIgEAIAAQAPAAAJAIQAJAHAAAOIAAAlQAAALADAHIAAABIgTAAIgCgIQgJAKgMAAQgNAAgIgHgAgLAGQgFAEAAAHQAAAFADADQAEAEAGAAQAFAAAFgDQAFgDACgEIAAgQIgKAAQgKAAgFADg");
	this.shape_119.setTransform(82.925,31.675);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#2C3E50").s().p("AgJAdIAAgvIgOAAIAAgOIAOAAIAAgUIASAAIAAAUIAPAAIAAAOIgPAAIAAAuQAAAFACADQACACAFAAIAGgBIAAAPIgMABQgVAAAAgYg");
	this.shape_120.setTransform(75.775,30.725);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#2C3E50").s().p("AgZAgQgLgLAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAKAAQARAAAKALQAJALAAAUIAAAHIg2AAQABAKAGAHQAGAGAIAAQANAAAJgLIAKAKQgFAHgJAFQgIAEgLAAQgRAAgLgMgAgLgWQgEAFgCAKIAjAAIAAgBQAAgKgFgFQgEgFgIAAQgHAAgFAGg");
	this.shape_121.setTransform(69.075,31.675);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#2C3E50").s().p("AgkA7IAAh0IARAAIABAJQAJgKANAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgNAAgIgJIAAAogAgRghIAAAkQAFAKAMAAQAIAAAFgHQAFgGAAgPQAAgNgFgHQgFgIgIAAQgMAAgFAKg");
	this.shape_122.setTransform(60.375,33.225);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#2C3E50").s().p("AgbAjQgHgIAAgPIAAg2IATAAIAAA2QAAAPANAAQANAAAFgKIAAg7IATAAIAABUIgSAAIgBgJQgIAKgOAAQgOAAgHgIg");
	this.shape_123.setTransform(41.4,31.75);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#2C3E50").s().p("AgbAlQgIgIAAgKQAAgOAKgGQAKgHASAAIALAAIAAgGQAAgGgDgEQgEgEgHAAQgGAAgEADQgEADAAAFIgTAAQAAgHAEgGQAFgGAIgDQAIgEAIAAQAPAAAJAIQAJAHAAAOIAAAlQAAALADAHIAAABIgTAAIgCgIQgJAKgMAAQgNAAgIgHgAgLAGQgFAEAAAHQAAAFADADQAEAEAGAAQAFAAAFgDQAFgDACgEIAAgQIgKAAQgKAAgFADg");
	this.shape_124.setTransform(32.625,31.675);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#2C3E50").s().p("AgJAdIAAgvIgOAAIAAgOIAOAAIAAgUIASAAIAAAUIAPAAIAAAOIgPAAIAAAuQAAAFACADQACACAFAAIAGgBIAAAPIgMABQgVAAAAgYg");
	this.shape_125.setTransform(25.475,30.725);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#2C3E50").s().p("AgbAlQgIgIAAgKQAAgOAKgGQAKgHASAAIALAAIAAgGQAAgGgDgEQgEgEgHAAQgGAAgEADQgEADAAAFIgTAAQAAgHAEgGQAFgGAIgDQAIgEAIAAQAPAAAJAIQAJAHAAAOIAAAlQAAALADAHIAAABIgTAAIgCgIQgJAKgMAAQgNAAgIgHgAgLAGQgFAEAAAHQAAAFADADQAEAEAGAAQAFAAAFgDQAFgDACgEIAAgQIgKAAQgKAAgFADg");
	this.shape_126.setTransform(18.675,31.675);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#2C3E50").s().p("AgJA6IAAhTIASAAIAABTgAgHgoQgDgDAAgEQAAgFADgCQADgDAEAAQAFAAADADQADACAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_127.setTransform(2.475,30.075);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#2C3E50").s().p("AgSA4QgJgEgFgGIAJgMQAJALANAAQAIAAAGgGQAFgFAAgKIAAgFQgIAJgNAAQgPAAgJgMQgJgMAAgUQAAgTAJgMQAJgMAPAAQAOAAAIAKIABgIIARAAIAABRQAAAQgKAKQgLAKgQAAQgJAAgJgEgAgMgkQgFAIAAAOQAAANAFAGQAFAHAIAAQAMAAAFgJIAAglQgFgJgMAAQgIAAgFAHg");
	this.shape_128.setTransform(-4.275,33.275);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#2C3E50").s().p("AgbAlQgIgIAAgKQAAgOAKgGQAKgHASAAIALAAIAAgGQAAgGgDgEQgEgEgHAAQgGAAgEADQgEADAAAFIgTAAQAAgHAEgGQAFgGAIgDQAIgEAIAAQAPAAAJAIQAJAHAAAOIAAAlQAAALADAHIAAABIgTAAIgCgIQgJAKgMAAQgNAAgIgHgAgLAGQgFAEAAAHQAAAFADADQAEAEAGAAQAFAAAFgDQAFgDACgEIAAgQIgKAAQgKAAgFADg");
	this.shape_129.setTransform(-12.975,31.675);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#2C3E50").s().p("AgkA7IAAh0IARAAIABAJQAJgKANAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgNAAgIgJIAAAogAgRghIAAAkQAFAKAMAAQAIAAAFgHQAFgGAAgPQAAgNgFgHQgFgIgIAAQgMAAgFAKg");
	this.shape_130.setTransform(-21.625,33.225);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#2C3E50").s().p("AgSA4QgJgEgFgGIAJgMQAJALANAAQAIAAAGgGQAFgFAAgKIAAgFQgIAJgNAAQgPAAgJgMQgJgMAAgUQAAgTAJgMQAJgMAPAAQAOAAAIAKIABgIIARAAIAABRQAAAQgKAKQgLAKgQAAQgJAAgJgEgAgMgkQgFAIAAAOQAAANAFAGQAFAHAIAAQAMAAAFgJIAAglQgFgJgMAAQgIAAgFAHg");
	this.shape_131.setTransform(284.825,10.075);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#2C3E50").s().p("AAQArIAAg2QAAgIgDgEQgEgDgIAAQgLAAgFAKIAAA7IgTAAIAAhUIASAAIAAAKQAKgLAOAAQAaAAABAeIAAA3g");
	this.shape_132.setTransform(276,8.4);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#2C3E50").s().p("AgbAlQgIgIAAgKQAAgOAKgGQAKgHASAAIALAAIAAgGQAAgGgDgEQgEgEgHAAQgGAAgEADQgEADAAAFIgTAAQAAgHAEgGQAFgGAIgDQAIgEAIAAQAPAAAJAIQAJAHAAAOIAAAlQAAALADAHIAAABIgTAAIgCgIQgJAKgMAAQgNAAgIgHgAgLAGQgFAEAAAHQAAAFADADQAEAEAGAAQAFAAAFgDQAFgDACgEIAAgQIgKAAQgKAAgFADg");
	this.shape_133.setTransform(267.225,8.475);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#2C3E50").s().p("AgIA8IAAh3IASAAIAAB3g");
	this.shape_134.setTransform(260.85,6.7);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#2C3E50").s().p("AgZAgQgLgLAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAKAAQARAAAKALQAJALAAAUIAAAHIg2AAQABAKAGAHQAGAGAIAAQANAAAJgLIAKAKQgFAHgJAFQgIAEgLAAQgRAAgLgMgAgLgWQgEAFgCAKIAjAAIAAgBQAAgKgFgFQgEgFgIAAQgHAAgFAGg");
	this.shape_135.setTransform(254.575,8.475);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#2C3E50").s().p("AgRBKIAAgPIAHABQAJAAAAgLIAAhbIASAAIAABbQAAANgGAHQgHAGgLAAIgKgBgAAAg5QgCgDAAgEQAAgFACgCQACgDAFAAQAGAAACADQADACAAAFQAAAEgDADQgCADgGAAQgFAAgCgDg");
	this.shape_136.setTransform(247.425,8.575);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#2C3E50").s().p("AAQArIAAg2QAAgIgDgEQgEgDgIAAQgKAAgGAKIAAA7IgTAAIAAhUIASAAIABAKQAJgLAOAAQAbAAAAAeIAAA3g");
	this.shape_137.setTransform(241.75,8.4);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#2C3E50").s().p("AgZAgQgLgLAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAKAAQARAAAKALQAJALAAAUIAAAHIg2AAQABAKAGAHQAGAGAIAAQANAAAJgLIAKAKQgFAHgJAFQgIAEgLAAQgRAAgLgMgAgLgWQgEAFgCAKIAjAAIAAgBQAAgKgFgFQgEgFgIAAQgHAAgFAGg");
	this.shape_138.setTransform(233.075,8.475);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#2C3E50").s().p("AApArIAAg2QAAgIgDgEQgEgEgIABQgHgBgEAEQgEADgCAGIAAA5IgSAAIAAg3QAAgPgOABQgMAAgFAJIAAA8IgTAAIAAhUIASAAIABAJQAIgKAQAAQAQAAAGANQAJgNARAAQAOAAAHAIQAHAHAAAPIAAA3g");
	this.shape_139.setTransform(221.75,8.4);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#2C3E50").s().p("AgVArIAAhUIASAAIABAKQAFgLANAAIAGABIAAASIgHgBQgOAAgDAKIAAA5g");
	this.shape_140.setTransform(207.675,8.4);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#2C3E50").s().p("AgJA6IAAhTIASAAIAABTgAgHgoQgDgDAAgEQAAgFADgCQADgDAEAAQAFAAADADQADACAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_141.setTransform(202.475,6.875);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#2C3E50").s().p("AgbAlQgIgIAAgKQAAgOAKgGQAKgHASAAIALAAIAAgGQAAgGgDgEQgEgEgHAAQgGAAgEADQgEADAAAFIgTAAQAAgHAEgGQAFgGAIgDQAIgEAIAAQAPAAAJAIQAJAHAAAOIAAAlQAAALADAHIAAABIgTAAIgCgIQgJAKgMAAQgNAAgIgHgAgLAGQgFAEAAAHQAAAFADADQAEAEAGAAQAFAAAFgDQAFgDACgEIAAgQIgKAAQgKAAgFADg");
	this.shape_142.setTransform(196.075,8.475);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#2C3E50").s().p("AAQArIAAg2QAAgIgEgEQgDgDgIAAQgLAAgFAKIAAA7IgTAAIAAhUIASAAIAAAKQAKgLAOAAQAaAAABAeIAAA3g");
	this.shape_143.setTransform(182.65,8.4);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#2C3E50").s().p("AgbAlQgIgIAAgKQAAgOAKgGQAKgHASAAIALAAIAAgGQAAgGgDgEQgEgEgHAAQgGAAgEADQgEADAAAFIgTAAQAAgHAEgGQAFgGAIgDQAIgEAIAAQAPAAAJAIQAJAHAAAOIAAAlQAAALADAHIAAABIgTAAIgCgIQgJAKgMAAQgNAAgIgHgAgLAGQgFAEAAAHQAAAFADADQAEAEAGAAQAFAAAFgDQAFgDACgEIAAgQIgKAAQgKAAgFADg");
	this.shape_144.setTransform(173.875,8.475);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#2C3E50").s().p("AgbAlQgIgIAAgKQAAgOAKgGQAKgHASAAIALAAIAAgGQAAgGgDgEQgEgEgHAAQgGAAgEADQgEADAAAFIgTAAQAAgHAEgGQAFgGAIgDQAIgEAIAAQAPAAAJAIQAJAHAAAOIAAAlQAAALADAHIAAABIgTAAIgCgIQgJAKgMAAQgNAAgIgHgAgLAGQgFAEAAAHQAAAFADADQAEAEAGAAQAFAAAFgDQAFgDACgEIAAgQIgKAAQgKAAgFADg");
	this.shape_145.setTransform(165.225,8.475);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#2C3E50").s().p("AAPA8IgYgkIgIAJIAAAbIgTAAIAAh3IATAAIAABEIAFgHIAXgaIAXAAIgfAiIAiAyg");
	this.shape_146.setTransform(157.25,6.7);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#2C3E50").s().p("AgbAjQgHgIAAgPIAAg2IATAAIAAA2QAAAQANAAQANAAAFgLIAAg7IATAAIAABTIgSAAIAAgIQgJAKgPAAQgNAAgHgIg");
	this.shape_147.setTransform(148.1,8.55);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#2C3E50").s().p("AApArIAAg2QAAgIgDgEQgEgEgIABQgHgBgEAEQgEADgCAGIAAA5IgSAAIAAg3QAAgPgOABQgMAAgFAJIAAA8IgTAAIAAhUIASAAIABAJQAIgKAQAAQAQAAAGANQAJgNARAAQAOAAAHAIQAHAHAAAPIAAA3g");
	this.shape_148.setTransform(136.7,8.4);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#2C3E50").s().p("AgVArIAAhUIASAAIABAKQAFgLANAAIAGABIAAASIgHgBQgOAAgDAKIAAA5g");
	this.shape_149.setTransform(127.275,8.4);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#2C3E50").s().p("AgZAgQgLgLAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAKAAQARAAAKALQAJALAAAUIAAAHIg2AAQABAKAGAHQAGAGAIAAQANAAAJgLIAKAKQgFAHgJAFQgIAEgLAAQgRAAgLgMgAgLgWQgEAFgCAKIAjAAIAAgBQAAgKgFgFQgEgFgIAAQgHAAgFAGg");
	this.shape_150.setTransform(119.875,8.475);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#2C3E50").s().p("AgkA7IAAh0IARAAIABAJQAJgKANAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgNAAgIgJIAAAogAgRghIAAAkQAFAKAMAAQAIAAAFgHQAFgGAAgPQAAgNgFgHQgFgIgIAAQgMAAgFAKg");
	this.shape_151.setTransform(111.175,10.025);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#2C3E50").s().p("AgZAgQgLgLAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAKAAQARAAAKALQAJALAAAUIAAAHIg2AAQABAKAGAHQAGAGAIAAQANAAAJgLIAKAKQgFAHgJAFQgIAEgLAAQgRAAgLgMgAgLgWQgEAFgCAKIAjAAIAAgBQAAgKgFgFQgEgFgIAAQgHAAgFAGg");
	this.shape_152.setTransform(97.625,8.475);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#2C3E50").s().p("AAQA8IgZgkIgIAJIAAAbIgTAAIAAh3IATAAIAABEIAGgHIAWgaIAXAAIggAiIAjAyg");
	this.shape_153.setTransform(89.6,6.7);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#2C3E50").s().p("AgSA4QgJgEgFgGIAJgMQAJALANAAQAIAAAGgGQAFgFAAgKIAAgFQgIAJgNAAQgPAAgJgMQgJgMAAgUQAAgTAJgMQAJgMAPAAQAOAAAIAKIABgIIARAAIAABRQAAAQgKAKQgLAKgQAAQgJAAgJgEgAgMgkQgFAIAAAOQAAANAFAGQAFAHAIAAQAMAAAFgJIAAglQgFgJgMAAQgIAAgFAHg");
	this.shape_154.setTransform(75.575,10.075);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#2C3E50").s().p("AAQArIAAg2QAAgIgDgEQgEgDgIAAQgLAAgFAKIAAA7IgTAAIAAhUIASAAIAAAKQAKgLAOAAQAbAAAAAeIAAA3g");
	this.shape_155.setTransform(66.75,8.4);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#2C3E50").s().p("AgbAlQgIgIAAgKQAAgOAKgGQAKgHASAAIALAAIAAgGQAAgGgDgEQgEgEgHAAQgGAAgEADQgEADAAAFIgTAAQAAgHAEgGQAFgGAIgDQAIgEAIAAQAPAAAJAIQAJAHAAAOIAAAlQAAALADAHIAAABIgTAAIgCgIQgJAKgMAAQgNAAgIgHgAgLAGQgFAEAAAHQAAAFADADQAEAEAGAAQAFAAAFgDQAFgDACgEIAAgQIgKAAQgKAAgFADg");
	this.shape_156.setTransform(57.975,8.475);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#2C3E50").s().p("AAQArIAAg2QAAgIgDgEQgEgDgIAAQgLAAgFAKIAAA7IgTAAIAAhUIASAAIAAAKQAKgLAOAAQAbAAAAAeIAAA3g");
	this.shape_157.setTransform(49.2,8.4);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#2C3E50").s().p("AgZAgQgLgLAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAKAAQARAAAKALQAJALAAAUIAAAHIg2AAQABAKAGAHQAGAGAIAAQANAAAJgLIAKAKQgFAHgJAFQgIAEgLAAQgRAAgLgMgAgLgWQgEAFgCAKIAjAAIAAgBQAAgKgFgFQgEgFgIAAQgHAAgFAGg");
	this.shape_158.setTransform(40.525,8.475);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#2C3E50").s().p("AgVArIAAhUIASAAIABAKQAFgLANAAIAGABIAAASIgHgBQgOAAgDAKIAAA5g");
	this.shape_159.setTransform(33.675,8.4);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#2C3E50").s().p("AgZAgQgLgLAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAKAAQARAAAKALQAJALAAAUIAAAHIg2AAQABAKAGAHQAGAGAIAAQANAAAJgLIAKAKQgFAHgJAFQgIAEgLAAQgRAAgLgMgAgLgWQgEAFgCAKIAjAAIAAgBQAAgKgFgFQgEgFgIAAQgHAAgFAGg");
	this.shape_160.setTransform(26.275,8.475);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#2C3E50").s().p("AgSAyIgBAJIgRAAIAAh3IATAAIAAAsQAIgKANAAQAQAAAIAMQAJALAAAUIAAABQAAAUgJALQgIAMgQAAQgOAAgIgLgAgRAAIAAAiQAFALAMAAQAIAAAFgGQAFgHAAgNIAAgDQAAgOgFgFQgFgHgIAAQgMAAgFAKg");
	this.shape_161.setTransform(17.575,6.775);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#2C3E50").s().p("AAQArIAAg2QAAgIgEgEQgDgDgIAAQgLAAgFAKIAAA7IgTAAIAAhUIASAAIABAKQAJgLAOAAQAaAAABAeIAAA3g");
	this.shape_162.setTransform(3.8,8.4);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#2C3E50").s().p("AgbAlQgIgIAAgKQAAgOAKgGQAKgHASAAIALAAIAAgGQAAgGgDgEQgEgEgHAAQgGAAgEADQgEADAAAFIgTAAQAAgHAEgGQAFgGAIgDQAIgEAIAAQAPAAAJAIQAJAHAAAOIAAAlQAAALADAHIAAABIgTAAIgCgIQgJAKgMAAQgNAAgIgHgAgLAGQgFAEAAAHQAAAFADADQAEAEAGAAQAFAAAFgDQAFgDACgEIAAgQIgKAAQgKAAgFADg");
	this.shape_163.setTransform(-4.975,8.475);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#2C3E50").s().p("AAPA8IgYgkIgIAJIAAAbIgTAAIAAh3IATAAIAABEIAFgHIAXgaIAXAAIgfAiIAiAyg");
	this.shape_164.setTransform(-12.95,6.7);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#2C3E50").s().p("AgbAlQgIgIAAgKQAAgOAKgGQAKgHASAAIALAAIAAgGQAAgGgDgEQgEgEgHAAQgGAAgEADQgEADAAAFIgTAAQAAgHAEgGQAFgGAIgDQAIgEAIAAQAPAAAJAIQAJAHAAAOIAAAlQAAALADAHIAAABIgTAAIgCgIQgJAKgMAAQgNAAgIgHgAgLAGQgFAEAAAHQAAAFADADQAEAEAGAAQAFAAAFgDQAFgDACgEIAAgQIgKAAQgKAAgFADg");
	this.shape_165.setTransform(-21.975,8.475);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#2C3E50").s().p("AgJA6IAAhTIASAAIAABTgAgHgoQgDgDAAgEQAAgFADgCQADgDAEAAQAFAAADADQADACAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_166.setTransform(287.475,-16.325);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#2C3E50").s().p("AAQArIAAg2QAAgIgDgEQgEgEgIAAQgLAAgFALIAAA7IgTAAIAAhUIASAAIAAAKQAKgLAOAAQAaAAABAeIAAA3g");
	this.shape_167.setTransform(280.95,-14.8);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#2C3E50").s().p("AgJA6IAAhTIASAAIAABTgAgHgoQgDgDAAgEQAAgFADgCQADgDAEAAQAFAAADADQADACAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_168.setTransform(274.475,-16.325);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#2C3E50").s().p("AgbAjQgHgIAAgQIAAg1IATAAIAAA1QAAAQANABQANgBAFgJIAAg8IATAAIAABTIgSAAIAAgIQgJAKgOAAQgOAAgHgIg");
	this.shape_169.setTransform(258.95,-14.65);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#2C3E50").s().p("AgbAxQgJgMAAgVQAAgSAJgMQAKgMAOAAQANAAAJAKIAAgsIASAAIAAB3IgRAAIgBgIQgJAKgNAAQgOAAgKgMgAgMgDQgFAGAAAPQAAANAFAHQAFAHAIAAQAMAAAGgKIAAgjQgGgKgLAAQgJAAgFAHg");
	this.shape_170.setTransform(249.75,-16.425);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#2C3E50").s().p("AgJA6IAAhTIASAAIAABTgAgHgoQgDgDAAgEQAAgFADgCQADgDAEAAQAFAAADADQADACAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_171.setTransform(243.425,-16.325);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#2C3E50").s().p("AgHAqIgehTIAUAAIARA7IASg7IAUAAIgeBTg");
	this.shape_172.setTransform(237.375,-14.725);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#2C3E50").s().p("AgJA6IAAhTIASAAIAABTgAgHgoQgDgDAAgEQAAgFADgCQADgDAEAAQAFAAADADQADACAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_173.setTransform(231.425,-16.325);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#2C3E50").s().p("AgbAxQgJgMAAgVQAAgSAJgMQAKgMAPAAQAMAAAIAKIAAgsIATAAIAAB3IgRAAIgBgIQgIAKgNAAQgPAAgKgMgAgMgDQgFAGAAAPQAAANAFAHQAFAHAIAAQAMAAAFgKIAAgjQgFgKgMAAQgIAAgFAHg");
	this.shape_174.setTransform(224.6,-16.425);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#2C3E50").s().p("AAQArIAAg2QAAgIgEgEQgDgEgIAAQgKAAgGALIAAA7IgTAAIAAhUIASAAIAAAKQAKgLAOAAQAaAAABAeIAAA3g");
	this.shape_175.setTransform(215.85,-14.8);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#2C3E50").s().p("AgJA5IAAhxIATAAIAABxg");
	this.shape_176.setTransform(209.15,-16.175);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#2C3E50").s().p("AgHAHQgDgDAAgEQAAgEADgDQADgDAEAAQAGAAADADQACADAAAEQAAAEgCADQgDADgGAAQgEAAgDgDg");
	this.shape_177.setTransform(195.6,-11.45);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#2C3E50").s().p("AAQArIAAg2QAAgIgDgEQgEgEgIAAQgKAAgGALIAAA7IgTAAIAAhUIASAAIABAKQAJgLAOAAQAbAAAAAeIAAA3g");
	this.shape_178.setTransform(189,-14.8);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#2C3E50").s().p("AgbAlQgIgIAAgKQAAgOAKgGQAKgHASAAIALAAIAAgGQAAgGgDgEQgEgEgHAAQgGAAgEADQgEADAAAFIgTAAQAAgHAEgGQAFgGAIgDQAIgEAIAAQAPAAAJAIQAJAHAAAOIAAAlQAAALADAHIAAABIgTAAIgCgIQgJAKgMAAQgNAAgIgHgAgLAGQgFAEAAAHQAAAFADADQAEAEAGAAQAFAAAFgDQAFgDACgEIAAgQIgKAAQgKAAgFADg");
	this.shape_179.setTransform(180.225,-14.725);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#2C3E50").s().p("AgRAoQgIgEgFgGQgEgHAAgHIASAAQAAAGAGAEQAEAEAHAAQAHAAAEgDQAEgDAAgFQAAgFgEgCQgEgDgJgCQgKgCgGgDQgPgGAAgNQAAgLAKgHQAJgIAOAAQAOAAAKAIQAJAHAAAMIgTAAQAAgFgEgEQgEgEgGAAQgGAAgEADQgEADAAAFQAAAEAEADQAEACAJADQAMACAGAEQAHACACAFQAEAEAAAHQAAAMgJAHQgKAHgPAAQgKAAgIgEg");
	this.shape_180.setTransform(171.75,-14.725);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#2C3E50").s().p("AgbAlQgIgIAAgKQAAgOAKgGQAKgHASAAIALAAIAAgGQAAgGgDgEQgEgEgHAAQgGAAgEADQgEADAAAFIgTAAQAAgHAEgGQAFgGAIgDQAIgEAIAAQAPAAAJAIQAJAHAAAOIAAAlQAAALADAHIAAABIgTAAIgCgIQgJAKgMAAQgNAAgIgHgAgLAGQgFAEAAAHQAAAFADADQAEAEAGAAQAFAAAFgDQAFgDACgEIAAgQIgKAAQgKAAgFADg");
	this.shape_181.setTransform(163.325,-14.725);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#2C3E50").s().p("AAQArIAAg2QAAgIgEgEQgDgEgIAAQgLAAgFALIAAA7IgTAAIAAhUIASAAIABAKQAJgLAOAAQAaAAABAeIAAA3g");
	this.shape_182.setTransform(154.55,-14.8);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#2C3E50").s().p("AgbAjQgHgIAAgQIAAg1IATAAIAAA1QAAAQANABQANgBAFgJIAAg8IATAAIAABTIgSAAIAAgIQgJAKgPAAQgNAAgHgIg");
	this.shape_183.setTransform(145.65,-14.65);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#2C3E50").s().p("AgJAdIAAgvIgOAAIAAgOIAOAAIAAgUIASAAIAAAUIAPAAIAAAOIgPAAIAAAuQAAAFACADQACACAFAAIAGgBIAAAPIgMABQgVAAAAgYg");
	this.shape_184.setTransform(138.375,-15.675);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#2C3E50").s().p("AgVArIAAhUIASAAIABAKQAFgLANAAIAGABIAAASIgHgBQgOAAgDAKIAAA5g");
	this.shape_185.setTransform(133.425,-14.8);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#2C3E50").s().p("AgZAgQgLgLAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAKAAQARAAAKALQAJALAAAUIAAAHIg2AAQABAKAGAHQAGAGAIAAQANAAAJgLIAKAKQgFAHgJAFQgIAEgLAAQgRAAgLgMgAgLgWQgEAFgCAKIAjAAIAAgBQAAgKgFgFQgEgFgIAAQgHAAgFAGg");
	this.shape_186.setTransform(126.025,-14.725);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#2C3E50").s().p("AgkA7IAAh0IARAAIABAJQAJgKANAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgNAAgIgJIAAAogAgRghIAAAkQAFAKAMAAQAIAAAFgHQAFgGAAgPQAAgNgFgHQgFgIgIAAQgMAAgFAKg");
	this.shape_187.setTransform(117.325,-13.175);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#2C3E50").s().p("AgJA6IAAhTIASAAIAABTgAgHgoQgDgDAAgEQAAgFADgCQADgDAEAAQAFAAADADQADACAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_188.setTransform(101.625,-16.325);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#2C3E50").s().p("AgbAjQgHgIAAgQIAAg1IATAAIAAA1QAAAQANABQANgBAFgJIAAg8IATAAIAABTIgSAAIAAgIQgJAKgPAAQgNAAgHgIg");
	this.shape_189.setTransform(95.1,-14.65);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#2C3E50").s().p("AgIA8IAAh3IARAAIAAB3g");
	this.shape_190.setTransform(88.6,-16.5);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#2C3E50").s().p("AgbAlQgIgIAAgKQAAgOAKgGQAKgHASAAIALAAIAAgGQAAgGgDgEQgEgEgHAAQgGAAgEADQgEADAAAFIgTAAQAAgHAEgGQAFgGAIgDQAIgEAIAAQAPAAAJAIQAJAHAAAOIAAAlQAAALADAHIAAABIgTAAIgCgIQgJAKgMAAQgNAAgIgHgAgLAGQgFAEAAAHQAAAFADADQAEAEAGAAQAFAAAFgDQAFgDACgEIAAgQIgKAAQgKAAgFADg");
	this.shape_191.setTransform(82.225,-14.725);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#2C3E50").s().p("AgJA8IAAh3IASAAIAAB3g");
	this.shape_192.setTransform(75.85,-16.5);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#2C3E50").s().p("AgZAgQgLgLAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAKAAQARAAAKALQAJALAAAUIAAAHIg2AAQABAKAGAHQAGAGAIAAQANAAAJgLIAKAKQgFAHgJAFQgIAEgLAAQgRAAgLgMgAgLgWQgEAFgCAKIAjAAIAAgBQAAgKgFgFQgEgFgIAAQgHAAgFAGg");
	this.shape_193.setTransform(69.575,-14.725);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#2C3E50").s().p("AApArIAAg2QAAgIgDgEQgEgDgIgBQgGABgFADQgEADgBAGIAAA5IgSAAIAAg2QgBgPgPgBQgLAAgFAKIAAA8IgTAAIAAhUIASAAIAAAJQAKgKAPAAQAQAAAGANQAKgNAQAAQAOAAAHAHQAHAJAAAPIAAA2g");
	this.shape_194.setTransform(58.25,-14.8);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#2C3E50").s().p("AAQA8IgZgkIgIAJIAAAbIgTAAIAAh3IATAAIAABEIAGgHIAWgaIAXAAIggAiIAjAyg");
	this.shape_195.setTransform(38.65,-16.5);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#2C3E50").s().p("AgbAjQgHgIAAgQIAAg1IATAAIAAA1QAAAQANABQANgBAFgJIAAg8IATAAIAABTIgSAAIgBgIQgIAKgPAAQgNAAgHgIg");
	this.shape_196.setTransform(29.5,-14.65);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#2C3E50").s().p("AgJAdIAAgvIgOAAIAAgOIAOAAIAAgUIASAAIAAAUIAPAAIAAAOIgPAAIAAAuQAAAFACADQACACAFAAIAGgBIAAAPIgMABQgVAAAAgYg");
	this.shape_197.setTransform(22.225,-15.675);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#2C3E50").s().p("AAQArIAAg2QAAgIgDgEQgEgEgIAAQgKAAgGALIAAA7IgTAAIAAhUIASAAIABAKQAJgLAOAAQAbAAAAAeIAAA3g");
	this.shape_198.setTransform(15.3,-14.8);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#2C3E50").s().p("AgZAgQgLgLAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAKAAQARAAAKALQAJALAAAUIAAAHIg2AAQABAKAGAHQAGAGAIAAQANAAAJgLIAKAKQgFAHgJAFQgIAEgLAAQgRAAgLgMgAgLgWQgEAFgCAKIAjAAIAAgBQAAgKgFgFQgEgFgIAAQgHAAgFAGg");
	this.shape_199.setTransform(6.625,-14.725);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#2C3E50").s().p("AgSAyIgBAJIgRAAIAAh3IATAAIAAAsQAIgKANAAQAQAAAIAMQAJALAAAUIAAABQAAAUgJALQgIAMgQAAQgOAAgIgLgAgRAAIAAAiQAFALAMAAQAIAAAFgGQAFgHAAgNIAAgDQAAgOgFgFQgFgHgIAAQgMAAgFAKg");
	this.shape_200.setTransform(-2.075,-16.425);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#2C3E50").s().p("AgVArIAAhUIASAAIABAKQAFgLANAAIAGABIAAASIgHgBQgOAAgDAKIAAA5g");
	this.shape_201.setTransform(-9.225,-14.8);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#2C3E50").s().p("AgZAgQgLgLAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAKAAQARAAAKALQAJALAAAUIAAAHIg2AAQABAKAGAHQAGAGAIAAQANAAAJgLIAKAKQgFAHgJAFQgIAEgLAAQgRAAgLgMgAgLgWQgEAFgCAKIAjAAIAAgBQAAgKgFgFQgEgFgIAAQgHAAgFAGg");
	this.shape_202.setTransform(-16.625,-14.725);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#2C3E50").s().p("AgJAdIAAgvIgOAAIAAgOIAOAAIAAgUIASAAIAAAUIAPAAIAAAOIgPAAIAAAuQAAAFACADQACACAFAAIAGgBIAAAPIgMABQgVAAAAgYg");
	this.shape_203.setTransform(-23.825,-15.675);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#2C3E50").s().p("AgJAdIAAgvIgOAAIAAgOIAOAAIAAgUIASAAIAAAUIAPAAIAAAOIgPAAIAAAuQAAAFACADQACACAFAAIAGgBIAAAPIgMABQgVAAAAgYg");
	this.shape_204.setTransform(286.675,-38.875);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#2C3E50").s().p("AgbAlQgIgIAAgKQAAgOAKgGQAKgHASAAIALAAIAAgGQAAgGgDgEQgEgEgHAAQgGAAgEADQgEADAAAFIgTAAQAAgHAEgGQAFgGAIgDQAIgEAIAAQAPAAAJAIQAJAHAAAOIAAAlQAAALADAHIAAABIgTAAIgCgIQgJAKgMAAQgNAAgIgHgAgLAGQgFAEAAAHQAAAFADADQAEAEAGAAQAFAAAFgDQAFgDACgEIAAgQIgKAAQgKAAgFADg");
	this.shape_205.setTransform(279.875,-37.925);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#2C3E50").s().p("AgkA7IAAh0IARAAIABAJQAJgKANAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgNAAgIgJIAAAogAgRghIAAAkQAFAKAMAAQAIAAAFgHQAFgGAAgPQAAgNgFgHQgFgIgIAAQgMAAgFAKg");
	this.shape_206.setTransform(271.225,-36.375);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#2C3E50").s().p("AgbAlQgIgIAAgKQAAgOAKgGQAKgHASAAIALAAIAAgGQAAgGgDgEQgEgEgHAAQgGAAgEADQgEADAAAFIgTAAQAAgHAEgGQAFgGAIgDQAIgEAIAAQAPAAAJAIQAJAHAAAOIAAAlQAAALADAHIAAABIgTAAIgCgIQgJAKgMAAQgNAAgIgHgAgLAGQgFAEAAAHQAAAFADADQAEAEAGAAQAFAAAFgDQAFgDACgEIAAgQIgKAAQgKAAgFADg");
	this.shape_207.setTransform(262.225,-37.925);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#2C3E50").s().p("AgbAxQgJgMAAgVQAAgSAJgMQAJgMAQAAQAMAAAIAKIAAgsIATAAIAAB3IgRAAIgBgIQgJAKgMAAQgPAAgKgMgAgMgDQgFAGAAAPQAAANAFAHQAFAHAIAAQAMAAAFgKIAAgjQgFgKgMAAQgIAAgFAHg");
	this.shape_208.setTransform(253.15,-39.625);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#2C3E50").s().p("AgHApQgDgDAAgFQAAgEADgDQADgDAEAAQAFAAADADQADADAAAEQAAAFgDADQgDADgFAAQgEAAgDgDgAgHgZQgDgCAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_209.setTransform(221.525,-37.975);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#2C3E50").s().p("AgNA9IAAhGIgMAAIAAgOIAMAAIAAgIQAAgOAIgHQAHgIAOAAIALACIAAAOIgIAAQgOAAAAAOIAAAHIARAAIAAAOIgRAAIAABGg");
	this.shape_210.setTransform(191.55,-39.775);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#2C3E50").s().p("AgJA6IAAhTIASAAIAABTgAgHgoQgDgDAAgEQAAgFADgCQADgDAEAAQAFAAADADQADACAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_211.setTransform(186.525,-39.525);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#2C3E50").s().p("AgJAdIAAgvIgOAAIAAgOIAOAAIAAgUIASAAIAAAUIAPAAIAAAOIgPAAIAAAuQAAAFACADQACACAFAAIAGgBIAAAPIgMABQgVAAAAgYg");
	this.shape_212.setTransform(181.625,-38.875);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#2C3E50").s().p("AAPA8IgYgkIgIAIIAAAcIgTAAIAAh3IATAAIAABEIAFgHIAXgZIAXAAIgfAiIAiAxg");
	this.shape_213.setTransform(175.5,-39.7);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#2C3E50").s().p("AgbAjQgHgIAAgQIAAg1IATAAIAAA1QAAAQANAAQANABAFgKIAAg8IATAAIAABUIgSAAIAAgJQgJAKgPAAQgNAAgHgIg");
	this.shape_214.setTransform(166.35,-37.85);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#2C3E50").s().p("AgaAxQgKgMAAgVQAAgSAJgMQAKgMAOAAQANAAAJAKIAAgsIASAAIAAB3IgRAAIgBgIQgIAKgOAAQgPAAgIgMgAgMgDQgFAGAAAPQAAANAFAHQAFAHAIAAQAMAAAGgKIAAgjQgGgKgLAAQgJAAgFAHg");
	this.shape_215.setTransform(157.15,-39.625);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#2C3E50").s().p("AgcAgQgLgMABgUIAAAAQAAgMAEgKQAFgKAJgFQAKgGAKAAQARAAAKALQALALABASIABAEQgBAMgFAKQgEAKgJAFQgJAGgMAAQgRAAgLgMgAgOgUQgFAHgBAOQABANAFAHQAGAIAIAAQAJAAAGgIQAGgHAAgOQAAgNgGgHQgGgIgJAAQgIAAgGAIg");
	this.shape_216.setTransform(148.3,-37.925);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#2C3E50").s().p("AgVArIAAhTIASAAIABAJQAFgLANAAIAGABIAAASIgHgBQgOAAgDAKIAAA5g");
	this.shape_217.setTransform(141.275,-38);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#2C3E50").s().p("AgkA7IAAh0IARAAIABAJQAJgKANAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgNAAgIgJIAAAogAgRghIAAAkQAFAKAMAAQAIAAAFgHQAFgGAAgPQAAgNgFgHQgFgIgIAAQgMAAgFAKg");
	this.shape_218.setTransform(133.775,-36.375);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#2C3E50").s().p("AgZAgQgLgLAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAKAAQARAAAKALQAJALAAAUIAAAHIg2AAQABAKAGAHQAGAGAIAAQANAAAJgLIAKAKQgFAHgJAFQgIAEgLAAQgRAAgLgMgAgLgWQgEAFgCAKIAjAAIAAgBQAAgKgFgFQgEgFgIAAQgHAAgFAGg");
	this.shape_219.setTransform(124.875,-37.925);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#2C3E50").s().p("AgVArIAAhTIASAAIABAJQAFgLANAAIAGABIAAASIgHgBQgOAAgDAKIAAA5g");
	this.shape_220.setTransform(118.025,-38);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#2C3E50").s().p("AgbAjQgHgIAAgQIAAg1IATAAIAAA1QAAAQANAAQANABAFgKIAAg8IATAAIAABUIgSAAIgBgJQgIAKgPAAQgNAAgHgIg");
	this.shape_221.setTransform(85.2,-37.85);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#2C3E50").s().p("AgaAxQgKgMAAgVQAAgSAJgMQAJgMAQAAQAMAAAIAKIAAgsIATAAIAAB3IgRAAIgBgIQgIAKgNAAQgQAAgIgMgAgMgDQgFAGAAAPQAAANAFAHQAFAHAIAAQAMAAAFgKIAAgjQgFgKgMAAQgIAAgFAHg");
	this.shape_222.setTransform(76,-39.625);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#2C3E50").s().p("AgJA6IAAhTIASAAIAABTgAgHgoQgDgDAAgEQAAgFADgCQADgDAEAAQAFAAADADQADACAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_223.setTransform(69.675,-39.525);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#2C3E50").s().p("AgHAqIgehTIAUAAIARA7IASg7IAUAAIgeBTg");
	this.shape_224.setTransform(63.625,-37.925);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#2C3E50").s().p("AgJA6IAAhTIASAAIAABTgAgHgoQgDgDAAgEQAAgFADgCQADgDAEAAQAFAAADADQADACAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_225.setTransform(57.675,-39.525);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#2C3E50").s().p("AgbAxQgJgMAAgVQAAgSAJgMQAKgMAOAAQANAAAJAKIAAgsIASAAIAAB3IgRAAIgBgIQgJAKgNAAQgOAAgKgMgAgMgDQgFAGAAAPQAAANAFAHQAFAHAIAAQAMAAAGgKIAAgjQgGgKgLAAQgJAAgFAHg");
	this.shape_226.setTransform(50.85,-39.625);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#2C3E50").s().p("AAQArIAAg2QAAgIgDgDQgEgFgIAAQgLAAgFALIAAA7IgTAAIAAhTIASAAIAAAJQAKgLAOAAQAbAAAAAeIAAA3g");
	this.shape_227.setTransform(42.1,-38);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#2C3E50").s().p("AgJA6IAAhTIASAAIAABTgAgHgoQgDgDAAgEQAAgFADgCQADgDAEAAQAFAAADADQADACAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_228.setTransform(35.625,-39.525);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#2C3E50").s().p("AgdA+IAsh7IAPAAIgsB7g");
	this.shape_229.setTransform(30.2,-38.875);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#2C3E50").s().p("AgZAgQgLgLAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAKAAQARAAAKALQAJALAAAUIAAAHIg2AAQABAKAGAHQAGAGAIAAQANAAAJgLIAKAKQgFAHgJAFQgIAEgLAAQgRAAgLgMgAgLgWQgEAFgCAKIAjAAIAAgBQAAgKgFgFQgEgFgIAAQgHAAgFAGg");
	this.shape_230.setTransform(22.975,-37.925);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#2C3E50").s().p("AAPA8IgYgkIgIAIIAAAcIgTAAIAAh3IATAAIAABEIAFgHIAXgZIAXAAIgfAiIAiAxg");
	this.shape_231.setTransform(14.95,-39.7);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#2C3E50").s().p("AgbAgQgMgMAAgUIAAAAQABgMAEgKQAFgKAKgFQAIgGALAAQARAAALALQALALAAASIAAAEQAAAMgEAKQgGAKgIAFQgJAGgMAAQgRAAgKgMgAgOgUQgGAHABAOQgBANAGAHQAGAIAIAAQAKAAAFgIQAFgHAAgOQAAgNgFgHQgFgIgKAAQgIAAgGAIg");
	this.shape_232.setTransform(5.7,-37.925);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#2C3E50").s().p("AgJAdIAAgvIgOAAIAAgOIAOAAIAAgUIASAAIAAAUIAPAAIAAAOIgPAAIAAAuQAAAFACADQACACAFAAIAGgBIAAAPIgMABQgVAAAAgYg");
	this.shape_233.setTransform(-1.675,-38.875);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#2C3E50").s().p("AgJA6IAAhTIASAAIAABTgAgHgoQgDgDAAgEQAAgFADgCQADgDAEAAQAFAAADADQADACAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_234.setTransform(-6.175,-39.525);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#2C3E50").s().p("AgkA7IAAh0IARAAIABAJQAJgKANAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgNAAgIgJIAAAogAgRghIAAAkQAFAKAMAAQAIAAAFgHQAFgGAAgPQAAgNgFgHQgFgIgIAAQgMAAgFAKg");
	this.shape_235.setTransform(-12.575,-36.375);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#2C3E50").s().p("AgkA5IAAhxIBJAAIAAAQIg1AAIAAAfIAtAAIAAAPIgtAAIAAAjIA1AAIAAAQg");
	this.shape_236.setTransform(-21.425,-39.375);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.678,0,0,3.868,-208.7,-168.2)).s().p("EggoAaSMAAAg0jMBBRAAAMAAAA0jg");
	this.shape_237.setTransform(133.475,58.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop7G4, new cjs.Rectangle(-75.4,-110,417.79999999999995,336.4), null);


(lib.drop7G3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgTAcQgJgDgFgEQgGgFAAgFIAWAAQAAAFAFACQAGADAHAAQAIgBAFgCQAEgCAAgCQAAgEgFgCQgEgCgKgBQgLgCgHgCQgQgDAAgKQAAgHAKgGQAKgEAQAAQAQAAALAEQALAGAAAIIgWAAQAAgEgFgCQgEgCgHAAQgHAAgEABQgEADAAADQAAADADABIAQAEQANABAHADQAHACAEADQADADABAFQAAAHgLAFQgLAFgRABQgLAAgJgDg");
	this.shape.setTransform(195.85,53.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgeAZQgIgGAAgLIAAglIAVAAIAAAlQAAALAPAAQAPABAFgIIAAgpIAVAAIAAA6IgUAAIAAgGQgKAHgQAAQgPAAgIgFg");
	this.shape_1.setTransform(186.225,53.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgJAqIAAhTIAUAAIAABTg");
	this.shape_2.setTransform(178.95,52.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgfAZQgJgEAAgIQAAgJALgFQAMgEAUAAIANAAIAAgFQAAgEgEgDQgEgCgIAAQgHAAgFABQgEADAAAEIgWAAQAAgFAFgEQAGgFAJgDQAIgBAKAAQARAAAKAEQAKAGAAAJIAAAaQAAAIAEAEIAAACIgWAAIgCgGQgLAHgNAAQgPgBgJgFgAgNAFQgFACAAAFQAAADAEACQAEADAHAAQAFAAAGgCQAFgCADgDIAAgLIgMAAQgLAAgGADg");
	this.shape_3.setTransform(171.775,53.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AASAqIAAgmQAAgFgEgCQgEgDgJAAQgMgBgGAHIAAAqIgWAAIAAhTIAWAAIAAAfQALgHAOAAQAfAAABAVIAAAmg");
	this.shape_4.setTransform(161.9,52.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AASAqIAAgmQAAgFgEgCQgFgDgIAAQgMgBgGAHIAAAqIgVAAIAAhTIAVAAIAAAfQALgHAOAAQAfAAABAVIAAAmg");
	this.shape_5.setTransform(147.4,52.55);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgfAZQgJgEAAgIQAAgJALgFQAMgEAUAAIANAAIAAgFQAAgEgEgDQgEgCgIAAQgHAAgFABQgEADAAAEIgWAAQAAgFAFgEQAGgFAJgDQAIgBAKAAQARAAAKAEQAKAGAAAJIAAAaQAAAIAEAEIAAACIgWAAIgCgGQgLAHgNAAQgPgBgJgFgAgNAFQgFACAAAFQAAADAEACQAEADAHAAQAFAAAGgCQAFgCADgDIAAgLIgMAAQgLAAgGADg");
	this.shape_6.setTransform(137.525,53.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgYAeIAAg6IAUAAIABAGQAGgHAPAAIAHAAIAAANIgJAAQgOgBgFAIIAAAng");
	this.shape_7.setTransform(129.9,53.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgfAZQgJgEAAgIQAAgJALgFQAMgEAUAAIANAAIAAgFQAAgEgEgDQgEgCgIAAQgHAAgFABQgEADAAAEIgWAAQAAgFAFgEQAGgFAJgDQAIgBAKAAQARAAAKAEQAKAGAAAJIAAAaQAAAIAEAEIAAACIgWAAQgBgCgBgEQgLAHgNAAQgPgBgJgFgAgNAFQgFACAAAFQAAADAEACQAEADAHAAQAFAAAGgCQAFgCADgDIAAgLIgMAAQgLAAgGADg");
	this.shape_8.setTransform(121.425,53.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgeAiQgLgIAAgPQAAgMAKgIQALgJARABQAOAAAJAGIAAgfIAWAAIAABUIgUAAIgBgGQgJAGgPABQgRAAgKgJgAgOgBQgFAEAAAJQAAAKAFAFQAGAFAJAAQANAAAGgHIAAgZQgGgHgNAAQgJAAgGAGg");
	this.shape_9.setTransform(111.275,52.6);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AASAqIAAgmQAAgFgEgCQgFgDgIAAQgMgBgGAHIAAAqIgVAAIAAhTIAVAAIAAAfQAKgHAPAAQAfAAABAVIAAAmg");
	this.shape_10.setTransform(96.9,52.55);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgeAZQgIgGAAgLIAAglIAVAAIAAAlQAAALAPAAQAPABAFgIIAAgpIAVAAIAAA6IgUAAIAAgGQgKAHgQAAQgPAAgIgFg");
	this.shape_11.setTransform(86.875,53.85);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgJAqIAAhTIATAAIAABTg");
	this.shape_12.setTransform(79.6,52.55);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgeAZQgIgGAAgLIAAglIAVAAIAAAlQAAALAPAAQAPABAFgIIAAgpIAVAAIAAA6IgUAAIAAgGQgKAHgQAAQgPAAgIgFg");
	this.shape_13.setTransform(72.275,53.85);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgUAjIgCAHIgTAAIAAhUIAWAAIAAAfQAJgGAOAAQASgBAKAJQAKAHAAAOIAAAAQAAAOgKAJQgKAHgRABQgQAAgJgIgAgTAAIAAAYQAFAIAOAAQAJAAAGgFQAFgEAAgKIAAgCQAAgJgFgEQgGgFgJAAQgOAAgFAHg");
	this.shape_14.setTransform(62.425,52.6);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AAuAeIAAglQAAgGgEgCQgEgDgJAAQgHAAgFACQgFADgBAEIAAAnIgVAAIAAgmQAAgLgRABQgNgBgFAHIAAAqIgVAAIAAg6IAUAAIAAAGQAKgHASAAQASAAAHAJQAKgJATAAQAQAAAIAFQAHAFAAALIAAAmg");
	this.shape_15.setTransform(49.325,53.75);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgcAXQgNgJAAgNIAAgBQAAgIAGgHQAFgHAKgEQAKgDALAAQAUAAAKAHQALAIAAAOIAAAEIg9AAQABAIAGADQAHAFAKAAQAOAAAKgHIALAGQgFAGgKACQgKAEgLAAQgUgBgMgHgAgMgPQgGADgBAIIAoAAIAAgBQgBgHgFgEQgFgDgJAAQgIAAgFAEg");
	this.shape_16.setTransform(36.775,53.8);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgpApIAAhQIAUAAIABAGQAKgHAOAAQASAAAKAIQAKAIAAAOIAAABQAAANgLAIQgJAIgRAAQgPAAgJgHIAAAcgAgTgXIAAAZQAGAHANAAQAJAAAGgFQAFgEAAgKQABgJgGgFQgGgGgJAAQgNAAgGAHg");
	this.shape_17.setTransform(26.95,54.875);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgUAnQgLgDgFgEIAKgIQALAHAOAAQAJAAAHgEQAFgDAAgHIAAgEQgIAGgPAAQgQAAgLgIQgLgIAAgOQAAgNALgJQAKgIASAAQAOAAAKAHIABgGIATAAIAAA4QAAAMgMAHQgLAHgTAAQgLAAgJgDgAgOgZQgFAFAAAKQAAAJAFAEQAGAGAJAAQAOAAAFgHIAAgZQgFgHgOAAQgJAAgGAFg");
	this.shape_18.setTransform(240.8,39.025);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AASAeIAAgmQAAgFgEgDQgEgCgJAAQgMAAgGAHIAAApIgVAAIAAg6IAUAAIABAHQAKgIAQAAQAeAAAAAVIAAAmg");
	this.shape_19.setTransform(230.9,37.85);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgeAZQgIgGAAgLIAAglIAVAAIAAAlQAAALAPAAQAPAAAFgGIAAgqIAVAAIAAA6IgUAAIAAgGQgKAHgQAAQgPAAgIgFg");
	this.shape_20.setTransform(220.875,37.95);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgeAiQgLgIAAgOQAAgNAKgJQALgHARgBQAOABAJAGIAAgeIAWAAIAABTIgUAAIgBgHQgJAIgPAAQgRgBgKgIgAgOgBQgFADAAALQAAAIAFAGQAGAFAJAAQANAAAGgIIAAgYQgGgHgNAAQgJAAgGAGg");
	this.shape_21.setTransform(210.625,36.7);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AASAeIAAgmQAAgFgEgDQgEgCgJAAQgMAAgGAHIAAApIgVAAIAAg6IAUAAIAAAHQALgIAQAAQAeAAAAAVIAAAmg");
	this.shape_22.setTransform(200.75,37.85);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgfAZQgJgFAAgHQAAgJALgFQAMgEAUAAIANAAIAAgFQAAgEgEgDQgEgDgIAAQgHAAgFADQgEACAAADIgWAAQAAgEAFgFQAGgEAJgDQAIgCAKAAQARAAAKAGQAKAFAAAJIAAAaQAAAIAEAFIAAABIgWAAIgCgGQgLAGgNABQgPAAgJgGgAgNAEQgFADAAAFQAAADAEADQAEACAHAAQAFAAAGgCQAFgCADgDIAAgLIgMAAQgLAAgGACg");
	this.shape_23.setTransform(190.875,37.9);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgUAnQgKgDgGgEIAKgIQAKAHAPAAQAJAAAHgEQAFgDABgHIAAgEQgKAGgOAAQgRAAgKgIQgLgIAAgOQAAgNALgJQAKgIASAAQAPAAAJAHIABgGIATAAIAAA4QAAAMgLAHQgMAHgTAAQgKAAgKgDgAgNgZQgHAFAAAKQAAAJAHAEQAFAGAJAAQANAAAHgHIAAgZQgHgHgNAAQgJAAgFAFg");
	this.shape_24.setTransform(180.7,39.025);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AASAeIAAgmQAAgFgEgDQgEgCgJAAQgMAAgGAHIAAApIgVAAIAAg6IAUAAIAAAHQALgIAQAAQAeAAABAVIAAAmg");
	this.shape_25.setTransform(170.8,37.85);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgcAWQgNgHAAgNIAAgCQAAgIAGgHQAFgHAKgEQAKgDALgBQAUAAAKAIQALAHAAAPIAAAEIg9AAQABAHAGAEQAHAFAKAAQAOAAAKgIIALAIQgFAFgKADQgKACgLABQgUAAgMgJgAgMgPQgGAEgBAGIAoAAIAAAAQgBgHgFgDQgFgEgJAAQgIAAgFAEg");
	this.shape_26.setTransform(161.075,37.9);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AAuAeIAAgmQAAgFgEgDQgEgCgJAAQgHgBgFADQgFADgBAEIAAAnIgVAAIAAgmQAAgKgRAAQgNAAgFAGIAAAqIgVAAIAAg6IAUAAIAAAGQAKgHASAAQASAAAHAJQAKgJATAAQAQAAAIAFQAHAFAAALIAAAmg");
	this.shape_27.setTransform(148.325,37.85);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgfAZQgJgFAAgHQAAgJALgFQAMgEAUAAIANAAIAAgFQAAgEgEgDQgEgDgIAAQgHAAgFADQgEACAAADIgWAAQAAgEAFgFQAGgEAJgDQAIgCAKAAQARAAAKAGQAKAFAAAJIAAAaQAAAIAEAFIAAABIgWAAIgCgGQgLAGgNABQgPAAgJgGgAgNAEQgFADAAAFQAAADAEADQAEACAHAAQAFAAAGgCQAFgCADgDIAAgLIgMAAQgLAAgGACg");
	this.shape_28.setTransform(99.025,37.9);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgJApIAAg6IATAAIAAA6gAgIgcQgDgCAAgDQAAgDADgCQADgCAFAAQAGAAADACQADACAAADQAAADgDACQgDACgGAAQgFAAgDgCg");
	this.shape_29.setTransform(91.85,36.775);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgeAiQgLgIAAgOQAAgNAKgJQALgHARgBQAOABAJAGIAAgeIAWAAIAABTIgUAAIgBgHQgJAIgPAAQgRgBgKgIgAgOgBQgFADAAALQAAAIAFAGQAGAFAJAAQANAAAGgIIAAgYQgGgHgNAAQgJAAgGAGg");
	this.shape_30.setTransform(84.275,36.7);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgfAWQgMgIAAgOIAAAAQAAgIAFgHQAGgHAKgEQAKgDAMgBQATAAAMAIQAMAHABANIAAADQAAAIgFAHQgGAHgKAEQgKADgNABQgTAAgMgJgAgQgOQgGAGAAAJQAAAIAGAGQAGAFAKAAQALAAAGgFQAGgGAAgJQAAgIgGgGQgHgFgKAAQgKAAgGAFg");
	this.shape_31.setTransform(74.325,37.9);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgpApIAAhQIAUAAIABAGQAKgHAOAAQASAAAKAIQAKAIAAAOIAAABQAAANgLAIQgJAIgRAAQgPAAgJgHIAAAcgAgTgXIAAAZQAGAHANAAQAJAAAGgFQAFgEAAgKQABgJgGgFQgGgGgJAAQgNAAgGAHg");
	this.shape_32.setTransform(64.3,38.975);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgfAZQgJgFAAgHQAAgJALgFQAMgEAUAAIANAAIAAgFQAAgEgEgDQgEgDgIAAQgHAAgFADQgEACAAADIgWAAQAAgEAFgFQAGgEAJgDQAIgCAKAAQARAAAKAGQAKAFAAAJIAAAaQAAAIAEAFIAAABIgWAAIgCgGQgLAGgNABQgPAAgJgGgAgNAEQgFADAAAFQAAADAEADQAEACAHAAQAFAAAGgCQAFgCADgDIAAgLIgMAAQgLAAgGACg");
	this.shape_33.setTransform(54.175,37.9);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgYAeIAAg6IAUAAIABAHQAGgIAPAAIAHABIgBAMIgIgBQgOAAgFAIIAAAng");
	this.shape_34.setTransform(46.55,37.85);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgfAZQgJgFAAgHQAAgJALgFQAMgEAUAAIANAAIAAgFQAAgEgEgDQgEgDgIAAQgHAAgFADQgEACAAADIgWAAQAAgEAFgFQAGgEAJgDQAIgCAKAAQARAAAKAGQAKAFAAAJIAAAaQAAAIAEAFIAAABIgWAAIgCgGQgLAGgNABQgPAAgJgGgAgNAEQgFADAAAFQAAADAEADQAEACAHAAQAFAAAGgCQAFgCADgDIAAgLIgMAAQgLAAgGACg");
	this.shape_35.setTransform(38.075,37.9);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgvAoIAAhPIAwAAQAWAAAMAHQANAHAAAMQAAALgMAGQgNAGgWAAIgaAAIAAAegAgZAAIAaAAQAMAAAGgDQAHgEAAgGQAAgHgHgEQgGgDgLgBIgbAAg");
	this.shape_36.setTransform(27.775,36.875);

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
	this.shape.graphics.f("#2C3E50").s().p("AgWBBQAMgIAIgRQAGgRAAgWIAAgBQAAgUgFgQQgHgRgLgJIgDgDIAEgJQAKAEAJALQAKAMAGAOQAEAOABAPIAAAFQAAAPgEAPQgFAPgLAMQgJAMgLAFg");
	this.shape.setTransform(172.3,94.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgcAiQgJgHAAgKQAAgMALgGQAKgHATAAIAMAAIAAgFQAAgGgEgDQgEgEgHAAQgHAAgEADQgEADAAAEIgUAAQAAgGAFgFQAFgGAIgDQAIgDAJAAQAQAAAJAHQAJAGABANIAAAiQAAAKADAHIAAABIgUAAQgCgCgBgGQgJAJgNAAQgNAAgIgGgAgMAGQgFADAAAGQAAAFAEADQAEADAGAAQAFAAAFgCQAFgDADgEIAAgPIgLAAQgKAAgGAEg");
	this.shape_1.setTransform(165.175,94.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgTAuIgBAJIgSAAIAAhuIAUAAIAAAoQAJgJANAAQAQAAAKALQAJALAAASIAAABQAAASgJAKQgJALgRAAQgOAAgJgKgAgSAAIAAAfQAGAKAMAAQAJAAAFgFQAFgHAAgMIAAgCQAAgNgFgFQgFgHgJABQgNAAgFAJg");
	this.shape_2.setTransform(156.075,93);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgcAiQgJgHAAgKQAAgMALgGQAKgHATAAIAMAAIAAgFQAAgGgEgDQgEgEgHAAQgHAAgEADQgEADAAAEIgUAAQAAgGAFgFQAFgGAIgDQAIgDAJAAQAQAAAJAHQAJAGABANIAAAiQAAAKADAHIAAABIgUAAQgCgCgBgGQgJAJgNAAQgNAAgIgGgAgMAGQgFADAAAGQAAAFAEADQAEADAGAAQAFAAAFgCQAFgDADgEIAAgPIgLAAQgKAAgGAEg");
	this.shape_3.setTransform(146.675,94.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgWAoIAAhNIATAAIAAAIQAGgKANAAIAHABIAAARIgIgBQgOAAgDAKIAAA0g");
	this.shape_4.setTransform(139.575,94.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgaAeQgMgLAAgRIAAgCQAAgLAFgJQAFgJAJgFQAKgFAKAAQASAAAKAKQAKAKAAASIAAAGIg5AAQABAKAGAGQAHAFAIAAQAOAAAJgJIAKAJQgFAHgJADQgJAEgLAAQgSAAgLgKgAgLgUQgFAFgCAJIAlAAIAAgCQgBgIgEgFQgFgEgIAAQgHAAgFAFg");
	this.shape_5.setTransform(131.875,94.575);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgmA2IAAhqIATAAIAAAHQAJgJAOAAQAQAAAKALQAJALAAATIAAABQAAARgKAKQgJALgQAAQgNAAgJgJIAAAlgAgSgeIAAAhQAGAJAMAAQAIAAAGgGQAFgHAAgNQAAgLgFgIQgGgGgIAAQgMAAgGAJg");
	this.shape_6.setTransform(122.725,96);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgKAbIAAgrIgOAAIAAgNIAOAAIAAgTIATAAIAAATIAQAAIAAANIgQAAIAAAqQAAAEACACQACACAFAAIAHAAIAAAOIgNABQgWAAAAgWg");
	this.shape_7.setTransform(110.675,93.7);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgcAiQgJgHAAgKQAAgMALgGQAKgHATAAIAMAAIAAgFQAAgGgEgDQgEgEgHAAQgHAAgEADQgEADAAAEIgUAAQAAgGAFgFQAFgGAIgDQAIgDAJAAQAQAAAJAHQAJAGABANIAAAiQAAAKADAHIAAABIgUAAQgCgCgBgGQgJAJgNAAQgNAAgIgGgAgMAGQgFADAAAGQAAAFAEADQAEADAGAAQAFAAAFgCQAFgDADgEIAAgPIgLAAQgKAAgGAEg");
	this.shape_8.setTransform(103.575,94.575);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgJA3IAAhtIATAAIAABtg");
	this.shape_9.setTransform(96.95,92.925);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgcAiQgJgHAAgKQAAgMALgGQAKgHATAAIAMAAIAAgFQAAgGgEgDQgEgEgHAAQgHAAgEADQgEADAAAEIgUAAQAAgGAFgFQAFgGAIgDQAIgDAJAAQAQAAAJAHQAJAGABANIAAAiQAAAKADAHIAAABIgUAAQgCgCgBgGQgJAJgNAAQgNAAgIgGgAgMAGQgFADAAAGQAAAFAEADQAEADAGAAQAFAAAFgCQAFgDADgEIAAgPIgLAAQgKAAgGAEg");
	this.shape_10.setTransform(90.275,94.575);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgJA2IAAhNIATAAIAABNgAgHglQgDgDAAgDQAAgEADgDQADgCAEAAQAGAAACACQADADAAAEQAAADgDADQgCADgGAAQgEAAgDgDg");
	this.shape_11.setTransform(79.425,93.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgcAiQgJgHAAgKQAAgMALgGQAKgHATAAIAMAAIAAgFQAAgGgEgDQgEgEgHAAQgHAAgEADQgEADAAAEIgUAAQAAgGAFgFQAFgGAIgDQAIgDAJAAQAQAAAJAHQAJAGABANIAAAiQAAAKADAHIAAABIgUAAQgCgCgBgGQgJAJgNAAQgNAAgIgGgAgMAGQgFADAAAGQAAAFAEADQAEADAGAAQAFAAAFgCQAFgDADgEIAAgPIgLAAQgKAAgGAEg");
	this.shape_12.setTransform(72.775,94.575);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgTAzQgJgDgFgGIAJgKQAKAJANAAQAJAAAFgFQAGgEAAgJIAAgGQgJAJgNAAQgPAAgKgLQgKgLAAgSQAAgSAKgLQAKgLAPAAQAPAAAIAJIABgHIASAAIAABKQAAAPgKAJQgLAJgSAAQgJAAgKgEgAgNghQgFAHAAANQAAAMAFAGQAGAGAJAAQAMAAAFgJIAAghQgFgJgMAAQgJAAgGAHg");
	this.shape_13.setTransform(63.3,96.025);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgcAiQgJgHAAgKQAAgMALgGQAKgHATAAIAMAAIAAgFQAAgGgEgDQgEgEgHAAQgHAAgEADQgEADAAAEIgUAAQAAgGAFgFQAFgGAIgDQAIgDAJAAQAQAAAJAHQAJAGABANIAAAiQAAAKADAHIAAABIgUAAQgCgCgBgGQgJAJgNAAQgNAAgIgGgAgMAGQgFADAAAGQAAAFAEADQAEADAGAAQAFAAAFgCQAFgDADgEIAAgPIgLAAQgKAAgGAEg");
	this.shape_14.setTransform(54.225,94.575);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgTAuIgBAJIgSAAIAAhuIAUAAIAAAoQAJgJANAAQAQAAAKALQAJALAAASIAAABQAAASgJAKQgJALgRAAQgOAAgJgKgAgSAAIAAAfQAGAKAMAAQAJAAAFgFQAFgHAAgMIAAgCQAAgNgFgFQgFgHgJABQgNAAgFAJg");
	this.shape_15.setTransform(45.125,93);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgaAeQgMgLAAgRIAAgCQAAgLAFgJQAFgJAJgFQAKgFAKAAQASAAAKAKQAKAKAAASIAAAGIg5AAQABAKAGAGQAHAFAIAAQAOAAAJgJIAKAJQgFAHgJADQgJAEgLAAQgSAAgLgKgAgLgUQgFAFgCAJIAlAAIAAgCQgBgIgEgFQgFgEgIAAQgHAAgFAFg");
	this.shape_16.setTransform(35.875,94.575);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgSAlQgIgEgEgGQgFgGgBgHIAUAAQAAAGAFAEQAFADAHAAQAIAAAEgCQAEgDAAgEQAAgFgEgCQgEgDgKgCQgKgCgHgDQgOgFAAgMQAAgKAJgHQAKgGANAAQARAAAJAHQAKAGAAALIgUAAQAAgFgEgDQgEgDgIAAQgFAAgEACQgEADAAAEQAAAEADADQAFACAKACQAMACAHAEQAGACADAEQADAEAAAHQABAKgKAHQgKAGgQAAQgKAAgJgDg");
	this.shape_17.setTransform(26.9,94.575);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgWAoIAAhNIATAAIAAAJQAGgLANABIAHABIAAAQIgIgBQgOAAgDAKIAAA0g");
	this.shape_18.setTransform(228.525,73.6);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgcAiQgJgHAAgKQAAgMALgGQAKgHATAAIAMAAIAAgFQAAgGgEgDQgEgEgHAAQgHAAgEADQgEADAAAEIgUAAQAAgGAFgFQAFgGAIgDQAIgDAJAAQAQAAAJAHQAJAGABANIAAAiQAAAKADAHIAAABIgUAAQgCgCgBgGQgJAJgNAAQgNAAgIgGgAgMAGQgFADAAAGQAAAFAEADQAEADAGAAQAFAAAFgCQAFgDADgEIAAgPIgLAAQgKAAgGAEg");
	this.shape_19.setTransform(220.625,73.675);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgSAlQgIgEgEgGQgGgGAAgHIAUAAQABAGAEAEQAFADAHAAQAIAAAEgCQAEgDAAgEQAAgFgEgCQgEgDgKgCQgKgCgHgDQgOgFAAgMQgBgKAKgHQAKgGANAAQARAAAJAHQAKAGAAALIgUAAQAAgFgEgDQgEgDgIAAQgFAAgEACQgEADAAAEQAAAEADADQAEACALACQAMACAHAEQAGACADAEQADAEAAAHQAAAKgJAHQgKAGgQAAQgKAAgJgDg");
	this.shape_20.setTransform(211.75,73.675);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgcAiQgJgHAAgKQAAgMALgGQAKgHATAAIAMAAIAAgFQAAgGgEgDQgEgEgHAAQgHAAgEADQgEADAAAEIgUAAQAAgGAFgFQAFgGAIgDQAIgDAJAAQAQAAAJAHQAJAGABANIAAAiQAAAKADAHIAAABIgUAAQgCgCgBgGQgJAJgNAAQgNAAgIgGgAgMAGQgFADAAAGQAAAFAEADQAEADAGAAQAFAAAFgCQAFgDADgEIAAgPIgLAAQgKAAgGAEg");
	this.shape_21.setTransform(202.975,73.675);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AAQA3IgZghIgJAIIAAAZIgUAAIAAhtIAUAAIAAA/IAGgHIAYgXIAYAAIgiAfIAlAtg");
	this.shape_22.setTransform(194.6,72.025);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgKAaIAAgrIgOAAIAAgMIAOAAIAAgTIATAAIAAATIAQAAIAAAMIgQAAIAAArQAAAEACACQACACAFAAIAHAAIAAAOIgNABQgWAAAAgXg");
	this.shape_23.setTransform(131.575,72.8);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgcAgQgIgIAAgOIAAgwIAUAAIAAAwQAAAPAOAAQAOAAAFgJIAAg2IAUAAIAABMIgTAAIgBgIQgIAJgPAAQgPABgHgIg");
	this.shape_24.setTransform(124.325,73.75);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgTAuIgBAJIgSAAIAAhuIAUAAIAAApQAJgKANABQAQAAAKAKQAJAKAAASIAAABQAAATgJAKQgJALgRAAQgOAAgJgKgAgSAAIAAAfQAGALAMgBQAJAAAFgFQAFgHAAgMIAAgCQAAgNgFgFQgFgHgJAAQgNAAgFAKg");
	this.shape_25.setTransform(115.175,72.1);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AArAoIAAgyQAAgHgEgEQgDgEgJAAQgGAAgFAEQgEADgCAFIAAA1IgSAAIAAgzQgBgOgQAAQgLAAgGAJIAAA4IgUAAIAAhNIATAAIABAIQAJgJAQAAQARgBAHAMQAJgMASABQAPgBAGAIQAIAGAAAOIAAAzg");
	this.shape_26.setTransform(103,73.6);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgcAiQgJgHAAgKQAAgMALgGQAKgHATAAIAMAAIAAgFQAAgGgEgDQgEgEgHAAQgHAAgEADQgEADAAAEIgUAAQAAgGAFgFQAFgGAIgDQAIgDAJAAQAQAAAJAHQAJAGABANIAAAiQAAAKADAHIAAABIgUAAQgCgCgBgGQgJAJgNAAQgNAAgIgGgAgMAGQgFADAAAGQAAAFAEADQAEADAGAAQAFAAAFgCQAFgDADgEIAAgPIgLAAQgKAAgGAEg");
	this.shape_27.setTransform(91.225,73.675);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgWAoIAAhNIATAAIAAAJQAGgLANABIAHABIAAAQIgIgBQgOAAgDAKIAAA0g");
	this.shape_28.setTransform(84.125,73.6);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgeA5IAuhxIAPAAIgtBxg");
	this.shape_29.setTransform(77.325,72.775);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgKAaIAAgrIgOAAIAAgMIAOAAIAAgTIATAAIAAATIAQAAIAAAMIgQAAIAAArQAAAEACACQACACAFAAIAHAAIAAAOIgNABQgWAAAAgXg");
	this.shape_30.setTransform(71.225,72.8);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgcAgQgIgIAAgOIAAgwIAUAAIAAAwQAAAPAOAAQAOAAAFgJIAAg2IAUAAIAABMIgTAAIgBgIQgIAJgPAAQgPABgHgIg");
	this.shape_31.setTransform(63.975,73.75);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgTAzQgJgDgFgGIAKgKQAIAJAOAAQAJAAAFgFQAGgEAAgJIAAgGQgJAJgNAAQgPAAgKgLQgKgLAAgSQAAgSAKgLQAJgLAQAAQAOAAAKAJIAAgHIASAAIAABKQAAAPgKAJQgMAJgRAAQgKAAgJgEgAgNghQgFAHAAANQAAAMAFAGQAGAGAJAAQAMAAAFgJIAAghQgFgJgMAAQgJAAgGAHg");
	this.shape_32.setTransform(54.45,75.125);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AAQAoIAAgyQAAgHgDgDQgDgEgJgBQgLAAgGAKIAAA3IgUAAIAAhNIATAAIAAAJQALgKAOAAQAcgBAAAcIAAAzg");
	this.shape_33.setTransform(45.25,73.6);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgcAgQgIgIAAgOIAAgwIAUAAIAAAwQAAAPAOAAQAOAAAFgJIAAg2IAUAAIAABMIgTAAIgBgIQgIAJgPAAQgPABgHgIg");
	this.shape_34.setTransform(35.925,73.75);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgSAlQgIgEgEgGQgFgGgBgHIAUAAQAAAGAFAEQAFADAHAAQAIAAAEgCQAEgDAAgEQAAgFgEgCQgEgDgKgCQgKgCgHgDQgOgFAAgMQAAgKAJgHQAKgGANAAQARAAAJAHQAKAGAAALIgUAAQAAgFgEgDQgEgDgIAAQgFAAgEACQgEADAAAEQAAAEADADQAFACAKACQAMACAHAEQAGACADAEQADAEAAAHQABAKgKAHQgKAGgQAAQgKAAgJgDg");
	this.shape_35.setTransform(26.9,73.675);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgMAPIAHgMIABgJIAAgNIARAAIAAAMQAAAHgFAIQgDAHgHAFg");
	this.shape_36.setTransform(228.95,56.925);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgSAlQgIgEgEgGQgGgGAAgHIAUAAQABAGAEAEQAFADAHAAQAIAAAEgCQAEgDAAgEQAAgFgEgCQgEgDgKgCQgKgCgHgDQgOgFAAgMQgBgKAKgHQAKgGANAAQARAAAJAHQAKAGAAALIgUAAQAAgFgEgDQgEgDgIAAQgFAAgEACQgEADAAAEQAAAEADADQAEACALACQAMACAHAEQAGACADAEQADAEAAAHQAAAKgJAHQgKAGgQAAQgKAAgJgDg");
	this.shape_37.setTransform(223,52.725);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgcAgQgIgHAAgPIAAgwIAUAAIAAAwQAAAPAOAAQAOAAAFgJIAAg2IAUAAIAABMIgTAAIgBgHQgIAIgPABQgPAAgHgIg");
	this.shape_38.setTransform(214.125,52.8);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgWAoIAAhNIATAAIAAAIQAGgKANAAIAHABIAAARIgIgBQgOAAgDAJIAAA1g");
	this.shape_39.setTransform(206.925,52.65);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgWAoIAAhNIATAAIAAAIQAGgKANAAIAHABIAAARIgIgBQgOAAgDAJIAAA1g");
	this.shape_40.setTransform(201.025,52.65);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgJA2IAAhNIATAAIAABNgAgHglQgDgDAAgEQAAgDADgDQADgCAEgBQAGABACACQADADAAADQAAAEgDADQgCADgGAAQgEAAgDgDg");
	this.shape_41.setTransform(195.525,51.25);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgaAeQgLgLAAgTIAAAAQAAgSAKgLQAMgKARAAQAQAAAKAIQAJAIABANIgTAAQAAgHgEgEQgGgEgHAAQgIAAgGAGQgFAGAAAMIAAACQAAANAFAGQAFAGAJAAQAHAAAGgEQAEgDAAgGIATAAQAAAHgFAHQgFAGgIAEQgIADgKAAQgSAAgKgKg");
	this.shape_42.setTransform(189.15,52.725);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgeA5IAuhxIAPAAIgtBxg");
	this.shape_43.setTransform(181.225,51.825);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgSAlQgIgEgEgGQgFgGgBgHIAUAAQAAAGAFAEQAFADAHAAQAIAAAEgCQAEgDAAgEQAAgFgEgCQgEgDgKgCQgKgCgHgDQgPgFABgMQAAgKAJgHQAKgGAOAAQAQAAAJAHQAKAGAAALIgUAAQAAgFgEgDQgFgDgGAAQgGAAgEACQgEADAAAEQAAAEADADQAFACAKACQAMACAGAEQAHACADAEQADAEABAHQAAAKgKAHQgKAGgQAAQgKAAgJgDg");
	this.shape_44.setTransform(173.7,52.725);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgcAgQgIgHAAgPIAAgwIAUAAIAAAwQAAAPAOAAQAOAAAFgJIAAg2IAUAAIAABMIgTAAIgBgHQgIAIgPABQgPAAgHgIg");
	this.shape_45.setTransform(164.775,52.8);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgWAoIAAhNIATAAIAAAIQAGgKANAAIAHABIAAARIgIgBQgOAAgDAJIAAA1g");
	this.shape_46.setTransform(157.575,52.65);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AgJA2IAAhNIATAAIAABNgAgHglQgDgDAAgEQAAgDADgDQADgCAEgBQAGABACACQADADAAADQAAAEgDADQgCADgGAAQgEAAgDgDg");
	this.shape_47.setTransform(152.125,51.25);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgSAlQgIgEgEgGQgGgGAAgHIAUAAQABAGAEAEQAFADAHAAQAIAAAEgCQAEgDAAgEQAAgFgEgCQgEgDgKgCQgKgCgHgDQgOgFAAgMQgBgKAKgHQAKgGANAAQARAAAJAHQAKAGAAALIgUAAQAAgFgEgDQgEgDgIAAQgFAAgEACQgEADAAAEQAAAEADADQAEACALACQAMACAHAEQAGACADAEQADAEAAAHQAAAKgJAHQgKAGgQAAQgKAAgJgDg");
	this.shape_48.setTransform(145.6,52.725);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AAQAoIAAgyQABgHgEgEQgDgDgJAAQgLAAgGAJIAAA3IgUAAIAAhNIATAAIABAJQAJgLAPAAQAcABABAbIAAAzg");
	this.shape_49.setTransform(112.05,52.65);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgcAiQgJgHAAgKQAAgMALgGQAKgHATAAIAMAAIAAgFQAAgGgEgDQgEgEgHAAQgHAAgEADQgEADAAAEIgUAAQAAgGAFgFQAFgGAIgDQAIgDAJAAQAQAAAJAHQAJAGABANIAAAiQAAAKADAHIAAABIgUAAQgCgCgBgGQgJAJgNAAQgNAAgIgGgAgMAGQgFADAAAGQAAAFAEADQAEADAGAAQAFAAAFgCQAFgDADgEIAAgPIgLAAQgKAAgGAEg");
	this.shape_50.setTransform(102.875,52.725);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AgcAtQgKgLAAgTQAAgRAKgLQAJgKAQgBQANAAAJAJIAAgoIAUAAIAABuIgSAAIgBgJQgJAKgOAAQgQAAgJgLgAgNgDQgFAGAAAOQAAAMAFAGQAFAHAJgBQAMABAGgKIAAggQgGgJgMAAQgJAAgFAGg");
	this.shape_51.setTransform(93.475,51.15);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AgMAPIAGgMIACgJIAAgNIARAAIAAAMQAAAHgFAIQgEAHgFAFg");
	this.shape_52.setTransform(62.15,56.925);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AgcAiQgJgHAAgKQAAgMALgGQAKgHATAAIAMAAIAAgFQAAgGgEgDQgEgEgHAAQgHAAgEADQgEADAAAEIgUAAQAAgGAFgFQAFgGAIgDQAIgDAJAAQAQAAAJAHQAJAGABANIAAAiQAAAKADAHIAAABIgUAAQgCgCgBgGQgJAJgNAAQgNAAgIgGgAgMAGQgFADAAAGQAAAFAEADQAEADAGAAQAFAAAFgCQAFgDADgEIAAgPIgLAAQgKAAgGAEg");
	this.shape_53.setTransform(56.075,52.725);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgWAoIAAhNIATAAIAAAIQAGgKANAAIAHABIAAARIgIgBQgOAAgDAJIAAA1g");
	this.shape_54.setTransform(48.975,52.65);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgcAtQgKgLAAgTQAAgRAKgLQAJgKAQgBQANAAAJAJIAAgoIAUAAIAABuIgSAAIgBgJQgJAKgOAAQgQAAgJgLgAgNgDQgFAGAAAOQAAAMAFAGQAFAHAJgBQAMABAGgKIAAggQgGgJgMAAQgJAAgFAGg");
	this.shape_55.setTransform(40.775,51.15);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AAQAoIAAgyQAAgHgDgEQgEgDgIAAQgLAAgGAJIAAA3IgTAAIAAhNIASAAIABAJQAJgLAQAAQAbABABAbIAAAzg");
	this.shape_56.setTransform(31.6,52.65);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AgJA2IAAhNIATAAIAABNgAgHglQgDgDAAgEQAAgDADgDQADgCAEgBQAGABACACQADADAAADQAAAEgDADQgCADgGAAQgEAAgDgDg");
	this.shape_57.setTransform(24.775,51.25);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AgKAaIAAgrIgOAAIAAgMIAOAAIAAgTIATAAIAAATIAQAAIAAAMIgQAAIAAArQAAAEACADQACABAFAAIAHAAIAAAOIgNABQgWAAAAgXg");
	this.shape_58.setTransform(228.075,30.95);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgcAiQgJgHAAgKQAAgMALgGQAKgHATAAIAMAAIAAgFQAAgGgEgDQgEgEgHAAQgHAAgEADQgEADAAAEIgUAAQAAgGAFgFQAFgGAIgDQAIgDAJAAQAQAAAJAHQAJAGABANIAAAiQAAAKADAHIAAABIgUAAQgCgCgBgGQgJAJgNAAQgNAAgIgGgAgMAGQgFADAAAGQAAAFAEADQAEADAGAAQAFAAAFgCQAFgDADgEIAAgPIgLAAQgKAAgGAEg");
	this.shape_59.setTransform(220.975,31.825);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgJA3IAAhtIATAAIAABtg");
	this.shape_60.setTransform(214.35,30.175);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgcAiQgJgHAAgKQAAgMALgGQAKgHATAAIAMAAIAAgFQAAgGgEgDQgEgEgHAAQgHAAgEADQgEADAAAEIgUAAQAAgGAFgFQAFgGAIgDQAIgDAJAAQAQAAAJAHQAJAGABANIAAAiQAAAKADAHIAAABIgUAAQgCgCgBgGQgJAJgNAAQgNAAgIgGgAgMAGQgFADAAAGQAAAFAEADQAEADAGAAQAFAAAFgCQAFgDADgEIAAgPIgLAAQgKAAgGAEg");
	this.shape_61.setTransform(207.625,31.825);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AgMAPIAGgMQACgEAAgFIAAgNIARAAIAAAMQAAAHgFAIQgEAHgFAFg");
	this.shape_62.setTransform(185.1,36.025);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AgKAaIAAgrIgOAAIAAgMIAOAAIAAgTIATAAIAAATIAQAAIAAAMIgQAAIAAArQAAAEACADQACABAFAAIAHAAIAAAOIgNABQgWAAAAgXg");
	this.shape_63.setTransform(180.525,30.95);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AgcAgQgIgIAAgOIAAgwIAUAAIAAAwQAAAPAOAAQAOAAAFgJIAAg2IAUAAIAABMIgTAAIgBgIQgIAJgPAAQgPABgHgIg");
	this.shape_64.setTransform(173.275,31.9);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AgJA3IAAhtIATAAIAABtg");
	this.shape_65.setTransform(166.55,30.175);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AgcAgQgIgIAAgOIAAgwIAUAAIAAAwQAAAPAOAAQAOAAAFgJIAAg2IAUAAIAABMIgTAAIgBgIQgIAJgPAAQgPABgHgIg");
	this.shape_66.setTransform(159.725,31.9);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AArAoIAAgyQAAgHgEgEQgEgEgIAAQgHAAgEAEQgFADgBAFIAAA1IgSAAIAAgyQgBgPgPAAQgNAAgEAJIAAA4IgUAAIAAhNIATAAIAAAIQAJgJARAAQAQgBAGAMQAKgMARABQAQgBAHAIQAGAGABAPIAAAyg");
	this.shape_67.setTransform(147.8,31.75);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AgBA6QgKgLgFgPQgFgPAAgRQAAgQAFgPQAFgPAKgMQAIgMALgEIAEAKQgLAIgHAQQgHAPAAAVIAAAFQAAAWAGARQAHAQAMAKIgEAJQgLgEgIgNg");
	this.shape_68.setTransform(122.075,31.5);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2C3E50").s().p("AArAoIAAgyQAAgHgEgEQgDgEgJAAQgHAAgEAEQgFADgBAFIAAA1IgTAAIAAgyQAAgPgPAAQgMAAgFAJIAAA4IgVAAIAAhNIAUAAIAAAIQAJgJAQAAQARgBAGAMQAKgMARABQAPgBAIAIQAGAGAAAPIAAAyg");
	this.shape_69.setTransform(111.5,31.75);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2C3E50").s().p("AgcAgQgIgIAAgOIAAgwIAUAAIAAAwQAAAPAOAAQAOAAAFgJIAAg2IAUAAIAABMIgTAAIgBgIQgIAJgPAAQgPABgHgIg");
	this.shape_70.setTransform(99.575,31.9);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2C3E50").s().p("AgJA2IAAhNIATAAIAABNgAgHglQgDgCAAgEQAAgFADgCQADgDAEABQAGgBACADQADACAAAFQAAAEgDACQgCADgGAAQgEAAgDgDg");
	this.shape_71.setTransform(92.825,30.35);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2C3E50").s().p("AArAoIAAgyQAAgHgEgEQgEgEgIAAQgGAAgFAEQgEADgCAFIAAA1IgTAAIAAgyQAAgPgQAAQgMAAgFAJIAAA4IgUAAIAAhNIATAAIABAIQAJgJAQAAQARgBAHAMQAJgMASABQAPgBAGAIQAIAGgBAPIAAAyg");
	this.shape_72.setTransform(83.4,31.75);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#2C3E50").s().p("AgdAdQgLgLAAgSIAAAAQAAgLAFgJQAFgKAJgEQAKgFALAAQASAAALAKQALAKABARIAAADQAAALgFAJQgFAJgJAFQgKAFgMAAQgSAAgLgLgAgOgTQgGAHAAANQAAAMAGAHQAFAGAJAAQAKAAAGgHQAFgHABgMQAAgMgHgGQgFgHgKAAQgJAAgFAGg");
	this.shape_73.setTransform(71.45,31.825);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#2C3E50").s().p("AgKAaIAAgrIgOAAIAAgMIAOAAIAAgTIATAAIAAATIAQAAIAAAMIgQAAIAAArQAAAEACADQACABAFAAIAHAAIAAAOIgNABQgWAAAAgXg");
	this.shape_74.setTransform(63.675,30.95);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#2C3E50").s().p("AgSAlQgIgEgEgGQgGgGAAgHIAUAAQABAGAEAEQAFADAHAAQAIAAAEgCQAEgDAAgEQAAgFgEgCQgEgDgJgCQgLgCgHgDQgPgFAAgMQAAgKAKgHQAKgGANAAQAQAAAKAHQAKAGAAALIgUAAQAAgFgEgDQgEgDgIAAQgFAAgEACQgEADAAAEQAAAEAEADQADACALACQAMACAHAEQAGACAEAEQACAEAAAHQAAAKgJAHQgKAGgQAAQgKAAgJgDg");
	this.shape_75.setTransform(56.75,31.825);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#2C3E50").s().p("AgJA2IAAhNIATAAIAABNgAgHglQgDgCAAgEQAAgFADgCQADgDAEABQAGgBACADQADACAAAFQAAAEgDACQgCADgGAAQgEAAgDgDg");
	this.shape_76.setTransform(50.325,30.35);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#2C3E50").s().p("AgWAoIAAhNIATAAIAAAIQAGgKANABIAHAAIAAARIgIgBQgOAAgDAKIAAA0g");
	this.shape_77.setTransform(45.625,31.75);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#2C3E50").s().p("AgaAeQgMgLAAgRIAAgCQAAgLAFgJQAFgJAJgFQAKgFAKAAQASAAAKAKQAKAKAAASIAAAGIg5AAQABAKAGAGQAHAFAIAAQAOAAAJgJIAKAJQgFAHgJADQgJAEgLAAQgSAAgLgKgAgLgUQgFAFgCAJIAlAAIAAgCQgBgIgEgFQgFgEgIAAQgHAAgFAFg");
	this.shape_78.setTransform(37.925,31.825);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#2C3E50").s().p("AgrA0IAAhnIAsAAQAUAAAMAJQALAJABAPQAAAPgMAIQgMAIgUAAIgYAAIAAAngAgXAAIAYAAQALAAAGgFQAGgEAAgJQAAgIgGgFQgGgGgLAAIgYAAg");
	this.shape_79.setTransform(28.3,30.475);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#2C3E50").s().p("AgVBCQALgJAIgRQAGgRAAgWIAAgBQAAgTgFgRQgHgRgLgKIgCgCIADgJQAKAFAJALQAKALAGAOQAEAOACAPIAAAEQgBARgEAPQgFAOgLANQgJAMgLAEg");
	this.shape_80.setTransform(227.75,10.6);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#2C3E50").s().p("AgWAnIAAhMIATAAIAAAJQAGgKANAAIAHABIAAAQIgIgBQgOAAgDAKIAAAzg");
	this.shape_81.setTransform(222.575,10.85);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#2C3E50").s().p("AgdAdQgLgLAAgSIAAAAQAAgLAFgJQAFgKAJgEQAKgFALAAQASAAALAKQALAKABARIAAADQAAALgFAJQgFAJgKAFQgIAFgNAAQgRAAgMgLgAgPgTQgFAHAAANQAAAMAFAHQAGAGAJAAQAKAAAGgHQAGgHgBgMQAAgMgFgGQgGgHgKAAQgJAAgGAGg");
	this.shape_82.setTransform(214.5,10.925);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#2C3E50").s().p("AgSAlQgIgEgEgGQgGgGAAgHIAUAAQABAGAEAEQAFADAHAAQAIAAAEgCQAEgDAAgEQAAgFgEgCQgEgDgKgCQgKgCgHgDQgPgFAAgMQAAgKAKgHQAKgGANAAQAQAAAKAHQAKAGAAALIgUAAQAAgFgEgDQgEgDgIAAQgFAAgEACQgEADAAAEQAAAEAEADQADACALACQAMACAHAEQAGACAEAEQACAEAAAHQAAAKgJAHQgKAGgQAAQgKAAgJgDg");
	this.shape_83.setTransform(205.35,10.925);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#2C3E50").s().p("AARAnIAAgxQAAgHgEgDQgDgFgJAAQgLAAgGAKIAAA2IgTAAIAAhMIASAAIABAJQAKgKAPAAQAbAAABAbIAAAyg");
	this.shape_84.setTransform(196.5,10.85);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#2C3E50").s().p("AgaAeQgMgLAAgRIAAgCQAAgLAFgJQAFgJAJgFQAKgFAKAAQASAAAKAKQAKAKAAASIAAAGIg5AAQABAKAGAGQAHAFAIAAQAOAAAJgJIAKAJQgFAHgJADQgJAEgLAAQgSAAgLgKgAgLgUQgFAFgCAJIAlAAIAAgCQgBgIgEgFQgFgEgIAAQgHAAgFAFg");
	this.shape_85.setTransform(187.425,10.925);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#2C3E50").s().p("AgRAlQgJgEgFgGQgEgGAAgHIATAAQAAAGAFAEQAFADAHAAQAIAAAEgCQAEgDAAgEQAAgFgEgCQgFgDgIgCQgLgCgGgDQgPgFgBgMQAAgKAKgHQAKgGAOAAQAPAAALAHQAJAGAAALIgUAAQAAgFgEgDQgFgDgGAAQgGAAgEACQgEADAAAEQAAAEAEADQADACALACQAMACAGAEQAHACAEAEQADAEAAAHQAAAKgKAHQgKAGgQAAQgKAAgIgDg");
	this.shape_86.setTransform(178.5,10.925);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#2C3E50").s().p("AgTAzQgJgDgFgGIAJgKQAJAJAOAAQAJAAAGgFQAFgEAAgJIAAgGQgJAJgMAAQgQAAgKgLQgKgLAAgSQAAgSAKgLQAKgLAQAAQAOAAAIAJIABgHIASAAIAABKQAAAPgLAJQgKAJgSAAQgKAAgJgEgAgMghQgGAHAAANQAAAMAGAGQAFAGAIAAQAMAAAGgJIAAghQgGgJgMAAQgIAAgFAHg");
	this.shape_87.setTransform(143.7,12.375);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#2C3E50").s().p("AARAnIAAgxQgBgHgDgDQgEgFgIAAQgLAAgGAKIAAA2IgTAAIAAhMIASAAIAAAJQALgKAPAAQAbAAAAAbIAAAyg");
	this.shape_88.setTransform(134.5,10.85);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#2C3E50").s().p("AgcAiQgJgHAAgKQAAgMALgGQAKgHATAAIAMAAIAAgFQAAgGgEgDQgEgEgHAAQgHAAgEADQgEADAAAEIgUAAQAAgGAFgFQAFgGAIgDQAIgDAJAAQAQAAAJAHQAJAGABANIAAAiQAAAKADAHIAAABIgUAAQgCgCgBgGQgJAJgNAAQgNAAgIgGgAgMAGQgFADAAAGQAAAFAEADQAEADAGAAQAFAAAFgCQAFgDADgEIAAgPIgLAAQgKAAgGAEg");
	this.shape_89.setTransform(125.325,10.925);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#2C3E50").s().p("AgRAlQgJgEgFgGQgEgGAAgHIATAAQABAGAEAEQAFADAHAAQAIAAAEgCQAEgDAAgEQAAgFgEgCQgFgDgIgCQgLgCgGgDQgPgFgBgMQAAgKAKgHQAKgGAOAAQAPAAALAHQAJAGAAALIgUAAQAAgFgEgDQgFgDgGAAQgGAAgEACQgEADAAAEQAAAEAEADQADACALACQAMACAGAEQAHACAEAEQADAEAAAHQAAAKgKAHQgKAGgQAAQgKAAgIgDg");
	this.shape_90.setTransform(116.4,10.925);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#2C3E50").s().p("AgcAiQgJgHAAgKQAAgMALgGQAKgHATAAIAMAAIAAgFQAAgGgEgDQgEgEgHAAQgHAAgEADQgEADAAAEIgUAAQAAgGAFgFQAFgGAIgDQAIgDAJAAQAQAAAJAHQAJAGABANIAAAiQAAAKADAHIAAABIgUAAQgCgCgBgGQgJAJgNAAQgNAAgIgGgAgMAGQgFADAAAGQAAAFAEADQAEADAGAAQAFAAAFgCQAFgDADgEIAAgPIgLAAQgKAAgGAEg");
	this.shape_91.setTransform(107.625,10.925);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#2C3E50").s().p("AgmA3IAAhrIATAAIAAAIQAJgJAOAAQAQAAAKAKQAJALAAASIAAABQAAASgKAKQgJALgQAAQgNAAgJgIIAAAlgAgSgfIAAAiQAGAJAMAAQAIAAAGgHQAFgFAAgOQAAgLgFgIQgGgHgIAAQgMABgGAIg");
	this.shape_92.setTransform(98.525,12.35);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#2C3E50").s().p("AgaAeQgMgLAAgRIAAgCQAAgLAFgJQAFgJAJgFQAKgFAKAAQASAAAKAKQAKAKAAASIAAAGIg5AAQABAKAGAGQAHAFAIAAQAOAAAJgJIAKAJQgFAHgJADQgJAEgLAAQgSAAgLgKgAgLgUQgFAFgCAJIAlAAIAAgCQgBgIgEgFQgFgEgIAAQgHAAgFAFg");
	this.shape_93.setTransform(89.275,10.925);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#2C3E50").s().p("AgRAlQgJgEgFgGQgEgGAAgHIATAAQABAGAEAEQAFADAHAAQAIAAAEgCQAEgDAAgEQAAgFgEgCQgFgDgIgCQgLgCgGgDQgPgFgBgMQAAgKAKgHQAKgGAOAAQAPAAALAHQAJAGAAALIgUAAQAAgFgEgDQgFgDgGAAQgGAAgEACQgEADAAAEQAAAEAEADQAEACAKACQAMACAGAEQAHACADAEQAEAEAAAHQAAAKgKAHQgKAGgQAAQgKAAgIgDg");
	this.shape_94.setTransform(80.3,10.925);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#2C3E50").s().p("AAQAnIAAgxQABgHgEgDQgDgFgJAAQgLAAgGAKIAAA2IgUAAIAAhMIATAAIAAAJQAKgKAPAAQAcAAAAAbIAAAyg");
	this.shape_95.setTransform(45.8,10.85);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#2C3E50").s().p("AgcAiQgJgHAAgKQAAgMALgGQAKgHATAAIAMAAIAAgFQAAgGgEgDQgEgEgHAAQgHAAgEADQgEADAAAEIgUAAQAAgGAFgFQAFgGAIgDQAIgDAJAAQAQAAAJAHQAJAGABANIAAAiQAAAKADAHIAAABIgUAAQgCgCgBgGQgJAJgNAAQgNAAgIgGgAgMAGQgFADAAAGQAAAFAEADQAEADAGAAQAFAAAFgCQAFgDADgEIAAgPIgLAAQgKAAgGAEg");
	this.shape_96.setTransform(36.625,10.925);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#2C3E50").s().p("AgcAtQgKgLAAgTQAAgRAKgKQAJgLAQAAQANgBAJAJIAAgoIAUAAIAABtIgSAAIgBgHQgJAJgOAAQgQAAgJgLgAgNgCQgFAFAAANQAAAMAFAHQAFAGAJABQAMAAAGgKIAAggQgGgKgMAAQgJAAgFAIg");
	this.shape_97.setTransform(27.175,9.35);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#2C3E50").s().p("AgMAPIAGgMIACgJIAAgNIARAAIAAAMQAAAHgEAIQgFAHgFAFg");
	this.shape_98.setTransform(228.9,-5.775);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#2C3E50").s().p("AgcAiQgJgHAAgKQAAgMALgGQAKgHATAAIAMAAIAAgFQAAgGgEgDQgEgEgHAAQgHAAgEADQgEADAAAEIgUAAQAAgGAFgFQAFgGAIgDQAIgDAJAAQAQAAAJAHQAJAGABANIAAAiQAAAKADAHIAAABIgUAAQgCgCgBgGQgJAJgNAAQgNAAgIgGgAgMAGQgFADAAAGQAAAFAEADQAEADAGAAQAFAAAFgCQAFgDADgEIAAgPIgLAAQgKAAgGAEg");
	this.shape_99.setTransform(222.825,-9.975);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#2C3E50").s().p("AAQAnIAAgxQABgHgEgEQgDgEgJAAQgLAAgGAKIAAA2IgUAAIAAhMIATAAIAAAJQAKgLAPAAQAcAAAAAcIAAAyg");
	this.shape_100.setTransform(213.65,-10.05);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#2C3E50").s().p("AgaAeQgMgLAAgRIAAgCQAAgLAFgJQAFgJAJgFQAKgFAKAAQASAAAKAKQAKAKAAASIAAAGIg5AAQABAKAGAGQAHAFAIAAQAOAAAJgJIAKAJQgFAHgJADQgJAEgLAAQgSAAgLgKgAgLgUQgFAFgCAJIAlAAIAAgCQgBgIgEgFQgFgEgIAAQgHAAgFAFg");
	this.shape_101.setTransform(204.625,-9.975);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#2C3E50").s().p("AgKAbIAAgsIgOAAIAAgMIAOAAIAAgTIATAAIAAATIAQAAIAAAMIgQAAIAAArQAAAEACADQACACAFAAIAHgBIAAANIgNACQgWAAAAgWg");
	this.shape_102.setTransform(197.075,-10.85);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#2C3E50").s().p("AARAnIAAgxQgBgHgDgEQgEgEgIAAQgLAAgGAKIAAA2IgTAAIAAhMIASAAIAAAJQALgLAPAAQAbAAABAcIAAAyg");
	this.shape_103.setTransform(189.85,-10.05);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#2C3E50").s().p("AgcAiQgJgHAAgKQAAgMALgGQAKgHATAAIAMAAIAAgFQAAgGgEgDQgEgEgHAAQgHAAgEADQgEADAAAEIgUAAQAAgGAFgFQAFgGAIgDQAIgDAJAAQAQAAAJAHQAJAGABANIAAAiQAAAKADAHIAAABIgUAAQgCgCgBgGQgJAJgNAAQgNAAgIgGgAgMAGQgFADAAAGQAAAFAEADQAEADAGAAQAFAAAFgCQAFgDADgEIAAgPIgLAAQgKAAgGAEg");
	this.shape_104.setTransform(180.675,-9.975);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#2C3E50").s().p("AgMAPIAGgMIACgJIAAgNIARAAIAAAMQAAAHgEAIQgEAHgGAFg");
	this.shape_105.setTransform(167.35,-5.775);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#2C3E50").s().p("AgcAiQgJgHAAgKQAAgMALgGQAKgHATAAIAMAAIAAgFQAAgGgEgDQgEgEgHAAQgHAAgEADQgEADAAAEIgUAAQAAgGAFgFQAFgGAIgDQAIgDAJAAQAQAAAJAHQAJAGABANIAAAiQAAAKADAHIAAABIgUAAQgCgCgBgGQgJAJgNAAQgNAAgIgGgAgMAGQgFADAAAGQAAAFAEADQAEADAGAAQAFAAAFgCQAFgDADgEIAAgPIgLAAQgKAAgGAEg");
	this.shape_106.setTransform(161.275,-9.975);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#2C3E50").s().p("AgKAbIAAgsIgOAAIAAgMIAOAAIAAgTIATAAIAAATIAQAAIAAAMIgQAAIAAArQAAAEACADQACACAFAAIAHgBIAAANIgNACQgWAAAAgWg");
	this.shape_107.setTransform(153.725,-10.85);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#2C3E50").s().p("AgcAiQgJgHAAgKQAAgMALgGQAKgHATAAIAMAAIAAgFQAAgGgEgDQgEgEgHAAQgHAAgEADQgEADAAAEIgUAAQAAgGAFgFQAFgGAIgDQAIgDAJAAQAQAAAJAHQAJAGABANIAAAiQAAAKADAHIAAABIgUAAQgCgCgBgGQgJAJgNAAQgNAAgIgGgAgMAGQgFADAAAGQAAAFAEADQAEADAGAAQAFAAAFgCQAFgDADgEIAAgPIgLAAQgKAAgGAEg");
	this.shape_108.setTransform(146.625,-9.975);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#2C3E50").s().p("AArAnIAAgxQAAgHgEgEQgEgDgIgBQgHABgEADQgFADgBAFIAAA0IgTAAIAAgxQAAgOgQgBQgLABgFAIIAAA3IgVAAIAAhMIATAAIABAIQAJgKAQAAQARAAAGANQAKgNARAAQAQABAGAGQAIAIgBAOIAAAxg");
	this.shape_109.setTransform(134.8,-10.05);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#2C3E50").s().p("AgBA7QgKgMgFgPQgFgPAAgRQAAgQAFgPQAFgPAKgLQAIgMALgFIAEAKQgLAIgHAPQgHARAAATIAAAGQAAAVAGARQAHASAMAIIgEAKQgLgFgIgLg");
	this.shape_110.setTransform(124.975,-10.3);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#2C3E50").s().p("AArAnIAAgxQAAgHgEgEQgEgDgIgBQgHABgEADQgEADgCAFIAAA0IgSAAIAAgxQgBgOgPgBQgNABgFAIIAAA3IgTAAIAAhMIATAAIAAAIQAJgKARAAQAQAAAGANQAKgNARAAQAQABAHAGQAGAIABAOIAAAxg");
	this.shape_111.setTransform(107.75,-10.05);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#2C3E50").s().p("AgcAgQgIgHAAgOIAAgyIAUAAIAAAyQAAAOAOAAQAOAAAFgJIAAg3IAUAAIAABNIgTAAIgBgHQgIAJgPAAQgPgBgHgHg");
	this.shape_112.setTransform(95.825,-9.9);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#2C3E50").s().p("AgJA1IAAhMIATAAIAABMgAgHglQgDgDAAgEQAAgEADgCQADgDAEAAQAGAAACADQADACAAAEQAAAEgDADQgCADgGAAQgEAAgDgDg");
	this.shape_113.setTransform(89.075,-11.45);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#2C3E50").s().p("AArAnIAAgxQAAgHgEgEQgDgDgJgBQgGABgFADQgFADgBAFIAAA0IgTAAIAAgxQAAgOgPgBQgNABgEAIIAAA3IgUAAIAAhMIATAAIAAAIQAJgKARAAQAQAAAGANQAKgNARAAQAPABAIAGQAGAIAAAOIAAAxg");
	this.shape_114.setTransform(79.65,-10.05);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#2C3E50").s().p("AgdAdQgLgLAAgSIAAAAQAAgLAFgJQAFgKAJgEQAKgFALAAQASAAALAKQALAKABARIAAADQAAALgFAJQgFAJgKAFQgJAFgMAAQgRAAgMgLgAgOgTQgGAHAAANQAAAMAGAHQAFAGAJAAQAKAAAGgHQAFgHAAgMQABgMgHgGQgFgHgKAAQgJAAgFAGg");
	this.shape_115.setTransform(67.7,-9.975);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#2C3E50").s().p("AgKAbIAAgsIgOAAIAAgMIAOAAIAAgTIATAAIAAATIAQAAIAAAMIgQAAIAAArQAAAEACADQACACAFAAIAHgBIAAANIgNACQgWAAAAgWg");
	this.shape_116.setTransform(59.925,-10.85);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#2C3E50").s().p("AgRAlQgJgEgFgGQgEgGAAgHIATAAQAAAGAFAEQAFADAHAAQAIAAAEgCQAEgDAAgEQAAgFgEgCQgFgDgIgCQgLgCgGgDQgPgFgBgMQAAgKAKgHQAKgGAOAAQAPAAALAHQAJAGAAALIgUAAQAAgFgEgDQgFgDgGAAQgGAAgEACQgEADAAAEQAAAEAEADQADACALACQAMACAGAEQAHACAEAEQADAEAAAHQAAAKgKAHQgKAGgQAAQgKAAgIgDg");
	this.shape_117.setTransform(52.95,-9.975);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#2C3E50").s().p("AgdAdQgLgLAAgSIAAAAQAAgLAFgJQAFgKAJgEQAKgFALAAQASAAALAKQALAKABARIAAADQAAALgFAJQgFAJgJAFQgKAFgMAAQgSAAgLgLgAgOgTQgGAHAAANQAAAMAGAHQAFAGAJAAQAKAAAGgHQAFgHABgMQAAgMgHgGQgFgHgKAAQgJAAgFAGg");
	this.shape_118.setTransform(44,-9.975);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#2C3E50").s().p("AgWAnIAAhMIATAAIAAAJQAGgLANAAIAHACIAAAQIgIgBQgOAAgDAJIAAA0g");
	this.shape_119.setTransform(36.675,-10.05);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#2C3E50").s().p("AgrA0IAAhnIAsAAQAUAAAMAJQALAJABAPQAAAPgMAIQgMAIgUAAIgYAAIAAAngAgXAAIAYAAQALAAAGgFQAGgEAAgJQAAgIgGgFQgGgGgLAAIgYAAg");
	this.shape_120.setTransform(28.3,-11.325);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,2.88,-161.1,-125.2)).s().p("A5LTkMAAAgnHMAyXAAAMAAAAnHg");
	this.shape_121.setTransform(126.85,52.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop7G2, new cjs.Rectangle(-34.4,-73.1,322.5,250.5), null);


(lib.drop7G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgeAXQgIgFAAgKIAAgkIAVAAIAAAkQAAAKAPAAQAPAAAFgGIAAgoIAVAAIAAA4IgUAAIAAgGQgKAHgQAAQgPAAgIgGg");
	this.shape.setTransform(128.775,53.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgKATIAAgeIgQAAIAAgKIAQAAIAAgOIAUAAIAAAOIARAAIAAAKIgRAAIAAAeQAAADACACQACABAGAAIAHAAIAAAKIgOAAQgXAAAAgQg");
	this.shape_1.setTransform(120.575,52.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgfAYQgJgEAAgIQAAgJALgDQAMgFAUAAIANAAIAAgEQAAgEgEgDQgEgCgIAAQgHAAgFACQgEACAAADIgWAAQAAgEAFgEQAGgEAJgDQAIgCAKAAQARAAAKAFQAKAFAAAJIAAAYQAAAIAEAEIAAABIgWAAIgCgFQgLAGgNAAQgPAAgJgFgAgNAEQgFADAAAEQAAAEAEACQAEACAHAAQAFAAAGgCQAFgBADgEIAAgKIgMAAQgLAAgGACg");
	this.shape_2.setTransform(112.925,53.325);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgUAhIgCAHIgTAAIAAhQIAWAAIAAAdQAJgGAOAAQASAAAKAIQAKAHAAANIAAABQAAANgKAIQgKAHgRAAQgQABgJgIgAgTAAIAAAXQAFAHAOAAQAJAAAGgEQAFgEAAgJIAAgCQAAgJgFgEQgGgFgJABQgOAAgFAGg");
	this.shape_3.setTransform(103.175,52.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AASAoIAAglQAAgEgFgDQgDgCgJAAQgLAAgHAGIAAAoIgWAAIAAhPIAWAAIAAAeQAKgHAQgBQAeAAAAAUIAAAlg");
	this.shape_4.setTransform(88.4,52.15);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgfAYQgJgEAAgIQAAgJALgDQAMgFAUAAIANAAIAAgEQAAgEgEgDQgEgCgIAAQgHAAgFACQgEACAAADIgWAAQAAgEAFgEQAGgEAJgDQAIgCAKAAQARAAAKAFQAKAFAAAJIAAAYQAAAIAEAEIAAABIgWAAIgCgFQgLAGgNAAQgPAAgJgFgAgNAEQgFADAAAEQAAAEAEACQAEACAHAAQAFAAAGgCQAFgBADgEIAAgKIgMAAQgLAAgGACg");
	this.shape_5.setTransform(78.525,53.325);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgKAoIAAhPIAUAAIAABPg");
	this.shape_6.setTransform(71.35,52.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgcAWQgNgIAAgMIAAgCQAAgHAGgHQAFgHAKgDQAKgEALAAQAUAAAKAHQALAIAAANIAAAEIg9AAQABAHAGAEQAHAEAKAAQAOAAAKgHIALAHQgFAFgKADQgKACgLAAQgUAAgMgHgAgMgOQgGADgBAHIAoAAIAAgBQgBgGgFgEQgFgDgJAAQgIAAgFAEg");
	this.shape_7.setTransform(64.325,53.325);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgdAWQgLgIAAgNIAAgBQAAgNALgHQAMgIATAAQARAAALAGQAKAGABAJIgUAAQgBgFgFgDQgFgDgIAAQgJAAgGAFQgFAEgBAJIAAABQABAJAFAFQAGAEAJAAQAIAAAFgDQAFgCABgEIAUAAQAAAFgGAEQgFAFgIADQgKACgJAAQgUAAgMgHg");
	this.shape_8.setTransform(54.8,53.325);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AghApIAyhRIARAAIgyBRg");
	this.shape_9.setTransform(41.775,52.7);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgYAdIAAg4IAUAAIABAHQAGgIAPAAIAHABIgBAMIgIAAQgOAAgFAGIAAAmg");
	this.shape_10.setTransform(35.65,53.275);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgJAnIAAg4IATAAIAAA4gAgIgaQgDgCAAgDQAAgDADgCQADgCAFAAQAGAAADACQADACAAADQAAADgDACQgDACgGAAQgFAAgDgCg");
	this.shape_11.setTransform(29.75,52.275);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgTAbQgJgDgGgEQgEgEAAgFIAUAAQABAEAFACQAGADAHAAQAJAAAEgCQAEgCAAgDQAAgDgEgCIgPgDIgSgEQgQgDAAgJQAAgHAKgFQALgFAOAAQASAAAKAFQALAFAAAIIgWAAQAAgEgEgCQgFgDgIAAQgFAAgFACQgFACABADQAAADAEACQAEACAMABQAMACAHACQAIABADAEQAEADAAAEQAAAIgMAFQgKAEgRAAQgLAAgJgCg");
	this.shape_12.setTransform(22.75,53.325);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgfAYQgJgEAAgIQAAgJALgDQAMgFAUAAIANAAIAAgEQAAgEgEgDQgEgCgIAAQgHAAgFACQgEACAAADIgWAAQAAgEAFgEQAGgEAJgDQAIgCAKAAQARAAAKAFQAKAFAAAJIAAAYQAAAIAEAEIAAABIgWAAIgCgFQgLAGgNAAQgPAAgJgFgAgNAEQgFADAAAEQAAAEAEACQAEACAHAAQAFAAAGgCQAFgBADgEIAAgKIgMAAQgLAAgGACg");
	this.shape_13.setTransform(13.275,53.325);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgoAoIAAhOIATAAIABAHQAJgIAQAAQARAAAKAJQAKAHAAANIAAABQAAAMgKAJQgKAHgRAAQgPAAgJgGIAAAbgAgTgVIAAAYQAFAGANAAQAKAAAFgFQAGgEABgKQAAgIgGgFQgGgFgKAAQgNAAgFAHg");
	this.shape_14.setTransform(3.5,54.35);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgKAnIAAg4IAUAAIAAA4gAgIgaQgDgCAAgDQAAgDADgCQADgCAFAAQAGAAADACQADACAAADQAAADgDACQgDACgGAAQgFAAgDgCg");
	this.shape_15.setTransform(244.95,37.125);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgJAoIAAhPIATAAIAABPg");
	this.shape_16.setTransform(240.35,37);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgfAYQgJgEAAgIQAAgJALgDQAMgFAUAAIANAAIAAgEQAAgEgEgDQgEgCgIAAQgHAAgFACQgEACAAADIgWAAQAAgEAFgEQAGgEAJgDQAIgCAKAAQARAAAKAFQAKAFAAAJIAAAYQAAAIAEAEIAAABIgWAAIgCgFQgLAGgNAAQgPAAgJgFgAgNAEQgFADAAAEQAAAEAEACQAEACAHAAQAFAAAGgCQAFgBADgEIAAgKIgMAAQgLAAgGACg");
	this.shape_17.setTransform(233.175,38.175);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgUAlQgKgCgGgEIAKgIQAKAHAPAAQAJAAAHgDQAFgEABgGIAAgEQgKAGgOAAQgRAAgKgIQgLgIAAgNQAAgNALgIQAKgIASAAQAPAAAJAHIABgGIATAAIAAA2QAAALgLAHQgMAGgTAAQgKAAgKgDgAgNgXQgHAFAAAJQAAAJAHAEQAFAEAJAAQANAAAHgGIAAgYQgHgGgNAAQgJAAgFAFg");
	this.shape_18.setTransform(223,39.225);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgUAlQgLgCgEgEIAJgIQALAHAOAAQAJAAAHgDQAFgEAAgGIAAgEQgIAGgPAAQgQAAgLgIQgLgIAAgNQAAgNAKgIQALgIASAAQAOAAAKAHIABgGIATAAIAAA2QAAALgMAHQgLAGgTAAQgKAAgKgDgAgOgXQgFAFAAAJQAAAJAFAEQAGAEAJAAQAOAAAFgGIAAgYQgFgGgOAAQgJAAgGAFg");
	this.shape_19.setTransform(212.8,39.225);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AASAdIAAgkQAAgFgEgDQgEgCgJAAQgLAAgHAHIAAAnIgVAAIAAg4IAUAAIABAHQAKgIAQAAQAeAAAAAVIAAAkg");
	this.shape_20.setTransform(202.9,38.125);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgcAWQgNgIAAgMIAAgCQAAgHAGgHQAFgHAKgDQAKgEALAAQAUAAAKAHQALAIAAANIAAAEIg9AAQABAHAGAEQAHAEAKAAQAOAAAKgHIALAHQgFAFgKADQgKACgLAAQgUAAgMgHgAgMgOQgGADgBAHIAoAAIAAgBQgBgGgFgEQgFgDgJAAQgIAAgFAEg");
	this.shape_21.setTransform(193.175,38.175);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AAuAdIAAgkQAAgFgEgDQgEgCgJAAQgHAAgFACQgFACgBAEIAAAmIgVAAIAAgkQAAgKgRAAQgNAAgFAGIAAAoIgVAAIAAg4IAUAAIAAAGQAKgHASAAQASAAAHAJQAKgJATAAQAQAAAIAGQAHAFAAAKIAAAkg");
	this.shape_22.setTransform(180.425,38.125);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AASAdIAAgkQAAgFgEgDQgEgCgJAAQgMAAgGAHIAAAnIgVAAIAAg4IAUAAIAAAHQALgIAQAAQAeAAABAVIAAAkg");
	this.shape_23.setTransform(141,38.125);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgfAYQgJgEAAgIQAAgJALgDQAMgFAUAAIANAAIAAgEQAAgEgEgDQgEgCgIAAQgHAAgFACQgEACAAADIgWAAQAAgEAFgEQAGgEAJgDQAIgCAKAAQARAAAKAFQAKAFAAAJIAAAYQAAAIAEAEIAAABIgWAAIgCgFQgLAGgNAAQgPAAgJgFgAgNAEQgFADAAAEQAAAEAEACQAEACAHAAQAFAAAGgCQAFgBADgEIAAgKIgMAAQgLAAgGACg");
	this.shape_24.setTransform(131.125,38.175);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgeAhQgLgJAAgNQAAgMAKgIQALgIARAAQAOAAAJAHIAAgdIAWAAIAABPIgUAAIgBgGQgJAGgPABQgRgBgKgHgAgOgBQgFADAAAKQAAAJAFAEQAGAFAJAAQANAAAGgGIAAgYQgGgGgNgBQgJABgGAFg");
	this.shape_25.setTransform(120.975,37.05);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AASAdIAAgkQAAgFgEgDQgEgCgJAAQgMAAgGAHIAAAnIgWAAIAAg4IAVAAIAAAHQALgIAQAAQAeAAABAVIAAAkg");
	this.shape_26.setTransform(84.5,38.125);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgfAYQgJgEAAgIQAAgJALgDQAMgFAUAAIANAAIAAgEQAAgEgEgDQgEgCgIAAQgHAAgFACQgEACAAADIgWAAQAAgEAFgEQAGgEAJgDQAIgCAKAAQARAAAKAFQAKAFAAAJIAAAYQAAAIAEAEIAAABIgWAAQgBgBgBgEQgLAGgNAAQgPAAgJgFgAgNAEQgFADAAAEQAAAEAEACQAEACAHAAQAFAAAGgCQAFgBADgEIAAgKIgMAAQgLAAgGACg");
	this.shape_27.setTransform(74.625,38.175);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AARAoIgbgYIgJAFIAAATIgWAAIAAhPIAWAAIAAAtIAGgEIAagRIAZAAIgjAWIAnAhg");
	this.shape_28.setTransform(65.625,37);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgfAYQgJgEAAgIQAAgJALgDQAMgFAUAAIANAAIAAgEQAAgEgEgDQgEgCgIAAQgHAAgFACQgEACAAADIgWAAQAAgEAFgEQAGgEAJgDQAIgCAKAAQARAAAKAFQAKAFAAAJIAAAYQAAAIAEAEIAAABIgWAAIgCgFQgLAGgNAAQgPAAgJgFgAgNAEQgFADAAAEQAAAEAEACQAEACAHAAQAFAAAGgCQAFgBADgEIAAgKIgMAAQgLAAgGACg");
	this.shape_29.setTransform(55.475,38.175);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgYAdIAAg4IAVAAIAAAHQAHgIANAAIAIABIAAAMIgJAAQgPAAgDAGIAAAmg");
	this.shape_30.setTransform(47.85,38.125);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgcAWQgNgIAAgMIAAgCQAAgHAGgHQAFgHAKgDQAKgEALAAQAUAAAKAHQALAIAAANIAAAEIg9AAQABAHAGAEQAHAEAKAAQAOAAAKgHIALAHQgFAFgKADQgKACgLAAQgUAAgMgHgAgMgOQgGADgBAHIAoAAIAAgBQgBgGgFgEQgFgDgJAAQgIAAgFAEg");
	this.shape_31.setTransform(39.525,38.175);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgUAlQgLgCgFgEIAKgIQALAHAOAAQAJAAAHgDQAFgEAAgGIAAgEQgIAGgPAAQgQAAgLgIQgLgIAAgNQAAgNALgIQAKgIASAAQAOAAAKAHIABgGIATAAIAAA2QAAALgMAHQgLAGgTAAQgLAAgJgDgAgOgXQgFAFAAAJQAAAJAFAEQAGAEAJAAQAOAAAFgGIAAgYQgFgGgOAAQgJAAgGAFg");
	this.shape_32.setTransform(29.3,39.225);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgYAdIAAg4IAVAAIAAAHQAHgIANAAIAIABIAAAMIgJAAQgPAAgDAGIAAAmg");
	this.shape_33.setTransform(21.65,38.125);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgcAWQgNgIAAgMIAAgCQAAgHAGgHQAFgHAKgDQAKgEALAAQAUAAAKAHQALAIAAANIAAAEIg9AAQABAHAGAEQAHAEAKAAQAOAAAKgHIALAHQgFAFgKADQgKACgLAAQgUAAgMgHgAgMgOQgGADgBAHIAoAAIAAgBQgBgGgFgEQgFgDgJAAQgIAAgFAEg");
	this.shape_34.setTransform(13.325,38.175);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgoAnIAAhMIATAAIABAFQAJgGAQAAQARAAAKAIQAKAHAAAOIAAAAQAAANgKAHQgKAIgRAAQgPAAgJgGIAAAagAgTgVIAAAXQAFAHANAAQAKAAAFgFQAGgEABgJQAAgJgGgFQgGgFgKAAQgNAAgFAHg");
	this.shape_35.setTransform(3.5,39.2);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,1.199,-161.1,-52.1)).s().p("A5LIJIAAwRMAyXAAAIAAQRg");
	this.shape_36.setTransform(125.05,48.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop7G1, new cjs.Rectangle(-36.2,-3.9,322.5,104.30000000000001), null);


(lib.drag7G12 = function(mode,startPosition,loop) {
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


(lib.drag7G11 = function(mode,startPosition,loop) {
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


(lib.drag7G10 = function(mode,startPosition,loop) {
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


(lib.drag7G9 = function(mode,startPosition,loop) {
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


(lib.drag7G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("AtJkEIaTAAIAAIJI6TAAg");
	this.shape.setTransform(84.45,24.675);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_1.setTransform(139.125,36.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_2.setTransform(132.525,34.825);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_3.setTransform(127.7,33.675);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgQAgIAAg+IAOAAIAAAHQAFgIAIAAIAGABIAAANIgHgBQgJAAgCAIIAAAqg");
	this.shape_4.setTransform(124.35,34.825);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgUAYQgJgJABgPIAAAAQAAgJADgHQAEgIAGgEQAIgEAHAAQANAAAIAIQAIAJAAANIAAADQAAAJgDAHQgEAIgGAEQgHAEgJAAQgNAAgHgJgAgKgPQgEAGAAAKQAAAJAEAGQAEAGAGAAQAHAAAEgGQAFgGAAgKQAAgJgFgGQgEgFgHAAQgGAAgEAFg");
	this.shape_5.setTransform(118.5,34.875);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgGAWIAAgjIgLAAIAAgLIALAAIAAgPIAMAAIAAAPIAMAAIAAALIgMAAIAAAiQABAEABACQABACAEgBIAFAAIAAALIgJABQgPAAAAgSg");
	this.shape_6.setTransform(112.95,34.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_7.setTransform(109.6,33.675);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_8.setTransform(104.725,34.825);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgVAYQgHgJAAgPIAAAAQAAgJAEgHQADgIAGgEQAIgEAHAAQANAAAIAIQAIAJAAANIAAADQAAAJgDAHQgEAIgGAEQgHAEgJAAQgNAAgIgJgAgKgPQgEAGAAAKQAAAJAEAGQAEAGAGAAQAIAAADgGQAEgGABgKQgBgJgEgGQgEgFgHAAQgGAAgEAFg");
	this.shape_9.setTransform(97.95,34.875);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_10.setTransform(89.325,34.825);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgVAYQgHgJgBgPIAAAAQAAgJAFgHQADgIAHgEQAGgEAIAAQANAAAIAIQAIAJABANIAAADQgBAJgDAHQgDAIgIAEQgGAEgJAAQgMAAgJgJgAgKgPQgEAGAAAKQAAAJAEAGQAEAGAGAAQAIAAAEgGQADgGAAgKQAAgJgDgGQgFgFgHAAQgGAAgEAFg");
	this.shape_11.setTransform(80.65,34.875);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_12.setTransform(75.75,33.675);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgNAlIgBAIIgNAAIAAhZIAOAAIAAAgQAGgHAKAAQALAAAHAJQAHAIAAAOIAAABQAAAPgHAJQgHAJgLAAQgKAAgGgJgAgNAAIAAAaQAEAIAJAAQAGAAAEgFQADgFAAgKIAAgCQAAgKgDgFQgEgEgGAAQgJgBgEAIg");
	this.shape_13.setTransform(70.975,33.6);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_14.setTransform(62.95,33.675);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_15.setTransform(58.15,34.875);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_16.setTransform(51.375,36.075);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgFAAgCACQgDADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_17.setTransform(44.85,34.875);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgNAlIgBAIIgNAAIAAhZIAOAAIAAAgQAGgHAKAAQALAAAHAJQAHAIAAAOIAAABQAAAPgHAJQgHAJgLAAQgKAAgGgJgAgNAAIAAAaQAEAIAJAAQAGAAAEgFQADgFAAgKIAAgCQAAgKgDgFQgEgEgGAAQgJgBgEAIg");
	this.shape_18.setTransform(38.375,33.6);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_19.setTransform(31.675,34.875);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_20.setTransform(25.275,34.875);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_21.setTransform(139.725,16.425);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgDACQgDADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAGAAQAMAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQADAAAEgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_22.setTransform(133.15,16.475);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AAOAgIgOgrIgMArIgMAAIgRg/IANAAIAKArIAOgrIAKAAIAMArIALgrIANAAIgRA/g");
	this.shape_23.setTransform(125.45,16.475);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_24.setTransform(117.825,16.475);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgGgDgCQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAiQAHgIAKAAQAUAAAAAVIAAAqg");
	this.shape_25.setTransform(111.225,15.15);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgQAgIAAg+IAOAAIAAAHQAFgIAIAAIAGABIAAANIgHgBQgJAAgCAIIAAAqg");
	this.shape_26.setTransform(103.1,16.425);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCABgDIAAgMIgHAAQgHAAgEADg");
	this.shape_27.setTransform(97.45,16.475);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_28.setTransform(91.075,16.475);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_29.setTransform(84.825,16.475);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgNAmIgBAGIgNAAIAAhZIAOAAIAAAhQAGgHAKAAQALAAAHAIQAHAJAAAPIAAABQAAAOgHAJQgHAJgLgBQgKAAgGgHgAgNAAIAAAaQAEAIAJAAQAGAAAEgFQADgFAAgKIAAgCQAAgKgDgFQgEgEgGgBQgJABgEAHg");
	this.shape_30.setTransform(78.325,15.2);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_31.setTransform(68.475,16.425);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCABgDIAAgMIgHAAQgHAAgEADg");
	this.shape_32.setTransform(61.9,16.475);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_33.setTransform(57.15,15.275);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_34.setTransform(52.075,17.675);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_35.setTransform(45.55,16.475);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgNAmIgBAGIgNAAIAAhZIAOAAIAAAhQAGgHAKAAQALAAAHAIQAHAJAAAPIAAABQAAAOgHAJQgHAJgLgBQgKAAgGgHgAgNAAIAAAaQAEAIAJAAQAGAAAEgFQADgFAAgKIAAgCQAAgKgDgFQgEgEgGgBQgJABgEAHg");
	this.shape_36.setTransform(39.075,15.2);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_37.setTransform(32.375,16.475);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgPApQgHgEgFgGQgEgGAAgIIAPAAQAAAHAFAEQAFAEAHAAQAIAAAEgDQAEgDAAgFQAAgGgEgDQgEgDgJgDQgLgDgGgDQgLgHAAgMQAAgKAIgHQAJgHAMAAQAJAAAHAEQAHADAEAGQAEAGAAAHIgPAAQAAgGgEgEQgEgEgIAAQgGAAgEADQgEADAAAGQAAAFAEADQAEADAJADQAKADAGADQAGADADAFQADAFAAAHQAAAKgIAHQgJAGgOAAQgIAAgIgDg");
	this.shape_38.setTransform(25.475,15.375);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_39.setTransform(82.475,24.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_3
	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("rgba(0,0,0,0.227)").s().p("AtJEAIAAn/IaTAAIAAH/g");
	this.shape_40.setTransform(78.3,32.25);
	this.shape_40._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_40).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5.9,-3.1,175.6,61);


(lib.drag7G4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("AtJkEIaTAAIAAIJI6TAAg");
	this.shape.setTransform(84.45,24.675);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_1.setTransform(155.3,25.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgbAtIAAhYIANAAIABAHQAGgHAKAAQALAAAHAIQAHAJAAAPIAAABQAAAOgHAIQgHAJgLAAQgJAAgHgHIAAAfgAgNgZIAAAbQAEAIAJAAQAGAAAEgGQADgEAAgMQAAgJgDgFQgEgGgGAAQgJAAgEAHg");
	this.shape_2.setTransform(148.825,26.85);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_3.setTransform(141.975,25.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgQAgIAAg+IAOAAIAAAHQAFgIAIAAIAGABIAAANIgHgBQgJAAgCAIIAAAqg");
	this.shape_4.setTransform(136.85,25.625);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_5.setTransform(131.275,25.675);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgNAmIgBAHIgNAAIAAhZIAOAAIAAAgQAGgHAKAAQALAAAHAIQAHAJAAAOIAAABQAAAPgHAJQgHAJgLAAQgKgBgGgHgAgNAAIAAAaQAEAIAJAAQAGAAAEgFQADgFAAgKIAAgCQAAgKgDgFQgEgEgGAAQgJAAgEAHg");
	this.shape_6.setTransform(124.775,24.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_7.setTransform(116.75,24.475);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_8.setTransform(111.875,25.625);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_9.setTransform(107.05,24.475);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_10.setTransform(99.175,25.625);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQADgCADgDIAAgMIgIAAQgHAAgEADg");
	this.shape_11.setTransform(92.6,25.675);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AANAgIgNgrIgNArIgLAAIgSg/IAPAAIAKArIAMgrIAKAAIAOArIAJgrIAPAAIgSA/g");
	this.shape_12.setTransform(84.9,25.675);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_13.setTransform(77.275,25.675);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgFgDgDQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAiQAHgJAKABQAUAAAAAVIAAAqg");
	this.shape_14.setTransform(70.675,24.35);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgbAtIAAhYIANAAIABAHQAGgHAKAAQALAAAHAIQAHAJAAAPIAAABQAAAOgHAIQgHAJgLAAQgJAAgHgHIAAAfgAgNgZIAAAbQAEAIAJAAQAGAAAEgGQADgEAAgMQAAgJgDgFQgEgGgGAAQgJAAgEAHg");
	this.shape_15.setTransform(61.125,26.85);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_16.setTransform(54.275,25.725);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgUAlQgHgKAAgPQAAgNAHgJQAHgJALAAQAJAAAHAHIAAggIAOAAIAABZIgNAAIgBgHQgGAIgKAAQgLgBgHgIgAgJgCQgDAEAAALQAAAKADAGQAEAFAGAAQAJAAAEgHIAAgbQgEgIgJABQgGgBgEAGg");
	this.shape_17.setTransform(47.425,24.4);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_18.setTransform(42.7,24.475);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgFgDgDQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAiQAHgJAKABQAUAAAAAVIAAAqg");
	this.shape_19.setTransform(37.825,24.35);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IANAAIAAAHQAEgIAKAAIAEABIAAANIgFgBQgKAAgDAIIAAAqg");
	this.shape_20.setTransform(29.7,25.625);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_21.setTransform(23.975,25.725);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgFAAgCACQgDADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_22.setTransform(17.4,25.675);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgfArIAAhVIAaAAQAJAAAJAFQAJAGAFAJQAFAJAAAMIAAADQAAAMgFAKQgFAJgJAFQgIAFgLAAgAgQAfIAKAAQAKAAAHgHQAGgIAAgNIAAgEQAAgOgGgHQgGgIgKAAIgLAAg");
	this.shape_23.setTransform(10.35,24.575);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_24.setTransform(82.475,24.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_3
	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("rgba(0,0,0,0.227)").s().p("AtJEAIAAn/IaTAAIAAH/g");
	this.shape_25.setTransform(78.3,32.25);
	this.shape_25._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_25).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5.9,-3.1,175.6,61);


(lib.drag7G3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("AtJkEIaTAAIAAIJI6TAAg");
	this.shape.setTransform(84.45,24.675);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IANAAIAAAHQAEgIAJAAIAGABIAAANIgGgBQgKAAgDAIIAAAqg");
	this.shape_1.setTransform(128,35.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_2.setTransform(124.1,33.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_3.setTransform(119.3,35.075);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_4.setTransform(111.55,33.875);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgUAkQgHgIAAgQQAAgOAHgIQAHgJALAAQAJAAAHAHIAAggIAOAAIAABZIgNAAIgBgHQgGAHgKAAQgLABgHgKgAgJgCQgDAFAAALQAAAJADAFQAEAGAGAAQAJAAAEgHIAAgbQgEgHgJgBQgGABgEAFg");
	this.shape_5.setTransform(106.475,33.8);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgbAsIAAhXIANAAIABAHQAGgIAKAAQALAAAHAJQAHAIAAAQIAAABQAAAOgHAJQgHAIgLAAQgJAAgHgGIAAAdgAgNgZIAAAcQAEAHAJAAQAGAAAEgFQADgFAAgLQAAgKgDgGQgEgFgGAAQgJAAgEAHg");
	this.shape_6.setTransform(97.025,36.25);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_7.setTransform(90.175,35.125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgUAkQgHgIAAgQQAAgOAHgIQAHgJALAAQAJAAAHAHIAAggIAOAAIAABZIgNAAIgBgHQgGAHgKAAQgLABgHgKgAgJgCQgDAFAAALQAAAJADAFQAEAGAGAAQAJAAAEgHIAAgbQgEgHgJgBQgGABgEAFg");
	this.shape_8.setTransform(83.325,33.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_9.setTransform(78.6,33.875);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgFgDgDQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAhQAHgHAKgBQAUAAAAAXIAAApg");
	this.shape_10.setTransform(73.725,33.75);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCABgDIAAgMIgHAAQgHAAgEADg");
	this.shape_11.setTransform(64.15,35.075);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAGIAAAVIgOAAIAAhZIAOAAIAAAzIAFgFIAQgUIARAAIgXAaIAaAlg");
	this.shape_12.setTransform(58.225,33.75);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_13.setTransform(53.2,33.875);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgGAWIAAgjIgLAAIAAgLIALAAIAAgPIAMAAIAAAPIAMAAIAAALIgMAAIAAAjQABADABACQABABAEAAIAFAAIAAALIgJABQgPAAAAgSg");
	this.shape_14.setTransform(49.5,34.35);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_15.setTransform(44.475,35.075);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAGIAAAVIgOAAIAAhZIAOAAIAAAzIAFgFIAQgUIARAAIgXAaIAaAlg");
	this.shape_16.setTransform(38.525,33.75);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_17.setTransform(145.875,17.875);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_18.setTransform(139.275,16.625);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQADAAAEgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_19.setTransform(132.7,16.675);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_20.setTransform(126.325,16.675);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_21.setTransform(119.925,16.625);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_22.setTransform(115.1,15.475);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_23.setTransform(109.05,15.475);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgHAWIAAgjIgKAAIAAgKIAKAAIAAgQIAOAAIAAAQIALAAIAAAKIgLAAIAAAiQgBAEACACQACABADABIAFgBIAAALIgJABQgQAAAAgSg");
	this.shape_24.setTransform(105.35,15.95);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IANAAIAAAHQAEgIAKAAIAEABIAAANIgFgBQgKAAgDAIIAAAqg");
	this.shape_25.setTransform(101.7,16.625);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_26.setTransform(96.125,16.675);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgbAtIAAhYIANAAIABAHQAGgHAKAAQALAAAHAIQAHAJAAAPIAAABQAAAOgHAIQgHAJgLAAQgJAAgHgHIAAAfgAgNgYIAAAaQAEAIAJAAQAGAAAEgGQADgEAAgMQAAgJgDgFQgEgGgGAAQgJAAgEAIg");
	this.shape_27.setTransform(89.625,17.85);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_28.setTransform(82.925,16.675);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_29.setTransform(76.525,16.675);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_30.setTransform(67.125,16.725);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgGAWIAAgjIgLAAIAAgKIALAAIAAgQIAMAAIAAAQIAMAAIAAAKIgMAAIAAAiQABAEABACQABABAEABIAFgBIAAALIgJABQgPAAAAgSg");
	this.shape_31.setTransform(61.65,15.95);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_32.setTransform(56.475,16.625);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQADAAAEgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_33.setTransform(49.9,16.675);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgNAmIgBAHIgNAAIAAhZIAOAAIAAAgQAGgHAKAAQALAAAHAIQAHAJAAAOIAAABQAAAPgHAJQgHAJgLAAQgKgBgGgHgAgNAAIAAAaQAEAIAJAAQAGAAAEgFQADgFAAgKIAAgCQAAgKgDgFQgEgEgGAAQgJAAgEAHg");
	this.shape_34.setTransform(43.425,15.4);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgGAWIAAgjIgLAAIAAgKIALAAIAAgQIAMAAIAAAQIAMAAIAAAKIgMAAIAAAiQAAAEACACQABABAEABIAFgBIAAALIgJABQgPAAAAgSg");
	this.shape_35.setTransform(34.75,15.95);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAGAAQAMAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQADAAAEgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_36.setTransform(29.65,16.675);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgGAtIAAhZIANAAIAABZg");
	this.shape_37.setTransform(24.875,15.35);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AAXArIgHgUIgfAAIgHAUIgQAAIAhhVIALAAIAhBVgAgMALIAZAAIgNgig");
	this.shape_38.setTransform(19.35,15.575);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_39.setTransform(84.425,24.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_3
	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("rgba(0,0,0,0.227)").s().p("AtJEAIAAn/IaTAAIAAH/g");
	this.shape_40.setTransform(78.3,32.25);
	this.shape_40._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_40).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5.9,-3.1,175.6,61);


(lib.drag7G2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("AtJkEIaTAAIAAIJI6TAAg");
	this.shape.setTransform(84.45,24.675);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgFAAgCACQgDADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_1.setTransform(139.8,35.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgGAtIAAhZIANAAIAABZg");
	this.shape_2.setTransform(135.025,33.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgDADgBAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_3.setTransform(130.25,35.075);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgbAsIAAhXIANAAIABAHQAGgIAKAAQALAAAHAJQAHAIAAAQIAAABQAAAOgHAJQgHAIgLAAQgJAAgHgGIAAAdgAgNgZIAAAcQAEAHAJAAQAGAAAEgFQADgFAAgLQAAgKgDgGQgEgFgGAAQgJAAgEAHg");
	this.shape_4.setTransform(123.775,36.25);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_5.setTransform(117.075,35.075);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAGIAAAVIgOAAIAAhZIAOAAIAAAzIAFgFIAQgUIARAAIgXAaIAaAlg");
	this.shape_6.setTransform(111.125,33.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgFgDgDQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAhQAHgHAKgBQAUAAAAAXIAAApg");
	this.shape_7.setTransform(101.275,33.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgDADgBAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_8.setTransform(94.7,35.075);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IANAAIAAAHQAEgIAKAAIAEABIAAANIgFgBQgKAAgDAIIAAAqg");
	this.shape_9.setTransform(89.65,35.025);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_10.setTransform(84.075,35.075);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgFAAgDACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_11.setTransform(77.55,35.075);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgUAkQgHgIAAgQQAAgOAHgIQAHgJALAAQAJAAAHAHIAAggIAOAAIAABZIgNAAIgBgHQgGAHgKAAQgLABgHgKgAgJgCQgDAFAAALQAAAJADAFQAEAGAGAAQAJAAAEgHIAAgbQgEgHgJgBQgGABgEAFg");
	this.shape_12.setTransform(70.775,33.8);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_13.setTransform(63.05,33.875);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgUAkQgHgIAAgQQAAgOAHgIQAHgJALAAQAJAAAHAHIAAggIAOAAIAABZIgNAAIgBgHQgGAHgKAAQgLABgHgKgAgJgCQgDAFAAALQAAAJADAFQAEAGAGAAQAJAAAEgHIAAgbQgEgHgJgBQgGABgEAFg");
	this.shape_14.setTransform(57.975,33.8);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgDADgBAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_15.setTransform(51.5,35.075);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgNA3IAAgLIAFABQAHAAABgIIAAhFIANAAIAABEQAAAKgFAGQgFAEgIAAIgIgBgAAAgrQgCgCAAgDQAAgDACgDQACgBADAAQAEAAACABQADADAAADQAAADgDACQgCACgEAAQgDAAgCgCg");
	this.shape_16.setTransform(46.175,35.15);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_17.setTransform(41.925,35.025);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_18.setTransform(35.425,35.075);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_19.setTransform(26.925,35.025);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_20.setTransform(144.425,16.625);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgFAAgDACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_21.setTransform(137.85,16.675);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgGIAQgTIARAAIgXAaIAaAlg");
	this.shape_22.setTransform(131.925,15.35);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_23.setTransform(125.15,16.675);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgUAlQgHgKAAgPQAAgNAHgJQAHgJALAAQAJAAAHAHIAAggIAOAAIAABZIgNAAIgBgHQgGAIgKAAQgLgBgHgIgAgJgCQgDAEAAALQAAAKADAGQAEAFAGAAQAJAAAEgHIAAgbQgEgIgJABQgGgBgEAGg");
	this.shape_24.setTransform(118.375,15.4);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_25.setTransform(111.975,16.675);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgNAmIgBAHIgNAAIAAhZIAOAAIAAAgQAGgHAKAAQALAAAHAIQAHAJAAAOIAAABQAAAPgHAJQgHAJgLAAQgKgBgGgHgAgNAAIAAAaQAEAIAJAAQAGAAAEgFQADgFAAgKIAAgCQAAgKgDgFQgEgEgGAAQgJAAgEAHg");
	this.shape_26.setTransform(105.475,15.4);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_27.setTransform(100.45,15.475);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgUAlQgHgKAAgPQAAgNAHgJQAHgJALAAQAJAAAHAHIAAggIAOAAIAABZIgNAAIgBgHQgGAIgKAAQgLgBgHgIgAgJgCQgDAEAAALQAAAKADAGQAEAFAGAAQAJAAAEgHIAAgbQgEgIgJABQgGgBgEAGg");
	this.shape_28.setTransform(95.375,15.4);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_29.setTransform(85.825,16.625);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_30.setTransform(79.25,16.675);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AAOAgIgOgrIgNArIgLAAIgRg/IANAAIAKArIAOgrIAJAAIAOArIAKgrIANAAIgRA/g");
	this.shape_31.setTransform(71.55,16.675);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_32.setTransform(63.925,16.675);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgFgDgDQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAiQAHgJAKABQAUAAAAAVIAAAqg");
	this.shape_33.setTransform(57.325,15.35);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgFgDgDQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAiQAHgJAKABQAUAAAAAVIAAAqg");
	this.shape_34.setTransform(47.675,15.35);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_35.setTransform(41.025,16.725);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgNAmIgBAHIgNAAIAAhZIAOAAIAAAgQAGgHAKAAQALAAAHAIQAHAJAAAOIAAABQAAAPgHAJQgHAJgLAAQgKgBgGgHgAgNAAIAAAaQAEAIAJAAQAGAAAEgFQADgFAAgKIAAgCQAAgKgDgFQgEgEgGAAQgJAAgEAHg");
	this.shape_36.setTransform(34.475,15.4);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_37.setTransform(27.625,16.725);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgHArIAAhJIgaAAIAAgMIBDAAIAAAMIgbAAIAABJg");
	this.shape_38.setTransform(20.65,15.575);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_39.setTransform(84.425,24.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_3
	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("rgba(0,0,0,0.227)").s().p("AtJEAIAAn/IaTAAIAAH/g");
	this.shape_40.setTransform(78.3,32.25);
	this.shape_40._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_40).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5.9,-3.1,175.6,61);


(lib.drag7G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("AtJkEIaTAAIAAIJI6TAAg");
	this.shape.setTransform(84.45,24.675);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_1.setTransform(152.2,35.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgGAWIAAgjIgLAAIAAgLIALAAIAAgPIAMAAIAAAPIAMAAIAAALIgMAAIAAAjQAAADACACQABABAEAAIAFAAIAAALIgJABQgPAAAAgSg");
	this.shape_2.setTransform(146.8,34.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_3.setTransform(141.775,35.075);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_4.setTransform(135.375,35.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IANAAIAAAHQAEgIAKAAIAEABIAAANIgFgBQgKAAgDAIIAAAqg");
	this.shape_5.setTransform(130.5,35.025);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_6.setTransform(124.925,35.075);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgNAlIgBAIIgNAAIAAhZIAOAAIAAAgQAGgHAKAAQALAAAHAJQAHAIAAAOIAAACQAAAOgHAJQgHAIgLAAQgKABgGgJgAgNAAIAAAaQAEAIAJAAQAGAAAEgFQADgFAAgKIAAgCQAAgKgDgEQgEgGgGAAQgJAAgEAIg");
	this.shape_7.setTransform(118.425,33.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgDADgBAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_8.setTransform(108.65,35.075);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_9.setTransform(103.9,33.875);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgUAkQgHgIAAgQQAAgOAHgIQAHgJALAAQAJAAAHAHIAAggIAOAAIAABZIgNAAIgBgHQgGAHgKAAQgLABgHgKgAgJgCQgDAFAAALQAAAJADAFQAEAGAGAAQAJAAAEgHIAAgbQgEgHgJgBQgGABgEAFg");
	this.shape_10.setTransform(98.825,33.8);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgVAYQgIgJAAgPIAAAAQAAgJAFgHQADgIAHgEQAGgEAIAAQANAAAIAIQAIAJABANIAAADQAAAJgEAHQgDAIgIAEQgGAEgJAAQgMAAgJgJgAgKgPQgEAGAAAKQAAAJAEAGQAEAGAGAAQAHAAAFgGQADgGAAgKQAAgJgDgGQgFgFgHAAQgGAAgEAFg");
	this.shape_11.setTransform(92.15,35.075);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgbAsIAAhXIANAAIABAHQAGgIAKAAQALAAAHAJQAHAIAAAQIAAABQAAAOgHAJQgHAIgLAAQgJAAgHgGIAAAdgAgNgZIAAAcQAEAHAJAAQAGAAAEgFQADgFAAgLQAAgKgDgGQgEgFgGAAQgJAAgEAHg");
	this.shape_12.setTransform(85.525,36.25);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgDACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_13.setTransform(78.75,35.075);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IANAAIAAAHQAEgIAKAAIAEABIAAANIgFgBQgKAAgDAIIAAAqg");
	this.shape_14.setTransform(73.7,35.025);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_15.setTransform(68.05,35.075);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgbAsIAAhXIANAAIABAHQAGgIAKAAQALAAAHAJQAHAIAAAQIAAABQAAAOgHAJQgHAIgLAAQgJAAgHgGIAAAdgAgNgZIAAAcQAEAHAJAAQAGAAAEgFQADgFAAgLQAAgKgDgGQgEgFgGAAQgJAAgEAHg");
	this.shape_16.setTransform(61.575,36.25);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_17.setTransform(53.55,33.875);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAGIAAAVIgOAAIAAhZIAOAAIAAAzIAFgFIAQgUIARAAIgXAaIAaAlg");
	this.shape_18.setTransform(49.325,33.75);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_19.setTransform(44.3,33.875);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgGAtIAAhZIANAAIAABZg");
	this.shape_20.setTransform(41.225,33.75);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_21.setTransform(38.2,33.875);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_22.setTransform(31.425,35.025);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_23.setTransform(23.025,35.075);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_24.setTransform(14.525,35.025);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgFgDgDQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAiQAHgJAKABQAUAAAAAVIAAAqg");
	this.shape_25.setTransform(155.375,15.35);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_26.setTransform(148.725,16.725);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgNAmIgBAHIgNAAIAAhZIAOAAIAAAgQAGgHAKAAQALAAAHAIQAHAJAAAOIAAABQAAAPgHAJQgHAJgLAAQgKgBgGgHgAgNAAIAAAaQAEAIAJAAQAGAAAEgFQADgFAAgKIAAgCQAAgKgDgFQgEgEgGAAQgJAAgEAHg");
	this.shape_27.setTransform(142.175,15.4);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_28.setTransform(135.325,16.725);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgHAWIAAgjIgKAAIAAgKIAKAAIAAgQIANAAIAAAQIAMAAIAAAKIgMAAIAAAiQABAEABACQACABADABIAFgBIAAALIgJABQgPAAgBgSg");
	this.shape_29.setTransform(129.85,15.95);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_30.setTransform(121.675,16.625);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_31.setTransform(115.175,16.675);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_32.setTransform(106.675,16.625);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_33.setTransform(97.925,17.875);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_34.setTransform(91.475,16.675);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_35.setTransform(85.075,16.675);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgbAtIAAhYIANAAIABAHQAGgHAKAAQALAAAHAIQAHAJAAAPIAAABQAAAOgHAIQgHAJgLAAQgJAAgHgHIAAAfgAgNgYIAAAaQAEAIAJAAQAGAAAEgGQADgEAAgMQAAgJgDgFQgEgGgGAAQgJAAgEAIg");
	this.shape_36.setTransform(75.775,17.85);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgFAAgDACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_37.setTransform(69,16.675);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_38.setTransform(64.25,15.475);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgHAWIAAgjIgKAAIAAgKIAKAAIAAgQIAOAAIAAAQIALAAIAAAKIgLAAIAAAiQAAAEABACQACABADABIAFgBIAAALIgJABQgPAAgBgSg");
	this.shape_39.setTransform(60.55,15.95);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_40.setTransform(55.525,16.675);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgPApQgHgEgFgGQgEgGAAgIIAPAAQAAAHAFAEQAFAEAHAAQAIAAAEgDQAEgDAAgFQAAgGgEgDQgEgDgJgDQgLgDgGgDQgLgHAAgMQAAgKAIgHQAJgHAMAAQAJAAAHAEQAHADAEAGQAEAGAAAHIgPAAQAAgGgEgEQgEgEgIAAQgGAAgEADQgEADAAAGQAAAFAEADQAEADAJADQAKADAGADQAGADADAFQADAFAAAHQAAAKgIAHQgJAGgOAAQgIAAgIgDg");
	this.shape_41.setTransform(48.625,15.575);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_42.setTransform(40.5,15.475);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_43.setTransform(35.825,16.675);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_44.setTransform(29.225,17.875);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_45.setTransform(22.625,16.625);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_46.setTransform(15.975,16.725);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgaArIAAhVIA1AAIAAAMIgmAAIAAAaIAhAAIAAALIghAAIAAAkg");
	this.shape_47.setTransform(9.625,15.575);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_48.setTransform(84.425,24.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_3
	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("rgba(0,0,0,0.227)").s().p("AtJEAIAAn/IaTAAIAAH/g");
	this.shape_49.setTransform(78.3,32.25);
	this.shape_49._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_49).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5.9,-3.1,175.6,61);


(lib.btnMenuKI = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#18B8C4").s().p("AhXBMIBNhMIhNhMIAygxIB9B9Ih9B+g");
	this.shape.setTransform(-43.2824,1.4241,0.5329,0.5329,-90);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#18B8C4").s().p("Ah6CSICRiSIiRiRIAygyIDCDDIjCDDg");
	this.shape_1.setTransform(-43.2824,-6.902,0.5329,0.5329,-90);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7,p:{y:-3.875}},{t:this.shape_6,p:{y:-3.875}},{t:this.shape_5},{t:this.shape_4,p:{y:0.925}},{t:this.shape_3},{t:this.shape_2,p:{y:1.075}},{t:this.shape_1,p:{y:-6.902}},{t:this.shape,p:{y:1.4241}}]}).to({state:[{t:this.shape_7,p:{y:-2.275}},{t:this.shape_11},{t:this.shape_6,p:{y:-2.275}},{t:this.shape_10},{t:this.shape_4,p:{y:2.525}},{t:this.shape_9},{t:this.shape_2,p:{y:2.675}},{t:this.shape_1,p:{y:-5.302}},{t:this.shape,p:{y:3.0241}}]},1).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_4,p:{y:6.525}},{t:this.shape_12},{t:this.shape_2,p:{y:6.675}},{t:this.shape_1,p:{y:-1.302}},{t:this.shape,p:{y:7.0241}}]},1).wait(2));

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
	this.shape.setTransform(-38.9393,-3.0039,0.7124,0.7883,180);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#ED4F44").s().p("Ah3C3QgGgDAAgHIAAgiQAAgOAMgJICPhrQAEgEAAgFQAAgFgEgDIiPhsQgMgIAAgOIAAgiQAAgHAGgDQAHgDAFAEIDkCrQAFAEAAAGQAAAHgFAEIjkCrQgDACgEAAIgFgBg");
	this.shape_1.setTransform(-45.2261,-3.0236,0.7124,0.7883,180);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10,p:{y:-3.875}},{t:this.shape_9,p:{y:-3.875}},{t:this.shape_8},{t:this.shape_7,p:{y:0.925}},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{scaleX:0.7124,scaleY:0.7883,x:-45.2261,y:-3.0236}},{t:this.shape,p:{scaleX:0.7124,scaleY:0.7883,x:-38.9393,y:-3.0039}}]}).to({state:[{t:this.shape_10,p:{y:-1.875}},{t:this.shape_18},{t:this.shape_9,p:{y:-1.875}},{t:this.shape_17},{t:this.shape_7,p:{y:2.925}},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_1,p:{scaleX:0.7118,scaleY:0.7877,x:-45.219,y:-2.4632}},{t:this.shape,p:{scaleX:0.7118,scaleY:0.7877,x:-38.9371,y:-2.4435}}]},1).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_7,p:{y:6.425}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_1,p:{scaleX:0.7118,scaleY:0.7877,x:-45.219,y:-0.5132}},{t:this.shape,p:{scaleX:0.7118,scaleY:0.7877,x:-38.9371,y:-0.4935}}]},1).wait(2));

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


(lib.Slots9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// slots
	this.lima = new lib.drag7G5();
	this.lima.name = "lima";
	this.lima.setTransform(121.1,460.9,0.8086,0.8086,0,0,0,82.2,26.7);
	new cjs.ButtonHelper(this.lima, 0, 1, 2, false, new lib.drag7G5(), 3);

	this.empat = new lib.drag7G4();
	this.empat.name = "empat";
	this.empat.setTransform(121.1,402.9,0.8086,0.8086,0,0,0,82.2,26.7);
	new cjs.ButtonHelper(this.empat, 0, 1, 2, false, new lib.drag7G4(), 3);

	this.tiga = new lib.drag7G3();
	this.tiga.name = "tiga";
	this.tiga.setTransform(121.1,344.9,0.8086,0.8086,0,0,0,82.2,26.7);
	new cjs.ButtonHelper(this.tiga, 0, 1, 2, false, new lib.drag7G3(), 3);

	this.dua = new lib.drag7G2();
	this.dua.name = "dua";
	this.dua.setTransform(121.1,287.6,0.8086,0.8086,0,0,0,82.2,26.7);
	new cjs.ButtonHelper(this.dua, 0, 1, 2, false, new lib.drag7G2(), 3);

	this.satu = new lib.drag7G1();
	this.satu.name = "satu";
	this.satu.setTransform(121.1,234.65,0.8086,0.8086,0,0,0,82.2,26.7);
	new cjs.ButtonHelper(this.satu, 0, 1, 2, false, new lib.drag7G1(), 3);

	this.kotakKartu2 = new lib.target();
	this.kotakKartu2.name = "kotakKartu2";
	this.kotakKartu2.setTransform(808.3,198.85,1.0251,1.0175,0,0,0,0.2,0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.kotakKartu2},{t:this.satu},{t:this.dua},{t:this.tiga},{t:this.empat},{t:this.lima}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Slots9, new cjs.Rectangle(49.9,173.1,827.9,313), null);


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
	this.lima.setTransform(495.35,281.05,0.6164,0.906,0,0,0,124.8,43.9);
	new cjs.ButtonHelper(this.lima, 0, 1, 1);

	this.empat = new lib.drop7G4();
	this.empat.name = "empat";
	this.empat.setTransform(686.8,346.85,0.4758,0.4758,0,0,0,125,43.7);
	new cjs.ButtonHelper(this.empat, 0, 1, 1);

	this.tiga = new lib.drop7G3();
	this.tiga.name = "tiga";
	this.tiga.setTransform(302.95,410.8,0.6164,1.4436,0,0,0,125,43.6);
	new cjs.ButtonHelper(this.tiga, 0, 1, 1);

	this.dua = new lib.drop7G2();
	this.dua.name = "dua";
	this.dua.setTransform(496.55,413.05,0.6164,0.6388,0,0,0,125,43.6);
	new cjs.ButtonHelper(this.dua, 0, 1, 1);

	this.satu = new lib.drop7G1();
	this.satu.name = "satu";
	this.satu.setTransform(307.4,284.85,0.6166,1.5353,0,0,0,125,43.9);
	new cjs.ButtonHelper(this.satu, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.satu},{t:this.dua},{t:this.tiga},{t:this.empat},{t:this.lima}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces9, new cjs.Rectangle(208,210.3,582.3,288.3), null);


(lib.Slots = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// slots
	this.target = new lib.targetcopy();
	this.target.name = "target";
	this.target.setTransform(895.4,314.5,0.6294,2.0456,0,0,0,0.3,0.2);

	this.star = new lib.StarSlot();
	this.star.name = "star";
	this.star.setTransform(773.6,370);

	this.roundedSquare = new lib.RoundedSquareSlot();
	this.roundedSquare.name = "roundedSquare";
	this.roundedSquare.setTransform(624.3,370);

	this.triangle = new lib.TriangleSlot();
	this.triangle.name = "triangle";
	this.triangle.setTransform(477.5,370);

	this.circle = new lib.CircleSlot();
	this.circle.name = "circle";
	this.circle.setTransform(330.7,370);

	this.square = new lib.SquareSlot();
	this.square.name = "square";
	this.square.setTransform(183.9,370);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.square},{t:this.circle},{t:this.triangle},{t:this.roundedSquare},{t:this.star},{t:this.target}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Slots, new cjs.Rectangle(134.9,262.6,803.1,156.39999999999998), null);


(lib.Pieces = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// pieces
	this.target = new lib.drag7G12copy();
	this.target.name = "target";
	this.target.setTransform(675.8,53.55,0.9279,0.9279,0,0,0,45.1,47);
	new cjs.ButtonHelper(this.target, 0, 1, 1);

	this.target_1 = new lib.drag7G11copy();
	this.target_1.name = "target_1";
	this.target_1.setTransform(552.45,53.55,0.9279,0.9279,0,0,0,45.3,47);
	new cjs.ButtonHelper(this.target_1, 0, 1, 1);

	this.drag2G1 = new lib.drag7G10copy();
	this.drag2G1.name = "drag2G1";
	this.drag2G1.setTransform(444.7,53.55,0.9279,0.9279,0,0,0,45,47);
	new cjs.ButtonHelper(this.drag2G1, 0, 1, 1);

	this.drag2G1_1 = new lib.drag7G9copy();
	this.drag2G1_1.name = "drag2G1_1";
	this.drag2G1_1.setTransform(339.45,53.55,0.9279,0.9279,0,0,0,45,47);
	new cjs.ButtonHelper(this.drag2G1_1, 0, 1, 1);

	this.star = new lib.Star();
	this.star.name = "star";
	this.star.setTransform(760.7,154.5);
	new cjs.ButtonHelper(this.star, 0, 1, 2);

	this.circle = new lib.Circle();
	this.circle.name = "circle";
	this.circle.setTransform(617.85,201.5);
	new cjs.ButtonHelper(this.circle, 0, 1, 2);

	this.square = new lib.Square();
	this.square.name = "square";
	this.square.setTransform(477.5,154.5);
	new cjs.ButtonHelper(this.square, 0, 1, 2);

	this.triangle = new lib.Triangle();
	this.triangle.name = "triangle";
	this.triangle.setTransform(337.15,201.5);
	new cjs.ButtonHelper(this.triangle, 0, 1, 2);

	this.roundedSquare = new lib.RoundedSquare();
	this.roundedSquare.name = "roundedSquare";
	this.roundedSquare.setTransform(196.8,154.5);
	new cjs.ButtonHelper(this.roundedSquare, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.roundedSquare},{t:this.triangle},{t:this.square},{t:this.circle},{t:this.star},{t:this.drag2G1_1},{t:this.drag2G1},{t:this.target_1},{t:this.target}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces, new cjs.Rectangle(138.8,6.8,673.9000000000001,252.7), null);


(lib.btnEit = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Path();
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
	this.exit = new lib.btnEit();
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
	this.instance = new lib.g3();
	this.instance.setTransform(-23.7,-100.15);
	this.instance.shadow = new cjs.Shadow("rgba(0,0,0,1)",2,2,11);

	this.instance_1 = new lib.g2();
	this.instance_1.setTransform(-146.7,-100.15);
	this.instance_1.shadow = new cjs.Shadow("rgba(0,0,0,1)",2,2,11);

	this.instance_2 = new lib.g1();
	this.instance_2.setTransform(-270.35,-100.15);
	this.instance_2.shadow = new cjs.Shadow("rgba(0,0,0,1)",0,0,10);

	this.drag2G1 = new lib.drag7G12();
	this.drag2G1.name = "drag2G1";
	this.drag2G1.setTransform(68.35,36.6,0.9279,0.9279,0,0,0,82.2,26.9);
	new cjs.ButtonHelper(this.drag2G1, 0, 1, 1);

	this.drag2G1_1 = new lib.drag7G11();
	this.drag2G1_1.name = "drag2G1_1";
	this.drag2G1_1.setTransform(-37.9,36.6,0.9279,0.9279,0,0,0,82.3,26.9);
	new cjs.ButtonHelper(this.drag2G1_1, 0, 1, 1);

	this.drag2G1_2 = new lib.drag7G10();
	this.drag2G1_2.name = "drag2G1_2";
	this.drag2G1_2.setTransform(-145.35,36.6,0.9279,0.9279,0,0,0,82.3,26.9);
	new cjs.ButtonHelper(this.drag2G1_2, 0, 1, 1);

	this.drag2G1_3 = new lib.drag7G9();
	this.drag2G1_3.name = "drag2G1_3";
	this.drag2G1_3.setTransform(-250.6,36.6,0.9279,0.9279,0,0,0,82.3,26.9);
	new cjs.ButtonHelper(this.drag2G1_3, 0, 1, 1);

	this.drag2G1_4 = new lib.drag7G8();
	this.drag2G1_4.name = "drag2G1_4";
	this.drag2G1_4.setTransform(-239.65,-12.4,1.0649,1.0649,0,0,0,82.2,26.7);
	new cjs.ButtonHelper(this.drag2G1_4, 0, 1, 1);

	this.drag2G1_5 = new lib.drag7G7();
	this.drag2G1_5.name = "drag2G1_5";
	this.drag2G1_5.setTransform(-239.65,-143.05,1.0649,1.0649,0,0,0,82.2,26.7);
	new cjs.ButtonHelper(this.drag2G1_5, 0, 1, 1);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.drag2G1_5},{t:this.drag2G1_4},{t:this.drag2G1_3},{t:this.drag2G1_2},{t:this.drag2G1_1},{t:this.drag2G1},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_8
	this.instance_3 = new lib.bg2();
	this.instance_3.setTransform(42.25,-18.75);
	this.instance_3.shadow = new cjs.Shadow("rgba(0,0,0,1)",2,2,11);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_2
	this.instance_4 = new lib.Tween7("synched",0);
	this.instance_4.setTransform(42.25,-40.25);
	this.instance_4.alpha = 0;

	this.instance_5 = new lib.Tween8("synched",0);
	this.instance_5.setTransform(42.25,-40.25);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({_off:true,alpha:1},12).to({_off:false,alpha:0},12).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({_off:false},12).to({_off:true,alpha:0},12).wait(1));

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
		  window.location.replace("../game11/index.html");
		});
		
		root.btnBack3.on("click", function () {
		  window.location.replace("../game9/index.html");
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

	// Layer_2
	this.pieces = new lib.Pieces();
	this.pieces.name = "pieces";
	this.pieces.setTransform(411.9,230.8,0.5191,0.5191);

	this.slots = new lib.Slots();
	this.slots.name = "slots";
	this.slots.setTransform(411.9,230.8,0.5191,0.5191);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.slots},{t:this.pieces}]}).wait(1));

	// materi
	this.popUpInfo = new lib.materi();
	this.popUpInfo.name = "popUpInfo";
	this.popUpInfo.setTransform(438.35,313.5);

	this.pieces_1 = new lib.Pieces9();
	this.pieces_1.name = "pieces_1";

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.pieces_1},{t:this.popUpInfo}]}).wait(1));

	// code
	this.popUpInfo_1 = new lib.popUpInfo();
	this.popUpInfo_1.name = "popUpInfo_1";
	this.popUpInfo_1.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.popUpInfo_1).wait(1));

	// base
	this.btnInfo = new lib.btnInfo();
	this.btnInfo.name = "btnInfo";
	this.btnInfo.setTransform(441.9,169.05,0.6435,0.6435,0,0,0,0.1,0);
	new cjs.ButtonHelper(this.btnInfo, 0, 1, 2, false, new lib.btnInfo(), 3);

	this.restart = new lib.Restart();
	this.restart.name = "restart";
	this.restart.setTransform(522.3,167.85,0.7541,0.7541);
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

	this.pieces_2 = new lib.Pieces9();
	this.pieces_2.name = "pieces_2";

	this.slots_1 = new lib.Slots9();
	this.slots_1.name = "slots_1";

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.btnNextDasar1},{t:this.btnMenuDasar1},{t:this.btnBack3},{t:this.winMessage},{t:this.slots_1},{t:this.pieces_2},{t:this.judulKI},{t:this.Score},{t:this.restart},{t:this.btnInfo}]}).wait(1));

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
		{src:"images/_1.jpeg?1592898768967", id:"_1"},
		{src:"images/Bitmap101copy.png?1592898768967", id:"Bitmap101copy"},
		{src:"images/_3.jpeg?1592898768967", id:"_3"},
		{src:"images/Bitmap103copy.png?1592898768967", id:"Bitmap103copy"},
		{src:"images/Bitmap105.png?1592898768967", id:"Bitmap105"},
		{src:"images/Bitmap2.png?1592898768967", id:"Bitmap2"},
		{src:"images/Bitmap3.png?1592898768967", id:"Bitmap3"},
		{src:"images/bookpngcopy.png?1592898768967", id:"bookpngcopy"},
		{src:"images/_11.jpeg?1592898768967", id:"_11"},
		{src:"images/Bitmap102copy.png?1592898768967", id:"Bitmap102copy"}
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