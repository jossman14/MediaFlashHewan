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



(lib.Bitmap28 = function() {
	this.initialize(img.Bitmap28);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,545);


(lib.bookpngcopy = function() {
	this.initialize(img.bookpngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,399);


(lib.Bitmap5 = function() {
	this.initialize(img.Bitmap5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);// helper functions:

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


(lib.gambarLapisan = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3867D6").s().p("A82E7Qg1AAAAgYIAApFQAAgXA1AAMA5tAAAQA1AAABAXIAAJFQgBAYg1AAg");
	this.shape.setTransform(-20.05,1.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.gambarLapisan, new cjs.Rectangle(-210.1,-30,380.1,62.9), null);


(lib.btnMenuKI = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#18B8C4").s().p("AhXBMIBNhMIhNhMIAygxIB9B9Ih9B+g");
	this.shape.setTransform(-43.2807,1.4233,0.533,0.533,-90);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#18B8C4").s().p("Ah6CSICRiSIiRiRIAygyIDCDDIjCDDg");
	this.shape_1.setTransform(-43.2807,-6.9042,0.533,0.533,-90);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7,p:{y:-3.875}},{t:this.shape_6,p:{y:-3.875}},{t:this.shape_5},{t:this.shape_4,p:{y:0.925}},{t:this.shape_3},{t:this.shape_2,p:{y:1.075}},{t:this.shape_1,p:{y:-6.9042}},{t:this.shape,p:{y:1.4233}}]}).to({state:[{t:this.shape_7,p:{y:-2.275}},{t:this.shape_11},{t:this.shape_6,p:{y:-2.275}},{t:this.shape_10},{t:this.shape_4,p:{y:2.525}},{t:this.shape_9},{t:this.shape_2,p:{y:2.675}},{t:this.shape_1,p:{y:-5.3042}},{t:this.shape,p:{y:3.0233}}]},1).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_4,p:{y:6.525}},{t:this.shape_12},{t:this.shape_2,p:{y:6.675}},{t:this.shape_1,p:{y:-1.3042}},{t:this.shape,p:{y:7.0233}}]},1).wait(2));

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
	this.shape.setTransform(-38.9395,-3.005,0.7124,0.7883,180);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#ED4F44").s().p("Ah3C3QgGgDAAgHIAAgiQAAgOAMgJICPhrQAEgEAAgFQAAgFgEgDIiPhsQgMgIAAgOIAAgiQAAgHAGgDQAHgDAFAEIDkCrQAFAEAAAGQAAAHgFAEIjkCrQgDACgEAAIgFgBg");
	this.shape_1.setTransform(-45.2268,-3.0247,0.7124,0.7883,180);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10,p:{y:-3.875}},{t:this.shape_9,p:{y:-3.875}},{t:this.shape_8},{t:this.shape_7,p:{y:0.925}},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{scaleX:0.7124,scaleY:0.7883,x:-45.2268,y:-3.0247}},{t:this.shape,p:{scaleX:0.7124,scaleY:0.7883,x:-38.9395,y:-3.005}}]}).to({state:[{t:this.shape_10,p:{y:-1.875}},{t:this.shape_18},{t:this.shape_9,p:{y:-1.875}},{t:this.shape_17},{t:this.shape_7,p:{y:2.925}},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_1,p:{scaleX:0.7119,scaleY:0.7878,x:-45.2205,y:-2.2154}},{t:this.shape,p:{scaleX:0.7119,scaleY:0.7878,x:-38.9376,y:-2.1957}}]},1).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_7,p:{y:6.425}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_1,p:{scaleX:0.7119,scaleY:0.7878,x:-45.2205,y:-0.2154}},{t:this.shape,p:{scaleX:0.7119,scaleY:0.7878,x:-38.9376,y:-0.1957}}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.4,-25.6,118.1,49);


