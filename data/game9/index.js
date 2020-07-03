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



(lib._3 = function() {
	this.initialize(img._3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,452,340);


(lib.Bitmap102 = function() {
	this.initialize(img.Bitmap102);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,229,208);


(lib.Bitmap103 = function() {
	this.initialize(img.Bitmap103);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,421,208);


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


(lib._13 = function() {
	this.initialize(img._13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,594,297);// helper functions:

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


(lib.Tween3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgCAhQgKAAgHgGQgHgGABgJIAKAAQAAAGAEADQADADAGAAQAFAAAEgCQAEgDABgEQABgHgIgDIgKgDQgOgEAAgLQABgIAHgGQAHgFAJAAQAJAAAGAGQAGAFAAAJIgKAAQAAgFgDgDQgDgDgGAAQgEAAgEADQgEACAAAFQgBAFAHADIAFABQALADAEAEQAFAEgBAHQAAAGgDAEQgEAEgGADQgFACgEAAIgCAAg");
	this.shape.setTransform(94.0233,1.0292);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgHAhQgJAAgEgFQgGgGAAgHQABgKAIgFQAJgGAMAAIALAAIABgFQABgFgEgEQgDgDgFAAQgFAAgEADQgEACAAAFIgLAAQAAgGAEgEQAEgEAGgDQAFgCAGAAQAKAAAFAGQAGAGAAAJIgGAfIAAAEQAAAEAAADIAAABIgLAAIAAgEIAAgDQgIAIgIAAIgBAAgAgIAEQgGADgBAGQAAAFACADQADACAFABQAFAAADgDQAFgCADgFIACgNIgHAAQgKAAgEADg");
	this.shape_1.setTransform(87.7,1.0265);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgMAtIAOhZIALAAIgOBZg");
	this.shape_2.setTransform(83.4,-0.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgBAhQgMAAgHgJQgGgIABgOIAAgCQABgIAFgIQAEgIAHgEQAHgEAGAAQAKAAAGAHQAFAGABALIgBAHIAAAEIgpAAQgBAJAEAGQAEAGAIAAQAIAAAIgIIAGAFQgEAGgGADQgGADgGAAIgBAAgAgGgTQgFAFgCAJIAdAAIABgBQABgHgEgFQgDgFgGAAIgCAAQgEAAgFAEg");
	this.shape_3.setTransform(78.7433,1.0281);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgUA3IABgJIAFABQAIAAABgJIALhGIALAAIgMBGQgBAJgEAEQgFAFgIAAIgHgBgAAKgsQAAgBgBAAQAAgBAAAAQgBgBAAgBQAAAAAAgBQAAAAAAgBQAAgBABAAQAAgBAAAAQABgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQABAAAAAAQABAAABAAQAAAAABAAQAAAAABABQAAAAABAAQAAABABAAQAAABAAAAQABABAAABQAAAAAAABQAAAAAAABQAAABgBAAQAAABAAAAQgBABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAQgBAAgBAAQAAAAgBAAQgBAAAAAAQgBAAAAgBQAAAAgBAAg");
	this.shape_4.setTransform(73.425,1.175);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgTAgIALg+IAJAAIgBAHQAGgJAJABIAFAAIgBALIgFgBQgKAAgFAJIgIAsg");
	this.shape_5.setTransform(70.975,0.9737);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgBAhQgMAAgHgJQgGgIABgOIAAgCQABgIAFgIQAEgIAHgEQAHgEAGAAQAKAAAGAHQAFAGABALIgBAHIAAAEIgpAAQgBAJAEAGQAEAGAIAAQAIAAAIgIIAGAFQgEAGgGADQgGADgGAAIgBAAgAgGgTQgFAFgCAJIAdAAIABgBQABgHgEgFQgDgFgGAAIgCAAQgEAAgFAEg");
	this.shape_6.setTransform(65.6933,1.0281);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgeAtIAPhXIAKAAIgBAHQAGgJALABQAJAAAGAGQAFAHAAALIAAAIIgBABQgBAKgEAGQgEAIgGAEQgGAEgHgBQgKAAgGgHIgGAfgAgHgZIgGAdQAEAIAJABQAHAAAGgHQAFgGACgLIAAgFQAAgJgDgEQgDgFgGAAQgJAAgGAJg");
	this.shape_7.setTransform(58.8125,2.1986);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAdAgIAHgpIAAgFQgBgIgKAAQgGAAgEADQgFAEgBAGIgIApIgJAAIAHgoQABgHgDgDQgDgEgGAAQgJAAgGAJIgIAtIgLAAIALg+IAKAAIgBAHQAIgJALABQAGAAADACQAEADACAFQAJgLAMABQAJAAAFAGQAEAGgBALIgHAog");
	this.shape_8.setTransform(50.5591,0.9736);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgBAhQgMAAgHgJQgGgIABgOIAAgCQABgIAFgIQAEgIAHgEQAHgEAGAAQAKAAAGAHQAFAGABALIgBAHIAAAEIgpAAQgBAJAEAGQAEAGAIAAQAIAAAIgIIAGAFQgEAGgGADQgGADgGAAIgBAAgAgGgTQgFAFgCAJIAdAAIABgBQABgHgEgFQgDgFgGAAIgCAAQgEAAgFAEg");
	this.shape_9.setTransform(42.6433,1.0281);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAdAgIAHgpIAAgFQgBgIgKAAQgGAAgEADQgFAEgBAGIgIApIgJAAIAHgoQABgHgDgDQgDgEgGAAQgJAAgGAJIgIAtIgLAAIALg+IAKAAIgBAHQAIgJALABQAGAAADACQAEADACAFQAJgLAMABQAJAAAFAGQAEAGgBALIgHAog");
	this.shape_10.setTransform(34.1091,0.9736);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAJAtIgPgdIgJAHIgDAWIgLAAIAQhZIAKAAIgJA1IAHgHIAVgUIAOAAIgdAaIAUAlg");
	this.shape_11.setTransform(23.525,-0.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgKAgQgJAAgFgGQgEgGABgLIAHgoIALAAIgHAoIAAAFQAAAEACADQACACAEAAQALABAGgKIAIgtIALAAIgMA+IgKAAIACgGQgHAHgKAAIgBAAg");
	this.shape_12.setTransform(17.265,1.0765);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgJAjQgDgEAAgIIAHgmIgLAAIABgJIALAAIADgPIAKAAIgDAPIALAAIgBAJIgMAAIgFAmIAAADQAAAFAEAAIAFgBIgBAJIgHABQgGAAgDgFg");
	this.shape_13.setTransform(12.125,0.325);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAKAgIAHgoIAAgGQgBgIgJAAQgIAAgHAKIgIAsIgLAAIALg+IAKAAIgBAIQAHgKALABQAJAAAEAGQAFAGgCALIgGAog");
	this.shape_14.setTransform(6.4688,0.9738);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgKAgQgJAAgFgGQgEgGABgLIAHgoIALAAIgHAoIAAAFQAAAEACADQACACAEAAQALABAGgKIAIgtIALAAIgMA+IgKAAIACgGQgHAHgKAAIgBAAg");
	this.shape_15.setTransform(0.415,1.0765);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgTAgIALg+IAJAAIgBAHQAGgJAJABIAFAAIgBALIgFgBQgKAAgFAJIgIAsg");
	this.shape_16.setTransform(-7.725,0.9737);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgHAhQgJAAgEgFQgGgGAAgHQABgKAIgFQAJgGAMAAIALAAIABgFQAAgFgCgEQgEgDgFAAQgFAAgDADQgFACgBAFIgKAAQABgGADgEQAEgEAGgDQAFgCAGAAQAKAAAGAGQAFAGgBAJIgFAfIAAAEQgBAEACADIAAABIgMAAIAAgEIAAgDQgIAIgIAAIgBAAgAgJAEQgFADgBAGQAAAFADADQACACAFABQAFAAAEgDQAEgCADgFIADgNIgIAAQgKAAgFADg");
	this.shape_17.setTransform(-13.35,1.0265);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAAAtQgKAAgGgIIgCAHIgKAAIAPhZIALAAIgGAiQAHgJAKABQAJAAAGAGQAFAHAAAKIgBAIIAAABQgBAKgEAHQgEAIgGAEQgFAEgGAAIgCgBgAgJAAIgGAaQAEAKAKAAQAFABAFgEQAFgEACgHQACgHAAgIQAAgIgCgEQgEgFgGAAQgJAAgGAKg");
	this.shape_18.setTransform(-19.85,-0.2472);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAdAgIAHgpIAAgFQgBgIgKAAQgGAAgEADQgFAEgBAGIgIApIgJAAIAHgoQABgHgDgDQgDgEgGAAQgJAAgGAJIgIAtIgLAAIALg+IAKAAIgBAHQAIgJALABQAGAAADACQAEADACAFQAJgLAMABQAJAAAFAGQAEAGgBALIgHAog");
	this.shape_19.setTransform(-28.3409,0.9736);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgHAhQgIAAgGgFQgFgGABgHQAAgKAJgFQAHgGANAAIALAAIABgFQABgFgEgEQgDgDgFAAQgFAAgEADQgDACgBAFIgLAAQAAgGAEgEQAEgEAGgDQAFgCAGAAQAKAAAFAGQAGAGAAAJIgGAfIAAAEQAAAEAAADIAAABIgLAAIAAgEIAAgDQgIAIgIAAIgBAAgAgIAEQgGADgBAGQAAAFACADQADACAFABQAFAAADgDQAFgCADgFIACgNIgIAAQgIAAgFADg");
	this.shape_20.setTransform(-36.6,1.0265);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgIAtQgHAAgGgDQgGgDgDgFIAGgHQAGAJAJAAQAIAAAEgEQAFgFACgIIABgGQgIAIgJAAQgGAAgEgDQgFgDgCgGQgCgGgBgGIABgIQABgKAEgIQAEgIAGgDQAGgEAHAAQALAAAFAIIACgHIAKAAIgKA9QgCANgIAHQgIAHgKAAIgBAAgAgIgcQgGAIgBAMIAAADQAAAHADAFQADAEAGABQAJAAAGgKIAFgcQgDgIgJgBQgIAAgFAHg");
	this.shape_21.setTransform(-43.075,2.2238);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgHAhQgIAAgGgFQgFgGABgHQAAgKAJgFQAHgGANAAIALAAIAAgFQABgFgDgEQgDgDgFAAQgFAAgEADQgDACgBAFIgMAAQABgGAEgEQAEgEAGgDQAFgCAGAAQAKAAAFAGQAGAGAAAJIgGAfIAAAEQgBAEABADIAAABIgKAAIgBgEIABgDQgJAIgIAAIgBAAgAgIAEQgGADAAAGQgBAFACADQADACAFABQAFAAADgDQAFgCAEgFIABgNIgIAAQgJAAgEADg");
	this.shape_22.setTransform(-52.55,1.0265);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgLAtQgIAAgGgGQgFgHAAgLIAAgJQABgJAEgHQAFgIAGgEQAGgEAHABQAKAAAFAHIAHghIAKAAIgPBZIgKAAIABgHQgHAJgKAAIgBgBgAgKgGQgFAEgCAGQgDAHAAAHQAAAJADAEQADAFAHAAQAIABAHgKIAFgcQgEgJgJAAQgFAAgFAEg");
	this.shape_23.setTransform(-58.575,-0.2486);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgHAhQgJAAgEgFQgGgGAAgHQABgKAIgFQAJgGAMAAIALAAIABgFQAAgFgCgEQgEgDgFAAQgFAAgDADQgFACgBAFIgKAAQABgGADgEQAEgEAGgDQAFgCAGAAQAKAAAGAGQAFAGgBAJIgFAfIAAAEQgBAEACADIAAABIgMAAIAAgEIAAgDQgIAIgIAAIgBAAgAgJAEQgFADgBAGQAAAFADADQACACAFABQAFAAAEgDQAEgCADgFIADgNIgIAAQgKAAgFADg");
	this.shape_24.setTransform(-65.55,1.0265);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgeAtIAPhXIAKAAIgBAHQAGgJALABQAJAAAGAGQAFAHAAALIAAAIIgBABQgBAKgEAGQgEAIgGAEQgGAEgHgBQgKAAgGgHIgGAfgAgHgZIgGAdQAEAIAJABQAHAAAGgHQAFgGACgLIAAgFQAAgJgDgEQgDgFgGAAQgJAAgGAJg");
	this.shape_25.setTransform(-72.2875,2.1986);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAJAtIgPgdIgJAHIgDAWIgLAAIAQhZIAKAAIgJA1IAHgHIAVgUIAOAAIgdAaIAUAlg");
	this.shape_26.setTransform(-80.875,-0.3);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgMArIALg+IAKAAIgKA+gAACgfQgBgBAAAAQAAgBAAAAQgBgBAAgBQAAAAAAgBQAAAAAAgBQAAgBABAAQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABgBQAAAAABAAQABAAAAAAQABAAAAAAQABAAABAAQAAAAABABQAAAAABAAQAAABABAAQAAABAAAAQABABAAABQAAAAAAABQAAAAgBABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAQgBAAgBAAQAAAAgBAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_27.setTransform(-85.375,-0.125);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgMAtIAOhZIALAAIgOBZg");
	this.shape_28.setTransform(-88.25,-0.3);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AANArIgVgoIgNALIgFAdIgLAAIAPhVIALAAIgIAqIArgqIAOAAIgnAnIAaAug");
	this.shape_29.setTransform(-93.05,-0.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-99.2,-9.2,198.5,18.4);


(lib.Tween2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgCAhQgKAAgHgGQgHgGABgJIAKAAQAAAGAEADQADADAGAAQAFAAAEgCQAEgDABgEQABgHgIgDIgKgDQgOgEAAgLQABgIAHgGQAHgFAJAAQAJAAAGAGQAGAFAAAJIgKAAQAAgFgDgDQgDgDgGAAQgEAAgEADQgEACAAAFQgBAFAHADIAFABQALADAEAEQAFAEgBAHQAAAGgDAEQgEAEgGADQgFACgEAAIgCAAg");
	this.shape.setTransform(94.0233,1.0292);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgHAhQgJAAgEgFQgGgGAAgHQABgKAIgFQAJgGAMAAIALAAIABgFQABgFgEgEQgDgDgFAAQgFAAgEADQgEACAAAFIgLAAQAAgGAEgEQAEgEAGgDQAFgCAGAAQAKAAAFAGQAGAGAAAJIgGAfIAAAEQAAAEAAADIAAABIgLAAIAAgEIAAgDQgIAIgIAAIgBAAgAgIAEQgGADgBAGQAAAFACADQADACAFABQAFAAADgDQAFgCADgFIACgNIgHAAQgKAAgEADg");
	this.shape_1.setTransform(87.7,1.0265);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgMAtIAOhZIALAAIgOBZg");
	this.shape_2.setTransform(83.4,-0.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgBAhQgMAAgHgJQgGgIABgOIAAgCQABgIAFgIQAEgIAHgEQAHgEAGAAQAKAAAGAHQAFAGABALIgBAHIAAAEIgpAAQgBAJAEAGQAEAGAIAAQAIAAAIgIIAGAFQgEAGgGADQgGADgGAAIgBAAgAgGgTQgFAFgCAJIAdAAIABgBQABgHgEgFQgDgFgGAAIgCAAQgEAAgFAEg");
	this.shape_3.setTransform(78.7433,1.0281);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgUA3IABgJIAFABQAIAAABgJIALhGIALAAIgMBGQgBAJgEAEQgFAFgIAAIgHgBgAAKgsQAAgBgBAAQAAgBAAAAQgBgBAAgBQAAAAAAgBQAAAAAAgBQAAgBABAAQAAgBAAAAQABgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQABAAAAAAQABAAABAAQAAAAABAAQAAAAABABQAAAAABAAQAAABABAAQAAABAAAAQABABAAABQAAAAAAABQAAAAAAABQAAABgBAAQAAABAAAAQgBABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAQgBAAgBAAQAAAAgBAAQgBAAAAAAQgBAAAAgBQAAAAgBAAg");
	this.shape_4.setTransform(73.425,1.175);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgTAgIALg+IAJAAIgBAHQAGgJAJABIAFAAIgBALIgFgBQgKAAgFAJIgIAsg");
	this.shape_5.setTransform(70.975,0.9737);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgBAhQgMAAgHgJQgGgIABgOIAAgCQABgIAFgIQAEgIAHgEQAHgEAGAAQAKAAAGAHQAFAGABALIgBAHIAAAEIgpAAQgBAJAEAGQAEAGAIAAQAIAAAIgIIAGAFQgEAGgGADQgGADgGAAIgBAAgAgGgTQgFAFgCAJIAdAAIABgBQABgHgEgFQgDgFgGAAIgCAAQgEAAgFAEg");
	this.shape_6.setTransform(65.6933,1.0281);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgeAtIAPhXIAKAAIgBAHQAGgJALABQAJAAAGAGQAFAHAAALIAAAIIgBABQgBAKgEAGQgEAIgGAEQgGAEgHgBQgKAAgGgHIgGAfgAgHgZIgGAdQAEAIAJABQAHAAAGgHQAFgGACgLIAAgFQAAgJgDgEQgDgFgGAAQgJAAgGAJg");
	this.shape_7.setTransform(58.8125,2.1986);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAdAgIAHgpIAAgFQgBgIgKAAQgGAAgEADQgFAEgBAGIgIApIgJAAIAHgoQABgHgDgDQgDgEgGAAQgJAAgGAJIgIAtIgLAAIALg+IAKAAIgBAHQAIgJALABQAGAAADACQAEADACAFQAJgLAMABQAJAAAFAGQAEAGgBALIgHAog");
	this.shape_8.setTransform(50.5591,0.9736);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgBAhQgMAAgHgJQgGgIABgOIAAgCQABgIAFgIQAEgIAHgEQAHgEAGAAQAKAAAGAHQAFAGABALIgBAHIAAAEIgpAAQgBAJAEAGQAEAGAIAAQAIAAAIgIIAGAFQgEAGgGADQgGADgGAAIgBAAgAgGgTQgFAFgCAJIAdAAIABgBQABgHgEgFQgDgFgGAAIgCAAQgEAAgFAEg");
	this.shape_9.setTransform(42.6433,1.0281);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAdAgIAHgpIAAgFQgBgIgKAAQgGAAgEADQgFAEgBAGIgIApIgJAAIAHgoQABgHgDgDQgDgEgGAAQgJAAgGAJIgIAtIgLAAIALg+IAKAAIgBAHQAIgJALABQAGAAADACQAEADACAFQAJgLAMABQAJAAAFAGQAEAGgBALIgHAog");
	this.shape_10.setTransform(34.1091,0.9736);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAJAtIgPgdIgJAHIgDAWIgLAAIAQhZIAKAAIgJA1IAHgHIAVgUIAOAAIgdAaIAUAlg");
	this.shape_11.setTransform(23.525,-0.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgKAgQgJAAgFgGQgEgGABgLIAHgoIALAAIgHAoIAAAFQAAAEACADQACACAEAAQALABAGgKIAIgtIALAAIgMA+IgKAAIACgGQgHAHgKAAIgBAAg");
	this.shape_12.setTransform(17.265,1.0765);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgJAjQgDgEAAgIIAHgmIgLAAIABgJIALAAIADgPIAKAAIgDAPIALAAIgBAJIgMAAIgFAmIAAADQAAAFAEAAIAFgBIgBAJIgHABQgGAAgDgFg");
	this.shape_13.setTransform(12.125,0.325);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAKAgIAHgoIAAgGQgBgIgJAAQgIAAgHAKIgIAsIgLAAIALg+IAKAAIgBAIQAHgKALABQAJAAAEAGQAFAGgCALIgGAog");
	this.shape_14.setTransform(6.4688,0.9738);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgKAgQgJAAgFgGQgEgGABgLIAHgoIALAAIgHAoIAAAFQAAAEACADQACACAEAAQALABAGgKIAIgtIALAAIgMA+IgKAAIACgGQgHAHgKAAIgBAAg");
	this.shape_15.setTransform(0.415,1.0765);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgTAgIALg+IAJAAIgBAHQAGgJAJABIAFAAIgBALIgFgBQgKAAgFAJIgIAsg");
	this.shape_16.setTransform(-7.725,0.9737);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgHAhQgJAAgEgFQgGgGAAgHQABgKAIgFQAJgGAMAAIALAAIABgFQAAgFgCgEQgEgDgFAAQgFAAgDADQgFACgBAFIgKAAQABgGADgEQAEgEAGgDQAFgCAGAAQAKAAAGAGQAFAGgBAJIgFAfIAAAEQgBAEACADIAAABIgMAAIAAgEIAAgDQgIAIgIAAIgBAAgAgJAEQgFADgBAGQAAAFADADQACACAFABQAFAAAEgDQAEgCADgFIADgNIgIAAQgKAAgFADg");
	this.shape_17.setTransform(-13.35,1.0265);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAAAtQgKAAgGgIIgCAHIgKAAIAPhZIALAAIgGAiQAHgJAKABQAJAAAGAGQAFAHAAAKIgBAIIAAABQgBAKgEAHQgEAIgGAEQgFAEgGAAIgCgBgAgJAAIgGAaQAEAKAKAAQAFABAFgEQAFgEACgHQACgHAAgIQAAgIgCgEQgEgFgGAAQgJAAgGAKg");
	this.shape_18.setTransform(-19.85,-0.2472);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAdAgIAHgpIAAgFQgBgIgKAAQgGAAgEADQgFAEgBAGIgIApIgJAAIAHgoQABgHgDgDQgDgEgGAAQgJAAgGAJIgIAtIgLAAIALg+IAKAAIgBAHQAIgJALABQAGAAADACQAEADACAFQAJgLAMABQAJAAAFAGQAEAGgBALIgHAog");
	this.shape_19.setTransform(-28.3409,0.9736);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgHAhQgIAAgGgFQgFgGABgHQAAgKAJgFQAHgGANAAIALAAIABgFQABgFgEgEQgDgDgFAAQgFAAgEADQgDACgBAFIgLAAQAAgGAEgEQAEgEAGgDQAFgCAGAAQAKAAAFAGQAGAGAAAJIgGAfIAAAEQAAAEAAADIAAABIgLAAIAAgEIAAgDQgIAIgIAAIgBAAgAgIAEQgGADgBAGQAAAFACADQADACAFABQAFAAADgDQAFgCADgFIACgNIgIAAQgIAAgFADg");
	this.shape_20.setTransform(-36.6,1.0265);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgIAtQgHAAgGgDQgGgDgDgFIAGgHQAGAJAJAAQAIAAAEgEQAFgFACgIIABgGQgIAIgJAAQgGAAgEgDQgFgDgCgGQgCgGgBgGIABgIQABgKAEgIQAEgIAGgDQAGgEAHAAQALAAAFAIIACgHIAKAAIgKA9QgCANgIAHQgIAHgKAAIgBAAgAgIgcQgGAIgBAMIAAADQAAAHADAFQADAEAGABQAJAAAGgKIAFgcQgDgIgJgBQgIAAgFAHg");
	this.shape_21.setTransform(-43.075,2.2238);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgHAhQgIAAgGgFQgFgGABgHQAAgKAJgFQAHgGANAAIALAAIAAgFQABgFgDgEQgDgDgFAAQgFAAgEADQgDACgBAFIgMAAQABgGAEgEQAEgEAGgDQAFgCAGAAQAKAAAFAGQAGAGAAAJIgGAfIAAAEQgBAEABADIAAABIgKAAIgBgEIABgDQgJAIgIAAIgBAAgAgIAEQgGADAAAGQgBAFACADQADACAFABQAFAAADgDQAFgCAEgFIABgNIgIAAQgJAAgEADg");
	this.shape_22.setTransform(-52.55,1.0265);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgLAtQgIAAgGgGQgFgHAAgLIAAgJQABgJAEgHQAFgIAGgEQAGgEAHABQAKAAAFAHIAHghIAKAAIgPBZIgKAAIABgHQgHAJgKAAIgBgBgAgKgGQgFAEgCAGQgDAHAAAHQAAAJADAEQADAFAHAAQAIABAHgKIAFgcQgEgJgJAAQgFAAgFAEg");
	this.shape_23.setTransform(-58.575,-0.2486);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgHAhQgJAAgEgFQgGgGAAgHQABgKAIgFQAJgGAMAAIALAAIABgFQAAgFgCgEQgEgDgFAAQgFAAgDADQgFACgBAFIgKAAQABgGADgEQAEgEAGgDQAFgCAGAAQAKAAAGAGQAFAGgBAJIgFAfIAAAEQgBAEACADIAAABIgMAAIAAgEIAAgDQgIAIgIAAIgBAAgAgJAEQgFADgBAGQAAAFADADQACACAFABQAFAAAEgDQAEgCADgFIADgNIgIAAQgKAAgFADg");
	this.shape_24.setTransform(-65.55,1.0265);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgeAtIAPhXIAKAAIgBAHQAGgJALABQAJAAAGAGQAFAHAAALIAAAIIgBABQgBAKgEAGQgEAIgGAEQgGAEgHgBQgKAAgGgHIgGAfgAgHgZIgGAdQAEAIAJABQAHAAAGgHQAFgGACgLIAAgFQAAgJgDgEQgDgFgGAAQgJAAgGAJg");
	this.shape_25.setTransform(-72.2875,2.1986);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAJAtIgPgdIgJAHIgDAWIgLAAIAQhZIAKAAIgJA1IAHgHIAVgUIAOAAIgdAaIAUAlg");
	this.shape_26.setTransform(-80.875,-0.3);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgMArIALg+IAKAAIgKA+gAACgfQgBgBAAAAQAAgBAAAAQgBgBAAgBQAAAAAAgBQAAAAAAgBQAAgBABAAQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABgBQAAAAABAAQABAAAAAAQABAAAAAAQABAAABAAQAAAAABABQAAAAABAAQAAABABAAQAAABAAAAQABABAAABQAAAAAAABQAAAAgBABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAQgBAAgBAAQAAAAgBAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_27.setTransform(-85.375,-0.125);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgMAtIAOhZIALAAIgOBZg");
	this.shape_28.setTransform(-88.25,-0.3);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AANArIgVgoIgNALIgFAdIgLAAIAPhVIALAAIgIAqIArgqIAOAAIgnAnIAaAug");
	this.shape_29.setTransform(-93.05,-0.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-99.2,-9.2,198.5,18.4);


(lib.Tween1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgCAhQgKAAgHgGQgHgGABgJIAKAAQAAAGAEADQADADAGAAQAFAAAEgCQAEgDABgEQABgHgIgDIgKgDQgOgEAAgLQABgIAHgGQAHgFAJAAQAJAAAGAGQAGAFAAAJIgKAAQAAgFgDgDQgDgDgGAAQgEAAgEADQgEACAAAFQgBAFAHADIAFABQALADAEAEQAFAEgBAHQAAAGgDAEQgEAEgGADQgFACgEAAIgCAAg");
	this.shape.setTransform(94.0233,1.0292);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgHAhQgJAAgEgFQgGgGAAgHQABgKAIgFQAJgGAMAAIALAAIABgFQABgFgEgEQgDgDgFAAQgFAAgEADQgEACAAAFIgLAAQAAgGAEgEQAEgEAGgDQAFgCAGAAQAKAAAFAGQAGAGAAAJIgGAfIAAAEQAAAEAAADIAAABIgLAAIAAgEIAAgDQgIAIgIAAIgBAAgAgIAEQgGADgBAGQAAAFACADQADACAFABQAFAAADgDQAFgCADgFIACgNIgHAAQgKAAgEADg");
	this.shape_1.setTransform(87.7,1.0265);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgMAtIAOhZIALAAIgOBZg");
	this.shape_2.setTransform(83.4,-0.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgBAhQgMAAgHgJQgGgIABgOIAAgCQABgIAFgIQAEgIAHgEQAHgEAGAAQAKAAAGAHQAFAGABALIgBAHIAAAEIgpAAQgBAJAEAGQAEAGAIAAQAIAAAIgIIAGAFQgEAGgGADQgGADgGAAIgBAAgAgGgTQgFAFgCAJIAdAAIABgBQABgHgEgFQgDgFgGAAIgCAAQgEAAgFAEg");
	this.shape_3.setTransform(78.7433,1.0281);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgUA3IABgJIAFABQAIAAABgJIALhGIALAAIgMBGQgBAJgEAEQgFAFgIAAIgHgBgAAKgsQAAgBgBAAQAAgBAAAAQgBgBAAgBQAAAAAAgBQAAAAAAgBQAAgBABAAQAAgBAAAAQABgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQABAAAAAAQABAAABAAQAAAAABAAQAAAAABABQAAAAABAAQAAABABAAQAAABAAAAQABABAAABQAAAAAAABQAAAAAAABQAAABgBAAQAAABAAAAQgBABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAQgBAAgBAAQAAAAgBAAQgBAAAAAAQgBAAAAgBQAAAAgBAAg");
	this.shape_4.setTransform(73.425,1.175);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgTAgIALg+IAJAAIgBAHQAGgJAJABIAFAAIgBALIgFgBQgKAAgFAJIgIAsg");
	this.shape_5.setTransform(70.975,0.9737);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgBAhQgMAAgHgJQgGgIABgOIAAgCQABgIAFgIQAEgIAHgEQAHgEAGAAQAKAAAGAHQAFAGABALIgBAHIAAAEIgpAAQgBAJAEAGQAEAGAIAAQAIAAAIgIIAGAFQgEAGgGADQgGADgGAAIgBAAgAgGgTQgFAFgCAJIAdAAIABgBQABgHgEgFQgDgFgGAAIgCAAQgEAAgFAEg");
	this.shape_6.setTransform(65.6933,1.0281);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgeAtIAPhXIAKAAIgBAHQAGgJALABQAJAAAGAGQAFAHAAALIAAAIIgBABQgBAKgEAGQgEAIgGAEQgGAEgHgBQgKAAgGgHIgGAfgAgHgZIgGAdQAEAIAJABQAHAAAGgHQAFgGACgLIAAgFQAAgJgDgEQgDgFgGAAQgJAAgGAJg");
	this.shape_7.setTransform(58.8125,2.1986);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAdAgIAHgpIAAgFQgBgIgKAAQgGAAgEADQgFAEgBAGIgIApIgJAAIAHgoQABgHgDgDQgDgEgGAAQgJAAgGAJIgIAtIgLAAIALg+IAKAAIgBAHQAIgJALABQAGAAADACQAEADACAFQAJgLAMABQAJAAAFAGQAEAGgBALIgHAog");
	this.shape_8.setTransform(50.5591,0.9736);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgBAhQgMAAgHgJQgGgIABgOIAAgCQABgIAFgIQAEgIAHgEQAHgEAGAAQAKAAAGAHQAFAGABALIgBAHIAAAEIgpAAQgBAJAEAGQAEAGAIAAQAIAAAIgIIAGAFQgEAGgGADQgGADgGAAIgBAAgAgGgTQgFAFgCAJIAdAAIABgBQABgHgEgFQgDgFgGAAIgCAAQgEAAgFAEg");
	this.shape_9.setTransform(42.6433,1.0281);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAdAgIAHgpIAAgFQgBgIgKAAQgGAAgEADQgFAEgBAGIgIApIgJAAIAHgoQABgHgDgDQgDgEgGAAQgJAAgGAJIgIAtIgLAAIALg+IAKAAIgBAHQAIgJALABQAGAAADACQAEADACAFQAJgLAMABQAJAAAFAGQAEAGgBALIgHAog");
	this.shape_10.setTransform(34.1091,0.9736);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAJAtIgPgdIgJAHIgDAWIgLAAIAQhZIAKAAIgJA1IAHgHIAVgUIAOAAIgdAaIAUAlg");
	this.shape_11.setTransform(23.525,-0.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgKAgQgJAAgFgGQgEgGABgLIAHgoIALAAIgHAoIAAAFQAAAEACADQACACAEAAQALABAGgKIAIgtIALAAIgMA+IgKAAIACgGQgHAHgKAAIgBAAg");
	this.shape_12.setTransform(17.265,1.0765);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgJAjQgDgEAAgIIAHgmIgLAAIABgJIALAAIADgPIAKAAIgDAPIALAAIgBAJIgMAAIgFAmIAAADQAAAFAEAAIAFgBIgBAJIgHABQgGAAgDgFg");
	this.shape_13.setTransform(12.125,0.325);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAKAgIAHgoIAAgGQgBgIgJAAQgIAAgHAKIgIAsIgLAAIALg+IAKAAIgBAIQAHgKALABQAJAAAEAGQAFAGgCALIgGAog");
	this.shape_14.setTransform(6.4688,0.9738);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgKAgQgJAAgFgGQgEgGABgLIAHgoIALAAIgHAoIAAAFQAAAEACADQACACAEAAQALABAGgKIAIgtIALAAIgMA+IgKAAIACgGQgHAHgKAAIgBAAg");
	this.shape_15.setTransform(0.415,1.0765);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgTAgIALg+IAJAAIgBAHQAGgJAJABIAFAAIgBALIgFgBQgKAAgFAJIgIAsg");
	this.shape_16.setTransform(-7.725,0.9737);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgHAhQgJAAgEgFQgGgGAAgHQABgKAIgFQAJgGAMAAIALAAIABgFQAAgFgCgEQgEgDgFAAQgFAAgDADQgFACgBAFIgKAAQABgGADgEQAEgEAGgDQAFgCAGAAQAKAAAGAGQAFAGgBAJIgFAfIAAAEQgBAEACADIAAABIgMAAIAAgEIAAgDQgIAIgIAAIgBAAgAgJAEQgFADgBAGQAAAFADADQACACAFABQAFAAAEgDQAEgCADgFIADgNIgIAAQgKAAgFADg");
	this.shape_17.setTransform(-13.35,1.0265);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAAAtQgKAAgGgIIgCAHIgKAAIAPhZIALAAIgGAiQAHgJAKABQAJAAAGAGQAFAHAAAKIgBAIIAAABQgBAKgEAHQgEAIgGAEQgFAEgGAAIgCgBgAgJAAIgGAaQAEAKAKAAQAFABAFgEQAFgEACgHQACgHAAgIQAAgIgCgEQgEgFgGAAQgJAAgGAKg");
	this.shape_18.setTransform(-19.85,-0.2472);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAdAgIAHgpIAAgFQgBgIgKAAQgGAAgEADQgFAEgBAGIgIApIgJAAIAHgoQABgHgDgDQgDgEgGAAQgJAAgGAJIgIAtIgLAAIALg+IAKAAIgBAHQAIgJALABQAGAAADACQAEADACAFQAJgLAMABQAJAAAFAGQAEAGgBALIgHAog");
	this.shape_19.setTransform(-28.3409,0.9736);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgHAhQgIAAgGgFQgFgGABgHQAAgKAJgFQAHgGANAAIALAAIABgFQABgFgEgEQgDgDgFAAQgFAAgEADQgDACgBAFIgLAAQAAgGAEgEQAEgEAGgDQAFgCAGAAQAKAAAFAGQAGAGAAAJIgGAfIAAAEQAAAEAAADIAAABIgLAAIAAgEIAAgDQgIAIgIAAIgBAAgAgIAEQgGADgBAGQAAAFACADQADACAFABQAFAAADgDQAFgCADgFIACgNIgIAAQgIAAgFADg");
	this.shape_20.setTransform(-36.6,1.0265);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgIAtQgHAAgGgDQgGgDgDgFIAGgHQAGAJAJAAQAIAAAEgEQAFgFACgIIABgGQgIAIgJAAQgGAAgEgDQgFgDgCgGQgCgGgBgGIABgIQABgKAEgIQAEgIAGgDQAGgEAHAAQALAAAFAIIACgHIAKAAIgKA9QgCANgIAHQgIAHgKAAIgBAAgAgIgcQgGAIgBAMIAAADQAAAHADAFQADAEAGABQAJAAAGgKIAFgcQgDgIgJgBQgIAAgFAHg");
	this.shape_21.setTransform(-43.075,2.2238);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgHAhQgIAAgGgFQgFgGABgHQAAgKAJgFQAHgGANAAIALAAIAAgFQABgFgDgEQgDgDgFAAQgFAAgEADQgDACgBAFIgMAAQABgGAEgEQAEgEAGgDQAFgCAGAAQAKAAAFAGQAGAGAAAJIgGAfIAAAEQgBAEABADIAAABIgKAAIgBgEIABgDQgJAIgIAAIgBAAgAgIAEQgGADAAAGQgBAFACADQADACAFABQAFAAADgDQAFgCAEgFIABgNIgIAAQgJAAgEADg");
	this.shape_22.setTransform(-52.55,1.0265);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgLAtQgIAAgGgGQgFgHAAgLIAAgJQABgJAEgHQAFgIAGgEQAGgEAHABQAKAAAFAHIAHghIAKAAIgPBZIgKAAIABgHQgHAJgKAAIgBgBgAgKgGQgFAEgCAGQgDAHAAAHQAAAJADAEQADAFAHAAQAIABAHgKIAFgcQgEgJgJAAQgFAAgFAEg");
	this.shape_23.setTransform(-58.575,-0.2486);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgHAhQgJAAgEgFQgGgGAAgHQABgKAIgFQAJgGAMAAIALAAIABgFQAAgFgCgEQgEgDgFAAQgFAAgDADQgFACgBAFIgKAAQABgGADgEQAEgEAGgDQAFgCAGAAQAKAAAGAGQAFAGgBAJIgFAfIAAAEQgBAEACADIAAABIgMAAIAAgEIAAgDQgIAIgIAAIgBAAgAgJAEQgFADgBAGQAAAFADADQACACAFABQAFAAAEgDQAEgCADgFIADgNIgIAAQgKAAgFADg");
	this.shape_24.setTransform(-65.55,1.0265);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgeAtIAPhXIAKAAIgBAHQAGgJALABQAJAAAGAGQAFAHAAALIAAAIIgBABQgBAKgEAGQgEAIgGAEQgGAEgHgBQgKAAgGgHIgGAfgAgHgZIgGAdQAEAIAJABQAHAAAGgHQAFgGACgLIAAgFQAAgJgDgEQgDgFgGAAQgJAAgGAJg");
	this.shape_25.setTransform(-72.2875,2.1986);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAJAtIgPgdIgJAHIgDAWIgLAAIAQhZIAKAAIgJA1IAHgHIAVgUIAOAAIgdAaIAUAlg");
	this.shape_26.setTransform(-80.875,-0.3);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgMArIALg+IAKAAIgKA+gAACgfQgBgBAAAAQAAgBAAAAQgBgBAAgBQAAAAAAgBQAAAAAAgBQAAgBABAAQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABgBQAAAAABAAQABAAAAAAQABAAAAAAQABAAABAAQAAAAABABQAAAAABAAQAAABABAAQAAABAAAAQABABAAABQAAAAAAABQAAAAgBABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAQgBAAgBAAQAAAAgBAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_27.setTransform(-85.375,-0.125);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgMAtIAOhZIALAAIgOBZg");
	this.shape_28.setTransform(-88.25,-0.3);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AANArIgVgoIgNALIgFAdIgLAAIAPhVIALAAIgIAqIArgqIAOAAIgnAnIAaAug");
	this.shape_29.setTransform(-93.05,-0.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-99.2,-9.2,198.5,18.4);


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


(lib.hasil = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgECIIAAkPIAJAAIAAEPg");
	this.shape.setTransform(60.175,99.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgFCDIAAi/IAKAAIAAC/gAgEhhQgBgGAAgIQAAgIABgFQACgGACAAQADAAABAGQACAFAAAIQAAAIgCAGQgBAFgDAAQgCAAgCgFg");
	this.shape_1.setTransform(57.45,100.275);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgLBbQgGgIgDgPQgDgOAAgRIAKAAQABAQADAKQAEAKAGAAQAFAAAEgIQADgHAAgNQAAgNgDgIQgDgHgHgFQgHgGgFgGQgFgIgCgKQgCgKAAgOQAAgYAGgQQAHgQAIAAQAKAAAHARQAGAQAAAbIgKAAQAAgOgEgKQgDgJgGAAQgEAAgDAHQgEAIAAANQAAAMADAGQADAGAHAFQAIAGAEAHQAFAHACALQADAKAAAQQAAAZgHAQQgGAPgKAAQgHAAgFgIg");
	this.shape_2.setTransform(53.075,103.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgSBTQgGgQAAgYQAAgeAHgQQAIgQALAAIAKAAIAAgPQAAgSgDgKQgDgKgGAAQgFAAgDAJQgEAJAAAMIgKAAQAAgOADgNQADgOAFgIQAGgHAFAAQALAAAGAQQAGARAAAdIAABXQAAAaACAQIAAADIgLAAIgBgUQgIAXgIAAQgJAAgGgQgAgNAmQAAAPADAJQADAJAFAAQAEAAAEgIQAFgIABgNIAAgnIgIAAQgRAAAAAjg");
	this.shape_3.setTransform(47.075,103.775);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AAUCBIAAh3IgnAAIAAB3IgLAAIAAkBIALAAIAABvIAnAAIAAhvIALAAIAAEBg");
	this.shape_4.setTransform(39.9,100.475);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFFFFF").ss(3,1,1).p("AqcpnIU6AAIAATPI06AAg");
	this.shape_5.setTransform(48.85,100.7);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(102,153,51,0.318)").s().p("AqcJoIAAzPIU6AAIAATPg");
	this.shape_6.setTransform(48.85,100.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hasil, new cjs.Rectangle(-19.6,37.6,136.9,126.20000000000002), null);


(lib.g3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgFAHQgDgDAAgEQAAgCADgDQACgCADgBQAEAAACADQADACAAADQAAAEgDACQgCADgEAAQgDAAgCgCg");
	this.shape.setTransform(-51.425,-30.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgGA6QgPAAgJgJQgIgIAAgOIAPAAQgBAJAFAFQAEAFAJABQAJAAAHgGQAHgGABgKQAAgKgFgFQgFgFgJAAIgLAAIACgLIAKAAQAJAAAHgFQAHgGABgJQABgJgEgFQgFgGgIAAQgIAAgGAFQgGAGgCAJIgOAAQACgOAKgJQALgJAOAAQAOABAIAIQAIAJgBAOQAAAIgGAHQgFAGgKAFQAIACADAHQAEAGAAAJQgCAQgLAJQgKAKgOAAIgBgBg");
	this.shape_1.setTransform(-57.1958,-35.3987);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgCAhQgKAAgHgGQgHgGABgJIAKAAQAAAGAEADQADADAGAAQAFAAAEgCQAEgDABgEQABgHgIgDIgKgDQgOgEAAgLQABgIAHgGQAHgFAJAAQAJAAAGAGQAGAFAAAJIgKAAQAAgFgDgDQgDgDgGAAQgEAAgEADQgEACAAAFQgBAFAHADIAFABQALADAEAEQAFAEgBAHQAAAGgDAEQgEAEgGADQgFACgEAAIgCAAg");
	this.shape_2.setTransform(55.1233,38.7292);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgMArIALg+IAKAAIgKA+gAACgfQgBgBAAAAQAAgBAAAAQgBgBAAgBQAAAAAAgBQAAAAAAgBQAAgBABAAQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABgBQAAAAABAAQABAAAAAAQABAAAAAAQABAAABAAQAAAAABABQAAAAABAAQAAABABAAQAAABAAAAQAAABABABQAAAAAAABQAAAAgBABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAQgBAAgBAAQAAAAgBAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_3.setTransform(50.875,37.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgMAtIAOhZIALAAIgOBZg");
	this.shape_4.setTransform(48,37.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgHAhQgJAAgEgFQgGgGAAgHQABgKAIgFQAJgGAMAAIALAAIAAgFQABgFgCgEQgDgDgGAAQgFAAgDADQgFACgBAFIgKAAQABgGADgEQAEgEAGgDQAFgCAGAAQAKAAAGAGQAFAGgBAJIgFAfIAAAEQAAAEABADIAAABIgMAAIAAgEIAAgDQgIAIgIAAIgBAAgAgJAEQgFADAAAGQgBAFADADQACACAFABQAFAAAEgDQAEgCAEgFIACgNIgIAAQgJAAgGADg");
	this.shape_5.setTransform(43,38.7265);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAKAgIAHgoIAAgGQgBgIgJAAQgIAAgHAKIgIAsIgLAAIALg+IAKAAIgBAIQAHgKALABQAJAAAEAGQAFAGgCALIgGAog");
	this.shape_6.setTransform(36.4688,38.6738);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgMArIALg+IAKAAIgKA+gAACgfQgBgBAAAAQAAgBAAAAQgBgBAAgBQAAAAAAgBQAAAAAAgBQAAgBABAAQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABgBQAAAAABAAQABAAAAAAQABAAAAAAQABAAABAAQAAAAABABQAAAAABAAQAAABABAAQAAABAAAAQABABAAABQAAAAAAABQAAAAgBABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAQgBAAgBAAQAAAAgBAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_7.setTransform(32.175,37.575);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgDAhQgIAAgFgEQgFgEgDgHQgDgIABgJIAAgBQACgKAEgHQAEgHAHgEQAHgEAHAAQAKAAAGAHQAGAGAAAKIgKAAQAAgGgEgEQgDgEgGAAQgHAAgFAGQgGAHgBAKIAAABIgBAIQABAHADAEQAEAEAGAAQAFAAAEgDQAFgEABgFIAKAAQgBAGgEAFQgEAFgFACQgFADgFAAIgCAAg");
	this.shape_8.setTransform(27.6107,38.7258);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgMArIALg+IAKAAIgKA+gAACgfQgBgBAAAAQAAgBAAAAQgBgBAAgBQAAAAAAgBQAAAAAAgBQAAgBABAAQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABgBQAAAAABAAQABAAAAAAQABAAAAAAQABAAABAAQAAAAABABQAAAAABAAQAAABABAAQAAABAAAAQAAABABABQAAAAAAABQAAAAgBABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAQgBAAgBAAQAAAAgBAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_9.setTransform(23.125,37.575);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgLAtQgIAAgGgGQgFgHAAgLIAAgJQABgJAEgHQAFgIAGgEQAGgEAHABQAKAAAFAHIAHghIAKAAIgPBZIgKAAIABgHQgHAJgKAAIgBgBgAgKgGQgFAEgCAGQgDAHAAAHQAAAJADAEQADAFAHAAQAIABAHgKIAFgcQgEgJgJAAQgFAAgFAEg");
	this.shape_10.setTransform(18.525,37.4514);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgBAhQgMAAgHgJQgGgIABgOIAAgCQABgIAFgIQAEgIAHgEQAHgEAGAAQAKAAAGAHQAFAGABALIgBAHIAAAEIgpAAQgBAJAEAGQAEAGAIAAQAIAAAIgIIAGAFQgEAGgGADQgGADgGAAIgBAAgAgGgTQgFAFgCAJIAdAAIABgBQABgHgEgFQgDgFgGAAIgCAAQgEAAgFAEg");
	this.shape_11.setTransform(11.8933,38.7281);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAdAgIAHgpIAAgFQgBgIgKAAQgGAAgEADQgFAEgBAGIgIApIgJAAIAHgoQABgHgDgDQgDgEgGAAQgJAAgGAJIgIAtIgLAAIALg+IAKAAIgBAHQAIgJALABQAGAAADACQAEADACAFQAJgLAMABQAJAAAFAGQAEAGgBALIgHAog");
	this.shape_12.setTransform(3.3591,38.6736);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgDAhQgIAAgGgEQgFgFgDgHQgDgHABgJQABgJAEgIQAFgHAHgFQAHgEAHAAQAIAAAGAFQAGAEACAHQADAIgBAIIAAABQgBAJgEAHQgFAIgHAEQgGAEgHAAIgBAAgAgJgRQgGAHgBAKIAAABIAAAIQAAAHAEAEQADAEAGAAQAFAAAEgCQAEgDAEgGQADgGAAgGIABgIQgBgIgEgEQgDgEgGAAIgCAAQgGAAgFAGg");
	this.shape_13.setTransform(-7.8518,38.725);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgLAtQgIAAgGgGQgFgHAAgLIAAgJQABgJAEgHQAFgIAGgEQAGgEAHABQAKAAAFAHIAHghIAKAAIgPBZIgKAAIABgHQgHAJgKAAIgBgBgAgKgGQgFAEgCAGQgDAHAAAHQAAAJADAEQADAFAHAAQAIABAHgKIAFgcQgEgJgJAAQgFAAgFAEg");
	this.shape_14.setTransform(-14.175,37.4514);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgKAgQgJAAgFgGQgEgGABgLIAHgoIALAAIgHAoIAAAFQAAAEACADQACACAEAAQALABAGgKIAIgtIALAAIgMA+IgKAAIACgGQgHAHgKAAIgBAAg");
	this.shape_15.setTransform(-20.835,38.7765);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgTAgIALg+IAJAAIgBAHQAGgJAJABIAFAAIgBALIgFgBQgKAAgFAJIgIAsg");
	this.shape_16.setTransform(-26.025,38.6737);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgMArIALg+IAKAAIgKA+gAACgfQgBgBAAAAQAAgBAAAAQgBgBAAgBQAAAAAAgBQAAAAAAgBQAAgBABAAQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABgBQAAAAABAAQABAAAAAAQABAAAAAAQABAAABAAQAAAAABABQAAAAABAAQAAABABAAQAAABAAAAQABABAAABQAAAAAAABQAAAAgBABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAQgBAAgBAAQAAAAgBAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_17.setTransform(-29.575,37.575);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AANArIAHgoIgoAAIgHAoIgLAAIAPhVIALAAIgHAlIApAAIAGglIALAAIgPBVg");
	this.shape_18.setTransform(-35.225,37.625);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FF8C2D").s().p("AoRhWIQjgFIAACyIwjAFg");
	this.shape_19.setTransform(8.575,37.675);

	this.instance = new lib.Bitmap102();
	this.instance.setTransform(-46.45,-46.9,0.4803,0.3461);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g3, new cjs.Rectangle(-63.5,-46.9,127.1,93.8), null);


(lib.g2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgFAHQgDgDAAgEQAAgCADgDQACgCADgBQAEAAACADQADACAAADQAAAEgDACQgCADgEAAQgDAAgCgCg");
	this.shape.setTransform(-51.425,-30.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgnA6IABgLIApgpIAIgHQANgNABgLQACgJgFgFQgEgFgIgBQgKAAgGAGQgHAHgCAKIgOABQABgLAGgIQAFgIAJgEQAIgFAKAAQAOABAJAIQAIAIgBANQgBAPgQAQIgIAHIgjAjIA2AAIgCAMg");
	this.shape_1.setTransform(-57.2887,-35.525);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgCAhQgKAAgHgGQgHgGABgJIAKAAQAAAGAEADQADADAGAAQAFAAAEgCQAEgDABgEQABgHgIgDIgKgDQgOgEAAgLQABgIAHgGQAHgFAJAAQAJAAAGAGQAGAFAAAJIgKAAQAAgFgDgDQgDgDgGAAQgEAAgEADQgEACAAAFQgBAFAHADIAFABQALADAEAEQAFAEgBAHQAAAGgDAEQgEAEgGADQgFACgEAAIgCAAg");
	this.shape_2.setTransform(57.0233,38.8292);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgKAgQgJAAgFgGQgEgGABgLIAHgoIALAAIgHAoIAAAFQAAAEACADQACACAEAAQALABAGgKIAIgtIALAAIgMA+IgKAAIACgGQgHAHgKAAIgBAAg");
	this.shape_3.setTransform(51.015,38.8765);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgMAtIAOhZIALAAIgOBZg");
	this.shape_4.setTransform(46.3,37.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgMAtIAOhZIALAAIgPBZg");
	this.shape_5.setTransform(43.4,37.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgBAhQgMAAgHgJQgGgIABgOIAAgCQABgIAFgIQAEgIAHgEQAHgEAGAAQAKAAAGAHQAFAGABALIgBAHIAAAEIgpAAQgBAJAEAGQAEAGAIAAQAIAAAIgIIAGAFQgEAGgGADQgGADgGAAIgBAAgAgGgTQgFAFgCAJIAdAAIABgBQABgHgEgFQgDgFgGAAIgCAAQgEAAgFAEg");
	this.shape_6.setTransform(38.7433,38.8281);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAAAtQgLAAgFgIIgDAHIgJAAIAQhZIAKAAIgHAiQAJgJAJABQAJAAAGAGQAEAHABAKIgBAIIAAABQgBAKgEAHQgEAIgGAEQgFAEgGAAIgCgBgAgKAAIgFAaQAEAKAKAAQAFABAEgEQAFgEADgHQACgHAAgIQAAgIgCgEQgDgFgHAAQgJAAgHAKg");
	this.shape_7.setTransform(32.1,37.5528);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgKAgQgJAAgFgGQgEgGABgLIAHgoIALAAIgHAoIAAAFQAAAEACADQACACAEAAQALABAGgKIAIgtIALAAIgMA+IgKAAIACgGQgHAHgKAAIgBAAg");
	this.shape_8.setTransform(25.915,38.8765);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgTAgIALg+IAJAAIgBAHQAGgJAJABIAFAAIgBALIgFgBQgKAAgFAJIgIAsg");
	this.shape_9.setTransform(20.725,38.7737);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgCAhQgKAAgHgGQgHgGABgJIAKAAQAAAGAEADQADADAGAAQAFAAAEgCQAEgDABgEQABgHgIgDIgKgDQgOgEAAgLQABgIAHgGQAHgFAJAAQAJAAAGAGQAGAFAAAJIgKAAQAAgFgDgDQgDgDgGAAQgEAAgEADQgEACAAAFQgBAFAHADIAFABQALADAEAEQAFAEgBAHQAAAGgDAEQgEAEgGADQgFACgEAAIgCAAg");
	this.shape_10.setTransform(12.4233,38.8292);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgKAgQgJAAgFgGQgEgGABgLIAHgoIALAAIgHAoIAAAFQAAAEACADQACACAEAAQALABAGgKIAIgtIALAAIgMA+IgKAAIACgGQgHAHgKAAIgBAAg");
	this.shape_11.setTransform(6.415,38.8765);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgDAhQgIAAgFgEQgFgEgDgHQgDgIABgJIAAgBQACgKAEgHQAEgHAHgEQAHgEAHAAQAKAAAGAHQAGAGAAAKIgKAAQAAgGgEgEQgDgEgGAAQgHAAgFAGQgGAHgBAKIAAABIgBAIQABAHADAEQAEAEAGAAQAFAAAEgDQAFgEABgFIAKAAQgBAGgEAFQgEAFgFACQgFADgFAAIgCAAg");
	this.shape_12.setTransform(0.0107,38.8258);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgMArIALg+IAKAAIgKA+gAACgfQgBgBAAAAQAAgBAAAAQgBgBAAgBQAAAAAAgBQAAAAAAgBQAAgBABAAQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABgBQAAAAABAAQABAAAAAAQABAAAAAAQABAAABAAQAAAAABABQAAAAABAAQAAABABAAQAAABAAAAQAAABABABQAAAAAAABQAAAAgBABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAQgBAAgBAAQAAAAgBAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_13.setTransform(-4.475,37.675);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgTAgIALg+IAJAAIgBAHQAGgJAJABIAFAAIgBALIgFgBQgKAAgFAJIgIAsg");
	this.shape_14.setTransform(-7.825,38.7737);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AAAAtQgKAAgGgIIgCAHIgKAAIAPhZIALAAIgGAiQAHgJAKABQAJAAAGAGQAFAHAAAKIgBAIIAAABQgBAKgEAHQgEAIgGAEQgFAEgGAAIgCgBgAgJAAIgGAaQAEAKAKAAQAFABAFgEQAFgEACgHQACgHAAgIQAAgIgCgEQgEgFgGAAQgJAAgGAKg");
	this.shape_15.setTransform(-13.55,37.5528);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAdAgIAHgpIAAgFQgBgIgKAAQgGAAgEADQgFAEgBAGIgIApIgJAAIAHgoQABgHgDgDQgDgEgGAAQgJAAgGAJIgIAtIgLAAIALg+IAKAAIgBAHQAIgJALABQAGAAADACQAEADACAFQAJgLAMABQAJAAAFAGQAEAGgBALIgHAog");
	this.shape_16.setTransform(-22.0409,38.7736);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgKAgQgJAAgFgGQgEgGABgLIAHgoIALAAIgHAoIAAAFQAAAEACADQACACAEAAQALABAGgKIAIgtIALAAIgMA+IgKAAIACgGQgHAHgKAAIgBAAg");
	this.shape_17.setTransform(-29.985,38.8765);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgZArIAPhVIAKAAIgNBMIAnAAIgCAJg");
	this.shape_18.setTransform(-36.7,37.725);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FF8C2D").s().p("AoYhWIQxgFIAACyIwxAFg");
	this.shape_19.setTransform(8.975,37.8);

	this.instance = new lib.Bitmap103();
	this.instance.setTransform(-46.45,-46.95,0.2613,0.3461);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g2, new cjs.Rectangle(-63.5,-46.9,127.1,93.9), null);


(lib.g1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgFAHQgDgDAAgEQAAgCADgDQACgCADgBQAEAAACADQADACAAADQAAAEgDACQgCADgEAAQgDAAgCgCg");
	this.shape.setTransform(-53.175,-31.575);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJA5IAPhfIgcALIACgOIApgPIACAAIgTBxg");
	this.shape_1.setTransform(-58.95,-36.525);

	this.instance = new lib._3();
	this.instance.setTransform(-44.65,-47.85,0.2434,0.2118);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AggAwIAQheIAKAAIgBAIQAIgJALAAQAKAAAGAHQAFAHAAANIAAAHIgBACQAAAKgFAIQgFAIgFAEQgHAEgIAAQgKAAgHgIIgGAhgAgHgcIgHAgQAFAJAJABQAIAAAFgHQAHgHABgMIABgGQAAgJgDgFQgEgFgGAAQgKAAgGAJg");
	this.shape_2.setTransform(33.6,40.175);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgUAdQgHgGAAgKIALAAQAAAGAEADQADAEAHAAQAFAAAEgDQAFgCAAgFQABgHgIgDIgLgEQgPgEABgMQAAgJAIgGQAIgGAJAAQAKABAHAGQAGAFAAAKIgLAAQAAgFgEgDQgDgEgFAAQgFAAgFADQgDADgBAFQgBAGAIACIAFACQALADAFAEQAFAFAAAHQgBAGgDAFQgEAFgGACQgHADgGAAQgKgBgHgGg");
	this.shape_3.setTransform(27.2518,38.925);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgVAaQgHgJABgOIAAgDQABgJAFgJQAFgIAHgEQAHgFAHAAQALABAFAHQAGAGABAMIAAAIIgBAEIgrAAQgBAKAEAGQAEAHAIAAQAJAAAJgJIAGAFQgEAHgHADQgGAEgIAAQgMgBgHgJgAgHgUQgFAFgDAKIAgAAIAAgBQABgIgDgFQgEgGgGAAIgBAAQgGAAgFAFg");
	this.shape_4.setTransform(17.7563,38.925);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgRAfQgGgEgDgIQgCgIAAgJIABgDQABgKAEgHQAFgIAHgEQAHgFAIAAQALABAGAHQAHAHAAAKIgLAAQAAgGgEgFQgDgEgGAAQgIAAgGAHQgGAHgBALIAAABIgBAJQABAHAEAFQADAEAHAAQAFAAAFgEQAEgDACgGIALAAQgBAGgEAFQgFAGgGADQgGADgGAAQgIgBgGgEg");
	this.shape_5.setTransform(11.2208,38.925);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgNAvIAMhEIALAAIgMBEgAACgiQgBgCAAgDQAAgDABgCQACgCADAAQADAAACACQAAABABAAQAAABAAAAQAAABAAAAQAAABAAABQABADgCACQgCACgDAAQgDAAgCgCg");
	this.shape_6.setTransform(6.4,37.675);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAKAjIAIgsIAAgGQgBgJgJAAQgJAAgIALIgJAwIgLAAIAMhEIALAAIgCAJQAIgKAMAAQAJAAAFAHQAEAGgBAMIgHAsg");
	this.shape_7.setTransform(1.0091,38.85);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgZAcQgFgHACgLIAHgsIALAAIgHAsIAAAFQAAAEACADQADACAEABQALAAAHgKIAIgxIALAAIgLBEIgLAAIACgHQgIAIgMAAQgJgBgFgGg");
	this.shape_8.setTransform(-5.4923,39);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgjAuIAQhbIA3AAIgCAKIgrAAIgFAdIAlAAIgBAJIgmAAIgFAhIArAAIgBAKg");
	this.shape_9.setTransform(-12.225,37.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FF8C2D").s().p("AlbhWIK2gFIAACzIq2AEg");
	this.shape_10.setTransform(10.5953,38.1324,1.0647,1.0807);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.instance},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g1, new cjs.Rectangle(-65.3,-48,130.7,96.1), null);


(lib.Path = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#606163").s().p("Ap/z/QEEAADvBlQDkBhCxCyQCxCwBiDmQBkDtAAEEQAAEEhkDuQhiDmixCxQixCxjkBhQjvBkkEAAg");
	this.shape.setTransform(64,127.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,128,255.9), null);


(lib.drop6G10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgGgGgMAAQgKAAgHAFQgHAGAAAHIgUAAQAAgIAGgJQAGgIAKgEQALgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgUAAQgCgDgBgJQgOAOgSAAQgSAAgKgJgAgbAXQAAAKAGAFQAGAFAKAAQAJAAAIgFQAIgFAEgHIAAgYIgPAAQgkAAAAAVg");
	this.shape.setTransform(166.35,42.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_1.setTransform(154.725,42.975);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_2.setTransform(142.725,42.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_3.setTransform(133.975,40.875);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgjBDQgNgRAAgaIAAgBQAAgaANgQQAMgRAVAAQATAAAMAOIAAg8IAUAAIAACjIgSAAIgBgMQgMAOgUAAQgVAAgMgQgAgUgIQgIAKAAAXQAAAUAIAKQAIAMAOAAQASAAAJgRIAAg0QgJgRgSAAQgOAAgIALg");
	this.shape_4.setTransform(124.825,40.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgjAxQgKgLAAgWIAAhKIAUAAIAABKQAAAbAWgBQAVAAAIgRIAAhTIAUAAIAABzIgTAAIAAgMQgMAOgWAAQgSAAgKgKg");
	this.shape_5.setTransform(112.775,43.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgbA7IAAhzIAUAAIAAANQAIgPATAAQAFAAADABIAAATIgJgBQgTAAgHARIAABRg");
	this.shape_6.setTransform(103.6,42.875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_7.setTransform(96.625,40.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AAnBOIAAhIIhNAAIAABIIgVAAIAAibIAVAAIAABDIBNAAIAAhDIAVAAIAACbg");
	this.shape_8.setTransform(86.075,40.975);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,1.199,-161.1,-52.1)).s().p("A5MIJIAAwRMAyZAAAIAAQRg");
	this.shape_9.setTransform(130.5,45.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-30.7,-6.6,322.5,104.3);


(lib.drop6G9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgGgGgMAAQgKAAgHAFQgIAGABAHIgVAAQAAgIAHgJQAGgIALgEQAKgFAMAAQAUAAALAKQALAKABASIAAA0QAAAQAEAKIAAABIgUAAQgDgDgBgJQgOAOgRAAQgSAAgLgJgAgbAXQAAAKAGAFQAHAFAKAAQAIAAAIgFQAIgFAEgHIAAgYIgQAAQgjAAAAAVg");
	this.shape.setTransform(179.55,42.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgDBBQgGgIgBgPIAAhHIgVAAIAAgPIAVAAIAAgcIAUAAIAAAcIAVAAIAAAPIgVAAIAABIQAAAHADADQACAEAHAAIAKgCIAAAQQgIACgIAAQgNAAgGgIg");
	this.shape_1.setTransform(169.65,41.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_2.setTransform(160.725,42.975);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgGgGgMAAQgKAAgHAFQgHAGgBAHIgTAAQAAgIAGgJQAGgIAKgEQALgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgUAAQgCgDgBgJQgPAOgRAAQgSAAgKgJgAgbAXQAAAKAGAFQAGAFAKAAQAJAAAIgFQAIgFAEgHIAAgYIgPAAQgkAAAAAVg");
	this.shape_3.setTransform(148.8,42.975);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AAaBSIAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAijIAUAAIAAA/QANgRAVAAQAkAAABApIAABMg");
	this.shape_4.setTransform(136.825,40.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgiAtQgOgQAAgcIAAgCQAAgRAGgNQAGgOAMgHQAMgHAPAAQATAAANAMQANALABATIgTAAQgBgLgIgHQgHgIgLAAQgPAAgIALQgIALAAAVIAAACQAAAUAIALQAIALAPAAQALAAAHgGQAIgHABgJIATAAQgBAKgGAJQgHAJgKAFQgKAFgMAAQgXAAgOgPg");
	this.shape_5.setTransform(125.2,42.975);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AglAsQgPgQAAgcIAAAAQAAgRAHgOQAGgNAMgIQAMgHAPAAQAYAAAOAQQAPARAAAaIAAABQAAARgHAOQgGANgMAIQgMAHgQAAQgXAAgOgQgAgXgfQgJAMAAAUQAAAUAJALQAJAMAOAAQAPAAAJgMQAJgMAAgUQAAgTgJgMQgJgMgPAAQgOAAgJAMg");
	this.shape_6.setTransform(113.025,42.975);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgYBNQgMgGgGgJIAKgMQANAQASAAQAOAAAIgIQAIgJAAgOIAAgKQgMANgUAAQgUAAgNgQQgMgQAAgcQAAgbAMgQQANgQAUAAQAVAAAMAPIABgNIASAAIAABwQAAAXgOANQgNANgWAAQgMAAgMgFgAgUg1QgIALAAAWQAAAUAIAKQAIAMAOAAQASAAAJgSIAAg0QgJgQgSAAQgOAAgIALg");
	this.shape_7.setTransform(100.35,45.175);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_8.setTransform(91.725,40.875);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgJBSIAAijIATAAIAACjg");
	this.shape_9.setTransform(86.375,40.55);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AggBHQgOgJgHgRQgJgQAAgXIAAgKQAAgWAIgSQAIgRAOgJQAOgJASAAQATAAAOAJQAOAJAIARQAIARAAAXIAAAJQAAAXgIARQgIARgNAJQgPAJgTAAQgRAAgPgJgAgdgvQgMAPgBAbIAAAKQAAAbAMAQQALAPATAAQAUAAALgPQALgOABgbIAAgLQgBgcgKgPQgMgPgUAAQgTAAgKAPg");
	this.shape_10.setTransform(76.1,40.975);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,1.199,-161.1,-52.1)).s().p("A5MIJIAAwRMAyZAAAIAAQRg");
	this.shape_11.setTransform(130.5,45.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-30.7,-6.6,322.5,104.3);


(lib.drop6G8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgGgGgMAAQgKAAgHAFQgHAGAAAHIgUAAQgBgIAHgJQAGgIAKgEQALgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgUAAQgCgDgCgJQgOAOgRAAQgSAAgKgJgAgbAXQAAAKAGAFQAGAFAKAAQAJAAAIgFQAIgFAEgHIAAgYIgPAAQgkAAAAAVg");
	this.shape.setTransform(166.25,42.825);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgDBBQgGgIAAgPIAAhHIgWAAIAAgPIAWAAIAAgcIATAAIAAAcIAVAAIAAAPIgVAAIAABIQAAAHACADQAEAEAGAAIAJgCIAAAQQgHACgHAAQgOAAgGgIg");
	this.shape_1.setTransform(156.35,41.525);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_2.setTransform(147.425,42.825);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQABgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQALAKABASIAAA0QAAAQAEAKIAAABIgVAAQgBgDgBgJQgOAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAGAFAJAAQAIAAAJgFQAJgFADgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_3.setTransform(135.5,42.825);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AAaBTIAAhNQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAGgEAHIAABTIgUAAIAAilIAUAAIAAA/QANgQAVAAQAkAAABApIAABNg");
	this.shape_4.setTransform(123.525,40.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgiAtQgOgQAAgcIAAgCQAAgRAGgNQAGgOAMgHQALgHAPAAQAUAAANAMQANALABATIgTAAQgBgLgIgHQgHgIgMAAQgNAAgJALQgIALAAAVIAAACQAAAUAIALQAJALANAAQALAAAIgGQAIgHABgJIATAAQgBAKgGAJQgGAJgLAFQgLAFgMAAQgWAAgOgPg");
	this.shape_5.setTransform(111.9,42.825);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_6.setTransform(103.325,40.725);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgJBTIAAilIATAAIAAClg");
	this.shape_7.setTransform(97.975,40.4);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AglAsQgPgQAAgcIAAAAQAAgRAHgOQAGgNAMgIQAMgHAPAAQAYAAAOAQQAPARAAAaIAAABQAAARgHAOQgGANgMAIQgMAHgQAAQgXAAgOgQgAgXgfQgJAMAAAUQAAAUAJALQAJAMAOAAQAPAAAJgMQAJgMAAgUQAAgTgJgMQgJgMgPAAQgOAAgJAMg");
	this.shape_8.setTransform(89.025,42.825);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("Ag3BOIAAibIA5AAQAZAAAPANQAOANAAAWQAAAWgOAMQgOAMgbAAIgjAAIAAA9gAgiAAIAkAAQAQAAAJgHQAJgHAAgPQAAgOgJgJQgJgIgPAAIglAAg");
	this.shape_9.setTransform(76.275,40.825);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,1.199,-161.1,-52.1)).s().p("A5MIJIAAwRMAyZAAAIAAQRg");
	this.shape_10.setTransform(125,45.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-36.2,-6.7,322.5,104.2);


(lib.drop6G7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgDBBQgGgIAAgPIAAhHIgWAAIAAgPIAWAAIAAgcIATAAIAAAcIAVAAIAAAPIgVAAIAABIQAAAHACADQADAEAHAAIAJgCIAAAQQgHACgHAAQgOAAgGgIg");
	this.shape.setTransform(220.35,45.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgjAxQgKgLAAgWIAAhKIAUAAIAABKQAAAaAWABQAVgBAIgRIAAhTIAUAAIAABzIgTAAIAAgMQgMAOgWAAQgSAAgKgKg");
	this.shape_1.setTransform(210.975,46.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgdBEIgBANIgSAAIAAijIAUAAIAAA9QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAACQAAAbgMAPQgMARgVgBQgVAAgMgPgAgcgBIAAAxQAJATATAAQANAAAIgMQAIgLAAgWQAAgUgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_2.setTransform(199.025,44.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AA9A7IAAhLQAAgNgFgGQgGgGgOAAQgKAAgIAGQgHAHgBALIAABMIgTAAIAAhLQAAgZgZAAQgUAAgHAQIAABUIgUAAIAAhzIATAAIABANQANgPAVAAQAYAAAJATQAFgJAKgFQAJgFAMAAQAnAAAAAoIAABNg");
	this.shape_3.setTransform(182.95,46.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGABAHIgVAAQAAgIAHgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDgBgJQgNAOgTAAQgRAAgLgJgAgbAXQAAAKAGAFQAGAFALAAQAHAAAJgFQAIgFAEgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_4.setTransform(167.3,46.825);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgbA7IAAhzIATAAIAAANQAKgPARAAQAGAAADABIAAATIgKgBQgSAAgHARIAABRg");
	this.shape_5.setTransform(158.2,46.725);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_6.setTransform(148.225,46.825);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgdBEIgBANIgSAAIAAijIAUAAIAAA9QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAACQAAAbgMAPQgMARgVgBQgVAAgMgPgAgcgBIAAAxQAJATATAAQANAAAIgMQAIgLAAgWQAAgUgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_7.setTransform(136.375,44.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AAZBSIgog1IgMAMIAAApIgUAAIAAijIAUAAIAABjIAKgOIAkglIAYAAIgsAwIAxBDg");
	this.shape_8.setTransform(119.675,44.4);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQABgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDgBgJQgNAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAFAFALAAQAHAAAJgFQAJgFADgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_9.setTransform(107.35,46.825);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgjBDQgNgQAAgbIAAgCQAAgaANgPQAMgRAVAAQATAAAMAOIAAg8IAUAAIAACjIgSAAIgBgMQgMAOgUAAQgVAAgMgQgAgUgIQgIALAAAWQAAATAIALQAIAMAOAAQASAAAJgRIAAg0QgJgRgSAAQgOAAgIALg");
	this.shape_10.setTransform(94.925,44.5);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_11.setTransform(86.325,44.725);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgCBBQgIgIABgPIAAhHIgVAAIAAgPIAVAAIAAgcIASAAIAAAcIAWAAIAAAPIgWAAIAABIQAAAHADADQAEAEAHAAIAJgCIAAAQQgIACgHAAQgOAAgFgIg");
	this.shape_12.setTransform(79.7,45.525);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgYBNQgMgGgHgJIALgMQANAQASAAQAOAAAIgIQAIgJAAgOIAAgKQgMANgTAAQgVAAgNgQQgMgQAAgcQAAgbAMgQQANgQAVAAQAUAAAMAPIABgNIASAAIAABwQAAAXgOANQgNANgWAAQgMAAgMgFgAgUg1QgIALAAAWQAAAUAIAKQAIAMANAAQATAAAJgSIAAg0QgJgQgTAAQgNAAgIALg");
	this.shape_13.setTransform(64.6,49.025);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_14.setTransform(52.575,46.725);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_15.setTransform(43.825,44.725);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgiAtQgOgQAAgcIAAgCQAAgRAGgNQAGgOAMgHQAMgHAOAAQAUAAANAMQANALABATIgTAAQgBgLgIgHQgHgIgMAAQgNAAgJALQgIALAAAVIAAACQAAAUAIALQAJALANAAQALAAAIgGQAIgHABgJIATAAQAAAKgHAJQgGAJgLAFQgKAFgNAAQgWAAgOgPg");
	this.shape_16.setTransform(35.6,46.825);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgGgGgMAAQgKAAgHAFQgHAGgBAHIgTAAQAAgIAGgJQAGgIAKgEQALgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgUAAQgCgDgBgJQgOAOgSAAQgSAAgKgJgAgbAXQAAAKAGAFQAGAFAKAAQAJAAAIgFQAIgFAEgHIAAgYIgPAAQgkAAAAAVg");
	this.shape_17.setTransform(23.7,46.825);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgrA9QgQgUAAgiIAAgOQAAgVAHgRQAJgRAOgIQAOgJARAAQAaAAAPAOQAPAOACAYIgVAAQgCgTgJgIQgJgIgRAAQgSAAgLAOQgMAPABAbIAAAOQgBAZALAPQALAQASAAQARAAAKgIQAJgIACgTIAVAAQgDAYgPAOQgQANgZAAQgbAAgRgTg");
	this.shape_18.setTransform(10.75,44.825);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,1.199,-161.1,-52.1)).s().p("A5LIJIAAwRMAyYAAAIAAQRg");
	this.shape_19.setTransform(134.75,49.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26.5,-2.7,322.5,104.2);


(lib.drop6G6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgCBBQgIgIAAgPIAAhHIgUAAIAAgPIAUAAIAAgcIATAAIAAAcIAWAAIAAAPIgWAAIAABIQAAAHAEADQACAEAIAAIAJgCIAAAQQgIACgIAAQgNAAgFgIg");
	this.shape.setTransform(232.45,41.675);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_1.setTransform(226.525,40.875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AAZBSIgog2IgMAOIAAAoIgUAAIAAijIAUAAIAABiIAKgMIAkgmIAYAAIgsAwIAxBDg");
	this.shape_2.setTransform(219.025,40.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_3.setTransform(210.025,40.875);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgjBDQgNgRAAgaIAAgBQAAgaANgQQAMgRAVAAQATAAAMAOIAAg8IAUAAIAACjIgSAAIgBgMQgMAOgUAAQgVAAgMgQgAgUgIQgIAKAAAXQAAAUAIAKQAIAMAOAAQASAAAJgRIAAg0QgJgRgSAAQgOAAgIALg");
	this.shape_4.setTransform(200.875,40.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_5.setTransform(189.275,42.975);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgWA3QgLgEgGgJQgGgJAAgLIAUAAQAAAKAIAGQAHAGAMAAQALAAAHgEQAGgFAAgIQAAgIgGgEQgGgFgOgDQgPgDgJgEQgJgEgEgGQgEgGAAgJQAAgOAMgKQAMgKASAAQAUAAAMAKQAMAKAAAQIgUAAQAAgIgHgGQgHgGgKAAQgKAAgGAFQgGAFAAAHQAAAHAFAEQAGAEAOADQAPADAJAFQAJAEAFAGQAEAHAAAJQAAAQgMAJQgNAJgTAAQgNAAgLgFg");
	this.shape_6.setTransform(177.625,42.975);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgCBBQgIgIABgPIAAhHIgVAAIAAgPIAVAAIAAgcIASAAIAAAcIAWAAIAAAPIgWAAIAABIQAAAHAEADQACAEAIAAIAJgCIAAAQQgIACgHAAQgOAAgFgIg");
	this.shape_7.setTransform(162.6,41.675);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgjAxQgKgLAAgWIAAhKIAUAAIAABKQAAAbAWgBQAVAAAIgRIAAhTIAUAAIAABzIgTAAIAAgMQgMAOgWAAQgSAAgKgKg");
	this.shape_8.setTransform(153.225,43.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgdBEIgBANIgSAAIAAijIAUAAIAAA9QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAACQAAAagMARQgMAPgVAAQgVAAgMgPgAgcgBIAAAyQAJASATAAQANAAAIgMQAIgKAAgWQAAgVgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_9.setTransform(141.275,40.65);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AA9A7IAAhLQABgNgGgGQgGgGgNAAQgMAAgGAGQgIAHgBALIAABMIgTAAIAAhLQAAgZgZAAQgUAAgGAQIAABUIgUAAIAAhzIASAAIABANQAMgPAXAAQAYAAAHATQAGgJAKgFQAJgFAMAAQAnAAABAoIAABNg");
	this.shape_10.setTransform(125.2,42.875);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgGgGgMAAQgKAAgHAFQgHAGAAAHIgUAAQgBgIAHgJQAGgIAKgEQALgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgUAAQgCgDgCgJQgOAOgRAAQgSAAgKgJgAgbAXQAAAKAGAFQAHAFAJAAQAJAAAIgFQAIgFAEgHIAAgYIgPAAQgkAAAAAVg");
	this.shape_11.setTransform(109.55,42.975);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgbA7IAAhzIAUAAIAAANQAIgPATAAQAFAAADABIAAATIgJgBQgTAAgHARIAABRg");
	this.shape_12.setTransform(100.45,42.875);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_13.setTransform(90.475,42.975);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgdBEIgBANIgSAAIAAijIAUAAIAAA9QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAACQAAAagMARQgMAPgVAAQgVAAgMgPgAgcgBIAAAyQAJASATAAQANAAAIgMQAIgKAAgWQAAgVgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_14.setTransform(78.625,40.65);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgYBNQgMgGgHgJIALgMQANAQATAAQANAAAIgIQAIgJAAgOIAAgKQgMANgTAAQgVAAgMgQQgNgQAAgcQAAgbANgQQAMgQAVAAQAUAAAMAPIABgNIASAAIAABwQAAAXgNANQgOANgWAAQgMAAgMgFgAgUg1QgIALAAAWQAAAUAIAKQAIAMANAAQATAAAJgSIAAg0QgJgQgTAAQgNAAgIALg");
	this.shape_15.setTransform(60.35,45.175);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_16.setTransform(48.325,42.875);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_17.setTransform(39.575,40.875);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgiAtQgOgQAAgcIAAgCQAAgRAGgNQAGgOAMgHQALgHAPAAQAUAAANAMQANALABATIgTAAQgBgLgIgHQgHgIgMAAQgNAAgJALQgIALAAAVIAAACQAAAUAIALQAJALANAAQALAAAIgGQAIgHABgJIATAAQgBAKgGAJQgGAJgLAFQgLAFgMAAQgWAAgOgPg");
	this.shape_18.setTransform(31.35,42.975);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgHAGAAAHIgUAAQgBgIAHgJQAGgIAKgEQALgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgUAAQgCgDgCgJQgOAOgRAAQgSAAgKgJgAgbAXQAAAKAGAFQAHAFAJAAQAJAAAIgFQAJgFADgHIAAgYIgPAAQgkAAAAAVg");
	this.shape_19.setTransform(19.45,42.975);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgqA9QgRgUAAgiIAAgOQAAgVAIgRQAHgRAOgIQAPgJASAAQAYAAAPAOQAQAOACAYIgVAAQgCgTgJgIQgJgIgQAAQgTAAgLAOQgMAPAAAbIAAAOQAAAZALAPQALAQASAAQARAAAKgIQAIgIADgTIAVAAQgCAYgQAOQgPANgaAAQgbAAgQgTg");
	this.shape_20.setTransform(6.5,40.975);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,1.199,-161.1,-52.1)).s().p("A5MIJIAAwRMAyZAAAIAAQRg");
	this.shape_21.setTransform(130.5,45.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-30.7,-6.6,322.5,104.3);


(lib.drop6G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AAZBSIgog2IgMAOIAAAoIgUAAIAAijIAUAAIAABjIAKgOIAkglIAYAAIgsAwIAxBDg");
	this.shape.setTransform(231.775,43.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgGgGgMAAQgKAAgHAFQgHAGgBAHIgTAAQAAgIAGgJQAGgIAKgEQALgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgUAAQgCgDgBgJQgOAOgSAAQgSAAgKgJgAgbAXQAAAKAGAFQAGAFAKAAQAJAAAIgFQAIgFAEgHIAAgYIgPAAQgkAAAAAVg");
	this.shape_1.setTransform(219.45,45.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgjBRIgHgCIAAgQIAGABQAKAAAFgEQAGgEAEgLIAEgMIgqhyIAWAAIAcBXIAbhXIAVAAIgvCFQgJAdgYAAg");
	this.shape_2.setTransform(208.3,47.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_3.setTransform(197.025,45.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgGgGgMAAQgKAAgHAFQgIAGABAHIgVAAQAAgIAHgJQAGgIAKgEQALgFAMAAQAUAAALAKQALAKABASIAAA0QAAAQAEAKIAAABIgUAAQgDgDgBgJQgOAOgRAAQgSAAgLgJgAgbAXQAAAKAGAFQAHAFAKAAQAIAAAIgFQAIgFAEgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_4.setTransform(184.95,45.575);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgdBEIgBANIgSAAIAAijIAUAAIAAA9QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAACQAAAagMARQgMAPgVAAQgVAAgMgPgAgcgBIAAAxQAJATATAAQANAAAIgMQAIgLAAgVQAAgVgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_5.setTransform(173.075,43.25);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgDBBQgGgIAAgPIAAhHIgWAAIAAgPIAWAAIAAgcIATAAIAAAcIAVAAIAAAPIgVAAIAABIQAAAHACADQAEAEAGAAIAJgCIAAAQQgHACgHAAQgOAAgGgIg");
	this.shape_6.setTransform(157.25,44.275);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgjAxQgKgLAAgWIAAhKIAUAAIAABKQAAAbAWAAQAVgBAIgRIAAhTIAUAAIAABzIgTAAIAAgMQgMAOgWAAQgSAAgKgKg");
	this.shape_7.setTransform(147.875,45.7);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgdBEIgBANIgSAAIAAijIAUAAIAAA9QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAACQAAAagMARQgMAPgVAAQgVAAgMgPgAgcgBIAAAxQAJATATAAQANAAAIgMQAIgLAAgVQAAgVgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_8.setTransform(135.925,43.25);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AA+A7IAAhLQgBgNgFgGQgGgGgOAAQgLAAgHAGQgHAHgBALIAABMIgTAAIAAhLQAAgZgZAAQgUAAgHAQIAABUIgUAAIAAhzIATAAIABANQAMgPAWAAQAYAAAJATQAFgJAJgFQAKgFANAAQAmAAAAAoIAABNg");
	this.shape_9.setTransform(119.85,45.475);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQABgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDAAgJQgOAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAFAFALAAQAHAAAJgFQAJgFADgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_10.setTransform(104.2,45.575);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgbA7IAAhzIATAAIAAANQAKgPARAAQAGAAADABIAAATIgKgBQgSAAgHARIAABRg");
	this.shape_11.setTransform(95.1,45.475);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_12.setTransform(85.125,45.575);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgdBEIgBANIgSAAIAAijIAUAAIAAA9QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAACQAAAagMARQgMAPgVAAQgVAAgMgPgAgcgBIAAAxQAJATATAAQANAAAIgMQAIgLAAgVQAAgVgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_13.setTransform(73.275,43.25);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgYBNQgMgGgGgJIAKgMQANAQASAAQAOAAAIgIQAIgJAAgOIAAgKQgMANgUAAQgUAAgMgQQgNgQAAgcQAAgbANgQQAMgQAUAAQAVAAAMAPIABgNIASAAIAABwQAAAXgNANQgOANgWAAQgMAAgMgFgAgUg1QgIALAAAWQAAAUAIAKQAIAMAOAAQASAAAJgSIAAg0QgJgQgSAAQgOAAgIALg");
	this.shape_14.setTransform(55,47.775);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_15.setTransform(42.975,45.475);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_16.setTransform(34.225,43.475);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgiAtQgOgQAAgcIAAgCQAAgRAGgNQAHgOALgHQALgHAQAAQATAAANAMQANALABATIgTAAQgBgLgHgHQgIgIgLAAQgPAAgIALQgIALAAAVIAAACQAAAUAIALQAIALAPAAQAKAAAIgGQAIgHABgJIATAAQgBAKgGAJQgHAJgKAFQgKAFgMAAQgXAAgOgPg");
	this.shape_17.setTransform(26,45.575);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQABgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDAAgJQgOAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAFAFALAAQAHAAAJgFQAJgFADgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_18.setTransform(14.1,45.575);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgrA9QgQgUAAgiIAAgOQAAgVAHgRQAJgRAOgIQAOgJASAAQAYAAAQAOQAOAOADAYIgUAAQgDgTgJgIQgJgIgQAAQgTAAgLAOQgLAPAAAbIAAAOQAAAZAKAPQALAQASAAQARAAAJgIQAJgIAEgTIAUAAQgCAYgQAOQgPANgaAAQgbAAgRgTg");
	this.shape_19.setTransform(1.15,43.575);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,1.199,-161.1,-52.1)).s().p("A5LIJIAAwRMAyXAAAIAAQRg");
	this.shape_20.setTransform(125.15,48.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-36.1,-4,322.5,104.3);


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


(lib.Slots8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// slots
	this.kotakKartu2 = new lib.hasil();
	this.kotakKartu2.name = "kotakKartu2";
	this.kotakKartu2.setTransform(805.9,189.4,1,0.2941,0,0,0,48.9,100.7);

	this.tidak = new lib.drop6G10();
	this.tidak.name = "tidak";
	this.tidak.setTransform(678.8,411.3,0.6033,0.6033,0,0,0,130.4,45.6);
	new cjs.ButtonHelper(this.tidak, 0, 1, 1);

	this.dikit = new lib.drop6G9();
	this.dikit.name = "dikit";
	this.dikit.setTransform(677.8,344.1,0.6033,0.6033,0,0,0,130.4,45.6);
	new cjs.ButtonHelper(this.dikit, 0, 1, 1);

	this.banyak = new lib.drop6G8();
	this.banyak.name = "banyak";
	this.banyak.setTransform(677.7,272.45,0.6033,0.6033,0,0,0,124.7,43.6);
	new cjs.ButtonHelper(this.banyak, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.banyak},{t:this.dikit},{t:this.tidak},{t:this.kotakKartu2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Slots8, new cjs.Rectangle(580.6,170.9,293.69999999999993,271.79999999999995), null);


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


(lib.infoo = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween1("synched",0);

	this.instance_1 = new lib.Tween2("synched",0);
	this.instance_1.setTransform(0,14.45);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween3("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},24).to({state:[{t:this.instance_2}]},25).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,y:14.45},24).wait(26));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},24).to({_off:true,y:0},25).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-99.2,-9.2,198.5,32.9);


(lib.drag6G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_5
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgnA6IABgLIApgpIAIgHQANgNABgLQACgJgFgFQgEgFgIgBQgKAAgGAGQgHAHgCAKIgOABQABgLAGgIQAFgIAJgEQAIgFAKAAQAOABAJAIQAIAIgBANQgBAPgQAQIgIAHIgjAjIA2AAIgCAMg");
	this.shape.setTransform(156.9613,33.975);

	this.jawab = new lib.drop6G6();
	this.jawab.name = "jawab";
	this.jawab.setTransform(81.2,26.2,0.605,0.6043,0,0,0,130.6,45.5);
	new cjs.ButtonHelper(this.jawab, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.jawab},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-5.3,195.1,63);


(lib.drag6G2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgGA6QgPAAgJgJQgIgIAAgOIAPAAQgBAJAFAFQAEAFAJABQAJAAAHgGQAHgGABgKQAAgKgFgFQgFgFgJAAIgLAAIACgLIAKAAQAJAAAHgFQAHgGABgJQABgJgEgFQgFgGgIAAQgIAAgGAFQgGAGgCAJIgOAAQACgOAKgJQALgJAOAAQAOABAIAIQAIAJgBAOQAAAIgGAHQgFAGgKAFQAIACADAHQAEAGAAAJQgCAQgLAJQgKAKgOAAIgBgBg");
	this.shape.setTransform(153.7042,41.7013);

	this.jawab = new lib.drop6G7();
	this.jawab.name = "jawab";
	this.jawab.setTransform(81.05,33.85,0.6063,0.6043,0,0,0,134.8,49.4);
	new cjs.ButtonHelper(this.jawab, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.jawab},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.7,2.4,195.5,63.00000000000001);


(lib.drag6G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgJA5IAQhfIgeALIADgOIApgPIACAAIgTBxg");
	this.shape.setTransform(155.1,34.925);

	this.jawab = new lib.drop6G1();
	this.jawab.name = "jawab";
	this.jawab.setTransform(79.2,27.5,0.6047,0.6043,0,0,0,125.2,48.1);
	new cjs.ButtonHelper(this.jawab, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.jawab},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.3,-3.9,195,63);


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


(lib.pp4 = function(mode,startPosition,loop) {
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
	this.instance = new lib._3();
	this.instance.setTransform(-216,-258,1.1416,1.1416);

	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF83").s().p("AgLAMQgDgEAAgHQAAgGADgFQAFgEAGAAQAHgBAEAFQAFAEgBAGQAAAHgEAEQgFAEgGAAIgBAAQgFAAgFgDg");
	this.shape.setTransform(101.7,160.0253);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF83").s().p("AhJBpIAkjOIAXAAIgCAQQARgUAaABQAVAAAMAQQANAPABAbIgBASIgBACQgDAXgJASQgKASgOAJQgOAJgRAAQgZgBgOgRIgOBIgAgTg+IgMBHQAIAUAWABQASAAANgPQAOgPAEgcIAAgMQAAgUgIgLQgHgLgPAAIgBAAQgUAAgQAUg");
	this.shape_1.setTransform(90.55,156.6244);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF83").s().p("AgvBfQgPgIgJgNQgIgOABgSIAaAAQgBASALALQALAKAUABQATAAANgJQANgJACgPQADgWgagLIgXgIIgIgEQgogRACgiQACgRAKgMQAKgNARgHQARgHARAAQATAAAOAIQAOAIAIAOQAHAOAAARIgbAAQACgSgKgLQgKgKgSAAQgSAAgNAJQgMAJgCAQQgDAUAcALIAUAIIAKAEQAnARgDAjQgBASgKAMQgKAMgRAHQgRAHgTAAQgTgBgQgIg");
	this.shape_2.setTransform(75.871,151.3233);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF83").s().p("AgwA5QgQgUADggIABgFQACgVALgTQALgSAPgKQAQgJARAAQAXAAANAQQAOAPABAZQAAAJgBAJIgBAKIhhAAQgDAVAKAOQAJAOASABQAVABATgVIAOAMQgJAOgPAHQgPAIgRAAQgcgBgQgUgAgPguQgMALgHAXIBIAAIABgDQACgRgIgMQgIgLgOgBIgCAAQgNAAgLAKg");
	this.shape_3.setTransform(53.0914,153.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF83").s().p("AgnBEQgNgJgGgRQgGgRACgVIABgGQACgWAKgRQAKgRAQgKQAQgJATAAQAXABAOAPQAPAQAAAXIgYAAQAAgPgIgJQgIgJgNgBQgTAAgNAPQgNAPgDAaIAAADQgBAJAAAKQABAQAIAJQAJAKAOAAQAMABALgJQALgIADgNIAYAAQgCAOgJAMQgJALgOAHQgOAGgOAAQgTAAgNgKg");
	this.shape_4.setTransform(38.5765,153.8988);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF83").s().p("AgdBmIAaiUIAYAAIgZCUgAAFhMQgEgEAAgGQAAgHAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAHgEAEQgEAEgHABQgGAAgEgFg");
	this.shape_5.setTransform(27.925,151.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFF83").s().p("AAYBNIAQhiIAAgMQgCgUgVAAQgVgBgRAZIgTBqIgZAAIAaiVIAYAAIgEATQATgXAaABQAVAAALAPQAKAOgDAZIgQBig");
	this.shape_6.setTransform(15.875,153.7495);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFF83").s().p("AgYBMQgWgBgKgOQgLgPADgaIAQhgIAZAAIgQBhIAAALQAAAKAGAGQAFAGAJAAQAaABAPgXIAThsIAZAAIgaCVIgYAAIADgPQgRATgZAAIgBgBg");
	this.shape_7.setTransform(1.5417,154.0507);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFF83").s().p("AhOBlIAjjJIB6AAIgEAWIhgAAIgLBBIBUAAIgEAUIhUAAIgMBIIBhAAIgDAWg");
	this.shape_8.setTransform(-13.525,151.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).to({state:[]},1).wait(12));

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
	this.instance = new lib.Bitmap103();
	this.instance.setTransform(-240,-253,1.339,1.7738);

	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AguBAQgPgOAAgVIAZAAQAAANAIAHQAIAIAOAAQANAAAKgGQAKgGABgLQADgPgUgGIgZgIQghgLABgaQABgTARgOQARgMAXAAQAWAAAPANQAOANgBAVIgZAAQABgLgIgHQgHgIgMAAQgNAAgJAHQgIAGgCAKQgCANASAGIALADQAaAIALAJQALAKgBAQQgBAPgIAKQgJAKgNAGQgOAFgOAAQgYAAgQgOg");
	this.shape.setTransform(152.9001,153.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgYBMQgWgBgKgOQgLgPADgaIAQhgIAZAAIgQBhIAAALQAAAKAGAGQAFAGAJAAQAaABAPgXIAThsIAZAAIgaCVIgYAAIADgPQgRATgZAAIgBgBg");
	this.shape_1.setTransform(138.6917,154.0507);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgeBqIAkjTIAZAAIgkDTg");
	this.shape_2.setTransform(127.5,150.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgeBqIAkjTIAZAAIgkDTg");
	this.shape_3.setTransform(120.65,150.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgwA5QgQgUADggIABgFQACgVALgTQALgSAPgKQAQgJARAAQAXAAANAQQAOAPABAZQAAAJgBAJIgBAKIhhAAQgDAVAKAOQAJAOASABQAVABATgVIAOAMQgJAOgPAHQgPAIgRAAQgcgBgQgUgAgPguQgMALgHAXIBIAAIABgDQACgRgIgMQgIgLgOgBIgCAAQgNAAgLAKg");
	this.shape_4.setTransform(109.6914,153.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAABsQgagBgOgUIgEASIgYAAIAljUIAZAAIgPBPQATgUAYABQAWAAAMAQQAMAPAAAaIgBASIAAACQgDAXgJATQgKASgOAJQgNAJgQAAIgCAAgAgYgCIgLBAQAIAXAXABQAOAAALgJQALgJAGgRQAFgRABgSQAAgTgHgLQgHgLgPAAIgBAAQgWAAgQAXg");
	this.shape_5.setTransform(93.9,150.9013);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgYBMQgWgBgKgOQgLgPADgaIAQhgIAZAAIgQBhIAAALQAAAKAGAGQAFAGAJAAQAaABAPgXIAThsIAZAAIgaCVIgYAAIADgPQgRATgZAAIgBgBg");
	this.shape_6.setTransform(79.2917,154.0507);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgvBNIAaiVIAXAAIgCARQAPgVAVABIAMACIgDAYIgLgCQgZAAgNAWIgSBqg");
	this.shape_7.setTransform(67,153.7494);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AguBAQgQgOABgVIAZAAQAAANAIAHQAIAIAOAAQANAAAKgGQAKgGABgLQACgPgTgGIgZgIQghgLABgaQABgTARgOQASgMAWAAQAXAAANANQAOANAAAVIgZAAQAAgLgHgHQgHgIgMAAQgNAAgJAHQgJAGgBAKQgCANASAGIALADQAaAIALAJQALAKgBAQQAAAPgJAKQgJAKgNAGQgOAFgOAAQgZAAgPgOg");
	this.shape_8.setTransform(47.3501,153.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgYBMQgWgBgKgOQgLgPADgaIAQhgIAZAAIgQBhIAAALQAAAKAGAGQAFAGAJAAQAaABAPgXIAThsIAZAAIgaCVIgYAAIADgPQgRATgZAAIgBgBg");
	this.shape_9.setTransform(33.1417,154.0507);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgnBEQgNgJgGgRQgGgRACgVIABgGQACgWAKgRQAKgRAQgKQAQgJATAAQAXABAOAPQAPAQAAAXIgYAAQAAgPgIgJQgIgJgNgBQgTAAgNAPQgNAPgDAaIAAADQgBAJAAAKQABAQAIAJQAJAKAOAAQAMABALgJQALgIADgNIAYAAQgCAOgJAMQgJALgOAHQgOAGgOAAQgTAAgNgKg");
	this.shape_10.setTransform(18.0265,153.8988);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgdBmIAaiUIAYAAIgZCUgAAFhMQgEgEAAgGQAAgHAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAHgEAEQgEAEgHABQgGAAgEgFg");
	this.shape_11.setTransform(7.325,151.15);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgvBNIAaiVIAXAAIgDARQAPgVAWABIAMACIgDAYIgMgCQgYAAgMAWIgTBqg");
	this.shape_12.setTransform(-0.55,153.7494);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAABsQgagBgOgUIgEASIgYAAIAljUIAZAAIgPBPQATgUAYABQAWAAAMAQQAMAPAAAaIgBASIAAACQgDAXgJATQgKASgOAJQgNAJgQAAIgCAAgAgYgCIgLBAQAIAXAXABQAOAAALgJQALgJAFgRQAGgRABgSQAAgTgHgLQgHgLgPAAIgBAAQgWAAgQAXg");
	this.shape_13.setTransform(-14.1,150.9013);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("ABFBNIAQhiIAAgNQgDgTgWgBQgNAAgLAJQgMAJgDAOIgRBjIgYAAIAQhiQACgPgGgJQgHgIgNAAQgYgBgNAWIgTBtIgaAAIAaiVIAYAAIgDAQQATgUAaABQAPAAAJAGQAKAHADALQAVgZAdABQAXAAAKAPQALAPgDAYIgQBig");
	this.shape_14.setTransform(-34.226,153.7494);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgYBMQgWgBgKgOQgLgPADgaIAQhgIAZAAIgQBhIAAALQAAAKAGAGQAFAGAJAAQAaABAPgXIAThsIAZAAIgaCVIgYAAIADgPQgRATgZAAIgBgBg");
	this.shape_15.setTransform(-53.0083,154.0507);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("Ag9BlIAkjJIAZAAIgfCzIBdAAIgFAWg");
	this.shape_16.setTransform(-68.9,151.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).to({state:[]},1).wait(12));

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
	this.instance = new lib._13();
	this.instance.setTransform(-330,-249,1.2527,1.2527);

	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AguBAQgQgOABgVIAZAAQAAANAIAHQAIAIAOAAQANAAAKgGQAKgGABgLQACgPgTgGIgZgIQghgLABgaQABgTARgOQASgMAVAAQAYAAAOANQAOANgBAVIgZAAQABgLgIgHQgHgIgNAAQgMAAgJAHQgIAGgCAKQgCANASAGIAMADQAaAIAKAJQALAKgBAQQgBAPgIAKQgJAKgNAGQgOAFgPAAQgXAAgQgOg");
	this.shape.setTransform(150.4501,153.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgdBmIAaiUIAYAAIgZCUgAAFhMQgEgEAAgGQAAgHAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAHgEAEQgEAEgHABQgGAAgEgFg");
	this.shape_1.setTransform(140.325,151.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgeBqIAkjTIAZAAIgkDTg");
	this.shape_2.setTransform(133.55,150.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgSBOQgUgBgMgMQgNgMABgTQACgYATgMQAUgNAfAAIAaAAIABgMQACgOgHgHQgGgIgOgBQgMAAgJAHQgKAGgCALIgaAAQACgNAJgKQAJgKAOgGQANgFAPAAQAXAAANAOQANAOgCAWIgMBKIgBAKQAAAIACAHIAAADIgaAAIgBgIIABgIQgUATgWAAIgBAAgAgWAJQgMAIgCAOQgBAKAGAHQAGAHAMAAQAMABAKgGQALgGAHgLIAGgfIgTAAQgXAAgNAHg");
	this.shape_3.setTransform(121.7096,153.9006);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAYBNIAQhiIAAgMQgCgUgVAAQgVgBgRAZIgTBqIgZAAIAaiVIAYAAIgEATQATgXAaABQAVAAALAPQAKAOgDAZIgQBig");
	this.shape_4.setTransform(106.325,153.7495);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgdBmIAaiUIAYAAIgZCUgAAFhMQgEgEAAgGQAAgHAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAHgEAEQgEAEgHABQgGAAgEgFg");
	this.shape_5.setTransform(96.075,151.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgnBEQgNgJgGgRQgGgRACgVIABgGQACgWAKgRQAKgRAQgKQAQgJATAAQAXABAOAPQAPAQAAAXIgYAAQAAgPgIgJQgIgJgNgBQgTAAgNAPQgNAPgDAaIAAADQgBAJAAAKQABAQAIAJQAJAKAOAAQAMABALgJQALgIADgNIAYAAQgCAOgJAMQgJALgOAHQgOAGgOAAQgTAAgNgKg");
	this.shape_6.setTransform(85.3265,153.8988);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgdBmIAaiUIAYAAIgZCUgAAFhMQgEgEAAgGQAAgHAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAHgEAEQgEAEgHABQgGAAgEgFg");
	this.shape_7.setTransform(74.675,151.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgaBsQgVgBgMgQQgMgQgBgaIAAgUQADgWAKgSQAKgSAOgJQAPgKARABQAYAAANASIAPhOIAZAAIglDUIgXAAIADgQQgRATgZAAIgBAAgAgYgRQgMAKgGAQQgFARgBASQAAAUAHALQAIAKAOABQAVABARgXIAMhEQgIgVgWAAIgBAAQgOAAgKAIg");
	this.shape_8.setTransform(63.8417,150.9006);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgwA5QgQgUADggIABgFQACgVALgTQALgSAPgKQAQgJARAAQAXAAANAQQAOAPABAZQAAAJgBAJIgBAKIhhAAQgDAVAKAOQAJAOASABQAVABATgVIAOAMQgJAOgPAHQgPAIgRAAQgcgBgQgUgAgPguQgMALgHAXIBIAAIABgDQACgRgIgMQgIgLgOgBIgCAAQgNAAgLAKg");
	this.shape_9.setTransform(48.1414,153.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("ABFBNIAQhiIAAgNQgDgTgWgBQgNAAgLAJQgMAJgDAOIgRBjIgYAAIAQhiQACgPgGgJQgHgIgNAAQgYgBgNAWIgTBtIgaAAIAaiVIAYAAIgDAQQATgUAaABQAPAAAJAGQAKAHADALQAVgZAdABQAXAAAKAPQALAPgDAYIgQBig");
	this.shape_10.setTransform(27.924,153.7494);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgJBOQgTAAgNgLQgOgKgGgRQgGgRACgUQACgXAKgTQALgSAQgKQARgKATAAQATAAANAKQAOAKAGASQAHASgDAUIAAADQgCAVgLASQgKARgRAKQgQAKgRAAIgCAAgAgXgoQgOAPgDAZIAAADQgBAIABAKQABAQAJAKQAIAJAOABQAMAAAKgGQALgHAHgNQAHgOACgPIABgVQgCgRgJgKQgIgJgOgBIgCAAQgRAAgNAQg");
	this.shape_11.setTransform(1.3862,153.9001);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgaBsQgVgBgMgQQgMgQgBgaIAAgUQADgWAKgSQAKgSAOgJQAPgKARABQAYAAANASIAPhOIAZAAIglDUIgXAAIADgQQgRATgZAAIgBAAgAgYgRQgMAKgGAQQgFARgBASQAAAUAHALQAIAKAOABQAVABARgXIAMhEQgIgVgWAAIgBAAQgOAAgKAIg");
	this.shape_12.setTransform(-13.5583,150.9006);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgYBMQgWgBgKgOQgLgPADgaIAQhgIAZAAIgQBhIAAALQAAAKAGAGQAFAGAJAAQAaABAPgXIAThsIAZAAIgaCVIgYAAIADgPQgRATgZAAIgBgBg");
	this.shape_13.setTransform(-29.3583,154.0507);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgvBNIAaiVIAXAAIgDARQAPgVAWABIAMACIgDAYIgMgCQgYAAgMAWIgTBqg");
	this.shape_14.setTransform(-41.6,153.7494);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgdBmIAaiUIAYAAIgZCUgAAFhMQgEgEAAgGQAAgHAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAHgEAEQgEAEgHABQgGAAgEgFg");
	this.shape_15.setTransform(-50.025,151.15);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAgBlIAQheIhiAAIgPBeIgbAAIAkjJIAaAAIgQBXIBiAAIAPhXIAaAAIgjDJg");
	this.shape_16.setTransform(-63.4,151.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).to({state:[]},1).wait(12));

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
	this.shape_67.graphics.f("#FFFFFF").s().p("AgNBvIAAiiIAaAAIAACigAgLhTQgEgEgBgHQABgHAEgEQAEgFAHAAQAIAAAEAFQAFAEAAAHQAAAHgFAEQgEAFgIAAQgHAAgEgFg");
	this.shape_67.setTransform(349.95,-105.875);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQAUgOAhAAIAbAAIAAgNQAAgPgIgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAIgLAQgHQAOgGARAAQAcAAAQAOQAPAOABAYIAABKQABAXAFANIAAACIgdAAQgCgFgCgMQgUAUgZAAQgZAAgOgNgAgnAgQAAANAJAIQAJAHAOAAQAMAAALgHQANgGAEgLIAAgiIgVAAQgzAAAAAeg");
	this.shape_68.setTransform(337.85,-102.925);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgyBEQgNgPAAgeIAAhpIAcAAIAABoQgBAlAfAAQAeAAALgYIAAh1IAcAAIAACiIgaAAIgBgQQgQATgeAAQgaAAgPgPg");
	this.shape_69.setTransform(321.05,-102.775);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgfBNQgQgHgIgMQgJgMAAgPIAcAAQABAOALAIQAJAJARAAQAPAAAKgHQAKgGAAgLQgBgLgHgGQgJgHgVgEQgUgFgNgFQgMgGgGgJQgGgJAAgMQAAgUARgNQARgOAZAAQAcAAARAOQARAOAAAWIgcAAQAAgLgKgIQgJgIgPAAQgOAAgJAGQgIAHAAAKQgBAKAJAGQAHAFAUAEQAVAFANAGQANAGAHAJQAFAJABANQAAAWgSANQgSANgbAAQgSAAgPgHg");
	this.shape_70.setTransform(304.65,-102.925);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgvA/QgVgWAAglIAAgEQAAgYAKgTQAIgTARgKQARgLASAAQAfAAATAVQARAUAAAnIAAALIhtAAQAAAYAOAPQANAPAUAAQAPAAAKgGQAKgGAIgKIARANQgUAfgpAAQghAAgUgVgAgZgwQgMAMgCAWIBQAAIAAgCQgBgVgKgMQgLgLgRAAQgQAAgLAMg");
	this.shape_71.setTransform(288.7,-102.925);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AggBNQgPgHgIgMQgJgMABgPIAbAAQABAOALAIQAKAJAQAAQAQAAAJgHQAKgGAAgLQgBgLgHgGQgKgHgTgEQgWgFgMgFQgMgGgGgJQgGgJAAgMQAAgUARgNQAQgOAaAAQAbAAASAOQARAOAAAWIgcAAQAAgLgJgIQgLgIgOAAQgPAAgIAGQgJAHAAAKQABAKAHAGQAJAFATAEQAVAFANAGQANAGAGAJQAHAJAAANQAAAWgSANQgSANgbAAQgTAAgPgHg");
	this.shape_72.setTransform(272.45,-102.925);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgiBrQgQgHgKgNIAPgRQASAWAaAAQATAAALgLQAMgMAAgVIAAgNQgRATgbAAQgeAAgRgXQgRgXgBgnQABgmARgWQARgXAeAAQAdAAAQAVIACgSIAZAAIAACeQgBAfgSATQgSASggAAQgRAAgRgIgAgchKQgMAPABAfQAAAcALAPQALAPATAAQAbAAAMgYIAAhJQgNgXgaAAQgTAAgLAQg");
	this.shape_73.setTransform(248,-99.875);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgQAAQgNAAgLAHQgKAHgFAMIAABzIgcAAIAAiiIAaAAIABAVQATgYAdAAQAzAAABA6IAABrg");
	this.shape_74.setTransform(231.3,-103.075);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQATgOAiAAIAcAAIAAgNQgBgPgIgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAIgLAQgHQAOgGARAAQAcAAAQAOQAPAOABAYIAABKQABAXAFANIAAACIgdAAQgCgFgCgMQgUAUgZAAQgYAAgPgNgAgmAgQgBANAKAIQAIAHAOAAQAMAAALgHQANgGAFgLIAAgiIgWAAQgyAAAAAeg");
	this.shape_75.setTransform(214.45,-102.925);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgxByIgKgCIAAgXIAHABQAOAAAIgGQAIgFAFgQIAHgRIg6ifIAeAAIAnB5IAmh5IAeAAIhBC6QgOApgiAAg");
	this.shape_76.setTransform(198.825,-99.65);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AggBNQgPgHgIgMQgIgMAAgPIAbAAQABAOAKAIQAKAJARAAQAQAAAJgHQAJgGAAgLQABgLgJgGQgIgHgUgEQgWgFgMgFQgNgGgFgJQgGgJAAgMQAAgUARgNQARgOAZAAQAbAAASAOQARAOAAAWIgcAAQAAgLgJgIQgLgIgOAAQgOAAgJAGQgJAHABAKQAAAKAHAGQAIAFAVAEQAUAFANAGQANAGAHAJQAFAJAAANQAAAWgRANQgSANgbAAQgSAAgQgHg");
	this.shape_77.setTransform(176,-102.925);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQAUgOAhAAIAbAAIAAgNQAAgPgIgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAJgLAOgHQAPgGARAAQAcAAAQAOQAPAOABAYIAABKQAAAXAGANIAAACIgdAAQgCgFgCgMQgUAUgaAAQgYAAgOgNgAgnAgQAAANAJAIQAJAHAOAAQAMAAALgHQANgGAEgLIAAgiIgVAAQgzAAAAAeg");
	this.shape_78.setTransform(159.75,-102.925);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgNBzIAAjlIAbAAIAADlg");
	this.shape_79.setTransform(147.675,-106.325);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgvA/QgVgWAAglIAAgEQAAgYAJgTQAKgTAQgKQAQgLATAAQAfAAATAVQARAUAAAnIAAALIhtAAQABAYANAPQANAPAUAAQAOAAALgGQAKgGAIgKIARANQgVAfgoAAQghAAgUgVgAgZgwQgLAMgDAWIBQAAIAAgCQgBgVgLgMQgJgLgSAAQgQAAgLAMg");
	this.shape_80.setTransform(135.95,-102.925);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_81.setTransform(120.825,-106.325);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_82.setTransform(97.675,-106.325);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgzBHQgPgOAAgVQAAgZAUgNQASgOAjAAIAbAAIAAgNQAAgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAIgLAPgHQAPgGARAAQAcAAAQAOQAQAOABAYIAABKQgBAXAGANIAAACIgdAAQgDgFgBgMQgTAUgaAAQgZAAgPgNgAgmAgQAAANAJAIQAIAHAOAAQAMAAAMgHQALgGAGgLIAAgiIgXAAQgyAAABAeg");
	this.shape_83.setTransform(80.5,-102.925);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgEBbQgKgLAAgVIAAhkIgdAAIAAgVIAdAAIAAgoIAbAAIAAAoIAeAAIAAAVIgeAAIAABkQAAAKAEAFQAEAFAKAAIANgCIAAAXQgLACgKAAQgTAAgIgLg");
	this.shape_84.setTransform(66.675,-104.75);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("Ag1A9QgUgXAAgmIAAgBQAAgXAJgTQAKgUARgKQAQgKAVAAQAhAAAUAXQAVAXAAAlIAAACQAAAYgJASQgJATgRALQgRAKgWAAQggAAgVgXgAgggsQgNAQAAAeQAAAbANAQQAMARAUAAQAVAAANgRQAMgRAAgdQAAgagMgRQgNgQgVAAQgTAAgNAQg");
	this.shape_85.setTransform(53.35,-102.925);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_86.setTransform(37.775,-106.325);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AgyBEQgNgPAAgeIAAhpIAcAAIAABoQgBAlAfAAQAfAAAKgYIAAh1IAcAAIAACiIgbAAIAAgQQgRATgdAAQgbAAgOgPg");
	this.shape_87.setTransform(12.9,-102.775);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AgeCNIAAgWIANABQAJAAAFgFQAEgFAAgNIAAi1IAbAAIAAC1QAAAugpAAQgJAAgIgCgAAChzQgDgFAAgHQAAgGADgFQAFgFAIABQAHgBAEAFQAFAFAAAGQAAAHgFAFQgEAEgHAAQgJAAgEgEg");
	this.shape_88.setTransform(-0.75,-102.6);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgxBEQgOgPAAgeIAAhpIAbAAIAABoQAAAlAfAAQAfAAAKgYIAAh1IAcAAIAACiIgaAAIgBgQQgQATgfAAQgaAAgNgPg");
	this.shape_89.setTransform(-11.35,-102.775);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgQAAQgNAAgKAHQgLAHgFAMIAABzIgcAAIAAiiIAaAAIABAVQATgYAdAAQA0AAAAA6IAABrg");
	this.shape_90.setTransform(-28.2,-103.075);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgvA/QgVgWAAglIAAgEQAAgYAKgTQAIgTARgKQARgLASAAQAfAAASAVQASAUAAAnIAAALIhtAAQAAAYAOAPQANAPAUAAQAPAAAKgGQAKgGAIgKIARANQgUAfgpAAQghAAgUgVgAgZgwQgMAMgCAWIBQAAIAAgCQgBgVgKgMQgLgLgRAAQgQAAgLAMg");
	this.shape_91.setTransform(-44.75,-102.925);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("ABWBTIAAhrQAAgRgIgIQgIgJgTAAQgPAAgLAJQgJAJgDAQIAABrIgaAAIAAhqQAAgjgjAAQgbAAgLAXIAAB2IgbAAIAAiiIAaAAIABASQASgVAeAAQAiAAALAaQAJgLANgIQANgHARAAQA2AAABA5IAABsg");
	this.shape_92.setTransform(-66.5,-103.075);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgRAAQgMAAgKAHQgKAHgGAMIAABzIgcAAIAAiiIAbAAIAAAVQATgYAdAAQAzAAABA6IAABrg");
	this.shape_93.setTransform(-96,-103.075);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQAUgOAhAAIAbAAIAAgNQABgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAJgLAOgHQAPgGARAAQAcAAAQAOQAPAOABAYIAABKQAAAXAGANIAAACIgdAAQgDgFgBgMQgUAUgaAAQgYAAgOgNgAgnAgQABANAIAIQAJAHAOAAQAMAAALgHQAMgGAFgLIAAgiIgVAAQgzAAAAAeg");
	this.shape_94.setTransform(-112.85,-102.925);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AAnBRIgnh6IgmB6IgXAAIgvihIAcAAIAgB4IAmh4IAVAAIAnB7IAfh7IAcAAIgwChg");
	this.shape_95.setTransform(-132.775,-102.925);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgvA/QgVgWAAglIAAgEQAAgYAKgTQAIgTARgKQARgLASAAQAfAAASAVQASAUAAAnIAAALIhtAAQAAAYAOAPQANAPAUAAQAPAAAKgGQAKgGAIgKIARANQgUAfgpAAQghAAgUgVgAgZgwQgMAMgCAWIBQAAIAAgCQgBgVgKgMQgLgLgRAAQgQAAgLAMg");
	this.shape_96.setTransform(-152.3,-102.925);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AAkBzIAAhrQAAgRgIgIQgIgJgRAAQgMAAgLAIQgJAHgGALIAABzIgcAAIAAjlIAcAAIAABXQASgWAdAAQAzAAABA5IAABrg");
	this.shape_97.setTransform(-169,-106.325);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AgNBvIAAiiIAaAAIAACigAgLhTQgEgEAAgHQAAgHAEgEQAEgFAHAAQAIAAAEAFQAEAEABAHQgBAHgEAEQgEAFgIAAQgHAAgEgFg");
	this.shape_98.setTransform(-188.8,-105.875);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AgmBTIAAiiIAbAAIAAATQANgWAZAAQAIAAAEACIAAAaIgNgBQgbAAgJAXIAABzg");
	this.shape_99.setTransform(-196.925,-103.075);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AgNBvIAAiiIAbAAIAACigAgLhTQgFgEABgHQgBgHAFgEQAEgFAHAAQAIAAAFAFQADAEAAAHQAAAHgDAEQgFAFgIAAQgHAAgEgFg");
	this.shape_100.setTransform(-206.65,-105.875);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AgwA+QgUgWABgnIAAgDQAAgYAIgSQAJgTAQgKQAQgKAWAAQAbAAASAQQASAQABAbIgaAAQgBgQgLgKQgKgKgQAAQgVAAgLAPQgMAPAAAdIAAAEQAAAcALAPQAMAQAVAAQAOAAAMgJQALgJABgOIAaAAQAAAOgKANQgIAMgPAIQgPAHgQAAQghAAgTgWg");
	this.shape_101.setTransform(-218.25,-102.925);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AgiBrQgQgHgKgNIAPgRQASAWAaAAQATAAALgLQAMgMAAgVIAAgNQgRATgcAAQgdAAgRgXQgSgXAAgnQAAgmASgWQARgXAdAAQAeAAAQAVIACgSIAZAAIAACeQgBAfgSATQgSASggAAQgRAAgRgIgAgchKQgMAPAAAfQAAAcAMAPQALAPATAAQAbAAAMgYIAAhJQgNgXgaAAQgTAAgLAQg");
	this.shape_102.setTransform(-243.05,-99.875);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AgzBHQgPgOAAgVQAAgZAUgNQASgOAjAAIAbAAIAAgNQAAgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAIgLAPgHQAPgGARAAQAcAAAQAOQAQAOABAYIAABKQgBAXAGANIAAACIgdAAQgCgFgCgMQgTAUgaAAQgZAAgPgNgAgmAgQAAANAJAIQAIAHAOAAQAMAAAMgHQALgGAGgLIAAgiIgXAAQgyAAABAeg");
	this.shape_103.setTransform(-259.7,-102.925);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AgmBTIAAiiIAbAAIAAATQANgWAZAAQAIAAAEACIAAAaIgNgBQgbAAgJAXIAABzg");
	this.shape_104.setTransform(-272.425,-103.075);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AhOBtIAAjZIA+AAQAbAAAWAMQAWANAMAXQAMAXAAAfIAAANQAAAegMAYQgMAXgWAMQgWANgcAAgAgyBWIAfAAQAgAAATgVQASgVAAgmIAAgMQAAglgRgVQgRgVgfAAIgjAAg");
	this.shape_105.setTransform(-288.25,-105.725);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AgMAMQgEgFAAgGQAAgHAEgFQAEgEAIAAQAJAAAEAEQAEAFAAAHQAAAGgEAFQgEAFgJgBQgIABgEgFg");
	this.shape_106.setTransform(-318.025,-96.3);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AAOBuIAAi4Ig3AVIAAgaIBOgeIAFAAIAADbg");
	this.shape_107.setTransform(-332.4,-105.8);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgJgJQgJgKgUAAQgaAAgNAXIAACnIhAAAIAAjtIA9AAIABAcQAZggArAAQAlAAATAWQASAWABAtIAACYg");
	this.shape_108.setTransform(209.8,-167.7);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AgfCmIAAjtIA/AAIAADtgAgYhtQgKgJAAgOQgBgPAKgJQAKgJAPAAQAQAAAKAJQAKAJgBAPQABAOgKAJQgKAKgQAAQgPAAgJgKg");
	this.shape_109.setTransform(191.25,-172.175);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AhRBnQgYgUAAgfQAAgmAcgTQAcgUA0AAIAeAAIAAgOQAAgQgJgKQgJgKgQAAQgRAAgIAHQgKAIAAAOIg/AAQgBgVANgSQANgRAXgKQAYgKAcAAQArAAAbAWQAZAWAAAoIAABmQAAAiAKARIAAAEIhAAAQgFgJgCgNQgXAagkAAQgjAAgWgUgAgpAsIAAADQAAAMAIAIQAIAIAPAAQANAAAMgHQAMgGAGgKIAAgpIgYAAQgvAAgDAhg");
	this.shape_110.setTransform(173.2,-167.475);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("ABqB5IAAiWQAAgVgHgJQgIgKgUAAQgdAAgLAcIAACiIg+AAIAAiWQAAgVgIgJQgIgKgUAAQgbABgMAWIAACnIg/AAIAAjtIA7AAIACAbQAZgfArAAQAtAAARAlQAZglAvAAQAmAAATAWQATAXAAAuIAACWg");
	this.shape_111.setTransform(141.725,-167.7);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AhCB5IAAjtIA8AAIABAdQATghAhAAQALAAAJADIgBA9QgNgCgJAAQglAAgKAYIAACbg");
	this.shape_112.setTransform(114.95,-167.7);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AhKBbQghggAAg1IAAgGQAAgjAOgcQAOgdAZgPQAZgPAgAAQAxAAAcAfQAcAeAAA5IAAAZIiXAAQADAXAQAOQAPAOAXAAQAlAAAUgbIAgAjQgPAVgYALQgYALgeAAQgzAAghgggAgbg6QgMANgDAXIBXAAIAAgFQAAgVgLgLQgLgMgUAAQgSAAgMANg");
	this.shape_113.setTransform(93.925,-167.475);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("Ah2CgIAAk/IBwAAQA5AAAfAWQAeAXAAArQAAAXgMASQgNASgVAIQAZAFAOATQAOATAAAbQAAAugeAYQgdAXg2ABgAg0BrIA4AAQAXAAANgLQANgLAAgUQAAgsgtAAIg8AAgAg0gZIAxAAQAxgBAAgnQAAgVgNgKQgNgKgaAAIguAAg");
	this.shape_114.setTransform(67.475,-171.575);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AAlCoIg8hfIgWAXIAABIIhAAAIAAlPIBAAAIAAC5IALgPIA8hHIBMAAIhVBiIBdCKg");
	this.shape_115.setTransform(31.1,-172.45);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AhRBjQgUgWAAgrIAAiaIA/AAIAACZQAAAlAhAAQAgAAAMgXIAAinIA/AAIAADsIg7AAIgCgYQgYAdgoAAQgmAAgUgWg");
	this.shape_116.setTransform(5,-167.25);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("Ag5DSIAAgyQAMACAIAAQAeAAAAgfIAAj6IA+AAIAAD6QAAAngVAWQgVAWgmAAQgRAAgPgEgAgDidQgKgJAAgOQAAgPAKgJQAIgJARAAQARAAAJAJQAJAJAAAPQAAAOgJAJQgKAKgQAAQgQAAgJgKg");
	this.shape_117.setTransform(-15.65,-167.375);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgIgJQgJgKgVAAQgZAAgOAXIAACnIhAAAIAAjtIA9AAIABAcQAZggArAAQAlAAATAWQASAWABAtIAACYg");
	this.shape_118.setTransform(-31.95,-167.7);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AhRBjQgUgWgBgrIAAiaIBAAAIAACZQAAAlAiAAQAfAAAMgXIAAinIBAAAIAADsIg8AAIgCgYQgYAdgoAAQgmAAgUgWg");
	this.shape_119.setTransform(-57.15,-167.25);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AgjBTIAAh/IgjAAIAAgvIAjAAIAAg6IA/AAIAAA6IAoAAIAAAvIgoAAIAAB1QAAANAFAGQAFAGAOAAQAKAAAJgCIAAAwQgTAGgUAAQhCAAgBhDg");
	this.shape_120.setTransform(-77.575,-170.175);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AhKBbQghggAAg1IAAgGQAAgjAOgcQAOgdAZgPQAZgPAgAAQAxAAAcAfQAcAeAAA5IAAAZIiXAAQADAXAQAOQAPAOAXAAQAlAAAUgbIAgAjQgPAVgYALQgYALgeAAQgzAAghgggAgbg6QgMANgDAXIBXAAIAAgFQAAgVgLgLQgLgMgUAAQgSAAgMANg");
	this.shape_121.setTransform(-96.725,-167.475);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("Ah6CgIAAk/IB8AAQAkAAAbANQAcANAPAZQAOAYAAAfQAAAvgfAaQghAbg5AAIg4AAIAABxgAg3gFIA5AAQAbAAANgNQAOgMAAgXQAAgXgOgPQgOgOgYgBIg7AAg");
	this.shape_122.setTransform(-123,-171.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]},12).to({state:[]},1).wait(12));

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


(lib.Pieces8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// pieces
	this.tidak = new lib.drag6G2();
	this.tidak.name = "tidak";
	this.tidak.setTransform(462.2,410.9,0.9026,0.9026,0,0,0,82.1,35.7);
	new cjs.ButtonHelper(this.tidak, 0, 1, 2, false, new lib.drag6G2(), 3);

	this.banyak = new lib.drag6G1();
	this.banyak.name = "banyak";
	this.banyak.setTransform(461.2,271.6,0.9026,0.9026,0,0,0,82.1,26.7);
	new cjs.ButtonHelper(this.banyak, 0, 1, 2, false, new lib.drag6G1(), 3);

	this.dikit = new lib.drag6G5();
	this.dikit.name = "dikit";
	this.dikit.setTransform(461.3,341,0.9026,0.9026,0,0,0,82.1,26.7);
	new cjs.ButtonHelper(this.dikit, 0, 1, 2, false, new lib.drag6G5(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.dikit},{t:this.banyak},{t:this.tidak}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces8, new cjs.Rectangle(370.6,243.9,178.89999999999998,193.79999999999998), null);


// stage content:
(lib.game9 = function(mode,startPosition,loop) {
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
		  window.location.replace("../game10/index.html");
		});
		
		root.btnBack3.on("click", function () {
		  window.location.replace("../materi6/index.html");
		});
		
		//#34495e
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
		  window.location.replace("../game10/index.html");
		});
		
		root.btnBack3.on("click", function () {
		  window.location.replace("../materi6/index.html");
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
		
		root.pp3.gotoAndStop(0);
		
		root.g3.on("click", function () {
		  root.pp3.gotoAndPlay(0);
		});
		
		root.pp2.gotoAndStop(0);
		
		root.g2.on("click", function () {
		  root.pp2.gotoAndPlay(0);
		});
		
		root.pp1.gotoAndStop(0);
		
		root.g1.on("click", function () {
		  root.pp1.gotoAndPlay(0);
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
		  console.log(pieces.target);
		
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
		  Score.text = pieces.skor * 33;
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
		  Score.text = pieces.skor * 33 + 1;
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

	// pp3
	this.pp2 = new lib.pp2();
	this.pp2.name = "pp2";
	this.pp2.setTransform(480.35,287.5,1,1,0,0,0,42,-26);

	this.timeline.addTween(cjs.Tween.get(this.pp2).wait(1));

	// pp2
	this.pp3 = new lib.pp3();
	this.pp3.name = "pp3";
	this.pp3.setTransform(480.35,287.5,1,1,0,0,0,42,-26);

	this.timeline.addTween(cjs.Tween.get(this.pp3).wait(1));

	// pp1
	this.pp1 = new lib.pp4();
	this.pp1.name = "pp1";
	this.pp1.setTransform(480.35,287.5,1,1,0,0,0,42,-26);

	this.timeline.addTween(cjs.Tween.get(this.pp1).wait(1));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgSArQgIgFgFgGQgFgIAAgHIAUAAQAAAHAFADQAFAEAHABQAIgBAEgDQAEgCAAgGQAAgFgEgDQgEgDgKgBQgKgDgHgDQgPgHAAgNQAAgMAKgHQAKgJAOABQAQgBAKAJQAKAHAAANIgVAAQAAgGgEgEQgEgDgHAAQgGAAgEADQgEADAAAFQAAAFAEACQADACALADQAMADAHAEQAHACADAFQADAGAAAGQAAAMgKAIQgKAHgQAAQgKAAgJgDg");
	this.shape.setTransform(712.025,228.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgdAnQgJgIAAgLQAAgOALgHQALgIASAAIANAAIAAgGQAAgHgEgEQgEgEgHAAQgGAAgFADQgEAEAAAFIgUAAQAAgHAEgHQAFgGAJgEQAIgDAKAAQAPgBAKAJQAJAHAAAOIAAAoQAAAMAEAIIAAABIgVAAIgDgJQgJALgNgBQgNAAgJgHgAgMAHQgFADAAAIQAAAFADAEQAEADAHAAQAFAAAFgDQAFgDADgEIAAgRIgLAAQgKAAgGAEg");
	this.shape_1.setTransform(703.1,228.65);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_2.setTransform(696.325,226.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgaAjQgNgMAAgVIAAgCQABgMAEgLQAGgLAJgFQAKgHAKABQASAAAKALQAKAMAAAWIAAAHIg5AAQAAALAHAGQAHAHAIgBQAPAAAIgLIALAKQgGAJgJAFQgIADgMAAQgSABgLgMgAgMgYQgFAHgBAJIAlAAIAAgBQAAgKgFgFQgEgGgJABQgHAAgGAFg");
	this.shape_3.setTransform(689.7,228.65);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAXA9Igjg0IgOAOIAAAmIgVAAIAAh5IAVAAIAAA5IAMgOIAigrIAZAAIgsA2IAvBDg");
	this.shape_4.setTransform(680.375,227.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgdAnQgJgIABgLQAAgOAKgHQALgIASAAIANAAIAAgGQAAgHgEgEQgEgEgHAAQgHAAgEADQgEAEgBAFIgTAAQAAgHAEgHQAFgGAJgEQAIgDAJAAQAQgBAKAJQAJAHAAAOIAAAoQAAAMADAIIAAABIgUAAIgCgJQgKALgNgBQgNAAgJgHgAgLAHQgHADABAIQAAAFADAEQAFADAGAAQAFAAAFgDQAGgDACgEIAAgRIgLAAQgKAAgFAEg");
	this.shape_5.setTransform(665.5,228.65);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AArAuIAAg6QAAgIgDgEQgEgEgIAAQgIAAgEAEQgEADgCAGIAAA9IgTAAIAAg6QAAgQgQAAQgNAAgEAKIAABAIgUAAIAAhZIATAAIAAAJQAKgLAQAAQARAAAGAOQAKgOASAAQAPAAAHAIQAIAJAAAQIAAA6g");
	this.shape_6.setTransform(653.5,228.575);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgdAnQgIgIgBgLQAAgOALgHQALgIATAAIAMAAIAAgGQAAgHgEgEQgEgEgHAAQgGAAgFADQgFAEAAAFIgUAAQAAgHAGgHQAEgGAIgEQAJgDAJAAQAQgBAJAJQAKAHAAAOIAAAoQAAAMAEAIIAAABIgVAAIgDgJQgJALgNgBQgNAAgJgHgAgLAHQgHADAAAIQAAAFAFAEQAEADAGAAQAFAAAFgDQAFgDADgEIAAgRIgLAAQgKAAgFAEg");
	this.shape_7.setTransform(641.5,228.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAbA9Ig1hVIAABVIgVAAIAAh5IAVAAIA1BWIAAhWIAVAAIAAB5g");
	this.shape_8.setTransform(630.925,227.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgSArQgIgFgFgGQgFgIAAgHIAUAAQAAAHAFADQAFAEAHABQAIgBAEgDQAEgCAAgGQAAgFgEgDQgEgDgKgBQgKgDgHgDQgPgHAAgNQAAgMAKgHQAKgJAOABQAQgBAKAJQAKAHAAANIgVAAQAAgGgEgEQgEgDgHAAQgGAAgEADQgEADAAAFQAAAFAEACQADACALADQAMADAHAEQAHACADAFQADAGAAAGQAAAMgKAIQgKAHgQAAQgKAAgJgDg");
	this.shape_9.setTransform(523.475,228.65);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgdAnQgJgIAAgLQAAgOALgHQALgIASAAIANAAIAAgGQAAgHgEgEQgEgEgHAAQgGAAgFADQgEAEAAAFIgUAAQAAgHAEgHQAFgGAJgEQAIgDAKAAQAPgBAKAJQAJAHAAAOIAAAoQAAAMADAIIAAABIgUAAIgDgJQgJALgNgBQgOAAgIgHgAgMAHQgFADAAAIQAAAFADAEQAEADAHAAQAFAAAFgDQAFgDADgEIAAgRIgLAAQgKAAgGAEg");
	this.shape_10.setTransform(514.55,228.65);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_11.setTransform(507.775,226.775);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgaAjQgNgMAAgVIAAgCQABgMAEgLQAGgLAJgFQAKgHAKABQASAAAKALQALAMgBAWIAAAHIg5AAQABALAGAGQAHAHAIgBQAPAAAIgLIALAKQgGAJgJAFQgIADgMAAQgSABgLgMgAgMgYQgFAHgBAJIAmAAIAAgBQgBgKgFgFQgEgGgJABQgHAAgGAFg");
	this.shape_12.setTransform(501.15,228.65);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAXA9Igjg0IgOAOIAAAmIgVAAIAAh5IAVAAIAAA5IAMgOIAigrIAZAAIgsA2IAvBDg");
	this.shape_13.setTransform(491.825,227.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAQBAIgagnIgJAJIAAAeIgTAAIAAh/IATAAIAABJIAHgIIAYgbIAYAAIghAkIAlA1g");
	this.shape_14.setTransform(477.7,226.775);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDAEgFAAQgEAAgDgEg");
	this.shape_15.setTransform(470.525,226.95);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgVIATAAIAAAVIAQAAIAAAPIgQAAIAAAxQAAAGACABQACADAGAAIAHgBIAAAQIgOABQgWABAAgag");
	this.shape_16.setTransform(465.325,227.65);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgSArQgIgFgFgGQgFgIAAgHIAUAAQAAAHAFADQAFAEAHABQAIgBAEgDQAEgCAAgGQAAgFgEgDQgEgDgKgBQgKgDgHgDQgPgHAAgNQAAgMAKgHQAKgJAOABQAQgBAKAJQAKAHAAANIgVAAQAAgGgEgEQgEgDgHAAQgGAAgEADQgEADAAAFQAAAFAEACQADACALADQAMADAHAEQAHACADAFQADAGAAAGQAAAMgKAIQgKAHgQAAQgKAAgJgDg");
	this.shape_17.setTransform(458.275,228.65);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDAEgFAAQgEAAgDgEg");
	this.shape_18.setTransform(451.775,226.95);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgWAuIAAhZIATAAIAAAKQAHgMAMAAIAIABIAAATIgJAAQgOAAgDAKIAAA9g");
	this.shape_19.setTransform(447,228.575);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgaAjQgMgMAAgVIAAgCQAAgMAEgLQAGgLAJgFQAKgHAKABQASAAAKALQAKAMAAAWIAAAHIg5AAQABALAGAGQAHAHAIgBQAPAAAIgLIALAKQgGAJgIAFQgKADgLAAQgSABgLgMgAgLgYQgGAHgBAJIAlAAIAAgBQAAgKgFgFQgEgGgJABQgIAAgEAFg");
	this.shape_20.setTransform(439.15,228.65);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgVIATAAIAAAVIAQAAIAAAPIgQAAIAAAxQAAAGACABQACADAGAAIAHgBIAAAQIgOABQgWABAAgag");
	this.shape_21.setTransform(431.475,227.65);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAQBAIgZgnIgJAJIAAAeIgVAAIAAh/IAVAAIAABJIAGgIIAXgbIAZAAIghAkIAkA1g");
	this.shape_22.setTransform(425,226.775);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgdAnQgIgIAAgLQAAgOAKgHQALgIASAAIANAAIAAgGQAAgHgEgEQgEgEgHAAQgGAAgFADQgEAEgBAFIgTAAQgBgHAGgHQAEgGAIgEQAJgDAJAAQAQgBAKAJQAJAHAAAOIAAAoQAAAMADAIIAAABIgUAAIgCgJQgKALgNgBQgNAAgJgHgAgLAHQgHADAAAIQAAAFAEAEQAFADAGAAQAFAAAFgDQAGgDACgEIAAgRIgLAAQgKAAgFAEg");
	this.shape_23.setTransform(415.4,228.65);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgXAuIAAhZIAUAAIAAAKQAHgMANAAIAHABIAAATIgJAAQgOAAgDAKIAAA9g");
	this.shape_24.setTransform(408.2,228.575);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgdAnQgIgIAAgLQAAgOAKgHQALgIASAAIANAAIAAgGQAAgHgEgEQgEgEgHAAQgGAAgFADQgFAEAAAFIgUAAQAAgHAGgHQAEgGAIgEQAJgDAJAAQAQgBAJAJQAKAHAAAOIAAAoQAAAMADAIIAAABIgUAAIgCgJQgKALgNgBQgNAAgJgHgAgLAHQgHADAAAIQAAAFAFAEQAEADAGAAQAFAAAFgDQAGgDACgEIAAgRIgLAAQgKAAgFAEg");
	this.shape_25.setTransform(400.2,228.65);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAXA9Igjg0IgOAOIAAAmIgVAAIAAh5IAVAAIAAA5IAMgOIAigrIAZAAIgsA2IAvBDg");
	this.shape_26.setTransform(390.925,227.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// code
	this.popUpInfo = new lib.popUpInfo();
	this.popUpInfo.name = "popUpInfo";
	this.popUpInfo.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.popUpInfo).wait(1));

	// base
	this.g2 = new lib.g3();
	this.g2.name = "g2";
	this.g2.setTransform(208.8,431.75);

	this.g3 = new lib.g2();
	this.g3.name = "g3";
	this.g3.setTransform(284.7,280.35);

	this.g1 = new lib.g1();
	this.g1.name = "g1";
	this.g1.setTransform(117.65,281.85);

	this.instance = new lib.infoo();
	this.instance.setTransform(222.5,356.8);

	this.btnInfo = new lib.btnInfo();
	this.btnInfo.name = "btnInfo";
	this.btnInfo.setTransform(88.2,172.05,0.6435,0.6435,0,0,0,0.1,0);
	new cjs.ButtonHelper(this.btnInfo, 0, 1, 2, false, new lib.btnInfo(), 3);

	this.restart = new lib.Restart();
	this.restart.name = "restart";
	this.restart.setTransform(168.6,170.85,0.7541,0.7541);
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

	this.pieces = new lib.Pieces8();
	this.pieces.name = "pieces";

	this.slots = new lib.Slots8();
	this.slots.name = "slots";

	this.winMessage = new cjs.Text("Sepertinya Tebakan Anda Salah, Silahkan Coba Lagi", "15px 'Roboto'", "#FFFFFF");
	this.winMessage.name = "winMessage";
	this.winMessage.lineHeight = 20;
	this.winMessage.lineWidth = 346;
	this.winMessage.parent = this;
	this.winMessage.setTransform(45.9,195);

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

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AABAPQAIgLAAgMIAAgNIARAAIAAAMQgBAJgEAHQgEAJgHAGgAgZAPQAIgLAAgMIAAgNIARAAIAAAMQgBAJgEAHQgEAJgHAGg");
	this.shape_27.setTransform(601.125,110.25);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQADACgBAEQABAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_28.setTransform(595.85,115.125);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_29.setTransform(588.725,116.85);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgdAnQgHgIAAgSIAAg8IAPAAIAAA8QAAAVASABQASgBAGgOIAAhDIARAAIAABdIgQAAIgBgJQgJALgRAAQgPAAgJgJg");
	this.shape_30.setTransform(578.9,116.95);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgDAAgHQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgEgDgEQgEgGAAgHQAAgLAKgJQAKgHAPgBQAQAAAKAJQAKAIAAAOIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAHQgKAIgQAAQgKABgJgFg");
	this.shape_31.setTransform(569.275,116.85);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgbAlQgMgNAAgWIAAgCQgBgNAGgMQAGgLAJgGQAKgHAKAAQATAAAKANQALAMAAAXIAAAFIhAAAQAAAOAIAKQAIAIALAAQAJAAAFgEQAHgDAEgGIAKAIQgMASgXAAQgTAAgMgMgAgPgcQgGAIgBANIAuAAIAAgCQAAgMgHgHQgFgHgLAAQgIAAgIAHg");
	this.shape_32.setTransform(559.95,116.85);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgDAAgHQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgEgDgEQgEgGAAgHQAAgLAKgJQAKgHAPgBQAQAAAKAJQAKAIAAAOIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAHQgKAIgQAAQgKABgJgFg");
	this.shape_33.setTransform(550.425,116.85);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_34.setTransform(536.125,118.625);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgKgFgFQgEgEgKAAQgHAAgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAAMQALgPARAAQAeABAAAhIAAA+g");
	this.shape_35.setTransform(526.275,116.75);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_36.setTransform(516.375,116.85);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgcBCIgGgBIAAgNIAEAAQAJAAAEgDQAFgDADgJIAEgKIgjhdIASAAIAXBGIAWhGIARAAIgmBtQgHAYgUAAg");
	this.shape_37.setTransform(507.25,118.775);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_38.setTransform(493.625,116.85);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgcA3QgLgOAAgVIAAgCQAAgUAKgOQALgOARAAQAPAAAKAMIAAgyIAQAAIAACGIgPAAIAAgKQgKAMgRAAQgQAAgKgNgAgQgGQgHAIAAASQAAAQAHAKQAGAIALABQAQgBAHgOIAAgqQgIgNgPAAQgLgBgGAKg");
	this.shape_39.setTransform(483.45,114.95);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_40.setTransform(476.45,115.125);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_41.setTransform(472.075,114.85);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgbAlQgMgNAAgWIAAgCQAAgNAFgMQAFgLAKgGQAKgHAKAAQATAAAKANQALAMAAAXIAAAFIhAAAQABAOAHAKQAIAIALAAQAJAAAFgEQAHgDAEgGIAKAIQgMASgXAAQgTAAgMgMgAgOgcQgHAIgBANIAuAAIAAgCQAAgMgHgHQgFgHgLAAQgJAAgGAHg");
	this.shape_42.setTransform(465.2,116.85);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgKgFgFQgEgEgKAAQgHAAgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAAMQALgPARAAQAeABAAAhIAAA+g");
	this.shape_43.setTransform(455.375,116.75);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgKgFgFQgEgEgKAAQgHAAgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAAMQALgPARAAQAeABAAAhIAAA+g");
	this.shape_44.setTransform(445.425,116.75);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AAnBAIgMghIg1AAIgMAhIgRAAIAxh/IANAAIAxB/gAgVAQIArAAIgWg6g");
	this.shape_45.setTransform(434.575,115.2);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AAzAwIAAg+QAAgKgFgFQgFgEgLAAQgJAAgGAFQgGAFgBAJIAAA+IgPAAIAAg9QAAgVgUABQgQAAgGANIAABEIgRAAIAAhdIAQAAIAAAKQALgNASAAQATAAAHAQQAEgHAIgEQAIgFAKAAQAfAAABAiIAAA+g");
	this.shape_46.setTransform(416.325,116.75);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgSIAAg8IAPAAIAAA8QAAAVASABQASgBAGgOIAAhDIARAAIAABdIgQAAIgBgJQgJALgSAAQgPAAgHgJg");
	this.shape_47.setTransform(403.5,116.95);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_48.setTransform(396.375,114.85);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAEAAADADQADACAAAEQAAAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_49.setTransform(392.05,115.125);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgmBAIAAh/IBOAAIAAAOIg+AAIAAAsIA1AAIAAAMIg1AAIAAA5g");
	this.shape_50.setTransform(385.35,115.2);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AAzAwIAAg+QAAgKgFgFQgFgEgLAAQgJAAgGAFQgGAFgBAJIAAA+IgPAAIAAg9QAAgVgUABQgQAAgGANIAABEIgRAAIAAhdIAQAAIAAAKQALgNASAAQATAAAHAQQAEgHAIgEQAIgFAKAAQAfAAABAiIAAA+g");
	this.shape_51.setTransform(367.525,116.75);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_52.setTransform(354.725,116.85);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_53.setTransform(347.675,114.85);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_54.setTransform(340.575,116.85);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgdA3QgKgOAAgVIAAgCQAAgUAKgOQALgOAQAAQAQAAAKAMIAAgyIAQAAIAACGIgPAAIgBgKQgJAMgRAAQgQAAgLgNgAgQgGQgHAIAAASQAAAQAHAKQAHAIAKABQAPgBAIgOIAAgqQgIgNgOAAQgLgBgHAKg");
	this.shape_55.setTransform(330.4,114.95);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAIQgKAIgQAAQgKgBgJgEg");
	this.shape_56.setTransform(737.825,91.25);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_57.setTransform(728.275,91.25);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgHBEIAAiGIAPAAIAACGg");
	this.shape_58.setTransform(721.225,89.25);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgbAkQgNgMAAgVIAAgDQABgOAFgKQAGgMAJgGQAKgGAKAAQATAAAKAMQAKAMAAAXIAAAGIg/AAQABAOAHAIQAIAJALAAQAJAAAGgDQAFgEAFgGIAKAIQgMATgYAAQgSgBgMgNgAgPgcQgGAHgCANIAvAAIAAgBQgBgNgFgGQgHgHgKAAQgJAAgHAHg");
	this.shape_59.setTransform(714.35,91.25);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_60.setTransform(705.575,89.25);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_61.setTransform(692.025,89.25);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_62.setTransform(684.7,89.525);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_63.setTransform(679.275,90.2);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAIQgKAIgQAAQgKgBgJgEg");
	this.shape_64.setTransform(671.925,91.25);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_65.setTransform(665.15,89.525);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAPAAIABALQAHgNAPABQAEgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_66.setTransform(660.4,91.15);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgbAkQgNgMAAgVIAAgDQABgOAFgKQAGgMAJgGQAKgGAKAAQATAAAKAMQAKAMAAAXIAAAGIg/AAQAAAOAIAIQAIAJALAAQAJAAAGgDQAFgEAFgGIAKAIQgMATgYAAQgSgBgMgNgAgOgcQgHAHgCANIAvAAIAAgBQAAgNgGgGQgHgHgKAAQgJAAgGAHg");
	this.shape_67.setTransform(652.15,91.25);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_68.setTransform(644.075,90.2);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_69.setTransform(637.475,89.25);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_70.setTransform(627.375,91.25);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAQAAIAAALQAHgNAPABQAFgBACACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_71.setTransform(619.95,91.15);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_72.setTransform(611.475,91.25);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_73.setTransform(602.675,89.25);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAQAAIAAALQAHgNAOABQAFgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_74.setTransform(590.5,91.15);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_75.setTransform(582.025,91.25);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_76.setTransform(573.925,90.2);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgNBFIAAhSIgPAAIAAgNIAPAAIAAgKQAAgOAIgJQAHgJAPAAIAMACIgBANIgJgBQgIABgEAEQgFAEAAAJIAAAKIAVAAIAAANIgVAAIAABSg");
	this.shape_77.setTransform(568.475,89.15);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_78.setTransform(560.125,91.25);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgcA2QgLgNAAgWIAAgBQAAgVAKgNQAKgNASAAQAPAAAKALIAAgxIAQAAIAACGIgPAAIAAgKQgLALgQABQgQgBgKgOgAgQgHQgHAJAAASQAAAQAHAJQAGAJALAAQAQAAAHgNIAAgrQgHgOgQAAQgLABgGAIg");
	this.shape_79.setTransform(549.95,89.35);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_80.setTransform(535.675,91.15);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_81.setTransform(525.775,91.25);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_82.setTransform(515.675,93.025);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_83.setTransform(505.825,91.15);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgbAkQgMgMAAgVIAAgDQgBgOAGgKQAFgMAKgGQAKgGAKAAQATAAAKAMQALAMAAAXIAAAGIhAAAQAAAOAIAIQAIAJALAAQAJAAAFgDQAHgEAEgGIAKAIQgMATgXAAQgTgBgMgNgAgOgcQgHAHgBANIAuAAIAAgBQAAgNgHgGQgFgHgLAAQgJAAgGAHg");
	this.shape_84.setTransform(496.15,91.25);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgdA2QgKgNAAgWIAAgBQAAgVAKgNQAKgNARAAQAQAAAKALIAAgxIAQAAIAACGIgPAAIgBgKQgKALgQABQgRgBgKgOgAgQgHQgHAJAAASQAAAQAHAJQAHAJAKAAQAPAAAIgNIAAgrQgIgOgOAAQgLABgHAIg");
	this.shape_85.setTransform(486,89.35);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_86.setTransform(471.725,91.15);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_87.setTransform(461.825,91.25);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AAXAwIgXhHIgWBHIgNAAIgchfIARAAIASBGIAWhGIANAAIAWBIIAShIIAQAAIgbBfg");
	this.shape_88.setTransform(450.15,91.25);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgbAkQgNgMAAgVIAAgDQAAgOAGgKQAGgMAJgGQAKgGAKAAQATAAAKAMQALAMgBAXIAAAGIg/AAQAAAOAIAIQAIAJALAAQAJAAAFgDQAGgEAFgGIAKAIQgMATgYAAQgSgBgMgNgAgPgcQgGAHgCANIAvAAIAAgBQgBgNgFgGQgHgHgKAAQgIAAgIAHg");
	this.shape_89.setTransform(438.7,91.25);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AAVBEIAAg/QAAgKgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAiGIAQAAIAAAzQALgNAQAAQAegBAAAiIAAA/g");
	this.shape_90.setTransform(428.925,89.25);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_91.setTransform(415.575,89.25);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAEAAADADQADACAAAEQAAAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_92.setTransform(408.25,89.525);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_93.setTransform(402.825,90.2);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAIQgKAIgQAAQgKgBgJgEg");
	this.shape_94.setTransform(395.475,91.25);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_95.setTransform(388.7,89.525);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAQAAIAAALQAHgNAOABQAFgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_96.setTransform(383.95,91.15);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AgbAkQgNgMAAgVIAAgDQAAgOAGgKQAGgMAJgGQAKgGAKAAQATAAAKAMQALAMgBAXIAAAGIg/AAQAAAOAIAIQAIAJALAAQAJAAAFgDQAGgEAFgGIAKAIQgMATgYAAQgSgBgMgNgAgPgcQgGAHgCANIAvAAIAAgBQgBgNgFgGQgHgHgKAAQgIAAgIAHg");
	this.shape_97.setTransform(375.7,91.25);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_98.setTransform(367.625,90.2);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_99.setTransform(361.025,89.25);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_100.setTransform(350.925,91.25);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAPAAIABALQAHgNAPABQAEgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_101.setTransform(343.5,91.15);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_102.setTransform(335.025,91.25);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_103.setTransform(326.225,89.25);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAPAAIABALQAHgNAPABQAFgBACACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_104.setTransform(314.05,91.15);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_105.setTransform(305.575,91.25);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_106.setTransform(297.475,90.2);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AgNBFIAAhSIgPAAIAAgNIAPAAIAAgKQAAgOAIgJQAHgJAPAAIAMACIgBANIgJgBQgIABgEAEQgFAEAAAJIAAAKIAVAAIAAANIgVAAIAABSg");
	this.shape_107.setTransform(292.025,89.15);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_108.setTransform(283.675,91.25);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AgdA2QgKgNAAgWIAAgBQAAgVAKgNQAKgNARAAQAQAAAKALIAAgxIAQAAIAACGIgPAAIgBgKQgKALgQABQgRgBgKgOgAgQgHQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgNIAAgrQgHgOgPAAQgMABgGAIg");
	this.shape_109.setTransform(273.5,89.35);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_110.setTransform(259.225,91.15);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_111.setTransform(249.325,91.25);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_112.setTransform(240.525,89.25);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AgeAkQgMgNAAgXIAAAAQAAgOAFgLQAGgLAKgGQAJgHAMABQATAAAMANQAMANAAAWIAAABQAAAOgFALQgFALgKAGQgKAGgNABQgSAAgMgOgAgTgaQgHAKAAARQAAAQAHAJQAIAKALAAQAMAAAIgKQAHgJAAgRQAAgPgHgKQgIgKgMAAQgLAAgIAJg");
	this.shape_113.setTransform(230.275,91.25);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AgbAkQgMgNAAgWIAAgCQAAgOAFgLQAGgKAJgGQAJgHAMABQARAAAKAJQALAKAAAPIgPAAQgBgJgGgGQgHgGgJAAQgLAAgHAJQgHAJAAAQIAAADQAAAQAHAJQAHAJALAAQAJAAAHgFQAGgGABgIIAPAAQAAAJgFAHQgFAIgJAEQgJAEgKABQgSgBgLgNg");
	this.shape_114.setTransform(220.55,91.25);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AgeAkQgMgNAAgXIAAAAQAAgOAFgLQAGgLAKgGQAJgHAMABQATAAAMANQAMANAAAWIAAABQAAAOgFALQgFALgKAGQgKAGgNABQgSAAgMgOgAgTgaQgHAKAAARQAAAQAHAJQAIAKALAAQAMAAAIgKQAHgJAAgRQAAgPgHgKQgIgKgMAAQgLAAgIAJg");
	this.shape_115.setTransform(210.675,91.25);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AgjAxQgNgQAAgbIAAgMQAAgRAGgOQAGgNAMgIQAMgHAOAAQAVAAAMALQAMAMACAUIgRAAQgCgPgHgHQgIgHgNAAQgPAAgJAMQgJAMAAAWIAAALQAAAVAIAMQAJANAPAAQAOAAAHgHQAIgGACgQIARAAQgCAUgNAMQgMALgVAAQgWAAgOgRg");
	this.shape_116.setTransform(199.875,89.625);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AACAVIAAgKQAAgJAEgIQAEgJAHgFIAJAGQgIAMAAALIAAAMgAgZAVIAAgKQAAgJAEgIQAEgJAHgFIAKAGQgJAMAAALIAAAMg");
	this.shape_117.setTransform(191.075,84.45);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.bf(img.Bitmap2, null, new cjs.Matrix2D(1,0,0,1,-499,-300)).s().p("EhN9Au4MAAAhdvMCb7AAAMAAABdvg");
	this.shape_118.setTransform(471,261);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.btnNextDasar1},{t:this.btnMenuDasar1},{t:this.btnBack3},{t:this.winMessage},{t:this.slots},{t:this.pieces},{t:this.judulKI},{t:this.Score},{t:this.restart},{t:this.btnInfo},{t:this.instance},{t:this.g1},{t:this.g3},{t:this.g2}]}).wait(1));

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
		{src:"images/_3.jpeg?1593762254015", id:"_3"},
		{src:"images/Bitmap102.png?1593762254015", id:"Bitmap102"},
		{src:"images/Bitmap103.png?1593762254015", id:"Bitmap103"},
		{src:"images/Bitmap2.png?1593762254015", id:"Bitmap2"},
		{src:"images/Bitmap3.png?1593762254015", id:"Bitmap3"},
		{src:"images/bookpngcopy.png?1593762254015", id:"bookpngcopy"},
		{src:"images/_13.jpeg?1593762254016", id:"_13"}
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