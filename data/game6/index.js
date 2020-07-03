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



(lib.Bitmap10 = function() {
	this.initialize(img.Bitmap10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,307,157);


(lib.Bitmap3 = function() {
	this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,249,87);


(lib.Bitmap86 = function() {
	this.initialize(img.Bitmap86);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,321,184);


(lib.bookpngcopy = function() {
	this.initialize(img.bookpngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,399);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);


(lib.Bitmap84 = function() {
	this.initialize(img.Bitmap84);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,322,159);


(lib.Bitmap83 = function() {
	this.initialize(img.Bitmap83);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,329,159);


(lib.Bitmap87 = function() {
	this.initialize(img.Bitmap87);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,275,161);// helper functions:

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


(lib.Tween12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgFAyIAAhJIALAAIAABJgAgEglQgCgCAAgDQAAgDACgDQACgCACAAQAEAAABACQACADAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape.setTransform(93.6,-0.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgGAAQgMAAgEAKIAAA0g");
	this.shape_1.setTransform(89.9,1.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_2.setTransform(83.525,1.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKQgFACgFAAQgIAAgDgGg");
	this.shape_3.setTransform(77.275,0.375);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgXAgQgGgGgBgJQABgMAIgFQAJgHAPAAIANAAIAAgGQgBgGgEgEQgEgEgHAAQgGAAgEADQgGAEAAAEIgMAAQAAgFAEgFQAEgFAGgDQAHgDAIAAQAMgBAHAHQAIAGAAALIAAAhQAAALACAGIAAABIgNAAIgBgIQgKAJgLAAQgLAAgHgGgAgRAOQAAAHAEADQAEADAGABQAFAAAGgDQAFgEADgEIAAgQIgLAAQgWAAAAANg");
	this.shape_4.setTransform(71.4,1.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_5.setTransform(61.475,1.125);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAQA0IgZghIgIAIIAAAZIgNAAIAAhnIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgAqg");
	this.shape_6.setTransform(48.825,-0.35);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIANAAIAAAvQAAARANAAQAOAAAEgLIAAg1IANAAIAABJIgMAAIgBgHQgGAJgOAAQgMAAgGgHg");
	this.shape_7.setTransform(40.95,1.275);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKQgFACgFAAQgIAAgDgGg");
	this.shape_8.setTransform(34.625,0.375);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AARAmIAAgwQAAgIgEgEQgDgEgIAAQgFAAgFADQgFAEgCAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_9.setTransform(28.65,1.125);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIAMAAIAAAvQAAARAOAAQAOAAAEgLIAAg1IANAAIAABJIgMAAIgBgHQgGAJgOAAQgMAAgGgHg");
	this.shape_10.setTransform(20.95,1.275);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_11.setTransform(10.025,1.2);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_12.setTransform(2.175,2.575);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQABgIgEgEQgDgEgIAAQgFAAgFADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_13.setTransform(-5.5,1.125);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgWAgQgIgGAAgJQAAgMAJgFQAJgHAPAAIAMAAIAAgGQAAgGgDgEQgFgEgHAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgFAHgDQAGgDAHAAQANgBAIAHQAGAGABALIAAAhQAAALADAGIAAABIgOAAIgCgIQgJAJgKAAQgMAAgGgGgAgRAOQAAAHAEADQAEADAGABQAFAAAFgDQAGgEACgEIAAgQIgKAAQgWAAAAANg");
	this.shape_14.setTransform(-13.15,1.2);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIAMAAIAAAIQAGgKALAAIAGABIAAAMIgHAAQgLAAgFAKIAAA0g");
	this.shape_15.setTransform(-18.95,1.125);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgUAtQgIgFgFgLQgGgLAAgOIAAgGQAAgOAFgLQAFgLAJgGQAJgGALAAQAMAAAJAGQAKAFAEALQAFALAAAPIAAAFQAAAPgFALQgEALgKAFQgJAGgMAAQgKAAgKgGgAgTgdQgGAJgBARIAAAGQAAARAHAKQAIAKALAAQANAAAHgJQAHgKAAgRIAAgGQAAgSgHgJQgHgKgNAAQgLAAgIAKg");
	this.shape_16.setTransform(-26.55,-0.075);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AAQA0IgZghIgIAIIAAAZIgNAAIAAhnIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgAqg");
	this.shape_17.setTransform(-37.875,-0.35);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgXAgQgGgGgBgJQABgMAIgFQAJgHAPAAIAMAAIAAgGQAAgGgEgEQgEgEgHAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgFAGgDQAIgDAHAAQAMgBAHAHQAIAGAAALIAAAhQAAALACAGIAAABIgNAAIgCgIQgIAJgMAAQgKAAgIgGgAgRAOQAAAHAEADQAEADAGABQAFAAAGgDQAFgEACgEIAAgQIgKAAQgWAAAAANg");
	this.shape_18.setTransform(-45.7,1.2);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKQgFACgFAAQgIAAgDgGg");
	this.shape_19.setTransform(-51.975,0.375);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgXAcQgKgKAAgSIAAAAQAAgKAFgJQAEgJAIgFQAHgEAJAAQAPgBAKALQAJALAAAQIAAABQAAAKgEAJQgEAJgIAFQgIAEgKAAQgOAAgJgKgAgOgTQgGAHAAANQAAAMAGAHQAGAIAIAAQAKAAAFgIQAGgHAAgNQAAgMgGgHQgFgIgKAAQgIAAgGAIg");
	this.shape_20.setTransform(-58.075,1.2);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAQA0IgZghIgIAIIAAAZIgNAAIAAhnIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgAqg");
	this.shape_21.setTransform(-65.125,-0.35);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAQA0IgZghIgIAIIAAAZIgNAAIAAhnIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgAqg");
	this.shape_22.setTransform(-75.675,-0.35);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgGAyIAAhJIANAAIAABJgAgFglQgCgCAAgDQAAgDACgDQADgCACAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgCAAgDgCg");
	this.shape_23.setTransform(-81.4,-0.15);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgFA0IAAhnIALAAIAABng");
	this.shape_24.setTransform(-84.8,-0.35);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AAWAyIgigvIgMANIAAAiIgNAAIAAhjIANAAIAAAxIArgxIAQAAIgmAsIApA3g");
	this.shape_25.setTransform(-90.325,-0.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-97.4,-10.4,194.8,20.8);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIAMAAIAAAIQAGgKALAAIAGABIAAAMIgHAAQgLAAgFAKIAAA0g");
	this.shape.setTransform(25.25,1.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_1.setTransform(18.875,1.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgEgFQgDgGAAgHIAMAAQABAGAEAFQAFADAHAAQAHAAAFgDQADgDAAgEQAAgGgDgCQgEgEgJgCQgKgCgFgCQgFgCgDgEQgDgEAAgGQAAgJAHgGQAIgHALABQANgBAIAHQAIAGgBALIgMAAQAAgGgEgDQgFgEgHAAQgGAAgEADQgDADAAAFQAAAFADACIANAEQAJADAFACQAHACACAFQADADABAHQgBAJgHAGQgJAHgMgBQgIAAgHgDg");
	this.shape_2.setTransform(11.5,1.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_3.setTransform(4.275,1.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgSAtQgJgFgFgLQgFgKAAgOIAAgIQAAgWAKgNQALgMASAAQAPAAAKAIQAJAIACAOIgNAAQgEgTgTAAQgNAAgGAJQgHAJAAASIAAAHQAAARAHAJQAIAKAMAAQAIAAAFgBQAGgCADgEIAAgWIgXAAIAAgLIAkAAIAAAlQgFAHgJAEQgJADgMAAQgLAAgKgGg");
	this.shape_4.setTransform(-4.375,-0.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgQAFIAAgJIAhAAIAAAJg");
	this.shape_5.setTransform(-14.425,0.675);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgQAFIAAgJIAhAAIAAAJg");
	this.shape_6.setTransform(-18.275,0.675);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgbAFIAAgJIA3gaIAAAOIgqAQIAqASIAAANg");
	this.shape_7.setTransform(-24,0.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29.3,-10.4,58.7,20.8);


(lib.Tween5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIAMAAIAAAIQAGgKALAAIAGABIAAAMIgHAAQgLAAgFAKIAAA0g");
	this.shape.setTransform(25.25,1.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_1.setTransform(18.875,1.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgEgFQgDgGAAgHIAMAAQABAGAEAFQAFADAHAAQAHAAAFgDQADgDAAgEQAAgGgDgCQgEgEgJgCQgKgCgFgCQgFgCgDgEQgDgEAAgGQAAgJAHgGQAIgHALABQANgBAIAHQAIAGgBALIgMAAQAAgGgEgDQgFgEgHAAQgGAAgEADQgDADAAAFQAAAFADACIANAEQAJADAFACQAHACACAFQADADABAHQgBAJgHAGQgJAHgMgBQgIAAgHgDg");
	this.shape_2.setTransform(11.5,1.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_3.setTransform(4.275,1.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgSAtQgJgFgFgLQgFgKAAgOIAAgIQAAgWAKgNQALgMASAAQAPAAAKAIQAJAIACAOIgNAAQgEgTgTAAQgNAAgGAJQgHAJAAASIAAAHQAAARAHAJQAIAKAMAAQAIAAAFgBQAGgCADgEIAAgWIgXAAIAAgLIAkAAIAAAlQgFAHgJAEQgJADgMAAQgLAAgKgGg");
	this.shape_4.setTransform(-4.375,-0.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgQAFIAAgJIAhAAIAAAJg");
	this.shape_5.setTransform(-14.425,0.675);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgQAFIAAgJIAhAAIAAAJg");
	this.shape_6.setTransform(-18.275,0.675);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgbAFIAAgJIA3gaIAAAOIgqAQIAqASIAAANg");
	this.shape_7.setTransform(-24,0.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29.3,-10.4,58.7,20.8);


(lib.Tween4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIAMAAIAAAIQAGgKALAAIAGABIAAAMIgHAAQgLAAgFAKIAAA0g");
	this.shape.setTransform(25.25,1.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_1.setTransform(18.875,1.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgEgFQgDgGAAgHIAMAAQABAGAEAFQAFADAHAAQAHAAAFgDQADgDAAgEQAAgGgDgCQgEgEgJgCQgKgCgFgCQgFgCgDgEQgDgEAAgGQAAgJAHgGQAIgHALABQANgBAIAHQAIAGgBALIgMAAQAAgGgEgDQgFgEgHAAQgGAAgEADQgDADAAAFQAAAFADACIANAEQAJADAFACQAHACACAFQADADABAHQgBAJgHAGQgJAHgMgBQgIAAgHgDg");
	this.shape_2.setTransform(11.5,1.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_3.setTransform(4.275,1.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgSAtQgJgFgFgLQgFgKAAgOIAAgIQAAgWAKgNQALgMASAAQAPAAAKAIQAJAIACAOIgNAAQgEgTgTAAQgNAAgGAJQgHAJAAASIAAAHQAAARAHAJQAIAKAMAAQAIAAAFgBQAGgCADgEIAAgWIgXAAIAAgLIAkAAIAAAlQgFAHgJAEQgJADgMAAQgLAAgKgGg");
	this.shape_4.setTransform(-4.375,-0.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgQAFIAAgJIAhAAIAAAJg");
	this.shape_5.setTransform(-14.425,0.675);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgQAFIAAgJIAhAAIAAAJg");
	this.shape_6.setTransform(-18.275,0.675);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgbAFIAAgJIA3gaIAAAOIgqAQIAqASIAAANg");
	this.shape_7.setTransform(-24,0.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29.3,-10.4,58.7,20.8);


(lib.Tween3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgcASIAsgSIgsgRIAAgNIA5AaIAAAJIg5Aag");
	this.shape.setTransform(68.825,0.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgQAFIAAgJIAhAAIAAAJg");
	this.shape_1.setTransform(63.075,0.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgQAFIAAgJIAhAAIAAAJg");
	this.shape_2.setTransform(59.225,0.675);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQABgIgEgEQgDgEgIAAQgFAAgFADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_3.setTransform(49.95,1.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgWAgQgIgGAAgJQAAgMAJgFQAJgHAPAAIAMAAIAAgGQAAgGgDgEQgFgEgHAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgFAHgDQAGgDAIAAQAMgBAIAHQAGAGABALIAAAhQAAALADAGIAAABIgOAAIgCgIQgIAJgLAAQgMAAgGgGgAgRAOQAAAHAEADQAEADAGABQAFAAAFgDQAGgEACgEIAAgQIgKAAQgWAAAAANg");
	this.shape_4.setTransform(42.3,1.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgXAgQgGgGAAgJQAAgMAJgFQAIgHAPAAIANAAIAAgGQAAgGgFgEQgDgEgIAAQgGAAgEADQgGAEAAAEIgMAAQAAgFAEgFQAEgFAGgDQAIgDAGAAQANgBAHAHQAIAGAAALIAAAhQAAALACAGIAAABIgNAAIgBgIQgKAJgLAAQgKAAgIgGgAgRAOQAAAHAEADQAEADAGABQAFAAAGgDQAFgEADgEIAAgQIgKAAQgXAAAAANg");
	this.shape_5.setTransform(34.7,1.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgNBAIAAgKIAGABQAEgBADgCQAAgCAAgGIAAhSIANAAIAABSQAAAVgSABQgEgBgEgBgAABg0QgBgCAAgDQAAgDABgCQACgCAEgBQADAAACACQACADAAADQAAADgCACQgCACgDAAQgEAAgCgCg");
	this.shape_6.setTransform(28.5,1.35);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgGAAQgMAAgEAKIAAA0g");
	this.shape_7.setTransform(25.55,1.125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_8.setTransform(19.175,1.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_9.setTransform(11.325,2.575);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AARAmIAAgwQgBgIgDgEQgEgEgHAAQgGAAgEADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_10.setTransform(3.65,1.125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_11.setTransform(-3.825,1.2);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgeA0IAAhmIALAAIABAIQAIgJAMAAQAOAAAIAKQAHAKAAASIAAABQAAAQgHAKQgIALgNAAQgNAAgIgIIAAAjgAgSgeIAAAiQAGAKAMAAQAIAAAFgGQAGgIAAgNQAAgNgGgHQgFgHgIAAQgMAAgGAKg");
	this.shape_12.setTransform(-11.375,2.55);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAQA0IgZghIgIAIIAAAZIgNAAIAAhnIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgAqg");
	this.shape_13.setTransform(-21.975,-0.35);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIAMAAIAAAvQAAARAOAAQANAAAGgLIAAg1IAMAAIAABJIgMAAIAAgHQgIAJgNAAQgMAAgGgHg");
	this.shape_14.setTransform(-29.85,1.275);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgNBAIAAgKIAGABQAEgBACgCQABgCAAgGIAAhSIANAAIAABSQAAAVgSABQgEgBgEgBgAABg0QgBgCAAgDQAAgDABgCQACgCADgBQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_15.setTransform(-36.1,1.35);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQABgIgEgEQgDgEgIAAQgGAAgEADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_16.setTransform(-40.95,1.125);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIAMAAIAAAvQAAARAOAAQANAAAGgLIAAg1IAMAAIAABJIgMAAIAAgHQgIAJgNAAQgMAAgGgHg");
	this.shape_17.setTransform(-48.65,1.275);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKQgFACgFAAQgIAAgDgGg");
	this.shape_18.setTransform(-54.975,0.375);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_19.setTransform(-60.675,1.2);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgeA0IAAhmIALAAIABAIQAIgJAMAAQAOAAAIAKQAHAKAAASIAAABQAAAQgHAKQgIALgNAAQgNAAgIgIIAAAjgAgSgeIAAAiQAGAKAMAAQAIAAAFgGQAGgIAAgNQAAgNgGgHQgFgHgIAAQgMAAgGAKg");
	this.shape_20.setTransform(-68.225,2.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75.2,-10.4,150.5,20.8);


(lib.Tween2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgcASIAsgSIgsgRIAAgNIA5AaIAAAJIg5Aag");
	this.shape.setTransform(68.775,0.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgQAFIAAgJIAhAAIAAAJg");
	this.shape_1.setTransform(63.025,0.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgQAFIAAgJIAhAAIAAAJg");
	this.shape_2.setTransform(59.175,0.675);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AARAmIAAgwQgBgIgDgEQgEgEgHAAQgFAAgFADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_3.setTransform(49.9,1.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgXAgQgGgGAAgJQAAgMAJgFQAIgHAPAAIANAAIAAgGQAAgGgFgEQgEgEgHAAQgGAAgEADQgGAEAAAEIgMAAQAAgFAEgFQAEgFAGgDQAHgDAHAAQANgBAHAHQAIAGAAALIAAAhQAAALACAGIAAABIgNAAIgBgIQgKAJgLAAQgKAAgIgGgAgRAOQAAAHAEADQAEADAGABQAFAAAGgDQAFgEADgEIAAgQIgKAAQgXAAAAANg");
	this.shape_4.setTransform(42.25,1.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgWAgQgIgGAAgJQAAgMAJgFQAJgHAPAAIAMAAIAAgGQAAgGgDgEQgFgEgHAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgFAHgDQAGgDAIAAQAMgBAIAHQAGAGABALIAAAhQAAALADAGIAAABIgOAAIgCgIQgIAJgLAAQgMAAgGgGgAgRAOQAAAHAEADQAEADAGABQAFAAAFgDQAGgEACgEIAAgQIgKAAQgWAAAAANg");
	this.shape_5.setTransform(34.65,1.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgNBAIAAgKIAGABQAEgBACgCQACgCAAgGIAAhSIAMAAIAABSQAAAVgSABQgEgBgEgBgAABg0QgBgCAAgDQAAgDABgCQACgCADgBQAFAAABACQACADAAADQAAADgCACQgBACgFAAQgDAAgCgCg");
	this.shape_6.setTransform(28.45,1.35);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIAMAAIAAAIQAGgKALAAIAGABIAAAMIgHAAQgLAAgFAKIAAA0g");
	this.shape_7.setTransform(25.5,1.125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_8.setTransform(19.125,1.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_9.setTransform(11.275,2.575);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQABgIgEgEQgDgEgIAAQgFAAgFADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_10.setTransform(3.6,1.125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_11.setTransform(-3.875,1.2);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgeA0IAAhmIALAAIABAIQAIgJAMAAQAOAAAIAKQAHAKAAASIAAABQAAAQgHAKQgIALgNAAQgNAAgIgIIAAAjgAgSgeIAAAiQAGAKAMAAQAIAAAFgGQAGgIAAgNQAAgNgGgHQgFgHgIAAQgMAAgGAKg");
	this.shape_12.setTransform(-11.425,2.55);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAQA0IgZghIgIAIIAAAZIgNAAIAAhnIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgAqg");
	this.shape_13.setTransform(-22.025,-0.35);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIAMAAIAAAvQAAARAOAAQAOAAAEgLIAAg1IANAAIAABJIgMAAIgBgHQgGAJgOAAQgMAAgGgHg");
	this.shape_14.setTransform(-29.9,1.275);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgNBAIAAgKIAGABQAEgBADgCQABgCAAgGIAAhSIAMAAIAABSQAAAVgSABQgFgBgDgBgAABg0QgBgCAAgDQAAgDABgCQACgCAEgBQAEAAABACQACADAAADQAAADgCACQgBACgEAAQgEAAgCgCg");
	this.shape_15.setTransform(-36.15,1.35);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AARAmIAAgwQgBgIgDgEQgEgEgHAAQgFAAgFADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_16.setTransform(-41,1.125);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIANAAIAAAvQAAARANAAQAOAAAEgLIAAg1IANAAIAABJIgMAAIgBgHQgGAJgOAAQgMAAgGgHg");
	this.shape_17.setTransform(-48.7,1.275);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKQgFACgFAAQgIAAgDgGg");
	this.shape_18.setTransform(-55.025,0.375);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_19.setTransform(-60.725,1.2);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgeA0IAAhmIALAAIABAIQAIgJAMAAQAOAAAIAKQAHAKAAASIAAABQAAAQgHAKQgIALgNAAQgNAAgIgIIAAAjgAgSgeIAAAiQAGAKAMAAQAIAAAFgGQAGgIAAgNQAAgNgGgHQgFgHgIAAQgMAAgGAKg");
	this.shape_20.setTransform(-68.275,2.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75.2,-10.4,150.4,20.8);


(lib.Tween1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgcASIAsgSIgsgRIAAgNIA5AaIAAAJIg5Aag");
	this.shape.setTransform(68.825,0.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgQAFIAAgJIAhAAIAAAJg");
	this.shape_1.setTransform(63.075,0.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgQAFIAAgJIAhAAIAAAJg");
	this.shape_2.setTransform(59.225,0.675);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQABgIgEgEQgDgEgIAAQgFAAgFADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_3.setTransform(49.95,1.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgWAgQgIgGAAgJQAAgMAJgFQAJgHAPAAIAMAAIAAgGQAAgGgDgEQgFgEgHAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgFAHgDQAGgDAIAAQAMgBAIAHQAGAGABALIAAAhQAAALADAGIAAABIgOAAIgCgIQgIAJgLAAQgMAAgGgGgAgRAOQAAAHAEADQAEADAGABQAFAAAFgDQAGgEACgEIAAgQIgKAAQgWAAAAANg");
	this.shape_4.setTransform(42.3,1.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgXAgQgGgGAAgJQAAgMAJgFQAIgHAPAAIANAAIAAgGQAAgGgFgEQgDgEgIAAQgGAAgEADQgGAEAAAEIgMAAQAAgFAEgFQAEgFAGgDQAIgDAGAAQANgBAHAHQAIAGAAALIAAAhQAAALACAGIAAABIgNAAIgBgIQgKAJgLAAQgKAAgIgGgAgRAOQAAAHAEADQAEADAGABQAFAAAGgDQAFgEADgEIAAgQIgKAAQgXAAAAANg");
	this.shape_5.setTransform(34.7,1.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgNBAIAAgKIAGABQAEgBADgCQAAgCAAgGIAAhSIANAAIAABSQAAAVgSABQgEgBgEgBgAABg0QgBgCAAgDQAAgDABgCQACgCAEgBQADAAACACQACADAAADQAAADgCACQgCACgDAAQgEAAgCgCg");
	this.shape_6.setTransform(28.5,1.35);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgGAAQgMAAgEAKIAAA0g");
	this.shape_7.setTransform(25.55,1.125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_8.setTransform(19.175,1.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_9.setTransform(11.325,2.575);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AARAmIAAgwQgBgIgDgEQgEgEgHAAQgGAAgEADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_10.setTransform(3.65,1.125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_11.setTransform(-3.825,1.2);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgeA0IAAhmIALAAIABAIQAIgJAMAAQAOAAAIAKQAHAKAAASIAAABQAAAQgHAKQgIALgNAAQgNAAgIgIIAAAjgAgSgeIAAAiQAGAKAMAAQAIAAAFgGQAGgIAAgNQAAgNgGgHQgFgHgIAAQgMAAgGAKg");
	this.shape_12.setTransform(-11.375,2.55);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAQA0IgZghIgIAIIAAAZIgNAAIAAhnIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgAqg");
	this.shape_13.setTransform(-21.975,-0.35);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIAMAAIAAAvQAAARAOAAQANAAAGgLIAAg1IAMAAIAABJIgMAAIAAgHQgIAJgNAAQgMAAgGgHg");
	this.shape_14.setTransform(-29.85,1.275);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgNBAIAAgKIAGABQAEgBACgCQABgCAAgGIAAhSIANAAIAABSQAAAVgSABQgEgBgEgBgAABg0QgBgCAAgDQAAgDABgCQACgCADgBQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_15.setTransform(-36.1,1.35);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQABgIgEgEQgDgEgIAAQgGAAgEADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_16.setTransform(-40.95,1.125);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIAMAAIAAAvQAAARAOAAQANAAAGgLIAAg1IAMAAIAABJIgMAAIAAgHQgIAJgNAAQgMAAgGgHg");
	this.shape_17.setTransform(-48.65,1.275);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKQgFACgFAAQgIAAgDgGg");
	this.shape_18.setTransform(-54.975,0.375);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_19.setTransform(-60.675,1.2);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgeA0IAAhmIALAAIABAIQAIgJAMAAQAOAAAIAKQAHAKAAASIAAABQAAAQgHAKQgIALgNAAQgNAAgIgIIAAAjgAgSgeIAAAiQAGAKAMAAQAIAAAFgGQAGgIAAgNQAAgNgGgHQgFgHgIAAQgMAAgGAKg");
	this.shape_20.setTransform(-68.225,2.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75.2,-10.4,150.5,20.8);


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
	this.shape.graphics.f("#000000").s().p("AgDAlIAAhKIAHAAIAABKg");
	this.shape.setTransform(57.725,59.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgDAkIAAg0IAHAAIAAA0gAgDgaIAAgEIAAgEQABAAAAAAQAAAAABgBQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAABAAQAAABAAAAQABAAAAAAQAAABABAAQAAABAAAAQAAABAAAAQABABAAAAQAAABgBAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAg");
	this.shape_1.setTransform(55.7,59.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgIAZQgEgCgDgEQgBgEAAgFIAHAAQAAAFADACQADADAEAAQAEAAADgCQACgCAAgDQAAgEgCgCQgDgCgFgBIgIgEIgGgEQgBgDAAgEQAAgGAFgFQAEgFAHAAQAHABAEAFQAGAEAAAHIgIAAQgBgEgCgCQgDgDgDAAQgEAAgCACQgDADABADQAAADABACIAHADIAJADQAEABACAEQABADABAEQgBAHgEAEQgFAFgHgBQgFAAgEgCg");
	this.shape_2.setTransform(52.5,60.65);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgNAXQgEgEAAgHQAAgIAFgEQAFgFAJABIAHAAIAAgFQAAgFgCgCQgDgDgEAAQgDAAgDACQgDADAAADIgHAAQAAgDACgFQACgDAEgCQAEgDAEAAQAIABAEAFQAFAEAAAIIAAAXQAAAIABADIAAABIgIAAIgBgFQgFAHgGgBQgHABgEgFgAgKALQAAAEADACQACADAEAAQACgBAEgCQADgCABgDIAAgLIgGAAQgNAAAAAKg");
	this.shape_3.setTransform(48.025,60.65);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AAPAjIAAggIgdAAIAAAgIgIAAIAAhGIAIAAIAAAfIAdAAIAAgfIAIAAIAABGg");
	this.shape_4.setTransform(42.75,59.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFFFFF").ss(3,1,1).p("AntpVIPbAAIAASrIvbAAg");
	this.shape_5.setTransform(49.35,59.825);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(102,153,51,0.318)").s().p("AntJWIAAyrIPbAAIAASrg");
	this.shape_6.setTransform(49.35,59.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hasil, new cjs.Rectangle(-1.5,-1.5,101.7,122.7), null);


(lib.Path = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#606163").s().p("Ap/z/QEEAADvBlQDkBhCxCyQCxCwBiDmQBkDtAAEEQAAEEhkDuQhiDmixCxQixCxjkBhQjvBkkEAAg");
	this.shape.setTransform(64,127.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,128,255.9), null);


(lib.drop3G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape.setTransform(110.725,90.925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgcAiQgMgNAAgUIAAgBQAAgNAFgKQAFgLAKgGQAJgFALgBQASAAALANQAMANAAAUIAAABQAAANgFAKQgFALgKAGQgJAFgMABQgSAAgKgNgAgRgYQgIAJAAAQQAAAPAIAJQAHAJAKAAQALAAAIgJQAHgJAAgQQAAgPgHgIQgIgKgLAAQgKAAgHAJg");
	this.shape_1.setTransform(102.55,91);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_2.setTransform(95.625,89.375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_3.setTransform(91.125,90.925);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgaAiQgLgLAAgUIAAgDQAAgNAFgKQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_4.setTransform(83.375,91);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgWIAPAAIAAAWIAQAAIAAAMIgQAAIAAA3QgBAFACADQADACAFAAIAIgBIAAANIgMACQgLAAgDgHg");
	this.shape_5.setTransform(75.75,90);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAAAAgIAAA7g");
	this.shape_6.setTransform(68.55,90.925);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATAAIAOAAIAAgHQABgIgFgGQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAFgGAHgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgBgDgBgGQgLAKgNABQgOAAgJgIgAgUASQAAAHAEAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgMAAQgaAAAAAQg");
	this.shape_7.setTransform(59.2,91);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgbAnQgJgHAAgMQAAgOALgHQALgHARAAIAQAAIAAgHQgBgIgEgGQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAGgGAIgEQAIgEAJAAQAPABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgCgDAAgGQgLAKgOABQgNAAgIgIgAgVASQAAAHAFAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgMAAQgcAAAAAQg");
	this.shape_8.setTransform(45.75,91);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgJQgJAKgQABQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAJAKgBQAPAAAHgMIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_9.setTransform(36.125,89.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATAAIAOAAIAAgHQABgIgFgGQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAEgGAIgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgDAAgGQgLAKgNABQgOAAgJgIgAgUASQAAAHAEAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgMAAQgaAAAAAQg");
	this.shape_10.setTransform(26.9,91);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AglA/IAAh8IAOAAIABAKQAKgLAPAAQAQAAAJAMQAKANAAAVIAAABQAAAUgKANQgJAMgQAAQgPAAgJgKIAAArgAgVgkIAAAqQAGALAOABQALAAAGgJQAHgJAAgQQAAgQgHgIQgGgJgLAAQgOAAgGANg");
	this.shape_11.setTransform(17.7,92.65);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgSA7QgKgEgFgHIAJgJQAKAMAOAAQAKAAAGgHQAHgGgBgLIAAgIQgJALgPAAQgPAAgKgNQgKgMAAgWQAAgUAKgNQAJgNARAAQAPAAAJAMIABgKIAOAAIAABXQAAASgKAJQgLAKgRAAQgJABgJgFgAgQgoQgFAIgBARQABAPAFAIQAHAIAKAAQAPABAGgNIAAgpQgGgNgPABQgKgBgHAKg");
	this.shape_12.setTransform(218.1,68.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_13.setTransform(208.8,66.525);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_14.setTransform(202.025,64.975);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_15.setTransform(197.525,66.525);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgcAnQgIgHAAgMQAAgOALgHQALgHARgBIAQAAIAAgGQAAgIgFgGQgFgEgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAEgGQAGgGAIgEQAIgEAJAAQAPABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgJgIgAgVASQABAHAEAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_16.setTransform(189.55,66.6);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgMBAIAAhNIgOAAIAAgMIAOAAIAAgIQAAgPAIgIQAGgIAOABIALABIgBAMIgIgBQgIAAgEAFQgEAEAAAIIAAAJIATAAIAAAMIgTAAIAABNg");
	this.shape_17.setTransform(182.275,64.65);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_18.setTransform(158.05,66.525);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgbAnQgJgHAAgMQAAgOALgHQALgHARgBIAQAAIAAgGQgBgIgEgGQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAGgGAIgEQAIgEAJAAQAPABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgIgIgAgVASQAAAHAFAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_19.setTransform(148.7,66.6);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AglA/IAAh8IAOAAIABAKQAJgLAQAAQAQAAAKAMQAJANAAAVIAAABQAAAUgJANQgKAMgQAAQgPAAgKgKIAAArgAgWgkIAAApQAIAMANABQAKAAAHgJQAGgJABgQQgBgQgGgIQgHgJgKAAQgNAAgIANg");
	this.shape_20.setTransform(139.5,68.25);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgaAiQgLgMAAgTIAAgDQAAgNAFgKQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_21.setTransform(130.125,66.6);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgbA0QgKgNAAgUIAAgCQAAgTAKgNQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgKQgJAMgQAAQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAIAKAAQAPABAHgNIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_22.setTransform(120.525,64.8);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_23.setTransform(97.575,64.975);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgbA0QgKgNAAgUIAAgCQAAgTAKgNQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgKQgJAMgQAAQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAIAKAAQAPABAHgNIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_24.setTransform(90.475,64.8);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_25.setTransform(65.875,64.725);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgcAnQgIgHAAgMQAAgOALgHQALgHASgBIAPAAIAAgGQAAgIgFgGQgFgEgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAEgGQAGgGAIgEQAIgEAJAAQAPABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgJgIgAgVASQABAHAEAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_26.setTransform(56.35,66.6);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgCAzQgFgHAAgLIAAg3IgQAAIAAgMIAQAAIAAgWIAOAAIAAAWIARAAIAAAMIgRAAIAAA3QABAFACADQACADAGgBIAGgBIAAANIgLACQgKgBgFgFg");
	this.shape_27.setTransform(48.7,65.6);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgaAiQgLgMAAgTIAAgDQAAgNAFgKQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_28.setTransform(41.775,66.6);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_29.setTransform(35.125,64.725);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_30.setTransform(30.625,66.525);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgaAiQgLgMAAgTIAAgDQAAgNAFgKQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_31.setTransform(22.875,66.6);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgBAzQgGgHAAgLIAAg3IgRAAIAAgMIARAAIAAgWIAPAAIAAAWIAQAAIAAAMIgQAAIAAA3QAAAFABADQADADAGgBIAHgBIAAANIgMACQgLgBgDgFg");
	this.shape_32.setTransform(15.25,65.6);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_33.setTransform(219.325,40.325);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgcAnQgIgHAAgMQAAgOALgHQALgHARgBIAQAAIAAgGQAAgJgFgFQgFgEgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgGAEgHQAGgGAIgEQAIgDAJgBQAPABAJAHQAJAIAAANIAAApQAAAMADAHIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgJgIgAgVASQABAHAEAEQAFAEAHAAQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_34.setTransform(209.8,42.2);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgCAzQgFgHAAgLIAAg3IgQAAIAAgMIAQAAIAAgWIAOAAIAAAWIARAAIAAAMIgRAAIAAA3QABAFACADQACADAGgBIAGAAIAAAMIgLACQgKgBgFgFg");
	this.shape_35.setTransform(202.15,41.2);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgcAiQgMgMAAgWIAAAAQAAgNAFgKQAFgLAKgFQAJgHALAAQASAAALANQAMANAAAUIAAABQAAANgFAKQgFALgKAGQgJAGgMAAQgSAAgKgNgAgRgYQgIAJAAAQQAAAPAIAJQAHAJAKAAQALAAAHgJQAIgJAAgQQAAgPgIgIQgHgKgLAAQgKAAgHAJg");
	this.shape_36.setTransform(194.8,42.2);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgcAnQgIgHAAgMQAAgOALgHQALgHASgBIAOAAIAAgGQABgJgFgFQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAFgHQAFgGAHgEQAJgDAIgBQAQABAJAHQAIAIABANIAAApQAAAMADAHIAAACIgQAAQgBgCgBgIQgLAMgOAAQgNAAgJgIgAgUASQgBAHAFAEQAFAEAIAAQAGAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_37.setTransform(172.05,42.2);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_38.setTransform(165.375,40.575);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_39.setTransform(161.225,40.325);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgSA7QgKgEgFgHIAIgJQALAMAOAAQAKAAAGgHQAHgGgBgLIAAgIQgJALgPAAQgPAAgKgNQgKgMAAgWQAAgUAKgNQAJgNARAAQAPAAAJAMIABgKIAOAAIAABXQAAARgKAKQgLAKgRAAQgJABgJgFgAgPgoQgGAIgBARQABAPAGAIQAGAIAKAAQAPABAGgNIAAgpQgGgMgPAAQgKAAgGAJg");
	this.shape_40.setTransform(154.2,43.9);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_41.setTransform(144.9,42.125);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgcAnQgIgHAAgMQAAgOALgHQALgHARgBIAQAAIAAgGQAAgJgFgFQgFgEgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgGAEgHQAGgGAIgEQAIgDAJgBQAPABAJAHQAJAIAAANIAAApQAAAMADAHIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgJgIgAgVASQABAHAEAEQAFAEAHAAQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_42.setTransform(135.55,42.2);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgVA3QgMgGgGgOQgGgMgBgRIAAgJQAAgcANgPQANgPAWAAQATAAALAJQAMALADARIgQAAQgFgYgYAAQgPAAgIALQgJAMAAAVIAAAJQAAAUAKAMQAJAMAPAAQAJAAAHgCQAGgCAFgEIAAgbIgcAAIAAgOIAsAAIAAAsQgHAKgLAEQgLAEgOAAQgOAAgLgHg");
	this.shape_43.setTransform(125.025,40.65);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgGAHQgDgDABgEQgBgDADgCQACgDAEAAQAFAAACADQACACABADQgBAEgCADQgCACgFAAQgEAAgCgCg");
	this.shape_44.setTransform(103.8,45.875);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_45.setTransform(99.575,40.575);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_46.setTransform(95.425,40.325);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASgBIAPAAIAAgGQAAgJgEgFQgFgEgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgGAFgHQAFgGAHgEQAJgDAIgBQAQABAJAHQAIAIABANIAAApQAAAMADAHIAAACIgQAAQgBgCgBgIQgLAMgOAAQgNAAgIgIgAgUASQgBAHAFAEQAFAEAIAAQAGAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_47.setTransform(88.7,42.2);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgBAzQgGgHAAgLIAAg3IgRAAIAAgMIARAAIAAgWIAPAAIAAAWIAQAAIAAAMIgQAAIAAA3QAAAFABADQADADAFgBIAIAAIAAAMIgMACQgLgBgDgFg");
	this.shape_48.setTransform(81.05,41.2);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgGQABgJgFgFQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAEgHQAFgGAIgEQAJgDAIgBQAQABAJAHQAIAIABANIAAApQAAAMADAHIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgJgIgAgUASQAAAHAEAEQAFAEAIAAQAGAAAGgDQAHgEACgGIAAgSIgMAAQgaAAAAAQg");
	this.shape_49.setTransform(60.65,42.2);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgTA7QgJgEgEgHIAHgJQAKAMAOAAQALAAAGgHQAGgGABgLIAAgIQgKALgPAAQgQAAgJgNQgKgMAAgWQAAgUAJgNQALgNAPAAQAQAAAJAMIABgKIAOAAIAABXQAAARgLAKQgKAKgRAAQgJABgKgFgAgQgoQgFAIAAARQAAAPAFAIQAHAIAKAAQAOABAIgNIAAgpQgIgMgOAAQgKAAgHAJg");
	this.shape_50.setTransform(51.1,43.9);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AgTA7QgJgEgFgHIAIgJQALAMANAAQALAAAGgHQAHgGAAgLIAAgIQgKALgPAAQgQAAgJgNQgKgMAAgWQAAgUAKgNQAKgNAQAAQAPAAAJAMIABgKIAOAAIAABXQAAARgLAKQgKAKgRAAQgJABgKgFgAgQgoQgFAIAAARQAAAPAFAIQAHAIAKAAQAOABAIgNIAAgpQgIgMgOAAQgKAAgHAJg");
	this.shape_51.setTransform(41.55,43.9);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_52.setTransform(32.25,42.125);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASgBIAQAAIAAgGQgBgJgEgFQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAFgHQAEgGAIgEQAJgDAIgBQAQABAJAHQAJAIAAANIAAApQAAAMADAHIAAACIgQAAQgBgCgBgIQgLAMgOAAQgNAAgIgIgAgUASQgBAHAFAEQAFAEAHAAQAHAAAHgDQAGgEADgGIAAgSIgMAAQgbAAAAAQg");
	this.shape_53.setTransform(22.9,42.2);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgBAzQgGgHAAgLIAAg3IgRAAIAAgMIARAAIAAgWIAPAAIAAAWIAQAAIAAAMIgQAAIAAA3QAAAFABADQADADAGgBIAHAAIAAAMIgMACQgLgBgDgFg");
	this.shape_54.setTransform(15.25,41.2);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgMBBIAAhOIgOAAIAAgLIAOAAIAAgJQAAgPAIgIQAGgIAOAAIALACIgBAMIgIAAQgIAAgEADQgEAFAAAIIAAAKIATAAIAAALIgTAAIAABOg");
	this.shape_55.setTransform(220.475,15.85);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AgbAnQgJgHAAgMQAAgOALgHQALgHARgBIAQAAIAAgHQgBgIgEgFQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAEgHQAGgGAIgEQAIgDAJgBQAPAAAJAIQAJAIAAANIAAApQAAANADAGIAAACIgQAAQgCgCAAgIQgLALgOAAQgNABgIgIgAgVASQAAAHAFAEQAFAEAHAAQAHABAHgEQAGgEADgGIAAgTIgNAAQgbABAAAQg");
	this.shape_56.setTransform(212.6,17.8);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_57.setTransform(205.575,17.725);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASgBIAPAAIAAgHQAAgIgEgFQgFgEgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgGAFgHQAFgGAHgEQAJgDAIgBQAQAAAJAIQAIAIABANIAAApQAAANADAGIAAACIgQAAQgBgCgBgIQgLALgOAAQgNABgIgIgAgUASQgBAHAFAEQAFAEAIAAQAGABAGgEQAHgEACgGIAAgTIgLAAQgbABAAAQg");
	this.shape_58.setTransform(197.6,17.8);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgRArQgIgEgFgHQgFgGAAgJIAPAAQABAIAGAFQAFAEAJAAQAJAAAFgDQAFgEAAgGQAAgGgEgDQgFgEgLgCQgMgDgGgDQgHgDgDgFQgEgFAAgGQAAgLAKgIQAJgHANgBQAQAAAJAIQAKAJAAALIgQAAQAAgGgFgFQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEADQAEADALACQALACAHAEQAIADADAFQAEAFAAAHQAAAMgKAIQgKAGgPAAQgKAAgIgDg");
	this.shape_59.setTransform(188.625,17.8);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AAwAuIAAg7QgBgJgEgFQgEgFgKAAQgJAAgGAFQgGAGAAAIIAAA7IgPAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgPAAIAAhZIAOAAIABAKQAKgMAQAAQAUAAAFAPQAFgHAHgEQAHgEAKAAQAdAAABAgIAAA7g");
	this.shape_60.setTransform(146,17.725);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgLAJgFQAKgHAJAAQASAAAJAMQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLAQgXAAQgRAAgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_61.setTransform(134.125,17.8);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AgBAzQgGgHAAgLIAAg3IgRAAIAAgMIARAAIAAgVIAPAAIAAAVIAQAAIAAAMIgQAAIAAA3QAAAFABADQADACAGAAIAHAAIAAAMIgMABQgLAAgDgFg");
	this.shape_62.setTransform(126.5,16.8);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AgRArQgIgEgFgHQgFgGAAgJIAPAAQABAIAGAFQAFAEAJAAQAJAAAFgDQAFgEAAgGQAAgGgEgDQgFgEgLgCQgMgDgGgDQgHgDgDgFQgEgFAAgGQAAgLAKgIQAJgHANgBQAQAAAJAIQAKAJAAALIgQAAQAAgGgFgFQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEADQAEADALACQALACAHAEQAIADADAFQAEAFAAAHQAAAMgKAIQgKAGgPAAQgKAAgIgDg");
	this.shape_63.setTransform(119.625,17.8);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AgbA/IgFgBIAAgNIAEABQAIAAAEgEQAEgDADgIIAEgJIgghYIAQAAIAWBCIAVhCIAQAAIgkBnQgHAWgTAAg");
	this.shape_64.setTransform(111.225,19.625);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AgRArQgIgEgFgHQgFgGAAgJIAPAAQABAIAGAFQAFAEAJAAQAJAAAFgDQAFgEAAgGQAAgGgEgDQgFgEgLgCQgMgDgGgDQgHgDgDgFQgEgFAAgGQAAgLAKgIQAJgHANgBQAQAAAJAIQAKAJAAALIgQAAQAAgGgFgFQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEADQAEADALACQALACAHAEQAIADADAFQAEAFAAAHQAAAMgKAIQgKAGgPAAQgKAAgIgDg");
	this.shape_65.setTransform(102.825,17.8);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_66.setTransform(65.575,16.175);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgJALgQAAQgOAAgIgIg");
	this.shape_67.setTransform(58.825,17.875);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_68.setTransform(52.075,15.925);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2C3E50").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgHQABgIgFgFQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAEgHQAFgGAIgEQAJgDAIgBQAQAAAJAIQAIAIABANIAAApQAAANADAGIAAACIgQAAQgCgCAAgIQgLALgNAAQgOABgJgIgAgUASQAAAHAEAEQAFAEAIAAQAGABAGgEQAHgEACgGIAAgTIgMAAQgaABAAAQg");
	this.shape_69.setTransform(45.35,17.8);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2C3E50").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_70.setTransform(38.675,15.925);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2C3E50").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgLAJgFQAKgHAJAAQASAAAJAMQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLAQgXAAQgRAAgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_71.setTransform(32.175,17.8);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2C3E50").s().p("AAsA9IAAgvIACgyIgoBhIgLAAIgohhIACAyIAAAvIgQAAIAAh5IAUAAIAnBiIAnhiIAVAAIAAB5g");
	this.shape_72.setTransform(20.175,16.25);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,2.178,-161.1,-94.7)).s().p("A5LOzIAA9lMAyXAAAIAAdlg");
	this.shape_73.setTransform(123.25,60.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-38,-34.5,322.5,189.5);


(lib.drop3G4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape.setTransform(188.85,85.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1.setTransform(181.825,85.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_2.setTransform(173.625,85.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_3.setTransform(167.675,84.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgWAeQgLgKABgSIAAgCQgBgLAFgKQAEgIAJgGQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAAMAGAGQAIAIAJAAQAGAAAFgDQAFgDAEgFIAIAHQgKAPgTAAQgPAAgKgLgAgMgXQgGAGgBAKIAnAAIAAAAQgBgKgFgHQgEgFgJAAQgHAAgGAGg");
	this.shape_4.setTransform(162,85.8);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_5.setTransform(154.675,84.125);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_6.setTransform(144.85,84.35);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgPAlQgIgDgEgGQgDgGAAgHIANAAQAAAHAGAEQAEAEAIAAQAHAAAGgDQAEgEAAgEQAAgGgEgDQgEgDgKgDQgKgCgGgCQgGgCgDgFQgDgEAAgGQAAgJAJgIQAHgGAMAAQAOAAAJAGQAHAIAAALIgNAAQAAgGgFgEQgEgEgIAAQgGAAgEADQgFAEAAAFQAAAEAFADQAEACAIACQALADAGADQAGACADAFQADAEABAHQAAAKgJAHQgJAGgNAAQgJAAgHgEg");
	this.shape_7.setTransform(139.1,85.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_8.setTransform(131.125,85.875);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgLA5IAAhEIgMAAIAAgKIAMAAIAAgIQABgNAGgHQAGgHAMAAIAKABIgBALIgIgBQgGAAgEAFQgDADAAAIIAAAIIARAAIAAAKIgRAAIAABEg");
	this.shape_9.setTransform(124.65,84.05);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_10.setTransform(120,84.35);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgYAtQgJgKABgTIAAgBQgBgRAJgLQAJgLANAAQANAAAJAJIAAgpIANAAIAABvIgMAAIgBgIQgIAKgOAAQgNAAgJgMgAgNgFQgGAGAAAQQAAANAGAIQAFAHAJAAQANAAAGgLIAAgjQgGgLgNAAQgJgBgFAIg");
	this.shape_11.setTransform(113.75,84.2);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_12.setTransform(107.55,85.725);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgXAeQgJgKgBgSIAAgCQABgLAEgKQAFgIAHgGQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAAMAGAGQAIAIAIAAQAHAAAGgDQAFgDADgFIAJAHQgKAPgVAAQgOAAgLgLgAgMgXQgFAGgBAKIAmAAIAAAAQAAgKgFgHQgGgFgIAAQgHAAgGAGg");
	this.shape_13.setTransform(100.75,85.8);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgUAuIgBAJIgLAAIAAhvIANAAIAAAqQAIgKAOAAQAOAAAIAKQAIALAAATIAAABQAAASgIALQgJALgNAAQgOAAgJgLgAgTAAIAAAhQAGAMANAAQAJAAAFgHQAGgIAAgPQAAgOgGgGQgFgIgJABQgOAAgFAMg");
	this.shape_14.setTransform(92.7,84.2);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgXAeQgKgKABgSIAAgCQAAgLAEgKQAEgIAJgGQAHgFAJAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAAMAGAGQAHAIAJAAQAIAAAEgDQAGgDADgFIAIAHQgJAPgUAAQgPAAgLgLgAgMgXQgGAGAAAKIAmAAIAAAAQAAgKgGgHQgEgFgJAAQgHAAgGAGg");
	this.shape_15.setTransform(80.75,85.8);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_16.setTransform(70.125,85.725);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgPAlQgHgDgFgGQgDgGAAgHIANAAQABAHAFAEQAEAEAIAAQAHAAAGgDQAEgEAAgEQAAgGgEgDQgEgDgKgDQgKgCgGgCQgGgCgDgFQgDgEAAgGQAAgJAIgIQAJgGALAAQAOAAAJAGQAHAIABALIgOAAQAAgGgEgEQgGgEgHAAQgGAAgEADQgFAEABAFQAAAEAEADQADACAKACQAKADAGADQAGACADAFQAEAEAAAHQAAAKgJAHQgIAGgOAAQgIAAgIgEg");
	this.shape_17.setTransform(59.65,85.8);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_18.setTransform(54,84.35);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_19.setTransform(50.325,84.125);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgZAeQgKgLAAgTIAAAAQAAgLAFgKQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAAMgEAIQgFAKgIAFQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgJAAgNQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_20.setTransform(44.225,85.8);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgTAuIgBAJIgNAAIAAhvIAOAAIAAAqQAIgKANAAQAPAAAIAKQAJALAAATIAAABQAAASgJALQgIALgPAAQgOAAgHgLgAgTAAIAAAhQAGAMANAAQAJAAAGgHQAFgIAAgPQAAgOgFgGQgGgIgJABQgNAAgGAMg");
	this.shape_21.setTransform(35.95,84.2);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_22.setTransform(27.475,85.8);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgLIAPAAIAAgTIAMAAIAAATIAPAAIAAALIgPAAIAAAwQAAAEACADQACADAFgBIAHAAIAAAKIgLACQgJAAgEgFg");
	this.shape_23.setTransform(20.775,84.9);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgXAeQgKgKAAgSIAAgCQABgLAEgKQAEgIAJgGQAIgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAAMAGAGQAHAIAJAAQAIAAAFgDQAFgDADgFIAIAHQgJAPgVAAQgOAAgLgLgAgMgXQgGAGAAAKIAmAAIAAAAQAAgKgGgHQgEgFgJAAQgHAAgGAGg");
	this.shape_24.setTransform(14.7,85.8);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_25.setTransform(4.075,85.725);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_26.setTransform(256.975,62.125);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_27.setTransform(253.35,62.35);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgPAmQgHgEgEgGQgFgGAAgHIAOAAQABAHAEAEQAGAEAHAAQAIAAAEgDQAFgDAAgGQAAgFgEgDQgFgDgJgCQgKgCgGgDQgGgDgDgEQgDgEAAgGQAAgKAIgGQAJgHAMAAQANAAAIAHQAJAGgBAMIgNAAQAAgGgFgEQgEgEgHAAQgHAAgEADQgEADAAAFQAAAFADADQAFADAJACQAKACAGADQAHACADAFQACAEAAAGQAAALgIAGQgJAHgNAAQgIAAgIgDg");
	this.shape_28.setTransform(247.6,63.8);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIgBQgHAAgFAEQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_29.setTransform(239.675,63.8);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AASA4IAAg0QAAgIgFgEQgDgEgIAAQgGAAgFAEQgFADgCAFIAAA4IgOAAIAAhvIAOAAIAAArQAIgLANAAQAaAAAAAbIAAA0g");
	this.shape_30.setTransform(231.5,62.125);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIgBQgHAAgFAEQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_31.setTransform(212.725,63.8);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgPAmQgHgEgFgGQgEgGAAgHIAOAAQABAHAEAEQAFAEAIAAQAIAAAEgDQAFgDAAgGQAAgFgEgDQgFgDgJgCQgKgCgGgDQgGgDgDgEQgDgEAAgGQAAgKAIgGQAJgHAMAAQANAAAJAHQAIAGAAAMIgOAAQAAgGgEgEQgFgEgHAAQgHAAgEADQgFADABAFQAAAFADADQAFADAJACQAKACAGADQAGACAEAFQACAEAAAGQAAALgIAGQgJAHgNAAQgJAAgHgDg");
	this.shape_32.setTransform(204.75,63.8);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_33.setTransform(199.1,62.35);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgPAmQgIgEgDgGQgFgGAAgHIAOAAQAAAHAFAEQAGAEAHAAQAIAAAEgDQAFgDAAgGQAAgFgEgDQgEgDgKgCQgKgCgGgDQgGgDgDgEQgDgEAAgGQAAgKAJgGQAHgHANAAQANAAAIAHQAJAGgBAMIgNAAQAAgGgFgEQgFgEgGAAQgHAAgEADQgEADgBAFQAAAFAFADQADADAJACQALACAGADQAHACACAFQADAEAAAGQABALgJAGQgJAHgNAAQgIAAgIgDg");
	this.shape_34.setTransform(193.35,63.8);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AASAoIAAgzQAAgJgFgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_35.setTransform(174.8,63.725);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIgBQgHAAgFAEQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_36.setTransform(166.575,63.8);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgYAuQgJgMAAgSIAAgBQAAgRAJgLQAJgLAOAAQAMAAAJAKIAAgqIAOAAIAABwIgNAAIgBgJQgIAKgNAAQgOAAgJgLgAgNgFQgGAHAAAPQAAANAGAIQAFAIAJAAQANAAAGgMIAAgkQgHgKgMgBQgJABgFAHg");
	this.shape_37.setTransform(158.1,62.2);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AASAoIAAgzQAAgJgFgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_38.setTransform(139.35,63.725);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgXAfQgJgLgBgSIAAgCQABgLAEgKQAFgJAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAGAIQAIAHAIAAQAHAAAGgDQAFgDADgFIAJAGQgKAQgVAAQgOAAgLgKgAgMgXQgFAGgBALIAmAAIAAgCQAAgJgFgGQgGgGgIAAQgHAAgGAGg");
	this.shape_39.setTransform(131.35,63.8);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgQA0QgIgDgFgHIAHgIQAKALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgIAJgOAAQgOAAgIgLQgIgLAAgTQAAgSAIgLQAJgLAOAAQANAAAJAKIAAgIIAMAAIAABMQAAAPgJAJQgJAJgPAAQgIAAgIgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgIAAgGAHg");
	this.shape_40.setTransform(122.95,65.275);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_41.setTransform(117.1,62.35);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgPAmQgHgEgEgGQgFgGAAgHIAOAAQAAAHAFAEQAGAEAHAAQAIAAAEgDQAFgDAAgGQAAgFgEgDQgFgDgJgCQgKgCgGgDQgGgDgDgEQgDgEAAgGQAAgKAIgGQAJgHAMAAQANAAAIAHQAJAGgBAMIgNAAQAAgGgFgEQgFgEgGAAQgHAAgEADQgEADgBAFQAAAFAEADQAFADAIACQALACAGADQAHACADAFQACAEAAAGQAAALgIAGQgJAHgNAAQgIAAgIgDg");
	this.shape_42.setTransform(111.35,63.8);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_43.setTransform(104.225,62.125);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgZAeQgKgMAAgSIAAAAQAAgLAFgKQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAALgEAKQgFAIgIAGQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgIAAgOQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_44.setTransform(95.625,63.8);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgCAsQgEgFAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAEACADQACADAFAAIAHgBIAAALIgLABQgJAAgEgGg");
	this.shape_45.setTransform(78.175,62.9);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_46.setTransform(71.825,63.875);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_47.setTransform(64.425,62.125);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgQA0QgIgDgEgHIAGgIQAJALANAAQAJAAAGgGQAFgFAAgKIAAgHQgIAJgNAAQgPAAgIgLQgJgLAAgTQAAgSAJgLQAIgLAPAAQAOAAAHAKIABgIIANAAIAABMQgBAPgIAJQgKAJgPAAQgIAAgIgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgIAAgHAHg");
	this.shape_48.setTransform(55.75,65.275);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AASAoIAAgzQAAgJgFgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_49.setTransform(47.55,63.725);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIgBQgHAAgFAEQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_50.setTransform(39.325,63.8);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AgQA0QgIgDgEgHIAGgIQAJALANAAQAJAAAFgGQAGgFAAgKIAAgHQgIAJgNAAQgPAAgIgLQgJgLAAgTQAAgSAJgLQAIgLAPAAQAOAAAHAKIABgIIANAAIAABMQgBAPgIAJQgKAJgPAAQgHAAgJgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgIAAgHAHg");
	this.shape_51.setTransform(30.9,65.275);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AASAoIAAgzQAAgJgFgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_52.setTransform(22.7,63.725);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AgXAfQgKgLAAgSIAAgCQABgLAEgKQAEgJAJgFQAIgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAGAIQAHAHAJAAQAIAAAFgDQAFgDADgFIAIAGQgJAQgVAAQgOAAgLgKgAgMgXQgGAGAAALIAmAAIAAgCQAAgJgGgGQgEgGgJAAQgHAAgGAGg");
	this.shape_53.setTransform(14.7,63.8);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_54.setTransform(4.075,63.725);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgQA0QgIgDgEgHIAHgIQAIALANAAQAJAAAGgGQAFgFAAgKIAAgHQgJAJgNAAQgNAAgJgLQgJgLABgTQgBgSAJgLQAIgLAPAAQAOAAAIAKIAAgIIANAAIAABMQAAAPgKAJQgJAJgPAAQgHAAgJgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgJAAgFAHg");
	this.shape_55.setTransform(254.5,43.275);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_56.setTransform(246.3,41.725);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_57.setTransform(238.075,41.8);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AgXA4IgFgBIAAgLIAEAAQAGAAAEgDQAEgDADgIIADgIIgdhMIAPAAIATA5IASg5IAPAAIggBaQgGATgQABg");
	this.shape_58.setTransform(230.425,43.4);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgKIAPAAIAAgUIAMAAIAAAUIAPAAIAAAKIgPAAIAAAwQAAAEACADQACADAFgBIAHgBIAAALIgLACQgJAAgEgFg");
	this.shape_59.setTransform(214.925,40.9);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgEACgCQACgCADAAQAEAAACACQACACAAAEQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_60.setTransform(210.9,40.35);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_61.setTransform(207.225,40.125);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_62.setTransform(201.275,41.875);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_63.setTransform(193.875,40.125);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AASAoIAAgzQgBgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_64.setTransform(176.05,41.725);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_65.setTransform(167.825,41.8);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_66.setTransform(159.675,41.8);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_67.setTransform(152.325,40.125);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_68.setTransform(143.875,41.875);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_69.setTransform(133.175,41.725);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_70.setTransform(124.45,41.725);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2C3E50").s().p("AgXAeQgKgKAAgSIAAgCQABgLAEgJQAEgJAJgGQAHgFAJAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAAMAGAGQAHAIAJAAQAIAAAEgDQAGgDADgFIAIAHQgJAPgUAAQgPAAgLgLgAgMgXQgGAGAAAKIAmAAIAAAAQAAgKgGgHQgEgFgJAAQgHAAgGAGg");
	this.shape_71.setTransform(117.65,41.8);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2C3E50").s().p("AggA3IAAhsIAMAAIABAJQAIgLAOABQAOAAAIAKQAIALAAATIAAACQAAAQgIAMQgIALgOgBQgOABgIgJIAAAlgAgTghIAAAmQAGAKANABQAIgBAGgHQAGgIAAgPQAAgMgGgJQgGgHgIAAQgNAAgGAKg");
	this.shape_72.setTransform(109.575,43.25);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#2C3E50").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_73.setTransform(91.775,41.8);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#2C3E50").s().p("AgYAtQgJgKAAgTIAAgBQAAgRAJgLQAIgLAPAAQAMAAAJAJIAAgpIAOAAIAABvIgNAAIgBgIQgIAKgNAAQgOAAgJgMgAgOgFQgFAGAAAQQAAANAFAIQAGAHAJAAQANAAAGgLIAAgjQgHgLgMAAQgJgBgGAIg");
	this.shape_74.setTransform(83.3,40.2);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#2C3E50").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_75.setTransform(75.175,41.8);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#2C3E50").s().p("AggA3IAAhsIAMAAIABAJQAIgLAOABQAOAAAIAKQAIALAAATIAAACQAAAQgIAMQgIALgOgBQgOABgIgJIAAAlgAgTghIAAAmQAGAKANABQAIgBAGgHQAGgIAAgPQAAgMgGgJQgGgHgIAAQgNAAgGAKg");
	this.shape_76.setTransform(67.075,43.25);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#2C3E50").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgKIAPAAIAAgUIAMAAIAAAUIAPAAIAAAKIgPAAIAAAwQAAAEACADQACADAFgBIAHgBIAAALIgLACQgJAAgEgFg");
	this.shape_77.setTransform(50.725,40.9);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#2C3E50").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_78.setTransform(44.425,41.8);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#2C3E50").s().p("AggA3IAAhsIAMAAIABAJQAIgLAOABQAOAAAIAKQAIALAAATIAAACQAAAQgIAMQgIALgOgBQgOABgIgJIAAAlgAgTghIAAAmQAGAKANABQAIgBAGgHQAGgIAAgPQAAgMgGgJQgGgHgIAAQgNAAgGAKg");
	this.shape_79.setTransform(36.325,43.25);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#2C3E50").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_80.setTransform(27.875,41.8);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#2C3E50").s().p("AgYAtQgJgKAAgTIAAgBQAAgRAJgLQAIgLAPAAQAMAAAJAJIAAgpIAOAAIAABvIgNAAIgBgIQgIAKgNAAQgOAAgJgMgAgOgFQgFAGAAAQQAAANAFAIQAGAHAJAAQANAAAGgLIAAgjQgHgLgMAAQgJgBgGAIg");
	this.shape_81.setTransform(19.4,40.2);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_82.setTransform(13.2,41.725);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#2C3E50").s().p("AgXAeQgKgKABgSIAAgCQAAgLAEgJQAEgJAJgGQAIgFAIAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAAMAGAGQAIAIAIAAQAIAAAEgDQAGgDADgFIAIAHQgKAPgTAAQgPAAgLgLgAgMgXQgFAGgCAKIAnAAIAAAAQAAgKgGgHQgEgFgJAAQgHAAgGAGg");
	this.shape_83.setTransform(6.4,41.8);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#2C3E50").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgKIAPAAIAAgUIAMAAIAAAUIAPAAIAAAKIgPAAIAAAwQAAAEACADQACADAFgBIAHgBIAAALIgLACQgJAAgEgFg");
	this.shape_84.setTransform(-0.275,40.9);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#2C3E50").s().p("AgQA0QgIgDgEgHIAHgIQAIALANAAQAJAAAGgGQAFgFAAgKIAAgHQgJAJgNAAQgNAAgJgLQgJgLABgTQgBgSAJgLQAIgLAPAAQAOAAAIAKIAAgIIANAAIAABMQAAAPgKAJQgJAJgPAAQgHAAgJgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgJAAgFAHg");
	this.shape_85.setTransform(254.5,21.275);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#2C3E50").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_86.setTransform(246.3,19.725);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#2C3E50").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_87.setTransform(238.075,19.8);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#2C3E50").s().p("AgXA3IgFgBIAAgLIAEAAQAGABAEgDQAEgDADgHIADgIIgdhOIAPAAIATA7IASg7IAPAAIggBaQgGAVgQgBg");
	this.shape_88.setTransform(230.425,21.4);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_89.setTransform(201.3,19.725);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#2C3E50").s().p("AgXAfQgKgLABgSIAAgCQAAgLAEgKQAEgJAJgFQAIgFAIAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAHQAIAIAIAAQAIAAAEgDQAGgDADgFIAIAGQgKAQgTAAQgPAAgLgKgAgMgXQgFAGgCALIAnAAIAAgBQAAgLgGgFQgEgGgJAAQgHAAgGAGg");
	this.shape_90.setTransform(194.5,19.8);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_91.setTransform(188.625,18.125);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#2C3E50").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCADgEgBQgDABgCgDg");
	this.shape_92.setTransform(185,18.35);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#2C3E50").s().p("AggA4IAAhtIAMAAIABAJQAIgLAOAAQAOAAAIALQAIALAAATIAAABQAAASgIAKQgIAMgOAAQgOgBgIgIIAAAmgAgTggIAAAkQAGALANAAQAIAAAGgIQAGgHAAgOQAAgOgGgHQgGgIgIAAQgNAAgGALg");
	this.shape_93.setTransform(179.125,21.25);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#2C3E50").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_94.setTransform(170.675,19.8);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#2C3E50").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_95.setTransform(163.325,18.125);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#2C3E50").s().p("AARA4IAAg0QABgIgEgEQgEgEgJAAQgFAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLANAAQAZAAAAAbIAAA0g");
	this.shape_96.setTransform(131.45,18.125);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_97.setTransform(123.175,19.875);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_98.setTransform(117.225,18.125);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_99.setTransform(111.275,19.875);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#2C3E50").s().p("AgUAvIgBAJIgLAAIAAhwIANAAIAAAqQAIgKAOAAQAOAAAIAKQAJAMgBARIAAACQABASgJALQgJALgNAAQgOAAgJgKgAgTAAIAAAhQAGANANAAQAJAAAFgIQAGgHAAgQQAAgOgGgGQgFgIgJAAQgOABgFAMg");
	this.shape_100.setTransform(103.15,18.2);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_101.setTransform(92.175,19.725);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#2C3E50").s().p("AgXAfQgKgLAAgSIAAgCQABgLAEgKQAEgJAIgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAGAHQAHAIAJAAQAHAAAGgDQAFgDADgFIAIAGQgJAQgVAAQgOAAgLgKgAgMgXQgGAGAAALIAmAAIAAgBQAAgLgGgFQgEgGgJAAQgHAAgGAGg");
	this.shape_102.setTransform(81.75,19.8);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#2C3E50").s().p("AggA4IAAhtIAMAAIABAJQAIgLAOAAQAOAAAIALQAIALAAATIAAABQAAASgIAKQgIAMgOAAQgOgBgIgIIAAAmgAgTggIAAAkQAGALANAAQAIAAAGgIQAGgHAAgOQAAgOgGgHQgGgIgIAAQgNAAgGALg");
	this.shape_103.setTransform(73.675,21.25);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#2C3E50").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCADgEgBQgDABgCgDg");
	this.shape_104.setTransform(44.05,18.35);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_105.setTransform(38.075,19.875);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_106.setTransform(32.125,18.125);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#2C3E50").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_107.setTransform(26.225,19.8);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_108.setTransform(20.325,18.125);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#2C3E50").s().p("AgWAfQgKgLAAgSIAAgCQgBgLAFgKQAFgJAHgFQAIgFAJAAQAPAAAJAKQAIAKABATIAAAFIg1AAQAAALAHAHQAGAIAKAAQAHAAAEgDQAFgDAEgFIAJAGQgLAQgTAAQgQAAgJgKgAgMgXQgFAGgCALIAnAAIAAgBQgBgLgEgFQgFgGgJAAQgHAAgGAGg");
	this.shape_109.setTransform(14.65,19.8);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#2C3E50").s().p("AAnA1IAAgpIABgsIgjBVIgJAAIgkhVIACAsIAAApIgOAAIAAhpIASAAIAiBWIAjhWIASAAIAABpg");
	this.shape_110.setTransform(4.05,18.425);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.29,0,0,1.824,-160.6,-79.3)).s().p("A5FMZIAA4xMAyLAAAIAAYxg");
	this.shape_111.setTransform(130.625,56.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-30,-22.9,321.3,158.6);


(lib.drop3G3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgTArIAAhUIANAAIAAAKQAHgLANAAIAGABIAAANIgHAAQgNAAgFAMIAAA7g");
	this.shape.setTransform(144.05,153.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQAAgHgFgFQgFgEgIAAQgHAAgGAEQgEAEAAAFIgQAAQAAgGAGgGQADgGAJgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgCgJQgLALgNAAQgMAAgIgHgAgUARQAAAHAFADQAFAEAGAAQAGAAAHgDQAFgEAEgFIAAgSIgMAAQgaAAAAAQg");
	this.shape_1.setTransform(136.55,153.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgZAjQgHgHAAgQIAAg2IAOAAIAAA2QAAATAQAAQAQAAAFgNIAAg8IAOAAIAABUIgNAAIgBgJQgIAKgPAAQgOAAgHgIg");
	this.shape_2.setTransform(127.775,153.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgGA8IAAh3IANAAIAAB3g");
	this.shape_3.setTransform(121.425,151.4);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_4.setTransform(115.325,153.175);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AASA8IgcgnIgJAJIAAAeIgPAAIAAh3IAPAAIAABHIAHgJIAZgbIASAAIggAjIAkAxg");
	this.shape_5.setTransform(107.5,151.4);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_6.setTransform(94.525,153.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgHAAgFAEQgGAEAAAFIgOAAQAAgGAEgGQAEgGAIgDQAIgEAIAAQAPAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgMAAQgNAAgIgHgAgUARQABAHAEADQAEAEAIAAQAFAAAGgDQAHgEACgFIAAgSIgLAAQgaAAAAAQg");
	this.shape_7.setTransform(85.75,153.175);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgTArIAAhUIANAAIAAAKQAHgLANAAIAGABIAAANIgHAAQgNAAgFAMIAAA7g");
	this.shape_8.setTransform(79.15,153.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgaAgQgLgMAAgUIAAAAQAAgMAEgKQAFgKAJgFQAJgGAKAAQARAAALAMQAKAMAAATIAAABQAAAMgEAKQgFAKgJAFQgJAGgLAAQgQAAgKgMgAgQgWQgHAIAAAPQAAAOAHAJQAGAIAKAAQALAAAHgJQAGgIAAgPQAAgOgGgIQgHgJgLAAQgJAAgHAJg");
	this.shape_9.setTransform(71.4,153.175);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgBAvQgGgFAAgLIAAg0IgPAAIAAgLIAPAAIAAgUIAOAAIAAAUIAQAAIAAALIgQAAIAAA0QAAAFACACQADADAFAAIAGgBIAAAMIgLABQgKAAgDgGg");
	this.shape_10.setTransform(63.95,152.225);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgaAgQgLgMAAgUIAAAAQAAgMAEgKQAFgKAJgFQAJgGAKAAQARAAALAMQAKAMAAATIAAABQAAAMgEAKQgFAKgJAFQgJAGgLAAQgQAAgKgMgAgQgWQgHAIAAAPQAAAOAHAJQAGAIAKAAQALAAAHgJQAGgIAAgPQAAgOgGgIQgHgJgLAAQgJAAgHAJg");
	this.shape_11.setTransform(57,153.175);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AASA8IgdgnIgJAJIAAAeIgOAAIAAh3IAOAAIAABHIAIgJIAagbIARAAIggAjIAkAxg");
	this.shape_12.setTransform(48.95,151.4);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgBAvQgFgFgBgLIAAg0IgPAAIAAgLIAPAAIAAgUIAOAAIAAAUIAQAAIAAALIgQAAIAAA0QAAAFACACQADADAEAAIAHgBIAAAMIgLABQgKAAgDgGg");
	this.shape_13.setTransform(37.5,152.225);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQAAgHgFgFQgFgEgIAAQgHAAgGAEQgEAEAAAFIgQAAQAAgGAGgGQADgGAJgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgCgJQgLALgNAAQgMAAgIgHgAgUARQAAAHAFADQAFAEAGAAQAHAAAGgDQAFgEAEgFIAAgSIgMAAQgaAAAAAQg");
	this.shape_14.setTransform(30.8,153.175);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgjA7IAAh0IANAAIABAKQAJgLAPAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgPAAgIgJIAAAogAgUgiIAAAnQAGAMANAAQAKAAAGgJQAGgIAAgPQAAgPgGgIQgGgIgKAAQgNAAgGAMg");
	this.shape_15.setTransform(22.125,154.725);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AAtArIAAg3QAAgJgEgEQgFgFgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg3QAAgSgSAAQgPAAgFANIAAA8IgOAAIAAhUIANAAIABAKQAJgLAQAAQARAAAGANQAEgFAHgFQAHgDAJAAQAcAAAAAdIAAA4g");
	this.shape_16.setTransform(10.475,153.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_17.setTransform(-0.725,153.175);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgBAvQgFgFgBgLIAAg0IgPAAIAAgLIAPAAIAAgUIAOAAIAAAUIAQAAIAAALIgQAAIAAA0QAAAFACACQADADAEAAIAHgBIAAAMIgLABQgKAAgDgGg");
	this.shape_18.setTransform(-7.95,152.225);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgdA+IAuh7IANAAIguB7g");
	this.shape_19.setTransform(247.05,129.025);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgHA6IAAhUIAOAAIAABUgAgGgqQgBgDAAgDQAAgEABgCQADgDADAAQAEAAADADQACACAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_20.setTransform(241.95,128.425);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgTArIAAhUIANAAIAAAKQAHgLANAAIAGABIAAAOIgHgBQgNAAgFAMIAAA7g");
	this.shape_21.setTransform(237.75,129.9);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgbAgQgLgMABgUIAAAAQAAgMAEgKQAGgKAIgFQAJgGAKAAQARAAALAMQAKAMAAATIAAABQABAMgFAKQgFAKgJAFQgJAGgLAAQgQAAgLgMgAgRgWQgGAIAAAPQAAAOAGAJQAHAIAKAAQALAAAHgJQAGgIAAgPQAAgOgGgIQgHgJgLAAQgJAAgIAJg");
	this.shape_22.setTransform(230,129.975);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgjA7IAAh0IANAAIABAKQAJgLAPAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgPAAgIgJIAAAogAgUgiIAAAnQAGAMANAAQAKAAAGgJQAGgIAAgPQAAgPgGgIQgGgIgKAAQgNAAgGAMg");
	this.shape_23.setTransform(221.125,131.525);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgbAgQgKgMgBgUIAAAAQAAgMAGgKQAEgKAJgFQAJgGAKAAQARAAALAMQALAMAAATIAAABQAAAMgFAKQgFAKgIAFQgJAGgMAAQgQAAgLgMgAgRgWQgGAIAAAPQAAAOAGAJQAHAIAKAAQALAAAGgJQAHgIAAgPQAAgOgHgIQgGgJgLAAQgJAAgIAJg");
	this.shape_24.setTransform(211.85,129.975);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgHA6IAAhUIAOAAIAABUgAgGgqQgCgDAAgDQAAgEACgCQADgDADAAQAFAAACADQABACAAAEQAAADgBADQgCACgFAAQgDAAgDgCg");
	this.shape_25.setTransform(205.35,128.425);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgaAxQgJgMAAgUIAAgBQAAgSAJgMQAKgMAPAAQANAAAJAKIAAgsIAPAAIAAB3IgOAAIAAgJQgJALgPAAQgOAAgKgMgAgOgFQgGAHAAAQQAAAOAGAIQAGAJAJAAQAOAAAGgNIAAgmQgGgMgOAAQgJAAgGAJg");
	this.shape_26.setTransform(198.725,128.275);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgHA6IAAhUIAOAAIAABUgAgGgqQgBgDAAgDQAAgEABgCQADgDADAAQAEAAADADQACACAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_27.setTransform(192.45,128.425);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgTArIAAhUIANAAIAAAKQAHgLANAAIAGABIAAAOIgHgBQgNAAgFAMIAAA7g");
	this.shape_28.setTransform(188.25,129.9);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgLA9IAAhJIgOAAIAAgLIAOAAIAAgIQAAgOAHgHQAGgIAOAAIAKABIgBAMIgIgBQgHAAgEAFQgEAEAAAHIAAAJIASAAIAAALIgSAAIAABJg");
	this.shape_29.setTransform(182.575,128.125);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_30.setTransform(175.375,129.975);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_31.setTransform(166.625,129.9);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgGA6IAAhUIANAAIAABUgAgFgqQgCgDAAgDQAAgEACgCQACgDADAAQAEAAACADQACACABAEQgBADgCADQgCACgEAAQgDAAgCgCg");
	this.shape_32.setTransform(154.9,128.425);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgZAjQgHgIAAgPIAAg2IAOAAIAAA2QAAATAQAAQAQAAAFgMIAAg9IAOAAIAABTIgNAAIgBgIQgIAKgPAAQgOAAgHgIg");
	this.shape_33.setTransform(148.525,130.05);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgGA8IAAh3IANAAIAAB3g");
	this.shape_34.setTransform(142.175,128.2);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgIAAgEAEQgFAEgBAFIgOAAQAAgGAEgGQAFgGAIgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgDgJQgJALgNAAQgNAAgIgHgAgUARQABAHAEADQAFAEAGAAQAHAAAFgDQAHgEACgFIAAgSIgLAAQgZAAgBAQg");
	this.shape_35.setTransform(135.9,129.975);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgGA8IAAh3IANAAIAAB3g");
	this.shape_36.setTransform(129.575,128.2);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_37.setTransform(123.475,129.975);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AAtArIAAg3QAAgJgEgEQgFgFgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg3QAAgSgSAAQgPAAgFANIAAA8IgOAAIAAhUIANAAIABAKQAJgLAQAAQARAAAGAOQAEgGAHgFQAHgDAJAAQAcAAAAAdIAAA4g");
	this.shape_38.setTransform(112.175,129.9);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgUArIAAhUIAPAAIAAAKQAGgLANAAIAHABIAAAOIgIgBQgNAAgFAMIAAA7g");
	this.shape_39.setTransform(97.55,129.9);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAOAAIAAgHQAAgHgEgFQgEgEgJAAQgIAAgEAEQgGAEAAAFIgPAAQABgGAFgGQAEgGAHgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgNAAQgMAAgIgHgAgTARQgBAHAFADQAEAEAIAAQAGAAAGgDQAFgEADgFIAAgSIgLAAQgaAAABAQg");
	this.shape_40.setTransform(90.05,129.975);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgZAjQgHgIAAgPIAAg2IAOAAIAAA2QAAATAQAAQAQAAAFgMIAAg9IAOAAIAABTIgNAAIgBgIQgIAKgPAAQgOAAgHgIg");
	this.shape_41.setTransform(81.275,130.05);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgGA8IAAh3IANAAIAAB3g");
	this.shape_42.setTransform(74.925,128.2);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_43.setTransform(63.225,129.9);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgIAAgFAEQgEAEgBAFIgOAAQAAgGAEgGQAFgGAIgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgDgJQgJALgNAAQgNAAgIgHgAgUARQABAHAEADQAFAEAGAAQAHAAAFgDQAHgEACgFIAAgSIgLAAQgZAAgBAQg");
	this.shape_44.setTransform(54.45,129.975);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgRA4QgJgEgEgHIAHgJQAJAMAOAAQAJAAAGgGQAGgGAAgLIAAgHQgJAKgOAAQgOAAgKgMQgJgMAAgUQAAgTAJgMQAKgMAPAAQAOAAAJALIAAgJIAOAAIAABRQAAARgKAJQgKAKgQAAQgIAAgJgEgAgOgmQgGAIAAAQQAAAOAGAHQAGAJAJAAQAOAAAGgNIAAglQgHgNgNAAQgJAAgGAJg");
	this.shape_45.setTransform(45.425,131.575);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_46.setTransform(36.675,129.9);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AgZAjQgHgIAAgPIAAg2IAOAAIAAA2QAAATAQAAQAQAAAFgMIAAg9IAOAAIAABTIgNAAIgBgIQgIAKgPAAQgOAAgHgIg");
	this.shape_47.setTransform(27.825,130.05);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AASA8IgcgnIgJAJIAAAeIgPAAIAAh3IAPAAIAABHIAHgJIAagbIARAAIggAjIAkAxg");
	this.shape_48.setTransform(19.95,128.2);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AgRA4QgJgEgEgHIAHgJQAJAMAOAAQAJAAAGgGQAGgGAAgLIAAgHQgJAKgOAAQgOAAgKgMQgJgMAAgUQAAgTAJgMQAKgMAPAAQAOAAAJALIAAgJIAOAAIAABRQAAARgKAJQgKAKgQAAQgIAAgJgEgAgOgmQgGAIAAAQQAAAOAGAHQAGAJAJAAQAOAAAGgNIAAglQgHgNgNAAQgJAAgGAJg");
	this.shape_49.setTransform(10.675,131.575);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_50.setTransform(1.925,129.9);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AgHA6IAAhUIAOAAIAABUgAgGgqQgCgDAAgDQAAgEACgCQADgDADAAQAFAAACADQABACAAAEQAAADgBADQgCACgFAAQgDAAgDgCg");
	this.shape_51.setTransform(-4.45,128.425);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AgGA8IAAh3IANAAIAAB3g");
	this.shape_52.setTransform(-8.375,128.2);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgFQgFgEgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_53.setTransform(246.125,106.7);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQAAgHgFgFQgFgEgIAAQgHAAgGAEQgEAEAAAFIgPAAQgBgGAGgGQADgGAJgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgCgJQgLALgNAAQgMAAgIgHgAgUARQAAAHAFADQAFAEAGAAQAHAAAGgDQAFgEAEgFIAAgSIgMAAQgaAAAAAQg");
	this.shape_54.setTransform(237.35,106.775);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgRA4QgJgEgEgHIAHgJQAJAMAOAAQAJAAAGgGQAGgGAAgLIAAgHQgJAKgOAAQgOAAgKgMQgJgMAAgUQAAgTAJgMQAKgMAPAAQAOAAAJALIAAgJIAOAAIAABRQAAARgKAJQgKAKgQAAQgIAAgJgEgAgOgmQgGAIAAAQQAAAOAGAHQAGAJAJAAQAOAAAGgNIAAglQgHgNgNAAQgJAAgGAJg");
	this.shape_55.setTransform(228.325,108.375);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgFQgFgEgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_56.setTransform(219.575,106.7);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_57.setTransform(210.975,106.775);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AgaAxQgJgMAAgUIAAgBQAAgSAJgMQAKgMAPAAQANAAAJAKIAAgsIAPAAIAAB3IgOAAIAAgJQgJALgPAAQgOAAgKgMgAgOgFQgGAHAAAQQAAAOAGAIQAGAJAJAAQAOAAAGgNIAAgmQgGgMgOAAQgJAAgGAJg");
	this.shape_58.setTransform(201.975,105.075);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgFQgFgEgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_59.setTransform(171.325,106.7);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQAAgHgFgFQgFgEgIAAQgIAAgFAEQgEAEAAAFIgPAAQAAgGAEgGQAFgGAIgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgCgJQgKALgNAAQgNAAgIgHgAgUARQAAAHAFADQAFAEAGAAQAHAAAGgDQAFgEAEgFIAAgSIgMAAQgaAAAAAQg");
	this.shape_60.setTransform(162.55,106.775);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgRA4QgJgEgEgHIAHgJQAJAMAOAAQAJAAAGgGQAGgGAAgLIAAgHQgJAKgOAAQgOAAgKgMQgJgMAAgUQAAgTAJgMQAKgMAPAAQAOAAAJALIAAgJIAOAAIAABRQAAARgKAJQgKAKgQAAQgIAAgJgEgAgOgmQgGAIAAAQQAAAOAGAHQAGAJAJAAQAOAAAGgNIAAglQgHgNgNAAQgJAAgGAJg");
	this.shape_61.setTransform(153.525,108.375);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgFQgFgEgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_62.setTransform(144.775,106.7);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AgZAkQgHgJAAgPIAAg2IAOAAIAAA2QAAATAQAAQAQAAAFgMIAAg9IAOAAIAABTIgNAAIgBgIQgIAKgPAAQgOAAgHgHg");
	this.shape_63.setTransform(135.925,106.85);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AgVAxIgBAKIgNAAIAAh3IAPAAIAAAtQAIgLAPAAQAPAAAJAMQAJALAAAUIAAABQAAATgJAMQgJAMgPAAQgPAAgJgMgAgUAAIAAAjQAGAOAOAAQAKAAAGgIQAFgJAAgQQAAgOgFgIQgGgIgKAAQgOAAgGAOg");
	this.shape_64.setTransform(127.225,105.075);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AgZAkQgHgJAAgPIAAg2IAOAAIAAA2QAAATAQAAQAQAAAFgMIAAg9IAOAAIAABTIgNAAIgBgIQgIAKgPAAQgOAAgHgHg");
	this.shape_65.setTransform(118.125,106.85);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AATA8IAAg4QAAgIgEgFQgFgEgIAAQgGAAgGAEQgFADgDAGIAAA8IgOAAIAAh3IAOAAIAAAuQAKgMAOAAQAbAAAAAdIAAA4g");
	this.shape_66.setTransform(109.375,105);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AgUArIAAhUIAPAAIAAAKQAGgLANAAIAHABIAAAOIgIgBQgNAAgFAMIAAA7g");
	this.shape_67.setTransform(102.7,106.7);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_68.setTransform(95.375,106.775);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2C3E50").s().p("AgVAxIgBAKIgNAAIAAh3IAPAAIAAAtQAIgLAPAAQAPAAAJAMQAJALAAAUIAAABQAAATgJAMQgJAMgPAAQgPAAgJgMgAgUAAIAAAjQAGAOAOAAQAKAAAGgIQAFgJAAgQQAAgOgFgIQgGgIgKAAQgOAAgGAOg");
	this.shape_69.setTransform(86.725,105.075);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2C3E50").s().p("AAtArIAAg3QAAgJgEgFQgFgEgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg2QAAgTgSAAQgPAAgFAMIAAA9IgOAAIAAhUIANAAIABAKQAJgLAQAAQARAAAGAOQAEgHAHgDQAHgEAJAAQAcAAAAAeIAAA3g");
	this.shape_70.setTransform(53.175,106.7);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2C3E50").s().p("AgZAkQgHgJAAgPIAAg2IAOAAIAAA2QAAATAQAAQAQAAAFgMIAAg9IAOAAIAABTIgNAAIgBgIQgIAKgPAAQgOAAgHgHg");
	this.shape_71.setTransform(41.725,106.85);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2C3E50").s().p("AgHA6IAAhUIAOAAIAABUgAgGgqQgBgDAAgDQAAgEABgCQADgDADAAQAEAAADADQACACAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_72.setTransform(35.4,105.225);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#2C3E50").s().p("AgaAxQgJgMAAgUIAAgBQAAgSAJgMQAKgMAPAAQANAAAJAKIAAgsIAPAAIAAB3IgOAAIAAgJQgJALgPAAQgOAAgKgMgAgOgFQgGAHAAAQQAAAOAGAIQAGAJAJAAQAOAAAGgNIAAgmQgGgMgOAAQgJAAgGAJg");
	this.shape_73.setTransform(28.775,105.075);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#2C3E50").s().p("AgGA6IAAhUIANAAIAABUgAgFgqQgCgDAAgDQAAgEACgCQACgDADAAQAEAAACADQACACAAAEQAAADgCADQgCACgEAAQgDAAgCgCg");
	this.shape_74.setTransform(22.5,105.225);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#2C3E50").s().p("AgTArIAAhUIANAAIAAAKQAHgLANAAIAGABIAAAOIgHgBQgNAAgFAMIAAA7g");
	this.shape_75.setTransform(18.3,106.7);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#2C3E50").s().p("AgLA9IAAhJIgOAAIAAgLIAOAAIAAgIQAAgOAHgHQAGgIAOAAIAKABIgBAMIgIgBQgHAAgEAFQgEAEAAAHIAAAJIASAAIAAALIgSAAIAABJg");
	this.shape_76.setTransform(12.625,104.925);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_77.setTransform(5.425,106.775);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#2C3E50").s().p("AAdA5Ig4hXIAABXIgQAAIAAhxIAQAAIA4BXIAAhXIAPAAIAABxg");
	this.shape_78.setTransform(-4.625,105.325);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#2C3E50").s().p("AgGAGQgCgCAAgEQAAgDACgCQACgDAEAAQAEAAADADQACACAAADQAAAEgCACQgDADgEAAQgEAAgCgDg");
	this.shape_79.setTransform(248.325,87.025);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#2C3E50").s().p("AATA8IAAg4QAAgIgEgFQgFgEgIAAQgGAAgGAEQgFADgDAGIAAA8IgOAAIAAh3IAOAAIAAAuQAKgMAOAAQAbAAAAAdIAAA4g");
	this.shape_80.setTransform(241.925,81.8);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAOAAIAAgHQAAgHgEgFQgEgEgJAAQgIAAgEAEQgGAEABAFIgQAAQABgGAFgGQAEgGAHgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgNAAQgMAAgIgHgAgTARQgBAHAFADQAEAEAIAAQAGAAAFgDQAGgEADgFIAAgSIgLAAQgaAAABAQg");
	this.shape_81.setTransform(233.15,83.575);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#2C3E50").s().p("AgUArIAAhTIAOAAIAAAJQAHgLANAAIAGABIAAANIgHAAQgNAAgFAMIAAA7g");
	this.shape_82.setTransform(226.55,83.5);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgHAAgFAEQgFAEgBAFIgOAAQAAgGAEgGQAFgGAIgDQAHgEAIAAQAPAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgDgJQgJALgNAAQgNAAgIgHgAgUARQABAHAEADQAEAEAIAAQAFAAAGgDQAHgEACgFIAAgSIgLAAQgZAAgBAQg");
	this.shape_83.setTransform(219.05,83.575);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#2C3E50").s().p("AgaAxQgJgMAAgUIAAgBQAAgSAJgMQAKgMAPAAQANAAAJAKIAAgsIAPAAIAAB3IgOAAIAAgJQgJALgPAAQgOAAgKgMgAgOgFQgGAHAAAQQAAAOAGAIQAGAJAJAAQAOAAAGgNIAAgmQgGgMgOAAQgJAAgGAJg");
	this.shape_84.setTransform(210.025,81.875);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#2C3E50").s().p("AgTArIAAhTIANAAIAAAJQAHgLANAAIAGABIAAANIgHAAQgNAAgFAMIAAA7g");
	this.shape_85.setTransform(196.15,83.5);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_86.setTransform(188.825,83.575);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#2C3E50").s().p("AgGA8IAAh3IANAAIAAB3g");
	this.shape_87.setTransform(182.525,81.8);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#2C3E50").s().p("AgGA6IAAhUIANAAIAABUgAgFgqQgCgDAAgDQAAgEACgCQACgDADAAQAEAAACADQACACAAAEQAAADgCADQgCACgEAAQgDAAgCgCg");
	this.shape_88.setTransform(178.65,82.025);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#2C3E50").s().p("AgjA7IAAh0IANAAIABAKQAJgLAPAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgPAAgIgJIAAAogAgUgiIAAAnQAGAMANAAQAKAAAGgJQAGgIAAgPQAAgPgGgIQgGgIgKAAQgNAAgGAMg");
	this.shape_89.setTransform(172.375,85.125);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgIAAgEAEQgFAEgBAFIgOAAQAAgGAEgGQAFgGAIgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgDgJQgJALgNAAQgNAAgIgHgAgUARQABAHAEADQAFAEAGAAQAHAAAFgDQAHgEACgFIAAgSIgLAAQgZAAgBAQg");
	this.shape_90.setTransform(163.35,83.575);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#2C3E50").s().p("AASA8IgdgnIgJAKIAAAdIgOAAIAAh3IAOAAIAABIIAIgJIAagbIARAAIggAiIAkAxg");
	this.shape_91.setTransform(155.5,81.8);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgFQgFgEgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_92.setTransform(139.175,83.5);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgHAAgFAEQgFAEgBAFIgOAAQAAgGAEgGQAFgGAIgDQAHgEAIAAQAPAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgDgJQgJALgNAAQgNAAgIgHgAgUARQABAHAEADQAEAEAIAAQAFAAAGgDQAHgEACgFIAAgSIgLAAQgZAAgBAQg");
	this.shape_93.setTransform(130.4,83.575);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#2C3E50").s().p("AgRA4QgJgEgEgHIAHgJQAJAMAOAAQAJAAAGgGQAGgGAAgLIAAgHQgJAKgOAAQgOAAgKgMQgJgMAAgUQAAgTAJgMQAKgMAPAAQAOAAAJALIAAgJIAOAAIAABRQAAARgKAJQgKAKgQAAQgIAAgJgEgAgOgmQgGAIAAAQQAAAOAGAHQAGAJAJAAQAOAAAGgNIAAglQgHgNgNAAQgJAAgGAJg");
	this.shape_94.setTransform(121.375,85.175);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgFQgFgEgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_95.setTransform(112.625,83.5);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_96.setTransform(104.025,83.575);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#2C3E50").s().p("AgaAxQgJgMAAgUIAAgBQAAgSAJgMQAKgMAPAAQANAAAJAKIAAgsIAPAAIAAB3IgOAAIAAgJQgJALgPAAQgOAAgKgMgAgOgFQgGAHAAAQQAAAOAGAIQAGAJAJAAQAOAAAGgNIAAgmQgGgMgOAAQgJAAgGAJg");
	this.shape_97.setTransform(95.025,81.875);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgFQgFgEgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_98.setTransform(78.975,83.5);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgIAAgFAEQgEAEgBAFIgOAAQAAgGAEgGQAFgGAIgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgDgJQgJALgNAAQgNAAgIgHgAgUARQABAHAEADQAFAEAGAAQAHAAAFgDQAHgEACgFIAAgSIgLAAQgZAAgBAQg");
	this.shape_99.setTransform(70.2,83.575);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#2C3E50").s().p("AgRA4QgJgEgEgHIAHgJQAJAMAOAAQAJAAAGgGQAGgGAAgLIAAgHQgJAKgOAAQgOAAgKgMQgJgMAAgUQAAgTAJgMQAKgMAPAAQAOAAAJALIAAgJIAOAAIAABRQAAARgKAJQgKAKgQAAQgIAAgJgEgAgOgmQgGAIAAAQQAAAOAGAHQAGAJAJAAQAOAAAGgNIAAglQgHgNgNAAQgJAAgGAJg");
	this.shape_100.setTransform(61.175,85.175);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgFQgFgEgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_101.setTransform(52.425,83.5);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#2C3E50").s().p("AgZAkQgHgJAAgPIAAg2IAOAAIAAA1QAAAUAQAAQAQAAAFgNIAAg8IAOAAIAABUIgNAAIgBgJQgIAKgPAAQgOAAgHgHg");
	this.shape_102.setTransform(43.575,83.65);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#2C3E50").s().p("AgVAxIgBAKIgNAAIAAh3IAPAAIAAAtQAIgLAPAAQAPAAAJAMQAJALAAAUIAAABQAAATgJAMQgJAMgPAAQgPAAgJgMgAgUAAIAAAjQAGAOAOAAQAKAAAGgIQAFgJAAgQQAAgOgFgIQgGgIgKAAQgOAAgGAOg");
	this.shape_103.setTransform(34.875,81.875);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#2C3E50").s().p("AgZAkQgHgJAAgPIAAg2IAOAAIAAA1QAAAUAQAAQAQAAAFgNIAAg8IAOAAIAABUIgNAAIgBgJQgIAKgPAAQgOAAgHgHg");
	this.shape_104.setTransform(25.775,83.65);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#2C3E50").s().p("AATA8IAAg4QAAgIgEgFQgFgEgIAAQgGAAgGAEQgFADgDAGIAAA8IgOAAIAAh3IAOAAIAAAuQAKgMAOAAQAbAAAAAdIAAA4g");
	this.shape_105.setTransform(17.025,81.8);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#2C3E50").s().p("AgUArIAAhTIAPAAIAAAJQAGgLANAAIAHABIAAANIgIAAQgNAAgFAMIAAA7g");
	this.shape_106.setTransform(10.35,83.5);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_107.setTransform(3.025,83.575);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#2C3E50").s().p("AgVAxIgBAKIgNAAIAAh3IAPAAIAAAtQAIgLAPAAQAPAAAJAMQAJALAAAUIAAABQAAATgJAMQgJAMgPAAQgPAAgJgMgAgUAAIAAAjQAGAOAOAAQAKAAAGgIQAFgJAAgQQAAgOgFgIQgGgIgKAAQgOAAgGAOg");
	this.shape_108.setTransform(-5.625,81.875);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#2C3E50").s().p("AgRA4QgJgEgEgHIAHgJQAJAMAOAAQAJAAAGgGQAGgGAAgLIAAgHQgJAKgOAAQgOAAgKgMQgJgMAAgUQAAgTAJgMQAKgMAPAAQAOAAAJALIAAgJIAOAAIAABRQAAARgKAJQgKAKgQAAQgIAAgJgEgAgOgmQgGAIAAAQQAAAOAGAHQAGAJAJAAQAOAAAGgNIAAglQgHgNgNAAQgJAAgGAJg");
	this.shape_109.setTransform(245.875,61.975);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_110.setTransform(237.125,60.3);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQAAgHgFgFQgFgEgIAAQgHAAgGAEQgEAEAAAFIgPAAQgBgGAGgGQADgGAJgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgCgJQgLALgNAAQgMAAgIgHgAgUARQAAAHAFADQAFAEAGAAQAHAAAGgDQAFgEAEgFIAAgSIgMAAQgaAAAAAQg");
	this.shape_111.setTransform(228.35,60.375);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#2C3E50").s().p("AgZA7IgFgBIAAgMIAEABQAHAAAEgDQAEgDADgIIADgJIgehSIAQAAIAUA+IAUg+IAPAAIgiBgQgHAVgRAAg");
	this.shape_112.setTransform(220.225,62.075);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_113.setTransform(178.675,60.375);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#2C3E50").s().p("AAtArIAAg3QAAgJgEgEQgFgFgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg3QAAgSgSAAQgPAAgFAMIAAA9IgOAAIAAhTIANAAIABAJQAJgLAQAAQARAAAGANQAEgGAHgEQAHgDAJAAQAcAAAAAeIAAA3g");
	this.shape_114.setTransform(167.375,60.3);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#2C3E50").s().p("AgbAgQgLgMABgUIAAAAQAAgMAEgKQAGgKAIgFQAJgGAKAAQARAAALAMQAKAMAAATIAAABQABAMgFAKQgFAKgJAFQgJAGgLAAQgQAAgLgMgAgRgWQgGAIAAAPQAAAOAGAJQAHAIAKAAQALAAAHgJQAGgIAAgPQAAgOgGgIQgHgJgLAAQgJAAgIAJg");
	this.shape_115.setTransform(155.75,60.375);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#2C3E50").s().p("AgBAvQgFgFgBgLIAAg0IgPAAIAAgLIAPAAIAAgUIAOAAIAAAUIAQAAIAAALIgQAAIAAA0QAAAFACACQADADAEAAIAHgBIAAAMIgLABQgKAAgDgGg");
	this.shape_116.setTransform(148.3,59.425);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#2C3E50").s().p("AgQAoQgHgDgFgHQgFgGAAgIIAPAAQAAAIAGAEQAFAEAIAAQAIAAAFgDQAFgEAAgFQAAgGgEgDQgEgEgLgCQgLgCgGgDQgHgDgCgEQgDgFAAgGQgBgKAJgIQAJgHAMAAQAPAAAJAIQAJAHAAAMIgPAAQAAgGgEgFQgGgEgIAAQgGAAgFADQgEAEAAAFQAAAGAEACQAEADAKACQALADAGADQAHADADAEQAEAFAAAHQgBALgIAHQgKAHgOAAQgJAAgIgEg");
	this.shape_117.setTransform(141.8,60.375);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#2C3E50").s().p("AgbAgQgKgMgBgUIAAAAQAAgMAGgKQAEgKAJgFQAJgGAKAAQARAAALAMQALAMAAATIAAABQAAAMgFAKQgFAKgIAFQgJAGgMAAQgQAAgLgMgAgRgWQgGAIAAAPQAAAOAGAJQAHAIAKAAQALAAAGgJQAHgIAAgPQAAgOgHgIQgGgJgLAAQgJAAgIAJg");
	this.shape_118.setTransform(133.1,60.375);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#2C3E50").s().p("AgTArIAAhTIANAAIAAAJQAHgLANAAIAGABIAAANIgHAAQgNAAgFAMIAAA7g");
	this.shape_119.setTransform(126.3,60.3);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#2C3E50").s().p("AgLA9IAAhJIgOAAIAAgLIAOAAIAAgIQAAgOAHgHQAGgIAOAAIAKABIgBAMIgIgBQgHAAgEAFQgEAEAAAHIAAAJIASAAIAAALIgSAAIAABJg");
	this.shape_120.setTransform(120.625,58.525);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_121.setTransform(113.425,60.375);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_122.setTransform(104.675,60.3);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_123.setTransform(62.475,60.375);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_124.setTransform(53.725,60.3);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQgBgHgEgFQgEgEgJAAQgIAAgFAEQgEAEAAAFIgQAAQAAgGAGgGQAEgGAHgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgBgJQgLALgNAAQgMAAgIgHgAgTARQgBAHAFADQAFAEAGAAQAGAAAHgDQAFgEAEgFIAAgSIgMAAQgZAAAAAQg");
	this.shape_125.setTransform(44.95,60.375);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#2C3E50").s().p("AgUArIAAhTIAPAAIAAAJQAGgLANAAIAHABIAAANIgIAAQgNAAgFAMIAAA7g");
	this.shape_126.setTransform(38.35,60.3);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#2C3E50").s().p("AgVAxIgBAKIgNAAIAAh3IAPAAIAAAtQAIgLAPAAQAPAAAJAMQAJALAAAUIAAABQAAATgJAMQgJAMgPAAQgPAAgJgMgAgUAAIAAAjQAGAOAOAAQAKAAAGgIQAFgJAAgQQAAgOgFgIQgGgIgKAAQgOAAgGAOg");
	this.shape_127.setTransform(30.875,58.675);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#2C3E50").s().p("AAtArIAAg3QAAgJgEgEQgFgFgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg3QAAgSgSAAQgPAAgFAMIAAA9IgOAAIAAhTIANAAIABAJQAJgLAQAAQARAAAGANQAEgGAHgEQAHgDAJAAQAcAAAAAeIAAA3g");
	this.shape_128.setTransform(19.225,60.3);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_129.setTransform(8.025,60.375);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#2C3E50").s().p("AAtArIAAg3QAAgJgEgEQgFgFgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg3QAAgSgSAAQgPAAgFAMIAAA9IgOAAIAAhTIANAAIABAJQAJgLAQAAQARAAAGANQAEgGAHgEQAHgDAJAAQAcAAAAAeIAAA3g");
	this.shape_130.setTransform(-3.275,60.3);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#2C3E50").s().p("AgGA6IAAhUIANAAIAABUgAgGgqQgBgDAAgDQAAgEABgCQADgDADAAQAFAAABADQADACAAAEQAAADgDADQgBACgFAAQgDAAgDgCg");
	this.shape_131.setTransform(248.6,35.625);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#2C3E50").s().p("AgZAjQgHgHAAgQIAAg2IAOAAIAAA2QAAATAQAAQAQAAAFgNIAAg8IAOAAIAABTIgNAAIgBgIQgIAKgPAAQgOAAgHgIg");
	this.shape_132.setTransform(242.225,37.25);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#2C3E50").s().p("AgGA8IAAh3IANAAIAAB3g");
	this.shape_133.setTransform(235.875,35.4);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQAAgHgFgFQgFgEgIAAQgIAAgFAEQgEAEAAAFIgPAAQAAgGAEgGQAFgGAIgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgCgJQgKALgNAAQgNAAgIgHgAgUARQAAAHAFADQAFAEAGAAQAHAAAGgDQAFgEAEgFIAAgSIgMAAQgaAAAAAQg");
	this.shape_134.setTransform(229.6,37.175);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#2C3E50").s().p("AgGA8IAAh3IANAAIAAB3g");
	this.shape_135.setTransform(223.275,35.4);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_136.setTransform(217.175,37.175);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#2C3E50").s().p("AAtArIAAg3QAAgJgEgEQgFgFgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg3QAAgSgSAAQgPAAgFANIAAA8IgOAAIAAhUIANAAIABAKQAJgLAQAAQARAAAGANQAEgFAHgFQAHgDAJAAQAcAAAAAdIAAA4g");
	this.shape_137.setTransform(205.875,37.1);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#2C3E50").s().p("AAtArIAAg3QAAgJgEgEQgFgFgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg3QAAgSgSAAQgPAAgFANIAAA8IgOAAIAAhUIANAAIABAKQAJgLAQAAQARAAAGANQAEgFAHgFQAHgDAJAAQAcAAAAAdIAAA4g");
	this.shape_138.setTransform(158.375,37.1);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#2C3E50").s().p("AgZAjQgHgHAAgQIAAg2IAOAAIAAA2QAAATAQAAQAQAAAFgNIAAg8IAOAAIAABTIgNAAIgBgIQgIAKgPAAQgOAAgHgIg");
	this.shape_139.setTransform(146.925,37.25);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#2C3E50").s().p("AgGA6IAAhUIANAAIAABUgAgGgqQgBgDAAgDQAAgEABgCQADgDADAAQAFAAABADQADACAAAEQAAADgDADQgBACgFAAQgDAAgDgCg");
	this.shape_140.setTransform(140.6,35.625);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#2C3E50").s().p("AgaAxQgJgMAAgUIAAgBQAAgSAJgMQAKgMAPAAQANAAAJAKIAAgsIAPAAIAAB3IgOAAIAAgJQgJALgPAAQgOAAgKgMgAgOgFQgGAHAAAQQAAAOAGAIQAGAJAJAAQAOAAAGgNIAAgmQgGgMgOAAQgJAAgGAJg");
	this.shape_141.setTransform(133.975,35.475);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#2C3E50").s().p("AgGA6IAAhUIANAAIAABUgAgFgqQgCgDgBgDQABgEACgCQACgDADAAQAEAAACADQACACAAAEQAAADgCADQgCACgEAAQgDAAgCgCg");
	this.shape_142.setTransform(127.7,35.625);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#2C3E50").s().p("AgUArIAAhUIAOAAIAAAKQAHgLANAAIAHABIAAAOIgIgBQgNAAgFAMIAAA7g");
	this.shape_143.setTransform(123.5,37.1);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#2C3E50").s().p("AgLA9IAAhJIgOAAIAAgLIAOAAIAAgIQAAgOAHgHQAGgIAOAAIAKABIgBAMIgIgBQgHAAgEAFQgEAEAAAHIAAAJIASAAIAAALIgSAAIAABJg");
	this.shape_144.setTransform(117.825,35.325);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_145.setTransform(110.625,37.175);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_146.setTransform(101.875,37.1);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#2C3E50").s().p("AgGA6IAAhUIANAAIAABUgAgFgqQgCgDgBgDQABgEACgCQACgDADAAQAEAAACADQACACAAAEQAAADgCADQgCACgEAAQgDAAgCgCg");
	this.shape_147.setTransform(62,35.625);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#2C3E50").s().p("AASA8IgcgnIgJAJIAAAeIgPAAIAAh3IAPAAIAABHIAHgJIAZgbIASAAIggAjIAkAxg");
	this.shape_148.setTransform(56.55,35.4);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#2C3E50").s().p("AgZAjQgHgHAAgQIAAg2IAOAAIAAA2QAAATAQAAQAQAAAFgNIAAg8IAOAAIAABTIgNAAIgBgIQgIAKgPAAQgOAAgHgIg");
	this.shape_149.setTransform(47.525,37.25);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#2C3E50").s().p("AgQAoQgIgDgEgHQgEgGgBgIIAPAAQAAAIAFAEQAGAEAIAAQAIAAAFgDQAFgEAAgFQAAgGgEgDQgEgEgLgCQgKgCgHgDQgGgDgDgEQgDgFgBgGQAAgKAJgIQAJgHANAAQAOAAAJAIQAJAHAAAMIgOAAQAAgGgGgFQgFgEgHAAQgIAAgEADQgEAEAAAFQAAAGAEACQAEADAKACQAKADAHADQAHADADAEQADAFABAHQgBALgIAHQgJAHgPAAQgJAAgIgEg");
	this.shape_150.setTransform(39,37.175);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQgBgHgEgFQgEgEgJAAQgHAAgGAEQgEAEAAAFIgQAAQAAgGAGgGQAEgGAHgDQAIgEAJAAQAOAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgBgJQgLALgNAAQgMAAgIgHgAgTARQgBAHAFADQAFAEAGAAQAGAAAHgDQAFgEAEgFIAAgSIgMAAQgZAAAAAQg");
	this.shape_151.setTransform(30.55,37.175);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#2C3E50").s().p("AAtArIAAg3QAAgJgEgEQgFgFgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg3QAAgSgSAAQgPAAgFANIAAA8IgOAAIAAhUIANAAIABAKQAJgLAQAAQARAAAGANQAEgFAHgFQAHgDAJAAQAcAAAAAdIAAA4g");
	this.shape_152.setTransform(19.225,37.1);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_153.setTransform(8.025,37.175);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#2C3E50").s().p("AAtArIAAg3QAAgJgEgEQgFgFgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg3QAAgSgSAAQgPAAgFANIAAA8IgOAAIAAhUIANAAIABAKQAJgLAQAAQARAAAGANQAEgFAHgFQAHgDAJAAQAcAAAAAdIAAA4g");
	this.shape_154.setTransform(-3.275,37.1);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#2C3E50").s().p("AATA8IAAg4QAAgIgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAFIAAA8IgOAAIAAh3IAOAAIAAAtQAKgLAOAAQAbAAAAAdIAAA4g");
	this.shape_155.setTransform(246.225,12.2);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#2C3E50").s().p("AgZAkQgHgIAAgQIAAg2IAOAAIAAA2QAAATAQAAQAQAAAFgMIAAg9IAOAAIAABTIgNAAIgBgIQgIAKgPAAQgOAAgHgHg");
	this.shape_156.setTransform(237.375,14.05);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#2C3E50").s().p("AgVAxIgBAKIgNAAIAAh3IAPAAIAAAtQAIgLAPAAQAPAAAJAMQAJALAAAUIAAABQAAATgJAMQgJAMgPAAQgPAAgJgMgAgUAAIAAAjQAGAOAOAAQAKAAAGgIQAFgJAAgQQAAgOgFgIQgGgIgKAAQgOAAgGAOg");
	this.shape_157.setTransform(228.675,12.275);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#2C3E50").s().p("AgZAkQgHgIAAgQIAAg2IAOAAIAAA2QAAATAQAAQAQAAAFgMIAAg9IAOAAIAABTIgNAAIgBgIQgIAKgPAAQgOAAgHgHg");
	this.shape_158.setTransform(219.575,14.05);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#2C3E50").s().p("AgCAvQgEgFAAgLIAAg0IgQAAIAAgLIAQAAIAAgUIANAAIAAAUIAQAAIAAALIgQAAIAAA0QAAAFACACQADADAEAAIAHgBIAAAMIgLABQgJAAgFgGg");
	this.shape_159.setTransform(212.3,13.025);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_160.setTransform(181.375,13.9);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgHAAgFAEQgGAEAAAFIgOAAQAAgGAEgGQAEgGAIgDQAIgEAIAAQAPAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgMAAQgNAAgIgHgAgTARQAAAHAEADQAEAEAIAAQAFAAAGgDQAHgEACgFIAAgSIgLAAQgaAAABAQg");
	this.shape_161.setTransform(172.6,13.975);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#2C3E50").s().p("AgTArIAAhUIANAAIAAAKQAHgLANAAIAGABIAAAOIgHgBQgNAAgFAMIAAA7g");
	this.shape_162.setTransform(166,13.9);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#2C3E50").s().p("AgHA6IAAhUIAOAAIAABUgAgFgqQgDgDAAgDQAAgEADgCQACgDADAAQAEAAADADQABACAAAEQAAADgBADQgDACgEAAQgDAAgCgCg");
	this.shape_163.setTransform(160.9,12.425);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgHAAgFAEQgGAEAAAFIgOAAQAAgGAEgGQAEgGAIgDQAIgEAIAAQAPAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgMAAQgNAAgIgHgAgTARQAAAHAEADQAEAEAIAAQAFAAAGgDQAHgEACgFIAAgSIgLAAQgaAAABAQg");
	this.shape_164.setTransform(154.6,13.975);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#2C3E50").s().p("AgYAgQgLgLAAgUIAAgCQAAgMAFgKQAFgJAIgGQAIgFALAAQAOAAAKAJQAJAIABAOIgOAAQgBgIgFgGQgGgFgIAAQgKAAgGAIQgGAIAAAPIAAACQAAAOAGAIQAGAIAKAAQAIAAAGgFQAFgEABgHIAOAAQgBAHgEAGQgFAHgIAEQgHAEgJAAQgQAAgKgMg");
	this.shape_165.setTransform(146.125,13.975);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#2C3E50").s().p("AgKAOQAHgKABgKIAAgNIANAAIAAALQAAAIgEAHQgEAIgFAFg");
	this.shape_166.setTransform(115.875,18.475);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_167.setTransform(110.125,13.9);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_168.setTransform(101.525,13.975);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#2C3E50").s().p("AAtArIAAg3QAAgJgEgEQgFgFgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg2QAAgTgSAAQgPAAgFANIAAA8IgOAAIAAhUIANAAIABAKQAJgLAQAAQARAAAGAOQAEgHAHgDQAHgEAJAAQAcAAAAAdIAAA4g");
	this.shape_169.setTransform(90.225,13.9);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#2C3E50").s().p("AgRA4QgJgEgEgHIAHgJQAJAMAOAAQAJAAAGgGQAGgGAAgLIAAgHQgJAKgOAAQgOAAgKgMQgJgMAAgUQAAgTAJgMQAKgMAPAAQAOAAAJALIAAgJIAOAAIAABRQAAARgKAJQgKAKgQAAQgIAAgJgEgAgOgmQgGAIAAAQQAAAOAGAHQAGAJAJAAQAOAAAGgNIAAglQgHgNgNAAQgJAAgGAJg");
	this.shape_170.setTransform(78.525,15.575);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_171.setTransform(70.025,13.975);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#2C3E50").s().p("AgQAoQgIgDgEgHQgFgGABgIIAOAAQABAIAFAEQAFAEAIAAQAIAAAFgDQAFgEAAgFQAAgGgEgDQgFgEgKgCQgKgCgHgDQgGgDgEgEQgDgFAAgGQABgKAIgIQAJgHAMAAQAPAAAJAIQAJAHAAAMIgPAAQAAgGgEgFQgGgEgIAAQgGAAgFADQgEAEAAAFQAAAGAEACQAEADAKACQAKADAIADQAGADAEAEQACAFAAAHQABALgKAHQgJAHgOAAQgJAAgIgEg");
	this.shape_172.setTransform(61.55,13.975);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#2C3E50").s().p("AgjA7IAAh0IANAAIABAKQAJgLAPAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgPAAgIgJIAAAogAgUgiIAAAnQAGAMANAAQAKAAAGgJQAGgIAAgPQAAgPgGgIQgGgIgKAAQgNAAgGAMg");
	this.shape_173.setTransform(28.975,15.525);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQAAgHgEgFQgEgEgJAAQgHAAgFAEQgGAEAAAFIgPAAQABgGAFgGQAEgGAHgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgNAAQgMAAgIgHgAgTARQAAAHAEADQAEAEAIAAQAGAAAFgDQAHgEACgFIAAgSIgLAAQgaAAABAQg");
	this.shape_174.setTransform(19.95,13.975);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#2C3E50").s().p("AgHA6IAAhUIAOAAIAABUgAgGgqQgCgDAAgDQAAgEACgCQADgDADAAQAFAAACADQABACAAAEQAAADgBADQgCACgFAAQgDAAgDgCg");
	this.shape_175.setTransform(13.65,12.425);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#2C3E50").s().p("AgBAvQgFgFgBgLIAAg0IgPAAIAAgLIAPAAIAAgUIAOAAIAAAUIAQAAIAAALIgQAAIAAA0QAAAFACACQADADAEAAIAHgBIAAAMIgLABQgKAAgDgGg");
	this.shape_176.setTransform(8.8,13.025);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_177.setTransform(2.275,13.975);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#2C3E50").s().p("AgQAoQgHgDgFgHQgEgGAAgIIAOAAQABAIAEAEQAGAEAIAAQAIAAAFgDQAFgEAAgFQAAgGgEgDQgFgEgKgCQgKgCgHgDQgGgDgDgEQgEgFAAgGQAAgKAJgIQAJgHANAAQAOAAAJAIQAJAHAAAMIgOAAQgBgGgFgFQgFgEgHAAQgIAAgEADQgEAEAAAFQAAAGAEACQAEADAKACQAKADAIADQAGADADAEQADAFAAAHQAAALgJAHQgIAHgPAAQgJAAgIgEg");
	this.shape_178.setTransform(-6.2,13.975);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#2C3E50").s().p("AgHA6IAAhUIAOAAIAABUgAgFgqQgDgDAAgDQAAgEADgCQACgDADAAQAEAAADADQABACAAAEQAAADgBADQgDACgEAAQgDAAgCgCg");
	this.shape_179.setTransform(248.65,-10.775);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#2C3E50").s().p("AgaAxQgJgMAAgUIAAgBQAAgSAJgMQAKgMAPAAQANAAAJAKIAAgsIAPAAIAAB3IgOAAIAAgJQgJALgPAAQgOAAgKgMgAgOgFQgGAHAAAQQAAAOAGAIQAGAJAJAAQAOAAAGgNIAAgmQgGgMgOAAQgJAAgGAJg");
	this.shape_180.setTransform(242.025,-10.925);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#2C3E50").s().p("AgUBKQAMgKAIgSQAGgUAAgYIAAgCQAAgPgDgPQgDgOgGgLQgGgMgIgFIADgJQALAFAIAOQAJANAFAQQAFARAAARQAAARgFAQQgFAQgJAOQgIANgLAFg");
	this.shape_181.setTransform(229.225,-9.6);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQAAgHgFgFQgFgEgIAAQgHAAgGAEQgEAEAAAFIgQAAQAAgGAGgGQADgGAJgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgCgJQgLALgNAAQgMAAgIgHgAgUARQAAAHAFADQAFAEAGAAQAGAAAHgDQAFgEAEgFIAAgSIgMAAQgaAAAAAQg");
	this.shape_182.setTransform(222.5,-9.225);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#2C3E50").s().p("AgGA6IAAhUIANAAIAABUgAgFgqQgCgDAAgDQAAgEACgCQACgDADAAQAFAAABADQADACAAAEQAAADgDADQgBACgFAAQgDAAgCgCg");
	this.shape_183.setTransform(216.2,-10.775);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#2C3E50").s().p("AgaAxQgJgMAAgUIAAgBQAAgSAJgMQAKgMAPAAQANAAAJAKIAAgsIAPAAIAAB3IgOAAIAAgJQgJALgPAAQgOAAgKgMgAgOgFQgGAHAAAQQAAAOAGAIQAGAJAJAAQAOAAAGgNIAAgmQgGgMgOAAQgJAAgGAJg");
	this.shape_184.setTransform(209.575,-10.925);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#2C3E50").s().p("AgGA6IAAhUIANAAIAABUgAgFgqQgCgDgBgDQABgEACgCQACgDADAAQAEAAACADQACACAAAEQAAADgCADQgCACgEAAQgDAAgCgCg");
	this.shape_185.setTransform(203.3,-10.775);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#2C3E50").s().p("AgUArIAAhTIAOAAIAAAJQAHgLANAAIAGABIAAANIgHAAQgNAAgFAMIAAA7g");
	this.shape_186.setTransform(199.1,-9.3);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#2C3E50").s().p("AgLA9IAAhJIgOAAIAAgLIAOAAIAAgIQAAgOAHgHQAGgIAOAAIAKABIgBAMIgIgBQgHAAgEAFQgEAEAAAHIAAAJIASAAIAAALIgSAAIAABJg");
	this.shape_187.setTransform(193.425,-11.075);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_188.setTransform(186.225,-9.225);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgFQgFgEgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_189.setTransform(177.475,-9.3);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#2C3E50").s().p("AgBBAQgSgbAAglQAAgRAEgQQAFgRAJgMQAIgOAKgFIADAJQgLAJgHASQgHASAAAWIAAAGQAAAeAKAWQAHANAIAIIgDAIQgKgFgIgNg");
	this.shape_190.setTransform(170.7,-9.6);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgFQgFgEgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_191.setTransform(157.875,-9.3);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQAAgHgEgFQgEgEgJAAQgHAAgFAEQgGAEAAAFIgPAAQABgGAFgGQAEgGAHgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgNAAQgMAAgIgHgAgTARQAAAHAEADQAEAEAIAAQAGAAAFgDQAHgEACgFIAAgSIgLAAQgaAAABAQg");
	this.shape_192.setTransform(149.1,-9.225);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#2C3E50").s().p("AgRA4QgJgEgEgHIAHgJQAJAMAOAAQAJAAAGgGQAGgGAAgLIAAgHQgJAKgOAAQgOAAgKgMQgJgMAAgUQAAgTAJgMQAKgMAPAAQAOAAAJALIAAgJIAOAAIAABRQAAARgKAJQgKAKgQAAQgIAAgJgEgAgOgmQgGAIAAAQQAAAOAGAHQAGAJAJAAQAOAAAGgNIAAglQgHgNgNAAQgJAAgGAJg");
	this.shape_193.setTransform(140.075,-7.625);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#2C3E50").s().p("AgTArIAAhTIANAAIAAAJQAHgLANAAIAGABIAAANIgHAAQgNAAgFAMIAAA7g");
	this.shape_194.setTransform(133.5,-9.3);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#2C3E50").s().p("AgaAgQgMgMAAgUIAAAAQABgMAFgKQAEgKAJgFQAJgGAKAAQARAAALAMQAKAMAAATIAAABQAAAMgEAKQgFAKgIAFQgKAGgLAAQgQAAgKgMgAgQgWQgHAIAAAPQAAAOAHAJQAGAIAKAAQALAAAHgJQAGgIAAgPQAAgOgGgIQgHgJgLAAQgKAAgGAJg");
	this.shape_195.setTransform(125.75,-9.225);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#2C3E50").s().p("AgRA4QgJgEgEgHIAHgJQAJAMAOAAQAJAAAGgGQAGgGAAgLIAAgHQgJAKgOAAQgOAAgKgMQgJgMAAgUQAAgTAJgMQAKgMAPAAQAOAAAJALIAAgJIAOAAIAABRQAAARgKAJQgKAKgQAAQgIAAgJgEgAgOgmQgGAIAAAQQAAAOAGAHQAGAJAJAAQAOAAAGgNIAAglQgHgNgNAAQgJAAgGAJg");
	this.shape_196.setTransform(111.225,-7.625);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgFQgFgEgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_197.setTransform(102.475,-9.3);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQAAgHgFgFQgFgEgIAAQgIAAgFAEQgEAEAAAFIgPAAQAAgGAEgGQAFgGAIgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgCgJQgKALgNAAQgNAAgIgHgAgUARQAAAHAFADQAFAEAGAAQAHAAAGgDQAFgEAEgFIAAgSIgMAAQgaAAAAAQg");
	this.shape_198.setTransform(93.7,-9.225);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#2C3E50").s().p("AgQAoQgHgDgFgHQgFgGAAgIIAPAAQAAAIAGAEQAFAEAIAAQAIAAAFgDQAFgEAAgFQAAgGgEgDQgEgEgLgCQgLgCgGgDQgHgDgDgEQgCgFAAgGQAAgKAIgIQAJgHAMAAQAPAAAJAIQAJAHAAAMIgPAAQAAgGgEgFQgGgEgIAAQgGAAgFADQgEAEAAAFQAAAGAEACQAEADAKACQALADAGADQAHADAEAEQADAFAAAHQAAALgJAHQgKAHgOAAQgJAAgIgEg");
	this.shape_199.setTransform(85.2,-9.225);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgHAAgFAEQgGAEAAAFIgOAAQAAgGAEgGQAEgGAIgDQAIgEAIAAQAPAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgMAAQgNAAgIgHgAgUARQABAHAEADQAEAEAIAAQAFAAAGgDQAHgEACgFIAAgSIgLAAQgaAAAAAQg");
	this.shape_200.setTransform(76.75,-9.225);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#2C3E50").s().p("AgjA7IAAh0IANAAIABAKQAJgLAPAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgPAAgIgJIAAAogAgUgiIAAAnQAGAMANAAQAKAAAGgJQAGgIAAgPQAAgPgGgIQgGgIgKAAQgNAAgGAMg");
	this.shape_201.setTransform(68.075,-7.675);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_202.setTransform(59.225,-9.225);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#2C3E50").s().p("AgQAoQgIgDgEgHQgFgGABgIIAOAAQABAIAFAEQAFAEAIAAQAIAAAFgDQAFgEAAgFQAAgGgEgDQgFgEgKgCQgKgCgHgDQgGgDgEgEQgCgFAAgGQAAgKAIgIQAJgHAMAAQAPAAAJAIQAJAHAAAMIgPAAQAAgGgEgFQgGgEgIAAQgGAAgFADQgEAEAAAFQAAAGAEACQAEADAKACQAKADAIADQAGADAEAEQACAFAAAHQABALgKAHQgJAHgOAAQgJAAgIgEg");
	this.shape_203.setTransform(50.75,-9.225);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#2C3E50").s().p("AgHA6IAAhUIAOAAIAABUgAgFgqQgDgDAAgDQAAgEADgCQACgDADAAQAEAAACADQACACAAAEQAAADgCADQgCACgEAAQgDAAgCgCg");
	this.shape_204.setTransform(39.4,-10.775);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#2C3E50").s().p("AgZAkQgHgJAAgPIAAg2IAOAAIAAA1QAAAUAQAAQAQAAAFgMIAAg9IAOAAIAABTIgNAAIgBgIQgIAKgPAAQgOAAgHgHg");
	this.shape_205.setTransform(33.025,-9.15);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#2C3E50").s().p("AgGA8IAAh3IANAAIAAB3g");
	this.shape_206.setTransform(26.675,-11);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQAAgHgEgFQgEgEgJAAQgHAAgFAEQgGAEAAAFIgPAAQABgGAEgGQAFgGAHgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgNAAQgMAAgIgHgAgTARQAAAHAEADQAEAEAIAAQAGAAAFgDQAHgEACgFIAAgSIgLAAQgaAAABAQg");
	this.shape_207.setTransform(20.4,-9.225);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#2C3E50").s().p("AgGA8IAAh3IANAAIAAB3g");
	this.shape_208.setTransform(14.075,-11);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_209.setTransform(7.975,-9.225);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#2C3E50").s().p("AAqA5IAAgtIABguIglBbIgLAAIglhbIABAuIAAAtIgPAAIAAhxIAUAAIAkBcIAlhcIAUAAIAABxg");
	this.shape_210.setTransform(-3.325,-10.675);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,3.721,-161.2,-161.9)).s().p("A5MZTMAAAgylMAyYAAAMAAAAylg");
	this.shape_211.setTransform(124.45,86.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-36.8,-75.5,322.5,323.7);


(lib.drop3G2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AggA4IAAhtIAMAAIABAJQAIgLAOAAQAOAAAIALQAIALAAATIAAABQAAASgIAKQgIAMgOAAQgOgBgIgIIAAAmgAgTggIAAAkQAGALANAAQAIAAAGgIQAGgHAAgOQAAgOgGgHQgGgIgIAAQgNAAgGALg");
	this.shape.setTransform(162.025,96.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_1.setTransform(153.525,95.475);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgCAsQgEgFAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAALIgLABQgJAAgEgGg");
	this.shape_2.setTransform(146.775,94.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_3.setTransform(140.425,95.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgCAsQgEgFAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAALIgLABQgJAAgEgGg");
	this.shape_4.setTransform(133.675,94.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_5.setTransform(129.3,95.325);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgWAfQgLgLABgSIAAgCQAAgLAEgKQAEgJAJgFQAIgFAIAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAIQAIAHAIAAQAIAAAEgDQAGgDADgFIAIAGQgKAQgTAAQgPAAgKgKgAgMgXQgFAGgCALIAnAAIAAgBQAAgLgGgFQgEgGgJAAQgHAAgGAGg");
	this.shape_6.setTransform(122.5,95.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgCAsQgEgFAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAALIgLABQgJAAgEgGg");
	this.shape_7.setTransform(115.825,94.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AARA4IAAg0QAAgIgDgEQgEgEgJAAQgFAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLANAAQAZAAAAAbIAAA0g");
	this.shape_8.setTransform(105.8,93.725);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_9.setTransform(97.575,95.4);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_10.setTransform(91.35,95.325);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_11.setTransform(84.325,95.4);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgYAuQgJgMABgSIAAgBQgBgRAJgLQAJgLANAAQANAAAJAKIAAgqIANAAIAABwIgMAAIgBgJQgIAKgOAAQgNAAgJgLgAgNgFQgGAGAAAQQAAANAGAIQAFAIAJAAQANAAAGgMIAAgkQgGgKgNgBQgJAAgFAIg");
	this.shape_12.setTransform(75.85,93.8);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_13.setTransform(63.95,95.325);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_14.setTransform(55.725,95.4);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_15.setTransform(49.5,95.325);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_16.setTransform(42.475,95.4);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgYAuQgJgMABgSIAAgBQgBgRAJgLQAJgLANAAQANAAAJAKIAAgqIANAAIAABwIgMAAIgBgJQgIAKgOAAQgNAAgJgLgAgNgFQgGAGAAAQQAAANAGAIQAFAIAJAAQANAAAGgMIAAgkQgGgKgNgBQgJAAgFAIg");
	this.shape_17.setTransform(34,93.8);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgWAfQgLgLABgSIAAgCQgBgLAFgKQAEgJAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAGAIQAIAHAJAAQAGAAAFgDQAFgDAEgFIAIAGQgKAQgTAAQgPAAgKgKgAgMgXQgGAGgBALIAnAAIAAgBQgBgLgFgFQgEgGgJAAQgHAAgGAGg");
	this.shape_18.setTransform(26.1,95.4);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgEALIAAA3g");
	this.shape_19.setTransform(19.9,95.325);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgXAfQgJgLgBgSIAAgCQAAgLAFgKQAFgJAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAIQAHAHAIAAQAHAAAGgDQAEgDAEgFIAJAGQgKAQgVAAQgPAAgKgKgAgMgXQgFAGgBALIAmAAIAAgBQAAgLgFgFQgGgGgIAAQgHAAgGAGg");
	this.shape_20.setTransform(13.1,95.4);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AggA4IAAhtIAMAAIABAJQAIgLAOAAQAOAAAIALQAIALAAATIAAABQAAASgIAKQgIAMgOAAQgOgBgIgIIAAAmgAgTggIAAAkQAGALANAAQAIAAAGgIQAGgHAAgOQAAgOgGgHQgGgIgIAAQgNAAgGALg");
	this.shape_21.setTransform(5.025,96.85);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_22.setTransform(256.575,73.325);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgWAeQgLgKABgSIAAgCQgBgLAFgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAHAIQAHAHAJAAQAGAAAFgDQAFgDAEgFIAIAHQgKAPgTAAQgPAAgKgLgAgMgXQgGAGgBAKIAnAAIAAgBQgBgKgFgGQgEgFgJAAQgHAAgGAGg");
	this.shape_23.setTransform(246.15,73.4);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgCAsQgEgFAAgKIAAgwIgPAAIAAgKIAPAAIAAgUIAMAAIAAAUIAPAAIAAAKIgPAAIAAAwQAAAEACADQACACAFAAIAHgBIAAALIgLACQgJAAgEgGg");
	this.shape_24.setTransform(239.475,72.5);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgPAlQgHgDgFgGQgDgGAAgHIANAAQABAHAFAEQAEAEAIAAQAHAAAGgDQAEgEAAgFQAAgFgEgDQgEgDgKgCQgKgDgGgCQgGgCgDgFQgDgEAAgGQAAgJAJgIQAIgGALAAQAOAAAJAGQAHAHABALIgOAAQAAgFgEgEQgGgEgHAAQgGAAgEADQgFAEABAEQAAAFADADQAEADAKABQAKADAGADQAGADADAEQAEAEAAAHQAAAKgJAHQgIAGgOAAQgIAAgIgEg");
	this.shape_25.setTransform(233.35,73.4);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_26.setTransform(227.7,71.95);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgPAlQgHgDgEgGQgFgGAAgHIAOAAQABAHAEAEQAGAEAHAAQAIAAAEgDQAFgEAAgFQAAgFgEgDQgFgDgJgCQgKgDgGgCQgGgCgDgFQgDgEAAgGQAAgJAIgIQAJgGAMAAQANAAAIAGQAJAHAAALIgOAAQAAgFgFgEQgEgEgHAAQgHAAgEADQgEAEAAAEQAAAFADADQAFADAJABQAKADAGADQAHADADAEQACAEAAAHQAAAKgIAHQgJAGgNAAQgIAAgIgEg");
	this.shape_27.setTransform(221.95,73.4);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_28.setTransform(195.55,71.95);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_29.setTransform(190.425,71.725);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_30.setTransform(184.3,71.95);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_31.setTransform(180.625,71.725);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_32.setTransform(177,71.95);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_33.setTransform(168.575,73.325);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgXAeQgKgKABgSIAAgCQAAgLAEgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAIQAHAHAJAAQAIAAAEgDQAGgDADgFIAIAHQgJAPgVAAQgOAAgLgLgAgMgXQgGAGAAAKIAmAAIAAgBQAAgKgGgGQgEgFgJAAQgHAAgGAGg");
	this.shape_34.setTransform(158.15,73.4);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_35.setTransform(147.525,73.325);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_36.setTransform(116.125,73.4);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgQA0QgIgDgEgHIAHgIQAIALANAAQAJAAAGgGQAFgFAAgKIAAgHQgJAJgMAAQgOAAgJgLQgJgLAAgTQAAgSAJgLQAJgLAOAAQAOAAAHAKIABgIIANAAIAABMQAAAPgJAJQgKAJgPAAQgIAAgIgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgJAAgFAHg");
	this.shape_37.setTransform(107.7,74.875);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgQA0QgIgDgEgHIAGgIQAJALANAAQAJAAAFgGQAGgFAAgKIAAgHQgIAJgNAAQgPAAgIgLQgJgLAAgTQAAgSAJgLQAIgLAPAAQAOAAAHAKIABgIIANAAIAABMQgBAPgIAJQgKAJgPAAQgHAAgJgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgIAAgHAHg");
	this.shape_38.setTransform(99.3,74.875);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AASAoIAAgzQAAgJgFgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_39.setTransform(91.1,73.325);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_40.setTransform(85.15,71.95);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AARA4IAAg0QAAgIgEgEQgDgEgIAAQgGAAgFAEQgFADgCAFIAAA4IgOAAIAAhvIAOAAIAAArQAIgLANAAQAaAAAAAbIAAA0g");
	this.shape_41.setTransform(79.2,71.725);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgXAeQgKgKABgSIAAgCQAAgLAEgJQAEgKAJgFQAIgFAIAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAIQAIAHAIAAQAIAAAEgDQAGgDADgFIAIAHQgKAPgTAAQgPAAgLgLgAgMgXQgFAGgCAKIAnAAIAAgBQAAgKgGgGQgEgFgJAAQgHAAgGAGg");
	this.shape_42.setTransform(71.2,73.4);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgPAlQgHgDgFgGQgDgGAAgHIANAAQABAHAFAEQAEAEAIAAQAHAAAGgDQAEgEAAgFQAAgFgEgDQgEgDgKgCQgKgDgGgCQgGgCgDgFQgDgEAAgGQAAgJAJgIQAIgGALAAQAOAAAJAGQAHAHABALIgOAAQAAgFgEgEQgGgEgHAAQgGAAgEADQgFAEABAEQAAAFADADQAEADAKABQAKADAGADQAGADADAEQAEAEAAAHQAAAKgJAHQgIAGgOAAQgIAAgIgEg");
	this.shape_43.setTransform(63.25,73.4);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AARA4IAAg0QAAgIgDgEQgEgEgIAAQgGAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLAMAAQAaAAAAAbIAAA0g");
	this.shape_44.setTransform(34.55,71.725);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_45.setTransform(26.275,73.475);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgTAuIgBAJIgNAAIAAhvIAOAAIAAAqQAIgKANAAQAPAAAIALQAJAKAAASIAAACQAAASgJALQgJALgOAAQgOAAgHgLgAgTgBIAAAiQAGAMANAAQAJABAGgIQAFgHAAgQQAAgNgFgHQgGgHgJAAQgNgBgGAMg");
	this.shape_46.setTransform(18.15,71.8);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_47.setTransform(9.625,73.475);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgCAsQgEgFAAgKIAAgwIgPAAIAAgKIAPAAIAAgUIAMAAIAAAUIAPAAIAAAKIgPAAIAAAwQAAAEACADQACACAFAAIAHgBIAAALIgLACQgJAAgEgGg");
	this.shape_48.setTransform(2.875,72.5);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AARA4IAAg0QAAgIgDgEQgEgEgIAAQgGAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLAMAAQAaAAAAAbIAAA0g");
	this.shape_49.setTransform(259.1,49.725);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_50.setTransform(250.825,51.475);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_51.setTransform(244.55,51.325);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_52.setTransform(237.475,51.475);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_53.setTransform(231.525,49.725);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgXAfQgJgLgBgSIAAgCQABgLAEgKQAFgIAHgGQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAGAHQAIAIAIAAQAHAAAGgDQAFgDADgFIAJAGQgKAQgVAAQgOAAgLgKgAgMgXQgFAGgBALIAmAAIAAgBQAAgLgFgFQgGgGgIAAQgHAAgGAGg");
	this.shape_54.setTransform(225.85,51.4);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgPAmQgHgEgEgGQgFgGAAgHIAOAAQABAHAEAEQAGAEAHAAQAIAAAEgDQAFgDAAgFQAAgGgEgDQgFgDgJgDQgKgBgGgDQgGgCgDgFQgDgEAAgGQAAgKAIgGQAJgHAMAAQANAAAIAHQAJAGgBAMIgNAAQAAgGgFgEQgEgEgHAAQgHAAgEADQgEADAAAGQAAAFADACQAFADAJACQAKACAGADQAHADADAEQACAEAAAHQAAAKgIAGQgJAHgNAAQgIAAgIgDg");
	this.shape_55.setTransform(217.9,51.4);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AgWAfQgKgLAAgSIAAgCQgBgLAFgKQAFgIAHgGQAIgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAHAHQAGAIAKAAQAHAAAEgDQAFgDAEgFIAJAGQgLAQgTAAQgQAAgJgKgAgMgXQgFAGgCALIAnAAIAAgBQgBgLgEgFQgFgGgJAAQgHAAgGAGg");
	this.shape_56.setTransform(204.1,51.4);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_57.setTransform(196.775,49.725);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AARA4IAAg0QAAgIgEgEQgDgEgIAAQgGAAgFAEQgFADgCAFIAAA4IgOAAIAAhvIAOAAIAAArQAIgLANAAQAaAAAAAbIAAA0g");
	this.shape_58.setTransform(182.25,49.725);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_59.setTransform(174.025,51.4);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_60.setTransform(167.8,51.325);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_61.setTransform(160.775,51.4);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AgYAuQgIgMgBgSIAAgBQABgRAIgLQAIgLAOAAQANAAAJAJIAAgpIANAAIAABvIgMAAIgBgIQgIAKgOAAQgNAAgJgLgAgOgFQgFAGAAAQQAAANAFAIQAGAHAJABQANAAAGgMIAAgjQgGgMgNAAQgJAAgGAIg");
	this.shape_62.setTransform(152.3,49.8);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_63.setTransform(138.075,51.4);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AggA4IAAhtIAMAAIABAJQAIgKAOAAQAOgBAIALQAIALAAATIAAABQAAASgIAKQgIAMgOAAQgOgBgIgIIAAAmgAgTggIAAAkQAGALANAAQAIAAAGgHQAGgIAAgPQAAgNgGgHQgGgIgIAAQgNAAgGALg");
	this.shape_64.setTransform(129.975,52.85);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_65.setTransform(119.025,51.325);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AgZAeQgKgLAAgTIAAAAQAAgMAFgJQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAALgEAJQgFAKgIAFQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgJAAgNQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_66.setTransform(108.175,51.4);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_67.setTransform(97.325,51.325);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AgXAfQgJgLgBgSIAAgCQAAgLAFgKQAFgIAHgGQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAHQAHAIAIAAQAHAAAGgDQAEgDAEgFIAJAGQgKAQgVAAQgPAAgKgKgAgMgXQgFAGgBALIAmAAIAAgBQAAgLgFgFQgGgGgIAAQgHAAgGAGg");
	this.shape_68.setTransform(86.9,51.4);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_69.setTransform(76.275,51.325);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2C3E50").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCADgEgBQgDABgCgDg");
	this.shape_70.setTransform(61.8,49.95);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2C3E50").s().p("AgPAmQgHgEgFgGQgDgGAAgHIANAAQABAHAFAEQAEAEAIAAQAHAAAGgDQAEgDAAgFQAAgGgEgDQgEgDgKgDQgKgBgGgDQgGgCgDgFQgDgEAAgGQAAgKAJgGQAIgHALAAQAOAAAJAHQAHAGABAMIgOAAQAAgGgEgEQgGgEgHAAQgGAAgEADQgFADABAGQAAAFADACQAEADAKACQAKACAGADQAGADADAEQAEAEAAAHQAAAKgJAGQgIAHgOAAQgIAAgIgDg");
	this.shape_71.setTransform(56.05,51.4);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2C3E50").s().p("AgQA0QgIgDgEgHIAHgIQAIALANAAQAJAAAGgGQAFgFAAgKIAAgHQgJAJgMAAQgOAAgJgLQgJgLAAgTQAAgSAJgLQAJgLAOAAQAOAAAHAKIABgIIANAAIAABMQAAAPgJAJQgKAJgPAAQgIAAgIgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgJAAgFAHg");
	this.shape_72.setTransform(47.85,52.875);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#2C3E50").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_73.setTransform(39.65,51.325);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_74.setTransform(31.375,51.475);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#2C3E50").s().p("AgKA5IAAhEIgNAAIAAgKIANAAIAAgIQAAgNAGgHQAGgHANAAIAJABIgBALIgHgBQgHAAgDAFQgEADAAAIIAAAIIARAAIAAAKIgRAAIAABEg");
	this.shape_75.setTransform(24.9,49.65);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgEALIAAA3g");
	this.shape_76.setTransform(19.9,51.325);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#2C3E50").s().p("AgXAfQgJgLgBgSIAAgCQAAgLAFgKQAFgIAHgGQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAHQAHAIAIAAQAHAAAGgDQAEgDAEgFIAJAGQgKAQgVAAQgPAAgKgKgAgMgXQgFAGgBALIAmAAIAAgBQAAgLgFgFQgGgGgIAAQgHAAgGAGg");
	this.shape_77.setTransform(13.1,51.4);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#2C3E50").s().p("AgUAvIgBAIIgLAAIAAhvIANAAIAAAqQAIgKAOAAQAOAAAIAKQAJALgBATIAAABQABASgJALQgJALgNAAQgOAAgJgKgAgTAAIAAAhQAGANANAAQAJgBAFgHQAGgIAAgPQAAgOgGgGQgFgIgJAAQgOAAgFANg");
	this.shape_78.setTransform(5.05,49.8);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#2C3E50").s().p("AgPAlQgIgDgEgGQgDgGAAgHIANAAQAAAHAGAEQAEAEAIAAQAHAAAGgDQAEgEAAgFQAAgFgEgDQgEgDgKgCQgKgCgGgDQgGgDgDgEQgDgEAAgGQAAgJAJgIQAHgGAMAAQAOAAAJAGQAHAIAAAKIgNAAQAAgFgFgEQgEgEgIAAQgGAAgEADQgFAEAAAEQAAAFAFADQAEADAIABQALADAGADQAGADADAEQADAEABAGQAAALgJAGQgJAHgNAAQgJAAgHgEg");
	this.shape_79.setTransform(259.25,29.4);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_80.setTransform(251.275,29.475);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#2C3E50").s().p("AgQA0QgIgDgFgHIAIgIQAIALANAAQAJAAAGgGQAFgFAAgKIAAgHQgJAJgMAAQgOAAgJgLQgJgLABgTQgBgSAJgLQAIgLAPAAQAOAAAIAKIAAgIIAMAAIAABMQABAPgKAJQgJAJgPAAQgHAAgJgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgJAAgFAHg");
	this.shape_81.setTransform(242.8,30.875);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#2C3E50").s().p("AgYAiQgIgHAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_82.setTransform(234.675,29.4);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#2C3E50").s().p("AgLA5IAAhEIgMAAIAAgKIAMAAIAAgJQAAgMAHgHQAGgHAMAAIAKABIgBALIgIAAQgGAAgEADQgDAEAAAHIAAAJIARAAIAAAKIgRAAIAABEg");
	this.shape_83.setTransform(228.25,27.65);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#2C3E50").s().p("AgZAeQgKgMAAgSIAAAAQAAgLAFgKQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAAMgEAJQgFAIgIAGQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgJAAgNQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_84.setTransform(221.125,29.4);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#2C3E50").s().p("AgPAlQgHgDgEgGQgFgGAAgHIAOAAQABAHAEAEQAGAEAHAAQAIAAAEgDQAFgEAAgFQAAgFgEgDQgFgDgJgCQgKgCgGgDQgGgDgDgEQgDgEAAgGQAAgJAIgIQAJgGAMAAQANAAAIAGQAJAIAAAKIgOAAQAAgFgFgEQgEgEgHAAQgHAAgEADQgEAEAAAEQAAAFADADQAFADAJABQAKADAGADQAHADADAEQACAEAAAGQAAALgIAGQgJAHgNAAQgIAAgIgEg");
	this.shape_85.setTransform(212.95,29.4);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#2C3E50").s().p("AgXAfQgJgLgBgSIAAgCQAAgLAFgJQAFgKAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAIQAHAHAIAAQAHAAAGgDQAEgDAEgFIAJAHQgKAPgVAAQgPAAgKgKgAgMgXQgFAGgBAKIAmAAIAAgBQAAgKgFgGQgGgFgIAAQgHAAgGAGg");
	this.shape_86.setTransform(205.25,29.4);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#2C3E50").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_87.setTransform(192.65,27.95);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_88.setTransform(188.65,29.325);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#2C3E50").s().p("AgYAiQgIgHAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_89.setTransform(181.625,29.4);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#2C3E50").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_90.setTransform(174.275,27.725);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#2C3E50").s().p("AgQA0QgIgDgFgHIAHgIQAKALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgIAJgOAAQgNAAgJgLQgIgLAAgTQAAgSAIgLQAJgLAOAAQANAAAJAKIAAgIIAMAAIAABMQABAPgKAJQgJAJgPAAQgIAAgIgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgJAAgFAHg");
	this.shape_91.setTransform(165.6,30.875);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#2C3E50").s().p("AARAoIAAgzQAAgJgDgEQgEgEgIAAQgGAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_92.setTransform(157.4,29.325);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_93.setTransform(151.45,27.95);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_94.setTransform(147.775,27.725);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#2C3E50").s().p("AgWAfQgKgLAAgSIAAgCQgBgLAFgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAHAIQAGAHAKAAQAGAAAFgDQAFgDAEgFIAIAHQgKAPgTAAQgQAAgJgKgAgMgXQgGAGgBAKIAnAAIAAgBQgBgKgEgGQgFgFgJAAQgHAAgGAGg");
	this.shape_95.setTransform(142.1,29.4);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_96.setTransform(131.475,29.325);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#2C3E50").s().p("AgQA0QgIgDgEgHIAGgIQAJALANAAQAJAAAGgGQAFgFAAgKIAAgHQgIAJgNAAQgPAAgIgLQgJgLAAgTQAAgSAJgLQAIgLAPAAQAOAAAHAKIABgIIANAAIAABMQgBAPgIAJQgKAJgPAAQgIAAgIgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgIAAgHAHg");
	this.shape_97.setTransform(113.8,30.875);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#2C3E50").s().p("AASAoIAAgzQAAgJgFgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_98.setTransform(105.6,29.325);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#2C3E50").s().p("AgYAiQgIgHAAgKQAAgMAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_99.setTransform(97.375,29.4);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#2C3E50").s().p("AgXA3IgFAAIAAgLIAEAAQAGgBAEgCQAEgDADgIIADgIIgdhMIAPAAIATA5IASg5IAPAAIggBaQgGATgQAAg");
	this.shape_100.setTransform(89.725,31);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#2C3E50").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_101.setTransform(75.3,29.325);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#2C3E50").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_102.setTransform(69.35,27.95);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#2C3E50").s().p("AgTAvIgBAJIgNAAIAAhwIAOAAIAAAqQAIgKANAAQAPAAAIALQAJALAAARIAAACQAAASgJALQgIALgPAAQgOAAgHgKgAgTgBIAAAiQAGAMANAAQAJABAGgIQAFgHAAgQQAAgNgFgHQgGgHgJAAQgNgBgGAMg");
	this.shape_103.setTransform(63.5,27.8);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#2C3E50").s().p("AgZAeQgKgMAAgSIAAAAQAAgLAFgKQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAAMgEAJQgFAIgIAGQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgJAAgNQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_104.setTransform(54.825,29.4);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_105.setTransform(48.725,27.725);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#2C3E50").s().p("AgQA0QgIgDgFgHIAIgIQAIALANAAQAJAAAGgGQAFgFAAgKIAAgHQgJAJgNAAQgNAAgJgLQgJgLABgTQgBgSAJgLQAIgLAPAAQAOAAAIAKIAAgIIAMAAIAABMQABAPgJAJQgKAJgPAAQgHAAgJgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgJAAgFAHg");
	this.shape_106.setTransform(42.55,30.875);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#2C3E50").s().p("AgZAeQgKgMAAgSIAAAAQAAgLAFgKQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAAMgEAJQgFAIgIAGQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgJAAgNQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_107.setTransform(34.225,29.4);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_108.setTransform(23.375,29.325);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#2C3E50").s().p("AgWAfQgKgLAAgSIAAgCQgBgLAFgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAHAIQAGAHAKAAQAGAAAFgDQAFgDAEgFIAIAHQgKAPgTAAQgQAAgJgKgAgMgXQgGAGgBAKIAnAAIAAgBQgBgKgFgGQgEgFgJAAQgHAAgGAGg");
	this.shape_109.setTransform(12.95,29.4);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#2C3E50").s().p("AASA4IAAg0QAAgIgFgEQgDgEgJAAQgFAAgFAEQgFADgCAFIAAA4IgOAAIAAhvIAOAAIAAArQAJgLAMAAQAaAAAAAbIAAA0g");
	this.shape_110.setTransform(4.8,27.725);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#2C3E50").s().p("AgQA0QgIgDgFgHIAHgIQAKALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgIAJgOAAQgOAAgIgLQgIgLAAgTQAAgSAIgLQAJgLAOAAQANAAAJAKIAAgIIAMAAIAABMQAAAPgJAJQgJAJgPAAQgIAAgIgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgIAAgHAHg");
	this.shape_111.setTransform(258.85,8.875);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#2C3E50").s().p("AARAoIAAgzQAAgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_112.setTransform(250.65,7.325);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_113.setTransform(242.375,7.475);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#2C3E50").s().p("AgYAtQgJgKAAgTIAAgBQAAgRAJgLQAJgLAOAAQANAAAIAJIAAgpIAOAAIAABvIgNAAIgBgIQgIAKgNAAQgOAAgJgMgAgOgFQgFAGAAAQQAAANAFAIQAGAHAJAAQANAAAGgLIAAgjQgHgMgMAAQgJAAgGAIg");
	this.shape_114.setTransform(233.85,5.8);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#2C3E50").s().p("AASAoIAAgzQAAgJgFgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_115.setTransform(225.65,7.325);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#2C3E50").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAAMIAAAkQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAPQAAAHAEAEQAEADAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_116.setTransform(217.425,7.4);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#2C3E50").s().p("AgQA0QgIgDgFgHIAHgIQAKALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgJAJgNAAQgOAAgIgLQgIgLgBgTQABgSAIgLQAJgLAOAAQANAAAJAKIAAgIIAMAAIAABMQAAAPgJAJQgJAJgPAAQgHAAgJgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgIAAgHAHg");
	this.shape_117.setTransform(209,8.875);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#2C3E50").s().p("AASAoIAAgzQgBgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_118.setTransform(200.8,7.325);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#2C3E50").s().p("AgXAeQgKgKAAgSIAAgCQABgLAEgKQAEgIAJgGQAHgFAJAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAAMAGAGQAIAIAIAAQAIAAAEgDQAGgDADgFIAIAHQgJAPgUAAQgPAAgLgLgAgMgXQgGAGAAALIAmAAIAAgBQAAgLgGgGQgEgFgJAAQgHAAgGAGg");
	this.shape_119.setTransform(192.8,7.4);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_120.setTransform(182.175,7.325);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#2C3E50").s().p("AARA4IAAg0QAAgIgDgEQgEgEgJAAQgFAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLANAAQAZAAAAAbIAAA0g");
	this.shape_121.setTransform(166.75,5.725);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#2C3E50").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAAMIAAAkQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAPQAAAHAEAEQAEADAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_122.setTransform(158.525,7.4);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_123.setTransform(152.3,7.325);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#2C3E50").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAAMIAAAkQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAPQAAAHAEAEQAEADAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_124.setTransform(145.275,7.4);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#2C3E50").s().p("AgYAtQgIgKAAgTIAAgBQAAgRAIgLQAJgLANAAQAOAAAIAJIAAgpIANAAIAABvIgMAAIgBgIQgIAKgOAAQgNAAgJgMgAgNgFQgGAGAAAQQAAANAGAIQAFAHAJAAQANAAAGgLIAAgjQgGgMgNAAQgJAAgFAIg");
	this.shape_125.setTransform(136.8,5.8);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#2C3E50").s().p("AARA4IAAg0QAAgIgDgEQgEgEgJAAQgFAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLANAAQAZAAAAAbIAAA0g");
	this.shape_126.setTransform(123.9,5.725);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_127.setTransform(115.625,7.475);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_128.setTransform(109.675,5.725);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_129.setTransform(103.725,7.475);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#2C3E50").s().p("AgUAuIgBAJIgLAAIAAhvIANAAIAAAqQAIgKANAAQAPAAAIAKQAJALgBATIAAABQABASgJALQgJALgOAAQgNAAgJgLgAgTAAIAAAhQAGAMANAAQAJAAAFgHQAGgIAAgPQAAgOgGgGQgFgIgJAAQgOAAgFANg");
	this.shape_130.setTransform(95.6,5.8);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_131.setTransform(84.625,7.325);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#2C3E50").s().p("AgXAeQgJgKgBgSIAAgCQABgLAEgKQAFgIAHgGQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAAMAGAGQAIAIAIAAQAHAAAGgDQAFgDADgFIAJAHQgKAPgVAAQgOAAgLgLgAgMgXQgFAGgBALIAmAAIAAgBQAAgLgFgGQgGgFgIAAQgHAAgGAGg");
	this.shape_132.setTransform(74.2,7.4);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#2C3E50").s().p("AggA3IAAhsIAMAAIABAJQAIgKAOAAQAOAAAIAKQAIALAAATIAAABQAAASgIALQgIAKgOABQgOgBgIgIIAAAlgAgTghIAAAlQAGAMANAAQAIgBAGgHQAGgIAAgPQAAgNgGgHQgGgIgIAAQgNAAgGAKg");
	this.shape_133.setTransform(66.125,8.85);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#2C3E50").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgEQAAgCACgDQACgCADAAQAEAAACACQACADAAACQAAAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_134.setTransform(55.2,5.95);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#2C3E50").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_135.setTransform(50.075,5.725);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#2C3E50").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgEQAAgCACgDQACgCADAAQAEAAACACQACADAAACQAAAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_136.setTransform(43.95,5.95);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_137.setTransform(40.275,5.725);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgCACgDQACgCADAAQAEAAACACQACADAAACQAAAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_138.setTransform(36.65,5.95);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_139.setTransform(28.225,7.325);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#2C3E50").s().p("AgWAeQgKgKAAgSIAAgCQgBgLAFgKQAFgIAHgGQAIgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAAMAHAGQAGAIAKAAQAHAAAFgDQAEgDAEgFIAJAHQgLAPgTAAQgQAAgJgLgAgMgXQgFAGgCALIAnAAIAAgBQgBgLgEgGQgFgFgJAAQgHAAgGAGg");
	this.shape_140.setTransform(17.8,7.4);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#2C3E50").s().p("AAnA1IAAgpIACgsIgkBVIgJAAIgkhVIACAsIAAApIgOAAIAAhpIASAAIAiBWIAjhWIASAAIAABpg");
	this.shape_141.setTransform(7.2,6.025);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,2.178,-161.2,-94.7)).s().p("A5LOzIAA9lMAyXAAAIAAdlg");
	this.shape_142.setTransform(135.5,56.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25.7,-37.9,322.5,189.4);


(lib.drop3G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgTAvQgJgEgGgHQgFgIAAgJIARAAQABAJAGAFQAHAFAJAAQAKAAAGgEQAGgEAAgHQAAgGgGgFQgFgEgMgCQgNgDgHgDQgIgEgEgFQgEgGAAgHQAAgMALgJQAKgIAQAAQARAAAKAIQALAKAAANIgRAAQAAgHgGgFQgGgFgJAAQgJAAgFAEQgFAEAAAGQAAAHAFADQAEADAMADQANADAIAEQAIADAEAGQAEAFAAAIQAAAOgLAIQgLAIgRAAQgLAAgJgFg");
	this.shape.setTransform(65.175,31.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgeAqQgIgKAAgSIAAhAIARAAIAABAQAAAXATAAQASAAAHgPIAAhIIARAAIAABjIgQAAIgBgKQgKAMgTAAQgPAAgJgJg");
	this.shape_1.setTransform(55.05,31.875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AAWAzIAAhCQAAgKgEgGQgGgEgKAAQgHgBgHAFQgGAEgEAHIAABHIgRAAIAAhkIAQAAIABANQAMgOARAAQAgAAAAAjIAABCg");
	this.shape_2.setTransform(44.65,31.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgfAsQgJgJAAgNQgBgPAMgIQANgJAUAAIARAAIAAgHQAAgKgGgFQgFgGgKABQgIgBgHAFQgGAFAAAGIgSAAQABgHAFgHQAGgHAIgEQAKgEAKAAQARAAAKAIQAJAJABAQIAAAtQAAAOADAHIAAACIgSAAQgBgDgBgIQgMANgPAAQgPAAgKgIgAgXAUQAAAIAFAEQAFAFAJAAQAHAAAIgFQAGgEAEgGIAAgUIgOAAQgegBAAATg");
	this.shape_3.setTransform(34.2,31.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgVAHIAAgNIAsAAIAAANg");
	this.shape_4.setTransform(26.45,31.05);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgTAvQgJgEgGgHQgFgIAAgJIARAAQABAJAGAFQAHAFAJAAQAKAAAGgEQAGgEAAgHQAAgGgGgFQgFgEgMgCQgNgDgHgDQgIgEgEgFQgEgGAAgHQAAgMALgJQAKgIAQAAQARAAAKAIQALAKAAANIgRAAQAAgHgGgFQgGgFgJAAQgJAAgFAEQgFAEAAAGQAAAHAFADQAEADAMADQANADAIAEQAIADAEAGQAEAFAAAIQAAAOgLAIQgLAIgRAAQgLAAgJgFg");
	this.shape_5.setTransform(18.975,31.8);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgeAqQgJgKAAgSIAAhAIASAAIAABAQAAAXASAAQATAAAGgPIAAhIIARAAIAABjIgQAAIAAgKQgKAMgTAAQgPAAgJgJg");
	this.shape_6.setTransform(8.85,31.875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgTAvQgJgEgGgHQgFgIAAgJIARAAQABAJAGAFQAHAFAJAAQAKAAAGgEQAGgEAAgHQAAgGgGgFQgFgEgMgCQgNgDgHgDQgIgEgEgFQgEgGAAgHQAAgMALgJQAKgIAQAAQARAAAKAIQALAKAAANIgRAAQAAgHgGgFQgGgFgJAAQgJAAgFAEQgFAEAAAGQAAAHAFADQAEADAMADQANADAIAEQAIADAEAGQAEAFAAAIQAAAOgLAIQgLAIgRAAQgLAAgJgFg");
	this.shape_7.setTransform(-1.225,31.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgeAqQgIgKgBgSIAAhAIASAAIAABAQAAAXASAAQATAAAHgPIAAhIIARAAIAABjIgRAAIAAgKQgKAMgSAAQgRAAgIgJg");
	this.shape_8.setTransform(-11.35,31.875);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgWAHIAAgNIAsAAIAAANg");
	this.shape_9.setTransform(-19.15,31.05);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgTAvQgJgEgGgHQgFgIAAgJIARAAQABAJAGAFQAHAFAJAAQAKAAAGgEQAGgEAAgHQAAgGgGgFQgFgEgMgCQgNgDgHgDQgIgEgEgFQgEgGAAgHQAAgMALgJQAKgIAQAAQARAAAKAIQALAKAAANIgRAAQAAgHgGgFQgGgFgJAAQgJAAgFAEQgFAEAAAGQAAAHAFADQAEADAMADQANADAIAEQAIADAEAGQAEAFAAAIQAAAOgLAIQgLAIgRAAQgLAAgJgFg");
	this.shape_10.setTransform(-26.625,31.8);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgeAqQgIgKAAgSIAAhAIARAAIAABAQAAAXATAAQASAAAHgPIAAhIIARAAIAABjIgQAAIgBgKQgKAMgTAAQgPAAgJgJg");
	this.shape_11.setTransform(-36.75,31.875);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgUBCQgLgFgFgIIAJgKQALAOAQAAQALAAAHgHQAHgHAAgNIAAgJQgKAMgRAAQgSAAgKgOQgLgOAAgYQAAgXALgOQAKgOASAAQASAAAKANIABgLIAPAAIAABhQAAATgLAMQgMALgTAAQgKAAgKgFgAgRguQgHAKAAATQAAARAHAJQAHAKALAAQARAAAHgPIAAgtQgIgOgPAAQgMAAgHAJg");
	this.shape_12.setTransform(-47.475,33.675);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgfAsQgJgJAAgNQAAgPALgIQANgJAUAAIARAAIAAgHQAAgKgGgFQgFgGgKABQgIgBgHAFQgGAFAAAGIgRAAQAAgHAFgHQAFgHAJgEQAKgEAJAAQASAAAJAIQALAJAAAQIAAAtQAAAOAEAHIAAACIgSAAQgCgDgBgIQgMANgQAAQgPAAgJgIgAgXAUQAAAIAFAEQAGAFAIAAQAHAAAHgFQAIgEADgGIAAgUIgOAAQgegBAAATg");
	this.shape_13.setTransform(-57.8,31.8);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgNBIIAAhWIgQAAIAAgNIAQAAIAAgKQAAgRAIgIQAIgJAQAAQAGAAAFABIAAAOIgKgBQgIAAgFAFQgEAFAAAJIAAALIAVAAIAAANIgVAAIAABWg");
	this.shape_14.setTransform(-65.975,29.575);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AggAlQgNgNAAgYIAAAAQAAgPAGgLQAGgMAKgHQAKgGANAAQAUAAANAOQANAOAAAXIAAABQAAAPgGAMQgGALgKAHQgLAGgNAAQgTAAgNgPgAgUgbQgIAKAAASQAAARAIAKQAIAKAMAAQANAAAIgKQAHgKAAgSQAAgQgHgLQgIgKgNAAQgMAAgIAKg");
	this.shape_15.setTransform(-74.925,31.8);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgTAvQgJgEgGgHQgFgIAAgJIARAAQABAJAGAFQAHAFAJAAQAKAAAGgEQAGgEAAgHQAAgGgGgFQgFgEgMgCQgNgDgHgDQgIgEgEgFQgEgGAAgHQAAgMALgJQAKgIAQAAQARAAAKAIQALAKAAANIgRAAQAAgHgGgFQgGgFgJAAQgJAAgFAEQgFAEAAAGQAAAHAFADQAEADAMADQANADAIAEQAIADAEAGQAEAFAAAIQAAAOgLAIQgLAIgRAAQgLAAgJgFg");
	this.shape_16.setTransform(-85.225,31.8);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgdAmQgNgNAAgXIAAgCQAAgOAGgMQAGgMAKgGQAKgHALAAQAUAAALAMQALANAAAZIAAAFIhDAAQAAAPAIAKQAJAJALAAQAJAAAHgEQAGgDAFgGIAKAHQgMAUgaAAQgTAAgNgOgAgPgeQgHAIgCAOIAxAAIAAgBQAAgOgHgHQgGgHgLAAQgJAAgHAHg");
	this.shape_17.setTransform(-95.025,31.8);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgWAHIAAgNIAsAAIAAANg");
	this.shape_18.setTransform(140.95,4.25);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgUBCQgLgFgFgIIAJgKQALAOAQAAQALAAAHgHQAHgHAAgNIAAgJQgKAMgRAAQgSAAgKgOQgLgOAAgYQAAgXALgOQAKgOASAAQASAAAKANIABgLIAPAAIAABhQAAATgLAMQgMALgTAAQgKAAgKgFgAgRguQgHAKAAATQAAARAHAJQAHAKALAAQARAAAHgPIAAgtQgIgOgPAAQgMAAgHAJg");
	this.shape_19.setTransform(132.825,6.875);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AAWAzIAAhCQAAgLgEgFQgGgEgKAAQgHAAgHAEQgGAEgEAIIAABGIgRAAIAAhkIARAAIAAANQAMgOARAAQAgAAAAAjIAABCg");
	this.shape_20.setTransform(122.5,4.9);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgIBEIAAhjIAQAAIAABjgAgHgyQgCgDAAgFQAAgEACgDQADgCAEAAQAFAAADACQACADAAAEQAAAFgCADQgDACgFAAQgEAAgDgCg");
	this.shape_21.setTransform(114.975,3.15);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgXAzIAAhkIAQAAIABAMQAHgNAQAAIAHABIAAAQIgIgBQgQAAgGAPIAABGg");
	this.shape_22.setTransform(109.925,4.9);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgfAsQgKgJAAgNQABgPALgIQAMgJAVAAIARAAIAAgIQAAgJgGgFQgFgGgKABQgIgBgHAFQgGAFAAAHIgSAAQAAgIAGgHQAGgHAJgEQAIgEALAAQARAAAKAIQAKAJAAAQIAAAtQAAAOADAHIAAACIgSAAQgBgDgBgIQgMANgPAAQgQAAgJgIgAgXAUQAAAIAFAFQAGAEAIAAQAHAAAIgEQAGgFAEgGIAAgVIgNAAQgfAAAAATg");
	this.shape_23.setTransform(101,5);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgNBIIAAhWIgQAAIAAgNIAQAAIAAgKQAAgRAIgIQAIgJAQAAQAGAAAFABIAAAOIgKgBQgIAAgFAFQgEAFAAAJIAAALIAVAAIAAANIgVAAIAABWg");
	this.shape_24.setTransform(92.825,2.775);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgVAHIAAgNIAsAAIAAANg");
	this.shape_25.setTransform(86.65,4.25);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgCA4QgGgHAAgNIAAg9IgSAAIAAgNIASAAIAAgYIAQAAIAAAYIATAAIAAANIgTAAIAAA9QAAAHADACQACAEAGAAIAIgCIAAAOQgHACgGAAQgLAAgFgHg");
	this.shape_26.setTransform(80.675,3.875);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgeAqQgIgKAAgSIAAhAIARAAIAABAQAAAXATAAQASAAAHgPIAAhIIARAAIAABjIgQAAIgBgKQgKAMgTAAQgPAAgJgJg");
	this.shape_27.setTransform(72.6,5.075);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgHBHIAAiNIAQAAIAACNg");
	this.shape_28.setTransform(65.1,2.875);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgeAqQgJgKABgSIAAhAIARAAIAABAQAAAXATAAQASAAAGgPIAAhIIARAAIAABjIgPAAIgBgKQgKAMgTAAQgPAAgJgJg");
	this.shape_29.setTransform(57.55,5.075);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AA1AzIAAhBQAAgLgFgGQgFgEgLAAQgKAAgGAFQgGAFgBAKIAABCIgRAAIAAhBQAAgWgVABQgRgBgGAOIAABJIgRAAIAAhkIAQAAIAAAMQALgNATAAQAVAAAHAQQAFgHAIgFQAIgEALAAQAhAAAAAiIAABDg");
	this.shape_30.setTransform(44.025,4.9);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgIBEIAAhjIAQAAIAABjgAgHgyQgCgDAAgFQAAgEACgDQADgCAEAAQAFAAADACQACADAAAEQAAAFgCADQgDACgFAAQgEAAgDgCg");
	this.shape_31.setTransform(27.125,3.15);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgeAqQgJgKAAgSIAAhAIASAAIAABAQAAAXASAAQATAAAGgPIAAhIIARAAIAABjIgQAAIAAgKQgKAMgTAAQgQAAgIgJg");
	this.shape_32.setTransform(19.55,5.075);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgIBHIAAiNIAQAAIAACNg");
	this.shape_33.setTransform(12.05,2.875);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgfAsQgKgJAAgNQAAgPANgIQALgJAVAAIARAAIAAgIQAAgJgFgFQgGgGgKABQgJgBgGAFQgGAFAAAHIgRAAQgBgIAGgHQAFgHAKgEQAJgEAJAAQASAAAJAIQALAJAAAQIAAAtQAAAOAEAHIAAACIgSAAQgCgDgBgIQgMANgQAAQgOAAgKgIgAgXAUQAAAIAFAFQAFAEAJAAQAHAAAHgEQAIgFADgGIAAgVIgNAAQgfAAAAATg");
	this.shape_34.setTransform(4.55,5);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgIBHIAAiNIAQAAIAACNg");
	this.shape_35.setTransform(-2.9,2.875);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgdAmQgNgNAAgXIAAgCQAAgPAGgLQAGgMAKgHQAKgGALAAQAUAAALANQALANAAAYIAAAGIhDAAQAAAPAIAJQAJAJALAAQAJAAAHgEQAGgEAFgFIAKAIQgMATgaAAQgTAAgNgOgAgPgdQgHAHgCANIAxAAIAAAAQAAgOgHgHQgGgHgLAAQgJAAgHAIg");
	this.shape_36.setTransform(-10.125,5);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AA1AzIAAhBQAAgLgFgGQgFgEgLAAQgKAAgGAFQgGAFgBAKIAABCIgRAAIAAhBQAAgWgVABQgRgBgGAOIAABJIgRAAIAAhkIAQAAIAAAMQALgNATAAQAVAAAHAQQAFgHAIgFQAIgEALAAQAhAAAAAiIAABDg");
	this.shape_37.setTransform(-23.575,4.9);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgIBEIAAhjIAQAAIAABjgAgHgyQgCgDAAgFQAAgEACgDQADgCAEAAQAFAAADACQACADAAAEQAAAFgCADQgDACgFAAQgEAAgDgCg");
	this.shape_38.setTransform(-40.475,3.15);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgfAsQgKgJABgNQAAgPAMgIQAMgJAUAAIARAAIAAgIQAAgJgFgFQgGgGgKABQgJgBgGAFQgGAFAAAHIgRAAQgBgIAGgHQAFgHAJgEQAJgEAKAAQASAAAJAIQALAJAAAQIAAAtQAAAOAEAHIAAACIgSAAQgCgDgBgIQgMANgQAAQgOAAgKgIgAgXAUQAAAIAFAFQAFAEAJAAQAHAAAHgEQAIgFADgGIAAgVIgOAAQgeAAAAATg");
	this.shape_39.setTransform(-48,5);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgIBHIAAiNIAQAAIAACNg");
	this.shape_40.setTransform(-55.45,2.875);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgeAqQgJgKAAgSIAAhAIASAAIAABAQAAAXASAAQATAAAGgPIAAhIIASAAIAABjIgRAAIAAgKQgKAMgSAAQgRAAgIgJg");
	this.shape_41.setTransform(-63,5.075);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AA1AzIAAhBQAAgLgFgGQgFgEgLAAQgKAAgGAFQgGAFgBAKIAABCIgRAAIAAhBQAAgWgVABQgRgBgGAOIAABJIgRAAIAAhkIAQAAIAAAMQALgNATAAQAVAAAHAQQAFgHAIgFQAIgEALAAQAhAAAAAiIAABDg");
	this.shape_42.setTransform(-76.525,4.9);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgIBEIAAhjIAQAAIAABjgAgHgyQgCgDAAgFQAAgEACgDQADgCAEAAQAFAAADACQACADAAAEQAAAFgCADQgDACgFAAQgEAAgDgCg");
	this.shape_43.setTransform(-87.125,3.15);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgeA6QgLgOAAgXIAAgCQAAgWALgOQAKgOASAAQARAAAKAMIAAg0IARAAIAACNIgQAAIAAgLQgLANgRAAQgRAAgLgOgAgRgHQgHAJAAATQAAARAHAKQAHAKALAAQARAAAHgPIAAgtQgIgOgQAAQgLAAgHAJg");
	this.shape_44.setTransform(-95.025,2.975);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgpBGIAAiKIAPAAIABAMQALgNARAAQASAAALANQAKAOAAAYIAAACQAAAWgKAOQgKAOgSAAQgSAAgKgMIAAAwgAgYgpIAAAvQAIAOAPAAQALAAAIgKQAHgKAAgSQAAgRgHgKQgIgKgLAAQgPAAgIAOg");
	this.shape_45.setTransform(138.5,-19.975);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgfArQgKgIAAgNQAAgQANgHQAMgJAUAAIARAAIAAgIQAAgIgFgGQgGgFgKgBQgJABgGAEQgGAFAAAHIgRAAQgBgIAGgHQAFgHAKgEQAIgEALAAQARAAAKAIQAKAJAAAPIAAAtQAAAOAEAJIAAABIgSAAQgCgDgBgHQgMAMgQAAQgOAAgKgJgAgXAUQAAAIAFAFQAGAEAIAAQAHAAAHgEQAIgEADgHIAAgVIgNAAQgfABAAASg");
	this.shape_46.setTransform(127.75,-21.8);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AAVBHIghguIgMALIAAAjIgRAAIAAiNIARAAIAABVIAKgLIAeggIAVAAIgmApIArA6g");
	this.shape_47.setTransform(118.4,-23.925);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgUBCQgLgFgFgIIAJgKQALAOAQAAQALAAAHgHQAHgHAAgNIAAgJQgKAMgRAAQgSAAgKgOQgLgOAAgYQAAgXALgOQAKgOASAAQASAAAKANIABgLIAPAAIAABhQAAATgLAMQgMALgTAAQgKAAgKgFgAgRguQgHAKAAATQAAARAHAJQAHAKALAAQARAAAHgPIAAgtQgIgOgPAAQgMAAgHAJg");
	this.shape_48.setTransform(107.425,-19.925);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AAXAzIAAhCQgBgKgFgFQgEgGgLAAQgHABgHAEQgGAEgDAIIAABGIgRAAIAAhjIAQAAIABAMQALgOARAAQAgAAABAjIAABCg");
	this.shape_49.setTransform(97.1,-21.9);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgdAnQgNgOAAgWIAAgDQAAgOAGgMQAGgMAKgHQAKgGALAAQAUAAALANQALAMAAAYIAAAHIhDAAQAAAOAIAKQAJAJALAAQAJAAAHgEQAGgEAFgGIAKAJQgMATgaAAQgTAAgNgNgAgPgdQgHAHgCANIAxAAIAAgBQAAgNgHgHQgGgHgLAAQgJAAgHAIg");
	this.shape_50.setTransform(86.925,-21.8);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AgHBHIAAiNIAQAAIAACNg");
	this.shape_51.setTransform(79.5,-23.925);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AAXAzIAAhCQgBgKgFgFQgEgGgLAAQgHABgGAEQgHAEgDAIIAABGIgRAAIAAhjIAQAAIABAMQALgOARAAQAgAAABAjIAABCg");
	this.shape_52.setTransform(43.35,-21.9);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AgfArQgKgIAAgNQAAgQANgHQALgJAVAAIARAAIAAgIQAAgIgFgGQgGgFgKgBQgJABgGAEQgGAFAAAHIgRAAQgBgIAGgHQAFgHAKgEQAJgEAJAAQASAAAJAIQALAJAAAPIAAAtQAAAOAEAJIAAABIgSAAQgCgDgBgHQgMAMgQAAQgOAAgKgJgAgXAUQAAAIAFAFQAFAEAJAAQAHAAAHgEQAIgEADgHIAAgVIgNAAQgfABAAASg");
	this.shape_53.setTransform(32.9,-21.8);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgUBCQgLgFgFgIIAJgKQALAOAQAAQALAAAHgHQAHgHAAgNIAAgJQgKAMgRAAQgSAAgKgOQgLgOAAgYQAAgXALgOQAKgOASAAQASAAAKANIABgLIAPAAIAABhQAAATgLAMQgMALgTAAQgKAAgKgFgAgRguQgHAKAAATQAAARAHAJQAHAKALAAQARAAAHgPIAAgtQgIgOgPAAQgMAAgHAJg");
	this.shape_54.setTransform(22.225,-19.925);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgXAzIAAhjIAQAAIABALQAHgNAQAAIAHABIAAAQIgIgBQgQAAgGAPIAABGg");
	this.shape_55.setTransform(14.375,-21.9);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AggAlQgNgNAAgYIAAAAQAAgPAGgMQAGgMAKgGQAKgGANAAQAUAAANAOQANAOAAAXIAAABQAAAOgGAMQgGAMgKAGQgLAHgNAAQgTAAgNgPgAgUgbQgIAKAAASQAAARAIAJQAIALAMAAQANAAAIgLQAHgJAAgSQAAgRgHgKQgIgKgNAAQgMAAgIAKg");
	this.shape_56.setTransform(5.275,-21.8);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AgIBEIAAhjIAQAAIAABjgAgHgzQgCgCAAgFQAAgDACgEQADgDAEAAQAFAAADADQACAEAAADQAAAFgCACQgDADgFAAQgEAAgDgDg");
	this.shape_57.setTransform(-31.075,-23.65);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AAVBHIgiguIgLALIAAAjIgRAAIAAiNIARAAIAABVIAKgLIAeggIAVAAIgmApIAqA6g");
	this.shape_58.setTransform(-37.6,-23.925);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgIBEIAAhjIAQAAIAABjgAgHgzQgCgCAAgFQAAgDACgEQADgDAEAAQAFAAADADQACAEAAADQAAAFgCACQgDADgFAAQgEAAgDgDg");
	this.shape_59.setTransform(-45.325,-23.65);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgHBHIAAiNIAPAAIAACNg");
	this.shape_60.setTransform(-49.95,-23.925);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgIBEIAAhjIAQAAIAABjgAgHgzQgCgCAAgFQAAgDACgEQADgDAEAAQAFAAADADQACAEAAADQAAAFgCACQgDADgFAAQgEAAgDgDg");
	this.shape_61.setTransform(-54.525,-23.65);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AA1AzIAAhBQAAgLgFgFQgFgGgLAAQgKABgGAFQgGAGgBAJIAABCIgRAAIAAhBQAAgWgVAAQgRABgGAOIAABIIgRAAIAAhjIAQAAIAAALQALgNATAAQAVAAAHAQQAFgHAIgFQAIgEALAAQAhAAAAAiIAABDg");
	this.shape_62.setTransform(-65.175,-21.9);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AgdAnQgNgOAAgWIAAgDQAAgOAGgMQAGgMAKgHQAKgGALAAQAUAAALANQALAMAAAYIAAAHIhDAAQAAAOAIAKQAJAJALAAQAJAAAHgEQAGgEAFgGIAKAJQgMATgaAAQgTAAgNgNgAgPgdQgHAHgCANIAxAAIAAgBQAAgNgHgHQgGgHgLAAQgJAAgHAIg");
	this.shape_63.setTransform(-78.425,-21.8);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AAyBDIAAg0IABg4IgsBsIgNAAIgshsIACA4IAAA0IgSAAIAAiGIAXAAIArBuIAshuIAXAAIAACGg");
	this.shape_64.setTransform(-91.875,-23.55);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,2.178,-161.1,-94.7)).s().p("A5MOzIAA9lMAyYAAAIAAdlg");
	this.shape_65.setTransform(22.75,9.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-138.5,-85.6,322.5,189.5);


(lib.drag3G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("ArojqIXRAAIAAHVI3RAAg");
	this.shape.setTransform(86.45,-18.175);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgbA3QgLgJgBgRIAPAAQACALAGAGQAGAGAKAAQALAAAHgIQAGgIAAgOQAAgNgHgHQgHgHgLAAQgKAAgGAFIgFACIgNgCIAHhAIBAAAIAAAPIgyAAIgEAjQAJgGALABQASAAAKALQAKAKAAAUQAAAUgKAMQgLALgTAAQgQAAgLgKg");
	this.shape_1.setTransform(153.025,-5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgIAtIAAg1IgKAAIAAgJIAKAAIAAgHQAAgKAFgFQAFgFAKAAIAHAAIAAAJIgGAAQgGAAgDACQgCADAAAGIAAAHIANAAIAAAJIgNAAIAAA1g");
	this.shape_2.setTransform(119.675,-18.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAFgDAGAAQAMAAAFAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgOANQAAAFADADQAEACAFAAQAEAAAFgCQAEgDACgEIAAgNIgIAAQgUAAABAMg");
	this.shape_3.setTransform(114.1,-17.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgOAgIAAg+IALAAIAAAHQAEgIAJAAIAFABIAAAKIgFgBQgKAAgDAJIAAAsg");
	this.shape_4.setTransform(109.15,-17.175);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAHgDAGAAQAKAAAGAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgOANQgBAFAEADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgJAAQgSAAAAAMg");
	this.shape_5.setTransform(103.5,-17.125);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_6.setTransform(97.125,-17.125);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAhAgIAAgpQAAgGgCgEQgDgDgIAAQgGAAgEAEQgEADAAAGIAAApIgKAAIAAgoQAAgOgOAAQgLAAgDAJIAAAtIgMAAIAAg+IALAAIAAAHQAHgIAMAAQAOAAADAKQADgFAGgDQAEgCAHAAQAVAAAAAWIAAApg");
	this.shape_7.setTransform(85.85,-17.175);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_8.setTransform(77.525,-17.125);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_9.setTransform(72.175,-17.825);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_10.setTransform(67.275,-17.125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgTAsIgDgBIAAgIIADAAQAFAAADgCQADgDACgGIADgGIgXg+IALAAIAPAvIAPgvIAMAAIgaBJQgEAPgOAAg");
	this.shape_11.setTransform(61.35,-15.85);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgOApQgIgEgEgGQgEgGAAgHIAMAAQAAAIAFAEQAGAFAIAAQAKAAAEgEQAFgEAAgGQAAgGgEgDQgFgEgLgDQgOgEgGgFQgHgHAAgIQAAgLAIgGQAIgHAMAAQAIAAAIAEQAGADAEAGQAEAGAAAHIgMAAQABgIgFgEQgFgFgJAAQgHAAgFAEQgEAEgBAGQAAAGAFADQAEAEAKADQALADAFACQAHAEACAFQADAFAAAGQAAAKgIAHQgIAGgOAAQgHAAgIgDg");
	this.shape_12.setTransform(54.95,-18.225);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FF8C2D").s().p("ArpjsIXTgNIAAHmI3TANg");
	this.shape_13.setTransform(86.475,-18.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_3
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("rgba(0,0,0,0.227)").s().p("ArpD6IAAnzIXTAAIAAHzg");
	this.shape_14.setTransform(81.575,-14.7);
	this.shape_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(7,-43.1,155,53.400000000000006);


(lib.drag3G4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("ArojqIXRAAIAAHVI3RAAg");
	this.shape.setTransform(86.45,-18.175);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgoBBIAAgMIAsgxQAKgKADgHQAEgHAAgIQAAgKgGgGQgGgHgJAAQgMAAgHAHQgHAHAAAMIgQAAQAAgRALgLQAMgLATAAQARAAAKAJQAKAKAAAPQAAATgYAZIghAlIA/AAIAAAOg");
	this.shape_1.setTransform(152.775,-5.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABAAAAgBQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAgBgBg");
	this.shape_2.setTransform(128.425,-18.275);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_3.setTransform(123.825,-17.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_4.setTransform(117.675,-17.125);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgOAgIAAg+IALAAIAAAHQAEgIAJAAIAFABIAAAKIgFgBQgKAAgDAJIAAAsg");
	this.shape_5.setTransform(112.75,-17.175);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AANAtIgUgeIgIAHIAAAXIgKAAIAAhZIAKAAIAAA2IAHgHIASgVIANAAIgXAaIAaAlg");
	this.shape_6.setTransform(107.75,-18.45);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_7.setTransform(101.175,-17.125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAOAtIgWgeIgHAHIAAAXIgKAAIAAhZIAKAAIAAA2IAHgHIASgVIAOAAIgYAaIAaAlg");
	this.shape_8.setTransform(95.45,-18.45);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_9.setTransform(88.925,-17.125);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAhAgIAAgpQAAgGgDgEQgCgDgIAAQgGAAgEAEQgEADgBAGIAAApIgKAAIAAgoQAAgOgNAAQgLAAgDAJIAAAtIgLAAIAAg+IAKAAIAAAHQAHgIAMAAQANAAAEAKQAEgFAFgDQAFgCAGAAQAVAAABAWIAAApg");
	this.shape_10.setTransform(77.5,-17.175);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_11.setTransform(69.175,-17.125);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_12.setTransform(63.825,-17.825);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_13.setTransform(58.925,-17.125);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgTAsIgDgBIAAgIIACAAQAGAAADgCQADgDACgGIADgGIgXg+IAMAAIAOAvIAPgvIAMAAIgZBJQgGAPgNAAg");
	this.shape_14.setTransform(53,-15.85);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgOApQgHgEgFgGQgEgGAAgHIALAAQABAIAFAEQAGAFAIAAQAKAAAEgEQAFgEAAgGQAAgGgFgDQgEgEgLgDQgOgEgGgFQgHgHAAgIQAAgLAIgGQAIgHAMAAQAJAAAGAEQAIADADAGQAEAGAAAHIgMAAQABgIgFgEQgFgFgJAAQgHAAgFAEQgFAEAAAGQABAGAEADQAEAEAKADQALADAFACQAHAEACAFQADAFAAAGQAAAKgIAHQgIAGgOAAQgHAAgIgDg");
	this.shape_15.setTransform(46.6,-18.225);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FF8C2D").s().p("ArpjsIXTgNIAAHmI3TANg");
	this.shape_16.setTransform(86.475,-18.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_3
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(0,0,0,0.227)").s().p("ArpD6IAAnzIXTAAIAAHzg");
	this.shape_17.setTransform(81.575,-14.7);
	this.shape_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(7,-43.1,155,53.400000000000006);


(lib.drag3G3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("ArnjqIXPAAIAAHVI3PAAg");
	this.shape.setTransform(82.175,-18.275);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAMBAIAAgdIg5AAIAAgKIA4hYIASAAIAABUIARAAIAAAOIgRAAIAAAdgAAKglIglA6IAnAAIAAg+g");
	this.shape_1.setTransform(149.525,-5.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAOAgIAAgpQAAgHgDgDQgDgDgGAAQgFAAgDADQgEADgDAEIAAAsIgLAAIAAg+IALAAIAAAIQAHgJALAAQAUAAAAAWIAAApg");
	this.shape_2.setTransform(130.5,-17.175);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGAMAAIALAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAGgDAFAAQAMAAAFAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgPANQAAAFAEADQAEACAFAAQAEAAAFgCQAEgDACgEIAAgNIgIAAQgUAAAAAMg");
	this.shape_3.setTransform(123.9,-17.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_4.setTransform(117.525,-17.125);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAHgDAGAAQAKAAAGAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgOANQgBAFAEADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgJAAQgSAAAAAMg");
	this.shape_5.setTransform(111.15,-17.125);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgIAtIAAg1IgKAAIAAgJIAKAAIAAgHQAAgKAFgFQAFgFAKAAIAHAAIAAAJIgGAAQgGAAgDACQgCADAAAGIAAAHIANAAIAAAJIgNAAIAAA1g");
	this.shape_6.setTransform(106.025,-18.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGANAAIAKAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAHgDAGAAQAKAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgOANQAAAFADADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgJAAQgSAAAAAMg");
	this.shape_7.setTransform(100.45,-17.125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAOAgIAAgpQAAgHgDgDQgDgDgHAAQgEAAgDADQgEADgDAEIAAAsIgLAAIAAg+IAKAAIABAIQAHgJALAAQAUAAAAAWIAAApg");
	this.shape_8.setTransform(93.9,-17.175);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgOAgIAAg+IALAAIAAAHQAEgIAJAAIAFABIAAAKIgFgBQgKAAgDAJIAAAsg");
	this.shape_9.setTransform(88.9,-17.175);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_10.setTransform(83.475,-17.125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgaAsIAAhXIAKAAIAAAHQAIgHAKgBQALAAAHAJQAHAIAAAQIAAABQAAAOgHAJQgHAIgLAAQgLAAgGgHIAAAegAgPgaIAAAeQAFAIAKABQAHAAAEgHQAFgGAAgLQAAgLgFgGQgEgHgHAAQgKABgFAIg");
	this.shape_11.setTransform(77,-15.95);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAiAgIAAgpQAAgGgEgEQgDgDgHAAQgGAAgEAEQgEADAAAGIAAApIgLAAIAAgoQAAgOgNAAQgKAAgFAJIAAAtIgLAAIAAg+IALAAIAAAHQAHgIAMAAQAOAAADAKQADgFAFgDQAGgCAHAAQAUAAABAWIAAApg");
	this.shape_12.setTransform(65.3,-17.175);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_13.setTransform(56.975,-17.125);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_14.setTransform(51.625,-17.825);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_15.setTransform(46.725,-17.125);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgSAsIgFgBIAAgIIAEAAQAFAAADgCQADgDACgGIACgGIgWg+IALAAIAQAvIAOgvIAMAAIgZBJQgFAPgNAAg");
	this.shape_16.setTransform(40.8,-15.85);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgOApQgIgEgDgGQgFgGAAgHIAMAAQgBAIAGAEQAGAFAJAAQAJAAAEgEQAFgEAAgGQAAgGgFgDQgEgEgLgDQgOgEgHgFQgGgHAAgIQAAgLAIgGQAIgHAMAAQAIAAAIAEQAGADAFAGQADAGAAAHIgLAAQgBgIgEgEQgFgFgJAAQgHAAgFAEQgEAEAAAGQAAAGADADQAFAEAKADQAKADAHACQAFAEAEAFQACAFAAAGQAAAKgIAHQgIAGgNAAQgJAAgHgDg");
	this.shape_17.setTransform(34.4,-18.225);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FF8C2D").s().p("ArojsIXRgNIAAHmI3RANg");
	this.shape_18.setTransform(82.35,-18.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_3
	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(0,0,0,0.227)").s().p("AroD6IAAnzIXRAAIAAHzg");
	this.shape_19.setTransform(77.3,-14.8);
	this.shape_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_19).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(2.8,-43.1,154.89999999999998,53.3);


(lib.drag3G2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("ArojqIXRAAIAAHVI3RAAg");
	this.shape.setTransform(86.45,-18.175);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgdA4QgLgKAAgQIARAAQAAAKAGAGQAHAGAKAAQAMAAAGgGQAGgGAAgMQAAgLgHgGQgGgGgNAAIgLAAIAAgMIALAAQALAAAGgGQAHgGAAgKQAAgXgWAAQgKAAgGAGQgGAGAAAKIgRAAQABgPAKgKQAMgKAQAAQASAAAKAKQALAJAAARQgBAJgFAHQgGAIgIAEQAKACAFAIQAHAIgBALQAAARgLAKQgLALgSAAQgRAAgMgKg");
	this.shape_1.setTransform(152.55,-5.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAOAtIAAgqQAAgGgDgDQgDgEgGAAQgFAAgDAEQgFADgCADIAAAtIgLAAIAAhZIALAAIAAAiQAHgIALgBQAUABAAAVIAAAqg");
	this.shape_2.setTransform(148.15,-18.45);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAFgDAGAAQAMAAAFAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgOANQAAAFADADQAEACAFAAQAEAAAEgCQAFgDACgEIAAgNIgIAAQgUAAABAMg");
	this.shape_3.setTransform(141.55,-17.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgOAgIAAg+IALAAIAAAHQAEgIAJAAIAFABIAAAKIgFgBQgKAAgDAJIAAAsg");
	this.shape_4.setTransform(136.6,-17.175);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAHgDAGAAQAKAAAGAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgOANQgBAFAEADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgJAAQgSAAAAAMg");
	this.shape_5.setTransform(130.95,-17.125);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgTAkQgHgJAAgOIAAgBQAAgOAHgIQAHgJALAAQAKAAAHAIIAAgiIALAAIAABZIgKAAIgBgHQgGAJgLgBQgLABgHgKgAgKgDQgFAFAAAMQAAAKAFAGQAEAHAHgBQAKAAAFgJIAAgcQgFgJgKAAQgHAAgEAHg");
	this.shape_6.setTransform(124.175,-18.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAOAtIAAgqQAAgGgDgDQgDgEgHAAQgEAAgEAEQgDADgDADIAAAtIgLAAIAAhZIALAAIAAAiQAHgIALgBQAUABAAAVIAAAqg");
	this.shape_7.setTransform(114.7,-18.45);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGANAAIAKAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAHgDAGAAQAKAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgOANQAAAFADADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgJAAQgSAAAAAMg");
	this.shape_8.setTransform(108.1,-17.125);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgOAgIAAg+IAKAAIAAAHQAFgIAKAAIAEABIAAAKIgFgBQgKAAgEAJIAAAsg");
	this.shape_9.setTransform(103.15,-17.175);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGAMAAIALAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAGgDAHAAQAKAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgPANQABAFADADQAEACAFAAQAEAAAFgCQAEgDACgEIAAgNIgJAAQgSAAgBAMg");
	this.shape_10.setTransform(97.5,-17.125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgTAkQgHgJAAgOIAAgBQAAgOAHgIQAHgJALAAQAKAAAHAIIAAgiIALAAIAABZIgKAAIgBgHQgGAJgLgBQgLABgHgKgAgKgDQgFAFAAAMQAAAKAFAGQAEAHAHgBQAKAAAFgJIAAgcQgFgJgKAAQgHAAgEAHg");
	this.shape_11.setTransform(90.725,-18.4);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_12.setTransform(84.425,-17.125);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IALAAIAAAHQAFgIAJAAIAGABIAAAKIgGgBQgKAAgEAJIAAAsg");
	this.shape_13.setTransform(79.5,-17.175);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_14.setTransform(74.075,-17.125);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgaAsIAAhXIAKAAIABAHQAGgHALgBQAMAAAGAJQAHAIAAAQIAAABQAAAOgHAJQgGAIgMAAQgLAAgGgHIAAAegAgPgaIAAAeQAFAIAKABQAHAAAFgHQAEgGAAgLQAAgLgEgGQgFgHgHAAQgKABgFAIg");
	this.shape_15.setTransform(67.6,-15.95);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAhAgIAAgpQAAgGgCgEQgDgDgIAAQgGAAgEAEQgEADgBAGIAAApIgKAAIAAgoQAAgOgNAAQgLAAgDAJIAAAtIgLAAIAAg+IAKAAIAAAHQAHgIAMAAQANAAAEAKQAEgFAFgDQAFgCAGAAQAVAAABAWIAAApg");
	this.shape_16.setTransform(55.9,-17.175);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_17.setTransform(47.575,-17.125);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_18.setTransform(42.225,-17.825);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_19.setTransform(37.325,-17.125);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgTAsIgDgBIAAgIIACAAQAGAAADgCQADgDACgGIADgGIgXg+IAMAAIAOAvIAPgvIAMAAIgZBJQgGAPgNAAg");
	this.shape_20.setTransform(31.4,-15.85);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgOApQgHgEgFgGQgEgGAAgHIALAAQABAIAFAEQAGAFAIAAQAKAAAEgEQAFgEAAgGQAAgGgFgDQgEgEgLgDQgOgEgGgFQgHgHAAgIQAAgLAIgGQAIgHAMAAQAJAAAGAEQAIADADAGQAEAGAAAHIgMAAQABgIgFgEQgFgFgJAAQgHAAgFAEQgFAEAAAGQABAGAEADQAEAEAKADQALADAFACQAHAEACAFQADAFAAAGQAAAKgIAHQgIAGgOAAQgHAAgIgDg");
	this.shape_21.setTransform(25,-18.225);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FF8C2D").s().p("ArpjsIXTgNIAAHmI3TANg");
	this.shape_22.setTransform(86.475,-18.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_3
	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("rgba(0,0,0,0.227)").s().p("ArpD6IAAnzIXTAAIAAHzg");
	this.shape_23.setTransform(81.575,-14.7);
	this.shape_23._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_23).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(7,-43.1,155,53.400000000000006);


(lib.drag2G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("ArojqIXRAAIAAHVI3RAAg");
	this.shape.setTransform(86.475,-18.175);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAIBAIAAhrIggAMIAAgPIAugRIADAAIAAB/g");
	this.shape_1.setTransform(151.6,-5.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAOAgIAAgpQAAgHgDgDQgDgDgHAAQgEAAgEADQgDADgDAEIAAAsIgLAAIAAg+IAKAAIABAIQAHgJALAAQAUAAAAAWIAAApg");
	this.shape_2.setTransform(135.75,-17.175);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgDgEQgDgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAHgDAGAAQAKAAAGAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgOANQgBAFAEADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgJAAQgSAAAAAMg");
	this.shape_3.setTransform(129.15,-17.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGAMAAIALAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAGgDAHAAQAKAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgPANQABAFADADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgJAAQgSAAgBAMg");
	this.shape_4.setTransform(122.6,-17.125);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAOAgIAAgpQAAgHgDgDQgDgDgHAAQgEAAgEADQgDADgDAEIAAAsIgLAAIAAg+IAKAAIABAIQAHgJALAAQAUAAAAAWIAAApg");
	this.shape_5.setTransform(116.05,-17.175);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgOAgIAAg+IALAAIAAAHQAEgIAKAAIAEABIAAAKIgFgBQgKAAgDAJIAAAsg");
	this.shape_6.setTransform(111.05,-17.175);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAGAAQANAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAFAFQAGAGAHAAQAFAAAFgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgKgSQgEAFgBAIIAfAAIAAgBQAAgIgEgEQgFgFgHAAQgFAAgFAFg");
	this.shape_7.setTransform(105.65,-17.125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgPIAAgBQAAgJAEgIQADgHAGgEQAHgEAHAAQALAAAHAHQAHAGABAKIgLAAQAAgGgEgEQgFgEgGAAQgHAAgEAGQgFAGAAALIAAABQAAALAEAGQAFAGAHAAQAGAAAFgDQAEgEAAgFIALAAQgBAFgDAFQgEAFgFADQgGADgHAAQgMAAgHgJg");
	this.shape_8.setTransform(99.375,-17.125);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAOAgIAAgpQAAgHgDgDQgDgDgHAAQgEAAgEADQgEADgCAEIAAAsIgLAAIAAg+IALAAIAAAIQAHgJALAAQAUAAAAAWIAAApg");
	this.shape_9.setTransform(92.85,-17.175);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAGgFQAHgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAFAFQAGAGAHAAQAFAAAFgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgKgSQgEAFgBAIIAfAAIAAgBQgBgIgDgEQgEgFgHAAQgGAAgFAFg");
	this.shape_10.setTransform(86.5,-17.125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgaAsIAAhXIAKAAIABAHQAGgHALgBQAMAAAGAJQAHAIAAAQIAAABQAAAOgHAJQgGAIgMAAQgKAAgHgHIAAAegAgPgaIAAAeQAFAIAKABQAGAAAGgHQAEgGAAgLQAAgLgEgGQgFgHgHAAQgKABgFAIg");
	this.shape_11.setTransform(80,-15.95);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAhAgIAAgpQAAgGgCgEQgDgDgIAAQgGAAgEAEQgEADgBAGIAAApIgJAAIAAgoQAAgOgOAAQgLAAgDAJIAAAtIgMAAIAAg+IALAAIAAAHQAHgIAMAAQAOAAADAKQADgFAGgDQAEgCAIAAQAUAAAAAWIAAApg");
	this.shape_12.setTransform(68.3,-17.175);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAGAAQANAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAEAGAHAAQAGAAAFgCIAGgGIAHAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgFgEQgDgFgIAAQgFAAgEAFg");
	this.shape_13.setTransform(60,-17.125);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_14.setTransform(54.625,-17.825);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_15.setTransform(49.725,-17.125);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgTAsIgDgBIAAgIIADAAQAFAAADgCQADgDACgGIADgGIgXg+IALAAIAPAvIAPgvIAMAAIgaBJQgEAPgOAAg");
	this.shape_16.setTransform(43.8,-15.85);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgOApQgIgEgEgGQgEgGAAgHIAMAAQAAAIAFAEQAGAFAIAAQAKAAAEgEQAFgEAAgGQAAgGgEgDQgFgEgLgDQgOgEgGgFQgHgHAAgIQAAgLAIgGQAIgHAMAAQAIAAAIAEQAGADAEAGQAEAGAAAHIgMAAQABgIgFgEQgFgFgJAAQgHAAgFAEQgEAEgBAGQAAAGAFADQAEAEAKADQALADAFACQAHAEACAFQADAFAAAGQAAAKgIAHQgIAGgOAAQgHAAgIgDg");
	this.shape_17.setTransform(37.4,-18.225);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FF8C2D").s().p("ArojsIXRgNIAAHmI3RANg");
	this.shape_18.setTransform(86.5,-18.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_3
	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(0,0,0,0.227)").s().p("ArpD6IAAnzIXTAAIAAHzg");
	this.shape_19.setTransform(81.6,-14.7);
	this.shape_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_19).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(7,-43.1,155,53.400000000000006);


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


(lib.teksPengerjaan = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween1("synched",0);

	this.instance_1 = new lib.Tween2("synched",0);
	this.instance_1.setTransform(-12.55,0);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween3("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},12).to({state:[{t:this.instance_2}]},14).wait(4));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,x:-12.55},12).wait(18));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},12).to({_off:true,x:0},14).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-87.8,-10.4,163.1,20.8);


(lib.saraf = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.saraf = new lib.drag3G5();
	this.saraf.name = "saraf";
	this.saraf.setTransform(-1.65,0.05,0.8174,0.8174,0,0,0,84.5,24);
	new cjs.ButtonHelper(this.saraf, 0, 1, 2, false, new lib.drag3G5(), 3);

	this.timeline.addTween(cjs.Tween.get(this.saraf).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.saraf, new cjs.Rectangle(-65,-54.8,126.9,43.699999999999996), null);


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


(lib.Pieces5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// pieces
	this.nafas = new lib.drop3G4();
	this.nafas.name = "nafas";
	this.nafas.setTransform(819.35,359.6,0.5226,0.5226,0,0,0,130.6,56.8);
	new cjs.ButtonHelper(this.nafas, 0, 1, 1);

	this.ekskresi = new lib.drop3G3();
	this.ekskresi.name = "ekskresi";
	this.ekskresi.setTransform(648.4,423.05,0.5226,0.5226,0,0,0,124.4,86.4);
	new cjs.ButtonHelper(this.ekskresi, 0, 1, 1);

	this.saraf = new lib.drop3G5();
	this.saraf.name = "saraf";
	this.saraf.setTransform(819.65,442.25,0.5226,0.5226,0,0,0,123.2,60.1);
	new cjs.ButtonHelper(this.saraf, 0, 1, 1);

	this.darah = new lib.drop3G2();
	this.darah.name = "darah";
	this.darah.setTransform(819.6,284.35,0.5226,0.5226,0,0,0,135.4,56.8);
	new cjs.ButtonHelper(this.darah, 0, 1, 1);

	this.cerna = new lib.drop3G1();
	this.cerna.name = "cerna";
	this.cerna.setTransform(648.4,312.3,0.5226,0.5226,0,0,0,22.7,9.1);
	new cjs.ButtonHelper(this.cerna, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.cerna},{t:this.darah},{t:this.saraf},{t:this.ekskresi},{t:this.nafas}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces5, new cjs.Rectangle(564.2,234.8,339.79999999999995,272.8), null);


(lib.nafas = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.nafas = new lib.drag3G3();
	this.nafas.name = "nafas";
	this.nafas.setTransform(-0.1,2.35,0.8174,0.8174,0,0,0,82.2,26.8);
	new cjs.ButtonHelper(this.nafas, 0, 1, 2, false, new lib.drag3G3(), 3);

	this.timeline.addTween(cjs.Tween.get(this.nafas).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.nafas, new cjs.Rectangle(-65,-54.8,126.7,43.599999999999994), null);


(lib.info = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween12("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:-19},26).to({y:0},33).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-97.4,-29.4,194.8,39.8);


(lib.geser = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween4("synched",0);

	this.instance_1 = new lib.Tween5("synched",0);
	this.instance_1.setTransform(-24,0);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween6("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},16).to({state:[{t:this.instance_2}]},17).wait(2));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,x:-24},16).wait(19));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},16).to({_off:true,x:0},17).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-53.3,-10.4,82.69999999999999,20.8);


(lib.ekskresi = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.ekskresi = new lib.drag3G4();
	this.ekskresi.name = "ekskresi";
	this.ekskresi.setTransform(-1.65,0.05,0.8174,0.8174,0,0,0,84.5,24);
	new cjs.ButtonHelper(this.ekskresi, 0, 1, 2, false, new lib.drag3G4(), 3);

	this.timeline.addTween(cjs.Tween.get(this.ekskresi).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ekskresi, new cjs.Rectangle(-65,-54.8,126.9,43.699999999999996), null);


(lib.darah = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.darah = new lib.drag3G2();
	this.darah.name = "darah";
	this.darah.setTransform(-1.7,0.05,0.8174,0.8174,0,0,0,84.4,24);
	new cjs.ButtonHelper(this.darah, 0, 1, 2, false, new lib.drag3G2(), 3);

	this.timeline.addTween(cjs.Tween.get(this.darah).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.darah, new cjs.Rectangle(-65,-54.8,126.9,43.699999999999996), null);


(lib.cerna = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.cerna = new lib.drag2G1();
	this.cerna.name = "cerna";
	this.cerna.setTransform(-1.7,-32.95,0.8174,0.8174,0,0,0,84.4,-16.4);
	new cjs.ButtonHelper(this.cerna, 0, 1, 2, false, new lib.drag2G1(), 3);

	this.timeline.addTween(cjs.Tween.get(this.cerna).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.cerna, new cjs.Rectangle(-65,-54.8,126.9,43.699999999999996), null);


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


(lib.Slots5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// slots
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgKgFgGQgEgEgKAAQgHAAgGADQgGAFgDAGIAABEIgQAAIAAhfIAPAAIAAANQALgOARgBQAeAAAAAjIAAA+g");
	this.shape.setTransform(393.225,234);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgHAFgHQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAAqQAAAOADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_1.setTransform(383.325,234.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAWAwIgWhHIgWBHIgNAAIgbhfIAQAAIASBGIAWhGIANAAIAWBIIAShIIARAAIgcBfg");
	this.shape_2.setTransform(371.65,234.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgbAlQgNgNAAgVIAAgDQABgNAFgLQAGgMAJgGQAKgGAKgBQATAAAKANQAKAMAAAXIAAAFIg/AAQABAOAHAKQAIAIALAAQAJAAAGgEQAFgDAFgGIAKAIQgMASgYAAQgSABgMgNgAgPgcQgGAHgCAOIAvAAIAAgCQgBgNgFgGQgHgHgKAAQgIAAgIAHg");
	this.shape_3.setTransform(360.2,234.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAgBAIAAg7Ig/AAIAAA7IgRAAIAAh/IARAAIAAA3IA/AAIAAg3IARAAIAAB/g");
	this.shape_4.setTransform(348.9,232.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAUBEIgggtIgKALIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_5.setTransform(334.125,232.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAEAAADADQADACAAAEQAAAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_6.setTransform(326.8,232.375);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgCA1QgGgGAAgMIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_7.setTransform(321.375,233.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgIAAgIIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgDAAgHQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgEgDgEQgEgFAAgIQAAgLAKgJQAKgIAPAAQAQAAAKAJQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAFAAAIQAAANgLAHQgKAJgQgBQgKAAgJgEg");
	this.shape_8.setTransform(314.025,234.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_9.setTransform(307.25,232.375);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAQAAIAAAMQAHgNAOgBQAFABADABIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_10.setTransform(302.5,234);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgbAlQgNgNAAgVIAAgDQAAgNAGgLQAGgMAJgGQAKgGAKgBQATAAAKANQALAMgBAXIAAAFIg/AAQAAAOAIAKQAIAIALAAQAJAAAGgEQAFgDAFgGIAKAIQgMASgYAAQgSABgMgNgAgPgcQgGAHgCAOIAvAAIAAgCQgBgNgFgGQgHgHgKAAQgIAAgIAHg");
	this.shape_11.setTransform(294.25,234.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgCA1QgGgGAAgMIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_12.setTransform(286.175,233.05);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAUBEIgggtIgKALIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_13.setTransform(279.575,232.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgHAFgHQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAAqQAAAOADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_14.setTransform(269.475,234.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAPAAIABAMQAHgNAPgBQAEABADABIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_15.setTransform(262.05,234);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgHAFgHQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAAqQAAAOADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_16.setTransform(253.575,234.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AAcBAIgsg7IgQAQIAAArIgQAAIAAh/IAQAAIAAA/IA5g/IAUAAIgyA4IA2BHg");
	this.shape_17.setTransform(243.85,232.45);

	this.darah = new lib.darah();
	this.darah.name = "darah";
	this.darah.setTransform(120.85,372.15,1,1,0,0,0,0,-34);

	this.ekskresi = new lib.ekskresi();
	this.ekskresi.name = "ekskresi";
	this.ekskresi.setTransform(272.15,421.65,1,1,0,0,0,0,-34);

	this.saraf = new lib.saraf();
	this.saraf.name = "saraf";
	this.saraf.setTransform(426.1,421.65,1,1,0,0,0,0,-34);

	this.nafas = new lib.nafas();
	this.nafas.name = "nafas";
	this.nafas.setTransform(272.2,300.15,1,1,0,0,0,0,-34);

	this.cerna = new lib.cerna();
	this.cerna.name = "cerna";
	this.cerna.setTransform(424.4,301.15,1,1,0,0,0,-1.7,-33);

	this.kotakKartu2 = new lib.hasil();
	this.kotakKartu2.name = "kotakKartu2";
	this.kotakKartu2.setTransform(116.75,222.5,1.2229,0.9068,0,0,0,49.4,59.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.kotakKartu2},{t:this.cerna},{t:this.nafas},{t:this.saraf},{t:this.ekskresi},{t:this.darah},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Slots5, new cjs.Rectangle(54.5,166.9,433.3,275.6), null);


(lib.pp6 = function(mode,startPosition,loop) {
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

	// Layer_8
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,131,0)").s().p("AipCrQhHhHAAhkQAAhjBHhGQBGhHBjAAQBkAABHBHQBGBGAABjQAABkhGBHQhHBGhkAAQhjAAhGhGg");
	this.shape.setTransform(383.7,-156.05);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_5
	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);
	this.exit._off = true;

	this.timeline.addTween(cjs.Tween.get(this.exit).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_4
	this.instance = new lib.Bitmap87();
	this.instance.setTransform(-147,-224,1.3782,2.1173);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgVBsIAAiBIgXAAIAAgUIAXAAIAAgQQAAgXANgOQAMgNAYAAQAJAAAIACIgBAVIgOgBQgMAAgHAHQgHAHAAAOIAAAQIAgAAIAAAUIggAAIAACBg");
	this.shape_1.setTransform(121.825,150.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgvBCQgOgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgOAAgJAHQgJAHAAAKIgaAAQAAgLAIgLQAIgLAOgFQAOgHAPAAQAZAAAPANQAPANAAAXIAABEQABAVAFAMIAAACIgbAAQgCgFgCgLQgRATgZAAQgVAAgPgMgAgjAeQAAAMAIAHQAIAGANABQALAAAKgHQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_2.setTransform(108.65,153.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgjBMIAAiUIAZAAIAAARQAMgUAXgBQAHAAAEADIAAAXIgMgBQgZAAgJAWIAABpg");
	this.shape_3.setTransform(96.925,153.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AguBCQgPgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgOAAgJAHQgJAHAAAKIgaAAQAAgLAIgLQAIgLAOgFQANgHAQAAQAZAAAPANQAPANAAAXIAABEQABAVAFAMIAAACIgbAAQgCgFgCgLQgSATgXAAQgWAAgOgMgAgjAeQAAAMAIAHQAIAGAMABQAMAAALgHQAKgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_4.setTransform(83.55,153.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgjBgQgSgIgKgOQgJgOgBgSIAbAAQAAATAOAKQAOALAVAAQAVAAALgJQAMgIAAgPQAAgPgLgIQgLgIgagIQgigKgPgNQgQgPAAgVQAAgYATgPQATgQAeAAQAUAAARAIQAQAIAJAOQAJAOAAARIgbAAQAAgSgMgLQgLgKgVAAQgTAAgLAJQgLAIAAAQQAAAMAKAJQALAIAYAHQAZAHAPAIQANAIAIAMQAGALABAPQgBAZgTAPQgTAPggAAQgUAAgSgIg");
	this.shape_5.setTransform(67.5,151.325);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("ABQBMIAAhiQgBgQgHgHQgHgJgSABQgOAAgJAIQgKAJgBAOIAABiIgZAAIAAhhQAAghggABQgZgBgKAWIAABsIgZAAIAAiUIAYAAIAAAQQARgTAcgBQAfAAALAZQAIgLALgHQAMgGARgBQAxAAABA1IAABjg");
	this.shape_6.setTransform(39.65,153.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgsA6QgSgUgBgiIAAgEQAAgWAJgSQAIgRAQgKQAPgKARAAQAdAAAQAUQARASgBAkIAAAKIhkAAQAAAXANANQAMAOATAAQANAAAJgGQAKgGAHgIIAQAMQgTAdgmAAQgdAAgUgUgAgXgtQgLAMgCAVIBKAAIAAgCQgBgUgKgLQgJgLgQAAQgOABgLAKg");
	this.shape_7.setTransform(19.95,153.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgEBUQgJgKAAgTIAAhcIgbAAIAAgUIAbAAIAAglIAZAAIAAAlIAcAAIAAAUIgcAAIAABcQAAAJAEAEQADAFAKAAIAMgCIAAAVQgKADgKAAQgRAAgIgLg");
	this.shape_8.setTransform(7.3,152.225);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgdBHQgOgGgIgMQgIgLAAgNIAaAAQABAMAJAIQAKAIAPAAQAOAAAJgGQAJgGAAgKQAAgKgIgGQgIgGgSgEQgUgEgLgFQgLgGgGgHQgFgJAAgLQAAgSAPgNQAQgNAXAAQAaAAAPANQAQANAAAVIgaAAQAAgLgIgHQgJgIgOAAQgNAAgIAHQgIAFAAALQAAAIAIAFQAHAFASAEQATAFAMAFQAMAGAGAIQAGAIAAAMQAAAVgQAMQgQAMgaAAQgRAAgOgHg");
	this.shape_9.setTransform(-4.325,153.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgtBpIgJgCIAAgVIAHABQANAAAHgFQAHgGAFgOIAGgPIg2iTIAcAAIAkBvIAjhvIAcAAIg9CsQgNAlgeAAg");
	this.shape_10.setTransform(-18.4,156.925);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgjBgQgSgIgJgOQgKgOAAgSIAbAAQAAATANAKQAOALAVAAQAVAAAMgJQALgIgBgPQAAgPgKgIQgKgIgagIQgjgKgQgNQgPgPAAgVQAAgYATgPQATgQAdAAQAVAAARAIQAQAIAJAOQAJAOAAARIgbAAQAAgSgLgLQgMgKgWAAQgSAAgLAJQgLAIAAAQQAAAMALAJQAKAIAYAHQAZAHAPAIQAOAIAGAMQAIALgBAPQABAZgUAPQgTAPggAAQgUAAgSgIg");
	this.shape_11.setTransform(-33.45,151.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.instance}]},12).to({state:[]},1).wait(12));

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


(lib.pp5 = function(mode,startPosition,loop) {
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

	// Layer_8
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,131,0)").s().p("AipCrQhHhHAAhkQAAhjBHhGQBGhHBjAAQBkAABHBHQBGBGAABjQAABkhGBHQhHBGhkAAQhjAAhGhGg");
	this.shape.setTransform(383.7,-156.05);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_5
	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.instance = new lib.Bitmap10();
	this.instance.setTransform(-147,-224,1.2345,2.172);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance},{t:this.exit}]},12).to({state:[]},1).wait(12));

	// Layer_4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAhBMIAAhiQAAgQgHgIQgHgHgQAAQgLAAgJAGQgKAHgFAKIAABqIgaAAIAAiUIAYAAIABATQARgXAbAAQAwAAAAA2IAABig");
	this.shape_1.setTransform(156.25,153.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgvBCQgOgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgOAAgJAHQgJAHAAAKIgaAAQAAgLAIgLQAIgLAOgFQANgHAQAAQAZAAAPANQAPANAAAXIAABEQABAVAFAMIAAACIgbAAQgCgFgCgLQgRATgZAAQgWAAgOgMgAgjAeQAAAMAIAHQAIAGANABQALAAAKgHQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_2.setTransform(140.6,153.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgdBHQgOgGgIgMQgIgLAAgNIAaAAQABAMAJAIQAKAIAPAAQAOAAAJgGQAJgGAAgKQAAgKgIgGQgIgGgSgEQgUgEgLgFQgLgGgGgHQgFgJAAgLQAAgSAPgNQAQgNAXAAQAaAAAPANQAQANAAAVIgaAAQAAgLgIgHQgJgIgOAAQgNAAgIAHQgIAFAAALQAAAIAIAFQAHAFASAEQATAFAMAFQAMAGAGAIQAGAIAAAMQAAAVgQAMQgQAMgaAAQgRAAgOgHg");
	this.shape_3.setTransform(125.475,153.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AguBCQgPgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAHAAAKIgaAAQAAgLAIgLQAIgLAOgFQAOgHAPAAQAaAAAPANQAOANAAAXIAABEQAAAVAGAMIAAACIgbAAQgCgFgBgLQgTATgXAAQgXAAgNgMgAgjAeQAAAMAIAHQAIAGAMABQALAAAMgHQAKgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_4.setTransform(110.4,153.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgVBsIAAiBIgXAAIAAgUIAXAAIAAgQQAAgXANgOQAMgNAYAAQAJAAAIACIgBAVIgOgBQgMAAgHAHQgHAHAAAOIAAAQIAgAAIAAAUIggAAIAACBg");
	this.shape_5.setTransform(98.275,150.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AguBCQgPgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAHAAAKIgaAAQAAgLAIgLQAIgLAOgFQANgHAQAAQAaAAAPANQAOANAAAXIAABEQAAAVAGAMIAAACIgbAAQgCgFgBgLQgTATgXAAQgXAAgNgMgAgjAeQAAAMAIAHQAIAGAMABQALAAAMgHQAKgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_6.setTransform(85.1,153.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAiBMIAAhiQgBgQgHgIQgHgHgQAAQgMAAgIAGQgKAHgGAKIAABqIgZAAIAAiUIAYAAIABATQARgXAbAAQAvAAABA2IAABig");
	this.shape_7.setTransform(69.6,153.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgjBMIAAiUIAZAAIAAARQAMgUAXgBQAHAAAEADIAAAXIgMgBQgZAAgJAWIAABpg");
	this.shape_8.setTransform(57.775,153.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgsA6QgTgUAAgiIAAgEQAAgWAJgSQAIgRAQgKQAPgKARAAQAdAAARAUQAPASAAAkIAAAKIhkAAQABAXAMANQANAOARAAQAOAAAKgGQAJgGAHgIIAPAMQgSAdgmAAQgdAAgUgUgAgXgtQgLAMgCAVIBKAAIAAgCQgBgUgKgLQgJgLgQAAQgOABgLAKg");
	this.shape_9.setTransform(44.9,153.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("Ag+BpIAAjOIAXAAIABAQQAQgTAbAAQAbAAAQAUQAPAVAAAkIAAACQAAAigPAVQgQAVgbAAQgaAAgQgSIAABIgAglg+IAABHQAMAVAYAAQARAAALgPQALgPAAgcQAAgZgLgPQgLgOgSAAQgXAAgMAUg");
	this.shape_10.setTransform(29.575,156.625);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("ABPBMIAAhiQABgQgIgHQgHgJgRABQgPAAgKAIQgIAJgCAOIAABiIgZAAIAAhhQAAghggABQgagBgIAWIAABsIgaAAIAAiUIAYAAIABAQQAQgTAcgBQAfAAALAZQAHgLANgHQALgGARgBQAyAAAAA1IAABjg");
	this.shape_11.setTransform(1.9,153.75);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgrA6QgUgUABgiIAAgEQgBgWAJgSQAJgRAPgKQAPgKARAAQAdAAAQAUQAQASABAkIAAAKIhlAAQABAXAMANQAMAOASAAQAOAAAJgGQAKgGAHgIIAQAMQgTAdgmAAQgdAAgTgUgAgXgtQgLAMgCAVIBKAAIAAgCQgBgUgJgLQgKgLgQAAQgPABgKAKg");
	this.shape_12.setTransform(-17.8,153.9);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgDBUQgJgKAAgTIAAhcIgcAAIAAgUIAcAAIAAglIAYAAIAAAlIAcAAIAAAUIgcAAIAABcQAAAJAEAEQAEAFAIAAIANgCIAAAVQgKADgKAAQgRAAgHgLg");
	this.shape_13.setTransform(-30.45,152.225);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgdBHQgOgGgIgMQgIgLAAgNIAaAAQABAMAJAIQAKAIAPAAQAOAAAJgGQAJgGAAgKQAAgKgIgGQgIgGgSgEQgUgEgLgFQgLgGgGgHQgFgJAAgLQAAgSAPgNQAQgNAXAAQAaAAAPANQAQANAAAVIgaAAQAAgLgIgHQgJgIgOAAQgNAAgIAHQgIAFAAALQAAAIAIAFQAHAFASAEQATAFAMAFQAMAGAGAIQAGAIAAAMQAAAVgQAMQgQAMgaAAQgRAAgOgHg");
	this.shape_14.setTransform(-42.075,153.9);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgtBpIgKgCIAAgVIAHABQANAAAIgFQAHgGAFgOIAFgPIg1iTIAcAAIAlBvIAjhvIAbAAIg9CsQgMAlgfAAg");
	this.shape_15.setTransform(-56.15,156.925);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgjBgQgSgIgKgOQgJgOgBgSIAbAAQAAATAOAKQAOALAVAAQAVAAALgJQAMgIAAgPQAAgPgLgIQgLgIgagIQgigKgPgNQgQgPAAgVQAAgYATgPQATgQAeAAQAUAAARAIQAQAIAJAOQAJAOAAARIgbAAQAAgSgMgLQgLgKgVAAQgTAAgLAJQgLAIAAAQQAAAMAKAJQALAIAYAHQAZAHAOAIQAOAIAIAMQAGALABAPQgBAZgTAPQgTAPggAAQgUAAgSgIg");
	this.shape_16.setTransform(-71.2,151.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]},12).to({state:[]},1).wait(12));

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

	// Layer_8
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,131,0)").s().p("AipCrQhHhHAAhkQAAhjBHhGQBGhHBjAAQBkAABHBHQBGBGAABjQAABkhGBHQhHBGhkAAQhjAAhGhGg");
	this.shape.setTransform(383.7,-156.05);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_5
	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.instance = new lib.Bitmap83();
	this.instance.setTransform(-147,-224,1.152,2.1446);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance},{t:this.exit}]},12).to({state:[]},1).wait(12));

	// Layer_4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF83").s().p("AAYBNIAQhiIAAgMQgCgUgVAAQgVgBgRAZIgTBqIgZAAIAaiVIAYAAIgEATQATgXAaABQAVAAALAPQAKAOgDAZIgQBig");
	this.shape_1.setTransform(155.975,153.7495);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF83").s().p("AgSBOQgUgBgMgMQgNgMABgTQACgYATgMQAUgNAfAAIAaAAIABgMQACgOgHgHQgGgIgOgBQgMAAgJAHQgKAGgCALIgaAAQACgNAJgKQAJgKAOgGQANgFAPAAQAXAAANAOQANAOgCAWIgMBKIgBAKQAAAIACAHIAAADIgaAAIgBgIIABgIQgUATgWAAIgBAAgAgWAJQgMAIgCAOQgBAKAGAHQAGAHAMAAQAMABAKgGQALgGAHgLIAGgfIgTAAQgXAAgNAHg");
	this.shape_2.setTransform(140.9096,153.9006);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF83").s().p("AgSBOQgUgBgMgMQgNgMABgTQACgYATgMQAUgNAfAAIAaAAIABgMQACgOgHgHQgGgIgOgBQgMAAgJAHQgKAGgCALIgaAAQACgNAJgKQAJgKAOgGQANgFAPAAQAXAAANAOQANAOgCAWIgMBKIgBAKQAAAIACAHIAAADIgaAAIgBgIIABgIQgUATgWAAIgBAAgAgWAJQgMAIgCAOQgBAKAGAHQAGAHAMAAQAMABAKgGQALgGAHgLIAGgfIgTAAQgXAAgNAHg");
	this.shape_3.setTransform(125.7596,153.9006);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF83").s().p("AAYBNIAQhiIAAgMQgCgUgVAAQgVgBgRAZIgTBqIgZAAIAaiVIAYAAIgEATQATgXAaABQAVAAALAPQAKAOgDAZIgQBig");
	this.shape_4.setTransform(110.325,153.7495);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF83").s().p("AgvBNIAaiVIAXAAIgDARQAQgVAVABIAMACIgDAYIgMgCQgYAAgNAWIgSBqg");
	this.shape_5.setTransform(99.1,153.7494);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFF83").s().p("AgwA5QgQgUADggIABgFQACgVALgTQALgSAPgKQAQgJARAAQAXAAANAQQAOAPABAZQAAAJgBAJIgBAKIhhAAQgDAVAKAOQAJAOASABQAVABATgVIAOAMQgJAOgPAHQgPAIgRAAQgcgBgQgUgAgPguQgMALgHAXIBIAAIABgDQACgRgIgMQgIgLgOgBIgCAAQgNAAgLAKg");
	this.shape_6.setTransform(86.5914,153.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFF83").s().p("AgnBEQgNgJgGgRQgGgRACgVIABgGQACgWAKgRQAKgRAQgKQAQgJATAAQAXABAOAPQAPAQAAAXIgYAAQAAgPgIgJQgIgJgNgBQgTAAgNAPQgNAPgDAaIAAADQgBAJAAAKQABAQAIAJQAJAKAOAAQAMABALgJQALgIADgNIAYAAQgCAOgJAMQgJALgOAHQgOAGgOAAQgTAAgNgKg");
	this.shape_7.setTransform(72.0765,153.8988);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFF83").s().p("AAYBNIAQhiIAAgMQgCgUgVAAQgVgBgRAZIgTBqIgZAAIAaiVIAYAAIgEATQATgXAaABQAVAAALAPQAKAOgDAZIgQBig");
	this.shape_8.setTransform(56.225,153.7495);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFF83").s().p("AgwA5QgQgUADggIABgFQACgVALgTQALgSAPgKQAQgJARAAQAXAAANAQQAOAPABAZQAAAJgBAJIgBAKIhhAAQgDAVAKAOQAJAOASABQAVABATgVIAOAMQgJAOgPAHQgPAIgRAAQgcgBgQgUgAgPguQgMALgHAXIBIAAIABgDQACgRgIgMQgIgLgOgBIgCAAQgNAAgLAKg");
	this.shape_9.setTransform(41.9914,153.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFF83").s().p("AhJBpIAkjOIAXAAIgCAQQARgUAaABQAVAAAMAQQANAPABAbIgBASIgBACQgDAXgJASQgKASgOAJQgOAJgRAAQgZgBgOgRIgOBIgAgTg+IgMBHQAIAUAWABQASAAANgPQAOgPAEgcIAAgMQAAgUgIgLQgHgLgPAAIgBAAQgUAAgQAUg");
	this.shape_10.setTransform(25.75,156.6244);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFF83").s().p("ABFBNIAQhiIAAgNQgDgTgWgBQgNAAgLAJQgMAJgDAOIgRBjIgYAAIAQhiQACgPgGgJQgHgIgNAAQgYgBgNAWIgTBtIgaAAIAaiVIAYAAIgDAQQATgUAaABQAPAAAJAGQAKAHADALQAVgZAdABQAXAAAKAPQALAPgDAYIgQBig");
	this.shape_11.setTransform(-0.826,153.7494);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFF83").s().p("AgwA5QgQgUADggIABgFQACgVALgTQALgSAPgKQAQgJARAAQAXAAANAQQAOAPABAZQAAAJgBAJIgBAKIhhAAQgDAVAKAOQAJAOASABQAVABATgVIAOAMQgJAOgPAHQgPAIgRAAQgcgBgQgUgAgPguQgMALgHAXIBIAAIABgDQACgRgIgMQgIgLgOgBIgCAAQgNAAgLAKg");
	this.shape_12.setTransform(-19.5586,153.9);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFF83").s().p("AgXBUQgHgLABgSIAQhcIgbAAIADgUIAaAAIAHglIAYAAIgHAlIAcAAIgDAUIgbAAIgPBcIAAAHQAAALAKAAIANgCIgDAVQgIADgJgBQgOABgIgLg");
	this.shape_13.setTransform(-31.05,152.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFF83").s().p("AguBAQgQgOABgVIAZAAQAAANAIAHQAIAIAOAAQANAAAKgGQAKgGABgLQACgPgTgGIgZgIQghgLABgaQABgTARgOQASgMAVAAQAYAAAOANQAOANgBAVIgZAAQABgLgIgHQgHgIgNAAQgMAAgJAHQgIAGgCAKQgCANASAGIAMADQAaAIAKAJQALAKgBAQQgBAPgIAKQgJAKgNAGQgOAFgPAAQgXAAgQgOg");
	this.shape_14.setTransform(-43.4999,153.9);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFF83").s().p("Ag8BpQgFABgKgDIACgVIAHABQAMAAAJgGQAIgFAHgOIAJgRIgaiSIAaAAIARBvIA0hvIAcAAIhYCuQgSAlgdAAIgBgBg");
	this.shape_15.setTransform(-57.225,156.9503);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFF83").s().p("AgvBfQgPgIgJgNQgIgOABgSIAaAAQgBASALALQALAKAUABQATAAANgJQANgJACgPQADgWgagLIgXgIIgIgEQgogRACgiQACgRAKgMQAKgNARgHQARgHARAAQATAAAOAIQAOAIAIAOQAHAOAAARIgbAAQACgSgKgLQgKgKgSAAQgSAAgNAJQgMAJgCAQQgDAUAcALIAUAIIAKAEQAnARgDAjQgBASgKAMQgKAMgRAHQgRAHgTAAQgTgBgQgIg");
	this.shape_16.setTransform(-71.479,151.3233);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]},12).to({state:[]},1).wait(12));

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

	// Layer_8
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,131,0)").s().p("AipCrQhHhHAAhkQAAhjBHhGQBGhHBjAAQBkAABHBHQBGBGAABjQAABkhGBHQhHBGhkAAQhjAAhGhGg");
	this.shape.setTransform(383.7,-156.05);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_5
	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.instance = new lib.Bitmap84();
	this.instance.setTransform(-147,-224,1.177,2.1446);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance},{t:this.exit}]},12).to({state:[]},1).wait(12));

	// Layer_4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAhBqIAAhjQAAgPgHgIQgHgHgQAAQgMAAgIAGQgKAHgGAKIAABqIgZAAIAAjTIAZAAIAABRQARgWAbAAQAwAAAAA1IAABjg");
	this.shape_1.setTransform(188.3,150.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AguBCQgPgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgOAAgJAHQgJAHAAAKIgaAAQAAgLAIgLQAIgLAOgFQANgHAQAAQAZAAAPANQAPANAAAXIAABEQABAVAFAMIAAACIgbAAQgCgFgCgLQgSATgXAAQgWAAgOgMgAgjAeQAAAMAIAHQAIAGAMABQAMAAALgHQAKgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_2.setTransform(172.65,153.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgjBMIAAiUIAZAAIAAARQAMgUAXgBQAHAAAEADIAAAXIgMgBQgZAAgJAWIAABpg");
	this.shape_3.setTransform(160.925,153.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AguBCQgPgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgOAAgJAHQgJAHAAAKIgaAAQAAgLAIgLQAIgLAOgFQANgHAQAAQAZAAAQANQAOANAAAXIAABEQABAVAFAMIAAACIgbAAQgCgFgCgLQgRATgYAAQgWAAgOgMgAgjAeQAAAMAIAHQAIAGAMABQAMAAALgHQAKgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_4.setTransform(147.55,153.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AguBXQgRgWAAgiIAAgDQAAghARgVQARgVAaAAQAZAAAPASIAAhOIAaAAIAADUIgXAAIgCgQQgPATgaAAQgaAAgRgVgAgagKQgKANAAAdQAAAZAKAOQAKAPASAAQAZAAAKgWIAAhEQgLgVgYAAQgSAAgKAPg");
	this.shape_5.setTransform(131.55,150.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAhBqIAAhjQAAgPgHgIQgIgHgPAAQgLAAgKAGQgJAHgFAKIAABqIgaAAIAAjTIAaAAIAABRQARgWAaAAQAwAAAAA1IAABjg");
	this.shape_6.setTransform(109.15,150.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgvBCQgOgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgOAAgJAHQgJAHAAAKIgaAAQAAgLAIgLQAIgLAOgFQAOgHAPAAQAaAAAPANQAOANABAXIAABEQgBAVAGAMIAAACIgbAAQgCgFgBgLQgSATgZAAQgWAAgOgMgAgjAeQAAAMAIAHQAIAGANABQAKAAALgHQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_7.setTransform(93.5,153.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgjBMIAAiUIAZAAIAAARQAMgUAXgBQAHAAAEADIAAAXIgMgBQgZAAgJAWIAABpg");
	this.shape_8.setTransform(81.775,153.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgvBCQgOgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgOAAgJAHQgJAHAAAKIgaAAQAAgLAIgLQAIgLAOgFQAOgHAPAAQAaAAAOANQAPANABAXIAABEQgBAVAGAMIAAACIgbAAQgCgFgCgLQgRATgZAAQgVAAgPgMgAgjAeQAAAMAIAHQAIAGANABQALAAAKgHQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_9.setTransform(68.4,153.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AguBXQgQgWAAgiIAAgDQAAghAQgVQAQgVAbAAQAZAAAQASIAAhOIAaAAIAADUIgZAAIAAgQQgQATgbAAQgaAAgQgVgAgagKQgLANABAdQgBAZALAOQALAPARAAQAYAAAMgWIAAhEQgMgVgYAAQgRAAgLAPg");
	this.shape_10.setTransform(52.4,150.9);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgrA6QgUgUABgiIAAgEQgBgWAJgSQAJgRAPgKQAPgKARAAQAdAAARAUQAQASAAAkIAAAKIhlAAQAAAXANANQANAOARAAQAOAAAKgGQAJgGAHgIIAPAMQgSAdgmAAQgeAAgSgUgAgXgtQgKAMgDAVIBKAAIAAgCQgBgUgJgLQgKgLgQAAQgPABgKAKg");
	this.shape_11.setTransform(37.45,153.9);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgjBMIAAiUIAZAAIAAARQAMgUAXgBQAHAAAEADIAAAXIgMgBQgZAAgJAWIAABpg");
	this.shape_12.setTransform(25.825,153.75);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgsA6QgTgUAAgiIAAgEQAAgWAJgSQAIgRAQgKQAPgKARAAQAdAAARAUQAPASAAAkIAAAKIhkAAQABAXAMANQANAOARAAQAOAAAKgGQAJgGAHgIIAPAMQgSAdgmAAQgdAAgUgUgAgXgtQgLAMgCAVIBKAAIAAgCQgBgUgKgLQgJgLgQAAQgOABgLAKg");
	this.shape_13.setTransform(12.95,153.9);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("Ag+BpIAAjOIAXAAIABAQQAQgTAbAAQAbAAAQAUQAPAVAAAkIAAACQAAAigPAVQgQAVgbAAQgaAAgQgSIAABIgAglg+IAABHQAMAVAYAAQARAAALgPQALgPAAgcQAAgZgLgPQgLgOgSAAQgXAAgMAUg");
	this.shape_14.setTransform(-2.375,156.625);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("ABPBMIAAhiQABgQgIgHQgHgJgRABQgPAAgKAIQgIAJgCAOIAABiIgZAAIAAhhQAAghggABQgagBgIAWIAABsIgaAAIAAiUIAYAAIABAQQAQgTAcgBQAfAAALAZQAHgLANgHQALgGARgBQAyAAAAA1IAABjg");
	this.shape_15.setTransform(-30.05,153.75);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgrA6QgUgUABgiIAAgEQgBgWAJgSQAJgRAPgKQAPgKARAAQAdAAAQAUQAQASABAkIAAAKIhlAAQABAXAMANQAMAOASAAQAOAAAJgGQAKgGAHgIIAQAMQgTAdgmAAQgdAAgTgUgAgXgtQgLAMgCAVIBKAAIAAgCQgBgUgJgLQgKgLgQAAQgPABgKAKg");
	this.shape_16.setTransform(-49.75,153.9);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgDBUQgJgKAAgTIAAhcIgcAAIAAgUIAcAAIAAglIAYAAIAAAlIAcAAIAAAUIgcAAIAABcQAAAJAEAEQAEAFAIAAIANgCIAAAVQgKADgKAAQgRAAgHgLg");
	this.shape_17.setTransform(-62.4,152.225);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgdBHQgOgGgIgMQgIgLAAgNIAaAAQABAMAJAIQAKAIAPAAQAOAAAJgGQAJgGAAgKQAAgKgIgGQgIgGgSgEQgUgEgLgFQgLgGgGgHQgFgJAAgLQAAgSAPgNQAQgNAXAAQAaAAAPANQAQANAAAVIgaAAQAAgLgIgHQgJgIgOAAQgNAAgIAHQgIAFAAALQAAAIAIAFQAHAFASAEQATAFAMAFQAMAGAGAIQAGAIAAAMQAAAVgQAMQgQAMgaAAQgRAAgOgHg");
	this.shape_18.setTransform(-74.025,153.9);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgtBpIgKgCIAAgVIAHABQANAAAIgFQAHgGAFgOIAFgPIg1iTIAcAAIAlBvIAjhvIAbAAIg9CsQgMAlgfAAg");
	this.shape_19.setTransform(-88.1,156.925);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgjBgQgSgIgKgOQgJgOgBgSIAbAAQAAATAOAKQAOALAVAAQAVAAALgJQAMgIAAgPQAAgPgLgIQgLgIgagIQgigKgPgNQgQgPAAgVQAAgYATgPQATgQAeAAQAUAAARAIQAQAIAJAOQAJAOAAARIgbAAQAAgSgMgLQgLgKgVAAQgTAAgLAJQgLAIAAAQQAAAMAKAJQALAIAYAHQAZAHAOAIQAOAIAIAMQAGALABAPQgBAZgTAPQgTAPggAAQgUAAgSgIg");
	this.shape_20.setTransform(-103.15,151.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]},12).to({state:[]},1).wait(12));

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

	// Layer_8
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,131,0)").s().p("AipCrQhHhHAAhkQAAhjBHhGQBGhHBjAAQBkAABHBHQBGBGAABjQAABkhGBHQhHBGhkAAQhjAAhGhGg");
	this.shape.setTransform(383.7,-156.05);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_5
	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.instance = new lib.Bitmap86();
	this.instance.setTransform(-147,-224,1.1807,1.8533);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance},{t:this.exit}]},12).to({state:[]},1).wait(12));

	// Layer_4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgMBmIAAiVIAZAAIAACVgAgKhMQgEgEAAgHQAAgGAEgEQADgEAHAAQAHAAAEAEQAEAEAAAGQAAAHgEAEQgEAEgHAAQgHAAgDgEg");
	this.shape_1.setTransform(141.575,151.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgdBHQgOgGgIgMQgIgLAAgNIAaAAQABAMAJAIQAKAIAPAAQAOAAAJgGQAJgGAAgKQAAgKgIgGQgIgGgSgEQgUgEgLgFQgLgGgGgHQgFgJAAgLQAAgSAPgNQAQgNAXAAQAaAAAPANQAQANAAAVIgaAAQAAgLgIgHQgJgIgOAAQgNAAgIAHQgIAFAAALQAAAIAIAFQAHAFASAEQATAFAMAFQAMAGAGAIQAGAIAAAMQAAAVgQAMQgQAMgaAAQgRAAgOgHg");
	this.shape_2.setTransform(130.675,153.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgsA6QgSgUgBgiIAAgEQABgWAIgSQAJgRAPgKQAPgKARAAQAdAAAQAUQARASgBAkIAAAKIhkAAQAAAXANANQAMAOATAAQANAAAJgGQAKgGAHgIIAQAMQgTAdgmAAQgdAAgUgUgAgXgtQgKAMgDAVIBKAAIAAgCQgBgUgKgLQgJgLgQAAQgOABgLAKg");
	this.shape_3.setTransform(116.15,153.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgjBMIAAiUIAZAAIAAARQAMgUAXgBQAHAAAEADIAAAXIgMgBQgZAAgJAWIAABpg");
	this.shape_4.setTransform(104.475,153.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAgBqIgzhFIgQARIAAA0IgaAAIAAjTIAaAAIAACAIANgRIAugwIAfAAIg5A9IBABXg");
	this.shape_5.setTransform(92.65,150.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgdBHQgOgGgIgMQgIgLAAgNIAaAAQABAMAJAIQAKAIAPAAQAOAAAJgGQAJgGAAgKQAAgKgIgGQgIgGgSgEQgUgEgLgFQgLgGgGgHQgFgJAAgLQAAgSAPgNQAQgNAXAAQAaAAAPANQAQANAAAVIgaAAQAAgLgIgHQgJgIgOAAQgNAAgIAHQgIAFAAALQAAAIAIAFQAHAFASAEQATAFAMAFQAMAGAGAIQAGAIAAAMQAAAVgQAMQgQAMgaAAQgRAAgOgHg");
	this.shape_6.setTransform(77.075,153.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAgBqIgzhFIgQARIAAA0IgaAAIAAjTIAaAAIAACAIANgRIAugwIAgAAIg6A9IBABXg");
	this.shape_7.setTransform(63.55,150.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgsA6QgSgUAAgiIAAgEQAAgWAIgSQAJgRAPgKQAPgKARAAQAdAAAQAUQAQASABAkIAAAKIhlAAQAAAXANANQAMAOATAAQANAAAJgGQAKgGAHgIIAQAMQgTAdgmAAQgeAAgTgUgAgXgtQgKAMgDAVIBKAAIAAgCQgBgUgKgLQgJgLgQAAQgOABgLAKg");
	this.shape_8.setTransform(48.1,153.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("ABQBMIAAhiQAAgQgIgHQgHgJgSABQgOAAgJAIQgKAJgBAOIAABiIgZAAIAAhhQAAghggABQgZgBgKAWIAABsIgZAAIAAiUIAYAAIABAQQAQgTAcgBQAgAAAKAZQAIgLAMgHQALgGARgBQAxAAABA1IAABjg");
	this.shape_9.setTransform(21.1,153.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgsA6QgSgUgBgiIAAgEQABgWAIgSQAJgRAPgKQAPgKARAAQAdAAAQAUQARASgBAkIAAAKIhkAAQAAAXANANQAMAOATAAQANAAAJgGQAKgGAHgIIAQAMQgTAdgmAAQgdAAgUgUgAgXgtQgKAMgDAVIBKAAIAAgCQgBgUgKgLQgJgLgQAAQgOABgLAKg");
	this.shape_10.setTransform(1.4,153.9);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgEBUQgIgKgBgTIAAhcIgbAAIAAgUIAbAAIAAglIAZAAIAAAlIAcAAIAAAUIgcAAIAABcQAAAJAEAEQADAFAJAAIANgCIAAAVQgKADgKAAQgRAAgIgLg");
	this.shape_11.setTransform(-11.3,152.225);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgdBHQgOgGgIgMQgIgLAAgNIAaAAQABAMAJAIQAKAIAPAAQAOAAAJgGQAJgGAAgKQAAgKgIgGQgIgGgSgEQgUgEgLgFQgLgGgGgHQgFgJAAgLQAAgSAPgNQAQgNAXAAQAaAAAPANQAQANAAAVIgaAAQAAgLgIgHQgJgIgOAAQgNAAgIAHQgIAFAAALQAAAIAIAFQAHAFASAEQATAFAMAFQAMAGAGAIQAGAIAAAMQAAAVgQAMQgQAMgaAAQgRAAgOgHg");
	this.shape_12.setTransform(-22.875,153.9);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgtBpIgJgCIAAgVIAHABQANAAAHgFQAHgGAFgOIAGgPIg2iTIAcAAIAkBvIAjhvIAcAAIg9CsQgNAlgeAAg");
	this.shape_13.setTransform(-36.95,156.925);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgjBgQgSgIgJgOQgKgOAAgSIAbAAQAAATANAKQAOALAVAAQAVAAAMgJQAKgIABgPQAAgPgLgIQgLgIgZgIQgjgKgQgNQgPgPAAgVQAAgYATgPQATgQAeAAQAUAAARAIQAQAIAJAOQAJAOAAARIgbAAQAAgSgLgLQgMgKgVAAQgTAAgLAJQgLAIAAAQQAAAMAKAJQALAIAYAHQAZAHAPAIQAOAIAGAMQAIALAAAPQAAAZgUAPQgTAPggAAQgUAAgSgIg");
	this.shape_14.setTransform(-52,151.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]},12).to({state:[]},1).wait(12));

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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAJQgDgEAAgFQAAgFADgDQADgEAGAAQAHAAADAEQADADAAAFQAAAFgDAEQgDAEgHAAQgGAAgDgEg");
	this.shape.setTransform(-295.825,32.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAQBUIAAgnIhMAAIAAgMIBLh0IAWAAIAABuIAYAAIAAASIgYAAIAAAngAANgyIgwBNIAzAAIAAhRg");
	this.shape_1.setTransform(-305.375,25.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgJAJQgDgEAAgFQAAgFADgDQADgEAGAAQAHAAADAEQADADAAAFQAAAFgDAEQgDAEgHAAQgGAAgDgEg");
	this.shape_2.setTransform(-295.825,-7.175);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AglBJQgPgMAAgWIAVAAQAAAOAJAIQAIAIAOAAQAPAAAJgIQAIgIAAgQQAAgOgJgIQgJgIgQAAIgQAAIAAgQIAQAAQAOgBAJgHQAIgIAAgNQAAgegdAAQgNAAgIAIQgJAIAAANIgVAAQAAgUAPgNQAOgOAWAAQAYAAANANQAOAMAAAXQAAALgHAKQgHAKgNAGQAOADAIAKQAHAKAAAPQAAAWgPAOQgOAOgYAAQgXAAgOgOg");
	this.shape_3.setTransform(-305.625,-14.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJAJQgDgEAAgFQAAgFADgDQADgEAGAAQAHAAADAEQADADAAAFQAAAFgDAEQgDAEgHAAQgGAAgDgEg");
	this.shape_4.setTransform(-295.825,-47.425);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("Ag0BVIAAgPIA5hBQANgNAFgKQAFgJAAgKQAAgNgIgIQgIgJgNAAQgPAAgJAJQgJAJAAARIgWAAQAAgYAQgOQAOgOAZAAQAXAAAOAMQANAMAAAVQAAAZgfAhIgtAxIBUAAIAAARg");
	this.shape_5.setTransform(-305.325,-54.825);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgJAJQgDgEAAgFQAAgFADgDQADgEAGAAQAHAAADAEQADADAAAFQAAAFgDAEQgDAEgHAAQgGAAgDgEg");
	this.shape_6.setTransform(-295.825,-127.875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AALBVIAAiOIgqAQIAAgUIA8gWIADAAIAACog");
	this.shape_7.setTransform(-306.875,-135.2);

	this.text = new cjs.Text("", "10px 'Roboto-Regular'", "#FFFFFF");
	this.text.lineHeight = 17;
	this.text.parent = this;
	this.text.setTransform(-294.6,-141.75);

	this.instance = new lib.RestoreIcon("single",0);
	this.instance.setTransform(-103.15,-54.75,0.8958,0.8958,0,0,0,-0.1,-0.1);
	this.instance.alpha = 0.75;

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_8.setTransform(-226.925,68.425);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_9.setTransform(-239.775,65.975);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgLgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_10.setTransform(-252.775,66.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_11.setTransform(-262.125,63.475);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_12.setTransform(-271.525,66.225);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgVAAIAAixIAVAAIAABrIAMgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_13.setTransform(394.05,23.225);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_14.setTransform(380.775,25.85);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgeIAAgDQAAgSAHgOQAHgOAMgIQANgIAQAAQAVAAAOANQAOAMABAVIgUAAQgBgMgJgJQgIgHgMgBQgPAAgJANQgJALAAAXIAAADQAAAVAJAMQAJAMAPAAQAMAAAIgIQAJgGABgLIAUAAQgBALgHAKQgGAJgMAGQgLAGgNAAQgYAAgPgRg");
	this.shape_15.setTransform(368.325,25.85);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_16.setTransform(355.525,25.85);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_17.setTransform(336.3,23.225);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_18.setTransform(322.925,25.975);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgQIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAXAAIAAAQIgXAAIAABMQAAAIADAEQADADAIABIAKgBIAAARQgJACgIAAQgOAAgGgJg");
	this.shape_19.setTransform(312.3,24.45);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_20.setTransform(302.275,25.725);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_21.setTransform(289.225,25.975);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgmBIQgOgSAAgcIAAgCQAAgcAOgSQANgRAXAAQAVAAAMAPIAAhBIAWAAIAACxIgUAAIgBgOQgNAQgWAAQgVAAgOgSgAgWgIQgIALAAAYQAAAUAIANQAJALAPABQAUgBAJgRIAAg5QgJgRgUAAQgPAAgJAMg");
	this.shape_22.setTransform(268.075,23.35);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_23.setTransform(255.225,25.85);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgcIAAgBQAAgSAHgPQAIgPANgIQAMgIAQAAQAaAAAPASQAQARAAAdIAAACQAAARgHAPQgHAOgNAIQgNAJgRAAQgYAAgQgSgAgZghQgJAMgBAXQABAUAJANQAKANAPAAQARAAAJgNQAKgNAAgWQAAgUgKgNQgKgOgQAAQgPAAgKAOg");
	this.shape_24.setTransform(242.05,25.85);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_25.setTransform(232.375,23.225);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgPQAHgOANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALAMAOAAQAMAAAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgQgIgKQgIgIgNgBQgMAAgJAKg");
	this.shape_26.setTransform(223.425,25.85);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_27.setTransform(213.675,25.725);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_28.setTransform(198.425,23.225);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgcIAAgBQAAgSAIgPQAGgPANgIQANgIAQAAQAZAAAQASQAQARAAAdIAAACQAAARgHAPQgHAOgNAIQgNAJgRAAQgZAAgPgSgAgZghQgKAMAAAXQAAAUAKANQAKANAPAAQAQAAAKgNQAJgNAAgWQABgUgLgNQgJgOgQAAQgPAAgKAOg");
	this.shape_29.setTransform(188.8,25.85);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgfBJIgBAPIgUAAIAAixIAVAAIAABCQAOgQAVAAQAXAAANARQANARAAAeIAAACQAAAcgNASQgNARgXAAQgWAAgNgRgAgfgBIAAA1QALAUAUAAQAOAAAJgMQAIgMAAgYQAAgWgIgLQgIgMgPABQgVAAgKATg");
	this.shape_30.setTransform(175.7,23.35);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_31.setTransform(158.475,25.725);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgcIAAgBQAAgSAIgPQAGgPAOgIQAMgIAQAAQAaAAAPASQAQARAAAdIAAACQAAARgHAPQgHAOgNAIQgNAJgRAAQgYAAgQgSgAgZghQgKAMAAAXQAAAUAKANQAKANAPAAQARAAAJgNQAJgNAAgWQABgUgKgNQgKgOgQAAQgPAAgKAOg");
	this.shape_32.setTransform(141.35,25.85);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgQIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAXAAIAAAQIgXAAIAABMQAAAIAEAEQACADAIABIAKgBIAAARQgIACgJAAQgOAAgGgJg");
	this.shape_33.setTransform(130.4,24.45);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_34.setTransform(112.725,25.725);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_35.setTransform(99.725,25.85);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_36.setTransform(88.15,23.225);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgPQAHgOANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALAMAOAAQAMAAAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgQgIgKQgIgIgNgBQgMAAgJAKg");
	this.shape_37.setTransform(75.325,25.85);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgQIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIADAEQAEADAHABIAKgBIAAARQgJACgHAAQgOAAgHgJg");
	this.shape_38.setTransform(64.75,24.45);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgPAVQALgPAAgPIAAgUIAUAAIAAARQAAAMgGALQgFALgIAIg");
	this.shape_39.setTransform(50.9,32.5);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AAcBZIAAhTQAAgNgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAIIAABZIgVAAIAAixIAVAAIAABEQAPgSAVAAQAoAAAAAsIAABTg");
	this.shape_40.setTransform(42.425,23.225);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQADAEABAFQgBAFgDAEQgDADgGAAQgGAAgDgDg");
	this.shape_41.setTransform(33,23.575);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgmBIQgOgSAAgcIAAgCQAAgcAOgSQANgRAXAAQAVAAAMAPIAAhBIAWAAIAACxIgUAAIgBgOQgNAQgWAAQgVAAgOgSgAgWgIQgIALAAAYQAAAUAIANQAJALAPABQAUgBAJgRIAAg5QgJgRgUAAQgPAAgJAMg");
	this.shape_42.setTransform(23.125,23.35);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_43.setTransform(10.275,25.725);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgIg/QgDgEAAgFQAAgFADgEQADgDAFAAQAGAAADADQADAEAAAFQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_44.setTransform(0.85,23.575);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgQIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIAEAEQADADAHABIAKgBIAAARQgIACgJAAQgNAAgHgJg");
	this.shape_45.setTransform(-6.25,24.45);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_46.setTransform(-24.325,28.175);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_47.setTransform(-37.175,25.725);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAVAAIAAB8gAgIg/QgEgEAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQACAEAAAFQAAAFgCAEQgEADgGAAQgFAAgDgDg");
	this.shape_48.setTransform(-46.6,23.575);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_49.setTransform(-52.425,23.225);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_50.setTransform(-61.775,25.85);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgJQgHgKAAgLIAWAAQAAALAIAGQAIAGAMABQANAAAHgGQAHgEAAgJQAAgJgGgEQgHgFgPgDQgQgEgKgEQgJgFgFgHQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgHgLAAQgLAAgHAGQgGAFAAAIQAAAIAGAEQAGAEAPAEQAQADAKAFQAKAEAFAHQAFAHAAAKQAAARgOAKQgNAKgWAAQgOAAgLgGg");
	this.shape_51.setTransform(-74.325,25.85);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_52.setTransform(-94.975,28.175);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_53.setTransform(-107.825,25.725);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAVAAIAAB8gAgIg/QgEgEAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQACAEAAAFQAAAFgCAEQgEADgGAAQgFAAgDgDg");
	this.shape_54.setTransform(-117.25,23.575);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_55.setTransform(-126.675,25.725);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_56.setTransform(-139.725,25.975);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgVAAIAAixIAVAAIAABrIAMgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_57.setTransform(-151.35,23.225);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_58.setTransform(-171,23.225);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_59.setTransform(-184.275,25.85);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgQIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIADAEQAEADAHABIAKgBIAAARQgJACgHAAQgOAAgHgJg");
	this.shape_60.setTransform(-194.9,24.45);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgcIAAgBQAAgSAHgPQAIgPAMgIQANgIAQAAQAZAAAQASQAQARAAAdIAAACQAAARgHAPQgHAOgNAIQgNAJgRAAQgZAAgPgSgAgZghQgJAMAAAXQAAAUAJANQAKANAPAAQAQAAAKgNQAKgNAAgWQAAgUgLgNQgJgOgQAAQgPAAgKAOg");
	this.shape_61.setTransform(-205.1,25.85);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AAmBUIg7hOIgUAVIAAA5IgXAAIAAinIAXAAIAABTIBJhTIAbAAIhBBKIBHBdg");
	this.shape_62.setTransform(-218.25,23.7);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_63.setTransform(-240.825,25.85);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_64.setTransform(-252.4,23.225);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQAEAEAAAFQAAAFgEAEQgDADgGAAQgGAAgDgDg");
	this.shape_65.setTransform(-262.1,23.575);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgmBIQgOgNAAgXIAWAAQAAAPAIAIQAIAIAOAAQAOAAAIgJQAJgIAAgQIAAh2IAWAAIAAB2QAAAYgOANQgPAOgYAAQgYAAgOgNg");
	this.shape_66.setTransform(-272.075,23.825);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_67.setTransform(199.125,-14.425);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_68.setTransform(186.125,-14.3);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_69.setTransform(173.175,-14.425);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_70.setTransform(160.175,-14.3);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_71.setTransform(148.6,-16.925);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgJQgHgKAAgLIAWAAQAAALAIAGQAIAGAMABQANAAAHgGQAHgFAAgHQAAgKgGgEQgHgFgPgEQgQgDgKgEQgJgFgFgHQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgHgLAAQgLAAgHAGQgGAFAAAIQAAAIAGAEQAGADAPAFQAQADAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgGg");
	this.shape_72.setTransform(129.775,-14.3);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_73.setTransform(117.225,-14.3);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIADAEQAEADAHABIAKgBIAAARQgJACgHAAQgOAAgHgJg");
	this.shape_74.setTransform(106.6,-15.7);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_75.setTransform(96.625,-14.3);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_76.setTransform(79.15,-16.925);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_77.setTransform(65.875,-14.3);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAXAAIAAAQIgXAAIAABMQAAAIAEAEQACADAIABIAKgBIAAARQgIACgJAAQgOAAgGgJg");
	this.shape_78.setTransform(55.25,-15.7);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgoAvQgQgRAAgdIAAgBQAAgSAIgPQAGgPAOgIQAMgIAQAAQAaAAAPASQAQARAAAdIAAACQAAARgHAPQgHAOgNAJQgNAIgRAAQgYAAgQgSgAgZghQgKAMAAAXQAAAUAKANQAKANAPAAQARgBAJgNQAJgMAAgWQABgVgKgMQgKgOgQAAQgPAAgKAOg");
	this.shape_79.setTransform(45.05,-14.3);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgVAAIAAixIAVAAIAABrIAMgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_80.setTransform(33.15,-16.925);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_81.setTransform(13.925,-14.3);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgmBIQgOgSAAgcIAAgCQAAgcAOgSQANgRAXAAQAVAAAMAPIAAhBIAWAAIAACxIgUAAIgBgOQgNAQgWAAQgVAAgOgSgAgWgIQgIALAAAYQAAAVAIALQAJAMAPABQAUgBAJgRIAAg5QgJgRgUgBQgPAAgJANg");
	this.shape_82.setTransform(0.525,-16.8);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_83.setTransform(-12.325,-14.3);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("Ag0BYIAAisIAUAAIAAAOQAOgRAWAAQAWAAANARQAOARAAAfIAAACQAAAbgOASQgMARgXAAQgWAAgNgOIAAA8gAgfgzIAAA7QAKARAUAAQAOAAAJgNQAKgMgBgXQABgVgKgMQgIgMgQAAQgSAAgLARg");
	this.shape_84.setTransform(-25.1,-12.025);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_85.setTransform(-44.425,-14.425);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_86.setTransform(-57.425,-14.3);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgVAAIAAixIAVAAIAABrIAMgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_87.setTransform(-69,-16.925);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_88.setTransform(-80.95,-16.925);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_89.setTransform(-94.275,-14.175);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AgXBsIAAgQIAKABQAHAAAEgFQADgDAAgKIAAiLIAVAAIAACLQAAAjggABQgHAAgGgDgAAChZQgDgDAAgFQAAgFADgEQADgDAGgBQAGABADADQAEAEAAAFQAAAFgEADQgDAEgGAAQgGAAgDgEg");
	this.shape_90.setTransform(-104.825,-14.05);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_91.setTransform(-112.925,-14.425);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_92.setTransform(-125.975,-14.175);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIAEAEQADADAHABIAKgBIAAARQgIACgJAAQgNAAgHgJg");
	this.shape_93.setTransform(-136.65,-15.7);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQADAEAAAFQAAAFgDAEQgDADgGAAQgGAAgDgDg");
	this.shape_94.setTransform(-143.05,-16.575);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AgmBIQgOgSAAgcIAAgCQAAgcAOgSQANgRAXAAQAVAAAMAPIAAhBIAWAAIAACxIgUAAIgBgOQgNAQgWAAQgVAAgOgSgAgWgIQgIALAAAYQAAAVAIALQAJAMAPABQAUgBAJgRIAAg5QgJgRgUgBQgPAAgJANg");
	this.shape_95.setTransform(-152.975,-16.8);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALAMAOAAQAMAAAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgRgIgJQgIgIgNgBQgMAAgJAKg");
	this.shape_96.setTransform(-171.275,-14.3);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_97.setTransform(-188.025,-14.425);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_98.setTransform(-204.825,-14.3);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_99.setTransform(-218.175,-11.975);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_100.setTransform(-233.875,-14.425);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AgoAvQgQgRAAgdIAAgBQAAgSAHgPQAIgPAMgIQANgIAQAAQAZAAAQASQAQARAAAdIAAACQAAARgHAPQgHAOgNAJQgNAIgRAAQgYAAgQgSgAgZghQgKAMABAXQgBAUAKANQAKANAPAAQAQgBAKgNQAKgMgBgWQAAgVgKgMQgJgOgQAAQgPAAgKAOg");
	this.shape_101.setTransform(-245.25,-14.3);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgVAAIAAixIAVAAIAABrIALgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_102.setTransform(-257.15,-16.925);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AgdBQQgPgHgIgLQgIgMAAgPIAWAAQAAAQAMAIQALAJASAAQARAAAKgHQAJgHAAgNQAAgMgJgHQgIgGgWgHQgdgIgNgLQgNgMAAgSQAAgTAQgNQAQgNAZgBQARABANAGQAOAHAIAMQAHAMAAAOIgWAAQAAgQgKgJQgKgJgRAAQgQABgJAHQgJAHAAANQAAAKAJAHQAIAIAUAGQAVAFAMAGQAMAIAGAJQAFAKAAAMQAAAVgQAMQgQAMgaAAQgRAAgPgGg");
	this.shape_103.setTransform(-270.975,-16.45);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMgBAIgFQAIgEAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgQgIgKQgIgJgNAAQgMAAgJAKg");
	this.shape_104.setTransform(119.325,-54.55);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_105.setTransform(102.625,-54.675);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgTAPgLQAPgLAaABIAVAAIAAgKQAAgMgHgGQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_106.setTransform(85.775,-54.55);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_107.setTransform(72.475,-52.225);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAVAAIAAB8gAgIg/QgEgEAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDAEQgEADgGAAQgFAAgDgDg");
	this.shape_108.setTransform(57.25,-56.825);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_109.setTransform(47.475,-52.225);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_110.setTransform(34.625,-54.675);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgTAPgLQAPgLAaABIAVAAIAAgKQAAgMgHgGQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_111.setTransform(21.625,-54.55);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_112.setTransform(12.275,-57.175);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_113.setTransform(2.875,-54.425);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_114.setTransform(-14.7,-57.175);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_115.setTransform(-28.025,-54.425);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgPIAAhNIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAXAAIAAARIgXAAIAABNQAAAHADAEQADAEAIAAIAKgCIAAARQgJADgIAAQgOAAgGgJg");
	this.shape_116.setTransform(-38.7,-55.95);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_117.setTransform(-48.675,-54.675);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_118.setTransform(-61.725,-54.425);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_119.setTransform(-136.225,-57.175);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AgoAvQgQgRAAgeIAAAAQAAgTAHgOQAIgPANgIQAMgIAQAAQAaAAAPASQAQASAAAcIAAACQAAASgHAOQgHAOgNAJQgNAIgRAAQgYAAgQgSgAgZghQgKAMAAAXQAAAUAKANQAKANAPAAQARAAAJgOQAKgMAAgWQAAgVgKgMQgKgNgQgBQgPABgKANg");
	this.shape_120.setTransform(-145.85,-54.55);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AgfBJIgBAOIgUAAIAAiwIAWAAIAABCQAMgQAXAAQAWAAANARQANARAAAdIAAADQAAAcgNASQgNARgWAAQgXAAgNgRgAgegBIAAA1QAJATAVABQAPAAAIgMQAJgMAAgYQAAgWgJgLQgIgMgPAAQgVAAgJAUg");
	this.shape_121.setTransform(-158.95,-57.05);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_122.setTransform(-176.175,-54.675);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AgoAvQgQgRAAgeIAAAAQAAgTAHgOQAHgPANgIQANgIAQAAQAaAAAPASQAQASAAAcIAAACQAAASgHAOQgHAOgNAJQgNAIgRAAQgZAAgPgSgAgZghQgJAMAAAXQAAAUAJANQAKANAPAAQAQAAAKgOQAKgMAAgWQgBgVgJgMQgKgNgQgBQgPABgKANg");
	this.shape_123.setTransform(-193.3,-54.55);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgPIAAhNIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAXAAIAAARIgXAAIAABNQAAAHADAEQADAEAIAAIAKgCIAAARQgJADgHAAQgPAAgGgJg");
	this.shape_124.setTransform(-204.2,-55.95);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_125.setTransform(-220.125,-54.675);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgTAPgLQAPgLAaABIAVAAIAAgKQAAgMgHgGQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_126.setTransform(-233.125,-54.55);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_127.setTransform(-244.7,-57.175);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMgBAIgFQAIgEAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgQgIgKQgIgJgNAAQgMAAgJAKg");
	this.shape_128.setTransform(-257.575,-54.55);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AgKBUIAAiVIg2AAIAAgSICBAAIAAASIg2AAIAACVg");
	this.shape_129.setTransform(-270.925,-56.7);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAVAAIAAB8gAgIg/QgEgEAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQACAEAAAFQAAAFgCAEQgEADgGAAQgFAAgDgDg");
	this.shape_130.setTransform(136.1,-97.075);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAABIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_131.setTransform(126.725,-94.8);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_132.setTransform(113.725,-94.675);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AgYA8QgMgGgGgKQgHgJAAgLIAWAAQAAALAIAGQAIAHAMgBQANAAAHgEQAHgFAAgJQAAgIgGgFQgHgFgPgEQgQgDgKgEQgJgFgFgGQgEgHAAgJQAAgQANgKQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgGgLAAQgLAAgHAFQgGAFAAAIQAAAIAGAEQAGAEAPADQAQAEAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgFg");
	this.shape_133.setTransform(101.175,-94.8);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgPQAHgPANgHQANgJAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABATAKALQALAMAOgBQAMAAAIgEQAIgFAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAKgCARIA+AAIAAgCQgBgQgIgJQgIgKgNABQgMAAgJAJg");
	this.shape_134.setTransform(89.025,-94.8);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("AgYA8QgMgGgGgKQgHgJAAgLIAWAAQAAALAIAGQAIAHAMgBQANAAAHgEQAHgFAAgJQAAgIgGgFQgHgFgPgEQgQgDgKgEQgJgFgFgGQgEgHAAgJQAAgQANgKQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgGgLAAQgLAAgHAFQgGAFAAAIQAAAIAGAEQAGAEAPADQAQAEAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgFg");
	this.shape_135.setTransform(76.525,-94.8);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_136.setTransform(57.675,-92.475);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_137.setTransform(44.825,-94.925);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAABIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_138.setTransform(31.825,-94.8);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("AglBXIgIgBIAAgRIAGAAQALAAAGgEQAGgFAEgLIAEgNIgsh7IAXAAIAeBdIAdhdIAXAAIgyCQQgLAfgZAAg");
	this.shape_139.setTransform(19.725,-92.275);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_140.setTransform(1.725,-94.925);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAABIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_141.setTransform(-11.275,-94.8);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("AAeA+IgehdIgdBdIgRAAIglh8IAVAAIAZBdIAdhdIAQAAIAeBfIAYhfIAWAAIglB8g");
	this.shape_142.setTransform(-26.575,-94.8);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgPQAHgPANgHQANgJAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABATAKALQALAMAOgBQAMAAAIgEQAIgFAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAKgCARIA+AAIAAgCQgBgQgIgJQgIgKgNABQgMAAgJAJg");
	this.shape_143.setTransform(-41.475,-94.8);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("AAcBZIAAhTQAAgNgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAIIAABZIgVAAIAAixIAVAAIAABEQAPgSAVAAQAoAAAAAsIAABTg");
	this.shape_144.setTransform(-54.375,-97.425);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_145.setTransform(-71.95,-97.425);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQAEAEAAAFQAAAFgEAEQgDADgGAAQgGAAgDgDg");
	this.shape_146.setTransform(-81.65,-97.075);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgPIAAhNIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAXAAIAAARIgXAAIAABNQAAAHAEAEQACAEAIgBIAKgBIAAARQgIADgJAAQgOAAgGgJg");
	this.shape_147.setTransform(-88.75,-96.2);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFFF").s().p("AgYA8QgMgGgGgKQgHgJAAgLIAWAAQAAALAIAGQAIAHAMgBQANAAAHgEQAHgFAAgJQAAgIgGgFQgHgFgPgEQgQgDgKgEQgJgFgFgGQgEgHAAgJQAAgQANgKQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgGgLAAQgLAAgHAFQgGAFAAAIQAAAIAGAEQAGAEAPADQAQAEAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgFg");
	this.shape_148.setTransform(-98.325,-94.8);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQAEAEAAAFQAAAFgEAEQgDADgGAAQgGAAgDgDg");
	this.shape_149.setTransform(-107.3,-97.075);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_150.setTransform(-113.625,-94.925);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgPQAHgPANgHQANgJAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABATAKALQALAMAOgBQAMAAAIgEQAIgFAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAKgCARIA+AAIAAgCQgBgQgIgJQgIgKgNABQgMAAgJAJg");
	this.shape_151.setTransform(-124.325,-94.8);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgPIAAhNIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAXAAIAAARIgXAAIAABNQAAAHADAEQADAEAIgBIAKgBIAAARQgJADgHAAQgPAAgGgJg");
	this.shape_152.setTransform(-134.9,-96.2);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_153.setTransform(-143.55,-97.425);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAABIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_154.setTransform(-156.825,-94.8);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_155.setTransform(-166.675,-94.925);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAABIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_156.setTransform(-177.775,-94.8);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_157.setTransform(-189.35,-97.425);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgPQAHgPANgHQANgJAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABATAKALQALAMAOgBQAMAAAIgEQAIgFAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAKgCARIA+AAIAAgCQgBgQgIgJQgIgKgNABQgMAAgJAJg");
	this.shape_158.setTransform(-208.075,-94.8);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_159.setTransform(-221.325,-92.475);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_160.setTransform(-234.225,-94.925);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAABIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_161.setTransform(-247.225,-94.8);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_162.setTransform(-257.075,-94.925);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FFFFFF").s().p("AgiBNQgPgKgJgSQgIgTgBgXIAAgLQAAgYAJgTQAIgTAQgJQAPgKATAAQAUAAAQAKQAPAJAIATQAJASAAAZIAAAKQAAAYgJATQgIASgPAKQgPAKgVAAQgTAAgPgKgAgggyQgMAQgBAcIAAAMQAAAcANARQAMARAUAAQAWAAALgQQAMgQABgdIAAgLQAAgfgMgPQgMgRgWABQgUgBgMARg");
	this.shape_163.setTransform(-269.875,-96.95);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_164.setTransform(394.25,-137.625);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgLAaAAIAVAAIAAgJQAAgLgHgHQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_165.setTransform(380.975,-135);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAXAAIAAAQIgXAAIAABMQAAAIADAEQADAEAIAAIAKgBIAAAQQgJADgIAAQgOAAgGgJg");
	this.shape_166.setTransform(370.35,-136.4);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FFFFFF").s().p("AgoAvQgQgRAAgdIAAgBQAAgSAIgPQAGgPAOgIQAMgIAQAAQAZAAAQASQAQASAAAcIAAACQAAASgHAOQgHAOgNAJQgNAIgRAAQgZAAgPgSgAgZghQgKAMAAAXQAAAUAKANQAKANAPAAQAQgBAKgNQAJgMAAgWQABgVgLgMQgJgNgQgBQgPABgKANg");
	this.shape_167.setTransform(360.15,-135);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_168.setTransform(348.25,-137.625);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_169.setTransform(323.675,-134.875);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FFFFFF").s().p("AgXBsIAAgRIAKACQAHgBAEgEQADgDAAgKIAAiLIAVAAIAACLQAAAjggABQgHgBgGgCgAAChZQgDgDAAgFQAAgGADgDQADgDAGgBQAGABADADQAEADAAAGQAAAFgEADQgDAEgGAAQgGAAgDgEg");
	this.shape_170.setTransform(313.125,-134.75);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_171.setTransform(304.975,-134.875);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_172.setTransform(291.975,-135.125);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgbIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMAAAIgGQAIgEAFgHIANAJQgPAZggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgIgNgBQgMAAgJAKg");
	this.shape_173.setTransform(279.425,-135);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_174.setTransform(262.725,-135.125);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgLAaAAIAVAAIAAgJQAAgLgHgHQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_175.setTransform(234.625,-135);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#FFFFFF").s().p("AgmBIQgOgSAAgcIAAgCQAAgcAOgSQANgRAXAAQAVAAAMAPIAAhBIAWAAIAACwIgUAAIgBgNQgNAQgWAAQgVAAgOgSgAgWgIQgIALAAAYQAAAUAIAMQAJANAPAAQAUAAAJgSIAAg5QgJgSgUAAQgPAAgJANg");
	this.shape_176.setTransform(221.175,-137.5);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAVAAIAAB8gAgJg/QgDgEAAgFQAAgFADgEQAEgDAFAAQAGAAAEADQADAEAAAFQAAAFgDAEQgEADgGAAQgFAAgEgDg");
	this.shape_177.setTransform(211.95,-137.275);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_178.setTransform(206.125,-137.625);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgbIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMAAAIgGQAIgEAFgHIANAJQgPAZggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgIgNgBQgMAAgJAKg");
	this.shape_179.setTransform(197.175,-135);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_180.setTransform(184.325,-135.125);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_181.setTransform(171.275,-135.125);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#FFFFFF").s().p("AAzBUIgQgsIhFAAIgQAsIgXAAIBAinIATAAIBACngAgcAWIA5AAIgdhOg");
	this.shape_182.setTransform(157.125,-137.15);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_183.setTransform(127.825,-135.125);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_184.setTransform(110.875,-134.875);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_185.setTransform(101.525,-137.625);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAVAAIAAB8gAgJg/QgDgEAAgFQAAgFADgEQAEgDAFAAQAGAAADADQAEAEAAAFQAAAFgEAEQgDADgGAAQgFAAgEgDg");
	this.shape_186.setTransform(95.75,-137.275);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#FFFFFF").s().p("AgzBUIAAinIBnAAIAAASIhRAAIAAA6IBGAAIAAARIhGAAIAABKg");
	this.shape_187.setTransform(86.875,-137.15);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgVAAIAAixIAVAAIAABrIAMgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_188.setTransform(63.3,-137.625);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQADAEAAAFQAAAFgDAEQgDADgGAAQgGAAgDgDg");
	this.shape_189.setTransform(53.6,-137.275);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIAEAEQADAEAHAAIAKgBIAAAQQgIADgJAAQgNAAgHgJg");
	this.shape_190.setTransform(46.5,-136.4);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgKQgHgJAAgLIAWAAQAAALAIAGQAIAGAMABQANAAAHgGQAHgFAAgHQAAgKgGgEQgHgFgPgEQgQgDgKgEQgJgEgFgIQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgJgHgGQgIgGgLgBQgLABgHAFQgGAFAAAIQAAAIAGAEQAGADAPAEQAQAEAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgGg");
	this.shape_191.setTransform(36.875,-135);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgIg/QgDgEAAgFQAAgFADgEQACgDAGAAQAGAAADADQADAEAAAFQAAAFgDAEQgDADgGAAQgGAAgCgDg");
	this.shape_192.setTransform(27.95,-137.275);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_193.setTransform(21.625,-135.125);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgbIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMAAAIgGQAIgEAFgHIANAJQgPAZggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgIgNgBQgMAAgJAKg");
	this.shape_194.setTransform(10.925,-135);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAXAAIAAAQIgXAAIAABMQAAAIAEAEQACAEAIAAIAKgBIAAAQQgIADgJAAQgOAAgGgJg");
	this.shape_195.setTransform(0.35,-136.4);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgVAAIAAixIAVAAIAABrIALgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_196.setTransform(-8.3,-137.625);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgLAaAAIAVAAIAAgJQAAgLgHgHQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_197.setTransform(-21.575,-135);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_198.setTransform(-31.425,-135.125);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgLAaAAIAVAAIAAgJQAAgLgHgHQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_199.setTransform(-42.525,-135);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#FFFFFF").s().p("AAmBUIg6hOIgWAVIAAA5IgVAAIAAinIAVAAIAABTIBLhTIAbAAIhCBKIBGBdg");
	this.shape_200.setTransform(-55.3,-137.15);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_201.setTransform(-81.825,-132.675);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_202.setTransform(-94.725,-135.125);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQAEAEAAAFQAAAFgEAEQgDADgGAAQgGAAgDgDg");
	this.shape_203.setTransform(-104.15,-137.275);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_204.setTransform(-113.525,-135.125);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_205.setTransform(-126.575,-134.875);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#FFFFFF").s().p("AAmBUIg6hOIgWAVIAAA5IgVAAIAAinIAVAAIAABTIBLhTIAbAAIhCBKIBGBdg");
	this.shape_206.setTransform(-139.45,-137.15);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_207.setTransform(-164.25,-137.625);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgLAaAAIAVAAIAAgJQAAgLgHgHQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_208.setTransform(-177.525,-135);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIADAEQAEAEAHAAIAKgBIAAAQQgJADgHAAQgOAAgHgJg");
	this.shape_209.setTransform(-188.15,-136.4);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#FFFFFF").s().p("AgoAvQgQgRAAgdIAAgBQAAgSAHgPQAIgPAMgIQANgIAQAAQAZAAAQASQAQASAAAcIAAACQAAASgHAOQgHAOgNAJQgNAIgRAAQgZAAgPgSgAgZghQgJAMAAAXQAAAUAJANQAKANAPAAQAQgBAKgNQAKgMAAgWQAAgVgLgMQgJgNgQgBQgPABgKANg");
	this.shape_210.setTransform(-198.35,-135);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_211.setTransform(-210.25,-137.625);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_212.setTransform(-235.175,-132.675);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgLAaAAIAVAAIAAgJQAAgLgHgHQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_213.setTransform(-248.025,-135);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_214.setTransform(-257.875,-135.125);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#FFFFFF").s().p("Ag8BUIAAinIAwAAQAVAAARAJQAQAKAKASQAJASAAAXIAAAKQAAAYgJASQgJASgRAJQgSAKgVAAgAgmBCIAYAAQAYAAAPgQQAOgQAAgeIAAgJQAAgcgNgQQgOgQgYAAIgaAAg");
	this.shape_215.setTransform(-269.975,-137.15);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgIgJQgKgJgUAAQgaAAgNAWIAACnIg/AAIAAjtIA7AAIACAcQAaggApAAQAnAAARAWQATAXABAsIAACYg");
	this.shape_216.setTransform(209.85,-222.4);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#FFFFFF").s().p("AgfCmIAAjtIA/AAIAADtgAgZhtQgKgJAAgOQAAgPAKgJQAJgJAQAAQAQAAAKAJQAJAJAAAPQAAAOgJAJQgKAKgQAAQgPAAgKgKg");
	this.shape_217.setTransform(191.3,-226.875);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#FFFFFF").s().p("AhSBnQgWgUAAgfQAAgmAcgTQAbgUA1AAIAcAAIAAgOQAAgQgIgKQgIgKgSAAQgPAAgKAHQgJAIAAAOIhAAAQAAgVAOgSQAMgRAYgKQAWgKAdAAQArAAAaAWQAaAWAAAoIAABmQABAiAIARIAAAEIhAAAQgEgJgCgNQgXAagkAAQgiAAgYgUgAgpAsIAAADQAAAMAIAIQAJAIAOAAQANAAAMgHQAMgGAFgKIAAgpIgXAAQgvAAgDAhg");
	this.shape_218.setTransform(173.25,-222.175);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#FFFFFF").s().p("ABqB5IAAiXQAAgTgHgKQgIgJgUAAQgdAAgLAbIAACiIg+AAIAAiXQAAgUgIgJQgIgJgUAAQgbAAgMAWIAACnIg/AAIAAjtIA7AAIACAbQAZgfArAAQAtAAARAkQAZgkAvAAQAmAAATAWQATAXAAAtIAACXg");
	this.shape_219.setTransform(141.775,-222.4);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#FFFFFF").s().p("AhCB5IAAjtIA8AAIACAdQARghAjAAQAKAAAJADIAAA9QgNgCgLAAQgkAAgJAZIAACag");
	this.shape_220.setTransform(115,-222.4);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#FFFFFF").s().p("AhKBbQghggAAg1IAAgGQAAgjAOgcQAOgdAZgPQAZgPAgAAQAxAAAcAfQAcAeAAA5IAAAZIiXAAQADAXAQAOQAPAOAXAAQAlAAAUgbIAgAjQgPAVgYALQgYALgeAAQgzAAghgggAgbg6QgMANgDAXIBXAAIAAgFQAAgVgLgLQgLgMgUAAQgSAAgMANg");
	this.shape_221.setTransform(93.975,-222.175);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#FFFFFF").s().p("Ah2CgIAAk/IBwAAQA5AAAfAWQAeAXAAArQAAAXgMASQgNASgVAIQAZAFAOATQAOATAAAbQAAAugeAYQgdAXg2ABgAg0BrIA4AAQAXAAANgLQANgLAAgUQAAgsgtAAIg8AAgAg0gZIAxAAQAxgBAAgnQAAgVgNgKQgNgKgaAAIguAAg");
	this.shape_222.setTransform(67.525,-226.275);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#FFFFFF").s().p("AAlCoIg8hfIgXAXIAABIIg/AAIAAlPIA/AAIAAC5IANgPIA8hHIBLAAIhVBiIBdCKg");
	this.shape_223.setTransform(31.15,-227.15);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#FFFFFF").s().p("AhRBjQgUgWgBgrIAAiaIBAAAIAACYQAAAmAhgBQAgAAAMgVIAAioIBAAAIAADsIg8AAIgCgXQgXAcgpAAQgmAAgUgWg");
	this.shape_224.setTransform(5.05,-221.95);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#FFFFFF").s().p("Ag4DSIAAgyQALACAIAAQAdAAAAgfIAAj6IA/AAIAAD6QAAAngVAWQgUAWgnAAQgQAAgPgEgAgDidQgJgJAAgOQAAgPAJgJQAJgJAQAAQAQAAAKAJQAKAJAAAPQAAAOgKAJQgKAKgQAAQgQAAgJgKg");
	this.shape_225.setTransform(-15.6,-222.075);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgJgJQgIgJgVAAQgZAAgOAWIAACnIg/AAIAAjtIA7AAIACAcQAaggApAAQAnAAARAWQATAXAAAsIAACYg");
	this.shape_226.setTransform(-31.9,-222.4);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#FFFFFF").s().p("AhRBjQgUgWAAgrIAAiaIA/AAIAACYQAAAmAhgBQAgAAAMgVIAAioIA/AAIAADsIg7AAIgCgXQgYAcgoAAQgmAAgUgWg");
	this.shape_227.setTransform(-57.1,-221.95);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#FFFFFF").s().p("AgjBTIAAh/IgjAAIAAgvIAjAAIAAg6IA/AAIAAA6IAoAAIAAAvIgoAAIAAB1QAAANAFAGQAFAGAOAAQAKAAAJgCIAAAwQgTAGgUAAQhCAAgBhDg");
	this.shape_228.setTransform(-77.525,-224.875);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#FFFFFF").s().p("AhKBbQghggAAg1IAAgGQAAgjAOgcQAOgdAZgPQAZgPAgAAQAxAAAcAfQAcAeAAA5IAAAZIiXAAQADAXAQAOQAPAOAXAAQAlAAAUgbIAgAjQgPAVgYALQgYALgeAAQgzAAghgggAgbg6QgMANgDAXIBXAAIAAgFQAAgVgLgLQgLgMgUAAQgSAAgMANg");
	this.shape_229.setTransform(-96.675,-222.175);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#FFFFFF").s().p("Ah5CgIAAk/IB7AAQAlAAAbANQAbANAOAZQAPAYAAAfQABAvghAaQggAbg5AAIg5AAIAABxgAg4gFIA6AAQAbAAANgNQAOgMAAgXQAAgXgOgPQgOgOgYgBIg8AAg");
	this.shape_230.setTransform(-122.95,-226.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.instance},{t:this.text},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).to({state:[]},1).wait(12));

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
(lib.game6 = function(mode,startPosition,loop) {
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
		  window.location.replace("../game7/index.html");
		});
		
		root.btnBack3.on("click", function () {
		  window.location.replace("../game5/index.html");
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
		
		root.pp5.gotoAndStop(0);
		
		root.slots.saraf.on("click", function () {
		  root.pp5.gotoAndPlay(0);
		});
		
		root.pp4.gotoAndStop(0);
		
		root.slots.nafas.on("click", function () {
		  root.pp4.gotoAndPlay(0);
		});
		
		root.pp3.gotoAndStop(0);
		
		root.slots.darah.on("click", function () {
		  root.pp3.gotoAndPlay(0);
		});
		
		root.pp2.gotoAndStop(0);
		
		root.slots.ekskresi.on("click", function () {
		  root.pp2.gotoAndPlay(0);
		});
		
		root.pp1.gotoAndStop(0);
		
		root.slots.cerna.on("click", function () {
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

	// pp5
	this.pp5 = new lib.pp6();
	this.pp5.name = "pp5";
	this.pp5.setTransform(480.35,287.5,1,1,0,0,0,42,-26);

	this.timeline.addTween(cjs.Tween.get(this.pp5).wait(1));

	// pp4
	this.pp4 = new lib.pp5();
	this.pp4.name = "pp4";
	this.pp4.setTransform(480.35,287.5,1,1,0,0,0,42,-26);

	this.timeline.addTween(cjs.Tween.get(this.pp4).wait(1));

	// pp3
	this.pp3 = new lib.pp3();
	this.pp3.name = "pp3";
	this.pp3.setTransform(480.35,287.5,1,1,0,0,0,42,-26);

	this.timeline.addTween(cjs.Tween.get(this.pp3).wait(1));

	// pp2
	this.pp2 = new lib.pp2();
	this.pp2.name = "pp2";
	this.pp2.setTransform(480.35,287.5,1,1,0,0,0,42,-26);

	this.timeline.addTween(cjs.Tween.get(this.pp2).wait(1));

	// pp1
	this.pp1 = new lib.pp4();
	this.pp1.name = "pp1";
	this.pp1.setTransform(480.35,287.5,1,1,0,0,0,42,-26);

	this.timeline.addTween(cjs.Tween.get(this.pp1).wait(1));

	// popUpInfo
	this.popUpInfo = new lib.popUpInfo();
	this.popUpInfo.name = "popUpInfo";
	this.popUpInfo.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.popUpInfo).wait(1));

	// base
	this.instance = new lib.info();
	this.instance.setTransform(360.85,359.25);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgdAqQgJgIAAgNQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAFAAAGIgQAAQAAgHAFgHQAFgHAJgDQAIgEAKgBQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgHgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape.setTransform(839.675,230.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgcA3QgLgOAAgWIAAgBQAAgUAKgOQALgOARAAQAPAAAKAMIAAgyIAQAAIAACGIgPAAIAAgKQgKAMgRAAQgQAAgKgNgAgQgHQgHAJAAASQAAAQAHAKQAGAJALAAQAQgBAHgOIAAgqQgIgNgPAAQgLgBgGAJg");
	this.shape_1.setTransform(829.5,228.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_2.setTransform(822.5,228.625);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_3.setTransform(818.125,228.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgbAkQgMgMAAgWIAAgCQAAgNAFgMQAFgLAKgGQAKgHAKAAQATAAAKANQALAMAAAXIAAAFIhAAAQABAOAHAJQAIAJALAAQAJAAAFgDQAHgEAEgGIAKAIQgMASgXAAQgTAAgMgNgAgOgcQgHAIgBAMIAuAAIAAgBQAAgMgHgHQgFgHgLAAQgJAAgGAHg");
	this.shape_4.setTransform(811.25,230.35);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgKgFgEQgEgGgKABQgHgBgGAEQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAAMQALgPARAAQAeABAAAhIAAA+g");
	this.shape_5.setTransform(801.425,230.25);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgKgFgEQgEgGgKABQgHgBgGAEQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAAMQALgPARAAQAeABAAAhIAAA+g");
	this.shape_6.setTransform(791.475,230.25);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAnBAIgMghIg1AAIgMAhIgRAAIAxh/IANAAIAxB/gAgVAQIArAAIgWg6g");
	this.shape_7.setTransform(780.625,228.7);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAzAwIAAg+QAAgKgFgEQgFgGgLABQgJAAgGAFQgGAGgBAIIAAA+IgPAAIAAg9QAAgVgUABQgQAAgGANIAABEIgRAAIAAhdIAQAAIAAAKQALgNASAAQATABAHAPQAEgHAIgEQAIgFAKAAQAfAAABAiIAAA+g");
	this.shape_8.setTransform(762.375,230.25);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgRIAAg9IAPAAIAAA8QAAAWASAAQASgBAGgOIAAhDIAQAAIAABdIgPAAIgBgJQgJAMgSgBQgPAAgHgJg");
	this.shape_9.setTransform(749.55,230.45);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_10.setTransform(742.425,228.35);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAEAAADADQADACAAAEQAAAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_11.setTransform(738.1,228.625);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgmBAIAAh/IBOAAIAAAOIg+AAIAAAsIA1AAIAAAMIg1AAIAAA5g");
	this.shape_12.setTransform(731.4,228.7);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_13.setTransform(717.575,228.35);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQADACgBAEQABAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_14.setTransform(710.25,228.625);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgMIAAg5IgRAAIAAgNIARAAIAAgXIAQAAIAAAXIARAAIAAANIgRAAIAAA5QAAAGACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_15.setTransform(704.825,229.3);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgGQAAgGgEgEQgGgDgLgDQgMgDgHgDQgIgDgDgFQgEgFAAgHQAAgMAKgJQAKgHAPgBQAQAAAKAJQAKAJAAANIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAIQgKAHgQAAQgKABgJgFg");
	this.shape_16.setTransform(697.475,230.35);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgDgDABgEQgBgEADgCQACgDAEAAQAFAAACADQACACAAAEQAAAEgCADQgCADgFAAQgEAAgCgDg");
	this.shape_17.setTransform(690.7,228.625);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgWAwIAAhdIAPAAIABALQAHgOAPAAQAEAAADACIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_18.setTransform(685.95,230.25);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgbAkQgNgMAAgWIAAgCQABgNAFgMQAFgLAKgGQAKgHAKAAQATAAAKANQAKAMAAAXIAAAFIg/AAQABAOAHAJQAIAJALAAQAJAAAGgDQAGgEAEgGIAKAIQgMASgXAAQgTAAgMgNgAgOgcQgHAIgBAMIAuAAIAAgBQAAgMgHgHQgFgHgLAAQgJAAgGAHg");
	this.shape_19.setTransform(677.7,230.35);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgMIAAg5IgRAAIAAgNIARAAIAAgXIAQAAIAAAXIARAAIAAANIgRAAIAAA5QAAAGACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_20.setTransform(669.625,229.3);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_21.setTransform(663.025,228.35);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgdAqQgJgIAAgNQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAFAAAGIgQAAQAAgHAFgHQAFgHAJgDQAIgEAKgBQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgHgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_22.setTransform(652.925,230.35);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgWAwIAAhdIAQAAIAAALQAHgOAOAAQAGAAACACIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_23.setTransform(645.5,230.25);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgdAqQgJgIAAgNQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKAAQgIAAgGAEQgGAFAAAGIgQAAQAAgHAFgHQAFgHAJgDQAIgEAKgBQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgHgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_24.setTransform(637.025,230.35);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AAdBAIgsg8IgQARIAAArIgRAAIAAh/IARAAIAAA/IA3g/IAVAAIgxA5IA1BGg");
	this.shape_25.setTransform(627.3,228.7);

	this.instance_1 = new lib.geser();
	this.instance_1.setTransform(535.6,353.9);

	this.instance_2 = new lib.teksPengerjaan();
	this.instance_2.setTransform(328.4,168.1);

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

	this.pieces = new lib.Pieces5();
	this.pieces.name = "pieces";

	this.slots = new lib.Slots5();
	this.slots.name = "slots";

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

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgDgDABgEQgBgEADgCQACgDAEAAQAFAAACADQACACABAEQgBAEgCADQgCADgFAAQgEAAgCgDg");
	this.shape_26.setTransform(538.95,115.125);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_27.setTransform(531.825,116.85);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgdAnQgHgIgBgSIAAg8IAQAAIAAA8QABAVARABQASgBAGgOIAAhDIARAAIAABdIgQAAIAAgJQgKALgRAAQgPAAgJgJg");
	this.shape_28.setTransform(522,116.95);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgDAAgHQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgEgDgEQgEgGAAgHQAAgLAKgJQAKgHAPgBQAQAAAKAJQAKAIAAAOIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAHQgKAIgQAAQgKABgJgFg");
	this.shape_29.setTransform(512.375,116.85);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgbAlQgNgNAAgWIAAgCQAAgNAGgMQAFgLAKgGQAKgHAKAAQATAAAKANQALAMgBAXIAAAFIg/AAQAAAOAIAKQAIAIALAAQAJAAAFgEQAGgDAFgGIAKAIQgMASgYAAQgSAAgMgMgAgPgcQgGAIgCANIAvAAIAAgCQgBgMgFgHQgHgHgKAAQgIAAgIAHg");
	this.shape_30.setTransform(503.05,116.85);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgDAAgHQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgEgDgEQgEgGAAgHQAAgLAKgJQAKgHAPgBQAQAAAKAJQAKAIAAAOIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAHQgKAIgQAAQgKABgJgFg");
	this.shape_31.setTransform(493.525,116.85);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_32.setTransform(479.225,118.625);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgKgFgFQgEgEgKAAQgHAAgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAAMQALgPARAAQAeABAAAhIAAA+g");
	this.shape_33.setTransform(469.375,116.75);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_34.setTransform(459.475,116.85);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgcBCIgGgBIAAgNIAEAAQAJAAAEgDQAFgDADgJIAEgKIgihdIARAAIAXBGIAWhGIASAAIgnBtQgIAYgTAAg");
	this.shape_35.setTransform(450.35,118.775);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgKgFgFQgEgEgKAAQgHAAgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAAMQALgPARAAQAeABAAAhIAAA+g");
	this.shape_36.setTransform(436.675,116.75);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_37.setTransform(426.775,116.85);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AAWAvIgWhHIgWBHIgNAAIgbhdIAPAAIATBFIAWhFIAMAAIAXBHIAThHIAQAAIgcBdg");
	this.shape_38.setTransform(415.1,116.85);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgbAlQgNgNABgWIAAgCQAAgNAFgMQAGgLAJgGQAKgHAKAAQATAAAKANQAKAMAAAXIAAAFIg/AAQABAOAHAKQAIAIALAAQAJAAAGgEQAGgDAEgGIAKAIQgMASgXAAQgTAAgMgMgAgOgcQgHAIgBANIAuAAIAAgCQAAgMgHgHQgFgHgLAAQgJAAgGAHg");
	this.shape_39.setTransform(403.65,116.85);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AAVBDIAAg/QAAgJgFgFQgEgEgKAAQgHAAgGADQgGAFgDAGIAABDIgQAAIAAiGIAQAAIAAA0QALgOAQAAQAeABAAAgIAAA/g");
	this.shape_40.setTransform(393.875,114.85);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AAzAxIAAg+QAAgLgFgFQgFgEgLgBQgJAAgGAGQgGAFgBAKIAAA+IgPAAIAAg+QAAgUgUgBQgQAAgGAOIAABFIgRAAIAAhfIAQAAIAAALQALgMASAAQATAAAHAPQAEgHAIgEQAIgEAKAAQAfAAABAhIAAA/g");
	this.shape_41.setTransform(730.625,91.15);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgcAoQgJgKABgRIAAg9IAQAAIAAA9QgBAVATAAQARAAAGgNIAAhFIAQAAIAABfIgPAAIgBgKQgJAMgSAAQgPAAgHgJg");
	this.shape_42.setTransform(717.8,91.35);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgHBEIAAiGIAPAAIAACGg");
	this.shape_43.setTransform(710.675,89.25);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgDgDABgEQgBgEADgCQACgDAEAAQAFAAACADQACACABAEQgBAEgCADQgCADgFAAQgEAAgCgDg");
	this.shape_44.setTransform(706.35,89.525);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgNBFIAAhSIgPAAIAAgNIAPAAIAAgKQAAgOAIgJQAHgJAPAAIAMACIgBANIgJgBQgIABgEAEQgFAEAAAJIAAAKIAVAAIAAANIgVAAIAABSg");
	this.shape_45.setTransform(701.375,89.15);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_46.setTransform(689.575,89.25);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQADACgBAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_47.setTransform(682.25,89.525);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_48.setTransform(676.825,90.2);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAIQgKAIgQAAQgKgBgJgEg");
	this.shape_49.setTransform(669.475,91.25);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgDgDABgEQgBgEADgCQACgDAEAAQAFAAACADQACACABAEQgBAEgCADQgCADgFAAQgEAAgCgDg");
	this.shape_50.setTransform(662.7,89.525);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAPAAIABALQAHgNAPABQAEgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_51.setTransform(657.95,91.15);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgbAkQgMgMAAgVIAAgDQAAgOAFgKQAFgMAKgGQAKgGAKAAQATAAAKAMQALAMAAAXIAAAGIhAAAQABAOAHAIQAIAJALAAQAJAAAFgDQAHgEAEgGIAKAIQgMATgXAAQgTgBgMgNgAgOgcQgHAHgBANIAuAAIAAgBQgBgNgGgGQgFgHgLAAQgJAAgGAHg");
	this.shape_52.setTransform(649.7,91.25);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_53.setTransform(641.625,90.2);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_54.setTransform(635.025,89.25);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_55.setTransform(624.925,91.25);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAQAAIAAALQAHgNAOABQAFgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_56.setTransform(617.5,91.15);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_57.setTransform(609.025,91.25);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_58.setTransform(600.225,89.25);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAQAAIAAALQAHgNAOABQAFgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_59.setTransform(588.05,91.15);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_60.setTransform(579.575,91.25);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_61.setTransform(571.475,90.2);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgNBFIAAhSIgPAAIAAgNIAPAAIAAgKQAAgOAIgJQAHgJAPAAIAMACIgBANIgJgBQgIABgEAEQgFAEAAAJIAAAKIAVAAIAAANIgVAAIAABSg");
	this.shape_62.setTransform(566.025,89.15);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_63.setTransform(557.675,91.25);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgcA2QgLgNAAgWIAAgBQAAgVAKgNQAKgNASAAQAPAAAKALIAAgxIAQAAIAACGIgPAAIAAgKQgLALgQABQgRgBgJgOgAgQgHQgHAJAAASQAAAQAHAJQAHAJAKAAQAQAAAHgNIAAgrQgIgOgPAAQgKABgHAIg");
	this.shape_64.setTransform(547.5,89.35);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_65.setTransform(533.225,91.15);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_66.setTransform(523.325,91.25);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_67.setTransform(513.225,93.025);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_68.setTransform(503.375,91.15);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgbAkQgNgMABgVIAAgDQgBgOAGgKQAGgMAJgGQAKgGAKAAQATAAAKAMQALAMAAAXIAAAGIhAAAQAAAOAIAIQAIAJALAAQAJAAAFgDQAGgEAFgGIAKAIQgMATgYAAQgSgBgMgNgAgPgcQgGAHgCANIAvAAIAAgBQgBgNgGgGQgGgHgKAAQgIAAgIAHg");
	this.shape_69.setTransform(493.7,91.25);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgcA2QgLgNAAgWIAAgBQAAgVAKgNQALgNAQAAQAQAAAKALIAAgxIAQAAIAACGIgPAAIgBgKQgJALgRABQgQgBgKgOgAgQgHQgHAJAAASQAAAQAHAJQAGAJALAAQAQAAAHgNIAAgrQgHgOgQAAQgKABgHAIg");
	this.shape_70.setTransform(483.55,89.35);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_71.setTransform(469.275,91.15);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_72.setTransform(459.375,91.25);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AAWAwIgWhHIgWBHIgNAAIgbhfIAQAAIASBGIAWhGIANAAIAWBIIAShIIAQAAIgbBfg");
	this.shape_73.setTransform(447.7,91.25);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgbAkQgNgMAAgVIAAgDQABgOAFgKQAGgMAJgGQAKgGAKAAQATAAAKAMQAKAMAAAXIAAAGIg/AAQABAOAHAIQAIAJALAAQAJAAAGgDQAFgEAFgGIAKAIQgMATgYAAQgSgBgMgNgAgPgcQgGAHgCANIAvAAIAAgBQgBgNgFgGQgHgHgKAAQgJAAgHAHg");
	this.shape_74.setTransform(436.25,91.25);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AAVBEIAAg/QAAgKgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAiGIAQAAIAAAzQALgNAQAAQAegBAAAiIAAA/g");
	this.shape_75.setTransform(426.475,89.25);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_76.setTransform(413.125,89.25);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_77.setTransform(405.8,89.525);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_78.setTransform(400.375,90.2);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAIQgKAIgQAAQgKgBgJgEg");
	this.shape_79.setTransform(393.025,91.25);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQADACgBAEQABAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_80.setTransform(386.25,89.525);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAQAAIAAALQAHgNAOABQAFgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_81.setTransform(381.5,91.15);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgbAkQgNgMAAgVIAAgDQABgOAFgKQAGgMAJgGQAKgGAKAAQATAAAKAMQAKAMAAAXIAAAGIg/AAQABAOAHAIQAIAJALAAQAJAAAGgDQAFgEAFgGIAKAIQgMATgYAAQgSgBgMgNgAgPgcQgGAHgCANIAvAAIAAgBQgBgNgFgGQgHgHgKAAQgJAAgHAHg");
	this.shape_82.setTransform(373.25,91.25);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_83.setTransform(365.175,90.2);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_84.setTransform(358.575,89.25);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_85.setTransform(348.475,91.25);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAPAAIABALQAHgNAPABQAFgBACACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_86.setTransform(341.05,91.15);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_87.setTransform(332.575,91.25);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_88.setTransform(323.775,89.25);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAQAAIAAALQAHgNAOABQAGgBACACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_89.setTransform(311.6,91.15);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_90.setTransform(303.125,91.25);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_91.setTransform(295.025,90.2);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AgNBFIAAhSIgPAAIAAgNIAPAAIAAgKQAAgOAIgJQAHgJAPAAIAMACIgBANIgJgBQgIABgEAEQgFAEAAAJIAAAKIAVAAIAAANIgVAAIAABSg");
	this.shape_92.setTransform(289.575,89.15);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_93.setTransform(281.225,91.25);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AgcA2QgLgNAAgWIAAgBQAAgVAKgNQALgNARAAQAPAAAKALIAAgxIAQAAIAACGIgPAAIAAgKQgKALgRABQgQgBgKgOgAgQgHQgHAJAAASQAAAQAHAJQAGAJALAAQAQAAAHgNIAAgrQgIgOgPAAQgLABgGAIg");
	this.shape_94.setTransform(271.05,89.35);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_95.setTransform(256.775,91.15);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_96.setTransform(246.875,91.25);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_97.setTransform(238.075,89.25);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AgeAkQgMgNAAgXIAAAAQAAgOAFgLQAGgLAKgGQAJgHAMABQATAAAMANQAMANAAAWIAAABQAAAOgFALQgFALgKAGQgKAGgNABQgSAAgMgOgAgTgaQgHAKAAARQAAAQAHAJQAIAKALAAQAMAAAIgKQAHgJAAgRQAAgPgHgKQgIgKgMAAQgLAAgIAJg");
	this.shape_98.setTransform(227.825,91.25);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AgbAkQgMgNAAgWIAAgCQAAgOAFgLQAFgKAKgGQAKgHALABQAQAAALAJQAKAKABAPIgPAAQgBgJgGgGQgGgGgKAAQgLAAgHAJQgGAJgBAQIAAADQABAQAGAJQAHAJALAAQAJAAAHgFQAGgGABgIIAPAAQAAAJgFAHQgGAIgIAEQgJAEgKABQgSgBgLgNg");
	this.shape_99.setTransform(218.1,91.25);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AgeAkQgMgNAAgXIAAAAQAAgOAFgLQAGgLAKgGQAJgHAMABQATAAAMANQAMANAAAWIAAABQAAAOgFALQgFALgKAGQgKAGgNABQgSAAgMgOgAgTgaQgHAKAAARQAAAQAHAJQAIAKALAAQAMAAAIgKQAHgJAAgRQAAgPgHgKQgIgKgMAAQgLAAgIAJg");
	this.shape_100.setTransform(208.225,91.25);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AgjAxQgNgQAAgbIAAgMQAAgRAGgOQAGgNAMgIQAMgHAOAAQAVAAAMALQAMAMACAUIgRAAQgCgPgHgHQgIgHgNAAQgPAAgJAMQgJAMAAAWIAAALQAAAVAIAMQAJANAPAAQAOAAAHgHQAIgGACgQIARAAQgCAUgNAMQgMALgVAAQgWAAgOgRg");
	this.shape_101.setTransform(197.425,89.625);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.bf(img.Bitmap2, null, new cjs.Matrix2D(1,0,0,1,-499,-300)).s().p("EhN9Au4MAAAhdvMCb7AAAMAAABdvg");
	this.shape_102.setTransform(471,261);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.btnNextDasar1},{t:this.btnMenuDasar1},{t:this.btnBack3},{t:this.winMessage},{t:this.slots},{t:this.pieces},{t:this.judulKI},{t:this.Score},{t:this.restart},{t:this.btnInfo},{t:this.instance_2},{t:this.instance_1},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(452,231,518,330);
// library properties:
lib.properties = {
	id: 'E740BB847DF4864B949C99CD86B71105',
	width: 960,
	height: 540,
	fps: 24,
	color: "#009999",
	opacity: 1.00,
	manifest: [
		{src:"images/Bitmap10.png", id:"Bitmap10"},
		{src:"images/Bitmap3.png", id:"Bitmap3"},
		{src:"images/Bitmap86.png", id:"Bitmap86"},
		{src:"images/bookpngcopy.png", id:"bookpngcopy"},
		{src:"images/Bitmap2.png", id:"Bitmap2"},
		{src:"images/Bitmap84.png", id:"Bitmap84"},
		{src:"images/Bitmap83.png", id:"Bitmap83"},
		{src:"images/Bitmap87.png", id:"Bitmap87"}
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