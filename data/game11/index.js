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


(lib._8 = function() {
	this.initialize(img._8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,496,325);


(lib._10_1 = function() {
	this.initialize(img._10_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,400,265);


(lib.Bitmap108 = function() {
	this.initialize(img.Bitmap108);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,287,163);


(lib.Bitmap109 = function() {
	this.initialize(img.Bitmap109);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,287,163);


(lib.Bitmap111 = function() {
	this.initialize(img.Bitmap111);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,239,160);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);


(lib.Bitmap3 = function() {
	this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,249,87);


(lib.Bitmap110 = function() {
	this.initialize(img.Bitmap110);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,287,163);


(lib.Bitmap102copy = function() {
	this.initialize(img.Bitmap102copy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,233,124);


(lib.flash0aiAssets = function() {
	this.initialize(img.flash0aiAssets);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,369,180);


(lib.flash0aiAssets_1 = function() {
	this.initialize(img.flash0aiAssets_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,153,152);


(lib.flash0aiAssets_2 = function() {
	this.initialize(img.flash0aiAssets_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,153,152);


(lib.bookpngcopy = function() {
	this.initialize(img.bookpngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,399);


(lib.Gpngcopy = function() {
	this.initialize(img.Gpngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,379,257);


(lib.flash0aiAssets_3 = function() {
	this.initialize(img.flash0aiAssets_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,258);


(lib.G = function() {
	this.initialize(img.G);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,379,257);// helper functions:

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
	this.instance = new lib._8();
	this.instance.setTransform(-49.35,-37.5,0.199,0.2308);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g3, new cjs.Rectangle(-49.3,-37.5,98.69999999999999,75), null);


(lib.g2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.G();
	this.instance.setTransform(-49.3,-37.5,0.8976,1.0062);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g2, new cjs.Rectangle(-49.3,-37.5,98.69999999999999,75), null);


(lib.g1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._10();
	this.instance.setTransform(-51.75,-37.5,0.2587,0.283);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g1, new cjs.Rectangle(-51.7,-37.5,103.5,75), null);


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



(lib.Tween10copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Eg/RAu4MAAAhdvMB+jAAAMAAABdvg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-405,-300,810,600);


(lib.Tween10_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Eg/RAu4MAAAhdvMB+jAAAMAAABdvg");

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-405,-300,810,600);


(lib.Tween8copy2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3498DB").s().p("EhB5AkpMAAAhJRMCDzAAAMAAABJRg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-421.8,-234.5,843.6,469.1);


(lib.Tween8copy_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#603AD8").s().p("EhB5AkqMAAAhJSMCDzAAAMAAABJSg");

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

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


(lib.Tween7copy2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#603AD8").s().p("EhB5AkpMAAAhJRMCDzAAAMAAABJRg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-421.8,-234.5,843.6,469.1);


(lib.Tween7copy_1 = function(mode,startPosition,loop) {
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


(lib.Pieces1copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.kkoo_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#0193B0","#6DD5ED"],[0,1],-206.4,0,206.5,0).s().p("EggQAeUMAAAg8nMBAhAAAMAAAA8ng");
	this.shape_1.setTransform(404.0509,193.9287,1.9568,0.9997);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.kkoo_1, new cjs.Rectangle(0,0,808.1,387.9), null);


(lib.drag7G10copy2 = function(mode,startPosition,loop) {
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
	this.shape_9.graphics.f("#E67E22").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_9.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


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


(lib.Pathcopy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#606163").s().p("Ap/z/QEEAADvBlQDkBhCxCyQCxCwBiDmQBkDtAAEEQAAEEhkDuQhiDmixCxQixCxjkBhQjvBkkEAAg");
	this.shape.setTransform(64,127.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pathcopy, new cjs.Rectangle(0,0,128,255.9), null);


(lib.Path_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#606163").s().p("Ap/z/QEEAADvBlQDkBhCxCyQCxCwBiDmQBkDtAAEEQAAEEhkDuQhiDmixCxQixCxjkBhQjvBkkEAAg");
	this.shape_1.setTransform(64,127.95);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1, new cjs.Rectangle(0,0,128,255.9), null);


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


(lib.drop8G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgEQgEgFgJAAQgHAAgFAEQgFAEgBAHIAAA/IgVAAIAAg9QAAgRgRAAQgNAAgFAKIAABEIgVAAIAAhdIAUAAIAAAKQAKgNASAAQASAAAHAPQAKgPATAAQAQABAIAIQAHAJAAARIAAA9g");
	this.shape.setTransform(149.375,47);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgMIAAhCIAVAAIAABdIgUAAIAAgJQgKALgQAAQgPAAgIgJg");
	this.shape_1.setTransform(136.525,47.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgKBDIAAiGIAVAAIAACGg");
	this.shape_2.setTransform(129.25,45.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgKBDIAAiGIAVAAIAACGg");
	this.shape_3.setTransform(124.65,45.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgWIAAgCQAAgNAGgMQAFgLAKgGQAKgHALAAQAUAAAKANQALAMAAAXIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgMgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_4.setTransform(117.625,47.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgKAhIAAg1IgQAAIAAgQIAQAAIAAgXIAUAAIAAAXIARAAIAAAQIgRAAIAAA0QAAAFACADQACACAGAAIAHgBIAAARQgHACgHAAQgXAAAAgbg");
	this.shape_5.setTransform(109.475,46.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgEQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_6.setTransform(104.4,45.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgKBDIAAiGIAVAAIAACGg");
	this.shape_7.setTransform(99.8,45.1);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgZA6QgMgHgGgNQgHgOAAgRIAAgLQAAgSAHgOQAGgOAMgIQAMgHAPAAQAVAAANAMQANALACAVIgWAAQgCgOgGgGQgHgGgMAAQgOAAgHALQgIAKAAAVIAAAKQAAAVAHALQAHALAOAAQANAAAGgGQAHgGACgOIAWAAQgCAVgNALQgNAMgWAAQgPAAgLgIg");
	this.shape_8.setTransform(91.725,45.475);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(0.884,0,0,0.784,-109.9,-34.1)).s().p("AxLFVIAAqpMAiXAAAIAAKpg");
	this.shape_9.setTransform(125,48.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop8G5, new cjs.Rectangle(15,14.4,220,68.19999999999999), null);


(lib.drop8G4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AASBEIAAg+QAAgIgFgEQgDgFgJAAQgLAAgHALIAABEIgWAAIAAiGIAWAAIAAAyQALgNAPAAQAeAAAAAiIAAA/g");
	this.shape.setTransform(209.1,62);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_1.setTransform(199.225,64);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABDIgWAAIAAhfIAVAAIAAAMQALgNAQgBQAeAAABAjIAAA+g");
	this.shape_2.setTransform(189.35,63.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_3.setTransform(179.475,64);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgKAhIAAg1IgQAAIAAgQIAQAAIAAgXIAUAAIAAAXIARAAIAAAQIgRAAIAAA0QAAAFACACQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgbg");
	this.shape_4.setTransform(171.375,62.95);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABDIgVAAIAAhfIAUAAIAAAMQALgNAQgBQAeAAABAjIAAA+g");
	this.shape_5.setTransform(159.1,63.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_6.setTransform(149.225,64);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AARBEIgbgqIgJAKIAAAgIgWAAIAAiGIAWAAIAABNIAGgJIAagdIAZAAIgjAnIAnA4g");
	this.shape_7.setTransform(140.225,62);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAVAAIAAALQAGgNAOAAQAFABADABIgBAUIgIgBQgPAAgEAMIAABAg");
	this.shape_8.setTransform(132.2,63.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKALgQAAQgPAAgIgJg");
	this.shape_9.setTransform(123.575,64.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgUA4IgCALIgTAAIAAiGIAWAAIAAAwQAJgKAOgBQASABAKANQAKANAAAWIAAABQAAAWgKANQgKANgRAAQgQAAgJgMgAgTAAIAAAnQAFAMAOAAQAJAAAGgIQAFgHAAgPIAAgDQAAgPgFgHQgGgIgJAAQgOAAgFAMg");
	this.shape_10.setTransform(113.725,62.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AAuAxIAAg+QAAgJgEgDQgEgFgJAAQgHAAgFAEQgFAEgBAHIAABAIgVAAIAAg+QAAgRgRAAQgNAAgFAKIAABFIgVAAIAAhfIAUAAIAAAKQAKgLASgBQASAAAHAPQAKgPATAAQAQAAAIAJQAHAJAAARIAAA+g");
	this.shape_11.setTransform(100.625,63.9);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgNAGgLQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALAKQgFAJgKAFQgKAEgLAAQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_12.setTransform(88.075,64);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgVA/QgKgFgFgHIALgMQAJALAPAAQAKAAAFgFQAHgGAAgLIAAgHQgKALgOAAQgRAAgKgOQgLgNAAgXQAAgWAKgNQALgNARAAQAQAAAJALIABgJIATAAIAABbQAAATgLAKQgMALgTAAQgKAAgLgEgAgNgoQgHAIAAAQQAAAPAHAHQAFAIAKAAQAMAAAHgLIAAgpQgHgLgMAAQgKAAgFAJg");
	this.shape_13.setTransform(77.85,65.775);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgUA/QgLgFgFgHIAKgMQAKALAPAAQAJAAAHgFQAFgGAAgLIAAgHQgIALgPAAQgQAAgLgOQgLgNAAgXQAAgWALgNQAKgNASAAQAOAAAKALIABgJIATAAIAABbQAAATgLAKQgMALgTAAQgKAAgKgEgAgNgoQgHAIABAQQgBAPAHAHQAFAIAJAAQANAAAGgLIAAgpQgGgLgNAAQgJAAgFAJg");
	this.shape_14.setTransform(67.65,65.775);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABDIgVAAIAAhfIAUAAIAAAMQALgNAQgBQAeAAABAjIAAA+g");
	this.shape_15.setTransform(57.75,63.9);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgNAGgLQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALAKQgFAJgKAFQgKAEgLAAQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_16.setTransform(48.025,64);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AAuAxIAAg+QAAgJgEgDQgEgFgJAAQgHAAgFAEQgFAEgBAHIAABAIgVAAIAAg+QAAgRgRAAQgNAAgFAKIAABFIgVAAIAAhfIAUAAIAAAKQAKgLASgBQASAAAHAPQAKgPATAAQAQAAAIAJQAHAJAAARIAAA+g");
	this.shape_17.setTransform(35.275,63.9);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAArQAAAMAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_18.setTransform(214.325,38.4);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgVA/QgJgFgFgHIAKgMQAKALAOAAQAKAAAFgFQAHgGgBgLIAAgHQgJALgOAAQgQAAgLgOQgLgNAAgXQAAgWAKgNQALgNARAAQAQAAAJALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgKgEgAgOgoQgFAIAAAQQAAAPAFAHQAGAIAKAAQANAAAFgLIAAgpQgFgLgNAAQgKAAgGAJg");
	this.shape_19.setTransform(204.15,40.175);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgVA/QgKgFgFgHIALgMQAJALAPAAQAKAAAFgFQAHgGAAgLIAAgHQgKALgOAAQgRAAgKgOQgLgNAAgXQAAgWALgNQAKgNARAAQAQAAAJALIABgJIATAAIAABbQAAATgLAKQgMALgTAAQgKAAgLgEgAgNgoQgHAIAAAQQAAAPAHAHQAFAIAKAAQAMAAAHgLIAAgpQgHgLgMAAQgKAAgFAJg");
	this.shape_20.setTransform(193.95,40.175);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABCIgWAAIAAhdIAVAAIAAAKQALgMAQAAQAeAAABAhIAAA+g");
	this.shape_21.setTransform(184.05,38.3);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_22.setTransform(176.75,36.6);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AASBDIAAg9QAAgJgEgEQgFgEgIAAQgMAAgGALIAABDIgVAAIAAiGIAVAAIAAAzQALgMAOAAQAfAAABAiIAAA9g");
	this.shape_23.setTransform(169.45,36.4);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgVIAAgCQAAgNAGgMQAFgLAKgGQAKgHALABQAUAAAKAMQALAMAAAXIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_24.setTransform(159.725,38.4);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgTAtQgJgEgGgHQgEgIAAgJIAUAAQABAIAFAEQAGAEAHABQAJgBAEgDQAEgDAAgFQAAgGgEgDQgFgDgKgDQgLgCgHgDQgQgHAAgOQAAgNAKgIQALgJAOABQASgBAKAJQALAJAAANIgWAAQAAgGgEgEQgFgFgIAAQgFAAgFAEQgFADABAGQAAAEADADQAFADAMADQAMADAHADQAIADADAFQAEAGAAAHQAAANgMAJQgKAHgRABQgLAAgJgFg");
	this.shape_25.setTransform(150.1,38.4);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_26.setTransform(99.9,36.6);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgKBDIAAiGIAVAAIAACGg");
	this.shape_27.setTransform(95.3,36.4);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAArQAAAMAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_28.setTransform(88.125,38.4);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgVA/QgKgFgEgHIAKgMQAJALAPAAQAKAAAFgFQAHgGAAgLIAAgHQgKALgOAAQgRAAgKgOQgLgNAAgXQAAgWAKgNQALgNARAAQAPAAAKALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgKgEgAgOgoQgFAIgBAQQABAPAFAHQAGAIAKAAQAMAAAHgLIAAgpQgHgLgMAAQgKAAgGAJg");
	this.shape_29.setTransform(77.95,40.175);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgUA/QgKgFgGgHIAKgMQAKALAPAAQAJAAAHgFQAFgGABgLIAAgHQgKALgOAAQgQAAgLgOQgLgNAAgXQAAgWALgNQAKgNASAAQAPAAAJALIABgJIATAAIAABbQAAATgLAKQgMALgTAAQgKAAgKgEgAgNgoQgHAIAAAQQAAAPAHAHQAFAIAJAAQANAAAHgLIAAgpQgHgLgNAAQgJAAgFAJg");
	this.shape_30.setTransform(67.75,40.175);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABCIgVAAIAAhdIAUAAIAAAKQALgMAQAAQAeAAABAhIAAA+g");
	this.shape_31.setTransform(57.85,38.3);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgVIAAgCQAAgNAGgMQAFgLAKgGQAKgHALABQAUAAAKAMQALAMAAAXIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_32.setTransform(48.125,38.4);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AArBAIAAgqIADg4IgmBiIgPAAIgmhiIACA4IAAAqIgWAAIAAh/IAdAAIAkBhIAlhhIAdAAIAAB/g");
	this.shape_33.setTransform(35.325,36.75);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.165,0,0,1.218,-145,-53)).s().p("A2qISIAAwjMAtVAAAIAAQjg");
	this.shape_34.setTransform(121.7,51.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop8G4, new cjs.Rectangle(-23.4,-1,290.2,106), null);


(lib.drop8G3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABCIgWAAIAAhdIAVAAIAAAKQALgMAQAAQAeAAABAhIAAA+g");
	this.shape.setTransform(144.35,60.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAAqQAAANAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_1.setTransform(134.475,60.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAJIAAAfIgWAAIAAiGIAWAAIAABNIAGgIIAagcIAZAAIgjAmIAnA3g");
	this.shape_2.setTransform(125.475,58.45);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAAqQAAANAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_3.setTransform(115.325,60.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgeA3QgLgOAAgXQAAgUAKgOQALgNARAAQAOAAAJAKIAAgxIAWAAIAACGIgUAAIgBgKQgJANgPAAQgRAAgKgOgAgOgDQgFAHAAAQQAAAPAFAIQAGAIAJAAQANAAAGgMIAAgnQgGgMgNAAQgJAAgGAJg");
	this.shape_4.setTransform(105.175,58.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgVIAAgCQAAgNAGgMQAFgLAKgGQAKgHALABQAUAAAKAMQALAMAAAXIAAAIIg9AAQABALAGAHQAHAHAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_5.setTransform(95.575,60.45);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgUA4IgCAKIgTAAIAAiGIAWAAIAAAyQAJgLAOAAQASAAAKAMQAKANAAAWIAAACQAAAWgKANQgKAOgRAAQgQAAgJgNgAgTAAIAAAmQAFANAOAAQAJAAAGgHQAFgIAAgPIAAgDQAAgQgFgGQgGgIgJAAQgOAAgFAMg");
	this.shape_6.setTransform(85.775,58.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_7.setTransform(78.2,58.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgeA3QgLgOAAgXQAAgUAKgOQALgNARAAQAOAAAJAKIAAgxIAWAAIAACGIgUAAIgBgKQgJANgPAAQgRAAgKgOgAgOgDQgFAHAAAQQAAAPAFAIQAGAIAJAAQANAAAGgMIAAgnQgGgMgNAAQgJAAgGAJg");
	this.shape_8.setTransform(70.625,58.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAAqQAAANAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_9.setTransform(56.375,60.45);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgTAtQgJgEgFgHQgGgIAAgJIAVAAQABAIAFAEQAFAEAIABQAIgBAFgDQAEgDAAgFQAAgGgFgDQgEgDgKgCQgLgDgHgDQgQgHAAgOQAAgNAKgIQAKgJAQABQAQgBALAJQALAJAAANIgWAAQAAgGgEgEQgFgFgHAAQgHAAgEAEQgFADABAGQAAAEADADQAFADALADQANADAHADQAHADAEAGQADAFABAHQgBANgKAJQgLAHgRABQgLAAgJgFg");
	this.shape_10.setTransform(46.8,60.45);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgJBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_11.setTransform(39.9,58.65);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgUA4IgCAKIgTAAIAAiGIAWAAIAAAyQAJgLAOAAQASAAAKAMQAKANAAAWIAAACQAAAWgKANQgKAOgRAAQgQAAgJgNgAgTAAIAAAmQAFANAOAAQAJAAAGgHQAFgIAAgPIAAgDQAAgQgFgGQgGgIgJAAQgOAAgFAMg");
	this.shape_12.setTransform(32.725,58.55);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AARBDIgbgpIgJALIAAAeIgWAAIAAiFIAWAAIAABNIAGgJIAagdIAZAAIgjAnIAnA3g");
	this.shape_13.setTransform(215.075,32.85);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgHQAMgHAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_14.setTransform(204.925,34.85);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgUAKgOQALgOARAAQAOAAAJALIAAgwIAWAAIAACFIgUAAIgBgJQgJAMgPgBQgRAAgKgNgAgOgEQgFAIAAAQQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAIg");
	this.shape_15.setTransform(194.775,32.95);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgJBBIAAheIATAAIAABegAgIgtQgDgDAAgFQAAgFADgDQADgDAFgBQAGABADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_16.setTransform(187.6,33.05);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgKAhIAAg1IgQAAIAAgQIAQAAIAAgXIAUAAIAAAXIARAAIAAAQIgRAAIAAA0QAAAGACABQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgbg");
	this.shape_17.setTransform(182.075,33.8);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgHQAMgHAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_18.setTransform(152.975,34.85);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgKBDIAAiFIAVAAIAACFg");
	this.shape_19.setTransform(145.8,32.85);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgHQAMgHAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_20.setTransform(138.625,34.85);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgoBDIAAiDIATAAIABAKQAJgMAQAAQARAAAKANQAKANAAAXIAAACQgBAVgJANQgLANgQAAQgPAAgJgKIAAAtgAgTglIAAApQAGALAMAAQAKAAAGgIQAFgHAAgRQABgOgGgJQgGgIgKAAQgMAAgGALg");
	this.shape_21.setTransform(128.85,36.575);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgWIAAgCQAAgNAGgLQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABAMAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_22.setTransform(118.875,34.85);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AARBDIgbgpIgJALIAAAeIgWAAIAAiFIAWAAIAABNIAGgJIAagdIAZAAIgjAnIAnA3g");
	this.shape_23.setTransform(109.825,32.85);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABCIgVAAIAAheIAUAAIAAAMQALgNAQgBQAeAAABAiIAAA+g");
	this.shape_24.setTransform(78.1,34.75);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgHQAMgHAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_25.setTransform(68.225,34.85);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgJBBIAAheIATAAIAABegAgIgtQgDgDAAgFQAAgFADgDQADgDAFgBQAGABADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_26.setTransform(61.05,33.05);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgVA/QgJgFgGgHIAKgMQALALAOAAQAJAAAGgFQAGgGABgLIAAgHQgJALgPAAQgRAAgKgOQgLgNAAgXQAAgWALgNQAKgNARAAQAQAAAJALIABgJIATAAIAABbQAAATgLAKQgMALgTAAQgKAAgLgEgAgNgoQgHAIAAAQQAAAPAHAHQAFAIAKAAQAMAAAHgLIAAgpQgHgLgMAAQgKAAgFAJg");
	this.shape_27.setTransform(53.45,36.625);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgHQAMgHAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_28.setTransform(43.675,34.85);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgtBAIAAh/IAsAAQAVAAALAIQAMAKAAAQQAAAJgFAIQgFAGgJAEQAKACAGAIQAGAIAAAKQAAATgMAJQgMAKgVAAgAgXAuIAYAAQALAAAGgFQAFgFAAgKQAAgTgUgBIgaAAgAgXgJIAWAAQAKAAAGgEQAFgGAAgIQAAgJgFgFQgFgEgLAAIgWAAg");
	this.shape_29.setTransform(33.325,33.2);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.165,0,0,1.218,-145,-53)).s().p("A2qISIAAwjMAtVAAAIAAQjg");
	this.shape_30.setTransform(121.7,48.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop8G3, new cjs.Rectangle(-23.4,-4.6,290.2,106), null);


(lib.drop8G2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAVAAIAAAKQAGgMAOAAQAFAAADABIgBAUIgIgBQgPAAgEALIAABAg");
	this.shape.setTransform(180.8,60.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgfAkQgMgOAAgWIAAAAQAAgOAFgLQAGgLAKgHQAKgFAMAAQATAAAMAMQAMAMABAVIAAAEQAAAOgFALQgGALgKAGQgKAHgNAAQgTAAgMgOgAgQgXQgGAJAAAPQAAAPAGAIQAGAIAKAAQALAAAGgIQAGgIAAgQQAAgPgGgIQgHgIgKAAQgKAAgGAIg");
	this.shape_1.setTransform(172.125,60.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAGACACQACACAGAAIAHgBIAAARQgHACgHAAQgXAAAAgcg");
	this.shape_2.setTransform(163.775,59.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAJIAAAfIgWAAIAAiGIAWAAIAABNIAGgIIAagcIAZAAIgjAmIAnA3g");
	this.shape_3.setTransform(156.875,58.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAAqQAAANAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_4.setTransform(146.725,60.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAVAAIAAAKQAHgMANAAQAFAAADABIAAAUIgJgBQgPAAgDALIAABAg");
	this.shape_5.setTransform(139.1,60.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAGACACQACACAGAAIAHgBIAAARQgHACgHAAQgXAAAAgcg");
	this.shape_6.setTransform(132.275,59.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgVIAAgCQAAgNAGgMQAFgLAKgGQAKgHALABQAUAAAKAMQALAMAAAXIAAAIIg9AAQABALAGAHQAHAHAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_7.setTransform(124.775,60.45);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAUAAIABAKQAGgMAPAAQAEAAADABIgBAUIgIgBQgOAAgFALIAABAg");
	this.shape_8.setTransform(117.1,60.35);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgTAtQgJgEgFgHQgGgIAAgJIAVAAQABAIAFAEQAFAEAIABQAJgBAEgDQAEgDAAgFQAAgGgEgDQgFgDgKgCQgLgDgHgDQgQgHAAgOQAAgNAKgIQALgJAOABQASgBAKAJQALAJAAANIgWAAQAAgGgEgEQgFgFgIAAQgFAAgFAEQgFADABAGQAAAEADADQAFADALADQANADAHADQAHADAEAGQADAFABAHQgBANgKAJQgLAHgRABQgLAAgJgFg");
	this.shape_9.setTransform(104.3,60.45);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgMIAAhCIAVAAIAABdIgUAAIAAgJQgKAMgQAAQgPAAgIgKg");
	this.shape_10.setTransform(94.675,60.55);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgKBDIAAiGIAVAAIAACGg");
	this.shape_11.setTransform(87.4,58.45);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgMIAAhCIAVAAIAABdIgUAAIAAgJQgKAMgQAAQgPAAgIgKg");
	this.shape_12.setTransform(80.075,60.55);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAJIAAAfIgWAAIAAiGIAWAAIAABNIAGgIIAagcIAZAAIgjAmIAnA3g");
	this.shape_13.setTransform(70.975,58.45);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgTAtQgJgEgGgHQgEgIAAgJIAUAAQABAIAFAEQAGAEAHABQAJgBAEgDQAEgDAAgFQAAgGgEgDQgFgDgKgCQgLgDgHgDQgQgHAAgOQAAgNAKgIQALgJAOABQASgBAKAJQALAJAAANIgWAAQAAgGgEgEQgFgFgIAAQgFAAgFAEQgFADABAGQAAAEADADQAFADAMADQAMADAHADQAIADADAGQAEAFAAAHQAAANgMAJQgKAHgRABQgLAAgJgFg");
	this.shape_14.setTransform(61,60.45);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgMIAAhCIAVAAIAABdIgUAAIAAgJQgKAMgQAAQgPAAgIgKg");
	this.shape_15.setTransform(51.375,60.55);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AAuAwIAAg8QAAgKgEgEQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgMASAAQASAAAHAOQAKgOATAAQAQAAAIAJQAHAIAAARIAAA9g");
	this.shape_16.setTransform(38.575,60.35);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABCIgVAAIAAheIAUAAIAAAMQALgNAQgBQAeAAABAiIAAA+g");
	this.shape_17.setTransform(217.5,34.75);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgHQAMgHAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_18.setTransform(207.625,34.85);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgUAKgOQALgOARAAQAOAAAJALIAAgwIAWAAIAACFIgUAAIgBgJQgJAMgPgBQgRAAgKgNgAgOgEQgFAIAAAQQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAIg");
	this.shape_19.setTransform(197.475,32.95);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgYAwIAAheIAVAAIAAALQAGgNAOAAQAFABADABIgBAUIgIgBQgPAAgEAMIAAA/g");
	this.shape_20.setTransform(185.3,34.75);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgfAkQgMgNAAgXIAAAAQAAgOAFgLQAGgMAKgFQAKgHAMAAQATAAAMANQAMAMABAVIAAAEQAAAOgFALQgGALgKAGQgKAGgNAAQgTAAgMgNgAgQgXQgGAIAAAQQAAAOAGAJQAGAIAKAAQALAAAGgIQAGgJAAgPQAAgPgGgIQgHgIgKAAQgKAAgGAIg");
	this.shape_21.setTransform(176.625,34.85);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgKAhIAAg1IgQAAIAAgQIAQAAIAAgXIAUAAIAAAXIARAAIAAAQIgRAAIAAA0QAAAGACABQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgbg");
	this.shape_22.setTransform(168.275,33.8);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AARBDIgbgpIgJALIAAAeIgWAAIAAiFIAWAAIAABNIAGgJIAagdIAZAAIgjAnIAnA3g");
	this.shape_23.setTransform(161.375,32.85);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgHQAMgHAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_24.setTransform(151.225,34.85);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgKAhIAAg1IgQAAIAAgQIAQAAIAAgXIAUAAIAAAXIARAAIAAAQIgRAAIAAA0QAAAGACABQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgbg");
	this.shape_25.setTransform(143.125,33.8);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgfAkQgMgNAAgXIAAAAQAAgOAFgLQAGgMAKgFQAKgHAMAAQATAAAMANQAMAMABAVIAAAEQAAAOgFALQgGALgKAGQgKAGgNAAQgTAAgMgNgAgQgXQgGAIAAAQQAAAOAGAJQAGAIAKAAQALAAAGgIQAGgJAAgPQAAgPgGgIQgHgIgKAAQgKAAgGAIg");
	this.shape_26.setTransform(135.275,34.85);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgYAwIAAheIAVAAIAAALQAHgNANAAQAFABADABIAAAUIgJgBQgPAAgDAMIAAA/g");
	this.shape_27.setTransform(127.4,34.75);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgpBDIAAiDIAUAAIABAKQAJgMAPAAQASAAAKANQAJANAAAXIAAACQABAVgLANQgKANgQAAQgPAAgJgKIAAAtgAgTglIAAApQAFALANAAQAKAAAFgIQAHgHAAgRQgBgOgFgJQgGgIgKAAQgNAAgFALg");
	this.shape_28.setTransform(118.9,36.575);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgTAtQgJgEgFgIQgGgHAAgIIAVAAQABAHAFAEQAFAFAIgBQAIAAAFgDQAEgDAAgGQAAgFgFgDQgEgDgKgCQgLgDgHgDQgQgHAAgPQAAgMAKgIQAKgJAQAAQAQAAALAJQALAIAAAOIgWAAQAAgGgEgEQgFgEgHAAQgHAAgEADQgFADABAFQAAAFADADQAFADALADQANADAHAEQAHACAEAGQADAFABAHQgBAOgKAHQgLAJgRgBQgLABgJgFg");
	this.shape_29.setTransform(104.4,34.85);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgMIAAhDIAVAAIAABeIgUAAIAAgJQgKALgQAAQgPAAgIgJg");
	this.shape_30.setTransform(94.775,34.95);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgJBDIAAiFIAUAAIAACFg");
	this.shape_31.setTransform(87.5,32.85);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgMIAAhDIAVAAIAABeIgUAAIAAgJQgKALgQAAQgPAAgIgJg");
	this.shape_32.setTransform(80.175,34.95);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AARBDIgbgpIgJALIAAAeIgWAAIAAiFIAWAAIAABNIAGgJIAagdIAZAAIgjAnIAnA3g");
	this.shape_33.setTransform(71.075,32.85);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgTAtQgJgEgFgIQgGgHAAgIIAVAAQABAHAFAEQAFAFAIgBQAJAAAEgDQAEgDAAgGQAAgFgEgDQgFgDgKgCQgLgDgHgDQgQgHAAgPQAAgMAKgIQALgJAOAAQASAAAKAJQALAIAAAOIgWAAQAAgGgEgEQgFgEgIAAQgFAAgFADQgFADABAFQAAAFADADQAFADALADQANADAHAEQAHACAEAGQADAFABAHQgBAOgKAHQgLAJgRgBQgLABgJgFg");
	this.shape_34.setTransform(61.1,34.85);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgMIAAhDIAVAAIAABeIgUAAIAAgJQgKALgQAAQgPAAgIgJg");
	this.shape_35.setTransform(51.475,34.95);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AArBAIAAgqIADg3IgmBhIgPAAIgmhhIACA3IAAAqIgWAAIAAh/IAdAAIAkBhIAlhhIAdAAIAAB/g");
	this.shape_36.setTransform(38.625,33.2);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.165,0,0,1.218,-145,-53)).s().p("A2qISIAAwjMAtVAAAIAAQjg");
	this.shape_37.setTransform(125,48.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop8G2, new cjs.Rectangle(-20.1,-4.6,290.20000000000005,106), null);


(lib.drop8G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


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


(lib.drag8G11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap110();
	this.instance.setTransform(0,-3,0.3136,0.4294);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AAHAaIgHgSIgNASIgNAAIAVgaIgMgaIAMAAIAGASIANgSIANAAIgUAaIAMAag");
	this.shape.setTransform(59.675,89.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgMAYQgGgDgCgGQgCgGAAgHIAAgCQABgHAEgGQAEgHAGgDQAFgDAGgBQAKABAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgGIAGAFQgDAFgGADQgFACgGAAQgGABgFgEgAgJgEIAVAAIAAgBIAAgEQgBgEgCgBQgCgDgEAAQgIAAgEANg");
	this.shape_1.setTransform(54.7292,89.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgRAmIAHgrIgIAAIACgJIAIAAIABgFQABgIAFgFQAFgFAIAAIAHABIgBAJIgFAAQgEAAgDACQgCACgBAEIgBAFIALAAIgCAJIgKAAIgHArg");
	this.shape_2.setTransform(50.925,88.1977);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgLAkIAJg0IALAAIgJA0gAABgZQgBAAAAAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABgBQACgCACAAQABAAABABQAAAAABAAQAAAAABABQAAAAABAAQAAABABAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAgBAAIgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBg");
	this.shape_3.setTransform(47.45,88.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgMAfIgBAGIgLAAIANhKIALAAIgFAbQAFgGAIAAQAIAAAEAGQAFAFAAAJIAAAHQgBAIgEAGQgDAHgFADQgFADgGAAQgIAAgFgHgAgGAAIgEAVQACAHAIABQAEgBAEgEQAEgFABgIIAAgHQAAgEgCgDQgCgDgEAAIgBAAQgGAAgEAGg");
	this.shape_4.setTransform(43.175,88.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgRAZQgEgDgBgEQgCgFABgFIAGgiIALAAIgGAiIAAADQABAGAGABQAGgBAFgGIAHglIALAAIgJA0IgLAAIABgFQgFAGgJAAQgFAAgDgCg");
	this.shape_5.setTransform(37.9688,89.4);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgIAdQgDgEAAgHIAFgdIgIAAIABgJIAJAAIACgMIAKAAIgCAMIAJAAIgBAJIgJAAIgFAdIAAACQAAADAEAAIAEAAIgBAJIgHABQgFAAgDgEg");
	this.shape_6.setTransform(33.675,88.775);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AAHAaIgHgSIgNASIgNAAIAVgaIgMgZIAMAAIAGARIANgRIANAAIgUAZIAMAag");
	this.shape_7.setTransform(62.225,73.35);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgMAYQgGgEgCgFQgCgGAAgHIAAgCQABgHAEgGQAEgHAGgDQAFgEAGAAQAKABAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgGIAGAFQgDAGgGACQgFADgGAAQgGAAgFgEgAgJgEIAVAAIAAgBIAAgEQgBgDgCgCQgCgCgEgBQgIAAgEANg");
	this.shape_8.setTransform(57.2792,73.35);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgRAmIAHgrIgIAAIACgJIAIAAIABgFQABgIAFgFQAFgFAIAAIAHABIgBAJIgFAAQgEAAgDACQgCACgBAEIgBAFIALAAIgCAJIgKAAIgHArg");
	this.shape_9.setTransform(53.475,72.1977);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgLAkIAJgzIALAAIgJAzgAABgYQAAgBgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQACgDAEAAQAAAAABABQAAAAABAAQAAAAABABQABAAAAABQABAAAAAAQAAABABAAQAAABAAABQAAAAAAABQAAABAAAAQAAABAAAAQgBABAAAAQAAABgBABQAAAAgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgCAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_10.setTransform(50,72.35);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgMAfIgBAGIgLAAIANhKIALAAIgFAcQAFgHAIAAQAIAAAEAGQAFAFAAAIIAAAIQgBAIgEAHQgDAGgFADQgFADgGAAQgIAAgFgHgAgGAAIgEAVQACAHAIABQAEgBAEgEQAEgFABgIIAAgHQAAgEgCgDQgCgDgEAAIgBAAQgGAAgEAGg");
	this.shape_11.setTransform(45.725,72.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgRAZQgEgDgBgEQgCgFABgFIAGgiIALAAIgGAiIAAADQABAGAGABQAGgBAFgGIAHglIALAAIgJA0IgLAAIABgFQgFAGgJAAQgFAAgDgCg");
	this.shape_12.setTransform(40.5188,73.4);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgQAjIAKg7IgVAAIACgKIA1AAIgBAKIgWAAIgJA7g");
	this.shape_13.setTransform(35.325,72.45);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FF8C2D").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_14.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


(lib.drag8G10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap109();
	this.instance.setTransform(0,-3,0.3136,0.4294);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgEAFQAAAAgBgBQAAgBAAAAQAAgBgBAAQAAgBAAAAQAAgDACgCQACgBACAAQADgBACACQACACAAACQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBgBAAg");
	this.shape.setTransform(75.625,80.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgaAlIANhIIALAAIgBAFQAFgGAIAAQAFAAAEADQAEACACAFQACAFAAAFIgBAIQAAAHgEAGQgDAGgFAEQgFADgGAAQgHAAgFgGIgFAZgAgEgUIgEAWQACAGAGAAQAGAAAEgEQAEgEABgJIAAgEQAAgGgCgEQgCgDgEAAIgBAAQgGAAgEAGg");
	this.shape_1.setTransform(71.575,79.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgQAWQgGgEAAgIIALAAQAAAEADADQACACAFAAQADgBADgBQADgCAAgDQABgFgHgCIgJgDQgKgDAAgJQABgHAGgFQAGgEAIAAQAIAAAGAEQAFAFAAAIIgMAAQAAgEgCgCQgCgDgEABQgDAAgCABQgDACAAAEQgBAEAGABIAKAEQAKADAAAJQgBAFgDAEQgDAEgFACQgFACgFAAQgJAAgFgGg");
	this.shape_2.setTransform(66.575,78.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgSAXQgEgEAAgHQABgIAGgEQAHgFALAAIAHAAIABgDIAAgEQgBgFgGAAQgEAAgBABQgDADgBADIgMAAQABgFADgDQADgFAFgCQAFgBAFAAQAJAAAFAFQAEAFAAAIIgEAYIgBAEIABAGIAAABIgMAAIAAgGQgHAHgGAAQgHgBgFgEgAgGAEQgDACgBAFQAAADABACQACACAEAAQADAAACgBIAGgGIABgJIgFAAQgGAAgEACg");
	this.shape_3.setTransform(58.925,78.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AAWAbIAFgiIAAgDQAAgGgHAAQgHAAgEAHIAAACIgGAiIgLAAIAGghIAAgEQgBgGgGAAQgHAAgEAGIgHAlIgLAAIAJg0IALAAIgCAGQAHgHAJAAQAEAAADADQAEACABADQAHgIAKAAQAHABAEAFQAEAEgBAKIgGAhg");
	this.shape_4.setTransform(51.9611,78.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgLAlIAJg0IALAAIgJA0gAABgYQgBgBAAAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQACgCACAAQABAAABAAQAAAAABAAQAAAAABABQAAAAABABQAAAAABAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAABQAAAAgBAAQAAAAgBABQAAAAgBAAQgBAAgBAAIgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_5.setTransform(46.8,77.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgIAdQgDgEAAgHIAFgdIgIAAIABgJIAJAAIACgMIAKAAIgCAMIAJAAIgBAJIgJAAIgFAdIAAACQAAADAEAAIAEAAIgBAJIgHABQgFAAgDgEg");
	this.shape_6.setTransform(43.975,78.025);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgMAYQgGgEgCgFQgCgGAAgHIAAgCQABgHAEgHQAEgGAGgDQAFgEAGABQAKAAAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgHIAGAHQgDAEgGADQgFACgGABQgGgBgFgDgAgJgEIAVAAIAAgBIAAgEQgBgEgCgCQgCgCgEAAQgIAAgEANg");
	this.shape_7.setTransform(39.5792,78.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgRAbIAJg0IAKAAIgBAGQAFgHAHAAIAFABIgBALIgFAAQgIgBgEAHIgFAjg");
	this.shape_8.setTransform(35.375,78.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgMAYQgGgEgCgFQgCgGAAgHIAAgCQABgHAEgHQAEgGAGgDQAFgEAGABQAKAAAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgHIAGAHQgDAEgGADQgFACgGABQgGgBgFgDgAgJgEIAVAAIAAgBIAAgEQgBgEgCgCQgCgCgEAAQgIAAgEANg");
	this.shape_9.setTransform(30.9292,78.6);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AAHAmIAGgjIAAgDQgBgGgGABQgGgBgFAGIgHAmIgLAAIANhLIAKAAIgEAdQAGgIAIABQAIAAADAFQAEAFgBAIIgGAjg");
	this.shape_10.setTransform(25.3111,77.5);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgdAkIAMhGIAYAAQALgBAGAHQAGAGAAAJQgBALgIAFQgHAGgNAAIgOAAIgEAbgAgLAAIANAAQAGAAAFgDQAEgDABgHQAAgFgCgDQgDgDgGAAIgOAAg");
	this.shape_11.setTransform(19.8019,77.7);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FF8C2D").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_12.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


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


(lib.drag8G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("As/kIIZ/AAIAAIRI5/AAg");
	this.shape.setTransform(82.525,25.075);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAIACADIAAACIgNAAIgBgGQgGAGgHABQgIAAgFgFgAgHAEQgDACAAAFQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFgBgEADg");
	this.shape_1.setTransform(140.725,42.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgEQgDgEAAgFIAMAAQAAAEADACQADADADAAQAFAAADgCQACgCAAgDQAAgDgCgCQgDgCgFgBIgKgDQgJgDAAgJQAAgGAFgFQAGgEAIAAQAKAAAGAEQAFAFAAAHIgMAAQAAgDgCgCQgDgCgEAAQgCAAgDACQgCABAAADQAAADACACQACABAGABIALAEQAEABACADQACAEAAAEQAAAGgGAFQgGAFgKAAQgFAAgFgDg");
	this.shape_2.setTransform(135.4,42.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAIACADIAAACIgNAAIgBgGQgGAGgHABQgIAAgFgFgAgHAEQgDACAAAFQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFgBgEADg");
	this.shape_3.setTransform(130.175,42.4);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AALAbIgLgkIgKAkIgKAAIgOg0IALAAIAIAjIALgjIAIAAIAMAjIAIgjIAMAAIgPA0g");
	this.shape_4.setTransform(123.7,42.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgGAFgEQAGgDAGAAQALAAAFAGQAGAIAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgGIAGAGQgDAFgFACQgFADgHAAQgKgBgHgGgAgGgNQgDADgBAGIAWAAIAAgBQgBgFgDgDQgCgEgFAAQgEAAgDAEg");
	this.shape_5.setTransform(117.375,42.4);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgQAeQgGgHAAgNQAAgLAGgHQAFgIAJAAQAIAAAGAGIAAgbIALAAIAABKIgLAAIAAgGQgFAHgJAAQgIAAgGgIgAgHgBQgEADAAAJQAAAIAEAFQADAEAFAAQAHAAAEgGIAAgWQgEgGgHAAQgFAAgDAFg");
	this.shape_6.setTransform(111.7,41.35);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_7.setTransform(103.775,43.375);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAIACADIAAACIgNAAIgBgGQgGAGgHABQgIAAgFgFgAgHAEQgDACAAAFQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFgBgEADg");
	this.shape_8.setTransform(98.175,42.4);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAKAmIAAgiQAAgFgCgCQgDgCgEAAQgGgBgEAGIAAAmIgMAAIAAhLIAMAAIAAAcQAGgGAIAAQARAAAAASIAAAjg");
	this.shape_9.setTransform(92.675,41.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAIACADIAAACIgNAAIgBgGQgGAGgHABQgIAAgFgFgAgHAEQgDACAAAFQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFgBgEADg");
	this.shape_10.setTransform(87.225,42.4);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgFASIAAgdIgJAAIAAgJIAJAAIAAgMIAKAAIAAAMIAKAAIAAAJIgKAAIAAAdIABAEIAFABIAEAAIAAAJIgIABQgMAAAAgPg");
	this.shape_11.setTransform(82.7,41.825);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgFASIAAgdIgJAAIAAgJIAJAAIAAgMIALAAIAAAMIAJAAIAAAJIgJAAIAAAdIAAAEIAFABIAEAAIAAAJIgIABQgMAAAAgPg");
	this.shape_12.setTransform(76.85,41.825);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAIACADIAAACIgNAAIgBgGQgGAGgHABQgIAAgFgFgAgHAEQgDACAAAFQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFgBgEADg");
	this.shape_13.setTransform(72.625,42.4);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAIACADIAAACIgNAAIgBgGQgGAGgHABQgIAAgFgFgAgHAEQgDACAAAFQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFgBgEADg");
	this.shape_14.setTransform(67.225,42.4);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgEQgDgEAAgFIALAAQABAEADACQADADADAAQAFAAADgCQACgCAAgDQAAgDgDgCQgCgCgFgBIgKgDQgJgDAAgJQAAgGAGgFQAGgEAHAAQAKAAAGAEQAFAFABAHIgNAAQAAgDgCgCQgDgCgEAAQgDAAgCACQgDABAAADQAAADADACQACABAGABIALAEQAEABACADQACAEAAAEQAAAGgGAFQgGAFgKAAQgFAAgFgDg");
	this.shape_15.setTransform(61.9,42.4);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgJIAAgiIAMAAIAAAiQAAAKAIgBQAIAAADgGIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_16.setTransform(54.075,42.45);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgFASIAAgdIgJAAIAAgJIAJAAIAAgMIAKAAIAAAMIAKAAIAAAJIgKAAIAAAdIABAEIAFABIAEAAIAAAJIgIABQgNAAABgPg");
	this.shape_17.setTransform(49.5,41.825);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_18.setTransform(45.175,42.35);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgGAFgEQAGgDAGAAQALAAAFAGQAGAIAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgGIAGAGQgDAFgFACQgFADgHAAQgKgBgHgGgAgGgNQgDADgBAGIAWAAIAAgBQgBgFgDgDQgCgEgFAAQgEAAgDAEg");
	this.shape_19.setTransform(39.775,42.4);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgGASIAAgdIgIAAIAAgJIAIAAIAAgMIAMAAIAAAMIAJAAIAAAJIgJAAIAAAdIABAEIAEABIAEAAIAAAJIgHABQgOAAAAgPg");
	this.shape_20.setTransform(35.25,41.825);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IAMAAIAAAGQADgHAHAAIAFABIAAALIgFgBQgIAAgCAHIAAAjg");
	this.shape_21.setTransform(32.2,42.35);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgGAFgEQAGgDAGAAQALAAAFAGQAGAIAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgGIAGAGQgDAFgFACQgFADgHAAQgKgBgHgGgAgGgNQgDADgBAGIAWAAIAAgBQgBgFgDgDQgCgEgFAAQgEAAgDAEg");
	this.shape_22.setTransform(27.575,42.4);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgFASIAAgdIgJAAIAAgJIAJAAIAAgMIAKAAIAAAMIAKAAIAAAJIgKAAIAAAdIABAEIAFABIAEAAIAAAJIgIABQgNAAABgPg");
	this.shape_23.setTransform(23.05,41.825);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_24.setTransform(155.975,26.35);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_25.setTransform(150.525,26.4);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_26.setTransform(146.525,25.4);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgLAjQgFgDgDgEIAFgHQAGAHAIAAQAFAAADgDQADgEAAgFIAAgEQgFAFgHABQgJgBgGgHQgGgHAAgMQAAgMAGgIQAFgHAKAAQAIAAAFAGIABgFIAKAAIAAAyQAAALgGAFQgHAHgKgBQgFABgGgDgAgHgWQgDAEAAAKQAAAHADAEQADAFAFAAQAHAAADgHIAAgVQgDgHgHABQgFAAgDAEg");
	this.shape_27.setTransform(142.325,27.4);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_28.setTransform(136.925,26.4);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgLAgIAAAFIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAHQAFAIAAALIAAABQAAAMgFAIQgGAHgJAAQgJAAgFgGgAgKAAIAAAWQADAGAHAAQAFABADgFQADgEAAgJIAAgBQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_29.setTransform(131.475,25.35);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_30.setTransform(123.375,26.4);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgRAfQgFgIAAgNQAAgLAFgIQAGgHAJAAQAIAAAGAGIAAgbIALAAIAABKIgKAAIgBgFQgFAGgJAAQgJAAgGgHgAgHgBQgDADgBAJQABAJADAEQADAFAEgBQAIABAEgHIAAgWQgEgGgIAAQgEAAgDAFg");
	this.shape_31.setTransform(117.7,25.35);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_32.setTransform(112.325,26.4);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_33.setTransform(106.875,27.375);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgFAmIAAhLIALAAIAABLg");
	this.shape_34.setTransform(100.175,25.3);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgKIAAghIAMAAIAAAhQAAAKAIAAQAIABADgHIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_35.setTransform(96.125,26.45);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgPAUQgHgHAAgMIAAgBQAAgMAHgHQAGgHAKAAQAKgBAGAGQAFAFABAJIgLAAQgBgEgDgDQgCgDgFAAQgFAAgDAEQgDAFAAAIIAAABQAAAJADAEQADAEAFAAQAEAAADgCQADgDABgEIALAAQAAAFgDAEQgDAFgFACQgFACgGABQgKAAgGgIg");
	this.shape_36.setTransform(90.825,26.4);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_37.setTransform(85.375,26.35);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgKIAAghIAMAAIAAAhQAAAKAIAAQAIABADgHIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_38.setTransform(79.825,26.45);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AAZAbIAAgiQAAgEgBgCQgDgDgFAAQgEAAgDACQgCADgBADIAAAjIgLAAIAAgiQAAgJgJAAQgHAAgEAFIAAAmIgMAAIAAg0IALAAIABAFQAFgGAKAAQAKAAAEAIQAGgIAKAAQAJAAAEAFQAFAFgBAJIAAAig");
	this.shape_39.setTransform(72.7,26.35);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgLAjQgFgDgDgEIAFgHQAGAHAIAAQAFAAADgDQADgEAAgFIAAgEQgFAFgHABQgJgBgGgHQgGgHAAgMQAAgMAGgIQAFgHAKAAQAIAAAFAGIABgFIAKAAIAAAyQAAALgGAFQgHAHgKgBQgFABgGgDgAgHgWQgDAEAAAKQAAAHADAEQADAFAFAAQAHAAADgHIAAgVQgDgHgHABQgFAAgDAEg");
	this.shape_40.setTransform(62.925,27.4);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_41.setTransform(57.425,26.35);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_42.setTransform(51.975,26.4);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgSAkIAAgJIACAAQAEAAADgBIADgGIACgFIgTgzIANAAIAKAkIALgkIANAAIgVA8QgEANgMAAIgFgBg");
	this.shape_43.setTransform(46.825,27.475);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_44.setTransform(39.125,26.35);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgEAGABQALgBAFAIQAGAGAAANIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgGgDgDQgCgDgFAAQgEAAgDADg");
	this.shape_45.setTransform(33.725,26.4);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AAZAbIAAgiQAAgEgCgCQgCgDgFAAQgEAAgCACQgDADgBADIAAAjIgLAAIAAgiQAAgJgJAAQgIAAgCAFIAAAmIgNAAIAAg0IAMAAIAAAFQAGgGAJAAQAKAAAEAIQAGgIAKAAQAJAAAEAFQAEAFABAJIAAAig");
	this.shape_46.setTransform(26.65,26.35);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgLAjQgFgDgDgEIAFgHQAGAHAIAAQAFAAADgDQADgEAAgFIAAgEQgFAFgHABQgJgBgGgHQgGgHAAgMQAAgMAGgIQAFgHAKAAQAIAAAFAGIABgFIAKAAIAAAyQAAALgGAFQgHAHgKgBQgFABgGgDgAgHgWQgDAEAAAKQAAAHADAEQADAFAFAAQAHAAADgHIAAgVQgDgHgHABQgFAAgDAEg");
	this.shape_47.setTransform(19.375,27.4);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgEAGABQALgBAFAIQAGAGAAANIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgGgDgDQgCgDgFAAQgEAAgDADg");
	this.shape_48.setTransform(14.025,26.4);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgEQgDgEAAgFIAMAAQAAAEADADQADACADAAQAFgBADgBQACgCAAgDQAAgDgDgBQgCgCgFgCIgKgDQgJgDAAgIQAAgHAGgFQAGgEAHAAQAKAAAGAEQAFAFABAIIgNAAQABgEgDgCQgCgDgFABQgDAAgCACQgCABgBADQABADACABQACACAGABIALAEQAEABACADQACAEAAADQAAAIgGAEQgGAEgKABQgFgBgFgCg");
	this.shape_49.setTransform(8.7,26.4);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_50.setTransform(154.525,10.35);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJgBAGAGQAFAEABAIIAAAYQAAAHACAEIAAABIgNAAIgBgGQgGAHgHgBQgIAAgFgEgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFABgEACg");
	this.shape_51.setTransform(149.075,10.4);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgFAmIAAhKIALAAIAABKg");
	this.shape_52.setTransform(145.075,9.3);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJgBAGAGQAFAEABAIIAAAYQAAAHACAEIAAABIgNAAIgBgGQgGAHgHgBQgIAAgFgEgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFABgEACg");
	this.shape_53.setTransform(141.125,10.4);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgLAgIAAAFIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAHQAFAIAAAMIAAAAQAAAMgFAIQgGAHgJAAQgJAAgFgGgAgKAAIAAAWQADAGAHABQAFAAADgFQADgEAAgIIAAgCQAAgJgDgDQgDgEgFAAQgHAAgDAGg");
	this.shape_54.setTransform(135.675,9.35);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgGAFgEQAGgDAGAAQALgBAFAIQAGAHAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAGQgDAFgFADQgFADgHgBQgKABgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_55.setTransform(130.125,10.4);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_56.setTransform(124.625,10.35);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgGAFgEQAGgDAGAAQALgBAFAIQAGAHAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAGQgDAFgFADQgFADgHgBQgKABgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_57.setTransform(119.225,10.4);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_58.setTransform(113.775,11.375);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgFAlIAAg1IALAAIAAA1gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_59.setTransform(107.075,9.4);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AAKAmIgPgXIgFAFIAAASIgMAAIAAhKIAMAAIAAAqIADgFIAOgQIAOAAIgTAWIAVAfg");
	this.shape_60.setTransform(103.525,9.3);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgFAlIAAg1IALAAIAAA1gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_61.setTransform(99.325,9.4);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgFAmIAAhKIALAAIAABKg");
	this.shape_62.setTransform(96.775,9.3);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgFAlIAAg1IALAAIAAA1gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_63.setTransform(94.225,9.4);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AAaAbIAAghQAAgGgCgBQgDgDgFAAQgEAAgDACQgCADgBADIAAAjIgLAAIAAgiQAAgJgKAAQgGAAgEAFIAAAmIgLAAIAAg0IAKAAIABAFQAFgGALAAQAJAAAEAIQAFgIALAAQAJAAAEAFQAEAFAAAKIAAAhg");
	this.shape_64.setTransform(88.6,10.35);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgGAFgEQAGgDAGAAQALgBAFAIQAGAHAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAGQgDAFgFADQgFADgHgBQgKABgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_65.setTransform(81.625,10.4);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AAaAbIAAghQAAgGgDgBQgCgDgFAAQgEAAgCACQgDADgBADIAAAjIgLAAIAAgiQAAgJgKAAQgGAAgDAFIAAAmIgMAAIAAg0IALAAIAAAFQAGgGAKAAQAJAAAEAIQAFgIALAAQAJAAAEAFQAEAFAAAKIAAAhg");
	this.shape_66.setTransform(74.55,10.35);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgFAlIAAg1IALAAIAAA1gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_67.setTransform(66.425,9.4);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_68.setTransform(62.375,10.35);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgFAlIAAg1IALAAIAAA1gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_69.setTransform(58.325,9.4);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_70.setTransform(51.775,10.35);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJgBAGAGQAFAEABAIIAAAYQAAAHACAEIAAABIgNAAIgBgGQgGAHgHgBQgIAAgFgEgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFABgEACg");
	this.shape_71.setTransform(46.325,10.4);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AAMAbIgMgkIgKAkIgKAAIgPg1IAMAAIAJAkIALgkIAIAAIAKAkIAJgkIALAAIgOA1g");
	this.shape_72.setTransform(39.85,10.4);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgGAFgEQAGgDAGAAQALgBAFAIQAGAHAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAGQgDAFgFADQgFADgHgBQgKABgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_73.setTransform(33.525,10.4);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AAKAmIAAgjQAAgEgCgDQgDgCgEAAQgGABgEAFIAAAmIgMAAIAAhKIAMAAIAAAcQAGgIAIABQARgBAAATIAAAjg");
	this.shape_74.setTransform(28.025,9.3);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgFAlIAAg1IALAAIAAA1gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_75.setTransform(21.475,9.4);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAHAAIAFABIAAALIgFAAQgIAAgCAGIAAAjg");
	this.shape_76.setTransform(18.7,10.35);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgFAlIAAg1IALAAIAAA1gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_77.setTransform(15.425,9.4);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgOAhQgGgFgEgHQgDgIAAgJIAAgGQAAgKADgHQAEgIAHgFQAGgDAIgBQAMABAHAGQAHAGABAMIgMAAQgBgIgEgDQgDgDgHgBQgHAAgEAHQgFAFAAAMIAAAFQAAAMAEAFQAEAHAHgBQAIAAADgDQAEgDABgIIAMAAQgBALgHAHQgHAGgNAAQgHAAgHgDg");
	this.shape_78.setTransform(10.925,9.5);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_79.setTransform(82.475,25.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_3
	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("rgba(0,0,0,0.227)").s().p("AtJEAIAAn/IaTAAIAAH/g");
	this.shape_80.setTransform(75.15,33.15);
	this.shape_80._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_80).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9,-2.4,175.8,61.199999999999996);


(lib.drag8G4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("AtSkDIalAAIAAIHI6lAAg");
	this.shape.setTransform(82.5,24.625);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_1.setTransform(122.1,33.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_2.setTransform(117.225,34.825);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_3.setTransform(112.4,33.675);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_4.setTransform(104.725,34.875);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgFAAgCACQgDADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQADAAAEgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_5.setTransform(98.4,34.875);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgGAtIAAhZIANAAIAABZg");
	this.shape_6.setTransform(93.625,33.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_7.setTransform(88.925,34.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgGIAQgTIARAAIgXAaIAaAlg");
	this.shape_8.setTransform(82.975,33.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_9.setTransform(73.125,34.825);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAGAAQAMAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQADAAAEgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_10.setTransform(66.55,34.875);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAOAgIgOgrIgMArIgMAAIgRg/IANAAIAKArIAOgrIAJAAIANArIALgrIANAAIgRA/g");
	this.shape_11.setTransform(58.85,34.875);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_12.setTransform(51.225,34.875);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgGgDgCQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAhQAHgIAKAAQAUAAAAAXIAAApg");
	this.shape_13.setTransform(44.625,33.55);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgFAAgCACQgDADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_14.setTransform(156.9,16.475);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgUAkQgHgIAAgPQAAgPAHgIQAHgJALAAQAJAAAHAHIAAghIAOAAIAABZIgNAAIgBgGQgGAIgKgBQgLAAgHgJgAgJgCQgDAEAAAMQAAAJADAGQAEAFAGAAQAJAAAEgIIAAgaQgEgIgJAAQgGAAgEAGg");
	this.shape_15.setTransform(150.125,15.2);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_16.setTransform(143.65,16.475);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgbAtIAAhXIANAAIABAGQAGgIAKABQALgBAHAJQAHAJAAAPIAAABQAAANgHAJQgHAJgLAAQgJAAgHgHIAAAfgAgNgYIAAAbQAEAHAJAAQAGAAAEgGQADgEAAgMQAAgJgDgFQgEgGgGAAQgJAAgEAIg");
	this.shape_17.setTransform(137.175,17.65);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_18.setTransform(127.325,16.425);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgFAAgDACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_19.setTransform(120.75,16.475);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_20.setTransform(114.175,16.525);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgbAtIAAhXIANAAIABAGQAGgIAKABQALgBAHAJQAHAJAAAPIAAABQAAANgHAJQgHAJgLAAQgJAAgHgHIAAAfgAgNgYIAAAbQAEAHAJAAQAGAAAEgGQADgEAAgMQAAgJgDgFQgEgGgGAAQgJAAgEAIg");
	this.shape_21.setTransform(107.625,17.65);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_22.setTransform(98.875,16.425);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAGAAQAMAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQADAAAEgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_23.setTransform(90.4,16.475);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_24.setTransform(81.925,16.425);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_25.setTransform(73.525,16.475);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgFIAQgTIARAAIgXAZIAaAlg");
	this.shape_26.setTransform(67.575,15.15);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_27.setTransform(57.725,16.525);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgHAWIAAgjIgKAAIAAgKIAKAAIAAgQIAOAAIAAAQIALAAIAAAKIgLAAIAAAjQgBADACACQACACADAAIAFgBIAAALIgJABQgQAAAAgSg");
	this.shape_28.setTransform(52.25,15.75);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQADgCADgDIAAgMIgIAAQgHAAgEADg");
	this.shape_29.setTransform(47.15,16.475);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_30.setTransform(40.775,16.475);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgGgDgCQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAiQAHgIAKAAQAUAAAAAVIAAAqg");
	this.shape_31.setTransform(31.375,15.15);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_32.setTransform(24.8,16.475);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgGAtIAAhZIANAAIAABZg");
	this.shape_33.setTransform(20.025,15.15);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQADAAAEgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_34.setTransform(15.25,16.475);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgPApQgHgEgFgGQgEgGAAgIIAPAAQAAAHAFAEQAFAEAHAAQAIAAAEgDQAEgDAAgFQAAgGgEgDQgEgDgJgDQgLgDgGgDQgLgHAAgMQAAgKAIgHQAJgHAMAAQAJAAAHAEQAHADAEAGQAEAGAAAHIgPAAQAAgGgEgEQgEgEgIAAQgGAAgEADQgEADAAAGQAAAFAEADQAEADAJADQAKADAGADQAGADADAFQADAFAAAHQAAAKgIAHQgJAGgOAAQgIAAgIgDg");
	this.shape_35.setTransform(8.375,15.375);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_36.setTransform(82.475,24.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_3
	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("rgba(0,0,0,0.227)").s().p("AtJEAIAAn/IaTAAIAAH/g");
	this.shape_37.setTransform(75.15,31.35);
	this.shape_37._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_37).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9,-3.1,177.6,60.1);


(lib.drag8G3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("AtSkDIalAAIAAIHI6lAAg");
	this.shape.setTransform(82.5,24.6);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_1.setTransform(131.825,34.875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgDACQgDADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQADAAAEgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_2.setTransform(125.5,34.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgGAtIAAhZIANAAIAABZg");
	this.shape_3.setTransform(120.725,33.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_4.setTransform(116.025,34.875);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgGIAQgTIARAAIgXAaIAaAlg");
	this.shape_5.setTransform(110.075,33.55);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_6.setTransform(102.05,33.675);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_7.setTransform(97.175,34.825);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_8.setTransform(92.35,33.675);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_9.setTransform(84.675,34.875);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_10.setTransform(78.35,34.875);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgGAtIAAhZIANAAIAABZg");
	this.shape_11.setTransform(73.575,33.55);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_12.setTransform(68.875,34.875);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgGIAQgTIARAAIgXAaIAaAlg");
	this.shape_13.setTransform(62.925,33.55);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_14.setTransform(53.15,34.875);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgUAlQgHgKAAgPQAAgNAHgJQAHgJALAAQAJAAAHAHIAAggIAOAAIAABZIgNAAIgBgHQgGAHgKABQgLAAgHgJgAgJgCQgDAFAAAKQAAAKADAGQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_15.setTransform(46.375,33.6);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgDADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCADgDIAAgMIgIAAQgHAAgEADg");
	this.shape_16.setTransform(39.9,34.875);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgbAtIAAhYIANAAIABAHQAGgHAKgBQALAAAHAJQAHAIAAAQIAAABQAAAOgHAIQgHAJgLAAQgJAAgHgGIAAAegAgNgZIAAAbQAEAIAJAAQAGAAAEgFQADgFAAgLQAAgKgDgGQgEgFgGAAQgJAAgEAHg");
	this.shape_17.setTransform(33.425,36.05);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_18.setTransform(152.875,16.425);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_19.setTransform(146.3,16.475);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AANAgIgNgrIgMArIgMAAIgRg/IANAAIAKArIAOgrIAJAAIAOArIAKgrIANAAIgRA/g");
	this.shape_20.setTransform(138.6,16.475);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_21.setTransform(130.975,16.475);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgGgDgCQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAiQAHgIAKAAQAUAAAAAVIAAAqg");
	this.shape_22.setTransform(124.375,15.15);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_23.setTransform(114.8,16.475);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgUAkQgHgIAAgPQAAgPAHgIQAHgJALAAQAJAAAHAHIAAghIAOAAIAABZIgNAAIgBgGQgGAIgKgBQgLAAgHgJgAgJgCQgDAEAAAMQAAAJADAGQAEAFAGAAQAJAAAEgIIAAgaQgEgIgJAAQgGAAgEAGg");
	this.shape_24.setTransform(108.025,15.2);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_25.setTransform(101.625,16.475);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgNAmIgBAGIgNAAIAAhZIAOAAIAAAhQAGgHAKAAQALAAAHAIQAHAJAAAPIAAABQAAAOgHAJQgHAJgLgBQgKAAgGgHgAgNAAIAAAaQAEAIAJAAQAGAAAEgFQADgFAAgKIAAgCQAAgKgDgFQgEgEgGgBQgJABgEAHg");
	this.shape_26.setTransform(95.125,15.2);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_27.setTransform(86.375,16.425);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_28.setTransform(77.975,16.475);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgbAtIAAhXIANAAIABAGQAGgIAKABQALgBAHAJQAHAJAAAPIAAABQAAANgHAJQgHAJgLAAQgJAAgHgHIAAAfgAgNgYIAAAbQAEAHAJAAQAGAAAEgGQADgEAAgMQAAgJgDgFQgEgGgGAAQgJAAgEAIg");
	this.shape_29.setTransform(71.475,17.65);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_30.setTransform(61.625,16.525);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgGAWIAAgjIgLAAIAAgKIALAAIAAgQIAMAAIAAAQIAMAAIAAAKIgMAAIAAAjQABADABACQACACADAAIAFgBIAAALIgJABQgPAAAAgSg");
	this.shape_31.setTransform(56.15,15.75);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgDADgBAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_32.setTransform(51.05,16.475);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_33.setTransform(44.675,16.475);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgGgDgCQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAiQAHgIAKAAQAUAAAAAVIAAAqg");
	this.shape_34.setTransform(35.275,15.15);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQADgCADgDIAAgMIgIAAQgHAAgEADg");
	this.shape_35.setTransform(28.7,16.475);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgGAtIAAhZIANAAIAABZg");
	this.shape_36.setTransform(23.925,15.15);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgEAAgEACQgDADABAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAHAFAAALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCABgDIAAgMIgHAAQgHAAgEADg");
	this.shape_37.setTransform(19.15,16.475);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgPApQgHgEgFgGQgEgGAAgIIAPAAQAAAHAFAEQAFAEAHAAQAIAAAEgDQAEgDAAgFQAAgGgEgDQgEgDgJgDQgLgDgGgDQgLgHAAgMQAAgKAIgHQAJgHAMAAQAJAAAHAEQAHADAEAGQAEAGAAAHIgPAAQAAgGgEgEQgEgEgIAAQgGAAgEADQgEADAAAGQAAAFAEADQAEADAJADQAKADAGADQAGADADAFQADAFAAAHQAAAKgIAHQgJAGgOAAQgIAAgIgDg");
	this.shape_38.setTransform(12.275,15.375);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_39.setTransform(82.475,24.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_3
	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("rgba(0,0,0,0.227)").s().p("AtJEAIAAn/IaTAAIAAH/g");
	this.shape_40.setTransform(75.15,30.9);
	this.shape_40._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_40).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9,-3.1,177.6,59.6);


(lib.drag8G2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("AtSkJIalAAIAAITI6lAAg");
	this.shape.setTransform(82.5,29.175);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQADAAAEgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_1.setTransform(154.75,48.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgWArIAAgLIADAAQAFAAADgBQADgCABgFIACgFIgWg+IAPAAIAMAqIAOgqIAOAAIgZBIQgFAPgOAAIgGgBg");
	this.shape_2.setTransform(148.55,49.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_3.setTransform(142.325,48.625);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgDADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQADgCADgDIAAgMIgIAAQgHAAgEADg");
	this.shape_4.setTransform(135.75,48.675);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_5.setTransform(128.975,49.875);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_6.setTransform(122.175,49.875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_7.setTransform(115.575,48.625);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgUAYQgJgJAAgPIAAAAQAAgJAFgHQADgIAHgEQAGgEAIAAQANAAAIAIQAIAJABANIAAADQAAAJgEAHQgDAIgIAEQgGAEgJAAQgMAAgIgJgAgKgPQgEAGAAAKQAAAJAEAGQAEAGAGAAQAHAAAFgGQADgGAAgKQAAgJgDgGQgFgFgHAAQgGAAgEAFg");
	this.shape_8.setTransform(108.8,48.675);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IANAAIAAAHQAEgIAKAAIAEABIAAANIgFgBQgKAAgDAIIAAAqg");
	this.shape_9.setTransform(103.6,48.625);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_10.setTransform(92.975,48.625);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQADgCADgDIAAgMIgIAAQgHAAgEADg");
	this.shape_11.setTransform(84.5,48.675);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgGAtIAAhZIANAAIAABZg");
	this.shape_12.setTransform(79.725,47.35);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCABgDIAAgMIgHAAQgHAAgEADg");
	this.shape_13.setTransform(74.95,48.675);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgUAkQgHgIAAgPQAAgPAHgIQAHgJALAAQAJAAAHAHIAAghIAOAAIAABZIgNAAIgBgGQgGAHgKAAQgLABgHgKgAgJgCQgDAFAAALQAAAJADAFQAEAGAGAAQAJAAAEgIIAAgaQgEgIgJAAQgGABgEAFg");
	this.shape_14.setTransform(68.175,47.4);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_15.setTransform(61.775,48.675);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAGIAAAVIgOAAIAAhZIAOAAIAAAzIAFgFIAQgTIARAAIgXAZIAaAlg");
	this.shape_16.setTransform(55.825,47.35);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_17.setTransform(47.8,47.475);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgGAtIAAhZIANAAIAABZg");
	this.shape_18.setTransform(44.725,47.35);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQADgCADgDIAAgMIgIAAQgHAAgEADg");
	this.shape_19.setTransform(39.95,48.675);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgNAlIgBAHIgNAAIAAhZIAOAAIAAAhQAGgHAKAAQALAAAHAJQAHAIAAAPIAAABQAAAOgHAJQgHAIgLAAQgKABgGgJgAgNAAIAAAaQAEAIAJAAQAGAAAEgFQADgFAAgKIAAgCQAAgKgDgEQgEgGgGAAQgJABgEAHg");
	this.shape_20.setTransform(33.475,47.4);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_21.setTransform(24.725,48.625);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_22.setTransform(16.325,48.675);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAGIAAAVIgOAAIAAhZIAOAAIAAAzIAFgFIAQgTIARAAIgXAZIAaAlg");
	this.shape_23.setTransform(10.375,47.35);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgGIAQgTIARAAIgXAaIAaAlg");
	this.shape_24.setTransform(151.525,28.95);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_25.setTransform(146.5,29.075);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgQAgIAAg+IAOAAIAAAHQAFgIAIAAIAGABIAAANIgHgBQgJAAgCAIIAAAqg");
	this.shape_26.setTransform(143.15,30.225);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCABgDIAAgMIgHAAQgHAAgEADg");
	this.shape_27.setTransform(137.5,30.275);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_28.setTransform(130.925,30.225);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_29.setTransform(124.425,30.275);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_30.setTransform(115.925,30.225);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_31.setTransform(104.375,30.225);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgFAAgDACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_32.setTransform(97.8,30.275);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgUAlQgHgKAAgPQAAgNAHgJQAHgJALAAQAJAAAHAHIAAggIAOAAIAABZIgNAAIgBgHQgGAIgKAAQgLgBgHgIgAgJgCQgDAEAAALQAAAKADAGQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGgBgEAGg");
	this.shape_33.setTransform(91.025,29);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IANAAIAAAHQAEgIAKAAIAFABIAAANIgGgBQgKAAgDAIIAAAqg");
	this.shape_34.setTransform(83,30.225);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgDACQgDADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQADAAAEgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_35.setTransform(77.35,30.275);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_36.setTransform(70.775,30.325);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgGAtIAAhZIANAAIAABZg");
	this.shape_37.setTransform(65.925,28.95);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_38.setTransform(61.225,30.275);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgGIAQgTIARAAIgXAaIAaAlg");
	this.shape_39.setTransform(55.275,28.95);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_40.setTransform(45.225,31.475);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_41.setTransform(38.625,30.225);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgVAYQgIgJAAgPIAAAAQAAgJAFgHQADgIAHgEQAGgEAIAAQANAAAIAIQAIAJABANIAAADQAAAJgEAHQgDAIgIAEQgGAEgJAAQgMAAgJgJgAgKgPQgEAGAAAKQAAAJAEAGQAEAGAGAAQAHAAAFgGQADgGAAgKQAAgJgDgGQgFgFgHAAQgGAAgEAFg");
	this.shape_42.setTransform(31.85,30.275);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IANAAIAAAHQAEgIAKAAIAEABIAAANIgFgBQgKAAgDAIIAAAqg");
	this.shape_43.setTransform(26.65,30.225);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgVAYQgHgJgBgPIAAAAQAAgJAFgHQADgIAHgEQAGgEAIAAQANAAAIAIQAIAJABANIAAADQgBAJgDAHQgDAIgIAEQgGAEgJAAQgMAAgJgJgAgKgPQgEAGAAAKQAAAJAEAGQAEAGAGAAQAIAAAEgGQADgGAAgKQAAgJgDgGQgFgFgHAAQgGAAgEAFg");
	this.shape_44.setTransform(20.8,30.275);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgUAlQgHgKAAgPQAAgNAHgJQAHgJALAAQAJAAAHAHIAAggIAOAAIAABZIgNAAIgBgHQgGAIgKAAQgLgBgHgIgAgJgCQgDAEAAALQAAAKADAGQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGgBgEAGg");
	this.shape_45.setTransform(13.875,29);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAGAAQAMAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQADAAAEgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_46.setTransform(156.55,11.875);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgHAWIAAgjIgKAAIAAgKIAKAAIAAgQIAOAAIAAAQIALAAIAAAKIgLAAIAAAjQAAADABACQABACAEAAIAFgBIAAALIgJABQgQAAAAgSg");
	this.shape_47.setTransform(151.15,11.15);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_48.setTransform(146.125,11.875);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_49.setTransform(139.725,11.875);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_50.setTransform(130.325,11.825);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgDACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_51.setTransform(123.75,11.875);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAGIAAAVIgOAAIAAhZIAOAAIAAAzIAFgFIAQgTIARAAIgXAZIAaAlg");
	this.shape_52.setTransform(117.825,10.55);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQADgCADgDIAAgMIgIAAQgHAAgEADg");
	this.shape_53.setTransform(111.05,11.875);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgQAgIAAg+IAOAAIAAAHQAFgIAJAAIAEABIAAANIgGgBQgJAAgDAIIAAAqg");
	this.shape_54.setTransform(106,11.825);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_55.setTransform(100.425,11.875);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_56.setTransform(93.625,13.075);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_57.setTransform(86.825,13.075);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_58.setTransform(80.225,11.825);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_59.setTransform(73.725,11.875);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_60.setTransform(65.225,11.825);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_61.setTransform(53.475,13.075);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_62.setTransform(46.875,11.825);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCABgDIAAgMIgHAAQgHAAgEADg");
	this.shape_63.setTransform(40.3,11.875);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgWArIAAgLIACAAQAGAAACgCQADgCACgEIACgFIgXg+IAQAAIAMAqIAOgqIAPAAIgZBIQgGAQgNAAIgHgCg");
	this.shape_64.setTransform(34.1,13.15);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgHAWIAAgjIgKAAIAAgKIAKAAIAAgQIAOAAIAAAQIALAAIAAAKIgLAAIAAAjQAAADABACQACACADAAIAFgBIAAALIgJABQgQAAAAgSg");
	this.shape_65.setTransform(26.05,11.15);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgUAYQgJgJABgPIAAAAQAAgJADgHQAEgIAGgEQAIgEAHAAQANAAAIAIQAIAJAAANIAAADQABAJgEAHQgEAIgGAEQgHAEgJAAQgNAAgHgJgAgKgPQgEAGAAAKQAAAJAEAGQAEAGAGAAQAHAAAEgGQAFgGAAgKQAAgJgFgGQgEgFgHAAQgGAAgEAFg");
	this.shape_66.setTransform(20.75,11.875);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgGAWIAAgjIgLAAIAAgKIALAAIAAgQIAMAAIAAAQIAMAAIAAAKIgMAAIAAAjQABADABACQACACADAAIAFgBIAAALIgJABQgPAAAAgSg");
	this.shape_67.setTransform(15.2,11.15);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgRAnQgJgFgEgKQgFgJABgMIAAgEQgBgMAFgKQAEgKAJgFQAHgFAKAAQAKAAAJAFQAHAFAFAKQAEAJABANIAAADQAAANgFAJQgFAKgHAFQgJAFgKAAQgKAAgHgFgAgOgXQgGAIAAANIAAAEQAAAOAGAIQAGAIAIAAQAKAAAFgIQAFgHABgPIAAgDQgBgOgFgIQgGgHgJAAQgIAAgGAHg");
	this.shape_68.setTransform(9.2,10.775);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_69.setTransform(82.475,29.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_3
	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("rgba(0,0,0,0.227)").s().p("AtJEAIAAn/IaTAAIAAH/g");
	this.shape_70.setTransform(76.05,34.95);
	this.shape_70._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_70).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.1,1.5,176.7,59.1);


(lib.drag8G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("AtSkEIalAAIAAIJI6lAAg");
	this.shape.setTransform(82.525,27.45);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgHQAAgKAHgDQAHgFAMgBIAIAAIAAgEQAAgEgDgDQgCgCgFAAQgEgBgDADQgDACAAAEIgNAAQAAgFADgEQAEgFAFgCQAGgCAFAAQAKAAAHAFQAGAFAAAJIAAAaQAAAHACAFIAAABIgNAAIgCgFQgGAGgIAAQgJAAgFgFgAgHAEQgEADAAAEQAAAEADACQACACAEAAQADAAAEgCQADgBACgDIAAgMIgHAAQgHAAgDADg");
	this.shape_1.setTransform(102.225,45.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgUAoIAAgKIACAAQAFAAADgCQACgCABgEIADgFIgVg5IAOAAIALAoIANgoIANAAIgXBCQgEAPgNAAIgGgBg");
	this.shape_2.setTransform(96.55,46.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AALAeIAAglQAAgFgCgDQgDgDgFAAQgHAAgEAHIAAApIgNAAIAAg6IANAAIAAAHQAGgIAKAAQARABABAUIAAAmg");
	this.shape_3.setTransform(90.85,45.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AALApIAAglQAAgFgDgDQgCgCgFAAQgHAAgEAGIAAApIgNAAIAAhRIANAAIAAAeQAHgHAIAAQATAAAAAUIAAAmg");
	this.shape_4.setTransform(84.75,44.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgSAYQgFgGAAgKIAAglIANAAIAAAlQAAALAJAAQAIAAAEgHIAAgpIANAAIAAA6IgMAAIAAgGQgHAGgJAAQgJAAgFgFg");
	this.shape_5.setTransform(78.65,45.65);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgMAiIAAAHIgNAAIAAhSIAOAAIAAAeQAFgGAJAAQALAAAFAHQAHAIAAAOIAAAAQAAAOgHAIQgFAIgLAAQgJAAgGgIgAgLAAIAAAYQADAHAIAAQAGAAADgEQAEgFAAgJIAAgCQgBgJgDgEQgDgFgGAAQgIAAgDAHg");
	this.shape_6.setTransform(72.6,44.425);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgSAYQgFgGAAgKIAAglIANAAIAAAlQAAALAJAAQAJAAADgHIAAgpIANAAIAAA6IgMAAIAAgGQgHAGgJAAQgKAAgEgFg");
	this.shape_7.setTransform(66.35,45.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgGAUIAAggIgKAAIAAgKIAKAAIAAgNIAMAAIAAANIAKAAIAAAKIgKAAIAAAfQAAAEABACQABAAAAAAQABAAAAABQABAAAAAAQABAAABAAIAEgBIAAALIgIAAQgOAAAAgQg");
	this.shape_8.setTransform(61.35,44.95);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AALAeIAAglQAAgFgDgDQgCgDgFAAQgHAAgEAHIAAApIgNAAIAAg6IAMAAIAAAHQAHgIAJAAQATAAAAAVIAAAmg");
	this.shape_9.setTransform(139.85,28.35);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgRAXQgIgJAAgNIAAgBQAAgIAEgHQADgHAGgEQAGgDAHAAQALAAAHAIQAGAHAAAOIAAAEIgkAAQAAAHAEAFQAFADAFAAQAJABAFgIIAHAHQgDAFgGADQgFADgHAAQgMAAgIgHgAgHgPQgEAEAAAGIAYAAIAAgBQAAgGgEgEQgDgCgGAAQgEAAgDADg");
	this.shape_10.setTransform(133.9,28.4);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAcAeIAAglQAAgGgCgCQgDgDgFAAQgFAAgCADQgDACgBADIAAAoIgMAAIAAglQgBgLgKAAQgIAAgDAGIAAAqIgNAAIAAg6IAMAAIABAHQAGgIAKAAQALAAAEAJQAHgJALAAQAKAAAEAGQAFAFAAALIAAAlg");
	this.shape_11.setTransform(126.125,28.35);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgMAmQgHgCgDgEIAHgIQAGAGAJABQAFAAAEgEQADgDAAgIIAAgDQgFAGgJAAQgJAAgHgIQgGgIAAgNQAAgOAGgIQAGgIAKAAQAKAAAFAGIABgFIAMAAIAAA3QgBALgGAHQgHAHgMAAQgGAAgGgDgAgIgZQgEAFAAAKQAAAJAEAFQADAEAGAAQAIABADgIIAAgYQgDgGgIAAQgGAAgDAEg");
	this.shape_12.setTransform(118.1,29.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgRAXQgIgJAAgNIAAgBQAAgIAEgHQADgHAGgEQAHgDAGAAQALAAAHAIQAGAHAAAOIAAAEIgkAAQAAAHAEAFQAFADAFAAQAJABAFgIIAIAHQgEAFgFADQgHADgHAAQgLAAgIgHgAgHgPQgDAEgBAGIAYAAIAAgBQAAgGgEgEQgDgCgGAAQgDAAgEADg");
	this.shape_13.setTransform(112.2,28.4);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgLAbQgGgCgDgFQgDgEAAgGIAMAAQABAFADADQADACAFAAQAFAAADgCQADgCAAgDQAAgDgDgCQgEgCgFgBQgHgCgFgCQgJgEAAgIQAAgIAHgFQAFgFAKAAQAKAAAHAFQAFAFAAAJIgMAAQgBgFgCgCQgDgDgEABQgEAAgCABQgDADAAADQAAADACABIAKAEQAHABAEADQAFACACADQACADAAAEQAAAJgGAEQgHAFgKAAQgHAAgFgDg");
	this.shape_14.setTransform(106.3,28.4);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgYApIAAhQIALAAIABAGQAGgHAJAAQAKAAAHAIQAFAIAAAOIAAABQAAAMgFAIQgHAIgKAAQgIAAgHgGIAAAcgAgMgXIAAAZQAFAHAHAAQAGAAADgFQADgEABgKQgBgJgDgFQgEgFgFAAQgIAAgEAGg");
	this.shape_15.setTransform(97.75,29.475);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgIQAAgIAHgEQAHgFAMgBIAIAAIAAgDQAAgFgDgDQgCgCgFAAQgEgBgDADQgDACAAAEIgNAAQAAgFADgEQAEgEAFgDQAGgCAFAAQAKAAAHAFQAGAFAAAKIAAAZQAAAHACAFIAAABIgNAAIgCgFQgGAGgIAAQgJAAgFgFgAgHAEQgEADAAAEQAAAEADACQACACAEAAQADAAAEgCQADgBACgEIAAgLIgHAAQgHABgDACg");
	this.shape_16.setTransform(91.575,28.4);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgFAoIAAg5IALAAIAAA5gAgEgbQgBgBAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAgDACgCQACgCACAAQADAAACACQACACAAADQAAABAAAAQAAABAAAAQAAABgBAAQAAABgBABQgCACgDAAQgCAAgCgCg");
	this.shape_17.setTransform(87.2,27.3);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgGAUIAAggIgKAAIAAgKIAKAAIAAgNIAMAAIAAANIALAAIAAAKIgLAAIAAAfQAAAEABACQABAAAAAAQABAAAAABQABAAAAAAQABAAABAAIAFgBIAAALIgJABQgOAAAAgRg");
	this.shape_18.setTransform(83.85,27.75);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgRAXQgIgJAAgNIAAgBQABgIADgHQADgHAGgEQAHgDAGAAQAMAAAGAIQAGAHABAOIAAAEIglAAQAAAHAEAFQAFADAFAAQAJABAGgIIAHAHQgEAFgFADQgHADgHAAQgLAAgIgHgAgHgPQgEAEAAAGIAXAAIAAgBQAAgGgDgEQgDgCgGAAQgDAAgEADg");
	this.shape_19.setTransform(79.25,28.4);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgLAbQgGgCgDgFQgDgEAAgGIAMAAQABAFADADQADACAFAAQAFAAACgCQAEgCAAgDQAAgDgEgCQgDgCgFgBQgHgCgFgCQgJgEAAgIQAAgIAHgFQAFgFAKAAQAKAAAGAFQAHAFgBAJIgMAAQAAgFgDgCQgDgDgEABQgEAAgCABQgDADgBADQAAADADABIAKAEQAHABAEADQAFACACADQACADAAAEQAAAJgHAEQgGAFgKAAQgHAAgFgDg");
	this.shape_20.setTransform(73.35,28.4);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgFAoIAAg5IALAAIAAA5gAgEgbQgBgBAAgBQgBAAAAgBQAAAAAAgBQgBAAAAgBQABgDACgCQACgCACAAQAEAAACACQABACAAADQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAABQgCACgEAAQgCAAgCgCg");
	this.shape_21.setTransform(66.4,27.3);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgSAiQgGgJAAgOQAAgMAGgIQAGgIAKAAQAJAAAGAGIAAgeIAMAAIAABSIgLAAIgBgGQgGAHgJAAQgJAAgHgIgAgIgCQgDAEAAAKQAAAJADAFQAEAFAFAAQAIAAAEgHIAAgYQgEgHgIAAQgFAAgEAFg");
	this.shape_22.setTransform(61.75,27.225);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgIQAAgIAHgEQAHgFAMgBIAIAAIAAgDQAAgFgDgDQgCgCgFAAQgEgBgDADQgDACAAAEIgNAAQAAgFADgEQAEgEAFgDQAGgCAFAAQAKAAAHAFQAGAFAAAKIAAAZQAAAHACAFIAAABIgNAAIgCgFQgGAGgIAAQgJAAgFgFgAgHAEQgEADAAAEQAAAEADACQACACAEAAQADAAAEgCQADgBACgEIAAgLIgHAAQgHABgDACg");
	this.shape_23.setTransform(53.075,28.4);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgSAiQgGgJgBgOQABgMAGgIQAGgIALAAQAIAAAFAGIAAgeIAOAAIAABSIgMAAIgBgGQgFAHgJAAQgKAAgHgIgAgIgCQgDAEAAAKQAAAJADAFQADAFAGAAQAIAAADgHIAAgYQgDgHgIAAQgGAAgDAFg");
	this.shape_24.setTransform(46.85,27.225);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgIQAAgIAHgEQAHgFAMgBIAIAAIAAgDQAAgFgDgDQgCgCgFAAQgEgBgDADQgDACAAAEIgNAAQAAgFADgEQAEgEAFgDQAGgCAFAAQAKAAAHAFQAGAFAAAKIAAAZQAAAHACAFIAAABIgNAAIgCgFQgGAGgIAAQgJAAgFgFgAgHAEQgEADAAAEQAAAEADACQACACAEAAQADAAAEgCQADgBACgEIAAgLIgHAAQgHABgDACg");
	this.shape_25.setTransform(40.925,28.4);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgOAeIAAg6IAMAAIABAHQADgIAJAAIAEABIAAANIgFgBQgJAAgCAHIAAAng");
	this.shape_26.setTransform(36.275,28.35);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgRAXQgIgJAAgNIAAgBQAAgIAEgHQADgHAGgEQAHgDAGAAQALAAAHAIQAGAHABAOIAAAEIglAAQAAAHAEAFQAFADAFAAQAJABAFgIIAIAHQgEAFgFADQgHADgHAAQgLAAgIgHgAgHgPQgDAEgBAGIAYAAIAAgBQAAgGgEgEQgDgCgGAAQgDAAgEADg");
	this.shape_27.setTransform(31.2,28.4);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgMAiIAAAHIgMAAIAAhSIAMAAIAAAeQAHgGAIAAQAKAAAHAHQAFAIAAAOIAAAAQAAAOgFAIQgHAIgKAAQgJAAgGgIgAgMAAIAAAYQAEAHAIAAQAGAAADgEQADgFABgJIAAgCQAAgJgDgEQgEgFgGAAQgIAAgEAHg");
	this.shape_28.setTransform(25.2,27.225);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgMAmQgGgCgDgEIAGgIQAGAGAJABQAFAAAEgEQADgEAAgHIAAgDQgFAGgIAAQgKAAgHgIQgGgIgBgNQABgOAGgIQAGgIALAAQAJAAAGAGIAAgFIAMAAIAAA3QAAALgIAIQgGAGgMAAQgGAAgGgDgAgIgZQgEAGABAKQgBAIAEAFQADAEAGAAQAIABADgIIAAgYQgDgGgIAAQgGAAgDAEg");
	this.shape_29.setTransform(152.6,12.3);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AALAeIAAglQAAgFgCgDQgDgDgFAAQgHAAgEAHIAAApIgNAAIAAg6IANAAIAAAHQAGgHAJgBQATAAAAAVIAAAmg");
	this.shape_30.setTransform(146.55,11.15);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgIQAAgIAHgEQAHgGAMAAIAIAAIAAgDQAAgFgDgDQgCgCgFAAQgEAAgDACQgDACAAAEIgNAAQAAgFADgEQAEgEAFgDQAGgCAFAAQAKAAAHAFQAGAFAAAKIAAAZQAAAHACAFIAAABIgNAAIgCgFQgGAGgIAAQgJAAgFgFgAgHAEQgEADAAAEQAAAEADADQACABAEAAQADAAAEgBQADgCACgEIAAgLIgHAAQgHABgDACg");
	this.shape_31.setTransform(140.525,11.2);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgUAoIAAgKIADAAQAEAAADgCQACgCABgEIACgFIgUg5IAOAAIAMAoIALgoIAOAAIgXBCQgEAPgNAAIgGgBg");
	this.shape_32.setTransform(134.85,12.375);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgFAoIAAg5IALAAIAAA5gAgEgbQgBgBAAgBQgBAAAAgBQAAAAAAgBQgBAAAAgBQABgDACgCQACgCACAAQAEAAACACQABACAAADQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAABQgCACgEAAQgCAAgCgCg");
	this.shape_33.setTransform(128.05,10.1);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AALAeIAAglQAAgFgCgDQgDgDgFAAQgHAAgEAHIAAApIgNAAIAAg6IANAAIAAAHQAGgHAJgBQATAAAAAVIAAAmg");
	this.shape_34.setTransform(123.6,11.15);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgFAoIAAg5IALAAIAAA5gAgEgbQgBgBAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAgDACgCQACgCACAAQADAAACACQACACAAADQAAABAAAAQAAABAAAAQAAABgBAAQAAABgBABQgCACgDAAQgCAAgCgCg");
	this.shape_35.setTransform(119.15,10.1);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AALAeIAAglQAAgFgDgDQgCgDgFAAQgHAAgEAHIAAApIgNAAIAAg6IAMAAIAAAHQAHgHAKgBQASAAAAAVIAAAmg");
	this.shape_36.setTransform(111.95,11.15);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgIQAAgIAHgEQAHgGAMAAIAIAAIAAgDQAAgFgDgDQgCgCgFAAQgEAAgDACQgDACAAAEIgNAAQAAgFADgEQAEgEAFgDQAGgCAFAAQAKAAAHAFQAGAFAAAKIAAAZQAAAHACAFIAAABIgNAAIgCgFQgGAGgIAAQgJAAgFgFgAgHAEQgEADAAAEQAAAEADADQACABAEAAQADAAAEgBQADgCACgEIAAgLIgHAAQgHABgDACg");
	this.shape_37.setTransform(105.925,11.2);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AAMAdIgMgnIgLAnIgLAAIgQg5IANAAIAJAmIAMgmIAJAAIAMAnIAJgnIANAAIgQA5g");
	this.shape_38.setTransform(98.825,11.2);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgRAWQgIgHAAgOIAAgBQABgIADgHQADgGAGgEQAHgEAGAAQAMAAAGAHQAGAIABAOIAAAEIglAAQAAAHAEAFQAFADAFAAQAJABAFgIIAIAHQgEAFgFADQgHADgHAAQgLAAgIgIgAgHgPQgEAEAAAGIAXAAIAAgBQAAgGgDgEQgDgCgGAAQgDgBgEAEg");
	this.shape_39.setTransform(91.85,11.2);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AALApIAAglQAAgFgCgDQgDgCgFAAQgHAAgEAGIAAApIgNAAIAAhRIANAAIAAAeQAHgHAIAAQATAAAAAUIAAAmg");
	this.shape_40.setTransform(85.8,9.975);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AALApIgRgZIgFAGIAAATIgOAAIAAhRIAOAAIAAAuIAEgFIAPgRIAPAAIgVAXIAYAig");
	this.shape_41.setTransform(77.525,9.975);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgIQAAgIAHgEQAHgGAMAAIAIAAIAAgDQAAgFgDgDQgCgCgFAAQgEAAgDACQgDACAAAEIgNAAQAAgFADgEQAEgEAFgDQAGgCAFAAQAKAAAHAFQAGAFAAAKIAAAZQAAAHACAFIAAABIgNAAIgCgFQgGAGgIAAQgJAAgFgFgAgHAEQgEADAAAEQAAAEADADQACABAEAAQADAAAEgBQADgCACgEIAAgLIgHAAQgHABgDACg");
	this.shape_42.setTransform(71.325,11.2);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgOAeIAAg6IAMAAIABAHQADgHAJgBIAEABIAAANIgFgBQgJAAgCAHIAAAng");
	this.shape_43.setTransform(66.675,11.15);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgRAWQgHgHgBgOIAAgBQABgIADgHQADgGAGgEQAGgEAHAAQALAAAHAHQAGAIABAOIAAAEIglAAQAAAHAEAFQAEADAGAAQAJABAGgIIAHAHQgEAFgFADQgHADgHAAQgLAAgIgIgAgHgPQgEAEAAAGIAXAAIAAgBQABgGgEgEQgDgCgGAAQgDgBgEAEg");
	this.shape_44.setTransform(61.6,11.2);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgMAmQgHgCgDgEIAHgIQAGAGAIABQAGAAAEgEQADgEABgHIAAgDQgGAGgJAAQgKAAgGgIQgHgIABgNQgBgOAHgIQAGgIAKAAQAKAAAGAGIAAgFIALAAIAAA3QAAALgGAIQgIAGgLAAQgGAAgGgDgAgIgZQgDAGgBAKQABAIADAFQAEAEAFAAQAIABAEgIIAAgYQgEgGgIAAQgFAAgEAEg");
	this.shape_45.setTransform(55.35,12.3);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgGAUIAAggIgKAAIAAgKIAKAAIAAgNIAMAAIAAANIALAAIAAAKIgLAAIAAAgQAAADACABQAAABAAAAQABAAAAABQABAAAAAAQABAAABAAIAFgBIAAALIgJABQgOAAAAgRg");
	this.shape_46.setTransform(47.65,10.55);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgIQAAgIAHgEQAHgGAMAAIAIAAIAAgDQAAgFgDgDQgCgCgFAAQgEAAgDACQgDACAAAEIgNAAQAAgFADgEQAEgEAFgDQAGgCAFAAQAKAAAHAFQAGAFAAAKIAAAZQAAAHACAFIAAABIgNAAIgCgFQgGAGgIAAQgJAAgFgFgAgHAEQgEADAAAEQAAAEADADQACABAEAAQADAAAEgBQADgCACgEIAAgLIgHAAQgHABgDACg");
	this.shape_47.setTransform(42.975,11.2);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgFApIAAhRIALAAIAABRg");
	this.shape_48.setTransform(38.6,9.975);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgIQAAgIAHgEQAHgGAMAAIAIAAIAAgDQAAgFgDgDQgCgCgFAAQgEAAgDACQgDACAAAEIgNAAQAAgFADgEQAEgEAFgDQAGgCAFAAQAKAAAHAFQAGAFAAAKIAAAZQAAAHACAFIAAABIgNAAIgCgFQgGAGgIAAQgJAAgFgFgAgHAEQgEADAAAEQAAAEADADQACABAEAAQADAAAEgBQADgCACgEIAAgLIgHAAQgHABgDACg");
	this.shape_49.setTransform(34.225,11.2);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgIQAAgIAHgEQAHgGAMAAIAIAAIAAgDQAAgFgDgDQgCgCgFAAQgEAAgDACQgDACAAAEIgNAAQAAgFADgEQAEgEAFgDQAGgCAFAAQAKAAAHAFQAGAFAAAKIAAAZQAAAHACAFIAAABIgNAAIgCgFQgGAGgIAAQgJAAgFgFgAgHAEQgEADAAAEQAAAEADADQACABAEAAQADAAAEgBQADgCACgEIAAgLIgHAAQgHABgDACg");
	this.shape_50.setTransform(25.525,11.2);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgYApIAAhQIALAAIABAGQAGgHAJAAQAKAAAHAIQAFAIABAOIAAABQgBAMgFAIQgHAIgKAAQgIAAgHgGIAAAcgAgMgXIAAAZQAFAHAHAAQAFAAAEgFQADgEAAgKQAAgJgDgFQgDgFgGAAQgIAAgEAGg");
	this.shape_51.setTransform(19.55,12.275);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AAVAnIgGgSIgdAAIgHASIgOAAIAehNIALAAIAeBNgAgLAKIAWAAIgLggg");
	this.shape_52.setTransform(12.725,10.2);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_53.setTransform(82.475,27.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_3
	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("rgba(0,0,0,0.227)").s().p("AtJEAIAAn/IaTAAIAAH/g");
	this.shape_54.setTransform(78.3,32.25);
	this.shape_54._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_54).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5.9,-0.3,174.6,58.199999999999996);


(lib.drag7G8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgSAXQgEgFAAgGQABgJAGgDQAHgFALAAIAHABIABgFIAAgDQgBgFgGgBQgEAAgBACQgDACgBAEIgMAAQABgFADgEQADgEAFgCQAFgCAFAAQAJABAFAFQAEAFAAAIIgEAYIgBAEIABAFIAAABIgMAAIAAgEQgHAFgGAAQgHABgFgFgAgGAEQgDADgBAEQAAADABACQACACAEAAQADAAACgCIAGgFIABgKIgFAAQgGAAgEADg");
	this.shape.setTransform(121.575,23.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgIAdQgDgEAAgHIAFgdIgIAAIABgJIAJAAIACgMIAKAAIgCAMIAJAAIgBAJIgJAAIgFAdIAAACQAAADAEAAIAEAAIgBAJIgHABQgFAAgDgEg");
	this.shape_1.setTransform(117.625,22.525);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgMAYQgGgDgCgGQgCgGAAgHIAAgCQABgHAEgGQAEgHAGgDQAFgDAGgBQAKABAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgHIAGAGQgDAFgGADQgFADgGgBQgGABgFgEgAgJgEIAVAAIAAgBIAAgEQgBgDgCgDQgCgBgEgBQgIAAgEANg");
	this.shape_2.setTransform(113.2292,23.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgSAXQgEgFAAgGQABgJAGgDQAHgFALAAIAHABIABgFIAAgDQgBgFgGgBQgEAAgBACQgDACgBAEIgMAAQABgFADgEQADgEAFgCQAFgCAFAAQAJABAFAFQAEAFAAAIIgEAYIgBAEIABAFIAAABIgMAAIAAgEQgHAFgGAAQgHABgFgFgAgGAEQgDADgBAEQAAADABACQACACAEAAQADAAACgCIAGgFIABgKIgFAAQgGAAgEADg");
	this.shape_3.setTransform(107.825,23.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AAHAlIAGgiIAAgDQgBgGgGAAQgGAAgFAGIgHAlIgLAAIANhJIAKAAIgEAcQAGgIAIAAQAIABADAFQAEAGgBAHIgGAig");
	this.shape_4.setTransform(102.3611,22);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgNAYQgFgEgCgFQgDgHABgHIAAgBQABgHAEgGQADgHAGgDQAGgDAGgBQAJABAFAGQAFAFAAAIIgLAAQAAgEgCgDQgCgCgFgBQgFAAgEAGQgEAGgBAKQAAANAKAAQADAAADgCQADgDABgEIALAAQgBAFgDAEQgDAFgFACQgFADgFgBQgHABgEgEg");
	this.shape_5.setTransform(97.3607,23.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgOAYQgFgEgCgFQgCgHAAgHIAAgBQABgHAEgGQAEgGAFgEQAGgDAGgBQAHABAFAEQAFADACAGQADAGgBAHQgBAIgEAHQgDAGgGAEQgGACgGAAQgHABgFgEgAgIgKQgCAFgBAFIAAAHQAAAEACAEQADADAEAAQAFAAAEgEQAEgGABgIIABgDQAAgHgDgDQgCgDgFgBQgHAAgEAHg");
	this.shape_6.setTransform(91.9343,23.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgSAjQgFgDgDgEIAGgGQAFAGAIAAQAFAAADgDQAEgEACgGIABgDQgHAGgGgBQgIABgEgGQgFgFAAgJIAAgHQABgIADgGQAEgHAFgDQAFgDAFgBQAJABAFAGIABgGIALAAIgJAzQgBAKgHAHQgIAFgJAAQgGAAgFgCgAgFgWQgEAFgBAIIAAABIgBAGQABAEACADQACADAEAAQAGAAAFgHIAEgVQgDgHgGAAIgBAAQgFAAgDAFg");
	this.shape_7.setTransform(86.275,24.1);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgLAkIAJg0IALAAIgJA0gAABgZQAAAAgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAgBQADgCADAAQAAAAABABQAAAAABAAQAAAAABABQABAAAAAAQABABAAAAQAAABABAAQAAABAAABQAAAAAAABQAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgCAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBg");
	this.shape_8.setTransform(82.5,22.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgLAlIAMhJIALAAIgMBJg");
	this.shape_9.setTransform(80.025,22);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgRAhQgFgDgDgGQgDgGAAgHQgBgHACgHQABgIAEgHQAEgGAFgFQAIgHAKABQALAAAGAHQAGAHABAMIgBANQgBAIgEAGQgDAHgFAEQgJAIgLAAQgGAAgGgEgAgFgWQgFAEgDAHQgDAIAAAKQgBAJADAFQAEAFAGABQAIAAAFgHQAGgGABgMIABgDIAAgFIgBgKQgBgEgDgDQgDgCgEAAQgFAAgFADg");
	this.shape_10.setTransform(75.3688,22.1983);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgKAZQgFgCgDgFQgDgEAAgEIALAAQABAEADACQADACADAAQAFAAADgBQACgCAAgDQAAgDgCgCQgDgBgFgBIgKgEQgJgDAAgJQAAgGAGgEQAGgFAHgBQAKABAGAFQAFAEABAHIgNAAQABgDgDgCQgCgDgFAAQgDAAgCADQgCABgBADQABADACACQACABAGACIALADQAEACACADQACACAAAFQAAAGgGAFQgGAFgKgBQgFAAgFgCg");
	this.shape_11.setTransform(181.5,7.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_12.setTransform(176.275,7.1);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgFAlIAAhKIALAAIAABKg");
	this.shape_13.setTransform(172.275,6);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_14.setTransform(168.375,7.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AAOAjIgVgeIgIAJIAAAVIgMAAIAAhGIAMAAIAAAiIAHgJIAUgZIAPAAIgbAgIAcAmg");
	this.shape_15.setTransform(162.875,6.2);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_16.setTransform(154.075,7.05);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_17.setTransform(148.625,7.1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AALAaIgLgjIgKAjIgKAAIgPg0IAMAAIAIAkIALgkIAIAAIAMAkIAIgkIAMAAIgPA0g");
	this.shape_18.setTransform(142.15,7.1);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_19.setTransform(135.825,7.1);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AAKAlIAAghQAAgFgCgCQgDgCgEgBQgGAAgEAGIAAAlIgMAAIAAhKIAMAAIAAAcQAGgGAIgBQARABAAASIAAAig");
	this.shape_20.setTransform(130.325,6);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAHAAIAFABIAAALIgFgBQgIABgCAGIAAAjg");
	this.shape_21.setTransform(123.55,7.05);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_22.setTransform(118.875,7.1);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAIQAFAGAAANIAAAAQAAANgFAGQgGAIgJAAQgJAAgFgHgAgKAAIAAAVQADAIAHAAQAFgBADgEQADgEAAgJIAAgBQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_23.setTransform(113.425,6.05);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AAaAbIAAgiQAAgEgCgDQgDgCgFAAQgEAAgDACQgCADgBADIAAAjIgLAAIAAgiQAAgJgKAAQgGAAgEAGIAAAlIgLAAIAAg0IAKAAIABAGQAFgHALAAQAJAAAEAJQAFgJALAAQAJAAAEAFQAEAFAAAJIAAAig");
	this.shape_24.setTransform(106.15,7.05);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_25.setTransform(99.125,7.1);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgLAjQgFgCgDgEIAFgHQAGAGAIAAQAFAAADgDQADgDAAgHIAAgDQgFAGgHgBQgJABgGgIQgGgHAAgNQAAgMAGgHQAFgIAKAAQAIAAAFAHIABgGIAKAAIAAAzQAAAKgGAHQgHAFgKABQgFAAgGgDgAgHgWQgDAFAAAIQAAAJADAEQADAEAFAAQAHAAADgGIAAgXQgDgFgHgBQgFAAgDAFg");
	this.shape_26.setTransform(93.475,8.1);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AAKAlIAAghQAAgFgCgCQgDgCgEgBQgGAAgEAGIAAAlIgMAAIAAhKIAMAAIAAAcQAGgGAIgBQARABAAASIAAAig");
	this.shape_27.setTransform(85.475,6);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgRAUQgGgHAAgNIAAAAQAAgHACgGQAEgHAFgDQAGgEAGAAQAKABAIAGQAGAIAAALIAAABQAAAJgDAGQgDAFgFAEQgGADgHAAQgKABgHgIgAgIgMQgEAFAAAHQAAAJAEAFQADAEAFAAQAGAAAEgEQACgFAAgJQAAgHgDgFQgDgFgGAAQgFAAgDAFg");
	this.shape_28.setTransform(79.85,7.1);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgGASIAAgdIgIAAIAAgJIAIAAIAAgMIAMAAIAAAMIAJAAIAAAJIgJAAIAAAdIABAEIAEABIAEAAIAAAJIgHABQgOAAAAgPg");
	this.shape_29.setTransform(75.2,6.525);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_30.setTransform(70.875,7.05);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgRAUQgGgHAAgNIAAAAQAAgHACgGQADgHAGgDQAFgEAHAAQALABAGAGQAHAIAAALIAAABQAAAJgCAGQgDAFgGAEQgFADgIAAQgKABgHgIgAgJgMQgDAFAAAHQAAAJADAFQAEAEAFAAQAGAAAEgEQADgFAAgJQgBgHgDgFQgDgFgGAAQgFAAgEAFg");
	this.shape_31.setTransform(65.25,7.1);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgNIAAAAQAAgMAHgHQAGgIAKAAQAKAAAGAGQAFAGABAJIgLAAQgBgFgDgDQgCgDgFAAQgFAAgDAFQgDADAAAJIAAABQAAAJADAEQADAEAFAAQAEAAADgDQADgCABgEIALAAQAAAFgDAEQgDAEgFADQgFACgGAAQgKAAgGgGg");
	this.shape_32.setTransform(59.875,7.1);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_33.setTransform(52.025,7.1);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_34.setTransform(46.575,8.075);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_35.setTransform(40.975,7.1);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgNAbIAAg0IAMAAIAAAGQADgHAIAAIAEABIgBALIgEgBQgIABgCAGIAAAjg");
	this.shape_36.setTransform(36.75,7.05);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_37.setTransform(32.125,7.1);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAIQAFAGAAANIAAAAQAAANgFAGQgGAIgJAAQgJAAgFgHgAgKAAIAAAVQADAIAHAAQAFgBADgEQADgEAAgJIAAgBQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_38.setTransform(26.675,6.05);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_39.setTransform(21.125,7.1);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgZAjIAAhGIAZAAQALAAAHAFQAGAFAAAKQAAAEgDAFQgCADgFACQAFABAEAFQADAEAAAGQgBAKgGAFQgHAGgMgBgAgMAZIANAAQAFABAEgDQADgDAAgFQAAgMgLABIgOAAgAgMgEIAMAAQAFgBADgCQAEgDgBgEQAAgGgDgCQgCgCgGAAIgMAAg");
	this.shape_40.setTransform(15.35,6.2);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFE319").s().p("AvSikIelgJIAAFRI+lAKg");
	this.shape_41.setTransform(98.125,14.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

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


(lib.benara_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2ECC71").s().p("A3pHUQhuAAAAhkIAArfQAAhkBuAAMAvUAAAQBtAAAABkIAALfQAABkhtAAg");
	this.shape_1.setTransform(162.4,46.8);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.benara_1, new cjs.Rectangle(0,0,324.8,93.6), null);


(lib.tiga4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.tiga = new lib.drag8G3();
	this.tiga.name = "tiga";
	this.tiga.setTransform(-0.2,1.65,0.8086,0.8086,0,0,0,82.2,26.7);
	new cjs.ButtonHelper(this.tiga, 0, 1, 2, false, new lib.drag8G3(), 3);

	this.timeline.addTween(cjs.Tween.get(this.tiga).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.tiga4, new cjs.Rectangle(-73.9,-22.4,143.8,48.2), null);


(lib.tiga = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.tiga = new lib.drop8G3();
	this.tiga.name = "tiga";
	this.tiga.setTransform(0,0.05,0.4758,0.4758,0,0,0,121.7,48.4);

	this.timeline.addTween(cjs.Tween.get(this.tiga).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.tiga, new cjs.Rectangle(-69,-25.2,138.1,50.5), null);


(lib.satu4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.satu = new lib.drag8G1();
	this.satu.name = "satu";
	this.satu.setTransform(-0.2,-0.6,0.8086,0.8086,0,0,0,82.2,26.7);
	new cjs.ButtonHelper(this.satu, 0, 1, 2, false, new lib.drag8G1(), 3);

	this.timeline.addTween(cjs.Tween.get(this.satu).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-71.4,-22.4,141.3,47);


(lib.satu = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.satu = new lib.drop8G1();
	this.satu.name = "satu";
	this.satu.setTransform(0,0,0.4758,0.4758,0,0,0,125,44.6);

	this.timeline.addTween(cjs.Tween.get(this.satu).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.satu, new cjs.Rectangle(0,0,0,0), null);


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


(lib.lima4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.lima = new lib.drag8G5();
	this.lima.name = "lima";
	this.lima.setTransform(-0.25,0.95,0.8086,0.8086,0,0,0,82.2,26.7);
	new cjs.ButtonHelper(this.lima, 0, 1, 2, false, new lib.drag8G5(), 3);

	this.timeline.addTween(cjs.Tween.get(this.lima).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.lima4, new cjs.Rectangle(-74,-22.8,142.3,49.7), null);


(lib.lima = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.lima = new lib.drop8G5();
	this.lima.name = "lima";
	this.lima.setTransform(0,0.05,0.4758,0.4758,0,0,0,125,48.5);

	this.timeline.addTween(cjs.Tween.get(this.lima).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.lima, new cjs.Rectangle(-52.3,-16.2,104.69999999999999,32.5), null);


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


(lib.empat4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.empat = new lib.drag8G4();
	this.empat.name = "empat";
	this.empat.setTransform(-0.2,1.65,0.8086,0.8086,0,0,0,82.2,26.7);
	new cjs.ButtonHelper(this.empat, 0, 1, 2, false, new lib.drag8G4(), 3);

	this.timeline.addTween(cjs.Tween.get(this.empat).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.empat4, new cjs.Rectangle(-73.9,-22.4,143.8,48.5), null);


(lib.empat = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.empat = new lib.drop8G4();
	this.empat.name = "empat";
	this.empat.setTransform(0,0,0.4758,0.4758,0,0,0,121.7,51.9);

	this.timeline.addTween(cjs.Tween.get(this.empat).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.empat, new cjs.Rectangle(-69,-25.2,138.1,50.5), null);


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
	this.hemmm = new lib.drag7G10copy2();
	this.hemmm.name = "hemmm";
	this.hemmm.setTransform(90.1,383.05,0.9279,0.9279,0,0,0,45,47);
	new cjs.ButtonHelper(this.hemmm, 0, 1, 1);

	this.target = new lib.drag8G12();
	this.target.name = "target";
	this.target.setTransform(456.25,383.05,0.9245,0.9257,0,0,0,45.1,47.1);
	new cjs.ButtonHelper(this.target, 0, 1, 1);

	this.target_1 = new lib.drag8G11();
	this.target_1.name = "target_1";
	this.target_1.setTransform(365.65,383.05,0.9245,0.9257,0,0,0,44.8,47.1);
	new cjs.ButtonHelper(this.target_1, 0, 1, 1);

	this.target_2 = new lib.drag8G10();
	this.target_2.name = "target_2";
	this.target_2.setTransform(274.15,383.05,0.9245,0.9257,0,0,0,45,47.1);
	new cjs.ButtonHelper(this.target_2, 0, 1, 1);

	this.target_3 = new lib.drag8G9();
	this.target_3.name = "target_3";
	this.target_3.setTransform(183,383.05,0.9245,0.9257,0,0,0,44.9,47.1);
	new cjs.ButtonHelper(this.target_3, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.target_3},{t:this.target_2},{t:this.target_1},{t:this.target},{t:this.hemmm}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces1, new cjs.Rectangle(48.4,336.3,449.40000000000003,93.5), null);


(lib.btnEitcopy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Pathcopy();
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

}).prototype = getMCSymbolPrototype(lib.btnEitcopy, new cjs.Rectangle(0,0,255.9,255.9), null);


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


(lib.dua4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.dua = new lib.drag8G2();
	this.dua.name = "dua";
	this.dua.setTransform(-0.2,-2.05,0.8086,0.8086,0,0,0,82.2,26.7);
	new cjs.ButtonHelper(this.dua, 0, 1, 2, false, new lib.drag8G2(), 3);

	this.timeline.addTween(cjs.Tween.get(this.dua).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.dua4, new cjs.Rectangle(-73.2,-22.5,143.10000000000002,47.8), null);


(lib.dua = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.dua = new lib.drop8G2();
	this.dua.name = "dua";
	this.dua.setTransform(0,0.05,0.4758,0.4758,0,0,0,125,48.4);

	this.timeline.addTween(cjs.Tween.get(this.dua).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.dua, new cjs.Rectangle(-69,-25.2,138.1,50.5), null);


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


(lib.tiga1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.tiga = new lib.tiga();
	this.tiga.name = "tiga";

	this.timeline.addTween(cjs.Tween.get(this.tiga).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69,-25.2,138.1,50.5);


(lib.Slots10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// slots
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape.setTransform(63.525,460.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgjBDQgOgMgBgUIAZAAQABALAIAHQAGAGAKAAQALAAAIgJQAGgJAAgOQAAgPgHgIQgIgHgMAAQgHAAgFACQgEABgGAFIgWgFIAJhOIBTAAIAAAWIg9AAIgFAmQAMgGAMAAQAXAAAMAOQAMANAAAYQAAAYgNAOQgOAOgYAAQgUAAgPgMg");
	this.shape_1.setTransform(54.55,453.675);

	this.instance = new lib.Tween8_1("synched",0);
	this.instance.setTransform(57.4,453.7,0.0361,0.0648);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_2.setTransform(63.525,401.375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AALBOIAAgjIhCAAIgBgPIBChpIAbAAIAABjIAUAAIAAAVIgUAAIAAAjgAAKgmIgmA8IAnAAIAAhAg");
	this.shape_3.setTransform(54.3,394.875);

	this.instance_1 = new lib.Tween8_1("synched",0);
	this.instance_1.setTransform(57.4,395,0.0361,0.0648);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_4.setTransform(63.525,343.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AglBEQgOgMAAgUIAaAAQAAALAHAGQAHAHALAAQAMAAAHgHQAHgGAAgNQAAgMgHgHQgIgGgNAAIgPAAIAAgUIAPAAQAMAAAGgGQAIgGgBgMQAAgLgFgGQgHgGgLAAQgKAAgGAGQgIAGABAKIgbAAQABgMAGgKQAHgKALgGQALgFAOAAQAXAAANAMQANALAAAVQAAALgGAJQgHAJgLAFQAOADAGAKQAHAJAAANQAAAVgOANQgPAMgXAAQgWAAgPgMg");
	this.shape_5.setTransform(54.1,336.875);

	this.instance_2 = new lib.Tween8_1("synched",0);
	this.instance_2.setTransform(57.4,337,0.0361,0.0648);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_6.setTransform(63.525,287.375);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgyBPIAAgSIAzg5QALgLAFgIQAFgJAAgIQAAgMgGgGQgHgHgJAAQgNAAgHAHQgHAIAAAOIgaAAQAAgPAHgLQAGgMAMgGQAMgGAQAAQAWAAANALQANAMAAAUQAAALgHANQgGAMgPAQIglApIBHAAIAAAVg");
	this.shape_7.setTransform(54.325,280.775);

	this.instance_3 = new lib.Tween8_1("synched",0);
	this.instance_3.setTransform(57.4,281,0.0361,0.0648);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_8.setTransform(63.525,231.375);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAGBPIAAh9IglANIAAgWIA8gXIADAAIAACdg");
	this.shape_9.setTransform(53.075,224.85);

	this.instance_4 = new lib.Tween8_1("synched",0);
	this.instance_4.setTransform(57.4,225,0.0361,0.0648);

	this.lima = new lib.lima4();
	this.lima.name = "lima";
	this.lima.setTransform(132.35,463.05,1,1,0,0,0,-3,2.1);

	this.empat = new lib.empat4();
	this.empat.name = "empat";
	this.empat.setTransform(133.2,404.05,1,1,0,0,0,-2.1,1.8);

	this.tiga = new lib.tiga4();
	this.tiga.name = "tiga";
	this.tiga.setTransform(133.2,345.95,1,1,0,0,0,-2.1,1.7);

	this.dua = new lib.dua4();
	this.dua.name = "dua";
	this.dua.setTransform(133.5,289.65,1,1,0,0,0,-1.8,1.4);

	this.satu = new lib.satu4();
	this.satu.name = "satu";
	this.satu.setTransform(134.5,233.35,1,1,0,0,0,-0.8,1.1);
	new cjs.ButtonHelper(this.satu, 0, 1, 1);

	this.kotakKartu2 = new lib.target();
	this.kotakKartu2.name = "kotakKartu2";
	this.kotakKartu2.setTransform(483.9,264.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.kotakKartu2},{t:this.satu},{t:this.dua},{t:this.tiga},{t:this.empat},{t:this.lima},{t:this.instance_4},{t:this.shape_9},{t:this.shape_8},{t:this.instance_3},{t:this.shape_7},{t:this.shape_6},{t:this.instance_2},{t:this.shape_5},{t:this.shape_4},{t:this.instance_1},{t:this.shape_3},{t:this.shape_2},{t:this.instance},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Slots10, new cjs.Rectangle(42.2,209.8,509.7,273.7), null);


(lib.satu1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgRAWQgEgEAAgHQAAgIAGgDQAGgFAKAAIAIAAIAAgDQAAgEgCgDQgDgCgEAAQgDAAgDACQgDACABADIgMAAQAAgEADgEQACgEAGgCQAEgCAFAAQAJAAAGAFQAFAEAAAIIAAAXQABAHABAEIAAABIgMAAIgBgFQgFAGgIAAQgIAAgFgFgAgHAEQgCACAAAEQAAADACACQACACAEAAQACAAADgBQADgCACgDIAAgKIgHAAQgFAAgEADg");
	this.shape.setTransform(37.3,-0.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgFASIAAgcIgJAAIAAgJIAJAAIAAgNIAKAAIAAANIAJAAIAAAJIgJAAIAAAbIABAFQABAAAAAAQABABAAAAQABAAAAAAQABAAABAAIAEAAIAAAJIgIABQgMAAAAgPg");
	this.shape_1.setTransform(32.925,-1.325);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgPAUQgHgHAAgMIAAgBQAAgHADgGQADgGAGgEQAFgDAGAAQAKAAAGAHQAGAHAAAMIAAAEIghAAQAAAGAEAEQAEADAFAAQAIAAAFgGIAGAGQgDAFgFACQgGADgGAAQgKAAgHgHgAgGgNQgDADgBAGIAVAAIAAgBQAAgGgDgDQgDgDgEAAQgEAAgDAEg");
	this.shape_2.setTransform(28.825,-0.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgKAYQgFgCgCgEQgEgEAAgFIAMAAQAAAFADACQADACAEAAQAEAAADgCQACgBAAgDQAAgDgCgCIgIgDIgKgDQgJgDABgIQgBgHAGgEQAFgFAJAAQAIAAAGAFQAGAEAAAIIgLAAQgBgEgCgCQgCgCgEAAQgEAAgCACQgDABABADQAAABAAAAQAAABAAAAQAAABABAAQAAABABAAQACACAGABQAHACADACQAFABACADQABADAAAEQABAHgHAEQgFAFgJAAQgGAAgFgDg");
	this.shape_3.setTransform(23.6,-0.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgRAmIAahLIAJAAIgaBLg");
	this.shape_4.setTransform(16.625,-1.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgNAaIAAgzIALAAIABAGQADgGAIAAIADAAIAAALIgEAAQgIAAgCAGIAAAig");
	this.shape_5.setTransform(13.25,-0.775);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgQAWQgFgEAAgHQAAgIAGgDQAGgFALAAIAHAAIAAgDQgBgEgCgDQgCgCgEAAQgDAAgDACQgCACAAADIgMAAQAAgEADgEQADgEAEgCQAGgCAEAAQAKAAAEAFQAGAEABAIIAAAXQgBAHACAEIAAABIgLAAIgCgFQgFAGgIAAQgHAAgFgFgAgGAEQgDACgBAEQABADACACQACACADAAQADAAADgBQADgCACgDIAAgKIgGAAQgGAAgDADg");
	this.shape_6.setTransform(8.65,-0.725);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgKAYQgFgCgCgEQgDgEgBgFIAMAAQAAAFADACQADACAEAAQAEAAADgCQACgBAAgDQAAgDgCgCIgIgDIgKgDQgJgDABgIQgBgHAGgEQAFgFAJAAQAJAAAGAFQAFAEAAAIIgLAAQgBgEgCgCQgDgCgDAAQgDAAgDACQgDABABADQAAABAAAAQAAABAAAAQAAABABAAQAAABABAAQACACAGABQAHACADACQAFABACADQABADAAAEQAAAHgFAEQgGAFgJAAQgGAAgFgDg");
	this.shape_7.setTransform(3.45,-0.725);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgQAWQgFgEAAgHQAAgIAGgDQAGgFALAAIAHAAIAAgDQgBgEgCgDQgCgCgEAAQgDAAgDACQgCACAAADIgMAAQAAgEADgEQADgEAEgCQAGgCAEAAQAKAAAEAFQAGAEABAIIAAAXQgBAHACAEIAAABIgLAAIgCgFQgFAGgIAAQgHAAgFgFgAgGAEQgDACgBAEQABADACACQACACADAAQADAAADgBQADgCACgDIAAgKIgGAAQgGAAgDADg");
	this.shape_8.setTransform(-1.7,-0.725);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AAJAlIgOgWIgFAFIAAARIgMAAIAAhJIAMAAIAAAqIADgFIAOgPIAOAAIgTAVIAVAeg");
	this.shape_9.setTransform(-6.575,-1.825);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgFASIAAgcIgJAAIAAgJIAJAAIAAgNIAKAAIAAANIAJAAIAAAJIgJAAIAAAbIABAFQABAAAAAAQABABAAAAQABAAAAAAQABAAABAAIAEAAIAAAJIgIABQgMAAAAgPg");
	this.shape_10.setTransform(-13.675,-1.325);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgQAVQgFgFABgIIAAghIALAAIAAAgQAAAKAJAAQAHAAADgGIAAgkIALAAIAAAzIgLAAIAAgFQgFAFgIABQgJgBgEgFg");
	this.shape_11.setTransform(-17.95,-0.7);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgLAfIAAAFIgLAAIAAhIIAMAAIAAAaQAFgFAHAAQAKAAAFAHQAGAHAAALIAAABQAAAMgGAHQgFAHgKAAQgIAAgFgGgAgKAAIAAAVQADAHAHAAQAFAAADgEQADgEAAgJIAAgBQAAgJgDgDQgDgEgFAAQgHAAgDAGg");
	this.shape_12.setTransform(-23.275,-1.775);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AAZAaIAAggQAAgFgCgDQgCgCgFAAQgEAAgDACQgCACgBAEIAAAiIgLAAIAAghQAAgJgJAAQgHAAgDAGIAAAkIgMAAIAAgzIALAAIAAAGQAGgGAJAAQAKAAAEAHQAFgHAKAAQAJAAAEAEQAEAFABAJIAAAhg");
	this.shape_13.setTransform(-30.375,-0.775);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgQAWQgFgEAAgHQAAgIAGgDQAGgFALAAIAGAAIAAgDQAAgEgCgDQgCgCgEAAQgEAAgCACQgDACAAADIgLAAQAAgEACgEQAEgEAEgCQAGgCAEAAQAKAAAEAFQAGAEABAIIAAAXQgBAHACAEIAAABIgLAAIgCgFQgFAGgIAAQgIAAgEgFgAgGAEQgEACAAAEQAAADADACQACACADAAQADAAADgBQADgCABgDIAAgKIgFAAQgGAAgDADg");
	this.shape_14.setTransform(-37.35,-0.725);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AANAjIgNgbIgNAAIAAAbIgMAAIAAhFIAYAAQALAAAHAGQAGAFAAAKQAAAHgDAFQgDAEgGACIAPAdIAAABgAgNgBIAMAAQAFAAAEgDQADgDAAgFQAAgGgDgDQgDgDgFAAIgNAAg");
	this.shape_15.setTransform(-42.775,-1.625);

	this.satu = new lib.satu();
	this.satu.name = "satu";
	this.satu.setTransform(-2.55,-0.3);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(0.534,0,0,0.494,-66.5,-21.5)).s().p("AqYDXIAAmtIUxAAIAAGtg");
	this.shape_16.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_16},{t:this.satu},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-66.4,-21.5,132.9,43);


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
	this.instance = new lib._10_1();
	this.instance.setTransform(-147,-211,0.9475,1.2868);

	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_2
	this.instance_1 = new lib.Tween7_1("synched",0);
	this.instance_1.setTransform(42.25,-40.25);
	this.instance_1.alpha = 0;

	this.instance_2 = new lib.Tween8copy_1("synched",0);
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
	this.instance = new lib.Gpngcopy();
	this.instance.setTransform(-258,-244,1.5837,1.5837);

	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_2
	this.instance_1 = new lib.Tween7_1("synched",0);
	this.instance_1.setTransform(42.25,-40.25);
	this.instance_1.alpha = 0;

	this.instance_2 = new lib.Tween8copy_1("synched",0);
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
	this.g3 = new lib.g3();
	this.g3.name = "g3";
	this.g3.setTransform(44.55,-40.85,5.7506,5.7506,0,0,0,0.4,-0.1);

	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.g3}]},12).to({state:[]},1).wait(12));

	// Layer_2
	this.instance = new lib.Tween7_1("synched",0);
	this.instance.setTransform(42.25,-40.25);
	this.instance.alpha = 0;

	this.instance_1 = new lib.Tween8copy_1("synched",0);
	this.instance_1.setTransform(42.25,-40.25);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,alpha:1},12).to({_off:false,alpha:0},12).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},12).to({_off:true,alpha:0},12).wait(1));

	// Layer_3
	this.cobaBG = new lib.Tween10_1();
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
	this.exit = new lib.btnEitcopy();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);
	this.exit._off = true;

	this.timeline.addTween(cjs.Tween.get(this.exit).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// jawaban2
	this.target = new lib.drag8G12();
	this.target.name = "target";
	this.target.setTransform(232.55,-19.85,1.2152,1.2166,0,0,0,45.2,47.1);
	new cjs.ButtonHelper(this.target, 0, 1, 1);

	this.target_1 = new lib.drag8G11();
	this.target_1.name = "target_1";
	this.target_1.setTransform(113.4,-19.85,1.2152,1.2166,0,0,0,44.8,47.1);
	new cjs.ButtonHelper(this.target_1, 0, 1, 1);

	this.target_2 = new lib.drag8G10();
	this.target_2.name = "target_2";
	this.target_2.setTransform(-6.95,-19.85,1.2152,1.2166,0,0,0,44.9,47.1);
	new cjs.ButtonHelper(this.target_2, 0, 1, 1);

	this.target_3 = new lib.drag8G9();
	this.target_3.name = "target_3";
	this.target_3.setTransform(-126.65,-19.85,1.2152,1.2166,0,0,0,44.9,47.1);
	new cjs.ButtonHelper(this.target_3, 0, 1, 1);

	this.drag2G1 = new lib.drag7G8();
	this.drag2G1.name = "drag2G1";
	this.drag2G1.setTransform(42.95,-129.5,1.6642,1.6642,0,0,0,98.1,14.4);
	new cjs.ButtonHelper(this.drag2G1, 0, 1, 2, false, new lib.drag7G8(), 3);

	this.pieces1 = new lib.Pieces1copy();
	this.pieces1.name = "pieces1";
	this.pieces1.setTransform(-361.75,-501.05,1.2656,1.2656,0,0,0,-0.1,-0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.pieces1},{t:this.drag2G1},{t:this.target_3},{t:this.target_2},{t:this.target_1},{t:this.target}]},12).to({state:[]},1).wait(12));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#ECF0F1").s().p("AAfBSIAAhnQgBgQgGgHQgHgIgOAAQgWABgLATIAAByIgkAAIAAigIAjAAIAAASQASgVAcAAQAzAAABA5IAABqg");
	this.shape.setTransform(151.65,-238);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#ECF0F1").s().p("Ag1BFQgPgNAAgUQAAgaATgNQATgOAiAAIAXAAIAAgKQAAgNgHgIQgHgHgOAAQgMAAgIAGQgHAHgBAJIgkAAQAAgNAJgMQAJgMAPgGQAPgHASAAQAcAAARAPQAQAOABAZIAABJQAAAVAGANIAAADIglAAQgCgFgCgLQgRASgYAAQgYAAgQgOgAgWAMQgKAHAAAMQAAALAHAGQAHAHAMAAQAJgBAKgFQAJgFAFgJIAAgeIgUAAQgSAAgLAHg");
	this.shape_1.setTransform(135,-237.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#ECF0F1").s().p("AgjBfIgCASIghAAIAAjkIAkAAIAABTQAQgSAaAAQAdAAARAWQARAVAAAnIAAACQAAAlgRAXQgRAWgdAAQgbAAgQgVgAgiAAIAABBQAKAVAYAAQAQAAAJgMQAJgNAAgaIAAgEQAAgagJgNQgJgNgRAAQgXAAgKAVg");
	this.shape_2.setTransform(118.525,-241.075);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#ECF0F1").s().p("Ag1BFQgPgNAAgUQAAgaATgNQATgOAjAAIAWAAIAAgKQAAgNgHgIQgHgHgOAAQgMAAgHAGQgJAHABAJIgkAAQAAgNAIgMQAJgMAPgGQAPgHARAAQAdAAARAPQARAOAAAZIAABJQAAAVAGANIAAADIgkAAQgDgFgCgLQgRASgYAAQgZAAgPgOgAgWAMQgKAHAAAMQAAALAHAGQAHAHALAAQAKgBAKgFQAJgFAFgJIAAgeIgTAAQgTAAgLAHg");
	this.shape_3.setTransform(101.4,-237.85);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#ECF0F1").s().p("AAiBRIgihuIgiBuIgdAAIgsigIAjAAIAaBsIAhhsIAaAAIAiBtIAahtIAjAAIgsCgg");
	this.shape_4.setTransform(81.75,-237.85);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#ECF0F1").s().p("Ag1BFQgPgNAAgUQAAgaATgNQATgOAjAAIAWAAIAAgKQAAgNgHgIQgHgHgOAAQgMAAgHAGQgJAHABAJIgkAAQAAgNAIgMQAJgMAPgGQAPgHARAAQAdAAARAPQARAOAAAZIAABJQAAAVAGANIAAADIgkAAQgDgFgCgLQgRASgYAAQgZAAgPgOgAgWAMQgKAHAAAMQAAALAHAGQAHAHALAAQAKgBAKgFQAJgFAFgJIAAgeIgTAAQgTAAgLAHg");
	this.shape_5.setTransform(62.25,-237.85);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#ECF0F1").s().p("Ag0BdQgSgSAAgeIAmAAQAAARAJAJQAIAJAPAAQAPAAAKgKQAIgKAAgSIAAiXIAmAAIAACXQAAAfgTASQgUATggAAQghAAgTgRg");
	this.shape_6.setTransform(44.8,-240.475);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#ECF0F1").s().p("AgpBSIAAigIAiAAIABASQAMgVAXAAQAIAAAFACIAAAiIgPgBQgYAAgIATIAABtg");
	this.shape_7.setTransform(24.825,-238);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#ECF0F1").s().p("Ag1BFQgPgNAAgUQAAgaATgNQATgOAiAAIAXAAIAAgKQAAgNgHgIQgHgHgNAAQgMAAgJAGQgHAHgBAJIgkAAQAAgNAJgMQAJgMAPgGQAPgHASAAQAcAAARAPQARAOAAAZIAABJQAAAVAGANIAAADIglAAQgCgFgCgLQgRASgYAAQgZAAgPgOgAgWAMQgKAHAAAMQAAALAHAGQAHAHAMAAQAJgBAKgFQAJgFAFgJIAAgeIgTAAQgUAAgKAHg");
	this.shape_8.setTransform(10.55,-237.85);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#ECF0F1").s().p("AgjBfIgCASIghAAIAAjkIAkAAIAABTQAQgSAaAAQAdAAARAWQARAVAAAnIAAACQAAAlgRAXQgRAWgdAAQgbAAgQgVgAgiAAIAABBQAKAVAYAAQAQAAAJgMQAJgNAAgaIAAgEQAAgagJgNQgJgNgRAAQgXAAgKAVg");
	this.shape_9.setTransform(-5.975,-241.075);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#ECF0F1").s().p("ABOBSIAAhoQAAgPgGgIQgIgHgPAAQgMAAgIAHQgIAHgDALIAABtIgjAAIAAhpQgBgcgcgBQgWABgJARIAAB0IgkAAIAAigIAiAAIABARQARgUAdAAQAgAAALAZQASgZAgAAQAbAAANAPQANAPAAAcIAABpg");
	this.shape_10.setTransform(-28.15,-238);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#ECF0F1").s().p("AgwA+QgWgWAAgkIAAgEQAAgYAJgSQAKgUARgKQAQgLAUAAQAhAAASAWQASAUAAAnIAAANIhoAAQABAUAMAMQAMAMAQAAQAZgBAQgTIATASQgJAPgQAHQgRAJgUgBQghABgVgWgAgVgrQgJAKgDATIBEAAIAAgCQgBgTgJgJQgIgJgPAAQgOAAgJAKg");
	this.shape_11.setTransform(-49.475,-237.85);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#ECF0F1").s().p("AhDBsIAAjXIAlAAIAAC5IBiAAIAAAeg");
	this.shape_12.setTransform(-65.25,-240.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).to({state:[]},1).wait(12));

	// Layer_8
	this.instance = new lib.kkoo_1();
	this.instance.setTransform(43.05,-17.05,1,1,0,0,0,404.1,193.9);
	this.instance.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,15);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_2
	this.instance_1 = new lib.Tween7copy2("synched",0);
	this.instance_1.setTransform(42.25,-40.25);
	this.instance_1.alpha = 0;

	this.instance_2 = new lib.Tween8copy2("synched",0);
	this.instance_2.setTransform(42.25,-40.25);
	this.instance_2._off = true;

	this.instance_3 = new lib.Tween7copy_1("synched",0);
	this.instance_3.setTransform(42.25,-40.25);
	this.instance_3.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},12).to({state:[{t:this.instance_3}]},12).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true,alpha:1},12).wait(13));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:false},12).to({_off:true,alpha:0},12).wait(1));

	// Layer_3
	this.cobaBG = new lib.Tween10copy();
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


(lib.lima1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.lima = new lib.lima();
	this.lima.name = "lima";

	this.timeline.addTween(cjs.Tween.get(this.lima).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-52.3,-16.2,104.69999999999999,32.5);


(lib.empat1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.empat = new lib.empat();
	this.empat.name = "empat";

	this.timeline.addTween(cjs.Tween.get(this.empat).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69,-25.2,138.1,50.5);


(lib.dua1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.dua = new lib.dua();
	this.dua.name = "dua";

	this.timeline.addTween(cjs.Tween.get(this.dua).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69,-25.2,138.1,50.5);


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
		var _this = this;
		
		root1.stop();
		
		_this.popUpSalah.visible = !_this.popUpSalah.visible;
		_this.popUpBenar.visible = !_this.popUpBenar.visible;
		_this.popUpSelesai.visible = !_this.popUpSelesai.visible;
		_this.popUpDanger.visible = !_this.popUpDanger.visible;
		
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
		  _this.sound3.play();
		  _this.popUpSalah.visible = !_this.popUpSalah.visible;
		  setTimeout(function () {
		    _this.popUpSalah.visible = !_this.popUpSalah.visible;
		  }, 3000);
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
		  _this.sound2.play();
		  _this.popUpBenar.visible = !_this.popUpBenar.visible;
		  setTimeout(function () {
		    _this.popUpBenar.visible = !_this.popUpBenar.visible;
		  }, 3000);
		  winMessage1.text = "Selamat! Tebakan Anda Benar!";
		  pieces1.skor++;
		  Score1.text = pieces1.skor * 25;
		  winMessage1.alpha = 0;
		  winMessage1.y = winMessage1.originalY + 60;
		  createjs.Tween.get(winMessage1).to(
		    { alpha: 1, y: winMessage1.originalY },
		    500,
		    createjs.Ease.backInOut
		  );
		};
		
		root1.onWin = function () {
		  _this.sound2.play();
		  _this.popUpSelesai.visible = !_this.popUpSelesai.visible;
		  setTimeout(function () {
		    _this.popUpSelesai.visible = !_this.popUpSelesai.visible;
		  }, 3000);
		  winMessage1.text = "Yey!, Anda Berhasil Menyelesaikan Tantangan. Selamat!";
		  winMessage1.alpha = 0;
		  winMessage1.y = winMessage1.originalY + 60;
		  createjs.Tween.get(winMessage1).to(
		    { alpha: 1, y: winMessage1.originalY },
		    500,
		    createjs.Ease.backInOut
		  );
			    root1.popUpJawabanAkhir.gotoAndPlay(0);
		
		
		};
		
		root1.onMiss = function () {
		  _this.sound3.play();
		  _this.popUpDanger.visible = !_this.popUpDanger.visible;
		  setTimeout(function () {
		    _this.popUpDanger.visible = !_this.popUpDanger.visible;
		  }, 3000);
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
		
		var tombol;
		var _this = this;
		
		function init() {
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
		  }
		}
		
		init();
		root1.setup();
		createjs.Sound.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// Layer_4
	this.popUpJawabanAkhir = new lib.popUpJawabanAkhir();
	this.popUpJawabanAkhir.name = "popUpJawabanAkhir";
	this.popUpJawabanAkhir.setTransform(-239.05,-42.9);

	this.timeline.addTween(cjs.Tween.get(this.popUpJawabanAkhir).wait(1));

	// Layer_3
	this.popUpDanger = new lib.dsdsdd();
	this.popUpDanger.name = "popUpDanger";
	this.popUpDanger.setTransform(-160.85,53.4,0.2822,0.2834,0,0,0,33.1,33.1);

	this.popUpSelesai = new lib.dsd();
	this.popUpSelesai.name = "popUpSelesai";
	this.popUpSelesai.setTransform(-151.75,-7.7,0.2822,0.2834,0,0,0,33.1,33.1);

	this.popUpSalah = new lib.fff();
	this.popUpSalah.name = "popUpSalah";
	this.popUpSalah.setTransform(-151.75,-7.7,0.2822,0.2834,0,0,0,33.1,33.1);

	this.popUpBenar = new lib.bener();
	this.popUpBenar.name = "popUpBenar";
	this.popUpBenar.setTransform(-151.75,-7.7,0.2823,0.2834,0,0,0,33.1,33.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.popUpBenar},{t:this.popUpSalah},{t:this.popUpSelesai},{t:this.popUpDanger}]}).wait(1));

	// Layer_1
	this.restart1 = new lib.Restart();
	this.restart1.name = "restart1";
	this.restart1.setTransform(101.65,-13.95,0.5444,0.5444,0,0,0,0.1,0);
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
	this.Score1.setTransform(155.243,-27.35,1.9238,1.9238);

	this.slots1 = new lib.Slots1();
	this.slots1.name = "slots1";
	this.slots1.setTransform(-201.05,-254.8,0.8714,0.8714);

	this.drag2G1 = new lib.drag7G8();
	this.drag2G1.name = "drag2G1";
	this.drag2G1.setTransform(-2.6,-11.45,0.8086,0.8086,0,0,0,98.2,14.5);
	new cjs.ButtonHelper(this.drag2G1, 0, 1, 2, false, new lib.drag7G8(), 3);

	this.pieces1 = new lib.Pieces1();
	this.pieces1.name = "pieces1";
	this.pieces1.setTransform(-201.05,-254.8,0.8714,0.8714);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,102,255,0.008)").s().p("EgmrAPdIAA+5MBNXAAAIAAe5g");
	this.shape.setTransform(-12.625,28.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.pieces1},{t:this.drag2G1},{t:this.slots1},{t:this.Score1},{t:this.winMessage1},{t:this.restart1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg5, new cjs.Rectangle(-675.6,-357.1,960.2,543.1), null);


(lib.popUpJawabanAkhirUtama = function(mode,startPosition,loop) {
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
	this.lima = new lib.lima1();
	this.lima.name = "lima";
	this.lima.setTransform(53.7,77.35,1.46,1.46);
	new cjs.ButtonHelper(this.lima, 0, 1, 1);

	this.empat = new lib.empat1();
	this.empat.name = "empat";
	this.empat.setTransform(-246.3,80.8,1.46,1.46);
	new cjs.ButtonHelper(this.empat, 0, 1, 1);

	this.tiga = new lib.tiga1();
	this.tiga.name = "tiga";
	this.tiga.setTransform(316.55,-102.85,1.46,1.46);
	new cjs.ButtonHelper(this.tiga, 0, 1, 1);

	this.dua = new lib.dua1();
	this.dua.name = "dua";
	this.dua.setTransform(45.65,-96.75,1.46,1.46);
	new cjs.ButtonHelper(this.dua, 0, 1, 1);

	this.satu = new lib.satu1();
	this.satu.name = "satu";
	this.satu.setTransform(-229.35,-99.25,1.46,1.46);
	new cjs.ButtonHelper(this.satu, 0, 1, 1);

	this.lima_1 = new lib.lima4();
	this.lima_1.name = "lima_1";
	this.lima_1.setTransform(49.35,35.8,1.46,1.46,0,0,0,-3,2.1);

	this.empat_1 = new lib.empat4();
	this.empat_1.name = "empat_1";
	this.empat_1.setTransform(-249.4,35.45,1.46,1.46,0,0,0,-2.1,1.8);

	this.tiga_1 = new lib.tiga4();
	this.tiga_1.name = "tiga_1";
	this.tiga_1.setTransform(313.5,-150.8,1.46,1.46,0,0,0,-2.1,1.6);

	this.dua_1 = new lib.dua4();
	this.dua_1.name = "dua_1";
	this.dua_1.setTransform(43,-151.1,1.46,1.46,0,0,0,-1.8,1.4);

	this.satu_1 = new lib.satu4();
	this.satu_1.name = "satu_1";
	this.satu_1.setTransform(-230.5,-151.55,1.46,1.46,0,0,0,-0.8,1.1);
	new cjs.ButtonHelper(this.satu_1, 0, 1, 1);

	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.satu_1},{t:this.dua_1},{t:this.tiga_1},{t:this.empat_1},{t:this.lima_1},{t:this.satu},{t:this.dua},{t:this.tiga},{t:this.empat},{t:this.lima}]},12).to({state:[]},1).wait(12));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#ECF0F1").s().p("AAfBSIAAhnQgBgQgGgHQgHgIgOAAQgWABgLATIAAByIgkAAIAAigIAjAAIAAASQASgVAcAAQAzAAABA5IAABqg");
	this.shape.setTransform(151.65,-238);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#ECF0F1").s().p("Ag1BFQgPgNAAgUQAAgaATgNQATgOAiAAIAXAAIAAgKQAAgNgHgIQgHgHgOAAQgMAAgIAGQgHAHgBAJIgkAAQAAgNAJgMQAJgMAPgGQAPgHASAAQAcAAARAPQAQAOABAZIAABJQAAAVAGANIAAADIglAAQgCgFgCgLQgRASgYAAQgYAAgQgOgAgWAMQgKAHAAAMQAAALAHAGQAHAHAMAAQAJgBAKgFQAJgFAFgJIAAgeIgUAAQgSAAgLAHg");
	this.shape_1.setTransform(135,-237.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#ECF0F1").s().p("AgjBfIgCASIghAAIAAjkIAkAAIAABTQAQgSAaAAQAdAAARAWQARAVAAAnIAAACQAAAlgRAXQgRAWgdAAQgbAAgQgVgAgiAAIAABBQAKAVAYAAQAQAAAJgMQAJgNAAgaIAAgEQAAgagJgNQgJgNgRAAQgXAAgKAVg");
	this.shape_2.setTransform(118.525,-241.075);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#ECF0F1").s().p("Ag1BFQgPgNAAgUQAAgaATgNQATgOAjAAIAWAAIAAgKQAAgNgHgIQgHgHgOAAQgMAAgHAGQgJAHABAJIgkAAQAAgNAIgMQAJgMAPgGQAPgHARAAQAdAAARAPQARAOAAAZIAABJQAAAVAGANIAAADIgkAAQgDgFgCgLQgRASgYAAQgZAAgPgOgAgWAMQgKAHAAAMQAAALAHAGQAHAHALAAQAKgBAKgFQAJgFAFgJIAAgeIgTAAQgTAAgLAHg");
	this.shape_3.setTransform(101.4,-237.85);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#ECF0F1").s().p("AAiBRIgihuIgiBuIgdAAIgsigIAjAAIAaBsIAhhsIAaAAIAiBtIAahtIAjAAIgsCgg");
	this.shape_4.setTransform(81.75,-237.85);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#ECF0F1").s().p("Ag1BFQgPgNAAgUQAAgaATgNQATgOAjAAIAWAAIAAgKQAAgNgHgIQgHgHgOAAQgMAAgHAGQgJAHABAJIgkAAQAAgNAIgMQAJgMAPgGQAPgHARAAQAdAAARAPQARAOAAAZIAABJQAAAVAGANIAAADIgkAAQgDgFgCgLQgRASgYAAQgZAAgPgOgAgWAMQgKAHAAAMQAAALAHAGQAHAHALAAQAKgBAKgFQAJgFAFgJIAAgeIgTAAQgTAAgLAHg");
	this.shape_5.setTransform(62.25,-237.85);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#ECF0F1").s().p("Ag0BdQgSgSAAgeIAmAAQAAARAJAJQAIAJAPAAQAPAAAKgKQAIgKAAgSIAAiXIAmAAIAACXQAAAfgTASQgUATggAAQghAAgTgRg");
	this.shape_6.setTransform(44.8,-240.475);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#ECF0F1").s().p("AgpBSIAAigIAiAAIABASQAMgVAXAAQAIAAAFACIAAAiIgPgBQgYAAgIATIAABtg");
	this.shape_7.setTransform(24.825,-238);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#ECF0F1").s().p("Ag1BFQgPgNAAgUQAAgaATgNQATgOAiAAIAXAAIAAgKQAAgNgHgIQgHgHgNAAQgMAAgJAGQgHAHgBAJIgkAAQAAgNAJgMQAJgMAPgGQAPgHASAAQAcAAARAPQARAOAAAZIAABJQAAAVAGANIAAADIglAAQgCgFgCgLQgRASgYAAQgZAAgPgOgAgWAMQgKAHAAAMQAAALAHAGQAHAHAMAAQAJgBAKgFQAJgFAFgJIAAgeIgTAAQgUAAgKAHg");
	this.shape_8.setTransform(10.55,-237.85);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#ECF0F1").s().p("AgjBfIgCASIghAAIAAjkIAkAAIAABTQAQgSAaAAQAdAAARAWQARAVAAAnIAAACQAAAlgRAXQgRAWgdAAQgbAAgQgVgAgiAAIAABBQAKAVAYAAQAQAAAJgMQAJgNAAgaIAAgEQAAgagJgNQgJgNgRAAQgXAAgKAVg");
	this.shape_9.setTransform(-5.975,-241.075);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#ECF0F1").s().p("ABOBSIAAhoQAAgPgGgIQgIgHgPAAQgMAAgIAHQgIAHgDALIAABtIgjAAIAAhpQgBgcgcgBQgWABgJARIAAB0IgkAAIAAigIAiAAIABARQARgUAdAAQAgAAALAZQASgZAgAAQAbAAANAPQANAPAAAcIAABpg");
	this.shape_10.setTransform(-28.15,-238);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#ECF0F1").s().p("AgwA+QgWgWAAgkIAAgEQAAgYAJgSQAKgUARgKQAQgLAUAAQAhAAASAWQASAUAAAnIAAANIhoAAQABAUAMAMQAMAMAQAAQAZgBAQgTIATASQgJAPgQAHQgRAJgUgBQghABgVgWgAgVgrQgJAKgDATIBEAAIAAgCQgBgTgJgJQgIgJgPAAQgOAAgJAKg");
	this.shape_11.setTransform(-49.475,-237.85);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#ECF0F1").s().p("AhDBsIAAjXIAlAAIAAC5IBiAAIAAAeg");
	this.shape_12.setTransform(-65.25,-240.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).to({state:[]},1).wait(12));

	// Layer_8
	this.instance = new lib.kkoo();
	this.instance.setTransform(43.05,-17.05,1,1,0,0,0,404.1,193.9);
	this.instance.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,15);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_2
	this.instance_1 = new lib.Tween7_1("synched",0);
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
	this.cobaBG = new lib.Tween10_1();
	this.cobaBG.name = "cobaBG";
	this.cobaBG.setTransform(43.75,-42.75,1.1855,0.9051,0,0,0,0.2,-0.1);
	this.cobaBG.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.cobaBG).to({alpha:0.75},12).to({alpha:0},12).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-436.6,-314.2,960.2,543.1);


(lib.Pieces10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// pieces
	this.lima = new lib.lima1();
	this.lima.name = "lima";
	this.lima.setTransform(327.75,460.15);
	new cjs.ButtonHelper(this.lima, 0, 1, 1);

	this.empat = new lib.empat1();
	this.empat.name = "empat";
	this.empat.setTransform(327.75,410.7);
	new cjs.ButtonHelper(this.empat, 0, 1, 1);

	this.tiga = new lib.tiga1();
	this.tiga.name = "tiga";
	this.tiga.setTransform(327.75,356.75);
	new cjs.ButtonHelper(this.tiga, 0, 1, 1);

	this.dua = new lib.dua1();
	this.dua.name = "dua";
	this.dua.setTransform(327.75,299.1);
	new cjs.ButtonHelper(this.dua, 0, 1, 1);

	this.satu = new lib.satu1();
	this.satu.name = "satu";
	this.satu.setTransform(330.3,247.4);
	new cjs.ButtonHelper(this.satu, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.satu},{t:this.dua},{t:this.tiga},{t:this.empat},{t:this.lima}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces10, new cjs.Rectangle(258.7,225.9,138.10000000000002,250.49999999999997), null);


// stage content:
(lib.game11 = function(mode,startPosition,loop) {
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
		  window.location.replace("../game12/index.html");
		});
		
		root.btnBack3.on("click", function () {
		  window.location.replace("../game10/index.html");
		});
		var root = this;
		var _this = this;
		var pieces = root.pieces;
		var slots = root.slots;
		var restart = root.restart;
		var winMessage = root.winMessage;
		var Score = root.Score;
		var positions1 = [];
		
		root.stop();
		
		_this.popUpSalah.visible = !_this.popUpSalah.visible;
		_this.popUpBenar.visible = !_this.popUpBenar.visible;
		_this.popUpSelesai.visible = !_this.popUpSelesai.visible;
		_this.popUpDanger.visible = !_this.popUpDanger.visible;
		
		
		
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
		  _this.sound3.play();
		  _this.popUpSalah.visible = !_this.popUpSalah.visible;
		  setTimeout(function () {
		    _this.popUpSalah.visible = !_this.popUpSalah.visible;
		  }, 3000);
		
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
		  _this.sound2.play();
		  _this.popUpBenar.visible = !_this.popUpBenar.visible;
		  setTimeout(function () {
		    _this.popUpBenar.visible = !_this.popUpBenar.visible;
		  }, 3000);
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
		  _this.sound2.play();
		  _this.popUpSelesai.visible = !_this.popUpSelesai.visible;
		  setTimeout(function () {
		    _this.popUpSelesai.visible = !_this.popUpSelesai.visible;
		  }, 3000);
		  winMessage.text = "Yey!, Anda Berhasil Menyelesaikan Tantangan. Selamat!";
		  winMessage.alpha = 0;
		  winMessage.y = winMessage.originalY + 60;
		  createjs.Tween.get(winMessage).to(
		    { alpha: 1, y: winMessage.originalY },
		    500,
		    createjs.Ease.backInOut
		  );
			  root.popUpJawabanAkhirUtama.gotoAndPlay(0);
		
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
	this.shape.graphics.f("#FFFFFF").s().p("AgNASQgEgDAAgGQAAgGAFgDQAFgDAJAAIAHAAIAAgEQAAgEgDgCQgCgCgEgBQgDAAgDACQgDADAAACIgHAAQAAgDACgDQADgDADgBQAEgCAEAAQAHAAAFADQAEAEAAAGIAAATQAAAHACADIAAAAIgIAAIgBgEQgFAGgGAAQgHgBgEgEgAgKAIQAAAEADACQACACAEAAQACAAADgCQADgCACgDIAAgJIgGAAQgNAAAAAIg");
	this.shape.setTransform(444.375,59.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgKAWIAAgqIAHAAIABAFQACgGAHAAIAEABIAAAHIgFAAQgGgBgCAHIAAAdg");
	this.shape_1.setTransform(441,59.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgNASQgEgDAAgGQAAgGAFgDQAFgDAJAAIAHAAIAAgEQAAgEgDgCQgCgCgEgBQgDAAgDACQgDADAAACIgHAAQAAgDACgDQADgDADgBQAEgCAEAAQAHAAAFADQAEAEAAAGIAAATQAAAHACADIAAAAIgIAAIgBgEQgFAGgGAAQgHgBgEgEgAgKAIQAAAEADACQACACAEAAQACAAADgCQADgCACgDIAAgJIgGAAQgNAAAAAIg");
	this.shape_2.setTransform(437.175,59.45);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgMASQgEgEAAgIIAAgbIAHAAIAAAbQAAAJAIAAQAIAAADgFIAAgfIAHAAIAAAqIgHAAIAAgEQgEAFgIAAQgHAAgDgEg");
	this.shape_3.setTransform(432.725,59.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJAbQgFgCgDgEQgDgEAAgFIAIAAQAAAFAEADQAEADAFAAQAGAAAEgCQACgDAAgEQAAgEgCgCQgDgDgIgCQgJgDgEgDQgFgEAAgGQAAgHAFgEQAGgFAIAAQAGAAAFACQAEADADAEQACAEAAAFIgIAAQAAgGgDgDQgEgDgFAAQgFAAgDADQgEACAAAFQAAADAEADQADACAGACQAHACAEACQAEACACADQACAEAAAEQAAAHgGAEQgFAFgJAAQgFAAgFgDg");
	this.shape_4.setTransform(428.05,58.725);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3498DB").s().p("Aj8D9QhphpAAiUQAAiTBphqQBphoCTAAQCVAABoBoQBpBqAACTQAACUhpBpQhoBpiVAAQiTAAhphpg");
	this.shape_5.setTransform(437.8705,37.4545,0.9301,0.9301);

	this.instance = new lib.hehe();
	this.instance.setTransform(476.4,37.5,0.7145,0.9301,0,0,0,86.2,36);
	this.instance.shadow = new cjs.Shadow("rgba(0,0,0,1)",3,3,4);
	this.instance.cache(-2,-2,176,76);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.tandaSuaraOff},{t:this.hening},{t:this.tandaSuaraOn},{t:this.nyala}]}).wait(1));

	// Layer_5
	this.popUpJawabanAkhirUtama = new lib.popUpJawabanAkhirUtama();
	this.popUpJawabanAkhirUtama.name = "popUpJawabanAkhirUtama";
	this.popUpJawabanAkhirUtama.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.popUpJawabanAkhirUtama).wait(1));

	// Layer_3
	this.cobaha = new lib.bg5();
	this.cobaha.name = "cobaha";
	this.cobaha.setTransform(675.75,358.05);

	this.timeline.addTween(cjs.Tween.get(this.cobaha).wait(1));

	// Layer_2
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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.popUpBenar},{t:this.popUpSalah},{t:this.popUpSelesai},{t:this.popUpDanger}]}).wait(1));

	// pp3
	this.pp3 = new lib.pp1();
	this.pp3.name = "pp3";
	this.pp3.setTransform(436.4,314.2);

	this.timeline.addTween(cjs.Tween.get(this.pp3).wait(1));

	// pp2
	this.pp2 = new lib.pp2();
	this.pp2.name = "pp2";
	this.pp2.setTransform(436.4,314.2);

	this.timeline.addTween(cjs.Tween.get(this.pp2).wait(1));

	// pp1
	this.pp1 = new lib.pp3();
	this.pp1.name = "pp1";
	this.pp1.setTransform(436.4,314.2);

	this.timeline.addTween(cjs.Tween.get(this.pp1).wait(1));

	// code
	this.popUpInfo = new lib.popUpInfo();
	this.popUpInfo.name = "popUpInfo";
	this.popUpInfo.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.popUpInfo).wait(1));

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
	this.winMessage.setTransform(397.1551,164.45,0.9381,0.9381);

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
	this.shape_7.graphics.f("#FFFFFF").s().p("AgJApQgLAAgGgGQgHgHABgKQABgMAKgGQAKgHAQAAIAOAAIAAgHQACgHgEgEQgEgEgHAAQgGAAgEADQgGAEgBAFIgOAAQACgGAEgGQAFgFAHgDQAHgDAIAAQAMAAAHAIQAHAHgBAMIgHAmIAAAGIABAIIgBABIgMAAIgBgEIAAgFQgLAKgKAAIgBAAgAgLAFQgGAEgCAHQAAAGADAEQADADAGAAQAHABAFgEQAFgDAFgFIACgRIgKAAQgLAAgHAEg");
	this.shape_7.setTransform(167.2,195.7761);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgMAsQgEgGABgJIAIgwIgOAAIACgKIAOAAIADgUIANAAIgEAUIAPAAIgCAKIgPAAIgHAwIAAAEQABAFAEAAIAHgBIgBALIgJACQgIAAgEgGg");
	this.shape_8.setTransform(161.275,194.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgZAeQgIgKABgRIAAgDQACgLAGgKQAFgJAJgFQAIgFAIAAQANAAAHAIQAHAIAAANIAAAKIgBAFIgzAAQgBALAFAHQAFAIAJAAQALAAAKgKIAIAGQgFAHgIAEQgIAEgJAAQgOAAgJgLgAgIgXQgGAFgDAMIAlAAIABgBQABgJgEgHQgFgGgHAAIgCAAQgGAAgGAGg");
	this.shape_9.setTransform(154.7388,195.7977);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgJApQgLAAgGgGQgHgHABgKQABgMAKgGQAKgHAQAAIAOAAIAAgHQABgHgDgEQgEgEgGAAQgHAAgFADQgFAEgBAFIgOAAQACgGAEgGQAFgFAIgDQAGgDAIAAQAMAAAHAIQAHAHgBAMIgGAmIgBAGIABAIIAAABIgOAAIgBgEIABgFQgLAKgKAAIgBAAgAgLAFQgGAEgBAHQgBAGADAEQADADAHAAQAGABAEgEQAGgDAEgFIADgRIgKAAQgMAAgGAEg");
	this.shape_10.setTransform(146.55,195.7761);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAMA4IAJg0IAAgGQgBgKgLAAQgLAAgJAMIgKA4IgNAAIAUhvIANAAIgIArQAJgMAOABQALAAAFAHQAGAIgCAMIgIA0g");
	this.shape_11.setTransform(138.4161,194.125);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgUAkQgHgFgDgJQgDgJABgLIAAgDQACgLAFgJQAFgJAJgFQAIgFAJAAQANAAAHAIQAIAIAAANIgNAAQAAgIgEgFQgEgFgHAAQgJAAgHAIQgHAIgCANIAAACIAAAJQAAAJAFAFQAEAFAHAAQAHAAAFgEQAGgEACgHIAMAAQgBAHgFAGQgFAHgHADQgHADgHAAQgKAAgHgFg");
	this.shape_12.setTransform(130.9389,195.7977);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgEApQgKAAgHgGQgIgEgDgKQgDgJABgLQABgLAFgKQAGgJAJgGQAIgGAKABQAKAAAHAFQAHAGAEAJQADAJgBALIAAAAQgCAMgFAJQgGAKgIAFQgIAFgIAAIgCAAgAgMgVQgHAIgCANIAAABIAAAKQABAIAEAGQAFAFAHAAQAGAAAFgDQAGgEAEgHQADgHACgJIAAgJQgBgJgFgGQgEgFgHAAIgBAAQgJAAgHAIg");
	this.shape_13.setTransform(122.7614,195.8);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgaA0QgIgDgEgHIAIgIQAHALAMAAQAJAAAGgFQAGgGACgKIACgHQgKAKgMgBQgHAAgGgEQgFgEgDgHQgDgHgBgIIABgKQACgNAFgKQAFgJAIgFQAHgEAIAAQAOAAAHAKIADgIIAMAAIgOBMQgCAPgKAJQgKAJgOAAQgIAAgHgEgAgLgjQgHAJgBAQIAAADQAAAKADAGQAEAFAIABQALAAAIgMIAHgjQgFgLgLgBQgKAAgHAJg");
	this.shape_14.setTransform(114.325,197.275);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgPA2IAOhOIAMAAIgNBOgAACgnQgCgCABgEQAAgDABgDQACgCAEAAQADAAACACQADACAAAEQAAADgDACQgCADgDAAQgEAAgCgCg");
	this.shape_15.setTransform(108.75,194.3458);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgPA4IAShvIANAAIgSBvg");
	this.shape_16.setTransform(105.175,194.125);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgHA3QgKgBgIgEQgIgFgEgJQgEgJgBgLQAAgJACgMQADgNAGgLQAGgKAIgHQAMgIANAAQAQAAAJALQAJAKABASIgCATQgCAMgFAKQgEAKgIAHQgMAMgQAAIgBAAgAgJglQgIAGgEALQgFALgCAQIAAAFQAAAOAFAIQAGAJAKAAQANAAAJgKQAJgLADgSIACgPQABgPgGgIQgFgIgLAAIgCAAQgIAAgHAFg");
	this.shape_17.setTransform(98.2708,194.4246);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgPAmQgHgEgEgGQgFgGAAgHIAOAAQAAAHAFAEQAGAEAHAAQAIAAAEgDQAFgEAAgEQAAgGgEgDQgFgDgJgDQgKgCgGgCQgGgCgDgFQgDgEAAgGQAAgJAIgIQAJgGAMAAQANAAAIAGQAJAIgBAKIgNAAQAAgFgFgEQgFgEgGAAQgHAAgEADQgEAEgBAFQAAAEAEADQAFACAJACQAKADAGADQAHACADAFQACAEAAAHQAAAKgIAHQgJAGgNAAQgIAAgIgDg");
	this.shape_18.setTransform(190.55,175.8);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_19.setTransform(182.625,175.8);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_20.setTransform(176.725,174.125);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgXAeQgJgKgBgSIAAgCQAAgLAFgKQAFgIAHgGQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAAMAHAGQAHAIAIAAQAHAAAGgDQAEgDAEgFIAJAHQgKAPgVAAQgPAAgKgLgAgMgXQgFAGgBALIAmAAIAAgBQAAgKgFgHQgGgFgIAAQgHAAgGAGg");
	this.shape_21.setTransform(171.05,175.8);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAYA1IglgxIgNANIAAAkIgOAAIAAhpIAOAAIAAA0IAvg0IARAAIgpAvIAsA6g");
	this.shape_22.setTransform(162.925,174.425);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_23.setTransform(150.625,174.125);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_24.setTransform(144.5,174.35);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgLIAPAAIAAgTIAMAAIAAATIAPAAIAAALIgPAAIAAAwQAAAEACADQACADAFgBIAHgBIAAALIgLACQgJAAgEgFg");
	this.shape_25.setTransform(140.025,174.9);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgPAmQgHgEgFgGQgDgGAAgHIANAAQABAHAFAEQAEAEAIAAQAHAAAGgDQAEgEAAgEQAAgGgEgDQgEgDgKgDQgKgCgGgCQgGgCgDgFQgDgEAAgGQAAgJAIgIQAJgGALAAQAOAAAJAGQAHAIABAKIgOAAQAAgFgEgEQgGgEgHAAQgGAAgEADQgFAEABAFQAAAEADADQAEACAKACQAKADAGADQAGACADAFQAEAEAAAHQAAAKgJAHQgIAGgOAAQgIAAgIgDg");
	this.shape_26.setTransform(133.9,175.8);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_27.setTransform(128.25,174.35);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_28.setTransform(124.25,175.725);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgWAeQgLgKABgSIAAgCQgBgLAFgKQAEgIAJgGQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAAMAGAGQAIAIAJAAQAGAAAFgDQAFgDAEgFIAIAHQgKAPgTAAQgPAAgKgLgAgMgXQgGAGgBALIAnAAIAAgBQgBgKgFgHQgEgFgJAAQgHAAgGAGg");
	this.shape_29.setTransform(117.45,175.8);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgLIAPAAIAAgTIAMAAIAAATIAPAAIAAALIgPAAIAAAwQAAAEACADQACADAFgBIAHgBIAAALIgLACQgJAAgEgFg");
	this.shape_30.setTransform(110.775,174.9);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_31.setTransform(105.275,174.125);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_32.setTransform(96.875,175.8);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_33.setTransform(90.65,175.725);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_34.setTransform(83.625,175.8);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AAYA1IglgxIgNANIAAAkIgOAAIAAhpIAOAAIAAA0IAvg0IARAAIgpAvIAsA6g");
	this.shape_35.setTransform(75.475,174.425);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AARAmIAAgwQgBgIgDgEQgEgEgHAAQgGAAgEADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_36.setTransform(383.9,210.675);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgXAgQgGgGAAgKQAAgLAJgGQAIgGAPAAIANAAIAAgFQAAgIgFgDQgDgEgIAAQgGAAgEADQgGAEAAAEIgMAAQAAgFAEgFQAEgGAGgDQAIgCAGAAQANAAAHAGQAIAHAAALIAAAgQAAALACAGIAAABIgNAAIgBgIQgKAKgLgBQgKABgIgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAGgCQAFgEADgFIAAgPIgKAAQgXAAAAAOg");
	this.shape_37.setTransform(376.25,210.75);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AARAlIgRg3IgRA3IgKAAIgVhJIAMAAIAOA2IASg2IAJAAIARA3IAPg3IAMAAIgVBJg");
	this.shape_38.setTransform(367.2,210.75);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgVAcQgJgJAAgRIAAgCQAAgLAEgIQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAKAAARIAAAFIgxAAQABAKAGAIQAGAGAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPAAgJgKgAgLgVQgFAFgBAKIAkAAIAAgBQgBgJgEgFQgFgGgIAAQgHAAgFAGg");
	this.shape_39.setTransform(358.325,210.75);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AAZAyIAAguIgxAAIAAAuIgNAAIAAhjIANAAIAAArIAxAAIAAgrIANAAIAABjg");
	this.shape_40.setTransform(349.525,209.475);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AAQA1IgZgiIgIAIIAAAaIgNAAIAAhpIANAAIAAA/IAHgIIAWgXIAPAAIgcAdIAgAsg");
	this.shape_41.setTransform(338.025,209.2);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgGAzIAAhJIAMAAIAABJgAgFglQgBgCAAgDQAAgDABgCQACgCADAAQAEAAABACQACACABADQgBADgCACQgBACgEAAQgDAAgCgCg");
	this.shape_42.setTransform(332.3,209.4);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_43.setTransform(328.125,209.925);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgEgGQgEgFABgHIAMAAQABAHAEAEQAFADAHAAQAHAAAFgDQADgDAAgFQAAgFgDgDQgEgCgJgCQgKgCgFgDQgFgDgDgDQgDgEAAgGQAAgJAHgGQAIgGALAAQANAAAIAGQAIAHgBAKIgMAAQAAgFgEgEQgFgEgHAAQgGAAgEADQgDADAAAFQAAAEADADIANAFQAJACAFACQAHADACAEQADAEABAFQgBAKgHAHQgJAFgMAAQgIAAgHgDg");
	this.shape_44.setTransform(322.45,210.75);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgFAzIAAhJIALAAIAABJgAgEglQgCgCAAgDQAAgDACgCQACgCACAAQAEAAABACQACACAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_45.setTransform(317.15,209.4);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgGAAQgMAAgEAKIAAA0g");
	this.shape_46.setTransform(313.45,210.675);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgVAcQgJgJAAgRIAAgCQAAgLAEgIQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAKAAARIAAAFIgxAAQABAKAGAIQAGAGAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPAAgJgKgAgLgVQgFAFgBAKIAkAAIAAgBQgBgJgEgFQgFgGgIAAQgHAAgFAGg");
	this.shape_47.setTransform(307.075,210.75);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_48.setTransform(300.825,209.925);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AAQA1IgZgiIgIAIIAAAaIgNAAIAAhpIANAAIAAA/IAHgIIAWgXIAPAAIgcAdIAgAsg");
	this.shape_49.setTransform(295.675,209.2);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgXAgQgGgGgBgKQABgLAIgGQAJgGAPAAIANAAIAAgFQgBgIgEgDQgEgEgHAAQgGAAgEADQgGAEAAAEIgMAAQAAgFAEgFQAEgGAGgDQAHgCAIAAQAMAAAHAGQAIAHAAALIAAAgQAAALACAGIAAABIgNAAIgBgIQgKAKgLgBQgLABgHgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAGgCQAFgEADgFIAAgPIgLAAQgWAAAAAOg");
	this.shape_50.setTransform(287.85,210.75);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgGAAQgMAAgEAKIAAA0g");
	this.shape_51.setTransform(282.05,210.675);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgXAgQgHgGAAgKQABgLAIgGQAJgGAPAAIAMAAIAAgFQAAgIgDgDQgEgEgIAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgGAGgDQAIgCAHAAQAMAAAIAGQAGAHABALIAAAgQAAALACAGIAAABIgNAAIgCgIQgIAKgMgBQgKABgIgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgCQAGgEACgFIAAgPIgKAAQgWAAAAAOg");
	this.shape_52.setTransform(275.5,210.75);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AAWAyIgigvIgMANIAAAiIgNAAIAAhjIANAAIAAAxIArgxIAQAAIgmAsIApA3g");
	this.shape_53.setTransform(267.875,209.475);

	this.instance_4 = new lib.info();
	this.instance_4.setTransform(801.15,190.3);

	this.g2 = new lib.g2();
	this.g2.name = "g2";
	this.g2.setTransform(736.3,270.5);

	this.g3 = new lib.g3();
	this.g3.name = "g3";
	this.g3.setTransform(851.35,270.5);

	this.g1 = new lib.g1();
	this.g1.name = "g1";
	this.g1.setTransform(616.75,270.5);

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

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AABAOQAIgKAAgLIAAgMIAPAAIAAALQAAAIgEAHQgEAIgGAFgAgXAOQAHgKABgLIAAgMIAPAAIAAALQAAAIgEAHQgEAIgHAFg");
	this.shape_54.setTransform(714.625,108.725);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_55.setTransform(709.625,113.325);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_56.setTransform(702.85,114.875);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_57.setTransform(696.075,113.325);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAFQAFAEAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANABQAQAAAJAHQAKAJAAAMIgQAAQAAgHgFgFQgFgEgJAAQgHAAgFAEQgEADAAAGQAAAGAEACQAEAEALACQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPAAQgKgBgIgDg");
	this.shape_58.setTransform(685.425,114.95);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgbAnQgJgIAAgLQAAgOALgGQAKgIASAAIAPAAIAAgHQAAgJgEgFQgFgEgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgGAFgHQAEgGAIgEQAJgDAIAAQAQAAAJAHQAIAIABAOIAAAoQAAAMADAIIAAABIgQAAQgBgDgBgGQgLAKgOABQgNgBgIgHgAgUASQgBAHAFAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_59.setTransform(676.4,114.95);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_60.setTransform(669.725,113.075);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgaAjQgLgNAAgUIAAgCQAAgNAFgKQAFgKAJgHQAKgFAJAAQASgBAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgLgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_61.setTransform(663.225,114.95);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_62.setTransform(654.925,113.075);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AAvAuIAAg7QAAgJgEgFQgEgFgLAAQgIAAgGAFQgGAGAAAIIAAA7IgPAAIAAg6QAAgUgTAAQgPAAgFANIAABBIgQAAIAAhZIAOAAIABAKQAKgMAQAAQAUAAAFAPQAFgHAHgEQAHgEAKAAQAdAAABAgIAAA7g");
	this.shape_63.setTransform(638.4,114.875);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgLQAAgOALgGQAKgIATAAIAOAAIAAgHQABgJgFgFQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAFgHQAEgGAIgEQAJgDAIAAQAQAAAJAHQAIAIABAOIAAAoQAAAMADAIIAAABIgQAAQgCgDAAgGQgLAKgNABQgOgBgJgHgAgVASQABAHAEAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgMAAQgbAAAAAQg");
	this.shape_64.setTransform(626.3,114.95);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_65.setTransform(619.625,113.075);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgLQAAgOALgGQAKgIATAAIAPAAIAAgHQAAgJgFgFQgFgEgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgGAEgHQAFgGAJgEQAIgDAJAAQAPAAAJAHQAIAIABAOIAAAoQAAAMADAIIAAABIgQAAQgCgDAAgGQgLAKgNABQgOgBgJgHgAgVASQABAHAEAEQAFAFAIgBQAGAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_66.setTransform(612.9,114.95);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgMAQAAQAOAAAKALIAAgvIAPAAIAAB+IgOAAIgBgJQgJAKgQABQgPAAgKgNgAgPgGQgHAIAAARQAAAPAHAJQAGAJAKgBQAPAAAHgNIAAgoQgHgNgPAAQgKAAgGAJg");
	this.shape_67.setTransform(603.275,113.15);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAFQAFAEAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANABQAQAAAJAHQAKAJAAAMIgQAAQAAgHgFgFQgFgEgJAAQgHAAgFAEQgEADAAAGQAAAGAEACQAEAEALACQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPAAQgKgBgIgDg");
	this.shape_68.setTransform(590.125,114.95);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgaAjQgLgNAAgUIAAgCQAAgNAFgKQAFgKAJgHQAKgFAJAAQASgBAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgLgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_69.setTransform(581.325,114.95);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_70.setTransform(574.675,113.325);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAFQAFAEAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANABQAQAAAJAHQAKAJAAAMIgQAAQAAgHgFgFQgFgEgJAAQgHAAgFAEQgEADAAAGQAAAGAEACQAEAEALACQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPAAQgKgBgIgDg");
	this.shape_71.setTransform(568.225,114.95);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgaAjQgLgNAAgUIAAgCQAAgNAFgKQAFgKAJgHQAKgFAJAAQASgBAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgLgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_72.setTransform(559.425,114.95);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AglA/IAAh8IAOAAIABAKQAKgLAPAAQAQAAAKAMQAJAMAAAWIAAABQAAAUgJAMQgKANgQAAQgPAAgJgKIAAArgAgVgkIAAAqQAGAMAOgBQAKAAAHgIQAGgJABgQQgBgPgGgJQgHgJgKAAQgOAAgGANg");
	this.shape_73.setTransform(550.25,116.6);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAFQAFAEAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANABQAQAAAJAHQAKAJAAAMIgQAAQAAgHgFgFQgFgEgJAAQgHAAgFAEQgEADAAAGQAAAGAEACQAEAEALACQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPAAQgKgBgIgDg");
	this.shape_74.setTransform(540.925,114.95);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_75.setTransform(527.65,114.875);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgLQAAgOALgGQAKgIATAAIAOAAIAAgHQABgJgFgFQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAFgHQAEgGAIgEQAJgDAIAAQAQAAAJAHQAIAIABAOIAAAoQAAAMADAIIAAABIgQAAQgCgDAAgGQgLAKgNABQgOgBgJgHgAgVASQABAHAEAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgMAAQgbAAAAAQg");
	this.shape_76.setTransform(518.3,114.95);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_77.setTransform(509.975,113.075);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgbAnQgJgIAAgLQAAgOALgGQAKgIASAAIAPAAIAAgHQAAgJgEgFQgFgEgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgGAFgHQAEgGAIgEQAJgDAIAAQAQAAAJAHQAIAIABAOIAAAoQAAAMADAIIAAABIgQAAQgBgDgBgGQgLAKgOABQgNgBgIgHgAgUASQgBAHAFAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_78.setTransform(500.45,114.95);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AglA/IAAh8IAOAAIABAKQAJgLAQAAQAQAAAKAMQAJAMAAAWIAAABQAAAUgJAMQgKANgQAAQgPAAgKgKIAAArgAgWgkIAAAqQAIAMAOgBQAJAAAHgIQAHgJgBgQQABgPgHgJQgHgJgJAAQgOAAgIANg");
	this.shape_79.setTransform(491.25,116.6);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgJALgQAAQgOAAgIgIg");
	this.shape_80.setTransform(481.625,115.025);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_81.setTransform(474.525,114.875);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgaAjQgLgNAAgUIAAgCQAAgNAFgKQAFgKAJgHQAKgFAJAAQASgBAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgLgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_82.setTransform(466.775,114.95);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgJgFgFQgEgFgLAAQgIAAgGAFQgFAGgCAIIAAA7IgOAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgPAAIAAhZIAPAAIAAAKQAKgMARAAQASAAAHAPQAEgHAHgEQAHgEAKAAQAeAAAAAgIAAA7g");
	this.shape_83.setTransform(454.75,114.875);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgSA7QgKgEgFgHIAJgJQAKAMAOAAQAKAAAGgGQAHgHgBgLIAAgIQgJALgPAAQgPAAgKgNQgKgNAAgUQAAgWAKgMQAJgMARAAQAPgBAJAMIABgKIAOAAIAABXQAAARgKALQgLAJgRABQgJAAgJgFgAgPgpQgGAJgBARQABAPAGAIQAGAJAKgBQAPAAAGgNIAAgoQgGgNgPAAQgKAAgGAJg");
	this.shape_84.setTransform(438.15,116.65);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_85.setTransform(428.85,114.875);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgLQAAgOALgGQALgIASAAIAPAAIAAgHQAAgJgFgFQgFgEgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgGAEgHQAGgGAIgEQAIgDAJAAQAPAAAJAHQAJAIAAAOIAAAoQAAAMADAIIAAABIgQAAQgCgDAAgGQgLAKgNABQgOgBgJgHgAgVASQABAHAEAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_86.setTransform(419.5,114.95);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AgbA/IgFgBIAAgNIAEABQAIAAAEgEQAEgDADgIIAEgJIgghYIAQAAIAWBCIAVhCIAQAAIgkBnQgHAWgTAAg");
	this.shape_87.setTransform(410.875,116.775);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAAAAgIAAA7g");
	this.shape_88.setTransform(397.95,114.875);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgLQAAgOALgGQAKgIATAAIAOAAIAAgHQABgJgFgFQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAFgHQAFgGAHgEQAJgDAIAAQAQAAAJAHQAJAIAAAOIAAAoQAAAMADAIIAAABIgQAAQgBgDgBgGQgLAKgNABQgOgBgJgHgAgUASQAAAHAEAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgMAAQgaAAAAAQg");
	this.shape_89.setTransform(388.6,114.95);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AAVAtIgVhDIgVBDIgMAAIgahZIAPAAIASBCIAVhCIALAAIAVBEIAShEIAPAAIgaBZg");
	this.shape_90.setTransform(377.575,114.95);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgaAjQgLgNAAgUIAAgCQAAgNAFgKQAFgKAJgHQAKgFAJAAQASgBAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgLgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_91.setTransform(366.775,114.95);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAh/IAQAAIAAAxQAKgNAPAAQAdAAAAAfIAAA8g");
	this.shape_92.setTransform(357.55,113.075);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgTAGIAAgLIAnAAIAAALg");
	this.shape_93.setTransform(350.475,114.325);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_94.setTransform(343.45,114.875);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AgbAnQgJgIAAgLQAAgOALgGQALgIARAAIAQAAIAAgHQgBgJgEgFQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAEgHQAGgGAIgEQAIgDAJAAQAPAAAJAHQAJAIAAAOIAAAoQAAAMADAIIAAABIgQAAQgCgDAAgGQgLAKgOABQgNgBgIgHgAgVASQAAAHAFAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_95.setTransform(334.1,114.95);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AAVAtIgVhDIgVBDIgMAAIgahZIAPAAIASBCIAVhCIALAAIAVBEIAShEIAPAAIgaBZg");
	this.shape_96.setTransform(323.075,114.95);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AgaAjQgLgNAAgUIAAgCQAAgNAFgKQAFgKAJgHQAKgFAJAAQASgBAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgLgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_97.setTransform(312.275,114.95);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgPAAIAAh/IAPAAIAAAxQAKgNAPAAQAdAAABAfIAAA8g");
	this.shape_98.setTransform(303.05,113.075);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_99.setTransform(289.45,114.875);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AgbAnQgJgIAAgLQAAgOALgGQALgIARAAIAQAAIAAgHQgBgJgEgFQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAEgHQAGgGAIgEQAIgDAJAAQAPAAAJAHQAJAIAAAOIAAAoQAAAMADAIIAAABIgQAAQgCgDAAgGQgLAKgOABQgNgBgIgHgAgVASQAAAHAFAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_100.setTransform(280.1,114.95);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_101.setTransform(271.775,113.075);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_102.setTransform(263.175,113.075);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgJALgQAAQgOAAgIgIg");
	this.shape_103.setTransform(253.625,115.025);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAFQAFAEAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANABQAQAAAJAHQAKAJAAAMIgQAAQAAgHgFgFQgFgEgJAAQgHAAgFAEQgEADAAAGQAAAGAEACQAEAEALACQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPAAQgKgBgIgDg");
	this.shape_104.setTransform(244.575,114.95);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AgbAnQgJgIAAgLQAAgOALgGQALgIARAAIAQAAIAAgHQgBgJgEgFQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAEgHQAGgGAIgEQAIgDAJAAQAPAAAJAHQAJAIAAAOIAAAoQAAAMADAIIAAABIgQAAQgCgDAAgGQgLAKgOABQgNgBgIgHgAgVASQAAAHAFAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_105.setTransform(235.55,114.95);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AAvAuIAAg7QAAgJgEgFQgEgFgLAAQgIAAgGAFQgGAGAAAIIAAA7IgPAAIAAg6QAAgUgTAAQgPAAgFANIAABBIgQAAIAAhZIAOAAIABAKQAKgMAQAAQAUAAAFAPQAFgHAHgEQAHgEAKAAQAdAAABAgIAAA7g");
	this.shape_106.setTransform(223.5,114.875);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_107.setTransform(786.95,90.475);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATAAIAPAAIAAgHQAAgIgFgGQgFgEgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgHAEgGQAFgGAJgEQAIgEAJAAQAPABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgDAAgGQgLAKgNABQgOAAgJgIgAgVASQABAHAEAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_108.setTransform(777.6,90.55);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgJQgJAKgQABQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAJAKgBQAPAAAHgMIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_109.setTransform(767.975,88.75);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AgKAuQgMAAgIgHQgHgHABgLQAAgPAMgHQAMgIASAAIAQAAIAAgHQABgIgEgFQgEgEgHAAQgIgBgFAEQgGAEgBAHIgPAAQAAgIAGgGQAFgGAJgEQAHgDAJAAQAOABAIAIQAIAIgCANIgHAsIAAAGIABAJIAAACIgQAAIAAgFIAAgFQgMAMgMAAIgBgBgAgMAGQgIAEgBAIQgBAHAEAEQAEAEAHAAQAHAAAFgDQAHgEAEgGIAEgTIgMAAQgNAAgHAFg");
	this.shape_110.setTransform(754.381,90.551);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgNAyQgFgHABgLIAJg2IgQAAIACgMIAQAAIAEgWIAOAAIgEAWIARAAIgDAMIgQAAIgIA3IAAAEQAAAHAGgBIAHgBIgBANQgFABgFABQgJgBgEgGg");
	this.shape_111.setTransform(747.725,89.55);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AgCAuQgRAAgKgMQgJgMABgTIABgDQABgNAHgLQAGgLAKgFQAJgGAKAAQAOABAIAIQAIAJAAAQIAAAKIgBAGIg6AAQgBAMAFAJQAGAJALAAQAMAAALgMIAJAHQgGAIgIAFQgIAFgJAAIgCgBgAgJgbQgHAHgEANIArAAIAAgCQABgKgEgHQgFgHgJAAQgIAAgHAGg");
	this.shape_112.setTransform(740.3523,90.5525);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AgKAuQgMAAgIgHQgHgHABgLQAAgPAMgHQAMgIASAAIAQAAIAAgHQABgIgEgFQgEgEgHAAQgIgBgFAEQgGAEgBAHIgPAAQAAgIAGgGQAFgGAJgEQAHgDAJAAQAOABAIAIQAIAIgCANIgHAsIAAAGIABAJIAAACIgQAAIAAgFIAAgFQgMAMgMAAIgBgBgAgMAGQgIAEgBAIQgBAHAEAEQAEAEAHAAQAHAAAFgDQAHgEAEgGIAEgTIgMAAQgNAAgHAFg");
	this.shape_113.setTransform(731.081,90.551);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AAOBAIAKg7IAAgHQgBgMgMAAQgNAAgKAOIgLBAIgPAAIAWh/IAPAAIgJAxQALgNAPAAQANABAGAIQAGAJgCAOIgKA7g");
	this.shape_114.setTransform(721.89,88.675);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AgEAuQgLAAgIgFQgIgGgDgKQgEgKABgNIABgDQABgNAGgKQAGgLAKgFQAJgGALAAQAOABAJAJQAIAJAAAOIgOAAQAAgJgFgFQgFgGgIAAQgKAAgIAJQgIAIgCAQIAAACIAAALQAAAJAFAGQAFAGAJAAQAHAAAGgFQAHgFACgHIAOgBQgBAJgGAHQgFAHgJAEQgHAEgHAAIgCgBg");
	this.shape_115.setTransform(713.4889,90.5509);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AgFAvQgLAAgIgHQgJgFgDgLQgEgKABgMQABgNAHgMQAGgKAKgHQAKgGALAAQALAAAIAGQAIAHAEAKQAEAKgBANIgBABQgBANgGAKQgHALgJAGQgJAGgKAAIgCAAgAgOgYQgIAJgCAPIAAACIAAAKQABALAFAFQAFAGAIAAQAHAAAGgEQAHgEAEgHQAEgJABgJIABgMQgBgKgFgGQgFgGgJAAQgKAAgJAJg");
	this.shape_116.setTransform(704.1657,90.5501);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AgMBAQgKAAgIgFQgIgEgFgHIAIgJQAJAMANAAQALAAAGgGQAIgGACgMIABgIQgLALgNAAQgJAAgFgFQgHgEgEgIQgCgIgBgJIAAgMQADgPAFgKQAGgLAJgFQAJgGAJABQAPAAAIALIADgKIAOAAIgPBXQgCASgMAKQgLAKgPAAIgBAAgAgMgnQgJAKgBARIAAAFQAAALAEAGQAEAHAKAAQALAAAKgNIAHgoQgEgNgOAAIgBgBQgKAAgHALg");
	this.shape_117.setTransform(694.6,92.2491);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AgRA9IAPhZIAOAAIgOBZgAADgtQgDgCABgEQgBgEADgDQADgCADAAQAEgBACADQADACAAAEQAAAEgDADQgCACgEAAIgBAAQgDAAgCgCg");
	this.shape_118.setTransform(688.25,88.9208);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AgRBAIAUh/IAQAAIgWB/g");
	this.shape_119.setTransform(684.2,88.675);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AgJA+QgLAAgJgFQgIgGgFgKQgFgKAAgNQgBgKADgOQADgPAGgLQAHgMAKgHQANgKAPAAQASABAKAMQALALAAAUQABAJgCANQgDANgFAMQgGALgIAIQgOANgSAAIgCAAgAgKgpQgJAGgGANQgFAMgCASIAAAGQAAAQAGAJQAGAKAMAAQAPAAAKgLQALgMADgVQACgKAAgHQAAgRgGgJQgGgJgMAAQgKAAgJAGg");
	this.shape_120.setTransform(676.4258,88.9997);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAFQAFAEAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgDQgFgEgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAJAAAMIgQAAQAAgGgFgGQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPAAQgKgBgIgDg");
	this.shape_121.setTransform(661.975,90.55);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATAAIAPAAIAAgHQAAgIgFgGQgFgEgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgHAEgGQAFgGAJgEQAIgEAJAAQAPABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgDAAgGQgLAKgNABQgOAAgJgIgAgVASQABAHAEAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_122.setTransform(652.95,90.55);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_123.setTransform(646.275,88.675);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AgaAiQgLgLAAgUIAAgDQAAgNAFgKQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_124.setTransform(639.775,90.55);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_125.setTransform(631.475,88.675);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_126.setTransform(618.675,88.675);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_127.setTransform(611.725,88.925);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgQAAIAAgMIAQAAIAAgWIAOAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFADADQACACAFAAIAHgBIAAANIgLACQgKAAgFgHg");
	this.shape_128.setTransform(606.6,89.55);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAFQAFAEAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgDQgFgEgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAJAAAMIgQAAQAAgGgFgGQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPAAQgKgBgIgDg");
	this.shape_129.setTransform(599.725,90.55);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_130.setTransform(593.275,88.925);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_131.setTransform(588.775,90.475);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("AgaAiQgLgLAAgUIAAgDQAAgNAFgKQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_132.setTransform(581.025,90.55);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgQAAIAAgMIAQAAIAAgWIAOAAIAAAWIARAAIAAAMIgRAAIAAA3QABAFACADQACACAGAAIAGgBIAAANIgLACQgKAAgFgHg");
	this.shape_133.setTransform(573.4,89.55);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_134.setTransform(567.175,88.675);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQALgHARAAIAQAAIAAgHQAAgIgFgGQgFgEgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAEgGQAGgGAIgEQAIgEAJAAQAPABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgCgDAAgGQgLAKgNABQgOAAgJgIgAgVASQAAAHAFAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_135.setTransform(557.65,90.55);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_136.setTransform(550.625,90.475);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASAAIAPAAIAAgHQAAgIgEgGQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAFgGQAEgGAIgEQAJgEAJAAQAPABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgBgDgBgGQgLAKgOABQgNAAgIgIgAgUASQgBAHAFAEQAFAFAHgBQAHAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_137.setTransform(542.65,90.55);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_138.setTransform(534.325,88.675);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_139.setTransform(522.825,90.475);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASAAIAPAAIAAgHQAAgIgEgGQgFgEgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgHAFgGQAEgGAIgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgBgDgBgGQgLAKgOABQgNAAgIgIgAgUASQgBAHAFAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_140.setTransform(514.85,90.55);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgWIAPAAIAAAWIAQAAIAAAMIgQAAIAAA3QAAAFABADQADACAGAAIAHgBIAAANIgMACQgLAAgDgHg");
	this.shape_141.setTransform(507.2,89.55);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("AgMBAIAAhNIgOAAIAAgMIAOAAIAAgJQAAgOAIgIQAGgHAOAAIALABIgBAMIgIgBQgIAAgEAFQgEAEAAAIIAAAJIATAAIAAAMIgTAAIAABNg");
	this.shape_142.setTransform(502.025,88.6);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASAAIAPAAIAAgHQAAgIgEgGQgFgEgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgHAFgGQAFgGAHgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgBgDgBgGQgLAKgOABQgNAAgIgIgAgUASQgBAHAFAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_143.setTransform(494.15,90.55);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgJQgJAKgQABQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAJAKgBQAPAAAHgMIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_144.setTransform(484.525,88.75);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_145.setTransform(471.05,90.475);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATAAIAPAAIAAgHQAAgIgFgGQgFgEgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgHAEgGQAFgGAJgEQAIgEAJAAQAPABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgDAAgGQgLAKgNABQgOAAgJgIgAgVASQABAHAEAEQAFAFAIgBQAGAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_146.setTransform(461.7,90.55);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFFFF").s().p("AgTA7QgIgEgFgHIAIgJQAJAMAOAAQALAAAGgHQAGgGABgLIAAgIQgKALgPAAQgQAAgJgNQgKgNAAgUQAAgWAJgMQALgNAPAAQAQAAAJAMIABgKIAOAAIAABXQAAASgLAJQgKALgRAAQgJAAgKgFgAgPgoQgHAIABARQgBAPAHAIQAGAJAKgBQAOAAAIgMIAAgpQgIgNgOABQgKgBgGAKg");
	this.shape_147.setTransform(452.15,92.25);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAAAAgIAAA7g");
	this.shape_148.setTransform(442.85,90.475);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("AgaAiQgLgLAAgUIAAgDQAAgNAFgKQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_149.setTransform(433.725,90.55);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgJQgJAKgQABQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAJAKgBQAPAAAHgMIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_150.setTransform(424.125,88.75);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAPAAQAdAAAAAgIAAA7g");
	this.shape_151.setTransform(410.65,90.475);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATAAIAOAAIAAgHQABgIgFgGQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAEgGQAFgGAIgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgDAAgGQgLAKgNABQgOAAgJgIgAgVASQABAHAEAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgMAAQgbAAAAAQg");
	this.shape_152.setTransform(401.3,90.55);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("AAVAtIgVhDIgVBDIgMAAIgahZIAPAAIASBCIAVhCIALAAIAVBEIAShEIAPAAIgaBZg");
	this.shape_153.setTransform(390.275,90.55);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("AgaAiQgLgLAAgUIAAgDQAAgNAFgKQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_154.setTransform(379.475,90.55);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAGIAABAIgQAAIAAh/IAQAAIAAAxQAKgNAPAAQAdAAAAAfIAAA8g");
	this.shape_155.setTransform(370.25,88.675);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_156.setTransform(357.625,88.675);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_157.setTransform(350.675,88.925);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FFFFFF").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgWIAPAAIAAAWIAQAAIAAAMIgQAAIAAA3QAAAFABADQADACAGAAIAHgBIAAANIgMACQgLAAgDgHg");
	this.shape_158.setTransform(345.55,89.55);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAFQAFAEAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgDQgFgEgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAJAAAMIgQAAQAAgGgFgGQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPAAQgKgBgIgDg");
	this.shape_159.setTransform(338.675,90.55);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_160.setTransform(332.225,88.925);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_161.setTransform(327.725,90.475);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FFFFFF").s().p("AgaAiQgLgLAAgUIAAgDQAAgNAFgKQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_162.setTransform(319.975,90.55);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FFFFFF").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgWIAPAAIAAAWIAQAAIAAAMIgQAAIAAA3QAAAFABADQADACAGAAIAHgBIAAANIgMACQgLAAgDgHg");
	this.shape_163.setTransform(312.35,89.55);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_164.setTransform(306.125,88.675);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASAAIAPAAIAAgHQAAgIgEgGQgFgEgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgHAFgGQAFgGAHgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgBgDgBgGQgLAKgOABQgNAAgIgIgAgUASQgBAHAFAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_165.setTransform(296.6,90.55);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_166.setTransform(289.575,90.475);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATAAIAOAAIAAgHQABgIgFgGQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAEgGQAFgGAIgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgDAAgGQgLAKgNABQgOAAgJgIgAgVASQABAHAEAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgMAAQgbAAAAAQg");
	this.shape_167.setTransform(281.6,90.55);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_168.setTransform(273.275,88.675);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_169.setTransform(261.775,90.475);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATAAIAPAAIAAgHQAAgIgFgGQgFgEgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgHAEgGQAFgGAJgEQAIgEAJAAQAPABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgDAAgGQgLAKgNABQgOAAgJgIgAgVASQABAHAEAEQAFAFAIgBQAGAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_170.setTransform(253.8,90.55);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgQAAIAAgMIAQAAIAAgWIAOAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFADADQACACAFAAIAHgBIAAANIgLACQgKAAgFgHg");
	this.shape_171.setTransform(246.15,89.55);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FFFFFF").s().p("AgMBAIAAhNIgOAAIAAgMIAOAAIAAgJQAAgOAIgIQAGgHAOAAIALABIgBAMIgIgBQgIAAgEAFQgEAEAAAIIAAAJIATAAIAAAMIgTAAIAABNg");
	this.shape_172.setTransform(240.975,88.6);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATAAIAPAAIAAgHQAAgIgFgGQgFgEgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgHAEgGQAFgGAJgEQAIgEAJAAQAPABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgDAAgGQgLAKgNABQgOAAgJgIgAgVASQABAHAEAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_173.setTransform(233.1,90.55);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgJQgJAKgQABQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAJAKgBQAPAAAHgMIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_174.setTransform(223.475,88.75);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_175.setTransform(210,90.475);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASAAIAQAAIAAgHQgBgIgEgGQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAFgGQAEgGAIgEQAJgEAIAAQAQABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgBgDgBgGQgLAKgOABQgNAAgIgIgAgUASQgBAHAFAEQAFAFAHgBQAHAAAGgDQAHgEADgGIAAgSIgMAAQgbAAAAAQg");
	this.shape_176.setTransform(200.65,90.55);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_177.setTransform(192.325,88.675);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#FFFFFF").s().p("AgdAiQgLgNAAgUIAAgBQAAgNAFgKQAGgLAIgGQAKgFALgBQASAAAMANQALANAAAUIAAABQAAANgFAKQgFALgJAGQgKAFgMABQgRAAgMgNgAgSgYQgGAJAAAQQAAAPAGAJQAIAJAKAAQAMAAAGgJQAIgJgBgQQABgPgIgIQgGgKgMAAQgKAAgIAJg");
	this.shape_178.setTransform(182.6,90.55);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgVIAAgCQAAgNAFgKQAFgKAJgGQAJgGALAAQAPABAKAIQAKAJABAPIgOAAQgBgJgGgFQgGgGgJAAQgLAAgGAJQgHAIABAQIAAACQgBAPAHAIQAGAJALAAQAJAAAGgFQAFgFACgIIAOAAQgBAJgEAGQgGAIgIADQgHAFgKAAQgRgBgLgMg");
	this.shape_179.setTransform(173.4,90.55);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#FFFFFF").s().p("AgdAiQgLgNAAgUIAAgBQAAgNAGgKQAFgLAIgGQAKgFALgBQASAAALANQAMANAAAUIAAABQAAANgFAKQgFALgKAGQgJAFgMABQgRAAgMgNgAgRgYQgIAJABAQQgBAPAIAJQAGAJALAAQALAAAIgJQAGgJABgQQgBgPgGgIQgIgKgLAAQgLAAgGAJg");
	this.shape_180.setTransform(164,90.55);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#FFFFFF").s().p("AggAvQgNgPgBgbIAAgKQAAgRAHgNQAFgNAMgGQALgHANAAQAUAAALALQALALADASIgQAAQgDgOgGgGQgIgHgMAAQgOAAgJALQgIALgBAWIAAAKQAAAUAJAMQAIALANAAQAOAAAHgGQAHgGADgPIAQAAQgDAUgLAKQgMAKgVAAQgUAAgMgPg");
	this.shape_181.setTransform(153.8,89);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#FFFFFF").s().p("AACAUIAAgJQAAgJAEgHQAEgJAGgFIAJAGQgIALAAAKIAAAMgAgYAUIAAgJQAAgJAEgHQAEgJAHgFIAJAGQgIALAAAKIAAAMg");
	this.shape_182.setTransform(145.475,84.15);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.bf(img.Bitmap2, null, new cjs.Matrix2D(1,0,0,1,-499,-300)).s().p("EhN9Au4MAAAhdvMCb7AAAMAAABdvg");
	this.shape_183.setTransform(471,266.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.btnNextDasar1},{t:this.btnMenuDasar1},{t:this.btnBack3},{t:this.slots},{t:this.pieces},{t:this.judulKI},{t:this.Score},{t:this.drag2G1},{t:this.g1},{t:this.g3},{t:this.g2},{t:this.instance_4},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.instance_3},{t:this.instance_2},{t:this.restart},{t:this.btnInfo},{t:this.shape_6},{t:this.winMessage}]}).wait(1));

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
		{src:"images/_10.jpeg", id:"_10"},
		{src:"images/_8.jpeg", id:"_8"},
		{src:"images/_10_1.jpeg", id:"_10_1"},
		{src:"images/Bitmap108.png", id:"Bitmap108"},
		{src:"images/Bitmap109.png", id:"Bitmap109"},
		{src:"images/Bitmap111.png", id:"Bitmap111"},
		{src:"images/Bitmap2.png", id:"Bitmap2"},
		{src:"images/Bitmap3.png", id:"Bitmap3"},
		{src:"images/Bitmap110.png", id:"Bitmap110"},
		{src:"images/Bitmap102copy.png", id:"Bitmap102copy"},
		{src:"images/flash0aiAssets.png", id:"flash0aiAssets"},
		{src:"images/flash0aiAssets_1.png", id:"flash0aiAssets_1"},
		{src:"images/flash0aiAssets_2.png", id:"flash0aiAssets_2"},
		{src:"images/bookpngcopy.png", id:"bookpngcopy"},
		{src:"images/Gpngcopy.png", id:"Gpngcopy"},
		{src:"images/flash0aiAssets_3.png", id:"flash0aiAssets_3"},
		{src:"images/G.png", id:"G"},
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