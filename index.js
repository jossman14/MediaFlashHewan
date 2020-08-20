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



(lib.Bitmap1 = function() {
	this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,987,663);


(lib.Bitmap13 = function() {
	this.initialize(img.Bitmap13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,675,535);


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


(lib.semakDalem = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#235F1E").s().p("AAVA6Qg8gSgfg2IAAAPQgGAAgFgIQgFgKAAgNIAAgQIAAgQQBVAgBYgSIAAACIgyBtIgQgFg");
	this.shape.setTransform(10.575,107.175);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#23601D").s().p("AjQgeIDsggIC1AgIgIAGQhmBXhjAAQhpAAhnhdg");
	this.shape_1.setTransform(40.15,105.6202);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2A691F").s().p("AhJA2IAGhuIAAgQIAQAAQgHBkBpgRIAbgFQgdAzg0AOQgKACgJAAQgaAAgVgTg");
	this.shape_2.setTransform(71.825,89.2907);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#478927").s().p("AhGAWIAQgfIAAgQQAagVAbgOQAhgRAeARIAEARQANA5gXA3g");
	this.shape_3.setTransform(46.8213,68.7625);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#387E2C").s().p("AglA1QgLg/Adg9IACgCIA6AQIgCAnQgEA3goAlg");
	this.shape_4.setTransform(4.1367,84.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#357624").s().p("Aj0C7IAAAQIgPg/IAAg/IAgAWQApgmADg3IADgnIAyAkIgDhTQC/BNBHi9IAFgOIAQA/IgQAfIB+AwIAAAPIgCAIQgWB1hGBfIjsAgIAAgCQggAGgfAAQg4AAg3gUg");
	this.shape_5.setTransform(26.375,82.2125);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#51932B").s().p("AiEC2IgQAAIAAjbIAhhAIAeARIAQBFIAQg2QBTAAA8gtQAzgmAIg0IgODVIAAAvIgFAPQgzCGhuAAQguAAg3gXg");
	this.shape_6.setTransform(26.275,55.8498);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#79BD3B").s().p("AhGAgIAghOIAAgQQAmgKARgmIAHgPIAvgQIAQBPQAABUgzA8QgyA8hIAAg");
	this.shape_7.setTransform(32.675,14.175);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#286821").s().p("AgPCIQAXg3gNg6IgDgRQgegQgiAQQgcAOgZAVIAAAQIgQg+IAAgvIAvg/IAFAYIAbgoQBigmBjAkIAHACIAAAQIgBAPQgHB8g3BwIheAQg");
	this.shape_8.setTransform(53.95,62.0743);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#377926").s().p("ABdBVQhjgkhiAmIAAgQIBPh9IBdggQAwBJgOBVIgCAPIgHgCg");
	this.shape_9.setTransform(58.1682,40.175);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#377B24").s().p("AgJggIACiUIAPAAIAQEqIgvA/g");
	this.shape_10.setTransform(42.125,38.625);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#6AAA31").s().p("AhtBPIAEgFQAbghgQgpIAQAAQBIAAAyg7QAyg8AAhVIAQA/IAABAIgQAAIgCCTQgHAzgzAnQg7AthUAAg");
	this.shape_11.setTransform(31.9,28.35);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#408124").s().p("AhlgiQBlAUBfgjIAIgBIhPBeIgaAFQgQACgMAAQhNAAAGhVg");
	this.shape_12.setTransform(76.8311,85.5225);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#599A2C").s().p("Ah1AsIAAgQIA/guICsggIgfBOIgIABQg9AWg+AAQglAAgkgHg");
	this.shape_13.setTransform(78.425,77.6386);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#0A4618").s().p("Al5EaIhPiuIAAgQQAfA4A9ARIAQAFIAxhtQDLC4DPiyIAHgGIi0ggQBFheAXh2IACgIIBegPQAGAigSAeIgTAeIAVAYIAqgoIgGBvQAdAZAlgIQA1gOAdgyIBPhfIAfhPIAQg/IAQAEIAPAcIAABeIgPA/IggAwIAAAPIgfAgIAAAeQgNAAgJAOQgKAOAAAUIhfBPQAGgBAGgDQA3gOA1AXIABAYIg5BBIhvAwIg4AHQh3ANh1AAQiSAAiQgUg");
	this.shape_14.setTransform(49.225,96.4464);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#6EB036").s().p("AgmgSQA2gcBOAAIgPA+IisAfQAAgnA3gag");
	this.shape_15.setTransform(82.35,70.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.semakDalem, new cjs.Rectangle(0,0,95,126.7), null);


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


(lib.btnAwalNext = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.bookpngcopy();
	this.instance.setTransform(-53,-16,0.0628,0.0628);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#16681E").s().p("AgIBDQgGgGAAgIIAAhJIgHAAIAAgKIAHAAIAAgrIAKAAIAAArIAGAAIAAAKIgGAAIAABJQAAAFADADQADADAFAAIAEAAIAEgDIAAgBIABABIAGAFIABABIgBABQgEADgDACIgIABQgJAAgGgHg");
	this.shape.setTransform(31.3,-3.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#16681E").s().p("AAgA0IAAgOQgHAHgIADQgIAEgJAAQgLAAgJgFQgJgGgGgJQgFgKAAgLIAAg+IAKAAIAAA+QgBAJAFAHQAEAHAHAEQAHAEAIAAQAJAAAHgEQAHgEAEgHQAFgHAAgJIAAgBIAAg9IAKAAIAABng");
	this.shape_1.setTransform(22.75,-1.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#16681E").s().p("AgKBeQgEgBgDgDIgBgBIABgBIAFgFIABgBIABABIAEACIAFABQADAAAEgDQADgEAAgFIAAh9IAKAAIAAB9QAAAJgGAHQgGAGgIAAQgFAAgEgCgAAJhVIAAgKIAKAAIAAAKg");
	this.shape_2.setTransform(14.575,-1.575);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#16681E").s().p("AAfA0IAAg+QAAgJgDgHQgFgHgHgEQgHgFgJAAQgIAAgHAFQgHAEgEAHQgEAHgBAJIAAA+IgJAAIAAhnIAJAAIAAAOQAGgHAJgEQAIgDAIAAQAMAAAJAFQAKAGAFAJQAFAJAAAMIAAA+g");
	this.shape_3.setTransform(9,-1.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#16681E").s().p("AAqA0IAAgWQgHALgLAFQgLAGgNAAQgNAAgMgHQgMgHgHgMQgHgLAAgPQAAgOAHgLQAHgMAMgHQAMgHANAAQAOAAANAHQALAHAHAMQAHALABAOIAAA0gAgVgkQgJAGgGAJQgFAKgBALQABAMAFAJQAGAKAJAGQAKAFALAAQAMAAAJgFQAKgGAGgKQAGgJgBgMQABgLgGgKQgGgJgKgGQgJgGgMAAQgLAAgKAGg");
	this.shape_4.setTransform(-2.5,-1.575);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#16681E").s().p("AA6BLIh0AAIAAiVIAKAAIAACLIBrAAIAAAKg");
	this.shape_5.setTransform(-14.7,-3.825);

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
	this.shape_9.graphics.f("#16681E").s().p("AgIBEQgGgGAAgJIAAhJIgHAAIAAgKIAHAAIAAgrIAKAAIAAArIAGAAIAAAKIgGAAIAABJQAAAEADAEQADADAFAAIAEgBIAEgCIAAgBIABABIAGAFIABABIgBABQgEADgDABIgIACQgJAAgGgGg");
	this.shape_9.setTransform(31.3,-1.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#16681E").s().p("AnHBSQg4AAgngnIgFgGQgagdgHglQgCgJAAgKIAAghQACAxAhAkIAFAFQAnAoA4AAIClAAILqAAQA3AAAogoIAFgFQASgUAJgXQAHgVAAgVIAAAhIAAAEIAAAFQgBAPgEAOIgCADQgJAYgSAUIgFAGQgoAng3AAg");
	this.shape_10.setTransform(-0.35,15);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#16681E").s().p("AgIBEQgGgGAAgKIAAhIIgHAAIAAgKIAHAAIAAgrIAKAAIAAArIAGAAIAAAKIgGAAIAABIQAAAGADADQADADAFAAIAEAAIAEgDIAAgBIABABIAGAFIABABIgBABQgEADgDACIgIABQgJAAgGgGg");
	this.shape_11.setTransform(31.3,2.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8,p:{y:-3.875}},{t:this.shape_7,p:{y:-3.875}},{t:this.shape_6},{t:this.shape_5,p:{y:-3.825}},{t:this.shape_4,p:{y:-1.575}},{t:this.shape_3,p:{y:-1.575}},{t:this.shape_2,p:{y:-1.575}},{t:this.shape_1,p:{y:-1.575}},{t:this.shape},{t:this.instance,p:{y:-16}}]}).to({state:[{t:this.shape_8,p:{y:-1.875}},{t:this.shape_10},{t:this.shape_7,p:{y:-1.875}},{t:this.shape_5,p:{y:-1.825}},{t:this.shape_4,p:{y:0.425}},{t:this.shape_3,p:{y:0.425}},{t:this.shape_2,p:{y:0.425}},{t:this.shape_1,p:{y:0.425}},{t:this.shape_9},{t:this.instance,p:{y:-14}}]},1).to({state:[{t:this.shape_8,p:{y:2.125}},{t:this.shape_7,p:{y:2.125}},{t:this.shape_5,p:{y:2.175}},{t:this.shape_4,p:{y:4.425}},{t:this.shape_3,p:{y:4.425}},{t:this.shape_2,p:{y:4.425}},{t:this.shape_1,p:{y:4.425}},{t:this.shape_11},{t:this.instance,p:{y:-10}}]},1).to({state:[{t:this.shape_8,p:{y:2.125}},{t:this.shape_7,p:{y:2.125}},{t:this.shape_5,p:{y:2.175}},{t:this.shape_4,p:{y:4.425}},{t:this.shape_3,p:{y:4.425}},{t:this.shape_2,p:{y:4.425}},{t:this.shape_1,p:{y:4.425}},{t:this.shape_11},{t:this.instance,p:{y:-10}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.4,-25.6,118.1,49.5);


(lib.awan2Dalem = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EAF6FB").s().p("ACgDpQgZgLgIgaQgLAAgIADQliBAkxi6IAAgQQCphCCkBPQANgUgVgrQgfhCAVhIIAAgQQCog9BuCJIAJAKQDHjkEuAgIg/AQIAQBPQgVAKgPARQh/CJioBPQBEgDBFAFQBLABBAAlQglAPgjASQgUAJgQAOQgGAHgCAJIAgAtQgiAPgmABIgCAAQhEAAhAgZg");
	this.shape.setTransform(97.75,25.8093);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D5EFF8").s().p("Ag+gfIA+gQQAaAAATAYQASAXAAAfIhtAQg");
	this.shape_1.setTransform(152.975,5.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C7E8F6").s().p("AhLD0IhpgDQAMghAjgLIAigLIAjgHIuwAfIErg/QBBAQA3gmIAPgLIgJhtQEyC5FhhAQAJgDAKAAQAJAbAYAKQBBAaBGgBQAlAAAjgPIghguQACgJAGgGQAQgOAUgKQAkgRAkgPQg/gmhMAAQhFgGhEAEQCphPB+iKQAPgRAVgKIBvgQQAeAkgLAsIgEAPIgPAAIAAAvIgGADQg3AigGBAIACAFIAAACIACAAIAHAAIAigHIAQgBQArgDAnARIADACIAEAGIABAJIAAAGIgBAFIgMAsQgFATgRALIgFADIgFABIGCAvQi9AnjAAVQkBAakCAAQheAAhegEg");
	this.shape_2.setTransform(100.925,33.0742);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.awan2Dalem, new cjs.Rectangle(0,0,201.9,57.9), null);


(lib.awan1Dalem = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E1F3F9").s().p("AgsAVIgPgIIAJgSIAAgPIBugQQgEBJgwAAQgUAAgggQg");
	this.shape.setTransform(98.15,11.4029);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F6FAFB").s().p("AomCIIA/gwQBxABBlgwIAdgOIAJhUQBthGCBASQAOACAPgBQA9hpBvAZQBaAVAmBTIgKAoQAkAzBEAIQBDAEA6AeQgvAYgzAGQhZAOhXgTIg3AZQjVBfjZAAQipAAitg6g");
	this.shape_1.setTransform(56.7,19.3712);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#DBF0F8").s().p("ArpBZIAQAAQGKCEF6ipIA4gZQBXATBYgOQAzgGAvgYQg6gdhDgEQhEgIgjg0IAJgoIAgAAIgJATIAPAIQBjAxAFhsIAAgQQBxgaBcBFIALAJIgsBkQCSgcCFBAQgHAjgfAMQgnAPgoAEIhCgCQgqAkgxAVQhMAghTgFQhSgGg+g3QjfBbjgAAQjqAAjphig");
	this.shape_2.setTransform(74.575,24.0879);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.awan1Dalem, new cjs.Rectangle(0,0,149.2,42.8), null);


(lib.semak1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.semakDalem();
	this.instance.setTransform(47.5,63.4,1,1,0,0,0,47.5,63.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:47.4,scaleX:1.3516,scaleY:0.7052,x:47.4,y:82.05},34).to({regX:47.5,scaleX:1,scaleY:1,x:47.5,y:63.4},37).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.6,0,128.3,126.8);


(lib.awan2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.awan2Dalem();
	this.instance.setTransform(-151.55,60.65,1,1,0,0,0,100.9,28.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:101,scaleX:0.7621,scaleY:0.7621,x:565.8,y:60.7},99).to({regX:100.9,scaleX:1,scaleY:1,x:-151.55,y:60.65},107).wait(7));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-252.4,31.8,895.1,57.8);


(lib.awan1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.awan1Dalem();
	this.instance.setTransform(74.5,21.4,1,1,0,0,0,74.5,21.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:74.3,scaleX:1.3309,scaleY:1.3309,x:-464.05,y:23.5},62).to({regX:74.5,scaleX:1,scaleY:1,x:74.5,y:21.4},66).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-562.9,-5,712.0999999999999,57);


(lib.bgAwal = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap13();
	this.instance.setTransform(134,125);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_2
	this.instance_1 = new lib.semak1();
	this.instance_1.setTransform(747.05,485);

	this.instance_2 = new lib.semak1();
	this.instance_2.setTransform(147.15,460.3);

	this.instance_3 = new lib.awan2();
	this.instance_3.setTransform(115.9,227.7,1,1,0,0,0,100.9,28.9);

	this.instance_4 = new lib.awan1();
	this.instance_4.setTransform(351.85,111.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]}).wait(1));

	// Layer_1
	this.instance_5 = new lib.Bitmap1();

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bgAwal, new cjs.Rectangle(-237.4,0,1224.4,663), null);


// stage content:
(lib.Main = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{awal:0});

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
		  _this.hening.visible = !_this.hening.visible;
		
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
		
		_this.btnAwalNext.on('click', function(){
		
		window.location.replace('data/menu/index.html');
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// suara
	this.nyala = new lib.ggg();
	this.nyala.name = "nyala";
	this.nyala.setTransform(919.4,48.7,0.7266,0.7266,0,0,0,-16.4,-1.2);
	new cjs.ButtonHelper(this.nyala, 0, 1, 2, false, new lib.ggg(), 3);

	this.tandaSuaraOn = new lib.an_Image({'id': 'tandaSuaraOn', 'src':'images/animation_500_kdvpuxkb.gif', 'alt':'image', 'border':'0', 'visible':true, 'class':'ui-image'});

	this.tandaSuaraOn.name = "tandaSuaraOn";
	this.tandaSuaraOn.setTransform(849.1,42.1,0.4414,0.4414,0,0,0,50,45);

	this.hening = new lib.dsdsd();
	this.hening.name = "hening";
	this.hening.setTransform(919.4,48.7,0.7266,0.7266,0,0,0,-16.4,-1.2);
	new cjs.ButtonHelper(this.hening, 0, 1, 2, false, new lib.dsdsd(), 3);

	this.tandaSuaraOff = new lib.an_Image({'id': 'tandaSuaraOff', 'src':'images/animation_500_kdvpuxkb.gif', 'alt':'image', 'border':'0', 'visible':true, 'class':'ui-image'});

	this.tandaSuaraOff.name = "tandaSuaraOff";
	this.tandaSuaraOff.setTransform(849.4,42.1,0.4414,0.4414,0,0,0,50,45);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgOAUQgEgEAAgGQAAgHAFgDQAGgEAJAAIAIAAIAAgEQAAgEgDgCQgCgCgFgBQgDAAgDACQgDADAAACIgIAAQAAgDACgDQADgDAEgCQAEgCAEAAQAIAAAFAEQAEAEAAAHIAAAUQAAAGACAFIAAAAIgIAAIgBgFQgGAGgGAAQgHAAgFgEgAgKAJQAAAEACACQADACAEAAQACAAAEgCQADgCACgDIAAgKIgHAAQgNAAAAAJg");
	this.shape.setTransform(857.025,72.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgKAXIAAgtIAHAAIABAGQACgHAIAAIADABIAAAIIgEgBQgHAAgCAHIAAAfg");
	this.shape_1.setTransform(853.425,72.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgOAUQgEgEAAgGQAAgHAFgDQAGgEAJAAIAIAAIAAgEQAAgEgDgCQgCgCgFgBQgDAAgDACQgDADAAACIgIAAQAAgDACgDQADgDAEgCQAEgCAEAAQAIAAAFAEQAEAEAAAHIAAAUQAAAGACAFIAAAAIgIAAIgBgFQgGAGgGAAQgHAAgFgEgAgKAJQAAAEACACQADACAEAAQACAAAEgCQADgCACgDIAAgKIgHAAQgNAAAAAJg");
	this.shape_2.setTransform(849.325,72.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgNATQgEgEAAgJIAAgdIAHAAIAAAdQABALAIAAQAIAAAEgHIAAghIAHAAIAAAtIgHAAIAAgEQgFAGgIgBQgIABgDgFg");
	this.shape_3.setTransform(844.55,72.65);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgKAeQgFgDgDgEQgEgFAAgFIAIAAQAAAGAFADQAEADAGAAQAGAAAEgCQADgDAAgFQAAgEgDgDQgDgDgIgBQgKgEgFgDQgFgEABgHQAAgHAFgFQAGgFAJAAQAGAAAFACQAFADADAFQACAEAAAFIgIAAQAAgGgEgDQgDgEgGAAQgGABgDADQgEACAAAFQAAAEAEACQADADAHACQAIACAEACQAEACACAEQACAEAAAEQAAAIgFAEQgGAFgKAAQgGAAgFgCg");
	this.shape_4.setTransform(839.55,71.8);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3498DB").s().p("Aj8D9QhphpAAiUQAAiTBphqQBphoCTAAQCVAABoBoQBpBqAACTQAACUhpBpQhoBpiVAAQiTAAhphpg");
	this.shape_5.setTransform(849.3,47.85);

	this.instance = new lib.hehe();
	this.instance.setTransform(890.65,47.85,0.7683,1,0,0,0,86.1,35.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.tandaSuaraOff},{t:this.hening},{t:this.tandaSuaraOn},{t:this.nyala}]}).wait(1));

	// slide
	this.btnAwalNext = new lib.btnAwalNext();
	this.btnAwalNext.name = "btnAwalNext";
	this.btnAwalNext.setTransform(885.6,504.9);
	new cjs.ButtonHelper(this.btnAwalNext, 0, 1, 2, false, new lib.btnAwalNext(), 3);

	this.instance_1 = new lib.bgAwal();
	this.instance_1.setTransform(480.7,250.3,1,1,0,0,0,493.7,331.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.btnAwalNext}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(229.6,189,744.4,393);
// library properties:
lib.properties = {
	id: '4475E16EF2EF45498D57BB380ACA2BEB',
	width: 960,
	height: 540,
	fps: 24,
	color: "#2ECC71",
	opacity: 1.00,
	manifest: [
		{src:"images/Bitmap1.png?1597877572357", id:"Bitmap1"},
		{src:"images/Bitmap13.png?1597877572357", id:"Bitmap13"},
		{src:"images/bookpngcopy.png?1597877572357", id:"bookpngcopy"},
		{src:"sounds/musicBG.mp3?1597877572357", id:"musicBG"},
		{src:"components/lib/jquery-3.4.1.min.js?1597877572357", id:"lib/jquery-3.4.1.min.js"},
		{src:"components/sdk/anwidget.js?1597877572357", id:"sdk/anwidget.js"},
		{src:"components/ui/src/image.js?1597877572357", id:"an.Image"},
		{src:"components/ui/src/image.js?1597877572357", id:"an.Image"}
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
an.compositions['4475E16EF2EF45498D57BB380ACA2BEB'] = {
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