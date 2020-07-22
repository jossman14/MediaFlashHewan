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



(lib._11 = function() {
	this.initialize(img._11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,961,561);


(lib._12 = function() {
	this.initialize(img._12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,961,561);


(lib._13 = function() {
	this.initialize(img._13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,961,561);


(lib._22 = function() {
	this.initialize(img._22);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,562);


(lib._23 = function() {
	this.initialize(img._23);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,562);


(lib._24 = function() {
	this.initialize(img._24);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,562);


(lib._14 = function() {
	this.initialize(img._14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,961,561);


(lib.Bitmap28 = function() {
	this.initialize(img.Bitmap28);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,545);


(lib.Bitmap5 = function() {
	this.initialize(img.Bitmap5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);


(lib.bookpngcopy = function() {
	this.initialize(img.bookpngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,399);


(lib._21 = function() {
	this.initialize(img._21);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,562);// helper functions:

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


(lib.gambar2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._21();
	this.instance.setTransform(-284,-166,0.5894,0.589);

	this.instance_1 = new lib._22();
	this.instance_1.setTransform(-284,-166,0.5894,0.589);

	this.instance_2 = new lib._23();
	this.instance_2.setTransform(-284,-166,0.5894,0.589);

	this.instance_3 = new lib._24();
	this.instance_3.setTransform(-284,-166,0.5894,0.589);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},5).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_3}]},5).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-284,-166,567,331);


(lib.g1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._11();
	this.instance.setTransform(-284,-166,0.59,0.59);

	this.instance_1 = new lib._12();
	this.instance_1.setTransform(-284,-166,0.59,0.59);

	this.instance_2 = new lib._13();
	this.instance_2.setTransform(-284,-166,0.59,0.59);

	this.instance_3 = new lib._14();
	this.instance_3.setTransform(-284,-166,0.59,0.59);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},5).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_3}]},5).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-284,-166,567,331);


(lib.bg1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0097E6").s().p("A82E7Qg1AAAAgYIAApFQAAgXA1AAMA5tAAAQA1AAABAXIAAJFQgBAYg1AAg");
	this.shape.setTransform(-20.05,1.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg1, new cjs.Rectangle(-210.1,-30,380.1,62.9), null);


(lib.btnMenuKI = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#18B8C4").s().p("AhXBMIBNhMIhNhMIAygxIB9B9Ih9B+g");
	this.shape.setTransform(-43.2812,1.4236,0.5329,0.5329,-90);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#18B8C4").s().p("Ah6CSICRiSIiRiRIAygyIDCDDIjCDDg");
	this.shape_1.setTransform(-43.2812,-6.9035,0.5329,0.5329,-90);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7,p:{y:-3.875}},{t:this.shape_6,p:{y:-3.875}},{t:this.shape_5},{t:this.shape_4,p:{y:0.925}},{t:this.shape_3},{t:this.shape_2,p:{y:1.075}},{t:this.shape_1,p:{y:-6.9035}},{t:this.shape,p:{y:1.4236}}]}).to({state:[{t:this.shape_7,p:{y:-2.275}},{t:this.shape_11},{t:this.shape_6,p:{y:-2.275}},{t:this.shape_10},{t:this.shape_4,p:{y:2.525}},{t:this.shape_9},{t:this.shape_2,p:{y:2.675}},{t:this.shape_1,p:{y:-5.3035}},{t:this.shape,p:{y:3.0236}}]},1).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_4,p:{y:6.525}},{t:this.shape_12},{t:this.shape_2,p:{y:6.675}},{t:this.shape_1,p:{y:-1.3035}},{t:this.shape,p:{y:7.0236}}]},1).wait(2));

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
	this.shape.setTransform(-38.9394,-3.0047,0.7124,0.7883,180);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#ED4F44").s().p("Ah3C3QgGgDAAgHIAAgiQAAgOAMgJICPhrQAEgEAAgFQAAgFgEgDIiPhsQgMgIAAgOIAAgiQAAgHAGgDQAHgDAFAEIDkCrQAFAEAAAGQAAAHgFAEIjkCrQgDACgEAAIgFgBg");
	this.shape_1.setTransform(-45.2267,-3.0244,0.7124,0.7883,180);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10,p:{y:-3.875}},{t:this.shape_9,p:{y:-3.875}},{t:this.shape_8},{t:this.shape_7,p:{y:0.925}},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{scaleX:0.7124,scaleY:0.7883,x:-45.2267,y:-3.0244}},{t:this.shape,p:{scaleX:0.7124,scaleY:0.7883,x:-38.9394,y:-3.0047}}]}).to({state:[{t:this.shape_10,p:{y:-1.875}},{t:this.shape_18},{t:this.shape_9,p:{y:-1.875}},{t:this.shape_17},{t:this.shape_7,p:{y:2.925}},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_1,p:{scaleX:0.7119,scaleY:0.7878,x:-45.2201,y:-2.3149}},{t:this.shape,p:{scaleX:0.7119,scaleY:0.7878,x:-38.9375,y:-2.2952}}]},1).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_7,p:{y:6.425}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_1,p:{scaleX:0.7119,scaleY:0.7878,x:-45.2201,y:-0.3149}},{t:this.shape,p:{scaleX:0.7119,scaleY:0.7878,x:-38.9375,y:-0.2952}}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.4,-25.6,118.1,49);


(lib.bg1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0097E6").s().p("A82E7Qg1AAAAgYIAApFQAAgXA1AAMA5tAAAQA1AAABAXIAAJFQgBAYg1AAg");
	this.shape_1.setTransform(-20.05,1.45);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg1_1, new cjs.Rectangle(-210.1,-30,380.1,62.9), null);


