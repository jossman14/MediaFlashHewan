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



(lib._16 = function() {
	this.initialize(img._16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,320,292);


(lib._17 = function() {
	this.initialize(img._17);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,700,467);


(lib._28 = function() {
	this.initialize(img._28);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,259,194);


(lib._36 = function() {
	this.initialize(img._36);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,690,518);


(lib._6 = function() {
	this.initialize(img._6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,683);


(lib._5 = function() {
	this.initialize(img._5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,700,450);


(lib._7 = function() {
	this.initialize(img._7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,201);


(lib.Bitmap1 = function() {
	this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,97,120);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);


(lib.Bitmap3 = function() {
	this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,249,87);


(lib.Bitmap44 = function() {
	this.initialize(img.Bitmap44);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,267,177);


(lib.bookpngcopy = function() {
	this.initialize(img.bookpngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,399);


(lib._32 = function() {
	this.initialize(img._32);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,720,489);


(lib.Bitmap45 = function() {
	this.initialize(img.Bitmap45);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,202,177);// helper functions:

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
	this.shape.graphics.f("#000000").s().p("AgEAlIAAhKIAIAAIAABKg");
	this.shape.setTransform(59.35,59.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgEAkIAAg0IAIAAIAAA0gAgDgaQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAAAgBQAAAAABAAQAAAAABgBQAAAAABAAQAAAAAAAAQAAAAABAAQABAAAAAAQABABAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQgBAAAAAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAg");
	this.shape_1.setTransform(56.925,59.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgKAZQgFgCgCgEQgDgEAAgFIAJAAQABAFADACQADADAFAAQAFAAADgCQADgCAAgDQAAgEgCgCQgEgCgGgBIgKgEIgGgEQgCgDAAgEQAAgGAFgFQAGgFAIAAQAIABAGAFQAFAEABAHIgJAAQAAgEgEgCQgDgDgEAAQgFAAgCACQgDADAAADQAAADADACIAIADIALADQAEABACAEQACADAAAEQAAAHgGAEQgFAFgJgBQgFAAgGgCg");
	this.shape_2.setTransform(53.1,60.65);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgQAXQgFgEAAgHQAAgIAGgEQAHgFAKABIAJAAIAAgFQAAgFgDgCQgDgDgFAAQgEAAgDACQgEADAAADIgJAAQAAgDADgFQADgDAFgCQAEgDAFAAQAJABAFAFQAGAEAAAIIAAAXQAAAIACADIAAABIgKAAIgBgFQgGAHgIgBQgIABgFgFgAgMALQAAAEADACQADADAEAAQADgBAEgCQAEgCACgDIAAgLIgHAAQgQAAAAAKg");
	this.shape_3.setTransform(47.825,60.65);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AASAjIAAggIgjAAIAAAgIgJAAIAAhGIAJAAIAAAfIAjAAIAAgfIAJAAIAABGg");
	this.shape_4.setTransform(41.525,59.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFFFFF").ss(3,1,1).p("AntpVIPbAAIAASrIvbAAg");
	this.shape_5.setTransform(49.35,59.825);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(102,153,51,0.318)").s().p("AntJWIAAyrIPbAAIAASrg");
	this.shape_6.setTransform(49.35,59.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hasil, new cjs.Rectangle(-1.5,-1.5,101.7,122.7), null);


(lib.gem10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(3,1,1).p("AntpVIPbAAIAASrIvbAAg");
	this.shape.setTransform(49.35,59.825);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(2));

	// Layer_1
	this.instance = new lib.Bitmap45();
	this.instance.setTransform(0,0,0.4906,0.4973);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2D53AB").s().p("AgJAZQgFgCgCgEQgCgEgBgFIAJAAQAAAFADACQADADAEAAQAGAAACgCQADgCAAgEQAAgDgDgCQgCgCgGgCIgKgDQgEgBgBgDQgCgDAAgEQAAgGAFgFQAGgEAGAAQAJAAAFAEQAFAFAAAHIgIAAQgBgEgDgCQgCgDgFAAQgEAAgCACQgDACAAAEQAAADADACIAIADIAKADQAEACABADQACACABAFQgBAHgFAEQgFAEgJAAQgFAAgEgCg");
	this.shape_1.setTransform(60.2,112.275);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2D53AB").s().p("AgPAXQgEgFAAgGQAAgJAGgDQAFgFAKAAIAIAAIAAgEQAAgEgCgDQgDgDgFAAQgEAAgDACQgDADAAADIgIAAQAAgEACgDQADgEAEgCQAFgCAEAAQAJAAAFAEQAFAFAAAIIAAAXQAAAHABAEIAAABIgIAAIgCgFQgFAGgIAAQgHAAgFgEgAgLAKQAAAFADACQACACAFAAQADAAADgCQAEgCABgDIAAgLIgGAAQgPAAAAAJg");
	this.shape_2.setTransform(55.275,112.275);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2D53AB").s().p("AgUAlIAAhIIAIAAIAAAGQAFgHAJAAQAIAAAGAHQAFAIAAAMIAAABQAAALgFAHQgFAIgJAAQgIAAgFgGIAAAZgAgLgVIAAAYQADAHAIAAQAFAAAEgFQADgFAAgJQAAgJgDgFQgEgFgFAAQgIAAgDAHg");
	this.shape_3.setTransform(50.225,113.225);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2D53AB").s().p("AgEAkIAAg0IAIAAIAAA0gAgDgaIgBgEIABgDQAAgBABAAQAAAAABAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQAAAAABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_4.setTransform(46.35,111.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2D53AB").s().p("AgKAjQgFgCgCgFIAEgGQAFAIAIAAQAFAAAEgEQADgDAAgHIAAgFQgFAHgHAAQgJAAgFgIQgGgHAAgMQAAgNAFgGQAGgIAJAAQAIAAAFAHIAAgGIAIAAIAAAyQAAALgGAFQgGAGgJAAQgEAAgGgCgAgIgYQgDAGAAAKQAAAIADAFQADAFAGAAQAIAAADgIIAAgXQgEgIgHABQgFAAgEAEg");
	this.shape_5.setTransform(42.475,113.25);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2D53AB").s().p("AgPAXQgEgFAAgGQAAgJAGgDQAFgFAKAAIAIAAIAAgEQAAgEgCgDQgDgDgFAAQgEAAgDACQgDADAAADIgIAAQAAgEACgDQADgEAEgCQAFgCAEAAQAJAAAFAEQAFAFAAAIIAAAXQAAAHABAEIAAABIgIAAIgCgFQgFAGgIAAQgHAAgFgEgAgLAKQAAAFADACQACACAFAAQADAAADgCQAEgCABgDIAAgLIgGAAQgPAAAAAJg");
	this.shape_6.setTransform(74.825,95.375);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2D53AB").s().p("AgLAbIAAg0IAIAAIAAAGQAEgHAHAAIAEABIAAAIIgFAAQgHAAgCAHIAAAlg");
	this.shape_7.setTransform(71,95.325);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2D53AB").s().p("AgOAeQgGgHAAgMIAAgBQAAgLAFgHQAGgIAJAAQAHAAAFAHIAAgcIAJAAIAABKIgIAAIAAgGQgFAHgJAAQgIAAgFgIgAgIgDQgDAEAAAKQAAAJADAFQADAFAGAAQAIAAADgIIAAgXQgDgHgIAAQgGAAgDAFg");
	this.shape_8.setTransform(66.425,94.325);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2D53AB").s().p("AALAbIAAgiQAAgGgCgCQgDgDgFAAQgDAAgDACQgDADgCADIAAAlIgIAAIAAg0IAIAAIAAAHQAGgIAIAAQAPAAAAATIAAAig");
	this.shape_9.setTransform(61.325,95.325);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2D53AB").s().p("AgOAUQgGgHAAgMIAAgBQAAgHADgGQADgGAFgEQAFgDAFAAQAJAAAGAGQAFAHAAANIAAADIggAAQAAAHAEAFQAEAFAFAAQAFAAADgCQADgCADgDIAEAEQgFAKgNAAQgJAAgHgHgAgHgPQgDAEgBAHIAXAAIAAgBQAAgGgDgEQgDgEgFAAQgFAAgDAEg");
	this.shape_10.setTransform(56.3,95.375);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2D53AB").s().p("AgUAlIAAhIIAIAAIAAAGQAFgHAJAAQAIAAAGAHQAFAIAAAMIAAABQAAALgFAHQgFAIgJAAQgIAAgFgGIAAAZgAgLgVIAAAYQADAHAIAAQAFAAAEgFQADgFAAgJQAAgJgDgFQgEgFgFAAQgIAAgDAHg");
	this.shape_11.setTransform(51.275,96.325);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2D53AB").s().p("AgPAUQgHgIAAgMIAAAAQABgHADgGQACgHAGgDQAFgDAFAAQAKAAAHAHQAFAIAAALIAAABQAAAHgCAGQgDAGgFAEQgFADgHAAQgJAAgGgHgAgJgOQgEAGAAAJQAAAIAEAGQAEAFAFAAQAHAAADgFQAEgGAAgJQAAgIgEgGQgDgFgHAAQgFAAgEAFg");
	this.shape_12.setTransform(45.85,95.375);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2D53AB").s().p("AgDAlIAAhJIAHAAIAABJg");
	this.shape_13.setTransform(42.075,94.275);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2D53AB").s().p("AgPAUQgGgIgBgMIAAAAQAAgHADgGQAEgHAEgDQAGgDAFAAQAKAAAGAHQAHAIAAALIAAABQgBAHgCAGQgDAGgFAEQgFADgHAAQgJAAgGgHgAgJgOQgEAGAAAJQAAAIAEAGQAEAFAFAAQAGAAAFgFQADgGAAgJQAAgIgDgGQgFgFgGAAQgFAAgEAFg");
	this.shape_14.setTransform(38.25,95.375);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2D53AB").s().p("AgOAUQgGgHAAgNIAAAAQAAgIADgGQADgGAEgDQAGgDAFAAQAJAAAFAFQAFAFABAJIgIAAQgBgFgDgEQgDgDgFAAQgFAAgEAFQgDAFAAAJIAAABQAAAJADAFQAEAFAFAAQAEAAAEgDQADgDABgEIAIAAQgBAEgCAEQgDAEgEADQgFACgFAAQgJAAgGgHg");
	this.shape_15.setTransform(33.2,95.375);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2D53AB").s().p("AgLAhQgGgCgDgFQgDgFAAgGIAJAAQAAAGAEAEQAFAEAGAAQAHAAAEgDQADgDAAgGQAAgFgDgDQgDgDgJgCQgLgEgFgEQgFgFAAgHQAAgJAGgFQAHgFAJAAQAGAAAGACQAFADADAFQADAFAAAGIgJAAQAAgGgEgEQgDgEgHAAQgGAAgDADQgEADAAAGQAAAEADADQAEADAHACQAIADAFACQAFADACAEQACAEAAAFQAAAJgGAFQgGAFgLAAQgGAAgGgDg");
	this.shape_16.setTransform(27.925,94.475);

	this.instance_1 = new lib.Bitmap1();
	this.instance_1.setTransform(0,0,1.0217,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.instance}]}).wait(3));

	// Layer_3
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(51,51,51,0.2)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_17.setTransform(41.55,68.6125);
	this.shape_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(1).to({_off:false},0).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8,-1.5,108.2,130.2);


(lib.gem9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(3,1,1).p("AntpVIPbAAIAASrIvbAAg");
	this.shape.setTransform(49.35,59.825);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(2));

	// Layer_1
	this.instance = new lib.Bitmap44();
	this.instance.setTransform(0,0,0.3711,0.4973);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2D53AB").s().p("AgPAXQgEgFAAgGQAAgJAGgDQAFgFAKAAIAIAAIAAgEQAAgEgCgDQgDgDgFAAQgEAAgDACQgDADAAADIgIAAQAAgEACgDQADgEAEgCQAFgCAEAAQAJAAAFAEQAFAFAAAIIAAAXQAAAHABAEIAAABIgIAAIgCgFQgFAGgIAAQgHAAgFgEgAgLAKQAAAFADACQACACAFAAQADAAADgCQAEgCABgDIAAgLIgGAAQgPAAAAAJg");
	this.shape_1.setTransform(66.175,99.625);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2D53AB").s().p("AgDAlIAAhJIAHAAIAABJg");
	this.shape_2.setTransform(62.525,98.525);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2D53AB").s().p("AgDAlIAAhJIAHAAIAABJg");
	this.shape_3.setTransform(60.225,98.525);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2D53AB").s().p("AgEAkIAAg0IAIAAIAAA0gAgDgaIgBgEIABgDQAAgBABAAQAAAAABAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAAAABQABAAAAABQAAAAABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_4.setTransform(58,98.675);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2D53AB").s().p("AgKAjQgFgDgCgEIAEgFQAFAHAIAAQAFAAAEgEQADgEAAgGIAAgEQgFAFgHAAQgJAAgFgHQgGgIAAgLQAAgMAFgHQAGgIAJAAQAIAAAFAHIAAgGIAIAAIAAAyQAAAKgGAHQgGAFgJAAQgEAAgGgCgAgIgXQgDAFAAAKQAAAIADAFQADAFAGAAQAIAAADgIIAAgXQgEgHgHAAQgFgBgEAGg");
	this.shape_5.setTransform(54.075,100.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2D53AB").s().p("AALAbIAAgiQAAgGgCgCQgDgDgFAAQgDAAgDACQgDADgCADIAAAlIgIAAIAAg0IAIAAIAAAHQAGgIAIAAQAPAAAAATIAAAig");
	this.shape_6.setTransform(49.025,99.575);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2D53AB").s().p("AgPAUQgGgIgBgMIAAAAQAAgHADgGQAEgHAEgDQAGgDAFAAQAKAAAGAHQAHAIgBALIAAABQABAHgDAGQgDAGgFAEQgFADgHAAQgJAAgGgHgAgJgOQgEAGAAAJQAAAIAEAGQAEAFAFAAQAGAAAFgFQADgGAAgJQAAgIgDgGQgFgFgGAAQgFAAgEAFg");
	this.shape_7.setTransform(43.75,99.625);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2D53AB").s().p("AgUAlIAAhIIAIAAIAAAGQAFgHAJAAQAIAAAGAHQAFAIAAAMIAAABQAAALgFAHQgFAIgJAAQgIAAgFgGIAAAZgAgLgVIAAAYQADAHAIAAQAFAAAEgFQADgFAAgJQAAgJgDgFQgEgFgFAAQgIAAgDAHg");
	this.shape_8.setTransform(38.575,100.575);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2D53AB").s().p("AgLAhQgGgCgDgFQgDgFAAgGIAJAAQAAAGAEAEQAFAEAGAAQAHAAAEgDQADgDAAgGQAAgFgDgDQgDgDgJgCQgLgEgFgEQgFgFAAgHQAAgJAGgFQAHgFAJAAQAGAAAGACQAFADADAFQADAFAAAGIgJAAQAAgGgEgEQgDgEgHAAQgGAAgDADQgEADAAAGQAAAEADADQAEADAHACQAIADAFACQAFADACAEQACAEAAAFQAAAJgGAFQgGAFgLAAQgGAAgGgDg");
	this.shape_9.setTransform(33.075,98.725);

	this.instance_1 = new lib.Bitmap1();
	this.instance_1.setTransform(0,0,1.0217,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.instance}]}).wait(3));

	// Layer_3
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(51,51,51,0.2)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_10.setTransform(41.55,68.6125);
	this.shape_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(1).to({_off:false},0).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8,-1.5,108.2,130.2);


(lib.gem8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(3,1,1).p("AntpVIPbAAIAASrIvbAAg");
	this.shape.setTransform(49.35,59.825);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(2));

	// Layer_1
	this.instance = new lib._32();
	this.instance.setTransform(0,0,0.1376,0.18);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2D53AB").s().p("AgDAEQAAgBAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAABAAAAQABABAAAAQAAABAAAAQAAAAAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAAAAAABQAAAAgBAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_1.setTransform(74.475,101.775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2D53AB").s().p("AgUAlIAAhIIAIAAIAAAGQAFgHAJAAQAIAAAGAHQAFAIAAAMIAAABQAAALgFAHQgFAIgJAAQgIAAgFgGIAAAZgAgLgVIAAAYQADAHAIAAQAFAAAEgFQADgFAAgJQAAgJgDgFQgEgFgFAAQgIAAgDAHg");
	this.shape_2.setTransform(70.775,100.575);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2D53AB").s().p("AgJAZQgFgCgCgEQgCgEgBgFIAJAAQAAAFADACQADADAEAAQAGAAACgCQADgCAAgEQAAgDgDgCQgCgCgGgCIgKgDQgEgBgBgDQgCgDAAgEQAAgGAFgFQAGgEAGAAQAJAAAFAEQAFAFAAAHIgIAAQgBgEgDgCQgCgDgFAAQgEAAgCACQgDACAAAEQAAADADACIAIADIAKADQAEACABADQACACABAFQgBAHgFAEQgFAEgJAAQgFAAgEgCg");
	this.shape_3.setTransform(65.6,99.625);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2D53AB").s().p("AALAaIgLgTIgLATIgJAAIAQgaIgQgZIAKAAIAKATIALgTIAKAAIgRAZIARAag");
	this.shape_4.setTransform(58.575,99.625);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2D53AB").s().p("AgEAkIAAg0IAIAAIAAA0gAgDgaIgBgEIABgDQAAgBABAAQAAAAABAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAAAABQABAAAAABQAAAAABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_5.setTransform(55.1,98.675);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2D53AB").s().p("AgLAbIAAg0IAIAAIAAAGQADgHAIAAIAEABIAAAIIgFAAQgHAAgDAHIAAAlg");
	this.shape_6.setTransform(52.65,99.575);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2D53AB").s().p("AgBAeQgDgEAAgHIAAgfIgJAAIAAgHIAJAAIAAgNIAIAAIAAANIAJAAIAAAHIgJAAIAAAfIABAFQAAAAABABQAAAAABAAQAAABABAAQABAAABAAIADgBIAAAHIgGABQgGAAgCgDg");
	this.shape_7.setTransform(49.15,99.025);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2D53AB").s().p("AgPAUQgGgIgBgMIAAAAQAAgHADgGQAEgHAEgDQAGgDAFAAQAKAAAGAHQAHAIgBALIAAABQABAHgDAGQgDAGgFAEQgFADgHAAQgJAAgGgHgAgJgOQgEAGAAAJQAAAIAEAGQAEAFAFAAQAGAAAFgFQADgGAAgJQAAgIgDgGQgFgFgGAAQgFAAgEAFg");
	this.shape_8.setTransform(45.1,99.625);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2D53AB").s().p("AgEAkIAAg0IAIAAIAAA0gAgDgaIgBgEIABgDQAAgBABAAQAAAAABAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAAAABQABAAAAABQAAAAABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_9.setTransform(41.35,98.675);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2D53AB").s().p("AALAlIAAgjQAAgEgCgDQgDgDgFAAQgDAAgDADQgDACgCADIAAAlIgIAAIAAhJIAIAAIAAAcQAGgHAIAAQAPAAAAASIAAAig");
	this.shape_10.setTransform(37.625,98.525);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2D53AB").s().p("AgUAlIAAhIIAIAAIAAAGQAFgHAJAAQAIAAAGAHQAFAIAAAMIAAABQAAALgFAHQgFAIgJAAQgIAAgFgGIAAAZgAgLgVIAAAYQADAHAIAAQAFAAAEgFQADgFAAgJQAAgJgDgFQgEgFgFAAQgIAAgDAHg");
	this.shape_11.setTransform(32.525,100.575);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2D53AB").s().p("AgNAgQgGgEgDgIQgEgHAAgKIAAgEQAAgLADgHQAEgIAGgEQAGgEAHAAQAIAAAGAEQAGAEADAIQAEAHAAALIAAADQAAALgEAHQgDAIgGAEQgGAEgIAAQgHAAgGgEgAgMgVQgFAHAAAMIAAAEQAAAMAFAHQAEAHAIAAQAIAAAFgGQAFgHAAgMIAAgEQAAgNgFgHQgFgGgIAAQgHAAgFAGg");
	this.shape_12.setTransform(26.575,98.725);

	this.instance_1 = new lib.Bitmap1();
	this.instance_1.setTransform(0,0,1.0217,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.instance}]}).wait(3));

	// Layer_3
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("rgba(51,51,51,0.2)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_13.setTransform(41.55,68.6125);
	this.shape_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(1).to({_off:false},0).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8,-1.5,108.2,130.2);


(lib.gem7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(3,1,1).p("AntpVIPbAAIAASrIvbAAg");
	this.shape.setTransform(49.35,59.825);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(2));

	// Layer_1
	this.instance = new lib._36();
	this.instance.setTransform(0,-1,0.1436,0.1699);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2D53AB").s().p("AgPAXQgEgFAAgGQAAgJAGgDQAFgFAKAAIAIAAIAAgEQAAgEgCgDQgDgDgFAAQgEAAgDACQgDADAAADIgIAAQAAgEACgDQADgEAEgCQAFgCAEAAQAJAAAFAEQAFAFAAAIIAAAXQAAAHABAEIAAABIgIAAIgCgFQgFAGgIAAQgHAAgFgEgAgLAKQAAAFADACQACACAFAAQADAAADgCQAEgCABgDIAAgLIgGAAQgPAAAAAJg");
	this.shape_1.setTransform(61.175,113.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2D53AB").s().p("AgLAbIAAg0IAIAAIAAAGQAEgHAHAAIAEABIAAAIIgEAAQgIAAgDAHIAAAlg");
	this.shape_2.setTransform(57.35,112.975);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2D53AB").s().p("AgMAfIAAAGIgIAAIAAhKIAJAAIAAAcQAFgHAIAAQAJAAAFAHQAFAIAAALIAAABQAAAMgFAHQgFAIgJAAQgJAAgFgHgAgLAAIAAAWQADAIAIAAQAGAAADgFQADgFAAgKQAAgJgDgEQgDgFgGAAQgIAAgDAIg");
	this.shape_3.setTransform(52.975,111.975);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2D53AB").s().p("AgPAXQgEgFAAgGQAAgJAGgDQAFgFAKAAIAIAAIAAgEQAAgEgCgDQgDgDgFAAQgEAAgDACQgDADAAADIgIAAQAAgEACgDQADgEAEgCQAFgCAEAAQAJAAAFAEQAFAFAAAIIAAAXQAAAHABAEIAAABIgIAAIgCgFQgFAGgIAAQgHAAgFgEgAgLAKQAAAFADACQACACAFAAQADAAADgCQAEgCABgDIAAgLIgGAAQgPAAAAAJg");
	this.shape_4.setTransform(47.675,113.025);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2D53AB").s().p("AgOAUQgGgHAAgNIAAAAQAAgIADgGQACgGAFgDQAGgDAFAAQAIAAAGAFQAFAFABAJIgIAAQgBgFgDgEQgDgDgFAAQgFAAgEAFQgDAFgBAJIAAABQABAJADAFQAEAFAFAAQAEAAAEgDQADgDABgEIAIAAQgBAEgCAEQgDAEgEADQgFACgFAAQgJAAgGgHg");
	this.shape_5.setTransform(42.75,113.025);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2D53AB").s().p("AgJAZQgEgCgDgEQgDgEAAgFIAJAAQAAAFADACQADADAFAAQAEAAADgCQADgCAAgEQAAgDgDgCQgCgCgGgCIgKgDQgEgBgBgDQgCgDAAgEQAAgGAFgFQAFgEAIAAQAHAAAGAEQAFAFAAAHIgIAAQAAgEgEgCQgDgDgDAAQgFAAgCACQgDACAAAEQAAADADACIAIADIAKADQAEACABADQADACAAAFQgBAHgFAEQgFAEgIAAQgGAAgEgCg");
	this.shape_6.setTransform(37.8,113.025);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2D53AB").s().p("AgPAXQgEgFAAgGQAAgJAGgDQAFgFAKAAIAIAAIAAgEQAAgEgCgDQgDgDgFAAQgEAAgDACQgDADAAADIgIAAQAAgEACgDQADgEAEgCQAFgCAEAAQAJAAAFAEQAFAFAAAIIAAAXQAAAHABAEIAAABIgIAAIgCgFQgFAGgIAAQgHAAgFgEgAgLAKQAAAFADACQACACAFAAQADAAADgCQAEgCABgDIAAgLIgGAAQgPAAAAAJg");
	this.shape_7.setTransform(68.725,96.125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2D53AB").s().p("AgDAkIAAg0IAHAAIAAA0gAgDgaIgBgEIABgDQAAgBABAAQAAAAABAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQAAAAABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_8.setTransform(65.05,95.175);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2D53AB").s().p("AgLAbIAAg0IAIAAIAAAGQADgHAIAAIAEABIAAAIIgEAAQgIAAgCAHIAAAlg");
	this.shape_9.setTransform(62.6,96.075);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2D53AB").s().p("AgOAWQgEgFgBgKIAAghIAJAAIAAAhQAAAMAJAAQAJAAADgIIAAglIAJAAIAAA0IgIAAIAAgFQgGAGgIAAQgIAAgEgFg");
	this.shape_10.setTransform(58.15,96.175);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2D53AB").s().p("AALAlIAAgjQAAgEgCgDQgDgDgFAAQgDAAgDADQgDACgCADIAAAlIgIAAIAAhJIAIAAIAAAcQAGgHAIAAQAPAAAAASIAAAig");
	this.shape_11.setTransform(53.025,95.025);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2D53AB").s().p("AAAAeQgEgEAAgHIAAgfIgJAAIAAgHIAJAAIAAgNIAIAAIAAANIAJAAIAAAHIgJAAIAAAfIABAFQAAAAABABQAAAAABAAQAAABABAAQABAAABAAIADgBIAAAHIgGABQgGAAgBgDg");
	this.shape_12.setTransform(48.8,95.525);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2D53AB").s().p("AgPAUQgGgIgBgMIAAAAQAAgHAEgGQADgHAEgDQAGgDAFAAQAKAAAHAHQAFAIAAALIAAABQABAHgDAGQgDAGgFAEQgFADgHAAQgJAAgGgHgAgJgOQgEAGAAAJQAAAIAEAGQAEAFAFAAQAHAAAEgFQADgGAAgJQAAgIgDgGQgEgFgHAAQgFAAgEAFg");
	this.shape_13.setTransform(44.75,96.125);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2D53AB").s().p("AgDAlIAAhJIAHAAIAABJg");
	this.shape_14.setTransform(40.975,95.025);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2D53AB").s().p("AgPAUQgGgIAAgMIAAAAQAAgHACgGQAEgHAFgDQAEgDAGAAQAKAAAGAHQAHAIAAALIAAABQgBAHgCAGQgDAGgFAEQgFADgHAAQgJAAgGgHgAgJgOQgEAGAAAJQAAAIAEAGQAEAFAFAAQAGAAAEgFQAEgGAAgJQAAgIgEgGQgEgFgGAAQgFAAgEAFg");
	this.shape_15.setTransform(37.15,96.125);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2D53AB").s().p("AARAjIAAggIghAAIAAAgIgJAAIAAhFIAJAAIAAAeIAhAAIAAgeIAJAAIAABFg");
	this.shape_16.setTransform(31.175,95.225);

	this.instance_1 = new lib.Bitmap1();
	this.instance_1.setTransform(0,0,1.0217,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.instance}]}).wait(3));

	// Layer_3
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(51,51,51,0.2)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_17.setTransform(41.55,68.6125);
	this.shape_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(1).to({_off:false},0).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8,-1.5,108.2,130.2);


(lib.gem6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(3,1,1).p("AntpVIPbAAIAASrIvbAAg");
	this.shape.setTransform(49.35,59.825);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(2));

	// Layer_1
	this.instance = new lib._28();
	this.instance.setTransform(0,0,0.3826,0.4536);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2D53AB").s().p("AgJAZQgFgCgCgEQgCgEgBgFIAJAAQAAAFADACQADADAEAAQAGAAACgCQADgCAAgEQAAgDgDgCQgCgCgGgCIgKgDQgDgBgCgDQgCgDAAgEQAAgGAFgFQAGgEAGAAQAJAAAFAEQAFAFAAAHIgJAAQAAgEgDgCQgCgDgFAAQgEAAgCACQgCACgBAEQABADACACIAHADIALADQAEACABADQACACAAAFQAAAHgEAEQgGAEgJAAQgEAAgFgCg");
	this.shape_1.setTransform(65.05,112.525);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2D53AB").s().p("AgOAWQgEgFgBgKIAAghIAJAAIAAAhQAAAMAJAAQAJAAADgIIAAglIAIAAIAAA0IgHAAIAAgFQgGAGgIAAQgIAAgEgFg");
	this.shape_2.setTransform(60.1,112.575);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2D53AB").s().p("AgBAeQgDgEAAgHIAAgfIgJAAIAAgHIAJAAIAAgNIAIAAIAAANIAJAAIAAAHIgJAAIAAAfIABAFQAAAAABABQAAAAABAAQAAAAABABQABAAABAAIADgBIAAAHIgGABQgGAAgCgDg");
	this.shape_3.setTransform(55.9,111.925);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2D53AB").s().p("AgPAXQgEgFAAgGQAAgJAGgDQAFgFAKAAIAIAAIAAgEQAAgEgCgDQgDgDgFAAQgEAAgDACQgDADAAADIgIAAQAAgEACgDQADgEAEgCQAFgCAEAAQAJAAAFAEQAFAFAAAIIAAAXQAAAHABAEIAAABIgIAAIgCgFQgFAGgIAAQgHAAgFgEgAgLAKQAAAFADACQACACAFAAQADAAADgCQAEgCABgDIAAgLIgGAAQgPAAAAAJg");
	this.shape_4.setTransform(51.925,112.525);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2D53AB").s().p("AALAbIAAgiQAAgGgCgCQgDgDgFAAQgDAAgDACQgDADgCADIAAAlIgIAAIAAg0IAIAAIAAAHQAGgIAIAAQAPAAAAATIAAAig");
	this.shape_5.setTransform(46.825,112.475);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2D53AB").s().p("AALAbIAAgiQAAgGgCgCQgDgDgFAAQgDAAgDACQgDADgCADIAAAlIgIAAIAAg0IAIAAIAAAHQAGgIAIAAQAPAAAAATIAAAig");
	this.shape_6.setTransform(41.725,112.475);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2D53AB").s().p("AgEAkIAAg0IAIAAIAAA0gAgDgaIgBgEIABgDQAAgBABAAQAAAAABAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAAAABQABAAAAABQAAAAABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_7.setTransform(38,111.575);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2D53AB").s().p("AgUAlIAAhIIAIAAIAAAGQAFgHAJAAQAIAAAGAHQAFAIAAAMIAAABQAAALgFAHQgFAIgJAAQgIAAgFgGIAAAZgAgLgVIAAAYQADAHAIAAQAFAAAEgFQADgFAAgJQAAgJgDgFQgEgFgFAAQgIAAgDAHg");
	this.shape_8.setTransform(34.325,113.475);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2D53AB").s().p("AgJAZQgFgCgCgEQgCgEgBgFIAJAAQAAAFADACQADADAEAAQAGAAACgCQADgCAAgEQAAgDgDgCQgCgCgGgCIgKgDQgEgBgBgDQgCgDAAgEQAAgGAFgFQAGgEAGAAQAJAAAFAEQAFAFAAAHIgIAAQgBgEgDgCQgCgDgFAAQgEAAgCACQgDACAAAEQAAADADACIAIADIAKADQAEACABADQACACABAFQgBAHgEAEQgGAEgJAAQgFAAgEgCg");
	this.shape_9.setTransform(69.2,95.625);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2D53AB").s().p("AgOAWQgEgFgBgKIAAghIAJAAIAAAhQAAAMAJAAQAJAAADgIIAAglIAJAAIAAA0IgIAAIAAgFQgGAGgIAAQgIAAgEgFg");
	this.shape_10.setTransform(64.25,95.675);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2D53AB").s().p("AALAbIAAgiQAAgGgCgCQgDgDgFAAQgDAAgDACQgDADgCADIAAAlIgIAAIAAg0IAIAAIAAAHQAGgIAIAAQAPAAAAATIAAAig");
	this.shape_11.setTransform(59.125,95.575);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2D53AB").s().p("AgDAkIAAg0IAHAAIAAA0gAgDgaIgBgEIABgDQAAgBABAAQAAAAABAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAAAABQABAAAAABQAAAAABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_12.setTransform(55.4,94.675);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2D53AB").s().p("AgLAbIAAg0IAIAAIAAAGQAEgHAHAAIAEABIAAAIIgEAAQgIAAgDAHIAAAlg");
	this.shape_13.setTransform(52.95,95.575);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2D53AB").s().p("AgOAUQgGgHAAgNIAAAAQAAgIADgGQACgGAFgDQAGgDAFAAQAIAAAGAFQAFAFABAJIgIAAQgBgFgDgEQgDgDgFAAQgGAAgDAFQgDAFgBAJIAAABQABAJADAFQADAFAGAAQAFAAADgDQADgDABgEIAIAAQgBAEgCAEQgDAEgEADQgFACgFAAQgJAAgGgHg");
	this.shape_14.setTransform(48.7,95.625);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2D53AB").s().p("AgPAUQgGgIAAgMIAAAAQAAgHACgGQADgHAFgDQAFgDAGAAQAKAAAGAHQAHAIAAALIAAABQgBAHgCAGQgDAGgFAEQgFADgHAAQgJAAgGgHgAgJgOQgEAGAAAJQAAAIAEAGQAEAFAFAAQAGAAAFgFQADgGAAgJQAAgIgDgGQgFgFgGAAQgFAAgEAFg");
	this.shape_15.setTransform(43.55,95.625);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2D53AB").s().p("AgDAlIAAhJIAHAAIAABJg");
	this.shape_16.setTransform(39.725,94.525);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2D53AB").s().p("AgEAkIAAg0IAIAAIAAA0gAgDgaIgBgEIABgDQAAgBABAAQAAAAABAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAAAABQABAAAAABQAAAAABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_17.setTransform(37.45,94.675);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2D53AB").s().p("AAAAeQgDgEAAgHIAAgfIgJAAIAAgHIAJAAIAAgNIAHAAIAAANIAJAAIAAAHIgJAAIAAAfIABAFQAAAAABABQAAAAABAAQAAAAABABQABAAAAAAIAFgBIAAAHIgHABQgGAAgBgDg");
	this.shape_18.setTransform(34.7,95.025);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2D53AB").s().p("AgXAjIAAhFIAYAAQALAAAGAFQAGAGAAAKQAAAKgGAFQgGAGgLAAIgPAAIAAAbgAgOAAIAPAAQAHAAADgDQAEgDAAgHQAAgGgEgEQgEgEgGAAIgPAAg");
	this.shape_19.setTransform(30.55,94.725);

	this.instance_1 = new lib.Bitmap1();
	this.instance_1.setTransform(0,0,1.0217,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.instance}]}).wait(3));

	// Layer_3
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("rgba(51,51,51,0.2)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_20.setTransform(41.55,68.6125);
	this.shape_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_20).wait(1).to({_off:false},0).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8,-1.5,108.2,130.2);


(lib.gem5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(3,1,1).p("AntpVIPbAAIAASrIvbAAg");
	this.shape.setTransform(49.35,59.825);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(2));

	// Layer_1
	this.instance = new lib._16();
	this.instance.setTransform(0,0,0.3097,0.3014);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2D53AB").s().p("AgEAkIAAg0IAIAAIAAA0gAgDgaIgBgEIABgDQAAgBABAAQAAAAABAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAAAABQABAAAAABQAAAAABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_1.setTransform(81.3,98.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2D53AB").s().p("AgJAZQgEgCgDgEQgCgEAAgFIAIAAQAAAFADACQAEADAEAAQAFAAADgCQACgCAAgEQAAgDgCgCQgDgCgGgCIgJgDQgFgBgBgDQgCgDAAgEQAAgGAFgFQAFgEAIAAQAHAAAGAEQAFAFAAAHIgJAAQABgEgDgCQgEgDgDAAQgEAAgDACQgDACABAEQgBADADACIAHADIALADQAEACACADQABACABAFQAAAHgGAEQgFAEgIAAQgFAAgFgCg");
	this.shape_2.setTransform(77.7,99.625);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2D53AB").s().p("AgNAUQgHgHAAgMIAAgBQAAgHADgGQADgGAFgEQAFgDAFAAQAJAAAGAGQAFAHAAANIAAADIghAAQABAHAEAFQAEAFAGAAQAEAAADgCQADgCACgDIAGAEQgHAKgMAAQgJAAgGgHgAgHgPQgDAEgBAHIAYAAIAAgBQgBgGgDgEQgDgEgFAAQgEAAgEAEg");
	this.shape_3.setTransform(72.8,99.625);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2D53AB").s().p("AgMAfIAAAGIgIAAIAAhKIAJAAIAAAcQAFgHAIAAQAJAAAFAHQAFAIAAALIAAABQAAAMgFAHQgFAIgJAAQgJAAgFgHgAgLAAIAAAWQADAIAIAAQAGAAADgFQADgFAAgKQAAgJgDgEQgDgFgGAAQgIAAgDAIg");
	this.shape_4.setTransform(67.775,98.575);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2D53AB").s().p("AgLAbIAAg0IAIAAIAAAGQAEgHAHAAIAEABIAAAIIgEAAQgIAAgDAHIAAAlg");
	this.shape_5.setTransform(63.75,99.575);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2D53AB").s().p("AgPAUQgHgIAAgMIAAAAQAAgHAEgGQACgHAGgDQAFgDAFAAQAKAAAHAHQAFAIAAALIAAABQAAAHgCAGQgDAGgFAEQgFADgHAAQgJAAgGgHgAgJgOQgEAGAAAJQAAAIAEAGQAEAFAFAAQAHAAADgFQAEgGAAgJQAAgIgEgGQgDgFgHAAQgFAAgEAFg");
	this.shape_6.setTransform(59.25,99.625);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2D53AB").s().p("AgGAmIAAgtIgIAAIAAgHIAIAAIAAgFQAAgJAFgEQADgFAHAAIAGABIAAAHIgFAAQgEAAgCACQgDADAAAFIAAAFIALAAIAAAHIgLAAIAAAtg");
	this.shape_7.setTransform(55.05,98.475);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2D53AB").s().p("AgJAZQgEgCgDgEQgDgEABgFIAIAAQAAAFADACQAEADADAAQAFAAAEgCQACgCAAgEQAAgDgCgCQgDgCgGgCIgJgDQgFgBgBgDQgCgDAAgEQAAgGAFgFQAFgEAHAAQAJAAAFAEQAFAFAAAHIgJAAQAAgEgCgCQgDgDgFAAQgDAAgDACQgDACABAEQgBADADACIAHADIALADQAEACACADQABACAAAFQAAAHgEAEQgGAEgJAAQgEAAgFgCg");
	this.shape_8.setTransform(48.55,99.625);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2D53AB").s().p("AgPAXQgEgFAAgGQAAgJAGgDQAFgFAKAAIAIAAIAAgEQAAgEgCgDQgDgDgFAAQgEAAgDACQgDADAAADIgIAAQAAgEACgDQADgEAEgCQAFgCAEAAQAJAAAFAEQAFAFAAAIIAAAXQAAAHABAEIAAABIgIAAIgCgFQgFAGgIAAQgHAAgFgEgAgLAKQAAAFADACQACACAFAAQADAAADgCQAEgCABgDIAAgLIgGAAQgPAAAAAJg");
	this.shape_9.setTransform(43.575,99.625);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2D53AB").s().p("AgDAkIAAg0IAHAAIAAA0gAgDgaIgBgEIABgDQAAgBABAAQAAAAABAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQAAAAABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_10.setTransform(39.95,98.675);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2D53AB").s().p("AgLAbIAAg0IAIAAIAAAGQADgHAIAAIAEABIAAAIIgFAAQgHAAgDAHIAAAlg");
	this.shape_11.setTransform(37.45,99.575);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2D53AB").s().p("AgOAUQgGgHAAgMIAAgBQAAgHADgGQADgGAFgEQAFgDAFAAQAKAAAFAGQAFAHAAANIAAADIghAAQABAHAEAFQAEAFAFAAQAFAAADgCQADgCADgDIAEAEQgGAKgMAAQgJAAgHgHgAgHgPQgDAEgBAHIAXAAIAAgBQABgGgEgEQgDgEgFAAQgEAAgEAEg");
	this.shape_12.setTransform(33.15,99.625);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2D53AB").s().p("AAAAeQgEgEAAgHIAAgfIgJAAIAAgHIAJAAIAAgNIAIAAIAAANIAJAAIAAAHIgJAAIAAAfIABAFQAAAAABABQAAAAABAAQAAABABAAQABAAABAAIADgBIAAAHIgGABQgGAAgBgDg");
	this.shape_13.setTransform(29,99.025);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2D53AB").s().p("AgJAZQgEgCgDgEQgDgEABgFIAIAAQAAAFADACQAEADADAAQAFAAAEgCQACgCAAgEQAAgDgCgCQgDgCgGgCIgJgDQgFgBgBgDQgCgDAAgEQAAgGAFgFQAFgEAHAAQAJAAAFAEQAFAFAAAHIgJAAQAAgEgCgCQgDgDgFAAQgDAAgDACQgDACABAEQgBADADACIAHADIALADQAEACACADQABACAAAFQAAAHgEAEQgGAEgJAAQgEAAgFgCg");
	this.shape_14.setTransform(25.15,99.625);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2D53AB").s().p("AAUAjIgGgSIgbAAIgGASIgJAAIAZhFIAHAAIAZBFgAgKAJIAVAAIgLggg");
	this.shape_15.setTransform(19.75,98.725);

	this.instance_1 = new lib.Bitmap1();
	this.instance_1.setTransform(0,0,1.0217,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.instance}]}).wait(3));

	// Layer_3
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(51,51,51,0.2)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_16.setTransform(41.55,68.6125);
	this.shape_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(1).to({_off:false},0).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8,-1.5,108.2,130.2);


