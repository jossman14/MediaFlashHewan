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



(lib._1 = function() {
	this.initialize(img._1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1154,594);


(lib._2 = function() {
	this.initialize(img._2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,779,573);


(lib._5 = function() {
	this.initialize(img._5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,688,368);


(lib.Bitmap3 = function() {
	this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,249,87);


(lib.bookpngcopy = function() {
	this.initialize(img.bookpngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,399);


(lib.flash0aiAssets = function() {
	this.initialize(img.flash0aiAssets);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,258);


(lib._3 = function() {
	this.initialize(img._3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1095,608);


(lib.flash0aiAssets_1 = function() {
	this.initialize(img.flash0aiAssets_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,369,180);


(lib.flash0aiAssets_2 = function() {
	this.initialize(img.flash0aiAssets_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,153,152);


(lib.flash0aiAssets_3 = function() {
	this.initialize(img.flash0aiAssets_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,153,152);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);


(lib._4 = function() {
	this.initialize(img._4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,753,564);// helper functions:

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


(lib.hasilcopy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgEAtIAAhZIAJAAIAABZg");
	this.shape.setTransform(59.475,59.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgEArIAAg+IAJAAIAAA+gAgDggQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAABIABAEIgBAEQAAABgBAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAgBg");
	this.shape_1.setTransform(57.025,59.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgKAeQgFgCgCgFQgDgFAAgGIAJAAQAAAGAEADQADADAFAAQAFAAADgCQADgDAAgEQAAgEgDgDQgCgCgHgCQgGgCgEgCQgEgCgCgDQgCgEAAgEQAAgIAFgFQAGgGAHAAQAJAAAGAGQAGAFAAAJIgJAAQAAgEgEgEQgDgDgFAAQgEAAgCADQgDACAAAEQAAAEACACIAJAEQAHACAEACQAEACACAEQACADAAAFQAAAJgFAFQgGAFgJAAQgGAAgFgDg");
	this.shape_2.setTransform(53.175,60.825);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgQAcQgFgGAAgIQAAgKAGgEQAGgGALAAIAJAAIAAgFQAAgFgDgEQgDgDgFAAQgFAAgDADQgDADAAAEIgJAAQAAgFADgEQADgFAEgCQAFgDAFAAQAJAAAGAGQAFAFAAAKIAAAcQAAAJACAFIAAABIgJAAIgCgHQgHAIgHAAQgIAAgFgFgAgMANQAAAFADADQADACAEAAQADAAAFgCQADgDACgEIAAgNIgHAAQgQAAAAAMg");
	this.shape_3.setTransform(47.85,60.825);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AASArIAAgoIgjAAIAAAoIgJAAIAAhVIAJAAIAAAlIAjAAIAAglIAKAAIAABVg");
	this.shape_4.setTransform(41.5,59.725);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFFFFF").ss(3,1,1).p("AntpVIPbAAIAASrIvbAAg");
	this.shape_5.setTransform(49.35,59.825);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E74C3C").s().p("AntJWIAAyrIPbAAIAASrg");
	this.shape_6.setTransform(49.35,59.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hasilcopy, new cjs.Rectangle(-1.5,-1.5,101.7,122.7), null);


(lib.hasil = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgEAtIAAhZIAJAAIAABZg");
	this.shape.setTransform(59.475,59.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgEArIAAg+IAJAAIAAA+gAgDggQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAABIABAEIgBAEQAAABgBAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAgBg");
	this.shape_1.setTransform(57.025,59.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgKAeQgFgCgCgFQgDgFAAgGIAJAAQAAAGAEADQADADAFAAQAFAAADgCQADgDAAgEQAAgEgDgDQgCgCgHgCQgGgCgEgCQgEgCgCgDQgCgEAAgEQAAgIAFgFQAGgGAHAAQAJAAAGAGQAGAFAAAJIgJAAQAAgEgEgEQgDgDgFAAQgEAAgCADQgDACAAAEQAAAEACACIAJAEQAHACAEACQAEACACAEQACADAAAFQAAAJgFAFQgGAFgJAAQgGAAgFgDg");
	this.shape_2.setTransform(53.175,60.825);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgQAcQgFgGAAgIQAAgKAGgEQAGgGALAAIAJAAIAAgFQAAgFgDgEQgDgDgFAAQgFAAgDADQgDADAAAEIgJAAQAAgFADgEQADgFAEgCQAFgDAFAAQAJAAAGAGQAFAFAAAKIAAAcQAAAJACAFIAAABIgJAAIgCgHQgHAIgHAAQgIAAgFgFgAgMANQAAAFADADQADACAEAAQADAAAFgCQADgDACgEIAAgNIgHAAQgQAAAAAMg");
	this.shape_3.setTransform(47.85,60.825);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AASArIAAgoIgjAAIAAAoIgJAAIAAhVIAJAAIAAAlIAjAAIAAglIAKAAIAABVg");
	this.shape_4.setTransform(41.5,59.725);

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


(lib.Tween7_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#603AD8").s().p("EhB5AkpMAAAhJRMCDzAAAMAAABJRg");

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-421.8,-234.5,843.6,469.1);


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


(lib.drop3G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape.setTransform(109.925,64.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgcAiQgMgMAAgWIAAAAQAAgNAFgKQAFgLAKgFQAJgHALAAQASAAALANQAMANAAAUIAAABQAAANgFALQgFAKgKAGQgJAGgMgBQgRAAgLgMgAgRgYQgIAJAAAQQAAAPAIAJQAHAJAKAAQALAAAHgJQAIgJAAgQQAAgPgIgIQgHgKgLAAQgKAAgHAJg");
	this.shape_1.setTransform(101.75,65.05);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_2.setTransform(94.825,63.425);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_3.setTransform(90.325,64.975);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgLAJgFQAKgHAJAAQASAAAJAMQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLAQgXAAQgRAAgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_4.setTransform(82.575,65.05);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgCAzQgFgHAAgLIAAg3IgQAAIAAgMIAQAAIAAgVIAOAAIAAAVIARAAIAAAMIgRAAIAAA3QAAAFACADQADACAFABIAIgBIAAAMIgMABQgLAAgEgFg");
	this.shape_5.setTransform(74.95,64.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIAAALQALgNAQAAQAcAAAAAgIAAA7g");
	this.shape_6.setTransform(67.75,64.975);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgHQABgIgFgFQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAEgHQAFgGAIgEQAJgDAIgBQAQAAAJAJQAIAHABANIAAApQAAANADAGIAAACIgQAAQgCgCAAgIQgLALgNAAQgOABgJgIgAgVASQABAHAEAEQAFAEAIABQAGAAAGgEQAHgEACgGIAAgTIgMAAQgbABAAAQg");
	this.shape_7.setTransform(58.4,65.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASgBIAPAAIAAgHQAAgIgEgFQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAFgHQAEgGAJgEQAIgDAIgBQAQAAAJAJQAJAHAAANIAAApQAAANADAGIAAACIgQAAQgBgCgBgIQgLALgOAAQgNABgIgIgAgUASQgBAHAFAEQAFAEAHABQAHAAAGgEQAHgEACgGIAAgTIgLAAQgbABAAAQg");
	this.shape_8.setTransform(44.95,65.05);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgbA0QgKgNAAgVIAAgBQAAgTAKgNQAKgNAQAAQAOABAKAKIAAgvIAPAAIAAB/IgOAAIgBgKQgJALgQAAQgPAAgKgMgAgPgFQgHAHAAARQAAAPAHAJQAGAIAKABQAPAAAHgNIAAgpQgHgMgPAAQgKAAgGAJg");
	this.shape_9.setTransform(35.325,63.25);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAPAAIAAgHQAAgIgFgFQgFgEgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgGAEgHQAFgGAJgEQAIgDAJgBQAPAAAJAJQAIAHABANIAAApQAAANADAGIAAACIgQAAQgCgCAAgIQgLALgNAAQgOABgJgIgAgVASQABAHAEAEQAFAEAHABQAHAAAHgEQAGgEADgGIAAgTIgNAAQgbABAAAQg");
	this.shape_10.setTransform(26.1,65.05);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AglA/IAAh7IAOAAIABAKQAKgMAPAAQAQAAAJAMQAKANAAAVIAAACQAAATgKANQgJAMgQAAQgPAAgJgKIAAArgAgVglIAAAqQAGANAOAAQAKAAAHgJQAGgJABgQQgBgQgGgIQgHgJgKAAQgOAAgGAMg");
	this.shape_11.setTransform(16.9,66.7);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgSA7QgJgEgGgHIAIgKQALANAOAAQAKAAAGgHQAHgGgBgLIAAgIQgJAKgPAAQgPAAgKgMQgKgMAAgWQAAgUAKgNQAJgNARAAQAPAAAJAMIABgKIAOAAIAABXQAAASgKAKQgLAKgRgBQgJAAgJgEgAgQgpQgFAJgBARQABAPAFAIQAHAJAKAAQAPgBAGgNIAAgnQgGgOgPAAQgKABgHAIg");
	this.shape_12.setTransform(217.3,42.35);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_13.setTransform(208,40.575);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_14.setTransform(201.225,39.025);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_15.setTransform(196.725,40.575);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgbAnQgJgIAAgLQAAgOALgGQALgJARAAIAQAAIAAgHQgBgHgEgFQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAGgGAIgEQAIgDAJAAQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgHQgLALgOAAQgNABgIgIgAgVASQAAAHAFAEQAFAEAHABQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_16.setTransform(188.75,40.65);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgMBBIAAhOIgOAAIAAgLIAOAAIAAgJQAAgPAIgIQAGgIAOAAIALABIgBANIgIAAQgIAAgEADQgEAFAAAIIAAAKIATAAIAAALIgTAAIAABOg");
	this.shape_17.setTransform(181.475,38.7);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_18.setTransform(157.25,40.575);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgbAnQgJgIAAgLQAAgOALgGQALgJARAAIAQAAIAAgHQgBgHgEgFQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAFgGAJgEQAIgDAJAAQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgHQgLALgOAAQgNABgIgIgAgVASQAAAHAFAEQAFAEAHABQAHAAAHgFQAGgDADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_19.setTransform(147.9,40.65);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AglA/IAAh7IAOAAIABAKQAJgMAQAAQAQAAAKAMQAJANAAAVIAAACQAAATgJAMQgKANgQAAQgPAAgKgKIAAArgAgWglIAAAqQAIAMANAAQAKABAHgJQAGgJAAgQQAAgPgGgJQgHgJgKAAQgNAAgIAMg");
	this.shape_20.setTransform(138.7,42.3);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgaAiQgLgLAAgVIAAgCQAAgMAFgLQAFgLAJgFQAKgHAJABQASAAAJALQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXgBQgRAAgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_21.setTransform(129.325,40.65);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgbA0QgKgNAAgVIAAgBQAAgTAKgNQAKgNAQABQAOgBAKALIAAgvIAPAAIAAB/IgOAAIgBgKQgJALgQAAQgPAAgKgMgAgPgGQgHAIAAARQAAAQAHAIQAGAJAKAAQAPgBAHgNIAAgnQgHgOgPAAQgKABgGAIg");
	this.shape_22.setTransform(119.725,38.85);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_23.setTransform(96.775,39.025);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgbA0QgKgNAAgVIAAgBQAAgTAKgNQAKgNAQABQAOgBAKALIAAgvIAPAAIAAB/IgOAAIgBgKQgJALgQAAQgPAAgKgMgAgPgGQgHAIAAARQAAAQAHAIQAGAJAKAAQAPgBAHgNIAAgnQgHgOgPAAQgKABgGAIg");
	this.shape_24.setTransform(89.675,38.85);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_25.setTransform(65.075,38.775);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgbAnQgJgIAAgLQAAgOALgGQALgJARAAIAQAAIAAgHQgBgHgEgFQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAGgGAIgEQAIgDAJAAQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgHQgLALgOAAQgNABgIgIgAgVASQAAAHAFAEQAFAEAHABQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_26.setTransform(55.55,40.65);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgCAzQgFgHAAgLIAAg3IgQAAIAAgMIAQAAIAAgVIAPAAIAAAVIAQAAIAAAMIgQAAIAAA3QAAAFACADQACACAGABIAGgBIAAAMIgLABQgKAAgFgFg");
	this.shape_27.setTransform(47.9,39.65);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgaAiQgLgLAAgVIAAgCQAAgMAFgLQAFgLAJgFQAKgHAJABQASAAAJALQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXgBQgRAAgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_28.setTransform(40.975,40.65);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_29.setTransform(34.325,38.775);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_30.setTransform(29.825,40.575);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgaAiQgLgLAAgVIAAgCQAAgMAFgLQAFgLAJgFQAKgHAJABQASAAAJALQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAHQgLASgXgBQgRAAgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_31.setTransform(22.075,40.65);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgBAzQgGgHAAgLIAAg3IgRAAIAAgMIARAAIAAgVIAPAAIAAAVIAQAAIAAAMIgQAAIAAA3QAAAFABADQADACAFABIAIgBIAAAMIgMABQgLAAgDgFg");
	this.shape_32.setTransform(14.45,39.65);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_33.setTransform(218.525,14.375);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgbAnQgJgIAAgLQAAgOALgGQALgJARABIAQAAIAAgIQgBgHgEgFQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAGgGAIgEQAIgDAJAAQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgHQgLAMgOgBQgNAAgIgHgAgVASQAAAHAFAEQAFAEAHABQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_34.setTransform(209,16.25);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgCAzQgFgHAAgLIAAg3IgRAAIAAgMIARAAIAAgVIAPAAIAAAVIAQAAIAAAMIgQAAIAAA3QAAAFACADQACACAGABIAGgBIAAAMIgLABQgKAAgFgFg");
	this.shape_35.setTransform(201.35,15.25);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgcAiQgMgMAAgWIAAAAQAAgNAFgLQAFgKAKgFQAJgHALABQASAAALAMQAMANAAAUIAAABQAAANgFALQgFAKgKAGQgJAGgMgBQgSAAgKgMgAgSgYQgHAJAAAQQAAAPAHAJQAIAJAKAAQALAAAHgJQAIgJAAgQQAAgOgIgKQgHgJgLAAQgKAAgIAJg");
	this.shape_36.setTransform(194,16.25);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgcAnQgIgIAAgLQAAgOALgGQAKgJATABIAOAAIAAgIQABgHgFgFQgFgFgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAFgGAHgEQAJgDAIAAQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgHQgLAMgNgBQgOAAgJgHgAgUASQAAAHAEAEQAFAEAIABQAGAAAGgFQAHgDACgGIAAgTIgMAAQgaAAAAARg");
	this.shape_37.setTransform(171.25,16.25);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_38.setTransform(164.575,14.625);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_39.setTransform(160.425,14.375);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgSA7QgJgEgGgHIAIgKQALANAOAAQAKAAAGgGQAHgHgBgLIAAgIQgJAKgPAAQgPAAgKgMQgKgMAAgWQAAgVAKgMQAJgMARAAQAPAAAJALIABgKIAOAAIAABXQAAASgLAKQgKAKgRgBQgJAAgJgEgAgQgpQgFAJgBARQABAPAFAIQAHAJAKAAQAPgBAGgNIAAgnQgGgOgPAAQgKABgHAIg");
	this.shape_40.setTransform(153.4,17.95);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_41.setTransform(144.1,16.175);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgbAnQgJgIAAgLQAAgOALgGQALgJARABIAQAAIAAgIQgBgHgEgFQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAGgGAIgEQAIgDAJAAQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgHQgLAMgOgBQgNAAgIgHgAgVASQAAAHAFAEQAFAEAHABQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_42.setTransform(134.75,16.25);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgVA4QgMgIgGgMQgGgOgBgQIAAgKQAAgbANgPQANgPAWAAQATAAALAJQAMAKADASIgQAAQgFgYgYAAQgPAAgIAMQgJAKAAAWIAAAJQAAAUAKAMQAJAMAPAAQAJAAAHgCQAGgCAFgFIAAgbIgcAAIAAgMIAsAAIAAAsQgHAIgLAFQgLAEgOAAQgOAAgLgGg");
	this.shape_43.setTransform(124.225,14.7);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgGAHQgDgDABgEQgBgDADgCQACgDAEAAQAFAAACADQACACAAADQAAAEgCADQgCACgFAAQgEAAgCgCg");
	this.shape_44.setTransform(103,19.925);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_45.setTransform(98.775,14.625);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_46.setTransform(94.625,14.375);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AgcAnQgIgIAAgLQAAgOALgGQALgJASABIAOAAIAAgIQABgHgFgFQgFgFgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAFgGAHgEQAJgDAIAAQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgHQgLAMgOgBQgNAAgJgHgAgUASQgBAHAFAEQAFAEAIABQAGAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_47.setTransform(87.9,16.25);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgBAzQgGgHAAgLIAAg3IgRAAIAAgMIARAAIAAgVIAPAAIAAAVIAQAAIAAAMIgQAAIAAA3QgBAFACADQADACAFABIAIgBIAAAMIgMABQgLAAgDgFg");
	this.shape_48.setTransform(80.25,15.25);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AgcAnQgIgIAAgLQAAgOALgGQAKgJATABIAPAAIAAgIQAAgHgFgFQgFgFgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgHAEgGQAFgGAJgEQAIgDAJAAQAPgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgHQgLAMgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAEAHABQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_49.setTransform(59.85,16.25);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgTA7QgIgEgFgHIAIgKQAJANAOAAQALAAAGgGQAGgHABgLIAAgIQgKAKgPAAQgQAAgJgMQgKgMAAgWQAAgVAJgMQALgMAPAAQAQAAAJALIABgKIAOAAIAABXQAAASgLAKQgKAKgRgBQgJAAgKgEgAgPgpQgHAJABARQgBAPAHAIQAGAJAKAAQAOgBAIgNIAAgnQgIgOgOAAQgKABgGAIg");
	this.shape_50.setTransform(50.3,17.95);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AgTA7QgJgEgEgHIAHgKQAKANAOAAQALAAAGgGQAGgHABgLIAAgIQgKAKgPAAQgQAAgJgMQgKgMAAgWQAAgVAJgMQALgMAPAAQAQAAAJALIABgKIAOAAIAABXQAAASgLAKQgKAKgRgBQgJAAgKgEgAgQgpQgFAJAAARQAAAPAFAIQAHAJAKAAQAOgBAIgNIAAgnQgIgOgOAAQgKABgHAIg");
	this.shape_51.setTransform(40.75,17.95);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_52.setTransform(31.45,16.175);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AgbAnQgJgIAAgLQAAgOALgGQAKgJASABIAPAAIAAgIQAAgHgEgFQgFgFgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgHAFgGQAFgGAHgEQAJgDAIAAQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgHQgLAMgOgBQgNAAgIgHgAgUASQgBAHAFAEQAFAEAIABQAGAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_53.setTransform(22.1,16.25);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgBAzQgGgHAAgLIAAg3IgRAAIAAgMIARAAIAAgVIAPAAIAAAVIAQAAIAAAMIgQAAIAAA3QAAAFABADQADACAFABIAIgBIAAAMIgMABQgLAAgDgFg");
	this.shape_54.setTransform(14.45,15.25);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgMBAIAAhMIgOAAIAAgNIAOAAIAAgJQAAgOAIgIQAGgHAOgBIALABIgBANIgIAAQgIAAgEADQgEAFAAAIIAAAJIATAAIAAANIgTAAIAABMg");
	this.shape_55.setTransform(219.675,-10.1);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AgbAnQgJgHAAgMQAAgOALgGQALgJARABIAQAAIAAgIQgBgHgEgFQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAFgGAJgEQAIgEAJABQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgOgBQgNAAgIgHgAgVASQAAAHAFAEQAFAFAHAAQAHAAAHgFQAGgDADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_56.setTransform(211.8,-8.15);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_57.setTransform(204.775,-8.225);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AgcAnQgIgHAAgMQAAgOALgGQALgJASABIAOAAIAAgIQABgHgFgFQgFgFgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAFgGAHgEQAJgEAIABQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgGQgLALgOgBQgNAAgJgHgAgUASQgBAHAFAEQAFAFAIAAQAGAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_58.setTransform(196.8,-8.15);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgFQgEgEAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgHgFgEQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEACALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKAAgIgDg");
	this.shape_59.setTransform(187.825,-8.15);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AAvAuIAAg7QAAgJgEgFQgEgFgKAAQgJAAgGAFQgGAGAAAIIAAA7IgPAAIAAg6QAAgUgTAAQgPAAgFANIAABBIgQAAIAAhZIAOAAIABAKQAKgMAQAAQAUAAAFAPQAFgHAHgEQAHgEAKAAQAdAAABAgIAAA7g");
	this.shape_60.setTransform(145.2,-8.225);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgKAJgHQAKgFAJAAQASAAAJALQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLARgXAAQgRABgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_61.setTransform(133.325,-8.15);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgVIAOAAIAAAVIARAAIAAAMIgRAAIAAA3QABAFABADQADADAFAAIAIgBIAAAMIgMABQgLABgDgHg");
	this.shape_62.setTransform(125.7,-9.15);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgFQgEgEAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgHgFgEQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEACALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKAAgIgDg");
	this.shape_63.setTransform(118.825,-8.15);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AgbA/IgFgBIAAgNIAEABQAIAAAEgEQAEgDADgIIAEgJIgghYIAQAAIAWBCIAVhCIAQAAIgkBnQgHAWgTAAg");
	this.shape_64.setTransform(110.425,-6.325);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgFQgEgEAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgHgFgEQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEACALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKAAgIgDg");
	this.shape_65.setTransform(102.025,-8.15);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_66.setTransform(64.775,-9.775);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgJALgQAAQgOAAgIgIg");
	this.shape_67.setTransform(58.025,-8.075);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_68.setTransform(51.275,-10.025);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2C3E50").s().p("AgcAnQgIgHAAgMQAAgOALgGQAKgJATABIAPAAIAAgIQAAgHgFgFQgFgFgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgHAEgGQAFgGAJgEQAIgEAJABQAPgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAFAHAAQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_69.setTransform(44.55,-8.15);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2C3E50").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_70.setTransform(37.875,-10.025);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2C3E50").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgKAJgHQAKgFAJAAQASAAAJALQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLARgXAAQgRABgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_71.setTransform(31.375,-8.15);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2C3E50").s().p("AAsA8IAAgvIACgxIgoBgIgLAAIgohgIACAxIAAAvIgQAAIAAh4IAUAAIAnBiIAnhiIAVAAIAAB4g");
	this.shape_72.setTransform(19.375,-9.7);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,2.178,-161.1,-94.7)).s().p("A5MOzIAA9lMAyZAAAIAAdlg");
	this.shape_73.setTransform(120.7,30.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// layout
	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("rgba(0,0,0,0.004)").s().p("A5MZTMAAAgylMAyZAAAMAAAAylg");
	this.shape_74.setTransform(120.7,78.475);

	this.timeline.addTween(cjs.Tween.get(this.shape_74).wait(1));

	// Layer_3
	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("rgba(0,0,0,0.227)").s().p("A2RJ5IAAzxMAsjAAAIAATxg");
	this.shape_75.setTransform(98.9,45.25);

	this.timeline.addTween(cjs.Tween.get(this.shape_75).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-43.7,-83.4,325.7,323.8);


(lib.drop3G4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape.setTransform(184.95,56.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_1.setTransform(177.925,56.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_2.setTransform(169.725,56.175);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_3.setTransform(163.775,54.425);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgWAeQgLgKAAgSIAAgCQAAgLAFgKQAFgIAHgGQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAAMAHAGQAGAIAKAAQAHAAAFgDQAEgDAEgFIAJAHQgKAPgVAAQgPAAgJgLgAgMgXQgFAGgCAKIAnAAIAAAAQgBgKgEgHQgGgFgIAAQgHAAgGAGg");
	this.shape_4.setTransform(158.1,56.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_5.setTransform(150.775,54.425);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_6.setTransform(140.95,54.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgPAlQgHgDgEgGQgFgGAAgHIAOAAQAAAHAFAEQAGAEAHAAQAIAAAEgDQAFgEAAgEQAAgGgEgDQgFgDgJgDQgKgCgGgCQgGgCgDgFQgDgEAAgGQAAgJAIgIQAJgGAMAAQANAAAIAGQAJAIgBALIgNAAQAAgGgFgEQgFgEgGAAQgHAAgEADQgEAEgBAFQABAEADADQAFACAIACQALADAGADQAHACADAFQACAEAAAHQAAAKgIAHQgJAGgNAAQgIAAgIgEg");
	this.shape_7.setTransform(135.2,56.1);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_8.setTransform(127.225,56.175);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgKA5IAAhEIgNAAIAAgKIANAAIAAgJQAAgMAGgHQAGgHANAAIAJABIgBALIgHgBQgHAAgDAFQgEADAAAHIAAAJIARAAIAAAKIgRAAIAABEg");
	this.shape_9.setTransform(120.75,54.35);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_10.setTransform(116.1,54.65);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgYAtQgJgKAAgTIAAgBQAAgRAJgLQAIgLAPAAQAMAAAJAJIAAgpIAOAAIAABvIgNAAIgBgIQgIAKgNAAQgOAAgJgMgAgOgFQgFAGAAAQQAAANAFAIQAGAHAJAAQANAAAGgLIAAgjQgHgLgMAAQgJgBgGAIg");
	this.shape_11.setTransform(109.85,54.5);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_12.setTransform(103.65,56.025);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgWAeQgLgKABgSIAAgCQAAgLAEgKQAEgIAJgGQAIgFAIAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAAMAGAGQAIAIAIAAQAIAAAEgDQAGgDADgFIAIAHQgKAPgTAAQgPAAgKgLgAgMgXQgFAGgCAKIAnAAIAAAAQAAgKgGgHQgEgFgJAAQgHAAgGAGg");
	this.shape_13.setTransform(96.85,56.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgTAuIgBAJIgNAAIAAhvIAOAAIAAAqQAIgKANAAQAPAAAIAKQAJALAAATIAAABQAAASgJALQgJALgOAAQgOAAgHgLgAgTAAIAAAhQAGAMANAAQAJAAAGgHQAFgIAAgPQAAgOgFgGQgGgIgJABQgNAAgGAMg");
	this.shape_14.setTransform(88.8,54.5);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgWAeQgKgKAAgSIAAgCQgBgLAFgKQAEgIAJgGQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAAMAHAGQAGAIAKAAQAGAAAFgDQAFgDAEgFIAIAHQgKAPgTAAQgQAAgJgLgAgMgXQgGAGgBAKIAnAAIAAAAQgBgKgFgHQgEgFgJAAQgHAAgGAGg");
	this.shape_15.setTransform(76.85,56.1);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_16.setTransform(66.225,56.025);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgPAlQgIgDgDgGQgEgGgBgHIAOAAQAAAHAGAEQAEAEAIAAQAHAAAFgDQAFgEAAgEQAAgGgEgDQgEgDgKgDQgKgCgGgCQgGgCgDgFQgDgEAAgGQAAgJAJgIQAHgGAMAAQAOAAAIAGQAIAIAAALIgNAAQAAgGgFgEQgEgEgIAAQgGAAgEADQgEAEgBAFQAAAEAFADQADACAJACQALADAGADQAGACADAFQADAEAAAHQABAKgJAHQgJAGgNAAQgJAAgHgEg");
	this.shape_17.setTransform(55.75,56.1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_18.setTransform(50.1,54.65);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_19.setTransform(46.425,54.425);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgZAeQgKgLAAgTIAAAAQAAgLAFgKQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAAMgEAIQgFAKgIAFQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgJAAgNQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_20.setTransform(40.325,56.1);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgUAuIgBAJIgLAAIAAhvIANAAIAAAqQAIgKAOAAQAOAAAIAKQAJALgBATIAAABQABASgJALQgJALgNAAQgOAAgJgLgAgTAAIAAAhQAGAMANAAQAJAAAFgHQAGgIAAgPQAAgOgGgGQgFgIgJABQgOAAgFAMg");
	this.shape_21.setTransform(32.05,54.5);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_22.setTransform(23.575,56.1);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgLIAPAAIAAgTIAMAAIAAATIAPAAIAAALIgPAAIAAAwQAAAEACADQACADAFgBIAHAAIAAAKIgLACQgJAAgEgFg");
	this.shape_23.setTransform(16.875,55.2);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgWAeQgLgKABgSIAAgCQgBgLAFgKQAEgIAJgGQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAAMAGAGQAIAIAJAAQAGAAAFgDQAFgDAEgFIAIAHQgKAPgTAAQgPAAgKgLgAgMgXQgGAGgBAKIAnAAIAAAAQgBgKgFgHQgEgFgJAAQgHAAgGAGg");
	this.shape_24.setTransform(10.8,56.1);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_25.setTransform(0.175,56.025);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_26.setTransform(253.075,32.425);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_27.setTransform(249.45,32.65);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgPAmQgHgEgFgGQgDgGAAgHIANAAQABAHAFAEQAEAEAIAAQAHAAAGgDQAEgDAAgGQAAgFgEgDQgEgDgKgCQgKgCgGgDQgGgDgDgEQgDgEAAgGQAAgKAIgGQAJgHALAAQAOAAAJAHQAHAGABAMIgOAAQAAgGgEgEQgGgEgHAAQgGAAgEADQgFADABAFQAAAFAEADQADADAKACQAKACAGADQAGACADAFQAEAEAAAGQAAALgJAGQgIAHgOAAQgIAAgIgDg");
	this.shape_28.setTransform(243.7,34.1);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIgBQgHAAgFAEQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_29.setTransform(235.775,34.1);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AARA4IAAg0QAAgIgDgEQgEgEgIAAQgGAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLAMAAQAaAAAAAbIAAA0g");
	this.shape_30.setTransform(227.6,32.425);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIgBQgHAAgFAEQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_31.setTransform(208.825,34.1);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgPAmQgIgEgEgGQgDgGAAgHIANAAQAAAHAGAEQAEAEAIAAQAHAAAGgDQAEgDAAgGQAAgFgEgDQgEgDgKgCQgKgCgGgDQgGgDgDgEQgDgEAAgGQAAgKAJgGQAHgHAMAAQAOAAAJAHQAHAGABAMIgOAAQAAgGgEgEQgGgEgHAAQgGAAgEADQgFADAAAFQABAFAEADQAEADAIACQALACAGADQAGACADAFQAEAEAAAGQAAALgJAGQgIAHgOAAQgJAAgHgDg");
	this.shape_32.setTransform(200.85,34.1);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_33.setTransform(195.2,32.65);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgPAmQgHgEgFgGQgEgGABgHIANAAQABAHAEAEQAFAEAIAAQAIAAAFgDQAEgDAAgGQAAgFgEgDQgFgDgJgCQgKgCgGgDQgGgDgDgEQgDgEAAgGQAAgKAIgGQAJgHAMAAQANAAAIAHQAJAGAAAMIgOAAQAAgGgEgEQgFgEgHAAQgHAAgEADQgFADABAFQAAAFADADQAFADAJACQAKACAGADQAGACAEAFQACAEAAAGQAAALgIAGQgJAHgNAAQgJAAgHgDg");
	this.shape_34.setTransform(189.45,34.1);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AARAoIAAgzQAAgJgDgEQgEgEgIAAQgGAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_35.setTransform(170.9,34.025);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIgBQgHAAgFAEQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_36.setTransform(162.675,34.1);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgYAuQgJgMAAgSIAAgBQAAgRAJgLQAIgLAPAAQANAAAIAKIAAgqIAOAAIAABwIgNAAIgBgJQgIAKgNAAQgOAAgJgLgAgOgFQgFAHAAAPQAAANAFAIQAGAIAJAAQANAAAGgMIAAgkQgHgKgMgBQgJABgGAHg");
	this.shape_37.setTransform(154.2,32.5);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AARAoIAAgzQAAgJgDgEQgEgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_38.setTransform(135.45,34.025);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgXAfQgKgLABgSIAAgCQAAgLAEgJQAEgKAJgFQAIgFAIAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAIQAIAHAJAAQAHAAAEgDQAGgDADgFIAIAGQgKAQgTAAQgPAAgLgKgAgMgXQgFAGgCALIAnAAIAAgCQAAgJgGgGQgEgGgJAAQgHAAgGAGg");
	this.shape_39.setTransform(127.45,34.1);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgQA0QgIgDgFgHIAIgIQAIALANAAQAJAAAGgGQAFgFAAgKIAAgHQgJAJgNAAQgNAAgJgLQgJgLABgTQgBgSAJgLQAIgLAPAAQAOAAAIAKIAAgIIANAAIAABMQAAAPgKAJQgJAJgPAAQgHAAgJgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgJAAgFAHg");
	this.shape_40.setTransform(119.05,35.575);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_41.setTransform(113.2,32.65);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgPAmQgHgEgFgGQgDgGAAgHIANAAQABAHAEAEQAFAEAIAAQAIAAAFgDQAEgDAAgGQAAgFgEgDQgEgDgKgCQgKgCgGgDQgGgDgDgEQgDgEAAgGQAAgKAIgGQAIgHAMAAQAOAAAJAHQAHAGABAMIgOAAQAAgGgEgEQgGgEgHAAQgGAAgEADQgFADABAFQAAAFADADQAEADAKACQAKACAGADQAGACAEAFQADAEAAAGQAAALgJAGQgIAHgOAAQgIAAgIgDg");
	this.shape_42.setTransform(107.45,34.1);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_43.setTransform(100.325,32.425);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgZAeQgKgMAAgSIAAAAQAAgMAFgJQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAALgEAKQgFAIgIAGQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgIAAgOQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_44.setTransform(91.725,34.1);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgCAsQgEgFAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAEACADQACADAFAAIAHgBIAAALIgLABQgJAAgEgGg");
	this.shape_45.setTransform(74.275,33.2);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_46.setTransform(67.925,34.175);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_47.setTransform(60.525,32.425);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgQA0QgIgDgFgHIAHgIQAKALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgIAJgOAAQgOAAgIgLQgIgLAAgTQAAgSAIgLQAJgLAOAAQANAAAJAKIAAgIIAMAAIAABMQAAAPgJAJQgJAJgPAAQgIAAgIgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgIAAgHAHg");
	this.shape_48.setTransform(51.85,35.575);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AARAoIAAgzQAAgJgDgEQgEgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_49.setTransform(43.65,34.025);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIgBQgHAAgFAEQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_50.setTransform(35.425,34.1);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AgQA0QgIgDgFgHIAHgIQAKALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgIAJgOAAQgNAAgJgLQgIgLAAgTQAAgSAIgLQAJgLAOAAQANAAAJAKIAAgIIAMAAIAABMQABAPgKAJQgJAJgPAAQgIAAgIgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgJAAgFAHg");
	this.shape_51.setTransform(27,35.575);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AARAoIAAgzQAAgJgDgEQgEgEgIAAQgGAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_52.setTransform(18.8,34.025);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AgWAfQgLgLABgSIAAgCQgBgLAFgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAGAIQAIAHAJAAQAGAAAFgDQAFgDAEgFIAIAGQgKAQgTAAQgPAAgKgKgAgMgXQgGAGgBALIAnAAIAAgCQgBgJgFgGQgEgGgJAAQgHAAgGAGg");
	this.shape_53.setTransform(10.8,34.1);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_54.setTransform(0.175,34.025);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgQA0QgIgDgEgHIAGgIQAJALANAAQAJAAAGgGQAFgFAAgKIAAgHQgIAJgNAAQgPAAgIgLQgJgLAAgTQAAgSAJgLQAIgLAPAAQAOAAAHAKIABgIIANAAIAABMQgBAPgIAJQgKAJgPAAQgIAAgIgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgIAAgHAHg");
	this.shape_55.setTransform(250.6,13.575);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AASAoIAAgzQAAgJgFgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_56.setTransform(242.4,12.025);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_57.setTransform(234.175,12.1);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AgXA4IgFgBIAAgLIAEAAQAGAAAEgDQAEgDADgIIADgIIgdhMIAPAAIATA5IASg5IAPAAIggBaQgGATgQABg");
	this.shape_58.setTransform(226.525,13.7);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgKIAPAAIAAgUIAMAAIAAAUIAPAAIAAAKIgPAAIAAAwQAAAEACADQACADAFgBIAHgBIAAALIgLACQgJAAgEgFg");
	this.shape_59.setTransform(211.025,11.2);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgEACgCQACgCADAAQAEAAACACQACACAAAEQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_60.setTransform(207,10.65);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_61.setTransform(203.325,10.425);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_62.setTransform(197.375,12.175);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_63.setTransform(189.975,10.425);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_64.setTransform(172.15,12.025);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_65.setTransform(163.925,12.1);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_66.setTransform(155.775,12.1);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_67.setTransform(148.425,10.425);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_68.setTransform(139.975,12.175);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_69.setTransform(129.275,12.025);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_70.setTransform(120.55,12.025);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2C3E50").s().p("AgWAeQgKgKAAgSIAAgCQgBgLAFgJQAEgJAJgGQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAAMAHAGQAGAIAKAAQAGAAAFgDQAFgDAEgFIAJAHQgLAPgTAAQgQAAgJgLgAgMgXQgGAGgBAKIAnAAIAAAAQgBgKgFgHQgEgFgJAAQgHAAgGAGg");
	this.shape_71.setTransform(113.75,12.1);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2C3E50").s().p("AggA3IAAhsIAMAAIABAIQAIgKAOABQAOAAAIAKQAIALAAATIAAACQAAAQgIAMQgIALgOgBQgOABgIgJIAAAlgAgTghIAAAmQAGAKANABQAIgBAGgHQAGgIAAgPQAAgMgGgJQgGgHgIAAQgNAAgGAKg");
	this.shape_72.setTransform(105.675,13.55);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#2C3E50").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_73.setTransform(87.875,12.1);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#2C3E50").s().p("AgYAtQgIgLgBgSIAAgBQABgRAIgLQAIgLAOAAQANAAAJAJIAAgpIANAAIAABvIgMAAIgBgIQgIAKgOAAQgNAAgJgMgAgOgFQgFAGAAAQQAAANAFAIQAGAHAJAAQANAAAGgLIAAgjQgGgLgNAAQgJgBgGAIg");
	this.shape_74.setTransform(79.4,10.5);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#2C3E50").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_75.setTransform(71.275,12.1);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#2C3E50").s().p("AggA3IAAhsIAMAAIABAIQAIgKAOABQAOAAAIAKQAIALAAATIAAACQAAAQgIAMQgIALgOgBQgOABgIgJIAAAlgAgTghIAAAmQAGAKANABQAIgBAGgHQAGgIAAgPQAAgMgGgJQgGgHgIAAQgNAAgGAKg");
	this.shape_76.setTransform(63.175,13.55);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#2C3E50").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgKIAPAAIAAgUIAMAAIAAAUIAPAAIAAAKIgPAAIAAAwQAAAEACADQACADAFgBIAHgBIAAALIgLACQgJAAgEgFg");
	this.shape_77.setTransform(46.825,11.2);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#2C3E50").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_78.setTransform(40.525,12.1);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#2C3E50").s().p("AggA3IAAhsIAMAAIABAIQAIgKAOABQAOAAAIAKQAIALAAATIAAACQAAAQgIAMQgIALgOgBQgOABgIgJIAAAlgAgTghIAAAmQAGAKANABQAIgBAGgHQAGgIAAgPQAAgMgGgJQgGgHgIAAQgNAAgGAKg");
	this.shape_79.setTransform(32.425,13.55);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#2C3E50").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_80.setTransform(23.975,12.1);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#2C3E50").s().p("AgYAtQgIgLgBgSIAAgBQABgRAIgLQAIgLAOAAQAOAAAIAJIAAgpIANAAIAABvIgMAAIgBgIQgIAKgOAAQgNAAgJgMgAgOgFQgFAGAAAQQAAANAFAIQAGAHAJAAQANAAAGgLIAAgjQgGgLgNAAQgJgBgGAIg");
	this.shape_81.setTransform(15.5,10.5);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_82.setTransform(9.3,12.025);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#2C3E50").s().p("AgWAeQgKgKAAgSIAAgCQgBgLAFgJQAFgJAHgGQAIgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAAMAHAGQAGAIAKAAQAHAAAEgDQAFgDAEgFIAJAHQgLAPgTAAQgQAAgJgLgAgMgXQgFAGgCAKIAnAAIAAAAQgBgKgEgHQgFgFgJAAQgHAAgGAGg");
	this.shape_83.setTransform(2.5,12.1);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#2C3E50").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgKIAPAAIAAgUIAMAAIAAAUIAPAAIAAAKIgPAAIAAAwQAAAEACADQACADAFgBIAHgBIAAALIgLACQgJAAgEgFg");
	this.shape_84.setTransform(-4.175,11.2);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#2C3E50").s().p("AgQA0QgIgDgEgHIAGgIQAJALANAAQAJAAAGgGQAFgFAAgKIAAgHQgIAJgNAAQgPAAgIgLQgJgLAAgTQAAgSAJgLQAIgLAPAAQAOAAAHAKIABgIIANAAIAABMQgBAPgIAJQgKAJgPAAQgIAAgIgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgIAAgHAHg");
	this.shape_85.setTransform(250.6,-8.425);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#2C3E50").s().p("AASAoIAAgzQAAgJgFgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_86.setTransform(242.4,-9.975);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#2C3E50").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_87.setTransform(234.175,-9.9);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#2C3E50").s().p("AgXA3IgFgBIAAgLIAEAAQAGABAEgDQAEgDADgHIADgIIgdhOIAPAAIATA7IASg7IAPAAIggBaQgGAVgQgBg");
	this.shape_88.setTransform(226.525,-8.3);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_89.setTransform(197.4,-9.975);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#2C3E50").s().p("AgWAfQgKgLAAgSIAAgCQgBgLAFgKQAFgJAHgFQAIgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAHAHQAGAIAKAAQAHAAAEgDQAFgDAEgFIAJAGQgLAQgTAAQgQAAgJgKgAgMgXQgFAGgCALIAnAAIAAgBQgBgLgEgFQgFgGgJAAQgHAAgGAGg");
	this.shape_90.setTransform(190.6,-9.9);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_91.setTransform(184.725,-11.575);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCADgEgBQgDABgCgDg");
	this.shape_92.setTransform(181.1,-11.35);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#2C3E50").s().p("AggA4IAAhtIAMAAIABAJQAIgLAOAAQAOAAAIALQAIALAAATIAAABQAAASgIAKQgIAMgOAAQgOgBgIgIIAAAmgAgTggIAAAkQAGALANAAQAIAAAGgIQAGgHAAgOQAAgOgGgHQgGgIgIAAQgNAAgGALg");
	this.shape_93.setTransform(175.225,-8.45);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#2C3E50").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_94.setTransform(166.775,-9.9);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#2C3E50").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_95.setTransform(159.425,-11.575);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#2C3E50").s().p("AASA4IAAg0QAAgIgFgEQgDgEgIAAQgGAAgFAEQgFADgCAFIAAA4IgOAAIAAhvIAOAAIAAArQAIgLANAAQAaAAAAAbIAAA0g");
	this.shape_96.setTransform(127.55,-11.575);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_97.setTransform(119.275,-9.825);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_98.setTransform(113.325,-11.575);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_99.setTransform(107.375,-9.825);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#2C3E50").s().p("AgUAvIAAAJIgMAAIAAhwIANAAIAAAqQAIgKAOAAQAOAAAIAKQAIAMAAARIAAACQAAASgIALQgIALgOAAQgPAAgIgKgAgTAAIAAAhQAGANANAAQAJAAAGgIQAFgHAAgQQAAgOgFgGQgGgIgJAAQgNABgGAMg");
	this.shape_100.setTransform(99.25,-11.5);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_101.setTransform(88.275,-9.975);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#2C3E50").s().p("AgWAfQgLgLABgSIAAgCQgBgLAFgKQAEgJAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAHAHQAHAIAJAAQAGAAAFgDQAFgDAEgFIAIAGQgKAQgTAAQgPAAgKgKgAgMgXQgGAGgBALIAnAAIAAgBQgBgLgFgFQgEgGgJAAQgHAAgGAGg");
	this.shape_102.setTransform(77.85,-9.9);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#2C3E50").s().p("AggA4IAAhtIAMAAIABAJQAIgLAOAAQAOAAAIALQAIALAAATIAAABQAAASgIAKQgIAMgOAAQgOgBgIgIIAAAmgAgTggIAAAkQAGALANAAQAIAAAGgIQAGgHAAgOQAAgOgGgHQgGgIgIAAQgNAAgGALg");
	this.shape_103.setTransform(69.775,-8.45);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCADgEgBQgDABgCgDg");
	this.shape_104.setTransform(40.15,-11.35);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_105.setTransform(34.175,-9.825);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_106.setTransform(28.225,-11.575);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#2C3E50").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_107.setTransform(22.325,-9.9);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_108.setTransform(16.425,-11.575);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#2C3E50").s().p("AgXAfQgJgLgBgSIAAgCQABgLAEgKQAFgJAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAGAHQAIAIAIAAQAHAAAGgDQAFgDADgFIAJAGQgKAQgVAAQgOAAgLgKgAgMgXQgFAGgBALIAmAAIAAgBQAAgLgFgFQgGgGgIAAQgHAAgGAGg");
	this.shape_109.setTransform(10.75,-9.9);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#2C3E50").s().p("AAnA1IAAgpIACgsIgjBVIgKAAIgjhVIABAsIAAApIgOAAIAAhpIASAAIAiBWIAjhWIASAAIAABpg");
	this.shape_110.setTransform(0.15,-11.275);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.29,0,0,1.824,-160.6,-79.3)).s().p("A5FMZIAA4xMAyLAAAIAAYxg");
	this.shape_111.setTransform(124.325,25.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// layout
	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("rgba(0,0,0,0.004)").s().p("A5MZTMAAAgylMAyZAAAMAAAAylg");
	this.shape_112.setTransform(124.3,78.475);

	this.timeline.addTween(cjs.Tween.get(this.shape_112).wait(1));

	// Layer_3
	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("rgba(0,0,0,0.227)").s().p("A2RH0IAAvnMAsjAAAIAAPng");
	this.shape_113.setTransform(104.45,37.675);

	this.timeline.addTween(cjs.Tween.get(this.shape_113).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-38.1,-83.4,323.70000000000005,323.8);


(lib.drop3G3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgUArIAAhTIAPAAIAAAJQAGgLANAAIAHABIAAANIgIAAQgNAAgFAMIAAA7g");
	this.shape.setTransform(144.55,150);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgHAAgFAEQgGAEAAAFIgOAAQAAgGAEgGQAEgGAIgDQAIgEAIAAQAPAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgMAAQgNAAgIgHgAgUARQABAHAEADQAEAEAIAAQAFAAAGgDQAHgEACgFIAAgSIgLAAQgaAAAAAQg");
	this.shape_1.setTransform(137.05,150.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgZAkQgHgJAAgPIAAg2IAOAAIAAA1QAAAUAQAAQAQAAAFgMIAAg9IAOAAIAABTIgNAAIgBgIQgIAKgPAAQgOAAgHgHg");
	this.shape_2.setTransform(128.275,150.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgGA8IAAh3IANAAIAAB3g");
	this.shape_3.setTransform(121.925,148.3);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_4.setTransform(115.825,150.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AASA8IgdgnIgJAKIAAAdIgOAAIAAh3IAOAAIAABIIAIgJIAZgbIASAAIggAiIAkAxg");
	this.shape_5.setTransform(108,148.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgFQgFgEgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_6.setTransform(95.025,150);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQgBgHgEgFQgFgEgIAAQgHAAgGAEQgEAEAAAFIgQAAQAAgGAGgGQADgGAIgDQAIgEAJAAQAOAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgBgJQgLALgNAAQgMAAgIgHgAgTARQgBAHAFADQAFAEAGAAQAGAAAHgDQAGgEADgFIAAgSIgMAAQgZAAAAAQg");
	this.shape_7.setTransform(86.25,150.075);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgUArIAAhTIAPAAIAAAJQAGgLANAAIAHABIAAANIgIAAQgNAAgFAMIAAA7g");
	this.shape_8.setTransform(79.65,150);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgbAgQgKgMgBgUIAAAAQAAgMAGgKQAEgKAJgFQAJgGAKAAQARAAALAMQALAMAAATIAAABQAAAMgFAKQgFAKgIAFQgJAGgMAAQgQAAgLgMgAgRgWQgGAIAAAPQAAAOAGAJQAHAIAKAAQALAAAGgJQAHgIAAgPQAAgOgHgIQgGgJgLAAQgJAAgIAJg");
	this.shape_9.setTransform(71.9,150.075);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgCAvQgEgFAAgLIAAg0IgQAAIAAgLIAQAAIAAgUIANAAIAAAUIAQAAIAAALIgQAAIAAA0QAAAFACACQACADAFAAIAHgBIAAAMQgGABgFAAQgJAAgFgGg");
	this.shape_10.setTransform(64.45,149.125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgbAgQgKgMgBgUIAAAAQAAgMAGgKQAEgKAJgFQAJgGAKAAQARAAALAMQALAMAAATIAAABQAAAMgFAKQgFAKgIAFQgJAGgMAAQgQAAgLgMgAgRgWQgGAIAAAPQAAAOAGAJQAHAIAKAAQALAAAGgJQAHgIAAgPQAAgOgHgIQgGgJgLAAQgJAAgIAJg");
	this.shape_11.setTransform(57.5,150.075);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AASA8IgcgnIgJAKIAAAdIgPAAIAAh3IAPAAIAABIIAHgJIAZgbIASAAIggAiIAkAxg");
	this.shape_12.setTransform(49.45,148.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgCAvQgEgFAAgLIAAg0IgQAAIAAgLIAQAAIAAgUIANAAIAAAUIAQAAIAAALIgQAAIAAA0QAAAFACACQACADAGAAIAGgBIAAAMQgGABgFAAQgJAAgFgGg");
	this.shape_13.setTransform(38,149.125);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgHAAgFAEQgGAEAAAFIgOAAQAAgGAEgGQAEgGAIgDQAIgEAIAAQAPAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgMAAQgNAAgIgHgAgTARQAAAHAEADQAEAEAIAAQAFAAAGgDQAHgEACgFIAAgSIgLAAQgaAAABAQg");
	this.shape_14.setTransform(31.3,150.075);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgjA7IAAh0IANAAIABAKQAJgLAPAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgPAAgIgJIAAAogAgUgiIAAAnQAGAMANAAQAKAAAGgJQAGgIAAgPQAAgPgGgIQgGgIgKAAQgNAAgGAMg");
	this.shape_15.setTransform(22.625,151.625);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AAtArIAAg3QAAgJgEgFQgFgEgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg2QAAgTgSAAQgPAAgFAMIAAA9IgOAAIAAhTIANAAIABAJQAJgLAQAAQARAAAGAOQAEgHAHgDQAHgEAJAAQAcAAAAAeIAAA3g");
	this.shape_16.setTransform(10.975,150);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_17.setTransform(-0.225,150.075);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgCAvQgEgFAAgLIAAg0IgQAAIAAgLIAQAAIAAgUIANAAIAAAUIAQAAIAAALIgQAAIAAA0QAAAFACACQACADAGAAIAGgBIAAAMQgGABgFAAQgJAAgFgGg");
	this.shape_18.setTransform(-7.45,149.125);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgdA+IAvh7IAMAAIgvB7g");
	this.shape_19.setTransform(247.55,125.925);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgGA6IAAhUIANAAIAABUgAgFgqQgCgDgBgDQABgEACgCQACgDADAAQAEAAACADQACACAAAEQAAADgCADQgCACgEAAQgDAAgCgCg");
	this.shape_20.setTransform(242.45,125.325);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgUArIAAhTIAOAAIAAAJQAHgLANAAIAHABIAAANIgIAAQgNAAgFAMIAAA7g");
	this.shape_21.setTransform(238.25,126.8);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgaAgQgMgMAAgUIAAAAQABgMAFgKQAEgKAJgFQAJgGAKAAQARAAALAMQALAMAAATIAAABQgBAMgEAKQgFAKgIAFQgKAGgLAAQgQAAgKgMgAgQgWQgHAIAAAPQAAAOAHAJQAGAIAKAAQALAAAHgJQAGgIAAgPQAAgOgGgIQgHgJgLAAQgKAAgGAJg");
	this.shape_22.setTransform(230.5,126.875);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgjA7IAAh0IANAAIABAKQAJgLAPAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgPAAgIgJIAAAogAgUgiIAAAnQAGAMANAAQAKAAAGgJQAGgIAAgPQAAgPgGgIQgGgIgKAAQgNAAgGAMg");
	this.shape_23.setTransform(221.625,128.425);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgaAgQgLgMAAgUIAAAAQAAgMAEgKQAGgKAIgFQAJgGAKAAQARAAALAMQAKAMAAATIAAABQABAMgFAKQgFAKgJAFQgIAGgMAAQgQAAgKgMgAgRgWQgGAIAAAPQAAAOAGAJQAHAIAKAAQALAAAHgJQAGgIAAgPQAAgOgGgIQgHgJgLAAQgJAAgIAJg");
	this.shape_24.setTransform(212.35,126.875);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgGA6IAAhUIANAAIAABUgAgGgqQgBgDAAgDQAAgEABgCQADgDADAAQAFAAABADQADACAAAEQAAADgDADQgBACgFAAQgDAAgDgCg");
	this.shape_25.setTransform(205.85,125.325);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgaAxQgJgMAAgUIAAgBQAAgSAJgMQAKgMAPAAQANAAAJAKIAAgsIAPAAIAAB3IgOAAIAAgJQgJALgPAAQgOAAgKgMgAgOgFQgGAHAAAQQAAAOAGAIQAGAJAJAAQAOAAAGgNIAAgmQgGgMgOAAQgJAAgGAJg");
	this.shape_26.setTransform(199.225,125.175);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgGA6IAAhUIANAAIAABUgAgFgqQgCgDgBgDQABgEACgCQACgDADAAQAEAAACADQACACAAAEQAAADgCADQgCACgEAAQgDAAgCgCg");
	this.shape_27.setTransform(192.95,125.325);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgUArIAAhTIAOAAIAAAJQAHgLANAAIAHABIAAANIgIAAQgNAAgFAMIAAA7g");
	this.shape_28.setTransform(188.75,126.8);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgLA9IAAhJIgOAAIAAgLIAOAAIAAgIQAAgOAHgHQAGgIAOAAIAKABIgBAMIgIgBQgHAAgEAFQgEAEAAAHIAAAJIASAAIAAALIgSAAIAABJg");
	this.shape_29.setTransform(183.075,125.025);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_30.setTransform(175.875,126.875);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgFQgFgEgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_31.setTransform(167.125,126.8);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgHA6IAAhUIAOAAIAABUgAgGgqQgCgDAAgDQAAgEACgCQADgDADAAQAFAAACADQABACAAAEQAAADgBADQgCACgFAAQgDAAgDgCg");
	this.shape_32.setTransform(155.4,125.325);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgZAjQgHgIAAgPIAAg2IAOAAIAAA1QAAAUAQAAQAQAAAFgNIAAg8IAOAAIAABUIgNAAIgBgJQgIAKgPAAQgOAAgHgIg");
	this.shape_33.setTransform(149.025,126.95);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgGA8IAAh3IANAAIAAB3g");
	this.shape_34.setTransform(142.675,125.1);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAOAAIAAgHQAAgHgEgFQgEgEgJAAQgIAAgEAEQgGAEABAFIgQAAQABgGAFgGQAEgGAHgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgNAAQgMAAgIgHgAgTARQgBAHAFADQAEAEAIAAQAGAAAFgDQAGgEADgFIAAgSIgLAAQgaAAABAQg");
	this.shape_35.setTransform(136.4,126.875);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgGA8IAAh3IANAAIAAB3g");
	this.shape_36.setTransform(130.075,125.1);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_37.setTransform(123.975,126.875);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AAtArIAAg3QAAgJgEgFQgFgEgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg2QAAgTgSAAQgPAAgFAMIAAA9IgOAAIAAhTIANAAIABAJQAJgLAQAAQARAAAGANQAEgFAHgFQAHgDAJAAQAcAAAAAeIAAA3g");
	this.shape_38.setTransform(112.675,126.8);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgTArIAAhTIANAAIAAAJQAHgLANAAIAGABIAAANIgHAAQgNAAgFAMIAAA7g");
	this.shape_39.setTransform(98.05,126.8);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIAOAAIAAgHQAAgHgFgFQgFgEgIAAQgIAAgFAEQgEAEAAAFIgPAAQAAgGAEgGQAFgGAIgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgCgJQgKALgNAAQgNAAgIgHgAgUARQAAAHAFADQAFAEAGAAQAHAAAGgDQAFgEAEgFIAAgSIgMAAQgaAAAAAQg");
	this.shape_40.setTransform(90.55,126.875);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgZAjQgHgIAAgPIAAg2IAOAAIAAA1QAAAUAQAAQAQAAAFgNIAAg8IAOAAIAABUIgNAAIgBgJQgIAKgPAAQgOAAgHgIg");
	this.shape_41.setTransform(81.775,126.95);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgGA8IAAh3IANAAIAAB3g");
	this.shape_42.setTransform(75.425,125.1);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgFQgFgEgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_43.setTransform(63.725,126.8);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQgBgHgEgFQgEgEgJAAQgIAAgEAEQgGAEAAAFIgPAAQABgGAFgGQAEgGAHgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgBgJQgLALgNAAQgMAAgIgHgAgTARQgBAHAFADQAEAEAIAAQAGAAAFgDQAGgEAEgFIAAgSIgMAAQgaAAABAQg");
	this.shape_44.setTransform(54.95,126.875);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgRA4QgJgEgEgHIAHgJQAJAMAOAAQAJAAAGgGQAGgGAAgLIAAgHQgJAKgOAAQgOAAgKgMQgJgMAAgUQAAgTAJgMQAKgMAPAAQAOAAAJALIAAgJIAOAAIAABRQAAARgKAJQgKAKgQAAQgIAAgJgEgAgOgmQgGAIAAAQQAAAOAGAHQAGAJAJAAQAOAAAGgNIAAglQgHgNgNAAQgJAAgGAJg");
	this.shape_45.setTransform(45.925,128.475);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgFQgFgEgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_46.setTransform(37.175,126.8);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AgZAjQgHgIAAgPIAAg2IAOAAIAAA1QAAAUAQAAQAQAAAFgNIAAg8IAOAAIAABUIgNAAIgBgJQgIAKgPAAQgOAAgHgIg");
	this.shape_47.setTransform(28.325,126.95);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AASA8IgdgnIgJAKIAAAdIgOAAIAAh3IAOAAIAABIIAIgJIAZgbIASAAIggAiIAkAxg");
	this.shape_48.setTransform(20.45,125.1);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AgRA4QgJgEgEgHIAHgJQAJAMAOAAQAJAAAGgGQAGgGAAgLIAAgHQgJAKgOAAQgOAAgKgMQgJgMAAgUQAAgTAJgMQAKgMAPAAQAOAAAJALIAAgJIAOAAIAABRQAAARgKAJQgKAKgQAAQgIAAgJgEgAgOgmQgGAIAAAQQAAAOAGAHQAGAJAJAAQAOAAAGgNIAAglQgHgNgNAAQgJAAgGAJg");
	this.shape_49.setTransform(11.175,128.475);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgFQgFgEgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_50.setTransform(2.425,126.8);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AgGA6IAAhUIANAAIAABUgAgFgqQgCgDAAgDQAAgEACgCQACgDADAAQAEAAACADQACACABAEQgBADgCADQgCACgEAAQgDAAgCgCg");
	this.shape_51.setTransform(-3.95,125.325);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AgGA8IAAh3IANAAIAAB3g");
	this.shape_52.setTransform(-7.875,125.1);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_53.setTransform(246.625,103.6);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgHAAgFAEQgGAEAAAFIgOAAQAAgGAEgGQAEgGAIgDQAIgEAIAAQAPAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgMAAQgNAAgIgHgAgTARQAAAHAEADQAEAEAIAAQAFAAAGgDQAHgEACgFIAAgSIgLAAQgaAAABAQg");
	this.shape_54.setTransform(237.85,103.675);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgRA4QgJgEgEgHIAHgJQAJAMAOAAQAJAAAGgGQAGgGAAgLIAAgHQgJAKgOAAQgOAAgKgMQgJgMAAgUQAAgTAJgMQAKgMAPAAQAOAAAJALIAAgJIAOAAIAABRQAAARgKAJQgKAKgQAAQgIAAgJgEgAgOgmQgGAIAAAQQAAAOAGAHQAGAJAJAAQAOAAAGgNIAAglQgHgNgNAAQgJAAgGAJg");
	this.shape_55.setTransform(228.825,105.275);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_56.setTransform(220.075,103.6);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_57.setTransform(211.475,103.675);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AgaAxQgJgMAAgUIAAgBQAAgSAJgMQAKgMAPAAQANAAAJAKIAAgsIAPAAIAAB3IgOAAIAAgJQgJALgPAAQgOAAgKgMgAgOgFQgGAHAAAQQAAAOAGAIQAGAJAJAAQAOAAAGgNIAAgmQgGgMgOAAQgJAAgGAJg");
	this.shape_58.setTransform(202.475,101.975);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_59.setTransform(171.825,103.6);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQAAgHgEgFQgEgEgJAAQgHAAgFAEQgGAEAAAFIgPAAQABgGAEgGQAFgGAHgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgNAAQgMAAgIgHgAgTARQAAAHAEADQAEAEAIAAQAGAAAFgDQAHgEACgFIAAgSIgLAAQgaAAABAQg");
	this.shape_60.setTransform(163.05,103.675);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgRA4QgJgEgEgHIAHgJQAJAMAOAAQAJAAAGgGQAGgGAAgLIAAgHQgJAKgOAAQgOAAgKgMQgJgMAAgUQAAgTAJgMQAKgMAPAAQAOAAAJALIAAgJIAOAAIAABRQAAARgKAJQgKAKgQAAQgIAAgJgEgAgOgmQgGAIAAAQQAAAOAGAHQAGAJAJAAQAOAAAGgNIAAglQgHgNgNAAQgJAAgGAJg");
	this.shape_61.setTransform(154.025,105.275);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_62.setTransform(145.275,103.6);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AgZAjQgHgHAAgQIAAg2IAOAAIAAA2QAAATAQAAQAQAAAFgNIAAg8IAOAAIAABUIgNAAIgBgJQgIAKgPAAQgOAAgHgIg");
	this.shape_63.setTransform(136.425,103.75);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AgVAxIgBAKIgNAAIAAh3IAPAAIAAAtQAIgLAPAAQAPAAAJAMQAJALAAAUIAAABQAAATgJAMQgJAMgPAAQgPAAgJgMgAgUAAIAAAjQAGAOAOAAQAKAAAGgIQAFgJAAgQQAAgOgFgIQgGgIgKAAQgOAAgGAOg");
	this.shape_64.setTransform(127.725,101.975);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AgZAjQgHgHAAgQIAAg2IAOAAIAAA2QAAATAQAAQAQAAAFgNIAAg8IAOAAIAABUIgNAAIgBgJQgIAKgPAAQgOAAgHgIg");
	this.shape_65.setTransform(118.625,103.75);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AATA8IAAg4QAAgIgEgEQgFgFgIAAQgGAAgGAEQgFADgDAGIAAA8IgOAAIAAh3IAOAAIAAAtQAKgLAOAAQAbAAAAAdIAAA4g");
	this.shape_66.setTransform(109.875,101.9);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AgTArIAAhUIANAAIAAAKQAHgLANAAIAGABIAAANIgHAAQgNAAgFAMIAAA7g");
	this.shape_67.setTransform(103.2,103.6);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_68.setTransform(95.875,103.675);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2C3E50").s().p("AgVAxIgBAKIgNAAIAAh3IAPAAIAAAtQAIgLAPAAQAPAAAJAMQAJALAAAUIAAABQAAATgJAMQgJAMgPAAQgPAAgJgMgAgUAAIAAAjQAGAOAOAAQAKAAAGgIQAFgJAAgQQAAgOgFgIQgGgIgKAAQgOAAgGAOg");
	this.shape_69.setTransform(87.225,101.975);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2C3E50").s().p("AAtArIAAg3QAAgJgEgEQgFgFgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg3QAAgSgSAAQgPAAgFANIAAA8IgOAAIAAhUIANAAIABAKQAJgLAQAAQARAAAGANQAEgFAHgFQAHgDAJAAQAcAAAAAdIAAA4g");
	this.shape_70.setTransform(53.675,103.6);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2C3E50").s().p("AgZAjQgHgHAAgQIAAg2IAOAAIAAA2QAAATAQAAQAQAAAFgNIAAg8IAOAAIAABUIgNAAIgBgJQgIAKgPAAQgOAAgHgIg");
	this.shape_71.setTransform(42.225,103.75);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2C3E50").s().p("AgGA6IAAhUIANAAIAABUgAgFgqQgCgDgBgDQABgEACgCQACgDADAAQAEAAACADQACACAAAEQAAADgCADQgCACgEAAQgDAAgCgCg");
	this.shape_72.setTransform(35.9,102.125);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#2C3E50").s().p("AgaAxQgJgMAAgUIAAgBQAAgSAJgMQAKgMAPAAQANAAAJAKIAAgsIAPAAIAAB3IgOAAIAAgJQgJALgPAAQgOAAgKgMgAgOgFQgGAHAAAQQAAAOAGAIQAGAJAJAAQAOAAAGgNIAAgmQgGgMgOAAQgJAAgGAJg");
	this.shape_73.setTransform(29.275,101.975);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#2C3E50").s().p("AgHA6IAAhUIAOAAIAABUgAgGgqQgCgDAAgDQAAgEACgCQADgDADAAQAFAAACADQABACABAEQgBADgBADQgCACgFAAQgDAAgDgCg");
	this.shape_74.setTransform(23,102.125);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#2C3E50").s().p("AgUArIAAhUIAPAAIAAAKQAGgLANAAIAHABIAAANIgIAAQgNAAgFAMIAAA7g");
	this.shape_75.setTransform(18.8,103.6);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#2C3E50").s().p("AgLA9IAAhJIgOAAIAAgLIAOAAIAAgIQAAgOAHgHQAGgIAOAAIAKABIgBAMIgIgBQgHAAgEAFQgEAEAAAHIAAAJIASAAIAAALIgSAAIAABJg");
	this.shape_76.setTransform(13.125,101.825);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_77.setTransform(5.925,103.675);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#2C3E50").s().p("AAdA5Ig4hXIAABXIgQAAIAAhxIAQAAIA4BXIAAhXIAPAAIAABxg");
	this.shape_78.setTransform(-4.125,102.225);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#2C3E50").s().p("AgGAGQgCgCAAgEQAAgDACgCQACgDAEAAQAEAAADADQACACAAADQAAAEgCACQgDADgEAAQgEAAgCgDg");
	this.shape_79.setTransform(248.825,83.925);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#2C3E50").s().p("AATA8IAAg4QAAgIgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAFIAAA8IgOAAIAAh3IAOAAIAAAtQAKgLAOAAQAbAAAAAdIAAA4g");
	this.shape_80.setTransform(242.425,78.7);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQAAgHgFgFQgFgEgIAAQgIAAgFAEQgEAEAAAFIgPAAQAAgGAEgGQAFgGAIgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgCgJQgKALgNAAQgNAAgIgHgAgUARQAAAHAFADQAFAEAGAAQAHAAAGgDQAFgEAEgFIAAgSIgMAAQgaAAAAAQg");
	this.shape_81.setTransform(233.65,80.475);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#2C3E50").s().p("AgUArIAAhUIAPAAIAAAKQAGgLANAAIAHABIAAAOIgIgBQgNAAgFAMIAAA7g");
	this.shape_82.setTransform(227.05,80.4);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQgBgHgEgFQgEgEgJAAQgIAAgFAEQgEAEAAAFIgQAAQAAgGAGgGQAEgGAHgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgBgJQgLALgNAAQgMAAgIgHgAgTARQgBAHAFADQAFAEAGAAQAGAAAHgDQAFgEAEgFIAAgSIgMAAQgZAAAAAQg");
	this.shape_83.setTransform(219.55,80.475);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#2C3E50").s().p("AgaAxQgJgMAAgUIAAgBQAAgSAJgMQAKgMAPAAQANAAAJAKIAAgsIAPAAIAAB3IgOAAIAAgJQgJALgPAAQgOAAgKgMgAgOgFQgGAHAAAQQAAAOAGAIQAGAJAJAAQAOAAAGgNIAAgmQgGgMgOAAQgJAAgGAJg");
	this.shape_84.setTransform(210.525,78.775);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#2C3E50").s().p("AgUArIAAhUIAPAAIAAAKQAGgLANAAIAHABIAAAOIgIgBQgNAAgFAMIAAA7g");
	this.shape_85.setTransform(196.65,80.4);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_86.setTransform(189.325,80.475);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#2C3E50").s().p("AgGA8IAAh3IANAAIAAB3g");
	this.shape_87.setTransform(183.025,78.7);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#2C3E50").s().p("AgHA6IAAhUIAOAAIAABUgAgGgqQgCgDAAgDQAAgEACgCQADgDADAAQAFAAACADQABACAAAEQAAADgBADQgCACgFAAQgDAAgDgCg");
	this.shape_88.setTransform(179.15,78.925);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#2C3E50").s().p("AgjA7IAAh0IANAAIABAKQAJgLAPAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgPAAgIgJIAAAogAgUgiIAAAnQAGAMANAAQAKAAAGgJQAGgIAAgPQAAgPgGgIQgGgIgKAAQgNAAgGAMg");
	this.shape_89.setTransform(172.875,82.025);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAOAAIAAgHQAAgHgEgFQgEgEgJAAQgIAAgEAEQgGAEABAFIgQAAQABgGAFgGQAEgGAHgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgNAAQgMAAgIgHgAgTARQgBAHAFADQAEAEAIAAQAGAAAFgDQAGgEADgFIAAgSIgLAAQgaAAABAQg");
	this.shape_90.setTransform(163.85,80.475);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#2C3E50").s().p("AASA8IgcgnIgJAJIAAAeIgPAAIAAh3IAPAAIAABHIAHgJIAZgbIASAAIggAjIAkAxg");
	this.shape_91.setTransform(156,78.7);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_92.setTransform(139.675,80.4);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQgBgHgEgFQgEgEgJAAQgIAAgFAEQgEAEAAAFIgQAAQAAgGAGgGQAEgGAHgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgBgJQgLALgNAAQgMAAgIgHgAgTARQgBAHAFADQAFAEAGAAQAGAAAHgDQAFgEAEgFIAAgSIgMAAQgZAAAAAQg");
	this.shape_93.setTransform(130.9,80.475);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#2C3E50").s().p("AgRA4QgJgEgEgHIAHgJQAJAMAOAAQAJAAAGgGQAGgGAAgLIAAgHQgJAKgOAAQgOAAgKgMQgJgMAAgUQAAgTAJgMQAKgMAPAAQAOAAAJALIAAgJIAOAAIAABRQAAARgKAJQgKAKgQAAQgIAAgJgEgAgOgmQgGAIAAAQQAAAOAGAHQAGAJAJAAQAOAAAGgNIAAglQgHgNgNAAQgJAAgGAJg");
	this.shape_94.setTransform(121.875,82.075);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_95.setTransform(113.125,80.4);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_96.setTransform(104.525,80.475);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#2C3E50").s().p("AgaAxQgJgMAAgUIAAgBQAAgSAJgMQAKgMAPAAQANAAAJAKIAAgsIAPAAIAAB3IgOAAIAAgJQgJALgPAAQgOAAgKgMgAgOgFQgGAHAAAQQAAAOAGAIQAGAJAJAAQAOAAAGgNIAAgmQgGgMgOAAQgJAAgGAJg");
	this.shape_97.setTransform(95.525,78.775);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_98.setTransform(79.475,80.4);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAOAAIAAgHQAAgHgEgFQgEgEgJAAQgIAAgEAEQgGAEAAAFIgPAAQABgGAFgGQAEgGAHgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgNAAQgMAAgIgHgAgTARQgBAHAFADQAEAEAIAAQAGAAAFgDQAGgEADgFIAAgSIgLAAQgaAAABAQg");
	this.shape_99.setTransform(70.7,80.475);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#2C3E50").s().p("AgRA4QgJgEgEgHIAHgJQAJAMAOAAQAJAAAGgGQAGgGAAgLIAAgHQgJAKgOAAQgOAAgKgMQgJgMAAgUQAAgTAJgMQAKgMAPAAQAOAAAJALIAAgJIAOAAIAABRQAAARgKAJQgKAKgQAAQgIAAgJgEgAgOgmQgGAIAAAQQAAAOAGAHQAGAJAJAAQAOAAAGgNIAAglQgHgNgNAAQgJAAgGAJg");
	this.shape_100.setTransform(61.675,82.075);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_101.setTransform(52.925,80.4);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#2C3E50").s().p("AgZAjQgHgIAAgPIAAg2IAOAAIAAA2QAAATAQAAQAQAAAFgMIAAg9IAOAAIAABTIgNAAIgBgIQgIAKgPAAQgOAAgHgIg");
	this.shape_102.setTransform(44.075,80.55);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#2C3E50").s().p("AgVAxIgBAKIgNAAIAAh3IAPAAIAAAtQAIgLAPAAQAPAAAJAMQAJALAAAUIAAABQAAATgJAMQgJAMgPAAQgPAAgJgMgAgUAAIAAAjQAGAOAOAAQAKAAAGgIQAFgJAAgQQAAgOgFgIQgGgIgKAAQgOAAgGAOg");
	this.shape_103.setTransform(35.375,78.775);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#2C3E50").s().p("AgZAjQgHgIAAgPIAAg2IAOAAIAAA2QAAATAQAAQAQAAAFgMIAAg9IAOAAIAABTIgNAAIgBgIQgIAKgPAAQgOAAgHgIg");
	this.shape_104.setTransform(26.275,80.55);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#2C3E50").s().p("AATA8IAAg4QAAgIgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAFIAAA8IgOAAIAAh3IAOAAIAAAtQAKgLAOAAQAbAAAAAdIAAA4g");
	this.shape_105.setTransform(17.525,78.7);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#2C3E50").s().p("AgTArIAAhUIANAAIAAAKQAHgLANAAIAGABIAAAOIgHgBQgNAAgFAMIAAA7g");
	this.shape_106.setTransform(10.85,80.4);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_107.setTransform(3.525,80.475);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#2C3E50").s().p("AgVAxIgBAKIgNAAIAAh3IAPAAIAAAtQAIgLAPAAQAPAAAJAMQAJALAAAUIAAABQAAATgJAMQgJAMgPAAQgPAAgJgMgAgUAAIAAAjQAGAOAOAAQAKAAAGgIQAFgJAAgQQAAgOgFgIQgGgIgKAAQgOAAgGAOg");
	this.shape_108.setTransform(-5.125,78.775);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#2C3E50").s().p("AgRA4QgJgEgEgHIAHgJQAJAMAOAAQAJAAAGgGQAGgGAAgLIAAgHQgJAKgOAAQgOAAgKgMQgJgMAAgUQAAgTAJgMQAKgMAPAAQAOAAAJALIAAgJIAOAAIAABRQAAARgKAJQgKAKgQAAQgIAAgJgEgAgOgmQgGAIAAAQQAAAOAGAHQAGAJAJAAQAOAAAGgNIAAglQgHgNgNAAQgJAAgGAJg");
	this.shape_109.setTransform(246.375,58.875);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgFQgFgEgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_110.setTransform(237.625,57.2);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgHAAgFAEQgGAEAAAFIgOAAQAAgGAEgGQAEgGAIgDQAIgEAIAAQAPAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgMAAQgNAAgIgHgAgTARQAAAHAEADQAEAEAIAAQAFAAAGgDQAHgEACgFIAAgSIgLAAQgaAAABAQg");
	this.shape_111.setTransform(228.85,57.275);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#2C3E50").s().p("AgZA7IgFgBIAAgMIAEABQAHAAAEgDQAEgDADgIIADgJIgehSIAQAAIAUA+IAUg+IAPAAIgiBgQgHAVgRAAg");
	this.shape_112.setTransform(220.725,58.975);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_113.setTransform(179.175,57.275);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#2C3E50").s().p("AAtArIAAg3QAAgJgEgFQgFgEgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg2QAAgTgSAAQgPAAgFAMIAAA9IgOAAIAAhUIANAAIABAKQAJgLAQAAQARAAAGAOQAEgHAHgDQAHgEAJAAQAcAAAAAeIAAA3g");
	this.shape_114.setTransform(167.875,57.2);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#2C3E50").s().p("AgaAgQgMgMAAgUIAAAAQABgMAFgKQAEgKAJgFQAJgGAKAAQARAAALAMQALAMAAATIAAABQgBAMgEAKQgFAKgIAFQgKAGgLAAQgQAAgKgMgAgQgWQgHAIAAAPQAAAOAHAJQAGAIAKAAQALAAAHgJQAGgIAAgPQAAgOgGgIQgHgJgLAAQgKAAgGAJg");
	this.shape_115.setTransform(156.25,57.275);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#2C3E50").s().p("AgBAvQgGgFABgLIAAg0IgQAAIAAgLIAQAAIAAgUIANAAIAAAUIAQAAIAAALIgQAAIAAA0QAAAFACACQADADAFAAIAGgBIAAAMIgLABQgKAAgDgGg");
	this.shape_116.setTransform(148.8,56.325);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#2C3E50").s().p("AgQAoQgHgDgFgHQgEgGAAgIIAOAAQABAIAEAEQAGAEAIAAQAIAAAFgDQAFgEAAgFQAAgGgEgDQgFgEgKgCQgKgCgHgDQgGgDgDgEQgEgFAAgGQAAgKAJgIQAJgHANAAQAOAAAJAIQAJAHAAAMIgOAAQgBgGgFgFQgFgEgHAAQgIAAgEADQgEAEAAAFQAAAGAEACQAEADAKACQAKADAIADQAGADADAEQADAFAAAHQAAALgJAHQgIAHgPAAQgJAAgIgEg");
	this.shape_117.setTransform(142.3,57.275);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#2C3E50").s().p("AgaAgQgLgMAAgUIAAAAQAAgMAEgKQAGgKAIgFQAJgGAKAAQARAAALAMQAKAMAAATIAAABQABAMgFAKQgFAKgJAFQgIAGgMAAQgQAAgKgMgAgRgWQgGAIAAAPQAAAOAGAJQAHAIAKAAQALAAAHgJQAGgIAAgPQAAgOgGgIQgHgJgLAAQgJAAgIAJg");
	this.shape_118.setTransform(133.6,57.275);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#2C3E50").s().p("AgUArIAAhUIAPAAIAAAKQAGgLANAAIAHABIAAAOIgIgBQgNAAgFAMIAAA7g");
	this.shape_119.setTransform(126.8,57.2);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#2C3E50").s().p("AgLA9IAAhJIgOAAIAAgLIAOAAIAAgIQAAgOAHgHQAGgIAOAAIAKABIgBAMIgIgBQgHAAgEAFQgEAEAAAHIAAAJIASAAIAAALIgSAAIAABJg");
	this.shape_120.setTransform(121.125,55.425);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_121.setTransform(113.925,57.275);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgFQgFgEgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_122.setTransform(105.175,57.2);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_123.setTransform(62.975,57.275);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgFQgFgEgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_124.setTransform(54.225,57.2);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgIAAgFAEQgEAEgBAFIgOAAQAAgGAEgGQAFgGAIgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgDgJQgJALgNAAQgNAAgIgHgAgUARQABAHAEADQAFAEAGAAQAHAAAFgDQAHgEACgFIAAgSIgLAAQgZAAgBAQg");
	this.shape_125.setTransform(45.45,57.275);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#2C3E50").s().p("AgTArIAAhUIANAAIAAAKQAHgLANAAIAGABIAAAOIgHgBQgNAAgFAMIAAA7g");
	this.shape_126.setTransform(38.85,57.2);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#2C3E50").s().p("AgVAxIgBAKIgNAAIAAh3IAPAAIAAAtQAIgLAPAAQAPAAAJAMQAJALAAAUIAAABQAAATgJAMQgJAMgPAAQgPAAgJgMgAgUAAIAAAjQAGAOAOAAQAKAAAGgIQAFgJAAgQQAAgOgFgIQgGgIgKAAQgOAAgGAOg");
	this.shape_127.setTransform(31.375,55.575);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#2C3E50").s().p("AAtArIAAg3QAAgJgEgFQgFgEgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg2QAAgTgSAAQgPAAgFAMIAAA9IgOAAIAAhUIANAAIABAKQAJgLAQAAQARAAAGAOQAEgHAHgDQAHgEAJAAQAcAAAAAeIAAA3g");
	this.shape_128.setTransform(19.725,57.2);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_129.setTransform(8.525,57.275);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#2C3E50").s().p("AAtArIAAg3QAAgJgEgFQgFgEgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg2QAAgTgSAAQgPAAgFAMIAAA9IgOAAIAAhUIANAAIABAKQAJgLAQAAQARAAAGAOQAEgHAHgDQAHgEAJAAQAcAAAAAeIAAA3g");
	this.shape_130.setTransform(-2.775,57.2);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#2C3E50").s().p("AgHA6IAAhUIAOAAIAABUgAgFgqQgDgDAAgDQAAgEADgCQACgDADAAQAEAAADADQABACAAAEQAAADgBADQgDACgEAAQgDAAgCgCg");
	this.shape_131.setTransform(249.1,32.525);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#2C3E50").s().p("AgZAkQgHgJAAgPIAAg2IAOAAIAAA1QAAAUAQAAQAQAAAFgNIAAg8IAOAAIAABUIgNAAIgBgJQgIAKgPAAQgOAAgHgHg");
	this.shape_132.setTransform(242.725,34.15);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#2C3E50").s().p("AgGA8IAAh3IANAAIAAB3g");
	this.shape_133.setTransform(236.375,32.3);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQAAgHgEgFQgEgEgJAAQgHAAgFAEQgGAEAAAFIgPAAQABgGAFgGQAEgGAHgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgNAAQgMAAgIgHgAgTARQAAAHAEADQAEAEAIAAQAGAAAFgDQAHgEACgFIAAgSIgLAAQgaAAABAQg");
	this.shape_134.setTransform(230.1,34.075);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#2C3E50").s().p("AgGA8IAAh3IANAAIAAB3g");
	this.shape_135.setTransform(223.775,32.3);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_136.setTransform(217.675,34.075);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#2C3E50").s().p("AAtArIAAg3QAAgJgEgFQgFgEgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg2QAAgTgSAAQgPAAgFAMIAAA9IgOAAIAAhTIANAAIABAJQAJgLAQAAQARAAAGANQAEgFAHgEQAHgEAJAAQAcAAAAAeIAAA3g");
	this.shape_137.setTransform(206.375,34);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#2C3E50").s().p("AAtArIAAg3QAAgJgEgFQgFgEgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg2QAAgTgSAAQgPAAgFAMIAAA9IgOAAIAAhTIANAAIABAJQAJgLAQAAQARAAAGANQAEgFAHgEQAHgEAJAAQAcAAAAAeIAAA3g");
	this.shape_138.setTransform(158.875,34);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#2C3E50").s().p("AgZAkQgHgJAAgPIAAg2IAOAAIAAA1QAAAUAQAAQAQAAAFgNIAAg8IAOAAIAABUIgNAAIgBgJQgIAKgPAAQgOAAgHgHg");
	this.shape_139.setTransform(147.425,34.15);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#2C3E50").s().p("AgHA6IAAhUIAOAAIAABUgAgFgqQgDgDAAgDQAAgEADgCQACgDADAAQAEAAADADQABACAAAEQAAADgBADQgDACgEAAQgDAAgCgCg");
	this.shape_140.setTransform(141.1,32.525);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#2C3E50").s().p("AgaAxQgJgMAAgUIAAgBQAAgSAJgMQAKgMAPAAQANAAAJAKIAAgsIAPAAIAAB3IgOAAIAAgJQgJALgPAAQgOAAgKgMgAgOgFQgGAHAAAQQAAAOAGAIQAGAJAJAAQAOAAAGgNIAAgmQgGgMgOAAQgJAAgGAJg");
	this.shape_141.setTransform(134.475,32.375);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#2C3E50").s().p("AgHA6IAAhUIAOAAIAABUgAgGgqQgBgDgBgDQABgEABgCQADgDADAAQAFAAACADQACACAAAEQAAADgCADQgCACgFAAQgDAAgDgCg");
	this.shape_142.setTransform(128.2,32.525);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#2C3E50").s().p("AgUArIAAhTIAPAAIAAAJQAGgLANAAIAHABIAAANIgIAAQgNAAgFAMIAAA7g");
	this.shape_143.setTransform(124,34);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#2C3E50").s().p("AgLA9IAAhJIgOAAIAAgLIAOAAIAAgIQAAgOAHgHQAGgIAOAAIAKABIgBAMIgIgBQgHAAgEAFQgEAEAAAHIAAAJIASAAIAAALIgSAAIAABJg");
	this.shape_144.setTransform(118.325,32.225);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_145.setTransform(111.125,34.075);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgFQgFgEgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_146.setTransform(102.375,34);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#2C3E50").s().p("AgHA6IAAhUIAOAAIAABUgAgGgqQgCgDAAgDQAAgEACgCQADgDADAAQAFAAACADQACACAAAEQAAADgCADQgCACgFAAQgDAAgDgCg");
	this.shape_147.setTransform(62.5,32.525);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#2C3E50").s().p("AASA8IgdgnIgJAKIAAAdIgOAAIAAh3IAOAAIAABIIAIgJIAagbIARAAIggAiIAkAxg");
	this.shape_148.setTransform(57.05,32.3);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#2C3E50").s().p("AgZAkQgHgJAAgPIAAg2IAOAAIAAA1QAAAUAQAAQAQAAAFgNIAAg8IAOAAIAABUIgNAAIgBgJQgIAKgPAAQgOAAgHgHg");
	this.shape_149.setTransform(48.025,34.15);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#2C3E50").s().p("AgQAoQgIgDgEgHQgFgGABgIIAOAAQABAIAFAEQAFAEAIAAQAIAAAFgDQAFgEAAgFQAAgGgEgDQgFgEgKgCQgKgCgHgDQgGgDgEgEQgCgFAAgGQAAgKAIgIQAJgHAMAAQAPAAAJAIQAJAHAAAMIgPAAQAAgGgEgFQgGgEgIAAQgGAAgFADQgEAEAAAFQAAAGAEACQAEADAKACQAKADAIADQAGADAEAEQACAFAAAHQABALgKAHQgJAHgOAAQgJAAgIgEg");
	this.shape_150.setTransform(39.5,34.075);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgIAAgFAEQgEAEgBAFIgOAAQAAgGAEgGQAFgGAIgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgDgJQgJALgNAAQgNAAgIgHgAgUARQABAHAEADQAFAEAHAAQAGAAAFgDQAHgEACgFIAAgSIgLAAQgZAAgBAQg");
	this.shape_151.setTransform(31.05,34.075);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#2C3E50").s().p("AAtArIAAg3QAAgJgEgFQgFgEgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg2QAAgTgSAAQgPAAgFAMIAAA9IgOAAIAAhTIANAAIABAJQAJgLAQAAQARAAAGANQAEgFAHgEQAHgEAJAAQAcAAAAAeIAAA3g");
	this.shape_152.setTransform(19.725,34);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_153.setTransform(8.525,34.075);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#2C3E50").s().p("AAtArIAAg3QAAgJgEgFQgFgEgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg2QAAgTgSAAQgPAAgFAMIAAA9IgOAAIAAhTIANAAIABAJQAJgLAQAAQARAAAGANQAEgFAHgEQAHgEAJAAQAcAAAAAeIAAA3g");
	this.shape_154.setTransform(-2.775,34);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#2C3E50").s().p("AATA8IAAg4QAAgIgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAFIAAA8IgOAAIAAh3IAOAAIAAAuQAKgMAOAAQAbAAAAAdIAAA4g");
	this.shape_155.setTransform(246.725,9.1);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#2C3E50").s().p("AgZAjQgHgHAAgQIAAg2IAOAAIAAA1QAAAUAQAAQAQAAAFgNIAAg8IAOAAIAABUIgNAAIgBgJQgIAKgPAAQgOAAgHgIg");
	this.shape_156.setTransform(237.875,10.95);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#2C3E50").s().p("AgVAxIgBAKIgNAAIAAh3IAPAAIAAAtQAIgLAPAAQAPAAAJAMQAJALAAAUIAAABQAAATgJAMQgJAMgPAAQgPAAgJgMgAgUAAIAAAjQAGAOAOAAQAKAAAGgIQAFgJAAgQQAAgOgFgIQgGgIgKAAQgOAAgGAOg");
	this.shape_157.setTransform(229.175,9.175);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#2C3E50").s().p("AgZAjQgHgHAAgQIAAg2IAOAAIAAA1QAAAUAQAAQAQAAAFgNIAAg8IAOAAIAABUIgNAAIgBgJQgIAKgPAAQgOAAgHgIg");
	this.shape_158.setTransform(220.075,10.95);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#2C3E50").s().p("AgBAvQgGgFAAgLIAAg0IgPAAIAAgLIAPAAIAAgUIAOAAIAAAUIAQAAIAAALIgQAAIAAA0QAAAFACACQADADAFAAIAGgBIAAAMIgLABQgKAAgDgGg");
	this.shape_159.setTransform(212.8,9.925);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_160.setTransform(181.875,10.8);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQgBgHgEgFQgFgEgIAAQgHAAgGAEQgEAEAAAFIgQAAQAAgGAGgGQADgGAIgDQAIgEAJAAQAOAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgPAAIgCgJQgLALgNAAQgMAAgIgHgAgTARQgBAHAFADQAFAEAGAAQAGAAAHgDQAGgEADgFIAAgSIgMAAQgZAAAAAQg");
	this.shape_161.setTransform(173.1,10.875);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#2C3E50").s().p("AgUArIAAhTIAPAAIAAAJQAGgLANAAIAHABIAAANIgIAAQgNAAgFAMIAAA7g");
	this.shape_162.setTransform(166.5,10.8);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#2C3E50").s().p("AgHA6IAAhUIAOAAIAABUgAgGgqQgBgDAAgDQAAgEABgCQADgDADAAQAEAAADADQACACAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_163.setTransform(161.4,9.325);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQgBgHgEgFQgFgEgIAAQgHAAgGAEQgEAEAAAFIgQAAQAAgGAGgGQADgGAIgDQAIgEAJAAQAOAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgPAAIgCgJQgLALgNAAQgMAAgIgHgAgTARQgBAHAFADQAFAEAGAAQAGAAAHgDQAGgEADgFIAAgSIgMAAQgZAAAAAQg");
	this.shape_164.setTransform(155.1,10.875);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#2C3E50").s().p("AgYAgQgLgLAAgUIAAgCQAAgMAFgKQAFgJAIgGQAIgFALAAQAOAAAKAJQAJAIABAOIgOAAQgBgIgFgGQgGgFgIAAQgKAAgGAIQgGAIAAAPIAAACQAAAOAGAIQAGAIAKAAQAIAAAGgFQAFgEABgHIAOAAQgBAHgEAGQgFAHgIAEQgHAEgJAAQgQAAgKgMg");
	this.shape_165.setTransform(146.625,10.875);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#2C3E50").s().p("AgKAOQAHgKABgKIAAgNIANAAIAAALQAAAIgEAHQgEAIgFAFg");
	this.shape_166.setTransform(116.375,15.375);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_167.setTransform(110.625,10.8);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_168.setTransform(102.025,10.875);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#2C3E50").s().p("AAtArIAAg3QAAgJgEgEQgFgFgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg3QAAgSgSAAQgPAAgFAMIAAA9IgOAAIAAhTIANAAIABAJQAJgLAQAAQARAAAGANQAEgGAHgEQAHgDAJAAQAcAAAAAdIAAA4g");
	this.shape_169.setTransform(90.725,10.8);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#2C3E50").s().p("AgRA4QgJgEgEgHIAHgJQAJAMAOAAQAJAAAGgGQAGgGAAgLIAAgHQgJAKgOAAQgOAAgKgMQgJgMAAgUQAAgTAJgMQAKgMAPAAQAOAAAJALIAAgJIAOAAIAABRQAAARgKAJQgKAKgQAAQgIAAgJgEgAgOgmQgGAIAAAQQAAAOAGAHQAGAJAJAAQAOAAAGgNIAAglQgHgNgNAAQgJAAgGAJg");
	this.shape_170.setTransform(79.025,12.475);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_171.setTransform(70.525,10.875);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#2C3E50").s().p("AgQAoQgHgDgFgHQgEgGgBgIIAPAAQAAAIAFAEQAGAEAIAAQAIAAAFgDQAFgEAAgFQAAgGgEgDQgEgEgLgCQgKgCgHgDQgGgDgDgEQgDgFAAgGQgBgKAJgIQAJgHAMAAQAPAAAJAIQAJAHAAAMIgOAAQAAgGgGgFQgFgEgIAAQgHAAgEADQgEAEAAAFQAAAGAEACQAEADAKACQALADAGADQAHADADAEQAEAFAAAHQgBALgIAHQgJAHgPAAQgJAAgIgEg");
	this.shape_172.setTransform(62.05,10.875);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#2C3E50").s().p("AgjA7IAAh0IANAAIABAKQAJgLAPAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgPAAgIgJIAAAogAgUgiIAAAnQAGAMANAAQAKAAAGgJQAGgIAAgPQAAgPgGgIQgGgIgKAAQgNAAgGAMg");
	this.shape_173.setTransform(29.475,12.425);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQAAgHgFgFQgFgEgIAAQgHAAgGAEQgEAEAAAFIgPAAQgBgGAGgGQADgGAJgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgCgJQgLALgNAAQgMAAgIgHgAgUARQAAAHAFADQAFAEAGAAQAGAAAHgDQAFgEAEgFIAAgSIgMAAQgaAAAAAQg");
	this.shape_174.setTransform(20.45,10.875);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#2C3E50").s().p("AgGA6IAAhUIANAAIAABUgAgGgqQgBgDAAgDQAAgEABgCQADgDADAAQAFAAABADQADACAAAEQAAADgDADQgBACgFAAQgDAAgDgCg");
	this.shape_175.setTransform(14.15,9.325);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#2C3E50").s().p("AgBAvQgGgFABgLIAAg0IgQAAIAAgLIAQAAIAAgUIANAAIAAAUIAQAAIAAALIgQAAIAAA0QAAAFACACQADADAFAAIAGgBIAAAMIgLABQgKAAgDgGg");
	this.shape_176.setTransform(9.3,9.925);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_177.setTransform(2.775,10.875);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#2C3E50").s().p("AgQAoQgHgDgFgHQgFgGAAgIIAPAAQAAAIAGAEQAFAEAIAAQAIAAAFgDQAFgEAAgFQAAgGgEgDQgEgEgLgCQgLgCgGgDQgHgDgDgEQgCgFAAgGQAAgKAIgIQAJgHAMAAQAPAAAJAIQAJAHAAAMIgPAAQAAgGgEgFQgGgEgIAAQgGAAgFADQgEAEAAAFQAAAGAEACQAEADAKACQALADAGADQAHADAEAEQADAFAAAHQAAALgJAHQgKAHgOAAQgJAAgIgEg");
	this.shape_178.setTransform(-5.7,10.875);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#2C3E50").s().p("AgHA6IAAhUIAOAAIAABUgAgGgqQgBgDAAgDQAAgEABgCQADgDADAAQAEAAADADQACACAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_179.setTransform(249.15,-13.875);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#2C3E50").s().p("AgaAxQgJgMAAgUIAAgBQAAgSAJgMQAKgMAPAAQANAAAJAKIAAgsIAPAAIAAB3IgOAAIAAgJQgJALgPAAQgOAAgKgMgAgOgFQgGAHAAAQQAAAOAGAIQAGAJAJAAQAOAAAGgNIAAgmQgGgMgOAAQgJAAgGAJg");
	this.shape_180.setTransform(242.525,-14.025);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#2C3E50").s().p("AgUBKQAMgKAIgTQAGgTAAgYIAAgCQAAgPgDgPQgDgOgGgLQgGgLgIgHIADgJQALAHAIAMQAJAOAFAQQAFAQAAARQAAASgFAQQgFAQgJANQgIAOgLAGg");
	this.shape_181.setTransform(229.725,-12.7);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgHAAgFAEQgGAEAAAFIgOAAQAAgGAEgGQAEgGAIgDQAIgEAIAAQAPAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgMAAQgNAAgIgHgAgUARQABAHAEADQAEAEAIAAQAFAAAGgDQAHgEACgFIAAgSIgLAAQgaAAAAAQg");
	this.shape_182.setTransform(223,-12.325);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#2C3E50").s().p("AgHA6IAAhUIAOAAIAABUgAgFgqQgDgDAAgDQAAgEADgCQACgDADAAQAEAAACADQACACAAAEQAAADgCADQgCACgEAAQgDAAgCgCg");
	this.shape_183.setTransform(216.7,-13.875);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#2C3E50").s().p("AgaAxQgJgMAAgUIAAgBQAAgSAJgMQAKgMAPAAQANAAAJAKIAAgsIAPAAIAAB3IgOAAIAAgJQgJALgPAAQgOAAgKgMgAgOgFQgGAHAAAQQAAAOAGAIQAGAJAJAAQAOAAAGgNIAAgmQgGgMgOAAQgJAAgGAJg");
	this.shape_184.setTransform(210.075,-14.025);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#2C3E50").s().p("AgHA6IAAhUIAOAAIAABUgAgGgqQgBgDgBgDQABgEABgCQADgDADAAQAFAAACADQACACAAAEQAAADgCADQgCACgFAAQgDAAgDgCg");
	this.shape_185.setTransform(203.8,-13.875);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#2C3E50").s().p("AgTArIAAhUIAOAAIAAAKQAGgLANAAIAHABIAAAOIgIgBQgNAAgFAMIAAA7g");
	this.shape_186.setTransform(199.6,-12.4);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#2C3E50").s().p("AgLA9IAAhJIgOAAIAAgLIAOAAIAAgIQAAgOAHgHQAGgIAOAAIAKABIgBAMIgIgBQgHAAgEAFQgEAEAAAHIAAAJIASAAIAAALIgSAAIAABJg");
	this.shape_187.setTransform(193.925,-14.175);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_188.setTransform(186.725,-12.325);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_189.setTransform(177.975,-12.4);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#2C3E50").s().p("AgBA/QgSgagBglQAAgRAFgQQAFgRAJgNQAJgNAKgGIADAKQgMAJgHASQgGASgBAWIAAAGQAAAeAKAWQAGAOAKAHIgDAJQgKgGgJgOg");
	this.shape_190.setTransform(171.2,-12.7);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_191.setTransform(158.375,-12.4);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQAAgHgFgFQgFgEgIAAQgHAAgGAEQgEAEAAAFIgPAAQgBgGAGgGQADgGAJgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgCgJQgLALgNAAQgMAAgIgHgAgUARQAAAHAFADQAFAEAGAAQAGAAAHgDQAFgEAEgFIAAgSIgMAAQgaAAAAAQg");
	this.shape_192.setTransform(149.6,-12.325);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#2C3E50").s().p("AgRA4QgJgEgEgHIAHgJQAJAMAOAAQAJAAAGgGQAGgGAAgLIAAgHQgJAKgOAAQgOAAgKgMQgJgMAAgUQAAgTAJgMQAKgMAPAAQAOAAAJALIAAgJIAOAAIAABRQAAARgKAJQgKAKgQAAQgIAAgJgEgAgOgmQgGAIAAAQQAAAOAGAHQAGAJAJAAQAOAAAGgNIAAglQgHgNgNAAQgJAAgGAJg");
	this.shape_193.setTransform(140.575,-10.725);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#2C3E50").s().p("AgUArIAAhUIAPAAIAAAKQAGgLANAAIAHABIAAAOIgIgBQgNAAgFAMIAAA7g");
	this.shape_194.setTransform(134,-12.4);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#2C3E50").s().p("AgbAgQgLgMABgUIAAAAQgBgMAGgKQAEgKAJgFQAJgGAKAAQARAAALAMQALAMAAATIAAABQAAAMgFAKQgFAKgIAFQgJAGgMAAQgQAAgLgMgAgRgWQgGAIAAAPQAAAOAGAJQAHAIAKAAQALAAAGgJQAHgIAAgPQAAgOgHgIQgGgJgLAAQgJAAgIAJg");
	this.shape_195.setTransform(126.25,-12.325);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#2C3E50").s().p("AgRA4QgJgEgEgHIAHgJQAJAMAOAAQAJAAAGgGQAGgGAAgLIAAgHQgJAKgOAAQgOAAgKgMQgJgMAAgUQAAgTAJgMQAKgMAPAAQAOAAAJALIAAgJIAOAAIAABRQAAARgKAJQgKAKgQAAQgIAAgJgEgAgOgmQgGAIAAAQQAAAOAGAHQAGAJAJAAQAOAAAGgNIAAglQgHgNgNAAQgJAAgGAJg");
	this.shape_196.setTransform(111.725,-10.725);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#2C3E50").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_197.setTransform(102.975,-12.4);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQAAgHgEgFQgEgEgJAAQgHAAgFAEQgGAEAAAFIgPAAQABgGAEgGQAFgGAHgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgNAAQgMAAgIgHgAgTARQAAAHAEADQAEAEAIAAQAGAAAFgDQAHgEACgFIAAgSIgLAAQgaAAABAQg");
	this.shape_198.setTransform(94.2,-12.325);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#2C3E50").s().p("AgQAoQgHgDgFgHQgEgGgBgIIAPAAQABAIAEAEQAGAEAIAAQAIAAAFgDQAFgEAAgFQAAgGgEgDQgFgEgKgCQgKgCgHgDQgGgDgDgEQgEgFAAgGQAAgKAJgIQAJgHANAAQAOAAAJAIQAJAHAAAMIgOAAQAAgGgGgFQgFgEgHAAQgIAAgEADQgEAEAAAFQAAAGAEACQAEADAKACQAKADAIADQAGADADAEQADAFAAAHQAAALgJAHQgIAHgPAAQgJAAgIgEg");
	this.shape_199.setTransform(85.7,-12.325);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQgBgHgEgFQgFgEgIAAQgHAAgGAEQgEAEAAAFIgQAAQAAgGAGgGQADgGAIgDQAIgEAJAAQAOAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgBgJQgLALgNAAQgMAAgIgHgAgTARQgBAHAFADQAFAEAGAAQAGAAAHgDQAGgEADgFIAAgSIgMAAQgZAAAAAQg");
	this.shape_200.setTransform(77.25,-12.325);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#2C3E50").s().p("AgjA7IAAh0IANAAIABAKQAJgLAPAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgPAAgIgJIAAAogAgUgiIAAAnQAGAMANAAQAKAAAGgJQAGgIAAgPQAAgPgGgIQgGgIgKAAQgNAAgGAMg");
	this.shape_201.setTransform(68.575,-10.775);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_202.setTransform(59.725,-12.325);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#2C3E50").s().p("AgQAoQgHgDgFgHQgEgGgBgIIAPAAQAAAIAFAEQAGAEAIAAQAIAAAFgDQAFgEAAgFQAAgGgEgDQgEgEgLgCQgKgCgHgDQgGgDgDgEQgDgFAAgGQgBgKAJgIQAJgHAMAAQAPAAAJAIQAJAHAAAMIgPAAQABgGgGgFQgFgEgIAAQgHAAgEADQgEAEAAAFQAAAGAEACQAEADAKACQALADAGADQAHADADAEQAEAFAAAHQgBALgIAHQgJAHgPAAQgJAAgIgEg");
	this.shape_203.setTransform(51.25,-12.325);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#2C3E50").s().p("AgHA6IAAhUIAOAAIAABUgAgGgqQgBgDAAgDQAAgEABgCQADgDADAAQAEAAADADQACACAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_204.setTransform(39.9,-13.875);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#2C3E50").s().p("AgZAjQgHgHAAgQIAAg2IAOAAIAAA2QAAATAQAAQAQAAAFgNIAAg8IAOAAIAABTIgNAAIgBgIQgIAKgPAAQgOAAgHgIg");
	this.shape_205.setTransform(33.525,-12.25);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#2C3E50").s().p("AgGA8IAAh3IANAAIAAB3g");
	this.shape_206.setTransform(27.175,-14.1);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#2C3E50").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQAAgHgFgFQgFgEgIAAQgHAAgGAEQgEAEAAAFIgQAAQAAgGAGgGQADgGAJgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgCgJQgLALgMAAQgNAAgIgHgAgUARQAAAHAFADQAFAEAGAAQAGAAAHgDQAFgEAEgFIAAgSIgMAAQgaAAAAAQg");
	this.shape_207.setTransform(20.9,-12.325);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#2C3E50").s().p("AgGA8IAAh3IANAAIAAB3g");
	this.shape_208.setTransform(14.575,-14.1);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#2C3E50").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_209.setTransform(8.475,-12.325);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#2C3E50").s().p("AAqA5IAAgtIABguIglBbIgLAAIglhbIABAuIAAAtIgPAAIAAhxIAUAAIAkBcIAlhcIAUAAIAABxg");
	this.shape_210.setTransform(-2.825,-13.775);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,3.721,-161.2,-161.9)).s().p("A5MZTMAAAgylMAyUAAAIAALhIAFAAMAAAAnEg");
	this.shape_211.setTransform(124.3,78.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// layout
	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("rgba(0,0,0,0.004)").s().p("A5MZTMAAAgylMAyZAAAMAAAAylg");
	this.shape_212.setTransform(124.3,78.475);

	this.timeline.addTween(cjs.Tween.get(this.shape_212).wait(1));

	// Layer_3
	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("rgba(0,0,0,0.227)").s().p("A2RPsIAA/XMAsjAAAIAAfXg");
	this.shape_213.setTransform(98.25,92.675);

	this.timeline.addTween(cjs.Tween.get(this.shape_213).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-44.3,-83.4,329.90000000000003,323.8);


(lib.drop3G2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AggA3IAAhsIAMAAIABAJQAIgKAOAAQAOAAAIAKQAIALAAATIAAABQAAASgIALQgIAKgOABQgOgBgIgIIAAAlgAgTghIAAAlQAGAMANAAQAIgBAGgHQAGgIAAgPQAAgNgGgHQgGgIgIAAQgNAAgGAKg");
	this.shape.setTransform(159.975,64.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_1.setTransform(151.475,63.275);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAAKIgLACQgJAAgEgFg");
	this.shape_2.setTransform(144.725,62.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_3.setTransform(138.375,63.275);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAAKIgLACQgJAAgEgFg");
	this.shape_4.setTransform(131.625,62.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_5.setTransform(127.25,63.125);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgXAeQgKgKAAgSIAAgCQABgLAEgKQAEgIAIgGQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAAMAGAGQAHAIAJAAQAHAAAGgDQAFgDADgFIAIAHQgJAPgVAAQgOAAgLgLgAgMgXQgGAGAAALIAmAAIAAgBQAAgLgGgGQgEgFgJAAQgHAAgGAGg");
	this.shape_6.setTransform(120.45,63.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAAKIgLACQgJAAgEgFg");
	this.shape_7.setTransform(113.775,62.3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AARA4IAAg0QAAgIgDgEQgEgEgJAAQgFAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLANAAQAZAAAAAbIAAA0g");
	this.shape_8.setTransform(103.75,61.525);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAPQAAAHAEAEQAEADAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_9.setTransform(95.525,63.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_10.setTransform(89.3,63.125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAPQAAAHAEAEQAEADAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_11.setTransform(82.275,63.2);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgYAuQgIgLAAgTIAAgBQAAgRAIgLQAJgLANAAQAOAAAIAJIAAgpIANAAIAABvIgMAAIgBgIQgIAKgOAAQgNAAgJgLgAgNgFQgGAGAAAQQAAANAGAIQAFAHAJABQANAAAGgMIAAgjQgGgMgNAAQgJAAgFAIg");
	this.shape_12.setTransform(73.8,61.6);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_13.setTransform(61.9,63.125);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAPQAAAHAEAEQAEADAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_14.setTransform(53.675,63.2);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_15.setTransform(47.45,63.125);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAPQAAAHAEAEQAEADAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_16.setTransform(40.425,63.2);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgYAuQgIgLAAgTIAAgBQAAgRAIgLQAJgLANAAQAOAAAIAJIAAgpIANAAIAABvIgMAAIgBgIQgIAKgOAAQgNAAgJgLgAgNgFQgGAGAAAQQAAANAGAIQAFAHAJABQANAAAGgMIAAgjQgGgMgNAAQgJAAgFAIg");
	this.shape_17.setTransform(31.95,61.6);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgXAeQgKgKAAgSIAAgCQABgLAEgKQAEgIAJgGQAHgFAJAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAAMAGAGQAHAIAJAAQAIAAAEgDQAGgDADgFIAIAHQgJAPgVAAQgOAAgLgLgAgMgXQgGAGAAALIAmAAIAAgBQAAgLgGgGQgEgFgJAAQgHAAgGAGg");
	this.shape_18.setTransform(24.05,63.2);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_19.setTransform(17.85,63.125);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgWAeQgKgKAAgSIAAgCQgBgLAFgKQAFgIAHgGQAIgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAAMAHAGQAGAIAKAAQAHAAAEgDQAFgDAEgFIAJAHQgLAPgTAAQgQAAgJgLgAgMgXQgFAGgCALIAnAAIAAgBQgBgLgEgGQgFgFgJAAQgHAAgGAGg");
	this.shape_20.setTransform(11.05,63.2);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AggA3IAAhsIAMAAIABAJQAIgKAOAAQAOAAAIAKQAIALAAATIAAABQAAASgIALQgIAKgOABQgOgBgIgIIAAAlgAgTghIAAAlQAGAMANAAQAIgBAGgHQAGgIAAgPQAAgNgGgHQgGgIgIAAQgNAAgGAKg");
	this.shape_21.setTransform(2.975,64.65);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_22.setTransform(254.525,41.125);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgXAfQgKgLABgSIAAgCQAAgLAEgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAIQAIAHAIAAQAIAAAEgDQAGgDADgFIAIAGQgJAQgVAAQgOAAgLgKgAgMgXQgGAGAAAKIAmAAIAAgBQAAgJgGgGQgEgGgJAAQgHAAgGAGg");
	this.shape_23.setTransform(244.1,41.2);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgCAsQgEgFAAgKIAAgwIgPAAIAAgKIAPAAIAAgUIAMAAIAAAUIAPAAIAAAKIgPAAIAAAwQAAAEACADQACADAFAAIAHgCIAAAMIgLABQgJAAgEgGg");
	this.shape_24.setTransform(237.425,40.3);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgPAlQgHgDgFgGQgDgGgBgHIAOAAQABAHAEAEQAFAEAIAAQAIAAAEgDQAFgDAAgGQAAgFgEgDQgFgDgJgCQgKgDgGgCQgGgDgDgEQgDgEAAgGQAAgJAIgIQAJgGAMAAQANAAAJAGQAIAIAAAKIgOAAQAAgFgEgEQgFgEgHAAQgHAAgEADQgFAEABAEQAAAFADADQAFACAJADQAKACAGADQAGACAEAFQACAEAAAGQAAALgIAGQgJAHgNAAQgJAAgHgEg");
	this.shape_25.setTransform(231.3,41.2);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgCACgDQACgCADAAQAEAAACACQACADAAACQAAAEgCACQgCACgEABQgDgBgCgCg");
	this.shape_26.setTransform(225.65,39.75);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgPAlQgIgDgDgGQgFgGAAgHIAOAAQAAAHAFAEQAGAEAHAAQAIAAAEgDQAFgDAAgGQAAgFgEgDQgEgDgKgCQgKgDgGgCQgGgDgDgEQgDgEAAgGQAAgJAJgIQAHgGANAAQANAAAIAGQAJAIgBAKIgNAAQAAgFgFgEQgFgEgGAAQgHAAgEADQgEAEgBAEQAAAFAFADQADACAJADQALACAGADQAHACACAFQADAEAAAGQABALgJAGQgJAHgNAAQgIAAgIgEg");
	this.shape_27.setTransform(219.9,41.2);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgCACgDQACgCADAAQAEAAACACQACADAAACQAAAEgCACQgCACgEABQgDgBgCgCg");
	this.shape_28.setTransform(193.5,39.75);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_29.setTransform(188.375,39.525);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgCACgDQACgCADAAQAEAAACACQACADAAACQAAAEgCACQgCACgEABQgDgBgCgCg");
	this.shape_30.setTransform(182.25,39.75);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_31.setTransform(178.575,39.525);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgCACgDQACgCADAAQAEAAACACQACADAAACQAAAEgCACQgCACgEABQgDgBgCgCg");
	this.shape_32.setTransform(174.95,39.75);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_33.setTransform(166.525,41.125);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgXAfQgJgLgBgSIAAgCQABgLAEgJQAFgKAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAGAIQAIAHAIAAQAHAAAGgDQAFgDADgFIAJAGQgKAQgVAAQgOAAgLgKgAgMgXQgFAGgBAKIAmAAIAAgBQAAgJgFgGQgGgGgIAAQgHAAgGAGg");
	this.shape_34.setTransform(156.1,41.2);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_35.setTransform(145.475,41.125);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIAAQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAAMIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAOg");
	this.shape_36.setTransform(114.075,41.2);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgQA0QgIgDgFgHIAIgIQAJALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgJAJgNAAQgNAAgJgLQgJgLABgTQgBgSAJgLQAJgLAOAAQANAAAJAKIAAgIIAMAAIAABMQABAPgKAJQgJAJgPAAQgHAAgJgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgJAAgFAHg");
	this.shape_37.setTransform(105.65,42.675);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgQA0QgIgDgEgHIAHgIQAJALAMAAQAJAAAGgGQAFgFAAgKIAAgHQgJAJgMAAQgPAAgIgLQgJgLAAgTQAAgSAJgLQAIgLAPAAQAOAAAHAKIABgIIANAAIAABMQgBAPgIAJQgKAJgPAAQgIAAgIgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgIAAgHAHg");
	this.shape_38.setTransform(97.25,42.675);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AASAoIAAgzQAAgJgFgEQgDgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIANAAIAAAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_39.setTransform(89.05,41.125);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgEQAAgCACgDQACgCADAAQAEAAACACQACADAAACQAAAEgCACQgCACgEABQgDgBgCgCg");
	this.shape_40.setTransform(83.1,39.75);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AASA4IAAg0QAAgIgFgEQgDgEgIAAQgGAAgFAEQgFADgCAFIAAA4IgOAAIAAhvIAOAAIAAArQAIgLANAAQAaAAAAAbIAAA0g");
	this.shape_41.setTransform(77.15,39.525);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgXAfQgKgLAAgSIAAgCQABgLAEgJQAEgKAIgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAGAIQAHAHAJAAQAHAAAGgDQAFgDADgFIAIAGQgJAQgVAAQgOAAgLgKgAgMgXQgGAGAAAKIAmAAIAAgBQAAgJgGgGQgEgGgJAAQgHAAgGAGg");
	this.shape_42.setTransform(69.15,41.2);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgPAlQgHgDgFgGQgDgGgBgHIAOAAQABAHAEAEQAFAEAIAAQAIAAAEgDQAFgDAAgGQAAgFgEgDQgFgDgJgCQgKgDgGgCQgGgDgDgEQgDgEAAgGQAAgJAIgIQAJgGAMAAQANAAAJAGQAIAIAAAKIgOAAQAAgFgEgEQgFgEgHAAQgHAAgEADQgFAEABAEQAAAFADADQAFACAJADQAKACAGADQAGACAEAFQACAEAAAGQAAALgIAGQgJAHgNAAQgJAAgHgEg");
	this.shape_43.setTransform(61.2,41.2);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AASA4IAAg0QgBgIgEgEQgDgEgIAAQgGAAgFAEQgFADgCAFIAAA4IgOAAIAAhvIAOAAIAAArQAIgLANAAQAaAAAAAbIAAA0g");
	this.shape_44.setTransform(32.5,39.525);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_45.setTransform(24.225,41.275);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgUAvIgBAJIgLAAIAAhwIANAAIAAAqQAIgKAOAAQAOAAAIALQAIALAAARIAAACQAAASgIALQgIALgOAAQgOAAgJgKgAgTgBIAAAiQAGANANAAQAJAAAFgIQAGgHAAgQQAAgNgGgHQgFgHgJAAQgOgBgFAMg");
	this.shape_46.setTransform(16.1,39.6);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_47.setTransform(7.575,41.275);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgCAsQgEgFAAgKIAAgwIgPAAIAAgKIAPAAIAAgUIAMAAIAAAUIAPAAIAAAKIgPAAIAAAwQAAAEACADQACADAFAAIAHgCIAAAMIgLABQgJAAgEgGg");
	this.shape_48.setTransform(0.825,40.3);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AASA4IAAg0QgBgIgEgEQgDgEgIAAQgGAAgFAEQgFADgCAFIAAA4IgOAAIAAhvIAOAAIAAArQAIgLANAAQAaAAAAAbIAAA0g");
	this.shape_49.setTransform(257.05,17.525);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_50.setTransform(248.775,19.275);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_51.setTransform(242.5,19.125);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_52.setTransform(235.425,19.275);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_53.setTransform(229.475,17.525);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgWAeQgLgKAAgSIAAgCQAAgLAFgKQAFgIAHgGQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAAMAHAGQAGAIAKAAQAHAAAFgDQAEgDAEgFIAJAHQgKAPgVAAQgPAAgJgLgAgMgXQgFAGgCAKIAnAAIAAAAQgBgKgEgHQgGgFgIAAQgHAAgGAGg");
	this.shape_54.setTransform(223.8,19.2);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgPAlQgIgDgDgGQgFgGAAgHIAOAAQAAAHAFAEQAGAEAHAAQAIAAAEgDQAFgEAAgEQAAgGgEgDQgEgDgKgDQgKgCgGgCQgGgCgDgFQgDgEAAgGQAAgJAJgHQAHgHANAAQANAAAIAHQAJAHgBAKIgNAAQAAgFgFgEQgFgEgGAAQgHAAgEADQgEAEgBAFQAAAEAFADQADACAJACQALADAGADQAHACACAFQADAEAAAHQABAKgJAHQgJAGgNAAQgIAAgIgEg");
	this.shape_55.setTransform(215.85,19.2);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AgWAeQgLgKABgSIAAgCQgBgLAFgKQAEgIAJgGQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAAMAGAGQAIAIAJAAQAGAAAFgDQAFgDAEgFIAIAHQgKAPgTAAQgPAAgKgLgAgMgXQgGAGgBAKIAnAAIAAAAQgBgKgFgHQgEgFgJAAQgHAAgGAGg");
	this.shape_56.setTransform(202.05,19.2);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_57.setTransform(194.725,17.525);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AASA4IAAg0QAAgIgFgEQgDgEgIAAQgGAAgFAEQgFADgCAFIAAA4IgOAAIAAhvIAOAAIAAArQAIgLANAAQAaAAAAAbIAAA0g");
	this.shape_58.setTransform(180.2,17.525);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAHAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_59.setTransform(171.975,19.2);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_60.setTransform(165.75,19.125);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAHAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_61.setTransform(158.725,19.2);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AgYAtQgJgKAAgTIAAgBQAAgRAJgLQAIgLAPAAQANAAAIAJIAAgpIAOAAIAABvIgNAAIgBgIQgIAKgNAAQgOAAgJgMgAgOgFQgFAGAAAQQAAANAFAIQAGAHAJAAQANAAAGgLIAAgjQgHgLgMAAQgJgBgGAIg");
	this.shape_62.setTransform(150.25,17.6);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAHAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_63.setTransform(136.025,19.2);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AggA3IAAhsIAMAAIABAJQAIgLAOABQAOAAAIAKQAIALAAATIAAABQAAASgIALQgIAKgOABQgOAAgIgJIAAAlgAgTghIAAAlQAGAMANAAQAIgBAGgHQAGgIAAgPQAAgNgGgHQgGgIgIAAQgNAAgGAKg");
	this.shape_64.setTransform(127.925,20.65);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_65.setTransform(116.975,19.125);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AgZAeQgKgLAAgTIAAAAQAAgLAFgKQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAAMgEAIQgFAKgIAFQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgJAAgNQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_66.setTransform(106.125,19.2);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_67.setTransform(95.275,19.125);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AgWAeQgKgKAAgSIAAgCQgBgLAFgKQAFgIAHgGQAIgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAAMAHAGQAGAIAKAAQAHAAAFgDQAEgDAEgFIAJAHQgLAPgTAAQgQAAgJgLgAgMgXQgFAGgCAKIAnAAIAAAAQgBgKgEgHQgFgFgJAAQgHAAgGAGg");
	this.shape_68.setTransform(84.85,19.2);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_69.setTransform(74.225,19.125);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_70.setTransform(59.75,17.75);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2C3E50").s().p("AgPAlQgHgDgFgGQgEgGAAgHIAOAAQABAHAEAEQAFAEAIAAQAIAAAEgDQAFgEAAgEQAAgGgEgDQgFgDgJgDQgKgCgGgCQgGgCgDgFQgDgEAAgGQAAgJAIgHQAJgHAMAAQANAAAJAHQAIAHAAAKIgOAAQAAgFgEgEQgFgEgHAAQgHAAgEADQgFAEABAFQAAAEADADQAFACAJACQAKADAGADQAGACAEAFQACAEAAAHQAAAKgIAHQgJAGgNAAQgJAAgHgEg");
	this.shape_71.setTransform(54,19.2);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2C3E50").s().p("AgQA0QgIgDgFgHIAIgIQAJALAMAAQAJAAAGgGQAFgFAAgKIAAgHQgJAJgNAAQgNAAgJgLQgJgLABgTQgBgSAJgLQAJgLAOAAQANAAAJAKIAAgIIAMAAIAABMQABAPgKAJQgJAJgPAAQgHAAgJgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgJAAgFAHg");
	this.shape_72.setTransform(45.8,20.675);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#2C3E50").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_73.setTransform(37.6,19.125);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_74.setTransform(29.325,19.275);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#2C3E50").s().p("AgLA5IAAhEIgMAAIAAgKIAMAAIAAgJQABgMAGgHQAGgHAMAAIAKABIgBALIgIgBQgGAAgEAFQgDADAAAHIAAAJIARAAIAAAKIgRAAIAABEg");
	this.shape_75.setTransform(22.85,17.45);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_76.setTransform(17.85,19.125);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#2C3E50").s().p("AgWAeQgKgKAAgSIAAgCQgBgLAFgKQAFgIAHgGQAIgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAAMAHAGQAGAIAKAAQAHAAAEgDQAFgDAEgFIAJAHQgLAPgTAAQgQAAgJgLgAgMgXQgFAGgCAKIAnAAIAAAAQgBgKgEgHQgFgFgJAAQgHAAgGAGg");
	this.shape_77.setTransform(11.05,19.2);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#2C3E50").s().p("AgTAuIgCAJIgMAAIAAhvIAOAAIAAAqQAIgKANAAQAPAAAIAKQAJALAAATIAAABQAAASgJALQgJALgOAAQgOAAgHgLgAgTAAIAAAhQAGAMANAAQAJAAAFgHQAGgIAAgPQAAgOgGgGQgFgIgJABQgNAAgGAMg");
	this.shape_78.setTransform(3,17.6);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#2C3E50").s().p("AgPAmQgHgEgFgGQgDgGAAgHIANAAQABAHAFAEQAEAEAIAAQAHAAAGgDQAEgDAAgGQAAgFgEgDQgEgDgKgCQgKgCgGgDQgGgDgDgEQgDgEAAgGQAAgKAIgGQAJgHALAAQAOAAAJAHQAHAGABAMIgOAAQAAgGgEgEQgGgEgHAAQgGAAgEADQgFADABAFQAAAFADADQAEADAKACQAKACAGADQAGACADAFQAEAEAAAGQAAALgJAGQgIAHgOAAQgIAAgIgDg");
	this.shape_79.setTransform(257.2,-2.8);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_80.setTransform(249.225,-2.725);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#2C3E50").s().p("AgQA0QgIgDgFgHIAHgIQAKALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgIAJgOAAQgNAAgJgLQgIgLAAgTQAAgSAIgLQAJgLAOAAQANAAAJAKIAAgIIAMAAIAABMQABAPgKAJQgJAJgPAAQgIAAgIgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgJAAgFAHg");
	this.shape_81.setTransform(240.75,-1.325);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#2C3E50").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIgBQgHAAgFAEQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_82.setTransform(232.625,-2.8);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#2C3E50").s().p("AgKA5IAAhEIgNAAIAAgKIANAAIAAgIQgBgNAHgHQAGgHAMAAIAKABIgBALIgHAAQgHAAgEADQgDAEAAAIIAAAIIARAAIAAAKIgRAAIAABEg");
	this.shape_83.setTransform(226.2,-4.55);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#2C3E50").s().p("AgZAeQgKgMAAgSIAAAAQAAgMAFgJQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAALgEAKQgFAIgIAGQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgIAAgOQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_84.setTransform(219.075,-2.8);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#2C3E50").s().p("AgPAmQgIgEgDgGQgFgGAAgHIAOAAQAAAHAFAEQAGAEAHAAQAIAAAEgDQAFgDAAgGQAAgFgEgDQgEgDgKgCQgKgCgGgDQgGgDgDgEQgDgEAAgGQAAgKAJgGQAHgHANAAQANAAAIAHQAJAGgBAMIgNAAQAAgGgFgEQgFgEgGAAQgHAAgEADQgEADgBAFQAAAFAFADQADADAJACQALACAGADQAHACACAFQADAEAAAGQABALgJAGQgJAHgNAAQgIAAgIgDg");
	this.shape_85.setTransform(210.9,-2.8);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#2C3E50").s().p("AgWAfQgKgLAAgSIAAgCQgBgLAFgKQAFgJAHgFQAIgFAJAAQAPAAAJAKQAIAKABATIAAAFIg1AAQAAALAHAIQAGAHAKAAQAHAAAFgDQAEgDAEgFIAJAGQgLAQgTAAQgQAAgJgKgAgMgXQgFAGgCALIAnAAIAAgCQgBgJgEgGQgFgGgJAAQgHAAgGAGg");
	this.shape_86.setTransform(203.2,-2.8);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_87.setTransform(190.6,-4.25);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_88.setTransform(186.6,-2.875);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#2C3E50").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIgBQgHAAgFAEQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_89.setTransform(179.575,-2.8);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#2C3E50").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_90.setTransform(172.225,-4.475);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#2C3E50").s().p("AgQA0QgIgDgFgHIAHgIQAKALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgJAJgNAAQgOAAgIgLQgIgLgBgTQABgSAIgLQAJgLAOAAQANAAAIAKIABgIIAMAAIAABMQAAAPgJAJQgJAJgPAAQgHAAgJgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgIAAgHAHg");
	this.shape_91.setTransform(163.55,-1.325);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#2C3E50").s().p("AASAoIAAgzQgBgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_92.setTransform(155.35,-2.875);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_93.setTransform(149.4,-4.25);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_94.setTransform(145.725,-4.475);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#2C3E50").s().p("AgXAfQgKgLABgSIAAgCQAAgLAEgKQAEgJAJgFQAIgFAIAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAIQAIAHAIAAQAIAAAEgDQAGgDADgFIAIAGQgKAQgTAAQgPAAgLgKgAgMgXQgFAGgCALIAnAAIAAgCQAAgJgGgGQgEgGgJAAQgHAAgGAGg");
	this.shape_95.setTransform(140.05,-2.8);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_96.setTransform(129.425,-2.875);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#2C3E50").s().p("AgQA0QgIgDgEgHIAHgIQAIALANAAQAJAAAGgGQAFgFAAgKIAAgHQgJAJgMAAQgOAAgJgLQgJgLAAgTQAAgSAJgLQAJgLAOAAQAOAAAHAKIABgIIANAAIAABMQAAAPgJAJQgKAJgPAAQgIAAgIgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgJAAgFAHg");
	this.shape_97.setTransform(111.75,-1.325);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#2C3E50").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_98.setTransform(103.55,-2.875);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#2C3E50").s().p("AgYAiQgIgGAAgLQAAgMAKgGQAJgGAQgBIANAAIAAgGQAAgHgEgEQgEgEgIgBQgHAAgFAEQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAABIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgGIAAgQIgKAAQgYAAAAAOg");
	this.shape_99.setTransform(95.325,-2.8);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#2C3E50").s().p("AgXA3IgFgBIAAgLIAEAAQAGAAAEgCQAEgDADgHIADgIIgdhOIAPAAIATA7IASg7IAPAAIggBaQgGAVgQgBg");
	this.shape_100.setTransform(87.675,-1.2);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#2C3E50").s().p("AARAoIAAgzQAAgJgDgEQgEgEgIAAQgGAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_101.setTransform(73.25,-2.875);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#2C3E50").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCACgEAAQgDAAgCgCg");
	this.shape_102.setTransform(67.3,-4.25);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#2C3E50").s().p("AgUAvIAAAJIgMAAIAAhwIANAAIAAAqQAIgKAOAAQAOAAAIAKQAIAMAAARIAAACQAAASgIALQgIALgOAAQgPAAgIgKgAgTgBIAAAiQAGANANAAQAJAAAGgIQAFgHAAgQQAAgNgFgHQgGgHgJgBQgNABgGALg");
	this.shape_103.setTransform(61.45,-4.4);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#2C3E50").s().p("AgZAeQgKgMAAgSIAAAAQAAgMAFgJQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAALgEAKQgFAIgIAGQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgIAAgOQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_104.setTransform(52.775,-2.8);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_105.setTransform(46.675,-4.475);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#2C3E50").s().p("AgQA0QgIgDgFgHIAHgIQAKALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgIAJgOAAQgNAAgJgLQgIgLAAgTQAAgSAIgLQAJgLAOAAQANAAAJAKIAAgIIAMAAIAABMQABAPgKAJQgJAJgPAAQgIAAgIgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgJAAgFAHg");
	this.shape_106.setTransform(40.5,-1.325);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#2C3E50").s().p("AgZAeQgKgMAAgSIAAAAQAAgMAFgJQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAALgEAKQgFAIgIAGQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgIAAgOQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_107.setTransform(32.175,-2.8);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_108.setTransform(21.325,-2.875);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#2C3E50").s().p("AgWAfQgLgLABgSIAAgCQAAgLAEgKQAEgJAJgFQAIgFAIAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAIQAIAHAIAAQAIAAAEgDQAGgDADgFIAIAGQgKAQgTAAQgPAAgKgKgAgMgXQgFAGgCALIAnAAIAAgCQAAgJgGgGQgEgGgJAAQgHAAgGAGg");
	this.shape_109.setTransform(10.9,-2.8);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#2C3E50").s().p("AASA4IAAg0QgBgIgDgEQgEgEgJAAQgFAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLANAAQAZAAAAAbIAAA0g");
	this.shape_110.setTransform(2.75,-4.475);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#2C3E50").s().p("AgQA0QgIgDgEgHIAGgIQAJALANAAQAJAAAFgGQAGgFAAgKIAAgHQgIAJgNAAQgOAAgJgLQgJgLAAgTQAAgSAJgLQAIgLAPAAQAOAAAHAKIABgIIANAAIAABMQgBAPgIAJQgKAJgPAAQgHAAgJgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgIAAgHAHg");
	this.shape_111.setTransform(256.8,-23.325);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#2C3E50").s().p("AASAoIAAgzQAAgJgFgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_112.setTransform(248.6,-24.875);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_113.setTransform(240.325,-24.725);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#2C3E50").s().p("AgYAtQgJgLAAgSIAAgBQAAgRAJgLQAIgLAPAAQAMAAAJAJIAAgpIAOAAIAABvIgNAAIgBgIQgIAKgNAAQgOAAgJgMgAgOgFQgFAGAAAQQAAANAFAIQAGAHAJAAQANAAAGgLIAAgjQgHgLgMAAQgJgBgGAIg");
	this.shape_114.setTransform(231.8,-26.4);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#2C3E50").s().p("AASAoIAAgzQAAgJgFgEQgDgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIANAAIAAAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_115.setTransform(223.6,-24.875);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#2C3E50").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_116.setTransform(215.375,-24.8);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#2C3E50").s().p("AgQA0QgIgDgEgHIAGgIQAJALANAAQAJAAAGgGQAFgFAAgKIAAgHQgIAJgNAAQgPAAgIgLQgJgLAAgTQAAgSAJgLQAIgLAPAAQAOAAAHAKIABgIIANAAIAABMQgBAPgIAJQgKAJgPAAQgIAAgIgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgIAAgHAHg");
	this.shape_117.setTransform(206.95,-23.325);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#2C3E50").s().p("AASAoIAAgzQAAgJgFgEQgDgEgJAAQgFAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_118.setTransform(198.75,-24.875);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#2C3E50").s().p("AgXAeQgJgKgBgSIAAgCQABgLAEgJQAFgJAHgGQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAAMAGAGQAIAIAIAAQAHAAAGgDQAFgDADgFIAJAHQgKAPgVAAQgOAAgLgLgAgMgXQgFAGgBAKIAmAAIAAgBQAAgJgFgHQgGgFgIAAQgHAAgGAGg");
	this.shape_119.setTransform(190.75,-24.8);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_120.setTransform(180.125,-24.875);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#2C3E50").s().p("AARA4IAAg0QAAgIgDgEQgEgEgIAAQgGAAgFAEQgFADgCAFIAAA4IgOAAIAAhvIAOAAIAAArQAIgLANAAQAaAAAAAbIAAA0g");
	this.shape_121.setTransform(164.7,-26.475);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#2C3E50").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_122.setTransform(156.475,-24.8);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#2C3E50").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_123.setTransform(150.25,-24.875);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#2C3E50").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_124.setTransform(143.225,-24.8);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#2C3E50").s().p("AgYAtQgIgLgBgSIAAgBQABgRAIgLQAIgLAOAAQANAAAJAJIAAgpIANAAIAABvIgMAAIgBgIQgIAKgOAAQgNAAgJgMgAgOgFQgFAGAAAQQAAANAFAIQAGAHAJAAQANAAAGgLIAAgjQgGgLgNAAQgJgBgGAIg");
	this.shape_125.setTransform(134.75,-26.4);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#2C3E50").s().p("AARA4IAAg0QAAgIgDgEQgEgEgIAAQgGAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLANAAQAZAAAAAbIAAA0g");
	this.shape_126.setTransform(121.85,-26.475);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_127.setTransform(113.575,-24.725);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_128.setTransform(107.625,-26.475);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#2C3E50").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_129.setTransform(101.675,-24.725);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#2C3E50").s().p("AgTAuIgBAJIgNAAIAAhvIAOAAIAAAqQAIgKANAAQAPAAAIALQAJAKAAATIAAABQAAASgJALQgIALgPAAQgOAAgHgLgAgTgBIAAAiQAGAMANAAQAJAAAGgHQAFgIAAgPQAAgNgFgHQgGgIgJABQgNAAgGALg");
	this.shape_130.setTransform(93.55,-26.4);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_131.setTransform(82.575,-24.875);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#2C3E50").s().p("AgWAeQgLgKAAgSIAAgCQAAgLAFgJQAFgJAHgGQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAAMAHAGQAGAIAKAAQAHAAAFgDQAEgDAEgFIAJAHQgKAPgVAAQgPAAgJgLgAgMgXQgFAGgCAKIAnAAIAAgBQgBgJgEgHQgGgFgIAAQgHAAgGAGg");
	this.shape_132.setTransform(72.15,-24.8);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#2C3E50").s().p("AggA3IAAhsIAMAAIABAIQAIgKAOABQAOAAAIAKQAIALAAATIAAACQAAAQgIAMQgIALgOgBQgOABgIgKIAAAmgAgTghIAAAmQAGAKANABQAIgBAGgHQAGgIAAgPQAAgMgGgJQgGgHgIAAQgNAAgGAKg");
	this.shape_133.setTransform(64.075,-23.35);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#2C3E50").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgEACgCQACgCADAAQAEAAACACQACACAAAEQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_134.setTransform(53.15,-26.25);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#2C3E50").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_135.setTransform(48.025,-26.475);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#2C3E50").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgEACgCQACgCADAAQAEAAACACQACACAAAEQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_136.setTransform(41.9,-26.25);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#2C3E50").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_137.setTransform(38.225,-26.475);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#2C3E50").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgEACgCQACgCADAAQAEAAACACQACACAAAEQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_138.setTransform(34.6,-26.25);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#2C3E50").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_139.setTransform(26.175,-24.875);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#2C3E50").s().p("AgWAeQgLgKABgSIAAgCQgBgLAFgJQAEgJAJgGQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAAMAGAGQAIAIAJAAQAGAAAFgDQAFgDAEgFIAIAHQgKAPgTAAQgPAAgKgLgAgMgXQgGAGgBAKIAnAAIAAgBQgBgJgFgHQgEgFgJAAQgHAAgGAGg");
	this.shape_140.setTransform(15.75,-24.8);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#2C3E50").s().p("AAnA1IAAgpIABgsIgjBVIgKAAIgjhVIACAsIAAApIgOAAIAAhpIASAAIAiBWIAjhWIASAAIAABpg");
	this.shape_141.setTransform(5.15,-26.175);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,2.178,-161.2,-94.7)).s().p("A5LOzIAA9lMAyXAAAIAAdlg");
	this.shape_142.setTransform(129.9,25.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// layout
	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("rgba(0,0,0,0.004)").s().p("A5LZTMAAAgylMAyXAAAMAAAAylg");
	this.shape_143.setTransform(129.9,78.475);

	this.timeline.addTween(cjs.Tween.get(this.shape_143).wait(1));

	// Layer_3
	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("rgba(0,0,0,0.227)").s().p("A2RJ5IAAzxMAsjAAAIAATxg");
	this.shape_144.setTransform(109.95,38.8);

	this.timeline.addTween(cjs.Tween.get(this.shape_144).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32.6,-83.4,323.8,323.8);


(lib.drop3G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgTAvQgJgEgGgHQgFgIAAgJIARAAQABAJAGAFQAHAFAJAAQAKAAAGgEQAGgEAAgHQAAgGgGgFQgFgEgMgCQgNgDgHgDQgIgEgEgFQgEgGAAgHQAAgMALgJQAKgIAQAAQARAAAKAIQALAKAAANIgRAAQAAgHgGgFQgGgFgJAAQgJAAgFAEQgFAEAAAGQAAAHAFADQAEADAMADQANADAIAEQAIADAEAGQAEAFAAAIQAAAOgLAIQgLAIgRAAQgLAAgJgFg");
	this.shape.setTransform(63.225,4.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgeAqQgJgKAAgSIAAhAIASAAIAABAQAAAXASAAQATAAAGgPIAAhIIASAAIAABjIgRAAIAAgKQgKAMgSAAQgRAAgIgJg");
	this.shape_1.setTransform(53.1,4.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AAWAzIAAhBQAAgLgEgGQgGgEgKAAQgHgBgGAFQgHAEgEAHIAABHIgQAAIAAhkIAPAAIABANQAMgOASAAQAfAAAAAkIAABBg");
	this.shape_2.setTransform(42.7,4.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgfAsQgKgJAAgNQABgPAMgIQALgJAVAAIARAAIAAgHQAAgKgFgFQgGgGgKABQgJgBgGAFQgGAFAAAGIgSAAQAAgHAGgHQAFgHAKgEQAIgEALAAQARAAAKAIQAKAJAAAQIAAAtQAAAOADAHIAAACIgSAAQgBgDgBgIQgMANgQAAQgPAAgJgIgAgXAUQAAAIAFAEQAGAFAIAAQAHAAAHgFQAHgEAEgGIAAgVIgNAAQgfAAAAATg");
	this.shape_3.setTransform(32.25,4.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgWAHIAAgNIAsAAIAAANg");
	this.shape_4.setTransform(24.5,3.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgTAvQgJgEgGgHQgFgIAAgJIARAAQABAJAGAFQAHAFAJAAQAKAAAGgEQAGgEAAgHQAAgGgGgFQgFgEgMgCQgNgDgHgDQgIgEgEgFQgEgGAAgHQAAgMALgJQAKgIAQAAQARAAAKAIQALAKAAANIgRAAQAAgHgGgFQgGgFgJAAQgJAAgFAEQgFAEAAAGQAAAHAFADQAEADAMADQANADAIAEQAIADAEAGQAEAFAAAIQAAAOgLAIQgLAIgRAAQgLAAgJgFg");
	this.shape_5.setTransform(17.025,4.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgeAqQgIgKAAgSIAAhAIARAAIAABAQAAAXATAAQASAAAHgPIAAhIIARAAIAABjIgQAAIgBgKQgKAMgTAAQgPAAgJgJg");
	this.shape_6.setTransform(6.9,4.425);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgTAvQgJgEgGgHQgFgIAAgJIARAAQABAJAGAFQAHAFAJAAQAKAAAGgEQAGgEAAgHQAAgGgGgFQgFgEgMgCQgNgDgHgDQgIgEgEgFQgEgGAAgHQAAgMALgJQAKgIAQAAQARAAAKAIQALAKAAANIgRAAQAAgHgGgFQgGgFgJAAQgJAAgFAEQgFAEAAAGQAAAHAFADQAEADAMADQANADAIAEQAIADAEAGQAEAFAAAIQAAAOgLAIQgLAIgRAAQgLAAgJgFg");
	this.shape_7.setTransform(-3.175,4.35);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgeAqQgJgKAAgSIAAhAIASAAIAABAQAAAXASAAQATAAAGgPIAAhIIARAAIAABjIgQAAIAAgKQgKAMgTAAQgQAAgIgJg");
	this.shape_8.setTransform(-13.3,4.425);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgVAHIAAgNIAsAAIAAANg");
	this.shape_9.setTransform(-21.1,3.6);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgTAvQgJgEgGgHQgFgIAAgJIARAAQABAJAGAFQAHAFAJAAQAKAAAGgEQAGgEAAgHQAAgGgGgFQgFgEgMgCQgNgDgHgDQgIgEgEgFQgEgGAAgHQAAgMALgJQAKgIAQAAQARAAAKAIQALAKAAANIgRAAQAAgHgGgFQgGgFgJAAQgJAAgFAEQgFAEAAAGQAAAHAFADQAEADAMADQANADAIAEQAIADAEAGQAEAFAAAIQAAAOgLAIQgLAIgRAAQgLAAgJgFg");
	this.shape_10.setTransform(-28.575,4.35);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgeAqQgJgKAAgSIAAhAIASAAIAABAQAAAXASAAQATAAAGgPIAAhIIASAAIAABjIgRAAIAAgKQgKAMgSAAQgRAAgIgJg");
	this.shape_11.setTransform(-38.7,4.425);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgUBCQgLgFgFgIIAJgKQALAOAQAAQALAAAHgHQAHgHAAgNIAAgJQgKAMgRAAQgSAAgKgOQgLgOAAgYQAAgXALgOQAKgOASAAQASAAAKANIABgLIAPAAIAABhQAAATgLAMQgMALgTAAQgKAAgKgFgAgRguQgHAKAAATQAAARAHAJQAHAKALAAQARAAAHgPIAAgtQgIgOgPAAQgMAAgHAJg");
	this.shape_12.setTransform(-49.425,6.225);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgfAsQgKgJAAgNQAAgPAMgIQAMgJAVAAIARAAIAAgHQAAgKgGgFQgFgGgKABQgIgBgHAFQgGAFAAAGIgSAAQABgHAFgHQAGgHAIgEQAKgEAKAAQARAAAKAIQAJAJABAQIAAAtQAAAOADAHIAAACIgSAAQgBgDgBgIQgMANgPAAQgQAAgJgIgAgXAUQAAAIAFAEQAFAFAJAAQAHAAAIgFQAGgEAEgGIAAgVIgOAAQgeAAAAATg");
	this.shape_13.setTransform(-59.75,4.35);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgNBIIAAhWIgQAAIAAgNIAQAAIAAgKQAAgRAIgIQAIgJAQAAQAGAAAFABIAAAOIgKgBQgIAAgFAFQgEAFAAAJIAAALIAVAAIAAANIgVAAIAABWg");
	this.shape_14.setTransform(-67.925,2.125);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AggAlQgNgNAAgYIAAAAQAAgPAGgLQAGgMAKgHQAKgGANAAQAUAAANAOQANAOAAAXIAAABQAAAPgGAMQgGALgKAHQgLAGgNAAQgTAAgNgPgAgUgbQgIAKAAASQAAARAIAKQAIAKAMAAQANAAAIgKQAHgKAAgSQAAgQgHgLQgIgKgNAAQgMAAgIAKg");
	this.shape_15.setTransform(-76.875,4.35);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgTAvQgJgEgGgHQgFgIAAgJIARAAQABAJAGAFQAHAFAJAAQAKAAAGgEQAGgEAAgHQAAgGgGgFQgFgEgMgCQgNgDgHgDQgIgEgEgFQgEgGAAgHQAAgMALgJQAKgIAQAAQARAAAKAIQALAKAAANIgRAAQAAgHgGgFQgGgFgJAAQgJAAgFAEQgFAEAAAGQAAAHAFADQAEADAMADQANADAIAEQAIADAEAGQAEAFAAAIQAAAOgLAIQgLAIgRAAQgLAAgJgFg");
	this.shape_16.setTransform(-87.175,4.35);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgdAmQgNgNAAgXIAAgCQAAgOAGgMQAGgMAKgGQAKgHALAAQAUAAALAMQALANAAAZIAAAFIhDAAQAAAPAIAKQAJAJALAAQAJAAAHgEQAGgDAFgGIAKAHQgMAUgaAAQgTAAgNgOgAgPgeQgHAIgCAOIAxAAIAAgBQAAgOgHgHQgGgHgLAAQgJAAgHAHg");
	this.shape_17.setTransform(-96.975,4.35);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgWAHIAAgNIAsAAIAAANg");
	this.shape_18.setTransform(139,-23.2);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgUBCQgLgFgFgIIAJgKQALAOAQAAQALAAAHgHQAHgHAAgNIAAgJQgKAMgRAAQgSAAgKgOQgLgOAAgYQAAgXALgOQAKgOASAAQASAAAKANIABgLIAPAAIAABhQAAATgLAMQgMALgTAAQgKAAgKgFgAgRguQgHAKAAATQAAARAHAJQAHAKALAAQARAAAHgPIAAgtQgIgOgPAAQgMAAgHAJg");
	this.shape_19.setTransform(130.875,-20.575);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AAWAzIAAhCQAAgLgEgFQgGgEgKAAQgHAAgGAEQgHAEgEAIIAABGIgQAAIAAhkIAPAAIABANQAMgOASAAQAfAAAAAjIAABCg");
	this.shape_20.setTransform(120.55,-22.55);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgIBEIAAhjIAQAAIAABjgAgHgyQgCgDAAgFQAAgEACgDQADgCAEAAQAFAAADACQACADAAAEQAAAFgCADQgDACgFAAQgEAAgDgCg");
	this.shape_21.setTransform(113.025,-24.3);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgXAzIAAhkIAQAAIABAMQAHgNAQAAIAHABIAAAQIgIgBQgQAAgGAPIAABGg");
	this.shape_22.setTransform(107.975,-22.55);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgfAsQgKgJAAgNQAAgPANgIQALgJAVAAIARAAIAAgIQAAgJgFgFQgGgGgKABQgJgBgGAFQgGAFAAAHIgRAAQgBgIAGgHQAFgHAKgEQAJgEAJAAQASAAAJAIQALAJAAAQIAAAsQAAAPAEAHIAAACIgSAAQgCgDgBgIQgMANgQAAQgOAAgKgIgAgXAUQAAAIAFAFQAFAEAJAAQAHAAAHgEQAIgFADgGIAAgVIgNAAQgfAAAAATg");
	this.shape_23.setTransform(99.05,-22.45);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgNBIIAAhWIgQAAIAAgNIAQAAIAAgKQAAgRAIgIQAIgJAQAAQAGAAAFABIAAAOIgKgBQgIAAgFAFQgEAFAAAJIAAALIAVAAIAAANIgVAAIAABWg");
	this.shape_24.setTransform(90.875,-24.675);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgWAHIAAgNIAsAAIAAANg");
	this.shape_25.setTransform(84.7,-23.2);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgCA4QgGgHAAgNIAAg9IgSAAIAAgNIASAAIAAgYIAQAAIAAAYIATAAIAAANIgTAAIAAA9QAAAHADACQACAEAGAAIAIgCIAAAOQgHACgGAAQgLAAgFgHg");
	this.shape_26.setTransform(78.725,-23.575);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgeAqQgJgKAAgSIAAhAIASAAIAABAQAAAXASAAQATAAAHgPIAAhIIARAAIAABjIgRAAIAAgKQgKAMgSAAQgQAAgJgJg");
	this.shape_27.setTransform(70.65,-22.375);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgIBHIAAiNIAQAAIAACNg");
	this.shape_28.setTransform(63.15,-24.575);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgeAqQgIgKAAgSIAAhAIARAAIAABAQAAAXATAAQASAAAHgPIAAhIIARAAIAABjIgQAAIgBgKQgKAMgSAAQgRAAgIgJg");
	this.shape_29.setTransform(55.6,-22.375);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AA1AzIAAhBQAAgLgFgGQgFgEgLAAQgKAAgGAFQgGAFgBAKIAABCIgRAAIAAhBQAAgWgVABQgRgBgGAOIAABJIgRAAIAAhkIAQAAIAAAMQALgNATAAQAVAAAHAQQAFgHAIgFQAIgEALAAQAhAAAAAiIAABDg");
	this.shape_30.setTransform(42.075,-22.55);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgIBEIAAhjIAQAAIAABjgAgHgyQgCgDAAgFQAAgEACgDQADgCAEAAQAFAAADACQACADAAAEQAAAFgCADQgDACgFAAQgEAAgDgCg");
	this.shape_31.setTransform(25.175,-24.3);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgeAqQgJgKABgSIAAhAIARAAIAABAQAAAXATAAQASAAAHgPIAAhIIAQAAIAABjIgPAAIgBgKQgKAMgTAAQgPAAgJgJg");
	this.shape_32.setTransform(17.6,-22.375);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgHBHIAAiNIAQAAIAACNg");
	this.shape_33.setTransform(10.1,-24.575);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgfAsQgJgJAAgNQgBgPAMgIQANgJAUAAIARAAIAAgIQAAgJgGgFQgFgGgKABQgIgBgHAFQgGAFAAAHIgSAAQABgIAFgHQAGgHAIgEQAKgEAJAAQASAAAJAIQAKAJABAQIAAAsQAAAPAEAHIAAACIgTAAQgBgDgBgIQgMANgPAAQgQAAgJgIgAgXAUQAAAIAFAFQAGAEAIAAQAHAAAIgEQAGgFAEgGIAAgVIgOAAQgeAAAAATg");
	this.shape_34.setTransform(2.6,-22.45);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgHBHIAAiNIAQAAIAACNg");
	this.shape_35.setTransform(-4.85,-24.575);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgdAmQgNgNAAgXIAAgCQAAgPAGgLQAGgMAKgHQAKgGALAAQAUAAALANQALANAAAYIAAAGIhDAAQAAAPAIAJQAJAJALAAQAJAAAHgEQAGgEAFgFIAKAIQgMATgaAAQgTAAgNgOgAgPgdQgHAHgCANIAxAAIAAAAQAAgOgHgHQgGgHgLAAQgJAAgHAIg");
	this.shape_36.setTransform(-12.075,-22.45);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AA1AzIAAhBQAAgLgFgGQgFgEgLAAQgKAAgGAFQgGAFgBAKIAABCIgRAAIAAhBQAAgWgVABQgRgBgGAOIAABJIgRAAIAAhkIAQAAIAAAMQALgNATAAQAVAAAHAQQAFgHAIgFQAIgEALAAQAhAAAAAiIAABDg");
	this.shape_37.setTransform(-25.525,-22.55);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgIBEIAAhjIAQAAIAABjgAgHgyQgCgDAAgFQAAgEACgDQADgCAEAAQAFAAADACQACADAAAEQAAAFgCADQgDACgFAAQgEAAgDgCg");
	this.shape_38.setTransform(-42.425,-24.3);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgfAsQgJgJAAgNQgBgPAMgIQANgJAUAAIARAAIAAgIQAAgJgGgFQgFgGgKABQgIgBgHAFQgGAFAAAHIgSAAQABgIAFgHQAGgHAIgEQAKgEAKAAQARAAAKAIQAJAJABAQIAAAsQAAAPADAHIAAACIgSAAQgBgDgBgIQgMANgPAAQgPAAgKgIgAgXAUQAAAIAFAFQAFAEAJAAQAHAAAIgEQAGgFAEgGIAAgVIgOAAQgeAAAAATg");
	this.shape_39.setTransform(-49.95,-22.45);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgHBHIAAiNIAQAAIAACNg");
	this.shape_40.setTransform(-57.4,-24.575);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgeAqQgJgKAAgSIAAhAIASAAIAABAQAAAXASAAQATAAAGgPIAAhIIARAAIAABjIgQAAIAAgKQgKAMgTAAQgPAAgJgJg");
	this.shape_41.setTransform(-64.95,-22.375);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AA1AzIAAhBQAAgLgFgGQgFgEgLAAQgKAAgGAFQgGAFgBAKIAABCIgRAAIAAhBQAAgWgVABQgRgBgGAOIAABJIgRAAIAAhkIAQAAIAAAMQALgNATAAQAVAAAHAQQAFgHAIgFQAIgEALAAQAhAAAAAiIAABDg");
	this.shape_42.setTransform(-78.475,-22.55);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgIBEIAAhjIAQAAIAABjgAgHgyQgCgDAAgFQAAgEACgDQADgCAEAAQAFAAADACQACADAAAEQAAAFgCADQgDACgFAAQgEAAgDgCg");
	this.shape_43.setTransform(-89.075,-24.3);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgeA6QgLgOAAgXIAAgCQAAgWALgOQAKgOASAAQARAAAKAMIAAg0IARAAIAACNIgQAAIAAgLQgLANgRAAQgRAAgLgOgAgRgHQgHAJAAATQAAARAHAKQAHAKALAAQARAAAHgPIAAgtQgIgOgQAAQgLAAgHAJg");
	this.shape_44.setTransform(-96.975,-24.475);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgpBGIAAiKIAPAAIABAMQAKgNASAAQASAAALANQALAOgBAYIAAACQABAWgLAOQgLAOgSAAQgRAAgKgMIAAAwgAgYgpIAAAvQAHAOAQAAQAMAAAHgKQAHgKAAgSQAAgRgHgKQgHgKgMAAQgQAAgHAOg");
	this.shape_45.setTransform(136.55,-47.425);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgfArQgJgIAAgNQAAgQALgHQANgJAUAAIARAAIAAgIQAAgIgGgGQgFgFgKgBQgIABgHAEQgGAFAAAHIgRAAQAAgIAFgHQAFgHAJgEQAKgEAJAAQASAAAJAIQALAJAAAPIAAAtQAAAOAEAJIAAABIgSAAQgCgDgBgHQgMAMgQAAQgPAAgJgJgAgXAUQAAAIAFAFQAGAEAIAAQAHAAAHgEQAIgEADgHIAAgVIgOAAQgeABAAASg");
	this.shape_46.setTransform(125.8,-49.25);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AAWBHIgiguIgLALIAAAjIgRAAIAAiNIARAAIAABVIAJgLIAeggIAVAAIgmApIAqA6g");
	this.shape_47.setTransform(116.45,-51.375);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgUBCQgLgFgFgIIAJgKQALAOAQAAQALAAAHgHQAHgHAAgNIAAgJQgKAMgRAAQgSAAgKgOQgLgOAAgYQAAgXALgOQAKgOASAAQASAAAKANIABgLIAPAAIAABhQAAATgLAMQgMALgTAAQgKAAgKgFgAgRguQgHAKAAATQAAARAHAJQAHAKALAAQARAAAHgPIAAgtQgIgOgPAAQgMAAgHAJg");
	this.shape_48.setTransform(105.475,-47.375);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AAWAzIAAhCQAAgKgEgFQgGgGgKAAQgHABgHAEQgGAEgEAIIAABGIgRAAIAAhjIAQAAIABAMQAMgOASAAQAfAAAAAjIAABCg");
	this.shape_49.setTransform(95.15,-49.35);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgdAnQgNgOAAgWIAAgDQAAgOAGgMQAGgMAKgHQAKgGALAAQAUAAALANQALAMAAAYIAAAHIhDAAQAAAOAIAKQAJAJALAAQAJAAAHgEQAGgEAFgGIAKAJQgMATgaAAQgTAAgNgNgAgPgdQgHAHgCANIAxAAIAAgBQAAgNgHgHQgGgHgLAAQgJAAgHAIg");
	this.shape_50.setTransform(84.975,-49.25);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AgIBHIAAiNIAQAAIAACNg");
	this.shape_51.setTransform(77.55,-51.375);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AAWAzIAAhCQAAgKgFgFQgEgGgLAAQgHABgHAEQgGAEgEAIIAABGIgRAAIAAhjIARAAIAAAMQAMgOARAAQAgAAABAjIAABCg");
	this.shape_52.setTransform(41.4,-49.35);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AgfArQgJgIAAgNQgBgQAMgHQANgJAUAAIARAAIAAgIQAAgIgGgGQgFgFgKgBQgIABgHAEQgGAFAAAHIgSAAQABgIAFgHQAGgHAIgEQAKgEAJAAQASAAAJAIQAKAJABAPIAAAtQAAAOADAJIAAABIgSAAQgBgDgBgHQgMAMgPAAQgQAAgJgJgAgXAUQAAAIAFAFQAGAEAIAAQAHAAAIgEQAGgEAEgHIAAgVIgOAAQgeABAAASg");
	this.shape_53.setTransform(30.95,-49.25);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgUBCQgLgFgFgIIAJgKQALAOAQAAQALAAAHgHQAHgHAAgNIAAgJQgKAMgRAAQgSAAgKgOQgLgOAAgYQAAgXALgOQAKgOASAAQASAAAKANIABgLIAPAAIAABhQAAATgLAMQgMALgTAAQgKAAgKgFgAgRguQgHAKAAATQAAARAHAJQAHAKALAAQARAAAHgPIAAgtQgIgOgPAAQgMAAgHAJg");
	this.shape_54.setTransform(20.275,-47.375);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgXAzIAAhjIAQAAIABALQAHgNAQAAIAHABIAAAQIgIgBQgQAAgGAPIAABGg");
	this.shape_55.setTransform(12.425,-49.35);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AggAlQgNgNAAgYIAAAAQAAgPAGgMQAGgMAKgGQAKgGANAAQAUAAANAOQANAOAAAXIAAABQAAAOgGAMQgGAMgKAGQgLAHgNAAQgTAAgNgPgAgUgbQgIAKAAASQAAARAIAJQAIALAMAAQANAAAIgLQAHgJAAgSQAAgRgHgKQgIgKgNAAQgMAAgIAKg");
	this.shape_56.setTransform(3.325,-49.25);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AgIBEIAAhjIAQAAIAABjgAgHgzQgCgCAAgFQAAgDACgEQADgDAEAAQAFAAADADQACAEAAADQAAAFgCACQgDADgFAAQgEAAgDgDg");
	this.shape_57.setTransform(-33.025,-51.1);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AAVBHIghguIgMALIAAAjIgRAAIAAiNIARAAIAABVIAKgLIAeggIAVAAIgmApIArA6g");
	this.shape_58.setTransform(-39.55,-51.375);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgIBEIAAhjIAQAAIAABjgAgHgzQgCgCAAgFQAAgDACgEQADgDAEAAQAFAAADADQACAEAAADQAAAFgCACQgDADgFAAQgEAAgDgDg");
	this.shape_59.setTransform(-47.275,-51.1);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgHBHIAAiNIAQAAIAACNg");
	this.shape_60.setTransform(-51.9,-51.375);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgIBEIAAhjIAQAAIAABjgAgHgzQgCgCAAgFQAAgDACgEQADgDAEAAQAFAAADADQACAEAAADQAAAFgCACQgDADgFAAQgEAAgDgDg");
	this.shape_61.setTransform(-56.475,-51.1);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AA1AzIAAhBQAAgLgFgFQgFgGgLAAQgKABgGAFQgGAGgBAJIAABCIgRAAIAAhBQAAgWgVAAQgRABgGAOIAABIIgRAAIAAhjIAQAAIAAALQALgNATAAQAVAAAHAQQAFgHAIgFQAIgEALAAQAhAAAAAiIAABDg");
	this.shape_62.setTransform(-67.125,-49.35);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AgdAnQgNgOAAgWIAAgDQAAgOAGgMQAGgMAKgHQAKgGALAAQAUAAALANQALAMAAAYIAAAHIhDAAQAAAOAIAKQAJAJALAAQAJAAAHgEQAGgEAFgGIAKAJQgMATgaAAQgTAAgNgNgAgPgdQgHAHgCANIAxAAIAAgBQAAgNgHgHQgGgHgLAAQgJAAgHAIg");
	this.shape_63.setTransform(-80.375,-49.25);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AAyBDIAAg0IABg4IgsBsIgNAAIgshsIACA4IAAA0IgSAAIAAiGIAXAAIArBuIAshuIAXAAIAACGg");
	this.shape_64.setTransform(-93.825,-51);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,2.178,-161.1,-94.7)).s().p("A5LOzIAA9lMAyXAAAIAAdlg");
	this.shape_65.setTransform(19.75,-20.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// layout
	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("rgba(0,0,0,0.004)").s().p("A5LZTMAAAgylMAyXAAAMAAAAylg");
	this.shape_66.setTransform(19.75,-0.325);

	this.timeline.addTween(cjs.Tween.get(this.shape_66).wait(1));

	// Layer_3
	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("rgba(0,0,0,0.227)").s().p("A2RJ5IAAzxMAsjAAAIAATxg");
	this.shape_67.setTransform(-2.15,-7.7);

	this.timeline.addTween(cjs.Tween.get(this.shape_67).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-144.7,-162.2,325.7,323.79999999999995);


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
	this.shape_14.setTransform(79.2,-12.3);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(4.6,-43.1,157.4,55.8);


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
	this.shape_17.setTransform(79.2,-12.3);

	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(4.6,-43.1,157.4,55.8);


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
	this.shape_19.graphics.f("rgba(0,0,0,0.227)").s().p("ArpD6IAAnzIXTAAIAAHzg");
	this.shape_19.setTransform(74.4,-11.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_19).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.2,-43.1,157.89999999999998,57);


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
	this.shape_23.setTransform(79.2,-12.3);

	this.timeline.addTween(cjs.Tween.get(this.shape_23).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(4.6,-43.1,157.4,55.8);


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
	this.shape_19.setTransform(79.2,-12.3);

	this.timeline.addTween(cjs.Tween.get(this.shape_19).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(4.6,-43.1,157.4,55.8);


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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_19,p:{scaleX:1,scaleY:1,x:-116.1,y:206.25}},{t:this.shape_18,p:{scaleX:1,scaleY:1,x:-98.925,y:191.7}},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2,p:{scaleX:1,scaleY:1,x:-193.75,y:191.7}},{t:this.shape_1,p:{scaleX:1,scaleY:1,x:-193.75,y:191.7}},{t:this.shape}]}).to({state:[{t:this.shape_19,p:{scaleX:0.9341,scaleY:0.9341,x:-116.1451,y:205.6359}},{t:this.shape_18,p:{scaleX:0.9341,scaleY:0.9341,x:-100.1026,y:192.0606}},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_2,p:{scaleX:0.9341,scaleY:0.9341,x:-188.6754,y:192.0606}},{t:this.shape_1,p:{scaleX:0.9341,scaleY:0.9341,x:-188.6754,y:192.0606}},{t:this.shape_20}]},1).to({state:[{t:this.shape_19,p:{scaleX:0.8231,scaleY:0.8231,x:-116.1572,y:204.6361}},{t:this.shape_18,p:{scaleX:0.8231,scaleY:0.8231,x:-102.0211,y:192.6804}},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_2,p:{scaleX:0.8231,scaleY:0.8231,x:-180.0677,y:192.6804}},{t:this.shape_1,p:{scaleX:0.8231,scaleY:0.8231,x:-180.0677,y:192.6804}},{t:this.shape_36}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-232.4,151.5,230.20000000000002,91);


(lib.bg1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#34495E").s().p("A82E7Qg1AAAAgYIAApFQAAgXA1AAMA5tAAAQA1AAABAXIAAJFQgBAYg1AAg");
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


(lib.saraf = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.saraf = new lib.drag3G5();
	this.saraf.name = "saraf";
	this.saraf.setTransform(-1.65,0.05,0.8174,0.8174,0,0,0,84.5,24);
	new cjs.ButtonHelper(this.saraf, 0, 1, 2, false, new lib.drag3G5(), 3);

	this.timeline.addTween(cjs.Tween.get(this.saraf).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.saraf, new cjs.Rectangle(-66.9,-54.8,128.8,45.699999999999996), null);


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
	this.nafas.setTransform(304.15,331.4,0.5226,0.5226,0,0,0,125.2,25.8);
	new cjs.ButtonHelper(this.nafas, 0, 1, 1);

	this.ekskresi = new lib.drop3G3();
	this.ekskresi.name = "ekskresi";
	this.ekskresi.setTransform(135.55,372.95,0.5226,0.5226,0,0,0,124.2,78.5);
	new cjs.ButtonHelper(this.ekskresi, 0, 1, 1);

	this.saraf = new lib.drop3G5();
	this.saraf.name = "saraf";
	this.saraf.setTransform(303.7,443.9,0.5226,0.5226,0,0,0,117.1,30.7);
	new cjs.ButtonHelper(this.saraf, 0, 1, 1);

	this.darah = new lib.drop3G2();
	this.darah.name = "darah";
	this.darah.setTransform(306.85,227.8,0.5226,0.5226,0,0,0,135.4,25.2);
	new cjs.ButtonHelper(this.darah, 0, 1, 1);

	this.cerna = new lib.drop3G1();
	this.cerna.name = "cerna";
	this.cerna.setTransform(134.1,226.9,0.5226,0.5226,0,0,0,27.4,-20.4);
	new cjs.ButtonHelper(this.cerna, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.cerna},{t:this.darah},{t:this.saraf},{t:this.ekskresi},{t:this.nafas}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces5, new cjs.Rectangle(44.2,152.8,345.7,400.7), null);


(lib.nafas = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.nafas = new lib.drag3G3();
	this.nafas.name = "nafas";
	this.nafas.setTransform(-0.1,2.35,0.8174,0.8174,0,0,0,82.2,26.8);
	new cjs.ButtonHelper(this.nafas, 0, 1, 2, false, new lib.drag3G3(), 3);

	this.timeline.addTween(cjs.Tween.get(this.nafas).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.nafas, new cjs.Rectangle(-67.4,-54.8,129.10000000000002,46.599999999999994), null);


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
	this.instance = new lib.flash0aiAssets_2();
	this.instance.setTransform(-16,0,0.4248,0.4247);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_3
	this.instance_1 = new lib.benaracopy2d();
	this.instance_1.setTransform(128.8,32.4,1,1,0,0,0,162.4,46.8);
	this.instance_1.shadow = new cjs.Shadow("rgba(0,0,0,1)",3,3,4);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.fff, new cjs.Rectangle(-36.6,-17.4,338,107), null);


(lib.ekskresi = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.ekskresi = new lib.drag3G4();
	this.ekskresi.name = "ekskresi";
	this.ekskresi.setTransform(-1.65,0.05,0.8174,0.8174,0,0,0,84.5,24);
	new cjs.ButtonHelper(this.ekskresi, 0, 1, 2, false, new lib.drag3G4(), 3);

	this.timeline.addTween(cjs.Tween.get(this.ekskresi).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ekskresi, new cjs.Rectangle(-66.9,-54.8,128.8,45.699999999999996), null);


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
	this.instance = new lib.flash0aiAssets();
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
	this.instance = new lib.flash0aiAssets_1();
	this.instance.setTransform(-12,1,0.3539,0.3539);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_3
	this.instance_1 = new lib.benara();
	this.instance_1.setTransform(128.8,32.4,1,1,0,0,0,162.4,46.8);
	this.instance_1.shadow = new cjs.Shadow("rgba(0,0,0,1)",3,3,4);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.dsd, new cjs.Rectangle(-36.6,-17.4,338,107), null);


(lib.darah = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.darah = new lib.drag3G2();
	this.darah.name = "darah";
	this.darah.setTransform(-1.7,0.05,0.8174,0.8174,0,0,0,84.4,24);
	new cjs.ButtonHelper(this.darah, 0, 1, 2, false, new lib.drag3G2(), 3);

	this.timeline.addTween(cjs.Tween.get(this.darah).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.darah, new cjs.Rectangle(-66.9,-54.8,128.8,45.699999999999996), null);


(lib.cerna = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.cerna = new lib.drag2G1();
	this.cerna.name = "cerna";
	this.cerna.setTransform(-1.7,-32.95,0.8174,0.8174,0,0,0,84.4,-16.4);
	new cjs.ButtonHelper(this.cerna, 0, 1, 2, false, new lib.drag2G1(), 3);

	this.timeline.addTween(cjs.Tween.get(this.cerna).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.cerna, new cjs.Rectangle(-66.9,-54.8,128.8,45.699999999999996), null);


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
	this.instance = new lib.flash0aiAssets_3();
	this.instance.setTransform(-16,1,0.4247,0.4247);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_3
	this.instance_1 = new lib.benara_1();
	this.instance_1.setTransform(128.8,32.4,1,1,0,0,0,162.4,46.8);
	this.instance_1.shadow = new cjs.Shadow("rgba(0,0,0,1)",3,3,4);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bener, new cjs.Rectangle(-36.6,-17.4,338,107), null);


(lib.Slots5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// slots
	this.kotakKartuSembunyi = new lib.hasilcopy();
	this.kotakKartuSembunyi.name = "kotakKartuSembunyi";
	this.kotakKartuSembunyi.setTransform(698.9,644.6,1.2229,0.9068,0,0,0,49.4,59.9);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgfApQgIgIAAgLQABgQANgHQAMgIATAAIARAAIABgHQABgJgEgFQgFgFgIAAQgIAAgFADQgHAFgBAGIgQABQABgIAFgHQAGgGAJgEQAIgDAKgBQAOABAJAIQAIAJgBAPIgIAuIgBAHQAAAFACAEIgBACIgQAAIAAgGIAAgEQgNAMgOgBQgNAAgHgIgAgNAGQgIAFgBAJQgBAGAEAEQAEAFAHAAQAIAAAGgEQAGgDAFgHIAEgTIgMAAQgOgBgIAFg");
	this.shape.setTransform(799.1291,234.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AglA6QgIgKgBgRIABgMQABgOAHgLQAGgMAJgGQAJgFALgBQAPABAIALIAKgxIAQAAIgYCGIgOAAIABgKQgKAMgQgBQgOAAgHgKgAgPgKQgIAGgDAJQgEALAAAMQAAAMAEAIQAFAGAJABQANAAALgOIAHgsQgFgMgOAAIAAgBQgJAAgGAGg");
	this.shape_1.setTransform(790.0667,232.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgSBBIAQheIAPAAIgPBegAADgvQgDgDAAgEQABgEACgDQADgCAEgBQAEAAADACQACADAAAFQAAADgCADQgDADgEAAQgEAAgDgCg");
	this.shape_2.setTransform(782.725,232.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgTBEIAXiGIAQAAIgXCGg");
	this.shape_3.setTransform(778.475,232.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgeAkQgKgNABgUIABgDQABgNAHgMQAHgMAKgFQAKgHALAAQAOABAJAJQAIAKABAQIgBALIgBAGIg9AAQgBANAGAKQAFAIAMABQANAAAMgNIAJAIQgGAIgJAGQgKAEgKAAQgSAAgKgNgAgJgdQgIAIgEAOIAtAAIAAgCQACgLgFgIQgFgHgJAAIgBAAQgJAAgGAGg");
	this.shape_4.setTransform(771.4652,234.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAPAxIALg+IAAgIQgCgMgNAAQgNgBgLAPIgMBEIgQAAIARhfIAPAAIgCANQAMgOAQgBQANABAHAJQAGAJgBAQIgLA+g");
	this.shape_5.setTransform(761.4891,234);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAPAxIALg+IAAgIQgCgMgNAAQgNgBgLAPIgMBEIgQAAIARhfIAPAAIgCANQAMgOAQgBQANABAHAJQAGAJgBAQIgLA+g");
	this.shape_6.setTransform(751.7891,234);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAnBAIgHghIgzAAIgRAhIgSAAIBFh/IAPAAIAYB/gAgLAQIApAAIgKg6g");
	this.shape_7.setTransform(740.6,232.45);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAzAxIAAg+QAAgKgFgGQgFgEgLAAQgJgBgGAGQgGAFgBAKIAAA+IgPAAIAAg+QAAgUgUAAQgQAAgGANIAABFIgRAAIAAhfIAQAAIAAALQALgNASAAQATAAAHAQQAEgHAIgEQAIgEAKgBQAfABABAhIAAA/g");
	this.shape_8.setTransform(723.475,234);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgdAnQgHgJgBgRIAAg9IAQAAIAAA9QABAVARABQASAAAGgOIAAhFIARAAIAABfIgQAAIgBgKQgJALgRAAQgPABgJgKg");
	this.shape_9.setTransform(710.65,234.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgHBEIAAiGIAPAAIAACGg");
	this.shape_10.setTransform(703.525,232.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgHBEIAAiGIAPAAIAACGg");
	this.shape_11.setTransform(699.175,232.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQADACgBAEQABAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_12.setTransform(694.85,232.375);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgnBAIAAh/IBOAAIAAAOIg9AAIAAAsIA1AAIAAAMIg1AAIAAA5g");
	this.shape_13.setTransform(688.15,232.45);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAUBEIgggtIgKALIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_14.setTransform(674.325,232.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAEAAADADQADACAAAEQAAAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_15.setTransform(667,232.375);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgCA1QgGgGAAgMIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_16.setTransform(661.575,233.05);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgIAAgIIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgDAAgHQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgEgDgEQgEgFAAgIQAAgLAKgJQAKgIAPAAQAQAAAKAJQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAFAAAIQAAANgLAHQgKAJgQgBQgKAAgJgEg");
	this.shape_17.setTransform(654.225,234.1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_18.setTransform(647.45,232.375);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAQAAIAAAMQAHgNAOgBQAFABADABIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_19.setTransform(642.7,234);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgbAlQgNgNAAgVIAAgDQAAgNAGgLQAFgMAKgGQAKgGAKgBQATAAAKANQALAMgBAXIAAAFIg/AAQAAAOAIAKQAIAIALAAQAJAAAFgEQAGgDAFgGIAKAIQgMASgYAAQgSABgMgNgAgPgcQgGAHgCAOIAvAAIAAgCQgBgNgFgGQgHgHgKAAQgIAAgIAHg");
	this.shape_20.setTransform(634.45,234.1);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgCA1QgGgGAAgMIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_21.setTransform(626.375,233.05);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAUBEIgggtIgKALIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_22.setTransform(619.775,232.1);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgHAFgHQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAAqQAAAOADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_23.setTransform(609.675,234.1);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAPAAIABAMQAHgNAPgBQAEABADABIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_24.setTransform(602.25,234);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAEAAAHIgQAAQAAgHAFgHQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAAqQAAAOADAHIAAACIgRAAIgCgKQgLAMgPgBQgOABgJgJgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_25.setTransform(593.775,234.1);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAcBAIgsg7IgQAQIAAArIgQAAIAAh/IAQAAIAAA/IA5g/IAUAAIgyA4IA2BHg");
	this.shape_26.setTransform(584.05,232.45);

	this.darah = new lib.darah();
	this.darah.name = "darah";
	this.darah.setTransform(718.65,369.15,1,1,0,0,0,0,-34);

	this.ekskresi = new lib.ekskresi();
	this.ekskresi.name = "ekskresi";
	this.ekskresi.setTransform(820.85,291.75,1,1,0,0,0,0,-34);

	this.saraf = new lib.saraf();
	this.saraf.name = "saraf";
	this.saraf.setTransform(820.85,442.5,1,1,0,0,0,0,-34);

	this.nafas = new lib.nafas();
	this.nafas.name = "nafas";
	this.nafas.setTransform(612.8,442.5,1,1,0,0,0,0,-34);

	this.cerna = new lib.cerna();
	this.cerna.name = "cerna";
	this.cerna.setTransform(611.15,292.75,1,1,0,0,0,-1.7,-33);

	this.kotakKartu2 = new lib.hasil();
	this.kotakKartu2.name = "kotakKartu2";
	this.kotakKartu2.setTransform(467.05,367.5,1.2229,0.9068,0,0,0,49.4,59.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.kotakKartu2},{t:this.cerna},{t:this.nafas},{t:this.saraf},{t:this.ekskresi},{t:this.darah},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.kotakKartuSembunyi}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Slots5, new cjs.Rectangle(404.8,219.8,477.7,480.40000000000003), null);


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
	this.frame_24 = function() {
		this.gotoAndStop(0);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(12).call(this.frame_12).wait(12).call(this.frame_24).wait(1));

	// Layer_8
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,131,0)").s().p("AipCrQhHhHAAhkQAAhjBHhGQBGhHBjAAQBkAABHBHQBGBGAABjQAABkhGBHQhHBGhkAAQhjAAhGhGg");
	this.shape.setTransform(383.7,-156.05);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_5
	this.exit = new lib.btnEit_1();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);
	this.exit._off = true;

	this.timeline.addTween(cjs.Tween.get(this.exit).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_4
	this.instance = new lib._1();
	this.instance.setTransform(-324,-254,1.0063,1.0063);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgVBsIAAiBIgXAAIAAgUIAXAAIAAgQQAAgXANgOQAMgNAYAAQAJAAAIACIgBAVIgOgBQgMAAgHAHQgHAHAAAOIAAAQIAgAAIAAAUIggAAIAACBg");
	this.shape_1.setTransform(121.875,150.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgvBCQgOgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAHAAAKIgaAAQAAgLAIgLQAIgLAOgFQAOgHAPAAQAaAAAPANQAOANABAXIAABEQgBAVAGAMIAAACIgbAAQgCgFgBgLQgTATgYAAQgWAAgOgMgAgjAeQAAAMAIAHQAIAGAMABQALAAALgHQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_2.setTransform(108.7,153.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgjBMIAAiUIAZAAIAAARQAMgUAXgBQAHAAAEADIAAAXIgMgBQgZAAgJAWIAABpg");
	this.shape_3.setTransform(96.975,153.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgvBCQgOgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgOAAgJAHQgJAHAAAKIgaAAQAAgLAIgLQAIgLAOgFQAOgHAPAAQAaAAAPANQAOANABAXIAABEQgBAVAGAMIAAACIgbAAQgCgFgBgLQgSATgZAAQgWAAgOgMgAgjAeQAAAMAIAHQAIAGANABQAKAAALgHQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_4.setTransform(83.6,153.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgjBgQgSgIgJgOQgLgOABgSIAbAAQAAATANAKQANALAWAAQAVAAALgJQAMgIgBgPQAAgPgKgIQgKgIgagIQgjgKgQgNQgPgPAAgVQAAgYATgPQATgQAdAAQAWAAAQAIQAQAIAJAOQAJAOAAARIgbAAQAAgSgLgLQgMgKgWAAQgSAAgLAJQgLAIAAAQQAAAMALAJQAKAIAYAHQAZAHAOAIQAPAIAGAMQAIALgBAPQAAAZgTAPQgTAPggAAQgUAAgSgIg");
	this.shape_5.setTransform(67.55,151.325);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("ABPBMIAAhiQABgQgIgHQgHgJgRABQgPAAgKAIQgIAJgCAOIAABiIgZAAIAAhhQAAghggABQgagBgIAWIAABsIgaAAIAAiUIAYAAIABAQQAQgTAcgBQAfAAALAZQAHgLANgHQALgGARgBQAyAAAAA1IAABjg");
	this.shape_6.setTransform(39.7,153.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgrA6QgUgUABgiIAAgEQgBgWAJgSQAJgRAPgKQAPgKARAAQAdAAARAUQAPASABAkIAAAKIhlAAQABAXAMANQAMAOASAAQAOAAAJgGQAKgGAHgIIAQAMQgTAdgmAAQgdAAgTgUgAgXgtQgLAMgCAVIBKAAIAAgCQgBgUgJgLQgKgLgQAAQgPABgKAKg");
	this.shape_7.setTransform(20,153.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgDBUQgJgKAAgTIAAhcIgcAAIAAgUIAcAAIAAglIAYAAIAAAlIAcAAIAAAUIgcAAIAABcQAAAJAEAEQAEAFAIAAIANgCIAAAVQgKADgKAAQgRAAgHgLg");
	this.shape_8.setTransform(7.35,152.225);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgdBHQgOgGgIgMQgIgLAAgNIAaAAQABAMAJAIQAKAIAPAAQAOAAAJgGQAJgGAAgKQAAgKgIgGQgIgGgSgEQgUgEgLgFQgLgGgGgHQgFgJAAgLQAAgSAPgNQAQgNAXAAQAaAAAPANQAQANAAAVIgaAAQAAgLgIgHQgJgIgOAAQgNAAgIAHQgIAFAAALQAAAIAIAFQAHAFASAEQATAFAMAFQAMAGAGAIQAGAIAAAMQAAAVgQAMQgQAMgaAAQgRAAgOgHg");
	this.shape_9.setTransform(-4.275,153.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgtBpIgKgCIAAgVIAHABQANAAAIgFQAHgGAFgOIAFgPIg1iTIAcAAIAlBvIAjhvIAbAAIg9CsQgMAlgfAAg");
	this.shape_10.setTransform(-18.35,156.925);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgjBgQgSgIgKgOQgJgOgBgSIAbAAQAAATAOAKQAOALAVAAQAVAAALgJQAMgIAAgPQAAgPgLgIQgLgIgagIQgigKgPgNQgQgPAAgVQAAgYATgPQATgQAeAAQAUAAARAIQAQAIAJAOQAJAOAAARIgbAAQAAgSgMgLQgLgKgVAAQgTAAgLAJQgLAIAAAQQAAAMAKAJQALAIAYAHQAZAHAOAIQAOAIAIAMQAGALABAPQgBAZgTAPQgTAPggAAQgUAAgSgIg");
	this.shape_11.setTransform(-33.4,151.325);

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
	this.frame_24 = function() {
		this.gotoAndStop(0);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(12).call(this.frame_12).wait(12).call(this.frame_24).wait(1));

	// Layer_8
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,131,0)").s().p("AipCrQhHhHAAhkQAAhjBHhGQBGhHBjAAQBkAABHBHQBGBGAABjQAABkhGBHQhHBGhkAAQhjAAhGhGg");
	this.shape.setTransform(383.7,-156.05);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_5
	this.instance = new lib._2();
	this.instance.setTransform(-239,-267,1.0025,1.0025);

	this.exit = new lib.btnEit_1();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAiBMIAAhiQgBgQgHgIQgIgIgPABQgLgBgKAHQgJAHgGAKIAABqIgZAAIAAiUIAYAAIABATQARgXAbAAQAvAAABA2IAABig");
	this.shape_1.setTransform(156.3,170.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgvBCQgOgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAHAAAKIgaAAQAAgLAIgLQAIgKAOgHQAOgGAPAAQAaAAAPANQAOANABAXIAABEQgBAVAGAMIAAACIgbAAQgCgEgBgMQgTATgXAAQgXAAgOgMgAgjAeQAAAMAIAHQAIAGAMABQALAAALgHQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_2.setTransform(140.65,170.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgdBHQgOgGgIgMQgIgLAAgNIAaAAQABAMAJAJQAKAHAPAAQAOAAAJgGQAJgGAAgKQAAgKgIgGQgIgFgSgFQgUgEgLgFQgLgGgGgHQgFgJAAgLQAAgSAPgNQAQgNAXAAQAaAAAPANQAQAOAAAUIgaAAQAAgKgIgIQgJgHgOgBQgNAAgIAHQgIAFAAALQAAAIAIAFQAHAFASAEQATAEAMAGQAMAGAGAIQAGAIAAAMQAAAVgQAMQgQAMgaAAQgRAAgOgHg");
	this.shape_3.setTransform(125.525,170.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgvBCQgOgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgOAAgJAHQgJAHAAAKIgaAAQAAgLAIgLQAIgKAOgHQANgGAQAAQAZAAAPANQAPANAAAXIAABEQABAVAFAMIAAACIgbAAQgCgEgCgMQgRATgZAAQgWAAgOgMgAgjAeQAAAMAIAHQAIAGANABQALAAAKgHQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_4.setTransform(110.45,170.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgVBsIAAiBIgXAAIAAgUIAXAAIAAgQQAAgXANgOQAMgNAYAAQAJAAAIADIgBAUIgOgBQgMAAgHAHQgHAIAAANIAAAQIAgAAIAAAUIggAAIAACBg");
	this.shape_5.setTransform(98.325,167.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgvBCQgOgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAHAAAKIgaAAQAAgLAIgLQAIgKAOgHQAOgGAPAAQAZAAAPANQAPANABAXIAABEQAAAVAFAMIAAACIgbAAQgCgEgCgMQgRATgZAAQgVAAgPgMgAgjAeQAAAMAIAHQAIAGANABQALAAAKgHQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_6.setTransform(85.15,170.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAhBMIAAhiQAAgQgHgIQgIgIgPABQgMgBgJAHQgJAHgFAKIAABqIgaAAIAAiUIAYAAIABATQARgXAbAAQAwAAAAA2IAABig");
	this.shape_7.setTransform(69.65,170.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgjBMIAAiUIAZAAIAAARQAMgVAXAAQAHAAAEACIAAAYIgMgBQgZAAgJAWIAABpg");
	this.shape_8.setTransform(57.825,170.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgsA6QgSgUAAgiIAAgEQAAgWAIgRQAJgSAPgKQAPgKARAAQAdAAAQAUQAQASAAAlIAAAJIhkAAQAAAXANANQAMAOATAAQANAAAJgGQAKgFAHgKIAQANQgTAdgmAAQgeAAgTgUgAgXgtQgKAMgDAVIBKAAIAAgCQgBgUgJgLQgKgLgQAAQgOABgLAKg");
	this.shape_9.setTransform(44.95,170.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("Ag+BpIAAjOIAXAAIABAQQAQgTAbAAQAbAAAQAUQAPAVAAAkIAAACQAAAigPAVQgQAVgbAAQgaAAgQgSIAABIgAglg+IAABHQAMAVAYAAQARAAALgPQALgPAAgcQAAgZgLgPQgLgOgSAAQgXAAgMAUg");
	this.shape_10.setTransform(29.625,173.625);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("ABPBMIAAhiQAAgQgHgHQgHgIgSAAQgOgBgJAJQgKAJgBAOIAABiIgZAAIAAhhQAAghggABQgZAAgKAVIAABsIgZAAIAAiUIAYAAIAAAQQARgUAcAAQAgABAKAYQAHgLAMgGQANgIAQAAQAxABABA0IAABjg");
	this.shape_11.setTransform(1.95,170.75);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgsA6QgSgUgBgiIAAgEQAAgWAJgRQAIgSAQgKQAPgKARAAQAdAAARAUQAPASAAAlIAAAJIhkAAQABAXAMANQANAOARAAQAOAAAKgGQAJgFAHgKIAPANQgSAdgmAAQgdAAgUgUgAgXgtQgLAMgCAVIBKAAIAAgCQgBgUgKgLQgJgLgQAAQgOABgLAKg");
	this.shape_12.setTransform(-17.75,170.9);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgEBUQgIgKgBgTIAAhcIgbAAIAAgUIAbAAIAAglIAZAAIAAAlIAcAAIAAAUIgcAAIAABcQAAAJAEAEQADAFAKAAIAMgCIAAAVQgKADgKAAQgRAAgIgLg");
	this.shape_13.setTransform(-30.4,169.225);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgdBHQgOgGgIgMQgIgLAAgNIAaAAQABAMAJAJQAKAHAPAAQAOAAAJgGQAJgGAAgKQAAgKgIgGQgIgFgSgFQgUgEgLgFQgLgGgGgHQgFgJAAgLQAAgSAPgNQAQgNAXAAQAaAAAPANQAQAOAAAUIgaAAQAAgKgIgIQgJgHgOgBQgNAAgIAHQgIAFAAALQAAAIAIAFQAHAFASAEQATAEAMAGQAMAGAGAIQAGAIAAAMQAAAVgQAMQgQAMgaAAQgRAAgOgHg");
	this.shape_14.setTransform(-42.025,170.9);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgtBpIgKgCIAAgVIAIABQANAAAHgFQAHgGAFgOIAFgPIg1iTIAcAAIAkBvIAjhvIAcAAIg8CsQgOAlgeAAg");
	this.shape_15.setTransform(-56.1,173.925);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgjBgQgSgIgJgOQgLgOABgSIAbAAQAAATANAKQANALAWAAQAVAAAMgJQALgIgBgPQAAgPgKgIQgKgIgagIQgjgKgQgNQgPgPAAgVQAAgYATgPQATgQAdAAQAWAAAQAIQAQAIAJAOQAJAOAAARIgbAAQAAgSgLgLQgMgKgWAAQgSAAgLAJQgLAIAAAQQAAAMALAJQAKAIAYAHQAZAHAOAIQAPAIAGAMQAIALgBAPQABAZgUAPQgTAPggAAQgUAAgSgIg");
	this.shape_16.setTransform(-71.15,168.325);

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
	this.frame_24 = function() {
		this.gotoAndStop(0);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(12).call(this.frame_12).wait(12).call(this.frame_24).wait(1));

	// Layer_5
	this.instance = new lib._5();
	this.instance.setTransform(-302,-231);

	this.exit = new lib.btnEit_1();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF83").s().p("AAYBNIAQhiIAAgMQgCgUgVAAQgVgBgRAZIgTBqIgZAAIAaiVIAYAAIgEATQATgXAaABQAVAAALAPQAKAOgDAZIgQBig");
	this.shape.setTransform(156.025,160.7495);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFF83").s().p("AgSBOQgUgBgMgMQgNgMABgTQACgYATgMQAUgNAfAAIAaAAIABgMQACgOgHgHQgGgIgOgBQgMAAgJAHQgKAGgCALIgaAAQACgNAJgKQAJgKAOgGQANgFAPAAQAXAAANAOQANAOgCAWIgMBKIgBAKQAAAIACAHIAAADIgaAAIgBgIIABgIQgUATgWAAIgBAAgAgWAJQgMAIgCAOQgBAKAGAHQAGAHAMAAQAMABAKgGQALgGAHgLIAGgfIgTAAQgXAAgNAHg");
	this.shape_1.setTransform(140.9596,160.9006);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF83").s().p("AgSBOQgUgBgMgMQgNgMABgTQACgYATgMQAUgNAfAAIAaAAIABgMQACgOgHgHQgGgIgOgBQgMAAgJAHQgKAGgCALIgaAAQACgNAJgKQAJgKAOgGQANgFAPAAQAXAAANAOQANAOgCAWIgMBKIgBAKQAAAIACAHIAAADIgaAAIgBgIIABgIQgUATgWAAIgBAAgAgWAJQgMAIgCAOQgBAKAGAHQAGAHAMAAQAMABAKgGQALgGAHgLIAGgfIgTAAQgXAAgNAHg");
	this.shape_2.setTransform(125.8096,160.9006);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFF83").s().p("AAYBNIAQhiIAAgMQgCgUgVAAQgVgBgRAZIgTBqIgZAAIAaiVIAYAAIgEATQATgXAaABQAVAAALAPQAKAOgDAZIgQBig");
	this.shape_3.setTransform(110.375,160.7495);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF83").s().p("AgvBNIAaiVIAXAAIgDARQAPgVAWABIAMACIgDAYIgLgCQgZAAgMAWIgTBqg");
	this.shape_4.setTransform(99.15,160.7494);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFF83").s().p("AgwA5QgQgUADgfIABgGQACgVALgTQALgSAPgKQAQgJARAAQAXAAANAPQAOAPABAaQAAAJgBAJIgBAKIhhAAQgDAVAKAOQAJAPASAAQAVAAATgUIAOAMQgJAOgPAHQgPAIgRAAQgcgBgQgUgAgPguQgMALgHAXIBIAAIABgDQACgRgIgMQgIgMgOAAIgCAAQgNAAgLAKg");
	this.shape_5.setTransform(86.6414,160.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFF83").s().p("AgnBEQgNgJgGgRQgGgRACgVIABgGQACgWAKgRQAKgRAQgKQAQgJATAAQAXABAOAPQAPAQAAAXIgYAAQAAgPgIgJQgIgJgNgBQgTAAgNAPQgNAPgDAaIAAADQgBAJAAAKQABAQAIAJQAJAKAOAAQAMABALgJQALgIADgNIAYAAQgCAOgJAMQgJALgOAHQgOAGgOAAQgTAAgNgKg");
	this.shape_6.setTransform(72.1265,160.8988);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFF83").s().p("AAYBNIAQhiIAAgMQgCgUgVAAQgVgBgRAZIgTBqIgZAAIAaiVIAYAAIgEATQATgXAaABQAVAAALAPQAKAOgDAZIgQBig");
	this.shape_7.setTransform(56.275,160.7495);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFF83").s().p("AgwA5QgQgUADgfIABgGQACgVALgTQALgSAPgKQAQgJARAAQAXAAANAPQAOAPABAaQAAAJgBAJIgBAKIhhAAQgDAVAKAOQAJAPASAAQAVAAATgUIAOAMQgJAOgPAHQgPAIgRAAQgcgBgQgUgAgPguQgMALgHAXIBIAAIABgDQACgRgIgMQgIgMgOAAIgCAAQgNAAgLAKg");
	this.shape_8.setTransform(42.0414,160.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFF83").s().p("AhJBpIAkjOIAXAAIgDAQQASgUAaABQAVAAANAQQAMAPAAAbIgBASIAAACQgDAXgJASQgJASgPAJQgOAJgRAAQgagBgNgRIgNBIgAgSg+IgNBHQAIAUAWABQASAAAOgPQANgPADgcIABgMQAAgUgHgLQgIgLgPAAIgBAAQgUAAgPAUg");
	this.shape_9.setTransform(25.8,163.6244);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFF83").s().p("ABFBNIAQhiIAAgNQgDgTgWgBQgNAAgLAJQgMAJgDAOIgRBjIgYAAIAQhiQACgPgGgJQgHgIgNAAQgYgBgNAWIgTBtIgaAAIAaiVIAYAAIgDAQQATgUAaABQAPAAAJAGQAKAHADALQAVgZAdABQAXAAAKAPQALAPgDAYIgQBig");
	this.shape_10.setTransform(-0.776,160.7494);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFF83").s().p("AgwA5QgQgUADgfIABgGQACgVALgTQALgSAPgKQAQgJARAAQAXAAANAPQAOAPABAaQAAAJgBAJIgBAKIhhAAQgDAVAKAOQAJAPASAAQAVAAATgUIAOAMQgJAOgPAHQgPAIgRAAQgcgBgQgUgAgPguQgMALgHAXIBIAAIABgDQACgRgIgMQgIgMgOAAIgCAAQgNAAgLAKg");
	this.shape_11.setTransform(-19.5086,160.9);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFF83").s().p("AgXBUQgIgLACgTIAPhbIgaAAIAEgUIAaAAIAGgkIAYAAIgGAkIAbAAIgEAUIgbAAIgPBcIAAAHQACALAKgBIALgBIgBAVQgJACgIABQgQgBgHgKg");
	this.shape_12.setTransform(-31,159.2);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFF83").s().p("AguBAQgQgOABgWIAZABQAAANAIAHQAIAIAOAAQANAAAKgGQAKgGABgLQADgPgUgGIgZgIQghgLABgaQABgTASgOQAQgMAWAAQAYAAANANQAOAOAAAUIgZAAQAAgLgHgHQgHgHgMAAQgMgBgKAHQgJAGgBAKQgCANASAGIALAEQAaAHALAJQALALgBAQQAAANgJALQgJAKgNAGQgOAFgOAAQgZgBgPgNg");
	this.shape_13.setTransform(-43.4499,160.9);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFF83").s().p("Ag8BpQgFAAgKgCIACgVIAHABQAMAAAJgGQAIgGAHgNIAJgRIgaiSIAaAAIARBvIA0hvIAcAAIhYCuQgTAlgcAAIgBgBg");
	this.shape_14.setTransform(-57.175,163.9503);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFF83").s().p("AgvBfQgPgIgJgNQgIgOABgSIAaAAQgBASALALQALAKAUABQATAAANgJQANgJACgPQADgWgagLIgXgIIgIgEQgogRACgiQACgRAKgMQAKgNARgHQARgHARAAQATAAAOAIQAOAIAIAOQAHAOAAARIgbAAQACgSgKgLQgKgKgSAAQgSAAgNAJQgMAJgCAQQgDAUAcALIAUAIIAKAEQAnARgDAjQgBASgKAMQgKAMgRAHQgRAHgTAAQgTgBgQgIg");
	this.shape_15.setTransform(-71.429,158.3233);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).to({state:[]},1).wait(12));

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
	this.frame_24 = function() {
		this.gotoAndStop(0);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(12).call(this.frame_12).wait(12).call(this.frame_24).wait(1));

	// Layer_8
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,131,0)").s().p("AipCrQhHhHAAhkQAAhjBHhGQBGhHBjAAQBkAABHBHQBGBGAABjQAABkhGBHQhHBGhkAAQhjAAhGhGg");
	this.shape.setTransform(383.7,-156.05);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_5
	this.exit = new lib.btnEit_1();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);
	this.exit._off = true;

	this.timeline.addTween(cjs.Tween.get(this.exit).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_4
	this.instance = new lib._3();
	this.instance.setTransform(-313,-265,0.9969,0.9969);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.instance}]},12).to({state:[]},1).wait(12));

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
	this.frame_24 = function() {
		this.gotoAndStop(0);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(12).call(this.frame_12).wait(12).call(this.frame_24).wait(1));

	// Layer_8
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,131,0)").s().p("AipCrQhHhHAAhkQAAhjBHhGQBGhHBjAAQBkAABHBHQBGBGAABjQAABkhGBHQhHBGhkAAQhjAAhGhGg");
	this.shape.setTransform(383.7,-156.05);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_5
	this.instance = new lib._4();
	this.instance.setTransform(-223,-258,1.007,1.007);

	this.exit = new lib.btnEit_1();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgMBmIAAiVIAZAAIAACVgAgKhMQgEgEAAgHQAAgGAEgEQADgEAHAAQAHAAAEAEQAEAEAAAGQAAAHgEAEQgEAEgHAAQgHAAgDgEg");
	this.shape_1.setTransform(141.625,164.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgdBIQgOgHgIgLQgIgMAAgNIAaAAQABANAJAHQAKAIAPAAQAOAAAJgGQAJgGAAgKQAAgKgIgGQgIgFgSgFQgUgEgLgFQgLgFgGgJQgFgIAAgLQAAgTAPgMQAQgNAXAAQAaAAAPAOQAQAMAAAVIgaAAQAAgKgIgIQgJgIgOABQgNAAgIAFQgIAGAAAKQAAAJAIAGQAHAEASAFQATADAMAHQAMAEAGAJQAGAJAAAMQAAATgQAMQgQANgaAAQgRAAgOgGg");
	this.shape_2.setTransform(130.725,166.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgrA6QgUgVABghIAAgEQgBgWAJgSQAJgRAPgKQAPgKARAAQAdAAARATQAQAUAAAkIAAAKIhlAAQAAAVANAOQANAOARAAQAOAAAKgFQAJgHAHgIIAPAMQgSAdgmAAQgeAAgSgUgAgXgsQgKALgDAUIBKAAIAAgCQgBgTgJgLQgKgKgQAAQgPAAgKALg");
	this.shape_3.setTransform(116.2,166.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgjBNIAAiWIAZAAIAAASQAMgVAXABQAHAAAEACIAAAYIgMgBQgZAAgJAVIAABqg");
	this.shape_4.setTransform(104.525,166.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAgBrIgzhGIgRARIAAA1IgZAAIAAjVIAZAAIAACAIAOgQIAugxIAgAAIg6A+IBABYg");
	this.shape_5.setTransform(92.7,163.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgdBIQgOgHgIgLQgIgMAAgNIAaAAQABANAJAHQAKAIAPAAQAOAAAJgGQAJgGAAgKQAAgKgIgGQgIgFgSgFQgUgEgLgFQgLgFgGgJQgFgIAAgLQAAgTAPgMQAQgNAXAAQAaAAAPAOQAQAMAAAVIgaAAQAAgKgIgIQgJgIgOABQgNAAgIAFQgIAGAAAKQAAAJAIAGQAHAEASAFQATADAMAHQAMAEAGAJQAGAJAAAMQAAATgQAMQgQANgaAAQgRAAgOgGg");
	this.shape_6.setTransform(77.125,166.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAgBrIgzhGIgRARIAAA1IgZAAIAAjVIAZAAIAACAIAPgQIAtgxIAfAAIg5A+IBABYg");
	this.shape_7.setTransform(63.6,163.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgrA6QgUgVAAghIAAgEQAAgWAJgSQAIgRAQgKQAPgKARAAQAdAAARATQAQAUAAAkIAAAKIhlAAQAAAVANAOQANAOARAAQAOAAAKgFQAJgHAHgIIAPAMQgSAdgmAAQgeAAgSgUgAgXgsQgKALgDAUIBKAAIAAgCQgBgTgJgLQgKgKgQAAQgPAAgKALg");
	this.shape_8.setTransform(48.15,166.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("ABPBNIAAhiQABgQgIgJQgHgHgRgBQgPAAgKAJQgIAIgCAPIAABjIgZAAIAAhiQAAgggggBQgaABgIAVIAABtIgaAAIAAiWIAYAAIABARQAQgTAcAAQAfgBALAZQAIgLALgGQAMgIARABQAygBAAA1IAABkg");
	this.shape_9.setTransform(21.15,166.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgrA6QgUgVABghIAAgEQgBgWAJgSQAJgRAPgKQAPgKARAAQAdAAARATQAQAUAAAkIAAAKIhlAAQAAAVANAOQANAOARAAQAOAAAKgFQAJgHAHgIIAPAMQgSAdgmAAQgeAAgSgUgAgXgsQgKALgDAUIBKAAIAAgCQgBgTgJgLQgKgKgQAAQgPAAgKALg");
	this.shape_10.setTransform(1.45,166.9);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgEBUQgJgKAAgTIAAhcIgbAAIAAgUIAbAAIAAglIAZAAIAAAlIAcAAIAAAUIgcAAIAABcQAAAJAEAEQADAFAKAAIAMgCIAAAVQgKADgKAAQgRAAgIgLg");
	this.shape_11.setTransform(-11.25,165.225);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgdBIQgOgHgIgLQgIgMAAgNIAaAAQABANAJAHQAKAIAPAAQAOAAAJgGQAJgGAAgKQAAgKgIgGQgIgFgSgFQgUgEgLgFQgLgFgGgJQgFgIAAgLQAAgTAPgMQAQgNAXAAQAaAAAPAOQAQAMAAAVIgaAAQAAgKgIgIQgJgIgOABQgNAAgIAFQgIAGAAAKQAAAJAIAGQAHAEASAFQATADAMAHQAMAEAGAJQAGAJAAAMQAAATgQAMQgQANgaAAQgRAAgOgGg");
	this.shape_12.setTransform(-22.825,166.9);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgtBpIgKgCIAAgVIAHABQANAAAIgFQAHgGAFgOIAFgPIg1iTIAcAAIAlBvIAjhvIAbAAIg8CsQgNAlgfAAg");
	this.shape_13.setTransform(-36.9,169.925);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgjBgQgSgIgKgOQgKgOAAgSIAbAAQAAATAOAKQANALAWAAQAVAAALgJQALgIAAgPQABgPgLgIQgLgIgagIQgigKgPgNQgQgPAAgVQAAgYATgPQATgQAdAAQAWAAAQAIQAQAIAJAOQAJAOAAARIgbAAQAAgSgMgLQgLgKgWAAQgSAAgLAJQgLAIAAAQQAAAMAKAJQALAIAYAHQAZAHAOAIQAOAIAIAMQAGALAAAPQAAAZgTAPQgTAPggAAQgUAAgSgIg");
	this.shape_14.setTransform(-51.95,164.325);

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

	// jawaban2
	this.darah = new lib.darah();
	this.darah.name = "darah";
	this.darah.setTransform(37.9,-153.35,1.3079,1.3079,0,0,0,0,-34);

	this.ekskresi = new lib.ekskresi();
	this.ekskresi.name = "ekskresi";
	this.ekskresi.setTransform(304.6,-153.35,1.3079,1.3079,0,0,0,0,-34);

	this.saraf = new lib.saraf();
	this.saraf.name = "saraf";
	this.saraf.setTransform(46.15,37.15,1.3079,1.3079,0,0,0,0,-34);

	this.nafas = new lib.nafas();
	this.nafas.name = "nafas";
	this.nafas.setTransform(-245.35,37.15,1.3079,1.3079,0,0,0,0,-34);

	this.cerna = new lib.cerna();
	this.cerna.name = "cerna";
	this.cerna.setTransform(-247.65,-152.05,1.3079,1.3079,0,0,0,-1.7,-33);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.cerna},{t:this.nafas},{t:this.saraf},{t:this.ekskresi},{t:this.darah}]},12).to({state:[]},1).wait(12));

	// Layer_4
	this.nafas_1 = new lib.drop3G4();
	this.nafas_1.name = "nafas_1";
	this.nafas_1.setTransform(-240.85,96.35,0.6844,0.6844,0,0,0,125.2,25.9);
	new cjs.ButtonHelper(this.nafas_1, 0, 1, 1);

	this.ekskresi_1 = new lib.drop3G3();
	this.ekskresi_1.name = "ekskresi_1";
	this.ekskresi_1.setTransform(309.95,-58.7,0.6214,0.6214,0,0,0,124.2,78.3);
	new cjs.ButtonHelper(this.ekskresi_1, 0, 1, 1);

	this.saraf_1 = new lib.drop3G5();
	this.saraf_1.name = "saraf_1";
	this.saraf_1.setTransform(49.75,98.3,0.6404,0.6404,0,0,0,117,30.8);
	new cjs.ButtonHelper(this.saraf_1, 0, 1, 1);

	this.darah_1 = new lib.drop3G2();
	this.darah_1.name = "darah_1";
	this.darah_1.setTransform(45.85,-79.75,0.7894,0.7894,0,0,0,135.4,25.2);
	new cjs.ButtonHelper(this.darah_1, 0, 1, 1);

	this.cerna_1 = new lib.drop3G1();
	this.cerna_1.name = "cerna_1";
	this.cerna_1.setTransform(-241.1,-88.45,0.6343,0.6343,0,0,0,27.4,-20.6);
	new cjs.ButtonHelper(this.cerna_1, 0, 1, 1);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.cerna_1},{t:this.darah_1},{t:this.saraf_1},{t:this.ekskresi_1},{t:this.nafas_1}]},12).to({state:[]},1).wait(12));

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
p.nominalBounds = new cjs.Rectangle(-436.6,-314.2,960.2,557.3);


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
	this.frame_24 = function() {
		this.gotoAndStop(0);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(12).call(this.frame_12).wait(12).call(this.frame_24).wait(1));

	// Layer_5
	this.exit = new lib.btnEit_1();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);
	this.exit._off = true;

	this.timeline.addTween(cjs.Tween.get(this.exit).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAJQgDgEAAgFQAAgFADgDQADgEAGAAQAHAAADAEQADADAAAFQAAAFgDAEQgDAEgHAAQgGAAgDgEg");
	this.shape.setTransform(-295.825,113.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgkBJQgOgNgCgWIAUAAQACAPAJAHQAIAIANAAQAOAAAJgLQAIgKAAgSQAAgRgJgKQgJgJgOAAQgOAAgIAGIgGAEIgRgEIAJhTIBVAAIAAATIhDAAIgFAuQAMgHAPAAQAXAAANAPQAOAOAAAaQAAAagOAPQgOAPgZAAQgWAAgOgMg");
	this.shape_1.setTransform(-304.975,106.275);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgJAJQgDgEAAgFQAAgFADgDQADgEAGAAQAHAAADAEQADADAAAFQAAAFgDAEQgDAEgHAAQgGAAgDgEg");
	this.shape_2.setTransform(-295.825,32.975);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAQBUIAAgnIhMAAIAAgMIBLh0IAWAAIAABuIAYAAIAAASIgYAAIAAAngAANgyIgwBNIAzAAIAAhRg");
	this.shape_3.setTransform(-305.375,25.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJAJQgDgEAAgFQAAgFADgDQADgEAGAAQAHAAADAEQADADAAAFQAAAFgDAEQgDAEgHAAQgGAAgDgEg");
	this.shape_4.setTransform(-295.825,-7.175);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AglBJQgPgMAAgWIAVAAQAAAOAJAIQAIAIAOAAQAPAAAJgIQAIgIAAgQQAAgOgJgIQgJgIgQAAIgQAAIAAgQIAQAAQAOgBAJgHQAIgIAAgNQAAgegdAAQgNAAgIAIQgJAIAAANIgVAAQAAgUAPgNQAOgOAWAAQAYAAANANQAOAMAAAXQAAALgHAKQgHAKgNAGQAOADAIAKQAHAKAAAPQAAAWgPAOQgOAOgYAAQgXAAgOgOg");
	this.shape_5.setTransform(-305.625,-14.45);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgJAJQgDgEAAgFQAAgFADgDQADgEAGAAQAHAAADAEQADADAAAFQAAAFgDAEQgDAEgHAAQgGAAgDgEg");
	this.shape_6.setTransform(-295.825,-47.425);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("Ag0BVIAAgPIA5hBQANgNAFgKQAFgJAAgKQAAgNgIgIQgIgJgNAAQgPAAgJAJQgJAJAAARIgWAAQAAgYAQgOQAOgOAZAAQAXAAAOAMQANAMAAAVQAAAZgfAhIgtAxIBUAAIAAARg");
	this.shape_7.setTransform(-305.325,-54.825);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgJAJQgDgEAAgFQAAgFADgDQADgEAGAAQAHAAADAEQADADAAAFQAAAFgDAEQgDAEgHAAQgGAAgDgEg");
	this.shape_8.setTransform(-295.825,-127.875);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AALBVIAAiOIgqAQIAAgUIA8gWIADAAIAACog");
	this.shape_9.setTransform(-306.875,-135.2);

	this.text = new cjs.Text("", "10px 'Roboto-Regular'", "#FFFFFF");
	this.text.lineHeight = 17;
	this.text.parent = this;
	this.text.setTransform(-294.6,-141.75);

	this.instance = new lib.RestoreIcon("single",0);
	this.instance.setTransform(-103.15,-54.75,0.8958,0.8958,0,0,0,-0.1,-0.1);
	this.instance.alpha = 0.75;

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_10.setTransform(9.925,143.925);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAVAAIAAB8gAgIg/QgEgEAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQACAEABAFQgBAFgCAEQgEADgGAAQgFAAgDgDg");
	this.shape_11.setTransform(4.15,144.275);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAARAFAKIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_12.setTransform(-5.225,146.55);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAXAAIAAAQIgXAAIAABMQAAAIAEAEQACADAIAAIAKAAIAAARQgIACgJAAQgOAAgGgJg");
	this.shape_13.setTransform(-15.85,145.15);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgPQAHgPANgHQANgJAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALALAOAAQAMAAAIgEQAIgFAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAJgCASIA+AAIAAgCQgBgRgIgIQgIgJgNAAQgMgBgJAKg");
	this.shape_14.setTransform(-25.375,146.55);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgmBIQgOgSAAgcIAAgCQAAgcAOgRQANgSAXAAQAVAAAMAPIAAhBIAWAAIAACxIgUAAIgBgOQgNAQgWAAQgVAAgOgSgAgWgJQgIALAAAYQAAAWAIAMQAJAMAPgBQAUAAAJgSIAAg4QgJgRgUAAQgPAAgJALg");
	this.shape_15.setTransform(-38.775,144.05);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("Ag0BYIAAisIATAAIABAOQAOgRAWAAQAWAAANARQAOARAAAfIAAACQAAAbgOASQgMARgXAAQgVAAgOgOIAAA8gAgfgzIAAA7QAKARAUAAQAPAAAIgNQAKgMgBgXQABgVgKgMQgIgMgQAAQgSAAgLARg");
	this.shape_16.setTransform(-57.4,148.825);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_17.setTransform(-70.875,146.675);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("Ag0BYIAAisIATAAIABAOQAOgRAWAAQAXAAAMARQAOARAAAfIAAACQAAAbgOASQgNARgWAAQgVAAgOgOIAAA8gAgfgzIAAA7QAKARAUAAQAPAAAIgNQAJgMAAgXQAAgVgJgMQgIgMgPAAQgUAAgKARg");
	this.shape_18.setTransform(-89.6,148.825);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgcIAAgBQAAgSAIgPQAGgPANgIQANgIAQAAQAZAAAQASQAQARAAAdIAAABQAAASgHAPQgHAPgNAHQgNAJgRAAQgZAAgPgSgAgZgiQgKANAAAWQAAAVAKANQAKAMAPAAQAQABAKgNQAJgNAAgWQABgUgLgOQgJgMgQAAQgPAAgKAMg");
	this.shape_19.setTransform(-103.25,146.55);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("Ag0BYIAAisIATAAIABAOQAOgRAWAAQAWAAANARQAOARAAAfIAAACQAAAbgOASQgMARgXAAQgVAAgOgOIAAA8gAgfgzIAAA7QAKARAUAAQAPAAAIgNQAKgMgBgXQABgVgKgMQgIgMgQAAQgSAAgLARg");
	this.shape_20.setTransform(-116.35,148.825);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_21.setTransform(-135.625,146.425);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAARAFAKIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_22.setTransform(-148.625,146.55);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_23.setTransform(-160.2,143.925);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_24.setTransform(-169.925,143.925);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_25.setTransform(-179.375,146.675);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgeIAAgCQAAgSAHgPQAHgOAMgIQANgIAQAAQAVAAAOANQAOAMABAVIgUAAQgBgMgJgJQgIgHgMAAQgPAAgJAMQgJALAAAXIAAACQAAAWAJAMQAJAMAPgBQAMABAIgIQAJgGABgLIAUAAQgBALgHAKQgGAJgMAGQgLAGgNAAQgYAAgPgRg");
	this.shape_26.setTransform(-191.825,146.55);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_27.setTransform(-204.625,146.425);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_28.setTransform(-217.675,146.675);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_29.setTransform(-234.525,146.425);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgPQAHgPANgHQANgJAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALALAOAAQAMAAAIgEQAIgFAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAJgCASIA+AAIAAgCQgBgRgIgIQgIgJgNAAQgMgBgJAKg");
	this.shape_30.setTransform(-250.925,146.55);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_31.setTransform(-267.625,146.425);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgVAAIAAixIAVAAIAABrIAMgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_32.setTransform(394.5,103.675);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_33.setTransform(381.175,106.425);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIAEAEQADADAHABIAKgBIAAARQgIACgJAAQgNAAgHgJg");
	this.shape_34.setTransform(370.5,104.9);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_35.setTransform(360.525,106.175);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_36.setTransform(347.425,106.425);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgPBBQgRgBgKgKQgKgKABgPQABgUAQgKQAQgMAaAAIAVAAIACgJQABgMgFgGQgGgHgLAAQgKAAgIAFQgIAGgCAJIgVAAQABgLAHgJQAIgIAMgFQALgEAMAAQAUAAALAMQAKALgBATIgKA9IgBAJQAAAGABAGIAAACIgVAAIgBgGIAAgHQgQAQgSAAIgBAAgAgSAIQgLAGgBALQgBAJAFAGQAFAGAKAAQAKAAAIgFQAJgFAGgJIAFgZIgQgBQgTAAgKAHg");
	this.shape_37.setTransform(311.355,106.3008);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgWBaQgRgBgKgNQgKgNgBgWIAAgQQADgUAIgOQAIgPAMgIQAMgIAPABQATAAAMAPIAMhBIAVAAIgfCwIgTAAIACgNQgOAQgVAAIgBAAgAgUgOQgKAIgEANQgFAOgBAPQAAARAGAJQAHAJAMAAQARABAOgTIAKg4QgHgSgSAAQgMAAgJAHg");
	this.shape_38.setTransform(299.4917,103.8007);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgYBVIAVh8IAUAAIgVB8gAAEg/QgEgDAAgGQABgFADgEQADgDAGAAQAFgBAEAEQADADAAAGQAAAFgDAEQgEADgFAAIgCAAQgEAAgDgDg");
	this.shape_39.setTransform(289.825,104.0219);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgZBZIAeixIAVAAIgeCxg");
	this.shape_40.setTransform(284.225,103.675);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgoAwQgNgRACgbIAAgEQACgSAJgPQAJgPAOgJQANgHAOAAQATAAALANQALAMABAWIAAAOIgCAJIhQAAQgCARAHAMQAIAMAPABQASAAAPgSIAMALQgHALgNAGQgMAHgPAAQgXgBgNgQgAgNgmQgKAKgFARIA8AAIAAgBQACgOgHgLQgGgJgMgBQgMABgKAIg");
	this.shape_41.setTransform(275.0117,106.3);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AAUBAIAOhRIAAgLQgCgQgRAAQgSgBgOAVIgQBYIgVAAIAWh8IAUAAIgDAPQAQgSAVAAQASABAIAMQAJALgCAWIgOBRg");
	this.shape_42.setTransform(261.844,106.1743);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AAUBAIAOhRIAAgLQgCgQgRAAQgSgBgOAVIgQBYIgVAAIAWh8IAUAAIgDAPQAQgSAVAAQASABAIAMQAJALgCAWIgOBRg");
	this.shape_43.setTransform(249.044,106.1743);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AAyBUIgIgsIhCAAIgYAsIgXAAIBbinIATAAIAhCngAgPAWIA3AAIgPhOg");
	this.shape_44.setTransform(234.35,104.15);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_45.setTransform(194.925,106.175);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_46.setTransform(177.975,106.425);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_47.setTransform(168.575,103.675);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_48.setTransform(162.775,103.675);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgIg/QgDgEAAgFQAAgFADgEQADgDAFAAQAGAAADADQADAEAAAFQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_49.setTransform(157,104.025);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgzBUIAAinIBnAAIAAASIhRAAIAAA6IBGAAIAAARIhGAAIAABKg");
	this.shape_50.setTransform(148.175,104.15);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_51.setTransform(113,103.675);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQAEAEAAAFQAAAFgEAEQgDADgGAAQgGAAgDgDg");
	this.shape_52.setTransform(103.3,104.025);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAXAAIAAAQIgXAAIAABMQAAAIAEAEQACADAIABIAKgBIAAARQgIACgJAAQgOAAgGgJg");
	this.shape_53.setTransform(96.2,104.9);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgJQgHgKAAgLIAWAAQAAALAIAGQAIAGAMABQANAAAHgGQAHgFAAgHQAAgKgGgEQgHgFgPgEQgQgDgKgEQgJgFgFgHQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgHgLAAQgLAAgHAGQgGAFAAAIQAAAIAGAEQAGADAPAFQAQADAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgGg");
	this.shape_54.setTransform(86.575,106.3);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAVAAIAAB8gAgIg/QgEgEAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQACAEAAAFQAAAFgCAEQgEADgGAAQgFAAgDgDg");
	this.shape_55.setTransform(77.6,104.025);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_56.setTransform(71.325,106.175);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgbIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALAMAOAAQAMAAAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgRgIgJQgIgIgNgBQgMAAgJAKg");
	this.shape_57.setTransform(60.625,106.3);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAXAAIAAAQIgXAAIAABMQAAAIADAEQADADAIABIAKgBIAAARQgJACgHAAQgPAAgGgJg");
	this.shape_58.setTransform(50.05,104.9);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_59.setTransform(41.4,103.675);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_60.setTransform(28.125,106.3);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_61.setTransform(18.275,106.175);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_62.setTransform(7.175,106.3);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_63.setTransform(-4.4,103.675);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgbIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALAMAOAAQAMAAAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgRgIgJQgIgIgNgBQgMAAgJAKg");
	this.shape_64.setTransform(-40.075,106.3);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_65.setTransform(-53.325,108.625);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_66.setTransform(-66.175,106.175);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_67.setTransform(-79.175,106.3);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_68.setTransform(-89.025,106.175);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgiBMQgPgJgJgSQgIgTgBgXIAAgMQAAgYAJgSQAIgTAQgKQAPgKATAAQAUAAAQAKQAPAKAIASQAJATAAAYIAAAKQAAAZgJASQgIATgPAJQgPAKgVAAQgTAAgPgKgAgggzQgMAQgBAdIAAALQAAAdANARQAMAQAUAAQAWAAALgPQAMgQABgdIAAgMQAAgegMgQQgMgPgWgBQgUABgMAPg");
	this.shape_69.setTransform(-101.875,104.15);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgVAAIAAixIAVAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_70.setTransform(-137.95,103.675);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_71.setTransform(-151.225,106.3);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIAEAEQADADAHABIAKgBIAAARQgIACgJAAQgNAAgHgJg");
	this.shape_72.setTransform(-161.85,104.9);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgoAvQgQgRAAgdIAAgBQAAgSAIgPQAGgPANgIQANgIAQAAQAZAAAQASQAQARAAAdIAAACQAAARgHAPQgHAOgNAJQgNAIgRAAQgZAAgPgSgAgZghQgKAMAAAXQAAAUAKANQAKANAPAAQAQgBAKgNQAJgMAAgWQABgVgLgMQgJgOgQAAQgPAAgKAOg");
	this.shape_73.setTransform(-172.1,106.3);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_74.setTransform(-184,103.675);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_75.setTransform(-220.125,106.175);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_76.setTransform(-233.125,106.3);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_77.setTransform(-244.7,103.675);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgbIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALAMAOAAQAMAAAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgRgIgJQgIgIgNgBQgMAAgJAKg");
	this.shape_78.setTransform(-257.575,106.3);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgKBUIAAiVIg2AAIAAgSICBAAIAAASIg2AAIAACVg");
	this.shape_79.setTransform(-270.925,104.15);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_80.setTransform(-226.925,68.425);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_81.setTransform(-239.775,65.975);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgLgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_82.setTransform(-252.775,66.1);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_83.setTransform(-262.125,63.475);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_84.setTransform(-271.525,66.225);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgVAAIAAixIAVAAIAABrIAMgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_85.setTransform(394.05,23.225);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_86.setTransform(380.775,25.85);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgeIAAgDQAAgSAHgOQAHgOAMgIQANgIAQAAQAVAAAOANQAOAMABAVIgUAAQgBgMgJgJQgIgHgMgBQgPAAgJANQgJALAAAXIAAADQAAAVAJAMQAJAMAPAAQAMAAAIgIQAJgGABgLIAUAAQgBALgHAKQgGAJgMAGQgLAGgNAAQgYAAgPgRg");
	this.shape_87.setTransform(368.325,25.85);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_88.setTransform(355.525,25.85);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_89.setTransform(336.3,23.225);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_90.setTransform(322.925,25.975);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgQIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAXAAIAAAQIgXAAIAABMQAAAIADAEQADADAIABIAKgBIAAARQgJACgIAAQgOAAgGgJg");
	this.shape_91.setTransform(312.3,24.45);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_92.setTransform(302.275,25.725);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_93.setTransform(289.225,25.975);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AgmBIQgOgSAAgcIAAgCQAAgcAOgSQANgRAXAAQAVAAAMAPIAAhBIAWAAIAACxIgUAAIgBgOQgNAQgWAAQgVAAgOgSgAgWgIQgIALAAAYQAAAUAIANQAJALAPABQAUgBAJgRIAAg5QgJgRgUAAQgPAAgJAMg");
	this.shape_94.setTransform(268.075,23.35);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_95.setTransform(255.225,25.85);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgcIAAgBQAAgSAHgPQAIgPANgIQAMgIAQAAQAaAAAPASQAQARAAAdIAAACQAAARgHAPQgHAOgNAIQgNAJgRAAQgYAAgQgSgAgZghQgJAMgBAXQABAUAJANQAKANAPAAQARAAAJgNQAKgNAAgWQAAgUgKgNQgKgOgQAAQgPAAgKAOg");
	this.shape_96.setTransform(242.05,25.85);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_97.setTransform(232.375,23.225);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgPQAHgOANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALAMAOAAQAMAAAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgQgIgKQgIgIgNgBQgMAAgJAKg");
	this.shape_98.setTransform(223.425,25.85);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_99.setTransform(213.675,25.725);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_100.setTransform(198.425,23.225);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgcIAAgBQAAgSAIgPQAGgPANgIQANgIAQAAQAZAAAQASQAQARAAAdIAAACQAAARgHAPQgHAOgNAIQgNAJgRAAQgZAAgPgSgAgZghQgKAMAAAXQAAAUAKANQAKANAPAAQAQAAAKgNQAJgNAAgWQABgUgLgNQgJgOgQAAQgPAAgKAOg");
	this.shape_101.setTransform(188.8,25.85);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AgfBJIgBAPIgUAAIAAixIAVAAIAABCQAOgQAVAAQAXAAANARQANARAAAeIAAACQAAAcgNASQgNARgXAAQgWAAgNgRgAgfgBIAAA1QALAUAUAAQAOAAAJgMQAIgMAAgYQAAgWgIgLQgIgMgPABQgVAAgKATg");
	this.shape_102.setTransform(175.7,23.35);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_103.setTransform(158.475,25.725);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgcIAAgBQAAgSAIgPQAGgPAOgIQAMgIAQAAQAaAAAPASQAQARAAAdIAAACQAAARgHAPQgHAOgNAIQgNAJgRAAQgYAAgQgSgAgZghQgKAMAAAXQAAAUAKANQAKANAPAAQARAAAJgNQAJgNAAgWQABgUgKgNQgKgOgQAAQgPAAgKAOg");
	this.shape_104.setTransform(141.35,25.85);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgQIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAXAAIAAAQIgXAAIAABMQAAAIAEAEQACADAIABIAKgBIAAARQgIACgJAAQgOAAgGgJg");
	this.shape_105.setTransform(130.4,24.45);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_106.setTransform(112.725,25.725);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_107.setTransform(99.725,25.85);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_108.setTransform(88.15,23.225);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgPQAHgOANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALAMAOAAQAMAAAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgQgIgKQgIgIgNgBQgMAAgJAKg");
	this.shape_109.setTransform(75.325,25.85);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgQIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIADAEQAEADAHABIAKgBIAAARQgJACgHAAQgOAAgHgJg");
	this.shape_110.setTransform(64.75,24.45);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgPAVQALgPAAgPIAAgUIAUAAIAAARQAAAMgGALQgFALgIAIg");
	this.shape_111.setTransform(50.9,32.5);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AAcBZIAAhTQAAgNgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAIIAABZIgVAAIAAixIAVAAIAABEQAPgSAVAAQAoAAAAAsIAABTg");
	this.shape_112.setTransform(42.425,23.225);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQADAEABAFQgBAFgDAEQgDADgGAAQgGAAgDgDg");
	this.shape_113.setTransform(33,23.575);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AgmBIQgOgSAAgcIAAgCQAAgcAOgSQANgRAXAAQAVAAAMAPIAAhBIAWAAIAACxIgUAAIgBgOQgNAQgWAAQgVAAgOgSgAgWgIQgIALAAAYQAAAUAIANQAJALAPABQAUgBAJgRIAAg5QgJgRgUAAQgPAAgJAMg");
	this.shape_114.setTransform(23.125,23.35);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_115.setTransform(10.275,25.725);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgIg/QgDgEAAgFQAAgFADgEQADgDAFAAQAGAAADADQADAEAAAFQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_116.setTransform(0.85,23.575);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgQIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIAEAEQADADAHABIAKgBIAAARQgIACgJAAQgNAAgHgJg");
	this.shape_117.setTransform(-6.25,24.45);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_118.setTransform(-24.325,28.175);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_119.setTransform(-37.175,25.725);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAVAAIAAB8gAgIg/QgEgEAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQACAEAAAFQAAAFgCAEQgEADgGAAQgFAAgDgDg");
	this.shape_120.setTransform(-46.6,23.575);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_121.setTransform(-52.425,23.225);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_122.setTransform(-61.775,25.85);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgJQgHgKAAgLIAWAAQAAALAIAGQAIAGAMABQANAAAHgGQAHgEAAgJQAAgJgGgEQgHgFgPgDQgQgEgKgEQgJgFgFgHQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgHgLAAQgLAAgHAGQgGAFAAAIQAAAIAGAEQAGAEAPAEQAQADAKAFQAKAEAFAHQAFAHAAAKQAAARgOAKQgNAKgWAAQgOAAgLgGg");
	this.shape_123.setTransform(-74.325,25.85);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_124.setTransform(-94.975,28.175);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_125.setTransform(-107.825,25.725);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAVAAIAAB8gAgIg/QgEgEAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQACAEAAAFQAAAFgCAEQgEADgGAAQgFAAgDgDg");
	this.shape_126.setTransform(-117.25,23.575);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_127.setTransform(-126.675,25.725);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_128.setTransform(-139.725,25.975);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgVAAIAAixIAVAAIAABrIAMgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_129.setTransform(-151.35,23.225);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_130.setTransform(-171,23.225);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_131.setTransform(-184.275,25.85);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgQIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIADAEQAEADAHABIAKgBIAAARQgJACgHAAQgOAAgHgJg");
	this.shape_132.setTransform(-194.9,24.45);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgcIAAgBQAAgSAHgPQAIgPAMgIQANgIAQAAQAZAAAQASQAQARAAAdIAAACQAAARgHAPQgHAOgNAIQgNAJgRAAQgZAAgPgSgAgZghQgJAMAAAXQAAAUAJANQAKANAPAAQAQAAAKgNQAKgNAAgWQAAgUgLgNQgJgOgQAAQgPAAgKAOg");
	this.shape_133.setTransform(-205.1,25.85);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("AAmBUIg7hOIgUAVIAAA5IgXAAIAAinIAXAAIAABTIBJhTIAbAAIhBBKIBHBdg");
	this.shape_134.setTransform(-218.25,23.7);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_135.setTransform(-240.825,25.85);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_136.setTransform(-252.4,23.225);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQAEAEAAAFQAAAFgEAEQgDADgGAAQgGAAgDgDg");
	this.shape_137.setTransform(-262.1,23.575);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AgmBIQgOgNAAgXIAWAAQAAAPAIAIQAIAIAOAAQAOAAAIgJQAJgIAAgQIAAh2IAWAAIAAB2QAAAYgOANQgPAOgYAAQgYAAgOgNg");
	this.shape_138.setTransform(-272.075,23.825);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_139.setTransform(199.125,-14.425);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_140.setTransform(186.125,-14.3);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_141.setTransform(173.175,-14.425);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_142.setTransform(160.175,-14.3);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_143.setTransform(148.6,-16.925);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgJQgHgKAAgLIAWAAQAAALAIAGQAIAGAMABQANAAAHgGQAHgFAAgHQAAgKgGgEQgHgFgPgEQgQgDgKgEQgJgFgFgHQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgHgLAAQgLAAgHAGQgGAFAAAIQAAAIAGAEQAGADAPAFQAQADAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgGg");
	this.shape_144.setTransform(129.775,-14.3);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_145.setTransform(117.225,-14.3);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIADAEQAEADAHABIAKgBIAAARQgJACgHAAQgOAAgHgJg");
	this.shape_146.setTransform(106.6,-15.7);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_147.setTransform(96.625,-14.3);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_148.setTransform(79.15,-16.925);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_149.setTransform(65.875,-14.3);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAXAAIAAAQIgXAAIAABMQAAAIAEAEQACADAIABIAKgBIAAARQgIACgJAAQgOAAgGgJg");
	this.shape_150.setTransform(55.25,-15.7);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("AgoAvQgQgRAAgdIAAgBQAAgSAIgPQAGgPAOgIQAMgIAQAAQAaAAAPASQAQARAAAdIAAACQAAARgHAPQgHAOgNAJQgNAIgRAAQgYAAgQgSgAgZghQgKAMAAAXQAAAUAKANQAKANAPAAQARgBAJgNQAJgMAAgWQABgVgKgMQgKgOgQAAQgPAAgKAOg");
	this.shape_151.setTransform(45.05,-14.3);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgVAAIAAixIAVAAIAABrIAMgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_152.setTransform(33.15,-16.925);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_153.setTransform(13.925,-14.3);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("AgmBIQgOgSAAgcIAAgCQAAgcAOgSQANgRAXAAQAVAAAMAPIAAhBIAWAAIAACxIgUAAIgBgOQgNAQgWAAQgVAAgOgSgAgWgIQgIALAAAYQAAAVAIALQAJAMAPABQAUgBAJgRIAAg5QgJgRgUgBQgPAAgJANg");
	this.shape_154.setTransform(0.525,-16.8);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_155.setTransform(-12.325,-14.3);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("Ag0BYIAAisIAUAAIAAAOQAOgRAWAAQAWAAANARQAOARAAAfIAAACQAAAbgOASQgMARgXAAQgWAAgNgOIAAA8gAgfgzIAAA7QAKARAUAAQAOAAAJgNQAKgMgBgXQABgVgKgMQgIgMgQAAQgSAAgLARg");
	this.shape_156.setTransform(-25.1,-12.025);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_157.setTransform(-44.425,-14.425);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_158.setTransform(-57.425,-14.3);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgVAAIAAixIAVAAIAABrIAMgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_159.setTransform(-69,-16.925);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_160.setTransform(-80.95,-16.925);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_161.setTransform(-94.275,-14.175);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FFFFFF").s().p("AgXBsIAAgQIAKABQAHAAAEgFQADgDAAgKIAAiLIAVAAIAACLQAAAjggABQgHAAgGgDgAAChZQgDgDAAgFQAAgFADgEQADgDAGgBQAGABADADQAEAEAAAFQAAAFgEADQgDAEgGAAQgGAAgDgEg");
	this.shape_162.setTransform(-104.825,-14.05);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_163.setTransform(-112.925,-14.425);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_164.setTransform(-125.975,-14.175);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIAEAEQADADAHABIAKgBIAAARQgIACgJAAQgNAAgHgJg");
	this.shape_165.setTransform(-136.65,-15.7);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQADAEAAAFQAAAFgDAEQgDADgGAAQgGAAgDgDg");
	this.shape_166.setTransform(-143.05,-16.575);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FFFFFF").s().p("AgmBIQgOgSAAgcIAAgCQAAgcAOgSQANgRAXAAQAVAAAMAPIAAhBIAWAAIAACxIgUAAIgBgOQgNAQgWAAQgVAAgOgSgAgWgIQgIALAAAYQAAAVAIALQAJAMAPABQAUgBAJgRIAAg5QgJgRgUgBQgPAAgJANg");
	this.shape_167.setTransform(-152.975,-16.8);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALAMAOAAQAMAAAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgRgIgJQgIgIgNgBQgMAAgJAKg");
	this.shape_168.setTransform(-171.275,-14.3);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_169.setTransform(-188.025,-14.425);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_170.setTransform(-204.825,-14.3);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_171.setTransform(-218.175,-11.975);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_172.setTransform(-233.875,-14.425);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#FFFFFF").s().p("AgoAvQgQgRAAgdIAAgBQAAgSAHgPQAIgPAMgIQANgIAQAAQAZAAAQASQAQARAAAdIAAACQAAARgHAPQgHAOgNAJQgNAIgRAAQgYAAgQgSgAgZghQgKAMABAXQgBAUAKANQAKANAPAAQAQgBAKgNQAKgMgBgWQAAgVgKgMQgJgOgQAAQgPAAgKAOg");
	this.shape_173.setTransform(-245.25,-14.3);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgVAAIAAixIAVAAIAABrIALgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_174.setTransform(-257.15,-16.925);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#FFFFFF").s().p("AgdBQQgPgHgIgLQgIgMAAgPIAWAAQAAAQAMAIQALAJASAAQARAAAKgHQAJgHAAgNQAAgMgJgHQgIgGgWgHQgdgIgNgLQgNgMAAgSQAAgTAQgNQAQgNAZgBQARABANAGQAOAHAIAMQAHAMAAAOIgWAAQAAgQgKgJQgKgJgRAAQgQABgJAHQgJAHAAANQAAAKAJAHQAIAIAUAGQAVAFAMAGQAMAIAGAJQAFAKAAAMQAAAVgQAMQgQAMgaAAQgRAAgPgGg");
	this.shape_175.setTransform(-270.975,-16.45);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMgBAIgFQAIgEAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgQgIgKQgIgJgNAAQgMAAgJAKg");
	this.shape_176.setTransform(119.325,-54.55);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_177.setTransform(102.625,-54.675);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgTAPgLQAPgLAaABIAVAAIAAgKQAAgMgHgGQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_178.setTransform(85.775,-54.55);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_179.setTransform(72.475,-52.225);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAVAAIAAB8gAgIg/QgEgEAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDAEQgEADgGAAQgFAAgDgDg");
	this.shape_180.setTransform(57.25,-56.825);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_181.setTransform(47.475,-52.225);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_182.setTransform(34.625,-54.675);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgTAPgLQAPgLAaABIAVAAIAAgKQAAgMgHgGQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_183.setTransform(21.625,-54.55);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_184.setTransform(12.275,-57.175);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_185.setTransform(2.875,-54.425);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_186.setTransform(-14.7,-57.175);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_187.setTransform(-28.025,-54.425);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgPIAAhNIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAXAAIAAARIgXAAIAABNQAAAHADAEQADAEAIAAIAKgCIAAARQgJADgIAAQgOAAgGgJg");
	this.shape_188.setTransform(-38.7,-55.95);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_189.setTransform(-48.675,-54.675);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_190.setTransform(-61.725,-54.425);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_191.setTransform(-136.225,-57.175);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#FFFFFF").s().p("AgoAvQgQgRAAgeIAAAAQAAgTAHgOQAIgPANgIQAMgIAQAAQAaAAAPASQAQASAAAcIAAACQAAASgHAOQgHAOgNAJQgNAIgRAAQgYAAgQgSgAgZghQgKAMAAAXQAAAUAKANQAKANAPAAQARAAAJgOQAKgMAAgWQAAgVgKgMQgKgNgQgBQgPABgKANg");
	this.shape_192.setTransform(-145.85,-54.55);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#FFFFFF").s().p("AgfBJIgBAOIgUAAIAAiwIAWAAIAABCQAMgQAXAAQAWAAANARQANARAAAdIAAADQAAAcgNASQgNARgWAAQgXAAgNgRgAgegBIAAA1QAJATAVABQAPAAAIgMQAJgMAAgYQAAgWgJgLQgIgMgPAAQgVAAgJAUg");
	this.shape_193.setTransform(-158.95,-57.05);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_194.setTransform(-176.175,-54.675);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#FFFFFF").s().p("AgoAvQgQgRAAgeIAAAAQAAgTAHgOQAHgPANgIQANgIAQAAQAaAAAPASQAQASAAAcIAAACQAAASgHAOQgHAOgNAJQgNAIgRAAQgZAAgPgSgAgZghQgJAMAAAXQAAAUAJANQAKANAPAAQAQAAAKgOQAKgMAAgWQgBgVgJgMQgKgNgQgBQgPABgKANg");
	this.shape_195.setTransform(-193.3,-54.55);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgPIAAhNIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAXAAIAAARIgXAAIAABNQAAAHADAEQADAEAIAAIAKgCIAAARQgJADgHAAQgPAAgGgJg");
	this.shape_196.setTransform(-204.2,-55.95);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_197.setTransform(-220.125,-54.675);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgTAPgLQAPgLAaABIAVAAIAAgKQAAgMgHgGQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_198.setTransform(-233.125,-54.55);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_199.setTransform(-244.7,-57.175);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMgBAIgFQAIgEAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgQgIgKQgIgJgNAAQgMAAgJAKg");
	this.shape_200.setTransform(-257.575,-54.55);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#FFFFFF").s().p("AgKBUIAAiVIg2AAIAAgSICBAAIAAASIg2AAIAACVg");
	this.shape_201.setTransform(-270.925,-56.7);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgIg/QgDgEAAgFQAAgFADgEQADgDAFAAQAGAAADADQADAEAAAFQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_202.setTransform(145.3,-97.075);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAABIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_203.setTransform(135.925,-94.8);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_204.setTransform(122.975,-94.675);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#FFFFFF").s().p("AgYA8QgMgGgGgKQgHgJAAgLIAWAAQAAALAIAGQAIAHAMgBQANAAAHgEQAHgFAAgJQAAgIgGgFQgHgFgPgEQgQgDgKgEQgJgFgFgGQgEgHAAgJQAAgQANgKQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgGgLAAQgLAAgHAFQgGAFAAAIQAAAIAGAEQAGAEAPADQAQAEAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgFg");
	this.shape_205.setTransform(110.375,-94.8);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgPQAHgPANgHQANgJAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABATAKALQALAMAOgBQAMAAAIgEQAIgFAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAKgCARIA+AAIAAgCQgBgQgIgJQgIgKgNABQgMAAgJAJg");
	this.shape_206.setTransform(98.275,-94.8);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#FFFFFF").s().p("AgYA8QgMgGgGgKQgHgJAAgLIAWAAQAAALAIAGQAIAHAMgBQANAAAHgEQAHgFAAgJQAAgIgGgFQgHgFgPgEQgQgDgKgEQgJgFgFgGQgEgHAAgJQAAgQANgKQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgGgLAAQgLAAgHAFQgGAFAAAIQAAAIAGAEQAGAEAPADQAQAEAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgFg");
	this.shape_207.setTransform(85.775,-94.8);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_208.setTransform(66.875,-92.475);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_209.setTransform(54.025,-94.925);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAABIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_210.setTransform(41.025,-94.8);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#FFFFFF").s().p("AglBXIgIgBIAAgRIAGAAQALAAAGgEQAGgFAEgLIAEgNIgsh7IAXAAIAeBdIAdhdIAXAAIgyCQQgLAfgZAAg");
	this.shape_211.setTransform(28.925,-92.275);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#FFFFFF").s().p("AgPBBQgRgBgKgKQgKgKABgPQABgUAQgKQAQgMAaAAIAVAAIACgJQABgMgFgGQgGgHgLAAQgKAAgIAFQgIAGgCAJIgVAAQABgLAHgJQAIgIAMgFQALgEAMAAQAUAAALAMQAKALgBATIgKA9IgBAJQAAAGABAGIAAACIgVAAIgBgGIAAgHQgQAQgSAAIgBAAgAgSAIQgLAGgBALQgBAJAFAGQAFAGAKAAQAKAAAIgFQAJgFAGgJIAFgZIgQgBQgTAAgKAHg");
	this.shape_212.setTransform(10.705,-94.7992);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#FFFFFF").s().p("AgWBaQgRgBgKgNQgKgNgBgWIAAgQQADgUAIgOQAIgPAMgIQAMgIAPABQATAAAMAPIAMhBIAVAAIgfCwIgTAAIACgNQgOAQgVAAIgBAAgAgUgOQgKAIgEANQgFAOgBAPQAAARAGAJQAHAJAMAAQARABAOgTIAKg4QgHgSgSAAQgMAAgJAHg");
	this.shape_213.setTransform(-1.1583,-97.2993);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#FFFFFF").s().p("AgYBVIAVh8IAUAAIgVB8gAAEg/QgEgDAAgGQABgFADgEQADgDAGAAQAFgBAEAEQADADAAAGQAAAFgDAEQgEADgFAAIgCAAQgEAAgDgDg");
	this.shape_214.setTransform(-10.825,-97.0781);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#FFFFFF").s().p("AgZBZIAeixIAVAAIgeCxg");
	this.shape_215.setTransform(-16.475,-97.425);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#FFFFFF").s().p("AgoAvQgNgQACgaIAAgFQACgSAJgPQAJgQAOgHQANgIAOAAQATAAALANQALANABAUIAAAQIgCAIIhQAAQgCARAHAMQAIAMAPAAQASABAPgRIAMAKQgHALgNAHQgMAGgPAAQgXAAgNgSgAgNglQgKAJgFASIA8AAIAAgCQACgOgHgLQgGgJgMAAQgMgBgKAKg");
	this.shape_216.setTransform(-25.6883,-94.8);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#FFFFFF").s().p("AAUBAIAOhRIAAgLQgCgQgRAAQgSgBgOAVIgQBYIgVAAIAWh8IAUAAIgDAPQAQgSAVAAQASABAIAMQAJALgCAWIgOBRg");
	this.shape_217.setTransform(-38.806,-94.9257);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#FFFFFF").s().p("AAUBAIAOhRIAAgLQgCgQgRAAQgSgBgOAVIgQBYIgVAAIAWh8IAUAAIgDAPQAQgSAVAAQASABAIAMQAJALgCAWIgOBRg");
	this.shape_218.setTransform(-51.606,-94.9257);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#FFFFFF").s().p("AAzBUIgJgsIhDAAIgWAsIgYAAIBainIAUAAIAhCngAgPAWIA3AAIgPhOg");
	this.shape_219.setTransform(-66.35,-96.95);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_220.setTransform(-88.825,-94.925);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_221.setTransform(-105.775,-94.675);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_222.setTransform(-115.175,-97.425);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_223.setTransform(-120.975,-97.425);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQADAEABAFQgBAFgDAEQgDADgGAAQgGAAgDgDg");
	this.shape_224.setTransform(-126.75,-97.075);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#FFFFFF").s().p("AgzBUIAAinIBnAAIAAASIhRAAIAAA5IBGAAIAAARIhGAAIAABLg");
	this.shape_225.setTransform(-135.575,-96.95);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_226.setTransform(-153.85,-97.425);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQAEAEAAAFQAAAFgEAEQgDADgGAAQgGAAgDgDg");
	this.shape_227.setTransform(-163.55,-97.075);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgPIAAhNIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAYAAIAAARIgYAAIAABNQAAAHADAEQAEAEAHgBIAKgBIAAARQgJADgHAAQgOAAgHgJg");
	this.shape_228.setTransform(-170.6,-96.2);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#FFFFFF").s().p("AgYA8QgMgGgGgKQgHgJAAgLIAWAAQAAALAIAGQAIAHAMgBQANAAAHgEQAHgFAAgJQAAgIgGgFQgHgFgPgEQgQgDgKgEQgJgFgFgGQgEgHAAgJQAAgQANgKQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgGgLAAQgLAAgHAFQgGAFAAAIQAAAIAGAEQAGAEAPADQAQAEAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgFg");
	this.shape_229.setTransform(-180.225,-94.8);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQAEAEAAAFQAAAFgEAEQgDADgGAAQgGAAgDgDg");
	this.shape_230.setTransform(-189.2,-97.075);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_231.setTransform(-195.525,-94.925);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgPQAHgPANgHQANgJAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABATAKALQALAMAOgBQAMAAAIgEQAIgFAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAKgCARIA+AAIAAgCQgBgQgIgJQgIgKgNABQgMAAgJAJg");
	this.shape_232.setTransform(-206.225,-94.8);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgPIAAhNIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAYAAIAAARIgYAAIAABNQAAAHAEAEQADAEAHgBIAKgBIAAARQgIADgJAAQgNAAgHgJg");
	this.shape_233.setTransform(-216.75,-96.2);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_234.setTransform(-225.4,-97.425);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAABIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_235.setTransform(-238.675,-94.8);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_236.setTransform(-248.525,-94.925);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAABIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_237.setTransform(-259.625,-94.8);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_238.setTransform(-271.2,-97.425);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgbIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMAAAIgGQAIgEAFgHIANAJQgPAZggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgIgNgBQgMAAgJAKg");
	this.shape_239.setTransform(393.825,-135);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_240.setTransform(380.575,-132.675);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_241.setTransform(367.725,-135.125);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgLAaAAIAVAAIAAgJQAAgLgHgHQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_242.setTransform(354.725,-135);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_243.setTransform(344.875,-135.125);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#FFFFFF").s().p("AgiBMQgPgJgJgSQgIgTgBgXIAAgMQAAgYAJgSQAIgTAQgKQAPgKATAAQAUAAAQAKQAPAKAIASQAJATAAAYIAAAKQAAAZgJASQgIATgPAJQgPALgVgBQgTABgPgLgAgggyQgMAPgBAdIAAALQAAAeANAQQAMAQAUAAQAWAAALgPQAMgQABgdIAAgMQAAgdgMgQQgMgQgWgBQgUABgMAQg");
	this.shape_244.setTransform(332.025,-137.15);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_245.setTransform(307.3,-137.625);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgLAaAAIAVAAIAAgJQAAgLgHgHQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_246.setTransform(294.025,-135);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAXAAIAAAQIgXAAIAABMQAAAIAEAEQACAEAIAAIAKgBIAAAQQgIADgJAAQgOAAgGgJg");
	this.shape_247.setTransform(283.4,-136.4);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#FFFFFF").s().p("AgoAvQgQgRAAgdIAAgBQAAgSAHgPQAHgPANgIQANgIAQAAQAZAAAQASQAQASAAAcIAAACQAAASgHAOQgHAOgNAJQgNAIgRAAQgYAAgQgSgAgZghQgKAMABAXQgBAUAKANQAKANAPAAQAQgBAKgNQAKgMgBgWQAAgVgKgMQgJgNgQgBQgPABgKANg");
	this.shape_248.setTransform(273.15,-135);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgVAAIAAixIAVAAIAABrIALgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_249.setTransform(261.25,-137.625);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_250.setTransform(236.425,-134.875);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#FFFFFF").s().p("AgXBsIAAgRIAKACQAHgBAEgEQADgDAAgKIAAiLIAVAAIAACLQAAAjggABQgHgBgGgCgAAChZQgDgDAAgFQAAgGADgDQADgDAGgBQAGABADADQAEADAAAGQAAAFgEADQgDAEgGAAQgGAAgDgEg");
	this.shape_251.setTransform(225.925,-134.75);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_252.setTransform(217.725,-134.875);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_253.setTransform(204.775,-135.125);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgbIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMAAAIgGQAIgEAFgHIANAJQgPAZggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgIgNgBQgMAAgJAKg");
	this.shape_254.setTransform(192.225,-135);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_255.setTransform(175.525,-135.125);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_256.setTransform(147.175,-135.125);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgLAaAAIAVAAIAAgJQAAgLgHgHQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_257.setTransform(134.175,-135);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#FFFFFF").s().p("AAeA+IgehdIgdBdIgRAAIglh7IAVAAIAZBcIAdhcIAQAAIAeBeIAYheIAWAAIglB7g");
	this.shape_258.setTransform(118.875,-135);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgbIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMAAAIgGQAIgEAFgHIANAJQgPAZggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgIgNgBQgMAAgJAKg");
	this.shape_259.setTransform(103.925,-135);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#FFFFFF").s().p("AAqBUIAAhOIhUAAIAABOIgWAAIAAinIAWAAIAABIIBUAAIAAhIIAXAAIAACng");
	this.shape_260.setTransform(89.075,-137.15);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_261.setTransform(64,-137.625);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgIg/QgDgEgBgFQABgFADgEQADgDAFAAQAGAAAEADQACAEAAAFQAAAFgCAEQgEADgGAAQgFAAgDgDg");
	this.shape_262.setTransform(54.3,-137.275);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIADAEQAEAEAHAAIAKgBIAAAQQgJADgHAAQgOAAgHgJg");
	this.shape_263.setTransform(47.2,-136.4);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgKQgHgJAAgLIAWAAQAAALAIAGQAIAGAMABQANAAAHgGQAHgFAAgHQAAgKgGgEQgHgFgPgEQgQgDgKgEQgJgEgFgIQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgJgHgGQgIgGgLgBQgLABgHAFQgGAFAAAIQAAAIAGAEQAGADAPAEQAQAEAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgGg");
	this.shape_264.setTransform(37.625,-135);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgIg/QgDgEgBgFQABgFADgEQADgDAFAAQAGAAAEADQACAEAAAFQAAAFgCAEQgEADgGAAQgFAAgDgDg");
	this.shape_265.setTransform(28.65,-137.275);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_266.setTransform(22.325,-135.125);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgbIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMAAAIgGQAIgEAFgHIANAJQgPAZggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgIgNgBQgMAAgJAKg");
	this.shape_267.setTransform(11.625,-135);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIAEAEQADAEAHAAIAKgBIAAAQQgIADgJAAQgNAAgHgJg");
	this.shape_268.setTransform(1.05,-136.4);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_269.setTransform(-7.6,-137.625);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgLAaAAIAVAAIAAgJQAAgLgHgHQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_270.setTransform(-20.825,-135);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_271.setTransform(-30.675,-135.125);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgLAaAAIAVAAIAAgJQAAgLgHgHQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_272.setTransform(-41.775,-135);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#FFFFFF").s().p("AAmBUIg7hOIgVAVIAAA5IgVAAIAAinIAVAAIAABTIBKhTIAbAAIhBBKIBGBdg");
	this.shape_273.setTransform(-54.6,-137.15);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_274.setTransform(-81.375,-132.675);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_275.setTransform(-94.225,-135.125);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgIg/QgDgEgBgFQABgFADgEQADgDAFAAQAGAAAEADQACAEAAAFQAAAFgCAEQgEADgGAAQgFAAgDgDg");
	this.shape_276.setTransform(-103.65,-137.275);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_277.setTransform(-113.025,-135.125);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_278.setTransform(-126.125,-134.875);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#FFFFFF").s().p("AAmBUIg6hOIgWAVIAAA5IgVAAIAAinIAVAAIAABTIBLhTIAbAAIhCBKIBGBdg");
	this.shape_279.setTransform(-139,-137.15);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgVAAIAAixIAVAAIAABrIALgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_280.setTransform(-164,-137.625);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgLAaAAIAVAAIAAgJQAAgLgHgHQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_281.setTransform(-177.275,-135);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAXAAIAAAQIgXAAIAABMQAAAIADAEQADAEAIAAIAKgBIAAAQQgJADgHAAQgPAAgGgJg");
	this.shape_282.setTransform(-187.9,-136.4);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#FFFFFF").s().p("AgoAvQgQgRAAgdIAAgBQAAgSAHgPQAIgPANgIQAMgIAQAAQAaAAAPASQAQASAAAcIAAACQAAASgHAOQgHAOgNAJQgNAIgRAAQgZAAgPgSgAgZghQgJAMAAAXQAAAUAJANQAKANAPAAQARgBAJgNQAKgMAAgWQgBgVgJgMQgKgNgQgBQgPABgKANg");
	this.shape_283.setTransform(-198.15,-135);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_284.setTransform(-210.05,-137.625);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_285.setTransform(-235.175,-132.675);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgLAaAAIAVAAIAAgJQAAgLgHgHQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_286.setTransform(-248.025,-135);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_287.setTransform(-257.875,-135.125);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#FFFFFF").s().p("Ag8BUIAAinIAwAAQAVAAARAJQAQAKAKASQAJASAAAXIAAAKQAAAYgJASQgJASgRAJQgSAKgVAAgAgmBCIAYAAQAYAAAPgQQAOgQAAgeIAAgJQAAgcgNgQQgOgQgYAAIgaAAg");
	this.shape_288.setTransform(-269.975,-137.15);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgIgJQgKgJgUAAQgaAAgNAWIAACnIg/AAIAAjtIA7AAIACAcQAaggApAAQAnAAARAWQATAXABAsIAACYg");
	this.shape_289.setTransform(209.85,-222.4);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#FFFFFF").s().p("AgfCmIAAjtIA/AAIAADtgAgZhtQgKgJAAgOQAAgPAKgJQAJgJAQAAQAQAAAKAJQAJAJAAAPQAAAOgJAJQgKAKgQAAQgPAAgKgKg");
	this.shape_290.setTransform(191.3,-226.875);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f("#FFFFFF").s().p("AhSBnQgWgUAAgfQAAgmAcgTQAbgUA1AAIAcAAIAAgOQAAgQgIgKQgIgKgSAAQgPAAgKAHQgJAIAAAOIhAAAQAAgVAOgSQAMgRAYgKQAWgKAdAAQArAAAaAWQAaAWAAAoIAABmQABAiAIARIAAAEIhAAAQgEgJgCgNQgXAagkAAQgiAAgYgUgAgpAsIAAADQAAAMAIAIQAJAIAOAAQANAAAMgHQAMgGAFgKIAAgpIgXAAQgvAAgDAhg");
	this.shape_291.setTransform(173.25,-222.175);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#FFFFFF").s().p("ABqB5IAAiXQAAgTgHgKQgIgJgUAAQgdAAgLAbIAACiIg+AAIAAiXQAAgUgIgJQgIgJgUAAQgbAAgMAWIAACnIg/AAIAAjtIA7AAIACAbQAZgfArAAQAtAAARAkQAZgkAvAAQAmAAATAWQATAXAAAtIAACXg");
	this.shape_292.setTransform(141.775,-222.4);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f("#FFFFFF").s().p("AhCB5IAAjtIA8AAIACAdQARghAjAAQAKAAAJADIAAA9QgNgCgLAAQgkAAgJAZIAACag");
	this.shape_293.setTransform(115,-222.4);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#FFFFFF").s().p("AhKBbQghggAAg1IAAgGQAAgjAOgcQAOgdAZgPQAZgPAgAAQAxAAAcAfQAcAeAAA5IAAAZIiXAAQADAXAQAOQAPAOAXAAQAlAAAUgbIAgAjQgPAVgYALQgYALgeAAQgzAAghgggAgbg6QgMANgDAXIBXAAIAAgFQAAgVgLgLQgLgMgUAAQgSAAgMANg");
	this.shape_294.setTransform(93.975,-222.175);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f("#FFFFFF").s().p("Ah2CgIAAk/IBwAAQA5AAAfAWQAeAXAAArQAAAXgMASQgNASgVAIQAZAFAOATQAOATAAAbQAAAugeAYQgdAXg2ABgAg0BrIA4AAQAXAAANgLQANgLAAgUQAAgsgtAAIg8AAgAg0gZIAxAAQAxgBAAgnQAAgVgNgKQgNgKgaAAIguAAg");
	this.shape_295.setTransform(67.525,-226.275);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#FFFFFF").s().p("AAlCoIg8hfIgXAXIAABIIg/AAIAAlPIA/AAIAAC5IANgPIA8hHIBLAAIhVBiIBdCKg");
	this.shape_296.setTransform(31.15,-227.15);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f("#FFFFFF").s().p("AhRBjQgUgWgBgrIAAiaIBAAAIAACYQAAAmAhgBQAgAAAMgVIAAioIBAAAIAADsIg8AAIgCgXQgXAcgpAAQgmAAgUgWg");
	this.shape_297.setTransform(5.05,-221.95);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#FFFFFF").s().p("Ag4DSIAAgyQALACAIAAQAdAAAAgfIAAj6IA/AAIAAD6QAAAngVAWQgUAWgnAAQgQAAgPgEgAgDidQgJgJAAgOQAAgPAJgJQAJgJAQAAQAQAAAKAJQAKAJAAAPQAAAOgKAJQgKAKgQAAQgQAAgJgKg");
	this.shape_298.setTransform(-15.6,-222.075);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgJgJQgIgJgVAAQgZAAgOAWIAACnIg/AAIAAjtIA7AAIACAcQAaggApAAQAnAAARAWQATAXAAAsIAACYg");
	this.shape_299.setTransform(-31.9,-222.4);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#FFFFFF").s().p("AhRBjQgUgWAAgrIAAiaIA/AAIAACYQAAAmAhgBQAgAAAMgVIAAioIA/AAIAADsIg7AAIgCgXQgYAcgoAAQgmAAgUgWg");
	this.shape_300.setTransform(-57.1,-221.95);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f("#FFFFFF").s().p("AgjBTIAAh/IgjAAIAAgvIAjAAIAAg6IA/AAIAAA6IAoAAIAAAvIgoAAIAAB1QAAANAFAGQAFAGAOAAQAKAAAJgCIAAAwQgTAGgUAAQhCAAgBhDg");
	this.shape_301.setTransform(-77.525,-224.875);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#FFFFFF").s().p("AhKBbQghggAAg1IAAgGQAAgjAOgcQAOgdAZgPQAZgPAgAAQAxAAAcAfQAcAeAAA5IAAAZIiXAAQADAXAQAOQAPAOAXAAQAlAAAUgbIAgAjQgPAVgYALQgYALgeAAQgzAAghgggAgbg6QgMANgDAXIBXAAIAAgFQAAgVgLgLQgLgMgUAAQgSAAgMANg");
	this.shape_302.setTransform(-96.675,-222.175);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f("#FFFFFF").s().p("Ah5CgIAAk/IB7AAQAlAAAbANQAbANAOAZQAPAYAAAfQABAvghAaQggAbg5AAIg5AAIAABxgAg4gFIA6AAQAbAAANgNQAOgMAAgXQAAgXgOgPQgOgOgYgBIg8AAg");
	this.shape_303.setTransform(-122.95,-226.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.instance},{t:this.text},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).to({state:[]},1).wait(12));

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
		var _this = this;
		var pieces = root.pieces;
		var slots = root.slots;
		var restart = root.restart;
		var Score = root.Score;
		var positions1 = [];
		var jawaban = [];
		
		root.stop();
		
		_this.popUpSalah.visible = !_this.popUpSalah.visible;
		_this.popUpBenar.visible = !_this.popUpBenar.visible;
		_this.popUpSelesai.visible = !_this.popUpSelesai.visible;
		_this.popUpDanger.visible = !_this.popUpDanger.visible;
		
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
		  jawaban = [];
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
		  Score.text = 0;
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
		    if (pieces.target.x != pieces.target.originalX) {
		      console.log("check");
		      root.onMiss();
		    }
		    return;
		  }
		  
		  root.slot = spot.parent;
		
		  if (root.slot) {
		    console.log(pieces.target.name);
		    console.log(root.slot.name);
		
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
		  jawaban.push(pieces.target);
		
		  if (jawaban.length >= 2) {
		    hapus = jawaban.shift();
		    root.sembunyiin(hapus);
		  }
		  console.log(jawaban);
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
		
		root.sembunyiin = function (hapus) {
		  createjs.Tween.get(hapus).to(
		    { x: root.slots.kotakKartuSembunyi.x, y: root.slots.kotakKartuSembunyi.y },
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
		  Score.text = pieces.skor * 20;
		};
		
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
	this.shape.graphics.f("#FFFFFF").s().p("AgNASQgEgDAAgGQAAgGAFgDQAFgEAJAAIAHAAIAAgDQAAgEgDgCQgCgDgEAAQgDAAgDACQgDACAAADIgHAAQAAgDACgDQADgDADgCQAEgBAEAAQAHAAAFADQAEAEAAAGIAAATQAAAGACAEIAAAAIgIAAIgBgEQgFAFgGAAQgHAAgEgEgAgKAIQAAAEADACQACACAEAAQACAAADgCQADgCACgDIAAgJIgGAAQgNAAAAAIg");
	this.shape.setTransform(443.825,58.825);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgKAWIAAgqIAIAAIAAAFQACgGAHAAIAEABIAAAGIgFAAQgGAAgCAGIAAAeg");
	this.shape_1.setTransform(440.45,58.775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgNASQgEgDAAgGQAAgGAFgDQAFgEAJAAIAHAAIAAgDQAAgEgDgCQgCgDgEAAQgDAAgDACQgDACAAADIgHAAQAAgDACgDQADgDADgCQAEgBAEAAQAHAAAFADQAEAEAAAGIAAATQAAAGACAEIAAAAIgIAAIgBgEQgFAFgGAAQgHAAgEgEgAgKAIQAAAEADACQACACAEAAQACAAADgCQADgCACgDIAAgJIgGAAQgNAAAAAIg");
	this.shape_2.setTransform(436.625,58.825);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgMASQgEgEAAgIIAAgbIAHAAIAAAbQAAAJAIAAQAIABADgHIAAgeIAHAAIAAAqIgHAAIAAgEQgEAFgIAAQgHAAgDgEg");
	this.shape_3.setTransform(432.175,58.85);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJAbQgFgCgDgEQgDgEAAgFIAIAAQAAAFADADQAFADAFAAQAGAAAEgCQACgDABgEQgBgEgCgCQgEgDgHgCQgJgDgEgDQgFgEAAgGQAAgHAFgEQAGgFAIAAQAFAAAGACQAEADADAEQACAEAAAFIgHAAQgBgGgDgDQgDgDgGAAQgFAAgDADQgDACgBAFQAAADAEADQADACAGACQAHACAEACQAEACACADQACAEAAAEQAAAHgGAEQgFAFgJAAQgFAAgFgDg");
	this.shape_4.setTransform(427.5,58.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3498DB").s().p("Aj8D9QhphpAAiUQAAiTBphqQBphoCTAAQCVAABoBoQBpBqAACTQAACUhpBpQhoBpiVAAQiTAAhphpg");
	this.shape_5.setTransform(437.8705,37.4545,0.9301,0.9301);

	this.instance = new lib.hehe();
	this.instance.setTransform(476.4,37.5,0.7145,0.9301,0,0,0,86.2,36);
	this.instance.shadow = new cjs.Shadow("rgba(0,0,0,1)",3,3,4);
	this.instance.cache(-2,-2,176,76);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.tandaSuaraOff},{t:this.hening},{t:this.tandaSuaraOn},{t:this.nyala}]}).wait(1));

	// Layer_3
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

	// Layer_4
	this.popUpJawabanAkhir = new lib.popUpJawabanAkhir();
	this.popUpJawabanAkhir.name = "popUpJawabanAkhir";
	this.popUpJawabanAkhir.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.popUpJawabanAkhir).wait(1));

	// popUpInfo
	this.popUpInfo = new lib.popUpInfo();
	this.popUpInfo.name = "popUpInfo";
	this.popUpInfo.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.popUpInfo).wait(1));

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

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgKgFgEQgEgGgKABQgHgBgGAEQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAAMQALgPARAAQAeABAAAhIAAA+g");
	this.shape_6.setTransform(281.775,172.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgdAqQgJgIAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgFgKAAQgIAAgGAEQgGAFAAAGIgQAAQAAgHAFgHQAFgHAJgDQAIgEAKgBQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgHgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_7.setTransform(271.875,172.3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAWAvIgWhHIgWBHIgNAAIgbhdIAPAAIATBGIAXhGIALAAIAXBHIAThHIAQAAIgcBdg");
	this.shape_8.setTransform(260.2,172.3);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgbAkQgMgMAAgWIAAgCQAAgNAFgMQAFgLAKgGQAKgHAKAAQATAAAKANQALAMAAAXIAAAFIhAAAQABAOAHAKQAIAIALAAQAJAAAFgDQAHgEAEgGIAKAIQgMASgXAAQgTAAgMgNgAgOgcQgHAIgBAMIAuAAIAAgBQAAgMgHgHQgFgHgLAAQgJAAgGAHg");
	this.shape_9.setTransform(248.75,172.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAgBAIAAg7IhAAAIAAA7IgQAAIAAh/IAQAAIAAA3IBAAAIAAg3IARAAIAAB/g");
	this.shape_10.setTransform(237.45,170.65);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_11.setTransform(222.675,170.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_12.setTransform(215.35,170.575);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgMIAAg5IgRAAIAAgNIARAAIAAgXIAQAAIAAAXIARAAIAAANIgRAAIAAA5QAAAGACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_13.setTransform(209.925,171.25);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgGQAAgGgEgEQgGgDgLgDQgMgDgHgDQgIgDgDgFQgEgFAAgHQAAgMAKgJQAKgHAPgBQAQAAAKAJQAKAJAAANIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAIQgKAHgQAAQgKABgJgFg");
	this.shape_14.setTransform(202.575,172.3);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQADACgBAEQABAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_15.setTransform(195.8,170.575);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgWAwIAAhdIAPAAIABALQAHgOAOAAQAFAAADACIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_16.setTransform(191.05,172.2);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgbAkQgNgMAAgWIAAgCQABgNAFgMQAGgLAJgGQAKgHAKAAQATAAAKANQAKAMAAAXIAAAFIg/AAQAAAOAIAKQAIAIALAAQAJAAAGgDQAFgEAFgGIAKAIQgMASgYAAQgSAAgMgNgAgOgcQgHAIgCAMIAvAAIAAgBQAAgMgGgHQgHgHgKAAQgIAAgHAHg");
	this.shape_17.setTransform(182.8,172.3);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgMIAAg5IgRAAIAAgNIARAAIAAgXIAQAAIAAAXIARAAIAAANIgRAAIAAA5QAAAGACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_18.setTransform(174.725,171.25);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiGIAQAAIAABRIAJgLIAcgdIAUAAIgkAmIAoA3g");
	this.shape_19.setTransform(168.125,170.3);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgdAqQgJgIAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgFgKAAQgIAAgGAEQgGAFAAAGIgQAAQAAgHAFgHQAFgHAJgDQAIgEAKgBQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgHgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_20.setTransform(158.025,172.3);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgWAwIAAhdIAPAAIABALQAHgOAPAAQAFAAACACIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_21.setTransform(150.6,172.2);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgdAqQgJgIAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgFgKAAQgIAAgGAEQgGAFAAAGIgQAAQAAgHAFgHQAFgHAJgDQAIgEAKgBQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgHgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgUIgNAAQgdAAAAASg");
	this.shape_22.setTransform(142.125,172.3);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AAdBAIgsg8IgRARIAAArIgQAAIAAh/IAQAAIAAA/IA4g/IAVAAIgyA5IA2BGg");
	this.shape_23.setTransform(132.4,170.65);

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

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgDgDABgEQgBgEADgCQACgDAEAAQAFAAACADQACACABAEQgBAEgCADQgCADgFAAQgEAAgCgDg");
	this.shape_24.setTransform(538.95,115.125);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_25.setTransform(531.825,116.85);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgdAnQgHgIgBgSIAAg8IAQAAIAAA8QABAVARABQASgBAGgOIAAhDIARAAIAABdIgQAAIAAgJQgKALgRAAQgPAAgJgJg");
	this.shape_26.setTransform(522,116.95);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgDAAgHQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgEgDgEQgEgGAAgHQAAgLAKgJQAKgHAPgBQAQAAAKAJQAKAIAAAOIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAHQgKAIgQAAQgKABgJgFg");
	this.shape_27.setTransform(512.375,116.85);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgbAlQgNgNAAgWIAAgCQAAgNAGgMQAFgLAKgGQAKgHAKAAQATAAAKANQALAMgBAXIAAAFIg/AAQAAAOAIAKQAIAIALAAQAJAAAFgEQAGgDAFgGIAKAIQgMASgYAAQgSAAgMgMgAgPgcQgGAIgCANIAvAAIAAgCQgBgMgFgHQgHgHgKAAQgIAAgIAHg");
	this.shape_28.setTransform(503.05,116.85);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgDAAgHQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgEgDgEQgEgGAAgHQAAgLAKgJQAKgHAPgBQAQAAAKAJQAKAIAAAOIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAHQgKAIgQAAQgKABgJgFg");
	this.shape_29.setTransform(493.525,116.85);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_30.setTransform(479.225,118.625);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgKgFgFQgEgEgKAAQgHAAgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAAMQALgPARAAQAeABAAAhIAAA+g");
	this.shape_31.setTransform(469.375,116.75);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_32.setTransform(459.475,116.85);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgcBCIgGgBIAAgNIAEAAQAJAAAEgDQAFgDADgJIAEgKIgihdIARAAIAXBGIAWhGIASAAIgnBtQgIAYgTAAg");
	this.shape_33.setTransform(450.35,118.775);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgKgFgFQgEgEgKAAQgHAAgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAAMQALgPARAAQAeABAAAhIAAA+g");
	this.shape_34.setTransform(436.675,116.75);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_35.setTransform(426.775,116.85);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AAWAvIgWhHIgWBHIgNAAIgbhdIAPAAIATBFIAWhFIAMAAIAXBHIAThHIAQAAIgcBdg");
	this.shape_36.setTransform(415.1,116.85);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgbAlQgNgNABgWIAAgCQAAgNAFgMQAGgLAJgGQAKgHAKAAQATAAAKANQAKAMAAAXIAAAFIg/AAQABAOAHAKQAIAIALAAQAJAAAGgEQAGgDAEgGIAKAIQgMASgXAAQgTAAgMgMgAgOgcQgHAIgBANIAuAAIAAgCQAAgMgHgHQgFgHgLAAQgJAAgGAHg");
	this.shape_37.setTransform(403.65,116.85);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AAVBDIAAg/QAAgJgFgFQgEgEgKAAQgHAAgGADQgGAFgDAGIAABDIgQAAIAAiGIAQAAIAAA0QALgOAQAAQAeABAAAgIAAA/g");
	this.shape_38.setTransform(393.875,114.85);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AAzAxIAAg+QAAgLgFgFQgFgEgLgBQgJAAgGAGQgGAFgBAKIAAA+IgPAAIAAg+QAAgUgUgBQgQAAgGAOIAABFIgRAAIAAhfIAQAAIAAALQALgMASAAQATAAAHAPQAEgHAIgEQAIgEAKAAQAfAAABAhIAAA/g");
	this.shape_39.setTransform(734.675,91.15);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgcAoQgJgKABgRIAAg9IAQAAIAAA9QgBAVATAAQARAAAGgNIAAhFIAQAAIAABfIgPAAIgBgKQgJAMgSAAQgPAAgHgJg");
	this.shape_40.setTransform(721.85,91.35);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgHBEIAAiGIAPAAIAACGg");
	this.shape_41.setTransform(714.725,89.25);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgHBEIAAiGIAPAAIAACGg");
	this.shape_42.setTransform(710.375,89.25);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQADACAAAEQAAAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_43.setTransform(706.05,89.525);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgmBAIAAh/IBNAAIAAAOIg9AAIAAArIA1AAIAAAOIg1AAIAAA4g");
	this.shape_44.setTransform(699.35,89.6);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_45.setTransform(685.525,89.25);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_46.setTransform(678.2,89.525);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_47.setTransform(672.775,90.2);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAIQgKAIgQAAQgKgBgJgEg");
	this.shape_48.setTransform(665.425,91.25);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgDgDABgEQgBgEADgCQACgDAEAAQAFAAACADQACACABAEQgBAEgCADQgCADgFAAQgEAAgCgDg");
	this.shape_49.setTransform(658.65,89.525);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAPAAIABALQAHgNAPABQAEgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_50.setTransform(653.9,91.15);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgbAkQgMgMAAgVIAAgDQAAgOAFgKQAFgMAKgGQAKgGAKAAQATAAAKAMQALAMAAAXIAAAGIhAAAQABAOAHAIQAIAJALAAQAJAAAFgDQAHgEAEgGIAKAIQgMATgXAAQgTgBgMgNgAgOgcQgHAHgBANIAuAAIAAgBQgBgNgGgGQgFgHgLAAQgJAAgGAHg");
	this.shape_51.setTransform(645.65,91.25);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_52.setTransform(637.575,90.2);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_53.setTransform(630.975,89.25);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_54.setTransform(620.875,91.25);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAQAAIAAALQAHgNAOABQAFgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_55.setTransform(613.45,91.15);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_56.setTransform(604.975,91.25);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_57.setTransform(596.175,89.25);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAQAAIAAALQAHgNAOABQAFgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_58.setTransform(584,91.15);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_59.setTransform(575.525,91.25);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_60.setTransform(567.425,90.2);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgNBFIAAhSIgPAAIAAgNIAPAAIAAgKQAAgOAIgJQAHgJAPAAIAMACIgBANIgJgBQgIABgEAEQgFAEAAAJIAAAKIAVAAIAAANIgVAAIAABSg");
	this.shape_61.setTransform(561.975,89.15);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_62.setTransform(553.625,91.25);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgcA2QgLgNAAgWIAAgBQAAgVAKgNQAKgNASAAQAPAAAKALIAAgxIAQAAIAACGIgPAAIAAgKQgLALgQABQgRgBgJgOgAgQgHQgHAJAAASQAAAQAHAJQAHAJAKAAQAQAAAHgNIAAgrQgIgOgPAAQgKABgHAIg");
	this.shape_63.setTransform(543.45,89.35);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_64.setTransform(529.175,91.15);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_65.setTransform(519.275,91.25);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_66.setTransform(509.175,93.025);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_67.setTransform(499.325,91.15);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgbAkQgMgMAAgVIAAgDQgBgOAGgKQAGgMAJgGQAKgGAKAAQATAAAKAMQALAMAAAXIAAAGIhAAAQAAAOAIAIQAIAJALAAQAJAAAFgDQAGgEAFgGIAKAIQgMATgYAAQgSgBgMgNgAgPgcQgGAHgCANIAvAAIAAgBQgBgNgGgGQgGgHgKAAQgIAAgIAHg");
	this.shape_68.setTransform(489.65,91.25);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgdA2QgKgNAAgWIAAgBQAAgVAKgNQALgNAQAAQAQAAAKALIAAgxIAQAAIAACGIgPAAIgBgKQgJALgRABQgQgBgLgOgAgQgHQgHAJAAASQAAAQAHAJQAGAJALAAQAQAAAHgNIAAgrQgHgOgQAAQgKABgHAIg");
	this.shape_69.setTransform(479.5,89.35);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_70.setTransform(465.225,91.15);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_71.setTransform(455.325,91.25);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AAWAwIgWhHIgWBHIgNAAIgbhfIAQAAIASBGIAWhGIANAAIAWBIIAShIIARAAIgcBfg");
	this.shape_72.setTransform(443.65,91.25);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgbAkQgNgMAAgVIAAgDQABgOAFgKQAGgMAJgGQAKgGAKAAQATAAAKAMQAKAMAAAXIAAAGIg/AAQABAOAHAIQAIAJALAAQAJAAAGgDQAFgEAFgGIAKAIQgMATgYAAQgSgBgMgNgAgPgcQgGAHgCANIAvAAIAAgBQgBgNgFgGQgHgHgKAAQgIAAgIAHg");
	this.shape_73.setTransform(432.2,91.25);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AAVBEIAAg/QAAgKgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAiGIAQAAIAAAzQALgNAQAAQAegBAAAiIAAA/g");
	this.shape_74.setTransform(422.425,89.25);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_75.setTransform(409.075,89.25);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_76.setTransform(401.75,89.525);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_77.setTransform(396.325,90.2);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAIQgKAIgQAAQgKgBgJgEg");
	this.shape_78.setTransform(388.975,91.25);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQADACgBAEQABAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_79.setTransform(382.2,89.525);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAQAAIAAALQAHgNAOABQAFgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_80.setTransform(377.45,91.15);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgbAkQgNgMAAgVIAAgDQABgOAFgKQAGgMAJgGQAKgGAKAAQATAAAKAMQAKAMAAAXIAAAGIg/AAQABAOAHAIQAIAJALAAQAJAAAGgDQAFgEAFgGIAKAIQgMATgYAAQgSgBgMgNgAgPgcQgGAHgCANIAvAAIAAgBQgBgNgFgGQgHgHgKAAQgIAAgIAHg");
	this.shape_81.setTransform(369.2,91.25);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_82.setTransform(361.125,90.2);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_83.setTransform(354.525,89.25);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_84.setTransform(344.425,91.25);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAPAAIABALQAHgNAPABQAFgBACACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_85.setTransform(337,91.15);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_86.setTransform(328.525,91.25);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_87.setTransform(319.725,89.25);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAQAAIAAALQAHgNAOABQAGgBACACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_88.setTransform(307.55,91.15);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_89.setTransform(299.075,91.25);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_90.setTransform(290.975,90.2);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgNBFIAAhSIgPAAIAAgNIAPAAIAAgKQAAgOAIgJQAHgJAPAAIAMACIgBANIgJgBQgIABgEAEQgFAEAAAJIAAAKIAVAAIAAANIgVAAIAABSg");
	this.shape_91.setTransform(285.525,89.15);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_92.setTransform(277.175,91.25);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgcA2QgLgNAAgWIAAgBQAAgVAKgNQALgNARAAQAPAAAKALIAAgxIAQAAIAACGIgPAAIAAgKQgKALgRABQgQgBgKgOgAgQgHQgHAJAAASQAAAQAHAJQAGAJALAAQAQAAAHgNIAAgrQgIgOgPAAQgLABgGAIg");
	this.shape_93.setTransform(267,89.35);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_94.setTransform(252.725,91.15);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_95.setTransform(242.825,91.25);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_96.setTransform(234.025,89.25);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AgeAkQgMgNAAgXIAAAAQAAgOAFgLQAGgLAKgGQAJgHAMABQATAAAMANQAMANAAAWIAAABQAAAOgFALQgFALgKAGQgKAGgNABQgSAAgMgOgAgTgaQgHAKAAARQAAAQAHAJQAIAKALAAQAMAAAIgKQAHgJAAgRQAAgPgHgKQgIgKgMAAQgLAAgIAJg");
	this.shape_97.setTransform(223.775,91.25);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AgbAkQgMgNAAgWIAAgCQAAgOAFgLQAFgKAKgGQAKgHALABQAQAAALAJQAKAKABAPIgPAAQgBgJgGgGQgGgGgKAAQgLAAgHAJQgGAJgBAQIAAADQABAQAGAJQAHAJALAAQAJAAAHgFQAGgGABgIIAPAAQAAAJgFAHQgGAIgIAEQgJAEgKABQgSgBgLgNg");
	this.shape_98.setTransform(214.05,91.25);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AgeAkQgMgNAAgXIAAAAQAAgOAFgLQAGgLAKgGQAJgHAMABQATAAAMANQAMANAAAWIAAABQAAAOgFALQgFALgKAGQgKAGgNABQgSAAgMgOgAgTgaQgHAKAAARQAAAQAHAJQAIAKALAAQAMAAAIgKQAHgJAAgRQAAgPgHgKQgIgKgMAAQgLAAgIAJg");
	this.shape_99.setTransform(204.175,91.25);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AgjAxQgNgQAAgbIAAgMQAAgRAGgOQAGgNAMgIQAMgHAOAAQAVAAAMALQAMAMACAUIgRAAQgCgPgHgHQgIgHgNAAQgPAAgJAMQgJAMAAAWIAAALQAAAVAIAMQAJANAPAAQAOAAAHgHQAIgGACgQIARAAQgCAUgNAMQgMALgVAAQgWAAgOgRg");
	this.shape_100.setTransform(193.375,89.625);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.bf(img.Bitmap2, null, new cjs.Matrix2D(1,0,0,1,-499,-300)).s().p("EhN9Au4MAAAhdvMCb7AAAMAAABdvg");
	this.shape_101.setTransform(471,261);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.btnNextDasar1},{t:this.btnMenuDasar1},{t:this.btnBack3},{t:this.slots},{t:this.pieces},{t:this.judulKI},{t:this.Score},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.restart},{t:this.btnInfo}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(452,231,518,469.20000000000005);
// library properties:
lib.properties = {
	id: 'E740BB847DF4864B949C99CD86B71105',
	width: 960,
	height: 540,
	fps: 24,
	color: "#009999",
	opacity: 1.00,
	manifest: [
		{src:"images/_1.png", id:"_1"},
		{src:"images/_2.png", id:"_2"},
		{src:"images/_5.png", id:"_5"},
		{src:"images/Bitmap3.png", id:"Bitmap3"},
		{src:"images/bookpngcopy.png", id:"bookpngcopy"},
		{src:"images/flash0aiAssets.png", id:"flash0aiAssets"},
		{src:"images/_3.png", id:"_3"},
		{src:"images/flash0aiAssets_1.png", id:"flash0aiAssets_1"},
		{src:"images/flash0aiAssets_2.png", id:"flash0aiAssets_2"},
		{src:"images/flash0aiAssets_3.png", id:"flash0aiAssets_3"},
		{src:"images/Bitmap2.png", id:"Bitmap2"},
		{src:"images/_4.png", id:"_4"},
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