(lib.bg1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0097E6").s().p("A82E7Qg1AAAAgYIAApFQAAgXA1AAMA5tAAAQA1AAABAXIAAJFQgBAYg1AAg");
	this.shape.setTransform(-20.05,1.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg1, new cjs.Rectangle(-210.1,-30,380.1,62.9), null);


// stage content:
(lib.materi6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{game1:0});

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
		 
		var _this = this
		
		_this.setup = function(){
			document.body.style.backgroundColor = lib.properties.color;
		}
		
		_this.setup();
		
		
		_this.stop();
		
		_this.btnMenuDasar1.on("click", function () {
		  window.location.replace("../menu/index.html");
		});
		
		_this.btnNextDasar1.on("click", function () {
		  window.location.replace("../game9/index.html");
		});
		
		_this.btnBack3.on("click", function () {
		  window.location.replace("../game8/index.html");
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// base
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgHAIQgDgDAAgFQAAgDADgEQACgDAFAAQAGAAACADQADAEAAADQAAAFgDADQgCADgGAAQgFAAgCgDg");
	this.shape.setTransform(355.025,412.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgYA2IAAhpIASAAIAAAMQAHgOAQAAQAGAAACACIAAAQIgIAAQgRAAgGAPIAABKg");
	this.shape_1.setTransform(349.65,407.925);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_2.setTransform(340.275,408.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgKAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgWAAQgTAAgGAQIAABMIgSAAIAAhpIARAAIAAAMQANgOATAAQAWAAAHARQAGgHAIgFQAJgFALAAQAjAAAAAlIAABGg");
	this.shape_3.setTransform(326.05,407.925);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_4.setTransform(312.125,408.025);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgfAoQgNgOABgZIAAgCQgBgQAGgMQAGgMAKgGQALgHANAAQASAAAMALQAMAKABARIgRAAQgCgKgGgGQgIgHgKAAQgMAAgIAKQgHAKAAATIAAACQAAASAHAKQAIAKAMAAQAKAAAIgGQAGgGACgJIARAAQgBAKgGAIQgGAIgJAFQgJAFgMAAQgUAAgNgPg");
	this.shape_5.setTransform(301.7,408.025);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_6.setTransform(290.825,407.925);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_7.setTransform(280.125,408.025);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABAMQALgOASAAQAUAAALAOQALAOAAAaIAAACQAAAXgLAPQgLAOgTAAQgSAAgMgMIAAAzgAgagrIAAAxQAJAOAQABQAMgBAIgJQAIgLAAgTQAAgSgIgLQgIgKgMAAQgQAAgJAPg");
	this.shape_8.setTransform(269.375,409.95);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_9.setTransform(253.075,407.925);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_10.setTransform(242.075,408.025);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgKgFgGQgFgGgLAAQgIABgGAEQgHAFgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgOASAAQAhAAABAkIAABGg");
	this.shape_11.setTransform(231.175,405.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_12.setTransform(220.175,408.025);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgNATAAQATAAALAOQALAOAAAZIAAABQAAAZgLAOQgLAPgTAAQgTAAgLgOgAgagBIAAAtQAJAQARAAQAMABAIgLQAHgKAAgTQAAgTgHgJQgHgLgNAAQgSAAgIARg");
	this.shape_13.setTransform(209.375,405.9);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_14.setTransform(193.425,408.025);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgMAAQgLAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgWAAQgTAAgGAQIAABMIgSAAIAAhpIARAAIABAMQALgOAUAAQAWAAAHARQAGgHAIgFQAIgFAMAAQAjAAAAAlIAABGg");
	this.shape_15.setTransform(179.25,407.925);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgVAyQgJgEgFgIQgGgIAAgKIASAAQABAJAGAGQAHAFAKAAQAKAAAHgEQAFgEAAgHQABgIgGgEQgFgEgNgDQgOgDgIgDQgIgEgDgFQgEgGgBgIQAAgNAMgJQAKgJARAAQARAAAMAJQALAKAAAOIgTAAQAAgHgFgGQgHgFgJAAQgKAAgFAEQgGAFAAAHQABAGAFADQAFAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgKgFg");
	this.shape_16.setTransform(165.35,408.025);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgIBIIAAhpIARAAIAABpgAgHg1QgCgEAAgDQAAgFACgDQADgDAEAAQAFAAADADQACADAAAFQAAADgCAEQgDACgFAAQgEAAgDgCg");
	this.shape_17.setTransform(157.8,406.1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_18.setTransform(152.925,405.8);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AghAoQgOgPAAgZIAAAAQAAgQAGgMQAGgMALgHQALgHANAAQAVAAAOAPQANAPAAAYIAAABQAAAQgGAMQgGAMgLAHQgLAHgOAAQgVAAgMgPgAgVgcQgIAKAAATQAAASAIAKQAJALAMAAQAOAAAIgLQAIgLAAgSQAAgRgIgLQgIgLgOAAQgMAAgJALg");
	this.shape_19.setTransform(144.8,408.025);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgNATAAQATAAALAOQALAOAAAZIAAABQAAAZgLAOQgLAPgTAAQgTAAgLgOgAgagBIAAAtQAJAQARAAQAMABAIgLQAHgKAAgTQAAgTgHgJQgHgLgNAAQgSAAgIARg");
	this.shape_20.setTransform(133.725,405.9);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_21.setTransform(122.425,408.025);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMABgFgIg");
	this.shape_22.setTransform(113.425,406.85);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_23.setTransform(105.275,408.025);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgJAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgXAAQgSAAgGAQIAABMIgSAAIAAhpIARAAIAAAMQAMgOAUAAQAWAAAHARQAGgHAIgFQAJgFALAAQAiAAABAlIAABGg");
	this.shape_24.setTransform(91.1,407.925);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg2QgCgDAAgDQAAgFACgDQACgDAFAAQAFAAADADQACADAAAFQAAADgCADQgDAEgFAAQgFAAgCgEg");
	this.shape_25.setTransform(874.5,377.1);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_26.setTransform(866.575,379.025);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgVBGQgMgFgGgJIAKgKQALAOARAAQAMAAAIgHQAIgIgBgOIAAgJQgLANgRAAQgTAAgLgPQgMgPAAgYQAAgZAMgPQALgOATAAQATAAAKANIABgLIAQAAIAABlQAAAVgMAMQgMALgUAAQgKAAgLgEgAgSgwQgIAKAAAVQAAARAIAKQAHAKANgBQARAAAHgPIAAgvQgIgQgQAAQgNAAgHALg");
	this.shape_27.setTransform(855.35,381);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_28.setTransform(844.475,379.025);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgNATAAQATAAALAOQALAOAAAZIAAACQAAAYgLAOQgLAPgTAAQgTAAgLgOgAgagBIAAAtQAJAQARAAQAMABAIgKQAHgLAAgTQAAgTgHgJQgHgLgNAAQgSABgIAQg");
	this.shape_29.setTransform(833.675,376.9);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_30.setTransform(822.675,379.025);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgVAyQgJgEgGgIQgFgIAAgKIASAAQAAAJAHAGQAHAFAKAAQALAAAFgEQAHgEgBgHQAAgIgFgEQgGgEgMgDQgOgDgIgDQgIgEgDgFQgFgGAAgIQABgNAKgJQALgJAQAAQATAAALAJQALAKAAAOIgSAAQAAgHgHgGQgGgFgKAAQgIAAgGAEQgFAFgBAHQAAAGAGADQAFAEANADQANADAIAEQAJADAEAGQAEAGAAAIQAAAPgLAIQgMAJgSAAQgLAAgLgFg");
	this.shape_31.setTransform(812.15,379.025);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_32.setTransform(790.625,378.925);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_33.setTransform(779.625,379.025);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AggAsQgIgKgBgTIAAhEIASAAIAABDQABAYATAAQAUAAAHgPIAAhMIASAAIAABpIgRAAIgBgLQgLANgTAAQgRAAgJgKg");
	this.shape_34.setTransform(768.65,379.125);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABAMQALgOASAAQAUAAALAOQALAPAAAZIAAACQAAAXgLAPQgLAPgTgBQgSAAgMgMIAAAzgAgagrIAAAyQAJAOAQAAQAMAAAIgLQAIgKAAgTQAAgSgIgKQgIgLgMAAQgQAAgJAPg");
	this.shape_35.setTransform(757.775,380.95);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgJAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgXAAQgSAAgGAQIAABMIgSAAIAAhpIARAAIAAAMQAMgOAUAAQAWAAAHARQAGgHAIgFQAJgFALAAQAiAAABAlIAABGg");
	this.shape_36.setTransform(743.15,378.925);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_37.setTransform(728.925,379.025);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgJAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgXAAQgSAAgGAQIAABMIgSAAIAAhpIARAAIAAAMQANgOATAAQAWAAAHARQAGgHAIgFQAJgFALAAQAiAAABAlIAABGg");
	this.shape_38.setTransform(714.7,378.925);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_39.setTransform(700.775,379.025);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgMAMIAAAlIgSAAIAAiVIASAAIAABaIAKgMIAgghIAWAAIgoArIAsA9g");
	this.shape_40.setTransform(691,376.8);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg2QgCgDAAgDQAAgFACgDQACgDAFAAQAFAAADADQACADAAAFQAAADgCADQgDAEgFAAQgFAAgCgEg");
	this.shape_41.setTransform(672,377.1);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_42.setTransform(664.075,379.025);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgfBKIgHgBIAAgPIAFABQAJgBAGgDQAEgEAEgKIAEgKIgmhoIAUAAIAZBOIAZhOIATAAIgrB5QgIAagVAAg");
	this.shape_43.setTransform(653.9,381.15);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_44.setTransform(643.675,378.925);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgfAsQgKgKABgTIAAhEIASAAIAABDQAAAYATAAQATAAAIgPIAAhMIARAAIAABpIgRAAIAAgLQgKANgUAAQgRAAgIgKg");
	this.shape_45.setTransform(632.6,379.125);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABAMQALgOASAAQAUAAALAOQALAPAAAZIAAACQAAAXgLAPQgLAPgTgBQgSAAgMgMIAAAzgAgagrIAAAyQAJAOAQAAQAMAAAIgLQAIgKAAgTQAAgSgIgKQgIgLgMAAQgQAAgJAPg");
	this.shape_46.setTransform(621.725,380.95);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgMAAQgKAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgWAAQgTAAgGAQIAABMIgSAAIAAhpIARAAIABAMQALgOAUAAQAWAAAHARQAGgHAIgFQAIgFAMAAQAiAAABAlIAABGg");
	this.shape_47.setTransform(607.1,378.925);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_48.setTransform(593.175,379.025);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgMAAQgKAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgXAAQgRAAgHAQIAABMIgSAAIAAhpIARAAIABAMQALgOAUAAQAWAAAHARQAGgHAIgFQAJgFALAAQAiAAABAlIAABGg");
	this.shape_49.setTransform(579,378.925);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMAAgFgHg");
	this.shape_50.setTransform(555.825,377.85);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AggAsQgJgKAAgTIAAhEIATAAIAABDQgBAYAUAAQAUAAAGgPIAAhMIASAAIAABpIgRAAIAAgLQgKANgUAAQgRAAgJgKg");
	this.shape_51.setTransform(547.3,379.125);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_52.setTransform(536.325,379.025);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_53.setTransform(528.475,376.8);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg2QgCgDgBgDQABgFACgDQACgDAFAAQAFAAADADQACADAAAFQAAADgCADQgDAEgFAAQgFAAgCgEg");
	this.shape_54.setTransform(512.8,377.1);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AggA9QgMgPABgYIAAgBQgBgYAMgPQALgOATAAQASAAAKAMIAAg3IASAAIAACVIgQAAIgBgMQgLAOgSAAQgTAAgLgPgAgSgHQgIAJABAVQgBARAIALQAHAKANgBQARAAAHgPIAAgvQgHgPgRgBQgNAAgHALg");
	this.shape_55.setTransform(504.45,376.9);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_56.setTransform(482.725,379.025);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgfBKIgHgBIAAgPIAFABQAJgBAGgDQAEgEAEgKIAEgKIgmhoIAUAAIAZBOIAZhOIATAAIgrB5QgIAagVAAg");
	this.shape_57.setTransform(472.55,381.15);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_58.setTransform(462.325,378.925);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMAAgFgHg");
	this.shape_59.setTransform(453.225,377.85);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_60.setTransform(444.775,379.025);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMAAgFgHg");
	this.shape_61.setTransform(435.775,377.85);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgIBIIAAhoIARAAIAABogAgHg2QgCgDAAgDQAAgFACgDQADgDAEAAQAFAAADADQACADABAFQgBADgCADQgDAEgFAAQgEAAgDgEg");
	this.shape_62.setTransform(430.4,377.1);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgNATAAQATAAALAOQALAOAAAZIAAACQAAAYgLAOQgLAPgTAAQgTAAgLgOgAgagBIAAAtQAJAQARAAQAMABAIgKQAHgLAAgTQAAgTgHgJQgHgLgNAAQgSABgIAQg");
	this.shape_63.setTransform(422.575,376.9);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_64.setTransform(411.275,379.025);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgKgFgGQgFgFgLgBQgIAAgGAGQgHAEgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgOASAAQAhgBABAlIAABGg");
	this.shape_65.setTransform(400.375,376.8);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgWBGQgKgFgHgJIAKgKQALAOASAAQALAAAIgHQAIgIAAgOIAAgJQgMANgRAAQgTAAgLgPQgLgPAAgYQAAgZALgPQALgOATAAQASAAAMANIAAgLIARAAIAABlQAAAVgNAMQgMALgUAAQgLAAgLgEgAgSgwQgHAKAAAVQAAARAHAKQAHAKANgBQAQAAAJgPIAAgvQgJgQgQAAQgMAAgIALg");
	this.shape_66.setTransform(378.2,381);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_67.setTransform(367.275,378.925);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_68.setTransform(356.275,379.025);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgfBKIgHgBIAAgPIAFABQAJgBAGgDQAEgEAEgKIAEgKIgmhoIAUAAIAZBOIAZhOIATAAIgrB5QgIAagVAAg");
	this.shape_69.setTransform(346.1,381.15);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgFgIQgGgIAAgKIASAAQAAAJAHAGQAHAFAKAAQAKAAAGgEQAGgEABgHQAAgIgGgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgDgGAAgIQgBgNALgJQAMgJAPAAQATAAAKAJQAMAKAAAOIgSAAQgBgHgFgGQgHgFgKAAQgJAAgFAEQgGAFABAHQAAAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgJgFg");
	this.shape_70.setTransform(325.4,379.025);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_71.setTransform(315.075,379.025);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgIBIIAAhoIARAAIAABogAgHg2QgDgDABgDQgBgFADgDQADgDAEAAQAFAAADADQADADgBAFQABADgDADQgDAEgFAAQgEAAgDgEg");
	this.shape_72.setTransform(307.3,377.1);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgVAyQgJgEgGgIQgFgIAAgKIASAAQABAJAGAGQAHAFAKAAQALAAAFgEQAHgEgBgHQAAgIgFgEQgFgEgNgDQgOgDgIgDQgIgEgDgFQgFgGAAgIQABgNAKgJQALgJARAAQARAAAMAJQALAKAAAOIgTAAQABgHgHgGQgGgFgJAAQgJAAgGAEQgFAFgBAHQAAAGAGADQAFAEANADQANADAIAEQAJADAEAGQAEAGAAAIQAAAPgLAIQgMAJgSAAQgLAAgLgFg");
	this.shape_73.setTransform(299.7,379.025);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_74.setTransform(289.375,379.025);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABAMQALgOASAAQAUAAALAOQALAPAAAZIAAACQAAAXgLAPQgLAPgTgBQgSAAgMgMIAAAzgAgagrIAAAyQAJAOAQAAQAMAAAIgLQAIgKAAgTQAAgSgIgKQgIgLgMAAQgQAAgJAPg");
	this.shape_75.setTransform(278.625,380.95);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgGgIQgFgIAAgKIASAAQABAJAGAGQAHAFAKAAQALAAAFgEQAHgEAAgHQgBgIgFgEQgGgEgMgDQgOgDgIgDQgIgEgDgFQgFgGAAgIQABgNAKgJQALgJAQAAQATAAALAJQALAKAAAOIgSAAQAAgHgHgGQgGgFgKAAQgIAAgGAEQgFAFgBAHQAAAGAGADQAFAEANADQANADAIAEQAJADAEAGQAEAGAAAIQAAAPgLAIQgMAJgSAAQgLAAgKgFg");
	this.shape_76.setTransform(267.65,379.025);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgMASQAIgNABgNIAAgQIARAAIAAAOQAAAKgFAJQgFAKgGAGg");
	this.shape_77.setTransform(249.35,384.65);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_78.setTransform(242.175,378.925);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_79.setTransform(231.175,379.025);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AAWBLIgkgxIgLAMIAAAlIgSAAIAAiVIASAAIAABaIAKgMIAgghIAWAAIgoArIAtA9g");
	this.shape_80.setTransform(221.35,376.8);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgWBGQgKgFgHgJIAKgKQAMAOAQAAQANAAAHgHQAIgIAAgOIAAgJQgMANgRAAQgTAAgLgPQgLgPAAgYQAAgZALgPQALgOATAAQASAAAMANIAAgLIARAAIAABlQAAAVgNAMQgLALgVAAQgLAAgLgEgAgSgwQgIAKABAVQgBARAIAKQAHAKANgBQAQAAAJgPIAAgvQgJgQgQAAQgMAAgIALg");
	this.shape_81.setTransform(209.8,381);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_82.setTransform(198.875,378.925);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_83.setTransform(187.875,379.025);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AggA9QgMgPAAgYIAAgBQAAgYAMgPQAMgOASAAQASAAAKAMIAAg3IASAAIAACVIgQAAIgBgMQgLAOgSAAQgSAAgMgPgAgSgHQgIAJAAAVQAAARAIALQAHAKAMgBQASAAAHgPIAAgvQgHgPgSgBQgMAAgHALg");
	this.shape_84.setTransform(176.55,376.9);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_85.setTransform(165.975,379.025);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgYBDQgNgFgHgKQgGgKgBgMIATAAQAAAMAJAIQAKAHAPAAQAPABAIgHQAIgFAAgLQAAgKgHgGQgIgGgSgGQgYgHgLgIQgLgKAAgPQAAgRANgLQANgLAVAAQAPAAAMAFQALAGAGAKQAHAKAAAMIgTAAQgBgNgHgIQgJgHgPAAQgNAAgHAHQgIAFAAALQAAAJAHAGQAIAGAQAFQASAFAKAFQAKAGAFAIQAFAIAAALQAAARgOALQgOAKgWAAQgNAAgNgGg");
	this.shape_86.setTransform(154.75,377.2);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AgHAIQgDgDAAgFQAAgDADgEQACgDAFAAQAGAAACADQADAEAAADQAAAFgDADQgCADgGAAQgFAAgCgDg");
	this.shape_87.setTransform(135.275,383.325);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgKgFgGQgFgFgLgBQgIAAgGAGQgHAEgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgOASAAQAhgBABAlIAABGg");
	this.shape_88.setTransform(127.275,376.8);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_89.setTransform(116.275,379.025);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_90.setTransform(105.325,378.925);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_91.setTransform(94.325,379.025);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMAAgFgHg");
	this.shape_92.setTransform(85.325,377.85);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_93.setTransform(871.725,349.925);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_94.setTransform(860.725,350.025);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAPAAQAGAAACACIAAAQIgIAAQgRAAgHAPIAABKg");
	this.shape_95.setTransform(852.45,349.925);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgfAsQgJgKAAgTIAAhEIASAAIAABDQAAAYATAAQAUAAAHgPIAAhMIASAAIAABpIgRAAIgBgLQgKANgUAAQgRAAgIgKg");
	this.shape_96.setTransform(843,350.125);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgOATAAQATAAALAPQALAPAAAYIAAACQAAAXgLAQQgLAOgTAAQgTAAgLgOgAgaAAIAAAsQAJARARAAQAMgBAIgJQAHgKAAgVQAAgSgHgJQgHgLgNAAQgSABgIARg");
	this.shape_97.setTransform(832.125,347.9);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AggAsQgIgKgBgTIAAhEIASAAIAABDQABAYATAAQAUAAAHgPIAAhMIASAAIAABpIgRAAIgBgLQgLANgTAAQgRAAgJgKg");
	this.shape_98.setTransform(820.75,350.125);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AgVAyQgJgEgFgIQgGgIAAgKIASAAQABAJAGAGQAHAFAKAAQAKAAAHgEQAFgEAAgHQAAgIgFgEQgFgEgNgDQgOgDgIgDQgIgEgDgFQgFgGAAgIQAAgNAMgJQAKgJARAAQARAAAMAJQALAKAAAOIgTAAQABgHgHgGQgGgFgJAAQgJAAgGAEQgGAFAAAHQABAGAFADQAFAEANADQANADAIAEQAJADAEAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgKgFg");
	this.shape_99.setTransform(810.1,350.025);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_100.setTransform(799.775,350.025);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgMAMIAAAlIgSAAIAAiVIASAAIAABaIAKgMIAgghIAWAAIgoAqIAsA+g");
	this.shape_101.setTransform(790,347.8);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_102.setTransform(769.375,349.925);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_103.setTransform(758.375,350.025);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AAWBLIgkgxIgKAMIAAAlIgSAAIAAiVIASAAIAABaIAJgMIAgghIAWAAIgoAqIAtA+g");
	this.shape_104.setTransform(748.55,347.8);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAPQgHABgHAAQgMAAgFgHg");
	this.shape_105.setTransform(739.225,348.85);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_106.setTransform(730.775,350.025);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AAXBLIglgxIgLAMIAAAlIgSAAIAAiVIASAAIAABaIAKgMIAgghIAWAAIgoAqIAtA+g");
	this.shape_107.setTransform(720.95,347.8);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgWBFQgLgEgGgIIAKgLQALAOASAAQALAAAIgIQAIgHAAgOIAAgJQgMANgRAAQgTAAgLgPQgLgPAAgZQAAgYALgPQALgPATAAQASAAAMAOIAAgLIARAAIAABlQAAAVgNAMQgLAMgVAAQgLAAgLgGgAgSgwQgHAKAAAVQAAARAHAKQAHAJANABQAQAAAJgQIAAgvQgJgQgQAAQgMAAgIALg");
	this.shape_108.setTransform(709.4,352);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_109.setTransform(698.475,349.925);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg2QgCgCgBgFQABgEACgDQACgDAFAAQAFAAADADQACADAAAEQAAAFgCACQgDADgFABQgFgBgCgDg");
	this.shape_110.setTransform(690.55,348.1);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_111.setTransform(682.575,349.925);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_112.setTransform(671.875,350.025);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgKAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgWAAQgTAAgGAQIAABMIgSAAIAAhpIARAAIAAAMQANgOATAAQAWAAAHARQAGgHAIgFQAJgFALAAQAjAAAAAlIAABGg");
	this.shape_113.setTransform(657.7,349.925);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgMAMIAAAlIgSAAIAAiVIASAAIAABaIAKgMIAgghIAWAAIgoAqIAsA+g");
	this.shape_114.setTransform(635.2,347.8);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AggAsQgJgKAAgTIAAhEIASAAIAABDQAAAYAUAAQATAAAHgPIAAhMIASAAIAABpIgRAAIAAgLQgKANgUAAQgRAAgJgKg");
	this.shape_115.setTransform(623.9,350.125);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAPQgHABgHAAQgMAAgFgHg");
	this.shape_116.setTransform(614.825,348.85);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_117.setTransform(606.325,349.925);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AgfAsQgKgKABgTIAAhEIASAAIAABDQAAAYATAAQATAAAHgPIAAhMIASAAIAABpIgRAAIAAgLQgKANgUAAQgRAAgIgKg");
	this.shape_118.setTransform(595.25,350.125);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_119.setTransform(574.925,350.025);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_120.setTransform(563.975,349.925);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AggAsQgIgKgBgTIAAhEIASAAIAABDQAAAYAUAAQATAAAHgPIAAhMIASAAIAABpIgQAAIgBgLQgLANgTAAQgRAAgJgKg");
	this.shape_121.setTransform(552.9,350.125);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AgVBFQgMgEgFgIIAJgLQAMAOAQAAQAMAAAIgIQAHgHAAgOIAAgJQgKANgSAAQgSAAgMgPQgMgPAAgZQAAgYAMgPQALgPATAAQASAAALAOIABgLIAQAAIAABlQABAVgMAMQgNAMgUAAQgKAAgLgGgAgSgwQgIAKAAAVQAAARAIAKQAHAJAMABQASAAAHgQIAAgvQgIgQgRAAQgMAAgHALg");
	this.shape_122.setTransform(541.6,352);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AgYA2IAAhpIASAAIAAAMQAHgOARAAQAFAAACACIAAAQIgIAAQgRAAgGAPIAABKg");
	this.shape_123.setTransform(533.35,349.925);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_124.setTransform(524.275,350.025);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgOATAAQATAAALAPQALAPAAAYIAAACQAAAXgLAQQgLAOgTAAQgTAAgLgOgAgaAAIAAAsQAJARARAAQAMgBAIgJQAHgKAAgVQAAgSgHgJQgHgLgNAAQgSABgIARg");
	this.shape_125.setTransform(513.525,347.9);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AgVBFQgMgEgFgIIAJgLQAMAOAQAAQAMAAAIgIQAHgHAAgOIAAgJQgLANgRAAQgSAAgMgPQgMgPAAgZQAAgYAMgPQALgPATAAQATAAAKAOIABgLIAQAAIAABlQABAVgMAMQgNAMgUAAQgKAAgLgGgAgSgwQgIAKAAAVQAAARAIAKQAHAJAMABQASAAAHgQIAAgvQgIgQgRAAQgMAAgHALg");
	this.shape_126.setTransform(492.55,352);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_127.setTransform(481.625,349.925);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_128.setTransform(470.625,350.025);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AgfBKIgHgCIAAgOIAFABQAKAAAEgFQAGgDADgKIAEgKIgmhoIAUAAIAZBOIAZhOIATAAIgqB5QgJAagWAAg");
	this.shape_129.setTransform(460.45,352.15);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AAWBLIgkgxIgKAMIAAAlIgSAAIAAiVIASAAIAABaIAJgMIAgghIAWAAIgoAqIAsA+g");
	this.shape_130.setTransform(442,347.8);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg2QgDgCABgFQgBgEADgDQACgDAFAAQAFAAADADQADADgBAEQABAFgDACQgDADgFABQgFgBgCgDg");
	this.shape_131.setTransform(433.85,348.1);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_132.setTransform(425.875,349.925);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_133.setTransform(414.875,350.025);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("AgWBFQgKgEgHgIIAKgLQALAOARAAQANAAAHgIQAIgHgBgOIAAgJQgKANgSAAQgTAAgLgPQgMgPABgZQgBgYAMgPQALgPATAAQASAAAMAOIAAgLIAQAAIAABlQAAAVgMAMQgLAMgVAAQgKAAgMgGgAgSgwQgIAKABAVQgBARAIAKQAHAJANABQARAAAHgQIAAgvQgIgQgQAAQgNAAgHALg");
	this.shape_134.setTransform(403.65,352);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("AgYA2IAAhpIARAAIAAAMQAJgOAQAAQAFAAADACIAAAQIgJAAQgRAAgHAPIAABKg");
	this.shape_135.setTransform(395.4,349.925);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("AgiAoQgNgPAAgZIAAAAQAAgQAGgMQAGgMALgHQALgHANAAQAVAAAOAPQANAPAAAYIAAABQAAAQgGAMQgFAMgLAHQgMAHgOAAQgVAAgNgPgAgUgcQgJAKAAATQAAASAJAKQAHALANAAQAOAAAIgLQAIgLAAgSQAAgRgIgLQgJgLgNAAQgNAAgHALg");
	this.shape_136.setTransform(385.8,350.025);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_137.setTransform(365.225,349.925);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_138.setTransform(354.225,350.025);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgKgFgGQgFgFgLgBQgIAAgGAGQgHAEgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgPASAAQAhAAABAlIAABGg");
	this.shape_139.setTransform(343.325,347.8);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_140.setTransform(332.325,350.025);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgOATAAQATAAALAPQALAPAAAYIAAACQAAAXgLAQQgLAOgTAAQgTAAgLgOgAgaAAIAAAsQAJARARAAQAMgBAIgJQAHgKAAgVQAAgSgHgJQgHgLgNAAQgSABgIARg");
	this.shape_141.setTransform(321.525,347.9);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("AgIBIIAAhoIARAAIAABogAgHg2QgCgCAAgFQAAgEACgDQACgDAFAAQAFAAADADQACADABAEQgBAFgCACQgDADgFABQgEgBgDgDg");
	this.shape_142.setTransform(303.95,348.1);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("AggA9QgMgPAAgZIAAgBQAAgXAMgPQAMgPASAAQARAAAMANIAAg3IASAAIAACVIgRAAIgBgMQgLAOgSAAQgSAAgMgPgAgSgHQgHAJgBAVQABARAHALQAHAJAMABQARAAAJgQIAAgvQgJgPgRgBQgMAAgHALg");
	this.shape_143.setTransform(295.6,347.9);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_144.setTransform(284.725,350.025);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("AgTBcIAAgPIAIABQAHAAACgDQADgDAAgJIAAh1IASAAIAAB1QAAAegbAAQgGAAgFgBgAAChLQgCgDAAgEQAAgEACgDQACgDAGAAQAEAAADADQADADAAAEQAAAEgDADQgDADgEAAQgGAAgCgDg");
	this.shape_145.setTransform(275.85,350.225);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_146.setTransform(268.975,349.925);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_147.setTransform(258.275,350.025);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgJAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgXAAQgSAAgGAQIAABMIgSAAIAAhpIARAAIAAAMQAMgOAUAAQAWAAAHARQAGgHAIgFQAJgFALAAQAiAAABAlIAABGg");
	this.shape_148.setTransform(244.1,349.925);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_149.setTransform(220.525,350.025);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("AgfBKIgHgCIAAgOIAFABQAJAAAGgFQAFgDADgKIAEgKIgmhoIAUAAIAZBOIAZhOIATAAIgrB5QgIAagVAAg");
	this.shape_150.setTransform(210.35,352.15);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_151.setTransform(200.125,349.925);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgKgFgGQgFgFgLgBQgIAAgGAGQgHAEgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgPASAAQAhAAABAlIAABGg");
	this.shape_152.setTransform(189.125,347.8);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_153.setTransform(178.125,350.025);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgOATAAQATAAALAPQALAPAAAYIAAACQAAAXgLAQQgLAOgTAAQgTAAgLgOgAgaAAIAAAsQAJARARAAQAMgBAIgJQAHgKAAgVQAAgSgHgJQgHgLgNAAQgSABgIARg");
	this.shape_154.setTransform(167.325,347.9);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("AgfAsQgJgKAAgTIAAhEIASAAIAABDQAAAYATAAQATAAAIgPIAAhMIASAAIAABpIgSAAIAAgLQgKANgUAAQgRAAgIgKg");
	this.shape_155.setTransform(155.95,350.125);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg2QgDgCAAgFQAAgEADgDQADgDAEAAQAFAAADADQADADAAAEQAAAFgDACQgDADgFABQgEgBgDgDg");
	this.shape_156.setTransform(148.05,348.1);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("AggA9QgLgPAAgZIAAgBQAAgXALgPQALgPATAAQARAAAMANIAAg3IASAAIAACVIgRAAIgBgMQgLAOgSAAQgTAAgLgPgAgSgHQgHAJAAAVQAAARAHALQAHAJANABQAQAAAJgQIAAgvQgJgPgQgBQgNAAgHALg");
	this.shape_157.setTransform(139.7,347.9);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FFFFFF").s().p("AgVBFQgMgEgGgIIAKgLQALAOARAAQAMAAAIgIQAIgHgBgOIAAgJQgKANgSAAQgTAAgLgPQgMgPAAgZQAAgYAMgPQALgPATAAQATAAAKAOIABgLIAQAAIAABlQAAAVgLAMQgNAMgUAAQgKAAgLgGgAgSgwQgIAKAAAVQAAARAIAKQAHAJANABQARAAAHgQIAAgvQgIgQgQAAQgNAAgHALg");
	this.shape_158.setTransform(119.15,352);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_159.setTransform(108.225,349.925);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_160.setTransform(97.225,350.025);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FFFFFF").s().p("AgfBKIgHgCIAAgOIAFABQAJAAAGgFQAFgDADgKIAEgKIgmhoIAUAAIAZBOIAZhOIATAAIgrB5QgIAagVAAg");
	this.shape_161.setTransform(87.05,352.15);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_162.setTransform(871.675,321.025);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FFFFFF").s().p("AgVBFQgMgEgFgIIAJgMQAMAPARAAQALAAAIgIQAHgHAAgNIAAgJQgKAMgSAAQgSAAgMgPQgMgPAAgZQAAgZAMgOQALgPATAAQATAAAKAOIABgMIAQAAIAABnQABAUgMAMQgNAMgUAAQgLgBgKgFgAgSgwQgHAKgBAUQABASAHAJQAHALAMAAQARgBAIgPIAAgvQgIgPgRAAQgMAAgHAKg");
	this.shape_163.setTransform(860.45,323);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#FFFFFF").s().p("AgWBFQgKgEgHgIIAKgMQAMAPAQAAQANAAAHgIQAIgHAAgNIAAgJQgMAMgRAAQgTAAgLgPQgLgPAAgZQAAgZALgOQALgPATAAQASAAAMAOIAAgMIARAAIAABnQAAAUgNAMQgLAMgVAAQgLgBgLgFgAgSgwQgIAKABAUQgBASAIAJQAHALANAAQAQgBAJgPIAAgvQgJgPgQAAQgMAAgIAKg");
	this.shape_164.setTransform(849.25,323);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_165.setTransform(838.325,320.925);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_166.setTransform(827.325,321.025);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAPQgHACgHAAQgMAAgFgIg");
	this.shape_167.setTransform(818.325,319.85);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgLgFgFQgFgGgLABQgIAAgGAEQgHAFgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgPASAAQAhAAABAlIAABGg");
	this.shape_168.setTransform(800.425,318.8);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_169.setTransform(789.425,321.025);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgMAAQgKAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgXAAQgRAAgHAQIAABMIgSAAIAAhpIARAAIABAMQALgOAUAAQAWAAAHARQAGgHAIgFQAJgFALAAQAiAAABAlIAABGg");
	this.shape_170.setTransform(775.2,320.925);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FFFFFF").s().p("AggAsQgIgKgBgTIAAhEIASAAIAABDQABAYATAAQATAAAIgPIAAhMIASAAIAABpIgRAAIgBgLQgLANgTAAQgRAAgJgKg");
	this.shape_171.setTransform(760.9,321.125);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAPAAQAGAAACACIAAAQIgIAAQgRAAgHAPIAABKg");
	this.shape_172.setTransform(752.55,320.925);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgLgFgFQgFgGgLABQgIAAgGAEQgHAFgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgPASAAQAhAAABAlIAABGg");
	this.shape_173.setTransform(733.725,318.8);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_174.setTransform(722.725,321.025);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgOATAAQATAAALAPQALAOAAAZIAAABQAAAZgLAPQgLAOgTAAQgTAAgLgOgAgaAAIAAAsQAJAQARABQAMAAAIgLQAHgJAAgVQAAgSgHgJQgHgKgNAAQgSgBgIASg");
	this.shape_175.setTransform(711.925,318.9);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgKAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgWAAQgTAAgGAQIAABMIgSAAIAAhpIARAAIAAAMQANgOATAAQAWAAAHARQAGgHAIgFQAIgFAMAAQAjAAAAAlIAABGg");
	this.shape_176.setTransform(697.3,320.925);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg2QgCgCgBgFQABgEACgDQACgDAFAAQAFAAADADQADADAAAEQAAAFgDACQgDADgFAAQgFAAgCgDg");
	this.shape_177.setTransform(686.15,319.1);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_178.setTransform(681.275,318.8);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#FFFFFF").s().p("AggAsQgJgKABgTIAAhEIARAAIAABDQAAAYAUAAQAUAAAGgPIAAhMIASAAIAABpIgRAAIAAgLQgKANgUAAQgRAAgJgKg");
	this.shape_179.setTransform(663.85,321.125);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_180.setTransform(652.875,321.025);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAPQgHACgHAAQgMAAgFgIg");
	this.shape_181.setTransform(643.875,319.85);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_182.setTransform(635.425,321.025);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#FFFFFF").s().p("AgNASQAKgNAAgNIAAgQIAQAAIAAAPQABAJgFAJQgFAKgGAGg");
	this.shape_183.setTransform(618.25,326.65);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#FFFFFF").s().p("AAWBLIgkgxIgKAMIAAAlIgSAAIAAiVIASAAIAABZIAJgLIAggiIAWAAIgoArIAtA+g");
	this.shape_184.setTransform(612.2,318.8);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_185.setTransform(600.975,321.025);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_186.setTransform(590.025,320.925);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAPAAQAGAAACACIAAAQIgIAAQgRAAgHAPIAABKg");
	this.shape_187.setTransform(581.65,320.925);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_188.setTransform(572.575,321.025);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAPQgHACgHAAQgMAAgFgIg");
	this.shape_189.setTransform(563.625,319.85);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgLgFgFQgFgGgLABQgIAAgGAEQgHAFgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgPASAAQAhAAABAlIAABGg");
	this.shape_190.setTransform(545.725,318.8);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_191.setTransform(534.725,321.025);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgOATAAQATAAALAPQALAOAAAZIAAABQAAAZgLAPQgLAOgTAAQgTAAgLgOgAgaAAIAAAsQAJAQARABQAMAAAIgLQAHgJAAgVQAAgSgHgJQgHgKgNAAQgSgBgIASg");
	this.shape_192.setTransform(523.925,318.9);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgKAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgWAAQgSAAgHAQIAABMIgSAAIAAhpIARAAIAAAMQANgOATAAQAWAAAHARQAFgHAJgFQAJgFALAAQAjAAAAAlIAABGg");
	this.shape_193.setTransform(509.3,320.925);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg2QgDgCAAgFQAAgEADgDQADgDAEAAQAFAAADADQADADAAAEQAAAFgDACQgDADgFAAQgEAAgDgDg");
	this.shape_194.setTransform(498.15,319.1);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_195.setTransform(493.275,318.8);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgLAMIAAAlIgSAAIAAiVIASAAIAABZIAJgLIAggiIAWAAIgoArIAsA+g");
	this.shape_196.setTransform(477,318.8);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#FFFFFF").s().p("AgIBIIAAhpIARAAIAABpgAgHg2QgDgCABgFQgBgEADgDQADgDAEAAQAFAAADADQACADAAAEQABAFgDACQgDADgFAAQgEAAgDgDg");
	this.shape_197.setTransform(468.85,319.1);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_198.setTransform(460.875,320.925);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_199.setTransform(449.875,321.025);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#FFFFFF").s().p("AgVBFQgMgEgGgIIAKgMQALAPARAAQAMAAAIgIQAIgHgBgNIAAgJQgLAMgRAAQgTAAgLgPQgMgPAAgZQAAgZAMgOQALgPATAAQATAAAKAOIABgMIAQAAIAABnQAAAUgMAMQgMAMgUAAQgKgBgLgFgAgSgwQgIAKAAAUQAAASAIAJQAHALANAAQARgBAHgPIAAgvQgIgPgQAAQgNAAgHAKg");
	this.shape_200.setTransform(438.65,323);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#FFFFFF").s().p("AgYA2IAAhpIASAAIAAAMQAHgOARAAQAFAAADACIAAAQIgJAAQgRAAgGAPIAABKg");
	this.shape_201.setTransform(430.4,320.925);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#FFFFFF").s().p("AgiAoQgNgPAAgZIAAAAQAAgQAGgMQAGgMALgHQALgHANAAQAVAAAOAPQANAPAAAYIAAABQAAAQgGAMQgFAMgLAHQgLAHgPAAQgVAAgNgPgAgUgcQgJAKAAATQAAASAJAKQAHALANAAQAOAAAIgLQAIgLAAgSQAAgRgIgLQgJgLgNAAQgNAAgHALg");
	this.shape_202.setTransform(420.8,321.025);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_203.setTransform(400.125,320.925);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_204.setTransform(389.125,321.025);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgLgFgFQgFgGgLABQgIAAgGAEQgHAFgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgPASAAQAhAAABAlIAABGg");
	this.shape_205.setTransform(378.225,318.8);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_206.setTransform(367.225,321.025);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgOATAAQATAAALAPQALAOAAAZIAAABQAAAZgLAPQgLAOgTAAQgTAAgLgOgAgaAAIAAAsQAJAQARABQAMAAAIgLQAHgJAAgVQAAgSgHgJQgHgKgNAAQgSgBgIASg");
	this.shape_207.setTransform(356.425,318.9);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#FFFFFF").s().p("AgYA2IAAhpIASAAIAAAMQAHgOAQAAQAGAAACACIAAAQIgIAAQgRAAgGAPIAABKg");
	this.shape_208.setTransform(338.3,320.925);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#FFFFFF").s().p("AgfAsQgKgKABgTIAAhEIASAAIAABDQAAAYATAAQATAAAHgPIAAhMIASAAIAABpIgRAAIAAgLQgKANgUAAQgRAAgIgKg");
	this.shape_209.setTransform(328.85,321.125);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_210.setTransform(317.875,321.025);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#FFFFFF").s().p("AggA9QgLgPAAgZIAAgBQAAgXALgPQALgPATAAQARAAAMANIAAg3IASAAIAACVIgRAAIgBgLQgLANgSAAQgTAAgLgPgAgSgHQgIAJABAUQgBATAIAJQAHALANAAQAQgBAJgPIAAgwQgJgPgQABQgNAAgHAKg");
	this.shape_211.setTransform(306.55,318.9);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_212.setTransform(295.625,320.925);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_213.setTransform(284.925,321.025);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgMAAQgKAAgHAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgXAAQgRAAgHAQIAABMIgSAAIAAhpIARAAIABAMQALgOAUAAQAWAAAHARQAFgHAJgFQAJgFALAAQAiAAABAlIAABGg");
	this.shape_214.setTransform(270.75,320.925);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#FFFFFF").s().p("AAWBLIgkgxIgKAMIAAAlIgSAAIAAiVIASAAIAABZIAJgLIAggiIAWAAIgoArIAtA+g");
	this.shape_215.setTransform(248.15,318.8);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#FFFFFF").s().p("AgfAsQgJgKAAgTIAAhEIASAAIAABDQAAAYATAAQATAAAIgPIAAhMIASAAIAABpIgRAAIgBgLQgKANgUAAQgRAAgIgKg");
	this.shape_216.setTransform(236.85,321.125);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAPQgHACgHAAQgMAAgFgIg");
	this.shape_217.setTransform(227.775,319.85);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_218.setTransform(219.275,320.925);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#FFFFFF").s().p("AggAsQgIgKgBgTIAAhEIASAAIAABDQAAAYAUAAQATAAAHgPIAAhMIASAAIAABpIgQAAIgBgLQgLANgTAAQgRAAgJgKg");
	this.shape_219.setTransform(208.2,321.125);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_220.setTransform(187.725,320.925);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_221.setTransform(176.725,321.025);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#FFFFFF").s().p("AgfAsQgJgKAAgTIAAhEIASAAIAABDQAAAYATAAQAUAAAHgPIAAhMIASAAIAABpIgRAAIgBgLQgKANgUAAQgRAAgIgKg");
	this.shape_222.setTransform(165.75,321.125);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABALQALgNASAAQAUAAALAOQALAOAAAaIAAACQAAAXgLAOQgLAPgTABQgSAAgMgNIAAAzgAgagrIAAAyQAJAOAQgBQAMABAIgLQAIgKAAgTQAAgSgIgLQgIgKgMAAQgQAAgJAPg");
	this.shape_223.setTransform(154.875,322.95);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgMAAQgKAAgHAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgXAAQgRAAgHAQIAABMIgSAAIAAhpIARAAIABAMQALgOAUAAQAWAAAHARQAFgHAJgFQAJgFALAAQAiAAABAlIAABGg");
	this.shape_224.setTransform(140.25,320.925);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_225.setTransform(126.025,321.025);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgJAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgXAAQgSAAgGAQIAABMIgSAAIAAhpIARAAIAAAMQAMgOAUAAQAWAAAHARQAGgHAIgFQAJgFALAAQAiAAABAlIAABGg");
	this.shape_226.setTransform(111.8,320.925);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_227.setTransform(97.875,321.025);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgLAMIAAAlIgSAAIAAiVIASAAIAABZIAJgLIAggiIAWAAIgoArIAsA+g");
	this.shape_228.setTransform(88.1,318.8);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg1QgCgDgBgFQABgEACgDQACgDAFAAQAFAAADADQADADAAAEQAAAFgDADQgDACgFAAQgFAAgCgCg");
	this.shape_229.setTransform(874.7,290.1);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_230.setTransform(866.775,292.025);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#FFFFFF").s().p("AgfBKIgHgBIAAgPIAFAAQAKAAAEgDQAFgEAEgKIAEgLIgmhnIAUAAIAZBOIAZhOIATAAIgqB5QgJAagWAAg");
	this.shape_231.setTransform(856.6,294.15);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_232.setTransform(846.375,291.925);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#FFFFFF").s().p("AggAsQgJgKAAgTIAAhEIATAAIAABDQgBAYAUAAQAUAAAGgPIAAhMIASAAIAABpIgRAAIAAgLQgKANgUAAQgRAAgJgKg");
	this.shape_233.setTransform(835.3,292.125);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABAMQALgOASAAQAUAAALAOQALAOAAAaIAAACQAAAXgLAPQgLAPgTAAQgSAAgMgNIAAAzgAgagrIAAAxQAJAOAQABQAMgBAIgJQAIgLAAgTQAAgSgIgLQgIgKgMAAQgQAAgJAPg");
	this.shape_234.setTransform(824.425,293.95);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgKAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgWAAQgTAAgGAQIAABMIgSAAIAAhpIARAAIAAAMQANgOATAAQAWAAAHARQAGgHAIgFQAIgFAMAAQAjAAAAAlIAABGg");
	this.shape_235.setTransform(809.8,291.925);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_236.setTransform(795.875,292.025);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgMAAQgKAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgWAAQgTAAgGAQIAABMIgSAAIAAhpIARAAIABAMQALgOAUAAQAWAAAHARQAFgHAJgFQAIgFAMAAQAiAAABAlIAABGg");
	this.shape_237.setTransform(781.7,291.925);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgLgFgFQgFgGgLABQgIAAgGAEQgHAFgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgOASAAQAhAAABAkIAABGg");
	this.shape_238.setTransform(756.625,289.8);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_239.setTransform(745.625,292.025);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_240.setTransform(734.675,291.925);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_241.setTransform(723.675,292.025);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHABQgMAAgFgIg");
	this.shape_242.setTransform(714.675,290.85);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg1QgDgDABgFQgBgEADgDQACgDAFAAQAFAAADADQADADgBAEQABAFgDADQgDACgFAAQgFAAgCgCg");
	this.shape_243.setTransform(698.45,290.1);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#FFFFFF").s().p("AggA9QgMgPAAgZIAAAAQAAgYAMgPQAMgOASAAQASAAAKAMIAAg3IASAAIAACVIgQAAIgBgLQgLANgSAAQgSAAgMgPgAgSgHQgIAJAAAUQAAASAIAKQAHAKAMAAQASAAAHgPIAAgwQgHgOgSAAQgMgBgHALg");
	this.shape_244.setTransform(690.1,289.9);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABAMQALgOASAAQAUAAALAOQALAOAAAaIAAACQAAAXgLAPQgLAPgTAAQgSAAgMgNIAAAzgAgagrIAAAxQAJAOAQABQAMgBAIgJQAIgLAAgTQAAgSgIgLQgIgKgMAAQgQAAgJAPg");
	this.shape_245.setTransform(668.475,293.95);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#FFFFFF").s().p("AggAsQgJgKABgTIAAhEIARAAIAABDQAAAYAUAAQAUAAAGgPIAAhMIASAAIAABpIgRAAIAAgLQgKANgUAAQgRAAgJgKg");
	this.shape_246.setTransform(657.1,292.125);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#FFFFFF").s().p("AggA9QgMgPAAgZIAAAAQAAgYAMgPQAMgOASAAQARAAAMAMIAAg3IASAAIAACVIgRAAIgBgLQgLANgSAAQgSAAgMgPgAgSgHQgHAJgBAUQABASAHAKQAHAKAMAAQARAAAJgPIAAgwQgJgOgRAAQgMgBgHALg");
	this.shape_247.setTransform(645.7,289.9);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg1QgCgDgBgFQABgEACgDQACgDAFAAQAFAAADADQACADAAAEQAAAFgCADQgDACgFAAQgFAAgCgCg");
	this.shape_248.setTransform(637.9,290.1);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgLgFgFQgFgGgLABQgIAAgGAEQgHAFgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgOASAAQAhAAABAkIAABGg");
	this.shape_249.setTransform(629.975,289.8);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#FFFFFF").s().p("AgWBGQgLgFgGgJIAKgLQALAPASAAQAMAAAHgHQAIgIAAgNIAAgJQgMAMgRAAQgTAAgLgPQgLgPAAgYQAAgaALgOQALgOATAAQASAAAMANIAAgMIARAAIAABnQgBAUgMAMQgLALgVAAQgLAAgLgEgAgSgwQgHAKAAAUQAAASAHAJQAHAKANAAQAQAAAJgPIAAgvQgJgPgQAAQgMgBgIALg");
	this.shape_250.setTransform(607.8,294);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_251.setTransform(596.875,291.925);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_252.setTransform(585.875,292.025);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#FFFFFF").s().p("AgfBKIgHgBIAAgPIAFAAQAKAAAEgDQAFgEAEgKIAEgLIgmhnIAUAAIAZBOIAZhOIATAAIgrB5QgIAagWAAg");
	this.shape_253.setTransform(575.7,294.15);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgGgIQgFgIAAgKIASAAQAAAJAHAGQAHAFAKAAQALAAAFgEQAHgEAAgHQgBgIgFgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgDgGAAgIQgBgNALgJQAMgJAPAAQATAAAKAJQAMAKAAAOIgSAAQgBgHgGgGQgGgFgKAAQgJAAgFAEQgFAFAAAHQAAAGAEADQAGAEANADQANADAIAEQAJADAEAGQAEAGAAAIQAAAPgLAIQgMAJgSAAQgMAAgJgFg");
	this.shape_254.setTransform(555,292.025);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_255.setTransform(544.675,292.025);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#FFFFFF").s().p("AgIBIIAAhpIARAAIAABpgAgHg1QgDgDABgFQgBgEADgDQACgDAFAAQAFAAADADQADADgBAEQABAFgDADQgDACgFAAQgFAAgCgCg");
	this.shape_256.setTransform(536.9,290.1);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#FFFFFF").s().p("AgVAyQgJgEgFgIQgGgIAAgKIASAAQAAAJAHAGQAHAFAKAAQAKAAAHgEQAFgEAAgHQABgIgGgEQgFgEgNgDQgOgDgIgDQgIgEgDgFQgFgGAAgIQAAgNAMgJQAKgJARAAQARAAAMAJQALAKAAAOIgTAAQABgHgHgGQgGgFgJAAQgJAAgGAEQgGAFAAAHQABAGAFADQAFAEAMADQAOADAIAEQAJADAEAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgKgFg");
	this.shape_257.setTransform(529.3,292.025);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_258.setTransform(518.975,292.025);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABAMQALgOASAAQAUAAALAOQALAOAAAaIAAACQAAAXgLAPQgLAPgTAAQgSAAgMgNIAAAzgAgagrIAAAxQAJAOAQABQAMgBAIgJQAIgLAAgTQAAgSgIgLQgIgKgMAAQgQAAgJAPg");
	this.shape_259.setTransform(508.225,293.95);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#FFFFFF").s().p("AgYBDQgNgFgHgKQgGgKgBgMIATAAQAAAMAJAIQAKAIAPgBQAPAAAIgFQAIgHAAgKQAAgKgHgGQgIgGgSgFQgYgIgLgIQgLgLAAgPQAAgQANgLQAOgLAUAAQAPAAAMAFQALAGAGAKQAHAKgBAMIgTAAQAAgNgIgIQgIgHgPAAQgNAAgIAGQgHAHAAAKQAAAJAHAGQAHAGARAFQASAFAKAFQAKAGAFAIQAFAIgBALQAAARgNALQgOAKgWAAQgOAAgMgGg");
	this.shape_260.setTransform(496.55,290.2);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#FFFFFF").s().p("AgHAIQgDgDAAgFQAAgDADgEQACgDAFAAQAGAAACADQADAEAAADQAAAFgDADQgCADgGAAQgFAAgCgDg");
	this.shape_261.setTransform(477.075,296.325);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHABQgMAAgFgIg");
	this.shape_262.setTransform(470.975,290.85);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#FFFFFF").s().p("AggAsQgIgKgBgTIAAhEIASAAIAABDQAAAYAUAAQATAAAHgPIAAhMIASAAIAABpIgQAAIgBgLQgLANgTAAQgRAAgJgKg");
	this.shape_263.setTransform(462.45,292.125);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_264.setTransform(451.475,292.025);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_265.setTransform(443.625,289.8);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_266.setTransform(424.825,291.925);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_267.setTransform(413.825,292.025);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#FFFFFF").s().p("AggA9QgLgPAAgZIAAAAQAAgYALgPQALgOATAAQARAAAMAMIAAg3IASAAIAACVIgRAAIgBgLQgLANgSAAQgTAAgLgPgAgSgHQgHAJAAAUQAAASAHAKQAHAKANAAQAQAAAJgPIAAgwQgJgOgQAAQgNgBgHALg");
	this.shape_268.setTransform(402.5,289.9);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgLgFgFQgFgGgLABQgIAAgGAEQgHAFgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgOASAAQAhAAABAkIAABGg");
	this.shape_269.setTransform(380.775,289.8);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_270.setTransform(369.775,292.025);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_271.setTransform(358.825,291.925);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_272.setTransform(347.825,292.025);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHABQgMAAgFgIg");
	this.shape_273.setTransform(338.825,290.85);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#FFFFFF").s().p("AgIBIIAAhpIARAAIAABpgAgHg1QgDgDABgFQgBgEADgDQADgDAEAAQAFAAADADQACADAAAEQABAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_274.setTransform(322.6,290.1);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#FFFFFF").s().p("AggA9QgMgPAAgZIAAAAQAAgYAMgPQAMgOASAAQASAAAKAMIAAg3IASAAIAACVIgQAAIgBgLQgLANgSAAQgSAAgMgPgAgSgHQgIAJAAAUQAAASAIAKQAHAKAMAAQASAAAHgPIAAgwQgHgOgSAAQgMgBgHALg");
	this.shape_275.setTransform(314.25,289.9);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_276.setTransform(292.525,292.025);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#FFFFFF").s().p("AggA9QgLgPAAgZIAAAAQAAgYALgPQAMgOASAAQARAAAMAMIAAg3IASAAIAACVIgRAAIgBgLQgLANgSAAQgSAAgMgPgAgSgHQgHAJgBAUQABASAHAKQAHAKAMAAQARAAAJgPIAAgwQgJgOgRAAQgMgBgHALg");
	this.shape_277.setTransform(281.2,289.9);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_278.setTransform(270.325,292.025);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAPAAQAGAAADACIAAAQIgJAAQgRAAgHAPIAABKg");
	this.shape_279.setTransform(262.05,291.925);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_280.setTransform(252.975,292.025);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgNATAAQATAAALAOQALAPAAAYIAAABQAAAYgLAPQgLAPgTAAQgTAAgLgOgAgagBIAAAtQAJAQARAAQAMAAAIgKQAHgKAAgTQAAgTgHgJQgHgLgNABQgSAAgIAQg");
	this.shape_281.setTransform(242.225,289.9);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#FFFFFF").s().p("AgIBIIAAhpIARAAIAABpgAgHg1QgDgDABgFQgBgEADgDQADgDAEAAQAFAAADADQADADgBAEQABAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_282.setTransform(223.15,290.1);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_283.setTransform(215.175,291.925);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg1QgCgDgBgFQABgEACgDQACgDAFAAQAFAAADADQACADAAAEQAAAFgCADQgDACgFAAQgFAAgCgCg");
	this.shape_284.setTransform(207.25,290.1);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgJAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgXAAQgSAAgGAQIAABMIgSAAIAAhpIARAAIAAAMQAMgOAUAAQAWAAAHARQAGgHAIgFQAJgFALAAQAiAAABAlIAABGg");
	this.shape_285.setTransform(185.15,291.925);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#FFFFFF").s().p("AggAsQgIgKgBgTIAAhEIASAAIAABDQAAAYAUAAQATAAAHgPIAAhMIASAAIAABpIgQAAIgBgLQgLANgTAAQgRAAgJgKg");
	this.shape_286.setTransform(170.85,292.125);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_287.setTransform(162.925,289.8);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg1QgCgDAAgFQAAgEACgDQACgDAFAAQAFAAADADQACADAAAEQAAAFgCADQgDACgFAAQgFAAgCgCg");
	this.shape_288.setTransform(158.1,290.1);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f("#FFFFFF").s().p("AgOBMIAAhaIgRAAIAAgPIARAAIAAgKQAAgRAJgKQAIgJARAAIAMABIgBAPIgKAAQgJAAgEAEQgFAGAAAJIAAALIAWAAIAAAPIgWAAIAABag");
	this.shape_289.setTransform(152.475,289.7);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgKAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgWAAQgSAAgHAQIAABMIgSAAIAAhpIARAAIAAAMQANgOATAAQAWAAAHARQAFgHAJgFQAJgFALAAQAjAAAAAlIAABGg");
	this.shape_290.setTransform(129.05,291.925);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_291.setTransform(114.825,292.025);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_292.setTransform(106.975,289.8);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_293.setTransform(99.075,292.025);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#FFFFFF").s().p("AggA9QgMgPABgZIAAAAQgBgYAMgPQALgOATAAQASAAAKAMIAAg3IASAAIAACVIgQAAIgBgLQgLANgSAAQgTAAgLgPgAgSgHQgIAJABAUQgBASAIAKQAHAKANAAQARAAAHgPIAAgwQgHgOgRAAQgNgBgHALg");
	this.shape_294.setTransform(87.75,289.9);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f("#FFFFFF").s().p("AgVAyQgJgEgGgIQgFgIAAgKIASAAQAAAJAHAGQAHAFAKAAQALAAAFgEQAHgEgBgHQAAgIgFgEQgGgEgMgDQgOgDgIgDQgIgEgDgFQgFgGAAgIQAAgNALgJQALgJAQAAQATAAALAJQALAKAAAOIgSAAQAAgHgHgGQgGgFgKAAQgIAAgGAEQgFAFgBAHQAAAGAGADQAFAEANADQANADAIAEQAJADAEAGQAEAGAAAIQAAAPgLAIQgMAJgSAAQgLAAgLgFg");
	this.shape_295.setTransform(872,263.025);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_296.setTransform(861.675,263.025);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg1QgCgEgBgDQABgFACgDQACgDAFAAQAFAAADADQACADAAAFQAAADgCAEQgDADgFAAQgFAAgCgDg");
	this.shape_297.setTransform(853.9,261.1);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#FFFFFF").s().p("AgVAyQgJgEgFgIQgGgIAAgKIASAAQABAJAGAGQAHAFAKAAQAKAAAHgEQAFgEAAgHQABgIgGgEQgFgEgNgDQgOgDgIgDQgIgEgEgFQgDgGAAgIQAAgNALgJQALgJAQAAQARAAALAJQAMAKAAAOIgTAAQAAgHgFgGQgHgFgJAAQgKAAgFAEQgGAFABAHQAAAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgKgFg");
	this.shape_298.setTransform(846.3,263.025);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_299.setTransform(835.975,263.025);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABAMQALgOASAAQAUAAALAOQALAOAAAaIAAACQAAAXgLAPQgLAOgTAAQgSAAgMgMIAAAzgAgagrIAAAxQAJAPAQAAQAMgBAIgJQAIgLAAgTQAAgSgIgKQgIgLgMAAQgQAAgJAPg");
	this.shape_300.setTransform(825.225,264.95);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f("#FFFFFF").s().p("AgVAyQgJgEgFgIQgGgIAAgKIASAAQABAJAGAGQAHAFAKAAQAKAAAHgEQAFgEAAgHQABgIgGgEQgFgEgNgDQgOgDgIgDQgIgEgDgFQgEgGgBgIQAAgNAMgJQAKgJARAAQARAAAMAJQALAKAAAOIgTAAQAAgHgFgGQgHgFgJAAQgKAAgFAEQgGAFAAAHQABAGAFADQAFAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgKgFg");
	this.shape_301.setTransform(814.25,263.025);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMABgFgIg");
	this.shape_302.setTransform(798.675,261.85);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_303.setTransform(790.225,263.025);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMABgFgIg");
	this.shape_304.setTransform(781.225,261.85);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg1QgDgEABgDQgBgFADgDQACgDAFAAQAFAAADADQADADgBAFQABADgDAEQgDADgFAAQgFAAgCgDg");
	this.shape_305.setTransform(775.85,261.1);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgNATAAQATAAALAOQALAOAAAZIAAACQAAAYgLAOQgLAPgTAAQgTAAgLgOgAgagBIAAAtQAJAQARAAQAMABAIgLQAHgKAAgTQAAgTgHgJQgHgLgNAAQgSAAgIARg");
	this.shape_306.setTransform(768.025,260.9);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_307.setTransform(756.725,263.025);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f("#FFFFFF").s().p("AAkBHIAAhCIhHAAIAABCIgTAAIAAiNIATAAIAAA9IBHAAIAAg9IATAAIAACNg");
	this.shape_308.setTransform(744.175,261.2);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f("#FFFFFF").s().p("AgHAIQgDgDAAgFQAAgDADgEQACgDAFAAQAGAAACADQADAEAAADQAAAFgDADQgCADgGAAQgFAAgCgDg");
	this.shape_309.setTransform(727.525,267.325);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_310.setTransform(719.525,263.025);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f("#FFFFFF").s().p("AggA9QgMgPAAgYIAAgBQAAgYAMgPQALgOATAAQARAAALAMIAAg3IASAAIAACVIgQAAIgBgMQgLAOgSAAQgTAAgLgPgAgSgHQgIAJAAAVQAAARAIAKQAHALANgBQARAAAHgPIAAgwQgHgPgRAAQgNAAgHALg");
	this.shape_311.setTransform(708.2,260.9);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_312.setTransform(697.325,263.025);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f("#FFFFFF").s().p("AgYA2IAAhpIASAAIAAAMQAHgOARAAQAFAAACACIAAAQIgIAAQgRAAgGAPIAABKg");
	this.shape_313.setTransform(689.05,262.925);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_314.setTransform(679.975,263.025);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgNATAAQATAAALAOQALAOAAAZIAAACQAAAYgLAOQgLAPgTAAQgTAAgLgOgAgagBIAAAtQAJAQARAAQAMABAIgLQAHgKAAgTQAAgTgHgJQgHgLgNAAQgSAAgIARg");
	this.shape_315.setTransform(669.225,260.9);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMABgFgIg");
	this.shape_316.setTransform(652.975,261.85);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f("#FFFFFF").s().p("AggAsQgIgKgBgTIAAhEIASAAIAABDQABAYATAAQAUAAAHgPIAAhMIASAAIAABpIgRAAIgBgLQgLANgTAAQgRAAgJgKg");
	this.shape_317.setTransform(644.45,263.125);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgNATAAQATAAALAOQALAOAAAZIAAACQAAAYgLAOQgLAPgTAAQgTAAgLgOgAgagBIAAAtQAJAQARAAQAMABAIgLQAHgKAAgTQAAgTgHgJQgHgLgNAAQgSAAgIARg");
	this.shape_318.setTransform(633.575,260.9);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_319.setTransform(622.575,263.025);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgGgIQgFgIAAgKIASAAQAAAJAHAGQAHAFAKAAQAKAAAGgEQAGgEABgHQAAgIgGgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgDgGAAgIQgBgNALgJQAMgJAPAAQASAAALAJQAMAKAAAOIgSAAQgBgHgFgGQgHgFgKAAQgJAAgFAEQgGAFABAHQAAAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgJgFg");
	this.shape_320.setTransform(612.05,263.025);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAPAAQAGAAACACIAAAQIgIAAQgRAAgHAPIAABKg");
	this.shape_321.setTransform(604.05,262.925);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_322.setTransform(594.975,263.025);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMABgFgIg");
	this.shape_323.setTransform(586.025,261.85);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_324.setTransform(571.025,263.025);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgJAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgXAAQgSAAgGAQIAABMIgSAAIAAhpIARAAIAAAMQAMgOAUAAQAWAAAHARQAGgHAIgFQAJgFALAAQAiAAABAlIAABGg");
	this.shape_325.setTransform(556.85,262.925);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgGgIQgFgIAAgKIASAAQAAAJAHAGQAHAFAKAAQALAAAFgEQAHgEAAgHQgBgIgFgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgEgGAAgIQAAgNALgJQAMgJAPAAQATAAALAJQALAKAAAOIgSAAQAAgHgHgGQgGgFgKAAQgJAAgFAEQgFAFgBAHQAAAGAGADQAFAEANADQANADAIAEQAJADAEAGQAEAGAAAIQAAAPgLAIQgMAJgSAAQgLAAgKgFg");
	this.shape_326.setTransform(542.95,263.025);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg1QgCgEgBgDQABgFACgDQACgDAFAAQAFAAADADQADADAAAFQAAADgDAEQgDADgFAAQgFAAgCgDg");
	this.shape_327.setTransform(535.4,261.1);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_328.setTransform(527.425,262.925);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_329.setTransform(516.425,263.025);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f("#FFFFFF").s().p("AgWBGQgKgFgHgJIAKgLQALAPASAAQAMAAAHgHQAIgIAAgOIAAgJQgMANgRAAQgTAAgLgPQgLgPAAgYQAAgZALgPQALgOATAAQASAAAMANIAAgLIARAAIAABlQgBAVgMAMQgLALgVAAQgLAAgLgEgAgSgwQgHAKAAAVQAAARAHAJQAHALANgBQAQAAAJgPIAAgvQgJgQgQAAQgMAAgIALg");
	this.shape_330.setTransform(505.2,265);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAPAAQAGAAADACIAAAQIgJAAQgRAAgHAPIAABKg");
	this.shape_331.setTransform(496.95,262.925);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f("#FFFFFF").s().p("AghAoQgOgPAAgZIAAAAQAAgQAGgMQAGgMALgHQALgHANAAQAWAAANAPQANAPAAAYIAAABQAAAQgGAMQgGAMgLAHQgLAHgOAAQgVAAgMgPgAgVgcQgIAKAAATQAAASAIAKQAJALAMAAQAOAAAIgLQAIgLAAgSQAAgRgIgLQgIgLgOAAQgMAAgJALg");
	this.shape_332.setTransform(487.35,263.025);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_333.setTransform(469.325,263.025);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_334.setTransform(458.375,262.925);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_335.setTransform(447.375,263.025);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgMAAQgLAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgWAAQgTAAgGAQIAABMIgSAAIAAhpIARAAIABAMQAMgOATAAQAWAAAHARQAGgHAIgFQAJgFALAAQAjAAAAAlIAABGg");
	this.shape_336.setTransform(433.15,262.925);

	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg1QgCgEgBgDQABgFACgDQACgDAFAAQAFAAADADQADADAAAFQAAADgDAEQgDADgFAAQgFAAgCgDg");
	this.shape_337.setTransform(422,261.1);

	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f("#FFFFFF").s().p("AggA9QgLgPAAgYIAAgBQAAgYALgPQALgOATAAQARAAAMAMIAAg3IASAAIAACVIgRAAIgBgMQgLAOgSAAQgTAAgLgPgAgSgHQgIAJABAVQgBARAIAKQAHALANgBQAQAAAJgPIAAgwQgJgPgQAAQgNAAgHALg");
	this.shape_338.setTransform(413.65,260.9);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgJAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgXAAQgSAAgGAQIAABMIgSAAIAAhpIARAAIAAAMQAMgOAUAAQAWAAAHARQAGgHAIgFQAJgFALAAQAiAAABAlIAABGg");
	this.shape_339.setTransform(392.6,262.925);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_340.setTransform(378.675,263.025);

	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMABgFgIg");
	this.shape_341.setTransform(369.725,261.85);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgGgIQgFgIAAgKIASAAQAAAJAHAGQAHAFAKAAQALAAAFgEQAHgEAAgHQgBgIgFgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgEgGAAgIQAAgNALgJQAMgJAPAAQATAAALAJQALAKAAAOIgSAAQAAgHgHgGQgGgFgKAAQgIAAgGAEQgFAFgBAHQAAAGAGADQAFAEANADQANADAIAEQAJADAEAGQAEAGAAAIQAAAPgLAIQgMAJgSAAQgLAAgKgFg");
	this.shape_342.setTransform(361.6,263.025);

	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg1QgCgEgBgDQABgFACgDQACgDAFAAQAFAAADADQADADAAAFQAAADgDAEQgDADgFAAQgFAAgCgDg");
	this.shape_343.setTransform(354.05,261.1);

	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgFgIQgGgIAAgKIASAAQAAAJAHAGQAHAFAKAAQAKAAAHgEQAFgEABgHQAAgIgGgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgDgGAAgIQAAgNALgJQALgJAQAAQARAAALAJQAMAKAAAOIgTAAQAAgHgFgGQgHgFgJAAQgKAAgFAEQgGAFABAHQAAAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgJgFg");
	this.shape_344.setTransform(346.45,263.025);

	this.shape_345 = new cjs.Shape();
	this.shape_345.graphics.f("#FFFFFF").s().p("AghAoQgOgPAAgZIAAAAQAAgQAGgMQAGgMALgHQALgHANAAQAVAAAOAPQANAPAAAYIAAABQAAAQgGAMQgGAMgLAHQgLAHgOAAQgVAAgMgPgAgVgcQgIAKAAATQAAASAIAKQAJALAMAAQAOAAAIgLQAIgLAAgSQAAgRgIgLQgIgLgOAAQgMAAgJALg");
	this.shape_345.setTransform(335.6,263.025);

	this.shape_346 = new cjs.Shape();
	this.shape_346.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgMAMIAAAlIgSAAIAAiVIASAAIAABaIAKgMIAgghIAWAAIgoArIAtA9g");
	this.shape_346.setTransform(325.5,260.8);

	this.shape_347 = new cjs.Shape();
	this.shape_347.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_347.setTransform(314.575,263.025);

	this.shape_348 = new cjs.Shape();
	this.shape_348.graphics.f("#FFFFFF").s().p("AgfAsQgJgKAAgTIAAhEIASAAIAABDQAAAYATAAQATAAAIgPIAAhMIASAAIAABpIgRAAIgBgLQgKANgUAAQgRAAgIgKg");
	this.shape_348.setTransform(296.8,263.125);

	this.shape_349 = new cjs.Shape();
	this.shape_349.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_349.setTransform(285.825,263.025);

	this.shape_350 = new cjs.Shape();
	this.shape_350.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMABgFgIg");
	this.shape_350.setTransform(276.825,261.85);

	this.shape_351 = new cjs.Shape();
	this.shape_351.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_351.setTransform(268.375,263.025);

	this.shape_352 = new cjs.Shape();
	this.shape_352.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_352.setTransform(250.575,262.925);

	this.shape_353 = new cjs.Shape();
	this.shape_353.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_353.setTransform(239.575,263.025);

	this.shape_354 = new cjs.Shape();
	this.shape_354.graphics.f("#FFFFFF").s().p("AgWBGQgKgFgHgJIAKgLQALAPASAAQAMAAAHgHQAIgIAAgOIAAgJQgMANgRAAQgTAAgLgPQgLgPAAgYQAAgZALgPQALgOATAAQASAAAMANIAAgLIARAAIAABlQAAAVgNAMQgMALgUAAQgLAAgLgEgAgSgwQgHAKAAAVQAAARAHAJQAHALANgBQAQAAAJgPIAAgvQgJgQgQAAQgMAAgIALg");
	this.shape_354.setTransform(228.35,265);

	this.shape_355 = new cjs.Shape();
	this.shape_355.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_355.setTransform(217.425,262.925);

	this.shape_356 = new cjs.Shape();
	this.shape_356.graphics.f("#FFFFFF").s().p("AgfAsQgJgKAAgTIAAhEIASAAIAABDQAAAYATAAQATAAAIgPIAAhMIASAAIAABpIgRAAIgBgLQgKANgUAAQgRAAgIgKg");
	this.shape_356.setTransform(206.35,263.125);

	this.shape_357 = new cjs.Shape();
	this.shape_357.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgMAMIAAAlIgSAAIAAiVIASAAIAABaIAKgMIAgghIAWAAIgoArIAsA9g");
	this.shape_357.setTransform(196.45,260.8);

	this.shape_358 = new cjs.Shape();
	this.shape_358.graphics.f("#FFFFFF").s().p("AgWBGQgKgFgGgJIAJgLQAMAPARAAQAMAAAHgHQAHgIABgOIAAgJQgMANgRAAQgSAAgMgPQgMgPAAgYQAAgZAMgPQALgOATAAQATAAAKANIABgLIARAAIAABlQgBAVgLAMQgMALgVAAQgKAAgMgEgAgSgwQgHAKAAAVQAAARAHAJQAHALAMgBQARAAAJgPIAAgvQgJgQgRAAQgLAAgIALg");
	this.shape_358.setTransform(184.9,265);

	this.shape_359 = new cjs.Shape();
	this.shape_359.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_359.setTransform(173.975,262.925);

	this.shape_360 = new cjs.Shape();
	this.shape_360.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg1QgDgEAAgDQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAADgDAEQgDADgFAAQgEAAgDgDg");
	this.shape_360.setTransform(166.05,261.1);

	this.shape_361 = new cjs.Shape();
	this.shape_361.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_361.setTransform(161.175,260.8);

	this.shape_362 = new cjs.Shape();
	this.shape_362.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgGgIQgFgIAAgKIASAAQAAAJAHAGQAHAFAKAAQAKAAAHgEQAFgEABgHQAAgIgGgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgDgGAAgIQgBgNALgJQAMgJAPAAQATAAAKAJQAMAKAAAOIgSAAQgBgHgFgGQgHgFgKAAQgJAAgFAEQgGAFABAHQAAAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgJgFg");
	this.shape_362.setTransform(146.75,263.025);

	this.shape_363 = new cjs.Shape();
	this.shape_363.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_363.setTransform(136.125,263.025);

	this.shape_364 = new cjs.Shape();
	this.shape_364.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMABgFgIg");
	this.shape_364.setTransform(127.125,261.85);

	this.shape_365 = new cjs.Shape();
	this.shape_365.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg1QgCgEgBgDQABgFACgDQACgDAFAAQAFAAADADQACADAAAFQAAADgCAEQgDADgFAAQgFAAgCgDg");
	this.shape_365.setTransform(121.75,261.1);

	this.shape_366 = new cjs.Shape();
	this.shape_366.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_366.setTransform(116.875,260.8);

	this.shape_367 = new cjs.Shape();
	this.shape_367.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_367.setTransform(108.975,263.025);

	this.shape_368 = new cjs.Shape();
	this.shape_368.graphics.f("#FFFFFF").s().p("AgfAsQgKgKABgTIAAhEIASAAIAABDQAAAYATAAQATAAAHgPIAAhMIATAAIAABpIgSAAIAAgLQgKANgUAAQgRAAgIgKg");
	this.shape_368.setTransform(98,263.125);

	this.shape_369 = new cjs.Shape();
	this.shape_369.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgLAMIAAAlIgSAAIAAiVIASAAIAABaIAJgMIAgghIAWAAIgoArIAsA9g");
	this.shape_369.setTransform(88.1,260.8);

	this.shape_370 = new cjs.Shape();
	this.shape_370.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_370.setTransform(871.475,233.925);

	this.shape_371 = new cjs.Shape();
	this.shape_371.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_371.setTransform(860.475,234.025);

	this.shape_372 = new cjs.Shape();
	this.shape_372.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgMAMIAAAlIgSAAIAAiVIASAAIAABaIAKgMIAgghIAWAAIgoArIAtA9g");
	this.shape_372.setTransform(850.65,231.8);

	this.shape_373 = new cjs.Shape();
	this.shape_373.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgLAMIAAAlIgSAAIAAiVIASAAIAABaIAJgMIAgghIAWAAIgoArIAsA9g");
	this.shape_373.setTransform(840.5,231.8);

	this.shape_374 = new cjs.Shape();
	this.shape_374.graphics.f("#FFFFFF").s().p("AggAsQgIgKgBgTIAAhEIASAAIAABDQAAAYAUAAQATAAAHgPIAAhMIASAAIAABpIgQAAIgBgLQgLANgTAAQgRAAgJgKg");
	this.shape_374.setTransform(829.2,234.125);

	this.shape_375 = new cjs.Shape();
	this.shape_375.graphics.f("#FFFFFF").s().p("AgTBcIAAgPIAIABQAHAAACgDQADgDAAgJIAAh1IASAAIAAB1QAAAegbAAQgGAAgFgBgAAChLQgCgDAAgEQAAgEACgDQADgDAEAAQAGAAACADQADADAAAEQAAAEgDADQgCADgGAAQgFAAgCgDg");
	this.shape_375.setTransform(820.25,234.225);

	this.shape_376 = new cjs.Shape();
	this.shape_376.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_376.setTransform(813.375,233.925);

	this.shape_377 = new cjs.Shape();
	this.shape_377.graphics.f("#FFFFFF").s().p("AggAsQgIgKgBgTIAAhEIASAAIAABDQABAYATAAQATAAAIgPIAAhMIASAAIAABpIgRAAIgBgLQgLANgTAAQgRAAgJgKg");
	this.shape_377.setTransform(802.3,234.125);

	this.shape_378 = new cjs.Shape();
	this.shape_378.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_378.setTransform(791.275,233.925);

	this.shape_379 = new cjs.Shape();
	this.shape_379.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_379.setTransform(780.575,234.025);

	this.shape_380 = new cjs.Shape();
	this.shape_380.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgMAAQgKAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgWAAQgTAAgGAQIAABMIgSAAIAAhpIARAAIABAMQALgOAUAAQAWAAAHARQAFgHAJgFQAIgFAMAAQAiAAABAlIAABGg");
	this.shape_380.setTransform(766.4,233.925);

	this.shape_381 = new cjs.Shape();
	this.shape_381.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAPQgHABgHAAQgMAAgFgHg");
	this.shape_381.setTransform(747.975,232.85);

	this.shape_382 = new cjs.Shape();
	this.shape_382.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_382.setTransform(739.525,234.025);

	this.shape_383 = new cjs.Shape();
	this.shape_383.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABALQALgNASAAQAUAAALAOQALAPAAAZIAAACQAAAXgLAOQgLAQgTgBQgSAAgMgMIAAAzgAgagrIAAAyQAJANAQAAQAMAAAIgKQAIgKAAgTQAAgSgIgKQgIgLgMAAQgQAAgJAPg");
	this.shape_383.setTransform(728.725,235.95);

	this.shape_384 = new cjs.Shape();
	this.shape_384.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_384.setTransform(717.425,234.025);

	this.shape_385 = new cjs.Shape();
	this.shape_385.graphics.f("#FFFFFF").s().p("AggA9QgMgPAAgYIAAgCQAAgXAMgPQAMgPASAAQASAAALANIAAg3IARAAIAACVIgQAAIgBgMQgLAOgSAAQgSAAgMgPgAgSgHQgHAJgBAVQABARAHALQAHAKAMAAQARAAAJgQIAAgvQgJgPgRgBQgMAAgHALg");
	this.shape_385.setTransform(706.1,231.9);

	this.shape_386 = new cjs.Shape();
	this.shape_386.graphics.f("#FFFFFF").s().p("AgWBFQgLgEgGgJIAKgKQALAOASAAQAMAAAHgHQAIgIAAgOIAAgJQgMANgRAAQgTAAgLgPQgLgPAAgZQAAgYALgPQALgPATAAQASAAAMAOIAAgLIARAAIAABlQgBAVgMAMQgLAMgVgBQgLABgLgGgAgSgwQgHAKAAAVQAAARAHAKQAHAKANAAQAQAAAJgQIAAgvQgJgQgQAAQgMAAgIALg");
	this.shape_386.setTransform(688.8,236);

	this.shape_387 = new cjs.Shape();
	this.shape_387.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_387.setTransform(677.875,233.925);

	this.shape_388 = new cjs.Shape();
	this.shape_388.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_388.setTransform(666.875,234.025);

	this.shape_389 = new cjs.Shape();
	this.shape_389.graphics.f("#FFFFFF").s().p("AgfBKIgHgCIAAgOIAFABQAKAAAEgFQAFgDAEgKIAEgKIgmhoIAUAAIAZBOIAZhOIATAAIgrB5QgIAagWAAg");
	this.shape_389.setTransform(656.7,236.15);

	this.shape_390 = new cjs.Shape();
	this.shape_390.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_390.setTransform(640.725,234.025);

	this.shape_391 = new cjs.Shape();
	this.shape_391.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgMAAQgLAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgWAAQgTAAgGAQIAABMIgSAAIAAhpIARAAIABAMQALgOAUAAQAWAAAHARQAGgHAIgFQAIgFAMAAQAjAAAAAlIAABGg");
	this.shape_391.setTransform(626.55,233.925);

	this.shape_392 = new cjs.Shape();
	this.shape_392.graphics.f("#FFFFFF").s().p("AgVAyQgJgEgFgIQgGgIAAgKIASAAQABAJAGAGQAHAFAKAAQAKAAAHgEQAFgEAAgHQABgIgGgEQgFgEgNgDQgOgDgIgDQgIgEgDgFQgEgGgBgIQAAgNAMgJQAKgJARAAQARAAALAJQAMAKAAAOIgTAAQAAgHgFgGQgHgFgJAAQgKAAgFAEQgGAFAAAHQABAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgKgFg");
	this.shape_392.setTransform(612.65,234.025);

	this.shape_393 = new cjs.Shape();
	this.shape_393.graphics.f("#FFFFFF").s().p("AgIBIIAAhoIARAAIAABogAgHg2QgCgCAAgEQAAgFACgDQADgDAEAAQAFAAADADQACADAAAFQAAAEgCACQgDAEgFAAQgEAAgDgEg");
	this.shape_393.setTransform(605.1,232.1);

	this.shape_394 = new cjs.Shape();
	this.shape_394.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_394.setTransform(597.125,233.925);

	this.shape_395 = new cjs.Shape();
	this.shape_395.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_395.setTransform(586.125,234.025);

	this.shape_396 = new cjs.Shape();
	this.shape_396.graphics.f("#FFFFFF").s().p("AgVBFQgMgEgFgJIAJgKQALAOARAAQAMAAAIgHQAHgIAAgOIAAgJQgLANgRAAQgSAAgMgPQgMgPAAgZQAAgYAMgPQALgPATAAQATAAAKAOIABgLIAQAAIAABlQABAVgMAMQgNAMgUgBQgKABgLgGgAgSgwQgIAKAAAVQAAARAIAKQAHAKAMAAQASAAAHgQIAAgvQgIgQgRAAQgMAAgHALg");
	this.shape_396.setTransform(574.9,236);

	this.shape_397 = new cjs.Shape();
	this.shape_397.graphics.f("#FFFFFF").s().p("AgYA2IAAhpIASAAIAAAMQAHgOARAAQAFAAACACIAAAQIgIAAQgRAAgGAPIAABKg");
	this.shape_397.setTransform(566.65,233.925);

	this.shape_398 = new cjs.Shape();
	this.shape_398.graphics.f("#FFFFFF").s().p("AgiAoQgNgPAAgZIAAAAQAAgQAGgMQAGgMALgHQALgHANAAQAVAAAOAPQANAPAAAYIAAABQAAAQgGAMQgFAMgLAHQgMAHgOAAQgUAAgOgPgAgUgcQgJAKAAATQAAASAJAKQAHALANAAQAOAAAIgLQAIgLAAgSQAAgRgIgLQgJgLgNAAQgNAAgHALg");
	this.shape_398.setTransform(557.05,234.025);

	this.shape_399 = new cjs.Shape();
	this.shape_399.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg2QgCgCgBgEQABgFACgDQACgDAFAAQAFAAADADQACADAAAFQAAAEgCACQgDAEgFAAQgFAAgCgEg");
	this.shape_399.setTransform(542.85,232.1);

	this.shape_400 = new cjs.Shape();
	this.shape_400.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_400.setTransform(534.925,234.025);

	this.shape_401 = new cjs.Shape();
	this.shape_401.graphics.f("#FFFFFF").s().p("AgVBFQgMgEgGgJIAKgKQALAOARAAQAMAAAIgHQAIgIgBgOIAAgJQgLANgRAAQgTAAgLgPQgMgPAAgZQAAgYAMgPQALgPATAAQATAAAKAOIABgLIAQAAIAABlQAAAVgLAMQgNAMgUgBQgKABgLgGgAgSgwQgIAKAAAVQAAARAIAKQAHAKANAAQARAAAHgQIAAgvQgIgQgQAAQgNAAgHALg");
	this.shape_401.setTransform(523.7,236);

	this.shape_402 = new cjs.Shape();
	this.shape_402.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_402.setTransform(512.825,234.025);

	this.shape_403 = new cjs.Shape();
	this.shape_403.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgOATAAQATAAALAPQALAPAAAYIAAACQAAAXgLAQQgLAOgTAAQgTAAgLgOgAgagBIAAAtQAJARARAAQAMAAAIgKQAHgKAAgVQAAgSgHgJQgHgLgNAAQgSABgIAQg");
	this.shape_403.setTransform(502.025,231.9);

	this.shape_404 = new cjs.Shape();
	this.shape_404.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_404.setTransform(491.025,234.025);

	this.shape_405 = new cjs.Shape();
	this.shape_405.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgGgIQgFgIAAgKIASAAQABAJAGAGQAHAFAKAAQALAAAFgEQAHgEAAgHQgBgIgFgEQgGgEgMgDQgOgDgIgDQgIgEgDgFQgFgGAAgIQABgNAKgJQALgJAQAAQATAAALAJQALAKAAAOIgSAAQAAgHgHgGQgGgFgKAAQgIAAgGAEQgFAFgBAHQAAAGAGADQAFAEANADQANADAIAEQAJADAEAGQAEAGAAAIQAAAPgLAIQgMAJgSAAQgLAAgKgFg");
	this.shape_405.setTransform(480.5,234.025);

	this.shape_406 = new cjs.Shape();
	this.shape_406.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_406.setTransform(463.725,233.925);

	this.shape_407 = new cjs.Shape();
	this.shape_407.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_407.setTransform(452.725,234.025);

	this.shape_408 = new cjs.Shape();
	this.shape_408.graphics.f("#FFFFFF").s().p("AAWBLIgkgxIgKAMIAAAlIgSAAIAAiVIASAAIAABaIAJgMIAgghIAWAAIgoArIAsA9g");
	this.shape_408.setTransform(442.9,231.8);

	this.shape_409 = new cjs.Shape();
	this.shape_409.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg2QgDgCABgEQgBgFADgDQACgDAFAAQAFAAADADQADADgBAFQABAEgDACQgDAEgFAAQgFAAgCgEg");
	this.shape_409.setTransform(434.75,232.1);

	this.shape_410 = new cjs.Shape();
	this.shape_410.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAPQgHABgHAAQgMAAgFgHg");
	this.shape_410.setTransform(428.725,232.85);

	this.shape_411 = new cjs.Shape();
	this.shape_411.graphics.f("#FFFFFF").s().p("AgYA2IAAhpIASAAIAAAMQAHgOAQAAQAGAAACACIAAAQIgIAAQgRAAgGAPIAABKg");
	this.shape_411.setTransform(422.9,233.925);

	this.shape_412 = new cjs.Shape();
	this.shape_412.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_412.setTransform(413.525,234.025);

	this.shape_413 = new cjs.Shape();
	this.shape_413.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg2QgCgCgBgEQABgFACgDQACgDAFAAQAFAAADADQACADAAAFQAAAEgCACQgDAEgFAAQgFAAgCgEg");
	this.shape_413.setTransform(405.7,232.1);

	this.shape_414 = new cjs.Shape();
	this.shape_414.graphics.f("#FFFFFF").s().p("AggA9QgMgPABgYIAAgCQgBgXAMgPQALgPATAAQASAAAKANIAAg3IASAAIAACVIgQAAIgBgMQgLAOgSAAQgTAAgLgPgAgSgHQgIAJABAVQgBARAIALQAHAKANAAQARAAAHgQIAAgvQgHgPgRgBQgNAAgHALg");
	this.shape_414.setTransform(397.35,231.9);

	this.shape_415 = new cjs.Shape();
	this.shape_415.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAPQgHABgHAAQgMAAgFgHg");
	this.shape_415.setTransform(382.275,232.85);

	this.shape_416 = new cjs.Shape();
	this.shape_416.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_416.setTransform(373.825,234.025);

	this.shape_417 = new cjs.Shape();
	this.shape_417.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABALQALgNASAAQAUAAALAOQALAPAAAZIAAACQAAAXgLAOQgLAQgTgBQgSAAgMgMIAAAzgAgagrIAAAyQAJANAQAAQAMAAAIgKQAIgKAAgTQAAgSgIgKQgIgLgMAAQgQAAgJAPg");
	this.shape_417.setTransform(363.025,235.95);

	this.shape_418 = new cjs.Shape();
	this.shape_418.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_418.setTransform(351.725,234.025);

	this.shape_419 = new cjs.Shape();
	this.shape_419.graphics.f("#FFFFFF").s().p("AggA9QgLgPAAgYIAAgCQAAgXALgPQALgPATAAQARAAAMANIAAg3IASAAIAACVIgRAAIgBgMQgLAOgSAAQgTAAgLgPgAgSgHQgHAJAAAVQAAARAHALQAHAKANAAQAQAAAJgQIAAgvQgJgPgQgBQgNAAgHALg");
	this.shape_419.setTransform(340.4,231.9);

	this.shape_420 = new cjs.Shape();
	this.shape_420.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAPAAQAGAAACACIAAAQIgIAAQgRAAgHAPIAABKg");
	this.shape_420.setTransform(326.05,233.925);

	this.shape_421 = new cjs.Shape();
	this.shape_421.graphics.f("#FFFFFF").s().p("AghAoQgOgPAAgZIAAAAQAAgQAGgMQAGgMALgHQALgHANAAQAWAAANAPQANAPAAAYIAAABQAAAQgGAMQgGAMgLAHQgKAHgPAAQgUAAgNgPgAgVgcQgIAKAAATQAAASAIAKQAJALAMAAQAOAAAIgLQAIgLAAgSQAAgRgIgLQgJgLgNAAQgMAAgJALg");
	this.shape_421.setTransform(316.45,234.025);

	this.shape_422 = new cjs.Shape();
	this.shape_422.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAPQgHABgHAAQgMAAgFgHg");
	this.shape_422.setTransform(307.175,232.85);

	this.shape_423 = new cjs.Shape();
	this.shape_423.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_423.setTransform(298.725,234.025);

	this.shape_424 = new cjs.Shape();
	this.shape_424.graphics.f("#FFFFFF").s().p("AAWBLIgjgxIgLAMIAAAlIgSAAIAAiVIASAAIAABaIAJgMIAgghIAWAAIgoArIAsA9g");
	this.shape_424.setTransform(288.9,231.8);

	this.shape_425 = new cjs.Shape();
	this.shape_425.graphics.f("#FFFFFF").s().p("AgIBIIAAhoIARAAIAABogAgHg2QgDgCABgEQgBgFADgDQADgDAEAAQAFAAADADQADADgBAFQABAEgDACQgDAEgFAAQgEAAgDgEg");
	this.shape_425.setTransform(280.75,232.1);

	this.shape_426 = new cjs.Shape();
	this.shape_426.graphics.f("#FFFFFF").s().p("AggA9QgMgPAAgYIAAgCQAAgXAMgPQAMgPASAAQASAAAKANIAAg3IASAAIAACVIgQAAIgBgMQgLAOgSAAQgSAAgMgPgAgSgHQgIAJAAAVQAAARAIALQAHAKAMAAQASAAAHgQIAAgvQgHgPgSgBQgMAAgHALg");
	this.shape_426.setTransform(272.4,231.9);

	this.shape_427 = new cjs.Shape();
	this.shape_427.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_427.setTransform(261.475,233.925);

	this.shape_428 = new cjs.Shape();
	this.shape_428.graphics.f("#FFFFFF").s().p("AgIBIIAAhoIARAAIAABogAgHg2QgCgCAAgEQAAgFACgDQADgDAEAAQAFAAADADQACADABAFQgBAEgCACQgDAEgFAAQgEAAgDgEg");
	this.shape_428.setTransform(253.55,232.1);

	this.shape_429 = new cjs.Shape();
	this.shape_429.graphics.f("#FFFFFF").s().p("AgiAoQgNgPAAgZIAAAAQAAgQAGgMQAGgMALgHQALgHANAAQAVAAAOAPQANAPAAAYIAAABQAAAQgGAMQgFAMgMAHQgLAHgOAAQgVAAgNgPgAgUgcQgJAKAAATQAAASAJAKQAHALANAAQAOAAAIgLQAIgLAAgSQAAgRgIgLQgJgLgNAAQgNAAgHALg");
	this.shape_429.setTransform(245.4,234.025);

	this.shape_430 = new cjs.Shape();
	this.shape_430.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg2QgCgCgBgEQABgFACgDQACgDAFAAQAFAAADADQACADAAAFQAAAEgCACQgDAEgFAAQgFAAgCgEg");
	this.shape_430.setTransform(237.3,232.1);

	this.shape_431 = new cjs.Shape();
	this.shape_431.graphics.f("#FFFFFF").s().p("AgwBHIAAiNIAvAAQAWAAAMAKQAMAJAAATQgBAKgFAIQgGAHgKAEQAMADAGAIQAIAJgBANQAAATgMALQgNALgWAAgAgcA4IAdAAQANAAAIgHQAHgHAAgMQAAgagbAAIgeAAgAgcgKIAcAAQALAAAIgFQAGgHABgKQAAgMgHgFQgHgGgNAAIgbAAg");
	this.shape_431.setTransform(228.9,232.2);

	this.shape_432 = new cjs.Shape();
	this.shape_432.graphics.f("#FFFFFF").s().p("AgHAIQgDgDAAgFQAAgDADgEQACgDAFAAQAGAAACADQADAEAAADQAAAFgDADQgCADgGAAQgFAAgCgDg");
	this.shape_432.setTransform(213.625,238.325);

	this.shape_433 = new cjs.Shape();
	this.shape_433.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_433.setTransform(205.625,234.025);

	this.shape_434 = new cjs.Shape();
	this.shape_434.graphics.f("#FFFFFF").s().p("AgfBKIgHgCIAAgOIAFABQAKAAAFgFQAEgDAEgKIAEgKIgmhoIAUAAIAZBOIAZhOIATAAIgrB5QgIAagWAAg");
	this.shape_434.setTransform(195.45,236.15);

	this.shape_435 = new cjs.Shape();
	this.shape_435.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_435.setTransform(185.225,233.925);

	this.shape_436 = new cjs.Shape();
	this.shape_436.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_436.setTransform(174.175,233.925);

	this.shape_437 = new cjs.Shape();
	this.shape_437.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_437.setTransform(163.175,234.025);

	this.shape_438 = new cjs.Shape();
	this.shape_438.graphics.f("#FFFFFF").s().p("AgWBFQgKgEgHgJIAKgKQALAOASAAQAMAAAHgHQAIgIAAgOIAAgJQgMANgRAAQgSAAgMgPQgLgPAAgZQAAgYALgPQALgPATAAQASAAAMAOIAAgLIARAAIAABlQgBAVgMAMQgLAMgVgBQgLABgLgGgAgSgwQgHAKAAAVQAAARAHAKQAHAKAMAAQARAAAJgQIAAgvQgJgQgRAAQgLAAgIALg");
	this.shape_438.setTransform(151.95,236);

	this.shape_439 = new cjs.Shape();
	this.shape_439.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_439.setTransform(141.025,233.925);

	this.shape_440 = new cjs.Shape();
	this.shape_440.graphics.f("#FFFFFF").s().p("AgfAsQgKgKABgTIAAhEIASAAIAABDQAAAYATAAQATAAAIgPIAAhMIARAAIAABpIgRAAIAAgLQgKANgUAAQgRAAgIgKg");
	this.shape_440.setTransform(129.95,234.125);

	this.shape_441 = new cjs.Shape();
	this.shape_441.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgLAMIAAAlIgSAAIAAiVIASAAIAABaIAJgMIAgghIAWAAIgoArIAsA9g");
	this.shape_441.setTransform(120.05,231.8);

	this.shape_442 = new cjs.Shape();
	this.shape_442.graphics.f("#FFFFFF").s().p("AgVBFQgMgEgFgJIAJgKQAMAOARAAQALAAAIgHQAHgIABgOIAAgJQgLANgSAAQgSAAgMgPQgMgPAAgZQAAgYAMgPQALgPATAAQATAAAKAOIABgLIAQAAIAABlQABAVgMAMQgNAMgUgBQgLABgKgGgAgSgwQgHAKgBAVQABARAHAKQAHAKAMAAQARAAAJgQIAAgvQgJgQgRAAQgMAAgHALg");
	this.shape_442.setTransform(108.5,236);

	this.shape_443 = new cjs.Shape();
	this.shape_443.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_443.setTransform(97.575,233.925);

	this.shape_444 = new cjs.Shape();
	this.shape_444.graphics.f("#FFFFFF").s().p("AgIBIIAAhoIARAAIAABogAgHg2QgDgCAAgEQAAgFADgDQACgDAFAAQAFAAADADQACADABAFQgBAEgCACQgDAEgFAAQgFAAgCgEg");
	this.shape_444.setTransform(89.65,232.1);

	this.shape_445 = new cjs.Shape();
	this.shape_445.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_445.setTransform(84.775,231.8);

	this.shape_446 = new cjs.Shape();
	this.shape_446.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAPQgHACgHAAQgMgBgFgHg");
	this.shape_446.setTransform(873.625,203.85);

	this.shape_447 = new cjs.Shape();
	this.shape_447.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_447.setTransform(865.175,205.025);

	this.shape_448 = new cjs.Shape();
	this.shape_448.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAPQgHACgHAAQgMgBgFgHg");
	this.shape_448.setTransform(856.175,203.85);

	this.shape_449 = new cjs.Shape();
	this.shape_449.graphics.f("#FFFFFF").s().p("AgIBIIAAhpIARAAIAABpgAgHg2QgCgCAAgFQAAgEACgDQADgDAEAAQAFAAADADQACADAAAEQAAAFgCACQgDADgFAAQgEAAgDgDg");
	this.shape_449.setTransform(850.8,203.1);

	this.shape_450 = new cjs.Shape();
	this.shape_450.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgOATAAQATAAALAPQALAOAAAZIAAABQAAAZgLAPQgLAOgTAAQgTAAgLgOgAgaAAIAAAsQAJARARAAQAMgBAIgJQAHgKAAgVQAAgSgHgJQgHgKgNAAQgSAAgIARg");
	this.shape_450.setTransform(842.975,202.9);

	this.shape_451 = new cjs.Shape();
	this.shape_451.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_451.setTransform(831.675,205.025);

	this.shape_452 = new cjs.Shape();
	this.shape_452.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgLgFgFQgFgFgLAAQgIAAgGAEQgHAFgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgPASAAQAhAAABAlIAABGg");
	this.shape_452.setTransform(820.775,202.8);

	this.shape_453 = new cjs.Shape();
	this.shape_453.graphics.f("#FFFFFF").s().p("AgYA2IAAhpIASAAIAAAMQAHgOARAAQAFAAADACIAAAQIgJAAQgRAAgGAPIAABKg");
	this.shape_453.setTransform(790.85,204.925);

	this.shape_454 = new cjs.Shape();
	this.shape_454.graphics.f("#FFFFFF").s().p("AgiAoQgNgPAAgZIAAAAQAAgQAGgMQAGgMALgHQALgHANAAQAVAAAOAPQANAPAAAYIAAABQAAAQgGAMQgFAMgLAHQgLAHgPAAQgVAAgNgPgAgUgcQgJAKAAATQAAASAJAKQAHALANAAQAOAAAIgLQAIgLAAgSQAAgRgIgLQgJgLgNAAQgNAAgHALg");
	this.shape_454.setTransform(781.25,205.025);

	this.shape_455 = new cjs.Shape();
	this.shape_455.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAPQgHACgHAAQgMgBgFgHg");
	this.shape_455.setTransform(771.975,203.85);

	this.shape_456 = new cjs.Shape();
	this.shape_456.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_456.setTransform(763.525,205.025);

	this.shape_457 = new cjs.Shape();
	this.shape_457.graphics.f("#FFFFFF").s().p("AAWBLIgkgxIgLAMIAAAlIgSAAIAAiVIASAAIAABaIAKgMIAggiIAWAAIgoArIAtA+g");
	this.shape_457.setTransform(753.7,202.8);

	this.shape_458 = new cjs.Shape();
	this.shape_458.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg2QgCgCgBgFQABgEACgDQACgDAFAAQAFAAADADQADADAAAEQAAAFgDACQgDADgFAAQgFAAgCgDg");
	this.shape_458.setTransform(745.55,203.1);

	this.shape_459 = new cjs.Shape();
	this.shape_459.graphics.f("#FFFFFF").s().p("AggA9QgLgPAAgZIAAgBQAAgXALgPQALgPATAAQARAAAMANIAAg3IASAAIAACVIgRAAIgBgLQgLANgSAAQgTAAgLgPgAgSgHQgIAJABAUQgBATAIAKQAHAJANABQAQAAAJgQIAAgvQgJgQgQABQgNAAgHAKg");
	this.shape_459.setTransform(737.2,202.9);

	this.shape_460 = new cjs.Shape();
	this.shape_460.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_460.setTransform(726.275,204.925);

	this.shape_461 = new cjs.Shape();
	this.shape_461.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg2QgCgCgBgFQABgEACgDQACgDAFAAQAFAAADADQACADAAAEQAAAFgCACQgDADgFAAQgFAAgCgDg");
	this.shape_461.setTransform(718.35,203.1);

	this.shape_462 = new cjs.Shape();
	this.shape_462.graphics.f("#FFFFFF").s().p("AghAoQgOgPAAgZIAAAAQAAgQAGgMQAGgMALgHQALgHANAAQAWAAANAPQANAPAAAYIAAABQAAAQgGAMQgGAMgLAHQgKAHgPAAQgVAAgMgPgAgVgcQgIAKAAATQAAASAIAKQAJALAMAAQAOAAAIgLQAIgLAAgSQAAgRgIgLQgJgLgNAAQgMAAgJALg");
	this.shape_462.setTransform(710.2,205.025);

	this.shape_463 = new cjs.Shape();
	this.shape_463.graphics.f("#FFFFFF").s().p("AgIBIIAAhpIARAAIAABpgAgHg2QgDgCAAgFQAAgEADgDQACgDAFAAQAFAAADADQACADABAEQgBAFgCACQgDADgFAAQgFAAgCgDg");
	this.shape_463.setTransform(702.1,203.1);

	this.shape_464 = new cjs.Shape();
	this.shape_464.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgOATAAQATAAALAPQALAOAAAZIAAABQAAAZgLAPQgLAOgTAAQgTAAgLgOgAgaAAIAAAsQAJARARAAQAMgBAIgJQAHgKAAgVQAAgSgHgJQgHgKgNAAQgSAAgIARg");
	this.shape_464.setTransform(694.275,202.9);

	this.shape_465 = new cjs.Shape();
	this.shape_465.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_465.setTransform(661.375,204.925);

	this.shape_466 = new cjs.Shape();
	this.shape_466.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_466.setTransform(650.375,205.025);

	this.shape_467 = new cjs.Shape();
	this.shape_467.graphics.f("#FFFFFF").s().p("AAWBLIgkgxIgKAMIAAAlIgSAAIAAiVIASAAIAABaIAJgMIAggiIAWAAIgoArIAtA+g");
	this.shape_467.setTransform(640.55,202.8);

	this.shape_468 = new cjs.Shape();
	this.shape_468.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_468.setTransform(629.325,205.025);

	this.shape_469 = new cjs.Shape();
	this.shape_469.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABALQALgNASAAQAUAAALAOQALAOAAAaIAAACQAAAXgLAOQgLAPgTABQgSAAgMgNIAAAzgAgagrIAAAyQAJAOAQgBQAMABAIgLQAIgKAAgTQAAgSgIgKQgIgLgMAAQgQAAgJAPg");
	this.shape_469.setTransform(618.525,206.95);

	this.shape_470 = new cjs.Shape();
	this.shape_470.graphics.f("#FFFFFF").s().p("AggAsQgJgKABgTIAAhEIARAAIAABDQAAAYAUAAQAUAAAGgPIAAhMIASAAIAABpIgRAAIAAgLQgKANgUAAQgRAAgJgKg");
	this.shape_470.setTransform(607.15,205.125);

	this.shape_471 = new cjs.Shape();
	this.shape_471.graphics.f("#FFFFFF").s().p("AgYA2IAAhpIARAAIAAAMQAJgOAQAAQAFAAADACIAAAQIgJAAQgRAAgHAPIAABKg");
	this.shape_471.setTransform(598.8,204.925);

	this.shape_472 = new cjs.Shape();
	this.shape_472.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_472.setTransform(589.725,205.025);

	this.shape_473 = new cjs.Shape();
	this.shape_473.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgKAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgXAAQgSAAgGAQIAABMIgSAAIAAhpIARAAIAAAMQANgOATAAQAWAAAHARQAFgHAJgFQAIgFAMAAQAjAAAAAlIAABGg");
	this.shape_473.setTransform(575.55,204.925);

	this.shape_474 = new cjs.Shape();
	this.shape_474.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAPQgHACgHAAQgMgBgFgHg");
	this.shape_474.setTransform(541.675,203.85);

	this.shape_475 = new cjs.Shape();
	this.shape_475.graphics.f("#FFFFFF").s().p("AgfAsQgKgKABgTIAAhEIASAAIAABDQAAAYATAAQATAAAIgPIAAhMIARAAIAABpIgRAAIAAgLQgKANgUAAQgRAAgIgKg");
	this.shape_475.setTransform(533.15,205.125);

	this.shape_476 = new cjs.Shape();
	this.shape_476.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgOATAAQATAAALAPQALAOAAAZIAAABQAAAZgLAPQgLAOgTAAQgTAAgLgOgAgaAAIAAAsQAJARARAAQAMgBAIgJQAHgKAAgVQAAgSgHgJQgHgKgNAAQgSAAgIARg");
	this.shape_476.setTransform(522.275,202.9);

	this.shape_477 = new cjs.Shape();
	this.shape_477.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_477.setTransform(511.275,205.025);

	this.shape_478 = new cjs.Shape();
	this.shape_478.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgGgIQgFgIAAgKIASAAQABAJAGAGQAHAFAKAAQALAAAFgEQAHgEAAgHQgBgIgFgEQgGgEgMgDQgOgDgIgDQgIgEgDgFQgFgGAAgIQABgNAKgJQALgJAQAAQATAAALAJQALAKAAAOIgSAAQAAgHgHgGQgGgFgKAAQgIAAgGAEQgFAFgBAHQAAAGAGADQAFAEANADQANADAIAEQAJADAEAGQAEAGAAAIQAAAPgLAIQgMAJgSAAQgLAAgKgFg");
	this.shape_478.setTransform(500.75,205.025);

	this.shape_479 = new cjs.Shape();
	this.shape_479.graphics.f("#FFFFFF").s().p("AgYA2IAAhpIASAAIAAAMQAHgOAQAAQAGAAACACIAAAQIgIAAQgRAAgGAPIAABKg");
	this.shape_479.setTransform(492.75,204.925);

	this.shape_480 = new cjs.Shape();
	this.shape_480.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_480.setTransform(483.675,205.025);

	this.shape_481 = new cjs.Shape();
	this.shape_481.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAPQgHACgHAAQgMgBgFgHg");
	this.shape_481.setTransform(474.725,203.85);

	this.shape_482 = new cjs.Shape();
	this.shape_482.graphics.f("#FFFFFF").s().p("AgVAyQgJgEgGgIQgFgIAAgKIASAAQABAJAGAGQAHAFAKAAQALAAAFgEQAHgEgBgHQAAgIgFgEQgFgEgNgDQgOgDgIgDQgIgEgDgFQgFgGAAgIQABgNAKgJQALgJARAAQARAAAMAJQALAKAAAOIgTAAQABgHgHgGQgGgFgJAAQgJAAgGAEQgFAFgBAHQAAAGAGADQAFAEANADQANADAIAEQAJADAEAGQAEAGAAAIQAAAPgLAIQgMAJgSAAQgLAAgLgFg");
	this.shape_482.setTransform(445.05,205.025);

	this.shape_483 = new cjs.Shape();
	this.shape_483.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_483.setTransform(434.725,205.025);

	this.shape_484 = new cjs.Shape();
	this.shape_484.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg2QgCgCgBgFQABgEACgDQACgDAFAAQAFAAADADQADADAAAEQAAAFgDACQgDADgFAAQgFAAgCgDg");
	this.shape_484.setTransform(426.95,203.1);

	this.shape_485 = new cjs.Shape();
	this.shape_485.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgFgIQgGgIAAgKIASAAQAAAJAHAGQAHAFAKAAQAKAAAHgEQAFgEABgHQAAgIgGgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgDgGAAgIQAAgNALgJQALgJAPAAQASAAALAJQAMAKAAAOIgTAAQAAgHgFgGQgHgFgKAAQgJAAgFAEQgGAFABAHQAAAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgJgFg");
	this.shape_485.setTransform(419.35,205.025);

	this.shape_486 = new cjs.Shape();
	this.shape_486.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_486.setTransform(409.025,205.025);

	this.shape_487 = new cjs.Shape();
	this.shape_487.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABALQALgNASAAQAUAAALAOQALAOAAAaIAAACQAAAXgLAOQgLAPgTABQgSAAgMgNIAAAzgAgagrIAAAyQAJAOAQgBQAMABAIgLQAIgKAAgTQAAgSgIgKQgIgLgMAAQgQAAgJAPg");
	this.shape_487.setTransform(398.275,206.95);

	this.shape_488 = new cjs.Shape();
	this.shape_488.graphics.f("#FFFFFF").s().p("AgVAyQgJgEgFgIQgGgIAAgKIASAAQABAJAGAGQAHAFAKAAQAKAAAHgEQAFgEAAgHQABgIgGgEQgFgEgNgDQgOgDgIgDQgIgEgDgFQgEgGAAgIQAAgNALgJQALgJAQAAQARAAALAJQAMAKAAAOIgTAAQAAgHgFgGQgHgFgJAAQgKAAgFAEQgGAFABAHQAAAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgKgFg");
	this.shape_488.setTransform(387.3,205.025);

	this.shape_489 = new cjs.Shape();
	this.shape_489.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_489.setTransform(355.125,205.025);

	this.shape_490 = new cjs.Shape();
	this.shape_490.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_490.setTransform(344.175,204.925);

	this.shape_491 = new cjs.Shape();
	this.shape_491.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_491.setTransform(333.475,205.025);

	this.shape_492 = new cjs.Shape();
	this.shape_492.graphics.f("#FFFFFF").s().p("AgYA2IAAhpIASAAIAAAMQAHgOAQAAQAGAAACACIAAAQIgIAAQgRAAgGAPIAABKg");
	this.shape_492.setTransform(325.25,204.925);

	this.shape_493 = new cjs.Shape();
	this.shape_493.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_493.setTransform(315.875,205.025);

	this.shape_494 = new cjs.Shape();
	this.shape_494.graphics.f("#FFFFFF").s().p("AAXBLIglgxIgLAMIAAAlIgSAAIAAiVIASAAIAABaIAKgMIAggiIAWAAIgoArIAtA+g");
	this.shape_494.setTransform(306.05,202.8);

	this.shape_495 = new cjs.Shape();
	this.shape_495.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg2QgDgCABgFQgBgEADgDQACgDAFAAQAFAAADADQADADgBAEQABAFgDACQgDADgFAAQgFAAgCgDg");
	this.shape_495.setTransform(276.35,203.1);

	this.shape_496 = new cjs.Shape();
	this.shape_496.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_496.setTransform(268.375,204.925);

	this.shape_497 = new cjs.Shape();
	this.shape_497.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg2QgCgCgBgFQABgEACgDQACgDAFAAQAFAAADADQADADAAAEQAAAFgDACQgDADgFAAQgFAAgCgDg");
	this.shape_497.setTransform(260.45,203.1);

	this.shape_498 = new cjs.Shape();
	this.shape_498.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_498.setTransform(234.025,202.8);

	this.shape_499 = new cjs.Shape();
	this.shape_499.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_499.setTransform(226.125,205.025);

	this.shape_500 = new cjs.Shape();
	this.shape_500.graphics.f("#FFFFFF").s().p("AAkBHIAAhBIhHAAIAABBIgTAAIAAiNIATAAIAAA9IBHAAIAAg9IATAAIAACNg");
	this.shape_500.setTransform(213.575,203.2);

	this.shape_501 = new cjs.Shape();
	this.shape_501.graphics.f("#FFFFFF").s().p("AgHAIQgDgDAAgFQAAgDADgEQACgDAFAAQAGAAACADQADAEAAADQAAAFgDADQgCADgGAAQgFAAgCgDg");
	this.shape_501.setTransform(182.225,209.325);

	this.shape_502 = new cjs.Shape();
	this.shape_502.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_502.setTransform(174.175,204.925);

	this.shape_503 = new cjs.Shape();
	this.shape_503.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_503.setTransform(163.175,205.025);

	this.shape_504 = new cjs.Shape();
	this.shape_504.graphics.f("#FFFFFF").s().p("AgWBFQgKgEgHgIIAKgLQALAOASAAQAMAAAHgIQAIgHAAgOIAAgIQgMAMgRAAQgSAAgMgPQgLgPAAgZQAAgZALgOQALgPATAAQASAAAMAOIAAgMIARAAIAABnQgBAUgMAMQgLAMgVAAQgLAAgLgGgAgSgwQgHAKAAAUQAAASAHAKQAHAJAMABQARAAAJgQIAAgvQgJgPgRAAQgLAAgIAKg");
	this.shape_504.setTransform(151.95,207);

	this.shape_505 = new cjs.Shape();
	this.shape_505.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_505.setTransform(141.025,204.925);

	this.shape_506 = new cjs.Shape();
	this.shape_506.graphics.f("#FFFFFF").s().p("AgfAsQgKgKABgTIAAhEIASAAIAABDQAAAYATAAQATAAAIgPIAAhMIARAAIAABpIgRAAIAAgLQgKANgUAAQgRAAgIgKg");
	this.shape_506.setTransform(129.95,205.125);

	this.shape_507 = new cjs.Shape();
	this.shape_507.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgLAMIAAAlIgSAAIAAiVIASAAIAABaIAJgMIAggiIAWAAIgoArIAsA+g");
	this.shape_507.setTransform(120.05,202.8);

	this.shape_508 = new cjs.Shape();
	this.shape_508.graphics.f("#FFFFFF").s().p("AgVBFQgMgEgFgIIAJgLQAMAOARAAQALAAAIgIQAHgHABgOIAAgIQgLAMgSAAQgSAAgMgPQgMgPAAgZQAAgZAMgOQALgPATAAQATAAAKAOIABgMIAQAAIAABnQABAUgMAMQgNAMgUAAQgLAAgKgGgAgSgwQgHAKgBAUQABASAHAKQAHAJAMABQARAAAJgQIAAgvQgJgPgRAAQgMAAgHAKg");
	this.shape_508.setTransform(108.5,207);

	this.shape_509 = new cjs.Shape();
	this.shape_509.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_509.setTransform(97.575,204.925);

	this.shape_510 = new cjs.Shape();
	this.shape_510.graphics.f("#FFFFFF").s().p("AgIBIIAAhpIARAAIAABpgAgHg2QgDgCAAgFQAAgEADgDQACgDAFAAQAFAAADADQACADABAEQgBAFgCACQgDADgFAAQgFAAgCgDg");
	this.shape_510.setTransform(89.65,203.1);

	this.shape_511 = new cjs.Shape();
	this.shape_511.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_511.setTransform(84.775,202.8);

	this.shape_512 = new cjs.Shape();
	this.shape_512.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgJAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgXAAQgSAAgGAQIAABMIgSAAIAAhpIARAAIAAAMQANgOATAAQAWAAAHARQAGgHAIgFQAJgFALAAQAiAAABAlIAABGg");
	this.shape_512.setTransform(868.25,175.925);

	this.shape_513 = new cjs.Shape();
	this.shape_513.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_513.setTransform(854.325,176.025);

	this.shape_514 = new cjs.Shape();
	this.shape_514.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAOQgHADgHAAQgMAAgFgIg");
	this.shape_514.setTransform(845.375,174.85);

	this.shape_515 = new cjs.Shape();
	this.shape_515.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgGgIQgFgIAAgKIASAAQAAAJAHAGQAHAFAKAAQALAAAFgEQAHgEAAgHQgBgIgFgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgEgGAAgIQAAgNALgJQAMgJAPAAQATAAALAJQALAKAAAOIgSAAQAAgHgHgGQgGgFgKAAQgIAAgGAEQgFAFAAAHQgBAGAGADQAFAEANADQANADAIAEQAJADAEAGQAEAGAAAIQAAAPgLAIQgMAJgSAAQgLAAgKgFg");
	this.shape_515.setTransform(837.25,176.025);

	this.shape_516 = new cjs.Shape();
	this.shape_516.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg1QgDgEAAgEQAAgEADgDQACgDAFAAQAFAAADADQADADAAAEQAAAEgDAEQgDACgFAAQgFAAgCgCg");
	this.shape_516.setTransform(829.7,174.1);

	this.shape_517 = new cjs.Shape();
	this.shape_517.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgFgIQgGgIAAgKIASAAQAAAJAHAGQAHAFAKAAQAKAAAHgEQAFgEABgHQAAgIgGgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgDgGAAgIQAAgNALgJQALgJAPAAQASAAALAJQAMAKAAAOIgTAAQAAgHgFgGQgHgFgKAAQgJAAgFAEQgGAFABAHQAAAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgJgFg");
	this.shape_517.setTransform(822.1,176.025);

	this.shape_518 = new cjs.Shape();
	this.shape_518.graphics.f("#FFFFFF").s().p("AghAoQgOgPAAgZIAAAAQAAgQAGgMQAGgMALgHQALgHANAAQAVAAAOAPQANAPAAAYIAAABQAAAQgGAMQgGAMgLAHQgLAHgOAAQgUAAgNgPgAgVgcQgIAKAAATQAAASAIAKQAJALAMAAQAOAAAIgLQAIgLAAgSQAAgRgIgLQgIgLgOAAQgMAAgJALg");
	this.shape_518.setTransform(811.25,176.025);

	this.shape_519 = new cjs.Shape();
	this.shape_519.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgMAMIAAAlIgSAAIAAiVIASAAIAABZIAKgLIAggiIAWAAIgoArIAtA+g");
	this.shape_519.setTransform(801.15,173.8);

	this.shape_520 = new cjs.Shape();
	this.shape_520.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_520.setTransform(790.225,176.025);

	this.shape_521 = new cjs.Shape();
	this.shape_521.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_521.setTransform(768.975,175.925);

	this.shape_522 = new cjs.Shape();
	this.shape_522.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_522.setTransform(757.975,176.025);

	this.shape_523 = new cjs.Shape();
	this.shape_523.graphics.f("#FFFFFF").s().p("AgWBFQgLgEgGgIIAKgMQALAPASAAQAMAAAHgIQAIgHAAgNIAAgJQgMAMgRAAQgTAAgLgPQgLgPAAgZQAAgZALgOQALgPATABQASAAAMANIAAgMIARAAIAABnQAAAUgNAMQgMAMgUAAQgLgBgLgFgAgSgwQgHAKAAAUQAAASAHAJQAHAKANAAQAQAAAJgPIAAgvQgJgPgQAAQgMAAgIAKg");
	this.shape_523.setTransform(746.75,178);

	this.shape_524 = new cjs.Shape();
	this.shape_524.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_524.setTransform(735.825,175.925);

	this.shape_525 = new cjs.Shape();
	this.shape_525.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_525.setTransform(724.825,176.025);

	this.shape_526 = new cjs.Shape();
	this.shape_526.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgNATAAQATgBALAPQALAPAAAYIAAABQAAAYgLAQQgLAOgTAAQgTAAgLgOgAgaAAIAAAsQAJAQARAAQAMAAAIgKQAHgJAAgVQAAgSgHgJQgHgKgNAAQgSgBgIASg");
	this.shape_526.setTransform(714.025,173.9);

	this.shape_527 = new cjs.Shape();
	this.shape_527.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgJAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgXAAQgSAAgGAQIAABMIgSAAIAAhpIARAAIAAAMQANgOATAAQAWAAAHARQAGgHAIgFQAJgFALAAQAiAAABAlIAABGg");
	this.shape_527.setTransform(699.4,175.925);

	this.shape_528 = new cjs.Shape();
	this.shape_528.graphics.f("#FFFFFF").s().p("AgIBIIAAhpIARAAIAABpgAgHg1QgCgEAAgEQAAgEACgDQADgDAEAAQAFAAADADQACADABAEQgBAEgCAEQgDACgFAAQgFAAgCgCg");
	this.shape_528.setTransform(688.25,174.1);

	this.shape_529 = new cjs.Shape();
	this.shape_529.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_529.setTransform(680.625,176.025);

	this.shape_530 = new cjs.Shape();
	this.shape_530.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgFgIQgGgIAAgKIASAAQAAAJAHAGQAHAFAKAAQAKAAAGgEQAGgEABgHQAAgIgGgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgDgGAAgIQgBgNALgJQAMgJAPAAQASAAALAJQAMAKAAAOIgSAAQgBgHgFgGQgHgFgKAAQgJAAgFAEQgGAFABAHQAAAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgJgFg");
	this.shape_530.setTransform(670.1,176.025);

	this.shape_531 = new cjs.Shape();
	this.shape_531.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_531.setTransform(659.775,176.025);

	this.shape_532 = new cjs.Shape();
	this.shape_532.graphics.f("#FFFFFF").s().p("AAWBLIgkgxIgKAMIAAAlIgSAAIAAiVIASAAIAABZIAJgLIAggiIAWAAIgoArIAtA+g");
	this.shape_532.setTransform(650,173.8);

	this.shape_533 = new cjs.Shape();
	this.shape_533.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg1QgCgEAAgEQAAgEACgDQACgDAFAAQAFAAADADQACADAAAEQAAAEgCAEQgDACgFAAQgFAAgCgCg");
	this.shape_533.setTransform(631.5,174.1);

	this.shape_534 = new cjs.Shape();
	this.shape_534.graphics.f("#FFFFFF").s().p("AgWBFQgKgEgHgIIAKgMQALAPARAAQANAAAHgIQAIgHgBgNIAAgJQgKAMgSAAQgTAAgLgPQgMgPABgZQgBgZAMgOQALgPATABQASAAAMANIAAgMIAQAAIAABnQAAAUgMAMQgMAMgUAAQgLgBgLgFgAgSgwQgIAKABAUQgBASAIAJQAHAKANAAQARAAAHgPIAAgvQgIgPgQAAQgNAAgHAKg");
	this.shape_534.setTransform(623.25,178);

	this.shape_535 = new cjs.Shape();
	this.shape_535.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_535.setTransform(612.375,176.025);

	this.shape_536 = new cjs.Shape();
	this.shape_536.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgNATAAQATgBALAPQALAPAAAYIAAABQAAAYgLAQQgLAOgTAAQgTAAgLgOgAgaAAIAAAsQAJAQARAAQAMAAAIgKQAHgJAAgVQAAgSgHgJQgHgKgNAAQgSgBgIASg");
	this.shape_536.setTransform(601.575,173.9);

	this.shape_537 = new cjs.Shape();
	this.shape_537.graphics.f("#FFFFFF").s().p("AgWBFQgKgEgHgIIAKgMQALAPARAAQANAAAHgIQAIgHgBgNIAAgJQgKAMgSAAQgTAAgLgPQgMgPABgZQgBgZAMgOQALgPATABQASAAAMANIAAgMIAQAAIAABnQAAAUgMAMQgLAMgVAAQgKgBgMgFgAgSgwQgIAKABAUQgBASAIAJQAHAKANAAQARAAAHgPIAAgvQgIgPgQAAQgNAAgHAKg");
	this.shape_537.setTransform(579.6,178);

	this.shape_538 = new cjs.Shape();
	this.shape_538.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_538.setTransform(568.675,175.925);

	this.shape_539 = new cjs.Shape();
	this.shape_539.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg1QgDgEABgEQgBgEADgDQACgDAFAAQAFAAADADQADADgBAEQABAEgDAEQgDACgFAAQgFAAgCgCg");
	this.shape_539.setTransform(560.75,174.1);

	this.shape_540 = new cjs.Shape();
	this.shape_540.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAOQgHADgHAAQgMAAgFgIg");
	this.shape_540.setTransform(554.725,174.85);

	this.shape_541 = new cjs.Shape();
	this.shape_541.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_541.setTransform(546.225,175.925);

	this.shape_542 = new cjs.Shape();
	this.shape_542.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_542.setTransform(535.525,176.025);

	this.shape_543 = new cjs.Shape();
	this.shape_543.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABALQALgNASAAQAUAAALAOQALAPAAAZIAAACQAAAXgLAPQgLAPgTAAQgSAAgMgNIAAAzgAgagrIAAAxQAJAOAQABQAMAAAIgKQAIgLAAgTQAAgSgIgLQgIgKgMAAQgQAAgJAPg");
	this.shape_543.setTransform(524.775,177.95);

	this.shape_544 = new cjs.Shape();
	this.shape_544.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAOQgHADgHAAQgMAAgFgIg");
	this.shape_544.setTransform(505.025,174.85);

	this.shape_545 = new cjs.Shape();
	this.shape_545.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_545.setTransform(496.575,176.025);

	this.shape_546 = new cjs.Shape();
	this.shape_546.graphics.f("#FFFFFF").s().p("AgVBFQgMgEgFgIIAJgMQAMAPAQAAQAMAAAIgIQAHgHAAgNIAAgJQgKAMgSAAQgSAAgMgPQgMgPAAgZQAAgZAMgOQALgPATABQATAAAKANIABgMIAQAAIAABnQABAUgMAMQgNAMgUAAQgKgBgLgFgAgSgwQgIAKAAAUQAAASAIAJQAHAKAMAAQASAAAHgPIAAgvQgIgPgRAAQgMAAgHAKg");
	this.shape_546.setTransform(485.35,178);

	this.shape_547 = new cjs.Shape();
	this.shape_547.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_547.setTransform(474.425,175.925);

	this.shape_548 = new cjs.Shape();
	this.shape_548.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_548.setTransform(463.425,176.025);

	this.shape_549 = new cjs.Shape();
	this.shape_549.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgGgIQgFgIAAgKIASAAQAAAJAHAGQAHAFAKAAQALAAAFgEQAHgEAAgHQgBgIgFgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgDgGAAgIQgBgNALgJQAMgJAPAAQATAAAKAJQAMAKAAAOIgSAAQgBgHgGgGQgGgFgKAAQgJAAgFAEQgFAFAAAHQAAAGAEADQAGAEANADQANADAIAEQAJADAEAGQAEAGAAAIQAAAPgLAIQgMAJgSAAQgLAAgKgFg");
	this.shape_549.setTransform(452.85,176.025);

	this.shape_550 = new cjs.Shape();
	this.shape_550.graphics.f("#FFFFFF").s().p("AgMA3QgPAAgIgJQgJgJABgNQABgRAOgIQANgJAWAAIASAAIABgJQABgJgEgGQgFgFgKAAQgIgBgHAFQgGAFgCAHIgSAAQABgJAGgHQAHgHAJgEQAKgEAKAAQARAAAJAKQAJAKgBAQIgJAzIgBAHIACALIgBACIgSAAIAAgGIAAgFQgOANgOAAIgBAAgAgPAHQgJAFgBAKQgBAHAFAFQADAFAJAAQAJAAAGgEQAHgEAGgIIAEgWIgOAAQgPAAgJAGg");
	this.shape_550.setTransform(431.7,176.0231);

	this.shape_551 = new cjs.Shape();
	this.shape_551.graphics.f("#FFFFFF").s().p("AgSBMQgPgBgJgLQgIgLgBgTIAAgNQADgQAGgMQAHgNAKgHQALgGAMAAQAQAAAKANIALg3IARAAIgaCVIgQAAIABgMQgLAOgRAAIgBAAgAgRgLQgIAGgEALQgEAMgBANQAAAOAGAHQAFAIAKAAQAPABALgQIAIgwQgFgOgQgBQgJAAgIAHg");
	this.shape_551.setTransform(421.6,173.9009);

	this.shape_552 = new cjs.Shape();
	this.shape_552.graphics.f("#FFFFFF").s().p("AgUBIIAShoIARAAIgSBogAADg1QgCgDAAgEQAAgFADgDQACgDAFAAQAEAAADADQADADAAAEQAAAFgDADQgCADgFAAIgCAAQgDAAgDgDg");
	this.shape_552.setTransform(413.425,174.0964);

	this.shape_553 = new cjs.Shape();
	this.shape_553.graphics.f("#FFFFFF").s().p("AgVBLIAZiVIASAAIgZCVg");
	this.shape_553.setTransform(408.675,173.8);

	this.shape_554 = new cjs.Shape();
	this.shape_554.graphics.f("#FFFFFF").s().p("AghAoQgMgOACgWIABgEQABgPAIgNQAIgNALgHQALgGAMAAQAQABAJAKQAJAKABASQABAHgBAGIgBAHIhEAAQgCAOAHALQAGAKANAAQAPAAANgOIAKAIQgHAKgKAGQgLAFgMAAQgTgBgLgOgAgKggQgJAIgEAPIAyAAIAAgBQACgNgFgIQgGgIgKAAQgKAAgIAHg");
	this.shape_554.setTransform(400.9435,176.0232);

	this.shape_555 = new cjs.Shape();
	this.shape_555.graphics.f("#FFFFFF").s().p("AARA2IALhFQABgEAAgFQgCgNgPgBQgOAAgMARIgOBLIgRAAIAShpIARAAIgDANQAOgPASAAQAPABAHAJQAHAKgCATIgLBEg");
	this.shape_555.setTransform(389.8382,175.9242);

	this.shape_556 = new cjs.Shape();
	this.shape_556.graphics.f("#FFFFFF").s().p("AARA2IALhFQABgEAAgFQgCgNgPgBQgOAAgMARIgOBLIgRAAIAShpIARAAIgDANQAOgPASAAQAPABAHAJQAHAKgCATIgLBEg");
	this.shape_556.setTransform(379.0382,175.9242);

	this.shape_557 = new cjs.Shape();
	this.shape_557.graphics.f("#FFFFFF").s().p("AArBHIgHglIg5AAIgTAlIgUAAIBNiNIAQAAIAcCNgAgMASIAtAAIgMhBg");
	this.shape_557.setTransform(366.625,174.2);

	this.shape_558 = new cjs.Shape();
	this.shape_558.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgJAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgXAAQgSAAgGAQIAABMIgSAAIAAhpIARAAIAAAMQAMgOAUAAQAWAAAHARQAGgHAIgFQAJgFALAAQAiAAABAlIAABGg");
	this.shape_558.setTransform(342.2,175.925);

	this.shape_559 = new cjs.Shape();
	this.shape_559.graphics.f("#FFFFFF").s().p("AggAsQgIgKgBgTIAAhEIASAAIAABDQAAAYAUAAQATAAAHgPIAAhMIASAAIAABpIgQAAIgBgLQgLANgTAAQgRAAgJgKg");
	this.shape_559.setTransform(327.9,176.125);

	this.shape_560 = new cjs.Shape();
	this.shape_560.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_560.setTransform(319.975,173.8);

	this.shape_561 = new cjs.Shape();
	this.shape_561.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg1QgCgEAAgEQAAgEACgDQACgDAFAAQAFAAADADQACADAAAEQAAAEgCAEQgDACgFAAQgFAAgCgCg");
	this.shape_561.setTransform(315.15,174.1);

	this.shape_562 = new cjs.Shape();
	this.shape_562.graphics.f("#FFFFFF").s().p("AgrBHIAAiNIBXAAIAAAPIhEAAIAAAxIA6AAIAAAOIg6AAIAAA/g");
	this.shape_562.setTransform(307.7,174.2);

	this.shape_563 = new cjs.Shape();
	this.shape_563.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgKAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgWAAQgSAAgHAQIAABMIgSAAIAAhpIARAAIAAAMQANgOATAAQAWAAAHARQAFgHAJgFQAJgFALAAQAjAAAAAlIAABGg");
	this.shape_563.setTransform(282.5,175.925);

	this.shape_564 = new cjs.Shape();
	this.shape_564.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_564.setTransform(268.275,176.025);

	this.shape_565 = new cjs.Shape();
	this.shape_565.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_565.setTransform(260.425,173.8);

	this.shape_566 = new cjs.Shape();
	this.shape_566.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_566.setTransform(252.525,176.025);

	this.shape_567 = new cjs.Shape();
	this.shape_567.graphics.f("#FFFFFF").s().p("AggA9QgMgPABgZIAAgBQgBgXAMgPQALgPATABQASgBAKANIAAg3IASAAIAACVIgQAAIgBgLQgLANgSAAQgTAAgLgPgAgSgHQgIAJABAUQgBATAIAJQAHAKANAAQARAAAHgPIAAgwQgHgOgRAAQgNAAgHAKg");
	this.shape_567.setTransform(241.2,173.9);

	this.shape_568 = new cjs.Shape();
	this.shape_568.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgGgIQgFgIAAgKIASAAQAAAJAHAGQAHAFAKAAQALAAAFgEQAHgEAAgHQgBgIgFgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgEgGAAgIQAAgNALgJQAMgJAPAAQATAAALAJQALAKAAAOIgSAAQAAgHgHgGQgGgFgKAAQgIAAgGAEQgFAFgBAHQAAAGAGADQAFAEANADQANADAIAEQAJADAEAGQAEAGAAAIQAAAPgLAIQgMAJgSAAQgLAAgKgFg");
	this.shape_568.setTransform(220.3,176.025);

	this.shape_569 = new cjs.Shape();
	this.shape_569.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_569.setTransform(209.975,176.025);

	this.shape_570 = new cjs.Shape();
	this.shape_570.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg1QgCgEgBgEQABgEACgDQACgDAFAAQAFAAADADQACADAAAEQAAAEgCAEQgDACgFAAQgFAAgCgCg");
	this.shape_570.setTransform(202.2,174.1);

	this.shape_571 = new cjs.Shape();
	this.shape_571.graphics.f("#FFFFFF").s().p("AgVAyQgJgEgFgIQgGgIAAgKIASAAQABAJAGAGQAHAFAKAAQAKAAAHgEQAFgEAAgHQABgIgGgEQgFgEgNgDQgOgDgIgDQgIgEgDgFQgEgGgBgIQAAgNAMgJQAKgJARAAQARAAAMAJQALAKAAAOIgTAAQAAgHgFgGQgHgFgJAAQgKAAgFAEQgGAFAAAHQABAGAFADQAFAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgKgFg");
	this.shape_571.setTransform(194.6,176.025);

	this.shape_572 = new cjs.Shape();
	this.shape_572.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_572.setTransform(184.275,176.025);

	this.shape_573 = new cjs.Shape();
	this.shape_573.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABALQALgNASAAQAUAAALAOQALAPAAAZIAAACQAAAXgLAPQgLAPgTAAQgSAAgMgNIAAAzgAgagrIAAAxQAJAOAQABQAMAAAIgKQAIgLAAgTQAAgSgIgLQgIgKgMAAQgQAAgJAPg");
	this.shape_573.setTransform(173.525,177.95);

	this.shape_574 = new cjs.Shape();
	this.shape_574.graphics.f("#FFFFFF").s().p("AgVAyQgJgEgFgIQgGgIAAgKIASAAQAAAJAHAGQAHAFAKAAQAKAAAHgEQAFgEAAgHQABgIgGgEQgFgEgNgDQgOgDgIgDQgIgEgDgFQgFgGAAgIQAAgNAMgJQAKgJARAAQARAAAMAJQALAKAAAOIgTAAQABgHgHgGQgGgFgJAAQgJAAgGAEQgGAFAAAHQABAGAFADQAFAEAMADQAOADAIAEQAJADAEAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgKgFg");
	this.shape_574.setTransform(162.55,176.025);

	this.shape_575 = new cjs.Shape();
	this.shape_575.graphics.f("#FFFFFF").s().p("AgXAIIAAgOIAvAAIAAAOg");
	this.shape_575.setTransform(154.65,175.25);

	this.shape_576 = new cjs.Shape();
	this.shape_576.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgGgIQgFgIAAgKIASAAQAAAJAHAGQAHAFAKAAQAKAAAHgEQAFgEABgHQAAgIgGgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgDgGAAgIQgBgNALgJQAMgJAPAAQATAAAKAJQAMAKAAAOIgSAAQgBgHgFgGQgHgFgKAAQgJAAgFAEQgGAFABAHQAAAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgJgFg");
	this.shape_576.setTransform(146.75,176.025);

	this.shape_577 = new cjs.Shape();
	this.shape_577.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_577.setTransform(136.425,176.025);

	this.shape_578 = new cjs.Shape();
	this.shape_578.graphics.f("#FFFFFF").s().p("AgIBIIAAhpIARAAIAABpgAgHg1QgDgEABgEQgBgEADgDQADgDAEAAQAFAAADADQADADgBAEQABAEgDAEQgDACgFAAQgEAAgDgCg");
	this.shape_578.setTransform(128.65,174.1);

	this.shape_579 = new cjs.Shape();
	this.shape_579.graphics.f("#FFFFFF").s().p("AgVAyQgJgEgGgIQgFgIAAgKIASAAQABAJAGAGQAHAFAKAAQALAAAFgEQAHgEgBgHQAAgIgFgEQgFgEgNgDQgOgDgIgDQgIgEgDgFQgFgGAAgIQABgNAKgJQALgJARAAQARAAAMAJQALAKAAAOIgTAAQABgHgHgGQgGgFgJAAQgJAAgGAEQgFAFgBAHQAAAGAGADQAFAEANADQANADAIAEQAJADAEAGQAEAGAAAIQAAAPgLAIQgMAJgSAAQgLAAgLgFg");
	this.shape_579.setTransform(121.05,176.025);

	this.shape_580 = new cjs.Shape();
	this.shape_580.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_580.setTransform(110.725,176.025);

	this.shape_581 = new cjs.Shape();
	this.shape_581.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABALQALgNASAAQAUAAALAOQALAPAAAZIAAACQAAAXgLAPQgLAPgTAAQgSAAgMgNIAAAzgAgagrIAAAxQAJAOAQABQAMAAAIgKQAIgLAAgTQAAgSgIgLQgIgKgMAAQgQAAgJAPg");
	this.shape_581.setTransform(99.975,177.95);

	this.shape_582 = new cjs.Shape();
	this.shape_582.graphics.f("#FFFFFF").s().p("AgYBEQgNgHgHgJQgGgKAAgMIASAAQAAANAJAHQAKAIAPgBQAPAAAIgFQAIgHAAgKQAAgKgIgGQgHgGgSgFQgYgIgLgIQgLgLAAgPQAAgQAOgLQANgLAUAAQAPAAAMAGQAKAFAHAKQAHAKgBAMIgTAAQABgNgJgIQgIgHgPAAQgMAAgJAGQgHAHAAAKQAAAJAHAGQAHAGARAFQASAFAKAFQAKAGAFAIQAFAIgBALQAAARgNAKQgOALgWAAQgOAAgMgFg");
	this.shape_582.setTransform(88.3,174.2);

	this.btnBack3 = new lib.btnKIBack();
	this.btnBack3.name = "btnBack3";
	this.btnBack3.setTransform(756,504.8);
	new cjs.ButtonHelper(this.btnBack3, 0, 1, 2, false, new lib.btnKIBack(), 3);

	this.btnNextDasar1 = new lib.btnKINext();
	this.btnNextDasar1.name = "btnNextDasar1";
	this.btnNextDasar1.setTransform(885.8,504.8);
	new cjs.ButtonHelper(this.btnNextDasar1, 0, 1, 2, false, new lib.btnKINext(), 3);

	this.btnMenuDasar1 = new lib.btnMenuKI();
	this.btnMenuDasar1.name = "btnMenuDasar1";
	this.btnMenuDasar1.setTransform(623.75,504.8);
	new cjs.ButtonHelper(this.btnMenuDasar1, 0, 1, 2, false, new lib.btnMenuKI(), 3);

	this.judulKI = new lib.gambarLapisan();
	this.judulKI.name = "judulKI";
	this.judulKI.setTransform(526.45,310.95,2.2889,5.4196,0,0,0,0.8,0.6);
	this.judulKI.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);

	this.shape_583 = new cjs.Shape();
	this.shape_583.graphics.f("#FFFFFF").s().p("AghApQgJgIABgLQABgQAMgHQAMgJAUABIAMAAIABgGIAAgGQAAgEgDgCQgCgDgFABQgGgBgDADQgEADgBAGIgZAAQABgNAMgJQAMgJAQABQAQAAAKAKQAJAIgCAPIgHAsIgBAGQAAAGACAFIAAABIgYAAQgCgDABgFQgLALgNAAQgMgBgIgIgAgNANQgCADgBADQgBAFADADQADADAEAAQAKAAAIgKIADgPIgIgBQgNAAgGAJg");
	this.shape_583.setTransform(747.2843,97.8);

	this.shape_584 = new cjs.Shape();
	this.shape_584.graphics.f("#FFFFFF").s().p("AgiA/QgHgEgDgIQgEgJAAgKIAAgMIAAgDQACgPAHgKQAFgLAJgGQAJgEALAAQAMAAAIAKIAJgxIAZAAIgXCGIgWAAIABgKQgJANgPAAQgIgBgHgFgAgPgCQgGAHgCAPIgBAMQABAPAMAAQAKABAHgKIAHgmQgEgJgJAAQgJAAgGAHg");
	this.shape_584.setTransform(738.3625,95.9);

	this.shape_585 = new cjs.Shape();
	this.shape_585.graphics.f("#FFFFFF").s().p("AgXBCIARhdIAYAAIgRBdgAAAgrQgDgDAAgGQgBgGAEgEQAEgDAFAAQAGgBAEAEQAEAEAAAFQABAGgEAEQgEAEgGAAQgGAAgEgEg");
	this.shape_585.setTransform(730.8028,95.9);

	this.shape_586 = new cjs.Shape();
	this.shape_586.graphics.f("#FFFFFF").s().p("AgXBDIAXiGIAYAAIgXCGg");
	this.shape_586.setTransform(726.175,95.8);

	this.shape_587 = new cjs.Shape();
	this.shape_587.graphics.f("#FFFFFF").s().p("AgXArQgKgGgFgLQgFgKACgMIAAgEQABgNAHgMQAHgLAKgHQALgFAMAAQASAAAKANQAJANgCAVIgCAJIg5AAQAAAKAFAFQAEAGAIAAQANAAALgLIALAPQgFAHgLAFQgKAFgKAAQgNgBgJgGgAgGgYQgFAFgEALIAhAAIABgCIAAgHQgBgFgEgDQgDgDgFAAQgGAAgGAEg");
	this.shape_587.setTransform(718.8087,97.8);

	this.shape_588 = new cjs.Shape();
	this.shape_588.graphics.f("#FFFFFF").s().p("AAKAwIAKg7IAAgHQgBgJgKAAQgJAAgHAJIgMBCIgZAAIARhdIAXAAIgCAKQAKgMAQAAQAOAAAGAKQAHAJgCARIgKA7g");
	this.shape_588.setTransform(708.7235,97.7);

	this.shape_589 = new cjs.Shape();
	this.shape_589.graphics.f("#FFFFFF").s().p("AAKAwIAKg7IAAgHQgBgJgKAAQgJAAgHAJIgMBCIgZAAIARhdIAXAAIgCAKQAKgMAQAAQAOAAAGAKQAHAJgCARIgKA7g");
	this.shape_589.setTransform(698.9235,97.7);

	this.shape_590 = new cjs.Shape();
	this.shape_590.graphics.f("#FFFFFF").s().p("AAgBAIgEgaIgsAAIgNAaIgcAAIBDh/IAYAAIAYB/gAgFARIAeAAIgIgwg");
	this.shape_590.setTransform(687.525,96.15);

	this.shape_591 = new cjs.Shape();
	this.shape_591.graphics.f("#FFFFFF").s().p("AAqAwIAAg7QAAgIgCgEQgEgDgIgBQgLABgEAKIAABAIgZAAIAAg7QAAgIgDgEQgEgDgHgBQgLAAgFAJIAABCIgZAAIAAhdIAXAAIABAKQAKgMARAAQASAAAHAOQAKgOASAAQAQAAAHAJQAIAIAAATIAAA7g");
	this.shape_591.setTransform(670.3,97.7);

	this.shape_592 = new cjs.Shape();
	this.shape_592.graphics.f("#FFFFFF").s().p("AggAoQgIgKAAgQIAAg9IAZAAIAAA8QAAAPAOAAQAMAAAFgJIAAhCIAZAAIAABdIgYAAIgBgJQgJAMgQAAQgPgBgIgIg");
	this.shape_592.setTransform(657.475,97.9);

	this.shape_593 = new cjs.Shape();
	this.shape_593.graphics.f("#FFFFFF").s().p("AgMBDIAAiGIAZAAIAACGg");
	this.shape_593.setTransform(650.075,95.8);

	this.shape_594 = new cjs.Shape();
	this.shape_594.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgEAAgFQAAgGAEgEQADgDAGAAQAHAAADADQAEAEAAAGQAAAFgEAEQgEAEgGAAQgFAAgEgEg");
	this.shape_594.setTransform(645.325,95.9);

	this.shape_595 = new cjs.Shape();
	this.shape_595.graphics.f("#FFFFFF").s().p("AgoBAIAAh/IBRAAIAAAVIg3AAIAAAiIAxAAIAAATIgxAAIAAA1g");
	this.shape_595.setTransform(638.45,96.15);

	this.shape_596 = new cjs.Shape();
	this.shape_596.graphics.f("#FFFFFF").s().p("AArAwIAAg7QgBgIgDgEQgCgDgIgBQgMABgFAKIAABAIgYAAIAAg7QAAgIgDgEQgEgDgHgBQgLAAgFAJIAABCIgZAAIAAhdIAYAAIABAKQAKgMARAAQARAAAHAOQAKgOASAAQAQAAAIAJQAHAIAAATIAAA7g");
	this.shape_596.setTransform(620.85,97.7);

	this.shape_597 = new cjs.Shape();
	this.shape_597.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgGgDgFQgEgDgGAAQgGAAgEACQgEADAAAGIgZAAQAAgIAFgIQAFgHAJgEQAKgDAKAAQASAAAKAJQAKAIAAAQIAAAoQABAOADAHIAAABIgZAAQgCgDgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgPIgJAAQgTAAgBAMg");
	this.shape_597.setTransform(608.225,97.8);

	this.shape_598 = new cjs.Shape();
	this.shape_598.graphics.f("#FFFFFF").s().p("AgMBDIAAiGIAZAAIAACGg");
	this.shape_598.setTransform(601.025,95.8);

	this.shape_599 = new cjs.Shape();
	this.shape_599.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgGgDgFQgEgDgGAAQgGAAgEACQgEADAAAGIgZAAQAAgIAFgIQAFgHAJgEQAKgDAKAAQASAAAKAJQAKAIAAAQIAAAoQABAOADAHIAAABIgZAAQgCgDgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgPIgJAAQgTAAgBAMg");
	this.shape_599.setTransform(593.825,97.8);

	this.shape_600 = new cjs.Shape();
	this.shape_600.graphics.f("#FFFFFF").s().p("AggA3QgKgNAAgYQAAgVAKgNQAKgNARAAQANAAAJAKIAAgxIAaAAIAACGIgXAAIgBgKQgKANgOAAQgRAAgKgOgAgRAUQAAANAFAIQAFAHAIAAQALAAAFgKIAAgmQgEgJgMAAQgSABAAAcg");
	this.shape_600.setTransform(583.725,95.9);

	this.shape_601 = new cjs.Shape();
	this.shape_601.graphics.f("#FFFFFF").s().p("AgTAtQgKgFgGgGQgEgIgBgJIAYAAQABAHAFADQAEAEAHAAQAHAAAEgDQAEgDAAgEQAAgFgFgCQgFgDgIgCQgjgHABgVQAAgMAKgJQALgJAQABQARgBALAJQALAJAAANIgZAAQAAgFgEgEQgDgDgHAAQgGAAgDACQgEADAAAFQAAAFAEACQAEACAIACQAKACAGADQAVAGgBASQAAANgLAJQgLAHgRABQgMAAgIgFg");
	this.shape_601.setTransform(569.65,97.8);

	this.shape_602 = new cjs.Shape();
	this.shape_602.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgGgDgFQgEgDgGAAQgGAAgEACQgEADAAAGIgZAAQAAgIAFgIQAFgHAJgEQAKgDAKAAQASAAAKAJQAKAIAAAQIAAAoQABAOADAHIAAABIgZAAQgCgDgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgPIgJAAQgTAAgBAMg");
	this.shape_602.setTransform(560.275,97.8);

	this.shape_603 = new cjs.Shape();
	this.shape_603.graphics.f("#FFFFFF").s().p("AgMBDIAAiGIAZAAIAACGg");
	this.shape_603.setTransform(553.075,95.8);

	this.shape_604 = new cjs.Shape();
	this.shape_604.graphics.f("#FFFFFF").s().p("AgdAkQgNgNAAgVIAAgCQAAgNAGgMQAFgLAKgGQAKgHAMABQATAAAMAMQALAMAAAXIAAAJIg8AAQACAJAGAGQAGAGAJAAQAPAAAHgLIANAOQgFAIgKAFQgKAFgMAAQgUAAgNgOgAgKgXQgFAFgBAKIAiAAIAAgCQAAgJgEgEQgFgFgIAAQgGAAgFAFg");
	this.shape_604.setTransform(545.9,97.8);

	this.shape_605 = new cjs.Shape();
	this.shape_605.graphics.f("#FFFFFF").s().p("AAPBDIgYgmIgJAJIAAAdIgZAAIAAiGIAZAAIAABLIAFgHIAYgbIAeAAIgjAmIAmA3g");
	this.shape_605.setTransform(536.75,95.8);

	this.shape_606 = new cjs.Shape();
	this.shape_606.graphics.f("#FFFFFF").s().p("AgYAKIAAgTIAxAAIAAATg");
	this.shape_606.setTransform(527.775,97.075);

	this.shape_607 = new cjs.Shape();
	this.shape_607.graphics.f("#FFFFFF").s().p("AgUAtQgJgFgGgGQgEgIAAgJIAYAAQAAAHAEADQAFAEAHAAQAIAAADgDQAEgDAAgEQAAgFgFgCQgEgDgKgCQgigHAAgVQAAgMALgJQALgJAPABQATgBALAJQAKAJAAANIgZAAQAAgFgDgEQgEgDgIAAQgFAAgEACQgDADAAAFQAAAFAEACQAEACAJACQAJACAHADQATAGABASQgBANgKAJQgMAHgSABQgKAAgKgFg");
	this.shape_607.setTransform(519.65,97.8);

	this.shape_608 = new cjs.Shape();
	this.shape_608.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgGgDgFQgEgDgGAAQgGAAgEACQgEADAAAGIgZAAQAAgIAFgIQAFgHAJgEQAKgDAKAAQASAAAKAJQAKAIAAAQIAAAoQABAOADAHIAAABIgZAAQgCgDgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgPIgJAAQgTAAgBAMg");
	this.shape_608.setTransform(510.275,97.8);

	this.shape_609 = new cjs.Shape();
	this.shape_609.graphics.f("#FFFFFF").s().p("AgMBDIAAiGIAZAAIAACGg");
	this.shape_609.setTransform(503.075,95.8);

	this.shape_610 = new cjs.Shape();
	this.shape_610.graphics.f("#FFFFFF").s().p("AgdAkQgNgNAAgVIAAgCQAAgNAFgMQAGgLAKgGQAKgHAMABQAUAAALAMQALAMAAAXIAAAJIg7AAQABAJAGAGQAGAGAIAAQAPAAAJgLIAMAOQgGAIgKAFQgJAFgMAAQgUAAgNgOgAgKgXQgFAFgBAKIAiAAIAAgCQAAgJgEgEQgFgFgIAAQgGAAgFAFg");
	this.shape_610.setTransform(495.9,97.8);

	this.shape_611 = new cjs.Shape();
	this.shape_611.graphics.f("#FFFFFF").s().p("AAOBDIgWgmIgKAJIAAAdIgZAAIAAiGIAZAAIAABLIAFgHIAXgbIAfAAIgiAmIAlA3g");
	this.shape_611.setTransform(486.75,95.8);

	this.shape_612 = new cjs.Shape();
	this.shape_612.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgEAAgFQAAgGAEgEQADgDAGAAQAHAAADADQAEAEAAAGQAAAFgEAEQgEAEgGAAQgFAAgEgEg");
	this.shape_612.setTransform(474.475,95.9);

	this.shape_613 = new cjs.Shape();
	this.shape_613.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgGgDgFQgEgDgGAAQgGAAgEACQgEADAAAGIgZAAQAAgIAFgIQAFgHAJgEQAKgDAKAAQASAAAKAJQAKAIAAAQIAAAoQABAOADAHIAAABIgZAAQgCgDgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgPIgJAAQgTAAgBAMg");
	this.shape_613.setTransform(467.275,97.8);

	this.shape_614 = new cjs.Shape();
	this.shape_614.graphics.f("#FFFFFF").s().p("AAQAwIAAg7QAAgJgEgDQgDgDgJgBQgJAAgGAJIAABCIgZAAIAAhdIAYAAIABAKQAKgMAQAAQAPAAAIAJQAHAIAAASIAAA8g");
	this.shape_614.setTransform(457.375,97.7);

	this.shape_615 = new cjs.Shape();
	this.shape_615.graphics.f("#FFFFFF").s().p("AgdAkQgNgNAAgVIAAgCQAAgNAFgMQAGgLAKgGQAKgHAMABQATAAAMAMQALAMAAAXIAAAJIg8AAQACAJAGAGQAGAGAJAAQAPAAAHgLIANAOQgFAIgLAFQgJAFgMAAQgUAAgNgOgAgKgXQgFAFgBAKIAiAAIAAgCQAAgJgEgEQgFgFgIAAQgHAAgEAFg");
	this.shape_615.setTransform(447.55,97.8);

	this.shape_616 = new cjs.Shape();
	this.shape_616.graphics.f("#FFFFFF").s().p("AgWA/QgJgEgFgHIAKgPQAKAKAOAAQAJAAAFgFQAGgFAAgKIAAgFQgJAKgNAAQgRAAgLgOQgLgNAAgVIAAgCQAAgVALgOQALgNARAAQAOAAAJALIABgJIAYAAIAABbQgBAMgFAJQgGAKgKAEQgLAFgMAAQgLAAgKgEgAgMgmQgFAHAAAPQAAANAFAHQAFAHAIAAQAMAAAFgJIAAgnQgFgIgMAAQgIAAgFAHg");
	this.shape_616.setTransform(437.35,99.575);

	this.shape_617 = new cjs.Shape();
	this.shape_617.graphics.f("#FFFFFF").s().p("AAQAwIAAg7QAAgJgEgDQgDgDgJgBQgJAAgGAJIAABCIgZAAIAAhdIAYAAIABAKQAKgMAQAAQAPAAAIAJQAHAIAAASIAAA8g");
	this.shape_617.setTransform(427.325,97.7);

	this.shape_618 = new cjs.Shape();
	this.shape_618.graphics.f("#FFFFFF").s().p("AgdAkQgNgNAAgVIAAgCQAAgNAFgMQAGgLAKgGQAKgHAMABQAUAAALAMQALAMAAAXIAAAJIg8AAQACAJAGAGQAGAGAIAAQAPAAAJgLIAMAOQgFAIgLAFQgJAFgMAAQgUAAgNgOgAgKgXQgFAFgBAKIAiAAIAAgCQAAgJgEgEQgFgFgIAAQgHAAgEAFg");
	this.shape_618.setTransform(417.5,97.8);

	this.shape_619 = new cjs.Shape();
	this.shape_619.graphics.f("#FFFFFF").s().p("AAqAwIAAg7QAAgIgDgEQgDgDgHgBQgMABgFAKIAABAIgYAAIAAg7QAAgIgDgEQgDgDgIgBQgLAAgFAJIAABCIgZAAIAAhdIAYAAIABAKQAKgMARAAQARAAAHAOQAKgOATAAQAPAAAHAJQAIAIAAATIAAA7g");
	this.shape_619.setTransform(404.75,97.7);

	this.shape_620 = new cjs.Shape();
	this.shape_620.graphics.f("#FFFFFF").s().p("AAQBDIAAg7QAAgIgEgEQgDgEgJAAQgKABgFAHIAABDIgZAAIAAiGIAZAAIAAAzQAKgMAPAAQAfAAAAAjIAAA8g");
	this.shape_620.setTransform(387.425,95.8);

	this.shape_621 = new cjs.Shape();
	this.shape_621.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgEAAgFQAAgGAEgEQADgDAGAAQAHAAADADQAEAEAAAGQAAAFgEAEQgEAEgGAAQgFAAgEgEg");
	this.shape_621.setTransform(380.025,95.9);

	this.shape_622 = new cjs.Shape();
	this.shape_622.graphics.f("#FFFFFF").s().p("AgSA4IgBAKIgXAAIAAiGIAZAAIAAAxQAJgKAOAAQARAAAKAMQAKANAAAWIAAACQAAAWgKANQgKAOgRAAQgPAAgJgNgAgRAAIAAAmQAFAKAMAAQAMAAADgNQACgFAAgMQAAgPgEgFQgFgGgIgBQgMAAgFAJg");
	this.shape_622.setTransform(372.775,95.9);

	this.shape_623 = new cjs.Shape();
	this.shape_623.graphics.f("#FFFFFF").s().p("AgdAkQgNgNAAgVIAAgCQAAgNAFgMQAGgLAKgGQAKgHAMABQAUAAALAMQALAMAAAXIAAAJIg7AAQABAJAGAGQAGAGAIAAQAPAAAJgLIAMAOQgGAIgKAFQgJAFgMAAQgUAAgNgOgAgKgXQgFAFgBAKIAiAAIAAgCQAAgJgFgEQgEgFgIAAQgGAAgFAFg");
	this.shape_623.setTransform(362.7,97.8);

	this.shape_624 = new cjs.Shape();
	this.shape_624.graphics.f("#FFFFFF").s().p("AgMBDIAAiGIAZAAIAACGg");
	this.shape_624.setTransform(355.375,95.8);

	this.shape_625 = new cjs.Shape();
	this.shape_625.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgEAAgFQAAgGAEgEQADgDAGAAQAHAAADADQAEAEAAAGQAAAFgEAEQgEAEgGAAQgFAAgEgEg");
	this.shape_625.setTransform(346.125,95.9);

	this.shape_626 = new cjs.Shape();
	this.shape_626.graphics.f("#FFFFFF").s().p("AgMBDIAAiGIAZAAIAACGg");
	this.shape_626.setTransform(341.375,95.8);

	this.shape_627 = new cjs.Shape();
	this.shape_627.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgGgDgFQgEgDgGAAQgGAAgEACQgEADAAAGIgZAAQAAgIAFgIQAFgHAJgEQAKgDAKAAQASAAAKAJQAKAIAAAQIAAAoQABAOADAHIAAABIgZAAQgCgDgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgPIgJAAQgTAAgBAMg");
	this.shape_627.setTransform(334.175,97.8);

	this.shape_628 = new cjs.Shape();
	this.shape_628.graphics.f("#FFFFFF").s().p("AAQAwIAAg7QAAgJgEgDQgDgDgJgBQgJAAgGAJIAABCIgZAAIAAhdIAYAAIABAKQAKgMAQAAQAPAAAIAJQAHAIAAASIAAA8g");
	this.shape_628.setTransform(324.275,97.7);

	this.shape_629 = new cjs.Shape();
	this.shape_629.graphics.f("#FFFFFF").s().p("AgdAkQgNgNAAgVIAAgCQAAgNAFgMQAGgLAKgGQAKgHAMABQAUAAALAMQALAMAAAXIAAAJIg8AAQACAJAGAGQAGAGAJAAQAOAAAJgLIAMAOQgFAIgLAFQgJAFgMAAQgUAAgNgOgAgKgXQgFAFgBAKIAiAAIAAgCQAAgJgEgEQgFgFgIAAQgHAAgEAFg");
	this.shape_629.setTransform(314.45,97.8);

	this.shape_630 = new cjs.Shape();
	this.shape_630.graphics.f("#FFFFFF").s().p("AAOBDIgWgmIgKAJIAAAdIgZAAIAAiGIAZAAIAABLIAFgHIAYgbIAeAAIgjAmIAmA3g");
	this.shape_630.setTransform(305.3,95.8);

	this.shape_631 = new cjs.Shape();
	this.shape_631.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgGgDgFQgEgDgGAAQgGAAgEACQgEADAAAGIgZAAQAAgIAFgIQAFgHAJgEQAKgDAKAAQASAAAKAJQAKAIAAAQIAAAoQABAOADAHIAAABIgZAAQgCgDgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgPIgJAAQgTAAgBAMg");
	this.shape_631.setTransform(290.575,97.8);

	this.shape_632 = new cjs.Shape();
	this.shape_632.graphics.f("#FFFFFF").s().p("AgNAhIAAgyIgOAAIAAgTIAOAAIAAgXIAYAAIAAAXIAQAAIAAATIgQAAIAAAuQAAAGACACQACACAGAAIAHgBIAAAUQgHACgIAAQgaAAAAgbg");
	this.shape_632.setTransform(282.575,96.725);

	this.shape_633 = new cjs.Shape();
	this.shape_633.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgEAAgFQAAgGAEgEQADgDAGAAQAHAAADADQAEAEAAAGQAAAFgEAEQgEAEgGAAQgFAAgEgEg");
	this.shape_633.setTransform(277.275,95.9);

	this.shape_634 = new cjs.Shape();
	this.shape_634.graphics.f("#FFFFFF").s().p("AAPBDIgYgmIgJAJIAAAdIgZAAIAAiGIAZAAIAABLIAFgHIAXgbIAfAAIgiAmIAlA3g");
	this.shape_634.setTransform(270.7,95.8);

	this.shape_635 = new cjs.Shape();
	this.shape_635.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgEAAgFQAAgGAEgEQADgDAGAAQAHAAADADQAEAEAAAGQAAAFgEAEQgEAEgGAAQgFAAgEgEg");
	this.shape_635.setTransform(258.425,95.9);

	this.shape_636 = new cjs.Shape();
	this.shape_636.graphics.f("#FFFFFF").s().p("AgaAwIAAhdIAYAAIABAKQAGgMAOAAQAEAAAEABIgBAYIgJgBQgOAAgEALIAAA8g");
	this.shape_636.setTransform(253.175,97.7);

	this.shape_637 = new cjs.Shape();
	this.shape_637.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgGgDgFQgEgDgGAAQgGAAgEACQgEADAAAGIgZAAQAAgIAFgIQAFgHAJgEQAKgDAKAAQASAAAKAJQAKAIAAAQIAAAoQABAOADAHIAAABIgZAAQgCgDgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgPIgJAAQgTAAgBAMg");
	this.shape_637.setTransform(244.675,97.8);

	this.shape_638 = new cjs.Shape();
	this.shape_638.graphics.f("#FFFFFF").s().p("AApBAIAAgjIADg8IgjBfIgRAAIgjhfIADA8IAAAjIgaAAIAAh/IAiAAIAgBcIAhhcIAiAAIAAB/g");
	this.shape_638.setTransform(231.975,96.15);

	this.judulKI_1 = new lib.bg1();
	this.judulKI_1.name = "judulKI_1";
	this.judulKI_1.setTransform(523.7,95.05,1.7364,1.0347,0,0,0,0.4,0.3);
	this.judulKI_1.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);

	this.instance = new lib.Bitmap28();
	this.instance.setTransform(7,4);

	this.instance_1 = new lib.Bitmap5();
	this.instance_1.setTransform(-28,-39);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance},{t:this.judulKI_1},{t:this.shape_638},{t:this.shape_637},{t:this.shape_636},{t:this.shape_635},{t:this.shape_634},{t:this.shape_633},{t:this.shape_632},{t:this.shape_631},{t:this.shape_630},{t:this.shape_629},{t:this.shape_628},{t:this.shape_627},{t:this.shape_626},{t:this.shape_625},{t:this.shape_624},{t:this.shape_623},{t:this.shape_622},{t:this.shape_621},{t:this.shape_620},{t:this.shape_619},{t:this.shape_618},{t:this.shape_617},{t:this.shape_616},{t:this.shape_615},{t:this.shape_614},{t:this.shape_613},{t:this.shape_612},{t:this.shape_611},{t:this.shape_610},{t:this.shape_609},{t:this.shape_608},{t:this.shape_607},{t:this.shape_606},{t:this.shape_605},{t:this.shape_604},{t:this.shape_603},{t:this.shape_602},{t:this.shape_601},{t:this.shape_600},{t:this.shape_599},{t:this.shape_598},{t:this.shape_597},{t:this.shape_596},{t:this.shape_595},{t:this.shape_594},{t:this.shape_593},{t:this.shape_592},{t:this.shape_591},{t:this.shape_590},{t:this.shape_589},{t:this.shape_588},{t:this.shape_587},{t:this.shape_586},{t:this.shape_585},{t:this.shape_584},{t:this.shape_583},{t:this.judulKI},{t:this.btnMenuDasar1},{t:this.btnNextDasar1},{t:this.btnBack3},{t:this.shape_582},{t:this.shape_581},{t:this.shape_580},{t:this.shape_579},{t:this.shape_578},{t:this.shape_577},{t:this.shape_576},{t:this.shape_575},{t:this.shape_574},{t:this.shape_573},{t:this.shape_572},{t:this.shape_571},{t:this.shape_570},{t:this.shape_569},{t:this.shape_568},{t:this.shape_567},{t:this.shape_566},{t:this.shape_565},{t:this.shape_564},{t:this.shape_563},{t:this.shape_562},{t:this.shape_561},{t:this.shape_560},{t:this.shape_559},{t:this.shape_558},{t:this.shape_557},{t:this.shape_556},{t:this.shape_555},{t:this.shape_554},{t:this.shape_553},{t:this.shape_552},{t:this.shape_551},{t:this.shape_550},{t:this.shape_549},{t:this.shape_548},{t:this.shape_547},{t:this.shape_546},{t:this.shape_545},{t:this.shape_544},{t:this.shape_543},{t:this.shape_542},{t:this.shape_541},{t:this.shape_540},{t:this.shape_539},{t:this.shape_538},{t:this.shape_537},{t:this.shape_536},{t:this.shape_535},{t:this.shape_534},{t:this.shape_533},{t:this.shape_532},{t:this.shape_531},{t:this.shape_530},{t:this.shape_529},{t:this.shape_528},{t:this.shape_527},{t:this.shape_526},{t:this.shape_525},{t:this.shape_524},{t:this.shape_523},{t:this.shape_522},{t:this.shape_521},{t:this.shape_520},{t:this.shape_519},{t:this.shape_518},{t:this.shape_517},{t:this.shape_516},{t:this.shape_515},{t:this.shape_514},{t:this.shape_513},{t:this.shape_512},{t:this.shape_511},{t:this.shape_510},{t:this.shape_509},{t:this.shape_508},{t:this.shape_507},{t:this.shape_506},{t:this.shape_505},{t:this.shape_504},{t:this.shape_503},{t:this.shape_502},{t:this.shape_501},{t:this.shape_500},{t:this.shape_499},{t:this.shape_498},{t:this.shape_497},{t:this.shape_496},{t:this.shape_495},{t:this.shape_494},{t:this.shape_493},{t:this.shape_492},{t:this.shape_491},{t:this.shape_490},{t:this.shape_489},{t:this.shape_488},{t:this.shape_487},{t:this.shape_486},{t:this.shape_485},{t:this.shape_484},{t:this.shape_483},{t:this.shape_482},{t:this.shape_481},{t:this.shape_480},{t:this.shape_479},{t:this.shape_478},{t:this.shape_477},{t:this.shape_476},{t:this.shape_475},{t:this.shape_474},{t:this.shape_473},{t:this.shape_472},{t:this.shape_471},{t:this.shape_470},{t:this.shape_469},{t:this.shape_468},{t:this.shape_467},{t:this.shape_466},{t:this.shape_465},{t:this.shape_464},{t:this.shape_463},{t:this.shape_462},{t:this.shape_461},{t:this.shape_460},{t:this.shape_459},{t:this.shape_458},{t:this.shape_457},{t:this.shape_456},{t:this.shape_455},{t:this.shape_454},{t:this.shape_453},{t:this.shape_452},{t:this.shape_451},{t:this.shape_450},{t:this.shape_449},{t:this.shape_448},{t:this.shape_447},{t:this.shape_446},{t:this.shape_445},{t:this.shape_444},{t:this.shape_443},{t:this.shape_442},{t:this.shape_441},{t:this.shape_440},{t:this.shape_439},{t:this.shape_438},{t:this.shape_437},{t:this.shape_436},{t:this.shape_435},{t:this.shape_434},{t:this.shape_433},{t:this.shape_432},{t:this.shape_431},{t:this.shape_430},{t:this.shape_429},{t:this.shape_428},{t:this.shape_427},{t:this.shape_426},{t:this.shape_425},{t:this.shape_424},{t:this.shape_423},{t:this.shape_422},{t:this.shape_421},{t:this.shape_420},{t:this.shape_419},{t:this.shape_418},{t:this.shape_417},{t:this.shape_416},{t:this.shape_415},{t:this.shape_414},{t:this.shape_413},{t:this.shape_412},{t:this.shape_411},{t:this.shape_410},{t:this.shape_409},{t:this.shape_408},{t:this.shape_407},{t:this.shape_406},{t:this.shape_405},{t:this.shape_404},{t:this.shape_403},{t:this.shape_402},{t:this.shape_401},{t:this.shape_400},{t:this.shape_399},{t:this.shape_398},{t:this.shape_397},{t:this.shape_396},{t:this.shape_395},{t:this.shape_394},{t:this.shape_393},{t:this.shape_392},{t:this.shape_391},{t:this.shape_390},{t:this.shape_389},{t:this.shape_388},{t:this.shape_387},{t:this.shape_386},{t:this.shape_385},{t:this.shape_384},{t:this.shape_383},{t:this.shape_382},{t:this.shape_381},{t:this.shape_380},{t:this.shape_379},{t:this.shape_378},{t:this.shape_377},{t:this.shape_376},{t:this.shape_375},{t:this.shape_374},{t:this.shape_373},{t:this.shape_372},{t:this.shape_371},{t:this.shape_370},{t:this.shape_369},{t:this.shape_368},{t:this.shape_367},{t:this.shape_366},{t:this.shape_365},{t:this.shape_364},{t:this.shape_363},{t:this.shape_362},{t:this.shape_361},{t:this.shape_360},{t:this.shape_359},{t:this.shape_358},{t:this.shape_357},{t:this.shape_356},{t:this.shape_355},{t:this.shape_354},{t:this.shape_353},{t:this.shape_352},{t:this.shape_351},{t:this.shape_350},{t:this.shape_349},{t:this.shape_348},{t:this.shape_347},{t:this.shape_346},{t:this.shape_345},{t:this.shape_344},{t:this.shape_343},{t:this.shape_342},{t:this.shape_341},{t:this.shape_340},{t:this.shape_339},{t:this.shape_338},{t:this.shape_337},{t:this.shape_336},{t:this.shape_335},{t:this.shape_334},{t:this.shape_333},{t:this.shape_332},{t:this.shape_331},{t:this.shape_330},{t:this.shape_329},{t:this.shape_328},{t:this.shape_327},{t:this.shape_326},{t:this.shape_325},{t:this.shape_324},{t:this.shape_323},{t:this.shape_322},{t:this.shape_321},{t:this.shape_320},{t:this.shape_319},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(452,231,518,330);
// library properties:
lib.properties = {
	id: 'E740BB847DF4864B949C99CD86B71105',
	width: 960,
	height: 540,
	fps: 24,
	color: "#2ECC71",
	opacity: 1.00,
	manifest: [
		{src:"images/Bitmap28.png", id:"Bitmap28"},
		{src:"images/bookpngcopy.png", id:"bookpngcopy"},
		{src:"images/Bitmap5.png", id:"Bitmap5"}
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