(lib.gem4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(3,1,1).p("AntpVIPbAAIAASrIvbAAg");
	this.shape.setTransform(49.35,59.825);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(2));

	// Layer_1
	this.instance = new lib._17();
	this.instance.setTransform(0,0,0.1416,0.1884);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2D53AB").s().p("AAaAbIAAgiQAAgGgCgCQgDgDgFAAQgFAAgDADQgEADAAAFIAAAiIgHAAIAAgiQAAgLgLAAQgIAAgDAHIAAAmIgJAAIAAg0IAIAAIAAAGQAGgHAJAAQAKAAADAJQADgEADgCQAEgDAGAAQAQAAAAATIAAAig");
	this.shape_1.setTransform(63.6,112.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2D53AB").s().p("AgOAWQgEgFgBgKIAAghIAJAAIAAAhQAAAMAJAAQAJAAADgIIAAglIAIAAIAAA0IgHAAIAAgFQgGAGgIAAQgIAAgEgFg");
	this.shape_2.setTransform(56.95,112.125);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2D53AB").s().p("AgJAZQgEgCgDgEQgCgEAAgFIAIAAQAAAFADACQAEADAEAAQAEAAAEgCQACgCAAgEQAAgDgCgCQgDgCgGgCIgJgDQgEgBgCgDQgCgDAAgEQAAgGAFgFQAFgEAIAAQAHAAAGAEQAFAFAAAHIgIAAQAAgEgDgCQgEgDgDAAQgEAAgDACQgCACAAAEQAAADACACIAIADIAKADQAEACACADQACACAAAFQAAAHgGAEQgFAEgIAAQgGAAgEgCg");
	this.shape_3.setTransform(51.95,112.075);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2D53AB").s().p("AgPAUQgHgIABgMIAAAAQAAgHADgGQACgHAGgDQAEgDAGAAQAKAAAHAHQAFAIABALIAAABQAAAHgDAGQgDAGgFAEQgFADgHAAQgJAAgGgHgAgJgOQgEAGAAAJQAAAIAEAGQAEAFAFAAQAGAAAEgFQAEgGAAgJQAAgIgEgGQgEgFgGAAQgFAAgEAFg");
	this.shape_4.setTransform(46.85,112.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2D53AB").s().p("AgBAeQgCgEAAgHIAAgfIgJAAIAAgHIAJAAIAAgNIAHAAIAAANIAJAAIAAAHIgJAAIAAAfIABAFQAAAAABABQAAAAABAAQAAAAABABQABAAAAAAIAFgBIAAAHIgHABQgGAAgCgDg");
	this.shape_5.setTransform(42.55,111.475);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2D53AB").s().p("AgNAUQgHgHAAgMIAAgBQAAgHADgGQADgGAFgEQAFgDAFAAQAJAAAGAGQAFAHAAANIAAADIghAAQABAHAEAFQAEAFAGAAQAEAAADgCQADgCACgDIAGAEQgHAKgMAAQgJAAgGgHgAgHgPQgDAEgBAHIAYAAIAAgBQgBgGgDgEQgDgEgFAAQgFAAgDAEg");
	this.shape_6.setTransform(38.7,112.075);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2D53AB").s().p("AgJAZQgEgCgDgEQgDgEAAgFIAJAAQAAAFADACQADADAFAAQAEAAADgCQADgCAAgEQAAgDgDgCQgCgCgGgCIgKgDQgEgBgBgDQgCgDAAgEQAAgGAFgFQAFgEAIAAQAHAAAGAEQAFAFAAAHIgIAAQAAgEgEgCQgDgDgDAAQgFAAgCACQgDACAAAEQAAADADACIAIADIAKADQAEACABADQADACAAAFQgBAHgFAEQgFAEgIAAQgGAAgEgCg");
	this.shape_7.setTransform(33.75,112.075);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2D53AB").s().p("AgPAXQgEgFAAgGQAAgJAGgDQAFgFAKAAIAIAAIAAgEQAAgEgCgDQgDgDgFAAQgEAAgDACQgDADAAADIgIAAQAAgEACgDQADgEAEgCQAFgCAEAAQAJAAAFAEQAFAFAAAIIAAAXQAAAHABAEIAAABIgIAAIgCgFQgFAGgIAAQgHAAgFgEgAgLAKQAAAFADACQACACAFAAQADAAADgCQAEgCABgDIAAgLIgGAAQgPAAAAAJg");
	this.shape_8.setTransform(65.475,97.625);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2D53AB").s().p("AAaAbIAAgiQAAgGgCgCQgDgDgFAAQgFAAgDADQgDADgBAFIAAAiIgIAAIAAgiQABgLgLAAQgIAAgDAHIAAAmIgJAAIAAg0IAIAAIAAAGQAGgHAJAAQALAAACAJQADgEAEgCQADgDAGAAQARAAAAATIAAAig");
	this.shape_9.setTransform(58.9,97.575);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2D53AB").s().p("AgOAUQgGgHAAgMIAAgBQAAgHADgGQADgGAFgEQAFgDAFAAQAJAAAGAGQAFAHAAANIAAADIghAAQABAHAEAFQAEAFAGAAQAEAAADgCQADgCACgDIAGAEQgHAKgMAAQgJAAgHgHgAgHgPQgDAEgBAHIAXAAIAAgBQAAgGgDgEQgDgEgFAAQgFAAgDAEg");
	this.shape_10.setTransform(52.3,97.625);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2D53AB").s().p("AgOAeQgGgHAAgMIAAgBQAAgLAFgHQAGgIAJAAQAHAAAFAHIAAgcIAJAAIAABKIgIAAIAAgGQgFAHgJAAQgIAAgFgIgAgIgDQgDAEAAAKQAAAJADAFQADAFAGAAQAIAAADgIIAAgXQgDgHgIAAQgGAAgDAFg");
	this.shape_11.setTransform(47.075,96.575);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2D53AB").s().p("AgPAXQgEgFAAgGQAAgJAGgDQAFgFAKAAIAIAAIAAgEQAAgEgCgDQgDgDgFAAQgEAAgDACQgDADAAADIgIAAQAAgEACgDQADgEAEgCQAFgCAEAAQAJAAAFAEQAFAFAAAIIAAAXQAAAHABAEIAAABIgIAAIgCgFQgFAGgIAAQgHAAgFgEgAgLAKQAAAFADACQACACAFAAQADAAADgCQAEgCABgDIAAgLIgGAAQgPAAAAAJg");
	this.shape_12.setTransform(42.025,97.625);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2D53AB").s().p("AgEAkIAAg0IAIAAIAAA0gAgDgaIgBgEIABgDQAAgBABAAQAAAAABAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQAAAAABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_13.setTransform(38.35,96.675);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2D53AB").s().p("AgXAjIAAhFIATAAQAHAAAHAEQAHAEADAHQAEAIAAAKIAAADQAAAKgEAIQgDAHgHAEQgHAEgIAAgAgOAcIAJAAQAJAAAGgHQAFgHAAgMIAAgDQAAgMgFgHQgFgHgJAAIgKAAg");
	this.shape_14.setTransform(34.225,96.725);

	this.instance_1 = new lib.Bitmap1();
	this.instance_1.setTransform(0,0,1.0217,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.instance}]}).wait(3));

	// Layer_3
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("rgba(51,51,51,0.2)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_15.setTransform(41.55,68.6125);
	this.shape_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(1).to({_off:false},0).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8,-1.5,108.2,130.2);


