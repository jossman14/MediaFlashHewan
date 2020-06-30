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


(lib._13 = function() {
	this.initialize(img._13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,594,297);


(lib._16 = function() {
	this.initialize(img._16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,320,292);


(lib._25 = function() {
	this.initialize(img._25);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,729,600);


(lib._26 = function() {
	this.initialize(img._26);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,624,375);


(lib._17 = function() {
	this.initialize(img._17);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,700,467);


(lib._3 = function() {
	this.initialize(img._3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,638,479);


(lib._28 = function() {
	this.initialize(img._28);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,259,194);


(lib._34 = function() {
	this.initialize(img._34);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,440,302);


(lib._32 = function() {
	this.initialize(img._32);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,720,489);


(lib._5 = function() {
	this.initialize(img._5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,700,450);


(lib._36 = function() {
	this.initialize(img._36);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,690,518);


(lib._6 = function() {
	this.initialize(img._6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,683);


(lib._5jpegcopy = function() {
	this.initialize(img._5jpegcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,700,450);


(lib._7 = function() {
	this.initialize(img._7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,201);


(lib._20 = function() {
	this.initialize(img._20);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,720,580);


(lib.Bitmap1 = function() {
	this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,97,120);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);


(lib._9_tripo = function() {
	this.initialize(img._9_tripo);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,823,518);


(lib.Bitmap44 = function() {
	this.initialize(img.Bitmap44);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,267,177);


(lib.Bitmap3 = function() {
	this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,249,87);


(lib.Bitmap45 = function() {
	this.initialize(img.Bitmap45);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,202,177);


(lib._30 = function() {
	this.initialize(img._30);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,768,437);


(lib.Bitmap72 = function() {
	this.initialize(img.Bitmap72);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,267,177);


(lib.Bitmap73 = function() {
	this.initialize(img.Bitmap73);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,202,177);


(lib._10_tripo = function() {
	this.initialize(img._10_tripo);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,708,526);


(lib._7jpegcopy = function() {
	this.initialize(img._7jpegcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,201);


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


(lib.lingker = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(255,0,0,0.937)").ss(5,1,1).p("ADdFFQkGCzj7AgQj6AghciHQhciHB5jeQB6jcEHizQEGi0D6gfQD7ggBcCGQBcCHh6DeQh4DdkICzg");
	this.shape.setTransform(0.0123,-0.0009);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.lingker, new cjs.Rectangle(-69.9,-56.6,139.9,113.30000000000001), null);


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


(lib.g4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(255,0,0,0.937)").ss(5,1,1).p("AM2AAQAAGZjxEhQjwEilVAAQlUAAjxkiQjwkhAAmZQAAmYDwkiQDxkhFUAAQFVAADwEhQDxEiAAGYg");
	this.shape.setTransform(-3,17.55);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.instance = new lib._26();
	this.instance.setTransform(-189.5,-170.5,0.6074,0.9093);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g4, new cjs.Rectangle(-189.5,-170.5,379,341), null);


(lib.g1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(255,0,0,0.937)").ss(5,1,1).p("AFBAAQAADVheCWQheCXiFAAQiEAAhfiXQhdiWAAjVQAAjUBdiWQBfiXCEAAQCFAABeCXQBeCWAADUg");
	this.shape.setTransform(101.05,95.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.instance = new lib._3();
	this.instance.setTransform(-189.5,-170.5,0.594,0.7119);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g1, new cjs.Rectangle(-189.5,-170.5,379,341), null);


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


(lib.Slots = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// slots
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgCAsQgEgFAAgKIAAgwIgPAAIAAgKIAPAAIAAgUIAMAAIAAAUIAPAAIAAAKIgPAAIAAAwQAAAEACADQACACAFAAIAHgBIAAAMIgLABQgJAAgEgGg");
	this.shape.setTransform(202.125,190.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_1.setTransform(195.775,191.475);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgYAiQgIgHAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_2.setTransform(187.575,191.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_3.setTransform(181.675,189.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_4.setTransform(174.35,189.95);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgYAtQgJgKABgTIAAgBQgBgRAJgLQAJgLANAAQANAAAJAKIAAgqIANAAIAABwIgMAAIgBgJQgIAKgOAAQgNAAgJgMgAgNgFQgGAHAAAPQAAANAGAIQAFAIAJgBQANABAGgMIAAgkQgGgLgNABQgJAAgFAHg");
	this.shape_5.setTransform(168.1,189.8);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AggA3IAAhsIAMAAIABAIQAIgKAOAAQAOAAAIALQAIALAAATIAAACQAAAQgIALQgIAMgOgBQgOABgIgKIAAAmgAgTggIAAAlQAGALANgBQAIABAGgJQAGgHAAgOQAAgNgGgJQgGgHgIAAQgNAAgGALg");
	this.shape_6.setTransform(156.325,192.85);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_7.setTransform(147.825,191.475);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgYAtQgJgKABgTIAAgBQgBgRAJgLQAJgLAOAAQAMAAAJAKIAAgqIANAAIAABwIgMAAIgBgJQgIAKgNAAQgOAAgJgMgAgNgFQgGAHAAAPQAAANAGAIQAFAIAJgBQANABAGgMIAAgkQgGgLgNABQgJAAgFAHg");
	this.shape_8.setTransform(139.3,189.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_9.setTransform(133.45,189.95);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AARA4IAAg0QAAgIgDgEQgEgEgJAAQgFAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLANAAQAZAAAAAbIAAA0g");
	this.shape_10.setTransform(127.5,189.725);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AASAoIAAgzQAAgJgFgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_11.setTransform(115.5,191.325);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgYAiQgIgHAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_12.setTransform(107.275,191.4);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgYAtQgJgKABgTIAAgBQgBgRAJgLQAJgLANAAQANAAAJAKIAAgqIAOAAIAABwIgNAAIgBgJQgIAKgOAAQgNAAgJgMgAgNgFQgGAHAAAPQAAANAGAIQAFAIAJgBQANABAGgMIAAgkQgGgLgNABQgJAAgFAHg");
	this.shape_13.setTransform(98.8,189.8);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_14.setTransform(234.525,167.725);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgEQAAgCACgDQACgCADAAQAEAAACACQACADAAACQAAAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_15.setTransform(228.4,167.95);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFAAIAHAAIAAAKIgLACQgJAAgEgFg");
	this.shape_16.setTransform(223.925,168.5);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgPAmQgHgEgFgGQgDgGgBgHIAOAAQABAHAEAEQAFAEAIAAQAIAAAEgDQAFgEAAgEQAAgGgEgDQgFgDgJgDQgKgCgGgCQgGgDgDgEQgDgEAAgGQAAgJAIgHQAJgHAMAAQANAAAJAHQAIAGAAAMIgOAAQAAgGgEgEQgFgEgHAAQgHAAgEADQgFADABAGQAAAFADACQAFACAJACQAKADAGADQAGACAEAFQACAEAAAHQAAAKgIAHQgJAGgNAAQgJAAgHgDg");
	this.shape_17.setTransform(217.8,169.4);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAPQAAAHAEAEQAEADAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_18.setTransform(209.875,169.4);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_19.setTransform(203.975,167.725);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgTAuIgBAJIgNAAIAAhvIAOAAIAAAqQAIgKANAAQAPAAAIAKQAJALAAATIAAABQAAASgJALQgJALgOAAQgOAAgHgLgAgTAAIAAAhQAGAMANAAQAJAAAGgHQAFgIAAgPQAAgOgFgGQgGgIgJAAQgNAAgGANg");
	this.shape_20.setTransform(198.15,167.8);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgZAeQgKgLAAgTIAAAAQAAgMAFgJQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAALgEAJQgFAKgIAFQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgJAAgNQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_21.setTransform(189.475,169.4);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_22.setTransform(183.375,167.725);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AggA3IAAhsIAMAAIABAJQAIgKAOAAQAOAAAIAKQAIALAAATIAAABQAAASgIALQgIAKgOABQgOgBgIgIIAAAlgAgTghIAAAlQAGAMANAAQAIgBAGgHQAGgIAAgPQAAgNgGgHQgGgIgIAAQgNAAgGAKg");
	this.shape_23.setTransform(177.525,170.85);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgCACgDQACgCADAAQAEAAACACQACADAAACQAAAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_24.setTransform(171.35,167.95);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_25.setTransform(167.35,169.325);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFAAIAHAAIAAAKIgLACQgJAAgEgFg");
	this.shape_26.setTransform(161.775,168.5);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AASA4IAAg0QgBgIgEgEQgDgEgIAAQgGAAgFAEQgFADgCAFIAAA4IgOAAIAAhvIAOAAIAAArQAIgLANAAQAaAAAAAbIAAA0g");
	this.shape_27.setTransform(151.75,167.725);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_28.setTransform(143.475,169.475);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgUAuIgBAJIgLAAIAAhvIANAAIAAAqQAIgKAOAAQAOAAAIAKQAIALAAATIAAABQAAASgIALQgIALgOAAQgOAAgJgLgAgTAAIAAAhQAGAMANAAQAJAAAGgHQAFgIAAgPQAAgOgFgGQgGgIgJAAQgOAAgFANg");
	this.shape_29.setTransform(135.35,167.8);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_30.setTransform(126.825,169.475);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFAAIAHAAIAAAKIgLACQgJAAgEgFg");
	this.shape_31.setTransform(120.075,168.5);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AASAoIAAgzQAAgJgFgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_32.setTransform(110,169.325);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAPQAAAHAEAEQAEADAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_33.setTransform(101.775,169.4);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgPAmQgHgEgEgGQgFgGAAgHIAOAAQAAAHAFAEQAGAEAHAAQAIAAAEgDQAFgEAAgEQAAgGgEgDQgFgDgJgDQgKgCgGgCQgGgDgDgEQgDgEAAgGQAAgJAIgHQAJgHAMAAQANAAAIAHQAJAGgBAMIgNAAQAAgGgFgEQgFgEgGAAQgHAAgEADQgEADgBAGQABAFADACQAFACAIACQALADAGADQAHACADAFQACAEAAAHQAAAKgIAHQgJAGgNAAQgIAAgIgDg");
	this.shape_34.setTransform(93.8,169.4);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgEQAAgCACgDQACgCADAAQAEAAACACQACADAAACQAAAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_35.setTransform(88.15,167.95);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AggA3IAAhsIAMAAIABAJQAIgKAOAAQAOAAAIAKQAIALAAATIAAABQAAASgIALQgIAKgOABQgOgBgIgIIAAAlgAgTghIAAAlQAGAMANAAQAIgBAGgHQAGgIAAgPQAAgNgGgHQgGgIgIAAQgNAAgGAKg");
	this.shape_36.setTransform(82.275,170.85);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAPQAAAHAEAEQAEADAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_37.setTransform(73.825,169.4);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgfA1IAAhpIAOAAIAABeIAxAAIAAALg");
	this.shape_38.setTransform(66.175,168.025);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AASA4IAAg0QAAgIgFgEQgDgEgJAAQgFAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLANAAQAZAAAAAbIAAA0g");
	this.shape_39.setTransform(860.8,189.725);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgYAiQgIgHAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_40.setTransform(852.575,191.4);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_41.setTransform(844.35,191.325);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgYAiQgIgHAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_42.setTransform(836.125,191.4);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgCAsQgEgFAAgKIAAgwIgPAAIAAgKIAPAAIAAgUIAMAAIAAAUIAPAAIAAAKIgPAAIAAAwQAAAEACADQACACAFAAIAHgBIAAAMIgLABQgJAAgEgGg");
	this.shape_43.setTransform(829.425,190.5);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_44.setTransform(821.7,189.95);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgYAtQgJgKAAgTIAAgBQAAgRAJgLQAIgLAPAAQAMAAAJAKIAAgqIAOAAIAABwIgNAAIgBgJQgIAKgNAAQgOAAgJgMgAgOgFQgFAHAAAPQAAANAFAIQAGAIAJgBQANABAGgMIAAgkQgHgLgMABQgJAAgGAHg");
	this.shape_45.setTransform(815.45,189.8);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AggA3IAAhsIAMAAIABAIQAIgKAOAAQAOAAAIALQAIALAAATIAAACQAAAQgIALQgIAMgOgBQgOABgIgKIAAAmgAgTggIAAAlQAGALANgBQAIABAGgJQAGgHAAgOQAAgNgGgJQgGgHgIAAQgNAAgGALg");
	this.shape_46.setTransform(803.675,192.85);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_47.setTransform(795.175,191.475);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgYAtQgJgKAAgTIAAgBQAAgRAJgLQAIgLAPAAQAMAAAJAKIAAgqIAOAAIAABwIgNAAIgBgJQgIAKgNAAQgOAAgJgMgAgOgFQgFAHAAAPQAAANAFAIQAGAIAJgBQANABAGgMIAAgkQgHgLgMABQgJAAgGAHg");
	this.shape_48.setTransform(786.65,189.8);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_49.setTransform(780.8,189.95);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AASA4IAAg0QAAgIgFgEQgDgEgJAAQgFAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLANAAQAZAAAAAbIAAA0g");
	this.shape_50.setTransform(774.85,189.725);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AASAoIAAgzQgBgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_51.setTransform(762.85,191.325);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AgYAiQgIgHAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_52.setTransform(754.625,191.4);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AgYAtQgJgKAAgTIAAgBQAAgRAJgLQAIgLAPAAQAMAAAJAKIAAgqIAOAAIAABwIgNAAIgBgJQgIAKgNAAQgOAAgJgMgAgOgFQgFAHAAAPQAAANAFAIQAGAIAJgBQANABAGgMIAAgkQgHgLgMABQgJAAgGAHg");
	this.shape_53.setTransform(746.15,189.8);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_54.setTransform(888.275,167.725);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgEQAAgCACgDQACgCADAAQAEAAACACQACADAAACQAAAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_55.setTransform(882.15,167.95);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFAAIAHAAIAAAKIgLACQgJAAgEgFg");
	this.shape_56.setTransform(877.675,168.5);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AgPAmQgHgEgFgGQgDgGAAgHIANAAQABAHAEAEQAFAEAIAAQAHAAAGgDQAEgEAAgEQAAgGgEgDQgEgDgKgDQgKgCgGgCQgGgDgDgEQgDgEAAgGQAAgJAIgHQAIgHAMAAQAOAAAJAHQAHAGABAMIgOAAQAAgGgEgEQgGgEgHAAQgGAAgEADQgFADABAGQAAAFADACQAEACAKACQAKADAGADQAGACAEAFQADAEAAAHQAAAKgJAHQgIAGgOAAQgIAAgIgDg");
	this.shape_57.setTransform(871.55,169.4);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAPQAAAHAEAEQAEADAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_58.setTransform(863.625,169.4);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_59.setTransform(857.725,167.725);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgTAuIgBAJIgNAAIAAhvIAOAAIAAAqQAIgKANAAQAPAAAIAKQAJALAAATIAAABQAAASgJALQgIALgPAAQgOAAgHgLgAgTAAIAAAhQAGAMANAAQAJAAAGgHQAFgIAAgPQAAgOgFgGQgGgIgJAAQgNAAgGANg");
	this.shape_60.setTransform(851.9,167.8);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgZAeQgKgLAAgTIAAAAQAAgMAFgJQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAALgEAJQgFAKgIAFQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgJAAgNQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_61.setTransform(843.225,169.4);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_62.setTransform(837.125,167.725);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AggA3IAAhsIAMAAIABAJQAIgKAOAAQAOAAAIAKQAIALAAATIAAABQAAASgIALQgIAKgOABQgOgBgIgIIAAAlgAgTghIAAAlQAGAMANAAQAIgBAGgHQAGgIAAgPQAAgNgGgHQgGgIgIAAQgNAAgGAKg");
	this.shape_63.setTransform(831.275,170.85);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgEQAAgCACgDQACgCADAAQAEAAACACQACADAAACQAAAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_64.setTransform(825.1,167.95);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_65.setTransform(821.1,169.325);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFAAIAHAAIAAAKIgLACQgJAAgEgFg");
	this.shape_66.setTransform(815.525,168.5);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AARA4IAAg0QAAgIgEgEQgDgEgIAAQgGAAgFAEQgFADgCAFIAAA4IgOAAIAAhvIAOAAIAAArQAIgLANAAQAaAAAAAbIAAA0g");
	this.shape_67.setTransform(805.5,167.725);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_68.setTransform(797.225,169.475);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2C3E50").s().p("AgUAuIAAAJIgMAAIAAhvIANAAIAAAqQAIgKAOAAQAOAAAIAKQAIALABATIAAABQgBASgIALQgIALgOAAQgPAAgIgLgAgTAAIAAAhQAGAMANAAQAJAAAGgHQAFgIAAgPQAAgOgFgGQgGgIgJAAQgNAAgGANg");
	this.shape_69.setTransform(789.1,167.8);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_70.setTransform(780.575,169.475);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2C3E50").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFAAIAHAAIAAAKIgLACQgJAAgEgFg");
	this.shape_71.setTransform(773.825,168.5);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2C3E50").s().p("AASAoIAAgzQgBgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_72.setTransform(763.75,169.325);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#2C3E50").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAPQAAAHAEAEQAEADAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_73.setTransform(755.525,169.4);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#2C3E50").s().p("AgPAmQgHgEgEgGQgFgGAAgHIAOAAQABAHAEAEQAGAEAHAAQAIAAAEgDQAFgEAAgEQAAgGgEgDQgFgDgJgDQgKgCgGgCQgGgDgDgEQgDgEAAgGQAAgJAIgHQAJgHAMAAQANAAAIAHQAJAGgBAMIgNAAQAAgGgFgEQgEgEgHAAQgHAAgEADQgEADAAAGQAAAFADACQAFACAJACQAKADAGADQAHACADAFQACAEAAAHQAAAKgIAHQgJAGgNAAQgJAAgHgDg");
	this.shape_74.setTransform(747.55,169.4);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#2C3E50").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgEQAAgCACgDQACgCADAAQAEAAACACQACADAAACQAAAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_75.setTransform(741.9,167.95);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#2C3E50").s().p("AggA3IAAhsIAMAAIABAJQAIgKAOAAQAOAAAIAKQAIALAAATIAAABQAAASgIALQgIAKgOABQgOgBgIgIIAAAlgAgTghIAAAlQAGAMANAAQAIgBAGgHQAGgIAAgPQAAgNgGgHQgGgIgIAAQgNAAgGAKg");
	this.shape_76.setTransform(736.025,170.85);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#2C3E50").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAPQAAAHAEAEQAEADAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_77.setTransform(727.575,169.4);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#2C3E50").s().p("AgfA1IAAhpIAOAAIAABeIAxAAIAAALg");
	this.shape_78.setTransform(719.925,168.025);

	this.laut = new lib.gem1();
	this.laut.name = "laut";
	this.laut.setTransform(106.75,278.45,1,1,0,0,0,49.4,59.8);

	this.kotakKartu2 = new lib.hasil();
	this.kotakKartu2.name = "kotakKartu2";
	this.kotakKartu2.setTransform(841.2,414.1,1,1,0,0,0,49.4,59.8);

	this.tana = new lib.gem1();
	this.tana.name = "tana";
	this.tana.setTransform(841.4,278.6,1.004,1.0029,0,0,0,49.4,59.8);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1,0,0,1,-124.5,-43.5)).s().p("AzcGzIAAtlMAm5AAAIAANlg");
	this.shape_79.setTransform(150.3,181.5);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1,0,0,1,-124.5,-43.5)).s().p("AzcGzIAAtlMAm5AAAIAANlg");
	this.shape_80.setTransform(803.5,181.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_80},{t:this.shape_79},{t:this.tana},{t:this.kotakKartu2},{t:this.laut},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Slots, new cjs.Rectangle(25.8,138,902.2,337.5), null);


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


(lib.g2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.lingker();
	this.instance.setTransform(37.65,54.15);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib._10();
	this.instance_1.setTransform(-189.5,-170.5,0.9475,1.2868);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g2, new cjs.Rectangle(-189.5,-170.5,379,341), null);


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


(lib.pp11 = function(mode,startPosition,loop) {
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
	this.instance = new lib._10_tripo();
	this.instance.setTransform(59,-231,0.5353,0.6483);

	this.instance_1 = new lib.Bitmap73();
	this.instance_1.setTransform(-353,-231,1.8762,1.9266);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF83").s().p("AgJBhQgdAAgUgRQgTgRAAgbIAgAAQAAAQAKAJQAKAKARAAQARAAAMgHQANgIABgNQADgTgYgIIgggKQgpgNABghQACgZAVgQQAWgQAbABQAdAAASAQQARARAAAaIgfgBQAAgOgJgJQgKgIgPgBQgPAAgMAIQgLAIgBANQgDAQAWAHIAPAFQAgAIAOAMQANAOgBAUQgBARgKANQgKANgSAHQgQAGgRAAIgDAAg");
	this.shape.setTransform(176.7751,158.7759);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF83").s().p("AgXBhQgYAAgQgPQgPgQABgXQACgeAYgPQAYgRAnAAIAhAAIACgPQACgRgIgJQgJgKgQgBQgQAAgMAIQgMAJgDANIgfAAQABgQALgNQAMgNARgHQARgHATABQAdAAAQARQARARgDAdIgPBcIgBANQAAAJACAKIAAADIggAAIgBgKIAAgKQgZAXgcAAIgBAAgAgbAMQgQAJgCARQgCAOAIAIQAIAJAPAAQAPABAMgIQAOgHAJgOIAHgmIgYAAQgcAAgQAJg");
	this.shape_1.setTransform(158.0384,158.7738);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF83").s().p("AhbCEIAtkDIAdAAIgEAVQAWgZAhABQAbAAAPAUQAPATABAiQAAALgBAKIgBAEQgDAcgMAWQgMAXgSAMQgRALgWgBQgfAAgSgWIgQBbgAgXhNIgQBZQALAZAbAAQAXABAQgTQAQgTAGgkIAAgOQAAgZgJgOQgKgNgSgBIgBgBQgaAAgTAbg");
	this.shape_2.setTransform(138.1833,162.1995);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF83").s().p("AglCAIAhi6IAeAAIgfC6gAAGheQgFgFAAgJQAAgIAFgFQAFgFAIgBQAIAAAGAFQAFAFAAAIQAAAJgFAFQgFAFgJAAIgBAAQgHAAgFgEg");
	this.shape_3.setTransform(125.725,155.3479);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF83").s().p("AgbCEQgTAAgRgJQgSgIgKgPIASgUQARAZAcABQAXABAOgNQAQgOAEgYIAEgQQgXAWgeAAQgRgBgNgJQgNgJgHgQQgHgRgBgUQgBgKACgPQAEgfANgWQAMgXASgLQARgKAVAAQAgABARAYIAGgVIAdAAIggC2QgEAkgZAWQgWAVghAAIgDgBgAgbhUQgQAWgEAkIAAAJQAAAYAJANQAJAOASABQAcAAAUgcIAOhVQgKgagbgBIgBAAQgYAAgQAVg");
	this.shape_4.setTransform(110.9,162.3011);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF83").s().p("AgXBhQgYAAgQgPQgPgQABgXQACgeAYgPQAYgRAnAAIAhAAIACgPQACgRgIgJQgJgKgQgBQgQAAgMAIQgMAJgDANIgfAAQABgQALgNQAMgNARgHQARgHATABQAdAAAQARQARARgDAdIgPBcIgBANQAAAJACAKIAAADIggAAIgBgKIAAgKQgZAXgcAAIgBAAgAgbAMQgQAJgCARQgCAOAIAIQAIAJAPAAQAPABAMgIQAOgHAJgOIAHgmIgYAAQgcAAgQAJg");
	this.shape_5.setTransform(82.7884,158.7738);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFF83").s().p("Ag7BgIAgi7IAeAAIgEAWQATgaAbAAQAGAAAJADIgDAeIgPgCQgfAAgPAbIgYCFg");
	this.shape_6.setTransform(68.65,158.5745);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFF83").s().p("AghCHQgagBgQgUQgPgTgBghQgBgLACgOQADgcAMgXQANgXASgLQASgLAVAAQAfABARAWIAShiIAfAAIguEJIgdAAIAEgUQgVAYggAAIgBAAgAgfgVQgOAMgIAUQgHAVAAAXQgBAZAKANQAJAOASABQAaABAVgdIAPhVQgKgagcgBIAAAAQgSAAgNALg");
	this.shape_7.setTransform(53.0688,155.0255);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFF83").s().p("AAeBgIAUh6QABgJgBgHQgDgZgZAAQgbgBgWAfIgXCFIgfAAIAgi7IAeAAIgFAYQAZgcAgABQAaAAANASQANASgEAgIgUB6g");
	this.shape_8.setTransform(32.0633,158.5996);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFF83").s().p("AgGBhQgjAAgUgaQgTgZADgnIABgHQADgbANgXQAOgXATgMQAUgMAWABQAdAAAQATQARATABAfQABAMgCALIgBANIh6AAQgDAaAMARQALASAXABQAbABAXgaIASAPQgMARgSAKQgSAJgUAAIgDAAgAgUg5QgOAOgJAbIBaAAIABgDQADgWgKgOQgKgPgSAAIgBAAQgSAAgOANg");
	this.shape_9.setTransform(14.1613,158.7753);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFF83").s().p("AhbCEIAtkDIAdAAIgEAVQAWgZAhABQAbAAAPAUQAPATABAiQAAALgBAKIgBAEQgDAcgMAWQgMAXgSAMQgRALgWgBQgfAAgSgWIgQBbgAgXhNIgQBZQALAZAbAAQAXABAQgTQAQgTAGgkIAAgOQAAgZgJgOQgKgNgSgBIgBgBQgaAAgTAbg");
	this.shape_10.setTransform(-6.1667,162.1995);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFF83").s().p("AgLBhQgYAAgRgNQgRgMgHgWQgIgVACgaQADgcANgXQANgXAVgNQAUgNAYABQAYAAARANQAQAMAJAWQAIAWgDAaIAAADQgEAbgNAWQgNAWgUANQgUALgWAAIgCAAgAgdgzQgRAUgEAfIAAADQgCALACAMQABAUALANQAKAMASAAQAOABANgIQAOgJAJgQQAJgRACgUQACgPgBgLQgCgVgLgMQgKgMgSgBIgBAAQgXAAgQATg");
	this.shape_11.setTransform(-24.7152,158.775);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFF83").s().p("AgmCFIAukJIAfAAIgtEJg");
	this.shape_12.setTransform(-38.275,154.85);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFF83").s().p("AgLBhQgYAAgRgNQgRgMgHgWQgIgVACgaQADgcANgXQANgXAVgNQAUgNAYABQAYAAARANQAQAMAJAWQAIAWgDAaIAAADQgEAbgNAWQgNAWgUANQgUALgWAAIgCAAgAgdgzQgRAUgEAfIAAADQgCALACAMQABAUALANQAKAMASAAQAOABANgIQAOgJAJgQQAJgRACgUQACgPgBgLQgCgVgLgMQgKgMgSgBIgBAAQgXAAgQATg");
	this.shape_13.setTransform(-52.9652,158.775);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFF83").s().p("AgJBhQgXAAgRgMQgQgMgHgVQgIgVACgbIABgIQADgbANgVQAMgVAVgMQAUgMAXABQAdAAASAUQASATAAAdIgeAAQAAgTgKgLQgKgLgQgBQgYgBgQATQgQATgEAhIgBAEQgBALABAMQABAUAKAMQAKAMASAAQAQABAOgKQANgLAEgQIAeAAQgDARgLAPQgMAOgRAJQgRAHgQAAIgCAAg");
	this.shape_14.setTransform(-71.6048,158.7755);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFF83").s().p("AgPCCQgYAAgTgKQgUgKgKgSQgKgRABgWIAgAAQgBAXAOANQANANAZABQAZAAAQgLQAQgMADgTQAEgbghgNIgdgLIgKgFQgzgWAEgpQABgVANgQQANgRAVgIQAUgJAXAAQAXABASAKQASAJAJASQAJARgBAWIggAAQABgXgMgNQgMgNgWAAQgXgBgQAMQgQALgCAUQgEAaAjANIAZAJIANAGQAxAWgEAsQgCAVgMAQQgNAPgVAJQgUAIgWAAIgDAAg");
	this.shape_15.setTransform(-90.9245,155.5251);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance_1},{t:this.instance}]},12).to({state:[]},1).wait(12));

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


(lib.pp10 = function(mode,startPosition,loop) {
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
	this.instance = new lib.Bitmap72();
	this.instance.setTransform(-353,-231,1.4195,1.9266);

	this.instance_1 = new lib._9_tripo();
	this.instance_1.setTransform(59,-231,0.4605,0.6583);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF83").s().p("AgXBhQgYAAgQgPQgPgQABgXQACgeAYgPQAYgRAnAAIAhAAIACgPQACgRgIgJQgJgKgQgBQgQAAgMAIQgMAJgDANIgfAAQABgQALgNQAMgNARgHQARgHATABQAdAAAQARQARARgDAdIgPBcIgBANQAAAJACAKIAAADIggAAIgBgKIAAgKQgZAXgcAAIgBAAgAgbAMQgQAJgCARQgCAOAIAIQAIAJAPAAQAPABAMgIQAOgHAJgOIAHgmIgYAAQgcAAgQAJg");
	this.shape.setTransform(103.6384,158.7738);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF83").s().p("AgmCFIAukJIAfAAIgtEJg");
	this.shape_1.setTransform(90.925,154.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF83").s().p("AgmCFIAukJIAfAAIgtEJg");
	this.shape_2.setTransform(82.425,154.85);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF83").s().p("AglCAIAhi6IAeAAIgfC6gAAGheQgFgFAAgJQAAgIAFgFQAFgFAIgBQAIAAAGAFQAFAFAAAIQAAAJgFAFQgFAFgJAAIgBAAQgHAAgFgEg");
	this.shape_3.setTransform(73.775,155.3479);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF83").s().p("AgbCEQgTAAgRgJQgSgIgKgPIASgUQARAZAcABQAWABAPgNQAPgOAGgYIADgQQgXAWgeAAQgRgBgNgJQgNgJgHgQQgHgRgBgUQgBgKACgPQAEgfANgWQAMgXASgLQASgKATAAQAiABAQAYIAGgVIAdAAIggC2QgEAkgZAWQgWAVghAAIgDgBgAgbhUQgRAWgDAkIAAAJQAAAYAJANQAJAOASABQAcAAAUgcIAOhVQgKgagbgBIgBAAQgYAAgQAVg");
	this.shape_4.setTransform(58.95,162.3011);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF83").s().p("AAeBgIAUh6QABgJgBgHQgDgZgZAAQgbgBgWAfIgXCFIgfAAIAgi7IAeAAIgFAYQAZgcAgABQAaAAANASQANASgEAgIgUB6g");
	this.shape_5.setTransform(39.3133,158.5996);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFF83").s().p("AgLBhQgYAAgRgNQgRgMgHgWQgIgVACgaQADgcANgXQANgXAVgNQAUgNAYABQAYAAARANQAQAMAJAWQAIAWgDAaIAAADQgEAbgNAWQgNAWgUANQgUALgWAAIgCAAgAgdgzQgRAUgEAfIAAADQgCALACAMQABAUALANQAKAMASAAQAOABANgIQAOgJAJgQQAJgRACgUQACgPgBgLQgCgVgLgMQgKgMgSgBIgBAAQgXAAgQATg");
	this.shape_6.setTransform(20.4848,158.775);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFF83").s().p("AhbCEIAtkDIAdAAIgEAVQAWgZAhABQAbAAAPAUQAPATABAiQAAALgBAKIgBAEQgDAcgMAWQgMAXgSAMQgRALgWgBQgfAAgSgWIgQBbgAgXhNIgQBZQALAZAbAAQAXABAQgTQAQgTAGgkIAAgOQAAgZgJgOQgKgNgSgBIgBgBQgaAAgTAbg");
	this.shape_7.setTransform(-0.2667,162.1995);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFF83").s().p("AgPCCQgYAAgTgKQgUgKgKgSQgKgRABgWIAgAAQgBAXAOANQANANAZABQAZAAAQgLQAQgMADgTQAEgbghgNIgdgLIgKgFQgzgWAEgpQABgVANgQQANgRAVgIQAUgJAXAAQAXABASAKQASAJAJASQAJARgBAWIggAAQABgXgMgNQgMgNgWAAQgXgBgQAMQgQALgCAUQgEAaAjANIAZAJIANAGQAxAWgEAsQgCAVgMAQQgNAPgVAJQgUAIgWAAIgDAAg");
	this.shape_8.setTransform(-18.7245,155.5251);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance_1},{t:this.instance}]},12).to({state:[]},1).wait(12));

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


(lib.pp9 = function(mode,startPosition,loop) {
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

	// Layer_6
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(255,0,0,0.937)").ss(5,1,1).p("AFzAAQAADBhtCIQhsCKiaAAQiYAAhuiKQhsiIAAjBQAAjABsiJQBuiJCYAAQCaAABsCJQBtCJAADAg");
	this.shape.setTransform(365.9,39.6);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_4
	this.instance = new lib._32();
	this.instance.setTransform(-353,-231,0.5264,0.6973);

	this.instance_1 = new lib._20();
	this.instance_1.setTransform(59,-231,0.5264,0.5879);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF83").s().p("AgNAPQgGgGABgIQgBgIAGgFQAGgGAHAAQAIAAAGAFQAFAFAAAIQAAAIgGAGQgFAFgIAAIgBAAQgHAAgFgEg");
	this.shape_1.setTransform(133.5,166.4273);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF83").s().p("AhbCEIAtkDIAdAAIgEAVQAWgZAhABQAbAAAPAUQAPATABAiQAAALgBAKIgBAEQgDAcgMAWQgMAXgSAMQgRALgWgBQgfAAgSgWIgQBbgAgXhNIgQBZQALAZAbAAQAXABAQgTQAQgTAGgkIAAgOQAAgZgJgOQgKgNgSgBIgBgBQgaAAgTAbg");
	this.shape_2.setTransform(119.5833,162.1995);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF83").s().p("AgJBhQgdAAgUgRQgTgRAAgbIAgAAQAAAQAKAJQAKAKARAAQARAAAMgHQANgIABgNQADgTgYgIIgggKQgpgNABghQACgZAVgQQAWgQAbABQAdAAASAQQARARAAAaIgfgBQAAgOgJgJQgKgIgPgBQgPAAgMAIQgLAIgBANQgDAQAWAHIAPAFQAgAIAOAMQANAOgBAUQgBARgKANQgKANgSAHQgQAGgRAAIgDAAg");
	this.shape_3.setTransform(101.8751,158.7759);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF83").s().p("AAdBeIgdhGIg1BGIgnAAIBNhgIgshbIAjAAIAbBFIA0hFIAmAAIhLBeIAuBdg");
	this.shape_4.setTransform(75.45,158.775);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF83").s().p("AglCAIAhi6IAeAAIgfC6gAAGheQgFgFAAgJQAAgIAFgFQAFgFAIgBQAIAAAGAFQAFAFAAAIQAAAJgFAFQgFAFgJAAIgBAAQgHAAgFgEg");
	this.shape_5.setTransform(63.275,155.3479);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFF83").s().p("Ag7BgIAhi7IAdAAIgEAWQATgaAbAAQAGAAAJADIgEAeIgOgCQgfAAgQAbIgXCFg");
	this.shape_6.setTransform(53.4,158.5745);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFF83").s().p("AgdBoQgJgNACgXIAThzIgiAAIAFgZIAhAAIAIgtIAeAAIgIAtIAjAAIgFAZIgiAAIgTB0IAAAIQABANANAAIAPgBIgCAaQgLADgLAAQgSAAgKgOg");
	this.shape_7.setTransform(41.7,156.675);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFF83").s().p("AgLBhQgYAAgRgNQgRgMgHgWQgIgVACgaQADgcANgXQANgXAVgNQAUgNAYABQAYAAARANQAQAMAJAWQAIAWgDAaIAAADQgEAbgNAWQgNAWgUANQgUALgWAAIgCAAgAgdgzQgRAUgEAfIAAADQgCALACAMQABAUALANQAKAMASAAQAOABANgIQAOgJAJgQQAJgRACgUQACgPgBgLQgCgVgLgMQgKgMgSgBIgBAAQgXAAgQATg");
	this.shape_8.setTransform(25.3348,158.775);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFF83").s().p("AglCAIAhi6IAeAAIgfC6gAAGheQgFgFAAgJQAAgIAFgFQAFgFAIgBQAIAAAGAFQAFAFAAAIQAAAJgFAFQgFAFgJAAIgBAAQgHAAgFgEg");
	this.shape_9.setTransform(11.675,155.3479);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFF83").s().p("AAeCFIAUh8QABgIgBgGQgDgZgZAAQgcgBgVAfIgXCFIgfAAIAukJIAfAAIgTBmQAYgbAgAAQAaAAANATQANARgEAfIgUB7g");
	this.shape_10.setTransform(-3.2867,154.85);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFF83").s().p("AhbCEIAtkDIAdAAIgEAVQAWgZAhABQAbAAAPAUQAPATABAiQAAALgBAKIgBAEQgDAcgMAWQgMAXgSAMQgRALgWgBQgfAAgSgWIgQBbgAgXhNIgQBZQALAZAbAAQAXABAQgTQAQgTAGgkIAAgOQAAgZgJgOQgKgNgSgBIgBgBQgaAAgTAbg");
	this.shape_11.setTransform(-23.1167,162.1995);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFF83").s().p("AgSCCQgZgBgRgLQgSgLgKgVQgLgWgBgbQgBgVAGgeQAGgfAOgYQAOgZAUgPQAbgUAiAAQAlABAVAZQAWAZABAqQABATgEAbQgFAcgLAYQgMAYgRAQQgeAcgnAAIgCAAgAgWhYQgSAOgMAaQgMAagDAnIAAALQgBAiANAUQANATAZABQAgABAWgZQAVgZAHgsQAEgVAAgQQABgigNgTQgNgSgagBIgCAAQgVAAgRAMg");
	this.shape_12.setTransform(-43.2544,155.5261);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.instance_1},{t:this.instance}]},12).to({state:[]},1).wait(12));

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


(lib.pp7 = function(mode,startPosition,loop) {
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

	// Layer_6
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(255,0,0,0.937)").ss(5,1,1).p("AFkAAQAACUhoBnQhoBpiUAAQiTAAhnhpQhphnAAiUQAAiTBphoQBnhoCTAAQCUAABoBoQBoBoAACTg");
	this.shape.setTransform(94.55,68.65);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_4
	this.instance = new lib._28();
	this.instance.setTransform(-353,-231,1.4633,1.7577);

	this.instance_1 = new lib._34();
	this.instance_1.setTransform(59,-231,0.8614,1.1291);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF83").s().p("AgJBhQgdAAgUgRQgTgRAAgbIAgAAQAAAQAKAJQAKAKARAAQARAAAMgHQANgIABgNQADgTgYgIIgggKQgpgNABghQACgZAVgQQAWgQAbABQAdAAASAQQARARAAAaIgfgBQAAgOgJgJQgKgIgPgBQgPAAgMAIQgLAIgBANQgDAQAWAHIAPAFQAgAIAOAMQANAOgBAUQgBARgKANQgKANgSAHQgQAGgRAAIgDAAg");
	this.shape_1.setTransform(186.7251,158.7759);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF83").s().p("AgfBfQgbAAgMgTQgNgTADggIAUh4IAfAAIgUB5IAAAPQABAMAGAHQAHAHALABQAhABASgcIAYiIIAfAAIggC7IgeAAIAEgTQgVAXggAAIgCgBg");
	this.shape_2.setTransform(168.9469,158.9505);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF83").s().p("AgdBoQgJgNACgXIAThzIgiAAIAFgZIAhAAIAIgtIAeAAIgIAtIAjAAIgFAZIgiAAIgTB0IAAAIQABANANAAIAPgBIgCAaQgLADgLAAQgSAAgKgOg");
	this.shape_3.setTransform(153.75,156.675);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF83").s().p("AgXBhQgYAAgQgPQgPgQABgXQACgeAYgPQAYgRAnAAIAhAAIACgPQACgRgIgJQgJgKgQgBQgQAAgMAIQgMAJgDANIgfAAQABgQALgNQAMgNARgHQARgHATABQAdAAAQARQARARgDAdIgPBcIgBANQAAAJACAKIAAADIggAAIgBgKIAAgKQgZAXgcAAIgBAAgAgbAMQgQAJgCARQgCAOAIAIQAIAJAPAAQAPABAMgIQAOgHAJgOIAHgmIgYAAQgcAAgQAJg");
	this.shape_4.setTransform(137.3384,158.7738);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF83").s().p("AAeBgIAUh6QABgJgBgHQgDgZgZAAQgbgBgWAfIgXCFIgfAAIAgi7IAeAAIgFAYQAZgcAgABQAaAAANASQANASgEAgIgUB6g");
	this.shape_5.setTransform(118.1133,158.5996);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFF83").s().p("AAeBgIAUh6QABgJgBgHQgDgZgZAAQgbgBgWAfIgXCFIgfAAIAgi7IAeAAIgFAYQAZgcAgABQAaAAANASQANASgEAgIgUB6g");
	this.shape_6.setTransform(98.9133,158.5996);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFF83").s().p("AglCAIAhi6IAeAAIgfC6gAAGheQgFgFAAgJQAAgIAFgFQAFgFAIgBQAIAAAGAFQAFAFAAAIQAAAJgFAFQgFAFgJAAIgBAAQgHAAgFgEg");
	this.shape_7.setTransform(86.225,155.3479);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFF83").s().p("AhbCEIAtkDIAdAAIgEAVQAWgZAhABQAbAAAPAUQAPATABAiQAAALgBAKIgBAEQgDAcgMAWQgMAXgSAMQgRALgWgBQgfAAgSgWIgQBbgAgXhNIgQBZQALAZAbAAQAXABAQgTQAQgTAGgkIAAgOQAAgZgJgOQgKgNgSgBIgBgBQgaAAgTAbg");
	this.shape_8.setTransform(70.5833,162.1995);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFF83").s().p("AgJBhQgdAAgUgRQgTgRAAgbIAgAAQAAAQAKAJQAKAKARAAQARAAAMgHQANgIABgNQADgTgYgIIgggKQgpgNABghQACgZAVgQQAWgQAbABQAdAAASAQQARARAAAaIgfgBQAAgOgJgJQgKgIgPgBQgPAAgMAIQgLAIgBANQgDAQAWAHIAPAFQAgAIAOAMQANAOgBAUQgBARgKANQgKANgSAHQgQAGgRAAIgDAAg");
	this.shape_9.setTransform(44.1251,158.7759);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFF83").s().p("AgfBfQgbAAgMgTQgNgTADggIAUh4IAfAAIgUB5IAAAPQABAMAGAHQAHAHALABQAhABASgcIAYiIIAfAAIggC7IgeAAIAEgTQgVAXggAAIgCgBg");
	this.shape_10.setTransform(26.3969,158.9505);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFF83").s().p("AAeBgIAUh6QABgJgBgHQgDgZgZAAQgbgBgWAfIgXCFIgfAAIAgi7IAeAAIgFAYQAZgcAgABQAaAAANASQANASgEAgIgUB6g");
	this.shape_11.setTransform(5.9133,158.5996);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFF83").s().p("AglCAIAhi6IAeAAIgfC6gAAGheQgFgFAAgJQAAgIAFgFQAFgFAIgBQAIAAAGAFQAFAFAAAIQAAAJgFAFQgFAFgJAAIgBAAQgHAAgFgEg");
	this.shape_12.setTransform(-6.775,155.3479);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFF83").s().p("Ag7BgIAgi7IAeAAIgEAWQATgaAbAAQAGAAAJADIgDAeIgPgCQgfAAgPAbIgYCFg");
	this.shape_13.setTransform(-16.65,158.5745);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFF83").s().p("AgJBhQgXAAgRgMQgQgMgHgVQgIgVACgbIABgIQADgbANgVQAMgVAVgMQAUgMAXABQAdAAASAUQASATAAAdIgeAAQAAgTgKgLQgKgLgQgBQgYgBgQATQgQATgEAhIgBAEQgBALABAMQABAUAKAMQAKAMASAAQAQABAOgKQANgLAEgQIAeAAQgDARgLAPQgMAOgRAJQgRAHgQAAIgCAAg");
	this.shape_14.setTransform(-32.0548,158.7755);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFF83").s().p("AgLBhQgYAAgRgNQgRgMgHgWQgIgVACgaQADgcANgXQANgXAVgNQAUgNAYABQAYAAARANQAQAMAJAWQAIAWgDAaIAAADQgEAbgNAWQgNAWgUANQgUALgWAAIgCAAgAgdgzQgRAUgEAfIAAADQgCALACAMQABAUALANQAKAMASAAQAOABANgIQAOgJAJgQQAJgRACgUQACgPgBgLQgCgVgLgMQgKgMgSgBIgBAAQgXAAgQATg");
	this.shape_15.setTransform(-51.4652,158.775);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFF83").s().p("AgmCFIAukJIAfAAIgtEJg");
	this.shape_16.setTransform(-65.025,154.85);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFF83").s().p("AglCAIAhi6IAeAAIgfC6gAAGheQgFgFAAgJQAAgIAFgFQAFgFAIgBQAIAAAGAFQAFAFAAAIQAAAJgFAFQgFAFgJAAIgBAAQgHAAgFgEg");
	this.shape_17.setTransform(-73.625,155.3479);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFF83").s().p("AgdBoQgJgNACgXIAThzIgiAAIAFgZIAhAAIAIgtIAeAAIgIAtIAjAAIgFAZIgiAAIgTB0IAAAIQABANANAAIAPgBIgCAaQgLADgLAAQgSAAgKgOg");
	this.shape_18.setTransform(-83.4,156.675);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFF83").s().p("AhmB+IAsj7IBTAAQAnAAAVAVQAVAUgDAjQgDAkgZAUQgaAVgqAAIg7gBIgRBjgAgwAAIA4AAQAaAAARgMQARgNADgYQADgVgMgOQgLgNgXgBIg6AAg");
	this.shape_19.setTransform(-100.2562,155.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.instance_1},{t:this.instance}]},12).to({state:[]},1).wait(12));

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
	this.shape.graphics.f().s("rgba(255,0,0,0.937)").ss(5,1,1).p("ADdErQk3DnkeBLQkdBMhch7Qhbh7Ccj7QCcj6E5jnQE3jnEdhMQEehMBbB7QBbB8icD6QicD7k4Dng");
	this.shape.setTransform(177.4866,-72.7132);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_5
	this.instance = new lib._25();
	this.instance.setTransform(59,-231,0.5199,0.5683);

	this.instance_1 = new lib._16();
	this.instance_1.setTransform(-353,-231,1.1844,1.1678);

	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance_1},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF83").s().p("AglCAIAhi6IAeAAIgfC6gAAGheQgFgFAAgJQAAgIAFgFQAFgFAIgBQAIAAAGAFQAFAFAAAIQAAAJgFAFQgFAFgJAAIgBAAQgHAAgFgEg");
	this.shape_1.setTransform(160.525,155.3479);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF83").s().p("AgJBhQgdAAgUgRQgTgRAAgbIAgAAQAAAQAKAJQAKAKARAAQARAAAMgHQANgIABgNQADgTgYgIIgggKQgpgNABghQACgZAVgQQAWgQAbABQAdAAASAQQARARAAAaIgfgBQAAgOgJgJQgKgIgPgBQgPAAgMAIQgLAIgBANQgDAQAWAHIAPAFQAgAIAOAMQANAOgBAUQgBARgKANQgKANgSAHQgQAGgRAAIgDAAg");
	this.shape_2.setTransform(146.7251,158.7759);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF83").s().p("AgGBhQgjAAgUgaQgTgZADgnIABgHQADgbANgXQAOgXATgMQAUgMAWABQAdAAAQATQARATABAfQABAMgCALIgBANIh6AAQgDAaAMARQALASAXABQAbABAXgaIASAPQgMARgSAKQgSAJgUAAIgDAAgAgUg5QgOAOgJAbIBaAAIABgDQADgWgKgOQgKgPgSAAIgBAAQgSAAgOANg");
	this.shape_3.setTransform(128.9613,158.7753);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF83").s().p("AAACHQghgBgRgZIgGAWIgdAAIAukJIAgAAIgTBkQAWgZAgAAQAbABAPATQAPATABAhIgBAWIgBADQgDAdgMAXQgNAXgRALQgRALgUAAIgCAAgAgegCIgOBQQAKAdAdABQARAAAOgLQAOgMAHgVQAHgVABgXQAAgYgJgOQgJgNgTgBIgBAAQgbAAgUAeg");
	this.shape_4.setTransform(109.225,155.0261);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF83").s().p("Ag7BgIAhi7IAdAAIgEAWQATgaAbAAQAGAAAJADIgEAeIgOgCQgfAAgQAbIgXCFg");
	this.shape_5.setTransform(94.8,158.5745);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFF83").s().p("AgLBhQgYAAgRgNQgRgMgHgWQgIgVACgaQADgcANgXQANgXAVgNQAUgNAYABQAYAAARANQAQAMAJAWQAIAWgDAaIAAADQgEAbgNAWQgNAWgUANQgUALgWAAIgCAAgAgdgzQgRAUgEAfIAAADQgCALACAMQABAUALANQAKAMASAAQAOABANgIQAOgJAJgQQAJgRACgUQACgPgBgLQgCgVgLgMQgKgMgSgBIgBAAQgXAAgQATg");
	this.shape_6.setTransform(78.2348,158.775);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFF83").s().p("Ag+CHIAdiiIgdAAIAEgYIAcAAIAEgWQAFgdAQgQQASgQAcAAQAJAAAOADIgFAaIgQgCQgRAAgJAKQgLALgCAQIgDATIAnAAIgEAYIgnAAIgcCig");
	this.shape_7.setTransform(64.65,154.6493);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFF83").s().p("AgJBhQgdAAgUgRQgTgRAAgbIAgAAQAAAQAKAJQAKAKARAAQARAAAMgHQANgIABgNQADgTgYgIIgggKQgpgNABghQACgZAVgQQAWgQAbABQAdAAASAQQARARAAAaIgfgBQAAgOgJgJQgKgIgPgBQgPAAgMAIQgLAIgBANQgDAQAWAHIAPAFQAgAIAOAMQANAOgBAUQgBARgKANQgKANgSAHQgQAGgRAAIgDAAg");
	this.shape_8.setTransform(38.3251,158.7759);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFF83").s().p("AgXBhQgYAAgQgPQgPgQABgXQACgeAYgPQAYgRAnAAIAhAAIACgPQACgRgIgJQgJgKgQgBQgQAAgMAIQgMAJgDANIgfAAQABgQALgNQAMgNARgHQARgHATABQAdAAAQARQARARgDAdIgPBcIgBANQAAAJACAKIAAADIggAAIgBgKIAAgKQgZAXgcAAIgBAAgAgbAMQgQAJgCARQgCAOAIAIQAIAJAPAAQAPABAMgIQAOgHAJgOIAHgmIgYAAQgcAAgQAJg");
	this.shape_9.setTransform(19.5884,158.7738);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFF83").s().p("AglCAIAhi6IAeAAIgfC6gAAGheQgFgFAAgJQAAgIAFgFQAFgFAIgBQAIAAAGAFQAFAFAAAIQAAAJgFAFQgFAFgJAAIgBAAQgHAAgFgEg");
	this.shape_10.setTransform(6.825,155.3479);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFF83").s().p("Ag7BgIAhi7IAdAAIgEAWQATgaAbAAQAGAAAJADIgDAeIgPgCQgeAAgRAbIgXCFg");
	this.shape_11.setTransform(-3.05,158.5745);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFF83").s().p("AgGBhQgjAAgUgaQgTgZADgnIABgHQADgbANgXQAOgXATgMQAUgMAWABQAdAAAQATQARATABAfQABAMgCALIgBANIh6AAQgDAaAMARQALASAXABQAbABAXgaIASAPQgMARgSAKQgSAJgUAAIgDAAgAgUg5QgOAOgJAbIBaAAIABgDQADgWgKgOQgKgPgSAAIgBAAQgSAAgOANg");
	this.shape_12.setTransform(-18.7387,158.7753);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFF83").s().p("AgdBoQgKgNACgXIAUhzIghAAIAEgZIAhAAIAIgtIAeAAIgIAtIAiAAIgEAZIgiAAIgSB0IAAAIQAAANANAAIAPgBIgCAaQgLADgLAAQgTAAgJgOg");
	this.shape_13.setTransform(-33.2,156.675);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFF83").s().p("AgJBhQgdAAgUgRQgTgRAAgbIAgAAQAAAQAKAJQAKAKARAAQARAAAMgHQANgIABgNQADgTgYgIIgggKQgpgNABghQACgZAVgQQAWgQAbABQAdAAASAQQARARAAAaIgfgBQAAgOgJgJQgKgIgPgBQgPAAgMAIQgLAIgBANQgDAQAWAHIAPAFQAgAIAOAMQANAOgBAUQgBARgKANQgKANgSAHQgQAGgRAAIgDAAg");
	this.shape_14.setTransform(-48.7749,158.7759);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFF83").s().p("ABMB+IgMhCIhlAAIgjBCIgjAAICIj7IAdAAIAyD7gAgXAhIBSAAIgVh1g");
	this.shape_15.setTransform(-70.625,155.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]},12).to({state:[]},1).wait(12));

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

	// Layer_5
	this.instance = new lib.g4();
	this.instance.setTransform(248.5,-60.5);

	this.instance_1 = new lib._17();
	this.instance_1.setTransform(-353,-231,0.5414,0.7302);

	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance_1},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF83").s().p("ABWBgIAVh7QABgJgBgHQgEgYgbAAQgSgBgNALQgOALgEASIgWB8IgeAAIAVh7QACgTgIgKQgIgLgRAAQgegBgRAcIgYCIIgfAAIAhi7IAdAAIgEAVQAYgZAhABQASAAALAIQANAIAEAOQAbgfAkABQAcAAANATQANASgDAfIgVB6g");
	this.shape.setTransform(166.8371,158.5995);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF83").s().p("AgfBfQgbAAgMgTQgNgTADggIAUh4IAfAAIgUB5IAAAPQABAMAGAHQAHAHALABQAhABASgcIAYiIIAfAAIggC7IgeAAIAEgTQgVAXggAAIgCgBg");
	this.shape_1.setTransform(143.3969,158.9505);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF83").s().p("AgJBhQgdAAgUgRQgTgRAAgbIAgAAQAAAQAKAJQAKAKARAAQARAAAMgHQANgIABgNQADgTgYgIIgggKQgpgNABghQACgZAVgQQAWgQAbABQAdAAASAQQARARAAAaIgfgBQAAgOgJgJQgKgIgPgBQgPAAgMAIQgLAIgBANQgDAQAWAHIAPAFQAgAIAOAMQANAOgBAUQgBARgKANQgKANgSAHQgQAGgRAAIgDAAg");
	this.shape_2.setTransform(124.1251,158.7759);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF83").s().p("AgLBhQgYAAgRgNQgRgMgHgWQgIgVACgaQADgcANgXQANgXAVgNQAUgNAYABQAYAAARANQAQAMAJAWQAIAWgDAaIAAADQgEAbgNAWQgNAWgUANQgUALgWAAIgCAAgAgdgzQgRAUgEAfIAAADQgCALACAMQABAUALANQAKAMASAAQAOABANgIQAOgJAJgQQAJgRACgUQACgPgBgLQgCgVgLgMQgKgMgSgBIgBAAQgXAAgQATg");
	this.shape_3.setTransform(105.4848,158.775);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF83").s().p("AgdBoQgKgNACgXIAUhzIghAAIAEgZIAhAAIAIgtIAeAAIgIAtIAiAAIgEAZIgiAAIgSB0IAAAIQAAANANAAIAPgBIgCAaQgLADgLAAQgTAAgJgOg");
	this.shape_4.setTransform(90.55,156.675);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF83").s().p("AgGBhQgjAAgUgaQgTgZADgnIABgHQADgbANgXQAOgXATgMQAUgMAWABQAdAAAQATQARATABAfQABAMgCALIgBANIh6AAQgDAaAMARQALASAXABQAbABAXgaIASAPQgMARgSAKQgSAJgUAAIgDAAgAgUg5QgOAOgJAbIBaAAIABgDQADgWgKgOQgKgPgSAAIgBAAQgSAAgOANg");
	this.shape_5.setTransform(75.1113,158.7753);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFF83").s().p("AgJBhQgdAAgUgRQgTgRAAgbIAgAAQAAAQAKAJQAKAKARAAQARAAAMgHQANgIABgNQADgTgYgIIgggKQgpgNABghQACgZAVgQQAWgQAbABQAdAAASAQQARARAAAaIgfgBQAAgOgJgJQgKgIgPgBQgPAAgMAIQgLAIgBANQgDAQAWAHIAPAFQAgAIAOAMQANAOgBAUQgBARgKANQgKANgSAHQgQAGgRAAIgDAAg");
	this.shape_6.setTransform(56.5251,158.7759);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFF83").s().p("AgXBhQgYAAgQgPQgPgQABgXQACgeAYgPQAYgRAnAAIAhAAIACgPQACgRgIgJQgJgKgQgBQgQAAgMAIQgMAJgDANIgfAAQABgQALgNQAMgNARgHQARgHATABQAdAAAQARQARARgDAdIgPBcIgBANQAAAJACAKIAAADIggAAIgBgKIAAgKQgZAXgcAAIgBAAgAgbAMQgQAJgCARQgCAOAIAIQAIAJAPAAQAPABAMgIQAOgHAJgOIAHgmIgYAAQgcAAgQAJg");
	this.shape_7.setTransform(29.0884,158.7738);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFF83").s().p("ABWBgIAVh7QABgJgBgHQgEgYgbAAQgSgBgNALQgOALgEASIgWB8IgeAAIAVh7QACgTgIgKQgIgLgRAAQgegBgRAcIgYCIIgfAAIAhi7IAdAAIgEAVQAYgZAhABQASAAALAIQANAIAEAOQAbgfAkABQAcAAANATQANASgDAfIgVB6g");
	this.shape_8.setTransform(4.1371,158.5995);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFF83").s().p("AgGBhQgjAAgUgaQgTgZADgnIABgHQADgbANgXQAOgXATgMQAUgMAWABQAdAAAQATQARATABAfQABAMgCALIgBANIh6AAQgDAaAMARQALASAXABQAbABAXgaIASAPQgMARgSAKQgSAJgUAAIgDAAgAgUg5QgOAOgJAbIBaAAIABgDQADgWgKgOQgKgPgSAAIgBAAQgSAAgOANg");
	this.shape_9.setTransform(-19.3387,158.7753);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFF83").s().p("AghCHQgagBgQgUQgPgTgBghQgBgLACgOQADgcAMgXQANgXASgLQASgLAVAAQAfABARAWIAShiIAfAAIguEJIgdAAIAEgUQgVAYggAAIgBAAgAgfgVQgOAMgIAUQgHAVAAAXQgBAZAKANQAJAOASABQAaABAVgdIAPhVQgKgagcgBIAAAAQgSAAgNALg");
	this.shape_10.setTransform(-37.7312,155.0255);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFF83").s().p("AgXBhQgYAAgQgPQgPgQABgXQACgeAYgPQAYgRAnAAIAhAAIACgPQACgRgIgJQgJgKgQgBQgQAAgMAIQgMAJgDANIgfAAQABgQALgNQAMgNARgHQARgHATABQAdAAAQARQARARgDAdIgPBcIgBANQAAAJACAKIAAADIggAAIgBgKIAAgKQgZAXgcAAIgBAAgAgbAMQgQAJgCARQgCAOAIAIQAIAJAPAAQAPABAMgIQAOgHAJgOIAHgmIgYAAQgcAAgQAJg");
	this.shape_11.setTransform(-58.3616,158.7738);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFF83").s().p("AglCAIAhi6IAeAAIgfC6gAAGheQgFgFAAgJQAAgIAFgFQAFgFAIgBQAIAAAGAFQAFAFAAAIQAAAJgFAFQgFAFgJAAIgBAAQgHAAgFgEg");
	this.shape_12.setTransform(-71.175,155.3479);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFF83").s().p("AhkB+IAsj7IBBAAQAfAAAWAPQAWAQAKAbQAKAbgEAiIgCALQgIA4gjAgQgjAhg0AAgAg+BjIAgAAQAkAAAZgXQAagXAHgoQAGgegCgXQgCgbgPgPQgQgPgZgBIgmAAg");
	this.shape_13.setTransform(-87.3679,155.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).to({state:[]},1).wait(12));

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
	this.instance = new lib._6();
	this.instance.setTransform(-353,-231,0.3701,0.4993);

	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_7
	this.instance_1 = new lib.lingker();
	this.instance_1.setTransform(368.85,-30.6,0.8264,1.7424,-20.7437,0,0,0.4,0);

	this.instance_2 = new lib._13();
	this.instance_2.setTransform(59,-231,0.638,1.1481);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2},{t:this.instance_1}]},12).to({state:[]},1).wait(12));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF83").s().p("AgJBhQgdAAgUgRQgTgRAAgbIAgAAQAAAQAKAJQAKAKARAAQARAAAMgHQANgIABgNQADgTgYgIIgggKQgpgNABghQACgZAVgQQAWgQAbABQAdAAASAQQARARAAAaIgfgBQAAgOgJgJQgKgIgPgBQgPAAgMAIQgLAIgBANQgDAQAWAHIAPAFQAgAIAOAMQANAOgBAUQgBARgKANQgKANgSAHQgQAGgRAAIgDAAg");
	this.shape.setTransform(177.5751,158.7759);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF83").s().p("AglCAIAhi6IAeAAIgfC6gAAGheQgFgFAAgJQAAgIAFgFQAFgFAIgBQAIAAAGAFQAFAFAAAIQAAAJgFAFQgFAFgJAAIgBAAQgHAAgFgEg");
	this.shape_1.setTransform(165.025,155.3479);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF83").s().p("AgmCFIAukJIAfAAIgtEJg");
	this.shape_2.setTransform(156.625,154.85);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF83").s().p("AgXBhQgYAAgQgPQgPgQABgXQACgeAYgPQAYgRAnAAIAhAAIACgPQACgRgIgJQgJgKgQgBQgQAAgMAIQgMAJgDANIgfAAQABgQALgNQAMgNARgHQARgHATABQAdAAAQARQARARgDAdIgPBcIgBANQAAAJACAKIAAADIggAAIgBgKIAAgKQgZAXgcAAIgBAAgAgbAMQgQAJgCARQgCAOAIAIQAIAJAPAAQAPABAMgIQAOgHAJgOIAHgmIgYAAQgcAAgQAJg");
	this.shape_3.setTransform(141.8384,158.7738);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF83").s().p("AAeBgIAUh6QABgJgBgHQgDgZgZAAQgbgBgWAfIgXCFIgfAAIAgi7IAeAAIgFAYQAZgcAgABQAaAAANASQANASgEAgIgUB6g");
	this.shape_4.setTransform(122.6133,158.5996);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF83").s().p("AglCAIAhi6IAeAAIgfC6gAAGheQgFgFAAgJQAAgIAFgFQAFgFAIgBQAIAAAGAFQAFAFAAAIQAAAJgFAFQgFAFgJAAIgBAAQgHAAgFgEg");
	this.shape_5.setTransform(109.875,155.3479);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFF83").s().p("AgJBhQgXAAgRgMQgQgMgHgVQgIgVACgbIABgIQADgbANgVQAMgVAVgMQAUgMAXABQAdAAASAUQASATAAAdIgeAAQAAgTgKgLQgKgLgQgBQgYgBgQATQgQATgEAhIgBAEQgBALABAMQABAUAKAMQAKAMASAAQAQABAOgKQANgLAEgQIAeAAQgDARgLAPQgMAOgRAJQgRAHgQAAIgCAAg");
	this.shape_6.setTransform(96.4452,158.7755);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFF83").s().p("AglCAIAhi6IAeAAIgfC6gAAGheQgFgFAAgJQAAgIAFgFQAFgFAIgBQAIAAAGAFQAFAFAAAIQAAAJgFAFQgFAFgJAAIgBAAQgHAAgFgEg");
	this.shape_7.setTransform(83.125,155.3479);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFF83").s().p("AghCHQgagBgQgUQgPgTgBghQgBgLACgOQADgcAMgXQANgXASgLQASgLAVAAQAfABARAWIAShiIAfAAIguEJIgdAAIAEgUQgVAYggAAIgBAAgAgfgVQgOAMgIAUQgHAVAAAXQgBAZAKANQAJAOASABQAaABAVgdIAPhVQgKgagcgBIAAAAQgSAAgNALg");
	this.shape_8.setTransform(69.5188,155.0255);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFF83").s().p("AgGBhQgjAAgUgaQgTgZADgnIABgHQADgbANgXQAOgXATgMQAUgMAWABQAdAAAQATQARATABAfQABAMgCALIgBANIh6AAQgDAaAMARQALASAXABQAbABAXgaIASAPQgMARgSAKQgSAJgUAAIgDAAgAgUg5QgOAOgJAbIBaAAIABgDQADgWgKgOQgKgPgSAAIgBAAQgSAAgOANg");
	this.shape_9.setTransform(49.7612,158.7753);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFF83").s().p("ABWBgIAVh7QABgJgBgHQgEgYgbAAQgSgBgNALQgOALgEASIgWB8IgeAAIAVh7QACgTgIgKQgIgLgRAAQgegBgRAcIgYCIIgfAAIAhi7IAdAAIgEAVQAYgZAhABQASAAALAIQANAIAEAOQAbgfAkABQAcAAANATQANASgDAfIgVB6g");
	this.shape_10.setTransform(24.3871,158.5995);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFF83").s().p("AgLBhQgYAAgRgNQgRgMgHgWQgIgVACgaQADgcANgXQANgXAVgNQAUgNAYABQAYAAARANQAQAMAJAWQAIAWgDAaIAAADQgEAbgNAWQgNAWgUANQgUALgWAAIgCAAgAgdgzQgRAUgEAfIAAADQgCALACAMQABAUALANQAKAMASAAQAOABANgIQAOgJAJgQQAJgRACgUQACgPgBgLQgCgVgLgMQgKgMgSgBIgBAAQgXAAgQATg");
	this.shape_11.setTransform(-8.7152,158.775);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFF83").s().p("AghCHQgagBgQgUQgPgTgBghQgBgLACgOQADgcAMgXQANgXASgLQASgLAVAAQAfABARAWIAShiIAfAAIguEJIgdAAIAEgUQgVAYggAAIgBAAgAgfgVQgOAMgIAUQgHAVAAAXQgBAZAKANQAJAOASABQAaABAVgdIAPhVQgKgagcgBIAAAAQgSAAgNALg");
	this.shape_12.setTransform(-27.5312,155.0255);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFF83").s().p("AgfBfQgbAAgMgTQgNgTADggIAUh4IAfAAIgUB5IAAAPQABAMAGAHQAHAHALABQAhABASgcIAYiIIAfAAIggC7IgeAAIAEgTQgVAXggAAIgCgBg");
	this.shape_13.setTransform(-47.2031,158.9505);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFF83").s().p("Ag7BgIAgi7IAeAAIgEAWQATgaAbAAQAGAAAJADIgDAeIgPgCQgfAAgPAbIgYCFg");
	this.shape_14.setTransform(-62.55,158.5745);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFF83").s().p("AglCAIAhi6IAeAAIgfC6gAAGheQgFgFAAgJQAAgIAFgFQAFgFAIgBQAIAAAGAFQAFAFAAAIQAAAJgFAFQgFAFgJAAIgBAAQgHAAgFgEg");
	this.shape_15.setTransform(-73.025,155.3479);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFF83").s().p("AAoB+IAUh0Ih6AAIgUB0IghAAIAsj7IAgAAIgSBsIB6AAIAShsIAhAAIgsD7g");
	this.shape_16.setTransform(-89.725,155.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).to({state:[]},1).wait(12));

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
	this.exit._off = true;

	this.timeline.addTween(cjs.Tween.get(this.exit).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_7
	this.instance = new lib.g2();
	this.instance.setTransform(248.5,-60.5);

	this.instance_1 = new lib._7jpegcopy();
	this.instance_1.setTransform(-353,-231,1.2633,1.6965);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF83").s().p("AgJBhQgdAAgUgRQgTgRAAgbIAgAAQAAAQAKAJQAKAKARAAQARAAAMgHQANgIABgNQADgTgYgIIgggKQgpgNABghQACgZAVgQQAWgQAbABQAdAAASAQQARARAAAaIgfgBQAAgOgJgJQgKgIgPgBQgPAAgMAIQgLAIgBANQgDAQAWAHIAPAFQAgAIAOAMQANAOgBAUQgBARgKANQgKANgSAHQgQAGgRAAIgDAAg");
	this.shape.setTransform(180.5751,158.7759);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF83").s().p("AgfBfQgbAAgMgTQgNgTADggIAUh4IAfAAIgUB5IAAAPQABAMAGAHQAHAHALABQAhABASgcIAYiIIAfAAIggC7IgeAAIAEgTQgVAXghAAIgBgBg");
	this.shape_1.setTransform(162.7969,158.9505);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF83").s().p("AgmCFIAukJIAfAAIgtEJg");
	this.shape_2.setTransform(148.925,154.85);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF83").s().p("AgmCFIAukJIAfAAIgtEJg");
	this.shape_3.setTransform(140.375,154.85);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF83").s().p("AgGBhQgjAAgUgaQgTgZADgnIABgHQADgbANgXQAOgXATgMQAUgMAWABQAdAAAQATQARATABAfQABAMgCALIgBANIh6AAQgDAaAMARQALASAXABQAbABAXgaIASAPQgMARgSAKQgSAJgUAAIgDAAgAgUg5QgOAOgJAbIBaAAIABgDQADgWgKgOQgKgPgSAAIgBAAQgSAAgOANg");
	this.shape_4.setTransform(126.5613,158.7753);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF83").s().p("AAACHQghgBgRgZIgGAWIgdAAIAukJIAgAAIgTBkQAWgZAgAAQAbABAPATQAPATABAhIgBAWIgBADQgDAdgMAXQgNAXgRALQgRALgUAAIgCAAgAgegCIgOBQQAKAdAdABQARAAAOgLQAOgMAHgVQAHgVABgXQAAgYgJgOQgJgNgTgBIgBAAQgbAAgUAeg");
	this.shape_5.setTransform(106.875,155.0261);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFF83").s().p("AgfBfQgbAAgMgTQgNgTADggIAUh4IAfAAIgUB5IAAAPQABAMAGAHQAHAHALABQAhABASgcIAYiIIAfAAIggC7IgeAAIAEgTQgVAXggAAIgCgBg");
	this.shape_6.setTransform(88.5969,158.9505);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFF83").s().p("Ag7BgIAhi7IAdAAIgEAWQATgaAbAAQAGAAAJADIgEAeIgOgCQgeAAgRAbIgXCFg");
	this.shape_7.setTransform(73.3,158.5745);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFF83").s().p("AgJBhQgdAAgUgRQgTgRAAgbIAgAAQAAAQAKAJQAKAKARAAQARAAAMgHQANgIABgNQADgTgYgIIgggKQgpgNABghQACgZAVgQQAWgQAbABQAdAAASAQQARARAAAaIgfgBQAAgOgJgJQgKgIgPgBQgPAAgMAIQgLAIgBANQgDAQAWAHIAPAFQAgAIAOAMQANAOgBAUQgBARgKANQgKANgSAHQgQAGgRAAIgDAAg");
	this.shape_8.setTransform(48.7251,158.7759);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFF83").s().p("AgfBfQgbAAgMgTQgNgTADggIAUh4IAfAAIgUB5IAAAPQABAMAGAHQAHAHALABQAhABASgcIAYiIIAfAAIggC7IgeAAIAEgTQgVAXggAAIgCgBg");
	this.shape_9.setTransform(30.9969,158.9505);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFF83").s().p("AgJBhQgXAAgRgMQgQgMgHgVQgIgVACgbIABgIQADgbANgVQAMgVAVgMQAUgMAXABQAdAAASAUQASATAAAdIgeAAQAAgTgKgLQgKgLgQgBQgYgBgQATQgQATgEAhIgBAEQgBALABAMQABAUAKAMQAKAMASAAQAQABAOgKQANgLAEgQIAeAAQgDARgLAPQgMAOgRAJQgRAHgQAAIgCAAg");
	this.shape_10.setTransform(12.0452,158.7755);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFF83").s().p("AglCAIAhi6IAeAAIgfC6gAAGheQgFgFAAgJQAAgIAFgFQAFgFAIgBQAIAAAGAFQAFAFAAAIQAAAJgFAFQgFAFgJAAIgBAAQgHAAgFgEg");
	this.shape_11.setTransform(-1.225,155.3479);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFF83").s().p("Ag7BgIAgi7IAeAAIgEAWQATgaAbAAQAGAAAJADIgEAeIgOgCQgeAAgQAbIgYCFg");
	this.shape_12.setTransform(-11.1,158.5745);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFF83").s().p("AAACHQghgBgRgZIgGAWIgdAAIAukJIAgAAIgTBkQAWgZAgAAQAbABAPATQAPATABAhIgBAWIgBADQgDAdgMAXQgNAXgRALQgRALgUAAIgCAAgAgegCIgOBQQAKAdAdABQARAAAOgLQAOgMAHgVQAHgVABgXQAAgYgJgOQgJgNgTgBIgBAAQgbAAgUAeg");
	this.shape_13.setTransform(-28.025,155.0261);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFF83").s().p("ABWBgIAVh7QABgJgBgHQgEgYgbAAQgSgBgNALQgOALgEASIgWB8IgeAAIAVh7QACgTgIgKQgIgLgRAAQgegBgRAcIgYCIIgfAAIAhi7IAdAAIgEAVQAYgZAhABQASAAALAIQANAIAEAOQAbgfAkABQAcAAANATQANASgDAfIgVB6g");
	this.shape_14.setTransform(-53.2129,158.5995);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFF83").s().p("AgfBfQgbAAgMgTQgNgTADggIAUh4IAfAAIgUB5IAAAPQABAMAGAHQAHAHALABQAhABASgcIAYiIIAfAAIggC7IgeAAIAEgTQgVAXggAAIgCgBg");
	this.shape_15.setTransform(-76.7031,158.9505);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFF83").s().p("AhMB+IAsj7IAgAAIgnDgIB0AAIgFAbg");
	this.shape_16.setTransform(-96.75,155.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).to({state:[]},1).wait(12));

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
	this.shape_67.graphics.f("#FFFFFF").s().p("AgNBvIAAiiIAbAAIAACigAgLhTQgFgEAAgHQAAgHAFgEQAEgFAHAAQAIAAAFAFQADAEAAAHQAAAHgDAEQgFAFgIAAQgHAAgEgFg");
	this.shape_67.setTransform(417.4,-105.875);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgzBHQgPgOAAgVQAAgZAUgNQASgOAjAAIAbAAIAAgNQAAgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAJgLAOgHQAPgGARAAQAcAAAQAOQAPAOACAYIAABKQgBAXAGANIAAACIgdAAQgDgFgBgMQgTAUgbAAQgXAAgQgNgAgnAgQABANAIAIQAJAHAOAAQAMAAAMgHQAMgGAFgLIAAgiIgXAAQgyAAAAAeg");
	this.shape_68.setTransform(405.3,-102.925);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgxBEQgOgPAAgeIAAhpIAbAAIAABoQABAlAeAAQAeAAALgYIAAh1IAcAAIAACiIgbAAIAAgQQgQATgfAAQgZAAgOgPg");
	this.shape_69.setTransform(388.5,-102.775);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AggBNQgPgHgIgMQgIgMAAgPIAbAAQABAOAKAIQAKAJARAAQAQAAAJgHQAJgGAAgLQABgLgJgGQgJgHgTgEQgWgFgMgFQgMgGgGgJQgGgJAAgMQAAgUARgNQARgOAZAAQAbAAASAOQARAOAAAWIgcAAQAAgLgJgIQgKgIgPAAQgPAAgIAGQgJAHAAAKQABAKAHAGQAJAFAUAEQAUAFANAGQANAGAGAJQAHAJgBANQAAAWgRANQgSANgbAAQgTAAgPgHg");
	this.shape_70.setTransform(372.1,-102.925);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgwA/QgUgWAAglIAAgEQAAgYAJgTQAKgTAQgKQARgLASAAQAgAAARAVQASAUAAAnIAAALIhtAAQABAYANAPQANAPAUAAQAOAAALgGQAKgGAIgKIARANQgVAfgpAAQgfAAgWgVgAgZgwQgMAMgDAWIBRAAIAAgCQgBgVgKgMQgKgLgSAAQgQAAgLAMg");
	this.shape_71.setTransform(356.15,-102.925);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgfBNQgQgHgIgMQgIgMgBgPIAcAAQABAOAKAIQALAJAQAAQAPAAAKgHQAJgGAAgLQABgLgJgGQgIgHgUgEQgWgFgMgFQgNgGgFgJQgGgJAAgMQAAgUARgNQAQgOAaAAQAbAAASAOQARAOAAAWIgcAAQAAgLgKgIQgKgIgOAAQgOAAgJAGQgJAHABAKQAAAKAIAGQAHAFAVAEQAUAFANAGQANAGAHAJQAFAJAAANQAAAWgRANQgRANgcAAQgTAAgOgHg");
	this.shape_72.setTransform(339.9,-102.925);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AghBrQgSgHgIgNIAOgRQASAWAaAAQATAAAMgLQALgMAAgVIAAgNQgRATgcAAQgcAAgSgXQgRgXAAgnQAAgmARgWQASgXAcAAQAdAAARAVIABgSIAZAAIAACeQAAAfgSATQgTASgfAAQgRAAgQgIgAgchKQgMAPAAAfQAAAcALAPQAMAPATAAQAbAAAMgYIAAhJQgNgXgZAAQgUAAgLAQg");
	this.shape_73.setTransform(315.45,-99.875);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgQAAQgNAAgLAHQgKAHgFAMIAABzIgcAAIAAiiIAaAAIABAVQATgYAdAAQA0AAAAA6IAABrg");
	this.shape_74.setTransform(298.7,-103.075);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQAUgOAhAAIAbAAIAAgNQABgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAJgLAOgHQAPgGARAAQAcAAAQAOQAPAOACAYIAABKQgBAXAGANIAAACIgdAAQgDgFgBgMQgTAUgbAAQgXAAgPgNgAgnAgQABANAIAIQAJAHAOAAQAMAAAMgHQALgGAFgLIAAgiIgWAAQgyAAAAAeg");
	this.shape_75.setTransform(281.9,-102.925);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgxByIgKgCIAAgXIAHABQAOAAAIgGQAIgFAFgQIAHgRIg6ifIAeAAIAnB5IAmh5IAeAAIhBC6QgOApgiAAg");
	this.shape_76.setTransform(266.275,-99.65);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_77.setTransform(244.625,-106.325);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQAUgOAhAAIAbAAIAAgNQABgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAJgLAOgHQAPgGARAAQAcAAAQAOQAPAOACAYIAABKQgBAXAGANIAAACIgdAAQgDgFgBgMQgTAUgbAAQgXAAgPgNgAgnAgQABANAIAIQAJAHAOAAQAMAAAMgHQALgGAFgLIAAgiIgWAAQgyAAAAAeg");
	this.shape_78.setTransform(227.45,-102.925);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgEBbQgKgLAAgVIAAhkIgdAAIAAgVIAdAAIAAgoIAbAAIAAAoIAeAAIAAAVIgeAAIAABkQAAAKAEAFQAEAFAKAAIANgCIAAAXQgLACgKAAQgTAAgIgLg");
	this.shape_79.setTransform(213.625,-104.75);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("Ag1A9QgUgXAAgmIAAgBQAAgXAKgTQAJgUARgKQARgKAUAAQAhAAAUAXQAVAXAAAlIAAACQAAAYgJASQgJATgRALQgRAKgWAAQggAAgVgXgAghgsQgMAQAAAeQAAAbAMAQQANARAUAAQAVAAANgRQAMgRAAgdQABgagNgRQgNgQgVAAQgUAAgNAQg");
	this.shape_80.setTransform(200.3,-102.925);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_81.setTransform(184.725,-106.325);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgxBEQgOgPAAgeIAAhpIAcAAIAABoQAAAlAeAAQAfAAAKgYIAAh1IAcAAIAACiIgaAAIgBgQQgQATgfAAQgZAAgOgPg");
	this.shape_82.setTransform(159.85,-102.775);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgeCNIAAgWIANABQAJAAAFgFQAEgFAAgNIAAi1IAbAAIAAC1QAAAugpAAQgJAAgIgCgAAChzQgDgFAAgHQAAgGADgFQAFgFAIABQAIgBAEAFQAEAFAAAGQAAAHgEAFQgEAEgIAAQgJAAgEgEg");
	this.shape_83.setTransform(146.2,-102.6);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgxBEQgOgPAAgeIAAhpIAbAAIAABoQABAlAeAAQAeAAALgYIAAh1IAcAAIAACiIgbAAIAAgQQgQATgeAAQgaAAgOgPg");
	this.shape_84.setTransform(135.6,-102.775);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgRAAQgMAAgKAHQgKAHgGAMIAABzIgcAAIAAiiIAbAAIAAAVQATgYAdAAQA0AAAAA6IAABrg");
	this.shape_85.setTransform(118.75,-103.075);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgvA/QgVgWAAglIAAgEQAAgYAJgTQAKgTAQgKQAQgLATAAQAfAAATAVQARAUAAAnIAAALIhtAAQABAYANAPQANAPAUAAQAOAAALgGQAKgGAIgKIARANQgVAfgoAAQghAAgUgVgAgZgwQgLAMgDAWIBQAAIAAgCQgBgVgLgMQgJgLgSAAQgQAAgLAMg");
	this.shape_86.setTransform(102.2,-102.925);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("ABWBTIAAhrQAAgRgIgIQgIgJgTAAQgPAAgLAJQgKAJgBAQIAABrIgbAAIAAhqQAAgjgjAAQgbAAgKAXIAAB2IgcAAIAAiiIAaAAIABASQASgVAeAAQAiAAALAaQAJgLANgIQANgHASAAQA1AAABA5IAABsg");
	this.shape_87.setTransform(80.45,-103.075);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AAkBTIAAhrQAAgRgIgJQgIgIgRAAQgMAAgLAHQgJAHgGAMIAABzIgcAAIAAiiIAaAAIABAVQATgYAdAAQAzAAABA6IAABrg");
	this.shape_88.setTransform(50.95,-103.075);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQAUgOAhAAIAbAAIAAgNQAAgPgIgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAIgLAQgHQAOgGARAAQAcAAAQAOQAPAOABAYIAABKQABAXAFANIAAACIgdAAQgCgFgCgMQgUAUgaAAQgYAAgOgNgAgnAgQAAANAJAIQAJAHAOAAQAMAAALgHQANgGAEgLIAAgiIgVAAQgyAAgBAeg");
	this.shape_89.setTransform(34.1,-102.925);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AAnBRIgnh6IgmB6IgXAAIgvihIAcAAIAgB4IAmh4IAVAAIAnB7IAfh7IAcAAIgwChg");
	this.shape_90.setTransform(14.225,-102.925);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgvA/QgVgWAAglIAAgEQAAgYAJgTQAKgTAQgKQAQgLATAAQAfAAATAVQARAUAAAnIAAALIhtAAQABAYANAPQANAPAUAAQAOAAALgGQAKgGAIgKIARANQgVAfgoAAQghAAgUgVgAgZgwQgLAMgDAWIBQAAIAAgCQgBgVgLgMQgJgLgSAAQgQAAgLAMg");
	this.shape_91.setTransform(-5.35,-102.925);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AAkBzIAAhrQAAgRgIgIQgIgJgQAAQgNAAgLAIQgKAHgFALIAABzIgcAAIAAjlIAcAAIAABXQASgWAdAAQAzAAABA5IAABrg");
	this.shape_92.setTransform(-22.05,-106.325);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgmBTIAAiiIAbAAIAAATQANgWAZAAQAIAAAEACIAAAaIgNgBQgbAAgJAXIAABzg");
	this.shape_93.setTransform(-42.525,-103.075);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQATgOAiAAIAbAAIAAgNQAAgPgIgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAIgLAQgHQAOgGARAAQAcAAAQAOQAPAOABAYIAABKQABAXAFANIAAACIgdAAQgCgFgCgMQgUAUgZAAQgYAAgPgNgAgmAgQgBANAKAIQAIAHAOAAQAMAAALgHQANgGAEgLIAAgiIgVAAQgyAAAAAeg");
	this.shape_94.setTransform(-56.9,-102.925);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AgpBfIgBATIgaAAIAAjmIAcAAIAABWQARgVAcAAQAeAAARAXQARAWAAAmIAAACQAAAmgRAWQgRAXgdAAQgeAAgRgWgAgogCIAABGQANAZAbAAQATAAALgPQALgQAAgfQAAgcgLgPQgLgPgTAAQgcAAgMAZg");
	this.shape_95.setTransform(-73.525,-106.175);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("ABWBTIAAhrQAAgRgIgIQgIgJgSAAQgQAAgKAJQgLAJgCAQIAABrIgaAAIAAhqQAAgjgjAAQgbAAgLAXIAAB2IgbAAIAAiiIAaAAIABASQASgVAeAAQAiAAAMAaQAHgLANgIQAOgHARAAQA2AAABA5IAABsg");
	this.shape_96.setTransform(-96,-103.075);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQAUgOAhAAIAbAAIAAgNQABgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAJgLAOgHQAPgGARAAQAcAAAQAOQAPAOABAYIAABKQAAAXAGANIAAACIgdAAQgDgFgBgMQgUAUgaAAQgYAAgOgNgAgnAgQABANAIAIQAJAHAOAAQAMAAALgHQAMgGAFgLIAAgiIgVAAQgzAAAAAeg");
	this.shape_97.setTransform(-117.8,-102.925);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AgiBrQgQgHgKgNIAPgRQASAWAaAAQATAAALgLQAMgMAAgVIAAgNQgRATgcAAQgdAAgRgXQgSgXAAgnQAAgmASgWQARgXAdAAQAeAAAQAVIACgSIAYAAIAACeQAAAfgSATQgSASggAAQgRAAgRgIgAgchKQgMAPAAAfQAAAcAMAPQALAPATAAQAbAAAMgYIAAhJQgNgXgaAAQgTAAgLAQg");
	this.shape_98.setTransform(-135.15,-99.875);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_99.setTransform(-157.825,-106.325);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AgyBHQgQgOAAgVQAAgZATgNQAUgOAhAAIAbAAIAAgNQABgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAJgLAOgHQAPgGARAAQAcAAAQAOQAPAOABAYIAABKQAAAXAGANIAAACIgdAAQgDgFgBgMQgUAUgaAAQgYAAgOgNgAgnAgQABANAIAIQAJAHAOAAQAMAAALgHQAMgGAFgLIAAgiIgVAAQgzAAAAAeg");
	this.shape_100.setTransform(-174.95,-102.925);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AgEBbQgKgLAAgVIAAhkIgdAAIAAgVIAdAAIAAgoIAbAAIAAAoIAeAAIAAAVIgeAAIAABkQAAAKAEAFQAEAFAKAAIANgCIAAAXQgLACgKAAQgTAAgIgLg");
	this.shape_101.setTransform(-188.825,-104.75);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("Ag1A9QgUgXAAgmIAAgBQAAgXAJgTQAKgUARgKQAQgKAVAAQAhAAAUAXQAVAXAAAlIAAACQAAAYgJASQgJATgRALQgRAKgWAAQggAAgVgXgAgggsQgNAQAAAeQAAAbANAQQAMARAUAAQAVAAANgRQANgRAAgdQAAgagOgRQgMgQgVAAQgUAAgMAQg");
	this.shape_102.setTransform(-202.15,-102.925);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AAjBzIg4hLIgRASIAAA5IgcAAIAAjlIAcAAIAACKIAPgSIAxg0IAiAAIg+BDIBFBeg");
	this.shape_103.setTransform(-217.675,-106.325);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AgiBrQgQgHgKgNIAPgRQASAWAaAAQATAAALgLQAMgMAAgVIAAgNQgRATgcAAQgdAAgRgXQgSgXAAgnQAAgmASgWQARgXAdAAQAeAAAQAVIACgSIAZAAIAACeQgBAfgSATQgSASggAAQgRAAgRgIgAgchKQgMAPAAAfQAAAcAMAPQALAPATAAQAbAAAMgYIAAhJQgNgXgaAAQgTAAgLAQg");
	this.shape_104.setTransform(-243.05,-99.875);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AgzBHQgPgOAAgVQAAgZAUgNQASgOAjAAIAbAAIAAgNQAAgPgJgIQgJgJgQAAQgPAAgKAIQgKAHAAALIgcAAQAAgMAJgMQAIgLAPgHQAPgGARAAQAcAAAQAOQAQAOABAYIAABKQgBAXAGANIAAACIgdAAQgCgFgCgMQgTAUgaAAQgZAAgPgNgAgmAgQAAANAJAIQAIAHAOAAQAMAAAMgHQALgGAGgLIAAgiIgXAAQgyAAABAeg");
	this.shape_105.setTransform(-259.7,-102.925);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AgmBTIAAiiIAbAAIAAATQANgWAZAAQAIAAAEACIAAAaIgNgBQgbAAgJAXIAABzg");
	this.shape_106.setTransform(-272.425,-103.075);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AhOBtIAAjZIA+AAQAbAAAWAMQAWANAMAXQAMAXAAAfIAAANQAAAegMAYQgMAXgWAMQgWANgcAAgAgyBWIAfAAQAgAAATgVQASgVAAgmIAAgMQAAglgRgVQgRgVgfAAIgjAAg");
	this.shape_107.setTransform(-288.25,-105.725);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgMAMQgEgFAAgGQAAgHAEgFQAEgEAIAAQAJAAAEAEQAEAFAAAHQAAAGgEAFQgEAFgJgBQgIABgEgFg");
	this.shape_108.setTransform(-318.025,-96.3);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AAOBuIAAi4Ig3AVIAAgaIBOgeIAFAAIAADbg");
	this.shape_109.setTransform(-332.4,-105.8);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgJgJQgJgKgUAAQgaAAgNAXIAACnIhAAAIAAjtIA9AAIABAcQAZggArAAQAlAAATAWQASAWABAtIAACYg");
	this.shape_110.setTransform(209.8,-167.7);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgfCmIAAjtIA/AAIAADtgAgYhtQgKgJAAgOQgBgPAKgJQAKgJAPAAQAQAAAKAJQAKAJgBAPQABAOgKAJQgKAKgQAAQgPAAgJgKg");
	this.shape_111.setTransform(191.25,-172.175);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AhRBnQgYgUAAgfQAAgmAcgTQAcgUA0AAIAeAAIAAgOQAAgQgJgKQgJgKgQAAQgRAAgIAHQgKAIAAAOIg/AAQgBgVANgSQANgRAXgKQAYgKAcAAQArAAAbAWQAZAWAAAoIAABmQAAAiAKARIAAAEIhAAAQgFgJgCgNQgXAagkAAQgjAAgWgUgAgpAsIAAADQAAAMAIAIQAIAIAPAAQANAAAMgHQAMgGAGgKIAAgpIgYAAQgvAAgDAhg");
	this.shape_112.setTransform(173.2,-167.475);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("ABqB5IAAiWQAAgVgHgJQgIgKgUAAQgdAAgLAcIAACiIg+AAIAAiWQAAgVgIgJQgIgKgUAAQgbABgMAWIAACnIg/AAIAAjtIA7AAIACAbQAZgfArAAQAtAAARAlQAZglAvAAQAmAAATAWQATAXAAAuIAACWg");
	this.shape_113.setTransform(141.725,-167.7);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AhCB5IAAjtIA8AAIABAdQATghAhAAQALAAAJADIgBA9QgNgCgJAAQglAAgKAYIAACbg");
	this.shape_114.setTransform(114.95,-167.7);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AhKBbQghggAAg1IAAgGQAAgjAOgcQAOgdAZgPQAZgPAgAAQAxAAAcAfQAcAeAAA5IAAAZIiXAAQADAXAQAOQAPAOAXAAQAlAAAUgbIAgAjQgPAVgYALQgYALgeAAQgzAAghgggAgbg6QgMANgDAXIBXAAIAAgFQAAgVgLgLQgLgMgUAAQgSAAgMANg");
	this.shape_115.setTransform(93.925,-167.475);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("Ah2CgIAAk/IBwAAQA5AAAfAWQAeAXAAArQAAAXgMASQgNASgVAIQAZAFAOATQAOATAAAbQAAAugeAYQgdAXg2ABgAg0BrIA4AAQAXAAANgLQANgLAAgUQAAgsgtAAIg8AAgAg0gZIAxAAQAxgBAAgnQAAgVgNgKQgNgKgaAAIguAAg");
	this.shape_116.setTransform(67.475,-171.575);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AAlCoIg8hfIgWAXIAABIIhAAAIAAlPIBAAAIAAC5IALgPIA8hHIBMAAIhVBiIBdCKg");
	this.shape_117.setTransform(31.1,-172.45);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AhRBjQgUgWAAgrIAAiaIA/AAIAACZQAAAlAhAAQAgAAAMgXIAAinIA/AAIAADsIg7AAIgCgYQgYAdgoAAQgmAAgUgWg");
	this.shape_118.setTransform(5,-167.25);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("Ag5DSIAAgyQAMACAIAAQAeAAAAgfIAAj6IA+AAIAAD6QAAAngVAWQgVAWgmAAQgRAAgPgEgAgDidQgKgJAAgOQAAgPAKgJQAIgJARAAQARAAAJAJQAJAJAAAPQAAAOgJAJQgKAKgQAAQgQAAgJgKg");
	this.shape_119.setTransform(-15.65,-167.375);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgIgJQgJgKgVAAQgZAAgOAXIAACnIhAAAIAAjtIA9AAIABAcQAZggArAAQAlAAATAWQASAWABAtIAACYg");
	this.shape_120.setTransform(-31.95,-167.7);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AhRBjQgUgWgBgrIAAiaIBAAAIAACZQAAAlAiAAQAfAAAMgXIAAinIBAAAIAADsIg8AAIgCgYQgYAdgoAAQgmAAgUgWg");
	this.shape_121.setTransform(-57.15,-167.25);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AgjBTIAAh/IgjAAIAAgvIAjAAIAAg6IA/AAIAAA6IAoAAIAAAvIgoAAIAAB1QAAANAFAGQAFAGAOAAQAKAAAJgCIAAAwQgTAGgUAAQhCAAgBhDg");
	this.shape_122.setTransform(-77.575,-170.175);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AhKBbQghggAAg1IAAgGQAAgjAOgcQAOgdAZgPQAZgPAgAAQAxAAAcAfQAcAeAAA5IAAAZIiXAAQADAXAQAOQAPAOAXAAQAlAAAUgbIAgAjQgPAVgYALQgYALgeAAQgzAAghgggAgbg6QgMANgDAXIBXAAIAAgFQAAgVgLgLQgLgMgUAAQgSAAgMANg");
	this.shape_123.setTransform(-96.725,-167.475);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("Ah6CgIAAk/IB8AAQAkAAAbANQAcANAPAZQAOAYAAAfQAAAvgfAaQghAbg5AAIg4AAIAABxgAg3gFIA5AAQAbAAANgNQAOgMAAgXQAAgXgOgPQgOgOgYgBIg7AAg");
	this.shape_124.setTransform(-123,-171.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]},12).to({state:[]},1).wait(12));

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


(lib.popUpGame2 = function(mode,startPosition,loop) {
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
	this.instance = new lib.g1();
	this.instance.setTransform(248.25,-60.25);

	this.instance_1 = new lib._5jpegcopy();
	this.instance_1.setTransform(-353.25,-230.75,0.5414,0.7578);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF83").s().p("AgOANQgFgFAAgIQAAgHAFgGQAFgFAJAAQAKAAAFAFQAFAGAAAHQAAAIgFAFQgFAGgKAAQgJAAgFgGg");
	this.shape.setTransform(118.2,166.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF83").s().p("AhOCDIAAkCIAdAAIACAVQATgYAigBQAiABAUAZQATAZAAAuIAAADQAAApgTAbQgUAagiAAQghAAgTgWIAABagAguhOIAABZQAOAaAeAAQAWAAANgSQAOgTAAgjQAAgfgOgTQgNgTgWAAQgdAAgPAag");
	this.shape_1.setTransform(104.2,162.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF83").s().p("AglBZQgRgIgKgOQgJgOgBgRIAhAAQAAAQAMAKQANAJASAAQATAAALgHQALgIgBgMQAAgNgJgHQgKgHgYgGQgYgFgOgGQgPgHgGgKQgHgKAAgOQAAgXATgQQAUgQAdAAQAgAAAUAQQAUARAAAZIggAAQAAgNgLgJQgMgKgRAAQgQAAgKAIQgKAHAAANQAAALAJAGQAJAGAXAFQAZAGAOAHQAPAHAHAKQAIALAAAPQgBAZgTAPQgUAPghAAQgVAAgSgIg");
	this.shape_2.setTransform(84.6,158.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF83").s().p("Ag3BIQgXgZAAgqIAAgFQAAgcALgVQAKgWATgNQATgMAWAAQAkAAAUAYQAVAYgBAtIAAAMIh+AAQABAcAQARQAQARAWAAQASAAALgHQAMgHAJgLIATAPQgXAkgwAAQglAAgYgZgAgdg4QgNAOgEAaIBeAAIAAgDQgBgYgNgNQgMgOgTAAQgTAAgNAOg");
	this.shape_3.setTransform(57.6,158.775);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF83").s().p("Ag4BIQgWgaAAgsIAAgFQAAgbAKgVQAKgWATgLQATgMAZAAQAfAAAVATQAUATACAeIgeAAQgBgTgNgLQgNgMgRAAQgYAAgNASQgOARAAAiIAAAFQAAAgAOASQANARAYAAQAQAAANgKQAOgLABgPIAeAAQgBAQgKAOQgKAPgRAJQgRAIgTAAQgmAAgXgZg");
	this.shape_4.setTransform(38.95,158.775);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF83").s().p("AgQCAIAAi7IAgAAIAAC7gAgNhfQgFgFAAgJQAAgHAFgGQAFgFAIAAQAJAAAFAFQAFAGAAAHQAAAJgFAFQgFAFgJAAQgIAAgFgFg");
	this.shape_5.setTransform(25.15,155.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFF83").s().p("AApBfIAAh6QAAgVgJgKQgJgKgTAAQgPAAgMAJQgLAIgHAOIAACEIggAAIAAi6IAeAAIABAXQAWgbAiAAQA7ABABBDIAAB6g");
	this.shape_6.setTransform(11.025,158.6);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFF83").s().p("Ag5BOQgQgSAAghIAAh6IAgAAIAAB4QAAAsAjgBQAkABAMgcIAAiIIAgAAIAAC7IgfAAIAAgSQgTAVgjAAQgeAAgQgRg");
	this.shape_7.setTransform(-8.625,158.95);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFF83").s().p("AhPB+IAAj7ICdAAIAAAbIh8AAIAABRIBsAAIAAAbIhsAAIAABZIB+AAIAAAbg");
	this.shape_8.setTransform(-27.65,155.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).to({state:[]},1).wait(12));

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


(lib.c = function(mode,startPosition,loop) {
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

	// Layer_6
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(255,0,0,0.937)").ss(5,1,1).p("AJjAAQAAE3izDcQizDdj9AAQj9AAizjdQizjcAAk3QAAk3CzjcQCzjcD9AAQD9AACzDcQCzDcAAE3g");
	this.shape.setTransform(284.7,-46.1);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_4
	this.instance = new lib._36();
	this.instance.setTransform(-353,-231,0.5493,0.6583);

	this.instance_1 = new lib._30();
	this.instance_1.setTransform(59,-231,0.4935,0.7803);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF83").s().p("AgXBhQgYAAgQgPQgPgQABgXQACgeAYgPQAYgRAnAAIAhAAIACgPQACgRgIgJQgJgKgQgBQgQAAgMAIQgMAJgDANIgfAAQABgQALgNQAMgNARgHQARgHATABQAdAAAQARQARARgDAdIgPBcIgBANQAAAJACAKIAAADIggAAIgBgKIAAgKQgZAXgcAAIgBAAgAgbAMQgQAJgCARQgCAOAIAIQAIAJAPAAQAPABAMgIQAOgHAJgOIAHgmIgYAAQgcAAgQAJg");
	this.shape_1.setTransform(170.1384,158.7738);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF83").s().p("Ag7BgIAhi7IAdAAIgEAWQATgaAbAAQAGAAAJADIgEAeIgOgCQgfAAgQAbIgXCFg");
	this.shape_2.setTransform(156,158.5745);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF83").s().p("AAACHQghgBgRgZIgGAWIgdAAIAukJIAgAAIgTBkQAWgZAgAAQAbABAPATQAPATABAhIgBAWIgBADQgDAdgMAXQgNAXgRALQgRALgUAAIgCAAgAgegCIgOBQQAKAdAdABQARAAAOgLQAOgMAHgVQAHgVABgXQAAgYgJgOQgJgNgTgBIgBAAQgbAAgUAeg");
	this.shape_3.setTransform(139.025,155.0261);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF83").s().p("AgXBhQgYAAgQgPQgPgQABgXQACgeAYgPQAYgRAnAAIAhAAIACgPQACgRgIgJQgJgKgQgBQgQAAgMAIQgMAJgDANIgfAAQABgQALgNQAMgNARgHQARgHATABQAdAAAQARQARARgDAdIgPBcIgBANQAAAJACAKIAAADIggAAIgBgKIAAgKQgZAXgcAAIgBAAgAgbAMQgQAJgCARQgCAOAIAIQAIAJAPAAQAPABAMgIQAOgHAJgOIAHgmIgYAAQgcAAgQAJg");
	this.shape_4.setTransform(119.8384,158.7738);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF83").s().p("AgJBhQgXAAgRgMQgQgMgHgVQgIgVACgbIABgIQADgbANgVQAMgVAVgMQAUgMAXABQAdAAASAUQASATAAAdIgeAAQAAgTgKgLQgKgLgQgBQgYgBgQATQgQATgEAhIgBAEQgBALABAMQABAUAKAMQAKAMASAAQAQABAOgKQANgLAEgQIAeAAQgDARgLAPQgMAOgRAJQgRAHgQAAIgCAAg");
	this.shape_5.setTransform(102.0952,158.7755);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFF83").s().p("AgJBhQgdAAgUgRQgTgRAAgbIAgAAQAAAQAKAJQAKAKARAAQARAAAMgHQANgIABgNQADgTgYgIIgggKQgpgNABghQACgZAVgQQAWgQAbABQAdAAASAQQARARAAAaIgfgBQAAgOgJgJQgKgIgPgBQgPAAgMAIQgLAIgBANQgDAQAWAHIAPAFQAgAIAOAMQANAOgBAUQgBARgKANQgKANgSAHQgQAGgRAAIgDAAg");
	this.shape_6.setTransform(83.5251,158.7759);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFF83").s().p("AgXBhQgYAAgQgPQgPgQABgXQACgeAYgPQAYgRAnAAIAhAAIACgPQACgRgIgJQgJgKgQgBQgQAAgMAIQgMAJgDANIgfAAQABgQALgNQAMgNARgHQARgHATABQAdAAAQARQARARgDAdIgPBcIgBANQAAAJACAKIAAADIggAAIgBgKIAAgKQgZAXgcAAIgBAAgAgbAMQgQAJgCARQgCAOAIAIQAIAJAPAAQAPABAMgIQAOgHAJgOIAHgmIgYAAQgcAAgQAJg");
	this.shape_7.setTransform(56.0384,158.7738);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFF83").s().p("AglCAIAhi6IAeAAIgfC6gAAGheQgFgFAAgJQAAgIAFgFQAFgFAIgBQAIAAAGAFQAFAFAAAIQAAAJgFAFQgFAFgJAAIgBAAQgHAAgFgEg");
	this.shape_8.setTransform(43.275,155.3479);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFF83").s().p("Ag7BgIAhi7IAdAAIgEAWQATgaAbAAQAGAAAJADIgDAeIgPgCQgeAAgRAbIgXCFg");
	this.shape_9.setTransform(33.4,158.5745);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFF83").s().p("AgfBfQgbAAgMgTQgNgTADggIAUh4IAfAAIgUB5IAAAPQABAMAGAHQAHAHALABQAhABASgcIAYiIIAfAAIggC7IgeAAIAEgTQgVAXggAAIgCgBg");
	this.shape_10.setTransform(17.7469,158.9505);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFF83").s().p("AAeCFIAUh8QABgIgBgGQgDgZgZAAQgcgBgVAfIgXCFIgfAAIAukJIAfAAIgTBmQAYgbAgAAQAaAAANATQANARgEAfIgUB7g");
	this.shape_11.setTransform(-2.7367,154.85);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFF83").s().p("AgdBoQgKgNACgXIAThzIggAAIAEgZIAhAAIAIgtIAeAAIgIAtIAiAAIgEAZIgiAAIgSB0IAAAIQABANAMAAIAPgBIgCAaQgMADgKAAQgTAAgJgOg");
	this.shape_12.setTransform(-16.65,156.675);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFF83").s().p("AgLBhQgYAAgRgNQgRgMgHgWQgIgVACgaQADgcANgXQANgXAVgNQAUgNAYABQAYAAARANQAQAMAJAWQAIAWgDAaIAAADQgEAbgNAWQgNAWgUANQgUALgWAAIgCAAgAgdgzQgRAUgEAfIAAADQgCALACAMQABAUALANQAKAMASAAQAOABANgIQAOgJAJgQQAJgRACgUQACgPgBgLQgCgVgLgMQgKgMgSgBIgBAAQgXAAgQATg");
	this.shape_13.setTransform(-32.9652,158.775);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFF83").s().p("AgmCFIAukJIAfAAIgtEJg");
	this.shape_14.setTransform(-46.575,154.85);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFF83").s().p("AgLBhQgYAAgRgNQgRgMgHgWQgIgVACgaQADgcANgXQANgXAVgNQAUgNAYABQAYAAARANQAQAMAJAWQAIAWgDAaIAAADQgEAbgNAWQgNAWgUANQgUALgWAAIgCAAgAgdgzQgRAUgEAfIAAADQgCALACAMQABAUALANQAKAMASAAQAOABANgIQAOgJAJgQQAJgRACgUQACgPgBgLQgCgVgLgMQgKgMgSgBIgBAAQgXAAgQATg");
	this.shape_15.setTransform(-61.2652,158.775);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFF83").s().p("AAoB+IAUh0Ih6AAIgUB0IghAAIAsj7IAgAAIgSBsIB6AAIAShsIAhAAIgsD7g");
	this.shape_16.setTransform(-83.125,155.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.instance_1},{t:this.instance}]},12).to({state:[]},1).wait(12));

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


// stage content:
(lib.game1_temp = function(mode,startPosition,loop) {
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
		  window.location.replace('../menu/index.html');
		});
		
		root.btnNextDasar1.on("click", function () {
		  window.location.replace('../game2/index.html');
		});
		
		root.btnBack3.on("click", function () {
		  window.location.replace('../materi5/index.html');
		});
		var root = this;
		var pieces = root.pieces;
		var slots = root.slots;
		var restart = root.restart;
		var winMessage = root.winMessage;
		var Score = root.Score;
		var positions1 = [];
		
		root.stop();
		
		root.pGam1.gotoAndStop(0);
		
		root.pieces.laut.on("click", function () {
		  root.pGam1.gotoAndPlay(0);
		});
		
		root.pp3.gotoAndStop(0);
		
		root.pieces.tana.on("click", function () {
		  root.pp3.gotoAndPlay(0);
		});
		
		root.pp4.gotoAndStop(0);
		
		root.pieces.tana1.on("click", function () {
		  root.pp4.gotoAndPlay(0);
		});
		
		root.pp5.gotoAndStop(0);
		
		root.pieces.laut1.on("click", function () {
		  root.pp5.gotoAndPlay(0);
		});
		
		root.pp6.gotoAndStop(0);
		
		root.pieces.laut2.on("click", function () {
		  root.pp6.gotoAndPlay(0);
		});
		
		root.pp7.gotoAndStop(0);
		
		root.pieces.laut3.on("click", function () {
		  root.pp7.gotoAndPlay(0);
		});
		
		root.pp8.gotoAndStop(0);
		
		root.pieces.laut4.on("click", function () {
		  root.pp8.gotoAndPlay(0);
		});
		
		root.pp9.gotoAndStop(0);
		
		root.pieces.laut5.on("click", function () {
		  root.pp9.gotoAndPlay(0);
		});
		
		root.pp10.gotoAndStop(0);
		
		root.pieces.laut6.on("click", function () {
		  root.pp10.gotoAndPlay(0);
		});
		
		root.pp11.gotoAndStop(0);
		
		root.pieces.laut7.on("click", function () {
		  root.pp11.gotoAndPlay(0);
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

	// popUp1
	this.pGam1 = new lib.popUpGame2();
	this.pGam1.name = "pGam1";
	this.pGam1.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.pGam1).wait(1));

	// popUp2
	this.pp3 = new lib.pp3();
	this.pp3.name = "pp3";
	this.pp3.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.pp3).wait(1));

	// popUp3
	this.pp4 = new lib.pp4();
	this.pp4.name = "pp4";
	this.pp4.setTransform(481.85,270.9,1,1,0,0,0,43.5,-42.6);

	this.timeline.addTween(cjs.Tween.get(this.pp4).wait(1));

	// popUp4
	this.pp5 = new lib.pp5();
	this.pp5.name = "pp5";
	this.pp5.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.pp5).wait(1));

	// popUp5
	this.pp6 = new lib.pp6();
	this.pp6.name = "pp6";
	this.pp6.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.pp6).wait(1));

	// popUp6
	this.pp7 = new lib.pp7();
	this.pp7.name = "pp7";
	this.pp7.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.pp7).wait(1));

	// popUp7
	this.pp8 = new lib.c();
	this.pp8.name = "pp8";
	this.pp8.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.pp8).wait(1));

	// popUp8
	this.pp9 = new lib.pp9();
	this.pp9.name = "pp9";
	this.pp9.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.pp9).wait(1));

	// popUp9
	this.pp10 = new lib.pp10();
	this.pp10.name = "pp10";
	this.pp10.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.pp10).wait(1));

	// popUp10
	this.pp11 = new lib.pp11();
	this.pp11.name = "pp11";
	this.pp11.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.pp11).wait(1));

	// info
	this.popUpInfo = new lib.popUpInfo();
	this.popUpInfo.name = "popUpInfo";
	this.popUpInfo.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.popUpInfo).wait(1));

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

	this.slots = new lib.Slots();
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
	color: "#34495E",
	opacity: 1.00,
	manifest: [
		{src:"images/_10.jpeg", id:"_10"},
		{src:"images/_13.jpeg", id:"_13"},
		{src:"images/_16.jpeg", id:"_16"},
		{src:"images/_25.jpeg", id:"_25"},
		{src:"images/_26.jpeg", id:"_26"},
		{src:"images/_17.jpeg", id:"_17"},
		{src:"images/_3.jpeg", id:"_3"},
		{src:"images/_28.jpeg", id:"_28"},
		{src:"images/_34.jpeg", id:"_34"},
		{src:"images/_32.jpeg", id:"_32"},
		{src:"images/_5.jpeg", id:"_5"},
		{src:"images/_36.jpeg", id:"_36"},
		{src:"images/_6.jpeg", id:"_6"},
		{src:"images/_5jpegcopy.jpg", id:"_5jpegcopy"},
		{src:"images/_7.jpeg", id:"_7"},
		{src:"images/_20.jpeg", id:"_20"},
		{src:"images/Bitmap1.png", id:"Bitmap1"},
		{src:"images/Bitmap2.png", id:"Bitmap2"},
		{src:"images/_9_tripo.jpg", id:"_9_tripo"},
		{src:"images/Bitmap44.png", id:"Bitmap44"},
		{src:"images/Bitmap3.png", id:"Bitmap3"},
		{src:"images/Bitmap45.png", id:"Bitmap45"},
		{src:"images/_30.jpeg", id:"_30"},
		{src:"images/Bitmap72.png", id:"Bitmap72"},
		{src:"images/Bitmap73.png", id:"Bitmap73"},
		{src:"images/_10_tripo.jpg", id:"_10_tripo"},
		{src:"images/_7jpegcopy.jpg", id:"_7jpegcopy"},
		{src:"images/bookpngcopy.png", id:"bookpngcopy"}
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