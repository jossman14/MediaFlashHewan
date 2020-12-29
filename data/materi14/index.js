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



(lib._10pngcopy = function() {
	this.initialize(img._10pngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,564);


(lib.aa1 = function() {
	this.initialize(img.aa1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,560);


(lib.aa10 = function() {
	this.initialize(img.aa10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,564);


(lib.aa12 = function() {
	this.initialize(img.aa12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,564);


(lib.aa14 = function() {
	this.initialize(img.aa14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,564);


(lib.aa17 = function() {
	this.initialize(img.aa17);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,564);


(lib.aa18 = function() {
	this.initialize(img.aa18);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,564);


(lib.aa19 = function() {
	this.initialize(img.aa19);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,564);


(lib.aa2 = function() {
	this.initialize(img.aa2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,560);


(lib.aa3 = function() {
	this.initialize(img.aa3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,560);


(lib.aa4 = function() {
	this.initialize(img.aa4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,560);


(lib.aa5 = function() {
	this.initialize(img.aa5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,560);


(lib.aa15 = function() {
	this.initialize(img.aa15);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,564);


(lib.aa7 = function() {
	this.initialize(img.aa7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,560);


(lib.aa8 = function() {
	this.initialize(img.aa8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,560);


(lib.aa11 = function() {
	this.initialize(img.aa11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,563);


(lib.aa9 = function() {
	this.initialize(img.aa9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,560);


(lib.bookpngcopy = function() {
	this.initialize(img.bookpngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,399);


(lib.flash0aiAssets = function() {
	this.initialize(img.flash0aiAssets);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,204,204);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);


(lib.aa13 = function() {
	this.initialize(img.aa13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,564);


(lib.aa6 = function() {
	this.initialize(img.aa6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,560);// helper functions:

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


(lib.wr = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._10pngcopy();
	this.instance.setTransform(0,0,1.0003,0.997);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.wr, new cjs.Rectangle(0,0,664,388), null);


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
	this.shape.graphics.f("#0097E6").s().p("EhB5AkpMAAAhJRMCDzAAAMAAABJRg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-421.8,-234.5,843.6,469.1);


(lib.Tween7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0097E6").s().p("EhB5AkpMAAAhJRMCDzAAAMAAABJRg");

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


(lib.selesai = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("Selesai", "30px 'Roboto Medium'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 40;
	this.text.lineWidth = 100;
	this.text.parent = this;
	this.text.setTransform(85,13.4);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E74C3C").s().p("AtRD6IAAnzIajAAIAAHzg");
	this.shape.setTransform(85,25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.selesai, new cjs.Rectangle(0,0,170,51.4), null);


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



(lib.btnAnim = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_4
	this.instance = new lib.flash0aiAssets();
	this.instance.setTransform(-80,22,0.4304,0.4304);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({x:-78,y:25},0).wait(1).to({y:29},0).wait(2));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJBUIAAh6IATAAIAAB6gAgIg/QgDgDgBgFQABgFADgEQADgDAFAAQAGAAAEADQACAEAAAFQAAAFgCADQgEAEgGAAQgFAAgDgEg");
	this.shape.setTransform(184.8,63.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgYA7QgMgGgFgJQgHgJAAgLIAVAAQABAKAHAHQAJAFAMAAQALABAIgFQAGgFABgIQgBgJgFgEQgHgFgPgDQgQgEgJgEQgKgFgFgGQgEgHAAgJQAAgPANgLQAMgKAUAAQAUAAANALQANALABAQIgWAAQABgIgIgGQgHgHgLAAQgLAAgGAGQgHAEAAAIQAAAIAGAEQAGAEAPADQAQAEAKAEQAKAEAEAHQAFAHAAAKQAAARgOAKQgNAKgUAAQgOAAgMgFg");
	this.shape_1.setTransform(175.95,65.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgmA1QgMgKAAgQQAAgTAPgJQAOgLAaAAIAUAAIAAgKQAAgLgGgGQgHgHgMAAQgLAAgIAGQgHAGAAAHIgVAAQAAgJAGgJQAHgIALgFQALgFANAAQAVAAAMAKQAMAMABASIAAA4QAAAQAEALIAAABIgWAAQgCgDgBgJQgPAPgTAAQgSAAgMgLgAgdAZQAAAKAHAFQAGAGALgBQAJAAAJgEQAIgGAEgIIAAgaIgQAAQgmAAAAAYg");
	this.shape_2.setTransform(163.575,65.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("ABBA/IAAhRQAAgNgGgGQgGgHgOAAQgMAAgHAHQgIAHgBAMIAABRIgVAAIAAhQQAAgbgaAAQgVAAgHASIAABZIgVAAIAAh6IAUAAIAAANQAOgQAXAAQAaAAAIAUQAGgJAKgFQAKgGANAAQApAAAAArIAABSg");
	this.shape_3.setTransform(147.025,65.275);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgKBUIAAh6IAVAAIAAB6gAgJg/QgDgDAAgFQAAgFADgEQAEgDAFAAQAGAAADADQAEAEAAAFQAAAFgEADQgDAEgGAAQgFAAgEgEg");
	this.shape_4.setTransform(134,63.15);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAbA/IAAhRQAAgNgGgHQgGgGgNAAQgIAAgJAGQgHAFgFAJIAABXIgUAAIAAh6IAUAAIAAAPQAOgSAWAAQAnAAAAAsIAABRg");
	this.shape_5.setTransform(124.7,65.275);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAzBTIgQgrIhFAAIgQArIgWAAIBAilIARAAIBAClgAgbAWIA3AAIgchNg");
	this.shape_6.setTransform(110.65,63.25);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAbA/IAAhRQAAgNgGgHQgGgGgNAAQgJAAgIAGQgHAFgEAJIAABXIgVAAIAAh6IAUAAIAAAPQAOgSAWAAQAnAAAAAsIAABRg");
	this.shape_7.setTransform(90.85,65.275);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgmA1QgMgKAAgQQAAgTAPgJQAOgLAaAAIAUAAIAAgKQAAgLgGgGQgHgHgMAAQgLAAgIAGQgHAGAAAHIgVAAQAAgJAGgJQAHgIALgFQALgFANAAQAVAAAMAKQAMAMABASIAAA4QAAAQAEALIAAABIgWAAQgCgDgBgJQgPAPgTAAQgSAAgMgLgAgdAZQAAAKAHAFQAGAGALgBQAJAAAJgEQAIgGAEgIIAAgaIgQAAQgmAAAAAYg");
	this.shape_8.setTransform(78.025,65.4);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAaBXIgpg4IgOANIAAArIgVAAIAAitIAVAAIAABoIALgNIAmgoIAaAAIgwAyIA1BIg");
	this.shape_9.setTransform(66.6,62.8);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAbA/IAAhRQAAgNgFgHQgHgGgMAAQgKAAgHAGQgIAFgFAJIAABXIgVAAIAAh6IAUAAIABAPQAOgSAWAAQAnAAABAsIAABRg");
	this.shape_10.setTransform(53.45,65.275);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgKBUIAAh6IAVAAIAAB6gAgIg/QgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQACAEABAFQgBAFgCADQgEAEgGAAQgFAAgDgEg");
	this.shape_11.setTransform(44.2,63.15);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgmA1QgMgKAAgQQAAgTAPgJQAOgLAaAAIAUAAIAAgKQAAgLgGgGQgHgHgMAAQgLAAgIAGQgHAGAAAHIgVAAQAAgJAGgJQAHgIALgFQALgFANAAQAVAAAMAKQAMAMABASIAAA4QAAAQAEALIAAABIgWAAQgCgDgBgJQgPAPgTAAQgSAAgMgLgAgdAZQAAAKAHAFQAGAGALgBQAJAAAJgEQAIgGAEgIIAAgaIgQAAQgmAAAAAYg");
	this.shape_12.setTransform(34.975,65.4);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AA9BTIAAhBIAChEIg3CFIgPAAIg3iFIACBEIAABBIgWAAIAAilIAdAAIA1CGIA2iGIAdAAIAAClg");
	this.shape_13.setTransform(18.475,63.25);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#C0392B").s().p("AzOG0QjrAAAAibIAAowQAAicDrAAMAmcAAAQCVAAA3A/QAgAkAAA5IAAIwQAACbjsAAg");
	this.shape_14.setTransform(56.875,63.425);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgJBUIAAh6IATAAIAAB6gAgIg+QgDgEgBgFQABgFADgDQADgEAFAAQAGAAAEAEQACADAAAFQAAAFgCAEQgEADgGAAQgFAAgDgDg");
	this.shape_15.setTransform(184.8,67.15);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgYA6QgMgEgFgKQgHgKAAgLIAVAAQABALAHAGQAJAHAMAAQALgBAIgEQAGgFABgIQgBgIgFgGQgHgEgPgEQgQgDgJgEQgKgFgFgGQgEgHAAgJQAAgPANgKQAMgLAUAAQAUAAANALQANALABARIgWAAQABgJgIgHQgHgFgLgBQgLABgGAEQgHAFAAAIQAAAIAGAEQAGAEAPAEQAQADAKAEQAKAEAEAIQAFAGAAALQAAAQgOAKQgNAKgUAAQgOAAgMgGg");
	this.shape_16.setTransform(175.95,69.4);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgmA2QgMgLAAgPQAAgUAPgKQAOgKAaAAIAUAAIAAgKQAAgLgGgHQgHgGgMAAQgLAAgIAFQgHAGAAAJIgVAAQAAgKAGgIQAHgJALgFQALgFANAAQAVAAAMALQAMAKABATIAAA3QAAARAEAKIAAACIgWAAQgCgDgBgKQgPAQgTAAQgSAAgMgKgAgdAYQAAAKAHAGQAGAGALAAQAJgBAJgFQAIgFAEgIIAAgZIgQAAQgmAAAAAWg");
	this.shape_17.setTransform(163.575,69.4);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgKBUIAAh6IAVAAIAAB6gAgJg+QgDgEAAgFQAAgFADgDQAEgEAFAAQAGAAADAEQAEADAAAFQAAAFgEAEQgDADgGAAQgFAAgEgDg");
	this.shape_18.setTransform(134,67.15);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAzBTIgQgsIhFAAIgQAsIgWAAIBAilIARAAIBAClgAgbAVIA3AAIgchMg");
	this.shape_19.setTransform(110.65,67.25);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgmA2QgMgLAAgPQAAgUAPgKQAOgKAaAAIAUAAIAAgKQAAgLgGgHQgHgGgMAAQgLAAgIAFQgHAGAAAJIgVAAQAAgKAGgIQAHgJALgFQALgFANAAQAVAAAMALQAMAKABATIAAA3QAAARAEAKIAAACIgWAAQgCgDgBgKQgPAQgTAAQgSAAgMgKgAgdAYQAAAKAHAGQAGAGALAAQAJgBAJgFQAIgFAEgIIAAgZIgQAAQgmAAAAAWg");
	this.shape_20.setTransform(78.025,69.4);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAaBXIgpg5IgOAOIAAArIgVAAIAAiuIAVAAIAABqIALgOIAmgnIAaAAIgwAxIA1BIg");
	this.shape_21.setTransform(66.6,66.8);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgKBUIAAh6IAVAAIAAB6gAgIg+QgEgEAAgFQAAgFAEgDQADgEAFAAQAGAAAEAEQACADABAFQgBAFgCAEQgEADgGAAQgFAAgDgDg");
	this.shape_22.setTransform(44.2,67.15);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgmA2QgMgLAAgPQAAgUAPgKQAOgKAaAAIAUAAIAAgKQAAgLgGgHQgHgGgMAAQgLAAgIAFQgHAGAAAJIgVAAQAAgKAGgIQAHgJALgFQALgFANAAQAVAAAMALQAMAKABATIAAA3QAAARAEAKIAAACIgWAAQgCgDgBgKQgPAQgTAAQgSAAgMgKgAgdAYQAAAKAHAGQAGAGALAAQAJgBAJgFQAIgFAEgIIAAgZIgQAAQgmAAAAAWg");
	this.shape_23.setTransform(34.975,69.4);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AA9BTIAAhAIAChGIg3CGIgPAAIg3iFIACBFIAABAIgWAAIAAilIAdAAIA1CHIA2iHIAdAAIAAClg");
	this.shape_24.setTransform(18.475,67.25);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgYA7QgMgGgFgJQgHgKAAgKIAVAAQABAKAHAHQAJAFAMAAQALABAIgFQAGgFABgIQgBgJgFgEQgHgFgPgDQgQgEgJgEQgKgEgFgHQgEgHAAgJQAAgPANgLQAMgKAUAAQAUAAANALQANAKABARIgWAAQABgIgIgGQgHgHgLABQgLAAgGAEQgHAFAAAJQAAAHAGAEQAGAEAPADQAQAEAKAFQAKAEAEAGQAFAIAAAJQAAARgOAKQgNAKgUAAQgOAAgMgFg");
	this.shape_25.setTransform(175.95,73.4);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgmA1QgMgKAAgQQAAgTAPgJQAOgLAaAAIAUAAIAAgKQAAgLgGgGQgHgHgMAAQgLAAgIAFQgHAGAAAJIgVAAQAAgKAGgJQAHgIALgFQALgFANAAQAVAAAMAKQAMAMABASIAAA4QAAAQAEALIAAACIgWAAQgCgEgBgKQgPAQgTAAQgSAAgMgLgAgdAZQAAAKAHAFQAGAFALAAQAJAAAJgEQAIgGAEgIIAAgaIgQAAQgmAAAAAYg");
	this.shape_26.setTransform(163.575,73.4);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgmA1QgMgKAAgQQAAgTAPgJQAOgLAaAAIAUAAIAAgKQAAgLgGgGQgHgHgMAAQgLAAgIAFQgHAGAAAJIgVAAQAAgKAGgJQAHgIALgFQALgFANAAQAVAAAMAKQAMAMABASIAAA4QAAAQAEALIAAACIgWAAQgCgEgBgKQgPAQgTAAQgSAAgMgLgAgdAZQAAAKAHAFQAGAFALAAQAJAAAJgEQAIgGAEgIIAAgaIgQAAQgmAAAAAYg");
	this.shape_27.setTransform(78.025,73.4);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AAaBYIgpg5IgOANIAAAsIgVAAIAAivIAVAAIAABpIALgNIAmgoIAaAAIgwAzIA1BIg");
	this.shape_28.setTransform(66.6,70.8);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgmA1QgMgKAAgQQAAgTAPgJQAOgLAaAAIAUAAIAAgKQAAgLgGgGQgHgHgMAAQgLAAgIAFQgHAGAAAJIgVAAQAAgKAGgJQAHgIALgFQALgFANAAQAVAAAMAKQAMAMABASIAAA4QAAAQAEALIAAACIgWAAQgCgEgBgKQgPAQgTAAQgSAAgMgLgAgdAZQAAAKAHAFQAGAFALAAQAJAAAJgEQAIgGAEgIIAAgaIgQAAQgmAAAAAYg");
	this.shape_29.setTransform(34.975,73.4);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AA9BTIAAhBIAChFIg3CGIgPAAIg3iFIACBEIAABBIgWAAIAAilIAdAAIA1CHIA2iHIAdAAIAAClg");
	this.shape_30.setTransform(18.475,71.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14,p:{y:63.425}},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11,p:{y:63.15}},{t:this.shape_10,p:{y:65.275}},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7,p:{y:65.275}},{t:this.shape_6,p:{y:63.25}},{t:this.shape_5,p:{y:65.275}},{t:this.shape_4,p:{y:63.15}},{t:this.shape_3,p:{y:65.275}},{t:this.shape_2},{t:this.shape_1},{t:this.shape,p:{y:63.15}}]}).to({state:[{t:this.shape_14,p:{y:67.425}},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_10,p:{y:69.275}},{t:this.shape_21},{t:this.shape_20},{t:this.shape_7,p:{y:69.275}},{t:this.shape_19},{t:this.shape_5,p:{y:69.275}},{t:this.shape_18},{t:this.shape_3,p:{y:69.275}},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15}]},1).to({state:[{t:this.shape_14,p:{y:71.425}},{t:this.shape_30},{t:this.shape_29},{t:this.shape_11,p:{y:71.15}},{t:this.shape_10,p:{y:73.275}},{t:this.shape_28},{t:this.shape_27},{t:this.shape_7,p:{y:73.275}},{t:this.shape_6,p:{y:71.25}},{t:this.shape_5,p:{y:73.275}},{t:this.shape_4,p:{y:71.15}},{t:this.shape_3,p:{y:73.275}},{t:this.shape_26},{t:this.shape_25},{t:this.shape,p:{y:71.15}}]},1).wait(2));

	// Layer_5
	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#52392B").s().p("AzOG0QjrAAAAibIAAowQAAicDrAAMAmcAAAQCVAAA3A/QAgAkAAA5IAAIwQAACbjsAAg");
	this.shape_31.setTransform(56.875,71.725);

	this.timeline.addTween(cjs.Tween.get(this.shape_31).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-89.7,19.9,293.2,96.9);


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
	this.shape.setTransform(-43.2848,1.4252,0.5327,0.5327,-90);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#18B8C4").s().p("Ah6CSICRiSIiRiRIAygyIDCDDIjCDDg");
	this.shape_1.setTransform(-43.2848,-6.899,0.5327,0.5327,-90);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7,p:{y:-3.875}},{t:this.shape_6,p:{y:-3.875}},{t:this.shape_5},{t:this.shape_4,p:{y:0.925}},{t:this.shape_3},{t:this.shape_2,p:{y:1.075}},{t:this.shape_1,p:{y:-6.899}},{t:this.shape,p:{y:1.4252}}]}).to({state:[{t:this.shape_7,p:{y:-2.275}},{t:this.shape_11},{t:this.shape_6,p:{y:-2.275}},{t:this.shape_10},{t:this.shape_4,p:{y:2.525}},{t:this.shape_9},{t:this.shape_2,p:{y:2.675}},{t:this.shape_1,p:{y:-5.299}},{t:this.shape,p:{y:3.0252}}]},1).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_4,p:{y:6.525}},{t:this.shape_12},{t:this.shape_2,p:{y:6.675}},{t:this.shape_1,p:{y:-1.299}},{t:this.shape,p:{y:7.0252}}]},1).wait(2));

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


(lib.bg10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.aa1();
	this.instance.setTransform(-229,-134,0.6924,0.6912);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg10, new cjs.Rectangle(-229,-134,459.6,267.1), null);


(lib.Symbol41 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween8("synched",0);
	this.instance.setTransform(42.25,-40.25);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


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


(lib.anim1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		var s =
		  "Bioremediasi merupakan  penggunaan mikroorganisme yang telah  dipilih untuk ditumbuhkan pada polutan  tertentu sebagai upaya untuk menurunkan  kadar polutan tersebut. Pada saat proses  bioremediasi berlangsung, enzim-enzim yang diproduksi oleh mikroorganisme memodifikasi struktur polutan beracun  menjadi tidak kompleks sehingga menjadi  metabolit yang tidak beracun dan berbahaya";
		
		
		var F = f.bind(this);
		
		var fI;
		
		clearInterval(fI);
		
		fI = setInterval(F, 80);
		
		function f(e) {
		  if (this.coba.text.length < s.length) {
		    this.coba.text += s.charAt(this.coba.text.length);
		  } else {
		    clearInterval(fI);
		  }
		}
		
		var _this = this;
		
		_this.btnNextDasar1.on('click', function(){
		
		_this.gotoAndPlay(269);
		});
		
		this.stop();
	}
	this.frame_860 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(860).call(this.frame_860).wait(87));

	// Layer_1
	this.coba = new cjs.Text("", "31px 'Roboto'");
	this.coba.name = "coba";
	this.coba.lineHeight = 42;
	this.coba.lineWidth = 753;
	this.coba.parent = this;
	this.coba.setTransform(-383.95,-178.45);

	this.btnNextDasar1 = new lib.btnKINext();
	this.btnNextDasar1.name = "btnNextDasar1";
	this.btnNextDasar1.setTransform(352.6,191.2);
	new cjs.ButtonHelper(this.btnNextDasar1, 0, 1, 2, false, new lib.btnKINext(), 3);

	this.instance = new lib.aa1();
	this.instance.setTransform(-332,-194,1.0003,1.0041);

	this.instance_1 = new lib.aa2();
	this.instance_1.setTransform(-332,-194,1.0003,1.0041);

	this.instance_2 = new lib.aa3();
	this.instance_2.setTransform(-332,-194,1.0003,1.0042);

	this.instance_3 = new lib.aa4();
	this.instance_3.setTransform(-332,-194,1.0003,1.0041);

	this.instance_4 = new lib.aa5();
	this.instance_4.setTransform(-332,-194,1.0003,1.0041);

	this.instance_5 = new lib.aa6();
	this.instance_5.setTransform(-332,-194,1.0003,1.0041);

	this.instance_6 = new lib.aa7();
	this.instance_6.setTransform(-332,-194,1.0003,1.0041);

	this.instance_7 = new lib.aa8();
	this.instance_7.setTransform(-332,-194,1.0003,1.0041);

	this.instance_8 = new lib.aa9();
	this.instance_8.setTransform(-332,-194,1.0003,1.0041);

	this.instance_9 = new lib.aa10();
	this.instance_9.setTransform(-332,-194,1.0003,0.997);

	this.instance_10 = new lib.aa11();
	this.instance_10.setTransform(-332,-194,1.0003,0.9988);

	this.instance_11 = new lib.aa12();
	this.instance_11.setTransform(-332,-194,1.0003,0.997);

	this.instance_12 = new lib.aa13();
	this.instance_12.setTransform(-332,-194,1.0003,0.997);

	this.instance_13 = new lib.aa14();
	this.instance_13.setTransform(-332,-194,1.0003,0.997);

	this.instance_14 = new lib.aa15();
	this.instance_14.setTransform(-332,-194,1.0003,0.997);

	this.instance_15 = new lib.aa17();
	this.instance_15.setTransform(-332,-194,1.0003,0.997);

	this.instance_16 = new lib.aa18();
	this.instance_16.setTransform(-332,-194,1.0003,0.997);

	this.instance_17 = new lib.aa19();
	this.instance_17.setTransform(-332,-194,1.0003,0.997);

	this.instance_18 = new lib.selesai();
	this.instance_18.setTransform(0,0,1,1,0,0,0,85,25.7);

	this.instance_19 = new lib.wr();
	this.instance_19.setTransform(0,0,1,1,0,0,0,332,194);
	this.instance_19.filters = [new cjs.ColorFilter(0.42, 0.42, 0.42, 1, 0, 0, 0, 0)];
	this.instance_19.cache(-2,-2,668,392);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.btnNextDasar1},{t:this.coba}]}).to({state:[{t:this.instance}]},267).to({state:[{t:this.instance_1}]},33).to({state:[{t:this.instance_2}]},31).to({state:[{t:this.instance_3}]},33).to({state:[{t:this.instance_4}]},31).to({state:[{t:this.instance_5}]},33).to({state:[{t:this.instance_6}]},32).to({state:[{t:this.instance_7}]},33).to({state:[{t:this.instance_8}]},32).to({state:[{t:this.instance_9}]},33).to({state:[{t:this.instance_10}]},32).to({state:[{t:this.instance_11}]},33).to({state:[{t:this.instance_12}]},32).to({state:[{t:this.instance_13}]},33).to({state:[{t:this.instance_14}]},32).to({state:[{t:this.instance_15}]},33).to({state:[{t:this.instance_16}]},33).to({state:[{t:this.instance_17}]},33).to({state:[{t:this.instance_19},{t:this.instance_18}]},41).wait(87));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-385.9,-194,797.2,409.1);


(lib.popUpAnimasi = function(mode,startPosition,loop) {
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
	this.frame_24 = function() {
		this.gotoAndStop(0);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(12).call(this.frame_12).wait(12).call(this.frame_24).wait(1));

	// Layer_5
	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);
	this.exit._off = true;

	this.timeline.addTween(cjs.Tween.get(this.exit).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_7
	this.instance = new lib.anim1();
	this.instance.setTransform(52.9,-20.1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_6
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Eg9EAe+QhzAAABhzMAAAg6VQgBhzBzAAMB6JAAAQBzAAAABzMAAAA6VQAABzhzAAg");
	this.shape.setTransform(42.25,-20.25);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgfCmIAAjtIA/AAIAADtgAgYhtQgLgJABgOQAAgPAJgJQAKgJAPAAQAQAAAKAJQAKAJAAAPQAAAOgKAJQgKAKgQAAQgPAAgJgKg");
	this.shape_1.setTransform(119,-243.875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgyBxQgYgLgNgTQgNgSAAgWIA8AAQABARALAJQAMAJATAAQASAAAKgHQAJgHgBgLQAAgMgLgGQgMgHgYgFQhUgSgBg1QAAggAagVQAagVAqAAQAuAAAbAVQAbAVAAAiIhAAAQAAgNgIgJQgJgJgTAAQgPAAgJAHQgIAIgBALQAAAKAKAHQALAGAWAFQAYAFAQAGQAyARAAAtQAAAhgbAUQgcAUgsAAQgdAAgXgKg");
	this.shape_2.setTransform(101.35,-239.175);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AhRBnQgYgUAAgfQAAgmAcgTQAdgUAzAAIAeAAIAAgOQAAgQgJgKQgIgKgRAAQgQAAgJAHQgKAIAAAOIg/AAQgBgVANgSQANgRAXgKQAYgKAbAAQAsAAAbAWQAZAWAAAoIAABmQAAAiAKARIAAAEIhAAAQgFgJgCgNQgXAagkAAQgiAAgXgUgAgpAsIAAADQAAAMAIAIQAIAIAPAAQANAAAMgHQAMgGAGgKIAAgpIgYAAQgvAAgDAhg");
	this.shape_3.setTransform(77.9,-239.175);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("ABqB5IAAiXQAAgTgHgKQgIgJgUAAQgdgBgLAcIAACiIg+AAIAAiXQAAgUgIgJQgIgJgUAAQgbgBgMAXIAACnIg/AAIAAjsIA7AAIACAaQAZgfArAAQAtAAARAkQAZgkAvAAQAmAAATAXQATAWAAAtIAACXg");
	this.shape_4.setTransform(46.375,-239.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgfCmIAAjtIA/AAIAADtgAgYhtQgLgJABgOQAAgPAJgJQAKgJAPAAQAQAAAKAJQAKAJAAAPQAAAOgKAJQgKAKgQAAQgPAAgJgKg");
	this.shape_5.setTransform(20.9,-243.875);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgJgJQgIgJgVAAQgZAAgOAWIAACnIg/AAIAAjsIA7AAIACAbQAaggApAAQAnAAARAWQATAXAAAsIAACYg");
	this.shape_6.setTransform(2.3,-239.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("ABQCgIgWhCIhzAAIgWBCIhGAAIB3k/IA8AAIB4E/gAgnApIBPAAIgoh3g");
	this.shape_7.setTransform(-25.425,-243.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]},12).to({state:[]},1).wait(12));

	// Layer_2
	this.instance_1 = new lib.Tween7("synched",0);
	this.instance_1.setTransform(43.5,-40.25);
	this.instance_1.alpha = 0;

	this.instance_2 = new lib.Symbol41("synched",0);
	this.instance_2.setTransform(42.2,-40.2,1,1,0,0,0,42.2,-40.2);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({x:42.25,alpha:0.1719},2).to({_off:true,regX:42.2,regY:-40.2,x:42.2,y:-40.2,alpha:1},10).to({_off:false,regX:0,regY:0,x:43.5,y:-40.25,alpha:0},12).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(2).to({_off:false},10).to({_off:true,regX:0,regY:0,x:43.5,y:-40.25,alpha:0},12).wait(1));

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
(lib.materi14 = function(mode,startPosition,loop) {
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
		  window.location.replace("../materi11/index.html");
		});
		
		root.btnBack3.on("click", function () {
		  window.location.replace("../materi10/index.html");
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
		
		root.setup = function(){
			document.body.style.backgroundColor = lib.properties.color;
		}
		
		root.setup();
		
		root.popUpAnim1.gotoAndStop(0);
		
		root.btnAnim1.on("click", function () {
		  root.popUpAnim1.gotoAndPlay(0);
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// suara
	this.nyala = new lib.ggg();
	this.nyala.name = "nyala";
	this.nyala.setTransform(916.95,40.25,0.6758,0.6758,0,0,0,-16.2,-1.1);
	new cjs.ButtonHelper(this.nyala, 0, 1, 2, false, new lib.ggg(), 3);

	this.tandaSuaraOn = new lib.an_Image({'id': 'tandaSuaraOn', 'src':'images/animation_500_kdvpuxkb.gif', 'alt':'image', 'border':'0', 'visible':true, 'class':'ui-image'});

	this.tandaSuaraOn.name = "tandaSuaraOn";
	this.tandaSuaraOn.setTransform(851.55,34.1,0.4105,0.4105,0,0,0,50.2,45.2);

	this.hening = new lib.dsdsd();
	this.hening.name = "hening";
	this.hening.setTransform(916.95,40.25,0.6758,0.6758,0,0,0,-16.2,-1.1);
	new cjs.ButtonHelper(this.hening, 0, 1, 2, false, new lib.dsdsd(), 3);

	this.tandaSuaraOff = new lib.an_Image({'id': 'tandaSuaraOff', 'src':'images/animation_500_kdvpuxkb.gif', 'alt':'image', 'border':'0', 'visible':true, 'class':'ui-image'});

	this.tandaSuaraOff.name = "tandaSuaraOff";
	this.tandaSuaraOff.setTransform(851.85,34.1,0.4105,0.4105,0,0,0,50.2,45.2);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgNATQgEgEAAgFQAAgHAFgDQAFgDAJgBIAHAAIAAgDQAAgEgDgCQgCgDgEABQgDAAgDABQgDACAAAEIgHAAQAAgEACgDQADgDADgCQAEgCAEAAQAHAAAFAFQAEADAAAHIAAASQAAAGACAEIAAAAIgIAAIgBgEQgFAGgGgBQgHAAgEgDgAgKAJQAAADADACQACACAEAAQACAAADgCQADgBACgDIAAgJIgGAAQgNgBAAAJg");
	this.shape.setTransform(858.425,61.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAWIAAgqIAHAAIAAAFQACgGAHAAIADABIAAAHIgDAAQgHAAgCAFIAAAeg");
	this.shape_1.setTransform(855.05,61.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgNATQgEgEAAgFQAAgHAFgDQAFgDAJgBIAHAAIAAgDQAAgEgDgCQgCgDgEABQgDAAgDABQgDACAAAEIgHAAQAAgEACgDQADgDADgCQAEgCAEAAQAHAAAFAFQAEADAAAHIAAASQAAAGACAEIAAAAIgIAAIgBgEQgFAGgGgBQgHAAgEgDgAgKAJQAAADADACQACACAEAAQACAAADgCQADgBACgDIAAgJIgGAAQgNgBAAAJg");
	this.shape_2.setTransform(851.225,61.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgMASQgEgEAAgIIAAgbIAHAAIAAAbQAAAKAIgBQAIABADgHIAAgeIAHAAIAAAqIgHAAIAAgEQgEAFgIAAQgHAAgDgEg");
	this.shape_3.setTransform(846.775,61.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJAbQgFgCgDgEQgDgEAAgFIAIAAQAAAFADADQAEADAGAAQAGAAADgCQAEgDAAgEQAAgEgEgCQgCgDgIgCQgJgDgEgDQgFgEAAgGQAAgHAGgEQAFgFAHAAQAHAAAEACQAFADACAEQADAEAAAFIgHAAQAAgGgEgDQgEgDgGAAQgEAAgDADQgEACABAFQAAADACADQADACAHACQAHACAEACQAEACACADQACAEAAAEQAAAHgFAEQgGAFgJAAQgFAAgFgDg");
	this.shape_4.setTransform(842.1,60.675);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3498DB").s().p("Aj8D9QhphpAAiUQAAiTBphqQBphoCTAAQCVAABoBoQBpBqAACTQAACUhpBpQhoBpiVAAQiTAAhphpg");
	this.shape_5.setTransform(851.7205,39.5045,0.9301,0.9301);

	this.instance = new lib.hehe();
	this.instance.setTransform(890.25,39.55,0.7145,0.9301,0,0,0,86.2,36);
	this.instance.shadow = new cjs.Shadow("rgba(0,0,0,1)",3,3,4);
	this.instance.cache(-2,-2,176,76);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.tandaSuaraOff},{t:this.hening},{t:this.tandaSuaraOn},{t:this.nyala}]}).wait(1));

	// animasi
	this.popUpAnim1 = new lib.popUpAnimasi();
	this.popUpAnim1.name = "popUpAnim1";
	this.popUpAnim1.setTransform(496.6,306.6,1,1,0,0,0,50.2,-28.9);

	this.timeline.addTween(cjs.Tween.get(this.popUpAnim1).wait(1));

	// Layer_2
	this.instance_1 = new lib.sustain();
	this.instance_1.setTransform(141.35,47,1,1,0,0,0,125.9,18.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// base
	this.btnAnim1 = new lib.btnAnim();
	this.btnAnim1.name = "btnAnim1";
	this.btnAnim1.setTransform(472.2,332.65,0.5812,0.5812,0,0,0,57,68.3);
	new cjs.ButtonHelper(this.btnAnim1, 0, 1, 2, false, new lib.btnAnim(), 3);

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
	this.shape_6.graphics.f("#FFFFFF").s().p("AgHAHQgCgDAAgEQAAgDACgDQADgDAEAAQAFAAADADQACADAAADQAAAEgCADQgDADgFAAQgEAAgDgDg");
	this.shape_6.setTransform(675.775,125.975);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAVBDIAAg/QAAgIgFgFQgEgGgKAAQgHAAgGAFQgGAEgDAGIAABDIgQAAIAAiGIAQAAIAAA0QALgNAQAAQAeAAAAAgIAAA/g");
	this.shape_7.setTransform(668.575,120.1);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgDgDABgEQgBgEADgCQACgDAEAAQAFAAACADQACACAAAEQAAAEgCADQgCADgFAAQgEAAgCgDg");
	this.shape_8.setTransform(661.45,120.375);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_9.setTransform(657.075,120.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgcAoQgJgKABgQIAAg9IAQAAIAAA8QgBAWATgBQARABAGgOIAAhEIAQAAIAABdIgPAAIAAgJQgKAMgSAAQgPgBgHgIg");
	this.shape_10.setTransform(649.95,122.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgnBDIAAiDIAOAAIACALQAJgNARAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgKANgQAAQgRAAgKgLIAAAugAgXgnIAAAtQAIANAOAAQALAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgPAAgHANg");
	this.shape_11.setTransform(640.15,123.825);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgWAwIAAhdIAPAAIABAKQAHgMAPAAQAEAAADABIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_12.setTransform(627.9,122);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgdAoQgHgKAAgQIAAg9IAPAAIAAA8QAAAWASgBQASABAGgOIAAhEIARAAIAABdIgQAAIgBgJQgJAMgRAAQgPgBgJgIg");
	this.shape_13.setTransform(619.4,122.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgIAAgIIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgEgDgFQgEgFAAgGQAAgMAKgIQAKgIAPAAQAQgBAKAJQAKAJAAANIgRAAQAAgHgFgFQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALACQAMAEAIADQAHADAEAFQAEAFAAAIQAAANgLAIQgKAHgQABQgKAAgJgFg");
	this.shape_14.setTransform(609.775,122.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_15.setTransform(599.925,123.875);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgJgFgFQgEgGgKAAQgHAAgGAFQgGAEgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgNARAAQAeAAAAAhIAAA+g");
	this.shape_16.setTransform(590.075,122);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKgBQgIABgGAEQgGAEAAAHIgQAAQAAgIAFgGQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAOIAAAsQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_17.setTransform(580.175,122.1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgUAHIAAgNIApAAIAAANg");
	this.shape_18.setTransform(572.825,121.425);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgWAwIAAhdIAQAAIAAAKQAHgMAOAAQAFAAADABIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_19.setTransform(567.8,122);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgcAoQgJgKABgQIAAg9IAQAAIAAA8QgBAWATgBQARABAGgOIAAhEIAQAAIAABdIgPAAIgBgJQgJAMgSAAQgPgBgHgIg");
	this.shape_20.setTransform(559.3,122.2);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgIAAgIIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgEgDgFQgEgFAAgGQAAgMAKgIQAKgIAPAAQAQgBAKAJQAKAJAAANIgRAAQAAgHgFgFQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALACQAMAEAIADQAHADAEAFQAEAFAAAIQAAANgLAIQgKAHgQABQgKAAgJgFg");
	this.shape_21.setTransform(549.675,122.1);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_22.setTransform(539.825,123.875);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgJgFgFQgEgGgKAAQgHAAgGAFQgGAEgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgNARAAQAeAAAAAhIAAA+g");
	this.shape_23.setTransform(529.975,122);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKgBQgIABgGAEQgGAEAAAHIgQAAQAAgIAFgGQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAOIAAAsQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_24.setTransform(520.075,122.1);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgWAwIAAhdIAQAAIAAAKQAHgMAOAAQAFAAADABIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_25.setTransform(512.65,122);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgbAkQgNgMAAgWIAAgCQAAgOAGgLQAGgLAJgGQAKgHAKABQATAAAKAMQALAMgBAXIAAAGIg/AAQAAAOAIAIQAIAJALAAQAJAAAGgDQAFgEAFgGIAKAIQgMASgYABQgSAAgMgOgAgPgcQgGAHgCANIAvAAIAAgBQgBgMgFgHQgHgHgKAAQgIAAgIAHg");
	this.shape_26.setTransform(504.4,122.1);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgYA3IgBALIgOAAIAAiGIAQAAIAAAzQAKgMAQAAQARAAAKAMQAKAOAAAVIAAACQAAAWgKANQgKAOgRAAQgRAAgKgOgAgXAAIAAAnQAHAQAQgBQALABAGgKQAHgJAAgSQAAgRgHgIQgGgIgLgBQgQABgHAPg");
	this.shape_27.setTransform(494.725,120.2);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgMIAAg5IgRAAIAAgNIARAAIAAgXIAQAAIAAAXIARAAIAAANIgRAAIAAA5QAAAGACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_28.setTransform(481.775,121.05);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgcAoQgIgKAAgQIAAg9IAPAAIAAA8QAAAWASgBQASABAGgOIAAhEIAQAAIAABdIgPAAIgBgJQgJAMgSAAQgPgBgHgIg");
	this.shape_29.setTransform(474.15,122.2);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKgBQgIABgGAEQgGAEAAAHIgQAAQAAgIAFgGQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAOIAAAsQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_30.setTransform(464.275,122.1);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_31.setTransform(457.225,120.1);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_32.setTransform(448.45,120.375);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgMIAAg5IgRAAIAAgNIARAAIAAgXIAQAAIAAAXIARAAIAAANIgRAAIAAA5QAAAGACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_33.setTransform(443.025,121.05);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKgBQgIABgGAEQgGAEAAAHIgQAAQAAgIAFgGQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAOIAAAsQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_34.setTransform(435.425,122.1);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgcBCIgGgBIAAgNIAFAAQAHAAAFgDQAFgDADgJIADgKIghhdIARAAIAXBGIAWhGIASAAIgnBtQgIAYgTAAg");
	this.shape_35.setTransform(426.3,124.025);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKgBQgIABgGAEQgGAEAAAHIgQAAQAAgIAFgGQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAOIAAAsQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_36.setTransform(417.125,122.1);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AAVBDIAAg/QAAgIgFgFQgEgGgKAAQgHAAgGAFQgGAEgDAGIAABDIgQAAIAAiGIAQAAIAAA0QALgNAQAAQAeAAAAAgIAAA/g");
	this.shape_37.setTransform(407.325,120.1);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgJgFgFQgEgGgKAAQgHAAgGAFQgGAEgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgNARAAQAeAAAAAhIAAA+g");
	this.shape_38.setTransform(392.925,122);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKgBQgIABgGAEQgGAEAAAHIgQAAQAAgIAFgGQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAOIAAAsQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_39.setTransform(383.025,122.1);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AAzAwIAAg+QAAgJgFgFQgFgGgLAAQgJABgGAFQgGAGgBAIIAAA+IgPAAIAAg9QAAgVgUAAQgQAAgGAOIAABEIgRAAIAAhdIAQAAIAAAKQALgMASAAQATAAAHAPQAEgHAIgEQAIgFAKABQAfgBABAiIAAA+g");
	this.shape_40.setTransform(370.225,122);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKgBQgIABgGAEQgGAEAAAHIgQAAQAAgIAFgGQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAOIAAAsQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_41.setTransform(357.425,122.1);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_42.setTransform(347.325,123.875);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKgBQgIABgGAEQgGAEAAAHIgQAAQAAgIAFgGQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAOIAAAsQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_43.setTransform(337.525,122.1);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgWAwIAAhdIAPAAIABAKQAHgMAOAAQAFAAADABIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_44.setTransform(330.1,122);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKgBQgIABgGAEQgGAEAAAHIgQAAQAAgIAFgGQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAOIAAAsQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_45.setTransform(321.625,122.1);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AAUBDIgggrIgKAKIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_46.setTransform(312.825,120.1);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgbAkQgNgMAAgWIAAgCQABgOAFgLQAGgLAJgGQAKgHAKABQATAAAKAMQAKAMAAAXIAAAGIg/AAQAAAOAIAIQAIAJALAAQAJAAAGgDQAFgEAFgGIAKAIQgMASgYABQgSAAgMgOgAgOgcQgHAHgBANIAuAAIAAgBQAAgMgGgHQgHgHgKAAQgJAAgGAHg");
	this.shape_47.setTransform(302.95,122.1);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgJgFgFQgEgGgKAAQgHAAgGAFQgGAEgDAHIAABCIgQAAIAAhdIAPAAIAAALQALgNARAAQAeAAAAAhIAAA+g");
	this.shape_48.setTransform(293.125,122);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgOALgIQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgFgKgBQgIABgGAEQgGAEAAAHIgQAAQAAgIAFgGQAFgHAJgEQAIgDAKAAQAQgBAJAJQAKAIAAAOIAAAsQAAAMADAIIAAABIgRAAIgCgKQgLANgPAAQgOgBgJgHgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_49.setTransform(283.225,122.1);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgbAkQgMgMAAgWIAAgCQgBgOAGgLQAGgLAJgGQAKgHAKABQATAAAKAMQALAMAAAXIAAAGIhAAAQAAAOAIAIQAIAJALAAQAJAAAFgDQAGgEAFgGIAKAIQgMASgYABQgSAAgMgOgAgPgcQgGAHgCANIAvAAIAAgBQgBgMgGgHQgGgHgKAAQgIAAgIAHg");
	this.shape_50.setTransform(273.65,122.1);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AAUBDIgggrIgKAKIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_51.setTransform(264.875,120.1);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgLAQQAIgMAAgLIAAgOIAPAAIAAAMQAAAJgEAIQgEAJgGAFg");
	this.shape_52.setTransform(780.425,101.575);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AAUBEIgggtIgKALIAAAiIgQAAIAAiHIAQAAIAABRIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_53.setTransform(775.025,94.5);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_54.setTransform(764.925,96.5);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgcBCIgGgBIAAgNIAFAAQAHAAAFgDQAFgDADgJIAEgKIgihdIARAAIAXBGIAWhGIASAAIgnBtQgIAYgTAAg");
	this.shape_55.setTransform(755.8,98.425);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgJgFgGQgEgEgKAAQgHAAgGADQgGAFgDAGIAABDIgQAAIAAheIAPAAIAAANQALgOARgBQAeAAAAAiIAAA+g");
	this.shape_56.setTransform(746.575,96.4);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAEAAADADQADACAAAEQAAAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_57.setTransform(739.45,94.775);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AAzAwIAAg+QAAgJgFgGQgFgEgLAAQgJgBgGAGQgGAFgBAJIAAA+IgPAAIAAg9QAAgVgUABQgQAAgGANIAABEIgRAAIAAheIAQAAIAAALQALgNASAAQATAAAHAQQAEgHAIgEQAIgEAKgBQAfABABAhIAAA+g");
	this.shape_58.setTransform(729.325,96.4);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgJgFgGQgEgEgKAAQgHAAgGADQgGAFgDAGIAABDIgQAAIAAheIAPAAIAAANQALgOARgBQAeAAAAAiIAAA+g");
	this.shape_59.setTransform(712.025,96.4);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_60.setTransform(702.125,96.5);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AAVBEIAAhAQAAgIgFgGQgEgEgKAAQgHAAgGADQgGAFgDAGIAABEIgQAAIAAiHIAQAAIAAA0QALgOAQAAQAeAAAAAhIAABAg");
	this.shape_61.setTransform(692.325,94.5);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_62.setTransform(682.425,96.5);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgnBDIAAiDIAOAAIABALQAKgNARAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgJANgSAAQgQAAgKgLIAAAugAgXgnIAAAtQAHANAQAAQAKAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgPAAgHANg");
	this.shape_63.setTransform(672.7,98.225);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AAzAwIAAg+QAAgJgFgGQgFgEgLAAQgJgBgGAGQgGAFgBAJIAAA+IgPAAIAAg9QAAgVgUABQgQAAgGANIAABEIgRAAIAAheIAQAAIAAALQALgNASAAQATAAAHAQQAEgHAIgEQAIgEAKgBQAfABABAhIAAA+g");
	this.shape_64.setTransform(659.525,96.4);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgcAnQgJgIABgSIAAg9IAQAAIAAA9QgBAVATABQARAAAGgPIAAhEIAQAAIAABfIgPAAIgBgKQgJALgSAAQgPABgHgKg");
	this.shape_65.setTransform(646.7,96.6);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgJgFgGQgEgEgKAAQgHAAgGADQgGAFgDAGIAABDIgQAAIAAheIAPAAIAAANQALgOARgBQAeAAAAAiIAAA+g");
	this.shape_66.setTransform(636.775,96.4);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgbAlQgMgNAAgVIAAgDQgBgNAGgLQAFgMAKgGQAKgGAKgBQATAAAKANQALAMAAAXIAAAFIhAAAQAAAOAIAKQAIAIALAAQAJAAAFgEQAHgDAEgGIAKAIQgMASgXAAQgTABgMgNgAgOgcQgHAIgBANIAuAAIAAgCQAAgNgHgGQgFgHgLAAQgJAAgGAHg");
	this.shape_67.setTransform(627.1,96.5);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgnBDIAAiDIAPAAIABALQAKgNAQAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgJANgRAAQgRAAgKgLIAAAugAgXgnIAAAtQAIANAOAAQALAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgOAAgIANg");
	this.shape_68.setTransform(617.4,98.225);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgJgFgGQgEgEgKAAQgHAAgGADQgGAFgDAGIAABDIgQAAIAAheIAPAAIAAANQALgOARgBQAeAAAAAiIAAA+g");
	this.shape_69.setTransform(602.725,96.4);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_70.setTransform(592.825,96.5);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgJgFgGQgEgEgKAAQgHAAgGADQgGAFgDAGIAABDIgQAAIAAheIAPAAIAAANQALgOARgBQAeAAAAAiIAAA+g");
	this.shape_71.setTransform(582.975,96.4);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_72.setTransform(573.075,96.5);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_73.setTransform(562.975,98.275);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgJgFgGQgEgEgKAAQgHAAgGADQgGAFgDAGIAABDIgQAAIAAheIAPAAIAAANQALgOARgBQAeAAAAAiIAAA+g");
	this.shape_74.setTransform(553.125,96.4);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_75.setTransform(543.225,96.5);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgJgFgGQgEgEgKAAQgHAAgGADQgGAFgDAGIAABDIgQAAIAAheIAPAAIAAANQALgOARgBQAeAAAAAiIAAA+g");
	this.shape_76.setTransform(533.375,96.4);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgbAlQgMgNAAgVIAAgDQAAgNAFgLQAFgMAKgGQAKgGAKgBQATAAAKANQALAMAAAXIAAAFIhAAAQABAOAHAKQAIAIALAAQAJAAAFgEQAHgDAEgGIAKAIQgMASgXAAQgTABgMgNgAgOgcQgHAIgBANIAuAAIAAgCQgBgNgGgGQgFgHgLAAQgJAAgGAHg");
	this.shape_77.setTransform(523.7,96.5);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgnBDIAAiDIAPAAIABALQAKgNAQAAQARAAAKANQAKANAAAXIAAACQAAAUgKAOQgJANgSAAQgQAAgKgLIAAAugAgXgnIAAAtQAHANAPAAQALAAAHgJQAHgKAAgRQAAgQgHgJQgHgKgLAAQgOAAgIANg");
	this.shape_78.setTransform(514,98.225);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAFAAACADQADACAAAEQAAAEgDADQgCADgFAAQgEAAgCgDg");
	this.shape_79.setTransform(497.7,94.775);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_80.setTransform(490.575,96.5);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_81.setTransform(480.475,98.275);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_82.setTransform(470.675,96.5);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgYA4IgBALIgOAAIAAiGIAQAAIAAAyQAKgNAQAAQARABAKANQAKANAAAWIAAABQAAAWgKANQgKANgRAAQgRABgKgNgAgXgBIAAAoQAHAQAQAAQALgBAGgIQAHgKAAgSQAAgRgHgHQgGgKgLABQgQgBgHAPg");
	this.shape_83.setTransform(460.975,94.6);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgbAlQgNgNAAgVIAAgDQABgNAFgLQAGgMAJgGQAKgGAKgBQATAAAKANQAKAMAAAXIAAAFIg/AAQABAOAHAKQAIAIALAAQAJAAAGgEQAFgDAFgGIAKAIQgMASgXAAQgTABgMgNgAgOgcQgHAIgCANIAvAAIAAgCQAAgNgGgGQgHgHgKAAQgIAAgHAHg");
	this.shape_84.setTransform(451,96.5);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgIAAgIIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgDAAgHQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgEgDgEQgEgGAAgHQAAgLAKgJQAKgHAPgBQAQAAAKAJQAKAIAAAOIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAHQgKAJgQgBQgKABgJgFg");
	this.shape_85.setTransform(441.475,96.5);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQADACgBAEQABAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_86.setTransform(430.25,94.775);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgIAAgIIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgDAAgHQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgEgDgEQgEgGAAgHQAAgLAKgJQAKgHAPgBQAQAAAKAJQAKAIAAAOIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAHQgKAJgQgBQgKABgJgFg");
	this.shape_87.setTransform(423.375,96.5);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_88.setTransform(413.825,96.5);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAFAAACADQADACAAAEQAAAEgDADQgCADgFAAQgEAAgCgDg");
	this.shape_89.setTransform(406.8,94.775);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AgcA3QgLgOAAgVIAAgCQAAgUAKgOQALgOARAAQAPAAAKAMIAAgxIAQAAIAACGIgPAAIAAgKQgKAMgRgBQgQABgKgOgAgQgGQgHAIAAASQAAAQAHAKQAGAIALABQAQAAAHgPIAAgqQgIgNgPAAQgLgBgGAKg");
	this.shape_90.setTransform(399.3,94.6);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgbAlQgMgNAAgVIAAgDQgBgNAGgLQAGgMAJgGQAKgGAKgBQATAAAKANQALAMAAAXIAAAFIhAAAQAAAOAIAKQAIAIALAAQAJAAAFgEQAGgDAFgGIAKAIQgMASgYAAQgSABgMgNgAgPgcQgGAIgCANIAvAAIAAgCQgBgNgFgGQgHgHgKAAQgIAAgIAHg");
	this.shape_91.setTransform(389.75,96.5);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AAzAwIAAg+QAAgJgFgGQgFgEgLAAQgJgBgGAGQgGAFgBAJIAAA+IgPAAIAAg9QAAgVgUABQgQAAgGANIAABEIgRAAIAAheIAQAAIAAALQALgNASAAQATAAAHAQQAEgHAIgEQAIgEAKgBQAfABABAhIAAA+g");
	this.shape_92.setTransform(376.975,96.4);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgbAlQgMgNAAgVIAAgDQAAgNAFgLQAFgMAKgGQAKgGAKgBQATAAAKANQALAMAAAXIAAAFIhAAAQABAOAHAKQAIAIALAAQAJAAAFgEQAHgDAEgGIAKAIQgMASgXAAQgTABgMgNgAgOgcQgHAIgBANIAuAAIAAgCQAAgNgHgGQgFgHgLAAQgJAAgGAHg");
	this.shape_93.setTransform(364.4,96.5);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AgWAwIAAheIAPAAIABAMQAHgNAPgBQAEABADABIAAAPIgIAAQgPgBgGAOIAABCg");
	this.shape_94.setTransform(357,96.4);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AgeAkQgMgNAAgXIAAAAQAAgOAFgLQAGgLAKgGQAJgHAMAAQATAAAMAOQAMAOAAAVIAAABQAAAOgFALQgFALgKAGQgKAGgNAAQgSAAgMgNgAgTgZQgHAJAAARQAAAQAHAKQAIAJALAAQAMAAAIgJQAHgLAAgQQAAgPgHgKQgIgKgMAAQgLAAgIAKg");
	this.shape_95.setTransform(348.375,96.5);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQADACAAAEQAAAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_96.setTransform(341.1,94.775);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AgYA4IgBALIgOAAIAAiGIAQAAIAAAyQAKgNAQAAQARABAKANQAKANAAAWIAAABQAAAWgKANQgKANgRAAQgRABgKgNgAgXgBIAAAoQAHAQAQAAQALgBAGgIQAHgKAAgSQAAgRgHgHQgGgKgLABQgQgBgHAPg");
	this.shape_97.setTransform(334.075,94.6);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_98.setTransform(319.425,96.5);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AgcBCIgGgBIAAgNIAFAAQAHAAAFgDQAFgDADgJIAEgKIgihdIARAAIAXBGIAWhGIASAAIgnBtQgIAYgTAAg");
	this.shape_99.setTransform(310.3,98.425);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgJgFgGQgEgEgKAAQgHAAgGADQgGAFgDAGIAABDIgQAAIAAheIAPAAIAAANQALgOARgBQAeAAAAAiIAAA+g");
	this.shape_100.setTransform(301.075,96.4);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgJgFgGQgEgEgKAAQgHAAgGADQgGAFgDAGIAABDIgQAAIAAheIAPAAIAAANQALgOARgBQAeAAAAAiIAAA+g");
	this.shape_101.setTransform(291.125,96.4);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_102.setTransform(281.225,96.5);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AAUBEIgggtIgKALIAAAiIgQAAIAAiHIAQAAIAABRIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_103.setTransform(272.425,94.5);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AgcAnQgJgIABgSIAAg9IAQAAIAAA9QgBAVATABQARAAAGgPIAAhEIAQAAIAABfIgPAAIgBgKQgJALgSAAQgPABgHgKg");
	this.shape_104.setTransform(262.3,96.6);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AAUBEIgggtIgKALIAAAiIgQAAIAAiHIAQAAIAABRIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_105.setTransform(253.425,94.5);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_106.setTransform(243.325,96.5);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AgHBEIAAiHIAPAAIAACHg");
	this.shape_107.setTransform(236.275,94.5);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAFAAACADQACACABAEQgBAEgCADQgCADgFAAQgEAAgCgDg");
	this.shape_108.setTransform(231.95,94.775);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AgdA3QgKgOAAgVIAAgCQAAgUAKgOQAKgOARAAQAQAAAKAMIAAgxIAQAAIAACGIgPAAIgBgKQgKAMgQgBQgRABgKgOgAgQgGQgHAIAAASQAAAQAHAKQAGAIALABQAPAAAIgPIAAgqQgHgNgPAAQgMgBgGAKg");
	this.shape_109.setTransform(224.45,94.6);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AAVBEIAAhAQAAgIgFgGQgEgEgKAAQgHAAgGADQgGAFgDAGIAABEIgQAAIAAiHIAQAAIAAA0QALgOAQAAQAeAAAAAhIAABAg");
	this.shape_110.setTransform(210.225,94.5);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgPALgHQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_111.setTransform(200.325,96.5);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AgHBEIAAiHIAPAAIAACHg");
	this.shape_112.setTransform(193.275,94.5);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AgbAlQgNgNAAgVIAAgDQABgNAFgLQAGgMAJgGQAKgGAKgBQATAAAKANQAKAMAAAXIAAAFIg/AAQAAAOAIAKQAIAIALAAQAJAAAGgEQAFgDAFgGIAKAIQgMASgXAAQgTABgMgNgAgOgcQgHAIgBANIAuAAIAAgCQAAgNgGgGQgHgHgKAAQgIAAgHAHg");
	this.shape_113.setTransform(186.4,96.5);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AgCA1QgGgGAAgMIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_114.setTransform(178.325,95.45);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AgbAlQgNgNAAgVIAAgDQAAgNAGgLQAGgMAJgGQAKgGAKgBQATAAAKANQALAMgBAXIAAAFIg/AAQAAAOAIAKQAIAIALAAQAJAAAGgEQAFgDAFgGIAKAIQgMASgYAAQgSABgMgNgAgPgcQgGAIgCANIAvAAIAAgCQgBgNgFgGQgHgHgKAAQgIAAgIAHg");
	this.shape_115.setTransform(170.95,96.5);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AgWA8QgLgFgGgIQgHgJAAgLIARAAQAAALAJAHQAIAHAOAAQAOAAAGgGQAIgFAAgKQgBgJgGgFQgHgFgQgFQgWgHgKgIQgKgJABgNQgBgPAMgKQANgKASAAQAOAAAJAFQALAFAFAJQAHAJAAALIgRAAQgBgMgHgGQgIgHgNAAQgMAAgGAFQgIAGABAKQgBAHAIAGQAGAFAPAFQAQAEAJAFQAJAFAEAHQAEAHABAKQgBAQgMAJQgLAKgVAAQgMAAgMgGg");
	this.shape_116.setTransform(160.75,94.875);

	this.instance_2 = new lib.bg10();
	this.instance_2.setTransform(471,324.2,1.1987,1.1979,0,0,0,0,0.1);
	this.instance_2.alpha = 0.1992;

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.bf(img.Bitmap2, null, new cjs.Matrix2D(1,0,0,1,-499,-300)).s().p("EhN9Au4MAAAhdvMCb7AAAMAAABdvg");
	this.shape_117.setTransform(471,266.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_117},{t:this.instance_2},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.btnNextDasar1},{t:this.btnMenuDasar1},{t:this.btnBack3},{t:this.btnAnim1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(452,236.2,518,330.00000000000006);
// library properties:
lib.properties = {
	id: 'E740BB847DF4864B949C99CD86B71105',
	width: 960,
	height: 540,
	fps: 24,
	color: "#3867D6",
	opacity: 1.00,
	manifest: [
		{src:"images/_10pngcopy.png", id:"_10pngcopy"},
		{src:"images/aa1.png", id:"aa1"},
		{src:"images/aa10.png", id:"aa10"},
		{src:"images/aa12.png", id:"aa12"},
		{src:"images/aa14.png", id:"aa14"},
		{src:"images/aa17.png", id:"aa17"},
		{src:"images/aa18.png", id:"aa18"},
		{src:"images/aa19.png", id:"aa19"},
		{src:"images/aa2.png", id:"aa2"},
		{src:"images/aa3.png", id:"aa3"},
		{src:"images/aa4.png", id:"aa4"},
		{src:"images/aa5.png", id:"aa5"},
		{src:"images/aa15.png", id:"aa15"},
		{src:"images/aa7.png", id:"aa7"},
		{src:"images/aa8.png", id:"aa8"},
		{src:"images/aa11.png", id:"aa11"},
		{src:"images/aa9.png", id:"aa9"},
		{src:"images/bookpngcopy.png", id:"bookpngcopy"},
		{src:"images/flash0aiAssets.png", id:"flash0aiAssets"},
		{src:"images/Bitmap2.png", id:"Bitmap2"},
		{src:"images/aa13.png", id:"aa13"},
		{src:"images/aa6.png", id:"aa6"},
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