(lib.gem3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(3,1,1).p("AntpVIPbAAIAASrIvbAAg");
	this.shape.setTransform(49.35,59.825);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(2));

	// Layer_1
	this.instance = new lib._6();
	this.instance.setTransform(0,0,0.0968,0.1288);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2D53AB").s().p("AgJAZQgEgCgDgEQgCgEAAgFIAIAAQAAAFADACQAEADAEAAQAEAAAEgCQACgCAAgEQAAgDgCgCQgDgCgGgCIgJgDQgEgBgCgDQgCgDAAgEQAAgGAFgFQAFgEAIAAQAHAAAGAEQAFAFAAAHIgIAAQAAgEgDgCQgEgDgDAAQgEAAgDACQgCACAAAEQAAADACACIAIADIAKADQAEACACADQACACAAAFQAAAHgGAEQgFAEgIAAQgGAAgEgCg");
	this.shape_1.setTransform(70.85,111.975);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2D53AB").s().p("AgEAkIAAg0IAIAAIAAA0gAgDgaIgBgEIABgDQAAgBABAAQAAAAABAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAAAABQABAAAAABQAAAAABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_2.setTransform(67.35,111.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2D53AB").s().p("AgDAlIAAhJIAHAAIAABJg");
	this.shape_3.setTransform(65.025,110.875);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2D53AB").s().p("AgPAXQgEgFAAgGQAAgJAGgDQAFgFAKAAIAIAAIAAgEQAAgEgCgDQgDgDgFAAQgEAAgDACQgDADAAADIgIAAQAAgEACgDQADgEAEgCQAFgCAEAAQAJAAAFAEQAFAFAAAIIAAAXQAAAHABAEIAAABIgIAAIgCgFQgFAGgIAAQgHAAgFgEgAgLAKQAAAFADACQACACAFAAQADAAADgCQAEgCABgDIAAgLIgGAAQgPAAAAAJg");
	this.shape_4.setTransform(61.325,111.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2D53AB").s().p("AALAbIAAgiQAAgGgCgCQgDgDgFAAQgDAAgDACQgDADgCADIAAAlIgIAAIAAg0IAIAAIAAAHQAGgIAIAAQAPAAAAATIAAAig");
	this.shape_5.setTransform(56.225,111.925);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2D53AB").s().p("AgDAkIAAg0IAHAAIAAA0gAgDgaIgBgEIABgDQAAgBABAAQAAAAABAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQAAAAABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_6.setTransform(52.55,111.025);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2D53AB").s().p("AgOAUQgGgHAAgNIAAAAQAAgIADgGQADgGAFgDQAEgDAGAAQAIAAAGAFQAGAFAAAJIgIAAQAAgFgEgEQgDgDgFAAQgFAAgEAFQgDAFAAAJIAAABQAAAJADAFQAEAFAFAAQAEAAAEgDQAEgDAAgEIAIAAQAAAEgDAEQgDAEgFADQgEACgFAAQgJAAgGgHg");
	this.shape_7.setTransform(49,111.975);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2D53AB").s().p("AgDAkIAAg0IAHAAIAAA0gAgDgaIgBgEIABgDQAAgBABAAQAAAAABAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQAAAAABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_8.setTransform(45.35,111.025);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2D53AB").s().p("AgOAeQgGgHAAgMIAAgBQAAgLAFgHQAGgIAJAAQAHAAAFAHIAAgcIAJAAIAABKIgIAAIAAgGQgFAHgJAAQgIAAgFgIgAgIgDQgDAEAAAKQAAAJADAFQADAFAGAAQAIAAADgIIAAgXQgDgHgIAAQgGAAgDAFg");
	this.shape_9.setTransform(41.475,110.925);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2D53AB").s().p("AgOAUQgGgHAAgMIAAgBQAAgHADgGQADgGAFgEQAFgDAFAAQAJAAAGAGQAFAHAAANIAAADIggAAQAAAHAEAFQAEAFAFAAQAFAAADgCQADgCADgDIAEAEQgFAKgNAAQgJAAgHgHgAgHgPQgDAEgBAHIAXAAIAAgBQAAgGgDgEQgDgEgFAAQgFAAgDAEg");
	this.shape_10.setTransform(36.5,111.975);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2D53AB").s().p("AAaAbIAAgiQAAgGgDgCQgBgDgHAAQgEAAgDADQgDADgBAFIAAAiIgIAAIAAgiQAAgLgKAAQgIAAgDAHIAAAmIgIAAIAAg0IAIAAIAAAGQAFgHAJAAQALAAACAJQADgEAEgCQAEgDAFAAQAQAAABATIAAAig");
	this.shape_11.setTransform(29.9,111.925);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2D53AB").s().p("AgPAUQgGgIgBgMIAAAAQAAgHADgGQAEgHAEgDQAGgDAFAAQAKAAAGAHQAHAIAAALIAAABQgBAHgCAGQgDAGgFAEQgFADgHAAQgJAAgGgHgAgJgOQgEAGAAAJQAAAIAEAGQAEAFAFAAQAGAAAFgFQADgGAAgJQAAgIgDgGQgFgFgGAAQgFAAgEAFg");
	this.shape_12.setTransform(60.75,97.525);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2D53AB").s().p("AgOAeQgGgHAAgMIAAgBQAAgLAFgHQAGgIAJAAQAHAAAFAHIAAgcIAJAAIAABKIgIAAIAAgGQgFAHgJAAQgIAAgFgIgAgIgDQgDAEAAAKQAAAJADAFQADAFAGAAQAIAAADgIIAAgXQgDgHgIAAQgGAAgDAFg");
	this.shape_13.setTransform(55.375,96.475);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2D53AB").s().p("AgOAWQgEgFAAgKIAAghIAIAAIAAAhQAAAMAKAAQAIAAADgIIAAglIAJAAIAAA0IgJAAIAAgFQgEAGgJAAQgIAAgEgFg");
	this.shape_14.setTransform(50.25,97.575);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2D53AB").s().p("AgLAbIAAg0IAIAAIAAAGQADgHAIAAIAEABIAAAIIgEAAQgIAAgCAHIAAAlg");
	this.shape_15.setTransform(46.4,97.475);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2D53AB").s().p("AgDAkIAAg0IAHAAIAAA0gAgDgaIgBgEIABgDQAAgBABAAQAAAAABAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAABABQAAAAAAABQAAAAABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_16.setTransform(43.45,96.575);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2D53AB").s().p("AARAjIAAggIghAAIAAAgIgJAAIAAhFIAJAAIAAAeIAhAAIAAgeIAJAAIAABFg");
	this.shape_17.setTransform(38.925,96.625);

	this.instance_1 = new lib.Bitmap1();
	this.instance_1.setTransform(0,0,1.0217,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.instance}]}).wait(3));

	// Layer_3
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("rgba(51,51,51,0.2)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_18.setTransform(41.55,68.6125);
	this.shape_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_18).wait(1).to({_off:false},0).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8,-1.5,108.2,130.2);


