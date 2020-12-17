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


(lib._10_tripo = function() {
	this.initialize(img._10_tripo);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,708,526);


(lib._16 = function() {
	this.initialize(img._16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,320,292);


(lib._13 = function() {
	this.initialize(img._13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,594,297);


(lib._25 = function() {
	this.initialize(img._25);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,729,600);


(lib._26 = function() {
	this.initialize(img._26);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,624,375);


(lib._28 = function() {
	this.initialize(img._28);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,259,194);


(lib._3 = function() {
	this.initialize(img._3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,638,479);


(lib._30 = function() {
	this.initialize(img._30);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,768,437);


(lib._32 = function() {
	this.initialize(img._32);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,720,489);


(lib._34 = function() {
	this.initialize(img._34);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,440,302);


(lib._5 = function() {
	this.initialize(img._5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,700,450);


(lib._20 = function() {
	this.initialize(img._20);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,720,580);


(lib._6 = function() {
	this.initialize(img._6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1024,683);


(lib._7 = function() {
	this.initialize(img._7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,201);


(lib._7jpegcopy = function() {
	this.initialize(img._7jpegcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,201);


(lib._36 = function() {
	this.initialize(img._36);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,690,518);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);


(lib._9_tripo = function() {
	this.initialize(img._9_tripo);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,823,518);


(lib.Bitmap45 = function() {
	this.initialize(img.Bitmap45);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,202,177);


(lib.Bitmap44 = function() {
	this.initialize(img.Bitmap44);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,267,177);


(lib.Bitmap72 = function() {
	this.initialize(img.Bitmap72);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,267,177);


(lib.Bitmap73 = function() {
	this.initialize(img.Bitmap73);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,202,177);


(lib.Bitmap1 = function() {
	this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,97,120);


(lib._5jpegcopy = function() {
	this.initialize(img._5jpegcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,700,450);


(lib.fix = function() {
	this.initialize(img.fix);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,516,564);


(lib.flash0aiAssets = function() {
	this.initialize(img.flash0aiAssets);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,369,180);


(lib.flash0aiAssets_1 = function() {
	this.initialize(img.flash0aiAssets_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,153,152);


(lib.bookpngcopy = function() {
	this.initialize(img.bookpngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,399);


(lib.flash0aiAssets_2 = function() {
	this.initialize(img.flash0aiAssets_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,153,152);


(lib.flash0aiAssets_3 = function() {
	this.initialize(img.flash0aiAssets_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,258);


(lib._17 = function() {
	this.initialize(img._17);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,700,467);// helper functions:

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


(lib.Tween8copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3498DB").s().p("EhB5AkpMAAAhJRMCDzAAAMAAABJRg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-421.8,-234.5,843.6,469.1);


(lib.Tween8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#603AD8").s().p("EhB5AkqMAAAhJSMCDzAAAMAAABJSg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-421.8,-234.5,843.6,469.1);


(lib.Tween7copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3498DB").s().p("EhB5AkpMAAAhJRMCDzAAAMAAABJRg");

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


(lib.pengecoh = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgBAeQgDgEAAgHIAAggIgJAAIAAgHIAJAAIAAgMIAIAAIAAAMIAKAAIAAAHIgKAAIAAAgQAAABAAABQAAAAABABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQABABABAAQAAAAABAAIAEgBIAAAHIgGABQgHAAgCgDg");
	this.shape.setTransform(55.925,100.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgPAWQgFgFAAgKIAAghIAJAAIAAAhQAAANAKAAQAKgBADgHIAAgmIAJAAIAAA0IgJAAIAAgFQgFAGgJAAQgJAAgEgFg");
	this.shape_1.setTransform(51.675,100.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgQAXQgFgEAAgHQAAgIAGgEQAHgEAKgBIAJAAIAAgDQAAgFgDgDQgDgDgFAAQgEAAgDADQgEACAAAEIgJAAQAAgFADgDQADgEAFgCQAEgDAFABQAJAAAFAEQAGAFAAAIIAAAXQAAAHACAFIAAABIgKAAIgBgGQgGAGgIABQgIgBgFgEgAgMAKQAAAFADACQADACAEAAQADABAEgCQAEgDACgEIAAgKIgHAAQgQAAAAAJg");
	this.shape_2.setTransform(46.225,100.65);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgEAmIAAhLIAIAAIAABLg");
	this.shape_3.setTransform(42.25,99.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgEAkIAAg0IAIAAIAAA0gAgDgaQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAAAAAQAAgBABAAQAAAAABgBQAAAAABAAQAAAAAAAAQAAAAABAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgBAAAAABQAAAAgBAAQAAAAgBAAQgBABAAAAQAAAAAAgBQgBAAAAAAQgBAAAAAAQgBgBAAAAg");
	this.shape_4.setTransform(82.375,83.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgPAfQgGgIAAgMIAAgBQAAgLAGgIQAFgHAKAAQAIAAAFAGIAAgbIAJAAIAABKIgIAAIAAgFQgGAGgIAAQgKAAgFgHgAgIgDQgEAEAAAKQAAAJAEAFQADAFAGABQAIgBAEgHIAAgYQgEgHgIAAQgGAAgDAFg");
	this.shape_5.setTransform(78.175,83.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgPAWQgFgFAAgKIAAghIAJAAIAAAhQAAAMAKABQAKgBADgHIAAgmIAJAAIAAA0IgJAAIAAgFQgFAGgJAAQgJAAgEgFg");
	this.shape_6.setTransform(70.225,84.7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgQAXQgFgFAAgGQAAgIAGgEQAHgFAKAAIAJAAIAAgEQAAgEgDgDQgDgDgFAAQgEAAgDACQgEADAAAEIgJAAQAAgFADgDQADgEAFgCQAEgCAFAAQAJgBAFAGQAGAEAAAIIAAAXQAAAIACAEIAAAAIgKAAIgBgFQgGAGgIAAQgIAAgFgEgAgMAKQAAAFADACQADADAEgBQADAAAEgBQAEgDACgEIAAgKIgHAAQgQAAAAAJg");
	this.shape_7.setTransform(64.775,84.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgBAeQgDgEAAgHIAAggIgJAAIAAgHIAJAAIAAgMIAIAAIAAAMIAKAAIAAAHIgKAAIAAAgQAAABAAABQAAAAABABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQABABABAAQAAAAABAAIAEgBIAAAHIgGABQgHAAgCgDg");
	this.shape_8.setTransform(60.275,84.075);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgQAXQgFgFAAgGQAAgIAGgEQAHgFAKAAIAJAAIAAgEQAAgEgDgDQgDgDgFAAQgEAAgDACQgEADAAAEIgJAAQAAgFADgDQADgEAFgCQAEgCAFAAQAJgBAFAGQAGAEAAAIIAAAXQAAAIACAEIAAAAIgKAAIgBgFQgGAGgIAAQgIAAgFgEgAgMAKQAAAFADACQADADAEgBQADAAAEgBQAEgDACgEIAAgKIgHAAQgQAAAAAJg");
	this.shape_9.setTransform(56.075,84.65);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAMAlIAAgjQAAgEgDgDQgDgDgFABQgDAAgEABQgDADgCADIAAAlIgJAAIAAhJIAJAAIAAAcQAGgHAJAAQAQAAABARIAAAjg");
	this.shape_10.setTransform(48.125,83.55);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgQAXQgFgFAAgGQAAgIAGgEQAHgFAKAAIAJAAIAAgEQAAgEgDgDQgDgDgFAAQgEAAgDACQgEADAAAEIgJAAQAAgFADgDQADgEAFgCQAEgCAFAAQAJgBAFAGQAGAEAAAIIAAAXQAAAIACAEIAAAAIgKAAIgBgFQgGAGgIAAQgIAAgFgEgAgMAKQAAAFADACQADADAEgBQADAAAEgBQAEgDACgEIAAgKIgHAAQgQAAAAAJg");
	this.shape_11.setTransform(42.625,84.65);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAMAbIAAgiQAAgFgDgDQgDgDgFAAQgDAAgEACQgDACgCAEIAAAlIgJAAIAAg0IAJAAIAAAHQAGgIAJAAQAQAAABATIAAAig");
	this.shape_12.setTransform(37.175,84.6);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgQAXQgFgFAAgGQAAgIAGgEQAHgFAKAAIAJAAIAAgEQAAgEgDgDQgDgDgFAAQgEAAgDACQgEADAAAEIgJAAQAAgFADgDQADgEAFgCQAEgCAFAAQAJgBAFAGQAGAEAAAIIAAAXQAAAIACAEIAAAAIgKAAIgBgFQgGAGgIAAQgIAAgFgEgAgMAKQAAAFADACQADADAEgBQADAAAEgBQAEgDACgEIAAgKIgHAAQgQAAAAAJg");
	this.shape_13.setTransform(31.675,84.65);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgBAeQgDgEAAgHIAAggIgJAAIAAgHIAJAAIAAgMIAIAAIAAAMIAKAAIAAAHIgKAAIAAAgQAAABAAABQAAAAABABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQABABABAAQAAAAABAAIAEgBIAAAHIgGABQgHAAgCgDg");
	this.shape_14.setTransform(27.175,84.075);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgEAkIAAg0IAIAAIAAA0gAgDgaQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAAAAAQAAgBABAAQAAAAABgBQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgBAAAAABQAAAAgBAAQAAAAgBAAQAAABgBAAQAAAAAAgBQgBAAAAAAQgBAAAAAAQgBgBAAAAg");
	this.shape_15.setTransform(21.975,83.7);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgPAfQgGgIAAgMIAAgBQAAgLAGgIQAFgHAKAAQAIAAAFAGIAAgbIAJAAIAABKIgIAAIAAgFQgGAGgIAAQgKAAgFgHgAgIgDQgEAEAAAKQAAAJAEAFQADAFAGABQAIgBAEgHIAAgYQgEgHgIAAQgGAAgDAFg");
	this.shape_16.setTransform(17.775,83.6);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgVAlIAAhIIAIAAIAAAGQAGgHAJAAQAJAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgJAAgFgGIAAAZgAgMgVIAAAYQAEAHAIAAQAGAAADgFQAEgFAAgJQAAgJgEgFQgDgFgGAAQgIAAgEAHg");
	this.shape_17.setTransform(80.775,69.625);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgPAWQgFgFAAgJIAAgiIAJAAIAAAiQAAAMAKAAQAKAAADgJIAAglIAJAAIAAA0IgJAAIAAgFQgFAGgJAAQgJAAgEgFg");
	this.shape_18.setTransform(75.075,68.7);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgPAfQgGgIAAgMIAAgBQAAgLAGgHQAFgIAKAAQAIAAAFAGIAAgbIAJAAIAABKIgIAAIAAgGQgGAHgIAAQgKAAgFgHgAgIgDQgEAEAAAKQAAAJAEAFQADAFAGABQAIAAAEgJIAAgXQgEgHgIAAQgGAAgDAFg");
	this.shape_19.setTransform(69.375,67.6);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgEAkIAAg0IAIAAIAAA0gAgDgaQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAAAAAQAAgBABAAQAAAAABgBQAAAAABAAQAAAAAAAAQAAAAABAAQABAAAAAAQABABAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQgBABAAAAQAAAAAAgBQgBAAAAAAQgBAAAAAAQgBgBAAAAg");
	this.shape_20.setTransform(65.475,67.7);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAMAlIAAgjQAAgEgDgDQgDgCgFgBQgDAAgEACQgDADgCADIAAAlIgJAAIAAhJIAJAAIAAAcQAGgIAJAAQAQABABARIAAAjg");
	this.shape_21.setTransform(61.525,67.55);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AALAlIgRgYIgGAGIAAASIgJAAIAAhJIAJAAIAAAsIAFgGIAPgRIALAAIgTAWIAWAeg");
	this.shape_22.setTransform(54.075,67.55);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgQAXQgFgEAAgHQAAgJAGgDQAHgFAKABIAJAAIAAgFQAAgEgDgDQgDgDgFAAQgEAAgDACQgEADAAADIgJAAQAAgEADgEQADgDAFgCQAEgCAFgBQAJAAAFAGQAGAEAAAIIAAAXQAAAIACADIAAABIgKAAIgBgFQgGAHgIgBQgIABgFgFgAgMAKQAAAFADACQADACAEAAQADAAAEgCQAEgCACgDIAAgLIgHAAQgQAAAAAJg");
	this.shape_23.setTransform(48.475,68.65);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgPAfQgGgIAAgMIAAgBQAAgLAGgHQAFgIAKAAQAIAAAFAGIAAgbIAJAAIAABKIgIAAIAAgGQgGAHgIAAQgKAAgFgHgAgIgDQgEAEAAAKQAAAJAEAFQADAFAGABQAIAAAEgJIAAgXQgEgHgIAAQgGAAgDAFg");
	this.shape_24.setTransform(42.775,67.6);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgEAkIAAg0IAIAAIAAA0gAgDgaQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgBAAAAABQAAAAgBAAQAAAAgBAAQAAABgBAAQAAAAAAgBQgBAAAAAAQgBAAAAAAQAAgBgBAAg");
	this.shape_25.setTransform(38.875,67.7);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgBAeQgDgEAAgHIAAggIgJAAIAAgHIAJAAIAAgMIAIAAIAAAMIAKAAIAAAHIgKAAIAAAgQAAABAAABQAAAAABABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQABABABAAQAAAAABAAIAEgBIAAAHIgGABQgHAAgCgDg");
	this.shape_26.setTransform(35.875,68.075);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAMAbIAAgiQAAgFgDgDQgDgDgFAAQgDAAgEACQgDADgCAEIAAAkIgJAAIAAg0IAJAAIAAAHQAGgIAJAAQAQAAABATIAAAig");
	this.shape_27.setTransform(29.175,68.6);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgQAXQgFgEAAgHQAAgJAGgDQAHgFAKABIAJAAIAAgFQAAgEgDgDQgDgDgFAAQgEAAgDACQgEADAAADIgJAAQAAgEADgEQADgDAFgCQAEgCAFgBQAJAAAFAGQAGAEAAAIIAAAXQAAAIACADIAAABIgKAAIgBgFQgGAHgIgBQgIABgFgFgAgMAKQAAAFADACQADACAEAAQADAAAEgCQAEgCACgDIAAgLIgHAAQgQAAAAAJg");
	this.shape_28.setTransform(23.675,68.65);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgPAfQgGgIAAgMIAAgBQAAgLAGgHQAFgIAKAAQAIAAAFAGIAAgbIAJAAIAABKIgIAAIAAgGQgGAHgIAAQgKAAgFgHgAgIgDQgEAEAAAKQAAAJAEAFQADAFAGABQAIAAAEgJIAAgXQgEgHgIAAQgGAAgDAFg");
	this.shape_29.setTransform(17.975,67.6);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AALAlIgRgYIgGAGIAAASIgJAAIAAhKIAJAAIAAAtIAFgGIAPgQIALAAIgTAVIAWAeg");
	this.shape_30.setTransform(73.325,51.55);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgEAkIAAg0IAIAAIAAA0gAgDgaQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAAAgBQAAAAABAAQAAAAABgBQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABAAQAAABAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgBAAAAABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAg");
	this.shape_31.setTransform(69.225,51.7);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgBAeQgDgEAAgHIAAggIgJAAIAAgHIAJAAIAAgMIAIAAIAAAMIAKAAIAAAHIgKAAIAAAgQAAABAAABQAAAAABABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQABAAABABQAAAAABAAIAEgBIAAAHIgGABQgHAAgCgDg");
	this.shape_32.setTransform(66.225,52.075);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgJAZQgFgCgDgEQgDgEAAgFIAJAAQAAAFAEACQADADAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgCgCgHgBIgKgEIgGgEQgCgDAAgEQAAgGAGgFQAFgFAHAAQAKABAFAEQAGAFgBAHIgJAAQAAgDgCgDQgEgDgFAAQgDAAgDADQgDABAAAEQAAADACACIAJADIALADQAEACACACQACADAAAFQAAAHgFAEQgGAFgJAAQgGAAgEgDg");
	this.shape_33.setTransform(62.15,52.65);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgQAXQgFgFAAgGQAAgIAGgEQAHgEAKAAIAJAAIAAgFQAAgFgDgCQgDgDgFAAQgEAAgDADQgEACAAADIgJAAQAAgDADgFQADgDAFgCQAEgDAFAAQAJABAFAEQAGAFAAAIIAAAXQAAAHACAEIAAABIgKAAIgBgFQgGAHgIAAQgIAAgFgFgAgMALQAAAEADACQADADAEAAQADAAAEgDQAEgCACgDIAAgLIgHAAQgQAAAAAKg");
	this.shape_34.setTransform(56.875,52.65);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgDAlIAAhKIAIAAIAABKg");
	this.shape_35.setTransform(52.9,51.55);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgNAfIAAAGIgIAAIAAhKIAJAAIAAAcQAFgHAJAAQAJAAAGAIQAFAGAAAMIAAABQAAAMgFAHQgGAIgJAAQgJAAgGgHgAgMAAIAAAWQAEAIAIAAQAGAAAEgEQADgGAAgKQAAgJgDgEQgEgFgGAAQgIAAgEAIg");
	this.shape_36.setTransform(49.025,51.6);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgRAUQgGgHAAgNIAAAAQAAgHADgGQADgGAGgEQAFgEAGAAQAKAAAIAIQAGAHAAAMIAAABQAAAIgDAFQgDAGgGAEQgFAEgHAAQgJAAgIgIgAgKgNQgEAFAAAJQAAAIAEAGQAEAFAGAAQAHAAAEgGQAEgEAAgKQAAgIgEgFQgEgGgHAAQgGAAgEAGg");
	this.shape_37.setTransform(43.25,52.65);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgDAlIAAhKIAHAAIAABKg");
	this.shape_38.setTransform(39.15,51.55);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgVAlIAAhIIAIAAIAAAGQAGgHAJAAQAJAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgJAAgFgGIAAAZgAgMgVIAAAYQAEAHAIAAQAGAAADgFQAEgFAAgJQAAgJgEgFQgDgFgGAAQgIAAgEAHg");
	this.shape_39.setTransform(35.275,53.625);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgEAkIAAg0IAIAAIAAA0gAgDgaQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAAAgBQABAAAAAAQAAAAABgBQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAg");
	this.shape_40.setTransform(31.125,51.7);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgMAbIAAg0IAJAAIAAAHQADgIAJAAIAEABIAAAIIgFAAQgIAAgDAIIAAAkg");
	this.shape_41.setTransform(28.475,52.6);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgBAeQgDgEAAgHIAAggIgJAAIAAgHIAJAAIAAgMIAIAAIAAAMIAKAAIAAAHIgKAAIAAAgQAAABAAABQAAAAABABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQABAAABABQAAAAABAAIAEgBIAAAHIgGABQgHAAgCgDg");
	this.shape_42.setTransform(24.725,52.075);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AALAmIgRgZIgGAGIAAATIgJAAIAAhLIAJAAIAAAtIAFgGIAPgQIALAAIgTAUIAWAgg");
	this.shape_43.setTransform(58.125,35.55);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgQAXQgFgFAAgGQAAgJAGgDQAHgEAKgBIAJAAIAAgDQAAgFgDgDQgDgDgFAAQgEAAgDADQgEACAAADIgJAAQAAgDADgEQADgEAFgCQAEgCAFAAQAJAAAFAEQAGAFAAAIIAAAXQAAAHACAFIAAABIgKAAIgBgGQgGAGgIABQgIgBgFgEgAgMALQAAAEADACQADACAEABQADAAAEgCQAEgDACgEIAAgKIgHAAQgQAAAAAKg");
	this.shape_44.setTransform(52.525,36.65);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgPAeQgGgHAAgMIAAgBQAAgLAGgIQAFgHAKAAQAIAAAFAHIAAgcIAJAAIAABKIgIAAIAAgFQgGAGgIAAQgKAAgFgIgAgIgDQgEAEAAAKQAAAJAEAFQADAGAGgBQAIAAAEgHIAAgXQgEgIgIAAQgGAAgDAFg");
	this.shape_45.setTransform(46.825,35.6);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgEAkIAAg0IAIAAIAAA0gAgDgaQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAgBQABAAAAAAQAAAAABgBQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABAAQAAABAAAAQABABAAAAQAAABAAAAQAAAAAAABQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgBAAAAABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAg");
	this.shape_46.setTransform(42.925,35.7);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgBAeQgDgEAAgHIAAggIgJAAIAAgHIAJAAIAAgMIAIAAIAAAMIAKAAIAAAHIgKAAIAAAgQAAABAAABQAAAAABABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQABAAABABQAAAAABAAIAEgBIAAAHIgGABQgHAAgCgDg");
	this.shape_47.setTransform(39.925,36.075);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AAMAmIAAgkQAAgEgDgDQgDgDgFABQgDAAgEABQgDADgCADIAAAmIgJAAIAAhKIAJAAIAAAcQAGgHAJAAQAQAAABARIAAAkg");
	this.shape_48.setTransform(78.075,19.55);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgPAWQgFgFAAgKIAAghIAJAAIAAAhQAAANAKAAQAKgBADgHIAAgmIAJAAIAAA0IgJAAIAAgFQgFAGgJAAQgJAAgEgFg");
	this.shape_49.setTransform(72.525,20.7);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgNAfIAAAGIgIAAIAAhKIAJAAIAAAcQAFgHAJAAQAJAAAGAHQAFAHAAAMIAAABQAAAMgFAIQgGAHgJAAQgJAAgGgHgAgMAAIAAAWQAEAJAIAAQAGgBAEgFQADgEAAgLQAAgJgDgEQgEgFgGAAQgIAAgEAIg");
	this.shape_50.setTransform(67.125,19.6);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgPAWQgFgFAAgKIAAghIAJAAIAAAhQAAANAKAAQAKgBADgHIAAgmIAJAAIAAA0IgJAAIAAgFQgFAGgJAAQgJAAgEgFg");
	this.shape_51.setTransform(61.425,20.7);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgBAeQgDgEAAgHIAAggIgJAAIAAgHIAJAAIAAgMIAIAAIAAAMIAKAAIAAAHIgKAAIAAAgQAAABAAABQAAAAABABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQABABABAAQAAAAABAAIAEgBIAAAHIgGABQgHAAgCgDg");
	this.shape_52.setTransform(56.925,20.075);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AAMAbIAAgiQAAgFgDgDQgDgDgFAAQgDAAgEACQgDACgCAEIAAAlIgJAAIAAg0IAJAAIAAAHQAGgIAJAAQAQAAABATIAAAig");
	this.shape_53.setTransform(50.225,20.6);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgQAXQgFgEAAgHQAAgIAGgEQAHgFAKAAIAJAAIAAgDQAAgFgDgDQgDgDgFAAQgEAAgDACQgEADAAAEIgJAAQAAgFADgDQADgEAFgCQAEgDAFABQAJAAAFAEQAGAFAAAIIAAAXQAAAHACAFIAAABIgKAAIgBgGQgGAGgIAAQgIAAgFgEgAgMAKQAAAFADACQADADAEgBQADAAAEgBQAEgDACgEIAAgKIgHAAQgQAAAAAJg");
	this.shape_54.setTransform(44.725,20.65);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgKAZQgEgCgDgEQgDgEAAgFIAJAAQABAFADADQADACAFAAQAFAAADgCQADgCAAgEQAAgDgDgCQgCgCgHgCIgKgDIgGgEQgCgDAAgEQAAgGAGgFQAFgEAHAAQAKAAAFAEQAGAFAAAHIgJAAQgBgDgDgDQgCgDgGAAQgEAAgCACQgDADAAADQAAADACACIAJADIALADQAEABACADQACADAAAFQAAAHgFAEQgGAEgJAAQgGAAgFgCg");
	this.shape_55.setTransform(39.4,20.65);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgEAkIAAg0IAIAAIAAA0gAgDgaQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAABQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAABgBAAQAAAAAAgBQgBAAAAAAQgBAAAAAAQAAgBgBAAg");
	this.shape_56.setTransform(35.625,19.7);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgVAlIAAhIIAIAAIAAAGQAGgHAJAAQAJAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgJAAgFgGIAAAZgAgMgVIAAAYQAEAHAIAAQAGAAADgFQAEgFAAgJQAAgJgEgFQgDgFgGAAQgIAAgEAHg");
	this.shape_57.setTransform(31.725,21.625);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgQAXQgFgEAAgHQAAgIAGgEQAHgFAKAAIAJAAIAAgDQAAgFgDgDQgDgDgFAAQgEAAgDACQgEADAAAEIgJAAQAAgFADgDQADgEAFgCQAEgDAFABQAJAAAFAEQAGAFAAAIIAAAXQAAAHACAFIAAABIgKAAIgBgGQgGAGgIAAQgIAAgFgEgAgMAKQAAAFADACQADADAEgBQADAAAEgBQAEgDACgEIAAgKIgHAAQgQAAAAAJg");
	this.shape_58.setTransform(26.075,20.65);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgUAkIAAhHIAJAAIAAA/IAhAAIAAAIg");
	this.shape_59.setTransform(20.95,19.75);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().s("#FFFFFF").ss(3,1,1).p("AntpVIPbAAIAASrIvbAAg");
	this.shape_60.setTransform(49.35,59.825);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#16A085").s().p("AntJWIAAyrIPbAAIAASrg");
	this.shape_61.setTransform(49.35,59.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.pengecoh, new cjs.Rectangle(-1.5,-1.5,101.7,122.7), null);


(lib.lingker = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(255,0,0,0.937)").ss(5,1,1).p("ADdFFQkGCzj7AgQj6AghciHQhciHB5jeQB6jcEHizQEGi0D6gfQD7ggBcCGQBcCHh6DeQh4DdkICzg");
	this.shape.setTransform(0.0123,-0.0009);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.lingker, new cjs.Rectangle(-69.9,-56.6,139.9,113.30000000000001), null);


(lib.kotakJawaban1copy2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAPA4IAAgzQAAgHgEgDQgDgEgHAAQgKAAgFAJIAAA4IgSAAIAAhvIASAAIAAAqQAJgKAMAAQAZAAABAbIAAA0g");
	this.shape.setTransform(160.575,30.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgaAeQgKgMAAgSIAAAAQAAgMAFgJQAEgJAJgFQAIgFAKAAQAQAAAKAKQAKAKABARIAAAEQAAALgFAKQgEAJgJAFQgIAFgLAAQgQAAgKgLgAgNgTQgFAHAAANQAAAMAFAHQAFAHAIAAQAJAAAFgHQAFgIAAgMQAAgMgFgHQgFgHgJAAQgIAAgFAHg");
	this.shape_1.setTransform(152.125,31.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgXAeQgKgKAAgTIAAgCQAAgRAKgMQAJgKAQAAQAOAAAJAIQAJAIAAANIgRAAQAAgGgEgFQgFgEgGAAQgIAAgFAGQgEAHAAAMIAAACQAAANAEAHQAFAGAIAAQAHAAAEgEQAEgEAAgGIARAAQAAAIgEAGQgFAGgHAEQgIAEgIAAQgPAAgKgLg");
	this.shape_2.setTransform(144,31.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgYAfQgKgLAAgSIAAgCQAAgLAFgKQAEgJAIgFQAJgFAJAAQAQAAAJAKQAJAKAAATIAAAGIgzAAQABALAFAFQAGAGAIAAQANAAAHgKIAKAJQgFAHgIAEQgIAEgKAAQgQAAgLgKgAgKgVQgFAFgBAKIAhAAIAAgCQAAgJgEgFQgFgEgHAAQgGAAgFAFg");
	this.shape_3.setTransform(136.05,31.95);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgRA0QgIgDgFgGIAJgLQAIAKAMAAQAIAAAFgFQAFgFAAgJIAAgFQgHAIgNAAQgOAAgIgLQgJgLAAgSQAAgTAJgLQAIgLAOAAQAOAAAHAJIABgHIAQAAIAABLQAAAQgKAJQgKAJgPAAQgJAAgIgEgAgMghQgEAHAAANQAAAMAEAGQAGAHAHAAQALAAAFgKIAAghQgFgJgKAAQgIAAgGAHg");
	this.shape_4.setTransform(127.55,33.425);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAPAoIAAgyQAAgIgDgDQgEgEgHAAQgKAAgFAKIAAA3IgSAAIAAhOIARAAIAAAJQAJgKANAAQAZAAABAcIAAAzg");
	this.shape_5.setTransform(119.275,31.875);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgXAfQgLgLAAgSIAAgCQAAgLAEgKQAFgJAJgFQAIgFAJAAQAQAAAJAKQAJAKAAATIAAAGIgzAAQABALAFAFQAHAGAHAAQAMAAAIgKIAJAJQgEAHgIAEQgIAEgKAAQgQAAgKgKgAgKgVQgFAFAAAKIAgAAIAAgCQgBgJgDgFQgEgEgIAAQgGAAgFAFg");
	this.shape_6.setTransform(111.15,31.95);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgiA4IAAhtIARAAIAAAIQAIgKANAAQAOAAAJALQAIALAAATIAAABQAAASgJAKQgIAMgOAAQgMAAgIgJIAAAmgAgQgfIAAAiQAFAJALAAQAHABAFgIQAFgFAAgOQAAgMgFgHQgEgHgIAAQgLAAgFAJg");
	this.shape_7.setTransform(102.975,33.4);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAPAoIAAgyQAAgIgDgDQgEgEgHAAQgKAAgFAKIAAA3IgSAAIAAhOIARAAIAAAJQAJgKANAAQAZAAABAcIAAAzg");
	this.shape_8.setTransform(90.675,31.875);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgZAiQgIgHAAgKQAAgNAKgFQAJgHARAAIAKAAIAAgFQAAgGgDgEQgEgEgGAAQgFABgFADQgDADAAAEIgSAAQAAgGAEgGQAEgGAIgDQAIgDAIAAQAOAAAHAHQAJAHAAANIAAAiQAAALADAHIAAABIgSAAIgCgIQgJAJgLAAQgMAAgHgHgAgKAFQgFAEAAAGQAAAGADACQADADAGAAQAFAAAEgCQAFgDACgEIAAgOIgKAAQgIAAgFACg");
	this.shape_9.setTransform(82.45,31.95);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgRAvIgBAJIgQAAIAAhwIASAAIAAApQAIgJAMAAQAOAAAJAKQAIAMAAARIAAACQAAASgIALQgJALgOAAQgNAAgIgKgAgQAAIAAAgQAFALALgBQAIABAEgHQAFgGAAgMIAAgDQAAgNgEgFQgFgHgIABQgLAAgFAJg");
	this.shape_10.setTransform(74.325,30.35);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgZAiQgIgHAAgKQAAgNAKgFQAJgHARAAIAKAAIAAgFQABgGgEgEQgEgEgGAAQgGABgDADQgFADAAAEIgRAAQAAgGAEgGQAEgGAIgDQAHgDAJAAQAOAAAHAHQAJAHAAANIAAAiQAAALADAHIAAABIgSAAIgCgIQgJAJgLAAQgMAAgHgHgAgKAFQgFAEAAAGQAAAGADACQAEADAFAAQAFAAAEgCQAFgDACgEIAAgOIgKAAQgIAAgFACg");
	this.shape_11.setTransform(65.9,31.95);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AARAoIgRg2IgQA2IgPAAIgVhPIASAAIAMA1IARg1IAMAAIAQA2IANg2IARAAIgWBPg");
	this.shape_12.setTransform(56.25,31.95);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgZAiQgIgHAAgKQAAgNAJgFQAKgHAQAAIALAAIAAgFQABgGgEgEQgEgEgGAAQgGABgDADQgFADAAAEIgRAAQAAgGAEgGQAFgGAHgDQAHgDAJAAQAOAAAHAHQAJAHAAANIAAAiQAAALADAHIAAABIgSAAIgCgIQgJAJgLAAQgMAAgHgHgAgKAFQgFAEAAAGQAAAGADACQAEADAFAAQAEAAAGgCQAEgDACgEIAAgOIgKAAQgIAAgFACg");
	this.shape_13.setTransform(46.65,31.95);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgZAtQgJgIAAgPIATAAQAAAJAEAEQAEAEAHAAQAHAAAFgEQAEgFAAgKIAAhJIATAAIAABJQAAAQgKAJQgJAJgQAAQgQAAgJgJg");
	this.shape_14.setTransform(38.075,30.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#DB4C4B").s().p("AviEzIAAplIfFAAIAAJlg");
	this.shape_15.setTransform(99.525,30.675);

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.kotakJawaban1copy2, new cjs.Rectangle(0,0,199.1,61.4), null);


(lib.kotakJawaban1copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAPA4IAAgzQAAgHgEgDQgDgEgHAAQgKAAgFAJIAAA4IgSAAIAAhvIASAAIAAAqQAJgKAMAAQAZAAABAbIAAA0g");
	this.shape.setTransform(157.225,41.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgaAiQgHgHAAgJQAAgOAJgFQAKgHAQAAIAMAAIAAgFQAAgHgEgDQgEgEgGABQgFAAgEACQgEADgBAFIgRAAQAAgHAEgFQAFgGAHgDQAHgDAIAAQAOAAAJAHQAIAHAAAMIAAAjQAAALADAGIAAABIgSAAIgCgHQgJAJgLAAQgMAAgIgHgAgKAFQgFAEAAAGQAAAGAEACQACAEAHAAQADAAAGgDQAEgDADgEIAAgOIgLAAQgIAAgFACg");
	this.shape_1.setTransform(149,42.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAPAoIAAgyQAAgIgDgDQgEgEgHAAQgKAAgFAKIAAA3IgSAAIAAhOIARAAIAAAJQAJgKANAAQAZAAABAcIAAAzg");
	this.shape_2.setTransform(140.775,42.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgaAiQgHgHAAgJQAAgOAKgFQAJgHARAAIALAAIAAgFQgBgHgDgDQgDgEgHABQgGAAgEACQgDADAAAFIgSAAQAAgHAEgFQAEgGAIgDQAIgDAHAAQAOAAAJAHQAIAHAAAMIAAAjQAAALADAGIAAABIgSAAIgCgHQgIAJgMAAQgMAAgIgHgAgKAFQgFAEAAAGQAAAGAEACQACAEAHAAQAEAAAEgDQAFgDADgEIAAgOIgKAAQgJAAgFACg");
	this.shape_3.setTransform(132.55,42.95);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJAcIAAgsIgNAAIAAgOIANAAIAAgTIARAAIAAATIAOAAIAAAOIgOAAIAAArQAAAEACACQACACAEAAIAHAAIAAANIgMACQgUAAAAgWg");
	this.shape_4.setTransform(125.825,42.05);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgIA3IAAhOIARAAIAABOgAgGglQgDgDAAgEQAAgEADgDQACgDAEAAQAFAAACADQADADAAAEQAAAEgDADQgCACgFAAQgEAAgCgCg");
	this.shape_5.setTransform(117.825,41.425);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgZAuQgJgMABgSQgBgSAJgLQAJgLAOAAQALAAAIAIIAAgoIARAAIAABvIgQAAIgBgIQgHAKgMAAQgOAAgJgLgAgLgDQgFAGAAAOQAAAMAFAHQAEAGAIABQALgBAFgJIAAghQgFgJgLAAQgIAAgEAGg");
	this.shape_6.setTransform(111.5,41.35);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgiA4IAAhtIARAAIAAAIQAIgJANAAQAOAAAJAKQAIALAAATIAAABQAAARgJAMQgIAKgOABQgMAAgIgJIAAAmgAgQgfIAAAiQAFAJALAAQAHABAFgIQAFgFAAgPQAAgLgFgHQgEgHgIAAQgLAAgFAJg");
	this.shape_7.setTransform(99.625,44.4);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgZAhQgHgIAAgOIAAgyIASAAIAAAyQAAAPANAAQAMAAAEgKIAAg3IASAAIAABOIgRAAIAAgIQgIAJgOAAQgNAAgGgHg");
	this.shape_8.setTransform(91.05,43.025);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgZAuQgJgMAAgSQAAgSAJgLQAIgLAPAAQALAAAIAIIAAgoIARAAIAABvIgQAAIgBgIQgHAKgMAAQgPAAgIgLgAgLgDQgFAGAAAOQAAAMAFAHQAFAGAHABQALgBAFgJIAAghQgFgJgLAAQgHAAgFAGg");
	this.shape_9.setTransform(82.5,41.35);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgIA3IAAhOIARAAIAABOgAgGglQgDgDAAgEQAAgEADgDQACgDAEAAQAFAAACADQADADAAAEQAAAEgDADQgCACgFAAQgEAAgCgCg");
	this.shape_10.setTransform(76.525,41.425);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAPA4IAAgzQAAgHgEgDQgDgEgHAAQgKAAgFAJIAAA4IgSAAIAAhvIASAAIAAAqQAJgKAMAAQAZAAABAbIAAA0g");
	this.shape_11.setTransform(70.425,41.275);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAPAoIAAgyQAAgIgDgDQgEgEgHAAQgKAAgFAKIAAA3IgSAAIAAhOIARAAIAAAJQAJgKANAAQAZAAABAcIAAAzg");
	this.shape_12.setTransform(58.325,42.875);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgaAiQgHgHAAgJQAAgOAJgFQAKgHAQAAIAMAAIAAgFQAAgHgEgDQgDgEgHABQgFAAgFACQgDADAAAFIgSAAQAAgHAEgFQAEgGAIgDQAIgDAHAAQAOAAAJAHQAIAHAAAMIAAAjQAAALADAGIAAABIgSAAIgCgHQgIAJgMAAQgMAAgIgHgAgKAFQgFAEAAAGQAAAGAEACQACAEAHAAQAEAAAFgDQAEgDADgEIAAgOIgKAAQgJAAgFACg");
	this.shape_13.setTransform(50.1,42.95);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgZAuQgJgMAAgSQAAgSAJgLQAJgLAOAAQALAAAIAIIAAgoIARAAIAABvIgQAAIgBgIQgHAKgMAAQgOAAgJgLgAgLgDQgFAGAAAOQAAAMAFAHQAFAGAHABQALgBAFgJIAAghQgFgJgLAAQgHAAgFAGg");
	this.shape_14.setTransform(41.65,41.35);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AAOA4IgWgiIgIAIIAAAaIgSAAIAAhvIASAAIAABAIAFgHIAWgYIAVAAIgdAgIAgAug");
	this.shape_15.setTransform(185.3,19.275);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgIA3IAAhOIARAAIAABOgAgGglQgDgDAAgEQAAgEADgDQACgDAEAAQAFAAACADQADADAAAEQAAAEgDADQgCACgFAAQgEAAgCgCg");
	this.shape_16.setTransform(178.975,19.425);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgJAbIAAgsIgNAAIAAgMIANAAIAAgUIARAAIAAAUIAOAAIAAAMIgOAAIAAArQAAAFACACQACACAEAAIAHgBIAAAPIgMABQgUAAAAgXg");
	this.shape_17.setTransform(174.375,20.05);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgQAlQgHgDgFgGQgEgHAAgGIASAAQAAAGAEADQAFADAGAAQAHAAAEgCQADgDAAgEQAAgFgEgDQgEgCgIgBQgJgCgGgEQgNgFAAgMQAAgKAJgIQAIgGAMAAQAPAAAIAHQAJAHAAALIgSAAQAAgFgDgDQgEgEgHAAQgEAAgEADQgEACAAAFQAAAEAEACQADADAKACQAKACAGADQAGACADAFQADAFAAAGQAAAKgJAHQgJAHgOAAQgJAAgIgEg");
	this.shape_18.setTransform(168.125,20.95);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgaAiQgHgHAAgKQAAgNAJgFQAKgHAQAAIAMAAIAAgFQAAgHgEgDQgEgDgGgBQgFAAgEAEQgEADgBAEIgRAAQAAgHAEgFQAFgGAHgDQAHgDAIAAQAOAAAJAHQAIAHAAANIAAAiQAAALADAHIAAABIgSAAIgCgIQgJAJgLAAQgMAAgIgHgAgKAGQgFADAAAGQAAAFAEAEQACACAHAAQADABAGgDQAEgDADgEIAAgOIgLAAQgIAAgFADg");
	this.shape_19.setTransform(160.25,20.95);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgIA4IAAhvIARAAIAABvg");
	this.shape_20.setTransform(154.275,19.275);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgRAvIgBAJIgQAAIAAhwIASAAIAAApQAIgJAMAAQAOAAAJALQAIALAAARIAAABQAAATgIALQgJALgOAAQgNAAgIgKgAgQAAIAAAgQAFAKALAAQAIAAAEgGQAFgGAAgNIAAgCQAAgNgEgFQgFgHgIAAQgLABgFAJg");
	this.shape_21.setTransform(148.275,19.35);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgaAeQgKgMAAgSIAAAAQAAgLAFgKQAEgJAJgFQAIgFAKAAQAQAAAKAKQAKALABARIAAACQAAAMgFAKQgEAJgJAFQgIAFgLAAQgQAAgKgLgAgNgTQgFAHAAAMQAAANAFAHQAFAHAIAAQAJAAAFgIQAFgGAAgNQAAgMgFgHQgFgHgJAAQgIAAgFAHg");
	this.shape_22.setTransform(139.625,20.95);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgIA4IAAhvIARAAIAABvg");
	this.shape_23.setTransform(133.425,19.275);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgiA4IAAhtIARAAIAAAIQAIgKANAAQAOAAAJALQAIALAAATIAAABQAAASgJAKQgIALgOAAQgMABgIgJIAAAmgAgQgfIAAAiQAFAKALAAQAHAAAFgIQAFgGAAgNQAAgMgFgHQgEgHgIAAQgLAAgFAJg");
	this.shape_24.setTransform(127.425,22.4);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgIA3IAAhOIARAAIAABOgAgGglQgDgDAAgEQAAgEADgDQACgDAEAAQAFAAACADQADADAAAEQAAAEgDADQgCACgFAAQgEAAgCgCg");
	this.shape_25.setTransform(121.125,19.425);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgUAoIAAhOIARAAIABAJQAFgKAMAAIAGABIAAAQIgHAAQgNAAgDAJIAAA1g");
	this.shape_26.setTransform(116.925,20.875);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgJAbIAAgsIgNAAIAAgMIANAAIAAgUIARAAIAAAUIAOAAIAAAMIgOAAIAAArQAAAFACACQACACAEAAIAHgBIAAAPIgMABQgUAAAAgXg");
	this.shape_27.setTransform(111.275,20.05);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AAPA4IAAgzQAAgHgEgDQgDgEgHAAQgKAAgFAJIAAA4IgSAAIAAhvIASAAIAAAqQAJgKAMAAQAZAAABAbIAAA0g");
	this.shape_28.setTransform(101.025,19.275);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgZAhQgHgIAAgOIAAgyIASAAIAAAyQAAAPANAAQAMAAAEgKIAAg3IASAAIAABOIgRAAIAAgIQgIAJgOAAQgNAAgGgHg");
	this.shape_29.setTransform(92.65,21.025);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgRAvIgBAJIgQAAIAAhwIASAAIAAApQAIgJAMAAQAOAAAJALQAIALAAARIAAABQAAATgIALQgJALgOAAQgNAAgIgKgAgQAAIAAAgQAFAKALAAQAIAAAEgGQAFgGAAgNIAAgCQAAgNgEgFQgFgHgIAAQgLABgFAJg");
	this.shape_30.setTransform(84.425,19.35);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgZAhQgHgIAAgOIAAgyIASAAIAAAyQAAAPAMAAQANAAAEgKIAAg3IASAAIAABOIgRAAIAAgIQgIAJgNAAQgOAAgGgHg");
	this.shape_31.setTransform(75.85,21.025);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgJAbIAAgsIgNAAIAAgMIANAAIAAgUIARAAIAAAUIAOAAIAAAMIgOAAIAAArQAAAFACACQACACAEAAIAHgBIAAAPIgMABQgUAAAAgXg");
	this.shape_32.setTransform(69.025,20.05);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AAPAoIAAgyQAAgIgDgDQgEgEgHAAQgKAAgFAKIAAA3IgSAAIAAhOIARAAIAAAJQAJgKANAAQAZAAABAcIAAAzg");
	this.shape_33.setTransform(58.775,20.875);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgaAiQgHgHAAgKQAAgNAJgFQAKgHAQAAIAMAAIAAgFQAAgHgEgDQgDgDgHgBQgFAAgEAEQgEADAAAEIgSAAQAAgHAEgFQAEgGAIgDQAIgDAHAAQAOAAAJAHQAIAHAAANIAAAiQAAALADAHIAAABIgSAAIgCgIQgIAJgMAAQgMAAgIgHgAgKAGQgFADAAAGQAAAFAEAEQACACAHAAQAEABAFgDQAEgDADgEIAAgOIgKAAQgJAAgFADg");
	this.shape_34.setTransform(50.55,20.95);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgQAlQgHgDgFgGQgEgHAAgGIASAAQAAAGAEADQAFADAGAAQAHAAAEgCQADgDAAgEQAAgFgEgDQgEgCgIgBQgJgCgGgEQgNgFAAgMQAAgKAJgIQAIgGAMAAQAPAAAIAHQAJAHAAALIgSAAQAAgFgDgDQgEgEgHAAQgEAAgEADQgEACAAAFQAAAEAEACQADADAKACQAKACAGADQAGACADAFQADAFAAAGQAAAKgJAHQgJAHgOAAQgJAAgIgEg");
	this.shape_35.setTransform(42.575,20.95);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgIA3IAAhOIARAAIAABOgAgGglQgDgDAAgEQAAgEADgDQACgDAEAAQAFAAACADQADADAAAEQAAAEgDADQgCACgFAAQgEAAgCgCg");
	this.shape_36.setTransform(36.825,19.425);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgiA4IAAhtIARAAIAAAIQAIgKANAAQAOAAAJALQAIALAAATIAAABQAAASgJAKQgIALgOAAQgMABgIgJIAAAmgAgQgfIAAAiQAFAKALAAQAHAAAFgIQAFgGAAgNQAAgMgFgHQgEgHgIAAQgLAAgFAJg");
	this.shape_37.setTransform(30.825,22.4);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgaAiQgHgHAAgKQAAgNAKgFQAJgHARAAIALAAIAAgFQgBgHgDgDQgDgDgHgBQgFAAgFAEQgDADAAAEIgSAAQAAgHAEgFQAFgGAHgDQAIgDAHAAQAOAAAJAHQAIAHAAANIAAAiQAAALADAHIAAABIgSAAIgCgIQgIAJgMAAQgMAAgIgHgAgKAGQgFADAAAGQAAAFADAEQAEACAFAAQAEABAFgDQAFgDADgEIAAgOIgKAAQgJAAgFADg");
	this.shape_38.setTransform(22.4,20.95);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AghA1IAAhpIATAAIAABaIAwAAIAAAPg");
	this.shape_39.setTransform(14.7,19.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#DB4C4B").s().p("AviEzIAAplIfFAAIAAJlg");
	this.shape_40.setTransform(99.525,30.675);

	this.timeline.addTween(cjs.Tween.get(this.shape_40).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.kotakJawaban1copy, new cjs.Rectangle(0,0,199.1,61.4), null);


(lib.kotakJawaban1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAcIAAgsIgNAAIAAgOIANAAIAAgTIARAAIAAATIAOAAIAAAOIgOAAIAAArQAAAEACACQACACAEAAIAHAAIAAANIgMACQgUAAAAgWg");
	this.shape.setTransform(152.425,42.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgZAhQgHgIAAgOIAAgyIASAAIAAAyQAAAPAMAAQAMAAAFgKIAAg3IASAAIAABOIgRAAIgBgIQgHAJgNAAQgNAAgHgHg");
	this.shape_1.setTransform(145.9,43.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgZAiQgIgHAAgJQAAgOAKgFQAJgHARAAIALAAIAAgFQgBgHgDgDQgDgEgHABQgFAAgFACQgDADAAAFIgSAAQAAgHAEgFQAFgGAHgDQAIgDAIAAQANAAAIAHQAJAHAAAMIAAAjQAAALADAGIAAABIgSAAIgCgHQgJAJgLAAQgMAAgHgHgAgKAFQgFAEAAAGQAAAGADACQAEAEAFAAQAEAAAFgDQAFgDADgEIAAgOIgKAAQgJAAgFACg");
	this.shape_2.setTransform(137.7,42.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgIA4IAAhvIARAAIAABvg");
	this.shape_3.setTransform(131.725,41.275);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgIA3IAAhOIARAAIAABOgAgGglQgDgDAAgEQAAgEADgDQACgDAEAAQAFAAACADQADADAAAEQAAAEgDADQgCACgFAAQgEAAgCgCg");
	this.shape_4.setTransform(124.125,41.425);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgZAuQgJgMABgSQgBgSAJgLQAJgLANAAQAMAAAIAIIAAgoIARAAIAABvIgQAAIgBgIQgHAKgNAAQgNAAgJgLgAgLgDQgFAGAAAOQAAAMAFAHQAEAGAIABQALgBAFgJIAAghQgFgJgLAAQgIAAgEAGg");
	this.shape_5.setTransform(117.8,41.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgiA4IAAhtIARAAIAAAIQAIgJANAAQAOAAAJAKQAIALAAATIAAABQAAARgJAMQgIAKgOABQgMAAgIgJIAAAmgAgQgfIAAAiQAFAJALAAQAHABAFgIQAFgFAAgPQAAgLgFgHQgEgHgIAAQgLAAgFAJg");
	this.shape_6.setTransform(105.925,44.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgZAhQgHgIAAgOIAAgyIASAAIAAAyQAAAPANAAQAMAAAEgKIAAg3IASAAIAABOIgRAAIAAgIQgIAJgOAAQgNAAgGgHg");
	this.shape_7.setTransform(97.35,43.025);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgZAuQgJgMAAgSQAAgSAJgLQAIgLAPAAQALAAAIAIIAAgoIASAAIAABvIgRAAIgBgIQgHAKgMAAQgPAAgIgLgAgLgDQgFAGAAAOQAAAMAFAHQAFAGAHABQALgBAFgJIAAghQgFgJgLAAQgHAAgFAGg");
	this.shape_8.setTransform(88.8,41.35);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgIA3IAAhOIARAAIAABOgAgGglQgDgDAAgEQAAgEADgDQACgDAEAAQAFAAACADQADADAAAEQAAAEgDADQgCACgFAAQgEAAgCgCg");
	this.shape_9.setTransform(82.825,41.425);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAPA4IAAgzQAAgHgEgDQgDgEgHAAQgKAAgFAJIAAA4IgSAAIAAhvIASAAIAAAqQAJgKAMAAQAZAAABAbIAAA0g");
	this.shape_10.setTransform(76.725,41.275);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAPAoIAAgyQAAgIgDgDQgEgEgHAAQgKAAgFAKIAAA3IgSAAIAAhOIARAAIAAAJQAJgKANAAQAZAAABAcIAAAzg");
	this.shape_11.setTransform(64.625,42.875);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgaAiQgHgHAAgJQAAgOAJgFQAKgHAQAAIAMAAIAAgFQAAgHgEgDQgDgEgHABQgFAAgFACQgDADAAAFIgSAAQAAgHAEgFQAEgGAIgDQAIgDAHAAQAOAAAJAHQAIAHAAAMIAAAjQAAALADAGIAAABIgSAAIgCgHQgIAJgMAAQgMAAgIgHgAgKAFQgFAEAAAGQAAAGAEACQACAEAHAAQAEAAAFgDQAEgDADgEIAAgOIgKAAQgJAAgFACg");
	this.shape_12.setTransform(56.4,42.95);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgZAuQgJgMAAgSQAAgSAJgLQAJgLAOAAQALAAAIAIIAAgoIARAAIAABvIgQAAIgBgIQgHAKgMAAQgOAAgJgLgAgLgDQgFAGAAAOQAAAMAFAHQAFAGAHABQALgBAFgJIAAghQgFgJgLAAQgHAAgFAGg");
	this.shape_13.setTransform(47.95,41.35);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAOA4IgWgiIgIAIIAAAaIgSAAIAAhvIASAAIAABAIAFgHIAWgYIAVAAIgdAgIAgAug");
	this.shape_14.setTransform(185.3,19.275);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgIA3IAAhOIARAAIAABOgAgGglQgDgDAAgEQAAgEADgDQACgDAEAAQAFAAACADQADADAAAEQAAAEgDADQgCACgFAAQgEAAgCgCg");
	this.shape_15.setTransform(178.975,19.425);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgJAbIAAgsIgNAAIAAgMIANAAIAAgUIARAAIAAAUIAOAAIAAAMIgOAAIAAArQAAAFACACQACACAEAAIAHgBIAAAPIgMABQgUAAAAgXg");
	this.shape_16.setTransform(174.375,20.05);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgQAlQgHgDgFgGQgEgHAAgGIASAAQAAAGAEADQAFADAGAAQAHAAAEgCQADgDAAgEQAAgFgEgDQgEgCgIgBQgJgCgGgEQgNgFAAgMQAAgKAJgIQAIgGAMAAQAPAAAIAHQAJAHAAALIgSAAQAAgFgDgDQgEgEgHAAQgEAAgEADQgEACAAAFQAAAEAEACQADADAKACQAKACAGADQAGACADAFQADAFAAAGQAAAKgJAHQgJAHgOAAQgJAAgIgEg");
	this.shape_17.setTransform(168.125,20.95);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgaAiQgHgHAAgKQAAgNAJgFQAKgHAQAAIAMAAIAAgFQAAgHgEgDQgEgDgGgBQgFAAgEAEQgEADgBAEIgRAAQAAgHAEgFQAFgGAHgDQAHgDAIAAQAOAAAJAHQAIAHAAANIAAAiQAAALADAHIAAABIgSAAIgCgIQgJAJgLAAQgMAAgIgHgAgKAGQgFADAAAGQAAAFAEAEQACACAHAAQADABAGgDQAEgDADgEIAAgOIgLAAQgIAAgFADg");
	this.shape_18.setTransform(160.25,20.95);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgIA4IAAhvIARAAIAABvg");
	this.shape_19.setTransform(154.275,19.275);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgRAvIgBAJIgQAAIAAhwIASAAIAAApQAIgJAMAAQAOAAAJALQAIALAAARIAAABQAAATgIALQgJALgOAAQgNAAgIgKgAgQAAIAAAgQAFAKALAAQAIAAAEgGQAFgGAAgNIAAgCQAAgNgEgFQgFgHgIAAQgLABgFAJg");
	this.shape_20.setTransform(148.275,19.35);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgaAeQgKgMAAgSIAAAAQAAgLAFgKQAEgJAJgFQAIgFAKAAQAQAAAKAKQAKALABARIAAACQAAAMgFAKQgEAJgJAFQgIAFgLAAQgQAAgKgLgAgNgTQgFAHAAAMQAAANAFAHQAFAHAIAAQAJAAAFgIQAFgGAAgNQAAgMgFgHQgFgHgJAAQgIAAgFAHg");
	this.shape_21.setTransform(139.625,20.95);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgIA4IAAhvIARAAIAABvg");
	this.shape_22.setTransform(133.425,19.275);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgiA4IAAhtIARAAIAAAIQAIgKANAAQAOAAAJALQAIALAAATIAAABQAAASgJAKQgIALgOAAQgMABgIgJIAAAmgAgQgfIAAAiQAFAKALAAQAHAAAFgIQAFgGAAgNQAAgMgFgHQgEgHgIAAQgLAAgFAJg");
	this.shape_23.setTransform(127.425,22.4);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgIA3IAAhOIARAAIAABOgAgGglQgDgDAAgEQAAgEADgDQACgDAEAAQAFAAACADQADADAAAEQAAAEgDADQgCACgFAAQgEAAgCgCg");
	this.shape_24.setTransform(121.125,19.425);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgUAoIAAhOIARAAIABAJQAFgKAMAAIAGABIAAAQIgHAAQgNAAgDAJIAAA1g");
	this.shape_25.setTransform(116.925,20.875);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgJAbIAAgsIgNAAIAAgMIANAAIAAgUIARAAIAAAUIAOAAIAAAMIgOAAIAAArQAAAFACACQACACAEAAIAHgBIAAAPIgMABQgUAAAAgXg");
	this.shape_26.setTransform(111.275,20.05);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAPA4IAAgzQAAgHgEgDQgDgEgHAAQgKAAgFAJIAAA4IgSAAIAAhvIASAAIAAAqQAJgKAMAAQAZAAABAbIAAA0g");
	this.shape_27.setTransform(101.025,19.275);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgZAhQgHgIAAgOIAAgyIASAAIAAAyQAAAPANAAQAMAAAEgKIAAg3IASAAIAABOIgRAAIAAgIQgIAJgOAAQgNAAgGgHg");
	this.shape_28.setTransform(92.65,21.025);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgRAvIgBAJIgQAAIAAhwIASAAIAAApQAIgJAMAAQAOAAAJALQAIALAAARIAAABQAAATgIALQgJALgOAAQgNAAgIgKgAgQAAIAAAgQAFAKALAAQAIAAAEgGQAFgGAAgNIAAgCQAAgNgEgFQgFgHgIAAQgLABgFAJg");
	this.shape_29.setTransform(84.425,19.35);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgZAhQgHgIAAgOIAAgyIASAAIAAAyQAAAPAMAAQANAAAEgKIAAg3IASAAIAABOIgRAAIAAgIQgIAJgNAAQgOAAgGgHg");
	this.shape_30.setTransform(75.85,21.025);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgJAbIAAgsIgNAAIAAgMIANAAIAAgUIARAAIAAAUIAOAAIAAAMIgOAAIAAArQAAAFACACQACACAEAAIAHgBIAAAPIgMABQgUAAAAgXg");
	this.shape_31.setTransform(69.025,20.05);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAPAoIAAgyQAAgIgDgDQgEgEgHAAQgKAAgFAKIAAA3IgSAAIAAhOIARAAIAAAJQAJgKANAAQAZAAABAcIAAAzg");
	this.shape_32.setTransform(58.775,20.875);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgaAiQgHgHAAgKQAAgNAJgFQAKgHAQAAIAMAAIAAgFQAAgHgEgDQgDgDgHgBQgFAAgEAEQgEADAAAEIgSAAQAAgHAEgFQAEgGAIgDQAIgDAHAAQAOAAAJAHQAIAHAAANIAAAiQAAALADAHIAAABIgSAAIgCgIQgIAJgMAAQgMAAgIgHgAgKAGQgFADAAAGQAAAFAEAEQACACAHAAQAEABAFgDQAEgDADgEIAAgOIgKAAQgJAAgFADg");
	this.shape_33.setTransform(50.55,20.95);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgQAlQgHgDgFgGQgEgHAAgGIASAAQAAAGAEADQAFADAGAAQAHAAAEgCQADgDAAgEQAAgFgEgDQgEgCgIgBQgJgCgGgEQgNgFAAgMQAAgKAJgIQAIgGAMAAQAPAAAIAHQAJAHAAALIgSAAQAAgFgDgDQgEgEgHAAQgEAAgEADQgEACAAAFQAAAEAEACQADADAKACQAKACAGADQAGACADAFQADAFAAAGQAAAKgJAHQgJAHgOAAQgJAAgIgEg");
	this.shape_34.setTransform(42.575,20.95);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgIA3IAAhOIARAAIAABOgAgGglQgDgDAAgEQAAgEADgDQACgDAEAAQAFAAACADQADADAAAEQAAAEgDADQgCACgFAAQgEAAgCgCg");
	this.shape_35.setTransform(36.825,19.425);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgiA4IAAhtIARAAIAAAIQAIgKANAAQAOAAAJALQAIALAAATIAAABQAAASgJAKQgIALgOAAQgMABgIgJIAAAmgAgQgfIAAAiQAFAKALAAQAHAAAFgIQAFgGAAgNQAAgMgFgHQgEgHgIAAQgLAAgFAJg");
	this.shape_36.setTransform(30.825,22.4);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgaAiQgHgHAAgKQAAgNAKgFQAJgHARAAIALAAIAAgFQgBgHgDgDQgDgDgHgBQgFAAgFAEQgDADAAAEIgSAAQAAgHAEgFQAFgGAHgDQAIgDAHAAQAOAAAJAHQAIAHAAANIAAAiQAAALADAHIAAABIgSAAIgCgIQgIAJgMAAQgMAAgIgHgAgKAGQgFADAAAGQAAAFADAEQAEACAFAAQAEABAFgDQAFgDADgEIAAgOIgKAAQgJAAgFADg");
	this.shape_37.setTransform(22.4,20.95);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AghA1IAAhpIATAAIAABaIAwAAIAAAPg");
	this.shape_38.setTransform(14.7,19.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#DB4C4B").s().p("AviEzIAAplIfFAAIAAJlg");
	this.shape_39.setTransform(99.525,30.675);

	this.timeline.addTween(cjs.Tween.get(this.shape_39).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.kotakJawaban1, new cjs.Rectangle(0,0,199.1,61.4), null);


(lib.kkoo = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#0193B0","#6DD5ED"],[0,1],-206.4,0,206.5,0).s().p("EggQAeUMAAAg8nMBAhAAAMAAAA8ng");
	this.shape.setTransform(404.0509,193.9287,1.9568,0.9997);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.kkoo, new cjs.Rectangle(0,0,808.1,387.9), null);


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
	this.shape.graphics.f("#FFFFFF").s().p("AgEAtIAAhZIAKAAIAABZg");
	this.shape.setTransform(61.35,59.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABgBAAAAQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAABAAAAQAAABAAABQAAAAgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAgBgBg");
	this.shape_1.setTransform(58.475,59.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_2.setTransform(53.875,60.825);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAFgDAGAAQAMAAAFAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgOANQAAAFADADQAEACAFAAQAEAAAEgCQAFgDACgEIAAgNIgIAAQgUAAABAMg");
	this.shape_3.setTransform(47.5,60.825);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAVArIAAgoIgqAAIAAAoIgLAAIAAhVIALAAIAAAlIAqAAIAAglIAMAAIAABVg");
	this.shape_4.setTransform(39.975,59.725);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFFFFF").ss(3,1,1).p("AntpVIPbAAIAASrIvbAAg");
	this.shape_5.setTransform(49.35,59.825);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E74C3C").s().p("AntJWIAAyrIPbAAIAASrg");
	this.shape_6.setTransform(49.35,59.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hasil, new cjs.Rectangle(-1.5,-1.5,101.7,122.7), null);


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
	this.shape_1.graphics.f("#2D53AB").s().p("AgPAWQgFgEABgIIAIAAQAAAEACADQADADAFAAQADAAADgCQAEgCAAgEQABgFgGgDIgIgCQgLgDABgKQAAgGAGgFQAFgEAHAAQAHAAAFAEQAFAFgBAHIgIAAQAAgEgCgCQgDgDgEAAQgDAAgDACQgDADAAADQgBAFAGACIADABQAJACADADQAEAEgBAFQAAAFgDAEQgCAEgFABQgEACgFAAQgHAAgGgFg");
	this.shape_1.setTransform(59.925,112.275);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2D53AB").s().p("AgQAXQgEgEAAgHQABgIAGgEQAHgFAJAAIAJAAIAAgEQABgFgCgCQgDgDgEAAQgEAAgCACQgEACAAAEIgJAAQABgEADgEQADgDAEgCQAEgCAFAAQAIAAAEAFQAEAEAAAIIgEAZIgBAEIABAFIAAABIgJAAIAAgDIAAgCQgHAGgGAAQgHAAgEgEgAgGADQgFADAAAFQgBADADADQACACADAAQAEABADgDIAGgFIACgLIgGAAQgHAAgEACg");
	this.shape_2.setTransform(55.0275,112.275);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2D53AB").s().p("AgXAlIAMhIIAHAAIgBAGQAFgHAJAAQAHAAAEAGQAEAFAAAKIAAAGIAAABQgBAIgDAFQgDAHgFADQgFADgFAAQgIAAgEgGIgFAZgAgFgVIgEAYQACAHAHAAQAGABAEgGQAEgFACgJIAAgEQAAgHgDgEQgCgEgFAAQgGAAgFAHg");
	this.shape_3.setTransform(49.775,113.225);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2D53AB").s().p("AgJAkIAIg0IAIAAIgIA0gAABgaIgBgEIABgDQABgBAAAAQABAAAAAAQABgBAAAAQAAAAABAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgEgBg");
	this.shape_4.setTransform(46.5,111.3188);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2D53AB").s().p("AgGAlQgFAAgFgDQgEgCgDgEIAFgGQAEAHAHABQAGAAADgEQAFgEABgGIABgFQgGAGgHAAQgFAAgDgCQgEgDgCgFQgCgEAAgFIABgHQABgJADgGQADgGAFgDQAFgDAEAAQAJAAAEAHIACgGIAHAAIgIAyQgBAKgHAGQgFAGgIAAIgBAAgAgGgXQgFAGAAAKIAAADQgBAGADAEQACADAFABQAGAAAGgIIAEgXQgDgHgHgBQgGAAgEAGg");
	this.shape_5.setTransform(42.625,113.2519);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2D53AB").s().p("AgQAXQgEgEAAgHQABgIAGgEQAHgFAJAAIAJAAIAAgEQABgFgCgCQgDgDgEAAQgEAAgCACQgEACAAAEIgJAAQABgEADgEQADgDAEgCQAEgCAFAAQAIAAAEAFQAEAEAAAIIgEAZIgBAEIABAFIAAABIgJAAIAAgDIAAgCQgHAGgGAAQgHAAgEgEgAgGADQgFADAAAFQgBADADADQACACADAAQAEABADgDIAGgFIACgLIgGAAQgHAAgEACg");
	this.shape_6.setTransform(74.1775,95.375);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2D53AB").s().p("AgPAbIAJg0IAHAAIgBAGQAFgHAHAAIAEABIgBAIIgEAAQgIAAgEAHIgGAlg");
	this.shape_7.setTransform(70.475,95.3234);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2D53AB").s().p("AgTAgQgEgFAAgKIAAgHQABgIADgFQADgHAFgDQAFgDAGAAQAHAAAEAHIAFgcIAIAAIgMBKIgHAAIABgGQgGAHgIAAQgHAAgEgGgAgHgFQgEADgCAFIgCAMQAAAHACAEQADAEAFAAQAGAAAFgIIAEgXQgDgHgHAAQgEAAgDADg");
	this.shape_8.setTransform(66.375,94.325);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2D53AB").s().p("AAIAbIAFgiIAAgEQgBgHgGAAQgHAAgFAIIgHAlIgIAAIAJg0IAIAAIgCAHQAGgIAJAAQAGAAAEAFQADAFgBAJIgFAig");
	this.shape_9.setTransform(60.9111,95.325);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2D53AB").s().p("AgPAUQgGgHABgLIAAgCQABgHAEgGQADgHAGgDQAFgDAFAAQAHAAAFAFQAEAFAAAJIAAAHIAAADIggAAQAAAHADAFQADAFAGAAQAGAAAGgHIAFAEQgDAFgFADQgFACgFAAQgJAAgFgHgAgFgPQgDAEgDAHIAXAAIAAgBQABgGgCgEQgDgEgFAAIgBAAQgDAAgEAEg");
	this.shape_10.setTransform(56.2048,95.375);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2D53AB").s().p("AgXAlIAMhIIAHAAIgBAGQAFgHAJAAQAHAAAEAGQAEAFAAAKIAAAGIAAABQgBAIgDAFQgDAHgFADQgFADgFAAQgIAAgEgGIgFAZgAgFgVIgEAYQACAHAHAAQAGABAEgGQAEgFACgJIAAgEQAAgHgDgEQgCgEgFAAQgGAAgFAHg");
	this.shape_11.setTransform(50.825,96.325);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2D53AB").s().p("AgNAYQgEgEgCgGQgCgGAAgHQABgHADgHQAEgGAFgEQAGgDAFAAQAHAAAEADQAEAEACAGQACAGAAAHIAAAAQgBAIgDAGQgEAHgGADQgEADgGAAQgGAAgFgDgAgHgOQgFAGAAAIIAAABIAAAGQAAAGADADQADAEAEAAQADAAAEgCQADgDACgEQADgFABgGIAAgGQgBgGgDgDQgDgEgEAAIgBAAQgFAAgEAFg");
	this.shape_12.setTransform(45.95,95.375);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2D53AB").s().p("AgJAlIALhJIAIAAIgLBJg");
	this.shape_13.setTransform(42.375,94.275);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2D53AB").s().p("AgNAYQgEgEgCgGQgDgGABgHQABgHADgHQAEgGAFgEQAGgDAGAAQAFAAAFADQAEAEADAGQABAGAAAHIAAAAQgBAIgEAGQgDAHgGADQgEADgGAAQgGAAgFgDgAgHgOQgEAGgBAIIAAABIAAAGQAAAGADADQADAEAEAAQADAAAEgCQADgDACgEQADgFABgGIAAgGQgBgGgDgDQgDgEgEAAIgBAAQgFAAgEAFg");
	this.shape_14.setTransform(38.5,95.375);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2D53AB").s().p("AgMAYQgFgEgCgFQgCgGABgIIAAgBQABgIADgGQAEgGAFgDQAFgDAGAAQAHAAAFAFQAFAGAAAIIgIAAQAAgFgDgEQgCgDgFAAQgFAAgEAFQgFAFgBAJIAAABIAAAGQAAAGADADQADAEAFAAQADAAAEgDQADgDABgEIAIAAQgBAFgDAEQgDAEgEACQgFACgEAAQgGAAgEgDg");
	this.shape_15.setTransform(33.6583,95.375);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2D53AB").s().p("AgOAhQgGgCgDgFQgCgFAAgGIAJAAQgBAGAEAEQADADAHABQAGAAAEgDQAEgEABgFQABgIgJgDIgHgDIgCgCQgNgFABgMQAAgGADgEQADgFAGgCQAFgDAGABQAGAAAFACQAEADACAFQADAFAAAGIgIAAQAAgHgEgDQgCgEgHAAQgFAAgEADQgEADgBAGQgBAHAKAEIAFADIAEABQANAGgBAMQgBAGgDAEQgDAFgGACQgFACgGAAQgHAAgEgDg");
	this.shape_16.setTransform(28.55,94.4708);

	this.instance_1 = new lib.Bitmap1();
	this.instance_1.setTransform(0,0,1.0217,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.instance}]}).wait(3));

	// Layer_3
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(51,51,51,0.2)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_17.setTransform(41.55,68.6125);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("rgba(51,51,51,0.498)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_18.setTransform(41.55,68.6125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17}]}).to({state:[{t:this.shape_18}]},1).wait(2));

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
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2D53AB").s().p("AgQAXQgEgEAAgHQABgIAGgEQAHgFAJAAIAJAAIAAgEQABgFgCgCQgDgDgEAAQgEAAgCACQgEACAAAEIgJAAQABgEADgEQADgDAEgCQAEgCAFAAQAIAAAEAFQAEAEAAAIIgEAZIgBAEIABAFIAAABIgJAAIAAgDIAAgCQgHAGgGAAQgHAAgEgEgAgGADQgFADAAAFQgBADADADQACACADAAQAEABADgDIAGgFIACgLIgGAAQgHAAgEACg");
	this.shape_1.setTransform(72.2275,105.475);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2D53AB").s().p("AgJAlIALhJIAIAAIgLBJg");
	this.shape_2.setTransform(68.925,104.375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2D53AB").s().p("AgJAlIALhJIAIAAIgLBJg");
	this.shape_3.setTransform(66.725,104.375);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2D53AB").s().p("AgJAkIAIg0IAIAAIgIA0gAACgaIgBgEIABgDQAAgBAAAAQABAAAAAAQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAABAAQAAABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgDgBg");
	this.shape_4.setTransform(64.45,104.5188);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2D53AB").s().p("AgGAlQgFAAgFgDQgEgCgDgEIAFgGQAEAHAHABQAGAAADgEQAFgEABgGIABgFQgGAGgHAAQgFAAgDgCQgEgDgCgFQgCgEAAgFIABgHQABgJADgGQADgGAFgDQAFgDAEAAQAJAAAEAHIACgGIAHAAIgIAyQgBAKgHAGQgFAGgIAAIgBAAgAgGgXQgFAGAAAKIAAADQgBAGADAEQACADAFABQAGAAAGgIIAEgXQgDgHgHgBQgGAAgEAGg");
	this.shape_5.setTransform(60.525,106.4519);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2D53AB").s().p("AAIAbIAFgiIAAgEQgBgHgGAAQgHAAgFAIIgHAlIgIAAIAJg0IAIAAIgCAHQAGgIAJAAQAGAAAEAFQADAFgBAJIgFAig");
	this.shape_6.setTransform(55.4111,105.425);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2D53AB").s().p("AgNAYQgEgEgCgGQgCgGAAgHQABgHADgHQAEgGAFgEQAGgDAFAAQAHAAAEADQAEAEACAGQACAGAAAHIAAAAQgBAIgDAGQgEAHgGADQgEADgGAAQgGAAgFgDgAgHgOQgFAGAAAIIAAABIAAAGQAAAGADADQADAEAEAAQADAAAEgCQADgDACgEQADgFABgGIAAgGQgBgGgDgDQgDgEgEAAIgBAAQgFAAgEAFg");
	this.shape_7.setTransform(50.45,105.475);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2D53AB").s().p("AgXAlIAMhIIAHAAIgBAGQAFgHAJAAQAHAAAEAGQAEAFAAAKIAAAGIAAABQgBAIgDAFQgDAHgFADQgFADgFAAQgIAAgEgGIgFAZgAgFgVIgEAYQACAHAHAAQAGABAEgGQAEgFACgJIAAgEQAAgHgDgEQgCgEgFAAQgGAAgFAHg");
	this.shape_8.setTransform(44.975,106.425);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2D53AB").s().p("AgPAhQgFgCgDgFQgCgFAAgGIAIAAQABAGADAEQAEADAGABQAGAAAEgDQAFgEAAgFQABgIgIgDIgHgDIgDgCQgNgFAAgMQABgGADgEQADgFAGgCQAFgDAGABQAGAAAFACQAEADADAFQACAFAAAGIgJAAQAAgHgCgDQgEgEgFAAQgGAAgEADQgEADgBAGQgBAHAKAEIAGADIADABQAMAGgBAMQAAAGgDAEQgDAFgGACQgFACgGAAQgGAAgGgDg");
	this.shape_9.setTransform(40.1,104.5708);

	this.instance = new lib.Bitmap44();
	this.instance.setTransform(0,0,0.3711,0.4973);

	this.instance_1 = new lib.Bitmap1();
	this.instance_1.setTransform(0,0,1.0217,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(3));

	// Layer_3
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(51,51,51,0.2)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_10.setTransform(41.55,68.6125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(51,51,51,0.498)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_11.setTransform(41.55,68.6125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10}]}).to({state:[{t:this.shape_11}]},1).wait(2));

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
	this.shape_1.graphics.f("#2D53AB").s().p("AgDAEQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAAAQAAAAAAgBQABAAAAgBQAAAAAAgBQABAAAAAAQAAgBABAAQAAAAABAAQAAAAAAAAQAAAAABAAQAAAAABAAQAAAAABABQAAAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAAAQAAAAAAABQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAIgDgBg");
	this.shape_1.setTransform(73.55,101.775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2D53AB").s().p("AgXAlIAMhIIAHAAIgBAGQAFgHAJAAQAHAAAEAGQAEAFAAAKIAAAGIAAABQgBAIgDAFQgDAHgFADQgFADgFAAQgIAAgEgGIgFAZgAgFgVIgEAYQACAHAHAAQAGABAEgGQAEgFACgJIAAgEQAAgHgDgEQgCgEgFAAQgGAAgFAHg");
	this.shape_2.setTransform(69.875,100.575);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2D53AB").s().p("AgPAWQgFgEABgIIAIAAQAAAEACADQADADAFAAQADAAADgCQAEgCAAgEQABgFgGgDIgIgCQgLgDABgKQAAgGAGgFQAFgEAHAAQAHAAAFAEQAFAFgBAHIgIAAQAAgEgCgCQgDgDgEAAQgDAAgDACQgDADAAADQgBAFAGACIADABQAJACADADQAEAEgBAFQAAAFgDAEQgCAEgFABQgEACgFAAQgHAAgGgFg");
	this.shape_3.setTransform(65.175,99.625);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2D53AB").s().p("AAIAaIgIgTIgNATIgKAAIAUgaIgMgZIAJAAIAHATIANgTIAKAAIgTAZIAMAag");
	this.shape_4.setTransform(58.225,99.625);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2D53AB").s().p("AgJAkIAIg0IAIAAIgIA0gAABgaIgBgEIABgDQABgBAAAAQABAAAAAAQABAAAAgBQAAAAABAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgEgBg");
	this.shape_5.setTransform(55.05,98.6688);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2D53AB").s().p("AgPAbIAJg0IAHAAIgBAGQAFgHAHAAIAEABIgBAIIgEAAQgIAAgEAHIgGAlg");
	this.shape_6.setTransform(52.475,99.5734);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2D53AB").s().p("AgHAdQgCgDAAgHIAGgfIgJAAIAAgHIAJAAIACgNIAHAAIgBANIAJAAIgBAHIgJAAIgFAfIAAADQAAABABAAQAAABAAAAQAAABAAAAQABAAABAAIAEAAIAAAHIgGABQgFAAgCgEg");
	this.shape_7.setTransform(49.4,99.025);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2D53AB").s().p("AgNAYQgEgEgDgGQgBgGAAgHQABgHAEgHQADgGAGgEQAFgDAGAAQAFAAAFADQAFAEACAGQACAGgBAHIAAAAQgBAIgDAGQgEAHgFADQgGADgFAAQgHAAgEgDgAgHgOQgEAGgCAIIAAABIAAAGQABAGADADQACAEAFAAQADAAADgCQAEgDADgEQACgFAAgGIAAgGQAAgGgCgDQgDgEgFAAIgBAAQgFAAgEAFg");
	this.shape_8.setTransform(45.1,99.625);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2D53AB").s().p("AgJAkIAIg0IAIAAIgIA0gAABgaIgBgEIABgDQABgBAAAAQABAAAAAAQABAAAAgBQAAAAABAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgEgBg");
	this.shape_9.setTransform(41.55,98.6688);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2D53AB").s().p("AAIAlIAFgiIAAgEQgBgHgGAAQgHAAgFAIIgHAlIgIAAIAMhJIAJAAIgFAcQAFgHAJAAQAGAAAEAFQADAFgBAIIgFAig");
	this.shape_10.setTransform(37.6611,98.525);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2D53AB").s().p("AgXAlIAMhIIAHAAIgBAGQAFgHAJAAQAHAAAEAGQAEAFAAAKIAAAGIAAABQgBAIgDAFQgDAHgFADQgFADgFAAQgIAAgEgGIgFAZgAgFgVIgEAYQACAHAHAAQAGABAEgGQAEgFACgJIAAgEQAAgHgDgEQgCgEgFAAQgGAAgFAHg");
	this.shape_11.setTransform(32.425,100.575);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2D53AB").s().p("AgPAhQgFgDgDgGQgCgGgBgIIACgNQABgJAEgHQAEgHAFgEQAHgGAIABQAKAAAGAHQAFAHABAMIgBAMQgCAHgDAHQgDAHgEAEQgIAIgKAAQgHAAgEgDgAgFgYQgFAEgDAHQgDAHgBALIAAADQAAAJADAGQAEAFAGAAQAIABAGgHQAFgHACgNIABgJQAAgKgDgFQgDgFgHAAIgCAAQgEAAgEADg");
	this.shape_12.setTransform(27.125,98.7229);

	this.instance_1 = new lib.Bitmap1();
	this.instance_1.setTransform(0,0,1.0217,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.instance}]}).wait(3));

	// Layer_3
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("rgba(51,51,51,0.2)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_13.setTransform(41.55,68.6125);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("rgba(51,51,51,0.498)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_14.setTransform(41.55,68.6125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13}]}).to({state:[{t:this.shape_14}]},1).wait(2));

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
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2D53AB").s().p("AgQAXQgEgEAAgHQABgIAGgEQAHgFAJAAIAJAAIAAgEQABgFgCgCQgDgDgEAAQgEAAgCACQgEACAAAEIgJAAQABgEADgEQADgDAEgCQAEgCAFAAQAIAAAEAFQAEAEAAAIIgEAZIgBAEIABAFIAAABIgJAAIAAgDIAAgCQgHAGgGAAQgHAAgEgEgAgGADQgFADAAAFQgBADADADQACACADAAQAEABADgDIAGgFIACgLIgGAAQgHAAgEACg");
	this.shape_1.setTransform(83.1275,104.875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2D53AB").s().p("AgPAbIAJg0IAHAAIgBAGQAFgHAHAAIAEABIgBAIIgEAAQgIAAgEAHIgGAlg");
	this.shape_2.setTransform(79.425,104.8234);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2D53AB").s().p("AgMAfIgCAGIgHAAIALhKIAJAAIgFAcQAGgHAHAAQAIAAADAGQAFAFAAAJIAAAGIgBABQgBAIgDAGQgDAHgFADQgEADgGAAQgIAAgEgHgAgHAAIgEAWQADAIAHAAQAEAAAEgDQAEgDACgGIACgMQgBgGgCgEQgCgEgFAAQgHAAgFAIg");
	this.shape_3.setTransform(74.95,103.825);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2D53AB").s().p("AgQAXQgEgEAAgHQABgIAGgEQAHgFAJAAIAJAAIAAgEQABgFgCgCQgDgDgEAAQgEAAgCACQgEACAAAEIgJAAQABgEADgEQADgDAEgCQAEgCAFAAQAIAAAEAFQAEAEAAAIIgEAZIgBAEIABAFIAAABIgJAAIAAgDIAAgCQgHAGgGAAQgHAAgEgEgAgGADQgFADAAAFQgBADADADQACACADAAQAEABADgDIAGgFIACgLIgGAAQgHAAgEACg");
	this.shape_4.setTransform(69.9275,104.875);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2D53AB").s().p("AgMAYQgFgEgCgFQgCgGABgIIAAgBQABgIADgGQAEgGAFgDQAFgDAGAAQAHAAAFAFQAFAGAAAIIgIAAQAAgFgDgEQgCgDgFAAQgFAAgEAFQgFAFgBAJIAAABIAAAGQAAAGADADQADAEAFAAQADAAAEgDQADgDABgEIAIAAQgBAFgDAEQgDAEgEACQgFACgEAAQgGAAgEgDg");
	this.shape_5.setTransform(65.2583,104.875);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2D53AB").s().p("AgPAWQgFgEABgIIAIAAQAAAEACADQADADAFAAQADAAADgCQAEgCAAgEQABgFgGgDIgIgCQgLgDABgKQAAgGAGgFQAFgEAHAAQAHAAAFAEQAFAFgBAHIgIAAQAAgEgCgCQgDgDgEAAQgDAAgDACQgDADAAADQgBAFAGACIADABQAJACADADQAEAEgBAFQAAAFgDAEQgCAEgFABQgEACgFAAQgHAAgGgFg");
	this.shape_6.setTransform(60.325,104.875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2D53AB").s().p("AgQAXQgEgEAAgHQABgIAGgEQAHgFAJAAIAJAAIAAgEQABgFgCgCQgDgDgEAAQgEAAgCACQgEACAAAEIgJAAQABgEADgEQADgDAEgCQAEgCAFAAQAIAAAEAFQAEAEAAAIIgEAZIgBAEIABAFIAAABIgJAAIAAgDIAAgCQgHAGgGAAQgHAAgEgEgAgGADQgFADAAAFQgBADADADQACACADAAQAEABADgDIAGgFIACgLIgGAAQgHAAgEACg");
	this.shape_7.setTransform(53.1275,104.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2D53AB").s().p("AgJAkIAJg0IAHAAIgHA0gAACgaIgBgEIABgDQAAgBAAAAQABAAAAAAQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAABAAQAAABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgDgBg");
	this.shape_8.setTransform(49.8,103.9188);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2D53AB").s().p("AgPAbIAJg0IAHAAIgBAGQAFgHAHAAIAEABIgBAIIgEAAQgIAAgEAHIgGAlg");
	this.shape_9.setTransform(47.225,104.8234);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2D53AB").s().p("AgSAVQgDgFABgJIAFghIAIAAIgFAhIAAAEIACAGQACACADAAQAIAAAEgIIAHglIAIAAIgJA0IgIAAIACgFQgGAGgIAAQgHAAgEgGg");
	this.shape_10.setTransform(43.0889,104.925);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2D53AB").s().p("AAIAlIAFgiIAAgEQgBgHgGAAQgHAAgFAIIgHAlIgIAAIAMhJIAJAAIgFAcQAFgHAJAAQAGAAAEAFQADAFgBAIIgFAig");
	this.shape_11.setTransform(37.7611,103.775);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2D53AB").s().p("AgHAdQgCgDAAgHIAGgfIgJAAIAAgHIAJAAIACgNIAHAAIgBANIAJAAIgBAHIgJAAIgFAfIAAADQAAABABAAQAAABAAAAQAAABAAAAQABAAABAAIAEAAIgBAHIgFABQgFAAgCgEg");
	this.shape_12.setTransform(34.1,104.275);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2D53AB").s().p("AgNAYQgEgEgDgGQgBgGAAgHQABgHAEgHQADgGAGgEQAFgDAFAAQAGAAAFADQAFAEACAGQACAGgBAHIAAAAQgBAIgDAGQgEAHgFADQgGADgFAAQgHAAgEgDgAgHgOQgEAGgCAIIAAABIAAAGQABAGADADQACAEAFAAQADAAADgCQAEgDADgEQACgFAAgGIAAgGQAAgGgCgDQgDgEgFAAIgBAAQgFAAgEAFg");
	this.shape_13.setTransform(29.8,104.875);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2D53AB").s().p("AgJAlIALhJIAIAAIgLBJg");
	this.shape_14.setTransform(26.275,103.775);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2D53AB").s().p("AgNAYQgEgEgDgGQgCgGABgHQABgHADgHQAEgGAFgEQAGgDAGAAQAFAAAFADQAFAEACAGQABAGAAAHIAAAAQgBAIgEAGQgDAHgGADQgFADgFAAQgGAAgFgDgAgHgOQgEAGgBAIIAAABIAAAGQAAAGADADQACAEAFAAQADAAAEgCQADgDADgEQACgFABgGIAAgGQgBgGgCgDQgDgEgFAAIgBAAQgFAAgEAFg");
	this.shape_15.setTransform(22.4,104.875);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2D53AB").s().p("AAKAjIAGggIggAAIgFAgIgJAAIAMhFIAJAAIgFAeIAfAAIAFgeIAJAAIgMBFg");
	this.shape_16.setTransform(16.675,103.975);

	this.instance = new lib._36();
	this.instance.setTransform(0,-1,0.1436,0.1699);

	this.instance_1 = new lib.Bitmap1();
	this.instance_1.setTransform(0,0,1.0217,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(3));

	// Layer_3
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(51,51,51,0.2)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_17.setTransform(41.55,68.6125);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("rgba(51,51,51,0.498)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_18.setTransform(41.55,68.6125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17}]}).to({state:[{t:this.shape_18}]},1).wait(2));

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
	this.shape_1.graphics.f("#2D53AB").s().p("AgPAWQgFgEABgIIAIAAQAAAEACADQADADAFAAQADAAADgCQAEgCAAgEQABgFgGgDIgIgCQgLgDABgKQAAgGAGgFQAFgEAHAAQAHAAAFAEQAFAFgBAHIgIAAQAAgEgCgCQgDgDgEAAQgDAAgDACQgDADAAADQgBAFAGACIADABQAJACADADQAEAEgBAFQAAAFgDAEQgCAEgFABQgEACgFAAQgHAAgGgFg");
	this.shape_1.setTransform(64.675,112.525);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2D53AB").s().p("AgSAVQgDgFABgJIAFghIAIAAIgFAhIAAAEIACAGQACACADAAQAIAAAEgIIAHglIAIAAIgJA0IgIAAIACgFQgGAGgIAAQgHAAgEgGg");
	this.shape_2.setTransform(59.9889,112.575);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2D53AB").s().p("AgHAdQgCgDAAgHIAGgfIgJAAIABgHIAJAAIABgNIAIAAIgCANIAJAAIgBAHIgJAAIgFAfIAAADQAAABABAAQAAABAAAAQAAABAAAAQABAAABAAIAEAAIAAAHIgGABQgEAAgDgEg");
	this.shape_3.setTransform(56.05,111.925);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2D53AB").s().p("AgQAXQgEgEAAgHQABgIAGgEQAHgFAJAAIAJAAIAAgEQABgFgCgCQgDgDgEAAQgEAAgCACQgEACAAAEIgJAAQABgEADgEQADgDAEgCQAEgCAFAAQAIAAAEAFQAEAEAAAIIgEAZIgBAEIABAFIAAABIgJAAIAAgDIAAgCQgHAGgGAAQgHAAgEgEgAgGADQgFADAAAFQgBADADADQACACADAAQAEABADgDIAGgFIACgLIgGAAQgHAAgEACg");
	this.shape_4.setTransform(51.7275,112.525);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2D53AB").s().p("AAIAbIAFgiIAAgEQgBgHgGAAQgHAAgFAIIgHAlIgIAAIAJg0IAIAAIgCAHQAGgIAJAAQAGAAAEAFQADAFgBAJIgFAig");
	this.shape_5.setTransform(46.7111,112.475);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2D53AB").s().p("AAIAbIAFgiIAAgEQgBgHgGAAQgHAAgFAIIgHAlIgIAAIAJg0IAIAAIgCAHQAGgIAJAAQAGAAAEAFQADAFgBAJIgFAig");
	this.shape_6.setTransform(41.6611,112.475);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2D53AB").s().p("AgJAkIAIg0IAIAAIgIA0gAACgaIgBgEIABgDQAAgBAAAAQABAAAAAAQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAABAAQAAABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgDgBg");
	this.shape_7.setTransform(38.35,111.5688);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2D53AB").s().p("AgXAlIAMhIIAHAAIgBAGQAFgHAJAAQAHAAAEAGQAEAFAAAKIAAAGIAAABQgBAIgDAFQgDAHgFADQgFADgFAAQgIAAgEgGIgFAZgAgFgVIgEAYQACAHAHAAQAGABAEgGQAEgFACgJIAAgEQAAgHgDgEQgCgEgFAAQgGAAgFAHg");
	this.shape_8.setTransform(34.225,113.475);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2D53AB").s().p("AgPAWQgFgEABgIIAIAAQAAAEACADQADADAFAAQADAAADgCQAEgCAAgEQABgFgGgDIgIgCQgLgDABgKQAAgGAGgFQAFgEAHAAQAHAAAFAEQAFAFgBAHIgIAAQAAgEgCgCQgDgDgEAAQgDAAgDACQgDADAAADQgBAFAGACIADABQAJACADADQAEAEgBAFQAAAFgDAEQgCAEgFABQgEACgFAAQgHAAgGgFg");
	this.shape_9.setTransform(68.725,95.625);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2D53AB").s().p("AgSAVQgDgFABgJIAFghIAIAAIgFAhIAAAEIACAGQACACADAAQAIAAAEgIIAHglIAIAAIgJA0IgIAAIACgFQgGAGgIAAQgHAAgEgGg");
	this.shape_10.setTransform(64.0889,95.675);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2D53AB").s().p("AAIAbIAFgiIAAgEQgBgHgGAAQgHAAgFAIIgHAlIgIAAIAJg0IAIAAIgCAHQAGgIAJAAQAGAAAEAFQADAFgBAJIgFAig");
	this.shape_11.setTransform(58.7111,95.575);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2D53AB").s().p("AgJAkIAJg0IAHAAIgHA0gAABgaIgBgEIABgDQABgBAAAAQABAAAAAAQABgBAAAAQAAAAABAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAABAAQAAABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgEgBg");
	this.shape_12.setTransform(55.4,94.6688);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2D53AB").s().p("AgPAbIAJg0IAHAAIgBAGQAFgHAHAAIAEABIgBAIIgEAAQgIAAgEAHIgGAlg");
	this.shape_13.setTransform(52.825,95.5734);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2D53AB").s().p("AgMAYQgFgEgCgFQgCgGABgIIAAgBQABgIADgGQAEgGAFgDQAFgDAGAAQAHAAAFAFQAFAGAAAIIgIAAQAAgFgDgEQgCgDgFAAQgFAAgEAFQgFAFgBAJIAAABIAAAGQAAAGADADQADAEAFAAQADAAAEgDQADgDABgEIAIAAQgBAFgDAEQgDAEgEACQgFACgEAAQgGAAgEgDg");
	this.shape_14.setTransform(48.7583,95.625);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2D53AB").s().p("AgNAYQgEgEgDgGQgBgGAAgHQABgHAEgHQADgGAGgEQAFgDAGAAQAFAAAFADQAFAEACAGQABAGAAAHIAAAAQgBAIgEAGQgDAHgGADQgFADgFAAQgGAAgFgDgAgHgOQgEAGgCAIIAAABIAAAGQABAGADADQACAEAFAAQADAAADgCQAEgDADgEQACgFAAgGIAAgGQAAgGgCgDQgEgEgEAAIgBAAQgFAAgEAFg");
	this.shape_15.setTransform(43.65,95.625);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2D53AB").s().p("AgJAlIALhJIAIAAIgLBJg");
	this.shape_16.setTransform(40.125,94.525);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2D53AB").s().p("AgJAkIAJg0IAHAAIgHA0gAABgaIgBgEIABgDQABgBAAAAQABAAAAAAQABgBAAAAQAAAAABAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAABAAQAAABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgEgBg");
	this.shape_17.setTransform(37.85,94.6688);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2D53AB").s().p("AgHAdQgCgDAAgHIAGgfIgJAAIABgHIAJAAIABgNIAHAAIgBANIAJAAIgBAHIgJAAIgFAfIAAADQAAABABAAQAAABAAAAQAAABAAAAQABAAABAAIAEAAIAAAHIgGABQgEAAgDgEg");
	this.shape_18.setTransform(35.35,95.025);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2D53AB").s().p("AgaAjIALhFIAWAAQAKAAAFAFQAGAGgBAKQgBAKgGAFQgHAGgLAAIgPAAIgEAbgAgMAAIAOAAQAHAAAFgDQAEgDABgHQAAgGgDgEQgDgEgFAAIgPAAg");
	this.shape_19.setTransform(30.8821,94.725);

	this.instance_1 = new lib.Bitmap1();
	this.instance_1.setTransform(0,0,1.0217,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.instance}]}).wait(3));

	// Layer_3
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("rgba(51,51,51,0.2)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_20.setTransform(41.55,68.6125);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("rgba(51,51,51,0.498)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_21.setTransform(41.55,68.6125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_20}]}).to({state:[{t:this.shape_21}]},1).wait(2));

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
	this.shape_1.graphics.f("#2D53AB").s().p("AgJAkIAIg0IAIAAIgIA0gAACgaIgBgEIABgDQAAgBAAAAQABAAAAAAQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAABAAQAAABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgDgBg");
	this.shape_1.setTransform(80.65,98.6688);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2D53AB").s().p("AgPAWQgFgEABgIIAIAAQAAAEACADQADADAFAAQADAAADgCQAEgCAAgEQABgFgGgDIgIgCQgLgDABgKQAAgGAGgFQAFgEAHAAQAHAAAFAEQAFAFgBAHIgIAAQAAgEgCgCQgDgDgEAAQgDAAgDACQgDADAAADQgBAFAGACIADABQAJACADADQAEAEgBAFQAAAFgDAEQgCAEgFABQgEACgFAAQgHAAgGgFg");
	this.shape_2.setTransform(76.975,99.625);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2D53AB").s().p("AgPAUQgGgHABgLIAAgCQABgHAEgGQADgHAGgDQAFgDAFAAQAHAAAFAFQAEAFAAAJIAAAHIAAADIggAAQAAAHADAFQADAFAGAAQAGAAAGgHIAFAEQgDAFgFADQgFACgFAAQgJAAgFgHgAgFgPQgDAEgDAHIAXAAIAAgBQABgGgCgEQgDgEgFAAIgBAAQgDAAgEAEg");
	this.shape_3.setTransform(72.3048,99.625);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2D53AB").s().p("AgMAfIgCAGIgHAAIAMhKIAIAAIgFAcQAGgHAIAAQAGAAAEAGQAEAFABAJIAAAGIgBABQAAAIgEAGQgDAHgFADQgFADgFAAQgIAAgEgHgAgHAAIgEAWQADAIAIAAQADAAAEgDQAEgDABgGIADgMQAAgGgDgEQgCgEgFAAQgHAAgFAIg");
	this.shape_4.setTransform(67.1,98.575);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2D53AB").s().p("AgPAbIAJg0IAHAAIgBAGQAFgHAHAAIAEABIgBAIIgEAAQgIAAgEAHIgGAlg");
	this.shape_5.setTransform(63.325,99.5734);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2D53AB").s().p("AgNAYQgEgEgDgGQgBgGAAgHQABgHAEgHQADgGAGgEQAFgDAGAAQAFAAAFADQAFAEACAGQABAGAAAHIAAAAQgBAIgEAGQgDAHgGADQgFADgFAAQgGAAgFgDgAgHgOQgEAGgCAIIAAABIAAAGQABAGADADQACAEAFAAQADAAADgCQAEgDADgEQACgFAAgGIAAgGQAAgGgCgDQgEgEgEAAIgBAAQgFAAgEAFg");
	this.shape_6.setTransform(58.95,99.625);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2D53AB").s().p("AgQAmIAIgtIgIAAIABgHIAIAAIABgGQABgIAFgEQADgFAIAAIAGABIgBAHIgFAAQgEAAgCACQgEADAAAFIgBAFIAKAAIgBAHIgJAAIgIAtg");
	this.shape_7.setTransform(55.4,98.4727);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2D53AB").s().p("AgPAWQgFgEABgIIAIAAQAAAEACADQADADAFAAQADAAADgCQAEgCAAgEQABgFgGgDIgIgCQgLgDABgKQAAgGAGgFQAFgEAHAAQAHAAAFAEQAFAFgBAHIgIAAQAAgEgCgCQgDgDgEAAQgDAAgDACQgDADAAADQgBAFAGACIADABQAJACADADQAEAEgBAFQAAAFgDAEQgCAEgFABQgEACgFAAQgHAAgGgFg");
	this.shape_8.setTransform(48.475,99.625);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2D53AB").s().p("AgQAXQgEgEAAgHQABgIAGgEQAHgFAJAAIAJAAIAAgEQABgFgCgCQgDgDgEAAQgEAAgCACQgEACAAAEIgJAAQABgEADgEQADgDAEgCQAEgCAFAAQAIAAAEAFQAEAEAAAIIgEAZIgBAEIABAFIAAABIgJAAIAAgDIAAgCQgHAGgGAAQgHAAgEgEgAgGADQgFADAAAFQgBADADADQACACADAAQAEABADgDIAGgFIACgLIgGAAQgHAAgEACg");
	this.shape_9.setTransform(43.5775,99.625);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2D53AB").s().p("AgJAkIAIg0IAIAAIgIA0gAABgaIgBgEIABgDQABgBAAAAQABAAAAAAQABAAAAgBQAAAAABAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgEgBg");
	this.shape_10.setTransform(40.2,98.6688);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2D53AB").s().p("AgPAbIAJg0IAHAAIgBAGQAFgHAHAAIAEABIgBAIIgEAAQgIAAgEAHIgGAlg");
	this.shape_11.setTransform(37.625,99.5734);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2D53AB").s().p("AgPAUQgGgHABgLIAAgCQABgHAEgGQADgHAGgDQAFgDAFAAQAHAAAFAFQAEAFAAAJIAAAHIAAADIggAAQAAAHADAFQADAFAGAAQAGAAAGgHIAFAEQgDAFgFADQgFACgFAAQgJAAgFgHgAgFgPQgDAEgDAHIAXAAIAAgBQABgGgCgEQgDgEgFAAIgBAAQgDAAgEAEg");
	this.shape_12.setTransform(33.5048,99.625);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2D53AB").s().p("AgHAdQgDgDABgHIAGgfIgJAAIABgHIAJAAIACgNIAHAAIgCANIAJAAIgCAHIgJAAIgDAfIAAADQAAABAAAAQAAABAAAAQAAABAAAAQABAAABAAIAEAAIAAAHIgGABQgEAAgDgEg");
	this.shape_13.setTransform(29.75,99.025);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2D53AB").s().p("AgPAWQgFgEABgIIAIAAQAAAEACADQADADAFAAQADAAADgCQAEgCAAgEQABgFgGgDIgIgCQgLgDABgKQAAgGAGgFQAFgEAHAAQAHAAAFAEQAFAFgBAHIgIAAQAAgEgCgCQgDgDgEAAQgDAAgDACQgDADAAADQgBAFAGACIADABQAJACADADQAEAEgBAFQAAAFgDAEQgCAEgFABQgEACgFAAQgHAAgGgFg");
	this.shape_14.setTransform(25.625,99.625);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2D53AB").s().p("AAUAjIgDgSIgaAAIgJASIgJAAIAjhFIAHAAIANBFgAgFAJIAUAAIgFggg");
	this.shape_15.setTransform(19.875,98.725);

	this.instance_1 = new lib.Bitmap1();
	this.instance_1.setTransform(0,0,1.0217,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.instance}]}).wait(3));

	// Layer_3
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(51,51,51,0.2)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_16.setTransform(41.55,68.6125);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(51,51,51,0.498)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_17.setTransform(41.55,68.6125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_16}]}).to({state:[{t:this.shape_17}]},1).wait(2));

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
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2D53AB").s().p("AAXAbIAFgiIAAgEQgBgHgHAAQgFAAgDADQgEADgBAFIgGAiIgHAAIAGgiQAAgFgCgDQgCgDgFAAQgHAAgFAHIgGAmIgIAAIAIg0IAIAAIgBAGQAGgHAJAAQAFAAACADQADACABAEQAHgJAKAAQAHAAAEAGQADAFgBAIIgFAig");
	this.shape_1.setTransform(65.6361,112.375);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2D53AB").s().p("AgSAVQgDgFABgJIAFghIAIAAIgFAhIAAAEIACAGQACACADAAQAIAAAEgIIAHglIAIAAIgJA0IgIAAIACgFQgGAGgIAAQgHAAgEgGg");
	this.shape_2.setTransform(59.4389,112.475);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2D53AB").s().p("AgPAWQgFgEABgIIAIAAQAAAEACADQADADAFAAQADAAADgCQAEgCAAgEQABgFgGgDIgIgCQgLgDABgKQAAgGAGgFQAFgEAHAAQAHAAAFAEQAFAFgBAHIgIAAQAAgEgCgCQgDgDgEAAQgDAAgDACQgDADAAADQgBAFAGACIADABQAJACADADQAEAEgBAFQAAAFgDAEQgCAEgFABQgEACgFAAQgHAAgGgFg");
	this.shape_3.setTransform(54.375,112.425);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2D53AB").s().p("AgNAYQgEgEgCgGQgCgGAAgHQABgHAEgHQADgGAFgEQAGgDAFAAQAHAAAEADQAEAEACAGQACAGAAAHIAAAAQgBAIgDAGQgEAHgFADQgFADgGAAQgGAAgFgDgAgHgOQgEAGgCAIIAAABIAAAGQABAGADADQADAEAEAAQADAAADgCQAEgDACgEQADgFAAgGIAAgGQAAgGgDgDQgDgEgEAAIgBAAQgFAAgEAFg");
	this.shape_4.setTransform(49.45,112.425);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2D53AB").s().p("AgHAdQgDgDACgHIAEgfIgJAAIABgHIAJAAIACgNIAHAAIgCANIAJAAIgBAHIgJAAIgEAfIAAADQAAABABAAQAAABAAAAQAAABAAAAQABAAABAAIAEAAIgBAHIgFABQgFAAgCgEg");
	this.shape_5.setTransform(45.55,111.825);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2D53AB").s().p("AgPAUQgGgHABgLIAAgCQABgHAEgGQADgHAGgDQAFgDAFAAQAHAAAFAFQAEAFAAAJIAAAHIAAADIggAAQAAAHADAFQADAFAGAAQAGAAAGgHIAFAEQgDAFgFADQgFACgFAAQgJAAgFgHgAgFgPQgDAEgDAHIAXAAIAAgBQABgGgCgEQgDgEgFAAIgBAAQgDAAgEAEg");
	this.shape_6.setTransform(41.5048,112.425);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2D53AB").s().p("AgPAWQgFgEABgIIAIAAQAAAEACADQADADAFAAQADAAADgCQAEgCAAgEQABgFgGgDIgIgCQgLgDABgKQAAgGAGgFQAFgEAHAAQAHAAAFAEQAFAFgBAHIgIAAQAAgEgCgCQgDgDgEAAQgDAAgDACQgDADAAADQgBAFAGACIADABQAJACADADQAEAEgBAFQAAAFgDAEQgCAEgFABQgEACgFAAQgHAAgGgFg");
	this.shape_7.setTransform(36.575,112.425);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2D53AB").s().p("AgQAXQgEgEAAgHQABgIAGgEQAHgFAJAAIAJAAIAAgEQABgFgCgCQgDgDgEAAQgEAAgCACQgEACAAAEIgJAAQABgEADgEQADgDAEgCQAEgCAFAAQAIAAAEAFQAEAEAAAIIgEAZIgBAEIABAFIAAABIgJAAIAAgDIAAgCQgHAGgGAAQgHAAgEgEgAgGADQgFADAAAFQgBADADADQACACADAAQAEABADgDIAGgFIACgLIgGAAQgHAAgEACg");
	this.shape_8.setTransform(67.5275,97.975);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2D53AB").s().p("AAXAbIAFgiIAAgEQgBgHgHAAQgFAAgDADQgEADgBAFIgGAiIgHAAIAGgiQAAgFgCgDQgCgDgFAAQgHAAgFAHIgGAmIgIAAIAIg0IAIAAIgBAGQAGgHAJAAQAFAAACADQADACABAEQAHgJAKAAQAHAAAEAGQADAFgBAIIgFAig");
	this.shape_9.setTransform(60.9861,97.925);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2D53AB").s().p("AgPAUQgGgHABgLIAAgCQABgHAEgGQADgHAGgDQAFgDAFAAQAHAAAFAFQAEAFAAAJIAAAHIAAADIggAAQAAAHADAFQADAFAGAAQAGAAAGgHIAFAEQgDAFgFADQgFACgFAAQgJAAgFgHgAgFgPQgDAEgDAHIAXAAIAAgBQABgGgCgEQgDgEgFAAIgBAAQgDAAgEAEg");
	this.shape_10.setTransform(54.8048,97.975);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2D53AB").s().p("AgTAgQgEgFAAgKIAAgHQABgIADgFQADgHAFgDQAFgDAGAAQAHAAAEAHIAFgcIAIAAIgMBKIgHAAIABgGQgGAHgIAAQgHAAgEgGgAgHgFQgEADgCAFIgCAMQAAAHACAEQADAEAFAAQAGAAAFgIIAEgXQgDgHgHAAQgEAAgDADg");
	this.shape_11.setTransform(50.025,96.925);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2D53AB").s().p("AgQAXQgEgEAAgHQABgIAGgEQAHgFAJAAIAJAAIAAgEQABgFgCgCQgDgDgEAAQgEAAgCACQgEACAAAEIgJAAQABgEADgEQADgDAEgCQAEgCAFAAQAIAAAEAFQAEAEAAAIIgEAZIgBAEIABAFIAAABIgJAAIAAgDIAAgCQgHAGgGAAQgHAAgEgEgAgGADQgFADAAAFQgBADADADQACACADAAQAEABADgDIAGgFIACgLIgGAAQgHAAgEACg");
	this.shape_12.setTransform(44.5775,97.975);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2D53AB").s().p("AgJAkIAJg0IAHAAIgHA0gAABgaIAAgEIAAgDQABgBAAAAQABAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAABAAQAAABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgEgBg");
	this.shape_13.setTransform(41.25,97.0188);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2D53AB").s().p("AgaAjIAMhFIAQAAQAIAAAGAEQAGAEADAIQACAHgBAKIAAACQgCAQgKAJQgJAJgNAAgAgQAcIAJAAQAIAAAHgHQAHgGACgLQABgIAAgHQgBgHgEgEQgEgFgHAAIgJAAg");
	this.shape_14.setTransform(36.9643,97.075);

	this.instance = new lib._17();
	this.instance.setTransform(0,0,0.1416,0.1884);

	this.instance_1 = new lib.Bitmap1();
	this.instance_1.setTransform(0,0,1.0217,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(3));

	// Layer_3
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("rgba(51,51,51,0.2)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_15.setTransform(41.55,68.6125);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(51,51,51,0.498)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_16.setTransform(41.55,68.6125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15}]}).to({state:[{t:this.shape_16}]},1).wait(2));

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
	this.instance = new lib.fix();
	this.instance.setTransform(0,0,1.0109,0.8214);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2D53AB").s().p("AgPAWQgFgEABgIIAIAAQAAAEACADQADADAFAAQADAAADgCQAEgCAAgEQABgFgGgDIgIgCQgLgDABgKQAAgGAGgFQAFgEAHAAQAHAAAFAEQAFAFgBAHIgIAAQAAgEgCgCQgDgDgEAAQgDAAgDACQgDADAAADQgBAFAGACIADABQAJACADADQAEAEgBAFQAAAFgDAEQgCAEgFABQgEACgFAAQgHAAgGgFg");
	this.shape_1.setTransform(70.275,111.975);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2D53AB").s().p("AgJAkIAIg0IAIAAIgIA0gAACgaIgCgEIACgDQAAgBAAAAQABAAAAAAQABgBAAAAQAAAAABAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgDgBg");
	this.shape_2.setTransform(66.95,111.0188);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2D53AB").s().p("AgJAlIALhJIAIAAIgLBJg");
	this.shape_3.setTransform(64.775,110.875);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2D53AB").s().p("AgQAXQgEgEAAgHQABgIAGgEQAHgFAJAAIAJAAIAAgEQABgFgCgCQgDgDgEAAQgEAAgCACQgEACAAAEIgJAAQABgEADgEQADgDAEgCQAEgCAFAAQAIAAAEAFQAEAEAAAIIgEAZIgBAEIABAFIAAABIgJAAIAAgDIAAgCQgHAGgGAAQgHAAgEgEgAgGADQgFADAAAFQgBADADADQACACADAAQAEABADgDIAGgFIACgLIgGAAQgHAAgEACg");
	this.shape_4.setTransform(60.9275,111.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2D53AB").s().p("AAIAbIAFgiIAAgEQgBgHgGAAQgHAAgFAIIgHAlIgIAAIAJg0IAIAAIgCAHQAGgIAJAAQAGAAAEAFQADAFgBAJIgFAig");
	this.shape_5.setTransform(55.8611,111.925);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2D53AB").s().p("AgJAkIAIg0IAIAAIgIA0gAACgaIgCgEIACgDQAAgBAAAAQABAAAAAAQABgBAAAAQAAAAABAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgDgBg");
	this.shape_6.setTransform(52.55,111.0188);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2D53AB").s().p("AgMAYQgFgEgCgFQgCgGABgIIAAgBQABgIADgGQAEgGAFgDQAFgDAGAAQAHAAAFAFQAFAGAAAIIgIAAQAAgFgDgEQgCgDgFAAQgFAAgEAFQgFAFgBAJIAAABIAAAGQAAAGADADQADAEAFAAQADAAAEgDQADgDABgEIAIAAQgBAFgDAEQgDAEgEACQgFACgEAAQgGAAgEgDg");
	this.shape_7.setTransform(49.0083,111.975);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2D53AB").s().p("AgJAkIAIg0IAIAAIgIA0gAACgaIgBgEIABgDQAAgBAAAAQABAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAABAAQAAABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgDgBg");
	this.shape_8.setTransform(45.55,111.0188);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2D53AB").s().p("AgTAgQgEgFAAgKIAAgHQABgIADgFQADgHAFgDQAFgDAGAAQAHAAAEAHIAFgcIAIAAIgMBKIgHAAIABgGQgGAHgIAAQgHAAgEgGgAgHgFQgEADgCAFIgCAMQAAAHACAEQADAEAFAAQAGAAAFgIIAEgXQgDgHgHAAQgEAAgDADg");
	this.shape_9.setTransform(41.975,110.925);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2D53AB").s().p("AgPAUQgGgHABgLIAAgCQABgHAEgGQADgHAGgDQAFgDAFAAQAHAAAFAFQAEAFAAAJIAAAHIAAADIggAAQAAAHADAFQADAFAGAAQAGAAAGgHIAFAEQgDAFgFADQgFACgFAAQgJAAgFgHgAgFgPQgDAEgDAHIAXAAIAAgBQABgGgCgEQgDgEgFAAIgBAAQgDAAgEAEg");
	this.shape_10.setTransform(36.8048,111.975);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2D53AB").s().p("AAXAbIAFgiIAAgEQgBgHgHAAQgFAAgDADQgEADgBAFIgGAiIgHAAIAGgiQAAgFgCgDQgCgDgFAAQgHAAgFAHIgGAmIgIAAIAIg0IAIAAIgBAGQAGgHAJAAQAFAAACADQADACABAEQAHgJAKAAQAHAAAEAGQADAFgBAIIgFAig");
	this.shape_11.setTransform(30.1361,111.925);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2D53AB").s().p("AgNAYQgEgEgDgGQgBgGAAgHQABgHAEgHQADgGAGgEQAFgDAFAAQAGAAAFADQAEAEACAGQADAGgBAHIAAAAQgBAIgDAGQgEAHgFADQgGADgFAAQgHAAgEgDgAgHgOQgFAGgBAIIAAABIAAAGQABAGADADQADAEAEAAQADAAADgCQAEgDADgEQACgFAAgGIAAgGQAAgGgCgDQgDgEgFAAIgBAAQgFAAgEAFg");
	this.shape_12.setTransform(60.5,97.525);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2D53AB").s().p("AgTAgQgEgFAAgKIAAgHQABgIADgFQADgHAFgDQAFgDAGAAQAHAAAEAHIAFgcIAIAAIgMBKIgHAAIABgGQgGAHgIAAQgHAAgEgGgAgHgFQgEADgCAFIgCAMQAAAHACAEQADAEAFAAQAGAAAFgIIAEgXQgDgHgHAAQgEAAgDADg");
	this.shape_13.setTransform(55.575,96.475);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2D53AB").s().p("AgSAVQgDgFABgJIAFghIAIAAIgFAhIAAAEIACAGQACACADAAQAIAAAEgIIAHglIAIAAIgJA0IgIAAIACgFQgGAGgIAAQgHAAgEgGg");
	this.shape_14.setTransform(50.3889,97.575);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2D53AB").s().p("AgPAbIAJg0IAHAAIgBAGQAFgHAHAAIAEABIgBAIIgEAAQgIAAgEAHIgGAlg");
	this.shape_15.setTransform(46.425,97.4734);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2D53AB").s().p("AgJAkIAIg0IAIAAIgIA0gAACgaIgBgEIABgDQAAgBAAAAQABAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgDgBg");
	this.shape_16.setTransform(43.65,96.5688);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2D53AB").s().p("AAKAjIAGggIggAAIgFAgIgJAAIAMhFIAJAAIgFAeIAfAAIAFgeIAJAAIgMBFg");
	this.shape_17.setTransform(39.275,96.625);

	this.instance_1 = new lib.Bitmap1();
	this.instance_1.setTransform(0,0,1.0217,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.instance}]}).wait(3));

	// Layer_3
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("rgba(51,51,51,0.2)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_18.setTransform(41.55,68.6125);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(51,51,51,0.498)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_19.setTransform(41.55,68.6125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_18}]}).to({state:[{t:this.shape_19}]},1).wait(2));

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
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2D53AB").s().p("AgPAWQgFgEABgIIAIAAQAAAEACADQADADAFAAQADAAADgCQAEgCAAgEQABgFgGgDIgIgCQgLgDABgKQAAgGAGgFQAFgEAHAAQAHAAAFAEQAFAFgBAHIgIAAQAAgEgCgCQgDgDgEAAQgDAAgDACQgDADAAADQgBAFAGACIADABQAJACADADQAEAEgBAFQAAAFgDAEQgCAEgFABQgEACgFAAQgHAAgGgFg");
	this.shape_1.setTransform(68.075,111.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2D53AB").s().p("AgSAVQgDgFABgJIAFghIAIAAIgFAhIAAAEIACAGQACACADAAQAIAAAEgIIAHglIAIAAIgJA0IgIAAIACgFQgGAGgIAAQgHAAgEgGg");
	this.shape_2.setTransform(63.3889,111.225);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2D53AB").s().p("AgJAlIALhJIAIAAIgLBJg");
	this.shape_3.setTransform(59.775,110.075);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2D53AB").s().p("AgJAlIALhJIAIAAIgLBJg");
	this.shape_4.setTransform(57.525,110.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2D53AB").s().p("AgPAUQgGgHABgLIAAgCQABgHAEgGQADgHAGgDQAFgDAFAAQAHAAAFAFQAEAFAAAJIAAAHIAAADIggAAQAAAHADAFQADAFAGAAQAGAAAGgHIAFAEQgDAFgFADQgFACgFAAQgJAAgFgHgAgFgPQgDAEgDAHIAXAAIAAgBQABgGgCgEQgDgEgFAAIgBAAQgDAAgEAEg");
	this.shape_5.setTransform(53.9048,111.175);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2D53AB").s().p("AgNAfIgBAGIgIAAIAMhKIAJAAIgFAcQAGgHAHAAQAHAAAFAGQADAFAAAJIAAAGIAAABQgBAIgDAGQgDAHgFADQgEADgGAAQgIAAgFgHgAgHAAIgEAWQADAIAHAAQAEAAAEgDQADgDADgGIABgMQABgGgDgEQgCgEgFAAQgHAAgFAIg");
	this.shape_6.setTransform(48.7,110.125);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2D53AB").s().p("AgSAVQgDgFABgJIAFghIAIAAIgFAhIAAAEIACAGQACACADAAQAIAAAEgIIAHglIAIAAIgJA0IgIAAIACgFQgGAGgIAAQgHAAgEgGg");
	this.shape_7.setTransform(43.9389,111.225);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2D53AB").s().p("AgPAbIAJg0IAHAAIgBAGQAFgHAHAAIAEABIgBAIIgEAAQgIAAgEAHIgGAlg");
	this.shape_8.setTransform(39.925,111.1234);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2D53AB").s().p("AgPAWQgFgEABgIIAIAAQAAAEACADQADADAFAAQADAAADgCQAEgCAAgEQABgFgGgDIgIgCQgLgDABgKQAAgGAGgFQAFgEAHAAQAHAAAFAEQAFAFgBAHIgIAAQAAgEgCgCQgDgDgEAAQgDAAgDACQgDADAAADQgBAFAGACIADABQAJACADADQAEAEgBAFQAAAFgDAEQgCAEgFABQgEACgFAAQgHAAgGgFg");
	this.shape_9.setTransform(73.375,96.725);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2D53AB").s().p("AgSAVQgDgFABgJIAFghIAIAAIgFAhIAAAEIACAGQACACADAAQAIAAAEgIIAHglIAIAAIgJA0IgIAAIACgFQgGAGgIAAQgHAAgEgGg");
	this.shape_10.setTransform(68.6889,96.775);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2D53AB").s().p("AgMAYQgFgEgCgFQgCgGABgIIAAgBQABgIADgGQAEgGAFgDQAFgDAGAAQAHAAAFAFQAFAGAAAIIgIAAQAAgFgDgEQgCgDgFAAQgFAAgEAFQgFAFgBAJIAAABIAAAGQAAAGADADQADAEAFAAQADAAAEgDQADgDABgEIAIAAQgBAFgDAEQgDAEgEACQgFACgEAAQgGAAgEgDg");
	this.shape_11.setTransform(63.7583,96.725);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2D53AB").s().p("AgJAkIAJg0IAHAAIgHA0gAABgaIgBgEIABgDQABgBAAAAQABAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAABAAQAAABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgEgBg");
	this.shape_12.setTransform(60.25,95.7688);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2D53AB").s().p("AgPAbIAJg0IAHAAIgBAGQAFgHAHAAIAEABIgBAIIgEAAQgIAAgEAHIgGAlg");
	this.shape_13.setTransform(57.675,96.6734);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2D53AB").s().p("AgNAfIgBAGIgIAAIAMhKIAJAAIgFAcQAGgHAHAAQAHAAAFAGQADAFAAAJIAAAGIAAABQgBAIgDAGQgDAHgFADQgEADgGAAQgIAAgFgHgAgHAAIgEAWQADAIAHAAQAEAAAEgDQADgDADgGIABgMQABgGgDgEQgCgEgFAAQgHAAgFAIg");
	this.shape_14.setTransform(53.2,95.675);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2D53AB").s().p("AAXAbIAFgiIAAgEQgBgHgHAAQgFAAgDADQgEADgBAFIgGAiIgHAAIAGgiQAAgFgCgDQgCgDgFAAQgHAAgFAHIgGAmIgIAAIAIg0IAIAAIgBAGQAGgHAJAAQAFAAACADQADACABAEQAHgJAKAAQAHAAAEAGQADAFgBAIIgFAig");
	this.shape_15.setTransform(46.5861,96.675);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2D53AB").s().p("AgSAVQgDgFABgJIAFghIAIAAIgFAhIAAAEIACAGQACACADAAQAIAAAEgIIAHglIAIAAIgJA0IgIAAIACgFQgGAGgIAAQgHAAgEgGg");
	this.shape_16.setTransform(40.4389,96.775);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2D53AB").s().p("AgTAjIALhFIAIAAIgJA+IAdAAIgBAHg");
	this.shape_17.setTransform(35.175,95.825);

	this.instance = new lib._7();
	this.instance.setTransform(0,0,0.3303,0.4378);

	this.instance_1 = new lib.Bitmap1();
	this.instance_1.setTransform(0,0,1.0217,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(3));

	// Layer_3
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("rgba(51,51,51,0.2)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_18.setTransform(41.55,68.6125);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(51,51,51,0.498)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_19.setTransform(41.55,68.6125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_18}]}).to({state:[{t:this.shape_19}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8,-1.5,108.2,130.2);


(lib.gem1copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAOAtIAAgqQAAgGgDgDQgDgEgHAAQgEAAgEAEQgDADgDADIAAAtIgLAAIAAhZIALAAIAAAiQAHgIALgBQAUABAAAVIAAAqg");
	this.shape.setTransform(61.15,96.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGANAAIAKAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAHgDAGAAQAKAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgOANQAAAFADADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgJAAQgSAAAAAMg");
	this.shape_1.setTransform(54.55,97.625);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAOAgIAAgpQAAgHgDgDQgDgDgHAAQgEAAgEADQgDADgDAEIAAAsIgLAAIAAg+IAKAAIABAIQAHgJALAAQAUAAAAAWIAAApg");
	this.shape_2.setTransform(48,97.575);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAHgDAGAAQAKAAAGAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgOANQgBAFAEADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgJAAQgSAAAAAMg");
	this.shape_3.setTransform(41.4,97.625);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_4.setTransform(36.025,96.925);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABAAAAgBQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAABQAAAAgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBg");
	this.shape_5.setTransform(80.475,78.075);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgTAlQgHgJAAgPIAAgBQAAgNAHgJQAHgJALAAQAKAAAHAHIAAggIALAAIAABZIgKAAIgBgHQgGAHgLABQgLgBgHgIgAgKgEQgFAGAAALQAAAMAFAFQAEAGAHABQAKAAAFgKIAAgcQgFgJgKAAQgHAAgEAGg");
	this.shape_6.setTransform(75.475,77.95);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgaAtIAAhYIAKAAIABAIQAGgJALABQAMAAAGAIQAHAJAAAPIAAABQAAAOgHAIQgGAJgMAAQgKAAgHgHIAAAfgAgPgZIAAAcQAFAKAKgBQAGAAAGgGQAEgGAAgLQAAgLgEgGQgFgGgHAAQgKgBgFAKg");
	this.shape_7.setTransform(66.05,80.4);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgSAbQgGgGAAgMIAAgoIALAAIAAAoQAAAOAMAAQALAAAEgJIAAgtIALAAIAAA+IgLAAIAAgGQgGAHgLAAQgLAAgEgFg");
	this.shape_8.setTransform(59.25,79.275);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgTAlQgHgJAAgPIAAgBQAAgNAHgJQAHgJALAAQAKAAAHAHIAAggIALAAIAABZIgKAAIgBgHQgGAHgLABQgLgBgHgIgAgKgEQgFAGAAALQAAAMAFAFQAEAGAHABQAKAAAFgKIAAgcQgFgJgKAAQgHAAgEAGg");
	this.shape_9.setTransform(52.425,77.95);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABAAAAgBQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAABQAAAAgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBg");
	this.shape_10.setTransform(47.775,78.075);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAOAtIAAgqQAAgGgDgDQgDgDgHAAQgEAAgEACQgEADgCAEIAAAtIgLAAIAAhZIALAAIAAAjQAHgKALABQAUgBAAAWIAAAqg");
	this.shape_11.setTransform(43,77.9);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAOAgIAAgpQAAgHgDgDQgDgDgHAAQgEAAgEADQgEADgCAEIAAAsIgLAAIAAg+IALAAIAAAIQAHgJALAAQAUAAAAAWIAAApg");
	this.shape_12.setTransform(33.45,79.175);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGAMAAIALAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAGgDAHAAQAKAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgPANQABAFADADQAEACAFAAQAEAAAFgCQAEgDACgEIAAgNIgJAAQgSAAgBAMg");
	this.shape_13.setTransform(26.85,79.225);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgTAlQgHgJAAgPIAAgBQAAgNAHgJQAHgJALAAQAKAAAHAHIAAggIALAAIAABZIgKAAIgBgHQgGAHgLABQgLgBgHgIgAgKgEQgFAGAAALQAAAMAFAFQAEAGAHABQAKAAAFgKIAAgcQgFgJgKAAQgHAAgEAGg");
	this.shape_14.setTransform(20.075,77.95);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AANAtIgUgeIgIAHIAAAXIgKAAIAAhZIAKAAIAAA2IAHgHIASgUIANAAIgXAZIAaAlg");
	this.shape_15.setTransform(78.05,59.5);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABgBAAAAQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAABAAAAQAAABAAABQAAAAgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAgBgBg");
	this.shape_16.setTransform(73.175,59.675);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_17.setTransform(69.575,60.125);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_18.setTransform(64.675,60.825);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAFgDAGAAQAMAAAFAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgOANQAAAFADADQAEACAFAAQAEAAAFgCQAEgDACgEIAAgNIgIAAQgUAAABAMg");
	this.shape_19.setTransform(58.3,60.825);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgFAtIAAhZIALAAIAABZg");
	this.shape_20.setTransform(53.6,59.5);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgQAlIAAAHIgKAAIAAhZIALAAIAAAiQAGgIALAAQALAAAHAJQAHAIAAAPIAAABQAAAOgHAJQgHAIgLAAQgKAAgIgIgAgPAAIAAAaQAFALAKgBQAHAAAEgFQAFgHAAgLQAAgMgEgFQgFgGgHAAQgLAAgEAKg");
	this.shape_21.setTransform(48.9,59.55);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgUAYQgIgJAAgPIAAAAQAAgJAEgHQADgIAHgEQAGgEAIAAQANAAAIAJQAIAJAAAOIAAABQAAAJgEAHQgDAIgHAEQgGAEgJAAQgMAAgIgJgAgMgRQgFAHAAALQAAAKAFAHQAFAGAHAAQAIAAAFgGQAFgHAAgLQAAgKgFgGQgFgHgIAAQgHAAgFAGg");
	this.shape_22.setTransform(41.975,60.825);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgFAtIAAhZIAKAAIAABZg");
	this.shape_23.setTransform(37.1,59.5);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgaAsIAAhWIAKAAIABAGQAGgHALgBQAMAAAGAJQAHAIAAAQIAAABQAAANgHAKQgGAIgMAAQgKAAgHgHIAAAegAgPgaIAAAeQAFAIAKABQAGgBAGgGQAEgGAAgLQAAgLgEgGQgFgHgHAAQgKABgFAIg");
	this.shape_24.setTransform(32.4,62);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABgBAAAAQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAABAAAAQAAABAAABQAAAAgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAgBgBg");
	this.shape_25.setTransform(27.475,59.675);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgOAgIAAg+IALAAIAAAHQAEgIAKAAIAEABIAAAKIgFgBQgKAAgDAJIAAAsg");
	this.shape_26.setTransform(24.3,60.775);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_27.setTransform(19.825,60.125);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AAOAtIAAgqQAAgGgDgDQgDgDgGgBQgFAAgDADQgFAEgCADIAAAtIgLAAIAAhZIALAAIAAAiQAHgJALAAQAUAAAAAWIAAAqg");
	this.shape_28.setTransform(61.3,41.1);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgTAbQgFgGAAgMIAAgoIALAAIAAAoQAAAOAMAAQALAAAEgJIAAgtIALAAIAAA+IgKAAIAAgGQgHAHgLAAQgKAAgGgFg");
	this.shape_29.setTransform(54.7,42.475);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgPAlIgBAIIgKAAIAAhZIALAAIAAAhQAHgIAKAAQALAAAIAIQAGAKAAANIAAABQAAAPgHAJQgGAJgLAAQgMAAgGgJgAgPAAIAAAbQAFAJAKABQAHAAAFgHQAEgFAAgNQAAgLgEgFQgEgGgIAAQgKAAgFAKg");
	this.shape_30.setTransform(48.15,41.15);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgSAbQgGgGAAgMIAAgoIALAAIAAAoQAAAOAMAAQALAAAEgJIAAgtIALAAIAAA+IgKAAIAAgGQgHAHgLAAQgLAAgEgFg");
	this.shape_31.setTransform(41.35,42.475);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgBAkQgEgFAAgIIAAgmIgLAAIAAgJIALAAIAAgPIAKAAIAAAPIAMAAIAAAJIgMAAIAAAmQAAAEACACQABACAEAAIAFgBIAAAJIgIABQgHAAgDgEg");
	this.shape_32.setTransform(35.925,41.725);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AAOAgIAAgpQAAgHgDgDQgDgDgGAAQgFAAgDADQgEADgDAEIAAAsIgLAAIAAg+IALAAIAAAIQAHgJALAAQAUAAAAAWIAAApg");
	this.shape_33.setTransform(67.05,23.975);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGAMAAIALAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAGgDAFAAQAMAAAFAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgPANQAAAFAEADQAEACAFAAQAEAAAFgCQAEgDACgEIAAgNIgIAAQgUAAAAAMg");
	this.shape_34.setTransform(60.45,24.025);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_35.setTransform(54.075,24.025);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABgBAAAAQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAABAAAAQAAABAAABQAAAAgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAgBgBg");
	this.shape_36.setTransform(49.575,22.875);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgaAsIAAhWIAKAAIABAGQAHgHAKAAQALgBAHAJQAHAJAAAPIAAABQAAANgHAKQgHAIgLAAQgLAAgGgHIAAAegAgPgZIAAAdQAFAJAKAAQAHgBAEgGQAFgGAAgLQAAgLgFgGQgEgHgHABQgKAAgFAJg");
	this.shape_37.setTransform(44.85,25.2);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAHgEQAIgGANAAIAKAAIAAgFQAAgFgEgEQgCgDgHAAQgFAAgEADQgEADAAAEIgLAAQAAgFAEgEQADgFAGgCQAFgDAGAAQAMAAAFAGQAHAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgBgHQgIAIgJAAQgKAAgGgFgAgOANQAAAFADADQAEACAFAAQAEAAAFgCQAEgDACgEIAAgNIgIAAQgUAAABAMg");
	this.shape_38.setTransform(38.05,24.025);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgZArIAAhVIALAAIAABMIAoAAIAAAJg");
	this.shape_39.setTransform(31.925,22.925);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("#FFFFFF").ss(3,1,1).p("AntpVIPbAAIAASrIvbAAg");
	this.shape_40.setTransform(49.35,59.825);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#16A085").s().p("AntJWIAAyrIPbAAIAASrg");
	this.shape_41.setTransform(49.35,59.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.gem1copy, new cjs.Rectangle(-1.5,-1.5,101.7,122.7), null);


(lib.gem1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgBAgQgDgDAAgIIAAgjIgLAAIAAgIIALAAIAAgOIAJAAIAAAOIALAAIAAAIIgLAAIAAAjQAAAEABABQACACADAAIAFAAIAAAHIgIACQgGgBgDgEg");
	this.shape.setTransform(56.525,94.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgRAYQgFgFAAgLIAAglIAKAAIAAAlQAAANALAAQAKAAAEgIIAAgqIAKAAIAAA5IgKAAIAAgFQgGAHgKAAQgJAAgFgGg");
	this.shape_1.setTransform(51.875,95.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgRAZQgGgFAAgHQAAgJAHgEQAGgFAMAAIAKAAIAAgFQAAgFgDgDQgEgDgFAAQgFAAgDADQgEACAAAEIgKAAQAAgFADgEQADgEAGgCQAFgCAFAAQAKAAAGAFQAGAFAAAIIAAAaQAAAJACAEIAAABIgLAAIgBgGQgHAHgJAAQgIAAgFgFgAgNALQAAAFADADQADADAFgBQADABAFgDQAEgDACgEIAAgLIgIAAQgRAAAAAKg");
	this.shape_2.setTransform(45.85,95.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgEApIAAhRIAJAAIAABRg");
	this.shape_3.setTransform(41.55,93.925);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgEAoIAAg5IAJAAIAAA5gAgDgdQgBAAAAgBQAAAAgBAAQAAgBAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAAAgBQABAAAAAAQABgBABAAQAAAAAAAAQABAAAAAAQABAAABABQAAAAABAAQAAABAAAAQABABAAAAQAAAAABABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAABQgBAAAAAAQAAABgBAAQAAABAAAAQgBAAAAAAQgBABgBAAQAAAAgBAAQAAAAAAAAQgBAAgBgBQAAAAgBAAQAAAAAAgBg");
	this.shape_4.setTransform(77.85,76.875);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgRAiQgHgJABgNIAAgBQgBgMAHgIQAGgIAKAAQAKAAAFAHIAAgfIAKAAIAABSIgJAAIAAgGQgGAHgKAAQgKAAgGgIgAgKgDQgDAEAAALQAAAKADAGQAFAFAGAAQAKAAADgIIAAgaQgEgIgJAAQgGAAgFAGg");
	this.shape_5.setTransform(73.25,76.775);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgYApIAAhQIAJAAIABAHQAGgIAKAAQAKAAAHAIQAFAIABAOIAAABQgBAMgFAIQgHAIgKAAQgJAAgHgGIAAAcgAgOgYIAAAbQAFAIAJAAQAGAAAEgFQAEgGAAgKQAAgKgEgGQgDgGgHAAQgJAAgFAIg");
	this.shape_6.setTransform(64.65,79.025);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgRAYQgFgFAAgLIAAgkIAKAAIAAAkQAAANALAAQAKAAAEgIIAAgpIAKAAIAAA4IgKAAIAAgFQgGAHgKgBQgJABgFgGg");
	this.shape_7.setTransform(58.425,78);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgRAiQgGgJgBgNIAAgBQABgMAGgIQAHgIAKAAQAJAAAGAHIAAgfIAKAAIAABSIgJAAIgBgGQgGAHgJAAQgKAAgHgIgAgJgDQgFAEAAALQAAAKAFAGQADAFAHAAQAJAAAFgIIAAgaQgFgIgJAAQgHAAgDAGg");
	this.shape_8.setTransform(52.15,76.775);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgEAoIAAg5IAJAAIAAA5gAgEgdQAAAAAAgBQAAAAgBAAQAAgBAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQABgBAAAAQAAAAAAgBQABAAAAgBQABAAAAAAQABgBABAAQAAAAAAAAQABAAAAAAQABAAABABQAAAAABAAQAAABAAAAQABABAAAAQAAAAABABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAABQgBAAAAAAQAAABgBAAQAAABAAAAQgBAAAAAAQgBABgBAAQAAAAgBAAQAAAAAAAAQgBAAgBgBQAAAAgBAAQAAAAgBgBg");
	this.shape_9.setTransform(47.9,76.875);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AANApIAAgmQAAgFgDgDQgDgEgGAAQgDAAgEADQgEADgCADIAAApIgKAAIAAhRIAKAAIAAAfQAHgIAJAAQATAAAAAUIAAAmg");
	this.shape_10.setTransform(43.525,76.725);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AANAdIAAglQAAgGgDgDQgDgEgGABQgDAAgEACQgEADgCAEIAAAoIgKAAIAAg4IAKAAIAAAHQAHgJAJABQATgBAAAVIAAAlg");
	this.shape_11.setTransform(34.775,77.9);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgRAZQgGgEAAgIQAAgJAHgEQAGgFAMAAIAKAAIAAgFQAAgFgDgDQgEgDgFAAQgFAAgDACQgEADAAAEIgKAAQAAgEADgFQADgEAGgCQAFgCAFAAQAKAAAGAFQAGAFAAAIIAAAaQAAAJACAEIAAABIgLAAIgBgGQgHAHgJAAQgIAAgFgFgAgNAMQAAAEADADQADACAFAAQADAAAFgCQAEgDACgEIAAgLIgIAAQgRAAAAALg");
	this.shape_12.setTransform(28.75,77.95);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgRAiQgGgJAAgNIAAgBQAAgMAGgIQAHgIAJAAQAKAAAFAHIAAgfIAKAAIAABSIgJAAIAAgGQgGAHgKAAQgJAAgHgIgAgKgDQgDAEAAALQAAAKADAGQAFAFAGAAQAKAAADgIIAAgaQgEgIgJAAQgGAAgFAGg");
	this.shape_13.setTransform(22.5,76.775);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAMApIgTgbIgGAHIAAAUIgKAAIAAhRIAKAAIAAAxIAFgHIARgSIAMAAIgVAXIAYAig");
	this.shape_14.setTransform(75.55,59.525);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgEAoIAAg5IAJAAIAAA5gAgDgdQgBAAAAgBQAAAAgBAAQAAgBAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAAAgBQABAAAAAAQABAAABgBQAAAAAAAAQABAAAAAAQABABABAAQAAAAABAAQAAABAAAAQABABAAAAQAAAAABABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAABQgBAAAAAAQAAABgBAAQAAABAAAAQgBAAAAAAQgBABgBAAQAAAAgBAAQAAAAAAAAQgBAAgBgBQAAAAgBAAQAAAAAAgBg");
	this.shape_15.setTransform(71.1,59.675);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgBAhQgDgEAAgIIAAgjIgLAAIAAgHIALAAIAAgPIAJAAIAAAPIALAAIAAAHIgLAAIAAAjQAAADABACQACACADAAIAFgBIAAAIIgIABQgGAAgDgDg");
	this.shape_16.setTransform(67.775,60.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgLAcQgFgDgDgEQgDgFAAgFIAKAAQAAAFAEADQAEADAFAAQAFAAAEgCQADgCAAgFQAAgEgDgCQgDgCgHgBQgHgCgEgCQgFgBgCgEQgCgDAAgEQAAgHAGgFQAGgFAIAAQAKAAAGAFQAHAFAAAIIgKAAQAAgEgEgDQgDgDgGAAQgEAAgDACQgDACAAAEQAAAEADACQACACAHABQAHACAFACQAFACACADQACADAAAFQAAAIgGAEQgGAFgKAAQgGAAgGgCg");
	this.shape_17.setTransform(63.325,60.75);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgSAZQgFgFAAgHQAAgJAHgEQAGgFAMAAIAKAAIAAgFQAAgFgEgDQgCgDgGAAQgFAAgEACQgDADAAAEIgKAAQAAgFADgEQADgDAFgDQAGgCAFAAQAKAAAGAFQAFAFABAIIAAAaQAAAJACAEIAAABIgKAAIgCgGQgHAHgIAAQgJAAgGgFgAgNAMQAAAEADADQADACAFABQADgBAFgCQAEgDACgDIAAgMIgIAAQgRAAAAALg");
	this.shape_18.setTransform(57.5,60.75);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgEApIAAhRIAJAAIAABRg");
	this.shape_19.setTransform(53.2,59.525);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgOAiIgBAHIgJAAIAAhSIAKAAIAAAfQAHgHAJAAQAKAAAHAIQAFAIABAMIAAABQgBAOgFAIQgHAIgKAAQgKAAgGgIgAgOAAIAAAYQAFAJAJAAQAHAAAEgFQAEgGAAgLQAAgKgEgEQgEgGgHAAQgJAAgFAJg");
	this.shape_20.setTransform(48.9,59.575);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgSAWQgIgIABgOIAAAAQAAgIADgHQADgHAGgDQAGgEAHAAQAMAAAHAIQAIAIAAANIAAABQgBAIgDAHQgDAGgGAEQgHAEgHAAQgLAAgHgIgAgLgPQgEAGAAAKQAAAJAEAGQAFAGAGAAQAHAAAFgGQAFgGAAgKQAAgJgFgGQgFgGgHAAQgGAAgFAGg");
	this.shape_21.setTransform(42.6,60.75);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgEApIAAhRIAJAAIAABRg");
	this.shape_22.setTransform(38.15,59.525);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgXApIAAhQIAJAAIAAAHQAGgIAKAAQAKAAAHAIQAFAIAAAOIAAABQAAAMgFAIQgHAIgKAAQgJAAgHgGIAAAcgAgOgYIAAAbQAFAIAJAAQAGAAAFgFQADgGAAgKQAAgKgDgGQgFgGgGAAQgJAAgFAIg");
	this.shape_23.setTransform(33.85,61.825);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgEAoIAAg5IAJAAIAAA5gAgEgdQAAAAAAgBQAAAAgBAAQAAgBAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQABgBAAAAQAAAAAAgBQABAAAAgBQABAAAAAAQABAAABgBQAAAAAAAAQABAAAAAAQABABABAAQAAAAABAAQAAABAAAAQABABAAAAQAAAAABABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAABQgBAAAAAAQAAABgBAAQAAABAAAAQgBAAAAAAQgBABgBAAQAAAAgBAAQAAAAAAAAQgBAAgBgBQAAAAgBAAQAAAAgBgBg");
	this.shape_24.setTransform(29.35,59.675);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgNAdIAAg4IAKAAIAAAGQAEgIAIABIAFAAIAAAKIgFgBQgJAAgDAJIAAAng");
	this.shape_25.setTransform(26.45,60.7);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgBAhQgDgEAAgIIAAgjIgLAAIAAgHIALAAIAAgPIAJAAIAAAPIALAAIAAAHIgLAAIAAAjQAAADABACQACACADAAIAFgBIAAAIIgIABQgGAAgDgDg");
	this.shape_26.setTransform(22.325,60.1);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AANApIAAgmQAAgFgDgDQgDgEgGAAQgDAAgEADQgEADgCADIAAApIgKAAIAAhRIAKAAIAAAfQAHgIAJAAQATAAAAAUIAAAmg");
	this.shape_27.setTransform(60.275,42.325);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgRAYQgFgFAAgLIAAgkIAKAAIAAAkQAAANALAAQAKAAAEgJIAAgoIAKAAIAAA4IgKAAIAAgFQgGAGgKAAQgJABgFgGg");
	this.shape_28.setTransform(54.225,43.6);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgOAiIAAAHIgJAAIAAhSIAJAAIAAAfQAHgHAJAAQAKAAAHAIQAFAIAAAMIAAABQAAAOgFAIQgHAIgKAAQgKAAgGgIgAgOAAIAAAYQAFAJAJAAQAHAAAEgFQAEgGAAgLQAAgKgEgEQgEgGgHAAQgJAAgFAJg");
	this.shape_29.setTransform(48.25,42.375);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgRAYQgFgFAAgLIAAgkIAKAAIAAAkQAAANALAAQAKAAAEgJIAAgoIAKAAIAAA4IgKAAIAAgFQgGAGgKAAQgJABgFgGg");
	this.shape_30.setTransform(42.025,43.6);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgBAhQgDgFAAgHIAAgjIgLAAIAAgHIALAAIAAgPIAJAAIAAAPIALAAIAAAHIgLAAIAAAjQAAADABACQACACADAAIAFgBIAAAIIgIABQgGAAgDgDg");
	this.shape_31.setTransform(37.025,42.9);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AANAdIAAglQAAgGgDgDQgDgEgGAAQgDAAgEAEQgEACgCAEIAAAoIgKAAIAAg4IAKAAIAAAGQAHgHAJgBQATABAAAUIAAAlg");
	this.shape_32.setTransform(65.525,26.3);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgRAZQgGgFAAgHQAAgJAHgEQAHgFALAAIAKAAIAAgFQAAgFgDgDQgEgDgFAAQgFAAgDACQgEADAAAEIgKAAQAAgFADgDQADgEAFgDQAGgCAFAAQAKAAAGAFQAFAFABAIIAAAaQAAAJACAEIAAABIgLAAIgBgGQgHAHgJAAQgIAAgFgFgAgNAMQAAAEADADQADADAFAAQADAAAFgDQAEgCACgEIAAgMIgIAAQgRAAAAALg");
	this.shape_33.setTransform(59.5,26.35);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgLAbQgFgCgDgEQgDgFAAgFIAKAAQAAAFAEADQAEADAFAAQAFAAAEgDQADgCAAgDQAAgFgDgCQgDgCgHgBQgHgCgEgCQgFgCgCgDQgCgDAAgEQAAgIAGgEQAGgFAIAAQAKAAAGAFQAHAFAAAIIgKAAQAAgEgEgDQgDgDgGAAQgEAAgDACQgDACAAAFQAAADADACQACACAHACQAHABAFACQAFABACAEQACADAAAFQAAAIgGAEQgGAFgKAAQgGAAgGgDg");
	this.shape_34.setTransform(53.675,26.35);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgEAoIAAg5IAJAAIAAA5gAgDgdQgBAAAAgBQAAAAgBAAQAAgBAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAAAgBQABAAAAAAQABAAABgBQAAAAAAAAQABAAAAAAQABABABAAQAAAAABAAQAAABABAAQAAABAAAAQAAAAABABQAAAAAAABQAAABAAAAQAAABAAAAQAAABAAABQgBAAAAAAQAAABAAAAQgBABAAAAQgBAAAAAAQgBABgBAAQAAAAgBAAQAAAAAAAAQgBAAgBgBQAAAAgBAAQAAAAAAgBg");
	this.shape_35.setTransform(49.55,25.275);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgXApIAAhQIAJAAIAAAHQAGgIAKAAQALAAAFAIQAHAIAAAOIAAABQAAAMgHAIQgFAIgLAAQgKAAgFgGIAAAcgAgNgYIAAAbQAEAIAJAAQAGAAAEgFQAFgGAAgKQAAgKgFgGQgEgGgGAAQgJAAgEAIg");
	this.shape_36.setTransform(45.25,27.425);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgSAZQgFgFAAgHQAAgJAHgEQAGgFAMAAIAKAAIAAgFQAAgFgEgDQgCgDgGAAQgFAAgEACQgDADAAAEIgKAAQAAgFADgDQADgEAFgDQAGgCAFAAQAKAAAGAFQAFAFABAIIAAAaQAAAJACAEIAAABIgKAAIgCgGQgHAHgIAAQgJAAgGgFgAgNAMQAAAEADADQADADAFAAQADAAAFgDQAEgCACgEIAAgMIgIAAQgRAAAAALg");
	this.shape_37.setTransform(39.05,26.35);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgXAnIAAhNIALAAIAABFIAkAAIAAAIg");
	this.shape_38.setTransform(33.425,25.35);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("#FFFFFF").ss(3,1,1).p("AntpVIPbAAIAASrIvbAAg");
	this.shape_39.setTransform(49.35,59.825);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#16A085").s().p("AntJWIAAyrIPbAAIAASrg");
	this.shape_40.setTransform(49.35,59.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

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



(lib.benaracopy2d = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E74C3C").s().p("A3pHUQhuAAAAhkIAArfQAAhkBuAAMAvUAAAQBtAAAABkIAALfQAABkhtAAg");
	this.shape.setTransform(162.4,46.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.benaracopy2d, new cjs.Rectangle(0,0,324.8,93.6), null);


(lib.benaracopy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F1C40F").s().p("A3pHUQhuAAAAhkIAArfQAAhkBuAAMAvUAAAQBtAAAABkIAALfQAABkhtAAg");
	this.shape.setTransform(162.4,46.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.benaracopy, new cjs.Rectangle(0,0,324.8,93.6), null);


(lib.benara = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2980B9").s().p("A3pHUQhuAAAAhkIAArfQAAhkBuAAMAvUAAAQBtAAAABkIAALfQAABkhtAAg");
	this.shape.setTransform(162.4,46.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.benara, new cjs.Rectangle(0,0,324.8,93.6), null);


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
	this.shape.setTransform(-43.2854,1.4254,0.5327,0.5327,-90);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#18B8C4").s().p("Ah6CSICRiSIiRiRIAygyIDCDDIjCDDg");
	this.shape_1.setTransform(-43.2854,-6.8982,0.5327,0.5327,-90);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7,p:{y:-3.875}},{t:this.shape_6,p:{y:-3.875}},{t:this.shape_5},{t:this.shape_4,p:{y:0.925}},{t:this.shape_3},{t:this.shape_2,p:{y:1.075}},{t:this.shape_1,p:{y:-6.8982}},{t:this.shape,p:{y:1.4254}}]}).to({state:[{t:this.shape_7,p:{y:-2.275}},{t:this.shape_11},{t:this.shape_6,p:{y:-2.275}},{t:this.shape_10},{t:this.shape_4,p:{y:2.525}},{t:this.shape_9},{t:this.shape_2,p:{y:2.675}},{t:this.shape_1,p:{y:-5.2982}},{t:this.shape,p:{y:3.0254}}]},1).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_4,p:{y:6.525}},{t:this.shape_12},{t:this.shape_2,p:{y:6.675}},{t:this.shape_1,p:{y:-1.2982}},{t:this.shape,p:{y:7.0254}}]},1).wait(2));

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
	this.shape.setTransform(-38.9388,-3.0016,0.7123,0.7881,180);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#ED4F44").s().p("Ah3C3QgGgDAAgHIAAgiQAAgOAMgJICPhrQAEgEAAgFQAAgFgEgDIiPhsQgMgIAAgOIAAgiQAAgHAGgDQAHgDAFAEIDkCrQAFAEAAAGQAAAHgFAEIjkCrQgDACgEAAIgFgBg");
	this.shape_1.setTransform(-45.2245,-3.0213,0.7123,0.7881,180);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10,p:{y:-3.875}},{t:this.shape_9,p:{y:-3.875}},{t:this.shape_8},{t:this.shape_7,p:{y:0.925}},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{scaleX:0.7123,scaleY:0.7881,x:-45.2245,y:-3.0213}},{t:this.shape,p:{scaleX:0.7123,scaleY:0.7881,x:-38.9388,y:-3.0016}}]}).to({state:[{t:this.shape_10,p:{y:-1.875}},{t:this.shape_18},{t:this.shape_9,p:{y:-1.875}},{t:this.shape_17},{t:this.shape_7,p:{y:2.925}},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_1,p:{scaleX:0.7116,scaleY:0.7875,x:-45.2163,y:-2.7598}},{t:this.shape,p:{scaleX:0.7116,scaleY:0.7875,x:-38.9363,y:-2.7401}}]},1).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_7,p:{y:6.425}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_1,p:{scaleX:0.7116,scaleY:0.7875,x:-45.2163,y:-0.8598}},{t:this.shape,p:{scaleX:0.7116,scaleY:0.7875,x:-38.9363,y:-0.8401}}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.4,-25.6,118.1,49);


(lib.btnInfo = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag5DXQgHgIAAgOQAAgqAzilQADgIAAgGQAAgHgGAAQgHAAgJAFQgJAGgeAcIgPgLQAiglAcgQQAcgQAUAAQAKAAAGAFQAGAFAAAIQAAAKgWBJQgjB5AAAaQAAAFACADQACADADAAQAKAAAtgrIAOAOQgvArgVANQgVAMgOAAQgMAAgHgHgAAkilQgHgIAAgLQAAgPAKgLQAKgLANAAQALAAAHAIQAHAGAAALQAAAPgKAMQgLALgNAAQgKAAgHgHg");
	this.shape.setTransform(-191.925,187.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(5,1,1).p("AFqAAQAACWhqBqQhqBqiWAAQiVAAhrhqQhphqAAiWQAAiVBphqQBrhqCVAAQCWAABqBqQBqBqAACVg");
	this.shape_1.setTransform(-193.75,191.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#04705B").s().p("AkAEAQhphqAAiWQAAiVBphqQBrhqCVAAQCWAABqBqQBqBqAACVQAACWhqBqQhqBqiWAAQiVAAhrhqg");
	this.shape_2.setTransform(-193.75,191.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#04705B").s().p("AAUAvIAAg8QAAgKgEgFQgFgEgJAAQgHAAgFADQgHAFgCAHIAABAIgQAAIAAhbIAPAAIAAAMQALgOAQAAQAdAAAAAhIAAA8g");
	this.shape_3.setTransform(-21.1,193.15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#04705B").s().p("AgHA/IAAhbIAPAAIAABbgAgGguQgCgDAAgDQAAgEACgDQACgCAEAAQAEAAADACQACADAAAEQAAADgCADQgDACgEABQgEgBgCgCg");
	this.shape_4.setTransform(-27.975,191.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#04705B").s().p("AgcAoQgJgIAAgMQAAgOALgHQALgIATAAIAPAAIAAgHQAAgIgFgFQgFgFgJAAQgIAAgFAEQgGAFAAAGIgQAAQAAgHAFgHQAFgGAIgEQAJgDAJAAQAQAAAIAHQAJAIABAOIAAApQAAANADAHIAAACIgQAAQgCgDgBgHQgLALgOAAQgNAAgJgHgAgVASQAAAIAFAEQAFAEAIAAQAGAAAHgEQAGgEADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_5.setTransform(-34.825,193.225);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#04705B").s().p("AAwAvIAAg8QAAgJgEgGQgEgEgLAAQgJAAgGAFQgFAFgBAJIAAA8IgPAAIAAg8QAAgTgTAAQgQgBgGANIAABDIgPAAIAAhbIAOAAIABAKQAKgMARAAQAUAAAFAPQAFgHAHgDQAIgEAJgBQAfAAAAAgIAAA9g");
	this.shape_6.setTransform(-47.05,193.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#04705B").s().p("AgVAvIAAhbIAPAAIABALQAGgNAOAAIAHACIAAAOIgIgBQgOABgFANIAABAg");
	this.shape_7.setTransform(-57.15,193.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#04705B").s().p("AgaAjQgMgMAAgUIAAgDQAAgNAFgLQAGgKAJgGQAJgGAKAAQASAAAKALQAKAMAAAWIAAAFIg9AAQAAAOAIAIQAHAJALAAQAIAAAGgEQAGgDAEgGIAKAIQgMARgXAAQgSAAgLgMgAgOgbQgGAHgCANIAtAAIAAgCQgBgLgFgHQgGgHgKAAQgIAAgHAHg");
	this.shape_8.setTransform(-65.025,193.225);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#04705B").s().p("AgpA+IAAh7IAoAAQATAAAKAJQALAIAAAQQAAAJgFAGQgFAHgJAEQAKACAGAIQAGAHAAALQAAARgLAJQgLAKgTAAgAgZAwIAaAAQALAAAHgFQAHgHAAgKQAAgWgZAAIgaAAgAgZgIIAZAAQAJAAAHgGQAGgFAAgJQAAgKgGgFQgGgEgLAAIgYAAg");
	this.shape_9.setTransform(-74.875,191.65);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#04705B").s().p("AAUBBIgfgqIgKAKIAAAgIgQAAIAAiBIAQAAIAABOIAIgLIAcgdIATAAIgjAlIAnA2g");
	this.shape_10.setTransform(-88.575,191.3);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#04705B").s().p("AgbAmQgIgJAAgQIAAg7IAPAAIAAA7QAAAUARAAQASAAAFgNIAAhCIAQAAIAABbIgPAAIAAgJQgKALgQgBQgPABgHgJg");
	this.shape_11.setTransform(-98.35,193.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#04705B").s().p("AgQBPIAAgMIAHABQAFgBADgCQACgDAAgHIAAhmIAPAAIAABlQAAAbgXAAQgFAAgEgCgAABhBQgBgCAAgEQAAgEABgCQADgDAEAAQAFAAACADQACACAAAEQAAAEgCACQgCADgFAAQgEAAgDgDg");
	this.shape_12.setTransform(-106.075,193.4);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#04705B").s().p("AAUAvIAAg8QAAgKgEgFQgFgEgJAAQgHAAgFADQgHAFgCAHIAABAIgQAAIAAhbIAPAAIAAAMQALgOAQAAQAdAAAAAhIAAA8g");
	this.shape_13.setTransform(-112,193.15);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#04705B").s().p("AgbAmQgIgJAAgQIAAg7IAPAAIAAA7QABAUAQAAQARAAAHgNIAAhCIAPAAIAABbIgPAAIAAgJQgJALgRgBQgPABgHgJg");
	this.shape_14.setTransform(-121.6,193.3);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#04705B").s().p("AgCA0QgFgHAAgLIAAg5IgRAAIAAgMIARAAIAAgVIAOAAIAAAVIARAAIAAAMIgRAAIAAA5QAAAFADADQACACAFAAIAIAAIAAAMIgMABQgLAAgEgFg");
	this.shape_15.setTransform(-129.425,192.2);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#04705B").s().p("AgaAjQgMgMAAgUIAAgDQAAgNAFgLQAGgKAJgGQAJgGAKAAQASAAAKALQAKAMAAAWIAAAFIg9AAQAAAOAIAIQAHAJALAAQAIAAAGgEQAGgDAEgGIAKAIQgMARgXAAQgSAAgLgMgAgOgbQgGAHgCANIAtAAIAAgCQgBgLgFgHQgGgHgKAAQgIAAgHAHg");
	this.shape_16.setTransform(-136.475,193.225);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#04705B").s().p("AgrA+IAAh7IAsAAQAUAAAMAKQALALAAARQAAASgLAIQgLAKgVAAIgcAAIAAAxgAgbAAIAcAAQANAAAHgFQAHgHAAgLQAAgLgHgHQgHgGgMAAIgdAAg");
	this.shape_17.setTransform(-146.225,191.65);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#20F3AF").s().p("AskEIQiiAAAAiGIAAkCQAAiHCiAAIZJAAQCiAAAACHIAAECQAACGiiAAg");
	this.shape_18.setTransform(-98.925,191.7);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(0,0,0,0.149)").s().p("AwIEAQhqhqAAiWQAAiVBqhqQBqhqCWAAQCRAABnBiIXgAAQCiAAAACHIAAEBQAACHiiAAI3gAAQhnBiiRAAQiWAAhqhqg");
	this.shape_19.setTransform(-116.1,206.25);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("Ag1DJQgHgIAAgMQAAgoAwiaQADgIAAgFQAAgGgGAAQgHAAgIAEQgIAGgcAaIgOgKQAggjAagPQAagOASAAQAKgBAGAFQAFAEAAAIQAAAKgVBDQggByAAAXQAAAEACAEQACACADAAQAJAAAqgnIAMAMQgrApgTAMQgVAMgMAAQgMgBgGgGgAAiiaQgHgHAAgLQAAgOAJgKQAKgLAMAAQAKABAHAGQAGAHAAAKQAAAOgJALQgKALgMAAQgKgBgGgGg");
	this.shape_20.setTransform(-186.975,188.1);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#04705B").s().p("AATAsIAAg4QAAgKgEgDQgEgFgJAAQgGAAgGAEQgFADgDAHIAAA8IgPAAIAAhVIAOAAIABALQAJgMAPAAQAbAAABAeIAAA4g");
	this.shape_21.setTransform(-27.375,193.35);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#04705B").s().p("AgGA6IAAhUIANAAIAABUgAgFgrQgDgCAAgEQAAgDADgDQACgCADAAQAEAAACACQADADAAADQAAAEgDACQgCACgEAAQgDAAgCgCg");
	this.shape_22.setTransform(-33.775,191.875);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#04705B").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIAOAAIAAgHQAAgHgFgFQgEgFgJAAQgHAAgFAEQgGAEAAAGIgOAAQAAgGAEgGQAFgGAIgEQAHgDAJAAQAOAAAJAHQAIAHAAANIAAAnQAAAMADAGIAAACIgPAAQgBgDgBgGQgKAKgNAAQgNAAgIgHgAgUARQAAAHAFAEQAFAEAHAAQAGAAAGgEQAGgDADgGIAAgSIgMAAQgaAAAAAQg");
	this.shape_23.setTransform(-40.175,193.425);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#04705B").s().p("AAtAsIAAg4QAAgJgEgEQgEgFgKAAQgIAAgGAFQgFAEgBAJIAAA4IgNAAIAAg4QgBgSgRAAQgPAAgFAMIAAA+IgPAAIAAhVIAOAAIAAAJQAKgLAPABQATAAAFANQAEgGAHgEQAHgDAJAAQAdAAAAAdIAAA5g");
	this.shape_24.setTransform(-51.65,193.35);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#04705B").s().p("AgUAsIAAhVIAPAAIAAAKQAGgMANABIAHAAIAAAOIgIAAQgNAAgFAMIAAA8g");
	this.shape_25.setTransform(-61.025,193.35);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#04705B").s().p("AgZAhQgKgMAAgTIAAgCQAAgMAEgKQAFgKAJgGQAJgFAJAAQARAAAJALQAJALAAAUIAAAFIg5AAQABANAHAIQAHAHAKAAQAHAAAGgDQAFgDAEgFIAJAHQgLAQgVAAQgRAAgLgLgAgNgZQgGAHgBALIAqAAIAAgBQgBgLgFgGQgGgGgJAAQgIAAgGAGg");
	this.shape_26.setTransform(-68.425,193.425);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#04705B").s().p("AgmA6IAAhyIAlAAQASAAAJAHQAKAIAAAPQAAAIgEAHQgFAFgIAEQAKACAFAHQAFAHAAAKQAAAQgKAJQgKAIgTABgAgXAtIAYAAQAKAAAHgFQAGgGAAgKQAAgVgXABIgYAAgAgXgIIAXAAQAJAAAGgEQAGgGAAgIQAAgJgGgFQgFgEgLAAIgWAAg");
	this.shape_27.setTransform(-77.6,191.95);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#04705B").s().p("AASA9IgcgoIgJAKIAAAeIgQAAIAAh5IAQAAIAABJIAHgKIAagbIASAAIghAjIAkAyg");
	this.shape_28.setTransform(-90.4,191.625);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#04705B").s().p("AgZAjQgHgIgBgPIAAg2IAPAAIAAA2QAAATAQAAQAQAAAFgMIAAg9IAPAAIAABUIgOAAIAAgJQgJAKgPAAQgOAAgHgIg");
	this.shape_29.setTransform(-99.525,193.5);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#04705B").s().p("AgPBKIAAgLIAGAAQAFAAADgDQABgCAAgHIAAheIAPAAIAABeQAAAZgVgBQgFAAgEgBgAABg8QgBgDAAgDQAAgEABgCQACgCAEgBQAFABACACQACACAAAEQAAADgCADQgCACgFAAQgEAAgCgCg");
	this.shape_30.setTransform(-106.725,193.6);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#04705B").s().p("AATAsIAAg4QAAgKgEgDQgEgFgJAAQgGAAgGAEQgFADgDAHIAAA8IgPAAIAAhVIAOAAIABALQAJgMAPAAQAbAAABAeIAAA4g");
	this.shape_31.setTransform(-112.275,193.35);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#04705B").s().p("AgZAjQgHgIgBgPIAAg2IAPAAIAAA2QAAATAQAAQAQAAAFgMIAAg9IAPAAIAABUIgOAAIAAgJQgJAKgPAAQgOAAgHgIg");
	this.shape_32.setTransform(-121.275,193.5);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#04705B").s().p("AgBAwQgFgGAAgLIAAg0IgQAAIAAgLIAQAAIAAgVIANAAIAAAVIAQAAIAAALIgQAAIAAA0QAAAFACADQACACAGAAIAGgBIAAAMIgLACQgKAAgDgGg");
	this.shape_33.setTransform(-128.575,192.475);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#04705B").s().p("AgZAhQgKgMAAgTIAAgCQAAgMAEgKQAFgKAJgGQAJgFAJAAQARAAAJALQAJALAAAUIAAAFIg5AAQABANAHAIQAHAHAKAAQAHAAAGgDQAFgDAEgFIAJAHQgLAQgVAAQgRAAgLgLgAgNgZQgGAHgBALIAqAAIAAgBQgBgLgFgGQgGgGgJAAQgIAAgGAGg");
	this.shape_34.setTransform(-135.175,193.425);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#04705B").s().p("AgoA6IAAhyIApAAQATAAALAJQAKAKAAAQQAAAQgKAJQgLAIgTABIgaAAIAAAtgAgZAAIAaAAQAMAAAHgEQAGgHAAgKQAAgKgGgHQgHgGgLAAIgbAAg");
	this.shape_35.setTransform(-144.275,191.95);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AguCwQgHgGAAgLQAAgjAriIIABgLQABgGgGAAQgFAAgHAFQgHAEgZAXIgNgIQAdgfAXgNQAWgNAQAAQAKAAAEAEQAFAEAAAGQAAAJgTA8QgcBjAAAVQAAAEACADQABAAAAABQABAAAAABQABAAAAAAQAAAAABAAQAIAAAlgjIALALQgmAkgRAKQgSALgLAAQgKAAgFgHgAAdiIQgFgGAAgJQAAgNAIgJQAJgJALAAQAIAAAGAGQAFAGAAAJQAAAMgIAKQgIAJgLAAQgJAAgGgGg");
	this.shape_36.setTransform(-178.6,189.175);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#04705B").s().p("AARAmIAAgxQAAgIgEgEQgEgEgHAAQgGAAgEAEQgFADgDAGIAAA0IgNAAIAAhKIANAAIAAAJQAJgKANAAQAYAAAAAaIAAAxg");
	this.shape_37.setTransform(-37.975,193.775);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#04705B").s().p("AgGA0IAAhLIAMAAIAABLgAgFglQgCgDAAgDQAAgDACgCQACgCADgBQAEABACACQACACAAADQAAADgCADQgCACgEAAQgDAAgCgCg");
	this.shape_38.setTransform(-43.6,192.45);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#04705B").s().p("AgXAgQgHgFAAgLQAAgLAJgGQAJgGAPAAIAMAAIAAgGQAAgHgEgEQgEgEgHAAQgGAAgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgFAHgDQAHgDAHAAQANAAAIAHQAHAGAAALIAAAiQAAALADAFIAAACIgNAAQgCgDAAgFQgJAJgMAAQgLAAgHgHgAgRAPQAAAGAEADQAEADAGAAQAFAAAGgDQAFgCACgGIAAgPIgKAAQgWAAAAAOg");
	this.shape_39.setTransform(-49.225,193.85);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#04705B").s().p("AAoAmIAAgwQAAgJgEgEQgEgEgIAAQgHAAgFAFQgFAEAAAHIAAAxIgNAAIAAgwQAAgRgPAAQgOAAgEALIAAA2IgNAAIAAhKIANAAIAAAIQAIgJAOAAQAQAAAEAMQAFgGAGgDQAGgDAHAAQAZAAABAaIAAAxg");
	this.shape_40.setTransform(-59.35,193.775);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#04705B").s().p("AgRAmIAAhKIANAAIAAAJQAFgKAMAAIAFABIAAALIgGAAQgMAAgEALIAAA0g");
	this.shape_41.setTransform(-67.625,193.775);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#04705B").s().p("AgVAdQgKgKAAgRIAAgCQAAgKAEgKQAEgJAIgEQAIgFAIAAQAOAAAJAJQAIAKAAASIAAAFIgyAAQAAAKAHAIQAFAGAJABQAHgBAFgDQAFgCADgFIAIAGQgKAPgTAAQgOAAgJgKgAgLgWQgFAGgCAKIAlAAIAAgBQAAgKgFgFQgFgFgIgBQgHABgFAFg");
	this.shape_42.setTransform(-74.1,193.85);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#04705B").s().p("AgiAzIAAhlIAhAAQAQAAAJAHQAHAHABANQAAAHgFAGQgDAFgIADQAJACAEAGQAGAHgBAJQABANgKAIQgJAIgQAAgAgUAoIAUAAQAKAAAGgFQAFgFAAgIQAAgTgUAAIgVAAgAgUgGIAUAAQAHAAAGgFQAFgEAAgIQAAgIgFgEQgEgEgKAAIgTAAg");
	this.shape_43.setTransform(-82.2,192.525);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#04705B").s().p("AAQA2IgZgjIgIAIIAAAbIgNAAIAAhqIANAAIAAA/IAGgIIAXgYIAQAAIgdAfIAgAsg");
	this.shape_44.setTransform(-93.5,192.25);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#04705B").s().p("AgWAfQgHgGAAgPIAAgvIANAAIAAAvQAAARAOAAQAOABAFgLIAAg2IANAAIAABKIgNAAIAAgIQgIAKgNgBQgMABgGgIg");
	this.shape_45.setTransform(-101.525,193.9);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#04705B").s().p("AgNBBIAAgKIAGABQAEAAACgDQABgCAAgGIAAhTIANAAIAABTQAAAWgSAAQgFAAgDgCgAABg1QgBgCAAgDQAAgDABgCQACgDAEAAQADAAACADQACACAAADQAAADgCACQgCACgDAAQgEAAgCgCg");
	this.shape_46.setTransform(-107.875,193.975);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#04705B").s().p("AARAmIAAgxQAAgIgEgEQgEgEgHAAQgGAAgEAEQgFADgDAGIAAA0IgNAAIAAhKIANAAIAAAJQAJgKANAAQAYAAAAAaIAAAxg");
	this.shape_47.setTransform(-112.775,193.775);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#04705B").s().p("AgWAfQgHgGAAgPIAAgvIANAAIAAAvQAAARAOAAQAOABAFgLIAAg2IANAAIAABKIgNAAIAAgIQgIAKgNgBQgMABgGgIg");
	this.shape_48.setTransform(-120.625,193.9);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#04705B").s().p("AgCAqQgEgFAAgJIAAguIgOAAIAAgKIAOAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAuQAAAEACACQACACAEAAIAGAAIAAAKIgJABQgJABgEgGg");
	this.shape_49.setTransform(-127.15,193);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#04705B").s().p("AgVAdQgKgKAAgRIAAgCQAAgKAEgKQAFgJAIgEQAHgFAIAAQAOAAAJAJQAIAKAAASIAAAFIgyAAQAAAKAHAIQAFAGAJABQAHgBAFgDQAFgCADgFIAIAGQgJAPgTAAQgPAAgJgKgAgLgWQgGAGgBAKIAlAAIAAgBQgBgKgEgFQgFgFgIgBQgHABgFAFg");
	this.shape_50.setTransform(-132.95,193.85);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#04705B").s().p("AgjAzIAAhlIAkAAQARAAAJAJQAJAIAAAOQAAAPgJAHQgJAIgRAAIgXAAIAAAogAgWAAIAXAAQALAAAFgEQAGgFAAgJQAAgKgGgFQgFgFgKgBIgYAAg");
	this.shape_51.setTransform(-140.925,192.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_19,p:{scaleX:1,scaleY:1,x:-116.1,y:206.25}},{t:this.shape_18,p:{scaleX:1,scaleY:1,x:-98.925,y:191.7}},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2,p:{scaleX:1,scaleY:1,x:-193.75,y:191.7}},{t:this.shape_1,p:{scaleX:1,scaleY:1,x:-193.75,y:191.7}},{t:this.shape}]}).to({state:[{t:this.shape_19,p:{scaleX:0.9341,scaleY:0.9341,x:-116.1451,y:205.6359}},{t:this.shape_18,p:{scaleX:0.9341,scaleY:0.9341,x:-100.1026,y:192.0606}},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_2,p:{scaleX:0.9341,scaleY:0.9341,x:-188.6754,y:192.0606}},{t:this.shape_1,p:{scaleX:0.9341,scaleY:0.9341,x:-188.6754,y:192.0606}},{t:this.shape_20}]},1).to({state:[{t:this.shape_19,p:{scaleX:0.8231,scaleY:0.8231,x:-116.1589,y:204.6394}},{t:this.shape_18,p:{scaleX:0.8231,scaleY:0.8231,x:-102.0226,y:192.6834}},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_2,p:{scaleX:0.8231,scaleY:0.8231,x:-180.0706,y:192.6834}},{t:this.shape_1,p:{scaleX:0.8231,scaleY:0.8231,x:-180.0706,y:192.6834}},{t:this.shape_36}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-232.4,151.5,230.20000000000002,91);


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
	this.shape_1.graphics.f("#2D53AB").s().p("AgDAEQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAAAQAAAAAAgBQABAAAAgBQAAAAAAgBQABAAAAAAQAAgBABAAQAAAAABAAQAAAAAAAAQAAAAABAAQAAAAABAAQAAAAABABQAAAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAAAQAAAAAAABQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAIgDgBg");
	this.shape_1.setTransform(71.2,105.625);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2D53AB").s().p("AgXAlIAMhIIAHAAIgBAGQAFgHAJAAQAHAAAEAGQAEAFAAAKIAAAGIAAABQgBAIgDAFQgDAHgFADQgFADgFAAQgIAAgEgGIgFAZgAgFgVIgEAYQACAHAHAAQAGABAEgGQAEgFACgJIAAgEQAAgHgDgEQgCgEgFAAQgGAAgFAHg");
	this.shape_2.setTransform(67.525,104.425);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2D53AB").s().p("AgPAWQgFgEABgIIAIAAQAAAEACADQADADAFAAQADAAADgCQAEgCAAgEQABgFgGgDIgIgCQgLgDABgKQAAgGAGgFQAFgEAHAAQAHAAAFAEQAFAFgBAHIgIAAQAAgEgCgCQgDgDgEAAQgDAAgDACQgDADAAADQgBAFAGACIADABQAJACADADQAEAEgBAFQAAAFgDAEQgCAEgFABQgEACgFAAQgHAAgGgFg");
	this.shape_3.setTransform(62.825,103.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2D53AB").s().p("AgPAUQgGgHABgLIAAgCQABgHAEgGQADgHAGgDQAFgDAFAAQAHAAAFAFQAEAFAAAJIAAAHIAAADIggAAQAAAHADAFQADAFAGAAQAGAAAGgHIAFAEQgDAFgFADQgFACgFAAQgJAAgFgHgAgFgPQgDAEgDAHIAXAAIAAgBQABgGgCgEQgDgEgFAAIgBAAQgDAAgEAEg");
	this.shape_4.setTransform(55.9048,103.475);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2D53AB").s().p("AgMAYQgFgEgCgFQgCgGABgIIAAgBQABgIADgGQAEgGAFgDQAFgDAGAAQAHAAAFAFQAFAGAAAIIgIAAQAAgFgDgEQgCgDgFAAQgFAAgEAFQgFAFgBAJIAAABIAAAGQAAAGADADQADAEAFAAQADAAAEgDQADgDABgEIAIAAQgBAFgDAEQgDAEgEACQgFACgEAAQgGAAgEgDg");
	this.shape_5.setTransform(51.1083,103.475);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2D53AB").s().p("AgJAkIAIg0IAIAAIgIA0gAACgaIgCgEIACgDQAAgBAAAAQABAAAAAAQABgBAAAAQAAAAABAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgDgBg");
	this.shape_6.setTransform(47.6,102.5188);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2D53AB").s().p("AAIAbIAFgiIAAgEQgBgHgGAAQgHAAgFAIIgHAlIgIAAIAJg0IAIAAIgCAHQAGgIAJAAQAGAAAEAFQADAFgBAJIgFAig");
	this.shape_7.setTransform(43.7111,103.425);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2D53AB").s().p("AgSAVQgDgFABgJIAFghIAIAAIgFAhIAAAEIACAGQACACADAAQAIAAAEgIIAHglIAIAAIgJA0IgIAAIACgFQgGAGgIAAQgHAAgEgGg");
	this.shape_8.setTransform(38.9889,103.525);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2D53AB").s().p("AgZAjIALhFIAoAAIgBAHIgfAAIgEAXIAbAAIgBAHIgbAAIgEAZIAfAAIgBAHg");
	this.shape_9.setTransform(34.025,102.575);

	this.instance = new lib._5();
	this.instance.setTransform(0,0,0.1416,0.1956);

	this.instance_1 = new lib.Bitmap1();
	this.instance_1.setTransform(0,0,1.0217,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(3));

	// Layer_3
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(51,51,51,0.2)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_10.setTransform(41.55,68.6125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(51,51,51,0.498)").s().p("AnlJXIgKAAIAAyRIAAgeIPUAAIAKAAIAASHIAAAeQlOAMlaAAQiVAAiXgCg");
	this.shape_11.setTransform(41.55,68.6125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10}]}).to({state:[{t:this.shape_11}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8,-1.5,108.2,130.2);


(lib.bg1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#34495E").s().p("A82E7IgygOIAApZIAygNMA5tAAAIAyANIAAJZIgyAOg");
	this.shape.setTransform(-20.025,1.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg1, new cjs.Rectangle(-209.7,-30,379.4,62.9), null);


(lib.benara_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2ECC71").s().p("A3pHUQhuAAAAhkIAArfQAAhkBuAAMAvUAAAQBtAAAABkIAALfQAABkhtAAg");
	this.shape_1.setTransform(162.4,46.8);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.benara_1, new cjs.Rectangle(0,0,324.8,93.6), null);


(lib.Slots = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// slots
	this.gaga = new lib.pengecoh();
	this.gaga.name = "gaga";
	this.gaga.setTransform(106.75,410.55,1,1,0,0,0,49.4,59.8);

	this.laut = new lib.gem1();
	this.laut.name = "laut";
	this.laut.setTransform(106.75,278.45,1,1,0,0,0,49.4,59.8);

	this.kotakKartu2 = new lib.hasil();
	this.kotakKartu2.name = "kotakKartu2";
	this.kotakKartu2.setTransform(841.2,414.1,1,1,0,0,0,49.4,59.8);

	this.tana = new lib.gem1copy();
	this.tana.name = "tana";
	this.tana.setTransform(841.4,278.6,1.004,1.0029,0,0,0,49.4,59.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.tana},{t:this.kotakKartu2},{t:this.laut},{t:this.gaga}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Slots, new cjs.Rectangle(55.9,217.1,836.5,258.4), null);


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
	this.gaga2 = new lib.gem10();
	this.gaga2.name = "gaga2";
	this.gaga2.setTransform(711.55,410.25,0.8869,0.8869,0,0,0,49.6,60);
	new cjs.ButtonHelper(this.gaga2, 0, 1, 2);

	this.laut5 = new lib.gem8();
	this.laut5.name = "laut5";
	this.laut5.setTransform(472.95,410.25,0.8869,0.8869,0,0,0,49.6,60);
	new cjs.ButtonHelper(this.laut5, 0, 1, 2);

	this.gaga1 = new lib.gem9();
	this.gaga1.name = "gaga1";
	this.gaga1.setTransform(592.8,410.25,0.8869,0.8869,0,0,0,49.6,60);
	new cjs.ButtonHelper(this.gaga1, 0, 1, 2);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.tana},{t:this.laut},{t:this.laut1},{t:this.tana1},{t:this.laut2},{t:this.laut4},{t:this.laut3},{t:this.gaga1},{t:this.laut5},{t:this.gaga2}]}).wait(1));

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


(lib.fff = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgTBmQgIgHAAgLQAAgLAIgHQAIgHALAAQAMAAAIAHQAIAHAAALQAAALgIAHQgIAHgMAAQgLAAgIgHgAgTAmIgGiSIA0AAIgGCSg");
	this.shape.setTransform(262.225,33.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAWBxIAAhjQAAgNgFgFQgGgGgLAAQgPAAgHAKIAABxIgxAAIAAjhIAxAAIAABUQAQgUAZAAQAaAAANAPQAOAQAAAdIAABlg");
	this.shape_1.setTransform(249.4,32.375);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Ag4BFQgQgOgBgUQAAgaAUgNQATgNAjAAIAQAAIAAgIQAAgWgSAAQgSAAAAARIgxAAQgBgXAVgOQATgPAdAAQAfAAASAPQARAPABAaIAABGQAAAWAGALIAAADIgxAAIgFgPQgOASgXAAQgXAAgPgOgAgWAgQgBAHAFAEQAEAEAIAAQAIAAAGgEQAGgEADgFIAAgZIgOAAQgZAAAAAXg");
	this.shape_2.setTransform(232.9,35.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgYBxIAAjhIAxAAIAADhg");
	this.shape_3.setTransform(220.75,32.375);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("Ag4BFQgQgOgBgUQAAgaAUgNQATgNAjAAIAQAAIAAgIQAAgWgSAAQgSAAAAARIgxAAQgBgXAVgOQATgPAdAAQAfAAASAPQARAPABAaIAABGQAAAWAGALIAAADIgxAAIgFgPQgOASgXAAQgXAAgPgOgAgWAgQgBAHAFAEQAEAEAIAAQAIAAAGgEQAGgEADgFIAAgZIgOAAQgZAAAAAXg");
	this.shape_4.setTransform(208.6,35.725);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgpBlQgVgJgLgRQgLgQAAgVIA0AAQAAARAJAJQAJAHATABQANAAAHgGQAIgFAAgLQAAgLgIgHQgIgGgTgGQgVgIgNgGQgpgTAAgkQAAgSAKgNQALgOATgIQATgHAWgBQAYAAASAJQASAIAKAQQALAOAAAVIg0AAQAAgOgIgHQgIgIgOABQgNgBgIAHQgIAGAAAJQAAAJAJAHQAJAGAVAHQAXAHAOAIQAjAUAAAjQAAAdgWAPQgVAQglABQgZAAgVgKg");
	this.shape_5.setTransform(191.125,32.95);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAWBRIAAhkQAAgMgFgFQgEgGgNAAQgOAAgIALIAABwIgxAAIAAieIAvAAIACASQAQgVAcAAQAZAAAMAOQAMAPABAeIAABmg");
	this.shape_6.setTransform(165.6,35.575);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("Ag4BFQgQgOAAgUQgBgaAUgNQATgNAjAAIAQAAIAAgIQAAgWgSAAQgSAAAAARIgyAAQAAgXAVgOQATgPAdAAQAfAAASAPQARAPABAaIAABGQAAAWAGALIAAADIgxAAIgFgPQgOASgXAAQgXAAgPgOgAgWAgQgBAHAFAEQAEAEAIAAQAIAAAGgEQAGgEADgFIAAgZIgPAAQgYAAAAAXg");
	this.shape_7.setTransform(149.1,35.725);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgaBfIgCARIgtAAIAAjiIAyAAIAABQQAOgQAVAAQAeAAAQAVQAQAWAAAmIAAACQAAAngQAWQgQAVgeAAQgXAAgPgUgAgXAAIAABAQAGAMARAAQARAAAFgRQACgIAAgVQAAgXgGgJQgGgKgMAAQgRAAgGAMg");
	this.shape_8.setTransform(132.925,32.525);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("Ag5BFQgQgOAAgUQABgaATgNQATgNAkAAIAPAAIAAgIQAAgWgSAAQgSAAAAARIgxAAQAAgXAUgOQATgPAeAAQAeAAASAPQARAPABAaIAABGQAAAWAHALIAAADIgyAAIgFgPQgNASgYAAQgXAAgQgOgAgWAgQAAAHAEAEQAFAEAHAAQAIAAAGgEQAHgEACgFIAAgZIgOAAQgZAAAAAXg");
	this.shape_9.setTransform(116.1,35.725);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAbBQIgbheIgZBeIgqAAIgmifIAwAAIAPBfIAahfIAiAAIAZBdIAQhdIAvAAIglCfg");
	this.shape_10.setTransform(97.075,35.725);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("Ag5BFQgPgOAAgUQAAgaATgNQATgNAjAAIAQAAIAAgIQAAgWgSAAQgSAAAAARIgyAAQABgXATgOQAUgPAeAAQAeAAARAPQATAPAAAaIAABGQAAAWAGALIAAADIgxAAIgFgPQgOASgXAAQgXAAgQgOgAgXAgQABAHAEAEQAFAEAHAAQAIAAAHgEQAFgEADgFIAAgZIgPAAQgZAAAAAXg");
	this.shape_11.setTransform(78.15,35.725);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("Ag1BbQgUgRAAghIA0AAQAAAPAFAGQAFAHALAAQAKAAAHgIQAFgIAAgOIAAiTIA0AAIAACTQAAAUgKAQQgJAQgRAJQgRAJgVAAQgiAAgTgSg");
	this.shape_12.setTransform(61.15,33.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.instance = new lib.flash0aiAssets_1();
	this.instance.setTransform(-16,0,0.4248,0.4247);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_3
	this.instance_1 = new lib.benaracopy2d();
	this.instance_1.setTransform(128.8,32.4,1,1,0,0,0,162.4,46.8);
	this.instance_1.shadow = new cjs.Shadow("rgba(0,0,0,1)",3,3,4);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.fff, new cjs.Rectangle(-36.6,-17.4,338,107), null);


(lib.dsdsdd = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.text = new cjs.Text("Lokasi Tidak \nSesuai!", "bold 31px 'Roboto Black'");
	this.text.lineHeight = 39;
	this.text.lineWidth = 187;
	this.text.parent = this;
	this.text.setTransform(123.9,-213);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	// Layer_1
	this.instance = new lib.flash0aiAssets_3();
	this.instance.setTransform(7,-220,0.3492,0.3492);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_3
	this.instance_1 = new lib.benaracopy();
	this.instance_1.setTransform(161.6,-174.95,0.9958,1.1617,0,0,0,162.3,46.7);
	this.instance_1.shadow = new cjs.Shadow("rgba(0,0,0,1)",3,3,4);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.dsdsdd, new cjs.Rectangle(-3,-232.2,337,122.99999999999999), null);


(lib.dsd = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgTBmQgIgHAAgLQAAgLAIgHQAIgHALAAQAMAAAIAHQAIAHAAALQAAALgIAHQgIAHgMAAQgLAAgIgHgAgTAmIgGiSIA0AAIgGCSg");
	this.shape.setTransform(239.275,32.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgYBwIAAieIAxAAIAACegAgThGQgIgHAAgKQAAgLAIgHQAIgGALgBQAMABAIAGQAIAHAAALQAAAKgIAHQgIAHgMAAQgLAAgIgHg");
	this.shape_1.setTransform(230.825,31.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Ag4BFQgRgOABgUQgBgaAUgNQATgNAjAAIAQAAIAAgIQAAgWgSAAQgSAAAAARIgyAAQAAgXAVgOQATgPAdAAQAfAAARAPQATAPAAAaIAABGQAAAWAGALIAAADIgxAAIgFgPQgNASgYAAQgXAAgPgOgAgXAgQAAAHAFAEQAFAEAHAAQAIAAAGgEQAGgEADgFIAAgZIgPAAQgZAAAAAXg");
	this.shape_2.setTransform(218.75,34.975);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgjBLQgQgHgKgNQgIgMgBgOIAvAAQABALAGAFQAIAFAJAAQALAAAFgEQAFgEAAgHQAAgGgGgEQgHgEgSgEQgTgEgLgHQgMgGgHgJQgGgKgBgMQAAgWATgPQASgOAcAAQAgAAATAOQAUAPgBAXIgxAAQgBgTgUAAQgGAAgGAEQgFAFAAAGQAAAHAGAEQAHAEANADQAPACAKAEQAkALAAAgQAAAWgTAOQgUAOgfAAQgTAAgQgIg");
	this.shape_3.setTransform(202.75,34.975);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgzA9QgXgWAAgjIAAgEQAAgYAJgTQAJgSASgLQARgKAXAAQAiAAATAVQAUAVAAAlIAAATIhiAAQADANAJAIQAJAHANAAQAXAAAOgQIAXAbQgKAMgRAIQgRAIgUAAQgjAAgXgWgAgXgPIAxAAIAAgDQAAgMgGgHQgGgHgMAAQgVAAgEAdg");
	this.shape_4.setTransform(187.125,34.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgYBxIAAjhIAxAAIAADhg");
	this.shape_5.setTransform(174.6,31.625);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgzA9QgXgWAAgjIAAgEQAAgYAJgTQAJgSASgLQARgKAXAAQAiAAATAVQAUAVAAAlIAAATIhiAAQADANAJAIQAJAHANAAQAXAAAOgQIAXAbQgKAMgRAIQgRAIgUAAQgjAAgXgWgAgXgPIAxAAIAAgDQAAgMgGgHQgGgHgMAAQgVAAgEAdg");
	this.shape_6.setTransform(162.325,34.975);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgpBlQgVgKgLgPQgLgRAAgVIA0AAQAAARAJAIQAJAJATgBQANABAHgGQAIgFAAgKQAAgMgIgGQgIgHgTgHQgVgHgNgGQgpgTAAgkQAAgSAKgOQALgNATgHQATgJAWAAQAYABASAIQASAIAKAQQALAPAAATIg0AAQAAgNgIgHQgIgIgOAAQgNAAgIAHQgIAGAAAKQAAAHAJAHQAJAHAVAHQAXAIAOAIQAjATAAAjQAAAcgWARQgVAQglAAQgZAAgVgKg");
	this.shape_7.setTransform(144.475,32.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.instance = new lib.flash0aiAssets();
	this.instance.setTransform(-12,1,0.3539,0.3539);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_3
	this.instance_1 = new lib.benara();
	this.instance_1.setTransform(128.8,32.4,1,1,0,0,0,162.4,46.8);
	this.instance_1.shadow = new cjs.Shadow("rgba(0,0,0,1)",3,3,4);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.dsd, new cjs.Rectangle(-36.6,-17.4,338,107), null);


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


(lib.bener = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgTBmQgIgHAAgLQAAgLAIgHQAIgHALAAQAMAAAIAHQAIAHAAALQAAALgIAHQgIAHgMAAQgLAAgIgHgAgTAmIgGiSIA0AAIgGCSg");
	this.shape.setTransform(266.475,33.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgwBRIAAieIAvAAIABAUQAMgXAWAAQAJAAAFABIAAAvIgRgCQgXAAgHAPIAABkg");
	this.shape_1.setTransform(257.05,35.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Ag5BFQgPgOAAgUQAAgaATgNQATgNAkAAIAPAAIAAgIQAAgWgSAAQgSAAAAARIgxAAQAAgXATgOQAUgPAeAAQAeAAARAPQASAPABAaIAABGQAAAWAHALIAAADIgyAAIgFgPQgOASgXAAQgXAAgQgOgAgXAgQABAHAEAEQAEAEAIAAQAIAAAHgEQAFgEADgFIAAgZIgOAAQgaAAAAAXg");
	this.shape_2.setTransform(242.75,35.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAWBRIAAhkQAAgMgFgFQgFgGgMAAQgOAAgHALIAABwIgyAAIAAieIAuAAIADASQAQgVAcAAQAZAAAMAOQANAPAAAeIAABmg");
	this.shape_3.setTransform(226.15,35.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgzA9QgXgWAAgjIAAgEQAAgYAJgTQAJgSASgLQARgKAXAAQAiAAATAVQAUAVAAAlIAAATIhiAAQADANAJAIQAJAHANAAQAXAAAOgQIAXAbQgKAMgRAIQgRAIgUAAQgjAAgXgWgAgXgPIAxAAIAAgDQAAgMgGgHQgGgHgMAAQgVAAgEAdg");
	this.shape_4.setTransform(209.575,35.725);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AhSBsIAAjWIBNAAQApAAAVAPQAWAPAAAdQAAARgIALQgHAMgPAGQAQADAJAMQAJANAAARQAAAfgTARQgVAPgnABgAgeBDIAhAAQAOABAHgHQAIgGAAgMQAAgagbgBIgjAAgAgegRIAbAAQAQAAAHgGQAHgGAAgMQAAgOgIgFQgHgHgRAAIgZAAg");
	this.shape_5.setTransform(191.625,32.95);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAWBRIAAhkQAAgMgFgFQgEgGgNAAQgOAAgIALIAABwIgxAAIAAieIAvAAIACASQAQgVAcAAQAZAAAMAOQAMAPABAeIAABmg");
	this.shape_6.setTransform(165.6,35.575);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("Ag4BFQgQgOAAgUQgBgaAUgNQATgNAjAAIAQAAIAAgIQAAgWgSAAQgSAAAAARIgyAAQAAgXAVgOQATgPAdAAQAfAAASAPQARAPABAaIAABGQAAAWAGALIAAADIgxAAIgFgPQgOASgXAAQgXAAgPgOgAgWAgQgBAHAFAEQAEAEAIAAQAIAAAGgEQAGgEADgFIAAgZIgPAAQgYAAAAAXg");
	this.shape_7.setTransform(149.1,35.725);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgaBfIgCARIgtAAIAAjiIAyAAIAABQQAOgQAVAAQAeAAAQAVQAQAWAAAmIAAACQAAAngQAWQgQAVgeAAQgXAAgPgUgAgXAAIAABAQAGAMARAAQARAAAFgRQACgIAAgVQAAgXgGgJQgGgKgMAAQgRAAgGAMg");
	this.shape_8.setTransform(132.925,32.525);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("Ag5BFQgQgOAAgUQABgaATgNQATgNAkAAIAPAAIAAgIQAAgWgSAAQgSAAAAARIgxAAQAAgXAUgOQATgPAeAAQAeAAASAPQARAPABAaIAABGQAAAWAHALIAAADIgyAAIgFgPQgNASgYAAQgXAAgQgOgAgWAgQAAAHAEAEQAFAEAHAAQAIAAAGgEQAHgEACgFIAAgZIgOAAQgZAAAAAXg");
	this.shape_9.setTransform(116.1,35.725);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAbBQIgbheIgZBeIgqAAIgmifIAwAAIAPBfIAahfIAiAAIAZBdIAQhdIAvAAIglCfg");
	this.shape_10.setTransform(97.075,35.725);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("Ag5BFQgPgOAAgUQAAgaATgNQATgNAjAAIAQAAIAAgIQAAgWgSAAQgSAAAAARIgyAAQABgXATgOQAUgPAeAAQAeAAARAPQATAPAAAaIAABGQAAAWAGALIAAADIgxAAIgFgPQgOASgXAAQgXAAgQgOgAgXAgQABAHAEAEQAFAEAHAAQAIAAAHgEQAFgEADgFIAAgZIgPAAQgZAAAAAXg");
	this.shape_11.setTransform(78.15,35.725);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("Ag1BbQgUgRAAghIA0AAQAAAPAFAGQAFAHALAAQAKAAAHgIQAFgIAAgOIAAiTIA0AAIAACTQAAAUgKAQQgJAQgRAJQgRAJgVAAQgiAAgTgSg");
	this.shape_12.setTransform(61.15,33.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.instance = new lib.flash0aiAssets_2();
	this.instance.setTransform(-16,1,0.4247,0.4247);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_3
	this.instance_1 = new lib.benara_1();
	this.instance_1.setTransform(128.8,32.4,1,1,0,0,0,162.4,46.8);
	this.instance_1.shadow = new cjs.Shadow("rgba(0,0,0,1)",3,3,4);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bener, new cjs.Rectangle(-36.6,-17.4,338,107), null);


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


(lib.popUpJawabanAkhir = function(mode,startPosition,loop) {
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

	// jawaban2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2D53AB").s().p("AgPAWQgFgEABgIIAIAAQAAAEACADQADADAFAAQADAAADgCQAEgCAAgEQABgFgGgDIgIgCQgLgDABgKQAAgGAGgFQAFgEAHAAQAHAAAFAEQAFAFgBAHIgIAAQAAgEgCgCQgDgDgEAAQgDAAgDACQgDADAAADQgBAFAGACIADABQAJACADADQAEAEgBAFQAAAFgDAEQgCAEgFABQgEACgFAAQgHAAgGgFg");
	this.shape.setTransform(-837.125,-56.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2D53AB").s().p("AgQAXQgEgEAAgHQABgIAGgEQAHgFAJAAIAJAAIAAgEQABgFgCgCQgDgDgEAAQgEAAgCACQgEACAAAEIgJAAQABgEADgEQADgDAEgCQAEgCAFAAQAIAAAEAFQAEAEAAAIIgEAZIgBAEIABAFIAAABIgJAAIAAgDIAAgCQgHAGgGAAQgHAAgEgEgAgGADQgFADAAAFQgBADADADQACACADAAQAEABADgDIAGgFIACgLIgGAAQgHAAgEACg");
	this.shape_1.setTransform(-842.0225,-56.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2D53AB").s().p("AgXAlIAMhIIAHAAIgBAGQAFgHAJAAQAHAAAEAGQAEAFAAAKIAAAGIAAABQgBAIgDAFQgDAHgFADQgFADgFAAQgIAAgEgGIgFAZgAgFgVIgEAYQACAHAHAAQAGABAEgGQAEgFACgJIAAgEQAAgHgDgEQgCgEgFAAQgGAAgFAHg");
	this.shape_2.setTransform(-847.275,-55.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2D53AB").s().p("AgJAkIAJg0IAHAAIgHA0gAABgaIgBgEIABgDQABgBAAAAQABAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAABAAQAAABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgEgBg");
	this.shape_3.setTransform(-850.55,-57.6812);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2D53AB").s().p("AgGAlQgFAAgFgDQgEgCgDgEIAFgGQAEAHAHABQAGAAADgEQAFgEABgGIABgFQgGAGgHAAQgFAAgDgCQgEgDgCgFQgCgEAAgFIABgHQABgJADgGQADgGAFgDQAFgDAEAAQAJAAAEAHIACgGIAHAAIgIAyQgBAKgHAGQgFAGgIAAIgBAAgAgGgXQgFAGAAAKIAAADQgBAGADAEQACADAFABQAGAAAGgIIAEgXQgDgHgHgBQgGAAgEAGg");
	this.shape_4.setTransform(-854.425,-55.7481);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2D53AB").s().p("AgQAXQgEgEAAgHQABgIAGgEQAHgFAJAAIAJAAIAAgEQABgFgCgCQgDgDgEAAQgEAAgCACQgEACAAAEIgJAAQABgEADgEQADgDAEgCQAEgCAFAAQAIAAAEAFQAEAEAAAIIgEAZIgBAEIABAFIAAABIgJAAIAAgDIAAgCQgHAGgGAAQgHAAgEgEgAgGADQgFADAAAFQgBADADADQACACADAAQAEABADgDIAGgFIACgLIgGAAQgHAAgEACg");
	this.shape_5.setTransform(-822.8725,-68.675);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2D53AB").s().p("AgPAbIAJg0IAHAAIgBAGQAFgHAHAAIAEABIgBAIIgEAAQgIAAgEAHIgGAlg");
	this.shape_6.setTransform(-826.575,-68.7266);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2D53AB").s().p("AgTAgQgEgFAAgKIAAgHQABgIADgFQADgHAFgDQAFgDAGAAQAHAAAEAHIAFgcIAIAAIgMBKIgHAAIABgGQgGAHgIAAQgHAAgEgGgAgHgFQgEADgCAFIgCAMQAAAHACAEQADAEAFAAQAGAAAFgIIAEgXQgDgHgHAAQgEAAgDADg");
	this.shape_7.setTransform(-830.675,-69.725);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2D53AB").s().p("AAIAbIAFgiIAAgEQgBgHgGAAQgHAAgFAIIgHAlIgIAAIAJg0IAIAAIgCAHQAGgIAJAAQAGAAAEAFQADAFgBAJIgFAig");
	this.shape_8.setTransform(-836.1389,-68.725);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2D53AB").s().p("AgPAUQgGgHABgLIAAgCQABgHAEgGQADgHAGgDQAFgDAFAAQAHAAAFAFQAEAFAAAJIAAAHIAAADIggAAQAAAHADAFQADAFAGAAQAGAAAGgHIAFAEQgDAFgFADQgFACgFAAQgJAAgFgHgAgFgPQgDAEgDAHIAXAAIAAgBQABgGgCgEQgDgEgFAAIgBAAQgDAAgEAEg");
	this.shape_9.setTransform(-840.8452,-68.675);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2D53AB").s().p("AgXAlIAMhIIAHAAIgBAGQAFgHAJAAQAHAAAEAGQAEAFAAAKIAAAGIAAABQgBAIgDAFQgDAHgFADQgFADgFAAQgIAAgEgGIgFAZgAgFgVIgEAYQACAHAHAAQAGABAEgGQAEgFACgJIAAgEQAAgHgDgEQgCgEgFAAQgGAAgFAHg");
	this.shape_10.setTransform(-846.225,-67.725);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2D53AB").s().p("AgNAYQgEgEgCgGQgDgGABgHQABgHAEgHQADgGAGgEQAFgDAFAAQAHAAAEADQAEAEACAGQACAGAAAHIAAAAQgBAIgDAGQgEAHgFADQgGADgFAAQgGAAgFgDgAgHgOQgFAGgBAIIAAABIAAAGQABAGADADQACAEAFAAQADAAADgCQAEgDACgEQADgFAAgGIAAgGQAAgGgDgDQgDgEgEAAIgBAAQgFAAgEAFg");
	this.shape_11.setTransform(-851.1,-68.675);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2D53AB").s().p("AgJAlIALhJIAIAAIgLBJg");
	this.shape_12.setTransform(-854.675,-69.775);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2D53AB").s().p("AgNAYQgEgEgCgGQgCgGAAgHQABgHADgHQAEgGAFgEQAGgDAFAAQAHAAAEADQAEAEACAGQADAGgBAHIAAAAQgBAIgEAGQgDAHgGADQgEADgGAAQgHAAgEgDgAgHgOQgFAGAAAIIAAABIAAAGQAAAGADADQADAEAEAAQADAAAEgCQADgDACgEQADgFABgGIAAgGQgBgGgDgDQgDgEgEAAIgBAAQgFAAgEAFg");
	this.shape_13.setTransform(-858.55,-68.675);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2D53AB").s().p("AgMAYQgFgEgCgFQgCgGABgIIAAgBQABgIADgGQAEgGAFgDQAFgDAGAAQAHAAAFAFQAFAGAAAIIgIAAQAAgFgDgEQgCgDgFAAQgFAAgEAFQgFAFgBAJIAAABIAAAGQAAAGADADQADAEAFAAQADAAAEgDQADgDABgEIAIAAQgBAFgDAEQgDAEgEACQgFACgEAAQgGAAgEgDg");
	this.shape_14.setTransform(-863.3917,-68.675);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2D53AB").s().p("AgOAhQgGgCgCgFQgDgFAAgGIAJAAQAAAGADAEQAEADAGABQAGAAAEgDQAEgEABgFQABgIgJgDIgHgDIgCgCQgOgFABgMQABgGADgEQAEgFAFgCQAFgDAGABQAGAAAEACQAFADACAFQADAFAAAGIgJAAQAAgHgDgDQgCgEgHAAQgFAAgEADQgEADgBAGQgBAHAJAEIAGADIADABQANAGAAAMQgBAGgDAEQgEAFgFACQgFACgGAAQgHAAgEgDg");
	this.shape_15.setTransform(-868.5,-69.5792);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2D53AB").s().p("AgJAkIAIg0IAIAAIgIA0gAACgaIgBgEIABgDQAAgBAAAAQABAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgDgBg");
	this.shape_16.setTransform(-998.1,-64.4312);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2D53AB").s().p("AgPAWQgFgEABgIIAIAAQAAAEACADQADADAFAAQADAAADgCQAEgCAAgEQABgFgGgDIgIgCQgLgDABgKQAAgGAGgFQAFgEAHAAQAHAAAFAEQAFAFgBAHIgIAAQAAgEgCgCQgDgDgEAAQgDAAgDACQgDADAAADQgBAFAGACIADABQAJACADADQAEAEgBAFQAAAFgDAEQgCAEgFABQgEACgFAAQgHAAgGgFg");
	this.shape_17.setTransform(-1001.775,-63.475);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2D53AB").s().p("AgPAUQgGgHABgLIAAgCQABgHAEgGQADgHAGgDQAFgDAFAAQAHAAAFAFQAEAFAAAJIAAAHIAAADIggAAQAAAHADAFQADAFAGAAQAGAAAGgHIAFAEQgDAFgFADQgFACgFAAQgJAAgFgHgAgFgPQgDAEgDAHIAXAAIAAgBQABgGgCgEQgDgEgFAAIgBAAQgDAAgEAEg");
	this.shape_18.setTransform(-1006.4452,-63.475);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2D53AB").s().p("AgNAfIgBAGIgIAAIANhKIAIAAIgFAcQAGgHAIAAQAGAAAEAGQAEAFAAAJIAAAGIAAABQAAAIgEAGQgDAHgFADQgFADgFAAQgIAAgFgHgAgHAAIgEAWQADAIAIAAQADAAAEgDQADgDACgGIADgMQAAgGgDgEQgCgEgFAAQgHAAgFAIg");
	this.shape_19.setTransform(-1011.65,-64.525);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2D53AB").s().p("AgPAbIAJg0IAHAAIgBAGQAFgHAHAAIAEABIgBAIIgEAAQgIAAgEAHIgGAlg");
	this.shape_20.setTransform(-1015.425,-63.5266);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2D53AB").s().p("AgNAYQgEgEgDgGQgCgGABgHQABgHADgHQAEgGAFgEQAGgDAGAAQAFAAAFADQAFAEACAGQABAGAAAHIAAAAQgBAIgEAGQgDAHgGADQgFADgFAAQgGAAgFgDgAgHgOQgEAGgBAIIAAABIAAAGQAAAGADADQACAEAFAAQADAAAEgCQADgDADgEQACgFABgGIAAgGQgBgGgCgDQgEgEgEAAIgBAAQgFAAgEAFg");
	this.shape_21.setTransform(-1019.8,-63.475);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2D53AB").s().p("AgQAmIAIgtIgIAAIABgHIAIAAIABgGQABgIAFgEQADgFAIAAIAGABIgBAHIgFAAQgEAAgDACQgCADgBAFIgBAFIAKAAIgBAHIgJAAIgIAtg");
	this.shape_22.setTransform(-1023.35,-64.6273);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2D53AB").s().p("AgPAWQgFgEABgIIAIAAQAAAEACADQADADAFAAQADAAADgCQAEgCAAgEQABgFgGgDIgIgCQgLgDABgKQAAgGAGgFQAFgEAHAAQAHAAAFAEQAFAFgBAHIgIAAQAAgEgCgCQgDgDgEAAQgDAAgDACQgDADAAADQgBAFAGACIADABQAJACADADQAEAEgBAFQAAAFgDAEQgCAEgFABQgEACgFAAQgHAAgGgFg");
	this.shape_23.setTransform(-1030.275,-63.475);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2D53AB").s().p("AgQAXQgEgEAAgHQABgIAGgEQAHgFAJAAIAJAAIAAgEQABgFgCgCQgDgDgEAAQgEAAgCACQgEACAAAEIgJAAQABgEADgEQADgDAEgCQAEgCAFAAQAIAAAEAFQAEAEAAAIIgEAZIgBAEIABAFIAAABIgJAAIAAgDIAAgCQgHAGgGAAQgHAAgEgEgAgGADQgFADAAAFQgBADADADQACACADAAQAEABADgDIAGgFIACgLIgGAAQgHAAgEACg");
	this.shape_24.setTransform(-1035.1725,-63.475);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2D53AB").s().p("AgJAkIAJg0IAHAAIgHA0gAABgaIgBgEIABgDQABgBAAAAQABAAAAAAQABgBAAAAQAAAAABAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgEgBg");
	this.shape_25.setTransform(-1038.55,-64.4312);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2D53AB").s().p("AgPAbIAJg0IAHAAIgBAGQAFgHAHAAIAEABIgBAIIgEAAQgIAAgEAHIgGAlg");
	this.shape_26.setTransform(-1041.125,-63.5266);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2D53AB").s().p("AgPAUQgGgHABgLIAAgCQABgHAEgGQADgHAGgDQAFgDAFAAQAHAAAFAFQAEAFAAAJIAAAHIAAADIggAAQAAAHADAFQADAFAGAAQAGAAAGgHIAFAEQgDAFgFADQgFACgFAAQgJAAgFgHgAgFgPQgDAEgDAHIAXAAIAAgBQABgGgCgEQgDgEgFAAIgBAAQgDAAgEAEg");
	this.shape_27.setTransform(-1045.2452,-63.475);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2D53AB").s().p("AgHAdQgDgDACgHIAFgfIgJAAIABgHIAJAAIACgNIAHAAIgDANIAJAAIgBAHIgJAAIgDAfIAAADQAAABAAAAQAAABAAAAQAAABAAAAQABAAABAAIAEAAIAAAHIgGABQgEAAgDgEg");
	this.shape_28.setTransform(-1049,-64.075);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2D53AB").s().p("AgPAWQgFgEABgIIAIAAQAAAEACADQADADAFAAQADAAADgCQAEgCAAgEQABgFgGgDIgIgCQgLgDABgKQAAgGAGgFQAFgEAHAAQAHAAAFAEQAFAFgBAHIgIAAQAAgEgCgCQgDgDgEAAQgDAAgDACQgDADAAADQgBAFAGACIADABQAJACADADQAEAEgBAFQAAAFgDAEQgCAEgFABQgEACgFAAQgHAAgGgFg");
	this.shape_29.setTransform(-1053.125,-63.475);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2D53AB").s().p("AAUAjIgDgSIgaAAIgJASIgJAAIAjhFIAHAAIANBFgAgFAJIAUAAIgFggg");
	this.shape_30.setTransform(-1058.875,-64.375);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2D53AB").s().p("AgCAEQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAAAQAAAAAAgBQABAAAAgBQAAAAABgBQAAAAAAAAQAAgBABAAQAAAAABAAQAAAAAAAAQAAAAABAAQAAAAABAAQAAAAABABQAAAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAAAQAAAAAAABQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAIgCgBg");
	this.shape_31.setTransform(-1099.4,-62.125);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2D53AB").s().p("AgXAlIAMhIIAHAAIgBAGQAFgHAJAAQAHAAAEAGQAEAFAAAKIAAAGIAAABQgBAIgDAFQgDAHgFADQgFADgFAAQgIAAgEgGIgFAZgAgFgVIgEAYQACAHAHAAQAGABAEgGQAEgFACgJIAAgEQAAgHgDgEQgCgEgFAAQgGAAgFAHg");
	this.shape_32.setTransform(-1103.075,-63.325);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2D53AB").s().p("AgPAWQgFgEABgIIAIAAQAAAEACADQADADAFAAQADAAADgCQAEgCAAgEQABgFgGgDIgIgCQgLgDABgKQAAgGAGgFQAFgEAHAAQAHAAAFAEQAFAFgBAHIgIAAQAAgEgCgCQgDgDgEAAQgDAAgDACQgDADAAADQgBAFAGACIADABQAJACADADQAEAEgBAFQAAAFgDAEQgCAEgFABQgEACgFAAQgHAAgGgFg");
	this.shape_33.setTransform(-1107.775,-64.275);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2D53AB").s().p("AAIAaIgIgTIgNATIgKAAIAUgaIgMgZIAJAAIAHATIANgTIAKAAIgTAZIAMAag");
	this.shape_34.setTransform(-1114.725,-64.275);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2D53AB").s().p("AgJAkIAIg0IAIAAIgIA0gAACgaIgBgEIABgDQAAgBAAAAQABAAAAAAQABAAAAgBQAAAAABAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgDgBg");
	this.shape_35.setTransform(-1117.9,-65.2312);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2D53AB").s().p("AgPAbIAJg0IAHAAIgBAGQAFgHAHAAIAEABIgBAIIgEAAQgIAAgEAHIgGAlg");
	this.shape_36.setTransform(-1120.475,-64.3266);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2D53AB").s().p("AgHAdQgCgDABgHIAEgfIgJAAIABgHIAJAAIADgNIAGAAIgCANIAJAAIgBAHIgJAAIgDAfIAAADQAAABAAAAQAAABAAAAQAAABAAAAQABAAABAAIAEAAIgBAHIgFABQgFAAgCgEg");
	this.shape_37.setTransform(-1123.55,-64.875);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2D53AB").s().p("AgNAYQgEgEgCgGQgDgGABgHQABgHAEgHQADgGAGgEQAFgDAFAAQAHAAAEADQAEAEACAGQACAGAAAHIAAAAQgBAIgDAGQgEAHgFADQgGADgFAAQgGAAgFgDgAgHgOQgFAGgBAIIAAABIAAAGQABAGADADQACAEAFAAQADAAADgCQAEgDACgEQADgFAAgGIAAgGQAAgGgDgDQgDgEgEAAIgBAAQgFAAgEAFg");
	this.shape_38.setTransform(-1127.85,-64.275);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2D53AB").s().p("AgJAkIAIg0IAIAAIgIA0gAACgaIgBgEIABgDQAAgBAAAAQABAAAAAAQABAAAAgBQAAAAABAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgDgBg");
	this.shape_39.setTransform(-1131.4,-65.2312);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2D53AB").s().p("AAIAlIAFgiIAAgEQgBgHgGAAQgHAAgFAIIgHAlIgIAAIAMhJIAJAAIgFAcQAFgHAJAAQAGAAAEAFQADAFgBAIIgFAig");
	this.shape_40.setTransform(-1135.2889,-65.375);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2D53AB").s().p("AgXAlIAMhIIAHAAIgBAGQAFgHAJAAQAHAAAEAGQAEAFAAAKIAAAGIAAABQgBAIgDAFQgDAHgFADQgFADgFAAQgIAAgEgGIgFAZgAgFgVIgEAYQACAHAHAAQAGABAEgGQAEgFACgJIAAgEQAAgHgDgEQgCgEgFAAQgGAAgFAHg");
	this.shape_41.setTransform(-1140.525,-63.325);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2D53AB").s().p("AgPAhQgFgDgDgGQgCgGgBgIIACgNQABgJAEgHQAEgHAFgEQAHgGAIABQAKAAAGAHQAFAHABAMIgBAMQgCAHgDAHQgDAHgEAEQgIAIgKAAQgHAAgEgDgAgFgYQgFAEgDAHQgDAHgBALIAAADQAAAJADAGQAEAFAGAAQAIABAGgHQAFgHACgNIABgJQAAgKgDgFQgDgFgHAAIgCAAQgEAAgEADg");
	this.shape_42.setTransform(-1145.825,-65.1771);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2D53AB").s().p("AgPAWQgFgEABgIIAIAAQAAAEACADQADADAFAAQADAAADgCQAEgCAAgEQABgFgGgDIgIgCQgLgDABgKQAAgGAGgFQAFgEAHAAQAHAAAFAEQAFAFgBAHIgIAAQAAgEgCgCQgDgDgEAAQgDAAgDACQgDADAAADQgBAFAGACIADABQAJACADADQAEAEgBAFQAAAFgDAEQgCAEgFABQgEACgFAAQgHAAgGgFg");
	this.shape_43.setTransform(-1206.675,-57.525);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2D53AB").s().p("AgSAVQgDgFABgJIAFghIAIAAIgFAhIAAAEIACAGQACACADAAQAIAAAEgIIAHglIAIAAIgJA0IgIAAIACgFQgGAGgIAAQgHAAgEgGg");
	this.shape_44.setTransform(-1211.3611,-57.475);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2D53AB").s().p("AgHAdQgCgDAAgHIAGgfIgJAAIABgHIAJAAIABgNIAHAAIgBANIAJAAIgBAHIgJAAIgFAfIAAADQAAABABAAQAAABAAAAQAAABAAAAQABAAABAAIAEAAIAAAHIgGABQgEAAgDgEg");
	this.shape_45.setTransform(-1215.3,-58.125);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2D53AB").s().p("AgQAXQgEgEAAgHQABgIAGgEQAHgFAJAAIAJAAIAAgEQABgFgCgCQgDgDgEAAQgEAAgCACQgEACAAAEIgJAAQABgEADgEQADgDAEgCQAEgCAFAAQAIAAAEAFQAEAEAAAIIgEAZIgBAEIABAFIAAABIgJAAIAAgDIAAgCQgHAGgGAAQgHAAgEgEgAgGADQgFADAAAFQgBADADADQACACADAAQAEABADgDIAGgFIACgLIgGAAQgHAAgEACg");
	this.shape_46.setTransform(-1219.6225,-57.525);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2D53AB").s().p("AAIAbIAFgiIAAgEQgBgHgGAAQgHAAgFAIIgHAlIgIAAIAJg0IAIAAIgCAHQAGgIAJAAQAGAAAEAFQADAFgBAJIgFAig");
	this.shape_47.setTransform(-1224.6389,-57.575);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2D53AB").s().p("AAIAbIAFgiIAAgEQgBgHgGAAQgHAAgFAIIgHAlIgIAAIAJg0IAIAAIgCAHQAGgIAJAAQAGAAAEAFQADAFgBAJIgFAig");
	this.shape_48.setTransform(-1229.6889,-57.575);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2D53AB").s().p("AgJAkIAIg0IAIAAIgIA0gAACgaIgBgEIABgDQAAgBAAAAQABAAAAAAQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgDgBg");
	this.shape_49.setTransform(-1233,-58.4812);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2D53AB").s().p("AgXAlIAMhIIAHAAIgBAGQAFgHAJAAQAHAAAEAGQAEAFAAAKIAAAGIAAABQgBAIgDAFQgDAHgFADQgFADgFAAQgIAAgEgGIgFAZgAgFgVIgEAYQACAHAHAAQAGABAEgGQAEgFACgJIAAgEQAAgHgDgEQgCgEgFAAQgGAAgFAHg");
	this.shape_50.setTransform(-1237.125,-56.575);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2D53AB").s().p("AgPAWQgFgEABgIIAIAAQAAAEACADQADADAFAAQADAAADgCQAEgCAAgEQABgFgGgDIgIgCQgLgDABgKQAAgGAGgFQAFgEAHAAQAHAAAFAEQAFAFgBAHIgIAAQAAgEgCgCQgDgDgEAAQgDAAgDACQgDADAAADQgBAFAGACIADABQAJACADADQAEAEgBAFQAAAFgDAEQgCAEgFABQgEACgFAAQgHAAgGgFg");
	this.shape_51.setTransform(-1202.625,-69.475);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2D53AB").s().p("AgSAVQgDgFABgJIAFghIAIAAIgFAhIAAAEIACAGQACACADAAQAIAAAEgIIAHglIAIAAIgJA0IgIAAIACgFQgGAGgIAAQgHAAgEgGg");
	this.shape_52.setTransform(-1207.2611,-69.425);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2D53AB").s().p("AAIAbIAFgiIAAgEQgBgHgGAAQgHAAgFAIIgHAlIgIAAIAJg0IAIAAIgCAHQAGgIAJAAQAGAAAEAFQADAFgBAJIgFAig");
	this.shape_53.setTransform(-1212.6389,-69.525);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2D53AB").s().p("AgJAkIAJg0IAHAAIgHA0gAABgaIgBgEIABgDQABgBAAAAQABAAAAAAQABAAAAgBQAAAAABAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAABAAQAAABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgEgBg");
	this.shape_54.setTransform(-1215.95,-70.4312);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2D53AB").s().p("AgPAbIAJg0IAHAAIgBAGQAFgHAHAAIAEABIgBAIIgEAAQgIAAgEAHIgGAlg");
	this.shape_55.setTransform(-1218.525,-69.5266);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2D53AB").s().p("AgMAYQgFgEgCgFQgCgGABgIIAAgBQABgIADgGQAEgGAFgDQAFgDAGAAQAHAAAFAFQAFAGAAAIIgIAAQAAgFgDgEQgCgDgFAAQgFAAgEAFQgFAFgBAJIAAABIAAAGQAAAGADADQADAEAFAAQADAAAEgDQADgDABgEIAIAAQgBAFgDAEQgDAEgEACQgFACgEAAQgGAAgEgDg");
	this.shape_56.setTransform(-1222.5917,-69.475);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2D53AB").s().p("AgNAYQgEgEgDgGQgCgGABgHQABgHAEgHQADgGAFgEQAGgDAGAAQAFAAAFADQAFAEACAGQABAGAAAHIAAAAQgBAIgEAGQgDAHgGADQgFADgFAAQgGAAgFgDgAgHgOQgEAGgCAIIAAABIAAAGQABAGADADQACAEAFAAQADAAAEgCQADgDADgEQACgFABgGIAAgGQgBgGgCgDQgEgEgEAAIgBAAQgFAAgEAFg");
	this.shape_57.setTransform(-1227.7,-69.475);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2D53AB").s().p("AgJAlIALhJIAIAAIgLBJg");
	this.shape_58.setTransform(-1231.225,-70.575);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2D53AB").s().p("AgJAkIAJg0IAHAAIgHA0gAABgaIgBgEIABgDQABgBAAAAQABAAAAAAQABAAAAgBQAAAAABAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgEgBg");
	this.shape_59.setTransform(-1233.5,-70.4312);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2D53AB").s().p("AgHAdQgCgDAAgHIAGgfIgJAAIABgHIAJAAIABgNIAIAAIgCANIAJAAIgBAHIgJAAIgFAfIAAADQAAABABAAQAAABAAAAQAAABAAAAQABAAABAAIAEAAIAAAHIgGABQgEAAgDgEg");
	this.shape_60.setTransform(-1236,-70.075);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2D53AB").s().p("AgaAjIALhFIAWAAQAKAAAFAFQAGAGgBAKQgBAKgGAFQgHAGgLAAIgPAAIgEAbgAgMAAIAOAAQAHAAAFgDQAEgDABgHQAAgGgDgEQgDgEgFAAIgPAAg");
	this.shape_61.setTransform(-1240.4679,-70.375);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2D53AB").s().p("AgPAWQgFgEABgIIAIAAQAAAEACADQADADAFAAQADAAADgCQAEgCAAgEQABgFgGgDIgIgCQgLgDABgKQAAgGAGgFQAFgEAHAAQAHAAAFAEQAFAFgBAHIgIAAQAAgEgCgCQgDgDgEAAQgDAAgDACQgDADAAADQgBAFAGACIADABQAJACADADQAEAEgBAFQAAAFgDAEQgCAEgFABQgEACgFAAQgHAAgGgFg");
	this.shape_62.setTransform(-509.375,-173.775);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2D53AB").s().p("AgJAkIAJg0IAHAAIgHA0gAABgaIAAgEIAAgDQABgBAAAAQABAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAABAAQAAABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgEgBg");
	this.shape_63.setTransform(-512.7,-174.7312);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2D53AB").s().p("AgJAlIALhJIAIAAIgLBJg");
	this.shape_64.setTransform(-514.875,-174.875);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2D53AB").s().p("AgQAXQgEgEAAgHQABgIAGgEQAHgFAJAAIAJAAIAAgEQABgFgCgCQgDgDgEAAQgEAAgCACQgEACAAAEIgJAAQABgEADgEQADgDAEgCQAEgCAFAAQAIAAAEAFQAEAEAAAIIgEAZIgBAEIABAFIAAABIgJAAIAAgDIAAgCQgHAGgGAAQgHAAgEgEgAgGADQgFADAAAFQgBADADADQACACADAAQAEABADgDIAGgFIACgLIgGAAQgHAAgEACg");
	this.shape_65.setTransform(-518.7225,-173.775);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2D53AB").s().p("AAIAbIAFgiIAAgEQgBgHgGAAQgHAAgFAIIgHAlIgIAAIAJg0IAIAAIgCAHQAGgIAJAAQAGAAAEAFQADAFgBAJIgFAig");
	this.shape_66.setTransform(-523.7889,-173.825);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2D53AB").s().p("AgJAkIAJg0IAHAAIgHA0gAABgaIAAgEIAAgDQABgBAAAAQABAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAABAAQAAABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgEgBg");
	this.shape_67.setTransform(-527.1,-174.7312);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2D53AB").s().p("AgMAYQgFgEgCgFQgCgGABgIIAAgBQABgIADgGQAEgGAFgDQAFgDAGAAQAHAAAFAFQAFAGAAAIIgIAAQAAgFgDgEQgCgDgFAAQgFAAgEAFQgFAFgBAJIAAABIAAAGQAAAGADADQADAEAFAAQADAAAEgDQADgDABgEIAIAAQgBAFgDAEQgDAEgEACQgFACgEAAQgGAAgEgDg");
	this.shape_68.setTransform(-530.6417,-173.775);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2D53AB").s().p("AgJAkIAJg0IAHAAIgHA0gAABgaIgBgEIABgDQABgBAAAAQABAAAAAAQABgBAAAAQAAAAABAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgEgBg");
	this.shape_69.setTransform(-534.1,-174.7312);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2D53AB").s().p("AgTAgQgEgFAAgKIAAgHQABgIADgFQADgHAFgDQAFgDAGAAQAHAAAEAHIAFgcIAIAAIgMBKIgHAAIABgGQgGAHgIAAQgHAAgEgGgAgHgFQgEADgCAFIgCAMQAAAHACAEQADAEAFAAQAGAAAFgIIAEgXQgDgHgHAAQgEAAgDADg");
	this.shape_70.setTransform(-537.675,-174.825);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2D53AB").s().p("AgPAUQgGgHABgLIAAgCQABgHAEgGQADgHAGgDQAFgDAFAAQAHAAAFAFQAEAFAAAJIAAAHIAAADIggAAQAAAHADAFQADAFAGAAQAGAAAGgHIAFAEQgDAFgFADQgFACgFAAQgJAAgFgHgAgFgPQgDAEgDAHIAXAAIAAgBQABgGgCgEQgDgEgFAAIgBAAQgDAAgEAEg");
	this.shape_71.setTransform(-542.8452,-173.775);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2D53AB").s().p("AAXAbIAFgiIAAgEQgBgHgHAAQgFAAgDADQgEADgBAFIgGAiIgHAAIAGgiQAAgFgCgDQgCgDgFAAQgHAAgFAHIgGAmIgIAAIAIg0IAIAAIgBAGQAGgHAJAAQAFAAACADQADACABAEQAHgJAKAAQAHAAAEAGQADAFgBAIIgFAig");
	this.shape_72.setTransform(-549.5139,-173.825);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#2D53AB").s().p("AgNAYQgEgEgCgGQgCgGAAgHQABgHADgHQAEgGAFgEQAGgDAGAAQAGAAAEADQAFAEABAGQADAGgBAHIAAAAQgBAIgEAGQgDAHgGADQgEADgGAAQgHAAgEgDgAgHgOQgFAGAAAIIAAABIAAAGQAAAGADADQADAEAEAAQADAAAEgCQADgDACgEQADgFABgGIAAgGQgBgGgDgDQgDgEgEAAIgBAAQgFAAgEAFg");
	this.shape_73.setTransform(-519.15,-185.725);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#2D53AB").s().p("AgTAgQgEgFAAgKIAAgHQABgIADgFQADgHAFgDQAFgDAGAAQAHAAAEAHIAFgcIAIAAIgMBKIgHAAIABgGQgGAHgIAAQgHAAgEgGgAgHgFQgEADgCAFIgCAMQAAAHACAEQADAEAFAAQAGAAAFgIIAEgXQgDgHgHAAQgEAAgDADg");
	this.shape_74.setTransform(-524.075,-186.775);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#2D53AB").s().p("AgSAVQgDgFABgJIAFghIAIAAIgFAhIAAAEIACAGQACACADAAQAIAAAEgIIAHglIAIAAIgJA0IgIAAIACgFQgGAGgIAAQgHAAgEgGg");
	this.shape_75.setTransform(-529.2611,-185.675);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#2D53AB").s().p("AgPAbIAJg0IAHAAIgBAGQAFgHAHAAIAEABIgBAIIgEAAQgIAAgEAHIgGAlg");
	this.shape_76.setTransform(-533.225,-185.7766);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#2D53AB").s().p("AgJAkIAJg0IAHAAIgHA0gAABgaIgBgEIABgDQABgBAAAAQABAAAAAAQABAAAAgBQAAAAABAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAABAAQAAABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgEgBg");
	this.shape_77.setTransform(-536,-186.6812);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#2D53AB").s().p("AAKAjIAGggIggAAIgFAgIgJAAIAMhFIAJAAIgFAeIAfAAIAFgeIAJAAIgMBFg");
	this.shape_78.setTransform(-540.375,-186.625);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#2D53AB").s().p("AgPAWQgFgEABgIIAIAAQAAAEACADQADADAFAAQADAAADgCQAEgCAAgEQABgFgGgDIgIgCQgLgDABgKQAAgGAGgFQAFgEAHAAQAHAAAFAEQAFAFgBAHIgIAAQAAgEgCgCQgDgDgEAAQgDAAgDACQgDADAAADQgBAFAGACIADABQAJACADADQAEAEgBAFQAAAFgDAEQgCAEgFABQgEACgFAAQgHAAgGgFg");
	this.shape_79.setTransform(-623.325,-172.975);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#2D53AB").s().p("AgSAVQgDgFABgJIAFghIAIAAIgFAhIAAAEIACAGQACACADAAQAIAAAEgIIAHglIAIAAIgJA0IgIAAIACgFQgGAGgIAAQgHAAgEgGg");
	this.shape_80.setTransform(-628.0111,-172.925);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#2D53AB").s().p("AgJAlIALhJIAIAAIgLBJg");
	this.shape_81.setTransform(-631.625,-174.075);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#2D53AB").s().p("AgJAlIALhJIAIAAIgLBJg");
	this.shape_82.setTransform(-633.875,-174.075);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#2D53AB").s().p("AgPAUQgGgHABgLIAAgCQABgHAEgGQADgHAGgDQAFgDAFAAQAHAAAFAFQAEAFAAAJIAAAHIAAADIggAAQAAAHADAFQADAFAGAAQAGAAAGgHIAFAEQgDAFgFADQgFACgFAAQgJAAgFgHgAgFgPQgDAEgDAHIAXAAIAAgBQABgGgCgEQgDgEgFAAIgBAAQgDAAgEAEg");
	this.shape_83.setTransform(-637.4952,-172.975);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#2D53AB").s().p("AgMAfIgCAGIgHAAIALhKIAJAAIgFAcQAGgHAHAAQAIAAADAGQAFAFAAAJIAAAGIgBABQgBAIgDAGQgDAHgFADQgFADgFAAQgIAAgEgHgAgHAAIgEAWQADAIAHAAQAEAAAEgDQAEgDACgGIABgMQAAgGgCgEQgCgEgFAAQgHAAgFAIg");
	this.shape_84.setTransform(-642.7,-174.025);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#2D53AB").s().p("AgSAVQgDgFABgJIAFghIAIAAIgFAhIAAAEIACAGQACACADAAQAIAAAEgIIAHglIAIAAIgJA0IgIAAIACgFQgGAGgIAAQgHAAgEgGg");
	this.shape_85.setTransform(-647.4611,-172.925);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#2D53AB").s().p("AgPAbIAJg0IAHAAIgBAGQAFgHAHAAIAEABIgBAIIgEAAQgIAAgEAHIgGAlg");
	this.shape_86.setTransform(-651.475,-173.0266);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#2D53AB").s().p("AgPAWQgFgEABgIIAIAAQAAAEACADQADADAFAAQADAAADgCQAEgCAAgEQABgFgGgDIgIgCQgLgDABgKQAAgGAGgFQAFgEAHAAQAHAAAFAEQAFAFgBAHIgIAAQAAgEgCgCQgDgDgEAAQgDAAgDACQgDADAAADQgBAFAGACIADABQAJACADADQAEAEgBAFQAAAFgDAEQgCAEgFABQgEACgFAAQgHAAgGgFg");
	this.shape_87.setTransform(-618.025,-184.925);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#2D53AB").s().p("AgSAVQgDgFABgJIAFghIAIAAIgFAhIAAAEIACAGQACACADAAQAIAAAEgIIAHglIAIAAIgJA0IgIAAIACgFQgGAGgIAAQgHAAgEgGg");
	this.shape_88.setTransform(-622.7111,-184.875);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#2D53AB").s().p("AgMAYQgFgEgCgFQgCgGABgIIAAgBQABgIADgGQAEgGAFgDQAFgDAGAAQAHAAAFAFQAFAGAAAIIgIAAQAAgFgDgEQgCgDgFAAQgFAAgEAFQgFAFgBAJIAAABIAAAGQAAAGADADQADAEAFAAQADAAAEgDQADgDABgEIAIAAQgBAFgDAEQgDAEgEACQgFACgEAAQgGAAgEgDg");
	this.shape_89.setTransform(-627.6417,-184.925);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#2D53AB").s().p("AgJAkIAJg0IAHAAIgHA0gAACgaIgBgEIABgDQAAgBAAAAQABAAAAAAQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAABAAQAAABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgDgBg");
	this.shape_90.setTransform(-631.15,-185.8812);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#2D53AB").s().p("AgPAbIAJg0IAHAAIgBAGQAFgHAHAAIAEABIgBAIIgEAAQgIAAgEAHIgGAlg");
	this.shape_91.setTransform(-633.725,-184.9766);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#2D53AB").s().p("AgMAfIgCAGIgHAAIALhKIAJAAIgFAcQAGgHAHAAQAIAAADAGQAFAFAAAJIAAAGIgBABQgBAIgDAGQgDAHgFADQgFADgFAAQgIAAgEgHgAgHAAIgEAWQADAIAHAAQAEAAAEgDQAEgDACgGIABgMQAAgGgCgEQgCgEgFAAQgHAAgFAIg");
	this.shape_92.setTransform(-638.2,-185.975);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#2D53AB").s().p("AAXAbIAFgiIAAgEQgBgHgHAAQgFAAgDADQgEADgBAFIgGAiIgHAAIAGgiQAAgFgCgDQgCgDgFAAQgHAAgFAHIgGAmIgIAAIAIg0IAIAAIgBAGQAGgHAJAAQAFAAACADQADACABAEQAHgJAKAAQAHAAAEAGQADAFgBAIIgFAig");
	this.shape_93.setTransform(-644.8139,-184.975);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#2D53AB").s().p("AgSAVQgDgFABgJIAFghIAIAAIgFAhIAAAEIACAGQACACADAAQAIAAAEgIIAHglIAIAAIgJA0IgIAAIACgFQgGAGgIAAQgHAAgEgGg");
	this.shape_94.setTransform(-650.9611,-184.875);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#2D53AB").s().p("AgTAjIALhFIAIAAIgJA+IAdAAIgBAHg");
	this.shape_95.setTransform(-656.225,-185.825);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#2D53AB").s().p("AgQAXQgEgEAAgHQABgIAGgEQAHgFAJAAIAJAAIAAgEQABgFgCgCQgDgDgEAAQgEAAgCACQgEACAAAEIgJAAQABgEADgEQADgDAEgCQAEgCAFAAQAIAAAEAFQAEAEAAAIIgEAZIgBAEIABAFIAAABIgJAAIAAgDIAAgCQgHAGgGAAQgHAAgEgEgAgGADQgFADAAAFQgBADADADQACACADAAQAEABADgDIAGgFIACgLIgGAAQgHAAgEACg");
	this.shape_96.setTransform(-828.2725,-188.125);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#2D53AB").s().p("AgJAlIALhJIAIAAIgLBJg");
	this.shape_97.setTransform(-831.575,-189.225);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#2D53AB").s().p("AgJAlIALhJIAIAAIgLBJg");
	this.shape_98.setTransform(-833.775,-189.225);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#2D53AB").s().p("AgJAkIAJg0IAHAAIgHA0gAABgaIgBgEIABgDQABgBAAAAQABAAAAAAQABgBAAAAQAAAAABAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgEgBg");
	this.shape_99.setTransform(-836.05,-189.0812);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#2D53AB").s().p("AgGAlQgFAAgFgDQgEgCgDgEIAFgGQAEAHAHABQAGAAADgEQAFgEABgGIABgFQgGAGgHAAQgFAAgDgCQgEgDgCgFQgCgEAAgFIABgHQABgJADgGQADgGAFgDQAFgDAEAAQAJAAAEAHIACgGIAHAAIgIAyQgBAKgHAGQgFAGgIAAIgBAAgAgGgXQgFAGAAAKIAAADQgBAGADAEQACADAFABQAGAAAGgIIAEgXQgDgHgHgBQgGAAgEAGg");
	this.shape_100.setTransform(-839.975,-187.1481);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#2D53AB").s().p("AAIAbIAFgiIAAgEQgBgHgGAAQgHAAgFAIIgHAlIgIAAIAJg0IAIAAIgCAHQAGgIAJAAQAGAAAEAFQADAFgBAJIgFAig");
	this.shape_101.setTransform(-845.0889,-188.175);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#2D53AB").s().p("AgNAYQgEgEgDgGQgBgGAAgHQABgHAEgHQADgGAGgEQAFgDAGAAQAFAAAFADQAFAEACAGQACAGgBAHIAAAAQgBAIgEAGQgDAHgGADQgFADgFAAQgHAAgEgDgAgHgOQgEAGgCAIIAAABIAAAGQABAGADADQACAEAFAAQADAAADgCQAEgDADgEQACgFAAgGIAAgGQAAgGgCgDQgEgEgEAAIgBAAQgFAAgEAFg");
	this.shape_102.setTransform(-850.05,-188.125);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#2D53AB").s().p("AgXAlIAMhIIAHAAIgBAGQAFgHAJAAQAHAAAEAGQAEAFAAAKIAAAGIAAABQgBAIgDAFQgDAHgFADQgFADgFAAQgIAAgEgGIgFAZgAgFgVIgEAYQACAHAHAAQAGABAEgGQAEgFACgJIAAgEQAAgHgDgEQgCgEgFAAQgGAAgFAHg");
	this.shape_103.setTransform(-855.525,-187.175);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#2D53AB").s().p("AgOAhQgGgCgCgFQgDgFAAgGIAJAAQAAAGADAEQAEADAGABQAGAAAEgDQAEgEABgFQABgIgJgDIgHgDIgCgCQgOgFABgMQABgGADgEQAEgFAFgCQAFgDAGABQAGAAAEACQAFADACAFQADAFAAAGIgJAAQAAgHgDgDQgCgEgHAAQgFAAgEADQgEADgBAGQgBAHAJAEIAGADIADABQANAGAAAMQgBAGgDAEQgEAFgFACQgGACgFAAQgHAAgEgDg");
	this.shape_104.setTransform(-860.4,-189.0292);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#2D53AB").s().p("AgQAXQgEgEAAgHQABgIAGgEQAHgFAJAAIAJAAIAAgEQABgFgCgCQgDgDgEAAQgEAAgCACQgEACAAAEIgJAAQABgEADgEQADgDAEgCQAEgCAFAAQAIAAAEAFQAEAEAAAIIgEAZIgBAEIABAFIAAABIgJAAIAAgDIAAgCQgHAGgGAAQgHAAgEgEgAgGADQgFADAAAFQgBADADADQACACADAAQAEABADgDIAGgFIACgLIgGAAQgHAAgEACg");
	this.shape_105.setTransform(-992.4225,-179.325);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#2D53AB").s().p("AgPAbIAJg0IAHAAIgBAGQAFgHAHAAIAEABIgBAIIgEAAQgIAAgEAHIgGAlg");
	this.shape_106.setTransform(-996.125,-179.3766);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#2D53AB").s().p("AgNAfIgBAGIgIAAIANhKIAIAAIgFAcQAGgHAIAAQAHAAAEAGQADAFAAAJIAAAGIAAABQAAAIgEAGQgDAHgFADQgEADgGAAQgIAAgFgHgAgHAAIgEAWQADAIAIAAQADAAAEgDQADgDACgGIACgMQAAgGgCgEQgCgEgFAAQgHAAgFAIg");
	this.shape_107.setTransform(-1000.6,-180.375);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#2D53AB").s().p("AgQAXQgEgEAAgHQABgIAGgEQAHgFAJAAIAJAAIAAgEQABgFgCgCQgDgDgEAAQgEAAgCACQgEACAAAEIgJAAQABgEADgEQADgDAEgCQAEgCAFAAQAIAAAEAFQAEAEAAAIIgEAZIgBAEIABAFIAAABIgJAAIAAgDIAAgCQgHAGgGAAQgHAAgEgEgAgGADQgFADAAAFQgBADADADQACACADAAQAEABADgDIAGgFIACgLIgGAAQgHAAgEACg");
	this.shape_108.setTransform(-1005.6225,-179.325);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#2D53AB").s().p("AgMAYQgFgEgCgFQgCgGABgIIAAgBQABgIADgGQAEgGAFgDQAFgDAGAAQAHAAAFAFQAFAGAAAIIgIAAQAAgFgDgEQgCgDgFAAQgFAAgEAFQgFAFgBAJIAAABIAAAGQAAAGADADQADAEAFAAQADAAAEgDQADgDABgEIAIAAQgBAFgDAEQgDAEgEACQgFACgEAAQgGAAgEgDg");
	this.shape_109.setTransform(-1010.2917,-179.325);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#2D53AB").s().p("AgPAWQgFgEABgIIAIAAQAAAEACADQADADAFAAQADAAADgCQAEgCAAgEQABgFgGgDIgIgCQgLgDABgKQAAgGAGgFQAFgEAHAAQAHAAAFAEQAFAFgBAHIgIAAQAAgEgCgCQgDgDgEAAQgDAAgDACQgDADAAADQgBAFAGACIADABQAJACADADQAEAEgBAFQAAAFgDAEQgCAEgFABQgEACgFAAQgHAAgGgFg");
	this.shape_110.setTransform(-1015.225,-179.325);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#2D53AB").s().p("AgQAXQgEgEAAgHQABgIAGgEQAHgFAJAAIAJAAIAAgEQABgFgCgCQgDgDgEAAQgEAAgCACQgEACAAAEIgJAAQABgEADgEQADgDAEgCQAEgCAFAAQAIAAAEAFQAEAEAAAIIgEAZIgBAEIABAFIAAABIgJAAIAAgDIAAgCQgHAGgGAAQgHAAgEgEgAgGADQgFADAAAFQgBADADADQACACADAAQAEABADgDIAGgFIACgLIgGAAQgHAAgEACg");
	this.shape_111.setTransform(-1022.4225,-179.325);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#2D53AB").s().p("AgJAkIAIg0IAIAAIgIA0gAABgaIgBgEIABgDQABgBAAAAQABAAAAAAQABgBAAAAQAAAAABAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgEgBg");
	this.shape_112.setTransform(-1025.75,-180.2812);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#2D53AB").s().p("AgPAbIAJg0IAHAAIgBAGQAFgHAHAAIAEABIgBAIIgEAAQgIAAgEAHIgGAlg");
	this.shape_113.setTransform(-1028.325,-179.3766);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#2D53AB").s().p("AgSAVQgDgFABgJIAFghIAIAAIgFAhIAAAEIACAGQACACADAAQAIAAAEgIIAHglIAIAAIgJA0IgIAAIACgFQgGAGgIAAQgHAAgEgGg");
	this.shape_114.setTransform(-1032.4611,-179.275);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#2D53AB").s().p("AAIAlIAFgiIAAgEQgBgHgGAAQgHAAgFAIIgHAlIgIAAIAMhJIAJAAIgFAcQAFgHAJAAQAGAAAEAFQADAFgBAIIgFAig");
	this.shape_115.setTransform(-1037.7889,-180.425);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#2D53AB").s().p("AgHAdQgCgDABgHIAEgfIgJAAIACgHIAIAAIADgNIAHAAIgDANIAJAAIgBAHIgJAAIgDAfIAAADQAAABAAAAQAAABAAAAQAAABAAAAQABAAABAAIAEAAIgBAHIgFABQgFAAgCgEg");
	this.shape_116.setTransform(-1041.45,-179.925);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#2D53AB").s().p("AgNAYQgEgEgCgGQgCgGAAgHQABgHADgHQAEgGAFgEQAGgDAFAAQAHAAAEADQAEAEACAGQADAGgBAHIAAAAQgBAIgEAGQgDAHgGADQgEADgGAAQgHAAgEgDgAgHgOQgFAGAAAIIAAABIAAAGQAAAGADADQADAEAEAAQADAAAEgCQADgDACgEQADgFABgGIAAgGQgBgGgDgDQgDgEgEAAIgBAAQgFAAgEAFg");
	this.shape_117.setTransform(-1045.75,-179.325);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#2D53AB").s().p("AgJAlIALhJIAIAAIgLBJg");
	this.shape_118.setTransform(-1049.275,-180.425);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#2D53AB").s().p("AgNAYQgEgEgCgGQgDgGABgHQABgHADgHQAEgGAGgEQAFgDAFAAQAHAAAEADQAEAEACAGQACAGAAAHIAAAAQgBAIgDAGQgEAHgFADQgGADgFAAQgGAAgFgDgAgHgOQgFAGgBAIIAAABIAAAGQABAGADADQACAEAFAAQADAAADgCQAEgDACgEQADgFAAgGIAAgGQAAgGgDgDQgDgEgEAAIgBAAQgFAAgEAFg");
	this.shape_119.setTransform(-1053.15,-179.325);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#2D53AB").s().p("AAKAjIAGggIggAAIgFAgIgJAAIAMhFIAJAAIgFAeIAfAAIAFgeIAJAAIgMBFg");
	this.shape_120.setTransform(-1058.875,-180.225);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#2D53AB").s().p("AAXAbIAFgiIAAgEQgBgHgHAAQgFAAgDADQgEADgBAFIgGAiIgHAAIAGgiQAAgFgCgDQgCgDgFAAQgHAAgFAHIgGAmIgIAAIAIg0IAIAAIgBAGQAGgHAJAAQAFAAACADQADACABAEQAHgJAKAAQAHAAAEAGQADAFgBAIIgFAig");
	this.shape_121.setTransform(-1108.2639,-173.825);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#2D53AB").s().p("AgSAVQgDgFABgJIAFghIAIAAIgFAhIAAAEIACAGQACACADAAQAIAAAEgIIAHglIAIAAIgJA0IgIAAIACgFQgGAGgIAAQgHAAgEgGg");
	this.shape_122.setTransform(-1114.4611,-173.725);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#2D53AB").s().p("AgPAWQgFgEABgIIAIAAQAAAEACADQADADAFAAQADAAADgCQAEgCAAgEQABgFgGgDIgIgCQgLgDABgKQAAgGAGgFQAFgEAHAAQAHAAAFAEQAFAFgBAHIgIAAQAAgEgCgCQgDgDgEAAQgDAAgDACQgDADAAADQgBAFAGACIADABQAJACADADQAEAEgBAFQAAAFgDAEQgCAEgFABQgEACgFAAQgHAAgGgFg");
	this.shape_123.setTransform(-1119.525,-173.775);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#2D53AB").s().p("AgNAYQgEgEgDgGQgBgGAAgHQABgHAEgHQADgGAGgEQAFgDAFAAQAHAAAEADQAEAEACAGQACAGAAAHIAAAAQgBAIgDAGQgEAHgFADQgGADgFAAQgHAAgEgDgAgHgOQgFAGgBAIIAAABIAAAGQABAGADADQACAEAFAAQADAAADgCQAEgDADgEQACgFAAgGIAAgGQAAgGgCgDQgDgEgFAAIgBAAQgFAAgEAFg");
	this.shape_124.setTransform(-1124.45,-173.775);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#2D53AB").s().p("AgHAdQgDgDABgHIAGgfIgJAAIABgHIAJAAIABgNIAHAAIgBANIAJAAIgBAHIgJAAIgFAfIAAADQAAABABAAQAAABAAAAQAAABAAAAQABAAABAAIAEAAIgBAHIgFABQgFAAgCgEg");
	this.shape_125.setTransform(-1128.35,-174.375);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#2D53AB").s().p("AgPAUQgGgHABgLIAAgCQABgHAEgGQADgHAGgDQAFgDAFAAQAHAAAFAFQAEAFAAAJIAAAHIAAADIggAAQAAAHADAFQADAFAGAAQAGAAAGgHIAFAEQgDAFgFADQgFACgFAAQgJAAgFgHgAgFgPQgDAEgDAHIAXAAIAAgBQABgGgCgEQgDgEgFAAIgBAAQgDAAgEAEg");
	this.shape_126.setTransform(-1132.3952,-173.775);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#2D53AB").s().p("AgPAWQgFgEABgIIAIAAQAAAEACADQADADAFAAQADAAADgCQAEgCAAgEQABgFgGgDIgIgCQgLgDABgKQAAgGAGgFQAFgEAHAAQAHAAAFAEQAFAFgBAHIgIAAQAAgEgCgCQgDgDgEAAQgDAAgDACQgDADAAADQgBAFAGACIADABQAJACADADQAEAEgBAFQAAAFgDAEQgCAEgFABQgEACgFAAQgHAAgGgFg");
	this.shape_127.setTransform(-1137.325,-173.775);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#2D53AB").s().p("AgQAXQgEgEAAgHQABgIAGgEQAHgFAJAAIAJAAIAAgEQABgFgCgCQgDgDgEAAQgEAAgCACQgEACAAAEIgJAAQABgEADgEQADgDAEgCQAEgCAFAAQAIAAAEAFQAEAEAAAIIgEAZIgBAEIABAFIAAABIgJAAIAAgDIAAgCQgHAGgGAAQgHAAgEgEgAgGADQgFADAAAFQgBADADADQACACADAAQAEABADgDIAGgFIACgLIgGAAQgHAAgEACg");
	this.shape_128.setTransform(-1106.3725,-185.725);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#2D53AB").s().p("AAXAbIAFgiIAAgEQgBgHgHAAQgFAAgDADQgEADgBAFIgGAiIgHAAIAGgiQAAgFgCgDQgCgDgFAAQgHAAgFAHIgGAmIgIAAIAIg0IAIAAIgBAGQAGgHAJAAQAFAAACADQADACABAEQAHgJAKAAQAHAAAEAGQADAFgBAIIgFAig");
	this.shape_129.setTransform(-1112.9139,-185.775);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#2D53AB").s().p("AgPAUQgGgHABgLIAAgCQABgHAEgGQADgHAGgDQAFgDAFAAQAHAAAFAFQAEAFAAAJIAAAHIAAADIggAAQAAAHADAFQADAFAGAAQAGAAAGgHIAFAEQgDAFgFADQgFACgFAAQgJAAgFgHgAgFgPQgDAEgDAHIAXAAIAAgBQABgGgCgEQgDgEgFAAIgBAAQgDAAgEAEg");
	this.shape_130.setTransform(-1119.0952,-185.725);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#2D53AB").s().p("AgTAgQgEgFAAgKIAAgHQABgIADgFQADgHAFgDQAFgDAGAAQAHAAAEAHIAFgcIAIAAIgMBKIgHAAIABgGQgGAHgIAAQgHAAgEgGgAgHgFQgEADgCAFIgCAMQAAAHACAEQADAEAFAAQAGAAAFgIIAEgXQgDgHgHAAQgEAAgDADg");
	this.shape_131.setTransform(-1123.875,-186.775);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#2D53AB").s().p("AgQAXQgEgEAAgHQABgIAGgEQAHgFAJAAIAJAAIAAgEQABgFgCgCQgDgDgEAAQgEAAgCACQgEACAAAEIgJAAQABgEADgEQADgDAEgCQAEgCAFAAQAIAAAEAFQAEAEAAAIIgEAZIgBAEIABAFIAAABIgJAAIAAgDIAAgCQgHAGgGAAQgHAAgEgEgAgGADQgFADAAAFQgBADADADQACACADAAQAEABADgDIAGgFIACgLIgGAAQgHAAgEACg");
	this.shape_132.setTransform(-1129.3225,-185.725);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#2D53AB").s().p("AgJAkIAIg0IAIAAIgIA0gAACgaIgBgEIABgDQAAgBAAAAQABAAAAAAQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgDgBg");
	this.shape_133.setTransform(-1132.65,-186.6812);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#2D53AB").s().p("AgaAjIAMhFIAQAAQAIAAAGAEQAGAEADAIQACAHgBAKIAAACQgCAQgKAJQgJAJgNAAgAgQAcIAJAAQAIAAAHgHQAHgGACgLQABgIAAgHQgBgHgEgEQgEgFgHAAIgJAAg");
	this.shape_134.setTransform(-1136.9357,-186.625);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#2D53AB").s().p("AgDAEQAAAAAAgBQAAAAgBAAQAAgBAAgBQAAAAAAgBQAAAAAAAAQAAgBAAAAQABgBAAAAQAAAAAAgBQABAAAAAAQAAgBABAAQAAAAABAAQAAAAAAAAQAAAAABAAQAAAAABAAQAAAAABABQAAAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAAAABQgBAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAIgDgBg");
	this.shape_135.setTransform(-1202.65,-177.175);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#2D53AB").s().p("AgXAlIAMhIIAHAAIgBAGQAFgHAJAAQAHAAAEAGQAEAFAAAKIAAAGIAAABQgBAIgDAFQgDAHgFADQgFADgFAAQgIAAgEgGIgFAZgAgFgVIgEAYQACAHAHAAQAGABAEgGQAEgFACgJIAAgEQAAgHgDgEQgCgEgFAAQgGAAgFAHg");
	this.shape_136.setTransform(-1206.325,-178.375);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#2D53AB").s().p("AgPAWQgFgEABgIIAIAAQAAAEACADQADADAFAAQADAAADgCQAEgCAAgEQABgFgGgDIgIgCQgLgDABgKQAAgGAGgFQAFgEAHAAQAHAAAFAEQAFAFgBAHIgIAAQAAgEgCgCQgDgDgEAAQgDAAgDACQgDADAAADQgBAFAGACIADABQAJACADADQAEAEgBAFQAAAFgDAEQgCAEgFABQgEACgFAAQgHAAgGgFg");
	this.shape_137.setTransform(-1211.025,-179.325);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#2D53AB").s().p("AgPAUQgGgHABgLIAAgCQABgHAEgGQADgHAGgDQAFgDAFAAQAHAAAFAFQAEAFAAAJIAAAHIAAADIggAAQAAAHADAFQADAFAGAAQAGAAAGgHIAFAEQgDAFgFADQgFACgFAAQgJAAgFgHgAgFgPQgDAEgDAHIAXAAIAAgBQABgGgCgEQgDgEgFAAIgBAAQgDAAgEAEg");
	this.shape_138.setTransform(-1217.9452,-179.325);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#2D53AB").s().p("AgMAYQgFgEgCgFQgCgGABgIIAAgBQABgIADgGQAEgGAFgDQAFgDAGAAQAHAAAFAFQAFAGAAAIIgIAAQAAgFgDgEQgCgDgFAAQgFAAgEAFQgFAFgBAJIAAABIAAAGQAAAGADADQADAEAFAAQADAAAEgDQADgDABgEIAIAAQgBAFgDAEQgDAEgEACQgFACgEAAQgGAAgEgDg");
	this.shape_139.setTransform(-1222.7417,-179.325);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#2D53AB").s().p("AgJAkIAIg0IAIAAIgIA0gAACgaIgBgEIABgDQAAgBAAAAQABAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAIgDgBg");
	this.shape_140.setTransform(-1226.25,-180.2812);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#2D53AB").s().p("AAIAbIAFgiIAAgEQgBgHgGAAQgHAAgFAIIgHAlIgIAAIAJg0IAIAAIgCAHQAGgIAJAAQAGAAAEAFQADAFgBAJIgFAig");
	this.shape_141.setTransform(-1230.1389,-179.375);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#2D53AB").s().p("AgSAVQgDgFABgJIAFghIAIAAIgFAhIAAAEIACAGQACACADAAQAIAAAEgIIAHglIAIAAIgJA0IgIAAIACgFQgGAGgIAAQgHAAgEgGg");
	this.shape_142.setTransform(-1234.8611,-179.275);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#2D53AB").s().p("AgZAjIALhFIAoAAIgBAHIgfAAIgEAXIAbAAIgBAHIgbAAIgEAZIAfAAIgBAHg");
	this.shape_143.setTransform(-1239.825,-180.225);

	this.gaga2 = new lib.gem10();
	this.gaga2.name = "gaga2";
	this.gaga2.setTransform(110.7,83.8,0.9851,0.9851,0,0,0,49.7,60.1);
	new cjs.ButtonHelper(this.gaga2, 0, 1, 2);

	this.laut5 = new lib.gem8();
	this.laut5.name = "laut5";
	this.laut5.setTransform(-176.5,83.65,0.9851,0.9851,0,0,0,49.6,60.1);
	new cjs.ButtonHelper(this.laut5, 0, 1, 2);

	this.gaga1 = new lib.gem9();
	this.gaga1.name = "gaga1";
	this.gaga1.setTransform(110.6,-61.3,0.9851,0.9851,0,0,0,49.6,60);
	new cjs.ButtonHelper(this.gaga1, 0, 1, 2);

	this.laut3 = new lib.gem6();
	this.laut3.name = "laut3";
	this.laut3.setTransform(-296.9,83.55,0.9851,0.9851,0,0,0,49.5,60);
	new cjs.ButtonHelper(this.laut3, 0, 1, 2);

	this.laut4 = new lib.gem7();
	this.laut4.name = "laut4";
	this.laut4.setTransform(-54.05,-60.4,0.9851,0.9851,0,0,0,49.5,59.9);
	new cjs.ButtonHelper(this.laut4, 0, 1, 2);

	this.laut2 = new lib.gem5();
	this.laut2.name = "laut2";
	this.laut2.setTransform(-53.95,83.75,0.9851,0.9851,0,0,0,49.6,60.1);
	new cjs.ButtonHelper(this.laut2, 0, 1, 2);

	this.tana1 = new lib.gem3();
	this.tana1.name = "tana1";
	this.tana1.setTransform(331,83.65,0.9851,0.9851,0,0,0,49.7,60.1);
	new cjs.ButtonHelper(this.tana1, 0, 1, 2);

	this.laut1 = new lib.gem4();
	this.laut1.name = "laut1";
	this.laut1.setTransform(-178.95,-57.75,0.9851,0.9851,0,0,0,46.1,63.6);
	new cjs.ButtonHelper(this.laut1, 0, 1, 2);

	this.laut = new lib.btnGan();
	this.laut.name = "laut";
	this.laut.setTransform(-296.9,-61.3,0.9851,0.9851,0,0,0,49.5,60);
	new cjs.ButtonHelper(this.laut, 0, 1, 2);

	this.tana = new lib.gem2();
	this.tana.name = "tana";
	this.tana.setTransform(330.9,-61.3,0.9851,0.9851,0,0,0,49.6,60);
	new cjs.ButtonHelper(this.tana, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.tana},{t:this.laut},{t:this.laut1},{t:this.tana1},{t:this.laut2},{t:this.laut4},{t:this.laut3},{t:this.gaga1},{t:this.laut5},{t:this.gaga2},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).to({state:[]},1).wait(12));

	// jawaban1
	this.kotakJawaban1 = new lib.kotakJawaban1copy2();
	this.kotakJawaban1.name = "kotakJawaban1";
	this.kotakJawaban1.setTransform(110.55,-169.25,0.9357,0.9357,0,0,0,99.5,30.7);
	this.kotakJawaban1.shadow = new cjs.Shadow("rgba(0,0,0,1)",3,3,4);

	this.kotakJawaban1_1 = new lib.kotakJawaban1copy();
	this.kotakJawaban1_1.name = "kotakJawaban1_1";
	this.kotakJawaban1_1.setTransform(330.85,-169.25,0.9357,0.9357,0,0,0,99.5,30.7);
	this.kotakJawaban1_1.shadow = new cjs.Shadow("rgba(0,0,0,1)",3,3,4);

	this.kotakJawaban1_2 = new lib.kotakJawaban1();
	this.kotakJawaban1_2.name = "kotakJawaban1_2";
	this.kotakJawaban1_2.setTransform(-247.75,-170.75,0.9839,0.9839,0,0,0,99.5,30.7);
	this.kotakJawaban1_2.shadow = new cjs.Shadow("rgba(0,0,0,1)",3,3,4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.kotakJawaban1_2},{t:this.kotakJawaban1_1},{t:this.kotakJawaban1}]},12).to({state:[]},1).wait(12));

	// Layer_4
	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#ECF0F1").s().p("AAfBSIAAhnQgBgQgGgHQgHgIgOAAQgWABgLATIAAByIgkAAIAAigIAjAAIAAASQASgVAcAAQAzAAABA5IAABqg");
	this.shape_144.setTransform(151.65,-238);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#ECF0F1").s().p("Ag1BFQgPgNAAgUQAAgaATgNQATgOAiAAIAXAAIAAgKQAAgNgHgIQgHgHgOAAQgMAAgIAGQgHAHgBAJIgkAAQAAgNAJgMQAJgMAPgGQAPgHASAAQAcAAARAPQAQAOABAZIAABJQAAAVAGANIAAADIglAAQgCgFgCgLQgRASgYAAQgYAAgQgOgAgWAMQgKAHAAAMQAAALAHAGQAHAHAMAAQAJgBAKgFQAJgFAFgJIAAgeIgUAAQgSAAgLAHg");
	this.shape_145.setTransform(135,-237.85);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#ECF0F1").s().p("AgjBfIgCASIghAAIAAjkIAkAAIAABTQAQgSAaAAQAdAAARAWQARAVAAAnIAAACQAAAlgRAXQgRAWgdAAQgbAAgQgVgAgiAAIAABBQAKAVAYAAQAQAAAJgMQAJgNAAgaIAAgEQAAgagJgNQgJgNgRAAQgXAAgKAVg");
	this.shape_146.setTransform(118.525,-241.075);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#ECF0F1").s().p("Ag1BFQgPgNAAgUQAAgaATgNQATgOAjAAIAWAAIAAgKQAAgNgHgIQgHgHgOAAQgMAAgHAGQgJAHABAJIgkAAQAAgNAIgMQAJgMAPgGQAPgHARAAQAdAAARAPQARAOAAAZIAABJQAAAVAGANIAAADIgkAAQgDgFgCgLQgRASgYAAQgZAAgPgOgAgWAMQgKAHAAAMQAAALAHAGQAHAHALAAQAKgBAKgFQAJgFAFgJIAAgeIgTAAQgTAAgLAHg");
	this.shape_147.setTransform(101.4,-237.85);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#ECF0F1").s().p("AAiBRIgihuIgiBuIgdAAIgsigIAjAAIAaBsIAhhsIAaAAIAiBtIAahtIAjAAIgsCgg");
	this.shape_148.setTransform(81.75,-237.85);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#ECF0F1").s().p("Ag1BFQgPgNAAgUQAAgaATgNQATgOAjAAIAWAAIAAgKQAAgNgHgIQgHgHgOAAQgMAAgHAGQgJAHABAJIgkAAQAAgNAIgMQAJgMAPgGQAPgHARAAQAdAAARAPQARAOAAAZIAABJQAAAVAGANIAAADIgkAAQgDgFgCgLQgRASgYAAQgZAAgPgOgAgWAMQgKAHAAAMQAAALAHAGQAHAHALAAQAKgBAKgFQAJgFAFgJIAAgeIgTAAQgTAAgLAHg");
	this.shape_149.setTransform(62.25,-237.85);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#ECF0F1").s().p("Ag0BdQgSgSAAgeIAmAAQAAARAJAJQAIAJAPAAQAPAAAKgKQAIgKAAgSIAAiXIAmAAIAACXQAAAfgTASQgUATggAAQghAAgTgRg");
	this.shape_150.setTransform(44.8,-240.475);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#ECF0F1").s().p("AgpBSIAAigIAiAAIABASQAMgVAXAAQAIAAAFACIAAAiIgPgBQgYAAgIATIAABtg");
	this.shape_151.setTransform(24.825,-238);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#ECF0F1").s().p("Ag1BFQgPgNAAgUQAAgaATgNQATgOAiAAIAXAAIAAgKQAAgNgHgIQgHgHgNAAQgMAAgJAGQgHAHgBAJIgkAAQAAgNAJgMQAJgMAPgGQAPgHASAAQAcAAARAPQARAOAAAZIAABJQAAAVAGANIAAADIglAAQgCgFgCgLQgRASgYAAQgZAAgPgOgAgWAMQgKAHAAAMQAAALAHAGQAHAHAMAAQAJgBAKgFQAJgFAFgJIAAgeIgTAAQgUAAgKAHg");
	this.shape_152.setTransform(10.55,-237.85);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#ECF0F1").s().p("AgjBfIgCASIghAAIAAjkIAkAAIAABTQAQgSAaAAQAdAAARAWQARAVAAAnIAAACQAAAlgRAXQgRAWgdAAQgbAAgQgVgAgiAAIAABBQAKAVAYAAQAQAAAJgMQAJgNAAgaIAAgEQAAgagJgNQgJgNgRAAQgXAAgKAVg");
	this.shape_153.setTransform(-5.975,-241.075);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#ECF0F1").s().p("ABOBSIAAhoQAAgPgGgIQgIgHgPAAQgMAAgIAHQgIAHgDALIAABtIgjAAIAAhpQgBgcgcgBQgWABgJARIAAB0IgkAAIAAigIAiAAIABARQARgUAdAAQAgAAALAZQASgZAgAAQAbAAANAPQANAPAAAcIAABpg");
	this.shape_154.setTransform(-28.15,-238);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#ECF0F1").s().p("AgwA+QgWgWAAgkIAAgEQAAgYAJgSQAKgUARgKQAQgLAUAAQAhAAASAWQASAUAAAnIAAANIhoAAQABAUAMAMQAMAMAQAAQAZgBAQgTIATASQgJAPgQAHQgRAJgUgBQghABgVgWgAgVgrQgJAKgDATIBEAAIAAgCQgBgTgJgJQgIgJgPAAQgOAAgJAKg");
	this.shape_155.setTransform(-49.475,-237.85);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#ECF0F1").s().p("AhDBsIAAjXIAlAAIAAC5IBiAAIAAAeg");
	this.shape_156.setTransform(-65.25,-240.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144}]},12).to({state:[]},1).wait(12));

	// Layer_8
	this.instance = new lib.kkoo();
	this.instance.setTransform(43.05,-17.05,1,1,0,0,0,404.1,193.9);
	this.instance.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,15);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_2
	this.instance_1 = new lib.Tween7("synched",0);
	this.instance_1.setTransform(42.25,-40.25);
	this.instance_1.alpha = 0;

	this.instance_2 = new lib.Tween8copy("synched",0);
	this.instance_2.setTransform(42.25,-40.25);
	this.instance_2._off = true;

	this.instance_3 = new lib.Tween7copy("synched",0);
	this.instance_3.setTransform(42.25,-40.25);
	this.instance_3.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},12).to({state:[{t:this.instance_3}]},12).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true,alpha:1},12).wait(13));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:false},12).to({_off:true,alpha:0},12).wait(1));

	// Layer_3
	this.cobaBG = new lib.Tween10();
	this.cobaBG.name = "cobaBG";
	this.cobaBG.setTransform(43.75,-42.75,1.1855,0.9051,0,0,0,0.2,-0.1);
	this.cobaBG.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.cobaBG).to({alpha:0.75},12).to({alpha:0},12).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1260.5,-314.2,1784.1,543.1);


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
	this.shape.graphics.f("#FFFF83").s().p("AgNAPQgGgGABgIQgBgIAGgFQAFgGAIAAQAJAAAFAFQAFAFAAAIQAAAIgGAGQgFAFgIAAIgBAAQgHAAgFgEg");
	this.shape.setTransform(115.15,166.4273);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF83").s().p("AhbCEIAtkDIAdAAIgEAVQAWgZAhABQAbAAAPAUQAPATABAiQAAALgBAKIgBAEQgDAcgMAWQgMAXgSAMQgRALgWgBQgfAAgSgWIgQBbgAgXhNIgQBZQALAZAbAAQAXABAQgTQAQgTAGgkIAAgOQAAgZgJgOQgKgNgSgBIgBgBQgaAAgTAbg");
	this.shape_1.setTransform(101.2333,162.1995);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF83").s().p("AgJBhQgdAAgUgRQgTgRAAgbIAgAAQAAAQAKAJQAKAKARAAQARAAAMgHQANgIABgNQADgTgYgIIgggKQgpgNABghQACgZAVgQQAWgQAbABQAdAAASAQQARARAAAaIgfgBQAAgOgJgJQgKgIgPgBQgPAAgMAIQgLAIgBANQgDAQAWAHIAPAFQAgAIAOAMQANAOgBAUQgBARgKANQgKANgSAHQgQAGgRAAIgDAAg");
	this.shape_2.setTransform(83.5251,158.7759);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF83").s().p("AgGBhQgjAAgUgaQgTgZADgnIABgHQADgbANgXQAOgXATgMQAUgMAWABQAdAAAQATQARATABAfQABAMgCALIgBANIh6AAQgDAaAMARQALASAXABQAbABAXgaIASAPQgMARgSAKQgSAJgUAAIgDAAgAgUg5QgOAOgJAbIBaAAIABgDQADgWgKgOQgKgPgSAAIgBAAQgSAAgOANg");
	this.shape_3.setTransform(57.0113,158.7753);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF83").s().p("AgJBhQgXAAgRgMQgQgMgHgVQgIgVACgbIABgIQADgbANgVQAMgVAVgMQAUgMAXABQAdAAASAUQASATAAAdIgeAAQAAgTgKgLQgKgLgQgBQgYgBgQATQgQATgEAhIgBAEQgBALABAMQABAUAKAMQAKAMASAAQAQABAOgKQANgLAEgQIAeAAQgDARgLAPQgMAOgRAJQgRAHgQAAIgCAAg");
	this.shape_4.setTransform(38.7952,158.7755);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF83").s().p("AglCAIAhi6IAeAAIgfC6gAAGheQgFgFAAgJQAAgIAFgFQAFgFAIgBQAIAAAGAFQAFAFAAAIQAAAJgFAFQgFAFgJAAIgBAAQgHAAgFgEg");
	this.shape_5.setTransform(25.525,155.3479);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFF83").s().p("AAeBgIAUh6QABgJgBgHQgDgZgZAAQgbgBgWAfIgXCFIgfAAIAgi7IAeAAIgFAYQAZgcAgABQAaAAANASQANASgEAgIgUB6g");
	this.shape_6.setTransform(10.5133,158.5996);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFF83").s().p("AgfBfQgbAAgMgTQgNgTADggIAUh4IAfAAIgUB5IAAAPQABAMAGAHQAHAHALABQAhABASgcIAYiIIAfAAIggC7IgeAAIAEgTQgVAXggAAIgCgBg");
	this.shape_7.setTransform(-7.3531,158.9505);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFF83").s().p("AhiB+IAsj7ICZAAIgFAbIh4AAIgOBRIBpAAIgFAbIhpAAIgQBZIB7AAIgFAbg");
	this.shape_8.setTransform(-26.25,155.525);

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
		var _this = this;
		var pieces = root.pieces;
		var slots = root.slots;
		var restart = root.restart;
		var Score = root.Score;
		var positions1 = [];
		
		root.stop();
		
		_this.popUpSalah.visible = !_this.popUpSalah.visible;
		_this.popUpBenar.visible = !_this.popUpBenar.visible;
		_this.popUpSelesai.visible = !_this.popUpSelesai.visible;
		_this.popUpDanger.visible = !_this.popUpDanger.visible;
		
		root.pGam1.gotoAndStop(0);
		
		root.pieces.laut.on("click", function () {
		  root.pGam1.gotoAndPlay(0);
		});
		
		root.popUpJawabanAkhir.gotoAndStop(0);
		
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
		
		root.pieces.gaga1.on("click", function () {
		  root.pp10.gotoAndPlay(0);
		});
		
		root.pp11.gotoAndStop(0);
		
		root.pieces.gaga2.on("click", function () {
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
		  root.shuffle();
		};
		
		root.mouseDownHandler = function (e) {
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
		  } else {
		    root.onMiss();
		  }
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
		  _this.sound3.play();
		  _this.popUpSalah.visible = !_this.popUpSalah.visible;
		  setTimeout(function () {
		    _this.popUpSalah.visible = !_this.popUpSalah.visible;
		  }, 3000);
		
		  
		};
		
		root.onMatch = function () {
		  _this.sound2.play();
		  _this.popUpBenar.visible = !_this.popUpBenar.visible;
		  setTimeout(function () {
		    _this.popUpBenar.visible = !_this.popUpBenar.visible;
		  }, 3000);
		
		  pieces.skor++;
		  Score.text = pieces.skor * 10;
		}
		
		root.onWin = function () {
		  _this.sound2.play();
		  _this.popUpSelesai.visible = !_this.popUpSelesai.visible;
		  setTimeout(function () {
		    _this.popUpSelesai.visible = !_this.popUpSelesai.visible;
		  }, 3000);
		  
		  root.popUpJawabanAkhir.gotoAndPlay(0);
		};
		
		root.onMiss = function () {
			_this.sound3.play();
			 _this.popUpDanger.visible = !_this.popUpDanger.visible;
		  setTimeout(function () {
		    _this.popUpDanger.visible = !_this.popUpDanger.visible;
		  }, 3000);
		  createjs.Tween.get(pieces.target).to(
		    { x: pieces.target.originalX, y: pieces.target.originalY },
		    350,
		    createjs.Ease.backInOut
		  );
		
		};
		
		var tombol;
		var _this = this;
		function init() {
		  _this.tandaSuaraOn.visible = !_this.tandaSuaraOn.visible;
		  _this.nyala.visible = !_this.nyala.visible;
		
		  var queue = new createjs.LoadQueue();
		  queue.installPlugin(createjs.Sound);
		  queue.addEventListener("complete", handleComplete);
		
		  queue.loadManifest([
		    {
		      src: "./sounds/musicBG.mp3",
		      id: "tombolGan",
		    },
		    {
		      src: "./sounds/benar.mp3",
		      id: "benar",
		    },
		    {
		      src: "./sounds/salah.mp3",
		      id: "salah",
		    },
		  ]);
		
		  function handleComplete(event) {
		    // assign each sound to unique variable
		    _this.sound1 = createjs.Sound.createInstance("tombolGan");
		    _this.sound2 = createjs.Sound.createInstance("benar");
		    _this.sound3 = createjs.Sound.createInstance("salah");
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
		root.setup();
		createjs.Sound.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// suara
	this.nyala = new lib.ggg();
	this.nyala.name = "nyala";
	this.nyala.setTransform(498.1,38.2,0.6758,0.6758,0,0,0,-16.2,-1.1);
	new cjs.ButtonHelper(this.nyala, 0, 1, 2, false, new lib.ggg(), 3);

	this.tandaSuaraOn = new lib.an_Image({'id': 'tandaSuaraOn', 'src':'images/animation_500_kdvpuxkb.gif', 'alt':'image', 'border':'0', 'visible':true, 'class':'ui-image'});

	this.tandaSuaraOn.name = "tandaSuaraOn";
	this.tandaSuaraOn.setTransform(433,32.05,0.4105,0.4105,0,0,0,50.2,45.2);

	this.hening = new lib.dsdsd();
	this.hening.name = "hening";
	this.hening.setTransform(498.1,38.2,0.6758,0.6758,0,0,0,-16.2,-1.1);
	new cjs.ButtonHelper(this.hening, 0, 1, 2, false, new lib.dsdsd(), 3);

	this.tandaSuaraOff = new lib.an_Image({'id': 'tandaSuaraOff', 'src':'images/animation_500_kdvpuxkb.gif', 'alt':'image', 'border':'0', 'visible':true, 'class':'ui-image'});

	this.tandaSuaraOff.name = "tandaSuaraOff";
	this.tandaSuaraOff.setTransform(433,32.05,0.4105,0.4105,0,0,0,50.2,45.2);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgNASQgEgDAAgGQAAgGAFgDQAFgEAJABIAHAAIAAgEQAAgEgDgCQgCgDgEAAQgDAAgDADQgDACAAACIgHAAQAAgDACgDQADgDADgBQAEgCAEAAQAHAAAFADQAEAEAAAGIAAATQAAAHACADIAAABIgIAAIgBgFQgFAGgGAAQgHAAgEgFgAgKAIQAAAEADACQACACAEAAQACAAADgCQADgCACgDIAAgJIgGAAQgNABAAAHg");
	this.shape.setTransform(438.925,59.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAWIAAgqIAHAAIAAAFQACgGAHAAIADABIAAAGIgDAAQgHAAgCAHIAAAdg");
	this.shape_1.setTransform(435.55,59.05);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgNASQgEgDAAgGQAAgGAFgDQAFgEAJABIAHAAIAAgEQAAgEgDgCQgCgDgEAAQgDAAgDADQgDACAAACIgHAAQAAgDACgDQADgDADgBQAEgCAEAAQAHAAAFADQAEAEAAAGIAAATQAAAHACADIAAABIgIAAIgBgFQgFAGgGAAQgHAAgEgFgAgKAIQAAAEADACQACACAEAAQACAAADgCQADgCACgDIAAgJIgGAAQgNABAAAHg");
	this.shape_2.setTransform(431.725,59.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgMASQgEgEAAgIIAAgbIAHAAIAAAbQAAAKAIgBQAIAAADgFIAAgfIAHAAIAAAqIgHAAIAAgEQgEAFgIAAQgHAAgDgEg");
	this.shape_3.setTransform(427.275,59.15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJAbQgFgCgDgEQgDgEAAgFIAIAAQAAAFADADQAEADAGAAQAGAAADgCQADgDABgEQgBgEgDgCQgCgDgIgCQgJgDgFgDQgEgEAAgGQAAgHAGgEQAFgFAHAAQAHAAAEACQAFADACAEQADAEAAAFIgHAAQAAgGgEgDQgEgDgGAAQgEAAgDADQgEACABAFQAAADACADQADACAHACQAHACAEACQAEACACADQACAEAAAEQAAAHgFAEQgGAFgJAAQgFAAgFgDg");
	this.shape_4.setTransform(422.6,58.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3498DB").s().p("Aj8D9QhphpAAiUQAAiTBphqQBphoCTAAQCVAABoBoQBpBqAACTQAACUhpBpQhoBpiVAAQiTAAhphpg");
	this.shape_5.setTransform(432.8705,37.4545,0.9301,0.9301);

	this.instance = new lib.hehe();
	this.instance.setTransform(471.4,37.5,0.7145,0.9301,0,0,0,86.2,36);
	this.instance.shadow = new cjs.Shadow("rgba(0,0,0,1)",3,3,4);
	this.instance.cache(-2,-2,176,76);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.tandaSuaraOff},{t:this.hening},{t:this.tandaSuaraOn},{t:this.nyala}]}).wait(1));

	// popUpJawaban
	this.popUpJawabanAkhir = new lib.popUpJawabanAkhir();
	this.popUpJawabanAkhir.name = "popUpJawabanAkhir";
	this.popUpJawabanAkhir.setTransform(438.35,313.5);

	this.popUpDanger = new lib.dsdsdd();
	this.popUpDanger.name = "popUpDanger";
	this.popUpDanger.setTransform(389,421.9,0.7235,0.7265,0,0,0,33.4,33.1);

	this.popUpSelesai = new lib.dsd();
	this.popUpSelesai.name = "popUpSelesai";
	this.popUpSelesai.setTransform(412.8,271.35,0.7235,0.7265,0,0,0,33.4,33.1);

	this.popUpSalah = new lib.fff();
	this.popUpSalah.name = "popUpSalah";
	this.popUpSalah.setTransform(412.8,271.35,0.7235,0.7265,0,0,0,33.4,33.1);

	this.popUpBenar = new lib.bener();
	this.popUpBenar.name = "popUpBenar";
	this.popUpBenar.setTransform(412.75,271.35,0.7236,0.7266,0,0,0,33.3,33.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.popUpBenar},{t:this.popUpSalah},{t:this.popUpSelesai},{t:this.popUpDanger},{t:this.popUpJawabanAkhir}]}).wait(1));

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

	// popUp_Selesai
	this.popUpJawabanAkhir_1 = new lib.popUpJawabanAkhir();
	this.popUpJawabanAkhir_1.name = "popUpJawabanAkhir_1";
	this.popUpJawabanAkhir_1.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.popUpJawabanAkhir_1).wait(1));

	// Layer_2
	this.instance_1 = new lib.sustain();
	this.instance_1.setTransform(141.5,44.2,1,1,0,0,0,125.9,18.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// base
	this.btnInfo = new lib.btnInfo();
	this.btnInfo.name = "btnInfo";
	this.btnInfo.setTransform(892.55,53.3,0.6435,0.6435);
	new cjs.ButtonHelper(this.btnInfo, 0, 1, 2, false, new lib.btnInfo(), 3);

	this.restart = new lib.Restart();
	this.restart.name = "restart";
	this.restart.setTransform(715.95,176.75,0.7541,0.7541,0,0,0,0.1,0.1);
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

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AABAPQAIgLAAgMIAAgNIARAAIAAAMQgBAJgEAHQgEAJgHAGgAgZAPQAIgLAAgMIAAgNIARAAIAAAMQgBAJgEAHQgEAJgHAGg");
	this.shape_6.setTransform(551.475,110.25);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_7.setTransform(543.425,116.85);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgcBCIgGgBIAAgNIAFAAQAHAAAFgDQAFgDADgJIADgKIghhdIARAAIAXBGIAWhGIASAAIgnBtQgIAYgTAAg");
	this.shape_8.setTransform(534.3,118.775);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgKgFgFQgEgEgKAAQgHAAgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAAMQALgPARAAQAeABAAAhIAAA+g");
	this.shape_9.setTransform(525.075,116.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_10.setTransform(516.175,114.85);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_11.setTransform(508.85,115.125);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_12.setTransform(503.425,115.8);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgDAAgHQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgEgDgEQgEgGAAgHQAAgLAKgJQAKgHAPgBQAQAAAKAJQAKAIAAAOIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAHQgKAIgQAAQgKABgJgFg");
	this.shape_13.setTransform(496.075,116.85);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQADACgBAEQABAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_14.setTransform(489.3,115.125);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgWAwIAAhdIAQAAIAAALQAHgOAOAAQAFAAADACIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_15.setTransform(484.55,116.75);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgbAlQgNgNAAgWIAAgCQABgNAFgMQAGgLAJgGQAKgHAKAAQATAAAKANQAKAMAAAXIAAAFIg/AAQABAOAHAKQAIAIALAAQAJAAAGgEQAFgDAFgGIAKAIQgMASgYAAQgSAAgMgMgAgPgcQgGAIgCANIAvAAIAAgCQgBgMgFgHQgHgHgKAAQgIAAgIAHg");
	this.shape_16.setTransform(476.3,116.85);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_17.setTransform(468.225,115.8);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_18.setTransform(461.625,114.85);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_19.setTransform(451.525,116.85);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgWAwIAAhdIAPAAIABALQAHgOAPAAQAFAAACACIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_20.setTransform(444.1,116.75);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_21.setTransform(435.625,116.85);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_22.setTransform(426.825,114.85);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_23.setTransform(715.125,89.25);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgeAkQgMgNAAgXIAAAAQAAgOAFgLQAGgLAKgGQAJgHAMABQATAAAMANQAMANAAAWIAAABQAAAOgFALQgFALgKAGQgKAGgNABQgSAAgMgOgAgTgaQgHAKAAARQAAAQAHAJQAIAKALAAQAMAAAIgKQAHgJAAgRQAAgPgHgKQgIgKgMAAQgLAAgIAJg");
	this.shape_24.setTransform(704.875,91.25);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgnBDIAAiDIAPAAIABALQAKgNAQAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgJANgRAAQgRAAgKgLIAAAugAgXgnIAAAtQAHANAPAAQALAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgOAAgIANg");
	this.shape_25.setTransform(694.9,92.975);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAzAxIAAg+QAAgLgFgFQgFgEgLgBQgJAAgGAGQgGAFgBAKIAAA+IgPAAIAAg+QAAgUgUgBQgQAAgGAOIAABFIgRAAIAAhfIAQAAIAAALQALgMASAAQATAAAHAPQAEgHAIgEQAIgEAKAAQAfAAABAhIAAA/g");
	this.shape_26.setTransform(681.725,91.15);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgeAkQgMgNAAgXIAAAAQAAgOAFgLQAGgLAKgGQAJgHAMABQATAAAMANQAMANAAAWIAAABQAAAOgFALQgFALgKAGQgKAGgNABQgSAAgMgOgAgTgaQgHAKAAARQAAAQAHAJQAIAKALAAQAMAAAIgKQAHgJAAgRQAAgPgHgKQgIgKgMAAQgLAAgIAJg");
	this.shape_27.setTransform(668.775,91.25);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgHBEIAAiGIAPAAIAACGg");
	this.shape_28.setTransform(661.475,89.25);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgbAkQgNgMAAgVIAAgDQAAgOAGgKQAFgMAKgGQAKgGAKAAQATAAAKAMQAKAMAAAXIAAAGIg/AAQABAOAHAIQAIAJALAAQAJAAAGgDQAFgEAFgGIAKAIQgMATgYAAQgSgBgMgNgAgPgcQgGAHgCANIAvAAIAAgBQgBgNgFgGQgHgHgKAAQgIAAgIAHg");
	this.shape_29.setTransform(654.6,91.25);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_30.setTransform(645.825,89.25);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_31.setTransform(631.225,91.15);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_32.setTransform(621.325,91.25);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_33.setTransform(612.525,89.25);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAQAAIAAALQAHgNAOABQAFgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_34.setTransform(604.8,91.15);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_35.setTransform(596.325,91.25);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAIQgKAIgQAAQgKgBgJgEg");
	this.shape_36.setTransform(586.775,91.25);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_37.setTransform(577.225,91.25);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgcA2QgLgNAAgWIAAgBQAAgVAKgNQALgNARAAQAPAAAKALIAAgxIAQAAIAACGIgPAAIAAgKQgKALgRABQgRgBgJgOgAgQgHQgHAJAAASQAAAQAHAJQAGAJALAAQAQAAAHgNIAAgrQgHgOgQAAQgLABgGAIg");
	this.shape_38.setTransform(567.05,89.35);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAPAAIABALQAHgNAPABQAFgBACACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_39.setTransform(559.65,91.15);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgbAkQgMgMAAgVIAAgDQgBgOAGgKQAGgMAJgGQAKgGAKAAQATAAAKAMQALAMAAAXIAAAGIhAAAQAAAOAIAIQAIAJALAAQAJAAAFgDQAHgEAEgGIAKAIQgMATgXAAQgTgBgMgNgAgPgcQgGAHgBANIAuAAIAAgBQAAgNgHgGQgFgHgLAAQgIAAgIAHg");
	this.shape_40.setTransform(551.4,91.25);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgYA3IgBAMIgOAAIAAiGIAQAAIAAAyQAKgMAQAAQARgBAKANQAKAOAAAVIAAACQAAAWgKANQgKAOgRAAQgRgBgKgNgAgXgBIAAApQAHAOAQAAQALAAAGgJQAHgIAAgTQAAgQgHgJQgGgIgLgBQgQAAgHAPg");
	this.shape_41.setTransform(541.725,89.35);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_42.setTransform(528.775,90.2);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgcAoQgJgKABgRIAAg9IAQAAIAAA9QgBAVATAAQARAAAGgNIAAhFIAQAAIAABfIgPAAIgBgKQgJAMgSAAQgPAAgHgJg");
	this.shape_43.setTransform(521.15,91.35);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgYA3IgBAMIgOAAIAAiGIAQAAIAAAyQAKgMAQAAQARgBAKANQAKAOAAAVIAAACQAAAWgKANQgKAOgRAAQgRgBgKgNgAgXgBIAAApQAHAOAQAAQALAAAGgJQAHgIAAgTQAAgQgHgJQgGgIgLgBQgQAAgHAPg");
	this.shape_44.setTransform(511.375,89.35);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgbAkQgNgMAAgVIAAgDQABgOAFgKQAGgMAJgGQAKgGAKAAQATAAAKAMQAKAMAAAXIAAAGIg/AAQABAOAHAIQAIAJALAAQAJAAAGgDQAFgEAFgGIAKAIQgMATgXAAQgTgBgMgNgAgOgcQgHAHgCANIAvAAIAAgBQAAgNgGgGQgHgHgKAAQgIAAgHAHg");
	this.shape_45.setTransform(501.4,91.25);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAIQgKAIgQAAQgKgBgJgEg");
	this.shape_46.setTransform(491.875,91.25);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAPAAIABALQAHgNAPABQAEgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_47.setTransform(484.7,91.15);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgbAkQgMgMAAgVIAAgDQAAgOAFgKQAFgMAKgGQAKgGAKAAQATAAAKAMQALAMAAAXIAAAGIhAAAQABAOAHAIQAIAJALAAQAJAAAFgDQAHgEAEgGIAKAIQgMATgXAAQgTgBgMgNgAgOgcQgHAHgBANIAuAAIAAgBQAAgNgHgGQgFgHgLAAQgJAAgGAHg");
	this.shape_48.setTransform(476.45,91.25);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_49.setTransform(468.375,90.2);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_50.setTransform(456.275,91.15);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_51.setTransform(446.375,91.25);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AAWAwIgWhHIgWBHIgNAAIgchfIAQAAIATBGIAXhGIALAAIAXBIIAThIIAQAAIgcBfg");
	this.shape_52.setTransform(434.7,91.25);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgbAkQgMgMAAgVIAAgDQgBgOAGgKQAFgMAKgGQAKgGAKAAQATAAAKAMQALAMAAAXIAAAGIhAAAQAAAOAIAIQAIAJALAAQAJAAAFgDQAHgEAEgGIAKAIQgMATgXAAQgTgBgMgNgAgOgcQgHAHgBANIAuAAIAAgBQAAgNgHgGQgFgHgLAAQgJAAgGAHg");
	this.shape_53.setTransform(423.25,91.25);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AAVBEIAAg/QAAgKgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAiGIAQAAIAAAzQALgNAQAAQAegBAAAiIAAA/g");
	this.shape_54.setTransform(413.475,89.25);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgUAHIAAgNIApAAIAAANg");
	this.shape_55.setTransform(406.025,90.575);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_56.setTransform(398.575,91.15);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_57.setTransform(388.675,91.25);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AAXAwIgXhHIgWBHIgNAAIgchfIAQAAIATBGIAXhGIALAAIAXBIIAThIIAPAAIgbBfg");
	this.shape_58.setTransform(377,91.25);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgbAkQgMgMAAgVIAAgDQgBgOAGgKQAGgMAJgGQAKgGAKAAQATAAAKAMQALAMAAAXIAAAGIhAAAQAAAOAIAIQAIAJALAAQAJAAAFgDQAHgEAEgGIAKAIQgMATgXAAQgTgBgMgNgAgPgcQgGAHgBANIAuAAIAAgBQAAgNgHgGQgFgHgLAAQgIAAgIAHg");
	this.shape_59.setTransform(365.55,91.25);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AAVBEIAAg/QAAgKgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAiGIAQAAIAAAzQALgNAQAAQAegBAAAiIAAA/g");
	this.shape_60.setTransform(355.775,89.25);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_61.setTransform(341.375,91.15);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_62.setTransform(331.475,91.25);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_63.setTransform(322.675,89.25);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_64.setTransform(313.575,89.25);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgcAoQgJgKAAgRIAAg9IARAAIAAA9QgBAVATAAQARAAAGgNIAAhFIAQAAIAABfIgPAAIAAgKQgKAMgSAAQgPAAgHgJg");
	this.shape_65.setTransform(303.45,91.35);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAIQgKAIgQAAQgKgBgJgEg");
	this.shape_66.setTransform(293.825,91.25);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_67.setTransform(284.275,91.25);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AAvBAIAAgyIABg0IgqBmIgMAAIgqhmIACA0IAAAyIgQAAIAAh/IAVAAIApBoIAqhoIAWAAIAAB/g");
	this.shape_68.setTransform(271.55,89.6);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AACAVIAAgKQAAgJAEgIQAEgJAHgFIAJAGQgIAMAAALIAAAMgAgZAVIAAgKQAAgJAEgIQAEgJAHgFIAKAGQgJAMAAALIAAAMg");
	this.shape_69.setTransform(260.875,84.45);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#3867D6").s().p("EhDfAZ7MAAAgz1MCG/AAAMAAAAz1g");
	this.shape_70.setTransform(473.025,317.15);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.bf(img.Bitmap2, null, new cjs.Matrix2D(1,0,0,1,-499,-300)).s().p("EhN9Au4MAAAhdvMCb7AAAMAAABdvgEhDLAisMCG/AAAMAAAgz0MiG/AAAg");
	this.shape_71.setTransform(471,261);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.btnNextDasar1},{t:this.btnMenuDasar1},{t:this.btnBack3},{t:this.slots},{t:this.pieces},{t:this.judulKI},{t:this.Score},{t:this.restart},{t:this.btnInfo}]}).wait(1));

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
		{src:"images/_10_tripo.jpg", id:"_10_tripo"},
		{src:"images/_16.jpeg", id:"_16"},
		{src:"images/_13.jpeg", id:"_13"},
		{src:"images/_25.jpeg", id:"_25"},
		{src:"images/_26.jpeg", id:"_26"},
		{src:"images/_28.jpeg", id:"_28"},
		{src:"images/_3.jpeg", id:"_3"},
		{src:"images/_30.jpeg", id:"_30"},
		{src:"images/_32.jpeg", id:"_32"},
		{src:"images/_34.jpeg", id:"_34"},
		{src:"images/_5.jpeg", id:"_5"},
		{src:"images/_20.jpeg", id:"_20"},
		{src:"images/_6.jpeg", id:"_6"},
		{src:"images/_7.jpeg", id:"_7"},
		{src:"images/_7jpegcopy.jpg", id:"_7jpegcopy"},
		{src:"images/_36.jpeg", id:"_36"},
		{src:"images/Bitmap2.png", id:"Bitmap2"},
		{src:"images/_9_tripo.jpg", id:"_9_tripo"},
		{src:"images/Bitmap45.png", id:"Bitmap45"},
		{src:"images/Bitmap44.png", id:"Bitmap44"},
		{src:"images/Bitmap72.png", id:"Bitmap72"},
		{src:"images/Bitmap73.png", id:"Bitmap73"},
		{src:"images/Bitmap1.png", id:"Bitmap1"},
		{src:"images/_5jpegcopy.jpg", id:"_5jpegcopy"},
		{src:"images/fix.png", id:"fix"},
		{src:"images/flash0aiAssets.png", id:"flash0aiAssets"},
		{src:"images/flash0aiAssets_1.png", id:"flash0aiAssets_1"},
		{src:"images/bookpngcopy.png", id:"bookpngcopy"},
		{src:"images/flash0aiAssets_2.png", id:"flash0aiAssets_2"},
		{src:"images/flash0aiAssets_3.png", id:"flash0aiAssets_3"},
		{src:"images/_17.jpeg", id:"_17"},
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