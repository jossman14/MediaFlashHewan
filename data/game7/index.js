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



(lib._10 = function() {
	this.initialize(img._10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,400,265);


(lib._16 = function() {
	this.initialize(img._16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,320,292);


(lib._25 = function() {
	this.initialize(img._25);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,415,342);


(lib._30 = function() {
	this.initialize(img._30);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,599,340);


(lib.Bitmap3 = function() {
	this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,249,87);


(lib.Bitmap92 = function() {
	this.initialize(img.Bitmap92);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,170,155);


(lib.Bitmap95 = function() {
	this.initialize(img.Bitmap95);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,170,155);


(lib.bookpngcopy = function() {
	this.initialize(img.bookpngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,399);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);


(lib._33 = function() {
	this.initialize(img._33);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,595,340);// helper functions:

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
	this.shape.graphics.f("#FFFFFF").s().p("AgGAyIAAhJIANAAIAABJgAgFglQgCgCAAgDQAAgDACgDQADgCACAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgCAAgDgCg");
	this.shape.setTransform(91.85,-0.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIAMAAIAAAIQAGgKALAAIAGABIAAAMIgHAAQgLAAgFAKIAAA0g");
	this.shape_1.setTransform(88.15,1.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_2.setTransform(81.775,1.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKQgFACgFAAQgIAAgDgGg");
	this.shape_3.setTransform(75.525,0.375);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgWAgQgIgGAAgJQAAgMAJgFQAJgHAPAAIAMAAIAAgGQAAgGgDgEQgFgEgHAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgFAHgDQAGgDAHAAQANgBAIAHQAGAGABALIAAAhQAAALADAGIAAABIgOAAIgCgIQgJAJgKAAQgMAAgGgGgAgRAOQAAAHAEADQAEADAGABQAFAAAFgDQAGgEACgEIAAgQIgKAAQgWAAAAANg");
	this.shape_4.setTransform(69.65,1.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_5.setTransform(59.725,1.125);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAQA0IgZghIgIAIIAAAZIgNAAIAAhnIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgAqg");
	this.shape_6.setTransform(47.075,-0.35);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIAMAAIAAAvQAAARAOAAQAOAAAFgLIAAg1IAMAAIAABJIgMAAIAAgHQgIAJgNAAQgMAAgGgHg");
	this.shape_7.setTransform(39.2,1.275);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKQgFACgFAAQgIAAgDgGg");
	this.shape_8.setTransform(32.875,0.375);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQABgIgEgEQgDgEgIAAQgFAAgFADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_9.setTransform(26.9,1.125);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIAMAAIAAAvQAAARAOAAQANAAAGgLIAAg1IAMAAIAABJIgMAAIAAgHQgIAJgNAAQgMAAgGgHg");
	this.shape_10.setTransform(19.2,1.275);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_11.setTransform(7.825,2.575);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQAAgIgDgEQgEgEgHAAQgGAAgEADQgEAEgEAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_12.setTransform(0.15,1.125);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgFAyIAAhJIALAAIAABJgAgEglQgCgCAAgDQAAgDACgDQACgCACAAQAEAAABACQACADAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_13.setTransform(-5.4,-0.15);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQAAgIgDgEQgDgEgIAAQgFAAgFADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_14.setTransform(-11,1.125);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIANAAIAAAvQAAARANAAQANAAAGgLIAAg1IAMAAIAABJIgMAAIAAgHQgIAJgNAAQgMAAgGgHg");
	this.shape_15.setTransform(-18.7,1.275);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAQA0IgZghIgIAIIAAAZIgNAAIAAhnIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgAqg");
	this.shape_16.setTransform(-25.625,-0.35);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AAQA0IgZghIgIAIIAAAZIgNAAIAAhnIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgAqg");
	this.shape_17.setTransform(-36.175,-0.35);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgXAgQgHgGAAgJQABgMAIgFQAJgHAPAAIAMAAIAAgGQAAgGgDgEQgEgEgIAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgFAGgDQAIgDAHAAQAMgBAIAHQAGAGABALIAAAhQAAALACAGIAAABIgNAAIgCgIQgIAJgMAAQgKAAgIgGgAgRAOQAAAHAEADQAEADAGABQAFAAAFgDQAGgEACgEIAAgQIgKAAQgWAAAAANg");
	this.shape_18.setTransform(-44,1.2);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKQgFACgFAAQgIAAgDgGg");
	this.shape_19.setTransform(-50.275,0.375);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgXAcQgKgKAAgSIAAAAQAAgKAFgJQAEgJAIgFQAHgEAJAAQAPgBAKALQAJALAAAQIAAABQAAAKgEAJQgEAJgIAFQgIAEgKAAQgOAAgJgKgAgOgTQgGAHAAANQAAAMAGAHQAGAIAIAAQAKAAAFgIQAGgHAAgNQAAgMgGgHQgFgIgKAAQgIAAgGAIg");
	this.shape_20.setTransform(-56.375,1.2);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAQA0IgZghIgIAIIAAAZIgNAAIAAhnIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgAqg");
	this.shape_21.setTransform(-63.425,-0.35);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAQA0IgZghIgIAIIAAAZIgNAAIAAhnIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgAqg");
	this.shape_22.setTransform(-73.975,-0.35);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgGAyIAAhJIANAAIAABJgAgFglQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_23.setTransform(-79.7,-0.15);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgGA0IAAhnIANAAIAABng");
	this.shape_24.setTransform(-83.1,-0.35);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AAWAyIgigvIgMANIAAAiIgNAAIAAhjIANAAIAAAxIArgxIAQAAIgmAsIApA3g");
	this.shape_25.setTransform(-88.625,-0.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-95.6,-10.4,191.3,20.8);


(lib.Tween11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgGAyIAAhJIANAAIAABJgAgFglQgCgCAAgDQAAgDACgDQADgCACAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgCAAgDgCg");
	this.shape.setTransform(91.85,-0.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIAMAAIAAAIQAGgKALAAIAGABIAAAMIgHAAQgLAAgFAKIAAA0g");
	this.shape_1.setTransform(88.15,1.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_2.setTransform(81.775,1.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKQgFACgFAAQgIAAgDgGg");
	this.shape_3.setTransform(75.525,0.375);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgWAgQgIgGAAgJQAAgMAJgFQAJgHAPAAIAMAAIAAgGQAAgGgDgEQgFgEgHAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgFAHgDQAGgDAHAAQANgBAIAHQAGAGABALIAAAhQAAALADAGIAAABIgOAAIgCgIQgJAJgKAAQgMAAgGgGgAgRAOQAAAHAEADQAEADAGABQAFAAAFgDQAGgEACgEIAAgQIgKAAQgWAAAAANg");
	this.shape_4.setTransform(69.65,1.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_5.setTransform(59.725,1.125);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAQA0IgZghIgIAIIAAAZIgNAAIAAhnIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgAqg");
	this.shape_6.setTransform(47.075,-0.35);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIAMAAIAAAvQAAARAOAAQAOAAAFgLIAAg1IAMAAIAABJIgMAAIAAgHQgIAJgNAAQgMAAgGgHg");
	this.shape_7.setTransform(39.2,1.275);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKQgFACgFAAQgIAAgDgGg");
	this.shape_8.setTransform(32.875,0.375);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQABgIgEgEQgDgEgIAAQgFAAgFADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_9.setTransform(26.9,1.125);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIAMAAIAAAvQAAARAOAAQANAAAGgLIAAg1IAMAAIAABJIgMAAIAAgHQgIAJgNAAQgMAAgGgHg");
	this.shape_10.setTransform(19.2,1.275);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_11.setTransform(7.825,2.575);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQAAgIgDgEQgEgEgHAAQgGAAgEADQgEAEgEAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_12.setTransform(0.15,1.125);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgFAyIAAhJIALAAIAABJgAgEglQgCgCAAgDQAAgDACgDQACgCACAAQAEAAABACQACADAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_13.setTransform(-5.4,-0.15);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQAAgIgDgEQgDgEgIAAQgFAAgFADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_14.setTransform(-11,1.125);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIANAAIAAAvQAAARANAAQANAAAGgLIAAg1IAMAAIAABJIgMAAIAAgHQgIAJgNAAQgMAAgGgHg");
	this.shape_15.setTransform(-18.7,1.275);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAQA0IgZghIgIAIIAAAZIgNAAIAAhnIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgAqg");
	this.shape_16.setTransform(-25.625,-0.35);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AAQA0IgZghIgIAIIAAAZIgNAAIAAhnIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgAqg");
	this.shape_17.setTransform(-36.175,-0.35);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgXAgQgHgGAAgJQABgMAIgFQAJgHAPAAIAMAAIAAgGQAAgGgDgEQgEgEgIAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgFAGgDQAIgDAHAAQAMgBAIAHQAGAGABALIAAAhQAAALACAGIAAABIgNAAIgCgIQgIAJgMAAQgKAAgIgGgAgRAOQAAAHAEADQAEADAGABQAFAAAFgDQAGgEACgEIAAgQIgKAAQgWAAAAANg");
	this.shape_18.setTransform(-44,1.2);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKQgFACgFAAQgIAAgDgGg");
	this.shape_19.setTransform(-50.275,0.375);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgXAcQgKgKAAgSIAAAAQAAgKAFgJQAEgJAIgFQAHgEAJAAQAPgBAKALQAJALAAAQIAAABQAAAKgEAJQgEAJgIAFQgIAEgKAAQgOAAgJgKgAgOgTQgGAHAAANQAAAMAGAHQAGAIAIAAQAKAAAFgIQAGgHAAgNQAAgMgGgHQgFgIgKAAQgIAAgGAIg");
	this.shape_20.setTransform(-56.375,1.2);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAQA0IgZghIgIAIIAAAZIgNAAIAAhnIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgAqg");
	this.shape_21.setTransform(-63.425,-0.35);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAQA0IgZghIgIAIIAAAZIgNAAIAAhnIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgAqg");
	this.shape_22.setTransform(-73.975,-0.35);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgGAyIAAhJIANAAIAABJgAgFglQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_23.setTransform(-79.7,-0.15);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgGA0IAAhnIANAAIAABng");
	this.shape_24.setTransform(-83.1,-0.35);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AAWAyIgigvIgMANIAAAiIgNAAIAAhjIANAAIAAAxIArgxIAQAAIgmAsIApA3g");
	this.shape_25.setTransform(-88.625,-0.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-95.6,-10.4,191.3,20.8);


(lib.Tween10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Eg/RAu4MAAAhdvMB+jAAAMAAABdvg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-405,-300,810,600);


(lib.Tween9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgGAyIAAhJIANAAIAABJgAgFglQgCgCAAgDQAAgDACgDQADgCACAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgCAAgDgCg");
	this.shape.setTransform(91.85,-0.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIAMAAIAAAIQAGgKALAAIAGABIAAAMIgHAAQgLAAgFAKIAAA0g");
	this.shape_1.setTransform(88.15,1.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_2.setTransform(81.775,1.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKQgFACgFAAQgIAAgDgGg");
	this.shape_3.setTransform(75.525,0.375);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgWAgQgIgGAAgJQAAgMAJgFQAJgHAPAAIAMAAIAAgGQAAgGgDgEQgFgEgHAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgFAHgDQAGgDAHAAQANgBAIAHQAGAGABALIAAAhQAAALADAGIAAABIgOAAIgCgIQgJAJgKAAQgMAAgGgGgAgRAOQAAAHAEADQAEADAGABQAFAAAFgDQAGgEACgEIAAgQIgKAAQgWAAAAANg");
	this.shape_4.setTransform(69.65,1.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_5.setTransform(59.725,1.125);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAQA0IgZghIgIAIIAAAZIgNAAIAAhnIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgAqg");
	this.shape_6.setTransform(47.075,-0.35);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIAMAAIAAAvQAAARAOAAQAOAAAFgLIAAg1IAMAAIAABJIgMAAIAAgHQgIAJgNAAQgMAAgGgHg");
	this.shape_7.setTransform(39.2,1.275);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKQgFACgFAAQgIAAgDgGg");
	this.shape_8.setTransform(32.875,0.375);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQABgIgEgEQgDgEgIAAQgFAAgFADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_9.setTransform(26.9,1.125);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIAMAAIAAAvQAAARAOAAQANAAAGgLIAAg1IAMAAIAABJIgMAAIAAgHQgIAJgNAAQgMAAgGgHg");
	this.shape_10.setTransform(19.2,1.275);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_11.setTransform(7.825,2.575);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQAAgIgDgEQgEgEgHAAQgGAAgEADQgEAEgEAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_12.setTransform(0.15,1.125);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgFAyIAAhJIALAAIAABJgAgEglQgCgCAAgDQAAgDACgDQACgCACAAQAEAAABACQACADAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_13.setTransform(-5.4,-0.15);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQAAgIgDgEQgDgEgIAAQgFAAgFADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_14.setTransform(-11,1.125);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgWAfQgGgHAAgOIAAgvIANAAIAAAvQAAARANAAQANAAAGgLIAAg1IAMAAIAABJIgMAAIAAgHQgIAJgNAAQgMAAgGgHg");
	this.shape_15.setTransform(-18.7,1.275);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAQA0IgZghIgIAIIAAAZIgNAAIAAhnIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgAqg");
	this.shape_16.setTransform(-25.625,-0.35);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AAQA0IgZghIgIAIIAAAZIgNAAIAAhnIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgAqg");
	this.shape_17.setTransform(-36.175,-0.35);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgXAgQgHgGAAgJQABgMAIgFQAJgHAPAAIAMAAIAAgGQAAgGgDgEQgEgEgIAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgFAGgDQAIgDAHAAQAMgBAIAHQAGAGABALIAAAhQAAALACAGIAAABIgNAAIgCgIQgIAJgMAAQgKAAgIgGgAgRAOQAAAHAEADQAEADAGABQAFAAAFgDQAGgEACgEIAAgQIgKAAQgWAAAAANg");
	this.shape_18.setTransform(-44,1.2);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKQgFACgFAAQgIAAgDgGg");
	this.shape_19.setTransform(-50.275,0.375);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgXAcQgKgKAAgSIAAAAQAAgKAFgJQAEgJAIgFQAHgEAJAAQAPgBAKALQAJALAAAQIAAABQAAAKgEAJQgEAJgIAFQgIAEgKAAQgOAAgJgKgAgOgTQgGAHAAANQAAAMAGAHQAGAIAIAAQAKAAAFgIQAGgHAAgNQAAgMgGgHQgFgIgKAAQgIAAgGAIg");
	this.shape_20.setTransform(-56.375,1.2);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAQA0IgZghIgIAIIAAAZIgNAAIAAhnIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgAqg");
	this.shape_21.setTransform(-63.425,-0.35);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAQA0IgZghIgIAIIAAAZIgNAAIAAhnIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgAqg");
	this.shape_22.setTransform(-73.975,-0.35);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgGAyIAAhJIANAAIAABJgAgFglQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_23.setTransform(-79.7,-0.15);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgGA0IAAhnIANAAIAABng");
	this.shape_24.setTransform(-83.1,-0.35);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AAWAyIgigvIgMANIAAAiIgNAAIAAhjIANAAIAAAxIArgxIAQAAIgmAsIApA3g");
	this.shape_25.setTransform(-88.625,-0.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-95.6,-10.4,191.3,20.8);


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
	this.shape.graphics.f("#FFFFFF").s().p("AgcASIAsgSIgsgRIAAgNIA5AaIAAAJIg5Aag");
	this.shape.setTransform(23.875,0.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgQAFIAAgJIAhAAIAAAJg");
	this.shape_1.setTransform(18.125,0.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgQAFIAAgJIAhAAIAAAJg");
	this.shape_2.setTransform(14.275,0.675);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgHAAQgLAAgEAKIAAA0g");
	this.shape_3.setTransform(6.9,1.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_4.setTransform(0.525,1.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgDgFQgFgGAAgHIANAAQABAGAEAFQAFADAHAAQAHAAAFgDQADgDAAgEQABgGgEgCQgEgEgJgCQgJgCgGgCQgGgCgCgEQgDgEAAgGQAAgJAHgGQAJgHAKABQANgBAIAHQAIAGAAALIgNAAQAAgGgEgDQgFgEgHAAQgFAAgFADQgDADAAAFQAAAFADACIANAEQAJADAFACQAHACACAFQAEADAAAHQgBAJgHAGQgJAHgMgBQgIAAgHgDg");
	this.shape_5.setTransform(-6.85,1.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_6.setTransform(-14.075,1.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgSAtQgJgFgFgLQgFgKAAgOIAAgIQAAgWAKgNQALgMASAAQAPAAAKAIQAJAIACAOIgNAAQgEgTgTAAQgNAAgGAJQgHAJAAASIAAAHQAAARAHAJQAIAKAMAAQAIAAAFgBQAGgCADgEIAAgWIgXAAIAAgLIAkAAIAAAlQgFAHgJAEQgJADgMAAQgLAAgKgGg");
	this.shape_7.setTransform(-22.725,-0.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29.4,-10.4,58.9,20.8);


(lib.Tween5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgcASIAsgSIgsgRIAAgNIA5AaIAAAJIg5Aag");
	this.shape.setTransform(23.875,0.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgQAFIAAgJIAhAAIAAAJg");
	this.shape_1.setTransform(18.125,0.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgQAFIAAgJIAhAAIAAAJg");
	this.shape_2.setTransform(14.275,0.675);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgHAAQgLAAgEAKIAAA0g");
	this.shape_3.setTransform(6.9,1.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_4.setTransform(0.525,1.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgDgFQgFgGAAgHIANAAQABAGAEAFQAFADAHAAQAHAAAFgDQADgDAAgEQABgGgEgCQgEgEgJgCQgJgCgGgCQgGgCgCgEQgDgEAAgGQAAgJAHgGQAJgHAKABQANgBAIAHQAIAGAAALIgNAAQAAgGgEgDQgFgEgHAAQgFAAgFADQgDADAAAFQAAAFADACIANAEQAJADAFACQAHACACAFQAEADAAAHQgBAJgHAGQgJAHgMgBQgIAAgHgDg");
	this.shape_5.setTransform(-6.85,1.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_6.setTransform(-14.075,1.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgSAtQgJgFgFgLQgFgKAAgOIAAgIQAAgWAKgNQALgMASAAQAPAAAKAIQAJAIACAOIgNAAQgEgTgTAAQgNAAgGAJQgHAJAAASIAAAHQAAARAHAJQAIAKAMAAQAIAAAFgBQAGgCADgEIAAgWIgXAAIAAgLIAkAAIAAAlQgFAHgJAEQgJADgMAAQgLAAgKgGg");
	this.shape_7.setTransform(-22.725,-0.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29.4,-10.4,58.9,20.8);


(lib.Tween4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgcASIAsgSIgsgRIAAgNIA5AaIAAAJIg5Aag");
	this.shape.setTransform(23.875,0.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgQAFIAAgJIAhAAIAAAJg");
	this.shape_1.setTransform(18.125,0.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgQAFIAAgJIAhAAIAAAJg");
	this.shape_2.setTransform(14.275,0.675);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgHAAQgLAAgEAKIAAA0g");
	this.shape_3.setTransform(6.9,1.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_4.setTransform(0.525,1.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgDgFQgFgGAAgHIANAAQABAGAEAFQAFADAHAAQAHAAAFgDQADgDAAgEQABgGgEgCQgEgEgJgCQgJgCgGgCQgGgCgCgEQgDgEAAgGQAAgJAHgGQAJgHAKABQANgBAIAHQAIAGAAALIgNAAQAAgGgEgDQgFgEgHAAQgFAAgFADQgDADAAAFQAAAFADACIANAEQAJADAFACQAHACACAFQAEADAAAHQgBAJgHAGQgJAHgMgBQgIAAgHgDg");
	this.shape_5.setTransform(-6.85,1.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_6.setTransform(-14.075,1.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgSAtQgJgFgFgLQgFgKAAgOIAAgIQAAgWAKgNQALgMASAAQAPAAAKAIQAJAIACAOIgNAAQgEgTgTAAQgNAAgGAJQgHAJAAASIAAAHQAAARAHAJQAIAKAMAAQAIAAAFgBQAGgCADgEIAAgWIgXAAIAAgLIAkAAIAAAlQgFAHgJAEQgJADgMAAQgLAAgKgGg");
	this.shape_7.setTransform(-22.725,-0.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29.4,-10.4,58.9,20.8);


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


(lib.sustain = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("Game Sustainability", "italic 28px 'Roboto Medium'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 36;
	this.text.lineWidth = 248;
	this.text.parent = this;
	this.text.setTransform(127.4,7);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3498DB").s().p("AzCC2IAAlrMAmFAAAIAAFrg");
	this.shape.setTransform(128.975,18.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sustain, new cjs.Rectangle(1.5,0.7,251.9,41.9), null);


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


(lib.hasil = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgDAlIAAhKIAIAAIAABKg");
	this.shape.setTransform(58.65,60);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgEAkIAAg0IAIAAIAAA0gAgDgaQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAAAAAQAAAAABAAQABAAAAAAQABABAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQgBAAAAAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAg");
	this.shape_1.setTransform(56.225,60.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgJAZQgGgCgCgEQgDgEAAgFIAJAAQABAFADACQADADAFAAQAFAAADgCQADgCAAgDQAAgEgCgCQgDgCgHgBIgKgEIgGgEQgCgDAAgEQAAgGAFgFQAGgFAIAAQAIABAGAFQAFAEABAHIgKAAQABgEgDgCQgEgDgEAAQgEAAgDACQgDADAAADQAAADADACIAIADIALADQAEABACAEQACADAAAEQAAAHgGAEQgFAFgJgBQgFAAgFgCg");
	this.shape_2.setTransform(52.4,61.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgQAXQgFgEAAgHQAAgIAGgEQAHgFAKABIAJAAIAAgFQAAgFgDgCQgDgDgFAAQgEAAgDACQgEADAAADIgJAAQAAgDADgFQADgDAFgCQAEgDAFAAQAJABAFAFQAGAEAAAIIAAAXQAAAIACADIAAABIgKAAIgBgFQgGAHgIgBQgIABgFgFgAgMALQAAAEADACQADADAEAAQADgBAEgCQAEgCACgDIAAgLIgHAAQgQAAAAAKg");
	this.shape_3.setTransform(47.125,61.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AASAjIAAggIgjAAIAAAgIgJAAIAAhGIAJAAIAAAfIAjAAIAAgfIAJAAIAABGg");
	this.shape_4.setTransform(40.825,60.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFFFFF").ss(3,1,1).p("Arkj9IXJAAIAAH7I3JAAg");
	this.shape_5.setTransform(48.65,60.25);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(102,153,51,0.318)").s().p("ArkD+IAAn7IXJAAIAAH7g");
	this.shape_6.setTransform(48.65,60.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hasil, new cjs.Rectangle(-26.9,33.4,151.2,53.800000000000004), null);


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


(lib.Path = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#606163").s().p("Ap/z/QEEAADvBlQDkBhCxCyQCxCwBiDmQBkDtAAEEQAAEEhkDuQhiDmixCxQixCxjkBhQjvBkkEAAg");
	this.shape.setTransform(64,127.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,128,255.9), null);


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


(lib.drop4G4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AARA4IAAg0QAAgIgDgEQgEgEgJAAQgFAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLANAAQAZAAAAAbIAAA0g");
	this.shape.setTransform(163.5,38.825);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_1.setTransform(155.225,40.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgTAvIgBAJIgNAAIAAhwIAOAAIAAAqQAIgKANAAQAPAAAIAKQAJAMAAARIAAACQAAASgJALQgIALgPAAQgOAAgHgKgAgTAAIAAAhQAGANANAAQAJAAAGgIQAFgHAAgQQAAgOgFgGQgGgIgJAAQgNABgGAMg");
	this.shape_2.setTransform(147.1,38.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_3.setTransform(138.575,40.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgCAsQgEgFAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAALIgLABQgJAAgEgGg");
	this.shape_4.setTransform(131.825,39.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCADgEgBQgDABgCgDg");
	this.shape_5.setTransform(124.1,39.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_6.setTransform(120.1,40.425);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgCAsQgEgFAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAALIgLABQgJAAgEgGg");
	this.shape_7.setTransform(114.525,39.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgWAfQgLgLABgSIAAgCQgBgLAFgKQAEgJAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAGAIQAIAHAJAAQAGAAAFgDQAFgDAEgFIAIAGQgKAQgTAAQgPAAgKgKgAgMgXQgGAGgBALIAnAAIAAgBQgBgLgFgFQgEgGgJAAQgHAAgGAGg");
	this.shape_8.setTransform(108.45,40.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_9.setTransform(97.825,40.425);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCADgEgBQgDABgCgDg");
	this.shape_10.setTransform(89.45,39.05);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgSAzQgKgFgFgHQgFgHAAgKIAOAAQAAAKAHAGQAIAFAKAAQAMAAAGgEQAFgFAAgIQAAgIgFgEQgGgEgNgEQgSgFgIgHQgJgIAAgLQAAgMALgJQAKgIAPAAQALAAAIAEQAJAFAFAHQAEAIAAAIIgOAAQAAgJgGgGQgGgFgLAAQgKAAgFAEQgGAFAAAIQAAAHAFAEQAGAFAMADQANAEAIAEQAHAEAEAGQAEAGAAAIQAAANgLAIQgKAIgRAAQgKAAgJgEg");
	this.shape_11.setTransform(83.225,39.125);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1,0,0,1,-124.5,-43.5)).s().p("AzcGzIAAtlMAm5AAAIAANlg");
	this.shape_12.setTransform(124,43.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.5,0,249,87);


(lib.drop4G3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AARA4IAAg0QAAgIgDgEQgEgEgIAAQgGAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLANAAQAZAAAAAbIAAA0g");
	this.shape.setTransform(109.7,38.825);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_1.setTransform(101.425,40.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgTAvIgBAJIgNAAIAAhwIAOAAIAAAqQAIgKANAAQAPAAAIAKQAJAMAAARIAAACQAAASgJALQgJALgOAAQgOAAgHgKgAgTAAIAAAhQAGANANAAQAJAAAGgIQAFgHAAgQQAAgOgFgGQgGgIgJAAQgNABgGAMg");
	this.shape_2.setTransform(93.3,38.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_3.setTransform(84.775,40.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgCAsQgEgFAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAALIgLABQgJAAgEgGg");
	this.shape_4.setTransform(78.025,39.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_5.setTransform(68.825,38.825);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_6.setTransform(60.375,40.575);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgCAsQgEgFAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAALIgLABQgJAAgEgGg");
	this.shape_7.setTransform(53.625,39.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AARAoIAAgzQAAgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_8.setTransform(47.25,40.425);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgXAfQgKgLABgSIAAgCQAAgLAEgKQAEgJAJgFQAIgFAIAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAIQAIAHAIAAQAIAAAEgDQAGgDADgFIAIAGQgKAQgTAAQgPAAgLgKgAgMgXQgFAGgCALIAnAAIAAgBQAAgLgGgFQgEgGgJAAQgHAAgGAGg");
	this.shape_9.setTransform(39.25,40.5);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgjA1IAAhpIAiAAQARAAAJAHQAIAHAAAOQAAAHgEAGQgEAGgHADQAIACAFAGQAFAHAAAJQAAAPgJAIQgJAIgRAAgAgVAqIAWAAQAKAAAFgFQAGgFAAgJQAAgUgVAAIgWAAgAgVgHIAVAAQAIAAAGgFQAFgEAAgIQAAgJgFgEQgFgEgKAAIgUAAg");
	this.shape_10.setTransform(30.725,39.125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1,0,0,1,-124.4,-43.5)).s().p("AzcGzIAAtlMAm5AAAIAANlg");
	this.shape_11.setTransform(77.15,43.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69,0,277.7,87);


(lib.drop4G2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AASA4IAAg0QAAgIgFgEQgDgEgJAAQgFAAgFAEQgFADgCAFIAAA4IgOAAIAAhvIAOAAIAAArQAJgLAMAAQAaAAAAAbIAAA0g");
	this.shape.setTransform(165.45,38.825);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_1.setTransform(157.175,40.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgUAvIgBAJIgLAAIAAhwIANAAIAAAqQAIgKAOAAQAOAAAIAKQAJAMgBARIAAACQABASgJALQgJALgNAAQgOAAgJgKgAgTAAIAAAhQAGANANAAQAJAAAFgIQAGgHAAgQQAAgOgGgGQgFgIgJAAQgOABgFAMg");
	this.shape_2.setTransform(149.05,38.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_3.setTransform(140.525,40.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgCAsQgEgFAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAALIgLABQgJAAgEgGg");
	this.shape_4.setTransform(133.775,39.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_5.setTransform(123.775,40.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgQA0QgIgDgEgHIAHgIQAIALANAAQAJAAAGgGQAFgFAAgKIAAgHQgJAJgMAAQgOAAgJgLQgJgLAAgTQAAgSAJgLQAJgLAOAAQAOAAAHAKIABgIIANAAIAABMQAAAPgJAJQgKAJgPAAQgIAAgIgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgJAAgFAHg");
	this.shape_6.setTransform(115.35,41.975);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgQA0QgIgDgEgHIAGgIQAJALANAAQAJAAAFgGQAGgFAAgKIAAgHQgIAJgNAAQgPAAgIgLQgJgLAAgTQAAgSAJgLQAIgLAPAAQAOAAAHAKIABgIIANAAIAABMQgBAPgIAJQgKAJgPAAQgHAAgJgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgIAAgHAHg");
	this.shape_7.setTransform(106.95,41.975);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AASAoIAAgzQAAgJgFgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_8.setTransform(98.75,40.425);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgZAeQgKgMAAgSIAAAAQAAgMAFgJQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAALgEAKQgFAJgIAFQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgIAAgOQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_9.setTransform(90.325,40.5);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AAXA1IgWgrIgYAAIAAArIgPAAIAAhpIAjAAQARAAAKAIQAKAIAAAQQAAAKgFAHQgGAGgKAEIAaAtIAAABgAgXAAIAVAAQAJAAAGgGQAHgFAAgJQAAgKgGgGQgGgFgKAAIgVAAg");
	this.shape_10.setTransform(81.9,39.125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1,0,0,1,-124.5,-43.5)).s().p("AzcGzIAAtlMAm5AAAIAANlg");
	this.shape_11.setTransform(124,43.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.5,0,249,87);


(lib.drop4G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AARA4IAAg0QAAgIgDgEQgEgEgIAAQgGAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLAMAAQAaAAAAAbIAAA0g");
	this.shape.setTransform(162.35,38.825);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_1.setTransform(154.075,40.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgTAvIgBAJIgNAAIAAhwIAOAAIAAAqQAIgKANAAQAPAAAIAKQAJAMAAARIAAACQAAASgJALQgJALgOAAQgOAAgHgKgAgTAAIAAAhQAGANANAAQAJAAAGgIQAFgHAAgQQAAgOgFgGQgGgIgJAAQgNABgGAMg");
	this.shape_2.setTransform(145.95,38.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_3.setTransform(137.425,40.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgCAsQgEgFAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAALIgLABQgJAAgEgGg");
	this.shape_4.setTransform(130.675,39.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AARAoIAAgzQAAgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_5.setTransform(120.6,40.425);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_6.setTransform(112.375,40.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgPAmQgHgEgFgGQgDgGgBgHIAOAAQABAHAEAEQAFAEAIAAQAIAAAEgDQAFgDAAgFQAAgGgEgDQgFgDgJgCQgKgCgGgDQgGgDgDgEQgDgEAAgGQAAgKAIgGQAJgHAMAAQANAAAJAHQAIAGAAAMIgOAAQAAgGgEgEQgFgEgHAAQgHAAgEADQgFADABAFQAAAGADACQAFADAJACQAKACAGADQAGACAEAFQACAEAAAGQAAALgIAGQgJAHgNAAQgJAAgHgDg");
	this.shape_7.setTransform(104.4,40.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCADgEgBQgDABgCgDg");
	this.shape_8.setTransform(98.75,39.05);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AggA4IAAhtIAMAAIABAJQAIgLAOAAQAOAAAIALQAIALAAATIAAABQAAASgIAKQgIAMgOAAQgOgBgIgIIAAAmgAgTggIAAAkQAGALANAAQAIAAAGgIQAGgHAAgOQAAgOgGgHQgGgIgIAAQgNAAgGALg");
	this.shape_9.setTransform(92.875,41.95);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_10.setTransform(84.425,40.5);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgfA1IAAhpIAOAAIAABeIAxAAIAAALg");
	this.shape_11.setTransform(76.775,39.125);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1,0,0,1,-124.5,-43.5)).s().p("AzcGzIAAtlMAm5AAAIAANlg");
	this.shape_12.setTransform(124,43.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.5,0,249,87);


(lib.drag3G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("As0kKIZpAAIAAIVI5pAAg");
	this.shape.setTransform(82.125,26.7);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_1.setTransform(124.175,36.375);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgSAbQgGgGAAgMIAAgoIALAAIAAAoQAAAOAMAAQALAAAEgJIAAgtIALAAIAAA+IgLAAIAAgGQgGAHgLAAQgLAAgEgFg");
	this.shape_2.setTransform(119.1,37.125);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAHgDAGAAQAKAAAGAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgOANQgBAFAEADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgJAAQgSAAAAAMg");
	this.shape_3.setTransform(112.5,37.075);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgEAtIAAhZIAKAAIAABZg");
	this.shape_4.setTransform(107.8,35.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABgBAAAAQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAABAAAAQAAABAAABQAAAAgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAgBgBg");
	this.shape_5.setTransform(101.975,35.925);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgTAkQgHgIAAgPIAAAAQAAgPAHgIQAHgJALAAQAKAAAHAIIAAgiIALAAIAABZIgKAAIgBgHQgGAIgLAAQgLAAgHgJgAgKgDQgFAEAAANQAAAKAFAHQAEAFAHAAQAKAAAFgJIAAgcQgFgJgKAAQgHAAgEAHg");
	this.shape_6.setTransform(96.975,35.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgaAsIAAhWIAKAAIAAAGQAIgHAKAAQAMgBAGAJQAHAJAAAPIAAABQAAANgHAKQgGAIgMAAQgLAAgGgHIAAAegAgPgZIAAAdQAFAJAKAAQAGgBAGgGQAEgGAAgLQAAgLgEgGQgFgHgHABQgKAAgFAJg");
	this.shape_7.setTransform(87.55,38.25);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgSAbQgGgGAAgMIAAgoIALAAIAAAoQAAAOALAAQAMAAAEgJIAAgtIALAAIAAA+IgLAAIAAgGQgGAHgLAAQgLAAgEgFg");
	this.shape_8.setTransform(80.75,37.125);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgTAkQgHgIAAgPIAAAAQAAgPAHgIQAHgJALAAQAKAAAHAIIAAgiIALAAIAABZIgKAAIgBgHQgGAIgLAAQgLAAgHgJgAgKgDQgFAEAAANQAAAKAFAHQAEAFAHAAQAKAAAFgJIAAgcQgFgJgKAAQgHAAgEAHg");
	this.shape_9.setTransform(73.925,35.8);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABgBAAAAQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAABAAAAQAAABAAABQAAAAgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAgBgBg");
	this.shape_10.setTransform(69.275,35.925);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAOAtIAAgqQAAgGgDgDQgDgDgHAAQgEAAgEADQgEADgCADIAAAtIgLAAIAAhZIALAAIAAAjQAIgJAKAAQAUAAAAAVIAAAqg");
	this.shape_11.setTransform(64.5,35.75);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAOAgIAAgpQAAgHgDgDQgDgDgHAAQgEAAgEADQgEADgCAEIAAAsIgLAAIAAg+IAKAAIABAIQAHgJALAAQAUAAAAAWIAAApg");
	this.shape_12.setTransform(54.95,37.025);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGAMAAIALAAIAAgFQAAgFgDgEQgDgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAGgDAHAAQAKAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgPANQABAFADADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgJAAQgSAAgBAMg");
	this.shape_13.setTransform(48.35,37.075);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgTAkQgHgIAAgPIAAAAQAAgPAHgIQAHgJALAAQAKAAAHAIIAAgiIALAAIAABZIgKAAIgBgHQgGAIgLAAQgLAAgHgJgAgKgDQgFAEAAANQAAAKAFAHQAEAFAHAAQAKAAAFgJIAAgcQgFgJgKAAQgHAAgEAHg");
	this.shape_14.setTransform(41.575,35.8);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AAOAtIgWgeIgGAIIAAAWIgLAAIAAhZIALAAIAAA1IAFgGIATgVIAOAAIgZAaIAbAlg");
	this.shape_15.setTransform(150.2,17.35);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABAAAAgBQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBg");
	this.shape_16.setTransform(145.325,17.525);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_17.setTransform(141.725,17.975);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_18.setTransform(136.825,18.675);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGAMAAIALAAIAAgFQAAgFgEgEQgDgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAFgDAHAAQAKAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgPANQABAFADADQAEACAFAAQAEAAAFgCQAEgDACgEIAAgNIgJAAQgSAAgBAMg");
	this.shape_19.setTransform(130.45,18.675);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgFAtIAAhZIAKAAIAABZg");
	this.shape_20.setTransform(125.75,17.35);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgPAlIgBAIIgKAAIAAhZIALAAIAAAhQAHgIAKAAQALAAAIAJQAGAIAAAOIAAABQAAAPgHAJQgGAJgLAAQgMAAgGgJgAgPAAIAAAbQAFAKAKAAQAHAAAFgHQAEgFAAgNQAAgLgEgFQgEgGgIAAQgKAAgFAKg");
	this.shape_21.setTransform(121.05,17.4);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgUAYQgIgJAAgPIAAAAQAAgJAEgHQADgIAHgEQAGgEAIAAQANAAAIAJQAIAJAAAOIAAABQAAAJgEAHQgDAIgHAEQgGAEgJAAQgMAAgIgJgAgMgRQgFAHAAALQAAAKAFAHQAFAGAHAAQAIAAAFgGQAFgHAAgLQAAgKgFgGQgFgHgIAAQgHAAgFAGg");
	this.shape_22.setTransform(114.125,18.675);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgEAtIAAhZIAJAAIAABZg");
	this.shape_23.setTransform(109.25,17.35);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgaAsIAAhXIAKAAIAAAHQAIgIAKAAQALAAAHAJQAHAIAAAQIAAABQAAAOgHAIQgHAJgLAAQgLAAgGgHIAAAegAgPgaIAAAdQAFAJAKAAQAGABAFgHQAFgGAAgLQAAgLgFgGQgEgGgHgBQgKAAgFAJg");
	this.shape_24.setTransform(104.55,19.85);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABAAAAgBQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBg");
	this.shape_25.setTransform(99.625,17.525);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IAMAAIAAAHQAEgIAJAAIAGABIAAAKIgGgBQgKAAgDAJIAAAsg");
	this.shape_26.setTransform(96.45,18.625);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_27.setTransform(91.975,17.975);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AAOAtIAAgqQAAgGgDgDQgDgDgHgBQgEAAgEADQgEADgCAEIAAAtIgLAAIAAhZIALAAIAAAiQAHgJALAAQAUAAAAAWIAAAqg");
	this.shape_28.setTransform(83.95,17.35);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgSAbQgGgGAAgMIAAgoIALAAIAAAoQAAAOAMAAQALAAAEgJIAAgtIALAAIAAA+IgKAAIAAgGQgHAHgLAAQgLAAgEgFg");
	this.shape_29.setTransform(77.35,18.725);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgQAlIAAAIIgKAAIAAhZIALAAIAAAhQAGgIALAAQAMAAAGAJQAHAIAAAOIAAABQAAAPgHAJQgHAJgLAAQgKAAgIgJgAgPAAIAAAbQAFAKAKAAQAIAAADgHQAFgFAAgNQAAgLgEgFQgEgGgIAAQgLAAgEAKg");
	this.shape_30.setTransform(70.8,17.4);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgTAbQgFgGAAgMIAAgoIALAAIAAAoQAAAOALAAQAMAAAEgJIAAgtIALAAIAAA+IgLAAIAAgGQgGAHgLAAQgKAAgGgFg");
	this.shape_31.setTransform(64,18.725);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_32.setTransform(58.575,17.975);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AAOAgIAAgpQAAgHgDgDQgDgDgHAAQgEAAgEADQgEADgCAEIAAAsIgLAAIAAg+IALAAIAAAIQAHgJALAAQAUAAAAAWIAAApg");
	this.shape_33.setTransform(50.55,18.625);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGAMAAIALAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAGgDAHAAQAKAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgPANQABAFADADQAEACAFAAQAEAAAFgCQAEgDACgEIAAgNIgJAAQgSAAgBAMg");
	this.shape_34.setTransform(43.95,18.675);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_35.setTransform(37.575,18.675);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABAAAAgBQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBg");
	this.shape_36.setTransform(33.075,17.525);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgaAsIAAhXIAKAAIABAHQAGgIALAAQAMAAAGAJQAHAIAAAQIAAABQAAAOgHAIQgGAJgMAAQgKAAgHgHIAAAegAgPgaIAAAdQAFAJAKAAQAGABAGgHQAEgGAAgLQAAgLgEgGQgFgGgHgBQgKAAgFAJg");
	this.shape_37.setTransform(28.35,19.85);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGAMAAIALAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAFgDAHAAQAKAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgPANQABAFADADQAEACAFAAQAEAAAFgCQAEgDACgEIAAgNIgJAAQgSAAgBAMg");
	this.shape_38.setTransform(21.55,18.675);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgZArIAAhVIALAAIAABMIAoAAIAAAJg");
	this.shape_39.setTransform(15.425,17.575);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FF8C2D").s().p("As0j8IZpgOIAAIHI5pAOg");
	this.shape_40.setTransform(82.125,26.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_3
	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("rgba(0,0,0,0.227)").s().p("As0ELIAAoVIZpAAIAAIVg");
	this.shape_41.setTransform(74.075,33.15);
	this.shape_41._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_41).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8,-1,173.3,60.9);


(lib.drag2G8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("As0kKIZpAAIAAIVI5pAAg");
	this.shape.setTransform(82.125,26.7);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgFAtIAAhZIAKAAIAABZg");
	this.shape_1.setTransform(92.55,47.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGAMAAIALAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAGgDAFAAQAMAAAFAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgPANQAAAFAEADQADACAGAAQAEAAAFgCQAEgDACgEIAAgNIgIAAQgUAAAAAMg");
	this.shape_2.setTransform(87.8,48.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABgBAAAAQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAABAAAAQAAABAAABQAAAAgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBg");
	this.shape_3.setTransform(83.125,47.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgTAkQgHgIAAgPIAAAAQAAgPAHgIQAHgJALAAQAKAAAHAHIAAghIALAAIAABZIgKAAIgBgGQgGAHgLAAQgLAAgHgJgAgKgDQgFAEAAANQAAAKAFAHQAEAFAHAAQAKABAFgKIAAgcQgFgJgKAAQgHAAgEAHg");
	this.shape_4.setTransform(78.125,47.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGAMAAIALAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAGgDAFAAQAMAAAFAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgPANQAAAFAEADQADACAGAAQAEAAAFgCQAEgDACgEIAAgNIgIAAQgUAAAAAMg");
	this.shape_5.setTransform(71.6,48.875);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IAMAAIAAAHQAEgIAJAAIAGABIAAAKIgGgBQgKAAgDAJIAAAsg");
	this.shape_6.setTransform(66.65,48.825);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAHgDAGAAQAKAAAGAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgOANQgBAFAEADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgJAAQgSAAAAAMg");
	this.shape_7.setTransform(130.05,30.475);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_8.setTransform(123.675,30.475);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGAMAAIALAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAGgDAHAAQAKAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgPANQABAFADADQAEACAFAAQAEAAAFgCQAEgDACgEIAAgNIgJAAQgSAAgBAMg");
	this.shape_9.setTransform(117.3,30.475);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAPAgIgPgvIgOAvIgJAAIgTg/IALAAIANAvIAOgvIAIAAIAQAwIALgwIALAAIgSA/g");
	this.shape_10.setTransform(109.55,30.475);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_11.setTransform(101.975,30.475);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgTAkQgHgJAAgOIAAgBQAAgNAHgJQAHgJALAAQAKAAAHAIIAAghIALAAIAABZIgKAAIgBgIQgGAJgLAAQgLAAgHgKgAgKgEQgFAGAAALQAAAMAFAFQAEAHAHgBQAKAAAFgJIAAgcQgFgJgKAAQgHAAgEAGg");
	this.shape_12.setTransform(95.225,29.2);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAFgDAGAAQAMAAAFAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgOANQAAAFADADQAEACAFAAQAEAAAFgCQAEgDACgEIAAgNIgIAAQgUAAABAMg");
	this.shape_13.setTransform(85.75,30.475);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AANAtIgUgeIgIAIIAAAWIgKAAIAAhZIAKAAIAAA1IAHgGIASgVIANAAIgXAaIAaAlg");
	this.shape_14.setTransform(79.85,29.15);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABAAAAgBQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAgBgBg");
	this.shape_15.setTransform(74.975,29.325);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgLA3IAAgIIAFAAQADAAACgCQABgCAAgFIAAhGIAMAAIAABGQAAASgQAAIgHgBgAABgtQAAAAgBAAQAAgBAAAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQABgBAAAAQABgCAEAAQABAAAAAAQABAAABABQAAAAABAAQAAABABAAQAAAAAAABQAAAAABABQAAAAAAABQAAABAAAAQAAABAAABQAAAAAAABQgBAAAAABQAAAAAAAAQgBABAAAAQgBABAAAAQgBAAgBAAQAAABgBAAQgEAAgBgDg");
	this.shape_16.setTransform(71.45,30.6);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgFAtIAAhZIAKAAIAABZg");
	this.shape_17.setTransform(66.25,29.15);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGAMAAIALAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAGgDAHAAQAKAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgPANQABAFADADQAEACAFAAQAEAAAFgCQAEgDACgEIAAgNIgJAAQgSAAgBAMg");
	this.shape_18.setTransform(61.5,30.475);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IALAAIAAAHQAFgIAJAAIAGABIAAAKIgGgBQgKAAgEAJIAAAsg");
	this.shape_19.setTransform(56.55,30.425);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_20.setTransform(51.125,30.475);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_21.setTransform(45.775,29.775);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGANAAIAKAAIAAgFQAAgFgDgEQgDgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAHgDAGAAQALAAAGAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgPANQABAFADADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgJAAQgSAAgBAMg");
	this.shape_22.setTransform(40.7,30.475);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgEAtIAAhZIAJAAIAABZg");
	this.shape_23.setTransform(36,29.15);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABAAAAgBQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAgBgBg");
	this.shape_24.setTransform(33.125,29.325);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgQAlIAAAIIgKAAIAAhZIALAAIAAAhQAGgIALAAQAMAAAGAJQAHAIAAAOIAAABQAAAPgHAJQgHAIgLABQgLgBgHgIgAgPAAIAAAbQAFAKAKgBQAIABADgHQAFgFAAgNQAAgLgEgFQgEgGgIAAQgLAAgEAKg");
	this.shape_25.setTransform(28.4,29.2);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGAMAAIALAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAGgDAFAAQAMAAAFAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgPANQAAAFAEADQADACAGAAQAEAAAFgCQAEgDACgEIAAgNIgIAAQgUAAAAAMg");
	this.shape_26.setTransform(143.15,12.075);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgDAgIgXg/IALAAIAPAwIAQgwIALAAIgXA/g");
	this.shape_27.setTransform(137,12.075);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgOAgIAAg+IAKAAIAAAHQAFgIAKAAIAEABIAAAKIgFgBQgKAAgEAJIAAAsg");
	this.shape_28.setTransform(132.4,12.025);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGAMAAIALAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAGgDAHAAQAKAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgPANQABAFADADQAEACAFAAQAEAAAFgCQAEgDACgEIAAgNIgJAAQgSAAgBAMg");
	this.shape_29.setTransform(126.75,12.075);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgEAtIAAhZIAJAAIAABZg");
	this.shape_30.setTransform(122.05,10.75);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGAMAAIALAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAGgDAFAAQAMAAAFAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgPANQAAAFAEADQADACAGAAQAEAAAFgCQAEgDACgEIAAgNIgIAAQgUAAAAAMg");
	this.shape_31.setTransform(114.35,12.075);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AANAtIgUgdIgHAGIAAAXIgLAAIAAhZIALAAIAAA1IAFgHIATgTIANAAIgYAZIAbAlg");
	this.shape_32.setTransform(108.45,10.75);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABgBAAAAQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAABQAAAAgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBg");
	this.shape_33.setTransform(103.575,10.925);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_34.setTransform(99.975,11.375);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_35.setTransform(95.125,12.075);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AAOAtIgWgdIgHAGIAAAXIgKAAIAAhZIAKAAIAAA1IAGgHIATgTIAOAAIgZAZIAbAlg");
	this.shape_36.setTransform(89.25,10.75);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AAOAtIAAgqQAAgGgDgDQgDgEgGABQgFAAgDACQgEADgDAEIAAAtIgLAAIAAhZIALAAIAAAjQAIgKAKABQAUgBAAAWIAAAqg");
	this.shape_37.setTransform(79.55,10.75);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgSAbQgGgGAAgMIAAgoIALAAIAAAoQAAAOAMAAQALAAAEgJIAAgtIALAAIAAA+IgKAAIAAgGQgHAHgLAAQgLAAgEgFg");
	this.shape_38.setTransform(72.95,12.125);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgQAlIAAAHIgKAAIAAhZIALAAIAAAiQAGgIALAAQALAAAIAIQAGAKAAAOIAAAAQAAAPgHAJQgHAJgKAAQgLAAgIgJgAgPAAIAAAaQAFALAKAAQAHgBAFgFQAEgHAAgLQAAgMgEgFQgEgGgIAAQgLAAgEAKg");
	this.shape_39.setTransform(66.4,10.8);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgSAbQgGgGAAgMIAAgoIALAAIAAAoQAAAOALAAQAMAAAEgJIAAgtIALAAIAAA+IgLAAIAAgGQgGAHgLAAQgLAAgEgFg");
	this.shape_40.setTransform(59.6,12.125);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_41.setTransform(54.175,11.375);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABgBAAAAQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAABQAAAAgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBg");
	this.shape_42.setTransform(48.025,10.925);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IALAAIAAAHQAFgIAJAAIAGABIAAAKIgGgBQgKAAgEAJIAAAsg");
	this.shape_43.setTransform(44.85,12.025);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_44.setTransform(40.375,11.375);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_45.setTransform(35.525,12.075);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AAiAgIAAgpQAAgGgEgEQgDgDgHAAQgGAAgEAEQgEADAAAGIAAApIgLAAIAAgoQAAgOgNAAQgKAAgFAJIAAAtIgLAAIAAg+IALAAIAAAHQAHgIAMAAQAOAAADAKQADgFAFgDQAGgCAHAAQAUAAAAAWIAAApg");
	this.shape_46.setTransform(27.05,12.025);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABgBAAAAQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAABQAAAAgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBg");
	this.shape_47.setTransform(20.375,10.925);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgOApQgIgEgEgGQgEgGAAgHIAMAAQAAAIAFAEQAGAFAIAAQAKAAAEgEQAFgEAAgGQAAgGgEgDQgFgEgLgDQgOgEgGgFQgHgHAAgIQAAgLAIgGQAIgHAMAAQAIAAAIAEQAGADAEAGQAEAGAAAHIgMAAQABgIgFgEQgFgFgJAAQgHAAgFAEQgEAEgBAGQAAAGAFADQAEAEAKADQALADAFACQAHAEACAFQADAFAAAGQAAAKgIAHQgIAGgOAAQgHAAgIgDg");
	this.shape_48.setTransform(15.35,10.975);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FF8C2D").s().p("As0ELIAAoVIZpAAIAAIVg");
	this.shape_49.setTransform(82.125,28);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_3
	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("rgba(0,0,0,0.227)").s().p("As0ELIAAoVIZpAAIAAIVg");
	this.shape_50.setTransform(74.075,33.15);
	this.shape_50._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_50).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8,-1,173.3,60.9);


(lib.drag2G7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("As0kKIZpAAIAAIVI5pAAg");
	this.shape.setTransform(82.125,26.7);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgEAtIAAhZIAJAAIAABZg");
	this.shape_1.setTransform(139.05,27.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGANAAIAKAAIAAgFQAAgFgDgEQgDgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAHgDAGAAQAKAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgPANQABAFADADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgJAAQgSAAgBAMg");
	this.shape_2.setTransform(134.3,28.575);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgOAgIAAg+IAKAAIAAAHQAFgIAKAAIAEABIAAAKIgFgBQgKAAgEAJIAAAsg");
	this.shape_3.setTransform(129.35,28.525);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_4.setTransform(123.925,28.575);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_5.setTransform(118.575,27.875);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGANAAIAKAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAHgDAGAAQAKAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgOANQAAAFADADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgJAAQgSAAAAAMg");
	this.shape_6.setTransform(113.5,28.575);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgEAtIAAhZIAJAAIAABZg");
	this.shape_7.setTransform(108.8,27.25);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABAAAAgBQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBg");
	this.shape_8.setTransform(105.925,27.425);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgQAlIAAAIIgKAAIAAhZIALAAIAAAhQAGgIALAAQAMAAAGAJQAHAIAAAOIAAABQAAAPgHAJQgHAJgLAAQgKAAgIgJgAgPAAIAAAbQAFAKAKAAQAHAAAEgHQAFgFAAgNQAAgLgEgFQgFgGgHAAQgLAAgEAKg");
	this.shape_9.setTransform(101.2,27.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAOAtIAAgqQAAgGgDgDQgDgDgGgBQgFAAgDADQgFADgCAEIAAAtIgLAAIAAhZIALAAIAAAiQAHgJALAAQAUAAAAAWIAAAqg");
	this.shape_10.setTransform(91.45,27.25);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgTAbQgFgGAAgMIAAgoIALAAIAAAoQAAAOALAAQAMAAAEgJIAAgtIALAAIAAA+IgKAAIAAgGQgHAHgLAAQgKAAgGgFg");
	this.shape_11.setTransform(84.85,28.625);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgPAlIgBAIIgKAAIAAhZIALAAIAAAhQAHgIAKAAQALAAAIAJQAGAIAAAOIAAABQAAAPgHAJQgGAJgLAAQgMAAgGgJgAgPAAIAAAbQAFAKAKAAQAHAAAFgHQAEgFAAgNQAAgLgEgFQgEgGgIAAQgKAAgFAKg");
	this.shape_12.setTransform(78.3,27.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgSAbQgGgGAAgMIAAgoIALAAIAAAoQAAAOAMAAQALAAAEgJIAAgtIALAAIAAA+IgKAAIAAgGQgHAHgLAAQgLAAgEgFg");
	this.shape_13.setTransform(71.5,28.625);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_14.setTransform(66.075,27.875);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABAAAAgBQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBg");
	this.shape_15.setTransform(59.925,27.425);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IAMAAIAAAHQAEgIAJAAIAGABIAAAKIgGgBQgKAAgDAJIAAAsg");
	this.shape_16.setTransform(56.75,28.525);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_17.setTransform(52.275,27.875);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_18.setTransform(47.425,28.575);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAhAgIAAgpQABgGgDgEQgEgDgHAAQgGAAgEAEQgEADAAAGIAAApIgKAAIAAgoQAAgOgOAAQgLAAgDAJIAAAtIgMAAIAAg+IALAAIAAAHQAHgIAMAAQAOAAADAKQADgFAGgDQAEgCAIAAQAUAAAAAWIAAApg");
	this.shape_19.setTransform(38.95,28.525);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABAAAAgBQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBg");
	this.shape_20.setTransform(32.275,27.425);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgOApQgHgEgFgGQgEgGAAgHIALAAQABAIAFAEQAGAFAIAAQAKAAAEgEQAFgEAAgGQAAgGgFgDQgEgEgLgDQgOgEgGgFQgHgHAAgIQAAgLAIgGQAIgHAMAAQAJAAAGAEQAIADADAGQAEAGAAAHIgMAAQABgIgFgEQgFgFgJAAQgHAAgFAEQgFAEAAAGQABAGAEADQAEAEAKADQALADAFACQAHAEACAFQADAFAAAGQAAAKgIAHQgIAGgOAAQgHAAgIgDg");
	this.shape_21.setTransform(27.25,27.475);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FF8C2D").s().p("As0ELIAAoVIZpAAIAAIVg");
	this.shape_22.setTransform(82.125,27.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_3
	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("rgba(0,0,0,0.227)").s().p("As0ELIAAoVIZpAAIAAIVg");
	this.shape_23.setTransform(74.075,33.15);
	this.shape_23._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_23).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8,-1,173.3,60.9);


(lib.drag2G6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("As0kKIZpAAIAAIVI5pAAg");
	this.shape.setTransform(82.125,26.7);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgFAtIAAhZIAKAAIAABZg");
	this.shape_1.setTransform(127.65,46.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGAMAAIALAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAGgDAFAAQAMAAAGAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgPANQAAAFAEADQADACAGAAQAEAAAFgCQAEgDACgEIAAgNIgIAAQgUAAAAAMg");
	this.shape_2.setTransform(122.9,47.425);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgTAbQgFgGAAgMIAAgoIALAAIAAAoQAAAOALAAQAMAAAEgJIAAgtIALAAIAAA+IgKAAIAAgGQgHAHgLAAQgKAAgGgFg");
	this.shape_3.setTransform(116.35,47.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_4.setTransform(109.925,47.425);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAOAtIgWgeIgGAHIAAAXIgLAAIAAhZIALAAIAAA2IAFgIIATgTIAOAAIgZAZIAbAlg");
	this.shape_5.setTransform(104.2,46.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_6.setTransform(97.675,47.425);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_7.setTransform(91.325,47.425);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAGgDAGAAQAMAAAFAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgOANQgBAFAEADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgIAAQgUAAABAMg");
	this.shape_8.setTransform(84.95,47.425);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAOAgIAAgpQAAgHgDgDQgDgDgHAAQgEAAgEADQgDADgDAEIAAAsIgLAAIAAg+IAKAAIABAIQAHgJALAAQAUAAAAAWIAAApg");
	this.shape_9.setTransform(75.45,47.375);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgTAbQgFgGAAgMIAAgoIALAAIAAAoQAAAOALAAQAMAAAEgJIAAgtIALAAIAAA+IgLAAIAAgGQgGAHgLAAQgKAAgGgFg");
	this.shape_10.setTransform(68.85,47.475);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgaAsIAAhWIAKAAIABAGQAHgHAKAAQAMgBAGAJQAHAJAAAPIAAABQAAANgHAKQgGAIgMAAQgKAAgHgHIAAAegAgPgZIAAAdQAFAJAKAAQAHgBAFgGQAEgGAAgLQAAgLgEgGQgFgHgHABQgKAAgFAJg");
	this.shape_11.setTransform(62.3,48.6);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgTAbQgFgGAAgMIAAgoIALAAIAAAoQAAAOAMAAQALAAAEgJIAAgtIALAAIAAA+IgKAAIAAgGQgHAHgLAAQgLAAgFgFg");
	this.shape_12.setTransform(55.5,47.475);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGAMAAIALAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAGgDAHAAQAKAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgPANQABAFADADQAEACAFAAQAEAAAFgCQAEgDACgEIAAgNIgJAAQgSAAgBAMg");
	this.shape_13.setTransform(48.9,47.425);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAhAgIAAgpQAAgGgCgEQgDgDgIAAQgGAAgEAEQgEADAAAGIAAApIgKAAIAAgoQAAgOgOAAQgLAAgDAJIAAAtIgMAAIAAg+IALAAIAAAHQAHgIAMAAQAOAAADAKQADgFAGgDQAEgCAHAAQAVAAAAAWIAAApg");
	this.shape_14.setTransform(40.4,47.375);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgFAtIAAhZIALAAIAABZg");
	this.shape_15.setTransform(142.25,27.7);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAFgDAGAAQAMAAAFAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgOANQAAAFADADQAEACAFAAQAEAAAEgCQAFgDACgEIAAgNIgIAAQgUAAABAMg");
	this.shape_16.setTransform(137.5,29.025);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgTAbQgFgGAAgMIAAgoIALAAIAAAoQAAAOALAAQAMAAAEgJIAAgtIALAAIAAA+IgLAAIAAgGQgGAHgLAAQgKAAgGgFg");
	this.shape_17.setTransform(130.95,29.075);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_18.setTransform(124.525,29.025);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAOAtIgVgeIgHAIIAAAWIgLAAIAAhZIALAAIAAA1IAFgGIATgVIANAAIgYAaIAbAlg");
	this.shape_19.setTransform(118.8,27.7);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_20.setTransform(112.275,29.025);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_21.setTransform(105.925,29.025);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABAAAAgBQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBg");
	this.shape_22.setTransform(98.475,27.875);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_23.setTransform(93.875,29.025);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AANAtIgVgeIgHAIIAAAWIgKAAIAAhZIAKAAIAAA1IAHgGIASgVIAOAAIgYAaIAaAlg");
	this.shape_24.setTransform(88.15,27.7);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgSAbQgGgGAAgMIAAgoIALAAIAAAoQAAAOAMAAQALAAAEgJIAAgtIALAAIAAA+IgKAAIAAgGQgHAHgLAAQgLAAgEgFg");
	this.shape_25.setTransform(81.4,29.075);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgTAlQgHgKAAgOIAAgBQAAgNAHgJQAHgJALAAQAKAAAHAHIAAggIALAAIAABZIgKAAIgBgHQgGAIgLAAQgLAAgHgJgAgKgEQgFAGAAALQAAAMAFAFQAEAHAHAAQAKAAAFgKIAAgcQgFgJgKAAQgHAAgEAGg");
	this.shape_26.setTransform(74.575,27.75);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgUAYQgIgJAAgPIAAAAQAAgJAEgHQADgIAHgEQAGgEAIAAQANAAAIAJQAIAJAAAOIAAABQAAAJgEAHQgDAIgHAEQgGAEgJAAQgMAAgIgJgAgMgRQgFAHAAALQAAAKAFAHQAFAGAHAAQAIAAAFgGQAFgHAAgLQAAgKgFgGQgFgHgIAAQgHAAgFAGg");
	this.shape_27.setTransform(67.925,29.025);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgOAgIAAg+IALAAIAAAHQAEgIAJAAIAFABIAAAKIgFgBQgKAAgDAJIAAAsg");
	this.shape_28.setTransform(62.8,28.975);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgaAsIAAhXIAKAAIAAAHQAIgIAKAAQALAAAHAJQAHAIAAAQIAAABQAAAOgHAIQgHAJgLAAQgLAAgGgHIAAAegAgPgaIAAAdQAFAJAKAAQAHABAEgHQAFgGAAgLQAAgLgFgGQgEgGgHgBQgKAAgFAJg");
	this.shape_29.setTransform(57.2,30.2);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_30.setTransform(50.625,29.025);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgOAgIAAg+IALAAIAAAHQAEgIAJAAIAFABIAAAKIgFgBQgKAAgDAJIAAAsg");
	this.shape_31.setTransform(45.7,28.975);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAOAgIAAgpQAAgHgDgDQgDgDgGAAQgFAAgDADQgEADgDAEIAAAsIgLAAIAAg+IAKAAIABAIQAHgJALAAQAUAAAAAWIAAApg");
	this.shape_32.setTransform(37.1,28.975);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAFgCQAGgDAGAAQAMAAAFAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgOANQgBAFAEADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgIAAQgUAAABAMg");
	this.shape_33.setTransform(30.5,29.025);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgTAlQgHgKAAgOIAAgBQAAgNAHgJQAHgJALAAQAKAAAHAHIAAggIALAAIAABZIgKAAIgBgHQgGAIgLAAQgLAAgHgJgAgKgEQgFAGAAALQAAAMAFAFQAEAHAHAAQAKAAAFgKIAAgcQgFgJgKAAQgHAAgEAGg");
	this.shape_34.setTransform(23.725,27.75);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABgBAAAAQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAABAAAAQAAABAAABQAAAAgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBg");
	this.shape_35.setTransform(148.725,9.475);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IALAAIAAAHQAFgIAKAAIAEABIAAAKIgFgBQgKAAgEAJIAAAsg");
	this.shape_36.setTransform(145.55,10.575);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgSAbQgGgGAAgMIAAgoIALAAIAAAoQAAAOAMAAQALAAAEgJIAAgtIALAAIAAA+IgKAAIAAgGQgHAHgLAAQgLAAgEgFg");
	this.shape_37.setTransform(139.9,10.675);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgTAkQgHgIAAgPIAAAAQAAgPAHgIQAHgJALAAQAKAAAHAHIAAghIALAAIAABZIgKAAIgBgGQgGAHgLAAQgLAAgHgJgAgKgDQgFAEAAANQAAAKAFAHQAEAFAHAAQAKABAFgKIAAgcQgFgJgKAAQgHAAgEAHg");
	this.shape_38.setTransform(133.075,9.35);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_39.setTransform(124.775,9.925);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABgBAAAAQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAABAAAAQAAABAAABQAAAAgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBg");
	this.shape_40.setTransform(121.575,9.475);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgFAtIAAhZIAKAAIAABZg");
	this.shape_41.setTransform(118.65,9.3);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgSAbQgGgGAAgMIAAgoIALAAIAAAoQAAAOAMAAQALAAAEgJIAAgtIALAAIAAA+IgKAAIAAgGQgHAHgLAAQgLAAgEgFg");
	this.shape_42.setTransform(113.9,10.675);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AANAtIgVgdIgHAGIAAAXIgKAAIAAhZIAKAAIAAA2IAHgIIASgTIAOAAIgYAZIAaAlg");
	this.shape_43.setTransform(107.95,9.3);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgOAgIAAg+IAKAAIAAAHQAFgIAKAAIAEABIAAAKIgFgBQgKAAgEAJIAAAsg");
	this.shape_44.setTransform(102.8,10.575);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_45.setTransform(97.375,10.625);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgPAlIgBAHIgKAAIAAhZIALAAIAAAiQAHgIAKAAQALAAAIAIQAGAKAAAOIAAABQAAAOgHAJQgGAJgLgBQgMABgGgJgAgPAAIAAAaQAFAKAKAAQAHAAAFgFQAEgHAAgLQAAgMgEgFQgEgGgIAAQgKAAgFAKg");
	this.shape_46.setTransform(90.9,9.35);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AAOAtIAAgqQAAgGgDgDQgDgEgHABQgEAAgEADQgEACgCAEIAAAtIgLAAIAAhZIALAAIAAAjQAIgJAKAAQAUAAAAAVIAAAqg");
	this.shape_47.setTransform(81.15,9.3);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgSAbQgGgGAAgMIAAgoIALAAIAAAoQAAAOAMAAQALAAAEgJIAAgtIALAAIAAA+IgLAAIAAgGQgGAHgLAAQgLAAgEgFg");
	this.shape_48.setTransform(74.55,10.675);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgQAlIAAAHIgKAAIAAhZIALAAIAAAiQAGgIALAAQAMAAAGAIQAHAKAAAOIAAABQAAAOgHAJQgHAJgLgBQgLABgHgJgAgPAAIAAAaQAFAKAKAAQAIAAADgFQAFgHAAgLQAAgMgEgFQgEgGgIAAQgLAAgEAKg");
	this.shape_49.setTransform(68,9.35);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgTAbQgFgGAAgMIAAgoIALAAIAAAoQAAAOALAAQAMAAAEgJIAAgtIALAAIAAA+IgLAAIAAgGQgGAHgLAAQgKAAgGgFg");
	this.shape_50.setTransform(61.2,10.675);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_51.setTransform(55.775,9.925);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AAOAtIgWgdIgGAGIAAAXIgLAAIAAhZIALAAIAAA2IAFgIIATgTIAOAAIgZAZIAbAlg");
	this.shape_52.setTransform(48.4,9.3);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgTAbQgFgGAAgMIAAgoIALAAIAAAoQAAAOALAAQAMAAAEgJIAAgtIALAAIAAA+IgKAAIAAgGQgHAHgLAAQgKAAgGgFg");
	this.shape_53.setTransform(41.65,10.675);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_54.setTransform(36.225,9.925);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AAOAgIAAgpQAAgHgDgDQgDgDgGAAQgFAAgDADQgFADgCAEIAAAsIgLAAIAAg+IAKAAIABAIQAHgJALAAQAUAAAAAWIAAApg");
	this.shape_55.setTransform(31.15,10.575);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_56.setTransform(24.775,10.625);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgcArIAAhVIAcAAQAMAAAIAGQAGAGAAALQAAAGgDAFQgDAEgGADQAHABAEAFQAEAGAAAHQAAAMgHAGQgIAHgNAAgAgRAiIASAAQAHAAAFgEQAFgFgBgHQAAgPgQAAIgSAAgAgRgFIARAAQAGAAAFgEQAFgEgBgGQAAgHgDgDQgFgDgHAAIgRAAg");
	this.shape_57.setTransform(18,9.525);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FF8C2D").s().p("As0ELIAAoVIZpAAIAAIVg");
	this.shape_58.setTransform(82.125,28);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_3
	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("rgba(0,0,0,0.227)").s().p("As0ELIAAoVIZpAAIAAIVg");
	this.shape_59.setTransform(74.075,33.15);
	this.shape_59._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_59).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8,-1,173.3,60.9);


(lib.drag2G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("As0kKIZpAAIAAIVI5pAAg");
	this.shape.setTransform(82.125,26.7);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgFAtIAAhZIAKAAIAABZg");
	this.shape_1.setTransform(145.55,43.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGAMAAIALAAIAAgFQAAgFgEgEQgDgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAFgDAGAAQALAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgPANQABAFADADQADACAGAAQAEAAAFgCQAEgDACgEIAAgNIgJAAQgSAAgBAMg");
	this.shape_2.setTransform(140.8,45.125);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgSAbQgGgGAAgMIAAgoIALAAIAAAoQAAAOAMAAQALAAAEgJIAAgtIALAAIAAA+IgKAAIAAgGQgHAHgLAAQgLAAgEgFg");
	this.shape_3.setTransform(134.25,45.175);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_4.setTransform(127.825,45.125);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAOAtIgWgdIgHAHIAAAWIgKAAIAAhZIAKAAIAAA1IAGgHIATgUIAOAAIgZAaIAbAlg");
	this.shape_5.setTransform(122.1,43.8);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_6.setTransform(115.575,45.125);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_7.setTransform(109.225,45.125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAFgDAGAAQAMAAAFAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgOANQAAAFADADQAEACAFAAQAEAAAFgCQAEgDACgEIAAgNIgIAAQgUAAABAMg");
	this.shape_8.setTransform(102.85,45.125);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABAAAAgBQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBg");
	this.shape_9.setTransform(95.225,43.975);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_10.setTransform(90.625,45.125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AANAtIgUgdIgIAHIAAAWIgKAAIAAhZIAKAAIAAA1IAHgHIASgUIANAAIgXAaIAaAlg");
	this.shape_11.setTransform(84.9,43.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgSAbQgGgGAAgMIAAgoIALAAIAAAoQAAAOAMAAQALAAAEgJIAAgtIALAAIAAA+IgLAAIAAgGQgGAHgLAAQgLAAgEgFg");
	this.shape_12.setTransform(78.15,45.175);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgTAlQgHgKAAgOIAAgBQAAgNAHgJQAHgJALAAQAKAAAHAHIAAggIALAAIAABZIgKAAIgBgHQgGAHgLABQgLgBgHgIgAgKgEQgFAGAAALQAAAMAFAFQAEAHAHAAQAKAAAFgKIAAgcQgFgJgKAAQgHAAgEAGg");
	this.shape_13.setTransform(71.325,43.85);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgUAYQgIgJAAgPIAAAAQAAgJAEgHQADgIAHgEQAGgEAIAAQANAAAIAJQAIAJAAAOIAAABQAAAJgEAHQgDAIgHAEQgGAEgJAAQgMAAgIgJgAgMgRQgFAHAAALQAAAKAFAHQAFAGAHAAQAIAAAFgGQAFgHAAgLQAAgKgFgGQgFgHgIAAQgHAAgFAGg");
	this.shape_14.setTransform(64.675,45.125);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IAMAAIAAAHQAEgIAJAAIAGABIAAAKIgGgBQgKAAgDAJIAAAsg");
	this.shape_15.setTransform(59.55,45.075);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgaAtIAAhYIAKAAIAAAIQAIgJAKAAQAMABAGAIQAHAJAAAPIAAABQAAAOgHAIQgGAJgMAAQgLAAgGgHIAAAfgAgPgaIAAAdQAFAJAKAAQAHABAEgHQAFgGAAgLQAAgLgFgGQgEgGgHAAQgKgBgFAJg");
	this.shape_16.setTransform(53.95,46.3);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_17.setTransform(47.375,45.125);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IAMAAIAAAHQAEgIAJAAIAGABIAAAKIgGgBQgKAAgDAJIAAAsg");
	this.shape_18.setTransform(42.45,45.075);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAOAgIAAgpQAAgHgDgDQgDgDgGAAQgFAAgDADQgFADgCAEIAAAsIgLAAIAAg+IAKAAIABAIQAHgJALAAQAUAAAAAWIAAApg");
	this.shape_19.setTransform(33.85,45.075);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAFgDAGAAQAMAAAFAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgOANQAAAFADADQAEACAFAAQAEAAAEgCQAFgDACgEIAAgNIgIAAQgUAAABAMg");
	this.shape_20.setTransform(27.25,45.125);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgTAlQgHgKAAgOIAAgBQAAgNAHgJQAHgJALAAQAKAAAHAHIAAggIALAAIAABZIgKAAIgBgHQgGAHgLABQgLgBgHgIgAgKgEQgFAGAAALQAAAMAFAFQAEAHAHAAQAKAAAFgKIAAgcQgFgJgKAAQgHAAgEAGg");
	this.shape_21.setTransform(20.475,43.85);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgFAtIAAhZIALAAIAABZg");
	this.shape_22.setTransform(142.25,25.4);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAFgDAGAAQAMAAAFAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgOANQAAAFADADQAEACAFAAQAEAAAEgCQAFgDACgEIAAgNIgIAAQgUAAABAMg");
	this.shape_23.setTransform(137.5,26.725);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgTAbQgFgGAAgMIAAgoIALAAIAAAoQAAAOALAAQAMAAAEgJIAAgtIALAAIAAA+IgLAAIAAgGQgGAHgLAAQgKAAgGgFg");
	this.shape_24.setTransform(130.95,26.775);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_25.setTransform(124.525,26.725);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAOAtIgVgeIgHAHIAAAXIgLAAIAAhZIALAAIAAA2IAFgIIATgTIANAAIgYAZIAbAlg");
	this.shape_26.setTransform(118.8,25.4);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_27.setTransform(112.275,26.725);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_28.setTransform(105.925,26.725);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABgBAAAAQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAABAAAAQAAABAAABQAAAAgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAgBgBg");
	this.shape_29.setTransform(98.475,25.575);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_30.setTransform(93.875,26.725);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AANAtIgVgeIgHAHIAAAXIgKAAIAAhZIAKAAIAAA2IAHgIIASgTIAOAAIgYAZIAaAlg");
	this.shape_31.setTransform(88.15,25.4);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgSAbQgGgGAAgMIAAgoIALAAIAAAoQAAAOAMAAQALAAAEgJIAAgtIALAAIAAA+IgKAAIAAgGQgHAHgLAAQgLAAgEgFg");
	this.shape_32.setTransform(81.4,26.775);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgTAkQgHgIAAgPIAAAAQAAgPAHgIQAHgJALAAQAKAAAHAIIAAgiIALAAIAABZIgKAAIgBgHQgGAIgLAAQgLAAgHgJgAgKgDQgFAEAAANQAAAKAFAHQAEAFAHAAQAKAAAFgJIAAgcQgFgJgKAAQgHAAgEAHg");
	this.shape_33.setTransform(74.575,25.45);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgUAYQgIgJAAgPIAAAAQAAgJAEgHQADgIAHgEQAGgEAIAAQANAAAIAJQAIAJAAAOIAAABQAAAJgEAHQgDAIgHAEQgGAEgJAAQgMAAgIgJgAgMgRQgFAHAAALQAAAKAFAHQAFAGAHAAQAIAAAFgGQAFgHAAgLQAAgKgFgGQgFgHgIAAQgHAAgFAGg");
	this.shape_34.setTransform(67.925,26.725);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgOAgIAAg+IALAAIAAAHQAEgIAJAAIAFABIAAAKIgFgBQgKAAgDAJIAAAsg");
	this.shape_35.setTransform(62.8,26.675);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgaAsIAAhWIAKAAIAAAGQAIgHAKAAQALgBAHAJQAHAJAAAPIAAABQAAANgHAKQgHAIgLAAQgLAAgGgHIAAAegAgPgZIAAAdQAFAJAKAAQAHgBAEgGQAFgGAAgLQAAgLgFgGQgEgHgHABQgKAAgFAJg");
	this.shape_36.setTransform(57.2,27.9);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_37.setTransform(50.625,26.725);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgOAgIAAg+IALAAIAAAHQAEgIAJAAIAFABIAAAKIgFgBQgKAAgDAJIAAAsg");
	this.shape_38.setTransform(45.7,26.675);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AAOAgIAAgpQAAgHgDgDQgDgDgGAAQgFAAgDADQgEADgDAEIAAAsIgLAAIAAg+IAKAAIABAIQAHgJALAAQAUAAAAAWIAAApg");
	this.shape_39.setTransform(37.1,26.675);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAFgCQAGgDAGAAQAMAAAFAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgOANQgBAFAEADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgIAAQgUAAABAMg");
	this.shape_40.setTransform(30.5,26.725);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgTAkQgHgIAAgPIAAAAQAAgPAHgIQAHgJALAAQAKAAAHAIIAAgiIALAAIAABZIgKAAIgBgHQgGAIgLAAQgLAAgHgJgAgKgDQgFAEAAANQAAAKAFAHQAEAFAHAAQAKAAAFgJIAAgcQgFgJgKAAQgHAAgEAHg");
	this.shape_41.setTransform(23.725,25.45);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AAOAgIAAgpQAAgHgDgDQgDgDgGAAQgFAAgDADQgEADgDAEIAAAsIgLAAIAAg+IALAAIAAAIQAHgJALAAQAUAAAAAWIAAApg");
	this.shape_42.setTransform(145.35,8.275);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_43.setTransform(138.975,8.325);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AAhAgIAAgpQAAgGgCgEQgDgDgIAAQgGAAgEAEQgEADgBAGIAAApIgJAAIAAgoQAAgOgOAAQgLAAgDAJIAAAtIgLAAIAAg+IAKAAIAAAHQAHgIAMAAQANAAAEAKQAEgFAFgDQAFgCAGAAQAVAAAAAWIAAApg");
	this.shape_44.setTransform(130.5,8.275);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgMAqQgHgDgDgFIAFgHQAHAJAKAAQAHAAAFgFQAEgEAAgIIAAgGQgGAIgLAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQALAAAHAIIAAgHIAKAAIAAA9QAAANgHAHQgIAHgMAAQgGAAgGgDgAgKgcQgFAGAAAMQAAAKAFAGQAEAGAHAAQAKAAAFgKIAAgcQgFgJgKAAQgHAAgEAHg");
	this.shape_45.setTransform(121.725,9.525);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_46.setTransform(115.425,8.325);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_47.setTransform(109.075,8.325);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgOAgIAAg+IALAAIAAAHQAEgIAKAAIAEABIAAAKIgFgBQgKAAgDAJIAAAsg");
	this.shape_48.setTransform(104.3,8.275);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_49.setTransform(98.875,8.325);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgQAlIAAAIIgKAAIAAhZIALAAIAAAhQAGgIALAAQAMAAAGAJQAHAIAAAOIAAABQAAAPgHAJQgHAJgLAAQgKAAgIgJgAgPAAIAAAbQAFAKAKAAQAIAAADgHQAFgFAAgNQAAgLgEgFQgEgGgIAAQgLAAgEAKg");
	this.shape_50.setTransform(92.4,7.05);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AAOAtIAAgqQAAgGgDgDQgDgDgHgBQgEAAgDADQgEADgDAEIAAAtIgLAAIAAhZIALAAIAAAiQAHgJALAAQAUAAAAAWIAAAqg");
	this.shape_51.setTransform(82.65,7);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgTAbQgFgGAAgMIAAgoIALAAIAAAoQAAAOALAAQAMAAAEgJIAAgtIALAAIAAA+IgLAAIAAgGQgGAHgLAAQgKAAgGgFg");
	this.shape_52.setTransform(76.05,8.375);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgPAlIgBAIIgKAAIAAhZIALAAIAAAhQAHgIAKAAQALAAAHAJQAHAIAAAOIAAABQAAAPgHAJQgGAJgLAAQgMAAgGgJgAgPAAIAAAbQAFAKAKAAQAHAAAFgHQAEgFAAgNQAAgLgEgFQgFgGgHAAQgKAAgFAKg");
	this.shape_53.setTransform(69.5,7.05);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgTAbQgFgGAAgMIAAgoIALAAIAAAoQAAAOAMAAQALAAAEgJIAAgtIALAAIAAA+IgKAAIAAgGQgHAHgLAAQgLAAgFgFg");
	this.shape_54.setTransform(62.7,8.375);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_55.setTransform(57.275,7.625);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AANAtIgVgdIgHAHIAAAWIgKAAIAAhZIAKAAIAAA1IAHgGIASgVIAOAAIgYAaIAaAlg");
	this.shape_56.setTransform(49.9,7);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgSAbQgGgGAAgMIAAgoIALAAIAAAoQAAAOAMAAQALAAAEgJIAAgtIALAAIAAA+IgKAAIAAgGQgHAHgLAAQgLAAgEgFg");
	this.shape_57.setTransform(43.15,8.375);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_58.setTransform(37.725,7.625);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AAOAgIAAgpQAAgHgDgDQgDgDgHAAQgEAAgEADQgEADgCAEIAAAsIgLAAIAAg+IALAAIAAAIQAHgJALAAQAUAAAAAWIAAApg");
	this.shape_59.setTransform(32.65,8.275);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_60.setTransform(26.275,8.325);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgcArIAAhVIAcAAQANAAAGAGQAIAGgBALQAAAGgCAFQgEAEgGADQAHABAEAFQAEAGAAAHQAAAMgHAGQgIAHgOAAgAgRAiIARAAQAJAAAEgEQAEgFAAgHQAAgPgQAAIgSAAgAgRgFIARAAQAHAAAEgEQAEgEABgGQAAgHgFgDQgEgDgHAAIgRAAg");
	this.shape_61.setTransform(19.5,7.225);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FF8C2D").s().p("As0ELIAAoVIZpAAIAAIVg");
	this.shape_62.setTransform(82.125,25.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_3
	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("rgba(0,0,0,0.227)").s().p("As0ELIAAoVIZpAAIAAIVg");
	this.shape_63.setTransform(74.075,33.15);
	this.shape_63._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_63).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8,-1.9,173.3,61.8);


(lib.drag2G4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("As0kKIZpAAIAAIVI5pAAg");
	this.shape.setTransform(82.125,26.7);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAGgDAGAAQAMAAAFAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgOANQgBAFAEADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgIAAQgUAAABAMg");
	this.shape_1.setTransform(106.1,46.775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABAAAAgBQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAgBgBg");
	this.shape_2.setTransform(101.425,45.625);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgTAkQgHgJAAgOIAAgBQAAgOAHgIQAHgJALAAQAKAAAHAIIAAghIALAAIAABZIgKAAIgBgIQgGAJgLgBQgLABgHgKgAgKgDQgFAFAAAMQAAAKAFAGQAEAHAHgBQAKAAAFgJIAAgcQgFgJgKAAQgHAAgEAHg");
	this.shape_3.setTransform(96.425,45.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgUAYQgIgJAAgPIAAAAQAAgJAEgHQADgIAHgEQAGgEAIAAQANAAAIAJQAIAJAAAOIAAABQAAAJgEAHQgDAIgHAEQgGAEgJAAQgMAAgIgJgAgMgRQgFAHAAALQAAAKAFAHQAFAGAHAAQAIAAAFgGQAFgHAAgLQAAgKgFgGQgFgHgIAAQgHAAgFAGg");
	this.shape_4.setTransform(89.775,46.775);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgaAsIAAhXIAKAAIAAAHQAIgHAKgBQALAAAHAJQAHAIAAAQIAAABQAAAOgHAJQgHAIgLAAQgLAAgGgHIAAAegAgPgaIAAAeQAFAIAKABQAHAAAEgHQAFgGAAgLQAAgLgFgGQgEgHgHAAQgKABgFAIg");
	this.shape_5.setTransform(83.1,47.95);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAFgDAGAAQAMAAAFAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgOANQAAAFADADQAEACAFAAQAEAAAEgCQAFgDACgEIAAgNIgIAAQgUAAABAMg");
	this.shape_6.setTransform(76.3,46.775);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgOAgIAAg+IALAAIAAAHQAEgIAJAAIAGABIAAAKIgGgBQgKAAgDAJIAAAsg");
	this.shape_7.setTransform(71.35,46.725);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAHgDAGAAQAKAAAGAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgOANQgBAFAEADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgIAAQgTAAAAAMg");
	this.shape_8.setTransform(65.7,46.775);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgaAsIAAhXIAKAAIAAAHQAIgHAKgBQAMAAAGAJQAHAIAAAQIAAABQAAAOgHAJQgGAIgMAAQgLAAgGgHIAAAegAgPgaIAAAeQAFAIAKABQAGAAAGgHQAEgGAAgLQAAgLgEgGQgFgHgHAAQgKABgFAIg");
	this.shape_9.setTransform(59.2,47.95);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGAMAAIALAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAGgDAFAAQAMAAAFAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgPANQAAAFAEADQAEACAFAAQAEAAAFgCQAEgDACgEIAAgNIgIAAQgUAAAAAMg");
	this.shape_10.setTransform(136.95,28.375);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgaAtIAAhYIAKAAIAAAIQAIgJAKABQAMAAAGAIQAHAJAAAPIAAABQAAAOgHAIQgGAJgMAAQgLAAgGgHIAAAfgAgPgZIAAAcQAFAKAKgBQAHAAAEgGQAFgGAAgLQAAgLgFgGQgEgGgHAAQgKgBgFAKg");
	this.shape_11.setTransform(130.45,29.55);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgTAbQgFgGAAgMIAAgoIALAAIAAAoQAAAOALAAQAMAAAEgJIAAgtIALAAIAAA+IgLAAIAAgGQgGAHgLAAQgKAAgGgFg");
	this.shape_12.setTransform(123.65,28.425);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IALAAIAAAHQAFgIAJAAIAGABIAAAKIgGgBQgKAAgEAJIAAAsg");
	this.shape_13.setTransform(118.65,28.325);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_14.setTransform(113.225,28.375);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgPAlIgBAIIgKAAIAAhZIALAAIAAAhQAGgIALAAQALAAAIAIQAGAKAAAOIAAAAQAAAPgHAJQgGAJgLAAQgMAAgGgJgAgPAAIAAAbQAFAJAKABQAIgBAEgGQAEgFAAgMQAAgMgEgFQgFgGgHAAQgKAAgFAKg");
	this.shape_15.setTransform(106.75,27.1);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AANAtIgUgdIgHAHIAAAWIgLAAIAAhZIALAAIAAA1IAFgHIATgUIANAAIgYAaIAbAlg");
	this.shape_16.setTransform(97.65,27.05);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAHgDAGAAQAKAAAGAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgOANQgBAFAEADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgJAAQgSAAAAAMg");
	this.shape_17.setTransform(90.9,28.375);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgOAgIAAg+IAKAAIAAAHQAFgIAKAAIAEABIAAAKIgFgBQgKAAgEAJIAAAsg");
	this.shape_18.setTransform(85.95,28.325);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_19.setTransform(80.525,28.375);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgMAqQgHgDgDgFIAFgHQAHAJAKAAQAHAAAFgFQAEgEAAgIIAAgGQgGAIgLAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQALAAAHAIIAAgHIAKAAIAAA9QAAANgHAHQgIAHgMAAQgGAAgGgDgAgKgcQgFAGAAAMQAAAKAFAGQAEAGAHAAQAKAAAFgKIAAgcQgFgJgKAAQgHAAgEAHg");
	this.shape_20.setTransform(73.775,29.575);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_21.setTransform(65.475,27.675);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGANAAIAKAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAHgDAGAAQAKAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgOANQAAAFADADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgJAAQgSAAAAAMg");
	this.shape_22.setTransform(60.4,28.375);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgEAtIAAhZIAJAAIAABZg");
	this.shape_23.setTransform(55.7,27.05);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGANAAIAKAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAHgDAGAAQAKAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgOANQAAAFADADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgJAAQgSAAAAAMg");
	this.shape_24.setTransform(50.95,28.375);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AAOAgIAAgpQAAgHgDgDQgDgDgHAAQgEAAgEADQgEADgCAEIAAAsIgLAAIAAg+IAKAAIABAIQAHgJALAAQAUAAAAAWIAAApg");
	this.shape_25.setTransform(41.45,28.325);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGAMAAIALAAIAAgFQAAgFgDgEQgDgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAGgDAHAAQAKAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgPANQABAFADADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgJAAQgSAAgBAMg");
	this.shape_26.setTransform(34.85,28.375);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgTAlQgHgJAAgPIAAAAQAAgOAHgJQAHgJALAAQAKAAAHAHIAAggIALAAIAABZIgKAAIgBgHQgGAHgLABQgLgBgHgIgAgKgEQgFAGAAALQAAAMAFAFQAEAGAHABQAKAAAFgKIAAgcQgFgJgKAAQgHAAgEAGg");
	this.shape_27.setTransform(28.075,27.1);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGANAAIAKAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAHgDAGAAQAKAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgOANQAAAFADADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgJAAQgSAAAAAMg");
	this.shape_28.setTransform(142.75,9.975);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_29.setTransform(137.375,9.275);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAHgDAGAAQAKAAAGAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgOANQgBAFAEADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgJAAQgSAAAAAMg");
	this.shape_30.setTransform(132.3,9.975);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AAiAgIAAgpQAAgGgEgEQgDgDgHAAQgGAAgEAEQgEADAAAGIAAApIgLAAIAAgoQAAgOgNAAQgKAAgFAJIAAAtIgLAAIAAg+IALAAIAAAHQAHgIAMAAQAOAAADAKQADgFAFgDQAGgCAHAAQAUAAABAWIAAApg");
	this.shape_31.setTransform(123.8,9.925);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgUAYQgIgJAAgPIAAAAQAAgJAEgHQADgIAHgEQAGgEAIAAQANAAAIAJQAIAJAAAOIAAABQAAAJgEAHQgDAIgHAEQgGAEgJAAQgMAAgIgJgAgMgRQgFAHAAALQAAAKAFAHQAFAGAHAAQAIAAAFgGQAFgHAAgLQAAgKgFgGQgFgHgIAAQgHAAgFAGg");
	this.shape_32.setTransform(115.125,9.975);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgEAtIAAhZIAJAAIAABZg");
	this.shape_33.setTransform(110.25,8.65);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_34.setTransform(105.725,9.975);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_35.setTransform(99.375,9.975);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AAOAtIAAgqQAAgGgDgDQgDgEgHAAQgEABgEADQgEADgCADIAAAtIgLAAIAAhZIALAAIAAAiQAIgIAKgBQAUABAAAVIAAAqg");
	this.shape_36.setTransform(90.05,8.65);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgSAbQgGgGAAgMIAAgoIALAAIAAAoQAAAOALAAQAMAAAEgJIAAgtIALAAIAAA+IgLAAIAAgGQgGAHgLAAQgLAAgEgFg");
	this.shape_37.setTransform(83.45,10.025);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgQAlIAAAHIgKAAIAAhZIALAAIAAAiQAGgIALAAQAMAAAGAJQAHAIAAAPIAAABQAAAOgHAJQgHAIgLAAQgKAAgIgIgAgPAAIAAAaQAFALAKgBQAHAAAEgFQAFgHAAgLQAAgMgEgFQgFgGgHAAQgLAAgEAKg");
	this.shape_38.setTransform(76.9,8.7);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgTAbQgFgGAAgMIAAgoIALAAIAAAoQAAAOALAAQAMAAAEgJIAAgtIALAAIAAA+IgLAAIAAgGQgGAHgLAAQgKAAgGgFg");
	this.shape_39.setTransform(70.1,10.025);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_40.setTransform(64.675,9.275);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGAMAAIALAAIAAgFQAAgFgEgEQgDgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAFgDAHAAQAKAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgPANQABAFADADQAEACAFAAQAEAAAFgCQAEgDACgEIAAgNIgJAAQgSAAgBAMg");
	this.shape_41.setTransform(56.65,9.975);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgMAqQgHgDgDgFIAFgHQAHAJAKAAQAHAAAFgFQAEgEAAgIIAAgGQgGAIgLAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQALAAAHAIIAAgHIAKAAIAAA9QAAANgHAHQgIAHgMAAQgGAAgGgDgAgKgcQgFAGAAAMQAAAKAFAGQAEAGAHAAQAKAAAFgKIAAgcQgFgJgKAAQgHAAgEAHg");
	this.shape_42.setTransform(49.875,11.175);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgMAqQgHgDgDgFIAFgHQAHAJAKAAQAHAAAFgFQAEgEAAgIIAAgGQgGAIgLAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQALAAAHAIIAAgHIAKAAIAAA9QAAANgHAHQgIAHgMAAQgGAAgGgDgAgKgcQgFAGAAAMQAAAKAFAGQAEAGAHAAQAKAAAFgKIAAgcQgFgJgKAAQgHAAgEAHg");
	this.shape_43.setTransform(43.125,11.175);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AAOAgIAAgpQAAgHgDgDQgDgDgHAAQgEAAgEADQgEADgCAEIAAAsIgLAAIAAg+IALAAIAAAIQAHgJALAAQAUAAAAAWIAAApg");
	this.shape_44.setTransform(36.6,9.925);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgUAYQgIgJAAgPIAAAAQAAgJAEgHQADgIAHgEQAGgEAIAAQANAAAIAJQAIAJAAAOIAAABQAAAJgEAHQgDAIgHAEQgGAEgJAAQgMAAgIgJgAgMgRQgFAHAAALQAAAKAFAHQAFAGAHAAQAIAAAFgGQAFgHAAgLQAAgKgFgGQgFgHgIAAQgHAAgFAGg");
	this.shape_45.setTransform(29.875,9.975);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AATArIgTgjIgTAAIAAAjIgLAAIAAhVIAcAAQANAAAJAHQAHAHAAAMQAAAIgEAGQgFAFgHADIAUAkIAAABgAgTAAIARAAQAIAAAFgEQAFgFgBgHQABgIgFgEQgEgEgJAAIgRAAg");
	this.shape_46.setTransform(23.15,8.875);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FF8C2D").s().p("As0ELIAAoVIZpAAIAAIVg");
	this.shape_47.setTransform(82.125,26.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_3
	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("rgba(0,0,0,0.227)").s().p("As0ELIAAoVIZpAAIAAIVg");
	this.shape_48.setTransform(74.075,33.15);
	this.shape_48._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_48).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8,-1,173.3,60.9);


(lib.drag2G3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("As0kKIZpAAIAAIVI5pAAg");
	this.shape.setTransform(82.125,26.7);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgEAtIAAhZIAJAAIAABZg");
	this.shape_1.setTransform(110.7,45.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGAMAAIALAAIAAgFQAAgFgDgEQgDgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAGgDAHAAQAKAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgOANQAAAFADADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgJAAQgSAAAAAMg");
	this.shape_2.setTransform(105.95,46.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IALAAIAAAHQAFgIAKAAIAEABIAAAKIgFgBQgKAAgEAJIAAAsg");
	this.shape_3.setTransform(101,46.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAOAtIgWgeIgHAIIAAAWIgKAAIAAhZIAKAAIAAA2IAGgHIATgVIAOAAIgZAaIAbAlg");
	this.shape_4.setTransform(96,45.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGAMAAIALAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAGgDAFAAQAMAAAFAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgPANQAAAFAEADQAEACAFAAQAEAAAFgCQAEgDACgEIAAgNIgIAAQgUAAAAAMg");
	this.shape_5.setTransform(89.25,46.775);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgFAtIAAhZIALAAIAABZg");
	this.shape_6.setTransform(84.55,45.45);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgTAbQgFgGAAgMIAAgoIALAAIAAAoQAAAOAMAAQALAAAEgJIAAgtIALAAIAAA+IgKAAIAAgGQgHAHgLAAQgLAAgFgFg");
	this.shape_7.setTransform(79.8,46.825);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgPAlIgBAIIgKAAIAAhZIALAAIAAAhQAHgIAKAAQALAAAIAJQAGAIAAAOIAAACQAAAOgHAJQgHAIgKAAQgMAAgGgIgAgPAAIAAAaQAFALAKgBQAHABAFgHQAEgGAAgMQAAgLgEgFQgEgGgIAAQgKAAgFAKg");
	this.shape_8.setTransform(73.25,45.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAiAgIAAgpQAAgGgDgEQgEgDgHAAQgGAAgEAEQgEADAAAGIAAApIgKAAIAAgoQAAgOgOAAQgKAAgFAJIAAAtIgLAAIAAg+IALAAIAAAHQAHgIAMAAQAOAAADAKQADgFAFgDQAFgCAIAAQAUAAAAAWIAAApg");
	this.shape_9.setTransform(64.5,46.725);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGAMAAIALAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAGgDAFAAQAMAAAFAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgPANQAAAFAEADQAEACAFAAQAEAAAFgCQAEgDACgEIAAgNIgIAAQgUAAAAAMg");
	this.shape_10.setTransform(55.95,46.775);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABAAAAgBQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAABQAAAAgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBg");
	this.shape_11.setTransform(131.025,27.225);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AANAtIgUgdIgHAHIAAAWIgLAAIAAhZIALAAIAAA1IAFgHIATgUIANAAIgYAaIAbAlg");
	this.shape_12.setTransform(126.9,27.05);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAHgDAGAAQAKAAAGAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgOANQgBAFAEADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgJAAQgSAAAAAMg");
	this.shape_13.setTransform(120.15,28.375);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AANAtIgUgdIgIAHIAAAWIgKAAIAAhZIAKAAIAAA1IAHgHIASgUIAOAAIgYAaIAaAlg");
	this.shape_14.setTransform(114.25,27.05);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AAOAtIgWgdIgGAHIAAAWIgLAAIAAhZIALAAIAAA1IAFgHIATgUIANAAIgYAaIAbAlg");
	this.shape_15.setTransform(105.2,27.05);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAGgDAGAAQAMAAAFAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgOANQgBAFAEADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgIAAQgUAAABAMg");
	this.shape_16.setTransform(98.45,28.375);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgOAgIAAg+IALAAIAAAHQAEgIAKAAIAEABIAAAKIgFgBQgKAAgDAJIAAAsg");
	this.shape_17.setTransform(93.5,28.325);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_18.setTransform(88.075,28.375);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgMAqQgHgDgDgFIAFgHQAHAJAKAAQAHAAAFgFQAEgEAAgIIAAgGQgGAIgLAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQALAAAHAIIAAgHIAKAAIAAA9QAAANgHAHQgIAHgMAAQgGAAgGgDgAgKgcQgFAGAAAMQAAAKAFAGQAEAGAHAAQAKAAAFgKIAAgcQgFgJgKAAQgHAAgEAHg");
	this.shape_19.setTransform(81.325,29.575);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_20.setTransform(73.025,27.675);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAHgDAGAAQAKAAAGAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgJAAQgKAAgGgFgAgOANQgBAFAEADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgIAAQgTAAAAAMg");
	this.shape_21.setTransform(67.95,28.375);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgEAtIAAhZIAKAAIAABZg");
	this.shape_22.setTransform(63.25,27.05);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAHgDAGAAQAKAAAGAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgOANQgBAFAEADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgIAAQgTAAAAAMg");
	this.shape_23.setTransform(58.5,28.375);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AAOAgIAAgpQAAgHgDgDQgDgDgHAAQgEAAgEADQgDADgDAEIAAAsIgLAAIAAg+IAKAAIABAIQAHgJALAAQAUAAAAAWIAAApg");
	this.shape_24.setTransform(49,28.325);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGANAAIAKAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAHgDAGAAQAKAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgOANQAAAFADADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgJAAQgSAAAAAMg");
	this.shape_25.setTransform(42.4,28.375);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgTAlQgHgJAAgPIAAAAQAAgOAHgJQAHgJALAAQAKAAAHAHIAAggIALAAIAABZIgKAAIgBgHQgGAHgLABQgLgBgHgIgAgKgEQgFAGAAALQAAAMAFAFQAEAGAHABQAKAAAFgKIAAgcQgFgJgKAAQgHAAgEAGg");
	this.shape_26.setTransform(35.625,27.1);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAHgDAGAAQAKAAAGAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgOANQgBAFAEADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgJAAQgSAAAAAMg");
	this.shape_27.setTransform(142.65,9.975);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_28.setTransform(137.275,9.275);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAFgCQAGgDAGAAQAMAAAFAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgOANQgBAFAEADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgIAAQgUAAABAMg");
	this.shape_29.setTransform(132.2,9.975);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AAiAgIAAgpQAAgGgEgEQgDgDgHAAQgGAAgEAEQgEADAAAGIAAApIgLAAIAAgoQAAgOgNAAQgKAAgFAJIAAAtIgLAAIAAg+IALAAIAAAHQAHgIAMAAQANAAAEAKQAEgFAEgDQAGgCAHAAQAUAAABAWIAAApg");
	this.shape_30.setTransform(123.7,9.925);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgUAYQgIgJAAgPIAAAAQAAgJAEgHQADgIAHgEQAGgEAIAAQANAAAIAJQAIAJAAAOIAAABQAAAJgEAHQgDAIgHAEQgGAEgJAAQgMAAgIgJgAgMgRQgFAHAAALQAAAKAFAHQAFAGAHAAQAIAAAFgGQAFgHAAgLQAAgKgFgGQgFgHgIAAQgHAAgFAGg");
	this.shape_31.setTransform(115.025,9.975);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgEAtIAAhZIAJAAIAABZg");
	this.shape_32.setTransform(110.15,8.65);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_33.setTransform(105.625,9.975);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_34.setTransform(99.275,9.975);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AAOAtIAAgqQAAgGgDgDQgDgEgHAAQgEABgEADQgDADgDADIAAAtIgLAAIAAhZIALAAIAAAiQAHgIALgBQAUABAAAVIAAAqg");
	this.shape_35.setTransform(89.95,8.65);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgTAbQgFgGAAgMIAAgoIALAAIAAAoQAAAOALAAQAMAAAEgJIAAgtIALAAIAAA+IgLAAIAAgGQgGAHgLAAQgKAAgGgFg");
	this.shape_36.setTransform(83.35,10.025);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgPAlIgBAHIgKAAIAAhZIALAAIAAAiQAGgIALAAQALAAAHAJQAHAIAAAPIAAABQAAAOgHAJQgHAIgLAAQgKAAgHgIgAgPAAIAAAaQAFALAKgBQAHAAAEgFQAFgHAAgLQAAgMgEgFQgFgGgHAAQgLAAgEAKg");
	this.shape_37.setTransform(76.8,8.7);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgTAbQgFgGAAgMIAAgoIALAAIAAAoQAAAOALAAQAMAAAEgJIAAgtIALAAIAAA+IgKAAIAAgGQgHAHgLAAQgKAAgGgFg");
	this.shape_38.setTransform(70,10.025);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_39.setTransform(64.575,9.275);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGAMAAIALAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAGgDAHAAQAKAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgPANQABAFADADQAEACAFAAQAEAAAFgCQAEgDACgEIAAgNIgJAAQgSAAgBAMg");
	this.shape_40.setTransform(56.55,9.975);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgMAqQgHgDgDgFIAFgHQAHAJAKAAQAHAAAFgFQAEgEAAgIIAAgGQgGAIgLAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQALAAAHAIIAAgHIAKAAIAAA9QAAANgHAHQgIAHgMAAQgGAAgGgDgAgKgcQgFAGAAAMQAAAKAFAGQAEAGAHAAQAKAAAFgKIAAgcQgFgJgKAAQgHAAgEAHg");
	this.shape_41.setTransform(49.775,11.175);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgMAqQgHgDgDgFIAFgHQAHAJAKAAQAHAAAFgFQAEgEAAgIIAAgGQgGAIgLAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQALAAAHAIIAAgHIAKAAIAAA9QAAANgHAHQgIAHgMAAQgGAAgGgDgAgKgcQgFAGAAAMQAAAKAFAGQAEAGAHAAQAKAAAFgKIAAgcQgFgJgKAAQgHAAgEAHg");
	this.shape_42.setTransform(43.025,11.175);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AAOAgIAAgpQAAgHgDgDQgDgDgHAAQgEAAgEADQgEADgCAEIAAAsIgLAAIAAg+IAKAAIABAIQAHgJALAAQAUAAAAAWIAAApg");
	this.shape_43.setTransform(36.5,9.925);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgUAYQgIgJAAgPIAAAAQAAgJAEgHQADgIAHgEQAGgEAIAAQANAAAIAJQAIAJAAAOIAAABQAAAJgEAHQgDAIgHAEQgGAEgJAAQgMAAgIgJgAgMgRQgFAHAAALQAAAKAFAHQAFAGAHAAQAIAAAFgGQAFgHAAgLQAAgKgFgGQgFgHgIAAQgHAAgFAGg");
	this.shape_44.setTransform(29.775,9.975);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AATArIgTgjIgTAAIAAAjIgLAAIAAhVIAcAAQANAAAJAHQAHAHAAAMQAAAIgEAGQgFAFgHADIAUAkIAAABgAgTAAIARAAQAIAAAFgEQAFgFgBgHQABgIgFgEQgEgEgJAAIgRAAg");
	this.shape_45.setTransform(23.05,8.875);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FF8C2D").s().p("As0ELIAAoVIZpAAIAAIVg");
	this.shape_46.setTransform(82.125,26.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_3
	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("rgba(0,0,0,0.227)").s().p("As0ELIAAoVIZpAAIAAIVg");
	this.shape_47.setTransform(74.075,33.15);
	this.shape_47._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_47).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8,-1,173.3,60.9);


(lib.drag2G2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("As0kKIZpAAIAAIVI5pAAg");
	this.shape.setTransform(82.125,26.7);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAOAtIAAgqQAAgGgDgDQgDgEgGAAQgFABgDADQgEADgDADIAAAtIgLAAIAAhZIALAAIAAAiQAIgIAKgBQAUABAAAVIAAAqg");
	this.shape_1.setTransform(128.15,36.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGAMAAIALAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAGgDAFAAQAMAAAFAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgPANQAAAFAEADQADACAGAAQAEAAAFgCQAEgDACgEIAAgNIgIAAQgUAAAAAMg");
	this.shape_2.setTransform(121.55,37.425);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAOAgIAAgpQAAgHgDgDQgDgDgHAAQgEAAgEADQgEADgCAEIAAAsIgLAAIAAg+IALAAIAAAIQAHgJALAAQAUAAAAAWIAAApg");
	this.shape_3.setTransform(115,37.375);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGAMAAIALAAIAAgFQAAgFgEgEQgDgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAFgDAGAAQALAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgPANQABAFADADQADACAGAAQAEAAAFgCQAEgDACgEIAAgNIgJAAQgSAAgBAMg");
	this.shape_4.setTransform(108.4,37.425);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_5.setTransform(103.025,36.725);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABgBAAAAQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAABAAAAQAAABAAABQAAAAgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAgBgBg");
	this.shape_6.setTransform(96.875,36.275);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgTAkQgHgIAAgPIAAAAQAAgPAHgIQAHgJALAAQAKAAAHAIIAAgiIALAAIAABZIgKAAIgBgHQgGAJgLgBQgLABgHgKgAgKgDQgFAEAAANQAAAKAFAHQAEAFAHAAQAKAAAFgJIAAgcQgFgJgKAAQgHAAgEAHg");
	this.shape_7.setTransform(91.875,36.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgaAsIAAhWIAKAAIABAGQAGgHALgBQAMAAAGAJQAHAIAAAQIAAABQAAANgHAKQgGAIgMAAQgLAAgGgHIAAAegAgPgaIAAAeQAFAIAKABQAHgBAFgGQAEgGAAgLQAAgLgEgGQgFgHgHAAQgKABgFAIg");
	this.shape_8.setTransform(82.45,38.6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgSAbQgGgGAAgMIAAgoIALAAIAAAoQAAAOAMAAQALAAAEgJIAAgtIALAAIAAA+IgKAAIAAgGQgHAHgLAAQgLAAgEgFg");
	this.shape_9.setTransform(75.65,37.475);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgTAkQgHgIAAgPIAAAAQAAgPAHgIQAHgJALAAQAKAAAHAIIAAgiIALAAIAABZIgKAAIgBgHQgGAJgLgBQgLABgHgKgAgKgDQgFAEAAANQAAAKAFAHQAEAFAHAAQAKAAAFgJIAAgcQgFgJgKAAQgHAAgEAHg");
	this.shape_10.setTransform(68.825,36.15);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABgBAAAAQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAABAAAAQAAABAAABQAAAAgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAgBgBg");
	this.shape_11.setTransform(64.175,36.275);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAOAtIAAgqQAAgGgDgDQgDgEgGAAQgFABgDADQgEADgDADIAAAtIgLAAIAAhZIALAAIAAAiQAIgIAKgBQAUABAAAVIAAAqg");
	this.shape_12.setTransform(59.4,36.1);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAOAgIAAgpQAAgHgDgDQgDgDgGAAQgFAAgDADQgEADgDAEIAAAsIgLAAIAAg+IALAAIAAAIQAHgJALAAQAUAAAAAWIAAApg");
	this.shape_13.setTransform(49.85,37.375);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGAMAAIALAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAGgDAFAAQAMAAAGAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgPANQAAAFAEADQADACAGAAQAEAAAFgCQAEgDACgEIAAgNIgIAAQgUAAAAAMg");
	this.shape_14.setTransform(43.25,37.425);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgTAkQgHgIAAgPIAAAAQAAgPAHgIQAHgJALAAQAKAAAHAIIAAgiIALAAIAABZIgKAAIgBgHQgGAJgLgBQgLABgHgKgAgKgDQgFAEAAANQAAAKAFAHQAEAFAHAAQAKAAAFgJIAAgcQgFgJgKAAQgHAAgEAHg");
	this.shape_15.setTransform(36.475,36.15);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAOAtIgWgdIgGAHIAAAWIgLAAIAAhZIALAAIAAA1IAFgHIATgUIAOAAIgZAaIAbAlg");
	this.shape_16.setTransform(150.2,17.7);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABAAAAgBQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBg");
	this.shape_17.setTransform(145.325,17.875);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_18.setTransform(141.725,18.325);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_19.setTransform(136.825,19.025);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGAMAAIALAAIAAgFQAAgFgEgEQgDgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAFgDAHAAQAKAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgPANQABAFADADQAEACAFAAQAEAAAFgCQAEgDACgEIAAgNIgJAAQgSAAgBAMg");
	this.shape_20.setTransform(130.45,19.025);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgFAtIAAhZIAKAAIAABZg");
	this.shape_21.setTransform(125.75,17.7);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgPAlIgBAIIgKAAIAAhZIALAAIAAAhQAHgIAKAAQALAAAIAIQAGAKAAANIAAABQAAAPgHAJQgGAJgLAAQgMAAgGgJgAgPAAIAAAbQAFAJAKABQAHAAAFgHQAEgFAAgNQAAgLgEgFQgEgGgIAAQgKAAgFAKg");
	this.shape_22.setTransform(121.05,17.75);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgUAYQgIgJAAgPIAAAAQAAgJAEgHQADgIAHgEQAGgEAIAAQANAAAIAJQAIAJAAAOIAAABQAAAJgEAHQgDAIgHAEQgGAEgJAAQgMAAgIgJgAgMgRQgFAHAAALQAAAKAFAHQAFAGAHAAQAIAAAFgGQAFgHAAgLQAAgKgFgGQgFgHgIAAQgHAAgFAGg");
	this.shape_23.setTransform(114.125,19.025);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgEAtIAAhZIAJAAIAABZg");
	this.shape_24.setTransform(109.25,17.7);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgaAtIAAhYIAKAAIAAAIQAIgJAKABQALAAAHAIQAHAJAAAPIAAABQAAAOgHAIQgHAJgLAAQgLAAgGgHIAAAfgAgPgaIAAAdQAFAJAKAAQAGABAFgHQAFgGAAgLQAAgLgFgGQgEgGgHgBQgKAAgFAJg");
	this.shape_25.setTransform(104.55,20.2);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABAAAAgBQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBg");
	this.shape_26.setTransform(99.625,17.875);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IAMAAIAAAHQAEgIAJAAIAGABIAAAKIgGgBQgKAAgDAJIAAAsg");
	this.shape_27.setTransform(96.45,18.975);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_28.setTransform(91.975,18.325);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AAOAtIAAgqQAAgGgDgDQgDgDgHgBQgEAAgEADQgEAEgCADIAAAtIgLAAIAAhZIALAAIAAAiQAHgJALABQAUgBAAAWIAAAqg");
	this.shape_29.setTransform(83.95,17.7);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgSAbQgGgGAAgMIAAgoIALAAIAAAoQAAAOAMAAQALAAAEgJIAAgtIALAAIAAA+IgKAAIAAgGQgHAHgLAAQgLAAgEgFg");
	this.shape_30.setTransform(77.35,19.075);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgQAlIAAAIIgKAAIAAhZIALAAIAAAhQAGgIALAAQAMAAAGAIQAHAKAAANIAAABQAAAPgHAJQgHAJgLAAQgKAAgIgJgAgPAAIAAAbQAFAJAKABQAIAAADgHQAFgFAAgNQAAgLgEgFQgEgGgIAAQgLAAgEAKg");
	this.shape_31.setTransform(70.8,17.75);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgTAbQgFgGAAgMIAAgoIALAAIAAAoQAAAOALAAQAMAAAEgJIAAgtIALAAIAAA+IgLAAIAAgGQgGAHgLAAQgKAAgGgFg");
	this.shape_32.setTransform(64,19.075);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_33.setTransform(58.575,18.325);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AAOAgIAAgpQAAgHgDgDQgDgDgHAAQgEAAgEADQgEADgCAEIAAAsIgLAAIAAg+IALAAIAAAIQAHgJALAAQAUAAAAAWIAAApg");
	this.shape_34.setTransform(50.55,18.975);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGAMAAIALAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAGgDAHAAQAKAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgPANQABAFADADQAEACAFAAQAEAAAFgCQAEgDACgEIAAgNIgJAAQgSAAgBAMg");
	this.shape_35.setTransform(43.95,19.025);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_36.setTransform(37.575,19.025);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABAAAAgBQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBg");
	this.shape_37.setTransform(33.075,17.875);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgaAtIAAhYIAKAAIABAIQAGgJALABQAMAAAGAIQAHAJAAAPIAAABQAAAOgHAIQgGAJgMAAQgKAAgHgHIAAAfgAgPgaIAAAdQAFAJAKAAQAGABAGgHQAEgGAAgLQAAgLgEgGQgFgGgHgBQgKAAgFAJg");
	this.shape_38.setTransform(28.35,20.2);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGAMAAIALAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAFgDAHAAQAKAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgPANQABAFADADQAEACAFAAQAEAAAFgCQAEgDACgEIAAgNIgJAAQgSAAgBAMg");
	this.shape_39.setTransform(21.55,19.025);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgZArIAAhVIALAAIAABMIAoAAIAAAJg");
	this.shape_40.setTransform(15.425,17.925);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FF8C2D").s().p("As0ELIAAoVIZpAAIAAIVg");
	this.shape_41.setTransform(82.125,26.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_3
	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("rgba(0,0,0,0.227)").s().p("As0ELIAAoVIZpAAIAAIVg");
	this.shape_42.setTransform(74.075,33.15);
	this.shape_42._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_42).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8,-1,173.3,60.9);


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


(lib.teksPengerjaan = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween1("synched",0);

	this.instance_1 = new lib.Tween2("synched",0);
	this.instance_1.setTransform(-12.55,0);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween3("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},14).to({state:[{t:this.instance_2}]},16).wait(5));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,x:-12.55},14).wait(21));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},14).to({_off:true,x:0},16).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-87.8,-10.4,163.1,20.8);


(lib.Slots6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// slots
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgfApQgIgHAAgMQABgQANgGQAMgJATAAIARAAIABgHQABgJgEgFQgFgFgIAAQgIAAgFADQgHAFgBAGIgQABQABgJAFgGQAGgHAJgDQAIgEAKAAQAOABAJAIQAIAJgBAPIgIAtIgBAIQAAAEACAFIgBABIgQAAIAAgEIAAgGQgNAMgOAAQgNAAgHgIgAgNAGQgIAFgBAIQgBAHAEAEQAEAFAHAAQAIABAGgFQAGgEAFgGIAEgTIgMAAQgOAAgIAEg");
	this.shape.setTransform(836.5291,244.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgOA1QgFgHABgLIAKg6IgRAAIACgNIARAAIAEgXIAPAAIgEAXIARAAIgCANIgSAAIgJA6IAAAEQABAHAGAAIAIgBIgBANQgGACgFAAQgKAAgEgHg");
	this.shape_1.setTransform(829.45,243.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgfApQgIgHAAgMQABgQANgGQAMgJATAAIARAAIABgHQABgJgEgFQgFgFgIAAQgIAAgFADQgHAFgBAGIgQABQABgJAFgGQAGgHAJgDQAIgEAKAAQAOABAJAIQAIAJgBAPIgIAtIgBAIQAAAEACAFIgBABIgQAAIAAgEIAAgGQgNAMgOAAQgNAAgHgIgAgNAGQgIAFgBAIQgBAHAEAEQAEAFAHAAQAIABAGgFQAGgEAFgGIAEgTIgMAAQgOAAgIAEg");
	this.shape_2.setTransform(821.1291,244.65);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAsAwIAKg9IAAgJQgCgMgOABQgIgBgHAFQgIAGgCAJIgKA+IgPAAIAKg9QABgKgEgFQgEgFgJAAQgOgBgJAOIgMBEIgQAAIAQhdIAPAAIgCAKQAMgNARAAQAJABAGAEQAGAEACAHQAOgQASAAQAOABAHAJQAHAKgCAPIgLA9g");
	this.shape_3.setTransform(808.5222,244.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgdAxIAQheIAOAAIgBALQAJgOAOABIAIABIgCAPIgHgBQgQAAgIAOIgLBDg");
	this.shape_4.setTransform(798.55,244.5491);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgeAkQgKgMABgVIABgDQABgOAHgLQAHgMAKgFQAKgGALgBQAOABAJAJQAIAKABAQIgBAMIgBAFIg9AAQgBANAGAKQAFAIAMABQANAAAMgNIAJAIQgGAIgJAGQgKAEgKAAQgSAAgKgNgAgJgcQgIAGgEAPIAtAAIAAgCQACgLgFgHQgFgIgJAAIgBAAQgJAAgGAHg");
	this.shape_5.setTransform(790.6152,244.65);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AglA6QgIgKgBgRIABgMQABgOAHgLQAGgMAJgGQAJgGALAAQAPABAIALIAKgyIAQAAIgYCGIgOAAIABgKQgKAMgQAAQgOAAgHgKgAgPgKQgIAGgDAJQgEALAAAMQAAAMAEAIQAFAHAJAAQANAAALgPIAHgrQgFgNgOABIAAgBQgJAAgGAGg");
	this.shape_6.setTransform(781.3167,242.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgaArQgIgHgEgKQgEgLABgNQABgOAHgMQAHgMAKgGQALgHALAAQAMABAJAGQAIAGAEALQAEAMgBANIAAABQgCANgGAMQgHALgKAHQgLAFgLAAQgMAAgJgGgAgOgZQgJAKgCAPIAAACIAAALQABALAFAFQAFAHAJAAQAHAAAHgEQAHgEAEgJQAFgIABgKIAAgNQgBgLgFgFQgFgHgJAAIgBAAQgLAAgIAKg");
	this.shape_7.setTransform(770.825,244.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAPAwIALg9IAAgIQgCgMgNAAQgNgBgLAQIgMBCIgQAAIARhdIAPAAIgCAMQAMgPAQAAQANABAHAJQAGAJgBAQIgLA9g");
	this.shape_8.setTransform(760.6391,244.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgSBBIAQheIAPAAIgPBegAADgvQgDgDAAgEQABgEACgDQADgCAEgBQAEAAADACQACADAAAEQAAAFgCACQgDADgEAAQgEAAgDgCg");
	this.shape_9.setTransform(754.225,242.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAPBDIALg+IAAgHQgCgMgNAAQgNgBgLAPIgMBDIgQAAIAYiGIAQAAIgKA0QAMgOAQAAQANABAHAJQAGAJgBAPIgLA+g");
	this.shape_10.setTransform(746.6391,242.65);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgYArQgIgGgEgKQgEgLABgOIABgDQABgOAHgLQAGgKAKgGQAKgGAMgBQAPABAJAJQAIALAAAOIgOAAQgBgJgFgGQgFgFgIgBQgMAAgIAJQgIAKgCAQIAAACIAAALQAAALAFAGQAGAGAJAAQAHAAAHgFQAHgFACgIIAPAAQgBAIgGAIQgGAIgJAEQgJADgIAAQgMAAgIgGg");
	this.shape_11.setTransform(737.6795,244.65);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgxBAIAWh/IBNAAIgCAOIg9AAIgHApIA1AAIgCANIg1AAIgIAtIA9AAIgCAOg");
	this.shape_12.setTransform(728.475,243);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAzAwIAAg+QAAgJgFgGQgFgEgLAAQgJAAgGAFQgGAFgBAJIAAA+IgPAAIAAg9QAAgVgUABQgQAAgGANIAABEIgRAAIAAhdIAQAAIAAAKQALgNASAAQATAAAHAQQAEgHAIgEQAIgFAKAAQAfAAABAiIAAA+g");
	this.shape_13.setTransform(710.575,244.55);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgdAnQgIgIAAgSIAAg8IARAAIAAA8QAAAVASABQARgBAGgOIAAhDIAQAAIAABdIgPAAIAAgJQgKALgRAAQgQAAgIgJg");
	this.shape_14.setTransform(697.75,244.75);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_15.setTransform(690.625,242.65);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_16.setTransform(686.275,242.65);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAFAAACADQACACABAEQgBAEgCADQgCADgFAAQgEAAgCgDg");
	this.shape_17.setTransform(681.95,242.925);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgmBAIAAh/IBOAAIAAAOIg+AAIAAAsIA1AAIAAAMIg1AAIAAA5g");
	this.shape_18.setTransform(675.25,243);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_19.setTransform(661.425,242.65);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_20.setTransform(654.1,242.925);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_21.setTransform(648.675,243.6);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgDAAgHQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgEgDgEQgEgGAAgHQAAgLAKgJQAKgHAPgBQAQAAAKAJQAKAIAAAOIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAHQgKAIgQAAQgKABgJgFg");
	this.shape_22.setTransform(641.325,244.65);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQADACgBAEQABAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_23.setTransform(634.55,242.925);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgWAwIAAhdIAPAAIABALQAHgOAOAAQAFAAADACIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_24.setTransform(629.8,244.55);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgbAlQgNgNAAgWIAAgCQABgNAFgMQAGgLAJgGQAKgHAKAAQATAAAKANQAKAMAAAXIAAAFIg/AAQAAAOAIAKQAIAIALAAQAJAAAGgEQAFgDAFgGIAKAIQgMASgYAAQgSAAgMgMgAgOgcQgHAIgBANIAuAAIAAgCQAAgMgGgHQgHgHgKAAQgJAAgGAHg");
	this.shape_25.setTransform(621.55,244.65);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_26.setTransform(613.475,243.6);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_27.setTransform(606.875,242.65);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdgBAAASg");
	this.shape_28.setTransform(596.775,244.65);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgWAwIAAhdIAPAAIABALQAHgOAPAAQAFAAACACIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_29.setTransform(589.35,244.55);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdgBAAASg");
	this.shape_30.setTransform(580.875,244.65);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AAdBAIgsg8IgRARIAAArIgQAAIAAh/IAQAAIAAA/IA4g/IAVAAIgyA5IA2BGg");
	this.shape_31.setTransform(571.15,243);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAMBAIAAgdIg5AAIAAgKIA4hYIASAAIAABUIARAAIAAAOIgRAAIAAAdgAAKglIglA6IAnAAIAAg+g");
	this.shape_32.setTransform(727.475,360.3);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgdA4QgLgKABgQIAQAAQgBAKAHAGQAHAGAKAAQALAAAHgGQAGgGAAgMQAAgLgHgGQgGgGgNAAIgLAAIAAgMIALAAQALAAAGgGQAHgGAAgKQAAgXgWAAQgKAAgGAGQgGAGAAAKIgRAAQAAgPALgKQAMgKAQAAQASAAAKAKQALAJAAARQAAAJgGAHQgGAIgJAEQALACAFAIQAHAIAAALQAAARgMAKQgLALgSAAQgRAAgMgKg");
	this.shape_33.setTransform(509.75,357.725);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgoBBIAAgMIAsgxQAKgKADgHQAEgHAAgIQAAgKgGgGQgGgHgJAAQgMAAgHAHQgHAHAAAMIgQAAQAAgRALgLQAMgLATAAQARAAAKAJQAKAKAAAPQAAATgYAZIghAlIA/AAIAAAOg");
	this.shape_34.setTransform(727.525,280.775);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AAIBAIAAhrIgfAMIAAgPIAtgRIACAAIAAB/g");
	this.shape_35.setTransform(516.25,280.825);

	this.kotakKartu2 = new lib.hasil();
	this.kotakKartu2.name = "kotakKartu2";
	this.kotakKartu2.setTransform(821.35,186.3,1,1,0,0,0,49.4,59.8);

	this.simetri = new lib.drop4G4();
	this.simetri.name = "simetri";
	this.simetri.setTransform(799.9,358.95,0.5226,0.5226,0,0,0,124.7,43.6);
	new cjs.ButtonHelper(this.simetri, 0, 1, 1);

	this.rongga = new lib.drop4G2();
	this.rongga.name = "rongga";
	this.rongga.setTransform(799.9,281.8,0.5226,0.5226,0,0,0,124.7,43.6);
	new cjs.ButtonHelper(this.rongga, 0, 1, 1);

	this.bentuk = new lib.drop4G3();
	this.bentuk.name = "bentuk";
	this.bentuk.setTransform(586,358.9,0.5226,0.5226,0,0,0,69.9,43.5);
	new cjs.ButtonHelper(this.bentuk, 0, 1, 1);

	this.lapisan = new lib.drop4G1();
	this.lapisan.name = "lapisan";
	this.lapisan.setTransform(589.85,281.8,0.5226,0.5226,0,0,0,124.7,43.6);
	new cjs.ButtonHelper(this.lapisan, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.lapisan},{t:this.bentuk},{t:this.rongga},{t:this.simetri},{t:this.kotakKartu2},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Slots6, new cjs.Rectangle(502.9,159.9,393.30000000000007,221.70000000000002), null);


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


(lib.Pieces6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// pieces
	this.simetri = new lib.drag2G8();
	this.simetri.name = "simetri";
	this.simetri.setTransform(311.95,445.8,0.9026,0.9026,0,0,0,82.1,26.7);
	new cjs.ButtonHelper(this.simetri, 0, 1, 2, false, new lib.drag2G8(), 3);

	this.drag2G1 = new lib.drag2G7();
	this.drag2G1.name = "drag2G1";
	this.drag2G1.setTransform(311.95,383.15,0.9026,0.9026,0,0,0,82.1,26.8);
	new cjs.ButtonHelper(this.drag2G1, 0, 1, 2, false, new lib.drag2G7(), 3);

	this.bentuk = new lib.drag2G6();
	this.bentuk.name = "bentuk";
	this.bentuk.setTransform(311.95,322.85,0.9026,0.9026,0,0,0,82.1,26.8);
	new cjs.ButtonHelper(this.bentuk, 0, 1, 2, false, new lib.drag2G6(), 3);

	this.drag2G1_1 = new lib.drag2G5();
	this.drag2G1_1.name = "drag2G1_1";
	this.drag2G1_1.setTransform(311.95,262.7,0.9026,0.9026,0,0,0,82.1,26.7);
	new cjs.ButtonHelper(this.drag2G1_1, 0, 1, 2, false, new lib.drag2G5(), 3);

	this.drag2G1_2 = new lib.drag2G4();
	this.drag2G1_2.name = "drag2G1_2";
	this.drag2G1_2.setTransform(137.05,446.55,0.9026,0.9026,0,0,0,82.1,26.7);
	new cjs.ButtonHelper(this.drag2G1_2, 0, 1, 2, false, new lib.drag2G4(), 3);

	this.rongga = new lib.drag2G3();
	this.rongga.name = "rongga";
	this.rongga.setTransform(137.05,385.05,0.9026,0.9026,0,0,0,82.1,26.7);
	new cjs.ButtonHelper(this.rongga, 0, 1, 2, false, new lib.drag2G3(), 3);

	this.drag2G1_3 = new lib.drag2G2();
	this.drag2G1_3.name = "drag2G1_3";
	this.drag2G1_3.setTransform(137.05,322.85,0.9026,0.9026,0,0,0,82.1,26.8);
	new cjs.ButtonHelper(this.drag2G1_3, 0, 1, 2, false, new lib.drag2G2(), 3);

	this.lapisan = new lib.drag3G1();
	this.lapisan.name = "lapisan";
	this.lapisan.setTransform(137.05,262.7,0.9026,0.9026,0,0,0,82.1,26.7);
	new cjs.ButtonHelper(this.lapisan, 0, 1, 2, false, new lib.drag3G1(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.lapisan},{t:this.drag2G1_3},{t:this.rongga},{t:this.drag2G1_2},{t:this.drag2G1_1},{t:this.bentuk},{t:this.drag2G1},{t:this.simetri}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces6, new cjs.Rectangle(55.7,236.9,331.40000000000003,239.6), null);


(lib.info = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween9("synched",0);

	this.instance_1 = new lib.Tween11("synched",0);
	this.instance_1.setTransform(0,-16);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween12("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},23).to({state:[{t:this.instance_2}]},24).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,y:-16},23).wait(25));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},23).to({_off:true,y:0},24).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-95.6,-26.4,191.3,36.8);


(lib.geser = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween4("synched",0);

	this.instance_1 = new lib.Tween5("synched",0);
	this.instance_1.setTransform(32.5,0);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween6("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},18).to({state:[{t:this.instance_2}]},19).wait(3));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,x:32.5},18).wait(22));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},18).to({_off:true,x:0},19).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29.4,-10.4,91.4,20.8);


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
	this.instance = new lib.Bitmap95();
	this.instance.setTransform(-147,-224,2.2294,2.2);

	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF83").s().p("AAYBqIAQhiIAAgMQgCgTgVAAQgWgBgQAYIgTBqIgZAAIAljTIAZAAIgPBRQATgVAZAAQAVAAALAOQAKAOgDAZIgQBig");
	this.shape.setTransform(116.725,150.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF83").s().p("AgYBMQgWgBgKgOQgLgPADgaIAQhgIAZAAIgQBhIAAALQAAAKAGAGQAFAGAJAAQAaABAPgXIAThsIAZAAIgaCVIgYAAIADgPQgRATgZAAIgBgBg");
	this.shape_1.setTransform(102.3417,154.0507);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF83").s().p("AAABsQgagBgNgUIgGASIgXAAIAmjUIAYAAIgOBPQARgUAZABQAWAAAMAQQAMAPABAaIgBASIAAACQgEAXgJATQgKASgOAJQgNAJgQAAIgCAAgAgYgCIgLBAQAIAXAXABQAOAAALgJQALgJAFgRQAGgRABgSQAAgTgHgLQgIgLgOAAIgBAAQgWAAgQAXg");
	this.shape_2.setTransform(86,150.9013);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF83").s().p("AgYBMQgWgBgKgOQgLgPADgaIAQhgIAZAAIgQBhIAAALQAAAKAGAGQAFAGAJAAQAaABAPgXIAThsIAZAAIgaCVIgYAAIADgPQgRATgZAAIgBgBg");
	this.shape_3.setTransform(71.3417,154.0507);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF83").s().p("AgXBUQgIgLACgSIAPhcIgaAAIAEgUIAaAAIAGglIAYAAIgHAlIAcAAIgDAUIgcAAIgPBcIAAAHQABALALAAIAMgCIgCAVQgKADgHgBQgQABgHgLg");
	this.shape_4.setTransform(59.25,152.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF83").s().p("AgdBmIAaiUIAYAAIgZCUgAAFhMQgEgEAAgGQAAgHAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAHgEAEQgEAEgHABQgGAAgEgFg");
	this.shape_5.setTransform(44.025,151.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFF83").s().p("AgvBNIAaiVIAXAAIgDARQAPgVAWABIAMACIgDAYIgLgCQgZAAgMAWIgTBqg");
	this.shape_6.setTransform(36.15,153.7494);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFF83").s().p("AgXBUQgHgLABgSIAQhcIgbAAIADgUIAaAAIAHglIAYAAIgGAlIAbAAIgEAUIgbAAIgOBcIAAAHQAAALAKAAIAMgCIgCAVQgJADgIgBQgOABgIgLg");
	this.shape_7.setTransform(26.8,152.2);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFF83").s().p("AgwA5QgQgUADggIABgFQACgVALgTQALgSAPgKQAQgJARAAQAXAAANAQQAOAPABAZQAAAJgBAJIgBAKIhhAAQgDAVAKAOQAJAOASABQAVABATgVIAOAMQgJAOgPAHQgPAIgRAAQgcgBgQgUgAgPguQgMALgHAXIBIAAIABgDQACgRgIgMQgIgLgOgBIgCAAQgNAAgLAKg");
	this.shape_8.setTransform(14.5414,153.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFF83").s().p("ABFBNIAQhiIAAgNQgDgTgWgBQgNAAgLAJQgMAJgDAOIgRBjIgYAAIAQhiQACgPgGgJQgHgIgNAAQgYgBgNAWIgTBtIgaAAIAaiVIAYAAIgDAQQATgUAaABQAPAAAJAGQAKAHADALQAVgZAdABQAXAAAKAPQALAPgDAYIgQBig");
	this.shape_9.setTransform(-5.676,153.7494);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFF83").s().p("AgdBmIAaiUIAYAAIgZCUgAAFhMQgEgEAAgGQAAgHAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAHgEAEQgEAEgHABQgGAAgEgFg");
	this.shape_10.setTransform(-20.325,151.15);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFF83").s().p("AgvBfQgPgIgJgNQgIgOABgSIAaAAQgBASALALQALAKAUABQATAAANgJQANgJACgPQADgWgagLIgXgIIgIgEQgogRACgiQACgRAKgMQAKgNARgHQARgHARAAQATAAAOAIQAOAIAIAOQAHAOAAARIgbAAQACgSgKgLQgKgKgSAAQgSAAgNAJQgMAJgCAQQgDAUAcALIAUAIIAKAEQAnARgDAjQgBASgKAMQgKAMgRAHQgRAHgTAAQgTgBgQgIg");
	this.shape_11.setTransform(-31.929,151.3233);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).to({state:[]},1).wait(12));

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
	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.instance = new lib._33();
	this.instance.setTransform(55,-219,0.637,1.0029);

	this.instance_1 = new lib.Bitmap92();
	this.instance_1.setTransform(-349,-220,2.2294,2.2);

	this.instance_2 = new lib._10();
	this.instance_2.setTransform(-349,-220,0.9475,1.2868);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance},{t:this.exit}]},12).to({state:[]},1).wait(12));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF83").s().p("AgdBmIAaiUIAYAAIgZCUgAAFhMQgEgEAAgGQAAgHAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAHgEAEQgEAEgHABQgGAAgEgFg");
	this.shape.setTransform(261.875,151.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF83").s().p("AguBAQgQgOABgVIAZAAQAAANAIAHQAIAIAOAAQANAAAKgGQAKgGABgLQACgPgTgGIgZgIQghgLABgaQABgTARgOQASgMAWAAQAXAAANANQAOANAAAVIgZAAQAAgLgHgHQgHgIgMAAQgNAAgJAHQgJAGgBAKQgCANASAGIALADQAaAIALAJQALAKgBAQQAAAPgJAKQgJAKgNAGQgOAFgOAAQgZAAgPgOg");
	this.shape_1.setTransform(250.7501,153.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF83").s().p("AAWBqIgmhEIgUARIgJAzIgZAAIAljTIAZAAIgVB+IAPgQIA0gvIAgAAIhFA/IAwBVg");
	this.shape_2.setTransform(237.3,150.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF83").s().p("AgYBMQgWgBgKgOQgLgPADgaIAQhgIAZAAIgQBhIAAALQAAAKAGAGQAFAGAJAAQAaABAPgXIAThsIAZAAIgaCVIgYAAIADgPQgRATgZAAIgBgBg");
	this.shape_3.setTransform(222.4417,154.0507);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF83").s().p("AgaBsQgVgBgMgQQgMgQgBgaIAAgUQADgWAKgSQAKgSAOgJQAPgKARABQAYAAANASIAPhOIAZAAIglDUIgXAAIADgQQgRATgZAAIgBAAgAgYgRQgMAKgGAQQgFARgBASQAAAUAHALQAIAKAOABQAVABARgXIAMhEQgIgVgWAAIgBAAQgOAAgKAIg");
	this.shape_4.setTransform(207.2417,150.9006);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF83").s().p("AgJBOQgTAAgNgLQgOgKgGgRQgGgRACgUQACgXAKgTQALgSAQgKQARgKATAAQATAAANAKQAOAKAGASQAHASgDAUIAAADQgCAVgLASQgKARgRAKQgQAKgRAAIgCAAgAgXgoQgOAPgDAZIAAADQgBAIABAKQABAQAJAKQAIAJAOABQAMAAAKgGQALgHAHgNQAHgOACgPIABgVQgCgRgJgKQgIgJgOgBIgCAAQgRAAgNAQg");
	this.shape_5.setTransform(190.7362,153.9001);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFF83").s().p("AgvBNIAaiVIAXAAIgCARQAOgVAWABIAMACIgDAYIgLgCQgZAAgMAWIgTBqg");
	this.shape_6.setTransform(178.7,153.7494);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFF83").s().p("AhIBpIAkjOIAWAAIgDAQQASgUAaABQAWAAAMAQQAMAPAAAbIgBASIAAACQgCAXgKASQgJASgPAJQgOAJgRAAQgZgBgOgRIgNBIgAgSg+IgNBHQAJAUAWABQARAAANgPQANgPAEgcIABgMQAAgUgIgLQgHgLgPAAIgBAAQgUAAgPAUg");
	this.shape_7.setTransform(164.65,156.6244);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFF83").s().p("AgwA5QgQgUADggIABgFQACgVALgTQALgSAPgKQAQgJARAAQAXAAANAQQAOAPABAZQAAAJgBAJIgBAKIhhAAQgDAVAKAOQAJAOASABQAVABATgVIAOAMQgJAOgPAHQgPAIgRAAQgcgBgQgUgAgPguQgMALgHAXIBIAAIABgDQACgRgIgMQgIgLgOgBIgCAAQgNAAgLAKg");
	this.shape_8.setTransform(150.5914,153.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFF83").s().p("AgvBNIAaiVIAXAAIgDARQAPgVAWABIAMACIgDAYIgMgCQgYAAgMAWIgTBqg");
	this.shape_9.setTransform(138.95,153.7494);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFF83").s().p("ABFBNIAQhiIAAgNQgDgTgWgBQgNAAgLAJQgMAJgDAOIgRBjIgYAAIAQhiQACgPgGgJQgHgIgNAAQgYgBgNAWIgTBtIgaAAIAaiVIAYAAIgDAQQATgUAaABQAPAAAJAGQAKAHADALQAVgZAdABQAXAAAKAPQALAPgDAYIgQBig");
	this.shape_10.setTransform(113.924,153.7494);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFF83").s().p("AgwA5QgQgUADggIABgFQACgVALgTQALgSAPgKQAQgJARAAQAXAAANAQQAOAPABAZQAAAJgBAJIgBAKIhhAAQgDAVAKAOQAJAOASABQAVABATgVIAOAMQgJAOgPAHQgPAIgRAAQgcgBgQgUgAgPguQgMALgHAXIBIAAIABgDQACgRgIgMQgIgLgOgBIgCAAQgNAAgLAKg");
	this.shape_11.setTransform(95.2414,153.9);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFF83").s().p("AgXBUQgIgLACgSIAPhcIgaAAIAEgUIAaAAIAGglIAYAAIgGAlIAbAAIgEAUIgbAAIgPBcIAAAHQACALAKAAIALgCIgBAVQgJADgIgBQgQABgHgLg");
	this.shape_12.setTransform(83.75,152.2);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFF83").s().p("AguBAQgQgOABgVIAZAAQAAANAIAHQAIAIAOAAQANAAAKgGQAKgGABgLQACgPgTgGIgZgIQghgLABgaQABgTARgOQASgMAVAAQAYAAAOANQAOANgBAVIgZAAQABgLgIgHQgHgIgNAAQgMAAgJAHQgIAGgCAKQgCANASAGIAMADQAaAIAKAJQALAKgBAQQgBAPgIAKQgJAKgNAGQgOAFgPAAQgXAAgQgOg");
	this.shape_13.setTransform(71.2501,153.9);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFF83").s().p("AgdBmIAaiUIAYAAIgZCUgAAFhMQgEgEAAgGQAAgHAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAHgEAEQgEAEgHABQgGAAgEgFg");
	this.shape_14.setTransform(61.175,151.15);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFF83").s().p("AguBAQgQgOABgVIAZAAQAAANAIAHQAIAIAOAAQANAAAKgGQAKgGABgLQACgPgTgGIgZgIQghgLABgaQABgTARgOQASgMAVAAQAYAAAOANQAOANgBAVIgZAAQABgLgIgHQgHgIgNAAQgMAAgJAHQgIAGgCAKQgCANASAGIAMADQAaAIAKAJQALAKgBAQQgBAPgIAKQgJAKgNAGQgOAFgPAAQgXAAgQgOg");
	this.shape_15.setTransform(50.1001,153.9);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFF83").s().p("AAYBNIAQhiIAAgMQgCgUgVAAQgVgBgRAZIgTBqIgZAAIAaiVIAYAAIgEATQATgXAaABQAVAAALAPQAKAOgDAZIgQBig");
	this.shape_16.setTransform(27.825,153.7495);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFF83").s().p("AgSBOQgUgBgMgMQgNgMABgTQACgYATgMQAUgNAfAAIAaAAIABgMQACgOgHgHQgGgIgOgBQgMAAgJAHQgKAGgCALIgaAAQACgNAJgKQAJgKAOgGQANgFAPAAQAXAAANAOQANAOgCAWIgMBKIgBAKQAAAIACAHIAAADIgaAAIgBgIIABgIQgUATgWAAIgBAAgAgWAJQgMAIgCAOQgBAKAGAHQAGAHAMAAQAMABAKgGQALgGAHgLIAGgfIgTAAQgXAAgNAHg");
	this.shape_17.setTransform(12.7596,153.9006);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFF83").s().p("AgaBsQgVgBgMgQQgMgQgBgaIAAgUQADgWAKgSQAKgSAOgJQAPgKARABQAYAAANASIAPhOIAZAAIglDUIgXAAIADgQQgRATgZAAIgBAAgAgYgRQgMAKgGAQQgFARgBASQAAAUAHALQAIAKAOABQAVABARgXIAMhEQgIgVgWAAIgBAAQgOAAgKAIg");
	this.shape_18.setTransform(-1.5083,150.9006);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFF83").s().p("AAYBqIAQhiIAAgMQgCgTgVAAQgWgBgQAYIgTBqIgZAAIAljTIAZAAIgPBRQATgVAZAAQAVAAALAOQAKAOgDAZIgQBig");
	this.shape_19.setTransform(-25.175,150.75);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFF83").s().p("AgYBMQgWgBgKgOQgLgPADgaIAQhgIAZAAIgQBhIAAALQAAAKAGAGQAFAGAJAAQAaABAPgXIAThsIAZAAIgaCVIgYAAIADgPQgRATgZAAIgBgBg");
	this.shape_20.setTransform(-39.5083,154.0507);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFF83").s().p("AAABsQgagBgNgUIgGASIgWAAIAljUIAZAAIgQBPQASgUAZABQAWAAAMAQQAMAPAAAaIAAASIAAACQgDAXgKATQgKASgOAJQgNAJgQAAIgCAAgAgYgCIgLBAQAIAXAXABQAOAAALgJQALgJAGgRQAFgRAAgSQABgTgHgLQgIgLgOAAIgBAAQgWAAgQAXg");
	this.shape_21.setTransform(-55.9,150.9013);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFF83").s().p("AgYBMQgWgBgKgOQgLgPADgaIAQhgIAZAAIgQBhIAAALQAAAKAGAGQAFAGAJAAQAaABAPgXIAThsIAZAAIgaCVIgYAAIADgPQgRATgZAAIgBgBg");
	this.shape_22.setTransform(-70.5083,154.0507);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFF83").s().p("AgXBUQgIgLACgSIAQhcIgbAAIADgUIAbAAIAGglIAYAAIgGAlIAbAAIgEAUIgbAAIgOBcIAAAHQABALAKAAIALgCIgCAVQgJADgIgBQgOABgIgLg");
	this.shape_23.setTransform(-82.65,152.2);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFF83").s().p("AAWBqIgmhEIgUARIgJAzIgYAAIAljTIAZAAIgXB+IAQgQIA0gvIAgAAIhEA/IAvBVg");
	this.shape_24.setTransform(-101.25,150.75);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFF83").s().p("AgYBMQgWgBgKgOQgLgPADgaIAQhgIAZAAIgQBhIAAALQAAAKAGAGQAFAGAJAAQAaABAPgXIAThsIAZAAIgaCVIgYAAIADgPQgRATgZAAIgBgBg");
	this.shape_25.setTransform(-116.1083,154.0507);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFF83").s().p("AgXBUQgIgLACgSIAPhcIgaAAIAEgUIAaAAIAGglIAYAAIgGAlIAbAAIgEAUIgbAAIgPBcIAAAHQACALAKAAIALgCIgBAVQgJADgIgBQgQABgHgLg");
	this.shape_26.setTransform(-128.2,152.2);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFF83").s().p("AAYBNIAQhiIAAgMQgCgUgVAAQgVgBgRAZIgTBqIgZAAIAaiVIAYAAIgEATQATgXAaABQAVAAALAPQAKAOgDAZIgQBig");
	this.shape_27.setTransform(-141.575,153.7495);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFF83").s().p("AgwA5QgQgUADggIABgFQACgVALgTQALgSAPgKQAQgJARAAQAXAAANAQQAOAPABAZQAAAJgBAJIgBAKIhhAAQgDAVAKAOQAJAOASABQAVABATgVIAOAMQgJAOgPAHQgPAIgRAAQgcgBgQgUgAgPguQgMALgHAXIBIAAIABgDQACgRgIgMQgIgLgOgBIgCAAQgNAAgLAKg");
	this.shape_28.setTransform(-155.8586,153.9);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFF83").s().p("AhMBlIAjjJIA6AAQAfAAAQAOQAPAOgCAZQgDAdghAOQANAEAHANQAHANgCAPQgCAcgUAQQgTAQgfAAgAguBPIApAAQASAAANgKQAMgKACgRQACgQgHgKQgIgIgQgCIgtAAgAgegOIAlAAQARABAMgKQANgJACgQQABgOgHgIQgIgHgRgBIgnAAg");
	this.shape_29.setTransform(-172.0382,151.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).to({state:[]},1).wait(12));

	// Layer_2
	this.instance_3 = new lib.Tween7("synched",0);
	this.instance_3.setTransform(42.25,-40.25);
	this.instance_3.alpha = 0;

	this.instance_4 = new lib.Tween8("synched",0);
	this.instance_4.setTransform(42.25,-40.25);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({_off:true,alpha:1},12).to({_off:false,alpha:0},12).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({_off:false},12).to({_off:true,alpha:0},12).wait(1));

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
	this.shape.graphics.f().s("rgba(255,0,0,0.937)").ss(4,1,1).p("EAnkgE9QAAD9izCyQizCyj9AAQj9AAiziyQiyiyAAj9QAAj9CyizQCziyD9AAQD9AACzCyQCzCzAAD9gAw6DLQAAEtjUDUQjUDUksAAQktAAjUjUQjUjUAAktQAAkrDUjUQDUjUEtAAQEsAADUDUQDUDUAAErg");
	this.shape.setTransform(-27.35,-72.275);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_5
	this.instance = new lib._30();
	this.instance.setTransform(55,-233,0.6327,1.0029);

	this.instance_1 = new lib._30();
	this.instance_1.setTransform(-349,-233,0.6327,1.0029);

	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance_1},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF83").s().p("AAVBqIglhEIgTARIgJAzIgZAAIAkjTIAaAAIgXB+IAQgQIA0gvIAhAAIhFA/IAvBVg");
	this.shape_1.setTransform(213.05,150.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF83").s().p("AgSBOQgUgBgMgMQgNgMABgTQACgYATgMQAUgNAfAAIAaAAIABgMQACgOgHgHQgGgIgOgBQgMAAgJAHQgKAGgCALIgaAAQACgNAJgKQAJgKAOgGQANgFAPAAQAXAAANAOQANAOgCAWIgMBKIgBAKQAAAIACAHIAAADIgaAAIgBgIIABgIQgUATgWAAIgBAAgAgWAJQgMAIgCAOQgBAKAGAHQAGAHAMAAQAMABAKgGQALgGAHgLIAGgfIgTAAQgXAAgNAHg");
	this.shape_2.setTransform(197.4596,153.9006);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF83").s().p("AgvBNIAaiVIAXAAIgCARQAPgVAVABIAMACIgDAYIgLgCQgZAAgNAWIgSBqg");
	this.shape_3.setTransform(186.15,153.7494);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF83").s().p("AgwA5QgQgUADggIABgFQACgVALgTQALgSAPgKQAQgJARAAQAXAAANAQQAOAPABAZQAAAJgBAJIgBAKIhhAAQgDAVAKAOQAJAOASABQAVABATgVIAOAMQgJAOgPAHQgPAIgRAAQgcgBgQgUgAgPguQgMALgHAXIBIAAIABgDQACgRgIgMQgIgLgOgBIgCAAQgNAAgLAKg");
	this.shape_4.setTransform(173.6914,153.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF83").s().p("AgWBqQgOAAgOgHQgOgHgJgMIAPgQQAOAUAWABQARABAMgLQANgLADgTIAEgNQgTASgXAAQgPgBgKgHQgLgHgFgOQgGgNAAgQIABgUQADgYAKgSQAKgSAOgJQAOgJAQABQAaAAAOATIAEgQIAYAAIgaCSQgDAcgUASQgSAQgZAAIgEAAgAgWhDQgNARgCAeIAAAHQgBASAIALQAHALAPABQAVAAARgWIALhEQgIgVgWAAIgBAAQgSAAgOAQg");
	this.shape_5.setTransform(158.05,156.7015);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFF83").s().p("AgXBUQgHgLABgSIAPhcIgaAAIADgUIAaAAIAHglIAYAAIgHAlIAcAAIgDAUIgbAAIgPBcIAAAHQABALAJAAIANgCIgDAVQgIADgJgBQgPABgHgLg");
	this.shape_6.setTransform(139.6,152.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFF83").s().p("AgSBOQgUgBgMgMQgNgMABgTQACgYATgMQAUgNAfAAIAaAAIABgMQACgOgHgHQgGgIgOgBQgMAAgJAHQgKAGgCALIgaAAQACgNAJgKQAJgKAOgGQANgFAPAAQAXAAANAOQANAOgCAWIgMBKIgBAKQAAAIACAHIAAADIgaAAIgBgIIABgIQgUATgWAAIgBAAgAgWAJQgMAIgCAOQgBAKAGAHQAGAHAMAAQAMABAKgGQALgGAHgLIAGgfIgTAAQgXAAgNAHg");
	this.shape_7.setTransform(126.4596,153.9006);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFF83").s().p("AgeBqIAkjTIAZAAIgkDTg");
	this.shape_8.setTransform(116.3,150.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFF83").s().p("AgSBOQgUgBgMgMQgNgMABgTQACgYATgMQAUgNAfAAIAaAAIABgMQACgOgHgHQgGgIgOgBQgMAAgJAHQgKAGgCALIgaAAQACgNAJgKQAJgKAOgGQANgFAPAAQAXAAANAOQANAOgCAWIgMBKIgBAKQAAAIACAHIAAADIgaAAIgBgIIABgIQgUATgWAAIgBAAgAgWAJQgMAIgCAOQgBAKAGAHQAGAHAMAAQAMABAKgGQALgGAHgLIAGgfIgTAAQgXAAgNAHg");
	this.shape_9.setTransform(104.4596,153.9006);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFF83").s().p("AAYBNIAQhiIAAgMQgCgUgVAAQgVgBgRAZIgTBqIgZAAIAaiVIAYAAIgEATQATgXAaABQAVAAALAPQAKAOgDAZIgQBig");
	this.shape_10.setTransform(82.025,153.7495);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFF83").s().p("AgSBOQgUgBgMgMQgNgMABgTQACgYATgMQAUgNAfAAIAaAAIABgMQACgOgHgHQgGgIgOgBQgMAAgJAHQgKAGgCALIgaAAQACgNAJgKQAJgKAOgGQANgFAPAAQAXAAANAOQANAOgCAWIgMBKIgBAKQAAAIACAHIAAADIgaAAIgBgIIABgIQgUATgWAAIgBAAgAgWAJQgMAIgCAOQgBAKAGAHQAGAHAMAAQAMABAKgGQALgGAHgLIAGgfIgTAAQgXAAgNAHg");
	this.shape_11.setTransform(66.9096,153.9006);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFF83").s().p("AgaBsQgVgBgMgQQgMgQgBgaIAAgUQADgWAKgSQAKgSAOgJQAPgKARABQAYAAANASIAPhOIAZAAIglDUIgXAAIADgQQgRATgZAAIgBAAgAgYgRQgMAKgGAQQgFARgBASQAAAUAHALQAIAKAOABQAVABARgXIAMhEQgIgVgWAAIgBAAQgOAAgKAIg");
	this.shape_12.setTransform(52.6917,150.9006);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFF83").s().p("AAYBqIAQhiIAAgMQgCgTgVAAQgWgBgQAYIgTBqIgZAAIAljTIAZAAIgPBRQATgVAZAAQAVAAALAOQAKAOgDAZIgQBig");
	this.shape_13.setTransform(29.025,150.75);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFF83").s().p("AgYBMQgWgBgKgOQgLgPADgaIAQhgIAZAAIgQBhIAAALQAAAKAGAGQAFAGAJAAQAaABAPgXIAThsIAZAAIgaCVIgYAAIADgPQgRATgZAAIgBgBg");
	this.shape_14.setTransform(14.6417,154.0507);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFF83").s().p("AAABsQgagBgOgUIgEASIgYAAIAljUIAaAAIgQBPQATgUAYABQAWAAAMAQQAMAPAAAaIgBASIAAACQgCAXgKATQgKASgOAJQgNAJgQAAIgCAAgAgYgCIgLBAQAIAXAXABQAOAAALgJQALgJAGgRQAFgRAAgSQABgTgHgLQgHgLgPAAIgBAAQgWAAgQAXg");
	this.shape_15.setTransform(-1.7,150.9013);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFF83").s().p("AgYBMQgWgBgKgOQgLgPADgaIAQhgIAZAAIgQBhIAAALQAAAKAGAGQAFAGAJAAQAaABAPgXIAThsIAZAAIgaCVIgYAAIADgPQgRATgZAAIgBgBg");
	this.shape_16.setTransform(-16.3583,154.0507);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFF83").s().p("AgXBUQgIgLACgSIAQhcIgbAAIADgUIAaAAIAHglIAYAAIgGAlIAbAAIgDAUIgbAAIgPBcIAAAHQAAALAKAAIAMgCIgCAVQgIADgJgBQgOABgIgLg");
	this.shape_17.setTransform(-28.45,152.2);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFF83").s().p("AgSBOQgUgBgMgMQgNgMABgTQACgYATgMQAUgNAfAAIAaAAIABgMQACgOgHgHQgGgIgOgBQgMAAgJAHQgKAGgCALIgaAAQACgNAJgKQAJgKAOgGQANgFAPAAQAXAAANAOQANAOgCAWIgMBKIgBAKQAAAIACAHIAAADIgaAAIgBgIIABgIQgUATgWAAIgBAAgAgWAJQgMAIgCAOQgBAKAGAHQAGAHAMAAQAMABAKgGQALgGAHgLIAGgfIgTAAQgXAAgNAHg");
	this.shape_18.setTransform(-48.5404,153.9006);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFF83").s().p("AgVBqQgQAAgOgHQgOgHgHgMIAOgQQANAUAXABQARABAMgLQAMgLAFgTIACgNQgSASgYAAQgNgBgLgHQgKgHgGgOQgFgNgBgQIAAgUQAEgYAKgSQAKgSAOgJQAOgJAQABQAaAAANATIAGgQIAWAAIgZCSQgEAcgSASQgTAQgZAAIgDAAgAgVhDQgNARgDAeIAAAHQAAASAHALQAHALAPABQAVAAAQgWIAMhEQgIgVgWAAIgBAAQgSAAgNAQg");
	this.shape_19.setTransform(-63.85,156.7015);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFF83").s().p("AgWBqQgPAAgOgHQgOgHgHgMIAOgQQAOAUAWABQARABAMgLQANgLADgTIAEgNQgTASgXAAQgPgBgKgHQgLgHgFgOQgGgNAAgQIABgUQADgYAKgSQAKgSAOgJQAOgJAQABQAaAAAOATIAEgQIAYAAIgaCSQgDAcgTASQgTAQgZAAIgEAAgAgWhDQgNARgCAeIAAAHQgBASAIALQAHALAPABQAVAAAQgWIAMhEQgIgVgWAAIgBAAQgSAAgOAQg");
	this.shape_20.setTransform(-79.45,156.7015);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFF83").s().p("AAYBNIAQhiIAAgMQgCgUgVAAQgVgBgRAZIgTBqIgZAAIAaiVIAYAAIgEATQATgXAaABQAVAAALAPQAKAOgDAZIgQBig");
	this.shape_21.setTransform(-95.225,153.7495);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFF83").s().p("AgJBOQgTAAgNgLQgOgKgGgRQgGgRACgUQACgXAKgTQALgSAQgKQARgKATAAQATAAANAKQAOAKAGASQAHASgDAUIAAADQgCAVgLASQgKARgRAKQgQAKgRAAIgCAAgAgXgoQgOAPgDAZIAAADQgBAIABAKQABAQAJAKQAIAJAOABQAMAAAKgGQALgHAHgNQAHgOACgPIABgVQgCgRgJgKQgIgJgOgBIgCAAQgRAAgNAQg");
	this.shape_22.setTransform(-110.3138,153.9001);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFF83").s().p("AAkBlIgchRIguAAIgOBRIgaAAIAjjJIA8AAQAfABARAPQARAQgDAcQgCATgMAPQgMAMgUAIIAfBVIAAACgAgigCIAlAAQAUAAAOgKQAOgLACgSQACgQgJgLQgJgKgSAAIgoAAg");
	this.shape_23.setTransform(-126.5086,151.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]},12).to({state:[]},1).wait(12));

	// Layer_2
	this.instance_2 = new lib.Tween7("synched",0);
	this.instance_2.setTransform(42.25,-40.25);
	this.instance_2.alpha = 0;

	this.instance_3 = new lib.Tween8("synched",0);
	this.instance_3.setTransform(42.25,-40.25);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:true,alpha:1},12).to({_off:false,alpha:0},12).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({_off:false},12).to({_off:true,alpha:0},12).wait(1));

	// Layer_3
	this.cobaBG = new lib.Tween10();
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

	// Layer_8
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(255,0,0,0.937)").ss(4,1,1).p("AERF+QlhD9lLBDQlKBEhxifQhxieCrkjQCrkhFij9QFhj9FKhEQFKhDBxCeQBxCeiqEjQirEiliD9g");
	this.shape.setTransform(151.542,-44.0518);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_5
	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.instance = new lib._16();
	this.instance.setTransform(-348,-220,1.1844,1.1678);

	this.instance_1 = new lib._25();
	this.instance_1.setTransform(55,-221,0.9133,0.9971);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.instance},{t:this.exit}]},12).to({state:[]},1).wait(12));

	// Layer_4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF83").s().p("AgXBUQgIgLACgSIAPhcIgaAAIAEgUIAaAAIAGglIAYAAIgHAlIAcAAIgEAUIgbAAIgPBcIAAAHQABALALAAIALgCIgBAVQgKADgHgBQgQABgHgLg");
	this.shape_1.setTransform(198.85,152.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF83").s().p("AgSBOQgUgBgMgMQgNgMABgTQACgYATgMQAUgNAfAAIAaAAIABgMQACgOgHgHQgGgIgOgBQgMAAgJAHQgKAGgCALIgaAAQACgNAJgKQAJgKAOgGQANgFAPAAQAXAAANAOQANAOgCAWIgMBKIgBAKQAAAIACAHIAAADIgaAAIgBgIIABgIQgUATgWAAIgBAAgAgWAJQgMAIgCAOQgBAKAGAHQAGAHAMAAQAMABAKgGQALgGAHgLIAGgfIgTAAQgXAAgNAHg");
	this.shape_2.setTransform(185.7096,153.9006);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF83").s().p("AgXBUQgHgLABgSIAQhcIgbAAIADgUIAaAAIAHglIAYAAIgHAlIAcAAIgDAUIgbAAIgPBcIAAAHQAAALAKAAIANgCIgDAVQgIADgJgBQgOABgIgLg");
	this.shape_3.setTransform(174.6,152.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF83").s().p("AgdBmIAaiUIAYAAIgZCUgAAFhMQgEgEAAgGQAAgHAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAHgEAEQgEAEgHABQgGAAgEgFg");
	this.shape_4.setTransform(166.375,151.15);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF83").s().p("AAABsQgagBgNgUIgGASIgXAAIAmjUIAYAAIgOBPQARgUAZABQAWAAAMAQQAMAPABAaIgBASIAAACQgEAXgJATQgKASgOAJQgNAJgQAAIgCAAgAgYgCIgLBAQAIAXAXABQAOAAALgJQALgJAFgRQAGgRABgSQAAgTgHgLQgIgLgOAAIgBAAQgWAAgQAXg");
	this.shape_5.setTransform(154.4,150.9013);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFF83").s().p("AgSBOQgUgBgMgMQgNgMABgTQACgYATgMQAUgNAfAAIAaAAIABgMQACgOgHgHQgGgIgOgBQgMAAgJAHQgKAGgCALIgaAAQACgNAJgKQAJgKAOgGQANgFAPAAQAXAAANAOQANAOgCAWIgMBKIgBAKQAAAIACAHIAAADIgaAAIgBgIIABgIQgUATgWAAIgBAAgAgWAJQgMAIgCAOQgBAKAGAHQAGAHAMAAQAMABAKgGQALgGAHgLIAGgfIgTAAQgXAAgNAHg");
	this.shape_6.setTransform(139.0096,153.9006);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFF83").s().p("AAYBqIAQhiIAAgMQgCgTgVAAQgWgBgQAYIgTBqIgZAAIAljTIAZAAIgPBRQATgVAZAAQAVAAALAOQAKAOgDAZIgQBig");
	this.shape_7.setTransform(123.675,150.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFF83").s().p("AAYBNIAQhiIAAgMQgCgUgVAAQgVgBgRAZIgTBqIgZAAIAaiVIAYAAIgEATQATgXAaABQAVAAALAPQAKAOgDAZIgQBig");
	this.shape_8.setTransform(101.325,153.7495);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFF83").s().p("AgSBOQgUgBgMgMQgNgMABgTQACgYATgMQAUgNAfAAIAaAAIABgMQACgOgHgHQgGgIgOgBQgMAAgJAHQgKAGgCALIgaAAQACgNAJgKQAJgKAOgGQANgFAPAAQAXAAANAOQANAOgCAWIgMBKIgBAKQAAAIACAHIAAADIgaAAIgBgIIABgIQgUATgWAAIgBAAgAgWAJQgMAIgCAOQgBAKAGAHQAGAHAMAAQAMABAKgGQALgGAHgLIAGgfIgTAAQgXAAgNAHg");
	this.shape_9.setTransform(86.2096,153.9006);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFF83").s().p("AgaBsQgVgBgMgQQgMgQgBgaIAAgUQADgWAKgSQAKgSAOgJQAPgKARABQAYAAANASIAPhOIAZAAIglDUIgXAAIADgQQgRATgZAAIgBAAgAgYgRQgMAKgGAQQgFARgBASQAAAUAHALQAIAKAOABQAVABARgXIAMhEQgIgVgWAAIgBAAQgOAAgKAIg");
	this.shape_10.setTransform(71.9917,150.9006);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFF83").s().p("AAYBqIAQhiIAAgMQgCgTgVAAQgWgBgQAYIgTBqIgZAAIAljTIAZAAIgPBRQATgVAZAAQAVAAALAOQAKAOgDAZIgQBig");
	this.shape_11.setTransform(48.325,150.75);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFF83").s().p("AgYBMQgWgBgKgOQgLgPADgaIAQhgIAZAAIgQBhIAAALQAAAKAGAGQAFAGAJAAQAaABAPgXIAThsIAZAAIgaCVIgYAAIADgPQgRATgZAAIgBgBg");
	this.shape_12.setTransform(33.9417,154.0507);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFF83").s().p("AAABsQgagBgNgUIgFASIgYAAIAmjUIAYAAIgOBPQARgUAZABQAWAAAMAQQAMAPABAaIgBASIAAACQgEAXgJATQgKASgOAJQgNAJgQAAIgCAAgAgYgCIgLBAQAIAXAXABQAOAAALgJQALgJAFgRQAGgRABgSQAAgTgHgLQgIgLgOAAIgBAAQgWAAgQAXg");
	this.shape_13.setTransform(17.6,150.9013);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFF83").s().p("AgYBMQgWgBgKgOQgLgPADgaIAQhgIAZAAIgQBhIAAALQAAAKAGAGQAFAGAJAAQAaABAPgXIAThsIAZAAIgaCVIgYAAIADgPQgRATgZAAIgBgBg");
	this.shape_14.setTransform(2.9417,154.0507);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFF83").s().p("AgXBUQgIgLACgSIAPhcIgaAAIAEgUIAaAAIAGglIAYAAIgHAlIAcAAIgEAUIgbAAIgPBcIAAAHQABALALAAIAMgCIgCAVQgKADgHgBQgQABgHgLg");
	this.shape_15.setTransform(-9.15,152.2);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFF83").s().p("AAYBNIAQhiIAAgMQgCgUgVAAQgVgBgRAZIgTBqIgZAAIAaiVIAYAAIgEATQATgXAaABQAVAAALAPQAKAOgDAZIgQBig");
	this.shape_16.setTransform(-29.525,153.7495);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFF83").s().p("AgSBOQgUgBgMgMQgNgMABgTQACgYATgMQAUgNAfAAIAaAAIABgMQACgOgHgHQgGgIgOgBQgMAAgJAHQgKAGgCALIgaAAQACgNAJgKQAJgKAOgGQANgFAPAAQAXAAANAOQANAOgCAWIgMBKIgBAKQAAAIACAHIAAADIgaAAIgBgIIABgIQgUATgWAAIgBAAgAgWAJQgMAIgCAOQgBAKAGAHQAGAHAMAAQAMABAKgGQALgGAHgLIAGgfIgTAAQgXAAgNAHg");
	this.shape_17.setTransform(-44.6404,153.9006);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFF83").s().p("AguBAQgQgOABgVIAZAAQAAANAIAHQAIAIAOAAQANAAAKgGQAKgGABgLQACgPgTgGIgZgIQghgLABgaQABgTARgOQARgMAXAAQAWAAAPANQAOANgBAVIgZAAQABgLgIgHQgHgIgNAAQgMAAgJAHQgJAGgBAKQgCANASAGIALADQAbAIAKAJQALAKgBAQQgBAPgIAKQgJAKgNAGQgOAFgPAAQgXAAgQgOg");
	this.shape_18.setTransform(-59.1499,153.9);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFF83").s().p("AgdBmIAaiUIAYAAIgZCUgAAFhMQgEgEAAgGQAAgHAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAHgEAEQgEAEgHABQgGAAgEgFg");
	this.shape_19.setTransform(-69.225,151.15);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFF83").s().p("AhIBpIAkjOIAWAAIgCAQQARgUAaABQAWAAALAQQAMAPACAbIgBASIgBACQgCAXgKASQgKASgOAJQgOAJgRAAQgagBgNgRIgOBIgAgSg+IgNBHQAIAUAXABQARAAANgPQAOgPADgcIABgMQAAgUgIgLQgHgLgPAAIgBAAQgUAAgPAUg");
	this.shape_20.setTransform(-81.7,156.6244);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFF83").s().p("AgSBOQgUgBgMgMQgNgMABgTQACgYATgMQAUgNAfAAIAaAAIABgMQACgOgHgHQgGgIgOgBQgMAAgJAHQgKAGgCALIgaAAQACgNAJgKQAJgKAOgGQANgFAPAAQAXAAANAOQANAOgCAWIgMBKIgBAKQAAAIACAHIAAADIgaAAIgBgIIABgIQgUATgWAAIgBAAgAgWAJQgMAIgCAOQgBAKAGAHQAGAHAMAAQAMABAKgGQALgGAHgLIAGgfIgTAAQgXAAgNAHg");
	this.shape_21.setTransform(-96.5904,153.9006);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFF83").s().p("Ag8BlIAjjJIAZAAIgfCzIBcAAIgEAWg");
	this.shape_22.setTransform(-111.5,151.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]},12).to({state:[]},1).wait(12));

	// Layer_2
	this.instance_2 = new lib.Tween7("synched",0);
	this.instance_2.setTransform(42.25,-40.25);
	this.instance_2.alpha = 0;

	this.instance_3 = new lib.Tween8("synched",0);
	this.instance_3.setTransform(42.25,-40.25);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:true,alpha:1},12).to({_off:false,alpha:0},12).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({_off:false},12).to({_off:true,alpha:0},12).wait(1));

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
	this.instance.setTransform(-68.1,29.8,1.2238,1.2238,0,0,0,-0.1,0);
	this.instance.alpha = 0.75;

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgQAAQgNAAgLAHQgKAHgFAMIAABzIgcAAIAAiiIAaAAIABAVQATgYAdAAQAzAAABA6IAABrg");
	this.shape.setTransform(320.85,92.825);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQATgOAiAAIAcAAIAAgNQgBgPgIgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAIgLAQgHQAOgGARAAQAcAAAQAOQAPAOABAYIAABKQABAXAFANIAAACIgdAAQgCgFgCgMQgUAUgZAAQgYAAgPgNgAgmAgQgBANAKAIQAIAHAOAAQAMAAALgHQANgGAFgLIAAgiIgWAAQgyAAAAAeg");
	this.shape_1.setTransform(304,92.975);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgQAAQgNAAgKAHQgLAHgFAMIAABzIgcAAIAAiiIAaAAIABAVQATgYAdAAQA0AAAAA6IAABrg");
	this.shape_2.setTransform(287.25,92.825);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgzBHQgPgOAAgVQAAgZAUgNQASgOAjAAIAbAAIAAgNQAAgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAIgLAPgHQAPgGARAAQAcAAAQAOQAQAOABAYIAABKQgBAXAGANIAAACIgdAAQgDgFgBgMQgTAUgaAAQgZAAgPgNgAgmAgQAAANAJAIQAIAHAOAAQAMAAAMgHQALgGAGgLIAAgiIgXAAQgyAAABAeg");
	this.shape_3.setTransform(270.4,92.975);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_4.setTransform(255.275,89.575);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AggBNQgPgHgIgMQgIgMAAgPIAbAAQABAOAKAIQAKAJARAAQAPAAAKgHQAJgGAAgLQABgLgJgGQgIgHgUgEQgWgFgMgFQgNgGgFgJQgGgJAAgMQAAgUARgNQARgOAZAAQAbAAASAOQARAOAAAWIgcAAQAAgLgJgIQgLgIgOAAQgOAAgJAGQgJAHABAKQAAAKAHAGQAIAFAVAEQAUAFANAGQANAGAHAJQAFAJAAANQAAAWgRANQgSANgbAAQgSAAgQgHg");
	this.shape_5.setTransform(230.9,92.975);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgzBHQgPgOAAgVQAAgZAUgNQASgOAjAAIAbAAIAAgNQAAgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAIgLAQgHQAOgGARAAQAcAAAQAOQAQAOABAYIAABKQAAAXAFANIAAACIgdAAQgDgFgBgMQgTAUgaAAQgZAAgPgNgAgmAgQAAANAJAIQAIAHAOAAQAMAAAMgHQALgGAGgLIAAgiIgXAAQgxAAAAAeg");
	this.shape_6.setTransform(214.7,92.975);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgEBbQgKgLAAgVIAAhjIgdAAIAAgWIAdAAIAAgnIAbAAIAAAnIAeAAIAAAWIgeAAIAABkQAAAJAEAFQAEAFAKAAIANgCIAAAWQgLAEgKAAQgTAAgIgMg");
	this.shape_7.setTransform(200.825,91.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgzBHQgPgOAAgVQAAgZAUgNQASgOAjAAIAbAAIAAgNQAAgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAJgLAOgHQAPgGARAAQAcAAAQAOQAPAOACAYIAABKQgBAXAGANIAAACIgdAAQgDgFgBgMQgTAUgbAAQgXAAgQgNgAgnAgQABANAIAIQAJAHAOAAQAMAAAMgHQALgGAGgLIAAgiIgXAAQgyAAAAAeg");
	this.shape_8.setTransform(187.95,92.975);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_9.setTransform(165.225,89.575);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQAUgOAhAAIAbAAIAAgNQAAgPgIgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAJgLAOgHQAPgGARAAQAcAAAQAOQAPAOABAYIAABKQAAAXAGANIAAACIgdAAQgCgFgCgMQgUAUgaAAQgYAAgOgNgAgnAgQAAANAJAIQAJAHAOAAQAMAAALgHQANgGAEgLIAAgiIgVAAQgzAAAAAeg");
	this.shape_10.setTransform(148.05,92.975);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgEBbQgKgLAAgVIAAhjIgdAAIAAgWIAdAAIAAgnIAbAAIAAAnIAeAAIAAAWIgeAAIAABkQAAAJAEAFQAEAFAKAAIANgCIAAAWQgLAEgKAAQgTAAgIgMg");
	this.shape_11.setTransform(134.225,91.15);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("Ag0A9QgVgXAAgmIAAgBQAAgXAKgTQAJgUARgKQARgKAUAAQAhAAAVAXQAUAXAAAlIAAACQAAAYgJASQgJATgRALQgRAKgWAAQggAAgUgXgAghgsQgMAQAAAeQAAAbAMAQQANARAUAAQAWAAAMgRQANgRAAgdQAAgagNgRQgNgQgVAAQgTAAgOAQg");
	this.shape_12.setTransform(120.9,92.975);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_13.setTransform(105.325,89.575);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgzBHQgPgOAAgVQAAgZAUgNQASgOAjAAIAbAAIAAgNQAAgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAIgLAQgHQAOgGARAAQAcAAAQAOQAQAOABAYIAABKQAAAXAFANIAAACIgdAAQgDgFgBgMQgTAUgaAAQgZAAgPgNgAgmAgQAAANAJAIQAIAHAOAAQAMAAAMgHQALgGAGgLIAAgiIgXAAQgxAAAAAeg");
	this.shape_14.setTransform(80.6,92.975);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgyBeQgRgYAAglIAAgCQAAgkARgXQASgXAdAAQAbAAARAUIAAhVIAcAAIAADmIgaAAIgBgSQgRAVgdAAQgcAAgSgXgAgcgLQgMAOAAAfQAAAcAMAQQALAPATAAQAbAAAMgYIAAhJQgNgXgaAAQgTAAgLAQg");
	this.shape_15.setTransform(63.15,89.725);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgzBHQgPgOAAgVQAAgZATgNQAUgOAhAAIAbAAIAAgNQABgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAJgLAOgHQAPgGARAAQAcAAAQAOQAPAOACAYIAABKQgBAXAGANIAAACIgdAAQgDgFgBgMQgTAUgbAAQgXAAgQgNgAgnAgQABANAIAIQAJAHAOAAQAMAAAMgHQALgGAFgLIAAgiIgVAAQgzAAAAAeg");
	this.shape_16.setTransform(46.55,92.975);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AhEByIAAjgIAaAAIABASQARgVAdAAQAdAAASAWQARAWAAAnIAAADQAAAkgRAXQgRAWgdABQgdAAgRgTIAABOgAgohDIAABNQANAWAZAAQATAAAMgQQAMgQAAgeQAAgbgMgRQgMgPgTAAQgZAAgNAWg");
	this.shape_17.setTransform(29.875,95.95);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgRAAQgMAAgKAHQgKAHgGAMIAABzIgcAAIAAiiIAbAAIAAAVQATgYAdAAQA0AAAAA6IAABrg");
	this.shape_18.setTransform(4.9,92.825);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQATgOAiAAIAbAAIAAgNQAAgPgIgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAIgLAQgHQAOgGARAAQAcAAAQAOQAPAOABAYIAABKQABAXAFANIAAACIgdAAQgCgFgCgMQgUAUgZAAQgYAAgPgNgAgmAgQgBANAKAIQAIAHAOAAQAMAAALgHQANgGAEgLIAAgiIgVAAQgyAAAAAeg");
	this.shape_19.setTransform(-11.9,92.975);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_20.setTransform(-27.075,89.575);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_21.setTransform(-42.675,89.575);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgyBEQgNgPAAgeIAAhpIAcAAIAABoQgBAlAfAAQAfAAAKgYIAAh1IAcAAIAACiIgbAAIAAgQQgRATgdAAQgbAAgOgPg");
	this.shape_22.setTransform(-60,93.125);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgeCNIAAgWIANABQAJAAAFgFQAEgFAAgNIAAi0IAbAAIAAC0QAAAvgpgBQgJABgIgDgAACh0QgDgEAAgHQAAgGADgFQAFgEAIgBQAHABAEAEQAFAFAAAGQAAAHgFAEQgEAFgHAAQgJAAgEgFg");
	this.shape_23.setTransform(-73.65,93.3);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgRAAQgMAAgKAHQgKAHgGAMIAABzIgcAAIAAiiIAbAAIAAAVQATgYAdAAQA0AAAAA6IAABrg");
	this.shape_24.setTransform(-84.2,92.825);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgyBEQgNgPAAgeIAAhpIAcAAIAABoQAAAlAeAAQAfAAAKgYIAAh1IAcAAIAACiIgaAAIgBgQQgQATgfAAQgZAAgPgPg");
	this.shape_25.setTransform(-101.15,93.125);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgEBbQgKgLAAgVIAAhjIgdAAIAAgWIAdAAIAAgnIAbAAIAAAnIAeAAIAAAWIgeAAIAABkQAAAJAEAFQAEAFAKAAIANgCIAAAWQgLAEgKAAQgTAAgIgMg");
	this.shape_26.setTransform(-115.075,91.15);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgNBvIAAiiIAaAAIAACigAgLhTQgEgEgBgHQABgHAEgEQAEgFAHAAQAIAAAEAFQAFAEAAAHQAAAHgFAEQgEAFgIAAQgHAAgEgFg");
	this.shape_27.setTransform(-123.35,90.025);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgyBeQgRgYAAglIAAgCQAAgkARgXQASgXAdAAQAbAAARAUIAAhVIAcAAIAADmIgaAAIgBgSQgRAVgdAAQgcAAgSgXgAgcgLQgMAOAAAfQAAAcAMAQQALAPATAAQAbAAAMgYIAAhJQgNgXgaAAQgTAAgLAQg");
	this.shape_28.setTransform(-136.2,89.725);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgwA/QgUgWAAglIAAgEQAAgYAJgTQAKgTAQgKQARgLASAAQAgAAARAVQASAUAAAnIAAALIhtAAQABAYANAPQANAPAUAAQAOAAALgGQAKgGAIgKIARANQgVAfgpAAQgfAAgWgVgAgZgwQgMAMgDAWIBRAAIAAgCQgBgVgKgMQgKgLgSAAQgQAAgLAMg");
	this.shape_29.setTransform(-160.1,92.975);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("ABWBTIAAhrQAAgRgIgIQgIgJgTAAQgPAAgLAJQgKAJgBAQIAABrIgbAAIAAhqQAAgjgjAAQgbAAgKAXIAAB2IgcAAIAAiiIAaAAIABASQASgVAeAAQAiAAALAaQAJgLANgIQANgHARAAQA2AAABA5IAABsg");
	this.shape_30.setTransform(-181.9,92.825);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQAUgOAhAAIAbAAIAAgNQABgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAJgLAOgHQAPgGARAAQAcAAAQAOQAPAOABAYIAABKQAAAXAGANIAAACIgdAAQgDgFgBgMQgUAUgaAAQgYAAgOgNgAgnAgQABANAIAIQAJAHAOAAQAMAAALgHQAMgGAFgLIAAgiIgVAAQgzAAAAAeg");
	this.shape_31.setTransform(-203.75,92.975);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AghBrQgSgHgIgNIAOgRQASAWAaAAQATAAAMgLQALgMAAgVIAAgNQgRATgbAAQgdAAgSgXQgRgXAAgnQAAgmARgWQASgXAdAAQAcAAARAVIABgSIAZAAIAACeQABAfgTATQgTASgfAAQgRAAgQgIgAgchKQgLAPAAAfQgBAcALAPQAMAPATAAQAbAAAMgYIAAhJQgNgXgZAAQgUAAgLAQg");
	this.shape_32.setTransform(-221.05,96.025);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgmBTIAAiiIAbAAIAAATQANgWAZAAQAIAAAEACIAAAaIgNgBQgbAAgJAXIAABzg");
	this.shape_33.setTransform(-241.325,92.825);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("Ag1A9QgUgXAAgmIAAgBQAAgXAKgTQAJgUARgKQAQgKAVAAQAhAAAVAXQAUAXAAAlIAAACQAAAYgJASQgJATgRALQgRAKgWAAQggAAgVgXgAghgsQgMAQAAAeQAAAbAMAQQANARAUAAQAVAAANgRQAMgRAAgdQABgagNgRQgNgQgVAAQgTAAgOAQg");
	this.shape_34.setTransform(-256.1,92.975);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_35.setTransform(-271.625,89.575);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgmBoQgTgJgLgPQgLgPAAgTIAeAAQAAAUAOALQAPAMAYAAQAWAAANgKQALgJABgQQAAgQgMgJQgLgJgdgIQglgLgRgOQgQgQgBgXQAAgaAVgQQAVgRAgAAQAXAAARAIQASAJAJAPQAKAQAAASIgdAAQAAgUgNgLQgMgMgXAAQgVAAgLAKQgNAJAAARQAAANAMAJQALAKAaAHQAcAIAQAIQAOAJAIANQAHAMAAARQAAAagUAQQgVAQgiAAQgWAAgUgIg");
	this.shape_36.setTransform(-289.55,90.175);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgMAMQgEgEAAgIQAAgGAEgEQAEgFAIgBQAJABAEAFQAEAEAAAGQAAAIgEAEQgEAEgJABQgIgBgEgEg");
	this.shape_37.setTransform(-318.025,99.6);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgxBgQgUgRAAgbIAcAAQAAARAMAKQALALASAAQAUAAALgLQALgKAAgUQAAgTgMgKQgMgLgVAAIgVAAIAAgWIAVAAQATAAALgKQALgKAAgRQAAgngmAAQgRAAgLALQgLAKABARIgdAAQAAgaAUgRQASgRAdAAQAfAAARAQQASAQAAAdQAAAPgJANQgJANgRAHQATAFAKANQAJANABATQgBAegTARQgTARgfAAQgeAAgTgQg");
	this.shape_38.setTransform(-330.8,90.175);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgvA/QgVgWAAglIAAgEQAAgYAJgTQAJgTARgKQAQgLATAAQAfAAATAVQARAUAAAnIAAALIhtAAQAAAYAOAPQANAPAUAAQAOAAALgGQAKgGAIgKIARANQgVAfgoAAQghAAgUgVgAgZgwQgLAMgEAWIBRAAIAAgCQgBgVgLgMQgKgLgRAAQgQAAgLAMg");
	this.shape_39.setTransform(216.4,27.625);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("ABWBTIAAhrQAAgRgIgIQgIgJgSAAQgQAAgLAJQgKAJgBAQIAABrIgbAAIAAhqQAAgjgjAAQgcAAgJAXIAAB2IgcAAIAAiiIAaAAIABASQASgVAeAAQAiAAALAaQAIgLANgIQAOgHASAAQA1AAABA5IAABsg");
	this.shape_40.setTransform(194.65,27.475);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQAUgOAhAAIAbAAIAAgNQAAgPgIgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAJgLAOgHQAPgGARAAQAcAAAQAOQAPAOABAYIAABKQAAAXAGANIAAACIgdAAQgCgFgCgMQgUAUgaAAQgYAAgOgNgAgnAgQAAANAJAIQAJAHAOAAQAMAAALgHQANgGAEgLIAAgiIgVAAQgzAAAAAeg");
	this.shape_41.setTransform(172.8,27.625);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AghBrQgRgHgKgNIAPgRQASAWAaAAQATAAALgLQAMgMAAgVIAAgNQgRATgcAAQgdAAgRgXQgSgXAAgnQAAgmASgWQARgXAdAAQAdAAARAVIACgSIAYAAIAACeQAAAfgSATQgSASggAAQgRAAgQgIgAgchKQgMAPAAAfQABAcAKAPQAMAPATAAQAaAAANgYIAAhJQgNgXgaAAQgTAAgLAQg");
	this.shape_42.setTransform(155.45,30.675);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgNBvIAAiiIAaAAIAACigAgLhTQgFgEABgHQgBgHAFgEQAEgFAHAAQAIAAAFAFQADAEAAAHQAAAHgDAEQgFAFgIAAQgHAAgEgFg");
	this.shape_43.setTransform(135.9,24.675);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgiBrQgQgHgKgNIAPgRQASAWAaAAQATAAALgLQAMgMAAgVIAAgNQgRATgcAAQgdAAgRgXQgSgXAAgnQAAgmASgWQARgXAdAAQAeAAAQAVIACgSIAYAAIAACeQAAAfgSATQgSASggAAQgRAAgRgIgAgchKQgMAPAAAfQAAAcAMAPQALAPATAAQAbAAAMgYIAAhJQgNgXgaAAQgTAAgLAQg");
	this.shape_44.setTransform(123.15,30.675);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgQAAQgNAAgKAHQgLAHgFAMIAABzIgcAAIAAiiIAaAAIABAVQATgYAdAAQA0AAAAA6IAABrg");
	this.shape_45.setTransform(106.45,27.475);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgzBHQgPgOAAgVQAAgZAUgNQASgOAjAAIAbAAIAAgNQAAgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAIgLAQgHQAOgGARAAQAcAAAQAOQAQAOABAYIAABKQAAAXAFANIAAACIgdAAQgDgFgBgMQgTAUgaAAQgZAAgPgNgAgmAgQAAANAJAIQAIAHAOAAQAMAAAMgHQALgGAGgLIAAgiIgXAAQgxAAAAAeg");
	this.shape_46.setTransform(89.6,27.625);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgNBzIAAjlIAbAAIAADlg");
	this.shape_47.setTransform(77.525,24.225);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgyBEQgNgPAAgeIAAhpIAcAAIAABoQAAAlAeAAQAfAAAKgYIAAh1IAcAAIAACiIgaAAIgBgQQgQATgfAAQgZAAgPgPg");
	this.shape_48.setTransform(65.35,27.775);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_49.setTransform(42.525,24.225);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgxBEQgOgPAAgeIAAhpIAbAAIAABoQAAAlAfAAQAfAAAKgYIAAh1IAcAAIAACiIgaAAIgBgQQgQATgfAAQgaAAgNgPg");
	this.shape_50.setTransform(25.2,27.775);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgEBbQgKgLAAgVIAAhjIgdAAIAAgWIAdAAIAAgnIAbAAIAAAnIAeAAIAAAWIgeAAIAABkQAAAJAEAFQAEAFAKAAIANgCIAAAWQgLADgKABQgTAAgIgMg");
	this.shape_51.setTransform(11.275,25.8);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgRAAQgMAAgLAHQgJAHgGAMIAABzIgcAAIAAiiIAaAAIABAVQATgYAdAAQAzAAABA6IAABrg");
	this.shape_52.setTransform(-1.7,27.475);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgyBEQgNgPAAgeIAAhpIAcAAIAABoQgBAlAfAAQAeAAALgYIAAh1IAcAAIAACiIgaAAIgBgQQgRATgdAAQgaAAgPgPg");
	this.shape_53.setTransform(-18.7,27.775);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgNBzIAAjlIAbAAIAADlg");
	this.shape_54.setTransform(-114.175,24.225);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("Ag1A9QgUgXAAgmIAAgBQAAgXAJgTQAKgUARgKQAQgKAVAAQAhAAAUAXQAVAXAAAlIAAACQAAAYgJASQgJATgRALQgRAKgWAAQggAAgVgXgAgggsQgNAQAAAeQAAAbANAQQAMARAUAAQAVAAANgRQAMgRAAgdQAAgagNgRQgMgQgVAAQgUAAgMAQg");
	this.shape_55.setTransform(-126.65,27.625);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgpBfIgBATIgaAAIAAjmIAcAAIAABWQARgVAcAAQAeAAARAXQARAWAAAmIAAACQAAAmgRAWQgRAXgdAAQgeAAgRgWgAgogCIAABGQANAZAbAAQATAAALgPQALgQAAgfQAAgcgLgPQgLgPgTAAQgcAAgMAZg");
	this.shape_56.setTransform(-143.725,24.375);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("ABWBTIAAhrQAAgRgIgIQgIgJgTAAQgPAAgLAJQgKAJgBAQIAABrIgbAAIAAhqQAAgjgjAAQgbAAgKAXIAAB2IgcAAIAAiiIAaAAIABASQASgVAeAAQAiAAALAaQAJgLANgIQANgHARAAQA2AAABA5IAABsg");
	this.shape_57.setTransform(-166.15,27.475);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("Ag1A9QgUgXAAgmIAAgBQAAgXAJgTQAKgUARgKQARgKAUAAQAhAAAUAXQAVAXAAAlIAAACQAAAYgJASQgJATgRALQgRAKgWAAQggAAgVgXgAghgsQgMAQAAAeQAAAbAMAQQANARAUAAQAWAAAMgRQAMgRAAgdQAAgagMgRQgNgQgVAAQgUAAgNAQg");
	this.shape_58.setTransform(-188.4,27.625);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgEBbQgKgLAAgVIAAhjIgdAAIAAgWIAdAAIAAgnIAbAAIAAAnIAeAAIAAAWIgeAAIAABkQAAAJAEAFQAEAFAKAAIANgCIAAAWQgLADgKABQgTAAgIgMg");
	this.shape_59.setTransform(-202.675,25.8);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgQAAQgNAAgLAHQgKAHgFAMIAABzIgcAAIAAiiIAaAAIABAVQATgYAdAAQAzAAABA6IAABrg");
	this.shape_60.setTransform(-223.2,27.475);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQATgOAiAAIAbAAIAAgNQAAgPgIgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAIgLAQgHQAOgGARAAQAcAAAQAOQAPAOABAYIAABKQABAXAFANIAAACIgdAAQgCgFgCgMQgUAUgZAAQgYAAgPgNgAgmAgQgBANAKAIQAIAHAOAAQAMAAALgHQANgGAEgLIAAgiIgVAAQgyAAAAAeg");
	this.shape_61.setTransform(-240.05,27.625);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_62.setTransform(-255.175,24.225);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgwA/QgUgWAAglIAAgEQAAgYAJgTQAKgTAQgKQARgLASAAQAgAAARAVQASAUAAAnIAAALIhtAAQABAYANAPQANAPAUAAQAOAAALgGQAKgGAIgKIARANQgVAfgpAAQgfAAgWgVgAgZgwQgLAMgEAWIBRAAIAAgCQgBgVgLgMQgJgLgSAAQgQAAgLAMg");
	this.shape_63.setTransform(-272.05,27.625);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgOBtIAAjCIhGAAIAAgXICoAAIAAAXIhGAAIAADCg");
	this.shape_64.setTransform(-289.5,24.825);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgMAMQgEgEAAgIQAAgGAEgEQAEgGAIAAQAJAAAEAGQAEAEAAAGQAAAIgEAEQgEAEgJABQgIgBgEgEg");
	this.shape_65.setTransform(-318.025,34.25);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AhFBvIAAgUIBLhUQARgSAGgMQAHgMAAgNQAAgRgLgLQgKgLgQAAQgVAAgLAMQgMALAAAVIgcAAQAAgeAUgSQATgTAhAAQAdAAASAQQASAQAAAbQAAAggpAsIg6A/IBtAAIAAAXg");
	this.shape_66.setTransform(-330.375,24.675);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgNBvIAAiiIAbAAIAACigAgLhTQgEgEgBgHQABgHAEgEQAEgFAHAAQAIAAAEAFQAFAEAAAHQAAAHgFAEQgEAFgIAAQgHAAgEgFg");
	this.shape_67.setTransform(219.2,-40.575);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQAUgOAhAAIAbAAIAAgNQABgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAJgLAOgHQAPgGARAAQAcAAAQAOQAPAOABAYIAABKQAAAXAGANIAAACIgdAAQgDgFgBgMQgUAUgaAAQgYAAgOgNgAgnAgQABANAIAIQAJAHAOAAQAMAAALgHQAMgGAFgLIAAgiIgVAAQgzAAAAAeg");
	this.shape_68.setTransform(207.1,-37.625);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgyBEQgNgPAAgeIAAhpIAcAAIAABoQAAAlAeAAQAfAAAKgYIAAh1IAcAAIAACiIgbAAIAAgQQgRATgdAAQgbAAgOgPg");
	this.shape_69.setTransform(190.3,-37.475);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AggBNQgPgHgIgMQgJgMABgPIAbAAQABAOALAIQAKAJAQAAQAQAAAJgHQAKgGAAgLQgBgLgHgGQgKgHgTgEQgWgFgMgFQgMgGgGgJQgGgJAAgMQAAgUARgNQAQgOAaAAQAbAAASAOQARAOAAAWIgcAAQAAgLgJgIQgLgIgOAAQgPAAgIAGQgJAHAAAKQABAKAHAGQAJAFATAEQAVAFANAGQANAGAGAJQAHAJAAANQAAAWgSANQgSANgbAAQgTAAgPgHg");
	this.shape_70.setTransform(173.9,-37.625);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgwA/QgUgWAAglIAAgEQAAgYAKgTQAJgTAQgKQAQgLATAAQAgAAARAVQASAUAAAnIAAALIhtAAQAAAYAOAPQANAPAUAAQAPAAAKgGQAKgGAIgKIARANQgUAfgqAAQgfAAgWgVgAgZgwQgMAMgDAWIBRAAIAAgCQgBgVgKgMQgKgLgSAAQgQAAgLAMg");
	this.shape_71.setTransform(157.95,-37.625);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AggBNQgPgHgIgMQgIgMAAgPIAbAAQABAOAKAIQAKAJARAAQAQAAAJgHQAJgGAAgLQABgLgJgGQgJgHgTgEQgWgFgMgFQgMgGgGgJQgGgJAAgMQAAgUARgNQARgOAZAAQAbAAASAOQARAOAAAWIgcAAQAAgLgJgIQgKgIgPAAQgPAAgIAGQgJAHAAAKQABAKAHAGQAJAFAUAEQAUAFANAGQANAGAGAJQAHAJgBANQAAAWgRANQgSANgbAAQgTAAgPgHg");
	this.shape_72.setTransform(141.7,-37.625);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgiBrQgRgHgIgNIAOgRQASAWAaAAQATAAAMgLQALgMAAgVIAAgNQgRATgbAAQgeAAgRgXQgRgXAAgnQAAgmARgWQARgXAeAAQAcAAARAVIABgSIAaAAIAACeQAAAfgTATQgTASgfAAQgRAAgRgIgAgchKQgLAPAAAfQgBAcALAPQAMAPATAAQAaAAANgYIAAhJQgNgXgZAAQgUAAgLAQg");
	this.shape_73.setTransform(117.25,-34.575);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgQAAQgNAAgKAHQgLAHgFAMIAABzIgcAAIAAiiIAaAAIABAVQATgYAdAAQA0AAAAA6IAABrg");
	this.shape_74.setTransform(100.5,-37.775);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQAUgOAhAAIAbAAIAAgNQAAgPgIgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAJgLAOgHQAPgGARAAQAcAAAQAOQAPAOABAYIAABKQAAAXAGANIAAACIgdAAQgCgFgCgMQgUAUgaAAQgYAAgOgNgAgnAgQAAANAJAIQAJAHAOAAQAMAAALgHQANgGAEgLIAAgiIgVAAQgzAAAAAeg");
	this.shape_75.setTransform(83.7,-37.625);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgxBxIgKgCIAAgWIAHABQAOAAAIgGQAIgGAFgPIAHgRIg6ifIAeAAIAnB5IAmh5IAeAAIhBC6QgOApgiAAg");
	this.shape_76.setTransform(68.075,-34.35);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgUBUQgVAAgOgNQgNgOABgUQACgZAVgOQAVgOAhAAIAdAAIABgNQACgPgHgIQgHgJgPAAQgNAAgKAHQgLAHgCAMIgcAAQACgOAJgLQAKgMAPgGQAPgGAQABQAZAAAPAPQAOAPgDAYIgNBQIgBALQAAAJACAIIAAACIgcAAIgBgIIABgJQgWAUgXAAIgCAAgAgYAKQgNAIgCAPQgBAMAGAHQAHAIANAAQANABAKgHQAMgHAIgLIAGgiIgUAAQgZAAgOAIg");
	this.shape_77.setTransform(44.4114,-37.6263);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgZBaQgIgLACgUIARhjIgeAAIAFgWIAcAAIAHgnIAaAAIgHAnIAdAAIgDAWIgdAAIgQBkIAAAHQABAMAKAAIAOgCIgDAWQgKADgJABQgQgBgIgMg");
	this.shape_78.setTransform(32.3,-39.45);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgUBUQgVAAgOgNQgNgOABgUQACgZAVgOQAVgOAhAAIAdAAIABgNQACgPgHgIQgHgJgPAAQgNAAgKAHQgLAHgCAMIgcAAQACgOAJgLQAKgMAPgGQAPgGAQABQAZAAAPAPQAOAPgDAYIgNBQIgBALQAAAJACAIIAAACIgcAAIgBgIIABgJQgWAUgXAAIgCAAgAgYAKQgNAIgCAPQgBAMAGAHQAHAIANAAQANABAKgHQAMgHAIgLIAGgiIgUAAQgZAAgOAIg");
	this.shape_79.setTransform(18.0614,-37.6263);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("ABKBTIAShqQABgIgBgHQgDgUgYgBQgOAAgMAKQgNAJgDAQIgTBrIgaAAIAShqQACgRgHgJQgHgJgPAAQgZgBgPAYIgVB2IgbAAIAciiIAaAAIgDASQAUgVAdAAQAPABAKAGQALAHAEAMQAXgaAfAAQAYABAMAQQALAPgDAbIgRBqg");
	this.shape_80.setTransform(-3.469,-37.7756);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgzBTIAcihIAZAAIgDASQARgWAXAAQAFAAAIADIgDAaIgNgCQgaAAgOAYIgUByg");
	this.shape_81.setTransform(-20.525,-37.8005);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgFBUQgeAAgRgWQgRgWACgiIABgGQADgYALgTQAMgUARgLQARgKATABQAZAAAOAQQAOAQACAcQAAAKgBAJIgBAMIhqAAQgCAWAKAPQAKAQATABQAXAAAVgWIAQANQgLAPgQAIQgPAIgRAAIgDAAgAgRgxQgMAMgIAXIBOAAIABgCQACgTgIgNQgJgMgQgBIgBAAQgPAAgMAMg");
	this.shape_82.setTransform(-34.0827,-37.6248);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgdB1QgWgBgOgRQgNgRgBgdIABgVQADgZAKgTQAMgUAPgJQAQgKASAAQAaABAPATIAPhVIAcAAIgoDmIgZAAIADgSQgSAVgbAAIgCAAgAgbgSQgMAKgHASQgFASgBAUQgBAVAJAMQAIAMAPAAQAXABATgZIAMhKQgIgWgYAAIgBAAQgPAAgMAJg");
	this.shape_83.setTransform(-49.95,-40.8744);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgKBUQgUAAgPgLQgOgLgHgSQgHgTACgWQACgZAMgUQALgUASgLQASgLAVABQAUAAAPALQAOALAHATQAHATgCAWIAAACQgDAYgLATQgMAUgSAKQgRAKgTAAIgCAAgAgZgsQgPARgDAbIgBADQgBAJABALQACARAJALQAJAKAPABQANAAALgHQAMgHAHgPQAIgOACgSQACgMgBgKQgCgSgJgKQgJgLgPgBIgCAAQgTAAgOARg");
	this.shape_84.setTransform(-67.8156,-37.625);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AAaBTIAShqQABgHgBgHQgDgVgWAAQgXgBgTAbIgUBzIgbAAIAciiIAaAAIgEAVQAVgYAcAAQAXABALAPQALAPgDAcIgSBqg");
	this.shape_85.setTransform(-85.2179,-37.7755);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AggBvIAdihIAaAAIgcChgAAFhSQgEgEAAgHQAAgIAEgEQAFgEAHgBQAHAAAEAFQAFAEAAAHQAAAHgFAEQgEAFgHABQgHAAgFgFg");
	this.shape_86.setTransform(-96.175,-40.6);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AAaBzIAShrQABgHgBgFQgDgVgWgBQgYAAgSAaIgUBzIgbAAIAojlIAbAAIgQBYQAUgYAcABQAXAAALAQQALAPgDAbIgSBqg");
	this.shape_87.setTransform(-109.1179,-41.025);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AgIBUQgUAAgOgKQgPgLgGgSQgHgSACgXIABgHQADgXALgTQALgSARgLQARgKAUABQAaAAAPARQAQAQAAAaIgaAAQAAgQgJgKQgIgKgPgBQgUAAgOAQQgOAQgDAdIgBADQgBAKABAKQABASAJAKQAJAKAPABQAOAAALgJQAMgJAEgOIAZAAQgCAPgKANQgKANgPAHQgOAGgOAAIgCAAg");
	this.shape_88.setTransform(-124.3485,-37.6245);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AhVBtIAmjZICFAAIgFAXIhoAAIgMBHIBbAAIgEAWIhbAAIgOBOIBqAAIgEAXg");
	this.shape_89.setTransform(-140.125,-40.425);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("ABWBTIAAhrQAAgRgIgIQgIgJgTAAQgPAAgLAJQgKAJgBAQIAABrIgbAAIAAhqQAAgjgjAAQgbAAgKAXIAAB2IgcAAIAAiiIAaAAIABASQASgVAeAAQAiAAALAaQAJgLANgIQANgHARAAQA2AAABA5IAABsg");
	this.shape_90.setTransform(-170.65,-37.775);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgxBEQgOgPAAgeIAAhpIAbAAIAABoQAAAlAfAAQAfAAAKgYIAAh1IAcAAIAACiIgaAAIgBgQQgQATgfAAQgaAAgNgPg");
	this.shape_91.setTransform(-192.6,-37.475);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AgNBzIAAjlIAbAAIAADlg");
	this.shape_92.setTransform(-204.825,-41.025);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgNBzIAAjlIAbAAIAADlg");
	this.shape_93.setTransform(-212.275,-41.025);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AgNBvIAAiiIAbAAIAACigAgLhTQgFgEABgHQgBgHAFgEQAEgFAHAAQAIAAAFAFQADAEAAAHQAAAHgDAEQgFAFgIAAQgHAAgEgFg");
	this.shape_94.setTransform(-219.7,-40.575);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AhDBtIAAjZICHAAIAAAXIhqAAIAABLIBbAAIAAAXIhbAAIAABgg");
	this.shape_95.setTransform(-231.175,-40.425);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgiBrQgQgHgKgNIAPgRQASAWAaAAQATAAALgLQAMgMAAgVIAAgNQgRATgcAAQgdAAgRgXQgSgXAAgnQAAgmASgWQARgXAdAAQAeAAAQAVIACgSIAZAAIAACeQgBAfgSATQgSASggAAQgRAAgRgIgAgchKQgMAPAAAfQAAAcAMAPQALAPATAAQAbAAAMgYIAAhJQgNgXgaAAQgTAAgLAQg");
	this.shape_96.setTransform(-257,-34.575);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgRAAQgMAAgKAHQgKAHgGAMIAABzIgcAAIAAiiIAbAAIAAAVQATgYAdAAQAzAAABA6IAABrg");
	this.shape_97.setTransform(-273.75,-37.775);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AgNBvIAAiiIAbAAIAACigAgLhTQgFgEAAgHQAAgHAFgEQAEgFAHAAQAIAAAFAFQADAEAAAHQAAAHgDAEQgFAFgIAAQgHAAgEgFg");
	this.shape_98.setTransform(-285.95,-40.575);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgQAAQgNAAgLAHQgKAHgFAMIAABzIgcAAIAAiiIAaAAIABAVQATgYAdAAQA0AAAAA6IAABrg");
	this.shape_99.setTransform(-298.1,-37.775);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AgxBEQgOgPAAgeIAAhpIAbAAIAABoQAAAlAfAAQAfAAAKgYIAAh1IAcAAIAACiIgaAAIgBgQQgQATgfAAQgaAAgNgPg");
	this.shape_100.setTransform(-315.1,-37.475);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_101.setTransform(-330.325,-41.025);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_102.setTransform(416.775,-106.325);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQAUgOAhAAIAbAAIAAgNQAAgPgIgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAIgLAPgHQAPgGARAAQAcAAAQAOQAPAOABAYIAABKQAAAXAGANIAAACIgdAAQgCgFgCgMQgUAUgaAAQgYAAgOgNgAgnAgQAAANAJAIQAJAHAOAAQAMAAALgHQANgGAEgLIAAgiIgVAAQgzAAAAAeg");
	this.shape_103.setTransform(399.6,-102.925);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AgEBbQgKgLAAgVIAAhkIgdAAIAAgVIAdAAIAAgoIAbAAIAAAoIAeAAIAAAVIgeAAIAABkQAAAKAEAFQAEAFAKAAIANgCIAAAXQgLACgKAAQgTAAgIgLg");
	this.shape_104.setTransform(385.775,-104.75);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("Ag0A9QgVgXAAgmIAAgBQAAgXAKgTQAJgUARgKQARgKAUAAQAhAAAVAXQAUAXAAAlIAAACQAAAYgJASQgJATgRALQgRAKgWAAQggAAgUgXgAghgsQgMAQAAAeQAAAbAMAQQANARAUAAQAWAAAMgRQAMgRABgdQgBgagMgRQgNgQgVAAQgTAAgOAQg");
	this.shape_105.setTransform(372.45,-102.925);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_106.setTransform(356.925,-106.325);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AgxBEQgOgPAAgeIAAhpIAbAAIAABoQABAlAeAAQAeAAALgYIAAh1IAcAAIAACiIgbAAIAAgQQgRATgeAAQgZAAgOgPg");
	this.shape_107.setTransform(331.45,-102.775);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgeCNIAAgWIANABQAJAAAFgFQAEgFAAgNIAAi1IAbAAIAAC1QAAAugpAAQgJAAgIgCgAAChzQgDgFAAgHQAAgGADgFQAFgFAIABQAHgBAEAFQAFAFAAAGQAAAHgFAFQgEAEgHAAQgJAAgEgEg");
	this.shape_108.setTransform(317.75,-102.6);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AgyBEQgNgPAAgeIAAhpIAcAAIAABoQgBAlAfAAQAfAAAKgYIAAh1IAcAAIAACiIgbAAIAAgQQgRATgdAAQgbAAgOgPg");
	this.shape_109.setTransform(307.2,-102.775);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgRAAQgMAAgKAHQgLAHgFAMIAABzIgcAAIAAiiIAbAAIAAAVQATgYAdAAQA0AAAAA6IAABrg");
	this.shape_110.setTransform(290.3,-103.075);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgwA/QgUgWAAglIAAgEQAAgYAJgTQAKgTAQgKQARgLASAAQAgAAARAVQASAUAAAnIAAALIhtAAQABAYANAPQANAPAUAAQAOAAALgGQAKgGAIgKIARANQgVAfgpAAQgfAAgWgVgAgZgwQgMAMgDAWIBRAAIAAgCQgBgVgKgMQgKgLgSAAQgQAAgLAMg");
	this.shape_111.setTransform(273.8,-102.925);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("ABWBTIAAhrQAAgRgIgIQgIgJgTAAQgPAAgLAJQgJAJgCAQIAABrIgbAAIAAhqQAAgjgjAAQgbAAgKAXIAAB2IgcAAIAAiiIAaAAIABASQASgVAeAAQAiAAALAaQAJgLANgIQANgHARAAQA2AAABA5IAABsg");
	this.shape_112.setTransform(252,-103.075);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgQAAQgNAAgLAHQgJAHgGAMIAABzIgcAAIAAiiIAaAAIABAVQATgYAdAAQAzAAABA6IAABrg");
	this.shape_113.setTransform(221.95,-103.075);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQAUgOAhAAIAbAAIAAgNQAAgPgIgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAIgLAQgHQAOgGARAAQAcAAAQAOQAPAOABAYIAABKQABAXAFANIAAACIgdAAQgCgFgCgMQgUAUgaAAQgYAAgOgNgAgnAgQAAANAKAIQAIAHAOAAQAMAAALgHQANgGAEgLIAAgiIgVAAQgzAAAAAeg");
	this.shape_114.setTransform(205.1,-102.925);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AAnBRIgnh6IgmB6IgXAAIgvihIAcAAIAgB4IAmh4IAVAAIAnB7IAfh7IAcAAIgwChg");
	this.shape_115.setTransform(185.175,-102.925);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AgvA/QgVgWAAglIAAgEQAAgYAJgTQAKgTAQgKQAQgLATAAQAfAAATAVQARAUAAAnIAAALIhtAAQABAYANAPQANAPAUAAQAOAAALgGQAKgGAIgKIARANQgVAfgoAAQghAAgUgVgAgZgwQgLAMgDAWIBQAAIAAgCQgBgVgLgMQgJgLgSAAQgQAAgLAMg");
	this.shape_116.setTransform(165.65,-102.925);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AAkBzIAAhrQAAgRgIgIQgIgJgRAAQgMAAgKAIQgKAHgGALIAABzIgcAAIAAjlIAcAAIAABXQATgWAcAAQA0AAAAA5IAABrg");
	this.shape_117.setTransform(148.9,-106.325);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_118.setTransform(125.475,-106.325);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AgNBvIAAiiIAaAAIAACigAgLhTQgFgEABgHQgBgHAFgEQAEgFAHAAQAIAAAFAFQADAEAAAHQAAAHgDAEQgFAFgIAAQgHAAgEgFg");
	this.shape_119.setTransform(112.95,-105.875);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AgEBbQgKgLAAgVIAAhkIgdAAIAAgVIAdAAIAAgoIAbAAIAAAoIAeAAIAAAVIgeAAIAABkQAAAKAEAFQAEAFAKAAIANgCIAAAXQgLACgKAAQgTAAgIgLg");
	this.shape_120.setTransform(103.675,-104.75);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AgfBNQgQgHgIgMQgJgMAAgPIAcAAQABAOAKAIQALAJAQAAQAPAAAKgHQAJgGAAgLQAAgLgIgGQgIgHgVgEQgUgFgNgFQgNgGgFgJQgGgJAAgMQAAgUARgNQAQgOAaAAQAcAAARAOQARAOAAAWIgcAAQAAgLgKgIQgKgIgOAAQgOAAgJAGQgIAHAAAKQgBAKAJAGQAHAFAVAEQAUAFANAGQANAGAHAJQAFAJAAANQAAAWgRANQgRANgcAAQgSAAgPgHg");
	this.shape_121.setTransform(91.15,-102.925);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AgNBvIAAiiIAbAAIAACigAgLhTQgFgEABgHQgBgHAFgEQAEgFAHAAQAIAAAFAFQADAEAAAHQAAAHgDAEQgFAFgIAAQgHAAgEgFg");
	this.shape_122.setTransform(79.55,-105.875);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AgmBTIAAiiIAbAAIAAATQANgWAZAAQAIAAAEACIAAAaIgNgBQgbAAgJAXIAABzg");
	this.shape_123.setTransform(71.425,-103.075);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AgwA/QgUgWAAglIAAgEQAAgYAJgTQAKgTAQgKQARgLASAAQAgAAARAVQASAUAAAnIAAALIhtAAQABAYANAPQANAPAUAAQAOAAALgGQAKgGAIgKIARANQgVAfgpAAQgfAAgWgVgAgZgwQgMAMgDAWIBRAAIAAgCQgBgVgLgMQgJgLgSAAQgQAAgLAMg");
	this.shape_124.setTransform(57.35,-102.925);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AgEBbQgKgLAAgVIAAhkIgdAAIAAgVIAdAAIAAgoIAbAAIAAAoIAeAAIAAAVIgeAAIAABkQAAAKAEAFQAEAFAKAAIANgCIAAAXQgLACgKAAQgTAAgIgLg");
	this.shape_125.setTransform(43.575,-104.75);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_126.setTransform(32.225,-106.325);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AgzBHQgPgOAAgVQAAgZATgNQAUgOAhAAIAbAAIAAgNQABgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAJgLAOgHQAPgGARAAQAcAAAQAOQAPAOACAYIAABKQgBAXAGANIAAACIgdAAQgDgFgBgMQgTAUgbAAQgXAAgQgNgAgnAgQABANAIAIQAJAHAOAAQAMAAAMgHQALgGAFgLIAAgiIgWAAQgyAAAAAeg");
	this.shape_127.setTransform(15.05,-102.925);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AgmBTIAAiiIAbAAIAAATQANgWAZAAQAIAAAEACIAAAaIgNgBQgbAAgJAXIAABzg");
	this.shape_128.setTransform(2.325,-103.075);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQAUgOAhAAIAbAAIAAgNQABgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAJgLAOgHQAPgGARAAQAcAAAQAOQAPAOABAYIAABKQAAAXAGANIAAACIgdAAQgDgFgBgMQgUAUgaAAQgYAAgOgNgAgnAgQABANAIAIQAJAHAOAAQAMAAALgHQAMgGAFgLIAAgiIgVAAQgzAAAAAeg");
	this.shape_129.setTransform(-12.05,-102.925);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_130.setTransform(-27.175,-106.325);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AgwA/QgUgWAAglIAAgEQAAgYAKgTQAJgTAQgKQAQgLATAAQAgAAARAVQASAUAAAnIAAALIhtAAQAAAYAOAPQANAPAUAAQAPAAAKgGQAKgGAIgKIARANQgUAfgqAAQgfAAgWgVgAgZgwQgMAMgDAWIBRAAIAAgCQgBgVgKgMQgKgLgSAAQgQAAgLAMg");
	this.shape_131.setTransform(-52.2,-102.925);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("AgiBrQgRgHgIgNIAOgRQASAWAaAAQATAAAMgLQALgMAAgVIAAgNQgRATgbAAQgeAAgRgXQgRgXAAgnQAAgmARgWQARgXAeAAQAcAAARAVIABgSIAaAAIAACeQAAAfgTATQgTASgfAAQgRAAgRgIgAgchKQgLAPAAAfQgBAcALAPQAMAPATAAQAaAAANgYIAAhJQgNgXgZAAQgUAAgLAQg");
	this.shape_132.setTransform(-69.5,-99.875);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgRAAQgMAAgLAHQgJAHgGAMIAABzIgcAAIAAiiIAbAAIAAAVQATgYAdAAQAzAAABA6IAABrg");
	this.shape_133.setTransform(-86.2,-103.075);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQAUgOAhAAIAbAAIAAgNQAAgPgIgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAJgLAOgHQAPgGARAAQAcAAAQAOQAPAOABAYIAABKQAAAXAGANIAAACIgdAAQgCgFgCgMQgUAUgaAAQgYAAgOgNgAgnAgQAAANAJAIQAJAHAOAAQAMAAALgHQANgGAEgLIAAgiIgVAAQgzAAAAAeg");
	this.shape_134.setTransform(-103.05,-102.925);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("AgmBTIAAiiIAbAAIAAATQANgWAZAAQAIAAAEACIAAAaIgNgBQgbAAgJAXIAABzg");
	this.shape_135.setTransform(-115.775,-103.075);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("AgtBkQgTgNgLgYQgMgXAAgfIAAgPQAAgfALgZQALgYAUgNQAVgMAYAAQAaAAAVAMQATANALAYQALAYAAAgIAAANQAAAggLAYQgLAYgTANQgUAMgbAAQgYAAgVgMgAgqhCQgQAVAAAlIAAAPQAAAmAQAVQAPAWAbAAQAdAAAOgVQAQgUAAgmIAAgPQAAgngPgVQgQgVgcAAQgaAAgQAVg");
	this.shape_136.setTransform(-132.4,-105.725);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_137.setTransform(-157.925,-106.325);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AgzBHQgPgOAAgVQAAgZAUgNQASgOAjAAIAbAAIAAgNQAAgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAIgLAPgHQAPgGARAAQAcAAAQAOQAQAOABAYIAABKQgBAXAGANIAAACIgdAAQgDgFgBgMQgTAUgaAAQgZAAgPgNgAgmAgQAAANAJAIQAIAHAOAAQAMAAAMgHQALgGAGgLIAAgiIgXAAQgyAAABAeg");
	this.shape_138.setTransform(-175.1,-102.925);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("AgEBbQgKgLAAgVIAAhkIgdAAIAAgVIAdAAIAAgoIAbAAIAAAoIAeAAIAAAVIgeAAIAABkQAAAKAEAFQAEAFAKAAIANgCIAAAXQgLACgKAAQgTAAgIgLg");
	this.shape_139.setTransform(-188.925,-104.75);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("Ag1A9QgUgXAAgmIAAgBQAAgXAJgTQAKgUARgKQAQgKAVAAQAhAAAUAXQAVAXAAAlIAAACQAAAYgJASQgJATgRALQgRAKgWAAQggAAgVgXgAgggsQgNAQAAAeQAAAbANAQQAMARAUAAQAVAAANgRQAMgRAAgdQAAgagNgRQgMgQgVAAQgUAAgMAQg");
	this.shape_140.setTransform(-202.25,-102.925);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("AAxBtIhMhlIgbAbIAABKIgdAAIAAjZIAdAAIAABsIBghsIAjAAIhVBgIBcB5g");
	this.shape_141.setTransform(-219.375,-105.725);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("AgfBjQgQgHgIgMIAOgQQAQAVAYAAQASAAAKgLQALgKAAgTIAAgNQgQASgaAAQgaAAgQgWQgQgVAAgjQAAgjAQgVQAQgVAbAAQAaAAAQATIABgQIAXAAIAACSQAAAdgRARQgRAQgdAAQgQAAgPgHgAgahFQgLAPAAAcQAAAaALANQAKAPASAAQAYAAAMgWIAAhEQgMgVgYAAQgSAAgKAOg");
	this.shape_142.setTransform(-246.175,-99.5);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("AgvBBQgOgNAAgSQAAgYASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAGAAAKIgaAAQAAgLAIgKQAIgLAOgFQAOgHAPAAQAaAAAPANQAOANABAXIAABEQgBAVAGAMIAAACIgbAAQgCgFgBgLQgTATgYAAQgWAAgOgNgAgjAeQAAAMAIAGQAIAIAMgBQALAAALgGQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_143.setTransform(-261.65,-102.3);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("AgjBNIAAiWIAZAAIAAASQAMgUAXAAQAHAAAEACIAAAYIgMgCQgZABgJAVIAABqg");
	this.shape_144.setTransform(-273.375,-102.45);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("AhIBlIAAjJIA5AAQAZAAAVAMQAUALALAWQALAWAAAbIAAAMQAAAcgLAWQgLAVgUAMQgVAMgaAAgAguBPIAcAAQAeAAARgTQASgTgBgjIAAgMQAAghgPgUQgRgTgdAAIgfAAg");
	this.shape_145.setTransform(-287.85,-104.9);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFFF").s().p("AgMAMQgEgFAAgGQAAgHAEgFQAEgEAIAAQAJAAAEAEQAEAFAAAHQAAAGgEAFQgEAFgJgBQgIABgEgFg");
	this.shape_146.setTransform(-318.025,-96.3);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFFFF").s().p("AAOBuIAAi4Ig3AVIAAgaIBOgeIAFAAIAADbg");
	this.shape_147.setTransform(-332.4,-105.8);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgJgJQgJgKgUAAQgaAAgNAXIAACnIhAAAIAAjtIA9AAIABAcQAZggArAAQAlAAATAWQASAWABAtIAACYg");
	this.shape_148.setTransform(209.8,-167.7);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("AgfCmIAAjtIA/AAIAADtgAgYhtQgKgJAAgOQgBgPAKgJQAKgJAPAAQAQAAAKAJQAKAJgBAPQABAOgKAJQgKAKgQAAQgPAAgJgKg");
	this.shape_149.setTransform(191.25,-172.175);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("AhRBnQgYgUAAgfQAAgmAcgTQAcgUA0AAIAeAAIAAgOQAAgQgJgKQgJgKgQAAQgRAAgIAHQgKAIAAAOIg/AAQgBgVANgSQANgRAXgKQAYgKAcAAQArAAAbAWQAZAWAAAoIAABmQAAAiAKARIAAAEIhAAAQgFgJgCgNQgXAagkAAQgjAAgWgUgAgpAsIAAADQAAAMAIAIQAIAIAPAAQANAAAMgHQAMgGAGgKIAAgpIgYAAQgvAAgDAhg");
	this.shape_150.setTransform(173.2,-167.475);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("ABqB5IAAiWQAAgVgHgJQgIgKgUAAQgdAAgLAcIAACiIg+AAIAAiWQAAgVgIgJQgIgKgUAAQgbABgMAWIAACnIg/AAIAAjtIA7AAIACAbQAZgfArAAQAtAAARAlQAZglAvAAQAmAAATAWQATAXAAAuIAACWg");
	this.shape_151.setTransform(141.725,-167.7);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFFF").s().p("AhCB5IAAjtIA8AAIABAdQATghAhAAQALAAAJADIgBA9QgNgCgJAAQglAAgKAYIAACbg");
	this.shape_152.setTransform(114.95,-167.7);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("AhKBbQghggAAg1IAAgGQAAgjAOgcQAOgdAZgPQAZgPAgAAQAxAAAcAfQAcAeAAA5IAAAZIiXAAQADAXAQAOQAPAOAXAAQAlAAAUgbIAgAjQgPAVgYALQgYALgeAAQgzAAghgggAgbg6QgMANgDAXIBXAAIAAgFQAAgVgLgLQgLgMgUAAQgSAAgMANg");
	this.shape_153.setTransform(93.925,-167.475);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("Ah2CgIAAk/IBwAAQA5AAAfAWQAeAXAAArQAAAXgMASQgNASgVAIQAZAFAOATQAOATAAAbQAAAugeAYQgdAXg2ABgAg0BrIA4AAQAXAAANgLQANgLAAgUQAAgsgtAAIg8AAgAg0gZIAxAAQAxgBAAgnQAAgVgNgKQgNgKgaAAIguAAg");
	this.shape_154.setTransform(67.475,-171.575);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("AAlCoIg8hfIgWAXIAABIIhAAAIAAlPIBAAAIAAC5IALgPIA8hHIBMAAIhVBiIBdCKg");
	this.shape_155.setTransform(31.1,-172.45);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("AhRBjQgUgWAAgrIAAiaIA/AAIAACZQAAAlAhAAQAgAAAMgXIAAinIA/AAIAADsIg7AAIgCgYQgYAdgoAAQgmAAgUgWg");
	this.shape_156.setTransform(5,-167.25);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("Ag5DSIAAgyQAMACAIAAQAeAAAAgfIAAj6IA+AAIAAD6QAAAngVAWQgVAWgmAAQgRAAgPgEgAgDidQgKgJAAgOQAAgPAKgJQAIgJARAAQARAAAJAJQAJAJAAAPQAAAOgJAJQgKAKgQAAQgQAAgJgKg");
	this.shape_157.setTransform(-15.65,-167.375);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgIgJQgJgKgVAAQgZAAgOAXIAACnIhAAAIAAjtIA9AAIABAcQAZggArAAQAlAAATAWQASAWABAtIAACYg");
	this.shape_158.setTransform(-31.95,-167.7);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FFFFFF").s().p("AhRBjQgUgWgBgrIAAiaIBAAAIAACZQAAAlAiAAQAfAAAMgXIAAinIBAAAIAADsIg8AAIgCgYQgYAdgoAAQgmAAgUgWg");
	this.shape_159.setTransform(-57.15,-167.25);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FFFFFF").s().p("AgjBTIAAh/IgjAAIAAgvIAjAAIAAg6IA/AAIAAA6IAoAAIAAAvIgoAAIAAB1QAAANAFAGQAFAGAOAAQAKAAAJgCIAAAwQgTAGgUAAQhCAAgBhDg");
	this.shape_160.setTransform(-77.575,-170.175);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FFFFFF").s().p("AhKBbQghggAAg1IAAgGQAAgjAOgcQAOgdAZgPQAZgPAgAAQAxAAAcAfQAcAeAAA5IAAAZIiXAAQADAXAQAOQAPAOAXAAQAlAAAUgbIAgAjQgPAVgYALQgYALgeAAQgzAAghgggAgbg6QgMANgDAXIBXAAIAAgFQAAgVgLgLQgLgMgUAAQgSAAgMANg");
	this.shape_161.setTransform(-96.725,-167.475);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FFFFFF").s().p("Ah6CgIAAk/IB8AAQAkAAAbANQAcANAPAZQAOAYAAAfQAAAvgfAaQghAbg5AAIg4AAIAABxgAg3gFIA5AAQAbAAANgNQAOgMAAgXQAAgXgOgPQgOgOgYgBIg7AAg");
	this.shape_162.setTransform(-123,-171.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]},12).to({state:[]},1).wait(12));

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
(lib.game7 = function(mode,startPosition,loop) {
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
		  window.location.replace("../game8/index.html");
		});
		
		root.btnBack3.on("click", function () {
		  window.location.replace("../game6/index.html");
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
		
		root.pp4.gotoAndStop(0);
		
		root.slots.simetri.on("click", function () {
		  root.pp4.gotoAndPlay(0);
		});
		
		root.pp3.gotoAndStop(0);
		
		root.slots.bentuk.on("click", function () {
		  root.pp3.gotoAndPlay(0);
		});
		
		root.pp2.gotoAndStop(0);
		
		root.slots.rongga.on("click", function () {
		  root.pp2.gotoAndPlay(0);
		});
		
		root.pp1.gotoAndStop(0);
		
		root.slots.lapisan.on("click", function () {
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
		  Score.text = pieces.skor * 25;
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
		var tombol;
		var _this = this;
		function init() {
		  stage.enableMouseOver(20);
		  _this.tandaSuaraOn.visible = !_this.tandaSuaraOn.visible;
		  _this.hening.visible = !_this.hening.visible;
		  var preload = new createjs.LoadQueue();
		  preload.addEventListener("fileload", handleFileComplete);
		  preload.loadFile("/sounds/musicBG.mp3", "tombolGan");
		
		  function handleFileComplete(e) {
		    createjs.Sound.registerSound("/sounds/musicBG.mp3", "tombolGan");
		
		    tombol = createjs.Sound.play("tombolGan", { loop: -1 });
		  }
		
		  _this.nyala.on("click", function tombolKlikEd() {
		    tombol.play();
		    _this.nyala.visible = !_this.nyala.visible;
		    _this.tandaSuaraOff.visible = !_this.tandaSuaraOff.visible;
		    _this.hening.visible = !_this.hening.visible;
		    _this.tandaSuaraOn.visible = !_this.tandaSuaraOn.visible;
		  });
		
		  _this.hening.on("click", function tombolKlikEd() {
		    createjs.Sound.stop();
		    _this.hening.visible = !_this.hening.visible;
		    _this.tandaSuaraOn.visible = !_this.tandaSuaraOn.visible;
		    _this.nyala.visible = !_this.nyala.visible;
		    _this.tandaSuaraOff.visible = !_this.tandaSuaraOff.visible;
		  });
		}
		
		init();
		createjs.Sound.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// pp4
	this.pp4 = new lib.pp4();
	this.pp4.name = "pp4";
	this.pp4.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.pp4).wait(1));

	// pp3
	this.pp3 = new lib.pp3();
	this.pp3.name = "pp3";
	this.pp3.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.pp3).wait(1));

	// pp2
	this.pp2 = new lib.pp2();
	this.pp2.name = "pp2";
	this.pp2.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.pp2).wait(1));

	// pp1
	this.pp1 = new lib.pp1();
	this.pp1.name = "pp1";
	this.pp1.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.pp1).wait(1));

	// suara
	this.nyala = new lib.ggg();
	this.nyala.name = "nyala";
	this.nyala.setTransform(503.1,38.2,0.6758,0.6758,0,0,0,-16.2,-1.1);
	new cjs.ButtonHelper(this.nyala, 0, 1, 2, false, new lib.ggg(), 3);

	this.tandaSuaraOn = new lib.an_Image({'id': 'tandaSuaraOn', 'src':'images/animation_500_kdvpuxkb.gif', 'alt':'image', 'border':'0', 'visible':true, 'class':'ui-image'});

	this.tandaSuaraOn.name = "tandaSuaraOn";
	this.tandaSuaraOn.setTransform(437.7,32.05,0.4105,0.4105,0,0,0,50.2,45.2);

	this.hening = new lib.dsdsd();
	this.hening.name = "hening";
	this.hening.setTransform(503.1,38.2,0.6758,0.6758,0,0,0,-16.2,-1.1);
	new cjs.ButtonHelper(this.hening, 0, 1, 2, false, new lib.dsdsd(), 3);

	this.tandaSuaraOff = new lib.an_Image({'id': 'tandaSuaraOff', 'src':'images/animation_500_kdvpuxkb.gif', 'alt':'image', 'border':'0', 'visible':true, 'class':'ui-image'});

	this.tandaSuaraOff.name = "tandaSuaraOff";
	this.tandaSuaraOff.setTransform(438,32.05,0.4105,0.4105,0,0,0,50.2,45.2);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgNASQgEgDAAgGQAAgGAFgDQAFgDAJAAIAHAAIAAgEQAAgEgDgCQgCgCgEAAQgDAAgDACQgDABAAADIgHAAQAAgDACgDQADgDADgCQAEgBAEAAQAHAAAFADQAEAEAAAGIAAAUQAAAFACAEIAAABIgIAAIgBgFQgFAFgGABQgHAAgEgFgAgKAIQAAAEADACQACACAEAAQACAAADgCQADgBACgEIAAgJIgGAAQgNABAAAHg");
	this.shape.setTransform(444.625,59.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgKAWIAAgqIAIAAIAAAFQADgGAGAAIADABIAAAGIgEAAQgGAAgCAHIAAAdg");
	this.shape_1.setTransform(441.25,59.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgNASQgEgDAAgGQAAgGAFgDQAFgDAJAAIAHAAIAAgEQAAgEgDgCQgCgCgEAAQgDAAgDACQgDABAAADIgHAAQAAgDACgDQADgDADgCQAEgBAEAAQAHAAAFADQAEAEAAAGIAAAUQAAAFACAEIAAABIgIAAIgBgFQgFAFgGABQgHAAgEgFgAgKAIQAAAEADACQACACAEAAQACAAADgCQADgBACgEIAAgJIgGAAQgNABAAAHg");
	this.shape_2.setTransform(437.425,59.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgMASQgEgEAAgIIAAgbIAHAAIAAAbQAAAKAIAAQAIgBADgFIAAgfIAHAAIAAAqIgHAAIAAgEQgEAFgIAAQgHAAgDgEg");
	this.shape_3.setTransform(432.975,59.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJAbQgFgCgDgEQgDgEAAgFIAIAAQAAAFADADQAFADAFAAQAGAAAEgCQADgDAAgEQAAgEgDgCQgEgDgHgCQgJgDgEgDQgFgEAAgGQAAgHAGgEQAFgFAHAAQAGAAAGACQAEADACAEQADAEAAAFIgHAAQgBgGgDgDQgDgDgHAAQgEAAgDADQgDACgBAFQAAADADADQAEACAGACQAHACAEACQAEACADADQABAEAAAEQAAAHgGAEQgFAFgJAAQgFAAgFgDg");
	this.shape_4.setTransform(428.3,59.025);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3498DB").s().p("Aj8D9QhphpAAiUQAAiTBphqQBphoCTAAQCVAABoBoQBpBqAACTQAACUhpBpQhoBpiVAAQiTAAhphpg");
	this.shape_5.setTransform(437.8705,37.4545,0.9301,0.9301);

	this.instance = new lib.hehe();
	this.instance.setTransform(476.4,37.5,0.7145,0.9301,0,0,0,86.2,36);
	this.instance.shadow = new cjs.Shadow("rgba(0,0,0,1)",3,3,4);
	this.instance.cache(-2,-2,176,76);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.tandaSuaraOff},{t:this.hening},{t:this.tandaSuaraOn},{t:this.nyala}]}).wait(1));

	// info
	this.popUpInfo = new lib.popUpInfo();
	this.popUpInfo.name = "popUpInfo";
	this.popUpInfo.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.popUpInfo).wait(1));

	// Layer_2
	this.instance_1 = new lib.sustain();
	this.instance_1.setTransform(141.5,44.2,1,1,0,0,0,125.9,18.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// base
	this.winMessage = new cjs.Text("Sepertinya Tebakan Anda Salah, Silahkan Coba Lagi", "17px 'Roboto'", "#FFFFFF");
	this.winMessage.name = "winMessage";
	this.winMessage.textAlign = "center";
	this.winMessage.lineHeight = 22;
	this.winMessage.lineWidth = 418;
	this.winMessage.parent = this;
	this.winMessage.setTransform(476,192);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E74C3C").s().p("Egg7ACMIAAkXMBB3AAAIAAEXg");
	this.shape_6.setTransform(476.025,201);

	this.instance_2 = new lib.info();
	this.instance_2.setTransform(700.3,407);

	this.instance_3 = new lib.geser();
	this.instance_3.setTransform(421.3,350.3);

	this.instance_4 = new lib.teksPengerjaan();
	this.instance_4.setTransform(328.4,166.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgKgFgGQgEgEgKAAQgHAAgGADQgGAFgDAGIAABEIgQAAIAAhfIAPAAIAAANQALgOARgBQAeAAAAAjIAAA+g");
	this.shape_7.setTransform(220.975,217.45);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_8.setTransform(211.075,217.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAXAwIgXhIIgWBIIgNAAIgbhfIAQAAIASBGIAWhGIANAAIAWBIIAShIIAQAAIgbBfg");
	this.shape_9.setTransform(199.4,217.55);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgbAlQgNgNAAgVIAAgDQAAgNAGgLQAFgMAKgGQAKgGAKgBQATAAAKANQAKAMAAAXIAAAFIg/AAQABAOAHAKQAIAIALAAQAJAAAGgEQAFgDAFgGIAKAIQgMASgYAAQgSABgMgNgAgPgcQgGAIgCANIAvAAIAAgCQgBgNgFgGQgHgHgKAAQgIAAgIAHg");
	this.shape_10.setTransform(187.95,217.55);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAgBAIAAg7Ig/AAIAAA7IgRAAIAAh/IARAAIAAA3IA/AAIAAg3IARAAIAAB/g");
	this.shape_11.setTransform(176.65,215.9);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAUBEIgggtIgKALIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_12.setTransform(161.875,215.55);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAFAAACADQACACABAEQgBAEgCADQgCADgFAAQgEAAgCgDg");
	this.shape_13.setTransform(154.55,215.825);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgCA1QgGgGAAgMIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_14.setTransform(149.125,216.5);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgIAAgIIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgDAAgHQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgEgDgEQgEgGAAgHQAAgLAKgJQAKgHAPgBQAQAAAKAJQAKAIAAAOIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAHQgKAJgQgBQgKABgJgFg");
	this.shape_15.setTransform(141.775,217.55);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQADACAAAEQAAAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_16.setTransform(135,215.825);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAQAAIAAAMQAHgNAOgBQAGABACABIAAAPIgIgBQgPAAgGAOIAABDg");
	this.shape_17.setTransform(130.25,217.45);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgbAlQgMgNAAgVIAAgDQgBgNAGgLQAGgMAJgGQAKgGAKgBQATAAAKANQALAMAAAXIAAAFIhAAAQAAAOAIAKQAIAIALAAQAJAAAFgEQAGgDAFgGIAKAIQgMASgYAAQgSABgMgNgAgPgcQgGAIgCANIAvAAIAAgCQgBgNgFgGQgHgHgKAAQgIAAgIAHg");
	this.shape_18.setTransform(122,217.55);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgCA1QgGgGAAgMIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_19.setTransform(113.925,216.5);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAUBEIgggtIgKALIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_20.setTransform(107.325,215.55);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_21.setTransform(97.225,217.55);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAPAAIABAMQAHgNAOgBQAFABADABIAAAPIgIgBQgPAAgGAOIAABDg");
	this.shape_22.setTransform(89.8,217.45);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_23.setTransform(81.325,217.55);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AAcBAIgsg7IgQAQIAAArIgQAAIAAh/IAQAAIAAA/IA5g/IAUAAIgyA5IA2BGg");
	this.shape_24.setTransform(71.6,215.9);

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

	this.pieces = new lib.Pieces6();
	this.pieces.name = "pieces";

	this.slots = new lib.Slots6();
	this.slots.name = "slots";

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

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgDgDABgEQgBgEADgCQACgDAEAAQAFAAACADQACACABAEQgBAEgCADQgCADgFAAQgEAAgCgDg");
	this.shape_25.setTransform(538.95,115.125);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_26.setTransform(531.825,116.85);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgdAnQgHgIgBgSIAAg8IAQAAIAAA8QABAVARABQASgBAGgOIAAhDIARAAIAABdIgQAAIAAgJQgKALgRAAQgPAAgJgJg");
	this.shape_27.setTransform(522,116.95);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgDAAgHQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgEgDgEQgEgGAAgHQAAgLAKgJQAKgHAPgBQAQAAAKAJQAKAIAAAOIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAHQgKAIgQAAQgKABgJgFg");
	this.shape_28.setTransform(512.375,116.85);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgbAlQgNgNAAgWIAAgCQAAgNAGgMQAFgLAKgGQAKgHAKAAQATAAAKANQALAMgBAXIAAAFIg/AAQAAAOAIAKQAIAIALAAQAJAAAFgEQAGgDAFgGIAKAIQgMASgYAAQgSAAgMgMgAgPgcQgGAIgCANIAvAAIAAgCQgBgMgFgHQgHgHgKAAQgIAAgIAHg");
	this.shape_29.setTransform(503.05,116.85);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgDAAgHQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgEgDgEQgEgGAAgHQAAgLAKgJQAKgHAPgBQAQAAAKAJQAKAIAAAOIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAHQgKAIgQAAQgKABgJgFg");
	this.shape_30.setTransform(493.525,116.85);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_31.setTransform(479.225,118.625);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgKgFgFQgEgEgKAAQgHAAgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAAMQALgPARAAQAeABAAAhIAAA+g");
	this.shape_32.setTransform(469.375,116.75);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_33.setTransform(459.475,116.85);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgcBCIgGgBIAAgNIAEAAQAJAAAEgDQAFgDADgJIAEgKIgihdIARAAIAXBGIAWhGIASAAIgnBtQgIAYgTAAg");
	this.shape_34.setTransform(450.35,118.775);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgKgFgFQgEgEgKAAQgHAAgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAAMQALgPARAAQAeABAAAhIAAA+g");
	this.shape_35.setTransform(436.675,116.75);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_36.setTransform(426.775,116.85);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AAWAvIgWhHIgWBHIgNAAIgbhdIAPAAIATBFIAWhFIAMAAIAXBHIAThHIAQAAIgcBdg");
	this.shape_37.setTransform(415.1,116.85);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgbAlQgNgNABgWIAAgCQAAgNAFgMQAGgLAJgGQAKgHAKAAQATAAAKANQAKAMAAAXIAAAFIg/AAQABAOAHAKQAIAIALAAQAJAAAGgEQAGgDAEgGIAKAIQgMASgXAAQgTAAgMgMgAgOgcQgHAIgBANIAuAAIAAgCQAAgMgHgHQgFgHgLAAQgJAAgGAHg");
	this.shape_38.setTransform(403.65,116.85);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AAVBDIAAg/QAAgJgFgFQgEgEgKAAQgHAAgGADQgGAFgDAGIAABDIgQAAIAAiGIAQAAIAAA0QALgOAQAAQAeABAAAgIAAA/g");
	this.shape_39.setTransform(393.875,114.85);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AAzAxIAAg+QAAgLgFgFQgFgEgLgBQgJAAgGAGQgGAFgBAKIAAA+IgPAAIAAg+QAAgUgUgBQgQAAgGAOIAABFIgRAAIAAhfIAQAAIAAALQALgMASAAQATAAAHAPQAEgHAIgEQAIgEAKAAQAfAAABAhIAAA/g");
	this.shape_40.setTransform(734.675,91.15);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgcAoQgJgKABgRIAAg9IAQAAIAAA9QgBAVATAAQARAAAGgNIAAhFIAQAAIAABfIgPAAIgBgKQgJAMgSAAQgPAAgHgJg");
	this.shape_41.setTransform(721.85,91.35);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgHBEIAAiGIAPAAIAACGg");
	this.shape_42.setTransform(714.725,89.25);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgHBEIAAiGIAPAAIAACGg");
	this.shape_43.setTransform(710.375,89.25);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQADACAAAEQAAAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_44.setTransform(706.05,89.525);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgmBAIAAh/IBNAAIAAAOIg9AAIAAArIA1AAIAAAOIg1AAIAAA4g");
	this.shape_45.setTransform(699.35,89.6);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_46.setTransform(685.525,89.25);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_47.setTransform(678.2,89.525);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_48.setTransform(672.775,90.2);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAIQgKAIgQAAQgKgBgJgEg");
	this.shape_49.setTransform(665.425,91.25);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgDgDABgEQgBgEADgCQACgDAEAAQAFAAACADQACACABAEQgBAEgCADQgCADgFAAQgEAAgCgDg");
	this.shape_50.setTransform(658.65,89.525);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAPAAIABALQAHgNAPABQAEgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_51.setTransform(653.9,91.15);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgbAkQgMgMAAgVIAAgDQAAgOAFgKQAFgMAKgGQAKgGAKAAQATAAAKAMQALAMAAAXIAAAGIhAAAQABAOAHAIQAIAJALAAQAJAAAFgDQAHgEAEgGIAKAIQgMATgXAAQgTgBgMgNgAgOgcQgHAHgBANIAuAAIAAgBQgBgNgGgGQgFgHgLAAQgJAAgGAHg");
	this.shape_52.setTransform(645.65,91.25);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_53.setTransform(637.575,90.2);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_54.setTransform(630.975,89.25);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_55.setTransform(620.875,91.25);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAQAAIAAALQAHgNAOABQAFgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_56.setTransform(613.45,91.15);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_57.setTransform(604.975,91.25);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_58.setTransform(596.175,89.25);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAQAAIAAALQAHgNAOABQAFgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_59.setTransform(584,91.15);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_60.setTransform(575.525,91.25);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_61.setTransform(567.425,90.2);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgNBFIAAhSIgPAAIAAgNIAPAAIAAgKQAAgOAIgJQAHgJAPAAIAMACIgBANIgJgBQgIABgEAEQgFAEAAAJIAAAKIAVAAIAAANIgVAAIAABSg");
	this.shape_62.setTransform(561.975,89.15);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_63.setTransform(553.625,91.25);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgcA2QgLgNAAgWIAAgBQAAgVAKgNQAKgNASAAQAPAAAKALIAAgxIAQAAIAACGIgPAAIAAgKQgLALgQABQgRgBgJgOgAgQgHQgHAJAAASQAAAQAHAJQAHAJAKAAQAQAAAHgNIAAgrQgIgOgPAAQgKABgHAIg");
	this.shape_64.setTransform(543.45,89.35);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_65.setTransform(529.175,91.15);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_66.setTransform(519.275,91.25);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_67.setTransform(509.175,93.025);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_68.setTransform(499.325,91.15);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgbAkQgMgMAAgVIAAgDQgBgOAGgKQAGgMAJgGQAKgGAKAAQATAAAKAMQALAMAAAXIAAAGIhAAAQAAAOAIAIQAIAJALAAQAJAAAFgDQAGgEAFgGIAKAIQgMATgYAAQgSgBgMgNgAgPgcQgGAHgCANIAvAAIAAgBQgBgNgGgGQgGgHgKAAQgIAAgIAHg");
	this.shape_69.setTransform(489.65,91.25);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgdA2QgKgNAAgWIAAgBQAAgVAKgNQALgNAQAAQAQAAAKALIAAgxIAQAAIAACGIgPAAIgBgKQgJALgRABQgQgBgLgOgAgQgHQgHAJAAASQAAAQAHAJQAGAJALAAQAQAAAHgNIAAgrQgHgOgQAAQgKABgHAIg");
	this.shape_70.setTransform(479.5,89.35);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_71.setTransform(465.225,91.15);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_72.setTransform(455.325,91.25);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AAWAwIgWhHIgWBHIgNAAIgbhfIAQAAIASBGIAWhGIANAAIAWBIIAShIIARAAIgcBfg");
	this.shape_73.setTransform(443.65,91.25);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgbAkQgNgMAAgVIAAgDQABgOAFgKQAGgMAJgGQAKgGAKAAQATAAAKAMQAKAMAAAXIAAAGIg/AAQABAOAHAIQAIAJALAAQAJAAAGgDQAFgEAFgGIAKAIQgMATgYAAQgSgBgMgNgAgPgcQgGAHgCANIAvAAIAAgBQgBgNgFgGQgHgHgKAAQgIAAgIAHg");
	this.shape_74.setTransform(432.2,91.25);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AAVBEIAAg/QAAgKgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAiGIAQAAIAAAzQALgNAQAAQAegBAAAiIAAA/g");
	this.shape_75.setTransform(422.425,89.25);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_76.setTransform(409.075,89.25);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_77.setTransform(401.75,89.525);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_78.setTransform(396.325,90.2);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAIQgKAIgQAAQgKgBgJgEg");
	this.shape_79.setTransform(388.975,91.25);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQADACgBAEQABAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_80.setTransform(382.2,89.525);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAQAAIAAALQAHgNAOABQAFgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_81.setTransform(377.45,91.15);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgbAkQgNgMAAgVIAAgDQABgOAFgKQAGgMAJgGQAKgGAKAAQATAAAKAMQAKAMAAAXIAAAGIg/AAQABAOAHAIQAIAJALAAQAJAAAGgDQAFgEAFgGIAKAIQgMATgYAAQgSgBgMgNgAgPgcQgGAHgCANIAvAAIAAgBQgBgNgFgGQgHgHgKAAQgIAAgIAHg");
	this.shape_82.setTransform(369.2,91.25);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_83.setTransform(361.125,90.2);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_84.setTransform(354.525,89.25);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_85.setTransform(344.425,91.25);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAPAAIABALQAHgNAPABQAFgBACACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_86.setTransform(337,91.15);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_87.setTransform(328.525,91.25);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_88.setTransform(319.725,89.25);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAQAAIAAALQAHgNAOABQAGgBACACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_89.setTransform(307.55,91.15);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_90.setTransform(299.075,91.25);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_91.setTransform(290.975,90.2);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AgNBFIAAhSIgPAAIAAgNIAPAAIAAgKQAAgOAIgJQAHgJAPAAIAMACIgBANIgJgBQgIABgEAEQgFAEAAAJIAAAKIAVAAIAAANIgVAAIAABSg");
	this.shape_92.setTransform(285.525,89.15);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_93.setTransform(277.175,91.25);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AgcA2QgLgNAAgWIAAgBQAAgVAKgNQALgNARAAQAPAAAKALIAAgxIAQAAIAACGIgPAAIAAgKQgKALgRABQgQgBgKgOgAgQgHQgHAJAAASQAAAQAHAJQAGAJALAAQAQAAAHgNIAAgrQgIgOgPAAQgLABgGAIg");
	this.shape_94.setTransform(267,89.35);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_95.setTransform(252.725,91.15);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_96.setTransform(242.825,91.25);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_97.setTransform(234.025,89.25);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AgeAkQgMgNAAgXIAAAAQAAgOAFgLQAGgLAKgGQAJgHAMABQATAAAMANQAMANAAAWIAAABQAAAOgFALQgFALgKAGQgKAGgNABQgSAAgMgOgAgTgaQgHAKAAARQAAAQAHAJQAIAKALAAQAMAAAIgKQAHgJAAgRQAAgPgHgKQgIgKgMAAQgLAAgIAJg");
	this.shape_98.setTransform(223.775,91.25);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AgbAkQgMgNAAgWIAAgCQAAgOAFgLQAFgKAKgGQAKgHALABQAQAAALAJQAKAKABAPIgPAAQgBgJgGgGQgGgGgKAAQgLAAgHAJQgGAJgBAQIAAADQABAQAGAJQAHAJALAAQAJAAAHgFQAGgGABgIIAPAAQAAAJgFAHQgGAIgIAEQgJAEgKABQgSgBgLgNg");
	this.shape_99.setTransform(214.05,91.25);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AgeAkQgMgNAAgXIAAAAQAAgOAFgLQAGgLAKgGQAJgHAMABQATAAAMANQAMANAAAWIAAABQAAAOgFALQgFALgKAGQgKAGgNABQgSAAgMgOgAgTgaQgHAKAAARQAAAQAHAJQAIAKALAAQAMAAAIgKQAHgJAAgRQAAgPgHgKQgIgKgMAAQgLAAgIAJg");
	this.shape_100.setTransform(204.175,91.25);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AgjAxQgNgQAAgbIAAgMQAAgRAGgOQAGgNAMgIQAMgHAOAAQAVAAAMALQAMAMACAUIgRAAQgCgPgHgHQgIgHgNAAQgPAAgJAMQgJAMAAAWIAAALQAAAVAIAMQAJANAPAAQAOAAAHgHQAIgGACgQIARAAQgCAUgNAMQgMALgVAAQgWAAgOgRg");
	this.shape_101.setTransform(193.375,89.625);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.bf(img.Bitmap2, null, new cjs.Matrix2D(1,0,0,1,-499,-300)).s().p("EhN9Au4MAAAhdvMCb7AAAMAAABdvg");
	this.shape_102.setTransform(471,261);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.btnNextDasar1},{t:this.btnMenuDasar1},{t:this.btnBack3},{t:this.slots},{t:this.pieces},{t:this.judulKI},{t:this.Score},{t:this.restart},{t:this.btnInfo},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.shape_6},{t:this.winMessage}]}).wait(1));

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
		{src:"images/_10.jpeg", id:"_10"},
		{src:"images/_16.jpeg", id:"_16"},
		{src:"images/_25.jpeg", id:"_25"},
		{src:"images/_30.jpeg", id:"_30"},
		{src:"images/Bitmap3.png", id:"Bitmap3"},
		{src:"images/Bitmap92.png", id:"Bitmap92"},
		{src:"images/Bitmap95.png", id:"Bitmap95"},
		{src:"images/bookpngcopy.png", id:"bookpngcopy"},
		{src:"images/Bitmap2.png", id:"Bitmap2"},
		{src:"images/_33.jpeg", id:"_33"},
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