(lib.gem2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(3,1,1).p("AntpVIPbAAIAASrIvbAAg");
	this.shape.setTransform(49.35,59.825);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(2));

	// Layer_1
	this.instance = new lib._7();
	this.instance.setTransform(0,0,0.3303,0.4378);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2D53AB").s().p("AgJAZQgFgCgCgEQgCgEgBgFIAJAAQAAAFADACQAEADADAAQAGAAACgCQADgCAAgEQAAgDgDgCQgCgCgGgCIgKgDQgDgBgCgDQgCgDAAgEQAAgGAFgFQAGgEAGAAQAJAAAFAEQAFAFAAAHIgJAAQAAgEgDgCQgCgDgFAAQgDAAgDACQgCACgBAEQABADACACIAHADIALADQAEACABADQACACAAAFQAAAHgEAEQgGAEgJAAQgEAAgFgCg");
	this.shape_1.setTransform(63.6,111.825);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2D53AB").s().p("AgOAWQgEgFgBgKIAAghIAJAAIAAAhQAAAMAJAAQAJAAADgIIAAglIAJAAIAAA0IgIAAIAAgFQgGAGgIAAQgIAAgEgFg");
	this.shape_2.setTransform(58.6,111.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2D53AB").s().p("AgDAlIAAhJIAHAAIAABJg");
	this.shape_3.setTransform(54.925,110.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2D53AB").s().p("AgDAlIAAhJIAHAAIAABJg");
	this.shape_4.setTransform(52.625,110.725);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2D53AB").s().p("AgNAUQgHgHAAgMIAAgBQAAgHADgGQADgGAFgEQAFgDAFAAQAJAAAGAGQAFAHAAANIAAADIghAAQABAHAEAFQAEAFAGAAQAEAAADgCQADgCACgDIAGAEQgHAKgMAAQgJAAgGgHgAgHgPQgDAEgBAHIAYAAIAAgBQgBgGgDgEQgDgEgFAAQgFAAgDAEg");
	this.shape_5.setTransform(49.05,111.825);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2D53AB").s().p("AgMAfIAAAGIgIAAIAAhKIAJAAIAAAcQAFgHAIAAQAJAAAFAHQAFAIAAALIAAABQAAAMgFAHQgFAIgJAAQgJAAgFgHgAgLAAIAAAWQADAIAIAAQAGAAADgFQADgFAAgKQAAgJgDgEQgDgFgGAAQgIAAgDAIg");
	this.shape_6.setTransform(44.025,110.775);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2D53AB").s().p("AgOAWQgEgFgBgKIAAghIAJAAIAAAhQAAAMAJAAQAJAAADgIIAAglIAJAAIAAA0IgIAAIAAgFQgGAGgIAAQgIAAgEgFg");
	this.shape_7.setTransform(38.7,111.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2D53AB").s().p("AgLAbIAAg0IAIAAIAAAGQAEgHAHAAIAEABIAAAIIgEAAQgIAAgDAHIAAAlg");
	this.shape_8.setTransform(34.85,111.775);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2D53AB").s().p("AgJAZQgEgCgDgEQgCgEAAgFIAIAAQAAAFADACQAEADAEAAQAEAAAEgCQACgCAAgEQAAgDgCgCQgDgCgGgCIgJgDQgEgBgCgDQgCgDAAgEQAAgGAFgFQAFgEAIAAQAHAAAGAEQAFAFAAAHIgIAAQAAgEgDgCQgEgDgDAAQgEAAgDACQgCACAAAEQAAADACACIAIADIAKADQAEACACADQACACAAAFQAAAHgGAEQgFAEgIAAQgGAAgEgCg");
	this.shape_9.setTransform(69.05,97.375);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2D53AB").s().p("AgOAWQgEgFgBgKIAAghIAJAAIAAAhQAAAMAKAAQAIAAADgIIAAglIAIAAIAAA0IgIAAIAAgFQgEAGgJAAQgIAAgEgFg");
	this.shape_10.setTransform(64.05,97.425);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2D53AB").s().p("AgOAUQgGgHAAgNIAAAAQAAgIADgGQADgGAEgDQAFgDAGAAQAIAAAGAFQAGAFAAAJIgIAAQgBgFgDgEQgDgDgFAAQgGAAgDAFQgEAFABAJIAAABQgBAJAEAFQADAFAGAAQAEAAAEgDQADgDABgEIAIAAQAAAEgDAEQgDAEgFADQgEACgFAAQgJAAgGgHg");
	this.shape_11.setTransform(59.1,97.375);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2D53AB").s().p("AgEAkIAAg0IAIAAIAAA0gAgDgaIgBgEIABgDQAAgBABAAQAAAAABAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAAAABQABAAAAABQAAAAABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_12.setTransform(55.45,96.425);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2D53AB").s().p("AgLAbIAAg0IAIAAIAAAGQAEgHAHAAIAEABIAAAIIgFAAQgHAAgDAHIAAAlg");
	this.shape_13.setTransform(53,97.325);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2D53AB").s().p("AgMAfIAAAGIgIAAIAAhKIAJAAIAAAcQAFgHAIAAQAJAAAFAHQAFAIAAALIAAABQAAAMgFAHQgFAIgJAAQgJAAgFgHgAgLAAIAAAWQADAIAIAAQAGAAADgFQADgFAAgKQAAgJgDgEQgDgFgGAAQgIAAgDAIg");
	this.shape_14.setTransform(48.625,96.325);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2D53AB").s().p("AAaAbIAAgiQAAgGgDgCQgBgDgHAAQgEAAgDADQgEADAAAFIAAAiIgIAAIAAgiQAAgLgKAAQgIAAgDAHIAAAmIgIAAIAAg0IAIAAIAAAGQAFgHAJAAQAKAAAEAJQACgEADgCQAFgDAFAAQAQAAAAATIAAAig");
	this.shape_15.setTransform(41.85,97.325);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2D53AB").s().p("AgOAWQgEgFAAgKIAAghIAIAAIAAAhQAAAMAKAAQAIAAADgIIAAglIAIAAIAAA0IgIAAIAAgFQgEAGgJAAQgIAAgEgFg");
	this.shape_16.setTransform(35.15,97.425);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2D53AB").s().p("AgTAjIAAhFIAJAAIAAA+IAeAAIAAAHg");
	this.shape_17.setTransform(30.325,96.475);

	this.instance_1 = new lib.Bitmap1();
	this.instance_1.setTransform(0,0,1.0217,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.instance}]}).wait(3));

	// Layer_3
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("rgba(51,51,51,0.2)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_18.setTransform(41.55,68.6125);
	this.shape_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_18).wait(1).to({_off:false},0).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8,-1.5,108.2,130.2);


