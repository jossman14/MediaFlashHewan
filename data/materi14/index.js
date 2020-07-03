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
p.nominalBounds = new cjs.Rectangle(0,0,962,564);


(lib._1pngcopy = function() {
	this.initialize(img._1pngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,564);


(lib._2 = function() {
	this.initialize(img._2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,563);


(lib._10pngcopy = function() {
	this.initialize(img._10pngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,564);


(lib._4 = function() {
	this.initialize(img._4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,564);


(lib._2pngcopy = function() {
	this.initialize(img._2pngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,563);


(lib._3pngcopy = function() {
	this.initialize(img._3pngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,564);


(lib._5 = function() {
	this.initialize(img._5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,564);


(lib._4pngcopy = function() {
	this.initialize(img._4pngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,564);


(lib._3 = function() {
	this.initialize(img._3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,564);


(lib._1pngcopy2 = function() {
	this.initialize(img._1pngcopy2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,564);


(lib._7 = function() {
	this.initialize(img._7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,564);


(lib._6pngcopy = function() {
	this.initialize(img._6pngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,564);


(lib._8 = function() {
	this.initialize(img._8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,564);


(lib._8pngcopy = function() {
	this.initialize(img._8pngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,564);


(lib._9 = function() {
	this.initialize(img._9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,564);


(lib._9pngcopy = function() {
	this.initialize(img._9pngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,564);


(lib.bookpngcopy = function() {
	this.initialize(img.bookpngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,399);


(lib._7pngcopy = function() {
	this.initialize(img._7pngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,564);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);


(lib._6 = function() {
	this.initialize(img._6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,564);


(lib._5pngcopy = function() {
	this.initialize(img._5pngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,564);// helper functions:

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
	this.shape.graphics.f("#0097E6").s().p("EhB5AkpMAAAhJRMCDzAAAMAAABJRg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-421.8,-234.5,843.6,469.1);


(lib.Tween7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0097E6").s().p("EhB5AkpMAAAhJRMCDzAAAMAAABJRg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-421.8,-234.5,843.6,469.1);


(lib.Path = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#606163").s().p("Ap/z/QEEAADvBlQDkBhCxCyQCxCwBiDmQBkDtAAEEQAAEEhkDuQhiDmixCxQixCxjkBhQjvBkkEAAg");
	this.shape.setTransform(64,127.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,128,255.9), null);


(lib.btnMenuKI = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#18B8C4").s().p("AhXBMIBNhMIhNhMIAygxIB9B9Ih9B+g");
	this.shape.setTransform(-43.2848,1.4252,0.5327,0.5327,-90);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#18B8C4").s().p("Ah6CSICRiSIiRiRIAygyIDCDDIjCDDg");
	this.shape_1.setTransform(-43.2848,-6.899,0.5327,0.5327,-90);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7,p:{y:-3.875}},{t:this.shape_6,p:{y:-3.875}},{t:this.shape_5},{t:this.shape_4,p:{y:0.925}},{t:this.shape_3},{t:this.shape_2,p:{y:1.075}},{t:this.shape_1,p:{y:-6.899}},{t:this.shape,p:{y:1.4252}}]}).to({state:[{t:this.shape_7,p:{y:-2.275}},{t:this.shape_11},{t:this.shape_6,p:{y:-2.275}},{t:this.shape_10},{t:this.shape_4,p:{y:2.525}},{t:this.shape_9},{t:this.shape_2,p:{y:2.675}},{t:this.shape_1,p:{y:-5.299}},{t:this.shape,p:{y:3.0252}}]},1).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_4,p:{y:6.525}},{t:this.shape_12},{t:this.shape_2,p:{y:6.675}},{t:this.shape_1,p:{y:-1.299}},{t:this.shape,p:{y:7.0252}}]},1).wait(2));

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


(lib.btnAnim = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgKBUIAAh6IAVAAIAAB6gAgJg/QgDgDAAgFQAAgFADgEQAEgDAFAAQAGAAADADQAEAEAAAFQAAAFgEADQgDAEgGAAQgFAAgEgEg");
	this.shape.setTransform(80,-7.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgYA7QgLgGgHgJQgGgJAAgMIAVAAQAAALAJAHQAHAFAMABQAMAAAHgFQAIgFgBgIQABgJgHgFQgGgEgPgEQgQgDgKgEQgJgFgEgGQgFgHAAgJQAAgPANgLQANgKASAAQAWAAANALQAMAKAAASIgVAAQAAgJgHgGQgHgHgMAAQgKAAgHAGQgGAFAAAHQAAAIAGAEQAGAEAPADQAQAEAJAEQALAFAEAHQAFAHAAAJQAAARgOAKQgMAKgWAAQgNAAgMgFg");
	this.shape_1.setTransform(71.15,-5.05);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgmA1QgMgKAAgQQAAgTAPgKQAOgKAaAAIAUAAIAAgKQAAgLgGgGQgHgHgMAAQgLAAgIAGQgHAGAAAHIgVAAQAAgJAGgJQAHgIALgFQALgFANAAQAVAAAMAKQAMAMABASIAAA3QAAARAEAKIAAACIgWAAQgCgDgBgJQgPAPgTAAQgSAAgMgLgAgdAYQAAALAHAFQAGAGALgBQAJAAAJgEQAIgGAEgIIAAgZIgQAAQgmgBAAAXg");
	this.shape_2.setTransform(58.775,-5.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("ABBA/IAAhRQAAgNgGgGQgGgHgOAAQgMAAgHAHQgIAHgBAMIAABRIgVAAIAAhQQAAgbgaAAQgVAAgHASIAABZIgVAAIAAh6IAUAAIAAANQAOgQAXAAQAaAAAIAUQAGgJAKgFQAKgGANAAQApAAAAArIAABSg");
	this.shape_3.setTransform(42.225,-5.175);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJBUIAAh6IATAAIAAB6gAgIg/QgDgDAAgFQAAgFADgEQADgDAFAAQAGAAADADQADAEAAAFQAAAFgDADQgDAEgGAAQgFAAgDgEg");
	this.shape_4.setTransform(29.2,-7.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAcA/IAAhRQgBgNgGgHQgGgGgMAAQgKAAgHAGQgIAFgEAJIAABXIgWAAIAAh6IAUAAIABAPQAOgSAWAAQAnAAABAsIAABRg");
	this.shape_5.setTransform(19.9,-5.175);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAyBTIgPgrIhEAAIgQArIgXAAIA/ilIATAAIA/ClgAgbAWIA4AAIgdhNg");
	this.shape_6.setTransform(5.85,-7.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAcA/IAAhRQgBgNgFgHQgHgGgMAAQgKAAgHAGQgIAFgFAJIAABXIgVAAIAAh6IAUAAIABAPQAOgSAWAAQAnAAABAsIAABRg");
	this.shape_7.setTransform(-13.95,-5.175);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgmA1QgMgKAAgQQAAgTAPgKQAOgKAaAAIAUAAIAAgKQAAgLgGgGQgHgHgMAAQgLAAgIAGQgHAGAAAHIgVAAQAAgJAGgJQAHgIALgFQALgFANAAQAVAAAMAKQAMAMABASIAAA3QAAARAEAKIAAACIgWAAQgCgDgBgJQgPAPgTAAQgSAAgMgLgAgdAYQAAALAHAFQAGAGALgBQAJAAAJgEQAIgGAEgIIAAgZIgQAAQgmgBAAAXg");
	this.shape_8.setTransform(-26.775,-5.05);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAaBXIgqg4IgNANIAAArIgVAAIAAitIAVAAIAABpIALgOIAmgnIAZAAIguAxIA0BIg");
	this.shape_9.setTransform(-38.2,-7.65);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAbA/IAAhRQAAgNgGgHQgGgGgNAAQgJAAgIAGQgHAFgEAJIAABXIgVAAIAAh6IAUAAIAAAPQAOgSAWAAQAnAAAAAsIAABRg");
	this.shape_10.setTransform(-51.35,-5.175);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgKBUIAAh6IAUAAIAAB6gAgJg/QgCgDAAgFQAAgFACgEQAEgDAFAAQAGAAADADQADAEABAFQgBAFgDADQgDAEgGAAQgFAAgEgEg");
	this.shape_11.setTransform(-60.6,-7.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgmA1QgMgKAAgQQAAgTAPgKQAOgKAaAAIAUAAIAAgKQAAgLgGgGQgHgHgMAAQgLAAgIAGQgHAGAAAHIgVAAQAAgJAGgJQAHgIALgFQALgFANAAQAVAAAMAKQAMAMABASIAAA3QAAARAEAKIAAACIgWAAQgCgDgBgJQgPAPgTAAQgSAAgMgLgAgdAYQAAALAHAFQAGAGALgBQAJAAAJgEQAIgGAEgIIAAgZIgQAAQgmgBAAAXg");
	this.shape_12.setTransform(-69.825,-5.05);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AA9BTIAAhAIAChFIg3CFIgPAAIg3iFIACBFIAABAIgWAAIAAilIAdAAIA1CGIA2iGIAdAAIAAClg");
	this.shape_13.setTransform(-86.325,-7.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#0097E6").s().p("Ar7DZQhdAAhCgnIgIgFQg3glgDgxIAAipQAAg3BCgoQBCgnBdAAIX3AAQBdAABCAnQAmAWAPAcQANAVAAAYIAACpQgBAVgMAUQgNAYggAVIgIAFQhCAnhdAAg");
	this.shape_14.setTransform(-6.8,-7.075);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#535353").s().p("Ar7BcQhdAAhCgoIgIgFQgsgdgLglQgDgKAAgJIAAg1QADAxA3AlIAIAFQBCAnBdAAIX3AAQBdAABCgnIAIgFQAggUANgYQAMgVABgVIAAA1IAAAFIAAADQgDAQgHAOQAAAAAAAAQgBAAAAABQAAAAgBABQAAAAgBABQgNAYggAUIgIAFQhCAohdAAg");
	this.shape_15.setTransform(-6.8,10.8);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgKBUIAAh6IAVAAIAAB6gAgJg+QgDgEAAgFQAAgFADgEQAEgDAFAAQAGAAADADQAEAEAAAFQAAAFgEAEQgDADgGAAQgFAAgEgDg");
	this.shape_16.setTransform(80,-4.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgYA6QgLgEgHgKQgGgKAAgKIAVAAQAAAKAJAGQAHAHAMgBQAMAAAHgEQAIgFgBgIQABgJgHgEQgGgFgPgDQgQgEgKgEQgJgEgEgHQgFgHAAgJQAAgPANgLQANgKASAAQAWAAANALQAMAKAAARIgVAAQAAgIgHgHQgHgFgMAAQgKAAgHAEQgGAGAAAIQAAAHAGAEQAGAEAPAEQAQADAJAFQALAEAEAGQAFAIAAAJQAAARgOAKQgMAKgWAAQgNAAgMgGg");
	this.shape_17.setTransform(71.15,-1.85);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgmA2QgMgLAAgQQAAgTAPgJQAOgLAaAAIAUAAIAAgKQAAgLgGgHQgHgGgMAAQgLAAgIAFQgHAGAAAJIgVAAQAAgKAGgIQAHgJALgFQALgFANAAQAVAAAMAKQAMALABATIAAA4QAAARAEAKIAAACIgWAAQgCgEgBgKQgPAQgTAAQgSAAgMgKgAgdAZQAAAJAHAGQAGAFALABQAJAAAJgGQAIgFAEgIIAAgaIgQAAQgmAAAAAYg");
	this.shape_18.setTransform(58.775,-1.85);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgJBUIAAh6IATAAIAAB6gAgIg+QgDgEAAgFQAAgFADgEQADgDAFAAQAGAAADADQADAEAAAFQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_19.setTransform(29.2,-4.1);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAyBTIgPgsIhEAAIgQAsIgXAAIA/ilIATAAIA/ClgAgbAVIA4AAIgdhMg");
	this.shape_20.setTransform(5.85,-4);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgmA2QgMgLAAgQQAAgTAPgJQAOgLAaAAIAUAAIAAgKQAAgLgGgHQgHgGgMAAQgLAAgIAFQgHAGAAAJIgVAAQAAgKAGgIQAHgJALgFQALgFANAAQAVAAAMAKQAMALABATIAAA4QAAARAEAKIAAACIgWAAQgCgEgBgKQgPAQgTAAQgSAAgMgKgAgdAZQAAAJAHAGQAGAFALABQAJAAAJgGQAIgFAEgIIAAgaIgQAAQgmAAAAAYg");
	this.shape_21.setTransform(-26.775,-1.85);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAaBYIgqg6IgNAOIAAAsIgVAAIAAivIAVAAIAABpIALgNIAmgoIAZAAIguAzIA0BIg");
	this.shape_22.setTransform(-38.2,-4.45);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgKBUIAAh6IAUAAIAAB6gAgJg+QgCgEAAgFQAAgFACgEQAEgDAFAAQAGAAADADQADAEABAFQgBAFgDAEQgDADgGAAQgFAAgEgDg");
	this.shape_23.setTransform(-60.6,-4.1);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgmA2QgMgLAAgQQAAgTAPgJQAOgLAaAAIAUAAIAAgKQAAgLgGgHQgHgGgMAAQgLAAgIAFQgHAGAAAJIgVAAQAAgKAGgIQAHgJALgFQALgFANAAQAVAAAMAKQAMALABATIAAA4QAAARAEAKIAAACIgWAAQgCgEgBgKQgPAQgTAAQgSAAgMgKgAgdAZQAAAJAHAGQAGAFALABQAJAAAJgGQAIgFAEgIIAAgaIgQAAQgmAAAAAYg");
	this.shape_24.setTransform(-69.825,-1.85);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AA9BTIAAhBIAChFIg3CGIgPAAIg3iFIACBEIAABBIgWAAIAAilIAdAAIA1CHIA2iHIAdAAIAAClg");
	this.shape_25.setTransform(-86.325,-4);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#535353").s().p("Ar7BMQhdAAhCgoIgIgFQgsgdgLglQgDgKAAgJIAAgVQADAxA3AkIAIAFQBCAnBdAAIX3AAQBdAABCgnIAIgFQAggUANgYQAMgTABgWIAAAVIAAAFIAAADQgDAQgHAOQAAABAAAAQgBAAAAABQAAAAgBABQAAAAgBABQgNAXggAUIgIAFQhCAohdAAg");
	this.shape_26.setTransform(-6.8,12.4);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgKBUIAAh6IAVAAIAAB6gAgJg+QgDgEAAgFQAAgFADgDQAEgEAFAAQAGAAADAEQAEADAAAFQAAAFgEAEQgDADgGAAQgFAAgEgDg");
	this.shape_27.setTransform(80,-1.95);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgYA6QgLgEgHgKQgGgJAAgMIAVAAQAAALAJAGQAHAHAMgBQAMAAAHgEQAIgFgBgIQABgJgHgEQgGgFgPgDQgQgEgKgEQgJgFgEgGQgFgHAAgJQAAgPANgKQANgLASAAQAWAAANALQAMALAAAQIgVAAQAAgIgHgHQgHgFgMAAQgKAAgHAEQgGAGAAAIQAAAHAGAEQAGAEAPAEQAQADAJAFQALADAEAIQAFAHAAAKQAAAQgOAKQgMAKgWAAQgNAAgMgGg");
	this.shape_28.setTransform(71.15,0.3);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgmA2QgMgLAAgPQAAgUAPgJQAOgLAaAAIAUAAIAAgKQAAgLgGgHQgHgGgMAAQgLAAgIAFQgHAHAAAIIgVAAQAAgKAGgIQAHgJALgFQALgFANAAQAVAAAMALQAMAKABATIAAA3QAAASAEAJIAAADIgWAAQgCgEgBgKQgPAQgTAAQgSAAgMgKgAgdAZQAAAJAHAGQAGAFALABQAJAAAJgGQAIgFAEgIIAAgaIgQAAQgmAAAAAYg");
	this.shape_29.setTransform(58.775,0.3);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgJBUIAAh6IATAAIAAB6gAgIg+QgDgEAAgFQAAgFADgDQADgEAFAAQAGAAADAEQADADAAAFQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_30.setTransform(29.2,-1.95);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgmA2QgMgLAAgPQAAgUAPgJQAOgLAaAAIAUAAIAAgKQAAgLgGgHQgHgGgMAAQgLAAgIAFQgHAHAAAIIgVAAQAAgKAGgIQAHgJALgFQALgFANAAQAVAAAMALQAMAKABATIAAA3QAAASAEAJIAAADIgWAAQgCgEgBgKQgPAQgTAAQgSAAgMgKgAgdAZQAAAJAHAGQAGAFALABQAJAAAJgGQAIgFAEgIIAAgaIgQAAQgmAAAAAYg");
	this.shape_31.setTransform(-26.775,0.3);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgKBUIAAh6IAUAAIAAB6gAgJg+QgCgEAAgFQAAgFACgDQAEgEAFAAQAGAAADAEQADADABAFQgBAFgDAEQgDADgGAAQgFAAgEgDg");
	this.shape_32.setTransform(-60.6,-1.95);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgmA2QgMgLAAgPQAAgUAPgJQAOgLAaAAIAUAAIAAgKQAAgLgGgHQgHgGgMAAQgLAAgIAFQgHAHAAAIIgVAAQAAgKAGgIQAHgJALgFQALgFANAAQAVAAAMALQAMAKABATIAAA3QAAASAEAJIAAADIgWAAQgCgEgBgKQgPAQgTAAQgSAAgMgKgAgdAZQAAAJAHAGQAGAFALABQAJAAAJgGQAIgFAEgIIAAgaIgQAAQgmAAAAAYg");
	this.shape_33.setTransform(-69.825,0.3);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AA9BTIAAhAIAChGIg3CGIgPAAIg3iFIACBFIAABAIgWAAIAAilIAdAAIA1CHIA2iHIAdAAIAAClg");
	this.shape_34.setTransform(-86.325,-1.85);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#535353").s().p("AAAAJIgDAIIgCADIAFgLgAAGgTIAAAEIAAAEIgBADIABgLg");
	this.shape_35.setTransform(91.5,8.975);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#0097E6").s().p("Ar7DZQhdAAhCgnIgIgFQgyghgHgrIgBgKIAAipQAAg3BCgoQBCgnBdAAIX3AAQBdAABCAnQAmAWAPAcQANAVAAAYIAACpIgBALIAAAAQgCAJgDAJIgGALIgBABQgNAYggAVIgIAFQhCAnhdAAg");
	this.shape_36.setTransform(-6.8,-1.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14,p:{y:-7.075}},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10,p:{y:-5.175}},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7,p:{y:-5.175}},{t:this.shape_6},{t:this.shape_5,p:{y:-5.175}},{t:this.shape_4},{t:this.shape_3,p:{y:-5.175}},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_14,p:{y:-3.875}},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_10,p:{y:-1.975}},{t:this.shape_22,p:{y:-4.45}},{t:this.shape_21},{t:this.shape_7,p:{y:-1.975}},{t:this.shape_20,p:{y:-4}},{t:this.shape_5,p:{y:-1.975}},{t:this.shape_19},{t:this.shape_3,p:{y:-1.975}},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16}]},1).to({state:[{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_10,p:{y:0.175}},{t:this.shape_22,p:{y:-2.3}},{t:this.shape_31},{t:this.shape_7,p:{y:0.175}},{t:this.shape_20,p:{y:-1.85}},{t:this.shape_5,p:{y:0.175}},{t:this.shape_30},{t:this.shape_3,p:{y:0.175}},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-105.7,-28.8,197.8,48.8);


(lib.bg10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._1pngcopy();
	this.instance.setTransform(-229,-134,0.8382,0.8308);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg10, new cjs.Rectangle(-229,-134,459.6,267.1), null);


(lib.anim1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._1();
	this.instance.setTransform(-332,-194,1.0003,0.997);

	this.instance_1 = new lib._2();
	this.instance_1.setTransform(-332,-194,1.0003,0.9988);

	this.instance_2 = new lib._3();
	this.instance_2.setTransform(-332,-194,1.0003,0.9971);

	this.instance_3 = new lib._4();
	this.instance_3.setTransform(-332,-194,1.0003,0.997);

	this.instance_4 = new lib._5();
	this.instance_4.setTransform(-332,-194,1.0003,0.997);

	this.instance_5 = new lib._6();
	this.instance_5.setTransform(-332,-194,1.0003,0.997);

	this.instance_6 = new lib._7();
	this.instance_6.setTransform(-332,-194,1.0003,0.997);

	this.instance_7 = new lib._8();
	this.instance_7.setTransform(-332,-194,1.0003,0.997);

	this.instance_8 = new lib._9();
	this.instance_8.setTransform(-332,-194,1.0003,0.997);

	this.instance_9 = new lib._1pngcopy2();
	this.instance_9.setTransform(-332,-194,1.0003,0.997);

	this.instance_10 = new lib._2pngcopy();
	this.instance_10.setTransform(-332,-194,1.0003,0.9988);

	this.instance_11 = new lib._3pngcopy();
	this.instance_11.setTransform(-332,-194,1.0003,0.997);

	this.instance_12 = new lib._4pngcopy();
	this.instance_12.setTransform(-332,-194,1.0003,0.997);

	this.instance_13 = new lib._5pngcopy();
	this.instance_13.setTransform(-332,-194,1.0003,0.997);

	this.instance_14 = new lib._6pngcopy();
	this.instance_14.setTransform(-332,-194,1.0003,0.997);

	this.instance_15 = new lib._7pngcopy();
	this.instance_15.setTransform(-332,-194,1.0003,0.997);

	this.instance_16 = new lib._8pngcopy();
	this.instance_16.setTransform(-332,-194,1.0003,0.997);

	this.instance_17 = new lib._9pngcopy();
	this.instance_17.setTransform(-332,-194,1.0003,0.997);

	this.instance_18 = new lib._10pngcopy();
	this.instance_18.setTransform(-332,-194,1.0003,0.997);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},21).to({state:[{t:this.instance_2}]},21).to({state:[{t:this.instance_3}]},21).to({state:[{t:this.instance_4}]},21).to({state:[{t:this.instance_5}]},21).to({state:[{t:this.instance_6}]},21).to({state:[{t:this.instance_7}]},21).to({state:[{t:this.instance_8}]},21).to({state:[{t:this.instance_9}]},21).to({state:[{t:this.instance_10}]},21).to({state:[{t:this.instance_11}]},21).to({state:[{t:this.instance_12}]},21).to({state:[{t:this.instance_13}]},21).to({state:[{t:this.instance_14}]},21).to({state:[{t:this.instance_15}]},22).to({state:[{t:this.instance_16}]},21).to({state:[{t:this.instance_17}]},21).to({state:[{t:this.instance_18}]},21).wait(21));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-332,-194,664,388);


(lib.Symbol25 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween8("synched",0);
	this.instance.setTransform(42.25,-40.25);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


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


(lib.popUpAnimasi = function(mode,startPosition,loop) {
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

	// Layer_7
	this.instance = new lib.anim1();
	this.instance.setTransform(52.9,-20.1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_6
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Eg9EAe+QhzAAABhzMAAAg6VQgBhzBzAAMB6JAAAQBzAAAABzMAAAA6VQAABzhzAAg");
	this.shape.setTransform(42.25,-20.25);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgfCmIAAjtIA/AAIAADtgAgYhtQgLgJABgOQAAgPAJgJQAKgJAPAAQAQAAAKAJQAKAJAAAPQAAAOgKAJQgKAKgQAAQgPAAgJgKg");
	this.shape_1.setTransform(119,-243.875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgyBxQgYgLgNgTQgNgSAAgWIA8AAQABARALAJQAMAJATAAQASAAAKgHQAJgHgBgLQAAgMgLgGQgMgHgYgFQhUgSgBg1QAAggAagVQAagVAqAAQAuAAAbAVQAbAVAAAiIhAAAQAAgNgIgJQgJgJgTAAQgPAAgJAHQgIAIgBALQAAAKAKAHQALAGAWAFQAYAFAQAGQAyARAAAtQAAAhgbAUQgcAUgsAAQgdAAgXgKg");
	this.shape_2.setTransform(101.35,-239.175);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AhRBnQgYgUAAgfQAAgmAcgTQAdgUAzAAIAeAAIAAgOQAAgQgJgKQgIgKgRAAQgQAAgJAHQgKAIAAAOIg/AAQgBgVANgSQANgRAXgKQAYgKAbAAQAsAAAbAWQAZAWAAAoIAABmQAAAiAKARIAAAEIhAAAQgFgJgCgNQgXAagkAAQgiAAgXgUgAgpAsIAAADQAAAMAIAIQAIAIAPAAQANAAAMgHQAMgGAGgKIAAgpIgYAAQgvAAgDAhg");
	this.shape_3.setTransform(77.9,-239.175);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("ABqB5IAAiXQAAgTgHgKQgIgJgUAAQgdgBgLAcIAACiIg+AAIAAiXQAAgUgIgJQgIgJgUAAQgbgBgMAXIAACnIg/AAIAAjsIA7AAIACAaQAZgfArAAQAtAAARAkQAZgkAvAAQAmAAATAXQATAWAAAtIAACXg");
	this.shape_4.setTransform(46.375,-239.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgfCmIAAjtIA/AAIAADtgAgYhtQgLgJABgOQAAgPAJgJQAKgJAPAAQAQAAAKAJQAKAJAAAPQAAAOgKAJQgKAKgQAAQgPAAgJgKg");
	this.shape_5.setTransform(20.9,-243.875);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgJgJQgIgJgVAAQgZAAgOAWIAACnIg/AAIAAjsIA7AAIACAbQAaggApAAQAnAAARAWQATAXAAAsIAACYg");
	this.shape_6.setTransform(2.3,-239.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("ABQCgIgWhCIhzAAIgWBCIhGAAIB3k/IA8AAIB4E/gAgnApIBPAAIgoh3g");
	this.shape_7.setTransform(-25.425,-243.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]},12).to({state:[]},1).wait(12));

	// Layer_2
	this.instance_1 = new lib.Tween7("synched",0);
	this.instance_1.setTransform(43.5,-40.25);
	this.instance_1.alpha = 0;

	this.instance_2 = new lib.Symbol25("synched",0);
	this.instance_2.setTransform(42.2,-40.2,1,1,0,0,0,42.2,-40.2);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({x:42.25,alpha:0.1719},2).to({_off:true,regX:42.2,regY:-40.2,x:42.2,y:-40.2,alpha:1},10).to({_off:false,regX:0,regY:0,x:43.5,y:-40.25,alpha:0},12).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(2).to({_off:false},10).to({_off:true,regX:0,regY:0,x:43.5,y:-40.25,alpha:0},12).wait(1));

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
(lib.materi14 = function(mode,startPosition,loop) {
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
		  window.location.replace("../materi11/index.html");
		});
		
		root.btnBack3.on("click", function () {
		  window.location.replace("../materi10/index.html");
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
		
		
		
		root.popUpAnim1.gotoAndStop(0);
		
		root.btnAnim1.on("click", function () {
		  root.popUpAnim1.gotoAndPlay(0);
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// animasi
	this.popUpAnim1 = new lib.popUpAnimasi();
	this.popUpAnim1.name = "popUpAnim1";
	this.popUpAnim1.setTransform(496.6,306.6,1,1,0,0,0,50.2,-28.9);

	this.timeline.addTween(cjs.Tween.get(this.popUpAnim1).wait(1));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgdAnQgIgIAAgLQAAgPAKgGQALgIASAAIANAAIAAgGQAAgHgEgEQgEgEgHAAQgGAAgFADQgFAEAAAFIgUAAQAAgIAGgFQAEgHAIgEQAJgEAJAAQAQABAJAHQAKAJAAAOIAAAnQAAANADAGIAAACIgUAAIgCgIQgKAJgNABQgNAAgJgIgAgLAGQgHAEAAAIQAAAFAFAEQAEADAGABQAFAAAFgDQAGgDACgFIAAgRIgLAAQgKAAgFADg");
	this.shape.setTransform(352.95,410.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AggA+IAAgQIAEAAQAHAAAEgDQAEgCACgHIADgIIgfhYIAVAAIATA9IASg9IAVAAIgjBmQgIAXgTAAIgKgBg");
	this.shape_1.setTransform(344.175,412.225);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgdAnQgJgIAAgLQAAgPALgGQALgIASAAIANAAIAAgGQAAgHgEgEQgEgEgHAAQgGAAgFADQgEAEAAAFIgUAAQAAgIAEgFQAFgHAJgEQAIgEAKAAQAPABAKAHQAJAJAAAOIAAAnQAAANADAGIAAACIgUAAIgDgIQgJAJgNABQgNAAgJgIgAgMAGQgFAEAAAIQAAAFADAEQAEADAHABQAFAAAFgDQAFgDADgFIAAgRIgLAAQgKAAgGADg");
	this.shape_2.setTransform(335.45,410.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AARBAIAAg6QAAgIgEgEQgEgEgIAAQgLAAgGAKIAABAIgUAAIAAh/IAUAAIAAAwQAKgMAOAAQAdAAAAAgIAAA7g");
	this.shape_3.setTransform(326.125,408.525);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgdAnQgJgIAAgLQAAgPALgGQALgIATAAIAMAAIAAgGQAAgHgEgEQgEgEgHAAQgHAAgEADQgFAEABAFIgVAAQABgIAEgFQAFgHAIgEQAJgEAKAAQAPABAJAHQAKAJAAAOIAAAnQAAANAEAGIAAACIgVAAIgDgIQgJAJgNABQgOAAgIgIgAgMAGQgFAEgBAIQABAFAEAEQADADAHABQAFAAAFgDQAFgDADgFIAAgRIgLAAQgKAAgGADg");
	this.shape_4.setTransform(316.8,410.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgTA1IgBAKIgSAAIAAh/IAUAAIAAAvQAIgLAOAAQARAAAJANQAJAMAAAVIAAABQAAAVgJAMQgJANgRAAQgOAAgJgMgAgSAAIAAAlQAFALANAAQAJAAAFgHQAFgHAAgOIAAgDQAAgOgFgHQgFgHgJAAQgNAAgFALg");
	this.shape_5.setTransform(307.625,408.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgWAuIAAhZIATAAIAAAKQAGgMANAAIAHABIAAATIgIAAQgOAAgEAKIAAA9g");
	this.shape_6.setTransform(300.05,410.325);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgbAiQgMgMABgTIAAgDQAAgNAEgKQAGgKAJgGQAJgGALgBQATAAAJAMQALAMAAAVIAAAHIg6AAQABALAGAHQAHAGAJABQAOgBAIgKIALAKQgGAIgIAEQgKAEgKABQgTAAgMgNgAgLgXQgGAFgBALIAlAAIAAgCQAAgKgFgFQgFgFgIgBQgIAAgEAHg");
	this.shape_7.setTransform(292.2,410.4);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgTA1IgBAKIgSAAIAAh/IAUAAIAAAvQAIgLAOAAQARAAAJANQAJAMAAAVIAAABQAAAVgJAMQgJANgRAAQgOAAgJgMgAgSAAIAAAlQAFALANAAQAJAAAFgHQAFgHAAgOIAAgDQAAgOgFgHQgFgHgJAAQgNAAgFALg");
	this.shape_8.setTransform(282.975,408.6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_9.setTransform(269.025,410.325);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgdAnQgIgIAAgLQAAgPAKgGQALgIASAAIANAAIAAgGQAAgHgEgEQgEgEgHAAQgGAAgFADQgEAEgBAFIgUAAQAAgIAGgFQAEgHAJgEQAIgEAJAAQAQABAKAHQAJAJAAAOIAAAnQAAANADAGIAAACIgUAAIgCgIQgKAJgNABQgNAAgJgIgAgLAGQgHAEABAIQgBAFAEAEQAFADAGABQAFAAAFgDQAGgDACgFIAAgRIgLAAQgKAAgFADg");
	this.shape_10.setTransform(259.7,410.4);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgcA0QgKgMAAgXQAAgTAJgNQAKgNAQAAQAOABAIAJIAAguIAUAAIAAB/IgSAAIgBgKQgJAMgOAAQgQAAgJgNgAgNgDQgFAGAAAQQAAAOAFAHQAGAIAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_11.setTransform(250.075,408.6);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_12.setTransform(693.575,385.925);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_13.setTransform(684.125,386.075);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgbAiQgLgLAAgWIAAgCQAAgUALgMQALgNASAAQAQAAAKAKQAKAJABAPIgTAAQgBgIgEgEQgFgGgIAAQgJABgFAHQgFAHgBAOIAAADQAAAOAGAIQAFAHAJAAQAIgBAFgEQAEgEABgHIATAAQAAAJgFAHQgFAHgJAEQgIAEgKABQgSAAgLgNg");
	this.shape_14.setTransform(675.025,386);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgdAnQgJgIAAgLQAAgPALgGQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEADQgFAEABAFIgVAAQABgIAFgFQAEgHAIgEQAJgDAJgBQAQABAJAHQAKAIAAAPIAAAnQAAAMAEAHIAAACIgVAAIgDgJQgJALgNAAQgOAAgIgIgAgMAGQgFAEgBAIQAAAFAFAEQAEADAGABQAFAAAFgEQAFgDADgEIAAgRIgLAAQgKAAgGADg");
	this.shape_15.setTransform(665.9,386);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgWAuIAAhZIATAAIAAAKQAGgMANAAIAHABIAAATIgIAAQgOAAgEAKIAAA9g");
	this.shape_16.setTransform(658.7,385.925);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgbAiQgMgMABgTIAAgDQAAgMAEgLQAGgLAJgFQAKgHAKAAQATAAAJAMQALAMAAAVIAAAHIg7AAQACALAGAHQAHAGAJABQANgBAJgKIALAKQgGAIgIAEQgKAEgKABQgTAAgMgNgAgLgXQgGAGgBAJIAlAAIAAgBQAAgKgFgFQgFgFgIgBQgIAAgEAHg");
	this.shape_17.setTransform(650.85,386);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgTA1IgBAKIgSAAIAAh/IAUAAIAAAvQAIgLAOAAQARABAJAMQAJAMAAAVIAAABQAAAVgJAMQgJANgRAAQgOAAgJgMgAgSAAIAAAkQAFAMANAAQAJAAAFgHQAFgHAAgOIAAgDQAAgPgFgFQgFgIgJAAQgNAAgFALg");
	this.shape_18.setTransform(641.625,384.2);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AAQBAIgZgnIgJAJIAAAeIgVAAIAAh/IAVAAIAABJIAGgIIAYgbIAYAAIgiAkIAlA1g");
	this.shape_19.setTransform(627.05,384.125);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgdAnQgIgIAAgLQAAgPAKgGQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFADQgEAEgBAFIgUAAQAAgIAGgFQAEgHAIgEQAJgDAJgBQAQABAKAHQAJAIAAAPIAAAnQAAAMADAHIAAACIgUAAIgCgJQgKALgNAAQgNAAgJgIgAgLAGQgHAEAAAIQAAAFAEAEQAFADAGABQAFAAAFgEQAGgDACgEIAAgRIgLAAQgKAAgFADg");
	this.shape_20.setTransform(617.45,386);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgcA0QgKgMAAgXQAAgTAJgNQAKgNAQAAQAOABAIAJIAAguIAUAAIAAB/IgSAAIgBgKQgJAMgOAAQgQAAgJgNgAgNgDQgFAHAAAPQAAAOAFAIQAGAHAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_21.setTransform(607.825,384.2);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgEAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDAEQgDACgFAAQgEAAgDgCg");
	this.shape_22.setTransform(601.075,384.3);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgVIATAAIAAAVIAQAAIAAAPIgQAAIAAAyQAAAEACACQACADAGAAIAHgBIAAAQIgOACQgWAAAAgag");
	this.shape_23.setTransform(595.875,385);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgUA8QgJgFgFgGIAKgNQAJAMANAAQAKAAAFgGQAHgGAAgKIAAgGQgKAKgNAAQgPAAgLgNQgJgMgBgWQAAgUAKgNQAKgNAQAAQAOAAAJALIABgJIASAAIAABWQABASgLAKQgMAKgRAAQgKAAgKgDgAgNgmQgGAIABAPQgBANAGAIQAGAHAIAAQAMAAAHgKIAAgnQgHgKgLAAQgKAAgFAIg");
	this.shape_24.setTransform(582.5,387.7);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_25.setTransform(573.125,385.925);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AgdAnQgJgIABgLQAAgPAKgGQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEADQgEAEgBAFIgTAAQAAgIAEgFQAFgHAJgEQAIgDAJgBQAQABAKAHQAJAIAAAPIAAAnQAAAMADAHIAAACIgUAAIgCgJQgKALgNAAQgNAAgJgIgAgLAGQgHAEABAIQAAAFADAEQAFADAGABQAFAAAFgEQAGgDACgEIAAgRIgLAAQgKAAgFADg");
	this.shape_26.setTransform(563.8,386);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AggA+IAAgQIAEAAQAHAAAEgDQAEgCACgHIADgIIgfhYIAVAAIATA9IASg9IAVAAIgjBmQgIAXgTAAIgKgBg");
	this.shape_27.setTransform(555.025,387.825);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgVIATAAIAAAVIAQAAIAAAPIgQAAIAAAyQAAAEACACQACADAGAAIAHgBIAAAQIgOACQgWAAAAgag");
	this.shape_28.setTransform(542.125,385);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgEAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDAEQgDACgFAAQgEAAgDgCg");
	this.shape_29.setTransform(537.325,384.3);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_30.setTransform(532.975,384.125);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AgdAiQgMgMAAgWIAAAAQAAgNAGgKQAFgLAJgFQAKgHALAAQASAAAMAMQALAMABATIAAAEQAAANgFAKQgFALgKAGQgJAGgNAAQgSAAgLgNgAgPgVQgGAHAAAPQAAAOAGAIQAGAIAJAAQAKgBAGgHQAGgJAAgOQAAgOgGgHQgGgJgKAAQgJAAgGAJg");
	this.shape_31.setTransform(525.925,386);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AgTA1IgBAKIgSAAIAAh/IAUAAIAAAvQAIgLAOAAQARABAJAMQAJAMAAAVIAAABQAAAVgJAMQgJANgRAAQgOAAgJgMgAgSAAIAAAkQAFAMANAAQAJAAAFgHQAFgHAAgOIAAgDQAAgPgFgFQgFgIgJAAQgNAAgFALg");
	this.shape_32.setTransform(516.525,384.2);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AgdAnQgIgIAAgLQAAgPAKgGQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFADQgFAEAAAFIgUAAQAAgIAGgFQAEgHAIgEQAJgDAJgBQAQABAJAHQAKAIAAAPIAAAnQAAAMAEAHIAAACIgVAAIgDgJQgJALgNAAQgNAAgJgIgAgLAGQgHAEAAAIQAAAFAFAEQAEADAGABQAFAAAFgEQAFgDADgEIAAgRIgLAAQgKAAgFADg");
	this.shape_33.setTransform(506.95,386);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgVIATAAIAAAVIAQAAIAAAPIgQAAIAAAyQAAAEACACQACADAGAAIAHgBIAAAQIgOACQgWAAAAgag");
	this.shape_34.setTransform(499.325,385);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AgaAiQgMgMAAgTIAAgDQAAgMAEgLQAGgLAJgFQAKgHAKAAQASAAAKAMQAKAMAAAVIAAAHIg5AAQABALAGAHQAHAGAIABQAOgBAJgKIALAKQgGAIgIAEQgKAEgLABQgSAAgLgNgAgLgXQgGAGgBAJIAlAAIAAgBQAAgKgFgFQgEgFgJgBQgIAAgEAHg");
	this.shape_35.setTransform(492.25,386);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AAsAuIAAg6QAAgIgFgEQgDgEgJAAQgGAAgFAEQgEADgCAGIAAA9IgTAAIAAg6QgBgQgQAAQgLAAgGAKIAABAIgTAAIAAhZIASAAIABAJQAJgLARAAQARAAAHAOQAJgOASAAQAPAAAHAIQAHAJAAAQIAAA6g");
	this.shape_36.setTransform(480.2,385.925);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgEAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDAEQgDACgFAAQgEAAgDgCg");
	this.shape_37.setTransform(459.125,384.3);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AgcA0QgKgMAAgXQAAgTAJgNQAKgNAQAAQAOABAIAJIAAguIAUAAIAAB/IgSAAIgBgKQgJAMgOAAQgQAAgJgNgAgNgDQgFAHAAAPQAAAOAFAIQAGAHAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_38.setTransform(451.925,384.2);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AgdAnQgJgIABgLQAAgPAKgGQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEADQgEAEgBAFIgTAAQAAgIAEgFQAFgHAJgEQAIgDAJgBQAQABAKAHQAJAIAAAPIAAAnQAAAMADAHIAAACIgUAAIgCgJQgKALgNAAQgNAAgJgIgAgLAGQgHAEABAIQAAAFADAEQAEADAHABQAFAAAFgEQAGgDACgEIAAgRIgLAAQgKAAgFADg");
	this.shape_39.setTransform(442.75,386);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AgSBPIAAgQIAHAAQAKAAAAgLIAAhhIATAAIAABhQAAANgHAIQgHAHgMAAQgFAAgFgBgAAAg9QgDgDAAgEQAAgFADgDQACgDAGAAQAFAAADADQADADAAAFQAAAEgDADQgDADgFAAQgGAAgCgDg");
	this.shape_40.setTransform(435.225,386.125);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_41.setTransform(429.175,385.925);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AgbAiQgMgMABgTIAAgDQAAgMAEgLQAGgLAJgFQAKgHAKAAQATAAAJAMQALAMAAAVIAAAHIg7AAQACALAGAHQAHAGAJABQAOgBAIgKIALAKQgGAIgIAEQgKAEgKABQgTAAgMgNgAgLgXQgGAGgBAJIAlAAIAAgBQAAgKgFgFQgFgFgIgBQgIAAgEAHg");
	this.shape_42.setTransform(420,386);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AArAuIAAg6QAAgIgDgEQgEgEgJAAQgGAAgFAEQgFADgBAGIAAA9IgTAAIAAg6QAAgQgRAAQgLAAgGAKIAABAIgUAAIAAhZIATAAIABAJQAKgLAQAAQARAAAHAOQAJgOASAAQAPAAAHAIQAIAJgBAQIAAA6g");
	this.shape_43.setTransform(407.95,385.925);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AgdAnQgIgIAAgLQAAgPAKgGQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFADQgEAEgBAFIgUAAQAAgIAGgFQAEgHAJgEQAIgDAJgBQAQABAKAHQAJAIAAAPIAAAnQAAAMADAHIAAACIgUAAIgCgJQgKALgNAAQgNAAgJgIgAgLAGQgHAEABAIQgBAFAEAEQAFADAGABQAFAAAFgEQAGgDACgEIAAgRIgLAAQgKAAgFADg");
	this.shape_44.setTransform(390.2,386);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AgUA8QgJgFgFgGIAKgNQAJAMANAAQAJAAAHgGQAFgGABgKIAAgGQgKAKgNAAQgPAAgLgNQgKgMAAgWQAAgUAKgNQAKgNAQAAQAPAAAJALIABgJIASAAIAABWQgBASgKAKQgMAKgRAAQgKAAgKgDgAgNgmQgFAIgBAPQABANAFAIQAGAHAIAAQAMAAAHgKIAAgnQgHgKgLAAQgJAAgGAIg");
	this.shape_45.setTransform(380.6,387.7);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AgTA8QgKgFgFgGIAKgNQAJAMAOAAQAIAAAHgGQAFgGAAgKIAAgGQgIAKgOAAQgPAAgKgNQgLgMABgWQAAgUAJgNQAKgNAQAAQAPAAAIALIACgJIASAAIAABWQAAASgMAKQgLAKgRAAQgKAAgJgDgAgNgmQgFAIAAAPQAAANAFAIQAFAHAJAAQANAAAFgKIAAgnQgFgKgNAAQgIAAgGAIg");
	this.shape_46.setTransform(370.95,387.7);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_47.setTransform(361.575,385.925);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgEAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDAEQgDACgFAAQgEAAgDgCg");
	this.shape_48.setTransform(354.675,384.3);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AARBAIAAg6QAAgIgEgEQgEgEgIAAQgLAAgGAKIAABAIgUAAIAAh/IAUAAIAAAwQAKgMAOAAQAdAAAAAgIAAA7g");
	this.shape_49.setTransform(347.775,384.125);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AgaAiQgNgMAAgTIAAgDQABgMAFgLQAFgLAJgFQAJgHALAAQATAAAJAMQALAMgBAVIAAAHIg5AAQAAALAHAHQAGAGAJABQAPgBAIgKIALAKQgFAIgKAEQgIAEgMABQgSAAgLgNgAgMgXQgFAGgBAJIAmAAIAAgBQgBgKgFgFQgFgFgIgBQgHAAgGAHg");
	this.shape_50.setTransform(338.6,386);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AgSAqQgIgEgFgGQgFgIAAgIIAUAAQAAAIAFADQAFAFAHAAQAIAAAEgDQAEgEAAgEQAAgGgEgCQgEgDgKgDQgKgCgHgDQgPgGAAgOQAAgMAKgIQAKgHAOgBQAQABAKAHQAKAJAAAMIgVAAQAAgGgEgEQgEgDgHAAQgGAAgEACQgEAEAAAFQAAAEAEADQADADALADQAMACAHADQAHADADAFQADAFAAAIQAAALgKAIQgKAIgQAAQgKgBgJgEg");
	this.shape_51.setTransform(329.525,386);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AgSAqQgIgEgFgGQgFgIAAgIIAUAAQAAAIAFADQAFAFAHAAQAIAAAEgDQAEgEAAgEQAAgGgEgCQgEgDgKgDQgKgCgHgDQgPgGAAgOQAAgMAKgIQAKgHAOgBQAQABAKAHQAKAJAAAMIgVAAQAAgGgEgEQgEgDgHAAQgGAAgEACQgEAEAAAFQAAAEAEADQADADALADQAMACAHADQAHADADAFQADAFAAAIQAAALgKAIQgKAIgQAAQgKgBgJgEg");
	this.shape_52.setTransform(315.025,386);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AAQBAIgZgnIgJAJIAAAeIgUAAIAAh/IAUAAIAABJIAGgIIAXgbIAZAAIgiAkIAlA1g");
	this.shape_53.setTransform(306.85,384.125);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AgaAiQgMgMAAgTIAAgDQAAgMAEgLQAGgLAJgFQAKgHAKAAQASAAAKAMQAKAMAAAVIAAAHIg5AAQABALAGAHQAHAGAIABQAOgBAJgKIALAKQgGAIgIAEQgKAEgLABQgSAAgLgNgAgLgXQgGAGgBAJIAlAAIAAgBQAAgKgFgFQgEgFgJgBQgIAAgEAHg");
	this.shape_54.setTransform(297.4,386);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_55.setTransform(290.575,384.125);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AgmA/IAAh7IASAAIABAJQAJgLAOAAQARAAAJAMQAJAMAAAXIAAABQAAAUgJAMQgKAMgQAAQgNAAgJgKIAAArgAgSgjIAAAmQAFALANAAQAIAAAGgIQAFgHAAgPQAAgOgFgIQgGgHgJAAQgMgBgFALg");
	this.shape_56.setTransform(283.825,387.65);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AArAuIAAg6QAAgIgEgEQgDgEgIAAQgIAAgEAEQgEADgCAGIAAA9IgTAAIAAg6QAAgQgQAAQgNAAgEAKIAABAIgUAAIAAhZIATAAIAAAJQAKgLAQAAQARAAAGAOQAKgOASAAQAPAAAHAIQAIAJAAAQIAAA6g");
	this.shape_57.setTransform(271.45,385.925);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AgdAiQgMgMAAgWIAAAAQAAgNAGgKQAFgLAJgFQAKgHALAAQASAAAMAMQALAMABATIAAAEQAAANgFAKQgFALgKAGQgJAGgNAAQgSAAgLgNgAgPgVQgGAHAAAPQAAAOAGAIQAGAIAJAAQAKgBAGgHQAGgJAAgOQAAgOgGgHQgGgJgKAAQgJAAgGAJg");
	this.shape_58.setTransform(259.175,386);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AAQBAIgZgnIgJAJIAAAeIgVAAIAAh/IAVAAIAABJIAGgIIAXgbIAZAAIgiAkIAlA1g");
	this.shape_59.setTransform(250.5,384.125);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AAQBAIgagnIgJAJIAAAeIgUAAIAAh/IAUAAIAABJIAHgIIAYgbIAYAAIghAkIAkA1g");
	this.shape_60.setTransform(694.45,359.725);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AgdAnQgJgIABgLQAAgPAKgGQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEADQgEAEgBAFIgTAAQAAgIAEgFQAFgHAJgEQAIgDAJgBQAQAAAKAIQAJAJAAANIAAAoQAAANADAGIAAACIgUAAIgCgJQgKAKgNAAQgNABgJgIgAgLAGQgHAEABAIQAAAGADADQAEAEAHAAQAFAAAFgEQAGgDACgEIAAgRIgLAAQgKAAgFADg");
	this.shape_61.setTransform(684.85,361.6);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AgcA0QgKgMAAgXQAAgTAJgNQAKgNAQAAQAOAAAIAKIAAguIAUAAIAAB/IgSAAIgBgKQgJALgOAAQgQAAgJgMgAgNgDQgFAHAAAPQAAAOAFAIQAGAHAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_62.setTransform(675.225,359.8);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDADgFAAQgEAAgDgDg");
	this.shape_63.setTransform(668.475,359.9);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgVIATAAIAAAVIAQAAIAAAPIgQAAIAAAyQAAAEACACQACADAGAAIAHgBIAAAQIgOABQgWAAAAgZg");
	this.shape_64.setTransform(663.275,360.6);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDADgFAAQgEAAgDgDg");
	this.shape_65.setTransform(646.525,359.9);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AgcA0QgKgMAAgXQAAgTAJgNQAKgNAQAAQAOAAAIAKIAAguIAUAAIAAB/IgSAAIgBgKQgJALgOAAQgQAAgJgMgAgNgDQgFAHAAAPQAAAOAFAIQAGAHAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_66.setTransform(639.325,359.8);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AgdAnQgIgIAAgLQAAgPAKgGQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFADQgFAEAAAFIgUAAQAAgIAGgFQAEgHAIgEQAJgDAJgBQAQAAAKAIQAJAJAAANIAAAoQAAANADAGIAAACIgUAAIgCgJQgKAKgNAAQgNABgJgIgAgLAGQgHAEAAAIQAAAGAFADQAEAEAGAAQAFAAAFgEQAGgDACgEIAAgRIgLAAQgKAAgFADg");
	this.shape_67.setTransform(630.15,361.6);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AgSBPIAAgQIAHAAQAKAAAAgLIAAhhIATAAIAABhQAAANgHAIQgHAHgMAAQgFAAgFgBgAAAg9QgDgDAAgEQAAgFADgDQACgDAGAAQAFAAADADQADADAAAFQAAAEgDADQgDADgFAAQgGAAgCgDg");
	this.shape_68.setTransform(622.625,361.725);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_69.setTransform(616.575,361.525);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AgbAiQgMgMABgTIAAgDQgBgMAGgLQAFgLAJgFQAJgHALAAQASAAALAMQAJAMABAVIAAAHIg7AAQABAMAHAGQAGAHAKAAQANAAAJgMIALALQgFAIgKAFQgJADgKAAQgTAAgMgMgAgMgXQgEAGgCAJIAmAAIAAgBQgBgKgFgFQgEgFgJAAQgIgBgFAHg");
	this.shape_70.setTransform(607.4,361.6);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("AArAuIAAg6QAAgIgDgEQgEgEgIAAQgIAAgEAEQgFADgBAGIAAA9IgTAAIAAg6QAAgQgQAAQgMAAgFAKIAABAIgVAAIAAhZIAUAAIAAAJQAKgLAQAAQARAAAGAOQAKgOASAAQAPAAAHAIQAIAJAAAQIAAA6g");
	this.shape_71.setTransform(595.35,361.525);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_72.setTransform(559.325,361.525);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#000000").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_73.setTransform(549.875,361.675);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#000000").s().p("AgbAiQgLgMAAgVIAAgCQAAgUALgMQALgNASAAQAQAAAKAKQAKAJABAQIgTAAQgBgJgEgFQgFgEgIAAQgJAAgFAHQgFAHgBAOIAAACQAAAPAGAIQAFAGAJABQAIAAAFgFQAEgEABgHIATAAQAAAJgFAHQgFAHgJAFQgIADgKAAQgSAAgLgMg");
	this.shape_74.setTransform(540.775,361.6);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#000000").s().p("AgdAnQgJgIAAgLQAAgPALgGQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFADQgEAEAAAFIgUAAQAAgIAEgFQAFgHAJgEQAIgDAKgBQAPAAAKAIQAJAJAAANIAAAoQAAANAEAGIAAACIgVAAIgDgJQgJAKgNAAQgNABgJgIgAgMAGQgFAEAAAIQAAAGADADQAEAEAHAAQAFAAAFgEQAFgDADgEIAAgRIgLAAQgKAAgGADg");
	this.shape_75.setTransform(531.65,361.6);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#000000").s().p("AgXAuIAAhZIATAAIABAKQAGgMAOAAIAGABIAAATIgIAAQgNAAgFAKIAAA9g");
	this.shape_76.setTransform(524.45,361.525);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#000000").s().p("AgbAiQgLgMgBgTIAAgDQAAgMAGgLQAFgLAJgFQAJgHALAAQASAAALAMQAKAMAAAVIAAAHIg7AAQABAMAHAGQAGAHAJAAQAOAAAJgMIALALQgFAIgKAFQgJADgKAAQgTAAgMgMgAgMgXQgEAGgCAJIAmAAIAAgBQgBgKgFgFQgFgFgIAAQgIgBgFAHg");
	this.shape_77.setTransform(516.6,361.6);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#000000").s().p("AgTA1IgBAKIgSAAIAAh/IAUAAIAAAvQAIgLAOAAQARABAJALQAJANAAAVIAAABQAAAVgJAMQgJAMgRAAQgOAAgJgLgAgSAAIAAAkQAFAMANAAQAJAAAFgHQAFgHAAgOIAAgDQAAgPgFgFQgFgIgJAAQgNAAgFALg");
	this.shape_78.setTransform(507.375,359.8);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_79.setTransform(485.725,361.525);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#000000").s().p("AgdAnQgJgIABgLQgBgPALgGQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEADQgEAEAAAFIgUAAQAAgIAEgFQAFgHAJgEQAIgDAKgBQAPAAAKAIQAJAJAAANIAAAoQAAANADAGIAAACIgUAAIgCgJQgKAKgNAAQgNABgJgIgAgMAGQgFAEAAAIQAAAGADADQAFAEAGAAQAFAAAFgEQAGgDACgEIAAgRIgLAAQgKAAgGADg");
	this.shape_80.setTransform(476.4,361.6);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#000000").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgVIATAAIAAAVIAQAAIAAAPIgQAAIAAAyQAAAEACACQACADAGAAIAHgBIAAAQIgOABQgWAAAAgZg");
	this.shape_81.setTransform(468.775,360.6);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#000000").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_82.setTransform(461.425,361.675);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#000000").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_83.setTransform(454.525,359.725);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#000000").s().p("AgdAiQgMgMAAgWIAAAAQAAgNAGgKQAFgLAJgFQAKgHALAAQASAAAMAMQALAMABAUIAAADQAAANgFAKQgFALgKAGQgJAGgNgBQgSAAgLgMgAgPgVQgGAHAAAPQAAAOAGAIQAGAIAJAAQAKgBAGgHQAGgJAAgOQAAgOgGgHQgGgJgKABQgJgBgGAJg");
	this.shape_84.setTransform(447.475,361.6);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#000000").s().p("AgmA/IAAh7IASAAIABAJQAJgLAOAAQARAAAJAMQAJAMAAAXIAAABQAAATgJANQgKAMgQAAQgNAAgJgJIAAAqgAgSgjIAAAnQAFAKANAAQAIAAAGgIQAFgGAAgQQAAgOgFgIQgGgHgJgBQgMAAgFALg");
	this.shape_85.setTransform(438.075,363.25);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#000000").s().p("AgXAuIAAhZIAUAAIAAAKQAHgMANAAIAHABIAAATIgJAAQgOAAgDAKIAAA9g");
	this.shape_86.setTransform(418.55,361.525);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#000000").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_87.setTransform(410.425,361.675);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#000000").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgVIATAAIAAAVIAQAAIAAAPIgQAAIAAAyQAAAEACACQACADAGAAIAHgBIAAAQIgOABQgWAAAAgZg");
	this.shape_88.setTransform(402.675,360.6);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#000000").s().p("AAQBAIgZgnIgJAJIAAAeIgVAAIAAh/IAVAAIAABJIAGgIIAYgbIAYAAIgiAkIAlA1g");
	this.shape_89.setTransform(396.2,359.725);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#000000").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_90.setTransform(386.475,361.675);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#000000").s().p("AgWAuIAAhZIATAAIAAAKQAHgMAMAAIAIABIAAATIgJAAQgOAAgDAKIAAA9g");
	this.shape_91.setTransform(379.15,361.525);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#000000").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgVIATAAIAAAVIAQAAIAAAPIgQAAIAAAyQAAAEACACQACADAGAAIAHgBIAAAQIgOABQgWAAAAgZg");
	this.shape_92.setTransform(372.725,360.6);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#000000").s().p("AgSArQgIgFgFgGQgFgIAAgIIAUAAQAAAIAFADQAFAFAHAAQAIAAAEgEQAEgDAAgEQAAgGgEgCQgEgEgKgCQgKgCgHgDQgPgHAAgNQAAgMAKgIQAKgIAOAAQAQAAAKAIQAKAJAAAMIgVAAQAAgFgEgFQgEgDgHAAQgGAAgEACQgEAEAAAFQAAAEAEADQADADALACQAMADAHADQAHADADAFQADAGAAAGQAAANgKAHQgKAIgQgBQgKAAgJgDg");
	this.shape_93.setTransform(365.675,361.6);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#000000").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDADgFAAQgEAAgDgDg");
	this.shape_94.setTransform(347.225,359.9);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#000000").s().p("AgSArQgIgFgFgGQgFgIAAgIIAUAAQAAAIAFADQAFAFAHAAQAIAAAEgEQAEgDAAgEQAAgGgEgCQgEgEgKgCQgKgCgHgDQgPgHAAgNQAAgMAKgIQAKgIAOAAQAQAAAKAIQAKAJAAAMIgVAAQAAgFgEgFQgEgDgHAAQgGAAgEACQgEAEAAAFQAAAEAEADQADADALACQAMADAHADQAHADADAFQADAGAAAGQAAANgKAHQgKAIgQgBQgKAAgJgDg");
	this.shape_95.setTransform(340.625,361.6);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#000000").s().p("AgdAnQgIgIAAgLQAAgPAKgGQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFADQgEAEgBAFIgUAAQAAgIAGgFQAEgHAJgEQAIgDAJgBQAQAAAKAIQAJAJAAANIAAAoQAAANADAGIAAACIgUAAIgCgJQgKAKgNAAQgNABgJgIgAgLAGQgHAEABAIQgBAGAEADQAFAEAGAAQAFAAAFgEQAGgDACgEIAAgRIgLAAQgKAAgFADg");
	this.shape_96.setTransform(331.7,361.6);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#000000").s().p("AAQBAIgagnIgJAJIAAAeIgTAAIAAh/IATAAIAABJIAHgIIAXgbIAZAAIgiAkIAmA1g");
	this.shape_97.setTransform(323.25,359.725);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#000000").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDADgFAAQgEAAgDgDg");
	this.shape_98.setTransform(316.075,359.9);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#000000").s().p("AgNBBIAAhLIgPAAIAAgOIAPAAIAAgIQgBgPAJgJQAHgHAPgBIAMACIgBAPIgIAAQgPAAAAAPIAAAIIATAAIAAAOIgTAAIAABLg");
	this.shape_99.setTransform(311.05,359.65);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#000000").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDADgFAAQgEAAgDgDg");
	this.shape_100.setTransform(305.675,359.9);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#000000").s().p("AgcA0QgKgMAAgXQAAgTAJgNQAKgNAQAAQAOAAAIAKIAAguIAUAAIAAB/IgSAAIgBgKQgJALgOAAQgQAAgJgMgAgNgDQgFAHAAAPQAAAOAFAIQAGAHAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_101.setTransform(298.475,359.8);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#000000").s().p("AgdAiQgMgMAAgWIAAAAQAAgNAGgKQAFgLAJgFQAKgHALAAQASAAAMAMQALAMABAUIAAADQAAANgFAKQgFALgKAGQgJAGgNgBQgSAAgLgMgAgPgVQgGAHAAAPQAAAOAGAIQAGAIAJAAQAKgBAGgHQAGgJAAgOQAAgOgGgHQgGgJgKABQgJgBgGAJg");
	this.shape_102.setTransform(289.025,361.6);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#000000").s().p("AAsAuIAAg6QAAgIgFgEQgDgEgJAAQgGAAgFAEQgEADgCAGIAAA9IgTAAIAAg6QgBgQgQAAQgLAAgGAKIAABAIgUAAIAAhZIATAAIABAJQAJgLARAAQARAAAHAOQAJgOASAAQAPAAAHAIQAHAJAAAQIAAA6g");
	this.shape_103.setTransform(276.8,361.525);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#000000").s().p("AgbAiQgMgMABgTIAAgDQgBgMAGgLQAFgLAJgFQAJgHALAAQASAAALAMQAJAMABAVIAAAHIg7AAQABAMAHAGQAGAHAKAAQANAAAJgMIALALQgFAIgKAFQgJADgKAAQgTAAgMgMgAgMgXQgEAGgCAJIAmAAIAAgBQgBgKgFgFQgEgFgJAAQgIgBgFAHg");
	this.shape_104.setTransform(264.95,361.6);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#000000").s().p("AArAuIAAg6QAAgIgDgEQgEgEgIAAQgIAAgEAEQgFADgBAGIAAA9IgTAAIAAg6QAAgQgQAAQgMAAgFAKIAABAIgVAAIAAhZIAUAAIAAAJQAKgLAQAAQARAAAGAOQAKgOASAAQAPAAAHAIQAIAJAAAQIAAA6g");
	this.shape_105.setTransform(252.9,361.525);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#000000").s().p("AgaAiQgMgLAAgVIAAgCQAAgMAEgLQAGgLAJgFQAKgHAKAAQASAAAKAMQAKAMAAAVIAAAIIg5AAQABALAGAGQAHAHAIAAQAOAAAJgMIALAKQgGAJgIAFQgKADgLAAQgSAAgLgMgAgLgYQgGAGgBAKIAlAAIAAgBQAAgKgFgFQgFgGgIABQgIAAgEAFg");
	this.shape_106.setTransform(693.85,337.2);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#000000").s().p("AAsAuIAAg6QAAgIgFgEQgDgEgJAAQgGAAgFAEQgEADgCAGIAAA9IgTAAIAAg6QgBgQgQAAQgLAAgGAKIAABAIgTAAIAAhZIASAAIABAJQAJgLARAAQARAAAHAOQAJgOASAAQAPAAAHAIQAHAJAAAQIAAA6g");
	this.shape_107.setTransform(681.8,337.125);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#000000").s().p("AgSArQgIgEgFgHQgFgHAAgIIAUAAQAAAHAFADQAFAFAHAAQAIAAAEgEQAEgCAAgGQAAgFgEgCQgEgEgKgCQgKgCgHgDQgPgHAAgNQAAgMAKgHQAKgJAOAAQAQAAAKAJQAKAHAAANIgVAAQAAgGgEgEQgEgDgHAAQgGAAgEADQgEADAAAFQAAAFAEACQADACALADQAMADAHADQAHADADAFQADAGAAAGQAAAMgKAIQgKAIgQgBQgKAAgJgDg");
	this.shape_108.setTransform(669.975,337.2);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#000000").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDAEgFAAQgEAAgDgEg");
	this.shape_109.setTransform(663.475,335.5);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_110.setTransform(656.575,337.125);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#000000").s().p("AgdAnQgIgIAAgLQAAgOAKgHQALgIASAAIANAAIAAgGQAAgHgEgEQgEgEgHAAQgGAAgFADQgFAEAAAFIgUAAQAAgIAGgFQAEgHAIgEQAJgDAJgBQAQAAAJAJQAKAHAAAOIAAAoQAAAMADAHIAAACIgUAAIgCgJQgKAKgNAAQgNABgJgIgAgLAHQgHADAAAIQAAAFAFAEQAEAEAGAAQAFgBAFgDQAGgDACgEIAAgRIgLAAQgKAAgFAEg");
	this.shape_111.setTransform(647.25,337.2);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#000000").s().p("AgUA8QgJgFgFgHIAKgMQAJALANAAQAKABAFgGQAGgFABgLIAAgGQgJAJgOAAQgQAAgKgMQgKgMAAgWQAAgUAKgNQAKgMAQgBQAOAAAKALIABgJIASAAIAABXQgBARgKAKQgMAKgRAAQgKAAgKgDgAgNgmQgGAIAAAPQAAANAGAIQAFAHAJAAQAMAAAHgKIAAgmQgHgLgLAAQgJAAgGAIg");
	this.shape_112.setTransform(637.65,338.9);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#000000").s().p("AgXAuIAAhZIATAAIABAKQAHgMANAAIAHABIAAATIgJAAQgOAAgDAKIAAA9g");
	this.shape_113.setTransform(630.4,337.125);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#000000").s().p("AgdAiQgMgMAAgWIAAAAQAAgNAGgLQAFgKAJgFQAKgHALAAQASAAAMAMQALAMABAUIAAADQAAANgFALQgFAKgKAGQgJAGgNgBQgSAAgLgMgAgPgVQgGAHAAAPQAAAOAGAIQAGAIAJAAQAKgBAGgHQAGgJAAgOQAAgOgGgHQgGgJgKABQgJgBgGAJg");
	this.shape_114.setTransform(622.125,337.2);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#000000").s().p("AgdAiQgMgMAAgWIAAAAQAAgNAGgLQAFgKAJgFQAKgHALAAQASAAAMAMQALAMABAUIAAADQAAANgFALQgFAKgKAGQgJAGgNgBQgSAAgLgMgAgPgVQgGAHAAAPQAAAOAGAIQAGAIAJAAQAKgBAGgHQAGgJAAgOQAAgOgGgHQgGgJgKABQgJgBgGAJg");
	this.shape_115.setTransform(612.425,337.2);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#000000").s().p("AgXAuIAAhZIATAAIABAKQAGgMAOAAIAGABIAAATIgIAAQgNAAgFAKIAAA9g");
	this.shape_116.setTransform(605,337.125);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#000000").s().p("AAQBAIgZgnIgKAJIAAAeIgTAAIAAh/IATAAIAABJIAHgIIAXgbIAZAAIgiAkIAmA1g");
	this.shape_117.setTransform(597.75,335.325);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#000000").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDAEgFAAQgEAAgDgEg");
	this.shape_118.setTransform(590.575,335.5);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#000000").s().p("AAsAuIAAg6QAAgIgFgEQgDgEgJAAQgGAAgFAEQgEADgCAGIAAA9IgTAAIAAg6QgBgQgQAAQgLAAgGAKIAABAIgUAAIAAhZIATAAIABAJQAJgLARAAQARAAAHAOQAJgOASAAQAPAAAHAIQAHAJAAAQIAAA6g");
	this.shape_119.setTransform(581,337.125);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#000000").s().p("AARBAIAAg6QAAgIgEgEQgEgEgIAAQgLAAgGAKIAABAIgUAAIAAh/IAUAAIAAAwQAKgMAOAAQAdAAAAAgIAAA7g");
	this.shape_120.setTransform(548.725,335.325);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#000000").s().p("AgbAiQgLgLgBgVIAAgCQAAgMAGgLQAFgLAJgFQAJgHALAAQASAAALAMQAKAMAAAVIAAAIIg7AAQABALAHAGQAGAHAKAAQANAAAJgMIALAKQgFAJgKAFQgJADgKAAQgTAAgMgMgAgMgYQgEAGgCAKIAmAAIAAgBQgBgKgFgFQgFgGgIABQgIAAgFAFg");
	this.shape_121.setTransform(539.55,337.2);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#000000").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_122.setTransform(532.725,335.325);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#000000").s().p("AgdAiQgMgMAAgWIAAAAQAAgNAGgLQAFgKAJgFQAKgHALAAQASAAAMAMQALAMABAUIAAADQAAANgFALQgFAKgKAGQgJAGgNgBQgSAAgLgMgAgPgVQgGAHAAAPQAAAOAGAIQAGAIAJAAQAKgBAGgHQAGgJAAgOQAAgOgGgHQgGgJgKABQgJgBgGAJg");
	this.shape_123.setTransform(525.675,337.2);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#000000").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDAEgFAAQgEAAgDgEg");
	this.shape_124.setTransform(498.525,335.5);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#000000").s().p("AgSArQgIgEgFgHQgFgHAAgIIAUAAQAAAHAFADQAFAFAHAAQAIAAAEgEQAEgCAAgGQAAgFgEgCQgEgEgKgCQgKgCgHgDQgPgHAAgNQAAgMAKgHQAKgJAOAAQAQAAAKAJQAKAHAAANIgVAAQAAgGgEgEQgEgDgHAAQgGAAgEADQgEADAAAFQAAAFAEACQADACALADQAMADAHADQAHADADAFQADAGAAAGQAAAMgKAIQgKAIgQgBQgKAAgJgDg");
	this.shape_125.setTransform(491.925,337.2);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#000000").s().p("AAQBAIgagnIgJAJIAAAeIgUAAIAAh/IAUAAIAABJIAHgIIAYgbIAYAAIghAkIAlA1g");
	this.shape_126.setTransform(483.75,335.325);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#000000").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_127.setTransform(474.025,337.275);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#000000").s().p("AgcA0QgKgMAAgXQAAgTAJgNQAKgMAQgBQAOAAAIAKIAAguIAUAAIAAB/IgSAAIgBgKQgJALgOAAQgQAAgJgMgAgNgDQgFAHAAAPQAAAOAFAIQAGAHAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_128.setTransform(464.275,335.4);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#000000").s().p("AgdAiQgMgMAAgWIAAAAQAAgNAGgLQAFgKAJgFQAKgHALAAQASAAAMAMQALAMABAUIAAADQAAANgFALQgFAKgKAGQgJAGgNgBQgSAAgLgMgAgPgVQgGAHAAAPQAAAOAGAIQAGAIAJAAQAKgBAGgHQAGgJAAgOQAAgOgGgHQgGgJgKABQgJgBgGAJg");
	this.shape_129.setTransform(454.825,337.2);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#000000").s().p("AgXAuIAAhZIATAAIABAKQAGgMANAAIAHABIAAATIgIAAQgNAAgFAKIAAA9g");
	this.shape_130.setTransform(447.4,337.125);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#000000").s().p("AgmA/IAAh7IASAAIABAJQAJgLAOAAQARAAAJANQAJAMAAAWIAAABQAAATgJANQgKAMgQAAQgNAAgJgJIAAAqgAgSgjIAAAnQAFAKANAAQAIAAAGgIQAFgGAAgQQAAgNgFgJQgGgHgJgBQgMAAgFALg");
	this.shape_131.setTransform(439.425,338.85);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#000000").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDAEgFAAQgEAAgDgEg");
	this.shape_132.setTransform(432.275,335.5);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#000000").s().p("AgcA0QgKgMAAgXQAAgTAJgNQAKgMAQgBQAOAAAIAKIAAguIAUAAIAAB/IgSAAIgBgKQgJALgOAAQgQAAgJgMgAgNgDQgFAHAAAPQAAAOAFAIQAGAHAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_133.setTransform(425.075,335.4);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#000000").s().p("AgUA8QgJgFgFgHIAKgMQAJALAOAAQAIABAHgGQAFgFAAgLIAAgGQgIAJgOAAQgPAAgLgMQgKgMABgWQAAgUAJgNQAKgMAQgBQAOAAAKALIABgJIASAAIAABXQAAARgMAKQgKAKgSAAQgKAAgKgDgAgNgmQgFAIgBAPQABANAFAIQAGAHAIAAQANAAAFgKIAAgmQgGgLgMAAQgIAAgGAIg");
	this.shape_134.setTransform(395.35,338.9);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_135.setTransform(385.975,337.125);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#000000").s().p("AgdAnQgJgIAAgLQAAgOALgHQALgIATAAIAMAAIAAgGQAAgHgEgEQgEgEgHAAQgHAAgEADQgFAEABAFIgVAAQABgIAFgFQAEgHAIgEQAJgDAKgBQAPAAAJAJQAKAHAAAOIAAAoQAAAMAEAHIAAACIgVAAIgDgJQgJAKgNAAQgOABgIgIgAgMAHQgFADgBAIQABAFAEAEQADAEAHAAQAFgBAFgDQAFgDADgEIAAgRIgLAAQgKAAgGAEg");
	this.shape_136.setTransform(376.65,337.2);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#000000").s().p("AggA+IAAgQIAEAAQAHAAAEgDQAEgCACgHIADgIIgfhYIAVAAIATA9IASg9IAVAAIgjBmQgIAXgTAAIgKgBg");
	this.shape_137.setTransform(367.875,339.025);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#000000").s().p("AAsAuIAAg6QAAgIgFgEQgDgEgJAAQgGAAgFAEQgEADgCAGIAAA9IgTAAIAAg6QgBgQgQAAQgLAAgGAKIAABAIgTAAIAAhZIASAAIABAJQAJgLARAAQARAAAHAOQAJgOASAAQAPAAAHAIQAHAJAAAQIAAA6g");
	this.shape_138.setTransform(336.2,337.125);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#000000").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDAEgFAAQgEAAgDgEg");
	this.shape_139.setTransform(326.625,335.5);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#000000").s().p("AgjAtIAAgNIAsg7IgsAAIAAgRIBGAAIAAANIgtA8IAuAAIAAAQg");
	this.shape_140.setTransform(320.225,337.2);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_141.setTransform(311.175,337.125);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#000000").s().p("AgbAiQgLgLAAgVIAAgCQAAgMAEgLQAGgLAJgFQAKgHAKAAQATAAAJAMQAKAMAAAVIAAAIIg5AAQABALAGAGQAHAHAJAAQAOAAAIgMIALAKQgGAJgIAFQgKADgLAAQgSAAgMgMgAgLgYQgFAGgCAKIAlAAIAAgBQAAgKgFgFQgFgGgIABQgIAAgEAFg");
	this.shape_142.setTransform(302,337.2);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#000000").s().p("AgVAIIAAgPIArAAIAAAPg");
	this.shape_143.setTransform(294.525,336.575);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#000000").s().p("AAsAuIAAg6QAAgIgFgEQgDgEgIAAQgHAAgFAEQgEADgCAGIAAA9IgTAAIAAg6QgBgQgQAAQgMAAgFAKIAABAIgTAAIAAhZIASAAIABAJQAJgLARAAQARAAAHAOQAJgOASAAQAPAAAHAIQAHAJAAAQIAAA6g");
	this.shape_144.setTransform(284.35,337.125);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#000000").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDAEgFAAQgEAAgDgEg");
	this.shape_145.setTransform(274.775,335.5);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#000000").s().p("AgjAtIAAgNIAsg7IgsAAIAAgRIBGAAIAAANIgtA8IAuAAIAAAQg");
	this.shape_146.setTransform(268.375,337.2);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_147.setTransform(259.325,337.125);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#000000").s().p("AgaAiQgMgLAAgVIAAgCQAAgMAEgLQAGgLAJgFQAKgHAKAAQASAAAKAMQAKAMAAAVIAAAIIg5AAQABALAGAGQAHAHAIAAQAOAAAJgMIALAKQgGAJgIAFQgKADgLAAQgSAAgLgMgAgLgYQgGAGgBAKIAlAAIAAgBQAAgKgFgFQgEgGgJABQgIAAgEAFg");
	this.shape_148.setTransform(250.15,337.2);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#000000").s().p("AgMARIAGgNIACgLIAAgPIARAAIAAAOQAAAIgEAJQgFAJgGAFg");
	this.shape_149.setTransform(696.175,317.675);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#000000").s().p("AgUA8QgJgFgFgHIAKgMQAJAMANgBQAKABAFgGQAHgFAAgLIAAgGQgKAJgNAAQgPAAgLgMQgJgMgBgWQAAgVAKgMQAKgMAQAAQAOAAAJAKIABgJIASAAIAABXQABARgLAKQgMAKgRABQgKAAgKgEgAgNgmQgGAIABAPQgBAOAGAHQAGAHAIAAQAMAAAHgKIAAgmQgHgLgLAAQgKAAgFAIg");
	this.shape_150.setTransform(689.6,314.5);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_151.setTransform(680.225,312.725);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#000000").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_152.setTransform(670.775,312.875);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#000000").s().p("AgSArQgIgFgFgGQgFgIAAgHIAUAAQAAAHAFADQAFAEAHABQAIgBAEgDQAEgCAAgGQAAgFgEgDQgEgDgKgBQgKgDgHgDQgPgHAAgNQAAgMAKgHQAKgJAOABQAQgBAKAJQAKAHAAANIgVAAQAAgGgEgEQgEgDgHAAQgGAAgEADQgEADAAAFQAAAFAEACQADACALADQAMADAHAEQAHACADAFQADAGAAAGQAAAMgKAIQgKAHgQAAQgKAAgJgDg");
	this.shape_153.setTransform(661.625,312.8);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#000000").s().p("AgTA8QgKgFgFgHIAKgMQAJAMANgBQAJABAHgGQAFgFAAgLIAAgGQgIAJgOAAQgPAAgLgMQgKgMABgWQAAgVAJgMQAKgMAQAAQAOAAAKAKIABgJIASAAIAABXQAAARgMAKQgKAKgSABQgKAAgJgEgAgNgmQgFAIgBAPQABAOAFAHQAGAHAIAAQANAAAFgKIAAgmQgGgLgMAAQgIAAgGAIg");
	this.shape_154.setTransform(652.3,314.5);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_155.setTransform(642.925,312.725);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#000000").s().p("AgdAnQgJgIAAgLQAAgOALgHQALgIATAAIAMAAIAAgGQAAgHgEgEQgEgEgHAAQgHAAgEADQgFAEABAFIgVAAQABgHAFgHQAEgGAIgEQAJgDAKAAQAPgBAJAJQAKAHAAAOIAAAoQAAAMAEAIIAAABIgVAAIgDgJQgJALgNgBQgOAAgIgHgAgMAHQgGADAAAIQABAFAEAEQADADAHAAQAFAAAFgDQAFgDADgEIAAgRIgLAAQgKAAgGAEg");
	this.shape_156.setTransform(633.6,312.8);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#000000").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_157.setTransform(626.825,310.925);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#000000").s().p("AgWAuIAAhZIATAAIAAAKQAHgMANAAIAHABIAAATIgJAAQgOAAgDAKIAAA9g");
	this.shape_158.setTransform(622.05,312.725);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#000000").s().p("AgaAjQgMgMAAgVIAAgCQAAgMAEgLQAGgLAJgFQAKgHAKABQASAAAKALQAKAMAAAWIAAAHIg5AAQABALAGAGQAHAHAIgBQAOAAAJgLIALAKQgGAJgIAFQgKADgLAAQgSABgLgMgAgLgYQgGAGgBAKIAlAAIAAgBQAAgKgFgFQgFgGgIABQgIAAgEAFg");
	this.shape_159.setTransform(614.2,312.8);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#000000").s().p("AgTA2IgBAJIgSAAIAAh+IAUAAIAAAuQAIgKAOAAQARgBAJAMQAJANAAAVIAAABQAAAVgJANQgJAMgRgBQgOABgJgLgAgSAAIAAAkQAFAMANAAQAJAAAFgHQAFgHAAgOIAAgCQAAgQgFgFQgFgIgJAAQgNAAgFALg");
	this.shape_160.setTransform(604.975,311);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#000000").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDAEgFAAQgEAAgDgEg");
	this.shape_161.setTransform(587.125,311.1);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#000000").s().p("AgSArQgIgFgFgGQgFgIAAgHIAUAAQAAAHAFADQAFAEAHABQAIgBAEgDQAEgCAAgGQAAgFgEgDQgEgDgKgBQgKgDgHgDQgPgHAAgNQAAgMAKgHQAKgJAOABQAQgBAKAJQAKAHAAANIgVAAQAAgGgEgEQgEgDgHAAQgGAAgEADQgEADAAAFQAAAFAEACQADACALADQAMADAHAEQAHACADAFQADAGAAAGQAAAMgKAIQgKAHgQAAQgKAAgJgDg");
	this.shape_162.setTransform(580.525,312.8);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#000000").s().p("AgdAnQgJgIAAgLQAAgOALgHQALgIATAAIAMAAIAAgGQAAgHgEgEQgEgEgHAAQgHAAgEADQgFAEABAFIgUAAQAAgHAEgHQAFgGAJgEQAIgDAKAAQAPgBAJAJQAKAHAAAOIAAAoQAAAMAEAIIAAABIgVAAIgDgJQgJALgNgBQgOAAgIgHgAgMAHQgFADAAAIQAAAFADAEQAEADAHAAQAFAAAFgDQAFgDADgEIAAgRIgLAAQgKAAgGAEg");
	this.shape_163.setTransform(571.6,312.8);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#000000").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDAEgFAAQgEAAgDgEg");
	this.shape_164.setTransform(564.825,311.1);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#000000").s().p("AgcA0QgKgMAAgWQAAgVAJgMQAKgMAQAAQAOgBAIAKIAAgtIAUAAIAAB+IgSAAIgBgJQgJALgOgBQgQAAgJgMgAgNgDQgFAHAAAPQAAAOAFAIQAGAHAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_165.setTransform(557.625,311);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#000000").s().p("AgbAjQgLgMAAgVIAAgCQAAgMAEgLQAGgLAJgFQAKgHAKABQATAAAJALQAKAMAAAWIAAAHIg5AAQABALAGAGQAHAHAJgBQAOAAAIgLIALAKQgGAJgIAFQgKADgLAAQgSABgMgMgAgLgYQgFAGgCAKIAlAAIAAgBQAAgKgFgFQgFgGgIABQgIAAgEAFg");
	this.shape_166.setTransform(548.6,312.8);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#000000").s().p("AArAuIAAg6QAAgIgDgEQgEgEgJAAQgGAAgFAEQgEADgCAGIAAA9IgTAAIAAg6QgBgQgQAAQgLAAgGAKIAABAIgUAAIAAhZIATAAIABAJQAJgLARAAQARAAAHAOQAJgOASAAQAPAAAHAIQAHAJAAAQIAAA6g");
	this.shape_167.setTransform(536.55,312.725);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#000000").s().p("AgbAjQgLgMgBgVIAAgCQAAgMAGgLQAFgLAJgFQAJgHALABQASAAALALQAJAMABAWIAAAHIg7AAQABALAHAGQAGAHAJgBQAOAAAJgLIALAKQgFAJgKAFQgJADgKAAQgTABgMgMgAgMgYQgEAGgCAKIAmAAIAAgBQgBgKgFgFQgFgGgIABQgIAAgFAFg");
	this.shape_168.setTransform(524.7,312.8);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#000000").s().p("AgXAuIAAhZIATAAIABAKQAHgMANAAIAHABIAAATIgJAAQgOAAgDAKIAAA9g");
	this.shape_169.setTransform(517.45,312.725);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#000000").s().p("AgdAiQgMgMAAgWIAAAAQAAgNAGgLQAFgKAJgFQAKgHALABQASAAAMALQALAMABAUIAAADQAAAOgFAKQgFAKgKAGQgJAGgNgBQgSAAgLgMgAgPgVQgGAIAAAOQAAAOAGAIQAGAIAJgBQAKAAAGgHQAGgJAAgOQAAgOgGgHQgGgIgKAAQgJAAgGAIg");
	this.shape_170.setTransform(509.175,312.8);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#000000").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDAEgFAAQgEAAgDgEg");
	this.shape_171.setTransform(502.175,311.1);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#000000").s().p("AgTA2IgBAJIgSAAIAAh+IAUAAIAAAuQAIgKAOAAQARgBAJAMQAJANAAAVIAAABQAAAVgJANQgJAMgRgBQgOABgJgLgAgSAAIAAAkQAFAMANAAQAJAAAFgHQAFgHAAgOIAAgCQAAgQgFgFQgFgIgJAAQgNAAgFALg");
	this.shape_172.setTransform(495.425,311);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#000000").s().p("AgSArQgIgFgFgGQgFgIAAgHIAUAAQAAAHAFADQAFAEAHABQAIgBAEgDQAEgCAAgGQAAgFgEgDQgEgDgKgBQgKgDgHgDQgPgHAAgNQAAgMAKgHQAKgJAOABQAQgBAKAJQAKAHAAANIgVAAQAAgGgEgEQgEgDgHAAQgGAAgEADQgEADAAAFQAAAFAEACQADACALADQAMADAHAEQAHACADAFQADAGAAAGQAAAMgKAIQgKAHgQAAQgKAAgJgDg");
	this.shape_173.setTransform(464.625,312.8);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#000000").s().p("AgbAjQgLgMgBgVIAAgCQAAgMAGgLQAFgLAJgFQAJgHALABQASAAALALQAKAMAAAWIAAAHIg7AAQABALAHAGQAGAHAJgBQAOAAAJgLIALAKQgFAJgKAFQgJADgKAAQgTABgMgMgAgMgYQgEAGgCAKIAmAAIAAgBQgBgKgFgFQgFgGgIABQgIAAgFAFg");
	this.shape_174.setTransform(455.85,312.8);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#000000").s().p("AgSArQgIgFgFgGQgFgIAAgHIAUAAQAAAHAFADQAFAEAHABQAIgBAEgDQAEgCAAgGQAAgFgEgDQgEgDgKgBQgKgDgHgDQgPgHAAgNQAAgMAKgHQAKgJAOABQAQgBAKAJQAKAHAAANIgVAAQAAgGgEgEQgEgDgHAAQgGAAgEADQgEADAAAFQAAAFAEACQADACALADQAMADAHAEQAHACADAFQADAGAAAGQAAAMgKAIQgKAHgQAAQgKAAgJgDg");
	this.shape_175.setTransform(446.775,312.8);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#000000").s().p("AgdAiQgMgMAAgWIAAAAQAAgNAGgLQAFgKAJgFQAKgHALABQASAAAMALQALAMABAUIAAADQAAAOgFAKQgFAKgKAGQgJAGgNgBQgSAAgLgMgAgPgVQgGAIAAAOQAAAOAGAIQAGAIAJgBQAKAAAGgHQAGgJAAgOQAAgOgGgHQgGgIgKAAQgJAAgGAIg");
	this.shape_176.setTransform(437.575,312.8);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#000000").s().p("AgXAuIAAhZIATAAIABAKQAHgMANAAIAHABIAAATIgJAAQgOAAgDAKIAAA9g");
	this.shape_177.setTransform(430.15,312.725);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#000000").s().p("AgmA/IAAh7IASAAIABAJQAJgLAOAAQARAAAJANQAJAMAAAWIAAABQAAATgJANQgKAMgQAAQgNAAgJgJIAAAqgAgSgjIAAAnQAFAKANAAQAIAAAGgIQAFgGAAgQQAAgNgFgJQgGgHgJgBQgMAAgFALg");
	this.shape_178.setTransform(422.175,314.45);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#000000").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgVIATAAIAAAVIAQAAIAAAPIgQAAIAAAxQAAAGACABQACADAGAAIAHgBIAAAQIgOABQgWABAAgag");
	this.shape_179.setTransform(403.475,311.8);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#000000").s().p("AgdAnQgIgIgBgLQAAgOALgHQALgIATAAIAMAAIAAgGQAAgHgEgEQgEgEgHAAQgGAAgFADQgFAEAAAFIgUAAQAAgHAGgHQAEgGAIgEQAJgDAJAAQAQgBAJAJQAKAHAAAOIAAAoQAAAMAEAIIAAABIgVAAIgDgJQgJALgNgBQgNAAgJgHgAgLAHQgHADAAAIQAAAFAFAEQAEADAGAAQAFAAAFgDQAFgDADgEIAAgRIgLAAQgKAAgFAEg");
	this.shape_180.setTransform(396.25,312.8);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#000000").s().p("AgdAnQgIgIAAgLQAAgOAKgHQALgIASAAIANAAIAAgGQAAgHgEgEQgEgEgHAAQgGAAgFADQgEAEgBAFIgUAAQAAgHAGgHQAEgGAIgEQAJgDAJAAQAQgBAKAJQAJAHAAAOIAAAoQAAAMADAIIAAABIgUAAIgCgJQgKALgNgBQgNAAgJgHgAgLAHQgHADAAAIQAAAFAEAEQAFADAGAAQAFAAAFgDQAGgDACgEIAAgRIgLAAQgKAAgFAEg");
	this.shape_181.setTransform(387.05,312.8);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#000000").s().p("AgSArQgIgFgFgGQgFgIAAgHIAUAAQAAAHAFADQAFAEAHABQAIgBAEgDQAEgCAAgGQAAgFgEgDQgEgDgKgBQgKgDgHgDQgPgHAAgNQAAgMAKgHQAKgJAOABQAQgBAKAJQAKAHAAANIgVAAQAAgGgEgEQgEgDgHAAQgGAAgEADQgEADAAAFQAAAFAEACQADACALADQAMADAHAEQAHACADAFQADAGAAAGQAAAMgKAIQgKAHgQAAQgKAAgJgDg");
	this.shape_182.setTransform(378.025,312.8);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#000000").s().p("AgdAnQgJgIAAgLQAAgOALgHQALgIASAAIANAAIAAgGQAAgHgEgEQgEgEgHAAQgGAAgFADQgEAEAAAFIgUAAQAAgHAEgHQAFgGAJgEQAIgDAKAAQAPgBAKAJQAJAHAAAOIAAAoQAAAMAEAIIAAABIgVAAIgDgJQgJALgNgBQgNAAgJgHgAgMAHQgFADAAAIQAAAFADAEQAEADAHAAQAFAAAFgDQAFgDADgEIAAgRIgLAAQgKAAgGAEg");
	this.shape_183.setTransform(358.4,312.8);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#000000").s().p("AgcA0QgKgMAAgWQAAgVAJgMQAKgMAQAAQAOgBAIAKIAAgtIAUAAIAAB+IgSAAIgBgJQgJALgOgBQgQAAgJgMgAgNgDQgFAHAAAPQAAAOAFAIQAGAHAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_184.setTransform(348.775,311);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#000000").s().p("AgdAnQgJgIABgLQgBgOALgHQALgIASAAIANAAIAAgGQAAgHgEgEQgEgEgHAAQgGAAgFADQgEAEgBAFIgTAAQAAgHAEgHQAFgGAJgEQAIgDAKAAQAPgBAKAJQAJAHAAAOIAAAoQAAAMADAIIAAABIgUAAIgCgJQgKALgNgBQgNAAgJgHgAgMAHQgFADAAAIQAAAFADAEQAEADAHAAQAFAAAFgDQAFgDADgEIAAgRIgLAAQgKAAgGAEg");
	this.shape_185.setTransform(339.6,312.8);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#000000").s().p("AgsA9IAAh5IAtAAQAVAAALALQAMALAAARQAAASgMAJQgLAKgVAAIgYAAIAAAtgAgXAAIAYAAQALgBAGgFQAGgFAAgKQAAgKgGgFQgGgHgKAAIgZAAg");
	this.shape_186.setTransform(329.95,311.25);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#000000").s().p("AgHAIQgEgDAAgFQAAgEAEgDQADgDAEAAQAGAAADADQADADAAAEQAAAFgDADQgDADgGAAQgEAAgDgDg");
	this.shape_187.setTransform(311.025,316.3);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#000000").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgVIATAAIAAAVIAQAAIAAAPIgQAAIAAAxQAAAGACABQACADAGAAIAHgBIAAAQIgOABQgWABAAgag");
	this.shape_188.setTransform(305.725,311.8);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#000000").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_189.setTransform(298.375,312.875);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#000000").s().p("AgTA2IgBAJIgSAAIAAh+IAUAAIAAAuQAIgKAOAAQARgBAJAMQAJANAAAVIAAABQAAAVgJANQgJAMgRgBQgOABgJgLgAgSAAIAAAkQAFAMANAAQAJAAAFgHQAFgHAAgOIAAgCQAAgQgFgFQgFgIgJAAQgNAAgFALg");
	this.shape_190.setTransform(289.075,311);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#000000").s().p("AgaAjQgNgMAAgVIAAgCQABgMAFgLQAFgLAJgFQAJgHALABQATAAAKALQAKAMgBAWIAAAHIg5AAQAAALAHAGQAGAHAJgBQAPAAAIgLIALAKQgFAJgKAFQgIADgMAAQgSABgLgMgAgMgYQgFAGgBAKIAmAAIAAgBQgBgKgFgFQgFgGgIABQgHAAgGAFg");
	this.shape_191.setTransform(279.65,312.8);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#000000").s().p("AgSArQgIgFgFgGQgFgIAAgHIAUAAQAAAHAFADQAFAEAHABQAIgBAEgDQAEgCAAgGQAAgFgEgDQgEgDgKgBQgKgDgHgDQgPgHAAgNQAAgMAKgHQAKgJAOABQAQgBAKAJQAKAHAAANIgVAAQAAgGgEgEQgEgDgHAAQgGAAgEADQgEADAAAFQAAAFAEACQADACALADQAMADAHAEQAHACADAFQADAGAAAGQAAAMgKAIQgKAHgQAAQgKAAgJgDg");
	this.shape_192.setTransform(270.575,312.8);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#000000").s().p("AgXAuIAAhZIATAAIABAKQAHgMANAAIAHABIAAATIgJAAQgOAAgDAKIAAA9g");
	this.shape_193.setTransform(263.65,312.725);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#000000").s().p("AgaAjQgNgMAAgVIAAgCQABgMAFgLQAFgLAJgFQAJgHALABQATAAAJALQALAMgBAWIAAAHIg5AAQAAALAHAGQAGAHAJgBQAPAAAIgLIALAKQgFAJgKAFQgIADgMAAQgSABgLgMgAgMgYQgFAGgBAKIAmAAIAAgBQgBgKgFgFQgFgGgIABQgHAAgGAFg");
	this.shape_194.setTransform(255.8,312.8);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#000000").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgVIATAAIAAAVIAQAAIAAAPIgQAAIAAAxQAAAGACABQACADAGAAIAHgBIAAAQIgOABQgWABAAgag");
	this.shape_195.setTransform(248.125,311.8);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_196.setTransform(693.575,288.325);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#000000").s().p("AgdAnQgIgIgBgLQAAgOALgHQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgFADAAAFIgUAAQAAgHAGgHQAEgGAIgEQAJgEAJABQAQgBAJAJQAKAHAAAOIAAAoQAAAMAEAIIAAABIgVAAIgDgJQgJALgNgBQgNAAgJgHgAgLAHQgHAEAAAHQAAAGAFADQAEAEAGgBQAFAAAFgDQAFgCADgFIAAgRIgLAAQgKAAgFAEg");
	this.shape_197.setTransform(684.25,288.4);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#000000").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgVIATAAIAAAVIAQAAIAAAPIgQAAIAAAxQAAAGACABQACADAGAAIAHgBIAAAQIgOABQgWABAAgag");
	this.shape_198.setTransform(676.625,287.4);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#000000").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_199.setTransform(669.275,288.475);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#000000").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_200.setTransform(662.375,286.525);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#000000").s().p("AgdAiQgMgMAAgWIAAAAQAAgNAGgLQAFgKAJgGQAKgFALAAQASAAAMALQALAMABAUIAAADQAAAOgFAKQgFAKgKAGQgJAFgNAAQgSAAgLgMgAgPgWQgGAIAAAPQAAAOAGAIQAGAIAJgBQAKAAAGgIQAGgHAAgPQAAgNgGgJQgGgHgKAAQgJAAgGAHg");
	this.shape_201.setTransform(655.325,288.4);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#000000").s().p("AgmA/IAAh8IASAAIABAKQAJgLAOAAQARAAAJANQAJAMAAAVIAAACQAAATgJANQgKAMgQAAQgNAAgJgJIAAAqgAgSgjIAAAnQAFAKANAAQAIAAAGgIQAFgHAAgPQAAgNgFgJQgGgIgJAAQgMAAgFALg");
	this.shape_202.setTransform(645.925,290.05);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#000000").s().p("AgWAuIAAhZIASAAIABAKQAGgMANAAIAHABIAAATIgIAAQgOAAgEAKIAAA9g");
	this.shape_203.setTransform(631.35,288.325);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#000000").s().p("AgdAnQgJgIAAgLQAAgOALgHQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEAEQgFADABAFIgUAAQAAgHAEgHQAFgGAJgEQAIgEAKABQAPgBAJAJQAKAHAAAOIAAAoQAAAMAEAIIAAABIgVAAIgDgJQgJALgNgBQgOAAgIgHgAgMAHQgFAEAAAHQAAAGADADQAEAEAHgBQAFAAAFgDQAFgCADgFIAAgRIgLAAQgKAAgGAEg");
	this.shape_204.setTransform(623.35,288.4);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#000000").s().p("AgcA0QgKgMAAgWQAAgVAJgMQAKgMAQAAQAOgBAIALIAAguIAUAAIAAB+IgSAAIgBgJQgJALgOgBQgQAAgJgMgAgNgDQgFAGAAAQQAAAOAFAHQAGAIAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_205.setTransform(613.725,286.6);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#000000").s().p("AgdAnQgJgIAAgLQAAgOALgHQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgEADAAAFIgUAAQAAgHAEgHQAFgGAJgEQAIgEAKABQAPgBAKAJQAJAHAAAOIAAAoQAAAMADAIIAAABIgUAAIgDgJQgJALgNgBQgOAAgIgHgAgMAHQgFAEAAAHQAAAGADADQAEAEAHgBQAFAAAFgDQAFgCADgFIAAgRIgLAAQgKAAgGAEg");
	this.shape_206.setTransform(604.55,288.4);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#000000").s().p("AAQBAIgZgnIgJAJIAAAeIgVAAIAAh/IAVAAIAABJIAGgIIAXgbIAZAAIgiAkIAlA1g");
	this.shape_207.setTransform(596.1,286.525);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_208.setTransform(572.375,288.325);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#000000").s().p("AgdAnQgJgIAAgLQAAgOALgHQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEAEQgFADABAFIgUAAQAAgHAEgHQAFgGAJgEQAIgEAKABQAPgBAJAJQAKAHAAAOIAAAoQAAAMAEAIIAAABIgVAAIgDgJQgJALgNgBQgOAAgIgHgAgMAHQgFAEAAAHQAAAGADADQAEAEAHgBQAFAAAFgDQAFgCADgFIAAgRIgLAAQgKAAgGAEg");
	this.shape_209.setTransform(563.05,288.4);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#000000").s().p("AAQBAIgZgnIgJAJIAAAeIgVAAIAAh/IAVAAIAABJIAGgIIAYgbIAYAAIgiAkIAlA1g");
	this.shape_210.setTransform(554.6,286.525);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_211.setTransform(544.875,288.325);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#000000").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_212.setTransform(535.425,288.475);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#000000").s().p("AgWAuIAAhZIATAAIAAAKQAHgMAMAAIAIABIAAATIgJAAQgOAAgDAKIAAA9g");
	this.shape_213.setTransform(528.1,288.325);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#000000").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_214.setTransform(519.975,288.475);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_215.setTransform(510.525,288.325);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#000000").s().p("AgaAjQgMgMAAgVIAAgCQAAgMAEgLQAGgKAJgHQAKgFAKAAQATAAAJALQAKAMAAAWIAAAHIg5AAQABAKAGAHQAHAHAJgBQAOAAAIgLIALAKQgGAJgIAFQgKADgLAAQgSABgLgMgAgLgYQgFAHgCAJIAlAAIAAgBQAAgKgFgFQgFgGgIABQgIAAgEAFg");
	this.shape_216.setTransform(501.35,288.4);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#000000").s().p("AArAuIAAg6QAAgIgDgEQgEgEgJAAQgGAAgFAEQgEADgCAGIAAA9IgTAAIAAg6QAAgQgRAAQgLAAgGAKIAABAIgUAAIAAhZIATAAIABAJQAJgLARAAQARAAAHAOQAJgOASAAQAPAAAHAIQAHAJAAAQIAAA6g");
	this.shape_217.setTransform(489.3,288.325);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#000000").s().p("AAQBAIgagnIgJAJIAAAeIgTAAIAAh/IATAAIAABJIAHgIIAYgbIAYAAIghAkIAlA1g");
	this.shape_218.setTransform(471.05,286.525);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#000000").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_219.setTransform(461.325,288.475);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#000000").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgVIATAAIAAAVIAQAAIAAAPIgQAAIAAAxQAAAGACABQACADAGAAIAHgBIAAAQIgOABQgWABAAgag");
	this.shape_220.setTransform(453.575,287.4);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_221.setTransform(446.225,288.325);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#000000").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_222.setTransform(436.775,288.475);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#000000").s().p("AgdAnQgIgIAAgLQAAgOAKgHQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgFADAAAFIgUAAQAAgHAGgHQAEgGAIgEQAJgEAJABQAQgBAJAJQAKAHAAAOIAAAoQAAAMADAIIAAABIgUAAIgCgJQgKALgNgBQgNAAgJgHgAgLAHQgHAEAAAHQAAAGAFADQAEAEAGgBQAFAAAFgDQAGgCACgFIAAgRIgLAAQgKAAgFAEg");
	this.shape_223.setTransform(420.45,288.4);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#000000").s().p("AggA+IAAgQIAEAAQAHAAAEgDQAEgCACgHIADgIIgfhYIAVAAIATA9IASg9IAVAAIgjBmQgIAXgTAAIgKgBg");
	this.shape_224.setTransform(411.675,290.225);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#000000").s().p("AgdAnQgJgIAAgLQAAgOALgHQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgEADAAAFIgUAAQAAgHAEgHQAFgGAJgEQAIgEAKABQAPgBAKAJQAJAHAAAOIAAAoQAAAMADAIIAAABIgUAAIgDgJQgJALgNgBQgNAAgJgHgAgMAHQgFAEAAAHQAAAGADADQAEAEAHgBQAFAAAFgDQAFgCADgFIAAgRIgLAAQgKAAgGAEg");
	this.shape_225.setTransform(402.95,288.4);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#000000").s().p("AgmA/IAAh8IASAAIABAKQAJgLAOAAQARAAAJANQAJAMAAAVIAAACQAAATgJANQgKAMgQAAQgNAAgJgJIAAAqgAgSgjIAAAnQAFAKANAAQAIAAAGgIQAFgHAAgPQAAgNgFgJQgGgIgJAAQgMAAgFALg");
	this.shape_226.setTransform(393.775,290.05);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#000000").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_227.setTransform(384.075,288.475);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#000000").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDADgFABQgEgBgDgDg");
	this.shape_228.setTransform(370.175,286.7);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#000000").s().p("AgdAnQgIgIgBgLQAAgOALgHQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgFADAAAFIgUAAQAAgHAGgHQAEgGAIgEQAJgEAJABQAQgBAJAJQAKAHAAAOIAAAoQAAAMAEAIIAAABIgVAAIgDgJQgJALgNgBQgNAAgJgHgAgLAHQgHAEAAAHQAAAGAFADQAEAEAGgBQAFAAAFgDQAFgCADgFIAAgRIgLAAQgKAAgFAEg");
	this.shape_229.setTransform(363.4,288.4);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#000000").s().p("AgUA7QgJgEgFgHIAKgLQAJALANgBQAKAAAFgFQAHgFAAgLIAAgGQgKAJgNAAQgPAAgLgMQgJgMgBgVQAAgWAKgMQAKgMAQAAQAOAAAKAKIAAgJIASAAIAABXQABARgLAKQgMALgRAAQgKAAgKgFgAgNgmQgGAIAAAPQAAAOAGAGQAGAIAIAAQAMAAAHgKIAAgmQgHgLgLAAQgKAAgFAIg");
	this.shape_230.setTransform(353.8,290.1);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#000000").s().p("AgdAnQgJgIABgLQgBgOALgHQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEAEQgEADgBAFIgTAAQAAgHAEgHQAFgGAJgEQAIgEAKABQAPgBAKAJQAJAHAAAOIAAAoQAAAMADAIIAAABIgUAAIgCgJQgKALgNgBQgNAAgJgHgAgMAHQgFAEAAAHQAAAGADADQAFAEAGgBQAFAAAFgDQAGgCACgFIAAgRIgLAAQgKAAgGAEg");
	this.shape_231.setTransform(344.55,288.4);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#000000").s().p("AgTA2IgBAJIgSAAIAAh+IAUAAIAAAuQAIgKAOAAQARgBAJAMQAJANAAAVIAAABQAAAVgJANQgJAMgRgBQgOABgJgLgAgSAAIAAAkQAFAMANAAQAJAAAFgHQAFgHAAgOIAAgCQAAgPgFgHQgFgHgJAAQgNAAgFALg");
	this.shape_232.setTransform(335.375,286.6);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#000000").s().p("AgbAjQgMgMABgVIAAgCQAAgMAEgLQAGgKAJgHQAJgFALAAQATAAAJALQALAMAAAWIAAAHIg6AAQABAKAGAHQAHAHAJgBQAOAAAIgLIALAKQgGAJgIAFQgKADgKAAQgTABgMgMgAgLgYQgGAHgBAJIAlAAIAAgBQAAgKgFgFQgFgGgIABQgIAAgEAFg");
	this.shape_233.setTransform(325.95,288.4);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#000000").s().p("AgSArQgIgFgFgHQgFgHAAgHIAUAAQAAAHAFADQAFAEAHAAQAIAAAEgDQAEgCAAgGQAAgFgEgDQgEgDgKgBQgKgDgHgDQgPgHAAgNQAAgMAKgHQAKgJAOABQAQgBAKAJQAKAIAAAMIgVAAQAAgGgEgDQgEgEgHgBQgGABgEADQgEADAAAFQAAAFAEACQADACALADQAMADAHAEQAHACADAFQADAGAAAGQAAAMgKAIQgKAHgQAAQgKAAgJgDg");
	this.shape_234.setTransform(316.875,288.4);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#000000").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_235.setTransform(300.825,288.475);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#000000").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgVIATAAIAAAVIAQAAIAAAPIgQAAIAAAxQAAAGACABQACADAGAAIAHgBIAAAQIgOABQgWABAAgag");
	this.shape_236.setTransform(293.075,287.4);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_237.setTransform(285.725,288.325);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#000000").s().p("AgbAjQgMgMABgVIAAgCQAAgMAEgLQAGgKAJgHQAJgFALAAQASAAALALQAJAMABAWIAAAHIg7AAQACAKAGAHQAHAHAJgBQANAAAJgLIALAKQgFAJgJAFQgKADgKAAQgTABgMgMgAgLgYQgFAHgCAJIAlAAIAAgBQAAgKgFgFQgEgGgJABQgIAAgEAFg");
	this.shape_238.setTransform(276.55,288.4);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#000000").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgVIATAAIAAAVIAQAAIAAAPIgQAAIAAAxQAAAGACABQACADAGAAIAHgBIAAAQIgOABQgWABAAgag");
	this.shape_239.setTransform(268.875,287.4);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#000000").s().p("AgXAuIAAhZIATAAIABAKQAHgMANAAIAHABIAAATIgJAAQgOAAgDAKIAAA9g");
	this.shape_240.setTransform(263.65,288.325);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#000000").s().p("AgaAjQgNgMAAgVIAAgCQABgMAFgLQAFgKAJgHQAJgFALAAQATAAAJALQALAMgBAWIAAAHIg5AAQAAAKAHAHQAGAHAJgBQAPAAAIgLIALAKQgFAJgKAFQgIADgMAAQgSABgLgMgAgMgYQgFAHgBAJIAmAAIAAgBQgBgKgFgFQgFgGgIABQgHAAgGAFg");
	this.shape_241.setTransform(255.8,288.4);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#000000").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgVIATAAIAAAVIAQAAIAAAPIgQAAIAAAxQAAAGACABQACADAGAAIAHgBIAAAQIgOABQgWABAAgag");
	this.shape_242.setTransform(248.125,287.4);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_243.setTransform(693.525,263.925);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#000000").s().p("AgdAnQgJgIAAgLQAAgPALgGQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgEADAAAFIgUAAQAAgHAEgHQAFgGAJgEQAIgEAKABQAPAAAKAIQAJAHAAAPIAAAnQAAAMADAIIAAABIgUAAIgDgIQgJAKgNgBQgOAAgIgHgAgMAHQgFAEAAAHQAAAGADADQAEAEAHgBQAFAAAFgCQAFgDADgFIAAgRIgLAAQgKAAgGAEg");
	this.shape_244.setTransform(684.2,264);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#000000").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgWIATAAIAAAWIAQAAIAAAPIgQAAIAAAxQAAAFACADQACACAGAAIAHgBIAAAQIgOABQgWABAAgag");
	this.shape_245.setTransform(676.575,263);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#000000").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_246.setTransform(669.225,264.075);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#000000").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_247.setTransform(662.325,262.125);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#000000").s().p("AgdAiQgMgNAAgUIAAgBQAAgNAGgLQAFgKAJgGQAKgFALAAQASAAAMALQALAMABATIAAAEQAAANgFALQgFAKgKAGQgJAFgNAAQgSAAgLgMgAgPgWQgGAJAAAOQAAAOAGAIQAGAHAJAAQAKABAGgJQAGgHAAgPQAAgNgGgJQgGgHgKgBQgJABgGAHg");
	this.shape_248.setTransform(655.275,264);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#000000").s().p("AgmA/IAAh8IASAAIABAKQAJgLAOAAQARAAAJANQAJALAAAWIAAABQAAAVgJAMQgKAMgQAAQgNAAgJgKIAAArgAgSgjIAAAnQAFAKANAAQAIAAAGgHQAFgIAAgPQAAgOgFgHQgGgJgJABQgMAAgFAKg");
	this.shape_249.setTransform(645.875,265.65);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#000000").s().p("AgdAnQgJgIABgLQAAgPAKgGQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEAEQgEADgBAFIgTAAQAAgHAEgHQAFgGAJgEQAIgEAJABQAQAAAKAIQAJAHAAAPIAAAnQAAAMADAIIAAABIgUAAIgCgIQgKAKgNgBQgNAAgJgHgAgLAHQgHAEABAHQAAAGADADQAFAEAGgBQAFAAAFgCQAGgDACgFIAAgRIgLAAQgKAAgFAEg");
	this.shape_250.setTransform(622.75,264);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#000000").s().p("AgcA0QgKgNAAgVQAAgVAJgMQAKgMAQAAQAOAAAIAKIAAguIAUAAIAAB+IgSAAIgBgJQgJALgOgBQgQAAgJgMgAgNgDQgFAGAAAQQAAAOAFAHQAGAIAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_251.setTransform(613.125,262.2);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#000000").s().p("AgdAnQgIgIAAgLQAAgPAKgGQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgEADgBAFIgUAAQAAgHAGgHQAEgGAIgEQAJgEAJABQAQAAAKAIQAJAHAAAPIAAAnQAAAMADAIIAAABIgUAAIgCgIQgKAKgNgBQgNAAgJgHgAgLAHQgHAEAAAHQAAAGAEADQAFAEAGgBQAFAAAFgCQAGgDACgFIAAgRIgLAAQgKAAgFAEg");
	this.shape_252.setTransform(603.95,264);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#000000").s().p("AgmA/IAAh8IASAAIABAKQAJgLAOAAQARAAAJANQAJALAAAWIAAABQAAAVgJAMQgKAMgQAAQgNAAgJgKIAAArgAgSgjIAAAnQAFAKANAAQAIAAAGgHQAFgIAAgPQAAgOgFgHQgGgJgJABQgMAAgFAKg");
	this.shape_253.setTransform(594.775,265.65);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_254.setTransform(571.525,263.925);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#000000").s().p("AgdAnQgIgIAAgLQAAgPAKgGQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgFADAAAFIgUAAQAAgHAGgHQAEgGAIgEQAJgEAJABQAQAAAJAIQAKAHAAAPIAAAnQAAAMADAIIAAABIgUAAIgCgIQgKAKgNgBQgNAAgJgHgAgLAHQgHAEAAAHQAAAGAFADQAEAEAGgBQAFAAAFgCQAGgDACgFIAAgRIgLAAQgKAAgFAEg");
	this.shape_255.setTransform(562.2,264);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#000000").s().p("AAQBAIgagnIgJAJIAAAeIgTAAIAAh/IATAAIAABJIAHgIIAYgbIAYAAIghAkIAlA1g");
	this.shape_256.setTransform(553.75,262.125);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#000000").s().p("AARBAIAAg6QAAgIgEgEQgEgEgIAAQgLAAgGAKIAABAIgUAAIAAh/IAUAAIAAAwQAKgMAOAAQAdAAAAAgIAAA7g");
	this.shape_257.setTransform(544.025,262.125);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#000000").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_258.setTransform(534.575,264.075);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#000000").s().p("AgTA2IgBAJIgSAAIAAh+IAUAAIAAAuQAIgKAOAAQARAAAJALQAJANAAAVIAAABQAAAVgJANQgJAMgRgBQgOABgJgLgAgSAAIAAAlQAFALANAAQAJAAAFgHQAFgHAAgOIAAgCQAAgPgFgHQgFgHgJAAQgNAAgFALg");
	this.shape_259.setTransform(525.275,262.2);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#000000").s().p("AArAuIAAg6QAAgIgDgEQgEgEgJAAQgGAAgFAEQgFADgBAGIAAA9IgTAAIAAg6QAAgQgRAAQgLAAgFAKIAABAIgVAAIAAhZIATAAIABAJQAKgLAQAAQARAAAGAOQAKgOASAAQAPAAAHAIQAIAJgBAQIAAA6g");
	this.shape_260.setTransform(512.9,263.925);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#000000").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_261.setTransform(500.775,264.075);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#000000").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgWIATAAIAAAWIAQAAIAAAPIgQAAIAAAxQAAAFACADQACACAGAAIAHgBIAAAQIgOABQgWABAAgag");
	this.shape_262.setTransform(493.025,263);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#000000").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_263.setTransform(488.225,262.3);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#000000").s().p("AgcA0QgKgNAAgVQAAgVAJgMQAKgMAQAAQAOAAAIAKIAAguIAUAAIAAB+IgSAAIgBgJQgJALgOgBQgQAAgJgMgAgNgDQgFAGAAAQQAAAOAFAHQAGAIAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_264.setTransform(481.025,262.2);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#000000").s().p("AAQBAIgZgnIgJAJIAAAeIgUAAIAAh/IAUAAIAABJIAGgIIAXgbIAZAAIgiAkIAlA1g");
	this.shape_265.setTransform(459.05,262.125);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#000000").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_266.setTransform(449.325,264.075);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#000000").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgWIATAAIAAAWIAQAAIAAAPIgQAAIAAAxQAAAFACADQACACAGAAIAHgBIAAAQIgOABQgWABAAgag");
	this.shape_267.setTransform(441.575,263);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_268.setTransform(434.225,263.925);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#000000").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_269.setTransform(424.775,264.075);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#000000").s().p("AARBAIAAg6QAAgIgEgEQgEgEgIAAQgLAAgGAKIAABAIgUAAIAAh/IAUAAIAAAwQAKgMAOAAQAdAAAAAgIAAA7g");
	this.shape_270.setTransform(401.775,262.125);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#000000").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_271.setTransform(394.875,262.3);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#000000").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_272.setTransform(390.525,262.125);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#000000").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_273.setTransform(386.175,262.3);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#000000").s().p("AgmA/IAAh8IASAAIABAKQAJgLAOAAQARAAAJANQAJALAAAWIAAABQAAAVgJAMQgKAMgQAAQgNAAgJgKIAAArgAgSgjIAAAnQAFAKANAAQAIAAAGgHQAFgIAAgPQAAgOgFgHQgGgJgJABQgMAAgFAKg");
	this.shape_274.setTransform(379.425,265.65);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#000000").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_275.setTransform(372.275,262.3);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#000000").s().p("AgcA0QgKgNAAgVQAAgVAJgMQAKgMAQAAQAOAAAIAKIAAguIAUAAIAAB+IgSAAIgBgJQgJALgOgBQgQAAgJgMgAgNgDQgFAGAAAQQAAAOAFAHQAGAIAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_276.setTransform(365.075,262.2);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#000000").s().p("AARBAIAAg6QAAgIgEgEQgEgEgIAAQgLAAgGAKIAABAIgUAAIAAh/IAUAAIAAAwQAKgMAOAAQAdAAAAAgIAAA7g");
	this.shape_277.setTransform(328.675,262.125);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#000000").s().p("AgdAnQgJgIABgLQgBgPALgGQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgEADgBAFIgTAAQAAgHAEgHQAFgGAJgEQAIgEAKABQAPAAAKAIQAJAHAAAPIAAAnQAAAMADAIIAAABIgUAAIgCgIQgKAKgNgBQgNAAgJgHgAgMAHQgFAEAAAHQAAAGADADQAEAEAHgBQAFAAAFgCQAFgDADgFIAAgRIgLAAQgKAAgGAEg");
	this.shape_278.setTransform(319.35,264);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#000000").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_279.setTransform(312.575,262.125);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#000000").s().p("AgaAjQgMgMAAgVIAAgCQAAgNAEgKQAGgKAJgHQAKgFAKAAQASAAAKALQAKAMAAAWIAAAHIg5AAQABAKAGAHQAHAGAIAAQAOABAJgMIALAKQgGAJgIAFQgKADgLAAQgSABgLgMgAgLgYQgGAHgBAKIAlAAIAAgCQAAgKgFgFQgFgGgIAAQgIABgEAFg");
	this.shape_280.setTransform(305.95,264);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#000000").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgWIATAAIAAAWIAQAAIAAAPIgQAAIAAAxQAAAFACADQACACAGAAIAHgBIAAAQIgOABQgWABAAgag");
	this.shape_281.setTransform(298.275,263);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#000000").s().p("AgUA7QgJgEgFgHIAKgLQAJALANgBQAJAAAHgFQAFgGABgKIAAgGQgKAJgNAAQgPAAgLgMQgKgNAAgUQAAgWAKgMQAKgMAQAAQAPAAAJAKIABgJIASAAIAABXQgBARgKAKQgMALgRAAQgKAAgKgFgAgNgmQgFAIgBAPQABAOAFAGQAGAIAIAAQAMAAAHgKIAAgmQgHgLgLAAQgJAAgGAIg");
	this.shape_282.setTransform(277.1,265.7);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_283.setTransform(267.725,263.925);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#000000").s().p("AgdAnQgJgIAAgLQAAgPALgGQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgFADABAFIgUAAQAAgHAEgHQAFgGAJgEQAIgEAKABQAPAAAJAIQAKAHAAAPIAAAnQAAAMAEAIIAAABIgVAAIgDgIQgJAKgNgBQgOAAgIgHgAgMAHQgFAEAAAHQAAAGADADQAEAEAHgBQAFAAAFgCQAGgDACgFIAAgRIgLAAQgKAAgGAEg");
	this.shape_284.setTransform(258.4,264);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#000000").s().p("AggA+IAAgQIAEAAQAHAAAEgDQAEgCACgHIADgIIgfhYIAVAAIATA9IASg9IAVAAIgjBmQgIAXgTAAIgKgBg");
	this.shape_285.setTransform(249.625,265.825);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#000000").s().p("AgaAjQgMgNAAgUIAAgCQAAgNAEgKQAGgKAJgHQAKgFAKAAQATgBAJAMQAKAMAAAWIAAAGIg5AAQABALAGAHQAHAGAJAAQAOABAIgLIALAKQgGAIgIAEQgKAFgLAAQgSgBgLgLgAgLgYQgFAGgCALIAlAAIAAgCQAAgKgFgFQgFgGgIAAQgIABgEAFg");
	this.shape_286.setTransform(693.95,239.6);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f("#000000").s().p("AAsAuIAAg6QgBgIgDgEQgEgEgJAAQgGAAgFAEQgEADgCAGIAAA9IgTAAIAAg6QgBgQgQAAQgLAAgGAKIAABAIgUAAIAAhZIATAAIABAJQAJgLARAAQARAAAHAOQAJgOASAAQAPAAAHAIQAHAJAAAQIAAA6g");
	this.shape_287.setTransform(681.9,239.525);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#000000").s().p("AgSAqQgIgDgFgIQgFgGAAgIIAUAAQAAAHAFAEQAFADAHAAQAIAAAEgCQAEgEAAgFQAAgFgEgDQgEgCgKgCQgKgDgHgDQgPgGAAgOQAAgMAKgIQAKgHAOAAQAQAAAKAHQAKAIAAANIgVAAQAAgFgEgEQgEgFgHAAQgGAAgEAEQgEADAAAFQAAAFAEACQADADALADQAMACAHAEQAHACADAFQADAFAAAIQAAAMgKAHQgKAHgQABQgKAAgJgFg");
	this.shape_288.setTransform(670.075,239.6);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f("#000000").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_289.setTransform(663.575,237.9);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_290.setTransform(656.675,239.525);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f("#000000").s().p("AgdAnQgIgIgBgLQAAgOALgHQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgFADAAAFIgUAAQAAgHAGgHQAEgGAIgEQAJgDAJAAQAQAAAJAHQAKAJAAAOIAAAnQAAAMAEAIIAAABIgVAAIgDgIQgJAKgNAAQgNgBgJgHgAgLAGQgHAFAAAHQAAAGAFADQAEADAGAAQAFAAAFgCQAFgDADgFIAAgRIgLAAQgKAAgFADg");
	this.shape_291.setTransform(647.35,239.6);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#000000").s().p("AgUA7QgJgEgFgHIAKgLQAJAKANABQAKgBAFgFQAHgGAAgKIAAgGQgKAKgNAAQgQAAgKgNQgJgNgBgUQAAgWAKgMQAKgMAQAAQAOgBAKALIAAgJIATAAIAABWQAAASgLAKQgMALgRAAQgKAAgKgFgAgNgmQgGAIAAAPQAAAOAGAGQAGAIAIAAQAMAAAHgKIAAgmQgHgLgLAAQgKAAgFAIg");
	this.shape_292.setTransform(637.75,241.3);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f("#000000").s().p("AgXAuIAAhZIAUAAIAAAKQAHgMANAAIAHABIAAATIgJAAQgOAAgDAKIAAA9g");
	this.shape_293.setTransform(630.5,239.525);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#000000").s().p("AgdAiQgMgNAAgUIAAgBQAAgNAGgLQAFgKAJgGQAKgFALAAQASgBAMAMQALAMABATIAAAEQAAAOgFAJQgFALgKAGQgJAFgNABQgSAAgLgNgAgPgWQgGAJAAAOQAAAOAGAIQAGAHAJAAQAKABAGgJQAGgHAAgPQAAgNgGgJQgGgHgKgBQgJABgGAHg");
	this.shape_294.setTransform(622.225,239.6);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f("#000000").s().p("AgdAiQgMgNAAgUIAAgBQAAgNAGgLQAFgKAJgGQAKgFALAAQASgBAMAMQALAMABATIAAAEQAAAOgFAJQgFALgKAGQgJAFgNABQgSAAgLgNgAgPgWQgGAJAAAOQAAAOAGAIQAGAHAJAAQAKABAGgJQAGgHAAgPQAAgNgGgJQgGgHgKgBQgJABgGAHg");
	this.shape_295.setTransform(612.525,239.6);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#000000").s().p("AgXAuIAAhZIATAAIABAKQAGgMAOAAIAGABIAAATIgIAAQgNAAgFAKIAAA9g");
	this.shape_296.setTransform(605.1,239.525);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f("#000000").s().p("AAQBAIgagnIgJAJIAAAeIgTAAIAAh/IATAAIAABJIAHgIIAYgbIAYAAIghAkIAlA1g");
	this.shape_297.setTransform(597.85,237.725);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#000000").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_298.setTransform(590.675,237.9);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f("#000000").s().p("AAsAuIAAg6QgBgIgDgEQgEgEgJAAQgGAAgFAEQgEADgCAGIAAA9IgTAAIAAg6QgBgQgQAAQgLAAgGAKIAABAIgUAAIAAhZIATAAIABAJQAJgLARAAQARAAAHAOQAJgOASAAQAPAAAHAIQAHAJAAAQIAAA6g");
	this.shape_299.setTransform(581.1,239.525);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_300.setTransform(556.875,239.525);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f("#000000").s().p("AgdAnQgJgIAAgLQAAgOALgHQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEAEQgFADABAFIgVAAQAAgHAGgHQAEgGAIgEQAJgDAJAAQAQAAAJAHQAKAJAAAOIAAAnQAAAMAEAIIAAABIgVAAIgDgIQgJAKgNAAQgOgBgIgHgAgMAGQgFAFgBAHQAAAGAFADQAEADAGAAQAFAAAFgCQAFgDADgFIAAgRIgLAAQgKAAgGADg");
	this.shape_301.setTransform(547.55,239.6);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#000000").s().p("AgdAnQgIgIAAgLQAAgOAKgHQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgFADAAAFIgUAAQAAgHAGgHQAEgGAIgEQAJgDAJAAQAQAAAJAHQAKAJAAAOIAAAnQAAAMADAIIAAABIgUAAIgCgIQgKAKgNAAQgNgBgJgHgAgLAGQgHAFAAAHQAAAGAFADQAEADAGAAQAFAAAFgCQAGgDACgFIAAgRIgLAAQgKAAgFADg");
	this.shape_302.setTransform(538.35,239.6);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_303.setTransform(529.025,239.525);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#000000").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_304.setTransform(519.575,239.675);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f("#000000").s().p("AgUA7QgJgEgFgHIAKgLQAJAKANABQAKgBAGgFQAFgGABgKIAAgGQgJAKgOAAQgQAAgKgNQgKgNAAgUQAAgWAKgMQAKgMAQAAQAOgBAKALIABgJIASAAIAABWQgBASgKAKQgMALgRAAQgKAAgKgFgAgNgmQgGAIAAAPQAAAOAGAGQAFAIAJAAQAMAAAHgKIAAgmQgHgLgLAAQgJAAgGAIg");
	this.shape_305.setTransform(509.85,241.3);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f("#000000").s().p("AgUA7QgJgEgFgHIAKgLQAJAKANABQAJgBAHgFQAFgGAAgKIAAgGQgIAKgOAAQgPAAgKgNQgLgNABgUQAAgWAJgMQAKgMAQAAQAOgBAKALIABgJIASAAIAABWQAAASgMAKQgKALgSAAQgKAAgKgFgAgNgmQgFAIgBAPQABAOAFAGQAGAIAIAAQANAAAFgKIAAgmQgGgLgMAAQgIAAgGAIg");
	this.shape_306.setTransform(500.2,241.3);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_307.setTransform(490.825,239.525);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f("#000000").s().p("AgbAjQgMgNABgUIAAgCQAAgNAEgKQAGgKAJgHQAKgFAKAAQATgBAJAMQALAMAAAWIAAAGIg7AAQACALAGAHQAHAGAJAAQAOABAIgLIALAKQgGAIgIAEQgKAFgKAAQgTgBgMgLgAgLgYQgGAGgBALIAlAAIAAgCQAAgKgFgFQgFgGgIAAQgIABgEAFg");
	this.shape_308.setTransform(481.65,239.6);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f("#000000").s().p("AgmA/IAAh8IASAAIABAKQAJgLAOAAQARAAAJAMQAJANAAAVIAAABQAAAVgJAMQgKAMgQAAQgNAAgJgKIAAArgAgSgjIAAAmQAFALANAAQAIAAAGgHQAFgIAAgPQAAgOgFgHQgGgJgJABQgMAAgFAKg");
	this.shape_309.setTransform(472.425,241.25);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f("#000000").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_310.setTransform(438.525,239.525);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f("#000000").s().p("AgdAnQgJgIAAgLQAAgOALgHQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEAEQgFADABAFIgVAAQABgHAFgHQAEgGAIgEQAJgDAJAAQAQAAAJAHQAKAJAAAOIAAAnQAAAMAEAIIAAABIgVAAIgDgIQgJAKgNAAQgOgBgIgHgAgMAGQgFAFgBAHQAAAGAFADQAEADAGAAQAFAAAFgCQAFgDADgFIAAgRIgLAAQgKAAgGADg");
	this.shape_311.setTransform(429.2,239.6);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f("#000000").s().p("AAQBAIgagnIgJAJIAAAeIgUAAIAAh/IAUAAIAABJIAHgIIAYgbIAYAAIghAkIAlA1g");
	this.shape_312.setTransform(420.75,237.725);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f("#000000").s().p("AgdAnQgJgIABgLQgBgOALgHQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEAEQgEADAAAFIgUAAQAAgHAEgHQAFgGAJgEQAIgDAKAAQAPAAAKAHQAJAJAAAOIAAAnQAAAMADAIIAAABIgUAAIgCgIQgKAKgNAAQgNgBgJgHgAgMAGQgFAFAAAHQAAAGADADQAFADAGAAQAFAAAFgCQAGgDACgFIAAgRIgLAAQgKAAgGADg");
	this.shape_313.setTransform(411.15,239.6);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f("#000000").s().p("AgmA/IAAh8IASAAIABAKQAJgLAOAAQARAAAJAMQAJANAAAVIAAABQAAAVgJAMQgKAMgQAAQgNAAgJgKIAAArgAgSgjIAAAmQAFALANAAQAIAAAGgHQAFgIAAgPQAAgOgFgHQgGgJgJABQgMAAgFAKg");
	this.shape_314.setTransform(401.975,241.25);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f("#000000").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_315.setTransform(392.275,239.675);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f("#000000").s().p("AgXAuIAAhZIATAAIABAKQAGgMAOAAIAGABIAAATIgIAAQgNAAgFAKIAAA9g");
	this.shape_316.setTransform(384.95,239.525);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f("#000000").s().p("AgbAjQgLgNgBgUIAAgCQAAgNAGgKQAFgKAJgHQAJgFALAAQASgBALAMQAKAMAAAWIAAAGIg7AAQABALAHAHQAGAGAJAAQAOABAJgLIALAKQgFAIgKAEQgJAFgKAAQgTgBgMgLgAgMgYQgEAGgCALIAmAAIAAgCQgBgKgFgFQgFgGgIAAQgIABgFAFg");
	this.shape_317.setTransform(377.1,239.6);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f("#000000").s().p("AArAuIAAg6QAAgIgDgEQgEgEgIAAQgIAAgEAEQgEADgCAGIAAA9IgTAAIAAg6QAAgQgQAAQgNAAgEAKIAABAIgUAAIAAhZIATAAIAAAJQAKgLAQAAQARAAAGAOQAKgOASAAQAPAAAHAIQAIAJAAAQIAAA6g");
	this.shape_318.setTransform(365.05,239.525);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f("#000000").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_319.setTransform(343.375,237.9);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f("#000000").s().p("AgSAqQgIgDgFgIQgFgGAAgIIAUAAQAAAHAFAEQAFADAHAAQAIAAAEgCQAEgEAAgFQAAgFgEgDQgEgCgKgCQgKgDgHgDQgPgGAAgOQAAgMAKgIQAKgHAOAAQAQAAAKAHQAKAIAAANIgVAAQAAgFgEgEQgEgFgHAAQgGAAgEAEQgEADAAAFQAAAFAEACQADADALADQAMACAHAEQAHACADAFQADAFAAAIQAAAMgKAHQgKAHgQABQgKAAgJgFg");
	this.shape_320.setTransform(336.775,239.6);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f("#000000").s().p("AgdAnQgIgIgBgLQAAgOALgHQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgFADAAAFIgUAAQAAgHAGgHQAEgGAIgEQAJgDAJAAQAQAAAJAHQAKAJAAAOIAAAnQAAAMAEAIIAAABIgVAAIgDgIQgJAKgNAAQgNgBgJgHgAgLAGQgHAFAAAHQAAAGAFADQAEADAGAAQAFAAAFgCQAFgDADgFIAAgRIgLAAQgKAAgFADg");
	this.shape_321.setTransform(327.85,239.6);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f("#000000").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_322.setTransform(321.075,237.9);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f("#000000").s().p("AgcA0QgKgNAAgVQAAgVAJgMQAKgMAQAAQAOAAAIAKIAAguIAUAAIAAB+IgSAAIgBgJQgJAKgOABQgQAAgJgNgAgNgDQgFAGAAAQQAAAOAFAHQAGAIAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_323.setTransform(313.875,237.8);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f("#000000").s().p("AgaAjQgNgNAAgUIAAgCQABgNAFgKQAFgKAJgHQAJgFALAAQATgBAJAMQALAMgBAWIAAAGIg5AAQAAALAHAHQAGAGAJAAQAPABAIgLIALAKQgFAIgKAEQgIAFgMAAQgSgBgLgLgAgMgYQgFAGgBALIAmAAIAAgCQgBgKgFgFQgFgGgIAAQgHABgGAFg");
	this.shape_324.setTransform(304.85,239.6);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f("#000000").s().p("AAsAuIAAg6QAAgIgFgEQgDgEgIAAQgIAAgEAEQgEADgCAGIAAA9IgTAAIAAg6QgBgQgPAAQgNAAgFAKIAABAIgTAAIAAhZIATAAIAAAJQAKgLAQAAQARAAAHAOQAJgOASAAQAPAAAHAIQAHAJABAQIAAA6g");
	this.shape_325.setTransform(292.8,239.525);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f("#000000").s().p("AgbAjQgMgNABgUIAAgCQAAgNAEgKQAGgKAJgHQAJgFALAAQATgBAJAMQALAMAAAWIAAAGIg6AAQABALAGAHQAHAGAJAAQAOABAIgLIALAKQgGAIgIAEQgKAFgKAAQgTgBgMgLgAgLgYQgGAGgBALIAlAAIAAgCQAAgKgFgFQgFgGgIAAQgIABgEAFg");
	this.shape_326.setTransform(280.95,239.6);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f("#000000").s().p("AgWAuIAAhZIASAAIABAKQAGgMANAAIAHABIAAATIgIAAQgNAAgFAKIAAA9g");
	this.shape_327.setTransform(273.7,239.525);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f("#000000").s().p("AgdAiQgMgNAAgUIAAgBQAAgNAGgLQAFgKAJgGQAKgFALAAQASgBAMAMQALAMABATIAAAEQAAAOgFAJQgFALgKAGQgJAFgNABQgSAAgLgNgAgPgWQgGAJAAAOQAAAOAGAIQAGAHAJAAQAKABAGgJQAGgHAAgPQAAgNgGgJQgGgHgKgBQgJABgGAHg");
	this.shape_328.setTransform(265.425,239.6);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f("#000000").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_329.setTransform(258.425,237.9);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f("#000000").s().p("AgqA8IAAh3IApAAQAUAAAKAIQALAIAAAQQAAAJgEAGQgFAHgJADQALACAEAHQAGAIAAAKQAAARgLAJQgLAKgUgBgAgVArIAWAAQAKABAGgFQAFgFAAgJQAAgTgTAAIgYAAgAgVgJIAVAAQAIABAFgFQAGgFAAgHQAAgKgFgEQgFgDgKAAIgUAAg");
	this.shape_330.setTransform(251.05,238.05);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f("#FFFFFF").s().p("EgkQASSQkSAAAAisIAA/LQAAisESAAMBIhAAAQESAAAACsIAAfLQAACskSAAg");
	this.shape_331.setTransform(471.975,323.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_331},{t:this.shape_330},{t:this.shape_329},{t:this.shape_328},{t:this.shape_327},{t:this.shape_326},{t:this.shape_325},{t:this.shape_324},{t:this.shape_323},{t:this.shape_322},{t:this.shape_321},{t:this.shape_320},{t:this.shape_319},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// base
	this.btnAnim1 = new lib.btnAnim();
	this.btnAnim1.name = "btnAnim1";
	this.btnAnim1.setTransform(476.4,466.35,0.6435,0.6435,0,0,0,0.1,0);
	new cjs.ButtonHelper(this.btnAnim1, 0, 1, 2, false, new lib.btnAnim(), 3);

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

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f("#FFFFFF").s().p("AABAPQAIgLAAgMIAAgNIARAAIAAAMQgBAJgEAIQgEAIgHAFgAgZAPQAIgLAAgMIAAgNIARAAIAAAMQgBAJgEAIQgEAIgHAFg");
	this.shape_332.setTransform(527.525,114.5);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f("#FFFFFF").s().p("AAVBDIAAg/QAAgIgFgFQgEgGgKAAQgHAAgGAFQgGAEgDAGIAABDIgQAAIAAiGIAQAAIAAA0QALgNAQAAQAeAAAAAgIAAA/g");
	this.shape_333.setTransform(519.475,119.1);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_334.setTransform(512.35,119.375);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f("#FFFFFF").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_335.setTransform(507.975,119.1);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f("#FFFFFF").s().p("AgdAoQgHgKgBgQIAAg9IAQAAIAAA8QABAWARAAQASgBAGgOIAAhDIARAAIAABdIgQAAIAAgJQgKAMgRAAQgPgBgJgIg");
	this.shape_336.setTransform(500.85,121.2);

	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f("#FFFFFF").s().p("AAzAwIAAg+QAAgJgFgFQgFgGgLAAQgJABgGAFQgGAGgBAIIAAA+IgPAAIAAg9QAAgVgUAAQgQAAgGAOIAABEIgRAAIAAhdIAQAAIAAAKQALgMASAAQATAAAHAPQAEgHAIgEQAIgFAKABQAfgBABAiIAAA+g");
	this.shape_337.setTransform(487.975,121);

	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f("#FFFFFF").s().p("AgbAkQgNgMAAgWIAAgCQABgNAFgMQAGgLAJgGQAKgHAKABQATAAAKAMQAKAMAAAXIAAAGIg/AAQABANAHAJQAIAJALAAQAJAAAGgDQAFgEAFgGIAKAIQgMASgYABQgSAAgMgOgAgOgcQgHAIgCAMIAvAAIAAgBQgBgMgFgHQgHgHgKAAQgIAAgHAHg");
	this.shape_338.setTransform(475.4,121.1);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f("#FFFFFF").s().p("AAzAwIAAg+QAAgJgFgFQgFgGgLAAQgJABgGAFQgGAGgBAIIAAA+IgPAAIAAg9QAAgVgUAAQgQAAgGAOIAABEIgRAAIAAhdIAQAAIAAAKQALgMASAAQATAAAHAPQAEgHAIgEQAIgFAKABQAfgBABAiIAAA+g");
	this.shape_339.setTransform(462.625,121);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f("#FFFFFF").s().p("AgWAwIAAhdIAQAAIAAAKQAHgMAOAAQAFAAADABIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_340.setTransform(447.75,121);

	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f("#FFFFFF").s().p("AgcAoQgJgKABgQIAAg9IAQAAIAAA8QgBAWATAAQARgBAGgOIAAhDIAQAAIAABdIgPAAIgBgJQgJAMgSAAQgPgBgHgIg");
	this.shape_341.setTransform(439.25,121.2);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgIAAgIIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgEgDgEQgEgFAAgHQAAgMAKgJQAKgHAPAAQAQgBAKAJQAKAJAAANIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAFAAAIQAAANgLAIQgKAHgQABQgKAAgJgFg");
	this.shape_342.setTransform(429.625,121.1);

	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f("#FFFFFF").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_343.setTransform(419.775,122.875);

	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgJgFgFQgEgGgKAAQgHAAgGAFQgGAEgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgNARAAQAeAAAAAhIAAA+g");
	this.shape_344.setTransform(409.925,121);

	this.shape_345 = new cjs.Shape();
	this.shape_345.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKgBQgIABgGAEQgGAFAAAGIgQAAQAAgHAFgHQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAPIAAArQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_345.setTransform(400.025,121.1);

	this.shape_346 = new cjs.Shape();
	this.shape_346.graphics.f("#FFFFFF").s().p("AgUAHIAAgNIApAAIAAANg");
	this.shape_346.setTransform(719.325,94.825);

	this.shape_347 = new cjs.Shape();
	this.shape_347.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAPAAIABAMQAHgNAPgBQAEABADABIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_347.setTransform(714.3,95.4);

	this.shape_348 = new cjs.Shape();
	this.shape_348.graphics.f("#FFFFFF").s().p("AgdAnQgHgJAAgRIAAg9IAPAAIAAA9QAAAVASABQASAAAGgOIAAhFIARAAIAABfIgQAAIgBgKQgJALgSAAQgOABgJgKg");
	this.shape_348.setTransform(705.8,95.6);

	this.shape_349 = new cjs.Shape();
	this.shape_349.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgIAAgIIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgDAAgHQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgEgDgEQgEgFAAgIQAAgLAKgJQAKgIAPAAQAQAAAKAJQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAFAAAIQAAANgLAHQgKAJgQgBQgKAAgJgEg");
	this.shape_349.setTransform(696.175,95.5);

	this.shape_350 = new cjs.Shape();
	this.shape_350.graphics.f("#FFFFFF").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_350.setTransform(686.325,97.275);

	this.shape_351 = new cjs.Shape();
	this.shape_351.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgKgFgGQgEgEgKAAQgHAAgGADQgGAFgDAGIAABEIgQAAIAAhfIAPAAIAAANQALgOARgBQAeAAAAAjIAAA+g");
	this.shape_351.setTransform(676.475,95.4);

	this.shape_352 = new cjs.Shape();
	this.shape_352.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgHAFgHQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAAqQAAAOADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_352.setTransform(666.575,95.5);

	this.shape_353 = new cjs.Shape();
	this.shape_353.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAQAAIAAAMQAHgNAOgBQAFABADABIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_353.setTransform(659.15,95.4);

	this.shape_354 = new cjs.Shape();
	this.shape_354.graphics.f("#FFFFFF").s().p("AgbAlQgNgNAAgVIAAgDQABgNAFgLQAGgMAJgGQAKgGAKgBQATAAAKANQAKAMAAAXIAAAFIg/AAQABAOAHAKQAIAIALAAQAJAAAGgEQAFgDAFgGIAKAIQgMASgYAAQgSABgMgNgAgPgcQgGAHgCAOIAvAAIAAgCQgBgNgFgGQgHgHgKAAQgJAAgHAHg");
	this.shape_354.setTransform(650.9,95.5);

	this.shape_355 = new cjs.Shape();
	this.shape_355.graphics.f("#FFFFFF").s().p("AgYA4IgBALIgOAAIAAiGIAQAAIAAAyQAKgNAQAAQARABAKANQAKANAAAWIAAABQAAAWgKANQgKANgRAAQgRABgKgNgAgXgBIAAApQAHAPAQAAQALgBAGgIQAHgKAAgSQAAgRgHgHQgGgJgLAAQgQAAgHAOg");
	this.shape_355.setTransform(641.225,93.6);

	this.shape_356 = new cjs.Shape();
	this.shape_356.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_356.setTransform(629.35,93.775);

	this.shape_357 = new cjs.Shape();
	this.shape_357.graphics.f("#FFFFFF").s().p("AgCA1QgGgGAAgMIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_357.setTransform(623.925,94.45);

	this.shape_358 = new cjs.Shape();
	this.shape_358.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgHAFgHQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAAqQAAAOADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_358.setTransform(616.325,95.5);

	this.shape_359 = new cjs.Shape();
	this.shape_359.graphics.f("#FFFFFF").s().p("AgcBCIgGgBIAAgNIAFAAQAHAAAFgDQAFgDADgJIADgKIghhdIARAAIAXBGIAWhGIASAAIgnBtQgIAYgTAAg");
	this.shape_359.setTransform(607.2,97.425);

	this.shape_360 = new cjs.Shape();
	this.shape_360.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgHAFgHQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAAqQAAAOADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_360.setTransform(598.025,95.5);

	this.shape_361 = new cjs.Shape();
	this.shape_361.graphics.f("#FFFFFF").s().p("AAVBEIAAg/QAAgJgFgGQgEgEgKAAQgHAAgGADQgGAFgDAGIAABEIgQAAIAAiGIAQAAIAAAzQALgOAQAAQAeAAAAAiIAAA/g");
	this.shape_361.setTransform(588.225,93.5);

	this.shape_362 = new cjs.Shape();
	this.shape_362.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgKgFgGQgEgEgKAAQgHAAgGADQgGAFgDAGIAABEIgQAAIAAhfIAPAAIAAANQALgOARgBQAeAAAAAjIAAA+g");
	this.shape_362.setTransform(573.825,95.4);

	this.shape_363 = new cjs.Shape();
	this.shape_363.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgHAFgHQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAAqQAAAOADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_363.setTransform(563.925,95.5);

	this.shape_364 = new cjs.Shape();
	this.shape_364.graphics.f("#FFFFFF").s().p("AAzAxIAAg+QAAgKgFgGQgFgEgLAAQgJgBgGAGQgGAFgBAKIAAA+IgPAAIAAg+QAAgUgUAAQgQAAgGANIAABFIgRAAIAAhfIAQAAIAAALQALgNASAAQATAAAHAQQAEgHAIgEQAIgEAKgBQAfABABAhIAAA/g");
	this.shape_364.setTransform(551.125,95.4);

	this.shape_365 = new cjs.Shape();
	this.shape_365.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgHAFgHQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAAqQAAAOADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_365.setTransform(538.325,95.5);

	this.shape_366 = new cjs.Shape();
	this.shape_366.graphics.f("#FFFFFF").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_366.setTransform(528.225,97.275);

	this.shape_367 = new cjs.Shape();
	this.shape_367.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgHAFgHQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAAqQAAAOADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_367.setTransform(518.425,95.5);

	this.shape_368 = new cjs.Shape();
	this.shape_368.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAPAAIABAMQAHgNAOgBQAFABADABIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_368.setTransform(511,95.4);

	this.shape_369 = new cjs.Shape();
	this.shape_369.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgHAFgHQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAAqQAAAOADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_369.setTransform(502.525,95.5);

	this.shape_370 = new cjs.Shape();
	this.shape_370.graphics.f("#FFFFFF").s().p("AAUBEIgggtIgKALIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_370.setTransform(493.725,93.5);

	this.shape_371 = new cjs.Shape();
	this.shape_371.graphics.f("#FFFFFF").s().p("AgbAlQgNgNAAgVIAAgDQABgNAFgLQAGgMAJgGQAKgGAKgBQATAAAKANQAKAMAAAXIAAAFIg/AAQAAAOAIAKQAIAIALAAQAJAAAGgEQAFgDAFgGIAKAIQgMASgYAAQgSABgMgNgAgOgcQgHAHgCAOIAvAAIAAgCQAAgNgGgGQgHgHgKAAQgIAAgHAHg");
	this.shape_371.setTransform(483.85,95.5);

	this.shape_372 = new cjs.Shape();
	this.shape_372.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgKgFgGQgEgEgKAAQgHAAgGADQgGAFgDAGIAABEIgQAAIAAhfIAPAAIAAANQALgOARgBQAeAAAAAjIAAA+g");
	this.shape_372.setTransform(474.025,95.4);

	this.shape_373 = new cjs.Shape();
	this.shape_373.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgHAFgHQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAAqQAAAOADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_373.setTransform(464.125,95.5);

	this.shape_374 = new cjs.Shape();
	this.shape_374.graphics.f("#FFFFFF").s().p("AgbAlQgNgNABgVIAAgDQgBgNAGgLQAGgMAJgGQAKgGAKgBQATAAAKANQALAMAAAXIAAAFIhAAAQAAAOAIAKQAIAIALAAQAJAAAFgEQAGgDAFgGIAKAIQgMASgYAAQgSABgMgNgAgPgcQgGAHgCAOIAvAAIAAgCQgBgNgGgGQgGgHgKAAQgIAAgIAHg");
	this.shape_374.setTransform(454.55,95.5);

	this.shape_375 = new cjs.Shape();
	this.shape_375.graphics.f("#FFFFFF").s().p("AAUBEIgggtIgKALIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_375.setTransform(445.775,93.5);

	this.shape_376 = new cjs.Shape();
	this.shape_376.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgKgFgGQgEgEgKAAQgHAAgGADQgGAFgDAGIAABEIgQAAIAAhfIAPAAIAAANQALgOARgBQAeAAAAAjIAAA+g");
	this.shape_376.setTransform(431.175,95.4);

	this.shape_377 = new cjs.Shape();
	this.shape_377.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgHAFgHQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAAqQAAAOADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_377.setTransform(421.275,95.5);

	this.shape_378 = new cjs.Shape();
	this.shape_378.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgKgFgGQgEgEgKAAQgHAAgGADQgGAFgDAGIAABEIgQAAIAAhfIAPAAIAAANQALgOARgBQAeAAAAAjIAAA+g");
	this.shape_378.setTransform(411.425,95.4);

	this.shape_379 = new cjs.Shape();
	this.shape_379.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgHAFgHQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAAqQAAAOADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_379.setTransform(401.525,95.5);

	this.shape_380 = new cjs.Shape();
	this.shape_380.graphics.f("#FFFFFF").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_380.setTransform(391.425,97.275);

	this.shape_381 = new cjs.Shape();
	this.shape_381.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgKgFgGQgEgEgKAAQgHAAgGADQgGAFgDAGIAABEIgQAAIAAhfIAPAAIAAANQALgOARgBQAeAAAAAjIAAA+g");
	this.shape_381.setTransform(381.575,95.4);

	this.shape_382 = new cjs.Shape();
	this.shape_382.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgHAFgHQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAAqQAAAOADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_382.setTransform(371.675,95.5);

	this.shape_383 = new cjs.Shape();
	this.shape_383.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgKgFgGQgEgEgKAAQgHAAgGADQgGAFgDAGIAABEIgQAAIAAhfIAPAAIAAANQALgOARgBQAeAAAAAjIAAA+g");
	this.shape_383.setTransform(361.825,95.4);

	this.shape_384 = new cjs.Shape();
	this.shape_384.graphics.f("#FFFFFF").s().p("AgbAlQgMgNAAgVIAAgDQgBgNAGgLQAFgMAKgGQAKgGAKgBQATAAAKANQALAMAAAXIAAAFIhAAAQAAAOAIAKQAIAIALAAQAJAAAFgEQAHgDAEgGIAKAIQgMASgXAAQgTABgMgNgAgOgcQgHAHgBAOIAuAAIAAgCQAAgNgHgGQgFgHgLAAQgJAAgGAHg");
	this.shape_384.setTransform(352.15,95.5);

	this.shape_385 = new cjs.Shape();
	this.shape_385.graphics.f("#FFFFFF").s().p("AgnBDIAAiDIAPAAIABALQAJgNARAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgJANgRAAQgRAAgKgLIAAAugAgXgnIAAAtQAIANAOAAQALAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgOAAgIANg");
	this.shape_385.setTransform(342.45,97.225);

	this.shape_386 = new cjs.Shape();
	this.shape_386.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgHAFgHQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAAqQAAAOADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_386.setTransform(327.825,95.5);

	this.shape_387 = new cjs.Shape();
	this.shape_387.graphics.f("#FFFFFF").s().p("AgcBCIgGgBIAAgNIAEAAQAJAAAEgDQAFgDADgJIAEgKIgjhdIASAAIAXBGIAWhGIARAAIgmBtQgHAYgUAAg");
	this.shape_387.setTransform(318.7,97.425);

	this.shape_388 = new cjs.Shape();
	this.shape_388.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgKgFgGQgEgEgKAAQgHAAgGADQgGAFgDAGIAABEIgQAAIAAhfIAPAAIAAANQALgOARgBQAeAAAAAjIAAA+g");
	this.shape_388.setTransform(309.475,95.4);

	this.shape_389 = new cjs.Shape();
	this.shape_389.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgHAFgHQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAAqQAAAOADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_389.setTransform(299.575,95.5);

	this.shape_390 = new cjs.Shape();
	this.shape_390.graphics.f("#FFFFFF").s().p("AgcA3QgLgOAAgVIAAgCQAAgVAKgNQALgOARAAQAPAAAKAMIAAgxIAQAAIAACGIgPAAIAAgKQgKAMgRgBQgQABgKgOgAgQgGQgHAIAAASQAAAQAHAKQAGAIALABQAQAAAHgOIAAgrQgHgNgQAAQgLAAgGAJg");
	this.shape_390.setTransform(289.4,93.6);

	this.shape_391 = new cjs.Shape();
	this.shape_391.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgHAFgHQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAAqQAAAOADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_391.setTransform(279.625,95.5);

	this.shape_392 = new cjs.Shape();
	this.shape_392.graphics.f("#FFFFFF").s().p("AAVBEIAAg/QAAgJgFgGQgEgEgKAAQgHAAgGADQgGAFgDAGIAABEIgQAAIAAiGIAQAAIAAAzQALgOAQAAQAeAAAAAiIAAA/g");
	this.shape_392.setTransform(265.375,93.5);

	this.shape_393 = new cjs.Shape();
	this.shape_393.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgHAFgHQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAAqQAAAOADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_393.setTransform(255.475,95.5);

	this.shape_394 = new cjs.Shape();
	this.shape_394.graphics.f("#FFFFFF").s().p("AgHBEIAAiGIAPAAIAACGg");
	this.shape_394.setTransform(248.425,93.5);

	this.shape_395 = new cjs.Shape();
	this.shape_395.graphics.f("#FFFFFF").s().p("AgbAlQgMgNAAgVIAAgDQAAgNAFgLQAFgMAKgGQAKgGAKgBQATAAAKANQALAMAAAXIAAAFIhAAAQABAOAHAKQAIAIALAAQAJAAAFgEQAHgDAEgGIAKAIQgMASgXAAQgTABgMgNgAgOgcQgHAHgBAOIAuAAIAAgCQAAgNgHgGQgFgHgLAAQgJAAgGAHg");
	this.shape_395.setTransform(241.55,95.5);

	this.shape_396 = new cjs.Shape();
	this.shape_396.graphics.f("#FFFFFF").s().p("AgCA1QgGgGAAgMIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_396.setTransform(233.475,94.45);

	this.shape_397 = new cjs.Shape();
	this.shape_397.graphics.f("#FFFFFF").s().p("AgbAlQgNgNAAgVIAAgDQABgNAFgLQAGgMAJgGQAKgGAKgBQATAAAKANQAKAMAAAXIAAAFIg/AAQABAOAHAKQAIAIALAAQAJAAAGgEQAFgDAFgGIAKAIQgMASgYAAQgSABgMgNgAgOgcQgHAHgCAOIAvAAIAAgCQgBgNgFgGQgHgHgKAAQgIAAgHAHg");
	this.shape_397.setTransform(226.1,95.5);

	this.shape_398 = new cjs.Shape();
	this.shape_398.graphics.f("#FFFFFF").s().p("AgVA8QgMgFgGgIQgGgJgBgLIARAAQAAALAJAHQAIAHAOAAQANAAAIgGQAGgFABgKQAAgJgHgFQgGgFgRgFQgVgHgKgIQgKgJAAgNQAAgPALgKQANgKASAAQANAAAKAFQALAFAGAJQAFAJABALIgRAAQAAgMgIgGQgHgHgOAAQgLAAgIAFQgGAGAAAKQAAAHAGAGQAHAFAPAFQAQAEAJAFQAJAFAEAHQAFAHAAAKQAAAQgNAJQgLAKgVAAQgMAAgLgGg");
	this.shape_398.setTransform(215.9,93.875);

	this.shape_399 = new cjs.Shape();
	this.shape_399.graphics.f("#FFFFFF").s().p("AACAVIAAgKQAAgJAEgIQAEgIAHgGIAJAGQgIAMAAALIAAAMgAgZAVIAAgKQAAgJAEgIQAEgIAHgGIAKAGQgJAMAAALIAAAMg");
	this.shape_399.setTransform(207.725,88.7);

	this.instance = new lib.bg10();
	this.instance.setTransform(471,324.2,1.1987,1.1979,0,0,0,0,0.1);
	this.instance.alpha = 0.1992;

	this.shape_400 = new cjs.Shape();
	this.shape_400.graphics.bf(img.Bitmap2, null, new cjs.Matrix2D(1,0,0,1,-499,-300)).s().p("EhN9Au4MAAAhdvMCb7AAAMAAABdvg");
	this.shape_400.setTransform(471,266.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_400},{t:this.instance},{t:this.shape_399},{t:this.shape_398},{t:this.shape_397},{t:this.shape_396},{t:this.shape_395},{t:this.shape_394},{t:this.shape_393},{t:this.shape_392},{t:this.shape_391},{t:this.shape_390},{t:this.shape_389},{t:this.shape_388},{t:this.shape_387},{t:this.shape_386},{t:this.shape_385},{t:this.shape_384},{t:this.shape_383},{t:this.shape_382},{t:this.shape_381},{t:this.shape_380},{t:this.shape_379},{t:this.shape_378},{t:this.shape_377},{t:this.shape_376},{t:this.shape_375},{t:this.shape_374},{t:this.shape_373},{t:this.shape_372},{t:this.shape_371},{t:this.shape_370},{t:this.shape_369},{t:this.shape_368},{t:this.shape_367},{t:this.shape_366},{t:this.shape_365},{t:this.shape_364},{t:this.shape_363},{t:this.shape_362},{t:this.shape_361},{t:this.shape_360},{t:this.shape_359},{t:this.shape_358},{t:this.shape_357},{t:this.shape_356},{t:this.shape_355},{t:this.shape_354},{t:this.shape_353},{t:this.shape_352},{t:this.shape_351},{t:this.shape_350},{t:this.shape_349},{t:this.shape_348},{t:this.shape_347},{t:this.shape_346},{t:this.shape_345},{t:this.shape_344},{t:this.shape_343},{t:this.shape_342},{t:this.shape_341},{t:this.shape_340},{t:this.shape_339},{t:this.shape_338},{t:this.shape_337},{t:this.shape_336},{t:this.shape_335},{t:this.shape_334},{t:this.shape_333},{t:this.shape_332},{t:this.btnNextDasar1},{t:this.btnMenuDasar1},{t:this.btnBack3},{t:this.btnAnim1}]}).wait(1));

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
		{src:"images/_1.png", id:"_1"},
		{src:"images/_1pngcopy.png", id:"_1pngcopy"},
		{src:"images/_2.png", id:"_2"},
		{src:"images/_10pngcopy.png", id:"_10pngcopy"},
		{src:"images/_4.png", id:"_4"},
		{src:"images/_2pngcopy.png", id:"_2pngcopy"},
		{src:"images/_3pngcopy.png", id:"_3pngcopy"},
		{src:"images/_5.png", id:"_5"},
		{src:"images/_4pngcopy.png", id:"_4pngcopy"},
		{src:"images/_3.png", id:"_3"},
		{src:"images/_1pngcopy2.png", id:"_1pngcopy2"},
		{src:"images/_7.png", id:"_7"},
		{src:"images/_6pngcopy.png", id:"_6pngcopy"},
		{src:"images/_8.png", id:"_8"},
		{src:"images/_8pngcopy.png", id:"_8pngcopy"},
		{src:"images/_9.png", id:"_9"},
		{src:"images/_9pngcopy.png", id:"_9pngcopy"},
		{src:"images/bookpngcopy.png", id:"bookpngcopy"},
		{src:"images/_7pngcopy.png", id:"_7pngcopy"},
		{src:"images/Bitmap2.png", id:"Bitmap2"},
		{src:"images/_6.png", id:"_6"},
		{src:"images/_5pngcopy.png", id:"_5pngcopy"}
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