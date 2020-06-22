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



(lib._2 = function() {
	this.initialize(img._2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,681,451);


(lib.A = function() {
	this.initialize(img.A);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,613);


(lib.A_1 = function() {
	this.initialize(img.A_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,613);


(lib.B = function() {
	this.initialize(img.B);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,613);


(lib.Bitmap10 = function() {
	this.initialize(img.Bitmap10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,239,179);


(lib.Bitmap16 = function() {
	this.initialize(img.Bitmap16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,545);


(lib.Bitmap18 = function() {
	this.initialize(img.Bitmap18);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,545);


(lib.Bitmap22 = function() {
	this.initialize(img.Bitmap22);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,545);


(lib.Bitmap24 = function() {
	this.initialize(img.Bitmap24);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,545);


(lib.Bitmap26 = function() {
	this.initialize(img.Bitmap26);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,545);


(lib.BAseksual_ = function() {
	this.initialize(img.BAseksual_);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,681,451);


(lib.Bitmap6 = function() {
	this.initialize(img.Bitmap6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,270,170);


(lib.Bitmap7 = function() {
	this.initialize(img.Bitmap7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,78,106);


(lib.Bitmap5 = function() {
	this.initialize(img.Bitmap5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);


(lib.Bitmap9 = function() {
	this.initialize(img.Bitmap9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,89,107);


(lib.Bitmap8 = function() {
	this.initialize(img.Bitmap8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,89,105);


(lib.bookpngcopy = function() {
	this.initialize(img.bookpngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,399);


(lib.C = function() {
	this.initialize(img.C);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,613);


(lib.C_1 = function() {
	this.initialize(img.C_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,613);


(lib.D = function() {
	this.initialize(img.D);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,613);


(lib.DAseksual_ = function() {
	this.initialize(img.DAseksual_);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,681,451);


(lib.D_1 = function() {
	this.initialize(img.D_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,613);


(lib.B_1 = function() {
	this.initialize(img.B_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,613);


(lib.E = function() {
	this.initialize(img.E);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,613);


(lib.F = function() {
	this.initialize(img.F);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,613);


(lib.CAseksual_ = function() {
	this.initialize(img.CAseksual_);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,681,451);


(lib.G = function() {
	this.initialize(img.G);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,613);


(lib.AAseksual_ = function() {
	this.initialize(img.AAseksual_);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,681,451);


(lib.Judul = function() {
	this.initialize(img.Judul);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,613);


(lib.E_1 = function() {
	this.initialize(img.E_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,613);// helper functions:

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


(lib.Tween6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgGAGQgCgCAAgEQAAgCACgDQADgCADAAQAEAAADACQABADAAACQAAAEgBACQgDACgEAAQgDAAgDgCg");
	this.shape.setTransform(350.7,8.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_1.setTransform(344.675,5.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_2.setTransform(338.4,5.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_3.setTransform(331.375,5.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgUAvIgBAJIgMAAIAAhwIAOAAIAAAqQAIgKANAAQAPAAAIALQAJALgBARIAAACQABASgJALQgJALgOAAQgNAAgJgKgAgTgBIAAAiQAGAMANAAQAJABAFgIQAGgHAAgQQAAgNgGgHQgFgHgJAAQgOgBgFAMg");
	this.shape_4.setTransform(323.3,3.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_5.setTransform(311.075,5.175);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgYAtQgJgKAAgTIAAgBQAAgRAJgLQAJgLAOAAQAMAAAJAKIAAgqIAOAAIAABwIgNAAIgBgJQgIAKgNAAQgOAAgJgMgAgNgFQgGAHAAAPQAAANAGAIQAFAIAJgBQANABAGgMIAAgkQgHgLgMABQgJAAgFAHg");
	this.shape_6.setTransform(302.55,3.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_7.setTransform(296.7,3.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgEAoIgdhOIAOAAIATA7IAUg7IAOAAIgdBOg");
	this.shape_8.setTransform(291.225,5.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_9.setTransform(285.8,3.65);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgYAtQgIgKAAgTIAAgBQAAgRAIgLQAIgLAOAAQAOAAAIAKIAAgqIANAAIAABwIgMAAIgBgJQgIAKgOAAQgNAAgJgMgAgNgFQgGAHAAAPQAAANAGAIQAFAIAJgBQANABAGgMIAAgkQgGgLgNABQgJAAgFAHg");
	this.shape_10.setTransform(279.55,3.5);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_11.setTransform(271.35,5.025);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_12.setTransform(265.4,3.65);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_13.setTransform(258.05,3.65);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgYAtQgJgKABgTIAAgBQgBgRAJgLQAJgLAOAAQAMAAAJAKIAAgqIANAAIAABwIgMAAIgBgJQgIAKgNAAQgOAAgJgMgAgNgFQgGAHAAAPQAAANAGAIQAFAIAJgBQANABAGgMIAAgkQgGgLgNABQgJAAgFAHg");
	this.shape_14.setTransform(251.8,3.5);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_15.setTransform(243.675,5.1);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgOBEIAAgKIAGAAQAFAAACgCQABgDAAgGIAAhXIAOAAIAABXQAAAXgUAAQgEAAgEgCgAABg4QgBgCAAgDQAAgDABgDQACgCAEAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgEgBgCgCg");
	this.shape_16.setTransform(237.025,5.25);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AASAoIAAgzQgBgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_17.setTransform(231.85,5.025);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgXAfQgKgLABgSIAAgCQAAgLAEgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAIQAIAHAIAAQAIAAAEgDQAGgDADgFIAIAHQgJAPgVAAQgOAAgLgKgAgMgXQgGAGAAAKIAmAAIAAgBQAAgKgGgGQgEgFgJAAQgHAAgGAGg");
	this.shape_18.setTransform(223.85,5.1);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_19.setTransform(213.225,5.025);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_20.setTransform(198.875,5.1);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgFgHIAHgIQAKALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgIAJgOAAQgOAAgIgLQgIgLAAgTQAAgSAIgLQAJgLAOAAQANAAAJAKIAAgIIAMAAIAABMQAAAPgJAJQgJAJgPAAQgIAAgIgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgIAAgGAHg");
	this.shape_21.setTransform(190.45,6.575);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgFgHIAIgIQAIALANAAQAJAAAGgGQAFgFAAgKIAAgHQgJAJgMAAQgOAAgJgLQgJgLABgTQgBgSAJgLQAIgLAPAAQAOAAAIAKIAAgIIAMAAIAABMQABAPgKAJQgJAJgPAAQgHAAgJgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgJAAgFAHg");
	this.shape_22.setTransform(182.05,6.575);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_23.setTransform(173.85,5.025);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_24.setTransform(167.9,3.65);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AASA4IAAg0QAAgIgFgEQgDgEgJAAQgFAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLANAAQAZAAAAAbIAAA0g");
	this.shape_25.setTransform(161.95,3.425);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgXAfQgJgLgBgSIAAgCQAAgLAFgJQAFgKAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAIQAHAHAIAAQAHAAAGgDQAEgDAEgFIAJAHQgKAPgVAAQgPAAgKgKgAgMgXQgFAGgBAKIAmAAIAAgBQAAgKgFgGQgGgFgIAAQgHAAgGAGg");
	this.shape_26.setTransform(153.95,5.1);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgPAlQgHgDgEgGQgFgGAAgHIAOAAQAAAHAFAEQAGAEAHAAQAIAAAEgDQAFgEAAgFQAAgFgEgDQgFgDgJgCQgKgCgGgDQgGgDgDgEQgDgEAAgGQAAgJAIgIQAJgGAMAAQANAAAIAGQAJAIgBAKIgNAAQAAgFgFgEQgFgEgGAAQgHAAgEADQgEAEgBAEQAAAFAEADQAFADAJABQAKADAGADQAHADADAEQACAEAAAGQAAALgIAHQgJAGgNAAQgIAAgIgEg");
	this.shape_27.setTransform(146,5.1);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgSBFQALgJAHgRQAGgTAAgWIAAgCQAAgPgEgNQgCgNgGgLQgFgKgHgGIACgIQAKAFAIANQAJAMAEAPQAEAPAAAQQAAARgEAPQgEAOgJAOQgIAMgKAGg");
	this.shape_28.setTransform(135.475,4.75);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIANAAIAAAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_29.setTransform(129.1,5.025);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgZAeQgKgMAAgSIAAAAQAAgLAFgKQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAAMgEAJQgFAIgIAGQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgJAAgNQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_30.setTransform(120.675,5.1);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_31.setTransform(114.6,3.65);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgPAlQgIgDgDgGQgEgGgBgHIAOAAQAAAHAGAEQAEAEAIAAQAHAAAFgDQAFgEAAgFQAAgFgEgDQgEgDgKgCQgKgCgGgDQgGgDgDgEQgDgEAAgGQAAgJAJgIQAHgGANAAQANAAAIAGQAIAIAAAKIgNAAQAAgFgFgEQgEgEgHAAQgHAAgEADQgEAEgBAEQAAAFAFADQADADAJABQALADAGADQAGADADAEQADAEAAAGQABALgJAHQgJAGgNAAQgJAAgHgEg");
	this.shape_32.setTransform(108.85,5.1);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgPAlQgIgDgDgGQgFgGAAgHIAOAAQAAAHAFAEQAGAEAHAAQAIAAAEgDQAFgEAAgFQAAgFgEgDQgEgDgKgCQgKgCgGgDQgGgDgDgEQgDgEAAgGQAAgJAJgIQAHgGANAAQANAAAIAGQAJAIgBAKIgNAAQAAgFgFgEQgFgEgGAAQgHAAgEADQgEAEgBAEQAAAFAFADQADADAJABQALADAGADQAHADACAEQADAEAAAGQABALgJAHQgJAGgNAAQgIAAgIgEg");
	this.shape_33.setTransform(101.1,5.1);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_34.setTransform(95.45,3.65);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgLA5IAAhEIgMAAIAAgKIAMAAIAAgJQABgMAGgHQAGgHAMAAIAKABIgBALIgIAAQgGAAgEADQgDAEAAAHIAAAJIARAAIAAAKIgRAAIAABEg");
	this.shape_35.setTransform(91.25,3.35);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgBA8QgRgZAAgjQgBgQAFgPQAEgQAKgMQAHgMAKgFIADAJQgLAIgHAQQgGASgBAVIAAAEQAAAdAJAVQAHAMAJAHIgDAJQgKgGgIgMg");
	this.shape_36.setTransform(86.15,4.75);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgEgHIAHgIQAJALAMAAQAJAAAGgGQAFgFAAgKIAAgHQgJAJgMAAQgPAAgIgLQgJgLAAgTQAAgSAJgLQAIgLAPAAQAOAAAHAKIABgIIANAAIAABMQgBAPgIAJQgKAJgPAAQgIAAgIgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgIAAgHAHg");
	this.shape_37.setTransform(75.2,6.575);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIANAAIAAAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_38.setTransform(67,5.025);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_39.setTransform(58.775,5.1);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgCAsQgEgFAAgKIAAgwIgPAAIAAgKIAPAAIAAgUIAMAAIAAAUIAPAAIAAAKIgPAAIAAAwQAAAEACADQACACAFAAIAHgBIAAAMIgLABQgJAAgEgGg");
	this.shape_40.setTransform(52.075,4.2);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_41.setTransform(45.7,5.025);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_42.setTransform(39.75,3.65);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_43.setTransform(36.075,3.425);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgWAfQgKgLAAgSIAAgCQgBgLAFgJQAFgKAHgFQAIgFAJAAQAPAAAJAKQAIAKABATIAAAFIg1AAQAAALAHAIQAGAHAKAAQAHAAAFgDQAEgDAEgFIAJAHQgLAPgTAAQgQAAgJgKgAgMgXQgFAGgCAKIAnAAIAAgBQgBgKgEgGQgFgFgJAAQgHAAgGAGg");
	this.shape_44.setTransform(30.4,5.1);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_45.setTransform(19.775,5.025);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgJAAQgFAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_46.setTransform(394.05,-22.975);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_47.setTransform(385.825,-22.9);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AASA4IAAg0QgBgIgEgEQgDgEgIAAQgGAAgFAEQgFADgCAFIAAA4IgOAAIAAhvIAOAAIAAArQAIgLANAAQAaAAAAAbIAAA0g");
	this.shape_48.setTransform(377.65,-24.575);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_49.setTransform(369.425,-22.9);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AARA4IAAg0QAAgIgDgEQgEgEgIAAQgGAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLAMAAQAaAAAAAbIAAA0g");
	this.shape_50.setTransform(361.25,-24.575);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_51.setTransform(353.025,-22.9);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_52.setTransform(347.125,-24.575);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgWAeQgKgKAAgSIAAgCQgBgLAFgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAHAIQAGAHAKAAQAGAAAFgDQAFgDAEgFIAIAHQgKAPgTAAQgQAAgJgLgAgMgXQgGAGgBAKIAnAAIAAgBQgBgKgFgGQgEgFgJAAQgHAAgGAGg");
	this.shape_53.setTransform(341.45,-22.9);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgTAuIgBAJIgNAAIAAhvIAOAAIAAAqQAIgKANAAQAPAAAIALQAJAKAAASIAAACQAAASgJALQgIALgPAAQgOAAgHgLgAgTgBIAAAiQAGAMANAAQAJABAGgIQAFgHAAgQQAAgNgFgHQgGgHgJAAQgNgBgGAMg");
	this.shape_54.setTransform(333.4,-24.5);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_55.setTransform(322.425,-22.975);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgWAeQgLgKAAgSIAAgCQAAgLAFgJQAFgKAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAIQAGAHAKAAQAHAAAFgDQAEgDAEgFIAJAHQgKAPgVAAQgPAAgJgLgAgMgXQgFAGgCAKIAnAAIAAgBQgBgKgEgGQgGgFgIAAQgHAAgGAGg");
	this.shape_56.setTransform(312,-22.9);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AggA3IAAhsIAMAAIABAIQAIgKAOAAQAOAAAIALQAIALAAATIAAACQAAAQgIAMQgIALgOgBQgOABgIgKIAAAmgAgTghIAAAmQAGAKANABQAIAAAGgJQAGgHAAgPQAAgNgGgIQgGgHgIAAQgNAAgGAKg");
	this.shape_57.setTransform(303.925,-21.45);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_58.setTransform(286.2,-22.975);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_59.setTransform(277.975,-22.9);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_60.setTransform(270.625,-24.575);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_61.setTransform(262.175,-22.825);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_62.setTransform(254.775,-24.575);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_63.setTransform(246.375,-22.9);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_64.setTransform(240.475,-24.575);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgWAeQgKgKAAgSIAAgCQgBgLAFgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAHAIQAGAHAKAAQAGAAAFgDQAFgDAEgFIAJAHQgLAPgTAAQgQAAgJgLgAgMgXQgGAGgBAKIAnAAIAAgBQgBgKgFgGQgEgFgJAAQgHAAgGAGg");
	this.shape_65.setTransform(234.8,-22.9);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_66.setTransform(224.175,-22.975);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_67.setTransform(206.6,-24.35);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgIAAQgGAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_68.setTransform(200.6,-22.975);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_69.setTransform(194.65,-24.35);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgIAAQgGAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_70.setTransform(179.45,-22.975);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_71.setTransform(171.225,-22.9);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AATAnIgTg6IgSA6IgLAAIgXhNIAOAAIAPA5IASg5IALAAIATA7IAOg7IAOAAIgXBNg");
	this.shape_72.setTransform(161.5,-22.9);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgXAeQgJgKgBgSIAAgCQABgLAEgJQAFgKAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAGAIQAIAHAIAAQAHAAAGgDQAFgDADgFIAJAHQgKAPgVAAQgOAAgLgLgAgMgXQgFAGgBAKIAmAAIAAgBQAAgKgFgGQgGgFgIAAQgHAAgGAGg");
	this.shape_73.setTransform(152.05,-22.9);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AARA4IAAg0QAAgIgDgEQgEgEgIAAQgGAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLAMAAQAaAAAAAbIAAA0g");
	this.shape_74.setTransform(143.9,-24.575);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgJANQAHgJAAgKIAAgLIAMAAIAAAKQAAAHgDAHQgEAHgEAFg");
	this.shape_75.setTransform(128.825,-18.7);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_76.setTransform(125.775,-24.575);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_77.setTransform(119.875,-22.9);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_78.setTransform(111.675,-22.825);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgPAlQgIgDgEgGQgDgGAAgHIANAAQAAAHAGAEQAEAEAIAAQAHAAAGgDQAEgEAAgFQAAgFgEgDQgEgDgKgCQgKgDgGgCQgGgCgDgFQgDgEAAgGQAAgJAJgIQAHgGAMAAQAOAAAJAGQAHAHABALIgOAAQAAgFgEgEQgGgEgHAAQgGAAgEADQgFAEAAAEQABAFAEADQAEADAIABQALADAGADQAGADADAEQAEAEAAAGQAAALgJAHQgIAGgOAAQgJAAgHgEg");
	this.shape_79.setTransform(103.65,-22.9);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_80.setTransform(96.525,-24.575);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgWAeQgLgKAAgSIAAgCQAAgLAFgJQAFgKAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAIQAGAHAKAAQAHAAAFgDQAEgDAEgFIAJAHQgKAPgVAAQgPAAgJgLgAgMgXQgFAGgBAKIAmAAIAAgBQgBgKgEgGQgGgFgIAAQgHAAgGAGg");
	this.shape_81.setTransform(88.35,-22.9);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgPAlQgIgDgDgGQgFgGAAgHIAOAAQAAAHAFAEQAGAEAHAAQAIAAAEgDQAFgEAAgFQAAgFgEgDQgEgDgKgCQgKgDgGgCQgGgCgDgFQgDgEAAgGQAAgJAJgIQAHgGANAAQANAAAIAGQAJAHgBALIgNAAQAAgFgFgEQgFgEgGAAQgHAAgEADQgEAEgBAEQAAAFAFADQADADAJABQALADAGADQAHADACAEQADAEAAAGQABALgJAHQgJAGgNAAQgIAAgIgEg");
	this.shape_82.setTransform(80.4,-22.9);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_83.setTransform(72.475,-22.9);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_84.setTransform(55.125,-22.9);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_85.setTransform(48.9,-22.975);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_86.setTransform(41.875,-22.9);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AgXAeQgKgKABgUIAAAAQAAgMAEgJQAEgKAIgEQAIgFAKAAQANAAAJAIQAJAIAAANIgNAAQAAgIgFgFQgGgFgHAAQgJAAgGAIQgGAHABAOIAAABQgBAOAGAIQAGAHAJAAQAIAAAEgEQAGgFAAgGIANAAQAAAHgEAFQgFAHgGADQgIAEgIAAQgPAAgKgLg");
	this.shape_87.setTransform(33.95,-22.9);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AgWAeQgLgKABgSIAAgCQgBgLAFgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAGAIQAIAHAJAAQAGAAAFgDQAFgDAEgFIAIAHQgKAPgTAAQgPAAgKgLgAgMgXQgGAGgBAKIAnAAIAAgBQgBgKgFgGQgEgFgJAAQgHAAgGAGg");
	this.shape_88.setTransform(26.1,-22.9);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgSAzQgKgFgFgHQgFgHAAgKIAOAAQAAAKAHAGQAIAFAKAAQAMAAAGgEQAFgFAAgIQAAgIgFgEQgGgEgNgEQgSgFgIgHQgJgIAAgLQAAgMALgJQAKgIAPAAQALAAAIAEQAJAFAFAHQAEAIAAAIIgOAAQAAgJgGgGQgGgFgLAAQgKAAgFAEQgGAFAAAIQAAAHAFAEQAGAFAMADQANAEAIAEQAHAEAEAGQAEAGAAAIQAAANgLAIQgKAIgRAAQgKAAgJgEg");
	this.shape_89.setTransform(17.675,-24.275);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFF83").s().p("AgPCFIAAkJIAfAAIAAEJg");
	this.shape_90.setTransform(67.65,-180.4);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFF83").s().p("Ag7BSQgRgQAAgYQAAgeAWgPQAWgQAoAAIAfAAIAAgPQAAgQgKgKQgKgKgTAAQgRAAgMAIQgLAJAAAMIghAAQAAgOALgNQAJgNASgIQARgHATAAQAgAAATAQQASAQABAdIAABVQAAAaAGAPIAAADIghAAQgDgGgCgOQgWAXgeAAQgcAAgSgPgAgsAlQAAAPAKAJQAKAIAQAAQAOAAANgHQAOgIAGgNIAAgmIgZAAQg6AAAAAig");
	this.shape_91.setTransform(53.675,-176.475);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFF83").s().p("Ag5BOQgQgSAAghIAAh6IAgAAIAAB4QAAAsAjgBQAkABAMgcIAAiIIAgAAIAAC7IgfAAIAAgSQgTAVgjAAQgeAAgQgRg");
	this.shape_92.setTransform(34.275,-176.3);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFF83").s().p("AglBZQgRgIgKgOQgJgOgBgRIAhAAQAAAQAMAKQANAJASAAQATAAAKgHQAMgIgBgMQAAgNgJgHQgKgHgYgGQgYgFgOgGQgPgHgGgKQgHgKAAgOQAAgXATgQQAUgQAdAAQAgAAAUAQQAUARAAAZIggAAQAAgNgLgJQgMgKgRAAQgQAAgKAIQgKAHAAANQAAALAJAGQAJAGAXAFQAZAGAOAHQAPAHAHAKQAIALAAAPQgBAZgTAPQgUAPghAAQgVAAgSgIg");
	this.shape_93.setTransform(15.3,-176.475);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFF83").s().p("AAoCFIhAhXIgUAVIAABCIghAAIAAkJIAhAAIAACgIARgVIA5g9IAnAAIhIBOIBQBtg");
	this.shape_94.setTransform(-1.6,-180.4);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFF83").s().p("Ag2BIQgYgZAAgqIAAgFQgBgcALgVQALgWATgNQATgMAVAAQAlAAAUAYQAVAYAAAtIAAAMIh/AAQACAcAPARQAPARAYAAQAQAAAMgHQAMgHAIgLIAUAPQgXAkgwAAQgkAAgYgZgAgdg4QgNAOgDAaIBcAAIAAgDQgBgYgLgNQgNgOgUAAQgSAAgNAOg");
	this.shape_95.setTransform(-20.95,-176.475);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFF83").s().p("AgkBZQgSgIgJgOQgKgOAAgRIAfAAQACAQAMAKQALAJATAAQATAAAKgHQAMgIAAgMQAAgNgKgHQgKgHgXgGQgZgFgOgGQgPgHgGgKQgHgKAAgOQAAgXATgQQAUgQAdAAQAgAAAUAQQAUARAAAZIghAAQAAgNgLgJQgLgKgRAAQgRAAgJAIQgKAHAAANQAAALAJAGQAKAGAXAFQAXAGAPAHQAPAHAHAKQAIALgBAPQAAAZgTAPQgVAPggAAQgWAAgQgIg");
	this.shape_96.setTransform(-39.75,-176.475);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFF83").s().p("ABMB+IgYhCIhoAAIgYBCIgiAAIBgj7IAcAAIBhD7gAgqAhIBVAAIgrh1g");
	this.shape_97.setTransform(-60.3,-179.725);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#603AD8").s().p("EhB5AkpMAAAhJRMCDzAAAMAAABJRg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-421.8,-234.5,843.6,469.1);


(lib.Tween5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgGAGQgCgCAAgEQAAgCACgDQADgCADAAQAEAAADACQABADAAACQAAAEgBACQgDACgEAAQgDAAgDgCg");
	this.shape.setTransform(350.7,8.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_1.setTransform(344.675,5.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_2.setTransform(338.4,5.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_3.setTransform(331.375,5.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgUAvIgBAJIgMAAIAAhwIAOAAIAAAqQAIgKANAAQAPAAAIALQAJALgBARIAAACQABASgJALQgJALgOAAQgNAAgJgKgAgTgBIAAAiQAGAMANAAQAJABAFgIQAGgHAAgQQAAgNgGgHQgFgHgJAAQgOgBgFAMg");
	this.shape_4.setTransform(323.3,3.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_5.setTransform(311.075,5.175);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgYAtQgJgKAAgTIAAgBQAAgRAJgLQAJgLAOAAQAMAAAJAKIAAgqIAOAAIAABwIgNAAIgBgJQgIAKgNAAQgOAAgJgMgAgNgFQgGAHAAAPQAAANAGAIQAFAIAJgBQANABAGgMIAAgkQgHgLgMABQgJAAgFAHg");
	this.shape_6.setTransform(302.55,3.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_7.setTransform(296.7,3.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgEAoIgdhOIAOAAIATA7IAUg7IAOAAIgdBOg");
	this.shape_8.setTransform(291.225,5.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_9.setTransform(285.8,3.65);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgYAtQgIgKAAgTIAAgBQAAgRAIgLQAIgLAOAAQAOAAAIAKIAAgqIANAAIAABwIgMAAIgBgJQgIAKgOAAQgNAAgJgMgAgNgFQgGAHAAAPQAAANAGAIQAFAIAJgBQANABAGgMIAAgkQgGgLgNABQgJAAgFAHg");
	this.shape_10.setTransform(279.55,3.5);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_11.setTransform(271.35,5.025);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_12.setTransform(265.4,3.65);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_13.setTransform(258.05,3.65);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgYAtQgJgKABgTIAAgBQgBgRAJgLQAJgLAOAAQAMAAAJAKIAAgqIANAAIAABwIgMAAIgBgJQgIAKgNAAQgOAAgJgMgAgNgFQgGAHAAAPQAAANAGAIQAFAIAJgBQANABAGgMIAAgkQgGgLgNABQgJAAgFAHg");
	this.shape_14.setTransform(251.8,3.5);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_15.setTransform(243.675,5.1);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgOBEIAAgKIAGAAQAFAAACgCQABgDAAgGIAAhXIAOAAIAABXQAAAXgUAAQgEAAgEgCgAABg4QgBgCAAgDQAAgDABgDQACgCAEAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgEgBgCgCg");
	this.shape_16.setTransform(237.025,5.25);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AASAoIAAgzQgBgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_17.setTransform(231.85,5.025);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgXAfQgKgLABgSIAAgCQAAgLAEgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAIQAIAHAIAAQAIAAAEgDQAGgDADgFIAIAHQgJAPgVAAQgOAAgLgKgAgMgXQgGAGAAAKIAmAAIAAgBQAAgKgGgGQgEgFgJAAQgHAAgGAGg");
	this.shape_18.setTransform(223.85,5.1);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_19.setTransform(213.225,5.025);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_20.setTransform(198.875,5.1);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgFgHIAHgIQAKALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgIAJgOAAQgOAAgIgLQgIgLAAgTQAAgSAIgLQAJgLAOAAQANAAAJAKIAAgIIAMAAIAABMQAAAPgJAJQgJAJgPAAQgIAAgIgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgIAAgGAHg");
	this.shape_21.setTransform(190.45,6.575);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgFgHIAIgIQAIALANAAQAJAAAGgGQAFgFAAgKIAAgHQgJAJgMAAQgOAAgJgLQgJgLABgTQgBgSAJgLQAIgLAPAAQAOAAAIAKIAAgIIAMAAIAABMQABAPgKAJQgJAJgPAAQgHAAgJgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgJAAgFAHg");
	this.shape_22.setTransform(182.05,6.575);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_23.setTransform(173.85,5.025);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_24.setTransform(167.9,3.65);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AASA4IAAg0QAAgIgFgEQgDgEgJAAQgFAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLANAAQAZAAAAAbIAAA0g");
	this.shape_25.setTransform(161.95,3.425);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgXAfQgJgLgBgSIAAgCQAAgLAFgJQAFgKAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAIQAHAHAIAAQAHAAAGgDQAEgDAEgFIAJAHQgKAPgVAAQgPAAgKgKgAgMgXQgFAGgBAKIAmAAIAAgBQAAgKgFgGQgGgFgIAAQgHAAgGAGg");
	this.shape_26.setTransform(153.95,5.1);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgPAlQgHgDgEgGQgFgGAAgHIAOAAQAAAHAFAEQAGAEAHAAQAIAAAEgDQAFgEAAgFQAAgFgEgDQgFgDgJgCQgKgCgGgDQgGgDgDgEQgDgEAAgGQAAgJAIgIQAJgGAMAAQANAAAIAGQAJAIgBAKIgNAAQAAgFgFgEQgFgEgGAAQgHAAgEADQgEAEgBAEQAAAFAEADQAFADAJABQAKADAGADQAHADADAEQACAEAAAGQAAALgIAHQgJAGgNAAQgIAAgIgEg");
	this.shape_27.setTransform(146,5.1);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgSBFQALgJAHgRQAGgTAAgWIAAgCQAAgPgEgNQgCgNgGgLQgFgKgHgGIACgIQAKAFAIANQAJAMAEAPQAEAPAAAQQAAARgEAPQgEAOgJAOQgIAMgKAGg");
	this.shape_28.setTransform(135.475,4.75);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIANAAIAAAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_29.setTransform(129.1,5.025);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgZAeQgKgMAAgSIAAAAQAAgLAFgKQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAAMgEAJQgFAIgIAGQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgJAAgNQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_30.setTransform(120.675,5.1);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_31.setTransform(114.6,3.65);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgPAlQgIgDgDgGQgEgGgBgHIAOAAQAAAHAGAEQAEAEAIAAQAHAAAFgDQAFgEAAgFQAAgFgEgDQgEgDgKgCQgKgCgGgDQgGgDgDgEQgDgEAAgGQAAgJAJgIQAHgGANAAQANAAAIAGQAIAIAAAKIgNAAQAAgFgFgEQgEgEgHAAQgHAAgEADQgEAEgBAEQAAAFAFADQADADAJABQALADAGADQAGADADAEQADAEAAAGQABALgJAHQgJAGgNAAQgJAAgHgEg");
	this.shape_32.setTransform(108.85,5.1);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgPAlQgIgDgDgGQgFgGAAgHIAOAAQAAAHAFAEQAGAEAHAAQAIAAAEgDQAFgEAAgFQAAgFgEgDQgEgDgKgCQgKgCgGgDQgGgDgDgEQgDgEAAgGQAAgJAJgIQAHgGANAAQANAAAIAGQAJAIgBAKIgNAAQAAgFgFgEQgFgEgGAAQgHAAgEADQgEAEgBAEQAAAFAFADQADADAJABQALADAGADQAHADACAEQADAEAAAGQABALgJAHQgJAGgNAAQgIAAgIgEg");
	this.shape_33.setTransform(101.1,5.1);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_34.setTransform(95.45,3.65);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgLA5IAAhEIgMAAIAAgKIAMAAIAAgJQABgMAGgHQAGgHAMAAIAKABIgBALIgIAAQgGAAgEADQgDAEAAAHIAAAJIARAAIAAAKIgRAAIAABEg");
	this.shape_35.setTransform(91.25,3.35);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgBA8QgRgZAAgjQgBgQAFgPQAEgQAKgMQAHgMAKgFIADAJQgLAIgHAQQgGASgBAVIAAAEQAAAdAJAVQAHAMAJAHIgDAJQgKgGgIgMg");
	this.shape_36.setTransform(86.15,4.75);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgEgHIAHgIQAJALAMAAQAJAAAGgGQAFgFAAgKIAAgHQgJAJgMAAQgPAAgIgLQgJgLAAgTQAAgSAJgLQAIgLAPAAQAOAAAHAKIABgIIANAAIAABMQgBAPgIAJQgKAJgPAAQgIAAgIgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgIAAgHAHg");
	this.shape_37.setTransform(75.2,6.575);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIANAAIAAAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_38.setTransform(67,5.025);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_39.setTransform(58.775,5.1);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgCAsQgEgFAAgKIAAgwIgPAAIAAgKIAPAAIAAgUIAMAAIAAAUIAPAAIAAAKIgPAAIAAAwQAAAEACADQACACAFAAIAHgBIAAAMIgLABQgJAAgEgGg");
	this.shape_40.setTransform(52.075,4.2);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_41.setTransform(45.7,5.025);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_42.setTransform(39.75,3.65);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_43.setTransform(36.075,3.425);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgWAfQgKgLAAgSIAAgCQgBgLAFgJQAFgKAHgFQAIgFAJAAQAPAAAJAKQAIAKABATIAAAFIg1AAQAAALAHAIQAGAHAKAAQAHAAAFgDQAEgDAEgFIAJAHQgLAPgTAAQgQAAgJgKgAgMgXQgFAGgCAKIAnAAIAAgBQgBgKgEgGQgFgFgJAAQgHAAgGAGg");
	this.shape_44.setTransform(30.4,5.1);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_45.setTransform(19.775,5.025);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgJAAQgFAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_46.setTransform(394.05,-22.975);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_47.setTransform(385.825,-22.9);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AASA4IAAg0QgBgIgEgEQgDgEgIAAQgGAAgFAEQgFADgCAFIAAA4IgOAAIAAhvIAOAAIAAArQAIgLANAAQAaAAAAAbIAAA0g");
	this.shape_48.setTransform(377.65,-24.575);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_49.setTransform(369.425,-22.9);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AARA4IAAg0QAAgIgDgEQgEgEgIAAQgGAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLAMAAQAaAAAAAbIAAA0g");
	this.shape_50.setTransform(361.25,-24.575);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_51.setTransform(353.025,-22.9);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_52.setTransform(347.125,-24.575);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgWAeQgKgKAAgSIAAgCQgBgLAFgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAHAIQAGAHAKAAQAGAAAFgDQAFgDAEgFIAIAHQgKAPgTAAQgQAAgJgLgAgMgXQgGAGgBAKIAnAAIAAgBQgBgKgFgGQgEgFgJAAQgHAAgGAGg");
	this.shape_53.setTransform(341.45,-22.9);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgTAuIgBAJIgNAAIAAhvIAOAAIAAAqQAIgKANAAQAPAAAIALQAJAKAAASIAAACQAAASgJALQgIALgPAAQgOAAgHgLgAgTgBIAAAiQAGAMANAAQAJABAGgIQAFgHAAgQQAAgNgFgHQgGgHgJAAQgNgBgGAMg");
	this.shape_54.setTransform(333.4,-24.5);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_55.setTransform(322.425,-22.975);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgWAeQgLgKAAgSIAAgCQAAgLAFgJQAFgKAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAIQAGAHAKAAQAHAAAFgDQAEgDAEgFIAJAHQgKAPgVAAQgPAAgJgLgAgMgXQgFAGgCAKIAnAAIAAgBQgBgKgEgGQgGgFgIAAQgHAAgGAGg");
	this.shape_56.setTransform(312,-22.9);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AggA3IAAhsIAMAAIABAIQAIgKAOAAQAOAAAIALQAIALAAATIAAACQAAAQgIAMQgIALgOgBQgOABgIgKIAAAmgAgTghIAAAmQAGAKANABQAIAAAGgJQAGgHAAgPQAAgNgGgIQgGgHgIAAQgNAAgGAKg");
	this.shape_57.setTransform(303.925,-21.45);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_58.setTransform(286.2,-22.975);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_59.setTransform(277.975,-22.9);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_60.setTransform(270.625,-24.575);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_61.setTransform(262.175,-22.825);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_62.setTransform(254.775,-24.575);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_63.setTransform(246.375,-22.9);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_64.setTransform(240.475,-24.575);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgWAeQgKgKAAgSIAAgCQgBgLAFgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAHAIQAGAHAKAAQAGAAAFgDQAFgDAEgFIAJAHQgLAPgTAAQgQAAgJgLgAgMgXQgGAGgBAKIAnAAIAAgBQgBgKgFgGQgEgFgJAAQgHAAgGAGg");
	this.shape_65.setTransform(234.8,-22.9);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_66.setTransform(224.175,-22.975);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_67.setTransform(206.6,-24.35);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgIAAQgGAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_68.setTransform(200.6,-22.975);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_69.setTransform(194.65,-24.35);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgIAAQgGAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_70.setTransform(179.45,-22.975);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_71.setTransform(171.225,-22.9);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AATAnIgTg6IgSA6IgLAAIgXhNIAOAAIAPA5IASg5IALAAIATA7IAOg7IAOAAIgXBNg");
	this.shape_72.setTransform(161.5,-22.9);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgXAeQgJgKgBgSIAAgCQABgLAEgJQAFgKAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAGAIQAIAHAIAAQAHAAAGgDQAFgDADgFIAJAHQgKAPgVAAQgOAAgLgLgAgMgXQgFAGgBAKIAmAAIAAgBQAAgKgFgGQgGgFgIAAQgHAAgGAGg");
	this.shape_73.setTransform(152.05,-22.9);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AARA4IAAg0QAAgIgDgEQgEgEgIAAQgGAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLAMAAQAaAAAAAbIAAA0g");
	this.shape_74.setTransform(143.9,-24.575);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgJANQAHgJAAgKIAAgLIAMAAIAAAKQAAAHgDAHQgEAHgEAFg");
	this.shape_75.setTransform(128.825,-18.7);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_76.setTransform(125.775,-24.575);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_77.setTransform(119.875,-22.9);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_78.setTransform(111.675,-22.825);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgPAlQgIgDgEgGQgDgGAAgHIANAAQAAAHAGAEQAEAEAIAAQAHAAAGgDQAEgEAAgFQAAgFgEgDQgEgDgKgCQgKgDgGgCQgGgCgDgFQgDgEAAgGQAAgJAJgIQAHgGAMAAQAOAAAJAGQAHAHABALIgOAAQAAgFgEgEQgGgEgHAAQgGAAgEADQgFAEAAAEQABAFAEADQAEADAIABQALADAGADQAGADADAEQAEAEAAAGQAAALgJAHQgIAGgOAAQgJAAgHgEg");
	this.shape_79.setTransform(103.65,-22.9);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_80.setTransform(96.525,-24.575);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgWAeQgLgKAAgSIAAgCQAAgLAFgJQAFgKAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAIQAGAHAKAAQAHAAAFgDQAEgDAEgFIAJAHQgKAPgVAAQgPAAgJgLgAgMgXQgFAGgBAKIAmAAIAAgBQgBgKgEgGQgGgFgIAAQgHAAgGAGg");
	this.shape_81.setTransform(88.35,-22.9);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgPAlQgIgDgDgGQgFgGAAgHIAOAAQAAAHAFAEQAGAEAHAAQAIAAAEgDQAFgEAAgFQAAgFgEgDQgEgDgKgCQgKgDgGgCQgGgCgDgFQgDgEAAgGQAAgJAJgIQAHgGANAAQANAAAIAGQAJAHgBALIgNAAQAAgFgFgEQgFgEgGAAQgHAAgEADQgEAEgBAEQAAAFAFADQADADAJABQALADAGADQAHADACAEQADAEAAAGQABALgJAHQgJAGgNAAQgIAAgIgEg");
	this.shape_82.setTransform(80.4,-22.9);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_83.setTransform(72.475,-22.9);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_84.setTransform(55.125,-22.9);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_85.setTransform(48.9,-22.975);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_86.setTransform(41.875,-22.9);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AgXAeQgKgKABgUIAAAAQAAgMAEgJQAEgKAIgEQAIgFAKAAQANAAAJAIQAJAIAAANIgNAAQAAgIgFgFQgGgFgHAAQgJAAgGAIQgGAHABAOIAAABQgBAOAGAIQAGAHAJAAQAIAAAEgEQAGgFAAgGIANAAQAAAHgEAFQgFAHgGADQgIAEgIAAQgPAAgKgLg");
	this.shape_87.setTransform(33.95,-22.9);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AgWAeQgLgKABgSIAAgCQgBgLAFgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAGAIQAIAHAJAAQAGAAAFgDQAFgDAEgFIAIAHQgKAPgTAAQgPAAgKgLgAgMgXQgGAGgBAKIAnAAIAAgBQgBgKgFgGQgEgFgJAAQgHAAgGAGg");
	this.shape_88.setTransform(26.1,-22.9);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgSAzQgKgFgFgHQgFgHAAgKIAOAAQAAAKAHAGQAIAFAKAAQAMAAAGgEQAFgFAAgIQAAgIgFgEQgGgEgNgEQgSgFgIgHQgJgIAAgLQAAgMALgJQAKgIAPAAQALAAAIAEQAJAFAFAHQAEAIAAAIIgOAAQAAgJgGgGQgGgFgLAAQgKAAgFAEQgGAFAAAIQAAAHAFAEQAGAFAMADQANAEAIAEQAHAEAEAGQAEAGAAAIQAAANgLAIQgKAIgRAAQgKAAgJgEg");
	this.shape_89.setTransform(17.675,-24.275);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFF83").s().p("AgPCFIAAkJIAfAAIAAEJg");
	this.shape_90.setTransform(67.65,-180.4);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFF83").s().p("Ag7BSQgRgQAAgYQAAgeAWgPQAWgQAoAAIAfAAIAAgPQAAgQgKgKQgKgKgTAAQgRAAgMAIQgLAJAAAMIghAAQAAgOALgNQAJgNASgIQARgHATAAQAgAAATAQQASAQABAdIAABVQAAAaAGAPIAAADIghAAQgDgGgCgOQgWAXgeAAQgcAAgSgPgAgsAlQAAAPAKAJQAKAIAQAAQAOAAANgHQAOgIAGgNIAAgmIgZAAQg6AAAAAig");
	this.shape_91.setTransform(53.675,-176.475);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFF83").s().p("Ag5BOQgQgSAAghIAAh6IAgAAIAAB4QAAAsAjgBQAkABAMgcIAAiIIAgAAIAAC7IgfAAIAAgSQgTAVgjAAQgeAAgQgRg");
	this.shape_92.setTransform(34.275,-176.3);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFF83").s().p("AglBZQgRgIgKgOQgJgOgBgRIAhAAQAAAQAMAKQANAJASAAQATAAAKgHQAMgIgBgMQAAgNgJgHQgKgHgYgGQgYgFgOgGQgPgHgGgKQgHgKAAgOQAAgXATgQQAUgQAdAAQAgAAAUAQQAUARAAAZIggAAQAAgNgLgJQgMgKgRAAQgQAAgKAIQgKAHAAANQAAALAJAGQAJAGAXAFQAZAGAOAHQAPAHAHAKQAIALAAAPQgBAZgTAPQgUAPghAAQgVAAgSgIg");
	this.shape_93.setTransform(15.3,-176.475);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFF83").s().p("AAoCFIhAhXIgUAVIAABCIghAAIAAkJIAhAAIAACgIARgVIA5g9IAnAAIhIBOIBQBtg");
	this.shape_94.setTransform(-1.6,-180.4);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFF83").s().p("Ag2BIQgYgZAAgqIAAgFQgBgcALgVQALgWATgNQATgMAVAAQAlAAAUAYQAVAYAAAtIAAAMIh/AAQACAcAPARQAPARAYAAQAQAAAMgHQAMgHAIgLIAUAPQgXAkgwAAQgkAAgYgZgAgdg4QgNAOgDAaIBcAAIAAgDQgBgYgLgNQgNgOgUAAQgSAAgNAOg");
	this.shape_95.setTransform(-20.95,-176.475);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFF83").s().p("AgkBZQgSgIgJgOQgKgOAAgRIAfAAQACAQAMAKQALAJATAAQATAAAKgHQAMgIAAgMQAAgNgKgHQgKgHgXgGQgZgFgOgGQgPgHgGgKQgHgKAAgOQAAgXATgQQAUgQAdAAQAgAAAUAQQAUARAAAZIghAAQAAgNgLgJQgLgKgRAAQgRAAgJAIQgKAHAAANQAAALAJAGQAKAGAXAFQAXAGAPAHQAPAHAHAKQAIALgBAPQAAAZgTAPQgVAPggAAQgWAAgQgIg");
	this.shape_96.setTransform(-39.75,-176.475);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFF83").s().p("ABMB+IgYhCIhoAAIgYBCIgiAAIBgj7IAcAAIBhD7gAgqAhIBVAAIgrh1g");
	this.shape_97.setTransform(-60.3,-179.725);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#603AD8").s().p("EhB5AkpMAAAhJRMCDzAAAMAAABJRg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-421.8,-234.5,843.6,469.1);


(lib.Tween4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF83").s().p("AgPCFIAAkJIAfAAIAAEJg");
	this.shape.setTransform(57.35,-180.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF83").s().p("Ag7BSQgRgQAAgYQAAgeAWgPQAWgQAoAAIAfAAIAAgPQAAgQgKgKQgKgKgTAAQgRAAgMAIQgLAJAAAMIghAAQAAgOALgNQAJgNASgIQARgHATAAQAgAAATAQQASAQABAdIAABVQAAAaAGAPIAAADIghAAQgDgGgCgOQgWAXgeAAQgcAAgSgPgAgsAlQAAAPAKAJQAKAIAQAAQAOAAANgHQAOgIAGgNIAAgmIgZAAQg6AAAAAig");
	this.shape_1.setTransform(43.375,-176.475);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF83").s().p("Ag5BOQgQgSAAghIAAh6IAgAAIAAB4QAAAsAjgBQAkABAMgcIAAiIIAgAAIAAC7IgfAAIAAgSQgTAVgjAAQgeAAgQgRg");
	this.shape_2.setTransform(23.975,-176.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF83").s().p("AgkBZQgSgIgJgOQgLgOABgRIAfAAQABAQANAKQALAJATAAQASAAAMgHQAKgIABgMQAAgNgKgHQgKgHgXgGQgZgFgOgGQgPgHgGgKQgHgKAAgOQAAgXAUgQQATgQAdAAQAgAAAUAQQAUARAAAZIggAAQAAgNgMgJQgLgKgRAAQgRAAgJAIQgKAHAAANQAAALAJAGQAJAGAYAFQAXAGAPAHQAPAHAIAKQAGALAAAPQABAZgVAPQgTAPghAAQgWAAgQgIg");
	this.shape_3.setTransform(5,-176.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF83").s().p("AAoCFIhBhXIgUAVIAABCIgfAAIAAkJIAfAAIAACgIARgVIA6g9IAnAAIhIBOIBRBtg");
	this.shape_4.setTransform(-11.9,-180.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF83").s().p("Ag3BIQgYgZAAgqIAAgFQAAgcAMgVQAKgWATgNQATgMAWAAQAkAAAVAYQATAYAAAtIAAAMIh+AAQABAcAQARQAPARAXAAQARAAAMgHQAMgHAJgLIAUAPQgZAkgvAAQglAAgYgZgAgdg4QgNAOgEAaIBeAAIAAgDQgCgYgMgNQgMgOgTAAQgTAAgNAOg");
	this.shape_5.setTransform(-31.25,-176.475);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFF83").s().p("AgrB4QgXgKgMgSQgNgRAAgWIAiAAQAAAXARANQAQAOAcAAQAaAAAPgLQAOgLgBgTQABgSgNgKQgOgKghgKQgrgNgTgQQgTgSgBgbQAAgeAYgTQAYgUAlAAQAaAAAUAKQAVALALARQALASAAAVIghAAQAAgXgPgNQgPgNgaAAQgXAAgOALQgOAKAAAUQAAAPANALQANAKAeAJQAgAJASAKQASAKAJAPQAHAOABATQgBAfgXASQgYATgoAAQgZAAgWgKg");
	this.shape_6.setTransform(-51.2,-179.725);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#603AD8").s().p("EhB5AkpMAAAhJRMCDzAAAMAAABJRg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-421.8,-234.5,843.6,469.1);


(lib.Tween3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7D7D45").s().p("AiIAaQgDgQALgQQAKgPAUgHQAxgRAvAzQATguA5AGQAYACARAMQASAMAEAQQADAOgOgDIglgOQg/gVgZAqQgxgwgwAhQgLAIgQAOQgDADgDAAQgFAAgCgKg");
	this.shape.setTransform(0.0092,-0.0173);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.7,-3.5,27.5,7.1);


(lib.tubuh2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AA0B6IAAhpQgBgOgGgLQgIgLgLgHQgMgHgOAAQgOAAgLAHQgMAHgHALQgHALAAAOIAABpIgQAAIAAjyIAQAAIAABfQAKgMANgGQANgHAPABQATAAAPAJQAQAJAIAPQAKAQAAARIAABpg");
	this.shape.setTransform(93.9,-10.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AA0BWIAAgYQgKALgNAHQgOAGgPAAQgSAAgQgJQgOgJgKgPQgIgQgBgTIAAhnIAQAAIAABnQAAAOAHANQAHALAMAHQALAHAOAAQAOAAAMgHQALgHAIgLQAGgNABgOIAAgCIAAhlIAQAAIAACrg");
	this.shape_1.setTransform(76.8,-7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgnBwQgSgJgMgRIAAAkIgQAAIAAjyIAQAAIAABrQAMgSASgIQATgKAUAAQAYAAATALQAUAMALATQAMASAAAYQAAAYgMAUQgLAUgUAKQgTAMgYABQgUAAgTgKgAgigXQgQAIgJAPQgKAQAAATQAAAUAKAQQAJAQAQAJQAQAJASAAQAUAAAPgJQAQgJAJgQQAKgQAAgUQAAgTgKgQQgJgPgQgIQgPgKgUAAQgSAAgQAKg");
	this.shape_2.setTransform(58.25,-10.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAzBWIAAgYQgJALgNAHQgOAGgPAAQgSAAgPgJQgPgJgKgPQgIgQgBgTIAAhnIAQAAIAABnQAAAOAHANQAHALAMAHQALAHAOAAQAOAAAMgHQALgHAIgLQAGgNAAgOIAAgCIAAhlIARAAIAACrg");
	this.shape_3.setTransform(39.35,-7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgHB7IAAjlIhZAAIAAgPIDAAAIAAAPIhYAAIAADlg");
	this.shape_4.setTransform(28.1,-10.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgHB6IAAirIAPAAIAACrgAgHhoIAAgQIAPAAIAAAQg");
	this.shape_5.setTransform(2.5,-10.55);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgrBWIAAirIAQAAIAAAkIAJgLQANgMAOgGQAPgHASAAIACAAIAAAQIgCAAQgOAAgNAGQgNAFgIAKQgLAKgFANQgFAMAAANIAABWg");
	this.shape_6.setTransform(-6.2,-7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgNBvQgLgKAAgOIAAh5IgMAAIAAgPIAMAAIAAhHIAQAAIAABHIALAAIAAAPIgLAAIAAB5QAAAHAGAGQAEAFAIAAQAEAAAEgBIAGgEIABgCIACACIAIAIIACABIgCACQgFAFgGADQgGACgIABQgOgBgJgKg");
	this.shape_7.setTransform(-17.825,-10.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgqBKQgUgLgMgTQgKgUgBgYQABgXAKgTQAMgTAUgMQATgLAXgBQAYABATALQATAMAMATQAMATAAAXIAAACIgFAAIiWAAQABATAJAQQAKAPAPAIQAQAKASAAQAWAAARgNQASgMAJgVIAAgBIACAAIALAFIACABIgBABQgGARgMAMQgMANgRAHQgPAHgSAAQgXAAgTgMgABEgNQgDgQgKgNQgJgMgPgHQgOgIgRAAQgQAAgOAIQgOAHgLAMQgJANgEAQICIAAIAAAAg");
	this.shape_8.setTransform(-31.85,-7);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("ABwBWIAAhnQAAgPgHgLQgHgMgMgGQgMgIgOAAQgPAAgLAIQgMAGgHAMQgHALAAAPIAABnIgPAAIAAhnQAAgPgHgLQgHgMgMgGQgLgIgPAAQgOAAgMAIQgMAGgHAMQgHALAAAPIAABnIgQAAIAAirIAQAAIAAAZQAKgMANgGQAOgHAPAAQATABAQAJQAQAJAIARQAJgRAQgJQAQgJATgBQATABAPAIQAPAKAJAPQAKAPAAATIAABng");
	this.shape_9.setTransform(-56.425,-7);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgHB6IAAirIAPAAIAACrgAgHhoIAAgQIAPAAIAAAQg");
	this.shape_10.setTransform(-73.5,-10.55);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgvByQgXgJgMgPQgNgOgBgSIAAgCIAQAAIAAACQAAALAHAIQAFAJAMAHQALAGAPAEQAOADAQAAQARAAAPgDQAOgEAMgGQAKgHAGgJQAHgIgBgLQABgOgLgLQgLgMgSgGQgSgHgXAAQgSAAgSgFQgRgEgOgJQgOgKgHgMQgIgMAAgNQABgTANgOQAMgOAXgIQAVgJAaAAQAbAAAWAJQAVAIANAOQANAOABATIAAACIgRAAIAAgCQABgLgHgIQgGgJgKgHQgMgHgOgDQgPgEgRAAQgQAAgOAEQgPADgLAHQgMAHgFAJQgHAIAAALQABAOAKAMQALAKASAHQASAHAWAAQATAAARAFQASAEAOAJQAOAKAHAMQAHAMABANQgBASgNAOQgNAPgVAJQgWAJgbAAQgaAAgVgJg");
	this.shape_11.setTransform(-87.15,-10.65);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#0954D2").s().p("A54A+QgwAAAAgYIAAhjQABAXAvAAMAzxAAAQAvAAABgXIAABjQAAAYgwAAg");
	this.shape_12.setTransform(0,25.2625);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#0984E3").s().p("A54E7QgvAAgBgYIAApEQAAgYAwAAMAzxAAAQAwAAAAAYIAAJEQgBAYgvAAg");
	this.shape_13.setTransform(0,-10.05);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgnBwQgSgJgMgRIAAAkIgQAAIAAjyIAQAAIAABrQAMgSASgIQATgKAUAAQAYAAATALQAUAMALATQAMASAAAYQAAAYgMAUQgLAUgUAKQgTAMgYABQgUAAgTgKgAgigXQgQAIgJAPQgKAQAAATQAAAUAKAQQAJAQAQAJQAQAJASABQAUgBAPgJQAQgJAJgQQAKgQAAgUQAAgTgKgQQgJgPgQgIQgPgKgUAAQgSAAgQAKg");
	this.shape_14.setTransform(58.25,-6.05);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgNBvQgLgKAAgOIAAh5IgMAAIAAgPIAMAAIAAhHIAQAAIAABHIALAAIAAAPIgLAAIAAB5QAAAHAGAGQAEAFAIABQAEgBAEgBIAGgEIABgCIACACIAIAIIACABIgCACQgFAFgGADQgGACgIABQgOgBgJgKg");
	this.shape_15.setTransform(-17.825,-6.05);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#0954D2").s().p("A54AnQgwAAAAgYIAAg1QABAXAvAAMAzxAAAQAvAAABgXIAAA1QAAAYgwAAg");
	this.shape_16.setTransform(0,27.525);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AA0B5IAAhnQgBgPgGgKQgIgMgLgHQgMgHgOAAQgOAAgLAHQgMAHgHAMQgHAKAAAPIAABnIgQAAIAAjyIAQAAIAABgQAKgMANgGQANgGAPgBQATABAPAJQAQAJAIAQQAKAOAAATIAABng");
	this.shape_17.setTransform(93.9,0.2);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AA0BWIAAgYQgKALgNAGQgOAHgPAAQgSAAgQgJQgOgJgKgPQgIgQgBgTIAAhnIAQAAIAABnQAAAOAHAMQAHAMAMAHQALAHAOAAQAOAAAMgHQALgHAIgMQAGgMABgOIAAgCIAAhlIAQAAIAACrg");
	this.shape_18.setTransform(76.8,3.75);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgnBwQgSgKgMgRIAAAkIgQAAIAAjyIAQAAIAABrQAMgQASgKQATgJAUgBQAYABATALQAUAMALAUQAMARAAAZQAAAXgMAUQgLATgUAMQgTALgYAAQgUAAgTgJgAgigYQgQAKgJAPQgKAPAAAUQAAATAKAQQAJAPAQAKQAQAKASgBQAUABAPgKQAQgKAJgPQAKgQAAgTQAAgUgKgPQgJgPgQgKQgPgJgUAAQgSAAgQAJg");
	this.shape_19.setTransform(58.25,0.2);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAzBWIAAgYQgJALgNAGQgOAHgPAAQgSAAgPgJQgPgJgKgPQgIgQgBgTIAAhnIAQAAIAABnQAAAOAHAMQAHAMAMAHQALAHAOAAQAOAAAMgHQALgHAIgMQAGgMAAgOIAAgCIAAhlIARAAIAACrg");
	this.shape_20.setTransform(39.35,3.75);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgHB6IAAjjIhZAAIAAgRIDAAAIAAARIhYAAIAADjg");
	this.shape_21.setTransform(28.1,0.1);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgHB5IAAirIAPAAIAACrgAgHhpIAAgQIAPAAIAAAQg");
	this.shape_22.setTransform(2.5,0.2);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgrBWIAAirIAQAAIAAAkIAJgLQANgMAOgHQAPgGASAAIACAAIAAAQIgCAAQgOABgNAEQgNAGgIAKQgLAKgFAMQgFANAAANIAABWg");
	this.shape_23.setTransform(-6.2,3.75);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgNBvQgLgKAAgPIAAh3IgMAAIAAgRIAMAAIAAhHIAQAAIAABHIALAAIAAARIgLAAIAAB3QAAAJAGAFQAEAGAIgBQAEAAAEgBIAGgEIABgBIACABIAIAJIACABIgCABQgFAFgGADQgGADgIgBQgOAAgJgKg");
	this.shape_24.setTransform(-17.825,0.2);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgqBKQgUgLgMgUQgKgTgBgYQABgXAKgTQAMgUAUgLQATgLAXgBQAYABATALQATALAMAUQAMATAAAXIAAACIgFAAIiWAAQABATAJAPQAKAPAPAKQAQAJASAAQAWgBARgLQASgNAJgUIAAgCIACABIALADIACABIgBADQgGAQgMANQgMAMgRAHQgPAHgSAAQgXAAgTgMgABEgNQgDgQgKgNQgJgMgPgIQgOgGgRgBQgQABgOAGQgOAIgLAMQgJANgEAQICIAAIAAAAg");
	this.shape_25.setTransform(-31.85,3.75);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("ABwBWIAAhnQAAgOgHgMQgHgLgMgIQgMgGgOgBQgPABgLAGQgMAIgHALQgHAMAAAOIAABnIgPAAIAAhnQAAgOgHgMQgHgLgMgIQgLgGgPgBQgOABgMAGQgMAIgHALQgHAMAAAOIAABnIgQAAIAAirIAQAAIAAAYQAKgLANgHQAOgGAPAAQATABAQAJQAQAKAIAQQAJgQAQgKQAQgJATgBQATAAAPAKQAPAIAJAQQAKAPAAATIAABng");
	this.shape_26.setTransform(-56.425,3.75);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgHB5IAAirIAPAAIAACrgAgHhpIAAgQIAPAAIAAAQg");
	this.shape_27.setTransform(-73.5,0.2);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgvByQgXgJgMgOQgNgPgBgSIAAgCIAQAAIAAACQAAAKAHAJQAFAJAMAHQALAGAPAEQAOADAQAAQARAAAPgDQAOgEAMgGQAKgHAGgJQAHgJgBgKQABgOgLgLQgLgMgSgGQgSgHgXAAQgSAAgSgFQgRgEgOgKQgOgJgHgMQgIgMAAgOQABgRANgOQAMgPAXgJQAVgIAagBQAbABAWAIQAVAJANAPQANAOABARIAAACIgRAAIAAgCQABgKgHgJQgGgIgKgHQgMgHgOgDQgPgEgRABQgQgBgOAEQgPADgLAHQgMAHgFAIQgHAJAAAKQABAPAKALQALAMASAGQASAHAWAAQATAAARAFQASAEAOAKQAOAJAHAMQAHANABAMQgBASgNAPQgNAOgVAJQgWAIgbAAQgaAAgVgIg");
	this.shape_28.setTransform(-87.15,0.1);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#0984E3").s().p("A54E6QgvAAgBgWIAApGQAAgYAwAAMAzxAAAQAwAAAAAYIAAJGQgBAWgvAAg");
	this.shape_29.setTransform(0,0.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13,p:{y:-10.05}},{t:this.shape_12},{t:this.shape_11,p:{y:-10.65}},{t:this.shape_10,p:{y:-10.55}},{t:this.shape_9,p:{y:-7}},{t:this.shape_8,p:{y:-7}},{t:this.shape_7},{t:this.shape_6,p:{y:-7}},{t:this.shape_5,p:{y:-10.55}},{t:this.shape_4,p:{y:-10.65}},{t:this.shape_3,p:{y:-7}},{t:this.shape_2},{t:this.shape_1,p:{y:-7}},{t:this.shape,p:{y:-10.55}}]}).to({state:[{t:this.shape_13,p:{y:-5.55}},{t:this.shape_16},{t:this.shape_11,p:{y:-6.15}},{t:this.shape_10,p:{y:-6.05}},{t:this.shape_9,p:{y:-2.5}},{t:this.shape_8,p:{y:-2.5}},{t:this.shape_15},{t:this.shape_6,p:{y:-2.5}},{t:this.shape_5,p:{y:-6.05}},{t:this.shape_4,p:{y:-6.15}},{t:this.shape_3,p:{y:-2.5}},{t:this.shape_14},{t:this.shape_1,p:{y:-2.5}},{t:this.shape,p:{y:-6.05}}]},1).to({state:[{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-170.5,-41.5,341,73.7);


(lib.seksual1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_594 = function() {
		var root = this;
		
		root.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(594).call(this.frame_594).wait(43));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgGAHQgCgDgBgEQABgDACgDQACgCAEAAQAFAAACACQACADAAADQAAAEgCADQgCACgFAAQgEAAgCgCg");
	this.shape.setTransform(684.15,-158.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgSA8QgKgFgFgHIAIgJQAKAMAPAAQAKAAAGgGQAHgGAAgMIAAgIQgKALgPAAQgQAAgJgNQgKgNAAgVQAAgVAKgMQAJgNAQAAQAQAAAJAMIABgKIAOAAIAABXQAAASgKAKQgLAKgRAAQgJAAgJgEgAgPgpQgHAJAAARQAAAPAHAIQAGAJAKAAQAPAAAHgNIAAgpQgIgNgOAAQgKAAgGAJg");
	this.shape_1.setTransform(677.075,-160.325);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_2.setTransform(667.725,-162.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_3.setTransform(658.325,-162.025);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_4.setTransform(651.575,-163.925);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAOAAIAABagAgGgtQgCgDAAgEQAAgDACgDQADgDADAAQAEAAACADQADADAAADQAAAEgDADQgCACgEAAQgDAAgDgCg");
	this.shape_5.setTransform(647.45,-163.675);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgSArQgIgEgEgHQgFgHAAgIIAQAAQAAAIAGAFQAFAEAJAAQAIAAAGgDQAGgEgBgGQAAgGgEgDQgFgEgLgCQgLgDgIgDQgHgDgCgFQgEgFAAgGQAAgLAKgIQAJgIANAAQAQAAAJAIQAKAIAAAMIgQAAQABgGgGgEQgFgFgJAAQgHAAgFAEQgEADgBAGQABAGAEADQAFACAKADQALADAIADQAHADAEAFQADAFAAAHQAAAMgKAIQgKAHgPAAQgKAAgJgEg");
	this.shape_6.setTransform(640.95,-162.025);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_7.setTransform(627.625,-162.025);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgVAuIAAhaIAPAAIABALQAGgMAOAAIAHABIAAAOIgIAAQgOAAgFANIAAA/g");
	this.shape_8.setTransform(620.55,-162.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_9.setTransform(612.525,-162.025);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgaAjQgLgNAAgVIAAgCQAAgNAFgKQAFgKAJgGQAJgGALAAQAPAAAKAJQAKAJABAPIgPAAQAAgJgGgFQgGgGgJAAQgLAAgGAIQgHAJAAAQIAAACQAAAPAHAJQAGAIALAAQAIAAAHgFQAGgFAAgHIAPAAQAAAIgFAHQgFAHgIAEQgJAEgJAAQgRAAgLgMg");
	this.shape_10.setTransform(603.525,-162.025);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_11.setTransform(594.575,-162.025);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgSArQgIgEgEgHQgFgHAAgIIAQAAQAAAIAFAFQAHAEAIAAQAIAAAGgDQAGgEgBgGQAAgGgEgDQgFgEgLgCQgLgDgHgDQgIgDgCgFQgEgFAAgGQAAgLAJgIQAKgIANAAQAQAAAKAIQAJAIAAAMIgQAAQAAgGgFgEQgFgFgJAAQgHAAgFAEQgEADgBAGQABAGAEADQAEACALADQAMADAGADQAIADAEAFQADAFAAAHQAAAMgKAIQgJAHgQAAQgKAAgJgEg");
	this.shape_12.setTransform(585.5,-162.025);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_13.setTransform(572.175,-162.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_14.setTransform(562.775,-162.025);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_15.setTransform(554.375,-163.925);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_16.setTransform(544.725,-162.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAPAAIAABagAgGgtQgCgDAAgEQAAgDACgDQADgDADAAQAFAAABADQADADAAADQAAAEgDADQgBACgFAAQgDAAgDgCg");
	this.shape_17.setTransform(537.95,-163.675);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_18.setTransform(531.175,-162.025);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_19.setTransform(524.475,-163.925);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_20.setTransform(518.025,-162.025);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAwAuIAAg6QAAgLgFgEQgEgFgKAAQgJAAgGAFQgFAGgCAIIAAA7IgOAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgPAAIAAhaIAOAAIAAALQALgMAQAAQAUAAAFAPQAFgHAHgEQAHgEAKAAQAeAAABAgIAAA7g");
	this.shape_21.setTransform(505.9,-162.1);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgLAPQAJgKAAgLIAAgOIAOAAIAAAMQAAAIgFAIQgEAIgFAFg");
	this.shape_22.setTransform(492.2,-157.225);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAPAAIAABagAgGgtQgCgDAAgEQAAgDACgDQACgDAEAAQAFAAACADQACADAAADQAAAEgCADQgCACgFAAQgEAAgCgCg");
	this.shape_23.setTransform(488.75,-163.675);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgVAuIAAhaIAPAAIABALQAGgMAOAAIAHABIAAAOIgIAAQgOAAgFANIAAA/g");
	this.shape_24.setTransform(484.2,-162.1);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAPAAIAABagAgGgtQgCgDAAgEQAAgDACgDQADgDADAAQAFAAACADQACADAAADQAAAEgCADQgCACgFAAQgDAAgDgCg");
	this.shape_25.setTransform(478.75,-163.675);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgbA1QgKgNAAgWIAAAAQAAgUAKgNQAKgMAQAAQAOgBAKALIAAgvIAPAAIAAB/IgOAAIgBgJQgJALgPAAQgQAAgKgMgAgQgGQgFAIAAARQAAAPAFAKQAHAIAKAAQAPAAAHgNIAAgoQgHgNgPgBQgKABgHAIg");
	this.shape_26.setTransform(471.65,-163.85);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_27.setTransform(462.275,-162.1);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_28.setTransform(453.175,-162.025);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgRArQgIgEgGgHQgEgHAAgIIAQAAQAAAIAFAFQAHAEAIAAQAIAAAGgDQAGgEgBgGQAAgGgEgDQgFgEgLgCQgMgDgGgDQgIgDgCgFQgEgFAAgGQAAgLAJgIQAKgIANAAQAQAAAKAIQAJAIAAAMIgQAAQAAgGgFgEQgFgFgJAAQgHAAgFAEQgEADAAAGQAAAGAEADQAEACALADQAMADAGADQAIADAEAFQADAFAAAHQAAAMgKAIQgJAHgQAAQgKAAgIgEg");
	this.shape_29.setTransform(444.1,-162.025);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_30.setTransform(430.775,-162.1);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_31.setTransform(421.375,-162.025);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAh/IAQAAIAAAxQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_32.setTransform(412.075,-163.925);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_33.setTransform(402.675,-162.025);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgbAmQgHgJgBgQIAAg6IAQAAIAAA5QAAAVARAAQAQAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgIALgRAAQgOAAgIgIg");
	this.shape_34.setTransform(393.35,-161.95);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgWA1IgBAKIgOAAIAAh/IAPAAIAAAwQAKgLAPAAQARAAAJAMQAJANAAAUIAAABQAAAVgJANQgKAMgQAAQgQAAgJgMgAgWAAIAAAmQAHAOAPAAQALAAAGgIQAGgJAAgRQAAgQgGgIQgGgJgLAAQgPAAgHAPg");
	this.shape_35.setTransform(384.025,-163.85);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AAwAuIAAg6QAAgLgEgEQgFgFgLAAQgIAAgGAFQgFAGgBAIIAAA7IgPAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgPAAIAAhaIAOAAIAAALQAKgMARAAQAUAAAFAPQAFgHAHgEQAHgEAKAAQAeAAABAgIAAA7g");
	this.shape_36.setTransform(371.55,-162.1);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_37.setTransform(359.675,-162.025);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AglA/IAAh8IAOAAIABAKQAJgLAQAAQAQAAAKAMQAJAMAAAWIAAACQAAATgJANQgKAMgQAAQgPAAgKgKIAAArgAgWglIAAAqQAHANAPAAQAKAAAGgJQAHgJAAgQQAAgPgHgJQgGgJgLAAQgOAAgHAMg");
	this.shape_38.setTransform(350.475,-160.375);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_39.setTransform(336.525,-162.1);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_40.setTransform(327.125,-162.025);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_41.setTransform(318.775,-163.925);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgbAmQgIgJABgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIAAgJQgJALgRAAQgPAAgHgIg");
	this.shape_42.setTransform(309.15,-161.95);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_43.setTransform(300.675,-163.925);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_44.setTransform(291.125,-162.025);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_45.setTransform(284.375,-163.925);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_46.setTransform(277.925,-162.025);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AAwAuIAAg6QAAgLgEgEQgFgFgLAAQgIAAgGAFQgFAGgBAIIAAA7IgPAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgPAAIAAhaIAOAAIAAALQAKgMARAAQAUAAAFAPQAFgHAHgEQAHgEAKAAQAeAAABAgIAAA7g");
	this.shape_47.setTransform(265.8,-162.1);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_48.setTransform(693.575,-195.825);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_49.setTransform(683.975,-193.925);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgCQAAgTAKgNQAKgNAPAAQAQAAAIAMIAAgwIAQAAIAACAIgOAAIgBgKQgJALgQAAQgPAAgKgNgAgPgFQgHAHAAASQAAAPAHAIQAGAJALAAQAOAAAGgNIAAgpQgGgNgOABQgLgBgGAKg");
	this.shape_50.setTransform(674.3,-195.75);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAPAAIAABagAgGgtQgCgDAAgEQAAgDACgDQADgDADAAQAEAAADADQACADAAADQAAAEgCADQgDACgEAAQgDAAgDgCg");
	this.shape_51.setTransform(667.65,-195.575);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgCAzQgGgHAAgLIAAg3IgQAAIAAgMIAQAAIAAgWIAPAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFACADQACADAGAAIAIgBIAAAMIgMACQgLAAgEgGg");
	this.shape_52.setTransform(662.55,-194.925);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAPAAIAABagAgGgtQgCgDAAgEQAAgDACgDQACgDAEAAQAFAAACADQACADAAADQAAAEgCADQgCACgFAAQgEAAgCgCg");
	this.shape_53.setTransform(651.2,-195.575);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AglA/IAAh8IAOAAIABAKQAJgLAQAAQAQAAAKAMQAJAMAAAWIAAACQAAATgJANQgKAMgQAAQgPAAgKgKIAAArgAgWglIAAAqQAHANAPAAQAKAAAGgJQAHgJAAgQQAAgPgHgJQgGgJgLAAQgOAAgHAMg");
	this.shape_54.setTransform(644.525,-192.275);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_55.setTransform(634.875,-193.925);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgCAzQgFgHgBgLIAAg3IgQAAIAAgMIAQAAIAAgWIAPAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFADADQABADAGAAIAIgBIAAAMIgNACQgKAAgEgGg");
	this.shape_56.setTransform(627.25,-194.925);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgLAPQAJgKgBgLIAAgOIAPAAIAAAMQAAAIgFAIQgEAIgFAFg");
	this.shape_57.setTransform(616.05,-189.125);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgCAzQgGgHABgLIAAg3IgQAAIAAgMIAQAAIAAgWIAOAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFADADQACADAFAAIAHgBIAAAMIgMACQgKAAgEgGg");
	this.shape_58.setTransform(611.65,-194.925);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAOAAIAABagAgGgtQgCgDAAgEQAAgDACgDQADgDADAAQAEAAACADQADADAAADQAAAEgDADQgCACgEAAQgDAAgDgCg");
	this.shape_59.setTransform(607.05,-195.575);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgCQAAgTAKgNQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAACAIgOAAIgBgKQgJALgPAAQgQAAgKgNgAgQgFQgFAHAAASQAAAPAFAIQAHAJAKAAQAPAAAHgNIAAgpQgHgNgPABQgKgBgHAKg");
	this.shape_60.setTransform(599.9,-195.75);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgdAiQgLgNAAgVIAAAAQAAgNAFgLQAFgKAKgGQAJgGALAAQASAAAMANQALANAAAUIAAABQAAANgFALQgFAKgJAGQgKAGgMAAQgRAAgMgNgAgSgYQgHAJAAAQQAAAPAHAJQAHAJALAAQAMAAAHgJQAHgJAAgQQAAgPgHgJQgHgJgMAAQgLAAgHAJg");
	this.shape_61.setTransform(590.425,-193.925);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgVAuIAAhaIAPAAIABALQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_62.setTransform(583.1,-194);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgMBBIAAhOIgOAAIAAgMIAOAAIAAgJQAAgOAIgIQAHgIAOAAQAFAAAFACIAAAMIgJgBQgHAAgEAFQgFAEAAAIIAAAJIAUAAIAAAMIgUAAIAABOg");
	this.shape_63.setTransform(577.025,-195.9);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_64.setTransform(569.125,-193.925);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgJgEgFQgFgFgLAAQgIAAgFAGQgHAEAAAJIAAA7IgPAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgPAAIAAhaIAOAAIABAKQAJgLASAAQATAAAFAOQAFgGAHgEQAHgEAKAAQAeAAAAAfIAAA8g");
	this.shape_65.setTransform(557.05,-194);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgVAuIAAhaIAPAAIAAALQAHgMAOAAIAHABIAAAPIgIgBQgOAAgGANIAAA/g");
	this.shape_66.setTransform(547.05,-194);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_67.setTransform(539.325,-193.925);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAh/IAQAAIAAAxQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_68.setTransform(530.025,-195.825);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgCAzQgGgHAAgLIAAg3IgPAAIAAgMIAPAAIAAgWIAPAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFACADQADADAFAAIAHgBIAAAMIgLACQgLAAgEgGg");
	this.shape_69.setTransform(515.6,-194.925);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_70.setTransform(508.375,-193.925);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgMBBIAAhOIgOAAIAAgMIAOAAIAAgJQAAgOAIgIQAHgIAOAAQAFAAAFACIAAAMIgJgBQgHAAgEAFQgFAEAAAIIAAAJIAUAAIAAAMIgUAAIAABOg");
	this.shape_71.setTransform(501.025,-195.9);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAPAAIAABagAgGgtQgCgDAAgEQAAgDACgDQADgDADAAQAEAAADADQACADAAADQAAAEgCADQgDACgEAAQgDAAgDgCg");
	this.shape_72.setTransform(495.75,-195.575);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgRArQgJgEgEgHQgFgHAAgIIAQAAQAAAIAFAFQAHAEAIAAQAIAAAGgDQAGgEgBgGQAAgGgEgDQgFgEgLgCQgLgDgHgDQgIgDgCgFQgEgFAAgGQAAgLAJgIQAKgIANAAQAQAAAKAIQAJAIAAAMIgQAAQABgGgGgEQgFgFgJAAQgHAAgFAEQgEADgBAGQABAGAEADQAEACALADQAMADAGADQAIADAEAFQADAFAAAHQAAAMgKAIQgJAHgQAAQgKAAgIgEg");
	this.shape_73.setTransform(489.2,-193.925);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgVAuIAAhaIAPAAIAAALQAHgMAOAAIAHABIAAAPIgHgBQgPAAgGANIAAA/g");
	this.shape_74.setTransform(482.35,-194);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_75.setTransform(474.625,-193.925);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgWA1IgBALIgOAAIAAiAIAPAAIAAAwQAKgMAPAAQARAAAJANQAJAMAAAVIAAACQAAAUgJAMQgKANgQAAQgQAAgJgMgAgWAAIAAAmQAHAOAPAAQALAAAGgJQAGgIAAgSQAAgPgGgIQgGgIgLAAQgPAAgHAOg");
	this.shape_76.setTransform(465.375,-195.75);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAPAAIAABagAgGgtQgCgDAAgEQAAgDACgDQADgDADAAQAEAAADADQACADAAADQAAAEgCADQgDACgEAAQgDAAgDgCg");
	this.shape_77.setTransform(451.65,-195.575);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgSArQgIgEgEgHQgFgHAAgIIAQAAQAAAIAFAFQAHAEAIAAQAIAAAGgDQAGgEgBgGQAAgGgEgDQgFgEgLgCQgLgDgHgDQgIgDgCgFQgEgFAAgGQAAgLAJgIQAKgIANAAQAQAAAKAIQAJAIAAAMIgQAAQABgGgGgEQgFgFgJAAQgHAAgFAEQgEADgBAGQABAGAEADQAEACALADQAMADAGADQAIADAEAFQADAFAAAHQAAAMgKAIQgJAHgQAAQgKAAgJgEg");
	this.shape_78.setTransform(445.1,-193.925);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_79.setTransform(436.975,-195.825);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgbAmQgIgIAAgRIAAg6IAQAAIAAA5QAAAVARAAQAQAAAGgNIAAhBIAPAAIAABaIgOAAIAAgJQgKAKgQAAQgPAAgHgIg");
	this.shape_80.setTransform(427.3,-193.85);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgCQAAgTAKgNQAKgNAPAAQAPAAAKAMIAAgwIAPAAIAACAIgOAAIgBgKQgJALgQAAQgPAAgKgNgAgPgFQgHAHABASQgBAPAHAIQAGAJALAAQAOAAAHgNIAAgpQgHgNgOABQgLgBgGAKg");
	this.shape_81.setTransform(417.6,-195.75);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgdAiQgLgNAAgVIAAAAQAAgNAFgLQAFgKAKgGQAJgGALAAQASAAAMANQALANAAAUIAAABQAAANgFALQgFAKgJAGQgKAGgMAAQgRAAgMgNgAgSgYQgHAJAAAQQAAAPAHAJQAHAJALAAQAMAAAHgJQAHgJAAgQQAAgPgHgJQgHgJgMAAQgLAAgHAJg");
	this.shape_82.setTransform(408.125,-193.925);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgVAuIAAhaIAPAAIABALQAGgMAOAAIAHABIAAAPIgHgBQgPAAgFANIAAA/g");
	this.shape_83.setTransform(400.75,-194);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AglA/IAAh8IAOAAIABAKQAJgLAQAAQAQAAAKAMQAJAMAAAWIAAACQAAATgJANQgKAMgQAAQgPAAgKgKIAAArgAgWglIAAAqQAHANAPAAQAKAAAGgJQAHgJAAgQQAAgPgHgJQgGgJgLAAQgOAAgHAMg");
	this.shape_84.setTransform(392.825,-192.275);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_85.setTransform(383.475,-193.925);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgVAuIAAhaIAPAAIAAALQAHgMAOAAIAHABIAAAPIgHgBQgPAAgGANIAAA/g");
	this.shape_86.setTransform(376.35,-194);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgJgFgFQgEgFgLAAQgIAAgFAGQgHAEgBAJIAAA7IgOAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgQAAIAAhaIAPAAIABAKQAKgLARAAQASAAAHAOQAEgGAHgEQAHgEAKAAQAeAAAAAfIAAA8g");
	this.shape_87.setTransform(358.8,-194);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AgbAmQgIgIABgRIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAQAAIAABaIgPAAIAAgJQgJAKgRAAQgOAAgIgIg");
	this.shape_88.setTransform(346.6,-193.85);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgJgEgFQgFgFgLAAQgIAAgFAGQgHAEAAAJIAAA7IgPAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgQAAIAAhaIAPAAIABAKQAJgLASAAQASAAAHAOQAEgGAHgEQAHgEAKAAQAeAAAAAfIAAA8g");
	this.shape_89.setTransform(334.4,-194);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AgbAmQgIgIABgRIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABaIgOAAIAAgJQgJAKgRAAQgPAAgHgIg");
	this.shape_90.setTransform(322.2,-193.85);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_91.setTransform(306.075,-193.925);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AgVAuIAAhaIAPAAIABALQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_92.setTransform(299,-194);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_93.setTransform(290.975,-193.925);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AgaAjQgLgNAAgVIAAgCQAAgNAFgKQAFgKAJgGQAJgGALAAQAPAAAKAJQAKAJABAPIgPAAQAAgJgGgFQgGgGgJAAQgLAAgGAIQgHAJAAAQIAAACQAAAPAHAJQAGAIALAAQAIAAAHgFQAGgFAAgHIAPAAQAAAIgFAHQgFAHgIAEQgJAEgJAAQgRAAgLgMg");
	this.shape_94.setTransform(281.975,-193.925);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_95.setTransform(273.025,-193.925);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgUA6QgLgFgGgJQgGgIAAgKIAQAAQAAALAIAGQAIAGANABQANAAAGgGQAHgFAAgIQAAgKgGgFQgGgEgQgFQgUgGgKgIQgJgJAAgMQAAgPALgJQAMgKARAAQANABAJAFQAKAEAGAJQAFAJAAAJIgQAAQAAgKgHgHQgHgGgNAAQgLAAgGAFQgHAFAAAJQAAAIAGAFQAHAFAOAEQAPAFAJAEQAIAFAEAHQAEAHAAAJQAAAPgLAJQgMAIgTAAQgMABgKgFg");
	this.shape_96.setTransform(263.375,-195.5);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AgGAHQgDgDABgEQgBgDADgDQADgCADAAQAFAAADACQABADABADQgBAEgBADQgDACgFAAQgDAAgDgCg");
	this.shape_97.setTransform(346.9,-62.525);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_98.setTransform(340.025,-66.3);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_99.setTransform(321.275,-66.3);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AAVAtIgVhDIgVBDIgMAAIgbhZIAQAAIASBDIAVhDIALAAIAWBEIARhEIAPAAIgaBZg");
	this.shape_100.setTransform(300.8,-66.225);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIAAAKQAHgMAOAAIAHABIAAAOIgHAAQgPAAgGANIAAA/g");
	this.shape_101.setTransform(278.5,-66.3);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AgWA1IgBAKIgOAAIAAh/IAPAAIAAAwQAKgMAPAAQARAAAJANQAJAMAAAVIAAACQAAAUgJAMQgKANgQAAQgQAAgJgMgAgWAAIAAAmQAHAOAPAAQALAAAGgJQAGgIAAgSQAAgPgGgIQgGgJgLABQgPAAgHAOg");
	this.shape_102.setTransform(261.525,-68.05);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVARAAQAQAAAGgNIAAhBIAQAAIAABZIgPAAIgBgJQgIALgRAAQgOAAgIgIg");
	this.shape_103.setTransform(593.5,-98.05);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AgQBPIAAgNIAHABQAFAAADgDQABgCAAgIIAAhkIAQAAIAABkQAAAagXAAQgFAAgEgBgAABhAQgBgCAAgEQAAgDABgDQACgDAFAAQAEAAADADQACADAAADQAAAEgCACQgDADgEAAQgFAAgCgDg");
	this.shape_104.setTransform(585.875,-97.95);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVARAAQAQAAAGgNIAAhBIAQAAIAABZIgPAAIgBgJQgIALgRAAQgOAAgIgIg");
	this.shape_105.setTransform(580,-98.05);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AgSA8QgKgFgFgHIAIgJQAKAMAPAAQAKAAAGgGQAHgGAAgMIAAgIQgKALgPAAQgQAAgJgNQgKgNAAgVQAAgVAKgMQAJgNAQAAQAQAAAJAMIABgKIAOAAIAABXQAAASgKAKQgLAKgRAAQgJAAgJgEgAgPgpQgHAJAAARQAAAPAHAIQAGAJAKAAQAPAAAHgNIAAgpQgIgNgOAAQgKAAgGAJg");
	this.shape_106.setTransform(523.425,-96.425);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AgbA1QgKgNAAgWIAAAAQAAgUAKgNQAJgMARAAQAPgBAIALIAAgvIAQAAIAAB/IgOAAIgBgJQgJALgPAAQgRAAgJgMgAgQgGQgFAIgBARQABAPAFAKQAHAIAKAAQAPAAAGgNIAAgoQgGgNgPgBQgKABgHAIg");
	this.shape_107.setTransform(495.3,-99.95);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgaA/IgGgBIAAgNIADABQAJAAAEgDQAFgDACgJIAEgJIghhZIARAAIAWBDIAVhDIARAAIglBoQgHAWgTABg");
	this.shape_108.setTransform(449.2,-96.3);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AgbAmQgHgJgBgQIAAg6IAQAAIAAA5QAAAVARAAQAQAAAGgNIAAhBIAQAAIAABZIgPAAIgBgJQgIALgRAAQgOAAgIgIg");
	this.shape_109.setTransform(421.6,-98.05);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAQAAIAABZIgPAAIgBgJQgJALgQAAQgOAAgIgIg");
	this.shape_110.setTransform(402.6,-98.05);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgCAzQgGgHAAgLIAAg3IgPAAIAAgMIAPAAIAAgWIAPAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFACADQACADAGAAIAIgBIAAAMIgMACQgLAAgEgGg");
	this.shape_111.setTransform(394.9,-99.125);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AAwAuIAAg6QAAgLgFgEQgEgFgKAAQgJAAgFAFQgGAGgCAIIAAA7IgOAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgQAAIAAhaIAPAAIAAALQALgMAQAAQATAAAHAPQAEgHAHgEQAHgEAKAAQAeAAAAAgIAAA7g");
	this.shape_112.setTransform(264.05,-98.2);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_113.setTransform(690.525,-130.15);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AgSA8QgKgFgFgHIAIgJQAKAMAPAAQAKAAAGgGQAHgGAAgMIAAgIQgKALgPAAQgQAAgJgNQgKgNAAgVQAAgVAKgMQAJgNAQAAQAQAAAJAMIABgKIAOAAIAABXQAAASgKAKQgLAKgRAAQgJAAgJgEgAgPgpQgHAJAAARQAAAPAHAIQAGAJAKAAQAPAAAHgNIAAgpQgIgNgOAAQgKAAgGAJg");
	this.shape_114.setTransform(671.575,-128.375);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_115.setTransform(662.175,-130.15);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AgbA1QgKgNAAgWIAAAAQAAgUAKgNQAJgMAQAAQAPgBAKALIAAgvIAPAAIAAB/IgOAAIgBgJQgJALgQAAQgQAAgJgMgAgPgGQgHAIABARQgBAPAHAKQAGAIALAAQAOAAAHgNIAAgoQgHgNgOgBQgLABgGAIg");
	this.shape_116.setTransform(643.4,-131.9);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AgSA8QgKgFgFgHIAIgJQAKAMAPAAQAKAAAGgGQAHgGAAgMIAAgIQgKALgPAAQgQAAgJgNQgKgNAAgVQAAgVAKgMQAJgNAQAAQAQAAAJAMIABgKIAOAAIAABXQAAASgKAKQgLAKgRAAQgJAAgJgEgAgPgpQgHAJAAARQAAAPAHAIQAGAJAKAAQAPAAAHgNIAAgpQgIgNgOAAQgKAAgGAJg");
	this.shape_117.setTransform(618.475,-128.375);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_118.setTransform(609.125,-130.15);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_119.setTransform(593.025,-131.975);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAOAAIAABagAgGgtQgCgDAAgEQAAgDACgDQACgDAEAAQAEAAACADQADADAAADQAAAEgDADQgCACgEAAQgEAAgCgCg");
	this.shape_120.setTransform(588.85,-131.725);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_121.setTransform(557.825,-130.15);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AAWAtIgWhDIgUBDIgNAAIgahZIAPAAIARBDIAWhDIALAAIAVBEIAShEIAPAAIgaBZg");
	this.shape_122.setTransform(542.5,-130.075);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_123.setTransform(497.975,-130.15);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AgbAmQgIgJAAgQIAAg6IAQAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIAAgJQgKALgQAAQgPAAgHgIg");
	this.shape_124.setTransform(470.6,-130);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_125.setTransform(445.875,-131.975);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AAwAuIAAg6QAAgLgFgEQgEgFgLAAQgIAAgFAFQgHAGgBAIIAAA7IgOAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgQAAIAAhaIAPAAIABALQAKgMARAAQASAAAHAPQAEgHAHgEQAHgEAKAAQAeAAAAAgIAAA7g");
	this.shape_126.setTransform(427.3,-130.15);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_127.setTransform(399.675,-130.15);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_128.setTransform(381.875,-131.975);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AgSA8QgKgFgFgHIAIgJQAKAMAPAAQAKAAAGgGQAHgGAAgMIAAgIQgKALgPAAQgQAAgJgNQgKgNAAgVQAAgVAKgMQAJgNAQAAQAQAAAJAMIABgKIAOAAIAABXQAAASgKAKQgLAKgRAAQgJAAgJgEgAgPgpQgHAJAAARQAAAPAHAIQAGAJAKAAQAPAAAHgNIAAgpQgIgNgOAAQgKAAgGAJg");
	this.shape_129.setTransform(347.325,-128.375);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_130.setTransform(337.975,-130.15);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAOAAIAABagAgGgtQgCgDAAgEQAAgDACgDQACgDAEAAQAEAAACADQADADAAADQAAAEgDADQgCACgEAAQgEAAgCgCg");
	this.shape_131.setTransform(331.2,-131.725);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_132.setTransform(315.475,-130.075);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_133.setTransform(281.825,-130.075);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("AgbAmQgIgJAAgQIAAg6IAQAAIAAA5QAAAVARAAQAQAAAGgNIAAhBIAPAAIAABZIgOAAIAAgJQgKALgQAAQgPAAgHgIg");
	this.shape_134.setTransform(272.5,-130);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("AgrA9IAAh5IAiAAQAQAAAMAHQALAHAIANQAGANAAARIAAAHQAAARgGANQgHANgMAHQgNAHgPAAgAgbAwIARAAQARAAALgMQAKgLAAgWIAAgGQAAgVgJgLQgLgMgQAAIgTAAg");
	this.shape_135.setTransform(262.35,-131.625);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("AgGAHQgDgDABgEQgBgDADgDQADgCADAAQAFAAADACQABADAAADQAAAEgBADQgDACgFAAQgDAAgDgCg");
	this.shape_136.setTransform(692.95,-158.325);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("AgSA8QgKgFgFgHIAIgJQAKAMAPAAQAKAAAGgGQAHgGAAgMIAAgIQgKALgPAAQgQAAgJgNQgKgNAAgVQAAgVAKgMQAJgNAQAAQAQAAAJAMIABgKIAOAAIAABXQAAASgKAKQgLAKgRAAQgJAAgJgEgAgPgpQgHAJAAARQAAAPAHAIQAGAJAKAAQAPAAAHgNIAAgpQgIgNgOAAQgKAAgGAJg");
	this.shape_137.setTransform(685.875,-160.325);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_138.setTransform(676.525,-162.1);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_139.setTransform(667.125,-162.025);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_140.setTransform(660.375,-163.925);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("AgSArQgHgEgFgHQgFgHAAgIIAPAAQABAIAGAFQAFAEAJAAQAJAAAFgDQAGgEAAgGQgBgGgFgDQgEgEgLgCQgLgDgIgDQgGgDgEgFQgDgFAAgGQAAgLAKgIQAJgIANAAQAQAAAJAIQAKAIAAAMIgPAAQAAgGgGgEQgFgFgJAAQgHAAgFAEQgFADAAAGQAAAGAFADQAFACAKADQALADAIADQAHADAEAFQADAFAAAHQAAAMgKAIQgKAHgPAAQgKAAgJgEg");
	this.shape_141.setTransform(649.7,-162.025);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_142.setTransform(634.325,-162.025);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("AgVAuIAAhaIAPAAIAAALQAHgMAOAAIAHABIAAAOIgHAAQgPAAgGANIAAA/g");
	this.shape_143.setTransform(627.25,-162.1);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_144.setTransform(619.225,-162.025);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("AgaAjQgLgNAAgVIAAgCQAAgNAFgKQAFgKAJgGQAJgGALAAQAPAAAKAJQAKAJABAPIgPAAQAAgJgGgFQgGgGgJAAQgLAAgGAIQgHAJAAAQIAAACQAAAPAHAJQAGAIALAAQAIAAAHgFQAGgFAAgHIAPAAQAAAIgFAHQgFAHgIAEQgJAEgJAAQgRAAgLgMg");
	this.shape_145.setTransform(610.225,-162.025);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFFF").s().p("AgSArQgIgEgFgHQgEgHAAgIIAPAAQABAIAGAFQAFAEAJAAQAIAAAGgDQAFgEABgGQAAgGgGgDQgEgEgLgCQgLgDgIgDQgHgDgDgFQgDgFAAgGQAAgLAKgIQAJgIAOAAQAPAAAJAIQAKAIAAAMIgPAAQAAgGgGgEQgGgFgHAAQgIAAgFAEQgFADABAGQgBAGAFADQAEACALADQALADAIADQAHADADAFQAEAFAAAHQAAAMgKAIQgKAHgPAAQgKAAgJgEg");
	this.shape_146.setTransform(592.2,-162.025);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_147.setTransform(576.725,-162.1);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_148.setTransform(567.325,-162.025);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_149.setTransform(558.975,-163.925);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_150.setTransform(549.325,-162.1);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAOAAIAABagAgGgtQgCgDAAgEQAAgDACgDQACgDAEAAQAEAAACADQADADAAADQAAAEgDADQgCACgEAAQgEAAgCgCg");
	this.shape_151.setTransform(542.5,-163.675);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_152.setTransform(535.775,-162.025);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_153.setTransform(529.025,-163.925);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_154.setTransform(522.575,-162.025);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("AAwAuIAAg6QAAgLgFgEQgEgFgLAAQgIAAgFAFQgHAGAAAIIAAA7IgPAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgQAAIAAhaIAPAAIABALQAJgMASAAQASAAAHAPQAEgHAHgEQAHgEAKAAQAeAAAAAgIAAA7g");
	this.shape_155.setTransform(510.45,-162.1);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAOAAIAABagAgGgtQgCgDAAgEQAAgDACgDQACgDAEAAQAEAAADADQACADAAADQAAAEgCADQgDACgEAAQgEAAgCgCg");
	this.shape_156.setTransform(491.2,-163.675);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAPAAIAABagAgGgtQgCgDAAgEQAAgDACgDQADgDADAAQAFAAABADQADADAAADQAAAEgDADQgBACgFAAQgDAAgDgCg");
	this.shape_157.setTransform(481.25,-163.675);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FFFFFF").s().p("AgbA1QgKgNAAgWIAAAAQAAgUAKgNQAJgMARAAQAOgBAKALIAAgvIAPAAIAAB/IgOAAIgBgJQgJALgPAAQgRAAgJgMgAgQgGQgFAIAAARQAAAPAFAKQAHAIAKAAQAPAAAHgNIAAgoQgHgNgPgBQgKABgHAIg");
	this.shape_158.setTransform(474.1,-163.85);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_159.setTransform(464.775,-162.1);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_160.setTransform(455.675,-162.025);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FFFFFF").s().p("AgRArQgIgEgGgHQgEgHAAgIIAPAAQABAIAFAFQAHAEAIAAQAIAAAGgDQAFgEAAgGQABgGgGgDQgEgEgLgCQgMgDgGgDQgHgDgEgFQgDgFAAgGQAAgLAJgIQAKgIAOAAQAPAAAKAIQAJAIAAAMIgPAAQgBgGgFgEQgGgFgHAAQgIAAgFAEQgFADABAGQgBAGAFADQAEACALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAIQgKAHgPAAQgKAAgIgEg");
	this.shape_161.setTransform(446.6,-162.025);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_162.setTransform(431.125,-162.1);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_163.setTransform(421.725,-162.025);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_164.setTransform(403.025,-162.025);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FFFFFF").s().p("AgbAmQgHgJgBgQIAAg6IAQAAIAAA5QAAAVARAAQAQAAAGgNIAAhBIAQAAIAABZIgPAAIgBgJQgIALgRAAQgOAAgIgIg");
	this.shape_165.setTransform(393.7,-161.95);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FFFFFF").s().p("AgWA1IgBAKIgOAAIAAh/IAPAAIAAAwQAKgLAPAAQARAAAJAMQAJANAAAUIAAABQAAAVgJANQgKAMgQAAQgQAAgJgMgAgWAAIAAAmQAHAOAPAAQALAAAGgIQAGgJAAgRQAAgQgGgIQgGgJgLAAQgPAAgHAPg");
	this.shape_166.setTransform(384.375,-163.85);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FFFFFF").s().p("AAwAuIAAg6QAAgLgFgEQgEgFgLAAQgIAAgFAFQgHAGgBAIIAAA7IgOAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgQAAIAAhaIAPAAIABALQAKgMARAAQASAAAHAPQAEgHAHgEQAHgEAKAAQAeAAAAAgIAAA7g");
	this.shape_167.setTransform(371.95,-162.1);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_168.setTransform(360.025,-162.025);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_169.setTransform(334.775,-162.1);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_170.setTransform(325.375,-162.025);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_171.setTransform(317.025,-163.925);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_172.setTransform(298.925,-163.925);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_173.setTransform(289.375,-162.025);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_174.setTransform(282.625,-163.925);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_175.setTransform(276.175,-162.025);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#FFFFFF").s().p("AAwAuIAAg6QAAgLgFgEQgEgFgKAAQgJAAgFAFQgGAGgCAIIAAA7IgOAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgQAAIAAhaIAPAAIAAALQALgMAQAAQATAAAHAPQAEgHAHgEQAHgEAKAAQAeAAAAAgIAAA7g");
	this.shape_176.setTransform(264.05,-162.1);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_177.setTransform(691.825,-195.825);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_178.setTransform(682.225,-193.925);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgCQAAgTAKgNQAJgNAQAAQAPAAAKAMIAAgwIAPAAIAACAIgOAAIgBgKQgJALgQAAQgQAAgJgNgAgQgFQgFAHAAASQAAAPAFAIQAHAJAKAAQAPAAAHgNIAAgpQgHgNgPABQgKgBgHAKg");
	this.shape_179.setTransform(672.55,-195.75);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#FFFFFF").s().p("AgCAzQgGgHABgLIAAg3IgRAAIAAgMIARAAIAAgWIAOAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFADADQACADAFAAIAHgBIAAAMIgMACQgKAAgEgGg");
	this.shape_180.setTransform(660.8,-194.925);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#FFFFFF").s().p("AglA/IAAh8IAOAAIABAKQAJgLAQAAQAQAAAKAMQAJAMAAAWIAAACQAAATgJANQgKAMgQAAQgPAAgKgKIAAArgAgWglIAAAqQAHANAPAAQAKAAAGgJQAHgJAAgQQAAgPgHgJQgGgJgLAAQgOAAgHAMg");
	this.shape_181.setTransform(642.775,-192.275);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_182.setTransform(633.125,-193.925);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#FFFFFF").s().p("AgCAzQgGgHABgLIAAg3IgQAAIAAgMIAQAAIAAgWIAOAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFADADQABADAGAAIAHgBIAAAMIgLACQgLAAgEgGg");
	this.shape_183.setTransform(625.5,-194.925);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#FFFFFF").s().p("AgKAPQAHgKABgLIAAgOIANAAIAAAMQAAAIgDAIQgEAIgGAFg");
	this.shape_184.setTransform(614.3,-189.125);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#FFFFFF").s().p("AgCAzQgFgHgBgLIAAg3IgQAAIAAgMIAQAAIAAgWIAPAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFACADQACADAGAAIAIgBIAAAMIgMACQgLAAgEgGg");
	this.shape_185.setTransform(609.9,-194.925);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_186.setTransform(567.375,-193.925);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgJgFgFQgEgFgKAAQgJAAgGAGQgFAEgCAJIAAA7IgOAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgQAAIAAhaIAPAAIAAAKQALgLAQAAQATAAAHAOQAEgGAHgEQAHgEAKAAQAeAAABAfIAAA8g");
	this.shape_187.setTransform(555.3,-194);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_188.setTransform(537.575,-193.925);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAh/IAQAAIAAAxQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_189.setTransform(528.275,-195.825);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#FFFFFF").s().p("AgCAzQgFgHAAgLIAAg3IgRAAIAAgMIARAAIAAgWIAOAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFACADQADADAFAAIAIgBIAAAMIgNACQgKAAgEgGg");
	this.shape_190.setTransform(513.85,-194.925);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_191.setTransform(506.625,-193.925);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAOAAIAABagAgGgtQgCgDAAgEQAAgDACgDQADgDADAAQAEAAACADQADADAAADQAAAEgDADQgCACgEAAQgDAAgDgCg");
	this.shape_192.setTransform(494,-195.575);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#FFFFFF").s().p("AgRArQgJgEgFgHQgEgHAAgIIAPAAQABAIAFAFQAGAEAJAAQAIAAAGgDQAFgEABgGQAAgGgGgDQgEgEgLgCQgLgDgIgDQgGgDgEgFQgDgFAAgGQAAgLAKgIQAJgIAOAAQAPAAAJAIQAKAIAAAMIgPAAQgBgGgFgEQgGgFgHAAQgIAAgFAEQgFADABAGQgBAGAFADQAFACAKADQALADAIADQAHADADAFQAEAFAAAHQAAAMgKAIQgKAHgPAAQgKAAgIgEg");
	this.shape_193.setTransform(487.45,-193.925);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_194.setTransform(472.875,-193.925);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAOAAIAABagAgGgtQgCgDAAgEQAAgDACgDQADgDADAAQAEAAACADQADADAAADQAAAEgDADQgCACgEAAQgDAAgDgCg");
	this.shape_195.setTransform(449.9,-195.575);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#FFFFFF").s().p("AgRArQgJgEgFgHQgEgHAAgIIAPAAQABAIAFAFQAHAEAIAAQAIAAAGgDQAFgEABgGQAAgGgGgDQgEgEgLgCQgLgDgIgDQgGgDgEgFQgDgFAAgGQAAgLAJgIQAKgIAOAAQAPAAAJAIQAKAIAAAMIgPAAQgBgGgFgEQgGgFgHAAQgIAAgFAEQgFADABAGQgBAGAFADQAFACAKADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAIQgKAHgPAAQgKAAgIgEg");
	this.shape_196.setTransform(443.35,-193.925);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_197.setTransform(435.225,-195.825);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#FFFFFF").s().p("AgbAmQgHgIAAgRIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAQAAIAABaIgPAAIgBgJQgJAKgQAAQgOAAgIgIg");
	this.shape_198.setTransform(425.55,-193.85);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#FFFFFF").s().p("AglA/IAAh8IAOAAIABAKQAJgLAQAAQAQAAAKAMQAJAMAAAWIAAACQAAATgJANQgKAMgQAAQgPAAgKgKIAAArgAgWglIAAAqQAHANAPAAQAKAAAGgJQAHgJAAgQQAAgPgHgJQgGgJgLAAQgOAAgHAMg");
	this.shape_199.setTransform(391.075,-192.275);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_200.setTransform(381.725,-193.925);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#FFFFFF").s().p("AgVAuIAAhaIAPAAIAAALQAHgMAOAAIAHABIAAAPIgIgBQgOAAgGANIAAA/g");
	this.shape_201.setTransform(374.6,-194);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgJgEgFQgFgFgKAAQgJAAgGAGQgFAEgBAJIAAA7IgPAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgPAAIAAhaIAOAAIAAAKQALgLAQAAQAUAAAFAOQAFgGAHgEQAHgEAKAAQAeAAABAfIAAA8g");
	this.shape_202.setTransform(357.05,-194);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#FFFFFF").s().p("AgbAmQgIgIAAgRIAAg6IAQAAIAAA5QAAAVARAAQAQAAAGgNIAAhBIAPAAIAABaIgOAAIgBgJQgIAKgRAAQgPAAgHgIg");
	this.shape_203.setTransform(344.85,-193.85);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgJgFgFQgEgFgKAAQgJAAgGAGQgFAEgCAJIAAA7IgOAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgPAAIAAhaIAOAAIAAAKQALgLAQAAQAUAAAFAOQAFgGAHgEQAHgEAKAAQAeAAABAfIAAA8g");
	this.shape_204.setTransform(332.65,-194);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#FFFFFF").s().p("AgbAmQgHgIgBgRIAAg6IAQAAIAAA5QAAAVARAAQAQAAAGgNIAAhBIAQAAIAABaIgPAAIgBgJQgIAKgRAAQgOAAgIgIg");
	this.shape_205.setTransform(320.45,-193.85);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_206.setTransform(304.325,-193.925);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#FFFFFF").s().p("AgVAuIAAhaIAPAAIABALQAGgMAOAAIAHABIAAAPIgHgBQgPAAgFANIAAA/g");
	this.shape_207.setTransform(297.25,-194);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_208.setTransform(289.225,-193.925);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#FFFFFF").s().p("AgaAjQgLgNAAgVIAAgCQAAgNAFgKQAFgKAJgGQAJgGALAAQAPAAAKAJQAKAJABAPIgPAAQAAgJgGgFQgGgGgJAAQgLAAgGAIQgHAJAAAQIAAACQAAAPAHAJQAGAIALAAQAIAAAHgFQAGgFAAgHIAPAAQAAAIgFAHQgFAHgIAEQgJAEgJAAQgRAAgLgMg");
	this.shape_209.setTransform(280.225,-193.925);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_210.setTransform(271.275,-193.925);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#FFFFFF").s().p("AgaA/IgHgBIAAgNIAFABQAHAAAFgDQAEgEADgIIADgJIgfhYIAQAAIAWBCIAVhCIAQAAIgkBnQgIAXgSgBg");
	this.shape_211.setTransform(567.4,-32.45);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_212.setTransform(520.825,-34.35);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#FFFFFF").s().p("AgSArQgHgEgFgHQgFgHAAgIIAQAAQAAAIAGAFQAFAEAJAAQAIAAAGgDQAGgEgBgGQAAgGgEgDQgFgEgLgCQgLgDgIgDQgHgDgCgFQgEgFAAgGQAAgLAKgIQAJgIANAAQAQAAAJAIQAKAIAAAMIgQAAQABgGgGgEQgFgFgJAAQgHAAgFAEQgEADgBAGQABAGAEADQAFACAKADQALADAIADQAHADAEAFQADAFAAAHQAAAMgKAIQgKAHgPAAQgKAAgJgEg");
	this.shape_213.setTransform(502.35,-34.275);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_214.setTransform(460.525,-34.35);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgJgFgFQgEgFgKAAQgJAAgGAGQgFAEgCAJIAAA7IgOAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgPAAIAAhZIAOAAIAAAJQALgLAQAAQAUAAAFAOQAFgGAHgEQAHgEAKAAQAeAAABAfIAAA8g");
	this.shape_215.setTransform(412.75,-34.35);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#FFFFFF").s().p("AgbAmQgHgIgBgRIAAg6IAQAAIAAA6QAAAUARAAQAQAAAGgNIAAhBIAQAAIAABZIgPAAIgBgJQgIALgRAAQgOAAgIgIg");
	this.shape_216.setTransform(400.55,-34.2);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#FFFFFF").s().p("AgCAzQgGgHAAgLIAAg3IgPAAIAAgMIAPAAIAAgWIAPAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFACADQACADAGAAIAHgBIAAAMQgFACgGAAQgLAAgEgGg");
	this.shape_217.setTransform(375.55,-35.275);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgJgEgFQgFgFgKAAQgJAAgGAGQgFAEgBAJIAAA7IgPAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgPAAIAAhZIAOAAIAAAJQALgLAQAAQAUAAAFAOQAFgGAHgEQAHgEAKAAQAeAAABAfIAAA8g");
	this.shape_218.setTransform(335,-34.35);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAPAAIAABagAgGgtQgCgDAAgEQAAgDACgDQACgDAEAAQAFAAACADQACADAAADQAAAEgCADQgCACgFAAQgEAAgCgCg");
	this.shape_219.setTransform(325.4,-35.925);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAOIgIAAQgOAAgFANIAAA/g");
	this.shape_220.setTransform(320.85,-34.35);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#FFFFFF").s().p("AgCAzQgFgHgBgLIAAg3IgQAAIAAgMIAQAAIAAgWIAPAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFACADQADADAFAAIAIgBIAAAMQgHACgGAAQgKAAgEgGg");
	this.shape_221.setTransform(305.5,-35.275);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgVIAAgBQAAgTAKgNQAJgNAQAAQAPABAKAKIAAgvIAPAAIAAB/IgOAAIgBgJQgJALgQAAQgQAAgJgNgAgPgFQgHAHABASQgBAPAHAIQAGAJALAAQAOAAAHgNIAAgpQgHgMgOAAQgLAAgGAJg");
	this.shape_222.setTransform(293.75,-36.1);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_223.setTransform(280.225,-34.35);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgVIAAgBQAAgTAKgNQAJgNARAAQAOABAKAKIAAgvIAPAAIAAB/IgOAAIgBgJQgJALgPAAQgRAAgJgNgAgQgFQgFAHAAASQAAAPAFAIQAHAJAKAAQAPAAAHgNIAAgpQgHgMgPAAQgKAAgHAJg");
	this.shape_224.setTransform(261.15,-36.1);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgJgFgFQgEgFgLAAQgIAAgFAGQgHAEAAAJIAAA7IgPAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgQAAIAAhZIAPAAIABAJQAJgLASAAQASAAAHAOQAEgGAHgEQAHgEAKAAQAeAAAAAfIAAA8g");
	this.shape_225.setTransform(678.75,-66.3);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAOIgIAAQgOAAgFANIAAA/g");
	this.shape_226.setTransform(668.8,-66.3);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#FFFFFF").s().p("AgRArQgIgEgGgHQgEgHAAgIIAQAAQAAAIAFAFQAHAEAIAAQAJAAAFgDQAFgEAAgGQAAgGgEgDQgFgEgLgCQgMgDgGgDQgIgDgCgFQgEgFAAgGQAAgLAJgIQAKgIAOAAQAPAAAKAIQAJAIAAAMIgQAAQAAgGgFgEQgGgFgHAAQgIAAgFAEQgEADAAAGQAAAGAEADQAEACALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAIQgJAHgQAAQgKAAgIgEg");
	this.shape_227.setTransform(642.45,-66.225);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_228.setTransform(624.575,-66.3);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAOIgIAAQgOAAgFANIAAA/g");
	this.shape_229.setTransform(599.4,-66.3);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#FFFFFF").s().p("AgbAmQgHgIAAgRIAAg6IAPAAIAAA6QAAAUAQAAQARAAAGgNIAAhBIAQAAIAABZIgPAAIgBgJQgJALgQAAQgPAAgHgIg");
	this.shape_230.setTransform(582.05,-66.15);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_231.setTransform(549.875,-66.3);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgJgFgFQgEgFgKAAQgJAAgGAGQgFAEgCAJIAAA7IgOAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgQAAIAAhZIAPAAIAAAJQALgLARAAQASAAAHAOQAEgGAHgEQAHgEAKAAQAeAAAAAfIAAA8g");
	this.shape_232.setTransform(528.65,-66.3);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_233.setTransform(507.675,-66.3);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#FFFFFF").s().p("AgCAzQgGgHABgLIAAg3IgQAAIAAgMIAQAAIAAgWIAOAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFADADQACADAFAAIAHgBIAAAMQgFACgHAAQgKAAgEgGg");
	this.shape_234.setTransform(490.7,-67.225);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_235.setTransform(483.425,-66.3);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#FFFFFF").s().p("AgQBOIAAgMIAHABQAFAAADgDQABgDAAgGIAAhlIAQAAIAABkQAAAagXAAQgFAAgEgCgAABhAQgBgCAAgEQAAgDABgDQACgDAFAAQAEAAADADQACADAAADQAAAEgCACQgDADgEAAQgFAAgCgDg");
	this.shape_236.setTransform(466.475,-66.05);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_237.setTransform(451.825,-66.3);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgJgEgFQgFgFgLAAQgIAAgGAGQgFAEgBAJIAAA7IgPAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgPAAIAAhZIAOAAIAAAJQAKgLARAAQAUAAAFAOQAFgGAHgEQAHgEAKAAQAeAAABAfIAAA8g");
	this.shape_238.setTransform(435.45,-66.3);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#FFFFFF").s().p("AgCAzQgGgHAAgLIAAg3IgPAAIAAgMIAPAAIAAgWIAPAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFACADQADADAFAAIAHgBIAAAMQgFACgGAAQgLAAgEgGg");
	this.shape_239.setTransform(385.1,-67.225);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#FFFFFF").s().p("AAlA9IgMggIgxAAIgMAgIgQAAIAuh5IANAAIAuB5gAgUAQIApAAIgVg4g");
	this.shape_240.setTransform(363.6,-67.775);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_241.setTransform(340.025,-66.3);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_242.setTransform(321.275,-66.3);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#FFFFFF").s().p("AgSA8QgKgFgFgHIAIgJQAKAMAPAAQAKAAAGgGQAHgGAAgMIAAgIQgKALgPAAQgQAAgJgNQgKgNAAgVQAAgVAKgMQAJgNAQAAQAQAAAJAMIABgKIAOAAIAABXQAAASgKAKQgLAKgRAAQgJAAgJgEgAgPgpQgHAJAAARQAAAPAHAIQAGAJAKAAQAPAAAHgNIAAgpQgIgNgOAAQgKAAgGAJg");
	this.shape_243.setTransform(618.475,-128.375);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_244.setTransform(593.025,-131.975);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_245.setTransform(445.875,-131.975);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#FFFFFF").s().p("AgSA8QgKgFgFgHIAIgJQAKAMAPAAQAKAAAGgGQAHgGAAgMIAAgIQgKALgPAAQgQAAgJgNQgKgNAAgVQAAgVAKgMQAJgNAQAAQAQAAAJAMIABgKIAOAAIAABXQAAASgKAKQgLAKgRAAQgJAAgJgEgAgPgpQgHAJAAARQAAAPAHAIQAGAJAKAAQAPAAAHgNIAAgpQgIgNgOAAQgKAAgGAJg");
	this.shape_246.setTransform(347.325,-128.375);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#FFFFFF").s().p("AgSA8QgKgFgFgHIAIgJQAKAMAPAAQAKAAAGgGQAHgGAAgMIAAgIQgKALgPAAQgQAAgJgNQgKgNAAgVQAAgVAKgMQAJgNAQAAQAQAAAJAMIABgKIAOAAIAABXQAAASgKAKQgLAKgRAAQgJAAgJgEgAgPgpQgHAJAAARQAAAPAHAIQAGAJAKAAQAPAAAHgNIAAgpQgIgNgOAAQgKAAgGAJg");
	this.shape_247.setTransform(685.875,-160.325);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_248.setTransform(660.375,-163.925);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAPAAIAABagAgGgtQgCgDAAgEQAAgDACgDQACgDAEAAQAFAAACADQACADAAADQAAAEgCADQgCACgFAAQgEAAgCgCg");
	this.shape_249.setTransform(656.25,-163.675);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_250.setTransform(634.325,-162.025);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_251.setTransform(619.225,-162.025);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#FFFFFF").s().p("AgaAjQgLgNAAgVIAAgCQAAgNAFgKQAFgKAJgGQAJgGALAAQAPAAAKAJQAKAJABAPIgPAAQAAgJgGgFQgGgGgJAAQgLAAgGAIQgHAJAAAQIAAACQAAAPAHAJQAGAIALAAQAIAAAHgFQAGgFAAgHIAPAAQAAAIgFAHQgFAHgIAEQgJAEgJAAQgRAAgLgMg");
	this.shape_252.setTransform(610.225,-162.025);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_253.setTransform(567.325,-162.025);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_254.setTransform(535.775,-162.025);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_255.setTransform(529.025,-163.925);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_256.setTransform(421.725,-162.025);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_257.setTransform(403.025,-162.025);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_258.setTransform(360.025,-162.025);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_259.setTransform(325.375,-162.025);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_260.setTransform(298.925,-163.925);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_261.setTransform(289.375,-162.025);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_262.setTransform(282.625,-163.925);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_263.setTransform(276.175,-162.025);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_264.setTransform(691.825,-195.825);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_265.setTransform(682.225,-193.925);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#FFFFFF").s().p("AglA/IAAh8IAOAAIABAKQAJgLAQAAQAQAAAKAMQAJAMAAAWIAAACQAAATgJANQgKAMgQAAQgPAAgKgKIAAArgAgWglIAAAqQAHANAPAAQAKAAAGgJQAHgJAAgQQAAgPgHgJQgGgJgLAAQgOAAgHAMg");
	this.shape_266.setTransform(642.775,-192.275);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_267.setTransform(633.125,-193.925);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAPAAIAABagAgGgtQgCgDAAgEQAAgDACgDQACgDAEAAQAFAAACADQACADAAADQAAAEgCADQgCACgFAAQgEAAgCgCg");
	this.shape_268.setTransform(605.3,-195.575);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_269.setTransform(567.375,-193.925);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_270.setTransform(537.575,-193.925);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_271.setTransform(506.625,-193.925);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAOAAIAABagAgGgtQgCgDAAgEQAAgDACgDQADgDADAAQAEAAACADQADADAAADQAAAEgDADQgCACgEAAQgDAAgDgCg");
	this.shape_272.setTransform(494,-195.575);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_273.setTransform(472.875,-193.925);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAOAAIAABagAgGgtQgCgDAAgEQAAgDACgDQADgDADAAQAEAAACADQADADAAADQAAAEgDADQgCACgEAAQgDAAgDgCg");
	this.shape_274.setTransform(449.9,-195.575);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_275.setTransform(435.225,-195.825);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#FFFFFF").s().p("AglA/IAAh8IAOAAIABAKQAJgLAQAAQAQAAAKAMQAJAMAAAWIAAACQAAATgJANQgKAMgQAAQgPAAgKgKIAAArgAgWglIAAAqQAHANAPAAQAKAAAGgJQAHgJAAgQQAAgPgHgJQgGgJgLAAQgOAAgHAMg");
	this.shape_276.setTransform(391.075,-192.275);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_277.setTransform(381.725,-193.925);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_278.setTransform(304.325,-193.925);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_279.setTransform(289.225,-193.925);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#FFFFFF").s().p("AgaAjQgLgNAAgVIAAgCQAAgNAFgKQAFgKAJgGQAJgGALAAQAPAAAKAJQAKAJABAPIgPAAQAAgJgGgFQgGgGgJAAQgLAAgGAIQgHAJAAAQIAAACQAAAPAHAJQAGAIALAAQAIAAAHgFQAGgFAAgHIAPAAQAAAIgFAHQgFAHgIAEQgJAEgJAAQgRAAgLgMg");
	this.shape_280.setTransform(280.225,-193.925);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_281.setTransform(271.275,-193.925);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgKgEgEQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_282.setTransform(392.975,29.45);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgKgEgEQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_283.setTransform(318.875,29.45);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#FFFFFF").s().p("AgWA1IgBAKIgOAAIAAh/IAPAAIAAAwQAKgMAPAAQARAAAJANQAJAMAAAVIAAABQAAAVgJAMQgKANgQAAQgQAAgJgMgAgWAAIAAAmQAHAOAPAAQALAAAGgJQAGgIAAgSQAAgPgGgIQgGgJgLABQgPAAgHAOg");
	this.shape_284.setTransform(300.525,27.7);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgKgEgEQgFgFgLAAQgIAAgFAGQgHAEAAAJIAAA7IgPAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgQAAIAAhZIAPAAIABAKQAJgMASAAQASAAAHAOQAEgGAHgEQAHgEAKAAQAeAAAAAfIAAA8g");
	this.shape_285.setTransform(288.05,29.45);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgKgFgEQgEgFgKAAQgJAAgFAGQgGAEgCAJIAAA7IgOAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgQAAIAAhZIAPAAIAAAKQALgMAQAAQATAAAHAOQAEgGAHgEQAHgEAKAAQAeAAAAAfIAAA8g");
	this.shape_286.setTransform(264.05,29.45);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgKgEgEQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_287.setTransform(690.775,-2.5);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAOAAIAABagAgGgtQgCgDAAgEQAAgDACgDQADgDADAAQAEAAACADQADADAAADQAAAEgDADQgCACgEAAQgEAAgCgCg");
	this.shape_288.setTransform(674.65,-4.075);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f("#FFFFFF").s().p("AgbA0QgKgMAAgWIAAgBQAAgTAKgNQAKgNAPAAQAQABAIAKIAAgvIAQAAIAAB/IgOAAIgBgJQgJALgQAAQgPAAgKgNgAgPgFQgHAHAAARQAAAQAHAIQAGAJALAAQAOAAAGgNIAAgpQgGgMgOAAQgLAAgGAJg");
	this.shape_289.setTransform(667.55,-4.25);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#FFFFFF").s().p("AgbAmQgIgIAAgRIAAg6IAQAAIAAA6QAAAUAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIAAgJQgKALgQAAQgPAAgHgIg");
	this.shape_290.setTransform(658.25,-2.35);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgKgEgEQgFgFgLAAQgIAAgGAGQgFAEgBAJIAAA7IgPAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgPAAIAAhZIAOAAIAAAKQAKgMARAAQAUAAAFAOQAFgGAHgEQAHgEAKAAQAeAAABAfIAAA8g");
	this.shape_291.setTransform(646.05,-2.5);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#FFFFFF").s().p("AgdAiQgLgNAAgVIAAAAQAAgNAFgLQAFgKAKgGQAJgGALAAQASAAAMANQALANAAAUIAAABQAAANgFALQgFAKgJAGQgKAGgMAAQgRAAgMgNgAgSgYQgHAJAAAQQAAAPAHAJQAHAJALAAQAMAAAHgJQAHgJAAgQQAAgPgHgJQgHgJgMAAQgLAAgHAJg");
	this.shape_292.setTransform(586.525,-2.425);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f("#FFFFFF").s().p("AgbAmQgIgIAAgRIAAg6IAQAAIAAA6QAAAUAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIAAgJQgKALgQAAQgPAAgHgIg");
	this.shape_293.setTransform(568.25,-2.35);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgKgEgEQgFgFgLAAQgIAAgGAGQgFAEgBAJIAAA7IgPAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgPAAIAAhZIAOAAIAAAKQAKgMARAAQAUAAAFAOQAFgGAHgEQAHgEAKAAQAeAAABAfIAAA8g");
	this.shape_294.setTransform(556.05,-2.5);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgKgEgEQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_295.setTransform(532.475,-2.5);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#FFFFFF").s().p("AgbAmQgHgIgBgRIAAg6IAQAAIAAA6QAAAUARAAQAQAAAGgNIAAhBIAQAAIAABZIgPAAIgBgJQgIALgRAAQgOAAgIgIg");
	this.shape_296.setTransform(490,-2.35);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgKgEgEQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_297.setTransform(457.825,-2.5);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgKgFgEQgEgFgKAAQgJAAgGAGQgGAEgBAJIAAA7IgOAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgPAAIAAhZIAOAAIAAAKQALgMAQAAQAUAAAFAOQAFgGAHgEQAHgEAKAAQAeAAABAfIAAA8g");
	this.shape_298.setTransform(436.6,-2.5);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgKgEgEQgFgFgKAAQgJAAgGAGQgFAEgBAJIAAA7IgPAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgPAAIAAhZIAOAAIAAAKQAKgMARAAQAUAAAFAOQAFgGAHgEQAHgEAKAAQAeAAABAfIAAA8g");
	this.shape_299.setTransform(410.25,-2.5);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#FFFFFF").s().p("AgbAmQgIgIAAgRIAAg6IAQAAIAAA6QAAAUARAAQAQAAAGgNIAAhBIAPAAIAABZIgOAAIAAgJQgKALgQAAQgPAAgHgIg");
	this.shape_300.setTransform(398.05,-2.35);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f("#FFFFFF").s().p("AgCAzQgFgHgBgLIAAg3IgQAAIAAgMIAQAAIAAgWIAPAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFACADQADADAFAAIAIgBIAAAMIgNACQgKAAgEgGg");
	this.shape_301.setTransform(373,-3.425);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgKgEgEQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_302.setTransform(337.375,-2.5);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgKgFgEQgEgFgLAAQgIAAgFAGQgHAEAAAJIAAA7IgPAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgQAAIAAhZIAPAAIABAKQAJgMASAAQASAAAHAOQAEgGAHgEQAHgEAKAAQAeAAAAAfIAAA8g");
	this.shape_303.setTransform(306.6,-2.5);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#FFFFFF").s().p("AgWA1IgBAKIgOAAIAAh/IAPAAIAAAwQAKgMAPAAQARAAAJANQAJAMAAAVIAAABQAAAVgJAMQgKANgQAAQgQAAgJgMgAgWAAIAAAmQAHAOAPAAQALAAAGgJQAGgIAAgSQAAgPgGgIQgGgJgLABQgPAAgHAOg");
	this.shape_304.setTransform(261.525,-4.25);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f("#FFFFFF").s().p("AgCAzQgFgHAAgLIAAg3IgRAAIAAgMIARAAIAAgWIAOAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFADADQACADAFAAIAIgBIAAAMQgGACgHAAQgKAAgEgGg");
	this.shape_305.setTransform(692.4,-35.275);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f("#FFFFFF").s().p("AgRArQgJgEgFgHQgEgHAAgIIAQAAQAAAIAFAFQAHAEAIAAQAIAAAGgDQAGgEgBgGQAAgGgEgDQgFgEgLgCQgMgDgGgDQgIgDgCgFQgEgFAAgGQAAgLAJgIQAKgIANAAQAQAAAKAIQAJAIAAAMIgQAAQAAgGgFgEQgFgFgJAAQgHAAgFAEQgEADgBAGQABAGAEADQAEACALADQAMADAGADQAIADAEAFQADAFAAAHQAAAMgKAIQgJAHgQAAQgKAAgIgEg");
	this.shape_306.setTransform(666.85,-34.275);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f("#FFFFFF").s().p("AgrA9IAAh5IAsAAQAUAAAMAKQALALAAAQQAAASgLAJQgLAJgVAAIgcAAIAAAwgAgbAAIAcAAQANAAAHgFQAHgGAAgMQAAgKgHgHQgHgGgMgBIgdAAg");
	this.shape_307.setTransform(620.025,-35.825);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f("#FFFFFF").s().p("AgGAHQgCgDgBgEQABgDACgDQACgCAEAAQAFAAADACQABADAAADQAAAEgBADQgDACgFAAQgEAAgCgCg");
	this.shape_308.setTransform(602.7,-30.575);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f("#FFFFFF").s().p("AgbA/IgFgBIAAgNIADABQAJAAAEgDQAEgEADgIIAEgJIghhYIARAAIAWBCIAVhCIARAAIglBnQgHAXgTgBg");
	this.shape_309.setTransform(587.25,-32.45);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f("#FFFFFF").s().p("AgbAmQgHgIgBgRIAAg6IAQAAIAAA6QAAAUARAAQAQAAAGgNIAAhBIAQAAIAABZIgPAAIgBgJQgIALgRAAQgOAAgIgIg");
	this.shape_310.setTransform(410.45,-34.2);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f("#FFFFFF").s().p("AgCAzQgGgHABgLIAAg3IgQAAIAAgMIAQAAIAAgWIAOAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFADADQABADAGAAIAHgBIAAAMQgGACgFAAQgLAAgEgGg");
	this.shape_311.setTransform(310.5,-35.275);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgVIAAgBQAAgTAKgNQAJgNARAAQAPABAIAKIAAgvIAQAAIAAB/IgOAAIgBgJQgJALgPAAQgRAAgJgNgAgQgFQgFAHgBASQABAPAFAIQAHAJAKAAQAPAAAGgNIAAgpQgGgMgPAAQgKAAgHAJg");
	this.shape_312.setTransform(298.75,-36.1);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAOIgIAAQgOAAgFANIAAA/g");
	this.shape_313.setTransform(599.4,-66.3);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIAAAKQAHgMAOAAIAHABIAAAOIgHAAQgPAAgGANIAAA/g");
	this.shape_314.setTransform(278.5,-66.3);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAPAAIAABagAgGgtQgCgDAAgEQAAgDACgDQADgDADAAQAFAAABADQADADAAADQAAAEgDADQgBACgFAAQgDAAgDgCg");
	this.shape_315.setTransform(551,-131.725);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_316.setTransform(462.175,-131.975);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_317.setTransform(381.875,-131.975);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f("#FFFFFF").s().p("AgSA8QgKgFgFgHIAIgJQAKAMAPAAQAKAAAGgGQAHgGAAgMIAAgIQgKALgPAAQgQAAgJgNQgKgNAAgVQAAgVAKgMQAJgNAQAAQAQAAAJAMIABgKIAOAAIAABXQAAASgKAKQgLAKgRAAQgJAAgJgEgAgPgpQgHAJAAARQAAAPAHAIQAGAJAKAAQAPAAAHgNIAAgpQgIgNgOAAQgKAAgGAJg");
	this.shape_318.setTransform(685.875,-160.325);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_319.setTransform(660.375,-163.925);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f("#FFFFFF").s().p("AgSArQgIgEgFgHQgEgHAAgIIAPAAQABAIAGAFQAFAEAJAAQAIAAAGgDQAFgEABgGQAAgGgGgDQgEgEgLgCQgLgDgIgDQgHgDgDgFQgDgFAAgGQAAgLAKgIQAJgIAOAAQAPAAAJAIQAKAIAAAMIgPAAQAAgGgGgEQgGgFgHAAQgIAAgFAEQgFADABAGQgBAGAFADQAEACALADQALADAIADQAHADADAFQAEAFAAAHQAAAMgKAIQgKAHgPAAQgKAAgJgEg");
	this.shape_320.setTransform(592.2,-162.025);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_321.setTransform(558.975,-163.925);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_322.setTransform(535.775,-162.025);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_323.setTransform(529.025,-163.925);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAPAAIAABagAgGgtQgCgDAAgEQAAgDACgDQADgDADAAQAFAAABADQADADAAADQAAAEgDADQgBACgFAAQgDAAgDgCg");
	this.shape_324.setTransform(481.25,-163.675);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_325.setTransform(455.675,-162.025);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f("#FFFFFF").s().p("AgRArQgIgEgGgHQgEgHAAgIIAPAAQABAIAFAFQAHAEAIAAQAIAAAGgDQAFgEAAgGQABgGgGgDQgEgEgLgCQgMgDgGgDQgHgDgEgFQgDgFAAgGQAAgLAJgIQAKgIAOAAQAPAAAKAIQAJAIAAAMIgPAAQgBgGgFgEQgGgFgHAAQgIAAgFAEQgFADABAGQgBAGAFADQAEACALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAIQgKAHgPAAQgKAAgIgEg");
	this.shape_326.setTransform(446.6,-162.025);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_327.setTransform(421.725,-162.025);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_328.setTransform(403.025,-162.025);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_329.setTransform(360.025,-162.025);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_330.setTransform(325.375,-162.025);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_331.setTransform(317.025,-163.925);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_332.setTransform(298.925,-163.925);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_333.setTransform(289.375,-162.025);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_334.setTransform(282.625,-163.925);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_335.setTransform(276.175,-162.025);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_336.setTransform(691.825,-195.825);

	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_337.setTransform(682.225,-193.925);

	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_338.setTransform(633.125,-193.925);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f("#FFFFFF").s().p("AgdAiQgLgNAAgVIAAAAQAAgNAFgLQAFgKAKgGQAJgGALAAQASAAAMANQALANAAAUIAAABQAAANgFALQgFAKgJAGQgKAGgMAAQgRAAgMgNgAgSgYQgHAJAAAQQAAAPAHAJQAHAJALAAQAMAAAHgJQAHgJAAgQQAAgPgHgJQgHgJgMAAQgLAAgHAJg");
	this.shape_339.setTransform(588.675,-193.925);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_340.setTransform(567.375,-193.925);

	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_341.setTransform(537.575,-193.925);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_342.setTransform(506.625,-193.925);

	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_343.setTransform(472.875,-193.925);

	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_344.setTransform(435.225,-195.825);

	this.shape_345 = new cjs.Shape();
	this.shape_345.graphics.f("#FFFFFF").s().p("AgdAiQgLgNAAgVIAAAAQAAgNAFgLQAFgKAKgGQAJgGALAAQASAAAMANQALANAAAUIAAABQAAANgFALQgFAKgJAGQgKAGgMAAQgRAAgMgNgAgSgYQgHAJAAAQQAAAPAHAJQAHAJALAAQAMAAAHgJQAHgJAAgQQAAgPgHgJQgHgJgMAAQgLAAgHAJg");
	this.shape_345.setTransform(406.375,-193.925);

	this.shape_346 = new cjs.Shape();
	this.shape_346.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_346.setTransform(381.725,-193.925);

	this.shape_347 = new cjs.Shape();
	this.shape_347.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_347.setTransform(304.325,-193.925);

	this.shape_348 = new cjs.Shape();
	this.shape_348.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_348.setTransform(289.225,-193.925);

	this.shape_349 = new cjs.Shape();
	this.shape_349.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_349.setTransform(271.275,-193.925);

	this.shape_350 = new cjs.Shape();
	this.shape_350.graphics.f("#FFFFFF").s().p("AgGAHQgCgDAAgEQAAgDACgDQADgCADAAQAFAAADACQACADAAADQAAAEgCADQgDACgFAAQgDAAgDgCg");
	this.shape_350.setTransform(578,65.125);

	this.shape_351 = new cjs.Shape();
	this.shape_351.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgKgEgEQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_351.setTransform(557.625,61.35);

	this.shape_352 = new cjs.Shape();
	this.shape_352.graphics.f("#FFFFFF").s().p("AAwAuIAAg6QAAgLgFgEQgEgFgKAAQgJAAgFAFQgGAFgCAJIAAA7IgOAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgQAAIAAhaIAPAAIAAAKQALgLAQAAQATAAAHAPQAEgHAHgEQAHgEAKAAQAeAAAAAgIAAA7g");
	this.shape_352.setTransform(541.25,61.35);

	this.shape_353 = new cjs.Shape();
	this.shape_353.graphics.f("#FFFFFF").s().p("AgbA1QgKgOAAgUIAAgBQAAgUAKgNQAJgMARAAQAPAAAIALIAAgwIAQAAIAACAIgOAAIgBgKQgJALgPAAQgRAAgJgMgAgQgFQgFAHgBASQABAOAFAKQAHAIAKAAQAPAAAGgNIAAgpQgGgNgPAAQgKAAgHAKg");
	this.shape_353.setTransform(419.35,59.6);

	this.shape_354 = new cjs.Shape();
	this.shape_354.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgKgEgEQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_354.setTransform(405.825,61.35);

	this.shape_355 = new cjs.Shape();
	this.shape_355.graphics.f("#FFFFFF").s().p("AAwAuIAAg6QAAgLgEgEQgFgFgLAAQgIAAgGAFQgFAFgBAJIAAA7IgPAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgPAAIAAhaIAOAAIAAAKQAKgLARAAQAUAAAFAPQAFgHAHgEQAHgEAKAAQAeAAABAgIAAA7g");
	this.shape_355.setTransform(374.7,61.35);

	this.shape_356 = new cjs.Shape();
	this.shape_356.graphics.f("#FFFFFF").s().p("AgbA1QgKgOAAgUIAAgBQAAgUAKgNQAJgMAQAAQAPAAAKALIAAgwIAPAAIAACAIgOAAIgBgKQgJALgQAAQgQAAgJgMgAgPgFQgHAHABASQgBAOAHAKQAGAIALAAQAOAAAHgNIAAgpQgHgNgOAAQgLAAgGAKg");
	this.shape_356.setTransform(345.05,59.6);

	this.shape_357 = new cjs.Shape();
	this.shape_357.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgKgEgEQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_357.setTransform(331.475,61.35);

	this.shape_358 = new cjs.Shape();
	this.shape_358.graphics.f("#FFFFFF").s().p("AgbA1QgKgOAAgUIAAgBQAAgUAKgNQAKgMAPAAQAQAAAIALIAAgwIAQAAIAACAIgOAAIgBgKQgJALgQAAQgPAAgKgMgAgPgFQgHAHAAASQAAAOAHAKQAGAIALAAQAOAAAGgNIAAgpQgGgNgOAAQgLAAgGAKg");
	this.shape_358.setTransform(312.4,59.6);

	this.shape_359 = new cjs.Shape();
	this.shape_359.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgKgEgEQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_359.setTransform(289.575,61.35);

	this.shape_360 = new cjs.Shape();
	this.shape_360.graphics.f("#FFFFFF").s().p("AgCAzQgFgHgBgLIAAg3IgQAAIAAgMIAQAAIAAgWIAPAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFACADQACADAGAAIAIgBIAAAMIgNACQgKAAgEgGg");
	this.shape_360.setTransform(277.7,60.425);

	this.shape_361 = new cjs.Shape();
	this.shape_361.graphics.f("#FFFFFF").s().p("AgWA1IgBALIgOAAIAAiAIAPAAIAAAwQAKgMAPABQARAAAJAMQAJANAAAUIAAACQAAAUgJANQgKAMgQAAQgQAAgJgMgAgWAAIAAAmQAHAOAPAAQALAAAGgIQAGgJAAgRQAAgQgGgIQgGgIgLgBQgPAAgHAPg");
	this.shape_361.setTransform(261.525,59.6);

	this.shape_362 = new cjs.Shape();
	this.shape_362.graphics.f("#FFFFFF").s().p("AgbA0QgKgMAAgWIAAgBQAAgTAKgNQAJgNARAAQAPABAIAKIAAgvIAQAAIAAB/IgOAAIgBgJQgJALgPAAQgRAAgJgNgAgQgFQgFAHgBARQABAQAFAIQAHAJAKAAQAPAAAGgNIAAgpQgGgMgPAAQgKAAgHAJg");
	this.shape_362.setTransform(659.2,27.7);

	this.shape_363 = new cjs.Shape();
	this.shape_363.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAOIgHAAQgPAAgFANIAAA/g");
	this.shape_363.setTransform(642.4,29.45);

	this.shape_364 = new cjs.Shape();
	this.shape_364.graphics.f("#FFFFFF").s().p("AgCAzQgGgHAAgLIAAg3IgPAAIAAgMIAPAAIAAgWIAPAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFACADQACADAGAAIAHgBIAAAMIgLACQgLAAgEgGg");
	this.shape_364.setTransform(604.15,28.525);

	this.shape_365 = new cjs.Shape();
	this.shape_365.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgKgFgEQgEgFgKAAQgJAAgGAGQgFAEgCAJIAAA7IgOAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgPAAIAAhZIAOAAIAAAKQALgMAQAAQAUAAAFAOQAFgGAHgEQAHgEAKAAQAeAAABAfIAAA8g");
	this.shape_365.setTransform(455.05,29.45);

	this.shape_366 = new cjs.Shape();
	this.shape_366.graphics.f("#FFFFFF").s().p("AgUA6QgLgFgGgJQgGgIAAgKIAQAAQAAALAIAGQAIAHANAAQANgBAGgFQAHgFAAgJQAAgIgGgFQgGgFgQgFQgUgGgKgIQgJgIAAgNQAAgPALgJQAMgKARAAQANAAAJAGQAKAEAGAJQAFAIAAAKIgQAAQAAgLgHgGQgHgGgNAAQgLAAgGAFQgHAFAAAKQAAAHAGAFQAHAFAOAEQAPAFAJAEQAIAFAEAHQAEAHAAAJQAAAPgLAJQgMAIgTABQgMgBgKgEg");
	this.shape_366.setTransform(418.125,27.95);

	this.shape_367 = new cjs.Shape();
	this.shape_367.graphics.f("#FFFFFF").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgCADAAQAFAAACACQACADABADQgBAEgCADQgCACgFAAQgDAAgDgCg");
	this.shape_367.setTransform(403.2,33.225);

	this.shape_368 = new cjs.Shape();
	this.shape_368.graphics.f("#FFFFFF").s().p("AgbAmQgIgIAAgRIAAg6IAQAAIAAA6QAAAUARAAQAQAAAGgNIAAhBIAPAAIAABZIgOAAIAAgJQgKALgQAAQgPAAgHgIg");
	this.shape_368.setTransform(398.05,-2.35);

	this.shape_369 = new cjs.Shape();
	this.shape_369.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIAAAKQAHgMAOAAIAHABIAAAOIgHAAQgPAAgGANIAAA/g");
	this.shape_369.setTransform(278.5,-2.5);

	this.shape_370 = new cjs.Shape();
	this.shape_370.graphics.f("#FFFFFF").s().p("AgWA1IgBAKIgOAAIAAh/IAPAAIAAAwQAKgMAPAAQARAAAJANQAJAMAAAVIAAABQAAAVgJAMQgKANgQAAQgQAAgJgMgAgWAAIAAAmQAHAOAPAAQALAAAGgJQAGgIAAgSQAAgPgGgIQgGgJgLABQgPAAgHAOg");
	this.shape_370.setTransform(261.525,-4.25);

	this.shape_371 = new cjs.Shape();
	this.shape_371.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAOIgIAAQgOAAgFANIAAA/g");
	this.shape_371.setTransform(668.8,-66.3);

	this.shape_372 = new cjs.Shape();
	this.shape_372.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAOIgIAAQgOAAgFANIAAA/g");
	this.shape_372.setTransform(599.4,-66.3);

	this.shape_373 = new cjs.Shape();
	this.shape_373.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIAAAKQAHgMAOAAIAHABIAAAOIgHAAQgPAAgGANIAAA/g");
	this.shape_373.setTransform(278.5,-66.3);

	this.shape_374 = new cjs.Shape();
	this.shape_374.graphics.f("#FFFFFF").s().p("AglA/IAAh8IAOAAIABAKQAJgLAQAAQAQAAAKAMQAJAMAAAWIAAACQAAATgJANQgKAMgQAAQgPAAgKgKIAAArgAgWglIAAAqQAHANAPAAQAKAAAGgJQAHgJAAgQQAAgPgHgJQgGgJgLAAQgOAAgHAMg");
	this.shape_374.setTransform(319.025,-96.475);

	this.shape_375 = new cjs.Shape();
	this.shape_375.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAPAAIAABagAgGgtQgCgDAAgEQAAgDACgDQADgDADAAQAFAAABADQADADAAADQAAAEgDADQgBACgFAAQgDAAgDgCg");
	this.shape_375.setTransform(551,-131.725);

	this.shape_376 = new cjs.Shape();
	this.shape_376.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_376.setTransform(439.425,-130.075);

	this.shape_377 = new cjs.Shape();
	this.shape_377.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAOAAIAABagAgGgtQgCgDAAgEQAAgDACgDQACgDAEAAQAEAAACADQADADAAADQAAAEgDADQgCACgEAAQgEAAgCgCg");
	this.shape_377.setTransform(331.2,-131.725);

	this.shape_378 = new cjs.Shape();
	this.shape_378.graphics.f("#FFFFFF").s().p("AgSA8QgKgFgFgHIAIgJQAKAMAPAAQAKAAAGgGQAHgGAAgMIAAgIQgKALgPAAQgQAAgJgNQgKgNAAgVQAAgVAKgMQAJgNAQAAQAQAAAJAMIABgKIAOAAIAABXQAAASgKAKQgLAKgRAAQgJAAgJgEgAgPgpQgHAJAAARQAAAPAHAIQAGAJAKAAQAPAAAHgNIAAgpQgIgNgOAAQgKAAgGAJg");
	this.shape_378.setTransform(685.875,-160.325);

	this.shape_379 = new cjs.Shape();
	this.shape_379.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_379.setTransform(660.375,-163.925);

	this.shape_380 = new cjs.Shape();
	this.shape_380.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_380.setTransform(601.275,-162.025);

	this.shape_381 = new cjs.Shape();
	this.shape_381.graphics.f("#FFFFFF").s().p("AgSArQgIgEgFgHQgEgHAAgIIAPAAQABAIAGAFQAFAEAJAAQAIAAAGgDQAFgEABgGQAAgGgGgDQgEgEgLgCQgLgDgIgDQgHgDgDgFQgDgFAAgGQAAgLAKgIQAJgIAOAAQAPAAAJAIQAKAIAAAMIgPAAQAAgGgGgEQgGgFgHAAQgIAAgFAEQgFADABAGQgBAGAFADQAEACALADQALADAIADQAHADADAFQAEAFAAAHQAAAMgKAIQgKAHgPAAQgKAAgJgEg");
	this.shape_381.setTransform(592.2,-162.025);

	this.shape_382 = new cjs.Shape();
	this.shape_382.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAOAAIAABagAgGgtQgCgDAAgEQAAgDACgDQACgDAEAAQAEAAACADQADADAAADQAAAEgDADQgCACgEAAQgEAAgCgCg");
	this.shape_382.setTransform(542.5,-163.675);

	this.shape_383 = new cjs.Shape();
	this.shape_383.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_383.setTransform(529.025,-163.925);

	this.shape_384 = new cjs.Shape();
	this.shape_384.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_384.setTransform(522.575,-162.025);

	this.shape_385 = new cjs.Shape();
	this.shape_385.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAPAAIAABagAgGgtQgCgDAAgEQAAgDACgDQADgDADAAQAFAAABADQADADAAADQAAAEgDADQgBACgFAAQgDAAgDgCg");
	this.shape_385.setTransform(481.25,-163.675);

	this.shape_386 = new cjs.Shape();
	this.shape_386.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_386.setTransform(455.675,-162.025);

	this.shape_387 = new cjs.Shape();
	this.shape_387.graphics.f("#FFFFFF").s().p("AgRArQgIgEgGgHQgEgHAAgIIAPAAQABAIAFAFQAHAEAIAAQAIAAAGgDQAFgEAAgGQABgGgGgDQgEgEgLgCQgMgDgGgDQgHgDgEgFQgDgFAAgGQAAgLAJgIQAKgIAOAAQAPAAAKAIQAJAIAAAMIgPAAQgBgGgFgEQgGgFgHAAQgIAAgFAEQgFADABAGQgBAGAFADQAEACALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAIQgKAHgPAAQgKAAgIgEg");
	this.shape_387.setTransform(446.6,-162.025);

	this.shape_388 = new cjs.Shape();
	this.shape_388.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_388.setTransform(403.025,-162.025);

	this.shape_389 = new cjs.Shape();
	this.shape_389.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_389.setTransform(360.025,-162.025);

	this.shape_390 = new cjs.Shape();
	this.shape_390.graphics.f("#FFFFFF").s().p("AglA/IAAh8IAOAAIABAKQAJgLAQAAQAQAAAKAMQAJAMAAAWIAAACQAAATgJANQgKAMgQAAQgPAAgKgKIAAArgAgWglIAAAqQAHANAPAAQAKAAAGgJQAHgJAAgQQAAgPgHgJQgGgJgLAAQgOAAgHAMg");
	this.shape_390.setTransform(350.825,-160.375);

	this.shape_391 = new cjs.Shape();
	this.shape_391.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_391.setTransform(325.375,-162.025);

	this.shape_392 = new cjs.Shape();
	this.shape_392.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_392.setTransform(317.025,-163.925);

	this.shape_393 = new cjs.Shape();
	this.shape_393.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_393.setTransform(298.925,-163.925);

	this.shape_394 = new cjs.Shape();
	this.shape_394.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_394.setTransform(289.375,-162.025);

	this.shape_395 = new cjs.Shape();
	this.shape_395.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_395.setTransform(282.625,-163.925);

	this.shape_396 = new cjs.Shape();
	this.shape_396.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_396.setTransform(276.175,-162.025);

	this.shape_397 = new cjs.Shape();
	this.shape_397.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_397.setTransform(691.825,-195.825);

	this.shape_398 = new cjs.Shape();
	this.shape_398.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_398.setTransform(682.225,-193.925);

	this.shape_399 = new cjs.Shape();
	this.shape_399.graphics.f("#FFFFFF").s().p("AglA/IAAh8IAOAAIABAKQAJgLAQAAQAQAAAKAMQAJAMAAAWIAAACQAAATgJANQgKAMgQAAQgPAAgKgKIAAArgAgWglIAAAqQAHANAPAAQAKAAAGgJQAHgJAAgQQAAgPgHgJQgGgJgLAAQgOAAgHAMg");
	this.shape_399.setTransform(642.775,-192.275);

	this.shape_400 = new cjs.Shape();
	this.shape_400.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_400.setTransform(633.125,-193.925);

	this.shape_401 = new cjs.Shape();
	this.shape_401.graphics.f("#FFFFFF").s().p("AgCAzQgFgHgBgLIAAg3IgQAAIAAgMIAQAAIAAgWIAPAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFACADQACADAGAAIAIgBIAAAMIgMACQgLAAgEgGg");
	this.shape_401.setTransform(609.9,-194.925);

	this.shape_402 = new cjs.Shape();
	this.shape_402.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_402.setTransform(567.375,-193.925);

	this.shape_403 = new cjs.Shape();
	this.shape_403.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_403.setTransform(537.575,-193.925);

	this.shape_404 = new cjs.Shape();
	this.shape_404.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_404.setTransform(506.625,-193.925);

	this.shape_405 = new cjs.Shape();
	this.shape_405.graphics.f("#FFFFFF").s().p("AgRArQgJgEgFgHQgEgHAAgIIAPAAQABAIAFAFQAGAEAJAAQAIAAAGgDQAFgEABgGQAAgGgGgDQgEgEgLgCQgLgDgIgDQgGgDgEgFQgDgFAAgGQAAgLAKgIQAJgIAOAAQAPAAAJAIQAKAIAAAMIgPAAQgBgGgFgEQgGgFgHAAQgIAAgFAEQgFADABAGQgBAGAFADQAFACAKADQALADAIADQAHADADAFQAEAFAAAHQAAAMgKAIQgKAHgPAAQgKAAgIgEg");
	this.shape_405.setTransform(487.45,-193.925);

	this.shape_406 = new cjs.Shape();
	this.shape_406.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_406.setTransform(472.875,-193.925);

	this.shape_407 = new cjs.Shape();
	this.shape_407.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAOAAIAABagAgGgtQgCgDAAgEQAAgDACgDQADgDADAAQAEAAACADQADADAAADQAAAEgDADQgCACgEAAQgDAAgDgCg");
	this.shape_407.setTransform(449.9,-195.575);

	this.shape_408 = new cjs.Shape();
	this.shape_408.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_408.setTransform(435.225,-195.825);

	this.shape_409 = new cjs.Shape();
	this.shape_409.graphics.f("#FFFFFF").s().p("AgdAiQgLgNAAgVIAAAAQAAgNAFgLQAFgKAKgGQAJgGALAAQASAAAMANQALANAAAUIAAABQAAANgFALQgFAKgJAGQgKAGgMAAQgRAAgMgNgAgSgYQgHAJAAAQQAAAPAHAJQAHAJALAAQAMAAAHgJQAHgJAAgQQAAgPgHgJQgHgJgMAAQgLAAgHAJg");
	this.shape_409.setTransform(406.375,-193.925);

	this.shape_410 = new cjs.Shape();
	this.shape_410.graphics.f("#FFFFFF").s().p("AglA/IAAh8IAOAAIABAKQAJgLAQAAQAQAAAKAMQAJAMAAAWIAAACQAAATgJANQgKAMgQAAQgPAAgKgKIAAArgAgWglIAAAqQAHANAPAAQAKAAAGgJQAHgJAAgQQAAgPgHgJQgGgJgLAAQgOAAgHAMg");
	this.shape_410.setTransform(391.075,-192.275);

	this.shape_411 = new cjs.Shape();
	this.shape_411.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_411.setTransform(381.725,-193.925);

	this.shape_412 = new cjs.Shape();
	this.shape_412.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_412.setTransform(304.325,-193.925);

	this.shape_413 = new cjs.Shape();
	this.shape_413.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_413.setTransform(289.225,-193.925);

	this.shape_414 = new cjs.Shape();
	this.shape_414.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_414.setTransform(271.275,-193.925);

	this.shape_415 = new cjs.Shape();
	this.shape_415.graphics.f("#FFFFFF").s().p("AgGAHQgDgDAAgEQAAgDADgDQACgCAEAAQAFAAACACQACADABADQgBAEgCADQgCACgFAAQgEAAgCgCg");
	this.shape_415.setTransform(644.4,97.075);

	this.shape_416 = new cjs.Shape();
	this.shape_416.graphics.f("#FFFFFF").s().p("AAwAuIAAg6QAAgLgEgEQgFgFgLAAQgIAAgFAFQgHAFAAAJIAAA7IgPAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgPAAIAAhaIAOAAIABAKQAJgLASAAQATAAAFAPQAFgHAHgEQAHgEAKAAQAeAAAAAgIAAA7g");
	this.shape_416.setTransform(625.45,93.3);

	this.shape_417 = new cjs.Shape();
	this.shape_417.graphics.f("#FFFFFF").s().p("AgbAmQgIgJAAgQIAAg6IAQAAIAAA5QAAAVARAAQAQAAAGgNIAAhBIAPAAIAABaIgOAAIAAgJQgKAKgQAAQgPAAgHgIg");
	this.shape_417.setTransform(516.4,93.45);

	this.shape_418 = new cjs.Shape();
	this.shape_418.graphics.f("#FFFFFF").s().p("AgWA1IgBALIgOAAIAAiAIAPAAIAAAwQAKgMAPABQARAAAJAMQAJANAAAUIAAACQAAAUgJANQgKAMgQAAQgQAAgJgMgAgWAAIAAAmQAHAOAPAAQALAAAGgIQAGgJAAgRQAAgQgGgIQgGgIgLAAQgPAAgHAOg");
	this.shape_418.setTransform(507.075,91.55);

	this.shape_419 = new cjs.Shape();
	this.shape_419.graphics.f("#FFFFFF").s().p("AgbA1QgKgOAAgUIAAgBQAAgUAKgNQAJgMARAAQAOAAAKALIAAgwIAPAAIAACAIgOAAIgBgKQgJALgPAAQgRAAgJgMgAgQgFQgFAHAAASQAAAOAFAKQAHAIAKAAQAPAAAHgNIAAgpQgHgNgPABQgKgBgHAKg");
	this.shape_419.setTransform(492.9,91.55);

	this.shape_420 = new cjs.Shape();
	this.shape_420.graphics.f("#FFFFFF").s().p("AAwAuIAAg6QAAgLgEgEQgFgFgLAAQgIAAgFAFQgHAFAAAJIAAA7IgPAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgQAAIAAhaIAPAAIABAKQAJgLASAAQASAAAHAPQAEgHAHgEQAHgEAKAAQAeAAAAAgIAAA7g");
	this.shape_420.setTransform(435.65,93.3);

	this.shape_421 = new cjs.Shape();
	this.shape_421.graphics.f("#FFFFFF").s().p("AgbAmQgIgJABgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABaIgOAAIAAgJQgJAKgRAAQgPAAgHgIg");
	this.shape_421.setTransform(423.45,93.45);

	this.shape_422 = new cjs.Shape();
	this.shape_422.graphics.f("#FFFFFF").s().p("AgFAtIgghZIAPAAIAWBEIAXhEIAPAAIggBZg");
	this.shape_422.setTransform(395.325,93.375);

	this.shape_423 = new cjs.Shape();
	this.shape_423.graphics.f("#FFFFFF").s().p("AgbA1QgKgOAAgUIAAgBQAAgUAKgNQAJgMARAAQAOAAAKALIAAgwIAPAAIAACAIgOAAIgBgKQgJALgPAAQgRAAgJgMgAgQgFQgFAHAAASQAAAOAFAKQAHAIAKAAQAPAAAHgNIAAgpQgHgNgPABQgKgBgHAKg");
	this.shape_423.setTransform(352.95,91.55);

	this.shape_424 = new cjs.Shape();
	this.shape_424.graphics.f("#FFFFFF").s().p("AgbAmQgIgJAAgQIAAg6IAQAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABaIgOAAIAAgJQgJAKgRAAQgPAAgHgIg");
	this.shape_424.setTransform(296.9,93.45);

	this.shape_425 = new cjs.Shape();
	this.shape_425.graphics.f("#FFFFFF").s().p("AgbA1QgKgOAAgUIAAgBQAAgUAKgNQAJgMARAAQAOAAAKALIAAgwIAPAAIAACAIgOAAIgBgKQgJALgPAAQgRAAgJgMgAgQgFQgFAHAAASQAAAOAFAKQAHAIAKAAQAPAAAHgNIAAgpQgHgNgPABQgKgBgHAKg");
	this.shape_425.setTransform(261.15,91.55);

	this.shape_426 = new cjs.Shape();
	this.shape_426.graphics.f("#FFFFFF").s().p("AgaA/IgHgBIAAgMIAFAAQAHAAAFgDQAFgEACgIIADgJIgfhZIAQAAIAWBEIAVhEIAQAAIgkBoQgIAWgSAAg");
	this.shape_426.setTransform(663.15,63.25);

	this.shape_427 = new cjs.Shape();
	this.shape_427.graphics.f("#FFFFFF").s().p("AAwAuIAAg6QAAgLgEgEQgFgFgKAAQgJAAgGAFQgFAFgBAJIAAA7IgPAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgPAAIAAhaIAOAAIAAAKQALgLAQAAQAUAAAFAPQAFgHAHgEQAHgEAKAAQAeAAABAgIAAA7g");
	this.shape_427.setTransform(643.7,61.35);

	this.shape_428 = new cjs.Shape();
	this.shape_428.graphics.f("#FFFFFF").s().p("AgbAmQgIgJAAgQIAAg6IAQAAIAAA5QAAAVARAAQAQAAAGgNIAAhBIAPAAIAABaIgOAAIgBgJQgIAKgRAAQgPAAgHgIg");
	this.shape_428.setTransform(631.5,61.5);

	this.shape_429 = new cjs.Shape();
	this.shape_429.graphics.f("#FFFFFF").s().p("AgFAtIgghZIAPAAIAWBEIAXhEIAPAAIggBZg");
	this.shape_429.setTransform(622.675,61.425);

	this.shape_430 = new cjs.Shape();
	this.shape_430.graphics.f("#FFFFFF").s().p("AgYA4QgLgIgHgNQgGgNAAgRIAAgIQAAgRAGgNQAGgOALgHQAMgIANABQAPgBALAIQALAHAGAOQAGANAAARIAAAHQAAASgGANQgGANgLAIQgLAGgPAAQgNAAgLgGgAgXgkQgJAMAAAUIAAAIQAAAVAJAMQAJAMAOAAQAQAAAIgLQAJgLAAgWIAAgIQAAgWgJgLQgIgMgQAAQgOAAgJAMg");
	this.shape_430.setTransform(612.675,59.85);

	this.shape_431 = new cjs.Shape();
	this.shape_431.graphics.f("#FFFFFF").s().p("AAwAuIAAg6QAAgLgFgEQgEgFgKAAQgJAAgGAFQgFAFgCAJIAAA7IgOAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgQAAIAAhaIAPAAIAAAKQALgLAQAAQATAAAHAPQAEgHAHgEQAHgEAKAAQAeAAABAgIAAA7g");
	this.shape_431.setTransform(559.8,61.35);

	this.shape_432 = new cjs.Shape();
	this.shape_432.graphics.f("#FFFFFF").s().p("AgVAuIAAhaIAPAAIAAALQAHgMAOAAIAHABIAAAPIgHgBQgPAAgGANIAAA/g");
	this.shape_432.setTransform(450.95,61.35);

	this.shape_433 = new cjs.Shape();
	this.shape_433.graphics.f("#FFFFFF").s().p("AgbA1QgKgOAAgUIAAgBQAAgUAKgNQAJgMARAAQAPAAAIALIAAgwIAQAAIAACAIgOAAIgBgKQgJALgPAAQgRAAgJgMgAgPgFQgGAHgBASQABAOAGAKQAGAIAKAAQAPAAAGgNIAAgpQgGgNgPAAQgKAAgGAKg");
	this.shape_433.setTransform(430.5,59.6);

	this.shape_434 = new cjs.Shape();
	this.shape_434.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgKgEgEQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_434.setTransform(413.225,61.35);

	this.shape_435 = new cjs.Shape();
	this.shape_435.graphics.f("#FFFFFF").s().p("AAwAuIAAg6QAAgLgFgEQgEgFgKAAQgJAAgGAFQgFAFgCAJIAAA7IgOAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgPAAIAAhaIAOAAIAAAKQALgLAQAAQAUAAAFAPQAFgHAHgEQAHgEAKAAQAeAAABAgIAAA7g");
	this.shape_435.setTransform(382.15,61.35);

	this.shape_436 = new cjs.Shape();
	this.shape_436.graphics.f("#FFFFFF").s().p("AgRArQgIgEgGgHQgEgHAAgIIAPAAQABAIAFAFQAHAEAIAAQAIAAAGgDQAFgEABgGQAAgGgGgDQgEgEgLgCQgMgDgGgDQgHgDgEgFQgDgFAAgGQAAgLAJgIQAKgIAOAAQAPAAAKAIQAJAIAAAMIgPAAQgBgGgFgEQgGgFgHAAQgIAAgFAEQgFADABAGQgBAGAFADQAEACALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAIQgKAHgPAAQgKAAgIgEg");
	this.shape_436.setTransform(366.05,61.425);

	this.shape_437 = new cjs.Shape();
	this.shape_437.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgKgEgEQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_437.setTransform(335.175,61.35);

	this.shape_438 = new cjs.Shape();
	this.shape_438.graphics.f("#FFFFFF").s().p("AgbA1QgKgOAAgUIAAgBQAAgUAKgNQAKgMAPAAQAQAAAIALIAAgwIAQAAIAACAIgOAAIgBgKQgJALgQAAQgPAAgKgMgAgPgFQgHAHAAASQAAAOAHAKQAGAIALAAQAOAAAGgNIAAgpQgGgNgOAAQgLAAgGAKg");
	this.shape_438.setTransform(316.1,59.6);

	this.shape_439 = new cjs.Shape();
	this.shape_439.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgKgEgEQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_439.setTransform(289.575,61.35);

	this.shape_440 = new cjs.Shape();
	this.shape_440.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAOAAIAABagAgGgtQgCgDAAgEQAAgDACgDQADgDADAAQAEAAACADQADADAAADQAAAEgDADQgCACgEAAQgEAAgCgCg");
	this.shape_440.setTransform(674.65,-4.075);

	this.shape_441 = new cjs.Shape();
	this.shape_441.graphics.f("#FFFFFF").s().p("AgSArQgIgEgEgHQgFgHAAgIIAQAAQAAAIAFAFQAHAEAIAAQAIAAAGgDQAGgEgBgGQAAgGgEgDQgFgEgLgCQgLgDgHgDQgIgDgCgFQgEgFAAgGQAAgLAJgIQAKgIANAAQAQAAAKAIQAJAIAAAMIgQAAQAAgGgFgEQgFgFgJAAQgHAAgFAEQgEADgBAGQABAGAEADQAEACALADQAMADAGADQAIADAEAFQADAFAAAHQAAAMgKAIQgJAHgQAAQgKAAgJgEg");
	this.shape_441.setTransform(582.35,-130.075);

	this.shape_442 = new cjs.Shape();
	this.shape_442.graphics.f("#FFFFFF").s().p("AgSA8QgKgFgFgHIAIgJQAKAMAPAAQAKAAAGgGQAHgGAAgMIAAgIQgKALgPAAQgQAAgJgNQgKgNAAgVQAAgVAKgMQAJgNAQAAQAQAAAJAMIABgKIAOAAIAABXQAAASgKAKQgLAKgRAAQgJAAgJgEgAgPgpQgHAJAAARQAAAPAHAIQAGAJAKAAQAPAAAHgNIAAgpQgIgNgOAAQgKAAgGAJg");
	this.shape_442.setTransform(685.875,-160.325);

	this.shape_443 = new cjs.Shape();
	this.shape_443.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAOAAIAABagAgGgtQgCgDAAgEQAAgDACgDQACgDAEAAQAEAAACADQADADAAADQAAAEgDADQgCACgEAAQgEAAgCgCg");
	this.shape_443.setTransform(542.5,-163.675);

	this.shape_444 = new cjs.Shape();
	this.shape_444.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_444.setTransform(529.025,-163.925);

	this.shape_445 = new cjs.Shape();
	this.shape_445.graphics.f("#FFFFFF").s().p("AgRArQgIgEgGgHQgEgHAAgIIAPAAQABAIAFAFQAHAEAIAAQAIAAAGgDQAFgEAAgGQABgGgGgDQgEgEgLgCQgMgDgGgDQgHgDgEgFQgDgFAAgGQAAgLAJgIQAKgIAOAAQAPAAAKAIQAJAIAAAMIgPAAQgBgGgFgEQgGgFgHAAQgIAAgFAEQgFADABAGQgBAGAFADQAEACALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAIQgKAHgPAAQgKAAgIgEg");
	this.shape_445.setTransform(446.6,-162.025);

	this.shape_446 = new cjs.Shape();
	this.shape_446.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAh/IAQAAIAAAxQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_446.setTransform(412.425,-163.925);

	this.shape_447 = new cjs.Shape();
	this.shape_447.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_447.setTransform(403.025,-162.025);

	this.shape_448 = new cjs.Shape();
	this.shape_448.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_448.setTransform(325.375,-162.025);

	this.shape_449 = new cjs.Shape();
	this.shape_449.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_449.setTransform(298.925,-163.925);

	this.shape_450 = new cjs.Shape();
	this.shape_450.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_450.setTransform(289.375,-162.025);

	this.shape_451 = new cjs.Shape();
	this.shape_451.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_451.setTransform(282.625,-163.925);

	this.shape_452 = new cjs.Shape();
	this.shape_452.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_452.setTransform(691.825,-195.825);

	this.shape_453 = new cjs.Shape();
	this.shape_453.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_453.setTransform(682.225,-193.925);

	this.shape_454 = new cjs.Shape();
	this.shape_454.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAOAAIAABagAgGgtQgCgDAAgEQAAgDACgDQADgDADAAQAEAAACADQADADAAADQAAAEgDADQgCACgEAAQgDAAgDgCg");
	this.shape_454.setTransform(649.45,-195.575);

	this.shape_455 = new cjs.Shape();
	this.shape_455.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_455.setTransform(633.125,-193.925);

	this.shape_456 = new cjs.Shape();
	this.shape_456.graphics.f("#FFFFFF").s().p("AgdAiQgLgNAAgVIAAAAQAAgNAFgLQAFgKAKgGQAJgGALAAQASAAAMANQALANAAAUIAAABQAAANgFALQgFAKgJAGQgKAGgMAAQgRAAgMgNgAgSgYQgHAJAAAQQAAAPAHAJQAHAJALAAQAMAAAHgJQAHgJAAgQQAAgPgHgJQgHgJgMAAQgLAAgHAJg");
	this.shape_456.setTransform(588.675,-193.925);

	this.shape_457 = new cjs.Shape();
	this.shape_457.graphics.f("#FFFFFF").s().p("AgVAuIAAhaIAPAAIAAALQAHgMAOAAIAHABIAAAPIgHgBQgPAAgGANIAAA/g");
	this.shape_457.setTransform(581.35,-194);

	this.shape_458 = new cjs.Shape();
	this.shape_458.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_458.setTransform(567.375,-193.925);

	this.shape_459 = new cjs.Shape();
	this.shape_459.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAh/IAQAAIAAAxQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_459.setTransform(528.275,-195.825);

	this.shape_460 = new cjs.Shape();
	this.shape_460.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_460.setTransform(506.625,-193.925);

	this.shape_461 = new cjs.Shape();
	this.shape_461.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAOAAIAABagAgGgtQgCgDAAgEQAAgDACgDQADgDADAAQAEAAACADQADADAAADQAAAEgDADQgCACgEAAQgDAAgDgCg");
	this.shape_461.setTransform(494,-195.575);

	this.shape_462 = new cjs.Shape();
	this.shape_462.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_462.setTransform(472.875,-193.925);

	this.shape_463 = new cjs.Shape();
	this.shape_463.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAOAAIAABagAgGgtQgCgDAAgEQAAgDACgDQADgDADAAQAEAAACADQADADAAADQAAAEgDADQgCACgEAAQgDAAgDgCg");
	this.shape_463.setTransform(449.9,-195.575);

	this.shape_464 = new cjs.Shape();
	this.shape_464.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_464.setTransform(435.225,-195.825);

	this.shape_465 = new cjs.Shape();
	this.shape_465.graphics.f("#FFFFFF").s().p("AgdAiQgLgNAAgVIAAAAQAAgNAFgLQAFgKAKgGQAJgGALAAQASAAAMANQALANAAAUIAAABQAAANgFALQgFAKgJAGQgKAGgMAAQgRAAgMgNgAgSgYQgHAJAAAQQAAAPAHAJQAHAJALAAQAMAAAHgJQAHgJAAgQQAAgPgHgJQgHgJgMAAQgLAAgHAJg");
	this.shape_465.setTransform(406.375,-193.925);

	this.shape_466 = new cjs.Shape();
	this.shape_466.graphics.f("#FFFFFF").s().p("AglA/IAAh8IAOAAIABAKQAJgLAQAAQAQAAAKAMQAJAMAAAWIAAACQAAATgJANQgKAMgQAAQgPAAgKgKIAAArgAgWglIAAAqQAHANAPAAQAKAAAGgJQAHgJAAgQQAAgPgHgJQgGgJgLAAQgOAAgHAMg");
	this.shape_466.setTransform(391.075,-192.275);

	this.shape_467 = new cjs.Shape();
	this.shape_467.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_467.setTransform(381.725,-193.925);

	this.shape_468 = new cjs.Shape();
	this.shape_468.graphics.f("#FFFFFF").s().p("AgVAuIAAhaIAPAAIAAALQAHgMAOAAIAHABIAAAPIgIgBQgOAAgGANIAAA/g");
	this.shape_468.setTransform(374.6,-194);

	this.shape_469 = new cjs.Shape();
	this.shape_469.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_469.setTransform(304.325,-193.925);

	this.shape_470 = new cjs.Shape();
	this.shape_470.graphics.f("#FFFFFF").s().p("AgVAuIAAhaIAPAAIABALQAGgMAOAAIAHABIAAAPIgHgBQgPAAgFANIAAA/g");
	this.shape_470.setTransform(297.25,-194);

	this.shape_471 = new cjs.Shape();
	this.shape_471.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_471.setTransform(289.225,-193.925);

	this.shape_472 = new cjs.Shape();
	this.shape_472.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_472.setTransform(271.275,-193.925);

	this.shape_473 = new cjs.Shape();
	this.shape_473.graphics.f("#FFFFFF").s().p("AgGAHQgDgDABgEQgBgDADgDQADgCADAAQAFAAADACQACADAAADQAAAEgCADQgDACgFAAQgDAAgDgCg");
	this.shape_473.setTransform(632.55,128.975);

	this.shape_474 = new cjs.Shape();
	this.shape_474.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgKgFgEQgEgFgKAAQgJAAgGAGQgFAEgCAJIAAA7IgOAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgQAAIAAhZIAPAAIAAAKQALgMAQAAQATAAAGAOQAFgGAHgEQAHgEAKAAQAeAAABAfIAAA8g");
	this.shape_474.setTransform(572.4,125.2);

	this.shape_475 = new cjs.Shape();
	this.shape_475.graphics.f("#FFFFFF").s().p("AgbA0QgKgMAAgWIAAgBQAAgTAKgNQAJgMAQgBQAPAAAKALIAAgvIAPAAIAAB/IgOAAIgBgJQgJALgQAAQgQAAgJgNgAgQgGQgFAIAAARQAAAPAFAKQAHAIAKAAQAPAAAHgNIAAgoQgHgOgPAAQgKABgHAIg");
	this.shape_475.setTransform(537.1,123.45);

	this.shape_476 = new cjs.Shape();
	this.shape_476.graphics.f("#FFFFFF").s().p("AgbAmQgIgJAAgQIAAg6IAQAAIAAA6QAAAUARAAQAQAAAGgNIAAhBIAPAAIAABZIgOAAIAAgJQgKALgQAAQgPAAgHgIg");
	this.shape_476.setTransform(493,125.35);

	this.shape_477 = new cjs.Shape();
	this.shape_477.graphics.f("#FFFFFF").s().p("AgSArQgHgEgFgHQgFgHAAgIIAQAAQAAAIAGAFQAFAEAJAAQAIAAAGgDQAGgEgBgGQAAgGgEgDQgFgEgLgCQgMgDgHgDQgHgDgCgFQgEgFAAgGQAAgLAKgIQAJgIANAAQAQAAAJAIQAKAIAAAMIgQAAQABgGgGgEQgFgFgJAAQgHAAgFAEQgEADgBAGQABAGAEADQAFACAKADQALADAIADQAHADAEAFQADAFAAAHQAAAMgKAIQgKAHgPAAQgKAAgJgEg");
	this.shape_477.setTransform(483.9,125.275);

	this.shape_478 = new cjs.Shape();
	this.shape_478.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA6QAAAUARAAQAQAAAGgNIAAhBIAQAAIAABZIgPAAIgBgJQgIALgRAAQgOAAgIgIg");
	this.shape_478.setTransform(423.4,125.35);

	this.shape_479 = new cjs.Shape();
	this.shape_479.graphics.f("#FFFFFF").s().p("AgWA1IgBAKIgOAAIAAh/IAPAAIAAAwQAKgMAPAAQARABAJAMQAJAMAAAVIAAABQAAAVgJAMQgKANgQAAQgQAAgJgMgAgWAAIAAAmQAHAOAPAAQALAAAGgIQAGgJAAgSQAAgPgGgIQgGgJgLAAQgPAAgHAPg");
	this.shape_479.setTransform(414.075,123.45);

	this.shape_480 = new cjs.Shape();
	this.shape_480.graphics.f("#FFFFFF").s().p("AgbA0QgKgMAAgWIAAgBQAAgTAKgNQAJgMAQgBQAPAAAKALIAAgvIAPAAIAAB/IgOAAIgBgJQgJALgQAAQgQAAgJgNgAgPgGQgHAIABARQgBAPAHAKQAGAIALAAQAOAAAHgNIAAgoQgHgOgOAAQgLABgGAIg");
	this.shape_480.setTransform(399.95,123.45);

	this.shape_481 = new cjs.Shape();
	this.shape_481.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgKgEgEQgFgFgKAAQgJAAgGAGQgFAEgBAJIAAA7IgPAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgPAAIAAhZIAOAAIAAAKQALgMAQAAQAUAAAFAOQAFgGAHgEQAHgEAKAAQAeAAABAfIAAA8g");
	this.shape_481.setTransform(383.6,125.2);

	this.shape_482 = new cjs.Shape();
	this.shape_482.graphics.f("#FFFFFF").s().p("AgbAmQgIgJAAgQIAAg6IAQAAIAAA6QAAAUARAAQAQAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgIALgRAAQgPAAgHgIg");
	this.shape_482.setTransform(371.4,125.35);

	this.shape_483 = new cjs.Shape();
	this.shape_483.graphics.f("#FFFFFF").s().p("AgaA/IgHgBIAAgNIAFABQAHAAAFgDQAEgDADgJIADgJIgfhYIAQAAIAWBCIAVhCIAQAAIgkBnQgIAWgSABg");
	this.shape_483.setTransform(331.15,127.1);

	this.shape_484 = new cjs.Shape();
	this.shape_484.graphics.f("#FFFFFF").s().p("AgbAmQgHgJgBgQIAAg6IAQAAIAAA6QAAAUARAAQAQAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgIALgRAAQgOAAgIgIg");
	this.shape_484.setTransform(307.4,125.35);

	this.shape_485 = new cjs.Shape();
	this.shape_485.graphics.f("#FFFFFF").s().p("AgQBOIAAgMIAHABQAFAAADgDQABgCAAgIIAAhkIAQAAIAABkQAAAagXAAQgFAAgEgCgAABhAQgBgCAAgEQAAgDABgDQACgDAFAAQAEAAADADQACADAAADQAAAEgCACQgDADgEAAQgFAAgCgDg");
	this.shape_485.setTransform(299.775,125.45);

	this.shape_486 = new cjs.Shape();
	this.shape_486.graphics.f("#FFFFFF").s().p("AgUA6QgLgFgGgIQgGgJAAgKIAQAAQAAALAIAGQAIAHANgBQANAAAGgEQAHgGAAgJQAAgIgGgFQgGgFgQgFQgUgGgKgIQgJgJAAgMQAAgPALgJQAMgKARAAQANAAAJAGQAKAEAGAJQAFAIAAAKIgQAAQAAgLgHgGQgHgGgNAAQgLAAgGAFQgHAFAAAKQAAAHAGAFQAHAGAOADQAPAFAJAEQAIAFAEAHQAEAHAAAJQAAAPgLAJQgMAJgTAAQgMgBgKgEg");
	this.shape_486.setTransform(261.625,123.7);

	this.shape_487 = new cjs.Shape();
	this.shape_487.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAQAAIAABaIgPAAIgBgJQgJAKgQAAQgPAAgHgIg");
	this.shape_487.setTransform(548.75,93.45);

	this.shape_488 = new cjs.Shape();
	this.shape_488.graphics.f("#FFFFFF").s().p("AgFAtIgghZIAPAAIAWBEIAXhEIAPAAIggBZg");
	this.shape_488.setTransform(622.675,61.425);

	this.shape_489 = new cjs.Shape();
	this.shape_489.graphics.f("#FFFFFF").s().p("AgCAzQgGgHABgLIAAg3IgQAAIAAgMIAQAAIAAgWIAOAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFADADQACADAFAAIAHgBIAAAMIgMACQgKAAgEgGg");
	this.shape_489.setTransform(492.4,60.425);

	this.shape_490 = new cjs.Shape();
	this.shape_490.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgKgFgEQgEgFgKAAQgJAAgGAGQgFAEgCAJIAAA7IgOAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgPAAIAAhZIAOAAIAAAKQALgMAQAAQAUAAAFAOQAFgGAHgEQAHgEAKAAQAeAAABAfIAAA8g");
	this.shape_490.setTransform(455.05,29.45);

	this.shape_491 = new cjs.Shape();
	this.shape_491.graphics.f("#FFFFFF").s().p("AgdAiQgLgNAAgVIAAAAQAAgNAFgLQAFgKAKgGQAJgGALAAQASAAAMANQALANAAAUIAAABQAAANgFALQgFAKgJAGQgKAGgMAAQgRAAgMgNgAgSgYQgHAJAAAQQAAAPAHAJQAHAJALAAQAMAAAHgJQAHgJAAgQQAAgPgHgJQgHgJgMAAQgLAAgHAJg");
	this.shape_491.setTransform(586.525,-2.425);

	this.shape_492 = new cjs.Shape();
	this.shape_492.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgKgEgEQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_492.setTransform(532.475,-2.5);

	this.shape_493 = new cjs.Shape();
	this.shape_493.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgKgEgEQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_493.setTransform(457.825,-2.5);

	this.shape_494 = new cjs.Shape();
	this.shape_494.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgKgEgEQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_494.setTransform(337.375,-2.5);

	this.shape_495 = new cjs.Shape();
	this.shape_495.graphics.f("#FFFFFF").s().p("AgSArQgIgEgEgHQgFgHAAgIIAQAAQAAAIAFAFQAHAEAIAAQAIAAAGgDQAGgEgBgGQAAgGgEgDQgFgEgLgCQgLgDgHgDQgIgDgCgFQgEgFAAgGQAAgLAJgIQAKgIANAAQAQAAAKAIQAJAIAAAMIgQAAQABgGgGgEQgFgFgJAAQgHAAgFAEQgEADgBAGQABAGAEADQAEACALADQAMADAGADQAIADAEAFQADAFAAAHQAAAMgKAIQgJAHgQAAQgKAAgJgEg");
	this.shape_495.setTransform(285.35,-2.425);

	this.shape_496 = new cjs.Shape();
	this.shape_496.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAOAAIAABagAgGgtQgCgDAAgEQAAgDACgDQACgDAEAAQAEAAACADQADADAAADQAAAEgDADQgCACgEAAQgEAAgCgCg");
	this.shape_496.setTransform(588.85,-131.725);

	this.shape_497 = new cjs.Shape();
	this.shape_497.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAOAAIAABagAgGgtQgCgDAAgEQAAgDACgDQACgDAEAAQAEAAACADQADADAAADQAAAEgDADQgCACgEAAQgEAAgCgCg");
	this.shape_497.setTransform(331.2,-131.725);

	this.shape_498 = new cjs.Shape();
	this.shape_498.graphics.f("#FFFFFF").s().p("AgGAHQgDgDABgEQgBgDADgDQADgCADAAQAFAAADACQABADAAADQAAAEgBADQgDACgFAAQgDAAgDgCg");
	this.shape_498.setTransform(692.95,-158.325);

	this.shape_499 = new cjs.Shape();
	this.shape_499.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAOAAIAABagAgGgtQgCgDAAgEQAAgDACgDQACgDAEAAQAEAAACADQADADAAADQAAAEgDADQgCACgEAAQgEAAgCgCg");
	this.shape_499.setTransform(542.5,-163.675);

	this.shape_500 = new cjs.Shape();
	this.shape_500.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_500.setTransform(529.025,-163.925);

	this.shape_501 = new cjs.Shape();
	this.shape_501.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_501.setTransform(317.025,-163.925);

	this.shape_502 = new cjs.Shape();
	this.shape_502.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_502.setTransform(298.925,-163.925);

	this.shape_503 = new cjs.Shape();
	this.shape_503.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_503.setTransform(282.625,-163.925);

	this.shape_504 = new cjs.Shape();
	this.shape_504.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_504.setTransform(691.825,-195.825);

	this.shape_505 = new cjs.Shape();
	this.shape_505.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_505.setTransform(682.225,-193.925);

	this.shape_506 = new cjs.Shape();
	this.shape_506.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_506.setTransform(633.125,-193.925);

	this.shape_507 = new cjs.Shape();
	this.shape_507.graphics.f("#FFFFFF").s().p("AgdAiQgLgNAAgVIAAAAQAAgNAFgLQAFgKAKgGQAJgGALAAQASAAAMANQALANAAAUIAAABQAAANgFALQgFAKgJAGQgKAGgMAAQgRAAgMgNgAgSgYQgHAJAAAQQAAAPAHAJQAHAJALAAQAMAAAHgJQAHgJAAgQQAAgPgHgJQgHgJgMAAQgLAAgHAJg");
	this.shape_507.setTransform(588.675,-193.925);

	this.shape_508 = new cjs.Shape();
	this.shape_508.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_508.setTransform(567.375,-193.925);

	this.shape_509 = new cjs.Shape();
	this.shape_509.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAh/IAQAAIAAAxQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_509.setTransform(528.275,-195.825);

	this.shape_510 = new cjs.Shape();
	this.shape_510.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_510.setTransform(506.625,-193.925);

	this.shape_511 = new cjs.Shape();
	this.shape_511.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_511.setTransform(435.225,-195.825);

	this.shape_512 = new cjs.Shape();
	this.shape_512.graphics.f("#FFFFFF").s().p("AgdAiQgLgNAAgVIAAAAQAAgNAFgLQAFgKAKgGQAJgGALAAQASAAAMANQALANAAAUIAAABQAAANgFALQgFAKgJAGQgKAGgMAAQgRAAgMgNgAgSgYQgHAJAAAQQAAAPAHAJQAHAJALAAQAMAAAHgJQAHgJAAgQQAAgPgHgJQgHgJgMAAQgLAAgHAJg");
	this.shape_512.setTransform(406.375,-193.925);

	this.shape_513 = new cjs.Shape();
	this.shape_513.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_513.setTransform(381.725,-193.925);

	this.shape_514 = new cjs.Shape();
	this.shape_514.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_514.setTransform(304.325,-193.925);

	this.shape_515 = new cjs.Shape();
	this.shape_515.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_515.setTransform(289.225,-193.925);

	this.shape_516 = new cjs.Shape();
	this.shape_516.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_516.setTransform(271.275,-193.925);

	this.shape_517 = new cjs.Shape();
	this.shape_517.graphics.f("#FFFFFF").s().p("AgWA1IgBALIgOAAIAAiAIAPAAIAAAwQAKgMAPAAQARAAAJANQAJANAAAUIAAACQAAAUgJAMQgKANgQAAQgQAAgJgMgAgWAAIAAAmQAHAOAPAAQALAAAGgJQAGgIAAgRQAAgQgGgIQgGgIgLAAQgPAAgHAOg");
	this.shape_517.setTransform(459.875,187.3);

	this.shape_518 = new cjs.Shape();
	this.shape_518.graphics.f("#FFFFFF").s().p("AgbAmQgHgIgBgRIAAg6IAQAAIAAA5QAAAVARAAQAQAAAGgNIAAhBIAPAAIAABaIgOAAIgBgJQgIAKgRAAQgOAAgIgIg");
	this.shape_518.setTransform(446,189.2);

	this.shape_519 = new cjs.Shape();
	this.shape_519.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgUAKgNQAKgNAPAAQAQAAAIAMIAAgwIAQAAIAACAIgOAAIgBgKQgJALgQAAQgPAAgKgNgAgPgFQgHAHAAASQAAAPAHAIQAGAJALAAQAOAAAGgNIAAgpQgGgNgOABQgLgBgGAKg");
	this.shape_519.setTransform(436.25,187.3);

	this.shape_520 = new cjs.Shape();
	this.shape_520.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgUAKgNQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAACAIgOAAIgBgKQgJALgPAAQgQAAgKgNgAgQgFQgFAHAAASQAAAPAFAIQAHAJAKAAQAPAAAHgNIAAgpQgHgNgPABQgKgBgHAKg");
	this.shape_520.setTransform(410,187.3);

	this.shape_521 = new cjs.Shape();
	this.shape_521.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAOAAIAABagAgGgtQgCgDAAgEQAAgDACgDQACgDAEAAQAFAAACADQACADAAADQAAAEgCADQgCACgFAAQgEAAgCgCg");
	this.shape_521.setTransform(393.9,187.475);

	this.shape_522 = new cjs.Shape();
	this.shape_522.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgUAKgNQAJgNARAAQAPAAAIAMIAAgwIAQAAIAACAIgOAAIgBgKQgJALgPAAQgRAAgJgNgAgQgFQgFAHgBASQABAPAFAIQAHAJAKAAQAPAAAGgNIAAgpQgGgNgPABQgKgBgHAKg");
	this.shape_522.setTransform(378.4,187.3);

	this.shape_523 = new cjs.Shape();
	this.shape_523.graphics.f("#FFFFFF").s().p("AgQBPIAAgNIAHABQAFAAADgDQABgDAAgGIAAhlIAQAAIAABkQAAAagXAAQgFAAgEgBgAABg/QgBgDAAgEQAAgEABgCQACgDAFAAQAEAAADADQACACAAAEQAAAEgCADQgDACgEAAQgFAAgCgCg");
	this.shape_523.setTransform(361.575,189.3);

	this.shape_524 = new cjs.Shape();
	this.shape_524.graphics.f("#FFFFFF").s().p("AAwAuIAAg6QAAgKgEgFQgFgFgLAAQgIAAgFAGQgHAEAAAJIAAA7IgPAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgQAAIAAhaIAPAAIABAKQAJgLASAAQASAAAHAPQAEgHAHgEQAHgEAKAAQAeAAAAAfIAAA8g");
	this.shape_524.setTransform(334.4,189.05);

	this.shape_525 = new cjs.Shape();
	this.shape_525.graphics.f("#FFFFFF").s().p("AgCAzQgGgHABgLIAAg3IgQAAIAAgMIAQAAIAAgWIAOAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFADADQACADAFAAIAHgBIAAAMIgLACQgLAAgEgGg");
	this.shape_525.setTransform(301.6,188.125);

	this.shape_526 = new cjs.Shape();
	this.shape_526.graphics.f("#FFFFFF").s().p("AAwAuIAAg6QAAgKgFgFQgEgFgKAAQgJAAgFAGQgGAEgCAJIAAA7IgOAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgQAAIAAhaIAPAAIAAAKQALgLAQAAQATAAAHAPQAEgHAHgEQAHgEAKAAQAeAAAAAfIAAA8g");
	this.shape_526.setTransform(264.05,189.05);

	this.shape_527 = new cjs.Shape();
	this.shape_527.graphics.f("#FFFFFF").s().p("AgbA0QgKgMAAgWIAAgBQAAgTAKgNQAJgNAQABQAPgBAKALIAAgvIAPAAIAAB/IgOAAIgBgJQgJALgQAAQgQAAgJgNgAgPgGQgHAIABARQgBAPAHAJQAGAJALAAQAOAAAHgNIAAgoQgHgOgOAAQgLABgGAIg");
	this.shape_527.setTransform(671.75,155.4);

	this.shape_528 = new cjs.Shape();
	this.shape_528.graphics.f("#FFFFFF").s().p("AgbAmQgHgJgBgQIAAg6IAQAAIAAA6QAAAUARAAQAQAAAGgNIAAhBIAQAAIAABZIgPAAIgBgJQgIALgRAAQgOAAgIgIg");
	this.shape_528.setTransform(576.4,157.3);

	this.shape_529 = new cjs.Shape();
	this.shape_529.graphics.f("#FFFFFF").s().p("AgWA1IgBAKIgOAAIAAh/IAPAAIAAAwQAKgMAPABQARgBAJANQAJAMAAAVIAAABQAAAVgJAMQgKANgQAAQgQAAgJgMgAgWAAIAAAmQAHAOAPAAQALAAAGgJQAGgIAAgSQAAgPgGgIQgGgJgLAAQgPAAgHAPg");
	this.shape_529.setTransform(567.125,155.4);

	this.shape_530 = new cjs.Shape();
	this.shape_530.graphics.f("#FFFFFF").s().p("AgbAmQgIgJAAgQIAAg6IAQAAIAAA6QAAAUAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIAAgJQgKALgQAAQgPAAgHgIg");
	this.shape_530.setTransform(557.45,157.3);

	this.shape_531 = new cjs.Shape();
	this.shape_531.graphics.f("#FFFFFF").s().p("AgCAzQgFgHAAgLIAAg3IgRAAIAAgMIARAAIAAgWIAOAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFADADQACADAFAAIAIgBIAAAMIgNACQgKAAgEgGg");
	this.shape_531.setTransform(549.75,156.225);

	this.shape_532 = new cjs.Shape();
	this.shape_532.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAOAAIAABagAgGgtQgCgDAAgEQAAgDACgDQACgDAEAAQAFAAACADQACADAAADQAAAEgCADQgCACgFAAQgEAAgCgCg");
	this.shape_532.setTransform(532.05,155.575);

	this.shape_533 = new cjs.Shape();
	this.shape_533.graphics.f("#FFFFFF").s().p("AgbA0QgKgMAAgWIAAgBQAAgTAKgNQAJgNARABQAPgBAIALIAAgvIAQAAIAAB/IgOAAIgBgJQgJALgPAAQgRAAgJgNgAgQgGQgFAIgBARQABAPAFAJQAHAJAKAAQAPAAAGgNIAAgoQgGgOgPAAQgKABgHAIg");
	this.shape_533.setTransform(509.8,155.4);

	this.shape_534 = new cjs.Shape();
	this.shape_534.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA6QAAAUAQAAQARAAAGgNIAAhBIAQAAIAABZIgPAAIgBgJQgJALgQAAQgPAAgHgIg");
	this.shape_534.setTransform(472.25,157.3);

	this.shape_535 = new cjs.Shape();
	this.shape_535.graphics.f("#FFFFFF").s().p("AgWA1IgBAKIgOAAIAAh/IAPAAIAAAwQAKgMAPABQARgBAJANQAJAMAAAVIAAABQAAAVgJAMQgKANgQAAQgQAAgJgMgAgWAAIAAAmQAHAOAPAAQALAAAGgJQAGgIAAgSQAAgPgGgIQgGgJgLAAQgPAAgHAPg");
	this.shape_535.setTransform(261.525,155.4);

	this.shape_536 = new cjs.Shape();
	this.shape_536.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA6QAAAUAQAAQARAAAGgNIAAhBIAQAAIAABZIgPAAIAAgJQgKALgQAAQgPAAgHgIg");
	this.shape_536.setTransform(684.65,125.35);

	this.shape_537 = new cjs.Shape();
	this.shape_537.graphics.f("#FFFFFF").s().p("AgHA9IAAhsIgnAAIAAgNIBdAAIAAANIgnAAIAABsg");
	this.shape_537.setTransform(661.65,123.725);

	this.shape_538 = new cjs.Shape();
	this.shape_538.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgKgEgEQgFgFgLAAQgIAAgFAGQgHAEgBAJIAAA7IgOAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgQAAIAAhZIAPAAIABAKQAJgMASAAQASAAAHAOQAEgGAHgEQAHgEAKAAQAeAAAAAfIAAA8g");
	this.shape_538.setTransform(580.65,125.2);

	this.shape_539 = new cjs.Shape();
	this.shape_539.graphics.f("#FFFFFF").s().p("AgbA0QgKgMAAgWIAAgBQAAgTAKgNQAJgMARgBQAPAAAIALIAAgvIAQAAIAAB/IgOAAIgBgJQgJALgPAAQgRAAgJgNgAgQgGQgFAIgBARQABAPAFAKQAHAIAKAAQAPAAAGgNIAAgoQgGgOgPAAQgKABgHAIg");
	this.shape_539.setTransform(545.35,123.45);

	this.shape_540 = new cjs.Shape();
	this.shape_540.graphics.f("#FFFFFF").s().p("AgbAmQgIgJABgQIAAg6IAPAAIAAA6QAAAUAQAAQARAAAGgNIAAhBIAQAAIAABZIgPAAIAAgJQgJALgRAAQgOAAgIgIg");
	this.shape_540.setTransform(426.7,125.35);

	this.shape_541 = new cjs.Shape();
	this.shape_541.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAPAAIAABagAgGgtQgCgDAAgEQAAgDACgDQADgDADAAQAFAAACADQACADAAADQAAAEgCADQgCACgFAAQgDAAgDgCg");
	this.shape_541.setTransform(410.35,123.625);

	this.shape_542 = new cjs.Shape();
	this.shape_542.graphics.f("#FFFFFF").s().p("AgbA0QgKgMAAgWIAAgBQAAgTAKgNQAKgMAQgBQAOAAAKALIAAgvIAPAAIAAB/IgOAAIgBgJQgJALgPAAQgQAAgKgNgAgQgGQgFAIAAARQAAAPAFAKQAHAIAKAAQAPAAAHgNIAAgoQgHgOgPAAQgKABgHAIg");
	this.shape_542.setTransform(403.25,123.45);

	this.shape_543 = new cjs.Shape();
	this.shape_543.graphics.f("#FFFFFF").s().p("AgbAmQgIgJABgQIAAg6IAPAAIAAA6QAAAUAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIAAgJQgJALgRAAQgPAAgHgIg");
	this.shape_543.setTransform(373.05,125.35);

	this.shape_544 = new cjs.Shape();
	this.shape_544.graphics.f("#FFFFFF").s().p("AgbA/IgGgBIAAgMIAFAAQAHAAAFgDQAEgEADgIIADgJIgfhZIAQAAIAWBEIAVhEIAQAAIgkBoQgIAWgSAAg");
	this.shape_544.setTransform(662.9,63.25);

	this.shape_545 = new cjs.Shape();
	this.shape_545.graphics.f("#FFFFFF").s().p("AAwAuIAAg6QAAgLgEgEQgFgFgLAAQgIAAgFAFQgHAFAAAJIAAA7IgPAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgQAAIAAhaIAPAAIABAKQAJgLASAAQASAAAHAPQAEgHAHgEQAHgEAKAAQAeAAAAAgIAAA7g");
	this.shape_545.setTransform(644.45,61.35);

	this.shape_546 = new cjs.Shape();
	this.shape_546.graphics.f("#FFFFFF").s().p("AgbAmQgIgJABgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABaIgOAAIAAgJQgJAKgRAAQgPAAgHgIg");
	this.shape_546.setTransform(632.25,61.5);

	this.shape_547 = new cjs.Shape();
	this.shape_547.graphics.f("#FFFFFF").s().p("AgFAtIgghZIAPAAIAWBEIAXhEIAPAAIggBZg");
	this.shape_547.setTransform(623.375,61.425);

	this.shape_548 = new cjs.Shape();
	this.shape_548.graphics.f("#FFFFFF").s().p("AAwAuIAAg6QAAgLgFgEQgEgFgLAAQgIAAgFAFQgHAFgBAJIAAA7IgOAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgQAAIAAhaIAPAAIABAKQAKgLARAAQASAAAHAPQAEgHAHgEQAHgEAKAAQAeAAAAAgIAAA7g");
	this.shape_548.setTransform(554.65,61.35);

	this.shape_549 = new cjs.Shape();
	this.shape_549.graphics.f("#FFFFFF").s().p("AgSArQgHgEgFgHQgFgHAAgIIAQAAQAAAIAGAFQAFAEAJAAQAIAAAGgDQAGgEgBgGQAAgGgEgDQgFgEgLgCQgLgDgIgDQgHgDgCgFQgEgFAAgGQAAgLAKgIQAJgIANAAQAQAAAJAIQAKAIAAAMIgQAAQABgGgGgEQgFgFgJAAQgHAAgFAEQgEADgBAGQABAGAEADQAFACAKADQALADAIADQAHADAEAFQADAFAAAHQAAAMgKAIQgKAHgPAAQgKAAgJgEg");
	this.shape_549.setTransform(462.75,61.425);

	this.shape_550 = new cjs.Shape();
	this.shape_550.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAPAAIAABagAgGgtQgCgDAAgEQAAgDACgDQADgDADAAQAEAAADADQACADAAADQAAAEgCADQgDACgEAAQgDAAgDgCg");
	this.shape_550.setTransform(434.55,59.775);

	this.shape_551 = new cjs.Shape();
	this.shape_551.graphics.f("#FFFFFF").s().p("AgRArQgIgEgGgHQgEgHAAgIIAQAAQAAAIAFAFQAHAEAIAAQAJAAAFgDQAGgEgBgGQAAgGgEgDQgFgEgLgCQgMgDgGgDQgIgDgCgFQgEgFAAgGQAAgLAJgIQAKgIANAAQAQAAAKAIQAJAIAAAMIgQAAQAAgGgFgEQgFgFgJAAQgHAAgFAEQgEADgBAGQABAGAEADQAEACALADQAMADAGADQAIADAEAFQADAFAAAHQAAAMgKAIQgJAHgQAAQgKAAgIgEg");
	this.shape_551.setTransform(364,61.425);

	this.shape_552 = new cjs.Shape();
	this.shape_552.graphics.f("#FFFFFF").s().p("AgbA1QgKgOAAgUIAAgBQAAgUAKgNQAKgMAPAAQAPAAAJALIAAgwIAQAAIAACAIgOAAIgBgKQgJALgQAAQgPAAgKgMgAgPgFQgHAHAAASQAAAOAHAKQAGAIALAAQAOAAAGgNIAAgpQgGgNgOAAQgLAAgGAKg");
	this.shape_552.setTransform(315.1,59.6);

	this.shape_553 = new cjs.Shape();
	this.shape_553.graphics.f("#FFFFFF").s().p("AgCAzQgFgHgBgLIAAg3IgQAAIAAgMIAQAAIAAgWIAPAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFACADQACADAGAAIAIgBIAAAMIgNACQgKAAgEgGg");
	this.shape_553.setTransform(277.7,60.425);

	this.shape_554 = new cjs.Shape();
	this.shape_554.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIAAAKQAHgMAOAAIAHABIAAAOIgHAAQgPAAgGANIAAA/g");
	this.shape_554.setTransform(445.1,29.45);

	this.shape_555 = new cjs.Shape();
	this.shape_555.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgKgEgEQgFgFgLAAQgIAAgFAGQgHAEAAAJIAAA7IgPAAIAAg6QAAgUgTAAQgQAAgFANIAABBIgQAAIAAhZIAPAAIABAKQAJgMASAAQASAAAHAOQAEgGAHgEQAHgEAKAAQAeAAAAAfIAAA8g");
	this.shape_555.setTransform(288.05,29.45);

	this.shape_556 = new cjs.Shape();
	this.shape_556.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgKgEgEQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_556.setTransform(690.775,-2.5);

	this.shape_557 = new cjs.Shape();
	this.shape_557.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgKgEgEQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_557.setTransform(532.475,-2.5);

	this.shape_558 = new cjs.Shape();
	this.shape_558.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgKgEgEQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_558.setTransform(457.825,-2.5);

	this.shape_559 = new cjs.Shape();
	this.shape_559.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAPAAIAABagAgGgtQgCgDAAgEQAAgDACgDQADgDADAAQAEAAADADQACADAAADQAAAEgCADQgDACgEAAQgDAAgDgCg");
	this.shape_559.setTransform(368.4,-4.075);

	this.shape_560 = new cjs.Shape();
	this.shape_560.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgKgEgEQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_560.setTransform(337.375,-2.5);

	this.shape_561 = new cjs.Shape();
	this.shape_561.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgKgFgEQgEgFgLAAQgIAAgFAGQgHAEAAAJIAAA7IgPAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgQAAIAAhZIAPAAIABAKQAJgMASAAQASAAAHAOQAEgGAHgEQAHgEAKAAQAeAAAAAfIAAA8g");
	this.shape_561.setTransform(306.6,-2.5);

	this.shape_562 = new cjs.Shape();
	this.shape_562.graphics.f("#FFFFFF").s().p("AgSArQgIgEgEgHQgFgHAAgIIAQAAQAAAIAFAFQAHAEAIAAQAIAAAGgDQAGgEgBgGQAAgGgEgDQgFgEgLgCQgLgDgHgDQgIgDgCgFQgEgFAAgGQAAgLAJgIQAKgIANAAQAQAAAKAIQAJAIAAAMIgQAAQABgGgGgEQgFgFgJAAQgHAAgFAEQgEADgBAGQABAGAEADQAEACALADQAMADAGADQAIADAEAFQADAFAAAHQAAAMgKAIQgJAHgQAAQgKAAgJgEg");
	this.shape_562.setTransform(285.35,-2.425);

	this.shape_563 = new cjs.Shape();
	this.shape_563.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIAAAKQAHgMAOAAIAHABIAAAOIgHAAQgPAAgGANIAAA/g");
	this.shape_563.setTransform(278.5,-2.5);

	this.shape_564 = new cjs.Shape();
	this.shape_564.graphics.f("#FFFFFF").s().p("AgGAHQgCgDgBgEQABgDACgDQACgCAEAAQAFAAADACQABADAAADQAAAEgBADQgDACgFAAQgEAAgCgCg");
	this.shape_564.setTransform(602.7,-30.575);

	this.shape_565 = new cjs.Shape();
	this.shape_565.graphics.f("#FFFFFF").s().p("AgHA+IAAhaIAPAAIAABagAgGgtQgCgDAAgEQAAgDACgDQADgDADAAQAEAAADADQACADAAADQAAAEgCADQgDACgEAAQgDAAgDgCg");
	this.shape_565.setTransform(305.85,-35.925);

	this.shape_566 = new cjs.Shape();
	this.shape_566.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAOIgIAAQgOAAgFANIAAA/g");
	this.shape_566.setTransform(599.4,-66.3);

	this.shape_567 = new cjs.Shape();
	this.shape_567.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIAAAKQAHgMAOAAIAHABIAAAOIgHAAQgPAAgGANIAAA/g");
	this.shape_567.setTransform(278.5,-66.3);

	this.shape_568 = new cjs.Shape();
	this.shape_568.graphics.f("#FFFFFF").s().p("AgSA8QgKgFgFgHIAIgJQAKAMAPAAQAKAAAGgGQAHgGAAgMIAAgIQgKALgPAAQgQAAgJgNQgKgNAAgVQAAgVAKgMQAJgNAQAAQAQAAAJAMIABgKIAOAAIAABXQAAASgKAKQgLAKgRAAQgJAAgJgEgAgPgpQgHAJAAARQAAAPAHAIQAGAJAKAAQAPAAAHgNIAAgpQgIgNgOAAQgKAAgGAJg");
	this.shape_568.setTransform(685.875,-160.325);

	this.shape_569 = new cjs.Shape();
	this.shape_569.graphics.f("#FFFFFF").s().p("AgaAjQgLgNAAgVIAAgCQAAgNAFgKQAFgKAJgGQAJgGALAAQAPAAAKAJQAKAJABAPIgPAAQAAgJgGgFQgGgGgJAAQgLAAgGAIQgHAJAAAQIAAACQAAAPAHAJQAGAIALAAQAIAAAHgFQAGgFAAgHIAPAAQAAAIgFAHQgFAHgIAEQgJAEgJAAQgRAAgLgMg");
	this.shape_569.setTransform(610.225,-162.025);

	this.shape_570 = new cjs.Shape();
	this.shape_570.graphics.f("#FFFFFF").s().p("AgSArQgIgEgFgHQgEgHAAgIIAPAAQABAIAGAFQAFAEAJAAQAIAAAGgDQAFgEABgGQAAgGgGgDQgEgEgLgCQgLgDgIgDQgHgDgDgFQgDgFAAgGQAAgLAKgIQAJgIAOAAQAPAAAJAIQAKAIAAAMIgPAAQAAgGgGgEQgGgFgHAAQgIAAgFAEQgFADABAGQgBAGAFADQAEACALADQALADAIADQAHADADAFQAEAFAAAHQAAAMgKAIQgKAHgPAAQgKAAgJgEg");
	this.shape_570.setTransform(592.2,-162.025);

	this.shape_571 = new cjs.Shape();
	this.shape_571.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_571.setTransform(535.775,-162.025);

	this.shape_572 = new cjs.Shape();
	this.shape_572.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_572.setTransform(529.025,-163.925);

	this.shape_573 = new cjs.Shape();
	this.shape_573.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_573.setTransform(464.775,-162.1);

	this.shape_574 = new cjs.Shape();
	this.shape_574.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_574.setTransform(431.125,-162.1);

	this.shape_575 = new cjs.Shape();
	this.shape_575.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_575.setTransform(421.725,-162.025);

	this.shape_576 = new cjs.Shape();
	this.shape_576.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_576.setTransform(403.025,-162.025);

	this.shape_577 = new cjs.Shape();
	this.shape_577.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_577.setTransform(360.025,-162.025);

	this.shape_578 = new cjs.Shape();
	this.shape_578.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAhaIAPAAIABAMQAKgNAQAAQAcAAABAhIAAA6g");
	this.shape_578.setTransform(334.775,-162.1);

	this.shape_579 = new cjs.Shape();
	this.shape_579.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_579.setTransform(325.375,-162.025);

	this.shape_580 = new cjs.Shape();
	this.shape_580.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_580.setTransform(317.025,-163.925);

	this.shape_581 = new cjs.Shape();
	this.shape_581.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_581.setTransform(298.925,-163.925);

	this.shape_582 = new cjs.Shape();
	this.shape_582.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_582.setTransform(289.375,-162.025);

	this.shape_583 = new cjs.Shape();
	this.shape_583.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_583.setTransform(282.625,-163.925);

	this.shape_584 = new cjs.Shape();
	this.shape_584.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_584.setTransform(276.175,-162.025);

	this.shape_585 = new cjs.Shape();
	this.shape_585.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_585.setTransform(691.825,-195.825);

	this.shape_586 = new cjs.Shape();
	this.shape_586.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_586.setTransform(682.225,-193.925);

	this.shape_587 = new cjs.Shape();
	this.shape_587.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_587.setTransform(633.125,-193.925);

	this.shape_588 = new cjs.Shape();
	this.shape_588.graphics.f("#FFFFFF").s().p("AgdAiQgLgNAAgVIAAAAQAAgNAFgLQAFgKAKgGQAJgGALAAQASAAAMANQALANAAAUIAAABQAAANgFALQgFAKgJAGQgKAGgMAAQgRAAgMgNgAgSgYQgHAJAAAQQAAAPAHAJQAHAJALAAQAMAAAHgJQAHgJAAgQQAAgPgHgJQgHgJgMAAQgLAAgHAJg");
	this.shape_588.setTransform(588.675,-193.925);

	this.shape_589 = new cjs.Shape();
	this.shape_589.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_589.setTransform(567.375,-193.925);

	this.shape_590 = new cjs.Shape();
	this.shape_590.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_590.setTransform(537.575,-193.925);

	this.shape_591 = new cjs.Shape();
	this.shape_591.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAh/IAQAAIAAAxQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_591.setTransform(528.275,-195.825);

	this.shape_592 = new cjs.Shape();
	this.shape_592.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_592.setTransform(506.625,-193.925);

	this.shape_593 = new cjs.Shape();
	this.shape_593.graphics.f("#FFFFFF").s().p("AgVAuIAAhaIAPAAIABALQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_593.setTransform(480.6,-194);

	this.shape_594 = new cjs.Shape();
	this.shape_594.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_594.setTransform(472.875,-193.925);

	this.shape_595 = new cjs.Shape();
	this.shape_595.graphics.f("#FFFFFF").s().p("AgRArQgJgEgFgHQgEgHAAgIIAPAAQABAIAFAFQAHAEAIAAQAIAAAGgDQAFgEABgGQAAgGgGgDQgEgEgLgCQgLgDgIgDQgGgDgEgFQgDgFAAgGQAAgLAJgIQAKgIAOAAQAPAAAJAIQAKAIAAAMIgPAAQgBgGgFgEQgGgFgHAAQgIAAgFAEQgFADABAGQgBAGAFADQAFACAKADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAIQgKAHgPAAQgKAAgIgEg");
	this.shape_595.setTransform(443.35,-193.925);

	this.shape_596 = new cjs.Shape();
	this.shape_596.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKALIAAAfIgPAAIAAh/IAPAAIAABNIAIgKIAbgdIATAAIgiAlIAmA0g");
	this.shape_596.setTransform(435.225,-195.825);

	this.shape_597 = new cjs.Shape();
	this.shape_597.graphics.f("#FFFFFF").s().p("AgdAiQgLgNAAgVIAAAAQAAgNAFgLQAFgKAKgGQAJgGALAAQASAAAMANQALANAAAUIAAABQAAANgFALQgFAKgJAGQgKAGgMAAQgRAAgMgNgAgSgYQgHAJAAAQQAAAPAHAJQAHAJALAAQAMAAAHgJQAHgJAAgQQAAgPgHgJQgHgJgMAAQgLAAgHAJg");
	this.shape_597.setTransform(406.375,-193.925);

	this.shape_598 = new cjs.Shape();
	this.shape_598.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_598.setTransform(381.725,-193.925);

	this.shape_599 = new cjs.Shape();
	this.shape_599.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_599.setTransform(304.325,-193.925);

	this.shape_600 = new cjs.Shape();
	this.shape_600.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAFgGQAEgGAJgEQAIgEAJAAQAPAAAJAIQAJAIAAAOIAAAoQAAANADAHIAAABIgQAAQgBgCgBgHQgLALgOAAQgNAAgJgIgAgVASQAAAHAFAEQAFAEAIAAQAGAAAGgDQAHgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_600.setTransform(289.225,-193.925);

	this.shape_601 = new cjs.Shape();
	this.shape_601.graphics.f("#FFFFFF").s().p("AgaAjQgLgNAAgVIAAgCQAAgNAFgKQAFgKAJgGQAJgGALAAQAPAAAKAJQAKAJABAPIgPAAQAAgJgGgFQgGgGgJAAQgLAAgGAIQgHAJAAAQIAAACQAAAPAHAJQAGAIALAAQAIAAAHgFQAGgFAAgHIAPAAQAAAIgFAHQgFAHgIAEQgJAEgJAAQgRAAgLgMg");
	this.shape_601.setTransform(280.225,-193.925);

	this.shape_602 = new cjs.Shape();
	this.shape_602.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgUIAAgDQAAgNAFgKQAFgLAJgGQAJgGAKAAQASAAAJAMQAKALAAAWIAAAFIg8AAQAAAOAIAIQAHAIALAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXAAQgRAAgMgMgAgOgaQgGAHgCAMIAtAAIAAgBQgBgMgGgHQgFgGgKAAQgIAAgHAHg");
	this.shape_602.setTransform(271.275,-193.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_96,p:{x:263.375}},{t:this.shape_95,p:{x:273.025,y:-193.925}},{t:this.shape_94,p:{x:281.975,y:-193.925}},{t:this.shape_93,p:{x:290.975,y:-193.925}},{t:this.shape_92,p:{x:299,y:-194}},{t:this.shape_91,p:{x:306.075,y:-193.925}},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88,p:{x:346.6,y:-193.85}},{t:this.shape_87},{t:this.shape_86,p:{x:376.35,y:-194}},{t:this.shape_85,p:{x:383.475,y:-193.925}},{t:this.shape_84,p:{x:392.825,y:-192.275}},{t:this.shape_83,p:{x:400.75,y:-194}},{t:this.shape_82,p:{x:408.125,y:-193.925}},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79,p:{x:436.975,y:-195.825}},{t:this.shape_78,p:{x:445.1,y:-193.925}},{t:this.shape_77,p:{x:451.65,y:-195.575}},{t:this.shape_76,p:{x:465.375}},{t:this.shape_75,p:{x:474.625,y:-193.925}},{t:this.shape_74,p:{x:482.35,y:-194}},{t:this.shape_73},{t:this.shape_72,p:{x:495.75,y:-195.575}},{t:this.shape_71,p:{x:501.025}},{t:this.shape_70,p:{x:508.375,y:-193.925}},{t:this.shape_69,p:{x:515.6,y:-194.925}},{t:this.shape_68,p:{x:530.025,y:-195.825}},{t:this.shape_67,p:{x:539.325,y:-193.925}},{t:this.shape_66,p:{x:547.05,y:-194}},{t:this.shape_65},{t:this.shape_64,p:{x:569.125,y:-193.925}},{t:this.shape_63,p:{x:577.025}},{t:this.shape_62,p:{x:583.1,y:-194}},{t:this.shape_61,p:{x:590.425,y:-193.925}},{t:this.shape_60,p:{x:599.9}},{t:this.shape_59,p:{x:607.05,y:-195.575}},{t:this.shape_58,p:{x:611.65,y:-194.925}},{t:this.shape_57,p:{x:616.05,y:-189.125}},{t:this.shape_56},{t:this.shape_55,p:{x:634.875,y:-193.925}},{t:this.shape_54,p:{x:644.525,y:-192.275}},{t:this.shape_53,p:{x:651.2,y:-195.575}},{t:this.shape_52},{t:this.shape_51,p:{x:667.65,y:-195.575}},{t:this.shape_50,p:{x:674.3}},{t:this.shape_49,p:{x:683.975,y:-193.925}},{t:this.shape_48,p:{x:693.575,y:-195.825}},{t:this.shape_47},{t:this.shape_46,p:{x:277.925,y:-162.025}},{t:this.shape_45,p:{x:284.375,y:-163.925}},{t:this.shape_44,p:{x:291.125,y:-162.025}},{t:this.shape_43,p:{x:300.675,y:-163.925}},{t:this.shape_42},{t:this.shape_41,p:{x:318.775,y:-163.925}},{t:this.shape_40,p:{x:327.125,y:-162.025}},{t:this.shape_39,p:{x:336.525,y:-162.1}},{t:this.shape_38,p:{x:350.475,y:-160.375}},{t:this.shape_37,p:{x:359.675,y:-162.025}},{t:this.shape_36},{t:this.shape_35,p:{x:384.025,y:-163.85}},{t:this.shape_34,p:{x:393.35}},{t:this.shape_33,p:{x:402.675,y:-162.025}},{t:this.shape_32,p:{x:412.075,y:-163.925}},{t:this.shape_31,p:{x:421.375,y:-162.025}},{t:this.shape_30,p:{x:430.775,y:-162.1}},{t:this.shape_29,p:{x:444.1,y:-162.025}},{t:this.shape_28,p:{x:453.175,y:-162.025}},{t:this.shape_27,p:{x:462.275,y:-162.1}},{t:this.shape_26},{t:this.shape_25,p:{x:478.75,y:-163.675}},{t:this.shape_24},{t:this.shape_23,p:{x:488.75,y:-163.675}},{t:this.shape_22},{t:this.shape_21,p:{x:505.9,y:-162.1}},{t:this.shape_20,p:{x:518.025,y:-162.025}},{t:this.shape_19,p:{x:524.475,y:-163.925}},{t:this.shape_18,p:{x:531.175,y:-162.025}},{t:this.shape_17,p:{x:537.95,y:-163.675}},{t:this.shape_16,p:{x:544.725,y:-162.1}},{t:this.shape_15,p:{x:554.375,y:-163.925}},{t:this.shape_14,p:{x:562.775,y:-162.025}},{t:this.shape_13,p:{x:572.175,y:-162.1}},{t:this.shape_12,p:{x:585.5,y:-162.025}},{t:this.shape_11,p:{x:594.575,y:-162.025}},{t:this.shape_10,p:{x:603.525,y:-162.025}},{t:this.shape_9,p:{x:612.525,y:-162.025}},{t:this.shape_8,p:{x:620.55}},{t:this.shape_7,p:{x:627.625,y:-162.025}},{t:this.shape_6},{t:this.shape_5,p:{x:647.45,y:-163.675}},{t:this.shape_4,p:{x:651.575,y:-163.925}},{t:this.shape_3,p:{x:658.325,y:-162.025}},{t:this.shape_2,p:{x:667.725,y:-162.1}},{t:this.shape_1,p:{x:677.075,y:-160.325}},{t:this.shape,p:{x:684.15,y:-158.325}}]},290).to({state:[{t:this.shape_96,p:{x:261.625}},{t:this.shape_210,p:{x:271.275,y:-193.925}},{t:this.shape_209,p:{x:280.225,y:-193.925}},{t:this.shape_208,p:{x:289.225,y:-193.925}},{t:this.shape_207,p:{x:297.25}},{t:this.shape_206,p:{x:304.325,y:-193.925}},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201,p:{x:374.6}},{t:this.shape_200,p:{x:381.725,y:-193.925}},{t:this.shape_199,p:{x:391.075,y:-192.275}},{t:this.shape_66,p:{x:399,y:-194}},{t:this.shape_82,p:{x:406.375,y:-193.925}},{t:this.shape_60,p:{x:415.85}},{t:this.shape_198},{t:this.shape_197,p:{x:435.225,y:-195.825}},{t:this.shape_196,p:{x:443.35,y:-193.925}},{t:this.shape_195,p:{x:449.9,y:-195.575}},{t:this.shape_76,p:{x:463.625}},{t:this.shape_194,p:{x:472.875,y:-193.925}},{t:this.shape_62,p:{x:480.6,y:-194}},{t:this.shape_193,p:{x:487.45,y:-193.925}},{t:this.shape_192,p:{x:494,y:-195.575}},{t:this.shape_71,p:{x:499.275}},{t:this.shape_191,p:{x:506.625,y:-193.925}},{t:this.shape_190},{t:this.shape_189,p:{x:528.275,y:-195.825}},{t:this.shape_188,p:{x:537.575,y:-193.925}},{t:this.shape_83,p:{x:545.3,y:-194}},{t:this.shape_187},{t:this.shape_186,p:{x:567.375,y:-193.925}},{t:this.shape_63,p:{x:575.275}},{t:this.shape_74,p:{x:581.35,y:-194}},{t:this.shape_61,p:{x:588.675,y:-193.925}},{t:this.shape_50,p:{x:598.15}},{t:this.shape_53,p:{x:605.3,y:-195.575}},{t:this.shape_185,p:{x:609.9,y:-194.925}},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182,p:{x:633.125,y:-193.925}},{t:this.shape_181,p:{x:642.775,y:-192.275}},{t:this.shape_59,p:{x:649.45,y:-195.575}},{t:this.shape_180},{t:this.shape_5,p:{x:665.9,y:-195.575}},{t:this.shape_179},{t:this.shape_178,p:{x:682.225,y:-193.925}},{t:this.shape_177,p:{x:691.825,y:-195.825}},{t:this.shape_176},{t:this.shape_175,p:{x:276.175,y:-162.025}},{t:this.shape_174,p:{x:282.625,y:-163.925}},{t:this.shape_173,p:{x:289.375,y:-162.025}},{t:this.shape_172,p:{x:298.925,y:-163.925}},{t:this.shape_34,p:{x:307.4}},{t:this.shape_171,p:{x:317.025,y:-163.925}},{t:this.shape_170,p:{x:325.375,y:-162.025}},{t:this.shape_169,p:{x:334.775}},{t:this.shape_84,p:{x:350.825,y:-160.375}},{t:this.shape_168,p:{x:360.025,y:-162.025}},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164,p:{x:403.025,y:-162.025}},{t:this.shape_68,p:{x:412.425,y:-163.925}},{t:this.shape_163,p:{x:421.725,y:-162.025}},{t:this.shape_162,p:{x:431.125}},{t:this.shape_161,p:{x:446.6,y:-162.025}},{t:this.shape_160,p:{x:455.675,y:-162.025}},{t:this.shape_159,p:{x:464.775}},{t:this.shape_158},{t:this.shape_157,p:{x:481.25,y:-163.675}},{t:this.shape_8,p:{x:486.65}},{t:this.shape_156},{t:this.shape_57,p:{x:494.65,y:-157.225}},{t:this.shape_155},{t:this.shape_154,p:{x:522.575,y:-162.025}},{t:this.shape_153,p:{x:529.025,y:-163.925}},{t:this.shape_152,p:{x:535.775,y:-162.025}},{t:this.shape_151,p:{x:542.5,y:-163.675}},{t:this.shape_150,p:{x:549.325,y:-162.1}},{t:this.shape_149,p:{x:558.975,y:-163.925}},{t:this.shape_148,p:{x:567.325,y:-162.025}},{t:this.shape_147,p:{x:576.725,y:-162.1}},{t:this.shape_146,p:{x:592.2,y:-162.025}},{t:this.shape_95,p:{x:601.275,y:-162.025}},{t:this.shape_145,p:{x:610.225,y:-162.025}},{t:this.shape_144,p:{x:619.225,y:-162.025}},{t:this.shape_143},{t:this.shape_142,p:{x:634.325,y:-162.025}},{t:this.shape_141},{t:this.shape_23,p:{x:656.25,y:-163.675}},{t:this.shape_140,p:{x:660.375,y:-163.925}},{t:this.shape_139,p:{x:667.125,y:-162.025}},{t:this.shape_138,p:{x:676.525,y:-162.1}},{t:this.shape_137,p:{x:685.875,y:-160.325}},{t:this.shape_136,p:{y:-158.325}},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133,p:{x:281.825,y:-130.075}},{t:this.shape_94,p:{x:306.475,y:-130.075}},{t:this.shape_132,p:{x:315.475,y:-130.075}},{t:this.shape_10,p:{x:324.725,y:-130.075}},{t:this.shape_131,p:{x:331.2,y:-131.725}},{t:this.shape_130,p:{x:337.975}},{t:this.shape_129,p:{x:347.325,y:-128.375}},{t:this.shape_93,p:{x:372.325,y:-130.075}},{t:this.shape_128,p:{x:381.875,y:-131.975}},{t:this.shape_91,p:{x:390.275,y:-130.075}},{t:this.shape_127,p:{x:399.675}},{t:this.shape_126},{t:this.shape_85,p:{x:439.425,y:-130.075}},{t:this.shape_125,p:{x:445.875,y:-131.975}},{t:this.shape_70,p:{x:452.575,y:-130.075}},{t:this.shape_79,p:{x:462.175,y:-131.975}},{t:this.shape_124},{t:this.shape_48,p:{x:480.225,y:-131.975}},{t:this.shape_64,p:{x:488.625,y:-130.075}},{t:this.shape_123,p:{x:497.975}},{t:this.shape_43,p:{x:523.075,y:-131.975}},{t:this.shape_55,p:{x:531.425,y:-130.075}},{t:this.shape_122},{t:this.shape_17,p:{x:551,y:-131.725}},{t:this.shape_121,p:{x:557.825}},{t:this.shape_12,p:{x:582.35,y:-130.075}},{t:this.shape_120,p:{x:588.85,y:-131.725}},{t:this.shape_119,p:{x:593.025,y:-131.975}},{t:this.shape_49,p:{x:599.725,y:-130.075}},{t:this.shape_118,p:{x:609.125,y:-130.15}},{t:this.shape_117,p:{x:618.475,y:-128.375}},{t:this.shape_116},{t:this.shape_75,p:{x:653.075,y:-130.075}},{t:this.shape_115,p:{x:662.175,y:-130.15}},{t:this.shape_114,p:{x:671.575,y:-128.375}},{t:this.shape_44,p:{x:681.125,y:-130.075}},{t:this.shape_113,p:{x:690.525,y:-130.15}},{t:this.shape_112},{t:this.shape_67,p:{x:276.175,y:-98.125}},{t:this.shape_39,p:{x:285.275,y:-98.2}},{t:this.shape_46,p:{x:294.675,y:-98.125}},{t:this.shape_21,p:{x:306.55,y:-98.2}},{t:this.shape_54,p:{x:319.025,y:-96.475}},{t:this.shape_37,p:{x:328.225,y:-98.125}},{t:this.shape_45,p:{x:334.675,y:-100.025}},{t:this.shape_41,p:{x:341.725,y:-100.025}},{t:this.shape_40,p:{x:350.075,y:-98.125}},{t:this.shape_30,p:{x:359.475,y:-98.2}},{t:this.shape_111},{t:this.shape_110},{t:this.shape_35,p:{x:412.275,y:-99.95}},{t:this.shape_109},{t:this.shape_32,p:{x:431.025,y:-100.025}},{t:this.shape_27,p:{x:440.425,y:-98.2}},{t:this.shape_108},{t:this.shape_33,p:{x:457.875,y:-98.125}},{t:this.shape_107},{t:this.shape_28,p:{x:504.975,y:-98.125}},{t:this.shape_16,p:{x:514.075,y:-98.2}},{t:this.shape_106,p:{x:523.425,y:-96.425}},{t:this.shape_31,p:{x:533.025,y:-98.125}},{t:this.shape_13,p:{x:542.425,y:-98.2}},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_2,p:{x:602.975,y:-98.2}},{t:this.shape_1,p:{x:612.325,y:-96.425}},{t:this.shape_15,p:{x:650.375,y:-100.025}},{t:this.shape_20,p:{x:658.725,y:-98.125}},{t:this.shape_38,p:{x:668.075,y:-96.475}},{t:this.shape_18,p:{x:677.325,y:-98.125}},{t:this.shape_19,p:{x:684.075,y:-100.025}},{t:this.shape_14,p:{x:690.775,y:-98.125}},{t:this.shape_102},{t:this.shape_11,p:{x:270.775,y:-66.225}},{t:this.shape_101,p:{y:-66.3,x:278.5}},{t:this.shape_4,p:{x:283.025,y:-68.125}},{t:this.shape_9,p:{x:289.725,y:-66.225}},{t:this.shape_100},{t:this.shape_7,p:{x:311.875,y:-66.225}},{t:this.shape_99,p:{x:321.275,y:-66.3}},{t:this.shape_3,p:{x:330.625,y:-66.225}},{t:this.shape_98,p:{x:340.025,y:-66.3}},{t:this.shape_97}]},43).to({state:[{t:this.shape_96,p:{x:261.625}},{t:this.shape_281,p:{x:271.275,y:-193.925}},{t:this.shape_280,p:{x:280.225,y:-193.925}},{t:this.shape_279,p:{x:289.225,y:-193.925}},{t:this.shape_207,p:{x:297.25}},{t:this.shape_278,p:{x:304.325,y:-193.925}},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201,p:{x:374.6}},{t:this.shape_277,p:{x:381.725,y:-193.925}},{t:this.shape_276,p:{x:391.075,y:-192.275}},{t:this.shape_66,p:{x:399,y:-194}},{t:this.shape_82,p:{x:406.375,y:-193.925}},{t:this.shape_60,p:{x:415.85}},{t:this.shape_198},{t:this.shape_275,p:{x:435.225,y:-195.825}},{t:this.shape_196,p:{x:443.35,y:-193.925}},{t:this.shape_274,p:{x:449.9,y:-195.575}},{t:this.shape_76,p:{x:463.625}},{t:this.shape_273,p:{x:472.875,y:-193.925}},{t:this.shape_62,p:{x:480.6,y:-194}},{t:this.shape_193,p:{x:487.45,y:-193.925}},{t:this.shape_272,p:{x:494,y:-195.575}},{t:this.shape_71,p:{x:499.275}},{t:this.shape_271,p:{x:506.625,y:-193.925}},{t:this.shape_190},{t:this.shape_189,p:{x:528.275,y:-195.825}},{t:this.shape_270,p:{x:537.575,y:-193.925}},{t:this.shape_83,p:{x:545.3,y:-194}},{t:this.shape_187},{t:this.shape_269,p:{x:567.375,y:-193.925}},{t:this.shape_63,p:{x:575.275}},{t:this.shape_74,p:{x:581.35,y:-194}},{t:this.shape_61,p:{x:588.675,y:-193.925}},{t:this.shape_50,p:{x:598.15}},{t:this.shape_268},{t:this.shape_185,p:{x:609.9,y:-194.925}},{t:this.shape_184},{t:this.shape_183},{t:this.shape_267,p:{x:633.125,y:-193.925}},{t:this.shape_266,p:{x:642.775,y:-192.275}},{t:this.shape_195,p:{x:649.45,y:-195.575}},{t:this.shape_180},{t:this.shape_192,p:{x:665.9,y:-195.575}},{t:this.shape_179},{t:this.shape_265,p:{x:682.225,y:-193.925}},{t:this.shape_264,p:{x:691.825,y:-195.825}},{t:this.shape_176},{t:this.shape_263,p:{y:-162.025,x:276.175}},{t:this.shape_262,p:{x:282.625,y:-163.925}},{t:this.shape_261,p:{x:289.375,y:-162.025}},{t:this.shape_260,p:{x:298.925,y:-163.925}},{t:this.shape_34,p:{x:307.4}},{t:this.shape_197,p:{x:317.025,y:-163.925}},{t:this.shape_259,p:{x:325.375,y:-162.025}},{t:this.shape_169,p:{x:334.775}},{t:this.shape_199,p:{x:350.825,y:-160.375}},{t:this.shape_258,p:{x:360.025,y:-162.025}},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_257,p:{x:403.025,y:-162.025}},{t:this.shape_68,p:{x:412.425,y:-163.925}},{t:this.shape_256,p:{x:421.725,y:-162.025}},{t:this.shape_162,p:{x:431.125}},{t:this.shape_161,p:{x:446.6,y:-162.025}},{t:this.shape_210,p:{x:455.675,y:-162.025}},{t:this.shape_159,p:{x:464.775}},{t:this.shape_158},{t:this.shape_157,p:{x:481.25,y:-163.675}},{t:this.shape_8,p:{x:486.65}},{t:this.shape_156},{t:this.shape_57,p:{x:494.65,y:-157.225}},{t:this.shape_155},{t:this.shape_200,p:{x:522.575,y:-162.025}},{t:this.shape_255,p:{x:529.025,y:-163.925}},{t:this.shape_254,p:{x:535.775,y:-162.025}},{t:this.shape_151,p:{x:542.5,y:-163.675}},{t:this.shape_150,p:{x:549.325,y:-162.1}},{t:this.shape_177,p:{x:558.975,y:-163.925}},{t:this.shape_253,p:{x:567.325,y:-162.025}},{t:this.shape_147,p:{x:576.725,y:-162.1}},{t:this.shape_146,p:{x:592.2,y:-162.025}},{t:this.shape_194,p:{x:601.275,y:-162.025}},{t:this.shape_252,p:{x:610.225,y:-162.025}},{t:this.shape_251,p:{x:619.225,y:-162.025}},{t:this.shape_143},{t:this.shape_250,p:{x:634.325,y:-162.025}},{t:this.shape_141},{t:this.shape_249,p:{x:656.25,y:-163.675}},{t:this.shape_248,p:{x:660.375,y:-163.925}},{t:this.shape_208,p:{x:667.125,y:-162.025}},{t:this.shape_138,p:{x:676.525,y:-162.1}},{t:this.shape_247,p:{x:685.875,y:-160.325}},{t:this.shape_136,p:{y:-158.325}},{t:this.shape_135},{t:this.shape_134},{t:this.shape_206,p:{x:281.825,y:-130.075}},{t:this.shape_209,p:{x:306.475,y:-130.075}},{t:this.shape_191,p:{x:315.475,y:-130.075}},{t:this.shape_145,p:{x:324.725,y:-130.075}},{t:this.shape_131,p:{x:331.2,y:-131.725}},{t:this.shape_130,p:{x:337.975}},{t:this.shape_246,p:{x:347.325,y:-128.375}},{t:this.shape_186,p:{x:372.325,y:-130.075}},{t:this.shape_172,p:{x:381.875,y:-131.975}},{t:this.shape_182,p:{x:390.275,y:-130.075}},{t:this.shape_127,p:{x:399.675}},{t:this.shape_126},{t:this.shape_188,p:{x:439.425,y:-130.075}},{t:this.shape_245,p:{x:445.875,y:-131.975}},{t:this.shape_178,p:{x:452.575,y:-130.075}},{t:this.shape_171,p:{x:462.175,y:-131.975}},{t:this.shape_124},{t:this.shape_149,p:{x:480.225,y:-131.975}},{t:this.shape_173,p:{x:488.625,y:-130.075}},{t:this.shape_123,p:{x:497.975}},{t:this.shape_128,p:{x:523.075,y:-131.975}},{t:this.shape_170,p:{x:531.425,y:-130.075}},{t:this.shape_122},{t:this.shape_17,p:{x:551,y:-131.725}},{t:this.shape_121,p:{x:557.825}},{t:this.shape_12,p:{x:582.35,y:-130.075}},{t:this.shape_120,p:{x:588.85,y:-131.725}},{t:this.shape_244,p:{x:593.025,y:-131.975}},{t:this.shape_164,p:{x:599.725,y:-130.075}},{t:this.shape_118,p:{x:609.125,y:-130.15}},{t:this.shape_243,p:{x:618.475,y:-128.375}},{t:this.shape_116},{t:this.shape_175,p:{x:653.075,y:-130.075}},{t:this.shape_115,p:{x:662.175,y:-130.15}},{t:this.shape_137,p:{x:671.575,y:-128.375}},{t:this.shape_163,p:{x:681.125,y:-130.075}},{t:this.shape_113,p:{x:690.525,y:-130.15}},{t:this.shape_112},{t:this.shape_168,p:{x:276.175,y:-98.125}},{t:this.shape_39,p:{x:285.275,y:-98.2}},{t:this.shape_160,p:{x:294.675,y:-98.125}},{t:this.shape_21,p:{x:306.55,y:-98.2}},{t:this.shape_181,p:{x:319.025,y:-96.475}},{t:this.shape_154,p:{x:328.225,y:-98.125}},{t:this.shape_174,p:{x:334.675,y:-100.025}},{t:this.shape_79,p:{x:341.725,y:-100.025}},{t:this.shape_152,p:{x:350.075,y:-98.125}},{t:this.shape_30,p:{x:359.475,y:-98.2}},{t:this.shape_111},{t:this.shape_110},{t:this.shape_35,p:{x:412.275,y:-99.95}},{t:this.shape_109},{t:this.shape_32,p:{x:431.025,y:-100.025}},{t:this.shape_27,p:{x:440.425,y:-98.2}},{t:this.shape_108},{t:this.shape_148,p:{x:457.875,y:-98.125}},{t:this.shape_107},{t:this.shape_95,p:{x:504.975,y:-98.125}},{t:this.shape_16,p:{x:514.075,y:-98.2}},{t:this.shape_129,p:{x:523.425,y:-96.425}},{t:this.shape_144,p:{x:533.025,y:-98.125}},{t:this.shape_13,p:{x:542.425,y:-98.2}},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_2,p:{x:602.975,y:-98.2}},{t:this.shape_117,p:{x:612.325,y:-96.425}},{t:this.shape_48,p:{x:650.375,y:-100.025}},{t:this.shape_85,p:{x:658.725,y:-98.125}},{t:this.shape_84,p:{x:668.075,y:-96.475}},{t:this.shape_142,p:{x:677.325,y:-98.125}},{t:this.shape_153,p:{x:684.075,y:-100.025}},{t:this.shape_139,p:{x:690.775,y:-98.125}},{t:this.shape_102},{t:this.shape_75,p:{x:270.775,y:-66.225}},{t:this.shape_101,p:{y:-66.3,x:278.5}},{t:this.shape_140,p:{x:283.025,y:-68.125}},{t:this.shape_133,p:{x:289.725,y:-66.225}},{t:this.shape_100},{t:this.shape_132,p:{x:311.875,y:-66.225}},{t:this.shape_242},{t:this.shape_93,p:{x:330.625,y:-66.225}},{t:this.shape_241},{t:this.shape_97},{t:this.shape_240},{t:this.shape_125,p:{x:371.175,y:-68.125}},{t:this.shape_91,p:{x:377.875,y:-66.225}},{t:this.shape_239},{t:this.shape_43,p:{x:401.725,y:-68.125}},{t:this.shape_67,p:{x:410.125,y:-66.225}},{t:this.shape_119,p:{x:416.575,y:-68.125}},{t:this.shape_70,p:{x:423.275,y:-66.225}},{t:this.shape_238},{t:this.shape_59,p:{x:445.05,y:-67.875}},{t:this.shape_237},{t:this.shape_236},{t:this.shape_64,p:{x:474.025,y:-66.225}},{t:this.shape_235},{t:this.shape_234},{t:this.shape_55,p:{x:498.275,y:-66.225}},{t:this.shape_233},{t:this.shape_232},{t:this.shape_46,p:{x:540.775,y:-66.225}},{t:this.shape_231},{t:this.shape_114,p:{x:559.225,y:-64.525}},{t:this.shape_37,p:{x:568.825,y:-66.225}},{t:this.shape_45,p:{x:575.275,y:-68.125}},{t:this.shape_230},{t:this.shape_49,p:{x:591.375,y:-66.225}},{t:this.shape_229,p:{x:599.4,y:-66.3}},{t:this.shape_41,p:{x:606.825,y:-68.125}},{t:this.shape_44,p:{x:615.175,y:-66.225}},{t:this.shape_228},{t:this.shape_227},{t:this.shape_54,p:{x:651.825,y:-64.575}},{t:this.shape_28,p:{x:661.075,y:-66.225}},{t:this.shape_226,p:{x:668.8,y:-66.3}},{t:this.shape_225},{t:this.shape_40,p:{x:690.875,y:-66.225}},{t:this.shape_224},{t:this.shape_33,p:{x:270.825,y:-34.275}},{t:this.shape_223},{t:this.shape_222,p:{x:293.75}},{t:this.shape_51,p:{x:300.9,y:-35.925}},{t:this.shape_221},{t:this.shape_20,p:{x:313.125,y:-34.275}},{t:this.shape_220,p:{x:320.85,y:-34.35}},{t:this.shape_219,p:{x:325.4,y:-35.925}},{t:this.shape_218,p:{x:335}},{t:this.shape_31,p:{x:347.125,y:-34.275}},{t:this.shape_15,p:{x:360.925,y:-36.175}},{t:this.shape_19,p:{x:366.725,y:-36.175}},{t:this.shape_5,p:{x:370.9,y:-35.925}},{t:this.shape_217,p:{x:375.55}},{t:this.shape_11,p:{x:383.125,y:-34.275}},{t:this.shape_4,p:{x:389.575,y:-36.175}},{t:this.shape_53,p:{x:393.8,y:-35.925}},{t:this.shape_216,p:{x:400.55,y:-34.2}},{t:this.shape_215,p:{x:412.75}},{t:this.shape_94,p:{x:429.025,y:-34.275}},{t:this.shape_18,p:{x:438.025,y:-34.275}},{t:this.shape_10,p:{x:447.275,y:-34.275}},{t:this.shape_23,p:{x:453.75,y:-35.925}},{t:this.shape_214,p:{x:460.525}},{t:this.shape_106,p:{x:469.925,y:-32.575}},{t:this.shape_38,p:{x:484.075,y:-32.625}},{t:this.shape_14,p:{x:493.275,y:-34.275}},{t:this.shape_213,p:{x:502.35,y:-34.275}},{t:this.shape_9,p:{x:511.425,y:-34.275}},{t:this.shape_212,p:{x:520.825}},{t:this.shape_1,p:{x:530.175,y:-32.575}},{t:this.shape_7,p:{x:539.725,y:-34.275}},{t:this.shape_99,p:{x:549.125,y:-34.35}},{t:this.shape_98,p:{x:558.625,y:-34.35}},{t:this.shape_211},{t:this.shape_3,p:{x:576.075,y:-34.275}},{t:this.shape,p:{x:582.9,y:-30.575}}]},44).to({state:[{t:this.shape_96,p:{x:261.625}},{t:this.shape_349,p:{x:271.275,y:-193.925}},{t:this.shape_280,p:{x:280.225,y:-193.925}},{t:this.shape_348,p:{x:289.225,y:-193.925}},{t:this.shape_207,p:{x:297.25}},{t:this.shape_347,p:{x:304.325,y:-193.925}},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201,p:{x:374.6}},{t:this.shape_346,p:{x:381.725,y:-193.925}},{t:this.shape_276,p:{x:391.075,y:-192.275}},{t:this.shape_66,p:{x:399,y:-194}},{t:this.shape_345,p:{x:406.375,y:-193.925}},{t:this.shape_60,p:{x:415.85}},{t:this.shape_198},{t:this.shape_344,p:{x:435.225,y:-195.825}},{t:this.shape_196,p:{x:443.35,y:-193.925}},{t:this.shape_274,p:{x:449.9,y:-195.575}},{t:this.shape_76,p:{x:463.625}},{t:this.shape_343,p:{x:472.875,y:-193.925}},{t:this.shape_62,p:{x:480.6,y:-194}},{t:this.shape_193,p:{x:487.45,y:-193.925}},{t:this.shape_272,p:{x:494,y:-195.575}},{t:this.shape_71,p:{x:499.275}},{t:this.shape_342,p:{x:506.625,y:-193.925}},{t:this.shape_190},{t:this.shape_189,p:{x:528.275,y:-195.825}},{t:this.shape_341,p:{x:537.575,y:-193.925}},{t:this.shape_83,p:{x:545.3,y:-194}},{t:this.shape_187},{t:this.shape_340,p:{x:567.375,y:-193.925}},{t:this.shape_63,p:{x:575.275}},{t:this.shape_74,p:{x:581.35,y:-194}},{t:this.shape_339,p:{x:588.675,y:-193.925}},{t:this.shape_50,p:{x:598.15}},{t:this.shape_249,p:{x:605.3,y:-195.575}},{t:this.shape_185,p:{x:609.9,y:-194.925}},{t:this.shape_184},{t:this.shape_183},{t:this.shape_338,p:{x:633.125,y:-193.925}},{t:this.shape_266,p:{x:642.775,y:-192.275}},{t:this.shape_195,p:{x:649.45,y:-195.575}},{t:this.shape_180},{t:this.shape_192,p:{x:665.9,y:-195.575}},{t:this.shape_179},{t:this.shape_337,p:{x:682.225,y:-193.925}},{t:this.shape_336,p:{x:691.825,y:-195.825}},{t:this.shape_176},{t:this.shape_335,p:{x:276.175,y:-162.025}},{t:this.shape_334,p:{x:282.625,y:-163.925}},{t:this.shape_333,p:{x:289.375,y:-162.025}},{t:this.shape_332,p:{x:298.925,y:-163.925}},{t:this.shape_34,p:{x:307.4}},{t:this.shape_331,p:{x:317.025,y:-163.925}},{t:this.shape_330,p:{x:325.375,y:-162.025}},{t:this.shape_169,p:{x:334.775}},{t:this.shape_199,p:{x:350.825,y:-160.375}},{t:this.shape_329,p:{x:360.025,y:-162.025}},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_328,p:{x:403.025,y:-162.025}},{t:this.shape_68,p:{x:412.425,y:-163.925}},{t:this.shape_327,p:{x:421.725,y:-162.025}},{t:this.shape_162,p:{x:431.125}},{t:this.shape_326,p:{x:446.6,y:-162.025}},{t:this.shape_325,p:{x:455.675,y:-162.025}},{t:this.shape_159,p:{x:464.775}},{t:this.shape_158},{t:this.shape_324,p:{x:481.25,y:-163.675}},{t:this.shape_8,p:{x:486.65}},{t:this.shape_156},{t:this.shape_57,p:{x:494.65,y:-157.225}},{t:this.shape_155},{t:this.shape_281,p:{x:522.575,y:-162.025}},{t:this.shape_323,p:{x:529.025,y:-163.925}},{t:this.shape_322,p:{x:535.775,y:-162.025}},{t:this.shape_151,p:{x:542.5,y:-163.675}},{t:this.shape_150,p:{x:549.325,y:-162.1}},{t:this.shape_321,p:{x:558.975,y:-163.925}},{t:this.shape_279,p:{x:567.325,y:-162.025}},{t:this.shape_147,p:{x:576.725,y:-162.1}},{t:this.shape_320,p:{x:592.2,y:-162.025}},{t:this.shape_277,p:{x:601.275,y:-162.025}},{t:this.shape_252,p:{x:610.225,y:-162.025}},{t:this.shape_278,p:{x:619.225,y:-162.025}},{t:this.shape_143},{t:this.shape_271,p:{x:634.325,y:-162.025}},{t:this.shape_141},{t:this.shape_219,p:{x:656.25,y:-163.675}},{t:this.shape_319,p:{x:660.375,y:-163.925}},{t:this.shape_269,p:{x:667.125,y:-162.025}},{t:this.shape_138,p:{x:676.525,y:-162.1}},{t:this.shape_318,p:{x:685.875,y:-160.325}},{t:this.shape_136,p:{y:-158.325}},{t:this.shape_135},{t:this.shape_134},{t:this.shape_267,p:{x:281.825,y:-130.075}},{t:this.shape_209,p:{x:306.475,y:-130.075}},{t:this.shape_265,p:{x:315.475,y:-130.075}},{t:this.shape_145,p:{x:324.725,y:-130.075}},{t:this.shape_131,p:{x:331.2,y:-131.725}},{t:this.shape_130,p:{x:337.975}},{t:this.shape_247,p:{x:347.325,y:-128.375}},{t:this.shape_261,p:{x:372.325,y:-130.075}},{t:this.shape_317,p:{x:381.875,y:-131.975}},{t:this.shape_259,p:{x:390.275,y:-130.075}},{t:this.shape_127,p:{x:399.675}},{t:this.shape_126},{t:this.shape_273,p:{x:439.425,y:-130.075}},{t:this.shape_262,p:{x:445.875,y:-131.975}},{t:this.shape_257,p:{x:452.575,y:-130.075}},{t:this.shape_316,p:{x:462.175,y:-131.975}},{t:this.shape_124},{t:this.shape_275,p:{x:480.225,y:-131.975}},{t:this.shape_256,p:{x:488.625,y:-130.075}},{t:this.shape_123,p:{x:497.975}},{t:this.shape_264,p:{x:523.075,y:-131.975}},{t:this.shape_254,p:{x:531.425,y:-130.075}},{t:this.shape_122},{t:this.shape_315,p:{x:551,y:-131.725}},{t:this.shape_121,p:{x:557.825}},{t:this.shape_12,p:{x:582.35,y:-130.075}},{t:this.shape_120,p:{x:588.85,y:-131.725}},{t:this.shape_255,p:{x:593.025,y:-131.975}},{t:this.shape_253,p:{x:599.725,y:-130.075}},{t:this.shape_118,p:{x:609.125,y:-130.15}},{t:this.shape_246,p:{x:618.475,y:-128.375}},{t:this.shape_116},{t:this.shape_270,p:{x:653.075,y:-130.075}},{t:this.shape_115,p:{x:662.175,y:-130.15}},{t:this.shape_243,p:{x:671.575,y:-128.375}},{t:this.shape_251,p:{x:681.125,y:-130.075}},{t:this.shape_113,p:{x:690.525,y:-130.15}},{t:this.shape_112},{t:this.shape_263,p:{y:-98.125,x:276.175}},{t:this.shape_39,p:{x:285.275,y:-98.2}},{t:this.shape_258,p:{x:294.675,y:-98.125}},{t:this.shape_21,p:{x:306.55,y:-98.2}},{t:this.shape_181,p:{x:319.025,y:-96.475}},{t:this.shape_210,p:{x:328.225,y:-98.125}},{t:this.shape_248,p:{x:334.675,y:-100.025}},{t:this.shape_260,p:{x:341.725,y:-100.025}},{t:this.shape_250,p:{x:350.075,y:-98.125}},{t:this.shape_30,p:{x:359.475,y:-98.2}},{t:this.shape_111},{t:this.shape_110},{t:this.shape_35,p:{x:412.275,y:-99.95}},{t:this.shape_109},{t:this.shape_32,p:{x:431.025,y:-100.025}},{t:this.shape_27,p:{x:440.425,y:-98.2}},{t:this.shape_108},{t:this.shape_208,p:{x:457.875,y:-98.125}},{t:this.shape_107},{t:this.shape_200,p:{x:504.975,y:-98.125}},{t:this.shape_16,p:{x:514.075,y:-98.2}},{t:this.shape_137,p:{x:523.425,y:-96.425}},{t:this.shape_206,p:{x:533.025,y:-98.125}},{t:this.shape_13,p:{x:542.425,y:-98.2}},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_2,p:{x:602.975,y:-98.2}},{t:this.shape_129,p:{x:612.325,y:-96.425}},{t:this.shape_197,p:{x:650.375,y:-100.025}},{t:this.shape_194,p:{x:658.725,y:-98.125}},{t:this.shape_84,p:{x:668.075,y:-96.475}},{t:this.shape_191,p:{x:677.325,y:-98.125}},{t:this.shape_245,p:{x:684.075,y:-100.025}},{t:this.shape_186,p:{x:690.775,y:-98.125}},{t:this.shape_102},{t:this.shape_188,p:{x:270.775,y:-66.225}},{t:this.shape_314,p:{x:278.5,y:-66.3}},{t:this.shape_244,p:{x:283.025,y:-68.125}},{t:this.shape_182,p:{x:289.725,y:-66.225}},{t:this.shape_100},{t:this.shape_178,p:{x:311.875,y:-66.225}},{t:this.shape_242},{t:this.shape_173,p:{x:330.625,y:-66.225}},{t:this.shape_241},{t:this.shape_97},{t:this.shape_240},{t:this.shape_174,p:{x:371.175,y:-68.125}},{t:this.shape_170,p:{x:377.875,y:-66.225}},{t:this.shape_239},{t:this.shape_177,p:{x:401.725,y:-68.125}},{t:this.shape_175,p:{x:410.125,y:-66.225}},{t:this.shape_153,p:{x:416.575,y:-68.125}},{t:this.shape_164,p:{x:423.275,y:-66.225}},{t:this.shape_238},{t:this.shape_59,p:{x:445.05,y:-67.875}},{t:this.shape_237},{t:this.shape_236},{t:this.shape_163,p:{x:474.025,y:-66.225}},{t:this.shape_235},{t:this.shape_234},{t:this.shape_152,p:{x:498.275,y:-66.225}},{t:this.shape_233},{t:this.shape_232},{t:this.shape_168,p:{x:540.775,y:-66.225}},{t:this.shape_231},{t:this.shape_117,p:{x:559.225,y:-64.525}},{t:this.shape_160,p:{x:568.825,y:-66.225}},{t:this.shape_140,p:{x:575.275,y:-68.125}},{t:this.shape_230},{t:this.shape_148,p:{x:591.375,y:-66.225}},{t:this.shape_313,p:{x:599.4,y:-66.3}},{t:this.shape_172,p:{x:606.825,y:-68.125}},{t:this.shape_144,p:{x:615.175,y:-66.225}},{t:this.shape_228},{t:this.shape_227},{t:this.shape_54,p:{x:651.825,y:-64.575}},{t:this.shape_154,p:{x:661.075,y:-66.225}},{t:this.shape_229,p:{x:668.8,y:-66.3}},{t:this.shape_225},{t:this.shape_142,p:{x:690.875,y:-66.225}},{t:this.shape_224},{t:this.shape_139,p:{x:270.825,y:-34.275}},{t:this.shape_223},{t:this.shape_312},{t:this.shape_72,p:{x:305.85,y:-35.925}},{t:this.shape_311},{t:this.shape_95,p:{x:318.075,y:-34.275}},{t:this.shape_226,p:{x:325.8,y:-34.35}},{t:this.shape_5,p:{x:330.4,y:-35.925}},{t:this.shape_218,p:{x:339.95}},{t:this.shape_133,p:{x:352.075,y:-34.275}},{t:this.shape_171,p:{x:370.825,y:-36.175}},{t:this.shape_125,p:{x:376.675,y:-36.175}},{t:this.shape_53,p:{x:380.85,y:-35.925}},{t:this.shape_217,p:{x:385.45}},{t:this.shape_85,p:{x:393.075,y:-34.275}},{t:this.shape_119,p:{x:399.525,y:-36.175}},{t:this.shape_23,p:{x:403.7,y:-35.925}},{t:this.shape_310},{t:this.shape_215,p:{x:422.65}},{t:this.shape_94,p:{x:443.925,y:-34.275}},{t:this.shape_132,p:{x:452.925,y:-34.275}},{t:this.shape_10,p:{x:462.175,y:-34.275}},{t:this.shape_157,p:{x:468.65,y:-35.925}},{t:this.shape_214,p:{x:475.425}},{t:this.shape_114,p:{x:484.775,y:-32.575}},{t:this.shape_38,p:{x:503.875,y:-32.625}},{t:this.shape_93,p:{x:513.125,y:-34.275}},{t:this.shape_161,p:{x:522.2,y:-34.275}},{t:this.shape_91,p:{x:531.225,y:-34.275}},{t:this.shape_212,p:{x:540.625}},{t:this.shape_106,p:{x:550.025,y:-32.575}},{t:this.shape_70,p:{x:559.575,y:-34.275}},{t:this.shape_99,p:{x:568.975,y:-34.35}},{t:this.shape_98,p:{x:578.425,y:-34.35}},{t:this.shape_309},{t:this.shape_64,p:{x:595.925,y:-34.275}},{t:this.shape_308,p:{x:602.7,y:-30.575}},{t:this.shape_307},{t:this.shape_55,p:{x:629.675,y:-34.275}},{t:this.shape_222,p:{x:638.9}},{t:this.shape_49,p:{x:648.575,y:-34.275}},{t:this.shape_306},{t:this.shape_44,p:{x:675.875,y:-34.275}},{t:this.shape_40,p:{x:685.175,y:-34.275}},{t:this.shape_305},{t:this.shape_304,p:{x:261.525,y:-4.25}},{t:this.shape_75,p:{x:270.775,y:-2.425}},{t:this.shape_101,p:{y:-2.5,x:278.5}},{t:this.shape_78,p:{x:285.35,y:-2.425}},{t:this.shape_33,p:{x:294.425,y:-2.425}},{t:this.shape_303,p:{y:-2.5}},{t:this.shape_31,p:{x:318.725,y:-2.425}},{t:this.shape_18,p:{x:328.025,y:-2.425}},{t:this.shape_302,p:{x:337.375,y:-2.5}},{t:this.shape_149,p:{x:358.425,y:-4.325}},{t:this.shape_45,p:{x:364.225,y:-4.325}},{t:this.shape_51,p:{x:368.4,y:-4.075}},{t:this.shape_301},{t:this.shape_67,p:{x:380.625,y:-2.425}},{t:this.shape_19,p:{x:387.075,y:-4.325}},{t:this.shape_17,p:{x:391.25,y:-4.075}},{t:this.shape_300,p:{x:398.05,y:-2.35}},{t:this.shape_299},{t:this.shape_298},{t:this.shape_46,p:{x:448.675,y:-2.425}},{t:this.shape_297,p:{x:457.825,y:-2.5}},{t:this.shape_1,p:{x:467.175,y:-0.725}},{t:this.shape_37,p:{x:476.725,y:-2.425}},{t:this.shape_4,p:{x:483.225,y:-4.325}},{t:this.shape_296},{t:this.shape_14,p:{x:499.325,y:-2.425}},{t:this.shape_220,p:{x:507.35,y:-2.5}},{t:this.shape_128,p:{x:514.725,y:-4.325}},{t:this.shape_9,p:{x:523.075,y:-2.425}},{t:this.shape_295,p:{x:532.475,y:-2.5}},{t:this.shape_294},{t:this.shape_293},{t:this.shape_79,p:{x:577.925,y:-4.325}},{t:this.shape_292,p:{x:586.525,y:-2.425}},{t:this.shape_146,p:{x:595.8,y:-2.425}},{t:this.shape_7,p:{x:604.875,y:-2.425}},{t:this.shape_48,p:{x:625.775,y:-4.325}},{t:this.shape_28,p:{x:634.175,y:-2.425}},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288,p:{x:674.65,y:-4.075}},{t:this.shape_3,p:{x:681.375,y:-2.425}},{t:this.shape_287,p:{x:690.775,y:-2.5}},{t:this.shape_286},{t:this.shape_20,p:{x:276.175,y:29.525}},{t:this.shape_285,p:{x:288.05,y:29.45}},{t:this.shape_284,p:{x:300.525}},{t:this.shape_11,p:{x:309.775,y:29.525}},{t:this.shape_283,p:{x:318.875,y:29.45}},{t:this.shape_69,p:{x:326.15,y:28.525}},{t:this.shape_216,p:{x:333.85,y:29.6}},{t:this.shape_43,p:{x:343.475,y:27.625}},{t:this.shape_41,p:{x:356.375,y:27.625}},{t:this.shape_82,p:{x:364.975,y:29.525}},{t:this.shape_15,p:{x:374.775,y:27.625}},{t:this.shape_61,p:{x:383.375,y:29.525}},{t:this.shape_282,p:{x:392.975,y:29.45}},{t:this.shape,p:{x:399.85,y:33.225}}]},43).to({state:[{t:this.shape_96,p:{x:261.625}},{t:this.shape_414,p:{x:271.275,y:-193.925}},{t:this.shape_280,p:{x:280.225,y:-193.925}},{t:this.shape_413,p:{x:289.225,y:-193.925}},{t:this.shape_207,p:{x:297.25}},{t:this.shape_412,p:{x:304.325,y:-193.925}},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201,p:{x:374.6}},{t:this.shape_411,p:{x:381.725,y:-193.925}},{t:this.shape_410,p:{x:391.075}},{t:this.shape_66,p:{x:399,y:-194}},{t:this.shape_409,p:{x:406.375,y:-193.925}},{t:this.shape_60,p:{x:415.85}},{t:this.shape_198},{t:this.shape_408,p:{x:435.225,y:-195.825}},{t:this.shape_196,p:{x:443.35,y:-193.925}},{t:this.shape_407,p:{x:449.9}},{t:this.shape_76,p:{x:463.625}},{t:this.shape_406,p:{x:472.875,y:-193.925}},{t:this.shape_92,p:{x:480.6,y:-194}},{t:this.shape_405},{t:this.shape_274,p:{x:494,y:-195.575}},{t:this.shape_71,p:{x:499.275}},{t:this.shape_404,p:{x:506.625,y:-193.925}},{t:this.shape_190},{t:this.shape_189,p:{x:528.275,y:-195.825}},{t:this.shape_403,p:{x:537.575,y:-193.925}},{t:this.shape_83,p:{x:545.3,y:-194}},{t:this.shape_187},{t:this.shape_402,p:{x:567.375,y:-193.925}},{t:this.shape_63,p:{x:575.275}},{t:this.shape_74,p:{x:581.35,y:-194}},{t:this.shape_345,p:{x:588.675,y:-193.925}},{t:this.shape_50,p:{x:598.15}},{t:this.shape_268},{t:this.shape_401},{t:this.shape_184},{t:this.shape_183},{t:this.shape_400,p:{x:633.125,y:-193.925}},{t:this.shape_399,p:{x:642.775,y:-192.275}},{t:this.shape_272,p:{x:649.45,y:-195.575}},{t:this.shape_180},{t:this.shape_195,p:{x:665.9,y:-195.575}},{t:this.shape_179},{t:this.shape_398,p:{x:682.225,y:-193.925}},{t:this.shape_397,p:{x:691.825,y:-195.825}},{t:this.shape_176},{t:this.shape_396,p:{x:276.175,y:-162.025}},{t:this.shape_395,p:{x:282.625,y:-163.925}},{t:this.shape_394,p:{x:289.375,y:-162.025}},{t:this.shape_393,p:{x:298.925,y:-163.925}},{t:this.shape_34,p:{x:307.4}},{t:this.shape_392,p:{x:317.025,y:-163.925}},{t:this.shape_391,p:{x:325.375,y:-162.025}},{t:this.shape_169,p:{x:334.775}},{t:this.shape_390,p:{x:350.825,y:-160.375}},{t:this.shape_389,p:{x:360.025,y:-162.025}},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_388,p:{x:403.025,y:-162.025}},{t:this.shape_68,p:{x:412.425,y:-163.925}},{t:this.shape_348,p:{x:421.725,y:-162.025}},{t:this.shape_162,p:{x:431.125}},{t:this.shape_387,p:{x:446.6,y:-162.025}},{t:this.shape_386,p:{x:455.675,y:-162.025}},{t:this.shape_159,p:{x:464.775}},{t:this.shape_158},{t:this.shape_385},{t:this.shape_8,p:{x:486.65}},{t:this.shape_156},{t:this.shape_57,p:{x:494.65,y:-157.225}},{t:this.shape_155},{t:this.shape_384,p:{x:522.575,y:-162.025}},{t:this.shape_383,p:{x:529.025,y:-163.925}},{t:this.shape_347,p:{x:535.775,y:-162.025}},{t:this.shape_382,p:{x:542.5,y:-163.675}},{t:this.shape_150,p:{x:549.325,y:-162.1}},{t:this.shape_344,p:{x:558.975,y:-163.925}},{t:this.shape_342,p:{x:567.325,y:-162.025}},{t:this.shape_147,p:{x:576.725,y:-162.1}},{t:this.shape_381,p:{x:592.2,y:-162.025}},{t:this.shape_380,p:{x:601.275,y:-162.025}},{t:this.shape_252,p:{x:610.225,y:-162.025}},{t:this.shape_340,p:{x:619.225,y:-162.025}},{t:this.shape_143},{t:this.shape_338,p:{x:634.325,y:-162.025}},{t:this.shape_141},{t:this.shape_249,p:{x:656.25,y:-163.675}},{t:this.shape_379,p:{x:660.375,y:-163.925}},{t:this.shape_337,p:{x:667.125,y:-162.025}},{t:this.shape_138,p:{x:676.525,y:-162.1}},{t:this.shape_378,p:{x:685.875,y:-160.325}},{t:this.shape_136,p:{y:-158.325}},{t:this.shape_135},{t:this.shape_134},{t:this.shape_333,p:{x:281.825,y:-130.075}},{t:this.shape_209,p:{x:306.475,y:-130.075}},{t:this.shape_330,p:{x:315.475,y:-130.075}},{t:this.shape_145,p:{x:324.725,y:-130.075}},{t:this.shape_377,p:{x:331.2,y:-131.725}},{t:this.shape_130,p:{x:337.975}},{t:this.shape_318,p:{x:347.325,y:-128.375}},{t:this.shape_328,p:{x:372.325,y:-130.075}},{t:this.shape_336,p:{x:381.875,y:-131.975}},{t:this.shape_327,p:{x:390.275,y:-130.075}},{t:this.shape_127,p:{x:399.675}},{t:this.shape_126},{t:this.shape_376,p:{x:439.425,y:-130.075}},{t:this.shape_334,p:{x:445.875,y:-131.975}},{t:this.shape_322,p:{x:452.575,y:-130.075}},{t:this.shape_332,p:{x:462.175,y:-131.975}},{t:this.shape_124},{t:this.shape_331,p:{x:480.225,y:-131.975}},{t:this.shape_279,p:{x:488.625,y:-130.075}},{t:this.shape_123,p:{x:497.975}},{t:this.shape_321,p:{x:523.075,y:-131.975}},{t:this.shape_278,p:{x:531.425,y:-130.075}},{t:this.shape_122},{t:this.shape_375},{t:this.shape_121,p:{x:557.825}},{t:this.shape_12,p:{x:582.35,y:-130.075}},{t:this.shape_151,p:{x:588.85,y:-131.725}},{t:this.shape_323,p:{x:593.025,y:-131.975}},{t:this.shape_271,p:{x:599.725,y:-130.075}},{t:this.shape_118,p:{x:609.125,y:-130.15}},{t:this.shape_247,p:{x:618.475,y:-128.375}},{t:this.shape_116},{t:this.shape_349,p:{x:653.075,y:-130.075}},{t:this.shape_115,p:{x:662.175,y:-130.15}},{t:this.shape_246,p:{x:671.575,y:-128.375}},{t:this.shape_269,p:{x:681.125,y:-130.075}},{t:this.shape_113,p:{x:690.525,y:-130.15}},{t:this.shape_112},{t:this.shape_346,p:{x:276.175,y:-98.125}},{t:this.shape_39,p:{x:285.275,y:-98.2}},{t:this.shape_343,p:{x:294.675,y:-98.125}},{t:this.shape_21,p:{x:306.55,y:-98.2}},{t:this.shape_374,p:{x:319.025}},{t:this.shape_341,p:{x:328.225,y:-98.125}},{t:this.shape_319,p:{x:334.675,y:-100.025}},{t:this.shape_317,p:{x:341.725,y:-100.025}},{t:this.shape_267,p:{x:350.075,y:-98.125}},{t:this.shape_30,p:{x:359.475,y:-98.2}},{t:this.shape_111},{t:this.shape_110},{t:this.shape_35,p:{x:412.275,y:-99.95}},{t:this.shape_109},{t:this.shape_32,p:{x:431.025,y:-100.025}},{t:this.shape_27,p:{x:440.425,y:-98.2}},{t:this.shape_108},{t:this.shape_265,p:{x:457.875,y:-98.125}},{t:this.shape_107},{t:this.shape_335,p:{x:504.975,y:-98.125}},{t:this.shape_16,p:{x:514.075,y:-98.2}},{t:this.shape_243,p:{x:523.425,y:-96.425}},{t:this.shape_261,p:{x:533.025,y:-98.125}},{t:this.shape_13,p:{x:542.425,y:-98.2}},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_2,p:{x:602.975,y:-98.2}},{t:this.shape_137,p:{x:612.325,y:-96.425}},{t:this.shape_316,p:{x:650.375,y:-100.025}},{t:this.shape_329,p:{x:658.725,y:-98.125}},{t:this.shape_276,p:{x:668.075,y:-96.475}},{t:this.shape_259,p:{x:677.325,y:-98.125}},{t:this.shape_262,p:{x:684.075,y:-100.025}},{t:this.shape_257,p:{x:690.775,y:-98.125}},{t:this.shape_102},{t:this.shape_325,p:{x:270.775,y:-66.225}},{t:this.shape_373,p:{x:278.5,y:-66.3}},{t:this.shape_255,p:{x:283.025,y:-68.125}},{t:this.shape_256,p:{x:289.725,y:-66.225}},{t:this.shape_100},{t:this.shape_254,p:{x:311.875,y:-66.225}},{t:this.shape_242},{t:this.shape_253,p:{x:330.625,y:-66.225}},{t:this.shape_241},{t:this.shape_97},{t:this.shape_240},{t:this.shape_248,p:{x:371.175,y:-68.125}},{t:this.shape_251,p:{x:377.875,y:-66.225}},{t:this.shape_239},{t:this.shape_275,p:{x:401.725,y:-68.125}},{t:this.shape_281,p:{x:410.125,y:-66.225}},{t:this.shape_245,p:{x:416.575,y:-68.125}},{t:this.shape_250,p:{x:423.275,y:-66.225}},{t:this.shape_238},{t:this.shape_192,p:{x:445.05,y:-67.875}},{t:this.shape_237},{t:this.shape_236},{t:this.shape_208,p:{x:474.025,y:-66.225}},{t:this.shape_235},{t:this.shape_234},{t:this.shape_206,p:{x:498.275,y:-66.225}},{t:this.shape_233},{t:this.shape_232},{t:this.shape_277,p:{x:540.775,y:-66.225}},{t:this.shape_231},{t:this.shape_129,p:{x:559.225,y:-64.525}},{t:this.shape_273,p:{x:568.825,y:-66.225}},{t:this.shape_244,p:{x:575.275,y:-68.125}},{t:this.shape_230},{t:this.shape_191,p:{x:591.375,y:-66.225}},{t:this.shape_372,p:{x:599.4}},{t:this.shape_264,p:{x:606.825,y:-68.125}},{t:this.shape_186,p:{x:615.175,y:-66.225}},{t:this.shape_228},{t:this.shape_227},{t:this.shape_266,p:{x:651.825,y:-64.575}},{t:this.shape_270,p:{x:661.075,y:-66.225}},{t:this.shape_371,p:{x:668.8,y:-66.3}},{t:this.shape_225},{t:this.shape_182,p:{x:690.875,y:-66.225}},{t:this.shape_224},{t:this.shape_178,p:{x:270.825,y:-34.275}},{t:this.shape_223},{t:this.shape_312},{t:this.shape_72,p:{x:305.85,y:-35.925}},{t:this.shape_311},{t:this.shape_263,p:{y:-34.275,x:318.075}},{t:this.shape_313,p:{x:325.8,y:-34.35}},{t:this.shape_59,p:{x:330.4,y:-35.925}},{t:this.shape_218,p:{x:339.95}},{t:this.shape_173,p:{x:352.075,y:-34.275}},{t:this.shape_260,p:{x:370.825,y:-36.175}},{t:this.shape_174,p:{x:376.675,y:-36.175}},{t:this.shape_219,p:{x:380.85,y:-35.925}},{t:this.shape_217,p:{x:385.45}},{t:this.shape_258,p:{x:393.075,y:-34.275}},{t:this.shape_153,p:{x:399.525,y:-36.175}},{t:this.shape_53,p:{x:403.7,y:-35.925}},{t:this.shape_310},{t:this.shape_215,p:{x:422.65}},{t:this.shape_94,p:{x:443.925,y:-34.275}},{t:this.shape_170,p:{x:452.925,y:-34.275}},{t:this.shape_10,p:{x:462.175,y:-34.275}},{t:this.shape_324,p:{x:468.65,y:-35.925}},{t:this.shape_214,p:{x:475.425}},{t:this.shape_117,p:{x:484.775,y:-32.575}},{t:this.shape_199,p:{x:503.875,y:-32.625}},{t:this.shape_164,p:{x:513.125,y:-34.275}},{t:this.shape_326,p:{x:522.2,y:-34.275}},{t:this.shape_163,p:{x:531.225,y:-34.275}},{t:this.shape_212,p:{x:540.625}},{t:this.shape_114,p:{x:550.025,y:-32.575}},{t:this.shape_152,p:{x:559.575,y:-34.275}},{t:this.shape_99,p:{x:568.975,y:-34.35}},{t:this.shape_98,p:{x:578.425,y:-34.35}},{t:this.shape_309},{t:this.shape_148,p:{x:595.925,y:-34.275}},{t:this.shape_308,p:{x:602.7,y:-30.575}},{t:this.shape_307},{t:this.shape_144,p:{x:629.675,y:-34.275}},{t:this.shape_222,p:{x:638.9}},{t:this.shape_142,p:{x:648.575,y:-34.275}},{t:this.shape_306},{t:this.shape_139,p:{x:675.875,y:-34.275}},{t:this.shape_133,p:{x:685.175,y:-34.275}},{t:this.shape_305},{t:this.shape_370},{t:this.shape_210,p:{x:270.775,y:-2.425}},{t:this.shape_369,p:{x:278.5,y:-2.5}},{t:this.shape_78,p:{x:285.35,y:-2.425}},{t:this.shape_132,p:{x:294.425,y:-2.425}},{t:this.shape_303,p:{y:-2.5}},{t:this.shape_93,p:{x:318.725,y:-2.425}},{t:this.shape_91,p:{x:328.025,y:-2.425}},{t:this.shape_302,p:{x:337.375,y:-2.5}},{t:this.shape_197,p:{x:358.425,y:-4.325}},{t:this.shape_140,p:{x:364.225,y:-4.325}},{t:this.shape_51,p:{x:368.4,y:-4.075}},{t:this.shape_301},{t:this.shape_200,p:{x:380.625,y:-2.425}},{t:this.shape_125,p:{x:387.075,y:-4.325}},{t:this.shape_315,p:{x:391.25,y:-4.075}},{t:this.shape_368},{t:this.shape_299},{t:this.shape_298},{t:this.shape_194,p:{x:448.675,y:-2.425}},{t:this.shape_297,p:{x:457.825,y:-2.5}},{t:this.shape_106,p:{x:467.175,y:-0.725}},{t:this.shape_188,p:{x:476.725,y:-2.425}},{t:this.shape_119,p:{x:483.225,y:-4.325}},{t:this.shape_296},{t:this.shape_70,p:{x:499.325,y:-2.425}},{t:this.shape_229,p:{x:507.35,y:-2.5}},{t:this.shape_177,p:{x:514.725,y:-4.325}},{t:this.shape_64,p:{x:523.075,y:-2.425}},{t:this.shape_295,p:{x:532.475,y:-2.5}},{t:this.shape_294},{t:this.shape_293},{t:this.shape_172,p:{x:577.925,y:-4.325}},{t:this.shape_339,p:{x:586.525,y:-2.425}},{t:this.shape_320,p:{x:595.8,y:-2.425}},{t:this.shape_55,p:{x:604.875,y:-2.425}},{t:this.shape_171,p:{x:625.775,y:-4.325}},{t:this.shape_175,p:{x:634.175,y:-2.425}},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288,p:{x:674.65,y:-4.075}},{t:this.shape_49,p:{x:681.375,y:-2.425}},{t:this.shape_287,p:{x:690.775,y:-2.5}},{t:this.shape_286},{t:this.shape_168,p:{x:276.175,y:29.525}},{t:this.shape_285,p:{x:288.05,y:29.45}},{t:this.shape_304,p:{x:300.525,y:27.7}},{t:this.shape_160,p:{x:309.775,y:29.525}},{t:this.shape_283,p:{x:318.875,y:29.45}},{t:this.shape_69,p:{x:326.15,y:28.525}},{t:this.shape_216,p:{x:333.85,y:29.6}},{t:this.shape_149,p:{x:343.475,y:27.625}},{t:this.shape_128,p:{x:359.675,y:27.625}},{t:this.shape_292,p:{x:368.275,y:29.525}},{t:this.shape_79,p:{x:378.075,y:27.625}},{t:this.shape_82,p:{x:386.675,y:29.525}},{t:this.shape_282,p:{x:396.275,y:29.45}},{t:this.shape_367},{t:this.shape_366},{t:this.shape_181,p:{x:428.125,y:31.175}},{t:this.shape_154,p:{x:437.375,y:29.525}},{t:this.shape_314,p:{x:445.1,y:29.45}},{t:this.shape_365,p:{x:455.05,y:29.45}},{t:this.shape_44,p:{x:467.175,y:29.525}},{t:this.shape_284,p:{x:484.325}},{t:this.shape_95,p:{x:493.575,y:29.525}},{t:this.shape_226,p:{x:501.3,y:29.45}},{t:this.shape_1,p:{x:508.375,y:31.225}},{t:this.shape_85,p:{x:517.975,y:29.525}},{t:this.shape_220,p:{x:525.7,y:29.45}},{t:this.shape_40,p:{x:532.775,y:29.525}},{t:this.shape_48,p:{x:542.375,y:27.625}},{t:this.shape_43,p:{x:558.575,y:27.625}},{t:this.shape_75,p:{x:566.925,y:29.525}},{t:this.shape_33,p:{x:583.475,y:29.525}},{t:this.shape_45,p:{x:590.225,y:27.625}},{t:this.shape_31,p:{x:596.925,y:29.525}},{t:this.shape_364},{t:this.shape_101,p:{y:29.45,x:618}},{t:this.shape_67,p:{x:625.075,y:29.525}},{t:this.shape_84,p:{x:634.425,y:31.175}},{t:this.shape_363},{t:this.shape_61,p:{x:649.725,y:29.525}},{t:this.shape_362},{t:this.shape_300,p:{x:668.95,y:29.6}},{t:this.shape_41,p:{x:678.575,y:27.625}},{t:this.shape_146,p:{x:686.7,y:29.525}},{t:this.shape_131,p:{x:693.25,y:27.875}},{t:this.shape_361},{t:this.shape_46,p:{x:270.775,y:61.425}},{t:this.shape_360,p:{x:277.7}},{t:this.shape_157,p:{x:282.8,y:59.775}},{t:this.shape_359,p:{x:289.575}},{t:this.shape_18,p:{x:298.925,y:61.425}},{t:this.shape_358,p:{x:312.4}},{t:this.shape_14,p:{x:322.075,y:61.425}},{t:this.shape_357,p:{x:331.475}},{t:this.shape_356,p:{x:345.05}},{t:this.shape_120,p:{x:352.15,y:59.775}},{t:this.shape_29,p:{x:358.6,y:61.425}},{t:this.shape_17,p:{x:365.15,y:59.775}},{t:this.shape_355,p:{x:374.7}},{t:this.shape_54,p:{x:387.175,y:63.075}},{t:this.shape_9,p:{x:396.425,y:61.425}},{t:this.shape_354,p:{x:405.825,y:61.35}},{t:this.shape_353},{t:this.shape_5,p:{x:426.5,y:59.775}},{t:this.shape_62,p:{x:436.15,y:61.35}},{t:this.shape_37,p:{x:443.225,y:61.425}},{t:this.shape_161,p:{x:452,y:61.425}},{t:this.shape_28,p:{x:461.075,y:61.425}},{t:this.shape_38,p:{x:470.425,y:63.075}},{t:this.shape_185,p:{x:477.6,y:60.425}},{t:this.shape_7,p:{x:485.175,y:61.425}},{t:this.shape_15,p:{x:494.775,y:59.525}},{t:this.shape_20,p:{x:503.125,y:61.425}},{t:this.shape_19,p:{x:509.625,y:59.525}},{t:this.shape_193,p:{x:520.3,y:61.425}},{t:this.shape_11,p:{x:529.375,y:61.425}},{t:this.shape_352},{t:this.shape_23,p:{x:550.85,y:59.775}},{t:this.shape_351,p:{x:557.625,y:61.35}},{t:this.shape_3,p:{x:566.975,y:61.425}},{t:this.shape_4,p:{x:573.725,y:59.525}},{t:this.shape_350,p:{x:578,y:65.125}}]},44).to({state:[{t:this.shape_96,p:{x:261.625}},{t:this.shape_472,p:{x:271.275,y:-193.925}},{t:this.shape_280,p:{x:280.225,y:-193.925}},{t:this.shape_471,p:{x:289.225,y:-193.925}},{t:this.shape_470},{t:this.shape_469,p:{x:304.325,y:-193.925}},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_468},{t:this.shape_467,p:{x:381.725,y:-193.925}},{t:this.shape_466},{t:this.shape_201,p:{x:399}},{t:this.shape_465,p:{x:406.375,y:-193.925}},{t:this.shape_60,p:{x:415.85}},{t:this.shape_198},{t:this.shape_464,p:{x:435.225,y:-195.825}},{t:this.shape_196,p:{x:443.35,y:-193.925}},{t:this.shape_463},{t:this.shape_76,p:{x:463.625}},{t:this.shape_462,p:{x:472.875,y:-193.925}},{t:this.shape_62,p:{x:480.6,y:-194}},{t:this.shape_193,p:{x:487.45,y:-193.925}},{t:this.shape_461,p:{x:494}},{t:this.shape_71,p:{x:499.275}},{t:this.shape_460,p:{x:506.625,y:-193.925}},{t:this.shape_190},{t:this.shape_459,p:{x:528.275,y:-195.825}},{t:this.shape_414,p:{x:537.575,y:-193.925}},{t:this.shape_207,p:{x:545.3}},{t:this.shape_187},{t:this.shape_458,p:{x:567.375,y:-193.925}},{t:this.shape_63,p:{x:575.275}},{t:this.shape_457},{t:this.shape_456,p:{x:588.675,y:-193.925}},{t:this.shape_50,p:{x:598.15}},{t:this.shape_249,p:{x:605.3,y:-195.575}},{t:this.shape_185,p:{x:609.9,y:-194.925}},{t:this.shape_184},{t:this.shape_183},{t:this.shape_455,p:{x:633.125,y:-193.925}},{t:this.shape_410,p:{x:642.775}},{t:this.shape_454,p:{x:649.45}},{t:this.shape_180},{t:this.shape_407,p:{x:665.9}},{t:this.shape_179},{t:this.shape_453,p:{x:682.225,y:-193.925}},{t:this.shape_452,p:{x:691.825,y:-195.825}},{t:this.shape_176},{t:this.shape_411,p:{x:276.175,y:-162.025}},{t:this.shape_451,p:{x:282.625,y:-163.925}},{t:this.shape_450,p:{x:289.375,y:-162.025}},{t:this.shape_449,p:{x:298.925,y:-163.925}},{t:this.shape_34,p:{x:307.4}},{t:this.shape_408,p:{x:317.025,y:-163.925}},{t:this.shape_448,p:{x:325.375,y:-162.025}},{t:this.shape_169,p:{x:334.775}},{t:this.shape_399,p:{x:350.825,y:-160.375}},{t:this.shape_406,p:{x:360.025,y:-162.025}},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_447,p:{x:403.025,y:-162.025}},{t:this.shape_446,p:{x:412.425,y:-163.925}},{t:this.shape_413,p:{x:421.725,y:-162.025}},{t:this.shape_162,p:{x:431.125}},{t:this.shape_445},{t:this.shape_403,p:{x:455.675,y:-162.025}},{t:this.shape_159,p:{x:464.775}},{t:this.shape_158},{t:this.shape_385},{t:this.shape_8,p:{x:486.65}},{t:this.shape_156},{t:this.shape_57,p:{x:494.65,y:-157.225}},{t:this.shape_155},{t:this.shape_396,p:{x:522.575,y:-162.025}},{t:this.shape_444,p:{x:529.025,y:-163.925}},{t:this.shape_412,p:{x:535.775,y:-162.025}},{t:this.shape_443,p:{x:542.5,y:-163.675}},{t:this.shape_150,p:{x:549.325,y:-162.1}},{t:this.shape_397,p:{x:558.975,y:-163.925}},{t:this.shape_404,p:{x:567.325,y:-162.025}},{t:this.shape_147,p:{x:576.725,y:-162.1}},{t:this.shape_381,p:{x:592.2,y:-162.025}},{t:this.shape_389,p:{x:601.275,y:-162.025}},{t:this.shape_252,p:{x:610.225,y:-162.025}},{t:this.shape_402,p:{x:619.225,y:-162.025}},{t:this.shape_143},{t:this.shape_400,p:{x:634.325,y:-162.025}},{t:this.shape_141},{t:this.shape_219,p:{x:656.25,y:-163.675}},{t:this.shape_395,p:{x:660.375,y:-163.925}},{t:this.shape_398,p:{x:667.125,y:-162.025}},{t:this.shape_138,p:{x:676.525,y:-162.1}},{t:this.shape_442,p:{x:685.875,y:-160.325}},{t:this.shape_136,p:{y:-158.325}},{t:this.shape_135},{t:this.shape_134},{t:this.shape_394,p:{x:281.825,y:-130.075}},{t:this.shape_209,p:{x:306.475,y:-130.075}},{t:this.shape_391,p:{x:315.475,y:-130.075}},{t:this.shape_145,p:{x:324.725,y:-130.075}},{t:this.shape_382,p:{x:331.2,y:-131.725}},{t:this.shape_130,p:{x:337.975}},{t:this.shape_378,p:{x:347.325,y:-128.375}},{t:this.shape_388,p:{x:372.325,y:-130.075}},{t:this.shape_393,p:{x:381.875,y:-131.975}},{t:this.shape_348,p:{x:390.275,y:-130.075}},{t:this.shape_127,p:{x:399.675}},{t:this.shape_126},{t:this.shape_386,p:{x:439.425,y:-130.075}},{t:this.shape_383,p:{x:445.875,y:-131.975}},{t:this.shape_347,p:{x:452.575,y:-130.075}},{t:this.shape_392,p:{x:462.175,y:-131.975}},{t:this.shape_124},{t:this.shape_344,p:{x:480.225,y:-131.975}},{t:this.shape_342,p:{x:488.625,y:-130.075}},{t:this.shape_123,p:{x:497.975}},{t:this.shape_336,p:{x:523.075,y:-131.975}},{t:this.shape_340,p:{x:531.425,y:-130.075}},{t:this.shape_122},{t:this.shape_375},{t:this.shape_121,p:{x:557.825}},{t:this.shape_441},{t:this.shape_377,p:{x:588.85,y:-131.725}},{t:this.shape_379,p:{x:593.025,y:-131.975}},{t:this.shape_338,p:{x:599.725,y:-130.075}},{t:this.shape_118,p:{x:609.125,y:-130.15}},{t:this.shape_318,p:{x:618.475,y:-128.375}},{t:this.shape_116},{t:this.shape_384,p:{x:653.075,y:-130.075}},{t:this.shape_115,p:{x:662.175,y:-130.15}},{t:this.shape_247,p:{x:671.575,y:-128.375}},{t:this.shape_337,p:{x:681.125,y:-130.075}},{t:this.shape_113,p:{x:690.525,y:-130.15}},{t:this.shape_112},{t:this.shape_380,p:{x:276.175,y:-98.125}},{t:this.shape_39,p:{x:285.275,y:-98.2}},{t:this.shape_376,p:{x:294.675,y:-98.125}},{t:this.shape_21,p:{x:306.55,y:-98.2}},{t:this.shape_390,p:{x:319.025,y:-96.475}},{t:this.shape_349,p:{x:328.225,y:-98.125}},{t:this.shape_334,p:{x:334.675,y:-100.025}},{t:this.shape_332,p:{x:341.725,y:-100.025}},{t:this.shape_333,p:{x:350.075,y:-98.125}},{t:this.shape_30,p:{x:359.475,y:-98.2}},{t:this.shape_111},{t:this.shape_110},{t:this.shape_35,p:{x:412.275,y:-99.95}},{t:this.shape_109},{t:this.shape_189,p:{x:431.025,y:-100.025}},{t:this.shape_27,p:{x:440.425,y:-98.2}},{t:this.shape_108},{t:this.shape_330,p:{x:457.875,y:-98.125}},{t:this.shape_107},{t:this.shape_346,p:{x:504.975,y:-98.125}},{t:this.shape_16,p:{x:514.075,y:-98.2}},{t:this.shape_246,p:{x:523.425,y:-96.425}},{t:this.shape_328,p:{x:533.025,y:-98.125}},{t:this.shape_13,p:{x:542.425,y:-98.2}},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_2,p:{x:602.975,y:-98.2}},{t:this.shape_243,p:{x:612.325,y:-96.425}},{t:this.shape_331,p:{x:650.375,y:-100.025}},{t:this.shape_343,p:{x:658.725,y:-98.125}},{t:this.shape_374,p:{x:668.075}},{t:this.shape_327,p:{x:677.325,y:-98.125}},{t:this.shape_323,p:{x:684.075,y:-100.025}},{t:this.shape_322,p:{x:690.775,y:-98.125}},{t:this.shape_102},{t:this.shape_341,p:{x:270.775,y:-66.225}},{t:this.shape_373,p:{x:278.5,y:-66.3}},{t:this.shape_319,p:{x:283.025,y:-68.125}},{t:this.shape_279,p:{x:289.725,y:-66.225}},{t:this.shape_100},{t:this.shape_278,p:{x:311.875,y:-66.225}},{t:this.shape_242},{t:this.shape_271,p:{x:330.625,y:-66.225}},{t:this.shape_241},{t:this.shape_97},{t:this.shape_240},{t:this.shape_262,p:{x:371.175,y:-68.125}},{t:this.shape_269,p:{x:377.875,y:-66.225}},{t:this.shape_239},{t:this.shape_321,p:{x:401.725,y:-68.125}},{t:this.shape_335,p:{x:410.125,y:-66.225}},{t:this.shape_255,p:{x:416.575,y:-68.125}},{t:this.shape_267,p:{x:423.275,y:-66.225}},{t:this.shape_238},{t:this.shape_274,p:{x:445.05,y:-67.875}},{t:this.shape_237},{t:this.shape_236},{t:this.shape_265,p:{x:474.025,y:-66.225}},{t:this.shape_235},{t:this.shape_234},{t:this.shape_261,p:{x:498.275,y:-66.225}},{t:this.shape_233},{t:this.shape_232},{t:this.shape_329,p:{x:540.775,y:-66.225}},{t:this.shape_231},{t:this.shape_137,p:{x:559.225,y:-64.525}},{t:this.shape_325,p:{x:568.825,y:-66.225}},{t:this.shape_248,p:{x:575.275,y:-68.125}},{t:this.shape_230},{t:this.shape_259,p:{x:591.375,y:-66.225}},{t:this.shape_372,p:{x:599.4}},{t:this.shape_317,p:{x:606.825,y:-68.125}},{t:this.shape_257,p:{x:615.175,y:-66.225}},{t:this.shape_228},{t:this.shape_227},{t:this.shape_276,p:{x:651.825,y:-64.575}},{t:this.shape_281,p:{x:661.075,y:-66.225}},{t:this.shape_371,p:{x:668.8,y:-66.3}},{t:this.shape_225},{t:this.shape_256,p:{x:690.875,y:-66.225}},{t:this.shape_224},{t:this.shape_254,p:{x:270.825,y:-34.275}},{t:this.shape_223},{t:this.shape_312},{t:this.shape_72,p:{x:305.85,y:-35.925}},{t:this.shape_311},{t:this.shape_277,p:{x:318.075,y:-34.275}},{t:this.shape_313,p:{x:325.8,y:-34.35}},{t:this.shape_272,p:{x:330.4,y:-35.925}},{t:this.shape_218,p:{x:339.95}},{t:this.shape_253,p:{x:352.075,y:-34.275}},{t:this.shape_316,p:{x:370.825,y:-36.175}},{t:this.shape_245,p:{x:376.675,y:-36.175}},{t:this.shape_53,p:{x:380.85,y:-35.925}},{t:this.shape_217,p:{x:385.45}},{t:this.shape_273,p:{x:393.075,y:-34.275}},{t:this.shape_244,p:{x:399.525,y:-36.175}},{t:this.shape_23,p:{x:403.7,y:-35.925}},{t:this.shape_310},{t:this.shape_215,p:{x:422.65}},{t:this.shape_94,p:{x:443.925,y:-34.275}},{t:this.shape_251,p:{x:452.925,y:-34.275}},{t:this.shape_10,p:{x:462.175,y:-34.275}},{t:this.shape_324,p:{x:468.65,y:-35.925}},{t:this.shape_214,p:{x:475.425}},{t:this.shape_129,p:{x:484.775,y:-32.575}},{t:this.shape_266,p:{x:503.875,y:-32.625}},{t:this.shape_250,p:{x:513.125,y:-34.275}},{t:this.shape_387,p:{x:522.2,y:-34.275}},{t:this.shape_208,p:{x:531.225,y:-34.275}},{t:this.shape_212,p:{x:540.625}},{t:this.shape_117,p:{x:550.025,y:-32.575}},{t:this.shape_206,p:{x:559.575,y:-34.275}},{t:this.shape_99,p:{x:568.975,y:-34.35}},{t:this.shape_98,p:{x:578.425,y:-34.35}},{t:this.shape_309},{t:this.shape_191,p:{x:595.925,y:-34.275}},{t:this.shape_308,p:{x:602.7,y:-30.575}},{t:this.shape_307},{t:this.shape_186,p:{x:629.675,y:-34.275}},{t:this.shape_222,p:{x:638.9}},{t:this.shape_182,p:{x:648.575,y:-34.275}},{t:this.shape_306},{t:this.shape_178,p:{x:675.875,y:-34.275}},{t:this.shape_173,p:{x:685.175,y:-34.275}},{t:this.shape_305},{t:this.shape_370},{t:this.shape_270,p:{x:270.775,y:-2.425}},{t:this.shape_369,p:{x:278.5,y:-2.5}},{t:this.shape_78,p:{x:285.35,y:-2.425}},{t:this.shape_170,p:{x:294.425,y:-2.425}},{t:this.shape_303,p:{y:-2.5}},{t:this.shape_164,p:{x:318.725,y:-2.425}},{t:this.shape_163,p:{x:328.025,y:-2.425}},{t:this.shape_302,p:{x:337.375,y:-2.5}},{t:this.shape_275,p:{x:358.425,y:-4.325}},{t:this.shape_174,p:{x:364.225,y:-4.325}},{t:this.shape_51,p:{x:368.4,y:-4.075}},{t:this.shape_301},{t:this.shape_263,p:{y:-2.425,x:380.625}},{t:this.shape_153,p:{x:387.075,y:-4.325}},{t:this.shape_315,p:{x:391.25,y:-4.075}},{t:this.shape_368},{t:this.shape_299},{t:this.shape_298},{t:this.shape_258,p:{x:448.675,y:-2.425}},{t:this.shape_297,p:{x:457.825,y:-2.5}},{t:this.shape_114,p:{x:467.175,y:-0.725}},{t:this.shape_210,p:{x:476.725,y:-2.425}},{t:this.shape_140,p:{x:483.225,y:-4.325}},{t:this.shape_296},{t:this.shape_152,p:{x:499.325,y:-2.425}},{t:this.shape_229,p:{x:507.35,y:-2.5}},{t:this.shape_264,p:{x:514.725,y:-4.325}},{t:this.shape_148,p:{x:523.075,y:-2.425}},{t:this.shape_295,p:{x:532.475,y:-2.5}},{t:this.shape_294},{t:this.shape_293},{t:this.shape_260,p:{x:577.925,y:-4.325}},{t:this.shape_409,p:{x:586.525,y:-2.425}},{t:this.shape_320,p:{x:595.8,y:-2.425}},{t:this.shape_144,p:{x:604.875,y:-2.425}},{t:this.shape_197,p:{x:625.775,y:-4.325}},{t:this.shape_200,p:{x:634.175,y:-2.425}},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_440},{t:this.shape_142,p:{x:681.375,y:-2.425}},{t:this.shape_287,p:{x:690.775,y:-2.5}},{t:this.shape_286},{t:this.shape_194,p:{x:276.175,y:29.525}},{t:this.shape_285,p:{x:288.05,y:29.45}},{t:this.shape_304,p:{x:300.525,y:27.7}},{t:this.shape_188,p:{x:309.775,y:29.525}},{t:this.shape_283,p:{x:318.875,y:29.45}},{t:this.shape_69,p:{x:326.15,y:28.525}},{t:this.shape_216,p:{x:333.85,y:29.6}},{t:this.shape_177,p:{x:343.475,y:27.625}},{t:this.shape_172,p:{x:359.675,y:27.625}},{t:this.shape_345,p:{x:368.275,y:29.525}},{t:this.shape_171,p:{x:378.075,y:27.625}},{t:this.shape_339,p:{x:386.675,y:29.525}},{t:this.shape_282,p:{x:396.275,y:29.45}},{t:this.shape_367},{t:this.shape_366},{t:this.shape_199,p:{x:428.125,y:31.175}},{t:this.shape_175,p:{x:437.375,y:29.525}},{t:this.shape_314,p:{x:445.1,y:29.45}},{t:this.shape_365,p:{x:455.05,y:29.45}},{t:this.shape_139,p:{x:467.175,y:29.525}},{t:this.shape_284,p:{x:484.325}},{t:this.shape_168,p:{x:493.575,y:29.525}},{t:this.shape_226,p:{x:501.3,y:29.45}},{t:this.shape_106,p:{x:508.375,y:31.225}},{t:this.shape_160,p:{x:517.975,y:29.525}},{t:this.shape_220,p:{x:525.7,y:29.45}},{t:this.shape_133,p:{x:532.775,y:29.525}},{t:this.shape_149,p:{x:542.375,y:27.625}},{t:this.shape_128,p:{x:558.575,y:27.625}},{t:this.shape_154,p:{x:566.925,y:29.525}},{t:this.shape_132,p:{x:583.475,y:29.525}},{t:this.shape_125,p:{x:590.225,y:27.625}},{t:this.shape_93,p:{x:596.925,y:29.525}},{t:this.shape_364},{t:this.shape_101,p:{y:29.45,x:618}},{t:this.shape_95,p:{x:625.075,y:29.525}},{t:this.shape_181,p:{x:634.425,y:31.175}},{t:this.shape_363},{t:this.shape_292,p:{x:649.725,y:29.525}},{t:this.shape_362},{t:this.shape_300,p:{x:668.95,y:29.6}},{t:this.shape_79,p:{x:678.575,y:27.625}},{t:this.shape_146,p:{x:686.7,y:29.525}},{t:this.shape_151,p:{x:693.25,y:27.875}},{t:this.shape_361},{t:this.shape_85,p:{x:270.775,y:61.425}},{t:this.shape_360,p:{x:277.7}},{t:this.shape_157,p:{x:282.8,y:59.775}},{t:this.shape_439},{t:this.shape_91,p:{x:298.925,y:61.425}},{t:this.shape_438},{t:this.shape_70,p:{x:325.775,y:61.425}},{t:this.shape_437,p:{x:335.175}},{t:this.shape_358,p:{x:352.45}},{t:this.shape_195,p:{x:359.55,y:59.775}},{t:this.shape_436},{t:this.shape_25,p:{x:372.55,y:59.775}},{t:this.shape_435},{t:this.shape_84,p:{x:394.625,y:63.075}},{t:this.shape_64,p:{x:403.825,y:61.425}},{t:this.shape_434,p:{x:413.225}},{t:this.shape_433,p:{x:430.5}},{t:this.shape_17,p:{x:437.6,y:59.775}},{t:this.shape_432,p:{x:450.95,y:61.35}},{t:this.shape_75,p:{x:458.025,y:61.425}},{t:this.shape_326,p:{x:466.85,y:61.425}},{t:this.shape_67,p:{x:475.875,y:61.425}},{t:this.shape_54,p:{x:485.225,y:63.075}},{t:this.shape_58,p:{x:492.4,y:60.425}},{t:this.shape_55,p:{x:500.025,y:61.425}},{t:this.shape_48,p:{x:509.625,y:59.525}},{t:this.shape_46,p:{x:517.975,y:61.425}},{t:this.shape_119,p:{x:524.425,y:59.525}},{t:this.shape_161,p:{x:538.85,y:61.425}},{t:this.shape_37,p:{x:547.875,y:61.425}},{t:this.shape_431},{t:this.shape_131,p:{x:569.35,y:59.775}},{t:this.shape_359,p:{x:576.175}},{t:this.shape_49,p:{x:585.525,y:61.425}},{t:this.shape_45,p:{x:592.275,y:59.525}},{t:this.shape,p:{x:596.5,y:65.125}},{t:this.shape_430,p:{x:612.675}},{t:this.shape_429,p:{x:622.675,y:61.425}},{t:this.shape_428},{t:this.shape_427},{t:this.shape_426},{t:this.shape_44,p:{x:671.825,y:61.425}},{t:this.shape_357,p:{x:681.225}},{t:this.shape_1,p:{x:690.575,y:63.125}},{t:this.shape_425},{t:this.shape_192,p:{x:268.3,y:91.725}},{t:this.shape_43,p:{x:275.275,y:91.475}},{t:this.shape_28,p:{x:283.625,y:93.375}},{t:this.shape_19,p:{x:290.125,y:91.475}},{t:this.shape_424},{t:this.shape_40,p:{x:306.225,y:93.375}},{t:this.shape_86,p:{x:314.25,y:93.3}},{t:this.shape_41,p:{x:321.625,y:91.475}},{t:this.shape_33,p:{x:329.975,y:93.375}},{t:this.shape_354,p:{x:339.375,y:93.3}},{t:this.shape_423,p:{x:352.95}},{t:this.shape_31,p:{x:362.625,y:93.375}},{t:this.shape_66,p:{x:370.65,y:93.3}},{t:this.shape_59,p:{x:375.2,y:91.725}},{t:this.shape_82,p:{x:386.325,y:93.375}},{t:this.shape_422,p:{x:395.325,y:93.375}},{t:this.shape_18,p:{x:404.125,y:93.375}},{t:this.shape_74,p:{x:412.15,y:93.3}},{t:this.shape_120,p:{x:416.7,y:91.725}},{t:this.shape_421,p:{x:423.45}},{t:this.shape_420,p:{x:435.65}},{t:this.shape_14,p:{x:452.025,y:93.375}},{t:this.shape_15,p:{x:461.575,y:91.475}},{t:this.shape_9,p:{x:469.975,y:93.375}},{t:this.shape_351,p:{x:479.375,y:93.3}},{t:this.shape_419,p:{x:492.9}},{t:this.shape_5,p:{x:500.05,y:91.725}},{t:this.shape_418,p:{x:507.075}},{t:this.shape_417},{t:this.shape_7,p:{x:525.725,y:93.375}},{t:this.shape_68,p:{x:535.125,y:91.475}},{t:this.shape_288,p:{x:541.9,y:91.725}},{t:this.shape_61,p:{x:553.075,y:93.375}},{t:this.shape_4,p:{x:559.975,y:91.475}},{t:this.shape_20,p:{x:566.725,y:93.375}},{t:this.shape_32,p:{x:575.825,y:91.475}},{t:this.shape_12,p:{x:589.1,y:93.375}},{t:this.shape_38,p:{x:598.525,y:95.025}},{t:this.shape_11,p:{x:607.775,y:93.375}},{t:this.shape_83,p:{x:615.5,y:93.3}},{t:this.shape_416,p:{x:625.45}},{t:this.shape_3,p:{x:637.575,y:93.375}},{t:this.shape_415}]},43).to({state:[{t:this.shape_96,p:{x:261.625}},{t:this.shape_516,p:{x:271.275,y:-193.925}},{t:this.shape_280,p:{x:280.225,y:-193.925}},{t:this.shape_515,p:{x:289.225,y:-193.925}},{t:this.shape_470},{t:this.shape_514,p:{x:304.325,y:-193.925}},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_468},{t:this.shape_513,p:{x:381.725,y:-193.925}},{t:this.shape_466},{t:this.shape_201,p:{x:399}},{t:this.shape_512,p:{x:406.375,y:-193.925}},{t:this.shape_60,p:{x:415.85}},{t:this.shape_198},{t:this.shape_511,p:{x:435.225,y:-195.825}},{t:this.shape_196,p:{x:443.35,y:-193.925}},{t:this.shape_463},{t:this.shape_76,p:{x:463.625}},{t:this.shape_472,p:{x:472.875,y:-193.925}},{t:this.shape_92,p:{x:480.6,y:-194}},{t:this.shape_193,p:{x:487.45,y:-193.925}},{t:this.shape_461,p:{x:494}},{t:this.shape_71,p:{x:499.275}},{t:this.shape_510,p:{x:506.625,y:-193.925}},{t:this.shape_190},{t:this.shape_509,p:{x:528.275,y:-195.825}},{t:this.shape_467,p:{x:537.575,y:-193.925}},{t:this.shape_207,p:{x:545.3}},{t:this.shape_187},{t:this.shape_508,p:{x:567.375,y:-193.925}},{t:this.shape_63,p:{x:575.275}},{t:this.shape_432,p:{x:581.35,y:-194}},{t:this.shape_507,p:{x:588.675,y:-193.925}},{t:this.shape_50,p:{x:598.15}},{t:this.shape_249,p:{x:605.3,y:-195.575}},{t:this.shape_185,p:{x:609.9,y:-194.925}},{t:this.shape_184},{t:this.shape_183},{t:this.shape_506,p:{x:633.125,y:-193.925}},{t:this.shape_410,p:{x:642.775}},{t:this.shape_454,p:{x:649.45}},{t:this.shape_180},{t:this.shape_407,p:{x:665.9}},{t:this.shape_179},{t:this.shape_505,p:{x:682.225,y:-193.925}},{t:this.shape_504,p:{x:691.825,y:-195.825}},{t:this.shape_176},{t:this.shape_462,p:{x:276.175,y:-162.025}},{t:this.shape_503,p:{x:282.625}},{t:this.shape_471,p:{x:289.375,y:-162.025}},{t:this.shape_502,p:{x:298.925,y:-163.925}},{t:this.shape_34,p:{x:307.4}},{t:this.shape_501,p:{x:317.025,y:-163.925}},{t:this.shape_469,p:{x:325.375,y:-162.025}},{t:this.shape_169,p:{x:334.775}},{t:this.shape_399,p:{x:350.825,y:-160.375}},{t:this.shape_414,p:{x:360.025,y:-162.025}},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_460,p:{x:403.025,y:-162.025}},{t:this.shape_459,p:{x:412.425,y:-163.925}},{t:this.shape_458,p:{x:421.725,y:-162.025}},{t:this.shape_162,p:{x:431.125}},{t:this.shape_445},{t:this.shape_411,p:{x:455.675,y:-162.025}},{t:this.shape_159,p:{x:464.775}},{t:this.shape_158},{t:this.shape_385},{t:this.shape_8,p:{x:486.65}},{t:this.shape_156},{t:this.shape_57,p:{x:494.65,y:-157.225}},{t:this.shape_155},{t:this.shape_406,p:{x:522.575,y:-162.025}},{t:this.shape_500,p:{x:529.025,y:-163.925}},{t:this.shape_455,p:{x:535.775,y:-162.025}},{t:this.shape_499},{t:this.shape_150,p:{x:549.325,y:-162.1}},{t:this.shape_464,p:{x:558.975,y:-163.925}},{t:this.shape_453,p:{x:567.325,y:-162.025}},{t:this.shape_147,p:{x:576.725,y:-162.1}},{t:this.shape_381,p:{x:592.2,y:-162.025}},{t:this.shape_403,p:{x:601.275,y:-162.025}},{t:this.shape_252,p:{x:610.225,y:-162.025}},{t:this.shape_450,p:{x:619.225,y:-162.025}},{t:this.shape_143},{t:this.shape_448,p:{x:634.325,y:-162.025}},{t:this.shape_141},{t:this.shape_219,p:{x:656.25,y:-163.675}},{t:this.shape_451,p:{x:660.375,y:-163.925}},{t:this.shape_447,p:{x:667.125,y:-162.025}},{t:this.shape_138,p:{x:676.525,y:-162.1}},{t:this.shape_442,p:{x:685.875,y:-160.325}},{t:this.shape_498},{t:this.shape_135},{t:this.shape_134},{t:this.shape_413,p:{x:281.825,y:-130.075}},{t:this.shape_209,p:{x:306.475,y:-130.075}},{t:this.shape_412,p:{x:315.475,y:-130.075}},{t:this.shape_145,p:{x:324.725,y:-130.075}},{t:this.shape_497,p:{x:331.2,y:-131.725}},{t:this.shape_130,p:{x:337.975}},{t:this.shape_378,p:{x:347.325,y:-128.375}},{t:this.shape_404,p:{x:372.325,y:-130.075}},{t:this.shape_452,p:{x:381.875,y:-131.975}},{t:this.shape_402,p:{x:390.275,y:-130.075}},{t:this.shape_127,p:{x:399.675}},{t:this.shape_126},{t:this.shape_396,p:{x:439.425,y:-130.075}},{t:this.shape_444,p:{x:445.875,y:-131.975}},{t:this.shape_400,p:{x:452.575,y:-130.075}},{t:this.shape_449,p:{x:462.175,y:-131.975}},{t:this.shape_124},{t:this.shape_408,p:{x:480.225,y:-131.975}},{t:this.shape_398,p:{x:488.625,y:-130.075}},{t:this.shape_123,p:{x:497.975}},{t:this.shape_397,p:{x:523.075,y:-131.975}},{t:this.shape_394,p:{x:531.425,y:-130.075}},{t:this.shape_122},{t:this.shape_375},{t:this.shape_121,p:{x:557.825}},{t:this.shape_12,p:{x:582.35,y:-130.075}},{t:this.shape_496,p:{x:588.85}},{t:this.shape_395,p:{x:593.025,y:-131.975}},{t:this.shape_391,p:{x:599.725,y:-130.075}},{t:this.shape_118,p:{x:609.125,y:-130.15}},{t:this.shape_318,p:{x:618.475,y:-128.375}},{t:this.shape_116},{t:this.shape_389,p:{x:653.075,y:-130.075}},{t:this.shape_115,p:{x:662.175,y:-130.15}},{t:this.shape_247,p:{x:671.575,y:-128.375}},{t:this.shape_388,p:{x:681.125,y:-130.075}},{t:this.shape_113,p:{x:690.525,y:-130.15}},{t:this.shape_112},{t:this.shape_386,p:{x:276.175,y:-98.125}},{t:this.shape_39,p:{x:285.275,y:-98.2}},{t:this.shape_384,p:{x:294.675,y:-98.125}},{t:this.shape_21,p:{x:306.55,y:-98.2}},{t:this.shape_390,p:{x:319.025,y:-96.475}},{t:this.shape_380,p:{x:328.225,y:-98.125}},{t:this.shape_383,p:{x:334.675,y:-100.025}},{t:this.shape_393,p:{x:341.725,y:-100.025}},{t:this.shape_348,p:{x:350.075,y:-98.125}},{t:this.shape_30,p:{x:359.475,y:-98.2}},{t:this.shape_111},{t:this.shape_110},{t:this.shape_35,p:{x:412.275,y:-99.95}},{t:this.shape_109},{t:this.shape_446,p:{x:431.025,y:-100.025}},{t:this.shape_27,p:{x:440.425,y:-98.2}},{t:this.shape_108},{t:this.shape_347,p:{x:457.875,y:-98.125}},{t:this.shape_107},{t:this.shape_376,p:{x:504.975,y:-98.125}},{t:this.shape_16,p:{x:514.075,y:-98.2}},{t:this.shape_246,p:{x:523.425,y:-96.425}},{t:this.shape_342,p:{x:533.025,y:-98.125}},{t:this.shape_13,p:{x:542.425,y:-98.2}},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_2,p:{x:602.975,y:-98.2}},{t:this.shape_243,p:{x:612.325,y:-96.425}},{t:this.shape_392,p:{x:650.375,y:-100.025}},{t:this.shape_349,p:{x:658.725,y:-98.125}},{t:this.shape_374,p:{x:668.075}},{t:this.shape_340,p:{x:677.325,y:-98.125}},{t:this.shape_379,p:{x:684.075,y:-100.025}},{t:this.shape_338,p:{x:690.775,y:-98.125}},{t:this.shape_102},{t:this.shape_346,p:{x:270.775,y:-66.225}},{t:this.shape_373,p:{x:278.5,y:-66.3}},{t:this.shape_334,p:{x:283.025,y:-68.125}},{t:this.shape_337,p:{x:289.725,y:-66.225}},{t:this.shape_100},{t:this.shape_333,p:{x:311.875,y:-66.225}},{t:this.shape_242},{t:this.shape_330,p:{x:330.625,y:-66.225}},{t:this.shape_241},{t:this.shape_97},{t:this.shape_240},{t:this.shape_323,p:{x:371.175,y:-68.125}},{t:this.shape_328,p:{x:377.875,y:-66.225}},{t:this.shape_239},{t:this.shape_344,p:{x:401.725,y:-68.125}},{t:this.shape_343,p:{x:410.125,y:-66.225}},{t:this.shape_319,p:{x:416.575,y:-68.125}},{t:this.shape_327,p:{x:423.275,y:-66.225}},{t:this.shape_238},{t:this.shape_274,p:{x:445.05,y:-67.875}},{t:this.shape_237},{t:this.shape_236},{t:this.shape_322,p:{x:474.025,y:-66.225}},{t:this.shape_235},{t:this.shape_234},{t:this.shape_279,p:{x:498.275,y:-66.225}},{t:this.shape_233},{t:this.shape_232},{t:this.shape_341,p:{x:540.775,y:-66.225}},{t:this.shape_231},{t:this.shape_137,p:{x:559.225,y:-64.525}},{t:this.shape_335,p:{x:568.825,y:-66.225}},{t:this.shape_262,p:{x:575.275,y:-68.125}},{t:this.shape_230},{t:this.shape_278,p:{x:591.375,y:-66.225}},{t:this.shape_372,p:{x:599.4}},{t:this.shape_336,p:{x:606.825,y:-68.125}},{t:this.shape_271,p:{x:615.175,y:-66.225}},{t:this.shape_228},{t:this.shape_227},{t:this.shape_276,p:{x:651.825,y:-64.575}},{t:this.shape_329,p:{x:661.075,y:-66.225}},{t:this.shape_371,p:{x:668.8,y:-66.3}},{t:this.shape_225},{t:this.shape_269,p:{x:690.875,y:-66.225}},{t:this.shape_224},{t:this.shape_267,p:{x:270.825,y:-34.275}},{t:this.shape_223},{t:this.shape_312},{t:this.shape_72,p:{x:305.85,y:-35.925}},{t:this.shape_311},{t:this.shape_325,p:{x:318.075,y:-34.275}},{t:this.shape_313,p:{x:325.8,y:-34.35}},{t:this.shape_272,p:{x:330.4,y:-35.925}},{t:this.shape_218,p:{x:339.95}},{t:this.shape_265,p:{x:352.075,y:-34.275}},{t:this.shape_332,p:{x:370.825,y:-36.175}},{t:this.shape_255,p:{x:376.675,y:-36.175}},{t:this.shape_53,p:{x:380.85,y:-35.925}},{t:this.shape_217,p:{x:385.45}},{t:this.shape_281,p:{x:393.075,y:-34.275}},{t:this.shape_248,p:{x:399.525,y:-36.175}},{t:this.shape_23,p:{x:403.7,y:-35.925}},{t:this.shape_310},{t:this.shape_215,p:{x:422.65}},{t:this.shape_94,p:{x:443.925,y:-34.275}},{t:this.shape_261,p:{x:452.925,y:-34.275}},{t:this.shape_10,p:{x:462.175,y:-34.275}},{t:this.shape_324,p:{x:468.65,y:-35.925}},{t:this.shape_214,p:{x:475.425}},{t:this.shape_129,p:{x:484.775,y:-32.575}},{t:this.shape_266,p:{x:503.875,y:-32.625}},{t:this.shape_259,p:{x:513.125,y:-34.275}},{t:this.shape_387,p:{x:522.2,y:-34.275}},{t:this.shape_257,p:{x:531.225,y:-34.275}},{t:this.shape_212,p:{x:540.625}},{t:this.shape_117,p:{x:550.025,y:-32.575}},{t:this.shape_256,p:{x:559.575,y:-34.275}},{t:this.shape_99,p:{x:568.975,y:-34.35}},{t:this.shape_98,p:{x:578.425,y:-34.35}},{t:this.shape_309},{t:this.shape_254,p:{x:595.925,y:-34.275}},{t:this.shape_308,p:{x:602.7,y:-30.575}},{t:this.shape_307},{t:this.shape_253,p:{x:629.675,y:-34.275}},{t:this.shape_222,p:{x:638.9}},{t:this.shape_251,p:{x:648.575,y:-34.275}},{t:this.shape_306},{t:this.shape_250,p:{x:675.875,y:-34.275}},{t:this.shape_208,p:{x:685.175,y:-34.275}},{t:this.shape_305},{t:this.shape_370},{t:this.shape_277,p:{x:270.775,y:-2.425}},{t:this.shape_369,p:{x:278.5,y:-2.5}},{t:this.shape_495,p:{x:285.35,y:-2.425}},{t:this.shape_206,p:{x:294.425,y:-2.425}},{t:this.shape_303,p:{y:-2.5}},{t:this.shape_191,p:{x:318.725,y:-2.425}},{t:this.shape_186,p:{x:328.025,y:-2.425}},{t:this.shape_494,p:{x:337.375,y:-2.5}},{t:this.shape_331,p:{x:358.425,y:-4.325}},{t:this.shape_245,p:{x:364.225,y:-4.325}},{t:this.shape_51,p:{x:368.4,y:-4.075}},{t:this.shape_301},{t:this.shape_273,p:{x:380.625,y:-2.425}},{t:this.shape_244,p:{x:387.075,y:-4.325}},{t:this.shape_315,p:{x:391.25,y:-4.075}},{t:this.shape_368},{t:this.shape_299},{t:this.shape_298},{t:this.shape_270,p:{x:448.675,y:-2.425}},{t:this.shape_493,p:{x:457.825,y:-2.5}},{t:this.shape_114,p:{x:467.175,y:-0.725}},{t:this.shape_263,p:{y:-2.425,x:476.725}},{t:this.shape_174,p:{x:483.225,y:-4.325}},{t:this.shape_296},{t:this.shape_182,p:{x:499.325,y:-2.425}},{t:this.shape_229,p:{x:507.35,y:-2.5}},{t:this.shape_321,p:{x:514.725,y:-4.325}},{t:this.shape_178,p:{x:523.075,y:-2.425}},{t:this.shape_492,p:{x:532.475,y:-2.5}},{t:this.shape_294},{t:this.shape_293},{t:this.shape_317,p:{x:577.925,y:-4.325}},{t:this.shape_491,p:{x:586.525,y:-2.425}},{t:this.shape_320,p:{x:595.8,y:-2.425}},{t:this.shape_173,p:{x:604.875,y:-2.425}},{t:this.shape_316,p:{x:625.775,y:-4.325}},{t:this.shape_258,p:{x:634.175,y:-2.425}},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288,p:{x:674.65,y:-4.075}},{t:this.shape_170,p:{x:681.375,y:-2.425}},{t:this.shape_302,p:{x:690.775,y:-2.5}},{t:this.shape_286},{t:this.shape_210,p:{x:276.175,y:29.525}},{t:this.shape_285,p:{x:288.05,y:29.45}},{t:this.shape_304,p:{x:300.525,y:27.7}},{t:this.shape_200,p:{x:309.775,y:29.525}},{t:this.shape_297,p:{x:318.875,y:29.45}},{t:this.shape_69,p:{x:326.15,y:28.525}},{t:this.shape_216,p:{x:333.85,y:29.6}},{t:this.shape_275,p:{x:343.475,y:27.625}},{t:this.shape_264,p:{x:359.675,y:27.625}},{t:this.shape_465,p:{x:368.275,y:29.525}},{t:this.shape_260,p:{x:378.075,y:27.625}},{t:this.shape_456,p:{x:386.675,y:29.525}},{t:this.shape_295,p:{x:396.275,y:29.45}},{t:this.shape_367},{t:this.shape_366},{t:this.shape_199,p:{x:428.125,y:31.175}},{t:this.shape_194,p:{x:437.375,y:29.525}},{t:this.shape_314,p:{x:445.1,y:29.45}},{t:this.shape_490},{t:this.shape_164,p:{x:467.175,y:29.525}},{t:this.shape_284,p:{x:484.325}},{t:this.shape_188,p:{x:493.575,y:29.525}},{t:this.shape_226,p:{x:501.3,y:29.45}},{t:this.shape_106,p:{x:508.375,y:31.225}},{t:this.shape_175,p:{x:517.975,y:29.525}},{t:this.shape_220,p:{x:525.7,y:29.45}},{t:this.shape_163,p:{x:532.775,y:29.525}},{t:this.shape_197,p:{x:542.375,y:27.625}},{t:this.shape_177,p:{x:558.575,y:27.625}},{t:this.shape_168,p:{x:566.925,y:29.525}},{t:this.shape_152,p:{x:583.475,y:29.525}},{t:this.shape_153,p:{x:590.225,y:27.625}},{t:this.shape_148,p:{x:596.925,y:29.525}},{t:this.shape_364},{t:this.shape_101,p:{y:29.45,x:618}},{t:this.shape_160,p:{x:625.075,y:29.525}},{t:this.shape_181,p:{x:634.425,y:31.175}},{t:this.shape_363},{t:this.shape_409,p:{x:649.725,y:29.525}},{t:this.shape_362},{t:this.shape_300,p:{x:668.95,y:29.6}},{t:this.shape_172,p:{x:678.575,y:27.625}},{t:this.shape_146,p:{x:686.7,y:29.525}},{t:this.shape_443,p:{x:693.25,y:27.875}},{t:this.shape_361},{t:this.shape_154,p:{x:270.775,y:61.425}},{t:this.shape_360,p:{x:277.7}},{t:this.shape_157,p:{x:282.8,y:59.775}},{t:this.shape_439},{t:this.shape_144,p:{x:298.925,y:61.425}},{t:this.shape_438},{t:this.shape_142,p:{x:325.775,y:61.425}},{t:this.shape_437,p:{x:335.175}},{t:this.shape_358,p:{x:352.45}},{t:this.shape_195,p:{x:359.55,y:59.775}},{t:this.shape_436},{t:this.shape_25,p:{x:372.55,y:59.775}},{t:this.shape_435},{t:this.shape_84,p:{x:394.625,y:63.075}},{t:this.shape_139,p:{x:403.825,y:61.425}},{t:this.shape_434,p:{x:413.225}},{t:this.shape_433,p:{x:430.5}},{t:this.shape_17,p:{x:437.6,y:59.775}},{t:this.shape_86,p:{x:450.95,y:61.35}},{t:this.shape_95,p:{x:458.025,y:61.425}},{t:this.shape_326,p:{x:466.85,y:61.425}},{t:this.shape_85,p:{x:475.875,y:61.425}},{t:this.shape_54,p:{x:485.225,y:63.075}},{t:this.shape_489},{t:this.shape_133,p:{x:500.025,y:61.425}},{t:this.shape_171,p:{x:509.625,y:59.525}},{t:this.shape_75,p:{x:517.975,y:61.425}},{t:this.shape_140,p:{x:524.425,y:59.525}},{t:this.shape_161,p:{x:538.85,y:61.425}},{t:this.shape_67,p:{x:547.875,y:61.425}},{t:this.shape_431},{t:this.shape_382,p:{x:569.35,y:59.775}},{t:this.shape_359,p:{x:576.175}},{t:this.shape_132,p:{x:585.525,y:61.425}},{t:this.shape_125,p:{x:592.275,y:59.525}},{t:this.shape,p:{x:596.5,y:65.125}},{t:this.shape_430,p:{x:612.675}},{t:this.shape_488,p:{x:622.675,y:61.425}},{t:this.shape_428},{t:this.shape_427},{t:this.shape_426},{t:this.shape_93,p:{x:671.825,y:61.425}},{t:this.shape_357,p:{x:681.225}},{t:this.shape_1,p:{x:690.575,y:63.125}},{t:this.shape_425},{t:this.shape_192,p:{x:268.3,y:91.725}},{t:this.shape_149,p:{x:275.275,y:91.475}},{t:this.shape_46,p:{x:283.625,y:93.375}},{t:this.shape_119,p:{x:290.125,y:91.475}},{t:this.shape_424},{t:this.shape_91,p:{x:306.225,y:93.375}},{t:this.shape_74,p:{x:314.25,y:93.3}},{t:this.shape_128,p:{x:321.625,y:91.475}},{t:this.shape_70,p:{x:329.975,y:93.375}},{t:this.shape_354,p:{x:339.375,y:93.3}},{t:this.shape_423,p:{x:361.05}},{t:this.shape_64,p:{x:370.725,y:93.375}},{t:this.shape_83,p:{x:378.7,y:93.3}},{t:this.shape_59,p:{x:383.3,y:91.725}},{t:this.shape_345,p:{x:402.525,y:93.375}},{t:this.shape_429,p:{x:411.525,y:93.375}},{t:this.shape_55,p:{x:420.325,y:93.375}},{t:this.shape_62,p:{x:428.3,y:93.3}},{t:this.shape_377,p:{x:432.9,y:91.725}},{t:this.shape_421,p:{x:439.65}},{t:this.shape_420,p:{x:451.85}},{t:this.shape_49,p:{x:476.275,y:93.375}},{t:this.shape_79,p:{x:485.875,y:91.475}},{t:this.shape_44,p:{x:494.225,y:93.375}},{t:this.shape_351,p:{x:503.625,y:93.3}},{t:this.shape_419,p:{x:525.3}},{t:this.shape_5,p:{x:532.45,y:91.725}},{t:this.shape_418,p:{x:539.475}},{t:this.shape_487},{t:this.shape_40,p:{x:558.125,y:93.375}},{t:this.shape_189,p:{x:567.475,y:91.475}},{t:this.shape_151,p:{x:574.3,y:91.725}},{t:this.shape_339,p:{x:593.525,y:93.375}},{t:this.shape_45,p:{x:600.475,y:91.475}},{t:this.shape_37,p:{x:607.175,y:93.375}},{t:this.shape_68,p:{x:616.275,y:91.475}},{t:this.shape_78,p:{x:637.7,y:93.375}},{t:this.shape_38,p:{x:647.125,y:95.025}},{t:this.shape_28,p:{x:656.325,y:93.375}},{t:this.shape_66,p:{x:664.05,y:93.3}},{t:this.shape_416,p:{x:674.05}},{t:this.shape_33,p:{x:686.125,y:93.375}},{t:this.shape_136,p:{y:97.075}},{t:this.shape_486},{t:this.shape_20,p:{x:271.275,y:125.275}},{t:this.shape_19,p:{x:277.725,y:123.375}},{t:this.shape_31,p:{x:284.425,y:125.275}},{t:this.shape_287,p:{x:293.825,y:125.2}},{t:this.shape_485},{t:this.shape_484},{t:this.shape_58,p:{x:314.65,y:124.275}},{t:this.shape_283,p:{x:322.325,y:125.2}},{t:this.shape_483},{t:this.shape_18,p:{x:339.825,y:125.275}},{t:this.shape_292,p:{x:353.575,y:125.275}},{t:this.shape_422,p:{x:362.575,y:125.275}},{t:this.shape_482},{t:this.shape_481},{t:this.shape_480},{t:this.shape_131,p:{x:407.05,y:123.625}},{t:this.shape_479,p:{x:414.075}},{t:this.shape_478},{t:this.shape_14,p:{x:432.725,y:125.275}},{t:this.shape_32,p:{x:442.125,y:123.375}},{t:this.shape_120,p:{x:448.9,y:123.625}},{t:this.shape_365,p:{x:462.7,y:125.2}},{t:this.shape_9,p:{x:474.825,y:125.275}},{t:this.shape_477},{t:this.shape_476,p:{x:493}},{t:this.shape_48,p:{x:502.625,y:123.375}},{t:this.shape_43,p:{x:515.525,y:123.375}},{t:this.shape_11,p:{x:523.875,y:125.275}},{t:this.shape_475},{t:this.shape_7,p:{x:546.775,y:125.275}},{t:this.shape_4,p:{x:553.475,y:123.375}},{t:this.shape_3,p:{x:560.225,y:125.275}},{t:this.shape_474},{t:this.shape_41,p:{x:589.025,y:123.375}},{t:this.shape_82,p:{x:597.625,y:125.275}},{t:this.shape_15,p:{x:607.425,y:123.375}},{t:this.shape_61,p:{x:616.025,y:125.275}},{t:this.shape_282,p:{x:625.625,y:125.2}},{t:this.shape_473,p:{x:632.55}}]},44).to({state:[{t:this.shape_96,p:{x:261.625}},{t:this.shape_602},{t:this.shape_601},{t:this.shape_600},{t:this.shape_470},{t:this.shape_599},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_468},{t:this.shape_598},{t:this.shape_466},{t:this.shape_201,p:{x:399}},{t:this.shape_597},{t:this.shape_60,p:{x:415.85}},{t:this.shape_198},{t:this.shape_596},{t:this.shape_595},{t:this.shape_461,p:{x:449.9}},{t:this.shape_76,p:{x:463.625}},{t:this.shape_594},{t:this.shape_593},{t:this.shape_193,p:{x:487.45,y:-193.925}},{t:this.shape_454,p:{x:494}},{t:this.shape_71,p:{x:499.275}},{t:this.shape_592},{t:this.shape_190},{t:this.shape_591},{t:this.shape_590},{t:this.shape_207,p:{x:545.3}},{t:this.shape_187},{t:this.shape_589},{t:this.shape_63,p:{x:575.275}},{t:this.shape_432,p:{x:581.35,y:-194}},{t:this.shape_588},{t:this.shape_50,p:{x:598.15}},{t:this.shape_268},{t:this.shape_185,p:{x:609.9,y:-194.925}},{t:this.shape_184},{t:this.shape_183},{t:this.shape_587},{t:this.shape_410,p:{x:642.775}},{t:this.shape_407,p:{x:649.45}},{t:this.shape_180},{t:this.shape_274,p:{x:665.9,y:-195.575}},{t:this.shape_179},{t:this.shape_586},{t:this.shape_585},{t:this.shape_176},{t:this.shape_584},{t:this.shape_583},{t:this.shape_582},{t:this.shape_581},{t:this.shape_34,p:{x:307.4}},{t:this.shape_580},{t:this.shape_579},{t:this.shape_578},{t:this.shape_399,p:{x:350.825,y:-160.375}},{t:this.shape_577},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_576},{t:this.shape_509,p:{x:412.425,y:-163.925}},{t:this.shape_575},{t:this.shape_574},{t:this.shape_326,p:{x:446.6,y:-162.025}},{t:this.shape_516,p:{x:455.675,y:-162.025}},{t:this.shape_573},{t:this.shape_158},{t:this.shape_385},{t:this.shape_8,p:{x:486.65}},{t:this.shape_156},{t:this.shape_57,p:{x:494.65,y:-157.225}},{t:this.shape_155},{t:this.shape_513,p:{x:522.575,y:-162.025}},{t:this.shape_572},{t:this.shape_571},{t:this.shape_497,p:{x:542.5,y:-163.675}},{t:this.shape_169,p:{x:549.325}},{t:this.shape_511,p:{x:558.975,y:-163.925}},{t:this.shape_515,p:{x:567.325,y:-162.025}},{t:this.shape_162,p:{x:576.725}},{t:this.shape_570},{t:this.shape_472,p:{x:601.275,y:-162.025}},{t:this.shape_569},{t:this.shape_514,p:{x:619.225,y:-162.025}},{t:this.shape_143},{t:this.shape_510,p:{x:634.325,y:-162.025}},{t:this.shape_141},{t:this.shape_249,p:{x:656.25,y:-163.675}},{t:this.shape_503,p:{x:660.375}},{t:this.shape_508,p:{x:667.125,y:-162.025}},{t:this.shape_159,p:{x:676.525}},{t:this.shape_568},{t:this.shape_498},{t:this.shape_135},{t:this.shape_134},{t:this.shape_506,p:{x:281.825,y:-130.075}},{t:this.shape_280,p:{x:306.475,y:-130.075}},{t:this.shape_505,p:{x:315.475,y:-130.075}},{t:this.shape_252,p:{x:324.725,y:-130.075}},{t:this.shape_496,p:{x:331.2}},{t:this.shape_150,p:{x:337.975,y:-130.15}},{t:this.shape_442,p:{x:347.325,y:-128.375}},{t:this.shape_471,p:{x:372.325,y:-130.075}},{t:this.shape_504,p:{x:381.875,y:-131.975}},{t:this.shape_469,p:{x:390.275,y:-130.075}},{t:this.shape_147,p:{x:399.675,y:-130.15}},{t:this.shape_126},{t:this.shape_467,p:{x:439.425,y:-130.075}},{t:this.shape_500,p:{x:445.875,y:-131.975}},{t:this.shape_460,p:{x:452.575,y:-130.075}},{t:this.shape_502,p:{x:462.175,y:-131.975}},{t:this.shape_124},{t:this.shape_501,p:{x:480.225,y:-131.975}},{t:this.shape_458,p:{x:488.625,y:-130.075}},{t:this.shape_138,p:{x:497.975,y:-130.15}},{t:this.shape_464,p:{x:523.075,y:-131.975}},{t:this.shape_455,p:{x:531.425,y:-130.075}},{t:this.shape_122},{t:this.shape_375},{t:this.shape_130,p:{x:557.825}},{t:this.shape_12,p:{x:582.35,y:-130.075}},{t:this.shape_443,p:{x:588.85,y:-131.725}},{t:this.shape_451,p:{x:593.025,y:-131.975}},{t:this.shape_453,p:{x:599.725,y:-130.075}},{t:this.shape_127,p:{x:609.125}},{t:this.shape_378,p:{x:618.475,y:-128.375}},{t:this.shape_116},{t:this.shape_462,p:{x:653.075,y:-130.075}},{t:this.shape_123,p:{x:662.175}},{t:this.shape_318,p:{x:671.575,y:-128.375}},{t:this.shape_450,p:{x:681.125,y:-130.075}},{t:this.shape_121,p:{x:690.525}},{t:this.shape_112},{t:this.shape_414,p:{x:276.175,y:-98.125}},{t:this.shape_118,p:{x:285.275,y:-98.2}},{t:this.shape_411,p:{x:294.675,y:-98.125}},{t:this.shape_21,p:{x:306.55,y:-98.2}},{t:this.shape_390,p:{x:319.025,y:-96.475}},{t:this.shape_406,p:{x:328.225,y:-98.125}},{t:this.shape_444,p:{x:334.675,y:-100.025}},{t:this.shape_452,p:{x:341.725,y:-100.025}},{t:this.shape_448,p:{x:350.075,y:-98.125}},{t:this.shape_115,p:{x:359.475,y:-98.2}},{t:this.shape_111},{t:this.shape_110},{t:this.shape_35,p:{x:412.275,y:-99.95}},{t:this.shape_109},{t:this.shape_459,p:{x:431.025,y:-100.025}},{t:this.shape_113,p:{x:440.425,y:-98.2}},{t:this.shape_108},{t:this.shape_447,p:{x:457.875,y:-98.125}},{t:this.shape_107},{t:this.shape_403,p:{x:504.975,y:-98.125}},{t:this.shape_39,p:{x:514.075,y:-98.2}},{t:this.shape_247,p:{x:523.425,y:-96.425}},{t:this.shape_413,p:{x:533.025,y:-98.125}},{t:this.shape_30,p:{x:542.425,y:-98.2}},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_27,p:{x:602.975,y:-98.2}},{t:this.shape_246,p:{x:612.325,y:-96.425}},{t:this.shape_449,p:{x:650.375,y:-100.025}},{t:this.shape_396,p:{x:658.725,y:-98.125}},{t:this.shape_374,p:{x:668.075}},{t:this.shape_412,p:{x:677.325,y:-98.125}},{t:this.shape_395,p:{x:684.075,y:-100.025}},{t:this.shape_404,p:{x:690.775,y:-98.125}},{t:this.shape_102},{t:this.shape_389,p:{x:270.775,y:-66.225}},{t:this.shape_567},{t:this.shape_383,p:{x:283.025,y:-68.125}},{t:this.shape_402,p:{x:289.725,y:-66.225}},{t:this.shape_100},{t:this.shape_400,p:{x:311.875,y:-66.225}},{t:this.shape_242},{t:this.shape_398,p:{x:330.625,y:-66.225}},{t:this.shape_241},{t:this.shape_97},{t:this.shape_240},{t:this.shape_379,p:{x:371.175,y:-68.125}},{t:this.shape_394,p:{x:377.875,y:-66.225}},{t:this.shape_239},{t:this.shape_408,p:{x:401.725,y:-68.125}},{t:this.shape_386,p:{x:410.125,y:-66.225}},{t:this.shape_334,p:{x:416.575,y:-68.125}},{t:this.shape_391,p:{x:423.275,y:-66.225}},{t:this.shape_238},{t:this.shape_272,p:{x:445.05,y:-67.875}},{t:this.shape_237},{t:this.shape_236},{t:this.shape_388,p:{x:474.025,y:-66.225}},{t:this.shape_235},{t:this.shape_234},{t:this.shape_348,p:{x:498.275,y:-66.225}},{t:this.shape_233},{t:this.shape_232},{t:this.shape_384,p:{x:540.775,y:-66.225}},{t:this.shape_231},{t:this.shape_243,p:{x:559.225,y:-64.525}},{t:this.shape_380,p:{x:568.825,y:-66.225}},{t:this.shape_323,p:{x:575.275,y:-68.125}},{t:this.shape_230},{t:this.shape_347,p:{x:591.375,y:-66.225}},{t:this.shape_566},{t:this.shape_397,p:{x:606.825,y:-68.125}},{t:this.shape_342,p:{x:615.175,y:-66.225}},{t:this.shape_228},{t:this.shape_227},{t:this.shape_276,p:{x:651.825,y:-64.575}},{t:this.shape_376,p:{x:661.075,y:-66.225}},{t:this.shape_372,p:{x:668.8}},{t:this.shape_225},{t:this.shape_340,p:{x:690.875,y:-66.225}},{t:this.shape_224},{t:this.shape_338,p:{x:270.825,y:-34.275}},{t:this.shape_223},{t:this.shape_312},{t:this.shape_565},{t:this.shape_311},{t:this.shape_349,p:{x:318.075,y:-34.275}},{t:this.shape_371,p:{x:325.8,y:-34.35}},{t:this.shape_195,p:{x:330.4,y:-35.925}},{t:this.shape_218,p:{x:339.95}},{t:this.shape_337,p:{x:352.075,y:-34.275}},{t:this.shape_393,p:{x:370.825,y:-36.175}},{t:this.shape_319,p:{x:376.675,y:-36.175}},{t:this.shape_219,p:{x:380.85,y:-35.925}},{t:this.shape_217,p:{x:385.45}},{t:this.shape_346,p:{x:393.075,y:-34.275}},{t:this.shape_262,p:{x:399.525,y:-36.175}},{t:this.shape_53,p:{x:403.7,y:-35.925}},{t:this.shape_310},{t:this.shape_215,p:{x:422.65}},{t:this.shape_209,p:{x:443.925,y:-34.275}},{t:this.shape_333,p:{x:452.925,y:-34.275}},{t:this.shape_145,p:{x:462.175,y:-34.275}},{t:this.shape_324,p:{x:468.65,y:-35.925}},{t:this.shape_214,p:{x:475.425}},{t:this.shape_137,p:{x:484.775,y:-32.575}},{t:this.shape_266,p:{x:503.875,y:-32.625}},{t:this.shape_330,p:{x:513.125,y:-34.275}},{t:this.shape_161,p:{x:522.2,y:-34.275}},{t:this.shape_328,p:{x:531.225,y:-34.275}},{t:this.shape_212,p:{x:540.625}},{t:this.shape_129,p:{x:550.025,y:-32.575}},{t:this.shape_327,p:{x:559.575,y:-34.275}},{t:this.shape_99,p:{x:568.975,y:-34.35}},{t:this.shape_98,p:{x:578.425,y:-34.35}},{t:this.shape_309},{t:this.shape_322,p:{x:595.925,y:-34.275}},{t:this.shape_564},{t:this.shape_307},{t:this.shape_279,p:{x:629.675,y:-34.275}},{t:this.shape_222,p:{x:638.9}},{t:this.shape_278,p:{x:648.575,y:-34.275}},{t:this.shape_306},{t:this.shape_271,p:{x:675.875,y:-34.275}},{t:this.shape_269,p:{x:685.175,y:-34.275}},{t:this.shape_305},{t:this.shape_370},{t:this.shape_343,p:{x:270.775,y:-2.425}},{t:this.shape_563},{t:this.shape_562},{t:this.shape_267,p:{x:294.425,y:-2.425}},{t:this.shape_561},{t:this.shape_265,p:{x:318.725,y:-2.425}},{t:this.shape_261,p:{x:328.025,y:-2.425}},{t:this.shape_560},{t:this.shape_392,p:{x:358.425,y:-4.325}},{t:this.shape_255,p:{x:364.225,y:-4.325}},{t:this.shape_559},{t:this.shape_301},{t:this.shape_341,p:{x:380.625,y:-2.425}},{t:this.shape_248,p:{x:387.075,y:-4.325}},{t:this.shape_315,p:{x:391.25,y:-4.075}},{t:this.shape_368},{t:this.shape_299},{t:this.shape_298},{t:this.shape_335,p:{x:448.675,y:-2.425}},{t:this.shape_558},{t:this.shape_117,p:{x:467.175,y:-0.725}},{t:this.shape_329,p:{x:476.725,y:-2.425}},{t:this.shape_245,p:{x:483.225,y:-4.325}},{t:this.shape_296},{t:this.shape_259,p:{x:499.325,y:-2.425}},{t:this.shape_313,p:{x:507.35,y:-2.5}},{t:this.shape_344,p:{x:514.725,y:-4.325}},{t:this.shape_257,p:{x:523.075,y:-2.425}},{t:this.shape_557},{t:this.shape_294},{t:this.shape_293},{t:this.shape_336,p:{x:577.925,y:-4.325}},{t:this.shape_512,p:{x:586.525,y:-2.425}},{t:this.shape_381,p:{x:595.8,y:-2.425}},{t:this.shape_256,p:{x:604.875,y:-2.425}},{t:this.shape_332,p:{x:625.775,y:-4.325}},{t:this.shape_325,p:{x:634.175,y:-2.425}},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288,p:{x:674.65,y:-4.075}},{t:this.shape_254,p:{x:681.375,y:-2.425}},{t:this.shape_556},{t:this.shape_286},{t:this.shape_281,p:{x:276.175,y:29.525}},{t:this.shape_555},{t:this.shape_304,p:{x:300.525,y:27.7}},{t:this.shape_277,p:{x:309.775,y:29.525}},{t:this.shape_494,p:{x:318.875,y:29.45}},{t:this.shape_69,p:{x:326.15,y:28.525}},{t:this.shape_216,p:{x:333.85,y:29.6}},{t:this.shape_331,p:{x:343.475,y:27.625}},{t:this.shape_321,p:{x:359.675,y:27.625}},{t:this.shape_507,p:{x:368.275,y:29.525}},{t:this.shape_317,p:{x:378.075,y:27.625}},{t:this.shape_491,p:{x:386.675,y:29.525}},{t:this.shape_493,p:{x:396.275,y:29.45}},{t:this.shape_367},{t:this.shape_366},{t:this.shape_199,p:{x:428.125,y:31.175}},{t:this.shape_273,p:{x:437.375,y:29.525}},{t:this.shape_554},{t:this.shape_490},{t:this.shape_253,p:{x:467.175,y:29.525}},{t:this.shape_284,p:{x:484.325}},{t:this.shape_270,p:{x:493.575,y:29.525}},{t:this.shape_229,p:{x:501.3,y:29.45}},{t:this.shape_114,p:{x:508.375,y:31.225}},{t:this.shape_263,p:{y:29.525,x:517.975}},{t:this.shape_226,p:{x:525.7,y:29.45}},{t:this.shape_251,p:{x:532.775,y:29.525}},{t:this.shape_316,p:{x:542.375,y:27.625}},{t:this.shape_275,p:{x:558.575,y:27.625}},{t:this.shape_258,p:{x:566.925,y:29.525}},{t:this.shape_250,p:{x:583.475,y:29.525}},{t:this.shape_244,p:{x:590.225,y:27.625}},{t:this.shape_208,p:{x:596.925,y:29.525}},{t:this.shape_364},{t:this.shape_373,p:{x:618,y:29.45}},{t:this.shape_210,p:{x:625.075,y:29.525}},{t:this.shape_181,p:{x:634.425,y:31.175}},{t:this.shape_363},{t:this.shape_465,p:{x:649.725,y:29.525}},{t:this.shape_362},{t:this.shape_300,p:{x:668.95,y:29.6}},{t:this.shape_264,p:{x:678.575,y:27.625}},{t:this.shape_320,p:{x:686.7,y:29.525}},{t:this.shape_382,p:{x:693.25,y:27.875}},{t:this.shape_361},{t:this.shape_200,p:{x:270.775,y:61.425}},{t:this.shape_553},{t:this.shape_157,p:{x:282.8,y:59.775}},{t:this.shape_439},{t:this.shape_206,p:{x:298.925,y:61.425}},{t:this.shape_552},{t:this.shape_191,p:{x:324.775,y:61.425}},{t:this.shape_437,p:{x:334.125}},{t:this.shape_433,p:{x:350.4}},{t:this.shape_17,p:{x:357.5,y:59.775}},{t:this.shape_551},{t:this.shape_23,p:{x:370.5,y:59.775}},{t:this.shape_355,p:{x:380.1}},{t:this.shape_84,p:{x:392.525,y:63.075}},{t:this.shape_186,p:{x:401.775,y:61.425}},{t:this.shape_434,p:{x:411.175}},{t:this.shape_356,p:{x:427.4}},{t:this.shape_550},{t:this.shape_92,p:{x:446.85,y:61.35}},{t:this.shape_194,p:{x:453.925,y:61.425}},{t:this.shape_549},{t:this.shape_188,p:{x:471.775,y:61.425}},{t:this.shape_54,p:{x:481.125,y:63.075}},{t:this.shape_360,p:{x:488.3}},{t:this.shape_182,p:{x:495.925,y:61.425}},{t:this.shape_260,p:{x:505.475,y:59.525}},{t:this.shape_175,p:{x:513.875,y:61.425}},{t:this.shape_174,p:{x:520.325,y:59.525}},{t:this.shape_146,p:{x:533.7,y:61.425}},{t:this.shape_168,p:{x:542.775,y:61.425}},{t:this.shape_548},{t:this.shape_77,p:{x:564.25,y:59.775}},{t:this.shape_359,p:{x:571.025}},{t:this.shape_178,p:{x:580.375,y:61.425}},{t:this.shape_153,p:{x:587.125,y:59.525}},{t:this.shape_308,p:{x:591.35,y:65.125}},{t:this.shape_430,p:{x:613.375}},{t:this.shape_547},{t:this.shape_546},{t:this.shape_545},{t:this.shape_544},{t:this.shape_173,p:{x:671.575,y:61.425}},{t:this.shape_357,p:{x:680.925}},{t:this.shape_106,p:{x:690.325,y:63.125}},{t:this.shape_425},{t:this.shape_192,p:{x:268.3,y:91.725}},{t:this.shape_197,p:{x:275.275,y:91.475}},{t:this.shape_160,p:{x:283.625,y:93.375}},{t:this.shape_140,p:{x:290.125,y:91.475}},{t:this.shape_424},{t:this.shape_170,p:{x:306.225,y:93.375}},{t:this.shape_86,p:{x:314.25,y:93.3}},{t:this.shape_177,p:{x:321.625,y:91.475}},{t:this.shape_164,p:{x:329.975,y:93.375}},{t:this.shape_354,p:{x:339.375,y:93.3}},{t:this.shape_423,p:{x:361.05}},{t:this.shape_163,p:{x:370.725,y:93.375}},{t:this.shape_83,p:{x:378.7,y:93.3}},{t:this.shape_59,p:{x:383.3,y:91.725}},{t:this.shape_456,p:{x:402.525,y:93.375}},{t:this.shape_488,p:{x:411.525,y:93.375}},{t:this.shape_152,p:{x:420.325,y:93.375}},{t:this.shape_62,p:{x:428.3,y:93.3}},{t:this.shape_377,p:{x:432.9,y:91.725}},{t:this.shape_421,p:{x:439.65}},{t:this.shape_420,p:{x:451.85}},{t:this.shape_148,p:{x:476.275,y:93.375}},{t:this.shape_172,p:{x:485.875,y:91.475}},{t:this.shape_144,p:{x:494.225,y:93.375}},{t:this.shape_351,p:{x:503.625,y:93.3}},{t:this.shape_419,p:{x:525.3}},{t:this.shape_5,p:{x:532.45,y:91.725}},{t:this.shape_418,p:{x:539.475}},{t:this.shape_487},{t:this.shape_142,p:{x:558.125,y:93.375}},{t:this.shape_446,p:{x:567.475,y:91.475}},{t:this.shape_151,p:{x:574.3,y:91.725}},{t:this.shape_409,p:{x:593.525,y:93.375}},{t:this.shape_125,p:{x:600.475,y:91.475}},{t:this.shape_154,p:{x:607.175,y:93.375}},{t:this.shape_189,p:{x:616.275,y:91.475}},{t:this.shape_495,p:{x:637.7,y:93.375}},{t:this.shape_38,p:{x:647.125,y:95.025}},{t:this.shape_95,p:{x:656.325,y:93.375}},{t:this.shape_66,p:{x:664.05,y:93.3}},{t:this.shape_416,p:{x:674.05}},{t:this.shape_139,p:{x:686.125,y:93.375}},{t:this.shape_136,p:{y:97.075}},{t:this.shape_486},{t:this.shape_85,p:{x:271.275,y:125.275}},{t:this.shape_119,p:{x:277.725,y:123.375}},{t:this.shape_133,p:{x:284.425,y:125.275}},{t:this.shape_492,p:{x:293.825,y:125.2}},{t:this.shape_485},{t:this.shape_484},{t:this.shape_58,p:{x:314.65,y:124.275}},{t:this.shape_302,p:{x:322.325,y:125.2}},{t:this.shape_483},{t:this.shape_132,p:{x:339.825,y:125.275}},{t:this.shape_345,p:{x:355.225,y:125.275}},{t:this.shape_429,p:{x:364.225,y:125.275}},{t:this.shape_543},{t:this.shape_285,p:{x:385.25,y:125.2}},{t:this.shape_542},{t:this.shape_541},{t:this.shape_479,p:{x:417.425}},{t:this.shape_540},{t:this.shape_93,p:{x:436.025,y:125.275}},{t:this.shape_68,p:{x:445.425,y:123.375}},{t:this.shape_25,p:{x:452.2,y:123.625}},{t:this.shape_365,p:{x:467.65,y:125.2}},{t:this.shape_91,p:{x:479.775,y:125.275}},{t:this.shape_213,p:{x:488.85,y:125.275}},{t:this.shape_476,p:{x:497.95}},{t:this.shape_171,p:{x:507.625,y:123.375}},{t:this.shape_149,p:{x:522.125,y:123.375}},{t:this.shape_75,p:{x:530.525,y:125.275}},{t:this.shape_539},{t:this.shape_70,p:{x:555.025,y:125.275}},{t:this.shape_45,p:{x:561.775,y:123.375}},{t:this.shape_64,p:{x:568.475,y:125.275}},{t:this.shape_538},{t:this.shape_128,p:{x:598.925,y:123.375}},{t:this.shape_339,p:{x:607.575,y:125.275}},{t:this.shape_79,p:{x:617.375,y:123.375}},{t:this.shape_292,p:{x:625.975,y:125.275}},{t:this.shape_297,p:{x:635.575,y:125.2}},{t:this.shape_473,p:{x:642.45}},{t:this.shape_537},{t:this.shape_67,p:{x:671.375,y:125.275}},{t:this.shape_19,p:{x:677.825,y:123.375}},{t:this.shape_536},{t:this.shape_369,p:{x:692.7,y:125.2}},{t:this.shape_535},{t:this.shape_46,p:{x:270.775,y:157.225}},{t:this.shape_314,p:{x:278.5,y:157.15}},{t:this.shape_78,p:{x:285.35,y:157.225}},{t:this.shape_55,p:{x:294.425,y:157.225}},{t:this.shape_303,p:{y:157.15}},{t:this.shape_49,p:{x:318.725,y:157.225}},{t:this.shape_48,p:{x:341.425,y:155.325}},{t:this.shape_82,p:{x:350.025,y:157.225}},{t:this.shape_43,p:{x:359.825,y:155.325}},{t:this.shape_61,p:{x:368.425,y:157.225}},{t:this.shape_295,p:{x:378.025,y:157.15}},{t:this.shape_44,p:{x:400.525,y:157.225}},{t:this.shape_41,p:{x:410.125,y:155.325}},{t:this.shape_40,p:{x:418.475,y:157.225}},{t:this.shape_287,p:{x:427.875,y:157.15}},{t:this.shape_15,p:{x:450.675,y:155.325}},{t:this.shape_37,p:{x:459.025,y:157.225}},{t:this.shape_4,p:{x:465.475,y:155.325}},{t:this.shape_534},{t:this.shape_33,p:{x:481.575,y:157.225}},{t:this.shape_220,p:{x:489.6,y:157.15}},{t:this.shape_533},{t:this.shape_31,p:{x:519.425,y:157.225}},{t:this.shape_101,p:{y:157.15,x:527.45}},{t:this.shape_532},{t:this.shape_531},{t:this.shape_530},{t:this.shape_529},{t:this.shape_528},{t:this.shape_32,p:{x:585.875,y:155.325}},{t:this.shape_94,p:{x:608.225,y:157.225}},{t:this.shape_18,p:{x:617.225,y:157.225}},{t:this.shape_10,p:{x:626.475,y:157.225}},{t:this.shape_131,p:{x:632.95,y:155.575}},{t:this.shape_283,p:{x:639.725,y:157.15}},{t:this.shape_1,p:{x:649.075,y:158.925}},{t:this.shape_527},{t:this.shape_14,p:{x:681.425,y:157.225}},{t:this.shape_282,p:{x:690.825,y:157.15}},{t:this.shape_526},{t:this.shape_28,p:{x:276.175,y:189.125}},{t:this.shape_16,p:{x:285.275,y:189.05}},{t:this.shape_20,p:{x:294.675,y:189.125}},{t:this.shape_525},{t:this.shape_9,p:{x:309.175,y:189.125}},{t:this.shape_196,p:{x:318.25,y:189.125}},{t:this.shape_524},{t:this.shape_11,p:{x:346.525,y:189.125}},{t:this.shape_13,p:{x:355.625,y:189.05}},{t:this.shape_523},{t:this.shape_7,p:{x:369.125,y:189.125}},{t:this.shape_522},{t:this.shape_72,p:{x:385.5,y:187.475}},{t:this.shape_521},{t:this.shape_2,p:{x:400.675,y:189.05}},{t:this.shape_520},{t:this.shape_120,p:{x:417.15,y:187.475}},{t:this.shape_422,p:{x:423.325,y:189.125}},{t:this.shape_51,p:{x:429.6,y:187.475}},{t:this.shape_519},{t:this.shape_518},{t:this.shape_517},{t:this.shape_3,p:{x:469.125,y:189.125}},{t:this.shape_74,p:{x:477.15,y:189.05}},{t:this.shape_88,p:{x:484.3,y:189.2}},{t:this.shape_350,p:{x:491.15,y:192.825}}]},43).wait(43));

	// bg
	this.instance = new lib.Judul();
	this.instance.setTransform(-221,-150,1.1681,1.1652);

	this.instance_1 = new lib.A_1();
	this.instance_1.setTransform(-221,-150,1.1681,1.1653);

	this.instance_2 = new lib.A();
	this.instance_2.setTransform(-221,-150,1.168,1.1652);

	this.instance_3 = new lib.B_1();
	this.instance_3.setTransform(-221,-150,1.1681,1.1652);

	this.instance_4 = new lib.B();
	this.instance_4.setTransform(-221,-150,1.1681,1.1652);

	this.instance_5 = new lib.C_1();
	this.instance_5.setTransform(-221,-150,1.1681,1.1653);

	this.instance_6 = new lib.C();
	this.instance_6.setTransform(-221,-150,1.1681,1.1653);

	this.instance_7 = new lib.D();
	this.instance_7.setTransform(-221,-150,1.1681,1.1653);

	this.instance_8 = new lib.D_1();
	this.instance_8.setTransform(-221,-150,1.168,1.1652);

	this.instance_9 = new lib.E();
	this.instance_9.setTransform(-221,-150,1.168,1.1652);

	this.instance_10 = new lib.E_1();
	this.instance_10.setTransform(-221,-150,1.1681,1.1652);

	this.instance_11 = new lib.F();
	this.instance_11.setTransform(-221,-150,1.1681,1.1653);

	this.instance_12 = new lib.G();
	this.instance_12.setTransform(-221,-150,1.1681,1.1652);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},20).to({state:[{t:this.instance_2}]},21).to({state:[{t:this.instance_3}]},20).to({state:[{t:this.instance_4}]},21).to({state:[{t:this.instance_5}]},20).to({state:[{t:this.instance_6}]},21).to({state:[{t:this.instance_7}]},20).to({state:[{t:this.instance_8}]},21).to({state:[{t:this.instance_9}]},20).to({state:[{t:this.instance_10}]},21).to({state:[{t:this.instance_11}]},21).to({state:[{t:this.instance_12}]},21).to({state:[{t:this.instance_12}]},21).wait(369));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-221,-207.9,920.6,408.20000000000005);


(lib.sekBtn = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.G();
	this.instance.setTransform(0,0,0.9741,0.9741);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sekBtn, new cjs.Rectangle(0,0,369.4,250.8), null);


(lib.rongga1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AA1B9IAAhrQAAgPgHgLQgHgMgMgHQgMgHgPAAQgOAAgMAHQgMAHgHAMQgHALAAAPIAABrIgRAAIAAj5IARAAIAABiQAKgMAOgGQANgHAPABQATgBAQAKQAQAJAJAQQAKAPAAATIAABrg");
	this.shape.setTransform(101.375,-10.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AA1BYIAAgZQgKAMgOAHQgNAGgQAAQgSAAgQgJQgQgKgJgPQgJgQgBgUIAAhpIARAAIAABpQAAAPAHAMQAHAMAMAIQAMAHAOAAQAPAAAMgHQAMgIAHgMQAHgMAAgPIAAgCIAAhnIARAAIAACvg");
	this.shape_1.setTransform(83.825,-6.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgoBzQgTgJgMgSIAAAlIgRAAIAAj5IARAAIAABvQAMgSATgKQATgKAVABQAYAAAVAMQATALAMAUQAMATABAYQgBAZgMAUQgMAUgTAMQgVAMgYAAQgVAAgTgKgAgjgZQgRAKgJAPQgKARAAATQAAAVAKAQQAJAQARAJQAQAKATAAQAUAAAQgKQAQgJAKgQQAKgQAAgVQAAgTgKgRQgKgPgQgKQgQgJgUAAQgTAAgQAJg");
	this.shape_2.setTransform(64.75,-10.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AA1BYIAAgZQgKAMgOAHQgNAGgQAAQgSAAgQgJQgQgKgJgPQgJgQgBgUIAAhpIARAAIAABpQAAAPAHAMQAHAMAMAIQAMAHAOAAQAPAAAMgHQAMgIAHgMQAHgMAAgPIAAgCIAAhnIARAAIAACvg");
	this.shape_3.setTransform(45.325,-6.425);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgHB+IAAjrIhbAAIAAgQIDFAAIAAAQIhbAAIAADrg");
	this.shape_4.setTransform(33.775,-10.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("ABHBYIAAglQgMASgSAJQgUAKgVAAQgYAAgUgMQgUgMgLgUQgMgTAAgZQAAgYAMgUQALgUAUgLQAUgMAYAAQAZAAATAMQAUALAMAUQAMAUAAAYIAABYgAgkg9QgPAJgKARQgKAQAAATQAAAUAKAQQAKAQAPAKQARAKATAAQAUAAAQgKQAQgKAKgQQAJgQAAgUQAAgTgJgQQgKgRgQgJQgQgKgUAAQgTAAgRAKg");
	this.shape_5.setTransform(-0.55,-6.425);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgjB0QgQgKgJgQQgJgPgBgUIAAgCIARAAIAAACQAAAPAHAMQAHAMAMAHQAMAHAPAAQAOAAAMgHQAMgHAHgMQAHgMAAgPQAAgPgHgMQgGgMgNgHQgGADgHABIgNACIgNgCQgGgBgFgCIgMgGQgQgIgJgQQgJgQAAgSQABgUAJgPQAJgQAQgKQAQgJATAAQALAAAKADQALAEAJAHIAJgOIABAAIAUAAIgCADIgQAXQAIAJAEALQAEAMAAAMQAAAQgHAOQgHAPgNAJQANAKAHAPQAHANAAARQAAAUgKAPQgJAQgQAKQgQAIgSABQgTgBgQgIgAgbhkQgMAGgHANQgHAMAAAPQAAAOAHAMQAHAMAMAIQAFADAGABQAIADAIAAIAFAAIAKgDIAKgEQANgHAHgMQAHgNAAgOQAAgKgCgHQgDgJgFgHIgJgJQgHgGgJgDQgJgDgIAAQgPAAgMAIg");
	this.shape_6.setTransform(-19.375,-2.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgjB0QgQgKgJgQQgJgPgBgUIAAgCIARAAIAAACQAAAPAHAMQAHAMAMAHQAMAHAPAAQAOAAAMgHQAMgHAHgMQAHgMAAgPQAAgPgHgMQgGgMgNgHQgGADgHABIgNACIgNgCQgGgBgFgCIgMgGQgQgIgJgQQgJgQAAgSQABgUAJgPQAJgQAQgKQAQgJATAAQALAAAKADQALAEAJAHIAJgOIABAAIAUAAIgCADIgQAXQAIAJAEALQAEAMAAAMQAAAQgHAOQgHAPgNAJQANAKAHAPQAHANAAARQAAAUgKAPQgJAQgQAKQgQAIgSABQgTgBgQgIgAgbhkQgMAGgHANQgHAMAAAPQAAAOAHAMQAHAMAMAIQAFADAGABQAIADAIAAIAFAAIAKgDIAKgEQANgHAHgMQAHgNAAgOQAAgKgCgHQgDgJgFgHIgJgJQgHgGgJgDQgJgDgIAAQgPAAgMAIg");
	this.shape_7.setTransform(-37.125,-2.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AA1BYIAAhqQAAgPgHgMQgHgLgMgIQgMgHgPAAQgOAAgMAHQgMAIgHALQgHAMAAAPIAABqIgRAAIAAivIARAAIAAAYQAKgLAOgHQANgGAPAAQATAAAQAJQAQAJAJAQQAKAQAAATIAABqg");
	this.shape_8.setTransform(-54.775,-6.425);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgsBMQgTgMgNgUQgLgTgBgZQABgYALgUQANgUATgLQAUgMAYAAQAYAAAVAMQATALAMAUQAMAUABAYQgBASgHAQQgGAQgMAMQgNANgQAHQgRAGgRAAQgYAAgUgMgAgjg9QgRAJgJARQgKAQAAATQAAAUAKAQQAJAQARAKQAQAKATAAQAPAAAMgGQANgFALgLQAKgKAFgNQAGgNAAgOQAAgTgKgQQgKgRgQgJQgQgKgUAAQgTAAgQAKg");
	this.shape_9.setTransform(-73.85,-6.425);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("ABQB+IAAgBIg2hJIgRABIhcAAIAABJIgQAAIAAgCIAAhHIAAgRIAAiRIAAgQIBsAAQAZABAUALQAUAMAMAUQAMAVABAYQgBASgGARQgIAQgMAMQgMANgSAGIA4BNIADADgAhTAkIBcAAIAKAAIAMgDQAPgFAMgLQALgKAGgNQAHgOAAgQQAAgUgKgRQgKgPgQgLQgRgJgUgBIhcAAg");
	this.shape_10.setTransform(-95.65,-10.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#0954D2").s().p("A54A+QgwAAAAgYIAAhjQABAXAvAAMAzxAAAQAvAAABgXIAABjQAAAYgwAAg");
	this.shape_11.setTransform(0,25.2625);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#0984E3").s().p("A54E7QgvAAgBgYIAApEQAAgYAwAAMAzxAAAQAwAAAAAYIAAJEQgBAYgvAAg");
	this.shape_12.setTransform(0,-10.05);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgoBzQgTgKgMgRIAAAlIgRAAIAAj5IARAAIAABvQAMgSATgKQATgKAVABQAYAAAVAMQATALAMAUQAMATABAYQgBAZgMAUQgMAUgTAMQgVAMgYAAQgVAAgTgKgAgjgZQgRAKgJAPQgKARAAATQAAAVAKAQQAJAQARAJQAQAKATAAQAUAAAQgKQAQgJAKgQQAKgQAAgVQAAgTgKgRQgKgPgQgKQgQgJgUAAQgTAAgQAJg");
	this.shape_13.setTransform(64.75,-5.6);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgjB0QgQgKgJgPQgJgQgBgUIAAgCIARAAIAAACQAAAPAHAMQAHAMAMAHQAMAHAPAAQAOAAAMgHQAMgHAHgMQAHgMAAgPQAAgPgHgMQgGgMgNgHQgGADgHABIgNACIgNgCQgGgBgFgCIgMgGQgQgIgJgQQgJgQAAgSQABgUAJgPQAJgQAQgKQAQgJATAAQALAAAKADQALAEAJAHIAJgOIABAAIAUAAIgCADIgQAXQAIAJAEALQAEAMAAAMQAAAQgHAOQgHAPgNAJQANAKAHAPQAHANAAARQAAAUgKAQQgJAPgQAKQgQAIgSABQgTgBgQgIgAgbhkQgMAGgHANQgHAMAAAPQAAAOAHAMQAHAMAMAIQAFADAGABQAIADAIAAIAFAAIAKgDIAKgEQANgHAHgMQAHgNAAgOQAAgKgCgHQgDgJgFgHIgJgJQgHgGgJgDQgJgDgIAAQgPAAgMAIg");
	this.shape_14.setTransform(-19.375,1.75);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgjB0QgQgKgJgPQgJgQgBgUIAAgCIARAAIAAACQAAAPAHAMQAHAMAMAHQAMAHAPAAQAOAAAMgHQAMgHAHgMQAHgMAAgPQAAgPgHgMQgGgMgNgHQgGADgHABIgNACIgNgCQgGgBgFgCIgMgGQgQgIgJgQQgJgQAAgSQABgUAJgPQAJgQAQgKQAQgJATAAQALAAAKADQALAEAJAHIAJgOIABAAIAUAAIgCADIgQAXQAIAJAEALQAEAMAAAMQAAAQgHAOQgHAPgNAJQANAKAHAPQAHANAAARQAAAUgKAQQgJAPgQAKQgQAIgSABQgTgBgQgIgAgbhkQgMAGgHANQgHAMAAAPQAAAOAHAMQAHAMAMAIQAFADAGABQAIADAIAAIAFAAIAKgDIAKgEQANgHAHgMQAHgNAAgOQAAgKgCgHQgDgJgFgHIgJgJQgHgGgJgDQgJgDgIAAQgPAAgMAIg");
	this.shape_15.setTransform(-37.125,1.75);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#0954D2").s().p("A54AnQgwAAAAgYIAAg1QABAXAvAAMAzxAAAQAvAAABgXIAAA1QAAAYgwAAg");
	this.shape_16.setTransform(0,27.525);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AA1B9IAAhrQAAgPgHgLQgHgLgMgIQgMgHgPAAQgOAAgMAHQgMAIgHALQgHALAAAPIAABrIgRAAIAAj5IARAAIAABiQAKgLAOgHQANgGAPgBQATAAAQAKQAQAJAJAQQAKAPAAATIAABrg");
	this.shape_17.setTransform(101.375,0.65);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgoBzQgTgKgMgRIAAAlIgRAAIAAj5IARAAIAABuQAMgRATgKQATgKAVAAQAYAAAVAMQATAMAMAUQAMATABAZQgBAZgMATQgMAUgTAMQgVAMgYAAQgVAAgTgKgAgjgYQgRAJgJAQQgKAPAAAVQAAATAKARQAJAQARAKQAQAJATABQAUgBAQgJQAQgKAKgQQAKgRAAgTQAAgVgKgPQgKgQgQgJQgQgKgUAAQgTAAgQAKg");
	this.shape_18.setTransform(64.75,0.65);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgjBzQgQgJgJgQQgJgQgBgTIAAgCIARAAIAAACQAAAPAHAMQAHAMAMAHQAMAIAPgBQAOABAMgIQAMgHAHgMQAHgMAAgPQAAgPgHgLQgGgNgNgHQgGADgHABIgNABIgNAAQgGgCgFgCIgMgFQgQgKgJgPQgJgQAAgTQABgTAJgQQAJgQAQgIQAQgKATAAQALAAAKAEQALADAJAGIAJgMIABgBIAUAAIgCADIgQAWQAIAJAEAMQAEALAAAMQAAARgHAPQgHAOgNAJQANAKAHAOQAHAPAAAQQAAATgKAQQgJAQgQAJQgQAKgSAAQgTAAgQgKgAgbhlQgMAIgHALQgHAMAAAPQAAAPAHAMQAHANAMAGQAFAEAGACQAIACAIAAIAFgBIAKgBIAKgFQANgHAHgNQAHgMAAgPQAAgIgCgJQgDgIgFgHIgJgIQgHgHgJgCQgJgEgIAAQgPABgMAGg");
	this.shape_19.setTransform(-19.375,8);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgjBzQgQgJgJgQQgJgQgBgTIAAgCIARAAIAAACQAAAPAHAMQAHAMAMAHQAMAIAPgBQAOABAMgIQAMgHAHgMQAHgMAAgPQAAgPgHgLQgGgNgNgHQgGADgHABIgNABIgNAAQgGgCgFgCIgMgFQgQgKgJgPQgJgQAAgTQABgTAJgQQAJgQAQgIQAQgKATAAQALAAAKAEQALADAJAGIAJgMIABgBIAUAAIgCADIgQAWQAIAJAEAMQAEALAAAMQAAARgHAPQgHAOgNAJQANAKAHAOQAHAPAAAQQAAATgKAQQgJAQgQAJQgQAKgSAAQgTAAgQgKgAgbhlQgMAIgHALQgHAMAAAPQAAAPAHAMQAHANAMAGQAFAEAGACQAIACAIAAIAFgBIAKgBIAKgFQANgHAHgNQAHgMAAgPQAAgIgCgJQgDgIgFgHIgJgIQgHgHgJgCQgJgEgIAAQgPABgMAGg");
	this.shape_20.setTransform(-37.125,8);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("ABQB+IAAgBIg2hKIgRACIhcAAIAABJIgQAAIAAgCIAAhHIAAgQIAAiSIAAgQIBsAAQAZABAUALQAUAMAMAVQAMATABAaQgBASgGAQQgIAPgMANQgMAMgSAIIA4BLIADAEgAhTAlIBcAAIAKgBIAMgDQAPgFAMgKQALgKAGgNQAHgOAAgQQAAgVgKgRQgKgQgQgJQgRgKgUgBIhcAAg");
	this.shape_21.setTransform(-95.65,0.55);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#0984E3").s().p("A54E6QgvAAgBgWIAApGQAAgYAwAAMAzxAAAQAwAAAAAYIAAJGQgBAWgvAAg");
	this.shape_22.setTransform(0,0.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12,p:{y:-10.05}},{t:this.shape_11},{t:this.shape_10,p:{y:-10.2}},{t:this.shape_9,p:{y:-6.425}},{t:this.shape_8,p:{y:-6.425}},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5,p:{y:-6.425}},{t:this.shape_4,p:{y:-10.2}},{t:this.shape_3,p:{y:-6.425}},{t:this.shape_2},{t:this.shape_1,p:{y:-6.425}},{t:this.shape,p:{y:-10.1}}]}).to({state:[{t:this.shape_12,p:{y:-5.55}},{t:this.shape_16},{t:this.shape_10,p:{y:-5.7}},{t:this.shape_9,p:{y:-1.925}},{t:this.shape_8,p:{y:-1.925}},{t:this.shape_15},{t:this.shape_14},{t:this.shape_5,p:{y:-1.925}},{t:this.shape_4,p:{y:-5.7}},{t:this.shape_3,p:{y:-1.925}},{t:this.shape_13},{t:this.shape_1,p:{y:-1.925}},{t:this.shape,p:{y:-5.6}}]},1).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.shape_9,p:{y:4.325}},{t:this.shape_8,p:{y:4.325}},{t:this.shape_20},{t:this.shape_19},{t:this.shape_5,p:{y:4.325}},{t:this.shape_4,p:{y:0.55}},{t:this.shape_3,p:{y:4.325}},{t:this.shape_18},{t:this.shape_1,p:{y:4.325}},{t:this.shape_17}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-170.5,-41.5,341,73.7);


(lib.repord2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgHB6IAAirIAPAAIAACrgAgHhoIAAgQIAPAAIAAAQg");
	this.shape.setTransform(144.1,-10.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgiBQQgPgGgIgKQgKgLAAgNIAAgCIAPAAIAAACQABAOAOAIQAPAIAWAAQAXAAAOgIQAPgIgBgOQAAgJgGgHQgHgIgMgEQgLgEgPAAQgSAAgPgGQgQgGgIgLQgKgLAAgNQAAgNAKgKQAIgLAPgFQAQgHASAAQASAAAQAHQAPAFAKALQAIAKABANIAAACIgQAAIAAgCQAAgOgPgHQgNgJgYAAQgXAAgOAJQgOAHAAAOQAAAJAHAHQAGAIAMAEQAMAEAOAAQASAAAQAHQAPAFAKALQAIALABANQgBANgIALQgKAKgPAGQgQAGgSAAQgSAAgQgGg");
	this.shape_1.setTransform(133,-7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAxB6IAAgBIgxhHIgyBHIAAABIgSAAIAAjyIAQAAIAADYIArg+IAHgKIAzhIIAAgBIAUAAIgCADIg6BRIA6BTIACAEg");
	this.shape_2.setTransform(117.575,-10.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AA0BWIAAgYQgKALgOAHQgNAGgPAAQgSAAgQgJQgPgJgIgPQgKgQAAgTIAAhnIAQAAIAABnQAAAOAHANQAHALAMAHQALAHAOAAQAPAAALgHQALgHAHgLQAIgNAAgOIAAgCIAAhlIAQAAIAACrg");
	this.shape_3.setTransform(100.4,-7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("ABGB6IAAgkQgMARgTAJQgSAKgVAAQgXgBgUgMQgTgKgLgUQgMgUAAgYQAAgYAMgSQALgTATgMQAUgLAXAAQAVAAASAJQATAJAMASIAAhrIAQAAIAADygAgjgXQgPAIgKAPQgIAQgBATQABAUAIAQQAKAQAPAJQAQAJATAAQATAAAQgJQAQgJAJgQQAJgQABgUQgBgTgJgQQgJgPgQgIQgQgKgTAAQgTAAgQAKg");
	this.shape_4.setTransform(81.5,-10.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgrBKQgTgLgLgTQgLgUgBgYQABgXALgTQALgTATgMQAUgLAXgBQAYABATALQAUAMALATQALATABAXQgBASgFAPQgHAPgMANQgMAMgRAHQgPAGgRAAQgXAAgUgMgAgig7QgQAJgKAQQgJAPAAATQAAATAJARQAKAPAQAJQAQAKASAAQAOAAANgFQANgFAJgLQALgKAEgMQAFgNABgOQAAgTgKgPQgJgQgQgJQgPgKgUAAQgSAAgQAKg");
	this.shape_5.setTransform(61.5,-7);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgrBWIAAirIAQAAIAAAkIAJgLQANgMAOgGQAPgHASAAIACAAIAAAQIgCAAQgOAAgNAGQgNAFgIAKQgLAKgFANQgFAMAAANIAABWg");
	this.shape_6.setTransform(48.15,-7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AhVB6IAAjzIAQAAIAAAkQAMgRATgJQASgKAUAAQAYABATALQAUAMALATQAMATAAAYQAAAYgMATQgLATgUALQgTAMgYAAQgUAAgSgJQgTgKgMgRIAABsgAgjhfQgPAJgKAQQgIAQgBATQABAUAIAPQAKAPAPAKQAQAJATAAQATAAAQgJQAQgKAJgPQAJgPABgUQgBgTgJgQQgJgQgQgJQgQgJgTgBQgTABgQAJg");
	this.shape_7.setTransform(32,-3.425);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgrBKQgTgLgLgTQgLgUgBgYQABgXALgTQALgTATgMQAUgLAXgBQAYABATALQAUAMALATQAMATAAAXIAAACIgFAAIiWAAQABATAJAQQAJAPAQAIQAQAKASAAQAWAAARgNQASgMAIgVIABgBIACAAIALAFIACABIgBABQgGARgMAMQgNANgPAHQgQAHgSAAQgXAAgUgMgABFgNQgEgQgKgNQgKgMgOgHQgOgIgRAAQgQAAgOAIQgOAHgKAMQgKANgEAQICJAAIAAAAg");
	this.shape_8.setTransform(11.65,-7);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("ABOB7IgBgBIg0hIQgIABgIABIhaAAIAABHIgQAAIAAgCIAAhFIAAgRIAAiNIAAgPIBqAAQAYAAATAMQAUALAMATQALAUABAYQgBASgGAQQgHAPgMAMQgMAMgRAHIA2BKIADAEgAhRAjIBaAAIAJAAIAMgDQAPgFALgKQALgKAGgNQAGgNAAgQQAAgTgJgRQgKgPgQgKQgQgJgTgBIhaAAg");
	this.shape_9.setTransform(-9.525,-10.65);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("ABwBWIAAhnQAAgPgHgLQgHgMgMgGQgMgIgOAAQgPAAgLAIQgMAGgHAMQgHALAAAPIAABnIgPAAIAAhnQAAgPgHgLQgHgMgMgGQgLgIgPAAQgOAAgMAIQgMAGgHAMQgHALAAAPIAABnIgQAAIAAirIAQAAIAAAZQAKgMANgGQAOgHAPAAQATABAQAJQAQAJAIARQAJgRAQgJQAQgJATgBQATABAPAIQAPAKAJAPQAKAPAAATIAABng");
	this.shape_10.setTransform(-47.275,-7);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgqBKQgUgLgMgTQgKgUgBgYQABgXAKgTQAMgTAUgMQATgLAXgBQAYABATALQAUAMALATQAMATAAAXIAAACIgFAAIiWAAQABATAJAQQAKAPAPAIQAQAKASAAQAWAAARgNQASgMAIgVIABgBIACAAIALAFIACABIgBABQgGARgMAMQgMANgRAHQgPAHgSAAQgXAAgTgMgABEgNQgDgQgKgNQgJgMgPgHQgOgIgRAAQgQAAgOAIQgPAHgJAMQgKANgEAQICIAAIAAAAg");
	this.shape_11.setTransform(-71.8,-7);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgNBvQgLgKAAgOIAAh5IgMAAIAAgPIAMAAIAAhHIAQAAIAABHIALAAIAAAPIgLAAIAAB5QAAAHAGAGQAEAFAIAAQAEAAAEgBIAGgEIABgCIACACIAIAIIACABIgCACQgFAFgGADQgGACgIABQgOgBgJgKg");
	this.shape_12.setTransform(-84.475,-10.55);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgiBQQgPgGgIgKQgKgLAAgNIAAgCIAPAAIAAACQABAOAOAIQAOAIAXAAQAXAAAOgIQAPgIAAgOQgBgJgGgHQgHgIgMgEQgLgEgPAAQgSAAgPgGQgQgGgIgLQgKgLAAgNQAAgNAKgKQAIgLAPgFQAQgHASAAQASAAAQAHQAPAFAKALQAIAKABANIAAACIgQAAIAAgCQAAgOgPgHQgOgJgXAAQgWAAgOAJQgOAHgBAOQAAAJAHAHQAGAIAMAEQAMAEAOAAQASAAAQAHQAPAFAKALQAIALABANQgBANgIALQgKAKgPAGQgQAGgSAAQgSAAgQgGg");
	this.shape_13.setTransform(-97.6,-7);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("Ag1B3IgCAAIABgCIAEgLIAAgCIACAAIAHACQAGgBAFgDQAFgDACgGIAQgtIg8imIgBgDIARAAIABACIAyCPIABgCIAyiNIABgCIARAAIgBADIgIAVIABAAIgBACIg0CQIgQAxQgEALgJAGQgJAGgLABQgGAAgGgDg");
	this.shape_14.setTransform(-113.075,-3.425);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgwByQgWgJgMgPQgNgOAAgSIAAgCIAQAAIAAACQAAALAFAIQAHAJAKAHQAMAGAOAEQAQADAPAAQARAAAOgDQAPgEAMgGQAKgHAHgJQAFgIAAgLQAAgOgLgLQgKgMgSgGQgSgHgXAAQgSAAgSgFQgRgEgOgJQgNgKgIgMQgHgMAAgNQAAgTANgOQAMgOAWgIQAWgJAaAAQAbAAAWAJQAWAIANAOQANAOgBATIAAACIgQAAIAAgCQAAgLgFgIQgHgJgKgHQgMgHgPgDQgOgEgRAAQgPAAgQAEQgOADgMAHQgKAHgHAJQgFAIAAALQAAAOALAMQAKAKASAHQASAHAWAAQATAAASAFQARAEAOAJQAOAKAHAMQAHAMAAANQABASgNAOQgNAPgWAJQgWAJgbAAQgaAAgWgJg");
	this.shape_15.setTransform(-131.4,-10.65);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#0954D2").s().p("A54A+QgwAAAAgYIAAhjQABAXAvAAMAzxAAAQAvAAABgXIAABjQAAAYgwAAg");
	this.shape_16.setTransform(0,25.2625);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#0984E3").s().p("A54E7QgvAAgBgYIAApEQAAgYAwAAMAzxAAAQAwAAAAAYIAAJEQgBAYgvAAg");
	this.shape_17.setTransform(0,-10.05);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("ABGB6IAAgkQgMARgTAJQgSAKgVAAQgXgBgUgMQgTgKgLgUQgMgUAAgYQAAgYAMgSQALgTATgMQAUgLAXAAQAVAAASAJQATAJAMASIAAhrIAQAAIAADygAgjgXQgPAIgKAPQgIAQgBATQABAUAIAQQAKAQAPAJQAQAJATABQATgBAQgJQAQgJAJgQQAJgQABgUQgBgTgJgQQgJgPgQgIQgQgKgTAAQgTAAgQAKg");
	this.shape_18.setTransform(81.5,-6.05);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgNBvQgLgKAAgOIAAh5IgMAAIAAgPIAMAAIAAhHIAQAAIAABHIALAAIAAAPIgLAAIAAB5QAAAHAGAGQAEAFAIABQAEgBAEgBIAGgEIABgCIACACIAIAIIACABIgCACQgFAFgGADQgGACgIABQgOgBgJgKg");
	this.shape_19.setTransform(-84.475,-6.05);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#0954D2").s().p("A54AnQgwAAAAgYIAAg1QABAXAvAAMAzxAAAQAvAAABgXIAAA1QAAAYgwAAg");
	this.shape_20.setTransform(0,27.525);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgHB5IAAirIAPAAIAACrgAgHhpIAAgQIAPAAIAAAQg");
	this.shape_21.setTransform(144.1,0.2);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgiBPQgPgFgIgLQgKgKAAgNIAAgCIAPAAIAAACQABANAOAIQAPAJAWAAQAXAAAOgJQAPgIgBgNQAAgJgGgHQgHgHgMgEQgLgFgPAAQgSAAgPgHQgQgFgIgLQgKgLAAgNQAAgNAKgKQAIgKAPgHQAQgFASgBQASABAQAFQAPAHAKAKQAIAKABANIAAACIgQAAIAAgCQAAgNgPgJQgNgHgYgBQgXABgOAHQgOAJAAANQAAAJAHAIQAGAGAMAFQAMAEAOAAQASAAAQAGQAPAHAKAKQAIALABANQgBANgIAKQgKALgPAFQgQAHgSAAQgSAAgQgHg");
	this.shape_22.setTransform(133,3.75);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AAxB5IAAgBIgxhHIgyBHIAAABIgSAAIAAjyIAQAAIAADZIArg9IAHgLIAzhJIAAgBIAUAAIgCAEIg6BSIA6BTIACACg");
	this.shape_23.setTransform(117.575,0.2);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AA0BWIAAgYQgKALgOAGQgNAHgPAAQgSAAgQgJQgPgJgIgPQgKgQAAgTIAAhnIAQAAIAABnQAAAOAHAMQAHAMAMAHQALAHAOAAQAPAAALgHQALgHAHgMQAIgMAAgOIAAgCIAAhlIAQAAIAACrg");
	this.shape_24.setTransform(100.4,3.75);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("ABGB5IAAgkQgMARgTAKQgSAJgVAAQgXAAgUgLQgTgMgLgTQgMgUAAgXQAAgZAMgRQALgUATgMQAUgLAXgBQAVAAASAKQATAJAMARIAAhrIAQAAIAADygAgjgYQgPAKgKAPQgIAPgBAUQABATAIAQQAKAPAPAKQAQAKATgBQATABAQgKQAQgKAJgPQAJgQABgTQgBgUgJgPQgJgPgQgKQgQgJgTAAQgTAAgQAJg");
	this.shape_25.setTransform(81.5,0.2);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgrBKQgTgLgLgUQgLgTgBgYQABgXALgTQALgUATgLQAUgLAXgBQAYABATALQAUALALAUQALATABAXQgBARgFAQQgHAQgMAMQgMAMgRAGQgPAHgRAAQgXAAgUgMgAgig7QgQAJgKAQQgJAPAAATQAAATAJAQQAKAQAQAKQAQAJASAAQAOAAANgGQANgFAJgJQALgLAEgNQAFgMABgOQAAgTgKgPQgJgQgQgJQgPgKgUAAQgSAAgQAKg");
	this.shape_26.setTransform(61.5,3.75);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgrBWIAAirIAQAAIAAAkIAJgLQANgMAOgHQAPgGASAAIACAAIAAAQIgCAAQgOABgNAEQgNAGgIAKQgLAKgFAMQgFANAAANIAABWg");
	this.shape_27.setTransform(48.15,3.75);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgrBKQgTgLgLgUQgLgTgBgYQABgXALgTQALgUATgLQAUgLAXgBQAYABATALQAUALALAUQAMATAAAXIAAACIgFAAIiWAAQABATAJAPQAJAPAQAKQAQAJASAAQAWgBARgLQASgNAIgUIABgCIACABIALADIACABIgBADQgGAQgMANQgNAMgPAHQgQAHgSAAQgXAAgUgMgABFgNQgEgQgKgNQgKgMgOgIQgOgGgRgBQgQABgOAGQgOAIgKAMQgKANgEAQICJAAIAAAAg");
	this.shape_28.setTransform(11.65,3.75);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("ABOB6IgBgBIg0hHQgIABgIAAIhaAAIAABHIgQAAIAAgCIAAhFIAAgPIAAiNIAAgRIBqAAQAYABATALQAUAMAMAUQALATABAZQgBARgGAQQgHAPgMAMQgMAMgRAHIA2BLIADACgAhRAkIBaAAIAJgBIAMgDQAPgFALgKQALgKAGgMQAGgOAAgPQAAgUgJgQQgKgQgQgJQgQgKgTAAIhaAAg");
	this.shape_29.setTransform(-9.525,0.1);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("ABwBWIAAhnQAAgOgHgMQgHgLgMgIQgMgGgOgBQgPABgLAGQgMAIgHALQgHAMAAAOIAABnIgPAAIAAhnQAAgOgHgMQgHgLgMgIQgLgGgPgBQgOABgMAGQgMAIgHALQgHAMAAAOIAABnIgQAAIAAirIAQAAIAAAYQAKgLANgHQAOgGAPAAQATABAQAJQAQAKAIAQQAJgQAQgKQAQgJATgBQATAAAPAKQAPAIAJAQQAKAPAAATIAABng");
	this.shape_30.setTransform(-47.275,3.75);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgqBKQgUgLgMgUQgKgTgBgYQABgXAKgTQAMgUAUgLQATgLAXgBQAYABATALQAUALALAUQAMATAAAXIAAACIgFAAIiWAAQABATAJAPQAKAPAPAKQAQAJASAAQAWgBARgLQASgNAIgUIABgCIACABIALADIACABIgBADQgGAQgMANQgMAMgRAHQgPAHgSAAQgXAAgTgMgABEgNQgDgQgKgNQgJgMgPgIQgOgGgRgBQgQABgOAGQgPAIgJAMQgKANgEAQICIAAIAAAAg");
	this.shape_31.setTransform(-71.8,3.75);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgNBvQgLgKAAgPIAAh3IgMAAIAAgRIAMAAIAAhHIAQAAIAABHIALAAIAAARIgLAAIAAB3QAAAJAGAFQAEAGAIgBQAEAAAEgBIAGgEIABgBIACABIAIAJIACABIgCABQgFAFgGADQgGADgIgBQgOAAgJgKg");
	this.shape_32.setTransform(-84.475,0.2);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgiBPQgPgFgIgLQgKgKAAgNIAAgCIAPAAIAAACQABANAOAIQAOAJAXAAQAXAAAOgJQAPgIAAgNQgBgJgGgHQgHgHgMgEQgLgFgPAAQgSAAgPgHQgQgFgIgLQgKgLAAgNQAAgNAKgKQAIgKAPgHQAQgFASgBQASABAQAFQAPAHAKAKQAIAKABANIAAACIgQAAIAAgCQAAgNgPgJQgOgHgXgBQgWABgOAHQgOAJgBANQAAAJAHAIQAGAGAMAFQAMAEAOAAQASAAAQAGQAPAHAKAKQAIALABANQgBANgIAKQgKALgPAFQgQAHgSAAQgSAAgQgHg");
	this.shape_33.setTransform(-97.6,3.75);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgwByQgWgJgMgOQgNgPAAgSIAAgCIAQAAIAAACQAAAKAFAJQAHAJAKAHQAMAGAOAEQAQADAPAAQARAAAOgDQAPgEAMgGQAKgHAHgJQAFgJAAgKQAAgOgLgLQgKgMgSgGQgSgHgXAAQgSAAgSgFQgRgEgOgKQgNgJgIgMQgHgMAAgOQAAgRANgOQAMgPAWgJQAWgIAagBQAbABAWAIQAWAJANAPQANAOgBARIAAACIgQAAIAAgCQAAgKgFgJQgHgIgKgHQgMgHgPgDQgOgEgRABQgPgBgQAEQgOADgMAHQgKAHgHAIQgFAJAAAKQAAAPALALQAKAMASAGQASAHAWAAQATAAASAFQARAEAOAKQAOAJAHAMQAHANAAAMQABASgNAPQgNAOgWAJQgWAIgbAAQgaAAgWgIg");
	this.shape_34.setTransform(-131.4,0.1);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#0984E3").s().p("A54E6QgvAAgBgWIAApGQAAgYAwAAMAzxAAAQAwAAAAAYIAAJGQgBAWgvAAg");
	this.shape_35.setTransform(0,0.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17,p:{y:-10.05}},{t:this.shape_16},{t:this.shape_15,p:{y:-10.65}},{t:this.shape_14,p:{y:-3.425}},{t:this.shape_13,p:{y:-7}},{t:this.shape_12},{t:this.shape_11,p:{y:-7}},{t:this.shape_10,p:{y:-7}},{t:this.shape_9,p:{y:-10.65}},{t:this.shape_8,p:{y:-7}},{t:this.shape_7,p:{y:-3.425}},{t:this.shape_6,p:{y:-7}},{t:this.shape_5,p:{y:-7}},{t:this.shape_4},{t:this.shape_3,p:{y:-7}},{t:this.shape_2,p:{y:-10.55}},{t:this.shape_1,p:{y:-7}},{t:this.shape,p:{y:-10.55}}]}).to({state:[{t:this.shape_17,p:{y:-5.55}},{t:this.shape_20},{t:this.shape_15,p:{y:-6.15}},{t:this.shape_14,p:{y:1.075}},{t:this.shape_13,p:{y:-2.5}},{t:this.shape_19},{t:this.shape_11,p:{y:-2.5}},{t:this.shape_10,p:{y:-2.5}},{t:this.shape_9,p:{y:-6.15}},{t:this.shape_8,p:{y:-2.5}},{t:this.shape_7,p:{y:1.075}},{t:this.shape_6,p:{y:-2.5}},{t:this.shape_5,p:{y:-2.5}},{t:this.shape_18},{t:this.shape_3,p:{y:-2.5}},{t:this.shape_2,p:{y:-6.05}},{t:this.shape_1,p:{y:-2.5}},{t:this.shape,p:{y:-6.05}}]},1).to({state:[{t:this.shape_35},{t:this.shape_34},{t:this.shape_14,p:{y:7.325}},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_7,p:{y:7.325}},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-170.5,-41.5,341,73.7);


(lib.putih1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0097E6").s().p("A82E7Qg1AAAAgYIAApFQAAgXA1AAMA5tAAAQA1AAABAXIAAJFQgBAYg1AAg");
	this.shape.setTransform(-20.05,1.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.putih1, new cjs.Rectangle(-210.1,-30,380.1,62.9), null);


(lib.panah = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#E74C3C").ss(3.8,1,1).p("AtVCWIarSwAtVCWIarESAtVCWIaro9AtVCWIar3b");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.panah, new cjs.Rectangle(-87.2,-136.8,174.4,273.70000000000005), null);


(lib.lapisan2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAzB6IAAhpQAAgOgGgLQgIgLgLgHQgMgHgOAAQgOAAgLAHQgMAHgHALQgHALAAAOIAABpIgQAAIAAjyIAQAAIAABfQAKgMANgGQANgHAPABQATAAAPAJQAQAJAIAPQAKAQAAARIAABpg");
	this.shape.setTransform(102.8,-10.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAzBWIAAgYQgJALgNAHQgOAGgPAAQgSAAgPgJQgPgJgKgPQgIgQgBgTIAAhnIAQAAIAABnQAAAOAHANQAHALAMAHQALAHAOAAQAOAAAMgHQALgHAIgLQAGgNAAgOIAAgCIAAhlIARAAIAACrg");
	this.shape_1.setTransform(85.7,-7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgnBwQgRgJgNgRIAAAkIgQAAIAAjyIAQAAIAABrQANgSARgIQATgKAUAAQAYAAATALQATAMAMATQAMASAAAYQAAAYgMAUQgMAUgTAKQgTAMgYABQgUAAgTgKgAgigXQgQAIgJAPQgKAQAAATQAAAUAKAQQAJAQAQAJQAQAJASAAQAUAAAPgJQAQgJAJgQQAJgQABgUQgBgTgJgQQgJgPgQgIQgPgKgUAAQgSAAgQAKg");
	this.shape_2.setTransform(67.15,-10.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAzBWIAAgYQgJALgNAHQgOAGgPAAQgSAAgPgJQgPgJgKgPQgJgQAAgTIAAhnIAQAAIAABnQAAAOAHANQAHALAMAHQALAHAOAAQAOAAAMgHQALgHAIgLQAGgNAAgOIAAgCIAAhlIARAAIAACrg");
	this.shape_3.setTransform(48.25,-7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgHB7IAAjlIhYAAIAAgPIC/AAIAAAPIhYAAIAADlg");
	this.shape_4.setTransform(37,-10.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAzBWIAAhnQABgPgIgLQgGgMgMgGQgMgIgOAAQgNAAgMAIQgMAGgHAMQgHALAAAPIAABnIgQAAIAAirIAQAAIAAAZQAKgMANgGQAOgHAOAAQASABAQAIQAPAKAKAPQAJAPAAATIAABng");
	this.shape_5.setTransform(5.4,-7);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("ABGBWIAAgkQgMARgTAJQgSAKgVAAQgXAAgTgMQgUgLgMgTQgLgUAAgYQAAgXALgTQAMgTAUgMQATgLAXgBQAYABATALQATAMAMATQAMATAAAXIAABWgAgig7QgQAJgJAQQgKAPAAATQAAATAKARQAJAPAQAJQAQAKASAAQATAAAQgKQAQgJAJgPQAJgRABgTQgBgTgJgPQgJgQgQgJQgQgKgTAAQgSAAgQAKg");
	this.shape_6.setTransform(-13.5,-7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgiBQQgPgGgIgKQgKgLAAgNIAAgCIAPAAIAAACQABAOAOAIQAPAIAWAAQAXAAAOgIQAOgIAAgOQAAgJgGgHQgHgIgMgEQgLgEgPAAQgSAAgPgGQgQgGgIgLQgKgLAAgNQAAgNAKgKQAIgLAPgFQAQgHASAAQASAAAQAHQAPAFAKALQAIAKABANIAAACIgQAAIAAgCQAAgOgPgHQgNgJgYAAQgXAAgOAJQgOAHAAAOQAAAJAHAHQAGAIAMAEQAMAEAOAAQASAAAQAHQAPAFAKALQAIALABANQgBANgIALQgKAKgPAGQgQAGgSAAQgSAAgQgGg");
	this.shape_7.setTransform(-31.7,-7);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgHB6IAAirIAPAAIAACrgAgHhoIAAgQIAPAAIAAAQg");
	this.shape_8.setTransform(-42.8,-10.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AhVB6IAAjzIAQAAIAAAkQANgRARgJQATgKAUAAQAYABATALQATAMAMATQAMATAAAYQAAAYgMATQgMATgTALQgTAMgYAAQgUAAgTgJQgRgKgNgRIAABsgAgihfQgQAJgJAQQgKAQAAATQAAAUAKAPQAJAPAQAKQAQAJASAAQATAAAQgJQAQgKAJgPQAJgPABgUQgBgTgJgQQgJgQgQgJQgQgJgTgBQgSABgQAJg");
	this.shape_9.setTransform(-55.35,-3.425);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("ABGBWIAAgkQgMARgTAJQgSAKgVAAQgXAAgTgMQgUgLgMgTQgLgUAAgYQAAgXALgTQAMgTAUgMQATgLAXgBQAYABATALQATAMAMATQAMATAAAXIAABWgAgig7QgQAJgJAQQgKAPAAATQAAATAKARQAJAPAQAJQAQAKASAAQATAAAQgKQAQgJAJgPQAJgRABgTQgBgTgJgPQgJgQgQgJQgQgKgTAAQgSAAgQAKg");
	this.shape_10.setTransform(-76.05,-7);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("ABeB7Ii+AAIAAj0IARAAIAADjICvAAIAAARg");
	this.shape_11.setTransform(-96.1,-10.65);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#0954D2").s().p("A54A+QgwAAAAgYIAAhjQABAXAvAAMAzxAAAQAvAAABgXIAABjQAAAYgwAAg");
	this.shape_12.setTransform(0,25.2625);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#0984E3").s().p("A54E7QgvAAgBgYIAApEQAAgYAwAAMAzxAAAQAwAAAAAYIAAJEQgBAYgvAAg");
	this.shape_13.setTransform(0,-10.05);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgnBwQgRgJgNgRIAAAkIgQAAIAAjyIAQAAIAABrQANgSARgIQATgKAUAAQAYAAATALQATAMAMATQAMASAAAYQAAAYgMAUQgMAUgTAKQgTAMgYABQgUAAgTgKgAgigXQgQAIgJAPQgKAQAAATQAAAUAKAQQAJAQAQAJQAQAJASABQAUgBAPgJQAQgJAJgQQAJgQABgUQgBgTgJgQQgJgPgQgIQgPgKgUAAQgSAAgQAKg");
	this.shape_14.setTransform(67.15,-6.05);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#0954D2").s().p("A54AnQgwAAAAgYIAAg1QABAXAvAAMAzxAAAQAvAAABgXIAAA1QAAAYgwAAg");
	this.shape_15.setTransform(0,27.525);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAzB5IAAhnQAAgPgGgKQgIgMgLgHQgMgHgOAAQgOAAgLAHQgMAHgHAMQgHAKAAAPIAABnIgQAAIAAjyIAQAAIAABgQAKgMANgGQANgGAPgBQATABAPAJQAQAJAIAQQAKAOAAATIAABng");
	this.shape_16.setTransform(102.8,0.2);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AAzBWIAAgYQgJALgNAGQgOAHgPAAQgSAAgPgJQgPgJgKgPQgIgQgBgTIAAhnIAQAAIAABnQAAAOAHAMQAHAMAMAHQALAHAOAAQAOAAAMgHQALgHAIgMQAGgMAAgOIAAgCIAAhlIARAAIAACrg");
	this.shape_17.setTransform(85.7,3.75);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgnBwQgRgKgNgRIAAAkIgQAAIAAjyIAQAAIAABrQANgQARgKQATgJAUgBQAYABATALQATAMAMAUQAMARAAAZQAAAXgMAUQgMATgTAMQgTALgYAAQgUAAgTgJgAgigYQgQAKgJAPQgKAPAAAUQAAATAKAQQAJAPAQAKQAQAKASgBQAUABAPgKQAQgKAJgPQAJgQABgTQgBgUgJgPQgJgPgQgKQgPgJgUAAQgSAAgQAJg");
	this.shape_18.setTransform(67.15,0.2);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAzBWIAAgYQgJALgNAGQgOAHgPAAQgSAAgPgJQgPgJgKgPQgJgQAAgTIAAhnIAQAAIAABnQAAAOAHAMQAHAMAMAHQALAHAOAAQAOAAAMgHQALgHAIgMQAGgMAAgOIAAgCIAAhlIARAAIAACrg");
	this.shape_19.setTransform(48.25,3.75);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgHB6IAAjjIhYAAIAAgRIC/AAIAAARIhYAAIAADjg");
	this.shape_20.setTransform(37,0.1);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAzBWIAAhnQABgOgIgMQgGgLgMgIQgMgGgOgBQgNABgMAGQgMAIgHALQgHAMAAAOIAABnIgQAAIAAirIAQAAIAAAYQAKgLANgHQAOgGAOAAQASAAAQAKQAPAIAKAQQAJAPAAATIAABng");
	this.shape_21.setTransform(5.4,3.75);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("ABGBWIAAgkQgMARgTAKQgSAJgVAAQgXAAgTgMQgUgLgMgUQgLgTAAgYQAAgXALgTQAMgUAUgLQATgLAXgBQAYABATALQATALAMAUQAMATAAAXIAABWgAgig7QgQAJgJAQQgKAPAAATQAAATAKAQQAJAQAQAKQAQAJASAAQATAAAQgJQAQgKAJgQQAJgQABgTQgBgTgJgPQgJgQgQgJQgQgKgTAAQgSAAgQAKg");
	this.shape_22.setTransform(-13.5,3.75);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgiBPQgPgFgIgLQgKgKAAgNIAAgCIAPAAIAAACQABANAOAIQAPAJAWAAQAXAAAOgJQAOgIAAgNQAAgJgGgHQgHgHgMgEQgLgFgPAAQgSAAgPgHQgQgFgIgLQgKgLAAgNQAAgNAKgKQAIgKAPgHQAQgFASgBQASABAQAFQAPAHAKAKQAIAKABANIAAACIgQAAIAAgCQAAgNgPgJQgNgHgYgBQgXABgOAHQgOAJAAANQAAAJAHAIQAGAGAMAFQAMAEAOAAQASAAAQAGQAPAHAKAKQAIALABANQgBANgIAKQgKALgPAFQgQAHgSAAQgSAAgQgHg");
	this.shape_23.setTransform(-31.7,3.75);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgHB5IAAirIAPAAIAACrgAgHhpIAAgQIAPAAIAAAQg");
	this.shape_24.setTransform(-42.8,0.2);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("ABGBWIAAgkQgMARgTAKQgSAJgVAAQgXAAgTgMQgUgLgMgUQgLgTAAgYQAAgXALgTQAMgUAUgLQATgLAXgBQAYABATALQATALAMAUQAMATAAAXIAABWgAgig7QgQAJgJAQQgKAPAAATQAAATAKAQQAJAQAQAKQAQAJASAAQATAAAQgJQAQgKAJgQQAJgQABgTQgBgTgJgPQgJgQgQgJQgQgKgTAAQgSAAgQAKg");
	this.shape_25.setTransform(-76.05,3.75);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("ABeB6Ii+AAIAAj0IARAAIAADkICvAAIAAAQg");
	this.shape_26.setTransform(-96.1,0.1);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#0984E3").s().p("A54E6QgvAAgBgWIAApGQAAgYAwAAMAzxAAAQAwAAAAAYIAAJGQgBAWgvAAg");
	this.shape_27.setTransform(0,0.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13,p:{y:-10.05}},{t:this.shape_12},{t:this.shape_11,p:{y:-10.65}},{t:this.shape_10,p:{y:-7}},{t:this.shape_9,p:{y:-3.425}},{t:this.shape_8,p:{y:-10.55}},{t:this.shape_7,p:{y:-7}},{t:this.shape_6,p:{y:-7}},{t:this.shape_5,p:{y:-7}},{t:this.shape_4,p:{y:-10.65}},{t:this.shape_3,p:{y:-7}},{t:this.shape_2},{t:this.shape_1,p:{y:-7}},{t:this.shape,p:{y:-10.55}}]}).to({state:[{t:this.shape_13,p:{y:-5.55}},{t:this.shape_15},{t:this.shape_11,p:{y:-6.15}},{t:this.shape_10,p:{y:-2.5}},{t:this.shape_9,p:{y:1.075}},{t:this.shape_8,p:{y:-6.05}},{t:this.shape_7,p:{y:-2.5}},{t:this.shape_6,p:{y:-2.5}},{t:this.shape_5,p:{y:-2.5}},{t:this.shape_4,p:{y:-6.15}},{t:this.shape_3,p:{y:-2.5}},{t:this.shape_14},{t:this.shape_1,p:{y:-2.5}},{t:this.shape,p:{y:-6.05}}]},1).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_9,p:{y:7.325}},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-170.5,-41.5,341,73.7);


(lib.kriteria = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ABGBWIAAgkQgMARgTAJQgSAKgVAAQgXAAgUgMQgTgLgLgUQgMgTAAgYQAAgXAMgTQALgTATgMQAUgMAXAAQAYAAATAMQAUAMALATQAMATAAAXIAABWgAgjg7QgPAJgKAQQgIAQgBASQABATAIAQQAKAQAPAJQAQAKATAAQATAAAQgKQAQgJAJgQQAJgQABgTQgBgSgJgQQgJgQgQgJQgQgJgTAAQgTAAgQAJg");
	this.shape.setTransform(80.7,39.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgHB6IAAisIAPAAIAACsgAgHhpIAAgPIAPAAIAAAPg");
	this.shape_1.setTransform(68.15,36.05);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgTBvQgKgKgBgOIAAjPIAQAAIAADPQAAAHAGAGQAFAFAIABIAHgCIAGgEIACgCIABACIAIAIIACABIgCACQgFAFgGADQgGADgHAAQgOgBgKgKg");
	this.shape_2.setTransform(60.725,36.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("ABGBWIAAgkQgMARgTAJQgSAKgVAAQgXAAgTgMQgUgLgMgUQgKgTgBgYQABgXAKgTQAMgTAUgMQATgMAXAAQAYAAATAMQATAMAMATQAMATAAAXIAABWgAgig7QgQAJgJAQQgKAQAAASQAAATAKAQQAJAQAQAJQAQAKASAAQAUAAAPgKQAQgJAJgQQAJgQABgTQgBgSgJgQQgJgQgQgJQgPgJgUAAQgSAAgQAJg");
	this.shape_3.setTransform(45.55,39.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("ABwBWIAAhnQAAgOgHgMQgHgMgMgGQgMgIgOABQgPgBgLAIQgMAGgHAMQgHAMAAAOIAABnIgPAAIAAhnQAAgOgHgMQgHgMgMgGQgLgIgPABQgOgBgMAIQgMAGgHAMQgHAMAAAOIAABnIgQAAIAAirIAQAAIAAAZQAKgMANgGQAOgHAPAAQATAAAQAKQAQAJAIARQAJgRAQgJQAQgKATAAQATAAAPAKQAPAJAJAPQAKAPAAATIAABng");
	this.shape_4.setTransform(20.975,39.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgHB6IAAisIAPAAIAACsgAgHhpIAAgPIAPAAIAAAPg");
	this.shape_5.setTransform(3.9,36.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAzBWIAAhnQABgOgIgMQgGgMgMgGQgMgIgOABQgNgBgMAIQgMAGgHAMQgHAMAAAOIAABnIgQAAIAAirIAQAAIAAAZQAKgMANgGQAOgHAOAAQASAAAQAKQAPAJAJAPQAKAPAAATIAABng");
	this.shape_6.setTransform(-7.2,39.6);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("ABQB7IAAgCIgahFIhsAAIgZBFIgBACIgRAAIABgDIBYjwIABgCIAPAAIAAACIBZDwIAAADgAAxAkIgxiEIgvCEIBgAAg");
	this.shape_7.setTransform(-27.3,35.95);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("ABwBWIAAhnQAAgOgHgMQgHgMgMgGQgMgIgOABQgPgBgLAIQgMAGgHAMQgHAMAAAOIAABnIgPAAIAAhnQAAgOgHgMQgHgMgMgGQgLgIgPABQgOgBgMAIQgMAGgHAMQgHAMAAAOIAABnIgQAAIAAirIAQAAIAAAZQAKgMANgGQAOgHAPAAQATAAAQAKQAQAJAIARQAJgRAQgJQAQgKATAAQATAAAPAKQAPAJAJAPQAKAPAAATIAABng");
	this.shape_8.setTransform(-65.025,39.6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgqBKQgUgLgMgUQgLgTAAgYQAAgXALgTQAMgTAUgMQATgMAXAAQAYAAATAMQATAMAMATQAMATAAAXQAAASgHAPQgGAQgNAMQgMAMgQAGQgPAHgRAAQgXAAgTgMgAgig7QgQAJgJAQQgKAQAAASQAAATAKAQQAJAQAQAJQAQAKASAAQAOAAAMgFQANgGAKgKQAKgKAGgNQAFgMAAgOQgBgSgJgQQgJgQgQgJQgQgJgTAAQgSAAgQAJg");
	this.shape_9.setTransform(-89.55,39.6);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("ABGB6IAAgkQgNAQgRAKQgTAKgVAAQgXgBgTgMQgUgLgMgTQgLgTAAgZQAAgXALgTQAMgTAUgLQATgMAXgBQAVAAATAKQARAKANAQIAAhqIAQAAIAADygAgjgYQgPAKgJAOQgKAQAAATQAAAUAKAQQAJAQAPAJQARAKASAAQATAAAQgKQAQgJAJgQQAJgQABgUQgBgTgJgQQgJgOgQgKQgQgJgTAAQgSAAgRAJg");
	this.shape_10.setTransform(-109.9,36.05);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgiBwQgPgJgJgPQgJgPgBgTIAAgCIAQAAIAAACQAAAOAHAMQAHAMAMAGQAMAHAOABQAOgBALgHQAMgGAHgMQAHgMAAgOQAAgOgHgMQgHgMgLgHQgHADgGABQgHABgGAAIgMgBQgGgBgGgCQgGgCgFgEQgQgIgIgPQgJgQAAgSQABgTAJgPQAJgPAPgJQAPgJATgBQAKAAALAEQAKADAJAHIAJgNIAAgBIAUAAIgCAEIgPAVQAHAJAEALQAEALAAAMQAAAQgHAOQgHAOgMAJQAMAKAHAOQAHAOAAAQQAAATgJAPQgJAPgQAJQgPAJgSABQgTgBgPgJgAgahhQgMAGgHAMQgHAMAAAOQAAAOAHAMQAHAMAMAHIALAFQAHACAIAAIAFAAIAKgCIAKgEQAMgIAHgMQAHgLAAgPQAAgIgDgIQgCgIgGgHIgIgJQgHgFgIgEQgJgDgIAAQgOABgMAHg");
	this.shape_11.setTransform(-128.175,43.175);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAzBWIAAhnQABgOgIgMQgGgMgMgGQgMgIgOABQgNgBgMAIQgMAGgHAMQgHAMAAAOIAABnIgQAAIAAirIAQAAIAAAZQAKgMANgGQAOgHAOAAQASAAAQAKQAPAJAJAPQAKAPAAATIAABng");
	this.shape_12.setTransform(-145.35,39.6);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgHB6IAAisIAPAAIAACsgAgHhpIAAgPIAPAAIAAAPg");
	this.shape_13.setTransform(-156.45,36.05);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("ABMB7IAAgCIhNhrIhOBrIgBACIgBAAIgOAAIAAj1IAQAAIAADXIBEhdIAIgKIBPhvIAAgBIAUAAIgCAEIhWB2IBWB3IACAEg");
	this.shape_14.setTransform(-170.425,35.95);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgHB5IAAirIAPAAIAACrgAgHhpIAAgQIAPAAIAAAQg");
	this.shape_15.setTransform(81.5,-0.95);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AghBPQgPgFgKgLQgIgKgBgNIAAgCIAQAAIAAACQAAAOAOAHQAOAJAXAAQAXAAAOgJQAOgHAAgOQABgJgHgHQgHgIgLgDQgMgFgPAAQgRAAgQgGQgPgGgKgLQgIgLgBgNQABgNAIgKQAKgLAPgFQAPgHASAAQATAAAPAHQAQAFAIALQAKAKAAANIAAACIgQAAIAAgCQAAgOgOgHQgOgIgYAAQgXAAgNAIQgPAHAAAOQAAAJAHAIQAHAGAMAFQALAEAOAAQATAAAPAGQAPAHAJAKQAKALAAANQAAANgKAKQgIALgQAFQgPAHgTAAQgSAAgPgHg");
	this.shape_16.setTransform(70.4,2.6);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("ABGBWIAAgkQgMARgTAKQgSAJgVAAQgXgBgTgLQgUgLgMgUQgKgTgBgYQABgXAKgTQAMgTAUgMQATgMAXAAQAYAAATAMQATAMAMATQAMATAAAXIAABWgAgig7QgQAJgJAQQgKAPAAATQAAATAKAQQAJAQAQAJQAQAKASAAQAUAAAPgKQAQgJAJgQQAJgQABgTQgBgTgJgPQgJgQgQgJQgPgJgUAAQgSAAgQAJg");
	this.shape_17.setTransform(51.85,2.6);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAxB5IAAgBIgxhHIgyBHIAAABIgSAAIAAjyIAQAAIAADZIArg9IAHgLIAzhJIAAgBIAUAAIgCAEIg6BSIA6BSIACADg");
	this.shape_18.setTransform(36.025,-0.95);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgHB5IAAirIAPAAIAACrgAgHhpIAAgQIAPAAIAAAQg");
	this.shape_19.setTransform(24.85,-0.95);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgYB5IAAiaIgMAAIAAgRIAMAAIAAgkQAAgPALgJQAJgLAOAAQAIAAAGADQAGACAFAGIACABIgCACIgKAJIgBgBIgGgFIgIgBQgIABgEAFQgGAGAAAHIAAAkIALAAIAAARIgLAAIAACag");
	this.shape_20.setTransform(18.575,-0.95);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgHB5IAAirIAPAAIAACrgAgHhpIAAgQIAPAAIAAAQg");
	this.shape_21.setTransform(11.45,-0.95);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AghBPQgQgFgIgLQgKgKAAgNIAAgCIAQAAIAAACQAAAOAOAHQAOAJAXAAQAXAAAOgJQAOgHAAgOQAAgJgGgHQgHgIgMgDQgLgFgPAAQgRAAgQgGQgPgGgJgLQgKgLAAgNQAAgNAKgKQAIgLAQgFQAPgHASAAQATAAAPAHQAPAFAKALQAJAKAAANIAAACIgQAAIAAgCQAAgOgOgHQgOgIgYAAQgXAAgOAIQgOAHAAAOQAAAJAHAIQAHAGALAFQAMAEAOAAQATAAAPAGQAPAHAKAKQAJALAAANQAAANgJAKQgKALgPAFQgPAHgTAAQgSAAgPgHg");
	this.shape_22.setTransform(0.35,2.6);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("ABGBWIAAgkQgNARgSAKQgSAJgVAAQgXgBgUgLQgTgLgMgUQgLgTAAgYQAAgXALgTQAMgTATgMQAUgMAXAAQAYAAATAMQATAMAMATQALATABAXIAABWgAgjg7QgPAJgJAQQgKAPAAATQAAATAKAQQAJAQAPAJQARAKASAAQAUAAAPgKQAQgJAJgQQAKgQAAgTQAAgTgKgPQgJgQgQgJQgPgJgUAAQgSAAgRAJg");
	this.shape_23.setTransform(-18.2,2.6);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgTBvQgKgKgBgOIAAjQIAQAAIAADQQAAAHAGAGQAFAGAIAAIAHgCIAGgEIACgBIABABIAIAIIACABIgCACQgFAFgGADQgGACgHAAQgOAAgKgKg");
	this.shape_24.setTransform(-30.275,-0.95);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("ABMB6IAAgBIhNhrIhOBrIgBABIgBAAIgOAAIAAj0IAQAAIAADXIBEhdIAIgKIBPhvIAAgBIAUAAIgCAEIhWB2IBWB3IACADg");
	this.shape_25.setTransform(-45.675,-1.05);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("ABGBWIAAgkQgMARgTAKQgSAJgVAAQgXgBgUgLQgTgLgLgUQgMgTAAgYQAAgXAMgTQALgTATgMQAUgMAXAAQAYAAATAMQAUAMALATQAMATAAAXIAABWgAgjg7QgPAJgKAQQgIAPgBATQABATAIAQQAKAQAPAJQAQAKATAAQATAAAQgKQAQgJAJgQQAJgQABgTQgBgTgJgPQgJgQgQgJQgQgJgTAAQgTAAgQAJg");
	this.shape_26.setTransform(-79.05,2.6);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgHB5IAAirIAPAAIAACrgAgHhpIAAgQIAPAAIAAAQg");
	this.shape_27.setTransform(-91.6,-0.95);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgrBWIAAirIAQAAIAAAkIAJgKQAMgNAPgGQAQgHARAAIACAAIAAARIgCAAQgPAAgMAEQgNAGgJAKQgKAKgEAMQgGANAAANIAABWg");
	this.shape_28.setTransform(-100.3,2.6);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgqBKQgUgLgMgUQgKgTgBgYQABgXAKgTQAMgTAUgMQATgMAXAAQAYAAATAMQATAMAMATQAMATAAAXIAAACIgFAAIiWAAQABATAJAPQAKAQAPAIQAQAKASAAQAWAAARgMQASgMAJgWIAAgBIACAAIALAEIACACIgBACQgGAQgMANQgMAMgRAHQgPAHgSAAQgXgBgTgLgABEgNQgDgQgKgNQgJgMgPgIQgOgGgRAAQgQAAgOAGQgOAIgLAMQgJANgEAQICIAAIAAAAg");
	this.shape_29.setTransform(-116.45,2.6);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgNBvQgLgKAAgOIAAh5IgMAAIAAgQIAMAAIAAhHIAQAAIAABHIALAAIAAAQIgLAAIAAB5QAAAHAGAGQAEAGAIAAQAEAAAEgCIAGgEIABgBIACABIAIAIIACABIgCACQgFAFgGADQgGACgIAAQgOAAgJgKg");
	this.shape_30.setTransform(-129.125,-0.95);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgHB5IAAirIAPAAIAACrgAgHhpIAAgQIAPAAIAAAQg");
	this.shape_31.setTransform(-137.1,-0.95);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgrBWIAAirIAQAAIAAAkIAJgKQANgNAOgGQAPgHASAAIACAAIAAARIgCAAQgOAAgNAEQgNAGgIAKQgLAKgFAMQgFANAAANIAABWg");
	this.shape_32.setTransform(-145.8,2.6);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("ABMB6IAAgBIhNhrIhOBrIgBABIgBAAIgOAAIAAj0IAQAAIAADXIBEhdIAIgKIBPhvIAAgBIAUAAIgCAEIhWB2IBWB3IACADg");
	this.shape_33.setTransform(-163.375,-1.05);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#3867D6").s().p("A5DH0QguAAAAgmIAAubQAAgmAuAAMAyHAAAQAuAAAAAmIAAObQAAAmguAAg");
	this.shape_34.setTransform(-45.05,19.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.kriteria, new cjs.Rectangle(-210.1,-30,330.1,100), null);


(lib.kotakklasif1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2993CC").s().p("A82E7Qg1AAAAgYIAApFQAAgXA1AAMA5tAAAQA1AAABAXIAAJFQgBAYg1AAg");
	this.shape.setTransform(-20.05,1.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.kotakklasif1, new cjs.Rectangle(-210.1,-30,380.1,62.9), null);


(lib.kotakBawah = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EhD1AgKQiEAAAAhuMAAAg84QAAhtCEAAMCHqAAAQCFAAAABtMAAAA84QAABuiFAAg");
	this.shape.setTransform(8.025,-7.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1B9CFC").s().p("EhHtAimQgoAAAAgiMAAAhEIQAAghAoAAMCPaAAAQApAAAAAhMAAABEIQAAAigpAAg");
	this.shape_1.setTransform(9.95,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.kotakBawah, new cjs.Rectangle(-453,-230.9,926,442.8), null);


(lib.klas4Penunjuk = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E12315").s().p("A82E7Qg2AAABgYIAApFQgBgXA2AAMA5tAAAQA2AAgBAXIAAJFQABAYg2AAg");
	this.shape.setTransform(-29.2,11.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.klas4Penunjuk, new cjs.Rectangle(-219.2,-20,380.1,62.9), null);


(lib.judulReprok = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgHB6IAAirIAPAAIAACrgAgHhoIAAgQIAPAAIAAAQg");
	this.shape.setTransform(107.7,-2.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AghBQQgPgGgKgKQgIgLgBgNIAAgCIAPAAIAAACQABAOAOAIQAPAIAWAAQAXAAAOgIQAPgIAAgOQAAgJgHgHQgHgIgLgEQgMgEgPAAQgRAAgQgGQgQgGgJgLQgIgLgBgNQABgNAIgKQAKgLAPgFQAPgHASAAQATAAAPAHQAQAFAIALQAKAKAAANIAAACIgQAAIAAgCQAAgOgPgHQgNgJgYAAQgWAAgOAJQgOAHgBAOQAAAJAHAHQAHAIAMAEQALAEAOAAQATAAAPAHQAPAFAJALQAKALAAANQAAANgKALQgIAKgQAGQgPAGgTAAQgSAAgPgGg");
	this.shape_1.setTransform(96.6,1.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAxB6IAAgBIgxhHIgyBHIAAABIgSAAIAAjyIAQAAIAADYIArg+IAHgKIAzhIIAAgBIAUAAIgCADIg6BRIA6BTIACAEg");
	this.shape_2.setTransform(81.175,-2.45);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAzBWIAAgYQgJALgNAHQgOAGgPAAQgSAAgPgJQgPgJgKgPQgJgQAAgTIAAhnIAQAAIAABnQAAAOAHANQAHALAMAHQALAHAOAAQAOAAAMgHQALgHAIgLQAGgNAAgOIAAgCIAAhlIARAAIAACrg");
	this.shape_3.setTransform(64,1.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("ABGB6IAAgkQgNARgSAJQgSAKgVAAQgXgBgTgMQgUgKgMgUQgKgUgBgYQABgYAKgSQAMgTAUgMQATgLAXAAQAVAAASAJQASAJANASIAAhrIAQAAIAADygAgigXQgQAIgJAPQgKAQAAATQAAAUAKAQQAJAQAQAJQAQAJASAAQAUAAAPgJQAQgJAJgQQAJgQABgUQgBgTgJgQQgJgPgQgIQgPgKgUAAQgSAAgQAKg");
	this.shape_4.setTransform(45.1,-2.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgqBKQgUgLgMgTQgLgUAAgYQAAgXALgTQAMgTAUgMQATgLAXgBQAYABATALQATAMAMATQALATABAXQAAASgHAPQgGAPgNANQgMAMgPAHQgQAGgRAAQgXAAgTgMgAgjg7QgPAJgJAQQgKAPAAATQAAATAKARQAJAPAPAJQARAKASAAQAOAAAMgFQANgFALgLQAJgKAGgMQAFgNAAgOQgBgTgJgPQgJgQgQgJQgQgKgTAAQgSAAgRAKg");
	this.shape_5.setTransform(25.1,1.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgrBWIAAirIAQAAIAAAkIAJgLQAMgMAPgGQAQgHARAAIACAAIAAAQIgCAAQgPAAgMAGQgNAFgJAKQgKAKgEANQgGAMAAANIAABWg");
	this.shape_6.setTransform(11.75,1.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AhVB6IAAjzIAQAAIAAAkQANgRARgJQATgKAUAAQAYABATALQATAMAMATQAMATAAAYQAAAYgMATQgMATgTALQgTAMgYAAQgUAAgTgJQgRgKgNgRIAABsgAgihfQgQAJgJAQQgKAQAAATQAAAUAKAPQAJAPAQAKQAQAJASAAQAUAAAPgJQAQgKAJgPQAJgPABgUQgBgTgJgQQgJgQgQgJQgPgJgUgBQgSABgQAJg");
	this.shape_7.setTransform(-4.4,4.675);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgqBKQgUgLgMgTQgLgUAAgYQAAgXALgTQAMgTAUgMQATgLAXgBQAYABATALQATAMAMATQAMATAAAXIAAACIgFAAIiWAAQABATAKAQQAJAPAPAIQAQAKASAAQAWAAASgNQARgMAJgVIAAgBIACAAIALAFIACABIgBABQgGARgMAMQgNANgQAHQgPAHgSAAQgXAAgTgMgABEgNQgDgQgKgNQgJgMgPgHQgOgIgRAAQgQAAgOAIQgPAHgKAMQgJANgDAQICHAAIAAAAg");
	this.shape_8.setTransform(-24.75,1.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("ABOB7IgBgBIg0hIQgIABgIABIhaAAIAABHIgQAAIAAgCIAAhFIAAgRIAAiNIAAgPIBqAAQAYAAATAMQAUALAMATQALAUABAYQgBASgGAQQgHAPgMAMQgMAMgRAHIA2BKIADAEgAhRAjIBaAAIAJAAIAMgDQAPgFALgKQALgKAGgNQAGgNAAgQQAAgTgJgRQgKgPgQgKQgQgJgTgBIhaAAg");
	this.shape_9.setTransform(-45.925,-2.55);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("ABwBWIAAhnQAAgPgHgLQgHgMgMgGQgMgIgOAAQgPAAgLAIQgMAGgHAMQgHALAAAPIAABnIgPAAIAAhnQAAgPgHgLQgHgMgMgGQgLgIgPAAQgOAAgMAIQgMAGgHAMQgHALAAAPIAABnIgQAAIAAirIAQAAIAAAZQAKgMANgGQAOgHAPAAQATABAQAJQAQAJAIARQAJgRAQgJQAQgJATgBQATABAPAIQAPAKAJAPQAKAPAAATIAABng");
	this.shape_10.setTransform(-83.675,1.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgrBKQgTgLgMgTQgLgUAAgYQAAgXALgTQAMgTATgMQAUgLAXgBQAYABATALQATAMAMATQALATABAXIAAACIgFAAIiWAAQABATAKAQQAIAPAQAIQAQAKASAAQAWAAASgNQARgMAJgVIAAgBIACAAIALAFIACABIgBABQgGARgMAMQgNANgQAHQgPAHgSAAQgXAAgUgMgABFgNQgEgQgKgNQgKgMgOgHQgOgIgRAAQgQAAgOAIQgOAHgLAMQgJANgDAQICIAAIAAAAg");
	this.shape_11.setTransform(-108.2,1.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgNBvQgLgKAAgOIAAh5IgMAAIAAgPIAMAAIAAhHIAQAAIAABHIALAAIAAAPIgLAAIAAB5QAAAHAGAGQAEAFAIAAQAEAAAEgBIAGgEIABgCIACACIAIAIIACABIgCACQgFAFgGADQgGACgIABQgOgBgJgKg");
	this.shape_12.setTransform(-120.875,-2.45);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AghBQQgPgGgKgKQgJgLAAgNIAAgCIAQAAIAAACQAAAOAOAIQAOAIAXAAQAXAAAOgIQAOgIAAgOQABgJgHgHQgHgIgLgEQgMgEgPAAQgSAAgPgGQgPgGgKgLQgJgLAAgNQAAgNAJgKQAKgLAPgFQAPgHASAAQASAAAQAHQAPAFAJALQAKAKAAANIAAACIgQAAIAAgCQAAgOgOgHQgOgJgYAAQgXAAgOAJQgOAHAAAOQAAAJAHAHQAHAIAMAEQALAEAOAAQASAAAQAHQAPAFAJALQAKALAAANQAAANgKALQgJAKgPAGQgQAGgSAAQgSAAgPgGg");
	this.shape_13.setTransform(-134,1.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgHB6IAAirIAPAAIAACrgAgHhoIAAgQIAPAAIAAAQg");
	this.shape_14.setTransform(-145.1,-2.45);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgwByQgVgJgNgPQgNgOAAgSIAAgCIAQAAIAAACQAAALAFAIQAGAJALAHQAMAGAOAEQAPADAQAAQARAAAOgDQAPgEALgGQALgHAHgJQAFgIABgLQAAgOgMgLQgKgMgSgGQgSgHgXAAQgSAAgRgFQgSgEgOgJQgNgKgIgMQgHgMAAgNQAAgTANgOQANgOAVgIQAWgJAaAAQAbAAAWAJQAVAIAOAOQAMAOAAATIAAACIgPAAIAAgCQgBgLgFgIQgHgJgLgHQgLgHgPgDQgOgEgRAAQgQAAgPAEQgOADgMAHQgLAHgGAJQgFAIAAALQAAAOALAMQAKAKASAHQASAHAWAAQATAAASAFQARAEAOAJQAOAKAHAMQAIAMgBANQAAASgMAOQgOAPgVAJQgWAJgbAAQgaAAgWgJg");
	this.shape_15.setTransform(-158.75,-2.55);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#3498DB").s().p("A5KE6QgvABAAgYIAApFQAAgYAvABMAyVAAAQAvgBAAAYIAAJFQAAAYgvgBg");
	this.shape_16.setTransform(-24.375,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.judulReprok, new cjs.Rectangle(-190.2,-31.4,331.7,62.9), null);


(lib.gambarLapisan = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3867D6").s().p("A82E7Qg1AAAAgYIAApFQAAgXA1AAMA5tAAAQA1AAABAXIAAJFQgBAYg1AAg");
	this.shape.setTransform(-20.05,1.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.gambarLapisan, new cjs.Rectangle(-210.1,-30,380.1,62.9), null);


(lib.Path = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#606163").s().p("Ap/z/QEEAADvBlQDkBhCxCyQCxCwBiDmQBkDtAAEEQAAEEhkDuQhiDmixCxQixCxjkBhQjvBkkEAAg");
	this.shape.setTransform(64,127.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,128,255.9), null);


(lib.btnReprAsek = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgbCYQgOgNAAgVIAAkcIAWAAIAAEcQAAALAHAIQAIAHAKABQAFAAAFgCQAFgCAEgEIACgCIACACIALAMIACACIgCACQgHAGgIAEQgJAEgKAAQgTgBgOgOg");
	this.shape.setTransform(97.325,-10.875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("ABgB2IAAgxQgRAXgZANQgZANgdAAQgggBgagPQgbgQgQgbQgPgagBghQABggAPgaQAQgbAbgQQAagQAgAAQAhAAAaAQQAbAQAQAbQAPAaABAgIAAB2gAgvhSQgWANgNAWQgMAVgBAaQABAbAMAVQANAWAWANQAVAMAaABQAbgBAVgMQAWgNANgWQAMgVABgbQgBgagMgVQgNgWgWgNQgVgNgbAAQgaAAgVANg");
	this.shape_1.setTransform(76.525,-5.975);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("ABHB2IAAghQgNAPgTAJQgSAJgVAAQgZAAgVgNQgVgMgMgVQgMgWgBgZIAAiOIAWAAIAACOQAAATAKARQAJAQARAJQAQAJASABQAUgBAQgJQAQgJAKgQQAJgRAAgTIAAgDIAAiLIAWAAIAADrg");
	this.shape_2.setTransform(51.15,-5.975);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AguBtQgVgIgMgOQgMgOgBgSIAAgDIAVAAIAAADQABASATALQAUALAfABQAggBAUgLQASgLABgSQAAgNgJgKQgJgJgQgGQgQgGgVAAQgZAAgUgJQgWgIgMgPQgMgPgBgSQABgSAMgOQAMgOAVgIQAVgJAZAAQAaAAAVAJQAVAIANAOQAMAOAAASIAAADIgVAAIAAgDQAAgSgUgMQgTgLghAAQgfAAgTALQgUAMAAASQAAANAKAKQAJAJAQAGQAQAGATAAQAZAAAVAJQAWAIANAPQAMAPAAASQAAASgMAOQgNAOgVAIQgVAJgaAAQgZAAgVgJg");
	this.shape_3.setTransform(27.75,-5.975);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("ABECnIgBgBIhEhiIhDBiIgBABIgYAAIAAlNIAVAAIAAEqIA8hVIAJgOIBGhkIABgBIAbAAIgDAFIhQBwIBQBxIADAFg");
	this.shape_4.setTransform(6.65,-10.875);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("Ag6BmQgbgQgQgbQgPgagBghQABggAPgaQAQgbAbgQQAagQAgAAQAhAAAaAQQAbAQAQAbQAPAaABAgIAAADIgGAAIjPAAQABAaANAVQANAVAVAMQAWAMAZABQAegBAYgQQAZgRALgcIABgDIACABIAQAGIACABIgBADQgIAXgRAQQgRASgWAJQgVAKgZAAQgggBgagPgABegSQgFgXgNgRQgOgRgTgKQgUgKgXAAQgWAAgUAKQgTAKgOARQgNARgFAXIC7AAIAAAAg");
	this.shape_5.setTransform(-18.875,-5.975);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AguBtQgVgIgMgOQgMgOgBgSIAAgDIAVAAIAAADQABASATALQAUALAfABQAggBAUgLQASgLABgSQAAgNgJgKQgJgJgQgGQgQgGgVAAQgZAAgUgJQgWgIgMgPQgMgPgBgSQABgSAMgOQAMgOAVgIQAVgJAZAAQAaAAAVAJQAVAIANAOQAMAOAAASIAAADIgVAAIAAgDQAAgSgUgMQgTgLghAAQgfAAgTALQgUAMAAASQAAANAJAKQAKAJAQAGQAQAGATAAQAZAAAVAJQAWAIANAPQAMAPAAASQAAASgMAOQgNAOgVAIQgVAJgaAAQgZAAgVgJg");
	this.shape_6.setTransform(-43.8,-5.975);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("ABuCoIgBgCIgihgIiVAAIgiBgIgBACIgYAAIACgDIB5lKIAAgCIAVAAIAAACIB5FKIACADgABCAxIhCi1IhBC1ICDAAg");
	this.shape_7.setTransform(-68.925,-11);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#992315").s().p("A54A+QgwAAAAgYIAAhjQABAXAvAAMAzxAAAQAvAAABgXIAABjQAAAYgwAAg");
	this.shape_8.setTransform(0,25.2625);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#E12315").s().p("A54E7QgvAAgBgYIAApEQAAgYAwAAMAzxAAAQAwAAAAAYIAAJEQgBAYgvAAg");
	this.shape_9.setTransform(0,-10.05);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#992315").s().p("A54AnQgwAAAAgYIAAg1QABAXAvAAMAzxAAAQAvAAABgXIAAA1QAAAYgwAAg");
	this.shape_10.setTransform(0,27.575);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#E12315").s().p("A54E7QgvAAgBgYIAApEQAAgZAwAAMAzxAAAQAwAAAAAZIAAJEQgBAYgvAAg");
	this.shape_11.setTransform(0,-5.45);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#992315").s().p("A54AQQgwAAAAgXIAAgIQABAWAvAAMAzxAAAQAvAAABgWIAAAIQAAAXgwAAg");
	this.shape_12.setTransform(0,29.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7,p:{y:-11}},{t:this.shape_6,p:{y:-5.975}},{t:this.shape_5,p:{y:-5.975}},{t:this.shape_4,p:{y:-10.875}},{t:this.shape_3,p:{y:-5.975}},{t:this.shape_2,p:{y:-5.975}},{t:this.shape_1,p:{y:-5.975}},{t:this.shape,p:{y:-10.875}}]}).to({state:[{t:this.shape_11,p:{y:-5.45}},{t:this.shape_10},{t:this.shape_7,p:{y:-6.4}},{t:this.shape_6,p:{y:-1.375}},{t:this.shape_5,p:{y:-1.375}},{t:this.shape_4,p:{y:-6.275}},{t:this.shape_3,p:{y:-1.375}},{t:this.shape_2,p:{y:-1.375}},{t:this.shape_1,p:{y:-1.375}},{t:this.shape,p:{y:-6.275}}]},1).to({state:[{t:this.shape_11,p:{y:-0.85}},{t:this.shape_12},{t:this.shape_7,p:{y:-1.8}},{t:this.shape_6,p:{y:3.225}},{t:this.shape_5,p:{y:3.225}},{t:this.shape_4,p:{y:-1.675}},{t:this.shape_3,p:{y:3.225}},{t:this.shape_2,p:{y:3.225}},{t:this.shape_1,p:{y:3.225}},{t:this.shape,p:{y:-1.675}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-170.5,-41.5,341,73);


(lib.btnRepr = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgbCYQgOgNAAgVIAAkcIAWAAIAAEcQAAALAHAIQAIAHAKABQAFAAAFgCQAFgCAEgEIACgCIACACIALAMIACACIgCACQgHAGgIAEQgJAEgKAAQgTgBgOgOg");
	this.shape.setTransform(76.075,-10.875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("ABgB2IAAgxQgRAXgZANQgZANgdAAQgggBgagPQgbgQgQgbQgPgagBghQABggAPgaQAQgbAbgQQAagQAgAAQAhAAAaAQQAbAQAQAbQAPAaABAgIAAB2gAgvhSQgWANgNAWQgMAVgBAaQABAbAMAVQANAWAWANQAVAMAaABQAbgBAVgMQAWgNANgWQAMgVABgbQgBgagMgVQgNgWgWgNQgVgNgbAAQgaAAgVANg");
	this.shape_1.setTransform(55.275,-5.975);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("ABHB2IAAghQgNAPgTAJQgSAJgVAAQgZAAgVgNQgVgMgMgVQgNgWAAgZIAAiOIAWAAIAACOQAAATAKARQAJAQARAJQAQAJASABQAUgBAQgJQAQgJAKgQQAJgRAAgTIAAgDIAAiLIAWAAIAADrg");
	this.shape_2.setTransform(29.9,-5.975);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AguBtQgVgIgMgOQgNgOAAgSIAAgDIAVAAIAAADQABASAUALQATALAfABQAggBATgLQAUgLAAgSQAAgNgJgKQgKgJgPgGQgQgGgVAAQgZAAgUgJQgWgIgMgPQgNgPAAgSQAAgSANgOQAMgOAVgIQAVgJAZAAQAaAAAVAJQAVAIANAOQAMAOAAASIAAADIgVAAIAAgDQgBgSgTgMQgTgLghAAQgfAAgTALQgUAMAAASQAAANAKAKQAIAJARAGQAQAGATAAQAZAAAWAJQAUAIAOAPQAMAPAAASQAAASgMAOQgNAOgVAIQgVAJgaAAQgZAAgVgJg");
	this.shape_3.setTransform(6.5,-5.975);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("ABECnIgBgBIhEhiIhDBiIgBABIgYAAIAAlNIAVAAIAAEqIA8hVIAKgOIBFhkIABgBIAbAAIgEAFIhPBwIBPBxIAEAFg");
	this.shape_4.setTransform(-14.6,-10.875);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("Ag6BmQgbgQgQgbQgPgagBghQABggAPgaQAQgbAbgQQAagQAgAAQAhAAAaAQQAbAQAQAbQAPAaABAgIAAADIgGAAIjPAAQABAaANAVQANAVAVAMQAWAMAZABQAegBAYgQQAZgRALgcIABgDIACABIAQAGIACABIgBADQgIAXgRAQQgRASgWAJQgVAKgZAAQgggBgagPgABegSQgFgXgNgRQgOgRgTgKQgUgKgXAAQgWAAgUAKQgTAKgOARQgNARgFAXIC7AAIAAAAg");
	this.shape_5.setTransform(-40.125,-5.975);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AhBCcQgegMgSgUQgSgUAAgYIAAgDIAVAAIAAADQABAOAIAMQAIAMAQAJQAPAKAUAEQAUAFAWAAQAXAAAUgFQAUgEAPgKQAQgJAJgMQAHgMABgOQgBgUgOgPQgPgQgZgIQgZgKgfAAQgaAAgXgHQgYgGgTgMQgTgOgKgRQgKgQAAgSQAAgYASgVQASgTAegMQAdgLAkgBQAlABAeALQAdAMASATQASAVAAAYIAAADIgVAAIAAgDQgBgOgHgMQgJgMgQgKQgPgIgUgFQgUgFgXAAQgWAAgUAFQgUAFgPAIQgQAKgIAMQgIAMgBAOQABATAPAQQAOAPAZAJQAYAKAfAAQAbAAAXAHQAYAGAUANQASANAKAQQAKARAAASQAAAYgSAUQgSAUgdAMQgeAMglAAQgkAAgdgMg");
	this.shape_6.setTransform(-69.05,-11);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#992315").s().p("A54A+QgwAAAAgYIAAhjQABAXAvAAMAzxAAAQAvAAABgXIAABjQAAAYgwAAg");
	this.shape_7.setTransform(0,25.2625);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#E12315").s().p("A54E7QgvAAgBgYIAApEQAAgYAwAAMAzxAAAQAwAAAAAYIAAJEQgBAYgvAAg");
	this.shape_8.setTransform(0,-10.05);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AhBCcQgegMgSgUQgSgTAAgZIAAgDIAVAAIAAADQABAOAIAMQAIAMAQAJQAPAJAUAFQAUAEAWABQAXgBAUgEQAUgFAPgJQAQgJAJgMQAHgMABgOQgBgUgOgPQgPgQgZgIQgZgKgfAAQgaAAgXgHQgYgGgTgMQgTgOgKgRQgKgQAAgSQAAgZASgTQASgUAegMQAdgMAkAAQAlAAAeAMQAdAMASAUQASATAAAZIAAADIgVAAIAAgDQgBgOgHgMQgJgMgQgKQgPgIgUgFQgUgFgXAAQgWAAgUAFQgUAFgPAIQgQAKgIAMQgIAMgBAOQABATAPAQQAOAPAZAJQAYAKAfAAQAbAAAXAHQAYAGAUANQASANAKAQQAKARAAASQAAAZgSATQgSAUgdAMQgeAMglAAQgkAAgdgMg");
	this.shape_9.setTransform(-69.05,-6.4);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#992315").s().p("A54AnQgwAAAAgYIAAg1QABAXAvAAMAzxAAAQAvAAABgXIAAA1QAAAYgwAAg");
	this.shape_10.setTransform(0,27.575);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#E12315").s().p("A54E7QgvAAgBgYIAApEQAAgZAwAAMAzxAAAQAwAAAAAZIAAJEQgBAYgvAAg");
	this.shape_11.setTransform(0,-5.45);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AhBCcQgegMgSgUQgSgTAAgZIAAgDIAVAAIAAADQABAOAIAMQAIAMAQAJQAPAJAUAFQAUAEAWABQAXgBAUgEQAUgFAPgJQAQgJAJgMQAHgMABgOQgBgUgOgPQgPgQgZgIQgZgKgfAAQgaAAgXgHQgYgGgTgMQgTgOgKgRQgKgQAAgSQAAgZASgTQASgUAegMQAdgMAkAAQAlAAAeAMQAdAMASAUQASATAAAZIAAADIgVAAIAAgDQgBgOgHgMQgJgMgQgKQgPgIgUgFQgUgFgXAAQgWAAgUAFQgUAFgPAIQgQAKgIAMQgIAMgBAOQABAUAPAPQAOAQAZAIQAYAKAfAAQAbAAAXAHQAYAGAUANQASANAKARQAKAQAAASQAAAZgSATQgSAUgdAMQgeAMglAAQgkAAgdgMg");
	this.shape_12.setTransform(-69.05,-1.8);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#992315").s().p("A54AQQgwAAAAgXIAAgIQABAWAvAAMAzxAAAQAvAAABgWIAAAIQAAAXgwAAg");
	this.shape_13.setTransform(0,29.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5,p:{y:-5.975}},{t:this.shape_4,p:{y:-10.875}},{t:this.shape_3,p:{y:-5.975}},{t:this.shape_2,p:{y:-5.975}},{t:this.shape_1,p:{y:-5.975}},{t:this.shape,p:{y:-10.875}}]}).to({state:[{t:this.shape_11,p:{y:-5.45}},{t:this.shape_10},{t:this.shape_9},{t:this.shape_5,p:{y:-1.375}},{t:this.shape_4,p:{y:-6.275}},{t:this.shape_3,p:{y:-1.375}},{t:this.shape_2,p:{y:-1.375}},{t:this.shape_1,p:{y:-1.375}},{t:this.shape,p:{y:-6.275}}]},1).to({state:[{t:this.shape_11,p:{y:-0.85}},{t:this.shape_13},{t:this.shape_12},{t:this.shape_5,p:{y:3.225}},{t:this.shape_4,p:{y:-1.675}},{t:this.shape_3,p:{y:3.225}},{t:this.shape_2,p:{y:3.225}},{t:this.shape_1,p:{y:3.225}},{t:this.shape,p:{y:-1.675}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-170.5,-41.5,341,73);


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


(lib.aseksual = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_154 = function() {
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(154).call(this.frame_154).wait(37));

	// Layer_1
	this.instance = new lib.DAseksual_();
	this.instance.setTransform(-207,-153,0.6138,0.6652);

	this.instance_1 = new lib.AAseksual_();
	this.instance_1.setTransform(-207,-153,0.6138,0.6652);

	this.instance_2 = new lib.BAseksual_();
	this.instance_2.setTransform(-207,-153,0.6138,0.6652);

	this.instance_3 = new lib.CAseksual_();
	this.instance_3.setTransform(-207,-153,0.6138,0.6652);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},35).to({state:[{t:this.instance_2}]},41).to({state:[{t:this.instance_3}]},37).to({state:[{t:this.instance_3}]},41).wait(37));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-207,-153,418,300);


(lib.asekBtn = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._2();
	this.instance.setTransform(0,0,1.0031,1.0031);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.asekBtn, new cjs.Rectangle(0,0,375.7,248.8), null);


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


(lib.popUpSek = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		var _this = this;
		
		_this.stop();
	}
	this.frame_12 = function() {
		var _this = this;
		
		
		
		_this.sek.gotoAndPlay(0);
		
		
		_this.cobaBG.on('click', function(){
		
		_this.play();
		});
		
		_this.exit.on('click', function(){
		
		_this.play();
		});
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(12).call(this.frame_12).wait(13));

	// Layer_5
	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);
	this.exit._off = true;

	this.timeline.addTween(cjs.Tween.get(this.exit).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_6
	this.sek = new lib.seksual1();
	this.sek.name = "sek";
	this.sek.setTransform(-158.25,-7.65,0.8557,0.8557,0,0,0,-0.1,-0.2);
	this.sek._off = true;

	this.timeline.addTween(cjs.Tween.get(this.sek).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_4
	this.instance = new lib.Tween3("synched",0);
	this.instance.setTransform(39.05,-45.1);
	this.instance.alpha = 0;

	this.instance_1 = new lib.Tween4("synched",0);
	this.instance_1.setTransform(39.05,-45.1);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,alpha:1},12).to({_off:false,alpha:0},12).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},12).to({_off:true,alpha:0},12).wait(1));

	// Layer_3
	this.cobaBG = new lib.Tween10();
	this.cobaBG.name = "cobaBG";
	this.cobaBG.setTransform(43.75,-42.75,1.1855,0.9051,0,0,0,0.2,-0.1);
	this.cobaBG.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.cobaBG).to({alpha:0.75},12).to({alpha:0},12).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-436.6,-314.2,960.2,543.1);


(lib.popUpAsek = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		var _this = this;
		
		_this.stop();
	}
	this.frame_12 = function() {
		var _this = this;
		
		
		_this.asek.gotoAndPlay(0);
		
		
		_this.cobaBG.on('click', function(){
		
		_this.play();
		});
		
		_this.exit.on('click', function(){
		
		_this.play();
		});
		
		_this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(12).call(this.frame_12).wait(13));

	// Layer_5
	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);
	this.exit._off = true;

	this.timeline.addTween(cjs.Tween.get(this.exit).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_8
	this.asek = new lib.aseksual();
	this.asek.name = "asek";
	this.asek.setTransform(-169.3,-20.8,0.9068,0.8557);
	this.asek._off = true;

	this.timeline.addTween(cjs.Tween.get(this.asek).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_7
	this.instance = new lib.Tween5("synched",0);
	this.instance.setTransform(47.7,-45.1);
	this.instance.alpha = 0;

	this.instance_1 = new lib.Tween6("synched",0);
	this.instance_1.setTransform(47.7,-45.1);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,alpha:1},12).to({_off:false,alpha:0},12).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},12).to({_off:true,alpha:0},12).wait(1));

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
(lib.materi4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{dasar1:0,dasar2:1,dasar3:2,dasar4:3,dasar5:4,dasar6:5});

	this.actionFrames = [0,1,2,3,4,5];
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
		
		_this.gotoAndStop('dasar2');
		});
	}
	this.frame_1 = function() {
		var _this = this
		
		_this.setup = function(){
			document.body.style.backgroundColor = lib.properties.color;
		}
		
		_this.setup();
		
		
		_this.stop();
		
		
		_this.btnMenuDasar2.on('click', function(){
		
		window.location.replace('../menu/index.html');
		});
		
		_this.btnBackDasar2.on('click', function(){
		
		_this.gotoAndStop('dasar1');
		});
		
		_this.lapisan.on('click', function(){
		
		_this.gotoAndStop('dasar3');
		});
		
		_this.simetri.on('click', function(){
		
		_this.gotoAndStop('dasar4');
		});
		
		_this.rongga.on('click', function(){
		
		_this.gotoAndStop('dasar5');
		});
		
		_this.reprod.on('click', function(){
		
		_this.gotoAndStop('dasar6');
		});
	}
	this.frame_2 = function() {
		var _this = this
		
		_this.setup = function(){
			document.body.style.backgroundColor = lib.properties.color;
		}
		
		_this.setup();
		
		
		_this.stop();
		
		_this.btnMenu3.on('click', function(){
		
		window.location.replace('../menu/index.html');
		});
		
		_this.btnBack3.on('click', function(){
		
		_this.gotoAndStop('dasar2');
		});
	}
	this.frame_3 = function() {
		var _this = this
		
		_this.setup = function(){
			document.body.style.backgroundColor = lib.properties.color;
		}
		
		_this.setup();
		
		
		_this.stop();
		
		_this.btnMenu3.on('click', function(){
		
		window.location.replace('../menu/index.html');
		});
		
		_this.btnBack3.on('click', function(){
		
		_this.gotoAndStop('dasar2');
		});
	}
	this.frame_4 = function() {
		var _this = this
		
		_this.setup = function(){
			document.body.style.backgroundColor = lib.properties.color;
		}
		
		_this.setup();
		
		
		_this.stop();
		
		_this.btnMenu3.on('click', function(){
		
		window.location.replace('../menu/index.html');
		});
		
		_this.btnBack3.on('click', function(){
		
		_this.gotoAndStop('dasar2');
		});
	}
	this.frame_5 = function() {
		var _this = this
		
		_this.setup = function(){
			document.body.style.backgroundColor = lib.properties.color;
		}
		
		_this.setup();
		
		
		_this.stop();
		
		
		_this.btnMenu3.on('click', function(){
		
		window.location.replace('../menu/index.html');
		});
		
		_this.sekBtn.on('click', function(){
		
		_this.popUpSek.play();
		});
		
		_this.btnReprSek.on('click', function(){
		
		_this.popUpSek.play();
		});
		
		_this.Asekbtn.on('click', function(){
		
		_this.popUpASek.play();
		});
		
		_this.asekBtn.on('click', function(){
		
		_this.popUpASek.play();
		});
		
		_this.btnBack3.on('click', function(){
		
		_this.gotoAndStop('dasar2');
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1).call(this.frame_3).wait(1).call(this.frame_4).wait(1).call(this.frame_5).wait(1));

	// Layer_4
	this.popUpASek = new lib.popUpAsek();
	this.popUpASek.name = "popUpASek";
	this.popUpASek.setTransform(438.35,313.5);
	this.popUpASek._off = true;

	this.timeline.addTween(cjs.Tween.get(this.popUpASek).wait(5).to({_off:false},0).wait(1));

	// Layer_3
	this.popUpSek = new lib.popUpSek();
	this.popUpSek.name = "popUpSek";
	this.popUpSek.setTransform(438.35,313.5);
	this.popUpSek._off = true;

	this.timeline.addTween(cjs.Tween.get(this.popUpSek).wait(5).to({_off:false},0).wait(1));

	// base
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2F3542").s().p("AAcBBIAAhTQAAgOgGgHQgGgGgNAAQgKAAgIAFQgIAGgEAJIAABaIgWAAIAAh+IAVAAIAAAQQAPgTAWABQApgBAAAuIAABTg");
	this.shape.setTransform(779.625,429.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_1.setTransform(766.475,429.275);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2F3542").s().p("AAcBBIAAhTQAAgOgGgHQgGgGgNAAQgKAAgIAFQgIAGgEAJIAABaIgWAAIAAh+IAVAAIAAAQQAPgTAWABQApgBAAAuIAABTg");
	this.shape_2.setTransform(753.325,429.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_3.setTransform(740.175,429.275);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2F3542").s().p("AAbBaIgrg7IgOAPIAAAsIgWAAIAAizIAWAAIAABsIAMgOIAmgpIAaAAIgvA0IA2BKg");
	this.shape_4.setTransform(728.4,426.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_5.setTransform(714.975,429.275);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2F3542").s().p("ABDBBIAAhTQAAgOgGgHQgGgGgPAAQgMAAgIAHQgIAHgBANIAABTIgVAAIAAhSQAAgcgbAAQgVAAgIASIAABcIgWAAIAAh+IAVAAIAAAOQAOgQAYAAQAaAAAJAUQAGgJAKgGQALgGANABQAqgBABAtIAABUg");
	this.shape_6.setTransform(697.925,429.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2F3542").s().p("AgKBXIAAh+IAVAAIAAB+gAgIhAQgEgEAAgFQAAgFAEgEQADgEAFABQAGgBAEAEQADAEAAAFQAAAFgDAEQgEAEgGAAQgFAAgDgEg");
	this.shape_7.setTransform(678.575,426.95);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2F3542").s().p("AgdBBIAAh+IAVAAIAAAPQAJgSAUABQAGAAADABIAAAUIgKgBQgVABgHASIAABZg");
	this.shape_8.setTransform(672.25,429.15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_9.setTransform(661.025,429.275);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2F3542").s().p("AglAwQgPgRAAgeIAAgDQAAgSAGgPQAHgOANgIQANgIAQAAQAVAAAOANQAOANABAUIgUAAQgBgMgIgIQgJgIgMAAQgQAAgJAMQgJAMAAAWIAAADQAAAWAJAMQAJAMAQAAQAMAAAIgHQAJgHABgLIAUAAQAAALgHAKQgHAKgLAGQgMAGgNAAQgZAAgPgSg");
	this.shape_10.setTransform(648.375,429.275);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2F3542").s().p("AAcBBIAAhTQAAgOgGgHQgGgGgNAAQgKAAgIAFQgIAGgEAJIAABaIgWAAIAAh+IAVAAIAAAQQAPgTAWABQApgBAAAuIAABTg");
	this.shape_11.setTransform(635.325,429.15);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2F3542").s().p("AglAxQgQgRAAgdIAAgDQAAgSAHgPQAIgPANgIQAMgJAPAAQAYAAAOAQQAOARAAAeIAAAIIhVAAQAAATALALQAKAMAPAAQAMAAAIgFQAIgEAGgIIANAKQgQAZggAAQgZAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgJgNAAQgNAAgIAKg");
	this.shape_12.setTransform(622.525,429.275);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2F3542").s().p("ABDBBIAAhTQAAgOgGgHQgGgGgPAAQgMAAgIAHQgIAHgBANIAABTIgVAAIAAhSQAAgcgbAAQgVAAgIASIAABcIgWAAIAAh+IAVAAIAAAOQAOgQAYAAQAaAAAJAUQAGgJAKgGQALgGANABQAqgBABAtIAABUg");
	this.shape_13.setTransform(605.525,429.15);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2F3542").s().p("AAcBBIAAhTQAAgOgGgHQgGgGgNAAQgKAAgIAFQgIAGgEAJIAABaIgWAAIAAh+IAVAAIAAAQQAPgTAWABQApgBAAAuIAABTg");
	this.shape_14.setTransform(582.425,429.15);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_15.setTransform(569.275,429.275);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2F3542").s().p("AgmBJQgPgSAAgdIAAgCQAAgcAPgSQANgRAWAAQAWAAANAPIAAhCIAVAAIAACzIgUAAIgBgOQgMAQgXAAQgWAAgNgSgAgWgJQgIAMAAAYQAAAVAIANQAJAMAPAAQAVAAAJgTIAAg5QgKgSgUAAQgPAAgJAMg");
	this.shape_16.setTransform(555.65,426.725);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2F3542").s().p("AglAxQgQgRAAgdIAAgDQAAgSAHgPQAIgPANgIQAMgJAPAAQAYAAAOAQQAOARAAAeIAAAIIhVAAQAAATALALQAKAMAPAAQAMAAAIgFQAIgEAGgIIANAKQgQAZggAAQgZAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgJgNAAQgNAAgIAKg");
	this.shape_17.setTransform(537.075,429.275);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2F3542").s().p("AgHBAIguh+IAWAAIAfBgIAghgIAWAAIguB+g");
	this.shape_18.setTransform(524.75,429.25);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2F3542").s().p("AgKBXIAAh+IAVAAIAAB+gAgIhAQgEgEAAgFQAAgFAEgEQADgEAFABQAGgBAEAEQADAEAAAFQAAAFgDAEQgEAEgGAAQgFAAgDgEg");
	this.shape_19.setTransform(516.075,426.95);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2F3542").s().p("AgHBAIguh+IAWAAIAfBgIAghgIAWAAIguB+g");
	this.shape_20.setTransform(507.3,429.25);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2F3542").s().p("AgdBBIAAh+IAVAAIAAAPQAJgSAUABQAGAAADABIAAAUIgKgBQgVABgHASIAABZg");
	this.shape_21.setTransform(498.1,429.15);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2F3542").s().p("AgnA1QgKgMAAgXIAAhSIAWAAIAABRQAAAdAXAAQAYAAAIgSIAAhcIAWAAIAAB+IgVAAIAAgMQgNAPgXAAQgVAAgLgMg");
	this.shape_22.setTransform(486.75,429.375);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2F3542").s().p("AgZA8QgLgFgHgKQgGgKgBgLIAXAAQAAALAIAHQAIAGAMAAQANAAAHgFQAIgFgBgIQAAgJgGgFQgHgFgPgDQgRgEgJgEQgKgFgFgHQgEgGAAgKQAAgPANgLQANgLAUAAQAVAAAOALQANALAAASIgWAAQAAgJgHgHQgHgGgMAAQgLAAgHAFQgGAFgBAJQAAAHAHAEQAGAEAQAEQAQAEAJAFQALAEAEAHQAFAHABAKQAAARgOAKQgOALgWAAQgOAAgMgGg");
	this.shape_23.setTransform(473.9,429.275);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2F3542").s().p("AAbBaIgrg7IgOAPIAAAsIgWAAIAAizIAWAAIAABsIAMgOIAngpIAZAAIgwA0IA2BKg");
	this.shape_24.setTransform(456.55,426.6);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2F3542").s().p("AgnA1QgKgMAAgXIAAhSIAWAAIAABRQAAAdAXAAQAYAAAIgSIAAhcIAWAAIAAB+IgVAAIAAgMQgNAPgXAAQgVAAgLgMg");
	this.shape_25.setTransform(443,429.375);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2F3542").s().p("AgDBHQgIgJAAgQIAAhNIgWAAIAAgRIAWAAIAAgfIAWAAIAAAfIAXAAIAAARIgXAAIAABNQAAAIACAEQAEADAHAAIAKgBIAAASQgIACgIAAQgPAAgGgJg");
	this.shape_26.setTransform(432.1,427.85);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2F3542").s().p("AAcBBIAAhTQAAgOgGgHQgGgGgNAAQgKAAgIAFQgIAGgEAJIAABaIgWAAIAAh+IAVAAIAAAQQAPgTAWABQApgBAAAuIAABTg");
	this.shape_27.setTransform(421.925,429.15);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2F3542").s().p("AgmA1QgLgMAAgXIAAhSIAWAAIAABRQgBAdAYAAQAYAAAIgSIAAhcIAWAAIAAB+IgVAAIgBgMQgMAPgYAAQgUAAgKgMg");
	this.shape_28.setTransform(408.65,429.375);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2F3542").s().p("AAbBaIgrg7IgOAPIAAAsIgWAAIAAizIAWAAIAABsIAMgOIAngpIAZAAIgvA0IA1BKg");
	this.shape_29.setTransform(390.85,426.6);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_30.setTransform(377.425,429.275);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2F3542").s().p("AgeBBIAAh+IAWAAIAAAPQAJgSAUABQAGAAADABIAAAUIgKgBQgUABgIASIAABZg");
	this.shape_31.setTransform(367.5,429.15);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2F3542").s().p("AglAxQgQgRAAgdIAAgDQAAgSAHgPQAIgPANgIQAMgJAPAAQAYAAAOAQQAOARAAAeIAAAIIhVAAQAAATALALQAKAMAPAAQAMAAAIgFQAIgEAGgIIANAKQgQAZggAAQgZAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgJgNAAQgNAAgIAKg");
	this.shape_32.setTransform(356.625,429.275);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2F3542").s().p("AgaBUQgOgHgGgKIALgMQAOARAUAAQAPAAAJgJQAJgJgBgQIAAgLQgMAPgWAAQgWAAgOgSQgNgSAAgeQAAgeANgRQAOgRAWAAQAWAAANAQIACgOIAUAAIAAB7QAAAYgPAOQgPAPgYAAQgNgBgNgFgAgWg6QgJAMAAAYQAAAWAJAMQAIAMAQgBQAUAAAJgSIAAg5QgJgSgUAAQgPAAgJAMg");
	this.shape_33.setTransform(343.2,431.65);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2F3542").s().p("AgeBBIAAh+IAWAAIAAAPQAJgSAUABQAGAAADABIAAAUIgKgBQgUABgIASIAABZg");
	this.shape_34.setTransform(333.3,429.15);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2F3542").s().p("AglAxQgQgRAAgdIAAgDQAAgSAHgPQAIgPANgIQAMgJAPAAQAYAAAOAQQAOARAAAeIAAAIIhVAAQAAATALALQAKAMAPAAQAMAAAIgFQAIgEAGgIIANAKQgQAZggAAQgZAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgJgNAAQgNAAgIAKg");
	this.shape_35.setTransform(322.425,429.275);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2F3542").s().p("AggBKIgBAPIgUAAIAAizIAWAAIAABDQANgQAWAAQAXAAANARQAOASAAAdIAAACQAAAdgOASQgNARgXAAQgXAAgNgRgAgfgBIAAA2QAKAUAVAAQAOAAAJgMQAJgMAAgZQAAgWgJgLQgIgMgPAAQgWAAgJAUg");
	this.shape_36.setTransform(309.525,426.725);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2F3542").s().p("AgDBHQgIgJAAgQIAAhNIgWAAIAAgRIAWAAIAAgfIAWAAIAAAfIAXAAIAAARIgXAAIAABNQAAAIACAEQADADAIAAIALgBIAAASQgJACgIAAQgPAAgGgJg");
	this.shape_37.setTransform(292.25,427.85);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_38.setTransform(282.175,429.275);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2F3542").s().p("Ag0BZIAAivIATAAIABAPQAOgRAWAAQAXAAANARQAOASAAAeIAAACQAAAcgOASQgNARgXABQgWgBgNgPIAAA+gAgfg1IAAA9QAKAQAUABQAOgBAJgMQAKgMAAgYQAAgVgKgMQgIgMgQgBQgTABgKAQg");
	this.shape_39.setTransform(269.2,431.6);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_40.setTransform(255.675,429.275);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2F3542").s().p("AgmBJQgOgSgBgdIAAgCQABgcAOgSQAOgRAWAAQAVAAANAPIAAhCIAWAAIAACzIgUAAIgBgOQgOAQgVAAQgWAAgOgSgAgWgJQgJAMAAAYQAAAVAJANQAJAMAPAAQAUAAAKgTIAAg5QgKgSgUAAQgPAAgJAMg");
	this.shape_41.setTransform(242.05,426.725);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_42.setTransform(223.125,429.275);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2F3542").s().p("AglBZIgIgCIAAgRIAFAAQALAAAGgEQAHgEADgMIAGgOIguh8IAYAAIAfBeIAdheIAXAAIgzCSQgKAfgbAAg");
	this.shape_43.setTransform(210.9,431.8);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2F3542").s().p("AAcBBIAAhTQAAgOgGgHQgGgGgNAAQgKAAgIAFQgIAGgEAJIAABaIgWAAIAAh+IAVAAIAAAQQAPgTAWABQApgBAAAuIAABTg");
	this.shape_44.setTransform(198.625,429.15);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2F3542").s().p("ABDBBIAAhTQAAgOgGgHQgGgGgPAAQgMAAgIAHQgIAHgBANIAABTIgVAAIAAhSQAAgcgbAAQgVAAgIASIAABcIgWAAIAAh+IAVAAIAAAOQAOgQAYAAQAaAAAJAUQAGgJAKgGQALgGANABQAqgBABAtIAABUg");
	this.shape_45.setTransform(181.475,429.15);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2F3542").s().p("AgmA1QgLgMAAgXIAAhSIAWAAIAABRQgBAdAYAAQAYAAAIgSIAAhcIAWAAIAAB+IgVAAIgBgMQgMAPgYAAQgUAAgKgMg");
	this.shape_46.setTransform(164.3,429.375);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2F3542").s().p("ABDBBIAAhTQAAgOgGgHQgGgGgPAAQgMAAgIAHQgIAHgBANIAABTIgVAAIAAhSQAAgcgbAAQgVAAgIASIAABcIgWAAIAAh+IAVAAIAAAOQAOgQAYAAQAaAAAJAUQAGgJAKgGQALgGANABQAqgBABAtIAABUg");
	this.shape_47.setTransform(147.175,429.15);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2F3542").s().p("AgsBHQgRgPAAgbIAAhyIAWAAIAAByQAAASALALQAKAKASAAQATAAAKgKQAKgLAAgSIAAhyIAXAAIAAByQAAAYgPAQQgQAPgZACIgGABQgbAAgRgQg");
	this.shape_48.setTransform(128.925,427.2);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2F3542").s().p("AgJAJQgEgDABgGQgBgFAEgDQADgEAGAAQAHAAADAEQAEADAAAFQAAAGgEADQgDAEgHAAQgGAAgDgEg");
	this.shape_49.setTransform(100.05,434.45);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2F3542").s().p("AgjBVIBGiYIhcAAIAAgRIBzAAIAAAMIhGCdg");
	this.shape_50.setTransform(90.175,427.075);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2F3542").s().p("AgeBvQASgOALgdQAKgdAAgkIAAgDQAAgYgFgVQgEgWgJgQQgJgRgMgKIAFgNQAPAJANAUQAOAUAHAYQAHAYAAAbQAAAagHAYQgHAYgOAUQgNAUgPAJg");
	this.shape_51.setTransform(730.55,388.925);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2F3542").s().p("AgKBaIAAizIAVAAIAACzg");
	this.shape_52.setTransform(724.125,386.8);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_53.setTransform(714.675,389.475);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2F3542").s().p("AgmA1QgLgMAAgXIAAhSIAWAAIAABRQgBAdAYAAQAYAAAIgSIAAhcIAWAAIAAB+IgVAAIgBgMQgMAPgYAAQgUAAgKgMg");
	this.shape_54.setTransform(701.5,389.575);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2F3542").s().p("AgZA8QgLgFgHgKQgGgKAAgLIAVAAQABALAIAHQAIAGAMAAQANAAAIgFQAGgFAAgIQABgJgHgFQgGgFgQgDQgRgEgJgEQgKgFgEgHQgFgGAAgKQAAgPANgLQANgLAUAAQAVAAAOALQANALAAASIgWAAQAAgJgHgHQgIgGgLAAQgLAAgHAFQgGAFgBAJQAAAHAHAEQAGAEAQAEQAQAEAKAFQAJAEAFAHQAGAHAAAKQAAARgOAKQgOALgWAAQgOAAgMgGg");
	this.shape_55.setTransform(688.65,389.475);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2F3542").s().p("AAbBaIgrg6IgOANIAAAtIgVAAIAAizIAVAAIAABsIAMgOIAngpIAaAAIgxA0IA2BKg");
	this.shape_56.setTransform(677.25,386.8);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2F3542").s().p("AglAxQgQgRAAgdIAAgDQAAgSAHgPQAIgPANgIQAMgJAPAAQAYAAAOAQQAOARAAAeIAAAIIhVAAQAAATALALQAKAMAPAAQAMAAAIgFQAIgEAGgIIANAKQgQAZggAAQgZAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgJgNAAQgNAAgIAKg");
	this.shape_57.setTransform(664.175,389.475);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2F3542").s().p("AgZA8QgLgFgHgKQgHgKAAgLIAXAAQAAALAIAHQAIAGAMAAQANAAAHgFQAIgFgBgIQAAgJgGgFQgHgFgPgDQgQgEgKgEQgKgFgFgHQgEgGAAgKQAAgPANgLQAOgLATAAQAVAAAOALQANALAAASIgVAAQgBgJgHgHQgIgGgLAAQgLAAgGAFQgIAFAAAJQABAHAGAEQAGAEAPAEQARAEAJAFQALAEAFAHQAEAHAAAKQAAARgNAKQgOALgWAAQgNAAgNgGg");
	this.shape_58.setTransform(651.45,389.475);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_59.setTransform(638.775,389.475);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2F3542").s().p("AgCBfQgcgoAAg3QAAgaAHgYQAHgZAPgUQANgUAOgIIAFAPQgRANgLAbQgKAbgBAhIAAAJQAAAtAQAhQAKAUANAMIgFANQgPgJgNgUg");
	this.shape_60.setTransform(628.7,388.925);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2F3542").s().p("AAcBBIAAhUQAAgNgGgHQgGgGgNAAQgKAAgIAFQgIAGgEAJIAABaIgWAAIAAh+IAVAAIAAAPQAPgSAWAAQApAAAAAtIAABUg");
	this.shape_61.setTransform(611.475,389.35);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2F3542").s().p("AgKBXIAAh+IAVAAIAAB+gAgIhAQgEgDAAgGQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAGgDADQgEAEgGgBQgFABgDgEg");
	this.shape_62.setTransform(601.975,387.15);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2F3542").s().p("AAeBAIgehgIgdBgIgSAAIglh+IAWAAIAZBdIAdhdIARAAIAeBfIAYhfIAWAAIglB+g");
	this.shape_63.setTransform(589.975,389.45);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_64.setTransform(574.475,389.475);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2F3542").s().p("AAbBaIgrg6IgOANIAAAtIgVAAIAAizIAVAAIAABsIAMgOIAmgpIAbAAIgxA0IA3BKg");
	this.shape_65.setTransform(562.7,386.8);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2F3542").s().p("AAbBaIgrg6IgOANIAAAtIgVAAIAAizIAVAAIAABsIAMgOIAngpIAaAAIgxA0IA2BKg");
	this.shape_66.setTransform(544.6,386.8);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_67.setTransform(531.175,389.475);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2F3542").s().p("AgDBHQgHgJAAgQIAAhNIgYAAIAAgRIAYAAIAAgfIAUAAIAAAfIAYAAIAAARIgYAAIAABNQAAAIAEAEQACADAJAAIAJgBIAAASQgIACgIAAQgOAAgHgJg");
	this.shape_68.setTransform(520.35,388.05);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_69.setTransform(504.325,389.475);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2F3542").s().p("AgeBBIAAh+IAWAAIAAAOQAJgRAUAAQAGAAADACIAAAUIgKAAQgUgBgIATIAABZg");
	this.shape_70.setTransform(494.4,389.35);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_71.setTransform(483.175,389.475);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2F3542").s().p("AglAwQgPgRAAgeIAAgDQAAgSAGgPQAHgOANgIQANgIAQAAQAVAAAOANQAOANABAUIgUAAQgBgMgIgIQgJgIgMAAQgQAAgJAMQgJAMAAAWIAAADQAAAWAJAMQAJAMAQAAQAMAAAIgHQAJgHABgLIAUAAQAAALgHAKQgHAKgLAGQgMAGgNAAQgZAAgPgSg");
	this.shape_72.setTransform(470.525,389.475);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#2F3542").s().p("AglAxQgQgRAAgdIAAgDQAAgSAHgPQAIgPANgIQAMgJAPAAQAYAAAOAQQAOARAAAeIAAAIIhVAAQAAATALALQAKAMAPAAQAMAAAIgFQAIgEAGgIIANAKQgQAZggAAQgZAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgJgNAAQgNAAgIAKg");
	this.shape_73.setTransform(457.925,389.475);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#2F3542").s().p("AgZA8QgLgFgHgKQgGgKAAgLIAWAAQAAALAIAHQAIAGAMAAQANAAAIgFQAGgFAAgIQABgJgHgFQgGgFgQgDQgRgEgJgEQgKgFgEgHQgFgGAAgKQAAgPANgLQANgLAUAAQAVAAAOALQANALAAASIgWAAQAAgJgHgHQgIgGgLAAQgLAAgHAFQgGAFgBAJQAAAHAHAEQAGAEAQAEQAQAEAKAFQAJAEAFAHQAGAHAAAKQAAARgOAKQgOALgWAAQgOAAgMgGg");
	this.shape_74.setTransform(445.2,389.475);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#2F3542").s().p("AAcBBIAAhUQAAgNgGgHQgGgGgNAAQgKAAgIAFQgIAGgEAJIAABaIgWAAIAAh+IAVAAIAAAPQAPgSAWAAQApAAAAAtIAABUg");
	this.shape_75.setTransform(426.475,389.35);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_76.setTransform(413.325,389.475);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#2F3542").s().p("AAbBaIgrg6IgOANIAAAtIgWAAIAAizIAWAAIAABsIAMgOIAmgpIAaAAIgvA0IA1BKg");
	this.shape_77.setTransform(401.55,386.8);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#2F3542").s().p("AgnA1QgKgMAAgXIAAhSIAVAAIAABRQAAAdAYAAQAYAAAIgSIAAhcIAWAAIAAB+IgVAAIAAgMQgNAPgXAAQgVAAgLgMg");
	this.shape_78.setTransform(388,389.575);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#2F3542").s().p("AAbBaIgrg6IgOANIAAAtIgWAAIAAizIAWAAIAABsIAMgOIAmgpIAaAAIgvA0IA2BKg");
	this.shape_79.setTransform(376.15,386.8);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_80.setTransform(362.725,389.475);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#2F3542").s().p("AgKBaIAAizIAVAAIAACzg");
	this.shape_81.setTransform(353.325,386.8);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#2F3542").s().p("AgKBXIAAh+IAVAAIAAB+gAgIhAQgEgDAAgGQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAGgDADQgEAEgGgBQgFABgDgEg");
	this.shape_82.setTransform(347.525,387.15);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#2F3542").s().p("AgnBJQgNgSAAgdIAAgCQAAgcANgSQAOgRAWAAQAWAAANAPIAAhCIAVAAIAACzIgUAAIgBgOQgMAQgXAAQgWAAgOgSgAgWgJQgIAMAAAYQAAAVAIANQAJAMAPAAQAVAAAJgTIAAg5QgKgSgUAAQgPAAgJAMg");
	this.shape_83.setTransform(337.5,386.925);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#2F3542").s().p("AgbBUQgNgGgHgKIAMgOQAOASAUgBQAPABAJgJQAIgJAAgQIAAgLQgNAPgVAAQgWAAgOgSQgNgSAAgeQAAgeANgRQANgRAXgBQAXABAMAQIABgOIAUAAIAAB6QAAAZgOAOQgPAOgYAAQgNAAgOgFgAgWg6QgJAMAAAZQAAAVAJAMQAIAMAQgBQAUABAJgTIAAg5QgKgSgTAAQgPAAgJAMg");
	this.shape_84.setTransform(318.15,391.85);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#2F3542").s().p("AAcBBIAAhUQAAgNgGgHQgGgGgNAAQgKAAgIAFQgIAGgEAJIAABaIgWAAIAAh+IAVAAIAAAPQAPgSAWAAQApAAAAAtIAABUg");
	this.shape_85.setTransform(305.025,389.35);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_86.setTransform(291.875,389.475);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#2F3542").s().p("AgmBZIgHgBIAAgSIAFAAQALAAAGgEQAHgFADgLIAGgOIguh8IAYAAIAfBeIAdheIAXAAIgzCRQgKAggaAAg");
	this.shape_87.setTransform(279.65,392);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_88.setTransform(261.525,389.475);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#2F3542").s().p("AgmBJQgOgSAAgdIAAgCQAAgcAOgSQAOgRAWAAQAVAAANAPIAAhCIAWAAIAACzIgUAAIgBgOQgOAQgVAAQgWAAgOgSgAgWgJQgJAMAAAYQAAAVAJANQAJAMAPAAQAUAAAKgTIAAg5QgKgSgUAAQgPAAgJAMg");
	this.shape_89.setTransform(247.9,386.925);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_90.setTransform(234.925,389.475);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_91.setTransform(215.925,389.475);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#2F3542").s().p("Ag0BZIAAivIATAAIACAPQANgRAWAAQAXAAAOARQAMARAAAfIAAACQAAAcgMASQgOASgXAAQgWAAgNgPIAAA9gAgfg0IAAA8QAKARAUAAQAOAAAJgNQAKgMAAgYQAAgVgKgNQgJgMgPABQgTAAgKARg");
	this.shape_92.setTransform(202.95,391.8);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_93.setTransform(189.425,389.475);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#2F3542").s().p("AgdBBIAAh+IAVAAIAAAOQAJgRAUAAQAGAAADACIAAAUIgKAAQgVgBgHATIAABZg");
	this.shape_94.setTransform(179.5,389.35);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#2F3542").s().p("AglAxQgQgRAAgdIAAgDQAAgSAHgPQAIgPANgIQAMgJAPAAQAYAAAOAQQAOARAAAeIAAAIIhVAAQAAATALALQAKAMAPAAQAMAAAIgFQAIgEAGgIIANAKQgQAZggAAQgZAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgJgNAAQgNAAgIAKg");
	this.shape_95.setTransform(168.625,389.475);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#2F3542").s().p("AggBKIgBAPIgUAAIAAizIAWAAIAABDQANgQAWAAQAXAAANARQAOASAAAdIAAACQAAAdgOASQgNARgXAAQgXAAgNgRgAgfgBIAAA2QAKAUAVAAQAOAAAJgMQAJgMAAgZQAAgWgJgLQgIgMgPAAQgWAAgJAUg");
	this.shape_96.setTransform(155.725,386.925);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#2F3542").s().p("AglAxQgQgRAAgdIAAgDQAAgSAHgPQAIgPANgIQAMgJAPAAQAYAAAOAQQAOARAAAeIAAAIIhVAAQAAATALALQAKAMAPAAQAMAAAIgFQAIgEAGgIIANAKQgQAZggAAQgZAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgJgNAAQgNAAgIAKg");
	this.shape_97.setTransform(142.525,389.475);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#2F3542").s().p("Ag5BVIAAipIA3AAQAcAAANALQAPAMAAAWQgBAMgGAJQgHAJgMAFQAOAEAIAKQAIALAAAPQAAAXgPANQgPANgbAAgAgiBDIAkAAQAPAAAKgIQAIgIABgPQAAgfgiAAIgkAAgAgigMIAiAAQANAAAJgHQAJgHAAgNQAAgOgJgHQgHgGgRAAIggAAg");
	this.shape_98.setTransform(128.9,387.275);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#2F3542").s().p("AgJAJQgEgEABgFQgBgEAEgEQADgEAGAAQAHAAADAEQAEAEAAAEQAAAFgEAEQgDAEgHAAQgGAAgDgEg");
	this.shape_99.setTransform(100.05,394.65);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#2F3542").s().p("AgmBDQgPgSAAgeIAAgIQAAgvAUgYQAUgZAngBIAEAAIAAASIgEAAQgaABgNAOQgPAPgDAbQANgQAXAAQAWAAAOAQQANAOAAAZQAAAbgOAQQgPAQgYAAQgYAAgPgUgAgSgCQgJAGgEAJIAAAIQAAAWAJAMQAKAOANAAQAOAAAJgMQAIgKAAgSQAAgRgIgLQgIgKgOAAQgLAAgJAHg");
	this.shape_100.setTransform(90.45,387.4);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#2F3542").s().p("AgeBvQASgOALgdQAKgdAAgkIAAgDQAAgYgFgVQgEgWgJgQQgKgRgLgKIAEgNQAQAJANAUQAOAUAHAYQAHAYAAAbQAAAagHAYQgHAYgOAUQgNAUgQAJg");
	this.shape_101.setTransform(706.55,349.125);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#2F3542").s().p("AgKBaIAAizIAVAAIAACzg");
	this.shape_102.setTransform(700.125,347);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_103.setTransform(690.675,349.675);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#2F3542").s().p("AgmA1QgLgMAAgXIAAhSIAVAAIAABRQAAAdAYAAQAYAAAIgSIAAhcIAWAAIAAB+IgVAAIgBgMQgMAPgYAAQgTAAgLgMg");
	this.shape_104.setTransform(677.5,349.775);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#2F3542").s().p("AgYA8QgMgFgGgKQgIgKABgLIAVAAQABALAIAHQAIAGANAAQAMAAAIgFQAGgFABgIQAAgJgHgFQgGgFgQgDQgQgEgKgEQgKgFgEgHQgFgGAAgKQAAgPANgLQAOgLATAAQAWAAANALQANALAAASIgVAAQAAgJgIgHQgHgGgMAAQgLAAgGAFQgIAFABAJQAAAHAGAEQAGAEAPAEQAQAEALAFQAKAEAFAHQAEAHAAAKQAAARgNAKQgOALgVAAQgOAAgMgGg");
	this.shape_105.setTransform(664.65,349.675);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#2F3542").s().p("AAbBaIgrg6IgOANIAAAtIgWAAIAAizIAWAAIAABsIAMgOIAmgpIAaAAIgvA0IA2BKg");
	this.shape_106.setTransform(653.25,347);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#2F3542").s().p("AglAxQgQgRAAgdIAAgDQAAgSAHgPQAIgPANgIQAMgJAPAAQAYAAAOAQQAOARAAAeIAAAIIhVAAQAAATALALQAKAMAPAAQAMAAAIgFQAIgEAGgIIANAKQgQAZggAAQgZAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgJgNAAQgNAAgIAKg");
	this.shape_107.setTransform(640.175,349.675);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#2F3542").s().p("AgZA8QgLgFgHgKQgGgKAAgLIAVAAQABALAIAHQAIAGAMAAQANAAAIgFQAGgFAAgIQABgJgHgFQgGgFgQgDQgRgEgJgEQgKgFgEgHQgFgGAAgKQAAgPANgLQANgLAUAAQAVAAAOALQANALAAASIgWAAQAAgJgHgHQgIgGgLAAQgLAAgHAFQgGAFgBAJQAAAHAHAEQAGAEAQAEQAQAEAKAFQAJAEAFAHQAGAHAAAKQAAARgOAKQgOALgWAAQgOAAgMgGg");
	this.shape_108.setTransform(627.45,349.675);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#2F3542").s().p("AgDBfQgbgoAAg3QAAgaAHgYQAIgZANgUQANgUAPgIIAFAPQgRANgLAbQgKAbgBAhIAAAJQAAAtAPAhQAKAUAOAMIgFANQgPgJgOgUg");
	this.shape_109.setTransform(617.75,349.125);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#2F3542").s().p("AAcBBIAAhUQAAgNgGgGQgGgHgNAAQgKAAgIAGQgIAFgEAJIAABaIgWAAIAAh/IAVAAIAAAQQAPgRAWgBQApABAAAsIAABUg");
	this.shape_110.setTransform(600.525,349.55);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#2F3542").s().p("AgKBXIAAh/IAVAAIAAB/gAgIhAQgEgDAAgGQAAgFAEgEQADgEAFAAQAGAAAEAEQADAEAAAFQAAAGgDADQgEADgGAAQgFAAgDgDg");
	this.shape_111.setTransform(591.025,347.35);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#2F3542").s().p("AAeBAIgehfIgdBfIgSAAIglh/IAWAAIAZBeIAdheIARAAIAeBgIAYhgIAWAAIglB/g");
	this.shape_112.setTransform(579.025,349.65);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_113.setTransform(563.525,349.675);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#2F3542").s().p("AAbBaIgrg6IgOANIAAAtIgWAAIAAizIAWAAIAABsIAMgOIAmgpIAaAAIgvA0IA2BKg");
	this.shape_114.setTransform(551.75,347);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_115.setTransform(532.375,349.675);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#2F3542").s().p("AgeBBIAAh/IAVAAIABAPQAKgQATgBQAHABADABIAAAUIgLAAQgUgBgIATIAABZg");
	this.shape_116.setTransform(522.45,349.55);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_117.setTransform(511.225,349.675);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#2F3542").s().p("AglAwQgPgRAAgeIAAgDQAAgSAGgPQAHgOANgIQANgIAQAAQAVAAAOANQAOANABAUIgUAAQgBgMgIgIQgJgIgMAAQgQAAgJAMQgJAMAAAWIAAADQAAAWAJAMQAJAMAQAAQAMAAAIgHQAJgHABgLIAUAAQAAALgHAKQgHAKgLAGQgMAGgNAAQgZAAgPgSg");
	this.shape_118.setTransform(498.575,349.675);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#2F3542").s().p("AglAxQgQgRAAgdIAAgDQAAgSAHgPQAIgPANgIQAMgJAPAAQAYAAAOAQQAOARAAAeIAAAIIhVAAQAAATALALQAKAMAPAAQAMAAAIgFQAIgEAGgIIANAKQgQAZggAAQgZAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgJgNAAQgNAAgIAKg");
	this.shape_119.setTransform(485.975,349.675);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#2F3542").s().p("AgZA8QgLgFgHgKQgHgKAAgLIAXAAQAAALAIAHQAIAGAMAAQANAAAHgFQAIgFAAgIQgBgJgGgFQgHgFgPgDQgQgEgKgEQgKgFgFgHQgEgGAAgKQAAgPANgLQAOgLATAAQAVAAAOALQANALAAASIgVAAQgBgJgHgHQgIgGgLAAQgLAAgGAFQgIAFAAAJQABAHAGAEQAGAEAPAEQARAEAJAFQALAEAFAHQAEAHAAAKQAAARgNAKQgOALgWAAQgNAAgNgGg");
	this.shape_120.setTransform(473.25,349.675);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#2F3542").s().p("AAcBBIAAhUQAAgNgGgGQgGgHgNAAQgKAAgIAGQgIAFgEAJIAABaIgWAAIAAh/IAVAAIAAAQQAPgRAWgBQApABAAAsIAABUg");
	this.shape_121.setTransform(454.525,349.55);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_122.setTransform(441.375,349.675);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#2F3542").s().p("AAbBaIgrg6IgOANIAAAtIgVAAIAAizIAVAAIAABsIAMgOIAmgpIAaAAIgvA0IA2BKg");
	this.shape_123.setTransform(429.6,347);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#2F3542").s().p("AgmA1QgLgMAAgXIAAhSIAVAAIAABRQAAAdAYAAQAYAAAIgSIAAhcIAWAAIAAB+IgVAAIgBgMQgMAPgYAAQgTAAgLgMg");
	this.shape_124.setTransform(416.05,349.775);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#2F3542").s().p("AAbBaIgrg6IgOANIAAAtIgVAAIAAizIAVAAIAABsIAMgOIAngpIAaAAIgxA0IA2BKg");
	this.shape_125.setTransform(404.2,347);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_126.setTransform(390.775,349.675);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#2F3542").s().p("AgKBaIAAizIAVAAIAACzg");
	this.shape_127.setTransform(381.375,347);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#2F3542").s().p("AgKBXIAAh/IAVAAIAAB/gAgIhAQgEgDAAgGQAAgFAEgEQADgEAFAAQAGAAAEAEQADAEAAAFQAAAGgDADQgEADgGAAQgFAAgDgDg");
	this.shape_128.setTransform(375.575,347.35);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#2F3542").s().p("AgmBJQgOgSgBgdIAAgCQABgcAOgSQANgRAXAAQAVAAANAPIAAhCIAVAAIAACzIgTAAIgBgOQgOAQgVAAQgXAAgNgSgAgWgJQgJAMABAYQgBAVAJANQAJAMAPAAQAVAAAJgTIAAg5QgKgSgUAAQgPAAgJAMg");
	this.shape_129.setTransform(365.55,347.125);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_130.setTransform(346.625,349.675);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#2F3542").s().p("AglBZIgIgBIAAgSIAFAAQALAAAGgEQAGgFAFgMIAEgMIgth9IAYAAIAeBeIAeheIAXAAIgzCRQgLAggaAAg");
	this.shape_131.setTransform(334.4,352.2);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#2F3542").s().p("AAcBBIAAhUQAAgNgGgGQgGgHgNAAQgKAAgIAGQgIAFgEAJIAABaIgWAAIAAh/IAVAAIAAAQQAPgRAWgBQApABAAAsIAABUg");
	this.shape_132.setTransform(322.125,349.55);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#2F3542").s().p("ABDBBIAAhTQAAgOgGgGQgGgHgPAAQgMAAgIAHQgIAHgBAMIAABUIgVAAIAAhTQAAgbgbAAQgVAAgIASIAABcIgWAAIAAh/IAVAAIAAAPQAOgRAYAAQAaAAAJAVQAGgJAKgGQALgFANgBQAqABABArIAABVg");
	this.shape_133.setTransform(304.975,349.55);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#2F3542").s().p("AgmA1QgLgMAAgXIAAhSIAVAAIAABRQAAAdAYAAQAYAAAIgSIAAhcIAWAAIAAB+IgVAAIgBgMQgMAPgYAAQgTAAgLgMg");
	this.shape_134.setTransform(287.8,349.775);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#2F3542").s().p("ABDBBIAAhTQAAgOgGgGQgGgHgPAAQgMAAgIAHQgIAHgBAMIAABUIgVAAIAAhTQAAgbgbAAQgVAAgIASIAABcIgWAAIAAh/IAVAAIAAAPQAOgRAYAAQAaAAAJAVQAGgJAKgGQALgFANgBQAqABABArIAABVg");
	this.shape_135.setTransform(270.675,349.55);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#2F3542").s().p("AgmA1QgLgMAAgXIAAhSIAVAAIAABRQAAAdAYAAQAYAAAIgSIAAhcIAWAAIAAB+IgVAAIgBgMQgMAPgYAAQgTAAgLgMg");
	this.shape_136.setTransform(253.5,349.775);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#2F3542").s().p("AgKBXIAAh/IAVAAIAAB/gAgIhAQgEgDAAgGQAAgFAEgEQADgEAFAAQAGAAAEAEQADAEAAAFQAAAGgDADQgEADgGAAQgFAAgDgDg");
	this.shape_137.setTransform(238.075,347.35);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#2F3542").s().p("AgZA8QgLgFgGgKQgIgKAAgLIAXAAQAAALAIAHQAIAGANAAQAMAAAHgFQAIgFAAgIQgBgJgGgFQgHgFgPgDQgQgEgKgEQgKgFgFgHQgEgGAAgKQAAgPANgLQAOgLATAAQAVAAAOALQANALAAASIgVAAQgBgJgHgHQgIgGgLAAQgLAAgGAFQgIAFAAAJQABAHAGAEQAGAEAPAEQARAEAJAFQALAEAFAHQAEAHAAAKQAAARgNAKQgOALgVAAQgOAAgNgGg");
	this.shape_138.setTransform(228.9,349.675);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#2F3542").s().p("AAbBaIgrg6IgOANIAAAtIgWAAIAAizIAWAAIAABsIAMgOIAmgpIAaAAIgvA0IA2BKg");
	this.shape_139.setTransform(217.5,347);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#2F3542").s().p("AgnA1QgKgMAAgXIAAhSIAVAAIAABRQAAAdAYAAQAYAAAIgSIAAhcIAWAAIAAB+IgVAAIAAgMQgNAPgXAAQgVAAgLgMg");
	this.shape_140.setTransform(203.95,349.775);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#2F3542").s().p("AgmBJQgPgSAAgdIAAgCQAAgcAPgSQANgRAWAAQAWAAANAPIAAhCIAVAAIAACzIgUAAIAAgOQgNAQgXAAQgWAAgNgSgAgWgJQgIAMAAAYQAAAVAIANQAJAMAPAAQAVAAAJgTIAAg5QgKgSgUAAQgPAAgJAMg");
	this.shape_141.setTransform(190.25,347.125);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#2F3542").s().p("AgpAwQgQgSAAgeIAAAAQAAgTAIgPQAHgPANgIQANgIAQAAQAaAAAQASQAQASAAAdIAAABQAAATgHAPQgHAOgNAIQgOAJgRAAQgZAAgQgSgAgZgiQgKAMAAAXQAAAVAKANQAKANAPAAQARAAAJgNQAKgNAAgWQAAgVgKgNQgKgNgQAAQgPAAgKANg");
	this.shape_142.setTransform(176.925,349.675);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#2F3542").s().p("AgeBBIAAh/IAWAAIAAAPQAJgQAUgBQAGABADABIAAAUIgKAAQgUgBgIATIAABZg");
	this.shape_143.setTransform(166.7,349.55);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#2F3542").s().p("Ag0BZIAAivIATAAIABAPQANgRAXAAQAXAAANARQANARABAfIAAACQgBAcgNARQgNATgXgBQgVAAgOgOIAAA9gAgfg0IAAA7QAKASAUgBQAPAAAIgLQAKgNAAgXQAAgWgKgNQgIgMgPABQgUgBgKASg");
	this.shape_144.setTransform(155.55,352);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#2F3542").s().p("AglAxQgQgRAAgdIAAgDQAAgSAHgPQAIgPANgIQAMgJAPAAQAYAAAOAQQAOARAAAeIAAAIIhVAAQAAATALALQAKAMAPAAQAMAAAIgFQAIgEAGgIIANAKQgQAZggAAQgZAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgJgNAAQgNAAgIAKg");
	this.shape_145.setTransform(142.375,349.675);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#2F3542").s().p("AAmBVIglhFIgnAAIAABFIgXAAIAAipIA4AAQAcAAAQANQAQANAAAZQAAAQgJAMQgIALgQAFIAoBJIAAABgAgmgBIAiAAQAQAAAKgJQAKgJAAgOQAAgQgKgIQgJgJgRAAIgiAAg");
	this.shape_146.setTransform(129.25,347.475);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#2F3542").s().p("AgJAJQgEgDABgGQgBgFAEgDQADgEAGAAQAHAAADAEQAEADAAAFQAAAGgEADQgDAEgHAAQgGAAgDgEg");
	this.shape_147.setTransform(100.05,354.85);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#2F3542").s().p("AgkBKQgPgNgCgWIAVAAQACAPAIAIQAJAGANAAQAPAAAIgKQAJgKAAgSQAAgRgJgKQgKgKgOAAQgOAAgJAGIgFAEIgSgDIAJhWIBWAAIAAAUIhEAAIgFAvQANgIAPABQAXAAAOAPQAOAOAAAaQAAAbgPAPQgOAPgZAAQgWAAgOgMg");
	this.shape_148.setTransform(90.675,347.6);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#2F3542").s().p("AgKBaIAAizIAVAAIAACzg");
	this.shape_149.setTransform(428.275,307.2);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#2F3542").s().p("AgKBWIAAh+IAVAAIAAB+gAgIhAQgEgEAAgFQAAgFAEgEQADgDAFgBQAGABAEADQADAEAAAFQAAAFgDAEQgEADgGABQgFgBgDgDg");
	this.shape_150.setTransform(422.475,307.55);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#2F3542").s().p("AgRBbIAAhtIgUAAIAAgRIAUAAIAAgNQAAgUALgLQAKgLAUAAQAHAAAHACIgBARIgLgBQgLAAgGAGQgFAGAAAMIAAANIAbAAIAAARIgbAAIAABtg");
	this.shape_151.setTransform(415.725,307.075);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#2F3542").s().p("AgpAwQgQgSAAgeIAAAAQAAgTAIgPQAHgPANgIQANgIAQAAQAaAAAQASQAQASAAAdIAAABQAAATgHAPQgHAOgNAIQgOAJgRAAQgZAAgQgSgAgZgiQgKAMAAAXQAAAVAKANQAKANAPAAQARAAAJgNQAKgNAAgWQAAgVgKgNQgKgNgQAAQgPAAgKANg");
	this.shape_152.setTransform(404.325,309.875);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#2F3542").s().p("AgeBAIAAh+IAVAAIABAQQAKgRATgBQAHABADABIAAAUIgLgBQgVAAgHASIAABZg");
	this.shape_153.setTransform(394.1,309.75);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#2F3542").s().p("AgpAwQgQgSAAgeIAAAAQAAgTAIgPQAHgPANgIQANgIAQAAQAaAAAQASQAQASAAAdIAAABQAAATgHAPQgHAOgNAIQgOAJgRAAQgZAAgQgSgAgZgiQgKAMAAAXQAAAVAKANQAKANAPAAQARAAAJgNQAKgNAAgWQAAgVgKgNQgKgNgQAAQgPAAgKANg");
	this.shape_154.setTransform(382.525,309.875);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#2F3542").s().p("AgKBaIAAizIAVAAIAACzg");
	this.shape_155.setTransform(372.825,307.2);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#2F3542").s().p("AAbBaIgrg7IgOAPIAAAsIgWAAIAAizIAWAAIAABsIAMgOIAmgpIAaAAIgvA0IA1BKg");
	this.shape_156.setTransform(364.65,307.2);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#2F3542").s().p("AgKBWIAAh+IAVAAIAAB+gAgIhAQgEgEAAgFQAAgFAEgEQADgDAFgBQAGABAEADQADAEAAAFQAAAFgDAEQgEADgGABQgFgBgDgDg");
	this.shape_157.setTransform(348.925,307.55);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#2F3542").s().p("AAbBaIgrg7IgOAPIAAAsIgVAAIAAizIAVAAIAABsIAMgOIAngpIAaAAIgxA0IA2BKg");
	this.shape_158.setTransform(340.75,307.2);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#2F3542").s().p("AgKBWIAAh+IAVAAIAAB+gAgIhAQgEgEAAgFQAAgFAEgEQADgDAFgBQAGABAEADQADAEAAAFQAAAFgDAEQgEADgGABQgFgBgDgDg");
	this.shape_159.setTransform(330.975,307.55);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#2F3542").s().p("AgKBaIAAizIAVAAIAACzg");
	this.shape_160.setTransform(325.175,307.2);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#2F3542").s().p("AgKBWIAAh+IAVAAIAAB+gAgIhAQgEgEAAgFQAAgFAEgEQADgDAFgBQAGABAEADQADAEAAAFQAAAFgDAEQgEADgGABQgFgBgDgDg");
	this.shape_161.setTransform(319.375,307.55);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#2F3542").s().p("ABDBAIAAhSQAAgOgGgGQgGgHgPAAQgMAAgIAHQgIAHgBAMIAABTIgVAAIAAhSQAAgbgbAAQgVAAgIASIAABbIgWAAIAAh+IAVAAIAAAPQAOgRAYAAQAaAAAJAVQAGgJAKgGQALgFANgBQAqABABAsIAABTg");
	this.shape_162.setTransform(305.925,309.75);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#2F3542").s().p("AglAxQgQgRAAgdIAAgDQAAgSAHgPQAIgPANgIQAMgJAPAAQAYAAAOAQQAOARAAAeIAAAIIhVAAQAAATALALQAKAMAPAAQAMAAAIgFQAIgEAGgIIANAKQgQAZggAAQgZAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgJgNAAQgNAAgIAKg");
	this.shape_163.setTransform(289.225,309.875);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#2F3542").s().p("ABDBAIAAhSQAAgOgGgGQgGgHgPAAQgMAAgIAHQgIAHgBAMIAABTIgVAAIAAhSQAAgbgbAAQgVAAgIASIAABbIgWAAIAAh+IAVAAIAAAPQAOgRAYAAQAaAAAJAVQAGgJAKgGQALgFANgBQAqABABAsIAABTg");
	this.shape_164.setTransform(272.225,309.75);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#2F3542").s().p("AAbBaIgrg7IgOAPIAAAsIgWAAIAAizIAWAAIAABsIAMgOIAmgpIAaAAIgvA0IA2BKg");
	this.shape_165.setTransform(250.5,307.2);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_166.setTransform(237.075,309.875);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#2F3542").s().p("AgmBJQgPgSAAgdIAAgCQAAgcAPgSQANgRAXAAQAVAAANAPIAAhCIAVAAIAACzIgTAAIgBgOQgNAQgWAAQgXAAgNgSgAgWgJQgIAMAAAYQAAAVAIANQAJAMAPAAQAVAAAJgTIAAg5QgKgSgUAAQgPAAgJAMg");
	this.shape_167.setTransform(223.45,307.325);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#2F3542").s().p("AgKBWIAAh+IAVAAIAAB+gAgIhAQgEgEAAgFQAAgFAEgEQADgDAFgBQAGABAEADQADAEAAAFQAAAFgDAEQgEADgGABQgFgBgDgDg");
	this.shape_168.setTransform(214.125,307.55);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#2F3542").s().p("AgDBHQgHgIgBgRIAAhOIgWAAIAAgRIAWAAIAAgeIAWAAIAAAeIAXAAIAAARIgXAAIAABOQAAAIADADQADAEAHABIAKgCIAAARQgIADgIAAQgOAAgHgJg");
	this.shape_169.setTransform(206.9,308.45);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_170.setTransform(190.875,309.875);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#2F3542").s().p("AAcBAIAAhTQAAgNgGgGQgGgHgNAAQgKAAgIAGQgIAFgEAJIAABZIgWAAIAAh+IAVAAIAAARQAPgSAWgBQApABAAAsIAABTg");
	this.shape_171.setTransform(177.725,309.75);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#2F3542").s().p("AglAxQgQgRAAgdIAAgDQAAgSAHgPQAIgPANgIQAMgJAPAAQAYAAAOAQQAOARAAAeIAAAIIhVAAQAAATALALQAKAMAPAAQAMAAAIgFQAIgEAGgIIANAKQgQAZggAAQgZAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgJgNAAQgNAAgIAKg");
	this.shape_172.setTransform(164.925,309.875);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#2F3542").s().p("AgdBAIAAh+IAUAAIABAQQAKgRATgBQAGABAEABIAAAUIgLgBQgVAAgHASIAABZg");
	this.shape_173.setTransform(155.05,309.75);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_174.setTransform(143.825,309.875);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#2F3542").s().p("AAbBaIgrg7IgOAPIAAAsIgVAAIAAizIAVAAIAABsIAMgOIAmgpIAbAAIgxA0IA3BKg");
	this.shape_175.setTransform(132.05,307.2);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#2F3542").s().p("AAcBAIAAhSQAAgOgGgGQgGgHgNAAQgKAAgIAFQgIAGgEAJIAABZIgWAAIAAh+IAVAAIAAARQAPgTAWABQApgBAAAuIAABSg");
	this.shape_176.setTransform(787.475,269.95);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#2F3542").s().p("AgKBWIAAh+IAVAAIAAB+gAgIhAQgEgDAAgGQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAGgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_177.setTransform(777.975,267.75);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_178.setTransform(768.525,270.075);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#2F3542").s().p("AgKBaIAAizIAVAAIAACzg");
	this.shape_179.setTransform(759.125,267.4);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#2F3542").s().p("AglAxQgQgRAAgdIAAgDQAAgSAHgPQAIgPANgIQAMgJAPAAQAYAAAOAQQAOARAAAeIAAAIIhVAAQAAATALALQAKAMAPAAQAMAAAIgFQAIgEAGgIIANAKQgQAZggAAQgZAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgJgNAAQgNAAgIAKg");
	this.shape_180.setTransform(744.075,270.075);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#2F3542").s().p("ABDBAIAAhSQAAgOgGgGQgGgHgPAAQgMAAgIAHQgIAHgBANIAABSIgVAAIAAhRQAAgcgbAAQgVAAgIASIAABbIgWAAIAAh+IAVAAIAAAPQAOgQAYAAQAagBAJAVQAGgKAKgFQALgGANABQAqgBABAtIAABTg");
	this.shape_181.setTransform(727.075,269.95);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#2F3542").s().p("AgYA8QgMgFgGgKQgIgKAAgLIAXAAQAAALAIAHQAIAGANAAQAMAAAHgFQAIgFAAgIQgBgJgGgFQgHgFgPgDQgQgEgKgEQgKgFgFgHQgEgGAAgKQAAgPANgLQAOgLATAAQAWAAANALQANALAAASIgVAAQAAgJgIgHQgHgGgMAAQgLAAgGAFQgIAFAAAJQABAHAGAEQAGAEAPAEQAQAEAKAFQAKAEAGAHQAEAHAAAKQAAARgNAKQgOALgVAAQgOAAgMgGg");
	this.shape_182.setTransform(710.3,270.075);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#2F3542").s().p("AgKBWIAAh+IAVAAIAAB+gAgIhAQgEgDAAgGQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAGgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_183.setTransform(701.275,267.75);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#2F3542").s().p("AAcBAIAAhSQAAgOgGgGQgGgHgNAAQgKAAgIAFQgIAGgEAJIAABZIgWAAIAAh+IAVAAIAAARQAPgTAWABQApgBAAAuIAABSg");
	this.shape_184.setTransform(691.725,269.95);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_185.setTransform(678.575,270.075);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#2F3542").s().p("AgbBTQgMgFgIgLIAMgMQAOARAUAAQAPAAAJgJQAIgJAAgQIAAgLQgNAPgVAAQgWAAgOgSQgNgSAAgeQAAgeANgRQANgRAXAAQAXAAAMAQIABgPIAUAAIAAB8QAAAYgOAOQgPAPgYAAQgNgBgOgGgAgWg6QgJAMAAAYQAAAWAJAMQAIALAQAAQAUAAAJgSIAAg5QgKgSgTAAQgPAAgJAMg");
	this.shape_186.setTransform(665.1,272.45);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#2F3542").s().p("AgeBAIAAh+IAVAAIABAQQAKgSATABQAHgBADACIAAAUIgLgBQgUABgIARIAABZg");
	this.shape_187.setTransform(655.2,269.95);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#2F3542").s().p("AgpAwQgQgSAAgeIAAAAQAAgTAIgPQAHgPANgIQANgIAQAAQAaAAAQASQAQASAAAdIAAABQAAATgHAPQgHAOgNAIQgOAJgRAAQgZAAgQgSgAgZgiQgKAMAAAXQAAAVAKANQAKANAPAAQARAAAJgNQAKgNAAgWQAAgVgKgNQgKgNgQAAQgPAAgKANg");
	this.shape_188.setTransform(643.625,270.075);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#2F3542").s().p("AgKBWIAAh+IAVAAIAAB+gAgIhAQgEgDAAgGQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAGgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_189.setTransform(627.975,267.75);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#2F3542").s().p("AgeBAIAAh+IAWAAIAAAQQAJgSAUABQAGgBADACIAAAUIgKgBQgUABgIARIAABZg");
	this.shape_190.setTransform(621.65,269.95);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_191.setTransform(610.425,270.075);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#2F3542").s().p("AgnBJQgNgSAAgdIAAgCQAAgcANgSQAPgRAVAAQAWAAANAPIAAhCIAWAAIAACzIgVAAIgBgOQgNAQgWAAQgVAAgPgSgAgWgJQgJAMAAAYQAAAVAJANQAJAMAPAAQAVAAAJgTIAAg5QgKgSgUAAQgPAAgJAMg");
	this.shape_192.setTransform(596.8,267.525);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#2F3542").s().p("AAcBAIAAhSQAAgOgGgGQgGgHgNAAQgKAAgIAFQgIAGgEAJIAABZIgWAAIAAh+IAVAAIAAARQAPgTAWABQApgBAAAuIAABSg");
	this.shape_193.setTransform(577.775,269.95);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_194.setTransform(564.625,270.075);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#2F3542").s().p("AAcBAIAAhSQAAgOgGgGQgGgHgNAAQgKAAgIAFQgIAGgEAJIAABZIgWAAIAAh+IAVAAIAAARQAPgTAWABQApgBAAAuIAABSg");
	this.shape_195.setTransform(551.475,269.95);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_196.setTransform(538.325,270.075);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#2F3542").s().p("AAbBaIgrg7IgOAPIAAAsIgWAAIAAizIAWAAIAABsIAMgOIAmgpIAaAAIgvA0IA2BKg");
	this.shape_197.setTransform(526.55,267.4);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_198.setTransform(513.125,270.075);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#2F3542").s().p("ABDBAIAAhSQAAgOgGgGQgGgHgPAAQgMAAgIAHQgIAHgBANIAABSIgVAAIAAhRQAAgcgbAAQgVAAgIASIAABbIgWAAIAAh+IAVAAIAAAPQAOgQAYAAQAagBAJAVQAGgKAKgFQALgGANABQAqgBABAtIAABTg");
	this.shape_199.setTransform(496.075,269.95);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#2F3542").s().p("AAcBaIAAhUQAAgNgGgGQgGgHgNAAQgKAAgIAGQgIAGgEAIIAABaIgWAAIAAizIAWAAIAABEQAOgRAWAAQApAAAAAsIAABUg");
	this.shape_200.setTransform(473.025,267.4);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#2F3542").s().p("AglAxQgQgRAAgdIAAgDQAAgSAHgPQAIgPANgIQAMgJAPAAQAYAAAOAQQAOARAAAeIAAAIIhVAAQAAATALALQAKAMAPAAQAMAAAIgFQAIgEAGgIIANAKQgQAZggAAQgZAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgJgNAAQgNAAgIAKg");
	this.shape_201.setTransform(460.225,270.075);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#2F3542").s().p("AgKBaIAAizIAVAAIAACzg");
	this.shape_202.setTransform(450.875,267.4);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#2F3542").s().p("AgpAwQgQgSAAgeIAAAAQAAgTAIgPQAHgPANgIQANgIAQAAQAaAAAQASQAQASAAAdIAAABQAAATgHAPQgHAOgNAIQgOAJgRAAQgZAAgQgSgAgZgiQgKAMAAAXQAAAVAKANQAKANAPAAQARAAAJgNQAKgNAAgWQAAgVgKgNQgKgNgQAAQgPAAgKANg");
	this.shape_203.setTransform(441.075,270.075);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#2F3542").s().p("AgeBAIAAh+IAWAAIAAAQQAJgSAUABQAGgBADACIAAAUIgKgBQgUABgIARIAABZg");
	this.shape_204.setTransform(430.85,269.95);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#2F3542").s().p("AglAxQgQgRAAgdIAAgDQAAgSAHgPQAIgPANgIQAMgJAPAAQAYAAAOAQQAOARAAAeIAAAIIhVAAQAAATALALQAKAMAPAAQAMAAAIgFQAIgEAGgIIANAKQgQAZggAAQgZAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgJgNAAQgNAAgIAKg");
	this.shape_205.setTransform(419.975,270.075);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#2F3542").s().p("Ag1BZIAAivIAUAAIACAOQAMgQAXAAQAXAAAOARQANASgBAeIAAACQABAcgNASQgOARgWABQgXgBgNgPIAAA+gAgfg1IAAA8QAKARAUABQAOgBAKgLQAJgNAAgYQAAgVgJgMQgKgNgPAAQgTAAgKARg");
	this.shape_206.setTransform(407.05,272.4);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#2F3542").s().p("ABDBAIAAhSQAAgOgGgGQgGgHgPAAQgMAAgIAHQgIAHgBANIAABSIgVAAIAAhRQAAgcgbAAQgVAAgIASIAABbIgWAAIAAh+IAVAAIAAAPQAOgQAYAAQAagBAJAVQAGgKAKgFQALgGANABQAqgBABAtIAABTg");
	this.shape_207.setTransform(389.525,269.95);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#2F3542").s().p("AglAxQgQgRAAgdIAAgDQAAgSAHgPQAIgPANgIQAMgJAPAAQAYAAAOAQQAOARAAAeIAAAIIhVAAQAAATALALQAKAMAPAAQAMAAAIgFQAIgEAGgIIANAKQgQAZggAAQgZAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgJgNAAQgNAAgIAKg");
	this.shape_208.setTransform(372.825,270.075);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#2F3542").s().p("ABDBAIAAhSQAAgOgGgGQgGgHgPAAQgMAAgIAHQgIAHgBANIAABSIgVAAIAAhRQAAgcgbAAQgVAAgIASIAABbIgWAAIAAh+IAVAAIAAAPQAOgQAYAAQAagBAJAVQAGgKAKgFQALgGANABQAqgBABAtIAABTg");
	this.shape_209.setTransform(355.825,269.95);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#2F3542").s().p("AgPAVQALgPAAgPIAAgUIAUAAIAAARQAAAMgFALQgGAMgIAHg");
	this.shape_210.setTransform(336.625,276.825);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#2F3542").s().p("AAcBaIAAhUQAAgNgGgGQgGgHgNAAQgKAAgIAGQgIAGgEAIIAABaIgWAAIAAizIAWAAIAABEQAOgRAWAAQApAAAAAsIAABUg");
	this.shape_211.setTransform(328.075,267.4);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#2F3542").s().p("Ag0BZIAAivIATAAIACAOQANgQAWAAQAXAAANARQANASAAAeIAAACQAAAcgNASQgNARgXABQgWgBgNgPIAAA+gAgfg1IAAA8QAKARAUABQAOgBAKgLQAJgNAAgYQAAgVgJgMQgKgNgPAAQgTAAgKARg");
	this.shape_212.setTransform(315,272.4);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#2F3542").s().p("AgpAwQgQgSAAgeIAAAAQAAgTAIgPQAHgPANgIQANgIAQAAQAaAAAQASQAQASAAAdIAAABQAAATgHAPQgHAOgNAIQgOAJgRAAQgZAAgQgSgAgZgiQgKAMAAAXQAAAVAKANQAKANAPAAQARAAAJgNQAKgNAAgWQAAgVgKgNQgKgNgQAAQgPAAgKANg");
	this.shape_213.setTransform(301.125,270.075);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#2F3542").s().p("AgeBAIAAh+IAWAAIAAAQQAJgSAUABQAGgBADACIAAAUIgKgBQgUABgIARIAABZg");
	this.shape_214.setTransform(290.9,269.95);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#2F3542").s().p("AgDBHQgIgJAAgQIAAhNIgWAAIAAgSIAWAAIAAgeIAWAAIAAAeIAXAAIAAASIgXAAIAABNQAAAIACAEQADADAIAAIALgBIAAARQgJADgIAAQgPAAgGgJg");
	this.shape_215.setTransform(281.9,268.65);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#2F3542").s().p("AgpAwQgQgSAAgeIAAAAQAAgTAIgPQAHgPANgIQANgIAQAAQAaAAAQASQAQASAAAdIAAABQAAATgHAPQgHAOgNAIQgOAJgRAAQgZAAgQgSgAgZgiQgKAMAAAXQAAAVAKANQAKANAPAAQARAAAJgNQAKgNAAgWQAAgVgKgNQgKgNgQAAQgPAAgKANg");
	this.shape_216.setTransform(271.475,270.075);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#2F3542").s().p("AgdBAIAAh+IAUAAIABAQQAKgSATABQAGgBAEACIAAAUIgLgBQgVABgHARIAABZg");
	this.shape_217.setTransform(261.25,269.95);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#2F3542").s().p("AglAxQgQgRAAgdIAAgDQAAgSAHgPQAIgPANgIQAMgJAPAAQAYAAAOAQQAOARAAAeIAAAIIhVAAQAAATALALQAKAMAPAAQAMAAAIgFQAIgEAGgIIANAKQgQAZggAAQgZAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgJgNAAQgNAAgIAKg");
	this.shape_218.setTransform(250.375,270.075);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#2F3542").s().p("AgDBHQgIgJAAgQIAAhNIgWAAIAAgSIAWAAIAAgeIAWAAIAAAeIAXAAIAAASIgXAAIAABNQAAAIACAEQADADAIAAIALgBIAAARQgJADgIAAQgPAAgGgJg");
	this.shape_219.setTransform(239.6,268.65);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#2F3542").s().p("AglAxQgQgRAAgdIAAgDQAAgSAHgPQAIgPANgIQAMgJAPAAQAYAAAOAQQAOARAAAeIAAAIIhVAAQAAATALALQAKAMAPAAQAMAAAIgFQAIgEAGgIIANAKQgQAZggAAQgZAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgJgNAAQgNAAgIAKg");
	this.shape_220.setTransform(229.875,270.075);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#2F3542").s().p("AAcBaIAAhUQAAgNgGgGQgGgHgNAAQgKAAgIAGQgIAGgEAIIAABaIgWAAIAAizIAWAAIAABEQAOgRAWAAQApAAAAAsIAABUg");
	this.shape_221.setTransform(216.825,267.4);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#2F3542").s().p("AgDBHQgHgJAAgQIAAhNIgYAAIAAgSIAYAAIAAgeIAUAAIAAAeIAYAAIAAASIgYAAIAABNQAAAIAEAEQACADAJAAIAJgBIAAARQgIADgIAAQgOAAgHgJg");
	this.shape_222.setTransform(199.95,268.65);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_223.setTransform(189.875,270.075);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#2F3542").s().p("AgRBbIAAhtIgUAAIAAgRIAUAAIAAgNQAAgUALgLQAKgLAUAAQAHAAAHACIgBARIgLgBQgLAAgGAGQgFAGAAAMIAAANIAbAAIAAARIgbAAIAABtg");
	this.shape_224.setTransform(179.525,267.275);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#2F3542").s().p("AgKBWIAAh+IAVAAIAAB+gAgIhAQgEgDAAgGQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAGgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_225.setTransform(172.125,267.75);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#2F3542").s().p("AgZA8QgLgFgHgKQgGgKgBgLIAXAAQAAALAIAHQAIAGAMAAQANAAAHgFQAIgFgBgIQAAgJgGgFQgGgFgQgDQgRgEgJgEQgKgFgFgHQgEgGAAgKQAAgPANgLQANgLAUAAQAVAAAOALQANALAAASIgWAAQAAgJgHgHQgHgGgMAAQgLAAgHAFQgGAFgBAJQAAAHAHAEQAGAEAQAEQAQAEAJAFQALAEAEAHQAFAHABAKQAAARgOAKQgOALgWAAQgOAAgMgGg");
	this.shape_226.setTransform(162.95,270.075);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#2F3542").s().p("AgdBAIAAh+IAVAAIAAAQQAJgSAUABQAGgBADACIAAAUIgKgBQgVABgHARIAABZg");
	this.shape_227.setTransform(153.4,269.95);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#2F3542").s().p("AglAxQgQgRAAgdIAAgDQAAgSAHgPQAIgPANgIQAMgJAPAAQAYAAAOAQQAOARAAAeIAAAIIhVAAQAAATALALQAKAMAPAAQAMAAAIgFQAIgEAGgIIANAKQgQAZggAAQgZAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgJgNAAQgNAAgIAKg");
	this.shape_228.setTransform(142.525,270.075);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#2F3542").s().p("Ag5BVIAAipIA3AAQAcAAANALQAPAMAAAWQgBAMgGAJQgHAJgMAFQAOAEAIAKQAIALAAAPQAAAXgPANQgPANgbAAgAgiBDIAkAAQAPAAAKgIQAIgIABgPQAAgfgiAAIgkAAgAgigMIAiAAQANAAAJgHQAJgHAAgNQAAgOgJgHQgHgGgRAAIggAAg");
	this.shape_229.setTransform(128.9,267.875);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#2F3542").s().p("AgJAJQgEgDABgGQgBgEAEgEQADgEAGAAQAHAAADAEQAEAEAAAEQAAAGgEADQgDAEgHAAQgGAAgDgEg");
	this.shape_230.setTransform(100.05,275.25);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#2F3542").s().p("AAQBVIAAgnIhNAAIAAgNIBMh1IAXAAIAABwIAYAAIAAASIgYAAIAAAngAAOgyIgyBOIA0AAIAAhTg");
	this.shape_231.setTransform(90.275,267.875);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#2F3542").s().p("AgKBaIAAizIAVAAIAACzg");
	this.shape_232.setTransform(394.525,227.6);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#2F3542").s().p("AglAxQgQgRAAgdIAAgDQAAgSAHgPQAIgPANgIQAMgJAPAAQAYAAAOAQQAOARAAAeIAAAIIhVAAQAAATALALQAKAMAPAAQAMAAAIgFQAIgEAGgIIANAKQgQAZggAAQgZAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgJgNAAQgNAAgIAKg");
	this.shape_233.setTransform(385.425,230.275);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#2F3542").s().p("AgYA8QgMgFgGgKQgIgKAAgLIAWAAQABALAIAHQAIAGANAAQAMAAAIgFQAHgFAAgIQgBgJgGgFQgHgFgPgDQgQgEgKgEQgKgFgFgHQgEgGAAgKQAAgPANgLQAOgLATAAQAWAAANALQANALAAASIgVAAQAAgJgIgHQgHgGgMAAQgLAAgGAFQgIAFABAJQAAAHAGAEQAGAEAPAEQAQAEALAFQAJAEAGAHQAEAHAAAKQAAARgNAKQgOALgVAAQgOAAgMgGg");
	this.shape_234.setTransform(372.7,230.275);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#2F3542").s().p("AgaBUQgOgHgGgKIALgMQAOAQAUAAQAPABAJgJQAJgJgBgQIAAgLQgMAPgWAAQgWAAgOgSQgOgSAAgeQAAgeAOgRQANgRAYAAQAVAAAOAQIABgOIAUAAIAAB7QAAAYgPAOQgPAOgYAAQgNAAgNgFgAgWg6QgJAMAAAYQAAAWAJAMQAIAMAPgBQAVAAAJgSIAAg5QgJgSgVAAQgOAAgJAMg");
	this.shape_235.setTransform(353.65,232.65);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#2F3542").s().p("AAcBBIAAhTQAAgOgGgHQgGgGgNAAQgKAAgIAFQgIAGgEAJIAABaIgWAAIAAh+IAVAAIAAAQQAPgTAWABQApgBAAAuIAABTg");
	this.shape_236.setTransform(340.525,230.15);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#2F3542").s().p("AgKBXIAAh+IAVAAIAAB+gAgIhAQgEgEAAgFQAAgFAEgEQADgEAFABQAGgBAEAEQADAEAAAFQAAAFgDAEQgEADgGAAQgFAAgDgDg");
	this.shape_237.setTransform(331.025,227.95);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#2F3542").s().p("AgmBJQgOgSgBgdIAAgCQABgcAOgSQANgRAXAAQAVAAANAPIAAhCIAVAAIAACzIgTAAIgBgOQgOAQgVAAQgXAAgNgSgAgWgJQgJAMABAYQgBAVAJANQAJAMAPAAQAVAAAJgTIAAg5QgKgSgUAAQgPAAgJAMg");
	this.shape_238.setTransform(321,227.725);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#2F3542").s().p("AAcBBIAAhTQAAgOgGgHQgGgGgNAAQgKAAgIAFQgIAGgEAJIAABaIgWAAIAAh+IAVAAIAAAQQAPgTAWABQApgBAAAuIAABTg");
	this.shape_239.setTransform(307.925,230.15);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#2F3542").s().p("AgKBXIAAh+IAVAAIAAB+gAgIhAQgEgEAAgFQAAgFAEgEQADgEAFABQAGgBAEAEQADAEAAAFQAAAFgDAEQgEADgGAAQgFAAgDgDg");
	this.shape_240.setTransform(298.425,227.95);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#2F3542").s().p("AgmBJQgOgSgBgdIAAgCQABgcAOgSQAOgRAWAAQAVAAANAPIAAhCIAWAAIAACzIgUAAIgBgOQgOAQgVAAQgWAAgOgSgAgWgJQgJAMAAAYQAAAVAJANQAJAMAPAAQAUAAAKgTIAAg5QgKgSgUAAQgPAAgJAMg");
	this.shape_241.setTransform(288.4,227.725);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#2F3542").s().p("AgKBXIAAh+IAVAAIAAB+gAgIhAQgEgEAAgFQAAgFAEgEQADgEAFABQAGgBAEAEQADAEAAAFQAAAFgDAEQgEADgGAAQgFAAgDgDg");
	this.shape_242.setTransform(273.125,227.95);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#2F3542").s().p("AAbBaIgrg6IgOANIAAAtIgVAAIAAizIAVAAIAABsIAMgOIAngpIAaAAIgxA0IA2BKg");
	this.shape_243.setTransform(264.95,227.6);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#2F3542").s().p("AgKBXIAAh+IAVAAIAAB+gAgIhAQgEgEAAgFQAAgFAEgEQADgEAFABQAGgBAEAEQADAEAAAFQAAAFgDAEQgEADgGAAQgFAAgDgDg");
	this.shape_244.setTransform(255.175,227.95);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#2F3542").s().p("AgKBaIAAizIAVAAIAACzg");
	this.shape_245.setTransform(249.375,227.6);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#2F3542").s().p("AgKBXIAAh+IAVAAIAAB+gAgIhAQgEgEAAgFQAAgFAEgEQADgEAFABQAGgBAEAEQADAEAAAFQAAAFgDAEQgEADgGAAQgFAAgDgDg");
	this.shape_246.setTransform(243.575,227.95);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#2F3542").s().p("ABDBBIAAhTQAAgOgGgHQgGgGgPAAQgMAAgIAHQgIAHgBANIAABTIgVAAIAAhSQAAgcgbAAQgVAAgIASIAABcIgWAAIAAh+IAVAAIAAAOQAOgQAYAAQAaAAAJAUQAGgJAKgGQALgGANABQAqAAABArIAABVg");
	this.shape_247.setTransform(230.125,230.15);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#2F3542").s().p("AglAxQgQgRAAgdIAAgDQAAgSAHgPQAIgPANgIQAMgJAPAAQAYAAAOAQQAOARAAAeIAAAIIhVAAQAAATALALQAKAMAPAAQAMAAAIgFQAIgEAGgIIANAKQgQAZggAAQgZAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgJgNAAQgNAAgIAKg");
	this.shape_248.setTransform(213.425,230.275);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#2F3542").s().p("ABDBBIAAhTQAAgOgGgHQgGgGgPAAQgMAAgIAHQgIAHgBANIAABTIgVAAIAAhSQAAgcgbAAQgVAAgIASIAABcIgWAAIAAh+IAVAAIAAAOQAOgQAYAAQAaAAAJAUQAGgJAKgGQALgGANABQAqAAABArIAABVg");
	this.shape_249.setTransform(196.425,230.15);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#2F3542").s().p("AAbBaIgrg6IgOANIAAAtIgVAAIAAizIAVAAIAABsIAMgOIAngpIAaAAIgxA0IA2BKg");
	this.shape_250.setTransform(174.7,227.6);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_251.setTransform(161.275,230.275);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#2F3542").s().p("AgmBJQgOgSgBgdIAAgCQABgcAOgSQAOgRAWAAQAVAAANAPIAAhCIAVAAIAACzIgTAAIgBgOQgOAQgVAAQgWAAgOgSgAgWgJQgJAMABAYQgBAVAJANQAJAMAPAAQAUAAAKgTIAAg5QgKgSgUAAQgPAAgJAMg");
	this.shape_252.setTransform(147.65,227.725);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#2F3542").s().p("AgKBXIAAh+IAVAAIAAB+gAgIhAQgEgEAAgFQAAgFAEgEQADgEAFABQAGgBAEAEQADAEAAAFQAAAFgDAEQgEADgGAAQgFAAgDgDg");
	this.shape_253.setTransform(138.325,227.95);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#2F3542").s().p("AgKBVIAAiXIg3AAIAAgSICDAAIAAASIg2AAIAACXg");
	this.shape_254.setTransform(128.25,228.075);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#2F3542").s().p("AgJAJQgEgDABgGQgBgEAEgEQADgEAGAAQAHAAADAEQAEAEAAAEQAAAGgEADQgDAEgHAAQgGAAgDgEg");
	this.shape_255.setTransform(100.05,235.45);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#2F3542").s().p("AgmBLQgPgNAAgWIAWAAQAAAOAJAIQAJAIANAAQAQAAAIgIQAIgJAAgPQABgPgKgIQgJgIgQAAIgRAAIAAgRIARAAQAPAAAIgIQAJgIAAgNQAAgegeAAQgNAAgJAIQgIAIAAANIgVAAQAAgUAOgNQAPgOAWAAQAYAAAOANQANANAAAXQABALgIAKQgHALgMAFQAOADAIAKQAHALAAAPQAAAXgPANQgPAOgYAAQgXAAgPgNg");
	this.shape_256.setTransform(90,228.075);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#2F3542").s().p("AgKBaIAAizIAVAAIAACzg");
	this.shape_257.setTransform(519.675,187.8);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#2F3542").s().p("AgKBXIAAh+IAVAAIAAB+gAgIhAQgEgDAAgGQAAgFAEgEQADgEAFAAQAGAAAEAEQADAEAAAFQAAAGgDADQgEAEgGgBQgFABgDgEg");
	this.shape_258.setTransform(513.875,188.15);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#2F3542").s().p("AgRBbIAAhtIgUAAIAAgRIAUAAIAAgNQAAgUALgLQAKgLAUAAQAHAAAHACIgBARIgLgBQgLAAgGAGQgFAGAAAMIAAANIAbAAIAAARIgbAAIAABtg");
	this.shape_259.setTransform(507.125,187.675);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#2F3542").s().p("AgpAwQgQgSAAgeIAAAAQAAgTAIgPQAHgPANgIQANgIAQAAQAaAAAQASQAQASAAAdIAAABQAAATgHAPQgHAOgNAIQgOAJgRAAQgZAAgQgSgAgZgiQgKAMAAAXQAAAVAKANQAKANAPAAQARAAAJgNQAKgNAAgWQAAgVgKgNQgKgNgQAAQgPAAgKANg");
	this.shape_260.setTransform(495.725,190.475);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#2F3542").s().p("AgdBBIAAh+IAVAAIAAAOQAJgRAUAAQAGAAADACIAAAUIgKAAQgVgBgHATIAABZg");
	this.shape_261.setTransform(485.5,190.35);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#2F3542").s().p("AgpAwQgQgSAAgeIAAAAQAAgTAIgPQAHgPANgIQANgIAQAAQAaAAAQASQAQASAAAdIAAABQAAATgHAPQgHAOgNAIQgOAJgRAAQgZAAgQgSgAgZgiQgKAMAAAXQAAAVAKANQAKANAPAAQARAAAJgNQAKgNAAgWQAAgVgKgNQgKgNgQAAQgPAAgKANg");
	this.shape_262.setTransform(473.925,190.475);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#2F3542").s().p("AgKBaIAAizIAVAAIAACzg");
	this.shape_263.setTransform(464.225,187.8);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#2F3542").s().p("AAbBaIgrg6IgOANIAAAtIgVAAIAAizIAVAAIAABsIAMgOIAngpIAaAAIgxA0IA3BKg");
	this.shape_264.setTransform(456.05,187.8);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#2F3542").s().p("AAcBBIAAhUQAAgNgGgHQgGgGgNAAQgKAAgIAGQgIAFgEAJIAABaIgWAAIAAh+IAVAAIAAAPQAPgSAWAAQApAAAAAtIAABUg");
	this.shape_265.setTransform(436.575,190.35);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_266.setTransform(423.425,190.475);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#2F3542").s().p("AgnBJQgOgSABgdIAAgCQgBgcAOgSQAOgRAWAAQAWAAANAPIAAhCIAWAAIAACzIgUAAIgCgOQgNAQgWAAQgWAAgOgSgAgWgJQgJAMAAAYQAAAVAJANQAJAMAPAAQAUAAAKgTIAAg5QgKgSgUAAQgPAAgJAMg");
	this.shape_267.setTransform(409.8,187.925);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#2F3542").s().p("AgKBaIAAizIAVAAIAACzg");
	this.shape_268.setTransform(394.525,187.8);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#2F3542").s().p("AglAxQgQgRAAgdIAAgDQAAgSAHgPQAIgPANgIQAMgJAPAAQAYAAAOAQQAOARAAAeIAAAIIhVAAQAAATALALQAKAMAPAAQAMAAAIgFQAIgEAGgIIANAKQgQAZggAAQgZAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgJgNAAQgNAAgIAKg");
	this.shape_269.setTransform(385.425,190.475);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#2F3542").s().p("AgYA8QgMgFgGgKQgIgKAAgLIAWAAQABALAIAHQAIAGANAAQAMAAAIgFQAHgFAAgIQgBgJgGgFQgHgFgPgDQgQgEgKgEQgKgFgFgHQgEgGAAgKQAAgPANgLQAOgLATAAQAWAAANALQANALAAASIgVAAQAAgJgIgHQgHgGgMAAQgLAAgGAFQgIAFABAJQAAAHAGAEQAGAEAPAEQAQAEALAFQAJAEAGAHQAEAHAAAKQAAARgNAKQgOALgVAAQgOAAgMgGg");
	this.shape_270.setTransform(372.7,190.475);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#2F3542").s().p("AgaBUQgOgGgGgKIALgOQAOASAUgBQAPAAAJgIQAJgJgBgRIAAgKQgMAPgWAAQgWAAgOgSQgOgSAAgeQAAgdAOgSQANgSAYAAQAVAAAOARIABgOIAUAAIAAB6QAAAZgPAOQgPAOgYAAQgNAAgNgFgAgWg6QgJAMAAAZQAAAVAJAMQAIALAPABQAVAAAJgTIAAg5QgJgSgVAAQgOAAgJAMg");
	this.shape_271.setTransform(353.65,192.85);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#2F3542").s().p("AAcBBIAAhUQAAgNgGgHQgGgGgNAAQgKAAgIAGQgIAFgEAJIAABaIgWAAIAAh+IAVAAIAAAPQAPgSAWAAQApAAAAAtIAABUg");
	this.shape_272.setTransform(340.525,190.35);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#2F3542").s().p("AgKBXIAAh+IAVAAIAAB+gAgIhAQgEgDAAgGQAAgFAEgEQADgEAFAAQAGAAAEAEQADAEAAAFQAAAGgDADQgEAEgGgBQgFABgDgEg");
	this.shape_273.setTransform(331.025,188.15);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#2F3542").s().p("AgmBJQgOgSgBgdIAAgCQABgcAOgSQANgRAXAAQAVAAANAPIAAhCIAVAAIAACzIgTAAIgBgOQgOAQgVAAQgXAAgNgSgAgWgJQgJAMABAYQgBAVAJANQAJAMAPAAQAVAAAJgTIAAg5QgKgSgUAAQgPAAgJAMg");
	this.shape_274.setTransform(321,187.925);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#2F3542").s().p("AAcBBIAAhUQAAgNgGgHQgGgGgNAAQgKAAgIAGQgIAFgEAJIAABaIgWAAIAAh+IAVAAIAAAPQAPgSAWAAQApAAAAAtIAABUg");
	this.shape_275.setTransform(307.925,190.35);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#2F3542").s().p("AgKBXIAAh+IAVAAIAAB+gAgIhAQgEgDAAgGQAAgFAEgEQADgEAFAAQAGAAAEAEQADAEAAAFQAAAGgDADQgEAEgGgBQgFABgDgEg");
	this.shape_276.setTransform(298.425,188.15);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#2F3542").s().p("AgmBJQgOgSgBgdIAAgCQABgcAOgSQAOgRAWAAQAVAAANAPIAAhCIAWAAIAACzIgUAAIgBgOQgOAQgVAAQgWAAgOgSgAgWgJQgJAMAAAYQAAAVAJANQAJAMAPAAQAUAAAKgTIAAg5QgKgSgUAAQgPAAgJAMg");
	this.shape_277.setTransform(288.4,187.925);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#2F3542").s().p("AgKBXIAAh+IAVAAIAAB+gAgIhAQgEgDAAgGQAAgFAEgEQADgEAFAAQAGAAAEAEQADAEAAAFQAAAGgDADQgEAEgGgBQgFABgDgEg");
	this.shape_278.setTransform(273.125,188.15);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#2F3542").s().p("AAbBaIgrg6IgOANIAAAtIgVAAIAAizIAVAAIAABsIAMgOIAngpIAaAAIgxA0IA2BKg");
	this.shape_279.setTransform(264.95,187.8);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#2F3542").s().p("AgKBXIAAh+IAVAAIAAB+gAgIhAQgEgDAAgGQAAgFAEgEQADgEAFAAQAGAAAEAEQADAEAAAFQAAAGgDADQgEAEgGgBQgFABgDgEg");
	this.shape_280.setTransform(255.175,188.15);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#2F3542").s().p("AgKBaIAAizIAVAAIAACzg");
	this.shape_281.setTransform(249.375,187.8);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#2F3542").s().p("AgKBXIAAh+IAVAAIAAB+gAgIhAQgEgDAAgGQAAgFAEgEQADgEAFAAQAGAAAEAEQADAEAAAFQAAAGgDADQgEAEgGgBQgFABgDgEg");
	this.shape_282.setTransform(243.575,188.15);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#2F3542").s().p("ABDBBIAAhTQAAgOgGgHQgGgGgPAAQgMAAgIAHQgIAHgBAMIAABUIgVAAIAAhTQAAgbgbAAQgVAAgIASIAABcIgWAAIAAh+IAVAAIAAAOQAOgRAYAAQAaABAJAUQAGgKAKgFQALgGANAAQAqAAABAsIAABVg");
	this.shape_283.setTransform(230.125,190.35);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#2F3542").s().p("AglAxQgQgRAAgdIAAgDQAAgSAHgPQAIgPANgIQAMgJAPAAQAYAAAOAQQAOARAAAeIAAAIIhVAAQAAATALALQAKAMAPAAQAMAAAIgFQAIgEAGgIIANAKQgQAZggAAQgZAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgJgNAAQgNAAgIAKg");
	this.shape_284.setTransform(213.425,190.475);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#2F3542").s().p("ABDBBIAAhTQAAgOgGgHQgGgGgPAAQgMAAgIAHQgIAHgBAMIAABUIgVAAIAAhTQAAgbgbAAQgVAAgIASIAABcIgWAAIAAh+IAVAAIAAAOQAOgRAYAAQAaABAJAUQAGgKAKgFQALgGANAAQAqAAABAsIAABVg");
	this.shape_285.setTransform(196.425,190.35);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#2F3542").s().p("AAbBaIgrg6IgOANIAAAtIgVAAIAAizIAVAAIAABsIAMgOIAngpIAaAAIgxA0IA2BKg");
	this.shape_286.setTransform(174.7,187.8);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_287.setTransform(161.275,190.475);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#2F3542").s().p("AgmBJQgOgSgBgdIAAgCQABgcAOgSQAOgRAWAAQAVAAANAPIAAhCIAVAAIAACzIgTAAIgBgOQgOAQgVAAQgWAAgOgSgAgWgJQgJAMABAYQgBAVAJANQAJAMAPAAQAUAAAKgTIAAg5QgKgSgUAAQgPAAgJAMg");
	this.shape_288.setTransform(147.65,187.925);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f("#2F3542").s().p("AgKBXIAAh+IAVAAIAAB+gAgIhAQgEgDAAgGQAAgFAEgEQADgEAFAAQAGAAAEAEQADAEAAAFQAAAGgDADQgEAEgGgBQgFABgDgEg");
	this.shape_289.setTransform(138.325,188.15);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#2F3542").s().p("AgKBVIAAiXIg3AAIAAgSICDAAIAAASIg2AAIAACXg");
	this.shape_290.setTransform(128.25,188.275);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f("#2F3542").s().p("AgJAJQgEgDABgGQgBgFAEgDQADgEAGAAQAHAAADAEQAEADAAAFQAAAGgEADQgDAEgHAAQgGAAgDgEg");
	this.shape_291.setTransform(100.05,195.65);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#2F3542").s().p("Ag2BXIAAgQIA7hBQANgOAFgKQAFgJAAgKQAAgNgIgJQgIgJgNAAQgQABgJAIQgJAKAAAQIgWAAQABgXAPgPQAPgPAZAAQAXAAAOANQAOAMAAAVQAAAZghAiIgsAyIBVAAIAAASg");
	this.shape_292.setTransform(90.35,188.15);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f("#2F3542").s().p("AgdBAIAAh+IAUAAIABAQQAKgRATgBQAHABADABIAAAUIgLgBQgVAAgHASIAABZg");
	this.shape_293.setTransform(520.55,150.55);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#2F3542").s().p("AglAxQgQgRAAgdIAAgDQAAgSAHgPQAIgPANgIQAMgJAPAAQAYAAAOAQQAOARAAAeIAAAIIhVAAQAAATALALQAKAMAPAAQAMAAAIgFQAIgEAGgIIANAKQgQAZggAAQgZAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgJgNAAQgNAAgIAKg");
	this.shape_294.setTransform(509.675,150.675);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f("#2F3542").s().p("AgKBaIAAizIAVAAIAACzg");
	this.shape_295.setTransform(500.325,148);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#2F3542").s().p("AgmA1QgLgMAAgXIAAhSIAVAAIAABRQAAAdAYAAQAYAAAIgSIAAhcIAWAAIAAB+IgVAAIgBgMQgMAPgYAAQgTAAgLgMg");
	this.shape_296.setTransform(490.75,150.775);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f("#2F3542").s().p("AgKBaIAAizIAVAAIAACzg");
	this.shape_297.setTransform(481.275,148);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#2F3542").s().p("AglAxQgQgRAAgdIAAgDQAAgSAHgPQAIgPANgIQAMgJAPAAQAYAAAOAQQAOARAAAeIAAAIIhVAAQAAATALALQAKAMAPAAQAMAAAIgFQAIgEAGgIIANAKQgQAZggAAQgZAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgJgNAAQgNAAgIAKg");
	this.shape_298.setTransform(472.175,150.675);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f("#2F3542").s().p("AgYA8QgMgFgGgKQgIgKABgLIAVAAQABALAIAHQAIAGANAAQAMAAAIgFQAGgFABgIQAAgJgHgFQgGgFgQgDQgQgEgKgEQgKgFgEgHQgFgGAAgKQAAgPANgLQAOgLATAAQAWAAANALQANALAAASIgVAAQAAgJgIgHQgHgGgMAAQgLAAgGAFQgIAFABAJQAAAHAGAEQAGAEAPAEQAQAEALAFQAKAEAFAHQAEAHAAAKQAAARgNAKQgOALgVAAQgOAAgMgGg");
	this.shape_299.setTransform(459.45,150.675);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#2F3542").s().p("AgKBWIAAh+IAVAAIAAB+gAgIhAQgEgDAAgGQAAgFAEgEQADgDAFgBQAGABAEADQADAEAAAFQAAAGgDADQgEADgGAAQgFAAgDgDg");
	this.shape_300.setTransform(450.425,148.35);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f("#2F3542").s().p("AgDBHQgIgIABgRIAAhOIgYAAIAAgRIAYAAIAAgeIAUAAIAAAeIAYAAIAAARIgYAAIAABOQAAAIADADQAEAFAIAAIAKgCIAAARQgJADgIAAQgOAAgHgJg");
	this.shape_301.setTransform(443.2,149.25);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#2F3542").s().p("AgKBaIAAizIAVAAIAACzg");
	this.shape_302.setTransform(436.775,148);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f("#2F3542").s().p("AgmA1QgLgMAAgXIAAhSIAWAAIAABRQgBAdAYAAQAYAAAIgSIAAhcIAWAAIAAB+IgVAAIgBgMQgMAPgYAAQgTAAgLgMg");
	this.shape_303.setTransform(427.2,150.775);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#2F3542").s().p("ABDBAIAAhSQAAgOgGgGQgGgHgPAAQgMAAgIAHQgIAHgBAMIAABTIgVAAIAAhSQAAgbgbAAQgVAAgIASIAABbIgWAAIAAh+IAVAAIAAAPQAOgRAYAAQAaAAAJAVQAGgJAKgGQALgFANgBQAqABABArIAABUg");
	this.shape_304.setTransform(410.075,150.55);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f("#2F3542").s().p("AAcBAIAAhTQAAgNgGgGQgGgHgNAAQgKAAgIAGQgIAFgEAJIAABZIgWAAIAAh+IAVAAIAAAQQAPgRAWgBQApABAAAsIAABTg");
	this.shape_305.setTransform(386.975,150.55);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_306.setTransform(373.825,150.675);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f("#2F3542").s().p("AgnBJQgOgSABgdIAAgCQgBgcAOgSQAPgRAVAAQAWAAANAPIAAhCIAWAAIAACzIgVAAIgBgOQgNAQgWAAQgVAAgPgSgAgWgJQgJAMAAAYQAAAVAJANQAJAMAPAAQAVAAAJgTIAAg5QgKgSgUAAQgPAAgJAMg");
	this.shape_307.setTransform(360.2,148.125);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f("#2F3542").s().p("AAbBaIgrg7IgOAPIAAAsIgVAAIAAizIAVAAIAABsIAMgOIAngpIAaAAIgxA0IA2BKg");
	this.shape_308.setTransform(342.55,148);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f("#2F3542").s().p("AgKBWIAAh+IAVAAIAAB+gAgIhAQgEgDAAgGQAAgFAEgEQADgDAFgBQAGABAEADQADAEAAAFQAAAGgDADQgEADgGAAQgFAAgDgDg");
	this.shape_309.setTransform(332.775,148.35);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f("#2F3542").s().p("AgDBHQgIgIAAgRIAAhOIgWAAIAAgRIAWAAIAAgeIAWAAIAAAeIAXAAIAAARIgXAAIAABOQAAAIACADQADAFAIAAIALgCIAAARQgJADgIAAQgPAAgGgJg");
	this.shape_310.setTransform(325.55,149.25);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f("#2F3542").s().p("AgpAwQgQgSAAgeIAAAAQAAgTAIgPQAHgPANgIQANgIAQAAQAaAAAQASQAQASAAAdIAAABQAAATgHAPQgHAOgNAIQgOAJgRAAQgZAAgQgSgAgZgiQgKAMAAAXQAAAVAKANQAKANAPAAQARAAAJgNQAKgNAAgWQAAgVgKgNQgKgNgQAAQgPAAgKANg");
	this.shape_311.setTransform(315.125,150.675);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f("#2F3542").s().p("AgKBWIAAh+IAVAAIAAB+gAgIhAQgEgDAAgGQAAgFAEgEQADgDAFgBQAGABAEADQADAEAAAFQAAAGgDADQgEADgGAAQgFAAgDgDg");
	this.shape_312.setTransform(305.425,148.35);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f("#2F3542").s().p("AgeBAIAAh+IAWAAIAAAQQAJgRAUgBQAGABADABIAAAUIgKgBQgUAAgIASIAABZg");
	this.shape_313.setTransform(299.1,150.55);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_314.setTransform(287.875,150.675);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f("#2F3542").s().p("AAbBaIgrg7IgOAPIAAAsIgWAAIAAizIAWAAIAABsIAMgOIAngpIAZAAIgvA0IA1BKg");
	this.shape_315.setTransform(276.1,148);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f("#2F3542").s().p("AgnA1QgKgMAAgXIAAhSIAWAAIAABRQAAAdAXAAQAYAAAIgSIAAhcIAWAAIAAB+IgVAAIAAgMQgNAPgXAAQgVAAgLgMg");
	this.shape_316.setTransform(262.55,150.775);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f("#2F3542").s().p("AglAxQgQgRAAgdIAAgDQAAgSAHgPQAIgPANgIQAMgJAPAAQAYAAAOAQQAOARAAAeIAAAIIhVAAQAAATALALQAKAMAPAAQAMAAAIgFQAIgEAGgIIANAKQgQAZggAAQgZAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgJgNAAQgNAAgIAKg");
	this.shape_317.setTransform(249.775,150.675);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f("#2F3542").s().p("AglAxQgQgRAAgdIAAgDQAAgSAHgPQAIgPANgIQAMgJAPAAQAYAAAOAQQAOARAAAeIAAAIIhVAAQAAATALALQAKAMAPAAQAMAAAIgFQAIgEAGgIIANAKQgQAZggAAQgZAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgJgNAAQgNAAgIAKg");
	this.shape_318.setTransform(231.175,150.675);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f("#2F3542").s().p("ABDBAIAAhSQAAgOgGgGQgGgHgPAAQgMAAgIAHQgIAHgBAMIAABTIgVAAIAAhSQAAgbgbAAQgVAAgIASIAABbIgWAAIAAh+IAVAAIAAAPQAOgRAYAAQAaAAAJAVQAGgJAKgGQALgFANgBQAqABABArIAABUg");
	this.shape_319.setTransform(214.175,150.55);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f("#2F3542").s().p("AgZA8QgLgFgGgKQgIgKAAgLIAXAAQAAALAIAHQAIAGANAAQAMAAAHgFQAIgFAAgIQgBgJgGgFQgHgFgPgDQgQgEgKgEQgKgFgFgHQgEgGAAgKQAAgPANgLQAOgLATAAQAVAAAOALQANALAAASIgVAAQgBgJgHgHQgIgGgLAAQgLAAgGAFQgIAFAAAJQABAHAGAEQAGAEAPAEQARAEAJAFQALAEAFAHQAEAHAAAKQAAARgNAKQgOALgVAAQgOAAgNgGg");
	this.shape_320.setTransform(197.4,150.675);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f("#2F3542").s().p("AgKBWIAAh+IAVAAIAAB+gAgIhAQgEgDAAgGQAAgFAEgEQADgDAFgBQAGABAEADQADAEAAAFQAAAGgDADQgEADgGAAQgFAAgDgDg");
	this.shape_321.setTransform(188.375,148.35);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f("#2F3542").s().p("AAcBAIAAhTQAAgNgGgGQgGgHgNAAQgKAAgIAGQgIAFgEAJIAABZIgWAAIAAh+IAVAAIAAAQQAPgRAWgBQApABAAAsIAABTg");
	this.shape_322.setTransform(178.825,150.55);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f("#2F3542").s().p("AgnA3QgMgLAAgQQAAgUAPgKQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAJIgWAAQAAgKAHgJQAHgJALgFQAMgFAMAAQAWAAANALQAMALABATIAAA6QAAARAEAKIAAACIgXAAIgDgNQgPAQgUAAQgSAAgMgLgAgeAZQAAAKAHAGQAHAGAKAAQAKAAAJgGQAJgFAEgIIAAgaIgRAAQgnAAAAAXg");
	this.shape_323.setTransform(165.675,150.675);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f("#2F3542").s().p("AgaBTQgNgGgIgJIAMgOQAOARAUAAQAPAAAJgIQAIgJAAgRIAAgKQgNAPgVAAQgWAAgOgSQgNgSAAgeQAAgdANgSQAOgSAWAAQAWAAANARIABgPIAVAAIAAB7QAAAZgPAOQgPAOgYAAQgNABgNgHgAgWg6QgJANAAAYQAAAVAJALQAIANAQAAQAUgBAJgSIAAg5QgKgSgTAAQgPAAgJAMg");
	this.shape_324.setTransform(152.2,153.05);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f("#2F3542").s().p("AgeBAIAAh+IAWAAIAAAQQAKgRATgBQAHABACABIAAAUIgKgBQgUAAgIASIAABZg");
	this.shape_325.setTransform(142.3,150.55);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f("#2F3542").s().p("AgiBOQgQgKgJgSQgJgTAAgYIAAgLQAAgZAJgTQAIgTAQgKQAQgKATAAQAVAAAPAKQAPAKAJATQAJATgBAZIAAAJQABAagJASQgJATgPAKQgPAKgVAAQgTAAgPgKgAgggzQgNAQAAAdIAAALQAAAeAMARQANAQAUAAQAWAAAMgPQAMgQAAgeIAAgMQAAgegMgQQgMgQgWAAQgUAAgMAQg");
	this.shape_326.setTransform(129.35,148.475);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f("#2F3542").s().p("AgJAJQgEgEABgFQgBgFAEgDQADgEAGAAQAHAAADAEQAEADAAAFQAAAFgEAEQgDAEgHAAQgGAAgDgEg");
	this.shape_327.setTransform(100.05,155.85);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f("#2F3542").s().p("AALBWIAAiQIgrAQIAAgTIA9gYIAEAAIAACrg");
	this.shape_328.setTransform(88.775,148.425);

	this.btnNextDasar1 = new lib.btnKINext();
	this.btnNextDasar1.name = "btnNextDasar1";
	this.btnNextDasar1.setTransform(885.8,504.8);
	new cjs.ButtonHelper(this.btnNextDasar1, 0, 1, 2, false, new lib.btnKINext(), 3);

	this.btnMenuDasar1 = new lib.btnMenuKI();
	this.btnMenuDasar1.name = "btnMenuDasar1";
	this.btnMenuDasar1.setTransform(755.75,504.8);
	new cjs.ButtonHelper(this.btnMenuDasar1, 0, 1, 2, false, new lib.btnMenuKI(), 3);

	this.instance = new lib.Bitmap16();
	this.instance.setTransform(7,4);

	this.instance_1 = new lib.Bitmap5();
	this.instance_1.setTransform(-28,-39);

	this.btnMenuDasar2 = new lib.btnMenuKI();
	this.btnMenuDasar2.name = "btnMenuDasar2";
	this.btnMenuDasar2.setTransform(755.85,504.8);
	new cjs.ButtonHelper(this.btnMenuDasar2, 0, 1, 2, false, new lib.btnMenuKI(), 3);

	this.btnBackDasar2 = new lib.btnKIBack();
	this.btnBackDasar2.name = "btnBackDasar2";
	this.btnBackDasar2.setTransform(885.85,504.8);
	new cjs.ButtonHelper(this.btnBackDasar2, 0, 1, 2, false, new lib.btnKIBack(), 3);

	this.reprod = new lib.repord2();
	this.reprod.name = "reprod";
	this.reprod.setTransform(699.85,433,0.7047,0.7047,0,0,0,0.1,0.1);
	this.reprod.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);
	new cjs.ButtonHelper(this.reprod, 0, 1, 2);

	this.simetri = new lib.tubuh2();
	this.simetri.name = "simetri";
	this.simetri.setTransform(699.85,322.05,0.7047,0.7047,0,0,0,0.1,0.1);
	this.simetri.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);
	new cjs.ButtonHelper(this.simetri, 0, 1, 2);

	this.lapisan = new lib.lapisan2();
	this.lapisan.name = "lapisan";
	this.lapisan.setTransform(699.8,216.8,0.7047,0.7047,0,0,0,0.1,0.1);
	this.lapisan.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);
	new cjs.ButtonHelper(this.lapisan, 0, 1, 2);

	this.rongga = new lib.rongga1();
	this.rongga.name = "rongga";
	this.rongga.setTransform(699.8,107,0.7047,0.7047,0,0,0,0.1,0.1);
	this.rongga.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);
	new cjs.ButtonHelper(this.rongga, 0, 1, 2);

	this.instance_2 = new lib.panah();
	this.instance_2.setTransform(476.25,266.45,1.2111,1.2111);

	this.judulKI = new lib.kriteria();
	this.judulKI.name = "judulKI";
	this.judulKI.setTransform(289.7,270.95,0.6945,0.6945,0,0,0,0.2,0.3);
	this.judulKI.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);

	this.instance_3 = new lib.Bitmap18();
	this.instance_3.setTransform(7,4);

	this.btnMenu3 = new lib.btnMenuKI();
	this.btnMenu3.name = "btnMenu3";
	this.btnMenu3.setTransform(755.85,504.8);
	new cjs.ButtonHelper(this.btnMenu3, 0, 1, 2, false, new lib.btnMenuKI(), 3);

	this.btnBack3 = new lib.btnKIBack();
	this.btnBack3.name = "btnBack3";
	this.btnBack3.setTransform(885.85,504.8);
	new cjs.ButtonHelper(this.btnBack3, 0, 1, 2, false, new lib.btnKIBack(), 3);

	this.instance_4 = new lib.Bitmap6();
	this.instance_4.setTransform(59,75,1.3502,1.3502);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f("#FFFFFF").s().p("AgGAGQgBgCAAgEQAAgCABgDQACgCAEAAQAEAAADACQACADAAACQAAAEgCACQgDACgEAAQgEAAgCgCg");
	this.shape_329.setTransform(480.45,476.275);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f("#FFFFFF").s().p("AARA4IAAg0QAAgIgDgEQgEgEgJAAQgFAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLANAAQAZAAAAAbIAAA0g");
	this.shape_330.setTransform(474.45,471.375);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_331.setTransform(466.175,473.125);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f("#FFFFFF").s().p("AgTAvIgBAJIgNAAIAAhwIAOAAIAAAqQAIgKANAAQAPAAAIAKQAJALAAATIAAABQAAASgJALQgIALgPAAQgOAAgHgKgAgTAAIAAAhQAGANANAAQAJgBAGgHQAFgIAAgPQAAgOgFgGQgGgIgJAAQgNAAgGANg");
	this.shape_332.setTransform(458.05,471.45);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_333.setTransform(449.525,473.125);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAALIgLABQgJAAgEgFg");
	this.shape_334.setTransform(442.775,472.15);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_335.setTransform(434.7,472.975);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_336.setTransform(427.675,473.05);

	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_337.setTransform(419.475,473.125);

	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_338.setTransform(413.525,471.375);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f("#FFFFFF").s().p("AggA4IAAhtIAMAAIABAJQAIgKAOAAQAOgBAIALQAIALAAATIAAABQAAASgIAKQgIAMgOAAQgOgBgIgIIAAAmgAgTghIAAAlQAGALANAAQAIAAAGgHQAGgIAAgPQAAgNgGgHQgGgIgIAAQgNAAgGAKg");
	this.shape_339.setTransform(403.975,474.5);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_340.setTransform(395.475,473.125);

	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAALIgLABQgJAAgEgFg");
	this.shape_341.setTransform(388.725,472.15);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_342.setTransform(382.375,473.125);

	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_343.setTransform(374.1,472.975);

	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f("#FFFFFF").s().p("AgWAfQgKgLAAgSIAAgCQgBgLAFgKQAFgIAHgGQAIgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAHAHQAGAIAKAAQAHAAAEgDQAFgDAEgFIAJAGQgLAQgTAAQgQAAgJgKgAgMgXQgFAGgCALIAnAAIAAgBQgBgLgEgFQgFgGgJAAQgHAAgGAGg");
	this.shape_344.setTransform(366.1,473.05);

	this.shape_345 = new cjs.Shape();
	this.shape_345.graphics.f("#FFFFFF").s().p("AggA4IAAhtIAMAAIABAJQAIgKAOAAQAOgBAIALQAIALAAATIAAABQAAASgIAKQgIAMgOAAQgOgBgIgIIAAAmgAgTghIAAAlQAGALANAAQAIAAAGgHQAGgIAAgPQAAgNgGgHQgGgIgIAAQgNAAgGAKg");
	this.shape_345.setTransform(358.025,474.5);

	this.shape_346 = new cjs.Shape();
	this.shape_346.graphics.f("#FFFFFF").s().p("AASAoIAAgzQgBgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_346.setTransform(345.8,472.975);

	this.shape_347 = new cjs.Shape();
	this.shape_347.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_347.setTransform(337.575,473.05);

	this.shape_348 = new cjs.Shape();
	this.shape_348.graphics.f("#FFFFFF").s().p("AgYAuQgJgMAAgSIAAgBQAAgRAJgLQAIgLAPAAQAMAAAJAJIAAgpIAOAAIAABwIgNAAIgBgJQgIAKgNAAQgOAAgJgLgAgNgFQgGAGAAAQQAAANAGAIQAFAHAJABQANAAAGgMIAAgjQgHgMgMAAQgJAAgFAIg");
	this.shape_348.setTransform(329.1,471.45);

	this.shape_349 = new cjs.Shape();
	this.shape_349.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIANAAIAAAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_349.setTransform(317.2,472.975);

	this.shape_350 = new cjs.Shape();
	this.shape_350.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_350.setTransform(308.975,473.05);

	this.shape_351 = new cjs.Shape();
	this.shape_351.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_351.setTransform(300.825,473.05);

	this.shape_352 = new cjs.Shape();
	this.shape_352.graphics.f("#FFFFFF").s().p("AASAoIAAgzQgBgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_352.setTransform(292.6,472.975);

	this.shape_353 = new cjs.Shape();
	this.shape_353.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgEALIAAA3g");
	this.shape_353.setTransform(286.3,472.975);

	this.shape_354 = new cjs.Shape();
	this.shape_354.graphics.f("#FFFFFF").s().p("AgXAfQgJgLgBgSIAAgCQAAgLAFgKQAFgIAHgGQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAHQAHAIAIAAQAHAAAGgDQAEgDAEgFIAJAGQgKAQgVAAQgPAAgKgKgAgMgXQgFAGgBALIAmAAIAAgBQAAgLgFgFQgGgGgIAAQgHAAgGAGg");
	this.shape_354.setTransform(279.5,473.05);

	this.shape_355 = new cjs.Shape();
	this.shape_355.graphics.f("#FFFFFF").s().p("AgWAeQgKgKAAgTIAAgCQgBgLAFgJQAEgKAIgEQAIgFAKAAQAOAAAIAIQAJAIAAAMIgMAAQgBgHgFgFQgFgFgIAAQgJAAgGAHQgFAIgBAOIAAACQABANAFAHQAGAIAJAAQAIAAAFgFQAFgEABgHIAMAAQAAAIgEAGQgEAFgIAFQgHADgIAAQgPAAgJgLg");
	this.shape_355.setTransform(271.6,473.05);

	this.shape_356 = new cjs.Shape();
	this.shape_356.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_356.setTransform(263.45,472.975);

	this.shape_357 = new cjs.Shape();
	this.shape_357.graphics.f("#FFFFFF").s().p("AgXAfQgKgLAAgSIAAgCQABgLAEgKQAEgIAJgGQAIgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAGAHQAHAIAJAAQAHAAAGgDQAFgDADgFIAIAGQgJAQgVAAQgOAAgLgKgAgMgXQgGAGAAALIAmAAIAAgBQAAgLgGgFQgEgGgJAAQgHAAgGAGg");
	this.shape_357.setTransform(255.45,473.05);

	this.shape_358 = new cjs.Shape();
	this.shape_358.graphics.f("#FFFFFF").s().p("AggA4IAAhtIAMAAIABAJQAIgKAOAAQAOgBAIALQAIALAAATIAAABQAAASgIAKQgIAMgOAAQgOgBgIgIIAAAmgAgTghIAAAlQAGALANAAQAIAAAGgHQAGgIAAgPQAAgNgGgHQgGgIgIAAQgNAAgGAKg");
	this.shape_358.setTransform(247.375,474.5);

	this.shape_359 = new cjs.Shape();
	this.shape_359.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_359.setTransform(235.15,472.975);

	this.shape_360 = new cjs.Shape();
	this.shape_360.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_360.setTransform(226.925,473.05);

	this.shape_361 = new cjs.Shape();
	this.shape_361.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_361.setTransform(220.7,472.975);

	this.shape_362 = new cjs.Shape();
	this.shape_362.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_362.setTransform(213.625,473.125);

	this.shape_363 = new cjs.Shape();
	this.shape_363.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_363.setTransform(207.675,471.375);

	this.shape_364 = new cjs.Shape();
	this.shape_364.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_364.setTransform(201.775,473.05);

	this.shape_365 = new cjs.Shape();
	this.shape_365.graphics.f("#FFFFFF").s().p("AgPAmQgIgEgDgGQgFgGAAgHIAOAAQAAAHAFAEQAGAEAHAAQAIAAAEgDQAFgDAAgFQAAgGgEgDQgEgDgKgDQgKgBgGgDQgGgCgDgFQgDgEAAgGQAAgKAJgGQAHgHANAAQANAAAIAHQAJAGgBAMIgNAAQAAgGgFgEQgFgEgGAAQgHAAgEADQgEADgBAGQAAAFAFACQADADAJACQALACAGADQAHADACAEQADAEAAAHQABAKgJAGQgJAHgNAAQgIAAgIgDg");
	this.shape_365.setTransform(193.8,473.05);

	this.shape_366 = new cjs.Shape();
	this.shape_366.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_366.setTransform(182.175,473.05);

	this.shape_367 = new cjs.Shape();
	this.shape_367.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_367.setTransform(175.95,472.975);

	this.shape_368 = new cjs.Shape();
	this.shape_368.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_368.setTransform(168.925,473.05);

	this.shape_369 = new cjs.Shape();
	this.shape_369.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAALIgLABQgJAAgEgFg");
	this.shape_369.setTransform(162.225,472.15);

	this.shape_370 = new cjs.Shape();
	this.shape_370.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_370.setTransform(155.85,472.975);

	this.shape_371 = new cjs.Shape();
	this.shape_371.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_371.setTransform(147.625,473.05);

	this.shape_372 = new cjs.Shape();
	this.shape_372.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCADgEgBQgDABgCgDg");
	this.shape_372.setTransform(138.05,471.6);

	this.shape_373 = new cjs.Shape();
	this.shape_373.graphics.f("#FFFFFF").s().p("AgYAuQgJgMAAgSIAAgBQAAgRAJgLQAIgLAPAAQANAAAIAJIAAgpIAOAAIAABwIgNAAIgBgJQgIAKgNAAQgOAAgJgLgAgOgFQgFAGAAAQQAAANAFAIQAGAHAJABQANAAAGgMIAAgjQgHgMgMAAQgJAAgGAIg");
	this.shape_373.setTransform(131.8,471.45);

	this.shape_374 = new cjs.Shape();
	this.shape_374.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_374.setTransform(120.775,471.375);

	this.shape_375 = new cjs.Shape();
	this.shape_375.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_375.setTransform(112.375,473.05);

	this.shape_376 = new cjs.Shape();
	this.shape_376.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAALIgLABQgJAAgEgFg");
	this.shape_376.setTransform(105.675,472.15);

	this.shape_377 = new cjs.Shape();
	this.shape_377.graphics.f("#FFFFFF").s().p("AgWAfQgLgLAAgSIAAgCQAAgLAFgKQAFgIAHgGQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAHQAGAIAKAAQAHAAAFgDQAEgDAEgFIAJAGQgKAQgVAAQgPAAgJgKgAgMgXQgFAGgBALIAmAAIAAgBQgBgLgEgFQgGgGgIAAQgHAAgGAGg");
	this.shape_377.setTransform(99.6,473.05);

	this.shape_378 = new cjs.Shape();
	this.shape_378.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_378.setTransform(93.725,471.375);

	this.shape_379 = new cjs.Shape();
	this.shape_379.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_379.setTransform(89.75,472.975);

	this.shape_380 = new cjs.Shape();
	this.shape_380.graphics.f("#FFFFFF").s().p("AgWAfQgLgLAAgSIAAgCQAAgLAFgKQAFgIAHgGQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAHQAGAIAKAAQAHAAAFgDQAEgDAEgFIAJAGQgKAQgVAAQgPAAgJgKgAgMgXQgFAGgBALIAmAAIAAgBQgBgLgEgFQgGgGgIAAQgHAAgGAGg");
	this.shape_380.setTransform(82.95,473.05);

	this.shape_381 = new cjs.Shape();
	this.shape_381.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAALIgLABQgJAAgEgFg");
	this.shape_381.setTransform(76.275,472.15);

	this.shape_382 = new cjs.Shape();
	this.shape_382.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgFgHIAIgIQAJALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgJAJgNAAQgNAAgJgLQgJgLABgTQgBgSAJgLQAJgLAOAAQANAAAJAKIAAgIIAMAAIAABMQABAPgKAJQgJAJgPAAQgHAAgJgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgJAAgFAHg");
	this.shape_382.setTransform(758.6,455.525);

	this.shape_383 = new cjs.Shape();
	this.shape_383.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_383.setTransform(750.4,453.975);

	this.shape_384 = new cjs.Shape();
	this.shape_384.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_384.setTransform(742.175,454.05);

	this.shape_385 = new cjs.Shape();
	this.shape_385.graphics.f("#FFFFFF").s().p("AgXA3IgFgBIAAgLIAEAAQAGAAAEgCQAEgDADgHIADgIIgdhOIAPAAIATA7IASg7IAPAAIggBaQgGAVgQgBg");
	this.shape_385.setTransform(734.525,455.65);

	this.shape_386 = new cjs.Shape();
	this.shape_386.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_386.setTransform(723.15,453.975);

	this.shape_387 = new cjs.Shape();
	this.shape_387.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_387.setTransform(717.2,452.6);

	this.shape_388 = new cjs.Shape();
	this.shape_388.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_388.setTransform(711.275,454.05);

	this.shape_389 = new cjs.Shape();
	this.shape_389.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_389.setTransform(705.375,452.375);

	this.shape_390 = new cjs.Shape();
	this.shape_390.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_390.setTransform(695.7,453.975);

	this.shape_391 = new cjs.Shape();
	this.shape_391.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_391.setTransform(687.475,454.05);

	this.shape_392 = new cjs.Shape();
	this.shape_392.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgFgHIAHgIQAKALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgIAJgOAAQgNAAgJgLQgIgLAAgTQAAgSAIgLQAJgLAOAAQANAAAJAKIAAgIIAMAAIAABMQABAPgKAJQgJAJgPAAQgIAAgIgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgJAAgFAHg");
	this.shape_392.setTransform(679.05,455.525);

	this.shape_393 = new cjs.Shape();
	this.shape_393.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_393.setTransform(672.85,453.975);

	this.shape_394 = new cjs.Shape();
	this.shape_394.graphics.f("#FFFFFF").s().p("AgZAeQgKgMAAgSIAAAAQAAgMAFgJQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAALgEAKQgFAJgIAFQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgIAAgOQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_394.setTransform(665.625,454.05);

	this.shape_395 = new cjs.Shape();
	this.shape_395.graphics.f("#FFFFFF").s().p("AASAoIAAgzQgBgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_395.setTransform(653.5,453.975);

	this.shape_396 = new cjs.Shape();
	this.shape_396.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_396.setTransform(645.275,454.05);

	this.shape_397 = new cjs.Shape();
	this.shape_397.graphics.f("#FFFFFF").s().p("AgYAuQgJgMAAgSIAAgBQAAgRAJgLQAIgLAPAAQAMAAAJAJIAAgpIAOAAIAABwIgNAAIgBgJQgIAKgNAAQgOAAgJgLgAgOgFQgFAGAAAQQAAANAFAIQAGAIAJAAQANAAAGgMIAAgkQgHgKgMgBQgJAAgGAIg");
	this.shape_397.setTransform(636.8,452.45);

	this.shape_398 = new cjs.Shape();
	this.shape_398.graphics.f("#FFFFFF").s().p("AgCAsQgEgFAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAALIgLABQgJAAgEgGg");
	this.shape_398.setTransform(626.425,453.15);

	this.shape_399 = new cjs.Shape();
	this.shape_399.graphics.f("#FFFFFF").s().p("AgZAeQgKgMAAgSIAAAAQAAgMAFgJQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAALgEAKQgFAJgIAFQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgIAAgOQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_399.setTransform(619.925,454.05);

	this.shape_400 = new cjs.Shape();
	this.shape_400.graphics.f("#FFFFFF").s().p("AgCAsQgEgFAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAALIgLABQgJAAgEgGg");
	this.shape_400.setTransform(613.025,453.15);

	this.shape_401 = new cjs.Shape();
	this.shape_401.graphics.f("#FFFFFF").s().p("AgZAeQgKgMAAgSIAAAAQAAgMAFgJQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAALgEAKQgFAJgIAFQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgIAAgOQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_401.setTransform(606.525,454.05);

	this.shape_402 = new cjs.Shape();
	this.shape_402.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_402.setTransform(596.75,452.6);

	this.shape_403 = new cjs.Shape();
	this.shape_403.graphics.f("#FFFFFF").s().p("AgYAuQgIgMAAgSIAAgBQAAgRAIgLQAIgLAOAAQAOAAAIAJIAAgpIANAAIAABwIgMAAIgBgJQgIAKgOAAQgNAAgJgLgAgOgFQgFAGAAAQQAAANAFAIQAGAIAJAAQANAAAGgMIAAgkQgGgKgNgBQgJAAgGAIg");
	this.shape_403.setTransform(590.5,452.45);

	this.shape_404 = new cjs.Shape();
	this.shape_404.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_404.setTransform(582.375,454.05);

	this.shape_405 = new cjs.Shape();
	this.shape_405.graphics.f("#FFFFFF").s().p("AgOBFIAAgLIAGABQAFAAACgDQABgCAAgHIAAhXIAOAAIAABXQAAAXgUAAQgEAAgEgBgAABg4QgBgCAAgEQAAgDABgCQACgCAEAAQAEAAACACQACACAAADQAAAEgCACQgCACgEAAQgEAAgCgCg");
	this.shape_405.setTransform(575.725,454.2);

	this.shape_406 = new cjs.Shape();
	this.shape_406.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIANAAIAAAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_406.setTransform(570.55,453.975);

	this.shape_407 = new cjs.Shape();
	this.shape_407.graphics.f("#FFFFFF").s().p("AgXAfQgJgLgBgSIAAgCQAAgLAFgKQAFgJAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAHQAHAIAIAAQAHAAAGgDQAEgDAEgFIAJAGQgKAQgVAAQgPAAgKgKgAgMgXQgFAGgBALIAmAAIAAgBQAAgLgFgFQgGgGgIAAQgHAAgGAGg");
	this.shape_407.setTransform(562.55,454.05);

	this.shape_408 = new cjs.Shape();
	this.shape_408.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_408.setTransform(551.925,453.975);

	this.shape_409 = new cjs.Shape();
	this.shape_409.graphics.f("#FFFFFF").s().p("AASAoIAAgzQgBgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_409.setTransform(537.5,453.975);

	this.shape_410 = new cjs.Shape();
	this.shape_410.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_410.setTransform(529.275,454.05);

	this.shape_411 = new cjs.Shape();
	this.shape_411.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_411.setTransform(521.925,452.375);

	this.shape_412 = new cjs.Shape();
	this.shape_412.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_412.setTransform(513.525,454.05);

	this.shape_413 = new cjs.Shape();
	this.shape_413.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_413.setTransform(499.175,453.975);

	this.shape_414 = new cjs.Shape();
	this.shape_414.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_414.setTransform(490.45,453.975);

	this.shape_415 = new cjs.Shape();
	this.shape_415.graphics.f("#FFFFFF").s().p("AgWAfQgKgLAAgSIAAgCQgBgLAFgKQAEgJAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAHAHQAGAIAKAAQAGAAAFgDQAFgDAEgFIAIAGQgKAQgTAAQgQAAgJgKgAgMgXQgGAGgBALIAnAAIAAgBQgBgLgEgFQgFgGgJAAQgHAAgGAGg");
	this.shape_415.setTransform(483.65,454.05);

	this.shape_416 = new cjs.Shape();
	this.shape_416.graphics.f("#FFFFFF").s().p("AgYAuQgIgMAAgSIAAgBQAAgRAIgLQAJgLANAAQAOAAAIAJIAAgpIANAAIAABwIgMAAIgBgJQgIAKgOAAQgNAAgJgLgAgNgFQgGAGAAAQQAAANAGAIQAFAIAJAAQANAAAGgMIAAgkQgGgKgNgBQgJAAgFAIg");
	this.shape_416.setTransform(475.2,452.45);

	this.shape_417 = new cjs.Shape();
	this.shape_417.graphics.f("#FFFFFF").s().p("AgZAeQgKgMAAgSIAAAAQAAgMAFgJQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAALgEAKQgFAJgIAFQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgIAAgOQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_417.setTransform(466.875,454.05);

	this.shape_418 = new cjs.Shape();
	this.shape_418.graphics.f("#FFFFFF").s().p("AgPAmQgIgEgEgGQgDgGAAgHIANAAQAAAHAGAEQAEAEAIAAQAHAAAGgDQAEgDAAgFQAAgGgEgDQgEgDgKgCQgKgCgGgDQgGgDgDgEQgDgEAAgGQAAgKAJgGQAHgHAMAAQAOAAAJAHQAHAGABAMIgOAAQAAgGgEgEQgGgEgHAAQgGAAgEADQgFADAAAFQABAGAEACQAEADAIACQALACAGADQAGACADAFQAEAEAAAGQAAALgJAGQgIAHgOAAQgJAAgHgDg");
	this.shape_418.setTransform(458.7,454.05);

	this.shape_419 = new cjs.Shape();
	this.shape_419.graphics.f("#FFFFFF").s().p("AgXAfQgKgLABgSIAAgCQAAgLAEgKQAEgJAJgFQAIgFAIAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAHQAIAIAJAAQAHAAAEgDQAFgDAEgFIAIAGQgKAQgTAAQgPAAgLgKgAgMgXQgFAGgCALIAnAAIAAgBQAAgLgGgFQgEgGgJAAQgHAAgGAGg");
	this.shape_419.setTransform(451,454.05);

	this.shape_420 = new cjs.Shape();
	this.shape_420.graphics.f("#FFFFFF").s().p("AAnA1IAAgpIABgsIgjBVIgKAAIgjhVIACAsIAAApIgOAAIAAhpIASAAIAiBWIAjhWIASAAIAABpg");
	this.shape_420.setTransform(440.4,452.675);

	this.shape_421 = new cjs.Shape();
	this.shape_421.graphics.f("#FFFFFF").s().p("AgGAGQgCgCAAgEQAAgCACgDQADgCADAAQAEAAADACQABADAAACQAAAEgBACQgDACgEAAQgDAAgDgCg");
	this.shape_421.setTransform(428.1,457.275);

	this.shape_422 = new cjs.Shape();
	this.shape_422.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_422.setTransform(419.625,453.975);

	this.shape_423 = new cjs.Shape();
	this.shape_423.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_423.setTransform(410.9,453.975);

	this.shape_424 = new cjs.Shape();
	this.shape_424.graphics.f("#FFFFFF").s().p("AgWAfQgLgLABgSIAAgCQgBgLAFgKQAEgJAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAGAHQAIAIAJAAQAGAAAFgDQAFgDAEgFIAIAGQgKAQgTAAQgPAAgKgKgAgMgXQgGAGgBALIAnAAIAAgBQgBgLgFgFQgEgGgJAAQgHAAgGAGg");
	this.shape_424.setTransform(404.1,454.05);

	this.shape_425 = new cjs.Shape();
	this.shape_425.graphics.f("#FFFFFF").s().p("AgYAuQgIgMAAgSIAAgBQAAgRAIgLQAIgLAOAAQAOAAAIAJIAAgpIANAAIAABwIgMAAIgBgJQgIAKgOAAQgNAAgJgLgAgOgFQgFAGAAAQQAAANAFAIQAGAIAJAAQANAAAGgMIAAgkQgGgKgNgBQgJAAgGAIg");
	this.shape_425.setTransform(395.65,452.45);

	this.shape_426 = new cjs.Shape();
	this.shape_426.graphics.f("#FFFFFF").s().p("AgZAeQgKgMAAgSIAAAAQAAgMAFgJQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAALgEAKQgFAJgIAFQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgIAAgOQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_426.setTransform(387.325,454.05);

	this.shape_427 = new cjs.Shape();
	this.shape_427.graphics.f("#FFFFFF").s().p("AgYAuQgIgMgBgSIAAgBQABgRAIgLQAIgLAOAAQANAAAJAJIAAgpIANAAIAABwIgMAAIgBgJQgIAKgOAAQgNAAgJgLgAgOgFQgFAGAAAQQAAANAFAIQAGAIAJAAQANAAAGgMIAAgkQgGgKgNgBQgJAAgGAIg");
	this.shape_427.setTransform(378.65,452.45);

	this.shape_428 = new cjs.Shape();
	this.shape_428.graphics.f("#FFFFFF").s().p("AASAoIAAgzQgBgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_428.setTransform(370.45,453.975);

	this.shape_429 = new cjs.Shape();
	this.shape_429.graphics.f("#FFFFFF").s().p("AgXAfQgKgLABgSIAAgCQAAgLAEgKQAEgJAJgFQAHgFAJAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAHQAHAIAJAAQAIAAAEgDQAGgDADgFIAIAGQgJAQgVAAQgOAAgLgKgAgMgXQgGAGAAALIAmAAIAAgBQAAgLgGgFQgEgGgJAAQgHAAgGAGg");
	this.shape_429.setTransform(362.45,454.05);

	this.shape_430 = new cjs.Shape();
	this.shape_430.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_430.setTransform(350.55,453.975);

	this.shape_431 = new cjs.Shape();
	this.shape_431.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_431.setTransform(342.325,454.05);

	this.shape_432 = new cjs.Shape();
	this.shape_432.graphics.f("#FFFFFF").s().p("AgYAuQgJgMAAgSIAAgBQAAgRAJgLQAIgLAPAAQANAAAIAJIAAgpIAOAAIAABwIgNAAIgBgJQgIAKgNAAQgOAAgJgLgAgOgFQgFAGAAAQQAAANAFAIQAGAIAJAAQANAAAGgMIAAgkQgHgKgMgBQgJAAgGAIg");
	this.shape_432.setTransform(333.85,452.45);

	this.shape_433 = new cjs.Shape();
	this.shape_433.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_433.setTransform(319.525,453.975);

	this.shape_434 = new cjs.Shape();
	this.shape_434.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_434.setTransform(310.8,453.975);

	this.shape_435 = new cjs.Shape();
	this.shape_435.graphics.f("#FFFFFF").s().p("AgWAfQgKgLAAgSIAAgCQgBgLAFgKQAFgJAHgFQAIgFAJAAQAPAAAJAKQAIAKABATIAAAFIg1AAQAAALAHAHQAGAIAKAAQAHAAAEgDQAFgDAEgFIAJAGQgLAQgTAAQgQAAgJgKgAgMgXQgFAGgCALIAnAAIAAgBQgBgLgEgFQgGgGgIAAQgHAAgGAGg");
	this.shape_435.setTransform(304,454.05);

	this.shape_436 = new cjs.Shape();
	this.shape_436.graphics.f("#FFFFFF").s().p("AgYAuQgJgMABgSIAAgBQgBgRAJgLQAJgLANAAQANAAAJAJIAAgpIANAAIAABwIgMAAIgBgJQgIAKgOAAQgNAAgJgLgAgNgFQgGAGAAAQQAAANAGAIQAFAIAJAAQANAAAGgMIAAgkQgGgKgNgBQgJAAgFAIg");
	this.shape_436.setTransform(295.55,452.45);

	this.shape_437 = new cjs.Shape();
	this.shape_437.graphics.f("#FFFFFF").s().p("AgZAeQgKgMAAgSIAAAAQAAgMAFgJQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAALgEAKQgFAJgIAFQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgIAAgOQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_437.setTransform(287.225,454.05);

	this.shape_438 = new cjs.Shape();
	this.shape_438.graphics.f("#FFFFFF").s().p("AgCAsQgEgFAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAALIgLABQgJAAgEgGg");
	this.shape_438.setTransform(280.325,453.15);

	this.shape_439 = new cjs.Shape();
	this.shape_439.graphics.f("#FFFFFF").s().p("AgXAeQgKgKAAgTIAAgCQABgLAEgJQAEgKAIgEQAIgFAKAAQANAAAJAIQAJAIAAAMIgNAAQAAgHgFgFQgGgFgHAAQgJAAgGAHQgGAIABAOIAAACQgBANAGAHQAGAIAJAAQAIAAAEgFQAGgEAAgHIANAAQAAAIgEAGQgFAFgGAFQgIADgIAAQgPAAgKgLg");
	this.shape_439.setTransform(274.25,454.05);

	this.shape_440 = new cjs.Shape();
	this.shape_440.graphics.f("#FFFFFF").s().p("AgWAfQgLgLABgSIAAgCQgBgLAFgKQAEgJAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAGAHQAIAIAJAAQAGAAAFgDQAFgDAEgFIAIAGQgKAQgTAAQgPAAgKgKgAgMgXQgGAGgBALIAnAAIAAgBQgBgLgFgFQgEgGgJAAQgHAAgGAGg");
	this.shape_440.setTransform(266.4,454.05);

	this.shape_441 = new cjs.Shape();
	this.shape_441.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_441.setTransform(254.575,454.05);

	this.shape_442 = new cjs.Shape();
	this.shape_442.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_442.setTransform(248.35,453.975);

	this.shape_443 = new cjs.Shape();
	this.shape_443.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_443.setTransform(241.325,454.05);

	this.shape_444 = new cjs.Shape();
	this.shape_444.graphics.f("#FFFFFF").s().p("AgCAsQgEgFAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAALIgLABQgJAAgEgGg");
	this.shape_444.setTransform(234.625,453.15);

	this.shape_445 = new cjs.Shape();
	this.shape_445.graphics.f("#FFFFFF").s().p("AASAoIAAgzQgBgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_445.setTransform(228.25,453.975);

	this.shape_446 = new cjs.Shape();
	this.shape_446.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_446.setTransform(220.025,454.05);

	this.shape_447 = new cjs.Shape();
	this.shape_447.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_447.setTransform(214.15,452.6);

	this.shape_448 = new cjs.Shape();
	this.shape_448.graphics.f("#FFFFFF").s().p("AgYAuQgIgMAAgSIAAgBQAAgRAIgLQAJgLANAAQAOAAAIAJIAAgpIANAAIAABwIgMAAIgBgJQgIAKgOAAQgNAAgJgLgAgNgFQgGAGAAAQQAAANAGAIQAFAIAJAAQANAAAGgMIAAgkQgGgKgNgBQgJAAgFAIg");
	this.shape_448.setTransform(207.9,452.45);

	this.shape_449 = new cjs.Shape();
	this.shape_449.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_449.setTransform(196.875,452.375);

	this.shape_450 = new cjs.Shape();
	this.shape_450.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_450.setTransform(188.475,454.05);

	this.shape_451 = new cjs.Shape();
	this.shape_451.graphics.f("#FFFFFF").s().p("AgCAsQgEgFAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAALIgLABQgJAAgEgGg");
	this.shape_451.setTransform(181.775,453.15);

	this.shape_452 = new cjs.Shape();
	this.shape_452.graphics.f("#FFFFFF").s().p("AgXAfQgKgLAAgSIAAgCQABgLAEgKQAEgJAJgFQAHgFAJAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAHQAHAIAJAAQAIAAAEgDQAGgDADgFIAIAGQgJAQgVAAQgOAAgLgKgAgMgXQgGAGAAALIAmAAIAAgBQAAgLgGgFQgEgGgJAAQgHAAgGAGg");
	this.shape_452.setTransform(175.7,454.05);

	this.shape_453 = new cjs.Shape();
	this.shape_453.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_453.setTransform(169.825,452.375);

	this.shape_454 = new cjs.Shape();
	this.shape_454.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_454.setTransform(165.85,453.975);

	this.shape_455 = new cjs.Shape();
	this.shape_455.graphics.f("#FFFFFF").s().p("AgXAfQgKgLAAgSIAAgCQABgLAEgKQAEgJAJgFQAHgFAJAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAHQAIAIAIAAQAIAAAEgDQAGgDADgFIAIAGQgJAQgUAAQgPAAgLgKgAgMgXQgGAGAAALIAmAAIAAgBQAAgLgGgFQgEgGgJAAQgHAAgGAGg");
	this.shape_455.setTransform(159.05,454.05);

	this.shape_456 = new cjs.Shape();
	this.shape_456.graphics.f("#FFFFFF").s().p("AgCAsQgEgFAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAALIgLABQgJAAgEgGg");
	this.shape_456.setTransform(152.375,453.15);

	this.shape_457 = new cjs.Shape();
	this.shape_457.graphics.f("#FFFFFF").s().p("AgJAOQAHgKAAgKIAAgMIAMAAIAAALQAAAHgDAHQgEAIgEADg");
	this.shape_457.setTransform(144.725,458.25);

	this.shape_458 = new cjs.Shape();
	this.shape_458.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_458.setTransform(136.925,453.975);

	this.shape_459 = new cjs.Shape();
	this.shape_459.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_459.setTransform(128.2,453.975);

	this.shape_460 = new cjs.Shape();
	this.shape_460.graphics.f("#FFFFFF").s().p("AgWAfQgKgLAAgSIAAgCQgBgLAFgKQAEgJAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAHAHQAGAIAKAAQAGAAAFgDQAFgDAEgFIAJAGQgLAQgTAAQgQAAgJgKgAgMgXQgGAGgBALIAnAAIAAgBQgBgLgFgFQgEgGgJAAQgHAAgGAGg");
	this.shape_460.setTransform(121.4,454.05);

	this.shape_461 = new cjs.Shape();
	this.shape_461.graphics.f("#FFFFFF").s().p("AgYAuQgIgMAAgSIAAgBQAAgRAIgLQAJgLANAAQAOAAAIAJIAAgpIANAAIAABwIgMAAIgBgJQgIAKgOAAQgNAAgJgLgAgNgFQgGAGAAAQQAAANAGAIQAFAIAJAAQANAAAGgMIAAgkQgGgKgNgBQgJAAgFAIg");
	this.shape_461.setTransform(112.95,452.45);

	this.shape_462 = new cjs.Shape();
	this.shape_462.graphics.f("#FFFFFF").s().p("AgZAeQgKgMAAgSIAAAAQAAgMAFgJQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAALgEAKQgFAJgIAFQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgIAAgOQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_462.setTransform(104.625,454.05);

	this.shape_463 = new cjs.Shape();
	this.shape_463.graphics.f("#FFFFFF").s().p("AgPAmQgIgEgEgGQgDgGAAgHIANAAQAAAHAGAEQAEAEAIAAQAHAAAGgDQAEgDAAgFQAAgGgEgDQgEgDgKgCQgKgCgGgDQgGgDgDgEQgDgEAAgGQAAgKAJgGQAHgHAMAAQAOAAAJAHQAHAGABAMIgOAAQAAgGgEgEQgGgEgHAAQgGAAgEADQgFADAAAFQABAGAEACQAEADAIACQALACAGADQAGACADAFQAEAEAAAGQAAALgJAGQgIAHgOAAQgJAAgHgDg");
	this.shape_463.setTransform(96.45,454.05);

	this.shape_464 = new cjs.Shape();
	this.shape_464.graphics.f("#FFFFFF").s().p("AgWAfQgLgLABgSIAAgCQAAgLAEgKQAEgJAJgFQAIgFAIAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAHQAIAIAIAAQAIAAAEgDQAGgDADgFIAIAGQgKAQgTAAQgPAAgKgKgAgMgXQgFAGgCALIAnAAIAAgBQAAgLgGgFQgEgGgJAAQgHAAgGAGg");
	this.shape_464.setTransform(88.75,454.05);

	this.shape_465 = new cjs.Shape();
	this.shape_465.graphics.f("#FFFFFF").s().p("AAnA1IAAgpIABgsIgjBVIgKAAIgjhVIACAsIAAApIgOAAIAAhpIASAAIAiBWIAjhWIASAAIAABpg");
	this.shape_465.setTransform(78.15,452.675);

	this.shape_466 = new cjs.Shape();
	this.shape_466.graphics.f("#FFFFFF").s().p("AgGAGQgCgCAAgEQAAgCACgDQADgCADAAQAEAAADACQABADAAACQAAAEgBACQgDACgEAAQgDAAgDgCg");
	this.shape_466.setTransform(65.85,457.275);

	this.shape_467 = new cjs.Shape();
	this.shape_467.graphics.f("#FFFFFF").s().p("AgXAvQgKgJAAgNIAOAAQAAAJAFAFQAGAFAIAAQAKAAAFgFQAFgGAAgJQAAgJgGgFQgFgFgKgBIgKAAIAAgKIAKAAQAJAAAFgFQAGgFAAgIQAAgTgTAAQgIAAgFAFQgFAFAAAJIgOAAQAAgNAJgIQAKgJANAAQAPAAAJAIQAIAIAAAOQAAAHgEAHQgFAGgIAEQAJABAFAHQAFAGAAAKQAAAOgKAIQgJAJgPAAQgOAAgJgIg");
	this.shape_467.setTransform(59.625,452.675);

	this.shape_468 = new cjs.Shape();
	this.shape_468.graphics.f("#FFFFFF").s().p("AgGAGQgBgCAAgEQAAgCABgDQACgCAEAAQAEAAADACQACADAAACQAAAEgCACQgDACgEAAQgEAAgCgCg");
	this.shape_468.setTransform(701.85,438.275);

	this.shape_469 = new cjs.Shape();
	this.shape_469.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAOg");
	this.shape_469.setTransform(695.875,435.05);

	this.shape_470 = new cjs.Shape();
	this.shape_470.graphics.f("#FFFFFF").s().p("AgCAsQgEgFAAgKIAAgxIgPAAIAAgJIAPAAIAAgUIAMAAIAAAUIAPAAIAAAJIgPAAIAAAxQAAAEACADQACADAFAAIAHgBIAAALIgLABQgJAAgEgGg");
	this.shape_470.setTransform(689.175,434.15);

	this.shape_471 = new cjs.Shape();
	this.shape_471.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAOg");
	this.shape_471.setTransform(682.875,435.05);

	this.shape_472 = new cjs.Shape();
	this.shape_472.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_472.setTransform(676.65,434.975);

	this.shape_473 = new cjs.Shape();
	this.shape_473.graphics.f("#FFFFFF").s().p("AgUAvIgBAJIgLAAIAAhwIANAAIAAAqQAIgKAOAAQAOAAAIALQAIALAAARIAAACQAAASgIALQgJALgNAAQgOAAgJgKgAgTgBIAAAiQAGANANAAQAJAAAFgIQAGgHAAgQQAAgNgGgHQgFgHgJgBQgOABgFALg");
	this.shape_473.setTransform(669.7,433.45);

	this.shape_474 = new cjs.Shape();
	this.shape_474.graphics.f("#FFFFFF").s().p("AgXAfQgJgLgBgSIAAgCQAAgLAFgKQAFgJAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAGAIQAIAHAIAAQAHAAAGgDQAEgDAEgFIAJAGQgKAQgVAAQgOAAgLgKgAgMgXQgFAGgBALIAmAAIAAgCQAAgJgFgGQgGgGgIAAQgHAAgGAGg");
	this.shape_474.setTransform(661.45,435.05);

	this.shape_475 = new cjs.Shape();
	this.shape_475.graphics.f("#FFFFFF").s().p("AgCAsQgEgFAAgKIAAgxIgPAAIAAgJIAPAAIAAgUIAMAAIAAAUIAPAAIAAAJIgPAAIAAAxQAAAEACADQACADAFAAIAHgBIAAALIgLABQgJAAgEgGg");
	this.shape_475.setTransform(654.775,434.15);

	this.shape_476 = new cjs.Shape();
	this.shape_476.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_476.setTransform(650.4,434.975);

	this.shape_477 = new cjs.Shape();
	this.shape_477.graphics.f("#FFFFFF").s().p("AgXAfQgKgLABgSIAAgCQAAgLAEgKQAEgJAJgFQAHgFAJAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAIQAIAHAJAAQAHAAAEgDQAFgDAEgFIAIAGQgKAQgTAAQgPAAgLgKgAgMgXQgFAGgCALIAnAAIAAgCQAAgJgGgGQgEgGgJAAQgHAAgGAGg");
	this.shape_477.setTransform(643.6,435.05);

	this.shape_478 = new cjs.Shape();
	this.shape_478.graphics.f("#FFFFFF").s().p("AgEAoIgdhOIAOAAIATA7IAUg7IAOAAIgdBOg");
	this.shape_478.setTransform(635.925,435.05);

	this.shape_479 = new cjs.Shape();
	this.shape_479.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgJAAQgFAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_479.setTransform(624.45,434.975);

	this.shape_480 = new cjs.Shape();
	this.shape_480.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAOg");
	this.shape_480.setTransform(616.225,435.05);

	this.shape_481 = new cjs.Shape();
	this.shape_481.graphics.f("#FFFFFF").s().p("AATAoIgTg8IgSA8IgLAAIgXhOIANAAIAQA6IATg6IAJAAIATA7IAQg7IANAAIgXBOg");
	this.shape_481.setTransform(606.5,435.05);

	this.shape_482 = new cjs.Shape();
	this.shape_482.graphics.f("#FFFFFF").s().p("AgWAfQgKgLAAgSIAAgCQgBgLAFgKQAEgJAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAHAIQAGAHAKAAQAGAAAFgDQAFgDAEgFIAIAGQgKAQgTAAQgQAAgJgKgAgMgXQgGAGgBALIAnAAIAAgCQgBgJgEgGQgFgGgJAAQgHAAgGAGg");
	this.shape_482.setTransform(597.05,435.05);

	this.shape_483 = new cjs.Shape();
	this.shape_483.graphics.f("#FFFFFF").s().p("AASA4IAAg0QAAgIgFgEQgDgEgJAAQgFAAgFAEQgFADgCAFIAAA4IgOAAIAAhvIAOAAIAAArQAJgLAMAAQAaAAAAAbIAAA0g");
	this.shape_483.setTransform(588.9,433.375);

	this.shape_484 = new cjs.Shape();
	this.shape_484.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_484.setTransform(576.925,435.125);

	this.shape_485 = new cjs.Shape();
	this.shape_485.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_485.setTransform(570.65,434.975);

	this.shape_486 = new cjs.Shape();
	this.shape_486.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAOg");
	this.shape_486.setTransform(563.625,435.05);

	this.shape_487 = new cjs.Shape();
	this.shape_487.graphics.f("#FFFFFF").s().p("AggA4IAAhtIAMAAIABAIQAIgJAOgBQAOAAAIALQAIALAAATIAAABQAAARgIALQgIALgOAAQgOAAgIgJIAAAngAgTggIAAAkQAGAMANgBQAIABAGgJQAGgHAAgOQAAgNgGgJQgGgHgIAAQgNAAgGALg");
	this.shape_487.setTransform(555.525,436.5);

	this.shape_488 = new cjs.Shape();
	this.shape_488.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_488.setTransform(547.025,435.125);

	this.shape_489 = new cjs.Shape();
	this.shape_489.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_489.setTransform(540.75,434.975);

	this.shape_490 = new cjs.Shape();
	this.shape_490.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAOg");
	this.shape_490.setTransform(533.725,435.05);

	this.shape_491 = new cjs.Shape();
	this.shape_491.graphics.f("#FFFFFF").s().p("AggA4IAAhtIAMAAIABAIQAIgJAOgBQAOAAAIALQAIALAAATIAAABQAAARgIALQgIALgOAAQgOAAgIgJIAAAngAgTggIAAAkQAGAMANgBQAIABAGgJQAGgHAAgOQAAgNgGgJQgGgHgIAAQgNAAgGALg");
	this.shape_491.setTransform(525.625,436.5);

	this.shape_492 = new cjs.Shape();
	this.shape_492.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIANAAIAAAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_492.setTransform(513.4,434.975);

	this.shape_493 = new cjs.Shape();
	this.shape_493.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAOg");
	this.shape_493.setTransform(505.175,435.05);

	this.shape_494 = new cjs.Shape();
	this.shape_494.graphics.f("#FFFFFF").s().p("AgYAuQgJgMABgSIAAgBQgBgRAJgLQAJgLANAAQANAAAJAKIAAgqIANAAIAABwIgMAAIgBgJQgIAKgOAAQgNAAgJgLgAgNgFQgGAHAAAPQAAANAGAIQAFAIAJAAQANAAAGgMIAAgkQgGgKgNgBQgJABgFAHg");
	this.shape_494.setTransform(496.7,433.45);

	this.shape_495 = new cjs.Shape();
	this.shape_495.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_495.setTransform(487.15,433.6);

	this.shape_496 = new cjs.Shape();
	this.shape_496.graphics.f("#FFFFFF").s().p("AgCAsQgEgFAAgKIAAgxIgPAAIAAgJIAPAAIAAgUIAMAAIAAAUIAPAAIAAAJIgPAAIAAAxQAAAEACADQACADAFAAIAHgBIAAALIgLABQgJAAgEgGg");
	this.shape_496.setTransform(482.675,434.15);

	this.shape_497 = new cjs.Shape();
	this.shape_497.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAOg");
	this.shape_497.setTransform(476.375,435.05);

	this.shape_498 = new cjs.Shape();
	this.shape_498.graphics.f("#FFFFFF").s().p("AASA4IAAg0QAAgIgFgEQgDgEgIAAQgGAAgFAEQgFADgCAFIAAA4IgOAAIAAhvIAOAAIAAArQAIgLANAAQAaAAAAAbIAAA0g");
	this.shape_498.setTransform(468.2,433.375);

	this.shape_499 = new cjs.Shape();
	this.shape_499.graphics.f("#FFFFFF").s().p("AgJAOQAHgKAAgKIAAgMIAMAAIAAALQAAAHgDAHQgEAIgEADg");
	this.shape_499.setTransform(458.625,439.25);

	this.shape_500 = new cjs.Shape();
	this.shape_500.graphics.f("#FFFFFF").s().p("AASAoIAAgzQgBgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_500.setTransform(453.25,434.975);

	this.shape_501 = new cjs.Shape();
	this.shape_501.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAOg");
	this.shape_501.setTransform(445.025,435.05);

	this.shape_502 = new cjs.Shape();
	this.shape_502.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAOg");
	this.shape_502.setTransform(436.875,435.05);

	this.shape_503 = new cjs.Shape();
	this.shape_503.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_503.setTransform(428.65,434.975);

	this.shape_504 = new cjs.Shape();
	this.shape_504.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_504.setTransform(422.35,434.975);

	this.shape_505 = new cjs.Shape();
	this.shape_505.graphics.f("#FFFFFF").s().p("AgXAfQgKgLAAgSIAAgCQABgLAEgKQAEgJAJgFQAHgFAJAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAIQAIAHAIAAQAIAAAEgDQAGgDADgFIAIAGQgJAQgVAAQgOAAgLgKgAgMgXQgGAGAAALIAmAAIAAgCQAAgJgGgGQgEgGgJAAQgHAAgGAGg");
	this.shape_505.setTransform(415.55,435.05);

	this.shape_506 = new cjs.Shape();
	this.shape_506.graphics.f("#FFFFFF").s().p("AgXAeQgJgLgBgTIAAgBQABgLAEgJQAEgJAIgFQAIgFAKAAQANAAAJAIQAJAIABAMIgOAAQAAgHgFgFQgGgFgHAAQgKAAgFAIQgGAHABAOIAAACQgBANAGAIQAFAHAKAAQAHAAAGgFQAFgEAAgGIAOAAQgBAHgEAFQgFAGgGAFQgIADgIAAQgPAAgKgLg");
	this.shape_506.setTransform(407.65,435.05);

	this.shape_507 = new cjs.Shape();
	this.shape_507.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgIAAQgGAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_507.setTransform(399.5,434.975);

	this.shape_508 = new cjs.Shape();
	this.shape_508.graphics.f("#FFFFFF").s().p("AgWAfQgLgLABgSIAAgCQgBgLAFgKQAEgJAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAGAIQAIAHAJAAQAGAAAFgDQAFgDAEgFIAIAGQgKAQgTAAQgPAAgKgKgAgMgXQgGAGgBALIAnAAIAAgCQgBgJgFgGQgEgGgJAAQgHAAgGAGg");
	this.shape_508.setTransform(391.5,435.05);

	this.shape_509 = new cjs.Shape();
	this.shape_509.graphics.f("#FFFFFF").s().p("AggA4IAAhtIAMAAIABAIQAIgJAOgBQAOAAAIALQAIALAAATIAAABQAAARgIALQgIALgOAAQgOAAgIgJIAAAngAgTggIAAAkQAGAMANgBQAIABAGgJQAGgHAAgOQAAgNgGgJQgGgHgIAAQgNAAgGALg");
	this.shape_509.setTransform(383.425,436.5);

	this.shape_510 = new cjs.Shape();
	this.shape_510.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIANAAIAAAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_510.setTransform(371.2,434.975);

	this.shape_511 = new cjs.Shape();
	this.shape_511.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAOg");
	this.shape_511.setTransform(362.975,435.05);

	this.shape_512 = new cjs.Shape();
	this.shape_512.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_512.setTransform(356.75,434.975);

	this.shape_513 = new cjs.Shape();
	this.shape_513.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_513.setTransform(349.675,435.125);

	this.shape_514 = new cjs.Shape();
	this.shape_514.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_514.setTransform(343.725,433.375);

	this.shape_515 = new cjs.Shape();
	this.shape_515.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAOg");
	this.shape_515.setTransform(337.825,435.05);

	this.shape_516 = new cjs.Shape();
	this.shape_516.graphics.f("#FFFFFF").s().p("AgPAmQgHgEgFgGQgEgGAAgHIAOAAQABAHAEAEQAFAEAIAAQAIAAAEgDQAFgDAAgGQAAgFgEgDQgFgDgJgCQgKgCgGgDQgGgDgDgEQgDgEAAgGQAAgKAIgGQAJgHAMAAQANAAAJAHQAIAGAAAMIgOAAQAAgGgEgEQgFgEgHAAQgHAAgEADQgFADABAFQAAAFADADQAFADAJACQAKACAGADQAGACAEAFQACAEAAAGQAAALgIAGQgJAHgNAAQgJAAgHgDg");
	this.shape_516.setTransform(329.85,435.05);

	this.shape_517 = new cjs.Shape();
	this.shape_517.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_517.setTransform(320.5,433.6);

	this.shape_518 = new cjs.Shape();
	this.shape_518.graphics.f("#FFFFFF").s().p("AgYAuQgJgMAAgSIAAgBQAAgRAJgLQAJgLAOAAQAMAAAJAKIAAgqIAOAAIAABwIgNAAIgBgJQgIAKgNAAQgOAAgJgLgAgNgFQgGAHAAAPQAAANAGAIQAFAIAJAAQANAAAGgMIAAgkQgHgKgMgBQgJABgFAHg");
	this.shape_518.setTransform(314.25,433.45);

	this.shape_519 = new cjs.Shape();
	this.shape_519.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAOg");
	this.shape_519.setTransform(306.125,435.05);

	this.shape_520 = new cjs.Shape();
	this.shape_520.graphics.f("#FFFFFF").s().p("AgOBFIAAgLIAGABQAFAAACgDQABgCAAgHIAAhXIAOAAIAABXQAAAXgUAAQgEAAgEgBgAABg4QgBgCAAgEQAAgDABgCQACgCAEAAQAEAAACACQACACAAADQAAAEgCACQgCACgEABQgEgBgCgCg");
	this.shape_520.setTransform(299.475,435.2);

	this.shape_521 = new cjs.Shape();
	this.shape_521.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_521.setTransform(294.3,434.975);

	this.shape_522 = new cjs.Shape();
	this.shape_522.graphics.f("#FFFFFF").s().p("AgXAfQgKgLABgSIAAgCQAAgLAEgKQAEgJAJgFQAIgFAIAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAIQAIAHAIAAQAIAAAEgDQAGgDADgFIAIAGQgKAQgTAAQgPAAgLgKgAgMgXQgGAGgBALIAnAAIAAgCQAAgJgGgGQgEgGgJAAQgHAAgGAGg");
	this.shape_522.setTransform(286.3,435.05);

	this.shape_523 = new cjs.Shape();
	this.shape_523.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_523.setTransform(275.675,434.975);

	this.shape_524 = new cjs.Shape();
	this.shape_524.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgEgHIAHgIQAJALAMAAQAJAAAGgGQAFgFAAgKIAAgHQgJAJgMAAQgPAAgIgLQgJgLAAgTQAAgSAJgLQAIgLAPAAQAOAAAHAKIABgIIANAAIAABMQgBAPgIAJQgKAJgPAAQgIAAgIgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgIAAgHAHg");
	this.shape_524.setTransform(261.05,436.525);

	this.shape_525 = new cjs.Shape();
	this.shape_525.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgJAAQgFAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_525.setTransform(252.85,434.975);

	this.shape_526 = new cjs.Shape();
	this.shape_526.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAOg");
	this.shape_526.setTransform(244.625,435.05);

	this.shape_527 = new cjs.Shape();
	this.shape_527.graphics.f("#FFFFFF").s().p("AgTAvIgCAJIgMAAIAAhwIAOAAIAAAqQAIgKANAAQAPAAAIALQAJALAAARIAAACQAAASgJALQgJALgOAAQgOAAgHgKgAgTgBIAAAiQAGANANAAQAJAAAFgIQAGgHAAgQQAAgNgGgHQgFgHgJgBQgNABgGALg");
	this.shape_527.setTransform(236.55,433.45);

	this.shape_528 = new cjs.Shape();
	this.shape_528.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_528.setTransform(225.575,434.975);

	this.shape_529 = new cjs.Shape();
	this.shape_529.graphics.f("#FFFFFF").s().p("AgXAfQgJgLgBgSIAAgCQAAgLAFgKQAFgJAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAIQAHAHAIAAQAHAAAGgDQAEgDAEgFIAJAGQgKAQgVAAQgPAAgKgKgAgMgXQgFAGgBALIAmAAIAAgCQAAgJgFgGQgGgGgIAAQgHAAgGAGg");
	this.shape_529.setTransform(215.15,435.05);

	this.shape_530 = new cjs.Shape();
	this.shape_530.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_530.setTransform(207.825,433.375);

	this.shape_531 = new cjs.Shape();
	this.shape_531.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_531.setTransform(201.35,434.975);

	this.shape_532 = new cjs.Shape();
	this.shape_532.graphics.f("#FFFFFF").s().p("AgWAfQgLgLAAgSIAAgCQAAgLAFgKQAFgJAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAIQAGAHAKAAQAHAAAFgDQAEgDAEgFIAJAGQgKAQgVAAQgPAAgJgKgAgMgXQgFAGgCALIAnAAIAAgCQgBgJgEgGQgGgGgIAAQgHAAgGAGg");
	this.shape_532.setTransform(194.55,435.05);

	this.shape_533 = new cjs.Shape();
	this.shape_533.graphics.f("#FFFFFF").s().p("AgUAvIgBAJIgMAAIAAhwIAOAAIAAAqQAIgKAOAAQAOAAAIALQAJALgBARIAAACQABASgJALQgJALgNAAQgOAAgJgKgAgTgBIAAAiQAGANANAAQAJAAAFgIQAGgHAAgQQAAgNgGgHQgFgHgJgBQgOABgFALg");
	this.shape_533.setTransform(186.5,433.45);

	this.shape_534 = new cjs.Shape();
	this.shape_534.graphics.f("#FFFFFF").s().p("AASAoIAAgzQgBgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_534.setTransform(174.25,434.975);

	this.shape_535 = new cjs.Shape();
	this.shape_535.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAOg");
	this.shape_535.setTransform(166.025,435.05);

	this.shape_536 = new cjs.Shape();
	this.shape_536.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_536.setTransform(158.675,433.375);

	this.shape_537 = new cjs.Shape();
	this.shape_537.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAOg");
	this.shape_537.setTransform(150.275,435.05);

	this.shape_538 = new cjs.Shape();
	this.shape_538.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_538.setTransform(135.925,434.975);

	this.shape_539 = new cjs.Shape();
	this.shape_539.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_539.setTransform(127.2,434.975);

	this.shape_540 = new cjs.Shape();
	this.shape_540.graphics.f("#FFFFFF").s().p("AgWAfQgKgLAAgSIAAgCQgBgLAFgKQAFgJAHgFQAIgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAHAIQAGAHAKAAQAHAAAEgDQAFgDAEgFIAJAGQgLAQgTAAQgQAAgJgKgAgMgXQgFAGgCALIAnAAIAAgCQgBgJgEgGQgFgGgJAAQgHAAgGAGg");
	this.shape_540.setTransform(120.4,435.05);

	this.shape_541 = new cjs.Shape();
	this.shape_541.graphics.f("#FFFFFF").s().p("AgYAuQgJgMABgSIAAgBQgBgRAJgLQAJgLANAAQANAAAJAKIAAgqIANAAIAABwIgMAAIgBgJQgIAKgOAAQgNAAgJgLgAgNgFQgGAHAAAPQAAANAGAIQAFAIAJAAQANAAAGgMIAAgkQgGgKgNgBQgJABgFAHg");
	this.shape_541.setTransform(111.95,433.45);

	this.shape_542 = new cjs.Shape();
	this.shape_542.graphics.f("#FFFFFF").s().p("AgZAeQgKgMAAgSIAAAAQAAgMAFgJQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAALgEAKQgFAIgIAGQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgIAAgOQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_542.setTransform(103.625,435.05);

	this.shape_543 = new cjs.Shape();
	this.shape_543.graphics.f("#FFFFFF").s().p("AgYAuQgIgMAAgSIAAgBQAAgRAIgLQAJgLANAAQAOAAAIAKIAAgqIANAAIAABwIgMAAIgBgJQgIAKgOAAQgNAAgJgLgAgNgFQgGAHAAAPQAAANAGAIQAFAIAJAAQANAAAGgMIAAgkQgGgKgNgBQgJABgFAHg");
	this.shape_543.setTransform(94.95,433.45);

	this.shape_544 = new cjs.Shape();
	this.shape_544.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgIAAQgGAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_544.setTransform(86.75,434.975);

	this.shape_545 = new cjs.Shape();
	this.shape_545.graphics.f("#FFFFFF").s().p("AghA1IAAhpIBCAAIAAALIg0AAIAAAiIAtAAIAAALIgtAAIAAAmIA1AAIAAALg");
	this.shape_545.setTransform(78.675,433.675);

	this.shape_546 = new cjs.Shape();
	this.shape_546.graphics.f("#FFFFFF").s().p("AgFAGQgCgCAAgEQAAgCACgDQACgCADAAQAEAAACACQADADAAACQAAAEgDACQgCACgEAAQgDAAgCgCg");
	this.shape_546.setTransform(743.15,419.275);

	this.shape_547 = new cjs.Shape();
	this.shape_547.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_547.setTransform(737.1,415.975);

	this.shape_548 = new cjs.Shape();
	this.shape_548.graphics.f("#FFFFFF").s().p("AgZAeQgKgMAAgSIAAAAQAAgLAFgKQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAAMgEAJQgFAIgIAGQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgIAAgOQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_548.setTransform(728.675,416.05);

	this.shape_549 = new cjs.Shape();
	this.shape_549.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_549.setTransform(722.25,415.975);

	this.shape_550 = new cjs.Shape();
	this.shape_550.graphics.f("#FFFFFF").s().p("AgXAfQgJgLgBgSIAAgCQAAgLAFgJQAFgKAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAGAIQAIAHAIAAQAHAAAGgDQAEgDAEgFIAJAGQgKAQgVAAQgOAAgLgKgAgMgXQgFAGgBAKIAmAAIAAgBQAAgJgFgGQgGgGgIAAQgHAAgGAGg");
	this.shape_550.setTransform(715.45,416.05);

	this.shape_551 = new cjs.Shape();
	this.shape_551.graphics.f("#FFFFFF").s().p("AgCAsQgEgFAAgKIAAgwIgPAAIAAgKIAPAAIAAgUIAMAAIAAAUIAPAAIAAAKIgPAAIAAAwQAAAFACACQACADAFAAIAHgCIAAAMIgLABQgJAAgEgGg");
	this.shape_551.setTransform(708.775,415.15);

	this.shape_552 = new cjs.Shape();
	this.shape_552.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIANAAIAAAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_552.setTransform(702.4,415.975);

	this.shape_553 = new cjs.Shape();
	this.shape_553.graphics.f("#FFFFFF").s().p("AgXAfQgJgLgBgSIAAgCQAAgLAFgJQAFgKAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAIQAHAHAIAAQAHAAAGgDQAEgDAEgFIAJAGQgKAQgVAAQgPAAgKgKgAgMgXQgFAGgBAKIAmAAIAAgBQAAgJgFgGQgGgGgIAAQgHAAgGAGg");
	this.shape_553.setTransform(694.4,416.05);

	this.shape_554 = new cjs.Shape();
	this.shape_554.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_554.setTransform(687.075,414.375);

	this.shape_555 = new cjs.Shape();
	this.shape_555.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_555.setTransform(680.6,415.975);

	this.shape_556 = new cjs.Shape();
	this.shape_556.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAAMIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_556.setTransform(673.575,416.05);

	this.shape_557 = new cjs.Shape();
	this.shape_557.graphics.f("#FFFFFF").s().p("AgbA6IArhzIAMAAIgsBzg");
	this.shape_557.setTransform(666.25,415.125);

	this.shape_558 = new cjs.Shape();
	this.shape_558.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgEgHIAHgIQAIALANAAQAJAAAGgGQAFgFAAgKIAAgHQgJAJgMAAQgPAAgIgLQgJgLAAgTQAAgSAJgLQAIgLAPAAQAOAAAHAKIABgIIANAAIAABMQAAAPgJAJQgKAJgPAAQgIAAgIgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgJAAgFAHg");
	this.shape_558.setTransform(658.95,417.525);

	this.shape_559 = new cjs.Shape();
	this.shape_559.graphics.f("#FFFFFF").s().p("AASAoIAAgzQgBgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_559.setTransform(650.75,415.975);

	this.shape_560 = new cjs.Shape();
	this.shape_560.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAAMIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_560.setTransform(642.525,416.05);

	this.shape_561 = new cjs.Shape();
	this.shape_561.graphics.f("#FFFFFF").s().p("AgTAvIgBAJIgNAAIAAhwIAOAAIAAAqQAIgKANAAQAPAAAIALQAJALAAARIAAACQAAASgJALQgIALgPAAQgOAAgHgKgAgTgBIAAAiQAGANANAAQAJAAAGgIQAFgHAAgQQAAgNgFgHQgGgHgJAAQgNgBgGAMg");
	this.shape_561.setTransform(634.45,414.45);

	this.shape_562 = new cjs.Shape();
	this.shape_562.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_562.setTransform(623.475,415.975);

	this.shape_563 = new cjs.Shape();
	this.shape_563.graphics.f("#FFFFFF").s().p("AgWAfQgLgLAAgSIAAgCQAAgLAFgJQAFgKAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAIQAGAHAKAAQAGAAAGgDQAEgDAEgFIAJAGQgKAQgVAAQgPAAgJgKgAgMgXQgFAGgCAKIAnAAIAAgBQgBgJgEgGQgGgGgIAAQgHAAgGAGg");
	this.shape_563.setTransform(613.05,416.05);

	this.shape_564 = new cjs.Shape();
	this.shape_564.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_564.setTransform(605.725,414.375);

	this.shape_565 = new cjs.Shape();
	this.shape_565.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_565.setTransform(599.25,415.975);

	this.shape_566 = new cjs.Shape();
	this.shape_566.graphics.f("#FFFFFF").s().p("AgWAfQgKgLAAgSIAAgCQgBgLAFgJQAFgKAHgFQAIgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAHAIQAGAHAKAAQAHAAAEgDQAFgDAEgFIAJAGQgLAQgTAAQgQAAgJgKgAgMgXQgFAGgCAKIAnAAIAAgBQgBgJgEgGQgGgGgIAAQgHAAgGAGg");
	this.shape_566.setTransform(592.45,416.05);

	this.shape_567 = new cjs.Shape();
	this.shape_567.graphics.f("#FFFFFF").s().p("AgTAvIgCAJIgMAAIAAhwIAOAAIAAAqQAIgKANAAQAPAAAIALQAJALAAARIAAACQAAASgJALQgJALgOAAQgOAAgHgKgAgTgBIAAAiQAGANANAAQAJAAAFgIQAGgHAAgQQAAgNgGgHQgFgHgJAAQgOgBgFAMg");
	this.shape_567.setTransform(584.4,414.45);

	this.shape_568 = new cjs.Shape();
	this.shape_568.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgFgHIAIgIQAJALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgIAJgOAAQgNAAgJgLQgIgLAAgTQAAgSAIgLQAJgLAOAAQANAAAJAKIAAgIIAMAAIAABMQABAPgKAJQgJAJgPAAQgIAAgIgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgJAAgFAHg");
	this.shape_568.setTransform(571.95,417.525);

	this.shape_569 = new cjs.Shape();
	this.shape_569.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgIAAQgGAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_569.setTransform(563.75,415.975);

	this.shape_570 = new cjs.Shape();
	this.shape_570.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAAMIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_570.setTransform(555.525,416.05);

	this.shape_571 = new cjs.Shape();
	this.shape_571.graphics.f("#FFFFFF").s().p("AgYAuQgJgMAAgSIAAgBQAAgRAJgLQAIgLAPAAQANAAAIAKIAAgqIAOAAIAABwIgNAAIgBgJQgIAKgNAAQgOAAgJgLgAgOgFQgFAHAAAPQAAANAFAIQAGAIAJAAQANAAAGgMIAAgkQgHgLgMABQgJAAgGAHg");
	this.shape_571.setTransform(547.05,414.45);

	this.shape_572 = new cjs.Shape();
	this.shape_572.graphics.f("#FFFFFF").s().p("AgXAfQgJgLgBgSIAAgCQAAgLAFgJQAFgKAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAIQAHAHAIAAQAHAAAGgDQAEgDAEgFIAJAGQgKAQgVAAQgPAAgKgKgAgMgXQgFAGgBAKIAmAAIAAgBQAAgJgFgGQgGgGgIAAQgHAAgGAGg");
	this.shape_572.setTransform(539.15,416.05);

	this.shape_573 = new cjs.Shape();
	this.shape_573.graphics.f("#FFFFFF").s().p("AgPAlQgHgDgEgGQgFgGAAgHIAOAAQAAAHAFAEQAGAEAHAAQAIAAAEgDQAFgDAAgGQAAgFgEgDQgFgDgJgCQgKgDgGgCQgGgDgDgEQgDgEAAgGQAAgJAIgIQAJgGAMAAQANAAAIAGQAJAIgBAKIgNAAQAAgFgFgEQgFgEgGAAQgHAAgEADQgEAEgBAEQAAAFAEADQAFACAJADQAKACAGADQAHACADAFQACAEAAAGQAAALgIAGQgJAHgNAAQgIAAgIgEg");
	this.shape_573.setTransform(531.2,416.05);

	this.shape_574 = new cjs.Shape();
	this.shape_574.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgFgHIAHgIQAKALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgIAJgOAAQgNAAgJgLQgIgLAAgTQAAgSAIgLQAJgLAOAAQANAAAJAKIAAgIIAMAAIAABMQABAPgKAJQgJAJgPAAQgIAAgIgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgJAAgFAHg");
	this.shape_574.setTransform(519.3,417.525);

	this.shape_575 = new cjs.Shape();
	this.shape_575.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgIAAQgGAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_575.setTransform(511.1,415.975);

	this.shape_576 = new cjs.Shape();
	this.shape_576.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAAMIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_576.setTransform(502.875,416.05);

	this.shape_577 = new cjs.Shape();
	this.shape_577.graphics.f("#FFFFFF").s().p("AgXA3IgFgBIAAgKIAEAAQAGgBAEgCQAEgDADgIIADgHIgdhNIAPAAIATA5IASg5IAPAAIggBZQgGAUgQAAg");
	this.shape_577.setTransform(495.225,417.65);

	this.shape_578 = new cjs.Shape();
	this.shape_578.graphics.f("#FFFFFF").s().p("AASAoIAAgzQgBgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_578.setTransform(483.85,415.975);

	this.shape_579 = new cjs.Shape();
	this.shape_579.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAAMIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_579.setTransform(475.625,416.05);

	this.shape_580 = new cjs.Shape();
	this.shape_580.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAAMIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_580.setTransform(467.475,416.05);

	this.shape_581 = new cjs.Shape();
	this.shape_581.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_581.setTransform(459.25,415.975);

	this.shape_582 = new cjs.Shape();
	this.shape_582.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_582.setTransform(452.95,415.975);

	this.shape_583 = new cjs.Shape();
	this.shape_583.graphics.f("#FFFFFF").s().p("AgXAfQgKgLAAgSIAAgCQABgLAEgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAIQAIAHAIAAQAIAAAEgDQAGgDADgFIAIAGQgJAQgVAAQgOAAgLgKgAgMgXQgGAGAAAKIAmAAIAAgBQAAgJgGgGQgEgGgJAAQgHAAgGAGg");
	this.shape_583.setTransform(446.15,416.05);

	this.shape_584 = new cjs.Shape();
	this.shape_584.graphics.f("#FFFFFF").s().p("AgXAeQgJgKgBgUIAAgBQABgLAEgJQAEgJAIgFQAIgFAKAAQANAAAJAIQAJAIABANIgOAAQAAgIgFgFQgFgFgIAAQgKAAgFAIQgGAHABAOIAAABQgBAOAGAIQAFAHAKAAQAHAAAGgFQAFgEAAgGIAOAAQgBAGgEAGQgFAHgGADQgIAEgIAAQgPAAgKgLg");
	this.shape_584.setTransform(438.25,416.05);

	this.shape_585 = new cjs.Shape();
	this.shape_585.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgIAAQgGAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_585.setTransform(430.1,415.975);

	this.shape_586 = new cjs.Shape();
	this.shape_586.graphics.f("#FFFFFF").s().p("AgWAfQgLgLABgSIAAgCQgBgLAFgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAGAIQAIAHAJAAQAGAAAFgDQAFgDAEgFIAIAGQgKAQgTAAQgPAAgKgKgAgMgXQgGAGgBAKIAnAAIAAgBQgBgJgFgGQgEgGgJAAQgHAAgGAGg");
	this.shape_586.setTransform(422.1,416.05);

	this.shape_587 = new cjs.Shape();
	this.shape_587.graphics.f("#FFFFFF").s().p("AggA4IAAhtIAMAAIABAIQAIgJAOgBQAOAAAIALQAIALAAATIAAACQAAAQgIALQgIALgOAAQgOAAgIgJIAAAngAgTggIAAAlQAGALANgBQAIABAGgJQAGgHAAgOQAAgNgGgJQgGgHgIAAQgNAAgGALg");
	this.shape_587.setTransform(414.025,417.5);

	this.shape_588 = new cjs.Shape();
	this.shape_588.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIANAAIAAAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_588.setTransform(401.8,415.975);

	this.shape_589 = new cjs.Shape();
	this.shape_589.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAAMIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_589.setTransform(393.575,416.05);

	this.shape_590 = new cjs.Shape();
	this.shape_590.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_590.setTransform(387.35,415.975);

	this.shape_591 = new cjs.Shape();
	this.shape_591.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_591.setTransform(380.275,416.125);

	this.shape_592 = new cjs.Shape();
	this.shape_592.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_592.setTransform(374.325,414.375);

	this.shape_593 = new cjs.Shape();
	this.shape_593.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAAMIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_593.setTransform(368.425,416.05);

	this.shape_594 = new cjs.Shape();
	this.shape_594.graphics.f("#FFFFFF").s().p("AgPAlQgHgDgFgGQgEgGAAgHIAOAAQABAHAEAEQAFAEAIAAQAIAAAEgDQAFgDAAgGQAAgFgEgDQgFgDgJgCQgKgDgGgCQgGgDgDgEQgDgEAAgGQAAgJAIgIQAJgGAMAAQANAAAIAGQAJAIAAAKIgOAAQAAgFgEgEQgFgEgHAAQgHAAgEADQgFAEABAEQAAAFADADQAEACAKADQAKACAGADQAGACAEAFQACAEABAGQgBALgIAGQgJAHgNAAQgJAAgHgEg");
	this.shape_594.setTransform(360.45,416.05);

	this.shape_595 = new cjs.Shape();
	this.shape_595.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgCACgDQACgCADAAQAEAAACACQACADAAACQAAAEgCACQgCACgEABQgDgBgCgCg");
	this.shape_595.setTransform(351.1,414.6);

	this.shape_596 = new cjs.Shape();
	this.shape_596.graphics.f("#FFFFFF").s().p("AggA4IAAhtIAMAAIABAIQAIgJAOgBQAOAAAIALQAIALAAATIAAACQAAAQgIALQgIALgOAAQgOAAgIgJIAAAngAgTggIAAAlQAGALANgBQAIABAGgJQAGgHAAgOQAAgNgGgJQgGgHgIAAQgNAAgGALg");
	this.shape_596.setTransform(345.225,417.5);

	this.shape_597 = new cjs.Shape();
	this.shape_597.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_597.setTransform(336.725,416.125);

	this.shape_598 = new cjs.Shape();
	this.shape_598.graphics.f("#FFFFFF").s().p("AgCAsQgEgFAAgKIAAgwIgPAAIAAgKIAPAAIAAgUIAMAAIAAAUIAPAAIAAAKIgPAAIAAAwQAAAFACACQACADAFAAIAHgCIAAAMIgLABQgJAAgEgGg");
	this.shape_598.setTransform(329.975,415.15);

	this.shape_599 = new cjs.Shape();
	this.shape_599.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_599.setTransform(323.625,416.125);

	this.shape_600 = new cjs.Shape();
	this.shape_600.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgIAAQgGAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_600.setTransform(315.35,415.975);

	this.shape_601 = new cjs.Shape();
	this.shape_601.graphics.f("#FFFFFF").s().p("AgWAfQgLgLABgSIAAgCQgBgLAFgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAGAIQAIAHAJAAQAGAAAFgDQAFgDAEgFIAIAGQgKAQgTAAQgPAAgKgKgAgMgXQgGAGgBAKIAnAAIAAgBQgBgJgFgGQgEgGgJAAQgHAAgGAGg");
	this.shape_601.setTransform(307.35,416.05);

	this.shape_602 = new cjs.Shape();
	this.shape_602.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_602.setTransform(296.725,415.975);

	this.shape_603 = new cjs.Shape();
	this.shape_603.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_603.setTransform(282.3,415.975);

	this.shape_604 = new cjs.Shape();
	this.shape_604.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAAMIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_604.setTransform(274.075,416.05);

	this.shape_605 = new cjs.Shape();
	this.shape_605.graphics.f("#FFFFFF").s().p("AgYAuQgIgMAAgSIAAgBQAAgRAIgLQAIgLAOAAQAOAAAIAKIAAgqIANAAIAABwIgMAAIgBgJQgIAKgOAAQgNAAgJgLgAgOgFQgFAHAAAPQAAANAFAIQAGAIAJAAQANAAAGgMIAAgkQgGgLgNABQgJAAgGAHg");
	this.shape_605.setTransform(265.6,414.45);

	this.shape_606 = new cjs.Shape();
	this.shape_606.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_606.setTransform(251.275,415.975);

	this.shape_607 = new cjs.Shape();
	this.shape_607.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAAMIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_607.setTransform(240.625,416.05);

	this.shape_608 = new cjs.Shape();
	this.shape_608.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_608.setTransform(234.725,414.375);

	this.shape_609 = new cjs.Shape();
	this.shape_609.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAAMIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_609.setTransform(228.825,416.05);

	this.shape_610 = new cjs.Shape();
	this.shape_610.graphics.f("#FFFFFF").s().p("AgYAuQgJgMAAgSIAAgBQAAgRAJgLQAJgLAOAAQANAAAIAKIAAgqIAOAAIAABwIgNAAIgBgJQgIAKgNAAQgOAAgJgLgAgOgFQgFAHAAAPQAAANAFAIQAGAIAJAAQANAAAGgMIAAgkQgHgLgMABQgJAAgGAHg");
	this.shape_610.setTransform(220.35,414.45);

	this.shape_611 = new cjs.Shape();
	this.shape_611.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_611.setTransform(214.15,415.975);

	this.shape_612 = new cjs.Shape();
	this.shape_612.graphics.f("#FFFFFF").s().p("AgWAfQgKgLAAgSIAAgCQgBgLAFgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAHAIQAGAHAKAAQAGAAAFgDQAFgDAEgFIAIAGQgKAQgTAAQgQAAgJgKgAgMgXQgGAGgBAKIAnAAIAAgBQgBgJgEgGQgFgGgJAAQgHAAgGAGg");
	this.shape_612.setTransform(207.35,416.05);

	this.shape_613 = new cjs.Shape();
	this.shape_613.graphics.f("#FFFFFF").s().p("AgCAsQgEgFAAgKIAAgwIgPAAIAAgKIAPAAIAAgUIAMAAIAAAUIAPAAIAAAKIgPAAIAAAwQAAAFACACQACADAFAAIAHgCIAAAMIgLABQgJAAgEgGg");
	this.shape_613.setTransform(200.675,415.15);

	this.shape_614 = new cjs.Shape();
	this.shape_614.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_614.setTransform(190.6,415.975);

	this.shape_615 = new cjs.Shape();
	this.shape_615.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAAMIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_615.setTransform(182.375,416.05);

	this.shape_616 = new cjs.Shape();
	this.shape_616.graphics.f("#FFFFFF").s().p("AgPAlQgHgDgFgGQgDgGAAgHIANAAQABAHAFAEQAEAEAIAAQAHAAAGgDQAEgDAAgGQAAgFgEgDQgEgDgKgCQgKgDgGgCQgGgDgDgEQgDgEAAgGQAAgJAIgIQAJgGALAAQAOAAAJAGQAHAIABAKIgOAAQAAgFgEgEQgGgEgHAAQgGAAgEADQgFAEABAEQAAAFADADQAEACAKADQAKACAGADQAGACADAFQAEAEAAAGQAAALgJAGQgIAHgOAAQgIAAgIgEg");
	this.shape_616.setTransform(174.4,416.05);

	this.shape_617 = new cjs.Shape();
	this.shape_617.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgCACgDQACgCADAAQAEAAACACQACADAAACQAAAEgCACQgCACgEABQgDgBgCgCg");
	this.shape_617.setTransform(168.75,414.6);

	this.shape_618 = new cjs.Shape();
	this.shape_618.graphics.f("#FFFFFF").s().p("AggA4IAAhtIAMAAIABAIQAIgJAOgBQAOAAAIALQAIALAAATIAAACQAAAQgIALQgIALgOAAQgOAAgIgJIAAAngAgTggIAAAlQAGALANgBQAIABAGgJQAGgHAAgOQAAgNgGgJQgGgHgIAAQgNAAgGALg");
	this.shape_618.setTransform(162.875,417.5);

	this.shape_619 = new cjs.Shape();
	this.shape_619.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAAMIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_619.setTransform(154.425,416.05);

	this.shape_620 = new cjs.Shape();
	this.shape_620.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_620.setTransform(148.525,414.375);

	this.shape_621 = new cjs.Shape();
	this.shape_621.graphics.f("#FFFFFF").s().p("AgJANQAHgJAAgKIAAgLIAMAAIAAAKQAAAHgDAHQgEAIgEAEg");
	this.shape_621.setTransform(141.275,420.25);

	this.shape_622 = new cjs.Shape();
	this.shape_622.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_622.setTransform(133.475,415.975);

	this.shape_623 = new cjs.Shape();
	this.shape_623.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgFALIAAA3g");
	this.shape_623.setTransform(124.75,415.975);

	this.shape_624 = new cjs.Shape();
	this.shape_624.graphics.f("#FFFFFF").s().p("AgXAfQgJgLgBgSIAAgCQAAgLAFgJQAFgKAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAIQAHAHAIAAQAHAAAGgDQAEgDAEgFIAJAGQgKAQgVAAQgPAAgKgKgAgMgXQgFAGgBAKIAmAAIAAgBQAAgJgFgGQgGgGgIAAQgHAAgGAGg");
	this.shape_624.setTransform(117.95,416.05);

	this.shape_625 = new cjs.Shape();
	this.shape_625.graphics.f("#FFFFFF").s().p("AgYAuQgJgMAAgSIAAgBQAAgRAJgLQAJgLAOAAQAMAAAJAKIAAgqIAOAAIAABwIgNAAIgBgJQgIAKgNAAQgOAAgJgLgAgNgFQgGAHAAAPQAAANAGAIQAFAIAJAAQANAAAGgMIAAgkQgHgLgMABQgJAAgFAHg");
	this.shape_625.setTransform(109.5,414.45);

	this.shape_626 = new cjs.Shape();
	this.shape_626.graphics.f("#FFFFFF").s().p("AgZAeQgKgMAAgSIAAAAQAAgLAFgKQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAAMgEAJQgFAIgIAGQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgIAAgOQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_626.setTransform(101.175,416.05);

	this.shape_627 = new cjs.Shape();
	this.shape_627.graphics.f("#FFFFFF").s().p("AgYAuQgJgMABgSIAAgBQgBgRAJgLQAJgLANAAQANAAAJAKIAAgqIANAAIAABwIgMAAIgBgJQgIAKgOAAQgNAAgJgLgAgNgFQgGAHAAAPQAAANAGAIQAFAIAJAAQANAAAGgMIAAgkQgGgLgNABQgJAAgFAHg");
	this.shape_627.setTransform(92.5,414.45);

	this.shape_628 = new cjs.Shape();
	this.shape_628.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_628.setTransform(84.3,415.975);

	this.shape_629 = new cjs.Shape();
	this.shape_629.graphics.f("#FFFFFF").s().p("AghA1IAAhpIBCAAIAAALIg0AAIAAAiIAtAAIAAALIgtAAIAAAmIA1AAIAAALg");
	this.shape_629.setTransform(76.225,414.675);

	this.shape_630 = new cjs.Shape();
	this.shape_630.graphics.f("#FFFFFF").s().p("AgGAGQgCgCAAgEQAAgCACgDQADgCADAAQAEAAADACQABADAAACQAAAEgBACQgDACgEAAQgDAAgDgCg");
	this.shape_630.setTransform(65.85,419.275);

	this.shape_631 = new cjs.Shape();
	this.shape_631.graphics.f("#FFFFFF").s().p("AghA2IAAgKIAkgpQAIgIADgGQADgGAAgGQAAgJgFgEQgFgGgHAAQgKAAgGAGQgFAGAAAKIgOAAQAAgPAKgJQAJgJAQAAQAOAAAIAHQAJAJAAAMQAAAQgUAVIgcAfIA1AAIAAALg");
	this.shape_631.setTransform(59.825,414.6);

	this.shape_632 = new cjs.Shape();
	this.shape_632.graphics.f("#FFFFFF").s().p("AgGAGQgCgCAAgEQAAgCACgDQACgCAEAAQAEAAADACQACADAAACQAAAEgCACQgDACgEAAQgEAAgCgCg");
	this.shape_632.setTransform(161.5,400.275);

	this.shape_633 = new cjs.Shape();
	this.shape_633.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_633.setTransform(155.45,396.975);

	this.shape_634 = new cjs.Shape();
	this.shape_634.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_634.setTransform(147.225,397.05);

	this.shape_635 = new cjs.Shape();
	this.shape_635.graphics.f("#FFFFFF").s().p("AATAoIgTg7IgSA7IgLAAIgXhOIAOAAIAPA5IATg5IAKAAIASA7IAQg7IANAAIgXBOg");
	this.shape_635.setTransform(137.5,397.05);

	this.shape_636 = new cjs.Shape();
	this.shape_636.graphics.f("#FFFFFF").s().p("AgWAfQgKgLAAgSIAAgCQgBgLAFgJQAFgKAHgFQAIgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAHAIQAGAHAKAAQAHAAAEgDQAFgDAEgFIAJAHQgLAPgTAAQgQAAgJgKgAgMgXQgFAGgCAKIAnAAIAAgBQgBgKgEgGQgFgFgJAAQgHAAgGAGg");
	this.shape_636.setTransform(128.05,397.05);

	this.shape_637 = new cjs.Shape();
	this.shape_637.graphics.f("#FFFFFF").s().p("AASA4IAAg0QAAgIgFgEQgDgEgIAAQgGAAgFAEQgFADgCAFIAAA4IgOAAIAAhvIAOAAIAAArQAIgLANAAQAaAAAAAbIAAA0g");
	this.shape_637.setTransform(119.9,395.375);

	this.shape_638 = new cjs.Shape();
	this.shape_638.graphics.f("#FFFFFF").s().p("AASA4IAAg0QAAgIgFgEQgDgEgJAAQgFAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLANAAQAZAAAAAbIAAA0g");
	this.shape_638.setTransform(107.95,395.375);

	this.shape_639 = new cjs.Shape();
	this.shape_639.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_639.setTransform(99.675,397.125);

	this.shape_640 = new cjs.Shape();
	this.shape_640.graphics.f("#FFFFFF").s().p("AgUAvIgBAJIgMAAIAAhwIAOAAIAAAqQAIgKANAAQAPAAAIALQAJALgBARIAAACQABASgJALQgJALgOAAQgNAAgJgKgAgTgBIAAAiQAGAMANAAQAJABAFgIQAGgHAAgQQAAgNgGgHQgFgHgJAAQgOgBgFAMg");
	this.shape_640.setTransform(91.55,395.45);

	this.shape_641 = new cjs.Shape();
	this.shape_641.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_641.setTransform(83.025,397.125);

	this.shape_642 = new cjs.Shape();
	this.shape_642.graphics.f("#FFFFFF").s().p("AgCAsQgEgFAAgKIAAgwIgPAAIAAgKIAPAAIAAgUIAMAAIAAAUIAPAAIAAAKIgPAAIAAAwQAAAEACADQACACAFAAIAHgBIAAAMIgLABQgJAAgEgGg");
	this.shape_642.setTransform(76.275,396.15);

	this.shape_643 = new cjs.Shape();
	this.shape_643.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_643.setTransform(791.85,377.975);

	this.shape_644 = new cjs.Shape();
	this.shape_644.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_644.setTransform(784.825,378.05);

	this.shape_645 = new cjs.Shape();
	this.shape_645.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_645.setTransform(776.625,378.125);

	this.shape_646 = new cjs.Shape();
	this.shape_646.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_646.setTransform(770.675,376.375);

	this.shape_647 = new cjs.Shape();
	this.shape_647.graphics.f("#FFFFFF").s().p("AggA3IAAhsIAMAAIABAIQAIgKAOAAQAOAAAIALQAIALAAATIAAACQAAAQgIAMQgIALgOgBQgOABgIgKIAAAmgAgTghIAAAmQAGAKANABQAIAAAGgIQAGgIAAgPQAAgMgGgJQgGgHgIAAQgNAAgGAKg");
	this.shape_647.setTransform(761.125,379.5);

	this.shape_648 = new cjs.Shape();
	this.shape_648.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_648.setTransform(752.625,378.125);

	this.shape_649 = new cjs.Shape();
	this.shape_649.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgKIAPAAIAAgUIAMAAIAAAUIAPAAIAAAKIgPAAIAAAwQAAAEACADQACACAFAAIAHgBIAAALIgLACQgJAAgEgFg");
	this.shape_649.setTransform(745.875,377.15);

	this.shape_650 = new cjs.Shape();
	this.shape_650.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_650.setTransform(739.525,378.125);

	this.shape_651 = new cjs.Shape();
	this.shape_651.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_651.setTransform(731.25,377.975);

	this.shape_652 = new cjs.Shape();
	this.shape_652.graphics.f("#FFFFFF").s().p("AgXAeQgKgKABgSIAAgCQAAgLAEgJQAEgKAJgFQAIgFAIAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAGAIQAIAHAIAAQAHAAAFgDQAGgDADgFIAIAHQgKAPgTAAQgPAAgLgLgAgMgXQgGAGgBAKIAnAAIAAgBQAAgKgGgGQgEgFgJAAQgHAAgGAGg");
	this.shape_652.setTransform(723.25,378.05);

	this.shape_653 = new cjs.Shape();
	this.shape_653.graphics.f("#FFFFFF").s().p("AggA3IAAhsIAMAAIABAIQAIgKAOAAQAOAAAIALQAIALAAATIAAACQAAAQgIAMQgIALgOgBQgOABgIgKIAAAmgAgTghIAAAmQAGAKANABQAIAAAGgIQAGgIAAgPQAAgMgGgJQgGgHgIAAQgNAAgGAKg");
	this.shape_653.setTransform(715.175,379.5);

	this.shape_654 = new cjs.Shape();
	this.shape_654.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_654.setTransform(705.3,376.6);

	this.shape_655 = new cjs.Shape();
	this.shape_655.graphics.f("#FFFFFF").s().p("AgYAtQgIgKAAgTIAAgBQAAgRAIgLQAIgLAOAAQANAAAJAKIAAgqIANAAIAABvIgMAAIgBgIQgIAKgOAAQgNAAgJgMgAgOgFQgFAHAAAPQAAANAFAIQAGAIAJgBQANAAAGgLIAAgkQgGgLgNABQgJAAgGAHg");
	this.shape_655.setTransform(699.05,376.45);

	this.shape_656 = new cjs.Shape();
	this.shape_656.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_656.setTransform(690.925,378.05);

	this.shape_657 = new cjs.Shape();
	this.shape_657.graphics.f("#FFFFFF").s().p("AgOBEIAAgKIAGAAQAFABACgDQABgDAAgGIAAhXIAOAAIAABXQAAAXgUAAQgEAAgEgCgAABg4QgBgCAAgDQAAgDABgDQACgCAEAAQAEAAACACQACADAAADQAAADgCACQgCADgEAAQgEAAgCgDg");
	this.shape_657.setTransform(684.275,378.2);

	this.shape_658 = new cjs.Shape();
	this.shape_658.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_658.setTransform(679.1,377.975);

	this.shape_659 = new cjs.Shape();
	this.shape_659.graphics.f("#FFFFFF").s().p("AgWAeQgLgKAAgSIAAgCQAAgLAFgJQAFgKAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAIQAGAHAKAAQAGAAAGgDQAEgDAEgFIAJAHQgKAPgVAAQgPAAgJgLgAgMgXQgFAGgCAKIAnAAIAAgBQgBgKgEgGQgGgFgIAAQgHAAgGAGg");
	this.shape_659.setTransform(671.1,378.05);

	this.shape_660 = new cjs.Shape();
	this.shape_660.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_660.setTransform(660.475,377.975);

	this.shape_661 = new cjs.Shape();
	this.shape_661.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgFgHIAHgIQAKALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgIAJgOAAQgOAAgIgLQgIgLAAgTQAAgSAIgLQAJgLAOAAQANAAAJAKIAAgIIAMAAIAABMQAAAPgJAJQgJAJgPAAQgIAAgIgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgJAAgGAHg");
	this.shape_661.setTransform(645.85,379.525);

	this.shape_662 = new cjs.Shape();
	this.shape_662.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_662.setTransform(637.65,377.975);

	this.shape_663 = new cjs.Shape();
	this.shape_663.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_663.setTransform(629.425,378.05);

	this.shape_664 = new cjs.Shape();
	this.shape_664.graphics.f("#FFFFFF").s().p("AgUAuIAAAJIgMAAIAAhvIANAAIAAAqQAIgKAOAAQAOAAAIALQAIAKAAATIAAABQAAASgIALQgJALgNAAQgOAAgJgLgAgTgBIAAAiQAGAMANAAQAJABAFgIQAGgHAAgQQAAgNgGgHQgFgHgJAAQgOgBgFAMg");
	this.shape_664.setTransform(621.35,376.45);

	this.shape_665 = new cjs.Shape();
	this.shape_665.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_665.setTransform(610.375,377.975);

	this.shape_666 = new cjs.Shape();
	this.shape_666.graphics.f("#FFFFFF").s().p("AgXAeQgKgKABgSIAAgCQAAgLAEgJQAEgKAJgFQAIgFAIAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAGAIQAIAHAIAAQAHAAAFgDQAFgDAEgFIAIAHQgKAPgTAAQgPAAgLgLgAgMgXQgGAGgBAKIAnAAIAAgBQAAgKgGgGQgEgFgJAAQgHAAgGAGg");
	this.shape_666.setTransform(599.95,378.05);

	this.shape_667 = new cjs.Shape();
	this.shape_667.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_667.setTransform(592.625,376.375);

	this.shape_668 = new cjs.Shape();
	this.shape_668.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_668.setTransform(586.15,377.975);

	this.shape_669 = new cjs.Shape();
	this.shape_669.graphics.f("#FFFFFF").s().p("AgXAeQgKgKAAgSIAAgCQABgLAEgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAIQAHAHAJAAQAIAAAEgDQAGgDADgFIAIAHQgKAPgUAAQgOAAgLgLgAgMgXQgGAGAAAKIAmAAIAAgBQAAgKgGgGQgEgFgJAAQgHAAgGAGg");
	this.shape_669.setTransform(579.35,378.05);

	this.shape_670 = new cjs.Shape();
	this.shape_670.graphics.f("#FFFFFF").s().p("AgTAuIgBAJIgMAAIAAhvIANAAIAAAqQAIgKAOAAQAOAAAIALQAIAKAAATIAAABQAAASgIALQgIALgOAAQgPAAgHgLgAgTgBIAAAiQAGAMANAAQAJABAGgIQAFgHAAgQQAAgNgFgHQgGgHgJAAQgNgBgGAMg");
	this.shape_670.setTransform(571.3,376.45);

	this.shape_671 = new cjs.Shape();
	this.shape_671.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_671.setTransform(559.05,377.975);

	this.shape_672 = new cjs.Shape();
	this.shape_672.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_672.setTransform(550.825,378.05);

	this.shape_673 = new cjs.Shape();
	this.shape_673.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_673.setTransform(543.475,376.375);

	this.shape_674 = new cjs.Shape();
	this.shape_674.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_674.setTransform(535.075,378.05);

	this.shape_675 = new cjs.Shape();
	this.shape_675.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_675.setTransform(520.725,377.975);

	this.shape_676 = new cjs.Shape();
	this.shape_676.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_676.setTransform(512,377.975);

	this.shape_677 = new cjs.Shape();
	this.shape_677.graphics.f("#FFFFFF").s().p("AgXAeQgKgKAAgSIAAgCQABgLAEgJQAEgKAIgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAGAIQAHAHAJAAQAIAAAFgDQAFgDADgFIAIAHQgJAPgVAAQgOAAgLgLgAgMgXQgGAGAAAKIAmAAIAAgBQgBgKgFgGQgEgFgJAAQgHAAgGAGg");
	this.shape_677.setTransform(505.2,378.05);

	this.shape_678 = new cjs.Shape();
	this.shape_678.graphics.f("#FFFFFF").s().p("AgYAtQgJgKAAgTIAAgBQAAgRAJgLQAIgLAPAAQANAAAIAKIAAgqIAOAAIAABvIgNAAIgBgIQgIAKgNAAQgOAAgJgMgAgOgFQgFAHAAAPQAAANAFAIQAGAIAJgBQANAAAGgLIAAgkQgHgLgMABQgJAAgGAHg");
	this.shape_678.setTransform(496.75,376.45);

	this.shape_679 = new cjs.Shape();
	this.shape_679.graphics.f("#FFFFFF").s().p("AgZAeQgKgMAAgSIAAAAQAAgLAFgKQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAALgEAJQgFAJgIAGQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgJAAgNQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_679.setTransform(488.425,378.05);

	this.shape_680 = new cjs.Shape();
	this.shape_680.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgKIAPAAIAAgUIAMAAIAAAUIAPAAIAAAKIgPAAIAAAwQAAAEACADQACACAFAAIAHgBIAAALIgLACQgJAAgEgFg");
	this.shape_680.setTransform(481.525,377.15);

	this.shape_681 = new cjs.Shape();
	this.shape_681.graphics.f("#FFFFFF").s().p("AgWAeQgKgKAAgUIAAAAQgBgMAFgJQAEgKAIgEQAIgFAKAAQAOAAAIAIQAJAIAAANIgMAAQgBgIgFgFQgFgFgIAAQgJAAgGAIQgFAHgBAOIAAABQABAOAFAIQAGAHAJAAQAIAAAFgEQAFgFABgGIAMAAQAAAHgEAFQgEAHgIADQgHAEgIAAQgPAAgJgLg");
	this.shape_681.setTransform(475.45,378.05);

	this.shape_682 = new cjs.Shape();
	this.shape_682.graphics.f("#FFFFFF").s().p("AghA1IAAhpIBCAAIAAALIg0AAIAAAiIAtAAIAAALIgtAAIAAAmIA1AAIAAALg");
	this.shape_682.setTransform(467.525,376.675);

	this.shape_683 = new cjs.Shape();
	this.shape_683.graphics.f("#FFFFFF").s().p("AgGAGQgBgCgBgEQABgCABgDQACgCAEAAQAEAAADACQACADAAACQAAAEgCACQgDACgEAAQgEAAgCgCg");
	this.shape_683.setTransform(457.15,381.275);

	this.shape_684 = new cjs.Shape();
	this.shape_684.graphics.f("#FFFFFF").s().p("AgZAeQgKgMAAgSIAAAAQAAgLAFgKQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAALgEAJQgFAJgIAGQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgJAAgNQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_684.setTransform(450.975,378.05);

	this.shape_685 = new cjs.Shape();
	this.shape_685.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_685.setTransform(444.9,376.6);

	this.shape_686 = new cjs.Shape();
	this.shape_686.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_686.setTransform(440.9,377.975);

	this.shape_687 = new cjs.Shape();
	this.shape_687.graphics.f("#FFFFFF").s().p("AgTAuIgBAJIgNAAIAAhvIAOAAIAAAqQAIgKANAAQAPAAAIALQAJAKAAATIAAABQAAASgJALQgJALgOAAQgOAAgHgLgAgTgBIAAAiQAGAMANAAQAJABAGgIQAFgHAAgQQAAgNgFgHQgGgHgJAAQgNgBgGAMg");
	this.shape_687.setTransform(433.95,376.45);

	this.shape_688 = new cjs.Shape();
	this.shape_688.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_688.setTransform(422.975,377.975);

	this.shape_689 = new cjs.Shape();
	this.shape_689.graphics.f("#FFFFFF").s().p("AgWAeQgKgKAAgSIAAgCQgBgLAFgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAHAIQAGAHAKAAQAGAAAFgDQAFgDAEgFIAIAHQgKAPgTAAQgQAAgJgLgAgMgXQgGAGgBAKIAnAAIAAgBQgBgKgEgGQgFgFgJAAQgHAAgGAGg");
	this.shape_689.setTransform(412.55,378.05);

	this.shape_690 = new cjs.Shape();
	this.shape_690.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_690.setTransform(400.65,377.975);

	this.shape_691 = new cjs.Shape();
	this.shape_691.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_691.setTransform(392.425,378.05);

	this.shape_692 = new cjs.Shape();
	this.shape_692.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_692.setTransform(384.275,378.05);

	this.shape_693 = new cjs.Shape();
	this.shape_693.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_693.setTransform(376.925,376.375);

	this.shape_694 = new cjs.Shape();
	this.shape_694.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_694.setTransform(368.475,378.125);

	this.shape_695 = new cjs.Shape();
	this.shape_695.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_695.setTransform(357.775,377.975);

	this.shape_696 = new cjs.Shape();
	this.shape_696.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_696.setTransform(349.05,377.975);

	this.shape_697 = new cjs.Shape();
	this.shape_697.graphics.f("#FFFFFF").s().p("AgWAeQgKgKAAgSIAAgCQgBgLAFgJQAFgKAHgFQAIgFAJAAQAPAAAJAKQAIAKABATIAAAFIg1AAQAAALAHAIQAGAHAKAAQAHAAAEgDQAFgDAEgFIAJAHQgLAPgTAAQgQAAgJgLgAgMgXQgFAGgCAKIAnAAIAAgBQgBgKgEgGQgGgFgIAAQgHAAgGAGg");
	this.shape_697.setTransform(342.25,378.05);

	this.shape_698 = new cjs.Shape();
	this.shape_698.graphics.f("#FFFFFF").s().p("AggA3IAAhsIAMAAIABAIQAIgKAOAAQAOAAAIALQAIALAAATIAAACQAAAQgIAMQgIALgOgBQgOABgIgKIAAAmgAgTghIAAAmQAGAKANABQAIAAAGgIQAGgIAAgPQAAgMgGgJQgGgHgIAAQgNAAgGAKg");
	this.shape_698.setTransform(334.175,379.5);

	this.shape_699 = new cjs.Shape();
	this.shape_699.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_699.setTransform(324.3,376.6);

	this.shape_700 = new cjs.Shape();
	this.shape_700.graphics.f("#FFFFFF").s().p("AggA3IAAhsIAMAAIABAIQAIgKAOAAQAOAAAIALQAIALAAATIAAACQAAAQgIAMQgIALgOgBQgOABgIgKIAAAmgAgTghIAAAmQAGAKANABQAIAAAGgIQAGgIAAgPQAAgMgGgJQgGgHgIAAQgNAAgGAKg");
	this.shape_700.setTransform(318.425,379.5);

	this.shape_701 = new cjs.Shape();
	this.shape_701.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_701.setTransform(309.925,378.125);

	this.shape_702 = new cjs.Shape();
	this.shape_702.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgKIAPAAIAAgUIAMAAIAAAUIAPAAIAAAKIgPAAIAAAwQAAAEACADQACACAFAAIAHgBIAAALIgLACQgJAAgEgFg");
	this.shape_702.setTransform(303.175,377.15);

	this.shape_703 = new cjs.Shape();
	this.shape_703.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_703.setTransform(296.825,378.125);

	this.shape_704 = new cjs.Shape();
	this.shape_704.graphics.f("#FFFFFF").s().p("AASAoIAAgzQgBgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_704.setTransform(288.55,377.975);

	this.shape_705 = new cjs.Shape();
	this.shape_705.graphics.f("#FFFFFF").s().p("AgXAeQgKgKAAgSIAAgCQABgLAEgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAIQAIAHAIAAQAIAAAEgDQAGgDADgFIAIAHQgJAPgVAAQgOAAgLgLgAgMgXQgGAGAAAKIAmAAIAAgBQAAgKgGgGQgEgFgJAAQgHAAgGAGg");
	this.shape_705.setTransform(280.55,378.05);

	this.shape_706 = new cjs.Shape();
	this.shape_706.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgFgHIAIgIQAIALANAAQAJAAAGgGQAFgFAAgKIAAgHQgJAJgNAAQgNAAgJgLQgJgLABgTQgBgSAJgLQAIgLAPAAQAOAAAIAKIAAgIIAMAAIAABMQABAPgKAJQgJAJgPAAQgHAAgJgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgJAAgFAHg");
	this.shape_706.setTransform(268.45,379.525);

	this.shape_707 = new cjs.Shape();
	this.shape_707.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_707.setTransform(260.25,377.975);

	this.shape_708 = new cjs.Shape();
	this.shape_708.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_708.setTransform(252.025,378.05);

	this.shape_709 = new cjs.Shape();
	this.shape_709.graphics.f("#FFFFFF").s().p("AgXA3IgFAAIAAgLIAEAAQAGAAAEgDQAEgDADgIIADgIIgdhMIAPAAIATA5IASg5IAPAAIggBaQgGATgQAAg");
	this.shape_709.setTransform(244.375,379.65);

	this.shape_710 = new cjs.Shape();
	this.shape_710.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgFALIAAA3g");
	this.shape_710.setTransform(235,377.975);

	this.shape_711 = new cjs.Shape();
	this.shape_711.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_711.setTransform(227.975,378.05);

	this.shape_712 = new cjs.Shape();
	this.shape_712.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_712.setTransform(219.775,378.125);

	this.shape_713 = new cjs.Shape();
	this.shape_713.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_713.setTransform(213.825,376.375);

	this.shape_714 = new cjs.Shape();
	this.shape_714.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_714.setTransform(209.85,377.975);

	this.shape_715 = new cjs.Shape();
	this.shape_715.graphics.f("#FFFFFF").s().p("AgXAeQgKgKABgSIAAgCQAAgLAEgJQAEgKAJgFQAIgFAIAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAIQAIAHAIAAQAIAAAEgDQAGgDADgFIAIAHQgKAPgTAAQgPAAgLgLgAgMgXQgFAGgCAKIAnAAIAAgBQAAgKgGgGQgEgFgJAAQgHAAgGAGg");
	this.shape_715.setTransform(203.05,378.05);

	this.shape_716 = new cjs.Shape();
	this.shape_716.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgKIAPAAIAAgUIAMAAIAAAUIAPAAIAAAKIgPAAIAAAwQAAAEACADQACACAFAAIAHgBIAAALIgLACQgJAAgEgFg");
	this.shape_716.setTransform(196.375,377.15);

	this.shape_717 = new cjs.Shape();
	this.shape_717.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_717.setTransform(186.3,377.975);

	this.shape_718 = new cjs.Shape();
	this.shape_718.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_718.setTransform(178.075,378.05);

	this.shape_719 = new cjs.Shape();
	this.shape_719.graphics.f("#FFFFFF").s().p("AgPAlQgHgDgFgGQgEgGAAgHIAOAAQABAHAEAEQAFAEAIAAQAIAAAEgDQAFgEAAgFQAAgFgEgDQgFgDgJgCQgKgDgGgCQgGgCgDgFQgDgEAAgGQAAgJAIgIQAJgGAMAAQANAAAIAGQAJAHAAALIgOAAQAAgFgEgEQgFgEgHAAQgHAAgEADQgFAEABAEQAAAFADADQAFADAJABQAKADAGADQAGADAEAEQADAEAAAGQgBALgIAHQgJAGgNAAQgJAAgHgEg");
	this.shape_719.setTransform(170.1,378.05);

	this.shape_720 = new cjs.Shape();
	this.shape_720.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_720.setTransform(164.45,376.6);

	this.shape_721 = new cjs.Shape();
	this.shape_721.graphics.f("#FFFFFF").s().p("AggA3IAAhsIAMAAIABAIQAIgKAOAAQAOAAAIALQAIALAAATIAAACQAAAQgIAMQgIALgOgBQgOABgIgKIAAAmgAgTghIAAAmQAGAKANABQAIAAAGgIQAGgIAAgPQAAgMgGgJQgGgHgIAAQgNAAgGAKg");
	this.shape_721.setTransform(158.575,379.5);

	this.shape_722 = new cjs.Shape();
	this.shape_722.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_722.setTransform(150.125,378.05);

	this.shape_723 = new cjs.Shape();
	this.shape_723.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_723.setTransform(144.225,376.375);

	this.shape_724 = new cjs.Shape();
	this.shape_724.graphics.f("#FFFFFF").s().p("AgJANQAHgJAAgJIAAgMIAMAAIAAAKQAAAHgDAHQgEAHgEAFg");
	this.shape_724.setTransform(136.975,382.25);

	this.shape_725 = new cjs.Shape();
	this.shape_725.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_725.setTransform(129.175,377.975);

	this.shape_726 = new cjs.Shape();
	this.shape_726.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_726.setTransform(120.45,377.975);

	this.shape_727 = new cjs.Shape();
	this.shape_727.graphics.f("#FFFFFF").s().p("AgWAeQgKgKAAgSIAAgCQgBgLAFgJQAFgKAHgFQAIgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAHAIQAGAHAKAAQAHAAAEgDQAFgDAEgFIAJAHQgLAPgTAAQgQAAgJgLgAgMgXQgFAGgCAKIAnAAIAAgBQgBgKgEgGQgFgFgJAAQgHAAgGAGg");
	this.shape_727.setTransform(113.65,378.05);

	this.shape_728 = new cjs.Shape();
	this.shape_728.graphics.f("#FFFFFF").s().p("AgYAtQgJgKABgTIAAgBQgBgRAJgLQAJgLANAAQANAAAJAKIAAgqIANAAIAABvIgMAAIgBgIQgIAKgOAAQgNAAgJgMgAgNgFQgGAHAAAPQAAANAGAIQAFAIAJgBQANAAAGgLIAAgkQgGgLgNABQgJAAgFAHg");
	this.shape_728.setTransform(105.2,376.45);

	this.shape_729 = new cjs.Shape();
	this.shape_729.graphics.f("#FFFFFF").s().p("AgZAeQgKgMAAgSIAAAAQAAgLAFgKQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAALgEAJQgFAJgIAGQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgJAAgNQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_729.setTransform(96.875,378.05);

	this.shape_730 = new cjs.Shape();
	this.shape_730.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgKIAPAAIAAgUIAMAAIAAAUIAPAAIAAAKIgPAAIAAAwQAAAEACADQACACAFAAIAHgBIAAALIgLACQgJAAgEgFg");
	this.shape_730.setTransform(89.975,377.15);

	this.shape_731 = new cjs.Shape();
	this.shape_731.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_731.setTransform(84.475,376.375);

	this.shape_732 = new cjs.Shape();
	this.shape_732.graphics.f("#FFFFFF").s().p("AghA1IAAhpIBCAAIAAALIg0AAIAAAiIAtAAIAAALIgtAAIAAAmIA1AAIAAALg");
	this.shape_732.setTransform(76.225,376.675);

	this.shape_733 = new cjs.Shape();
	this.shape_733.graphics.f("#FFFFFF").s().p("AgGAGQgCgCAAgEQAAgCACgDQADgCADAAQAEAAADACQABADAAACQAAAEgBACQgDACgEAAQgDAAgDgCg");
	this.shape_733.setTransform(65.85,381.275);

	this.shape_734 = new cjs.Shape();
	this.shape_734.graphics.f("#FFFFFF").s().p("AAHA1IAAhZIgbAKIAAgMIAmgOIADAAIAABpg");
	this.shape_734.setTransform(58.85,376.65);

	this.shape_735 = new cjs.Shape();
	this.shape_735.graphics.f("#FFFFFF").s().p("AgFAmQgCgCAAgDQAAgEACgCQACgDADAAQAEAAACADQACACAAAEQAAADgCACQgCACgEAAQgDAAgCgCgAgFgaQgCgCAAgEQAAgDACgCQACgDADAAQAEAAACADQACACAAADQAAAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_735.setTransform(360.625,359.05);

	this.shape_736 = new cjs.Shape();
	this.shape_736.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_736.setTransform(354.675,359.125);

	this.shape_737 = new cjs.Shape();
	this.shape_737.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgKIAPAAIAAgUIAMAAIAAAUIAPAAIAAAKIgPAAIAAAwQAAAEACADQACADAFgBIAHgBIAAALIgLACQgJAAgEgFg");
	this.shape_737.setTransform(347.925,358.15);

	this.shape_738 = new cjs.Shape();
	this.shape_738.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgEACgCQACgCADAAQAEAAACACQACACAAAEQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_738.setTransform(343.9,357.6);

	this.shape_739 = new cjs.Shape();
	this.shape_739.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_739.setTransform(337.975,359.05);

	this.shape_740 = new cjs.Shape();
	this.shape_740.graphics.f("#FFFFFF").s().p("AgXA4IgFgBIAAgLIAEAAQAGAAAEgDQAEgDADgIIADgIIgdhMIAPAAIATA5IASg5IAPAAIggBaQgGATgQABg");
	this.shape_740.setTransform(330.325,360.65);

	this.shape_741 = new cjs.Shape();
	this.shape_741.graphics.f("#FFFFFF").s().p("AgJANQAHgJAAgJIAAgMIAMAAIAAAKQAAAHgDAHQgEAHgEAFg");
	this.shape_741.setTransform(321.375,363.25);

	this.shape_742 = new cjs.Shape();
	this.shape_742.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_742.setTransform(316.875,357.375);

	this.shape_743 = new cjs.Shape();
	this.shape_743.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgEACgCQACgCADAAQAEAAACACQACACAAAEQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_743.setTransform(310.75,357.6);

	this.shape_744 = new cjs.Shape();
	this.shape_744.graphics.f("#FFFFFF").s().p("AASAoIAAgzQgBgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_744.setTransform(304.75,358.975);

	this.shape_745 = new cjs.Shape();
	this.shape_745.graphics.f("#FFFFFF").s().p("AgZAeQgKgLAAgTIAAAAQAAgMAFgJQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAALgEAJQgFAKgIAFQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgJAAgNQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_745.setTransform(296.325,359.05);

	this.shape_746 = new cjs.Shape();
	this.shape_746.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgEACgCQACgCADAAQAEAAACACQACACAAAEQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_746.setTransform(290.25,357.6);

	this.shape_747 = new cjs.Shape();
	this.shape_747.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_747.setTransform(286.25,358.975);

	this.shape_748 = new cjs.Shape();
	this.shape_748.graphics.f("#FFFFFF").s().p("AgTAuIgCAJIgMAAIAAhvIAOAAIAAAqQAIgKANAAQAPAAAIALQAJAKAAATIAAABQAAASgJALQgJALgOAAQgOAAgHgLgAgTgBIAAAiQAGAMANAAQAJAAAFgHQAGgIAAgPQAAgNgGgHQgFgIgJABQgOAAgFALg");
	this.shape_748.setTransform(279.3,357.45);

	this.shape_749 = new cjs.Shape();
	this.shape_749.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_749.setTransform(268.325,358.975);

	this.shape_750 = new cjs.Shape();
	this.shape_750.graphics.f("#FFFFFF").s().p("AgXAeQgJgKgBgSIAAgCQAAgLAFgJQAFgJAHgGQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAAMAHAGQAHAIAIAAQAHAAAGgDQAEgDAEgFIAJAHQgKAPgVAAQgPAAgKgLgAgMgXQgFAGgBAKIAmAAIAAgBQAAgJgFgHQgGgFgIAAQgHAAgGAGg");
	this.shape_750.setTransform(257.9,359.05);

	this.shape_751 = new cjs.Shape();
	this.shape_751.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgJAAQgFAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_751.setTransform(246,358.975);

	this.shape_752 = new cjs.Shape();
	this.shape_752.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_752.setTransform(237.775,359.05);

	this.shape_753 = new cjs.Shape();
	this.shape_753.graphics.f("#FFFFFF").s().p("AgPAlQgIgDgDgGQgFgGAAgHIAOAAQAAAHAFAEQAGAEAHAAQAIAAAEgDQAFgEAAgFQAAgFgEgDQgEgDgKgDQgKgCgGgCQgGgCgDgFQgDgEAAgGQAAgJAJgIQAHgGANAAQANAAAIAGQAJAIgBAKIgNAAQAAgFgFgEQgFgEgGAAQgHAAgEADQgEAEgBAFQAAAEAFADQADACAJACQALADAGADQAHADACAEQADAEAAAHQABAKgJAHQgJAGgNAAQgIAAgIgEg");
	this.shape_753.setTransform(229.8,359.05);

	this.shape_754 = new cjs.Shape();
	this.shape_754.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgEACgCQACgCADAAQAEAAACACQACACAAAEQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_754.setTransform(224.15,357.6);

	this.shape_755 = new cjs.Shape();
	this.shape_755.graphics.f("#FFFFFF").s().p("AggA3IAAhsIAMAAIABAIQAIgKAOABQAOAAAIAKQAIALAAATIAAACQAAAQgIAMQgIALgOgBQgOABgIgJIAAAlgAgTghIAAAmQAGAKANABQAIgBAGgHQAGgIAAgPQAAgMgGgIQgGgIgIAAQgNAAgGAKg");
	this.shape_755.setTransform(218.275,360.5);

	this.shape_756 = new cjs.Shape();
	this.shape_756.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_756.setTransform(209.825,359.05);

	this.shape_757 = new cjs.Shape();
	this.shape_757.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_757.setTransform(203.925,357.375);

	this.shape_758 = new cjs.Shape();
	this.shape_758.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_758.setTransform(191.825,358.975);

	this.shape_759 = new cjs.Shape();
	this.shape_759.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_759.setTransform(181.175,359.05);

	this.shape_760 = new cjs.Shape();
	this.shape_760.graphics.f("#FFFFFF").s().p("AgWAeQgLgLABgSIAAgBQgBgMAFgJQAEgJAIgFQAIgFAKAAQANAAAJAIQAJAIAAANIgMAAQgBgIgFgFQgGgFgHAAQgKAAgFAHQgGAIAAAOIAAABQAAAOAGAHQAFAIAKAAQAIAAAEgEQAGgFABgGIAMAAQAAAHgEAFQgEAGgIAEQgHAEgIAAQgPAAgJgLg");
	this.shape_760.setTransform(173.25,359.05);

	this.shape_761 = new cjs.Shape();
	this.shape_761.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_761.setTransform(165.175,359.05);

	this.shape_762 = new cjs.Shape();
	this.shape_762.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_762.setTransform(154.525,358.975);

	this.shape_763 = new cjs.Shape();
	this.shape_763.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_763.setTransform(140.175,359.05);

	this.shape_764 = new cjs.Shape();
	this.shape_764.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgFgHIAIgIQAJALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgJAJgNAAQgNAAgJgLQgJgLABgTQgBgSAJgLQAJgLAOAAQANAAAJAKIAAgIIAMAAIAABMQABAPgKAJQgJAJgPAAQgHAAgJgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgJAAgFAHg");
	this.shape_764.setTransform(131.75,360.525);

	this.shape_765 = new cjs.Shape();
	this.shape_765.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgEACgCQACgCADAAQAEAAACACQACACAAAEQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_765.setTransform(125.9,357.6);

	this.shape_766 = new cjs.Shape();
	this.shape_766.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgKIAPAAIAAgUIAMAAIAAAUIAPAAIAAAKIgPAAIAAAwQAAAEACADQACADAFgBIAHgBIAAALIgLACQgJAAgEgFg");
	this.shape_766.setTransform(121.425,358.15);

	this.shape_767 = new cjs.Shape();
	this.shape_767.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgKIAPAAIAAgUIAMAAIAAAUIAPAAIAAAKIgPAAIAAAwQAAAEACADQACADAFgBIAHgBIAAALIgLACQgJAAgEgFg");
	this.shape_767.setTransform(112.875,358.15);

	this.shape_768 = new cjs.Shape();
	this.shape_768.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_768.setTransform(106.575,359.05);

	this.shape_769 = new cjs.Shape();
	this.shape_769.graphics.f("#FFFFFF").s().p("AggA3IAAhsIAMAAIABAIQAIgKAOABQAOAAAIAKQAIALAAATIAAACQAAAQgIAMQgIALgOgBQgOABgIgJIAAAlgAgTghIAAAmQAGAKANABQAIgBAGgHQAGgIAAgPQAAgMgGgIQgGgIgIAAQgNAAgGAKg");
	this.shape_769.setTransform(98.475,360.5);

	this.shape_770 = new cjs.Shape();
	this.shape_770.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_770.setTransform(90.025,359.05);

	this.shape_771 = new cjs.Shape();
	this.shape_771.graphics.f("#FFFFFF").s().p("AgYAtQgIgKAAgTIAAgBQAAgRAIgLQAIgLAOAAQAOAAAIAJIAAgpIANAAIAABvIgMAAIgBgIQgIAKgOAAQgNAAgJgMgAgOgFQgFAGAAAQQAAANAFAIQAGAHAJAAQANAAAGgLIAAgjQgGgLgNAAQgJgBgGAIg");
	this.shape_771.setTransform(81.55,357.45);

	this.shape_772 = new cjs.Shape();
	this.shape_772.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_772.setTransform(75.35,358.975);

	this.shape_773 = new cjs.Shape();
	this.shape_773.graphics.f("#FFFFFF").s().p("AgWAeQgLgKAAgSIAAgCQAAgLAFgJQAFgJAHgGQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAAMAHAGQAGAIAKAAQAHAAAFgDQAEgDAEgFIAJAHQgKAPgVAAQgPAAgJgLgAgMgXQgFAGgCAKIAnAAIAAgBQgBgJgEgHQgGgFgIAAQgHAAgGAGg");
	this.shape_773.setTransform(68.55,359.05);

	this.shape_774 = new cjs.Shape();
	this.shape_774.graphics.f("#FFFFFF").s().p("AgGA1IAAheIgiAAIAAgLIBRAAIAAALIgiAAIAABeg");
	this.shape_774.setTransform(60.025,357.675);

	this.judulKI_1 = new lib.kotakklasif1();
	this.judulKI_1.name = "judulKI_1";
	this.judulKI_1.setTransform(523.95,413.6,2.3105,2.4406,0,0,0,0.4,0.5);
	this.judulKI_1.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);

	this.shape_775 = new cjs.Shape();
	this.shape_775.graphics.f("#FFFFFF").s().p("AgGAHQgCgDAAgEQAAgDACgCQACgDAEAAQAFAAACADQACACABADQgBAEgCADQgCACgFAAQgEAAgCgCg");
	this.shape_775.setTransform(873.65,295.525);

	this.shape_776 = new cjs.Shape();
	this.shape_776.graphics.f("#FFFFFF").s().p("AgVBOQANgJAIgVQAGgVABgZIAAgCQgBgRgDgPQgDgPgGgMQgHgMgIgGIAEgKQALAGAIAPQAKAOAFARQAFARAAATQAAASgFARQgEARgLAOQgIAPgLAGg");
	this.shape_776.setTransform(868.1,291.475);

	this.shape_777 = new cjs.Shape();
	this.shape_777.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QgBgJgEgFQgEgFgKAAQgJAAgGAFQgGAGgBAIIAAA7IgOAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgPAAIAAhZIAOAAIABAKQAKgMAQAAQATAAAGAPQAFgHAHgEQAHgEAKAAQAeAAAAAgIAAA7g");
	this.shape_777.setTransform(858.15,291.775);

	this.shape_778 = new cjs.Shape();
	this.shape_778.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_778.setTransform(848.275,291.775);

	this.shape_779 = new cjs.Shape();
	this.shape_779.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgLAJgFQAKgHAJAAQASAAAJAMQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLAQgXAAQgRAAgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_779.setTransform(840.525,291.85);

	this.shape_780 = new cjs.Shape();
	this.shape_780.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgVIAAgBQAAgTAKgNQAKgNAQAAQAOABAKAKIAAgvIAPAAIAAB/IgOAAIgBgKQgJALgQAAQgPAAgKgMgAgPgFQgHAHAAARQAAAPAHAJQAGAIAKAAQAPABAHgNIAAgpQgHgMgPAAQgKAAgGAJg");
	this.shape_780.setTransform(830.925,290.05);

	this.shape_781 = new cjs.Shape();
	this.shape_781.graphics.f("#FFFFFF").s().p("AgdAiQgLgMAAgWIAAAAQAAgNAFgKQAGgLAJgFQAJgHALAAQASAAAMANQALANAAAUIAAABQAAANgFAKQgFALgJAGQgKAGgMgBQgSAAgLgMgAgSgYQgGAJgBAQQABAPAGAJQAIAJAKAAQAMAAAGgJQAIgJgBgQQABgPgIgIQgGgKgMAAQgKAAgIAJg");
	this.shape_781.setTransform(821.5,291.85);

	this.shape_782 = new cjs.Shape();
	this.shape_782.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgVIAAgBQAAgTAKgNQAKgNAQAAQAOABAKAKIAAgvIAPAAIAAB/IgOAAIgBgKQgJALgQAAQgPAAgKgMgAgPgFQgHAHAAARQAAAPAHAJQAGAIAKAAQAPABAHgNIAAgpQgHgMgPAAQgKAAgGAJg");
	this.shape_782.setTransform(811.625,290.05);

	this.shape_783 = new cjs.Shape();
	this.shape_783.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_783.setTransform(802.35,291.775);

	this.shape_784 = new cjs.Shape();
	this.shape_784.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgLAJgFQAKgHAJAAQASAAAJAMQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLAQgXAAQgRAAgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_784.setTransform(793.225,291.85);

	this.shape_785 = new cjs.Shape();
	this.shape_785.graphics.f("#FFFFFF").s().p("AgCBDQgTgcAAgnQAAgSAFgRQAFgSAKgOQAJgOALgGIADAKQgNAKgHATQgHATAAAYIAAAGQAAAgAKAXQAHAOAKAIIgDAKQgLgGgKgPg");
	this.shape_785.setTransform(786.15,291.475);

	this.shape_786 = new cjs.Shape();
	this.shape_786.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgJgFgFQgEgFgKAAQgJAAgGAFQgGAGgBAIIAAA7IgOAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgPAAIAAhZIAOAAIABAKQAKgMAQAAQATAAAHAPQAEgHAHgEQAHgEAKAAQAeAAAAAgIAAA7g");
	this.shape_786.setTransform(771.2,291.775);

	this.shape_787 = new cjs.Shape();
	this.shape_787.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgIASAAIAQAAIAAgHQgBgIgEgFQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAFgHQAEgGAIgEQAJgDAIgBQAQAAAJAIQAJAIAAANIAAApQAAANADAGIAAACIgQAAQgBgCgBgIQgLALgOAAQgNABgIgIgAgUASQgBAHAFAEQAFAEAHAAQAHAAAGgDQAHgEADgGIAAgTIgMAAQgbABAAAQg");
	this.shape_787.setTransform(759.1,291.85);

	this.shape_788 = new cjs.Shape();
	this.shape_788.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_788.setTransform(752.425,289.975);

	this.shape_789 = new cjs.Shape();
	this.shape_789.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgIASAAIAPAAIAAgHQAAgIgEgFQgFgEgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgGAFgHQAFgGAHgEQAJgDAIgBQAQAAAJAIQAIAIABANIAAApQAAANADAGIAAACIgQAAQgBgCgBgIQgLALgOAAQgNABgIgIgAgUASQgBAHAFAEQAFAEAIAAQAGAAAGgDQAHgEACgGIAAgTIgLAAQgbABAAAQg");
	this.shape_789.setTransform(745.7,291.85);

	this.shape_790 = new cjs.Shape();
	this.shape_790.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgVIAAgBQAAgTAKgNQAKgNAQAAQAOABAKAKIAAgvIAPAAIAAB/IgOAAIgBgKQgJALgQAAQgPAAgKgMgAgPgFQgHAHAAARQAAAPAHAJQAGAIAKAAQAPABAHgNIAAgpQgHgMgPAAQgKAAgGAJg");
	this.shape_790.setTransform(736.075,290.05);

	this.shape_791 = new cjs.Shape();
	this.shape_791.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_791.setTransform(722.6,291.775);

	this.shape_792 = new cjs.Shape();
	this.shape_792.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAPAAIAAgHQAAgIgFgFQgFgEgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgGAEgHQAFgGAJgEQAIgDAJgBQAPAAAJAIQAIAIABANIAAApQAAANADAGIAAACIgQAAQgCgCAAgIQgLALgNAAQgOABgJgIgAgVASQABAHAEAEQAFAEAHAAQAHAAAHgDQAGgEADgGIAAgTIgNAAQgbABAAAQg");
	this.shape_792.setTransform(713.25,291.85);

	this.shape_793 = new cjs.Shape();
	this.shape_793.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgGAAgJIAPAAQABAIAGAFQAFAEAJAAQAJAAAFgDQAFgEAAgGQAAgGgEgDQgFgEgLgCQgMgDgGgDQgHgDgDgFQgEgFAAgGQAAgLAKgIQAJgHANgBQAQAAAJAIQAKAJAAALIgQAAQAAgGgFgFQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEADQAEADALACQALACAHAEQAIADADAFQAEAFAAAHQAAAMgKAIQgKAGgPAAQgKAAgIgDg");
	this.shape_793.setTransform(704.275,291.85);

	this.shape_794 = new cjs.Shape();
	this.shape_794.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_794.setTransform(697.825,290.225);

	this.shape_795 = new cjs.Shape();
	this.shape_795.graphics.f("#FFFFFF").s().p("AglA/IAAh7IAOAAIABAKQAKgMAPAAQAQAAAJAMQAKANAAAVIAAACQAAATgKANQgJAMgQAAQgPAAgKgKIAAArgAgWglIAAAqQAIANAOAAQAKAAAGgJQAHgJgBgQQABgQgHgIQgGgJgKAAQgOAAgIAMg");
	this.shape_795.setTransform(691.15,293.5);

	this.shape_796 = new cjs.Shape();
	this.shape_796.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAOAAIAAgHQABgIgFgFQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAFgHQAFgGAHgEQAJgDAIgBQAQAAAJAIQAJAIAAANIAAApQAAANADAGIAAACIgQAAQgBgCgBgIQgLALgNAAQgOABgJgIgAgUASQAAAHAEAEQAFAEAIAAQAGAAAGgDQAHgEACgGIAAgTIgLAAQgbABAAAQg");
	this.shape_796.setTransform(681.55,291.85);

	this.shape_797 = new cjs.Shape();
	this.shape_797.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_797.setTransform(674.875,289.975);

	this.shape_798 = new cjs.Shape();
	this.shape_798.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAAAAgIAAA7g");
	this.shape_798.setTransform(663.9,291.775);

	this.shape_799 = new cjs.Shape();
	this.shape_799.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgIATAAIAOAAIAAgHQABgIgFgFQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAFgHQAFgGAHgEQAJgDAIgBQAQAAAJAIQAIAIABANIAAApQAAANADAGIAAACIgQAAQgBgCgBgIQgLALgNAAQgOABgJgIgAgUASQAAAHAEAEQAFAEAIAAQAGAAAGgDQAHgEACgGIAAgTIgLAAQgbABAAAQg");
	this.shape_799.setTransform(654.55,291.85);

	this.shape_800 = new cjs.Shape();
	this.shape_800.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgVIAAgBQAAgTAKgNQAKgNAQAAQAOABAKAKIAAgvIAPAAIAAB/IgOAAIgBgKQgJALgQAAQgPAAgKgMgAgPgFQgHAHAAARQAAAPAHAJQAGAIAKAAQAPABAHgNIAAgpQgHgMgPAAQgKAAgGAJg");
	this.shape_800.setTransform(644.925,290.05);

	this.shape_801 = new cjs.Shape();
	this.shape_801.graphics.f("#FFFFFF").s().p("AgVBOQANgJAIgVQAGgVABgZIAAgCQgBgRgDgPQgDgPgGgMQgHgMgIgGIADgKQAMAGAIAPQAKAOAFARQAFARAAATQAAASgEARQgFARgLAOQgIAPgMAGg");
	this.shape_801.setTransform(632.75,291.475);

	this.shape_802 = new cjs.Shape();
	this.shape_802.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QgBgJgEgFQgEgFgKAAQgJAAgGAFQgGAGgBAIIAAA7IgOAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgPAAIAAhZIAOAAIABAKQAKgMAQAAQAUAAAGAPQAEgHAHgEQAHgEAKAAQAeAAAAAgIAAA7g");
	this.shape_802.setTransform(622.8,291.775);

	this.shape_803 = new cjs.Shape();
	this.shape_803.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_803.setTransform(612.925,291.775);

	this.shape_804 = new cjs.Shape();
	this.shape_804.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgLAJgFQAKgHAJAAQASAAAJAMQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLAQgXAAQgRAAgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_804.setTransform(605.175,291.85);

	this.shape_805 = new cjs.Shape();
	this.shape_805.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgVIAAgBQAAgTAKgNQAKgNAQAAQAOABAKAKIAAgvIAPAAIAAB/IgOAAIgBgKQgJALgQAAQgPAAgKgMgAgPgFQgHAHAAARQAAAPAHAJQAGAIAKAAQAPABAHgNIAAgpQgHgMgPAAQgKAAgGAJg");
	this.shape_805.setTransform(595.575,290.05);

	this.shape_806 = new cjs.Shape();
	this.shape_806.graphics.f("#FFFFFF").s().p("AgcAiQgMgMAAgWIAAAAQAAgNAFgKQAGgLAJgFQAJgHALAAQASAAAMANQALANAAAUIAAABQAAANgFAKQgFALgJAGQgKAGgMgBQgSAAgKgMgAgSgYQgGAJgBAQQABAPAGAJQAIAJAKAAQAMAAAGgJQAIgJgBgQQABgPgIgIQgGgKgMAAQgKAAgIAJg");
	this.shape_806.setTransform(586.15,291.85);

	this.shape_807 = new cjs.Shape();
	this.shape_807.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgGAAgJIAPAAQABAIAGAFQAFAEAJAAQAJAAAFgDQAFgEAAgGQAAgGgEgDQgFgEgLgCQgMgDgGgDQgHgDgDgFQgEgFAAgGQAAgLAKgIQAJgHANgBQAQAAAJAIQAKAJAAALIgQAAQAAgGgFgFQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEADQAEADALACQALACAHAEQAIADADAFQAEAFAAAHQAAAMgKAIQgKAGgPAAQgKAAgIgDg");
	this.shape_807.setTransform(576.925,291.85);

	this.shape_808 = new cjs.Shape();
	this.shape_808.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgLAJgFQAKgHAJAAQASAAAJAMQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLAQgXAAQgRAAgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_808.setTransform(568.125,291.85);

	this.shape_809 = new cjs.Shape();
	this.shape_809.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgJgFgFQgEgFgKAAQgJAAgGAFQgGAGgBAIIAAA7IgOAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgPAAIAAhZIAPAAIAAAKQAKgMARAAQASAAAHAPQAEgHAHgEQAHgEAKAAQAeAAAAAgIAAA7g");
	this.shape_809.setTransform(556.1,291.775);

	this.shape_810 = new cjs.Shape();
	this.shape_810.graphics.f("#FFFFFF").s().p("AgBBDQgUgcAAgnQAAgSAFgRQAFgSAKgOQAJgOALgGIADAKQgNAKgHATQgHATgBAYIAAAGQAAAgALAXQAHAOAKAIIgDAKQgMgGgIgPg");
	this.shape_810.setTransform(546.15,291.475);

	this.shape_811 = new cjs.Shape();
	this.shape_811.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgPAAIAAh/IAPAAIAAAxQAKgNAQAAQAcAAABAfIAAA8g");
	this.shape_811.setTransform(534,289.975);

	this.shape_812 = new cjs.Shape();
	this.shape_812.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgIASAAIAPAAIAAgHQAAgIgEgFQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAFgHQAEgGAIgEQAJgDAJgBQAPAAAJAIQAJAIAAANIAAApQAAANADAGIAAACIgQAAQgBgCgBgIQgLALgOAAQgNABgIgIgAgUASQgBAHAFAEQAFAEAHAAQAHAAAGgDQAHgEACgGIAAgTIgLAAQgbABAAAQg");
	this.shape_812.setTransform(524.65,291.85);

	this.shape_813 = new cjs.Shape();
	this.shape_813.graphics.f("#FFFFFF").s().p("AgSA7QgKgEgFgHIAIgKQALANAOAAQAKAAAGgHQAHgGgBgLIAAgIQgJALgPgBQgPAAgKgMQgKgMAAgWQAAgUAKgNQAJgNARAAQAPAAAJAMIABgKIAOAAIAABXQAAARgKAKQgLALgRgBQgJABgJgFgAgPgoQgGAIgBARQABAPAGAIQAGAIAKAAQAPABAGgNIAAgpQgGgMgPAAQgKAAgGAJg");
	this.shape_813.setTransform(515.1,293.55);

	this.shape_814 = new cjs.Shape();
	this.shape_814.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_814.setTransform(505.8,291.775);

	this.shape_815 = new cjs.Shape();
	this.shape_815.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgLAJgFQAKgHAJAAQASAAAJAMQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLAQgXAAQgRAAgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_815.setTransform(496.675,291.85);

	this.shape_816 = new cjs.Shape();
	this.shape_816.graphics.f("#FFFFFF").s().p("AgCAzQgFgHAAgLIAAg3IgQAAIAAgMIAQAAIAAgVIAOAAIAAAVIARAAIAAAMIgRAAIAAA3QAAAFACADQADACAFAAIAHAAIAAAMIgLABQgKAAgFgFg");
	this.shape_816.setTransform(489.05,290.85);

	this.shape_817 = new cjs.Shape();
	this.shape_817.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_817.setTransform(888.4,262.375);

	this.shape_818 = new cjs.Shape();
	this.shape_818.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQALgHARAAIAQAAIAAgHQgBgIgEgGQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAGgGAIgEQAIgEAJAAQAPABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgCgDAAgGQgLAKgOABQgNAAgIgIgAgVASQAAAHAFAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_818.setTransform(879.05,262.45);

	this.shape_819 = new cjs.Shape();
	this.shape_819.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAFQAFAEAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgDQgFgEgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAJAAAMIgQAAQAAgGgFgGQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPAAQgKgBgIgDg");
	this.shape_819.setTransform(870.075,262.45);

	this.shape_820 = new cjs.Shape();
	this.shape_820.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_820.setTransform(863.625,260.825);

	this.shape_821 = new cjs.Shape();
	this.shape_821.graphics.f("#FFFFFF").s().p("AglA/IAAh8IAOAAIABAKQAKgLAPAAQAQAAAJAMQAKANAAAVIAAABQAAAUgKANQgJAMgQAAQgPAAgJgKIAAArgAgVgkIAAAqQAGALAOABQALAAAGgJQAHgJAAgQQAAgQgHgIQgGgJgLAAQgOAAgGANg");
	this.shape_821.setTransform(856.95,264.1);

	this.shape_822 = new cjs.Shape();
	this.shape_822.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATAAIAPAAIAAgHQAAgIgFgGQgFgEgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgHAEgGQAFgGAJgEQAIgEAJAAQAPABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgDAAgGQgLAKgNABQgOAAgJgIgAgVASQABAHAEAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_822.setTransform(847.35,262.45);

	this.shape_823 = new cjs.Shape();
	this.shape_823.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_823.setTransform(840.675,260.575);

	this.shape_824 = new cjs.Shape();
	this.shape_824.graphics.f("#FFFFFF").s().p("AgLAPQAIgLAAgLIAAgNIAPAAIAAAMQAAAIgFAIQgEAIgFAFg");
	this.shape_824.setTransform(827.65,267.25);

	this.shape_825 = new cjs.Shape();
	this.shape_825.graphics.f("#FFFFFF").s().p("AgVBOQANgJAHgVQAIgVAAgZIAAgCQgBgRgDgPQgDgPgGgMQgGgMgJgGIADgKQAMAGAJAPQAJAOAFARQAFARAAATQAAASgFARQgFARgJAOQgJAPgMAGg");
	this.shape_825.setTransform(822.85,262.075);

	this.shape_826 = new cjs.Shape();
	this.shape_826.graphics.f("#FFFFFF").s().p("AAvAuIAAg7QAAgJgEgFQgEgFgKAAQgJAAgGAFQgGAGAAAIIAAA7IgPAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgPAAIAAhZIAOAAIABAKQAKgMAQAAQAUAAAFAPQAFgHAHgEQAHgEAKAAQAdAAABAgIAAA7g");
	this.shape_826.setTransform(812.9,262.375);

	this.shape_827 = new cjs.Shape();
	this.shape_827.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_827.setTransform(803.025,262.375);

	this.shape_828 = new cjs.Shape();
	this.shape_828.graphics.f("#FFFFFF").s().p("AgaAiQgLgLAAgUIAAgDQAAgNAFgKQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_828.setTransform(795.275,262.45);

	this.shape_829 = new cjs.Shape();
	this.shape_829.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgJQgJAKgQABQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAJAKgBQAPAAAHgMIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_829.setTransform(785.675,260.65);

	this.shape_830 = new cjs.Shape();
	this.shape_830.graphics.f("#FFFFFF").s().p("AgdAiQgLgNAAgUIAAgBQAAgNAGgKQAEgLAJgGQAKgFALgBQASAAAMANQALANAAAUIAAABQAAANgFAKQgFALgJAGQgKAFgMABQgRAAgMgNgAgSgYQgGAJAAAQQAAAPAGAJQAIAJAKAAQALAAAIgJQAGgJAAgQQAAgPgGgIQgIgKgLAAQgKAAgIAJg");
	this.shape_830.setTransform(776.25,262.45);

	this.shape_831 = new cjs.Shape();
	this.shape_831.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgRAAIAAgMIARAAIAAgWIAPAAIAAAWIAQAAIAAAMIgQAAIAAA3QAAAFACADQACACAGAAIAGgBIAAANIgLACQgKAAgFgHg");
	this.shape_831.setTransform(768.35,261.45);

	this.shape_832 = new cjs.Shape();
	this.shape_832.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_832.setTransform(762.125,260.575);

	this.shape_833 = new cjs.Shape();
	this.shape_833.graphics.f("#FFFFFF").s().p("AgaAiQgLgLAAgUIAAgDQAAgNAFgKQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_833.setTransform(752.825,262.45);

	this.shape_834 = new cjs.Shape();
	this.shape_834.graphics.f("#FFFFFF").s().p("AgCBDQgTgcAAgnQAAgSAFgRQAFgSAKgOQAJgOALgGIADAKQgMAKgIATQgHATAAAYIAAAGQAAAgAKAXQAHAOAKAIIgDAKQgLgGgKgPg");
	this.shape_834.setTransform(745.75,262.075);

	this.shape_835 = new cjs.Shape();
	this.shape_835.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_835.setTransform(731.025,262.375);

	this.shape_836 = new cjs.Shape();
	this.shape_836.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATAAIAOAAIAAgHQABgIgFgGQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAEgGAIgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgDAAgGQgLAKgNABQgOAAgJgIgAgVASQABAHAEAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgMAAQgbAAAAAQg");
	this.shape_836.setTransform(723.05,262.45);

	this.shape_837 = new cjs.Shape();
	this.shape_837.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgJALgQAAQgOAAgIgIg");
	this.shape_837.setTransform(713.775,262.525);

	this.shape_838 = new cjs.Shape();
	this.shape_838.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_838.setTransform(707.025,260.575);

	this.shape_839 = new cjs.Shape();
	this.shape_839.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAAAAgIAAA7g");
	this.shape_839.setTransform(691.25,262.375);

	this.shape_840 = new cjs.Shape();
	this.shape_840.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQALgHASAAIAOAAIAAgHQABgIgFgGQgFgEgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgHAFgGQAFgGAHgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgBgDgBgGQgLAKgOABQgNAAgJgIgAgUASQgBAHAFAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_840.setTransform(681.9,262.45);

	this.shape_841 = new cjs.Shape();
	this.shape_841.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAFQAFAEAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgDQgFgEgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAJAAAMIgQAAQAAgGgFgGQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPAAQgKgBgIgDg");
	this.shape_841.setTransform(672.925,262.45);

	this.shape_842 = new cjs.Shape();
	this.shape_842.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_842.setTransform(666.475,260.825);

	this.shape_843 = new cjs.Shape();
	this.shape_843.graphics.f("#FFFFFF").s().p("AglA/IAAh8IAOAAIABAKQAJgLAQAAQAQAAAKAMQAJANAAAVIAAABQAAAUgJANQgKAMgQAAQgPAAgKgKIAAArgAgWgkIAAAqQAIALANABQAKAAAHgJQAGgJAAgQQAAgQgGgIQgHgJgKAAQgNAAgIANg");
	this.shape_843.setTransform(659.8,264.1);

	this.shape_844 = new cjs.Shape();
	this.shape_844.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASAAIAPAAIAAgHQAAgIgEgGQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAFgGQAEgGAJgEQAIgEAIAAQAQABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgBgDgBgGQgLAKgOABQgNAAgIgIgAgUASQgBAHAFAEQAFAFAHgBQAHAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_844.setTransform(650.2,262.45);

	this.shape_845 = new cjs.Shape();
	this.shape_845.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_845.setTransform(643.525,260.575);

	this.shape_846 = new cjs.Shape();
	this.shape_846.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgJALgQAAQgOAAgIgIg");
	this.shape_846.setTransform(627.775,262.525);

	this.shape_847 = new cjs.Shape();
	this.shape_847.graphics.f("#FFFFFF").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgWIAPAAIAAAWIAQAAIAAAMIgQAAIAAA3QAAAFACADQACACAGAAIAHgBIAAANIgMACQgLAAgDgHg");
	this.shape_847.setTransform(620.05,261.45);

	this.shape_848 = new cjs.Shape();
	this.shape_848.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_848.setTransform(615.475,260.825);

	this.shape_849 = new cjs.Shape();
	this.shape_849.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATAAIAOAAIAAgHQABgIgFgGQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAEgGAIgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgDAAgGQgLAKgNABQgOAAgJgIgAgVASQABAHAEAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgMAAQgbAAAAAQg");
	this.shape_849.setTransform(608.75,262.45);

	this.shape_850 = new cjs.Shape();
	this.shape_850.graphics.f("#FFFFFF").s().p("AgbA/IgFgBIAAgNIAEABQAIAAAEgEQAEgDADgIIAEgJIgghYIAQAAIAWBCIAVhCIAQAAIgkBnQgHAWgTAAg");
	this.shape_850.setTransform(600.125,264.275);

	this.shape_851 = new cjs.Shape();
	this.shape_851.graphics.f("#FFFFFF").s().p("AgVBOQANgJAIgVQAGgVABgZIAAgCQgBgRgDgPQgDgPgGgMQgHgMgIgGIADgKQAMAGAIAPQAKAOAFARQAFARAAATQAAASgEARQgFARgLAOQgIAPgMAGg");
	this.shape_851.setTransform(583.7,262.075);

	this.shape_852 = new cjs.Shape();
	this.shape_852.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_852.setTransform(577.475,260.575);

	this.shape_853 = new cjs.Shape();
	this.shape_853.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_853.setTransform(570.525,260.825);

	this.shape_854 = new cjs.Shape();
	this.shape_854.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgQAAIAAgMIAQAAIAAgWIAPAAIAAAWIAQAAIAAAMIgQAAIAAA3QAAAFACADQACACAGAAIAGgBIAAANIgLACQgKAAgFgHg");
	this.shape_854.setTransform(565.4,261.45);

	this.shape_855 = new cjs.Shape();
	this.shape_855.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAFQAFAEAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgDQgFgEgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAJAAAMIgQAAQAAgGgFgGQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPAAQgKgBgIgDg");
	this.shape_855.setTransform(558.525,262.45);

	this.shape_856 = new cjs.Shape();
	this.shape_856.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASAAIAPAAIAAgHQAAgIgEgGQgFgEgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgHAFgGQAFgGAHgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgBgDgBgGQgLAKgOABQgNAAgIgIgAgUASQgBAHAFAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_856.setTransform(549.5,262.45);

	this.shape_857 = new cjs.Shape();
	this.shape_857.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_857.setTransform(542.825,260.575);

	this.shape_858 = new cjs.Shape();
	this.shape_858.graphics.f("#FFFFFF").s().p("AgWA0IgBALIgOAAIAAh/IAPAAIAAAwQAKgMAPAAQARAAAJANQAJANAAAUIAAABQAAAVgJAMQgKANgQAAQgQgBgJgMgAgWgBIAAAnQAIANAOAAQAKABAHgJQAGgJAAgQQAAgRgGgHQgHgIgKAAQgPgBgHAOg");
	this.shape_858.setTransform(536.15,260.65);

	this.shape_859 = new cjs.Shape();
	this.shape_859.graphics.f("#FFFFFF").s().p("AgcAiQgMgNAAgUIAAgBQAAgNAGgKQAEgLAJgGQAKgFALgBQASAAALANQAMANAAAUIAAABQAAANgFAKQgFALgKAGQgJAFgMABQgSAAgKgNgAgRgYQgIAJAAAQQAAAPAIAJQAGAJALAAQALAAAIgJQAGgJABgQQgBgPgGgIQgIgKgLAAQgLAAgGAJg");
	this.shape_859.setTransform(526.35,262.45);

	this.shape_860 = new cjs.Shape();
	this.shape_860.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_860.setTransform(519.425,260.575);

	this.shape_861 = new cjs.Shape();
	this.shape_861.graphics.f("#FFFFFF").s().p("AglA/IAAh8IAOAAIABAKQAJgLAQAAQAQAAAKAMQAJANAAAVIAAABQAAAUgJANQgKAMgQAAQgPAAgKgKIAAArgAgWgkIAAAqQAHALAPABQAJAAAHgJQAGgJAAgQQAAgQgGgIQgHgJgJAAQgPAAgHANg");
	this.shape_861.setTransform(512.75,264.1);

	this.shape_862 = new cjs.Shape();
	this.shape_862.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_862.setTransform(505.725,260.825);

	this.shape_863 = new cjs.Shape();
	this.shape_863.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_863.setTransform(501.225,262.375);

	this.shape_864 = new cjs.Shape();
	this.shape_864.graphics.f("#FFFFFF").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgWIAPAAIAAAWIAQAAIAAAMIgQAAIAAA3QAAAFACADQACACAGAAIAHgBIAAANIgMACQgLAAgDgHg");
	this.shape_864.setTransform(494.85,261.45);

	this.shape_865 = new cjs.Shape();
	this.shape_865.graphics.f("#FFFFFF").s().p("AgBBDQgUgcAAgnQAAgSAFgRQAFgSAKgOQAJgOAKgGIAEAKQgMAKgIATQgHATAAAYIAAAGQgBAgALAXQAHAOAKAIIgEAKQgKgGgJgPg");
	this.shape_865.setTransform(489.85,262.075);

	this.shape_866 = new cjs.Shape();
	this.shape_866.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_866.setTransform(888.4,232.975);

	this.shape_867 = new cjs.Shape();
	this.shape_867.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgGQALgJARABIAQAAIAAgIQgBgHgEgFQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAEgHQAGgGAIgEQAIgEAJABQAPgBAJAJQAJAHAAAOIAAAoQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgOgBQgNAAgIgHgAgVASQAAAHAFAEQAFAFAHAAQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_867.setTransform(879.05,233.05);

	this.shape_868 = new cjs.Shape();
	this.shape_868.graphics.f("#FFFFFF").s().p("AgTA7QgIgEgFgHIAIgKQAKANANAAQALAAAGgGQAGgHAAgLIAAgIQgJAKgPAAQgPAAgKgMQgKgMAAgVQAAgWAJgMQAKgMAQAAQAQAAAJALIABgKIAOAAIAABXQAAASgKAKQgLAKgRAAQgJgBgKgEgAgPgpQgHAJAAARQAAAPAHAIQAGAJAKAAQAPAAAGgOIAAgnQgGgNgPgBQgKABgGAIg");
	this.shape_868.setTransform(869.5,234.75);

	this.shape_869 = new cjs.Shape();
	this.shape_869.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_869.setTransform(860.2,232.975);

	this.shape_870 = new cjs.Shape();
	this.shape_870.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_870.setTransform(853.425,231.425);

	this.shape_871 = new cjs.Shape();
	this.shape_871.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_871.setTransform(848.925,232.975);

	this.shape_872 = new cjs.Shape();
	this.shape_872.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQAKgJATABIAOAAIAAgIQABgHgFgFQgFgFgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAEgHQAFgGAIgEQAJgEAIABQAQgBAJAJQAIAHABAOIAAAoQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAFAIAAQAGAAAGgFQAHgDACgGIAAgTIgMAAQgbAAAAARg");
	this.shape_872.setTransform(840.95,233.05);

	this.shape_873 = new cjs.Shape();
	this.shape_873.graphics.f("#FFFFFF").s().p("AgQBOIAAgNIAHABQAFAAADgDQACgDgBgGIAAhkIAQAAIAABjQAAAagXAAQgEAAgFgBgAABg/QgBgDAAgEQAAgEABgCQACgDAFAAQAFAAACADQACACAAAEQAAAEgCADQgCACgFAAQgFAAgCgCg");
	this.shape_873.setTransform(833.45,233.25);

	this.shape_874 = new cjs.Shape();
	this.shape_874.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_874.setTransform(806.65,232.975);

	this.shape_875 = new cjs.Shape();
	this.shape_875.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQAKgJATABIAOAAIAAgIQABgHgFgFQgFgFgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAFgHQAEgGAIgEQAJgEAIABQAQgBAJAJQAIAHABAOIAAAoQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAFAIAAQAGAAAGgFQAHgDACgGIAAgTIgMAAQgbAAAAARg");
	this.shape_875.setTransform(797.3,233.05);

	this.shape_876 = new cjs.Shape();
	this.shape_876.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgFQgEgEAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgHgFgEQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEACALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKAAgIgDg");
	this.shape_876.setTransform(788.325,233.05);

	this.shape_877 = new cjs.Shape();
	this.shape_877.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_877.setTransform(781.875,231.425);

	this.shape_878 = new cjs.Shape();
	this.shape_878.graphics.f("#FFFFFF").s().p("AglA/IAAh8IAOAAIABALQAJgMAQAAQAQAAAJAMQAKAMAAAWIAAACQAAATgKAMQgJANgQAAQgPAAgKgKIAAArgAgWglIAAArQAIAMAOgBQAJAAAHgIQAHgJgBgQQABgPgHgJQgHgJgJAAQgOAAgIAMg");
	this.shape_878.setTransform(775.2,234.7);

	this.shape_879 = new cjs.Shape();
	this.shape_879.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgGQALgJASABIAOAAIAAgIQABgHgFgFQgFgFgJAAQgIAAgFAEQgFAEgBAGIgPAAQAAgGAFgHQAFgGAHgEQAJgEAIABQAQgBAJAJQAIAHABAOIAAAoQAAAMADAIIAAABIgQAAQgBgDgBgGQgLALgOgBQgNAAgIgHgAgUASQgBAHAFAEQAFAFAIAAQAGAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_879.setTransform(765.6,233.05);

	this.shape_880 = new cjs.Shape();
	this.shape_880.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_880.setTransform(758.925,231.175);

	this.shape_881 = new cjs.Shape();
	this.shape_881.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQAKgJATABIAPAAIAAgIQAAgHgFgFQgFgFgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgGAEgHQAFgGAJgEQAIgEAJABQAPgBAJAJQAIAHABAOIAAAoQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAFAHAAQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_881.setTransform(731.25,233.05);

	this.shape_882 = new cjs.Shape();
	this.shape_882.graphics.f("#FFFFFF").s().p("AgTA7QgIgEgFgHIAIgKQAJANAOAAQALAAAGgGQAGgHABgLIAAgIQgKAKgPAAQgQAAgJgMQgKgMAAgVQAAgWAJgMQALgMAPAAQAQAAAJALIABgKIAOAAIAABXQAAASgLAKQgKAKgRAAQgJgBgKgEgAgPgpQgHAJABARQgBAPAHAIQAGAJAKAAQAOAAAIgOIAAgnQgIgNgOgBQgKABgGAIg");
	this.shape_882.setTransform(721.7,234.75);

	this.shape_883 = new cjs.Shape();
	this.shape_883.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_883.setTransform(715.025,231.425);

	this.shape_884 = new cjs.Shape();
	this.shape_884.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgQAAIAAgMIAQAAIAAgVIAOAAIAAAVIARAAIAAAMIgRAAIAAA3QAAAFACADQADADAFAAIAHgBIAAAMIgLABQgLABgEgHg");
	this.shape_884.setTransform(709.9,232.05);

	this.shape_885 = new cjs.Shape();
	this.shape_885.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_885.setTransform(684.375,231.425);

	this.shape_886 = new cjs.Shape();
	this.shape_886.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgVIAAAAQAAgVAKgMQAKgMAQAAQAOgBAKALIAAguIAPAAIAAB+IgOAAIgBgJQgJALgQgBQgPAAgKgMgAgPgGQgHAIAAARQAAAQAHAIQAGAJAKAAQAPAAAHgOIAAgnQgHgNgPgBQgKABgGAIg");
	this.shape_886.setTransform(677.275,231.25);

	this.shape_887 = new cjs.Shape();
	this.shape_887.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQAKgJATABIAOAAIAAgIQABgHgFgFQgFgFgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAFgHQAFgGAHgEQAJgEAIABQAQgBAJAJQAJAHAAAOIAAAoQAAAMADAIIAAABIgQAAQgBgDgBgGQgLALgNgBQgOAAgJgHgAgUASQAAAHAEAEQAFAFAIAAQAGAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_887.setTransform(668.05,233.05);

	this.shape_888 = new cjs.Shape();
	this.shape_888.graphics.f("#FFFFFF").s().p("AgQBOIAAgNIAHABQAFAAADgDQABgDAAgGIAAhkIAQAAIAABjQAAAagXAAQgEAAgFgBgAABg/QgBgDAAgEQAAgEABgCQACgDAFAAQAFAAACADQACACAAAEQAAAEgCADQgCACgFAAQgFAAgCgCg");
	this.shape_888.setTransform(660.55,233.25);

	this.shape_889 = new cjs.Shape();
	this.shape_889.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_889.setTransform(654.7,232.975);

	this.shape_890 = new cjs.Shape();
	this.shape_890.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgKAJgHQAKgFAJAAQASAAAJALQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLARgXAAQgRABgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_890.setTransform(645.575,233.05);

	this.shape_891 = new cjs.Shape();
	this.shape_891.graphics.f("#FFFFFF").s().p("AAvAuIAAg7QABgJgFgFQgEgFgLAAQgIAAgGAFQgFAGgBAIIAAA7IgPAAIAAg6QAAgUgTAAQgPAAgFANIAABBIgQAAIAAhZIAPAAIAAAKQAKgMARAAQATAAAFAPQAFgHAHgEQAHgEAKAAQAdAAABAgIAAA7g");
	this.shape_891.setTransform(633.55,232.975);

	this.shape_892 = new cjs.Shape();
	this.shape_892.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgPAAIAAh/IAPAAIAAAxQAKgNAPAAQAdAAABAfIAAA8g");
	this.shape_892.setTransform(600.5,231.175);

	this.shape_893 = new cjs.Shape();
	this.shape_893.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgJALgQAAQgOAAgIgIg");
	this.shape_893.setTransform(591.125,233.125);

	this.shape_894 = new cjs.Shape();
	this.shape_894.graphics.f("#FFFFFF").s().p("AgWA1IgBAKIgOAAIAAh+IAPAAIAAAvQAKgLAPAAQARAAAJAMQAJANAAAUIAAABQAAAUgJANQgKAMgPAAQgQABgKgMgAgWAAIAAAlQAHAPAPAAQALAAAFgJQAHgIAAgRQAAgRgHgHQgFgJgLAAQgPABgHAOg");
	this.shape_894.setTransform(581.85,231.25);

	this.shape_895 = new cjs.Shape();
	this.shape_895.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgJALgQAAQgOAAgIgIg");
	this.shape_895.setTransform(572.225,233.125);

	this.shape_896 = new cjs.Shape();
	this.shape_896.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgRAAIAAgMIARAAIAAgVIAPAAIAAAVIAQAAIAAAMIgQAAIAAA3QAAAFACADQACADAGAAIAGgBIAAAMIgLABQgKABgFgHg");
	this.shape_896.setTransform(564.5,232.05);

	this.shape_897 = new cjs.Shape();
	this.shape_897.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_897.setTransform(536.35,232.975);

	this.shape_898 = new cjs.Shape();
	this.shape_898.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgGQAKgJASABIAPAAIAAgIQAAgHgEgFQgFgFgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgGAFgHQAFgGAHgEQAJgEAIABQAQgBAJAJQAIAHABAOIAAAoQAAAMADAIIAAABIgQAAQgBgDgBgGQgLALgOgBQgNAAgIgHgAgUASQgBAHAFAEQAFAFAIAAQAGAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_898.setTransform(527,233.05);

	this.shape_899 = new cjs.Shape();
	this.shape_899.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgFQgEgEAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgHgFgEQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEACALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKAAgIgDg");
	this.shape_899.setTransform(518.025,233.05);

	this.shape_900 = new cjs.Shape();
	this.shape_900.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_900.setTransform(511.575,231.425);

	this.shape_901 = new cjs.Shape();
	this.shape_901.graphics.f("#FFFFFF").s().p("AglA/IAAh8IAOAAIABALQAJgMAQAAQAQAAAKAMQAJAMAAAWIAAACQAAATgJAMQgKANgQAAQgPAAgKgKIAAArgAgWglIAAArQAIAMANgBQAKAAAHgIQAGgJAAgQQAAgPgGgJQgHgJgKAAQgNAAgIAMg");
	this.shape_901.setTransform(504.9,234.7);

	this.shape_902 = new cjs.Shape();
	this.shape_902.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgGQALgJARABIAQAAIAAgIQgBgHgEgFQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAEgHQAFgGAJgEQAIgEAJABQAPgBAJAJQAJAHAAAOIAAAoQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgOgBQgNAAgIgHgAgVASQAAAHAFAEQAFAFAHAAQAHAAAHgFQAGgDADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_902.setTransform(495.3,233.05);

	this.shape_903 = new cjs.Shape();
	this.shape_903.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_903.setTransform(488.625,231.175);

	this.shape_904 = new cjs.Shape();
	this.shape_904.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAAAAgIAAA7g");
	this.shape_904.setTransform(888.45,203.575);

	this.shape_905 = new cjs.Shape();
	this.shape_905.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgHQABgIgFgFQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAFgHQAFgGAHgEQAJgDAIgBQAQAAAJAJQAJAHAAANIAAApQAAANADAGIAAACIgQAAQgBgCgBgIQgLALgNAAQgOABgJgIgAgUASQAAAHAEAEQAFAEAIAAQAGAAAGgDQAHgEACgGIAAgTIgLAAQgbABAAAQg");
	this.shape_905.setTransform(879.1,203.65);

	this.shape_906 = new cjs.Shape();
	this.shape_906.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_906.setTransform(870.775,201.775);

	this.shape_907 = new cjs.Shape();
	this.shape_907.graphics.f("#FFFFFF").s().p("AgTA7QgIgEgFgHIAIgKQAJANAOAAQALAAAGgHQAGgGAAgLIAAgIQgJALgPgBQgPAAgKgMQgKgMAAgWQAAgUAJgNQAKgNAQAAQAQAAAJAMIABgKIAOAAIAABXQAAARgKAKQgLALgRgBQgJABgKgFgAgPgoQgHAIAAARQAAAPAHAIQAGAIAKABQAPAAAGgNIAAgpQgGgMgPAAQgKAAgGAJg");
	this.shape_907.setTransform(860.95,205.35);

	this.shape_908 = new cjs.Shape();
	this.shape_908.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_908.setTransform(851.65,203.575);

	this.shape_909 = new cjs.Shape();
	this.shape_909.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgHQABgIgFgFQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAFgHQAEgGAIgEQAJgDAIgBQAQAAAJAJQAIAHABANIAAApQAAANADAGIAAACIgQAAQgCgCAAgIQgLALgNAAQgOABgJgIgAgVASQABAHAEAEQAFAEAIAAQAGAAAGgDQAHgEACgGIAAgTIgMAAQgbABAAAQg");
	this.shape_909.setTransform(842.3,203.65);

	this.shape_910 = new cjs.Shape();
	this.shape_910.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgVIAAgBQAAgTAKgNQAKgNAQAAQAOABAKAKIAAgvIAPAAIAAB/IgOAAIgBgKQgJALgQAAQgPAAgKgMgAgPgFQgHAHAAARQAAAPAHAJQAGAIAKAAQAPABAHgNIAAgpQgHgMgPAAQgKAAgGAJg");
	this.shape_910.setTransform(832.675,201.85);

	this.shape_911 = new cjs.Shape();
	this.shape_911.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgLAJgFQAKgHAJAAQASAAAJAMQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLAQgXAAQgRAAgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_911.setTransform(823.675,203.65);

	this.shape_912 = new cjs.Shape();
	this.shape_912.graphics.f("#FFFFFF").s().p("AgVA5QgKgEgGgIQgGgJAAgKIAQAAQAAALAIAGQAIAGANAAQANAAAGgFQAHgFAAgJQAAgJgGgEQgHgFgPgFQgVgHgJgHQgJgJAAgMQAAgOALgKQAMgJARAAQAMAAAKAFQAKAFAGAIQAEAIAAAKIgPAAQgBgLgGgGQgIgGgMAAQgLAAgGAFQgHAFAAAKQAAAHAHAFQAGAFAOAEQAOAFAKAEQAHAFAFAHQAEAHAAAJQAAAOgMAJQgLAJgTAAQgMAAgLgFg");
	this.shape_912.setTransform(814.05,202.1);

	this.shape_913 = new cjs.Shape();
	this.shape_913.graphics.f("#FFFFFF").s().p("AgGAHQgDgDABgEQgBgDADgCQACgDAEAAQAFAAACADQACACABADQgBAEgCADQgCACgFAAQgEAAgCgCg");
	this.shape_913.setTransform(788.7,207.325);

	this.shape_914 = new cjs.Shape();
	this.shape_914.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgHQABgIgFgFQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAFgHQAFgGAHgEQAJgDAIgBQAQAAAJAJQAIAHABANIAAApQAAANADAGIAAACIgQAAQgBgCgBgIQgLALgNAAQgOABgJgIgAgUASQAAAHAEAEQAFAEAIAAQAGAAAGgDQAHgEACgGIAAgTIgMAAQgaABAAAQg");
	this.shape_914.setTransform(781.9,203.65);

	this.shape_915 = new cjs.Shape();
	this.shape_915.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_915.setTransform(774.875,203.575);

	this.shape_916 = new cjs.Shape();
	this.shape_916.graphics.f("#FFFFFF").s().p("AgdAiQgLgMAAgWIAAAAQAAgNAFgKQAFgLAJgFQAKgHALAAQASAAAMANQALANAAAUIAAABQAAANgFAKQgFALgJAGQgKAGgMgBQgRAAgMgMgAgSgYQgGAJAAAQQAAAPAGAJQAIAJAKAAQAMAAAGgJQAIgJgBgQQABgPgIgIQgGgKgMAAQgKAAgIAJg");
	this.shape_916.setTransform(766.7,203.65);

	this.shape_917 = new cjs.Shape();
	this.shape_917.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAGIAABAIgPAAIAAh/IAPAAIAAAxQAKgNAQAAQAcAAABAfIAAA8g");
	this.shape_917.setTransform(757.2,201.775);

	this.shape_918 = new cjs.Shape();
	this.shape_918.graphics.f("#FFFFFF").s().p("AglA/IAAh7IAOAAIABAKQAKgMAPAAQAQAAAKAMQAJANAAAVIAAACQAAATgJANQgKAMgQAAQgPAAgKgKIAAArgAgWglIAAAqQAIANANAAQAKAAAHgJQAGgJAAgQQAAgQgGgIQgHgJgKAAQgOAAgHAMg");
	this.shape_918.setTransform(747.9,205.3);

	this.shape_919 = new cjs.Shape();
	this.shape_919.graphics.f("#FFFFFF").s().p("AgdAiQgLgMAAgWIAAAAQAAgNAGgKQAFgLAIgFQAKgHALAAQASAAAMANQALANAAAUIAAABQAAANgFAKQgFALgKAGQgJAGgMgBQgRAAgMgMgAgRgYQgIAJABAQQgBAPAIAJQAGAJALAAQALAAAIgJQAGgJAAgQQAAgPgGgIQgIgKgLAAQgLAAgGAJg");
	this.shape_919.setTransform(738.1,203.65);

	this.shape_920 = new cjs.Shape();
	this.shape_920.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_920.setTransform(728.55,203.575);

	this.shape_921 = new cjs.Shape();
	this.shape_921.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgLAJgFQAKgHAJAAQASAAAJAMQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLAQgXAAQgRAAgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_921.setTransform(719.425,203.65);

	this.shape_922 = new cjs.Shape();
	this.shape_922.graphics.f("#FFFFFF").s().p("AgCAzQgFgHAAgLIAAg3IgQAAIAAgMIAQAAIAAgVIAOAAIAAAVIARAAIAAAMIgRAAIAAA3QAAAFACADQADACAFAAIAHAAIAAAMIgLABQgLAAgEgFg");
	this.shape_922.setTransform(711.8,202.65);

	this.shape_923 = new cjs.Shape();
	this.shape_923.graphics.f("#FFFFFF").s().p("AghAvQgNgPAAgaIAAgLQAAgRAHgNQAFgMAMgHQAKgHAOAAQATAAAMALQALAKACAUIgPAAQgDgPgGgHQgIgGgMAAQgOAAgJAMQgIALAAAUIAAALQgBAUAJALQAIAMANAAQAOAAAHgGQAHgGADgPIAPAAQgCAUgLAKQgMAKgVAAQgUAAgNgPg");
	this.shape_923.setTransform(703.95,202.1);

	this.shape_924 = new cjs.Shape();
	this.shape_924.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAAAAgIAAA7g");
	this.shape_924.setTransform(675.6,203.575);

	this.shape_925 = new cjs.Shape();
	this.shape_925.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgHQABgIgFgFQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAFgHQAFgGAHgEQAJgDAIgBQAQAAAJAJQAIAHABANIAAApQAAANADAGIAAACIgQAAQgBgCgBgIQgLALgNAAQgOABgJgIgAgUASQAAAHAEAEQAFAEAIAAQAGAAAGgDQAHgEACgGIAAgTIgMAAQgaABAAAQg");
	this.shape_925.setTransform(666.25,203.65);

	this.shape_926 = new cjs.Shape();
	this.shape_926.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgVIAAgBQAAgTAKgNQAKgNAQAAQAOABAKAKIAAgvIAPAAIAAB/IgOAAIgBgKQgJALgQAAQgPAAgKgMgAgPgFQgHAHAAARQAAAPAHAJQAGAIAKAAQAPABAHgNIAAgpQgHgMgPAAQgKAAgGAJg");
	this.shape_926.setTransform(656.625,201.85);

	this.shape_927 = new cjs.Shape();
	this.shape_927.graphics.f("#FFFFFF").s().p("AgKAPQAHgLAAgKIAAgOIAOAAIAAAMQAAAIgDAHQgFAJgFAFg");
	this.shape_927.setTransform(632.1,208.45);

	this.shape_928 = new cjs.Shape();
	this.shape_928.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQALgHARgBIAQAAIAAgHQAAgIgFgFQgFgEgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgGAEgHQAGgGAIgEQAIgDAJgBQAPAAAJAJQAIAHABANIAAApQAAANADAGIAAACIgQAAQgCgCAAgIQgLALgNAAQgOABgJgIgAgVASQABAHAEAEQAFAEAHAAQAHAAAHgDQAGgEADgGIAAgTIgNAAQgbABAAAQg");
	this.shape_928.setTransform(626.05,203.65);

	this.shape_929 = new cjs.Shape();
	this.shape_929.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_929.setTransform(619.375,202.025);

	this.shape_930 = new cjs.Shape();
	this.shape_930.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_930.setTransform(614.875,203.575);

	this.shape_931 = new cjs.Shape();
	this.shape_931.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQALgHARgBIAQAAIAAgHQgBgIgEgFQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAEgHQAFgGAJgEQAIgDAJgBQAPAAAJAJQAJAHAAANIAAApQAAANADAGIAAACIgQAAQgCgCAAgIQgLALgOAAQgNABgIgIgAgVASQAAAHAFAEQAFAEAHAAQAHAAAHgDQAGgEADgGIAAgTIgMAAQgcABAAAQg");
	this.shape_931.setTransform(606.9,203.65);

	this.shape_932 = new cjs.Shape();
	this.shape_932.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgVIAAgBQAAgTAKgNQAKgNAQAAQAOABAKAKIAAgvIAPAAIAAB/IgOAAIgBgKQgJALgQAAQgPAAgKgMgAgPgFQgHAHAAARQAAAPAHAJQAGAIAKAAQAPABAHgNIAAgpQgHgMgPAAQgKAAgGAJg");
	this.shape_932.setTransform(597.275,201.85);

	this.shape_933 = new cjs.Shape();
	this.shape_933.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_933.setTransform(590.625,202.025);

	this.shape_934 = new cjs.Shape();
	this.shape_934.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_934.setTransform(583.85,203.575);

	this.shape_935 = new cjs.Shape();
	this.shape_935.graphics.f("#FFFFFF").s().p("AghAvQgNgPABgaIAAgLQgBgRAHgNQAGgMAKgHQAMgHANAAQATAAAMALQALAKACAUIgQAAQgCgPgHgHQgGgGgNAAQgOAAgJAMQgJALABAUIAAALQAAAUAIALQAIAMANAAQAOAAAHgGQAHgGACgPIAQAAQgCAUgLAKQgMAKgVAAQgUAAgNgPg");
	this.shape_935.setTransform(573.8,202.1);

	this.shape_936 = new cjs.Shape();
	this.shape_936.graphics.f("#FFFFFF").s().p("AgLAPQAIgLAAgKIAAgOIAPAAIAAAMQAAAIgFAHQgEAJgFAFg");
	this.shape_936.setTransform(548.2,208.45);

	this.shape_937 = new cjs.Shape();
	this.shape_937.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgHQABgIgFgFQgFgEgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgGAEgHQAFgGAIgEQAJgDAIgBQAQAAAJAJQAIAHABANIAAApQAAANADAGIAAACIgQAAQgCgCAAgIQgLALgNAAQgOABgJgIgAgVASQABAHAEAEQAFAEAIAAQAGAAAGgDQAHgEACgGIAAgTIgMAAQgbABAAAQg");
	this.shape_937.setTransform(542.15,203.65);

	this.shape_938 = new cjs.Shape();
	this.shape_938.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_938.setTransform(535.125,203.575);

	this.shape_939 = new cjs.Shape();
	this.shape_939.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgLAJgFQAKgHAJAAQASAAAJAMQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLAQgXAAQgRAAgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_939.setTransform(527.375,203.65);

	this.shape_940 = new cjs.Shape();
	this.shape_940.graphics.f("#FFFFFF").s().p("AgMBBIAAhOIgOAAIAAgLIAOAAIAAgJQAAgPAIgIQAGgIAOAAIALACIgBAMIgIAAQgIAAgEADQgEAFAAAIIAAAKIATAAIAAALIgTAAIAABOg");
	this.shape_940.setTransform(520.125,201.7);

	this.shape_941 = new cjs.Shape();
	this.shape_941.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_941.setTransform(514.825,202.025);

	this.shape_942 = new cjs.Shape();
	this.shape_942.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_942.setTransform(510.325,203.575);

	this.shape_943 = new cjs.Shape();
	this.shape_943.graphics.f("#FFFFFF").s().p("AgcAiQgMgMAAgWIAAAAQAAgNAGgKQAEgLAKgFQAJgHALAAQASAAALANQAMANAAAUIAAABQAAANgFAKQgFALgKAGQgJAGgMgBQgSAAgKgMgAgRgYQgIAJAAAQQAAAPAIAJQAHAJAKAAQALAAAIgJQAHgJAAgQQAAgPgHgIQgIgKgLAAQgKAAgHAJg");
	this.shape_943.setTransform(502.15,203.65);

	this.shape_944 = new cjs.Shape();
	this.shape_944.graphics.f("#FFFFFF").s().p("AgqA9IAAh5IArAAQAUAAALALQALAKAAAQQAAASgLAIQgKAKgVAAIgcAAIAAAwgAgbAAIAcAAQANAAAHgFQAGgGABgMQgBgKgGgGQgHgHgMAAIgdAAg");
	this.shape_944.setTransform(492.3,202.1);

	this.shape_945 = new cjs.Shape();
	this.shape_945.graphics.f("#FFFFFF").s().p("AAvAuIAAg7QABgJgFgFQgEgFgLAAQgIAAgGAFQgFAGgBAIIAAA7IgPAAIAAg6QAAgUgTAAQgPAAgFANIAABBIgQAAIAAhZIAPAAIAAAKQAKgMARAAQATAAAFAPQAFgHAHgEQAHgEAKAAQAdAAABAgIAAA7g");
	this.shape_945.setTransform(885.55,174.175);

	this.shape_946 = new cjs.Shape();
	this.shape_946.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgJALgQAAQgOAAgIgIg");
	this.shape_946.setTransform(873.425,174.325);

	this.shape_947 = new cjs.Shape();
	this.shape_947.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_947.setTransform(866.675,172.375);

	this.shape_948 = new cjs.Shape();
	this.shape_948.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_948.setTransform(862.525,172.625);

	this.shape_949 = new cjs.Shape();
	this.shape_949.graphics.f("#FFFFFF").s().p("AgMBAIAAhNIgOAAIAAgMIAOAAIAAgJQAAgOAIgIQAGgHAOAAIALABIgBAMIgIgBQgIAAgEAFQgEAEAAAIIAAAJIATAAIAAAMIgTAAIAABNg");
	this.shape_949.setTransform(857.775,172.3);

	this.shape_950 = new cjs.Shape();
	this.shape_950.graphics.f("#FFFFFF").s().p("AgGArQgDgCAAgEQAAgEADgDQACgDAEAAQAFAAACADQACADAAAEQAAAEgCACQgCADgFAAQgEAAgCgDgAgGgdQgDgDAAgEQAAgEADgCQACgDAEAAQAFAAACADQADACAAAEQAAAEgDADQgCACgFAAQgEAAgCgCg");
	this.shape_950.setTransform(846.325,174.275);

	this.shape_951 = new cjs.Shape();
	this.shape_951.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAGIAABAIgQAAIAAh/IAQAAIAAAxQAKgNAPAAQAdAAAAAfIAAA8g");
	this.shape_951.setTransform(839.6,172.375);

	this.shape_952 = new cjs.Shape();
	this.shape_952.graphics.f("#FFFFFF").s().p("AgdAiQgLgNAAgUIAAgBQAAgNAFgKQAGgLAJgGQAJgFALgBQASAAAMANQALANAAAUIAAABQAAANgFAKQgFALgJAGQgKAFgMABQgSAAgLgNgAgSgYQgGAJgBAQQABAPAGAJQAIAJAKAAQAMAAAGgJQAIgJgBgQQABgPgIgIQgGgKgMAAQgKAAgIAJg");
	this.shape_952.setTransform(830.05,174.25);

	this.shape_953 = new cjs.Shape();
	this.shape_953.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgQAAIAAgMIAQAAIAAgWIAOAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFADADQACACAFAAIAHgBIAAANIgLACQgKAAgFgHg");
	this.shape_953.setTransform(822.15,173.25);

	this.shape_954 = new cjs.Shape();
	this.shape_954.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_954.setTransform(814.95,174.175);

	this.shape_955 = new cjs.Shape();
	this.shape_955.graphics.f("#FFFFFF").s().p("AgdAiQgLgNAAgUIAAgBQAAgNAFgKQAFgLAKgGQAJgFALgBQASAAAMANQALANAAAUIAAABQAAANgFAKQgFALgJAGQgKAFgMABQgRAAgMgNgAgSgYQgGAJAAAQQAAAPAGAJQAIAJAKAAQAMAAAGgJQAHgJAAgQQAAgPgHgIQgGgKgMAAQgKAAgIAJg");
	this.shape_955.setTransform(805.4,174.25);

	this.shape_956 = new cjs.Shape();
	this.shape_956.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgVIAAgCQAAgNAFgKQAFgKAJgGQAJgGALAAQAPABAKAIQAKAJABAPIgOAAQgBgJgGgFQgGgGgJAAQgLAAgGAJQgHAIABAQIAAACQgBAPAHAIQAGAJALAAQAJAAAFgFQAGgFACgIIAOAAQgBAJgEAGQgGAIgIADQgHAFgKAAQgRgBgLgMg");
	this.shape_956.setTransform(796.2,174.25);

	this.shape_957 = new cjs.Shape();
	this.shape_957.graphics.f("#FFFFFF").s().p("AgKAPQAHgLABgLIAAgNIANAAIAAAMQAAAIgDAIQgEAIgGAFg");
	this.shape_957.setTransform(783.5,179.05);

	this.shape_958 = new cjs.Shape();
	this.shape_958.graphics.f("#FFFFFF").s().p("AAvAuIAAg7QAAgJgEgFQgEgFgKAAQgJAAgGAFQgGAGAAAIIAAA7IgPAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgPAAIAAhZIAOAAIABAKQAKgMAQAAQAUAAAFAPQAFgHAHgEQAHgEAKAAQAdAAABAgIAAA7g");
	this.shape_958.setTransform(774.65,174.175);

	this.shape_959 = new cjs.Shape();
	this.shape_959.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_959.setTransform(764.775,174.175);

	this.shape_960 = new cjs.Shape();
	this.shape_960.graphics.f("#FFFFFF").s().p("AgaAiQgLgLAAgUIAAgDQAAgNAFgKQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_960.setTransform(757.025,174.25);

	this.shape_961 = new cjs.Shape();
	this.shape_961.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgJQgJAKgQABQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAJAKgBQAPAAAHgMIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_961.setTransform(747.425,172.45);

	this.shape_962 = new cjs.Shape();
	this.shape_962.graphics.f("#FFFFFF").s().p("AgdAiQgLgNAAgUIAAgBQAAgNAGgKQAEgLAJgGQAKgFALgBQASAAAMANQALANAAAUIAAABQAAANgFAKQgFALgJAGQgKAFgMABQgRAAgMgNgAgSgYQgGAJAAAQQAAAPAGAJQAIAJAKAAQALAAAIgJQAGgJAAgQQAAgPgGgIQgIgKgLAAQgKAAgIAJg");
	this.shape_962.setTransform(738,174.25);

	this.shape_963 = new cjs.Shape();
	this.shape_963.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgJQgJAKgQABQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAJAKgBQAPAAAHgMIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_963.setTransform(728.125,172.45);

	this.shape_964 = new cjs.Shape();
	this.shape_964.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_964.setTransform(718.85,174.175);

	this.shape_965 = new cjs.Shape();
	this.shape_965.graphics.f("#FFFFFF").s().p("AgaAiQgLgLAAgUIAAgDQAAgNAFgKQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_965.setTransform(709.725,174.25);

	this.shape_966 = new cjs.Shape();
	this.shape_966.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_966.setTransform(694.25,174.175);

	this.shape_967 = new cjs.Shape();
	this.shape_967.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATAAIAPAAIAAgHQAAgIgFgGQgFgEgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgHAEgGQAFgGAJgEQAIgEAJAAQAPABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgDAAgGQgLAKgNABQgOAAgJgIgAgVASQABAHAEAEQAFAFAIgBQAGAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_967.setTransform(684.9,174.25);

	this.shape_968 = new cjs.Shape();
	this.shape_968.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgJQgJAKgQABQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAJAKgBQAPAAAHgMIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_968.setTransform(675.275,172.45);

	this.shape_969 = new cjs.Shape();
	this.shape_969.graphics.f("#FFFFFF").s().p("AAvAuIAAg7QABgJgFgFQgEgFgLAAQgIAAgGAFQgFAGgBAIIAAA7IgPAAIAAg6QAAgUgTAAQgPAAgFANIAABBIgQAAIAAhZIAPAAIAAAKQAKgMARAAQASAAAHAPQAEgHAHgEQAHgEAKAAQAdAAABAgIAAA7g");
	this.shape_969.setTransform(657.05,174.175);

	this.shape_970 = new cjs.Shape();
	this.shape_970.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_970.setTransform(647.175,174.175);

	this.shape_971 = new cjs.Shape();
	this.shape_971.graphics.f("#FFFFFF").s().p("AgaAiQgLgLAAgUIAAgDQAAgNAFgKQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_971.setTransform(639.425,174.25);

	this.shape_972 = new cjs.Shape();
	this.shape_972.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgJQgJAKgQABQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAJAKgBQAPAAAHgMIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_972.setTransform(629.825,172.45);

	this.shape_973 = new cjs.Shape();
	this.shape_973.graphics.f("#FFFFFF").s().p("AgcAiQgMgNAAgUIAAgBQAAgNAGgKQAFgLAIgGQAKgFALgBQASAAALANQAMANAAAUIAAABQAAANgFAKQgFALgKAGQgJAFgMABQgSAAgKgNgAgRgYQgIAJAAAQQAAAPAIAJQAGAJALAAQALAAAIgJQAGgJABgQQgBgPgGgIQgIgKgLAAQgLAAgGAJg");
	this.shape_973.setTransform(620.4,174.25);

	this.shape_974 = new cjs.Shape();
	this.shape_974.graphics.f("#FFFFFF").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgWIAPAAIAAAWIAQAAIAAAMIgQAAIAAA3QAAAFABADQADACAGAAIAHgBIAAANIgMACQgLAAgDgHg");
	this.shape_974.setTransform(612.5,173.25);

	this.shape_975 = new cjs.Shape();
	this.shape_975.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_975.setTransform(606.275,172.375);

	this.shape_976 = new cjs.Shape();
	this.shape_976.graphics.f("#FFFFFF").s().p("AgaAiQgLgLAAgUIAAgDQAAgNAFgKQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_976.setTransform(596.975,174.25);

	this.shape_977 = new cjs.Shape();
	this.shape_977.graphics.f("#FFFFFF").s().p("AgfBCIAyiDIANAAIgyCDg");
	this.shape_977.setTransform(588.725,173.225);

	this.shape_978 = new cjs.Shape();
	this.shape_978.graphics.f("#FFFFFF").s().p("AgVBOQANgJAHgVQAIgVAAgZIAAgCQgBgRgDgPQgDgPgGgMQgHgMgIgGIADgKQAMAGAIAPQAKAOAFARQAFARAAATQAAASgFARQgEARgLAOQgIAPgMAGg");
	this.shape_978.setTransform(582,173.875);

	this.shape_979 = new cjs.Shape();
	this.shape_979.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_979.setTransform(575.775,172.375);

	this.shape_980 = new cjs.Shape();
	this.shape_980.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_980.setTransform(568.825,172.625);

	this.shape_981 = new cjs.Shape();
	this.shape_981.graphics.f("#FFFFFF").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgWIAPAAIAAAWIAQAAIAAAMIgQAAIAAA3QAAAFACADQACACAGAAIAHgBIAAANIgMACQgLAAgDgHg");
	this.shape_981.setTransform(563.7,173.25);

	this.shape_982 = new cjs.Shape();
	this.shape_982.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAFQAFAEAJAAQAJAAAFgDQAFgEAAgGQAAgGgEgDQgFgEgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAJAAAMIgQAAQAAgGgFgGQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPAAQgKgBgIgDg");
	this.shape_982.setTransform(556.825,174.25);

	this.shape_983 = new cjs.Shape();
	this.shape_983.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQALgHASAAIAOAAIAAgHQABgIgFgGQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAFgGAHgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgBgDgBgGQgLAKgOABQgNAAgIgIgAgUASQgBAHAFAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_983.setTransform(547.8,174.25);

	this.shape_984 = new cjs.Shape();
	this.shape_984.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_984.setTransform(541.125,172.375);

	this.shape_985 = new cjs.Shape();
	this.shape_985.graphics.f("#FFFFFF").s().p("AgWA0IgBALIgOAAIAAh/IAPAAIAAAwQAKgMAPAAQAQAAAKANQAJANAAAUIAAABQAAAVgKAMQgJANgQAAQgQgBgJgMgAgWgBIAAAnQAIANAOAAQAKABAHgJQAGgJAAgQQAAgRgGgHQgHgIgKAAQgPgBgHAOg");
	this.shape_985.setTransform(534.45,172.45);

	this.shape_986 = new cjs.Shape();
	this.shape_986.graphics.f("#FFFFFF").s().p("AgcAiQgMgNAAgUIAAgBQAAgNAFgKQAFgLAKgGQAJgFALgBQASAAALANQAMANAAAUIAAABQAAANgFAKQgFALgKAGQgJAFgMABQgSAAgKgNgAgRgYQgIAJAAAQQAAAPAIAJQAHAJAKAAQALAAAIgJQAHgJAAgQQAAgPgHgIQgIgKgLAAQgKAAgHAJg");
	this.shape_986.setTransform(524.65,174.25);

	this.shape_987 = new cjs.Shape();
	this.shape_987.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_987.setTransform(517.725,172.375);

	this.shape_988 = new cjs.Shape();
	this.shape_988.graphics.f("#FFFFFF").s().p("AglA/IAAh8IAOAAIABAKQAJgLAQAAQAQAAAJAMQAKANAAAVIAAABQAAAUgKANQgJAMgQAAQgPAAgKgKIAAArgAgWgkIAAAqQAIALAOABQAJAAAHgJQAHgJgBgQQABgQgHgIQgHgJgJAAQgOAAgIANg");
	this.shape_988.setTransform(511.05,175.9);

	this.shape_989 = new cjs.Shape();
	this.shape_989.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_989.setTransform(504.025,172.625);

	this.shape_990 = new cjs.Shape();
	this.shape_990.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgJQgJAKgQABQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAJAKgBQAPAAAHgMIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_990.setTransform(496.925,172.45);

	this.shape_991 = new cjs.Shape();
	this.shape_991.graphics.f("#FFFFFF").s().p("AgBBDQgUgcAAgnQAAgSAFgRQAFgSAKgOQAJgOAKgGIAEAKQgMAKgIATQgHATAAAYIAAAGQgBAgALAXQAHAOAKAIIgEAKQgKgGgJgPg");
	this.shape_991.setTransform(489.85,173.875);

	this.shape_992 = new cjs.Shape();
	this.shape_992.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAAAAgIAAA7g");
	this.shape_992.setTransform(888.45,144.775);

	this.shape_993 = new cjs.Shape();
	this.shape_993.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQAKgJATABIAOAAIAAgIQABgHgFgFQgFgFgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAFgGAHgEQAJgEAIABQAQgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgGQgLALgNgBQgOAAgJgHgAgUASQAAAHAEAEQAFAFAIAAQAGAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_993.setTransform(879.1,144.85);

	this.shape_994 = new cjs.Shape();
	this.shape_994.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgEQgEgFAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgHgFgEQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEACALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKAAgIgDg");
	this.shape_994.setTransform(870.125,144.85);

	this.shape_995 = new cjs.Shape();
	this.shape_995.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_995.setTransform(863.675,143.225);

	this.shape_996 = new cjs.Shape();
	this.shape_996.graphics.f("#FFFFFF").s().p("AglA/IAAh8IAOAAIABALQAJgMAQAAQAQAAAKAMQAJAMAAAWIAAACQAAATgJAMQgKANgQAAQgPAAgKgKIAAArgAgWglIAAArQAIAMAOgBQAJAAAHgIQAGgJAAgQQAAgPgGgJQgHgJgJAAQgOAAgIAMg");
	this.shape_996.setTransform(857,146.5);

	this.shape_997 = new cjs.Shape();
	this.shape_997.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgGQAKgJASABIAPAAIAAgIQAAgHgEgFQgFgFgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgHAFgGQAEgGAIgEQAJgEAIABQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgGQgLALgOgBQgNAAgIgHgAgUASQgBAHAFAEQAFAFAIAAQAGAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_997.setTransform(847.4,144.85);

	this.shape_998 = new cjs.Shape();
	this.shape_998.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_998.setTransform(840.725,142.975);

	this.shape_999 = new cjs.Shape();
	this.shape_999.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQAKgJATABIAOAAIAAgIQABgHgFgFQgFgFgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAEgGQAFgGAIgEQAJgEAIABQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAFAIAAQAGAAAGgFQAHgDACgGIAAgTIgMAAQgbAAAAARg");
	this.shape_999.setTransform(775.7,144.85);

	this.shape_1000 = new cjs.Shape();
	this.shape_1000.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgJALgQAAQgOAAgIgIg");
	this.shape_1000.setTransform(766.425,144.925);

	this.shape_1001 = new cjs.Shape();
	this.shape_1001.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgVIAAAAQAAgVAKgMQAKgMAQAAQAOgBAKAMIAAgvIAPAAIAAB+IgOAAIgBgJQgJALgQgBQgPAAgKgMgAgPgGQgHAIAAARQAAAQAHAIQAGAJAKAAQAPAAAHgOIAAgnQgHgNgPgBQgKABgGAIg");
	this.shape_1001.setTransform(756.725,143.05);

	this.shape_1002 = new cjs.Shape();
	this.shape_1002.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_1002.setTransform(691.775,143.225);

	this.shape_1003 = new cjs.Shape();
	this.shape_1003.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgVIAAAAQAAgVAKgMQAKgMAQAAQAOgBAKAMIAAgvIAPAAIAAB+IgOAAIgBgJQgJALgQgBQgPAAgKgMgAgPgGQgHAIAAARQAAAQAHAIQAGAJAKAAQAPAAAHgOIAAgnQgHgNgPgBQgKABgGAIg");
	this.shape_1003.setTransform(684.675,143.05);

	this.shape_1004 = new cjs.Shape();
	this.shape_1004.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQAKgJATABIAPAAIAAgIQAAgHgFgFQgFgFgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgHAEgGQAFgGAJgEQAIgEAJABQAPgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAFAHAAQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_1004.setTransform(675.45,144.85);

	this.shape_1005 = new cjs.Shape();
	this.shape_1005.graphics.f("#FFFFFF").s().p("AgQBOIAAgNIAHABQAFAAADgDQACgDgBgGIAAhkIAQAAIAABjQAAAagXAAQgFAAgEgBgAABhAQgBgCAAgEQAAgEABgCQACgDAFAAQAEAAADADQACACAAAEQAAAEgCACQgDADgEAAQgFAAgCgDg");
	this.shape_1005.setTransform(667.95,145.05);

	this.shape_1006 = new cjs.Shape();
	this.shape_1006.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAAAAgIAAA7g");
	this.shape_1006.setTransform(662.1,144.775);

	this.shape_1007 = new cjs.Shape();
	this.shape_1007.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgKAJgHQAKgFAJAAQASAAAJALQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLARgXAAQgRABgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_1007.setTransform(652.975,144.85);

	this.shape_1008 = new cjs.Shape();
	this.shape_1008.graphics.f("#FFFFFF").s().p("AAvAuIAAg7QABgJgFgFQgEgFgLAAQgIAAgGAFQgFAGgBAIIAAA7IgPAAIAAg6QAAgUgTAAQgPAAgFANIAABBIgQAAIAAhZIAPAAIAAAKQAKgMARAAQASAAAHAPQAEgHAHgEQAHgEAKAAQAeAAAAAgIAAA7g");
	this.shape_1008.setTransform(640.95,144.775);

	this.shape_1009 = new cjs.Shape();
	this.shape_1009.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_1009.setTransform(573.125,143.225);

	this.shape_1010 = new cjs.Shape();
	this.shape_1010.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgEQgEgFAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgHgFgEQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEACALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKAAgIgDg");
	this.shape_1010.setTransform(566.675,144.85);

	this.shape_1011 = new cjs.Shape();
	this.shape_1011.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQALgJARABIAQAAIAAgIQAAgHgFgFQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAEgGQAGgGAIgEQAIgEAJABQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgNgBQgOAAgJgHgAgVASQAAAHAFAEQAFAFAHAAQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_1011.setTransform(557.65,144.85);

	this.shape_1012 = new cjs.Shape();
	this.shape_1012.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgEQgEgFAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgHgFgEQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEACALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKAAgIgDg");
	this.shape_1012.setTransform(548.675,144.85);

	this.shape_1013 = new cjs.Shape();
	this.shape_1013.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_1013.setTransform(542.225,143.225);

	this.shape_1014 = new cjs.Shape();
	this.shape_1014.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_1014.setTransform(538.075,142.975);

	this.shape_1015 = new cjs.Shape();
	this.shape_1015.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQAKgJATABIAOAAIAAgIQABgHgFgFQgFgFgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgHAEgGQAFgGAIgEQAJgEAIABQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgNgBQgOAAgJgHgAgUASQAAAHAEAEQAFAFAIAAQAGAAAGgFQAHgDACgGIAAgTIgMAAQgaAAAAARg");
	this.shape_1015.setTransform(531.35,144.85);

	this.shape_1016 = new cjs.Shape();
	this.shape_1016.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_1016.setTransform(524.675,143.225);

	this.shape_1017 = new cjs.Shape();
	this.shape_1017.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgEQgEgFAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgHgFgEQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEACALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKAAgIgDg");
	this.shape_1017.setTransform(518.225,144.85);

	this.shape_1018 = new cjs.Shape();
	this.shape_1018.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgKAJgHQAKgFAJAAQASAAAJALQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLARgXAAQgRABgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_1018.setTransform(509.425,144.85);

	this.shape_1019 = new cjs.Shape();
	this.shape_1019.graphics.f("#FFFFFF").s().p("AglA/IAAh8IAOAAIABALQAJgMAQAAQAQAAAKAMQAJAMAAAWIAAACQAAATgJAMQgKANgQAAQgPAAgKgKIAAArgAgWglIAAArQAIAMAOgBQAJAAAHgIQAHgJgBgQQABgPgHgJQgHgJgJAAQgOAAgIAMg");
	this.shape_1019.setTransform(500.25,146.5);

	this.shape_1020 = new cjs.Shape();
	this.shape_1020.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgEQgEgFAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgHgFgEQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEACALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKAAgIgDg");
	this.shape_1020.setTransform(490.925,144.85);

	this.shape_1021 = new cjs.Shape();
	this.shape_1021.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_1021.setTransform(890.925,113.825);

	this.shape_1022 = new cjs.Shape();
	this.shape_1022.graphics.f("#FFFFFF").s().p("AAvAuIAAg7QAAgJgEgFQgEgFgLAAQgIAAgGAFQgGAGAAAIIAAA7IgPAAIAAg6QAAgUgTAAQgPAAgFANIAABBIgQAAIAAhZIAOAAIABAKQAKgMAQAAQAUAAAFAPQAFgHAHgEQAHgEAKAAQAdAAABAgIAAA7g");
	this.shape_1022.setTransform(881.4,115.375);

	this.shape_1023 = new cjs.Shape();
	this.shape_1023.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgHQABgIgFgEQgFgFgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAFgHQAEgGAIgEQAJgDAIgBQAQAAAJAIQAIAIABANIAAApQAAANADAGIAAACIgQAAQgCgCAAgIQgLALgNAAQgOABgJgIgAgVASQABAHAEAEQAFAEAIAAQAGAAAGgDQAHgEACgGIAAgTIgMAAQgbABAAAQg");
	this.shape_1023.setTransform(869.3,115.45);

	this.shape_1024 = new cjs.Shape();
	this.shape_1024.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_1024.setTransform(862.625,113.575);

	this.shape_1025 = new cjs.Shape();
	this.shape_1025.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAPAAIAAgHQAAgIgFgEQgFgFgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgGAEgHQAFgGAJgEQAIgDAJgBQAPAAAJAIQAIAIABANIAAApQAAANADAGIAAACIgQAAQgCgCAAgIQgLALgNAAQgOABgJgIgAgVASQABAHAEAEQAFAEAIAAQAGAAAHgDQAGgEADgGIAAgTIgNAAQgbABAAAQg");
	this.shape_1025.setTransform(855.9,115.45);

	this.shape_1026 = new cjs.Shape();
	this.shape_1026.graphics.f("#FFFFFF").s().p("AgTA7QgIgEgFgHIAIgKQAJANAOAAQALAAAGgHQAGgGABgLIAAgIQgKALgPgBQgQAAgJgMQgKgMAAgWQAAgUAJgNQALgNAPAAQAQAAAJAMIABgKIAOAAIAABXQAAARgLAKQgKALgRgBQgJABgKgFgAgPgoQgHAIABARQgBAPAHAIQAGAIAKAAQAOABAIgNIAAgoQgIgNgOAAQgKAAgGAJg");
	this.shape_1026.setTransform(846.35,117.15);

	this.shape_1027 = new cjs.Shape();
	this.shape_1027.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAAAAgIAAA7g");
	this.shape_1027.setTransform(837.05,115.375);

	this.shape_1028 = new cjs.Shape();
	this.shape_1028.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgLAJgFQAKgHAJAAQASAAAJAMQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLAQgXAAQgRAAgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_1028.setTransform(827.925,115.45);

	this.shape_1029 = new cjs.Shape();
	this.shape_1029.graphics.f("#FFFFFF").s().p("AAvAuIAAg7QABgJgFgFQgEgFgLAAQgIAAgGAFQgFAGgBAIIAAA7IgPAAIAAg6QAAgUgTAAQgPAAgFANIAABBIgQAAIAAhZIAPAAIAAAKQAKgMARAAQASAAAHAPQAEgHAHgEQAHgEAKAAQAdAAABAgIAAA7g");
	this.shape_1029.setTransform(815.9,115.375);

	this.shape_1030 = new cjs.Shape();
	this.shape_1030.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_1030.setTransform(801.825,113.575);

	this.shape_1031 = new cjs.Shape();
	this.shape_1031.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASgBIAQAAIAAgHQgBgIgEgEQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAFgHQAEgGAIgEQAJgDAIgBQAQAAAJAIQAJAIAAANIAAApQAAANADAGIAAACIgQAAQgBgCgBgIQgLALgOAAQgNABgIgIgAgUASQgBAHAFAEQAFAEAHAAQAHAAAGgDQAHgEADgGIAAgTIgMAAQgbABAAAQg");
	this.shape_1031.setTransform(795.1,115.45);

	this.shape_1032 = new cjs.Shape();
	this.shape_1032.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_1032.setTransform(785.8,115.375);

	this.shape_1033 = new cjs.Shape();
	this.shape_1033.graphics.f("#FFFFFF").s().p("AgdAiQgLgMAAgWIAAAAQAAgNAGgKQAEgLAJgFQAKgHALAAQASAAAMANQALANAAAUIAAABQAAANgFALQgFAKgJAGQgKAGgMgBQgRAAgMgMgAgSgYQgGAJAAAQQAAAPAGAJQAIAJAKAAQALAAAIgJQAGgJAAgQQAAgPgGgIQgIgKgLAAQgKAAgIAJg");
	this.shape_1033.setTransform(776.25,115.45);

	this.shape_1034 = new cjs.Shape();
	this.shape_1034.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_1034.setTransform(769.325,113.825);

	this.shape_1035 = new cjs.Shape();
	this.shape_1035.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_1035.setTransform(764.825,115.375);

	this.shape_1036 = new cjs.Shape();
	this.shape_1036.graphics.f("#FFFFFF").s().p("AgWA0IgBALIgOAAIAAh/IAPAAIAAAwQAKgMAPAAQARAAAJANQAJAMAAAVIAAABQAAAUgJANQgKAMgPAAQgQAAgKgMgAgWgBIAAAmQAIAOAOAAQALAAAFgIQAHgJAAgRQAAgPgHgIQgFgJgLABQgPAAgHANg");
	this.shape_1036.setTransform(756.9,113.65);

	this.shape_1037 = new cjs.Shape();
	this.shape_1037.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QgBgJgEgFQgEgFgKAAQgJAAgGAFQgGAGAAAIIAAA7IgPAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgPAAIAAhZIAOAAIABAKQAKgMAQAAQAUAAAFAPQAFgHAHgEQAHgEAKAAQAdAAABAgIAAA7g");
	this.shape_1037.setTransform(744.5,115.375);

	this.shape_1038 = new cjs.Shape();
	this.shape_1038.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgLAJgFQAKgHAJAAQASAAAJAMQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLAQgXAAQgRAAgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_1038.setTransform(732.625,115.45);

	this.shape_1039 = new cjs.Shape();
	this.shape_1039.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAAAAgIAAA7g");
	this.shape_1039.setTransform(718.8,115.375);

	this.shape_1040 = new cjs.Shape();
	this.shape_1040.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgHQABgIgFgEQgFgFgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAFgHQAFgGAHgEQAJgDAIgBQAQAAAJAIQAIAIABANIAAApQAAANADAGIAAACIgQAAQgBgCgBgIQgLALgNAAQgOABgJgIgAgUASQAAAHAEAEQAFAEAIAAQAGAAAGgDQAHgEACgGIAAgTIgMAAQgaABAAAQg");
	this.shape_1040.setTransform(709.45,115.45);

	this.shape_1041 = new cjs.Shape();
	this.shape_1041.graphics.f("#FFFFFF").s().p("AgSA7QgKgEgFgHIAIgKQALANANAAQALAAAGgHQAHgGAAgLIAAgIQgKALgPgBQgQAAgJgMQgKgMAAgWQAAgUAJgNQALgNAQAAQAPAAAJAMIABgKIAOAAIAABXQAAARgLAKQgKALgRgBQgJABgJgFgAgQgoQgFAIAAARQAAAPAFAIQAHAIAKAAQAOABAIgNIAAgoQgIgNgOAAQgKAAgHAJg");
	this.shape_1041.setTransform(699.9,117.15);

	this.shape_1042 = new cjs.Shape();
	this.shape_1042.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_1042.setTransform(690.6,115.375);

	this.shape_1043 = new cjs.Shape();
	this.shape_1043.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_1043.setTransform(683.825,113.825);

	this.shape_1044 = new cjs.Shape();
	this.shape_1044.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_1044.setTransform(679.325,115.375);

	this.shape_1045 = new cjs.Shape();
	this.shape_1045.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASgBIAQAAIAAgHQgBgIgEgEQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAFgHQAEgGAIgEQAJgDAIgBQAQAAAJAIQAJAIAAANIAAApQAAANADAGIAAACIgQAAQgBgCgBgIQgLALgOAAQgNABgIgIgAgUASQgBAHAFAEQAFAEAHAAQAHAAAGgDQAHgEADgGIAAgTIgMAAQgbABAAAQg");
	this.shape_1045.setTransform(671.35,115.45);

	this.shape_1046 = new cjs.Shape();
	this.shape_1046.graphics.f("#FFFFFF").s().p("AgbA0QgKgJAAgRIAQAAQAAALAGAGQAFAFAKAAQAKAAAGgGQAGgGAAgLIAAhVIAQAAIAABUQAAASgKAKQgLAJgRAAQgRAAgKgJg");
	this.shape_1046.setTransform(661.6,113.975);

	this.shape_1047 = new cjs.Shape();
	this.shape_1047.graphics.f("#FFFFFF").s().p("AgGAHQgCgDgBgEQABgDACgCQACgDAEAAQAEAAADADQACACAAADQAAAEgCADQgDACgEAAQgEAAgCgCg");
	this.shape_1047.setTransform(650.5,119.125);

	this.shape_1048 = new cjs.Shape();
	this.shape_1048.graphics.f("#FFFFFF").s().p("AgCAzQgFgHAAgLIAAg3IgQAAIAAgMIAQAAIAAgVIAOAAIAAAVIARAAIAAAMIgRAAIAAA3QAAAFADADQACACAFAAIAHAAIAAAMIgLABQgKAAgFgFg");
	this.shape_1048.setTransform(645.3,114.45);

	this.shape_1049 = new cjs.Shape();
	this.shape_1049.graphics.f("#FFFFFF").s().p("AgcAiQgMgMAAgWIAAAAQAAgNAGgKQAFgLAIgFQAKgHALAAQASAAALANQAMANAAAUIAAABQAAANgFALQgFAKgKAGQgJAGgMgBQgSAAgKgMgAgRgYQgIAJAAAQQAAAPAIAJQAGAJALAAQALAAAIgJQAGgJABgQQgBgPgGgIQgIgKgLAAQgLAAgGAJg");
	this.shape_1049.setTransform(637.95,115.45);

	this.shape_1050 = new cjs.Shape();
	this.shape_1050.graphics.f("#FFFFFF").s().p("AgSA7QgJgEgGgHIAIgKQALANAOAAQAKAAAGgHQAHgGgBgLIAAgIQgJALgPgBQgPAAgKgMQgKgMAAgWQAAgUAKgNQAJgNARAAQAPAAAJAMIABgKIAOAAIAABXQAAARgLAKQgKALgRgBQgJABgJgFgAgQgoQgFAIgBARQABAPAFAIQAHAIAKAAQAPABAGgNIAAgoQgGgNgPAAQgKAAgHAJg");
	this.shape_1050.setTransform(628.15,117.15);

	this.shape_1051 = new cjs.Shape();
	this.shape_1051.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_1051.setTransform(621.475,113.825);

	this.shape_1052 = new cjs.Shape();
	this.shape_1052.graphics.f("#FFFFFF").s().p("AgiAtIAAgMIAwhAIgwAAIAAgNIBDAAIAAALIgxBCIA0AAIAAAMg");
	this.shape_1052.setTransform(615.25,115.45);

	this.shape_1053 = new cjs.Shape();
	this.shape_1053.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_1053.setTransform(604.325,113.575);

	this.shape_1054 = new cjs.Shape();
	this.shape_1054.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgLAJgFQAKgHAJAAQASAAAJAMQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLAQgXAAQgRAAgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_1054.setTransform(597.825,115.45);

	this.shape_1055 = new cjs.Shape();
	this.shape_1055.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgGAAgJIAPAAQABAIAGAFQAFAEAJAAQAJAAAFgDQAFgEAAgGQAAgGgEgDQgFgEgLgCQgMgDgGgDQgHgDgDgFQgEgFAAgGQAAgLAKgIQAJgHANgBQAQAAAJAIQAKAJAAALIgQAAQAAgGgFgEQgFgFgJAAQgHAAgFAEQgEAEAAAGQAAAFAEADQAEADALACQALACAHAEQAIADADAFQAEAFAAAHQAAAMgKAIQgKAGgPAAQgKAAgIgDg");
	this.shape_1055.setTransform(588.875,115.45);

	this.shape_1056 = new cjs.Shape();
	this.shape_1056.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAAAAgIAAA7g");
	this.shape_1056.setTransform(575.25,115.375);

	this.shape_1057 = new cjs.Shape();
	this.shape_1057.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgHQABgIgFgEQgFgFgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAFgHQAFgGAHgEQAJgDAIgBQAQAAAJAIQAIAIABANIAAApQAAANADAGIAAACIgQAAQgBgCgBgIQgLALgNAAQgOABgJgIgAgUASQAAAHAEAEQAFAEAIAAQAGAAAGgDQAHgEACgGIAAgTIgMAAQgaABAAAQg");
	this.shape_1057.setTransform(565.9,115.45);

	this.shape_1058 = new cjs.Shape();
	this.shape_1058.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAGIAABAIgPAAIAAh/IAPAAIAAAxQAKgNAPAAQAdAAAAAfIAAA8g");
	this.shape_1058.setTransform(556.65,113.575);

	this.shape_1059 = new cjs.Shape();
	this.shape_1059.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQALgHARgBIAQAAIAAgHQAAgIgFgEQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgGAEgHQAGgGAIgEQAIgDAJgBQAPAAAJAIQAIAIABANIAAApQAAANADAGIAAACIgQAAQgCgCAAgIQgLALgNAAQgOABgJgIgAgVASQABAHAEAEQAFAEAHAAQAHAAAHgDQAGgEADgGIAAgTIgNAAQgbABAAAQg");
	this.shape_1059.setTransform(547.3,115.45);

	this.shape_1060 = new cjs.Shape();
	this.shape_1060.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_1060.setTransform(540.625,113.575);

	this.shape_1061 = new cjs.Shape();
	this.shape_1061.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgLAJgFQAKgHAJAAQASAAAJAMQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLAQgXAAQgRAAgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_1061.setTransform(534.125,115.45);

	this.shape_1062 = new cjs.Shape();
	this.shape_1062.graphics.f("#FFFFFF").s().p("AgWA0IgBALIgOAAIAAh/IAQAAIAAAwQAJgMAPAAQAQAAAKANQAJAMAAAVIAAABQAAAUgKANQgJAMgPAAQgRAAgJgMgAgVgBIAAAmQAGAOAPAAQALAAAFgIQAHgJAAgRQAAgPgHgIQgFgJgLABQgPAAgGANg");
	this.shape_1062.setTransform(524.95,113.65);

	this.shape_1063 = new cjs.Shape();
	this.shape_1063.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QgBgJgEgFQgEgFgKAAQgJAAgGAFQgGAGgBAIIAAA7IgOAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgPAAIAAhZIAOAAIABAKQAKgMAQAAQATAAAHAPQAEgHAHgEQAHgEAKAAQAeAAAAAgIAAA7g");
	this.shape_1063.setTransform(512.55,115.375);

	this.shape_1064 = new cjs.Shape();
	this.shape_1064.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgLAJgFQAKgHAJAAQASAAAJAMQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLAQgXAAQgRAAgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_1064.setTransform(500.675,115.45);

	this.shape_1065 = new cjs.Shape();
	this.shape_1065.graphics.f("#FFFFFF").s().p("AglA/IAAh7IAOAAIABAKQAJgMAQAAQAQAAAKAMQAJANAAAVIAAACQAAATgJANQgKAMgQAAQgPAAgKgKIAAArgAgWglIAAAqQAIANANAAQAKAAAHgJQAGgJAAgQQAAgQgGgIQgHgJgKAAQgNAAgIAMg");
	this.shape_1065.setTransform(491.5,117.1);

	this.shape_1066 = new cjs.Shape();
	this.shape_1066.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_1066.setTransform(890.875,84.175);

	this.shape_1067 = new cjs.Shape();
	this.shape_1067.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_1067.setTransform(886.725,84.425);

	this.shape_1068 = new cjs.Shape();
	this.shape_1068.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAFQAFAEAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgDQgFgEgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAJAAAMIgQAAQAAgGgFgGQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPAAQgKgBgIgDg");
	this.shape_1068.setTransform(880.275,86.05);

	this.shape_1069 = new cjs.Shape();
	this.shape_1069.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASAAIAPAAIAAgHQAAgIgEgGQgFgEgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgHAFgGQAFgGAHgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgBgDgBgGQgLAKgOABQgNAAgIgIgAgUASQgBAHAFAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_1069.setTransform(871.25,86.05);

	this.shape_1070 = new cjs.Shape();
	this.shape_1070.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAh/IAQAAIAAAxQAKgNAPAAQAdAAAAAfIAAA8g");
	this.shape_1070.setTransform(862,84.175);

	this.shape_1071 = new cjs.Shape();
	this.shape_1071.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_1071.setTransform(836.525,84.425);

	this.shape_1072 = new cjs.Shape();
	this.shape_1072.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_1072.setTransform(832.025,85.975);

	this.shape_1073 = new cjs.Shape();
	this.shape_1073.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQALgHARAAIAQAAIAAgHQAAgIgFgGQgFgEgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAEgGQAGgGAIgEQAIgEAJAAQAPABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgDAAgGQgLAKgNABQgOAAgJgIgAgVASQABAHAEAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_1073.setTransform(824.05,86.05);

	this.shape_1074 = new cjs.Shape();
	this.shape_1074.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgJQgJAKgQABQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAJAKgBQAPAAAHgMIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_1074.setTransform(814.425,84.25);

	this.shape_1075 = new cjs.Shape();
	this.shape_1075.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_1075.setTransform(786.45,85.975);

	this.shape_1076 = new cjs.Shape();
	this.shape_1076.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASAAIAQAAIAAgHQgBgIgEgGQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAFgGQAEgGAIgEQAJgEAIAAQAQABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgBgDgBgGQgLAKgOABQgNAAgIgIgAgUASQgBAHAFAEQAFAFAHgBQAHAAAGgDQAHgEADgGIAAgSIgMAAQgbAAAAAQg");
	this.shape_1076.setTransform(777.1,86.05);

	this.shape_1077 = new cjs.Shape();
	this.shape_1077.graphics.f("#FFFFFF").s().p("AgSA7QgKgEgFgHIAJgJQAKAMAOAAQAKAAAGgHQAHgGgBgLIAAgIQgJALgPAAQgPAAgKgNQgKgNAAgUQAAgWAKgMQAJgNARAAQAPAAAJAMIABgKIAOAAIAABXQAAASgKAJQgLALgRAAQgJAAgJgFgAgQgoQgFAIgBARQABAPAFAIQAHAJAKgBQAPAAAGgMIAAgpQgHgNgOABQgKgBgHAKg");
	this.shape_1077.setTransform(767.55,87.75);

	this.shape_1078 = new cjs.Shape();
	this.shape_1078.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_1078.setTransform(758.25,85.975);

	this.shape_1079 = new cjs.Shape();
	this.shape_1079.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_1079.setTransform(751.475,84.425);

	this.shape_1080 = new cjs.Shape();
	this.shape_1080.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_1080.setTransform(746.975,85.975);

	this.shape_1081 = new cjs.Shape();
	this.shape_1081.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQALgHARAAIAQAAIAAgHQAAgIgFgGQgFgEgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAEgGQAGgGAIgEQAIgEAJAAQAPABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgDAAgGQgLAKgNABQgOAAgJgIgAgVASQAAAHAFAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_1081.setTransform(739,86.05);

	this.shape_1082 = new cjs.Shape();
	this.shape_1082.graphics.f("#FFFFFF").s().p("AgQBOIAAgNIAHABQAFAAADgCQABgDAAgHIAAhkIAQAAIAABkQAAAagXAAQgFAAgEgCgAABg/QgBgDAAgEQAAgDABgDQADgCAEgBQAEABADACQACADAAADQAAAEgCADQgDACgEAAQgEAAgDgCg");
	this.shape_1082.setTransform(731.5,86.25);

	this.shape_1083 = new cjs.Shape();
	this.shape_1083.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_1083.setTransform(706.95,85.975);

	this.shape_1084 = new cjs.Shape();
	this.shape_1084.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQALgHASAAIAPAAIAAgHQAAgIgFgGQgFgEgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAEgGQAGgGAIgEQAIgEAJAAQAPABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgCgDAAgGQgLAKgNABQgOAAgJgIgAgVASQABAHAEAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_1084.setTransform(697.6,86.05);

	this.shape_1085 = new cjs.Shape();
	this.shape_1085.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_1085.setTransform(689.275,84.175);

	this.shape_1086 = new cjs.Shape();
	this.shape_1086.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATAAIAOAAIAAgHQABgIgFgGQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAFgGAHgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgBgDgBgGQgLAKgNABQgOAAgJgIgAgUASQAAAHAEAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgMAAQgaAAAAAQg");
	this.shape_1086.setTransform(679.75,86.05);

	this.shape_1087 = new cjs.Shape();
	this.shape_1087.graphics.f("#FFFFFF").s().p("AglA/IAAh8IAOAAIABAKQAKgLAPAAQAQAAAJAMQAKANAAAVIAAABQAAAUgKANQgJAMgQAAQgPAAgJgKIAAArgAgVgkIAAAqQAGALAPABQAKAAAGgJQAHgJAAgQQAAgQgHgIQgGgJgKAAQgPAAgGANg");
	this.shape_1087.setTransform(670.55,87.7);

	this.shape_1088 = new cjs.Shape();
	this.shape_1088.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgJALgQAAQgOAAgIgIg");
	this.shape_1088.setTransform(660.925,86.125);

	this.shape_1089 = new cjs.Shape();
	this.shape_1089.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_1089.setTransform(653.825,85.975);

	this.shape_1090 = new cjs.Shape();
	this.shape_1090.graphics.f("#FFFFFF").s().p("AgaAiQgLgLAAgUIAAgDQAAgNAFgKQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_1090.setTransform(646.075,86.05);

	this.shape_1091 = new cjs.Shape();
	this.shape_1091.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QgBgJgEgFQgEgFgKAAQgJAAgGAFQgGAGgBAIIAAA7IgOAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgPAAIAAhZIAOAAIABAKQAKgMAQAAQAUAAAGAPQAEgHAHgEQAHgEAKAAQAeAAAAAgIAAA7g");
	this.shape_1091.setTransform(634.05,85.975);

	this.shape_1092 = new cjs.Shape();
	this.shape_1092.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAh/IAQAAIAAAxQAKgNAPAAQAdAAAAAfIAAA8g");
	this.shape_1092.setTransform(603.25,84.175);

	this.shape_1093 = new cjs.Shape();
	this.shape_1093.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgJALgQAAQgOAAgIgIg");
	this.shape_1093.setTransform(593.875,86.125);

	this.shape_1094 = new cjs.Shape();
	this.shape_1094.graphics.f("#FFFFFF").s().p("AgWA0IgBALIgOAAIAAh/IAQAAIAAAwQAJgMAPAAQAQAAAKANQAJANAAAUIAAABQAAAVgKAMQgJANgQAAQgPgBgKgMgAgVgBIAAAnQAGANAPAAQAKABAHgJQAGgJAAgQQAAgRgGgHQgHgIgKAAQgPgBgGAOg");
	this.shape_1094.setTransform(584.6,84.25);

	this.shape_1095 = new cjs.Shape();
	this.shape_1095.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgJALgQAAQgOAAgIgIg");
	this.shape_1095.setTransform(574.975,86.125);

	this.shape_1096 = new cjs.Shape();
	this.shape_1096.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgQAAIAAgMIAQAAIAAgWIAOAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFACADQADACAFAAIAIgBIAAANIgMACQgLAAgEgHg");
	this.shape_1096.setTransform(567.25,85.05);

	this.shape_1097 = new cjs.Shape();
	this.shape_1097.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_1097.setTransform(541.35,85.975);

	this.shape_1098 = new cjs.Shape();
	this.shape_1098.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQALgHARAAIAQAAIAAgHQAAgIgFgGQgFgEgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAEgGQAGgGAIgEQAIgEAJAAQAPABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgDAAgGQgLAKgNABQgOAAgJgIgAgVASQAAAHAFAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_1098.setTransform(532,86.05);

	this.shape_1099 = new cjs.Shape();
	this.shape_1099.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAFQAFAEAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgDQgFgEgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAJAAAMIgQAAQAAgGgFgGQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPAAQgKgBgIgDg");
	this.shape_1099.setTransform(523.025,86.05);

	this.shape_1100 = new cjs.Shape();
	this.shape_1100.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_1100.setTransform(516.575,84.425);

	this.shape_1101 = new cjs.Shape();
	this.shape_1101.graphics.f("#FFFFFF").s().p("AglA/IAAh8IAOAAIABAKQAKgLAPAAQAQAAAJAMQAKANAAAVIAAABQAAAUgKANQgJAMgQAAQgPAAgJgKIAAArgAgVgkIAAAqQAGALAPABQAKAAAGgJQAHgJAAgQQAAgQgHgIQgGgJgKAAQgPAAgGANg");
	this.shape_1101.setTransform(509.9,87.7);

	this.shape_1102 = new cjs.Shape();
	this.shape_1102.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATAAIAOAAIAAgHQABgIgFgGQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAEgGQAFgGAIgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgDAAgGQgLAKgNABQgOAAgJgIgAgVASQABAHAEAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgMAAQgbAAAAAQg");
	this.shape_1102.setTransform(500.3,86.05);

	this.shape_1103 = new cjs.Shape();
	this.shape_1103.graphics.f("#FFFFFF").s().p("AgkA8IAAh3IAQAAIAABrIA5AAIAAAMg");
	this.shape_1103.setTransform(491.625,84.5);

	this.judulKI_2 = new lib.putih1();
	this.judulKI_2.name = "judulKI_2";
	this.judulKI_2.setTransform(714.9,185.05,1.184,4.251,0,0,0,0.3,0.5);
	this.judulKI_2.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);

	this.instance_5 = new lib.Bitmap22();
	this.instance_5.setTransform(7,4);

	this.shape_1104 = new cjs.Shape();
	this.shape_1104.graphics.f("#FFFFFF").s().p("AhJCGQgjgVgUgjQgVgjgBgrQABgqAVgjQAUgjAjgVQAjgVArAAQAYAAAWAHQAXAHAUAOQATANAOATQAOASAJAWIABACIgDABIgOAFIgDABIAAgCQgIgTgMgQQgMgQgRgLQgRgMgUgHQgTgGgVAAQglABgeASQgfASgSAeQgSAfAAAkQAAAmASAeQASAeAfASQAeASAlABQAVAAATgGQAUgHARgMQARgLAMgQQAMgQAIgTIAAgCIADABIAOAFIADABIgBACQgJAWgOASQgOATgTANQgUAOgXAHQgWAHgYAAQgrAAgjgVg");
	this.shape_1104.setTransform(376.275,339.775);

	this.judulKI_3 = new lib.klas4Penunjuk();
	this.judulKI_3.name = "judulKI_3";
	this.judulKI_3.setTransform(379.05,334,0.1178,0.8008,0,0,0,1.7,0.6);
	this.judulKI_3.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);

	this.shape_1105 = new cjs.Shape();
	this.shape_1105.graphics.f("#FFFFFF").s().p("Ah6CbIAAk1ICiAAQAXAAASALQATALALATQAMATAAAWQAAAXgMAUQgLATgUAKQAUALALATQAMAUAAAXQAAAXgMASQgLATgTALQgSALgXAAgAhlCHICNAAQARAAAOgJQAOgIAIgOQAJgOAAgRQAAgSgJgOQgIgOgOgIQgOgJgRAAIiNAAgAhlgJICNAAQARAAAOgJQAOgIAIgOQAJgOAAgSQAAgRgJgOQgIgOgOgIQgOgIgRgBIiNAAg");
	this.shape_1105.setTransform(235.75,339.775);

	this.judulKI_4 = new lib.klas4Penunjuk();
	this.judulKI_4.name = "judulKI_4";
	this.judulKI_4.setTransform(239.65,334,0.1178,0.8008,0,0,0,1.7,0.6);
	this.judulKI_4.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);

	this.shape_1106 = new cjs.Shape();
	this.shape_1106.graphics.f("#FFFFFF").s().p("ABmCbIgBgBIgghZIiJAAIggBZIgBABIgWAAIACgDIBvkxIABgBIATAAIABABIBvExIACADgAA9AtIg9inIg8CnIB5AAg");
	this.shape_1106.setTransform(103.025,339.775);

	this.judulKI_5 = new lib.klas4Penunjuk();
	this.judulKI_5.name = "judulKI_5";
	this.judulKI_5.setTransform(106.85,334,0.1178,0.8008,0,0,0,2.1,0.6);
	this.judulKI_5.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);

	this.instance_6 = new lib.Bitmap9();
	this.instance_6.setTransform(316,175.75,1.267,1.267);

	this.instance_7 = new lib.Bitmap8();
	this.instance_7.setTransform(182,176.75,1.267,1.267);

	this.instance_8 = new lib.Bitmap7();
	this.instance_8.setTransform(56,175.75,1.267,1.267);

	this.shape_1107 = new cjs.Shape();
	this.shape_1107.graphics.f("#FFFFFF").s().p("AgGAGQgBgCAAgEQAAgCABgDQADgCADAAQAEAAACACQADADAAACQAAAEgDACQgCACgEAAQgDAAgDgCg");
	this.shape_1107.setTransform(634.25,442.475);

	this.shape_1108 = new cjs.Shape();
	this.shape_1108.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1108.setTransform(619.975,439.25);

	this.shape_1109 = new cjs.Shape();
	this.shape_1109.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1109.setTransform(603.525,439.25);

	this.shape_1110 = new cjs.Shape();
	this.shape_1110.graphics.f("#FFFFFF").s().p("AgPAlQgHgDgEgGQgFgGAAgHIAOAAQABAHAEAEQAGAEAHAAQAIAAAEgDQAFgEAAgFQAAgFgEgDQgFgDgJgCQgKgDgGgCQgGgCgDgFQgDgEAAgGQAAgJAIgIQAJgGAMAAQANAAAIAGQAJAIgBAKIgNAAQAAgFgFgEQgEgEgHAAQgHAAgEADQgEAEAAAEQAAAFADADQAFACAJACQAKADAGADQAHADADAEQACAEAAAHQAAAKgIAHQgJAGgNAAQgJAAgHgEg");
	this.shape_1110.setTransform(580.6,439.25);

	this.shape_1111 = new cjs.Shape();
	this.shape_1111.graphics.f("#FFFFFF").s().p("AgPAlQgIgDgDgGQgEgGgBgHIAOAAQAAAHAGAEQAEAEAIAAQAHAAAFgDQAFgEAAgFQAAgFgEgDQgEgDgKgCQgKgDgGgCQgGgCgDgFQgDgEAAgGQAAgJAJgIQAHgGAMAAQAOAAAIAGQAIAIAAAKIgNAAQAAgFgFgEQgEgEgIAAQgGAAgEADQgEAEgBAEQAAAFAFADQADACAJACQALADAGADQAGADADAEQADAEAAAHQABAKgJAHQgJAGgNAAQgJAAgHgEg");
	this.shape_1111.setTransform(569.2,439.25);

	this.shape_1112 = new cjs.Shape();
	this.shape_1112.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1112.setTransform(549.275,439.25);

	this.shape_1113 = new cjs.Shape();
	this.shape_1113.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_1113.setTransform(531.25,437.8);

	this.shape_1114 = new cjs.Shape();
	this.shape_1114.graphics.f("#FFFFFF").s().p("AgPAlQgIgDgEgGQgDgGAAgHIANAAQAAAHAGAEQAEAEAIAAQAHAAAGgDQAEgEAAgFQAAgFgEgDQgEgDgKgCQgKgDgGgCQgGgCgDgFQgDgEAAgGQAAgJAJgIQAHgGAMAAQAOAAAJAGQAHAIAAAKIgNAAQAAgFgFgEQgEgEgIAAQgGAAgEADQgFAEAAAEQAAAFAFADQAEACAIACQALADAGADQAGADADAEQADAEABAHQAAAKgJAHQgJAGgNAAQgJAAgHgEg");
	this.shape_1114.setTransform(501.8,439.25);

	this.shape_1115 = new cjs.Shape();
	this.shape_1115.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_1115.setTransform(496.15,437.8);

	this.shape_1116 = new cjs.Shape();
	this.shape_1116.graphics.f("#FFFFFF").s().p("AgPAlQgHgDgFgGQgDgGAAgHIANAAQABAHAEAEQAFAEAIAAQAHAAAGgDQAEgEAAgFQAAgFgEgDQgEgDgKgCQgKgDgGgCQgGgCgDgFQgDgEAAgGQAAgJAIgIQAJgGALAAQAOAAAJAGQAHAIABAKIgOAAQAAgFgEgEQgGgEgHAAQgGAAgEADQgFAEABAEQAAAFADADQAEACAKACQAKADAGADQAGADAEAEQADAEAAAHQAAAKgJAHQgIAGgOAAQgIAAgIgEg");
	this.shape_1116.setTransform(490.4,439.25);

	this.shape_1117 = new cjs.Shape();
	this.shape_1117.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1117.setTransform(889.075,411.25);

	this.shape_1118 = new cjs.Shape();
	this.shape_1118.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1118.setTransform(875.825,411.25);

	this.shape_1119 = new cjs.Shape();
	this.shape_1119.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1119.setTransform(854.525,411.25);

	this.shape_1120 = new cjs.Shape();
	this.shape_1120.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1120.setTransform(839.825,411.25);

	this.shape_1121 = new cjs.Shape();
	this.shape_1121.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1121.setTransform(818.525,411.25);

	this.shape_1122 = new cjs.Shape();
	this.shape_1122.graphics.f("#FFFFFF").s().p("AgPAlQgHgDgEgGQgFgGAAgHIAOAAQABAHAEAEQAGAEAHAAQAIAAAEgDQAFgEAAgEQAAgGgEgDQgFgDgJgDQgKgCgGgCQgGgCgDgFQgDgEAAgGQAAgJAIgIQAJgGAMAAQANAAAIAGQAJAIgBAKIgNAAQAAgFgFgEQgEgEgHAAQgHAAgEADQgEAEAAAFQAAAEADADQAFACAJACQAKADAGADQAHADADAEQACAEAAAHQAAAKgIAHQgJAGgNAAQgJAAgHgEg");
	this.shape_1122.setTransform(810.55,411.25);

	this.shape_1123 = new cjs.Shape();
	this.shape_1123.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgFgHIAHgIQAKALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgJAJgNAAQgOAAgIgLQgIgLAAgTQAAgSAIgLQAJgLAOAAQANAAAIAKIABgIIAMAAIAABMQAAAPgJAJQgJAJgPAAQgHAAgJgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgIAAgHAHg");
	this.shape_1123.setTransform(795.8,412.725);

	this.shape_1124 = new cjs.Shape();
	this.shape_1124.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1124.setTransform(779.375,411.25);

	this.shape_1125 = new cjs.Shape();
	this.shape_1125.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1125.setTransform(749.275,411.25);

	this.shape_1126 = new cjs.Shape();
	this.shape_1126.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgFgHIAHgIQAKALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgIAJgOAAQgOAAgIgLQgIgLAAgTQAAgSAIgLQAJgLAOAAQANAAAJAKIAAgIIAMAAIAABMQAAAPgJAJQgJAJgPAAQgIAAgIgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgIAAgHAHg");
	this.shape_1126.setTransform(737.2,412.725);

	this.shape_1127 = new cjs.Shape();
	this.shape_1127.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1127.setTransform(729.075,411.25);

	this.shape_1128 = new cjs.Shape();
	this.shape_1128.graphics.f("#FFFFFF").s().p("AgUAuIgBAJIgLAAIAAhvIANAAIAAAqQAIgKAOAAQAOAAAIALQAIAKAAATIAAABQAAASgIALQgJALgNAAQgOAAgJgLgAgTAAIAAAhQAGAMANAAQAJAAAFgHQAGgIAAgPQAAgNgGgHQgFgIgJABQgOAAgFAMg");
	this.shape_1128.setTransform(721,409.65);

	this.shape_1129 = new cjs.Shape();
	this.shape_1129.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1129.setTransform(697.675,411.25);

	this.shape_1130 = new cjs.Shape();
	this.shape_1130.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1130.setTransform(677.075,411.25);

	this.shape_1131 = new cjs.Shape();
	this.shape_1131.graphics.f("#FFFFFF").s().p("AggA3IAAhsIAMAAIABAIQAIgKAOABQAOAAAIAKQAIALAAATIAAACQAAAQgIAMQgIALgOAAQgOAAgIgKIAAAmgAgTghIAAAmQAGAKANABQAIgBAGgHQAGgIAAgPQAAgMgGgJQgGgHgIAAQgNAAgGAKg");
	this.shape_1131.setTransform(668.975,412.7);

	this.shape_1132 = new cjs.Shape();
	this.shape_1132.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1132.setTransform(660.525,411.25);

	this.shape_1133 = new cjs.Shape();
	this.shape_1133.graphics.f("#FFFFFF").s().p("AgYAtQgIgLAAgSIAAgBQAAgRAIgLQAJgLANAAQAOAAAIAJIAAgpIANAAIAABvIgMAAIgBgIQgIAKgOAAQgNAAgJgMgAgNgFQgGAGAAAQQAAANAGAIQAFAHAJAAQANAAAGgLIAAgjQgGgLgNAAQgJgBgFAIg");
	this.shape_1133.setTransform(652.05,409.65);

	this.shape_1134 = new cjs.Shape();
	this.shape_1134.graphics.f("#FFFFFF").s().p("AgWAeQgLgKABgSIAAgCQgBgLAFgJQAEgJAJgGQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAAMAGAGQAIAIAJAAQAGAAAFgDQAFgDAEgFIAIAHQgKAPgTAAQgPAAgKgLgAgMgXQgGAGgBAKIAnAAIAAgBQgBgJgFgHQgEgFgJAAQgHAAgGAGg");
	this.shape_1134.setTransform(635.85,411.25);

	this.shape_1135 = new cjs.Shape();
	this.shape_1135.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1135.setTransform(599.725,411.25);

	this.shape_1136 = new cjs.Shape();
	this.shape_1136.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1136.setTransform(583.975,411.25);

	this.shape_1137 = new cjs.Shape();
	this.shape_1137.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1137.setTransform(569.275,411.25);

	this.shape_1138 = new cjs.Shape();
	this.shape_1138.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1138.setTransform(538.475,411.25);

	this.shape_1139 = new cjs.Shape();
	this.shape_1139.graphics.f("#FFFFFF").s().p("AgXA4IgFgBIAAgLIAEAAQAGAAAEgDQAEgDADgIIADgIIgdhMIAPAAIATA5IASg5IAPAAIggBaQgGATgQABg");
	this.shape_1139.setTransform(530.825,412.85);

	this.shape_1140 = new cjs.Shape();
	this.shape_1140.graphics.f("#FFFFFF").s().p("AgPAlQgIgDgDgGQgFgGAAgHIAOAAQAAAHAFAEQAGAEAHAAQAIAAAEgDQAFgEAAgEQAAgGgEgDQgEgDgKgDQgKgCgGgCQgGgCgDgFQgDgEAAgGQAAgJAJgIQAHgGANAAQANAAAIAGQAIAIAAAKIgNAAQAAgFgFgEQgFgEgGAAQgHAAgEADQgEAEgBAFQAAAEAFADQADACAJACQALADAGADQAHADADAEQACAEAAAHQABAKgJAHQgJAGgNAAQgIAAgIgEg");
	this.shape_1140.setTransform(515.1,411.25);

	this.shape_1141 = new cjs.Shape();
	this.shape_1141.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1141.setTransform(490.625,411.25);

	this.shape_1142 = new cjs.Shape();
	this.shape_1142.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1142.setTransform(880.725,383.25);

	this.shape_1143 = new cjs.Shape();
	this.shape_1143.graphics.f("#FFFFFF").s().p("AgYAtQgJgKAAgTIAAgBQAAgRAJgLQAIgLAPAAQAMAAAJAJIAAgpIAOAAIAABvIgNAAIgBgIQgIAKgNAAQgOAAgJgMgAgNgFQgGAGAAAQQAAANAGAIQAFAHAJAAQANAAAGgLIAAgjQgHgLgMAAQgJgBgFAIg");
	this.shape_1143.setTransform(872.25,381.65);

	this.shape_1144 = new cjs.Shape();
	this.shape_1144.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgLIAPAAIAAgTIAMAAIAAATIAPAAIAAALIgPAAIAAAwQAAAEACADQACADAFgBIAHAAIAAAKIgLACQgJAAgEgFg");
	this.shape_1144.setTransform(858.375,382.35);

	this.shape_1145 = new cjs.Shape();
	this.shape_1145.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_1145.setTransform(813.85,381.8);

	this.shape_1146 = new cjs.Shape();
	this.shape_1146.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1146.setTransform(796.025,383.25);

	this.shape_1147 = new cjs.Shape();
	this.shape_1147.graphics.f("#FFFFFF").s().p("AgXAeQgKgKABgSIAAgCQAAgLAEgKQAEgIAJgGQAIgFAIAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAAMAGAGQAIAIAIAAQAHAAAFgDQAFgDAEgFIAIAHQgKAPgTAAQgPAAgLgLgAgMgXQgGAGgBAKIAnAAIAAAAQAAgKgGgHQgEgFgJAAQgHAAgGAGg");
	this.shape_1147.setTransform(784.45,383.25);

	this.shape_1148 = new cjs.Shape();
	this.shape_1148.graphics.f("#FFFFFF").s().p("AgZAeQgKgLAAgTIAAAAQAAgLAFgKQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAAMgEAIQgFAKgIAFQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgJAAgNQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_1148.setTransform(739.075,383.25);

	this.shape_1149 = new cjs.Shape();
	this.shape_1149.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgLIAPAAIAAgTIAMAAIAAATIAPAAIAAALIgPAAIAAAwQAAAEACADQACADAFgBIAHAAIAAAKIgLACQgJAAgEgFg");
	this.shape_1149.setTransform(732.175,382.35);

	this.shape_1150 = new cjs.Shape();
	this.shape_1150.graphics.f("#FFFFFF").s().p("AgZAeQgKgLAAgTIAAAAQAAgLAFgKQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAAMgEAIQgFAKgIAFQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgJAAgNQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_1150.setTransform(725.675,383.25);

	this.shape_1151 = new cjs.Shape();
	this.shape_1151.graphics.f("#FFFFFF").s().p("AggA3IAAhsIAMAAIABAJQAIgLAOABQAOAAAIAKQAIALAAATIAAABQAAASgIALQgIAKgOABQgOAAgIgJIAAAlgAgTghIAAAlQAGAMANAAQAIgBAGgHQAGgIAAgPQAAgNgGgHQgGgIgIAAQgNAAgGAKg");
	this.shape_1151.setTransform(717.375,384.7);

	this.shape_1152 = new cjs.Shape();
	this.shape_1152.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_1152.setTransform(711.2,381.8);

	this.shape_1153 = new cjs.Shape();
	this.shape_1153.graphics.f("#FFFFFF").s().p("AgYAtQgJgKABgTIAAgBQgBgRAJgLQAJgLAOAAQAMAAAJAJIAAgpIANAAIAABvIgMAAIgBgIQgIAKgNAAQgOAAgJgMgAgNgFQgGAGAAAQQAAANAGAIQAFAHAJAAQANAAAGgLIAAgjQgHgLgMAAQgJgBgFAIg");
	this.shape_1153.setTransform(704.95,381.65);

	this.shape_1154 = new cjs.Shape();
	this.shape_1154.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1154.setTransform(689.625,383.25);

	this.shape_1155 = new cjs.Shape();
	this.shape_1155.graphics.f("#FFFFFF").s().p("AgXA4IgFgBIAAgMIAEAAQAGAAAEgCQAEgDADgIIADgIIgdhNIAPAAIATA6IASg6IAPAAIggBbQgGATgQABg");
	this.shape_1155.setTransform(681.975,384.85);

	this.shape_1156 = new cjs.Shape();
	this.shape_1156.graphics.f("#FFFFFF").s().p("AARA4IAAg0QABgIgEgEQgEgEgJAAQgFAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLANAAQAZAAAAAbIAAA0g");
	this.shape_1156.setTransform(666.05,381.575);

	this.shape_1157 = new cjs.Shape();
	this.shape_1157.graphics.f("#FFFFFF").s().p("AgTAuIgCAJIgMAAIAAhvIAOAAIAAAqQAIgKANAAQAPAAAIAKQAJALAAATIAAABQAAASgJALQgJALgOAAQgOAAgHgLgAgTAAIAAAhQAGAMANAAQAJAAAFgHQAGgIAAgPQAAgOgGgGQgFgIgJABQgOAAgFAMg");
	this.shape_1157.setTransform(649.65,381.65);

	this.shape_1158 = new cjs.Shape();
	this.shape_1158.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgLIAPAAIAAgTIAMAAIAAATIAPAAIAAALIgPAAIAAAwQAAAEACADQACADAFgBIAHAAIAAAKIgLACQgJAAgEgFg");
	this.shape_1158.setTransform(634.375,382.35);

	this.shape_1159 = new cjs.Shape();
	this.shape_1159.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1159.setTransform(612.575,383.25);

	this.shape_1160 = new cjs.Shape();
	this.shape_1160.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_1160.setTransform(606.7,381.8);

	this.shape_1161 = new cjs.Shape();
	this.shape_1161.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgFgHIAHgIQAKALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgJAJgNAAQgOAAgIgLQgIgLgBgTQABgSAIgLQAJgLAOAAQANAAAIAKIABgIIAMAAIAABMQAAAPgJAJQgJAJgPAAQgHAAgJgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgIAAgHAHg");
	this.shape_1161.setTransform(600.5,384.725);

	this.shape_1162 = new cjs.Shape();
	this.shape_1162.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1162.setTransform(592.375,383.25);

	this.shape_1163 = new cjs.Shape();
	this.shape_1163.graphics.f("#FFFFFF").s().p("AgUAuIgBAJIgLAAIAAhvIANAAIAAAqQAIgKANAAQAPAAAIAKQAJALgBATIAAABQABASgJALQgJALgOAAQgNAAgJgLgAgTAAIAAAhQAGAMANAAQAJAAAFgHQAGgIAAgPQAAgOgGgGQgFgIgJABQgOAAgFAMg");
	this.shape_1163.setTransform(584.3,381.65);

	this.shape_1164 = new cjs.Shape();
	this.shape_1164.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1164.setTransform(568.625,383.25);

	this.shape_1165 = new cjs.Shape();
	this.shape_1165.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_1165.setTransform(555.15,381.8);

	this.shape_1166 = new cjs.Shape();
	this.shape_1166.graphics.f("#FFFFFF").s().p("AgYAuQgIgIgBgPIAPAAQAAAJAEAGQAFAEAJAAQAIAAAGgFQAFgFABgKIAAhLIANAAIAABLQAAAPgJAIQgIAJgQAAQgPAAgJgIg");
	this.shape_1166.setTransform(548.75,381.95);

	this.shape_1167 = new cjs.Shape();
	this.shape_1167.graphics.f("#FFFFFF").s().p("AgFAGQgDgCAAgEQAAgCADgDQABgCAEAAQAEAAACACQACADAAACQAAAEgCACQgCACgEAAQgEAAgBgCg");
	this.shape_1167.setTransform(535.75,386.475);

	this.shape_1168 = new cjs.Shape();
	this.shape_1168.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1168.setTransform(529.775,383.25);

	this.shape_1169 = new cjs.Shape();
	this.shape_1169.graphics.f("#FFFFFF").s().p("AgXA4IgFgBIAAgMIAEAAQAGAAAEgCQAEgDADgIIADgIIgdhNIAPAAIATA6IASg6IAPAAIggBbQgGATgQABg");
	this.shape_1169.setTransform(522.125,384.85);

	this.shape_1170 = new cjs.Shape();
	this.shape_1170.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgIAAQgGAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_1170.setTransform(506.15,383.175);

	this.shape_1171 = new cjs.Shape();
	this.shape_1171.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_1171.setTransform(500.2,381.8);

	this.shape_1172 = new cjs.Shape();
	this.shape_1172.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1172.setTransform(494.275,383.25);

	this.shape_1173 = new cjs.Shape();
	this.shape_1173.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAAMIAAAkQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAPQAAAHAEAEQAEADAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_1173.setTransform(880.525,355.25);

	this.shape_1174 = new cjs.Shape();
	this.shape_1174.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgEQAAgCACgDQACgCADAAQAEAAACACQACADAAACQAAAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_1174.setTransform(874.65,353.8);

	this.shape_1175 = new cjs.Shape();
	this.shape_1175.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgEgHIAGgIQAJALANAAQAJAAAGgGQAFgFAAgKIAAgHQgIAJgNAAQgPAAgIgLQgJgLAAgTQAAgSAJgLQAIgLAPAAQAOAAAHAKIABgIIANAAIAABMQgBAPgIAJQgKAJgPAAQgIAAgIgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgIAAgHAHg");
	this.shape_1175.setTransform(868.45,356.725);

	this.shape_1176 = new cjs.Shape();
	this.shape_1176.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAAMIAAAkQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAPQAAAHAEAEQAEADAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_1176.setTransform(860.325,355.25);

	this.shape_1177 = new cjs.Shape();
	this.shape_1177.graphics.f("#FFFFFF").s().p("AgTAuIgBAJIgNAAIAAhvIAOAAIAAAqQAIgKANAAQAPAAAIAKQAJALAAATIAAABQAAASgJALQgIALgPAAQgOAAgHgLgAgTAAIAAAhQAGAMANAAQAJAAAGgHQAFgIAAgPQAAgOgFgGQgGgIgJAAQgNAAgGANg");
	this.shape_1177.setTransform(852.25,353.65);

	this.shape_1178 = new cjs.Shape();
	this.shape_1178.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAAMIAAAkQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAPQAAAHAEAEQAEADAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_1178.setTransform(831.475,355.25);

	this.shape_1179 = new cjs.Shape();
	this.shape_1179.graphics.f("#FFFFFF").s().p("AgWAeQgLgKABgSIAAgCQgBgLAFgKQAEgIAJgGQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAGAHQAIAIAJAAQAGAAAFgDQAFgDAEgFIAIAHQgKAPgTAAQgPAAgKgLgAgMgXQgGAGgBALIAnAAIAAgBQgBgLgFgGQgEgFgJAAQgHAAgGAGg");
	this.shape_1179.setTransform(806.85,355.25);

	this.shape_1180 = new cjs.Shape();
	this.shape_1180.graphics.f("#FFFFFF").s().p("AgYAtQgIgKAAgTIAAgBQAAgRAIgLQAIgLAOAAQAOAAAIAJIAAgpIANAAIAABvIgMAAIgBgIQgIAKgOAAQgNAAgJgMgAgNgFQgGAGAAAQQAAANAGAIQAFAHAJAAQANAAAGgLIAAgjQgGgMgNAAQgJAAgFAIg");
	this.shape_1180.setTransform(798.4,353.65);

	this.shape_1181 = new cjs.Shape();
	this.shape_1181.graphics.f("#FFFFFF").s().p("AASAoIAAgzQgBgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_1181.setTransform(786.2,355.175);

	this.shape_1182 = new cjs.Shape();
	this.shape_1182.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAAMIAAAkQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAPQAAAHAEAEQAEADAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_1182.setTransform(777.975,355.25);

	this.shape_1183 = new cjs.Shape();
	this.shape_1183.graphics.f("#FFFFFF").s().p("AASA4IAAg0QAAgIgFgEQgDgEgIAAQgGAAgFAEQgFADgCAFIAAA4IgOAAIAAhvIAOAAIAAArQAJgLAMAAQAaAAAAAbIAAA0g");
	this.shape_1183.setTransform(769.8,353.575);

	this.shape_1184 = new cjs.Shape();
	this.shape_1184.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAAMIAAAkQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAPQAAAHAEAEQAEADAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_1184.setTransform(761.575,355.25);

	this.shape_1185 = new cjs.Shape();
	this.shape_1185.graphics.f("#FFFFFF").s().p("AgXAeQgKgKAAgSIAAgCQABgLAEgKQAEgIAIgGQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAGAHQAHAIAJAAQAHAAAGgDQAFgDADgFIAIAHQgJAPgVAAQgOAAgLgLgAgMgXQgGAGAAALIAmAAIAAgBQAAgLgGgGQgEgFgJAAQgHAAgGAGg");
	this.shape_1185.setTransform(750,355.25);

	this.shape_1186 = new cjs.Shape();
	this.shape_1186.graphics.f("#FFFFFF").s().p("AgUAuIgBAJIgLAAIAAhvIANAAIAAAqQAIgKAOAAQAOAAAIAKQAIALAAATIAAABQAAASgIALQgIALgOAAQgOAAgJgLgAgTAAIAAAhQAGAMANAAQAJAAAFgHQAGgIAAgPQAAgOgGgGQgFgIgJAAQgOAAgFANg");
	this.shape_1186.setTransform(741.95,353.65);

	this.shape_1187 = new cjs.Shape();
	this.shape_1187.graphics.f("#FFFFFF").s().p("AgXAeQgKgKAAgSIAAgCQABgLAEgKQAEgIAJgGQAHgFAJAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAHQAIAIAIAAQAIAAAEgDQAGgDADgFIAIAHQgJAPgUAAQgPAAgLgLgAgMgXQgGAGAAALIAmAAIAAgBQAAgLgGgGQgEgFgJAAQgHAAgGAGg");
	this.shape_1187.setTransform(733.7,355.25);

	this.shape_1188 = new cjs.Shape();
	this.shape_1188.graphics.f("#FFFFFF").s().p("AgPAmQgHgEgFgGQgDgGAAgHIANAAQABAHAEAEQAFAEAIAAQAHAAAGgDQAEgEAAgEQAAgGgEgDQgEgDgKgDQgKgCgGgCQgGgDgDgEQgDgEAAgGQAAgJAIgHQAIgHAMAAQAOAAAJAHQAHAGABAMIgOAAQAAgGgEgEQgGgEgHAAQgGAAgEADQgFADABAGQAAAFADACQAEACAKADQAKACAGADQAGADAEAEQADAEAAAHQAAAKgJAHQgIAGgOAAQgIAAgIgDg");
	this.shape_1188.setTransform(725.75,355.25);

	this.shape_1189 = new cjs.Shape();
	this.shape_1189.graphics.f("#FFFFFF").s().p("AgWAeQgLgKAAgSIAAgCQAAgLAFgKQAFgIAHgGQAIgFAJAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAHQAGAIAKAAQAHAAAFgDQAEgDAEgFIAJAHQgKAPgVAAQgPAAgJgLgAgMgXQgFAGgCALIAnAAIAAgBQgBgLgEgGQgGgFgIAAQgHAAgGAGg");
	this.shape_1189.setTransform(712.95,355.25);

	this.shape_1190 = new cjs.Shape();
	this.shape_1190.graphics.f("#FFFFFF").s().p("AgUAuIgBAJIgMAAIAAhvIAOAAIAAAqQAIgKANAAQAPAAAIAKQAJALgBATIAAABQABASgJALQgJALgOAAQgNAAgJgLgAgTAAIAAAhQAGAMANAAQAJAAAFgHQAGgIAAgPQAAgOgGgGQgFgIgJAAQgOAAgFANg");
	this.shape_1190.setTransform(704.9,353.65);

	this.shape_1191 = new cjs.Shape();
	this.shape_1191.graphics.f("#FFFFFF").s().p("AgPAmQgIgEgEgGQgDgGAAgHIANAAQAAAHAGAEQAEAEAIAAQAHAAAGgDQAEgEAAgEQAAgGgEgDQgEgDgKgDQgKgCgGgCQgGgDgDgEQgDgEAAgGQAAgJAJgHQAHgHAMAAQAOAAAJAHQAHAGABAMIgOAAQAAgGgEgEQgGgEgHAAQgGAAgEADQgFADAAAGQABAFAEACQAEACAIADQALACAGADQAGADADAEQAEAEAAAHQAAAKgJAHQgIAGgOAAQgJAAgHgDg");
	this.shape_1191.setTransform(676.05,355.25);

	this.shape_1192 = new cjs.Shape();
	this.shape_1192.graphics.f("#FFFFFF").s().p("AgPAmQgHgEgFgGQgDgGAAgHIANAAQABAHAEAEQAFAEAIAAQAHAAAGgDQAEgEAAgEQAAgGgEgDQgEgDgKgDQgKgCgGgCQgGgDgDgEQgDgEAAgGQAAgJAIgHQAIgHAMAAQAOAAAJAHQAHAGABAMIgOAAQAAgGgEgEQgGgEgHAAQgGAAgEADQgFADABAGQAAAFADACQAEACAKADQAKACAGADQAGADAEAEQADAEAAAHQAAAKgJAHQgIAGgOAAQgJAAgHgDg");
	this.shape_1192.setTransform(660.05,355.25);

	this.shape_1193 = new cjs.Shape();
	this.shape_1193.graphics.f("#FFFFFF").s().p("AgWAeQgLgKAAgSIAAgCQAAgLAFgKQAFgIAHgGQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAHQAGAIAKAAQAHAAAFgDQAEgDAEgFIAJAHQgKAPgVAAQgPAAgJgLgAgMgXQgFAGgCALIAnAAIAAgBQgBgLgEgGQgGgFgIAAQgHAAgGAGg");
	this.shape_1193.setTransform(647.25,355.25);

	this.shape_1194 = new cjs.Shape();
	this.shape_1194.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFAAIAHAAIAAAKIgLACQgJAAgEgFg");
	this.shape_1194.setTransform(640.575,354.35);

	this.shape_1195 = new cjs.Shape();
	this.shape_1195.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAAMIAAAkQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAPQAAAHAEAEQAEADAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_1195.setTransform(630.275,355.25);

	this.shape_1196 = new cjs.Shape();
	this.shape_1196.graphics.f("#FFFFFF").s().p("AgXA4IgFgBIAAgMIAEAAQAGAAAEgCQAEgDADgHIADgIIgdhOIAPAAIATA7IASg7IAPAAIggBaQgGAVgQAAg");
	this.shape_1196.setTransform(622.625,356.85);

	this.shape_1197 = new cjs.Shape();
	this.shape_1197.graphics.f("#FFFFFF").s().p("AASA4IAAg0QgBgIgEgEQgDgEgIAAQgGAAgFAEQgFADgCAFIAAA4IgOAAIAAhvIAOAAIAAArQAIgLANAAQAaAAAAAbIAAA0g");
	this.shape_1197.setTransform(606.7,353.575);

	this.shape_1198 = new cjs.Shape();
	this.shape_1198.graphics.f("#FFFFFF").s().p("AgUAuIgBAJIgLAAIAAhvIANAAIAAAqQAIgKAOAAQAOAAAIAKQAIALAAATIAAABQAAASgIALQgJALgNAAQgOAAgJgLgAgTAAIAAAhQAGAMANAAQAJAAAGgHQAFgIAAgPQAAgOgFgGQgGgIgJAAQgOAAgFANg");
	this.shape_1198.setTransform(590.3,353.65);

	this.shape_1199 = new cjs.Shape();
	this.shape_1199.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFAAIAHAAIAAAKIgLACQgJAAgEgFg");
	this.shape_1199.setTransform(575.025,354.35);

	this.shape_1200 = new cjs.Shape();
	this.shape_1200.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgEgHIAHgIQAIALANAAQAJAAAGgGQAFgFAAgKIAAgHQgJAJgMAAQgPAAgIgLQgJgLAAgTQAAgSAJgLQAIgLAPAAQAOAAAHAKIABgIIANAAIAABMQAAAPgJAJQgKAJgPAAQgIAAgIgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgJAAgFAHg");
	this.shape_1200.setTransform(564.45,356.725);

	this.shape_1201 = new cjs.Shape();
	this.shape_1201.graphics.f("#FFFFFF").s().p("AASAoIAAgzQgBgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_1201.setTransform(556.25,355.175);

	this.shape_1202 = new cjs.Shape();
	this.shape_1202.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAAMIAAAkQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAPQAAAHAEAEQAEADAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_1202.setTransform(548.025,355.25);

	this.shape_1203 = new cjs.Shape();
	this.shape_1203.graphics.f("#FFFFFF").s().p("AgXA4IgFgBIAAgMIAEAAQAGAAAEgCQAEgDADgHIADgIIgdhOIAPAAIATA7IASg7IAPAAIggBaQgGAVgQAAg");
	this.shape_1203.setTransform(540.375,356.85);

	this.shape_1204 = new cjs.Shape();
	this.shape_1204.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAAMIAAAkQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAPQAAAHAEAEQAEADAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_1204.setTransform(520.475,355.25);

	this.shape_1205 = new cjs.Shape();
	this.shape_1205.graphics.f("#FFFFFF").s().p("AATAnIgTg7IgSA7IgLAAIgXhOIANAAIAQA7IATg7IAJAAIATA8IAQg8IANAAIgXBOg");
	this.shape_1205.setTransform(510.75,355.25);

	this.shape_1206 = new cjs.Shape();
	this.shape_1206.graphics.f("#FFFFFF").s().p("AgWAeQgLgKABgSIAAgCQgBgLAFgKQAEgIAJgGQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAGAHQAHAIAKAAQAGAAAFgDQAFgDAEgFIAIAHQgKAPgTAAQgPAAgKgLgAgMgXQgGAGgBALIAnAAIAAgBQgBgLgFgGQgEgFgJAAQgHAAgGAGg");
	this.shape_1206.setTransform(501.3,355.25);

	this.shape_1207 = new cjs.Shape();
	this.shape_1207.graphics.f("#FFFFFF").s().p("AAaA1IAAgxIg0AAIAAAxIgOAAIAAhpIAOAAIAAAtIA0AAIAAgtIAPAAIAABpg");
	this.shape_1207.setTransform(491.9,353.875);

	this.shape_1208 = new cjs.Shape();
	this.shape_1208.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_1208.setTransform(588.375,327.25);

	this.shape_1209 = new cjs.Shape();
	this.shape_1209.graphics.f("#FFFFFF").s().p("AgYAuQgJgMABgSIAAgBQgBgRAJgLQAJgLANAAQANAAAJAJIAAgpIANAAIAABvIgMAAIgBgIQgIAKgOAAQgNAAgJgLgAgNgFQgGAGAAAQQAAANAGAIQAFAHAJABQANAAAGgMIAAgjQgHgMgMAAQgJAAgFAIg");
	this.shape_1209.setTransform(576.25,325.65);

	this.shape_1210 = new cjs.Shape();
	this.shape_1210.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_1210.setTransform(568.125,327.25);

	this.shape_1211 = new cjs.Shape();
	this.shape_1211.graphics.f("#FFFFFF").s().p("AAXA1IgWgrIgYAAIAAArIgPAAIAAhpIAjAAQASAAAJAIQAKAIAAAQQAAAKgFAHQgGAGgKAEIAaAtIAAABgAgXAAIAVAAQAKAAAFgGQAHgFAAgJQAAgKgGgGQgGgFgKAAIgVAAg");
	this.shape_1211.setTransform(559.9,325.875);

	this.shape_1212 = new cjs.Shape();
	this.shape_1212.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCADgEgBQgDABgCgDg");
	this.shape_1212.setTransform(549.3,325.8);

	this.shape_1213 = new cjs.Shape();
	this.shape_1213.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAAKIgLACQgJAAgEgFg");
	this.shape_1213.setTransform(539.725,326.35);

	this.shape_1214 = new cjs.Shape();
	this.shape_1214.graphics.f("#FFFFFF").s().p("AgXAeQgJgKgBgSIAAgCQABgLAEgKQAFgIAHgGQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAGAHQAIAIAIAAQAHAAAGgDQAEgDAEgFIAJAGQgKAQgVAAQgOAAgLgLgAgMgXQgFAGgBALIAmAAIAAgBQAAgLgFgFQgGgGgIAAQgHAAgGAGg");
	this.shape_1214.setTransform(533.65,327.25);

	this.shape_1215 = new cjs.Shape();
	this.shape_1215.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCADgEgBQgDABgCgDg");
	this.shape_1215.setTransform(514.65,325.8);

	this.shape_1216 = new cjs.Shape();
	this.shape_1216.graphics.f("#FFFFFF").s().p("AgSAzQgKgFgFgHQgFgHAAgKIAOAAQAAAKAHAGQAIAFAKAAQAMAAAGgEQAFgFAAgIQAAgIgFgEQgGgEgNgEQgSgFgIgHQgJgIAAgLQAAgMALgJQAKgIAPAAQALAAAIAEQAJAFAFAHQAEAIAAAIIgOAAQAAgJgGgGQgGgFgLAAQgKAAgFAEQgGAFAAAIQAAAHAFAEQAGAFAMADQANAEAIAEQAHAEAEAGQAEAGAAAIQAAANgLAIQgKAIgRAAQgKAAgJgEg");
	this.shape_1216.setTransform(508.425,325.875);

	this.shape_1217 = new cjs.Shape();
	this.shape_1217.graphics.f("#FFFFFF").s().p("AgGAGQgCgCAAgEQAAgCACgDQACgCAEAAQAEAAADACQABADAAACQAAAEgBACQgDACgEAAQgEAAgCgCg");
	this.shape_1217.setTransform(498.2,330.475);

	this.shape_1218 = new cjs.Shape();
	this.shape_1218.graphics.f("#FFFFFF").s().p("AgdApQgLgNAAgXIAAgJQAAgPAFgLQAGgMAJgGQAKgGAMAAQARAAAKAKQAKAJACARIgOAAQgCgNgGgGQgGgFgLAAQgNAAgHAKQgIAKAAASIAAAJQAAASAHAKQAIAKAMAAQALAAAHgFQAGgFACgOIAOAAQgCARgKAKQgLAJgRAAQgSAAgMgOg");
	this.shape_1218.setTransform(491.525,325.875);

	this.shape_1219 = new cjs.Shape();
	this.shape_1219.graphics.f("#FFFFFF").s().p("AgGAGQgBgCAAgEQAAgCABgDQADgCADAAQAEAAACACQADADAAACQAAAEgDACQgCACgEAAQgDAAgDgCg");
	this.shape_1219.setTransform(663.5,286.475);

	this.shape_1220 = new cjs.Shape();
	this.shape_1220.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAAMIAAAkQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAPQAAAHAEAEQAEADAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_1220.setTransform(657.525,283.25);

	this.shape_1221 = new cjs.Shape();
	this.shape_1221.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAAMIAAAkQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAPQAAAHAEAEQAEADAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_1221.setTransform(636.225,283.25);

	this.shape_1222 = new cjs.Shape();
	this.shape_1222.graphics.f("#FFFFFF").s().p("AgPAmQgIgEgEgGQgDgGAAgHIANAAQAAAHAGAEQAEAEAIAAQAHAAAGgDQAEgEAAgEQAAgGgEgDQgEgDgKgDQgKgCgGgCQgGgDgDgEQgDgEAAgGQAAgJAJgHQAHgHAMAAQAOAAAJAHQAHAGAAAMIgNAAQAAgGgFgEQgEgEgIAAQgGAAgEADQgFADAAAGQAAAFAFACQAEACAIADQALACAGADQAGADADAEQADAEABAHQAAAKgJAHQgJAGgNAAQgJAAgHgDg");
	this.shape_1222.setTransform(628.25,283.25);

	this.shape_1223 = new cjs.Shape();
	this.shape_1223.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgEgHIAGgIQAJALANAAQAJAAAFgGQAGgFAAgKIAAgHQgIAJgNAAQgOAAgJgLQgJgLAAgTQAAgSAJgLQAIgLAPAAQANAAAIAKIABgIIANAAIAABMQgBAPgIAJQgKAJgPAAQgHAAgJgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgIAAgHAHg");
	this.shape_1223.setTransform(616.35,284.725);

	this.shape_1224 = new cjs.Shape();
	this.shape_1224.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAAMIAAAkQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAPQAAAHAEAEQAEADAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_1224.setTransform(599.925,283.25);

	this.shape_1225 = new cjs.Shape();
	this.shape_1225.graphics.f("#FFFFFF").s().p("AgXA4IgFgBIAAgMIAEAAQAGAAAEgCQAEgDADgHIADgIIgdhOIAPAAIATA7IASg7IAPAAIggBaQgGAVgQAAg");
	this.shape_1225.setTransform(592.275,284.85);

	this.shape_1226 = new cjs.Shape();
	this.shape_1226.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFAAIAHAAIAAAKIgLACQgJAAgEgFg");
	this.shape_1226.setTransform(566.575,282.35);

	this.shape_1227 = new cjs.Shape();
	this.shape_1227.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgJAAQgFAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_1227.setTransform(560.2,283.175);

	this.shape_1228 = new cjs.Shape();
	this.shape_1228.graphics.f("#FFFFFF").s().p("AgXAeQgJgKgBgSIAAgCQAAgLAFgKQAFgIAHgGQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAHQAHAIAIAAQAHAAAGgDQAEgDAEgFIAJAHQgKAPgVAAQgPAAgKgLgAgMgXQgFAGgBALIAmAAIAAgBQgBgLgEgGQgGgFgIAAQgHAAgGAGg");
	this.shape_1228.setTransform(552.2,283.25);

	this.shape_1229 = new cjs.Shape();
	this.shape_1229.graphics.f("#FFFFFF").s().p("AgUAuIgBAJIgLAAIAAhvIANAAIAAAqQAIgKAOAAQAOAAAIAKQAJALgBATIAAABQABASgJALQgJALgNAAQgOAAgJgLgAgTAAIAAAhQAGAMANAAQAJAAAFgHQAGgIAAgPQAAgOgGgGQgFgIgJAAQgOAAgFANg");
	this.shape_1229.setTransform(544.15,281.65);

	this.shape_1230 = new cjs.Shape();
	this.shape_1230.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAAMIAAAkQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAPQAAAHAEAEQAEADAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_1230.setTransform(523.675,283.25);

	this.shape_1231 = new cjs.Shape();
	this.shape_1231.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgIAAQgGAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_1231.setTransform(507.05,283.175);

	this.shape_1232 = new cjs.Shape();
	this.shape_1232.graphics.f("#FFFFFF").s().p("AgWAeQgLgKABgSIAAgCQgBgLAFgKQAEgIAJgGQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAGAHQAHAIAKAAQAGAAAFgDQAFgDAEgFIAIAHQgKAPgTAAQgPAAgKgLgAgMgXQgGAGgBALIAnAAIAAgBQgBgLgFgGQgEgFgJAAQgHAAgGAGg");
	this.shape_1232.setTransform(499.05,283.25);

	this.shape_1233 = new cjs.Shape();
	this.shape_1233.graphics.f("#FFFFFF").s().p("AgYAtQgIgKAAgTIAAgBQAAgRAIgLQAIgLAOAAQAOAAAIAJIAAgpIANAAIAABvIgMAAIgBgIQgIAKgOAAQgNAAgJgMgAgOgFQgFAGAAAQQAAANAFAIQAGAHAJAAQANAAAGgLIAAgjQgGgMgNAAQgJAAgGAIg");
	this.shape_1233.setTransform(490.6,281.65);

	this.shape_1234 = new cjs.Shape();
	this.shape_1234.graphics.f("#FFFFFF").s().p("AASA4IAAg0QgBgIgEgEQgDgEgIAAQgGAAgFAEQgFADgCAFIAAA4IgOAAIAAhvIAOAAIAAArQAIgLANAAQAaAAAAAbIAAA0g");
	this.shape_1234.setTransform(888.95,259.575);

	this.shape_1235 = new cjs.Shape();
	this.shape_1235.graphics.f("#FFFFFF").s().p("AgUAvIgBAJIgLAAIAAhwIANAAIAAAqQAIgKAOAAQAOAAAIALQAIALAAARIAAACQAAASgIALQgJALgNAAQgOAAgJgKgAgTgBIAAAiQAGANANAAQAJAAAFgIQAGgHAAgQQAAgNgGgHQgFgHgJgBQgOAAgFAMg");
	this.shape_1235.setTransform(872.55,259.65);

	this.shape_1236 = new cjs.Shape();
	this.shape_1236.graphics.f("#FFFFFF").s().p("AgCAsQgEgFAAgKIAAgxIgPAAIAAgJIAPAAIAAgUIAMAAIAAAUIAPAAIAAAJIgPAAIAAAxQAAAEACADQACADAFAAIAHgCIAAAMIgLABQgJAAgEgGg");
	this.shape_1236.setTransform(857.275,260.35);

	this.shape_1237 = new cjs.Shape();
	this.shape_1237.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAAMIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAOg");
	this.shape_1237.setTransform(832.125,261.25);

	this.shape_1238 = new cjs.Shape();
	this.shape_1238.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgFgHIAHgIQAKALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgJAJgNAAQgOAAgIgLQgIgLgBgTQABgSAIgLQAJgLAOAAQANAAAIAKIABgIIAMAAIAABMQAAAPgJAJQgJAJgPAAQgHAAgJgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgIAAgHAHg");
	this.shape_1238.setTransform(823.7,262.725);

	this.shape_1239 = new cjs.Shape();
	this.shape_1239.graphics.f("#FFFFFF").s().p("AgCAsQgEgFAAgKIAAgxIgPAAIAAgJIAPAAIAAgUIAMAAIAAAUIAPAAIAAAJIgPAAIAAAxQAAAEACADQACADAFAAIAHgCIAAAMIgLABQgJAAgEgGg");
	this.shape_1239.setTransform(800.175,260.35);

	this.shape_1240 = new cjs.Shape();
	this.shape_1240.graphics.f("#FFFFFF").s().p("AgRAFIAAgJIAjAAIAAAJg");
	this.shape_1240.setTransform(778.9,260.65);

	this.shape_1241 = new cjs.Shape();
	this.shape_1241.graphics.f("#FFFFFF").s().p("AASAoIAAgzQgBgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_1241.setTransform(772.7,261.175);

	this.shape_1242 = new cjs.Shape();
	this.shape_1242.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAAMIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAOg");
	this.shape_1242.setTransform(764.475,261.25);

	this.shape_1243 = new cjs.Shape();
	this.shape_1243.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgEgHIAHgIQAIALANAAQAJAAAGgGQAFgFAAgKIAAgHQgJAJgMAAQgPAAgIgLQgJgLAAgTQAAgSAJgLQAIgLAPAAQAOAAAHAKIABgIIANAAIAABMQgBAPgIAJQgKAJgPAAQgIAAgIgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgIAAgHAHg");
	this.shape_1243.setTransform(756.05,262.725);

	this.shape_1244 = new cjs.Shape();
	this.shape_1244.graphics.f("#FFFFFF").s().p("AgZAeQgKgMAAgSIAAAAQAAgLAFgKQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAAMgEAJQgFAIgIAGQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgIAAgOQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_1244.setTransform(739.425,261.25);

	this.shape_1245 = new cjs.Shape();
	this.shape_1245.graphics.f("#FFFFFF").s().p("AgCAsQgEgFAAgKIAAgxIgPAAIAAgJIAPAAIAAgUIAMAAIAAAUIAPAAIAAAJIgPAAIAAAxQAAAEACADQACADAFAAIAHgCIAAAMIgLABQgJAAgEgGg");
	this.shape_1245.setTransform(732.525,260.35);

	this.shape_1246 = new cjs.Shape();
	this.shape_1246.graphics.f("#FFFFFF").s().p("AgZAeQgKgMAAgSIAAAAQAAgLAFgKQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAAMgEAJQgFAIgIAGQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgIAAgOQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_1246.setTransform(726.025,261.25);

	this.shape_1247 = new cjs.Shape();
	this.shape_1247.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAAMIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAOg");
	this.shape_1247.setTransform(690.425,261.25);

	this.shape_1248 = new cjs.Shape();
	this.shape_1248.graphics.f("#FFFFFF").s().p("AgPAlQgHgDgEgGQgFgGAAgHIAOAAQAAAHAFAEQAGAEAHAAQAIAAAEgDQAFgDAAgGQAAgFgEgDQgFgDgJgCQgKgDgGgCQgGgDgDgEQgDgEAAgGQAAgJAIgIQAJgGAMAAQANAAAIAGQAJAIgBAKIgNAAQAAgFgFgEQgFgEgGAAQgHAAgEADQgEAEAAAEQgBAFAEADQAFACAIADQALACAGADQAHACADAFQACAEAAAGQAAALgIAGQgJAHgNAAQgIAAgIgEg");
	this.shape_1248.setTransform(667.55,261.25);

	this.shape_1249 = new cjs.Shape();
	this.shape_1249.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAAMIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAOg");
	this.shape_1249.setTransform(659.625,261.25);

	this.shape_1250 = new cjs.Shape();
	this.shape_1250.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgFgHIAIgIQAJALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgJAJgNAAQgNAAgJgLQgJgLABgTQgBgSAJgLQAJgLAOAAQANAAAJAKIAAgIIAMAAIAABMQABAPgKAJQgJAJgPAAQgIAAgIgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgJAAgFAHg");
	this.shape_1250.setTransform(642.95,262.725);

	this.shape_1251 = new cjs.Shape();
	this.shape_1251.graphics.f("#FFFFFF").s().p("AgWAfQgKgLAAgSIAAgCQgBgLAFgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAHAIQAGAHAKAAQAGAAAFgDQAFgDAEgFIAJAGQgLAQgTAAQgQAAgJgKgAgMgXQgGAGgBAKIAnAAIAAgBQgBgJgEgGQgFgGgJAAQgHAAgGAGg");
	this.shape_1251.setTransform(626.75,261.25);

	this.shape_1252 = new cjs.Shape();
	this.shape_1252.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAAMIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAOg");
	this.shape_1252.setTransform(586.625,261.25);

	this.shape_1253 = new cjs.Shape();
	this.shape_1253.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAAMIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAOg");
	this.shape_1253.setTransform(570.875,261.25);

	this.shape_1254 = new cjs.Shape();
	this.shape_1254.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgFgHIAHgIQAKALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgJAJgNAAQgOAAgIgLQgIgLgBgTQABgSAIgLQAJgLAOAAQANAAAJAKIAAgIIAMAAIAABMQAAAPgJAJQgJAJgPAAQgHAAgJgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgIAAgHAHg");
	this.shape_1254.setTransform(551.9,262.725);

	this.shape_1255 = new cjs.Shape();
	this.shape_1255.graphics.f("#FFFFFF").s().p("AgZAeQgKgMAAgSIAAAAQAAgLAFgKQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAAMgEAJQgFAIgIAGQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgIAAgOQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_1255.setTransform(535.275,261.25);

	this.shape_1256 = new cjs.Shape();
	this.shape_1256.graphics.f("#FFFFFF").s().p("AgCAsQgEgFAAgKIAAgxIgPAAIAAgJIAPAAIAAgUIAMAAIAAAUIAPAAIAAAJIgPAAIAAAxQAAAEACADQACADAFAAIAHgCIAAAMIgLABQgJAAgEgGg");
	this.shape_1256.setTransform(528.375,260.35);

	this.shape_1257 = new cjs.Shape();
	this.shape_1257.graphics.f("#FFFFFF").s().p("AgZAeQgKgMAAgSIAAAAQAAgLAFgKQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAAMgEAJQgFAIgIAGQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgIAAgOQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_1257.setTransform(521.875,261.25);

	this.shape_1258 = new cjs.Shape();
	this.shape_1258.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgEQAAgCACgDQACgCADAAQAEAAACACQACADAAACQAAAEgCACQgCACgEABQgDgBgCgCg");
	this.shape_1258.setTransform(496.85,259.8);

	this.shape_1259 = new cjs.Shape();
	this.shape_1259.graphics.f("#FFFFFF").s().p("AgYAuQgIgMAAgSIAAgBQAAgRAIgLQAIgLAOAAQAOAAAIAKIAAgqIANAAIAABwIgMAAIgBgJQgIAKgOAAQgNAAgJgLgAgOgFQgFAHAAAPQAAANAFAIQAGAIAJAAQANAAAGgMIAAgkQgGgLgNAAQgJABgGAHg");
	this.shape_1259.setTransform(490.6,259.65);

	this.shape_1260 = new cjs.Shape();
	this.shape_1260.graphics.f("#FFFFFF").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAHAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1260.setTransform(888.825,239.25);

	this.shape_1261 = new cjs.Shape();
	this.shape_1261.graphics.f("#FFFFFF").s().p("AgXA4IgFgBIAAgMIAEAAQAGAAAEgCQAEgDADgIIADgIIgdhNIAPAAIATA6IASg6IAPAAIggBbQgGATgQABg");
	this.shape_1261.setTransform(881.175,240.85);

	this.shape_1262 = new cjs.Shape();
	this.shape_1262.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgEgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_1262.setTransform(873.5,239.175);

	this.shape_1263 = new cjs.Shape();
	this.shape_1263.graphics.f("#FFFFFF").s().p("AARA4IAAg0QAAgIgDgEQgEgEgIAAQgGAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLAMAAQAaAAAAAbIAAA0g");
	this.shape_1263.setTransform(865.25,237.575);

	this.shape_1264 = new cjs.Shape();
	this.shape_1264.graphics.f("#FFFFFF").s().p("AgTAuIgBAJIgNAAIAAhvIAOAAIAAAqQAIgKANAAQAPAAAIAKQAJALAAATIAAABQAAASgJALQgJALgOAAQgOAAgHgLgAgTAAIAAAhQAGAMANAAQAJAAAGgHQAFgIAAgPQAAgOgFgGQgGgIgJABQgNAAgGAMg");
	this.shape_1264.setTransform(848.85,237.65);

	this.shape_1265 = new cjs.Shape();
	this.shape_1265.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgLIAPAAIAAgTIAMAAIAAATIAPAAIAAALIgPAAIAAAwQAAAEACADQACADAFgBIAHgBIAAALIgLACQgJAAgEgFg");
	this.shape_1265.setTransform(833.575,238.35);

	this.shape_1266 = new cjs.Shape();
	this.shape_1266.graphics.f("#FFFFFF").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAHAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1266.setTransform(813.725,239.25);

	this.shape_1267 = new cjs.Shape();
	this.shape_1267.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_1267.setTransform(807.85,237.8);

	this.shape_1268 = new cjs.Shape();
	this.shape_1268.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgFgHIAHgIQAKALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgJAJgNAAQgOAAgIgLQgIgLgBgTQABgSAIgLQAJgLAOAAQANAAAJAKIAAgIIAMAAIAABMQAAAPgJAJQgJAJgPAAQgHAAgJgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgIAAgHAHg");
	this.shape_1268.setTransform(801.65,240.725);

	this.shape_1269 = new cjs.Shape();
	this.shape_1269.graphics.f("#FFFFFF").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAHAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1269.setTransform(793.525,239.25);

	this.shape_1270 = new cjs.Shape();
	this.shape_1270.graphics.f("#FFFFFF").s().p("AgUAuIgBAJIgMAAIAAhvIAOAAIAAAqQAIgKAOAAQAOAAAIAKQAJALgBATIAAABQABASgJALQgJALgNAAQgOAAgJgLgAgTAAIAAAhQAGAMANAAQAJAAAFgHQAGgIAAgPQAAgOgGgGQgFgIgJABQgOAAgFAMg");
	this.shape_1270.setTransform(785.45,237.65);

	this.shape_1271 = new cjs.Shape();
	this.shape_1271.graphics.f("#FFFFFF").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAHAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1271.setTransform(771.725,239.25);

	this.shape_1272 = new cjs.Shape();
	this.shape_1272.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_1272.setTransform(758.25,237.8);

	this.shape_1273 = new cjs.Shape();
	this.shape_1273.graphics.f("#FFFFFF").s().p("AgOBEIAAgKIAGAAQAFAAACgCQABgDAAgFIAAhYIAOAAIAABXQAAAXgUAAQgEAAgEgCgAABg4QgBgCAAgDQAAgDABgDQACgCAEAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgEAAgCgCg");
	this.shape_1273.setTransform(753.825,239.4);

	this.shape_1274 = new cjs.Shape();
	this.shape_1274.graphics.f("#FFFFFF").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAHAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1274.setTransform(738.375,239.25);

	this.shape_1275 = new cjs.Shape();
	this.shape_1275.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_1275.setTransform(708.2,237.8);

	this.shape_1276 = new cjs.Shape();
	this.shape_1276.graphics.f("#FFFFFF").s().p("AgWAeQgLgKABgSIAAgCQgBgLAFgKQAEgIAJgGQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAAMAGAGQAIAIAJAAQAGAAAFgDQAFgDAEgFIAIAHQgKAPgTAAQgPAAgKgLgAgMgXQgGAGgBAKIAnAAIAAAAQgBgKgFgHQgEgFgJAAQgHAAgGAGg");
	this.shape_1276.setTransform(698.85,239.25);

	this.shape_1277 = new cjs.Shape();
	this.shape_1277.graphics.f("#FFFFFF").s().p("AgPAmQgIgEgDgGQgFgGAAgHIAOAAQAAAHAFAEQAGAEAHAAQAIAAAEgDQAFgEAAgEQAAgGgEgDQgFgDgJgDQgKgCgGgCQgGgCgDgFQgDgEAAgGQAAgJAJgHQAHgHANAAQANAAAIAHQAIAHAAAKIgNAAQAAgFgFgEQgFgEgGAAQgHAAgEADQgEAEgBAFQAAAEAFADQADACAJACQALADAGADQAHACACAFQADAEAAAHQAAAKgIAHQgJAGgNAAQgIAAgIgDg");
	this.shape_1277.setTransform(655.95,239.25);

	this.shape_1278 = new cjs.Shape();
	this.shape_1278.graphics.f("#FFFFFF").s().p("AgPAmQgIgEgDgGQgEgGAAgHIANAAQAAAHAGAEQAEAEAIAAQAHAAAGgDQAEgEAAgEQAAgGgEgDQgEgDgKgDQgKgCgGgCQgGgCgDgFQgDgEAAgGQAAgJAJgHQAHgHAMAAQAOAAAJAHQAHAHAAAKIgNAAQAAgFgFgEQgEgEgIAAQgGAAgEADQgFAEAAAFQAAAEAFADQAEACAIACQALADAGADQAGACADAFQADAEABAHQAAAKgJAHQgJAGgNAAQgJAAgHgDg");
	this.shape_1278.setTransform(639.95,239.25);

	this.shape_1279 = new cjs.Shape();
	this.shape_1279.graphics.f("#FFFFFF").s().p("AgXAeQgKgKAAgSIAAgCQABgLAEgKQAEgIAJgGQAIgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAAMAGAGQAHAIAJAAQAHAAAGgDQAFgDADgFIAIAHQgJAPgVAAQgOAAgLgLgAgMgXQgGAGAAAKIAmAAIAAAAQAAgKgGgHQgEgFgJAAQgHAAgGAGg");
	this.shape_1279.setTransform(627.15,239.25);

	this.shape_1280 = new cjs.Shape();
	this.shape_1280.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgLIAPAAIAAgTIAMAAIAAATIAPAAIAAALIgPAAIAAAwQAAAEACADQACADAFgBIAHgBIAAALIgLACQgJAAgEgFg");
	this.shape_1280.setTransform(620.475,238.35);

	this.shape_1281 = new cjs.Shape();
	this.shape_1281.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgEgHIAHgIQAIALANAAQAJAAAGgGQAFgFAAgKIAAgHQgJAJgNAAQgNAAgJgLQgJgLABgTQgBgSAJgLQAIgLAPAAQAOAAAIAKIAAgIIANAAIAABMQAAAPgKAJQgJAJgPAAQgIAAgIgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgJAAgFAHg");
	this.shape_1281.setTransform(608.65,240.725);

	this.shape_1282 = new cjs.Shape();
	this.shape_1282.graphics.f("#FFFFFF").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAHAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1282.setTransform(592.225,239.25);

	this.shape_1283 = new cjs.Shape();
	this.shape_1283.graphics.f("#FFFFFF").s().p("AgXA4IgFgBIAAgMIAEAAQAGAAAEgCQAEgDADgIIADgIIgdhNIAPAAIATA6IASg6IAPAAIggBbQgGATgQABg");
	this.shape_1283.setTransform(584.575,240.85);

	this.shape_1284 = new cjs.Shape();
	this.shape_1284.graphics.f("#FFFFFF").s().p("AASA4IAAg0QgBgIgEgEQgDgEgIAAQgGAAgFAEQgFADgCAFIAAA4IgOAAIAAhvIAOAAIAAArQAIgLANAAQAaAAAAAbIAAA0g");
	this.shape_1284.setTransform(571.7,237.575);

	this.shape_1285 = new cjs.Shape();
	this.shape_1285.graphics.f("#FFFFFF").s().p("AgUAuIgBAJIgLAAIAAhvIANAAIAAAqQAIgKAOAAQAOAAAIAKQAIALAAATIAAABQAAASgIALQgJALgNAAQgOAAgJgLgAgTAAIAAAhQAGAMANAAQAJAAAFgHQAGgIAAgPQAAgOgGgGQgFgIgJABQgOAAgFAMg");
	this.shape_1285.setTransform(555.3,237.65);

	this.shape_1286 = new cjs.Shape();
	this.shape_1286.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgLIAPAAIAAgTIAMAAIAAATIAPAAIAAALIgPAAIAAAwQAAAEACADQACADAFgBIAHgBIAAALIgLACQgJAAgEgFg");
	this.shape_1286.setTransform(540.025,238.35);

	this.shape_1287 = new cjs.Shape();
	this.shape_1287.graphics.f("#FFFFFF").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAHAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1287.setTransform(520.175,239.25);

	this.shape_1288 = new cjs.Shape();
	this.shape_1288.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_1288.setTransform(514.3,237.8);

	this.shape_1289 = new cjs.Shape();
	this.shape_1289.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgEgHIAHgIQAIALANAAQAJAAAGgGQAFgFAAgKIAAgHQgJAJgMAAQgPAAgIgLQgJgLAAgTQAAgSAJgLQAIgLAPAAQAOAAAHAKIABgIIANAAIAABMQgBAPgIAJQgKAJgPAAQgIAAgIgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgIAAgHAHg");
	this.shape_1289.setTransform(508.1,240.725);

	this.shape_1290 = new cjs.Shape();
	this.shape_1290.graphics.f("#FFFFFF").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAHAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1290.setTransform(499.975,239.25);

	this.shape_1291 = new cjs.Shape();
	this.shape_1291.graphics.f("#FFFFFF").s().p("AgjA1IAAhpIAiAAQARAAAJAHQAIAHAAAOQAAAHgEAGQgEAGgHADQAIACAFAGQAFAHAAAJQAAAPgJAIQgJAIgRAAgAgVAqIAWAAQAKAAAFgFQAGgFAAgJQAAgUgVAAIgWAAgAgVgHIAVAAQAIAAAGgFQAFgEAAgIQAAgJgFgEQgFgEgKAAIgUAAg");
	this.shape_1291.setTransform(491.425,237.875);

	this.shape_1292 = new cjs.Shape();
	this.shape_1292.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIgBQgHAAgFAEQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_1292.setTransform(601.125,217.25);

	this.shape_1293 = new cjs.Shape();
	this.shape_1293.graphics.f("#FFFFFF").s().p("AgXAfQgJgLgBgSIAAgCQAAgLAFgKQAFgJAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAGAIQAIAHAIAAQAHAAAGgDQAFgDADgFIAJAGQgKAQgVAAQgPAAgKgKgAgMgXQgFAGgBALIAmAAIAAgCQAAgJgFgGQgGgGgIAAQgHAAgGAGg");
	this.shape_1293.setTransform(588.1,217.25);

	this.shape_1294 = new cjs.Shape();
	this.shape_1294.graphics.f("#FFFFFF").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIgBQgHAAgFAEQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_1294.setTransform(575.125,217.25);

	this.shape_1295 = new cjs.Shape();
	this.shape_1295.graphics.f("#FFFFFF").s().p("AgjA1IAAhpIAiAAQARAAAJAHQAIAHAAAOQAAAHgEAGQgEAGgHADQAIACAFAGQAFAHAAAJQAAAPgJAIQgJAIgRAAgAgVAqIAWAAQAKAAAFgFQAGgFAAgJQAAgUgVAAIgWAAgAgVgHIAVAAQAIAAAGgFQAFgEAAgIQAAgJgFgEQgFgEgKAAIgUAAg");
	this.shape_1295.setTransform(559.275,215.875);

	this.shape_1296 = new cjs.Shape();
	this.shape_1296.graphics.f("#FFFFFF").s().p("AgSAzQgKgFgFgHQgFgHAAgKIAOAAQAAAKAHAGQAIAFAKAAQAMAAAGgEQAFgFAAgIQAAgIgFgEQgGgEgNgEQgSgFgIgHQgJgIAAgLQAAgMALgJQAKgIAPAAQALAAAIAEQAJAFAFAHQAEAIAAAIIgOAAQAAgJgGgGQgGgFgLAAQgKAAgFAEQgGAFAAAIQAAAHAFAEQAGAFAMADQANAEAIAEQAHAEAEAGQAEAGAAAIQAAANgLAIQgKAIgRAAQgKAAgJgEg");
	this.shape_1296.setTransform(508.025,215.875);

	this.shape_1297 = new cjs.Shape();
	this.shape_1297.graphics.f("#FFFFFF").s().p("AgFAGQgCgCAAgEQAAgCACgDQACgCADAAQAEAAACACQACADABACQgBAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_1297.setTransform(497.8,220.475);

	this.shape_1298 = new cjs.Shape();
	this.shape_1298.graphics.f("#FFFFFF").s().p("AgjA1IAAhpIAiAAQARAAAJAHQAIAHAAAOQAAAHgEAGQgEAGgHADQAIACAFAGQAFAHAAAJQAAAPgJAIQgJAIgRAAgAgVAqIAWAAQAKAAAFgFQAGgFAAgJQAAgUgVAAIgWAAgAgVgHIAVAAQAIAAAGgFQAFgEAAgIQAAgJgFgEQgFgEgKAAIgUAAg");
	this.shape_1298.setTransform(491.425,215.875);

	this.shape_1299 = new cjs.Shape();
	this.shape_1299.graphics.f("#FFFFFF").s().p("AgGAGQgCgCAAgEQAAgCACgDQACgCAEAAQAEAAADACQABADAAACQAAAEgBACQgDACgEAAQgEAAgCgCg");
	this.shape_1299.setTransform(729.5,176.475);

	this.shape_1300 = new cjs.Shape();
	this.shape_1300.graphics.f("#FFFFFF").s().p("AgPAmQgHgEgFgGQgDgGAAgHIANAAQABAHAEAEQAFAEAIAAQAHAAAGgDQAEgDAAgFQAAgGgEgDQgEgDgKgDQgKgBgGgDQgGgDgDgEQgDgEAAgGQAAgKAIgGQAIgHAMAAQAOAAAJAHQAHAGABAMIgOAAQAAgGgEgEQgGgEgHAAQgGAAgEADQgFADABAFQAAAGADACQAEADAKACQAKACAGADQAGACAEAFQADAEAAAGQAAALgJAGQgIAHgOAAQgIAAgIgDg");
	this.shape_1300.setTransform(694.25,173.25);

	this.shape_1301 = new cjs.Shape();
	this.shape_1301.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgEgHIAHgIQAIALANAAQAJAAAGgGQAFgFAAgKIAAgHQgJAJgMAAQgPAAgIgLQgJgLAAgTQAAgSAJgLQAIgLAPAAQANAAAIAKIABgIIANAAIAABMQAAAPgJAJQgKAJgPAAQgIAAgIgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgJAAgFAHg");
	this.shape_1301.setTransform(658.05,174.725);

	this.shape_1302 = new cjs.Shape();
	this.shape_1302.graphics.f("#FFFFFF").s().p("AgXA3IgFgBIAAgLIAEAAQAGABAEgDQAEgDADgHIADgIIgdhOIAPAAIATA7IASg7IAPAAIggBaQgGAVgQgBg");
	this.shape_1302.setTransform(633.975,174.85);

	this.shape_1303 = new cjs.Shape();
	this.shape_1303.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_1303.setTransform(623.475,171.575);

	this.shape_1304 = new cjs.Shape();
	this.shape_1304.graphics.f("#FFFFFF").s().p("AgWAfQgKgLAAgSIAAgCQgBgLAFgKQAEgJAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAHAIQAGAHAKAAQAGAAAFgDQAFgDAEgFIAIAGQgKAQgTAAQgQAAgJgKgAgMgXQgGAGgBALIAnAAIAAgBQgBgLgFgFQgEgGgJAAQgHAAgGAGg");
	this.shape_1304.setTransform(593.9,173.25);

	this.shape_1305 = new cjs.Shape();
	this.shape_1305.graphics.f("#FFFFFF").s().p("AgTAvIgBAJIgNAAIAAhwIAOAAIAAAqQAIgKANAAQAPAAAIAKQAJAMAAARIAAACQAAASgJALQgIALgPAAQgOAAgHgKgAgTAAIAAAhQAGANANAAQAJAAAGgIQAFgHAAgQQAAgOgFgGQgGgIgJAAQgNABgGAMg");
	this.shape_1305.setTransform(585.85,171.65);

	this.shape_1306 = new cjs.Shape();
	this.shape_1306.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgEgHIAGgIQAJALANAAQAJAAAFgGQAGgFAAgKIAAgHQgIAJgNAAQgPAAgIgLQgJgLAAgTQAAgSAJgLQAIgLAPAAQAOAAAHAKIABgIIANAAIAABMQgBAPgIAJQgKAJgPAAQgHAAgJgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgIAAgHAHg");
	this.shape_1306.setTransform(556.95,174.725);

	this.shape_1307 = new cjs.Shape();
	this.shape_1307.graphics.f("#FFFFFF").s().p("AgXAfQgKgLAAgSIAAgCQABgLAEgKQAEgJAIgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAGAIQAHAHAJAAQAIAAAFgDQAFgDADgFIAIAGQgJAQgVAAQgOAAgLgKgAgMgXQgGAGAAALIAmAAIAAgBQAAgLgGgFQgEgGgJAAQgHAAgGAGg");
	this.shape_1307.setTransform(540.75,173.25);

	this.shape_1308 = new cjs.Shape();
	this.shape_1308.graphics.f("#FFFFFF").s().p("AgTAvIgBAJIgNAAIAAhwIAOAAIAAAqQAIgKANAAQAPAAAIAKQAJAMAAARIAAACQAAASgJALQgIALgPAAQgOAAgHgKgAgTAAIAAAhQAGANANAAQAJAAAGgIQAFgHAAgQQAAgOgFgGQgGgIgJAAQgNABgGAMg");
	this.shape_1308.setTransform(504.05,171.65);

	this.shape_1309 = new cjs.Shape();
	this.shape_1309.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1309.setTransform(880.725,151.25);

	this.shape_1310 = new cjs.Shape();
	this.shape_1310.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgFgHIAHgIQAKALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgIAJgOAAQgOAAgIgLQgIgLAAgTQAAgSAIgLQAJgLAOAAQANAAAIAKIABgIIAMAAIAABMQAAAPgJAJQgJAJgPAAQgHAAgJgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgIAAgHAHg");
	this.shape_1310.setTransform(872.3,152.725);

	this.shape_1311 = new cjs.Shape();
	this.shape_1311.graphics.f("#FFFFFF").s().p("AASAoIAAgzQgBgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_1311.setTransform(864.1,151.175);

	this.shape_1312 = new cjs.Shape();
	this.shape_1312.graphics.f("#FFFFFF").s().p("AgZAeQgKgMAAgSIAAAAQAAgLAFgKQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAAMgEAIQgFAJgIAGQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgIAAgOQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_1312.setTransform(855.675,151.25);

	this.shape_1313 = new cjs.Shape();
	this.shape_1313.graphics.f("#FFFFFF").s().p("AgZAeQgKgMAAgSIAAAAQAAgLAFgKQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAAMgEAIQgFAJgIAGQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgIAAgOQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_1313.setTransform(842.275,151.25);

	this.shape_1314 = new cjs.Shape();
	this.shape_1314.graphics.f("#FFFFFF").s().p("AggA3IAAhsIAMAAIABAIQAIgKAOAAQAOAAAIALQAIALAAATIAAACQAAAQgIAMQgIALgOgBQgOABgIgKIAAAmgAgTghIAAAmQAGAKANABQAIAAAGgJQAGgHAAgPQAAgMgGgJQgGgHgIAAQgNAAgGAKg");
	this.shape_1314.setTransform(833.975,152.7);

	this.shape_1315 = new cjs.Shape();
	this.shape_1315.graphics.f("#FFFFFF").s().p("AgRAFIAAgJIAjAAIAAAJg");
	this.shape_1315.setTransform(827.5,150.65);

	this.shape_1316 = new cjs.Shape();
	this.shape_1316.graphics.f("#FFFFFF").s().p("AARAoIAAgzQABgJgEgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIANAAIAAAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_1316.setTransform(821.3,151.175);

	this.shape_1317 = new cjs.Shape();
	this.shape_1317.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1317.setTransform(813.075,151.25);

	this.shape_1318 = new cjs.Shape();
	this.shape_1318.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgEgHIAHgIQAJALAMAAQAJAAAGgGQAFgFAAgKIAAgHQgJAJgMAAQgPAAgIgLQgJgLAAgTQAAgSAJgLQAIgLAPAAQANAAAIAKIABgIIANAAIAABMQgBAPgIAJQgKAJgPAAQgIAAgIgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgIAAgHAHg");
	this.shape_1318.setTransform(804.65,152.725);

	this.shape_1319 = new cjs.Shape();
	this.shape_1319.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgJAAQgFAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_1319.setTransform(796.45,151.175);

	this.shape_1320 = new cjs.Shape();
	this.shape_1320.graphics.f("#FFFFFF").s().p("AgZAeQgKgMAAgSIAAAAQAAgLAFgKQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAAMgEAIQgFAJgIAGQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgIAAgOQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_1320.setTransform(788.025,151.25);

	this.shape_1321 = new cjs.Shape();
	this.shape_1321.graphics.f("#FFFFFF").s().p("AgZAeQgKgMAAgSIAAAAQAAgLAFgKQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAAMgEAIQgFAJgIAGQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgIAAgOQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_1321.setTransform(774.625,151.25);

	this.shape_1322 = new cjs.Shape();
	this.shape_1322.graphics.f("#FFFFFF").s().p("AggA3IAAhsIAMAAIABAIQAIgKAOAAQAOAAAIALQAIALAAATIAAACQAAAQgIAMQgIALgOgBQgOABgIgKIAAAmgAgTghIAAAmQAGAKANABQAIAAAGgJQAGgHAAgPQAAgMgGgJQgGgHgIAAQgNAAgGAKg");
	this.shape_1322.setTransform(766.325,152.7);

	this.shape_1323 = new cjs.Shape();
	this.shape_1323.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1323.setTransform(743.725,151.25);

	this.shape_1324 = new cjs.Shape();
	this.shape_1324.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_1324.setTransform(736.375,149.575);

	this.shape_1325 = new cjs.Shape();
	this.shape_1325.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_1325.setTransform(726.6,149.8);

	this.shape_1326 = new cjs.Shape();
	this.shape_1326.graphics.f("#FFFFFF").s().p("AgPAlQgIgDgDgGQgEgGgBgHIAOAAQAAAHAGAEQAEAEAIAAQAHAAAFgDQAFgEAAgFQAAgFgEgDQgEgDgKgCQgKgDgGgCQgGgCgDgFQgDgEAAgGQAAgJAJgIQAHgGAMAAQAOAAAIAGQAIAHAAALIgNAAQAAgFgFgEQgFgEgHAAQgGAAgEADQgEAEgBAEQAAAFAFADQADADAJABQALADAGADQAGADADAEQADAEAAAHQABAKgJAHQgJAGgNAAQgJAAgHgEg");
	this.shape_1326.setTransform(720.85,151.25);

	this.shape_1327 = new cjs.Shape();
	this.shape_1327.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1327.setTransform(712.925,151.25);

	this.shape_1328 = new cjs.Shape();
	this.shape_1328.graphics.f("#FFFFFF").s().p("AASA4IAAg0QgBgIgDgEQgEgEgJAAQgFAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLANAAQAZAAAAAbIAAA0g");
	this.shape_1328.setTransform(704.75,149.575);

	this.shape_1329 = new cjs.Shape();
	this.shape_1329.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgFgHIAHgIQAKALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgIAJgOAAQgOAAgIgLQgIgLAAgTQAAgSAIgLQAJgLAOAAQANAAAJAKIAAgIIAMAAIAABMQAAAPgJAJQgJAJgPAAQgIAAgIgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgIAAgHAHg");
	this.shape_1329.setTransform(696.25,152.725);

	this.shape_1330 = new cjs.Shape();
	this.shape_1330.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_1330.setTransform(688.05,151.175);

	this.shape_1331 = new cjs.Shape();
	this.shape_1331.graphics.f("#FFFFFF").s().p("AgWAeQgLgKABgSIAAgCQAAgLAEgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAGAIQAIAHAIAAQAIAAAEgDQAGgDADgFIAIAHQgKAPgTAAQgPAAgKgLgAgMgXQgFAGgCAKIAnAAIAAgBQAAgKgGgGQgEgFgJAAQgHAAgGAGg");
	this.shape_1331.setTransform(680.05,151.25);

	this.shape_1332 = new cjs.Shape();
	this.shape_1332.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1332.setTransform(644.625,151.25);

	this.shape_1333 = new cjs.Shape();
	this.shape_1333.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_1333.setTransform(637.275,149.575);

	this.shape_1334 = new cjs.Shape();
	this.shape_1334.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1334.setTransform(628.875,151.25);

	this.shape_1335 = new cjs.Shape();
	this.shape_1335.graphics.f("#FFFFFF").s().p("AgZAeQgKgMAAgSIAAAAQAAgLAFgKQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAAMgEAIQgFAJgIAGQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgIAAgOQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_1335.setTransform(597.975,151.25);

	this.shape_1336 = new cjs.Shape();
	this.shape_1336.graphics.f("#FFFFFF").s().p("AgZAeQgKgMAAgSIAAAAQAAgLAFgKQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAAMgEAIQgFAJgIAGQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgIAAgOQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_1336.setTransform(584.575,151.25);

	this.shape_1337 = new cjs.Shape();
	this.shape_1337.graphics.f("#FFFFFF").s().p("AggA3IAAhsIAMAAIABAIQAIgKAOAAQAOAAAIALQAIALAAATIAAACQAAAQgIAMQgIALgOgBQgOABgIgKIAAAmgAgTghIAAAmQAGAKANABQAIAAAGgJQAGgHAAgPQAAgMgGgJQgGgHgIAAQgNAAgGAKg");
	this.shape_1337.setTransform(576.275,152.7);

	this.shape_1338 = new cjs.Shape();
	this.shape_1338.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_1338.setTransform(564.25,149.8);

	this.shape_1339 = new cjs.Shape();
	this.shape_1339.graphics.f("#FFFFFF").s().p("AgYAtQgIgKAAgTIAAgBQAAgRAIgLQAJgLANAAQAOAAAIAKIAAgqIANAAIAABvIgMAAIgBgIQgIAKgOAAQgNAAgJgMgAgNgFQgGAHAAAPQAAANAGAIQAFAIAJgBQANAAAGgLIAAgkQgGgLgNABQgJAAgFAHg");
	this.shape_1339.setTransform(558,149.65);

	this.shape_1340 = new cjs.Shape();
	this.shape_1340.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1340.setTransform(544.025,151.25);

	this.shape_1341 = new cjs.Shape();
	this.shape_1341.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgJAAQgFAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_1341.setTransform(528.7,151.175);

	this.shape_1342 = new cjs.Shape();
	this.shape_1342.graphics.f("#FFFFFF").s().p("AARA4IAAg0QAAgIgDgEQgEgEgJAAQgFAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLANAAQAZAAAAAbIAAA0g");
	this.shape_1342.setTransform(520.45,149.575);

	this.shape_1343 = new cjs.Shape();
	this.shape_1343.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_1343.setTransform(512.175,151.325);

	this.shape_1344 = new cjs.Shape();
	this.shape_1344.graphics.f("#FFFFFF").s().p("AgTAuIgBAJIgNAAIAAhvIAOAAIAAAqQAIgKANAAQAPAAAIALQAJAKAAASIAAACQAAASgJALQgIALgPAAQgOAAgHgLgAgTgBIAAAiQAGAMANAAQAJABAGgIQAFgHAAgQQAAgNgFgHQgGgHgJAAQgNgBgGAMg");
	this.shape_1344.setTransform(504.05,149.65);

	this.shape_1345 = new cjs.Shape();
	this.shape_1345.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_1345.setTransform(495.525,151.325);

	this.shape_1346 = new cjs.Shape();
	this.shape_1346.graphics.f("#FFFFFF").s().p("AARAoIAAgzQABgJgEgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIANAAIAAAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_1346.setTransform(888.8,129.175);

	this.shape_1347 = new cjs.Shape();
	this.shape_1347.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_1347.setTransform(880.575,129.25);

	this.shape_1348 = new cjs.Shape();
	this.shape_1348.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCADgEgBQgDABgCgDg");
	this.shape_1348.setTransform(874.7,127.8);

	this.shape_1349 = new cjs.Shape();
	this.shape_1349.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgFgHIAHgIQAKALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgIAJgOAAQgNAAgJgLQgIgLAAgTQAAgSAIgLQAJgLAOAAQANAAAJAKIAAgIIAMAAIAABMQABAPgKAJQgJAJgPAAQgIAAgIgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgJAAgFAHg");
	this.shape_1349.setTransform(868.5,130.725);

	this.shape_1350 = new cjs.Shape();
	this.shape_1350.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_1350.setTransform(860.375,129.25);

	this.shape_1351 = new cjs.Shape();
	this.shape_1351.graphics.f("#FFFFFF").s().p("AgUAvIgBAIIgLAAIAAhvIANAAIAAAqQAIgKAOAAQAOAAAIAKQAIALAAATIAAABQAAASgIALQgJALgNAAQgOAAgJgKgAgTAAIAAAhQAGANANAAQAJgBAFgHQAGgIAAgPQAAgOgGgGQgFgIgJAAQgOAAgFANg");
	this.shape_1351.setTransform(852.3,127.65);

	this.shape_1352 = new cjs.Shape();
	this.shape_1352.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_1352.setTransform(832.475,129.25);

	this.shape_1353 = new cjs.Shape();
	this.shape_1353.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_1353.setTransform(825.125,127.575);

	this.shape_1354 = new cjs.Shape();
	this.shape_1354.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCADgEgBQgDABgCgDg");
	this.shape_1354.setTransform(819,127.8);

	this.shape_1355 = new cjs.Shape();
	this.shape_1355.graphics.f("#FFFFFF").s().p("AgOBFIAAgLIAGABQAFgBACgCQABgCAAgGIAAhYIAOAAIAABXQAAAXgUAAQgEAAgEgBgAABg4QgBgCAAgEQAAgDABgCQACgCAEAAQAEAAACACQACACAAADQAAAEgCACQgCADgEgBQgEABgCgDg");
	this.shape_1355.setTransform(814.575,129.4);

	this.shape_1356 = new cjs.Shape();
	this.shape_1356.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_1356.setTransform(798.05,129.175);

	this.shape_1357 = new cjs.Shape();
	this.shape_1357.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_1357.setTransform(789.825,129.25);

	this.shape_1358 = new cjs.Shape();
	this.shape_1358.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_1358.setTransform(776.525,129.325);

	this.shape_1359 = new cjs.Shape();
	this.shape_1359.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAAKIgLACQgJAAgEgFg");
	this.shape_1359.setTransform(769.775,128.35);

	this.shape_1360 = new cjs.Shape();
	this.shape_1360.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_1360.setTransform(763.475,129.25);

	this.shape_1361 = new cjs.Shape();
	this.shape_1361.graphics.f("#FFFFFF").s().p("AgXAfQgKgLAAgSIAAgCQABgLAEgKQAEgIAIgGQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAGAHQAHAIAJAAQAIAAAFgDQAFgDADgFIAIAGQgJAQgVAAQgOAAgLgKgAgMgXQgGAGAAALIAmAAIAAgBQAAgLgGgFQgEgGgJAAQgHAAgGAGg");
	this.shape_1361.setTransform(750.45,129.25);

	this.shape_1362 = new cjs.Shape();
	this.shape_1362.graphics.f("#FFFFFF").s().p("AgUAvIAAAIIgMAAIAAhvIANAAIAAAqQAIgKAOAAQAOAAAIAKQAIALAAATIAAABQAAASgIALQgIALgOAAQgOAAgJgKgAgTAAIAAAhQAGANANAAQAJgBAFgHQAGgIAAgPQAAgOgGgGQgFgIgJAAQgOAAgFANg");
	this.shape_1362.setTransform(742.4,127.65);

	this.shape_1363 = new cjs.Shape();
	this.shape_1363.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_1363.setTransform(723.375,127.575);

	this.shape_1364 = new cjs.Shape();
	this.shape_1364.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_1364.setTransform(714.975,129.25);

	this.shape_1365 = new cjs.Shape();
	this.shape_1365.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAAKIgLACQgJAAgEgFg");
	this.shape_1365.setTransform(708.275,128.35);

	this.shape_1366 = new cjs.Shape();
	this.shape_1366.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_1366.setTransform(690.55,129.175);

	this.shape_1367 = new cjs.Shape();
	this.shape_1367.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_1367.setTransform(682.275,129.325);

	this.shape_1368 = new cjs.Shape();
	this.shape_1368.graphics.f("#FFFFFF").s().p("AgPAmQgIgEgEgGQgDgGAAgHIANAAQAAAHAGAEQAEAEAIAAQAHAAAGgDQAEgDAAgFQAAgGgEgDQgEgDgKgDQgKgBgGgDQgGgCgDgFQgDgEAAgGQAAgKAJgGQAHgHAMAAQAOAAAJAHQAHAGABAMIgOAAQAAgGgEgEQgFgEgIAAQgGAAgEADQgFADAAAGQABAFAEACQAEADAIACQALACAGADQAGADADAEQAEAEAAAHQAAAKgJAGQgIAHgOAAQgJAAgHgDg");
	this.shape_1368.setTransform(674.25,129.25);

	this.shape_1369 = new cjs.Shape();
	this.shape_1369.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_1369.setTransform(666.275,129.325);

	this.shape_1370 = new cjs.Shape();
	this.shape_1370.graphics.f("#FFFFFF").s().p("AgPAmQgHgEgFgGQgDgGAAgHIANAAQABAHAEAEQAFAEAIAAQAHAAAGgDQAEgDAAgFQAAgGgEgDQgEgDgKgDQgKgBgGgDQgGgCgDgFQgDgEAAgGQAAgKAIgGQAIgHAMAAQAOAAAJAHQAHAGABAMIgOAAQAAgGgEgEQgGgEgHAAQgGAAgEADQgFADABAGQAAAFADACQAEADAKACQAKACAGADQAGADAEAEQADAEAAAHQAAAKgJAGQgIAHgOAAQgIAAgIgDg");
	this.shape_1370.setTransform(658.25,129.25);

	this.shape_1371 = new cjs.Shape();
	this.shape_1371.graphics.f("#FFFFFF").s().p("AgWAfQgLgLAAgSIAAgCQAAgLAFgKQAFgIAHgGQAIgFAJAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAHQAGAIAKAAQAHAAAFgDQAEgDAEgFIAJAGQgKAQgVAAQgPAAgJgKgAgMgXQgFAGgCALIAnAAIAAgBQgBgLgEgFQgGgGgIAAQgHAAgGAGg");
	this.shape_1371.setTransform(645.45,129.25);

	this.shape_1372 = new cjs.Shape();
	this.shape_1372.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAAKIgLACQgJAAgEgFg");
	this.shape_1372.setTransform(638.775,128.35);

	this.shape_1373 = new cjs.Shape();
	this.shape_1373.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgEgHIAGgIQAJALANAAQAJAAAFgGQAGgFAAgKIAAgHQgIAJgNAAQgOAAgJgLQgJgLAAgTQAAgSAJgLQAIgLAPAAQANAAAIAKIABgIIANAAIAABMQgBAPgIAJQgKAJgPAAQgHAAgJgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgIAAgHAHg");
	this.shape_1373.setTransform(620.85,130.725);

	this.shape_1374 = new cjs.Shape();
	this.shape_1374.graphics.f("#FFFFFF").s().p("AASAoIAAgzQgBgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_1374.setTransform(612.65,129.175);

	this.shape_1375 = new cjs.Shape();
	this.shape_1375.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_1375.setTransform(604.425,129.25);

	this.shape_1376 = new cjs.Shape();
	this.shape_1376.graphics.f("#FFFFFF").s().p("AgXA4IgFgCIAAgLIAEAAQAGABAEgDQAEgDADgHIADgIIgdhOIAPAAIATA7IASg7IAPAAIggBaQgGAVgQAAg");
	this.shape_1376.setTransform(596.775,130.85);

	this.shape_1377 = new cjs.Shape();
	this.shape_1377.graphics.f("#FFFFFF").s().p("AARA4IAAg0QAAgIgEgEQgDgEgIAAQgGAAgFAEQgFADgCAFIAAA4IgOAAIAAhvIAOAAIAAArQAIgLANAAQAaAAAAAbIAAA0g");
	this.shape_1377.setTransform(577.8,127.575);

	this.shape_1378 = new cjs.Shape();
	this.shape_1378.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_1378.setTransform(569.525,129.325);

	this.shape_1379 = new cjs.Shape();
	this.shape_1379.graphics.f("#FFFFFF").s().p("AgUAvIAAAIIgMAAIAAhvIANAAIAAAqQAIgKAOAAQAOAAAIAKQAIALABATIAAABQgBASgIALQgIALgOAAQgPAAgIgKgAgTAAIAAAhQAGANANAAQAJgBAGgHQAFgIAAgPQAAgOgFgGQgGgIgJAAQgNAAgGANg");
	this.shape_1379.setTransform(561.4,127.65);

	this.shape_1380 = new cjs.Shape();
	this.shape_1380.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_1380.setTransform(552.875,129.325);

	this.shape_1381 = new cjs.Shape();
	this.shape_1381.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAAKIgLACQgJAAgEgFg");
	this.shape_1381.setTransform(546.125,128.35);

	this.shape_1382 = new cjs.Shape();
	this.shape_1382.graphics.f("#FFFFFF").s().p("AASAoIAAgzQgBgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_1382.setTransform(528.4,129.175);

	this.shape_1383 = new cjs.Shape();
	this.shape_1383.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_1383.setTransform(520.175,129.25);

	this.shape_1384 = new cjs.Shape();
	this.shape_1384.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCADgEgBQgDABgCgDg");
	this.shape_1384.setTransform(514.3,127.8);

	this.shape_1385 = new cjs.Shape();
	this.shape_1385.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgEgHIAHgIQAIALANAAQAJAAAGgGQAFgFAAgKIAAgHQgJAJgMAAQgPAAgIgLQgJgLAAgTQAAgSAJgLQAIgLAPAAQAOAAAHAKIABgIIANAAIAABMQgBAPgIAJQgKAJgPAAQgIAAgIgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgIAAgHAHg");
	this.shape_1385.setTransform(508.1,130.725);

	this.shape_1386 = new cjs.Shape();
	this.shape_1386.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_1386.setTransform(499.975,129.25);

	this.shape_1387 = new cjs.Shape();
	this.shape_1387.graphics.f("#FFFFFF").s().p("AgjA1IAAhpIAiAAQARAAAJAHQAIAHAAAOQAAAHgEAGQgEAGgHADQAIACAFAGQAFAHAAAJQAAAPgJAIQgJAIgRAAgAgVAqIAWAAQAKAAAFgFQAGgFAAgJQAAgUgVAAIgWAAgAgVgHIAVAAQAIAAAGgFQAFgEAAgIQAAgJgFgEQgFgEgKAAIgUAAg");
	this.shape_1387.setTransform(491.425,127.875);

	this.shape_1388 = new cjs.Shape();
	this.shape_1388.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_1388.setTransform(557.95,105.8);

	this.shape_1389 = new cjs.Shape();
	this.shape_1389.graphics.f("#FFFFFF").s().p("AgXAfQgJgLgBgSIAAgCQAAgLAFgJQAFgKAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAIQAHAHAIAAQAHAAAGgDQAEgDAEgFIAJAGQgKAQgVAAQgPAAgKgKgAgMgXQgFAGgBAKIAmAAIAAgBQAAgKgFgGQgGgFgIAAQgHAAgGAGg");
	this.shape_1389.setTransform(542.3,107.25);

	this.shape_1390 = new cjs.Shape();
	this.shape_1390.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_1390.setTransform(523.3,105.8);

	this.shape_1391 = new cjs.Shape();
	this.shape_1391.graphics.f("#FFFFFF").s().p("AgPAlQgIgDgEgGQgDgGAAgHIANAAQAAAHAGAEQAEAEAIAAQAHAAAGgDQAEgEAAgFQAAgFgEgDQgEgDgKgCQgKgCgGgDQgGgDgDgEQgDgEAAgGQAAgJAJgIQAHgGAMAAQAOAAAJAGQAHAIAAAKIgNAAQAAgFgFgEQgEgEgIAAQgGAAgEADQgFAEAAAEQAAAFAFADQAEADAIABQALADAGADQAGADADAEQADAEABAGQAAALgJAGQgJAHgNAAQgJAAgHgEg");
	this.shape_1391.setTransform(517.55,107.25);

	this.shape_1392 = new cjs.Shape();
	this.shape_1392.graphics.f("#FFFFFF").s().p("AAgA1IgJgcIgsAAIgKAcIgPAAIAphpIALAAIApBpgAgRAOIAjAAIgSgxg");
	this.shape_1392.setTransform(508.85,105.875);

	this.shape_1393 = new cjs.Shape();
	this.shape_1393.graphics.f("#FFFFFF").s().p("AgGAGQgCgCAAgEQAAgCACgDQACgCAEAAQAEAAADACQABADAAACQAAAEgBACQgDACgEAAQgEAAgCgCg");
	this.shape_1393.setTransform(498.2,110.475);

	this.shape_1394 = new cjs.Shape();
	this.shape_1394.graphics.f("#FFFFFF").s().p("AAhA1IgKgcIgsAAIgLAcIgOAAIAphpIALAAIApBpgAgRAOIAjAAIgSgxg");
	this.shape_1394.setTransform(491.45,105.875);

	this.instance_9 = new lib.Bitmap24();
	this.instance_9.setTransform(7,4);

	this.instance_10 = new lib.Bitmap10();
	this.instance_10.setTransform(62,148,1.4878,1.3907);

	this.shape_1395 = new cjs.Shape();
	this.shape_1395.graphics.f("#FFFFFF").s().p("AgFAFQgCgCAAgDQAAgCACgCQACgDADAAQAEAAACADQACACAAACQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_1395.setTransform(592.975,447.175);

	this.shape_1396 = new cjs.Shape();
	this.shape_1396.graphics.f("#FFFFFF").s().p("AgWAgQgIgGABgKQgBgLAKgGQAIgGAPAAIANAAIAAgGQAAgGgFgEQgDgEgIAAQgGAAgEAEQgFACgBAGIgMAAQAAgGAEgFQAEgFAHgDQAHgEAGAAQANABAHAGQAIAHAAALIAAAhQAAAKADAGIAAABIgOAAIgBgIQgKAKgKAAQgMgBgGgGgAgRAOQAAAGAEAEQAEAEAGAAQAFgBAFgDQAGgDADgFIAAgPIgKAAQgXAAAAANg");
	this.shape_1396.setTransform(587.4,444.15);

	this.shape_1397 = new cjs.Shape();
	this.shape_1397.graphics.f("#FFFFFF").s().p("AgWArQgIgLAAgRIAAgBQAAgQAIgKQAIgLANAAQAMAAAIAJIAAgmIAMAAIAABoIgLAAIgBgIQgIAJgMAAQgNAAgIgKgAgMgFQgGAHAAAOQAAAMAGAHQAFAHAIAAQAMAAAGgKIAAghQgGgLgMAAQgIAAgFAHg");
	this.shape_1397.setTransform(579.475,442.675);

	this.shape_1398 = new cjs.Shape();
	this.shape_1398.graphics.f("#FFFFFF").s().p("AgXAcQgKgLAAgRIAAAAQAAgKAFgJQAEgJAIgEQAHgGAJAAQAPAAAKALQAJALAAAQIAAABQAAAKgEAKQgEAIgIAEQgIAGgKAAQgOAAgJgLgAgOgUQgGAIAAANQAAAMAGAIQAGAHAIAAQAKAAAFgHQAGgIAAgNQAAgMgGgIQgFgHgKAAQgIAAgGAHg");
	this.shape_1398.setTransform(571.675,444.15);

	this.shape_1399 = new cjs.Shape();
	this.shape_1399.graphics.f("#FFFFFF").s().p("AAQA0IAAgwQABgHgEgFQgDgDgIAAQgGAAgEADQgEADgDAFIAAA0IgNAAIAAhoIANAAIAAApQAIgLAMAAQAYAAAAAaIAAAwg");
	this.shape_1399.setTransform(563.85,442.6);

	this.shape_1400 = new cjs.Shape();
	this.shape_1400.graphics.f("#FFFFFF").s().p("AgeA0IAAhlIALAAIABAIQAIgKAMAAQAOAAAIAKQAHALAAARIAAABQAAAQgHAKQgIALgNAAQgNAAgIgJIAAAkgAgSgeIAAAiQAGALAMgBQAIABAFgIQAGgHAAgNQAAgMgGgIQgFgHgIAAQgMAAgGAKg");
	this.shape_1400.setTransform(556.225,445.5);

	this.shape_1401 = new cjs.Shape();
	this.shape_1401.graphics.f("#FFFFFF").s().p("AgXAcQgKgLAAgRIAAAAQAAgKAFgJQAEgJAIgEQAHgGAJAAQAPAAAKALQAJALAAAQIAAABQAAAKgEAKQgEAIgIAEQgIAGgKAAQgOAAgJgLgAgOgUQgGAIAAANQAAAMAGAIQAGAHAIAAQAKAAAFgHQAGgIAAgNQAAgMgGgIQgFgHgKAAQgIAAgGAHg");
	this.shape_1401.setTransform(548.125,444.15);

	this.shape_1402 = new cjs.Shape();
	this.shape_1402.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgGAAQgMAAgEAKIAAA0g");
	this.shape_1402.setTransform(542.15,444.075);

	this.shape_1403 = new cjs.Shape();
	this.shape_1403.graphics.f("#FFFFFF").s().p("AARA0IAAgwQgBgHgDgFQgEgDgHAAQgGAAgEADQgFADgDAFIAAA0IgMAAIAAhoIAMAAIAAApQAJgLANAAQAXAAAAAaIAAAwg");
	this.shape_1403.setTransform(535.55,442.6);

	this.shape_1404 = new cjs.Shape();
	this.shape_1404.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1404.setTransform(529.225,443.325);

	this.shape_1405 = new cjs.Shape();
	this.shape_1405.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgGAAQgMAAgEAKIAAA0g");
	this.shape_1405.setTransform(525.15,444.075);

	this.shape_1406 = new cjs.Shape();
	this.shape_1406.graphics.f("#FFFFFF").s().p("AAeAyIgJgaIgpAAIgJAaIgOAAIAmhjIALAAIAmBjgAgQANIAhAAIgRgug");
	this.shape_1406.setTransform(517.825,442.875);

	this.shape_1407 = new cjs.Shape();
	this.shape_1407.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQAAgIgDgEQgEgEgHAAQgGAAgEADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_1407.setTransform(505.9,444.075);

	this.shape_1408 = new cjs.Shape();
	this.shape_1408.graphics.f("#FFFFFF").s().p("AgXAgQgHgGAAgKQABgLAIgGQAJgGAPAAIAMAAIAAgGQAAgGgDgEQgEgEgIAAQgGAAgFAEQgEACAAAGIgNAAQAAgGAEgFQAEgFAGgDQAIgEAHAAQAMABAIAGQAGAHABALIAAAhQAAAKACAGIAAABIgNAAIgCgIQgIAKgMAAQgKgBgIgGgAgRAOQAAAGAEAEQAEAEAGAAQAFgBAFgDQAGgDACgFIAAgPIgKAAQgWAAAAANg");
	this.shape_1408.setTransform(498.25,444.15);

	this.shape_1409 = new cjs.Shape();
	this.shape_1409.graphics.f("#FFFFFF").s().p("AgWArQgIgLAAgRIAAgBQAAgQAIgKQAIgLANAAQAMAAAIAJIAAgmIAMAAIAABoIgLAAIgBgIQgIAJgMAAQgNAAgIgKgAgMgFQgGAHAAAOQAAAMAGAHQAFAHAIAAQAMAAAGgKIAAghQgGgLgMAAQgIAAgFAHg");
	this.shape_1409.setTransform(490.325,442.675);

	this.shape_1410 = new cjs.Shape();
	this.shape_1410.graphics.f("#FFFFFF").s().p("AgIAMQAGgJAAgIIAAgLIAMAAIAAAKQgBAGgDAGQgDAHgEAFg");
	this.shape_1410.setTransform(891.3,421.3);

	this.shape_1411 = new cjs.Shape();
	this.shape_1411.graphics.f("#FFFFFF").s().p("AgXAgQgGgGgBgJQABgMAIgFQAJgHAPAAIANAAIAAgGQgBgGgEgEQgEgEgHAAQgGAAgEADQgGAEABAFIgNAAQAAgGAEgFQAEgFAGgDQAHgDAIgBQAMAAAHAHQAIAGAAALIAAAiQAAAKACAGIAAABIgNAAIgBgIQgKAJgLAAQgLAAgHgGgAgRAOQAAAHAEADQAEADAGABQAFAAAGgEQAFgDADgEIAAgQIgLAAQgWAAAAANg");
	this.shape_1411.setTransform(886.35,417.35);

	this.shape_1412 = new cjs.Shape();
	this.shape_1412.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1412.setTransform(880.075,416.525);

	this.shape_1413 = new cjs.Shape();
	this.shape_1413.graphics.f("#FFFFFF").s().p("AgXAgQgGgGgBgJQABgMAIgFQAJgHAPAAIANAAIAAgGQgBgGgEgEQgEgEgHAAQgGAAgEADQgGAEAAAFIgMAAQAAgGAEgFQAEgFAGgDQAHgDAIgBQAMAAAHAHQAIAGAAALIAAAiQAAAKACAGIAAABIgNAAIgBgIQgKAJgLAAQgKAAgIgGgAgRAOQAAAHAEADQAEADAGABQAFAAAGgEQAFgDADgEIAAgQIgLAAQgWAAAAANg");
	this.shape_1413.setTransform(874.2,417.35);

	this.shape_1414 = new cjs.Shape();
	this.shape_1414.graphics.f("#FFFFFF").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_1414.setTransform(864.275,417.275);

	this.shape_1415 = new cjs.Shape();
	this.shape_1415.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgGAAQgMAAgEAKIAAA0g");
	this.shape_1415.setTransform(856.15,417.275);

	this.shape_1416 = new cjs.Shape();
	this.shape_1416.graphics.f("#FFFFFF").s().p("AgVAdQgJgKAAgRIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIgBQAOAAAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPABgJgKgAgLgWQgFAGgBAKIAkAAIAAAAQgBgKgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_1416.setTransform(849.775,417.35);

	this.shape_1417 = new cjs.Shape();
	this.shape_1417.graphics.f("#FFFFFF").s().p("AgWArQgIgLAAgRIAAgBQAAgQAIgKQAIgLANAAQAMAAAIAJIAAgmIAMAAIAABoIgLAAIgBgIQgIAJgMAAQgNAAgIgKgAgMgFQgGAHAAAOQAAAMAGAHQAFAHAIAAQAMAAAGgKIAAghQgGgLgMAAQgIAAgFAHg");
	this.shape_1417.setTransform(841.875,415.875);

	this.shape_1418 = new cjs.Shape();
	this.shape_1418.graphics.f("#FFFFFF").s().p("AgXAcQgKgKAAgSIAAAAQAAgKAFgJQAEgJAIgFQAHgEAJgBQAPAAAKALQAJALAAAQIAAABQAAAKgEAJQgEAJgIAEQgIAGgKgBQgOAAgJgKgAgOgUQgGAIAAANQAAAMAGAHQAGAIAIAAQAKAAAFgIQAGgHAAgNQAAgMgGgIQgFgHgKAAQgIAAgGAHg");
	this.shape_1418.setTransform(834.075,417.35);

	this.shape_1419 = new cjs.Shape();
	this.shape_1419.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQABgIgEgEQgDgEgIAAQgGAAgEADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_1419.setTransform(826.2,417.275);

	this.shape_1420 = new cjs.Shape();
	this.shape_1420.graphics.f("#FFFFFF").s().p("AgGAyIAAhJIANAAIAABJgAgFglQgCgCAAgDQAAgDACgDQACgCADAAQAEAAABACQADADAAADQAAADgDACQgBACgEAAQgDAAgCgCg");
	this.shape_1420.setTransform(820.65,416);

	this.shape_1421 = new cjs.Shape();
	this.shape_1421.graphics.f("#FFFFFF").s().p("AAQA0IAAgwQAAgIgDgDQgEgEgHAAQgGAAgEADQgEAEgEAEIAAA0IgMAAIAAhnIAMAAIAAAnQAJgKANAAQAXAAAAAaIAAAwg");
	this.shape_1421.setTransform(815.1,415.8);

	this.shape_1422 = new cjs.Shape();
	this.shape_1422.graphics.f("#FFFFFF").s().p("AgVAdQgJgLAAgRIAAgBQAAgLAEgJQAEgIAHgFQAIgEAJgBQAMAAAJAIQAHAIABALIgMAAQAAgHgFgFQgFgEgHAAQgJAAgFAHQgGAHAAANIAAACQABAMAFAHQAFAHAJAAQAHAAAFgEQAEgEABgHIAMAAQAAAHgEAGQgEAGgHADQgHADgHAAQgPABgIgKg");
	this.shape_1422.setTransform(807.65,417.35);

	this.shape_1423 = new cjs.Shape();
	this.shape_1423.graphics.f("#FFFFFF").s().p("AgfAyIAAhjIA+AAIAAALIgxAAIAAAgIArAAIAAAKIgrAAIAAAjIAyAAIAAALg");
	this.shape_1423.setTransform(800.275,416.075);

	this.shape_1424 = new cjs.Shape();
	this.shape_1424.graphics.f("#FFFFFF").s().p("AgJAMQAHgJAAgIIAAgLIAMAAIAAAKQAAAGgEAGQgDAHgFAFg");
	this.shape_1424.setTransform(788.4,421.3);

	this.shape_1425 = new cjs.Shape();
	this.shape_1425.graphics.f("#FFFFFF").s().p("AgWAgQgIgGAAgJQAAgMAJgFQAJgHAPAAIAMAAIAAgGQAAgGgDgEQgFgEgHAAQgGAAgFADQgEAEAAAFIgNAAQAAgGAEgFQAEgFAHgDQAGgDAIgBQAMAAAIAHQAGAGABALIAAAiQAAAKADAGIAAABIgOAAIgCgIQgIAJgLAAQgMAAgGgGgAgRAOQAAAHAEADQAEADAGABQAFAAAFgEQAGgDACgEIAAgQIgKAAQgWAAAAANg");
	this.shape_1425.setTransform(783.45,417.35);

	this.shape_1426 = new cjs.Shape();
	this.shape_1426.graphics.f("#FFFFFF").s().p("AgVAdQgJgLAAgRIAAgBQAAgLAEgJQADgIAIgFQAIgEAIgBQANAAAJAIQAHAIABALIgMAAQAAgHgFgFQgFgEgIAAQgIAAgFAHQgGAHAAANIAAACQAAAMAGAHQAFAHAIAAQAHAAAGgEQAEgEABgHIAMAAQAAAHgEAGQgFAGgGADQgHADgIAAQgOABgIgKg");
	this.shape_1426.setTransform(776.05,417.35);

	this.shape_1427 = new cjs.Shape();
	this.shape_1427.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgDgFQgFgGAAgHIANAAQAAAGAFAEQAFAEAHAAQAHAAAFgDQADgDAAgEQAAgGgDgCQgEgDgJgDQgJgCgGgCQgFgDgDgDQgDgEAAgFQAAgKAHgGQAJgHALAAQAMAAAIAHQAIAGAAALIgNAAQAAgGgEgDQgFgEgGAAQgGAAgFADQgEADAAAFQAAAFAEACIANAEQAJACAGADQAFACAEAEQADAFAAAGQAAAJgJAGQgIAHgMgBQgIAAgHgDg");
	this.shape_1427.setTransform(768.7,417.35);

	this.shape_1428 = new cjs.Shape();
	this.shape_1428.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIAMAAIAAAvQAAARAOAAQANAAAGgLIAAg1IAMAAIAABJIgMAAIAAgHQgIAJgNAAQgMAAgGgHg");
	this.shape_1428.setTransform(761.25,417.425);

	this.shape_1429 = new cjs.Shape();
	this.shape_1429.graphics.f("#FFFFFF").s().p("AgGA0IAAhnIANAAIAABng");
	this.shape_1429.setTransform(755.7,415.8);

	this.shape_1430 = new cjs.Shape();
	this.shape_1430.graphics.f("#FFFFFF").s().p("AgXAcQgKgKAAgSIAAAAQAAgKAFgJQAEgJAIgFQAHgEAJgBQAPAAAKALQAJALAAAQIAAABQAAAKgEAJQgEAJgIAEQgIAGgKgBQgOAAgJgKgAgOgUQgGAIAAANQAAAMAGAHQAGAIAIAAQAKAAAFgIQAGgHAAgNQAAgMgGgIQgFgHgKAAQgIAAgGAHg");
	this.shape_1430.setTransform(749.975,417.35);

	this.shape_1431 = new cjs.Shape();
	this.shape_1431.graphics.f("#FFFFFF").s().p("AAlAyIAAgnIABgpIghBQIgJAAIghhQIACApIAAAnIgOAAIAAhjIARAAIAgBQIAghQIARAAIAABjg");
	this.shape_1431.setTransform(739.9,416.075);

	this.shape_1432 = new cjs.Shape();
	this.shape_1432.graphics.f("#FFFFFF").s().p("AgIAMQAGgJAAgIIAAgLIAMAAIAAAKQgBAGgDAGQgDAHgEAFg");
	this.shape_1432.setTransform(726.25,421.3);

	this.shape_1433 = new cjs.Shape();
	this.shape_1433.graphics.f("#FFFFFF").s().p("AgXAgQgGgGAAgJQAAgMAJgFQAIgHAPAAIANAAIAAgGQAAgGgFgEQgEgEgHAAQgGAAgEADQgGAEAAAFIgMAAQAAgGAEgFQAEgFAGgDQAHgDAHgBQANAAAHAHQAHAGABALIAAAiQAAAKACAGIAAABIgNAAIgBgIQgKAJgLAAQgLAAgHgGgAgRAOQAAAHAEADQAEADAGABQAFAAAGgEQAFgDADgEIAAgQIgKAAQgXAAAAANg");
	this.shape_1433.setTransform(721.3,417.35);

	this.shape_1434 = new cjs.Shape();
	this.shape_1434.graphics.f("#FFFFFF").s().p("AgWArQgIgLAAgRIAAgBQAAgQAIgKQAIgLANAAQAMAAAIAJIAAgmIAMAAIAABoIgLAAIgBgIQgIAJgMAAQgNAAgIgKgAgMgFQgGAHAAAOQAAAMAGAHQAFAHAIAAQAMAAAGgKIAAghQgGgLgMAAQgIAAgFAHg");
	this.shape_1434.setTransform(713.375,415.875);

	this.shape_1435 = new cjs.Shape();
	this.shape_1435.graphics.f("#FFFFFF").s().p("AgGAyIAAhJIANAAIAABJgAgFglQgCgCAAgDQAAgDACgDQADgCACAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgCAAgDgCg");
	this.shape_1435.setTransform(707.9,416);

	this.shape_1436 = new cjs.Shape();
	this.shape_1436.graphics.f("#FFFFFF").s().p("AgFA0IAAhnIALAAIAABng");
	this.shape_1436.setTransform(704.5,415.8);

	this.shape_1437 = new cjs.Shape();
	this.shape_1437.graphics.f("#FFFFFF").s().p("AgFA0IAAhnIALAAIAABng");
	this.shape_1437.setTransform(701.1,415.8);

	this.shape_1438 = new cjs.Shape();
	this.shape_1438.graphics.f("#FFFFFF").s().p("AgVAdQgJgKAAgRIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIgBQAOAAAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPABgJgKgAgLgWQgFAGgBAKIAkAAIAAAAQgBgKgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_1438.setTransform(695.775,417.35);

	this.shape_1439 = new cjs.Shape();
	this.shape_1439.graphics.f("#FFFFFF").s().p("AARAmIAAgwQgBgIgDgEQgEgEgHAAQgGAAgEADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_1439.setTransform(688.1,417.275);

	this.shape_1440 = new cjs.Shape();
	this.shape_1440.graphics.f("#FFFFFF").s().p("AARAmIAAgwQgBgIgDgEQgDgEgIAAQgFAAgFADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_1440.setTransform(680.35,417.275);

	this.shape_1441 = new cjs.Shape();
	this.shape_1441.graphics.f("#FFFFFF").s().p("AAeAyIgJgaIgpAAIgJAaIgOAAIAmhjIALAAIAmBjgAgQANIAhAAIgRgug");
	this.shape_1441.setTransform(671.925,416.075);

	this.shape_1442 = new cjs.Shape();
	this.shape_1442.graphics.f("#FFFFFF").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_1442.setTransform(655.275,417.275);

	this.shape_1443 = new cjs.Shape();
	this.shape_1443.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIANAAIAAAvQAAARANAAQAOAAAEgLIAAg1IANAAIAABJIgMAAIgBgHQgHAJgNAAQgMAAgGgHg");
	this.shape_1443.setTransform(645.3,417.425);

	this.shape_1444 = new cjs.Shape();
	this.shape_1444.graphics.f("#FFFFFF").s().p("AgGA0IAAhnIANAAIAABng");
	this.shape_1444.setTransform(639.75,415.8);

	this.shape_1445 = new cjs.Shape();
	this.shape_1445.graphics.f("#FFFFFF").s().p("AgGAyIAAhJIANAAIAABJgAgFglQgCgCAAgDQAAgDACgDQADgCACAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgCAAgDgCg");
	this.shape_1445.setTransform(636.35,416);

	this.shape_1446 = new cjs.Shape();
	this.shape_1446.graphics.f("#FFFFFF").s().p("AgJA1IAAg/IgNAAIAAgKIANAAIAAgHQAAgMAFgHQAGgGALAAIAJABIgBAKIgGAAQgGAAgEADQgDAEAAAGIAAAIIAQAAIAAAKIgQAAIAAA/g");
	this.shape_1446.setTransform(632.45,415.725);

	this.shape_1447 = new cjs.Shape();
	this.shape_1447.graphics.f("#FFFFFF").s().p("AgFAjQgCgCAAgDQAAgDACgCQACgDADAAQAEAAACADQACACAAADQAAADgCACQgCADgEAAQgDAAgCgDgAgFgYQgCgCAAgDQAAgEACgCQACgCADAAQAEAAACACQACACAAAEQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_1447.setTransform(622.15,417.375);

	this.shape_1448 = new cjs.Shape();
	this.shape_1448.graphics.f("#FFFFFF").s().p("AAQA0IAAgwQABgIgEgDQgDgEgIAAQgGAAgEADQgEAEgDAEIAAA0IgNAAIAAhnIANAAIAAAnQAIgKAMAAQAYAAAAAaIAAAwg");
	this.shape_1448.setTransform(610.65,415.8);

	this.shape_1449 = new cjs.Shape();
	this.shape_1449.graphics.f("#FFFFFF").s().p("AgXAcQgKgKAAgSIAAAAQAAgKAFgJQAEgJAIgFQAHgEAJgBQAPAAAKALQAJALAAAQIAAABQAAAKgEAJQgEAJgIAEQgIAGgKgBQgOAAgJgKgAgOgUQgGAIAAANQAAAMAGAHQAGAIAIAAQAKAAAFgIQAGgHAAgNQAAgMgGgIQgFgHgKAAQgIAAgGAHg");
	this.shape_1449.setTransform(602.775,417.35);

	this.shape_1450 = new cjs.Shape();
	this.shape_1450.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1450.setTransform(596.325,416.525);

	this.shape_1451 = new cjs.Shape();
	this.shape_1451.graphics.f("#FFFFFF").s().p("AARAmIAAgwQgBgIgDgEQgDgEgIAAQgFAAgFADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_1451.setTransform(590.35,417.275);

	this.shape_1452 = new cjs.Shape();
	this.shape_1452.graphics.f("#FFFFFF").s().p("AgXAcQgKgKAAgSIAAAAQAAgKAFgJQAEgJAIgFQAHgEAJgBQAPAAAKALQAJALAAAQIAAABQAAAKgEAJQgEAJgIAEQgIAGgKgBQgOAAgJgKgAgOgUQgGAIAAANQAAAMAGAHQAGAIAIAAQAKAAAFgIQAGgHAAgNQAAgMgGgIQgFgHgKAAQgIAAgGAHg");
	this.shape_1452.setTransform(582.475,417.35);

	this.shape_1453 = new cjs.Shape();
	this.shape_1453.graphics.f("#FFFFFF").s().p("AgaAmQgLgMAAgVIAAgJQAAgOAEgKQAFgLAKgFQAIgGAMAAQAQAAAJAJQAKAJABAPIgNAAQgCgMgFgFQgGgFgKAAQgMAAgHAJQgHAJAAARIAAAJQAAAQAHAKQAGAJAMAAQAKAAAHgFQAFgFACgMIANAAQgCAQgJAJQgKAIgQAAQgRAAgKgNg");
	this.shape_1453.setTransform(574.05,416.075);

	this.shape_1454 = new cjs.Shape();
	this.shape_1454.graphics.f("#FFFFFF").s().p("AgFAFQgCgCAAgDQAAgCACgCQACgDADAAQAEAAACADQACACAAACQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_1454.setTransform(561.525,420.375);

	this.shape_1455 = new cjs.Shape();
	this.shape_1455.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQAAgIgDgEQgEgEgHAAQgGAAgEADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_1455.setTransform(555.85,417.275);

	this.shape_1456 = new cjs.Shape();
	this.shape_1456.graphics.f("#FFFFFF").s().p("AgXAgQgHgGAAgJQABgMAIgFQAJgHAPAAIAMAAIAAgGQAAgGgDgEQgEgEgIAAQgGAAgFADQgEAEAAAFIgNAAQAAgGAEgFQAEgFAGgDQAIgDAHgBQAMAAAIAHQAGAGABALIAAAiQAAAKACAGIAAABIgNAAIgCgIQgIAJgMAAQgLAAgHgGgAgRAOQAAAHAEADQAEADAGABQAFAAAFgEQAGgDACgEIAAgQIgKAAQgWAAAAANg");
	this.shape_1456.setTransform(548.2,417.35);

	this.shape_1457 = new cjs.Shape();
	this.shape_1457.graphics.f("#FFFFFF").s().p("AgWAgQgIgGABgJQgBgMAKgFQAIgHAPAAIANAAIAAgGQAAgGgFgEQgDgEgIAAQgGAAgEADQgFAEgBAFIgMAAQAAgGAEgFQAEgFAHgDQAHgDAGgBQANAAAHAHQAIAGAAALIAAAiQAAAKADAGIAAABIgOAAIgBgIQgKAJgKAAQgMAAgGgGgAgRAOQAAAHAEADQAEADAGABQAFAAAFgEQAGgDADgEIAAgQIgKAAQgXAAAAANg");
	this.shape_1457.setTransform(540.6,417.35);

	this.shape_1458 = new cjs.Shape();
	this.shape_1458.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQAAgIgDgEQgEgEgHAAQgGAAgEADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_1458.setTransform(532.9,417.275);

	this.shape_1459 = new cjs.Shape();
	this.shape_1459.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgGAAQgMAAgEAKIAAA0g");
	this.shape_1459.setTransform(527.05,417.275);

	this.shape_1460 = new cjs.Shape();
	this.shape_1460.graphics.f("#FFFFFF").s().p("AgVAdQgJgKAAgRIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIgBQAOAAAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPABgJgKgAgLgWQgFAGgBAKIAkAAIAAAAQgBgKgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_1460.setTransform(520.675,417.35);

	this.shape_1461 = new cjs.Shape();
	this.shape_1461.graphics.f("#FFFFFF").s().p("AgWAdQgIgLAAgRIAAgBQAAgLAEgJQAEgIAHgFQAHgEAKgBQAMAAAIAIQAJAIAAALIgMAAQgBgHgEgFQgFgEgHAAQgJAAgFAHQgGAHABANIAAACQAAAMAEAHQAGAHAJAAQAHAAAEgEQAGgEAAgHIAMAAQAAAHgEAGQgEAGgHADQgGADgIAAQgOABgKgKg");
	this.shape_1461.setTransform(513.3,417.35);

	this.shape_1462 = new cjs.Shape();
	this.shape_1462.graphics.f("#FFFFFF").s().p("AARAmIAAgwQAAgIgEgEQgDgEgIAAQgFAAgFADQgFAEgCAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_1462.setTransform(505.65,417.275);

	this.shape_1463 = new cjs.Shape();
	this.shape_1463.graphics.f("#FFFFFF").s().p("AgVAdQgJgKAAgRIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIgBQAOAAAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPABgJgKgAgLgWQgFAGgBAKIAkAAIAAAAQgBgKgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_1463.setTransform(498.175,417.35);

	this.shape_1464 = new cjs.Shape();
	this.shape_1464.graphics.f("#FFFFFF").s().p("AgeA0IAAhmIALAAIABAIQAIgJAMAAQAOAAAIAKQAHAKAAASIAAABQAAAQgHAKQgIALgNAAQgNAAgIgIIAAAjgAgSgeIAAAiQAGAKAMAAQAIAAAFgGQAGgIAAgNQAAgMgGgIQgFgHgIAAQgMAAgGAKg");
	this.shape_1464.setTransform(490.625,418.7);

	this.shape_1465 = new cjs.Shape();
	this.shape_1465.graphics.f("#FFFFFF").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_1465.setTransform(887.025,390.475);

	this.shape_1466 = new cjs.Shape();
	this.shape_1466.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgKgEgFQgFgFgIAAQgHAAgFAFg");
	this.shape_1466.setTransform(877.275,390.55);

	this.shape_1467 = new cjs.Shape();
	this.shape_1467.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1467.setTransform(871.025,389.725);

	this.shape_1468 = new cjs.Shape();
	this.shape_1468.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgDgFQgFgGAAgHIANAAQABAGAEAFQAFADAHAAQAHAAAFgDQADgDAAgEQABgFgEgDQgEgDgJgDQgJgCgGgCQgGgCgCgEQgDgEAAgGQAAgJAHgGQAJgHALABQAMgBAIAHQAIAGAAALIgNAAQAAgGgEgDQgFgEgGAAQgGAAgFADQgDADAAAFQAAAEADADIANAEQAJACAFADQAHACACAFQAEADAAAHQgBAKgHAGQgJAFgMAAQgIABgHgEg");
	this.shape_1468.setTransform(865.35,390.55);

	this.shape_1469 = new cjs.Shape();
	this.shape_1469.graphics.f("#FFFFFF").s().p("AgFAzIAAhKIALAAIAABKgAgEglQgCgCAAgDQAAgDACgCQABgDADAAQAEAAABADQACACAAADQAAADgCACQgBACgEAAQgDAAgBgCg");
	this.shape_1469.setTransform(860.05,389.2);

	this.shape_1470 = new cjs.Shape();
	this.shape_1470.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgDgFQgEgGgBgHIANAAQAAAGAFAFQAFADAHAAQAHAAAEgDQAEgDABgEQAAgFgEgDQgEgDgJgDQgJgCgGgCQgFgCgDgEQgDgEAAgGQAAgJAIgGQAHgHAMABQAMgBAIAHQAHAGABALIgNAAQAAgGgFgDQgEgEgGAAQgHAAgDADQgFADAAAFQAAAEAFADIAMAEQAJACAGADQAFACAEAFQADADAAAHQAAAKgJAGQgHAFgNAAQgIABgHgEg");
	this.shape_1470.setTransform(854.75,390.55);

	this.shape_1471 = new cjs.Shape();
	this.shape_1471.graphics.f("#FFFFFF").s().p("AgGAzIAAhKIANAAIAABKgAgFglQgCgCAAgDQAAgDACgCQADgDACAAQAEAAACADQACACAAADQAAADgCACQgCACgEAAQgCAAgDgCg");
	this.shape_1471.setTransform(842.45,389.2);

	this.shape_1472 = new cjs.Shape();
	this.shape_1472.graphics.f("#FFFFFF").s().p("AgXAgQgGgGAAgJQAAgMAJgFQAIgHAPAAIANAAIAAgGQgBgGgEgEQgEgEgHAAQgGAAgEADQgGADAAAFIgMAAQAAgFAEgFQAEgGAGgCQAHgDAHAAQANgBAHAHQAIAHAAAKIAAAhQAAALACAGIAAABIgNAAIgBgIQgKAJgLAAQgKAAgIgGgAgRAPQAAAGAEADQAEADAGAAQAFAAAGgCQAFgEADgEIAAgQIgKAAQgXAAAAAOg");
	this.shape_1472.setTransform(836.95,390.55);

	this.shape_1473 = new cjs.Shape();
	this.shape_1473.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_1473.setTransform(829.075,391.925);

	this.shape_1474 = new cjs.Shape();
	this.shape_1474.graphics.f("#FFFFFF").s().p("AgWAgQgIgGABgJQgBgMAKgFQAIgHAPAAIAMAAIAAgGQABgGgEgEQgFgEgHAAQgGAAgFADQgEADgBAFIgMAAQAAgFAEgFQAEgGAHgCQAHgDAGAAQANgBAIAHQAGAHABAKIAAAhQAAALADAGIAAABIgOAAIgCgIQgJAJgKAAQgMAAgGgGgAgRAPQAAAGAEADQAEADAGAAQAFAAAFgCQAGgEACgEIAAgQIgJAAQgXAAAAAOg");
	this.shape_1474.setTransform(821.5,390.55);

	this.shape_1475 = new cjs.Shape();
	this.shape_1475.graphics.f("#FFFFFF").s().p("AgSArIgBAJIgLAAIAAhoIAMAAIAAAnQAIgKANAAQANAAAIALQAHAKAAAQIAAACQAAARgHAKQgIAKgNAAQgNAAgIgKgAgSAAIAAAfQAGALAMAAQAJAAAFgHQAFgHAAgOQAAgNgFgGQgFgHgJAAQgMAAgGAMg");
	this.shape_1475.setTransform(813.925,389.075);

	this.shape_1476 = new cjs.Shape();
	this.shape_1476.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgKgEgFQgFgFgIAAQgHAAgFAFg");
	this.shape_1476.setTransform(806.225,390.55);

	this.shape_1477 = new cjs.Shape();
	this.shape_1477.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgDgFQgFgGAAgHIANAAQAAAGAFAFQAFADAHAAQAHAAAEgDQAEgDAAgEQAAgFgDgDQgEgDgJgDQgJgCgGgCQgFgCgDgEQgDgEAAgGQAAgJAHgGQAJgHALABQAMgBAIAHQAIAGAAALIgNAAQAAgGgEgDQgFgEgGAAQgGAAgFADQgEADAAAFQAAAEAEADIANAEQAJACAGADQAFACAEAFQADADAAAHQAAAKgIAGQgJAFgMAAQgIABgHgEg");
	this.shape_1477.setTransform(798.85,390.55);

	this.shape_1478 = new cjs.Shape();
	this.shape_1478.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQABgIgEgEQgDgEgIAAQgGAAgEADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_1478.setTransform(784.35,390.475);

	this.shape_1479 = new cjs.Shape();
	this.shape_1479.graphics.f("#FFFFFF").s().p("AgWAgQgIgGAAgJQAAgMAJgFQAJgHAPAAIAMAAIAAgGQAAgGgDgEQgFgEgHAAQgGAAgFADQgEADAAAFIgNAAQAAgFAEgFQAEgGAHgCQAGgDAIAAQAMgBAIAHQAGAHABAKIAAAhQAAALADAGIAAABIgOAAIgCgIQgIAJgLAAQgMAAgGgGgAgRAPQAAAGAEADQAEADAGAAQAFAAAFgCQAGgEACgEIAAgQIgKAAQgWAAAAAOg");
	this.shape_1479.setTransform(776.7,390.55);

	this.shape_1480 = new cjs.Shape();
	this.shape_1480.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIAMAAIAAAIQAGgKALAAIAGABIAAAMIgHAAQgLAAgFAKIAAA0g");
	this.shape_1480.setTransform(770.9,390.475);

	this.shape_1481 = new cjs.Shape();
	this.shape_1481.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgKgEgFQgFgFgIAAQgHAAgFAFg");
	this.shape_1481.setTransform(764.525,390.55);

	this.shape_1482 = new cjs.Shape();
	this.shape_1482.graphics.f("#FFFFFF").s().p("AgeA0IAAhmIALAAIABAIQAIgJAMAAQAOAAAIAKQAHALAAARIAAACQAAAPgHALQgIAKgNAAQgNAAgIgIIAAAjgAgSgeIAAAiQAGALAMAAQAIgBAFgGQAGgIAAgNQAAgNgGgHQgFgHgIAAQgMAAgGAKg");
	this.shape_1482.setTransform(756.975,391.9);

	this.shape_1483 = new cjs.Shape();
	this.shape_1483.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIAMAAIAAAIQAGgKALAAIAGABIAAAMIgHAAQgLAAgFAKIAAA0g");
	this.shape_1483.setTransform(750.9,390.475);

	this.shape_1484 = new cjs.Shape();
	this.shape_1484.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgKgEgFQgFgFgIAAQgHAAgFAFg");
	this.shape_1484.setTransform(744.525,390.55);

	this.shape_1485 = new cjs.Shape();
	this.shape_1485.graphics.f("#FFFFFF").s().p("AgSArIgBAJIgLAAIAAhoIAMAAIAAAnQAIgKANAAQANAAAIALQAHAKAAAQIAAACQAAARgHAKQgIAKgNAAQgNAAgIgKgAgSAAIAAAfQAGALAMAAQAJAAAFgHQAFgHAAgOQAAgNgFgGQgFgHgJAAQgMAAgGAMg");
	this.shape_1485.setTransform(736.975,389.075);

	this.shape_1486 = new cjs.Shape();
	this.shape_1486.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_1486.setTransform(721.825,391.925);

	this.shape_1487 = new cjs.Shape();
	this.shape_1487.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQABgIgEgEQgDgEgIAAQgGAAgEADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_1487.setTransform(714.15,390.475);

	this.shape_1488 = new cjs.Shape();
	this.shape_1488.graphics.f("#FFFFFF").s().p("AgWAgQgIgGAAgJQAAgMAJgFQAJgHAPAAIAMAAIAAgGQAAgGgDgEQgFgEgHAAQgGAAgFADQgEADAAAFIgNAAQAAgFAEgFQAEgGAHgCQAGgDAIAAQAMgBAIAHQAGAHABAKIAAAhQAAALADAGIAAABIgOAAIgCgIQgIAJgLAAQgMAAgGgGgAgRAPQAAAGAEADQAEADAGAAQAFAAAFgCQAGgEACgEIAAgQIgKAAQgWAAAAAOg");
	this.shape_1488.setTransform(706.5,390.55);

	this.shape_1489 = new cjs.Shape();
	this.shape_1489.graphics.f("#FFFFFF").s().p("AgWAzIgEAAIAAgLIADABQAGAAAEgDQAEgDACgGIADgIIgbhIIAPAAIARA2IARg2IANAAIgdBUQgGATgPAAg");
	this.shape_1489.setTransform(699.4,392.05);

	this.shape_1490 = new cjs.Shape();
	this.shape_1490.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIAMAAIAAAIQAGgKALAAIAGABIAAAMIgHAAQgLAAgFAKIAAA0g");
	this.shape_1490.setTransform(687.1,390.475);

	this.shape_1491 = new cjs.Shape();
	this.shape_1491.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgKgEgFQgFgFgIAAQgHAAgFAFg");
	this.shape_1491.setTransform(680.725,390.55);

	this.shape_1492 = new cjs.Shape();
	this.shape_1492.graphics.f("#FFFFFF").s().p("AgFA1IAAhoIALAAIAABog");
	this.shape_1492.setTransform(675.25,389);

	this.shape_1493 = new cjs.Shape();
	this.shape_1493.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIANAAIAAAvQAAARANAAQAOAAAEgLIAAg1IANAAIAABJIgMAAIgBgHQgGAJgOAAQgMAAgGgHg");
	this.shape_1493.setTransform(669.7,390.625);

	this.shape_1494 = new cjs.Shape();
	this.shape_1494.graphics.f("#FFFFFF").s().p("AgWAcQgIgKAAgRIAAgBQAAgLAEgIQAEgJAHgFQAHgEAJAAQANgBAIAIQAJAIAAAMIgMAAQgBgHgEgGQgFgEgIAAQgIAAgFAHQgGAHABANIAAABQAAANAEAHQAGAHAIAAQAIAAAEgEQAGgEAAgHIAMAAQAAAHgEAGQgEAGgHADQgGAEgJgBQgNABgKgLg");
	this.shape_1494.setTransform(662.25,390.55);

	this.shape_1495 = new cjs.Shape();
	this.shape_1495.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgEgFQgDgGAAgHIAMAAQABAGAFAFQAEADAHAAQAHAAAFgDQAEgDgBgEQAAgFgDgDQgEgDgJgDQgKgCgFgCQgGgCgCgEQgDgEAAgGQAAgJAIgGQAIgHAKABQANgBAIAHQAIAGgBALIgMAAQAAgGgFgDQgEgEgHAAQgFAAgFADQgDADAAAFQAAAEADADIAMAEQAKACAFADQAHACACAFQADADAAAHQAAAKgHAGQgIAFgNAAQgIABgHgEg");
	this.shape_1495.setTransform(654.9,390.55);

	this.shape_1496 = new cjs.Shape();
	this.shape_1496.graphics.f("#FFFFFF").s().p("AgXAgQgGgGAAgJQAAgMAJgFQAIgHAPAAIANAAIAAgGQAAgGgFgEQgEgEgHAAQgGAAgEADQgGADAAAFIgMAAQAAgFAEgFQAEgGAGgCQAHgDAHAAQANgBAHAHQAHAHABAKIAAAhQAAALACAGIAAABIgNAAIgBgIQgKAJgLAAQgKAAgIgGgAgRAPQAAAGAEADQAEADAGAAQAFAAAGgCQAFgEADgEIAAgQIgKAAQgXAAAAAOg");
	this.shape_1496.setTransform(647.5,390.55);

	this.shape_1497 = new cjs.Shape();
	this.shape_1497.graphics.f("#FFFFFF").s().p("AgEAlIgahJIAMAAIASA4IATg4IAMAAIgaBJg");
	this.shape_1497.setTransform(640.275,390.55);

	this.shape_1498 = new cjs.Shape();
	this.shape_1498.graphics.f("#FFFFFF").s().p("AgXAcQgKgKAAgSIAAAAQAAgKAFgJQAEgJAIgFQAHgEAJAAQAPAAAKAKQAJALAAAQIAAABQAAALgEAIQgEAJgIAFQgIAEgKAAQgOAAgJgKgAgOgTQgGAHAAANQAAAMAGAHQAGAIAIAAQAKAAAFgIQAGgHAAgNQAAgMgGgHQgFgIgKAAQgIAAgGAIg");
	this.shape_1498.setTransform(632.875,390.55);

	this.shape_1499 = new cjs.Shape();
	this.shape_1499.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIAMAAIAAAIQAGgKALAAIAGABIAAAMIgHAAQgLAAgFAKIAAA0g");
	this.shape_1499.setTransform(626.9,390.475);

	this.shape_1500 = new cjs.Shape();
	this.shape_1500.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1500.setTransform(621.675,389.725);

	this.shape_1501 = new cjs.Shape();
	this.shape_1501.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgEgFQgDgGAAgHIAMAAQAAAGAGAFQAEADAHAAQAHAAAEgDQAFgDAAgEQgBgFgDgDQgEgDgJgDQgKgCgFgCQgGgCgCgEQgDgEAAgGQAAgJAIgGQAHgHALABQANgBAIAHQAHAGAAALIgMAAQAAgGgFgDQgEgEgHAAQgGAAgDADQgFADAAAFQAAAEAFADIALAEQAKACAGADQAFACAEAFQACADAAAHQABAKgJAGQgIAFgMAAQgIABgHgEg");
	this.shape_1501.setTransform(616,390.55);

	this.shape_1502 = new cjs.Shape();
	this.shape_1502.graphics.f("#FFFFFF").s().p("AgXAgQgGgGgBgJQABgMAIgFQAJgHAPAAIAMAAIAAgGQAAgGgDgEQgFgEgHAAQgGAAgFADQgEADAAAFIgNAAQAAgFAEgFQAEgGAGgCQAIgDAHAAQAMgBAHAHQAIAHAAAKIAAAhQAAALACAGIAAABIgNAAIgCgIQgIAJgMAAQgKAAgIgGgAgRAPQAAAGAEADQAEADAGAAQAFAAAGgCQAFgEACgEIAAgQIgKAAQgWAAAAAOg");
	this.shape_1502.setTransform(608.6,390.55);

	this.shape_1503 = new cjs.Shape();
	this.shape_1503.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_1503.setTransform(600.725,391.925);

	this.shape_1504 = new cjs.Shape();
	this.shape_1504.graphics.f("#FFFFFF").s().p("AgWAgQgIgGABgJQgBgMAKgFQAIgHAPAAIANAAIAAgGQgBgGgDgEQgFgEgHAAQgGAAgFADQgEADgBAFIgMAAQAAgFAEgFQAEgGAHgCQAHgDAGAAQANgBAIAHQAGAHABAKIAAAhQAAALADAGIAAABIgOAAIgBgIQgKAJgKAAQgMAAgGgGgAgRAPQAAAGAEADQAEADAGAAQAFAAAFgCQAGgEADgEIAAgQIgKAAQgXAAAAAOg");
	this.shape_1504.setTransform(586.15,390.55);

	this.shape_1505 = new cjs.Shape();
	this.shape_1505.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_1505.setTransform(578.275,391.925);

	this.shape_1506 = new cjs.Shape();
	this.shape_1506.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_1506.setTransform(570.425,391.925);

	this.shape_1507 = new cjs.Shape();
	this.shape_1507.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQAAgIgDgEQgDgEgIAAQgGAAgEADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_1507.setTransform(562.75,390.475);

	this.shape_1508 = new cjs.Shape();
	this.shape_1508.graphics.f("#FFFFFF").s().p("AgXAcQgKgKAAgSIAAAAQAAgKAFgJQAEgJAIgFQAHgEAJAAQAPAAAKAKQAJALAAAQIAAABQAAALgEAIQgEAJgIAFQgIAEgKAAQgOAAgJgKgAgOgTQgGAHAAANQAAAMAGAHQAGAIAIAAQAKAAAFgIQAGgHAAgNQAAgMgGgHQgFgIgKAAQgIAAgGAIg");
	this.shape_1508.setTransform(554.875,390.55);

	this.shape_1509 = new cjs.Shape();
	this.shape_1509.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgGAAQgMAAgEAKIAAA0g");
	this.shape_1509.setTransform(548.9,390.475);

	this.shape_1510 = new cjs.Shape();
	this.shape_1510.graphics.f("#FFFFFF").s().p("AgGAzIAAhKIANAAIAABKgAgEglQgDgCAAgDQAAgDADgCQABgDADAAQAEAAACADQABACABADQgBADgBACQgCACgEAAQgDAAgBgCg");
	this.shape_1510.setTransform(537.45,389.2);

	this.shape_1511 = new cjs.Shape();
	this.shape_1511.graphics.f("#FFFFFF").s().p("AAQA1IgZgiIgIAIIAAAaIgNAAIAAhoIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgArg");
	this.shape_1511.setTransform(532.675,389);

	this.shape_1512 = new cjs.Shape();
	this.shape_1512.graphics.f("#FFFFFF").s().p("AgFAzIAAhKIALAAIAABKgAgEglQgCgCAAgDQAAgDACgCQACgDACAAQAEAAABADQACACAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_1512.setTransform(526.95,389.2);

	this.shape_1513 = new cjs.Shape();
	this.shape_1513.graphics.f("#FFFFFF").s().p("AgGA1IAAhoIAMAAIAABog");
	this.shape_1513.setTransform(523.55,389);

	this.shape_1514 = new cjs.Shape();
	this.shape_1514.graphics.f("#FFFFFF").s().p("AgGAzIAAhKIANAAIAABKgAgFglQgCgCAAgDQAAgDACgCQACgDADAAQAEAAACADQACACAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_1514.setTransform(520.15,389.2);

	this.shape_1515 = new cjs.Shape();
	this.shape_1515.graphics.f("#FFFFFF").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_1515.setTransform(512.325,390.475);

	this.shape_1516 = new cjs.Shape();
	this.shape_1516.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgKgEgFQgFgFgIAAQgHAAgFAFg");
	this.shape_1516.setTransform(502.575,390.55);

	this.shape_1517 = new cjs.Shape();
	this.shape_1517.graphics.f("#FFFFFF").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_1517.setTransform(492.675,390.475);

	this.shape_1518 = new cjs.Shape();
	this.shape_1518.graphics.f("#FFFFFF").s().p("AgGA1IAAhpIAMAAIAABpg");
	this.shape_1518.setTransform(891.2,362.2);

	this.shape_1519 = new cjs.Shape();
	this.shape_1519.graphics.f("#FFFFFF").s().p("AgXAgQgHgGAAgKQABgLAIgFQAJgHAPAAIAMAAIAAgFQAAgIgDgDQgEgEgIAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgGAGgDQAIgCAHAAQAMAAAIAGQAGAHABALIAAAgQAAALACAGIAAABIgNAAIgCgIQgIAKgMgBQgLABgHgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgCQAGgEACgFIAAgPIgKAAQgWAAAAAOg");
	this.shape_1519.setTransform(885.7,363.75);

	this.shape_1520 = new cjs.Shape();
	this.shape_1520.graphics.f("#FFFFFF").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_1520.setTransform(875.775,363.675);

	this.shape_1521 = new cjs.Shape();
	this.shape_1521.graphics.f("#FFFFFF").s().p("AgFAzIAAhJIALAAIAABJgAgEglQgCgCAAgDQAAgDACgCQACgCACAAQAEAAABACQACACAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_1521.setTransform(867.95,362.4);

	this.shape_1522 = new cjs.Shape();
	this.shape_1522.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQAAgIgDgEQgEgEgHAAQgGAAgEADQgEAEgEAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_1522.setTransform(862.35,363.675);

	this.shape_1523 = new cjs.Shape();
	this.shape_1523.graphics.f("#FFFFFF").s().p("AgFAzIAAhJIALAAIAABJgAgEglQgCgCAAgDQAAgDACgCQACgCACAAQAEAAABACQACACAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_1523.setTransform(856.8,362.4);

	this.shape_1524 = new cjs.Shape();
	this.shape_1524.graphics.f("#FFFFFF").s().p("AAlAyIAAgnIABgpIghBQIgJAAIgghQIABApIAAAnIgOAAIAAhjIARAAIAgBQIAghQIARAAIAABjg");
	this.shape_1524.setTransform(849,362.475);

	this.shape_1525 = new cjs.Shape();
	this.shape_1525.graphics.f("#FFFFFF").s().p("AgFAFQgCgCAAgDQAAgCACgCQACgDADAAQAEAAACADQACACAAACQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_1525.setTransform(836.575,366.775);

	this.shape_1526 = new cjs.Shape();
	this.shape_1526.graphics.f("#FFFFFF").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_1526.setTransform(828.675,363.675);

	this.shape_1527 = new cjs.Shape();
	this.shape_1527.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIAMAAIAAAIQAGgKALAAIAGABIAAAMIgGAAQgMAAgFAKIAAA0g");
	this.shape_1527.setTransform(820.55,363.675);

	this.shape_1528 = new cjs.Shape();
	this.shape_1528.graphics.f("#FFFFFF").s().p("AgVAcQgJgJAAgRIAAgCQAAgLAEgIQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAKAAASIAAAEIgxAAQABAKAGAIQAGAGAIAAQAHAAAFgDQAEgCAEgFIAHAGQgJAOgSAAQgPAAgJgKgAgLgVQgFAFgBAKIAkAAIAAgBQgBgJgEgFQgFgGgIAAQgHAAgFAGg");
	this.shape_1528.setTransform(814.175,363.75);

	this.shape_1529 = new cjs.Shape();
	this.shape_1529.graphics.f("#FFFFFF").s().p("AgWArQgIgLAAgRIAAgBQAAgQAIgKQAIgLANAAQAMAAAIAJIAAgmIAMAAIAABoIgLAAIgBgIQgIAJgMAAQgNAAgIgKgAgMgFQgGAHAAAOQAAAMAGAHQAFAHAIAAQAMAAAGgKIAAghQgGgLgMAAQgIAAgFAHg");
	this.shape_1529.setTransform(806.275,362.275);

	this.shape_1530 = new cjs.Shape();
	this.shape_1530.graphics.f("#FFFFFF").s().p("AgXAcQgKgLAAgRIAAAAQAAgLAFgIQAEgJAIgFQAHgEAJAAQAPAAAKAKQAJAKAAARIAAABQAAALgEAIQgEAJgIAFQgIAEgKAAQgOABgJgLgAgOgTQgGAHAAANQAAAMAGAHQAGAIAIAAQAKAAAFgIQAGgHAAgNQAAgMgGgHQgFgIgKAAQgIAAgGAIg");
	this.shape_1530.setTransform(798.475,363.75);

	this.shape_1531 = new cjs.Shape();
	this.shape_1531.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgEgGQgEgFABgHIAMAAQABAHAEAEQAFADAHAAQAHAAAFgDQADgDAAgFQAAgFgDgDQgEgCgJgCQgKgCgFgDQgFgDgDgDQgDgEAAgGQAAgJAHgGQAIgGALAAQANAAAIAGQAIAHgBAKIgMAAQAAgFgEgEQgFgEgHAAQgGAAgEADQgDADAAAFQAAAEADADIANAFQAJACAFACQAHADACAEQADAEABAFQgBAKgHAHQgJAFgMAAQgIAAgHgDg");
	this.shape_1531.setTransform(790.9,363.75);

	this.shape_1532 = new cjs.Shape();
	this.shape_1532.graphics.f("#FFFFFF").s().p("AgVAcQgJgJAAgRIAAgCQAAgLAEgIQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAKAAASIAAAEIgxAAQABAKAGAIQAGAGAIAAQAHAAAFgDQAEgCAEgFIAHAGQgJAOgSAAQgPAAgJgKgAgLgVQgFAFgBAKIAkAAIAAgBQgBgJgEgFQgFgGgIAAQgHAAgFAGg");
	this.shape_1532.setTransform(783.675,363.75);

	this.shape_1533 = new cjs.Shape();
	this.shape_1533.graphics.f("#FFFFFF").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_1533.setTransform(773.775,363.675);

	this.shape_1534 = new cjs.Shape();
	this.shape_1534.graphics.f("#FFFFFF").s().p("AARAmIAAgwQAAgIgEgEQgEgEgHAAQgFAAgFADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_1534.setTransform(759.35,363.675);

	this.shape_1535 = new cjs.Shape();
	this.shape_1535.graphics.f("#FFFFFF").s().p("AgXAgQgGgGgBgKQABgLAIgFQAJgHAPAAIAMAAIAAgFQAAgIgEgDQgEgEgHAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgGAGgDQAIgCAHAAQAMAAAHAGQAIAHAAALIAAAgQAAALACAGIAAABIgNAAIgCgIQgIAKgMgBQgKABgIgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAGgCQAFgEACgFIAAgPIgKAAQgWAAAAAOg");
	this.shape_1535.setTransform(751.7,363.75);

	this.shape_1536 = new cjs.Shape();
	this.shape_1536.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgDgGQgFgFAAgHIANAAQABAHAEAEQAFADAHAAQAHAAAFgDQADgDAAgFQABgFgEgDQgEgCgJgCQgJgCgGgDQgGgDgCgDQgDgEAAgGQAAgJAHgGQAJgGALAAQAMAAAIAGQAIAHAAAKIgNAAQAAgFgEgEQgFgEgGAAQgGAAgFADQgDADAAAFQAAAEADADIANAFQAJACAFACQAHADACAEQAEAEAAAFQgBAKgHAHQgJAFgMAAQgIAAgHgDg");
	this.shape_1536.setTransform(744.3,363.75);

	this.shape_1537 = new cjs.Shape();
	this.shape_1537.graphics.f("#FFFFFF").s().p("AgFAzIAAhJIALAAIAABJgAgEglQgCgCAAgDQAAgDACgCQACgCACAAQAEAAABACQACACAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_1537.setTransform(739,362.4);

	this.shape_1538 = new cjs.Shape();
	this.shape_1538.graphics.f("#FFFFFF").s().p("AgeA0IAAhlIALAAIABAHQAIgJAMAAQAOAAAIAKQAHALAAARIAAACQAAAPgHALQgIAKgNAAQgNAAgIgJIAAAkgAgSgeIAAAjQAGAJAMABQAIAAAFgHQAGgIAAgNQAAgNgGgHQgFgHgIAAQgMAAgGAKg");
	this.shape_1538.setTransform(733.525,365.1);

	this.shape_1539 = new cjs.Shape();
	this.shape_1539.graphics.f("#FFFFFF").s().p("AgWAgQgIgGABgKQgBgLAKgFQAIgHAPAAIANAAIAAgFQgBgIgDgDQgFgEgHAAQgGAAgFADQgEAEgBAEIgMAAQAAgFAEgFQAEgGAHgDQAHgCAGAAQANAAAIAGQAGAHABALIAAAgQAAALADAGIAAABIgOAAIgBgIQgKAKgKgBQgMABgGgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgCQAGgEADgFIAAgPIgKAAQgXAAAAAOg");
	this.shape_1539.setTransform(725.65,363.75);

	this.shape_1540 = new cjs.Shape();
	this.shape_1540.graphics.f("#FFFFFF").s().p("AgGA1IAAhpIANAAIAABpg");
	this.shape_1540.setTransform(720.15,362.2);

	this.shape_1541 = new cjs.Shape();
	this.shape_1541.graphics.f("#FFFFFF").s().p("AgFAzIAAhJIALAAIAABJgAgEglQgCgCAAgDQAAgDACgCQACgCACAAQAEAAABACQACACAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_1541.setTransform(712.35,362.4);

	this.shape_1542 = new cjs.Shape();
	this.shape_1542.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgDgGQgFgFAAgHIANAAQAAAHAFAEQAFADAHAAQAHAAAEgDQAEgDAAgFQAAgFgDgDQgEgCgJgCQgJgCgGgDQgFgDgDgDQgDgEAAgGQAAgJAHgGQAJgGALAAQAMAAAIAGQAIAHAAAKIgNAAQAAgFgEgEQgFgEgGAAQgGAAgFADQgDADgBAFQABAEADADIANAFQAJACAGACQAFADAEAEQADAEAAAFQAAAKgIAHQgJAFgMAAQgIAAgHgDg");
	this.shape_1542.setTransform(707.05,363.75);

	this.shape_1543 = new cjs.Shape();
	this.shape_1543.graphics.f("#FFFFFF").s().p("AgWAgQgIgGAAgKQAAgLAJgFQAJgHAPAAIAMAAIAAgFQAAgIgDgDQgFgEgHAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgGAHgDQAGgCAHAAQANAAAIAGQAGAHABALIAAAgQAAALADAGIAAABIgOAAIgCgIQgJAKgKgBQgMABgGgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgCQAGgEACgFIAAgPIgJAAQgXAAAAAOg");
	this.shape_1543.setTransform(699.65,363.75);

	this.shape_1544 = new cjs.Shape();
	this.shape_1544.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1544.setTransform(693.375,362.925);

	this.shape_1545 = new cjs.Shape();
	this.shape_1545.graphics.f("#FFFFFF").s().p("AgWAgQgIgGABgKQgBgLAJgFQAJgHAPAAIAMAAIAAgFQAAgIgDgDQgFgEgHAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgGAHgDQAGgCAHAAQANAAAIAGQAGAHABALIAAAgQAAALADAGIAAABIgOAAIgCgIQgJAKgKgBQgMABgGgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgCQAGgEACgFIAAgPIgKAAQgWAAAAAOg");
	this.shape_1545.setTransform(687.5,363.75);

	this.shape_1546 = new cjs.Shape();
	this.shape_1546.graphics.f("#FFFFFF").s().p("AgSArIgBAJIgLAAIAAhoIAMAAIAAAnQAIgKANAAQANAAAIALQAHAKAAAQIAAACQAAARgHAKQgIAKgNAAQgNAAgIgKgAgSAAIAAAfQAGALAMAAQAJAAAFgHQAFgHAAgOQAAgNgFgGQgFgHgJAAQgMAAgGAMg");
	this.shape_1546.setTransform(679.925,362.275);

	this.shape_1547 = new cjs.Shape();
	this.shape_1547.graphics.f("#FFFFFF").s().p("AgGAzIAAhJIANAAIAABJgAgFglQgCgCAAgDQAAgDACgCQADgCACAAQAEAAACACQACACAAADQAAADgCACQgCACgEAAQgCAAgDgCg");
	this.shape_1547.setTransform(674.15,362.4);

	this.shape_1548 = new cjs.Shape();
	this.shape_1548.graphics.f("#FFFFFF").s().p("AgWArQgIgLAAgRIAAgBQAAgQAIgKQAIgLANAAQAMAAAIAJIAAgmIAMAAIAABoIgLAAIgBgIQgIAJgMAAQgNAAgIgKgAgMgFQgGAHAAAOQAAAMAGAHQAFAHAIAAQAMAAAGgKIAAghQgGgLgMAAQgIAAgFAHg");
	this.shape_1548.setTransform(668.325,362.275);

	this.shape_1549 = new cjs.Shape();
	this.shape_1549.graphics.f("#FFFFFF").s().p("AARA1IAAgyQAAgGgEgEQgEgEgHAAQgFAAgFADQgEAEgDAEIAAA1IgNAAIAAhpIANAAIAAApQAIgLAMAAQAYAAAAAZIAAAyg");
	this.shape_1549.setTransform(656.3,362.2);

	this.shape_1550 = new cjs.Shape();
	this.shape_1550.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIAMAAIAAAvQAAARAOAAQAOAAAEgLIAAg1IANAAIAABJIgMAAIgBgHQgHAJgNAAQgMAAgGgHg");
	this.shape_1550.setTransform(648.6,363.825);

	this.shape_1551 = new cjs.Shape();
	this.shape_1551.graphics.f("#FFFFFF").s().p("AgSArIgBAJIgLAAIAAhoIAMAAIAAAnQAIgKANAAQANAAAIALQAHAKAAAQIAAACQAAARgHAKQgIAKgNAAQgNAAgIgKgAgSAAIAAAfQAGALAMAAQAJAAAFgHQAFgHAAgOQAAgNgFgGQgFgHgJAAQgMAAgGAMg");
	this.shape_1551.setTransform(640.975,362.275);

	this.shape_1552 = new cjs.Shape();
	this.shape_1552.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIANAAIAAAvQAAARANAAQAOAAAEgLIAAg1IANAAIAABJIgMAAIgBgHQgGAJgOAAQgMAAgGgHg");
	this.shape_1552.setTransform(633.05,363.825);

	this.shape_1553 = new cjs.Shape();
	this.shape_1553.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1553.setTransform(626.725,362.925);

	this.shape_1554 = new cjs.Shape();
	this.shape_1554.graphics.f("#FFFFFF").s().p("AAQA1IAAgyQABgGgEgEQgDgEgIAAQgFAAgFADQgEAEgDAEIAAA1IgNAAIAAhpIANAAIAAApQAIgLANAAQAXAAAAAZIAAAyg");
	this.shape_1554.setTransform(616.4,362.2);

	this.shape_1555 = new cjs.Shape();
	this.shape_1555.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIAMAAIAAAvQABARANAAQANAAAGgLIAAg1IAMAAIAABJIgMAAIAAgHQgIAJgNAAQgMAAgGgHg");
	this.shape_1555.setTransform(608.7,363.825);

	this.shape_1556 = new cjs.Shape();
	this.shape_1556.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIAMAAIAAAIQAGgKALAAIAGABIAAAMIgHAAQgLAAgFAKIAAA0g");
	this.shape_1556.setTransform(602.85,363.675);

	this.shape_1557 = new cjs.Shape();
	this.shape_1557.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIANAAIAAAvQAAARANAAQAOAAAEgLIAAg1IANAAIAABJIgMAAIgBgHQgGAJgOAAQgMAAgGgHg");
	this.shape_1557.setTransform(596.25,363.825);

	this.shape_1558 = new cjs.Shape();
	this.shape_1558.graphics.f("#FFFFFF").s().p("AgGA1IAAhpIANAAIAABpg");
	this.shape_1558.setTransform(590.7,362.2);

	this.shape_1559 = new cjs.Shape();
	this.shape_1559.graphics.f("#FFFFFF").s().p("AgVAcQgJgJAAgRIAAgCQAAgLAEgIQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAKAAASIAAAEIgxAAQABAKAGAIQAGAGAIAAQAHAAAFgDQAEgCAEgFIAHAGQgJAOgSAAQgPAAgJgKgAgLgVQgFAFgBAKIAkAAIAAgBQgBgJgEgFQgFgGgIAAQgHAAgFAGg");
	this.shape_1559.setTransform(585.375,363.75);

	this.shape_1560 = new cjs.Shape();
	this.shape_1560.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgDgGQgEgFgBgHIANAAQAAAHAFAEQAFADAHAAQAHAAAEgDQAEgDABgFQAAgFgEgDQgEgCgJgCQgJgCgGgDQgFgDgDgDQgDgEAAgGQAAgJAIgGQAHgGAMAAQAMAAAIAGQAHAHABAKIgNAAQAAgFgFgEQgEgEgGAAQgHAAgDADQgFADAAAFQAAAEAFADIAMAFQAJACAGACQAFADAEAEQADAEAAAFQAAAKgJAHQgHAFgNAAQgIAAgHgDg");
	this.shape_1560.setTransform(578,363.75);

	this.shape_1561 = new cjs.Shape();
	this.shape_1561.graphics.f("#FFFFFF").s().p("AgXAgQgHgGAAgKQABgLAIgFQAJgHAPAAIAMAAIAAgFQAAgIgDgDQgEgEgIAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgGAGgDQAIgCAHAAQAMAAAIAGQAGAHABALIAAAgQAAALACAGIAAABIgNAAIgCgIQgIAKgMgBQgLABgHgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgCQAGgEACgFIAAgPIgKAAQgWAAAAAOg");
	this.shape_1561.setTransform(566.2,363.75);

	this.shape_1562 = new cjs.Shape();
	this.shape_1562.graphics.f("#FFFFFF").s().p("AARAmIAAgwQgBgIgDgEQgEgEgHAAQgGAAgEADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_1562.setTransform(558.5,363.675);

	this.shape_1563 = new cjs.Shape();
	this.shape_1563.graphics.f("#FFFFFF").s().p("AgVAcQgJgJAAgRIAAgCQAAgLAEgIQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAKAAASIAAAEIgxAAQABAKAGAIQAGAGAIAAQAHAAAFgDQAEgCAEgFIAHAGQgJAOgSAAQgPAAgJgKgAgLgVQgFAFgBAKIAkAAIAAgBQgBgJgEgFQgFgGgIAAQgHAAgFAGg");
	this.shape_1563.setTransform(551.025,363.75);

	this.shape_1564 = new cjs.Shape();
	this.shape_1564.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIAMAAIAAAIQAGgKALAAIAGABIAAAMIgHAAQgLAAgFAKIAAA0g");
	this.shape_1564.setTransform(545.25,363.675);

	this.shape_1565 = new cjs.Shape();
	this.shape_1565.graphics.f("#FFFFFF").s().p("AgXAgQgGgGAAgKQAAgLAJgFQAIgHAPAAIANAAIAAgFQAAgIgFgDQgDgEgIAAQgGAAgEADQgGAEAAAEIgMAAQAAgFAEgFQAEgGAGgDQAIgCAGAAQANAAAHAGQAIAHAAALIAAAgQAAALACAGIAAABIgNAAIgBgIQgKAKgLgBQgKABgIgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAGgCQAFgEADgFIAAgPIgKAAQgXAAAAAOg");
	this.shape_1565.setTransform(538.7,363.75);

	this.shape_1566 = new cjs.Shape();
	this.shape_1566.graphics.f("#FFFFFF").s().p("AAQA1IgZgjIgIAJIAAAaIgNAAIAAhpIANAAIAAA/IAHgIIAWgXIAPAAIgcAdIAgAsg");
	this.shape_1566.setTransform(531.825,362.2);

	this.shape_1567 = new cjs.Shape();
	this.shape_1567.graphics.f("#FFFFFF").s().p("AgJAMQAHgIAAgJIAAgMIALAAIAAAKQABAHgEAHQgDAGgFAEg");
	this.shape_1567.setTransform(521.8,367.7);

	this.shape_1568 = new cjs.Shape();
	this.shape_1568.graphics.f("#FFFFFF").s().p("AgWAgQgIgGABgKQgBgLAKgFQAIgHAPAAIAMAAIAAgFQAAgIgDgDQgFgEgHAAQgGAAgEADQgFAEgBAEIgMAAQAAgFAEgFQAEgGAHgDQAHgCAGAAQANAAAIAGQAGAHABALIAAAgQAAALADAGIAAABIgOAAIgCgIQgIAKgLgBQgMABgGgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgCQAGgEACgFIAAgPIgJAAQgXAAAAAOg");
	this.shape_1568.setTransform(516.85,363.75);

	this.shape_1569 = new cjs.Shape();
	this.shape_1569.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1569.setTransform(510.575,362.925);

	this.shape_1570 = new cjs.Shape();
	this.shape_1570.graphics.f("#FFFFFF").s().p("AgWAgQgIgGABgKQgBgLAKgFQAIgHAPAAIANAAIAAgFQgBgIgDgDQgFgEgHAAQgGAAgFADQgEAEgBAEIgMAAQAAgFAEgFQAEgGAHgDQAHgCAGAAQANAAAIAGQAGAHABALIAAAgQAAALADAGIAAABIgOAAIgBgIQgKAKgKgBQgMABgGgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgCQAGgEADgFIAAgPIgKAAQgXAAAAAOg");
	this.shape_1570.setTransform(504.7,363.75);

	this.shape_1571 = new cjs.Shape();
	this.shape_1571.graphics.f("#FFFFFF").s().p("AgVA0IgGgBIAAgLIAEABQAHAAADgDQAEgDACgGIADgIIgahIIANAAIASA2IARg2IAOAAIgeBVQgGASgPAAg");
	this.shape_1571.setTransform(497.6,365.25);

	this.shape_1572 = new cjs.Shape();
	this.shape_1572.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQABgIgEgEQgDgEgIAAQgFAAgFADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_1572.setTransform(490.4,363.675);

	this.shape_1573 = new cjs.Shape();
	this.shape_1573.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_1573.setTransform(888.825,338.325);

	this.shape_1574 = new cjs.Shape();
	this.shape_1574.graphics.f("#FFFFFF").s().p("AARAmIAAgwQgBgIgDgEQgEgEgHAAQgGAAgEADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_1574.setTransform(881.15,336.875);

	this.shape_1575 = new cjs.Shape();
	this.shape_1575.graphics.f("#FFFFFF").s().p("AgXAgQgGgGAAgKQAAgLAJgGQAIgGAPAAIANAAIAAgFQAAgIgFgDQgDgEgIAAQgGAAgEAEQgGACAAAGIgMAAQAAgGAEgFQAEgGAGgDQAHgDAHAAQANABAHAGQAIAHAAALIAAAhQAAAKACAGIAAABIgNAAIgBgIQgKAKgLAAQgKAAgIgHgAgRAOQAAAGAEAEQAEADAGAAQAFAAAGgDQAFgDADgFIAAgPIgKAAQgXAAAAANg");
	this.shape_1575.setTransform(873.5,336.95);

	this.shape_1576 = new cjs.Shape();
	this.shape_1576.graphics.f("#FFFFFF").s().p("AgVA0IgGgBIAAgKIAEAAQAGAAAEgDQAEgCACgIIADgHIgahIIANAAIASA2IARg2IAOAAIgeBVQgGASgPAAg");
	this.shape_1576.setTransform(866.4,338.45);

	this.shape_1577 = new cjs.Shape();
	this.shape_1577.graphics.f("#FFFFFF").s().p("AAQA0IAAgwQABgHgEgFQgDgDgIAAQgGAAgEADQgEADgDAFIAAA0IgNAAIAAhoIANAAIAAApQAIgLAMAAQAYAAAAAaIAAAwg");
	this.shape_1577.setTransform(854.1,335.4);

	this.shape_1578 = new cjs.Shape();
	this.shape_1578.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIAMAAIAAAvQAAARAOAAQANAAAGgLIAAg1IAMAAIAABJIgMAAIAAgHQgIAJgNAAQgMAAgGgHg");
	this.shape_1578.setTransform(846.4,337.025);

	this.shape_1579 = new cjs.Shape();
	this.shape_1579.graphics.f("#FFFFFF").s().p("AgSArIgBAJIgLAAIAAhoIAMAAIAAAnQAIgKANAAQANAAAIALQAHAKAAAQIAAACQAAARgHAKQgIAKgNAAQgNAAgIgKgAgSAAIAAAfQAGALAMAAQAJAAAFgHQAFgHAAgOQAAgNgFgGQgFgHgJAAQgMAAgGAMg");
	this.shape_1579.setTransform(838.775,335.475);

	this.shape_1580 = new cjs.Shape();
	this.shape_1580.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIAMAAIAAAvQAAARAOAAQAOAAAEgLIAAg1IANAAIAABJIgMAAIgBgHQgHAJgNAAQgMAAgGgHg");
	this.shape_1580.setTransform(830.85,337.025);

	this.shape_1581 = new cjs.Shape();
	this.shape_1581.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1581.setTransform(824.525,336.125);

	this.shape_1582 = new cjs.Shape();
	this.shape_1582.graphics.f("#FFFFFF").s().p("AgWAgQgIgGABgKQgBgLAJgGQAJgGAPAAIAMAAIAAgFQAAgIgDgDQgFgEgHAAQgGAAgFAEQgEACAAAGIgNAAQAAgGAEgFQAEgGAHgDQAGgDAHAAQANABAIAGQAGAHABALIAAAhQAAAKADAGIAAABIgOAAIgCgIQgJAKgKAAQgMAAgGgHgAgRAOQAAAGAEAEQAEADAGAAQAFAAAFgDQAGgDACgFIAAgPIgKAAQgWAAAAANg");
	this.shape_1582.setTransform(813.5,336.95);

	this.shape_1583 = new cjs.Shape();
	this.shape_1583.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_1583.setTransform(805.625,338.325);

	this.shape_1584 = new cjs.Shape();
	this.shape_1584.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_1584.setTransform(797.775,338.325);

	this.shape_1585 = new cjs.Shape();
	this.shape_1585.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQABgIgEgEQgDgEgIAAQgFAAgFADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_1585.setTransform(790.1,336.875);

	this.shape_1586 = new cjs.Shape();
	this.shape_1586.graphics.f("#FFFFFF").s().p("AgXAcQgKgLAAgRIAAAAQAAgLAFgIQAEgJAIgEQAHgGAJAAQAPAAAKALQAJALAAAQIAAABQAAALgEAJQgEAIgIAEQgIAFgKABQgOAAgJgLgAgOgUQgGAIAAANQAAAMAGAIQAGAHAIAAQAKAAAFgHQAGgIAAgNQAAgMgGgIQgFgHgKAAQgIAAgGAHg");
	this.shape_1586.setTransform(782.225,336.95);

	this.shape_1587 = new cjs.Shape();
	this.shape_1587.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgGAAQgMAAgEAKIAAA0g");
	this.shape_1587.setTransform(776.25,336.875);

	this.shape_1588 = new cjs.Shape();
	this.shape_1588.graphics.f("#FFFFFF").s().p("AgGAyIAAhIIANAAIAABIgAgFglQgCgCAAgDQAAgDACgDQACgBADAAQAEAAABABQADADAAADQAAADgDACQgBACgEAAQgDAAgCgCg");
	this.shape_1588.setTransform(766.65,335.6);

	this.shape_1589 = new cjs.Shape();
	this.shape_1589.graphics.f("#FFFFFF").s().p("AAQA0IgZgiIgIAIIAAAaIgNAAIAAhoIANAAIAAA/IAHgIIAWgXIAPAAIgcAdIAgArg");
	this.shape_1589.setTransform(761.875,335.4);

	this.shape_1590 = new cjs.Shape();
	this.shape_1590.graphics.f("#FFFFFF").s().p("AgGAyIAAhIIANAAIAABIgAgEglQgDgCAAgDQAAgDADgDQABgBADAAQAEAAACABQABADAAADQAAADgBACQgCACgEAAQgDAAgBgCg");
	this.shape_1590.setTransform(756.15,335.6);

	this.shape_1591 = new cjs.Shape();
	this.shape_1591.graphics.f("#FFFFFF").s().p("AgFA0IAAhoIALAAIAABog");
	this.shape_1591.setTransform(752.75,335.4);

	this.shape_1592 = new cjs.Shape();
	this.shape_1592.graphics.f("#FFFFFF").s().p("AgFAyIAAhIIALAAIAABIgAgFglQgBgCAAgDQAAgDABgDQACgBADAAQAEAAABABQACADAAADQAAADgCACQgBACgEAAQgDAAgCgCg");
	this.shape_1592.setTransform(749.35,335.6);

	this.shape_1593 = new cjs.Shape();
	this.shape_1593.graphics.f("#FFFFFF").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_1593.setTransform(741.525,336.875);

	this.shape_1594 = new cjs.Shape();
	this.shape_1594.graphics.f("#FFFFFF").s().p("AgVAdQgJgLAAgQIAAgCQAAgLAEgIQAEgJAIgEQAHgGAIAAQAOAAAIAKQAIAJAAASIAAAFIgxAAQABAKAGAIQAGAGAIAAQAHAAAFgDQAEgDAEgEIAHAGQgJAPgSAAQgPgBgJgJgAgLgVQgFAFgBALIAkAAIAAgBQgBgLgEgEQgFgGgIAAQgHAAgFAGg");
	this.shape_1594.setTransform(731.775,336.95);

	this.shape_1595 = new cjs.Shape();
	this.shape_1595.graphics.f("#FFFFFF").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_1595.setTransform(721.875,336.875);

	this.shape_1596 = new cjs.Shape();
	this.shape_1596.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_1596.setTransform(706.525,338.325);

	this.shape_1597 = new cjs.Shape();
	this.shape_1597.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQABgIgEgEQgDgEgIAAQgGAAgEADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_1597.setTransform(698.85,336.875);

	this.shape_1598 = new cjs.Shape();
	this.shape_1598.graphics.f("#FFFFFF").s().p("AgWAgQgIgGAAgKQAAgLAJgGQAJgGAPAAIAMAAIAAgFQAAgIgDgDQgFgEgHAAQgGAAgFAEQgEACAAAGIgNAAQAAgGAEgFQAEgGAHgDQAGgDAIAAQAMABAIAGQAGAHABALIAAAhQAAAKADAGIAAABIgOAAIgCgIQgIAKgLAAQgMAAgGgHgAgRAOQAAAGAEAEQAEADAGAAQAFAAAFgDQAGgDACgFIAAgPIgKAAQgWAAAAANg");
	this.shape_1598.setTransform(691.2,336.95);

	this.shape_1599 = new cjs.Shape();
	this.shape_1599.graphics.f("#FFFFFF").s().p("AgWA0IgEgBIAAgKIADAAQAGAAAEgDQAEgCACgIIADgHIgbhIIAPAAIARA2IARg2IANAAIgdBVQgGASgPAAg");
	this.shape_1599.setTransform(684.1,338.45);

	this.shape_1600 = new cjs.Shape();
	this.shape_1600.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQABgIgEgEQgDgEgIAAQgFAAgFADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_1600.setTransform(671.75,336.875);

	this.shape_1601 = new cjs.Shape();
	this.shape_1601.graphics.f("#FFFFFF").s().p("AgWAgQgIgGAAgKQAAgLAKgGQAIgGAPAAIAMAAIAAgFQAAgIgDgDQgFgEgHAAQgGAAgFAEQgEACAAAGIgNAAQAAgGAEgFQAEgGAHgDQAGgDAHAAQANABAIAGQAGAHABALIAAAhQAAAKADAGIAAABIgOAAIgCgIQgJAKgKAAQgMAAgGgHgAgRAOQAAAGAEAEQAEADAGAAQAFAAAFgDQAGgDACgFIAAgPIgKAAQgWAAAAANg");
	this.shape_1601.setTransform(664.1,336.95);

	this.shape_1602 = new cjs.Shape();
	this.shape_1602.graphics.f("#FFFFFF").s().p("AASAlIgSg3IgRA3IgKAAIgWhJIANAAIAOA2IASg2IAJAAIARA4IAPg4IAMAAIgVBJg");
	this.shape_1602.setTransform(655.05,336.95);

	this.shape_1603 = new cjs.Shape();
	this.shape_1603.graphics.f("#FFFFFF").s().p("AgVAdQgJgLAAgQIAAgCQAAgLAEgIQAEgJAIgEQAHgGAIAAQAOAAAIAKQAIAJAAASIAAAFIgxAAQABAKAGAIQAGAGAIAAQAHAAAFgDQAEgDAEgEIAHAGQgJAPgSAAQgPgBgJgJgAgLgVQgFAFgBALIAkAAIAAgBQgBgLgEgEQgFgGgIAAQgHAAgFAGg");
	this.shape_1603.setTransform(646.175,336.95);

	this.shape_1604 = new cjs.Shape();
	this.shape_1604.graphics.f("#FFFFFF").s().p("AAQA0IAAgwQABgHgEgFQgDgDgIAAQgFAAgFADQgEADgDAFIAAA0IgNAAIAAhoIANAAIAAApQAIgLAMAAQAYAAAAAaIAAAwg");
	this.shape_1604.setTransform(638.55,335.4);

	this.shape_1605 = new cjs.Shape();
	this.shape_1605.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIANAAIAAAvQAAARANAAQANAAAGgLIAAg1IAMAAIAABJIgMAAIAAgHQgIAJgNAAQgMAAgGgHg");
	this.shape_1605.setTransform(625.7,337.025);

	this.shape_1606 = new cjs.Shape();
	this.shape_1606.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1606.setTransform(619.375,336.125);

	this.shape_1607 = new cjs.Shape();
	this.shape_1607.graphics.f("#FFFFFF").s().p("AgFAyIAAhIIALAAIAABIgAgEglQgCgCAAgDQAAgDACgDQACgBACAAQAEAAABABQACADAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_1607.setTransform(615.6,335.6);

	this.shape_1608 = new cjs.Shape();
	this.shape_1608.graphics.f("#FFFFFF").s().p("AgWAgQgIgGAAgKQAAgLAKgGQAIgGAPAAIAMAAIAAgFQAAgIgDgDQgFgEgHAAQgGAAgFAEQgEACAAAGIgNAAQAAgGAEgFQAEgGAHgDQAGgDAHAAQANABAIAGQAGAHABALIAAAhQAAAKADAGIAAABIgOAAIgCgIQgJAKgKAAQgMAAgGgHgAgRAOQAAAGAEAEQAEADAGAAQAFAAAFgDQAGgDACgFIAAgPIgKAAQgWAAAAANg");
	this.shape_1608.setTransform(610.1,336.95);

	this.shape_1609 = new cjs.Shape();
	this.shape_1609.graphics.f("#FFFFFF").s().p("AgWA0IgFgBIAAgKIAEAAQAHAAADgDQAEgCACgIIADgHIgbhIIAPAAIARA2IARg2IANAAIgdBVQgGASgPAAg");
	this.shape_1609.setTransform(603,338.45);

	this.shape_1610 = new cjs.Shape();
	this.shape_1610.graphics.f("#FFFFFF").s().p("AgFAyIAAhIIALAAIAABIgAgFglQgBgCAAgDQAAgDABgDQACgBADAAQAEAAABABQACADABADQgBADgCACQgBACgEAAQgDAAgCgCg");
	this.shape_1610.setTransform(592.85,335.6);

	this.shape_1611 = new cjs.Shape();
	this.shape_1611.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQABgIgEgEQgDgEgIAAQgGAAgEADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_1611.setTransform(587.25,336.875);

	this.shape_1612 = new cjs.Shape();
	this.shape_1612.graphics.f("#FFFFFF").s().p("AgGAyIAAhIIANAAIAABIgAgFglQgBgCAAgDQAAgDABgDQACgBADAAQAEAAABABQADADAAADQAAADgDACQgBACgEAAQgDAAgCgCg");
	this.shape_1612.setTransform(581.7,335.6);

	this.shape_1613 = new cjs.Shape();
	this.shape_1613.graphics.f("#FFFFFF").s().p("AARA0IAAgwQgBgHgDgFQgEgDgHAAQgFAAgFADQgFADgDAFIAAA0IgMAAIAAhoIAMAAIAAApQAJgLANAAQAXAAAAAaIAAAwg");
	this.shape_1613.setTransform(571,335.4);

	this.shape_1614 = new cjs.Shape();
	this.shape_1614.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIANAAIAAAvQAAARANAAQAOAAAEgLIAAg1IANAAIAABJIgMAAIgBgHQgGAJgOAAQgMAAgGgHg");
	this.shape_1614.setTransform(563.3,337.025);

	this.shape_1615 = new cjs.Shape();
	this.shape_1615.graphics.f("#FFFFFF").s().p("AgSArIgBAJIgLAAIAAhoIAMAAIAAAnQAIgKANAAQANAAAIALQAHAKAAAQIAAACQAAARgHAKQgIAKgNAAQgNAAgIgKgAgSAAIAAAfQAGALAMAAQAJAAAFgHQAFgHAAgOQAAgNgFgGQgFgHgJAAQgMAAgGAMg");
	this.shape_1615.setTransform(555.675,335.475);

	this.shape_1616 = new cjs.Shape();
	this.shape_1616.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIANAAIAAAvQAAARANAAQAOAAAEgLIAAg1IANAAIAABJIgMAAIgBgHQgGAJgOAAQgMAAgGgHg");
	this.shape_1616.setTransform(547.75,337.025);

	this.shape_1617 = new cjs.Shape();
	this.shape_1617.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1617.setTransform(541.425,336.125);

	this.shape_1618 = new cjs.Shape();
	this.shape_1618.graphics.f("#FFFFFF").s().p("AgXAgQgGgGgBgKQABgLAIgGQAJgGAPAAIANAAIAAgFQgBgIgEgDQgEgEgHAAQgGAAgEAEQgGACAAAGIgMAAQAAgGAEgFQAEgGAGgDQAHgDAIAAQAMABAHAGQAIAHAAALIAAAhQAAAKACAGIAAABIgNAAIgBgIQgKAKgLAAQgLAAgHgHgAgRAOQAAAGAEAEQAEADAGAAQAFAAAGgDQAFgDADgFIAAgPIgLAAQgWAAAAANg");
	this.shape_1618.setTransform(530.4,336.95);

	this.shape_1619 = new cjs.Shape();
	this.shape_1619.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_1619.setTransform(522.525,338.325);

	this.shape_1620 = new cjs.Shape();
	this.shape_1620.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_1620.setTransform(514.675,338.325);

	this.shape_1621 = new cjs.Shape();
	this.shape_1621.graphics.f("#FFFFFF").s().p("AARAmIAAgwQAAgIgEgEQgEgEgHAAQgFAAgFADQgFAEgCAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_1621.setTransform(507,336.875);

	this.shape_1622 = new cjs.Shape();
	this.shape_1622.graphics.f("#FFFFFF").s().p("AgXAcQgKgLAAgRIAAAAQAAgLAFgIQAEgJAIgEQAHgGAJAAQAPAAAKALQAJALAAAQIAAABQAAALgEAJQgEAIgIAEQgIAFgKABQgOAAgJgLgAgOgUQgGAIAAANQAAAMAGAIQAGAHAIAAQAKAAAFgHQAGgIAAgNQAAgMgGgIQgFgHgKAAQgIAAgGAHg");
	this.shape_1622.setTransform(499.125,336.95);

	this.shape_1623 = new cjs.Shape();
	this.shape_1623.graphics.f("#FFFFFF").s().p("AAWAyIgWgpIgWAAIAAApIgNAAIAAhjIAhAAQAQAAAJAIQAJAIAAAOQAAAJgFAHQgFAGgJAEIAXAqIAAABgAgWAAIAUAAQAJAAAGgFQAGgFgBgJQABgJgGgFQgFgFgKAAIgUAAg");
	this.shape_1623.setTransform(491.3,335.675);

	this.shape_1624 = new cjs.Shape();
	this.shape_1624.graphics.f("#FFFFFF").s().p("AgXAgQgHgGAAgKQABgLAIgGQAJgGAPAAIAMAAIAAgGQAAgGgDgEQgEgEgIAAQgGAAgFAEQgEACAAAGIgNAAQAAgGAEgFQAEgFAGgDQAIgEAHAAQAMAAAIAHQAGAGABALIAAAiQAAAKACAGIAAABIgNAAIgCgIQgIAKgMAAQgLgBgHgGgAgRAOQAAAHAEADQAEAEAGAAQAFAAAFgEQAGgDACgFIAAgPIgKAAQgWAAAAANg");
	this.shape_1624.setTransform(647.2,310.15);

	this.shape_1625 = new cjs.Shape();
	this.shape_1625.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1625.setTransform(640.925,309.325);

	this.shape_1626 = new cjs.Shape();
	this.shape_1626.graphics.f("#FFFFFF").s().p("AgWAgQgIgGAAgKQABgLAIgGQAJgGAPAAIAMAAIAAgGQAAgGgDgEQgEgEgIAAQgGAAgFAEQgEACAAAGIgNAAQAAgGAEgFQAEgFAGgDQAHgEAIAAQAMAAAIAHQAGAGABALIAAAiQAAAKACAGIAAABIgNAAIgCgIQgIAKgLAAQgLgBgHgGgAgRAOQAAAHAEADQAEAEAGAAQAFAAAFgEQAGgDACgFIAAgPIgKAAQgWAAAAANg");
	this.shape_1626.setTransform(635.05,310.15);

	this.shape_1627 = new cjs.Shape();
	this.shape_1627.graphics.f("#FFFFFF").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_1627.setTransform(625.125,310.075);

	this.shape_1628 = new cjs.Shape();
	this.shape_1628.graphics.f("#FFFFFF").s().p("AgXAcQgKgLAAgRIAAAAQAAgKAFgJQAEgJAIgEQAHgFAJgBQAPAAAKALQAJALAAAQIAAABQAAAKgEAKQgEAIgIAEQgIAGgKAAQgOAAgJgLgAgOgUQgGAIAAANQAAAMAGAIQAGAHAIAAQAKAAAFgHQAGgIAAgNQAAgMgGgIQgFgHgKAAQgIAAgGAHg");
	this.shape_1628.setTransform(614.975,310.15);

	this.shape_1629 = new cjs.Shape();
	this.shape_1629.graphics.f("#FFFFFF").s().p("AgFA0IAAhnIALAAIAABng");
	this.shape_1629.setTransform(609.3,308.6);

	this.shape_1630 = new cjs.Shape();
	this.shape_1630.graphics.f("#FFFFFF").s().p("AgVAdQgJgKAAgRIAAgCQAAgKAEgJQAEgJAIgEQAHgFAIgBQAOAAAIAKQAIAKAAARIAAAFIgxAAQABAKAGAHQAGAHAIAAQAHAAAFgDQAEgDAEgEIAHAGQgJAPgSAAQgPgBgJgJgAgLgWQgFAGgBALIAkAAIAAgBQgBgLgEgFQgFgFgIAAQgHAAgFAFg");
	this.shape_1630.setTransform(603.975,310.15);

	this.shape_1631 = new cjs.Shape();
	this.shape_1631.graphics.f("#FFFFFF").s().p("AgXAcQgKgLAAgRIAAAAQAAgKAFgJQAEgJAIgEQAHgFAJgBQAPAAAKALQAJALAAAQIAAABQAAAKgEAKQgEAIgIAEQgIAGgKAAQgOAAgJgLgAgOgUQgGAIAAANQAAAMAGAIQAGAHAIAAQAKAAAFgHQAGgIAAgNQAAgMgGgIQgFgHgKAAQgIAAgGAHg");
	this.shape_1631.setTransform(596.175,310.15);

	this.shape_1632 = new cjs.Shape();
	this.shape_1632.graphics.f("#FFFFFF").s().p("AgbAmQgLgMABgVIAAgJQAAgOAEgKQAGgLAJgFQAJgGAKAAQAQAAAKAJQAJAJACAPIgNAAQgCgMgFgFQgGgFgLAAQgLAAgHAJQgHAJAAARIAAAJQAAAQAGAKQAIAJAKAAQAMAAAGgFQAFgFACgMIANAAQgBAQgLAJQgJAIgRAAQgQAAgLgNg");
	this.shape_1632.setTransform(587.75,308.875);

	this.shape_1633 = new cjs.Shape();
	this.shape_1633.graphics.f("#FFFFFF").s().p("AAQA0IgZgiIgIAIIAAAaIgNAAIAAhnIANAAIAAA+IAHgIIAWgYIAPAAIgcAeIAgArg");
	this.shape_1633.setTransform(576.575,308.6);

	this.shape_1634 = new cjs.Shape();
	this.shape_1634.graphics.f("#FFFFFF").s().p("AgFAyIAAhJIALAAIAABJgAgEglQgCgCgBgDQABgDACgDQABgCADAAQAEAAACACQABADAAADQAAADgBACQgCACgEAAQgDAAgBgCg");
	this.shape_1634.setTransform(570.85,308.8);

	this.shape_1635 = new cjs.Shape();
	this.shape_1635.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1635.setTransform(566.675,309.325);

	this.shape_1636 = new cjs.Shape();
	this.shape_1636.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgDgFQgEgGAAgHIAMAAQAAAGAGAEQAEAEAHAAQAHAAAEgDQAEgDABgEQAAgGgEgCQgEgEgJgCQgKgBgFgDQgGgCgCgEQgDgEAAgFQAAgKAIgGQAHgHAMAAQAMAAAIAHQAHAHAAAKIgMAAQAAgFgFgEQgEgEgGAAQgHAAgDADQgFADAAAFQAAAFAFACIALAFQAKABAGADQAGADADADQACAFAAAFQABALgJAFQgHAHgNAAQgIgBgHgDg");
	this.shape_1636.setTransform(561,310.15);

	this.shape_1637 = new cjs.Shape();
	this.shape_1637.graphics.f("#FFFFFF").s().p("AgWAgQgIgGAAgKQABgLAIgGQAJgGAPAAIAMAAIAAgGQAAgGgDgEQgEgEgIAAQgGAAgFAEQgEACAAAGIgNAAQAAgGAEgFQAEgFAGgDQAIgEAHAAQAMAAAIAHQAGAGABALIAAAiQAAAKACAGIAAABIgNAAIgCgIQgIAKgMAAQgKgBgHgGgAgRAOQAAAHAEADQAEAEAGAAQAFAAAFgEQAGgDACgFIAAgPIgKAAQgWAAAAANg");
	this.shape_1637.setTransform(553.6,310.15);

	this.shape_1638 = new cjs.Shape();
	this.shape_1638.graphics.f("#FFFFFF").s().p("AgFA0IAAhnIALAAIAABng");
	this.shape_1638.setTransform(548.1,308.6);

	this.shape_1639 = new cjs.Shape();
	this.shape_1639.graphics.f("#FFFFFF").s().p("AgSArIgBAJIgLAAIAAhoIAMAAIAAAnQAIgKANAAQANAAAIALQAHAKAAAQIAAACQAAARgHAKQgIAKgNAAQgNAAgIgKgAgSAAIAAAfQAGALAMAAQAJAAAFgHQAFgHAAgOQAAgNgFgGQgFgHgJAAQgMAAgGAMg");
	this.shape_1639.setTransform(542.625,308.675);

	this.shape_1640 = new cjs.Shape();
	this.shape_1640.graphics.f("#FFFFFF").s().p("AgXAcQgKgLAAgRIAAAAQAAgKAFgJQAEgJAIgEQAHgFAJgBQAPAAAKALQAJALAAAQIAAABQAAAKgEAKQgEAIgIAEQgIAGgKAAQgOAAgJgLgAgOgUQgGAIAAANQAAAMAGAIQAGAHAIAAQAKAAAFgHQAGgIAAgNQAAgMgGgIQgFgHgKAAQgIAAgGAHg");
	this.shape_1640.setTransform(534.525,310.15);

	this.shape_1641 = new cjs.Shape();
	this.shape_1641.graphics.f("#FFFFFF").s().p("AgFA0IAAhnIALAAIAABng");
	this.shape_1641.setTransform(528.85,308.6);

	this.shape_1642 = new cjs.Shape();
	this.shape_1642.graphics.f("#FFFFFF").s().p("AgeA0IAAhmIALAAIABAJQAIgKAMAAQAOAAAIAKQAHAKAAASIAAABQAAAQgHAKQgIALgNAAQgNAAgIgJIAAAkgAgSgeIAAAiQAGALAMgBQAIABAFgIQAGgHAAgNQAAgMgGgIQgFgHgIAAQgMAAgGAKg");
	this.shape_1642.setTransform(523.375,311.5);

	this.shape_1643 = new cjs.Shape();
	this.shape_1643.graphics.f("#FFFFFF").s().p("AgFAyIAAhJIALAAIAABJgAgFglQgBgCAAgDQAAgDABgDQACgCADAAQAEAAABACQACADAAADQAAADgCACQgBACgEAAQgDAAgCgCg");
	this.shape_1643.setTransform(517.6,308.8);

	this.shape_1644 = new cjs.Shape();
	this.shape_1644.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgGAAQgMAAgEAKIAAA0g");
	this.shape_1644.setTransform(513.9,310.075);

	this.shape_1645 = new cjs.Shape();
	this.shape_1645.graphics.f("#FFFFFF").s().p("AgGAyIAAhYIgfAAIAAgLIBLAAIAAALIgfAAIAABYg");
	this.shape_1645.setTransform(507,308.875);

	this.shape_1646 = new cjs.Shape();
	this.shape_1646.graphics.f("#FFFFFF").s().p("AgFAFQgCgCAAgDQAAgCACgCQACgDADAAQAEAAACADQACACAAACQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_1646.setTransform(497.425,313.175);

	this.shape_1647 = new cjs.Shape();
	this.shape_1647.graphics.f("#FFFFFF").s().p("AgbAmQgLgMABgVIAAgJQgBgOAGgKQAEgLAJgFQAKgGAKAAQARAAAJAJQAJAJADAPIgOAAQgCgMgGgFQgFgFgLAAQgLAAgHAJQgHAJAAARIAAAJQAAAQAGAKQAHAJALAAQAMAAAFgFQAGgFACgMIAOAAQgDAQgKAJQgJAIgRAAQgQAAgLgNg");
	this.shape_1647.setTransform(491.2,308.875);

	this.shape_1648 = new cjs.Shape();
	this.shape_1648.graphics.f("#FFFFFF").s().p("AgFAFQgCgCAAgDQAAgCACgCQACgDADAAQAEAAACADQACACAAACQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_1648.setTransform(679.875,271.575);

	this.shape_1649 = new cjs.Shape();
	this.shape_1649.graphics.f("#FFFFFF").s().p("AgXAgQgGgGgBgKQABgLAIgGQAJgGAPAAIAMAAIAAgFQAAgIgDgDQgFgEgHAAQgGAAgFAEQgEACAAAGIgNAAQAAgGAEgFQAEgGAGgDQAIgDAHAAQAMABAHAGQAHAHABALIAAAhQAAAKACAGIAAABIgNAAIgCgIQgIAKgMAAQgKAAgIgHgAgRAPQAAAFAEAEQAEADAGAAQAFAAAGgDQAFgDACgFIAAgPIgKAAQgWAAAAAOg");
	this.shape_1649.setTransform(674.3,268.55);

	this.shape_1650 = new cjs.Shape();
	this.shape_1650.graphics.f("#FFFFFF").s().p("AgWArQgIgLAAgRIAAgBQAAgQAIgKQAIgLANAAQAMAAAIAJIAAgmIAMAAIAABoIgLAAIgBgIQgIAJgMAAQgNAAgIgKgAgMgFQgGAHAAAOQAAAMAGAHQAFAHAIAAQAMAAAGgKIAAghQgGgLgMAAQgIAAgFAHg");
	this.shape_1650.setTransform(666.375,267.075);

	this.shape_1651 = new cjs.Shape();
	this.shape_1651.graphics.f("#FFFFFF").s().p("AgXAcQgKgLAAgRIAAAAQAAgKAFgJQAEgJAIgEQAHgGAJAAQAPAAAKALQAJALAAAQIAAABQAAALgEAJQgEAIgIAEQgIAFgKABQgOAAgJgLgAgOgUQgGAIAAANQAAAMAGAIQAGAHAIAAQAKAAAFgHQAGgIAAgNQAAgMgGgIQgFgHgKAAQgIAAgGAHg");
	this.shape_1651.setTransform(658.575,268.55);

	this.shape_1652 = new cjs.Shape();
	this.shape_1652.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1652.setTransform(652.125,267.725);

	this.shape_1653 = new cjs.Shape();
	this.shape_1653.graphics.f("#FFFFFF").s().p("AgXAgQgGgGAAgKQAAgLAJgGQAIgGAPAAIANAAIAAgFQAAgIgFgDQgDgEgIAAQgGAAgEAEQgGACAAAGIgMAAQAAgGAEgFQAEgGAGgDQAHgDAHAAQANABAHAGQAIAHAAALIAAAhQAAAKACAGIAAABIgNAAIgBgIQgKAKgLAAQgKAAgIgHgAgRAPQAAAFAEAEQAEADAGAAQAFAAAGgDQAFgDADgFIAAgPIgKAAQgXAAAAAOg");
	this.shape_1653.setTransform(646.25,268.55);

	this.shape_1654 = new cjs.Shape();
	this.shape_1654.graphics.f("#FFFFFF").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_1654.setTransform(636.325,268.475);

	this.shape_1655 = new cjs.Shape();
	this.shape_1655.graphics.f("#FFFFFF").s().p("AgVAdQgJgLAAgQIAAgCQAAgKAEgJQAEgJAIgEQAHgGAIAAQAOAAAIAKQAIAJAAASIAAAFIgxAAQABALAGAHQAGAGAIAAQAHAAAFgDQAEgDAEgEIAHAGQgJAPgSAAQgPgBgJgJgAgLgVQgFAFgBALIAkAAIAAgBQgBgLgEgEQgFgGgIAAQgHAAgFAGg");
	this.shape_1655.setTransform(626.575,268.55);

	this.shape_1656 = new cjs.Shape();
	this.shape_1656.graphics.f("#FFFFFF").s().p("AAZAyIgxhMIAABMIgNAAIAAhjIANAAIAxBMIAAhMIANAAIAABjg");
	this.shape_1656.setTransform(617.775,267.275);

	this.shape_1657 = new cjs.Shape();
	this.shape_1657.graphics.f("#FFFFFF").s().p("AgFAjQgCgCAAgDQAAgDACgCQACgDADAAQAEAAACADQACACAAADQAAADgCACQgCADgEAAQgDAAgCgDgAgFgYQgCgCAAgDQAAgEACgCQACgCADAAQAEAAACACQACACAAAEQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_1657.setTransform(607.65,268.575);

	this.shape_1658 = new cjs.Shape();
	this.shape_1658.graphics.f("#FFFFFF").s().p("AAQA1IAAgxQABgIgEgEQgDgDgIAAQgGAAgEADQgEADgDAFIAAA1IgNAAIAAhpIANAAIAAApQAIgLAMAAQAYAAAAAaIAAAxg");
	this.shape_1658.setTransform(602.1,267);

	this.shape_1659 = new cjs.Shape();
	this.shape_1659.graphics.f("#FFFFFF").s().p("AgXAcQgKgLAAgRIAAAAQAAgKAFgJQAEgJAIgEQAHgGAJAAQAPAAAKALQAJALAAAQIAAABQAAALgEAJQgEAIgIAEQgIAFgKABQgOAAgJgLgAgOgUQgGAIAAANQAAAMAGAIQAGAHAIAAQAKAAAFgHQAGgIAAgNQAAgMgGgIQgFgHgKAAQgIAAgGAHg");
	this.shape_1659.setTransform(594.225,268.55);

	this.shape_1660 = new cjs.Shape();
	this.shape_1660.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1660.setTransform(587.775,267.725);

	this.shape_1661 = new cjs.Shape();
	this.shape_1661.graphics.f("#FFFFFF").s().p("AARAmIAAgwQgBgIgDgEQgEgEgHAAQgFAAgFADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_1661.setTransform(581.8,268.475);

	this.shape_1662 = new cjs.Shape();
	this.shape_1662.graphics.f("#FFFFFF").s().p("AgXAcQgKgLAAgRIAAAAQAAgKAFgJQAEgJAIgEQAHgGAJAAQAPAAAKALQAJALAAAQIAAABQAAALgEAJQgEAIgIAEQgIAFgKABQgOAAgJgLgAgOgUQgGAIAAANQAAAMAGAIQAGAHAIAAQAKAAAFgHQAGgIAAgNQAAgMgGgIQgFgHgKAAQgIAAgGAHg");
	this.shape_1662.setTransform(573.925,268.55);

	this.shape_1663 = new cjs.Shape();
	this.shape_1663.graphics.f("#FFFFFF").s().p("AgaAmQgLgMAAgVIAAgJQAAgOAEgKQAFgLAKgFQAIgGALAAQARAAAJAJQAKAJABAPIgNAAQgCgMgFgFQgGgFgLAAQgLAAgHAJQgHAJAAARIAAAJQAAAQAHAKQAGAJAMAAQAKAAAHgFQAFgFACgMIANAAQgCAQgJAJQgKAIgQAAQgRAAgKgNg");
	this.shape_1663.setTransform(565.5,267.275);

	this.shape_1664 = new cjs.Shape();
	this.shape_1664.graphics.f("#FFFFFF").s().p("AgFAFQgCgCAAgDQAAgCACgCQACgDADAAQAEAAACADQACACAAACQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_1664.setTransform(555.475,271.575);

	this.shape_1665 = new cjs.Shape();
	this.shape_1665.graphics.f("#FFFFFF").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_1665.setTransform(547.575,268.475);

	this.shape_1666 = new cjs.Shape();
	this.shape_1666.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgGAAQgMAAgEAKIAAA0g");
	this.shape_1666.setTransform(539.45,268.475);

	this.shape_1667 = new cjs.Shape();
	this.shape_1667.graphics.f("#FFFFFF").s().p("AgVAdQgJgLAAgQIAAgCQAAgKAEgJQAEgJAIgEQAHgGAIAAQAOAAAIAKQAIAJAAASIAAAFIgxAAQABALAGAHQAGAGAIAAQAHAAAFgDQAEgDAEgEIAHAGQgJAPgSAAQgPgBgJgJgAgLgVQgFAFgBALIAkAAIAAgBQgBgLgEgEQgFgGgIAAQgHAAgFAGg");
	this.shape_1667.setTransform(533.075,268.55);

	this.shape_1668 = new cjs.Shape();
	this.shape_1668.graphics.f("#FFFFFF").s().p("AgWArQgIgLAAgRIAAgBQAAgQAIgKQAIgLANAAQAMAAAIAJIAAgmIAMAAIAABoIgLAAIgBgIQgIAJgMAAQgNAAgIgKgAgMgFQgGAHAAAOQAAAMAGAHQAFAHAIAAQAMAAAGgKIAAghQgGgLgMAAQgIAAgFAHg");
	this.shape_1668.setTransform(525.175,267.075);

	this.shape_1669 = new cjs.Shape();
	this.shape_1669.graphics.f("#FFFFFF").s().p("AgXAcQgKgLAAgRIAAAAQAAgKAFgJQAEgJAIgEQAHgGAJAAQAPAAAKALQAJALAAAQIAAABQAAALgEAJQgEAIgIAEQgIAFgKABQgOAAgJgLgAgOgUQgGAIAAANQAAAMAGAIQAGAHAIAAQAKAAAFgHQAGgIAAgNQAAgMgGgIQgFgHgKAAQgIAAgGAHg");
	this.shape_1669.setTransform(517.375,268.55);

	this.shape_1670 = new cjs.Shape();
	this.shape_1670.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgEgGQgDgFAAgHIAMAAQAAAHAGADQAEAEAHAAQAHAAAEgDQAFgDAAgFQgBgEgDgEQgEgDgJgBQgKgCgFgDQgGgDgCgDQgDgEAAgFQAAgKAIgGQAHgGAMgBQAMABAIAGQAHAGAAALIgMAAQAAgGgFgDQgEgEgGAAQgHAAgDADQgFADAAAFQAAAEAFADIALAFQAKABAGADQAFADAEADQACAEAAAGQAAALgIAFQgIAGgMABQgIAAgHgEg");
	this.shape_1670.setTransform(509.8,268.55);

	this.shape_1671 = new cjs.Shape();
	this.shape_1671.graphics.f("#FFFFFF").s().p("AgVAdQgJgLAAgQIAAgCQAAgKAEgJQAEgJAIgEQAHgGAIAAQAOAAAIAKQAIAJAAASIAAAFIgxAAQABALAGAHQAGAGAIAAQAHAAAFgDQAEgDAEgEIAHAGQgJAPgSAAQgPgBgJgJgAgLgVQgFAFgBALIAkAAIAAgBQgBgLgEgEQgFgGgIAAQgHAAgFAGg");
	this.shape_1671.setTransform(502.575,268.55);

	this.shape_1672 = new cjs.Shape();
	this.shape_1672.graphics.f("#FFFFFF").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_1672.setTransform(492.675,268.475);

	this.shape_1673 = new cjs.Shape();
	this.shape_1673.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQABgIgEgEQgDgEgIAAQgGAAgEADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_1673.setTransform(889.2,247.675);

	this.shape_1674 = new cjs.Shape();
	this.shape_1674.graphics.f("#FFFFFF").s().p("AgWAgQgIgGAAgKQAAgLAJgGQAJgGAPAAIAMAAIAAgFQAAgIgDgDQgFgEgHAAQgGAAgFAEQgEADAAAEIgNAAQAAgFAEgFQAEgFAHgEQAGgDAIAAQAMABAIAGQAGAHABALIAAAgQAAALADAGIAAABIgOAAIgCgIQgIAKgLAAQgMAAgGgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgDQAGgDACgFIAAgPIgKAAQgWAAAAAOg");
	this.shape_1674.setTransform(881.55,247.75);

	this.shape_1675 = new cjs.Shape();
	this.shape_1675.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgEgGQgEgFABgHIAMAAQABAHAEADQAFAEAHAAQAHAAAFgDQADgDAAgFQAAgEgDgEQgEgCgJgCQgKgDgFgCQgFgDgDgDQgDgEAAgGQAAgJAHgGQAIgGALgBQANABAIAGQAIAHgBAKIgMAAQAAgFgEgEQgFgEgHAAQgGAAgEADQgDADAAAFQAAAEADADIANAFQAJACAFACQAHACACAEQADAFABAFQgBAKgHAHQgJAFgMABQgIAAgHgEg");
	this.shape_1675.setTransform(874.15,247.75);

	this.shape_1676 = new cjs.Shape();
	this.shape_1676.graphics.f("#FFFFFF").s().p("AgFAzIAAhJIALAAIAABJgAgEglQgCgCAAgDQAAgDACgCQACgCACAAQAEAAABACQACACAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_1676.setTransform(868.85,246.4);

	this.shape_1677 = new cjs.Shape();
	this.shape_1677.graphics.f("#FFFFFF").s().p("AgeA0IAAhlIALAAIABAIQAIgKAMAAQAOAAAIAKQAHALAAARIAAACQAAAPgHALQgIAKgNAAQgNAAgIgJIAAAkgAgSgeIAAAjQAGAKAMAAQAIAAAFgIQAGgHAAgNQAAgMgGgIQgFgHgIAAQgMAAgGAKg");
	this.shape_1677.setTransform(863.375,249.1);

	this.shape_1678 = new cjs.Shape();
	this.shape_1678.graphics.f("#FFFFFF").s().p("AgXAgQgGgGAAgKQAAgLAJgGQAIgGAPAAIANAAIAAgFQAAgIgFgDQgDgEgIAAQgGAAgEAEQgGADAAAEIgMAAQAAgFAEgFQAEgFAGgEQAHgDAHAAQANABAHAGQAIAHAAALIAAAgQAAALACAGIAAABIgNAAIgBgIQgKAKgLAAQgKAAgIgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAGgDQAFgDADgFIAAgPIgKAAQgXAAAAAOg");
	this.shape_1678.setTransform(855.5,247.75);

	this.shape_1679 = new cjs.Shape();
	this.shape_1679.graphics.f("#FFFFFF").s().p("AgGA1IAAhpIANAAIAABpg");
	this.shape_1679.setTransform(850,246.2);

	this.shape_1680 = new cjs.Shape();
	this.shape_1680.graphics.f("#FFFFFF").s().p("AgGAzIAAhJIANAAIAABJgAgFglQgCgCAAgDQAAgDACgCQADgCACAAQAEAAACACQACACAAADQAAADgCACQgCACgEAAQgCAAgDgCg");
	this.shape_1680.setTransform(837.95,246.4);

	this.shape_1681 = new cjs.Shape();
	this.shape_1681.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgEgGQgDgFAAgHIAMAAQABAHAFADQAEAEAHAAQAHAAAFgDQAEgDgBgFQAAgEgDgEQgEgCgJgCQgKgDgFgCQgGgDgCgDQgDgEAAgGQAAgJAIgGQAIgGAKgBQANABAIAGQAIAHgBAKIgMAAQAAgFgFgEQgEgEgHAAQgFAAgFADQgDADAAAFQAAAEADADIAMAFQAKACAFACQAHACACAEQADAFAAAFQAAAKgHAHQgIAFgNABQgIAAgHgEg");
	this.shape_1681.setTransform(832.65,247.75);

	this.shape_1682 = new cjs.Shape();
	this.shape_1682.graphics.f("#FFFFFF").s().p("AgXAgQgGgGAAgKQAAgLAJgGQAIgGAPAAIANAAIAAgFQAAgIgFgDQgEgEgHAAQgGAAgEAEQgGADAAAEIgMAAQAAgFAEgFQAEgFAGgEQAHgDAHAAQANABAHAGQAHAHABALIAAAgQAAALACAGIAAABIgNAAIgBgIQgKAKgLAAQgKAAgIgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAGgDQAFgDADgFIAAgPIgKAAQgXAAAAAOg");
	this.shape_1682.setTransform(825.25,247.75);

	this.shape_1683 = new cjs.Shape();
	this.shape_1683.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1683.setTransform(818.975,246.925);

	this.shape_1684 = new cjs.Shape();
	this.shape_1684.graphics.f("#FFFFFF").s().p("AgXAgQgGgGAAgKQAAgLAJgGQAIgGAPAAIANAAIAAgFQgBgIgEgDQgEgEgHAAQgGAAgEAEQgGADAAAEIgMAAQAAgFAEgFQAEgFAGgEQAHgDAHAAQANABAHAGQAHAHABALIAAAgQAAALACAGIAAABIgNAAIgBgIQgKAKgLAAQgLAAgHgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAGgDQAFgDADgFIAAgPIgKAAQgXAAAAAOg");
	this.shape_1684.setTransform(813.1,247.75);

	this.shape_1685 = new cjs.Shape();
	this.shape_1685.graphics.f("#FFFFFF").s().p("AgSArIgBAJIgLAAIAAhoIAMAAIAAAnQAIgKANAAQANAAAIALQAHAKAAAQIAAACQAAARgHAKQgIAKgNAAQgNAAgIgKgAgSAAIAAAfQAGALAMAAQAJAAAFgHQAFgHAAgOQAAgNgFgGQgFgHgJAAQgMAAgGAMg");
	this.shape_1685.setTransform(805.525,246.275);

	this.shape_1686 = new cjs.Shape();
	this.shape_1686.graphics.f("#FFFFFF").s().p("AgFAzIAAhJIALAAIAABJgAgEglQgCgCAAgDQAAgDACgCQACgCACAAQAEAAABACQACACAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_1686.setTransform(799.75,246.4);

	this.shape_1687 = new cjs.Shape();
	this.shape_1687.graphics.f("#FFFFFF").s().p("AgWArQgIgLAAgRIAAgBQAAgQAIgKQAIgLANAAQAMAAAIAJIAAgmIAMAAIAABoIgLAAIgBgIQgIAJgMAAQgNAAgIgKgAgMgFQgGAHAAAOQAAAMAGAHQAFAHAIAAQAMAAAGgKIAAghQgGgLgMAAQgIAAgFAHg");
	this.shape_1687.setTransform(793.925,246.275);

	this.shape_1688 = new cjs.Shape();
	this.shape_1688.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_1688.setTransform(777.425,249.125);

	this.shape_1689 = new cjs.Shape();
	this.shape_1689.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQAAgIgDgEQgDgEgIAAQgGAAgEADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_1689.setTransform(769.75,247.675);

	this.shape_1690 = new cjs.Shape();
	this.shape_1690.graphics.f("#FFFFFF").s().p("AgWAgQgIgGABgKQgBgLAKgGQAIgGAPAAIAMAAIAAgFQAAgIgDgDQgFgEgHAAQgGAAgEAEQgFADgBAEIgMAAQAAgFAEgFQAEgFAHgEQAHgDAGAAQANABAIAGQAGAHABALIAAAgQAAALADAGIAAABIgOAAIgCgIQgIAKgLAAQgMAAgGgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgDQAGgDACgFIAAgPIgJAAQgXAAAAAOg");
	this.shape_1690.setTransform(762.1,247.75);

	this.shape_1691 = new cjs.Shape();
	this.shape_1691.graphics.f("#FFFFFF").s().p("AgVA0IgGgBIAAgLIAEABQAHAAADgDQAEgDACgHIADgHIgahIIANAAIASA2IARg2IAOAAIgeBVQgGASgPAAg");
	this.shape_1691.setTransform(755,249.25);

	this.shape_1692 = new cjs.Shape();
	this.shape_1692.graphics.f("#FFFFFF").s().p("AgWAgQgIgGABgKQgBgLAJgGQAJgGAPAAIAMAAIAAgFQAAgIgDgDQgFgEgHAAQgGAAgFAEQgEADAAAEIgNAAQAAgFAEgFQAEgFAHgEQAGgDAHAAQANABAIAGQAGAHABALIAAAgQAAALADAGIAAABIgOAAIgCgIQgJAKgKAAQgMAAgGgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgDQAGgDACgFIAAgPIgKAAQgWAAAAAOg");
	this.shape_1692.setTransform(739.25,247.75);

	this.shape_1693 = new cjs.Shape();
	this.shape_1693.graphics.f("#FFFFFF").s().p("AgWA0IgFgBIAAgLIAEABQAHAAADgDQAEgDACgHIADgHIgahIIAOAAIARA2IARg2IANAAIgdBVQgGASgPAAg");
	this.shape_1693.setTransform(732.15,249.25);

	this.shape_1694 = new cjs.Shape();
	this.shape_1694.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQABgIgEgEQgDgEgIAAQgGAAgEADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_1694.setTransform(724.95,247.675);

	this.shape_1695 = new cjs.Shape();
	this.shape_1695.graphics.f("#FFFFFF").s().p("AARA1IAAgyQgBgHgDgEQgEgDgHAAQgFAAgFADQgFADgDAFIAAA1IgMAAIAAhpIAMAAIAAApQAJgLANAAQAXAAAAAZIAAAyg");
	this.shape_1695.setTransform(717.25,246.2);

	this.shape_1696 = new cjs.Shape();
	this.shape_1696.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIANAAIAAAvQAAARANAAQAOAAAEgLIAAg1IANAAIAABJIgMAAIgBgHQgGAJgOAAQgMAAgGgHg");
	this.shape_1696.setTransform(709.55,247.825);

	this.shape_1697 = new cjs.Shape();
	this.shape_1697.graphics.f("#FFFFFF").s().p("AgSArIgBAJIgLAAIAAhoIAMAAIAAAnQAIgKANAAQANAAAIALQAHAKAAAQIAAACQAAARgHAKQgIAKgNAAQgNAAgIgKgAgSAAIAAAfQAGALAMAAQAJAAAFgHQAFgHAAgOQAAgNgFgGQgFgHgJAAQgMAAgGAMg");
	this.shape_1697.setTransform(701.925,246.275);

	this.shape_1698 = new cjs.Shape();
	this.shape_1698.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIANAAIAAAvQAAARANAAQAOAAAEgLIAAg1IANAAIAABJIgMAAIgBgHQgGAJgOAAQgMAAgGgHg");
	this.shape_1698.setTransform(694,247.825);

	this.shape_1699 = new cjs.Shape();
	this.shape_1699.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1699.setTransform(687.675,246.925);

	this.shape_1700 = new cjs.Shape();
	this.shape_1700.graphics.f("#FFFFFF").s().p("AARAmIAAgwQAAgIgEgEQgEgEgHAAQgFAAgFADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLAMAAQAYAAAAAbIAAAwg");
	this.shape_1700.setTransform(673.05,247.675);

	this.shape_1701 = new cjs.Shape();
	this.shape_1701.graphics.f("#FFFFFF").s().p("AgXAgQgGgGgBgKQABgLAIgGQAJgGAPAAIANAAIAAgFQgBgIgEgDQgEgEgHAAQgGAAgEAEQgGADAAAEIgMAAQAAgFAEgFQAEgFAGgEQAHgDAIAAQAMABAHAGQAIAHAAALIAAAgQAAALACAGIAAABIgNAAIgBgIQgKAKgLAAQgLAAgHgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAGgDQAFgDADgFIAAgPIgLAAQgWAAAAAOg");
	this.shape_1701.setTransform(665.4,247.75);

	this.shape_1702 = new cjs.Shape();
	this.shape_1702.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgDgGQgFgFAAgHIANAAQAAAHAFADQAFAEAHAAQAHAAAFgDQADgDAAgFQAAgEgDgEQgEgCgJgCQgJgDgGgCQgFgDgDgDQgDgEAAgGQAAgJAHgGQAJgGALgBQAMABAIAGQAIAHAAAKIgNAAQAAgFgEgEQgFgEgGAAQgGAAgFADQgEADAAAFQAAAEAEADIANAFQAJACAGACQAFACAEAEQADAFAAAFQAAAKgJAHQgIAFgMABQgIAAgHgEg");
	this.shape_1702.setTransform(658,247.75);

	this.shape_1703 = new cjs.Shape();
	this.shape_1703.graphics.f("#FFFFFF").s().p("AgGAzIAAhJIAMAAIAABJgAgFglQgBgCAAgDQAAgDABgCQACgCADAAQAEAAABACQACACABADQgBADgCACQgBACgEAAQgDAAgCgCg");
	this.shape_1703.setTransform(652.7,246.4);

	this.shape_1704 = new cjs.Shape();
	this.shape_1704.graphics.f("#FFFFFF").s().p("AgeA0IAAhlIALAAIABAIQAIgKAMAAQAOAAAIAKQAHALAAARIAAACQAAAPgHALQgIAKgNAAQgNAAgIgJIAAAkgAgSgeIAAAjQAGAKAMAAQAIAAAFgIQAGgHAAgNQAAgMgGgIQgFgHgIAAQgMAAgGAKg");
	this.shape_1704.setTransform(647.225,249.1);

	this.shape_1705 = new cjs.Shape();
	this.shape_1705.graphics.f("#FFFFFF").s().p("AgWAgQgIgGAAgKQAAgLAKgGQAIgGAPAAIAMAAIAAgFQAAgIgDgDQgFgEgHAAQgGAAgFAEQgEADAAAEIgNAAQAAgFAEgFQAEgFAHgEQAGgDAHAAQANABAIAGQAGAHABALIAAAgQAAALADAGIAAABIgOAAIgCgIQgJAKgKAAQgMAAgGgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgDQAGgDACgFIAAgPIgKAAQgWAAAAAOg");
	this.shape_1705.setTransform(639.35,247.75);

	this.shape_1706 = new cjs.Shape();
	this.shape_1706.graphics.f("#FFFFFF").s().p("AgFA1IAAhpIALAAIAABpg");
	this.shape_1706.setTransform(633.85,246.2);

	this.shape_1707 = new cjs.Shape();
	this.shape_1707.graphics.f("#FFFFFF").s().p("AgXAgQgGgGAAgKQAAgLAJgGQAIgGAPAAIANAAIAAgFQAAgIgFgDQgDgEgIAAQgGAAgEAEQgGADAAAEIgMAAQAAgFAEgFQAEgFAGgEQAIgDAGAAQANABAHAGQAIAHAAALIAAAgQAAALACAGIAAABIgNAAIgBgIQgKAKgLAAQgKAAgIgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAGgDQAFgDADgFIAAgPIgKAAQgXAAAAAOg");
	this.shape_1707.setTransform(619.7,247.75);

	this.shape_1708 = new cjs.Shape();
	this.shape_1708.graphics.f("#FFFFFF").s().p("AgNBAIAAgKIAGABQAEAAACgCQABgDAAgFIAAhSIANAAIAABRQAAAWgSgBQgFABgDgCgAABg0QgBgCAAgDQAAgDABgCQACgCAEAAQADAAACACQACACAAADQAAADgCACQgCACgDAAQgEAAgCgCg");
	this.shape_1708.setTransform(613.5,247.9);

	this.shape_1709 = new cjs.Shape();
	this.shape_1709.graphics.f("#FFFFFF").s().p("AgWAgQgIgGABgKQgBgLAJgGQAJgGAPAAIAMAAIAAgFQAAgIgDgDQgFgEgHAAQgGAAgFAEQgEADAAAEIgNAAQAAgFAEgFQAEgFAHgEQAGgDAHAAQANABAIAGQAGAHABALIAAAgQAAALADAGIAAABIgOAAIgCgIQgJAKgKAAQgMAAgGgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgDQAGgDACgFIAAgPIgKAAQgWAAAAAOg");
	this.shape_1709.setTransform(608.75,247.75);

	this.shape_1710 = new cjs.Shape();
	this.shape_1710.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgEgGQgDgFAAgHIAMAAQAAAHAGADQAEAEAHAAQAHAAAFgDQADgDABgFQgBgEgDgEQgEgCgJgCQgKgDgFgCQgGgDgCgDQgDgEAAgGQAAgJAHgGQAJgGAKgBQANABAIAGQAIAHgBAKIgMAAQAAgFgFgEQgEgEgHAAQgFAAgFADQgDADAAAFQAAAEADADIAMAFQAKACAFACQAHACACAEQADAFAAAFQAAAKgHAHQgIAFgNABQgIAAgHgEg");
	this.shape_1710.setTransform(601.35,247.75);

	this.shape_1711 = new cjs.Shape();
	this.shape_1711.graphics.f("#FFFFFF").s().p("AARAmIAAgwQAAgIgEgEQgEgEgHAAQgFAAgFADQgFAEgCAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_1711.setTransform(585.2,247.675);

	this.shape_1712 = new cjs.Shape();
	this.shape_1712.graphics.f("#FFFFFF").s().p("AgXAgQgGgGgBgKQABgLAIgGQAJgGAPAAIAMAAIAAgFQAAgIgDgDQgFgEgHAAQgGAAgFAEQgEADAAAEIgNAAQAAgFAEgFQAEgFAGgEQAIgDAHAAQAMABAHAGQAHAHABALIAAAgQAAALACAGIAAABIgNAAIgCgIQgIAKgMAAQgKAAgIgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAGgDQAFgDACgFIAAgPIgKAAQgWAAAAAOg");
	this.shape_1712.setTransform(577.55,247.75);

	this.shape_1713 = new cjs.Shape();
	this.shape_1713.graphics.f("#FFFFFF").s().p("AgFAzIAAhJIALAAIAABJgAgEglQgCgCAAgDQAAgDACgCQABgCADAAQAEAAABACQACACAAADQAAADgCACQgBACgEAAQgDAAgBgCg");
	this.shape_1713.setTransform(572.05,246.4);

	this.shape_1714 = new cjs.Shape();
	this.shape_1714.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_1714.setTransform(566.275,249.125);

	this.shape_1715 = new cjs.Shape();
	this.shape_1715.graphics.f("#FFFFFF").s().p("AgWAgQgIgGABgKQgBgLAKgGQAIgGAPAAIAMAAIAAgFQAAgIgDgDQgFgEgHAAQgGAAgFAEQgEADgBAEIgMAAQAAgFAEgFQAEgFAHgEQAHgDAGAAQANABAIAGQAGAHABALIAAAgQAAALADAGIAAABIgOAAIgCgIQgJAKgKAAQgMAAgGgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgDQAGgDACgFIAAgPIgJAAQgXAAAAAOg");
	this.shape_1715.setTransform(558.7,247.75);

	this.shape_1716 = new cjs.Shape();
	this.shape_1716.graphics.f("#FFFFFF").s().p("AgSArIgBAJIgLAAIAAhoIAMAAIAAAnQAIgKANAAQANAAAIALQAHAKAAAQIAAACQAAARgHAKQgIAKgNAAQgNAAgIgKgAgSAAIAAAfQAGALAMAAQAJAAAFgHQAFgHAAgOQAAgNgFgGQgFgHgJAAQgMAAgGAMg");
	this.shape_1716.setTransform(551.125,246.275);

	this.shape_1717 = new cjs.Shape();
	this.shape_1717.graphics.f("#FFFFFF").s().p("AgVAcQgJgJAAgRIAAgCQAAgLAEgIQAEgJAIgEQAHgGAIAAQAOAAAIAKQAIAJAAASIAAAFIgxAAQABAKAGAIQAGAGAIAAQAHAAAFgDQAEgDAEgEIAHAGQgJAPgSAAQgPAAgJgLgAgLgVQgFAFgBALIAkAAIAAgCQgBgJgEgFQgFgGgIAAQgHAAgFAGg");
	this.shape_1717.setTransform(543.425,247.75);

	this.shape_1718 = new cjs.Shape();
	this.shape_1718.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgDgGQgFgFAAgHIANAAQAAAHAFADQAFAEAHAAQAHAAAEgDQAEgDAAgFQAAgEgDgEQgEgCgJgCQgJgDgGgCQgFgDgDgDQgDgEAAgGQAAgJAHgGQAJgGALgBQAMABAIAGQAIAHAAAKIgNAAQAAgFgEgEQgFgEgGAAQgGAAgFADQgEADAAAFQAAAEAEADIANAFQAJACAGACQAFACAEAEQADAFAAAFQAAAKgIAHQgJAFgMABQgIAAgHgEg");
	this.shape_1718.setTransform(536.05,247.75);

	this.shape_1719 = new cjs.Shape();
	this.shape_1719.graphics.f("#FFFFFF").s().p("AgWAgQgIgGABgKQgBgLAKgGQAIgGAPAAIAMAAIAAgFQABgIgEgDQgFgEgHAAQgGAAgFAEQgEADgBAEIgMAAQAAgFAEgFQAEgFAHgEQAHgDAGAAQANABAIAGQAGAHABALIAAAgQAAALADAGIAAABIgOAAIgCgIQgJAKgKAAQgMAAgGgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgDQAGgDACgFIAAgPIgJAAQgXAAAAAOg");
	this.shape_1719.setTransform(520,247.75);

	this.shape_1720 = new cjs.Shape();
	this.shape_1720.graphics.f("#FFFFFF").s().p("AgVA0IgGgBIAAgLIAEABQAHAAADgDQAEgDACgHIADgHIgahIIANAAIASA2IARg2IAOAAIgeBVQgGASgPAAg");
	this.shape_1720.setTransform(512.9,249.25);

	this.shape_1721 = new cjs.Shape();
	this.shape_1721.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQABgIgEgEQgDgEgIAAQgFAAgFADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_1721.setTransform(505.7,247.675);

	this.shape_1722 = new cjs.Shape();
	this.shape_1722.graphics.f("#FFFFFF").s().p("AgWAgQgIgGAAgKQAAgLAJgGQAJgGAPAAIAMAAIAAgFQAAgIgDgDQgFgEgHAAQgGAAgFAEQgEADAAAEIgNAAQAAgFAEgFQAEgFAHgEQAGgDAHAAQANABAIAGQAGAHABALIAAAgQAAALADAGIAAABIgOAAIgCgIQgJAKgKAAQgMAAgGgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgDQAGgDACgFIAAgPIgJAAQgXAAAAAOg");
	this.shape_1722.setTransform(498.05,247.75);

	this.shape_1723 = new cjs.Shape();
	this.shape_1723.graphics.f("#FFFFFF").s().p("AAQA1IAAgyQABgHgEgEQgDgDgIAAQgFAAgFADQgEADgDAFIAAA1IgNAAIAAhpIANAAIAAApQAIgLAMAAQAYAAAAAZIAAAyg");
	this.shape_1723.setTransform(490.4,246.2);

	this.shape_1724 = new cjs.Shape();
	this.shape_1724.graphics.f("#FFFFFF").s().p("AgWAgQgIgGABgKQgBgLAKgFQAIgHAPAAIANAAIAAgFQAAgIgFgDQgDgEgIAAQgGAAgEADQgFAEgBAEIgMAAQAAgFAEgFQAEgGAHgDQAHgCAGAAQANAAAHAGQAIAHAAALIAAAgQAAALADAGIAAABIgOAAIgBgIQgKAKgKgBQgMABgGgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgCQAGgEADgFIAAgPIgKAAQgXAAAAAOg");
	this.shape_1724.setTransform(889.35,226.95);

	this.shape_1725 = new cjs.Shape();
	this.shape_1725.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQAAgIgDgEQgEgEgHAAQgGAAgEADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_1725.setTransform(881.65,226.875);

	this.shape_1726 = new cjs.Shape();
	this.shape_1726.graphics.f("#FFFFFF").s().p("AgVAcQgJgJAAgRIAAgCQAAgLAEgIQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAKAAASIAAAEIgxAAQABAKAGAIQAGAGAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPAAgJgKgAgLgVQgFAFgBAKIAkAAIAAgBQgBgJgEgFQgFgGgIAAQgHAAgFAGg");
	this.shape_1726.setTransform(874.175,226.95);

	this.shape_1727 = new cjs.Shape();
	this.shape_1727.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgGAAQgMAAgEAKIAAA0g");
	this.shape_1727.setTransform(868.4,226.875);

	this.shape_1728 = new cjs.Shape();
	this.shape_1728.graphics.f("#FFFFFF").s().p("AgWAgQgIgGAAgKQABgLAIgFQAJgHAPAAIAMAAIAAgFQAAgIgDgDQgEgEgIAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgGAGgDQAIgCAHAAQAMAAAIAGQAGAHABALIAAAgQAAALACAGIAAABIgNAAIgCgIQgIAKgMgBQgKABgHgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgCQAGgEACgFIAAgPIgKAAQgWAAAAAOg");
	this.shape_1728.setTransform(861.85,226.95);

	this.shape_1729 = new cjs.Shape();
	this.shape_1729.graphics.f("#FFFFFF").s().p("AAQA1IgZgjIgIAJIAAAaIgNAAIAAhpIANAAIAAA/IAHgIIAWgXIAPAAIgcAdIAgAsg");
	this.shape_1729.setTransform(854.975,225.4);

	this.shape_1730 = new cjs.Shape();
	this.shape_1730.graphics.f("#FFFFFF").s().p("AgIAMQAGgIAAgJIAAgMIAMAAIAAAKQgBAHgDAHQgDAGgFAEg");
	this.shape_1730.setTransform(845.75,230.9);

	this.shape_1731 = new cjs.Shape();
	this.shape_1731.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIAMAAIAAAvQAAARAOAAQAOAAAEgLIAAg1IANAAIAABJIgMAAIgBgHQgHAJgNAAQgMAAgGgHg");
	this.shape_1731.setTransform(840.75,227.025);

	this.shape_1732 = new cjs.Shape();
	this.shape_1732.graphics.f("#FFFFFF").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_1732.setTransform(830.775,226.875);

	this.shape_1733 = new cjs.Shape();
	this.shape_1733.graphics.f("#FFFFFF").s().p("AgVAcQgJgJAAgRIAAgCQAAgLAEgIQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAKAAASIAAAEIgxAAQABAKAGAIQAGAGAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPAAgJgKgAgLgVQgFAFgBAKIAkAAIAAgBQgBgJgEgFQgFgGgIAAQgHAAgFAGg");
	this.shape_1733.setTransform(821.025,226.95);

	this.shape_1734 = new cjs.Shape();
	this.shape_1734.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgEgGQgDgFAAgHIAMAAQAAAHAGAEQAEADAHAAQAHAAAEgDQAFgDAAgFQgBgFgDgDQgEgCgJgCQgKgCgFgDQgGgDgCgDQgDgEAAgGQAAgJAIgGQAHgGALAAQANAAAIAGQAHAHAAAKIgMAAQAAgFgFgEQgEgEgHAAQgFAAgEADQgEADgBAFQABAEAEADIALAFQAKACAFACQAGADADAEQADAEAAAFQAAAKgIAHQgHAFgNAAQgIAAgHgDg");
	this.shape_1734.setTransform(813.65,226.95);

	this.shape_1735 = new cjs.Shape();
	this.shape_1735.graphics.f("#FFFFFF").s().p("AgXAgQgGgGgBgKQABgLAIgFQAJgHAPAAIANAAIAAgFQgBgIgEgDQgEgEgHAAQgGAAgEADQgGAEAAAEIgMAAQAAgFAEgFQAEgGAGgDQAHgCAIAAQAMAAAHAGQAIAHAAALIAAAgQAAALACAGIAAABIgNAAIgBgIQgKAKgLgBQgLABgHgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAGgCQAFgEADgFIAAgPIgLAAQgWAAAAAOg");
	this.shape_1735.setTransform(802.65,226.95);

	this.shape_1736 = new cjs.Shape();
	this.shape_1736.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_1736.setTransform(794.775,228.325);

	this.shape_1737 = new cjs.Shape();
	this.shape_1737.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_1737.setTransform(786.925,228.325);

	this.shape_1738 = new cjs.Shape();
	this.shape_1738.graphics.f("#FFFFFF").s().p("AARAmIAAgwQAAgIgEgEQgEgEgHAAQgFAAgFADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLAMAAQAYAAAAAbIAAAwg");
	this.shape_1738.setTransform(779.25,226.875);

	this.shape_1739 = new cjs.Shape();
	this.shape_1739.graphics.f("#FFFFFF").s().p("AgXAcQgKgLAAgRIAAAAQAAgLAFgIQAEgJAIgFQAHgEAJAAQAPAAAKAKQAJAKAAARIAAABQAAALgEAIQgEAJgIAFQgIAEgKAAQgOABgJgLgAgOgTQgGAHAAANQAAAMAGAHQAGAIAIAAQAKAAAFgIQAGgHAAgNQAAgMgGgHQgFgIgKAAQgIAAgGAIg");
	this.shape_1739.setTransform(771.375,226.95);

	this.shape_1740 = new cjs.Shape();
	this.shape_1740.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIAMAAIAAAIQAGgKALAAIAGABIAAAMIgHAAQgLAAgFAKIAAA0g");
	this.shape_1740.setTransform(765.4,226.875);

	this.shape_1741 = new cjs.Shape();
	this.shape_1741.graphics.f("#FFFFFF").s().p("AgFAzIAAhJIALAAIAABJgAgEglQgCgCAAgDQAAgDACgCQACgCACAAQAEAAABACQACACAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_1741.setTransform(757.35,225.6);

	this.shape_1742 = new cjs.Shape();
	this.shape_1742.graphics.f("#FFFFFF").s().p("AAQA1IgZgjIgIAJIAAAaIgNAAIAAhpIANAAIAAA/IAHgIIAWgXIAPAAIgcAdIAgAsg");
	this.shape_1742.setTransform(752.575,225.4);

	this.shape_1743 = new cjs.Shape();
	this.shape_1743.graphics.f("#FFFFFF").s().p("AgGAzIAAhJIANAAIAABJgAgFglQgCgCAAgDQAAgDACgCQACgCADAAQAEAAABACQADACAAADQAAADgDACQgBACgEAAQgDAAgCgCg");
	this.shape_1743.setTransform(746.85,225.6);

	this.shape_1744 = new cjs.Shape();
	this.shape_1744.graphics.f("#FFFFFF").s().p("AgGA1IAAhpIANAAIAABpg");
	this.shape_1744.setTransform(743.45,225.4);

	this.shape_1745 = new cjs.Shape();
	this.shape_1745.graphics.f("#FFFFFF").s().p("AgFAzIAAhJIAMAAIAABJgAgEglQgDgCAAgDQAAgDADgCQABgCADAAQAEAAACACQABACAAADQAAADgBACQgCACgEAAQgDAAgBgCg");
	this.shape_1745.setTransform(740.05,225.6);

	this.shape_1746 = new cjs.Shape();
	this.shape_1746.graphics.f("#FFFFFF").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_1746.setTransform(732.225,226.875);

	this.shape_1747 = new cjs.Shape();
	this.shape_1747.graphics.f("#FFFFFF").s().p("AgVAcQgJgJAAgRIAAgCQAAgLAEgIQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAKAAASIAAAEIgxAAQABAKAGAIQAGAGAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPAAgJgKgAgLgVQgFAFgBAKIAkAAIAAgBQgBgJgEgFQgFgGgIAAQgHAAgFAGg");
	this.shape_1747.setTransform(722.475,226.95);

	this.shape_1748 = new cjs.Shape();
	this.shape_1748.graphics.f("#FFFFFF").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_1748.setTransform(712.575,226.875);

	this.shape_1749 = new cjs.Shape();
	this.shape_1749.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_1749.setTransform(698.775,228.325);

	this.shape_1750 = new cjs.Shape();
	this.shape_1750.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQABgIgEgEQgDgEgIAAQgFAAgFADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_1750.setTransform(691.1,226.875);

	this.shape_1751 = new cjs.Shape();
	this.shape_1751.graphics.f("#FFFFFF").s().p("AgWAgQgIgGAAgKQAAgLAJgFQAJgHAPAAIAMAAIAAgFQAAgIgDgDQgFgEgHAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgGAHgDQAGgCAHAAQANAAAIAGQAGAHABALIAAAgQAAALADAGIAAABIgOAAIgCgIQgJAKgKgBQgMABgGgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgCQAGgEACgFIAAgPIgKAAQgWAAAAAOg");
	this.shape_1751.setTransform(683.45,226.95);

	this.shape_1752 = new cjs.Shape();
	this.shape_1752.graphics.f("#FFFFFF").s().p("AgWA0IgFgBIAAgLIAEABQAHAAADgDQAEgDACgGIADgIIgahIIAOAAIARA2IARg2IANAAIgdBVQgGASgPAAg");
	this.shape_1752.setTransform(676.35,228.45);

	this.shape_1753 = new cjs.Shape();
	this.shape_1753.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQABgIgEgEQgDgEgIAAQgFAAgFADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_1753.setTransform(665.55,226.875);

	this.shape_1754 = new cjs.Shape();
	this.shape_1754.graphics.f("#FFFFFF").s().p("AgWAgQgIgGAAgKQAAgLAJgFQAJgHAPAAIAMAAIAAgFQAAgIgDgDQgFgEgHAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgGAHgDQAGgCAIAAQAMAAAIAGQAGAHABALIAAAgQAAALADAGIAAABIgOAAIgCgIQgIAKgLgBQgMABgGgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgCQAGgEACgFIAAgPIgKAAQgWAAAAAOg");
	this.shape_1754.setTransform(657.9,226.95);

	this.shape_1755 = new cjs.Shape();
	this.shape_1755.graphics.f("#FFFFFF").s().p("AASAlIgSg3IgRA3IgKAAIgWhJIANAAIAOA2IASg2IAJAAIARA3IAPg3IAMAAIgVBJg");
	this.shape_1755.setTransform(648.85,226.95);

	this.shape_1756 = new cjs.Shape();
	this.shape_1756.graphics.f("#FFFFFF").s().p("AgVAcQgJgJAAgRIAAgCQAAgLAEgIQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAKAAASIAAAEIgxAAQABAKAGAIQAGAGAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPAAgJgKgAgLgVQgFAFgBAKIAkAAIAAgBQgBgJgEgFQgFgGgIAAQgHAAgFAGg");
	this.shape_1756.setTransform(639.975,226.95);

	this.shape_1757 = new cjs.Shape();
	this.shape_1757.graphics.f("#FFFFFF").s().p("AAQA1IAAgyQAAgGgDgEQgEgEgHAAQgGAAgEADQgEAEgDAEIAAA1IgNAAIAAhpIANAAIAAApQAIgLAMAAQAYAAAAAZIAAAyg");
	this.shape_1757.setTransform(632.35,225.4);

	this.shape_1758 = new cjs.Shape();
	this.shape_1758.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIAMAAIAAAvQAAARAOAAQANAAAGgLIAAg1IAMAAIAABJIgMAAIAAgHQgIAJgNAAQgMAAgGgHg");
	this.shape_1758.setTransform(621.05,227.025);

	this.shape_1759 = new cjs.Shape();
	this.shape_1759.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1759.setTransform(614.725,226.125);

	this.shape_1760 = new cjs.Shape();
	this.shape_1760.graphics.f("#FFFFFF").s().p("AgGAzIAAhJIANAAIAABJgAgFglQgBgCAAgDQAAgDABgCQACgCADAAQAEAAABACQADACAAADQAAADgDACQgBACgEAAQgDAAgCgCg");
	this.shape_1760.setTransform(610.95,225.6);

	this.shape_1761 = new cjs.Shape();
	this.shape_1761.graphics.f("#FFFFFF").s().p("AgXAgQgGgGgBgKQABgLAIgFQAJgHAPAAIAMAAIAAgFQAAgIgEgDQgEgEgHAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgGAGgDQAIgCAHAAQAMAAAHAGQAIAHAAALIAAAgQAAALACAGIAAABIgNAAIgCgIQgIAKgMgBQgKABgIgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAGgCQAFgEACgFIAAgPIgKAAQgWAAAAAOg");
	this.shape_1761.setTransform(605.45,226.95);

	this.shape_1762 = new cjs.Shape();
	this.shape_1762.graphics.f("#FFFFFF").s().p("AgWA0IgEgBIAAgLIADABQAHAAADgDQAEgDACgGIADgIIgbhIIAPAAIARA2IARg2IANAAIgdBVQgGASgPAAg");
	this.shape_1762.setTransform(598.35,228.45);

	this.shape_1763 = new cjs.Shape();
	this.shape_1763.graphics.f("#FFFFFF").s().p("AgFAzIAAhJIALAAIAABJgAgEglQgDgCAAgDQAAgDADgCQABgCADAAQAEAAACACQABACAAADQAAADgBACQgCACgEAAQgDAAgBgCg");
	this.shape_1763.setTransform(589.75,225.6);

	this.shape_1764 = new cjs.Shape();
	this.shape_1764.graphics.f("#FFFFFF").s().p("AARAmIAAgwQgBgIgDgEQgEgEgHAAQgGAAgEADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_1764.setTransform(584.15,226.875);

	this.shape_1765 = new cjs.Shape();
	this.shape_1765.graphics.f("#FFFFFF").s().p("AgFAzIAAhJIALAAIAABJgAgEglQgCgCAAgDQAAgDACgCQACgCACAAQAEAAABACQACACAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_1765.setTransform(578.6,225.6);

	this.shape_1766 = new cjs.Shape();
	this.shape_1766.graphics.f("#FFFFFF").s().p("AARA1IAAgyQAAgGgEgEQgEgEgHAAQgFAAgFADQgFAEgCAEIAAA1IgNAAIAAhpIANAAIAAApQAIgLAMAAQAYAAAAAZIAAAyg");
	this.shape_1766.setTransform(569.45,225.4);

	this.shape_1767 = new cjs.Shape();
	this.shape_1767.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIAMAAIAAAvQAAARAOAAQANAAAFgLIAAg1IANAAIAABJIgMAAIgBgHQgHAJgNAAQgMAAgGgHg");
	this.shape_1767.setTransform(561.75,227.025);

	this.shape_1768 = new cjs.Shape();
	this.shape_1768.graphics.f("#FFFFFF").s().p("AgSArIgBAJIgLAAIAAhoIAMAAIAAAnQAIgKANAAQANAAAIALQAHAKAAAQIAAACQAAARgHAKQgIAKgNAAQgNAAgIgKgAgSAAIAAAfQAGALAMAAQAJAAAFgHQAFgHAAgOQAAgNgFgGQgFgHgJAAQgMAAgGAMg");
	this.shape_1768.setTransform(554.125,225.475);

	this.shape_1769 = new cjs.Shape();
	this.shape_1769.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIANAAIAAAvQAAARANAAQAOAAAEgLIAAg1IANAAIAABJIgMAAIgBgHQgGAJgOAAQgMAAgGgHg");
	this.shape_1769.setTransform(546.2,227.025);

	this.shape_1770 = new cjs.Shape();
	this.shape_1770.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1770.setTransform(539.875,226.125);

	this.shape_1771 = new cjs.Shape();
	this.shape_1771.graphics.f("#FFFFFF").s().p("AgXAgQgGgGgBgKQABgLAIgFQAJgHAPAAIANAAIAAgFQgBgIgEgDQgEgEgHAAQgGAAgEADQgGAEAAAEIgMAAQAAgFAEgFQAEgGAGgDQAHgCAIAAQAMAAAHAGQAIAHAAALIAAAgQAAALACAGIAAABIgNAAIgBgIQgKAKgLgBQgLABgHgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAGgCQAFgEADgFIAAgPIgLAAQgWAAAAAOg");
	this.shape_1771.setTransform(530.4,226.95);

	this.shape_1772 = new cjs.Shape();
	this.shape_1772.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_1772.setTransform(522.525,228.325);

	this.shape_1773 = new cjs.Shape();
	this.shape_1773.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_1773.setTransform(514.675,228.325);

	this.shape_1774 = new cjs.Shape();
	this.shape_1774.graphics.f("#FFFFFF").s().p("AARAmIAAgwQAAgIgEgEQgEgEgHAAQgFAAgFADQgFAEgCAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_1774.setTransform(507,226.875);

	this.shape_1775 = new cjs.Shape();
	this.shape_1775.graphics.f("#FFFFFF").s().p("AgXAcQgKgLAAgRIAAAAQAAgLAFgIQAEgJAIgFQAHgEAJAAQAPAAAKAKQAJAKAAARIAAABQAAALgEAIQgEAJgIAFQgIAEgKAAQgOABgJgLgAgOgTQgGAHAAANQAAAMAGAHQAGAIAIAAQAKAAAFgIQAGgHAAgNQAAgMgGgHQgFgIgKAAQgIAAgGAIg");
	this.shape_1775.setTransform(499.125,226.95);

	this.shape_1776 = new cjs.Shape();
	this.shape_1776.graphics.f("#FFFFFF").s().p("AAWAyIgWgpIgWAAIAAApIgNAAIAAhjIAhAAQAQAAAJAIQAJAIAAAOQAAAJgFAHQgFAGgJAEIAXAqIAAABgAgWAAIAUAAQAJAAAGgFQAGgFgBgJQABgJgGgFQgFgFgKAAIgUAAg");
	this.shape_1776.setTransform(491.3,225.675);

	this.shape_1777 = new cjs.Shape();
	this.shape_1777.graphics.f("#FFFFFF").s().p("AgWAgQgIgGAAgJQAAgMAJgFQAJgHAPAAIAMAAIAAgFQAAgIgDgDQgFgEgHAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgGAHgDQAGgCAIAAQAMAAAIAGQAGAHABAKIAAAhQAAALADAGIAAABIgOAAIgCgIQgIAJgLAAQgMABgGgHgAgRAPQAAAFAEAEQAEADAGAAQAFAAAFgCQAGgEACgEIAAgQIgKAAQgWAAAAAOg");
	this.shape_1777.setTransform(692.1,206.15);

	this.shape_1778 = new cjs.Shape();
	this.shape_1778.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1778.setTransform(685.825,205.325);

	this.shape_1779 = new cjs.Shape();
	this.shape_1779.graphics.f("#FFFFFF").s().p("AgWAgQgIgGAAgJQAAgMAJgFQAJgHAPAAIAMAAIAAgFQAAgIgDgDQgFgEgHAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgGAHgDQAGgCAIAAQAMAAAIAGQAGAHABAKIAAAhQAAALADAGIAAABIgOAAIgCgIQgIAJgLAAQgMABgGgHgAgRAPQAAAFAEAEQAEADAGAAQAFAAAFgCQAGgEACgEIAAgQIgKAAQgWAAAAAOg");
	this.shape_1779.setTransform(679.95,206.15);

	this.shape_1780 = new cjs.Shape();
	this.shape_1780.graphics.f("#FFFFFF").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_1780.setTransform(670.025,206.075);

	this.shape_1781 = new cjs.Shape();
	this.shape_1781.graphics.f("#FFFFFF").s().p("AgXAcQgKgLAAgRIAAAAQAAgLAFgIQAEgJAIgFQAHgEAJAAQAPAAAKAKQAJAKAAARIAAABQAAAKgEAJQgEAJgIAFQgIAEgKAAQgOAAgJgKgAgOgTQgGAHAAANQAAAMAGAHQAGAIAIAAQAKAAAFgIQAGgHAAgNQAAgMgGgHQgFgIgKAAQgIAAgGAIg");
	this.shape_1781.setTransform(659.875,206.15);

	this.shape_1782 = new cjs.Shape();
	this.shape_1782.graphics.f("#FFFFFF").s().p("AgFA1IAAhpIALAAIAABpg");
	this.shape_1782.setTransform(654.2,204.6);

	this.shape_1783 = new cjs.Shape();
	this.shape_1783.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgLAEgIQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAKAAASIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPAAgJgKgAgLgVQgFAFgBAKIAkAAIAAgBQgBgKgEgEQgFgGgIAAQgHAAgFAGg");
	this.shape_1783.setTransform(648.875,206.15);

	this.shape_1784 = new cjs.Shape();
	this.shape_1784.graphics.f("#FFFFFF").s().p("AgXAcQgKgLAAgRIAAAAQAAgLAFgIQAEgJAIgFQAHgEAJAAQAPAAAKAKQAJAKAAARIAAABQAAAKgEAJQgEAJgIAFQgIAEgKAAQgOAAgJgKgAgOgTQgGAHAAANQAAAMAGAHQAGAIAIAAQAKAAAFgIQAGgHAAgNQAAgMgGgHQgFgIgKAAQgIAAgGAIg");
	this.shape_1784.setTransform(641.075,206.15);

	this.shape_1785 = new cjs.Shape();
	this.shape_1785.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgSIAAAAQAAgLAEgIQAEgJAHgFQAIgEAJAAQAMAAAJAHQAHAIABAMIgMAAQAAgIgFgFQgFgEgHAAQgJAAgFAHQgGAHAAANIAAABQAAANAGAHQAFAHAJAAQAGAAAGgEQAEgEABgGIAMAAQAAAGgEAGQgEAGgHADQgHAEgHgBQgPAAgIgKg");
	this.shape_1785.setTransform(633.5,206.15);

	this.shape_1786 = new cjs.Shape();
	this.shape_1786.graphics.f("#FFFFFF").s().p("AgXAcQgKgLAAgRIAAAAQAAgLAFgIQAEgJAIgFQAHgEAJAAQAPAAAKAKQAJAKAAARIAAABQAAAKgEAJQgEAJgIAFQgIAEgKAAQgOAAgJgKgAgOgTQgGAHAAANQAAAMAGAHQAGAIAIAAQAKAAAFgIQAGgHAAgNQAAgMgGgHQgFgIgKAAQgIAAgGAIg");
	this.shape_1786.setTransform(625.725,206.15);

	this.shape_1787 = new cjs.Shape();
	this.shape_1787.graphics.f("#FFFFFF").s().p("AgWArQgIgLAAgRIAAgBQAAgQAIgKQAIgLANAAQAMAAAIAJIAAgmIAMAAIAABoIgLAAIgBgIQgIAJgMAAQgNAAgIgKgAgMgFQgGAHAAAOQAAAMAGAHQAFAHAIAAQAMAAAGgKIAAghQgGgLgMAAQgIAAgFAHg");
	this.shape_1787.setTransform(617.625,204.675);

	this.shape_1788 = new cjs.Shape();
	this.shape_1788.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIAMAAIAAAvQAAARAOAAQAOAAAEgLIAAg1IANAAIAABJIgMAAIgBgHQgGAJgOAAQgMAAgGgHg");
	this.shape_1788.setTransform(610,206.225);

	this.shape_1789 = new cjs.Shape();
	this.shape_1789.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgLAEgIQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAKAAASIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPAAgJgKgAgLgVQgFAFgBAKIAkAAIAAgBQgBgKgEgEQgFgGgIAAQgHAAgFAGg");
	this.shape_1789.setTransform(602.525,206.15);

	this.shape_1790 = new cjs.Shape();
	this.shape_1790.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgEgFQgEgGABgHIAMAAQABAGAEAFQAFADAHAAQAHAAAFgDQADgDAAgFQAAgEgDgEQgEgCgJgCQgKgDgFgCQgFgCgDgEQgDgEAAgGQAAgJAHgGQAIgGALAAQANAAAIAGQAIAGgBALIgMAAQAAgGgEgDQgFgEgHAAQgGAAgEADQgDADAAAFQAAAEADADQAEACAJACQAJADAFACQAHACACAFQADADABAHQgBAJgHAHQgJAFgMAAQgIABgHgEg");
	this.shape_1790.setTransform(595.15,206.15);

	this.shape_1791 = new cjs.Shape();
	this.shape_1791.graphics.f("#FFFFFF").s().p("AgjAyIAAhjIAkAAQAQAAAKAJQAJAIAAAOQAAAOgJAHQgJAIgRAAIgXAAIAAAngAgWAAIAXAAQALAAAFgEQAGgFAAgJQAAgJgGgGQgFgFgKAAIgYAAg");
	this.shape_1791.setTransform(587.425,204.875);

	this.shape_1792 = new cjs.Shape();
	this.shape_1792.graphics.f("#FFFFFF").s().p("AAQA1IgZgiIgIAIIAAAaIgNAAIAAhpIANAAIAAA/IAHgIIAWgYIAPAAIgcAfIAgArg");
	this.shape_1792.setTransform(576.175,204.6);

	this.shape_1793 = new cjs.Shape();
	this.shape_1793.graphics.f("#FFFFFF").s().p("AgGAzIAAhKIANAAIAABKgAgFglQgBgCAAgDQAAgDABgCQACgCADgBQAEABABACQADACAAADQAAADgDACQgBACgEAAQgDAAgCgCg");
	this.shape_1793.setTransform(570.45,204.8);

	this.shape_1794 = new cjs.Shape();
	this.shape_1794.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1794.setTransform(566.275,205.325);

	this.shape_1795 = new cjs.Shape();
	this.shape_1795.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgDgFQgFgGAAgHIANAAQABAGAEAFQAFADAHAAQAHAAAFgDQADgDAAgFQABgEgEgEQgEgCgJgCQgJgDgGgCQgGgCgCgEQgDgEAAgGQAAgJAHgGQAJgGAKAAQANAAAIAGQAIAGAAALIgNAAQAAgGgEgDQgFgEgHAAQgGAAgEADQgDADAAAFQAAAEADADQAEACAJACQAJADAFACQAHACACAFQAEADAAAHQgBAJgHAHQgJAFgMAAQgIABgHgEg");
	this.shape_1795.setTransform(560.6,206.15);

	this.shape_1796 = new cjs.Shape();
	this.shape_1796.graphics.f("#FFFFFF").s().p("AgWAgQgIgGABgJQgBgMAKgFQAIgHAPAAIANAAIAAgFQAAgIgFgDQgDgEgIAAQgGAAgEADQgFAEgBAEIgMAAQAAgFAEgFQAEgGAHgDQAHgCAGAAQANAAAHAGQAIAHAAAKIAAAhQAAALADAGIAAABIgOAAIgBgIQgKAJgKAAQgMABgGgHgAgRAPQAAAFAEAEQAEADAGAAQAFAAAGgCQAFgEADgEIAAgQIgKAAQgXAAAAAOg");
	this.shape_1796.setTransform(553.2,206.15);

	this.shape_1797 = new cjs.Shape();
	this.shape_1797.graphics.f("#FFFFFF").s().p("AgGA1IAAhpIANAAIAABpg");
	this.shape_1797.setTransform(547.7,204.6);

	this.shape_1798 = new cjs.Shape();
	this.shape_1798.graphics.f("#FFFFFF").s().p("AgSArIgBAJIgLAAIAAhoIAMAAIAAAnQAIgKANAAQANAAAIALQAHAKAAAQIAAACQAAARgHAKQgIAKgNAAQgNAAgIgKgAgSAAIAAAfQAGALAMAAQAJAAAFgHQAFgHAAgOQAAgNgFgGQgFgHgJAAQgMAAgGAMg");
	this.shape_1798.setTransform(542.225,204.675);

	this.shape_1799 = new cjs.Shape();
	this.shape_1799.graphics.f("#FFFFFF").s().p("AgXAcQgKgLAAgRIAAAAQAAgLAFgIQAEgJAIgFQAHgEAJAAQAPAAAKAKQAJAKAAARIAAABQAAAKgEAJQgEAJgIAFQgIAEgKAAQgOAAgJgKgAgOgTQgGAHAAANQAAAMAGAHQAGAIAIAAQAKAAAFgIQAGgHAAgNQAAgMgGgHQgFgIgKAAQgIAAgGAIg");
	this.shape_1799.setTransform(534.125,206.15);

	this.shape_1800 = new cjs.Shape();
	this.shape_1800.graphics.f("#FFFFFF").s().p("AgGA1IAAhpIANAAIAABpg");
	this.shape_1800.setTransform(528.45,204.6);

	this.shape_1801 = new cjs.Shape();
	this.shape_1801.graphics.f("#FFFFFF").s().p("AgeA0IAAhmIALAAIABAIQAIgJAMAAQAOAAAIAKQAHALAAARIAAACQAAAPgHALQgIAKgNAAQgNAAgIgIIAAAjgAgSgeIAAAjQAGAJAMABQAIgBAFgGQAGgIAAgNQAAgNgGgHQgFgHgIAAQgMAAgGAKg");
	this.shape_1801.setTransform(522.975,207.5);

	this.shape_1802 = new cjs.Shape();
	this.shape_1802.graphics.f("#FFFFFF").s().p("AgGAzIAAhKIANAAIAABKgAgEglQgDgCAAgDQAAgDADgCQABgCADgBQAEABACACQABACABADQgBADgBACQgCACgEAAQgDAAgBgCg");
	this.shape_1802.setTransform(517.2,204.8);

	this.shape_1803 = new cjs.Shape();
	this.shape_1803.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIAMAAIAAAIQAGgKALAAIAGABIAAAMIgHAAQgLAAgFAKIAAA0g");
	this.shape_1803.setTransform(513.5,206.075);

	this.shape_1804 = new cjs.Shape();
	this.shape_1804.graphics.f("#FFFFFF").s().p("AgFAyIAAhYIghAAIAAgLIBNAAIAAALIghAAIAABYg");
	this.shape_1804.setTransform(506.6,204.875);

	this.shape_1805 = new cjs.Shape();
	this.shape_1805.graphics.f("#FFFFFF").s().p("AgFAFQgCgCAAgDQAAgCACgCQACgDADAAQAEAAACADQACACAAACQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_1805.setTransform(497.025,209.175);

	this.shape_1806 = new cjs.Shape();
	this.shape_1806.graphics.f("#FFFFFF").s().p("AghAyIAAhjIAgAAQAQAAAIAHQAIAHAAANQAAAHgEAFQgEAFgHADQAJACAEAGQAFAGAAAJQAAANgJAIQgIAIgRAAgAgUAnIAVAAQAJAAAGgFQAEgEAAgJQAAgSgTAAIgVAAgAgUgGIAUAAQAHAAAGgFQAFgEAAgHQAAgJgFgDQgEgEgKAAIgTAAg");
	this.shape_1806.setTransform(491.1,204.875);

	this.shape_1807 = new cjs.Shape();
	this.shape_1807.graphics.f("#FFFFFF").s().p("AgFAFQgCgCAAgDQAAgCACgCQACgDADAAQAEAAACADQACACAAACQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_1807.setTransform(580.375,167.575);

	this.shape_1808 = new cjs.Shape();
	this.shape_1808.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgDgFQgFgGAAgHIANAAQABAGAEAFQAFADAHAAQAHAAAFgDQADgDAAgEQABgGgEgCQgEgEgJgCQgKgCgFgCQgGgCgCgEQgDgEAAgGQAAgJAHgGQAJgHAKABQANgBAIAHQAIAGAAALIgNAAQAAgGgEgDQgFgEgHAAQgFAAgFADQgDADAAAFQAAAFADACIANAEQAJADAFACQAHACACAFQAEADAAAHQgBAJgHAGQgJAHgMgBQgIAAgHgDg");
	this.shape_1808.setTransform(575,164.55);

	this.shape_1809 = new cjs.Shape();
	this.shape_1809.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAAAQgBgKgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_1809.setTransform(567.775,164.55);

	this.shape_1810 = new cjs.Shape();
	this.shape_1810.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKQgFACgFAAQgIAAgDgGg");
	this.shape_1810.setTransform(561.525,163.725);

	this.shape_1811 = new cjs.Shape();
	this.shape_1811.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQAAgIgDgEQgDgEgIAAQgGAAgEADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_1811.setTransform(555.55,164.475);

	this.shape_1812 = new cjs.Shape();
	this.shape_1812.graphics.f("#FFFFFF").s().p("AgFAyIAAhJIALAAIAABJgAgEglQgCgCAAgDQAAgDACgDQACgCACAAQAEAAABACQACADAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_1812.setTransform(550,163.2);

	this.shape_1813 = new cjs.Shape();
	this.shape_1813.graphics.f("#FFFFFF").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_1813.setTransform(542.175,164.475);

	this.shape_1814 = new cjs.Shape();
	this.shape_1814.graphics.f("#FFFFFF").s().p("AgFA0IAAhnIALAAIAABng");
	this.shape_1814.setTransform(534.35,163);

	this.shape_1815 = new cjs.Shape();
	this.shape_1815.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAAAQgBgKgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_1815.setTransform(529.025,164.55);

	this.shape_1816 = new cjs.Shape();
	this.shape_1816.graphics.f("#FFFFFF").s().p("AARA0IAAgxQAAgHgEgDQgDgEgIAAQgFAAgFADQgFADgCAFIAAA0IgNAAIAAhnIANAAIAAAnQAIgKAMAAQAYAAAAAZIAAAxg");
	this.shape_1816.setTransform(521.4,163);

	this.shape_1817 = new cjs.Shape();
	this.shape_1817.graphics.f("#FFFFFF").s().p("AgVAzIgGAAIAAgLIAEABQAHAAADgDQAEgDACgGIADgIIgahIIANAAIASA3IARg3IAOAAIgeBUQgGATgPAAg");
	this.shape_1817.setTransform(514.25,166.05);

	this.shape_1818 = new cjs.Shape();
	this.shape_1818.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKQgFACgFAAQgIAAgDgGg");
	this.shape_1818.setTransform(508.475,163.725);

	this.shape_1819 = new cjs.Shape();
	this.shape_1819.graphics.f("#FFFFFF").s().p("AgXAgQgGgGAAgJQAAgMAJgFQAIgHAPAAIANAAIAAgGQAAgGgFgEQgEgEgHAAQgGAAgEADQgGAEAAAEIgMAAQAAgFAEgFQAEgFAGgDQAHgDAHAAQANgBAHAHQAIAGAAALIAAAhQAAALACAGIAAABIgNAAIgBgIQgKAJgLAAQgLAAgHgGgAgRAOQAAAHAEADQAEADAGABQAFAAAGgDQAFgEADgEIAAgQIgKAAQgXAAAAANg");
	this.shape_1819.setTransform(502.6,164.55);

	this.shape_1820 = new cjs.Shape();
	this.shape_1820.graphics.f("#FFFFFF").s().p("AgGA0IAAhnIANAAIAABng");
	this.shape_1820.setTransform(497.1,163);

	this.shape_1821 = new cjs.Shape();
	this.shape_1821.graphics.f("#FFFFFF").s().p("AgjAyIAAhjIAkAAQAQAAAKAJQAJAIAAAOQAAAOgJAHQgJAIgRAAIgXAAIAAAngAgWAAIAXAAQALAAAFgEQAGgFAAgJQAAgJgGgGQgFgFgKAAIgYAAg");
	this.shape_1821.setTransform(491.275,163.275);

	this.shape_1822 = new cjs.Shape();
	this.shape_1822.graphics.f("#FFFFFF").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_1822.setTransform(886.975,143.675);

	this.shape_1823 = new cjs.Shape();
	this.shape_1823.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIAMAAIAAAvQAAARAOAAQANAAAGgLIAAg1IAMAAIAABJIgMAAIAAgHQgIAJgNAAQgMAAgGgHg");
	this.shape_1823.setTransform(877,143.825);

	this.shape_1824 = new cjs.Shape();
	this.shape_1824.graphics.f("#FFFFFF").s().p("AgFA0IAAhnIALAAIAABng");
	this.shape_1824.setTransform(871.45,142.2);

	this.shape_1825 = new cjs.Shape();
	this.shape_1825.graphics.f("#FFFFFF").s().p("AgWAzIgEAAIAAgKIADAAQAGAAAEgDQAEgDACgGIADgIIgbhIIAPAAIARA3IARg3IANAAIgdBUQgGATgPAAg");
	this.shape_1825.setTransform(866.45,145.25);

	this.shape_1826 = new cjs.Shape();
	this.shape_1826.graphics.f("#FFFFFF").s().p("AAQA0IAAgwQAAgIgDgDQgDgEgIAAQgGAAgEADQgFAEgDAEIAAA0IgMAAIAAhnIAMAAIAAAnQAJgKANAAQAXAAAAAaIAAAwg");
	this.shape_1826.setTransform(859.3,142.2);

	this.shape_1827 = new cjs.Shape();
	this.shape_1827.graphics.f("#FFFFFF").s().p("AgeA0IAAhmIALAAIABAIQAIgJAMAAQAOAAAIAKQAHAKAAASIAAABQAAAQgHAKQgIALgNAAQgNAAgIgIIAAAjgAgSgeIAAAiQAGAKAMAAQAIAAAFgGQAGgIAAgNQAAgMgGgIQgFgHgIAAQgMAAgGAKg");
	this.shape_1827.setTransform(851.675,145.1);

	this.shape_1828 = new cjs.Shape();
	this.shape_1828.graphics.f("#FFFFFF").s().p("AgFAjQgCgCAAgDQAAgDACgCQACgDADAAQAEAAACADQACACAAADQAAADgCACQgCADgEAAQgDAAgCgDgAgFgYQgCgCAAgDQAAgEACgCQACgCADAAQAEAAACACQACACAAAEQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_1828.setTransform(842.2,143.775);

	this.shape_1829 = new cjs.Shape();
	this.shape_1829.graphics.f("#FFFFFF").s().p("AAQA0IAAgwQABgIgEgDQgDgEgIAAQgGAAgEADQgEAEgDAEIAAA0IgNAAIAAhnIANAAIAAAnQAIgKAMAAQAYAAAAAaIAAAwg");
	this.shape_1829.setTransform(832.95,142.2);

	this.shape_1830 = new cjs.Shape();
	this.shape_1830.graphics.f("#FFFFFF").s().p("AgXAcQgKgKAAgSIAAAAQAAgKAFgJQAEgJAIgFQAHgEAJgBQAPAAAKALQAJALAAAQIAAABQAAAKgEAKQgEAIgIAEQgIAGgKgBQgOAAgJgKgAgOgUQgGAIAAANQAAAMAGAIQAGAHAIAAQAKAAAFgHQAGgIAAgNQAAgMgGgIQgFgHgKAAQgIAAgGAHg");
	this.shape_1830.setTransform(825.075,143.75);

	this.shape_1831 = new cjs.Shape();
	this.shape_1831.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1831.setTransform(818.625,142.925);

	this.shape_1832 = new cjs.Shape();
	this.shape_1832.graphics.f("#FFFFFF").s().p("AARAmIAAgwQgBgIgDgEQgEgEgHAAQgFAAgFADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_1832.setTransform(812.65,143.675);

	this.shape_1833 = new cjs.Shape();
	this.shape_1833.graphics.f("#FFFFFF").s().p("AgXAcQgKgKAAgSIAAAAQAAgKAFgJQAEgJAIgFQAHgEAJgBQAPAAAKALQAJALAAAQIAAABQAAAKgEAKQgEAIgIAEQgIAGgKgBQgOAAgJgKgAgOgUQgGAIAAANQAAAMAGAIQAGAHAIAAQAKAAAFgHQAGgIAAgNQAAgMgGgIQgFgHgKAAQgIAAgGAHg");
	this.shape_1833.setTransform(804.775,143.75);

	this.shape_1834 = new cjs.Shape();
	this.shape_1834.graphics.f("#FFFFFF").s().p("AgaAmQgLgMAAgVIAAgJQAAgOAEgKQAFgLAKgFQAIgGALAAQARAAAJAJQAKAJABAPIgNAAQgCgMgFgFQgGgFgLAAQgLAAgHAJQgHAJAAARIAAAJQAAAQAHAKQAGAJAMAAQAKAAAHgFQAFgFACgMIANAAQgBAQgKAJQgKAIgQAAQgRAAgKgNg");
	this.shape_1834.setTransform(796.35,142.475);

	this.shape_1835 = new cjs.Shape();
	this.shape_1835.graphics.f("#FFFFFF").s().p("AgFAFQgCgCAAgDQAAgCACgCQACgDADAAQAEAAACADQACACAAACQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_1835.setTransform(786.075,146.775);

	this.shape_1836 = new cjs.Shape();
	this.shape_1836.graphics.f("#FFFFFF").s().p("AAQA0IAAgwQAAgIgDgDQgEgEgHAAQgGAAgEADQgEAEgEAEIAAA0IgMAAIAAhnIAMAAIAAAnQAJgKANAAQAXAAAAAaIAAAwg");
	this.shape_1836.setTransform(780.45,142.2);

	this.shape_1837 = new cjs.Shape();
	this.shape_1837.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIANAAIAAAvQAAARANAAQAOAAAEgLIAAg1IANAAIAABJIgMAAIgBgHQgGAJgOAAQgMAAgGgHg");
	this.shape_1837.setTransform(772.75,143.825);

	this.shape_1838 = new cjs.Shape();
	this.shape_1838.graphics.f("#FFFFFF").s().p("AgSArIgBAJIgLAAIAAhoIAMAAIAAAnQAIgKANAAQANAAAIALQAHAKAAAQIAAACQAAARgHAKQgIAKgNAAQgNAAgIgKgAgSAAIAAAfQAGALAMAAQAJAAAFgHQAFgHAAgOQAAgNgFgGQgFgHgJAAQgMAAgGAMg");
	this.shape_1838.setTransform(765.125,142.275);

	this.shape_1839 = new cjs.Shape();
	this.shape_1839.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIAMAAIAAAvQABARANAAQANAAAGgLIAAg1IAMAAIAABJIgMAAIAAgHQgIAJgNAAQgMAAgGgHg");
	this.shape_1839.setTransform(757.2,143.825);

	this.shape_1840 = new cjs.Shape();
	this.shape_1840.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1840.setTransform(750.875,142.925);

	this.shape_1841 = new cjs.Shape();
	this.shape_1841.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_1841.setTransform(741.025,145.125);

	this.shape_1842 = new cjs.Shape();
	this.shape_1842.graphics.f("#FFFFFF").s().p("AARAmIAAgwQAAgIgEgEQgDgEgIAAQgFAAgFADQgFAEgCAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_1842.setTransform(733.35,143.675);

	this.shape_1843 = new cjs.Shape();
	this.shape_1843.graphics.f("#FFFFFF").s().p("AgGAyIAAhJIANAAIAABJgAgEglQgDgCAAgDQAAgDADgDQABgCADAAQAEAAACACQACADgBADQABADgCACQgCACgEAAQgDAAgBgCg");
	this.shape_1843.setTransform(727.8,142.4);

	this.shape_1844 = new cjs.Shape();
	this.shape_1844.graphics.f("#FFFFFF").s().p("AgWArQgIgLAAgRIAAgBQAAgQAIgKQAIgLANAAQAMAAAIAJIAAgmIAMAAIAABoIgLAAIgBgIQgIAJgMAAQgNAAgIgKgAgMgFQgGAHAAAOQAAAMAGAHQAFAHAIAAQAMAAAGgKIAAghQgGgLgMAAQgIAAgFAHg");
	this.shape_1844.setTransform(721.975,142.275);

	this.shape_1845 = new cjs.Shape();
	this.shape_1845.graphics.f("#FFFFFF").s().p("AARAmIAAgwQgBgIgDgEQgEgEgHAAQgGAAgEADQgEAEgEAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_1845.setTransform(714.3,143.675);

	this.shape_1846 = new cjs.Shape();
	this.shape_1846.graphics.f("#FFFFFF").s().p("AgFAyIAAhJIALAAIAABJgAgEglQgCgCAAgDQAAgDACgDQACgCACAAQAEAAABACQACADAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_1846.setTransform(708.75,142.4);

	this.shape_1847 = new cjs.Shape();
	this.shape_1847.graphics.f("#FFFFFF").s().p("AgWArQgIgLAAgRIAAgBQAAgQAIgKQAIgLANAAQAMAAAIAJIAAgmIAMAAIAABoIgLAAIgBgIQgIAJgMAAQgNAAgIgKgAgMgFQgGAHAAAOQAAAMAGAHQAFAHAIAAQAMAAAGgKIAAghQgGgLgMAAQgIAAgFAHg");
	this.shape_1847.setTransform(702.925,142.275);

	this.shape_1848 = new cjs.Shape();
	this.shape_1848.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIAMAAIAAAvQAAARAOAAQANAAAGgLIAAg1IAMAAIAABJIgMAAIAAgHQgIAJgNAAQgMAAgGgHg");
	this.shape_1848.setTransform(691.6,143.825);

	this.shape_1849 = new cjs.Shape();
	this.shape_1849.graphics.f("#FFFFFF").s().p("AgXAgQgGgGAAgJQAAgMAJgFQAIgHAPAAIANAAIAAgGQgBgGgEgEQgEgEgHAAQgGAAgEAEQgGADAAAFIgMAAQAAgGAEgFQAEgFAGgDQAHgDAHgBQANAAAHAHQAIAGAAALIAAAiQAAAKACAGIAAABIgNAAIgBgIQgKAJgLAAQgKAAgIgGgAgRAOQAAAHAEADQAEADAGABQAFAAAGgEQAFgDADgEIAAgQIgKAAQgXAAAAANg");
	this.shape_1849.setTransform(683.95,143.75);

	this.shape_1850 = new cjs.Shape();
	this.shape_1850.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1850.setTransform(677.675,142.925);

	this.shape_1851 = new cjs.Shape();
	this.shape_1851.graphics.f("#FFFFFF").s().p("AgXAgQgGgGAAgJQAAgMAJgFQAIgHAPAAIANAAIAAgGQAAgGgFgEQgEgEgHAAQgGAAgEAEQgGADAAAFIgMAAQAAgGAEgFQAEgFAGgDQAHgDAHgBQANAAAHAHQAHAGABALIAAAiQAAAKACAGIAAABIgNAAIgBgIQgKAJgLAAQgLAAgHgGgAgRAOQAAAHAEADQAEADAGABQAFAAAGgEQAFgDADgEIAAgQIgKAAQgXAAAAANg");
	this.shape_1851.setTransform(671.8,143.75);

	this.shape_1852 = new cjs.Shape();
	this.shape_1852.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQAAgIgDgEQgDgEgIAAQgFAAgFADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_1852.setTransform(660.4,143.675);

	this.shape_1853 = new cjs.Shape();
	this.shape_1853.graphics.f("#FFFFFF").s().p("AgWAgQgIgGABgJQgBgMAKgFQAIgHAPAAIAMAAIAAgGQABgGgEgEQgFgEgHAAQgGAAgFAEQgEADgBAFIgMAAQAAgGAEgFQAEgFAHgDQAHgDAGgBQANAAAIAHQAGAGABALIAAAiQAAAKADAGIAAABIgOAAIgCgIQgJAJgKAAQgMAAgGgGgAgRAOQAAAHAEADQAEADAGABQAFAAAFgEQAGgDACgEIAAgQIgJAAQgXAAAAANg");
	this.shape_1853.setTransform(652.75,143.75);

	this.shape_1854 = new cjs.Shape();
	this.shape_1854.graphics.f("#FFFFFF").s().p("AgXAgQgGgGgBgJQABgMAIgFQAJgHAPAAIANAAIAAgGQgBgGgEgEQgEgEgHAAQgGAAgEAEQgGADAAAFIgMAAQAAgGAEgFQAEgFAGgDQAHgDAIgBQAMAAAHAHQAIAGAAALIAAAiQAAAKACAGIAAABIgNAAIgBgIQgKAJgLAAQgLAAgHgGgAgRAOQAAAHAEADQAEADAGABQAFAAAGgEQAFgDADgEIAAgQIgLAAQgWAAAAANg");
	this.shape_1854.setTransform(645.15,143.75);

	this.shape_1855 = new cjs.Shape();
	this.shape_1855.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQAAgIgDgEQgDgEgIAAQgFAAgFADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_1855.setTransform(637.45,143.675);

	this.shape_1856 = new cjs.Shape();
	this.shape_1856.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgGAAQgMAAgEAKIAAA0g");
	this.shape_1856.setTransform(631.6,143.675);

	this.shape_1857 = new cjs.Shape();
	this.shape_1857.graphics.f("#FFFFFF").s().p("AgVAdQgJgKAAgRIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIgBQAOAAAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPABgJgKgAgLgWQgFAGgBAKIAkAAIAAAAQgBgKgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_1857.setTransform(625.225,143.75);

	this.shape_1858 = new cjs.Shape();
	this.shape_1858.graphics.f("#FFFFFF").s().p("AgWAdQgIgLAAgRIAAgBQAAgLAEgJQAEgIAHgFQAIgEAJgBQAMAAAIAIQAJAIAAALIgMAAQgBgHgEgFQgFgEgHAAQgJAAgFAHQgGAHAAANIAAACQABAMAEAHQAGAHAJAAQAHAAAFgEQAEgEABgHIAMAAQAAAHgEAGQgFAGgGADQgHADgHAAQgOABgKgKg");
	this.shape_1858.setTransform(617.85,143.75);

	this.shape_1859 = new cjs.Shape();
	this.shape_1859.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQABgIgEgEQgDgEgIAAQgGAAgEADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_1859.setTransform(610.2,143.675);

	this.shape_1860 = new cjs.Shape();
	this.shape_1860.graphics.f("#FFFFFF").s().p("AgVAdQgJgKAAgRIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIgBQAOAAAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPABgJgKgAgLgWQgFAGgBAKIAkAAIAAAAQgBgKgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_1860.setTransform(602.725,143.75);

	this.shape_1861 = new cjs.Shape();
	this.shape_1861.graphics.f("#FFFFFF").s().p("AgeA0IAAhmIALAAIABAIQAIgJAMAAQAOAAAIAKQAHAKAAASIAAABQAAAQgHAKQgIALgNAAQgNAAgIgIIAAAjgAgSgeIAAAiQAGAKAMAAQAIAAAFgGQAGgIAAgNQAAgMgGgIQgFgHgIAAQgMAAgGAKg");
	this.shape_1861.setTransform(595.175,145.1);

	this.shape_1862 = new cjs.Shape();
	this.shape_1862.graphics.f("#FFFFFF").s().p("AARAmIAAgwQAAgIgEgEQgEgEgHAAQgFAAgFADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLAMAAQAYAAAAAbIAAAwg");
	this.shape_1862.setTransform(583.5,143.675);

	this.shape_1863 = new cjs.Shape();
	this.shape_1863.graphics.f("#FFFFFF").s().p("AgXAgQgGgGgBgJQABgMAIgFQAJgHAPAAIANAAIAAgGQgBgGgEgEQgEgEgHAAQgGAAgEAEQgGADABAFIgNAAQAAgGAEgFQAEgFAGgDQAHgDAIgBQAMAAAHAHQAIAGAAALIAAAiQAAAKACAGIAAABIgNAAIgBgIQgKAJgLAAQgLAAgHgGgAgRAOQAAAHAEADQAEADAGABQAFAAAGgEQAFgDADgEIAAgQIgLAAQgWAAAAANg");
	this.shape_1863.setTransform(575.85,143.75);

	this.shape_1864 = new cjs.Shape();
	this.shape_1864.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgGAAQgMAAgEAKIAAA0g");
	this.shape_1864.setTransform(570.05,143.675);

	this.shape_1865 = new cjs.Shape();
	this.shape_1865.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIAMAAIAAAvQAAARAOAAQANAAAGgLIAAg1IAMAAIAABJIgMAAIAAgHQgIAJgNAAQgMAAgGgHg");
	this.shape_1865.setTransform(563.45,143.825);

	this.shape_1866 = new cjs.Shape();
	this.shape_1866.graphics.f("#FFFFFF").s().p("AgFA0IAAhnIALAAIAABng");
	this.shape_1866.setTransform(557.9,142.2);

	this.shape_1867 = new cjs.Shape();
	this.shape_1867.graphics.f("#FFFFFF").s().p("AgWAgQgIgGABgJQgBgMAKgFQAIgHAPAAIANAAIAAgGQgBgGgDgEQgFgEgHAAQgGAAgFAEQgEADgBAFIgMAAQAAgGAEgFQAEgFAHgDQAHgDAGgBQANAAAIAHQAGAGABALIAAAiQAAAKADAGIAAABIgOAAIgBgIQgKAJgKAAQgMAAgGgGgAgRAOQAAAHAEADQAEADAGABQAFAAAFgEQAGgDADgEIAAgQIgKAAQgXAAAAANg");
	this.shape_1867.setTransform(552.4,143.75);

	this.shape_1868 = new cjs.Shape();
	this.shape_1868.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgEgFQgDgGAAgHIAMAAQAAAGAGAEQAEAEAHAAQAHAAAEgDQAFgDAAgEQgBgGgDgCQgEgDgJgDQgKgCgFgCQgGgDgCgDQgDgEAAgFQAAgKAIgGQAHgHALAAQANAAAIAHQAHAGAAALIgMAAQAAgGgFgDQgEgEgHAAQgFAAgEADQgEADgBAFQABAFAEACIALAEQAKACAGADQAFACADAEQADAFAAAGQAAAJgIAGQgHAHgNgBQgIAAgHgDg");
	this.shape_1868.setTransform(545,143.75);

	this.shape_1869 = new cjs.Shape();
	this.shape_1869.graphics.f("#FFFFFF").s().p("AgXAgQgGgGgBgJQABgMAIgFQAJgHAPAAIAMAAIAAgGQAAgGgEgEQgEgEgHAAQgGAAgFAEQgEADAAAFIgNAAQAAgGAEgFQAEgFAGgDQAIgDAHgBQAMAAAIAHQAHAGAAALIAAAiQAAAKACAGIAAABIgNAAIgCgIQgIAJgMAAQgKAAgIgGgAgRAOQAAAHAEADQAEADAGABQAFAAAGgEQAFgDACgEIAAgQIgKAAQgWAAAAANg");
	this.shape_1869.setTransform(533.9,143.75);

	this.shape_1870 = new cjs.Shape();
	this.shape_1870.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgGAAQgMAAgEAKIAAA0g");
	this.shape_1870.setTransform(528.1,143.675);

	this.shape_1871 = new cjs.Shape();
	this.shape_1871.graphics.f("#FFFFFF").s().p("AgWAgQgIgGAAgJQAAgMAJgFQAJgHAPAAIAMAAIAAgGQAAgGgDgEQgFgEgHAAQgGAAgFAEQgEADAAAFIgNAAQAAgGAEgFQAEgFAHgDQAGgDAIgBQAMAAAIAHQAGAGABALIAAAiQAAAKADAGIAAABIgOAAIgCgIQgIAJgLAAQgMAAgGgGgAgRAOQAAAHAEADQAEADAGABQAFAAAFgEQAGgDACgEIAAgQIgKAAQgWAAAAANg");
	this.shape_1871.setTransform(521.55,143.75);

	this.shape_1872 = new cjs.Shape();
	this.shape_1872.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1872.setTransform(515.275,142.925);

	this.shape_1873 = new cjs.Shape();
	this.shape_1873.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQABgIgEgEQgDgEgIAAQgFAAgFADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLANAAQAXAAAAAbIAAAwg");
	this.shape_1873.setTransform(509.3,143.675);

	this.shape_1874 = new cjs.Shape();
	this.shape_1874.graphics.f("#FFFFFF").s().p("AgWAgQgIgGABgJQgBgMAKgFQAIgHAPAAIAMAAIAAgGQAAgGgDgEQgFgEgHAAQgGAAgFAEQgEADAAAFIgNAAQAAgGAEgFQAEgFAHgDQAGgDAHgBQANAAAIAHQAGAGABALIAAAiQAAAKADAGIAAABIgOAAIgCgIQgJAJgKAAQgMAAgGgGgAgRAOQAAAHAEADQAEADAGABQAFAAAFgEQAGgDACgEIAAgQIgJAAQgXAAAAANg");
	this.shape_1874.setTransform(501.65,143.75);

	this.shape_1875 = new cjs.Shape();
	this.shape_1875.graphics.f("#FFFFFF").s().p("AgFAyIAAhJIALAAIAABJgAgEglQgCgCgBgDQABgDACgDQABgCADAAQAEAAACACQABADAAADQAAADgBACQgCACgEAAQgDAAgBgCg");
	this.shape_1875.setTransform(496.15,142.4);

	this.shape_1876 = new cjs.Shape();
	this.shape_1876.graphics.f("#FFFFFF").s().p("AgWArQgIgLAAgRIAAgBQAAgQAIgKQAIgLANAAQAMAAAIAJIAAgmIAMAAIAABoIgLAAIgBgIQgIAJgMAAQgNAAgIgKgAgMgFQgGAHAAAOQAAAMAGAHQAFAHAIAAQAMAAAGgKIAAghQgGgLgMAAQgIAAgFAHg");
	this.shape_1876.setTransform(490.325,142.275);

	this.shape_1877 = new cjs.Shape();
	this.shape_1877.graphics.f("#FFFFFF").s().p("AAQA0IAAgwQAAgHgDgFQgEgDgHAAQgGAAgEADQgEADgEAFIAAA0IgMAAIAAhnIAMAAIAAAoQAJgLANAAQAXAAAAAaIAAAwg");
	this.shape_1877.setTransform(888.9,121.4);

	this.shape_1878 = new cjs.Shape();
	this.shape_1878.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIANAAIAAAvQAAARANAAQAOAAAEgLIAAg1IANAAIAABJIgMAAIgBgHQgGAJgOAAQgMAAgGgHg");
	this.shape_1878.setTransform(881.2,123.025);

	this.shape_1879 = new cjs.Shape();
	this.shape_1879.graphics.f("#FFFFFF").s().p("AgSArIgBAJIgLAAIAAhoIAMAAIAAAnQAIgKANAAQANAAAIALQAHAKAAAQIAAACQAAARgHAKQgIAKgNAAQgNAAgIgKgAgSAAIAAAfQAGALAMAAQAJAAAFgHQAFgHAAgOQAAgNgFgGQgFgHgJAAQgMAAgGAMg");
	this.shape_1879.setTransform(873.575,121.475);

	this.shape_1880 = new cjs.Shape();
	this.shape_1880.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIANAAIAAAvQAAARANAAQANAAAGgLIAAg1IAMAAIAABJIgMAAIAAgHQgIAJgNAAQgMAAgGgHg");
	this.shape_1880.setTransform(865.65,123.025);

	this.shape_1881 = new cjs.Shape();
	this.shape_1881.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1881.setTransform(859.325,122.125);

	this.shape_1882 = new cjs.Shape();
	this.shape_1882.graphics.f("#FFFFFF").s().p("AgWAgQgIgGABgKQgBgLAKgGQAIgGAPAAIANAAIAAgGQAAgGgFgEQgDgEgIAAQgGAAgEAEQgFACgBAGIgMAAQAAgGAEgFQAEgFAHgDQAHgEAGAAQANAAAHAHQAIAGAAAMIAAAhQAAAKADAGIAAABIgOAAIgBgIQgKAKgKAAQgMgBgGgGgAgRAOQAAAHAEADQAEAEAGAAQAFAAAFgEQAGgDADgFIAAgPIgKAAQgXAAAAANg");
	this.shape_1882.setTransform(848.4,122.95);

	this.shape_1883 = new cjs.Shape();
	this.shape_1883.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_1883.setTransform(840.525,124.325);

	this.shape_1884 = new cjs.Shape();
	this.shape_1884.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_1884.setTransform(832.675,124.325);

	this.shape_1885 = new cjs.Shape();
	this.shape_1885.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQAAgIgDgEQgEgEgHAAQgGAAgEADQgEAEgEAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_1885.setTransform(825,122.875);

	this.shape_1886 = new cjs.Shape();
	this.shape_1886.graphics.f("#FFFFFF").s().p("AgXAcQgKgLAAgRIAAAAQAAgKAFgJQAEgJAIgEQAHgFAJgBQAPAAAKALQAJALAAAQIAAABQAAAKgEAKQgEAIgIAEQgIAGgKAAQgOAAgJgLgAgOgUQgGAIAAANQAAAMAGAIQAGAHAIAAQAKAAAFgHQAGgIAAgNQAAgMgGgIQgFgHgKAAQgIAAgGAHg");
	this.shape_1886.setTransform(817.125,122.95);

	this.shape_1887 = new cjs.Shape();
	this.shape_1887.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgGAAQgMAAgEAKIAAA0g");
	this.shape_1887.setTransform(811.15,122.875);

	this.shape_1888 = new cjs.Shape();
	this.shape_1888.graphics.f("#FFFFFF").s().p("AgFAyIAAhIIALAAIAABIgAgFglQgBgCAAgDQAAgDABgDQACgCADAAQAEAAABACQACADABADQgBADgCACQgBACgEAAQgDAAgCgCg");
	this.shape_1888.setTransform(801.65,121.6);

	this.shape_1889 = new cjs.Shape();
	this.shape_1889.graphics.f("#FFFFFF").s().p("AAQA0IgZgiIgIAIIAAAaIgNAAIAAhnIANAAIAAA+IAHgIIAWgYIAPAAIgcAeIAgArg");
	this.shape_1889.setTransform(796.875,121.4);

	this.shape_1890 = new cjs.Shape();
	this.shape_1890.graphics.f("#FFFFFF").s().p("AgGAyIAAhIIANAAIAABIgAgFglQgCgCAAgDQAAgDACgDQADgCACAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgCAAgDgCg");
	this.shape_1890.setTransform(791.15,121.6);

	this.shape_1891 = new cjs.Shape();
	this.shape_1891.graphics.f("#FFFFFF").s().p("AgFA0IAAhnIALAAIAABng");
	this.shape_1891.setTransform(787.75,121.4);

	this.shape_1892 = new cjs.Shape();
	this.shape_1892.graphics.f("#FFFFFF").s().p("AgFAyIAAhIIALAAIAABIgAgEglQgCgCAAgDQAAgDACgDQACgCACAAQAEAAABACQACADAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_1892.setTransform(784.35,121.6);

	this.shape_1893 = new cjs.Shape();
	this.shape_1893.graphics.f("#FFFFFF").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_1893.setTransform(776.525,122.875);

	this.shape_1894 = new cjs.Shape();
	this.shape_1894.graphics.f("#FFFFFF").s().p("AgVAdQgJgKAAgRIAAgCQAAgKAEgJQAEgJAIgEQAHgFAIgBQAOAAAIAKQAIAKAAARIAAAEIgxAAQABALAGAHQAGAHAIAAQAHAAAFgDQAEgDAEgEIAHAGQgJAPgSAAQgPAAgJgKgAgLgWQgFAGgBALIAkAAIAAgBQgBgLgEgFQgFgFgIAAQgHAAgFAFg");
	this.shape_1894.setTransform(766.775,122.95);

	this.shape_1895 = new cjs.Shape();
	this.shape_1895.graphics.f("#FFFFFF").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_1895.setTransform(756.875,122.875);

	this.shape_1896 = new cjs.Shape();
	this.shape_1896.graphics.f("#FFFFFF").s().p("AAQA0IgZgiIgIAIIAAAaIgNAAIAAhnIANAAIAAA+IAHgIIAWgYIAPAAIgcAeIAgArg");
	this.shape_1896.setTransform(742.625,121.4);

	this.shape_1897 = new cjs.Shape();
	this.shape_1897.graphics.f("#FFFFFF").s().p("AgXAgQgGgGAAgKQAAgLAJgGQAIgGAPAAIANAAIAAgGQAAgGgFgEQgEgEgHAAQgGAAgEAEQgGACAAAGIgMAAQAAgGAEgFQAEgFAGgDQAHgEAHAAQANAAAHAHQAHAGABAMIAAAhQAAAKACAGIAAABIgNAAIgBgIQgKAKgLAAQgLgBgHgGgAgRAOQAAAHAEADQAEAEAGAAQAFAAAGgEQAFgDADgFIAAgPIgKAAQgXAAAAANg");
	this.shape_1897.setTransform(734.8,122.95);

	this.shape_1898 = new cjs.Shape();
	this.shape_1898.graphics.f("#FFFFFF").s().p("AgWArQgIgLAAgRIAAgBQAAgQAIgKQAIgLANAAQAMAAAIAJIAAgmIAMAAIAABoIgLAAIgBgIQgIAJgMAAQgNAAgIgKgAgMgFQgGAHAAAOQAAAMAGAHQAFAHAIAAQAMAAAGgKIAAghQgGgLgMAAQgIAAgFAHg");
	this.shape_1898.setTransform(726.875,121.475);

	this.shape_1899 = new cjs.Shape();
	this.shape_1899.graphics.f("#FFFFFF").s().p("AgGAyIAAhIIANAAIAABIgAgFglQgCgCAAgDQAAgDACgDQADgCACAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgCAAgDgCg");
	this.shape_1899.setTransform(721.4,121.6);

	this.shape_1900 = new cjs.Shape();
	this.shape_1900.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1900.setTransform(717.225,122.125);

	this.shape_1901 = new cjs.Shape();
	this.shape_1901.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_1901.setTransform(706.025,124.325);

	this.shape_1902 = new cjs.Shape();
	this.shape_1902.graphics.f("#FFFFFF").s().p("AARAmIAAgwQgBgIgDgEQgDgEgIAAQgFAAgFADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_1902.setTransform(698.35,122.875);

	this.shape_1903 = new cjs.Shape();
	this.shape_1903.graphics.f("#FFFFFF").s().p("AgXAgQgGgGAAgKQAAgLAJgGQAIgGAPAAIANAAIAAgGQgBgGgEgEQgEgEgHAAQgGAAgEAEQgGACAAAGIgMAAQAAgGAEgFQAEgFAGgDQAHgEAHAAQANAAAHAHQAIAGAAAMIAAAhQAAAKACAGIAAABIgNAAIgBgIQgKAKgLAAQgKgBgIgGgAgRAOQAAAHAEADQAEAEAGAAQAFAAAGgEQAFgDADgFIAAgPIgKAAQgXAAAAANg");
	this.shape_1903.setTransform(690.7,122.95);

	this.shape_1904 = new cjs.Shape();
	this.shape_1904.graphics.f("#FFFFFF").s().p("AgVAzIgGAAIAAgKIAEAAQAGAAAEgDQAEgCACgIIADgHIgahIIANAAIASA3IARg3IAOAAIgeBVQgGASgPAAg");
	this.shape_1904.setTransform(683.6,124.45);

	this.shape_1905 = new cjs.Shape();
	this.shape_1905.graphics.f("#FFFFFF").s().p("AARAmIAAgwQgBgIgDgEQgDgEgIAAQgFAAgFADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_1905.setTransform(671.35,122.875);

	this.shape_1906 = new cjs.Shape();
	this.shape_1906.graphics.f("#FFFFFF").s().p("AgXAgQgGgGAAgKQAAgLAJgGQAIgGAPAAIANAAIAAgGQgBgGgEgEQgEgEgHAAQgGAAgEAEQgGACAAAGIgMAAQAAgGAEgFQAEgFAGgDQAHgEAHAAQANAAAHAHQAIAGAAAMIAAAhQAAAKACAGIAAABIgNAAIgBgIQgKAKgLAAQgKgBgIgGgAgRAOQAAAHAEADQAEAEAGAAQAFAAAGgEQAFgDADgFIAAgPIgKAAQgXAAAAANg");
	this.shape_1906.setTransform(663.7,122.95);

	this.shape_1907 = new cjs.Shape();
	this.shape_1907.graphics.f("#FFFFFF").s().p("AARAlIgRg3IgRA3IgKAAIgVhJIAMAAIAPA3IARg3IAJAAIASA4IAOg4IANAAIgWBJg");
	this.shape_1907.setTransform(654.65,122.95);

	this.shape_1908 = new cjs.Shape();
	this.shape_1908.graphics.f("#FFFFFF").s().p("AgVAdQgJgKAAgRIAAgCQAAgKAEgJQAEgJAIgEQAHgFAIgBQAOAAAIAKQAIAKAAARIAAAEIgxAAQABALAGAHQAGAHAIAAQAHAAAFgDQAEgDAEgEIAHAGQgJAPgSAAQgPAAgJgKgAgLgWQgFAGgBALIAkAAIAAgBQgBgLgEgFQgFgFgIAAQgHAAgFAFg");
	this.shape_1908.setTransform(645.775,122.95);

	this.shape_1909 = new cjs.Shape();
	this.shape_1909.graphics.f("#FFFFFF").s().p("AARA0IAAgwQgBgHgDgFQgEgDgHAAQgGAAgEADQgFADgDAFIAAA0IgMAAIAAhnIAMAAIAAAoQAJgLANAAQAXAAAAAaIAAAwg");
	this.shape_1909.setTransform(638.15,121.4);

	this.shape_1910 = new cjs.Shape();
	this.shape_1910.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIANAAIAAAvQAAARANAAQAOAAAEgLIAAg1IANAAIAABJIgMAAIgBgHQgGAJgOAAQgMAAgGgHg");
	this.shape_1910.setTransform(625.4,123.025);

	this.shape_1911 = new cjs.Shape();
	this.shape_1911.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1911.setTransform(619.075,122.125);

	this.shape_1912 = new cjs.Shape();
	this.shape_1912.graphics.f("#FFFFFF").s().p("AgGAyIAAhIIANAAIAABIgAgEglQgDgCAAgDQAAgDADgDQABgCADAAQAEAAACACQACADgBADQABADgCACQgCACgEAAQgDAAgBgCg");
	this.shape_1912.setTransform(615.3,121.6);

	this.shape_1913 = new cjs.Shape();
	this.shape_1913.graphics.f("#FFFFFF").s().p("AgXAgQgGgGAAgKQAAgLAJgGQAIgGAPAAIANAAIAAgGQAAgGgFgEQgDgEgIAAQgGAAgEAEQgGACAAAGIgMAAQAAgGAEgFQAEgFAGgDQAHgEAHAAQANAAAHAHQAIAGAAAMIAAAhQAAAKACAGIAAABIgNAAIgBgIQgKAKgLAAQgKgBgIgGgAgRAOQAAAHAEADQAEAEAGAAQAFAAAGgEQAFgDADgFIAAgPIgKAAQgXAAAAANg");
	this.shape_1913.setTransform(609.8,122.95);

	this.shape_1914 = new cjs.Shape();
	this.shape_1914.graphics.f("#FFFFFF").s().p("AgVAzIgGAAIAAgKIAEAAQAGAAAEgDQAEgCACgIIADgHIgahIIANAAIASA3IARg3IAOAAIgeBVQgGASgPAAg");
	this.shape_1914.setTransform(602.7,124.45);

	this.shape_1915 = new cjs.Shape();
	this.shape_1915.graphics.f("#FFFFFF").s().p("AgFAyIAAhIIALAAIAABIgAgEglQgCgCAAgDQAAgDACgDQACgCACAAQAEAAABACQACADAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_1915.setTransform(592.65,121.6);

	this.shape_1916 = new cjs.Shape();
	this.shape_1916.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQAAgIgDgEQgDgEgIAAQgGAAgEADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_1916.setTransform(587.05,122.875);

	this.shape_1917 = new cjs.Shape();
	this.shape_1917.graphics.f("#FFFFFF").s().p("AgFAyIAAhIIALAAIAABIgAgEglQgCgCAAgDQAAgDACgDQACgCACAAQAEAAABACQACADAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_1917.setTransform(581.5,121.6);

	this.shape_1918 = new cjs.Shape();
	this.shape_1918.graphics.f("#FFFFFF").s().p("AARA0IAAgwQAAgHgEgFQgDgDgIAAQgFAAgFADQgFADgCAFIAAA0IgNAAIAAhnIANAAIAAAoQAIgLAMAAQAYAAAAAaIAAAwg");
	this.shape_1918.setTransform(570.9,121.4);

	this.shape_1919 = new cjs.Shape();
	this.shape_1919.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIAMAAIAAAvQAAARAOAAQAOAAAEgLIAAg1IANAAIAABJIgMAAIgBgHQgGAJgOAAQgMAAgGgHg");
	this.shape_1919.setTransform(563.2,123.025);

	this.shape_1920 = new cjs.Shape();
	this.shape_1920.graphics.f("#FFFFFF").s().p("AgSArIgBAJIgLAAIAAhoIAMAAIAAAnQAIgKANAAQANAAAIALQAHAKAAAQIAAACQAAARgHAKQgIAKgNAAQgNAAgIgKgAgSAAIAAAfQAGALAMAAQAJAAAFgHQAFgHAAgOQAAgNgFgGQgFgHgJAAQgMAAgGAMg");
	this.shape_1920.setTransform(555.575,121.475);

	this.shape_1921 = new cjs.Shape();
	this.shape_1921.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIANAAIAAAvQAAARANAAQAOAAAEgLIAAg1IANAAIAABJIgMAAIgBgHQgHAJgNAAQgMAAgGgHg");
	this.shape_1921.setTransform(547.65,123.025);

	this.shape_1922 = new cjs.Shape();
	this.shape_1922.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1922.setTransform(541.325,122.125);

	this.shape_1923 = new cjs.Shape();
	this.shape_1923.graphics.f("#FFFFFF").s().p("AgXAgQgGgGgBgKQABgLAIgGQAJgGAPAAIANAAIAAgGQgBgGgEgEQgEgEgHAAQgGAAgEAEQgGACAAAGIgMAAQAAgGAEgFQAEgFAGgDQAHgEAIAAQAMAAAHAHQAIAGAAAMIAAAhQAAAKACAGIAAABIgNAAIgBgIQgKAKgLAAQgLgBgHgGgAgRAOQAAAHAEADQAEAEAGAAQAFAAAGgEQAFgDADgFIAAgPIgLAAQgWAAAAANg");
	this.shape_1923.setTransform(530.4,122.95);

	this.shape_1924 = new cjs.Shape();
	this.shape_1924.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_1924.setTransform(522.525,124.325);

	this.shape_1925 = new cjs.Shape();
	this.shape_1925.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_1925.setTransform(514.675,124.325);

	this.shape_1926 = new cjs.Shape();
	this.shape_1926.graphics.f("#FFFFFF").s().p("AARAmIAAgwQAAgIgEgEQgEgEgHAAQgFAAgFADQgFAEgCAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_1926.setTransform(507,122.875);

	this.shape_1927 = new cjs.Shape();
	this.shape_1927.graphics.f("#FFFFFF").s().p("AgXAcQgKgLAAgRIAAAAQAAgKAFgJQAEgJAIgEQAHgFAJgBQAPAAAKALQAJALAAAQIAAABQAAAKgEAKQgEAIgIAEQgIAGgKAAQgOAAgJgLgAgOgUQgGAIAAANQAAAMAGAIQAGAHAIAAQAKAAAFgHQAGgIAAgNQAAgMgGgIQgFgHgKAAQgIAAgGAHg");
	this.shape_1927.setTransform(499.125,122.95);

	this.shape_1928 = new cjs.Shape();
	this.shape_1928.graphics.f("#FFFFFF").s().p("AAWAyIgWgpIgWAAIAAApIgNAAIAAhjIAhAAQAQAAAJAIQAJAIAAAOQAAAJgFAHQgFAGgJAEIAXAqIAAABgAgWAAIAUAAQAJAAAGgFQAGgFgBgJQABgJgGgFQgFgFgKAAIgUAAg");
	this.shape_1928.setTransform(491.3,121.675);

	this.shape_1929 = new cjs.Shape();
	this.shape_1929.graphics.f("#FFFFFF").s().p("AgWAgQgIgGAAgKQAAgLAJgGQAJgGAPAAIAMAAIAAgGQAAgGgDgEQgFgEgHAAQgGAAgFAEQgEACAAAGIgNAAQAAgGAEgFQAEgFAHgDQAGgEAHAAQANABAIAGQAGAHABALIAAAhQAAAKADAGIAAABIgOAAIgCgIQgJAKgKAAQgMgBgGgGgAgRAOQAAAGAEAEQAEAEAGAAQAFgBAFgDQAGgDACgFIAAgPIgJAAQgXAAAAANg");
	this.shape_1929.setTransform(654.65,102.15);

	this.shape_1930 = new cjs.Shape();
	this.shape_1930.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1930.setTransform(648.375,101.325);

	this.shape_1931 = new cjs.Shape();
	this.shape_1931.graphics.f("#FFFFFF").s().p("AgWAgQgIgGABgKQgBgLAJgGQAJgGAPAAIAMAAIAAgGQAAgGgDgEQgFgEgHAAQgGAAgFAEQgEACAAAGIgNAAQAAgGAEgFQAEgFAHgDQAGgEAHAAQANABAIAGQAGAHABALIAAAhQAAAKADAGIAAABIgOAAIgCgIQgJAKgKAAQgMgBgGgGgAgRAOQAAAGAEAEQAEAEAGAAQAFgBAFgDQAGgDACgFIAAgPIgKAAQgWAAAAANg");
	this.shape_1931.setTransform(642.5,102.15);

	this.shape_1932 = new cjs.Shape();
	this.shape_1932.graphics.f("#FFFFFF").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_1932.setTransform(632.575,102.075);

	this.shape_1933 = new cjs.Shape();
	this.shape_1933.graphics.f("#FFFFFF").s().p("AgXAcQgKgLAAgRIAAAAQAAgKAFgJQAEgJAIgEQAHgGAJAAQAPAAAKALQAJALAAAQIAAABQAAAKgEAKQgEAIgIAEQgIAGgKAAQgOAAgJgLgAgOgUQgGAIAAANQAAAMAGAIQAGAHAIAAQAKAAAFgHQAGgIAAgNQAAgMgGgIQgFgHgKAAQgIAAgGAHg");
	this.shape_1933.setTransform(622.425,102.15);

	this.shape_1934 = new cjs.Shape();
	this.shape_1934.graphics.f("#FFFFFF").s().p("AgFA0IAAhoIALAAIAABog");
	this.shape_1934.setTransform(616.75,100.6);

	this.shape_1935 = new cjs.Shape();
	this.shape_1935.graphics.f("#FFFFFF").s().p("AgVAdQgJgLAAgQIAAgCQAAgKAEgJQAEgJAIgEQAHgGAIAAQAOAAAIAKQAIAJAAASIAAAFIgxAAQABAKAGAIQAGAGAIAAQAHAAAFgDQAEgDAEgEIAHAGQgJAPgSAAQgPgBgJgJgAgLgVQgFAFgBALIAkAAIAAgBQgBgLgEgEQgFgGgIAAQgHAAgFAGg");
	this.shape_1935.setTransform(611.425,102.15);

	this.shape_1936 = new cjs.Shape();
	this.shape_1936.graphics.f("#FFFFFF").s().p("AgXAcQgKgLAAgRIAAAAQAAgKAFgJQAEgJAIgEQAHgGAJAAQAPAAAKALQAJALAAAQIAAABQAAAKgEAKQgEAIgIAEQgIAGgKAAQgOAAgJgLgAgOgUQgGAIAAANQAAAMAGAIQAGAHAIAAQAKAAAFgHQAGgIAAgNQAAgMgGgIQgFgHgKAAQgIAAgGAHg");
	this.shape_1936.setTransform(603.625,102.15);

	this.shape_1937 = new cjs.Shape();
	this.shape_1937.graphics.f("#FFFFFF").s().p("AgVAdQgJgLAAgRIAAgCQAAgKAEgJQADgIAIgEQAIgGAIAAQANAAAJAIQAHAHABAMIgMAAQAAgGgFgFQgFgFgIAAQgIAAgFAHQgGAHAAANIAAACQAAAMAGAHQAFAHAIAAQAHAAAGgEQAEgEABgHIAMAAQAAAHgEAGQgFAGgGADQgHADgIABQgOgBgIgJg");
	this.shape_1937.setTransform(596.05,102.15);

	this.shape_1938 = new cjs.Shape();
	this.shape_1938.graphics.f("#FFFFFF").s().p("AAeAyIgJgaIgpAAIgJAaIgOAAIAmhjIALAAIAmBjgAgQANIAhAAIgRgug");
	this.shape_1938.setTransform(587.725,100.875);

	this.shape_1939 = new cjs.Shape();
	this.shape_1939.graphics.f("#FFFFFF").s().p("AAQA0IgZgiIgIAIIAAAaIgNAAIAAhoIANAAIAAA/IAHgIIAWgXIAPAAIgcAdIAgArg");
	this.shape_1939.setTransform(576.625,100.6);

	this.shape_1940 = new cjs.Shape();
	this.shape_1940.graphics.f("#FFFFFF").s().p("AgGAyIAAhIIANAAIAABIgAgFglQgCgCAAgDQAAgDACgDQACgBADAAQAEAAABABQADADAAADQAAADgDACQgBACgEAAQgDAAgCgCg");
	this.shape_1940.setTransform(570.9,100.8);

	this.shape_1941 = new cjs.Shape();
	this.shape_1941.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_1941.setTransform(566.725,101.325);

	this.shape_1942 = new cjs.Shape();
	this.shape_1942.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgDgGQgFgFAAgHIANAAQABAGAEAEQAFAEAHAAQAHAAAFgDQADgDAAgFQABgEgEgDQgEgEgJgCQgKgBgFgDQgGgDgCgDQgDgEAAgFQAAgKAHgGQAJgGAKgBQANABAIAGQAIAHAAAKIgNAAQAAgFgEgEQgFgEgHAAQgGAAgEADQgDADAAAFQAAAEADADIANAFQAJABAFADQAHADACADQAEAFAAAFQgBALgHAFQgJAHgMAAQgIgBgHgDg");
	this.shape_1942.setTransform(561.05,102.15);

	this.shape_1943 = new cjs.Shape();
	this.shape_1943.graphics.f("#FFFFFF").s().p("AgWAgQgIgGABgKQgBgLAKgGQAIgGAPAAIANAAIAAgGQAAgGgFgEQgDgEgIAAQgGAAgEAEQgFACgBAGIgMAAQAAgGAEgFQAEgFAHgDQAHgEAGAAQANABAHAGQAIAHAAALIAAAhQAAAKADAGIAAABIgOAAIgBgIQgKAKgKAAQgMgBgGgGgAgRAOQAAAGAEAEQAEAEAGAAQAFgBAFgDQAGgDADgFIAAgPIgKAAQgXAAAAANg");
	this.shape_1943.setTransform(553.65,102.15);

	this.shape_1944 = new cjs.Shape();
	this.shape_1944.graphics.f("#FFFFFF").s().p("AgGA0IAAhoIANAAIAABog");
	this.shape_1944.setTransform(548.15,100.6);

	this.shape_1945 = new cjs.Shape();
	this.shape_1945.graphics.f("#FFFFFF").s().p("AgSArIgBAJIgLAAIAAhoIAMAAIAAAnQAIgKANAAQANAAAIALQAHAKAAAQIAAACQAAARgHAKQgIAKgNAAQgNAAgIgKgAgSAAIAAAfQAGALAMAAQAJAAAFgHQAFgHAAgOQAAgNgFgGQgFgHgJAAQgMAAgGAMg");
	this.shape_1945.setTransform(542.675,100.675);

	this.shape_1946 = new cjs.Shape();
	this.shape_1946.graphics.f("#FFFFFF").s().p("AgXAcQgKgLAAgRIAAAAQAAgKAFgJQAEgJAIgEQAHgGAJAAQAPAAAKALQAJALAAAQIAAABQAAAKgEAKQgEAIgIAEQgIAGgKAAQgOAAgJgLgAgOgUQgGAIAAANQAAAMAGAIQAGAHAIAAQAKAAAFgHQAGgIAAgNQAAgMgGgIQgFgHgKAAQgIAAgGAHg");
	this.shape_1946.setTransform(534.575,102.15);

	this.shape_1947 = new cjs.Shape();
	this.shape_1947.graphics.f("#FFFFFF").s().p("AgGA0IAAhoIANAAIAABog");
	this.shape_1947.setTransform(528.9,100.6);

	this.shape_1948 = new cjs.Shape();
	this.shape_1948.graphics.f("#FFFFFF").s().p("AgeA0IAAhlIALAAIABAIQAIgKAMAAQAOAAAIAKQAHAKAAASIAAABQAAAQgHAKQgIALgNAAQgNAAgIgJIAAAkgAgSgeIAAAiQAGALAMgBQAIABAFgIQAGgHAAgNQAAgMgGgIQgFgHgIAAQgMAAgGAKg");
	this.shape_1948.setTransform(523.425,103.5);

	this.shape_1949 = new cjs.Shape();
	this.shape_1949.graphics.f("#FFFFFF").s().p("AgGAyIAAhIIANAAIAABIgAgEglQgDgCAAgDQAAgDADgDQABgBADAAQAEAAACABQABADAAADQAAADgBACQgCACgEAAQgDAAgBgCg");
	this.shape_1949.setTransform(517.65,100.8);

	this.shape_1950 = new cjs.Shape();
	this.shape_1950.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIAMAAIAAAIQAGgKALAAIAGABIAAAMIgHAAQgLAAgFAKIAAA0g");
	this.shape_1950.setTransform(513.95,102.075);

	this.shape_1951 = new cjs.Shape();
	this.shape_1951.graphics.f("#FFFFFF").s().p("AgFAyIAAhYIghAAIAAgLIBNAAIAAALIghAAIAABYg");
	this.shape_1951.setTransform(507.05,100.875);

	this.shape_1952 = new cjs.Shape();
	this.shape_1952.graphics.f("#FFFFFF").s().p("AgFAFQgCgCAAgDQAAgCACgCQACgDADAAQAEAAACADQACACAAACQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_1952.setTransform(497.475,105.175);

	this.shape_1953 = new cjs.Shape();
	this.shape_1953.graphics.f("#FFFFFF").s().p("AAeAyIgJgaIgpAAIgJAaIgOAAIAmhjIALAAIAmBjgAgQANIAhAAIgRgug");
	this.shape_1953.setTransform(491.125,100.875);

	this.instance_11 = new lib.Bitmap26();
	this.instance_11.setTransform(7,4);

	this.asekBtn = new lib.asekBtn();
	this.asekBtn.name = "asekBtn";
	this.asekBtn.setTransform(695.5,233,1,1,0,0,0,187.8,124.4);

	this.sekBtn = new lib.sekBtn();
	this.sekBtn.name = "sekBtn";
	this.sekBtn.setTransform(274.4,231,1,1,0,0,0,184.7,125.4);

	this.Asekbtn = new lib.btnReprAsek();
	this.Asekbtn.name = "Asekbtn";
	this.Asekbtn.setTransform(704.7,436.25,0.7933,0.7933,0,0,0,0.2,0.2);
	this.Asekbtn.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);
	new cjs.ButtonHelper(this.Asekbtn, 0, 1, 2);

	this.btnReprSek = new lib.btnRepr();
	this.btnReprSek.name = "btnReprSek";
	this.btnReprSek.setTransform(276.65,436.25,0.7933,0.7933,0,0,0,0.2,0.2);
	this.btnReprSek.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);
	new cjs.ButtonHelper(this.btnReprSek, 0, 1, 2);

	this.judulKI_6 = new lib.gambarLapisan();
	this.judulKI_6.name = "judulKI_6";
	this.judulKI_6.setTransform(294,228.5,1.0954,4.8226,0,0,0,0.3,0.2);
	this.judulKI_6.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);

	this.judulKI_7 = new lib.judulReprok();
	this.judulKI_7.name = "judulKI_7";
	this.judulKI_7.setTransform(168.75,40.7,0.7842,0.7842);
	this.judulKI_7.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);

	this.instance_12 = new lib.kotakBawah();
	this.instance_12.setTransform(471.85,282.95,1,1.1558);
	this.instance_12.shadow = new cjs.Shadow("rgba(0,0,0,1)",4,4,14);


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
		{src:"images/_2.jpeg", id:"_2"},
		{src:"images/A.png", id:"A"},
		{src:"images/A_1.png", id:"A_1"},
		{src:"images/B.png", id:"B"},
		{src:"images/Bitmap10.png", id:"Bitmap10"},
		{src:"images/Bitmap16.png", id:"Bitmap16"},
		{src:"images/Bitmap18.png", id:"Bitmap18"},
		{src:"images/Bitmap22.png", id:"Bitmap22"},
		{src:"images/Bitmap24.png", id:"Bitmap24"},
		{src:"images/Bitmap26.png", id:"Bitmap26"},
		{src:"images/BAseksual_.png", id:"BAseksual_"},
		{src:"images/Bitmap6.png", id:"Bitmap6"},
		{src:"images/Bitmap7.png", id:"Bitmap7"},
		{src:"images/Bitmap5.png", id:"Bitmap5"},
		{src:"images/Bitmap9.png", id:"Bitmap9"},
		{src:"images/Bitmap8.png", id:"Bitmap8"},
		{src:"images/bookpngcopy.png", id:"bookpngcopy"},
		{src:"images/C.png", id:"C"},
		{src:"images/C_1.png", id:"C_1"},
		{src:"images/D.png", id:"D"},
		{src:"images/DAseksual_.png", id:"DAseksual_"},
		{src:"images/D_1.png", id:"D_1"},
		{src:"images/B_1.png", id:"B_1"},
		{src:"images/E.png", id:"E"},
		{src:"images/F.png", id:"F"},
		{src:"images/CAseksual_.png", id:"CAseksual_"},
		{src:"images/G.png", id:"G"},
		{src:"images/AAseksual_.png", id:"AAseksual_"},
		{src:"images/Judul.png", id:"Judul"},
		{src:"images/E_1.png", id:"E_1"}
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