(lib.gem1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgEAkIAAg0IAIAAIAAA0gAgDgaQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAAAgBQAAAAABAAQAAAAABgBQAAAAABAAQAAAAAAAAQAAAAABAAQABAAAAAAQABABAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQgBAAAAAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAg");
	this.shape.setTransform(75.825,59.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAMAbIAAgiQAAgGgDgCQgDgDgFAAQgDAAgEACQgDADgCAEIAAAkIgJAAIAAg0IAJAAIAAAHQAGgIAJAAQAQAAABATIAAAig");
	this.shape_1.setTransform(71.875,60.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgEAkIAAg0IAIAAIAAA0gAgDgaQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAAAgBQAAAAABAAQAAAAABgBQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABAAQAAABAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgBAAAAABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAg");
	this.shape_2.setTransform(67.875,59.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgKAZQgEgCgDgEQgDgEAAgFIAJAAQABAFADACQADADAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgCgCgHgBIgKgEIgGgEQgCgDAAgEQAAgGAGgFQAFgFAHAAQAKABAFAFQAGAEgBAHIgJAAQAAgEgDgCQgCgDgGAAQgDAAgDACQgDADAAADQAAADACACIAJADIALADQAEABACAEQACADAAAEQAAAHgFAEQgGAFgJgBQgGAAgFgCg");
	this.shape_3.setTransform(64.05,60.65);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgOAVQgIgIABgLIAAgCQAAgHACgGQAEgHAFgDQAFgEAGAAQAKABAFAGQAHAIAAAMIAAADIgkAAQABAHAEAFQAFAFAFAAQAFAAAEgCIAFgFIAGAEQgHAKgNAAQgKAAgGgGgAgHgPQgFAEAAAIIAZAAIAAgBQAAgIgDgDQgEgEgFAAQgFAAgDAEg");
	this.shape_4.setTransform(58.95,60.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AAQAjIgYggIgJAJIAAAXIgJAAIAAhGIAJAAIAAAjIAegjIAMAAIgbAgIAdAmg");
	this.shape_5.setTransform(53.55,59.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgMAbIAAg0IAJAAIAAAHQADgIAJAAIAEABIAAAJIgFgBQgIAAgDAIIAAAkg");
	this.shape_6.setTransform(46.075,60.6);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgPAVQgGgIAAgLIAAgCQAAgHACgGQADgHAGgDQAGgEAEAAQALABAGAGQAFAIABAMIAAADIgjAAQAAAHAEAFQAEAFAGAAQAFAAADgCIAGgFIAGAEQgHAKgNAAQgKAAgHgGgAgIgPQgEAEAAAIIAaAAIAAgBQgBgIgEgDQgCgEgHAAQgEAAgEAEg");
	this.shape_7.setTransform(41.55,60.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgKAZQgEgCgDgEQgDgEAAgFIAJAAQAAAFAEACQADADAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgCgCgHgBIgKgEIgGgEQgCgDAAgEQAAgGAGgFQAFgFAHAAQAKABAFAFQAGAEAAAHIgJAAQgBgEgDgCQgCgDgGAAQgEAAgCACQgDADAAADQAAADACACIAJADIALADQAEABACAEQACADAAAEQAAAHgGAEQgFAFgJgBQgGAAgFgCg");
	this.shape_8.setTransform(36.25,60.65);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgOAVQgIgIAAgLIAAgCQAAgHADgGQADgHAGgDQAFgEAGAAQAKABAFAGQAHAIgBAMIAAADIgjAAQABAHAEAFQAEAFAGAAQAFAAAEgCIAFgFIAFAEQgGAKgNAAQgKAAgGgGgAgHgPQgFAEAAAIIAZAAIAAgBQAAgIgDgDQgEgEgFAAQgFAAgDAEg");
	this.shape_9.setTransform(31.15,60.65);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgMAhQgHgEgDgIQgEgHAAgKIAAgGQAAgQAHgJQAIgIAMgBQALAAAHAGQAHAGABALIgJAAQgDgPgOAAQgIAAgFAHQgFAGAAANIAAAFQAAALAGAIQAFAHAIAAQAGAAAEgCQAEgBACgDIAAgPIgQAAIAAgIIAZAAIAAAaQgDAFgHADQgGACgJAAQgHAAgHgDg");
	this.shape_10.setTransform(24.975,59.75);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#FFFFFF").ss(3,1,1).p("AntpVIPbAAIAASrIvbAAg");
	this.shape_11.setTransform(49.35,59.825);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("rgba(102,153,51,0.318)").s().p("AntJWIAAyrIPbAAIAASrg");
	this.shape_12.setTransform(49.35,59.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.gem1, new cjs.Rectangle(-1.5,-1.5,101.7,122.7), null);


(lib.btnMenuKI = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#18B8C4").s().p("AhXBMIBNhMIhNhMIAygxIB9B9Ih9B+g");
	this.shape.setTransform(-43.2789,1.4225,0.5331,0.5331,-90);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#18B8C4").s().p("Ah6CSICRiSIiRiRIAygyIDCDDIjCDDg");
	this.shape_1.setTransform(-43.2789,-6.9064,0.5331,0.5331,-90);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7,p:{y:-3.875}},{t:this.shape_6,p:{y:-3.875}},{t:this.shape_5},{t:this.shape_4,p:{y:0.925}},{t:this.shape_3},{t:this.shape_2,p:{y:1.075}},{t:this.shape_1,p:{y:-6.9064}},{t:this.shape,p:{y:1.4225}}]}).to({state:[{t:this.shape_7,p:{y:-2.275}},{t:this.shape_11},{t:this.shape_6,p:{y:-2.275}},{t:this.shape_10},{t:this.shape_4,p:{y:2.525}},{t:this.shape_9},{t:this.shape_2,p:{y:2.675}},{t:this.shape_1,p:{y:-5.3064}},{t:this.shape,p:{y:3.0225}}]},1).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_4,p:{y:6.525}},{t:this.shape_12},{t:this.shape_2,p:{y:6.675}},{t:this.shape_1,p:{y:-1.3064}},{t:this.shape,p:{y:7.0225}}]},1).wait(2));

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
	this.shape.setTransform(-38.9397,-3.0058,0.7125,0.7884,180);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#ED4F44").s().p("Ah3C3QgGgDAAgHIAAgiQAAgOAMgJICPhrQAEgEAAgFQAAgFgEgDIiPhsQgMgIAAgOIAAgiQAAgHAGgDQAHgDAFAEIDkCrQAFAEAAAGQAAAHgFAEIjkCrQgDACgEAAIgFgBg");
	this.shape_1.setTransform(-45.2274,-3.0255,0.7125,0.7884,180);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10,p:{y:-3.875}},{t:this.shape_9,p:{y:-3.875}},{t:this.shape_8},{t:this.shape_7,p:{y:0.925}},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{scaleX:0.7125,scaleY:0.7884,x:-45.2274,y:-3.0255}},{t:this.shape,p:{scaleX:0.7125,scaleY:0.7884,x:-38.9397,y:-3.0058}}]}).to({state:[{t:this.shape_10,p:{y:-1.875}},{t:this.shape_18},{t:this.shape_9,p:{y:-1.875}},{t:this.shape_17},{t:this.shape_7,p:{y:2.925}},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_1,p:{scaleX:0.712,scaleY:0.7879,x:-45.2217,y:-2.1165}},{t:this.shape,p:{scaleX:0.712,scaleY:0.7879,x:-38.9379,y:-2.0969}}]},1).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_7,p:{y:6.425}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_1,p:{scaleX:0.712,scaleY:0.7879,x:-45.2217,y:-0.0665}},{t:this.shape,p:{scaleX:0.712,scaleY:0.7879,x:-38.9379,y:-0.0469}}]},1).wait(2));

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


