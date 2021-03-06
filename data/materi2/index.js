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



(lib.Bitmap5 = function() {
	this.initialize(img.Bitmap5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);


(lib.Bitmap6 = function() {
	this.initialize(img.Bitmap6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,545);// helper functions:

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


(lib.an_Image = function(options) {
	this.initialize();
	this._element = new $.an.Image(options);
	this._el = this._element.create();
}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,100,100);

p._tick = _tick;
p._handleDrawEnd = _handleDrawEnd;
p._updateVisibility = _updateVisibility;
p.draw = _componentDraw;



(lib.hehe = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#ECF0F1").s().p("Aj8LyQhphpAAiUQAAgSABgRIAAujQgBgRAAgSQAAiUBphqQBphoCTAAQCUAABpBoQBdBdALCAIABAAIAAQVIAAAAQgECNhlBlQhpBpiUAAQiTAAhphpg");
	this.shape.setTransform(85.9,35.8,1,1,-90);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hehe, new cjs.Rectangle(0,0,171.8,71.6), null);


(lib.ggg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#ECF0F1").s().p("AgnAxQgMgJAAgQQAAgRAOgJQANgKAZAAIALAAIAAgFQAAgQgNAAQgMAAAAAMIgjAAQAAgQAOgKQAOgLAUAAQAWABAMAKQANALAAASIAAAxQAAAPAFAJIAAABIgjAAIgDgJQgKAMgQgBQgQAAgLgJgAgQAXQABAEADADQADADAFAAQAGAAAEgCQAEgDACgEIAAgSIgLAAQgRABAAAQg");
	this.shape.setTransform(5.2,-2.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#ECF0F1").s().p("AgRBQIAAifIAjAAIAACfg");
	this.shape_1.setTransform(-3.375,-4.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#ECF0F1").s().p("AgoAxQgLgJAAgQQAAgRANgJQAOgKAZAAIALAAIAAgFQAAgQgMAAQgNAAAAAMIgjAAQAAgQAOgKQANgLAWAAQAVABANAKQAMALAAASIAAAxQAAAPAFAJIAAABIgjAAIgEgJQgJAMgRgBQgPAAgMgJgAgPAXQAAAEACADQAEADAFAAQAGAAAEgCQAEgDACgEIAAgSIgKAAQgRABAAAQg");
	this.shape_2.setTransform(-11.95,-2.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#ECF0F1").s().p("AgoBNIAAgZIAFAAQAHAAAEgCQAEgCACgGIACgIIgnhwIAmAAIARBAIAShAIAmAAIguCCIgCAFQgJAWgZAAQgGAAgIgCg");
	this.shape_3.setTransform(-23.125,0.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#ECF0F1").s().p("AAbBMIg1heIAABeIgkAAIAAiXIAkAAIA1BdIAAhdIAkAAIAACXg");
	this.shape_4.setTransform(-36.175,-3.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#1A7766").s().p("AlLBcQgpAAgdgnIgDgGQgUgdgEglIgCgTIAAg1QABAxAZAlIADAFQAdAmApAAIKYAAQAoAAAcgmIAFgFQANgVAGgYQAFgTABgWIAAA1IAAAEIgBAFQgBAPgDAOIgBACQgGAZgNAUIgFAGQgcAngoAAg");
	this.shape_5.setTransform(-16.35,14);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#1ABC9C").s().p("AlLDZQgpAAgdgnIgDgFQgZglgBgxIAAipQABg3AcgoQAdgnApAAIKYAAQAoAAAcAnQARAWAHAcQAGAVAAAYIAACpQgBAVgFAUQgGAYgNAVIgFAFQgcAngoAAg");
	this.shape_6.setTransform(-16.35,-3.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.4,-25.6,86.1,48.8);


(lib.an_Image = function(options) {
	this.initialize();
	this._element = new $.an.Image(options);
	this._el = this._element.create();
}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,100,100);

p._tick = _tick;
p._handleDrawEnd = _handleDrawEnd;
p._updateVisibility = _updateVisibility;
p.draw = _componentDraw;



(lib.dsdsd = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#ECF0F1").s().p("AgbBLQgLgFgHgHIAPgVQAKAMAQAAQAWAAAAgYIAAgEQgKALgOAAQgVAAgMgPQgOgQAAgaIAAgBQABgRAFgNQAGgNALgHQAKgIAOAAQAQAAALAMIABgJIAfAAIAABrQAAAPgGALQgIALgNAGQgMAGgRAAQgMAAgMgFgAgMgrQgFAIAAAQQAAAOAFAHQAGAIAIAAQALAAAFgHIAAgvQgFgHgLAAQgJAAgFAIg");
	this.shape.setTransform(11.6,0.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#ECF0F1").s().p("AAQA5IAAhGQAAgIgEgEQgDgEgJAAQgJAAgFAIIAABOIgkAAIAAhvIAhAAIABANQAMgQAUAAQARABAJAKQAJALAAAVIAABHg");
	this.shape_1.setTransform(-0.325,-2.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#ECF0F1").s().p("AgRBPIAAhvIAjAAIAABvgAgNgxQgFgFgBgHQABgIAFgEQAGgFAHgBQAIABAGAFQAGAEgBAIQABAHgGAFQgGAFgIAAQgHAAgGgFg");
	this.shape_2.setTransform(-9.3,-4.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#ECF0F1").s().p("AAQA5IAAhGQAAgIgEgEQgDgEgJAAQgJAAgFAIIAABOIgkAAIAAhvIAhAAIABANQAMgQAUAAQARABAJAKQAJALAAAVIAABHg");
	this.shape_3.setTransform(-18.225,-2.15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#ECF0F1").s().p("AgkArQgQgQAAgYIAAgDQAAgRAHgNQAGgNAMgHQAMgIAQAAQAYABAOAPQAOAOAAAaIAAANIhFAAQACAKAGAFQAGAGAKgBQAQAAAKgLIAQATQgHAJgMAGQgMAEgOAAQgZAAgQgPgAgQgKIAiAAIAAgDQAAgIgEgEQgFgFgIAAQgOAAgDAUg");
	this.shape_4.setTransform(-29.875,-2.05);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#ECF0F1").s().p("AAbBMIAAhAIg1AAIAABAIgkAAIAAiXIAkAAIAAA8IA1AAIAAg8IAkAAIAACXg");
	this.shape_5.setTransform(-43.325,-3.975);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#8C2E19").s().p("AlLBcQgpAAgdgnIgDgGQgUgdgEglIgCgTIAAg1QABAxAZAlIADAFQAdAmApAAIKYAAQAoAAAcgmIAFgFQANgVAGgYQAFgTABgWIAAA1IAAAEIgBAFQgBAPgDAOIgBACQgGAZgNAUIgFAGQgcAngoAAg");
	this.shape_6.setTransform(-16.35,14);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#E74C3C").s().p("AlLDZQgpAAgdgnIgDgFQgZglgBgxIAAipQABg3AcgoQAdgnApAAIKYAAQAoAAAcAnQARAWAHAcQAGAVAAAYIAACpQgBAVgFAUQgGAYgNAVIgFAFQgcAngoAAg");
	this.shape_7.setTransform(-16.35,-3.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.4,-25.6,86.1,48.8);


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


// stage content:
(lib.materi2 = function(mode,startPosition,loop) {
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
		 
		var tombol;
		var _this = this;
		function init() {
		  _this.tandaSuaraOn.visible = !_this.tandaSuaraOn.visible;
		  _this.nyala.visible = !_this.nyala.visible;
		
		  var queue = new createjs.LoadQueue();
		  queue.installPlugin(createjs.Sound);
		  queue.addEventListener("complete", handleComplete);
		
		  queue.loadManifest([{ src: "/sounds/musicBG.mp3", id: "tombolGan" }]);
		
		  function handleComplete(event) {
		    // assign each sound to unique variable
		    _this.sound1 = createjs.Sound.createInstance("tombolGan");
		    _this.sound1.play({ loop: -1 });
		
		    _this.nyala.on("click", function tombolKlikEd() {
		      _this.sound1.play({ loop: -1 });
		      _this.nyala.visible = !_this.nyala.visible;
		      _this.tandaSuaraOff.visible = !_this.tandaSuaraOff.visible;
		      _this.hening.visible = !_this.hening.visible;
		      _this.tandaSuaraOn.visible = !_this.tandaSuaraOn.visible;
		    });
		
		    _this.hening.on("click", function tombolKlikEd() {
		      // _this.sound3.play();
		      createjs.Sound.stop();
		      _this.hening.visible = !_this.hening.visible;
		      _this.tandaSuaraOn.visible = !_this.tandaSuaraOn.visible;
		      _this.nyala.visible = !_this.nyala.visible;
		      _this.tandaSuaraOff.visible = !_this.tandaSuaraOff.visible;
		    });
		  }
		}
		
		init();
		createjs.Sound.stop();
		var _this = this
		
		_this.setup = function(){
			document.body.style.backgroundColor = lib.properties.color;
		}
		
		_this.setup();
		
		
		_this.stop();
		
		_this.btnMenuKD.on('click', function(){
		
		window.location.replace('../menu/index.html');
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// suara
	this.nyala = new lib.ggg();
	this.nyala.name = "nyala";
	this.nyala.setTransform(917.25,39.95,0.6351,0.6351,0,0,0,-16.3,-1.2);
	new cjs.ButtonHelper(this.nyala, 0, 1, 2, false, new lib.ggg(), 3);

	this.tandaSuaraOn = new lib.an_Image({'id': 'tandaSuaraOn', 'src':'images/animation_500_kdvpuxkb.gif', 'alt':'image', 'border':'0', 'visible':true, 'class':'ui-image'});

	this.tandaSuaraOn.name = "tandaSuaraOn";
	this.tandaSuaraOn.setTransform(855.75,34.2,0.3858,0.3858,0,0,0,50,45.1);

	this.hening = new lib.dsdsd();
	this.hening.name = "hening";
	this.hening.setTransform(917.25,39.95,0.6351,0.6351,0,0,0,-16.3,-1.2);
	new cjs.ButtonHelper(this.hening, 0, 1, 2, false, new lib.dsdsd(), 3);

	this.tandaSuaraOff = new lib.an_Image({'id': 'tandaSuaraOff', 'src':'images/animation_500_kdvpuxkb.gif', 'alt':'image', 'border':'0', 'visible':true, 'class':'ui-image'});

	this.tandaSuaraOff.name = "tandaSuaraOff";
	this.tandaSuaraOff.setTransform(856.05,34.2,0.3858,0.3858,0,0,0,50,45.1);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgMASQgEgEAAgFQAAgGAFgDQAFgDAIAAIAGAAIAAgDQAAgEgCgCQgCgCgEAAQgDAAgCACQgDABAAADIgHAAQAAgDACgDQACgDAEgBQAEgCADAAQAHAAAEAEQAEADAAAGIAAASQAAAFACAEIAAAAIgIAAIgBgEQgEAFgGAAQgGAAgEgDgAgJAIQAAADACACQADACADAAQACAAADgCQADgBABgDIAAgIIgFAAQgMAAAAAHg");
	this.shape.setTransform(862.575,60.675);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAVIAAgoIAHAAIAAAFQADgFAFgBIAEABIAAAHIgEgBQgGAAgCAGIAAAcg");
	this.shape_1.setTransform(859.4,60.65);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgMASQgEgEAAgFQAAgGAFgDQAFgDAIAAIAGAAIAAgDQAAgEgCgCQgCgCgEAAQgDAAgCACQgDABAAADIgHAAQAAgDACgDQACgDAEgBQAEgCADAAQAHAAAEAEQAEADAAAGIAAASQAAAFACAEIAAAAIgIAAIgBgEQgEAFgGAAQgGAAgEgDgAgJAIQAAADACACQADACADAAQACAAADgCQADgBABgDIAAgIIgFAAQgMAAAAAHg");
	this.shape_2.setTransform(855.825,60.675);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgLARQgEgEAAgHIAAgZIAHAAIAAAZQAAAJAHAAQAIAAACgGIAAgcIAHAAIAAAnIgHAAIAAgEQgEAFgHgBQgGABgDgEg");
	this.shape_3.setTransform(851.65,60.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJAaQgEgCgDgEQgDgEAAgFIAHAAQAAAFAEADQAEADAFAAQAFAAAEgCQADgCAAgEQAAgEgDgDIgKgEQgJgDgEgCQgEgEAAgGQAAgGAFgFQAFgEAHAAQAGAAAEACQAFACACAEQADAEAAAFIgIAAQAAgFgDgDQgDgDgGAAQgEAAgDACQgDADAAAEQAAADADACQADADAGACIAKADQAEACACADQACADAAAEQAAAHgFAEQgGAEgIAAQgFAAgFgCg");
	this.shape_4.setTransform(847.325,59.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3498DB").s().p("Aj8D9QhphpAAiUQAAiTBphqQBphoCTAAQCVAABoBoQBpBqAACTQAACUhpBpQhoBpiVAAQiTAAhphpg");
	this.shape_5.setTransform(855.9488,39.2271,0.8741,0.8741);

	this.instance = new lib.hehe();
	this.instance.setTransform(892.15,39.3,0.6715,0.8741,0,0,0,86.2,35.9);
	this.instance.shadow = new cjs.Shadow("rgba(0,0,0,1)",3,3,4);
	this.instance.cache(-2,-2,176,76);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.tandaSuaraOff},{t:this.hening},{t:this.tandaSuaraOn},{t:this.nyala}]}).wait(1));

	// base
	this.btnMenuKD = new lib.btnMenuKI();
	this.btnMenuKD.name = "btnMenuKD";
	this.btnMenuKD.setTransform(884.05,502.8);
	new cjs.ButtonHelper(this.btnMenuKD, 0, 1, 2, false, new lib.btnMenuKI(), 3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2F3542").s().p("AADBHIAAhsIghALIAAgXIA6gVIADAAIAACNg");
	this.shape_6.setTransform(73.725,400.225);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2F3542").s().p("AgKALQgFgEAAgHQAAgFAFgFQAEgEAGAAQAHAAAEAEQAFAFAAAFQAAAHgFAEQgEAEgHAAQgGAAgEgEg");
	this.shape_7.setTransform(66.025,405.95);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2F3542").s().p("AgaBJIAAgYIAGAAQAkgCADghQgLALgNAAQgTAAgMgNQgLgMAAgWQAAgOAGgLQAGgMALgGQALgHANAAQAOAAAKAHQAMAHAFANQAHAOAAARIAAAKQAAAjgSAUQgSAUgfACgAgOgpQgFAHAAAMQAAAMAFAHQAFAHAKAAQAGAAAFgEQAFgCADgFIAAgMQgBgOgFgIQgGgIgIAAQgIAAgGAIg");
	this.shape_8.setTransform(57.35,400.225);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2F3542").s().p("AgKALQgFgEAAgHQAAgFAFgFQAEgEAGAAQAHAAAEAEQAFAFAAAFQAAAHgFAEQgEAEgHAAQgGAAgEgEg");
	this.shape_9.setTransform(48.725,405.95);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2F3542").s().p("AAHBHIAAgfIg5AAIgBgSIA6hcIAdAAIAABYIAQAAIAAAWIgQAAIAAAfgAAFgdIgcAvIAeAAIAAgyg");
	this.shape_10.setTransform(40.15,400.25);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2F3542").s().p("AgjA9QgNgLAAgSIAcAAQAAAIAGAFQAGAFAIAAQAKAAAFgFQAGgFAAgJQAAgVgWAAIgPAAIAAgWIAPAAQAJAAAGgFQAFgFAAgJQAAgJgFgFQgFgEgJAAQgIAAgFAEQgGAEAAAIIgcAAQAAgLAGgKQAGgIALgFQALgFANAAQAVAAANALQANAKAAAUQAAAJgGAJQgGAHgKAFQAMAEAGAIQAGAJAAALQAAATgOALQgNAMgWAAQgVAAgOgMg");
	this.shape_11.setTransform(74.575,362.25);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2F3542").s().p("AgKALQgFgEAAgHQAAgGAFgEQAEgEAGAAQAHAAAEAEQAFAEAAAGQAAAHgFAEQgEAEgHAAQgGAAgEgEg");
	this.shape_12.setTransform(66.025,367.95);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2F3542").s().p("AgaBJIAAgYIAGAAQAkgCADghQgLALgNAAQgTAAgMgNQgLgMAAgWQAAgOAGgLQAGgMALgGQALgHANAAQAOAAAKAHQAMAHAFANQAHAOAAARIAAAKQAAAjgSAUQgSAUgfACgAgOgpQgFAHAAAMQAAAMAFAHQAFAHAKAAQAGAAAFgEQAFgCADgFIAAgMQgBgOgFgIQgGgIgIAAQgIAAgGAIg");
	this.shape_13.setTransform(57.35,362.225);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2F3542").s().p("AgKALQgFgEAAgHQAAgGAFgEQAEgEAGAAQAHAAAEAEQAFAEAAAGQAAAHgFAEQgEAEgHAAQgGAAgEgEg");
	this.shape_14.setTransform(48.725,367.95);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2F3542").s().p("AgjA9QgNgLAAgSIAcAAQAAAIAGAFQAGAFAIAAQAKAAAFgFQAGgFAAgJQAAgVgWAAIgPAAIAAgWIAPAAQAJAAAGgFQAFgFAAgJQAAgJgFgFQgFgEgJAAQgIAAgFAEQgGAEAAAIIgcAAQAAgLAGgKQAGgIALgFQALgFANAAQAVAAANALQANAKAAAUQAAAJgGAJQgGAHgKAFQAMAEAGAIQAGAJAAALQAAATgOALQgNAMgWAAQgVAAgOgMg");
	this.shape_15.setTransform(39.975,362.25);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2F3542").s().p("AgvBIIAAgUIAugwQAJgJAFgJQAEgHAAgHQAAgJgEgGQgFgFgIgBQgKAAgFAIQgGAGAAALIgcAAQAAgOAGgKQAGgLAMgGQALgGAOAAQAVAAAMALQANAKAAATQAAALgGAKQgFALgNAOIggAiIA8AAIAAAXg");
	this.shape_16.setTransform(74.7,328.15);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2F3542").s().p("AgKALQgFgEAAgHQAAgFAFgFQAEgEAGAAQAHAAAEAEQAFAFAAAFQAAAHgFAEQgEAEgHAAQgGAAgEgEg");
	this.shape_17.setTransform(66.025,333.95);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2F3542").s().p("AgaBJIAAgYIAGAAQAkgCADghQgLALgNAAQgTAAgMgNQgLgMAAgWQAAgOAGgLQAGgMALgGQALgHANAAQAOAAAKAHQAMAHAFANQAHAOAAARIAAAKQAAAjgSAUQgSAUgfACgAgOgpQgFAHAAAMQAAAMAFAHQAFAHAKAAQAGAAAFgEQAFgCADgFIAAgMQgBgOgFgIQgGgIgIAAQgIAAgGAIg");
	this.shape_18.setTransform(57.35,328.225);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2F3542").s().p("AgKALQgFgEAAgHQAAgFAFgFQAEgEAGAAQAHAAAEAEQAFAFAAAFQAAAHgFAEQgEAEgHAAQgGAAgEgEg");
	this.shape_19.setTransform(48.725,333.95);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2F3542").s().p("AgjA+QgNgMAAgSIAcAAQAAAIAGAFQAGAFAIAAQAKAAAFgFQAGgGAAgIQAAgWgWABIgPAAIAAgWIAPAAQAJABAGgGQAFgGAAgIQAAgJgFgEQgFgGgJAAQgIABgFAEQgGAEAAAIIgcAAQAAgMAGgIQAGgJALgFQALgFANAAQAVAAANALQANALAAASQAAAKgGAIQgGAJgKAEQAMADAGAJQAGAJAAALQAAATgOAMQgNALgWAAQgVAAgOgLg");
	this.shape_20.setTransform(39.975,328.25);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2F3542").s().p("AADBHIAAhsIghALIAAgXIA6gVIADAAIAACNg");
	this.shape_21.setTransform(73.725,293.625);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2F3542").s().p("AgKALQgFgEAAgHQAAgFAFgFQAEgEAGAAQAHAAAEAEQAFAFAAAFQAAAHgFAEQgEAEgHAAQgGAAgEgEg");
	this.shape_22.setTransform(66.025,299.35);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2F3542").s().p("AgaBJIAAgYIAGAAQAkgCADghQgLALgNAAQgTAAgMgNQgLgMAAgWQAAgOAGgLQAGgMALgGQALgHANAAQAOAAAKAHQAMAHAFANQAHAOAAARIAAAKQAAAjgSAUQgSAUgfACgAgOgpQgFAHAAAMQAAAMAFAHQAFAHAKAAQAGAAAFgEQAFgCADgFIAAgMQgBgOgFgIQgGgIgIAAQgIAAgGAIg");
	this.shape_23.setTransform(57.35,293.625);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2F3542").s().p("AgKALQgFgEAAgHQAAgFAFgFQAEgEAGAAQAHAAAEAEQAFAFAAAFQAAAHgFAEQgEAEgHAAQgGAAgEgEg");
	this.shape_24.setTransform(48.725,299.35);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2F3542").s().p("AgjA9QgNgKAAgTIAcAAQAAAIAGAFQAGAFAIAAQAKAAAFgFQAGgGAAgIQAAgVgWgBIgPAAIAAgUIAPAAQAJgBAGgFQAFgGAAgIQAAgJgFgFQgFgEgJAAQgIgBgFAFQgGAFAAAGIgcAAQAAgKAGgKQAGgIALgFQALgFANAAQAVAAANAKQANALAAAUQAAAJgGAJQgGAHgKAFQAMADAGAJQAGAJAAALQAAATgOALQgNAMgWAAQgVAAgOgMg");
	this.shape_25.setTransform(39.975,293.65);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgDAAgHQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgEgDgEQgEgGAAgHQAAgLAKgJQAKgHAPgBQAQAAAKAJQAKAIAAAOIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAHQgKAIgQAAQgKABgJgFg");
	this.shape_26.setTransform(806.075,433.65);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2F3542").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAEAAADADQADACAAAEQAAAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_27.setTransform(799.3,431.925);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2F3542").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_28.setTransform(794.925,431.65);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2F3542").s().p("AgcAnQgIgIAAgSIAAg8IAPAAIAAA8QAAAVASABQASgBAGgOIAAhDIAQAAIAABdIgPAAIgBgJQgJALgSAAQgPAAgHgJg");
	this.shape_29.setTransform(787.8,433.75);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2F3542").s().p("AgCA1QgGgHAAgMIAAg6IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA6QAAAGACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_30.setTransform(779.625,432.6);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2F3542").s().p("AgWAwIAAhdIAPAAIABALQAHgOAPAAQAEAAADACIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_31.setTransform(774.4,433.55);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2F3542").s().p("AgbAlQgMgNAAgWIAAgCQgBgNAGgLQAFgMAKgGQAKgHAKAAQATAAAKANQALAMAAAXIAAAFIhAAAQAAAOAIAKQAIAIALAAQAJAAAFgEQAHgDAEgGIAKAIQgMASgXAAQgTAAgMgMgAgOgcQgHAIgBANIAuAAIAAgCQAAgMgHgHQgFgHgLAAQgJAAgGAHg");
	this.shape_32.setTransform(766.15,433.65);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2F3542").s().p("AgCA1QgGgHAAgMIAAg6IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA6QAAAGACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_33.setTransform(758.075,432.6);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgKgFgFQgEgEgKAAQgHAAgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAAMQALgPARAAQAeABAAAhIAAA+g");
	this.shape_34.setTransform(745.975,433.55);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2F3542").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdABAAARg");
	this.shape_35.setTransform(736.075,433.65);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2F3542").s().p("AgWAwIAAhdIAQAAIAAALQAHgOAOAAQAFAAADACIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_36.setTransform(728.65,433.55);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2F3542").s().p("AgeAkQgMgOAAgWIAAAAQAAgOAFgLQAGgLAKgHQAJgFAMgBQATAAAMAOQAMAOAAAVIAAABQAAAOgFALQgFALgKAGQgKAHgNgBQgSAAgMgNgAgTgZQgHAJAAARQAAAQAHAKQAIAJALAAQAMAAAIgJQAHgKAAgRQAAgPgHgKQgIgKgMAAQgLAAgIAKg");
	this.shape_37.setTransform(720.025,433.65);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2F3542").s().p("AgnBDIAAiDIAOAAIABALQAKgNARAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgJANgSAAQgQAAgKgLIAAAugAgXgnIAAAtQAHANAQAAQAKAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgPAAgHANg");
	this.shape_38.setTransform(710.05,435.375);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2F3542").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdABAAARg");
	this.shape_39.setTransform(699.875,433.65);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2F3542").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_40.setTransform(692.825,431.65);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2F3542").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgKIAcgeIAUAAIgkAmIAoA3g");
	this.shape_41.setTransform(682.275,431.65);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2F3542").s().p("AgcAnQgIgIAAgSIAAg8IAPAAIAAA8QAAAVASABQASgBAGgOIAAhDIAQAAIAABdIgPAAIgBgJQgJALgSAAQgPAAgHgJg");
	this.shape_42.setTransform(672.15,433.75);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2F3542").s().p("AgCA1QgGgHAAgMIAAg6IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA6QAAAGACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_43.setTransform(663.975,432.6);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgKgFgFQgEgEgKAAQgHAAgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAAMQALgPARAAQAeABAAAhIAAA+g");
	this.shape_44.setTransform(656.325,433.55);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2F3542").s().p("AgbAlQgNgNAAgWIAAgCQABgNAFgLQAFgMAKgGQAKgHAKAAQATAAAKANQALAMAAAXIAAAFIhAAAQABAOAHAKQAIAIALAAQAJAAAGgEQAFgDAFgGIAKAIQgMASgXAAQgTAAgMgMgAgOgcQgHAIgBANIAuAAIAAgCQAAgMgHgHQgFgHgLAAQgJAAgGAHg");
	this.shape_45.setTransform(646.65,433.65);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2F3542").s().p("AgYA4IgBAKIgOAAIAAiGIAQAAIAAAzQAKgNAQAAQARAAAKAOQAKANAAAWIAAABQAAAWgKANQgKANgRAAQgRAAgKgMgAgXAAIAAAnQAHAPAQABQALgBAGgIQAHgJAAgTQAAgQgHgIQgGgKgLABQgQgBgHAQg");
	this.shape_46.setTransform(636.975,431.75);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2F3542").s().p("AAzAwIAAg+QAAgKgFgFQgFgEgLAAQgJAAgGAFQgGAFgBAJIAAA+IgPAAIAAg9QAAgVgUABQgQAAgGANIAABEIgRAAIAAhdIAQAAIAAAKQALgNASAAQATAAAHAQQAEgHAIgEQAIgFAKAAQAfAAABAiIAAA+g");
	this.shape_47.setTransform(619.325,433.55);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2F3542").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdABAAARg");
	this.shape_48.setTransform(606.525,433.65);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2F3542").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_49.setTransform(599.475,431.65);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2F3542").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdABAAARg");
	this.shape_50.setTransform(592.375,433.65);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2F3542").s().p("AgdA3QgKgOAAgVIAAgCQAAgUAKgOQAKgOARAAQAQAAAKAMIAAgyIAQAAIAACGIgPAAIgBgKQgKAMgQAAQgRAAgKgNgAgQgGQgHAIAAASQAAAQAHAKQAGAIALABQAPgBAIgOIAAgqQgIgNgOAAQgMgBgGAKg");
	this.shape_51.setTransform(582.2,431.75);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2F3542").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdABAAARg");
	this.shape_52.setTransform(567.975,433.65);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2F3542").s().p("AgcBCIgGgBIAAgNIAFAAQAHAAAFgDQAFgDADgJIADgKIgihdIASAAIAXBGIAWhGIARAAIgmBtQgIAYgTAAg");
	this.shape_53.setTransform(558.85,435.575);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgKgFgFQgEgEgKAAQgHAAgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAAMQALgPARAAQAeABAAAhIAAA+g");
	this.shape_54.setTransform(549.625,433.55);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2F3542").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_55.setTransform(542.5,431.925);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgDAAgHQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgEgDgEQgEgGAAgHQAAgLAKgJQAKgHAPgBQAQAAAKAJQAKAIAAAOIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAHQgKAIgQAAQgKABgJgFg");
	this.shape_56.setTransform(535.625,433.65);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2F3542").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgKIAcgeIAUAAIgkAmIAoA3g");
	this.shape_57.setTransform(527.075,431.65);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2F3542").s().p("AgdAnQgHgIgBgSIAAg8IAQAAIAAA8QABAVARABQASgBAGgOIAAhDIARAAIAABdIgQAAIAAgJQgKALgRAAQgPAAgJgJg");
	this.shape_58.setTransform(516.95,433.75);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2F3542").s().p("AgdA3QgKgOAAgVIAAgCQAAgUAKgOQAKgOARAAQAQAAAKAMIAAgyIAQAAIAACGIgPAAIgBgKQgKAMgQAAQgRAAgKgNgAgQgGQgHAIAAASQAAAQAHAKQAHAIAKABQAPgBAIgOIAAgqQgIgNgOAAQgLgBgHAKg");
	this.shape_59.setTransform(506.7,431.75);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2F3542").s().p("AgeAkQgMgOAAgWIAAAAQAAgOAFgLQAGgLAKgHQAJgFAMgBQATAAAMAOQAMAOAAAVIAAABQAAAOgFALQgFALgKAGQgKAHgNgBQgSAAgMgNgAgTgZQgHAJAAARQAAAQAHAKQAIAJALAAQAMAAAIgJQAHgKAAgRQAAgPgHgKQgIgKgMAAQgLAAgIAKg");
	this.shape_60.setTransform(496.775,433.65);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2F3542").s().p("AgWAwIAAhdIAPAAIABALQAHgOAPAAQAFAAACACIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_61.setTransform(489.1,433.55);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2F3542").s().p("AgnBDIAAiDIAPAAIABALQAKgNAQAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgJANgSAAQgQAAgKgLIAAAugAgXgnIAAAtQAHANAPAAQALAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgOAAgIANg");
	this.shape_62.setTransform(480.7,435.375);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2F3542").s().p("AgbAlQgMgNAAgWIAAgCQgBgNAGgLQAGgMAJgGQAKgHAKAAQATAAAKANQALAMAAAXIAAAFIhAAAQAAAOAIAKQAIAIALAAQAJAAAFgEQAGgDAFgGIAKAIQgMASgYAAQgSAAgMgMgAgPgcQgGAIgCANIAvAAIAAgCQgBgMgFgHQgHgHgKAAQgIAAgIAHg");
	this.shape_63.setTransform(470.75,433.65);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2F3542").s().p("AgWAwIAAhdIAQAAIAAALQAHgOAPAAQAFAAACACIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_64.setTransform(463.35,433.55);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgKgFgFQgEgEgKAAQgHAAgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAAMQALgPARAAQAeABAAAhIAAA+g");
	this.shape_65.setTransform(450.375,433.55);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2F3542").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdABAAARg");
	this.shape_66.setTransform(440.475,433.65);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2F3542").s().p("AgdA3QgKgOAAgVIAAgCQAAgUAKgOQALgOAQAAQAQAAAKAMIAAgyIAQAAIAACGIgPAAIgBgKQgJAMgRAAQgQAAgLgNgAgQgGQgHAIAAASQAAAQAHAKQAHAIAKABQAPgBAIgOIAAgqQgIgNgOAAQgLgBgHAKg");
	this.shape_67.setTransform(430.3,431.75);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2F3542").s().p("AAVBDIAAg/QAAgJgFgFQgEgEgKAAQgHAAgGADQgGAFgDAGIAABDIgQAAIAAiGIAQAAIAAA0QALgOAQAAQAeABAAAgIAAA/g");
	this.shape_68.setTransform(416.075,431.65);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2F3542").s().p("AgdAnQgIgIAAgSIAAg8IARAAIAAA8QAAAVASABQARgBAGgOIAAhDIAQAAIAABdIgPAAIAAgJQgKALgRAAQgQAAgIgJg");
	this.shape_69.setTransform(406.15,433.75);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2F3542").s().p("AgYA4IgBAKIgOAAIAAiGIAQAAIAAAzQAKgNAQAAQARAAAKAOQAKANAAAWIAAABQAAAWgKANQgKANgRAAQgRAAgKgMgAgXAAIAAAnQAHAPAQABQALgBAGgIQAHgJAAgTQAAgQgHgIQgGgKgLABQgQgBgHAQg");
	this.shape_70.setTransform(396.375,431.75);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2F3542").s().p("AgcAnQgJgIABgSIAAg8IAQAAIAAA8QgBAVATABQARgBAGgOIAAhDIAQAAIAABdIgPAAIgBgJQgJALgSAAQgPAAgHgJg");
	this.shape_71.setTransform(386.15,433.75);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2F3542").s().p("AgCA1QgGgHAAgMIAAg6IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA6QAAAGACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_72.setTransform(377.975,432.6);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#2F3542").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdABAAARg");
	this.shape_73.setTransform(365.925,433.65);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#2F3542").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_74.setTransform(355.825,435.425);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#2F3542").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_75.setTransform(345.725,435.425);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgKgFgFQgEgEgKAAQgHAAgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAAMQALgPARAAQAeABAAAhIAAA+g");
	this.shape_76.setTransform(335.875,433.55);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#2F3542").s().p("AgeAkQgMgOAAgWIAAAAQAAgOAFgLQAGgLAKgHQAJgFAMgBQATAAAMAOQAMAOAAAVIAAABQAAAOgFALQgFALgKAGQgKAHgNgBQgSAAgMgNgAgTgZQgHAJAAARQAAAQAHAKQAIAJALAAQAMAAAIgJQAHgKAAgRQAAgPgHgKQgIgKgMAAQgLAAgIAKg");
	this.shape_77.setTransform(325.825,433.65);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#2F3542").s().p("AgWAwIAAhdIAQAAIAAALQAHgOAOAAQAFAAADACIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_78.setTransform(318.15,433.55);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#2F3542").s().p("AgLAQQAIgMAAgLIAAgOIAPAAIAAAMQAAAJgEAIQgEAJgGAFg");
	this.shape_79.setTransform(308.075,438.725);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#2F3542").s().p("AAVBDIAAg/QAAgJgFgFQgEgEgKAAQgHAAgGADQgGAFgDAGIAABDIgQAAIAAiGIAQAAIAAA0QALgOAQAAQAeABAAAgIAAA/g");
	this.shape_80.setTransform(301.675,431.65);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#2F3542").s().p("AgcAnQgJgIAAgSIAAg8IARAAIAAA8QgBAVATABQARgBAGgOIAAhDIAQAAIAABdIgPAAIAAgJQgKALgSAAQgPAAgHgJg");
	this.shape_81.setTransform(291.75,433.75);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#2F3542").s().p("AgYA4IgBAKIgOAAIAAiGIAQAAIAAAzQAKgNAQAAQARAAAKAOQAKANAAAWIAAABQAAAWgKANQgKANgRAAQgRAAgKgMgAgXAAIAAAnQAHAPAQABQALgBAGgIQAHgJAAgTQAAgQgHgIQgGgKgLABQgQgBgHAQg");
	this.shape_82.setTransform(281.975,431.75);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#2F3542").s().p("AgcAnQgJgIABgSIAAg8IAQAAIAAA8QgBAVATABQARgBAGgOIAAhDIAQAAIAABdIgPAAIgBgJQgJALgSAAQgPAAgHgJg");
	this.shape_83.setTransform(271.75,433.75);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#2F3542").s().p("AgCA1QgGgHAAgMIAAg6IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA6QAAAGACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_84.setTransform(263.575,432.6);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#2F3542").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAEAAADADQADACgBAEQABAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_85.setTransform(254.3,431.925);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#2F3542").s().p("AgWAwIAAhdIAPAAIABALQAHgOAPAAQAEAAADACIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_86.setTransform(249.55,433.55);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#2F3542").s().p("AgCA1QgGgHAAgMIAAg6IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA6QAAAGACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_87.setTransform(242.775,432.6);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#2F3542").s().p("AgbAlQgMgNAAgWIAAgCQgBgNAGgLQAGgMAJgGQAKgHAKAAQATAAAKANQALAMAAAXIAAAFIhAAAQAAAOAIAKQAIAIALAAQAJAAAFgEQAGgDAFgGIAKAIQgMASgYAAQgSAAgMgMgAgPgcQgGAIgCANIAvAAIAAgCQgBgMgGgHQgGgHgKAAQgIAAgIAHg");
	this.shape_88.setTransform(235.4,433.65);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#2F3542").s().p("AAzAwIAAg+QAAgKgFgFQgFgEgLAAQgJAAgGAFQgGAFgBAJIAAA+IgPAAIAAg9QAAgVgUABQgQAAgGANIAABEIgRAAIAAhdIAQAAIAAAKQALgNASAAQATAAAHAQQAEgHAIgEQAIgFAKAAQAfAAABAiIAAA+g");
	this.shape_89.setTransform(222.625,433.55);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#2F3542").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAFAAACADQACACABAEQgBAEgCADQgCADgFAAQgEAAgCgDg");
	this.shape_90.setTransform(212.6,431.925);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgDAAgHQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgEgDgEQgEgGAAgHQAAgLAKgJQAKgHAPgBQAQAAAKAJQAKAIAAAOIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAHQgKAIgQAAQgKABgJgFg");
	this.shape_91.setTransform(205.725,433.65);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#2F3542").s().p("AgLAQQAIgMAAgLIAAgOIAPAAIAAAMQAAAJgEAIQgEAJgGAFg");
	this.shape_92.setTransform(194.575,438.725);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#2F3542").s().p("AgWBTQANgKAIgXQAIgVAAgbIAAgCQAAgSgEgQQgDgQgHgNQgHgMgIgHIADgKQAMAGAJAPQALAQAFARQAFATAAATQAAAUgFASQgFASgLAPQgJAQgMAGg");
	this.shape_93.setTransform(189.575,433.25);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#2F3542").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgKIAcgeIAUAAIgkAmIAoA3g");
	this.shape_94.setTransform(182.975,431.65);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#2F3542").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQADACgBAEQABAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_95.setTransform(175.65,431.925);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#2F3542").s().p("AgCA1QgGgHAAgMIAAg6IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA6QAAAGACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_96.setTransform(170.225,432.6);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgDAAgHQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgEgDgEQgEgGAAgHQAAgLAKgJQAKgHAPgBQAQAAAKAJQAKAIAAAOIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAHQgKAIgQAAQgKABgJgFg");
	this.shape_97.setTransform(162.875,433.65);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#2F3542").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdABAAARg");
	this.shape_98.setTransform(153.325,433.65);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#2F3542").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_99.setTransform(146.275,431.65);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#2F3542").s().p("AgYA4IgBAKIgOAAIAAiGIAQAAIAAAzQAKgNAQAAQARAAAKAOQAKANAAAWIAAABQAAAWgKANQgKANgRAAQgRAAgKgMgAgXAAIAAAnQAHAPAQABQALgBAGgIQAHgJAAgTQAAgQgHgIQgGgKgLABQgQgBgHAQg");
	this.shape_100.setTransform(139.275,431.75);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#2F3542").s().p("AgeAkQgMgOAAgWIAAAAQAAgOAFgLQAGgLAKgHQAJgFAMgBQATAAAMAOQAMAOAAAVIAAABQAAAOgFALQgFALgKAGQgKAHgNgBQgSAAgMgNgAgTgZQgHAJAAARQAAAQAHAKQAIAJALAAQAMAAAIgJQAHgKAAgRQAAgPgHgKQgIgKgMAAQgLAAgIAKg");
	this.shape_101.setTransform(128.925,433.65);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#2F3542").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_102.setTransform(121.625,431.65);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#2F3542").s().p("AgnBDIAAiDIAOAAIABALQAKgNARAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgKANgRAAQgQAAgKgLIAAAugAgXgnIAAAtQAHANAQAAQAKAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgPAAgHANg");
	this.shape_103.setTransform(114.6,435.375);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#2F3542").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAEAAADADQADACAAAEQAAAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_104.setTransform(107.2,431.925);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#2F3542").s().p("AgWAwIAAhdIAPAAIABALQAHgOAPAAQAFAAACACIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_105.setTransform(102.45,433.55);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#2F3542").s().p("AgCA1QgGgHAAgMIAAg6IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA6QAAAGACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_106.setTransform(95.675,432.6);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#2F3542").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_107.setTransform(902.425,398.95);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#2F3542").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgJgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_108.setTransform(892.525,399.05);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#2F3542").s().p("AgdA2QgKgNAAgWIAAgBQAAgVAKgNQAKgNARAAQAQAAAKALIAAgxIAQAAIAACGIgPAAIgBgKQgKALgQABQgRgBgKgOgAgQgHQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgNIAAgrQgHgOgPAAQgMABgGAIg");
	this.shape_109.setTransform(882.35,397.15);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#2F3542").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_110.setTransform(868.725,397.05);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#2F3542").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAEAAADADQADACAAAEQAAAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_111.setTransform(861.4,397.325);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#2F3542").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_112.setTransform(855.975,398);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgIAAgIIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgEAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAHQgKAJgQAAQgKgBgJgEg");
	this.shape_113.setTransform(848.625,399.05);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#2F3542").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgJgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_114.setTransform(839.075,399.05);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#2F3542").s().p("AgHBEIAAiGIAPAAIAACGg");
	this.shape_115.setTransform(832.025,397.05);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#2F3542").s().p("AgYA3IgBAMIgOAAIAAiGIAQAAIAAAyQAKgMAQAAQARgBAKANQAKAOAAAVIAAACQAAAWgKANQgKAOgRAAQgRgBgKgNgAgXgBIAAApQAHAOAQAAQALAAAGgJQAHgIAAgTQAAgQgHgJQgGgIgLgBQgQAAgHAPg");
	this.shape_116.setTransform(825.025,397.15);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#2F3542").s().p("AgeAkQgMgNAAgXIAAAAQAAgOAFgLQAGgLAKgGQAJgHAMABQATAAAMANQAMANAAAWIAAABQAAAOgFALQgFALgKAGQgKAGgNABQgSAAgMgOgAgTgaQgHAKAAARQAAAQAHAJQAIAKALAAQAMAAAIgKQAHgJAAgRQAAgPgHgKQgIgKgMAAQgLAAgIAJg");
	this.shape_117.setTransform(814.675,399.05);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#2F3542").s().p("AgHBEIAAiGIAPAAIAACGg");
	this.shape_118.setTransform(807.375,397.05);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#2F3542").s().p("AgnBDIAAiDIAOAAIACALQAJgNARAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgKANgQAAQgRAAgKgLIAAAugAgXgnIAAAtQAIANAOAAQALAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgPAAgHANg");
	this.shape_119.setTransform(800.35,400.775);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#2F3542").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_120.setTransform(792.95,397.325);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#2F3542").s().p("AgdA2QgKgNAAgWIAAgBQAAgVAKgNQALgNAQAAQAQAAAKALIAAgxIAQAAIAACGIgPAAIgBgKQgJALgRABQgQgBgLgOgAgQgHQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgNIAAgrQgIgOgOAAQgLABgHAIg");
	this.shape_121.setTransform(785.45,397.15);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#2F3542").s().p("AgBBHQgVgeAAgpQAAgUAFgRQAGgTAKgPQAKgPALgGIADALQgMAJgJAVQgHAUgBAZIAAAGQAAAjAMAZQAHAPAKAIIgDAKQgMgHgJgPg");
	this.shape_122.setTransform(777.925,398.65);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#2F3542").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_123.setTransform(764.625,398.95);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#2F3542").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgJgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_124.setTransform(754.725,399.05);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#2F3542").s().p("AAWAwIgWhHIgWBHIgNAAIgbhfIAPAAIATBGIAXhGIALAAIAXBIIAThIIAQAAIgcBfg");
	this.shape_125.setTransform(743.05,399.05);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#2F3542").s().p("AgbAkQgMgMAAgVIAAgDQAAgOAFgKQAFgMAKgGQAKgGAKAAQATAAAKAMQALAMAAAXIAAAGIhAAAQABAOAHAIQAIAJALAAQAJAAAFgEQAHgDAEgGIAKAIQgMATgXAAQgTgBgMgNgAgOgcQgHAHgBANIAuAAIAAgBQAAgNgHgGQgFgHgLAAQgJAAgGAHg");
	this.shape_126.setTransform(731.6,399.05);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#2F3542").s().p("AAVBEIAAg/QAAgKgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAiGIAQAAIAAAzQALgNAQAAQAegBAAAiIAAA/g");
	this.shape_127.setTransform(721.825,397.05);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#2F3542").s().p("AAVBEIAAg/QAAgKgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAiGIAQAAIAAAzQALgNAQAAQAegBAAAiIAAA/g");
	this.shape_128.setTransform(707.075,397.05);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#2F3542").s().p("AgdAoQgHgKgBgQIAAg+IAQAAIAAA9QABAVARAAQASAAAGgNIAAhFIARAAIAABfIgQAAIgBgKQgJAMgRAAQgPAAgJgJg");
	this.shape_129.setTransform(697.15,399.15);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#2F3542").s().p("AgYA3IgBAMIgOAAIAAiGIAQAAIAAAyQAKgMAQAAQARgBAKANQAKAOAAAVIAAACQAAAWgKANQgKAOgRAAQgRgBgKgNgAgXgBIAAApQAHAOAQAAQALAAAGgJQAHgIAAgTQAAgQgHgJQgGgIgLgBQgQAAgHAPg");
	this.shape_130.setTransform(687.375,397.15);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#2F3542").s().p("AgdAoQgHgKgBgQIAAg+IARAAIAAA9QAAAVARAAQASAAAGgNIAAhFIARAAIAABfIgQAAIAAgKQgKAMgRAAQgPAAgJgJg");
	this.shape_131.setTransform(677.15,399.15);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#2F3542").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_132.setTransform(668.975,398);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#2F3542").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_133.setTransform(656.475,398.95);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#2F3542").s().p("AgdAoQgIgKAAgQIAAg+IAQAAIAAA9QABAVASAAQARAAAGgNIAAhFIARAAIAABfIgQAAIAAgKQgKAMgRAAQgPAAgJgJg");
	this.shape_134.setTransform(646.55,399.15);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgIAAgIIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgEAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAHQgKAJgQAAQgKgBgJgEg");
	this.shape_135.setTransform(636.925,399.05);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#2F3542").s().p("AgcAoQgJgKABgQIAAg+IAQAAIAAA9QgBAVATAAQARAAAGgNIAAhFIAQAAIAABfIgPAAIgBgKQgJAMgSAAQgPAAgHgJg");
	this.shape_136.setTransform(627.35,399.15);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#2F3542").s().p("AgcBCIgGgBIAAgNIAEAAQAJAAAEgDQAFgDADgJIADgKIgihdIASAAIAXBGIAWhGIARAAIgmBtQgHAYgUAAg");
	this.shape_137.setTransform(618.15,400.975);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#2F3542").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_138.setTransform(608.925,398.95);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#2F3542").s().p("AgbAkQgNgMAAgVIAAgDQAAgOAGgKQAFgMAKgGQAKgGAKAAQATAAAKAMQAKAMAAAXIAAAGIg/AAQABAOAHAIQAIAJALAAQAJAAAGgEQAFgDAFgGIAKAIQgMATgYAAQgSgBgMgNgAgPgcQgGAHgCANIAvAAIAAgBQgBgNgFgGQgHgHgKAAQgIAAgIAHg");
	this.shape_139.setTransform(599.25,399.05);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#2F3542").s().p("AgnBDIAAiDIAOAAIABALQALgNAQAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgJANgSAAQgQAAgKgLIAAAugAgXgnIAAAtQAHANAQAAQAKAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgPAAgHANg");
	this.shape_140.setTransform(589.55,400.775);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#2F3542").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_141.setTransform(574.475,398.95);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#2F3542").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgJgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_142.setTransform(564.575,399.05);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgIAAgIIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgEAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAHQgKAJgQAAQgKgBgJgEg");
	this.shape_143.setTransform(555.025,399.05);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#2F3542").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQADACgBAEQABAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_144.setTransform(548.25,397.325);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#2F3542").s().p("AgnBDIAAiDIAOAAIABALQAKgNARAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgKANgRAAQgQAAgKgLIAAAugAgXgnIAAAtQAHANAQAAQAKAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgPAAgHANg");
	this.shape_145.setTransform(541.2,400.775);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#2F3542").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgJgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_146.setTransform(531.025,399.05);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#2F3542").s().p("AgHBEIAAiGIAPAAIAACGg");
	this.shape_147.setTransform(523.975,397.05);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgIAAgIIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgEAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAHQgKAJgQAAQgKgBgJgEg");
	this.shape_148.setTransform(512.275,399.05);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#2F3542").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgJgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_149.setTransform(502.725,399.05);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#2F3542").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_150.setTransform(494.625,398);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#2F3542").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAFAAACADQACACABAEQgBAEgCADQgCADgFAAQgEAAgCgDg");
	this.shape_151.setTransform(489.8,397.325);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgIAAgIIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgEAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAHQgKAJgQAAQgKgBgJgEg");
	this.shape_152.setTransform(482.925,399.05);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#2F3542").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_153.setTransform(474.375,397.05);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#2F3542").s().p("AgbAkQgNgMAAgVIAAgDQABgOAFgKQAGgMAJgGQAKgGAKAAQATAAAKAMQAKAMAAAXIAAAGIg/AAQABAOAHAIQAIAJALAAQAJAAAGgEQAFgDAFgGIAKAIQgMATgXAAQgTgBgMgNgAgOgcQgHAHgCANIAvAAIAAgBQAAgNgGgGQgHgHgKAAQgIAAgHAHg");
	this.shape_154.setTransform(464.5,399.05);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#2F3542").s().p("AgHBEIAAiGIAPAAIAACGg");
	this.shape_155.setTransform(457.475,397.05);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#2F3542").s().p("AgnBDIAAiDIAPAAIABALQAJgNARAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgJANgRAAQgRAAgKgLIAAAugAgXgnIAAAtQAIANAOAAQALAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgOAAgIANg");
	this.shape_156.setTransform(450.45,400.775);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#2F3542").s().p("AAzAxIAAg+QAAgLgFgFQgFgEgLgBQgJAAgGAGQgGAFgBAKIAAA+IgPAAIAAg+QAAgUgUgBQgQAAgGAOIAABFIgRAAIAAhfIAQAAIAAALQALgMASAAQATAAAHAPQAEgHAIgEQAIgEAKAAQAfAAABAhIAAA/g");
	this.shape_157.setTransform(437.275,398.95);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#2F3542").s().p("AgeAkQgMgNAAgXIAAAAQAAgOAFgLQAGgLAKgGQAJgHAMABQATAAAMANQAMANAAAWIAAABQAAAOgFALQgFALgKAGQgKAGgNABQgSAAgMgOgAgTgaQgHAKAAARQAAAQAHAJQAIAKALAAQAMAAAIgKQAHgJAAgRQAAgPgHgKQgIgKgMAAQgLAAgIAJg");
	this.shape_158.setTransform(424.325,399.05);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#2F3542").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_159.setTransform(415.275,397.05);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#2F3542").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_160.setTransform(400.275,398.95);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#2F3542").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgJgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_161.setTransform(390.375,399.05);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#2F3542").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_162.setTransform(380.275,400.825);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#2F3542").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_163.setTransform(370.425,398.95);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#2F3542").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQADACgBAEQABAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_164.setTransform(363.3,397.325);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#2F3542").s().p("AgcA2QgLgNAAgWIAAgBQAAgVAKgNQAKgNASAAQAPAAAKALIAAgxIAQAAIAACGIgPAAIAAgKQgLALgQABQgRgBgJgOgAgQgHQgHAJAAASQAAAQAHAJQAHAJAKAAQAQAAAHgNIAAgrQgIgOgPAAQgKABgHAIg");
	this.shape_165.setTransform(355.8,397.15);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#2F3542").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_166.setTransform(345.975,398.95);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#2F3542").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgJgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_167.setTransform(336.075,399.05);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#2F3542").s().p("AgYA3IgBAMIgOAAIAAiGIAQAAIAAAyQAKgMAQAAQARgBAKANQAKAOAAAVIAAACQAAAWgKANQgKAOgRAAQgRgBgKgNgAgXgBIAAApQAHAOAQAAQALAAAGgJQAHgIAAgTQAAgQgHgJQgGgIgLgBQgQAAgHAPg");
	this.shape_168.setTransform(326.375,397.15);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#2F3542").s().p("AgWAxIAAhfIAPAAIABALQAHgNAPABQAFgBACACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_169.setTransform(318.55,398.95);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#2F3542").s().p("AgbAkQgMgMAAgVIAAgDQgBgOAGgKQAFgMAKgGQAKgGAKAAQATAAAKAMQALAMAAAXIAAAGIhAAAQAAAOAIAIQAIAJALAAQAJAAAFgEQAHgDAEgGIAKAIQgMATgXAAQgTgBgMgNgAgOgcQgHAHgBANIAuAAIAAgBQAAgNgHgGQgFgHgLAAQgJAAgGAHg");
	this.shape_170.setTransform(310.3,399.05);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#2F3542").s().p("AgnBDIAAiDIAPAAIABALQAJgNARAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgJANgRAAQgRAAgKgLIAAAugAgXgnIAAAtQAIANAOAAQALAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgOAAgIANg");
	this.shape_171.setTransform(300.6,400.775);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#2F3542").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_172.setTransform(285.275,400.825);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#2F3542").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_173.setTransform(275.425,398.95);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#2F3542").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgJgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_174.setTransform(265.525,399.05);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#2F3542").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_175.setTransform(257.425,398);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#2F3542").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_176.setTransform(249.775,398.95);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#2F3542").s().p("AgbAkQgMgMAAgVIAAgDQgBgOAGgKQAFgMAKgGQAKgGAKAAQATAAAKAMQALAMAAAXIAAAGIhAAAQAAAOAIAIQAIAJALAAQAJAAAFgEQAHgDAEgGIAKAIQgMATgXAAQgTgBgMgNgAgOgcQgHAHgBANIAuAAIAAgBQAAgNgHgGQgFgHgLAAQgJAAgGAHg");
	this.shape_177.setTransform(240.1,399.05);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#2F3542").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_178.setTransform(232.025,398);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#2F3542").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgJgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_179.setTransform(219.575,399.05);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#2F3542").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_180.setTransform(211.475,398);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#2F3542").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgJgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_181.setTransform(203.875,399.05);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#2F3542").s().p("AgdA2QgKgNAAgWIAAgBQAAgVAKgNQALgNAQAAQAQAAAKALIAAgxIAQAAIAACGIgPAAIgBgKQgJALgRABQgQgBgLgOgAgQgHQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgNIAAgrQgIgOgOAAQgLABgHAIg");
	this.shape_182.setTransform(193.7,397.15);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#2F3542").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_183.setTransform(179.025,398.95);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#2F3542").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgJgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_184.setTransform(169.125,399.05);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#2F3542").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_185.setTransform(160.325,397.05);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#2F3542").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQADACAAAEQAAAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_186.setTransform(153,397.325);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#2F3542").s().p("AgRBTIAAgOIAHABQAGAAADgDQABgDAAgHIAAhqIAQAAIAABqQAAAbgYAAQgEAAgFgBgAABhDQgBgDgBgEQABgDABgDQACgDAFAAQAFAAADADQACACAAAEQAAAEgCADQgDACgFAAQgFAAgCgCg");
	this.shape_187.setTransform(147.75,399.25);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#2F3542").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgJgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_188.setTransform(141.575,399.05);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#2F3542").s().p("AgcBCIgGgBIAAgNIAFAAQAHAAAFgDQAFgDADgJIADgKIghhdIARAAIAXBGIAWhGIASAAIgnBtQgIAYgTAAg");
	this.shape_189.setTransform(132.45,400.975);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#2F3542").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_190.setTransform(123.225,398.95);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#2F3542").s().p("AgbAkQgMgMAAgVIAAgDQgBgOAGgKQAGgMAJgGQAKgGAKAAQATAAAKAMQALAMAAAXIAAAGIhAAAQAAAOAIAIQAIAJALAAQAJAAAFgEQAHgDAEgGIAKAIQgMATgXAAQgTgBgMgNgAgPgcQgGAHgBANIAuAAIAAgBQAAgNgHgGQgFgHgLAAQgIAAgIAHg");
	this.shape_191.setTransform(113.55,399.05);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#2F3542").s().p("AAvBAIAAgyIABg0IgpBmIgNAAIgphmIABA0IAAAyIgQAAIAAh/IAVAAIApBoIAqhoIAVAAIAAB/g");
	this.shape_192.setTransform(100.85,397.4);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#2F3542").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgDgDABgEQgBgEADgCQACgDAEAAQAFAAACADQACACAAAEQAAAEgCADQgCADgFAAQgEAAgCgDg");
	this.shape_193.setTransform(859.45,362.725);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#2F3542").s().p("AgWAwIAAhdIAPAAIABALQAHgOAPAAQAEAAADACIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_194.setTransform(854.7,364.35);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#2F3542").s().p("AgdAqQgJgIAAgNQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAFAAAGIgQAAQAAgHAFgHQAFgHAJgDQAIgEAKgBQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgHgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_195.setTransform(846.225,364.45);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#2F3542").s().p("AAVBDIAAg/QAAgJgFgEQgEgGgKAAQgHABgGADQgGAFgDAGIAABDIgQAAIAAiGIAQAAIAAA0QALgOAQAAQAeABAAAgIAAA/g");
	this.shape_196.setTransform(836.425,362.45);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#2F3542").s().p("AgUAHIAAgNIApAAIAAANg");
	this.shape_197.setTransform(828.975,363.775);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#2F3542").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgDgDABgEQgBgEADgCQACgDAEAAQAFAAACADQACACAAAEQAAAEgCADQgCADgFAAQgEAAgCgDg");
	this.shape_198.setTransform(824.35,362.725);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#2F3542").s().p("AgWAwIAAhdIAPAAIABALQAHgOAPAAQAEAAADACIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_199.setTransform(819.6,364.35);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#2F3542").s().p("AgdAqQgJgIAAgNQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAFAAAGIgQAAQAAgHAFgHQAFgHAJgDQAIgEAKgBQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgHgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_200.setTransform(811.125,364.45);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#2F3542").s().p("AAVBDIAAg/QAAgJgFgEQgEgGgKAAQgHABgGADQgGAFgDAGIAABDIgQAAIAAiGIAQAAIAAA0QALgOAQAAQAeABAAAgIAAA/g");
	this.shape_201.setTransform(801.325,362.45);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#2F3542").s().p("AgbAlQgNgNAAgWIAAgCQABgNAFgMQAGgLAJgGQAKgHAKAAQATAAAKANQAKAMAAAXIAAAFIg/AAQAAAOAIAJQAIAJALAAQAJAAAGgDQAFgEAFgGIAKAIQgMASgYAAQgSAAgMgMgAgOgcQgHAIgCANIAvAAIAAgCQAAgMgGgHQgHgHgKAAQgJAAgGAHg");
	this.shape_202.setTransform(791.65,364.45);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgGQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgDgDgFQgEgGAAgGQAAgMAKgJQAKgHAPgBQAQAAAKAJQAKAIAAAOIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAIQgKAHgQAAQgKABgJgFg");
	this.shape_203.setTransform(782.125,364.45);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgKgFgEQgEgGgKAAQgHABgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgOARAAQAeABAAAhIAAA+g");
	this.shape_204.setTransform(768.075,364.35);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#2F3542").s().p("AgdAqQgJgIAAgNQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAFAAAGIgQAAQAAgHAFgHQAFgHAJgDQAIgEAKgBQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgHgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_205.setTransform(758.175,364.45);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#2F3542").s().p("AgnBDIAAiDIAPAAIABALQAKgNAQAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgJANgSAAQgQAAgKgLIAAAugAgXgnIAAAtQAHANAPAAQALAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgOAAgIANg");
	this.shape_206.setTransform(748.45,366.175);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#2F3542").s().p("AgdAnQgIgIAAgRIAAg9IARAAIAAA8QAAAWASAAQARgBAGgOIAAhDIAQAAIAABdIgPAAIAAgJQgKAMgRgBQgQAAgIgJg");
	this.shape_207.setTransform(738.25,364.55);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#2F3542").s().p("AgdA3QgKgOAAgVIAAgCQAAgUAKgOQAKgOARAAQAQAAAKAMIAAgyIAQAAIAACGIgPAAIgBgKQgKAMgQAAQgRAAgKgNgAgQgHQgHAJAAASQAAAQAHAKQAGAJALAAQAPgBAIgOIAAgqQgIgNgOgBQgMAAgGAJg");
	this.shape_208.setTransform(728,362.55);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#2F3542").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAEAAADADQADACAAAEQAAAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_209.setTransform(721,362.725);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#2F3542").s().p("AAVBDIAAg/QAAgJgFgEQgEgGgKAAQgHABgGADQgGAFgDAGIAABDIgQAAIAAiGIAQAAIAAA0QALgOAQAAQAeABAAAgIAAA/g");
	this.shape_210.setTransform(713.875,362.45);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#2F3542").s().p("AgbAlQgNgNAAgWIAAgCQAAgNAGgMQAFgLAKgGQAKgHAKAAQATAAAKANQALAMgBAXIAAAFIg/AAQAAAOAIAJQAIAJALAAQAJAAAFgDQAGgEAFgGIAKAIQgMASgYAAQgSAAgMgMgAgPgcQgGAIgCANIAvAAIAAgCQgBgMgFgHQgHgHgKAAQgIAAgIAHg");
	this.shape_211.setTransform(704.2,364.45);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#2F3542").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_212.setTransform(695.425,362.45);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgKgFgEQgEgGgKAAQgHABgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgOARAAQAeABAAAhIAAA+g");
	this.shape_213.setTransform(680.825,364.35);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#2F3542").s().p("AgdAqQgJgIAAgNQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAFAAAGIgQAAQAAgHAFgHQAFgHAJgDQAIgEAKgBQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgHgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_214.setTransform(670.925,364.45);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgKgFgEQgEgGgKAAQgHABgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgOARAAQAeABAAAhIAAA+g");
	this.shape_215.setTransform(661.075,364.35);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#2F3542").s().p("AgdAqQgJgIAAgNQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAFAAAGIgQAAQAAgHAFgHQAFgHAJgDQAIgEAKgBQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgHgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_216.setTransform(651.175,364.45);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#2F3542").s().p("AgWAwIAAhdIAPAAIABALQAHgOAOAAQAFAAADACIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_217.setTransform(643.75,364.35);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#2F3542").s().p("AgbAlQgNgNAAgWIAAgCQABgNAFgMQAGgLAJgGQAKgHAKAAQATAAAKANQAKAMAAAXIAAAFIg/AAQAAAOAIAJQAIAJALAAQAJAAAGgDQAFgEAFgGIAKAIQgMASgYAAQgSAAgMgMgAgOgcQgHAIgCANIAvAAIAAgCQgBgMgFgHQgHgHgKAAQgIAAgHAHg");
	this.shape_218.setTransform(635.5,364.45);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#2F3542").s().p("AgnBDIAAiDIAPAAIAAALQAKgNARAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgKANgRAAQgQAAgKgLIAAAugAgXgnIAAAtQAHANAQAAQAKAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgPAAgHANg");
	this.shape_219.setTransform(625.8,366.175);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#2F3542").s().p("AAzAwIAAg+QAAgKgFgEQgFgGgLAAQgJABgGAFQgGAGgBAIIAAA+IgPAAIAAg9QAAgVgUAAQgQABgGANIAABEIgRAAIAAhdIAQAAIAAAKQALgNASAAQATABAHAPQAEgHAIgEQAIgFAKAAQAfAAABAiIAAA+g");
	this.shape_220.setTransform(608.175,364.35);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#2F3542").s().p("AgdAqQgJgIAAgNQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAFAAAGIgQAAQAAgHAFgHQAFgHAJgDQAIgEAKgBQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgHgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_221.setTransform(595.375,364.45);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#2F3542").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_222.setTransform(588.325,362.45);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#2F3542").s().p("AgdAqQgJgIAAgNQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAFAAAGIgQAAQAAgHAFgHQAFgHAJgDQAIgEAKgBQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgHgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_223.setTransform(581.225,364.45);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#2F3542").s().p("AgdA3QgKgOAAgVIAAgCQAAgUAKgOQAKgOARAAQAQAAAKAMIAAgyIAQAAIAACGIgPAAIgBgKQgKAMgQAAQgRAAgKgNgAgQgHQgHAJAAASQAAAQAHAKQAHAJAKAAQAPgBAIgOIAAgqQgIgNgOgBQgLAAgHAJg");
	this.shape_224.setTransform(571.05,362.55);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#2F3542").s().p("AgbAlQgMgNAAgWIAAgCQAAgNAFgMQAFgLAKgGQAKgHAKAAQATAAAKANQALAMAAAXIAAAFIhAAAQABAOAHAJQAIAJALAAQAJAAAFgDQAHgEAEgGIAKAIQgMASgXAAQgTAAgMgMgAgOgcQgHAIgBANIAuAAIAAgCQAAgMgHgHQgFgHgLAAQgJAAgGAHg");
	this.shape_225.setTransform(561.5,364.45);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#2F3542").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_226.setTransform(552.725,362.45);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#2F3542").s().p("AgfAqQgIgIAAgMQABgQANgGQAMgJATAAIARAAIABgIQABgIgEgFQgFgFgIAAQgIAAgFADQgHAFgBAHIgQAAQABgJAFgGQAGgGAJgEQAIgEAKAAQAOABAJAIQAIAJgBAOIgIAuIgBAIQAAAEACAFIgBABIgQAAIAAgEIAAgGQgNAMgOAAQgNAAgHgHgAgNAGQgIAFgBAIQgBAHAEAEQAEAFAHAAQAIABAGgFQAGgEAFgGIAEgUIgMAAQgOABgIAEg");
	this.shape_227.setTransform(537.9791,364.45);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#2F3542").s().p("AgOA1QgFgHABgLIAJg6IgQAAIACgNIARAAIAEgXIAPAAIgFAXIASAAIgCANIgSAAIgJA6IAAAEQABAHAGAAIAIgBIgBANQgGACgFAAQgKAAgEgHg");
	this.shape_228.setTransform(530.9,363.375);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#2F3542").s().p("AgfAqQgIgIAAgMQABgQANgGQAMgJATAAIARAAIABgIQABgIgEgFQgFgFgIAAQgIAAgFADQgHAFgBAHIgQAAQABgJAFgGQAGgGAJgEQAIgEAKAAQAOABAJAIQAIAJgBAOIgIAuIgBAIQAAAEACAFIgBABIgQAAIAAgEIAAgGQgNAMgOAAQgNAAgHgHgAgNAGQgIAFgBAIQgBAHAEAEQAEAFAHAAQAIABAGgFQAGgEAFgGIAEgUIgMAAQgOABgIAEg");
	this.shape_229.setTransform(522.5791,364.45);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#2F3542").s().p("AAsAwIAKg9IAAgJQgCgMgOAAQgIAAgHAGQgIAGgCAIIgKA+IgPAAIAKg9QABgKgEgFQgEgFgJgBQgOAAgJAOIgMBEIgQAAIAQhdIAPAAIgCAKQAMgNARAAQAJABAGAEQAGAEACAHQAOgPASgBQAOABAHAJQAHAKgCAPIgLA9g");
	this.shape_230.setTransform(509.9722,364.35);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#2F3542").s().p("AgdAxIAQheIAOAAIgBALQAKgOANABIAHABIgBAPIgIgBQgPAAgHAOIgNBDg");
	this.shape_231.setTransform(500,364.3491);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#2F3542").s().p("AgeAkQgKgMABgVIABgDQABgOAHgLQAHgMAKgGQAKgFALgBQAOABAJAKQAIAJABAQIgBAMIgBAFIg9AAQgBANAGAKQAFAJAMAAQANAAAMgMIAJAHQgGAJgJAFQgKAEgKAAQgSAAgKgNgAgJgcQgIAGgEAPIAtAAIAAgCQACgLgFgHQgFgIgJAAIgBAAQgJAAgGAHg");
	this.shape_232.setTransform(492.0652,364.45);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#2F3542").s().p("AglA6QgIgKgBgRIABgMQABgPAHgLQAGgLAJgGQAJgGALAAQAPABAIALIAKgyIAQAAIgYCGIgOAAIABgKQgKAMgQAAQgOAAgHgKgAgPgKQgIAGgDAJQgEAMAAALQAAANAEAGQAFAIAJAAQANAAALgPIAHgrQgFgNgOAAIAAAAQgJAAgGAGg");
	this.shape_233.setTransform(482.7667,362.55);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#2F3542").s().p("AgaArQgIgGgEgLQgEgMABgNQABgNAHgMQAHgMAKgGQALgHALAAQAMABAJAGQAIAGAEALQAEALgBAOIAAABQgCANgGAMQgHALgKAHQgLAFgLAAQgMAAgJgGgAgOgaQgJALgCAPIAAABIAAAMQABALAFAFQAFAHAJAAQAHAAAHgEQAHgEAEgJQAFgIABgKIAAgNQgBgLgFgFQgFgHgJAAIgBAAQgLAAgIAJg");
	this.shape_234.setTransform(472.275,364.45);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#2F3542").s().p("AAPAwIALg9IAAgIQgCgNgNAAQgNAAgLAQIgMBCIgQAAIARhdIAPAAIgCALQAMgOAQAAQANABAHAJQAGAJgBAQIgLA9g");
	this.shape_235.setTransform(462.0891,364.35);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#2F3542").s().p("AgSBBIAQheIAPAAIgPBegAADgwQgDgCAAgEQABgEACgDQADgCAEgBQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgDgDg");
	this.shape_236.setTransform(455.675,362.7);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#2F3542").s().p("AAPBDIALg+IAAgHQgCgNgNAAQgNAAgLAPIgMBDIgQAAIAYiGIAQAAIgKA0QAMgOAQAAQANABAHAJQAGAJgBAPIgLA+g");
	this.shape_237.setTransform(448.0891,362.45);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#2F3542").s().p("AgYArQgIgGgEgKQgEgLABgOIABgDQABgOAHgLQAGgKAKgHQAKgFAMgBQAPABAJAKQAIAJAAAPIgOAAQgBgJgFgGQgFgFgIgBQgMAAgIAJQgIAKgCAQIAAACIAAALQAAALAFAGQAGAGAJAAQAHAAAHgFQAHgFACgIIAPAAQgBAJgGAHQgGAIgJAEQgJADgIAAQgMAAgIgGg");
	this.shape_238.setTransform(439.1295,364.45);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#2F3542").s().p("AgxBAIAWh/IBNAAIgCAOIg9AAIgHApIA1AAIgCANIg1AAIgIAtIA9AAIgCAOg");
	this.shape_239.setTransform(429.925,362.8);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgKgFgEQgEgGgKAAQgHABgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgOARAAQAeABAAAhIAAA+g");
	this.shape_240.setTransform(414.975,364.35);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#2F3542").s().p("AgdAqQgJgIAAgNQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAFAAAGIgQAAQAAgHAFgHQAFgHAJgDQAIgEAKgBQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgHgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_241.setTransform(405.075,364.45);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#2F3542").s().p("AgdA3QgKgOAAgVIAAgCQAAgUAKgOQALgOAQAAQAQAAAKAMIAAgyIAQAAIAACGIgPAAIAAgKQgKAMgRAAQgQAAgLgNgAgQgHQgHAJAAASQAAAQAHAKQAGAJALAAQAQgBAHgOIAAgqQgHgNgQgBQgKAAgHAJg");
	this.shape_242.setTransform(394.9,362.55);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#2F3542").s().p("AgfAqQgIgIAAgMQABgQANgGQAMgJATAAIARAAIABgIQABgIgEgFQgFgFgIAAQgIAAgFADQgHAFgBAHIgQAAQABgJAFgGQAGgGAJgEQAIgEAKAAQAOABAJAIQAIAJgBAOIgIAuIgBAIQAAAEACAFIgBABIgQAAIAAgEIAAgGQgNAMgOAAQgNAAgHgHgAgNAGQgIAFgBAIQgBAHAEAEQAEAFAHAAQAIABAGgFQAGgEAFgGIAEgUIgMAAQgOABgIAEg");
	this.shape_243.setTransform(380.4791,364.45);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#2F3542").s().p("AglA6QgIgKgBgRIABgMQABgPAHgLQAGgLAJgGQAJgGALAAQAPABAIALIAKgyIAQAAIgYCGIgOAAIABgKQgKAMgQAAQgOAAgHgKgAgPgKQgIAGgDAJQgEAMAAALQAAANAEAGQAFAIAJAAQANAAALgPIAHgrQgFgNgOAAIAAAAQgJAAgGAGg");
	this.shape_244.setTransform(371.4167,362.55);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#2F3542").s().p("AgSBBIAQheIAPAAIgPBegAADgwQgDgCAAgEQABgEACgDQADgCAEgBQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgDgDg");
	this.shape_245.setTransform(364.075,362.7);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#2F3542").s().p("AgTBDIAXiGIAQAAIgXCGg");
	this.shape_246.setTransform(359.825,362.45);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#2F3542").s().p("AgeAkQgKgMABgVIABgDQABgOAHgLQAHgMAKgGQAKgFALgBQAOABAJAKQAIAJABAQIgBAMIgBAFIg9AAQgBANAGAKQAFAJAMAAQANAAAMgMIAJAHQgGAJgJAFQgKAEgKAAQgSAAgKgNgAgJgcQgIAGgEAPIAtAAIAAgCQACgLgFgHQgFgIgJAAIgBAAQgJAAgGAHg");
	this.shape_247.setTransform(352.8152,364.45);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#2F3542").s().p("AAPAwIALg9IAAgIQgCgNgNAAQgNAAgLAQIgMBCIgQAAIARhdIAPAAIgCALQAMgOAQAAQANABAHAJQAGAJgBAQIgLA9g");
	this.shape_248.setTransform(342.8391,364.35);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#2F3542").s().p("AAPAwIALg9IAAgIQgCgNgNAAQgNAAgLAQIgMBCIgQAAIARhdIAPAAIgCALQAMgOAQAAQANABAHAJQAGAJgBAQIgLA9g");
	this.shape_249.setTransform(333.1391,364.35);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#2F3542").s().p("AAmBAIgGghIgyAAIgSAhIgRAAIBEh/IAOAAIAaB/gAgLAQIApAAIgKg6g");
	this.shape_250.setTransform(321.95,362.8);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#2F3542").s().p("AAzAwIAAg+QAAgKgFgEQgFgGgLAAQgJABgGAFQgGAGgBAIIAAA+IgPAAIAAg9QAAgVgUAAQgQABgGANIAABEIgRAAIAAhdIAQAAIAAAKQALgNASAAQATABAHAPQAEgHAIgEQAIgFAKAAQAfAAABAiIAAA+g");
	this.shape_251.setTransform(304.825,364.35);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#2F3542").s().p("AgcAnQgJgIABgRIAAg9IAQAAIAAA8QgBAWATAAQARgBAGgOIAAhDIAQAAIAABdIgPAAIgBgJQgJAMgSgBQgPAAgHgJg");
	this.shape_252.setTransform(292,364.55);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#2F3542").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_253.setTransform(284.875,362.45);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#2F3542").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAFAAACADQACACABAEQgBAEgCADQgCADgFAAQgEAAgCgDg");
	this.shape_254.setTransform(280.55,362.725);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#2F3542").s().p("AgmBAIAAh/IBOAAIAAAOIg+AAIAAAsIA1AAIAAAMIg1AAIAAA5g");
	this.shape_255.setTransform(273.85,362.8);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#2F3542").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_256.setTransform(261.8,362.725);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgGQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgDgDgFQgEgGAAgGQAAgMAKgJQAKgHAPgBQAQAAAKAJQAKAIAAAOIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAIQgKAHgQAAQgKABgJgFg");
	this.shape_257.setTransform(254.925,364.45);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#2F3542").s().p("AgnBDIAAiDIAPAAIABALQAJgNARAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgKANgRAAQgQAAgKgLIAAAugAgXgnIAAAtQAHANAQAAQAKAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgPAAgHANg");
	this.shape_258.setTransform(245.45,366.175);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#2F3542").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQADACAAAEQAAAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_259.setTransform(238.05,362.725);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#2F3542").s().p("AgWAwIAAhdIAQAAIAAALQAHgOAOAAQAGAAACACIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_260.setTransform(233.3,364.35);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#2F3542").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_261.setTransform(225.825,362.45);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgGQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgDgDgFQgEgGAAgGQAAgMAKgJQAKgHAPgBQAQAAAKAJQAKAIAAAOIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAIQgKAHgQAAQgKABgJgFg");
	this.shape_262.setTransform(215.975,364.45);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#2F3542").s().p("AgbAlQgNgNAAgWIAAgCQABgNAFgMQAGgLAJgGQAKgHAKAAQATAAAKANQAKAMAAAXIAAAFIg/AAQAAAOAIAJQAIAJALAAQAJAAAGgDQAFgEAFgGIAKAIQgMASgXAAQgTAAgMgMgAgOgcQgHAIgBANIAuAAIAAgCQAAgMgGgHQgHgHgKAAQgIAAgHAHg");
	this.shape_263.setTransform(206.65,364.45);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#2F3542").s().p("AgcA3QgLgOAAgVIAAgCQAAgUAKgOQAKgOASAAQAPAAAKAMIAAgyIAQAAIAACGIgPAAIAAgKQgLAMgQAAQgRAAgJgNgAgQgHQgHAJAAASQAAAQAHAKQAHAJAKAAQAQgBAHgOIAAgqQgIgNgPgBQgKAAgHAJg");
	this.shape_264.setTransform(196.5,362.55);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgKgFgEQgEgGgKAAQgHABgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgOARAAQAeABAAAhIAAA+g");
	this.shape_265.setTransform(182.225,364.35);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#2F3542").s().p("AgdAqQgJgIAAgNQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAFAAAGIgQAAQAAgHAFgHQAFgHAJgDQAIgEAKgBQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgHgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_266.setTransform(172.325,364.45);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#2F3542").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_267.setTransform(163.525,362.45);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#2F3542").s().p("AgCA1QgGgHAAgMIAAg5IgRAAIAAgNIARAAIAAgXIAQAAIAAAXIARAAIAAANIgRAAIAAA5QAAAGACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_268.setTransform(155.125,363.4);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#2F3542").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQADACAAAEQAAAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_269.setTransform(150.3,362.725);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#2F3542").s().p("AgdAqQgJgIAAgNQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAFAAAGIgQAAQAAgHAFgHQAFgHAJgDQAIgEAKgBQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgHgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_270.setTransform(143.175,364.45);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#2F3542").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_271.setTransform(133.075,366.225);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgKgFgEQgEgGgKAAQgHABgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgOARAAQAeABAAAhIAAA+g");
	this.shape_272.setTransform(123.225,364.35);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#2F3542").s().p("AgbAlQgMgNAAgWIAAgCQgBgNAGgMQAGgLAJgGQAKgHAKAAQATAAAKANQALAMAAAXIAAAFIhAAAQAAAOAIAJQAIAJALAAQAJAAAFgDQAHgEAEgGIAKAIQgMASgXAAQgTAAgMgMgAgPgcQgGAIgBANIAuAAIAAgCQAAgMgHgHQgFgHgLAAQgIAAgIAHg");
	this.shape_273.setTransform(113.55,364.45);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#2F3542").s().p("AAvBAIAAgyIABg1IgpBnIgNAAIgphnIABA1IAAAyIgQAAIAAh/IAVAAIApBnIAqhnIAVAAIAAB/g");
	this.shape_274.setTransform(100.85,362.8);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#2F3542").s().p("AgfApQgIgHAAgMQABgPANgIQAMgIATAAIARAAIABgHQABgJgEgFQgFgFgIgBQgIABgFAEQgHAEgBAGIgQABQABgJAFgGQAGgGAJgEQAIgDAKgBQAOABAJAIQAIAJgBAPIgIAuIgBAHQAAAFACAEIgBACIgQAAIAAgGIAAgEQgNAMgOgBQgNAAgHgIgAgNAGQgIAFgBAJQgBAGAEAFQAEAEAHAAQAIAAAGgEQAGgDAFgHIAEgTIgMAAQgOgBgIAFg");
	this.shape_275.setTransform(681.6791,329.85);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#2F3542").s().p("AgPA1QgEgHABgLIAJg6IgQAAIACgNIARAAIAEgXIAOAAIgDAXIARAAIgCANIgRAAIgJA6IAAAEQAAAHAGAAIAIgBIgCANQgFACgFAAQgJAAgGgHg");
	this.shape_276.setTransform(674.6,328.775);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#2F3542").s().p("AgfApQgIgHAAgMQABgPANgIQAMgIATAAIARAAIABgHQABgJgEgFQgFgFgIgBQgIABgFAEQgHAEgBAGIgQABQABgJAFgGQAGgGAJgEQAIgDAKgBQAOABAJAIQAIAJgBAPIgIAuIgBAHQAAAFACAEIgBACIgQAAIAAgGIAAgEQgNAMgOgBQgNAAgHgIgAgNAGQgIAFgBAJQgBAGAEAFQAEAEAHAAQAIAAAGgEQAGgDAFgHIAEgTIgMAAQgOgBgIAFg");
	this.shape_277.setTransform(666.2791,329.85);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#2F3542").s().p("AAsAxIAKg+IAAgIQgCgMgOAAQgIgBgHAFQgIAHgCAJIgKA+IgPAAIAKg+QABgKgEgFQgEgGgJABQgOgBgJAOIgMBFIgQAAIAQhfIAPAAIgCALQAMgNARAAQAJABAGAEQAGAEACAHQAOgQASAAQAOABAHAJQAHAJgCAQIgLA+g");
	this.shape_278.setTransform(653.6722,329.75);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#2F3542").s().p("AgeAxIARheIAPAAIgCALQAJgOAOABIAHABIgBAPIgIgBQgPAAgIAOIgMBDg");
	this.shape_279.setTransform(643.7,329.7491);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#2F3542").s().p("AgeAkQgKgNABgTIABgEQABgNAHgMQAHgMAKgFQAKgHALAAQAOABAJAJQAIAKABAQIgBALIgBAGIg9AAQgBAOAGAIQAFAKAMAAQANAAAMgNIAJAIQgGAJgJAEQgKAGgKgBQgSAAgKgNgAgJgdQgIAIgEAOIAtAAIAAgCQACgLgFgIQgFgHgJAAIgBAAQgJAAgGAGg");
	this.shape_280.setTransform(635.7652,329.85);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#2F3542").s().p("AglA6QgIgKgBgRIABgMQABgPAHgKQAGgMAJgGQAJgFALgBQAPABAIALIAKgxIAQAAIgYCGIgOAAIABgKQgKAMgQgBQgOAAgHgKgAgPgKQgIAGgDAJQgEAMAAALQAAAMAEAIQAFAGAJAAQANABALgOIAHgrQgFgNgOAAIAAgBQgJAAgGAGg");
	this.shape_281.setTransform(626.4667,327.95);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#2F3542").s().p("AgaArQgIgHgEgLQgEgLABgMQABgOAHgMQAHgMAKgGQALgGALgBQAMABAJAGQAIAHAEALQAEAKgBAOIAAABQgCANgGAMQgHALgKAGQgLAHgLgBQgMAAgJgGgAgOgZQgJAJgCAQIAAACIAAALQABAKAFAHQAFAGAJAAQAHAAAHgEQAHgEAEgIQAFgJABgKIAAgNQgBgKgFgHQgFgFgJgBIgBAAQgLAAgIAKg");
	this.shape_282.setTransform(615.975,329.85);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#2F3542").s().p("AAPAxIALg+IAAgIQgCgMgNAAQgNgBgLAPIgMBEIgQAAIARhfIAPAAIgCANQAMgOAQgBQANABAHAJQAGAJgBAQIgLA+g");
	this.shape_283.setTransform(605.7891,329.75);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#2F3542").s().p("AgSBBIAQheIAPAAIgPBegAADgvQgDgDAAgEQABgEACgDQADgDAEAAQAEAAADACQACADAAAFQAAADgCADQgDADgEAAQgEAAgDgCg");
	this.shape_284.setTransform(599.375,328.1);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#2F3542").s().p("AAPBEIALg/IAAgHQgCgMgNAAQgNgBgLAPIgMBEIgQAAIAYiGIAQAAIgKAzQAMgNAQgBQANABAHAJQAGAJgBAPIgLA/g");
	this.shape_285.setTransform(591.7891,327.85);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#2F3542").s().p("AgYArQgIgGgEgLQgEgKABgOIABgEQABgNAHgLQAGgLAKgFQAKgHAMAAQAPABAJAJQAIALAAAOIgOAAQgBgJgFgGQgFgGgIAAQgMgBgIAKQgIAKgCAQIAAACIAAALQAAALAFAGQAGAGAJAAQAHABAHgGQAHgFACgJIAPAAQgBAJgGAIQgGAHgJAFQgJADgIAAQgMAAgIgGg");
	this.shape_286.setTransform(582.8295,329.85);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f("#2F3542").s().p("AgxBAIAWh/IBNAAIgCAOIg9AAIgHApIA1AAIgCANIg1AAIgIAtIA9AAIgCAOg");
	this.shape_287.setTransform(573.625,328.2);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#2F3542").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKAAQgHAAgGADQgGAFgDAGIAABEIgQAAIAAhfIAPAAIAAANQALgOARgBQAeAAAAAjIAAA+g");
	this.shape_288.setTransform(558.675,329.75);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f("#2F3542").s().p("AgdApQgJgHAAgNQAAgPALgHQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgHAFgHQAFgGAJgFQAIgDAKgBQAQABAJAIQAKAIAAAOIAAArQAAAOADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_289.setTransform(548.775,329.85);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#2F3542").s().p("AgcA2QgLgNAAgVIAAgCQAAgVAKgNQAKgNASgBQAPAAAKAMIAAgxIAQAAIAACGIgPAAIAAgKQgLAMgQgBQgRAAgJgOgAgQgGQgHAIAAASQAAAQAHAJQAGAJALAAQAQAAAHgNIAAgrQgHgNgQAAQgLAAgGAJg");
	this.shape_290.setTransform(538.6,327.95);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f("#2F3542").s().p("AgfApQgIgHAAgMQABgPANgIQAMgIATAAIARAAIABgHQABgJgEgFQgFgFgIgBQgIABgFAEQgHAEgBAGIgQABQABgJAFgGQAGgGAJgEQAIgDAKgBQAOABAJAIQAIAJgBAPIgIAuIgBAHQAAAFACAEIgBACIgQAAIAAgGIAAgEQgNAMgOgBQgNAAgHgIgAgNAGQgIAFgBAJQgBAGAEAFQAEAEAHAAQAIAAAGgEQAGgDAFgHIAEgTIgMAAQgOgBgIAFg");
	this.shape_291.setTransform(524.1791,329.85);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#2F3542").s().p("AglA6QgIgKgBgRIABgMQABgPAHgKQAGgMAJgGQAJgFALgBQAPABAIALIAKgxIAQAAIgYCGIgOAAIABgKQgKAMgQgBQgOAAgHgKgAgPgKQgIAGgDAJQgEAMAAALQAAAMAEAIQAFAGAJAAQANABALgOIAHgrQgFgNgOAAIAAgBQgJAAgGAGg");
	this.shape_292.setTransform(515.1167,327.95);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f("#2F3542").s().p("AgSBBIAQheIAPAAIgPBegAADgvQgDgDAAgEQABgEACgDQADgDAEAAQAEAAADACQACADAAAFQAAADgCADQgDADgEAAQgEAAgDgCg");
	this.shape_293.setTransform(507.775,328.1);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#2F3542").s().p("AgTBEIAXiGIAQAAIgXCGg");
	this.shape_294.setTransform(503.525,327.85);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f("#2F3542").s().p("AgeAkQgKgNABgTIABgEQABgNAHgMQAHgMAKgFQAKgHALAAQAOABAJAJQAIAKABAQIgBALIgBAGIg9AAQgBAOAGAIQAFAKAMAAQANAAAMgNIAJAIQgGAJgJAEQgKAGgKgBQgSAAgKgNgAgJgdQgIAIgEAOIAtAAIAAgCQACgLgFgIQgFgHgJAAIgBAAQgJAAgGAGg");
	this.shape_295.setTransform(496.5152,329.85);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#2F3542").s().p("AAPAxIALg+IAAgIQgCgMgNAAQgNgBgLAPIgMBEIgQAAIARhfIAPAAIgCANQAMgOAQgBQANABAHAJQAGAJgBAQIgLA+g");
	this.shape_296.setTransform(486.5391,329.75);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f("#2F3542").s().p("AAPAxIALg+IAAgIQgCgMgNAAQgNgBgLAPIgMBEIgQAAIARhfIAPAAIgCANQAMgOAQgBQANABAHAJQAGAJgBAQIgLA+g");
	this.shape_297.setTransform(476.8391,329.75);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#2F3542").s().p("AAnBAIgHghIgzAAIgRAhIgSAAIBFh/IAPAAIAYB/gAgLARIApAAIgKg7g");
	this.shape_298.setTransform(465.65,328.2);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f("#2F3542").s().p("AAzAxIAAg+QAAgLgFgFQgFgEgLAAQgJgBgGAGQgGAFgBAKIAAA+IgPAAIAAg+QAAgUgUAAQgQAAgGANIAABFIgRAAIAAhfIAQAAIAAALQALgNASAAQATAAAHAQQAEgHAIgEQAIgEAKgBQAfABABAhIAAA/g");
	this.shape_299.setTransform(448.525,329.75);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#2F3542").s().p("AgdAnQgHgJgBgRIAAg9IAQAAIAAA9QABAVARAAQASAAAGgNIAAhFIARAAIAABfIgQAAIAAgKQgKALgRAAQgPABgJgKg");
	this.shape_300.setTransform(435.7,329.95);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f("#2F3542").s().p("AgHBEIAAiGIAPAAIAACGg");
	this.shape_301.setTransform(428.575,327.85);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#2F3542").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_302.setTransform(424.25,328.125);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f("#2F3542").s().p("AgmBAIAAh/IBNAAIAAAOIg9AAIAAArIA1AAIAAANIg1AAIAAA5g");
	this.shape_303.setTransform(417.55,328.2);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#2F3542").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQADACgBAEQABAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_304.setTransform(405.5,328.125);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgEQAFgEAAgFQAAgHgEgEQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPAAQAQABAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAFAAAIQAAANgLAHQgKAJgQgBQgKAAgJgEg");
	this.shape_305.setTransform(398.625,329.85);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f("#2F3542").s().p("AgdApQgJgHAAgNQAAgPALgHQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgHAFgHQAFgGAJgFQAIgDAKgBQAQABAJAIQAKAIAAAOIAAArQAAAOADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_306.setTransform(389.075,329.85);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f("#2F3542").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_307.setTransform(380.275,327.85);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f("#2F3542").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_308.setTransform(372.95,328.125);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f("#2F3542").s().p("AgNBFIAAhSIgPAAIAAgNIAPAAIAAgKQAAgOAIgJQAHgJAPABIAMABIgBANIgJgBQgIABgEAEQgFAEAAAJIAAAKIAVAAIAAANIgVAAIAABSg");
	this.shape_309.setTransform(367.975,327.75);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f("#2F3542").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQADACgBAEQABAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_310.setTransform(362.4,328.125);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgEQAFgEAAgFQAAgHgEgEQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPAAQAQABAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAFAAAIQAAANgLAHQgKAJgQgBQgKAAgJgEg");
	this.shape_311.setTransform(355.525,329.85);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f("#2F3542").s().p("AgdApQgJgHAAgNQAAgPALgHQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgHAFgHQAFgGAJgFQAIgDAKgBQAQABAJAIQAKAIAAAOIAAArQAAAOADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_312.setTransform(345.975,329.85);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f("#2F3542").s().p("AgHBEIAAiGIAPAAIAACGg");
	this.shape_313.setTransform(338.925,327.85);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f("#2F3542").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_314.setTransform(332.825,327.85);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f("#2F3542").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKAAQgHAAgGADQgGAFgDAGIAABEIgQAAIAAhfIAPAAIAAANQALgOARgBQAeAAAAAjIAAA+g");
	this.shape_315.setTransform(318.225,329.75);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f("#2F3542").s().p("AgdApQgJgHAAgNQAAgPALgHQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgHAFgHQAFgGAJgFQAIgDAKgBQAQABAJAIQAKAIAAAOIAAArQAAAOADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_316.setTransform(308.325,329.85);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f("#2F3542").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_317.setTransform(298.225,331.625);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f("#2F3542").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKAAQgHAAgGADQgGAFgDAGIAABEIgQAAIAAhfIAPAAIAAANQALgOARgBQAeAAAAAjIAAA+g");
	this.shape_318.setTransform(288.375,329.75);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f("#2F3542").s().p("AgbAlQgMgNAAgVIAAgDQgBgOAGgKQAGgMAJgGQAKgGAKgBQATAAAKANQALAMAAAXIAAAFIhAAAQAAAOAIAKQAIAIALAAQAJAAAFgEQAHgDAEgGIAKAIQgMATgXgBQgTABgMgNgAgPgcQgGAHgBAOIAuAAIAAgCQAAgNgHgGQgFgHgLAAQgIAAgIAHg");
	this.shape_319.setTransform(278.7,329.85);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f("#2F3542").s().p("AgdA2QgKgNAAgVIAAgCQAAgVAKgNQAKgNARgBQAQAAAKAMIAAgxIAQAAIAACGIgPAAIgBgKQgKAMgQgBQgRAAgKgOgAgQgGQgHAIAAASQAAAQAHAJQAGAJALAAQAPAAAIgNIAAgrQgHgNgPAAQgMAAgGAJg");
	this.shape_320.setTransform(268.55,327.95);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f("#2F3542").s().p("AgWAxIAAhfIAQAAIAAALQAHgNAOAAQAGABACABIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_321.setTransform(256.7,329.75);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f("#2F3542").s().p("AgcAnQgJgJAAgRIAAg9IARAAIAAA9QAAAVASAAQARAAAGgNIAAhFIAQAAIAABfIgPAAIAAgKQgKALgRAAQgQABgHgKg");
	this.shape_322.setTransform(248.2,329.95);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f("#2F3542").s().p("AgCA1QgGgGAAgMIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_323.setTransform(240.025,328.8);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f("#2F3542").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_324.setTransform(233.425,327.85);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f("#2F3542").s().p("AgdAnQgHgJgBgRIAAg9IAQAAIAAA9QABAVARAAQASAAAGgNIAAhFIARAAIAABfIgQAAIgBgKQgJALgRAAQgPABgJgKg");
	this.shape_325.setTransform(223.3,329.95);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f("#2F3542").s().p("AgWAxIAAhfIAPAAIABALQAHgNAOAAQAFABADABIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_326.setTransform(215.8,329.75);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f("#2F3542").s().p("AgCA1QgGgGAAgMIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_327.setTransform(209.025,328.8);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgEQAFgEAAgFQAAgHgEgEQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPAAQAQABAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAFAAAIQAAANgLAHQgKAJgQgBQgKAAgJgEg");
	this.shape_328.setTransform(201.675,329.85);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f("#2F3542").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKAAQgHAAgGADQgGAFgDAGIAABEIgQAAIAAhfIAPAAIAAANQALgOARgBQAeAAAAAjIAAA+g");
	this.shape_329.setTransform(187.625,329.75);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f("#2F3542").s().p("AgdApQgJgHAAgNQAAgPALgHQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgHAFgHQAFgGAJgFQAIgDAKgBQAQABAJAIQAKAIAAAOIAAArQAAAOADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_330.setTransform(177.725,329.85);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f("#2F3542").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_331.setTransform(168.925,327.85);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f("#2F3542").s().p("AgnBDIAAiDIAOAAIABALQALgNAQAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgJANgSAAQgQAAgKgLIAAAugAgXgnIAAAtQAHANAQAAQAKAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgPAAgHANg");
	this.shape_332.setTransform(158.9,331.575);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f("#2F3542").s().p("AgdApQgJgHAAgNQAAgPALgHQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgHAFgHQAFgGAJgFQAIgDAKgBQAQABAJAIQAKAIAAAOIAAArQAAAOADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_333.setTransform(148.725,329.85);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f("#2F3542").s().p("AgWAxIAAhfIAQAAIAAALQAHgNAOAAQAFABADABIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_334.setTransform(141.3,329.75);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f("#2F3542").s().p("AgbAlQgNgNAAgVIAAgDQAAgOAGgKQAFgMAKgGQAKgGAKgBQATAAAKANQAKAMAAAXIAAAFIg/AAQABAOAHAKQAIAIALAAQAJAAAGgEQAFgDAFgGIAKAIQgMATgYgBQgSABgMgNgAgPgcQgGAHgCAOIAvAAIAAgCQgBgNgFgGQgHgHgKAAQgIAAgIAHg");
	this.shape_335.setTransform(133.05,329.85);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f("#2F3542").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKAAQgHAAgGADQgGAFgDAGIAABEIgQAAIAAhfIAPAAIAAANQALgOARgBQAeAAAAAjIAAA+g");
	this.shape_336.setTransform(123.225,329.75);

	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f("#2F3542").s().p("AgbAlQgMgNAAgVIAAgDQgBgOAGgKQAGgMAJgGQAKgGAKgBQATAAAKANQALAMAAAXIAAAFIhAAAQAAAOAIAKQAIAIALAAQAJAAAFgEQAHgDAEgGIAKAIQgMATgXgBQgTABgMgNgAgPgcQgGAHgBAOIAuAAIAAgCQAAgNgHgGQgFgHgLAAQgIAAgIAHg");
	this.shape_337.setTransform(113.55,329.85);

	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f("#2F3542").s().p("AAvBAIAAgyIABg0IgpBmIgNAAIgphmIABA0IAAAyIgQAAIAAh/IAVAAIApBoIAqhoIAVAAIAAB/g");
	this.shape_338.setTransform(100.85,328.2);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f("#2F3542").s().p("AgfAqQgIgJAAgLQABgQANgGQAMgJATAAIARAAIABgIQABgIgEgFQgFgFgIAAQgIgBgFAEQgHAFgBAHIgQAAQABgIAFgHQAGgGAJgEQAIgDAKAAQAOAAAJAJQAIAIgBAOIgIAuIgBAHQAAAFACAFIgBABIgQAAIAAgEIAAgGQgNANgOAAQgNgBgHgHgAgNAGQgIAFgBAIQgBAHAEAEQAEAFAHAAQAIAAAGgDQAGgFAFgGIAEgUIgMAAQgOABgIAEg");
	this.shape_339.setTransform(842.0291,295.25);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f("#2F3542").s().p("AgPA1QgEgHABgLIAKg6IgRAAIACgNIARAAIAEgXIAOAAIgDAXIARAAIgCANIgSAAIgJA6IAAAEQABAHAGAAIAIgBIgBANQgGACgFAAQgKAAgFgHg");
	this.shape_340.setTransform(834.95,294.175);

	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f("#2F3542").s().p("AgfAqQgIgJAAgLQABgQANgGQAMgJATAAIARAAIABgIQABgIgEgFQgFgFgIAAQgIgBgFAEQgHAFgBAHIgQAAQABgIAFgHQAGgGAJgEQAIgDAKAAQAOAAAJAJQAIAIgBAOIgIAuIgBAHQAAAFACAFIgBABIgQAAIAAgEIAAgGQgNANgOAAQgNgBgHgHgAgNAGQgIAFgBAIQgBAHAEAEQAEAFAHAAQAIAAAGgDQAGgFAFgGIAEgUIgMAAQgOABgIAEg");
	this.shape_341.setTransform(826.6291,295.25);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f("#2F3542").s().p("AAsAwIAKg9IAAgJQgCgLgOgBQgIAAgHAGQgIAGgCAIIgKA+IgPAAIAKg9QABgKgEgFQgEgFgJgBQgOAAgJAOIgMBEIgQAAIAQhdIAPAAIgCAKQAMgMARAAQAJAAAGAEQAGADACAIQAOgPASAAQAOAAAHAJQAHAKgCAPIgLA9g");
	this.shape_342.setTransform(814.0222,295.15);

	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f("#2F3542").s().p("AgdAxIAQheIAPAAIgCALQAJgOAOABIAIABIgCAPIgHgBQgQAAgIAOIgLBDg");
	this.shape_343.setTransform(804.05,295.1491);

	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f("#2F3542").s().p("AgeAkQgKgMABgVIABgDQABgOAHgLQAHgMAKgGQAKgFALAAQAOAAAJAKQAIAJABAQIgBAMIgBAGIg9AAQgBAMAGAJQAFAKAMAAQANABAMgNIAJAHQgGAJgJAEQgKAFgKABQgSgBgKgNgAgJgcQgIAGgEAOIAtAAIAAgBQACgLgFgHQgFgIgJAAIgBAAQgJAAgGAHg");
	this.shape_344.setTransform(796.1152,295.25);

	this.shape_345 = new cjs.Shape();
	this.shape_345.graphics.f("#2F3542").s().p("AglA6QgIgKgBgRIABgMQABgPAHgLQAGgLAJgGQAJgGALABQAPAAAIALIAKgyIAQAAIgYCGIgOAAIABgKQgKANgQAAQgOgBgHgKgAgPgKQgIAGgDAKQgEAKAAAMQAAAMAEAHQAFAIAJgBQANABALgPIAHgqQgFgNgOgBIAAAAQgJAAgGAGg");
	this.shape_345.setTransform(786.8167,293.35);

	this.shape_346 = new cjs.Shape();
	this.shape_346.graphics.f("#2F3542").s().p("AgaArQgIgGgEgLQgEgMABgNQABgNAHgMQAHgMAKgGQALgHALABQAMAAAJAGQAIAGAEALQAEALgBAOIAAABQgCAOgGALQgHALgKAHQgLAFgLABQgMgBgJgGgAgOgaQgJALgCAPIAAABIAAAMQABALAFAFQAFAHAJAAQAHAAAHgEQAHgEAEgJQAFgIABgKIAAgNQgBgLgFgFQgFgHgJAAIgBAAQgLAAgIAJg");
	this.shape_346.setTransform(776.325,295.25);

	this.shape_347 = new cjs.Shape();
	this.shape_347.graphics.f("#2F3542").s().p("AAPAwIALg9IAAgIQgCgNgNAAQgNAAgLAQIgMBCIgQAAIARhdIAPAAIgCALQAMgNAQAAQANAAAHAJQAGAJgBAQIgLA9g");
	this.shape_347.setTransform(766.1391,295.15);

	this.shape_348 = new cjs.Shape();
	this.shape_348.graphics.f("#2F3542").s().p("AgSBBIAQheIAPAAIgPBegAADgwQgDgCAAgEQABgEACgDQADgCAEgBQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgDgDg");
	this.shape_348.setTransform(759.725,293.5);

	this.shape_349 = new cjs.Shape();
	this.shape_349.graphics.f("#2F3542").s().p("AAPBDIALg+IAAgHQgCgNgNAAQgNAAgLAPIgMBDIgQAAIAYiGIAQAAIgKA0QAMgNAQAAQANAAAHAJQAGAJgBAPIgLA+g");
	this.shape_349.setTransform(752.1391,293.25);

	this.shape_350 = new cjs.Shape();
	this.shape_350.graphics.f("#2F3542").s().p("AgYArQgIgGgEgLQgEgLABgNIABgDQABgOAHgLQAGgKAKgHQAKgFAMAAQAPAAAJAKQAIAJAAAPIgOAAQgBgJgFgGQgFgFgIgBQgMAAgIAJQgIAJgCARIAAACIAAAMQAAAKAFAGQAGAGAJAAQAHAAAHgFQAHgFACgIIAPAAQgBAJgGAHQgGAIgJADQgJAEgIABQgMgBgIgGg");
	this.shape_350.setTransform(743.1795,295.25);

	this.shape_351 = new cjs.Shape();
	this.shape_351.graphics.f("#2F3542").s().p("AgxBAIAWh/IBNAAIgCAOIg9AAIgHApIA1AAIgCANIg1AAIgIAtIA9AAIgCAOg");
	this.shape_351.setTransform(733.975,293.6);

	this.shape_352 = new cjs.Shape();
	this.shape_352.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgJgFgFQgEgGgKAAQgHAAgGAFQgGAEgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgNARAAQAeAAAAAhIAAA+g");
	this.shape_352.setTransform(719.025,295.15);

	this.shape_353 = new cjs.Shape();
	this.shape_353.graphics.f("#2F3542").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAEAAAHIgQAAQAAgHAFgHQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAOIAAAsQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_353.setTransform(709.125,295.25);

	this.shape_354 = new cjs.Shape();
	this.shape_354.graphics.f("#2F3542").s().p("AgdA2QgKgNAAgWIAAgBQAAgUAKgOQALgNAQAAQAQgBAKAMIAAgyIAQAAIAACGIgPAAIgBgKQgJANgRAAQgQAAgLgPgAgQgHQgHAJAAASQAAAQAHAJQAHAKAKgBQAPAAAIgOIAAgqQgIgOgOAAQgLAAgHAJg");
	this.shape_354.setTransform(698.95,293.35);

	this.shape_355 = new cjs.Shape();
	this.shape_355.graphics.f("#2F3542").s().p("AgfAqQgIgJAAgLQABgQANgGQAMgJATAAIARAAIABgIQABgIgEgFQgFgFgIAAQgIgBgFAEQgHAFgBAHIgQAAQABgIAFgHQAGgGAJgEQAIgDAKAAQAOAAAJAJQAIAIgBAOIgIAuIgBAHQAAAFACAFIgBABIgQAAIAAgEIAAgGQgNANgOAAQgNgBgHgHgAgNAGQgIAFgBAIQgBAHAEAEQAEAFAHAAQAIAAAGgDQAGgFAFgGIAEgUIgMAAQgOABgIAEg");
	this.shape_355.setTransform(684.5291,295.25);

	this.shape_356 = new cjs.Shape();
	this.shape_356.graphics.f("#2F3542").s().p("AglA6QgIgKgBgRIABgMQABgPAHgLQAGgLAJgGQAJgGALABQAPAAAIALIAKgyIAQAAIgYCGIgOAAIABgKQgKANgQAAQgOgBgHgKgAgPgKQgIAGgDAKQgEAKAAAMQAAAMAEAHQAFAIAJgBQANABALgPIAHgqQgFgNgOgBIAAAAQgJAAgGAGg");
	this.shape_356.setTransform(675.4667,293.35);

	this.shape_357 = new cjs.Shape();
	this.shape_357.graphics.f("#2F3542").s().p("AgSBBIAQheIAPAAIgPBegAADgwQgDgCAAgEQABgEACgDQADgCAEgBQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgDgDg");
	this.shape_357.setTransform(668.125,293.5);

	this.shape_358 = new cjs.Shape();
	this.shape_358.graphics.f("#2F3542").s().p("AgTBDIAXiGIAQAAIgXCGg");
	this.shape_358.setTransform(663.875,293.25);

	this.shape_359 = new cjs.Shape();
	this.shape_359.graphics.f("#2F3542").s().p("AgeAkQgKgMABgVIABgDQABgOAHgLQAHgMAKgGQAKgFALAAQAOAAAJAKQAIAJABAQIgBAMIgBAGIg9AAQgBAMAGAJQAFAKAMAAQANABAMgNIAJAHQgGAJgJAEQgKAFgKABQgSgBgKgNgAgJgcQgIAGgEAOIAtAAIAAgBQACgLgFgHQgFgIgJAAIgBAAQgJAAgGAHg");
	this.shape_359.setTransform(656.8652,295.25);

	this.shape_360 = new cjs.Shape();
	this.shape_360.graphics.f("#2F3542").s().p("AAPAwIALg9IAAgIQgCgNgNAAQgNAAgLAQIgMBCIgQAAIARhdIAPAAIgCALQAMgNAQAAQANAAAHAJQAGAJgBAQIgLA9g");
	this.shape_360.setTransform(646.8891,295.15);

	this.shape_361 = new cjs.Shape();
	this.shape_361.graphics.f("#2F3542").s().p("AAPAwIALg9IAAgIQgCgNgNAAQgNAAgLAQIgMBCIgQAAIARhdIAPAAIgCALQAMgNAQAAQANAAAHAJQAGAJgBAQIgLA9g");
	this.shape_361.setTransform(637.1891,295.15);

	this.shape_362 = new cjs.Shape();
	this.shape_362.graphics.f("#2F3542").s().p("AAmBAIgFgiIgzAAIgSAiIgSAAIBFh/IAOAAIAZB/gAgLARIApAAIgLg7g");
	this.shape_362.setTransform(626,293.6);

	this.shape_363 = new cjs.Shape();
	this.shape_363.graphics.f("#2F3542").s().p("AAzAwIAAg+QAAgJgFgFQgFgGgLAAQgJABgGAFQgGAGgBAIIAAA+IgPAAIAAg9QAAgVgUAAQgQAAgGAOIAABEIgRAAIAAhdIAQAAIAAAKQALgMASAAQATAAAHAPQAEgHAIgEQAIgFAKABQAfgBABAiIAAA+g");
	this.shape_363.setTransform(608.875,295.15);

	this.shape_364 = new cjs.Shape();
	this.shape_364.graphics.f("#2F3542").s().p("AgdAoQgIgKAAgQIAAg9IARAAIAAA8QAAAWASgBQARAAAGgOIAAhDIAQAAIAABdIgPAAIAAgJQgKAMgRAAQgQgBgIgIg");
	this.shape_364.setTransform(596.05,295.35);

	this.shape_365 = new cjs.Shape();
	this.shape_365.graphics.f("#2F3542").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_365.setTransform(588.925,293.25);

	this.shape_366 = new cjs.Shape();
	this.shape_366.graphics.f("#2F3542").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQADACgBAEQABAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_366.setTransform(584.6,293.525);

	this.shape_367 = new cjs.Shape();
	this.shape_367.graphics.f("#2F3542").s().p("AgNBEIAAhRIgPAAIAAgMIAPAAIAAgKQAAgQAIgIQAHgJAPAAIAMACIgBANIgJAAQgIgBgEAFQgFAEAAAKIAAAKIAVAAIAAAMIgVAAIAABRg");
	this.shape_367.setTransform(579.625,293.15);

	this.shape_368 = new cjs.Shape();
	this.shape_368.graphics.f("#2F3542").s().p("AAzAwIAAg+QAAgJgFgFQgFgGgLAAQgJABgGAFQgGAGgBAIIAAA+IgPAAIAAg9QAAgVgUAAQgQAAgGAOIAABEIgRAAIAAhdIAQAAIAAAKQALgMASAAQATAAAHAPQAEgHAIgEQAIgFAKABQAfgBABAiIAAA+g");
	this.shape_368.setTransform(563.825,295.15);

	this.shape_369 = new cjs.Shape();
	this.shape_369.graphics.f("#2F3542").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAEAAAHIgQAAQAAgHAFgHQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAOIAAAsQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_369.setTransform(551.025,295.25);

	this.shape_370 = new cjs.Shape();
	this.shape_370.graphics.f("#2F3542").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_370.setTransform(543.975,293.25);

	this.shape_371 = new cjs.Shape();
	this.shape_371.graphics.f("#2F3542").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAEAAAHIgQAAQAAgHAFgHQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAOIAAAsQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_371.setTransform(536.875,295.25);

	this.shape_372 = new cjs.Shape();
	this.shape_372.graphics.f("#2F3542").s().p("AgdA2QgKgNAAgWIAAgBQAAgUAKgOQALgNAQAAQAQgBAKAMIAAgyIAQAAIAACGIgPAAIgBgKQgJANgRAAQgQAAgLgPgAgQgHQgHAJAAASQAAAQAHAJQAGAKALgBQAPAAAIgOIAAgqQgIgOgOAAQgLAAgHAJg");
	this.shape_372.setTransform(526.7,293.35);

	this.shape_373 = new cjs.Shape();
	this.shape_373.graphics.f("#2F3542").s().p("AgbAkQgNgMAAgWIAAgCQABgNAFgMQAGgLAJgGQAKgHAKABQATAAAKAMQAKAMAAAXIAAAGIg/AAQAAANAIAJQAIAJALAAQAJAAAGgDQAFgEAFgGIAKAIQgMASgYABQgSAAgMgOgAgOgcQgHAIgCAMIAvAAIAAgBQAAgNgGgGQgHgHgKAAQgJAAgGAHg");
	this.shape_373.setTransform(517.15,295.25);

	this.shape_374 = new cjs.Shape();
	this.shape_374.graphics.f("#2F3542").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_374.setTransform(508.375,293.25);

	this.shape_375 = new cjs.Shape();
	this.shape_375.graphics.f("#2F3542").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_375.setTransform(496.6,293.525);

	this.shape_376 = new cjs.Shape();
	this.shape_376.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgIAAgIIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgEgLgCQgMgDgHgDQgIgEgDgFQgEgEAAgHQAAgMAKgJQAKgHAPAAQAQgBAKAJQAKAJAAANIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAFAAAIQAAANgLAIQgKAHgQABQgKAAgJgFg");
	this.shape_376.setTransform(489.725,295.25);

	this.shape_377 = new cjs.Shape();
	this.shape_377.graphics.f("#2F3542").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAEAAAHIgQAAQAAgHAFgHQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAOIAAAsQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_377.setTransform(480.175,295.25);

	this.shape_378 = new cjs.Shape();
	this.shape_378.graphics.f("#2F3542").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_378.setTransform(471.375,293.25);

	this.shape_379 = new cjs.Shape();
	this.shape_379.graphics.f("#2F3542").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAEAAADADQADACAAAEQAAAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_379.setTransform(464.05,293.525);

	this.shape_380 = new cjs.Shape();
	this.shape_380.graphics.f("#2F3542").s().p("AgNBEIAAhRIgPAAIAAgMIAPAAIAAgKQAAgQAIgIQAHgJAPAAIAMACIgBANIgJAAQgIgBgEAFQgFAEAAAKIAAAKIAVAAIAAAMIgVAAIAABRg");
	this.shape_380.setTransform(459.075,293.15);

	this.shape_381 = new cjs.Shape();
	this.shape_381.graphics.f("#2F3542").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_381.setTransform(453.5,293.525);

	this.shape_382 = new cjs.Shape();
	this.shape_382.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgIAAgIIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgEgLgCQgMgDgHgDQgIgEgDgFQgEgEAAgHQAAgMAKgJQAKgHAPAAQAQgBAKAJQAKAJAAANIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAFAAAIQAAANgLAIQgKAHgQABQgKAAgJgFg");
	this.shape_382.setTransform(446.625,295.25);

	this.shape_383 = new cjs.Shape();
	this.shape_383.graphics.f("#2F3542").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAEAAAHIgQAAQAAgHAFgHQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAOIAAAsQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_383.setTransform(437.075,295.25);

	this.shape_384 = new cjs.Shape();
	this.shape_384.graphics.f("#2F3542").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_384.setTransform(430.025,293.25);

	this.shape_385 = new cjs.Shape();
	this.shape_385.graphics.f("#2F3542").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_385.setTransform(423.925,293.25);

	this.shape_386 = new cjs.Shape();
	this.shape_386.graphics.f("#2F3542").s().p("AgWAwIAAhdIAQAAIAAALQAHgNAOAAQAFAAADABIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_386.setTransform(411.75,295.15);

	this.shape_387 = new cjs.Shape();
	this.shape_387.graphics.f("#2F3542").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAEAAAHIgQAAQAAgHAFgHQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAOIAAAsQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_387.setTransform(403.275,295.25);

	this.shape_388 = new cjs.Shape();
	this.shape_388.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgIAAgIIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgEgLgCQgMgDgHgDQgIgEgDgFQgEgEAAgHQAAgMAKgJQAKgHAPAAQAQgBAKAJQAKAJAAANIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAFAAAIQAAANgLAIQgKAHgQABQgKAAgJgFg");
	this.shape_388.setTransform(393.725,295.25);

	this.shape_389 = new cjs.Shape();
	this.shape_389.graphics.f("#2F3542").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAEAAAHIgQAAQAAgHAFgHQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAOIAAAsQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_389.setTransform(384.175,295.25);

	this.shape_390 = new cjs.Shape();
	this.shape_390.graphics.f("#2F3542").s().p("AgcA2QgLgNAAgWIAAgBQAAgUAKgOQALgNARAAQAPgBAKAMIAAgyIAQAAIAACGIgPAAIAAgKQgKANgRAAQgQAAgKgPgAgQgHQgHAJAAASQAAAQAHAJQAGAKALgBQAQAAAHgOIAAgqQgHgOgQAAQgLAAgGAJg");
	this.shape_390.setTransform(374,293.35);

	this.shape_391 = new cjs.Shape();
	this.shape_391.graphics.f("#2F3542").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgDgDABgEQgBgEADgCQACgDAEAAQAFAAACADQACACABAEQgBAEgCADQgCADgFAAQgEAAgCgDg");
	this.shape_391.setTransform(362.55,293.525);

	this.shape_392 = new cjs.Shape();
	this.shape_392.graphics.f("#2F3542").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAEAAAHIgQAAQAAgHAFgHQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAOIAAAsQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_392.setTransform(355.425,295.25);

	this.shape_393 = new cjs.Shape();
	this.shape_393.graphics.f("#2F3542").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_393.setTransform(345.325,297.025);

	this.shape_394 = new cjs.Shape();
	this.shape_394.graphics.f("#2F3542").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAEAAAHIgQAAQAAgHAFgHQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAOIAAAsQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_394.setTransform(335.525,295.25);

	this.shape_395 = new cjs.Shape();
	this.shape_395.graphics.f("#2F3542").s().p("AgYA3IgBALIgOAAIAAiGIAQAAIAAAzQAKgMAQAAQARAAAKANQAKANAAAVIAAACQAAAWgKANQgKAOgRAAQgRAAgKgOgAgXAAIAAAnQAHAPAQAAQALABAGgKQAHgJAAgSQAAgQgHgJQgGgJgLAAQgQABgHAPg");
	this.shape_395.setTransform(325.825,293.35);

	this.shape_396 = new cjs.Shape();
	this.shape_396.graphics.f("#2F3542").s().p("AgbAkQgNgMAAgWIAAgCQAAgNAGgMQAGgLAJgGQAKgHAKABQATAAAKAMQALAMgBAXIAAAGIg/AAQAAANAIAJQAIAJALAAQAJAAAFgDQAGgEAFgGIAKAIQgMASgYABQgSAAgMgOgAgPgcQgGAIgCAMIAvAAIAAgBQgBgNgFgGQgHgHgKAAQgIAAgIAHg");
	this.shape_396.setTransform(315.85,295.25);

	this.shape_397 = new cjs.Shape();
	this.shape_397.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgIAAgIIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgEgLgCQgMgDgHgDQgIgEgDgFQgEgEAAgHQAAgMAKgJQAKgHAPAAQAQgBAKAJQAKAJAAANIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAFAAAIQAAANgLAIQgKAHgQABQgKAAgJgFg");
	this.shape_397.setTransform(306.325,295.25);

	this.shape_398 = new cjs.Shape();
	this.shape_398.graphics.f("#2F3542").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_398.setTransform(293.325,293.25);

	this.shape_399 = new cjs.Shape();
	this.shape_399.graphics.f("#2F3542").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_399.setTransform(286,293.525);

	this.shape_400 = new cjs.Shape();
	this.shape_400.graphics.f("#2F3542").s().p("AgCA1QgGgHAAgMIAAg5IgRAAIAAgNIARAAIAAgXIAQAAIAAAXIARAAIAAANIgRAAIAAA5QAAAGACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_400.setTransform(280.575,294.2);

	this.shape_401 = new cjs.Shape();
	this.shape_401.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgIAAgIIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgEgLgCQgMgDgHgDQgIgEgDgFQgEgEAAgHQAAgMAKgJQAKgHAPAAQAQgBAKAJQAKAJAAANIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAFAAAIQAAANgLAIQgKAHgQABQgKAAgJgFg");
	this.shape_401.setTransform(273.225,295.25);

	this.shape_402 = new cjs.Shape();
	this.shape_402.graphics.f("#2F3542").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAEAAADADQACACAAAEQABAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_402.setTransform(266.45,293.525);

	this.shape_403 = new cjs.Shape();
	this.shape_403.graphics.f("#2F3542").s().p("AgWAwIAAhdIAPAAIABALQAHgNAPAAQAEAAADABIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_403.setTransform(261.7,295.15);

	this.shape_404 = new cjs.Shape();
	this.shape_404.graphics.f("#2F3542").s().p("AgbAkQgNgMAAgWIAAgCQABgNAFgMQAGgLAJgGQAKgHAKABQATAAAKAMQAKAMAAAXIAAAGIg/AAQABANAHAJQAIAJALAAQAJAAAGgDQAFgEAFgGIAKAIQgMASgXABQgTAAgMgOgAgOgcQgHAIgBAMIAuAAIAAgBQAAgNgGgGQgHgHgKAAQgIAAgHAHg");
	this.shape_404.setTransform(253.45,295.25);

	this.shape_405 = new cjs.Shape();
	this.shape_405.graphics.f("#2F3542").s().p("AgCA1QgGgHAAgMIAAg5IgRAAIAAgNIARAAIAAgXIAQAAIAAAXIARAAIAAANIgRAAIAAA5QAAAGACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_405.setTransform(245.375,294.2);

	this.shape_406 = new cjs.Shape();
	this.shape_406.graphics.f("#2F3542").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_406.setTransform(238.775,293.25);

	this.shape_407 = new cjs.Shape();
	this.shape_407.graphics.f("#2F3542").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAEAAAHIgQAAQAAgHAFgHQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAOIAAAsQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_407.setTransform(228.675,295.25);

	this.shape_408 = new cjs.Shape();
	this.shape_408.graphics.f("#2F3542").s().p("AgWAwIAAhdIAPAAIABALQAHgNAPAAQAFAAACABIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_408.setTransform(221.25,295.15);

	this.shape_409 = new cjs.Shape();
	this.shape_409.graphics.f("#2F3542").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAEAAAHIgQAAQAAgHAFgHQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAOIAAAsQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_409.setTransform(212.775,295.25);

	this.shape_410 = new cjs.Shape();
	this.shape_410.graphics.f("#2F3542").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_410.setTransform(203.975,293.25);

	this.shape_411 = new cjs.Shape();
	this.shape_411.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgJgFgFQgEgGgKAAQgHAAgGAFQgGAEgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgNARAAQAeAAAAAhIAAA+g");
	this.shape_411.setTransform(189.375,295.15);

	this.shape_412 = new cjs.Shape();
	this.shape_412.graphics.f("#2F3542").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAEAAAHIgQAAQAAgHAFgHQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAOIAAAsQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_412.setTransform(179.475,295.25);

	this.shape_413 = new cjs.Shape();
	this.shape_413.graphics.f("#2F3542").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_413.setTransform(170.675,293.25);

	this.shape_414 = new cjs.Shape();
	this.shape_414.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgIAAgIIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgEgLgCQgMgDgHgDQgIgEgDgFQgEgEAAgHQAAgMAKgJQAKgHAPAAQAQgBAKAJQAKAJAAANIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAFAAAIQAAANgLAIQgKAHgQABQgKAAgJgFg");
	this.shape_414.setTransform(160.825,295.25);

	this.shape_415 = new cjs.Shape();
	this.shape_415.graphics.f("#2F3542").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAEAAAHIgQAAQAAgHAFgHQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAOIAAAsQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_415.setTransform(151.275,295.25);

	this.shape_416 = new cjs.Shape();
	this.shape_416.graphics.f("#2F3542").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_416.setTransform(144.225,293.25);

	this.shape_417 = new cjs.Shape();
	this.shape_417.graphics.f("#2F3542").s().p("AgbAkQgNgMAAgWIAAgCQABgNAFgMQAGgLAJgGQAKgHAKABQATAAAKAMQAKAMAAAXIAAAGIg/AAQAAANAIAJQAIAJALAAQAJAAAGgDQAFgEAFgGIAKAIQgMASgYABQgSAAgMgOgAgOgcQgHAIgCAMIAvAAIAAgBQAAgNgGgGQgHgHgKAAQgIAAgHAHg");
	this.shape_417.setTransform(137.35,295.25);

	this.shape_418 = new cjs.Shape();
	this.shape_418.graphics.f("#2F3542").s().p("AgRBSIAAgNIAHABQAGAAADgDQACgDAAgHIAAhpIAQAAIAABpQAAAbgYAAQgFAAgFgCgAABhDQgBgDAAgEQAAgEABgDQADgCAEAAQAFAAADACQACADAAAEQAAAEgCADQgDACgFAAQgEAAgDgCg");
	this.shape_418.setTransform(129.45,295.45);

	this.shape_419 = new cjs.Shape();
	this.shape_419.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgJgFgFQgEgGgKAAQgHAAgGAFQgGAEgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgNARAAQAeAAAAAhIAAA+g");
	this.shape_419.setTransform(123.225,295.15);

	this.shape_420 = new cjs.Shape();
	this.shape_420.graphics.f("#2F3542").s().p("AgbAkQgMgMAAgWIAAgCQgBgNAGgMQAGgLAJgGQAKgHAKABQATAAAKAMQALAMAAAXIAAAGIhAAAQAAANAIAJQAIAJALAAQAJAAAFgDQAHgEAEgGIAKAIQgMASgXABQgTAAgMgOgAgPgcQgGAIgBAMIAuAAIAAgBQAAgNgHgGQgFgHgLAAQgIAAgIAHg");
	this.shape_420.setTransform(113.55,295.25);

	this.shape_421 = new cjs.Shape();
	this.shape_421.graphics.f("#2F3542").s().p("AAvBAIAAgyIABg1IgpBnIgNAAIgphnIABA1IAAAyIgQAAIAAh/IAVAAIApBnIAqhnIAVAAIAAB/g");
	this.shape_421.setTransform(100.85,293.6);

	this.shape_422 = new cjs.Shape();
	this.shape_422.graphics.f("#2F3542").s().p("AggBbIAAgdIAIgBQAtgCADgpQgNAOgSAAQgYAAgOgQQgOgQAAgbQAAgSAIgOQAHgPAOgIQANgIARAAQASAAANAJQANAJAIAQQAHARABAVIAAANQAAArgWAaQgWAZgoACgAgRg0QgHAKAAAPQAAAOAHAKQAHAIALAAQAIAAAGgFQAHgDACgGIAAgPQABgSgHgKQgHgJgLAAQgKAAgHAJg");
	this.shape_422.setTransform(68.05,153.625);

	this.shape_423 = new cjs.Shape();
	this.shape_423.graphics.f("#2F3542").s().p("AgNAOQgGgGAAgIQAAgIAGgEQAFgGAIAAQAIAAAGAGQAGAEAAAIQAAAIgGAGQgGAFgIAAQgIAAgFgFg");
	this.shape_423.setTransform(57.3,160.8);

	this.shape_424 = new cjs.Shape();
	this.shape_424.graphics.f("#2F3542").s().p("AAKBZIAAgnIhIAAIgCgWIBKh0IAjAAIAABuIAUAAIAAAcIgUAAIAAAngAAIgkIglA6IAnAAIAAg+g");
	this.shape_424.setTransform(46.55,153.675);

	this.shape_425 = new cjs.Shape();
	this.shape_425.graphics.f("#2F3542").s().p("AggBbIAAgdIAIgBQAtgCADgpQgNAOgSAAQgYAAgOgQQgOgQAAgbQAAgSAIgOQAHgPAOgIQANgIARAAQASAAANAJQANAJAIAQQAHARABAVIAAANQAAArgWAaQgWAZgoACgAgRg0QgHAKAAAPQAAAOAHAKQAHAIALAAQAIAAAGgFQAHgDACgGIAAgPQABgSgHgKQgHgJgLAAQgKAAgHAJg");
	this.shape_425.setTransform(68.05,87.325);

	this.shape_426 = new cjs.Shape();
	this.shape_426.graphics.f("#2F3542").s().p("AgNANQgGgEAAgJQAAgIAGgEQAFgGAIAAQAIAAAGAGQAGAEAAAIQAAAJgGAEQgGAGgIAAQgIAAgFgGg");
	this.shape_426.setTransform(57.3,94.5);

	this.shape_427 = new cjs.Shape();
	this.shape_427.graphics.f("#2F3542").s().p("AgrBNQgSgOABgXIAjAAQgBAKAIAGQAIAHAKAAQAMAAAIgHQAGgHAAgLQAAgagcAAIgTAAIAAgbIATAAQAMAAAHgGQAGgHAAgLQABgLgHgGQgGgGgLAAQgJAAgHAGQgHAFAAAJIgjAAQAAgOAHgLQAIgLANgGQAOgGAPAAQAcAAAQANQAQAOAAAXQAAAMgIALQgHAKgMAFQAPAFAIALQAGAKAAAPQABAYgSAOQgRAOgcAAQgaAAgQgOg");
	this.shape_427.setTransform(46.35,87.375);

	this.shape_428 = new cjs.Shape();
	this.shape_428.graphics.f("#2F3542").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgJgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_428.setTransform(566.675,189.8);

	this.shape_429 = new cjs.Shape();
	this.shape_429.graphics.f("#2F3542").s().p("AgcBCIgGgBIAAgNIAEAAQAJAAAEgDQAFgDADgJIAEgKIgihdIARAAIAXBGIAWhGIARAAIgmBtQgHAYgUAAg");
	this.shape_429.setTransform(557.55,191.725);

	this.shape_430 = new cjs.Shape();
	this.shape_430.graphics.f("#2F3542").s().p("AAVAxIAAg+QAAgLgFgEQgEgFgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_430.setTransform(548.325,189.7);

	this.shape_431 = new cjs.Shape();
	this.shape_431.graphics.f("#2F3542").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgDgDABgEQgBgEADgCQACgDAEAAQAFAAACADQACACABAEQgBAEgCADQgCADgFAAQgEAAgCgDg");
	this.shape_431.setTransform(541.2,188.075);

	this.shape_432 = new cjs.Shape();
	this.shape_432.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAHQgKAJgQAAQgKgBgJgEg");
	this.shape_432.setTransform(534.325,189.8);

	this.shape_433 = new cjs.Shape();
	this.shape_433.graphics.f("#2F3542").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_433.setTransform(525.775,187.8);

	this.shape_434 = new cjs.Shape();
	this.shape_434.graphics.f("#2F3542").s().p("AgcAoQgJgKABgRIAAg9IAQAAIAAA9QgBAVATAAQARAAAGgNIAAhFIAQAAIAABfIgPAAIgBgKQgJAMgSAAQgPAAgHgJg");
	this.shape_434.setTransform(515.65,189.9);

	this.shape_435 = new cjs.Shape();
	this.shape_435.graphics.f("#2F3542").s().p("AgcA2QgLgNAAgWIAAgBQAAgVAKgNQALgNARAAQAPAAAKALIAAgxIAQAAIAACGIgPAAIAAgKQgKALgRABQgQgBgKgOgAgQgHQgHAJAAASQAAAQAHAJQAGAJALAAQAQAAAHgNIAAgrQgHgOgQAAQgLABgGAIg");
	this.shape_435.setTransform(505.4,187.9);

	this.shape_436 = new cjs.Shape();
	this.shape_436.graphics.f("#2F3542").s().p("AgeAkQgMgNAAgXIAAAAQAAgOAFgLQAGgLAKgGQAJgHAMABQATAAAMANQAMANAAAWIAAABQAAAOgFALQgFALgKAGQgKAGgNABQgSAAgMgOgAgTgaQgHAKAAARQAAAQAHAJQAIAKALAAQAMAAAIgKQAHgJAAgRQAAgPgHgKQgIgKgMAAQgLAAgIAJg");
	this.shape_436.setTransform(495.475,189.8);

	this.shape_437 = new cjs.Shape();
	this.shape_437.graphics.f("#2F3542").s().p("AgWAxIAAhfIAQAAIAAALQAHgNAOABQAFgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_437.setTransform(487.8,189.7);

	this.shape_438 = new cjs.Shape();
	this.shape_438.graphics.f("#2F3542").s().p("AgnBDIAAiDIAOAAIABALQALgNAQAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgKANgQAAQgRAAgKgLIAAAugAgXgnIAAAtQAIANAPAAQAKAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgOAAgIANg");
	this.shape_438.setTransform(479.4,191.525);

	this.shape_439 = new cjs.Shape();
	this.shape_439.graphics.f("#2F3542").s().p("AgbAkQgNgMAAgVIAAgDQABgOAFgKQAGgMAJgGQAKgGAKAAQATAAAKAMQAKAMAAAXIAAAGIg/AAQAAAOAIAIQAIAJALAAQAJAAAGgDQAFgEAFgGIAKAIQgMATgYAAQgSgBgMgNgAgOgcQgHAHgBANIAuAAIAAgBQAAgNgGgGQgHgHgKAAQgJAAgGAHg");
	this.shape_439.setTransform(469.45,189.8);

	this.shape_440 = new cjs.Shape();
	this.shape_440.graphics.f("#2F3542").s().p("AgWAxIAAhfIAQAAIAAALQAHgNAOABQAFgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_440.setTransform(462.05,189.7);

	this.shape_441 = new cjs.Shape();
	this.shape_441.graphics.f("#2F3542").s().p("AAVAxIAAg+QAAgLgFgEQgEgFgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_441.setTransform(449.075,189.7);

	this.shape_442 = new cjs.Shape();
	this.shape_442.graphics.f("#2F3542").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgJgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_442.setTransform(439.175,189.8);

	this.shape_443 = new cjs.Shape();
	this.shape_443.graphics.f("#2F3542").s().p("AgcA2QgLgNAAgWIAAgBQAAgVAKgNQALgNARAAQAPAAAKALIAAgxIAQAAIAACGIgPAAIAAgKQgKALgRABQgQgBgKgOgAgQgHQgHAJAAASQAAAQAHAJQAGAJALAAQAQAAAHgNIAAgrQgHgOgQAAQgLABgGAIg");
	this.shape_443.setTransform(429,187.9);

	this.shape_444 = new cjs.Shape();
	this.shape_444.graphics.f("#2F3542").s().p("AAVBEIAAg/QAAgKgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAiGIAQAAIAAAzQALgNAQAAQAegBAAAiIAAA/g");
	this.shape_444.setTransform(414.775,187.8);

	this.shape_445 = new cjs.Shape();
	this.shape_445.graphics.f("#2F3542").s().p("AgcAoQgIgKAAgRIAAg9IAPAAIAAA9QAAAVASAAQASAAAGgNIAAhFIARAAIAABfIgQAAIgBgKQgJAMgSAAQgPAAgHgJg");
	this.shape_445.setTransform(404.85,189.9);

	this.shape_446 = new cjs.Shape();
	this.shape_446.graphics.f("#2F3542").s().p("AgYA3IgBAMIgOAAIAAiGIAQAAIAAAyQAKgMAQAAQARgBAKANQAKAOAAAVIAAACQAAAWgKANQgKAOgRAAQgRgBgKgNgAgXgBIAAApQAHAOAQAAQALAAAGgJQAHgIAAgTQAAgQgHgJQgGgIgLgBQgQAAgHAPg");
	this.shape_446.setTransform(395.075,187.9);

	this.shape_447 = new cjs.Shape();
	this.shape_447.graphics.f("#2F3542").s().p("AgdAoQgHgKgBgRIAAg9IAQAAIAAA9QABAVARAAQASAAAGgNIAAhFIARAAIAABfIgQAAIgBgKQgJAMgRAAQgPAAgJgJg");
	this.shape_447.setTransform(384.85,189.9);

	this.shape_448 = new cjs.Shape();
	this.shape_448.graphics.f("#2F3542").s().p("AgCA1QgGgHAAgLIAAg6IgRAAIAAgNIARAAIAAgXIAQAAIAAAXIARAAIAAANIgRAAIAAA6QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_448.setTransform(376.675,188.75);

	this.shape_449 = new cjs.Shape();
	this.shape_449.graphics.f("#2F3542").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgJgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_449.setTransform(364.625,189.8);

	this.shape_450 = new cjs.Shape();
	this.shape_450.graphics.f("#2F3542").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_450.setTransform(354.525,191.575);

	this.shape_451 = new cjs.Shape();
	this.shape_451.graphics.f("#2F3542").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_451.setTransform(344.425,191.575);

	this.shape_452 = new cjs.Shape();
	this.shape_452.graphics.f("#2F3542").s().p("AAVAxIAAg+QAAgLgFgEQgEgFgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_452.setTransform(334.575,189.7);

	this.shape_453 = new cjs.Shape();
	this.shape_453.graphics.f("#2F3542").s().p("AgeAkQgMgNAAgXIAAAAQAAgOAFgLQAGgLAKgGQAJgHAMABQATAAAMANQAMANAAAWIAAABQAAAOgFALQgFALgKAGQgKAGgNABQgSAAgMgOgAgTgaQgHAKAAARQAAAQAHAJQAIAKALAAQAMAAAIgKQAHgJAAgRQAAgPgHgKQgIgKgMAAQgLAAgIAJg");
	this.shape_453.setTransform(324.525,189.8);

	this.shape_454 = new cjs.Shape();
	this.shape_454.graphics.f("#2F3542").s().p("AgWAxIAAhfIAPAAIABALQAHgNAPABQAEgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_454.setTransform(316.85,189.7);

	this.shape_455 = new cjs.Shape();
	this.shape_455.graphics.f("#2F3542").s().p("AgLAQQAIgMAAgLIAAgOIAPAAIAAAMQAAAJgEAIQgEAJgGAFg");
	this.shape_455.setTransform(306.775,194.875);

	this.shape_456 = new cjs.Shape();
	this.shape_456.graphics.f("#2F3542").s().p("AAVBEIAAg/QAAgKgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAiGIAQAAIAAAzQALgNAQAAQAegBAAAiIAAA/g");
	this.shape_456.setTransform(300.375,187.8);

	this.shape_457 = new cjs.Shape();
	this.shape_457.graphics.f("#2F3542").s().p("AgdAoQgHgKAAgRIAAg9IAPAAIAAA9QAAAVASAAQASAAAGgNIAAhFIARAAIAABfIgQAAIgBgKQgJAMgSAAQgOAAgJgJg");
	this.shape_457.setTransform(290.45,189.9);

	this.shape_458 = new cjs.Shape();
	this.shape_458.graphics.f("#2F3542").s().p("AgYA3IgBAMIgOAAIAAiGIAQAAIAAAyQAKgMAQAAQARgBAKANQAKAOAAAVIAAACQAAAWgKANQgKAOgRAAQgRgBgKgNgAgXgBIAAApQAHAOAQAAQALAAAGgJQAHgIAAgTQAAgQgHgJQgGgIgLgBQgQAAgHAPg");
	this.shape_458.setTransform(280.675,187.9);

	this.shape_459 = new cjs.Shape();
	this.shape_459.graphics.f("#2F3542").s().p("AgdAoQgHgKgBgRIAAg9IAQAAIAAA9QABAVARAAQASAAAGgNIAAhFIARAAIAABfIgQAAIAAgKQgKAMgRAAQgPAAgJgJg");
	this.shape_459.setTransform(270.45,189.9);

	this.shape_460 = new cjs.Shape();
	this.shape_460.graphics.f("#2F3542").s().p("AgCA1QgGgHAAgLIAAg6IgRAAIAAgNIARAAIAAgXIAQAAIAAAXIARAAIAAANIgRAAIAAA6QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_460.setTransform(262.275,188.75);

	this.shape_461 = new cjs.Shape();
	this.shape_461.graphics.f("#2F3542").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAEAAADADQADACAAAEQAAAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_461.setTransform(253,188.075);

	this.shape_462 = new cjs.Shape();
	this.shape_462.graphics.f("#2F3542").s().p("AgWAxIAAhfIAPAAIABALQAHgNAPABQAFgBACACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_462.setTransform(248.25,189.7);

	this.shape_463 = new cjs.Shape();
	this.shape_463.graphics.f("#2F3542").s().p("AgCA1QgGgHAAgLIAAg6IgRAAIAAgNIARAAIAAgXIAQAAIAAAXIARAAIAAANIgRAAIAAA6QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_463.setTransform(241.475,188.75);

	this.shape_464 = new cjs.Shape();
	this.shape_464.graphics.f("#2F3542").s().p("AgbAkQgNgMAAgVIAAgDQABgOAFgKQAGgMAJgGQAKgGAKAAQATAAAKAMQAKAMAAAXIAAAGIg/AAQAAAOAIAIQAIAJALAAQAJAAAGgDQAFgEAFgGIAKAIQgMATgYAAQgSgBgMgNgAgOgcQgHAHgCANIAvAAIAAgBQAAgNgGgGQgHgHgKAAQgIAAgHAHg");
	this.shape_464.setTransform(234.1,189.8);

	this.shape_465 = new cjs.Shape();
	this.shape_465.graphics.f("#2F3542").s().p("AAzAxIAAg+QAAgLgFgEQgFgFgLgBQgJAAgGAGQgGAFgBAKIAAA+IgPAAIAAg+QAAgUgUgBQgQAAgGAOIAABFIgRAAIAAhfIAQAAIAAALQALgMASAAQATAAAHAPQAEgHAIgEQAIgEAKAAQAfAAABAhIAAA/g");
	this.shape_465.setTransform(221.325,189.7);

	this.shape_466 = new cjs.Shape();
	this.shape_466.graphics.f("#2F3542").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_466.setTransform(211.3,188.075);

	this.shape_467 = new cjs.Shape();
	this.shape_467.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAHQgKAJgQAAQgKgBgJgEg");
	this.shape_467.setTransform(204.425,189.8);

	this.shape_468 = new cjs.Shape();
	this.shape_468.graphics.f("#2F3542").s().p("AgLAQQAIgMAAgLIAAgOIAPAAIAAAMQAAAJgEAIQgEAJgGAFg");
	this.shape_468.setTransform(193.275,194.875);

	this.shape_469 = new cjs.Shape();
	this.shape_469.graphics.f("#2F3542").s().p("AgWBTQANgLAIgVQAIgWAAgbIAAgCQAAgSgEgQQgDgQgHgMQgHgNgIgHIADgKQAMAHAJAPQALAOAFATQAFASAAATQAAAUgFASQgFASgLAPQgJAPgMAHg");
	this.shape_469.setTransform(188.275,189.4);

	this.shape_470 = new cjs.Shape();
	this.shape_470.graphics.f("#2F3542").s().p("AgYArQgIgGgEgLQgEgKABgOIABgEQABgNAHgLQAGgLAKgFQAKgHAMABQAPAAAJAJQAIALAAAOIgOAAQgBgJgFgGQgFgGgIAAQgMgBgIAKQgIAKgCAQIAAACIAAAMQAAAKAFAGQAGAGAJAAQAHABAHgGQAHgFACgJIAPAAQgBAJgGAIQgGAHgJAEQgJAFgIAAQgMgBgIgGg");
	this.shape_470.setTransform(181.0795,189.8);

	this.shape_471 = new cjs.Shape();
	this.shape_471.graphics.f("#2F3542").s().p("AgSBBIAQheIAPAAIgPBegAADgvQgDgDAAgEQABgEACgDQADgDAEAAQAEAAADADQACACAAAFQAAAEgCACQgDADgEAAQgEAAgDgCg");
	this.shape_471.setTransform(174.375,188.05);

	this.shape_472 = new cjs.Shape();
	this.shape_472.graphics.f("#2F3542").s().p("AgOA1QgFgHABgLIAJg6IgQAAIACgNIARAAIAEgXIAPAAIgFAXIASAAIgCANIgSAAIgIA6IAAAEQAAAHAGAAIAIgBIgCANQgFACgFAAQgKAAgEgHg");
	this.shape_472.setTransform(169.45,188.725);

	this.shape_473 = new cjs.Shape();
	this.shape_473.graphics.f("#2F3542").s().p("AgdApQgKgJABgOIAQAAQAAAIAFAFQAFAFAJAAQAHAAAHgDQAGgFABgGQABgKgMgEIgPgFQgVgGAAgRQABgNALgHQALgJANABQAPAAAJAIQAJAIgBANIgPAAQAAgHgFgEQgFgEgHgBQgIAAgGAEQgFAEgBAGQgBAJALADIAHADQAQAEAHAGQAHAGAAALQgBAIgFAHQgFAGgJAEQgJADgJABQgPgBgKgIg");
	this.shape_473.setTransform(161.5251,189.8);

	this.shape_474 = new cjs.Shape();
	this.shape_474.graphics.f("#2F3542").s().p("AgfApQgIgIAAgLQABgPANgIQAMgIATAAIARAAIABgIQABgIgEgFQgFgFgIgBQgIAAgFAFQgHAEgBAGIgQABQABgJAFgGQAGgHAJgDQAIgDAKAAQAOAAAJAJQAIAIgBAOIgIAvIgBAGQAAAGACAEIgBACIgQAAIAAgGIAAgEQgNALgOABQgNgBgHgIgAgNAGQgIAFgBAJQgBAGAEAFQAEAEAHAAQAIAAAGgDQAGgEAFgHIAEgTIgMAAQgOgBgIAFg");
	this.shape_474.setTransform(152.0291,189.8);

	this.shape_475 = new cjs.Shape();
	this.shape_475.graphics.f("#2F3542").s().p("AgTBEIAXiGIAQAAIgXCGg");
	this.shape_475.setTransform(145.625,187.8);

	this.shape_476 = new cjs.Shape();
	this.shape_476.graphics.f("#2F3542").s().p("AgZA3IgDAMIgPAAIAYiGIAQAAIgKAyQAMgMAPAAQAOAAAHAKQAIAJAAARQABAFgBAFIAAACQgCAPgGALQgGAMgJAGQgJAFgLABQgQgBgJgNgAgPgBIgHApQAFAOAPAAQAIABAHgGQAHgGAEgKQADgLABgMQAAgLgFgIQgEgGgKgBIAAAAQgNAAgLAPg");
	this.shape_476.setTransform(137.9583,187.9);

	this.shape_477 = new cjs.Shape();
	this.shape_477.graphics.f("#2F3542").s().p("AgaArQgIgHgEgLQgEgLABgMQABgOAHgMQAHgMAKgGQALgGALAAQAMAAAJAGQAIAHAEALQAEAKgBAOIAAABQgCANgGAMQgHALgKAGQgLAHgLAAQgMgBgJgGgAgOgaQgJAKgCAQIAAACIAAALQABAKAFAHQAFAGAJAAQAHABAHgFQAHgEAEgIQAFgJABgKIAAgNQgBgKgFgHQgFgFgJgBIgBAAQgLAAgIAJg");
	this.shape_477.setTransform(128.225,189.8);

	this.shape_478 = new cjs.Shape();
	this.shape_478.graphics.f("#2F3542").s().p("AgTBEIAXiGIAQAAIgXCGg");
	this.shape_478.setTransform(121.375,187.8);

	this.shape_479 = new cjs.Shape();
	this.shape_479.graphics.f("#2F3542").s().p("AguBDIAXiDIAOAAIgBALQALgNAQAAQAOABAIAKQAHAJABARIgBALIAAACQgCAPgGAKQgGAMgJAGQgJAFgLAAQgQAAgIgLIgJAugAgLgnIgIAtQAFAMAOABQALAAAJgJQAHgKADgSIABgHQgBgNgEgHQgFgGgJgBIgBAAQgMAAgKANg");
	this.shape_479.setTransform(113.4,191.525);

	this.shape_480 = new cjs.Shape();
	this.shape_480.graphics.f("#2F3542").s().p("AgSBBIAQheIAPAAIgPBegAADgvQgDgDAAgEQABgEACgDQADgDAEAAQAEAAADADQACACAAAFQAAAEgCACQgDADgEAAQgEAAgDgCg");
	this.shape_480.setTransform(107.125,188.05);

	this.shape_481 = new cjs.Shape();
	this.shape_481.graphics.f("#2F3542").s().p("AgdAxIAQheIAOAAIgBALQAKgOANABIAHABIgBAPIgIgBQgPAAgHAOIgNBDg");
	this.shape_481.setTransform(102.1,189.6991);

	this.shape_482 = new cjs.Shape();
	this.shape_482.graphics.f("#2F3542").s().p("AgOA1QgFgHABgLIAJg6IgQAAIACgNIARAAIAEgXIAPAAIgFAXIASAAIgCANIgSAAIgJA6IAAAEQABAHAGAAIAIgBIgBANQgGACgFAAQgKAAgEgHg");
	this.shape_482.setTransform(96.2,188.725);

	this.shape_483 = new cjs.Shape();
	this.shape_483.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgKgFgEQgEgGgKAAQgHABgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgOARAAQAeABAAAhIAAA+g");
	this.shape_483.setTransform(902.525,155.1);

	this.shape_484 = new cjs.Shape();
	this.shape_484.graphics.f("#2F3542").s().p("AgdAqQgJgIAAgNQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAFAAAGIgQAAQAAgHAFgHQAFgHAJgDQAIgEAKgBQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgHgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_484.setTransform(892.625,155.2);

	this.shape_485 = new cjs.Shape();
	this.shape_485.graphics.f("#2F3542").s().p("AgdA3QgKgOAAgWIAAgBQAAgUAKgOQAKgOARAAQAQAAAKAMIAAgyIAQAAIAACGIgPAAIgBgKQgKAMgQAAQgRAAgKgNgAgQgGQgHAIAAASQAAAQAHAKQAHAJAKAAQAPgBAIgOIAAgqQgIgOgOAAQgLAAgHAKg");
	this.shape_485.setTransform(882.45,153.3);

	this.shape_486 = new cjs.Shape();
	this.shape_486.graphics.f("#2F3542").s().p("AgYArQgIgGgEgKQgEgLABgOIABgDQABgOAHgLQAGgKAKgHQAKgFAMgBQAPABAJAKQAIAJAAAPIgOAAQgBgJgFgGQgFgGgIAAQgMAAgIAJQgIAKgCAQIAAACIAAALQAAALAFAGQAGAGAJAAQAHAAAHgFQAHgFACgIIAPAAQgBAJgGAHQgGAIgJAEQgJADgIAAQgMAAgIgGg");
	this.shape_486.setTransform(863.4795,155.2);

	this.shape_487 = new cjs.Shape();
	this.shape_487.graphics.f("#2F3542").s().p("AgSBBIAQheIAPAAIgPBegAADgwQgDgCAAgEQABgEACgDQADgCAEgBQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgDgDg");
	this.shape_487.setTransform(856.775,153.45);

	this.shape_488 = new cjs.Shape();
	this.shape_488.graphics.f("#2F3542").s().p("AgOA1QgFgHABgLIAJg6IgQAAIACgNIARAAIAEgXIAPAAIgFAXIASAAIgCANIgSAAIgJA6IAAAEQABAHAGAAIAIgBIgBANQgGACgFAAQgKAAgEgHg");
	this.shape_488.setTransform(851.85,154.125);

	this.shape_489 = new cjs.Shape();
	this.shape_489.graphics.f("#2F3542").s().p("AgdAoQgKgIABgOIAQAAQAAAIAFAFQAFAFAJAAQAHAAAHgDQAGgFABgHQABgJgMgEIgPgFQgVgGAAgRQABgMALgJQALgHANgBQAPABAJAIQAJAJgBANIgPAAQAAgIgFgEQgFgFgHAAQgIAAgGAEQgFAEgBAHQgBAIALAEIAHABQAQAFAHAFQAHAHAAAKQgBAKgFAGQgFAGgJAEQgJADgJAAQgPAAgKgJg");
	this.shape_489.setTransform(843.9251,155.2);

	this.shape_490 = new cjs.Shape();
	this.shape_490.graphics.f("#2F3542").s().p("AgfAqQgIgIAAgMQABgQANgGQAMgJATAAIARAAIABgIQABgIgEgFQgFgFgIAAQgIAAgFADQgHAFgBAHIgQAAQABgJAFgGQAGgGAJgEQAIgEAKAAQAOABAJAIQAIAJgBAOIgIAuIgBAHQAAAFACAFIgBABIgQAAIAAgEIAAgGQgNAMgOAAQgNAAgHgHgAgNAGQgIAFgBAIQgBAHAEAEQAEAFAHAAQAIABAGgFQAGgEAFgGIAEgUIgMAAQgOABgIAEg");
	this.shape_490.setTransform(834.4291,155.2);

	this.shape_491 = new cjs.Shape();
	this.shape_491.graphics.f("#2F3542").s().p("AgTBDIAXiGIAQAAIgXCGg");
	this.shape_491.setTransform(828.025,153.2);

	this.shape_492 = new cjs.Shape();
	this.shape_492.graphics.f("#2F3542").s().p("AgZA3IgDALIgPAAIAYiGIAQAAIgKAzQAMgNAPAAQAOABAHAKQAIAJAAARQABAFgBAGIAAABQgCAPgGAMQgGAMgJAFQgJAGgLgBQgQAAgJgNgAgPAAIgHAnQAFAPAPABQAIAAAHgGQAHgGAEgLQADgKABgMQAAgMgFgGQgEgHgKgBIAAAAQgNAAgLAQg");
	this.shape_492.setTransform(820.3583,153.3);

	this.shape_493 = new cjs.Shape();
	this.shape_493.graphics.f("#2F3542").s().p("AgaArQgIgGgEgLQgEgMABgNQABgNAHgMQAHgMAKgGQALgHALAAQAMABAJAGQAIAGAEALQAEALgBAOIAAABQgCANgGAMQgHALgKAHQgLAFgLAAQgMAAgJgGgAgOgZQgJAKgCAPIAAABIAAAMQABALAFAFQAFAHAJAAQAHAAAHgEQAHgEAEgJQAFgIABgKIAAgNQgBgLgFgFQgFgHgJAAIgBAAQgLAAgIAKg");
	this.shape_493.setTransform(810.625,155.2);

	this.shape_494 = new cjs.Shape();
	this.shape_494.graphics.f("#2F3542").s().p("AgTBDIAXiGIAQAAIgXCGg");
	this.shape_494.setTransform(803.775,153.2);

	this.shape_495 = new cjs.Shape();
	this.shape_495.graphics.f("#2F3542").s().p("AgtBDIAWiDIAPAAIgCALQALgNAQAAQAOABAHAKQAIAJABARIgBALIAAACQgCAPgGAKQgGAMgJAGQgJAFgLAAQgQAAgIgLIgJAugAgLgnIgIAtQAFAMAOABQALAAAJgJQAHgKADgSIAAgHQAAgNgEgHQgFgGgJgBIgBAAQgMAAgKANg");
	this.shape_495.setTransform(795.8,156.925);

	this.shape_496 = new cjs.Shape();
	this.shape_496.graphics.f("#2F3542").s().p("AgSBBIAQheIAPAAIgPBegAADgwQgDgCAAgEQABgEACgDQADgCAEgBQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgDgDg");
	this.shape_496.setTransform(789.525,153.45);

	this.shape_497 = new cjs.Shape();
	this.shape_497.graphics.f("#2F3542").s().p("AglA6QgIgKgBgRIABgMQABgPAHgKQAGgMAJgGQAJgGALAAQAPABAIALIAKgyIAQAAIgYCGIgOAAIABgKQgKAMgQAAQgOAAgHgKgAgPgKQgIAGgDAJQgEAMAAALQAAANAEAGQAFAIAJAAQANAAALgPIAHgrQgFgNgOAAIAAAAQgJAAgGAGg");
	this.shape_497.setTransform(782.6167,153.3);

	this.shape_498 = new cjs.Shape();
	this.shape_498.graphics.f("#2F3542").s().p("AgBBHQgVgeAAgpQAAgTAFgTQAGgSAKgPQAKgPALgGIADALQgMAKgJAUQgHAUgBAZIAAAHQAAAhAMAZQAHAQAKAIIgDAKQgMgGgJgQg");
	this.shape_498.setTransform(774.575,154.8);

	this.shape_499 = new cjs.Shape();
	this.shape_499.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgKgFgEQgEgGgKAAQgHABgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgOARAAQAeABAAAhIAAA+g");
	this.shape_499.setTransform(756.525,155.1);

	this.shape_500 = new cjs.Shape();
	this.shape_500.graphics.f("#2F3542").s().p("AgdAqQgJgIAAgNQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAFAAAGIgQAAQAAgHAFgHQAFgHAJgDQAIgEAKgBQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgHgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_500.setTransform(746.625,155.2);

	this.shape_501 = new cjs.Shape();
	this.shape_501.graphics.f("#2F3542").s().p("AAWAvIgWhHIgWBHIgNAAIgbhdIAPAAIATBGIAXhGIALAAIAXBHIAThHIAQAAIgcBdg");
	this.shape_501.setTransform(734.95,155.2);

	this.shape_502 = new cjs.Shape();
	this.shape_502.graphics.f("#2F3542").s().p("AgbAkQgMgMAAgWIAAgCQAAgNAFgMQAFgLAKgGQAKgHAKAAQATAAAKANQALAMAAAXIAAAFIhAAAQABAOAHAJQAIAJALAAQAJAAAFgDQAHgEAEgGIAKAIQgMASgXAAQgTAAgMgNgAgOgcQgHAIgBAMIAuAAIAAgBQAAgMgHgHQgFgHgLAAQgJAAgGAHg");
	this.shape_502.setTransform(723.5,155.2);

	this.shape_503 = new cjs.Shape();
	this.shape_503.graphics.f("#2F3542").s().p("AAVBDIAAg/QAAgJgFgEQgEgGgKAAQgHABgGADQgGAFgDAGIAABDIgQAAIAAiGIAQAAIAAA0QALgOAQAAQAeABAAAgIAAA/g");
	this.shape_503.setTransform(713.725,153.2);

	this.shape_504 = new cjs.Shape();
	this.shape_504.graphics.f("#2F3542").s().p("AAVBDIAAg/QAAgJgFgEQgEgGgKAAQgHABgGADQgGAFgDAGIAABDIgQAAIAAiGIAQAAIAAA0QALgOAQAAQAeABAAAgIAAA/g");
	this.shape_504.setTransform(694.225,153.2);

	this.shape_505 = new cjs.Shape();
	this.shape_505.graphics.f("#2F3542").s().p("AgcAnQgIgIAAgRIAAg9IAPAAIAAA8QAAAWASAAQASgBAGgOIAAhDIAQAAIAABdIgPAAIgBgJQgJAMgSgBQgPAAgHgJg");
	this.shape_505.setTransform(684.3,155.3);

	this.shape_506 = new cjs.Shape();
	this.shape_506.graphics.f("#2F3542").s().p("AgYA3IgBALIgOAAIAAiGIAQAAIAAAzQAKgNAQAAQARAAAKAOQAKANAAAWIAAABQAAAWgKANQgKANgRAAQgRAAgKgNgAgXAAIAAAnQAHAPAQABQALAAAGgJQAHgJAAgTQAAgQgHgIQgGgKgLAAQgQABgHAPg");
	this.shape_506.setTransform(674.525,153.3);

	this.shape_507 = new cjs.Shape();
	this.shape_507.graphics.f("#2F3542").s().p("AgdAnQgHgIgBgRIAAg9IAQAAIAAA8QAAAWASAAQASgBAGgOIAAhDIARAAIAABdIgQAAIAAgJQgKAMgRgBQgPAAgJgJg");
	this.shape_507.setTransform(664.3,155.3);

	this.shape_508 = new cjs.Shape();
	this.shape_508.graphics.f("#2F3542").s().p("AgCA1QgGgHAAgMIAAg5IgRAAIAAgNIARAAIAAgXIAQAAIAAAXIARAAIAAANIgRAAIAAA5QAAAGACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_508.setTransform(656.125,154.15);

	this.shape_509 = new cjs.Shape();
	this.shape_509.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgKgFgEQgEgGgKAAQgHABgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgOARAAQAeABAAAhIAAA+g");
	this.shape_509.setTransform(638.875,155.1);

	this.shape_510 = new cjs.Shape();
	this.shape_510.graphics.f("#2F3542").s().p("AgcAnQgIgIAAgRIAAg9IAPAAIAAA8QAAAWASAAQASgBAGgOIAAhDIARAAIAABdIgQAAIgBgJQgJAMgSgBQgPAAgHgJg");
	this.shape_510.setTransform(628.95,155.3);

	this.shape_511 = new cjs.Shape();
	this.shape_511.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgGQAAgGgEgEQgGgDgLgDQgMgDgHgDQgIgDgDgFQgEgFAAgHQAAgMAKgJQAKgHAPgBQAQAAAKAJQAKAJAAANIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAIQgKAHgQAAQgKABgJgFg");
	this.shape_511.setTransform(619.325,155.2);

	this.shape_512 = new cjs.Shape();
	this.shape_512.graphics.f("#2F3542").s().p("AgdAnQgHgIgBgRIAAg9IAQAAIAAA8QABAWARAAQASgBAGgOIAAhDIARAAIAABdIgQAAIAAgJQgKAMgRgBQgPAAgJgJg");
	this.shape_512.setTransform(609.75,155.3);

	this.shape_513 = new cjs.Shape();
	this.shape_513.graphics.f("#2F3542").s().p("AgcBCIgGgBIAAgNIAFAAQAHAAAFgDQAFgDADgJIAEgKIgihdIARAAIAXBGIAWhGIASAAIgnBtQgIAYgTAAg");
	this.shape_513.setTransform(600.55,157.125);

	this.shape_514 = new cjs.Shape();
	this.shape_514.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgKgFgEQgEgGgKAAQgHABgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgOARAAQAeABAAAhIAAA+g");
	this.shape_514.setTransform(591.325,155.1);

	this.shape_515 = new cjs.Shape();
	this.shape_515.graphics.f("#2F3542").s().p("AgbAkQgMgMAAgWIAAgCQgBgNAGgMQAFgLAKgGQAKgHAKAAQATAAAKANQALAMAAAXIAAAFIhAAAQAAAOAIAJQAIAJALAAQAJAAAFgDQAHgEAEgGIAKAIQgMASgXAAQgTAAgMgNgAgOgcQgHAIgBAMIAuAAIAAgBQAAgMgHgHQgFgHgLAAQgJAAgGAHg");
	this.shape_515.setTransform(581.65,155.2);

	this.shape_516 = new cjs.Shape();
	this.shape_516.graphics.f("#2F3542").s().p("AgnBDIAAiDIAPAAIABALQAKgNAQAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgJANgRAAQgRAAgKgLIAAAugAgXgnIAAAtQAIANAOAAQALAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgOAAgIANg");
	this.shape_516.setTransform(571.95,156.925);

	this.shape_517 = new cjs.Shape();
	this.shape_517.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgKgFgEQgEgGgKAAQgHABgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgOARAAQAeABAAAhIAAA+g");
	this.shape_517.setTransform(552.125,155.1);

	this.shape_518 = new cjs.Shape();
	this.shape_518.graphics.f("#2F3542").s().p("AgdAqQgJgIAAgNQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAFAAAGIgQAAQAAgHAFgHQAFgHAJgDQAIgEAKgBQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgHgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_518.setTransform(542.225,155.2);

	this.shape_519 = new cjs.Shape();
	this.shape_519.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgGQAAgGgEgEQgGgDgLgDQgMgDgHgDQgIgDgDgFQgEgFAAgHQAAgMAKgJQAKgHAPgBQAQAAAKAJQAKAJAAANIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAIQgKAHgQAAQgKABgJgFg");
	this.shape_519.setTransform(532.675,155.2);

	this.shape_520 = new cjs.Shape();
	this.shape_520.graphics.f("#2F3542").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgDgDABgEQgBgEADgCQACgDAEAAQAFAAACADQACACABAEQgBAEgCADQgCADgFAAQgEAAgCgDg");
	this.shape_520.setTransform(525.9,153.475);

	this.shape_521 = new cjs.Shape();
	this.shape_521.graphics.f("#2F3542").s().p("AgnBDIAAiDIAPAAIABALQAJgNARAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgJANgRAAQgRAAgKgLIAAAugAgXgnIAAAtQAIANAOAAQALAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgOAAgIANg");
	this.shape_521.setTransform(518.85,156.925);

	this.shape_522 = new cjs.Shape();
	this.shape_522.graphics.f("#2F3542").s().p("AgdAqQgJgIAAgNQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAFAAAGIgQAAQAAgHAFgHQAFgHAJgDQAIgEAKgBQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgHgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_522.setTransform(508.675,155.2);

	this.shape_523 = new cjs.Shape();
	this.shape_523.graphics.f("#2F3542").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_523.setTransform(501.625,153.2);

	this.shape_524 = new cjs.Shape();
	this.shape_524.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgGQAAgGgEgEQgGgDgLgDQgMgDgHgDQgIgDgDgFQgEgFAAgHQAAgMAKgJQAKgHAPgBQAQAAAKAJQAKAJAAANIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAIQgKAHgQAAQgKABgJgFg");
	this.shape_524.setTransform(485.175,155.2);

	this.shape_525 = new cjs.Shape();
	this.shape_525.graphics.f("#2F3542").s().p("AgdAqQgJgIAAgNQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAFAAAGIgQAAQAAgHAFgHQAFgHAJgDQAIgEAKgBQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgHgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_525.setTransform(475.625,155.2);

	this.shape_526 = new cjs.Shape();
	this.shape_526.graphics.f("#2F3542").s().p("AgCA1QgGgHAAgMIAAg5IgRAAIAAgNIARAAIAAgXIAQAAIAAAXIARAAIAAANIgRAAIAAA5QAAAGACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_526.setTransform(467.525,154.15);

	this.shape_527 = new cjs.Shape();
	this.shape_527.graphics.f("#2F3542").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAEAAADADQADACAAAEQAAAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_527.setTransform(462.7,153.475);

	this.shape_528 = new cjs.Shape();
	this.shape_528.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgGQAAgGgEgEQgGgDgLgDQgMgDgHgDQgIgDgDgFQgEgFAAgHQAAgMAKgJQAKgHAPgBQAQAAAKAJQAKAJAAANIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAIQgKAHgQAAQgKABgJgFg");
	this.shape_528.setTransform(455.825,155.2);

	this.shape_529 = new cjs.Shape();
	this.shape_529.graphics.f("#2F3542").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_529.setTransform(447.275,153.2);

	this.shape_530 = new cjs.Shape();
	this.shape_530.graphics.f("#2F3542").s().p("AgbAkQgNgMABgWIAAgCQAAgNAFgMQAGgLAJgGQAKgHAKAAQATAAAKANQAKAMAAAXIAAAFIg/AAQABAOAHAJQAIAJALAAQAJAAAGgDQAGgEAEgGIAKAIQgMASgXAAQgTAAgMgNgAgOgcQgHAIgBAMIAuAAIAAgBQAAgMgHgHQgFgHgLAAQgJAAgGAHg");
	this.shape_530.setTransform(437.4,155.2);

	this.shape_531 = new cjs.Shape();
	this.shape_531.graphics.f("#2F3542").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_531.setTransform(430.375,153.2);

	this.shape_532 = new cjs.Shape();
	this.shape_532.graphics.f("#2F3542").s().p("AgnBDIAAiDIAPAAIABALQAJgNARAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgJANgRAAQgRAAgKgLIAAAugAgXgnIAAAtQAIANAOAAQALAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgOAAgIANg");
	this.shape_532.setTransform(423.35,156.925);

	this.shape_533 = new cjs.Shape();
	this.shape_533.graphics.f("#2F3542").s().p("AAzAwIAAg+QAAgKgFgEQgFgGgLAAQgJABgGAFQgGAGgBAIIAAA+IgPAAIAAg9QAAgVgUAAQgQAAgGAOIAABEIgRAAIAAhdIAQAAIAAAKQALgNASAAQATABAHAPQAEgHAIgEQAIgFAKAAQAfAAABAiIAAA+g");
	this.shape_533.setTransform(410.175,155.1);

	this.shape_534 = new cjs.Shape();
	this.shape_534.graphics.f("#2F3542").s().p("AgeAkQgMgOAAgWIAAAAQAAgOAFgLQAGgLAKgHQAJgFAMgBQATAAAMAOQAMAOAAAVIAAABQAAAOgFALQgFALgKAGQgKAHgNgBQgSAAgMgNgAgTgZQgHAJAAARQAAAQAHAKQAIAJALAAQAMAAAIgJQAHgKAAgRQAAgQgHgJQgIgKgMAAQgLAAgIAKg");
	this.shape_534.setTransform(397.225,155.2);

	this.shape_535 = new cjs.Shape();
	this.shape_535.graphics.f("#2F3542").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_535.setTransform(388.175,153.2);

	this.shape_536 = new cjs.Shape();
	this.shape_536.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgKgFgEQgEgGgKAAQgHABgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgOARAAQAeABAAAhIAAA+g");
	this.shape_536.setTransform(368.425,155.1);

	this.shape_537 = new cjs.Shape();
	this.shape_537.graphics.f("#2F3542").s().p("AgdAqQgJgIAAgNQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAFAAAGIgQAAQAAgHAFgHQAFgHAJgDQAIgEAKgBQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgHgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_537.setTransform(358.525,155.2);

	this.shape_538 = new cjs.Shape();
	this.shape_538.graphics.f("#2F3542").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_538.setTransform(348.425,156.975);

	this.shape_539 = new cjs.Shape();
	this.shape_539.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgKgFgEQgEgGgKAAQgHABgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgOARAAQAeABAAAhIAAA+g");
	this.shape_539.setTransform(338.575,155.1);

	this.shape_540 = new cjs.Shape();
	this.shape_540.graphics.f("#2F3542").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_540.setTransform(331.45,153.475);

	this.shape_541 = new cjs.Shape();
	this.shape_541.graphics.f("#2F3542").s().p("AgcA3QgLgOAAgWIAAgBQAAgUAKgOQAKgOASAAQAPAAAKAMIAAgyIAQAAIAACGIgPAAIAAgKQgLAMgQAAQgRAAgJgNgAgQgGQgHAIAAASQAAAQAHAKQAGAJALAAQAQgBAHgOIAAgqQgHgOgQAAQgLAAgGAKg");
	this.shape_541.setTransform(323.95,153.3);

	this.shape_542 = new cjs.Shape();
	this.shape_542.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgKgFgEQgEgGgKAAQgHABgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgOARAAQAeABAAAhIAAA+g");
	this.shape_542.setTransform(314.125,155.1);

	this.shape_543 = new cjs.Shape();
	this.shape_543.graphics.f("#2F3542").s().p("AgdAqQgJgIAAgNQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAFAAAGIgQAAQAAgHAFgHQAFgHAJgDQAIgEAKgBQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgHgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_543.setTransform(304.225,155.2);

	this.shape_544 = new cjs.Shape();
	this.shape_544.graphics.f("#2F3542").s().p("AgYA3IgBALIgOAAIAAiGIAQAAIAAAzQAKgNAQAAQARAAAKAOQAKANAAAWIAAABQAAAWgKANQgKANgRAAQgRAAgKgNgAgXAAIAAAnQAHAPAQABQALAAAGgJQAHgJAAgTQAAgQgHgIQgGgKgLAAQgQABgHAPg");
	this.shape_544.setTransform(294.525,153.3);

	this.shape_545 = new cjs.Shape();
	this.shape_545.graphics.f("#2F3542").s().p("AgWAwIAAhdIAPAAIABALQAHgOAPAAQAEAAADACIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_545.setTransform(286.7,155.1);

	this.shape_546 = new cjs.Shape();
	this.shape_546.graphics.f("#2F3542").s().p("AgbAkQgMgMAAgWIAAgCQAAgNAFgMQAFgLAKgGQAKgHAKAAQATAAAKANQALAMAAAXIAAAFIhAAAQABAOAHAJQAIAJALAAQAJAAAFgDQAHgEAEgGIAKAIQgMASgXAAQgTAAgMgNgAgOgcQgHAIgBAMIAuAAIAAgBQAAgMgHgHQgFgHgLAAQgJAAgGAHg");
	this.shape_546.setTransform(278.45,155.2);

	this.shape_547 = new cjs.Shape();
	this.shape_547.graphics.f("#2F3542").s().p("AgnBDIAAiDIAPAAIABALQAKgNAQAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgJANgRAAQgRAAgKgLIAAAugAgXgnIAAAtQAHANAPAAQALAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgOAAgIANg");
	this.shape_547.setTransform(268.75,156.925);

	this.shape_548 = new cjs.Shape();
	this.shape_548.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgKgFgEQgEgGgKAAQgHABgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgOARAAQAeABAAAhIAAA+g");
	this.shape_548.setTransform(248.925,155.1);

	this.shape_549 = new cjs.Shape();
	this.shape_549.graphics.f("#2F3542").s().p("AgdAqQgJgIAAgNQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAFAAAGIgQAAQAAgHAFgHQAFgHAJgDQAIgEAKgBQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgHgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_549.setTransform(239.025,155.2);

	this.shape_550 = new cjs.Shape();
	this.shape_550.graphics.f("#2F3542").s().p("AgWAwIAAhdIAPAAIABALQAHgOAPAAQAFAAACACIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_550.setTransform(231.6,155.1);

	this.shape_551 = new cjs.Shape();
	this.shape_551.graphics.f("#2F3542").s().p("AgeAkQgMgOAAgWIAAAAQAAgOAFgLQAGgLAKgHQAJgFAMgBQATAAAMAOQAMAOAAAVIAAABQAAAOgFALQgFALgKAGQgKAHgNgBQgSAAgMgNgAgTgZQgHAJAAARQAAAQAHAKQAIAJALAAQAMAAAIgJQAHgKAAgRQAAgQgHgJQgIgKgMAAQgLAAgIAKg");
	this.shape_551.setTransform(222.975,155.2);

	this.shape_552 = new cjs.Shape();
	this.shape_552.graphics.f("#2F3542").s().p("AgnBDIAAiDIAOAAIABALQALgNAQAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgKANgQAAQgRAAgKgLIAAAugAgXgnIAAAtQAIANAOAAQALAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgOAAgIANg");
	this.shape_552.setTransform(213,156.925);

	this.shape_553 = new cjs.Shape();
	this.shape_553.graphics.f("#2F3542").s().p("AgdAqQgJgIAAgNQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAFAAAGIgQAAQAAgHAFgHQAFgHAJgDQAIgEAKgBQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgHgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_553.setTransform(202.825,155.2);

	this.shape_554 = new cjs.Shape();
	this.shape_554.graphics.f("#2F3542").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_554.setTransform(195.775,153.2);

	this.shape_555 = new cjs.Shape();
	this.shape_555.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgKgFgEQgEgGgKAAQgHABgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgOARAAQAeABAAAhIAAA+g");
	this.shape_555.setTransform(179.025,155.1);

	this.shape_556 = new cjs.Shape();
	this.shape_556.graphics.f("#2F3542").s().p("AgdAqQgJgIAAgNQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAFAAAGIgQAAQAAgHAFgHQAFgHAJgDQAIgEAKgBQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgHgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_556.setTransform(169.125,155.2);

	this.shape_557 = new cjs.Shape();
	this.shape_557.graphics.f("#2F3542").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_557.setTransform(160.325,153.2);

	this.shape_558 = new cjs.Shape();
	this.shape_558.graphics.f("#2F3542").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQADACAAAEQAAAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_558.setTransform(153,153.475);

	this.shape_559 = new cjs.Shape();
	this.shape_559.graphics.f("#2F3542").s().p("AgRBSIAAgMIAHAAQAGAAADgDQABgDAAgHIAAhpIAQAAIAABoQAAAcgYAAQgEAAgFgCgAABhDQgBgDgBgEQABgEABgDQACgCAFAAQAFAAADACQACADAAAEQAAAEgCADQgDACgFABQgFgBgCgCg");
	this.shape_559.setTransform(147.75,155.4);

	this.shape_560 = new cjs.Shape();
	this.shape_560.graphics.f("#2F3542").s().p("AgdAqQgJgIAAgNQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAFAAAGIgQAAQAAgHAFgHQAFgHAJgDQAIgEAKgBQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgHgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_560.setTransform(141.575,155.2);

	this.shape_561 = new cjs.Shape();
	this.shape_561.graphics.f("#2F3542").s().p("AgcBCIgGgBIAAgNIAFAAQAHAAAFgDQAFgDADgJIADgKIghhdIARAAIAXBGIAWhGIASAAIgnBtQgIAYgTAAg");
	this.shape_561.setTransform(132.45,157.125);

	this.shape_562 = new cjs.Shape();
	this.shape_562.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgKgFgEQgEgGgKAAQgHABgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgOARAAQAeABAAAhIAAA+g");
	this.shape_562.setTransform(123.225,155.1);

	this.shape_563 = new cjs.Shape();
	this.shape_563.graphics.f("#2F3542").s().p("AgbAkQgMgMAAgWIAAgCQgBgNAGgMQAGgLAJgGQAKgHAKAAQATAAAKANQALAMAAAXIAAAFIhAAAQAAAOAIAJQAIAJALAAQAJAAAFgDQAHgEAEgGIAKAIQgMASgXAAQgTAAgMgNgAgPgcQgGAIgBAMIAuAAIAAgBQAAgMgHgHQgFgHgLAAQgIAAgIAHg");
	this.shape_563.setTransform(113.55,155.2);

	this.shape_564 = new cjs.Shape();
	this.shape_564.graphics.f("#2F3542").s().p("AAvBAIAAgyIABg1IgpBnIgNAAIgphnIABA1IAAAyIgQAAIAAh/IAVAAIApBnIAqhnIAVAAIAAB/g");
	this.shape_564.setTransform(100.85,153.55);

	this.shape_565 = new cjs.Shape();
	this.shape_565.graphics.f("#2F3542").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAFAAACADQACACABAEQgBAEgCADQgCADgFAAQgEAAgCgDg");
	this.shape_565.setTransform(175.7,118.875);

	this.shape_566 = new cjs.Shape();
	this.shape_566.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgEQAFgEAAgGQAAgGgEgEQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAFAAAIQAAANgLAHQgKAJgQAAQgKgBgJgEg");
	this.shape_566.setTransform(168.825,120.6);

	this.shape_567 = new cjs.Shape();
	this.shape_567.graphics.f("#2F3542").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_567.setTransform(160.275,118.6);

	this.shape_568 = new cjs.Shape();
	this.shape_568.graphics.f("#2F3542").s().p("AgcAoQgIgKAAgRIAAg9IAPAAIAAA9QAAAVASAAQASAAAGgNIAAhFIAQAAIAABfIgPAAIgBgKQgJALgSABQgPAAgHgJg");
	this.shape_568.setTransform(150.15,120.7);

	this.shape_569 = new cjs.Shape();
	this.shape_569.graphics.f("#2F3542").s().p("AgcA2QgLgNAAgVIAAgCQAAgVAKgNQAKgOASABQAPAAAKALIAAgxIAQAAIAACGIgPAAIAAgKQgLAMgQAAQgRgBgJgOgAgQgGQgHAIAAASQAAAQAHAJQAGAJALAAQAQAAAHgNIAAgrQgHgNgQAAQgLAAgGAJg");
	this.shape_569.setTransform(139.9,118.7);

	this.shape_570 = new cjs.Shape();
	this.shape_570.graphics.f("#2F3542").s().p("AgeAkQgMgNAAgXIAAAAQAAgOAFgLQAGgLAKgGQAJgHAMABQATgBAMAOQAMANAAAWIAAABQAAAOgFALQgFALgKAGQgKAGgNABQgSAAgMgOgAgTgZQgHAJAAARQAAAQAHAJQAIAKALAAQAMAAAIgKQAHgJAAgRQAAgPgHgKQgIgKgMAAQgLAAgIAKg");
	this.shape_570.setTransform(129.975,120.6);

	this.shape_571 = new cjs.Shape();
	this.shape_571.graphics.f("#2F3542").s().p("AgWAxIAAhfIAQAAIAAALQAHgNAOABQAFAAADABIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_571.setTransform(122.3,120.5);

	this.shape_572 = new cjs.Shape();
	this.shape_572.graphics.f("#2F3542").s().p("AgnBDIAAiDIAOAAIABALQALgNAQAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgJANgSAAQgQAAgKgLIAAAugAgXgnIAAAtQAHANAQAAQAKAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgPAAgHANg");
	this.shape_572.setTransform(113.9,122.325);

	this.shape_573 = new cjs.Shape();
	this.shape_573.graphics.f("#2F3542").s().p("AgbAlQgNgNABgVIAAgDQAAgOAFgKQAGgMAJgGQAKgGAKAAQATgBAKANQALAMgBAXIAAAFIg/AAQABAOAHAKQAIAIALAAQAJAAAGgEQAGgDAEgGIAKAIQgMATgXAAQgTAAgMgNgAgOgcQgHAHgBAOIAuAAIAAgCQAAgNgHgGQgFgHgLAAQgJAAgGAHg");
	this.shape_573.setTransform(103.95,120.6);

	this.shape_574 = new cjs.Shape();
	this.shape_574.graphics.f("#2F3542").s().p("AgWAxIAAhfIAPAAIABALQAHgNAOABQAFAAADABIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_574.setTransform(96.55,120.5);

	this.shape_575 = new cjs.Shape();
	this.shape_575.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgJgFgFQgEgGgKAAQgHAAgGAFQgGAEgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgNARAAQAeAAAAAhIAAA+g");
	this.shape_575.setTransform(902.725,85.9);

	this.shape_576 = new cjs.Shape();
	this.shape_576.graphics.f("#2F3542").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKgBQgIABgGAEQgGAEAAAHIgQAAQAAgHAFgHQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAPIAAArQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_576.setTransform(892.825,86);

	this.shape_577 = new cjs.Shape();
	this.shape_577.graphics.f("#2F3542").s().p("AgdA2QgKgNAAgWIAAgBQAAgUAKgOQALgNAQAAQAQgBAKAMIAAgyIAQAAIAACGIgPAAIgBgKQgJANgRAAQgQAAgLgPgAgQgHQgHAJAAASQAAAQAHAKQAGAJALgBQAPAAAIgOIAAgqQgIgOgOAAQgLAAgHAJg");
	this.shape_577.setTransform(882.65,84.1);

	this.shape_578 = new cjs.Shape();
	this.shape_578.graphics.f("#2F3542").s().p("AgLAQQAIgMAAgLIAAgOIAPAAIAAAMQAAAJgEAIQgEAJgGAFg");
	this.shape_578.setTransform(870.025,91.075);

	this.shape_579 = new cjs.Shape();
	this.shape_579.graphics.f("#2F3542").s().p("AAVBDIAAg/QAAgIgFgFQgEgGgKAAQgHAAgGAFQgGAEgDAGIAABDIgQAAIAAiGIAQAAIAAA0QALgNAQAAQAeAAAAAgIAAA/g");
	this.shape_579.setTransform(863.625,84);

	this.shape_580 = new cjs.Shape();
	this.shape_580.graphics.f("#2F3542").s().p("AgcAoQgJgKABgQIAAg9IAQAAIAAA8QgBAWATgBQARAAAGgOIAAhDIAQAAIAABdIgPAAIgBgJQgJAMgSAAQgPgBgHgIg");
	this.shape_580.setTransform(853.7,86.1);

	this.shape_581 = new cjs.Shape();
	this.shape_581.graphics.f("#2F3542").s().p("AgYA3IgBALIgOAAIAAiGIAQAAIAAAzQAKgMAQAAQARAAAKAMQAKAOAAAVIAAACQAAAWgKANQgKAOgRAAQgRAAgKgOgAgXAAIAAAnQAHAPAQAAQALABAGgJQAHgKAAgSQAAgQgHgJQgGgJgLAAQgQABgHAPg");
	this.shape_581.setTransform(843.925,84.1);

	this.shape_582 = new cjs.Shape();
	this.shape_582.graphics.f("#2F3542").s().p("AgcAoQgIgKAAgQIAAg9IAPAAIAAA8QAAAWASgBQASAAAGgOIAAhDIARAAIAABdIgQAAIgBgJQgJAMgSAAQgPgBgHgIg");
	this.shape_582.setTransform(833.7,86.1);

	this.shape_583 = new cjs.Shape();
	this.shape_583.graphics.f("#2F3542").s().p("AgCA1QgGgHAAgMIAAg5IgRAAIAAgNIARAAIAAgXIAQAAIAAAXIARAAIAAANIgRAAIAAA5QAAAGACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_583.setTransform(825.525,84.95);

	this.shape_584 = new cjs.Shape();
	this.shape_584.graphics.f("#2F3542").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQADACgBAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_584.setTransform(815,84.275);

	this.shape_585 = new cjs.Shape();
	this.shape_585.graphics.f("#2F3542").s().p("AgWAwIAAhdIAPAAIABAKQAHgMAOAAQAFAAADABIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_585.setTransform(810.25,85.9);

	this.shape_586 = new cjs.Shape();
	this.shape_586.graphics.f("#2F3542").s().p("AgCA1QgGgHAAgMIAAg5IgRAAIAAgNIARAAIAAgXIAQAAIAAAXIARAAIAAANIgRAAIAAA5QAAAGACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_586.setTransform(803.475,84.95);

	this.shape_587 = new cjs.Shape();
	this.shape_587.graphics.f("#2F3542").s().p("AgbAkQgMgMAAgWIAAgCQgBgNAGgMQAGgLAJgGQAKgHAKABQATAAAKAMQALAMAAAXIAAAGIhAAAQAAANAIAJQAIAJALAAQAJAAAFgDQAGgEAFgGIAKAIQgMASgYABQgSAAgMgOgAgPgcQgGAIgCAMIAvAAIAAgBQgBgMgGgHQgGgHgKAAQgIAAgIAHg");
	this.shape_587.setTransform(796.1,86);

	this.shape_588 = new cjs.Shape();
	this.shape_588.graphics.f("#2F3542").s().p("AAzAwIAAg+QAAgJgFgFQgFgGgLAAQgJABgGAFQgGAGgBAIIAAA+IgPAAIAAg9QAAgVgUAAQgQAAgGAOIAABEIgRAAIAAhdIAQAAIAAAKQALgMASAAQATAAAHAPQAEgHAIgEQAIgFAKABQAfgBABAiIAAA+g");
	this.shape_588.setTransform(783.325,85.9);

	this.shape_589 = new cjs.Shape();
	this.shape_589.graphics.f("#2F3542").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAFAAACADQACACABAEQgBAEgCADQgCADgFAAQgEAAgCgDg");
	this.shape_589.setTransform(773.3,84.275);

	this.shape_590 = new cjs.Shape();
	this.shape_590.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgEgLgCQgMgDgHgDQgIgEgDgFQgEgEAAgHQAAgMAKgJQAKgHAPAAQAQgBAKAJQAKAJAAANIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAFAAAIQAAANgLAIQgKAHgQABQgKAAgJgFg");
	this.shape_590.setTransform(766.425,86);

	this.shape_591 = new cjs.Shape();
	this.shape_591.graphics.f("#2F3542").s().p("AgLAQQAIgMAAgLIAAgOIAPAAIAAAMQAAAJgEAIQgEAJgGAFg");
	this.shape_591.setTransform(754.025,91.075);

	this.shape_592 = new cjs.Shape();
	this.shape_592.graphics.f("#2F3542").s().p("AAVBDIAAg/QAAgIgFgFQgEgGgKAAQgHAAgGAFQgGAEgDAGIAABDIgQAAIAAiGIAQAAIAAA0QALgNAQAAQAeAAAAAgIAAA/g");
	this.shape_592.setTransform(747.625,84);

	this.shape_593 = new cjs.Shape();
	this.shape_593.graphics.f("#2F3542").s().p("AgcAoQgJgKABgQIAAg9IAQAAIAAA8QgBAWATgBQARAAAGgOIAAhDIAQAAIAABdIgPAAIAAgJQgKAMgSAAQgPgBgHgIg");
	this.shape_593.setTransform(737.7,86.1);

	this.shape_594 = new cjs.Shape();
	this.shape_594.graphics.f("#2F3542").s().p("AgYA3IgBALIgOAAIAAiGIAQAAIAAAzQAKgMAQAAQARAAAKAMQAKAOAAAVIAAACQAAAWgKANQgKAOgRAAQgRAAgKgOgAgXAAIAAAnQAHAPAQAAQALABAGgJQAHgKAAgSQAAgQgHgJQgGgJgLAAQgQABgHAPg");
	this.shape_594.setTransform(727.925,84.1);

	this.shape_595 = new cjs.Shape();
	this.shape_595.graphics.f("#2F3542").s().p("AgcAoQgJgKABgQIAAg9IAQAAIAAA8QgBAWATgBQARAAAGgOIAAhDIAQAAIAABdIgPAAIgBgJQgJAMgSAAQgPgBgHgIg");
	this.shape_595.setTransform(717.7,86.1);

	this.shape_596 = new cjs.Shape();
	this.shape_596.graphics.f("#2F3542").s().p("AgCA1QgGgHAAgMIAAg5IgRAAIAAgNIARAAIAAgXIAQAAIAAAXIARAAIAAANIgRAAIAAA5QAAAGACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_596.setTransform(709.525,84.95);

	this.shape_597 = new cjs.Shape();
	this.shape_597.graphics.f("#2F3542").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKgBQgIABgGAEQgGAEAAAHIgQAAQAAgHAFgHQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAPIAAArQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_597.setTransform(696.225,86);

	this.shape_598 = new cjs.Shape();
	this.shape_598.graphics.f("#2F3542").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_598.setTransform(686.125,87.775);

	this.shape_599 = new cjs.Shape();
	this.shape_599.graphics.f("#2F3542").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_599.setTransform(676.025,87.775);

	this.shape_600 = new cjs.Shape();
	this.shape_600.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgJgFgFQgEgGgKAAQgHAAgGAFQgGAEgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgNARAAQAeAAAAAhIAAA+g");
	this.shape_600.setTransform(666.175,85.9);

	this.shape_601 = new cjs.Shape();
	this.shape_601.graphics.f("#2F3542").s().p("AgeAkQgMgOAAgWIAAAAQAAgOAFgLQAGgLAKgHQAJgFAMAAQATAAAMANQAMAOAAAVIAAABQAAAOgFALQgFALgKAGQgKAHgNAAQgSAAgMgOgAgTgaQgHAKAAARQAAAQAHAKQAIAJALAAQAMAAAIgJQAHgKAAgRQAAgQgHgJQgIgKgMAAQgLAAgIAJg");
	this.shape_601.setTransform(656.125,86);

	this.shape_602 = new cjs.Shape();
	this.shape_602.graphics.f("#2F3542").s().p("AgWAwIAAhdIAQAAIAAAKQAHgMAOAAQAFAAADABIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_602.setTransform(648.45,85.9);

	this.shape_603 = new cjs.Shape();
	this.shape_603.graphics.f("#2F3542").s().p("AgLAQQAIgMAAgLIAAgOIAPAAIAAAMQAAAJgEAIQgEAJgGAFg");
	this.shape_603.setTransform(637.125,91.075);

	this.shape_604 = new cjs.Shape();
	this.shape_604.graphics.f("#2F3542").s().p("AAVBDIAAg/QAAgIgFgFQgEgGgKAAQgHAAgGAFQgGAEgDAGIAABDIgQAAIAAiGIAQAAIAAA0QALgNAQAAQAeAAAAAgIAAA/g");
	this.shape_604.setTransform(630.725,84);

	this.shape_605 = new cjs.Shape();
	this.shape_605.graphics.f("#2F3542").s().p("AgdAoQgIgKAAgQIAAg9IARAAIAAA8QAAAWASgBQARAAAGgOIAAhDIAQAAIAABdIgPAAIAAgJQgKAMgRAAQgQgBgIgIg");
	this.shape_605.setTransform(620.8,86.1);

	this.shape_606 = new cjs.Shape();
	this.shape_606.graphics.f("#2F3542").s().p("AgYA3IgBALIgOAAIAAiGIAQAAIAAAzQAKgMAQAAQARAAAKAMQAKAOAAAVIAAACQAAAWgKANQgKAOgRAAQgRAAgKgOgAgXAAIAAAnQAHAPAQAAQALABAGgJQAHgKAAgSQAAgQgHgJQgGgJgLAAQgQABgHAPg");
	this.shape_606.setTransform(611.025,84.1);

	this.shape_607 = new cjs.Shape();
	this.shape_607.graphics.f("#2F3542").s().p("AgcAoQgJgKABgQIAAg9IAQAAIAAA8QgBAWATgBQARAAAGgOIAAhDIAQAAIAABdIgPAAIgBgJQgJAMgSAAQgPgBgHgIg");
	this.shape_607.setTransform(600.8,86.1);

	this.shape_608 = new cjs.Shape();
	this.shape_608.graphics.f("#2F3542").s().p("AgCA1QgGgHAAgMIAAg5IgRAAIAAgNIARAAIAAgXIAQAAIAAAXIARAAIAAANIgRAAIAAA5QAAAGACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_608.setTransform(592.625,84.95);

	this.shape_609 = new cjs.Shape();
	this.shape_609.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgJgFgFQgEgGgKAAQgHAAgGAFQgGAEgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgNARAAQAeAAAAAhIAAA+g");
	this.shape_609.setTransform(579.275,85.9);

	this.shape_610 = new cjs.Shape();
	this.shape_610.graphics.f("#2F3542").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKgBQgIABgGAEQgGAEAAAHIgQAAQAAgHAFgHQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAPIAAArQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_610.setTransform(569.375,86);

	this.shape_611 = new cjs.Shape();
	this.shape_611.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgEgLgCQgMgDgHgDQgIgEgDgFQgEgEAAgHQAAgMAKgJQAKgHAPAAQAQgBAKAJQAKAJAAANIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAFAAAIQAAANgLAIQgKAHgQABQgKAAgJgFg");
	this.shape_611.setTransform(559.825,86);

	this.shape_612 = new cjs.Shape();
	this.shape_612.graphics.f("#2F3542").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQADACAAAEQAAAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_612.setTransform(553.05,84.275);

	this.shape_613 = new cjs.Shape();
	this.shape_613.graphics.f("#2F3542").s().p("AgnBDIAAiDIAOAAIABALQALgNAQAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgKANgQAAQgRAAgKgLIAAAugAgXgnIAAAtQAIANAOAAQALAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgOAAgIANg");
	this.shape_613.setTransform(546,87.725);

	this.shape_614 = new cjs.Shape();
	this.shape_614.graphics.f("#2F3542").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKgBQgIABgGAEQgGAEAAAHIgQAAQAAgHAFgHQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAPIAAArQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_614.setTransform(535.825,86);

	this.shape_615 = new cjs.Shape();
	this.shape_615.graphics.f("#2F3542").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_615.setTransform(528.775,84);

	this.shape_616 = new cjs.Shape();
	this.shape_616.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgJgFgFQgEgGgKAAQgHAAgGAFQgGAEgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgNARAAQAeAAAAAhIAAA+g");
	this.shape_616.setTransform(515.925,85.9);

	this.shape_617 = new cjs.Shape();
	this.shape_617.graphics.f("#2F3542").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKgBQgIABgGAEQgGAEAAAHIgQAAQAAgHAFgHQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAPIAAArQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_617.setTransform(506.025,86);

	this.shape_618 = new cjs.Shape();
	this.shape_618.graphics.f("#2F3542").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_618.setTransform(497.225,84);

	this.shape_619 = new cjs.Shape();
	this.shape_619.graphics.f("#2F3542").s().p("AgWAwIAAhdIAQAAIAAAKQAHgMAOAAQAFAAADABIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_619.setTransform(489.5,85.9);

	this.shape_620 = new cjs.Shape();
	this.shape_620.graphics.f("#2F3542").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKgBQgIABgGAEQgGAEAAAHIgQAAQAAgHAFgHQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAPIAAArQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_620.setTransform(481.025,86);

	this.shape_621 = new cjs.Shape();
	this.shape_621.graphics.f("#2F3542").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgEgLgCQgMgDgHgDQgIgEgDgFQgEgEAAgHQAAgMAKgJQAKgHAPAAQAQgBAKAJQAKAJAAANIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAFAAAIQAAANgLAIQgKAHgQABQgKAAgJgFg");
	this.shape_621.setTransform(471.475,86);

	this.shape_622 = new cjs.Shape();
	this.shape_622.graphics.f("#2F3542").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKgBQgIABgGAEQgGAEAAAHIgQAAQAAgHAFgHQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAPIAAArQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_622.setTransform(461.925,86);

	this.shape_623 = new cjs.Shape();
	this.shape_623.graphics.f("#2F3542").s().p("AgcA2QgLgNAAgWIAAgBQAAgUAKgOQAKgNASAAQAPgBAKAMIAAgyIAQAAIAACGIgPAAIAAgKQgLANgQAAQgRAAgJgPgAgQgHQgHAJAAASQAAAQAHAKQAGAJALgBQAQAAAHgOIAAgqQgHgOgQAAQgLAAgGAJg");
	this.shape_623.setTransform(451.75,84.1);

	this.shape_624 = new cjs.Shape();
	this.shape_624.graphics.f("#2F3542").s().p("AgWAwIAAhdIAQAAIAAAKQAHgMAOAAQAGAAACABIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_624.setTransform(444.35,85.9);

	this.shape_625 = new cjs.Shape();
	this.shape_625.graphics.f("#2F3542").s().p("AgbAkQgMgMAAgWIAAgCQgBgNAGgMQAGgLAJgGQAKgHAKABQATAAAKAMQALAMAAAXIAAAGIhAAAQAAANAIAJQAIAJALAAQAJAAAFgDQAGgEAFgGIAKAIQgMASgYABQgSAAgMgOgAgPgcQgGAIgCAMIAvAAIAAgBQgBgMgFgHQgHgHgKAAQgIAAgIAHg");
	this.shape_625.setTransform(436.1,86);

	this.shape_626 = new cjs.Shape();
	this.shape_626.graphics.f("#2F3542").s().p("AgYA3IgBALIgOAAIAAiGIAQAAIAAAzQAKgMAQAAQARAAAKAMQAKAOAAAVIAAACQAAAWgKANQgKAOgRAAQgRAAgKgOgAgXAAIAAAnQAHAPAQAAQALABAGgJQAHgKAAgSQAAgQgHgJQgGgJgLAAQgQABgHAPg");
	this.shape_626.setTransform(426.425,84.1);

	this.shape_627 = new cjs.Shape();
	this.shape_627.graphics.f("#2F3542").s().p("AAzAwIAAg+QAAgJgFgFQgFgGgLAAQgJABgGAFQgGAGgBAIIAAA+IgPAAIAAg9QAAgVgUAAQgQAAgGAOIAABEIgRAAIAAhdIAQAAIAAAKQALgMASAAQATAAAHAPQAEgHAIgEQAIgFAKABQAfgBABAiIAAA+g");
	this.shape_627.setTransform(407.525,85.9);

	this.shape_628 = new cjs.Shape();
	this.shape_628.graphics.f("#2F3542").s().p("AgcAoQgJgKABgQIAAg9IAQAAIAAA8QgBAWATgBQARAAAGgOIAAhDIAQAAIAABdIgPAAIgBgJQgJAMgSAAQgPgBgHgIg");
	this.shape_628.setTransform(394.7,86.1);

	this.shape_629 = new cjs.Shape();
	this.shape_629.graphics.f("#2F3542").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_629.setTransform(387.575,84);

	this.shape_630 = new cjs.Shape();
	this.shape_630.graphics.f("#2F3542").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgDgDABgEQgBgEADgCQACgDAEAAQAFAAACADQACACABAEQgBAEgCADQgCADgFAAQgEAAgCgDg");
	this.shape_630.setTransform(383.25,84.275);

	this.shape_631 = new cjs.Shape();
	this.shape_631.graphics.f("#2F3542").s().p("AgNBEIAAhRIgPAAIAAgMIAPAAIAAgKQAAgQAIgIQAHgJAPAAIAMACIgBANIgJAAQgIgBgEAFQgFAEAAAKIAAAKIAVAAIAAAMIgVAAIAABRg");
	this.shape_631.setTransform(378.275,83.9);

	this.shape_632 = new cjs.Shape();
	this.shape_632.graphics.f("#2F3542").s().p("AAzAwIAAg+QAAgJgFgFQgFgGgLAAQgJABgGAFQgGAGgBAIIAAA+IgPAAIAAg9QAAgVgUAAQgQAAgGAOIAABEIgRAAIAAhdIAQAAIAAAKQALgMASAAQATAAAHAPQAEgHAIgEQAIgFAKABQAfgBABAiIAAA+g");
	this.shape_632.setTransform(361.225,85.9);

	this.shape_633 = new cjs.Shape();
	this.shape_633.graphics.f("#2F3542").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKgBQgIABgGAEQgGAEAAAHIgQAAQAAgHAFgHQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAPIAAArQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_633.setTransform(348.425,86);

	this.shape_634 = new cjs.Shape();
	this.shape_634.graphics.f("#2F3542").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_634.setTransform(341.375,84);

	this.shape_635 = new cjs.Shape();
	this.shape_635.graphics.f("#2F3542").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKgBQgIABgGAEQgGAEAAAHIgQAAQAAgHAFgHQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAPIAAArQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_635.setTransform(334.275,86);

	this.shape_636 = new cjs.Shape();
	this.shape_636.graphics.f("#2F3542").s().p("AgdA2QgKgNAAgWIAAgBQAAgUAKgOQALgNAQAAQAQgBAKAMIAAgyIAQAAIAACGIgPAAIgBgKQgJANgRAAQgQAAgLgPgAgQgHQgHAJAAASQAAAQAHAKQAHAJAKgBQAPAAAIgOIAAgqQgIgOgOAAQgLAAgHAJg");
	this.shape_636.setTransform(324.1,84.1);

	this.shape_637 = new cjs.Shape();
	this.shape_637.graphics.f("#2F3542").s().p("AgbAkQgNgMAAgWIAAgCQABgNAFgMQAFgLAKgGQAKgHAKABQATAAAKAMQAKAMABAXIAAAGIhAAAQABANAHAJQAIAJALAAQAJAAAGgDQAGgEAEgGIAKAIQgMASgXABQgTAAgMgOgAgOgcQgHAIgBAMIAuAAIAAgBQAAgMgHgHQgFgHgLAAQgJAAgGAHg");
	this.shape_637.setTransform(314.55,86);

	this.shape_638 = new cjs.Shape();
	this.shape_638.graphics.f("#2F3542").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_638.setTransform(305.775,84);

	this.shape_639 = new cjs.Shape();
	this.shape_639.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgJgFgFQgEgGgKAAQgHAAgGAFQgGAEgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgNARAAQAeAAAAAhIAAA+g");
	this.shape_639.setTransform(289.925,85.9);

	this.shape_640 = new cjs.Shape();
	this.shape_640.graphics.f("#2F3542").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKgBQgIABgGAEQgGAEAAAHIgQAAQAAgHAFgHQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAPIAAArQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_640.setTransform(280.025,86);

	this.shape_641 = new cjs.Shape();
	this.shape_641.graphics.f("#2F3542").s().p("AAXAvIgXhHIgWBHIgNAAIgchdIARAAIASBGIAWhGIANAAIAWBHIAShHIAQAAIgbBdg");
	this.shape_641.setTransform(268.35,86);

	this.shape_642 = new cjs.Shape();
	this.shape_642.graphics.f("#2F3542").s().p("AgbAkQgNgMAAgWIAAgCQAAgNAGgMQAGgLAJgGQAKgHAKABQATAAAKAMQALAMgBAXIAAAGIg/AAQAAANAIAJQAIAJALAAQAJAAAGgDQAFgEAFgGIAKAIQgMASgYABQgSAAgMgOgAgPgcQgGAIgCAMIAvAAIAAgBQgBgMgFgHQgHgHgKAAQgIAAgIAHg");
	this.shape_642.setTransform(256.9,86);

	this.shape_643 = new cjs.Shape();
	this.shape_643.graphics.f("#2F3542").s().p("AAVBDIAAg/QAAgIgFgFQgEgGgKAAQgHAAgGAFQgGAEgDAGIAABDIgQAAIAAiGIAQAAIAAA0QALgNAQAAQAeAAAAAgIAAA/g");
	this.shape_643.setTransform(247.125,84);

	this.shape_644 = new cjs.Shape();
	this.shape_644.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgJgFgFQgEgGgKAAQgHAAgGAFQgGAEgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgNARAAQAeAAAAAhIAAA+g");
	this.shape_644.setTransform(231.475,85.9);

	this.shape_645 = new cjs.Shape();
	this.shape_645.graphics.f("#2F3542").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKgBQgIABgGAEQgGAEAAAHIgQAAQAAgHAFgHQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAPIAAArQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_645.setTransform(221.575,86);

	this.shape_646 = new cjs.Shape();
	this.shape_646.graphics.f("#2F3542").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_646.setTransform(212.775,84);

	this.shape_647 = new cjs.Shape();
	this.shape_647.graphics.f("#2F3542").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_647.setTransform(203.675,84);

	this.shape_648 = new cjs.Shape();
	this.shape_648.graphics.f("#2F3542").s().p("AgeAkQgMgOAAgWIAAAAQAAgOAFgLQAGgLAKgHQAJgFAMAAQATAAAMANQAMAOAAAVIAAABQAAAOgFALQgFALgKAGQgKAHgNAAQgSAAgMgOgAgTgaQgHAKAAARQAAAQAHAKQAIAJALAAQAMAAAIgJQAHgKAAgRQAAgQgHgJQgIgKgMAAQgLAAgIAJg");
	this.shape_648.setTransform(193.425,86);

	this.shape_649 = new cjs.Shape();
	this.shape_649.graphics.f("#2F3542").s().p("AgnBDIAAiDIAOAAIABALQAKgNARAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgKANgRAAQgQAAgKgLIAAAugAgXgnIAAAtQAHANAQAAQAKAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgPAAgHANg");
	this.shape_649.setTransform(183.45,87.725);

	this.shape_650 = new cjs.Shape();
	this.shape_650.graphics.f("#2F3542").s().p("AAzAwIAAg+QAAgJgFgFQgFgGgLAAQgJABgGAFQgGAGgBAIIAAA+IgPAAIAAg9QAAgVgUAAQgQAAgGAOIAABEIgRAAIAAhdIAQAAIAAAKQALgMASAAQATAAAHAPQAEgHAIgEQAIgFAKABQAfgBABAiIAAA+g");
	this.shape_650.setTransform(170.275,85.9);

	this.shape_651 = new cjs.Shape();
	this.shape_651.graphics.f("#2F3542").s().p("AgeAkQgMgOAAgWIAAAAQAAgOAFgLQAGgLAKgHQAJgFAMAAQATAAAMANQAMAOAAAVIAAABQAAAOgFALQgFALgKAGQgKAHgNAAQgSAAgMgOgAgTgaQgHAKAAARQAAAQAHAKQAIAJALAAQAMAAAIgJQAHgKAAgRQAAgQgHgJQgIgKgMAAQgLAAgIAJg");
	this.shape_651.setTransform(157.325,86);

	this.shape_652 = new cjs.Shape();
	this.shape_652.graphics.f("#2F3542").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_652.setTransform(150.025,84);

	this.shape_653 = new cjs.Shape();
	this.shape_653.graphics.f("#2F3542").s().p("AgbAkQgMgMAAgWIAAgCQgBgNAGgMQAGgLAJgGQAKgHAKABQATAAAKAMQALAMAAAXIAAAGIhAAAQAAANAIAJQAIAJALAAQAJAAAFgDQAGgEAFgGIAKAIQgMASgYABQgSAAgMgOgAgPgcQgGAIgCAMIAvAAIAAgBQgBgMgGgHQgGgHgKAAQgIAAgIAHg");
	this.shape_653.setTransform(143.15,86);

	this.shape_654 = new cjs.Shape();
	this.shape_654.graphics.f("#2F3542").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_654.setTransform(133.075,87.775);

	this.shape_655 = new cjs.Shape();
	this.shape_655.graphics.f("#2F3542").s().p("AAVAwIAAg+QAAgJgFgFQgEgGgKAAQgHAAgGAFQgGAEgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgNARAAQAeAAAAAhIAAA+g");
	this.shape_655.setTransform(123.225,85.9);

	this.shape_656 = new cjs.Shape();
	this.shape_656.graphics.f("#2F3542").s().p("AgbAkQgMgMAAgWIAAgCQgBgNAGgMQAGgLAJgGQAKgHAKABQATAAAKAMQALAMAAAXIAAAGIhAAAQAAANAIAJQAIAJALAAQAJAAAFgDQAHgEAEgGIAKAIQgMASgXABQgTAAgMgOgAgPgcQgGAIgBAMIAuAAIAAgBQAAgMgHgHQgFgHgLAAQgIAAgIAHg");
	this.shape_656.setTransform(113.55,86);

	this.shape_657 = new cjs.Shape();
	this.shape_657.graphics.f("#2F3542").s().p("AAvBAIAAgyIABg1IgpBnIgNAAIgphnIABA1IAAAyIgQAAIAAh/IAVAAIApBnIAqhnIAVAAIAAB/g");
	this.shape_657.setTransform(100.85,84.35);

	this.instance_1 = new lib.Bitmap6();
	this.instance_1.setTransform(5,2);

	this.instance_2 = new lib.Bitmap5();
	this.instance_2.setTransform(-28,-39);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.shape_657},{t:this.shape_656},{t:this.shape_655},{t:this.shape_654},{t:this.shape_653},{t:this.shape_652},{t:this.shape_651},{t:this.shape_650},{t:this.shape_649},{t:this.shape_648},{t:this.shape_647},{t:this.shape_646},{t:this.shape_645},{t:this.shape_644},{t:this.shape_643},{t:this.shape_642},{t:this.shape_641},{t:this.shape_640},{t:this.shape_639},{t:this.shape_638},{t:this.shape_637},{t:this.shape_636},{t:this.shape_635},{t:this.shape_634},{t:this.shape_633},{t:this.shape_632},{t:this.shape_631},{t:this.shape_630},{t:this.shape_629},{t:this.shape_628},{t:this.shape_627},{t:this.shape_626},{t:this.shape_625},{t:this.shape_624},{t:this.shape_623},{t:this.shape_622},{t:this.shape_621},{t:this.shape_620},{t:this.shape_619},{t:this.shape_618},{t:this.shape_617},{t:this.shape_616},{t:this.shape_615},{t:this.shape_614},{t:this.shape_613},{t:this.shape_612},{t:this.shape_611},{t:this.shape_610},{t:this.shape_609},{t:this.shape_608},{t:this.shape_607},{t:this.shape_606},{t:this.shape_605},{t:this.shape_604},{t:this.shape_603},{t:this.shape_602},{t:this.shape_601},{t:this.shape_600},{t:this.shape_599},{t:this.shape_598},{t:this.shape_597},{t:this.shape_596},{t:this.shape_595},{t:this.shape_594},{t:this.shape_593},{t:this.shape_592},{t:this.shape_591},{t:this.shape_590},{t:this.shape_589},{t:this.shape_588},{t:this.shape_587},{t:this.shape_586},{t:this.shape_585},{t:this.shape_584},{t:this.shape_583},{t:this.shape_582},{t:this.shape_581},{t:this.shape_580},{t:this.shape_579},{t:this.shape_578},{t:this.shape_577},{t:this.shape_576},{t:this.shape_575},{t:this.shape_574},{t:this.shape_573},{t:this.shape_572},{t:this.shape_571},{t:this.shape_570},{t:this.shape_569},{t:this.shape_568},{t:this.shape_567},{t:this.shape_566},{t:this.shape_565},{t:this.shape_564},{t:this.shape_563},{t:this.shape_562},{t:this.shape_561},{t:this.shape_560},{t:this.shape_559},{t:this.shape_558},{t:this.shape_557},{t:this.shape_556},{t:this.shape_555},{t:this.shape_554},{t:this.shape_553},{t:this.shape_552},{t:this.shape_551},{t:this.shape_550},{t:this.shape_549},{t:this.shape_548},{t:this.shape_547},{t:this.shape_546},{t:this.shape_545},{t:this.shape_544},{t:this.shape_543},{t:this.shape_542},{t:this.shape_541},{t:this.shape_540},{t:this.shape_539},{t:this.shape_538},{t:this.shape_537},{t:this.shape_536},{t:this.shape_535},{t:this.shape_534},{t:this.shape_533},{t:this.shape_532},{t:this.shape_531},{t:this.shape_530},{t:this.shape_529},{t:this.shape_528},{t:this.shape_527},{t:this.shape_526},{t:this.shape_525},{t:this.shape_524},{t:this.shape_523},{t:this.shape_522},{t:this.shape_521},{t:this.shape_520},{t:this.shape_519},{t:this.shape_518},{t:this.shape_517},{t:this.shape_516},{t:this.shape_515},{t:this.shape_514},{t:this.shape_513},{t:this.shape_512},{t:this.shape_511},{t:this.shape_510},{t:this.shape_509},{t:this.shape_508},{t:this.shape_507},{t:this.shape_506},{t:this.shape_505},{t:this.shape_504},{t:this.shape_503},{t:this.shape_502},{t:this.shape_501},{t:this.shape_500},{t:this.shape_499},{t:this.shape_498},{t:this.shape_497},{t:this.shape_496},{t:this.shape_495},{t:this.shape_494},{t:this.shape_493},{t:this.shape_492},{t:this.shape_491},{t:this.shape_490},{t:this.shape_489},{t:this.shape_488},{t:this.shape_487},{t:this.shape_486},{t:this.shape_485},{t:this.shape_484},{t:this.shape_483},{t:this.shape_482},{t:this.shape_481},{t:this.shape_480},{t:this.shape_479},{t:this.shape_478},{t:this.shape_477},{t:this.shape_476},{t:this.shape_475},{t:this.shape_474},{t:this.shape_473},{t:this.shape_472},{t:this.shape_471},{t:this.shape_470},{t:this.shape_469},{t:this.shape_468},{t:this.shape_467},{t:this.shape_466},{t:this.shape_465},{t:this.shape_464},{t:this.shape_463},{t:this.shape_462},{t:this.shape_461},{t:this.shape_460},{t:this.shape_459},{t:this.shape_458},{t:this.shape_457},{t:this.shape_456},{t:this.shape_455},{t:this.shape_454},{t:this.shape_453},{t:this.shape_452},{t:this.shape_451},{t:this.shape_450},{t:this.shape_449},{t:this.shape_448},{t:this.shape_447},{t:this.shape_446},{t:this.shape_445},{t:this.shape_444},{t:this.shape_443},{t:this.shape_442},{t:this.shape_441},{t:this.shape_440},{t:this.shape_439},{t:this.shape_438},{t:this.shape_437},{t:this.shape_436},{t:this.shape_435},{t:this.shape_434},{t:this.shape_433},{t:this.shape_432},{t:this.shape_431},{t:this.shape_430},{t:this.shape_429},{t:this.shape_428},{t:this.shape_427},{t:this.shape_426},{t:this.shape_425},{t:this.shape_424},{t:this.shape_423},{t:this.shape_422},{t:this.shape_421},{t:this.shape_420},{t:this.shape_419},{t:this.shape_418},{t:this.shape_417},{t:this.shape_416},{t:this.shape_415},{t:this.shape_414},{t:this.shape_413},{t:this.shape_412},{t:this.shape_411},{t:this.shape_410},{t:this.shape_409},{t:this.shape_408},{t:this.shape_407},{t:this.shape_406},{t:this.shape_405},{t:this.shape_404},{t:this.shape_403},{t:this.shape_402},{t:this.shape_401},{t:this.shape_400},{t:this.shape_399},{t:this.shape_398},{t:this.shape_397},{t:this.shape_396},{t:this.shape_395},{t:this.shape_394},{t:this.shape_393},{t:this.shape_392},{t:this.shape_391},{t:this.shape_390},{t:this.shape_389},{t:this.shape_388},{t:this.shape_387},{t:this.shape_386},{t:this.shape_385},{t:this.shape_384},{t:this.shape_383},{t:this.shape_382},{t:this.shape_381},{t:this.shape_380},{t:this.shape_379},{t:this.shape_378},{t:this.shape_377},{t:this.shape_376},{t:this.shape_375},{t:this.shape_374},{t:this.shape_373},{t:this.shape_372},{t:this.shape_371},{t:this.shape_370},{t:this.shape_369},{t:this.shape_368},{t:this.shape_367},{t:this.shape_366},{t:this.shape_365},{t:this.shape_364},{t:this.shape_363},{t:this.shape_362},{t:this.shape_361},{t:this.shape_360},{t:this.shape_359},{t:this.shape_358},{t:this.shape_357},{t:this.shape_356},{t:this.shape_355},{t:this.shape_354},{t:this.shape_353},{t:this.shape_352},{t:this.shape_351},{t:this.shape_350},{t:this.shape_349},{t:this.shape_348},{t:this.shape_347},{t:this.shape_346},{t:this.shape_345},{t:this.shape_344},{t:this.shape_343},{t:this.shape_342},{t:this.shape_341},{t:this.shape_340},{t:this.shape_339},{t:this.shape_338},{t:this.shape_337},{t:this.shape_336},{t:this.shape_335},{t:this.shape_334},{t:this.shape_333},{t:this.shape_332},{t:this.shape_331},{t:this.shape_330},{t:this.shape_329},{t:this.shape_328},{t:this.shape_327},{t:this.shape_326},{t:this.shape_325},{t:this.shape_324},{t:this.shape_323},{t:this.shape_322},{t:this.shape_321},{t:this.shape_320},{t:this.shape_319},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.btnMenuKD}]}).wait(1));

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
		{src:"images/Bitmap5.png", id:"Bitmap5"},
		{src:"images/Bitmap6.png", id:"Bitmap6"},
		{src:"components/lib/jquery-3.4.1.min.js", id:"lib/jquery-3.4.1.min.js"},
		{src:"components/sdk/anwidget.js", id:"sdk/anwidget.js"},
		{src:"components/ui/src/image.js", id:"an.Image"},
		{src:"components/ui/src/image.js", id:"an.Image"}
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
function _updateVisibility(evt) {
	if((this.stage == null || this._off || this._lastAddedFrame != this.parent.currentFrame) && this._element && this._element._attached) {
		this._element.detach();
		stage.removeEventListener('drawstart', this._updateVisibilityCbk);
		this._updateVisibilityCbk = false;
	}
}
function _handleDrawEnd(evt) {
	if(this._element && this._element._attached) {
		var props = this.getConcatenatedDisplayProps(this._props), mat = props.matrix;
		var tx1 = mat.decompose(); var sx = tx1.scaleX; var sy = tx1.scaleY;
		var dp = window.devicePixelRatio || 1; var w = this.nominalBounds.width * sx; var h = this.nominalBounds.height * sy;
		mat.tx/=dp;mat.ty/=dp; mat.a/=(dp*sx);mat.b/=(dp*sx);mat.c/=(dp*sy);mat.d/=(dp*sy);
		this._element.setProperty('transform-origin', this.regX + 'px ' + this.regY + 'px');
		var x = (mat.tx + this.regX*mat.a + this.regY*mat.c - this.regX);
		var y = (mat.ty + this.regX*mat.b + this.regY*mat.d - this.regY);
		var tx = 'matrix(' + mat.a + ',' + mat.b + ',' + mat.c + ',' + mat.d + ',' + x + ',' + y + ')';
		this._element.setProperty('transform', tx);
		this._element.setProperty('width', w);
		this._element.setProperty('height', h);
		this._element.update();
	}
}

function _tick(evt) {
	this._lastAddedFrame = this.parent.currentFrame;
	var stage = this.stage;
	stage&&stage.on('drawend', this._handleDrawEnd, this, true);
	if(!this._updateVisibilityCbk) {
		this._updateVisibilityCbk = stage.on('drawstart', this._updateVisibility, this, false);
	}
}
function _componentDraw(ctx) {
	if(this._element && !this._element._attached) {
		this._element.attach($('#dom_overlay_container'));
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