// stage content:
(lib.materi5_temp2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{game1:0,game2:1});

	this.actionFrames = [0,1];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var _this = this
		
		_this.setup = function(){
			document.body.style.backgroundColor = lib.properties.color;
		}
		
		_this.setup();
		
		
		_this.stop();
		
		_this.btnMenuDasar1.on('click', function(){
		
		window.location.replace('../menu/index.html');
		});
		
		_this.btnNextDasar1.on('click', function(){
		
		_this.gotoAndStop('game2');
		});
	}
	this.frame_1 = function() {
		var _this = this
		
		_this.setup = function(){
			document.body.style.backgroundColor = lib.properties.color;
		}
		
		_this.setup();
		
		
		_this.stop();
		
		_this.btnMenuDasar1.on('click', function(){
		
		window.location.replace('../menu/index.html');
		});
		
		_this.btnNextDasar1.on('click', function(){
		
		window.location.replace('../materi15/index.html');
		});
		
		_this.btnBack3.on('click', function(){
		
		_this.gotoAndStop('game1');
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1));

	// bg
	this.instance = new lib.g1();
	this.instance.setTransform(488.2,306.25);

	this.instance_1 = new lib.gambar2();
	this.instance_1.setTransform(488.2,306.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	// base
	this.btnNextDasar1 = new lib.btnKINext();
	this.btnNextDasar1.name = "btnNextDasar1";
	this.btnNextDasar1.setTransform(885.8,504.8);
	new cjs.ButtonHelper(this.btnNextDasar1, 0, 1, 2, false, new lib.btnKINext(), 3);

	this.btnMenuDasar1 = new lib.btnMenuKI();
	this.btnMenuDasar1.name = "btnMenuDasar1";
	this.btnMenuDasar1.setTransform(755.75,504.8);
	new cjs.ButtonHelper(this.btnMenuDasar1, 0, 1, 2, false, new lib.btnMenuKI(), 3);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AABAQQAIgMAAgLIAAgPIAUAAIAAANQAAAIgEAJQgFAJgHAGgAgcAQQAHgMAAgLIAAgPIAVAAIAAANQAAAIgFAJQgEAJgHAGg");
	this.shape.setTransform(719.775,102.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAOBEIgWgnIgKAJIAAAeIgZAAIAAiGIAZAAIAABJIAFgGIAYgcIAeAAIgjAnIAmA4g");
	this.shape_1.setTransform(712,106.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgPALgIQALgHAUgBIAMAAIAAgFQAAgGgDgFQgEgDgGAAQgGAAgEACQgEAEAAAFIgZAAQAAgJAFgGQAFgHAJgFQAKgDAKAAQASgBAKAKQAKAIAAARIAAAnQABAOADAHIAAACIgZAAQgCgEgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAFADADQAEADAGAAQAEAAAFgDQAFgCACgEIAAgQIgJAAQgTgBgBANg");
	this.shape_2.setTransform(701.775,108.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgiBBIAAgTIAEAAQAHAAAEgCQADgDACgFIADgHIghhfIAbAAIARA7IASg7IAbAAIgmBtIgDAFQgHATgUAAQgFAAgGgCg");
	this.shape_3.setTransform(692.475,110.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAQAxIAAg8QAAgJgEgDQgDgDgJgBQgJABgGAIIAABDIgZAAIAAhfIAYAAIABALQAKgNAQABQAPgBAIAKQAHAJAAARIAAA9g");
	this.shape_4.setTransform(682.875,108.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgMBDIAAhfIAZAAIAABfgAgJgrQgEgEAAgFQAAgGAEgEQADgDAGAAQAHAAADADQAEAEAAAGQAAAFgEAEQgEAEgGAAQgFAAgEgEg");
	this.shape_5.setTransform(675.475,106.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AApBAIAAgjIADg7IgjBeIgRAAIgjheIADA7IAAAjIgaAAIAAh/IAiAAIAgBcIAhhcIAiAAIAAB/g");
	this.shape_6.setTransform(665.225,107.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgPALgIQALgHAUgBIAMAAIAAgFQAAgGgDgFQgEgDgGAAQgGAAgEACQgEAEAAAFIgZAAQAAgJAFgGQAFgHAJgFQAKgDAKAAQASgBAKAKQAKAIAAARIAAAnQABAOADAHIAAACIgZAAQgCgEgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAFADADQAEADAGAAQAEAAAFgDQAFgCACgEIAAgQIgJAAQgTgBgBANg");
	this.shape_7.setTransform(648.025,108.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAOBEIgXgnIgJAJIAAAeIgZAAIAAiGIAZAAIAABJIAFgGIAYgcIAeAAIgjAnIAmA4g");
	this.shape_8.setTransform(639,106.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AggAoQgIgKAAgRIAAg9IAZAAIAAA9QAAAPAOAAQAMAAAFgJIAAhDIAZAAIAABfIgYAAIgBgKQgJAMgQAAQgPAAgIgJg");
	this.shape_9.setTransform(628.575,108.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgXA8QgMgFgHgKQgGgJAAgNIAaAAQABAWAYAAQAJAAAGgEQAFgEAAgHQAAgHgFgEQgGgEgMgFQgOgEgIgEQgWgLAAgUQAAgLAGgIQAFgIALgEQALgFANAAQAOAAALAFQAKAFAHAJQAFAJAAAMIgaAAQAAgJgFgFQgGgFgKAAQgJAAgGAEQgEAEAAAHQAAAGAFAEQAHAFALADQAXAHAKAJQAKAKAAAPQAAARgMAJQgNAKgVAAQgOAAgMgGg");
	this.shape_10.setTransform(618.05,107.175);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAFgEAFABQAGgBAFAEQADAEAAAFQAAAGgDAEQgFADgGABQgFgBgFgDg");
	this.shape_11.setTransform(605.35,112.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgNBAIAAhqIgmAAIAAgVIBnAAIAAAVIgnAAIAABqg");
	this.shape_12.setTransform(597.225,107.15);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgwBAIAAh/IAxAAQAOAAALAGQALAEAGAKQAGAKAAANQAAASgNAKQgNALgWAAIgXAAIAAAtgAgWgBIAXAAQALAAAFgGQAGgFgBgIQABgKgGgGQgGgFgJgBIgYAAg");
	this.shape_13.setTransform(586.1,107.15);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgMBDIAAhfIAZAAIAABfgAgJgrQgEgEAAgFQAAgGAEgEQADgDAGAAQAHAAADADQAEAEAAAGQAAAFgEAEQgEAEgGAAQgFAAgEgEg");
	this.shape_14.setTransform(573.175,106.9);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AArAxIAAg8QAAgIgEgEQgCgDgJgBQgLAAgFALIAABBIgYAAIAAg8QAAgIgDgEQgDgDgIgBQgLABgFAIIAABDIgZAAIAAhfIAXAAIABALQALgMAQAAQASAAAHAOQAKgOASAAQAQgBAIAKQAHAJAAASIAAA8g");
	this.shape_15.setTransform(563,108.7);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AggAoQgIgKAAgRIAAg9IAZAAIAAA9QAAAPAOAAQAMAAAFgJIAAhDIAZAAIAABfIgYAAIgBgKQgJAMgQAAQgPAAgIgJg");
	this.shape_16.setTransform(550.175,108.9);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgSA5IgBAKIgXAAIAAiGIAZAAIAAAwQAJgKAOAAQARgBAKANQAKANAAAWIAAACQAAAWgKANQgKANgRABQgPgBgJgLgAgRAAIAAAmQAFAKAMAAQAMAAADgNQACgFAAgMQAAgOgEgGQgFgGgIgBQgMAAgFAJg");
	this.shape_17.setTransform(540.275,106.9);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAPBEIgYgnIgJAJIAAAeIgZAAIAAiGIAZAAIAABJIAFgGIAXgcIAfAAIgiAnIAlA4g");
	this.shape_18.setTransform(526.3,106.8);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgPALgIQALgHAUgBIAMAAIAAgFQAAgGgDgFQgEgDgGAAQgGAAgEACQgEAEAAAFIgZAAQAAgJAFgGQAFgHAJgFQAKgDAKAAQASgBAKAKQAKAIAAARIAAAnQABAOADAHIAAACIgZAAQgCgEgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAFADADQAEADAGAAQAEAAAFgDQAFgCACgEIAAgQIgJAAQgTgBgBANg");
	this.shape_19.setTransform(516.075,108.8);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgiBBIAAgTIAEAAQAHAAAEgCQADgDACgFIADgHIghhfIAbAAIARA7IASg7IAbAAIgmBtIgDAFQgHATgUAAQgFAAgGgCg");
	this.shape_20.setTransform(506.775,110.725);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAQAxIAAg8QAAgJgEgDQgDgDgJgBQgJABgGAIIAABDIgZAAIAAhfIAYAAIABALQAKgNAQABQAPgBAIAKQAHAJAAARIAAA9g");
	this.shape_21.setTransform(497.175,108.7);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgMBDIAAhfIAZAAIAABfgAgJgrQgEgEAAgFQAAgGAEgEQADgDAGAAQAHAAADADQAEAEAAAGQAAAFgEAEQgEAEgGAAQgFAAgEgEg");
	this.shape_22.setTransform(489.775,106.9);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AAqAxIAAg8QAAgIgCgEQgDgDgIgBQgMAAgEALIAABBIgZAAIAAg8QAAgIgDgEQgEgDgHgBQgLABgFAIIAABDIgZAAIAAhfIAXAAIACALQAJgMASAAQARAAAHAOQAKgOATAAQAPgBAHAKQAIAJAAASIAAA8g");
	this.shape_23.setTransform(479.6,108.7);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AAQAxIAAg8QAAgJgEgDQgDgDgJgBQgJABgGAIIAABDIgZAAIAAhfIAYAAIABALQAKgNAQABQAPgBAIAKQAHAJAAARIAAA9g");
	this.shape_24.setTransform(462.225,108.7);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgPALgIQALgHAUgBIAMAAIAAgFQAAgGgDgFQgEgDgGAAQgGAAgEACQgEAEAAAFIgZAAQAAgJAFgGQAFgHAJgFQAKgDAKAAQASgBAKAKQAKAIAAARIAAAnQABAOADAHIAAACIgZAAQgCgEgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAFADADQAEADAGAAQAEAAAFgDQAFgCACgEIAAgQIgJAAQgTgBgBANg");
	this.shape_25.setTransform(452.375,108.8);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgWA/QgJgEgFgHIAKgPQAKAKAOAAQAJAAAFgFQAGgFAAgKIAAgFQgJAKgNAAQgRAAgLgOQgLgNAAgVIAAgCQAAgVALgOQALgNARAAQAOAAAJALIABgJIAYAAIAABbQgBAMgFAJQgGAKgKAEQgLAFgMAAQgLAAgKgEgAgMgmQgFAHAAAPQAAANAFAHQAFAHAIAAQAMAAAFgJIAAgnQgFgIgMAAQgIAAgFAHg");
	this.shape_26.setTransform(442.3,110.575);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAQAxIAAg8QAAgJgEgDQgDgDgJgBQgJABgGAIIAABDIgZAAIAAhfIAYAAIABALQAKgNAQABQAPgBAIAKQAHAJAAARIAAA9g");
	this.shape_27.setTransform(432.275,108.7);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgPALgIQALgHAUgBIAMAAIAAgFQAAgGgDgFQgEgDgGAAQgGAAgEACQgEAEAAAFIgZAAQAAgJAFgGQAFgHAJgFQAKgDAKAAQASgBAKAKQAKAIAAARIAAAnQABAOADAHIAAACIgZAAQgCgEgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAFADADQAEADAGAAQAEAAAFgDQAFgCACgEIAAgQIgJAAQgTgBgBANg");
	this.shape_28.setTransform(422.425,108.8);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgSA5IgBAKIgXAAIAAiGIAZAAIAAAwQAJgKAOAAQARgBAKANQAKANAAAWIAAACQAAAWgKANQgKANgRABQgPgBgJgLgAgRAAIAAAmQAFAKAMAAQAMAAADgNQACgFAAgMQAAgOgEgGQgFgGgIgBQgMAAgFAJg");
	this.shape_29.setTransform(412.725,106.9);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AArAxIAAg8QAAgIgEgEQgCgDgJgBQgLAAgFALIAABBIgYAAIAAg8QAAgIgDgEQgEgDgHgBQgLABgFAIIAABDIgZAAIAAhfIAXAAIABALQALgMAQAAQASAAAHAOQAKgOASAAQAQgBAIAKQAHAJAAASIAAA8g");
	this.shape_30.setTransform(399.65,108.7);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgPALgIQALgHAUgBIAMAAIAAgFQAAgGgDgFQgEgDgGAAQgGAAgEACQgEAEAAAFIgZAAQAAgJAFgGQAFgHAJgFQAKgDAKAAQASgBAKAKQAKAIAAARIAAAnQABAOADAHIAAACIgZAAQgCgEgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAFADADQAEADAGAAQAEAAAFgDQAFgCACgEIAAgQIgJAAQgTgBgBANg");
	this.shape_31.setTransform(387.025,108.8);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAQAxIAAg8QAAgJgEgDQgDgDgJgBQgJABgGAIIAABDIgZAAIAAhfIAYAAIABALQAKgNAQABQAPgBAIAKQAHAJAAARIAAA9g");
	this.shape_32.setTransform(377.125,108.7);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgdAkQgNgMAAgWIAAgCQAAgNAFgMQAGgLAKgGQAKgGAMAAQAUAAALAMQALANAAAWIAAAJIg7AAQABAJAGAGQAGAGAIAAQAPAAAJgLIAMAOQgGAIgKAFQgJAEgMABQgUgBgNgNgAgKgXQgFAGgBAJIAiAAIAAgCQAAgIgFgFQgEgFgIAAQgGAAgFAFg");
	this.shape_33.setTransform(367.3,108.8);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgqBDIAAiDIAYAAIAAAJQAKgLAOAAQARAAAKANQAKANAAAXIAAACQAAAVgKANQgKANgRAAQgOAAgJgKIAAAtgAgRgkIAAAmQAFAKAMAAQARAAAAgdQAAgOgEgHQgFgHgIAAQgMAAgFAJg");
	this.shape_34.setTransform(357.475,110.525);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AAQAxIAAg8QAAgJgEgDQgDgDgJgBQgJABgGAIIAABDIgZAAIAAhfIAYAAIABALQAKgNAQABQAPgBAIAKQAHAJAAARIAAA9g");
	this.shape_35.setTransform(342.625,108.7);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgPALgIQALgHAUgBIAMAAIAAgFQAAgGgDgFQgEgDgGAAQgGAAgEACQgEAEAAAFIgZAAQAAgJAFgGQAFgHAJgFQAKgDAKAAQASgBAKAKQAKAIAAARIAAAnQABAOADAHIAAACIgZAAQgCgEgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAFADADQAEADAGAAQAEAAAFgDQAFgCACgEIAAgQIgJAAQgTgBgBANg");
	this.shape_36.setTransform(332.775,108.8);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgPALgIQALgHAUgBIAMAAIAAgFQAAgGgDgFQgEgDgGAAQgGAAgEACQgEAEAAAFIgZAAQAAgJAFgGQAFgHAJgFQAKgDAKAAQASgBAKAKQAKAIAAARIAAAnQABAOADAHIAAACIgZAAQgCgEgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAFADADQAEADAGAAQAEAAAFgDQAFgCACgEIAAgQIgJAAQgTgBgBANg");
	this.shape_37.setTransform(323.125,108.8);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AAQBEIAAg9QAAgHgEgDQgDgFgJAAQgKAAgFAIIAABEIgZAAIAAiGIAZAAIAAAyQAKgMAPAAQAfgBAAAkIAAA9g");
	this.shape_38.setTransform(313.275,106.8);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgPALgIQALgHAUgBIAMAAIAAgFQAAgGgDgFQgEgDgGAAQgGAAgEACQgEAEAAAFIgZAAQAAgJAFgGQAFgHAJgFQAKgDAKAAQASgBAKAKQAKAIAAARIAAAnQABAOADAHIAAACIgZAAQgCgEgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAFADADQAEADAGAAQAEAAAFgDQAFgCACgEIAAgQIgJAAQgTgBgBANg");
	this.shape_39.setTransform(303.425,108.8);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgTAtQgKgEgGgIQgEgHAAgJIAXAAQABAHAFADQAEAEAHAAQAHAAAEgCQAEgDAAgFQAAgEgFgDQgFgDgIgCQgjgHABgVQAAgNAKgIQAKgIAQAAQATAAAKAIQALAIAAAOIgZAAQAAgFgEgEQgDgDgIAAQgFAAgEACQgDADAAAFQAAAEAEADQAEADAJABQAJACAGADQAVAGAAASQAAANgMAIQgLAJgSAAQgLgBgIgEg");
	this.shape_40.setTransform(293.9,108.8);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AggAoQgIgKAAgRIAAg9IAZAAIAAA9QAAAPAOAAQAMAAAFgJIAAhDIAZAAIAABfIgYAAIgBgKQgJAMgQAAQgPAAgIgJg");
	this.shape_41.setTransform(284.325,108.9);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgaAxIAAhfIAYAAIABALQAGgNAOABQAEgBAEACIgBAYIgJAAQgOAAgEAKIAAA9g");
	this.shape_42.setTransform(276.425,108.7);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgdAkQgNgMAAgWIAAgCQAAgNAGgMQAFgLAKgGQAKgGAMAAQAUAAALAMQALANAAAWIAAAJIg7AAQABAJAGAGQAGAGAIAAQAPAAAJgLIAMAOQgGAIgJAFQgKAEgMABQgUgBgNgNgAgKgXQgFAGgBAJIAiAAIAAgCQAAgIgFgFQgEgFgIAAQgHAAgEAFg");
	this.shape_43.setTransform(267.95,108.8);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgqBDIAAiDIAYAAIAAAJQAKgLAOAAQARAAAKANQAKANAAAXIAAACQAAAVgKANQgKANgRAAQgOAAgJgKIAAAtgAgRgkIAAAmQAFAKAMAAQARAAAAgdQAAgOgEgHQgFgHgIAAQgMAAgFAJg");
	this.shape_44.setTransform(258.125,110.525);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AggAnQgIgIAAgRIAAg9IAZAAIAAA8QAAAPAOAAQAMAAAFgJIAAhCIAZAAIAABdIgYAAIgBgJQgJAMgQgBQgPAAgIgJg");
	this.shape_45.setTransform(744.425,83.3);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgNAhIAAgyIgOAAIAAgTIAOAAIAAgXIAYAAIAAAXIAQAAIAAATIgQAAIAAAuQAAAGACACQACACAGAAIAHgBIAAAUQgHACgIAAQgaAAAAgbg");
	this.shape_46.setTransform(736.225,82.125);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_47.setTransform(728.475,83.2);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AggAnQgIgIAAgRIAAg9IAZAAIAAA8QAAAPAOAAQAMAAAFgJIAAhCIAZAAIAABdIgYAAIgBgJQgJAMgQgBQgPAAgIgJg");
	this.shape_48.setTransform(718.625,83.3);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgTAtQgKgFgGgGQgEgIAAgIIAXAAQABAGAFADQAEAEAHAAQAHAAAEgDQAEgDAAgEQAAgFgFgCQgEgDgJgCQgjgHAAgUQAAgNALgJQAKgJAQAAQATAAAKAJQALAJAAAOIgZAAQAAgGgEgDQgDgEgIAAQgFAAgEADQgDADAAAEQAAAEAEADQAEADAJACQAJABAGACQAVAHAAASQAAANgMAJQgLAHgSAAQgKABgJgFg");
	this.shape_49.setTransform(708.9,83.2);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgDAAgGQAAgGAEgDQADgEAGgBQAHABADAEQAEADAAAGQAAAGgEADQgEAEgGAAQgFAAgEgEg");
	this.shape_50.setTransform(697.475,81.3);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgaAwIAAhdIAYAAIABALQAGgOAOAAQAEAAAEACIgBAYIgJgBQgOABgEAJIAAA9g");
	this.shape_51.setTransform(692.225,83.1);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgDAAgGQAAgGAEgDQADgEAGgBQAHABADAEQAEADAAAGQAAAGgEADQgEAEgGAAQgFAAgEgEg");
	this.shape_52.setTransform(686.175,81.3);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AggA3QgKgNAAgYQAAgVAKgNQAKgOARAAQANAAAJALIAAgxIAaAAIAACGIgXAAIgBgKQgKAMgOAAQgRAAgKgNgAgRAUQAAAOAFAGQAFAIAIAAQALAAAFgKIAAgmQgEgIgMAAQgSgBAAAdg");
	this.shape_53.setTransform(678.525,81.3);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgaAwIAAhdIAYAAIABALQAGgOAOAAQAEAAAEACIgBAYIgJgBQgOABgEAJIAAA9g");
	this.shape_54.setTransform(670.775,83.1);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgdAkQgNgNAAgVIAAgCQAAgOAFgLQAGgLAKgGQAKgHAMAAQAUAAALANQALANAAAWIAAAJIg8AAQACAKAGAFQAGAGAIAAQAPAAAJgLIAMAOQgFAIgLAFQgJAFgMgBQgUAAgNgNgAgKgXQgFAGgBAJIAiAAIAAgCQAAgIgEgFQgFgFgIAAQgHAAgEAFg");
	this.shape_55.setTransform(662.3,83.2);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgSA4IgBAKIgXAAIAAiGIAZAAIAAAxQAJgLAOAAQARAAAKAOQAKAMAAAXIAAABQAAAWgKANQgKANgRAAQgPAAgJgMgAgRAAIAAAmQAFAKAMAAQAMAAADgMQACgGAAgMQAAgPgEgFQgFgGgIAAQgMAAgFAIg");
	this.shape_56.setTransform(652.475,81.3);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgVA/QgLgEgFgHIALgPQAKAKAOAAQAJAAAGgFQAFgFAAgKIAAgFQgJAKgNAAQgRAAgLgOQgLgNAAgVIAAgCQAAgVALgOQALgNARAAQAPAAAIALIACgJIAWAAIAABbQAAAMgFAJQgGAKgKAEQgLAFgMAAQgLAAgJgEgAgMgmQgFAHAAAPQAAANAFAHQAGAHAHAAQAMAAAFgJIAAgnQgFgIgMAAQgHAAgGAHg");
	this.shape_57.setTransform(637.45,84.975);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AAQAwIAAg8QAAgHgEgEQgDgEgJABQgJgBgGAKIAABBIgZAAIAAhdIAYAAIABALQAKgOAQAAQAPABAIAIQAHAKAAARIAAA8g");
	this.shape_58.setTransform(627.425,83.1);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_59.setTransform(617.575,83.2);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgaAwIAAhdIAYAAIABALQAGgOAOAAQAEAAAEACIgBAYIgJgBQgOABgEAJIAAA9g");
	this.shape_60.setTransform(609.875,83.1);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_61.setTransform(601.375,83.2);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AArAwIAAg7QAAgIgDgEQgEgEgIABQgLAAgEAKIAABAIgZAAIAAg7QAAgJgDgDQgDgEgIABQgLgBgFAKIAABBIgZAAIAAhdIAXAAIABAKQALgNAQAAQASAAAHAPQAKgPASAAQAQABAIAIQAHAKAAASIAAA7g");
	this.shape_62.setTransform(588.75,83.1);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgdAkQgNgNAAgVIAAgCQAAgOAFgLQAGgLAKgGQAKgHAMAAQATAAAMANQALANAAAWIAAAJIg8AAQACAKAGAFQAGAGAJAAQAPAAAHgLIANAOQgFAIgKAFQgKAFgMgBQgUAAgNgNgAgKgXQgFAGgBAJIAiAAIAAgCQAAgIgEgFQgFgFgIAAQgHAAgEAFg");
	this.shape_63.setTransform(576.15,83.2);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgXA8QgMgFgHgKQgGgJAAgNIAbAAQAAAWAYAAQAJAAAGgEQAFgEAAgHQAAgHgFgEQgGgEgMgFQgOgEgIgEQgWgLAAgUQAAgLAGgIQAGgIALgEQAKgFANAAQAOAAAKAFQALAFAHAJQAFAJAAAMIgaAAQAAgJgFgFQgGgFgKAAQgJAAgFAEQgGAEAAAHQAAAGAHAEQAGAFALADQAXAHAKAJQAKAKAAAPQAAARgNAJQgMAKgVAAQgOAAgMgGg");
	this.shape_64.setTransform(565.7,81.575);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_65.setTransform(550.875,83.2);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgNAhIAAgyIgOAAIAAgTIAOAAIAAgXIAYAAIAAAXIAQAAIAAATIgQAAIAAAuQAAAGACACQACACAGAAIAHgBIAAAUQgHACgIAAQgaAAAAgbg");
	this.shape_66.setTransform(542.875,82.125);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AggAkQgMgNAAgXIAAAAQAAgOAGgLQAEgLALgHQAKgFANgBQATAAAMANQAMALABAUIABAGQAAAWgMANQgNANgUAAQgUAAgMgNgAgNgUQgGAGAAAPQAAAOAGAGQAEAIAJAAQAJAAAGgIQAEgHAAgOQAAgOgEgGQgGgIgJAAQgIAAgFAIg");
	this.shape_67.setTransform(534.85,83.2);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AAVBAIggg0IgOAQIAAAkIgaAAIAAh/IAaAAIAAA6IAMgQIAfgqIAhAAIguA5IAvBGg");
	this.shape_68.setTransform(524.675,81.55);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgDAAgGQAAgGAEgDQADgEAGgBQAHABADAEQAEADAAAGQAAAGgEADQgEAEgGAAQgFAAgEgEg");
	this.shape_69.setTransform(511.425,81.3);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AggA3QgKgNAAgYQAAgVAKgNQAKgOARAAQANAAAJALIAAgxIAaAAIAACGIgXAAIgBgKQgKAMgOAAQgRAAgKgNgAgRAUQAAAOAFAGQAFAIAIAAQALAAAFgKIAAgmQgEgIgMAAQgSgBAAAdg");
	this.shape_70.setTransform(503.775,81.3);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_71.setTransform(489.575,83.2);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AggA3QgKgNAAgYQAAgVAKgNQAKgOARAAQANAAAJALIAAgxIAaAAIAACGIgXAAIgBgKQgKAMgOAAQgRAAgKgNgAgRAUQAAAOAFAGQAFAIAIAAQALAAAFgKIAAgmQgEgIgMAAQgSgBAAAdg");
	this.shape_72.setTransform(479.475,81.3);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_73.setTransform(469.775,83.2);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgaAwIAAhdIAYAAIABALQAGgOAOAAQAEAAAEACIgBAYIgJgBQgOABgEAJIAAA9g");
	this.shape_74.setTransform(462.075,83.1);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgdAkQgNgNAAgVIAAgCQAAgOAFgLQAGgLAKgGQAKgHAMAAQAUAAALANQALANAAAWIAAAJIg7AAQABAKAGAFQAGAGAIAAQAPAAAJgLIAMAOQgGAIgKAFQgJAFgMgBQgUAAgNgNgAgKgXQgFAGgBAJIAiAAIAAgCQAAgIgFgFQgEgFgIAAQgGAAgFAFg");
	this.shape_75.setTransform(453.6,83.2);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgSA4IgBAKIgXAAIAAiGIAZAAIAAAxQAJgLAOAAQARAAAKAOQAKAMAAAXIAAABQAAAWgKANQgKANgRAAQgPAAgJgMgAgRAAIAAAmQAFAKAMAAQAMAAADgMQACgGAAgMQAAgPgEgFQgFgGgIAAQgMAAgFAIg");
	this.shape_76.setTransform(443.775,81.3);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgVA/QgKgEgGgHIALgPQAKAKANAAQAKAAAGgFQAFgFAAgKIAAgFQgJAKgNAAQgRAAgLgOQgLgNABgVIAAgCQgBgVALgOQALgNARAAQAOAAAKALIABgJIAWAAIAABbQAAAMgFAJQgGAKgKAEQgKAFgNAAQgKAAgKgEgAgMgmQgFAHAAAPQAAANAFAHQAGAHAIAAQALAAAFgJIAAgnQgFgIgLAAQgIAAgGAHg");
	this.shape_77.setTransform(428.75,84.975);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AAQAwIAAg8QAAgHgEgEQgDgEgJABQgJgBgGAKIAABBIgZAAIAAhdIAYAAIABALQAKgOAQAAQAPABAIAIQAHAKAAARIAAA8g");
	this.shape_78.setTransform(418.725,83.1);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_79.setTransform(408.875,83.2);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgiBBIAAgTIAEAAQAHAAAEgCQADgDACgFIADgHIghhfIAbAAIARA7IASg7IAbAAIgmBtIgDAFQgHATgUAAQgFAAgGgCg");
	this.shape_80.setTransform(399.575,85.125);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AAQBDIAAg7QAAgIgEgEQgDgDgJAAQgKAAgFAHIAABDIgZAAIAAiGIAZAAIAAAzQAKgNAPAAQAfABAAAiIAAA9g");
	this.shape_81.setTransform(385.525,81.2);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_82.setTransform(375.675,83.2);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgiBBIAAgTIAEAAQAHAAAEgCQADgDACgFIADgHIghhfIAbAAIARA7IASg7IAbAAIgmBtIgDAFQgHATgUAAQgFAAgGgCg");
	this.shape_83.setTransform(366.375,85.125);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_84.setTransform(357.025,83.2);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgMBDIAAiGIAZAAIAACGg");
	this.shape_85.setTransform(349.825,81.2);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgDAAgGQAAgGAEgDQADgEAGgBQAHABADAEQAEADAAAGQAAAGgEADQgEAEgGAAQgFAAgEgEg");
	this.shape_86.setTransform(345.075,81.3);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AASAvIgSg6IgRA6IgVAAIgZhdIAZAAIAMA7IASg7IARAAIARA7IANg7IAYAAIgYBdg");
	this.shape_87.setTransform(336.05,83.2);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AggAnQgIgIAAgRIAAg9IAZAAIAAA8QAAAPAOAAQAMAAAFgJIAAhCIAZAAIAABdIgYAAIgBgJQgJAMgQgBQgPAAgIgJg");
	this.shape_88.setTransform(319.925,83.3);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgNAhIAAgyIgOAAIAAgTIAOAAIAAgXIAYAAIAAAXIAQAAIAAATIgQAAIAAAuQAAAGACACQACACAGAAIAHgBIAAAUQgHACgIAAQgaAAAAgbg");
	this.shape_89.setTransform(311.725,82.125);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_90.setTransform(303.975,83.2);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AggAnQgIgIAAgRIAAg9IAZAAIAAA8QAAAPAOAAQAMAAAFgJIAAhCIAZAAIAABdIgYAAIgBgJQgJAMgQgBQgPAAgIgJg");
	this.shape_91.setTransform(294.125,83.3);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AgUAtQgJgFgFgGQgGgIABgIIAYAAQAAAGAEADQAFAEAHAAQAIAAADgDQAEgDAAgEQAAgFgFgCQgEgDgKgCQghgHgBgUQAAgNALgJQAKgJARAAQARAAAMAJQAKAJAAAOIgZAAQAAgGgDgDQgEgEgHAAQgGAAgEADQgDADAAAEQAAAEAEADQAEADAJACQAJABAHACQATAHAAASQABANgLAJQgMAHgRAAQgLABgKgFg");
	this.shape_92.setTransform(284.4,83.2);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_93.setTransform(270.525,83.2);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AggA3QgKgNAAgYQAAgVAKgNQAKgOARAAQANAAAJALIAAgxIAaAAIAACGIgXAAIgBgKQgKAMgOAAQgRAAgKgNgAgRAUQAAAOAFAGQAFAIAIAAQALAAAFgKIAAgmQgEgIgMAAQgSgBAAAdg");
	this.shape_94.setTransform(260.425,81.3);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_95.setTransform(250.725,83.2);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgwBAIAAh/IAxAAQAPAAAKAFQALAFAGALQAGAJAAAMQAAATgNAKQgNALgXAAIgVAAIAAAtgAgVgCIAWAAQAKAAAGgEQAGgGAAgJQAAgJgGgFQgGgHgKABIgWAAg");
	this.shape_96.setTransform(240.35,81.55);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AABAXIAAgNQAAgJAFgIQAEgKAHgFIAMAHQgIAMAAALIAAAPgAgcAXIAAgNQAAgJAEgIQAFgKAHgFIAMAHQgIAMAAALIAAAPg");
	this.shape_97.setTransform(230.9,76.45);

	this.judulKI = new lib.bg1_1();
	this.judulKI.name = "judulKI";
	this.judulKI.setTransform(523.7,95.05,1.7364,1.0347,0,0,0,0.4,0.3);
	this.judulKI.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);

	this.instance_2 = new lib.Bitmap28();
	this.instance_2.setTransform(7,4);

	this.instance_3 = new lib.Bitmap5();
	this.instance_3.setTransform(-28,-39);

	this.btnBack3 = new lib.btnKIBack();
	this.btnBack3.name = "btnBack3";
	this.btnBack3.setTransform(749,508.25);
	new cjs.ButtonHelper(this.btnBack3, 0, 1, 2, false, new lib.btnKIBack(), 3);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AggAkQgMgNAAgXIAAAAQAAgOAGgLQAEgLALgGQAKgHANABQATgBAMAMQANAMAAAVIABAFQAAAWgMANQgNAOgUAAQgUAAgMgOgAgOgUQgFAHAAAOQAAANAFAIQAGAHAIAAQAJAAAGgHQAEgIAAgOQAAgNgEgHQgGgIgJAAQgJAAgFAIg");
	this.shape_98.setTransform(495.95,108.8);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AgdAkQgMgNAAgXIAAAAQAAgWAMgOQAMgNATABQASAAAKAKQALAKAAARIgXAAQgBgHgEgFQgEgFgHAAQgIAAgFAHQgEAGAAAOIAAADQAAAOAEAHQAFAGAIAAQAHAAAEgEQAEgEABgGIAXAAQAAAJgEAIQgGAJgJAEQgJAEgLABQgTgBgMgNg");
	this.shape_99.setTransform(486.2,108.8);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AggAkQgMgNAAgXIAAAAQAAgOAGgLQAEgLALgGQAKgHANABQATgBAMAMQAMAMABAVIABAFQAAAWgMANQgNAOgUAAQgUAAgMgOgAgNgUQgGAHAAAOQAAANAGAIQAEAHAJAAQAJAAAGgHQAEgIAAgOQAAgNgEgHQgGgIgJAAQgIAAgFAIg");
	this.shape_100.setTransform(476.35,108.8);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AAOBEIgWgnIgKAJIAAAeIgZAAIAAiGIAZAAIAABJIAFgGIAXgcIAfAAIgiAnIAlA4g");
	this.shape_101.setTransform(447.15,106.8);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AAqAwIAAg7QAAgIgCgEQgEgEgHABQgMAAgEAKIAABAIgZAAIAAg7QAAgJgDgDQgDgEgIABQgLgBgFAKIAABBIgZAAIAAhdIAYAAIABAKQAJgNASAAQARAAAHAPQAKgPATAAQAPABAHAIQAIAKAAASIAAA7g");
	this.shape_102.setTransform(745.65,83.1);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AgVA/QgLgEgFgHIALgPQAKAKAOAAQAJAAAGgFQAFgFAAgKIAAgFQgJAKgNAAQgRAAgLgOQgLgNAAgVIAAgCQAAgVALgOQALgNARAAQAPAAAIALIACgJIAWAAIAABbQAAAMgFAJQgGAKgKAEQgLAFgMAAQgKAAgKgEgAgMgmQgFAHAAAPQAAANAFAHQAGAHAHAAQAMAAAFgJIAAgnQgFgIgMAAQgHAAgGAHg");
	this.shape_103.setTransform(708.55,84.975);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AgdAkQgNgNAAgVIAAgCQAAgOAGgLQAFgLAKgGQAKgHAMAAQAUAAALANQALANAAAWIAAAJIg7AAQABAKAGAFQAGAGAIAAQAPAAAJgLIAMAOQgGAIgJAFQgKAFgMgBQgUAAgNgNgAgKgXQgFAGgBAJIAiAAIAAgCQAAgIgFgFQgEgFgIAAQgHAAgEAFg");
	this.shape_104.setTransform(688.7,83.2);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AArAwIAAg7QAAgIgEgEQgCgEgJABQgLAAgFAKIAABAIgYAAIAAg7QAAgJgDgDQgEgEgHABQgLgBgFAKIAABBIgZAAIAAhdIAXAAIABAKQALgNAQAAQASAAAHAPQAKgPASAAQAQABAIAIQAHAKAAASIAAA7g");
	this.shape_105.setTransform(675.95,83.1);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AAOBDIgWglIgKAIIAAAdIgZAAIAAiGIAZAAIAABLIAFgHIAYgbIAeAAIgjAmIAmA3g");
	this.shape_106.setTransform(659.45,81.2);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AApBAIAAgjIADg8IgjBfIgRAAIgjhfIADA8IAAAjIgaAAIAAh/IAiAAIAgBcIAhhcIAiAAIAAB/g");
	this.shape_107.setTransform(612.675,81.55);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AAOBDIgWglIgKAIIAAAdIgZAAIAAiGIAZAAIAABLIAFgHIAYgbIAeAAIgjAmIAmA3g");
	this.shape_108.setTransform(586.45,81.2);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AgXA8QgMgFgHgKQgGgJAAgNIAaAAQAAAWAZAAQAJAAAGgEQAFgEAAgHQAAgHgFgEQgGgEgMgFQgOgEgIgEQgWgLAAgUQAAgLAGgIQAFgIALgEQAMgFAMAAQAOAAALAFQAKAFAHAJQAFAJAAAMIgaAAQAAgJgFgFQgGgFgKAAQgJAAgGAEQgEAEAAAHQAAAGAFAEQAHAFALADQAXAHAKAJQAKAKAAAPQAAARgMAJQgNAKgVAAQgOAAgMgGg");
	this.shape_109.setTransform(565.5,81.575);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AgJAKQgFgEAAgGQAAgFAFgEQAEgEAFAAQAGAAAFAEQADAEAAAFQAAAGgDAEQgFAEgGgBQgFABgEgEg");
	this.shape_110.setTransform(552.8,86.7);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgNBAIAAhpIgmAAIAAgWIBnAAIAAAWIgnAAIAABpg");
	this.shape_111.setTransform(544.675,81.55);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AgwBAIAAh/IAxAAQAPAAAKAFQALAFAGALQAGAJAAAMQAAATgNAKQgNALgWAAIgXAAIAAAtgAgWgCIAXAAQALAAAFgEQAGgGgBgJQABgJgGgFQgGgHgJABIgYAAg");
	this.shape_112.setTransform(533.55,81.55);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AAPBDIgXglIgKAIIAAAdIgZAAIAAiGIAZAAIAABLIAFgHIAXgbIAfAAIgiAmIAlA3g");
	this.shape_113.setTransform(518.8,81.2);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AAQAwIAAg8QAAgHgEgEQgDgEgJABQgJgBgGAKIAABBIgZAAIAAhdIAYAAIABALQAKgOAQAAQAPABAIAIQAHAKAAARIAAA8g");
	this.shape_114.setTransform(489.675,83.1);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AArAwIAAg7QAAgIgEgEQgCgEgJABQgLAAgFAKIAABAIgYAAIAAg7QAAgJgDgDQgDgEgIABQgLgBgFAKIAABBIgZAAIAAhdIAXAAIABAKQALgNAQAAQASAAAHAPQAKgPASAAQAQABAIAIQAHAKAAASIAAA7g");
	this.shape_115.setTransform(472.1,83.1);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AAQAwIAAg8QAAgHgEgEQgDgEgJABQgJgBgGAKIAABBIgZAAIAAhdIAYAAIABALQAKgOAQAAQAPABAIAIQAHAKAAARIAAA8g");
	this.shape_116.setTransform(415.525,83.1);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AgMBDIAAiGIAZAAIAACGg");
	this.shape_117.setTransform(381.875,81.2);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AgUAtQgJgFgFgGQgGgIAAgIIAZAAQAAAGAEADQAFAEAHAAQAHAAAEgDQAEgDAAgEQAAgFgFgCQgEgDgKgCQghgHAAgUQgBgNALgJQALgJAQAAQARAAAMAJQAKAJAAAOIgZAAQAAgGgEgDQgDgEgHAAQgGAAgDADQgEADAAAEQAAAEAEADQAEADAIACQAKABAGACQAUAHAAASQABANgLAJQgMAHgRAAQgLABgKgFg");
	this.shape_118.setTransform(365.15,83.2);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AgPAUIADgGQAHgLAAgJIAAgUIAVAAIgBASQAAAIgFAKQgEAKgHAHg");
	this.shape_119.setTransform(353.55,88.475);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgDAAgGQAAgGAEgDQADgEAGgBQAHABADAEQAEADAAAGQAAAGgEADQgEAEgGAAQgFAAgEgEg");
	this.shape_120.setTransform(349.325,81.3);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AgTAtQgKgFgGgGQgEgIAAgIIAXAAQABAGAFADQAEAEAHAAQAHAAAEgDQAEgDAAgEQAAgFgFgCQgEgDgJgCQgjgHAAgUQAAgNALgJQALgJAPAAQATAAALAJQAKAJAAAOIgZAAQAAgGgDgDQgEgEgIAAQgFAAgEADQgDADAAAEQAAAEAEADQAEADAJACQAJABAHACQATAHABASQgBANgKAJQgMAHgSAAQgLABgIgFg");
	this.shape_121.setTransform(275.65,83.2);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AgwBAIAAh/IAxAAQAPAAAKAFQALAFAGALQAGAJAAAMQAAATgNAKQgNALgWAAIgXAAIAAAtgAgWgCIAXAAQALAAAFgEQAGgGgBgJQABgJgGgFQgGgHgJABIgYAAg");
	this.shape_122.setTransform(231.6,81.55);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AABAXIAAgNQAAgJAEgIQAFgKAHgFIAMAHQgHAMgBALIAAAPgAgcAXIAAgNQAAgJAEgIQAFgKAHgFIAMAHQgIAMAAALIAAAPg");
	this.shape_123.setTransform(222.15,76.45);

	this.judulKI_1 = new lib.bg1();
	this.judulKI_1.name = "judulKI_1";
	this.judulKI_1.setTransform(523.7,95.05,1.7364,1.0347,0,0,0,0.4,0.3);
	this.judulKI_1.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.judulKI},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95,p:{x:250.725}},{t:this.shape_94},{t:this.shape_93,p:{x:270.525}},{t:this.shape_92},{t:this.shape_91,p:{x:294.125}},{t:this.shape_90,p:{x:303.975}},{t:this.shape_89},{t:this.shape_88,p:{x:319.925}},{t:this.shape_87},{t:this.shape_86,p:{x:345.075}},{t:this.shape_85,p:{x:349.825}},{t:this.shape_84,p:{x:357.025}},{t:this.shape_83},{t:this.shape_82,p:{x:375.675}},{t:this.shape_81,p:{x:385.525}},{t:this.shape_80},{t:this.shape_79,p:{x:408.875}},{t:this.shape_78,p:{x:418.725}},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73,p:{x:469.775}},{t:this.shape_72},{t:this.shape_71,p:{x:489.575}},{t:this.shape_70},{t:this.shape_69,p:{x:511.425}},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65,p:{x:550.875}},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61,p:{x:601.375}},{t:this.shape_60},{t:this.shape_59,p:{x:617.575}},{t:this.shape_58,p:{x:627.425}},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54,p:{x:670.775}},{t:this.shape_53,p:{x:678.525}},{t:this.shape_52,p:{x:686.175}},{t:this.shape_51,p:{x:692.225}},{t:this.shape_50,p:{x:697.475}},{t:this.shape_49},{t:this.shape_48,p:{x:718.625}},{t:this.shape_47,p:{x:728.475}},{t:this.shape_46,p:{x:736.225}},{t:this.shape_45,p:{x:744.425}},{t:this.shape_44,p:{x:258.125,y:110.525}},{t:this.shape_43},{t:this.shape_42,p:{x:276.425}},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34,p:{x:357.475,y:110.525}},{t:this.shape_33,p:{x:367.3}},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20,p:{x:506.775,y:110.725}},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17,p:{x:540.275}},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4,p:{x:682.875}},{t:this.shape_3,p:{x:692.475,y:110.725}},{t:this.shape_2,p:{x:701.775}},{t:this.shape_1},{t:this.shape,p:{x:719.775}},{t:this.btnMenuDasar1,p:{x:755.75,y:504.8}},{t:this.btnNextDasar1,p:{x:885.8,y:504.8}}]}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.judulKI_1},{t:this.shape_123},{t:this.shape_122},{t:this.shape_95,p:{x:241.975}},{t:this.shape_53,p:{x:251.675}},{t:this.shape_93,p:{x:261.775}},{t:this.shape_121},{t:this.shape_91,p:{x:285.375}},{t:this.shape_90,p:{x:295.225}},{t:this.shape_46,p:{x:302.975}},{t:this.shape_88,p:{x:311.175}},{t:this.shape_81,p:{x:325.725}},{t:this.shape_84,p:{x:335.575}},{t:this.shape_54,p:{x:344.075}},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_82,p:{x:374.675}},{t:this.shape_117},{t:this.shape_48,p:{x:389.275}},{t:this.shape_51,p:{x:397.975}},{t:this.shape_79,p:{x:405.675}},{t:this.shape_116},{t:this.shape_44,p:{x:430.375,y:84.925}},{t:this.shape_86,p:{x:437.625}},{t:this.shape_34,p:{x:445.275,y:84.925}},{t:this.shape_73,p:{x:454.975}},{t:this.shape_115},{t:this.shape_69,p:{x:482.275}},{t:this.shape_114},{t:this.shape_20,p:{x:499.275,y:85.125}},{t:this.shape_71,p:{x:508.575}},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_45,p:{x:576.025}},{t:this.shape_108},{t:this.shape_65,p:{x:595.475}},{t:this.shape_107},{t:this.shape_52,p:{x:622.925}},{t:this.shape_78,p:{x:630.325}},{t:this.shape_3,p:{x:639.925,y:85.125}},{t:this.shape_61,p:{x:649.225}},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_58,p:{x:698.525}},{t:this.shape_103},{t:this.shape_59,p:{x:718.625}},{t:this.shape_85,p:{x:725.825}},{t:this.shape_47,p:{x:733.025}},{t:this.shape_102},{t:this.shape_50,p:{x:755.825}},{t:this.shape_101},{t:this.shape_33,p:{x:456.3}},{t:this.shape_17,p:{x:466.375}},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_42,p:{x:504.725}},{t:this.shape_2,p:{x:512.425}},{t:this.shape_4,p:{x:522.275}},{t:this.shape,p:{x:530.925}},{t:this.btnNextDasar1,p:{x:878.8,y:508.25}},{t:this.btnMenuDasar1,p:{x:616.75,y:508.25}},{t:this.btnBack3}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(452,231,518,330);
// library properties:
lib.properties = {
	id: 'E740BB847DF4864B949C99CD86B71105',
	width: 960,
	height: 540,
	fps: 24,
	color: "#3498DB",
	opacity: 1.00,
	manifest: [
		{src:"images/_11.png?1595390343262", id:"_11"},
		{src:"images/_12.png?1595390343262", id:"_12"},
		{src:"images/_13.png?1595390343262", id:"_13"},
		{src:"images/_22.png?1595390343262", id:"_22"},
		{src:"images/_23.png?1595390343263", id:"_23"},
		{src:"images/_24.png?1595390343263", id:"_24"},
		{src:"images/_14.png?1595390343263", id:"_14"},
		{src:"images/Bitmap28.png?1595390343263", id:"Bitmap28"},
		{src:"images/Bitmap5.png?1595390343263", id:"Bitmap5"},
		{src:"images/bookpngcopy.png?1595390343263", id:"bookpngcopy"},
		{src:"images/_21.png?1595390343263", id:"_21"}
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