(lib.btnGan = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(3,1,1).p("AntpVIPbAAIAASrIvbAAg");
	this.shape.setTransform(49.35,59.825);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(2));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2D53AB").s().p("AgDAEQAAgBAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAAAQAAAAAAgBQAAAAABgBQAAAAAAgBQABAAAAAAQAAgBABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAABAAQAAABAAAAQABABAAAAQAAABAAAAQAAAAAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBAAg");
	this.shape_1.setTransform(69.575,101.775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2D53AB").s().p("AgUAlIAAhIIAIAAIAAAGQAFgHAJAAQAIAAAGAHQAFAIAAAMIAAABQAAALgFAHQgFAIgJAAQgIAAgFgGIAAAZgAgLgVIAAAYQADAHAIAAQAFAAAEgFQADgFAAgJQAAgJgDgFQgEgFgFAAQgIAAgDAHg");
	this.shape_2.setTransform(65.875,100.575);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2D53AB").s().p("AgJAZQgEgCgDgEQgDgEABgFIAIAAQAAAFADACQAEADADAAQAFAAAEgCQACgCAAgEQAAgDgCgCQgDgCgGgCIgJgDQgFgBgBgDQgCgDAAgEQAAgGAFgFQAFgEAHAAQAJAAAFAEQAFAFAAAHIgJAAQAAgEgCgCQgDgDgFAAQgDAAgDACQgDACABAEQgBADADACIAHADIALADQAEACACADQABACAAAFQAAAHgEAEQgGAEgJAAQgEAAgFgCg");
	this.shape_3.setTransform(60.7,99.625);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2D53AB").s().p("AgOAUQgGgHAAgMIAAgBQAAgHADgGQADgGAFgEQAFgDAFAAQAJAAAGAGQAFAHAAANIAAADIggAAQAAAHAEAFQAEAFAFAAQAFAAADgCQADgCADgDIAEAEQgFAKgNAAQgJAAgHgHgAgHgPQgDAEgBAHIAXAAIAAgBQABgGgEgEQgDgEgFAAQgFAAgDAEg");
	this.shape_4.setTransform(53.5,99.625);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2D53AB").s().p("AgOAUQgGgHAAgNIAAAAQAAgIADgGQACgGAFgDQAGgDAFAAQAIAAAGAFQAFAFABAJIgIAAQgBgFgDgEQgDgDgFAAQgFAAgEAFQgDAFgBAJIAAABQABAJADAFQAEAFAFAAQAEAAAEgDQADgDABgEIAIAAQgBAEgCAEQgDAEgEADQgFACgFAAQgJAAgGgHg");
	this.shape_5.setTransform(48.6,99.625);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2D53AB").s().p("AgEAkIAAg0IAIAAIAAA0gAgDgaIgBgEIABgDQAAgBABAAQAAAAABAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAAAABQABAAAAABQAAAAABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_6.setTransform(44.95,98.675);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2D53AB").s().p("AALAbIAAgiQAAgGgCgCQgDgDgFAAQgDAAgDACQgDADgCADIAAAlIgIAAIAAg0IAIAAIAAAHQAGgIAIAAQAPAAAAATIAAAig");
	this.shape_7.setTransform(41.225,99.575);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2D53AB").s().p("AgOAWQgEgFAAgKIAAghIAIAAIAAAhQAAAMAKAAQAIAAADgIIAAglIAIAAIAAA0IgIAAIAAgFQgEAGgJAAQgIAAgEgFg");
	this.shape_8.setTransform(36.05,99.675);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2D53AB").s().p("AgUAjIAAhFIApAAIAAAHIggAAIAAAXIAcAAIAAAHIgcAAIAAAZIAgAAIAAAHg");
	this.shape_9.setTransform(31.075,98.725);

	this.instance = new lib._5();
	this.instance.setTransform(0,0,0.1416,0.1956);

	this.instance_1 = new lib.Bitmap1();
	this.instance_1.setTransform(0,0,1.0217,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(3));

	// Layer_3
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(51,51,51,0.2)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_10.setTransform(41.55,68.6125);
	this.shape_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(1).to({_off:false},0).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8,-1.5,108.2,130.2);


