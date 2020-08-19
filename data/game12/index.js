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



(lib._12 = function() {
	this.initialize(img._12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,447);


(lib._13 = function() {
	this.initialize(img._13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,594,297);


(lib.Bitmap102copy = function() {
	this.initialize(img.Bitmap102copy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,233,124);


(lib.Bitmap115 = function() {
	this.initialize(img.Bitmap115);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,287,186);


(lib.Bitmap116 = function() {
	this.initialize(img.Bitmap116);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,260,186);


(lib.Bitmap111 = function() {
	this.initialize(img.Bitmap111);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,239,160);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);


(lib._14 = function() {
	this.initialize(img._14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,356,415);


(lib.Bitmap3 = function() {
	this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,249,87);


(lib.bookpngcopy = function() {
	this.initialize(img.bookpngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,399);


(lib.Bitmap108 = function() {
	this.initialize(img.Bitmap108);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,287,163);// helper functions:

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


(lib.Tween6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("Klik gambar untuk memperjelas", "12px 'Roboto'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 16;
	this.text.lineWidth = 170;
	this.text.parent = this;
	this.text.setTransform(0,-7.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-87,-9.2,174.1,18.4);


(lib.Tween5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("Klik gambar untuk memperjelas", "12px 'Roboto'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 16;
	this.text.lineWidth = 170;
	this.text.parent = this;
	this.text.setTransform(0,-7.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-87,-9.2,174.1,18.4);


(lib.Tween4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("Klik gambar untuk memperjelas", "12px 'Roboto'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 16;
	this.text.lineWidth = 170;
	this.text.parent = this;
	this.text.setTransform(0,-7.2);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-87,-9.2,174.1,18.4);


(lib.target = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgDAeIAAg7IAHAAIAAA7g");
	this.shape.setTransform(7.225,-1.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgDAdIAAgqIAHAAIAAAqgAgCgVIgBgDIABgDIACgBIADABIABADIgBADIgDABIgCgBg");
	this.shape_1.setTransform(5.275,-1.375);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgHAUQgFgCgCgDQgCgEAAgDIAIAAQAAADACADQADACADAAQAEAAADgCQABAAAAgBQABAAAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBAAgBQAAAAgBgBQAAAAAAgBQgDgCgFgBQgFgBgDgBQgEgBgBgDQgBgCgBgCQABgGAEgDQAFgEAFAAQAHAAAFAEQAEAEABAFIgIAAQAAgDgCgCQgDgCgEAAQgCAAgDABQAAABgBABQAAAAAAABQgBAAAAABQAAAAAAABQAAABAAAAQAAABABAAQAAABAAAAQABABAAAAQACABAEABIAJADQAEABABACQACADAAAEQAAAFgFAEQgEADgIAAQgDAAgEgCg");
	this.shape_2.setTransform(2.2,-0.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgMATQgEgEAAgFQAAgIAFgCQAFgEAIAAIAHAAIAAgDQAAgEgDgCQgCgCgEAAQgDAAgDABQgCADAAADIgIAAQAAgDADgEQACgCAEgCQAEgCADAAQAHAAAFAEQAEADAAAHIAAASQAAAGABADIAAABIgHAAIgBgEQgFAFgGAAQgGAAgEgDgAgJAJQAAACACACQACACAEABQACgBADgCQADgBACgDIAAgIIgGAAQgMgBAAAJg");
	this.shape_3.setTransform(-2.025,-0.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAPAdIAAgbIgcAAIAAAbIgIAAIAAg5IAIAAIAAAZIAcAAIAAgZIAHAAIAAA5g");
	this.shape_4.setTransform(-7.05,-1.35);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFFFFF").ss(2,1,1).p("AqmjkIVNAAIAAHJI1NAAg");
	this.shape_5.setTransform(-0.85,-1.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(89,89,89,0.247)").s().p("AqlDlIAAnJIVLAAIAAHJg");
	this.shape_6.setTransform(-0.85,-1.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.target, new cjs.Rectangle(-69.7,-25.2,137.7,47.8), null);


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


(lib.hasjkh1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgIQAAgIAHgEQAHgGAMAAIAIAAIAAgDQAAgFgDgDQgCgCgFAAQgEAAgDACQgDACAAAEIgNAAQAAgFADgEQAEgEAFgDQAGgCAFAAQAKAAAHAFQAGAFAAAKIAAAZQAAAHACAFIAAABIgNAAIgCgFQgGAGgIAAQgJAAgFgFgAgHAEQgEADAAAEQAAAEADADQACABAEAAQADAAAEgBQADgCACgEIAAgLIgHAAQgHABgDACg");
	this.shape.setTransform(96.975,40);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgUAoIAAgKIADAAQAEAAADgCQACgCABgEIACgFIgUg5IAOAAIALAoIAMgoIAOAAIgXBCQgEAPgNAAIgGgBg");
	this.shape_1.setTransform(91.3,41.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AALAeIAAglQAAgFgCgDQgDgDgFAAQgHAAgEAHIAAApIgNAAIAAg6IAMAAIAAAHQAHgHAJgBQATAAAAAVIAAAmg");
	this.shape_2.setTransform(85.6,39.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AALAeIAAglQAAgFgCgDQgDgDgFAAQgHAAgEAHIAAApIgNAAIAAg6IANAAIAAAHQAGgHAJgBQATAAAAAVIAAAmg");
	this.shape_3.setTransform(79.5,39.95);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgFAoIAAg5IALAAIAAA5gAgEgbQgBgBAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAgDACgCQACgCACAAQADAAACACQACACAAADQAAABAAAAQAAABAAAAQAAABgBAAQAAABgBABQgCACgDAAQgCAAgCgCg");
	this.shape_4.setTransform(75.05,38.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgIQAAgIAHgEQAHgGAMAAIAIAAIAAgDQAAgFgDgDQgCgCgFAAQgEAAgDACQgDACAAAEIgNAAQAAgFADgEQAEgEAFgDQAGgCAFAAQAKAAAHAFQAGAFAAAKIAAAZQAAAHACAFIAAABIgNAAIgCgFQgGAGgIAAQgJAAgFgFgAgHAEQgEADAAAEQAAAEADADQACABAEAAQADAAAEgBQADgCACgEIAAgLIgHAAQgHABgDACg");
	this.shape_5.setTransform(70.675,40);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgGApIAAhRIANAAIAABRg");
	this.shape_6.setTransform(66.3,38.775);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgLAcQgGgDgDgFQgDgEAAgFIAMAAQABAEADADQADADAFgBQAFAAADgBQADgCAAgEQAAgDgDgCQgEgCgFgCQgHAAgFgDQgJgDAAgKQAAgHAHgFQAFgFAKAAQAKAAAHAFQAFAFAAAJIgMAAQgBgEgCgDQgDgCgEAAQgEAAgCACQgDACAAADQAAADACACIAJADQAIACAEACQAFABACADQACAEAAAEQAAAJgGAEQgHAFgKAAQgHAAgFgCg");
	this.shape_7.setTransform(161.65,22.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgIQAAgIAHgEQAHgGAMAAIAIAAIAAgDQAAgFgDgCQgCgDgFAAQgEAAgDACQgDACAAADIgNAAQAAgEADgFQAEgEAFgCQAGgCAFAAQAKAAAHAFQAGAFAAAKIAAAZQAAAHACAFIAAABIgNAAIgCgGQgGAHgIAAQgJAAgFgFgAgHAEQgEADAAAEQAAAEADADQACABAEAAQADAAAEgBQADgCACgEIAAgLIgHAAQgHABgDACg");
	this.shape_8.setTransform(155.875,22.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgGApIAAhRIANAAIAABRg");
	this.shape_9.setTransform(151.5,21.575);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgRAWQgIgHAAgOIAAgBQABgIADgHQADgGAGgEQAHgEAGAAQAMAAAGAHQAGAIABAOIAAAEIglAAQAAAHAEAFQAFAEAFgBQAJABAFgIIAIAHQgEAGgFACQgHADgHAAQgLAAgIgIgAgHgPQgEAEAAAGIAXAAIAAgBQAAgGgDgEQgDgCgGAAQgDgBgEAEg");
	this.shape_10.setTransform(147.2,22.8);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AALApIgRgZIgFAGIAAATIgOAAIAAhRIAOAAIAAAuIAEgFIAPgRIAPAAIgVAXIAYAig");
	this.shape_11.setTransform(141.725,21.575);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AALAeIAAglQAAgGgCgDQgDgCgFAAQgHAAgEAHIAAApIgNAAIAAg6IANAAIAAAHQAGgHAKgBQARAAABAVIAAAmg");
	this.shape_12.setTransform(132.7,22.75);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgIQAAgIAHgEQAHgGAMAAIAIAAIAAgDQAAgFgDgCQgCgDgFAAQgEAAgDACQgDACAAADIgNAAQAAgEADgFQAEgEAFgCQAGgCAFAAQAKAAAHAFQAGAFAAAKIAAAZQAAAHACAFIAAABIgNAAIgCgGQgGAHgIAAQgJAAgFgFgAgHAEQgEADAAAEQAAAEADADQACABAEAAQADAAAEgBQADgCACgEIAAgLIgHAAQgHABgDACg");
	this.shape_13.setTransform(126.675,22.8);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgMAmQgGgCgEgEIAHgIQAGAGAJAAQAFAAAEgDQAEgEgBgGIAAgEQgFAGgIAAQgKAAgHgIQgGgIAAgNQAAgOAGgIQAGgIALAAQAIAAAGAGIABgFIAMAAIAAA3QgBALgGAIQgIAGgLAAQgGAAgGgDgAgIgZQgEAGAAAKQAAAJAEADQAEAGAFAAQAIAAADgIIAAgYQgDgHgIABQgFAAgEAEg");
	this.shape_14.setTransform(120.45,23.9);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AALAeIAAglQAAgGgCgDQgDgCgFAAQgHAAgEAHIAAApIgNAAIAAg6IAMAAIAAAHQAHgHAJgBQATAAAAAVIAAAmg");
	this.shape_15.setTransform(114.4,22.75);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgRAWQgIgHABgOIAAgBQgBgIAEgHQADgGAGgEQAHgEAGAAQAMAAAGAHQAHAIgBAOIAAAEIglAAQABAHAFAFQAEAEAFgBQAJABAFgIIAHAHQgDAGgGACQgGADgGAAQgMAAgIgIgAgHgPQgDAEgBAGIAYAAIAAgBQgBgGgDgEQgDgCgFAAQgFgBgDAEg");
	this.shape_16.setTransform(108.45,22.8);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgSAiQgGgJgBgOQABgMAGgIQAGgIALAAQAIAAAFAGIAAgeIAOAAIAABSIgMAAIgBgGQgFAHgJAAQgKAAgHgIgAgIgCQgDAEAAAKQAAAJADAFQADAFAGAAQAIAAADgHIAAgYQgDgHgIAAQgGAAgDAFg");
	this.shape_17.setTransform(102.2,21.625);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgGAoIAAg5IANAAIAAA5gAgEgcQgBAAAAgBQgBAAAAgBQAAAAAAgBQgBAAAAgBQAAgDADgCQABgCADAAQAEAAACACQACACgBADQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgCADgEAAQgDAAgBgDg");
	this.shape_18.setTransform(95.1,21.7);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AALAeIAAglQAAgGgCgDQgDgCgFAAQgHAAgEAHIAAApIgNAAIAAg6IAMAAIAAAHQAHgHAJgBQATAAAAAVIAAAmg");
	this.shape_19.setTransform(90.65,22.75);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgFAoIAAg5IALAAIAAA5gAgEgcQgBAAAAgBQgBAAAAgBQAAAAAAgBQgBAAAAgBQABgDACgCQACgCACAAQAEAAACACQABACAAADQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgCADgEAAQgCAAgCgDg");
	this.shape_20.setTransform(86.2,21.7);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AALAeIAAglQAAgGgDgDQgCgCgFAAQgHAAgEAHIAAApIgNAAIAAg6IAMAAIAAAHQAHgHAKgBQARAAABAVIAAAmg");
	this.shape_21.setTransform(79,22.75);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgIQAAgIAHgEQAHgGAMAAIAIAAIAAgDQAAgFgDgCQgCgDgFAAQgEAAgDACQgDACAAADIgNAAQAAgEADgFQAEgEAFgCQAGgCAFAAQAKAAAHAFQAGAFAAAKIAAAZQAAAHACAFIAAABIgNAAIgCgGQgGAHgIAAQgJAAgFgFgAgHAEQgEADAAAEQAAAEADADQACABAEAAQADAAAEgBQADgCACgEIAAgLIgHAAQgHABgDACg");
	this.shape_22.setTransform(72.975,22.8);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AAMAdIgMgnIgLAnIgLAAIgQg5IANAAIAJAnIAMgnIAJAAIAMAnIAJgnIANAAIgQA5g");
	this.shape_23.setTransform(65.875,22.8);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgRAWQgHgHgBgOIAAgBQABgIADgHQADgGAGgEQAGgEAHAAQALAAAHAHQAGAIABAOIAAAEIglAAQAAAHAEAFQAEAEAGgBQAJABAGgIIAHAHQgEAGgFACQgGADgIAAQgLAAgIgIgAgHgPQgEAEAAAGIAXAAIAAgBQABgGgEgEQgDgCgFAAQgEgBgEAEg");
	this.shape_24.setTransform(58.9,22.8);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AALApIAAglQAAgFgCgDQgDgCgFAAQgHAAgEAGIAAApIgNAAIAAhRIANAAIAAAeQAGgHAJAAQATAAAAAUIAAAmg");
	this.shape_25.setTransform(52.85,21.575);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgIQAAgIAHgEQAHgGAMAAIAIAAIAAgDQAAgFgDgCQgCgDgFAAQgEAAgDACQgDACAAADIgNAAQAAgEADgFQAEgEAFgCQAGgCAFAAQAKAAAHAFQAGAFAAAKIAAAZQAAAHACAFIAAABIgNAAIgCgGQgGAHgIAAQgJAAgFgFgAgHAEQgEADAAAEQAAAEADADQACABAEAAQADAAAEgBQADgCACgEIAAgLIgHAAQgHABgDACg");
	this.shape_26.setTransform(44.075,22.8);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgSAiQgGgJgBgOQABgMAGgIQAGgIALAAQAIAAAFAGIAAgeIAOAAIAABSIgMAAIgBgGQgFAHgJAAQgKAAgHgIgAgIgCQgDAEAAAKQAAAJADAFQADAFAGAAQAIAAADgHIAAgYQgDgHgIAAQgGAAgDAFg");
	this.shape_27.setTransform(37.85,21.625);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgRAWQgIgHAAgOIAAgBQABgIADgHQADgGAGgEQAHgEAGAAQAMAAAGAHQAGAIABAOIAAAEIglAAQAAAHAEAFQAFAEAFgBQAJABAGgIIAHAHQgEAGgFACQgHADgHAAQgLAAgIgIgAgHgPQgEAEAAAGIAXAAIAAgBQAAgGgDgEQgDgCgGAAQgDgBgEAEg");
	this.shape_28.setTransform(32,22.8);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgMAiIAAAHIgMAAIAAhSIAMAAIAAAeQAHgGAIAAQAKAAAHAHQAFAIAAAOIAAAAQAAAOgFAIQgHAIgKAAQgJAAgGgIgAgMAAIAAAYQAEAHAIAAQAGAAADgEQADgFABgJIAAgCQAAgJgEgEQgDgFgGAAQgIAAgEAHg");
	this.shape_29.setTransform(26,21.625);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AAcAeIAAgmQAAgFgCgDQgDgCgFAAQgFAAgCACQgDADgBADIAAAoIgMAAIAAgmQgBgKgKAAQgIAAgDAHIAAApIgNAAIAAg6IAMAAIABAHQAGgIAKAAQALABAEAIQAHgIALgBQAKAAAEAGQAFAFAAAKIAAAmg");
	this.shape_30.setTransform(18.025,22.75);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgRAWQgIgHABgOIAAgBQgBgIAEgHQADgGAGgEQAHgEAGAAQAMAAAGAHQAHAIgBAOIAAAEIglAAQABAHAFAFQAEAEAFgBQAJABAFgIIAHAHQgDAGgGACQgGADgGAAQgMAAgIgIgAgHgPQgDAEgBAGIAYAAIAAgBQgBgGgDgEQgDgCgFAAQgFgBgDAEg");
	this.shape_31.setTransform(10.35,22.8);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgcAnIAAhNIAdAAQANAAAHAGQAIAIAAAKQAAAMgHAFQgIAHgOAAIgPAAIAAAdgAgPAAIAQAAQAHAAAEgEQADgDAAgGQAAgHgDgDQgEgEgHAAIgQAAg");
	this.shape_32.setTransform(4.025,21.8);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_33.setTransform(82.475,27.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.7,-0.3,172.29999999999998,55.599999999999994);


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


(lib.g3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._12();
	this.instance.setTransform(-50.3,-37.5,0.1573,0.1678);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g3, new cjs.Rectangle(-50.3,-37.5,100.69999999999999,75), null);


(lib.g2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._14();
	this.instance.setTransform(-50.35,-37.5,0.2828,0.1807);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g2, new cjs.Rectangle(-50.3,-37.5,100.69999999999999,75), null);


(lib.g1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._13();
	this.instance.setTransform(-50.35,-37.5,0.1695,0.2525);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g1, new cjs.Rectangle(-50.3,-37.5,100.69999999999999,75), null);


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



(lib.Tween10_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Eg/RAu4MAAAhdvMB+jAAAMAAABdvg");

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-405,-300,810,600);


(lib.Tween8copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#603AD8").s().p("EhB5AkqMAAAhJSMCDzAAAMAAABJSg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-421.8,-234.5,843.6,469.1);


(lib.Tween8_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3498DB").s().p("EhB5AkpMAAAhJRMCDzAAAMAAABJRg");

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-421.8,-234.5,843.6,469.1);


(lib.Tween7_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#603AD8").s().p("EhB5AkpMAAAhJRMCDzAAAMAAABJRg");

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-421.8,-234.5,843.6,469.1);


(lib.Tween5copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IALAAIAAAHQAFgIAJAAIAGABIAAAKIgGgBQgKAAgEAJIAAAsg");
	this.shape.setTransform(21.55,0.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_1.setTransform(16.125,1.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_2.setTransform(9.775,1.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_3.setTransform(3.625,1.025);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgPAnQgIgFgEgJQgFgJAAgMIAAgGQAAgUAJgKQAJgLAPAAQAOAAAIAHQAIAHACAMIgMAAQgDgRgRAAQgKAAgGAIQgFAIgBAPIAAAGQAAAPAHAIQAGAJALAAQAGAAAFgCQAEgBADgDIAAgUIgTAAIAAgJIAfAAIAAAgQgFAGgHADQgIADgLAAQgJAAgIgFg");
	this.shape_4.setTransform(-3.75,-0.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgNAEIAAgHIAcAAIAAAHg");
	this.shape_5.setTransform(-12.35,0.575);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgOAEIAAgHIAcAAIAAAHg");
	this.shape_6.setTransform(-15.65,0.575);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgXAEIAAgHIAvgXIAAAMIgkAOIAkAPIAAAMg");
	this.shape_7.setTransform(-20.6,0.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25.4,-9.2,50.9,18.4);


(lib.Tween4copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgOAgIAAg+IALAAIAAAHQAEgIAKAAIAEABIAAAKIgFgBQgKAAgDAJIAAAsg");
	this.shape.setTransform(21.5,0.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_1.setTransform(16.075,1.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_2.setTransform(9.725,1.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_3.setTransform(3.575,1.025);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgPAnQgIgFgFgJQgDgJgBgMIAAgGQAAgUAJgKQAJgLAPAAQAOAAAIAHQAIAHACAMIgLAAQgEgRgRAAQgKAAgFAIQgHAIABAPIAAAGQAAAPAGAIQAHAJAKAAQAGAAAFgCQAEgBAEgDIAAgUIgUAAIAAgJIAfAAIAAAgQgEAGgIADQgIADgKAAQgJAAgJgFg");
	this.shape_4.setTransform(-3.8,-0.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgOAEIAAgHIAcAAIAAAHg");
	this.shape_5.setTransform(-12.4,0.575);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgOAEIAAgHIAdAAIAAAHg");
	this.shape_6.setTransform(-15.7,0.575);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgXAEIAAgHIAvgXIAAAMIgjAOIAjAPIAAAMg");
	this.shape_7.setTransform(-20.65,0.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25.4,-9.2,50.8,18.4);


(lib.Tween3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IALAAIAAAHQAFgIAJAAIAGABIAAAKIgGgBQgKAAgEAJIAAAsg");
	this.shape.setTransform(21.55,0.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_1.setTransform(16.125,1.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_2.setTransform(9.775,1.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgSAYQgIgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAGgEAHAAQAMAAAHAIQAHAIAAAQIAAADIgqAAQAAAKAGAFQAFAGAHAAQAGAAAEgCIAHgGIAGAFQgIAMgQAAQgMAAgIgJgAgJgSQgFAFgBAIIAfAAIAAgBQAAgIgEgEQgEgFgHAAQgGAAgEAFg");
	this.shape_3.setTransform(3.625,1.025);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgPAnQgIgFgEgJQgFgJAAgMIAAgGQAAgUAJgKQAJgLAPAAQAOAAAIAHQAIAHACAMIgMAAQgDgRgRAAQgKAAgGAIQgFAIgBAPIAAAGQAAAPAHAIQAGAJALAAQAGAAAFgCQAEgBADgDIAAgUIgTAAIAAgJIAfAAIAAAgQgFAGgHADQgIADgLAAQgJAAgIgFg");
	this.shape_4.setTransform(-3.75,-0.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgNAEIAAgHIAcAAIAAAHg");
	this.shape_5.setTransform(-12.35,0.575);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgOAEIAAgHIAcAAIAAAHg");
	this.shape_6.setTransform(-15.65,0.575);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgXAEIAAgHIAvgXIAAAMIgkAOIAkAPIAAAMg");
	this.shape_7.setTransform(-20.6,0.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25.4,-9.2,50.9,18.4);


(lib.targetcopy2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgIAdIAAgqIAQAAIAAAqgAgGgVQgBAAAAAAQgBgBAAAAQAAAAgBgBQAAAAAAgBQAAAAAAAAQABgBAAAAQAAgBABAAQAAAAABgBIAGgBIAHABQABABAAAAQABAAAAABQAAAAABABQAAAAAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAIgHABIgGgBg");
	this.shape.setTransform(47.525,-2.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAWAVIAAgbQAAgEgFgCQgFgDgKAAQgHAAgGADQgGACgEACIAAAdIgRAAIAAgpIAQAAIABAFQALgFARAAQAfAAABAOIAAAbg");
	this.shape_1.setTransform(40.175,-1.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgIAdIAAgqIAQAAIAAAqgAgGgVQgBAAAAAAQgBgBAAAAQAAAAgBgBQAAAAAAgBQAAAAAAAAQABgBAAAAQAAgBABAAQAAAAABgBIAGgBIAHABQABABAAAAQABAAAAABQAAAAABABQAAAAAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAIgHABIgGgBg");
	this.shape_2.setTransform(32.775,-2.475);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgSAUQgJgCgGgDQgFgDAAgEIARAAQABADAFADQAHACAJAAQAKAAAGgCQAFgCAAgCQAAgDgEgCQgGgCgMAAQgMgBgIgCQgHgBgEgDQgDgBgBgDQAAgGAKgDQALgEAPAAQARAAAKAEQAKAEAAAFIgRAAQAAgDgFgCQgHgCgIAAQgIAAgGABQgEADAAACQAAACAEACQAFACALAAIAVADQAIABAEACQADADAAAEQAAAFgLAEQgKADgRAAQgLAAgIgCg");
	this.shape_3.setTransform(25.6,-1.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgcAQQgNgGAAgJIAAgBQAAgFAGgGQAFgFAKgCQAKgDALAAQATAAALAGQALAFAAAKIAAACIhCAAQAAAGAJAEQAIAEALAAQAJAAAGgCQAGgBAFgDIAKADQgMAJgZAAQgTAAgMgGgAgPgMQgHADgBAGIAwAAIAAgBQgBgFgGgDQgGgDgLAAQgJAAgHADg");
	this.shape_4.setTransform(15.975,-1.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AAVAeIghgTIgLAEIAAAPIgQAAIAAg7IAQAAIAAAjIAJgEIAegOIAUAAIglARIAqAZg");
	this.shape_5.setTransform(6.9,-2.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgXAVIAAgpIARAAIAAAFQAHgGAPABIAIAAIAAAGIgIAAQgQABgGAFIAAAdg");
	this.shape_6.setTransform(-5.725,-1.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgcAQQgNgGAAgJIAAgBQAAgFAGgGQAFgFAKgCQAKgDALAAQATAAALAGQALAFAAAKIAAACIhCAAQAAAGAJAEQAIAEALAAQAJAAAGgCQAGgBAFgDIAKADQgMAJgZAAQgTAAgMgGgAgPgMQgHADgBAGIAwAAIAAgBQgBgFgGgDQgGgDgLAAQgJAAgHADg");
	this.shape_7.setTransform(-14.225,-1.7);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgTAUQgJgCgFgDQgFgDAAgEIARAAQAAADAGADQAHACAJAAQAKAAAFgCQAGgCABgCQgBgDgFgCQgFgCgMAAQgMgBgIgCQgIgBgDgDQgDgBgBgDQABgGAJgDQALgEAPAAQAQAAALAEQALAEgBAFIgQAAQgBgDgFgCQgHgCgIAAQgJAAgEABQgGADAAACQABACAEACQAFACAMAAIAUADQAIABADACQAEADAAAEQAAAFgLAEQgKADgRAAQgLAAgJgCg");
	this.shape_8.setTransform(-24.15,-1.7);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgcAQQgNgGAAgJIAAgBQAAgFAGgGQAFgFAKgCQAKgDALAAQATAAALAGQALAFAAAKIAAACIhCAAQAAAGAJAEQAIAEALAAQAJAAAGgCQAGgBAFgDIAKADQgMAJgZAAQgTAAgMgGgAgPgMQgHADgBAGIAwAAIAAgBQgBgFgGgDQgGgDgLAAQgJAAgHADg");
	this.shape_9.setTransform(-33.725,-1.7);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgYAaQgMgDgHgHQgGgGgBgHIAAgEQAAgNAOgHQAOgHAYAAQAVAAANAEQAMAFADAIIgSAAQgEgLgbAAQgQAAgJAFQgKAFAAAKIAAAEQAAAKALAFQAKAGAQAAIARgBQAIgBAEgCIAAgNIgeAAIAAgGIAwAAIAAAVQgHAEgMACQgMACgQAAQgPAAgNgDg");
	this.shape_10.setTransform(-45.25,-2.425);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#000000").ss(2,1,1).p("AqmjkIVNAAIAAHJI1NAAg");
	this.shape_11.setTransform(-0.85,-1.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("rgba(89,89,89,0.247)").s().p("AqlDlIAAnJIVLAAIAAHJg");
	this.shape_12.setTransform(-0.85,-1.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.targetcopy2, new cjs.Rectangle(-69.7,-25.2,137.7,47.8), null);


(lib.targetcopy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgHAeIAAg7IAPAAIAAA7g");
	this.shape.setTransform(18,-2.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgIAdIAAgqIAQAAIAAAqgAgGgVQgBAAAAAAQgBgBAAAAQAAAAgBgBQAAAAAAgBQAAAAAAAAQABgBAAAAQAAgBABAAQAAAAABgBIAGgBIAHABQABABAAAAQABAAAAABQAAAAABABQAAAAAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAIgHABIgGgBg");
	this.shape_1.setTransform(13.475,-2.475);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgTAUQgIgCgFgDQgGgDAAgEIARAAQAAADAHADQAGACAKAAQAJAAAFgCQAHgCAAgCQAAgDgGgCQgFgCgMAAQgNgBgHgCQgHgBgEgDQgDgBAAgDQAAgGAKgDQAKgEAPAAQAQAAALAEQALAEAAAFIgRAAQAAgDgHgCQgFgCgJAAQgJAAgFABQgEADgBACQAAACAFACQAFACAMAAIAUADQAHABAEACQAEADAAAEQAAAFgKAEQgLADgQAAQgLAAgKgCg");
	this.shape_2.setTransform(6.3,-1.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgfATQgJgFAAgEQAAgIAMgCQAMgDAUgBIAQAAIAAgDQAAgDgFgDQgGgCgJAAQgJAAgFABQgHACAAAEIgRAAQABgEAFgCQAFgEAJgCQAJgBAKAAQAQAAAKAEQAKADAAAHIAAASQAAAGADAEIAAAAIgRAAQgBgBgBgEQgMAGgPAAQgPAAgKgDgAgXAJQAAADAGABQAEACAJAAQAHAAAHgCQAHgBADgDIAAgIIgNAAQgeAAAAAIg");
	this.shape_3.setTransform(-3.5,-1.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AAhAcIAAgaIhBAAIAAAaIgSAAIAAg4IASAAIAAAZIBBAAIAAgZIASAAIAAA4g");
	this.shape_4.setTransform(-15.175,-2.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(2,1,1).p("AqmjkIVNAAIAAHJI1NAAg");
	this.shape_5.setTransform(-0.85,-1.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(89,89,89,0.247)").s().p("AqlDlIAAnJIVLAAIAAHJg");
	this.shape_6.setTransform(-0.85,-1.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.targetcopy, new cjs.Rectangle(-69.7,-25.2,137.7,47.8), null);


(lib.drag7G10copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap102copy();
	this.instance.setTransform(90,-3,0.3004,0.7259,90);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgEAFQAAAAgBgBQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAgDACgCQACgBACAAQADgBACACQACACAAACQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBgBAAg");
	this.shape.setTransform(67.275,80.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgaAlIANhIIALAAIgBAFQAFgGAIAAQAFAAAEADQAEACACAFQACAFAAAFIgBAIQAAAHgEAGQgDAGgFAEQgFADgGAAQgHAAgFgGIgFAZgAgEgUIgEAWQACAGAGAAQAGAAAEgEQAEgEABgJIAAgEQAAgGgCgEQgCgDgEAAIgBAAQgGAAgEAGg");
	this.shape_1.setTransform(63.225,79.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgQAWQgGgEAAgIIALAAQAAAEADADQACACAFAAQADgBADgBQADgCAAgDQABgFgHgCIgJgDQgKgDAAgJQABgHAGgFQAGgEAIAAQAIAAAGAEQAFAFAAAIIgMAAQAAgEgCgCQgCgDgEABQgDAAgCABQgDACAAAEQgBAEAGABIAKAEQAKADAAAJQgBAFgDAEQgDAEgFACQgFACgFAAQgJAAgFgGg");
	this.shape_2.setTransform(58.225,78.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgQAWQgGgEAAgIIALAAQAAAEADADQACACAFAAQADgBADgBQADgCAAgDQABgFgHgCIgJgDQgKgDAAgJQABgHAGgFQAGgEAIAAQAIAAAGAEQAFAFAAAIIgMAAQAAgEgCgCQgCgDgEABQgDAAgCABQgDACAAAEQgBAEAGABIAKAEQAKADAAAJQgBAFgDAEQgDAEgFACQgFACgFAAQgJAAgFgGg");
	this.shape_3.setTransform(50.725,78.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgLAlIAJg0IALAAIgJA0gAABgYQAAgBgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQADgCADAAQAAAAABAAQAAAAABAAQAAAAABABQABAAAAABQAAAAABAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAABQAAAAgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgCAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_4.setTransform(47.15,77.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgMAYQgGgEgCgFQgCgGAAgHIAAgCQABgHAEgHQAEgGAGgDQAFgEAGABQAKAAAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgHIAGAHQgDAEgGADQgFACgGABQgGgBgFgDgAgJgEIAVAAIAAgBIAAgEQgBgEgCgCQgCgCgEAAQgIAAgEANg");
	this.shape_5.setTransform(43.2292,78.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgRAbIAJg0IAKAAIgBAGQAFgHAHAAIAFABIgBALIgFAAQgIgBgEAHIgFAjg");
	this.shape_6.setTransform(39.025,78.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgMAYQgGgEgCgFQgCgGAAgHIAAgCQABgHAEgHQAEgGAGgDQAFgEAGABQAKAAAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgHIAGAHQgDAEgGADQgFACgGABQgGgBgFgDgAgJgEIAVAAIAAgBIAAgEQgBgEgCgCQgCgCgEAAQgIAAgEANg");
	this.shape_7.setTransform(34.5792,78.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AAKAkIgWgzIgJAzIgMAAIANhGIAMAAIAUAyIAJgyIAMAAIgMBGg");
	this.shape_8.setTransform(28.55,77.7);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF8C2D").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_9.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


(lib.Path_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#606163").s().p("Ap/z/QEEAADvBlQDkBhCxCyQCxCwBiDmQBkDtAAEEQAAEEhkDuQhiDmixCxQixCxjkBhQjvBkkEAAg");
	this.shape_1.setTransform(64,127.95);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1, new cjs.Rectangle(0,0,128,255.9), null);


(lib.dssd = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(89,89,89,0.008)").s().p("A2qJxIAAzgMAtVAAAIAATgg");
	this.shape.setTransform(-5.35,6.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.dssd, new cjs.Rectangle(-150.4,-56,290.20000000000005,124.9), null);


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


(lib.drag9G77 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap116();
	this.instance.setTransform(0,-3,0.3462,0.3763);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgSAXQgEgEAAgHQABgIAGgEQAHgFALAAIAHABIABgFIAAgDQgBgFgGgBQgEAAgBADQgDABgBAEIgMAAQABgFADgEQADgDAFgCQAFgDAFAAQAJABAFAFQAEAFAAAIIgEAXIgBAFIABAFIAAABIgMAAIAAgEQgHAFgGAAQgHABgFgFgAgGAEQgDADgBAEQAAADABACQACACAEAAQADAAACgCIAGgEIABgKIgFAAQgGAAgEACg");
	this.shape.setTransform(55.125,88.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgIAdQgDgEAAgHIAFgdIgIAAIABgJIAJAAIACgMIAKAAIgCAMIAJAAIgBAJIgJAAIgFAdIAAACQAAADAEAAIAEAAIgBAJIgHABQgFAAgDgEg");
	this.shape_1.setTransform(51.175,87.525);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgNAYQgFgEgCgGQgDgFABgIIAAgBQABgHAEgGQADgHAGgDQAGgEAGAAQAJABAFAFQAFAGAAAJIgLAAQAAgFgCgDQgCgCgFgBQgFAAgEAGQgEAGgBAKQAAANAKAAQADAAADgDQADgCABgEIALAAQgBAFgDAEQgDAFgFACQgFACgFAAQgHAAgEgDg");
	this.shape_2.setTransform(46.8107,88.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgLAkIAJg0IALAAIgJA0gAABgZQgBAAAAAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABgBQABgCADAAQABAAABABQAAAAABAAQAAAAABABQAAAAABAAQAAABABAAQAAABABAAQAAABAAABQAAAAAAABQAAABAAAAQAAABAAAAQgBABAAAAQgBABAAAAQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAgBAAIgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBg");
	this.shape_3.setTransform(43.05,87.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgaAlIANhIIALAAIgBAFQAFgGAIAAQAFAAAEADQAEACACAFQACAFAAAFIgBAIQAAAHgEAGQgDAGgFAEQgFADgGAAQgHAAgFgGIgFAZgAgEgUIgEAWQACAGAGAAQAGAAAEgEQAEgEABgJIAAgEQAAgGgCgEQgCgDgEAAIgBAAQgGAAgEAGg");
	this.shape_4.setTransform(38.575,89.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgSAXQgEgFAAgGQABgJAGgDQAHgFALAAIAHAAIABgDIAAgEQgBgFgGAAQgEAAgBACQgDACgBADIgMAAQABgFADgEQADgEAFgBQAFgCAFAAQAJAAAFAFQAEAFAAAIIgEAXIgBAFIABAFIAAACIgMAAIAAgFQgHAFgGABQgHAAgFgFgAgGAEQgDADgBAEQAAADABACQACACAEAAQADAAACgCIAGgEIABgKIgFAAQgGgBgEADg");
	this.shape_5.setTransform(71.725,72.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgQAWQgGgEAAgIIALAAQAAAEADACQACADAFAAQADAAADgCQADgCAAgDQABgFgHgCIgJgDQgKgDAAgJQABgHAGgFQAGgEAIAAQAIAAAGAEQAFAFAAAHIgMAAQAAgDgCgCQgCgCgEAAQgDAAgCACQgDABAAADQgBAFAGABIAKAEQAKADAAAJQgBAFgDAEQgDAEgFABQgFADgFAAQgJgBgFgFg");
	this.shape_6.setTransform(66.625,72.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgaAlIANhIIALAAIgBAFQAFgGAIAAQAFAAAEADQAEACACAFQACAFAAAFIgBAIQAAAHgEAGQgDAGgFAEQgFADgGAAQgHAAgFgGIgFAZgAgEgUIgEAWQACAGAGAAQAGAAAEgEQAEgEABgJIAAgEQAAgGgCgEQgCgDgEAAIgBAAQgGAAgEAGg");
	this.shape_7.setTransform(61.075,73.075);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgLAlIAJg0IALAAIgJA0gAABgYQAAgBgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQACgCAEgBQAAAAABABQAAAAABAAQAAAAABABQABAAAAABQABAAAAAAQAAABABAAQAAABAAABQAAAAAAABQAAABAAAAQAAABAAAAQgBABAAAAQAAABgBABQAAAAgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgCAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_8.setTransform(57.55,71.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgVAhQgEgGgBgJIAAgHIABgBQABgHADgGQADgGAFgEQAFgDAHAAQAHABAEAFIAFgbIAMAAIgNBKIgKAAIAAgGQgFAHgIAAQgIAAgEgFgAgKAAQgEAFAAAKQgBAGADAEQACADAEAAQAGAAAFgGIAEgWQgCgGgHAAIAAAAQgGAAgEAGg");
	this.shape_9.setTransform(53.675,71.05);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgSAXQgEgFAAgGQABgJAGgDQAHgFALAAIAHAAIABgDIAAgEQgBgFgGAAQgEAAgBACQgDACgBADIgMAAQABgFADgEQADgEAFgBQAFgCAFAAQAJAAAFAFQAEAFAAAIIgEAXIgBAFIABAFIAAACIgMAAIAAgFQgHAFgGABQgHAAgFgFgAgGAEQgDADgBAEQAAADABACQACACAEAAQADAAACgCIAGgEIABgKIgFAAQgGgBgEADg");
	this.shape_10.setTransform(47.925,72.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AAWAbIAFgiIAAgDQAAgGgHAAQgHgBgEAIIAAACIgGAiIgLAAIAGghIAAgEQgBgGgGAAQgHAAgEAGIgHAlIgLAAIAJg0IALAAIgCAGQAHgHAJAAQAEABADABQAEACABAEQAHgIAKAAQAHAAAEAGQAEAEgBAKIgGAhg");
	this.shape_11.setTransform(40.9611,72.05);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgMAYQgGgDgCgGQgCgGAAgHIAAgCQABgHAEgGQAEgHAGgDQAFgDAGAAQAKAAAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgGIAGAGQgDAFgGACQgFADgGAAQgGAAgFgEgAgJgEIAVAAIAAgBIAAgEQgBgDgCgCQgCgCgEgBQgIAAgEANg");
	this.shape_12.setTransform(34.3792,72.1);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgSAXQgEgFAAgGQABgJAGgDQAHgFALAAIAHAAIABgDIAAgEQgBgFgGAAQgEAAgBACQgDACgBADIgMAAQABgFADgEQADgEAFgBQAFgCAFAAQAJAAAFAFQAEAFAAAIIgEAXIgBAFIABAFIAAACIgMAAIAAgFQgHAFgGABQgHAAgFgFgAgGAEQgDADgBAEQAAADABACQACACAEAAQADAAACgCIAGgEIABgKIgFAAQgGgBgEADg");
	this.shape_13.setTransform(28.975,72.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AAJAkIAGggIgeAAIgFAgIgNAAIANhGIAMAAIgFAdIAdAAIAGgdIAMAAIgNBGg");
	this.shape_14.setTransform(23.1,71.2);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FF8C2D").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_15.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


(lib.drag9G6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap115();
	this.instance.setTransform(0,-3,0.3136,0.3763);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgQAXQgGgGAAgHIALAAQAAAEADACQACACAFAAQADAAADgBQADgCAAgDQABgFgHgCIgJgDQgKgDAAgJQABgHAGgEQAGgGAIAAQAIABAGAFQAFAEAAAHIgMAAQAAgDgCgCQgCgCgEgBQgDAAgCACQgDADAAACQgBAFAGACIAKADQAKADAAAJQgBAFgDAEQgDADgFACQgFACgFAAQgJAAgFgEg");
	this.shape.setTransform(69.475,89.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgLAkIAJg0IALAAIgJA0gAABgZQgBAAAAAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABgBQABgCADAAQABAAABABQAAAAABAAQAAAAABABQAAAAABAAQAAABABAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAgBAAIgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBg");
	this.shape_1.setTransform(65.9,88.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgLAlIAMhJIALAAIgMBJg");
	this.shape_2.setTransform(63.425,88.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgSAXQgEgEAAgHQABgJAGgDQAHgFALAAIAHABIABgFIAAgDQgBgFgGgBQgEAAgBACQgDADgBADIgMAAQABgFADgEQADgDAFgDQAFgCAFAAQAJABAFAFQAEAFAAAIIgEAYIgBAEIABAFIAAABIgMAAIAAgEQgHAFgGAAQgHABgFgFgAgGAEQgDACgBAFQAAADABACQACACAEAAQADAAACgCIAGgEIABgLIgFAAQgGAAgEADg");
	this.shape_3.setTransform(59.275,89.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AAHAbIAGghIAAgEQgBgGgGAAQgGAAgFAHIgHAkIgLAAIAJg0IALAAIgBAHQAGgIAIAAQAIAAADAFQAEAGgBAJIgGAhg");
	this.shape_4.setTransform(53.8281,89.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgLAkIAJg0IALAAIgJA0gAABgZQAAAAgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAgBQACgCAEAAQAAAAABABQAAAAABAAQAAAAABABQABAAAAAAQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgCAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBg");
	this.shape_5.setTransform(50.2,88.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgNAYQgFgEgCgFQgDgHABgHIAAgBQABgHAEgGQADgHAGgDQAGgDAGgBQAJABAFAGQAFAFAAAIIgLAAQAAgEgCgDQgCgCgFgBQgFAAgEAGQgEAGgBAKQAAANAKAAQADAAADgCQADgDABgEIALAAQgBAFgDAEQgDAFgFACQgFACgFAAQgHABgEgEg");
	this.shape_6.setTransform(46.3107,89.35);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgLAkIAJg0IALAAIgJA0gAABgZQAAAAgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAgBQACgCAEAAQAAAAABABQAAAAABAAQAAAAABABQABAAAAAAQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgCAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBg");
	this.shape_7.setTransform(42.55,88.35);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgVAgQgEgGgBgIIAAgGIABgBQABgJADgFQADgHAFgDQAFgDAHAAQAHAAAEAGIAFgbIAMAAIgNBKIgKAAIAAgGQgFAHgIAAQgIAAgEgGgAgKgBQgEAGAAAKQgBAGADADQACAFAEAAQAGgBAFgGIAEgWQgCgGgHAAIAAAAQgGAAgEAFg");
	this.shape_8.setTransform(38.675,88.3);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgMAYQgGgDgCgGQgCgGAAgHIAAgCQABgHAEgGQAEgHAGgDQAFgDAGgBQAKABAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgGIAGAFQgDAFgGADQgFACgGAAQgGABgFgEgAgJgEIAVAAIAAgBIAAgEQgBgEgCgBQgCgDgEAAQgIAAgEANg");
	this.shape_9.setTransform(33.1292,89.35);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AAWAbIAFghIAAgFQAAgFgHAAQgHgBgEAJIAAABIgGAiIgLAAIAGghIAAgEQgBgGgGAAQgHAAgEAFIgHAmIgLAAIAJg0IALAAIgCAFQAHgGAJAAQAEAAADACQAEACABAFQAHgJAKAAQAHAAAEAFQAEAGgBAJIgGAhg");
	this.shape_10.setTransform(26.0111,89.3);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgOAYQgFgEgCgGQgCgGAAgHIAAgBQABgHAEgGQAEgGAFgEQAGgEAGAAQAHABAFAEQAFADACAGQADAGgBAHQgBAIgEAGQgDAHgGADQgGADgGABQgHAAgFgEgAgIgKQgCAFgBAFIAAAGQAAAFACAEQADADAEAAQAFAAAEgFQAEgEABgIIABgEQAAgGgDgEQgCgEgFAAQgHAAgEAHg");
	this.shape_11.setTransform(58.9343,73.35);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgVAgQgEgGgBgIIAAgHIABgBQABgIADgFQADgHAFgDQAFgDAHAAQAHAAAEAGIAFgbIAMAAIgNBKIgKAAIAAgGQgFAHgIAAQgIAAgEgGgAgKAAQgEAFAAAKQgBAGADAEQACAEAEAAQAGgBAFgGIAEgWQgCgGgHAAIAAAAQgGAAgEAGg");
	this.shape_12.setTransform(53.675,72.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgRAZQgEgDgBgEQgCgFABgFIAGgiIALAAIgGAiIAAADQABAGAGABQAGgBAFgGIAHglIALAAIgJA0IgLAAIABgFQgFAGgJAAQgFAAgDgCg");
	this.shape_13.setTransform(48.0688,73.4);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgRAbIAJg0IAKAAIgBAGQAFgHAHAAIAFABIgBALIgFgBQgIABgEAGIgFAjg");
	this.shape_14.setTransform(43.675,73.3);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgLAkIAJgzIALAAIgJAzgAABgYQAAgBgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQADgDADAAQAAAAABABQAAAAABAAQAAAAABABQABAAAAABQABAAAAAAQAAABABAAQAAABAAABQAAAAAAABQAAABAAAAQAAABAAAAQgBABAAAAQAAABgBABQAAAAgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgCAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_15.setTransform(40.65,72.35);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AAJAjIAFgfIgdAAIgFAfIgMAAIAMhFIAMAAIgFAdIAdAAIAGgdIALAAIgMBFg");
	this.shape_16.setTransform(35.9,72.45);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FF8C2D").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_17.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


(lib.drag9G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgFAAgCACQgDADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape.setTransform(137.55,35.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgWAsIAAgLIADAAQAFAAADgCQACgDACgEIACgGIgWg+IAPAAIAMAsIANgsIAPAAIgZBIQgEARgPgBIgGAAg");
	this.shape_1.setTransform(131.35,36.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_2.setTransform(125.125,35.275);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgGgDgCQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAhQAHgIAKAAQAUAAAAAXIAAApg");
	this.shape_3.setTransform(118.475,34);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_4.setTransform(111.825,35.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgNAlIgBAIIgNAAIAAhZIAOAAIAAAgQAGgHAKAAQALAAAHAJQAHAIAAAOIAAABQAAAPgHAJQgHAJgLAAQgKAAgGgJgAgNAAIAAAaQAEAIAJAAQAGAAAEgFQADgFAAgKIAAgCQAAgKgDgFQgEgEgGAAQgJgBgEAIg");
	this.shape_5.setTransform(105.275,34.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_6.setTransform(98.425,35.375);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgHAWIAAgjIgKAAIAAgLIAKAAIAAgPIANAAIAAAPIAMAAIAAALIgMAAIAAAiQABAEABACQACACADgBIAFAAIAAALIgJABQgPAAgBgSg");
	this.shape_7.setTransform(92.95,34.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_8.setTransform(86.6,34.125);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgUAlQgHgKAAgPQAAgNAHgJQAHgJALAAQAJAAAHAHIAAggIAOAAIAABZIgNAAIgBgHQgGAHgKABQgLAAgHgJgAgJgCQgDAFAAAKQAAAKADAFQAEAGAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_9.setTransform(81.525,34.05);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_10.setTransform(71.975,35.275);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgFAAgDACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_11.setTransform(65.4,35.325);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgbAtIAAhYIANAAIABAHQAGgHAKgBQALAAAHAJQAHAIAAAQIAAABQAAAOgHAIQgHAJgLAAQgJAAgHgGIAAAegAgNgZIAAAbQAEAIAJAAQAGAAAEgFQADgFAAgLQAAgKgDgGQgEgFgGAAQgJAAgEAHg");
	this.shape_12.setTransform(58.925,36.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_13.setTransform(50.175,35.275);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_14.setTransform(43.45,34.125);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_15.setTransform(38.775,35.325);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_16.setTransform(34.2,34.125);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgUAlQgHgKAAgPQAAgNAHgJQAHgJALAAQAJAAAHAHIAAggIAOAAIAABZIgNAAIgBgHQgGAHgKABQgLAAgHgJgAgJgCQgDAFAAAKQAAAKADAFQAEAGAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_17.setTransform(29.125,34.05);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgbAtIAAhXIANAAIABAGQAGgIAKABQALgBAHAJQAHAJAAAPIAAABQAAANgHAKQgHAIgLAAQgJAAgHgHIAAAfgAgNgYIAAAbQAEAHAJAAQAGAAAEgGQADgEAAgMQAAgJgDgFQgEgGgGAAQgJAAgEAIg");
	this.shape_18.setTransform(133.775,18.1);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAHAFAAALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_19.setTransform(127,16.925);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_20.setTransform(120.625,16.925);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_21.setTransform(116.05,15.725);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgGgDgCQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAiQAHgIAKAAQAUAAAAAVIAAAqg");
	this.shape_22.setTransform(111.175,15.6);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IANAAIAAAHQAEgIAJAAIAGABIAAANIgHgBQgJAAgCAIIAAAqg");
	this.shape_23.setTransform(106.05,16.875);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_24.setTransform(100.475,16.925);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgGAWIAAgjIgLAAIAAgKIALAAIAAgQIAMAAIAAAQIAMAAIAAAKIgMAAIAAAjQAAADACACQABACAEAAIAFgBIAAALIgJABQgPAAAAgSg");
	this.shape_25.setTransform(95.05,16.2);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_26.setTransform(86.675,18.125);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_27.setTransform(80.075,16.875);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgFAAgDACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_28.setTransform(73.5,16.925);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgWAsIAAgMIACAAQAGAAADgCQADgCABgEIACgFIgXg+IAQAAIAMArIAOgrIAOAAIgYBIQgGAQgOAAIgGgBg");
	this.shape_29.setTransform(67.3,18.2);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgGgDgCQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAiQAHgIAKAAQAUAAAAAVIAAAqg");
	this.shape_30.setTransform(58.075,15.6);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgDADgBAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_31.setTransform(51.5,16.925);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IANAAIAAAHQAEgIAKAAIAEABIAAANIgFgBQgKAAgDAIIAAAqg");
	this.shape_32.setTransform(46.45,16.875);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgFAAgCACQgDADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_33.setTransform(40.8,16.925);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgfArIAAhVIAaAAQAJAAAJAFQAJAGAFAJQAFAJAAAMIAAADQAAAMgFAKQgFAJgJAFQgIAFgLAAgAgQAfIAKAAQAKAAAHgHQAGgIAAgNIAAgEQAAgOgGgHQgGgIgKAAIgLAAg");
	this.shape_34.setTransform(33.75,15.825);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_35.setTransform(82.475,25.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.7,-2.2,168.39999999999998,55.6);


(lib.drag9G4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgGAtIAAhZIANAAIAABZg");
	this.shape.setTransform(109.275,43.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_1.setTransform(104.575,45.275);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgbAtIAAhXIANAAIABAGQAGgIAKABQALgBAHAJQAHAJAAAPIAAABQAAANgHAKQgHAIgLAAQgJAAgHgHIAAAfgAgNgYIAAAbQAEAHAJAAQAGAAAEgGQADgEAAgMQAAgJgDgFQgEgGgGAAQgJAAgEAIg");
	this.shape_2.setTransform(98.075,46.45);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_3.setTransform(89.325,45.225);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_4.setTransform(80.925,45.275);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_5.setTransform(74.325,45.225);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_6.setTransform(67.825,45.275);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_7.setTransform(59.325,45.225);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgFgDgDQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAhQAHgHAKgBQAUAAAAAXIAAApg");
	this.shape_8.setTransform(157.075,25.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgDADgBAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_9.setTransform(150.5,26.875);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgGAtIAAhZIANAAIAABZg");
	this.shape_10.setTransform(145.725,25.55);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_11.setTransform(141.025,26.875);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgHAWIAAgjIgKAAIAAgLIAKAAIAAgPIAOAAIAAAPIALAAIAAALIgLAAIAAAiQgBAEACACQACACADgBIAFAAIAAALIgJABQgQAAAAgSg");
	this.shape_12.setTransform(135.6,26.15);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_13.setTransform(129.25,25.675);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_14.setTransform(124.375,26.825);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_15.setTransform(119.55,25.675);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_16.setTransform(111.675,26.825);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAHAFAAALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCABgDIAAgMIgHAAQgHAAgEADg");
	this.shape_17.setTransform(105.1,26.875);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AANAgIgNgrIgNArIgLAAIgRg/IAOAAIAKArIAMgrIAKAAIAOArIAKgrIANAAIgRA/g");
	this.shape_18.setTransform(97.4,26.875);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_19.setTransform(89.775,26.875);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgFgDgDQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAhQAHgHAKgBQAUAAAAAXIAAApg");
	this.shape_20.setTransform(83.175,25.55);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAHAFAAALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCABgDIAAgMIgHAAQgHAAgEADg");
	this.shape_21.setTransform(73.6,26.875);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAGIAAAVIgOAAIAAhZIAOAAIAAAzIAFgFIAQgUIARAAIgXAaIAaAlg");
	this.shape_22.setTransform(67.675,25.55);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_23.setTransform(62.65,25.675);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgGAWIAAgjIgLAAIAAgLIALAAIAAgPIAMAAIAAAPIAMAAIAAALIgMAAIAAAiQABAEABACQABACAEgBIAFAAIAAALIgJABQgPAAAAgSg");
	this.shape_24.setTransform(58.95,26.15);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_25.setTransform(53.925,26.875);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAGIAAAVIgOAAIAAhZIAOAAIAAAzIAFgFIAQgUIARAAIgXAaIAaAlg");
	this.shape_26.setTransform(47.975,25.55);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgFgDgDQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAhQAHgHAKgBQAUAAAAAXIAAApg");
	this.shape_27.setTransform(38.125,25.55);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_28.setTransform(31.55,26.875);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgUAkQgHgJAAgPQAAgNAHgJQAHgJALAAQAJAAAHAHIAAggIAOAAIAABZIgNAAIgBgHQgGAHgKAAQgLABgHgKgAgJgCQgDAFAAAKQAAAKADAFQAEAGAGAAQAJAAAEgHIAAgbQgEgHgJgBQgGABgEAFg");
	this.shape_29.setTransform(24.775,25.6);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_30.setTransform(18.225,26.925);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_31.setTransform(9.675,26.825);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_32.setTransform(156.075,8.425);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAHAFAAALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_33.setTransform(149.5,8.475);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_34.setTransform(142.725,9.675);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_35.setTransform(136.125,8.425);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_36.setTransform(129.625,8.475);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgUAlQgHgKAAgOQAAgPAHgIQAHgJALAAQAJAAAHAHIAAghIAOAAIAABZIgNAAIgBgGQgGAIgKAAQgLgBgHgIgAgJgCQgDAEAAAMQAAAJADAGQAEAFAGAAQAJAAAEgIIAAgaQgEgIgJABQgGgBgEAGg");
	this.shape_37.setTransform(122.825,7.2);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgbAtIAAhXIANAAIABAGQAGgHAKAAQALAAAHAIQAHAJAAAPIAAABQAAANgHAJQgHAJgLAAQgJAAgHgHIAAAfgAgNgYIAAAaQAEAIAJAAQAGAAAEgGQADgEAAgMQAAgJgDgFQgEgGgGAAQgJAAgEAIg");
	this.shape_38.setTransform(113.375,9.65);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgDACQgDADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQADAAAEgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_39.setTransform(106.6,8.475);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_40.setTransform(100.225,8.475);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_41.setTransform(95.65,7.275);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgGgDgCQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAiQAHgJAKABQAUAAAAAVIAAAqg");
	this.shape_42.setTransform(90.775,7.15);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgQAgIAAg+IAOAAIAAAHQAFgIAIAAIAFABIAAANIgGgBQgJAAgCAIIAAAqg");
	this.shape_43.setTransform(85.65,8.425);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_44.setTransform(80.075,8.475);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgHAWIAAgjIgKAAIAAgKIAKAAIAAgQIAOAAIAAAQIALAAIAAAKIgLAAIAAAiQAAAEABACQABABAEABIAFgBIAAALIgJABQgQAAAAgSg");
	this.shape_45.setTransform(74.65,7.75);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_46.setTransform(66.275,9.675);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_47.setTransform(59.675,8.425);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgDACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_48.setTransform(53.1,8.475);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_49.setTransform(46.525,8.425);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_50.setTransform(41.7,7.275);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgGgDgCQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAiQAHgJAKABQAUAAAAAVIAAAqg");
	this.shape_51.setTransform(33.825,7.15);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgEAAgEACQgDADABAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCABgDIAAgMIgHAAQgHAAgEADg");
	this.shape_52.setTransform(27.25,8.475);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgQAgIAAg+IAOAAIAAAHQAFgIAIAAIAGABIAAANIgHgBQgJAAgCAIIAAAqg");
	this.shape_53.setTransform(22.2,8.425);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQADgCADgDIAAgMIgIAAQgHAAgEADg");
	this.shape_54.setTransform(16.55,8.475);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgfArIAAhVIAZAAQAKAAAKAFQAIAGAFAJQAFAJAAAMIAAADQAAAMgFAKQgFAJgJAFQgJAFgLAAgAgQAfIAJAAQAMAAAFgHQAHgIAAgNIAAgEQAAgOgGgHQgGgIgLAAIgKAAg");
	this.shape_55.setTransform(9.5,7.375);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_56.setTransform(82.475,24.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.7,-3.1,172.29999999999998,56.6);


(lib.drag9G3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape.setTransform(144.75,33.675);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_1.setTransform(139.875,34.825);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_2.setTransform(135.05,33.675);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_3.setTransform(127.175,34.825);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgDACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_4.setTransform(120.6,34.875);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AANAgIgNgrIgNArIgLAAIgSg/IAPAAIAKArIAMgrIALAAIAMArIAKgrIAPAAIgSA/g");
	this.shape_5.setTransform(112.9,34.875);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_6.setTransform(105.275,34.875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgGgDgCQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAhQAHgIAKAAQAUAAAAAXIAAApg");
	this.shape_7.setTransform(98.675,33.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgGAWIAAgjIgLAAIAAgLIALAAIAAgPIAMAAIAAAPIAMAAIAAALIgMAAIAAAiQAAAEACACQABACAEgBIAFAAIAAALIgJABQgPAAAAgSg");
	this.shape_8.setTransform(90.2,34.15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_9.setTransform(86.85,33.675);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_10.setTransform(81.775,36.075);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_11.setTransform(77,33.675);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_12.setTransform(71.925,36.075);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgQAgIAAg+IAOAAIAAAHQAFgIAJAAIAEABIAAANIgGgBQgJAAgDAIIAAAqg");
	this.shape_13.setTransform(66.85,34.825);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_14.setTransform(61.275,34.875);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgHAWIAAgjIgKAAIAAgLIAKAAIAAgPIAOAAIAAAPIALAAIAAALIgLAAIAAAiQgBAEACACQACACADgBIAFAAIAAALIgJABQgQAAAAgSg");
	this.shape_15.setTransform(55.85,34.15);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_16.setTransform(47.75,34.875);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgGIAQgTIARAAIgXAaIAaAlg");
	this.shape_17.setTransform(41.825,33.55);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_18.setTransform(36.8,33.675);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgHAWIAAgjIgKAAIAAgLIAKAAIAAgPIANAAIAAAPIAMAAIAAALIgMAAIAAAiQABAEABACQACACADgBIAFAAIAAALIgJABQgPAAgBgSg");
	this.shape_19.setTransform(33.1,34.15);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_20.setTransform(28.075,34.875);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgGIAQgTIARAAIgXAaIAaAlg");
	this.shape_21.setTransform(22.125,33.55);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgHAWIAAgjIgKAAIAAgKIAKAAIAAgQIAOAAIAAAQIALAAIAAAKIgLAAIAAAjQgBADACACQACACADAAIAFgBIAAALIgJABQgQAAAAgSg");
	this.shape_22.setTransform(155.85,15.75);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_23.setTransform(152.5,15.275);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgFIAQgTIARAAIgXAZIAaAlg");
	this.shape_24.setTransform(148.275,15.15);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgDADgBAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_25.setTransform(141.5,16.475);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_26.setTransform(135.125,16.475);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_27.setTransform(125.725,16.425);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQADgCADgDIAAgMIgIAAQgHAAgEADg");
	this.shape_28.setTransform(119.15,16.475);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgFIAQgTIARAAIgXAZIAaAlg");
	this.shape_29.setTransform(113.225,15.15);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCABgDIAAgMIgHAAQgHAAgEADg");
	this.shape_30.setTransform(106.45,16.475);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_31.setTransform(100.075,16.475);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgFAAgDACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_32.setTransform(93.75,16.475);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgQAgIAAg+IAOAAIAAAHQAFgIAIAAIAGABIAAANIgHgBQgJAAgCAIIAAAqg");
	this.shape_33.setTransform(88.7,16.425);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_34.setTransform(83.125,16.475);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_35.setTransform(74.625,16.425);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgFIAQgTIARAAIgXAZIAaAlg");
	this.shape_36.setTransform(63.725,15.15);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCABgDIAAgMIgHAAQgHAAgEADg");
	this.shape_37.setTransform(56.95,16.475);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgUAkQgHgIAAgPQAAgPAHgIQAHgJALAAQAJAAAHAHIAAghIAOAAIAABZIgNAAIgBgGQgGAIgKgBQgLAAgHgJgAgJgCQgDAEAAAMQAAAJADAGQAEAFAGAAQAJAAAEgIIAAgaQgEgIgJAAQgGAAgEAGg");
	this.shape_38.setTransform(50.175,15.2);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_39.setTransform(45.45,15.275);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgGAWIAAgjIgLAAIAAgKIALAAIAAgQIAMAAIAAAQIAMAAIAAAKIgMAAIAAAjQABADABACQACACADAAIAFgBIAAALIgJABQgPAAAAgSg");
	this.shape_40.setTransform(41.75,15.75);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_41.setTransform(33.375,17.675);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_42.setTransform(26.775,16.425);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgDACQgDADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQADAAAEgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_43.setTransform(20.2,16.475);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_44.setTransform(13.625,16.425);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgHArIAAhVIAPAAIAABVg");
	this.shape_45.setTransform(8.6,15.375);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_46.setTransform(82.475,24.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.7,-3.1,172.29999999999998,55.6);


(lib.drag9G2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape.setTransform(110.575,40.675);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_1.setTransform(103.975,39.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgDADgBAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_2.setTransform(97.4,39.475);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_3.setTransform(90.825,39.425);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_4.setTransform(86,38.275);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgFgDgDQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAhQAHgHAKgBQAUAAAAAXIAAApg");
	this.shape_5.setTransform(78.125,38.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_6.setTransform(71.475,39.525);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgNAlIgBAIIgNAAIAAhZIAOAAIAAAgQAGgHAKAAQALAAAHAJQAHAIAAAOIAAABQAAAPgHAJQgHAIgLAAQgKABgGgJgAgNAAIAAAaQAEAIAJAAQAGAAAEgFQADgFAAgKIAAgCQAAgKgDgEQgEgGgGAAQgJAAgEAIg");
	this.shape_7.setTransform(64.925,38.2);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_8.setTransform(58.075,39.525);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgHAWIAAgjIgKAAIAAgLIAKAAIAAgPIAOAAIAAAPIALAAIAAALIgLAAIAAAiQAAAEABACQABACAEgBIAFAAIAAALIgJABQgQAAAAgSg");
	this.shape_9.setTransform(52.6,38.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_10.setTransform(160.35,19.875);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgUAlQgHgKAAgOQAAgPAHgIQAHgJALAAQAJAAAHAHIAAghIAOAAIAABZIgNAAIgBgGQgGAIgKAAQgLgBgHgIgAgJgCQgDAEAAALQAAAKADAGQAEAFAGAAQAJAAAEgIIAAgaQgEgIgJABQgGgBgEAGg");
	this.shape_11.setTransform(155.275,19.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgGAtIAAhZIANAAIAABZg");
	this.shape_12.setTransform(147.525,19.75);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_13.setTransform(142.825,21.075);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgbAtIAAhXIANAAIABAGQAGgHAKAAQALAAAHAIQAHAJAAAPIAAABQAAANgHAJQgHAJgLAAQgJAAgHgHIAAAfgAgNgYIAAAbQAEAHAJAAQAGAAAEgGQADgEAAgMQAAgJgDgFQgEgGgGAAQgJAAgEAIg");
	this.shape_14.setTransform(136.325,22.25);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_15.setTransform(127.575,21.025);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_16.setTransform(119.175,21.075);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_17.setTransform(112.575,21.025);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_18.setTransform(106.075,21.075);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_19.setTransform(97.575,21.025);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgGAWIAAgjIgLAAIAAgKIALAAIAAgQIAMAAIAAAQIAMAAIAAAKIgMAAIAAAiQABAEABACQACABADABIAFgBIAAALIgJABQgPAAAAgSg");
	this.shape_20.setTransform(87.2,20.35);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgDADgBAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_21.setTransform(82.1,21.075);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgbAtIAAhXIANAAIABAGQAGgHAKAAQALAAAHAIQAHAJAAAPIAAABQAAANgHAJQgHAJgLAAQgJAAgHgHIAAAfgAgNgYIAAAbQAEAHAJAAQAGAAAEgGQADgEAAgMQAAgJgDgFQgEgGgGAAQgJAAgEAIg");
	this.shape_22.setTransform(75.625,22.25);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgDACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_23.setTransform(68.85,21.075);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgUAlQgHgKAAgOQAAgPAHgIQAHgJALAAQAJAAAHAHIAAghIAOAAIAABZIgNAAIgBgGQgGAIgKAAQgLgBgHgIgAgJgCQgDAEAAALQAAAKADAGQAEAFAGAAQAJAAAEgIIAAgaQgEgIgJABQgGgBgEAGg");
	this.shape_24.setTransform(62.075,19.8);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_25.setTransform(54.35,19.875);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_26.setTransform(49.475,21.025);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_27.setTransform(44.65,19.875);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_28.setTransform(36.775,21.025);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_29.setTransform(30.2,21.075);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AAOAgIgOgrIgNArIgLAAIgRg/IANAAIAKArIAOgrIAJAAIAOArIAKgrIANAAIgRA/g");
	this.shape_30.setTransform(22.5,21.075);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_31.setTransform(14.875,21.075);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AATArIAAgmIglAAIAAAmIgPAAIAAhVIAPAAIAAAkIAlAAIAAgkIAPAAIAABVg");
	this.shape_32.setTransform(7.3,19.975);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_33.setTransform(82.475,29.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.7,1.5,172.29999999999998,55.6);


(lib.drag8G12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap111();
	this.instance.setTransform(0,-3,0.3766,0.4375);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgNASQgEgEAAgGIAJAAQAAADACACQACACADAAQADAAACgCQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAAAQAAgEgFgCIgHgDQgIgCAAgHQAAgGAFgDQAFgEAGAAQAHAAAEAEQAEAEAAAFIgJAAQAAAAAAgBQAAgBAAAAQAAgBgBAAQAAgBAAAAQgCgCgDAAQgDAAgBABQgBABAAAAQgBABAAAAQAAABgBAAQAAABAAABQAAADAEABIAIADQAIACAAAIQAAAEgDADIgGAEIgIACQgHAAgFgEg");
	this.shape.setTransform(58.975,87.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgOAUQgDgCgBgEQgBgDABgFIAEgbIAJAAIgEAbIAAADQAAAFAFAAQAFAAAEgFIAFgeIAJAAIgHAqIgJAAIABgEQgEAFgHAAIgHgCg");
	this.shape_1.setTransform(54.9667,87.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgJAeIAJg7IAKAAIgKA7g");
	this.shape_2.setTransform(51.8,86.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgJAeIAKg7IAJAAIgKA7g");
	this.shape_3.setTransform(49.8,86.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgKATQgEgDgCgFQgCgEABgGIAAgBQAAgFADgFQADgGAFgCQAFgDAEAAQAIAAAEAGQAEAGgBAJIgBADIgZAAQgBAFADADQACADAEAAQAFABAFgGIAFAFIgHAGQgEACgEAAQgGAAgEgDgAgIgDIARAAIAAgBIAAgEQAAAAAAgBQAAAAAAgBQgBAAAAgBQgBAAAAAAQAAgBgBAAQAAgBgBAAQAAAAgBAAQgBgBgBAAQgGAAgEALg");
	this.shape_4.setTransform(46.605,87.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgJAZIgBAFIgJAAIALg8IAIAAIgEAXQAFgGAGABQAGAAAEAEQADAEAAAHIAAAFQgBAHgCAFQgEAGgDACQgEACgFABQgHgBgDgFgAgFAAIgCARQACAFAFAAQAEAAADgDQADgDABgIIAAgEQAAgEgCgDQgCgCgDAAQgEAAgFAFg");
	this.shape_5.setTransform(42.15,86.85);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgOAUQgDgCgBgEQgBgDABgFIAEgbIAJAAIgEAbIAAADQAAAFAFAAQAFAAAEgFIAFgeIAJAAIgHAqIgJAAIABgEQgEAFgHAAIgHgCg");
	this.shape_6.setTransform(38.0167,87.725);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgOAWIAIgqIAHAAIAAAFQAEgFAGgBIADABIgBAJIgDAAQgGgBgEAGIgEAcg");
	this.shape_7.setTransform(34.5,87.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgNASQgEgEAAgGIAJAAQAAADACACQACABADAAQADAAACgBQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAAAQAAgEgFgCIgHgCQgIgDAAgHQAAgFAFgEQAFgEAGAAQAHAAAEAEQAEADAAAHIgJAAQAAgBAAgBQAAgBAAAAQAAgBgBAAQAAgBAAAAQgCgCgDAAQgDAAgBABQgBABAAAAQgBABAAAAQAAABgBAAQAAABAAABQAAADAEABIAIADQAIACAAAIQAAAEgDADIgGAEIgIACQgHAAgFgEg");
	this.shape_8.setTransform(63.425,74.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgOAUQgDgCgBgEQgBgDABgFIAEgbIAJAAIgEAbIAAADQAAAFAFAAQAFAAAEgFIAFgeIAJAAIgHAqIgJAAIABgEQgEAFgHAAIgHgCg");
	this.shape_9.setTransform(59.4167,74.125);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgLATQgEgDgBgFQgCgFABgFIAAgBQAAgGADgFQADgFAFgCQAEgDAFAAQAHAAAEAFQAEAEAAAHIgJAAQAAgEgBgCQgCgCgEgBQgEABgDAEQgDAFAAAHQgBALAIAAQACAAADgCQACgCABgDIAJAAQgBAEgCADQgDAEgEACQgEACgDAAQgGAAgEgDg");
	this.shape_10.setTransform(55.1583,74.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgJAdIAIgpIAIAAIgHApgAABgTQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIABgEQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAABAAAAQAAAAgBABIgEABQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_11.setTransform(52.125,73.275);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgOAWIAIgqIAIAAIgBAFQAEgFAGAAIADAAIgBAJIgDAAQgGAAgEAEIgEAdg");
	this.shape_12.setTransform(49.8,74.05);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgJAZIgBAFIgJAAIAKg8IAJAAIgDAWQAEgEAGAAQAGAAAEAEQADAFAAAGIAAAFQgBAHgCAFQgEAGgEACQgDACgFABQgGgBgEgFgAgFAAIgDARQACAFAGABQAEgBADgDQACgDABgIIABgEQAAgEgCgCQgCgDgDAAQgEAAgFAFg");
	this.shape_13.setTransform(45.95,73.25);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AARAWIAFgbIAAgDQgBgFgFAAQgGAAgDAGIAAACIgFAbIgIAAIAEgbIAAgDQAAgFgFAAQgGAAgDAFIgFAeIgKAAIAIgqIAIAAIAAAEQAFgEAHAAQADAAADABQACACABADQAGgGAIAAQAGAAADADQADAFgBAHIgEAbg");
	this.shape_14.setTransform(40.3036,74.05);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgOAUQgDgCgBgEQgBgDABgFIAEgbIAJAAIgEAbIAAADQAAAFAFAAQAFAAAEgFIAFgeIAJAAIgHAqIgJAAIABgEQgEAFgHAAIgHgCg");
	this.shape_15.setTransform(35.0167,74.125);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgRAdIAKg5IAJAAIgIAxIAYAAIgBAIg");
	this.shape_16.setTransform(30.45,73.35);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FF8C2D").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_17.setTransform(45.05,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90.1,100.80000000000001);


(lib.drag8G9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap108();
	this.instance.setTransform(0,-3,0.3136,0.4294);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgNASQgEgEAAgHIAJAAQAAAEACACQACACADgBQADABACgCQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAAAQAAgFgFgBIgHgCQgIgDAAgHQAAgFAFgEQAFgEAGAAQAHAAAEAEQAEADAAAHIgJAAQAAgBAAgBQAAgBAAAAQAAgBgBAAQAAgBAAAAQgCgCgDAAQgDAAgBABQgBABAAAAQgBABAAAAQAAABgBAAQAAABAAABQAAADAEABIAIADQAIACAAAIQAAAEgDADIgGAFIgIABQgHgBgFgDg");
	this.shape.setTransform(59.525,88.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgJAdIAIgpIAIAAIgHApgAABgTQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIABgEQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAABAAQAAAAAAABQABAAAAAAQABABAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAABQAAAAgBABIgEABQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_1.setTransform(56.675,87.925);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgNAVIAHgpIAIAAIgBAFQAEgGAGABIADAAIAAAJIgFAAQgGAAgDAEIgEAcg");
	this.shape_2.setTransform(54.35,88.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgHAYQgCgEAAgFIAEgXIgGAAIABgIIAHAAIABgKIAJAAIgCAKIAHAAIgBAIIgHAAIgEAXIAAABQAAABAAAAQAAABAAAAQABAAAAABQABAAABAAIADgBIgBAIIgFABQgEgBgDgCg");
	this.shape_3.setTransform(51.725,88.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgNASQgEgEAAgHIAJAAQAAAEACACQACACADgBQADABACgCQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAAAQAAgFgFgBIgHgCQgIgDAAgHQAAgFAFgEQAFgEAGAAQAHAAAEAEQAEADAAAHIgJAAQAAgBAAgBQAAgBAAAAQAAgBgBAAQAAgBAAAAQgCgCgDAAQgDAAgBABQgBABAAAAQgBABAAAAQAAABgBAAQAAABAAABQAAADAEABIAIADQAIACAAAIQAAAEgDADIgGAFIgIABQgHgBgFgDg");
	this.shape_4.setTransform(48.125,88.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgKATQgEgDgCgEQgCgFABgFIAAgCQAAgFADgGQADgFAFgDQAFgCAEAAQAIAAAEAGQAEAGgBAJIgBADIgZAAQgBAFADADQACADAEAAQAFABAFgGIAFAFIgHAGQgEACgEAAQgGgBgEgCgAgIgDIARAAIAAgBIAAgDQAAgBAAgBQAAAAAAgBQgBAAAAgBQgBAAAAgBQAAAAgBAAQAAgBgBAAQAAAAgBAAQgBgBgBAAQgGAAgEALg");
	this.shape_5.setTransform(44.105,88.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgNAVIAHgpIAHAAIAAAFQAEgGAGABIAEAAIgBAJIgFAAQgFAAgEAEIgEAcg");
	this.shape_6.setTransform(40.75,88.7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgKATQgEgDgCgEQgCgFABgFIAAgCQAAgFADgGQADgFAFgDQAFgCAEAAQAIAAAEAGQAEAGgBAJIgBADIgZAAQgBAFADADQACADAEAAQAFABAFgGIAFAFIgHAGQgEACgEAAQgGgBgEgCgAgIgDIARAAIAAgBIAAgDQAAgBAAgBQAAAAAAgBQgBAAAAgBQgBAAAAgBQAAAAgBAAQAAgBgBAAQAAAAgBAAQgBgBgBAAQgGAAgEALg");
	this.shape_7.setTransform(37.155,88.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgHAYQgCgEAAgFIAEgXIgGAAIABgIIAHAAIABgKIAJAAIgCAKIAHAAIgBAIIgHAAIgEAXIAAABQAAABAAAAQAAABABAAQAAAAAAABQABAAABAAIADgBIgBAIIgFABQgEgBgDgCg");
	this.shape_8.setTransform(33.925,88.25);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgNASQgEgEAAgHIAJAAQAAAEACACQACACADgBQADABACgCQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAAAQAAgEgFgCIgHgCQgIgDAAgHQAAgFAFgFQAFgDAGAAQAHAAAEADQAEAFAAAGIgJAAQAAgBAAgBQAAgBAAAAQAAgBgBAAQAAgBAAAAQgCgCgDAAQgDAAgBABQgBABAAAAQgBABAAAAQAAABgBAAQAAABAAAAQAAAEAEABIAIADQAIADAAAGQAAAFgDADIgGAFIgIABQgHgBgFgDg");
	this.shape_9.setTransform(63.425,75.15);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgOAUQgDgCgBgEQgBgDABgFIAEgbIAJAAIgEAbIAAADQAAAFAFAAQAFAAAEgFIAFgeIAJAAIgHAqIgJAAIABgEQgEAFgHAAIgHgCg");
	this.shape_10.setTransform(59.4167,75.175);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgLATQgEgDgBgEQgCgGABgFIAAgBQAAgGADgFQADgFAFgDQAEgCAFAAQAHAAAEAFQAEAEAAAHIgJAAQAAgDgBgDQgCgDgEABQgEAAgDAEQgDAFAAAIQgBAKAIAAQACABADgCQACgCABgEIAJAAQgBAEgCADQgDAEgEACQgEACgDAAQgGgBgEgCg");
	this.shape_11.setTransform(55.1583,75.15);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgJAdIAIgpIAIAAIgHApgAABgTQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIABgEQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAABQAAAAgBABIgEABQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_12.setTransform(52.125,74.325);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgOAVIAIgpIAIAAIgBAFQAEgGAGABIADAAIgBAJIgDAAQgGAAgEAEIgEAcg");
	this.shape_13.setTransform(49.8,75.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgJAZIgBAEIgJAAIAKg6IAJAAIgDAVQAEgEAGAAQAGgBAEAFQADAEAAAHIAAAGQgBAGgCAFQgEAFgEADQgDACgFAAQgGAAgEgFgAgFAAIgDARQACAGAGAAQAEAAADgEQACgEABgGIABgGQAAgDgCgCQgCgCgDgBQgEAAgFAFg");
	this.shape_14.setTransform(45.95,74.3);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AARAVIAFgaIAAgDQgBgEgFgBQgGAAgDAGIAAABIgFAbIgIAAIAEgaIAAgDQAAgEgFgBQgGAAgDAFIgFAdIgKAAIAIgpIAIAAIAAAEQAFgEAHAAQADAAADACQACABABADQAGgHAIABQAGAAADADQADAFgBAHIgEAag");
	this.shape_15.setTransform(40.3036,75.1);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgOAUQgDgCgBgEQgBgDABgFIAEgbIAJAAIgEAbIAAADQAAAFAFAAQAFAAAEgFIAFgeIAJAAIgHAqIgJAAIABgEQgEAFgHAAIgHgCg");
	this.shape_16.setTransform(35.0167,75.175);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgRAcIAKg4IAJAAIgIAwIAYAAIgBAIg");
	this.shape_17.setTransform(30.45,74.4);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FF8C2D").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_18.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


(lib.drag7G8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgSAXQgEgFAAgGQABgJAGgDQAHgFALAAIAHABIABgFIAAgDQgBgFgGgBQgEAAgBACQgDACgBAEIgMAAQABgFADgEQADgEAFgCQAFgCAFAAQAJABAFAFQAEAFAAAIIgEAYIgBAEIABAFIAAABIgMAAIAAgEQgHAFgGAAQgHABgFgFgAgGAEQgDADgBAEQAAADABACQACACAEAAQADAAACgCIAGgFIABgKIgFAAQgGAAgEADg");
	this.shape.setTransform(116.475,23.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgMAYQgGgDgCgGQgCgGAAgHIAAgCQABgHAEgGQAEgHAGgDQAFgDAGgBQAKABAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgHIAGAGQgDAFgGADQgFADgGgBQgGABgFgEgAgJgEIAVAAIAAgBIAAgEQgBgDgCgDQgCgBgEgBQgIAAgEANg");
	this.shape_1.setTransform(111.4292,23.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AAHAbIAGghIAAgEQgBgGgGAAQgGAAgFAGIgHAlIgLAAIAJg0IALAAIgBAGQAGgHAIAAQAIABADAEQAEAGgBAJIgGAhg");
	this.shape_2.setTransform(105.8281,23.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgLAkIAJg0IALAAIgJA0gAABgZQAAAAgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAgBQACgCAEAAQAAAAABABQAAAAABAAQAAAAABABQABAAAAAAQABABAAAAQAAABABAAQAAABAAABQAAAAAAABQAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgCAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBg");
	this.shape_3.setTransform(102.2,22.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgVAgQgEgFgBgKIAAgFIABgBQABgJADgFQADgGAFgEQAFgDAHAAQAHAAAEAGIAFgbIAMAAIgNBKIgKAAIAAgGQgFAHgIAAQgIAAgEgGgAgKgBQgEAGAAAKQgBAGADADQACAFAEAAQAGAAAFgHIAEgWQgCgGgHAAIAAAAQgGAAgEAFg");
	this.shape_4.setTransform(98.325,22.05);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgRAYQgEgCgBgEQgCgFABgFIAGgiIALAAIgGAiIAAADQABAGAGABQAGAAAFgHIAHglIALAAIgJA0IgLAAIABgFQgFAGgJAAQgFAAgDgDg");
	this.shape_5.setTransform(92.7188,23.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgRAbIAJg0IAKAAIgBAGQAFgHAHAAIAFABIgBALIgFAAQgIAAgEAGIgFAjg");
	this.shape_6.setTransform(88.325,23.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgLAkIAJg0IALAAIgJA0gAABgZQAAAAgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAgBQACgCAEAAQAAAAABABQAAAAABAAQAAAAABABQABAAAAAAQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgCAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBg");
	this.shape_7.setTransform(85.3,22.1);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AAJAjIAFgfIgdAAIgGAfIgLAAIAMhGIAMAAIgFAeIAdAAIAGgeIALAAIgMBGg");
	this.shape_8.setTransform(80.55,22.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgKAZQgFgCgDgFQgDgEAAgEIAMAAQAAAEADACQADACADAAQAFAAADgBQACgCAAgDQAAgDgCgCQgDgBgFgBIgKgEQgJgDAAgJQAAgGAFgEQAGgFAIgBQAKABAGAFQAFAEAAAHIgMAAQABgDgDgCQgDgDgEAAQgCAAgDADQgCABgBADQABADACACQACABAGACIALADQAEACACADQACACAAAFQAAAGgGAFQgGAFgKgBQgFAAgFgCg");
	this.shape_9.setTransform(182.75,7.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_10.setTransform(177.525,7.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgFAlIAAhKIALAAIAABKg");
	this.shape_11.setTransform(173.525,6);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_12.setTransform(169.625,7.1);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AAOAjIgVgeIgIAJIAAAVIgMAAIAAhGIAMAAIAAAiIAHgJIAUgZIAPAAIgbAgIAcAmg");
	this.shape_13.setTransform(164.125,6.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_14.setTransform(152.825,7.05);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_15.setTransform(147.375,7.1);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AALAaIgLgjIgKAjIgKAAIgPg0IAMAAIAIAkIAMgkIAIAAIALAkIAIgkIALAAIgOA0g");
	this.shape_16.setTransform(140.9,7.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_17.setTransform(134.575,7.1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AAKAlIAAghQAAgFgCgCQgDgCgEgBQgGAAgEAGIAAAlIgMAAIAAhKIAMAAIAAAcQAGgGAIgBQARABAAASIAAAig");
	this.shape_18.setTransform(129.075,6);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAHAAIAFABIAAALIgFgBQgIABgCAGIAAAjg");
	this.shape_19.setTransform(122.3,7.05);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_20.setTransform(117.625,7.1);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAIQAFAGAAANIAAAAQAAANgFAGQgGAIgJAAQgJAAgFgHgAgKAAIAAAVQADAIAHAAQAFgBADgEQADgEAAgJIAAgBQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_21.setTransform(112.175,6.05);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AAaAbIAAgiQAAgEgCgDQgDgCgFAAQgEAAgDACQgCADgBADIAAAjIgLAAIAAgiQAAgJgKAAQgHAAgDAGIAAAlIgLAAIAAg0IAKAAIABAGQAFgHALAAQAJAAAEAJQAFgJALAAQAJAAAEAFQAFAFgBAJIAAAig");
	this.shape_22.setTransform(104.9,7.05);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_23.setTransform(97.875,7.1);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgLAjQgFgCgDgEIAFgHQAGAGAIAAQAFAAADgDQADgDAAgHIAAgDQgFAGgHgBQgJABgGgIQgGgHAAgNQAAgMAGgHQAFgIAKAAQAIAAAFAHIABgGIAKAAIAAAzQAAAKgGAHQgHAFgKABQgFAAgGgDgAgHgWQgDAFAAAIQAAAJADAEQADAEAFAAQAHAAADgGIAAgXQgDgFgHgBQgFAAgDAFg");
	this.shape_24.setTransform(92.225,8.1);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AAKAlIAAghQAAgFgCgCQgDgCgEgBQgGAAgEAGIAAAlIgMAAIAAhKIAMAAIAAAcQAGgGAIgBQARABAAASIAAAig");
	this.shape_25.setTransform(84.225,6);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgRAUQgGgHgBgNIAAAAQAAgHADgGQADgHAGgDQAFgEAHAAQAKABAIAGQAGAIABALIAAABQgBAJgDAGQgDAFgFAEQgGADgHAAQgKABgHgIgAgIgMQgEAFAAAHQAAAJAEAFQADAEAFAAQAGAAAEgEQACgFAAgJQABgHgEgFQgDgFgGAAQgFAAgDAFg");
	this.shape_26.setTransform(78.6,7.1);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgGASIAAgdIgIAAIAAgJIAIAAIAAgMIAMAAIAAAMIAJAAIAAAJIgJAAIAAAdIABAEIAEABIAEAAIAAAJIgIABQgNAAAAgPg");
	this.shape_27.setTransform(73.95,6.525);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_28.setTransform(69.625,7.05);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgRAUQgGgHAAgNIAAAAQAAgHACgGQADgHAGgDQAGgEAGAAQAKABAIAGQAGAIAAALIAAABQAAAJgCAGQgDAFgGAEQgFADgIAAQgKABgHgIgAgIgMQgEAFAAAHQAAAJAEAFQADAEAFAAQAGAAAEgEQADgFAAgJQgBgHgDgFQgDgFgGAAQgFAAgDAFg");
	this.shape_29.setTransform(64,7.1);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgNIAAAAQAAgMAHgHQAGgIAKAAQAKAAAGAGQAFAGABAJIgLAAQgBgFgDgDQgCgDgFAAQgFAAgDAFQgDADAAAJIAAABQAAAJADAEQADAEAFAAQAEAAADgDQADgCABgEIALAAQAAAFgDAEQgDAEgFADQgFACgGAAQgKAAgGgGg");
	this.shape_30.setTransform(58.625,7.1);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_31.setTransform(50.775,7.1);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_32.setTransform(45.325,8.075);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_33.setTransform(39.725,7.1);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgNAbIAAg0IAMAAIAAAGQADgHAIAAIAEABIgBALIgEgBQgIABgCAGIAAAjg");
	this.shape_34.setTransform(35.5,7.05);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_35.setTransform(30.875,7.1);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAIQAFAGAAANIAAAAQAAANgFAGQgGAIgJAAQgJAAgFgHgAgKAAIAAAVQADAIAHAAQAFgBADgEQADgEAAgJIAAgBQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_36.setTransform(25.425,6.05);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_37.setTransform(19.875,7.1);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgZAjIAAhGIAZAAQALAAAGAFQAHAFAAAKQAAAEgDAFQgCADgFACQAFABAEAFQADAEgBAGQAAAKgGAFQgHAGgMgBgAgMAZIANAAQAGABADgDQADgDAAgFQAAgMgLABIgOAAgAgMgEIAMAAQAFgBADgCQADgDAAgEQAAgGgDgCQgDgCgFAAIgMAAg");
	this.shape_38.setTransform(14.1,6.2);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFE319").s().p("AvSikIelgJIAAFRI+lAKg");
	this.shape_39.setTransform(98.125,14.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0.3,-3.1,195.7,34.8);


(lib.drag7G7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape.setTransform(85.6,8.675);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgPAgIAAg+IANAAIAAAHQAEgIAKAAIAEABIAAANIgFgBQgKAAgDAIIAAAqg");
	this.shape_1.setTransform(82.25,9.825);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_2.setTransform(76.675,9.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgHAWIAAgjIgKAAIAAgLIAKAAIAAgPIAOAAIAAAPIALAAIAAALIgLAAIAAAjQgBADACACQACABADAAIAFAAIAAALIgJABQgQAAAAgSg");
	this.shape_3.setTransform(71.25,9.15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgDACQgEADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAHAAQAKAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_4.setTransform(66.15,9.875);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AAdArIAAgcIACglIgaBBIgJAAIgZhBIABAlIAAAcIgPAAIAAhVIAUAAIAXBBIAZhBIATAAIAABVg");
	this.shape_5.setTransform(57.625,8.775);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgPAgIAAg+IANAAIAAAHQAEgIAKAAIAEABIAAANIgFgBQgKAAgDAIIAAAqg");
	this.shape_6.setTransform(47.6,9.825);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAHAFAAALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_7.setTransform(41.95,9.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgNAlIgBAIIgNAAIAAhaIAOAAIAAAhQAGgHAKAAQALAAAHAJQAHAIAAAOIAAACQAAAOgHAJQgHAIgLAAQgKABgGgJgAgNAAIAAAaQAEAIAJAAQAGAAAEgFQADgFAAgKIAAgCQAAgKgDgEQgEgGgGAAQgJAAgEAIg");
	this.shape_8.setTransform(35.475,8.6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_9.setTransform(26.725,9.825);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgEAAgEACQgDADABAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCABgDIAAgMIgHAAQgHAAgEADg");
	this.shape_10.setTransform(18.25,9.875);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgQAnQgHgFgFgJQgEgJgBgMIAAgGQAAgTAJgLQAKgLAPAAQAPAAAIAHQAJAHABAOIgPAAQgCgQgQAAQgJAAgEAHQgGAIAAANIAAAGQAAAOAGAHQAGAIAJAAQAMAAAEgFIAAgRIgSAAIAAgKIAhAAIAAAgQgEAGgJADQgIADgLAAQgJAAgJgFg");
	this.shape_11.setTransform(10.85,8.775);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFE319").s().p("AnShxIOlgFIAADnIulAGg");
	this.shape_12.setTransform(46.975,8.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0.3,-3.1,93.4,23.900000000000002);


(lib.btnMenuKI = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#18B8C4").s().p("AhXBMIBNhMIhNhMIAygxIB9B9Ih9B+g");
	this.shape.setTransform(-43.283,1.4244,0.5328,0.5328,-90);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#18B8C4").s().p("Ah6CSICRiSIiRiRIAygyIDCDDIjCDDg");
	this.shape_1.setTransform(-43.283,-6.9012,0.5328,0.5328,-90);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7,p:{y:-3.875}},{t:this.shape_6,p:{y:-3.875}},{t:this.shape_5},{t:this.shape_4,p:{y:0.925}},{t:this.shape_3},{t:this.shape_2,p:{y:1.075}},{t:this.shape_1,p:{y:-6.9012}},{t:this.shape,p:{y:1.4244}}]}).to({state:[{t:this.shape_7,p:{y:-2.275}},{t:this.shape_11},{t:this.shape_6,p:{y:-2.275}},{t:this.shape_10},{t:this.shape_4,p:{y:2.525}},{t:this.shape_9},{t:this.shape_2,p:{y:2.675}},{t:this.shape_1,p:{y:-5.3012}},{t:this.shape,p:{y:3.0244}}]},1).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_4,p:{y:6.525}},{t:this.shape_12},{t:this.shape_2,p:{y:6.675}},{t:this.shape_1,p:{y:-1.3012}},{t:this.shape,p:{y:7.0244}}]},1).wait(2));

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
	this.shape.setTransform(-38.9392,-3.0036,0.7124,0.7882,180);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#ED4F44").s().p("Ah3C3QgGgDAAgHIAAgiQAAgOAMgJICPhrQAEgEAAgFQAAgFgEgDIiPhsQgMgIAAgOIAAgiQAAgHAGgDQAHgDAFAEIDkCrQAFAEAAAGQAAAHgFAEIjkCrQgDACgEAAIgFgBg");
	this.shape_1.setTransform(-45.2259,-3.0233,0.7124,0.7882,180);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10,p:{y:-3.875}},{t:this.shape_9,p:{y:-3.875}},{t:this.shape_8},{t:this.shape_7,p:{y:0.925}},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{scaleX:0.7124,scaleY:0.7882,x:-45.2259,y:-3.0233}},{t:this.shape,p:{scaleX:0.7124,scaleY:0.7882,x:-38.9392,y:-3.0036}}]}).to({state:[{t:this.shape_10,p:{y:-1.875}},{t:this.shape_18},{t:this.shape_9,p:{y:-1.875}},{t:this.shape_17},{t:this.shape_7,p:{y:2.925}},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_1,p:{scaleX:0.7118,scaleY:0.7877,x:-45.2186,y:-2.3132}},{t:this.shape,p:{scaleX:0.7118,scaleY:0.7877,x:-38.937,y:-2.2935}}]},1).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_7,p:{y:6.425}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_1,p:{scaleX:0.7118,scaleY:0.7877,x:-45.2186,y:-0.3132}},{t:this.shape,p:{scaleX:0.7118,scaleY:0.7877,x:-38.937,y:-0.2935}}]},1).wait(2));

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


(lib.infod = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween3("synched",0);

	this.instance_1 = new lib.Tween4copy("synched",0);
	this.instance_1.setTransform(-33.25,0);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween5copy("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},23).to({state:[{t:this.instance_2}]},29).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,x:-33.25},23).wait(30));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},23).to({_off:true,x:0},29).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-58.7,-9.2,84.2,18.4);


(lib.info = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween4("synched",0);

	this.instance_1 = new lib.Tween5("synched",0);
	this.instance_1.setTransform(0,-10);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween6("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},24).to({state:[{t:this.instance_2}]},23).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,y:-10},24).wait(24));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},24).to({_off:true,y:0},23).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-87,-19.2,174.1,28.4);


(lib.hdsajd = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.satu = new lib.hasjkh1();
	this.satu.name = "satu";
	this.satu.setTransform(-0.85,0.75,0.8086,0.8086,0,0,0,81.4,28.4);
	new cjs.ButtonHelper(this.satu, 0, 1, 2, false, new lib.hasjkh1(), 3);

	this.timeline.addTween(cjs.Tween.get(this.satu).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hdsajd, new cjs.Rectangle(-69.6,-22.4,139.3,44.9), null);


(lib.Slots1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// slots
	this.target = new lib.targetcopy2();
	this.target.name = "target";
	this.target.setTransform(-12.65,384.2,0.6294,2.0456);

	this.kotakKartu2 = new lib.targetcopy();
	this.kotakKartu2.name = "kotakKartu2";
	this.kotakKartu2.setTransform(-12.65,281.55,0.6294,2.0456);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.kotakKartu2},{t:this.target}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Slots1, new cjs.Rectangle(-56.5,230,86.7,200.5), null);


(lib.Pieces1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// pieces
	this.target = new lib.drag9G77();
	this.target.name = "target";
	this.target.setTransform(364.9,382.95,0.9282,0.9252,0,0,0,45,47);
	new cjs.ButtonHelper(this.target, 0, 1, 1);

	this.target_1 = new lib.drag9G6();
	this.target_1.name = "target_1";
	this.target_1.setTransform(274.8,383.05,0.9282,0.9252,0,0,0,45,47.1);
	new cjs.ButtonHelper(this.target_1, 0, 1, 1);

	this.hemm = new lib.drag8G12();
	this.hemm.name = "hemm";
	this.hemm.setTransform(456.25,383.05,0.9245,0.9257,0,0,0,45.1,47.1);
	new cjs.ButtonHelper(this.hemm, 0, 1, 1);

	this.hemm_1 = new lib.drag8G9();
	this.hemm_1.name = "hemm_1";
	this.hemm_1.setTransform(183,383.05,0.9245,0.9257,0,0,0,44.9,47.1);
	new cjs.ButtonHelper(this.hemm_1, 0, 1, 1);

	this.hemm_2 = new lib.drag7G10copy();
	this.hemm_2.name = "hemm_2";
	this.hemm_2.setTransform(92.8,383.05,0.9279,0.9279,0,0,0,45,47);
	new cjs.ButtonHelper(this.hemm_2, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.hemm_2},{t:this.hemm_1},{t:this.hemm},{t:this.target_1},{t:this.target}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces1, new cjs.Rectangle(51.1,336.3,446.7,93.5), null);


(lib.btnEit = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Path_1();
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


(lib.drop9G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgJBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape.setTransform(178.5,52.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAKIAAAeIgWAAIAAiGIAWAAIAABNIAGgIIAagcIAZAAIgjAmIAnA3g");
	this.shape_1.setTransform(172.075,52.05);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_2.setTransform(164.5,52.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgKBDIAAiGIAUAAIAACGg");
	this.shape_3.setTransform(159.9,52.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_4.setTransform(155.3,52.25);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgMASAAQASAAAHAOQAKgOATAAQAQAAAIAJQAHAIAAARIAAA9g");
	this.shape_5.setTransform(145.175,53.95);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_6.setTransform(135.05,52.25);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgUAKgOQALgNARAAQAOgBAJALIAAgxIAWAAIAACGIgUAAIgBgKQgJANgPAAQgRAAgKgOgAgOgEQgFAHAAARQAAAPAFAIQAGAIAJAAQANAAAGgMIAAgnQgGgMgNAAQgJAAgGAIg");
	this.shape_7.setTransform(127.475,52.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgVA/QgJgFgFgHIAKgMQAKALAOAAQAKAAAFgFQAHgGgBgLIAAgHQgJALgOAAQgQAAgLgOQgLgNAAgXQAAgWAKgNQALgNARAAQAQAAAJALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgKgEgAgOgoQgFAIAAAQQAAAPAFAHQAGAIAJAAQAOAAAFgLIAAgpQgFgLgOAAQgJAAgGAJg");
	this.shape_8.setTransform(112.8,55.825);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABCIgWAAIAAhdIAVAAIABAKQAKgMAQAAQAeAAAAAhIAAA+g");
	this.shape_9.setTransform(102.9,53.95);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKAAQARgBAKAJQAKAJAAAOIAAArQAAAMAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_10.setTransform(93.025,54.05);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgiBBIAAgRIAEABQAIAAAEgDQAEgDADgHIADgIIgiheIAXAAIATBBIAUhBIAXAAIgmBtQgIAYgVAAIgKgCg");
	this.shape_11.setTransform(83.775,55.975);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AARBEIgbgqIgJAKIAAAgIgWAAIAAiGIAWAAIAABNIAGgJIAagdIAZAAIgjAnIAnA4g");
	this.shape_12.setTransform(221.125,26.45);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgfAkQgMgNAAgXIAAAAQAAgOAFgLQAGgMAKgFQAKgHAMAAQATAAAMANQAMAMABAVIAAAEQAAAOgFALQgGALgKAGQgKAGgNAAQgTAAgMgNgAgQgXQgGAJAAAPQAAAOAGAJQAGAIAKAAQALAAAGgIQAGgJAAgPQAAgOgGgJQgHgIgKAAQgKAAgGAIg");
	this.shape_13.setTransform(210.775,28.45);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgJBEIAAiGIATAAIAACGg");
	this.shape_14.setTransform(203.35,26.45);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgfAkQgMgNAAgXIAAAAQAAgOAFgLQAGgMAKgFQAKgHAMAAQATAAAMANQAMAMABAVIAAAEQAAAOgFALQgGALgKAGQgKAGgNAAQgTAAgMgNgAgQgXQgGAJAAAPQAAAOAGAJQAGAIAKAAQALAAAGgIQAGgJAAgPQAAgOgGgJQgHgIgKAAQgKAAgGAIg");
	this.shape_15.setTransform(195.975,28.45);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgUA4IgCALIgTAAIAAiGIAWAAIAAAwQAJgKAOgBQASABAKANQAKANAAAWIAAABQAAAWgKANQgKANgRAAQgQAAgJgMgAgTAAIAAAnQAFAMAOAAQAJAAAGgIQAFgHAAgPIAAgDQAAgPgFgHQgGgIgJAAQgOAAgFAMg");
	this.shape_16.setTransform(185.975,26.55);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AAuAxIAAg+QAAgJgEgDQgEgFgJAAQgHAAgFAEQgFAEgBAHIAABAIgVAAIAAg+QAAgRgRAAQgNAAgFAKIAABFIgVAAIAAhfIAUAAIAAAKQAKgLASgBQASAAAHAPQAKgPATAAQAQAAAIAJQAHAJAAARIAAA+g");
	this.shape_17.setTransform(172.875,28.35);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgNAGgLQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALAKQgFAJgKAFQgKAEgLAAQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_18.setTransform(160.325,28.45);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgKAhIAAg1IgQAAIAAgQIAQAAIAAgXIAUAAIAAAXIARAAIAAAQIgRAAIAAA0QAAAFACACQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgbg");
	this.shape_19.setTransform(152.175,27.4);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgEQgEgFgJAAQgLAAgHAMIAABDIgVAAIAAhfIAUAAIABAMQAKgNAQgBQAeAAAAAjIAAA+g");
	this.shape_20.setTransform(139.9,28.35);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_21.setTransform(130.025,28.45);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgUA/QgLgFgFgHIAKgMQAKALAPAAQAJAAAHgFQAFgGAAgLIAAgHQgIALgPAAQgQAAgLgOQgLgNAAgXQAAgWALgNQAKgNASAAQAOAAAKALIABgJIATAAIAABbQAAATgLAKQgMALgTAAQgKAAgKgEgAgNgoQgHAIABAQQgBAPAHAHQAFAIAJAAQANAAAGgLIAAgpQgGgLgNAAQgJAAgFAJg");
	this.shape_22.setTransform(119.85,30.225);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAVAAIAAALQAHgNANAAQAFABADABIAAAUIgJgBQgPAAgDAMIAABAg");
	this.shape_23.setTransform(112.2,28.35);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgfAkQgMgNAAgXIAAAAQAAgOAFgLQAGgMAKgFQAKgHAMAAQATAAAMANQAMAMABAVIAAAEQAAAOgFALQgGALgKAGQgKAGgNAAQgTAAgMgNgAgQgXQgGAJAAAPQAAAOAGAJQAGAIAKAAQALAAAGgIQAGgJAAgPQAAgOgGgJQgHgIgKAAQgKAAgGAIg");
	this.shape_24.setTransform(103.525,28.45);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAUAAIAABfgAgIgtQgDgDAAgFQAAgFADgDQADgEAFAAQAGAAADAEQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_25.setTransform(91.6,26.65);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKALgQAAQgPAAgIgJg");
	this.shape_26.setTransform(84.275,28.55);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgJBEIAAiGIATAAIAACGg");
	this.shape_27.setTransform(77,26.45);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_28.setTransform(69.825,28.45);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgKBEIAAiGIAVAAIAACGg");
	this.shape_29.setTransform(62.65,26.45);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgNAGgLQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALAKQgFAJgKAFQgKAEgLAAQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_30.setTransform(55.625,28.45);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AArBAIAAgqIADg4IgmBiIgPAAIgmhiIACA4IAAAqIgWAAIAAh/IAdAAIAkBhIAlhhIAdAAIAAB/g");
	this.shape_31.setTransform(42.825,26.8);

	this.instance = new lib.dssd();
	this.instance.setTransform(132.35,42.05,1,1,0,0,0,-5.4,6.5);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.019,0,0,1.078,-126.8,-47)).s().p("Az0HVIAAupMAnpAAAIAAOpg");
	this.shape_32.setTransform(132.4,42);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_32},{t:this.instance},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop9G5, new cjs.Rectangle(-12.7,-20.4,290.2,124.9), null);


(lib.drop9G4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.dssd();
	this.instance.setTransform(128.4,34.35,1,1,0,0,0,-5.4,6.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgWIAAgCQAAgNAGgMQAFgLAKgGQAKgHALAAQAUAAAKANQALAMAAAXIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgMgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape.setTransform(242.025,48.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgTAtQgJgEgFgHQgFgIgBgIIAWAAQAAAHAFAEQAGAFAHAAQAIAAAFgEQAEgDAAgGQAAgFgFgDQgEgDgKgCQgLgCgHgEQgQgHAAgOQAAgNAKgIQALgJAPAAQARAAAKAJQALAIAAAOIgWAAQAAgGgFgEQgEgEgHgBQgHABgEADQgEADgBAFQAAAGAEACQAFADALADQANADAHAEQAIACADAGQADAFAAAHQABAOgLAHQgLAIgRAAQgLABgJgFg");
	this.shape_1.setTransform(232.4,48.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgHQAMgIAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_2.setTransform(222.925,48.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgeA3QgLgOAAgXQAAgUAKgOQALgOARAAQAOAAAJALIAAgxIAWAAIAACGIgUAAIgBgKQgJAMgPAAQgRAAgKgNgAgOgEQgFAIAAAQQAAAPAFAIQAGAIAJAAQANAAAGgMIAAgnQgGgMgNAAQgJAAgGAIg");
	this.shape_3.setTransform(212.775,47);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgEQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_4.setTransform(205.6,47.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgLAAgHAMIAABCIgWAAIAAhdIAVAAIABALQAKgOAQAAQAeABAAAhIAAA+g");
	this.shape_5.setTransform(198.3,48.8);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgfAkQgMgOAAgWIAAAAQAAgOAFgLQAGgLAKgHQAKgFAMgBQATAAAMANQAMAMABAVIAAAEQAAAOgFALQgGALgKAGQgKAHgNgBQgTAAgMgNgAgQgXQgGAIAAAQQAAAPAGAIQAGAIAKAAQALAAAGgIQAGgJAAgPQAAgPgGgIQgHgIgKAAQgKAAgGAIg");
	this.shape_6.setTransform(188.225,48.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAVAAIAAAKQAGgNAOAAQAFAAADACIgBAUIgIgBQgPAAgDAMIAAA/g");
	this.shape_7.setTransform(180.35,48.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgMIAAhCIAVAAIAABdIgUAAIAAgJQgKALgQAAQgPAAgIgJg");
	this.shape_8.setTransform(171.725,49);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgJBDIAAiGIAUAAIAACGg");
	this.shape_9.setTransform(164.45,46.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgHQAMgIAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_10.setTransform(157.275,48.9);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgiBBIAAgRIAEABQAIAAAEgDQAEgDADgHIADgIIgiheIAXAAIATBBIAUhBIAXAAIgmBtQgIAYgVAAIgKgCg");
	this.shape_11.setTransform(148.025,50.825);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AAdBAIAAg5Ig5AAIAAA5IgWAAIAAh/IAWAAIAAA1IA5AAIAAg1IAWAAIAAB/g");
	this.shape_12.setTransform(137.225,47.25);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgEQgEgFgJAAQgHAAgFAEQgFAEgBAHIAAA/IgVAAIAAg9QAAgRgRAAQgNAAgFAKIAABEIgVAAIAAhdIAUAAIAAAKQAKgNASAAQASAAAHAPQAKgPATAAQAQABAIAIQAHAJAAARIAAA9g");
	this.shape_13.setTransform(118.525,48.8);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgEQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_14.setTransform(108.4,47.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgmAvIAAgNIAwhAIgvAAIAAgQIBKAAIAAANIgwA/IAyAAIAAARg");
	this.shape_15.setTransform(101.675,48.9);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgLAAgHAMIAABCIgWAAIAAhdIAVAAIABALQAKgOAQAAQAeABAAAhIAAA+g");
	this.shape_16.setTransform(92.1,48.8);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgWIAAgCQAAgNAGgMQAFgLAKgGQAKgHALAAQAUAAAKANQALAMAAAXIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgMgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_17.setTransform(82.375,48.9);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AghBFIAyiJIARAAIgyCJg");
	this.shape_18.setTransform(69.225,47.8);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgLAAgHAMIAABCIgWAAIAAhdIAVAAIABALQAKgOAQAAQAeABAAAhIAAA+g");
	this.shape_19.setTransform(60.85,48.8);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgEQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_20.setTransform(53.55,47.1);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgeA3QgLgOAAgXQAAgUAKgOQALgOARAAQAOAAAJALIAAgxIAWAAIAACGIgUAAIgBgKQgJAMgPAAQgRAAgKgNgAgOgEQgFAIAAAQQAAAPAFAIQAGAIAJAAQANAAAGgMIAAgnQgGgMgNAAQgJAAgGAIg");
	this.shape_21.setTransform(45.975,47);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgMIAAhCIAVAAIAABdIgUAAIAAgJQgKALgQAAQgPAAgIgJg");
	this.shape_22.setTransform(36.075,49);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAUAAIABAKQAGgNAOAAQAFAAADACIgBAUIgIgBQgPAAgEAMIAAA/g");
	this.shape_23.setTransform(28.35,48.8);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgEQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_24.setTransform(22.45,47.1);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AASBDIAAg9QAAgJgFgDQgDgFgJAAQgLAAgHALIAABDIgWAAIAAiGIAWAAIAAAzQALgNAPAAQAeABAAAhIAAA+g");
	this.shape_25.setTransform(15.15,46.9);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABDIgWAAIAAhfIAVAAIABALQAKgNAQABQAegBABAjIAAA+g");
	this.shape_26.setTransform(222.85,23.2);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_27.setTransform(212.975,23.3);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AARBEIgbgqIgJAKIAAAgIgWAAIAAiGIAWAAIAABMIAGgIIAagdIAZAAIgjAnIAnA4g");
	this.shape_28.setTransform(203.975,21.3);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAUAAIABALQAGgMAPAAQAEgBADACIgBAUIgIgBQgOAAgFALIAABBg");
	this.shape_29.setTransform(195.95,23.2);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_30.setTransform(187.475,23.3);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKAMgQAAQgPAAgIgKg");
	this.shape_31.setTransform(177.575,23.4);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgJBEIAAiGIAUAAIAACGg");
	this.shape_32.setTransform(170.3,21.3);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_33.setTransform(163.275,23.3);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgUA/QgLgFgFgHIAKgMQALALAOAAQAJAAAHgFQAFgGAAgLIAAgHQgIALgPAAQgQAAgLgOQgLgNAAgXQAAgWALgNQAKgNASAAQAOAAAKALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgJgEgAgOgoQgFAIAAAQQAAAPAFAHQAGAIAJAAQAOAAAFgLIAAgpQgFgLgOAAQgJAAgGAJg");
	this.shape_34.setTransform(153.05,25.075);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgVAAIAAhfIAUAAIABALQAKgNAQABQAegBAAAjIAAA+g");
	this.shape_35.setTransform(143.15,23.2);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_36.setTransform(133.425,23.3);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AAuAxIAAg9QAAgJgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABBIgVAAIAAg+QAAgRgRAAQgNAAgFAKIAABFIgVAAIAAhfIAUAAIAAAKQAKgMASABQASAAAHAOQAKgOATAAQAQgBAIAKQAHAIAAARIAAA+g");
	this.shape_37.setTransform(120.675,23.2);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgDAAgGQAAgEADgEQADgDAFAAQAGAAADADQADAEAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_38.setTransform(106.05,21.5);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABDIgWAAIAAhfIAVAAIABALQAKgNAQABQAegBAAAjIAAA+g");
	this.shape_39.setTransform(98.75,23.2);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAVAAIAABfgAgIgtQgDgDAAgGQAAgEADgEQADgDAFAAQAGAAADADQADAEAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_40.setTransform(91.45,21.5);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgWAAIAAhfIAVAAIAAALQALgNAQABQAegBABAjIAAA+g");
	this.shape_41.setTransform(79.65,23.2);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_42.setTransform(69.775,23.3);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AAUAwIgUhBIgTBBIgSAAIgahfIAVAAIAPBAIAUhAIAPAAIAUBBIAPhBIAVAAIgaBfg");
	this.shape_43.setTransform(58.175,23.3);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_44.setTransform(46.775,23.3);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AAdBAIAAg5Ig5AAIAAA5IgWAAIAAh/IAWAAIAAA2IA5AAIAAg2IAWAAIAAB/g");
	this.shape_45.setTransform(35.425,21.65);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.165,0,0,1.218,-145,-53)).s().p("A2qISIAAwjMAtVAAAIAAQjg");
	this.shape_46.setTransform(130.75,39.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop9G4, new cjs.Rectangle(-16.6,-28.1,292.5,124.9), null);


(lib.drop9G3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AARBEIgbgpIgJAJIAAAgIgWAAIAAiGIAWAAIAABMIAGgIIAagdIAZAAIgjAnIAnA4g");
	this.shape.setTransform(166.925,56.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_1.setTransform(159.35,56.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAFACADQACACAGAAIAHgBIAAARQgHACgHAAQgXAAAAgcg");
	this.shape_2.setTransform(153.825,57.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgNAGgMQAFgLAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAIIg9AAQABAMAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_3.setTransform(146.325,58.3);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAFACADQACACAGAAIAHgBIAAARQgHACgHAAQgXAAAAgcg");
	this.shape_4.setTransform(138.175,57.25);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgTAtQgJgEgFgIQgFgHgBgJIAWAAQAAAIAFAEQAGAEAHAAQAIAAAFgDQAEgDAAgFQAAgGgFgDQgEgDgKgDQgLgCgHgDQgQgHAAgOQAAgNAKgIQALgIAPAAQARAAAKAIQAKAJABANIgWAAQAAgGgFgEQgEgFgHABQgHAAgEADQgEADgBAGQABAEADADQAFADALADQANADAHADQAIADADAFQADAGAAAIQABAMgLAJQgLAHgRABQgLgBgJgEg");
	this.shape_5.setTransform(130.7,58.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgNAGgMQAFgLAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAIIg9AAQABAMAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_6.setTransform(121.375,58.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABDIgWAAIAAhfIAVAAIABALQAKgNAQABQAegBAAAjIAAA+g");
	this.shape_7.setTransform(111.45,58.2);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgIAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAJAAAOIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_8.setTransform(101.575,58.3);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAFACADQACACAGAAIAHgBIAAARQgHACgHAAQgXAAAAgcg");
	this.shape_9.setTransform(88.975,57.25);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgIAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAJAAAOIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_10.setTransform(81.325,58.3);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgmAwIAAgPIAwg+IgvAAIAAgSIBKAAIAAAOIgwBAIAyAAIAAARg");
	this.shape_11.setTransform(72.025,58.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABCIgWAAIAAhdIAVAAIAAALQALgOAQAAQAeABABAhIAAA+g");
	this.shape_12.setTransform(213.65,32.6);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgHQAMgIAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_13.setTransform(203.775,32.7);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAKIAAAeIgWAAIAAiGIAWAAIAABOIAGgJIAagcIAZAAIgjAmIAnA3g");
	this.shape_14.setTransform(194.775,30.7);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAVAAIAAAKQAGgNAOAAQAFAAADACIgBAUIgIgBQgPAAgEAMIAAA/g");
	this.shape_15.setTransform(186.75,32.6);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgHQAMgIAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_16.setTransform(178.275,32.7);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgMIAAhCIAVAAIAABdIgUAAIAAgJQgKALgQAAQgPAAgIgJg");
	this.shape_17.setTransform(168.375,32.8);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgKBDIAAiGIAVAAIAACGg");
	this.shape_18.setTransform(161.1,30.7);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgWIAAgCQAAgNAGgMQAFgLAKgGQAKgHALAAQAUAAAKANQALAMAAAXIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgMgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_19.setTransform(154.075,32.7);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgVA/QgJgFgFgHIAKgMQAKALAOAAQAKAAAFgFQAHgGgBgLIAAgHQgJALgOAAQgQAAgLgOQgLgNAAgXQAAgWAKgNQALgNARAAQAQAAAJALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgKgEgAgOgoQgFAIAAAQQAAAPAFAHQAGAIAJAAQAOAAAFgLIAAgpQgFgLgOAAQgJAAgGAJg");
	this.shape_20.setTransform(143.85,34.475);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgLAAgHAMIAABCIgWAAIAAhdIAVAAIABALQAKgOAQAAQAeABAAAhIAAA+g");
	this.shape_21.setTransform(133.95,32.6);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgWIAAgCQAAgNAGgMQAFgLAKgGQAKgHALAAQAUAAAKANQALAMAAAXIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgMgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_22.setTransform(124.225,32.7);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgEQgEgFgJAAQgHAAgFAEQgFAEgBAHIAAA/IgVAAIAAg9QAAgRgRAAQgNAAgFAKIAABEIgVAAIAAhdIAUAAIAAAKQAKgNASAAQASAAAHAPQAKgPATAAQAQABAIAIQAHAJAAARIAAA9g");
	this.shape_23.setTransform(111.475,32.6);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgEQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_24.setTransform(96.85,30.9);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABCIgWAAIAAhdIAVAAIAAALQALgOAQAAQAeABABAhIAAA+g");
	this.shape_25.setTransform(89.55,32.6);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgEQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_26.setTransform(82.25,30.9);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABCIgVAAIAAhdIAUAAIAAALQALgOAQAAQAeABABAhIAAA+g");
	this.shape_27.setTransform(70.45,32.6);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgHQAMgIAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_28.setTransform(60.575,32.7);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AAUAvIgUhAIgTBAIgSAAIgahdIAVAAIAPBAIAUhAIAPAAIAUBAIAPhAIAVAAIgaBdg");
	this.shape_29.setTransform(48.975,32.7);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgWIAAgCQAAgNAGgMQAFgLAKgGQAKgHALAAQAUAAAKANQALAMAAAXIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgMgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_30.setTransform(37.575,32.7);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AAdBAIAAg5Ig5AAIAAA5IgWAAIAAh/IAWAAIAAA1IA5AAIAAg1IAWAAIAAB/g");
	this.shape_31.setTransform(26.225,31.05);

	this.instance = new lib.dssd();
	this.instance.setTransform(119.2,46.3,1,1,0,0,0,-5.4,6.5);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.165,0,0,1.218,-145,-53)).s().p("A2qISIAAwjMAtVAAAIAAQjg");
	this.shape_32.setTransform(119.25,46.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_32},{t:this.instance},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop9G3, new cjs.Rectangle(-25.8,-16.2,290.2,124.9), null);


(lib.drop9G2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AASBEIAAg+QAAgIgFgFQgDgEgJAAQgLAAgHALIAABEIgWAAIAAiGIAWAAIAAAyQAKgMAQAAQAegBAAAjIAAA+g");
	this.shape.setTransform(204.5,61.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgLIAAhDIAVAAIAABeIgUAAIAAgKQgKAMgQAAQgPAAgIgKg");
	this.shape_1.setTransform(194.475,63.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgUA4IgCALIgTAAIAAiGIAWAAIAAAwQAJgLAOABQASgBAKANQAKAOAAAVIAAACQAAAWgKANQgKAOgRAAQgQAAgJgNgAgTAAIAAAmQAFANAOAAQAJAAAGgHQAFgIAAgPIAAgDQAAgPgFgHQgGgIgJAAQgOAAgFAMg");
	this.shape_2.setTransform(184.625,61.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgLIAAhDIAVAAIAABeIgUAAIAAgKQgKAMgQAAQgPAAgIgKg");
	this.shape_3.setTransform(174.325,63.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAFACACQACADAGAAIAHgBIAAARQgHACgHAAQgXAAAAgcg");
	this.shape_4.setTransform(166.125,62.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgYAxIAAheIAUAAIABAKQAHgMAOAAQAEgBADACIAAAUIgJgBQgPAAgDALIAABBg");
	this.shape_5.setTransform(156.1,63.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgfAkQgMgOAAgWIAAAAQAAgOAFgLQAGgLAKgHQAKgFAMAAQATAAAMAMQAMANABAUIAAAEQAAAOgFALQgGALgKAGQgKAGgNABQgTAAgMgOgAgQgXQgGAJAAAPQAAAPAGAIQAGAIAKAAQALAAAGgIQAGgIAAgQQAAgOgGgJQgHgIgKAAQgKAAgGAIg");
	this.shape_6.setTransform(147.425,63.7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgJBCIAAheIATAAIAABegAgIgtQgDgEAAgFQAAgEADgEQADgDAFAAQAGAAADADQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_7.setTransform(140,61.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgYAxIAAheIAUAAIABAKQAHgMAOAAQAEgBADACIAAAUIgJgBQgPAAgDALIAABBg");
	this.shape_8.setTransform(134.95,63.6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgNAGgMQAFgLAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_9.setTransform(126.625,63.7);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAFACACQACADAGAAIAHgBIAAARQgHACgHAAQgXAAAAgcg");
	this.shape_10.setTransform(118.475,62.65);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgTAtQgJgEgGgIQgEgHgBgJIAWAAQAAAIAFAEQAFAEAIAAQAJAAAEgDQAEgDAAgFQAAgGgFgDQgEgDgKgDQgLgCgHgDQgQgHAAgPQAAgMAKgIQALgIAPAAQARAAAKAIQAKAJAAANIgVAAQAAgGgFgEQgEgFgHABQgHAAgEADQgEADgBAGQAAAEAFADQAEADALADQANADAHADQAIADADAFQAEAGgBAIQABAMgMAJQgKAHgRABQgLgBgJgEg");
	this.shape_11.setTransform(111,63.7);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgfAkQgMgOAAgWIAAAAQAAgOAFgLQAGgLAKgHQAKgFAMAAQATAAAMAMQAMANABAUIAAAEQAAAOgFALQgGALgKAGQgKAGgNABQgTAAgMgOgAgQgXQgGAJAAAPQAAAPAGAIQAGAIAKAAQALAAAGgIQAGgIAAgQQAAgOgGgJQgHgIgKAAQgKAAgGAIg");
	this.shape_12.setTransform(101.325,63.7);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgpBDIAAiDIAUAAIABAKQAKgMAOAAQASAAAKANQAKANAAAXIAAACQAAAVgLANQgJANgRAAQgPAAgJgKIAAAtgAgTglIAAApQAGALANAAQAJAAAGgIQAFgHAAgRQABgOgGgJQgGgIgJAAQgNAAgGALg");
	this.shape_13.setTransform(91.3,65.425);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgVAAIAAheIAUAAIAAAKQALgNAQABQAegBAAAjIAAA+g");
	this.shape_14.setTransform(76.55,63.6);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgHQAMgJAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAJAAAOIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_15.setTransform(66.675,63.7);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgeA3QgLgOAAgXQAAgVAKgNQALgNARAAQAOAAAJAKIAAgwIAWAAIAACGIgUAAIgBgLQgJAMgPABQgRAAgKgOgAgOgDQgFAGAAARQAAAPAFAIQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAJg");
	this.shape_16.setTransform(56.525,61.8);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAUAAIABAKQAGgNAPAAQAEAAADACIAAAUIgJgBQgOAAgFAMIAAA/g");
	this.shape_17.setTransform(224.4,38);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgfAkQgMgOAAgWIAAAAQAAgOAFgLQAGgLAKgGQAKgGAMgBQATAAAMANQAMAMABAVIAAAEQAAAOgFALQgGALgKAGQgKAHgNgBQgTAAgMgNgAgQgXQgGAIAAAQQAAAPAGAIQAGAIAKAAQALAAAGgIQAGgJAAgPQAAgPgGgIQgHgIgKAAQgKAAgGAIg");
	this.shape_18.setTransform(215.725,38.1);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgEQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_19.setTransform(208.3,36.3);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAUAAIABAKQAGgNAPAAQAEAAADACIAAAUIgJgBQgOAAgFAMIAAA/g");
	this.shape_20.setTransform(203.25,38);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgWIAAgCQAAgNAGgMQAFgLAKgGQAKgHALAAQAUAAAKANQALAMAAAXIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgMgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_21.setTransform(194.925,38.1);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgKAhIAAg1IgQAAIAAgQIAQAAIAAgXIAUAAIAAAXIARAAIAAAQIgRAAIAAA0QAAAFACADQACACAGAAIAHgBIAAARQgHACgHAAQgXAAAAgbg");
	this.shape_22.setTransform(186.775,37.05);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABCIgVAAIAAhdIAUAAIAAALQALgOAQAAQAeABABAhIAAA+g");
	this.shape_23.setTransform(179,38);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgHQAMgIAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_24.setTransform(169.125,38.1);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgLAAgHAMIAABCIgVAAIAAhdIAUAAIABALQAKgOAQAAQAeABAAAhIAAA+g");
	this.shape_25.setTransform(154.75,38);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgHQAMgIAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_26.setTransform(144.875,38.1);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgEQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_27.setTransform(137.7,36.3);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgUA/QgLgFgFgHIAKgMQALALAOAAQAJAAAHgFQAFgGAAgLIAAgHQgIALgPAAQgQAAgLgOQgLgNAAgXQAAgWALgNQAKgNASAAQAOAAAKALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgJgEgAgOgoQgFAIAAAQQAAAPAFAHQAGAIAJAAQAOAAAFgLIAAgpQgFgLgOAAQgJAAgGAJg");
	this.shape_28.setTransform(130.1,39.875);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgHQAMgIAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_29.setTransform(120.325,38.1);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgUA4IgCAKIgTAAIAAiGIAWAAIAAAyQAJgMAOAAQASAAAKAOQAKANAAAWIAAABQAAAWgKANQgKANgRAAQgQAAgJgMgAgTAAIAAAmQAFANAOAAQAJAAAGgHQAFgIAAgPIAAgDQAAgQgFgGQgGgIgJAAQgOAAgFAMg");
	this.shape_30.setTransform(110.575,36.2);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgXBQQANgKAIgVQAGgVAAgaIAAgCQAAgYgFgUQgHgVgNgLIgCgDIAEgMQALAFAKAOQAKAPAGARQAGARAAASIAAAGQAAATgFATQgFARgLAPQgKAPgMAGg");
	this.shape_31.setTransform(97.225,37.7);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAVAAIAAAKQAGgNAOAAQAFAAADACIgBAUIgIgBQgPAAgEAMIAAA/g");
	this.shape_32.setTransform(91.7,38);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgWIAAgCQAAgNAGgMQAFgLAKgGQAKgHALAAQAUAAAKANQALAMAAAXIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgMgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_33.setTransform(83.375,38.1);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAKIAAAeIgWAAIAAiGIAWAAIAABOIAGgJIAagcIAZAAIgjAmIAnA3g");
	this.shape_34.setTransform(74.325,36.1);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgdAlQgLgNAAgXIAAgBQAAgWALgNQAMgOATAAQARABALAJQALAKAAAQIgUAAQAAgHgGgGQgFgFgIAAQgJAAgGAHQgGAIAAAPIAAADQAAAPAGAIQAGAHAJAAQAIAAAFgEQAGgFAAgHIAUAAQAAAJgFAHQgGAJgJAEQgJAFgJgBQgUAAgMgMg");
	this.shape_35.setTransform(64.45,38.1);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgMIAAhCIAVAAIAABdIgUAAIAAgJQgKALgQAAQgPAAgIgJg");
	this.shape_36.setTransform(54.625,38.2);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgTAtQgJgEgGgHQgEgIAAgIIAVAAQAAAHAFAEQAFAFAIAAQAJAAAEgEQAEgDAAgGQAAgFgFgDQgEgDgKgCQgLgCgHgEQgQgHAAgOQAAgNAKgIQAKgJAPAAQARAAALAJQAKAIAAAOIgVAAQAAgGgFgEQgEgEgIgBQgFABgFADQgEADgBAFQAAAGAFACQAEADAMADQAMADAHAEQAIACADAGQAEAFgBAHQAAAOgLAHQgKAIgRAAQgLABgJgFg");
	this.shape_37.setTransform(44.95,38.1);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgCBIQgKgPgGgRQgFgTAAgVQAAgUAFgSQAGgTAKgOQAKgOAMgGIAEANQgMAJgIAUQgHASAAAaIgBAGQAAAaAHAWQAHAVAOAKIgEAMQgMgFgKgPg");
	this.shape_38.setTransform(37.575,37.7);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgoBDIAAiDIATAAIABAKQAJgMAQAAQARAAAKANQAKANAAAXIAAACQgBAVgJANQgLANgQAAQgPAAgJgKIAAAtgAgTglIAAApQAGALAMAAQAKAAAGgIQAFgHAAgRQABgOgGgJQgGgIgKAAQgMAAgGALg");
	this.shape_39.setTransform(221.55,14.225);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_40.setTransform(211.425,12.5);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgTAtQgJgEgGgIQgEgHAAgJIAUAAQABAIAFAEQAGAEAHAAQAJAAAEgDQAEgDAAgFQAAgGgEgDQgFgDgKgDQgLgCgHgDQgQgHAAgPQAAgMAKgIQALgIAOAAQASAAAKAIQALAJAAANIgWAAQAAgGgEgEQgFgFgIABQgFgBgFAEQgFADABAFQAAAFADADQAFADAMADQAMACAHAEQAIADADAFQAEAGAAAIQAAAMgMAIQgKAJgRAAQgLgBgJgEg");
	this.shape_41.setTransform(201.85,12.5);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAVAAIAABfgAgIgtQgDgDAAgGQAAgEADgEQADgDAFAAQAGAAADADQADAEAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_42.setTransform(194.95,10.7);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AASBEIAAg+QAAgIgEgFQgEgEgJAAQgMAAgGALIAABEIgWAAIAAiGIAWAAIAAAyQALgMAOAAQAfgBABAjIAAA+g");
	this.shape_43.setTransform(187.65,10.5);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgUA/QgLgFgFgHIAKgMQALALAOAAQAJAAAHgFQAFgGAAgLIAAgHQgIALgPAAQgQAAgLgOQgLgNAAgXQAAgWALgNQAKgNASAAQAOAAAKALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgJgEgAgOgoQgFAIAAAQQAAAPAFAHQAGAIAJAAQAOAAAFgLIAAgpQgFgLgOAAQgJAAgGAJg");
	this.shape_44.setTransform(177.35,14.275);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgVAAIAAhfIAUAAIAAALQALgNAQABQAegBAAAjIAAA+g");
	this.shape_45.setTransform(167.45,12.4);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_46.setTransform(157.725,12.5);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AgpBDIAAiDIAUAAIABAKQAKgMAOAAQASAAAKANQAKANgBAXIAAACQAAAVgKANQgJANgRAAQgPAAgJgKIAAAtgAgTglIAAApQAGALANAAQAJAAAFgIQAHgHgBgRQAAgOgFgJQgGgIgJAAQgNAAgGALg");
	this.shape_47.setTransform(147.9,14.225);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAFACACQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgcg");
	this.shape_48.setTransform(134.925,11.45);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_49.setTransform(127.275,12.5);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgJBEIAAiGIATAAIAACGg");
	this.shape_50.setTransform(120.1,10.5);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_51.setTransform(112.925,12.5);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAVAAIAABfgAgIgtQgDgDAAgGQAAgEADgEQADgDAFAAQAGAAADADQADAEAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_52.setTransform(101.25,10.7);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AARBEIgbgqIgJAKIAAAgIgWAAIAAiGIAWAAIAABMIAGgIIAagdIAZAAIgjAnIAnA4g");
	this.shape_53.setTransform(94.825,10.5);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgDAAgGQAAgEADgEQADgDAFAAQAGAAADADQADAEAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_54.setTransform(87.25,10.7);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgJBEIAAiGIATAAIAACGg");
	this.shape_55.setTransform(82.65,10.5);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AgJBCIAAhfIAUAAIAABfgAgIgtQgDgDAAgGQAAgEADgEQADgDAFAAQAGAAADADQADAEAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_56.setTransform(78.05,10.7);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AAuAxIAAg9QAAgJgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABBIgVAAIAAg+QAAgRgRAAQgNAAgFAKIAABFIgVAAIAAhfIAUAAIAAAKQAKgMASABQASAAAHAOQAKgOATAAQAQgBAIAKQAHAIAAARIAAA+g");
	this.shape_57.setTransform(67.925,12.4);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_58.setTransform(55.375,12.5);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AArBAIAAgqIADg4IgmBiIgPAAIgmhiIACA4IAAAqIgWAAIAAh/IAdAAIAkBhIAlhhIAdAAIAAB/g");
	this.shape_59.setTransform(42.575,10.85);

	this.instance = new lib.dssd();
	this.instance.setTransform(130.55,41.2,1,1,0,0,0,-5.4,6.5);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.165,0,0,1.435,-145,-62.5)).s().p("A2qJwIAAzgMAtVAAAIAATgg");
	this.shape_60.setTransform(130.6,41.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_60},{t:this.instance},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop9G2, new cjs.Rectangle(-14.5,-21.3,290.2,124.89999999999999), null);


(lib.drop9G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape.setTransform(157.175,56.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAFACACQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgcg");
	this.shape_1.setTransform(149.075,55.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_2.setTransform(141.575,56.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgTAtQgJgEgFgIQgGgHAAgJIAWAAQAAAIAFAEQAGAEAHAAQAIAAAFgDQAEgDAAgFQAAgGgFgDQgEgDgKgDQgLgCgHgDQgQgHAAgPQAAgMAKgIQAKgIAQAAQAQAAALAIQALAJAAANIgWAAQAAgGgFgEQgEgFgHABQgHgBgEAEQgEADAAAFQAAAFADADQAFADALADQANACAHAEQAHADAEAFQADAGAAAIQABAMgLAIQgLAJgRAAQgLgBgJgEg");
	this.shape_3.setTransform(131.95,56.15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABDIgVAAIAAhfIAUAAIABALQAKgNAQABQAegBAAAjIAAA+g");
	this.shape_4.setTransform(117.85,56.05);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_5.setTransform(107.975,56.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgVAKgNQALgNARAAQAOAAAJAKIAAgwIAWAAIAACGIgUAAIgBgKQgJALgPABQgRAAgKgOgAgOgDQgFAGAAARQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAJg");
	this.shape_6.setTransform(97.825,54.25);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAOIAAArQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_7.setTransform(224.325,30.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_8.setTransform(217.15,28.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgeA3QgLgOAAgXQAAgUAKgOQALgOARAAQAOAAAJALIAAgxIAWAAIAACGIgUAAIgBgKQgJAMgPAAQgRAAgKgNgAgOgEQgFAHAAARQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgnQgGgMgNAAQgJAAgGAIg");
	this.shape_9.setTransform(209.575,28.65);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgfAkQgMgOAAgWIAAAAQAAgOAFgLQAGgLAKgHQAKgFAMgBQATAAAMANQAMAMABAVIAAAEQAAAOgFALQgGALgKAGQgKAHgNgBQgTAAgMgNgAgQgXQgGAIAAAQQAAAOAGAJQAGAIAKAAQALAAAGgIQAGgIAAgQQAAgPgGgIQgHgIgKAAQgKAAgGAIg");
	this.shape_10.setTransform(199.625,30.55);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgoBDIAAiDIATAAIABAKQAJgMAQAAQARAAAKANQAKANAAAXIAAACQgBAVgJANQgLANgQAAQgPAAgJgKIAAAtgAgTglIAAApQAGALAMAAQAKAAAGgIQAFgHAAgRQABgOgGgJQgGgIgKAAQgMAAgGALg");
	this.shape_11.setTransform(189.6,32.275);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAOIAAArQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_12.setTransform(179.475,30.55);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAUAAIABAKQAHgNAOAAQAEAAADACIAAAUIgJgBQgPAAgDALIAABAg");
	this.shape_13.setTransform(171.85,30.45);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAOIAAArQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_14.setTransform(163.375,30.55);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgoBDIAAiDIATAAIABAKQAJgMAQAAQARAAAKANQAKANAAAXIAAACQgBAVgJANQgLANgQAAQgPAAgJgKIAAAtgAgTglIAAApQAGALAMAAQAKAAAGgIQAFgHAAgRQABgOgGgJQgGgIgKAAQgMAAgGALg");
	this.shape_15.setTransform(153.6,32.275);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_16.setTransform(141.55,28.75);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAKIAAAeIgWAAIAAiGIAWAAIAABOIAGgJIAagcIAZAAIgjAmIAnA3g");
	this.shape_17.setTransform(135.125,28.55);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgJBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_18.setTransform(127.55,28.75);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgKBDIAAiGIAVAAIAACGg");
	this.shape_19.setTransform(122.95,28.55);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_20.setTransform(118.35,28.75);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgEQgEgFgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgNASAAQASAAAHAPQAKgPATAAQAQABAIAIQAHAJAAARIAAA9g");
	this.shape_21.setTransform(108.225,30.45);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALAAQAUAAAKANQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgMgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_22.setTransform(95.675,30.55);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgEQgEgFgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgNASAAQASAAAHAPQAKgPATAAQAQABAIAIQAHAJAAARIAAA9g");
	this.shape_23.setTransform(82.925,30.45);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAKIAAAeIgWAAIAAiGIAWAAIAABOIAGgJIAagcIAZAAIgjAmIAnA3g");
	this.shape_24.setTransform(66.475,28.55);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAOIAAArQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_25.setTransform(56.325,30.55);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgeA3QgLgOAAgXQAAgUAKgOQALgOARAAQAOAAAJALIAAgxIAWAAIAACGIgUAAIgBgKQgJAMgPAAQgRAAgKgNgAgOgEQgFAHAAARQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgnQgGgMgNAAQgJAAgGAIg");
	this.shape_26.setTransform(46.175,28.65);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_27.setTransform(39,28.75);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgKBAIAAhtIgoAAIAAgSIBlAAIAAASIgoAAIAABtg");
	this.shape_28.setTransform(31.225,28.9);

	this.instance = new lib.dssd();
	this.instance.setTransform(127.45,44.15,1,1,0,0,0,-5.4,6.5);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.176,0,0,1.048,-146.5,-45.6)).s().p("A24HIIAAuPMAtxAAAIAAOPg");
	this.shape_29.setTransform(127.525,44.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_29},{t:this.instance},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop9G1, new cjs.Rectangle(-18.9,-18.3,292.9,124.89999999999999), null);


(lib.btnEit_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance_1 = new lib.Path();
	this.instance_1.setTransform(191.55,128,1,1,0,0,0,64,128);
	this.instance_1.alpha = 0.1602;
	this.instance_1.compositeOperation = "multiply";

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EE3338").s().p("Ap7lMIEvkvIPIPIIkwEvg");
	this.shape_4.setTransform(127.95,127.95);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EE3338").s().p("Ap7FNIPHvIIEwEvIvIPIg");
	this.shape_5.setTransform(127.95,127.95);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AmcPQQi+hQiSiTQiSiThRi+QhTjFAAjXQAAjWBTjGQBRi+CSiSQCSiSC+hRQDGhTDWAAQDXAADFBTQC+BRCTCSQCTCSBQC+QBTDGAADWQAADXhTDFQhQC+iTCTQiTCTi+BQQjFBTjXAAQjWAAjGhTg");
	this.shape_6.setTransform(127.95,127.95);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#EE3338").s().p("AnxSbQjmhhiwixQiyixhhjmQhljuAAkEQAAkDBljuQBhjmCyiwQCwiyDmhhQDuhlEDAAQEEAADuBlQDmBhCxCyQCxCwBhDmQBkDtAAEEQAAEEhkDuQhhDmixCxQixCxjmBhQjuBkkEAAQkEAAjthkg");
	this.shape_7.setTransform(127.95,127.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.instance_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.btnEit_1, new cjs.Rectangle(0,0,255.9,255.9), null);


(lib.bg5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		var root1 = this;
		var pieces1 = root1.pieces1;
		var slots1 = root1.slots1;
		var restart1 = root1.restart1;
		var winMessage1 = root1.winMessage1;
		var Score1 = root1.Score1;
		var positions2 = [];
		
		root1.stop();
		
		// root1.btnMenuDasar1.on("click", function () {
		//   window.location.replace("../menu/index.html");
		// });
		
		// root1.btnNextDasar1.on("click", function () {
		//   window.location.replace("../game12/index.html");
		// });
		
		// root1.btnBack3.on("click", function () {
		//   window.location.replace("../game10/index.html");
		// });
		
		//#34495e
		
		// root1.pGam1.gotoAndStop(0);
		
		// root1.pieces1.laut.on("dblclick", function () {
		//   root1.pGam1.gotoAndPlay(0);
		// });
		
		// root1.pp3.gotoAndStop(0);
		
		// root1.pieces1.tana.on("dblclick", function () {
		//   root1.pp3.gotoAndPlay(0);
		// });
		
		// root1.pp4.gotoAndStop(0);
		
		// root1.pieces1.tana1.on("dblclick", function () {
		//   root1.pp4.gotoAndPlay(0);
		// });
		
		// root1.pp5.gotoAndStop(0);
		
		// root1.pieces1.laut1.on("dblclick", function () {
		//   root1.pp5.gotoAndPlay(0);
		// });
		
		// root1.pp6.gotoAndStop(0);
		
		// root1.pieces1.laut2.on("dblclick", function () {
		//   root1.pp6.gotoAndPlay(0);
		// });
		
		// root1.pp7.gotoAndStop(0);
		
		// root1.pieces1.laut3.on("dblclick", function () {
		//   root1.pp7.gotoAndPlay(0);
		// });
		
		// root1.pp8.gotoAndStop(0);
		
		// root1.pieces1.laut4.on("dblclick", function () {
		//   root1.pp8.gotoAndPlay(0);
		// });
		
		// root1.pp9.gotoAndStop(0);
		
		// root1.pieces1.laut5.on("dblclick", function () {
		//   root1.pp9.gotoAndPlay(0);
		// });
		
		// root1.pp10.gotoAndStop(0);
		
		// root1.pieces1.laut6.on("dblclick", function () {
		//   root1.pp10.gotoAndPlay(0);
		// });
		
		// root1.pp11.gotoAndStop(0);
		
		// root1.pieces1.laut7.on("dblclick", function () {
		//   root1.pp11.gotoAndPlay(0);
		// });
		
		// root1.popUpInfo.gotoAndStop(0);
		
		// root1.btnInfo.on("click", function () {
		//   root1.popUpInfo.gotoAndPlay(0);
		// });
		
		root1.setup = function () {
		  document.body.style.backgroundColor = lib.properties.color;
		  createjs.Touch.enable(stage);
		  stage.mouseMoveOutside = true;
		  root1.drawStart = stage.on("drawstart", root1.start, null, true);
		};
		
		root1.start = function (e) {
		  stage.off("drawstart", root1.drawStart);
		  winMessage1.originalY = winMessage1.y;
		  pieces1.children.forEach(function (child, index) {
		    positions2[index] = { x: child.x, y: child.y };
		  });
		
		  slots1.children.forEach(function (child, index) {
		    child.mouseChildren = false;
		  });
		
		  root1.restart1Handler(null);
		  restart1.on("click", root1.restart1Handler);
		  pieces1.on("mousedown", root1.mouseDownHandler);
		};
		
		root1.restart1Handler = function (e) {
		  pieces1.skor = 0;
		  pieces1.count = 0;
		  winMessage1.text = "";
		  root1.shuffle();
		};
		
		root1.mouseDownHandler = function (e) {
		  winMessage1.text = "Ayo, Letakkan pada kotak yang sesuai!";
		  winMessage1.alpha = 0;
		  winMessage1.y = winMessage1.originalY + 60;
		  createjs.Tween.get(winMessage1).to(
		    { alpha: 1, y: winMessage1.originalY },
		    500,
		    createjs.Ease.backInOut
		  );
		  e.currentTarget.setChildIndex(e.target, e.currentTarget.children.length - 1);
		  e.target.offsetX = e.stageX / stage.scaleX - e.target.x;
		  e.target.offsetY = e.stageY / stage.scaleY - e.target.y;
		  pieces1.target = e.target;
		  root1.stageMouseMove = stage.on(
		    "stagemousemove",
		    root1.stageMouseMoveHandler
		  );
		  root1.stageMouseUp = stage.on("stagemouseup", root1.stageMouseUpHandler);
		};
		
		root1.stageMouseMoveHandler = function (e) {
		  if (pieces1.target) {
		    pieces1.target.x = e.stageX / stage.scaleX - pieces1.target.offsetX;
		    pieces1.target.y = e.stageY / stage.scaleY - pieces1.target.offsetY;
		  }
		};
		
		root1.stageMouseUpHandler = function (e) {
		  stage.off("stagemousemove", root1.stageMouseMove);
		  stage.off("stagemouseup", root1.stageMouseUp);
		
		  if (pieces1.target) {
		    root1.check();
		    pieces1.target = null;
		  }
		};
		
		root1.shuffle = function () {
		  Score1.text = "score1";
		  positions2.sort(function (a, b) {
		    return 0.5 - Math.random();
		  });
		  console.log(pieces1);
		  console.log(pieces1.children);
		  pieces1.children.forEach(function (child, index) {
		    child.originalX = positions2[index].x;
		    child.originalY = positions2[index].y;
		    child.mouseEnabled = true;
		    createjs.Tween.get(child).to(
		      { x: child.originalX, y: child.originalY },
		      350,
		      createjs.Ease.backInOut
		    );
		  });
		};
		
		root1.check = function () {
		  var spot = slots1.getObjectUnderPoint(pieces1.target.x, pieces1.target.y);
		
		  if (!spot) {
		    root1.onMiss();
		    return;
		  }
		
		  root1.slot = spot.parent;
		
		  if (root1.slot) {
		    console.log(root1.slot.name, pieces1.target.name);
		    if (
		      pieces1.target.name.substring(0, 4) === root1.slot.name.substring(0, 4)
		    ) {
		      root1.letakin();
		      root1.onMatch();
		    } else {
		      root1.letakin();
		      root1.salahJawab();
		    }
		    if (pieces1.count === pieces1.children.length) root1.onWin();
		
		    root1.slot = null;
		  } else root1.onMiss();
		};
		
		root1.letakin = function () {
		  pieces1.target.mouseEnabled = false;
		  pieces1.count++;
		  createjs.Tween.get(pieces1.target).to(
		    { x: root1.slots1.kotakKartu2.x, y: root1.slots1.kotakKartu2.y },
		    350,
		    createjs.Ease.backInOut
		  );
		};
		
		root1.salahJawab = function () {
		  winMessage1.text = "Hemm, sepertinya Tebakan Anda Salah";
		  winMessage1.alpha = 0;
		  winMessage1.y = winMessage1.originalY + 60;
		  createjs.Tween.get(winMessage1).to(
		    { alpha: 1, y: winMessage1.originalY },
		    500,
		    createjs.Ease.backInOut
		  );
		};
		
		root1.onMatch = function () {
		  winMessage1.text = "Selamat! Tebakan Anda Benar!";
		  pieces1.skor++;
		  Score1.text = pieces1.skor * 50;
		  winMessage1.alpha = 0;
		  winMessage1.y = winMessage1.originalY + 60;
		  createjs.Tween.get(winMessage1).to(
		    { alpha: 1, y: winMessage1.originalY },
		    500,
		    createjs.Ease.backInOut
		  );
		};
		
		root1.onWin = function () {
		  winMessage1.text = "Yey!, Anda Berhasil Menyelesaikan Tantangan. Selamat!";
		  winMessage1.alpha = 0;
		  winMessage1.y = winMessage1.originalY + 60;
		  createjs.Tween.get(winMessage1).to(
		    { alpha: 1, y: winMessage1.originalY },
		    500,
		    createjs.Ease.backInOut
		  );
		};
		
		root1.onMiss = function () {
		  createjs.Tween.get(pieces1.target).to(
		    { x: pieces1.target.originalX, y: pieces1.target.originalY },
		    350,
		    createjs.Ease.backInOut
		  );
		  winMessage1.text = "Silahkan letakkan pada kotak yang sesuai ya..";
		  winMessage1.alpha = 0;
		  winMessage1.y = winMessage1.originalY + 60;
		  createjs.Tween.get(winMessage1).to(
		    { alpha: 1, y: winMessage1.originalY },
		    500,
		    createjs.Ease.backInOut
		  );
		};
		
		root1.setup();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// Layer_1
	this.drag2G1 = new lib.drag7G8();
	this.drag2G1.name = "drag2G1";
	this.drag2G1.setTransform(-12.8,-14.2,0.8086,0.8086,0,0,0,98.2,14.3);
	new cjs.ButtonHelper(this.drag2G1, 0, 1, 1);

	this.restart1 = new lib.Restart();
	this.restart1.name = "restart1";
	this.restart1.setTransform(88.65,-13.95,0.5444,0.5444,0,0,0,0.1,0);
	new cjs.ButtonHelper(this.restart1, 0, 1, 2, false, new lib.Restart(), 3);

	this.winMessage1 = new cjs.Text("Sepertinya Tebakan Anda Salah, Silahkan Coba Lagi", "12px 'Roboto'", "#FFFFFF");
	this.winMessage1.name = "winMessage1";
	this.winMessage1.textAlign = "center";
	this.winMessage1.lineHeight = 16;
	this.winMessage1.lineWidth = 277;
	this.winMessage1.parent = this;
	this.winMessage1.setTransform(48.7,14.2);

	this.Score1 = new cjs.Text("score", "12px 'Roboto'", "#FFFFFF");
	this.Score1.name = "Score1";
	this.Score1.textAlign = "center";
	this.Score1.lineHeight = 18;
	this.Score1.lineWidth = 31;
	this.Score1.parent = this;
	this.Score1.setTransform(142.243,-27.35,1.9238,1.9238);

	this.slots1 = new lib.Slots1();
	this.slots1.name = "slots1";
	this.slots1.setTransform(-201.05,-254.8,0.8714,0.8714);

	this.pieces1 = new lib.Pieces1();
	this.pieces1.name = "pieces1";
	this.pieces1.setTransform(-201.05,-254.8,0.8714,0.8714);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,102,255,0.008)").s().p("EgmrAPdIAA+5MBNXAAAIAAe5g");
	this.shape.setTransform(-12.625,28.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.pieces1},{t:this.slots1},{t:this.Score1},{t:this.winMessage1},{t:this.restart1},{t:this.drag2G1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg5, new cjs.Rectangle(-260.2,-69.9,495.2,197.7), null);


(lib.Slots10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// slots
	this.satu = new lib.hdsajd();
	this.satu.name = "satu";
	this.satu.setTransform(137.35,236.25);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape.setTransform(60.875,460.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgjBDQgOgMgBgUIAZAAQACALAGAHQAHAGAKAAQAMAAAGgJQAHgJAAgOQAAgPgIgIQgGgHgMAAQgIAAgEACQgGABgGAFIgUgFIAIhOIBTAAIAAAWIg9AAIgEAmQALgGAMAAQAXAAAMAOQAMANAAAYQAAAYgOAOQgOAOgXAAQgVAAgOgMg");
	this.shape_1.setTransform(51.9,453.675);

	this.instance = new lib.Tween8_1("synched",0);
	this.instance.setTransform(54.75,453.7,0.0361,0.0648);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_2.setTransform(60.875,401.375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAMBOIAAgjIhDAAIgBgPIBDhpIAbAAIAABjIATAAIAAAVIgTAAIAAAjgAAJgmIgmA8IApAAIAAhAg");
	this.shape_3.setTransform(51.65,394.875);

	this.instance_1 = new lib.Tween8_1("synched",0);
	this.instance_1.setTransform(54.75,395,0.0361,0.0648);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_4.setTransform(60.875,343.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgkBEQgPgMAAgUIAaAAQAAALAHAGQAHAHALAAQAMAAAHgHQAHgGAAgNQAAgMgIgHQgHgGgNAAIgQAAIAAgUIARAAQAKAAAHgGQAIgGAAgMQAAgLgHgGQgFgGgMAAQgKAAgHAGQgGAGgBAKIgZAAQgBgMAHgKQAGgKAMgGQALgFAOAAQAXAAANAMQAOALAAAVQAAALgHAJQgHAJgLAFQANADAHAKQAHAJAAANQAAAVgPANQgOAMgXAAQgWAAgOgMg");
	this.shape_5.setTransform(51.45,336.875);

	this.instance_2 = new lib.Tween8_1("synched",0);
	this.instance_2.setTransform(54.75,337,0.0361,0.0648);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_6.setTransform(60.875,289.775);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgyBPIAAgSIAzg5QALgLAFgIQAFgJAAgIQAAgMgGgGQgHgHgJAAQgNAAgHAHQgHAIAAAOIgaAAQAAgPAHgLQAGgMAMgGQAMgGAQAAQAWAAANALQANAMAAAUQAAALgHANQgGAMgPAQIglApIBHAAIAAAVg");
	this.shape_7.setTransform(51.675,283.175);

	this.instance_3 = new lib.Tween8_1("synched",0);
	this.instance_3.setTransform(54.75,283.4,0.0361,0.0648);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_8.setTransform(60.875,235.375);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAGBOIAAh8IglANIAAgWIA8gWIADAAIAACbg");
	this.shape_9.setTransform(50.425,228.85);

	this.instance_4 = new lib.Tween8_1("synched",0);
	this.instance_4.setTransform(54.75,229,0.0361,0.0648);

	this.lima = new lib.drag9G5();
	this.lima.name = "lima";
	this.lima.setTransform(137.15,461.95,0.8086,0.8086,0,0,0,82.2,26.8);

	this.empat = new lib.drag9G4();
	this.empat.name = "empat";
	this.empat.setTransform(137.15,403.9,0.8086,0.8086,0,0,0,82.2,26.7);

	this.tiga = new lib.drag9G3();
	this.tiga.name = "tiga";
	this.tiga.setTransform(137.4,343.45,0.8086,0.8086,0,0,0,82.5,24.7);

	this.dua = new lib.drag9G2();
	this.dua.name = "dua";
	this.dua.setTransform(135.7,292.95,0.8086,0.8086,0,0,0,80.4,32.1);

	this.kotakKartu2 = new lib.target();
	this.kotakKartu2.name = "kotakKartu2";
	this.kotakKartu2.setTransform(485.9,264.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.kotakKartu2},{t:this.dua},{t:this.tiga},{t:this.empat},{t:this.lima},{t:this.instance_4},{t:this.shape_9},{t:this.shape_8},{t:this.instance_3},{t:this.shape_7},{t:this.shape_6},{t:this.instance_2},{t:this.shape_5},{t:this.shape_4},{t:this.instance_1},{t:this.shape_3},{t:this.shape_2},{t:this.instance},{t:this.shape_1},{t:this.shape},{t:this.satu}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Slots10, new cjs.Rectangle(39.6,213.8,514.3,269.7), null);


(lib.satu = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.satu = new lib.drop9G1();
	this.satu.name = "satu";
	this.satu.setTransform(0,0,0.4758,0.4758,0,0,0,127.4,50);

	this.timeline.addTween(cjs.Tween.get(this.satu).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69.6,-32.5,139.39999999999998,59.5);


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
	this.instance = new lib._12();
	this.instance.setTransform(-252,-260,0.9207,0.9821);

	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_2
	this.instance_1 = new lib.Tween7_1("synched",0);
	this.instance_1.setTransform(42.25,-40.25);
	this.instance_1.alpha = 0;

	this.instance_2 = new lib.Tween8copy("synched",0);
	this.instance_2.setTransform(42.25,-40.25);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true,alpha:1},12).to({_off:false,alpha:0},12).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:false},12).to({_off:true,alpha:0},12).wait(1));

	// Layer_3
	this.cobaBG = new lib.Tween10_1();
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
	this.instance = new lib._14();
	this.instance.setTransform(-161,-259,1.1424,1.0564);

	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_2
	this.instance_1 = new lib.Tween7_1("synched",0);
	this.instance_1.setTransform(42.25,-40.25);
	this.instance_1.alpha = 0;

	this.instance_2 = new lib.Tween8copy("synched",0);
	this.instance_2.setTransform(42.25,-40.25);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true,alpha:1},12).to({_off:false,alpha:0},12).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:false},12).to({_off:true,alpha:0},12).wait(1));

	// Layer_3
	this.cobaBG = new lib.Tween10_1();
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

	// Layer_5
	this.instance = new lib._13();
	this.instance.setTransform(-254,-261,0.9961,1.484);

	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_2
	this.instance_1 = new lib.Tween7_1("synched",0);
	this.instance_1.setTransform(42.25,-40.25);
	this.instance_1.alpha = 0;

	this.instance_2 = new lib.Tween8copy("synched",0);
	this.instance_2.setTransform(42.25,-40.25);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true,alpha:1},12).to({_off:false,alpha:0},12).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:false},12).to({_off:true,alpha:0},12).wait(1));

	// Layer_3
	this.cobaBG = new lib.Tween10_1();
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
	this.exit = new lib.btnEit_1();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);
	this.exit._off = true;

	this.timeline.addTween(cjs.Tween.get(this.exit).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAJQgDgEAAgFQAAgFADgDQADgEAGAAQAHAAADAEQADADAAAFQAAAFgDAEQgDAEgHAAQgGAAgDgEg");
	this.shape.setTransform(-299.975,124.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAQBUIAAgnIhMAAIAAgMIBLh0IAWAAIAABuIAYAAIAAASIgYAAIAAAngAANgxIgwBMIAzAAIAAhRg");
	this.shape_1.setTransform(-309.525,117.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgJAJQgDgEAAgFQAAgFADgDQADgEAGAAQAHAAADAEQADADAAAFQAAAFgDAEQgDAEgHAAQgGAAgDgEg");
	this.shape_2.setTransform(-299.975,65.175);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AglBKQgPgNAAgWIAVAAQAAAOAJAIQAIAIAOAAQAPAAAJgIQAIgJAAgPQAAgOgJgIQgJgIgQAAIgQAAIAAgQIAQAAQAOgBAJgHQAIgIAAgOQAAgdgdAAQgNAAgIAIQgJAIAAANIgVAAQAAgUAPgNQAOgNAWgBQAYAAANANQAOAMAAAXQAAALgHALQgHAJgNAGQAOADAIAKQAHAKAAAPQAAAWgPAOQgOANgYAAQgXAAgOgMg");
	this.shape_3.setTransform(-309.775,57.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJAJQgDgEAAgFQAAgFADgDQADgEAGAAQAHAAADAEQADADAAAFQAAAFgDAEQgDAEgHAAQgGAAgDgEg");
	this.shape_4.setTransform(-299.975,8.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("Ag0BVIAAgPIA5hBQANgNAFgKQAFgJAAgKQAAgNgIgIQgIgJgNAAQgPAAgJAJQgJAJAAARIgWAAQAAgYAQgOQAOgOAZAAQAXAAAOAMQANAMAAAVQAAAZgfAhIgtAxIBUAAIAAARg");
	this.shape_5.setTransform(-309.475,0.675);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgJAJQgDgEAAgFQAAgFADgDQADgEAGAAQAHAAADAEQADADAAAFQAAAFgDAEQgDAEgHAAQgGAAgDgEg");
	this.shape_6.setTransform(-299.975,-102.675);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AALBVIAAiOIgqAQIAAgUIA8gWIADAAIAACog");
	this.shape_7.setTransform(-311.025,-110);

	this.instance = new lib.RestoreIcon("single",0);
	this.instance.setTransform(-99.4,61.45,0.8085,0.8085,0,0,0,-0.1,0);
	this.instance.alpha = 0.75;

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_8.setTransform(202.925,119.175);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgMgHgGQgHgGgMAAQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_9.setTransform(189.925,119.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_10.setTransform(176.975,119.175);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgMgHgGQgHgGgMAAQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_11.setTransform(163.975,119.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgVAAIAAixIAVAAIAABrIAMgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_12.setTransform(152.4,116.675);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgYA8QgMgGgGgJQgHgKAAgLIAWAAQAAALAIAGQAIAHAMgBQANAAAHgEQAHgGAAgIQAAgIgGgFQgHgFgPgDQgQgEgKgEQgJgEgFgHQgEgHAAgJQAAgQANgKQANgLATAAQAVAAANALQANALAAARIgVAAQAAgJgHgGQgIgGgLAAQgLgBgHAGQgGAFAAAIQAAAIAGAEQAGAEAPADQAQAEAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgFg");
	this.shape_13.setTransform(133.575,119.3);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgMgHgGQgHgGgMAAQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_14.setTransform(121.025,119.3);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgPIAAhNIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAYAAIAAARIgYAAIAABNQAAAHAEAEQADAEAHgBIAKgBIAAASQgIACgJAAQgNAAgHgJg");
	this.shape_15.setTransform(110.4,117.9);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgMgHgGQgHgGgMAAQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_16.setTransform(100.425,119.3);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_17.setTransform(82.95,116.675);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgMgHgGQgHgGgMAAQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_18.setTransform(69.675,119.3);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgPIAAhNIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAXAAIAAARIgXAAIAABNQAAAHADAEQADAEAIgBIAKgBIAAASQgJACgHAAQgPAAgGgJg");
	this.shape_19.setTransform(59.05,117.9);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgdIAAAAQAAgSAIgPQAGgPANgIQANgIAQAAQAZAAAQASQAQARAAAdIAAABQAAATgHAOQgHAPgNAHQgNAJgRAAQgZAAgPgSgAgZgiQgKANAAAWQAAAVAKANQAKAMAPAAQAQAAAKgMQAJgNAAgWQABgUgLgOQgJgNgQABQgPgBgKANg");
	this.shape_20.setTransform(48.85,119.3);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_21.setTransform(36.95,116.675);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgMgHgGQgHgGgMAAQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_22.setTransform(17.725,119.3);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgmBIQgOgSAAgdIAAgBQAAgcAOgRQANgSAXAAQAVAAAMAPIAAhBIAWAAIAACxIgUAAIgBgOQgNAQgWAAQgVAAgOgSgAgWgJQgIALAAAYQAAAWAIAMQAJAMAPgBQAUABAJgTIAAg4QgJgRgUAAQgPgBgJAMg");
	this.shape_23.setTransform(4.325,116.8);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgMgHgGQgHgGgMAAQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_24.setTransform(-8.525,119.3);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("Ag0BYIAAisIATAAIABAOQAOgRAWAAQAWAAANARQAOARAAAfIAAACQAAAbgOASQgNARgWAAQgVAAgOgOIAAA8gAgfgzIAAA7QAKARAUAAQAPAAAIgNQAJgMAAgXQAAgVgJgMQgIgMgPAAQgUAAgKARg");
	this.shape_25.setTransform(-21.3,121.575);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_26.setTransform(-40.625,119.175);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgMgHgGQgHgGgMAAQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_27.setTransform(-53.625,119.3);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_28.setTransform(-65.2,116.675);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgVAAIAAixIAVAAIAABrIALgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_29.setTransform(-77.15,116.675);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_30.setTransform(-90.475,119.425);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgXBtIAAgSIAKABQAHAAAEgDQADgFAAgJIAAiLIAVAAIAACKQAAAlgggBQgHAAgGgBgAAChYQgDgEAAgFQAAgFADgEQADgDAGAAQAGAAADADQAEAEAAAFQAAAFgEAEQgDADgGAAQgGAAgDgDg");
	this.shape_31.setTransform(-101.025,119.55);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_32.setTransform(-109.125,119.175);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_33.setTransform(-122.175,119.425);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgPIAAhNIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAXAAIAAARIgXAAIAABNQAAAHAEAEQACAEAIgBIAKgBIAAASQgIACgJAAQgOAAgGgJg");
	this.shape_34.setTransform(-132.85,117.9);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQAEAEAAAFQAAAFgEAEQgDADgGAAQgGAAgDgDg");
	this.shape_35.setTransform(-139.25,117.025);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgmBIQgOgSAAgdIAAgBQAAgcAOgRQANgSAXAAQAVAAAMAPIAAhBIAWAAIAACxIgUAAIgBgOQgNAQgWAAQgVAAgOgSgAgWgJQgIALAAAYQAAAWAIAMQAJAMAPgBQAUABAJgTIAAg4QgJgRgUAAQgPgBgJAMg");
	this.shape_36.setTransform(-149.175,116.8);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgdIAAgDQAAgSAHgPQAHgPANgHQANgJAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABATAKALQALALAOAAQAMAAAIgEQAIgFAFgIIANALQgPAYggAAQgYAAgQgRgAgTglQgJAKgCARIA+AAIAAgCQgBgRgIgIQgIgKgNABQgMAAgJAJg");
	this.shape_37.setTransform(-167.475,119.3);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_38.setTransform(-184.225,119.175);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgMgHgGQgHgGgMAAQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_39.setTransform(-201.025,119.3);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_40.setTransform(-214.375,121.625);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_41.setTransform(-230.075,119.175);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgdIAAAAQAAgSAHgPQAHgPANgIQANgIAQAAQAaAAAPASQAQARAAAdIAAABQAAATgHAOQgHAPgNAHQgNAJgRAAQgZAAgPgSgAgZgiQgJANAAAWQAAAVAJANQAKAMAPAAQAQAAAKgMQAKgNAAgWQgBgUgJgOQgKgNgQABQgPgBgKANg");
	this.shape_42.setTransform(-241.45,119.3);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_43.setTransform(-253.35,116.675);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgdBPQgPgGgIgMQgIgLAAgPIAWAAQAAAPAMAKQALAIASAAQARAAAKgHQAJgHAAgMQAAgNgJgGQgIgIgWgGQgdgIgNgLQgNgMAAgRQAAgVAQgNQAQgMAZAAQARgBANAHQAOAHAIALQAHAMAAAOIgWAAQAAgPgKgIQgKgJgRAAQgQgBgJAIQgJAHAAANQAAAKAJAIQAIAHAUAFQAVAGAMAGQAMAIAGAJQAFAJAAANQAAAVgQAMQgQANgaAAQgRAAgPgIg");
	this.shape_44.setTransform(-267.175,117.15);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgdIAAgDQAAgSAHgPQAHgPANgHQANgJAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABATAKALQALALAOAAQAMAAAIgEQAIgFAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAJgCASIA+AAIAAgCQgBgRgIgIQgIgJgNAAQgMAAgJAJg");
	this.shape_45.setTransform(123.125,62.5);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_46.setTransform(106.425,62.375);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgLgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_47.setTransform(89.575,62.5);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_48.setTransform(76.275,64.825);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgIg/QgDgEgBgFQABgFADgEQADgDAFAAQAGAAAEADQACAEAAAFQAAAFgCAEQgEADgGAAQgFAAgDgDg");
	this.shape_49.setTransform(61.05,60.225);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_50.setTransform(51.275,64.825);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_51.setTransform(38.425,62.375);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgLgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_52.setTransform(25.425,62.5);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_53.setTransform(16.075,59.875);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_54.setTransform(6.675,62.625);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_55.setTransform(-10.9,59.875);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_56.setTransform(-24.225,62.625);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAXAAIAAARIgXAAIAABMQAAAIADAEQADADAIAAIAKgBIAAASQgJACgHAAQgPAAgGgJg");
	this.shape_57.setTransform(-34.9,61.1);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_58.setTransform(-44.875,62.375);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_59.setTransform(-57.925,62.625);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_60.setTransform(-132.425,59.875);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgdIAAAAQAAgSAIgPQAGgPAOgIQAMgIAQAAQAZAAAQASQAQASAAAcIAAABQAAASgHAPQgHAPgNAHQgNAJgRAAQgZAAgPgSgAgZgiQgKANAAAWQAAAVAKANQAKAMAPAAQAQABAKgNQAJgNAAgWQABgUgLgOQgJgMgQAAQgPAAgKAMg");
	this.shape_61.setTransform(-142.05,62.5);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgfBJIgBAPIgUAAIAAixIAVAAIAABCQANgQAWAAQAXAAANASQANARAAAdIAAABQAAAdgNARQgNASgXAAQgWAAgNgRgAgfgBIAAA1QAKAUAVgBQAOAAAJgLQAIgMAAgYQAAgWgIgLQgIgLgPAAQgVAAgKATg");
	this.shape_62.setTransform(-155.15,60);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_63.setTransform(-172.375,62.375);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgdIAAAAQAAgSAHgPQAIgPANgIQAMgIAQAAQAaAAAPASQAQASAAAcIAAABQAAASgHAPQgHAPgNAHQgNAJgRAAQgYAAgQgSgAgZgiQgKANAAAWQAAAVAKANQAKAMAPAAQARABAJgNQAKgNAAgWQAAgUgKgOQgKgMgQAAQgPAAgKAMg");
	this.shape_64.setTransform(-189.5,62.5);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAYAAIAAARIgYAAIAABMQAAAIADAEQAEADAHAAIAKgBIAAASQgJACgHAAQgPAAgGgJg");
	this.shape_65.setTransform(-200.4,61.1);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_66.setTransform(-216.325,62.375);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgLgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_67.setTransform(-229.325,62.5);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgVAAIAAixIAVAAIAABrIAMgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_68.setTransform(-240.9,59.875);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgdIAAgDQAAgSAHgPQAHgPANgHQANgJAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABATAKALQALALAOAAQAMAAAIgEQAIgFAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAJgCASIA+AAIAAgCQgBgRgIgIQgIgJgNAAQgMAAgJAJg");
	this.shape_69.setTransform(-253.775,62.5);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgKBUIAAiVIg2AAIAAgSICBAAIAAASIg2AAIAACVg");
	this.shape_70.setTransform(-267.125,60.35);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgPIAAhNIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAXAAIAAARIgXAAIAABNQAAAHADAEQADAEAIAAIAKgCIAAARQgJADgHAAQgPAAgGgJg");
	this.shape_71.setTransform(368.75,4.35);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_72.setTransform(358.675,5.875);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgfBJIgBAOIgUAAIAAiwIAWAAIAABCQANgQAWAAQAWAAANARQANARAAAdIAAADQAAAcgNASQgOARgVAAQgXAAgNgRgAgegBIAAA1QAKATAUABQAPAAAIgMQAJgMAAgYQAAgWgJgLQgIgMgPAAQgVAAgJAUg");
	this.shape_73.setTransform(345.85,3.25);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMgBAIgFQAIgEAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgQgIgKQgIgJgNAAQgMAAgJAKg");
	this.shape_74.setTransform(332.925,5.75);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgKQgHgJAAgLIAWAAQAAALAIAGQAIAHAMAAQANgBAHgFQAHgFAAgHQAAgKgGgEQgHgFgPgEQgQgDgKgEQgJgEgFgIQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgJgHgGQgIgGgLgBQgLABgHAFQgGAFAAAIQAAAIAGAEQAGADAPAEQAQAEAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgGg");
	this.shape_75.setTransform(320.425,5.75);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_76.setTransform(310.925,5.625);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMgBAIgFQAIgEAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgQgIgKQgIgJgNAAQgMAAgJAKg");
	this.shape_77.setTransform(300.275,5.75);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgPIAAhNIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAXAAIAAARIgXAAIAABNQAAAHAEAEQACAEAIAAIAKgCIAAARQgIADgJAAQgOAAgGgJg");
	this.shape_78.setTransform(289.7,4.35);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_79.setTransform(273.775,5.625);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgTAPgLQAPgLAaABIAVAAIAAgKQAAgMgHgGQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_80.setTransform(260.775,5.75);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AAeA+IgehdIgdBdIgRAAIglh8IAVAAIAZBdIAdhdIAQAAIAeBfIAYhfIAWAAIglB8g");
	this.shape_81.setTransform(245.475,5.75);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMgBAIgFQAIgEAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgQgIgKQgIgJgNAAQgMAAgJAKg");
	this.shape_82.setTransform(230.575,5.75);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AAcBZIAAhTQAAgNgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAIIAABZIgVAAIAAixIAVAAIAABEQAPgSAVAAQAoAAAAAsIAABTg");
	this.shape_83.setTransform(217.675,3.125);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgKQgHgJAAgLIAWAAQAAALAIAGQAIAHAMAAQANgBAHgFQAHgFAAgHQAAgKgGgEQgHgFgPgEQgQgDgKgEQgJgEgFgIQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgJgHgGQgIgGgLgBQgLABgHAFQgGAFAAAIQAAAIAGAEQAGADAPAEQAQAEAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgGg");
	this.shape_84.setTransform(199.125,5.75);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgTAPgLQAPgLAaABIAVAAIAAgKQAAgMgHgGQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_85.setTransform(186.575,5.75);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_86.setTransform(177.225,3.125);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMgBAIgFQAIgEAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgQgIgKQgIgJgNAAQgMAAgJAKg");
	this.shape_87.setTransform(168.325,5.75);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgVAAIAAixIAVAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_88.setTransform(156.8,3.125);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_89.setTransform(137.575,5.625);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgTAPgLQAPgLAaABIAVAAIAAgKQAAgMgHgGQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_90.setTransform(124.575,5.75);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_91.setTransform(111.275,8.075);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_92.setTransform(98.425,5.625);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMgBAIgFQAIgEAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgQgIgKQgIgJgNAAQgMAAgJAKg");
	this.shape_93.setTransform(85.825,5.75);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AgmBIQgOgSAAgdIAAgBQAAgcAOgSQANgRAXAAQAVAAAMAPIAAhBIAWAAIAACwIgUAAIgBgNQgNAQgWAAQgVAAgOgSgAgWgIQgIAKAAAZQAAAUAIAMQAJANAPAAQAUAAAJgSIAAg5QgJgSgUAAQgPABgJAMg");
	this.shape_94.setTransform(72.475,3.25);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQADAEABAFQgBAFgDAEQgDADgGAAQgGAAgDgDg");
	this.shape_95.setTransform(57.3,3.475);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgTAPgLQAPgLAaABIAVAAIAAgKQAAgMgHgGQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_96.setTransform(47.925,5.75);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_97.setTransform(34.925,5.875);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgKQgHgJAAgLIAWAAQAAALAIAGQAIAHAMAAQANgBAHgFQAHgFAAgHQAAgKgGgEQgHgFgPgEQgQgDgKgEQgJgEgFgIQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgJgHgGQgIgGgLgBQgLABgHAFQgGAFAAAIQAAAIAGAEQAGADAPAEQAQAEAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgGg");
	this.shape_98.setTransform(22.375,5.75);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMgBAIgFQAIgEAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgQgIgKQgIgJgNAAQgMAAgJAKg");
	this.shape_99.setTransform(10.225,5.75);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgKQgHgJAAgLIAWAAQAAALAIAGQAIAHAMAAQANgBAHgFQAHgFAAgHQAAgKgGgEQgHgFgPgEQgQgDgKgEQgJgEgFgIQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgJgHgGQgIgGgLgBQgLABgHAFQgGAFAAAIQAAAIAGAEQAGADAPAEQAQAEAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgGg");
	this.shape_100.setTransform(-2.275,5.75);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_101.setTransform(-21.125,8.075);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_102.setTransform(-33.975,5.625);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgTAPgLQAPgLAaABIAVAAIAAgKQAAgMgHgGQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_103.setTransform(-46.975,5.75);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AglBXIgIgBIAAgRIAGAAQALAAAGgEQAGgFAEgLIAEgNIgsh7IAXAAIAeBdIAdhdIAXAAIgyCQQgLAfgZAAg");
	this.shape_104.setTransform(-59.075,8.275);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_105.setTransform(-77.075,5.625);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgTAPgLQAPgLAaABIAVAAIAAgKQAAgMgHgGQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_106.setTransform(-90.075,5.75);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AAeA+IgehdIgdBdIgRAAIglh8IAVAAIAZBdIAdhdIAQAAIAeBfIAYhfIAWAAIglB8g");
	this.shape_107.setTransform(-105.375,5.75);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMgBAIgFQAIgEAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgQgIgKQgIgJgNAAQgMAAgJAKg");
	this.shape_108.setTransform(-120.275,5.75);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AAcBZIAAhTQAAgNgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAIIAABZIgVAAIAAixIAVAAIAABEQAPgSAVAAQAoAAAAAsIAABTg");
	this.shape_109.setTransform(-133.125,3.125);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AAcBZIAAhTQAAgNgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAIIAABZIgVAAIAAixIAVAAIAABEQAPgSAVAAQAoAAAAAsIAABTg");
	this.shape_110.setTransform(-152.075,3.125);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgoAvQgQgRAAgeIAAAAQAAgTAIgOQAGgPANgIQANgIAQAAQAZAAAQASQAQASAAAcIAAACQAAASgHAOQgHAOgNAJQgNAIgRAAQgZAAgPgSgAgZghQgKAMAAAXQAAAUAKANQAKANAPAAQAQAAAKgOQAJgMAAgWQABgVgLgMQgJgNgQgBQgPABgKANg");
	this.shape_111.setTransform(-165.35,5.75);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgPIAAhNIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAXAAIAAARIgXAAIAABNQAAAHADAEQADAEAIAAIAKgCIAAARQgJADgHAAQgPAAgGgJg");
	this.shape_112.setTransform(-176.3,4.35);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_113.setTransform(-186.275,5.625);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AgoAvQgQgRAAgeIAAAAQAAgTAIgOQAGgPANgIQANgIAQAAQAZAAAQASQAQASAAAcIAAACQAAASgHAOQgHAOgNAJQgNAIgRAAQgZAAgPgSgAgZghQgKAMAAAXQAAAUAKANQAKANAPAAQAQAAAKgOQAJgMAAgWQABgVgLgMQgJgNgQgBQgPABgKANg");
	this.shape_114.setTransform(-199.55,5.75);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AgkAwQgQgSAAgdIAAgDQAAgRAHgPQAHgOAMgIQANgIAQAAQAVAAAOANQAOANABATIgUAAQgBgLgJgJQgIgIgMAAQgPABgJALQgJAMAAAWIAAAEQAAAVAJALQAJANAPAAQAMgBAIgGQAJgIABgKIAUAAQgBALgHAJQgGALgMAFQgLAGgNAAQgYAAgPgRg");
	this.shape_115.setTransform(-212.275,5.75);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_116.setTransform(-231.375,8.075);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgTAPgLQAPgLAaABIAVAAIAAgKQAAgMgHgGQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_117.setTransform(-244.225,5.75);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_118.setTransform(-254.075,5.625);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("Ag8BUIAAinIAwAAQAVAAARAJQAQAKAKASQAJASAAAXIAAAKQAAAYgJASQgJASgRAJQgSAKgVAAgAgmBCIAYAAQAYAAAPgQQAOgQAAgeIAAgIQAAgdgNgQQgOgQgYAAIgaAAg");
	this.shape_119.setTransform(-266.175,3.6);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQADAEABAFQgBAFgDAEQgDADgGAAQgGAAgDgDg");
	this.shape_120.setTransform(-77.25,-53.275);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAARAFAKIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_121.setTransform(-86.625,-51);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_122.setTransform(-99.575,-50.875);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgJQgHgKAAgLIAWAAQAAALAIAGQAIAGAMAAQANAAAHgEQAHgGAAgIQAAgJgGgEQgHgFgPgDQgQgEgKgEQgJgFgFgHQgEgGAAgJQAAgQANgKQANgLATAAQAVAAANALQANALAAARIgVAAQAAgJgHgGQgIgHgLABQgLgBgHAGQgGAFAAAIQAAAIAGAEQAGADAPAFQAQADAKAFQAKAEAFAHQAFAHAAAKQAAARgOAKQgNAKgWAAQgOAAgLgGg");
	this.shape_123.setTransform(-112.175,-51);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgPQAHgPANgHQANgJAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALALAOAAQAMAAAIgEQAIgFAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAJgCASIA+AAIAAgCQgBgRgIgIQgIgJgNAAQgMgBgJAKg");
	this.shape_124.setTransform(-124.325,-51);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgJQgHgKAAgLIAWAAQAAALAIAGQAIAGAMAAQANAAAHgEQAHgGAAgIQAAgJgGgEQgHgFgPgDQgQgEgKgEQgJgFgFgHQgEgGAAgJQAAgQANgKQANgLATAAQAVAAANALQANALAAARIgVAAQAAgJgHgGQgIgHgLABQgLgBgHAGQgGAFAAAIQAAAIAGAEQAGADAPAFQAQADAKAFQAKAEAFAHQAFAHAAAKQAAARgOAKQgNAKgWAAQgOAAgLgGg");
	this.shape_125.setTransform(-136.775,-51);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_126.setTransform(-155.675,-48.675);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_127.setTransform(-168.525,-51.125);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAARAFAKIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_128.setTransform(-181.525,-51);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AglBXIgIgBIAAgRIAGAAQALAAAGgEQAGgFAEgLIAEgNIgsh7IAXAAIAeBdIAdhdIAXAAIgyCQQgLAfgZAAg");
	this.shape_129.setTransform(-193.625,-48.475);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_130.setTransform(-211.575,-51.125);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAARAFAKIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_131.setTransform(-224.575,-51);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("AAeA/IgeheIgdBeIgRAAIglh8IAVAAIAZBcIAdhcIAQAAIAeBeIAYheIAWAAIglB8g");
	this.shape_132.setTransform(-239.875,-51);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgPQAHgPANgHQANgJAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALALAOAAQAMAAAIgEQAIgFAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAJgCASIA+AAIAAgCQgBgRgIgIQgIgJgNAAQgMgBgJAKg");
	this.shape_133.setTransform(-254.825,-51);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("AAcBZIAAhTQAAgNgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAIIAABZIgVAAIAAixIAVAAIAABEQAPgSAVAAQAoAAAAAsIAABTg");
	this.shape_134.setTransform(-267.675,-53.625);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgJQgHgKAAgLIAWAAQAAALAIAGQAIAGAMAAQANABAHgGQAHgEAAgJQAAgJgGgEQgHgFgPgDQgQgEgKgEQgJgFgFgHQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgHgLAAQgLAAgHAGQgGAFAAAIQAAAIAGAEQAGAEAPAEQAQADAKAFQAKAEAFAHQAFAHAAAKQAAARgOAKQgNAKgWAAQgOAAgLgGg");
	this.shape_135.setTransform(388.475,-107.8);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_136.setTransform(375.925,-107.8);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_137.setTransform(366.575,-110.425);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgPQAHgOANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALALAOAAQAMABAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgQgIgKQgIgIgNgBQgMAAgJAKg");
	this.shape_138.setTransform(357.625,-107.8);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_139.setTransform(346.1,-110.425);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_140.setTransform(328.15,-110.425);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAVAAIAAB8gAgIg/QgDgEgBgFQABgFADgEQADgDAFAAQAGAAAEADQACAEAAAFQAAAFgCAEQgEADgGAAQgFAAgDgDg");
	this.shape_141.setTransform(318.45,-110.075);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgQIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIADAEQAEADAHABIAKgBIAAARQgJACgHAAQgOAAgHgJg");
	this.shape_142.setTransform(311.35,-109.2);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgJQgHgKAAgLIAWAAQAAALAIAGQAIAGAMAAQANABAHgGQAHgEAAgJQAAgJgGgEQgHgFgPgDQgQgEgKgEQgJgFgFgHQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgHgLAAQgLAAgHAGQgGAFAAAIQAAAIAGAEQAGAEAPAEQAQADAKAFQAKAEAFAHQAFAHAAAKQAAARgOAKQgNAKgWAAQgOAAgLgGg");
	this.shape_143.setTransform(301.725,-107.8);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQAEAEAAAFQAAAFgEAEQgDADgGAAQgGAAgDgDg");
	this.shape_144.setTransform(292.75,-110.075);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_145.setTransform(286.425,-107.925);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgPQAHgOANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALALAOAAQAMABAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgQgIgKQgIgIgNgBQgMAAgJAKg");
	this.shape_146.setTransform(275.775,-107.8);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgQIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIAEAEQADADAHABIAKgBIAAARQgIACgJAAQgNAAgHgJg");
	this.shape_147.setTransform(265.2,-109.2);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_148.setTransform(256.55,-110.425);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_149.setTransform(243.275,-107.8);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_150.setTransform(233.425,-107.925);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_151.setTransform(222.325,-107.8);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_152.setTransform(210.75,-110.425);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_153.setTransform(192.75,-110.425);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_154.setTransform(179.475,-107.8);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgQIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIAEAEQADADAHABIAKgBIAAARQgIACgJAAQgNAAgHgJg");
	this.shape_155.setTransform(168.9,-109.2);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgcIAAgBQAAgSAIgPQAGgPANgIQANgIAQAAQAZAAAQASQAQARAAAdIAAACQAAARgHAPQgHAOgNAIQgNAJgRAAQgZAAgPgSgAgZghQgKAMAAAXQAAAUAKANQAKAMAPAAQAQABAKgNQAJgNAAgWQABgUgLgNQgJgOgQAAQgPAAgKAOg");
	this.shape_156.setTransform(158.65,-107.8);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_157.setTransform(146.75,-110.425);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_158.setTransform(127.375,-107.675);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FFFFFF").s().p("AgXBtIAAgRIAKABQAHAAAEgFQADgDAAgKIAAiLIAVAAIAACLQAAAjggABQgHAAgGgCgAAChYQgDgEAAgFQAAgGADgDQADgDAGgBQAGABADADQAEADAAAGQAAAFgEAEQgDADgGAAQgGAAgDgDg");
	this.shape_159.setTransform(116.825,-107.55);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_160.setTransform(108.675,-107.675);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_161.setTransform(95.675,-107.925);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgPQAHgOANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALALAOAAQAMABAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgQgIgKQgIgIgNgBQgMAAgJAKg");
	this.shape_162.setTransform(83.125,-107.8);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_163.setTransform(66.425,-107.925);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_164.setTransform(43.525,-107.925);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_165.setTransform(30.525,-107.8);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FFFFFF").s().p("AAeA/IgeheIgdBeIgRAAIglh8IAVAAIAZBcIAdhcIAQAAIAeBeIAYheIAWAAIglB8g");
	this.shape_166.setTransform(15.225,-107.8);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgPQAHgOANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALALAOAAQAMABAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgQgIgKQgIgIgNgBQgMAAgJAKg");
	this.shape_167.setTransform(0.275,-107.8);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#FFFFFF").s().p("AAcBZIAAhTQAAgNgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAIIAABZIgVAAIAAixIAVAAIAABEQAPgSAVAAQAoAAAAAsIAABTg");
	this.shape_168.setTransform(-12.575,-110.425);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgVAAIAAixIAVAAIAABrIAMgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_169.setTransform(-30.3,-110.425);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQADAEAAAFQAAAFgDAEQgDADgGAAQgGAAgDgDg");
	this.shape_170.setTransform(-40,-110.075);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgQIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAXAAIAAAQIgXAAIAABMQAAAIADAEQADADAIABIAKgBIAAARQgJACgHAAQgPAAgGgJg");
	this.shape_171.setTransform(-47.05,-109.2);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgJQgHgKAAgLIAWAAQAAALAIAGQAIAGAMAAQANABAHgGQAHgEAAgJQAAgJgGgEQgHgFgPgDQgQgEgKgEQgJgFgFgHQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgHgLAAQgLAAgHAGQgGAFAAAIQAAAIAGAEQAGAEAPAEQAQADAKAFQAKAEAFAHQAFAHAAAKQAAARgOAKQgNAKgWAAQgOAAgLgGg");
	this.shape_172.setTransform(-56.675,-107.8);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQADAEAAAFQAAAFgDAEQgDADgGAAQgGAAgDgDg");
	this.shape_173.setTransform(-65.65,-110.075);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_174.setTransform(-71.975,-107.925);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgPQAHgOANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALALAOAAQAMABAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgQgIgKQgIgIgNgBQgMAAgJAKg");
	this.shape_175.setTransform(-82.675,-107.8);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgQIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIADAEQAEADAHABIAKgBIAAARQgJACgHAAQgOAAgHgJg");
	this.shape_176.setTransform(-93.2,-109.2);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgVAAIAAixIAVAAIAABrIAMgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_177.setTransform(-101.85,-110.425);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_178.setTransform(-115.125,-107.8);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_179.setTransform(-124.975,-107.925);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_180.setTransform(-136.075,-107.8);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_181.setTransform(-147.65,-110.425);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_182.setTransform(-165.65,-110.425);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_183.setTransform(-178.925,-107.8);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgQIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAXAAIAAAQIgXAAIAABMQAAAIAEAEQACADAIABIAKgBIAAARQgIACgJAAQgOAAgGgJg");
	this.shape_184.setTransform(-189.55,-109.2);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgcIAAgBQAAgSAHgPQAIgPAMgIQANgIAQAAQAZAAAQASQAQARAAAdIAAACQAAARgHAPQgHAOgNAIQgNAJgRAAQgYAAgQgSgAgZghQgKAMABAXQgBAUAKANQAKAMAPAAQAQABAKgNQAKgNgBgWQAAgUgKgNQgJgOgQAAQgPAAgKAOg");
	this.shape_185.setTransform(-199.8,-107.8);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgVAAIAAixIAVAAIAABrIALgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_186.setTransform(-211.7,-110.425);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_187.setTransform(-231.375,-105.475);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_188.setTransform(-244.225,-107.8);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_189.setTransform(-254.075,-107.925);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#FFFFFF").s().p("Ag8BUIAAinIAwAAQAVAAARAKQAQAJAKASQAJASAAAXIAAAKQAAAYgJARQgJASgRAKQgSAKgVAAgAgmBCIAYAAQAYAAAPgQQAOgQAAgeIAAgJQAAgcgNgQQgOgQgYAAIgaAAg");
	this.shape_190.setTransform(-266.175,-109.95);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgJgJQgJgKgUAAQgaAAgNAXIAACnIhAAAIAAjtIA9AAIABAcQAZggArAAQAlAAATAWQASAWABAtIAACYg");
	this.shape_191.setTransform(209.8,-167.7);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#FFFFFF").s().p("AgfCmIAAjtIA/AAIAADtgAgYhtQgKgJAAgOQgBgPAKgJQAKgJAPAAQAQAAAKAJQAKAJgBAPQABAOgKAJQgKAKgQAAQgPAAgJgKg");
	this.shape_192.setTransform(191.25,-172.175);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#FFFFFF").s().p("AhRBnQgYgUAAgfQAAgmAcgTQAcgUA0AAIAeAAIAAgOQAAgQgJgKQgJgKgQAAQgRAAgIAHQgKAIAAAOIg/AAQgBgVANgSQANgRAXgKQAYgKAcAAQArAAAbAWQAZAWAAAoIAABmQAAAiAKARIAAAEIhAAAQgFgJgCgNQgXAagkAAQgjAAgWgUgAgpAsIAAADQAAAMAIAIQAIAIAPAAQANAAAMgHQAMgGAGgKIAAgpIgYAAQgvAAgDAhg");
	this.shape_193.setTransform(173.2,-167.475);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#FFFFFF").s().p("ABqB5IAAiWQAAgVgHgJQgIgKgUAAQgdAAgLAcIAACiIg+AAIAAiWQAAgVgIgJQgIgKgUAAQgbABgMAWIAACnIg/AAIAAjtIA7AAIACAbQAZgfArAAQAtAAARAlQAZglAvAAQAmAAATAWQATAXAAAuIAACWg");
	this.shape_194.setTransform(141.725,-167.7);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#FFFFFF").s().p("AhCB5IAAjtIA8AAIABAdQATghAhAAQALAAAJADIgBA9QgNgCgJAAQglAAgKAYIAACbg");
	this.shape_195.setTransform(114.95,-167.7);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#FFFFFF").s().p("AhKBbQghggAAg1IAAgGQAAgjAOgcQAOgdAZgPQAZgPAgAAQAxAAAcAfQAcAeAAA5IAAAZIiXAAQADAXAQAOQAPAOAXAAQAlAAAUgbIAgAjQgPAVgYALQgYALgeAAQgzAAghgggAgbg6QgMANgDAXIBXAAIAAgFQAAgVgLgLQgLgMgUAAQgSAAgMANg");
	this.shape_196.setTransform(93.925,-167.475);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#FFFFFF").s().p("Ah2CgIAAk/IBwAAQA5AAAfAWQAeAXAAArQAAAXgMASQgNASgVAIQAZAFAOATQAOATAAAbQAAAugeAYQgdAXg2ABgAg0BrIA4AAQAXAAANgLQANgLAAgUQAAgsgtAAIg8AAgAg0gZIAxAAQAxgBAAgnQAAgVgNgKQgNgKgaAAIguAAg");
	this.shape_197.setTransform(67.475,-171.575);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#FFFFFF").s().p("AAlCoIg8hfIgWAXIAABIIhAAAIAAlPIBAAAIAAC5IALgPIA8hHIBMAAIhVBiIBdCKg");
	this.shape_198.setTransform(31.1,-172.45);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#FFFFFF").s().p("AhRBjQgUgWAAgrIAAiaIA/AAIAACZQAAAlAhAAQAgAAAMgXIAAinIA/AAIAADsIg7AAIgCgYQgYAdgoAAQgmAAgUgWg");
	this.shape_199.setTransform(5,-167.25);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#FFFFFF").s().p("Ag5DSIAAgyQAMACAIAAQAeAAAAgfIAAj6IA+AAIAAD6QAAAngVAWQgVAWgmAAQgRAAgPgEgAgDidQgKgJAAgOQAAgPAKgJQAIgJARAAQARAAAJAJQAJAJAAAPQAAAOgJAJQgKAKgQAAQgQAAgJgKg");
	this.shape_200.setTransform(-15.65,-167.375);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgIgJQgJgKgVAAQgZAAgOAXIAACnIhAAAIAAjtIA9AAIABAcQAZggArAAQAlAAATAWQASAWABAtIAACYg");
	this.shape_201.setTransform(-31.95,-167.7);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#FFFFFF").s().p("AhRBjQgUgWgBgrIAAiaIBAAAIAACZQAAAlAiAAQAfAAAMgXIAAinIBAAAIAADsIg8AAIgCgYQgYAdgoAAQgmAAgUgWg");
	this.shape_202.setTransform(-57.15,-167.25);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#FFFFFF").s().p("AgjBTIAAh/IgjAAIAAgvIAjAAIAAg6IA/AAIAAA6IAoAAIAAAvIgoAAIAAB1QAAANAFAGQAFAGAOAAQAKAAAJgCIAAAwQgTAGgUAAQhCAAgBhDg");
	this.shape_203.setTransform(-77.575,-170.175);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#FFFFFF").s().p("AhKBbQghggAAg1IAAgGQAAgjAOgcQAOgdAZgPQAZgPAgAAQAxAAAcAfQAcAeAAA5IAAAZIiXAAQADAXAQAOQAPAOAXAAQAlAAAUgbIAgAjQgPAVgYALQgYALgeAAQgzAAghgggAgbg6QgMANgDAXIBXAAIAAgFQAAgVgLgLQgLgMgUAAQgSAAgMANg");
	this.shape_204.setTransform(-96.725,-167.475);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#FFFFFF").s().p("Ah6CgIAAk/IB8AAQAkAAAbANQAcANAPAZQAOAYAAAfQAAAvgfAaQghAbg5AAIg4AAIAABxgAg3gFIA5AAQAbAAANgNQAOgMAAgXQAAgXgOgPQgOgOgYgBIg7AAg");
	this.shape_205.setTransform(-123,-171.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.instance},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).to({state:[]},1).wait(12));

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


(lib.dua = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.dua = new lib.drop9G2();
	this.dua.name = "dua";
	this.dua.setTransform(0,0,0.4758,0.4758,0,0,0,132.9,44.5);

	this.timeline.addTween(cjs.Tween.get(this.dua).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-70.2,-31.3,138.2,59.5);


(lib.Pieces10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// pieces
	this.dua = new lib.dua();
	this.dua.name = "dua";
	this.dua.setTransform(341.55,292.75);
	new cjs.ButtonHelper(this.dua, 0, 1, 1);

	this.satu = new lib.satu();
	this.satu.name = "satu";
	this.satu.setTransform(340.5,241.95,1,1,0,0,0,0.1,-2.9);
	new cjs.ButtonHelper(this.satu, 0, 1, 1);

	this.lima = new lib.drop9G5();
	this.lima.name = "lima";
	this.lima.setTransform(339.95,455.35,0.4758,0.4758,0,0,0,131.4,42.9);
	new cjs.ButtonHelper(this.lima, 0, 1, 1);

	this.tiga = new lib.drop9G3();
	this.tiga.name = "tiga";
	this.tiga.setTransform(340.4,347.7,0.4758,0.4758,0,0,0,119.2,48.6);
	new cjs.ButtonHelper(this.tiga, 0, 1, 1);

	this.empat = new lib.drop9G4();
	this.empat.name = "empat";
	this.empat.setTransform(340.45,394.6,0.4758,0.4758,0,0,0,129.6,34.2);
	new cjs.ButtonHelper(this.empat, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.empat},{t:this.tiga},{t:this.lima},{t:this.satu},{t:this.dua}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces10, new cjs.Rectangle(270.8,212.3,139.39999999999998,272.4), null);


// stage content:
(lib.game12_temp = function(mode,startPosition,loop) {
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
		  window.location.replace("../materi7/index.html");
		});
		
		root.btnBack3.on("click", function () {
		  window.location.replace("../game11/index.html");
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
		root.pp1.gotoAndStop(0);
		
		root.g1.on("click", function () {
		  root.pp1.gotoAndPlay(0);
		});
		
		root.pp2.gotoAndStop(0);
		
		root.g2.on("click", function () {
		  root.pp2.gotoAndPlay(0);
		});
		
		root.pp3.gotoAndStop(0);
		
		root.g3.on("click", function () {
		  root.pp3.gotoAndPlay(0);
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
		  winMessage.originalY1 = winMessage.y;
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
		  winMessage.y = winMessage.originalY1 + 60;
		  createjs.Tween.get(winMessage).to(
		    { alpha: 1, y: winMessage.originalY1 },
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
		  console.log(pieces);
		  console.log(pieces.children);
		  pieces.children.forEach(function (child1, index) {
		    child1.originalX1 = positions1[index].x;
		    child1.originalY1 = positions1[index].y;
		    child1.mouseEnabled = true;
		    createjs.Tween.get(child1).to(
		      { x: child1.originalX1, y: child1.originalY1 },
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
		    console.log(root.slot.name, pieces.target.name);
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
		  winMessage.y = winMessage.originalY1 + 60;
		  createjs.Tween.get(winMessage).to(
		    { alpha: 1, y: winMessage.originalY1 },
		    500,
		    createjs.Ease.backInOut
		  );
		};
		
		root.onMatch = function () {
		  winMessage.text = "Selamat! Tebakan Anda Benar!";
		  pieces.skor++;
		  Score.text = pieces.skor * 20;
		  winMessage.alpha = 0;
		  winMessage.y = winMessage.originalY1 + 60;
		  createjs.Tween.get(winMessage).to(
		    { alpha: 1, y: winMessage.originalY1 },
		    500,
		    createjs.Ease.backInOut
		  );
		};
		
		root.onWin = function () {
		  winMessage.text = "Yey!, Anda Berhasil Menyelesaikan Tantangan. Selamat!";
		  winMessage.alpha = 0;
		  winMessage.y = winMessage.originalY1 + 60;
		  createjs.Tween.get(winMessage).to(
		    { alpha: 1, y: winMessage.originalY1 },
		    500,
		    createjs.Ease.backInOut
		  );
		};
		
		root.onMiss = function () {
		  createjs.Tween.get(pieces.target).to(
		    { x: pieces.target.originalX1, y: pieces.target.originalY1 },
		    350,
		    createjs.Ease.backInOut
		  );
		  winMessage.text = "Silahkan letakkan pada kotak yang sesuai ya..";
		  winMessage.alpha = 0;
		  winMessage.y = winMessage.originalY1 + 60;
		  createjs.Tween.get(winMessage).to(
		    { alpha: 1, y: winMessage.originalY1 },
		    500,
		    createjs.Ease.backInOut
		  );
		};
		
		root.setup();
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
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// pp3
	this.pp3 = new lib.pp3();
	this.pp3.name = "pp3";
	this.pp3.setTransform(436.4,314.2);

	this.timeline.addTween(cjs.Tween.get(this.pp3).wait(1));

	// pp2
	this.pp2 = new lib.pp2();
	this.pp2.name = "pp2";
	this.pp2.setTransform(436.6,314.2);

	this.timeline.addTween(cjs.Tween.get(this.pp2).wait(1));

	// pp1
	this.pp1 = new lib.pp1();
	this.pp1.name = "pp1";
	this.pp1.setTransform(436.6,314.2);

	this.timeline.addTween(cjs.Tween.get(this.pp1).wait(1));

	// code
	this.popUpInfo = new lib.popUpInfo();
	this.popUpInfo.name = "popUpInfo";
	this.popUpInfo.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.popUpInfo).wait(1));

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
	this.shape.graphics.f("#FFFFFF").s().p("AgNASQgEgDAAgGQAAgGAFgDQAFgEAJABIAHAAIAAgEQAAgEgDgCQgCgDgEAAQgDABgDACQgDACAAACIgHAAQAAgDACgDQADgDADgCQAEgBAEAAQAHAAAFADQAEAEAAAGIAAAUQAAAGACADIAAABIgIAAIgBgFQgFAFgGABQgHAAgEgFgAgKAIQAAAEADACQACACAEAAQACAAADgCQADgBACgEIAAgJIgGAAQgNABAAAHg");
	this.shape.setTransform(444.575,59.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAWIAAgqIAGAAIABAFQADgGAGAAIAEABIAAAGIgFAAQgGAAgCAHIAAAdg");
	this.shape_1.setTransform(441.2,59.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgNASQgEgDAAgGQAAgGAFgDQAFgEAJABIAHAAIAAgEQAAgEgDgCQgCgDgEAAQgDABgDACQgDACAAACIgHAAQAAgDACgDQADgDADgCQAEgBAEAAQAHAAAFADQAEAEAAAGIAAAUQAAAGACADIAAABIgIAAIgBgFQgFAFgGABQgHAAgEgFgAgKAIQAAAEADACQACACAEAAQACAAADgCQADgBACgEIAAgJIgGAAQgNABAAAHg");
	this.shape_2.setTransform(437.375,59.65);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgMASQgEgEAAgIIAAgbIAHAAIAAAbQAAAKAIAAQAIgBADgFIAAgfIAHAAIAAAqIgHAAIAAgEQgEAFgIAAQgHAAgDgEg");
	this.shape_3.setTransform(432.925,59.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJAbQgFgCgDgEQgDgEAAgFIAIAAQAAAFAEADQAEADAFAAQAGAAADgCQADgDAAgEQAAgEgDgCQgCgDgIgCQgJgDgFgDQgEgEAAgGQAAgHAFgEQAGgFAIAAQAFAAAFACQAFADADAEQACAEAAAFIgIAAQABgGgEgDQgEgDgFAAQgFAAgDADQgDACAAAFQAAADADADQACACAHACQAHACAEACQAEACACADQACAEAAAEQAAAHgFAEQgGAFgJAAQgFAAgFgDg");
	this.shape_4.setTransform(428.25,58.925);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3498DB").s().p("Aj8D9QhphpAAiUQAAiTBphqQBphoCTAAQCVAABoBoQBpBqAACTQAACUhpBpQhoBpiVAAQiTAAhphpg");
	this.shape_5.setTransform(437.8705,37.4545,0.9301,0.9301);

	this.instance = new lib.hehe();
	this.instance.setTransform(476.4,37.5,0.7145,0.9301,0,0,0,86.2,36);
	this.instance.shadow = new cjs.Shadow("rgba(0,0,0,1)",3,3,4);
	this.instance.cache(-2,-2,176,76);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.tandaSuaraOff},{t:this.hening},{t:this.tandaSuaraOn},{t:this.nyala}]}).wait(1));

	// Layer_1
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
	this.winMessage.setTransform(397.5516,164.75,0.9382,0.9382);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E74C3C").s().p("Egg7ACMIAAkXMBB3AAAIAAEXg");
	this.shape_6.setTransform(398.1157,173.6031,0.9383,0.9383);

	this.btnInfo = new lib.btnInfo();
	this.btnInfo.name = "btnInfo";
	this.btnInfo.setTransform(638.35,176.05,0.6435,0.6435,0,0,0,0.1,0);
	new cjs.ButtonHelper(this.btnInfo, 0, 1, 2, false, new lib.btnInfo(), 3);

	this.restart = new lib.Restart();
	this.restart.name = "restart";
	this.restart.setTransform(697.75,174.85,0.7541,0.7541);
	new cjs.ButtonHelper(this.restart, 0, 1, 2, false, new lib.Restart(), 3);

	this.instance_2 = new lib.infod();
	this.instance_2.setTransform(243.05,376.5,0.8839,0.8839);

	this.instance_3 = new lib.infod();
	this.instance_3.setTransform(556.65,384.6,0.8839,0.8839);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgJApQgKAAgHgGQgHgHABgKQABgMAKgGQAKgHAQAAIAOAAIABgHQAAgHgDgEQgDgEgIAAQgGAAgFADQgFAEgBAFIgNAAQABgGAEgGQAFgFAIgDQAGgDAIAAQAMAAAHAIQAHAHgBAMIgGAmIgBAGIABAIIAAABIgOAAIgBgEIABgFQgKAKgLAAIgBAAgAgLAFQgHAEAAAHQgCAGAEAEQADADAHAAQAGABAEgEQAGgDAEgFIADgRIgKAAQgMAAgGAEg");
	this.shape_7.setTransform(159.5,195.7761);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgZAeQgIgKABgRIAAgDQACgLAGgKQAFgJAJgFQAIgFAIAAQANAAAHAIQAHAIAAANIAAAKIgBAFIgzAAQgBALAFAHQAFAIAJAAQALAAAKgKIAIAGQgFAHgIAEQgIAEgJAAQgOAAgJgLgAgIgXQgGAFgDAMIAlAAIABgBQABgJgEgHQgFgGgHAAIgCAAQgGAAgGAGg");
	this.shape_8.setTransform(151.8887,195.7977);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAMAoIAJgzIAAgGQgBgLgLAAQgLAAgJANIgKA3IgNAAIAOhOIAMAAIgCAKQAKgMAOABQALAAAFAHQAGAIgCANIgIAzg");
	this.shape_9.setTransform(143.5661,195.724);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgPA2IAOhOIAMAAIgNBOgAACgnQgCgCAAgEQAAgDACgDQACgCAEAAQADAAADACQACACAAAEQAAADgCACQgDADgDAAQgEAAgCgCg");
	this.shape_10.setTransform(138.2,194.3458);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgOA5QgKgBgHgIQgHgIAAgOIAAgLQACgMAFgIQAFgKAIgFQAIgFAJAAQAMABAHAJIAIgpIANAAIgTBvIgNAAIACgIQgJAKgMAAIgCAAgAgNgIQgFAFgEAHQgCAJAAAKQgBAKAEAGQAEAGAHAAQALABAJgMIAGgkQgEgLgLAAQgHAAgHAFg");
	this.shape_11.setTransform(132.4,194.2011);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgMAoQgMAAgFgIQgGgIACgNIAIgyIAOAAIgJAyIAAAGQAAAFADADQADADAFABQANAAAIgMIAKg4IANAAIgOBOIgMAAIABgIQgIAJgNAAIgBAAg");
	this.shape_12.setTransform(124.0839,195.8762);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgYAoIANhNIAMgBIgBAKQAIgMALAAIAGACIgBANIgGgBQgNAAgGALIgKA3g");
	this.shape_13.setTransform(117.625,195.7);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgPA2IANhOIANAAIgNBOgAADgnQgDgCAAgEQAAgDADgDQABgCAEAAQAEAAACACQACACAAAEQAAADgCACQgCADgEAAQgEAAgBgCg");
	this.shape_14.setTransform(113.2,194.3458);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AARA1IAIgxIgzAAIgJAxIgNAAIAThpIANAAIgIAtIAzAAIAIgtIAOAAIgTBpg");
	this.shape_15.setTransform(106.15,194.425);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgPAmQgHgEgEgGQgFgGAAgHIAOAAQAAAHAFAEQAGAEAHAAQAIAAAEgDQAFgEAAgEQAAgGgEgDQgFgDgJgDQgKgCgGgCQgGgCgDgFQgDgEAAgGQAAgJAIgIQAJgGAMAAQANAAAIAGQAJAIgBAKIgNAAQAAgFgFgEQgFgEgGAAQgHAAgEADQgEAEgBAFQAAAEAEADQAFACAJACQAKADAGADQAHACADAFQACAEAAAHQAAAKgIAHQgJAGgNAAQgIAAgIgDg");
	this.shape_16.setTransform(190.55,175.8);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_17.setTransform(182.625,175.8);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_18.setTransform(176.725,174.125);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgXAeQgJgKgBgSIAAgCQAAgLAFgKQAFgIAHgGQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAAMAHAGQAHAIAIAAQAHAAAGgDQAEgDAEgFIAJAHQgKAPgVAAQgPAAgKgLgAgMgXQgFAGgBALIAmAAIAAgBQAAgKgFgHQgGgFgIAAQgHAAgGAGg");
	this.shape_19.setTransform(171.05,175.8);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAYA1IglgxIgNANIAAAkIgOAAIAAhpIAOAAIAAA0IAvg0IARAAIgpAvIAsA6g");
	this.shape_20.setTransform(162.925,174.425);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_21.setTransform(150.625,174.125);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_22.setTransform(144.5,174.35);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgLIAPAAIAAgTIAMAAIAAATIAPAAIAAALIgPAAIAAAwQAAAEACADQACADAFgBIAHgBIAAALIgLACQgJAAgEgFg");
	this.shape_23.setTransform(140.025,174.9);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgPAmQgHgEgFgGQgDgGAAgHIANAAQABAHAFAEQAEAEAIAAQAHAAAGgDQAEgEAAgEQAAgGgEgDQgEgDgKgDQgKgCgGgCQgGgCgDgFQgDgEAAgGQAAgJAIgIQAJgGALAAQAOAAAJAGQAHAIABAKIgOAAQAAgFgEgEQgGgEgHAAQgGAAgEADQgFAEABAFQAAAEADADQAEACAKACQAKADAGADQAGACADAFQAEAEAAAHQAAAKgJAHQgIAGgOAAQgIAAgIgDg");
	this.shape_24.setTransform(133.9,175.8);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_25.setTransform(128.25,174.35);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_26.setTransform(124.25,175.725);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgWAeQgLgKABgSIAAgCQgBgLAFgKQAEgIAJgGQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAAMAGAGQAIAIAJAAQAGAAAFgDQAFgDAEgFIAIAHQgKAPgTAAQgPAAgKgLgAgMgXQgGAGgBALIAnAAIAAgBQgBgKgFgHQgEgFgJAAQgHAAgGAGg");
	this.shape_27.setTransform(117.45,175.8);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgLIAPAAIAAgTIAMAAIAAATIAPAAIAAALIgPAAIAAAwQAAAEACADQACADAFgBIAHgBIAAALIgLACQgJAAgEgFg");
	this.shape_28.setTransform(110.775,174.9);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_29.setTransform(105.275,174.125);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_30.setTransform(96.875,175.8);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_31.setTransform(90.65,175.725);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_32.setTransform(83.625,175.8);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AAYA1IglgxIgNANIAAAkIgOAAIAAhpIAOAAIAAA0IAvg0IARAAIgpAvIAsA6g");
	this.shape_33.setTransform(75.475,174.425);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQABgIgEgEQgDgEgIAAQgFAAgFADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_34.setTransform(395.9,210.675);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgWAgQgIgGAAgKQAAgLAKgGQAIgGAPAAIAMAAIAAgFQAAgIgDgDQgFgEgHAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgGAHgDQAGgCAHAAQANAAAIAGQAGAHABALIAAAgQAAALADAGIAAABIgOAAIgCgIQgJAKgKgBQgMABgGgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgCQAGgEACgFIAAgPIgKAAQgWAAAAAOg");
	this.shape_35.setTransform(388.25,210.75);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AASAlIgSg3IgRA3IgKAAIgWhJIANAAIAOA2IASg2IAJAAIARA3IAPg3IAMAAIgVBJg");
	this.shape_36.setTransform(379.2,210.75);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgVAcQgJgJAAgRIAAgCQAAgLAEgIQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAKAAARIAAAFIgxAAQABAKAGAIQAGAGAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPAAgJgKgAgLgVQgFAFgBAKIAkAAIAAgBQgBgJgEgFQgFgGgIAAQgHAAgFAGg");
	this.shape_37.setTransform(370.325,210.75);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AAZAyIAAguIgxAAIAAAuIgNAAIAAhjIANAAIAAArIAxAAIAAgrIANAAIAABjg");
	this.shape_38.setTransform(361.525,209.475);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AAQA1IgZgiIgIAIIAAAaIgNAAIAAhpIANAAIAAA/IAHgIIAWgXIAPAAIgcAdIAgAsg");
	this.shape_39.setTransform(350.025,209.2);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgGAzIAAhJIANAAIAABJgAgFglQgCgCAAgDQAAgDACgCQADgCACAAQAEAAACACQACACAAADQAAADgCACQgCACgEAAQgCAAgDgCg");
	this.shape_40.setTransform(344.3,209.4);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_41.setTransform(340.125,209.925);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgDgGQgFgFAAgHIANAAQAAAHAFAEQAFADAHAAQAHAAAEgDQAEgDAAgFQAAgFgDgDQgEgCgJgCQgJgCgGgDQgFgDgDgDQgDgEAAgGQAAgJAHgGQAJgGALAAQAMAAAIAGQAIAHAAAKIgNAAQAAgFgEgEQgFgEgGAAQgGAAgFADQgEADABAFQgBAEAEADIANAFQAJACAGACQAFADAEAEQADAEAAAFQAAAKgIAHQgJAFgMAAQgIAAgHgDg");
	this.shape_42.setTransform(334.45,210.75);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgFAzIAAhJIALAAIAABJgAgFglQgBgCAAgDQAAgDABgCQACgCADAAQAEAAABACQACACABADQgBADgCACQgBACgEAAQgDAAgCgCg");
	this.shape_43.setTransform(329.15,209.4);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIAMAAIAAAIQAGgKALAAIAGABIAAAMIgGAAQgMAAgFAKIAAA0g");
	this.shape_44.setTransform(325.45,210.675);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgVAcQgJgJAAgRIAAgCQAAgLAEgIQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAKAAARIAAAFIgxAAQABAKAGAIQAGAGAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPAAgJgKgAgLgVQgFAFgBAKIAkAAIAAgBQgBgJgEgFQgFgGgIAAQgHAAgFAGg");
	this.shape_45.setTransform(319.075,210.75);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_46.setTransform(312.825,209.925);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AAQA1IgZgiIgIAIIAAAaIgNAAIAAhpIANAAIAAA/IAHgIIAWgXIAPAAIgcAdIAgAsg");
	this.shape_47.setTransform(307.675,209.2);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgWAgQgIgGABgKQgBgLAKgGQAIgGAPAAIANAAIAAgFQAAgIgFgDQgDgEgIAAQgGAAgEADQgFAEgBAEIgMAAQAAgFAEgFQAEgGAHgDQAHgCAGAAQANAAAHAGQAIAHAAALIAAAgQAAALADAGIAAABIgOAAIgBgIQgKAKgKgBQgMABgGgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAGgCQAFgEADgFIAAgPIgKAAQgXAAAAAOg");
	this.shape_48.setTransform(299.85,210.75);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIAMAAIAAAIQAGgKALAAIAGABIAAAMIgHAAQgLAAgFAKIAAA0g");
	this.shape_49.setTransform(294.05,210.675);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgXAgQgGgGAAgKQAAgLAJgGQAIgGAPAAIANAAIAAgFQgBgIgEgDQgEgEgHAAQgGAAgEADQgGAEAAAEIgMAAQAAgFAEgFQAEgGAGgDQAHgCAHAAQANAAAHAGQAIAHAAALIAAAgQAAALACAGIAAABIgNAAIgBgIQgKAKgLgBQgKABgIgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAGgCQAFgEADgFIAAgPIgKAAQgXAAAAAOg");
	this.shape_50.setTransform(287.5,210.75);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AAWAyIgigvIgMANIAAAiIgNAAIAAhjIANAAIAAAxIArgxIAQAAIgmAsIApA3g");
	this.shape_51.setTransform(279.875,209.475);

	this.instance_4 = new lib.info();
	this.instance_4.setTransform(801.15,190.3);

	this.g3 = new lib.g3();
	this.g3.name = "g3";
	this.g3.setTransform(849.3,270.5);

	this.g2 = new lib.g2();
	this.g2.name = "g2";
	this.g2.setTransform(732.35,270.5);

	this.g1 = new lib.g1();
	this.g1.name = "g1";
	this.g1.setTransform(614.35,270.5);

	this.cobaha = new lib.bg5();
	this.cobaha.name = "cobaha";
	this.cobaha.setTransform(675.75,358.05);

	this.drag2G1 = new lib.drag7G7();
	this.drag2G1.name = "drag2G1";
	this.drag2G1.setTransform(854.45,223.6,0.8086,0.8086,0,0,0,82.2,26.7);
	new cjs.ButtonHelper(this.drag2G1, 0, 1, 1);

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

	this.pieces = new lib.Pieces10();
	this.pieces.name = "pieces";

	this.slots = new lib.Slots10();
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

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AABAOQAIgKAAgLIAAgMIAPAAIAAALQAAAIgEAHQgEAIgGAFgAgXAOQAHgKABgLIAAgMIAPAAIAAALQAAAIgEAHQgEAIgHAFg");
	this.shape_52.setTransform(714.625,114.725);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_53.setTransform(709.625,119.325);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_54.setTransform(702.85,120.875);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_55.setTransform(696.075,119.325);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgGAAgJIAPAAQABAIAGAFQAFAEAJAAQAJAAAFgDQAFgEAAgGQAAgGgEgDQgFgEgLgCQgMgDgGgDQgHgDgDgFQgEgFAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAIAAAMIgQAAQAAgGgFgFQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALACAHAEQAIADADAFQAEAFAAAHQAAAMgKAIQgKAGgPABQgKAAgIgEg");
	this.shape_56.setTransform(685.425,120.95);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASgBIAPAAIAAgGQAAgJgEgFQgFgEgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgGAFgHQAEgGAIgEQAJgDAIgBQAQABAJAHQAIAIABANIAAApQAAAMADAHIAAACIgQAAQgBgCgBgIQgLAMgOAAQgNAAgIgIgAgUASQgBAHAFAEQAFAEAIAAQAGAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_57.setTransform(676.4,120.95);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_58.setTransform(669.725,119.075);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgLAJgFQAKgHAJAAQASAAAJAMQAKALAAAWIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_59.setTransform(663.225,120.95);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_60.setTransform(654.925,119.075);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AAvAuIAAg7QAAgJgEgFQgEgFgLAAQgIAAgGAFQgGAGAAAIIAAA7IgPAAIAAg6QAAgUgTAAQgPAAgFANIAABBIgQAAIAAhZIAOAAIABAKQAKgMAQAAQAUAAAFAPQAFgHAHgEQAHgEAKAAQAdAAABAgIAAA7g");
	this.shape_61.setTransform(638.4,120.875);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgGQABgJgFgFQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAFgHQAEgGAIgEQAJgDAIgBQAQABAJAHQAIAIABANIAAApQAAAMADAHIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgJgIgAgVASQABAHAEAEQAFAEAIAAQAGAAAGgDQAHgEACgGIAAgSIgMAAQgbAAAAAQg");
	this.shape_62.setTransform(626.3,120.95);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_63.setTransform(619.625,119.075);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAPAAIAAgGQAAgJgFgFQgFgEgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgGAEgHQAFgGAJgEQAIgDAJgBQAPABAJAHQAIAIABANIAAApQAAAMADAHIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgJgIgAgVASQABAHAEAEQAFAEAIAAQAGAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_64.setTransform(612.9,120.95);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgVIAAgBQAAgTAKgNQAKgNAQAAQAOABAKAKIAAgvIAPAAIAAB/IgOAAIgBgKQgJAMgQAAQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAIAKAAQAPABAHgNIAAgpQgHgMgPAAQgKAAgGAJg");
	this.shape_65.setTransform(603.275,119.15);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgGAAgJIAPAAQABAIAGAFQAFAEAJAAQAJAAAFgDQAFgEAAgGQAAgGgEgDQgFgEgLgCQgMgDgGgDQgHgDgDgFQgEgFAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAIAAAMIgQAAQAAgGgFgFQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALACAHAEQAIADADAFQAEAFAAAHQAAAMgKAIQgKAGgPABQgKAAgIgEg");
	this.shape_66.setTransform(590.125,120.95);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgLAJgFQAKgHAJAAQASAAAJAMQAKALAAAWIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_67.setTransform(581.325,120.95);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_68.setTransform(574.675,119.325);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgGAAgJIAPAAQABAIAGAFQAFAEAJAAQAJAAAFgDQAFgEAAgGQAAgGgEgDQgFgEgLgCQgMgDgGgDQgHgDgDgFQgEgFAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAIAAAMIgQAAQAAgGgFgFQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALACAHAEQAIADADAFQAEAFAAAHQAAAMgKAIQgKAGgPABQgKAAgIgEg");
	this.shape_69.setTransform(568.225,120.95);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgLAJgFQAKgHAJAAQASAAAJAMQAKALAAAWIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_70.setTransform(559.425,120.95);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AglA/IAAh7IAOAAIABAJQAKgLAPAAQAQAAAKAMQAJAMAAAWIAAABQAAAUgJANQgKAMgQAAQgPAAgJgKIAAArgAgVgkIAAApQAGANAOAAQAKAAAHgJQAGgJABgQQgBgQgGgIQgHgJgKAAQgOAAgGANg");
	this.shape_71.setTransform(550.25,122.6);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgGAAgJIAPAAQABAIAGAFQAFAEAJAAQAJAAAFgDQAFgEAAgGQAAgGgEgDQgFgEgLgCQgMgDgGgDQgHgDgDgFQgEgFAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAIAAAMIgQAAQAAgGgFgFQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALACAHAEQAIADADAFQAEAFAAAHQAAAMgKAIQgKAGgPABQgKAAgIgEg");
	this.shape_72.setTransform(540.925,120.95);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_73.setTransform(527.65,120.875);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgGQABgJgFgFQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAFgHQAEgGAIgEQAJgDAIgBQAQABAJAHQAIAIABANIAAApQAAAMADAHIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgJgIgAgVASQABAHAEAEQAFAEAIAAQAGAAAGgDQAHgEACgGIAAgSIgMAAQgbAAAAAQg");
	this.shape_74.setTransform(518.3,120.95);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_75.setTransform(509.975,119.075);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASgBIAPAAIAAgGQAAgJgEgFQgFgEgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgGAFgHQAEgGAIgEQAJgDAIgBQAQABAJAHQAIAIABANIAAApQAAAMADAHIAAACIgQAAQgBgCgBgIQgLAMgOAAQgNAAgIgIgAgUASQgBAHAFAEQAFAEAIAAQAGAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_76.setTransform(500.45,120.95);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AglA/IAAh7IAOAAIABAJQAJgLAQAAQAQAAAKAMQAJAMAAAWIAAABQAAAUgJANQgKAMgQAAQgPAAgKgKIAAArgAgWgkIAAApQAIANAOAAQAJAAAHgJQAHgJgBgQQABgQgHgIQgHgJgJAAQgOAAgIANg");
	this.shape_77.setTransform(491.25,122.6);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgJALgQAAQgOAAgIgIg");
	this.shape_78.setTransform(481.625,121.025);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_79.setTransform(474.525,120.875);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgLAJgFQAKgHAJAAQASAAAJAMQAKALAAAWIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_80.setTransform(466.775,120.95);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgJgFgFQgEgFgLAAQgIAAgGAFQgFAGgCAIIAAA7IgOAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgPAAIAAhZIAPAAIAAAKQAKgMARAAQASAAAHAPQAEgHAHgEQAHgEAKAAQAeAAAAAgIAAA7g");
	this.shape_81.setTransform(454.75,120.875);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgSA7QgKgEgFgHIAJgJQAKAMAOAAQAKAAAGgHQAHgGgBgLIAAgIQgJALgPAAQgPAAgKgNQgKgMAAgWQAAgUAKgNQAJgNARAAQAPAAAJAMIABgKIAOAAIAABXQAAARgKAKQgLAKgRAAQgJABgJgFgAgPgoQgGAIgBARQABAPAGAIQAGAIAKAAQAPABAGgNIAAgpQgGgMgPAAQgKAAgGAJg");
	this.shape_82.setTransform(438.15,122.65);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_83.setTransform(428.85,120.875);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQALgHASgBIAPAAIAAgGQAAgJgFgFQgFgEgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgGAEgHQAGgGAIgEQAIgDAJgBQAPABAJAHQAJAIAAANIAAApQAAAMADAHIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgJgIgAgVASQABAHAEAEQAFAEAHAAQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_84.setTransform(419.5,120.95);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgbA/IgFgBIAAgNIAEABQAIAAAEgEQAEgDADgIIAEgJIgghYIAQAAIAWBCIAVhCIAQAAIgkBnQgHAWgTAAg");
	this.shape_85.setTransform(410.875,122.775);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAAAAgIAAA7g");
	this.shape_86.setTransform(397.95,120.875);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgGQABgJgFgFQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAFgHQAFgGAHgEQAJgDAIgBQAQABAJAHQAJAIAAANIAAApQAAAMADAHIAAACIgQAAQgBgCgBgIQgLAMgNAAQgOAAgJgIgAgUASQAAAHAEAEQAFAEAIAAQAGAAAGgDQAHgEACgGIAAgSIgMAAQgaAAAAAQg");
	this.shape_87.setTransform(388.6,120.95);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AAVAtIgVhDIgVBDIgMAAIgahZIAPAAIASBDIAVhDIALAAIAVBEIAShEIAPAAIgaBZg");
	this.shape_88.setTransform(377.575,120.95);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgLAJgFQAKgHAJAAQASAAAJAMQAKALAAAWIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_89.setTransform(366.775,120.95);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAh/IAQAAIAAAxQAKgNAPAAQAdAAAAAfIAAA8g");
	this.shape_90.setTransform(357.55,119.075);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgTAGIAAgLIAnAAIAAALg");
	this.shape_91.setTransform(350.475,120.325);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_92.setTransform(343.45,120.875);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQALgHARgBIAQAAIAAgGQgBgJgEgFQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAEgHQAGgGAIgEQAIgDAJgBQAPABAJAHQAJAIAAANIAAApQAAAMADAHIAAACIgQAAQgCgCAAgIQgLAMgOAAQgNAAgIgIgAgVASQAAAHAFAEQAFAEAHAAQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_93.setTransform(334.1,120.95);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AAVAtIgVhDIgVBDIgMAAIgahZIAPAAIASBDIAVhDIALAAIAVBEIAShEIAPAAIgaBZg");
	this.shape_94.setTransform(323.075,120.95);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgLAJgFQAKgHAJAAQASAAAJAMQAKALAAAWIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_95.setTransform(312.275,120.95);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgPAAIAAh/IAPAAIAAAxQAKgNAPAAQAdAAABAfIAAA8g");
	this.shape_96.setTransform(303.05,119.075);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_97.setTransform(289.45,120.875);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQALgHARgBIAQAAIAAgGQgBgJgEgFQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAEgHQAGgGAIgEQAIgDAJgBQAPABAJAHQAJAIAAANIAAApQAAAMADAHIAAACIgQAAQgCgCAAgIQgLAMgOAAQgNAAgIgIgAgVASQAAAHAFAEQAFAEAHAAQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_98.setTransform(280.1,120.95);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_99.setTransform(271.775,119.075);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_100.setTransform(263.175,119.075);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgJALgQAAQgOAAgIgIg");
	this.shape_101.setTransform(253.625,121.025);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgGAAgJIAPAAQABAIAGAFQAFAEAJAAQAJAAAFgDQAFgEAAgGQAAgGgEgDQgFgEgLgCQgMgDgGgDQgHgDgDgFQgEgFAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAIAAAMIgQAAQAAgGgFgFQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALACAHAEQAIADADAFQAEAFAAAHQAAAMgKAIQgKAGgPABQgKAAgIgEg");
	this.shape_102.setTransform(244.575,120.95);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQALgHARgBIAQAAIAAgGQgBgJgEgFQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAEgHQAGgGAIgEQAIgDAJgBQAPABAJAHQAJAIAAANIAAApQAAAMADAHIAAACIgQAAQgCgCAAgIQgLAMgOAAQgNAAgIgIgAgVASQAAAHAFAEQAFAEAHAAQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_103.setTransform(235.55,120.95);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AAvAuIAAg7QAAgJgEgFQgEgFgLAAQgIAAgGAFQgGAGAAAIIAAA7IgPAAIAAg6QAAgUgTAAQgPAAgFANIAABBIgQAAIAAhZIAOAAIABAKQAKgMAQAAQAUAAAFAPQAFgHAHgEQAHgEAKAAQAdAAABAgIAAA7g");
	this.shape_104.setTransform(223.5,120.875);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAAAAgIAAA7g");
	this.shape_105.setTransform(780.35,96.225);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQALgHASgBIAOAAIAAgGQABgIgFgGQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAFgGAHgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgBgCgBgIQgLAMgOAAQgNAAgJgIgAgUASQgBAHAFAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_106.setTransform(771,96.3);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgCQAAgTAKgNQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgKQgJAMgQAAQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAIAKAAQAPABAHgNIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_107.setTransform(761.375,94.5);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgfApQgIgHAAgMQABgPANgHQAMgJATAAIARAAIABgHQABgJgEgFQgFgFgIAAQgIAAgFADQgHAFgBAGIgQABQABgIAFgHQAGgHAJgDQAIgDAKgBQAOABAJAIQAIAJgBAPIgIAuIgBAHQAAAEACAFIgBABIgQAAIAAgFIAAgEQgNAMgOgBQgNAAgHgIgAgNAGQgIAFgBAJQgBAGAEAEQAEAFAHAAQAIABAGgFQAGgEAFgGIAEgTIgMAAQgOAAgIAEg");
	this.shape_108.setTransform(747.4791,96.05);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AgeAkQgKgMABgVIABgDQABgOAHgLQAHgMAKgFQAKgHALAAQAOABAJAJQAIAKABAQIgBALIgBAGIg9AAQgBANAGAKQAFAIAMABQANAAAMgNIAJAIQgGAIgJAGQgKAEgKAAQgSAAgKgNgAgJgdQgIAIgEAOIAtAAIAAgCQACgLgFgHQgFgIgJAAIgBAAQgJAAgGAGg");
	this.shape_109.setTransform(738.3652,96.05);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AAPAwIALg9IAAgIQgCgMgNAAQgNgBgLAPIgMBDIgQAAIARheIAPAAIgCANQAMgOAQgBQANABAHAJQAGAJgBAQIgLA9g");
	this.shape_110.setTransform(728.3891,95.95);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgSBBIAQheIAPAAIgPBegAADgvQgDgDAAgEQABgEACgDQADgCAEgBQAEAAADACQACADAAAEQAAAEgCADQgDADgEAAQgEAAgDgCg");
	this.shape_111.setTransform(721.975,94.3);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AglA6QgIgKgBgRIABgMQABgOAHgLQAGgMAJgGQAJgFALgBQAPABAIALIAKgyIAQAAIgYCGIgOAAIABgJQgKAMgQgBQgOAAgHgKgAgPgKQgIAGgDAJQgEALAAAMQAAAMAEAIQAFAGAJABQANAAALgPIAHgrQgFgNgOABIAAgBQgJAAgGAGg");
	this.shape_112.setTransform(715.0667,94.15);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AgjAmQgHgJACgQIAKg9IAQAAIgKA9IAAAHQAAAHADADQAEAEAGABQAQAAAJgPIAMhEIAQAAIgRBeIgPAAIACgJQgLALgQAAQgOAAgGgKg");
	this.shape_113.setTransform(705.0859,96.15);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AgdAxIAQheIAOAAIgBALQAJgOAOABIAIABIgCAPIgHgBQgQAAgIAOIgLBDg");
	this.shape_114.setTransform(697.3,95.9491);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AgSBBIAQheIAPAAIgPBegAADgvQgDgDAAgEQABgEACgDQADgCAEgBQAEAAADACQACADAAAEQAAAEgCADQgDADgEAAQgEAAgDgCg");
	this.shape_115.setTransform(692.025,94.3);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AAUBAIALg7Ig+AAIgKA7IgRAAIAWh/IARAAIgKA3IA+AAIAJg3IARAAIgWB/g");
	this.shape_116.setTransform(683.55,94.4);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgIIAPAAQABAIAGAFQAFAEAJAAQAJAAAFgDQAFgEAAgGQAAgGgEgDQgFgEgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAJAAALIgQAAQAAgFgFgGQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALACAHAEQAIADADAFQAEAFAAAHQAAAMgKAIQgKAGgPABQgKAAgIgEg");
	this.shape_117.setTransform(668.575,96.3);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQALgHARgBIAQAAIAAgGQgBgIgEgGQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAFgGAJgEQAIgEAJAAQAPABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgBgCgBgIQgLAMgOAAQgNAAgIgIgAgVASQAAAHAFAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgMAAQgcAAAAAQg");
	this.shape_118.setTransform(659.55,96.3);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_119.setTransform(652.875,94.425);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_120.setTransform(646.375,96.3);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_121.setTransform(638.075,94.425);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_122.setTransform(625.275,94.425);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_123.setTransform(618.325,94.675);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgWIAPAAIAAAWIAQAAIAAAMIgQAAIAAA3QAAAFACADQACADAGgBIAHgBIAAANIgMACQgLgBgDgGg");
	this.shape_124.setTransform(613.2,95.3);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgIIAPAAQABAIAGAFQAFAEAJAAQAJAAAFgDQAFgEAAgGQAAgGgEgDQgFgEgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAJAAALIgQAAQAAgFgFgGQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALACAHAEQAIADADAFQAEAFAAAHQAAAMgKAIQgKAGgPABQgKAAgIgEg");
	this.shape_125.setTransform(606.325,96.3);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_126.setTransform(599.875,94.675);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_127.setTransform(595.375,96.225);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_128.setTransform(587.625,96.3);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgWIAPAAIAAAWIAQAAIAAAMIgQAAIAAA3QAAAFACADQACADAGgBIAHgBIAAANIgMACQgLgBgDgGg");
	this.shape_129.setTransform(580,95.3);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_130.setTransform(573.775,94.425);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASgBIAPAAIAAgGQAAgIgEgGQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAFgGQAEgGAIgEQAJgEAIAAQAQABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgBgCgBgIQgLAMgOAAQgNAAgIgIgAgUASQgBAHAFAEQAFAFAHgBQAHAAAHgDQAGgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_131.setTransform(564.25,96.3);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_132.setTransform(557.225,96.225);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgGQABgIgFgGQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAFgGAHgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgBgCgBgIQgLAMgNAAQgOAAgJgIgAgUASQAAAHAEAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgMAAQgaAAAAAQg");
	this.shape_133.setTransform(549.25,96.3);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_134.setTransform(540.925,94.425);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_135.setTransform(529.425,96.225);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgGQABgIgFgGQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAEgGQAFgGAIgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgJgIgAgVASQABAHAEAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgMAAQgbAAAAAQg");
	this.shape_136.setTransform(521.45,96.3);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgQAAIAAgMIAQAAIAAgWIAOAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFACADQADADAFgBIAHgBIAAANIgLACQgKgBgFgGg");
	this.shape_137.setTransform(513.8,95.3);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AgMBAIAAhNIgOAAIAAgMIAOAAIAAgIQAAgPAIgIQAGgIAOABIALABIgBAMIgIgBQgIAAgEAFQgEAEAAAIIAAAJIATAAIAAAMIgTAAIAABNg");
	this.shape_138.setTransform(508.625,94.35);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgGQABgIgFgGQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAEgGQAFgGAIgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgJgIgAgUASQAAAHAEAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgMAAQgbAAABAQg");
	this.shape_139.setTransform(500.75,96.3);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgCQAAgTAKgNQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgKQgJAMgQAAQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAIAKAAQAPABAHgNIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_140.setTransform(491.125,94.5);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_141.setTransform(477.65,96.225);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQALgHARgBIAQAAIAAgGQgBgIgEgGQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAFgGAJgEQAIgEAJAAQAPABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgCgCAAgIQgLAMgOAAQgNAAgIgIgAgVASQAAAHAFAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgMAAQgcAAAAAQg");
	this.shape_142.setTransform(468.3,96.3);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("AgSA7QgKgEgFgHIAJgJQAJAMAPAAQAKAAAGgHQAGgGAAgLIAAgIQgJALgPAAQgPAAgKgNQgKgMAAgWQAAgUAKgNQAJgNAQAAQAQAAAJAMIABgKIAOAAIAABXQAAASgKAJQgLAKgRAAQgJABgJgFgAgPgoQgHAIAAARQAAAPAHAIQAGAIAKAAQAPABAGgNIAAgpQgGgNgPABQgKgBgGAKg");
	this.shape_143.setTransform(458.75,98);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_144.setTransform(449.45,96.225);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_145.setTransform(440.325,96.3);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgCQAAgTAKgNQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgKQgJAMgQAAQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAIAKAAQAPABAHgNIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_146.setTransform(430.725,94.5);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_147.setTransform(417.25,96.225);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQALgHARgBIAQAAIAAgGQgBgIgEgGQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAGgGAIgEQAIgEAJAAQAPABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgIgIgAgVASQAAAHAFAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_148.setTransform(407.9,96.3);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("AAVAtIgVhDIgVBDIgMAAIgahZIAPAAIASBCIAVhCIALAAIAVBEIAShEIAPAAIgaBZg");
	this.shape_149.setTransform(396.875,96.3);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_150.setTransform(386.075,96.3);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgPAAIAAh/IAPAAIAAAxQAKgNAPAAQAdAAABAfIAAA8g");
	this.shape_151.setTransform(376.85,94.425);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_152.setTransform(364.225,94.425);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_153.setTransform(357.275,94.675);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgQAAIAAgMIAQAAIAAgWIAOAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFACADQADADAFgBIAIgBIAAANIgMACQgLgBgEgGg");
	this.shape_154.setTransform(352.15,95.3);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgIIAPAAQABAIAGAFQAFAEAJAAQAJAAAFgDQAFgEAAgGQAAgGgEgDQgFgEgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAJAAALIgQAAQAAgFgFgGQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALACAHAEQAIADADAFQAEAFAAAHQAAAMgKAIQgKAGgPABQgKAAgIgEg");
	this.shape_155.setTransform(345.275,96.3);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_156.setTransform(338.825,94.675);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_157.setTransform(334.325,96.225);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_158.setTransform(326.575,96.3);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgQAAIAAgMIAQAAIAAgWIAOAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFACADQADADAFgBIAHgBIAAANIgLACQgKgBgFgGg");
	this.shape_159.setTransform(318.95,95.3);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_160.setTransform(312.725,94.425);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgGQABgIgFgGQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAEgGQAFgGAIgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgJgIgAgVASQABAHAEAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgMAAQgaAAgBAQg");
	this.shape_161.setTransform(303.2,96.3);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_162.setTransform(296.175,96.225);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQALgHARgBIAQAAIAAgGQgBgIgEgGQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAGgGAIgEQAIgEAJAAQAPABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgCgCAAgIQgLAMgOAAQgNAAgIgIgAgVASQAAAHAFAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_163.setTransform(288.2,96.3);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_164.setTransform(279.875,94.425);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_165.setTransform(268.375,96.225);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQALgHARgBIAQAAIAAgGQgBgIgEgGQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAGgGAIgEQAIgEAJAAQAPABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgCgCAAgIQgLAMgOAAQgNAAgIgIgAgVASQAAAHAFAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgMAAQgcAAAAAQg");
	this.shape_166.setTransform(260.4,96.3);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FFFFFF").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgWIAPAAIAAAWIAQAAIAAAMIgQAAIAAA3QAAAFACADQACADAGgBIAHgBIAAANIgMACQgLgBgDgGg");
	this.shape_167.setTransform(252.75,95.3);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#FFFFFF").s().p("AgMBAIAAhNIgOAAIAAgMIAOAAIAAgIQAAgPAIgIQAGgIAOABIALABIgBAMIgIgBQgIAAgEAFQgEAEAAAIIAAAJIATAAIAAAMIgTAAIAABNg");
	this.shape_168.setTransform(247.575,94.35);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQALgHARgBIAQAAIAAgGQgBgIgEgGQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAGgGAIgEQAIgEAJAAQAPABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgBgCgBgIQgLAMgOAAQgNAAgIgIgAgVASQAAAHAFAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgMAAQgcAAAAAQg");
	this.shape_169.setTransform(239.7,96.3);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgCQAAgTAKgNQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgKQgJAMgQAAQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAIAKAAQAPABAHgNIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_170.setTransform(230.075,94.5);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAAAAgIAAA7g");
	this.shape_171.setTransform(216.6,96.225);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgGQABgIgFgGQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAFgGAHgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgBgCgBgIQgLAMgNAAQgOAAgJgIgAgUASQAAAHAEAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgMAAQgaAAAAAQg");
	this.shape_172.setTransform(207.25,96.3);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_173.setTransform(198.925,94.425);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#FFFFFF").s().p("AgdAiQgLgNAAgUIAAgBQAAgNAGgKQAFgLAIgGQAKgFALgBQASAAALANQAMANAAAUIAAABQAAANgFAKQgFALgKAGQgJAGgMAAQgRAAgMgNgAgRgYQgIAJABAQQgBAPAIAJQAGAJALAAQALAAAIgJQAGgJABgQQgBgPgGgIQgIgKgLAAQgLAAgGAJg");
	this.shape_174.setTransform(189.2,96.3);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgVIAAgCQAAgNAFgKQAFgKAJgGQAJgGALAAQAPABAKAIQAKAJABAPIgPAAQgBgJgFgFQgGgGgJAAQgKAAgHAJQgGAIgBAQIAAACQABAQAGAHQAHAJAKAAQAJAAAFgFQAHgFAAgIIAPAAQgBAIgFAHQgFAIgHADQgJAFgJAAQgRAAgLgNg");
	this.shape_175.setTransform(180,96.3);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#FFFFFF").s().p("AgcAiQgMgNAAgUIAAgBQAAgNAFgKQAFgLAKgGQAJgFALgBQASAAALANQAMANAAAUIAAABQAAANgFAKQgFALgKAGQgJAGgMAAQgRAAgLgNgAgRgYQgIAJAAAQQAAAPAIAJQAHAJAKAAQALAAAHgJQAIgJAAgQQAAgPgIgIQgHgKgLAAQgKAAgHAJg");
	this.shape_176.setTransform(170.6,96.3);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#FFFFFF").s().p("AggAvQgNgPAAgaIAAgLQAAgRAFgNQAHgNAKgGQALgHAOAAQAUAAALALQAMAKACAUIgRAAQgBgPgIgGQgGgHgNAAQgPAAgIALQgJALAAAWIAAAKQABAUAHALQAJAMAOAAQANAAAHgGQAHgGACgPIARAAQgDAUgMAKQgMAKgTAAQgVAAgMgPg");
	this.shape_177.setTransform(160.4,94.75);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#FFFFFF").s().p("AACAUIAAgJQAAgJAEgHQAEgJAGgFIAJAGQgIAKAAALIAAAMgAgYAUIAAgJQAAgJAEgHQAEgJAHgFIAJAGQgIAKAAALIAAAMg");
	this.shape_178.setTransform(152.075,89.9);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.bf(img.Bitmap2, null, new cjs.Matrix2D(1,0,0,1,-499,-300)).s().p("EhN9Au4MAAAhdvMCb7AAAMAAABdvg");
	this.shape_179.setTransform(471,266.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.btnNextDasar1},{t:this.btnMenuDasar1},{t:this.btnBack3},{t:this.slots},{t:this.pieces},{t:this.judulKI},{t:this.Score},{t:this.drag2G1},{t:this.cobaha},{t:this.g1},{t:this.g2},{t:this.g3},{t:this.instance_4},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.instance_3},{t:this.instance_2},{t:this.restart},{t:this.btnInfo},{t:this.shape_6},{t:this.winMessage}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(452,236.2,518,330.00000000000006);
// library properties:
lib.properties = {
	id: 'E740BB847DF4864B949C99CD86B71105',
	width: 960,
	height: 540,
	fps: 24,
	color: "#34495E",
	opacity: 1.00,
	manifest: [
		{src:"images/_12.jpeg", id:"_12"},
		{src:"images/_13.jpeg", id:"_13"},
		{src:"images/Bitmap102copy.png", id:"Bitmap102copy"},
		{src:"images/Bitmap115.png", id:"Bitmap115"},
		{src:"images/Bitmap116.png", id:"Bitmap116"},
		{src:"images/Bitmap111.png", id:"Bitmap111"},
		{src:"images/Bitmap2.png", id:"Bitmap2"},
		{src:"images/_14.jpeg", id:"_14"},
		{src:"images/Bitmap3.png", id:"Bitmap3"},
		{src:"images/bookpngcopy.png", id:"bookpngcopy"},
		{src:"images/Bitmap108.png", id:"Bitmap108"},
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