(lib.bg1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0097E6").s().p("A82E7Qg1AAAAgYIAApFQAAgXA1AAMA5tAAAQA1AAABAXIAAJFQgBAYg1AAg");
	this.shape.setTransform(-20.05,1.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg1, new cjs.Rectangle(-210.1,-30,380.1,62.9), null);


(lib.Slots3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// slots
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape.setTransform(219.075,177.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1.setTransform(213.175,179.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_2.setTransform(206.95,179.325);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgWAeQgKgKAAgSIAAgCQgBgLAFgKQAEgIAJgGQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAAMAHAGQAGAIAKAAQAGAAAFgDQAFgDAEgFIAIAHQgKAPgTAAQgQAAgJgLgAgMgXQgGAGgBAKIAnAAIAAAAQgBgKgFgHQgEgFgJAAQgHAAgGAGg");
	this.shape_3.setTransform(200.15,179.4);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgLIAPAAIAAgTIAMAAIAAATIAPAAIAAALIgPAAIAAAwQAAAEACADQACADAFgBIAHAAIAAAKIgLACQgJAAgEgFg");
	this.shape_4.setTransform(193.475,178.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_5.setTransform(187.175,179.4);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_6.setTransform(181.275,177.725);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_7.setTransform(177.65,177.95);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgjA1IAAhpIAiAAQARAAAJAHQAIAHAAAOQAAAHgEAGQgEAGgHADQAIACAFAGQAFAHAAAJQAAAPgJAIQgJAIgRAAgAgVAqIAWAAQAKAAAFgFQAGgFAAgJQAAgUgVAAIgWAAgAgVgHIAVAAQAIAAAGgFQAFgEAAgIQAAgJgFgEQgFgEgKAAIgUAAg");
	this.shape_8.setTransform(171.325,178.025);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AARA4IAAg0QAAgIgDgEQgEgEgJAAQgFAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLANAAQAZAAAAAbIAAA0g");
	this.shape_9.setTransform(158.65,177.725);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_10.setTransform(150.375,179.475);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgTAuIgBAJIgNAAIAAhvIAOAAIAAAqQAIgKANAAQAPAAAIAKQAJALAAATIAAABQAAASgJALQgIALgPAAQgOAAgHgLgAgTAAIAAAhQAGAMANAAQAJAAAGgHQAFgIAAgPQAAgOgFgGQgGgIgJABQgNAAgGAMg");
	this.shape_11.setTransform(142.25,177.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_12.setTransform(133.725,179.475);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgLIAPAAIAAgTIAMAAIAAATIAPAAIAAALIgPAAIAAAwQAAAEACADQACADAFgBIAHAAIAAAKIgLACQgJAAgEgFg");
	this.shape_13.setTransform(126.975,178.5);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_14.setTransform(119.25,177.95);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_15.setTransform(115.25,179.325);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgLIAPAAIAAgTIAMAAIAAATIAPAAIAAALIgPAAIAAAwQAAAEACADQACADAFgBIAHAAIAAAKIgLACQgJAAgEgFg");
	this.shape_16.setTransform(109.675,178.5);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgWAeQgLgKABgSIAAgCQAAgLAEgKQAEgIAJgGQAIgFAIAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAAMAGAGQAIAIAIAAQAIAAAEgDQAGgDADgFIAIAHQgKAPgTAAQgPAAgKgLgAgMgXQgFAGgCAKIAnAAIAAAAQAAgKgGgHQgEgFgJAAQgHAAgGAGg");
	this.shape_17.setTransform(103.6,179.4);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_18.setTransform(92.975,179.325);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_19.setTransform(84.6,177.95);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgSAzQgKgFgFgHQgFgHAAgKIAOAAQAAAKAHAGQAIAFAKAAQAMAAAGgEQAFgFAAgIQAAgIgFgEQgGgEgNgEQgSgFgIgHQgJgIAAgLQAAgMALgJQAKgIAPAAQALAAAIAEQAJAFAFAHQAEAIAAAIIgOAAQAAgJgGgGQgGgFgLAAQgKAAgFAEQgGAFAAAIQAAAHAFAEQAGAFAMADQANAEAIAEQAHAEAEAGQAEAGAAAIQAAANgLAIQgKAIgRAAQgKAAgJgEg");
	this.shape_20.setTransform(78.375,178.025);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_21.setTransform(888.125,189.725);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgYAiQgIgHAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_22.setTransform(882.225,191.4);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_23.setTransform(876.35,189.95);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgYAtQgJgKABgTIAAgBQgBgRAJgLQAJgLANAAQANAAAJAKIAAgqIAOAAIAABwIgNAAIgBgJQgIAKgOAAQgNAAgJgMgAgNgFQgGAHAAAPQAAANAGAIQAFAIAJgBQANABAGgMIAAgkQgGgLgNABQgJAAgFAHg");
	this.shape_24.setTransform(870.1,189.8);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgYAiQgIgHAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_25.setTransform(861.975,191.4);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_26.setTransform(855.75,191.325);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgYAiQgIgHAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_27.setTransform(845.025,191.4);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgPAlQgIgDgEgGQgDgGAAgHIANAAQAAAHAGAEQAEAEAIAAQAHAAAGgDQAEgEAAgFQAAgFgEgDQgEgDgKgCQgKgCgGgDQgGgDgDgEQgDgEAAgGQAAgJAJgIQAHgGAMAAQAOAAAJAGQAHAIAAAKIgNAAQAAgFgFgEQgEgEgIAAQgGAAgEADQgFAEAAAEQAAAFAFADQAEADAIABQALADAGADQAGADADAEQADAEABAGQAAALgJAGQgJAHgNAAQgJAAgHgEg");
	this.shape_28.setTransform(837.05,191.4);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgYAiQgIgHAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_29.setTransform(829.125,191.4);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AATAoIgTg7IgSA7IgLAAIgXhOIAOAAIAPA5IASg5IALAAIATA7IAOg7IAOAAIgXBOg");
	this.shape_30.setTransform(819.4,191.4);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgXAfQgJgLgBgSIAAgCQAAgLAFgJQAFgKAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAGAIQAIAHAIAAQAHAAAGgDQAEgDAEgFIAJAGQgKAQgVAAQgOAAgLgKgAgMgXQgFAGgBAKIAmAAIAAgBQAAgKgFgGQgGgFgIAAQgHAAgGAGg");
	this.shape_31.setTransform(809.95,191.4);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgYAtQgJgKAAgTIAAgBQAAgRAJgLQAIgLAPAAQAMAAAJAKIAAgqIAOAAIAABwIgNAAIgBgJQgIAKgNAAQgOAAgJgMgAgOgFQgFAHAAAPQAAANAFAIQAGAIAJgBQANABAGgMIAAgkQgHgLgMABQgJAAgGAHg");
	this.shape_32.setTransform(801.5,189.8);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgYAiQgIgHAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_33.setTransform(789.675,191.4);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_34.setTransform(782.325,189.725);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_35.setTransform(776.2,189.95);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgOBEIAAgKIAGAAQAFAAACgCQABgDAAgGIAAhXIAOAAIAABXQAAAXgUAAQgEAAgEgCgAABg4QgBgCAAgDQAAgDABgDQACgCAEAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgEgBgCgCg");
	this.shape_36.setTransform(771.775,191.55);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_37.setTransform(765.225,189.725);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgYAiQgIgHAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_38.setTransform(759.325,191.4);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_39.setTransform(753.1,191.325);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgXAfQgKgLABgSIAAgCQAAgLAEgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAIQAHAHAJAAQAIAAAEgDQAGgDADgFIAIAGQgKAQgUAAQgOAAgLgKgAgMgXQgGAGAAAKIAmAAIAAgBQAAgKgGgGQgEgFgJAAQgHAAgGAGg");
	this.shape_40.setTransform(746.3,191.4);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgCAsQgEgFAAgKIAAgwIgPAAIAAgKIAPAAIAAgUIAMAAIAAAUIAPAAIAAAKIgPAAIAAAwQAAAEACADQACACAFAAIAHgBIAAAMIgLABQgJAAgEgGg");
	this.shape_41.setTransform(739.625,190.5);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgYAiQgIgHAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_42.setTransform(733.325,191.4);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_43.setTransform(727.425,189.725);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_44.setTransform(723.8,189.95);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgUAvIgBAJIgMAAIAAhwIAOAAIAAAqQAIgKAOAAQAOAAAIALQAJALgBARIAAACQABASgJALQgJALgNAAQgOAAgJgKgAgTgBIAAAiQAGAMANAAQAJABAFgIQAGgHAAgQQAAgNgGgHQgFgHgJAAQgOgBgFAMg");
	this.shape_45.setTransform(717.95,189.8);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAPQAAAHAEAEQAEADAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_46.setTransform(881.825,169.4);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AgEAnIgdhOIAOAAIATA8IAUg8IAOAAIgdBOg");
	this.shape_47.setTransform(874.125,169.4);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_48.setTransform(868.35,169.325);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAPQAAAHAEAEQAEADAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_49.setTransform(861.325,169.4);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_50.setTransform(855.425,167.725);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAPQAAAHAEAEQAEADAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_51.setTransform(845.825,169.4);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_52.setTransform(838.475,167.725);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgEQAAgCACgDQACgCADAAQAEAAACACQACADAAACQAAAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_53.setTransform(832.35,167.95);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFAAIAHAAIAAAKIgLACQgJAAgEgFg");
	this.shape_54.setTransform(827.875,168.5);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgWAeQgLgKABgSIAAgCQAAgLAEgKQAEgIAJgGQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAAMAGAGQAIAIAIAAQAIAAAEgDQAGgDADgFIAIAHQgKAPgTAAQgPAAgKgLgAgMgXQgFAGgCALIAnAAIAAgBQAAgLgGgGQgEgFgJAAQgHAAgGAGg");
	this.shape_55.setTransform(821.8,169.4);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_56.setTransform(814.475,167.725);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AARA4IAAg0QAAgIgDgEQgEgEgIAAQgGAAgFAEQgFADgCAFIAAA4IgOAAIAAhvIAOAAIAAArQAIgLANAAQAaAAAAAbIAAA0g");
	this.shape_57.setTransform(802.35,167.725);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_58.setTransform(794.075,169.475);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgUAuIAAAJIgMAAIAAhvIANAAIAAAqQAIgKAOAAQAOAAAIAKQAIALAAATIAAABQAAASgIALQgIALgOAAQgPAAgIgLgAgTAAIAAAhQAGAMANAAQAJAAAGgHQAFgIAAgPQAAgOgFgGQgGgIgJAAQgNAAgGANg");
	this.shape_59.setTransform(785.95,167.8);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_60.setTransform(777.425,169.475);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFAAIAHAAIAAAKIgLACQgJAAgEgFg");
	this.shape_61.setTransform(770.675,168.5);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgCACgDQACgCADAAQAEAAACACQACADAAACQAAAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_62.setTransform(762.95,167.95);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_63.setTransform(758.95,169.325);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFAAIAHAAIAAAKIgLACQgJAAgEgFg");
	this.shape_64.setTransform(753.375,168.5);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AgXAeQgKgKAAgSIAAgCQABgLAEgKQAEgIAIgGQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAAMAGAGQAHAIAJAAQAHAAAGgDQAFgDADgFIAIAHQgJAPgVAAQgOAAgLgLgAgMgXQgGAGAAALIAmAAIAAgBQgBgLgFgGQgEgFgJAAQgHAAgGAGg");
	this.shape_65.setTransform(747.3,169.4);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_66.setTransform(736.675,169.325);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgCACgDQACgCADAAQAEAAACACQACADAAACQAAAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_67.setTransform(728.3,167.95);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AgSAzQgKgFgFgHQgFgHAAgKIAOAAQAAAKAHAGQAIAFAKAAQAMAAAGgEQAFgFAAgIQAAgIgFgEQgGgEgNgEQgSgFgIgHQgJgIAAgLQAAgMALgJQAKgIAPAAQALAAAIAEQAJAFAFAHQAEAIAAAIIgOAAQAAgJgGgGQgGgFgLAAQgKAAgFAEQgGAFAAAIQAAAHAFAEQAGAFAMADQANAEAIAEQAHAEAEAGQAEAGAAAIQAAANgLAIQgKAIgRAAQgKAAgJgEg");
	this.shape_68.setTransform(722.075,168.025);

	this.laut = new lib.gem1();
	this.laut.name = "laut";
	this.laut.setTransform(106.75,278.45,1,1,0,0,0,49.4,59.8);

	this.kotakKartu2 = new lib.hasil();
	this.kotakKartu2.name = "kotakKartu2";
	this.kotakKartu2.setTransform(841.2,414.1,1,1,0,0,0,49.4,59.8);

	this.tana = new lib.gem1();
	this.tana.name = "tana";
	this.tana.setTransform(841.4,278.6,1.004,1.0029,0,0,0,49.4,59.8);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1,0,0,1,-124.5,-43.5)).s().p("AzcGzIAAtlMAm5AAAIAANlg");
	this.shape_69.setTransform(150.3,181.5);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1,0,0,1,-124.5,-43.5)).s().p("AzcGzIAAtlMAm5AAAIAANlg");
	this.shape_70.setTransform(803.5,181.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_70},{t:this.shape_69},{t:this.tana},{t:this.kotakKartu2},{t:this.laut},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Slots3, new cjs.Rectangle(25.8,138,902.2,337.5), null);


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


(lib.Pieces = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// pieces
	this.laut7 = new lib.gem10();
	this.laut7.name = "laut7";
	this.laut7.setTransform(711.55,410.25,0.8869,0.8869,0,0,0,49.6,60);
	new cjs.ButtonHelper(this.laut7, 0, 1, 2);

	this.laut5 = new lib.gem8();
	this.laut5.name = "laut5";
	this.laut5.setTransform(472.95,410.25,0.8869,0.8869,0,0,0,49.6,60);
	new cjs.ButtonHelper(this.laut5, 0, 1, 2);

	this.laut6 = new lib.gem9();
	this.laut6.name = "laut6";
	this.laut6.setTransform(592.8,410.25,0.8869,0.8869,0,0,0,49.6,60);
	new cjs.ButtonHelper(this.laut6, 0, 1, 2);

	this.laut3 = new lib.gem6();
	this.laut3.name = "laut3";
	this.laut3.setTransform(235.3,410.25,0.8869,0.8869,0,0,0,49.6,60);
	new cjs.ButtonHelper(this.laut3, 0, 1, 2);

	this.laut4 = new lib.gem7();
	this.laut4.name = "laut4";
	this.laut4.setTransform(354.3,410.25,0.8869,0.8869,0,0,0,49.6,60);
	new cjs.ButtonHelper(this.laut4, 0, 1, 2);

	this.laut2 = new lib.gem5();
	this.laut2.name = "laut2";
	this.laut2.setTransform(711.55,283.05,0.8869,0.8869,0,0,0,49.6,60.1);
	new cjs.ButtonHelper(this.laut2, 0, 1, 2);

	this.tana1 = new lib.gem3();
	this.tana1.name = "tana1";
	this.tana1.setTransform(472.95,283.05,0.8869,0.8869,0,0,0,49.6,60.1);
	new cjs.ButtonHelper(this.tana1, 0, 1, 2);

	this.laut1 = new lib.gem4();
	this.laut1.name = "laut1";
	this.laut1.setTransform(592.8,283.05,0.8869,0.8869,0,0,0,49.6,60.1);
	new cjs.ButtonHelper(this.laut1, 0, 1, 2);

	this.laut = new lib.btnGan();
	this.laut.name = "laut";
	this.laut.setTransform(235.3,283.05,0.8869,0.8869,0,0,0,49.6,60.1);
	new cjs.ButtonHelper(this.laut, 0, 1, 2);

	this.tana = new lib.gem2();
	this.tana.name = "tana";
	this.tana.setTransform(354.3,283.05,0.8869,0.8869,0,0,0,49.6,60.1);
	new cjs.ButtonHelper(this.tana, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.tana},{t:this.laut},{t:this.laut1},{t:this.tana1},{t:this.laut2},{t:this.laut4},{t:this.laut3},{t:this.laut6},{t:this.laut5},{t:this.laut7}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces, new cjs.Rectangle(184.2,228.5,572.2,242.7), null);


// stage content:
(lib.game4 = function(mode,startPosition,loop) {
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
		 
		var _this = this;
		
		_this.btnNextDasar1.on('click', function(){
		
		window.location.replace('../../index.html');
		});
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
		
		// root.popUpInfo.gotoAndStop(0);
		
		// root.btnInfo.on("click", function () {
		//   root.popUpInfo.gotoAndPlay(0);
		// });
		
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
		  Score.text = pieces.skor * 10;
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

	this.pieces = new lib.Pieces();
	this.pieces.name = "pieces";

	this.slots = new lib.Slots3();
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

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AABAPQAIgLAAgMIAAgNIARAAIAAAMQgBAJgEAHQgEAJgHAGgAgZAPQAIgLAAgMIAAgNIARAAIAAAMQgBAJgEAHQgEAJgHAGg");
	this.shape.setTransform(551.475,110.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_1.setTransform(543.425,116.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgcBCIgGgBIAAgNIAFAAQAHAAAFgDQAFgDADgJIADgKIghhdIARAAIAXBGIAWhGIASAAIgnBtQgIAYgTAAg");
	this.shape_2.setTransform(534.3,118.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgKgFgFQgEgEgKAAQgHAAgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAAMQALgPARAAQAeABAAAhIAAA+g");
	this.shape_3.setTransform(525.075,116.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_4.setTransform(516.175,114.85);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_5.setTransform(508.85,115.125);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_6.setTransform(503.425,115.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgDAAgHQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgEgDgEQgEgGAAgHQAAgLAKgJQAKgHAPgBQAQAAAKAJQAKAIAAAOIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAHQgKAIgQAAQgKABgJgFg");
	this.shape_7.setTransform(496.075,116.85);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQADACgBAEQABAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_8.setTransform(489.3,115.125);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgWAwIAAhdIAQAAIAAALQAHgOAOAAQAFAAADACIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_9.setTransform(484.55,116.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgbAlQgNgNAAgWIAAgCQABgNAFgMQAGgLAJgGQAKgHAKAAQATAAAKANQAKAMAAAXIAAAFIg/AAQABAOAHAKQAIAIALAAQAJAAAGgEQAFgDAFgGIAKAIQgMASgYAAQgSAAgMgMgAgPgcQgGAIgCANIAvAAIAAgCQgBgMgFgHQgHgHgKAAQgIAAgIAHg");
	this.shape_10.setTransform(476.3,116.85);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_11.setTransform(468.225,115.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_12.setTransform(461.625,114.85);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_13.setTransform(451.525,116.85);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgWAwIAAhdIAPAAIABALQAHgOAPAAQAFAAACACIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_14.setTransform(444.1,116.75);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_15.setTransform(435.625,116.85);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_16.setTransform(426.825,114.85);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_17.setTransform(715.125,89.25);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgeAkQgMgNAAgXIAAAAQAAgOAFgLQAGgLAKgGQAJgHAMABQATAAAMANQAMANAAAWIAAABQAAAOgFALQgFALgKAGQgKAGgNABQgSAAgMgOgAgTgaQgHAKAAARQAAAQAHAJQAIAKALAAQAMAAAIgKQAHgJAAgRQAAgPgHgKQgIgKgMAAQgLAAgIAJg");
	this.shape_18.setTransform(704.875,91.25);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgnBDIAAiDIAPAAIABALQAKgNAQAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgJANgRAAQgRAAgKgLIAAAugAgXgnIAAAtQAHANAPAAQALAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgOAAgIANg");
	this.shape_19.setTransform(694.9,92.975);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAzAxIAAg+QAAgLgFgFQgFgEgLgBQgJAAgGAGQgGAFgBAKIAAA+IgPAAIAAg+QAAgUgUgBQgQAAgGAOIAABFIgRAAIAAhfIAQAAIAAALQALgMASAAQATAAAHAPQAEgHAIgEQAIgEAKAAQAfAAABAhIAAA/g");
	this.shape_20.setTransform(681.725,91.15);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgeAkQgMgNAAgXIAAAAQAAgOAFgLQAGgLAKgGQAJgHAMABQATAAAMANQAMANAAAWIAAABQAAAOgFALQgFALgKAGQgKAGgNABQgSAAgMgOgAgTgaQgHAKAAARQAAAQAHAJQAIAKALAAQAMAAAIgKQAHgJAAgRQAAgPgHgKQgIgKgMAAQgLAAgIAJg");
	this.shape_21.setTransform(668.775,91.25);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgHBEIAAiGIAPAAIAACGg");
	this.shape_22.setTransform(661.475,89.25);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgbAkQgNgMAAgVIAAgDQAAgOAGgKQAFgMAKgGQAKgGAKAAQATAAAKAMQAKAMAAAXIAAAGIg/AAQABAOAHAIQAIAJALAAQAJAAAGgDQAFgEAFgGIAKAIQgMATgYAAQgSgBgMgNgAgPgcQgGAHgCANIAvAAIAAgBQgBgNgFgGQgHgHgKAAQgIAAgIAHg");
	this.shape_23.setTransform(654.6,91.25);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_24.setTransform(645.825,89.25);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_25.setTransform(631.225,91.15);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_26.setTransform(621.325,91.25);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_27.setTransform(612.525,89.25);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAQAAIAAALQAHgNAOABQAFgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_28.setTransform(604.8,91.15);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_29.setTransform(596.325,91.25);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAIQgKAIgQAAQgKgBgJgEg");
	this.shape_30.setTransform(586.775,91.25);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_31.setTransform(577.225,91.25);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgcA2QgLgNAAgWIAAgBQAAgVAKgNQALgNARAAQAPAAAKALIAAgxIAQAAIAACGIgPAAIAAgKQgKALgRABQgRgBgJgOgAgQgHQgHAJAAASQAAAQAHAJQAGAJALAAQAQAAAHgNIAAgrQgHgOgQAAQgLABgGAIg");
	this.shape_32.setTransform(567.05,89.35);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAPAAIABALQAHgNAPABQAFgBACACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_33.setTransform(559.65,91.15);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgbAkQgMgMAAgVIAAgDQgBgOAGgKQAGgMAJgGQAKgGAKAAQATAAAKAMQALAMAAAXIAAAGIhAAAQAAAOAIAIQAIAJALAAQAJAAAFgDQAHgEAEgGIAKAIQgMATgXAAQgTgBgMgNgAgPgcQgGAHgBANIAuAAIAAgBQAAgNgHgGQgFgHgLAAQgIAAgIAHg");
	this.shape_34.setTransform(551.4,91.25);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgYA3IgBAMIgOAAIAAiGIAQAAIAAAyQAKgMAQAAQARgBAKANQAKAOAAAVIAAACQAAAWgKANQgKAOgRAAQgRgBgKgNgAgXgBIAAApQAHAOAQAAQALAAAGgJQAHgIAAgTQAAgQgHgJQgGgIgLgBQgQAAgHAPg");
	this.shape_35.setTransform(541.725,89.35);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_36.setTransform(528.775,90.2);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgcAoQgJgKABgRIAAg9IAQAAIAAA9QgBAVATAAQARAAAGgNIAAhFIAQAAIAABfIgPAAIgBgKQgJAMgSAAQgPAAgHgJg");
	this.shape_37.setTransform(521.15,91.35);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgYA3IgBAMIgOAAIAAiGIAQAAIAAAyQAKgMAQAAQARgBAKANQAKAOAAAVIAAACQAAAWgKANQgKAOgRAAQgRgBgKgNgAgXgBIAAApQAHAOAQAAQALAAAGgJQAHgIAAgTQAAgQgHgJQgGgIgLgBQgQAAgHAPg");
	this.shape_38.setTransform(511.375,89.35);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgbAkQgNgMAAgVIAAgDQABgOAFgKQAGgMAJgGQAKgGAKAAQATAAAKAMQAKAMAAAXIAAAGIg/AAQABAOAHAIQAIAJALAAQAJAAAGgDQAFgEAFgGIAKAIQgMATgXAAQgTgBgMgNgAgOgcQgHAHgCANIAvAAIAAgBQAAgNgGgGQgHgHgKAAQgIAAgHAHg");
	this.shape_39.setTransform(501.4,91.25);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAIQgKAIgQAAQgKgBgJgEg");
	this.shape_40.setTransform(491.875,91.25);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAPAAIABALQAHgNAPABQAEgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_41.setTransform(484.7,91.15);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgbAkQgMgMAAgVIAAgDQAAgOAFgKQAFgMAKgGQAKgGAKAAQATAAAKAMQALAMAAAXIAAAGIhAAAQABAOAHAIQAIAJALAAQAJAAAFgDQAHgEAEgGIAKAIQgMATgXAAQgTgBgMgNgAgOgcQgHAHgBANIAuAAIAAgBQAAgNgHgGQgFgHgLAAQgJAAgGAHg");
	this.shape_42.setTransform(476.45,91.25);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_43.setTransform(468.375,90.2);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_44.setTransform(456.275,91.15);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_45.setTransform(446.375,91.25);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AAWAwIgWhHIgWBHIgNAAIgchfIAQAAIATBGIAXhGIALAAIAXBIIAThIIAQAAIgcBfg");
	this.shape_46.setTransform(434.7,91.25);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgbAkQgMgMAAgVIAAgDQgBgOAGgKQAFgMAKgGQAKgGAKAAQATAAAKAMQALAMAAAXIAAAGIhAAAQAAAOAIAIQAIAJALAAQAJAAAFgDQAHgEAEgGIAKAIQgMATgXAAQgTgBgMgNgAgOgcQgHAHgBANIAuAAIAAgBQAAgNgHgGQgFgHgLAAQgJAAgGAHg");
	this.shape_47.setTransform(423.25,91.25);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AAVBEIAAg/QAAgKgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAiGIAQAAIAAAzQALgNAQAAQAegBAAAiIAAA/g");
	this.shape_48.setTransform(413.475,89.25);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgUAHIAAgNIApAAIAAANg");
	this.shape_49.setTransform(406.025,90.575);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_50.setTransform(398.575,91.15);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_51.setTransform(388.675,91.25);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AAXAwIgXhHIgWBHIgNAAIgchfIAQAAIATBGIAXhGIALAAIAXBIIAThIIAPAAIgbBfg");
	this.shape_52.setTransform(377,91.25);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgbAkQgMgMAAgVIAAgDQgBgOAGgKQAGgMAJgGQAKgGAKAAQATAAAKAMQALAMAAAXIAAAGIhAAAQAAAOAIAIQAIAJALAAQAJAAAFgDQAHgEAEgGIAKAIQgMATgXAAQgTgBgMgNgAgPgcQgGAHgBANIAuAAIAAgBQAAgNgHgGQgFgHgLAAQgIAAgIAHg");
	this.shape_53.setTransform(365.55,91.25);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AAVBEIAAg/QAAgKgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAiGIAQAAIAAAzQALgNAQAAQAegBAAAiIAAA/g");
	this.shape_54.setTransform(355.775,89.25);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_55.setTransform(341.375,91.15);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_56.setTransform(331.475,91.25);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_57.setTransform(322.675,89.25);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_58.setTransform(313.575,89.25);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgcAoQgJgKAAgRIAAg9IARAAIAAA9QgBAVATAAQARAAAGgNIAAhFIAQAAIAABfIgPAAIAAgKQgKAMgSAAQgPAAgHgJg");
	this.shape_59.setTransform(303.45,91.35);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAIQgKAIgQAAQgKgBgJgEg");
	this.shape_60.setTransform(293.825,91.25);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_61.setTransform(284.275,91.25);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AAvBAIAAgyIABg0IgqBmIgMAAIgqhmIACA0IAAAyIgQAAIAAh/IAVAAIApBoIAqhoIAWAAIAAB/g");
	this.shape_62.setTransform(271.55,89.6);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AACAVIAAgKQAAgJAEgIQAEgJAHgFIAJAGQgIAMAAALIAAAMgAgZAVIAAgKQAAgJAEgIQAEgJAHgFIAKAGQgJAMAAALIAAAMg");
	this.shape_63.setTransform(260.875,84.45);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.bf(img.Bitmap2, null, new cjs.Matrix2D(1,0,0,1,-499,-300)).s().p("EhN9Au4MAAAhdvMCb7AAAMAAABdvg");
	this.shape_64.setTransform(471,261);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.btnNextDasar1},{t:this.btnMenuDasar1},{t:this.btnBack3},{t:this.winMessage},{t:this.slots},{t:this.pieces},{t:this.judulKI},{t:this.Score},{t:this.restart},{t:this.btnInfo}]}).wait(1));

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
		{src:"images/_16.jpeg", id:"_16"},
		{src:"images/_17.jpeg", id:"_17"},
		{src:"images/_28.jpeg", id:"_28"},
		{src:"images/_36.jpeg", id:"_36"},
		{src:"images/_6.jpeg", id:"_6"},
		{src:"images/_5.jpeg", id:"_5"},
		{src:"images/_7.jpeg", id:"_7"},
		{src:"images/Bitmap1.png", id:"Bitmap1"},
		{src:"images/Bitmap2.png", id:"Bitmap2"},
		{src:"images/Bitmap3.png", id:"Bitmap3"},
		{src:"images/Bitmap44.png", id:"Bitmap44"},
		{src:"images/bookpngcopy.png", id:"bookpngcopy"},
		{src:"images/_32.jpeg", id:"_32"},
		{src:"images/Bitmap45.png", id:"Bitmap45"}
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