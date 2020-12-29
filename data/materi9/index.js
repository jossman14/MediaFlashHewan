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



(lib._1e = function() {
	this.initialize(img._1e);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,963,564);


(lib._2e = function() {
	this.initialize(img._2e);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,963,564);


(lib._4e = function() {
	this.initialize(img._4e);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,963,564);


(lib._5e = function() {
	this.initialize(img._5e);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,963,564);


(lib._6edit = function() {
	this.initialize(img._6edit);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,664,389);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);


(lib.Bitmap3 = function() {
	this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,249,87);


(lib.Bitmap54 = function() {
	this.initialize(img.Bitmap54);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,247,185);


(lib.Bitmap55 = function() {
	this.initialize(img.Bitmap55);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,261,174);


(lib.bookpngcopy = function() {
	this.initialize(img.bookpngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,399);


(lib.cucumber1cucumber = function() {
	this.initialize(img.cucumber1cucumber);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,484,308);


(lib._1pngcopy2 = function() {
	this.initialize(img._1pngcopy2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,963,564);


(lib.flash0aiAssets = function() {
	this.initialize(img.flash0aiAssets);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,204,204);


(lib.flash0aiAssets_1 = function() {
	this.initialize(img.flash0aiAssets_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,369,180);


(lib.buluBabi_PNG = function() {
	this.initialize(img.buluBabi_PNG);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,520,470);


(lib.flash0aiAssets_2 = function() {
	this.initialize(img.flash0aiAssets_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,153,152);


(lib.flash0aiAssets_3 = function() {
	this.initialize(img.flash0aiAssets_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,153,152);


(lib._3e = function() {
	this.initialize(img._3e);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,963,564);


(lib.platepiring = function() {
	this.initialize(img.platepiring);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,106,43);


(lib.flash0aiAssets_4 = function() {
	this.initialize(img.flash0aiAssets_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,258);// helper functions:

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
	this.shape.graphics.f("#0097E6").s().p("EhB5AkpMAAAhJRMCDzAAAMAAABJRg");

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
	this.shape.graphics.f("#0097E6").s().p("EhB5AkpMAAAhJRMCDzAAAMAAABJRg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-421.8,-234.5,843.6,469.1);


(lib.target = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgEAtIAAhZIAJAAIAABZg");
	this.shape.setTransform(11.25,-1.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgFArIAAg+IAKAAIAAA+gAgEggQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABgBAAAAQABAAAAAAQABAAAAAAQADAAACACQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAABAAAAQAAABAAABQAAAAgBAAQAAABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAgBgBg");
	this.shape_1.setTransform(8.375,-1.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgMAeQgGgCgDgFQgDgFAAgGIALAAQAAAGAEADQAEADAGAAQAGAAAEgCQADgDAAgEQAAgEgDgDQgDgCgIgCQgIgCgFgCQgEgCgDgDQgCgEAAgEQAAgIAHgFQAGgGAJAAQALAAAHAGQAHAFAAAJIgLAAQAAgEgEgEQgEgDgGAAQgEAAgEADQgDACAAAEQAAAEADACIAKAEQAIACAFACQAFACADAEQACADAAAFQAAAJgHAFQgGAFgLAAQgHAAgGgDg");
	this.shape_2.setTransform(3.775,-0.275);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgTAcQgGgGAAgIQAAgKAIgEQAHgGANAAIAKAAIAAgFQAAgFgDgEQgEgDgGAAQgFAAgEADQgEADAAAEIgLAAQAAgFADgEQAEgFAFgCQAHgDAGAAQAKAAAHAGQAGAFAAAKIAAAcQAAAJACAFIAAABIgLAAIgCgHQgHAIgKAAQgJAAgGgFgAgOANQAAAFADADQADACAGAAQAEAAAEgCQAFgDACgEIAAgNIgJAAQgSAAAAAMg");
	this.shape_3.setTransform(-2.6,-0.275);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAVArIAAgoIgqAAIAAAoIgLAAIAAhVIALAAIAAAlIAqAAIAAglIAMAAIAABVg");
	this.shape_4.setTransform(-10.125,-1.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFFFFF").ss(2,1,1).p("AqmjkIVNAAIAAHJI1NAAg");
	this.shape_5.setTransform(-0.85,-1.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E74C3C").s().p("AqlDlIAAnJIVLAAIAAHJg");
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


(lib.ds = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._6edit();
	this.instance.setTransform(0,0,1,0.9974);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ds, new cjs.Rectangle(0,0,664,388), null);


(lib.drop15G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgYAuQgKgHgFgLQgEgLABgNIAAgEQACgOAHgMQAHgNALgGQALgGAMAAQATAAAJAOQAJAOgCAWIgBAIIg+AAQgBAMAFAIQAGAHAKAAQANAAAMgMIALALQgGAJgKAFQgLAFgLAAQgNAAgJgGgAgTgIIApAAIAAgCQABgEAAgFQgBgGgFgEQgEgEgGAAIgCAAQgPAAgJAZg");
	this.shape.setTransform(223.5841,43.8482);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AggArQgLgKABgOIAVAAQAAAIAFAEQAFAEAHAAQAIAAAFgDQAFgEACgGQABgJgOgDQgMgEgFgCQgTgHAAgRQABgNAMgJQAMgJAQAAQAPAAALAJQAJAJAAAOIgWAAQAAgHgDgEQgFgEgGAAQgHAAgFAEQgFADgBAGQgCAJANADIATAGQATAHgBARQgBAKgFAHQgGAHgJAEQgLADgKAAQgQAAgLgJg");
	this.shape_1.setTransform(213.6001,43.8487);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgiAsQgJgJABgMQABgQANgIQANgJAVAAIAOAAIABgHIAAgHQgCgKgLAAQgHAAgEAEQgGADgBAHIgWAAQABgJAGgHQAGgHAJgEQAKgEAKAAQARAAAJAKQAJAJgCAQIgHAuIgBAIIABALIAAABIgWAAIgBgJQgMALgNAAQgNAAgJgIgAgLAIQgIAEgBAJQAAAGADADQAEAEAGAAQAHAAAFgDQAGgDAEgGIADgTIgKAAQgMAAgHAFg");
	this.shape_2.setTransform(203.6344,43.8472);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgYAuQgKgHgFgLQgEgLABgNIAAgEQACgOAHgMQAHgNALgGQALgGAMAAQATAAAJAOQAJAOgCAWIgBAIIg+AAQgBAMAFAIQAGAHAKAAQANAAAMgMIALALQgGAJgKAFQgLAFgLAAQgNAAgJgGgAgTgIIApAAIAAgCQABgEAAgFQgBgGgFgEQgEgEgGAAIgCAAQgPAAgJAZg");
	this.shape_3.setTransform(193.9341,43.8482);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgRA3QgFgHAAgNIAKg4IgQAAIADgRIAQAAIAEgYIAVAAIgEAYIARAAIgCARIgSAAIgJA3IAAAEQAAAGAHABIAHgBIgBASQgHABgGAAQgLAAgGgIg");
	this.shape_4.setTransform(186.15,42.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgcAtQgJgGgEgMQgFgLABgOIABgCQACgOAGgMQAIgMAKgHQAMgGAMAAQANAAAKAHQAJAHAEALQAFAMgBAOQgCAPgHAMQgIAMgKAHQgMAGgMAAQgNAAgKgHgAgQgTQgFAIgBALIAAAMQAAAKAEAGQAFAGAJAAQAKAAAHgJQAIgJACgPIAAgIQAAgMgEgHQgFgHgJAAIgBAAQgMAAgIAOg");
	this.shape_5.setTransform(177.3,43.8482);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AghAzIAShjIATAAIgCALQAKgNANAAIAJABIgCAVIgJAAQgOgBgJANIgLBDg");
	this.shape_6.setTransform(169.1,43.725);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgyBGIAZiKIAUAAIgCALQALgNAPABQAKAAAHAEQAHAFAEAJQAEAJAAALIgBAOQgCAPgGALQgGAMgJAHQgKAGgMAAQgOgBgJgKIgJAvgAgIgoIgIAsQAEALAMABQALAAAHgJQAIgIADgSIAAgHQAAgMgEgGQgEgHgJAAQgMAAgIALg");
	this.shape_7.setTransform(159.625,45.674);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgYAuQgKgHgFgLQgEgLABgNIAAgEQACgOAHgMQAHgNALgGQALgGAMAAQATAAAJAOQAJAOgCAWIgBAIIg+AAQgBAMAFAIQAGAHAKAAQANAAAMgMIALALQgGAJgKAFQgLAFgLAAQgNAAgJgGgAgTgIIApAAIAAgCQABgEAAgFQgBgGgFgEQgEgEgGAAIgCAAQgPAAgJAZg");
	this.shape_8.setTransform(145.3841,43.8482);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AANAzIALhAIAAgHQgBgLgMgBQgMAAgJANIgNBGIgWAAIAShjIAUAAIgCAMQAMgOARAAQAOAAAHAKQAHAKgCARIgLBAg");
	this.shape_9.setTransform(134.7472,43.7491);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgWBFIAShjIAVAAIgRBjgAABgvQgCgEAAgFQAAgFACgEQADgDAGAAQAFgBAEAEQAEADAAAFQAAAGgEADQgDAEgGAAQgFAAgEgDg");
	this.shape_10.setTransform(127.825,41.9219);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgWBHIAXiNIAWAAIgXCNg");
	this.shape_11.setTransform(123.075,41.725);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgiAsQgJgJABgMQABgQANgIQANgJAVAAIAOAAIABgHIAAgHQgCgKgLAAQgHAAgEAEQgGADgBAHIgWAAQABgJAGgHQAGgHAJgEQAKgEAKAAQARAAAJAKQAJAJgCAQIgHAuIgBAIIABALIAAABIgWAAIgBgJQgMALgNAAQgNAAgJgIgAgLAIQgIAEgBAJQAAAGADADQAEAEAGAAQAHAAAFgDQAGgDAEgGIADgTIgKAAQgMAAgHAFg");
	this.shape_12.setTransform(115.0844,43.8472);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AALBHIgUgrIgNALIgFAgIgWAAIAZiNIAVAAIgOBQIAIgIIAfgeIAcAAIgsAqIAdA5g");
	this.shape_13.setTransform(105.875,41.725);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgWBHIAXiNIAWAAIgXCNg");
	this.shape_14.setTransform(98.525,41.725);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgiAsQgJgJABgMQABgQANgIQANgJAVAAIAOAAIABgHIAAgHQgCgKgLAAQgHAAgEAEQgGADgBAHIgWAAQABgJAGgHQAGgHAJgEQAKgEAKAAQARAAAJAKQAJAJgCAQIgHAuIgBAIIABALIAAABIgWAAIgBgJQgMALgNAAQgNAAgJgIgAgLAIQgIAEgBAJQAAAGADADQAEAEAGAAQAHAAAFgDQAGgDAEgGIADgTIgKAAQgMAAgHAFg");
	this.shape_15.setTransform(90.5344,43.8472);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgKgEgEQgEgFgKAAQgMAAgHAMIAABHIgXAAIAAhkIAWAAIAAAMQAMgNARAAQAfAAABAkIAABBg");
	this.shape_16.setTransform(75.825,43.75);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_17.setTransform(68.125,41.925);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AggArQgKgJAAgMQAAgQAMgIQALgIAWgBIANAAIAAgGQAAgHgDgGQgFgEgIAAQgIAAgEAEQgGAEAAAFIgWAAQAAgHAFgIQAGgHAKgEQAJgEAKAAQASAAAKAJQALAIAAARIAAAsQAAAOAEAHIAAACIgXAAIgDgKQgLAMgOAAQgPAAgJgJgAgNAHQgHAEABAJQAAAGAEAEQAEAEAIAAQAFAAAGgEQAFgDADgFIAAgTIgLAAQgMAAgGAEg");
	this.shape_18.setTransform(60.55,43.85);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgKBHIAAiNIAVAAIAACNg");
	this.shape_19.setTransform(52.975,41.725);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgIQALgIAWgBIANAAIAAgGQAAgHgDgGQgFgEgIAAQgIAAgEAEQgGAEAAAFIgWAAQAAgHAFgIQAGgHAKgEQAJgEAKAAQASAAAKAJQALAIAAARIAAAsQAAAOAEAHIAAACIgXAAIgDgKQgLAMgOAAQgPAAgKgJgAgNAHQgHAEABAJQAAAGAEAEQAEAEAIAAQAFAAAGgEQAGgDACgFIAAgTIgLAAQgMAAgGAEg");
	this.shape_20.setTransform(40.65,43.85);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgZAzIAAhkIAVAAIABAMQAHgNAOAAIAIABIAAAVIgJgBQgPAAgFANIAABDg");
	this.shape_21.setTransform(32.575,43.75);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AggArQgKgJAAgMQAAgQAMgIQALgIAWgBIANAAIAAgGQAAgHgDgGQgFgEgIAAQgIAAgEAEQgGAEAAAFIgWAAQAAgHAFgIQAGgHAKgEQAJgEAKAAQASAAAKAJQALAIAAARIAAAsQAAAOAEAHIAAACIgXAAIgDgKQgLAMgOAAQgPAAgJgJgAgNAHQgHAEABAJQAAAGAEAEQAEAEAIAAQAFAAAGgEQAFgDADgFIAAgTIgLAAQgMAAgGAEg");
	this.shape_22.setTransform(23.65,43.85);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgLAjIAAg4IgRAAIAAgRIARAAIAAgYIAWAAIAAAYIARAAIAAARIgRAAIAAA3QAAAGACACQACACAGABIAIgBIAAARQgIACgHAAQgZABAAgdg");
	this.shape_23.setTransform(15.125,42.7);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgKgEgEQgEgFgKAAQgMAAgHAMIAABHIgXAAIAAhkIAWAAIAAAMQAMgNARAAQAfAAABAkIAABBg");
	this.shape_24.setTransform(6.925,43.75);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AggArQgKgJAAgMQAAgQAMgIQAMgIAVgBIANAAIAAgGQAAgHgEgGQgEgEgIAAQgIAAgFAEQgEAEAAAFIgXAAQAAgHAGgIQAFgHAJgEQAKgEALAAQARAAALAJQAKAIAAARIAAAsQAAAOAEAHIAAACIgXAAIgCgKQgMAMgOAAQgPAAgJgJgAgOAHQgFAEgBAJQAAAGAFAEQAEAEAHAAQAGAAAGgEQAFgDADgFIAAgTIgMAAQgLAAgHAEg");
	this.shape_25.setTransform(-3.5,43.85);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_26.setTransform(319.775,15.125);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhkIAWAAIAAAMQAMgNARAAQAfAAABAjIAABCg");
	this.shape_27.setTransform(312.075,16.95);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_28.setTransform(304.375,15.125);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhkIAWAAIAAAMQAMgNARAAQAfAAABAjIAABCg");
	this.shape_29.setTransform(286.925,16.95);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AghArQgJgIAAgNQAAgQAMgHQAMgJAVAAIAOAAIAAgHQgBgHgEgFQgEgFgIAAQgHAAgGAEQgEADAAAHIgXAAQAAgIAGgIQAFgHAJgEQAKgEALAAQARAAALAIQAKAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgCgKQgMAMgOAAQgPAAgKgJgAgOAHQgFAFgBAHQAAAHAFAEQAEAEAHAAQAGAAAGgEQAFgDAEgFIAAgTIgNAAQgLAAgHAEg");
	this.shape_30.setTransform(276.5,17.05);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AAWAyIgWhEIgUBEIgTAAIgbhjIAWAAIAQBDIAVhDIAQAAIAUBEIAQhEIAWAAIgbBjg");
	this.shape_31.setTransform(264.275,17.025);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgeAmQgNgNAAgXIAAgCQAAgOAGgMQAGgMAKgGQALgHALAAQAVAAALANQALANAAAYIAAAIIhAAAQABAMAHAIQAHAHAKAAQAQAAAKgNIAMAMQgGAJgKAFQgKAFgNAAQgUAAgOgOgAgNgaQgFAGgCAMIAqAAIAAgCQgBgMgFgFQgFgGgKAAQgIAAgGAHg");
	this.shape_32.setTransform(252.225,17.05);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AATBHIAAhBQAAgJgEgEQgFgFgJAAQgMAAgHAMIAABHIgXAAIAAiNIAXAAIAAA1QALgNAQAAQAgAAABAkIAABBg");
	this.shape_33.setTransform(241.775,14.925);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AghArQgJgIAAgNQAAgQAMgHQAMgJAVAAIAOAAIAAgHQgBgHgEgFQgEgFgIAAQgHAAgGAEQgEADAAAHIgXAAQAAgIAGgIQAFgHAJgEQAKgEALAAQARAAALAIQAKAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgCgKQgMAMgOAAQgPAAgKgJgAgOAHQgFAFgBAHQAAAHAFAEQAEAEAHAAQAGAAAGgEQAGgDADgFIAAgTIgNAAQgLAAgHAEg");
	this.shape_34.setTransform(221.6,17.05);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AggA6QgLgOAAgZQAAgWALgOQAKgOATAAQAOAAAKALIAAgzIAXAAIAACNIgUAAIgBgKQgLAMgPAAQgTAAgKgOgAgOgEQgHAIABARQgBAQAHAIQAFAJAKAAQAOAAAGgNIAAgpQgGgNgOAAQgKAAgFAJg");
	this.shape_35.setTransform(210.85,15.025);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AghArQgJgIAAgNQAAgQAMgHQAMgJAVAAIAOAAIAAgHQAAgHgFgFQgEgFgIAAQgHAAgGAEQgEADAAAHIgXAAQAAgIAGgIQAFgHAKgEQAJgEALAAQARAAAKAIQALAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgCgKQgMAMgOAAQgPAAgKgJgAgOAHQgFAFAAAHQgBAHAFAEQAEAEAHAAQAGAAAGgEQAFgDAEgFIAAgTIgNAAQgLAAgHAEg");
	this.shape_36.setTransform(200.55,17.05);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgrBGIAAiKIAVAAIABALQAKgMAQAAQASAAAKANQALAOAAAYIAAACQAAAWgLAOQgKAOgSAAQgPAAgLgLIAAAvgAgVgoIAAAsQAGAMAOAAQALAAAFgJQAHgIAAgRQAAgPgHgJQgFgJgLAAQgOAAgGALg");
	this.shape_37.setTransform(190.25,18.875);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgLAjIAAg4IgRAAIAAgRIARAAIAAgZIAWAAIAAAZIARAAIAAARIgRAAIAAA3QAAAGACACQACADAGgBIAIAAIAAARQgIADgHgBQgZAAAAgcg");
	this.shape_38.setTransform(171.575,15.9);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AghArQgJgIAAgNQAAgQAMgHQALgJAWAAIANAAIAAgHQAAgHgDgFQgFgFgIAAQgIAAgEAEQgGADAAAHIgWAAQAAgIAFgIQAGgHAKgEQAJgEAKAAQASAAAKAIQALAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgDgKQgLAMgOAAQgPAAgKgJgAgNAHQgHAFABAHQAAAHAEAEQAEAEAIAAQAFAAAGgEQAGgDACgFIAAgTIgLAAQgMAAgGAEg");
	this.shape_39.setTransform(163.5,17.05);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgrBGIAAiKIAVAAIAAALQALgMAPAAQATAAAKANQALAOAAAYIAAACQAAAWgLAOQgKAOgSAAQgPAAgLgLIAAAvgAgVgoIAAAsQAHAMAOAAQAJAAAGgJQAHgIgBgRQABgPgHgJQgGgJgJAAQgOAAgHALg");
	this.shape_40.setTransform(153.2,18.875);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AghArQgJgIAAgNQAAgQAMgHQAMgJAVAAIAOAAIAAgHQAAgHgFgFQgEgFgIAAQgHAAgGAEQgEADAAAHIgXAAQAAgIAGgIQAFgHAKgEQAJgEALAAQARAAAKAIQALAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgCgKQgMAMgOAAQgPAAgKgJgAgOAHQgFAFAAAHQgBAHAFAEQAEAEAHAAQAGAAAGgEQAFgDAEgFIAAgTIgNAAQgLAAgHAEg");
	this.shape_41.setTransform(142.5,17.05);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AggA6QgLgOAAgZQAAgWALgOQAKgOATAAQAPAAAJALIAAgzIAXAAIAACNIgVAAIAAgKQgLAMgPAAQgSAAgLgOgAgOgEQgHAIAAARQAAAQAHAIQAFAJAKAAQAOAAAGgNIAAgpQgGgNgOAAQgKAAgFAJg");
	this.shape_42.setTransform(131.75,15.025);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgZAzIAAhkIAVAAIABAMQAHgNAOAAIAIABIAAAVIgJAAQgPAAgFAMIAABDg");
	this.shape_43.setTransform(123.675,16.95);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgeAmQgNgNAAgXIAAgCQAAgOAGgMQAGgMAKgGQALgHALAAQAVAAALANQALANAAAYIAAAIIhAAAQABAMAHAIQAHAHAKAAQAQAAAKgNIAMAMQgGAJgKAFQgKAFgNAAQgUAAgOgOgAgNgaQgFAGgCAMIAqAAIAAgCQgBgMgFgFQgFgGgKAAQgIAAgGAHg");
	this.shape_44.setTransform(114.875,17.05);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgLAjIAAg4IgRAAIAAgRIARAAIAAgZIAWAAIAAAZIARAAIAAARIgRAAIAAA3QAAAGACACQACADAGgBIAIAAIAAARQgIADgHgBQgZAAAAgcg");
	this.shape_45.setTransform(106.325,15.9);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgWBCQgKgEgGgIIALgNQAKAMAQAAQAKAAAGgGQAHgGAAgMIAAgHQgKALgPAAQgSAAgLgOQgLgOAAgYQAAgXALgOQALgOASAAQAQAAAKAMIABgKIAUAAIAABgQAAAUgMALQgMAMgUAAQgLAAgLgFgAgOgrQgHAJAAARQAAAPAHAIQAGAJAKAAQANAAAHgMIAAgrQgHgMgNAAQgKAAgGAJg");
	this.shape_46.setTransform(88.075,18.925);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhkIAWAAIAAAMQAMgNARAAQAfAAABAjIAABCg");
	this.shape_47.setTransform(77.625,16.95);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AghArQgJgIAAgNQAAgQAMgHQALgJAWAAIANAAIAAgHQAAgHgDgFQgFgFgIAAQgIAAgEAEQgGADAAAHIgWAAQAAgIAFgIQAGgHAKgEQAJgEAKAAQASAAAKAIQALAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgDgKQgLAMgOAAQgPAAgKgJgAgNAHQgHAFABAHQAAAHAEAEQAEAEAIAAQAFAAAGgEQAGgDACgFIAAgTIgLAAQgMAAgGAEg");
	this.shape_48.setTransform(67.2,17.05);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AgkBFIAAgRIAFAAQAIAAAEgDQAEgEADgHIADgJIgjhjIAYAAIAUBFIAVhFIAYAAIgoBzQgIAagWAAIgLgCg");
	this.shape_49.setTransform(57.4,19.05);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AAwAzIAAhBQABgJgEgEQgFgFgKAAQgHAAgFAFQgFAEgBAGIAABEIgWAAIAAhBQgBgSgRAAQgOAAgGALIAABIIgWAAIAAhkIAVAAIABALQAKgMATAAQATAAAHAPQAMgPATAAQARAAAIAJQAIAJAAASIAABBg");
	this.shape_50.setTransform(34.75,16.95);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_51.setTransform(24.075,15.125);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AgoAyIAAgPIAyhCIgxAAIAAgSIBOAAIAAAOIgzBDIA1AAIAAASg");
	this.shape_52.setTransform(16.925,17.025);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhkIAWAAIAAAMQAMgNARAAQAfAAABAjIAABCg");
	this.shape_53.setTransform(6.825,16.95);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgeAmQgNgNAAgXIAAgCQAAgOAGgMQAGgMAKgGQALgHALAAQAVAAALANQALANAAAYIAAAIIhAAAQABAMAHAIQAHAHAKAAQAQAAAKgNIAMAMQgGAJgKAFQgKAFgNAAQgUAAgOgOgAgNgaQgFAGgCAMIAqAAIAAgCQgBgMgFgFQgFgGgKAAQgIAAgGAHg");
	this.shape_54.setTransform(-3.475,17.05);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AggArQgKgIAAgNQAAgQAMgHQALgKAWABIANAAIAAgHQAAgIgDgEQgFgFgIAAQgIAAgEAEQgGADAAAHIgWAAQAAgJAFgHQAGgHAJgEQAKgEAKAAQASAAAKAIQALAKAAAPIAAAtQAAAOAEAIIAAABIgXAAIgDgJQgLALgOAAQgPAAgJgJgAgNAHQgHAFAAAHQABAHAEAEQAEAEAIAAQAFAAAGgDQAFgDADgGIAAgTIgLAAQgMAAgGAEg");
	this.shape_55.setTransform(317.05,-9.75);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AgrBGIAAiKIAVAAIAAALQALgMAPAAQATAAALANQAKAOAAAYIAAACQAAAWgKAOQgLAOgSAAQgPAAgLgLIAAAvgAgVgoIAAAsQAHAMAOAAQAJAAAHgJQAFgIAAgRQAAgPgFgJQgHgJgJAAQgOAAgHALg");
	this.shape_56.setTransform(306.75,-7.925);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AggAqQgJgKABgSIAAhAIAWAAIAABAQAAATAQAAQAPAAAGgMIAAhHIAXAAIAABjIgVAAIgBgKQgKAMgSAAQgPAAgJgJg");
	this.shape_57.setTransform(295.9,-9.675);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AgZAzIAAhjIAVAAIABALQAHgNAOAAIAIABIAAAVIgJAAQgPgBgFAMIAABEg");
	this.shape_58.setTransform(287.725,-9.85);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgeAmQgNgNAAgXIAAgCQAAgOAGgMQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABANAHAGQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgOgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_59.setTransform(278.925,-9.75);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgWA7IgBALIgUAAIAAiNIAXAAIAAA0QAJgMAQAAQASAAALAOQAKANAAAYIAAABQAAAXgKAOQgLAOgSAAQgQAAgLgNgAgUAAIAAApQAGANAOAAQAKAAAGgIQAFgIAAgQIAAgDQABgQgGgHQgGgJgKAAQgPAAgFANg");
	this.shape_60.setTransform(268.6,-11.775);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAjIAABCg");
	this.shape_61.setTransform(244.275,-9.85);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_62.setTransform(236.575,-11.675);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AgeAmQgNgNAAgXIAAgCQAAgOAGgMQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABANAHAGQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgOgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_63.setTransform(229.125,-9.75);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AgLAiIAAg3IgRAAIAAgRIARAAIAAgZIAWAAIAAAZIARAAIAAARIgRAAIAAA3QAAAFACADQACACAGAAIAIAAIAAARQgIACgHAAQgZAAAAgdg");
	this.shape_64.setTransform(220.575,-10.9);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AghAmQgMgPAAgXIAAAAQgBgPAGgMQAGgMAKgGQALgGANAAQAUAAANANQANANAAAWIAAAEQAAAOgFAMQgGAMgKAGQgLAHgOAAQgUAAgNgOgAgQgZQgHAJAAARQAAAQAHAIQAFAJALAAQAMAAAGgJQAGgJAAgQQAAgQgGgIQgHgJgLAAQgKAAgGAIg");
	this.shape_65.setTransform(212.25,-9.75);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AgZAzIAAhjIAVAAIABALQAHgNAOAAIAIABIAAAVIgJAAQgPgBgFAMIAABEg");
	this.shape_66.setTransform(203.925,-9.85);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AgrBGIAAiKIAVAAIABALQAJgMARAAQASAAALANQAKAOAAAYIAAACQAAAWgKAOQgLAOgSAAQgPAAgKgLIAAAvgAgUgoIAAAsQAFAMAOAAQAKAAAHgJQAFgIABgRQgBgPgFgJQgHgJgKAAQgOAAgFALg");
	this.shape_67.setTransform(195,-7.925);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AgWBCQgKgEgGgIIALgNQAKAMAQAAQAKAAAGgGQAHgGAAgMIAAgHQgKALgPAAQgSAAgLgOQgLgOAAgYQAAgXALgOQALgOASAAQAQAAAKAMIABgKIAUAAIAABgQAAAUgMALQgMAMgUAAQgLAAgLgFgAgOgrQgHAJAAARQAAAPAHAIQAGAJAKAAQANAAAHgMIAAgrQgHgMgNAAQgKAAgGAJg");
	this.shape_68.setTransform(170.375,-7.875);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAjIAABCg");
	this.shape_69.setTransform(159.925,-9.85);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2C3E50").s().p("AggAqQgJgKAAgSIAAhAIAXAAIAABAQAAATAQAAQAPAAAGgMIAAhHIAXAAIAABjIgWAAIAAgKQgKAMgRAAQgRAAgIgJg");
	this.shape_70.setTransform(149.35,-9.675);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2C3E50").s().p("AggA6QgLgOAAgZQAAgWALgOQAKgOATAAQAPAAAJALIAAgzIAXAAIAACNIgVAAIAAgKQgLAMgPAAQgSAAgLgOgAgOgEQgHAIAAARQAAAQAHAIQAFAJAKAAQAOAAAGgNIAAgpQgGgNgOAAQgKAAgFAJg");
	this.shape_71.setTransform(138.5,-11.775);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAjIAABCg");
	this.shape_72.setTransform(128.075,-9.85);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#2C3E50").s().p("AghArQgJgIAAgNQAAgQAMgHQAMgKAVABIAOAAIAAgHQgBgIgEgEQgEgFgIAAQgHAAgGAEQgEADAAAHIgXAAQAAgJAGgHQAFgHAJgEQAKgEALAAQARAAALAIQAKAKAAAPIAAAtQAAAOAEAIIAAABIgXAAIgCgJQgMALgOAAQgPAAgKgJgAgOAHQgFAFgBAHQAAAHAFAEQAEAEAHAAQAGAAAGgDQAGgDADgGIAAgTIgNAAQgLAAgHAEg");
	this.shape_73.setTransform(117.65,-9.75);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#2C3E50").s().p("AgWBCQgKgEgGgIIALgNQAKAMAQAAQAKAAAGgGQAHgGAAgMIAAgHQgKALgPAAQgSAAgLgOQgLgOAAgYQAAgXALgOQALgOASAAQAQAAAKAMIABgKIAUAAIAABgQAAAUgMALQgMAMgUAAQgLAAgLgFgAgOgrQgHAJAAARQAAAPAHAIQAGAJAKAAQANAAAHgMIAAgrQgHgMgNAAQgKAAgGAJg");
	this.shape_74.setTransform(106.925,-7.875);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAjIAABCg");
	this.shape_75.setTransform(96.475,-9.85);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#2C3E50").s().p("AgeAmQgNgNAAgXIAAgCQAAgOAGgMQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABANAHAGQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgOgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_76.setTransform(86.175,-9.75);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#2C3E50").s().p("AAxAzIAAhBQAAgJgFgEQgEgFgJAAQgIAAgFAFQgFADgBAHIAABEIgWAAIAAhBQAAgSgSAAQgOAAgFAMIAABHIgXAAIAAhjIAVAAIABAKQAKgMATAAQATAAAHAPQAMgPATAAQARAAAIAJQAIAJAAASIAABBg");
	this.shape_77.setTransform(72.7,-9.85);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#2C3E50").s().p("AgWBCQgKgEgGgIIALgNQAKAMAQAAQAKAAAGgGQAHgGAAgMIAAgHQgKALgPAAQgSAAgLgOQgLgOAAgYQAAgXALgOQALgOASAAQAQAAAKAMIABgKIAUAAIAABgQAAAUgMALQgMAMgUAAQgLAAgLgFgAgOgrQgHAJAAARQAAAPAHAIQAGAJAKAAQANAAAHgMIAAgrQgHgMgNAAQgKAAgGAJg");
	this.shape_78.setTransform(45.375,-7.875);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAjIAABCg");
	this.shape_79.setTransform(34.925,-9.85);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_80.setTransform(27.225,-11.675);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#2C3E50").s().p("AgWBCQgKgEgGgIIALgNQAKAMAQAAQAKAAAGgGQAHgGAAgMIAAgHQgKALgPAAQgSAAgLgOQgLgOAAgYQAAgXALgOQALgOASAAQAQAAAKAMIABgKIAUAAIAABgQAAAUgMALQgMAMgUAAQgLAAgLgFgAgOgrQgHAJAAARQAAAPAHAIQAGAJAKAAQANAAAHgMIAAgrQgHgMgNAAQgKAAgGAJg");
	this.shape_81.setTransform(19.225,-7.875);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#2C3E50").s().p("AggArQgKgIAAgNQAAgQAMgHQAMgKAVABIANAAIAAgHQAAgIgDgEQgFgFgIAAQgIAAgEAEQgFADgBAHIgWAAQAAgJAFgHQAGgHAJgEQAKgEAKAAQASAAALAIQAKAKAAAPIAAAtQAAAOAEAIIAAABIgXAAIgDgJQgKALgPAAQgPAAgJgJgAgNAHQgHAFAAAHQABAHAEAEQAEAEAIAAQAFAAAGgDQAFgDADgGIAAgTIgLAAQgMAAgGAEg");
	this.shape_82.setTransform(8.9,-9.75);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#2C3E50").s().p("AgxBDIAAiGIAnAAQASABAOAHQANAJAIAOQAHAPAAASIAAAGQAAAUgHAOQgIAPgOAHQgOAJgSgBgAgaAxIAPAAQASAAAKgLQAKgNAAgVIAAgHQAAgVgKgMQgJgMgSAAIgQAAg");
	this.shape_83.setTransform(-2.25,-11.5);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.723,0,0,1.996,-214.5,-87.1)).s().p("EghhANlIAA7IMBDCAAAIAAbIg");
	this.shape_84.setTransform(160.5,26);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop15G5, new cjs.Rectangle(-54,-60.8,429.1,173.7), null);


(lib.drop15G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgYBFIAAgTIAEAAQAUAAAJgJQALgKABgTQgLAMgOAAQgRAAgMgNQgKgLAAgVQAAgNAGgLQAFgLAKgGQAKgGAMAAQAUAAAMAQQAMAPAAAZIAAAHQAAAjgRATQgQAUgfAAgAgPgpQgGAIABAMQgBANAGAHQAGAHAJAAQAGAAAGgEQAHgDACgHIAAgIQAAgPgFgJQgHgJgJAAQgJAAgGAIg");
	this.shape.setTransform(219.65,164.575);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgIQAMgJAVAAIAOAAIAAgGQgBgIgEgFQgEgEgIAAQgHAAgGAEQgEAEAAAGIgXAAQAAgJAGgHQAFgHAJgEQAKgEALAAQARAAALAJQAKAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgCgJQgMALgOAAQgPAAgKgJgAgOAHQgFAEgBAJQAAAGAFAEQAEAEAHAAQAGAAAGgDQAGgDADgGIAAgTIgNAAQgLAAgHAEg");
	this.shape_1.setTransform(204.5,166.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgWBCQgKgEgGgIIALgNQAKAMAQAAQAKAAAGgGQAHgGAAgMIAAgHQgKALgPAAQgSAAgLgOQgLgOAAgYQAAgXALgOQALgOASAAQAQAAAKAMIABgKIAUAAIAABgQAAAUgMALQgMAMgUAAQgLAAgLgFgAgOgrQgHAJAAARQAAAPAHAIQAGAJAKAAQANAAAHgMIAAgrQgHgMgNAAQgKAAgGAJg");
	this.shape_2.setTransform(193.775,168.275);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgeAnQgNgOAAgWIAAgDQAAgOAGgMQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABANAHAGQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgNgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_3.setTransform(183.575,166.4);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AAxAzIAAhAQAAgKgFgFQgDgEgKAAQgIAAgFAEQgFAEgBAHIAABEIgWAAIAAhBQAAgSgSAAQgOAAgGAMIAABHIgWAAIAAhjIAVAAIABAKQAKgMATAAQATAAAHAPQAMgPATAAQARAAAIAJQAIAJAAASIAABBg");
	this.shape_4.setTransform(170.1,166.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AghAmQgMgOAAgYIAAAAQgBgPAGgMQAGgMAKgGQALgGANAAQAUAAANANQANANAAAWIAAAEQAAAPgFALQgGAMgKAGQgLAHgOAAQgUAAgNgOgAgQgYQgHAIAAARQAAAPAHAJQAFAJALAAQAMAAAGgJQAGgJAAgQQAAgPgGgJQgHgJgLAAQgKAAgGAJg");
	this.shape_5.setTransform(156.45,166.4);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHAMIAABHIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAkIAABBg");
	this.shape_6.setTransform(141.025,166.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AggArQgKgJAAgMQAAgQAMgIQAMgJAVAAIANAAIAAgGQAAgIgEgFQgEgEgIAAQgIAAgFAEQgEAEAAAGIgXAAQAAgJAGgHQAFgHAJgEQAKgEALAAQARAAALAJQAKAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgCgJQgMALgOAAQgPAAgJgJgAgOAHQgFAEgBAJQAAAGAFAEQAEAEAHAAQAGAAAGgDQAFgDADgGIAAgTIgMAAQgLAAgHAEg");
	this.shape_7.setTransform(130.6,166.4);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AggA6QgLgOAAgZQAAgWAKgOQALgOATAAQAOAAAKALIAAgzIAXAAIAACNIgUAAIgBgKQgLAMgPAAQgTAAgKgOgAgPgEQgFAIAAARQAAAQAFAIQAGAJAKAAQAOAAAGgNIAAgpQgGgNgOAAQgKAAgGAJg");
	this.shape_8.setTransform(119.85,164.375);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgOATQAFgIACgHQACgFAAgHIAAgRIAUAAIAAAQQgBAJgEAKQgFAKgGAGg");
	this.shape_9.setTransform(107.5,171.825);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgfA2QgNgPAAgYIAAgIQABgjAQgUQASgUAgAAIACAAIAAATIgDAAQgTAAgLAKQgLAKgBATQAKgMAQAAQASAAAKANQALAMgBATQABAVgMANQgMANgVAAQgSAAgNgPgAgMAAQgGAEgDAHIAAAHQAAAPAGAJQAGAIAJAAQALAAAGgHQAFgIAAgMQAAgMgFgIQgGgGgLAAQgGAAgGADg");
	this.shape_10.setTransform(100.5,164.725);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgXAJIAAgRIAvAAIAAARg");
	this.shape_11.setTransform(91.8,165.65);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgIQAMgJAVAAIAOAAIAAgGQAAgIgFgFQgEgEgIAAQgHAAgGAEQgEAEAAAGIgXAAQAAgJAGgHQAFgHAKgEQAJgEALAAQARAAALAJQAKAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgCgJQgMALgOAAQgPAAgKgJgAgOAHQgFAEAAAJQgBAGAFAEQAEAEAHAAQAGAAAGgDQAFgDAEgGIAAgTIgNAAQgLAAgHAEg");
	this.shape_12.setTransform(83.55,166.4);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgWBCQgKgEgGgIIALgNQAKAMAQAAQAKAAAGgGQAHgGAAgMIAAgHQgKALgPAAQgSAAgLgOQgLgOAAgYQAAgXALgOQALgOASAAQAQAAAKAMIABgKIAUAAIAABgQAAAUgMALQgMAMgUAAQgLAAgLgFgAgOgrQgHAJAAARQAAAPAHAIQAGAJAKAAQANAAAHgMIAAgrQgHgMgNAAQgKAAgGAJg");
	this.shape_13.setTransform(72.825,168.275);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgeAnQgNgOAAgWIAAgDQAAgOAGgMQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABANAHAGQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgNgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_14.setTransform(62.625,166.4);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AAxAzIAAhAQgBgKgDgFQgFgEgJAAQgIAAgFAEQgFAEgBAHIAABEIgWAAIAAhBQgBgSgRAAQgOAAgGAMIAABHIgWAAIAAhjIAVAAIABAKQAKgMATAAQATAAAHAPQAMgPATAAQARAAAIAJQAIAJAAASIAABBg");
	this.shape_15.setTransform(49.15,166.3);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AghAmQgMgOAAgYIAAAAQgBgPAGgMQAGgMAKgGQALgGANAAQAUAAANANQAMANABAWIAAAEQAAAPgFALQgGAMgKAGQgLAHgOAAQgUAAgNgOgAgRgYQgGAIAAARQAAAPAGAJQAHAJAKAAQAMAAAGgJQAGgJAAgQQAAgPgGgJQgHgJgLAAQgKAAgHAJg");
	this.shape_16.setTransform(35.5,166.4);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgOATQAFgIACgHQACgFAAgHIAAgRIAUAAIAAAQQgBAJgEAKQgFAKgGAGg");
	this.shape_17.setTransform(356.9,145.025);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgfA7QgNgLAAgQIAXAAQAAAIAGAGQAGAFAJABQAKgBAGgFQAGgGAAgLQAAgKgGgGQgGgFgMgBIgNAAIAAgQIAOAAQAJAAAGgGQAGgFAAgKQAAgJgFgGQgFgGgKAAQgIAAgGAGQgGAFAAAJIgXAAQAAgLAGgJQAFgIAKgFQAKgEAMgBQAUAAALALQAMAKAAASQAAAJgGAIQgGAIgJAEQALADAGAIQAGAJAAAKQAAATgNALQgMAKgUABQgTAAgMgLg");
	this.shape_18.setTransform(349.575,137.85);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgXAJIAAgRIAvAAIAAARg");
	this.shape_19.setTransform(341.2,138.85);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgIQALgIAWgBIAOAAIAAgGQAAgHgFgGQgEgEgIAAQgHAAgGAEQgEAEAAAFIgXAAQAAgHAFgIQAGgHAKgEQAJgEALAAQARAAAKAJQALAIAAARIAAAsQAAANAEAIIAAACIgXAAIgCgKQgLAMgPAAQgPAAgKgJgAgOAHQgFAEAAAJQgBAGAFAEQAEAEAHAAQAGAAAGgEQAGgCADgGIAAgTIgNAAQgLAAgHAEg");
	this.shape_20.setTransform(332.95,139.6);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgWBCQgKgEgGgIIALgNQAKAMAQAAQAKAAAGgGQAHgGAAgMIAAgHQgKALgPAAQgSAAgLgOQgLgOAAgYQAAgXALgOQALgOASAAQAQAAAKAMIABgKIAUAAIAABgQAAAUgMALQgMAMgUAAQgLAAgLgFgAgOgrQgHAJAAARQAAAPAHAIQAGAJAKAAQANAAAHgMIAAgrQgHgMgNAAQgKAAgGAJg");
	this.shape_21.setTransform(322.225,141.475);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgeAnQgNgOAAgWIAAgDQAAgPAGgLQAGgMAKgGQALgHALAAQAVAAALANQALANAAAYIAAAIIhAAAQABAMAHAIQAHAHAKAAQAQAAAKgNIAMAMQgGAJgKAFQgKAFgNAAQgUAAgOgNgAgNgaQgFAGgCAMIAqAAIAAgCQgBgLgFgHQgFgFgKAAQgIAAgGAHg");
	this.shape_22.setTransform(312.025,139.6);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AAwAzIAAhAQAAgKgDgFQgFgEgKAAQgHAAgFAEQgFAFgCAGIAABEIgVAAIAAhBQgBgSgRAAQgOAAgGALIAABIIgWAAIAAhjIAVAAIABAKQALgMASAAQATAAAIAPQAKgPAUAAQARAAAIAJQAIAJAAASIAABBg");
	this.shape_23.setTransform(298.55,139.5);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AghAmQgMgOAAgYIAAAAQAAgPAFgLQAGgNAKgGQALgGANAAQAUAAANANQAMANABAVIAAAFQABAOgGANQgGALgKAHQgLAGgOAAQgUAAgNgOgAgRgYQgGAIAAARQAAAPAGAJQAHAJAKAAQALAAAHgJQAGgJAAgQQAAgPgHgJQgGgJgLAAQgKAAgHAJg");
	this.shape_24.setTransform(284.9,139.6);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AATBHIAAhBQAAgJgEgEQgFgFgJAAQgMAAgHAMIAABHIgXAAIAAiNIAXAAIAAA1QALgNAQAAQAgAAABAkIAABBg");
	this.shape_25.setTransform(254.825,137.475);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AggAqQgIgKAAgSIAAhAIAWAAIAABAQAAATAQAAQAQAAAFgMIAAhHIAWAAIAABjIgUAAIgBgKQgKAMgSAAQgPAAgJgJg");
	this.shape_26.setTransform(244.25,139.675);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHAMIAABHIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAkIAABBg");
	this.shape_27.setTransform(233.725,139.5);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgeAnQgNgOAAgWIAAgDQAAgPAGgLQAGgMAKgGQALgHALAAQAVAAALANQALANAAAYIAAAIIhAAAQABAMAHAIQAHAHAKAAQAQAAAKgNIAMAMQgGAJgKAFQgKAFgNAAQgUAAgOgNgAgNgaQgFAGgCAMIAqAAIAAgCQgBgLgFgHQgFgFgKAAQgIAAgGAHg");
	this.shape_28.setTransform(223.425,139.6);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgVBYIAAgSIAIABQALAAABgNIAAhsIAVAAIAABsQAAAPgHAJQgIAHgNABIgNgCgAAAhEQgDgEAAgFQAAgEADgEQADgEAGABQAGgBADAEQAEAEgBAEQABAFgEAEQgDADgGAAQgGAAgDgDg");
	this.shape_29.setTransform(214.95,139.7);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AASBHIgdgrIgKALIAAAgIgWAAIAAiNIAWAAIAABRIAHgJIAbgeIAbAAIglApIApA6g");
	this.shape_30.setTransform(189.775,137.475);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgIQALgIAWgBIAOAAIAAgGQAAgHgFgGQgEgEgIAAQgHAAgGAEQgEAEAAAFIgXAAQAAgHAFgIQAGgHAKgEQAJgEAKAAQASAAAKAJQALAIAAARIAAAsQAAANAEAIIAAACIgXAAIgCgKQgLAMgPAAQgPAAgKgJgAgOAHQgFAEAAAJQgBAGAFAEQAEAEAHAAQAGAAAGgEQAGgCADgGIAAgTIgNAAQgLAAgHAEg");
	this.shape_31.setTransform(179.05,139.6);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgLAjIAAg4IgRAAIAAgRIARAAIAAgYIAWAAIAAAYIARAAIAAARIgRAAIAAA3QAAAGACACQACACAGABIAIgBIAAARQgIACgHABQgZAAAAgdg");
	this.shape_32.setTransform(170.525,138.45);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AASBHIgdgrIgKALIAAAgIgWAAIAAiNIAWAAIAABRIAHgJIAbgeIAbAAIglApIApA6g");
	this.shape_33.setTransform(143.875,137.475);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgIQALgIAWgBIAOAAIAAgGQAAgHgFgGQgEgEgIAAQgHAAgGAEQgEAEAAAFIgXAAQAAgHAFgIQAGgHAKgEQAJgEAKAAQASAAAKAJQALAIAAARIAAAsQAAANAEAIIAAACIgXAAIgCgKQgLAMgPAAQgPAAgKgJgAgOAHQgFAEAAAJQgBAGAFAEQAEAEAHAAQAGAAAGgEQAGgCADgGIAAgTIgNAAQgLAAgHAEg");
	this.shape_34.setTransform(133.15,139.6);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AAxAzIAAhAQAAgKgFgFQgDgEgKAAQgIAAgFAEQgFAFgBAGIAABEIgWAAIAAhBQAAgSgSAAQgOAAgGALIAABIIgWAAIAAhjIAVAAIABAKQAKgMATAAQATAAAHAPQAMgPATAAQARAAAIAJQAIAJAAASIAABBg");
	this.shape_35.setTransform(119.7,139.5);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgeAnQgNgOAAgWIAAgDQAAgPAGgLQAGgMAKgGQALgHALAAQAVAAALANQALANAAAYIAAAIIhAAAQABAMAHAIQAHAHAKAAQAQAAAKgNIAMAMQgGAJgKAFQgKAFgNAAQgUAAgOgNgAgNgaQgFAGgCAMIAqAAIAAgCQgBgLgFgHQgFgFgKAAQgIAAgGAHg");
	this.shape_36.setTransform(106.425,139.6);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgKBHIAAiNIAVAAIAACNg");
	this.shape_37.setTransform(98.825,137.475);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AAwAzIAAhAQAAgKgDgFQgFgEgKAAQgHAAgFAEQgFAFgCAGIAABEIgVAAIAAhBQgBgSgRAAQgOAAgGALIAABIIgWAAIAAhjIAVAAIABAKQALgMASAAQATAAAIAPQAKgPAUAAQARAAAIAJQAIAJAAASIAABBg");
	this.shape_38.setTransform(68.7,139.5);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgIQALgIAWgBIAOAAIAAgGQAAgHgFgGQgEgEgIAAQgHAAgGAEQgEAEAAAFIgXAAQAAgHAGgIQAFgHAKgEQAJgEAKAAQASAAAKAJQALAIAAARIAAAsQAAANAEAIIAAACIgXAAIgCgKQgLAMgPAAQgPAAgKgJgAgOAHQgFAEAAAJQgBAGAFAEQAEAEAHAAQAGAAAGgEQAGgCADgGIAAgTIgNAAQgLAAgHAEg");
	this.shape_39.setTransform(55.3,139.6);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgUAwQgKgFgFgIQgGgIABgIIAVAAQABAHAGAEQAFAFAIAAQAJAAAFgEQAEgDAAgGQAAgFgEgEQgGgDgKgCQgMgCgHgEQgRgHAAgQQAAgNAKgIQAMgJAPAAQATAAALAJQAKAIABAPIgXAAQAAgHgEgEQgGgFgIABQgGgBgFAEQgEAEAAAFQAAAFAEADQAFADAMADQANADAHAEQAIADAEAGQADAFABAIQgBAOgKAIQgMAJgSAAQgLAAgKgEg");
	this.shape_40.setTransform(45.25,139.6);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgIQALgIAWgBIANAAIAAgGQAAgHgDgGQgFgEgIAAQgIAAgEAEQgGAEAAAFIgWAAQAAgHAFgIQAGgHAKgEQAJgEAKAAQASAAAKAJQALAIAAARIAAAsQAAANAEAIIAAACIgXAAIgDgKQgLAMgOAAQgPAAgKgJgAgNAHQgHAEABAJQAAAGAEAEQAEAEAIAAQAFAAAGgEQAGgCACgGIAAgTIgLAAQgMAAgGAEg");
	this.shape_41.setTransform(35.25,139.6);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgOATQAGgIACgHQACgFgBgHIAAgRIAUAAIAAAQQAAAJgFAKQgFAKgHAGg");
	this.shape_42.setTransform(356.95,118.225);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgKBHIAAiNIAVAAIAACNg");
	this.shape_43.setTransform(352.775,110.675);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgHQALgJAWAAIAOAAIAAgHQAAgHgFgGQgEgEgIAAQgHAAgFAEQgGADABAGIgXAAQAAgHAFgIQAGgHAKgEQAJgEAKAAQASAAAKAIQALAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgDgKQgLAMgOAAQgPAAgKgJgAgOAHQgFAEAAAJQgBAGAFAEQAEAEAIAAQAFAAAGgEQAGgDADgFIAAgTIgMAAQgMAAgHAEg");
	this.shape_44.setTransform(345.2,112.8);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgZAzIAAhkIAVAAIABAMQAHgNAOAAIAIABIAAAVIgJgBQgPAAgFANIAABDg");
	this.shape_45.setTransform(337.125,112.7);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgeAmQgNgNAAgXIAAgCQAAgOAGgMQAGgMAKgGQALgHALAAQAVAAALANQALANAAAYIAAAIIhAAAQABAMAHAIQAHAHAKAAQAQAAAKgNIAMAMQgGAJgKAFQgKAFgNAAQgUAAgOgOgAgNgaQgFAGgCAMIAqAAIAAgCQgBgMgFgFQgFgGgKAAQgIAAgGAHg");
	this.shape_46.setTransform(328.325,112.8);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgKgEgEQgEgFgKAAQgMAAgHAMIAABHIgXAAIAAhkIAWAAIAAAMQAMgNARAAQAfAAABAkIAABBg");
	this.shape_47.setTransform(317.875,112.7);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_48.setTransform(310.175,110.875);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AAwAzIAAhBQAAgJgDgEQgFgFgKAAQgHAAgFAFQgFAEgBAGIAABEIgWAAIAAhBQgBgSgRAAQgOAAgGALIAABIIgWAAIAAhkIAVAAIABALQALgMASAAQATAAAIAPQAKgPAUAAQARAAAIAJQAIAJAAASIAABBg");
	this.shape_49.setTransform(299.45,112.7);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgKgEgEQgEgFgKAAQgMAAgHAMIAABHIgXAAIAAhkIAWAAIAAAMQAMgNARAAQAfAAABAkIAABBg");
	this.shape_50.setTransform(269.125,112.7);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgHQALgJAWAAIAOAAIAAgHQAAgHgFgGQgEgEgIAAQgHAAgGAEQgEADAAAGIgXAAQAAgHAFgIQAGgHAKgEQAJgEALAAQARAAAKAIQALAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgCgKQgLAMgPAAQgPAAgKgJgAgOAHQgFAEAAAJQgBAGAFAEQAEAEAHAAQAGAAAGgEQAGgDADgFIAAgTIgNAAQgLAAgHAEg");
	this.shape_51.setTransform(258.7,112.8);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AggA6QgLgOAAgZQAAgWALgOQALgOASAAQAPAAAJALIAAgzIAXAAIAACNIgVAAIgBgKQgKAMgPAAQgSAAgLgOgAgOgEQgHAIAAARQAAAQAHAIQAFAJAKAAQAOAAAGgNIAAgpQgGgNgOAAQgKAAgFAJg");
	this.shape_52.setTransform(247.95,110.775);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AAlBEIgLggIgzAAIgLAgIgZAAIAziGIAVAAIAzCGgAgTARIAnAAIgUg3g");
	this.shape_53.setTransform(219.675,111.05);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgKgEgEQgEgFgKAAQgMAAgHAMIAABHIgXAAIAAhkIAWAAIAAAMQAMgNARAAQAfAAABAkIAABBg");
	this.shape_54.setTransform(191.275,112.7);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_55.setTransform(183.575,110.875);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AAwAzIAAhBQAAgJgDgEQgEgFgLAAQgHAAgFAFQgFAEgCAGIAABEIgVAAIAAhBQAAgSgSAAQgOAAgFALIAABIIgXAAIAAhkIAVAAIABALQALgMASAAQATAAAIAPQAKgPAUAAQARAAAIAJQAIAJAAASIAABBg");
	this.shape_56.setTransform(172.85,112.7);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgHQALgJAWAAIANAAIAAgHQAAgHgDgGQgFgEgIAAQgIAAgEAEQgGADAAAGIgWAAQAAgHAFgIQAGgHAKgEQAJgEAKAAQASAAAKAIQALAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgDgKQgLAMgOAAQgPAAgKgJgAgNAHQgHAEABAJQAAAGAEAEQAEAEAIAAQAFAAAGgEQAGgDACgFIAAgTIgLAAQgMAAgGAEg");
	this.shape_57.setTransform(159.45,112.8);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AgLAjIAAg4IgRAAIAAgRIARAAIAAgZIAWAAIAAAZIARAAIAAARIgRAAIAAA3QAAAGACACQACACAGAAIAIAAIAAARQgIADgHgBQgZAAAAgcg");
	this.shape_58.setTransform(150.925,111.65);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_59.setTransform(145.575,110.875);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgJAyIgjhjIAYAAIAUBHIAVhHIAYAAIgjBjg");
	this.shape_60.setTransform(138.425,112.775);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgOATQAGgIACgHQABgFAAgHIAAgRIAUAAIAAAQQAAAJgFAKQgFAKgHAGg");
	this.shape_61.setTransform(114.5,118.225);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AgUAvQgKgEgFgIQgFgHgBgJIAXAAQAAAHAFAEQAGAFAIAAQAJAAAEgEQAGgDgBgGQABgFgGgEQgEgDgLgCQgMgCgIgEQgQgIAAgPQAAgNALgJQALgIAQAAQARAAALAIQALAKAAAOIgWAAQAAgGgFgFQgFgEgHAAQgHAAgEADQgFAEAAAFQAAAGAEACQAEADANADQANADAIAEQAHADAEAGQADAGAAAHQAAAOgLAJQgLAIgSAAQgLAAgKgFg");
	this.shape_62.setTransform(107.85,112.8);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AASBHIgdgrIgKALIAAAgIgWAAIAAiNIAWAAIAABRIAHgJIAbgeIAbAAIglApIApA6g");
	this.shape_63.setTransform(98.675,110.675);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AgeAmQgNgNAAgXIAAgCQAAgOAGgMQAGgMAKgGQALgHALAAQAVAAALANQALANAAAYIAAAIIhAAAQABAMAHAIQAHAHAKAAQAQAAAKgNIAMAMQgGAJgKAFQgKAFgNAAQgUAAgOgOgAgNgaQgFAGgCAMIAqAAIAAgCQgBgMgFgFQgFgGgKAAQgIAAgGAHg");
	this.shape_64.setTransform(88.075,112.8);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AgKBHIAAiNIAVAAIAACNg");
	this.shape_65.setTransform(80.475,110.675);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AgrBGIAAiKIAVAAIABALQAKgMAPAAQATAAAKANQALAOAAAYIAAACQAAAWgLAOQgKAOgSAAQgQAAgKgLIAAAvgAgVgoIAAAsQAHAMANAAQALAAAFgJQAHgIAAgRQAAgPgHgJQgFgJgLAAQgNAAgHALg");
	this.shape_66.setTransform(72.9,114.625);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AAxAzIAAhBQAAgJgEgEQgFgFgKAAQgHAAgFAFQgFAEgBAGIAABEIgWAAIAAhBQgBgSgRAAQgOAAgGALIAABIIgWAAIAAhkIAVAAIABALQAKgMATAAQATAAAHAPQAMgPATAAQARAAAIAJQAIAJAAASIAABBg");
	this.shape_67.setTransform(59.05,112.7);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AghAmQgMgPAAgXIAAAAQgBgPAGgLQAGgMAKgHQALgGANAAQAUAAANANQAMANABAVIAAAFQAAAPgFAMQgGALgKAHQgLAGgOAAQgUAAgNgOgAgRgYQgGAJAAAQQAAAQAGAIQAHAJAKAAQAMAAAGgJQAGgJAAgQQAAgQgGgIQgHgJgLAAQgKAAgHAJg");
	this.shape_68.setTransform(45.4,112.8);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2C3E50").s().p("AASBHIgdgrIgKALIAAAgIgWAAIAAiNIAWAAIAABRIAHgJIAbgeIAbAAIglApIApA6g");
	this.shape_69.setTransform(35.675,110.675);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2C3E50").s().p("AgvBDIAAiGIAuAAQAWAAAMAJQAMAKAAASQAAAJgFAHQgFAIgKAEQALACAGAJQAGAHAAAMQAAATgMALQgMAKgXgBgAgYAxIAaAAQALAAAGgGQAGgFAAgKQAAgVgWgBIgbAAgAgYgKIAXAAQAKAAAHgEQAGgFAAgKQAAgJgGgFQgGgEgLgBIgXAAg");
	this.shape_70.setTransform(353.475,84.25);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhkIAWAAIAAAMQAMgNARAAQAfAAABAjIAABCg");
	this.shape_71.setTransform(329.025,85.9);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_72.setTransform(321.325,84.075);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#2C3E50").s().p("AAwAzIAAhBQAAgJgDgEQgFgFgKAAQgHAAgFAFQgFAEgBAGIAABEIgWAAIAAhBQgBgSgRAAQgOAAgGAMIAABHIgWAAIAAhkIAVAAIABALQAKgMATAAQATAAAHAPQAMgPATAAQARAAAIAJQAIAJAAASIAABBg");
	this.shape_73.setTransform(310.6,85.9);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#2C3E50").s().p("AggArQgKgIAAgNQAAgQAMgHQAMgKAVABIAOAAIAAgHQgBgIgEgEQgEgFgIAAQgHAAgGAEQgEADAAAHIgXAAQAAgJAGgHQAFgHAJgEQAKgEALAAQARAAALAIQAKAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgCgJQgMALgOAAQgPAAgJgJgAgOAHQgFAFgBAHQAAAHAFAEQAEAEAHAAQAGAAAGgEQAGgDADgFIAAgTIgNAAQgLAAgHAEg");
	this.shape_74.setTransform(297.2,86);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#2C3E50").s().p("AgLAiIAAg3IgRAAIAAgRIARAAIAAgZIAWAAIAAAZIARAAIAAARIgRAAIAAA3QAAAFACADQACADAGgBIAIAAIAAARQgIACgHAAQgZAAAAgdg");
	this.shape_75.setTransform(288.675,84.85);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_76.setTransform(283.325,84.075);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#2C3E50").s().p("AgJAyIgjhjIAYAAIAUBHIAVhHIAYAAIgjBjg");
	this.shape_77.setTransform(276.175,85.975);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#2C3E50").s().p("AgOATQAGgIACgHQACgFAAgHIAAgRIATAAIAAAQQgBAJgEAKQgFAKgHAGg");
	this.shape_78.setTransform(256.05,91.425);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#2C3E50").s().p("AghAmQgMgPAAgXIAAAAQAAgPAFgMQAGgLAKgHQALgGANAAQAUAAANANQAMANABAWIAAAEQABAOgGAMQgGAMgKAGQgLAHgOAAQgUAAgNgOgAgRgZQgGAJAAARQAAAQAGAIQAHAJAKAAQALAAAHgJQAGgJAAgQQAAgQgHgIQgGgJgLAAQgKAAgHAIg");
	this.shape_79.setTransform(248.9,86);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhkIAWAAIAAAMQAMgNARAAQAfAAABAjIAABCg");
	this.shape_80.setTransform(238.225,85.9);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_81.setTransform(230.525,84.075);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#2C3E50").s().p("AAwAzIAAhBQAAgJgDgEQgFgFgKAAQgHAAgFAFQgFAEgCAGIAABEIgVAAIAAhBQgBgSgRAAQgOAAgGAMIAABHIgWAAIAAhkIAVAAIABALQALgMASAAQATAAAIAPQAKgPAUAAQARAAAIAJQAIAJAAASIAABBg");
	this.shape_82.setTransform(219.8,85.9);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#2C3E50").s().p("AghArQgJgIAAgNQAAgQAMgHQAMgKAVABIAOAAIAAgHQAAgIgFgEQgEgFgIAAQgHAAgGAEQgEADAAAHIgXAAQAAgJAGgHQAFgHAKgEQAJgEALAAQARAAALAIQAKAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgCgJQgMALgOAAQgPAAgKgJgAgOAHQgFAFAAAHQgBAHAFAEQAEAEAHAAQAGAAAGgEQAFgDAEgFIAAgTIgNAAQgLAAgHAEg");
	this.shape_83.setTransform(206.4,86);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#2C3E50").s().p("AAwAzIAAhBQAAgJgDgEQgEgFgLAAQgHAAgFAFQgFAEgCAGIAABEIgVAAIAAhBQAAgSgSAAQgOAAgFAMIAABHIgXAAIAAhkIAVAAIABALQALgMASAAQATAAAIAPQALgPATAAQARAAAIAJQAIAJAAASIAABBg");
	this.shape_84.setTransform(179.95,85.9);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#2C3E50").s().p("AghArQgJgIAAgNQAAgQAMgHQALgKAWABIAOAAIAAgHQAAgIgFgEQgEgFgIAAQgHAAgFAEQgGADAAAHIgWAAQAAgJAFgHQAGgHAKgEQAJgEAKAAQASAAAKAIQALAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgCgJQgMALgOAAQgPAAgKgJgAgOAHQgFAFAAAHQgBAHAFAEQAEAEAIAAQAFAAAGgEQAGgDADgFIAAgTIgMAAQgMAAgHAEg");
	this.shape_85.setTransform(166.55,86);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#2C3E50").s().p("AgUAvQgKgEgFgIQgGgHABgKIAVAAQABAJAGADQAFAFAIAAQAJAAAEgDQAFgEABgFQgBgHgFgCQgEgDgLgDQgLgDgJgDQgQgIAAgPQAAgNAKgJQALgIAQAAQATAAALAIQAKAKABAOIgXAAQAAgHgEgEQgFgEgJgBQgGABgFADQgEADAAAHQAAAEAEADQAFADAMADQANADAHAEQAIADAEAGQADAGAAAHQABAOgLAJQgMAIgSAAQgMAAgJgFg");
	this.shape_86.setTransform(156.5,86);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#2C3E50").s().p("AggArQgKgIAAgNQAAgQAMgHQALgKAWABIANAAIAAgHQAAgIgDgEQgFgFgIAAQgIAAgEAEQgGADAAAHIgWAAQAAgJAFgHQAGgHAJgEQAKgEAKAAQASAAAKAIQALAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgDgJQgLALgOAAQgPAAgJgJgAgNAHQgHAFAAAHQABAHAEAEQAEAEAIAAQAFAAAGgEQAFgDADgFIAAgTIgLAAQgMAAgGAEg");
	this.shape_87.setTransform(146.5,86);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#2C3E50").s().p("AAxAzIAAhBQAAgJgFgEQgDgFgKAAQgIAAgFAFQgFAEgBAGIAABEIgWAAIAAhBQAAgSgSAAQgOAAgGAMIAABHIgWAAIAAhkIAVAAIABALQAKgMATAAQATAAAHAPQAMgPATAAQARAAAIAJQAIAJAAASIAABBg");
	this.shape_88.setTransform(120.05,85.9);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#2C3E50").s().p("AggArQgKgIAAgNQAAgQAMgHQALgKAWABIANAAIAAgHQAAgIgDgEQgFgFgIAAQgIAAgFAEQgEADgBAHIgWAAQAAgJAGgHQAFgHAJgEQAKgEALAAQARAAALAIQAKAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgDgJQgKALgPAAQgPAAgJgJgAgNAHQgHAFAAAHQABAHAEAEQAEAEAHAAQAGAAAGgEQAFgDADgFIAAgTIgMAAQgLAAgGAEg");
	this.shape_89.setTransform(106.65,86);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#2C3E50").s().p("AgeAmQgMgNAAgZIAAgBQAAgWAMgOQAMgOAUAAQASAAALAKQAMALAAAQIgVAAQAAgIgGgFQgFgGgJAAQgKAAgGAIQgGAHAAARIAAACQAAARAGAIQAGAIAKAAQAIAAAGgFQAGgFAAgHIAVAAQAAAJgGAJQgFAHgJAFQgKAFgLAAQgUAAgMgOg");
	this.shape_90.setTransform(96.625,86);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#2C3E50").s().p("AggArQgKgIAAgNQAAgQAMgHQALgKAWABIANAAIAAgHQAAgIgDgEQgFgFgIAAQgIAAgFAEQgEADgBAHIgWAAQAAgJAGgHQAFgHAJgEQAKgEALAAQARAAALAIQAKAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgDgJQgKALgPAAQgPAAgJgJgAgNAHQgHAFAAAHQABAHAEAEQAEAEAHAAQAGAAAGgEQAFgDADgFIAAgTIgMAAQgLAAgGAEg");
	this.shape_91.setTransform(86.4,86);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#2C3E50").s().p("AAwAzIAAhBQAAgJgDgEQgEgFgLAAQgHAAgFAFQgFAEgCAGIAABEIgVAAIAAhBQAAgSgSAAQgOAAgFAMIAABHIgXAAIAAhkIAVAAIABALQALgMASAAQATAAAIAPQAKgPAUAAQARAAAIAJQAIAJAAASIAABBg");
	this.shape_92.setTransform(72.95,85.9);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#2C3E50").s().p("AgfA7QgMgLAAgSQAAgKAGgJQAFgIALgEQgJgEgFgIQgFgIAAgKQAAgRALgLQALgKASABQATgBALAKQALALAAARQAAAKgFAIQgFAIgJAEQALAEAGAJQAFAIAAAKQAAASgMALQgMAKgUAAQgTAAgMgKgAgPANQgGAHAAAKQAAAJAGAHQAGAFAJAAQAKAAAGgFQAGgGAAgKQAAgKgGgHQgGgGgKAAQgJAAgGAGgAgMgtQgFAFAAAKQAAAJAFAGQAFAFAHAAQAJAAAFgFQAFgGAAgJQAAgJgFgFQgFgHgJABQgHAAgFAFg");
	this.shape_93.setTransform(46.275,84.25);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#2C3E50").s().p("AgrBEIAAgPIAsgxQAKgKAEgHQAEgIAAgHQAAgKgGgFQgFgHgIABQgLgBgGAIQgGAGAAAMIgXAAQAAgMAGgLQAFgKALgFQAKgFAOAAQATgBALAKQALAKAAASQAAAKgFALQgGAKgNAOIggAjIA+AAIAAASg");
	this.shape_94.setTransform(35.525,84.15);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#2C3E50").s().p("AgWBCQgKgEgGgIIALgNQAKAMAQAAQAKAAAGgGQAHgGAAgMIAAgHQgKALgPAAQgSAAgLgOQgLgOAAgYQAAgXALgOQALgOASAAQAQAAAKAMIABgKIAUAAIAABgQAAAUgMALQgMAMgUAAQgLAAgLgFgAgOgrQgHAJAAARQAAAPAHAIQAGAJAKAAQANAAAHgMIAAgrQgHgMgNAAQgKAAgGAJg");
	this.shape_95.setTransform(353.825,61.075);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgKgEgEQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAjIAABCg");
	this.shape_96.setTransform(343.375,59.1);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#2C3E50").s().p("AggAqQgJgKABgSIAAhAIAWAAIAABAQAAATAQAAQAPAAAGgMIAAhHIAXAAIAABjIgVAAIgBgKQgKAMgSAAQgPAAgJgJg");
	this.shape_97.setTransform(332.8,59.275);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#2C3E50").s().p("AggA6QgLgOAAgZQAAgWALgOQALgOARAAQAPAAAKALIAAgzIAXAAIAACNIgVAAIgBgKQgKAMgQAAQgSAAgKgOgAgPgEQgFAIgBARQABAQAFAIQAGAJAKAAQAOAAAGgNIAAgpQgGgNgOAAQgKAAgGAJg");
	this.shape_98.setTransform(321.95,57.175);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgKgEgEQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAjIAABCg");
	this.shape_99.setTransform(311.525,59.1);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgHQALgKAWAAIAOAAIAAgGQAAgIgFgEQgEgFgIAAQgHAAgFAEQgGAEAAAGIgWAAQAAgJAFgHQAGgHAKgEQAJgEAKAAQASAAAKAIQALAKAAAPIAAAtQAAANAEAJIAAABIgXAAIgCgJQgMALgOAAQgPAAgKgJgAgOAHQgFAFAAAHQgBAHAFAEQAEAEAIAAQAFAAAGgDQAGgEADgFIAAgTIgMAAQgMAAgHAEg");
	this.shape_100.setTransform(301.1,59.2);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#2C3E50").s().p("AgWBCQgKgEgGgIIALgNQAKAMAQAAQAKAAAGgGQAHgGAAgMIAAgHQgKALgPAAQgSAAgLgOQgLgOAAgYQAAgXALgOQALgOASAAQAQAAAKAMIABgKIAUAAIAABgQAAAUgMALQgMAMgUAAQgLAAgLgFgAgOgrQgHAJAAARQAAAPAHAIQAGAJAKAAQANAAAHgMIAAgrQgHgMgNAAQgKAAgGAJg");
	this.shape_101.setTransform(290.375,61.075);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgKgEgEQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAjIAABCg");
	this.shape_102.setTransform(279.925,59.1);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#2C3E50").s().p("AgeAnQgNgOAAgWIAAgDQAAgOAGgMQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABAMAHAHQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgNgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_103.setTransform(269.625,59.2);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#2C3E50").s().p("AAxAzIAAhAQgBgKgDgFQgFgEgKAAQgHAAgFAEQgFAEgBAHIAABEIgWAAIAAhBQgBgSgRAAQgOAAgGAMIAABHIgWAAIAAhjIAVAAIABAKQAKgMATAAQATAAAHAPQAMgPATAAQARAAAIAJQAIAJAAASIAABBg");
	this.shape_104.setTransform(256.15,59.1);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#2C3E50").s().p("AggArQgKgJAAgMQAAgQAMgHQALgKAWAAIANAAIAAgGQAAgIgDgEQgFgFgIAAQgIAAgEAEQgGAEAAAGIgWAAQAAgJAFgHQAGgHAJgEQAKgEAKAAQASAAAKAIQALAKAAAPIAAAtQAAANAEAJIAAABIgXAAIgDgJQgLALgOAAQgPAAgJgJgAgNAHQgHAFAAAHQABAHAEAEQAEAEAIAAQAFAAAGgDQAFgEADgFIAAgTIgLAAQgMAAgGAEg");
	this.shape_105.setTransform(232,59.2);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgKgEgEQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAjIAABCg");
	this.shape_106.setTransform(221.575,59.1);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#2C3E50").s().p("AgeAnQgNgOAAgWIAAgDQAAgOAGgMQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABAMAHAHQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgNgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_107.setTransform(211.275,59.2);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#2C3E50").s().p("AgZAzIAAhjIAVAAIABALQAHgNAOAAIAIABIAAAVIgJAAQgPgBgFAMIAABEg");
	this.shape_108.setTransform(203.175,59.1);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgHQAMgKAVAAIAOAAIAAgGQAAgIgFgEQgEgFgIAAQgHAAgGAEQgEAEAAAGIgXAAQAAgJAGgHQAFgHAKgEQAJgEALAAQARAAAKAIQALAKAAAPIAAAtQAAANAEAJIAAABIgXAAIgCgJQgMALgOAAQgPAAgKgJgAgOAHQgFAFAAAHQgBAHAFAEQAEAEAHAAQAGAAAGgDQAFgEAEgFIAAgTIgNAAQgLAAgHAEg");
	this.shape_109.setTransform(194.25,59.2);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#2C3E50").s().p("AASBHIgdgrIgKALIAAAgIgWAAIAAiNIAWAAIAABRIAHgJIAbgeIAbAAIglApIApA6g");
	this.shape_110.setTransform(184.775,57.075);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgKgEgEQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAjIAABCg");
	this.shape_111.setTransform(163.175,59.1);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgHQAMgKAVAAIAOAAIAAgGQgBgIgEgEQgEgFgIAAQgHAAgGAEQgEAEAAAGIgXAAQAAgJAGgHQAFgHAJgEQAKgEALAAQARAAALAIQAKAKAAAPIAAAtQAAANAEAJIAAABIgXAAIgCgJQgMALgOAAQgPAAgKgJgAgOAHQgFAFgBAHQAAAHAFAEQAEAEAHAAQAGAAAGgDQAGgEADgFIAAgTIgNAAQgLAAgHAEg");
	this.shape_112.setTransform(152.75,59.2);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#2C3E50").s().p("AgWBCQgKgEgGgIIALgNQAKAMAQAAQAKAAAGgGQAHgGAAgMIAAgHQgKALgPAAQgSAAgLgOQgLgOAAgYQAAgXALgOQALgOASAAQAQAAAKAMIABgKIAUAAIAABgQAAAUgMALQgMAMgUAAQgLAAgLgFgAgOgrQgHAJAAARQAAAPAHAIQAGAJAKAAQANAAAHgMIAAgrQgHgMgNAAQgKAAgGAJg");
	this.shape_113.setTransform(142.025,61.075);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgKgEgEQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAjIAABCg");
	this.shape_114.setTransform(131.575,59.1);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#2C3E50").s().p("AggArQgKgJAAgMQAAgQAMgHQAMgKAVAAIANAAIAAgGQAAgIgDgEQgFgFgIAAQgIAAgFAEQgEAEAAAGIgXAAQAAgJAGgHQAFgHAJgEQAKgEALAAQARAAALAIQAKAKAAAPIAAAtQAAANAEAJIAAABIgXAAIgCgJQgMALgOAAQgPAAgJgJgAgOAHQgFAFgBAHQAAAHAFAEQAEAEAHAAQAGAAAGgDQAFgEADgFIAAgTIgMAAQgLAAgHAEg");
	this.shape_115.setTransform(121.15,59.2);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#2C3E50").s().p("AgrBGIAAiKIAVAAIABALQAJgMARAAQASAAALANQAKAOAAAYIAAACQAAAWgKAOQgLAOgSAAQgPAAgKgLIAAAvgAgUgoIAAAsQAFAMAOAAQAKAAAHgJQAFgIABgRQgBgPgFgJQgHgJgKAAQgOAAgFALg");
	this.shape_116.setTransform(110.85,61.025);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#2C3E50").s().p("AgZAzIAAhjIAVAAIABALQAHgNAOAAIAIABIAAAVIgJAAQgPgBgFAMIAABEg");
	this.shape_117.setTransform(91.625,59.1);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#2C3E50").s().p("AgeAnQgNgOAAgWIAAgDQAAgOAGgMQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABAMAHAHQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgNgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_118.setTransform(82.825,59.2);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#2C3E50").s().p("AgVA7IgCALIgUAAIAAiNIAXAAIAAA0QAJgMAQAAQASAAALAOQAKANAAAYIAAABQAAAXgKAOQgLAOgSAAQgRAAgJgNgAgUAAIAAApQAFANAPAAQAKAAAGgIQAFgIAAgQIAAgDQABgQgGgHQgGgJgKAAQgPAAgFANg");
	this.shape_119.setTransform(72.5,57.175);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#2C3E50").s().p("AAxAzIAAhAQgBgKgEgFQgEgEgJAAQgIAAgFAEQgFAEgCAHIAABEIgVAAIAAhBQAAgSgSAAQgOAAgFAMIAABHIgXAAIAAhjIAVAAIABAKQALgMASAAQATAAAHAPQALgPAUAAQARAAAIAJQAIAJAAASIAABBg");
	this.shape_120.setTransform(58.65,59.1);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#2C3E50").s().p("AggAqQgIgKAAgSIAAhAIAWAAIAABAQAAATAQAAQAQAAAFgMIAAhHIAWAAIAABjIgUAAIgBgKQgKAMgRAAQgRAAgIgJg");
	this.shape_121.setTransform(45.1,59.275);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#2C3E50").s().p("AgUAwQgKgFgFgIQgFgIgBgJIAXAAQAAAIAFAFQAGAEAIAAQAJAAAEgDQAGgEgBgFQABgHgGgCQgEgDgLgDQgMgDgIgDQgQgIAAgPQAAgNALgJQALgIAQAAQARAAALAIQALAJAAAPIgWAAQAAgGgFgFQgFgFgHAAQgHAAgEAEQgFADAAAHQAAAEAEAEQAEACANADQANADAIAEQAHADAEAGQADAFAAAJQAAANgLAIQgLAJgSAAQgLAAgKgEg");
	this.shape_122.setTransform(34.95,59.2);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_123.setTransform(356.925,30.475);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgIQALgIAWgBIANAAIAAgGQAAgIgDgFQgFgEgIAAQgIAAgEAEQgGAEAAAFIgWAAQAAgHAFgIQAGgHAKgEQAJgEAKAAQASAAAKAJQALAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgDgJQgLALgOAAQgPAAgKgJgAgNAHQgHAEABAJQAAAGAEAEQAEAEAIAAQAFAAAGgDQAGgDACgGIAAgTIgLAAQgMAAgGAEg");
	this.shape_124.setTransform(349.35,32.4);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#2C3E50").s().p("AgWBCQgKgEgGgIIALgNQAKAMAQAAQAKAAAGgGQAHgGAAgMIAAgHQgKALgPAAQgSAAgLgOQgLgOAAgYQAAgXALgOQALgOASAAQAQAAAKAMIABgKIAUAAIAABgQAAAUgMALQgMAMgUAAQgLAAgLgFgAgOgrQgHAJAAARQAAAPAHAIQAGAJAKAAQANAAAHgMIAAgrQgHgMgNAAQgKAAgGAJg");
	this.shape_125.setTransform(338.625,34.275);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#2C3E50").s().p("AggArQgKgJAAgMQAAgQAMgIQALgIAWgBIANAAIAAgGQAAgIgDgFQgFgEgIAAQgIAAgEAEQgGAEAAAFIgWAAQAAgHAFgIQAGgHAJgEQAKgEAKAAQASAAAKAJQALAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgDgJQgLALgOAAQgPAAgJgJgAgNAHQgHAEAAAJQABAGAEAEQAEAEAIAAQAFAAAGgDQAFgDADgGIAAgTIgLAAQgMAAgGAEg");
	this.shape_126.setTransform(328.3,32.4);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#2C3E50").s().p("AgWA7IgBALIgUAAIAAiNIAWAAIAAA0QALgMAPAAQASAAALAOQAKANAAAYIAAABQAAAXgKAOQgLAOgSAAQgQAAgLgNgAgVAAIAAApQAHANAOAAQAKAAAGgIQAFgIAAgQIAAgDQABgQgGgHQgGgJgKAAQgOAAgHANg");
	this.shape_127.setTransform(318,30.375);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#2C3E50").s().p("AgeAnQgNgOAAgWIAAgDQAAgPAGgLQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABANAHAGQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgNgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_128.setTransform(307.425,32.4);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#2C3E50").s().p("AgUAwQgKgFgFgIQgGgIABgIIAVAAQABAIAGAEQAFAEAIAAQAJAAAEgEQAFgDABgGQgBgFgFgDQgFgDgKgDQgLgDgJgDQgQgHAAgQQAAgNAKgIQALgJAQAAQATAAALAJQAKAIABAPIgXAAQAAgHgEgEQgFgFgJABQgGAAgFADQgEAEAAAFQAAAFAEAEQAFACAMADQANADAHAEQAIADAEAGQADAFAAAJQABANgLAIQgMAJgSAAQgMAAgJgEg");
	this.shape_129.setTransform(297.35,32.4);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHAMIAABHIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAkIAABBg");
	this.shape_130.setTransform(270.025,32.3);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgIQALgIAWgBIAOAAIAAgGQAAgIgFgFQgEgEgIAAQgHAAgGAEQgEAEAAAFIgXAAQAAgHAFgIQAGgHAKgEQAJgEAKAAQASAAAKAJQALAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgCgJQgLALgPAAQgPAAgKgJgAgOAHQgFAEAAAJQgBAGAFAEQAEAEAHAAQAGAAAGgDQAGgDADgGIAAgTIgNAAQgLAAgHAEg");
	this.shape_131.setTransform(259.6,32.4);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#2C3E50").s().p("AASBHIgdgrIgKALIAAAgIgWAAIAAiNIAWAAIAABRIAHgJIAbgeIAbAAIglApIApA6g");
	this.shape_132.setTransform(250.125,30.275);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_133.setTransform(242.125,30.475);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#2C3E50").s().p("AggA6QgLgOAAgZQAAgWALgOQALgOARAAQAQAAAJALIAAgzIAXAAIAACNIgVAAIgBgKQgKAMgQAAQgRAAgLgOgAgOgEQgHAIAAARQAAAQAHAIQAFAJAKAAQAOAAAGgNIAAgpQgGgNgOAAQgKAAgFAJg");
	this.shape_134.setTransform(234.1,30.375);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgIQALgIAWgBIANAAIAAgGQABgIgEgFQgFgEgIAAQgIAAgEAEQgGAEAAAFIgWAAQAAgHAFgIQAGgHAKgEQAJgEAKAAQASAAAKAJQALAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgDgJQgLALgOAAQgPAAgKgJgAgNAHQgHAEABAJQAAAGAEAEQAEAEAIAAQAFAAAGgDQAGgDACgGIAAgTIgLAAQgMAAgGAEg");
	this.shape_135.setTransform(223.8,32.4);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#2C3E50").s().p("AgUBYIAAgSIAIABQALAAAAgNIAAhsIAWAAIAABsQAAAPgIAJQgHAHgPABIgLgCgAAAhEQgDgEAAgFQAAgEADgEQACgEAHABQAGgBADAEQAEAEAAAEQAAAFgEAEQgDAEgGgBQgHABgCgEg");
	this.shape_136.setTransform(215.35,32.5);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_137.setTransform(211.475,30.475);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#2C3E50").s().p("AggA6QgLgOAAgZQAAgWAKgOQALgOATAAQAOAAAKALIAAgzIAXAAIAACNIgUAAIgBgKQgLAMgPAAQgTAAgKgOgAgPgEQgFAIAAARQAAAQAFAIQAGAJAKAAQAOAAAGgNIAAgpQgGgNgOAAQgKAAgGAJg");
	this.shape_138.setTransform(203.45,30.375);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#2C3E50").s().p("AgLAjIAAg4IgRAAIAAgRIARAAIAAgYIAWAAIAAAYIARAAIAAARIgRAAIAAA3QAAAFACADQACADAGAAIAIgBIAAARQgIACgHABQgZAAAAgdg");
	this.shape_139.setTransform(177.725,31.25);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#2C3E50").s().p("AggArQgKgJAAgMQAAgQAMgIQALgIAWgBIANAAIAAgGQAAgIgDgFQgFgEgIAAQgIAAgEAEQgFAEgBAFIgWAAQAAgHAGgIQAFgHAJgEQAKgEALAAQARAAALAJQAKAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgDgJQgKALgPAAQgPAAgJgJgAgNAHQgHAEAAAJQABAGAEAEQAEAEAHAAQAGAAAGgDQAFgDADgGIAAgTIgMAAQgLAAgGAEg");
	this.shape_140.setTransform(169.65,32.4);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#2C3E50").s().p("AgrBGIAAiKIAVAAIABALQAJgMARAAQASAAALANQAKAOAAAYIAAACQAAAWgKAOQgLAOgSAAQgQAAgJgLIAAAvgAgUgoIAAAsQAFAMAPAAQAJAAAHgJQAFgIAAgRQAAgPgFgJQgHgJgJAAQgPAAgFALg");
	this.shape_141.setTransform(159.35,34.225);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgIQALgIAWgBIAOAAIAAgGQgBgIgDgFQgFgEgIAAQgIAAgEAEQgGAEAAAFIgWAAQAAgHAFgIQAGgHAKgEQAJgEAKAAQASAAAKAJQALAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgDgJQgLALgOAAQgPAAgKgJgAgNAHQgHAEABAJQAAAGAEAEQAEAEAIAAQAFAAAGgDQAGgDADgGIAAgTIgMAAQgMAAgGAEg");
	this.shape_142.setTransform(148.65,32.4);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#2C3E50").s().p("AggA6QgLgOAAgZQAAgWALgOQALgOARAAQAPAAAKALIAAgzIAXAAIAACNIgVAAIgBgKQgKAMgQAAQgSAAgKgOgAgPgEQgFAIgBARQABAQAFAIQAGAJAKAAQAOAAAGgNIAAgpQgGgNgOAAQgKAAgGAJg");
	this.shape_143.setTransform(137.9,30.375);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgIQALgIAWgBIANAAIAAgGQAAgIgDgFQgFgEgIAAQgIAAgEAEQgGAEAAAFIgWAAQAAgHAFgIQAGgHAKgEQAJgEAKAAQASAAAKAJQALAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgDgJQgLALgOAAQgPAAgKgJgAgNAHQgHAEABAJQAAAGAEAEQAEAEAIAAQAFAAAGgDQAGgDACgGIAAgTIgLAAQgMAAgGAEg");
	this.shape_144.setTransform(110.4,32.4);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#2C3E50").s().p("AgkBFIAAgSIAFAAQAIAAAEgDQAEgCADgIIADgJIgjhiIAYAAIAUBDIAVhDIAYAAIgoByQgIAagWAAIgLgCg");
	this.shape_145.setTransform(100.6,34.4);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHAMIAABHIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAkIAABBg");
	this.shape_146.setTransform(90.725,32.3);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#2C3E50").s().p("AggA6QgLgOAAgZQAAgWALgOQALgOARAAQAPAAAKALIAAgzIAXAAIAACNIgVAAIgBgKQgKAMgQAAQgSAAgKgOgAgPgEQgFAIgBARQABAQAFAIQAGAJAKAAQAOAAAGgNIAAgpQgGgNgOAAQgKAAgGAJg");
	this.shape_147.setTransform(79.85,30.375);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#2C3E50").s().p("AggArQgKgJAAgMQAAgQAMgIQALgIAWgBIANAAIAAgGQAAgIgDgFQgFgEgIAAQgIAAgEAEQgGAEAAAFIgWAAQAAgHAFgIQAGgHAKgEQAJgEAKAAQASAAAKAJQALAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgDgJQgLALgOAAQgPAAgJgJgAgNAHQgHAEABAJQAAAGAEAEQAEAEAIAAQAFAAAGgDQAFgDADgGIAAgTIgLAAQgMAAgGAEg");
	this.shape_148.setTransform(69.55,32.4);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHAMIAABHIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAkIAABBg");
	this.shape_149.setTransform(59.125,32.3);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#2C3E50").s().p("AghAmQgMgOAAgYIAAAAQgBgPAGgMQAGgLAKgHQALgGANAAQAUAAANANQANANAAAWIAAAEQAAAPgFAMQgGALgKAHQgLAGgOAAQgUAAgNgOgAgQgYQgHAIAAARQAAAPAHAJQAFAJALAAQAMAAAGgJQAGgJAAgQQAAgPgGgJQgHgJgLAAQgKAAgGAJg");
	this.shape_150.setTransform(48.45,32.4);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#2C3E50").s().p("AgZA+QgNgIgHgPQgIgNAAgUIAAgJQAAgfAPgRQAOgSAaAAQAWAAANAMQAOALACAVIgXAAQgDgZgZAAQgPAAgIAMQgIALAAAWIAAAKQAAAVAJAMQAJANAQAAQASgBAHgHIAAgbIgcAAIAAgRIA0AAIAAAzQgIAKgNAEQgNAGgQAAQgQgBgNgHg");
	this.shape_151.setTransform(36.475,30.65);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.738,0,0,3.258,-216.4,-142.1)).s().p("EghzAWJMAAAgsSMBDnAAAMAAAAsSg");
	this.shape_152.setTransform(198.475,112.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop15G1, new cjs.Rectangle(-17.9,-29.3,432.79999999999995,283.5), null);


(lib.drag15G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap55();
	this.instance.setTransform(21,-21,0.5636,0.5667);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAYAeIAGglIAAgEQgBgHgHAAQgIAAgEAJIAAABIgHAmIgMAAIAHglIAAgEQgBgHgHAAQgIAAgEAHIgIApIgMAAIAKg5IAMAAIgCAGQAIgIAKABQAEAAAEACQADADACADQAIgJAKABQAJAAAEAFQAEAGgBAKIgGAlg");
	this.shape.setTransform(120.16,73.4984);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgKAdQgFAAgEgCQgEgDgBgFQgCgFABgGIAGglIANAAIgGAlIgBAEQABAGAGABQAIAAAFgHIAHgpIANAAIgKA5IgMAAIABgFQgGAHgJAAIgBgBg");
	this.shape_1.setTransform(112.8438,73.6017);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgSAZQgGgGAAgIIAMAAQAAAFADACQADACAEAAQAEAAADgBQADgCABgEQABgFgIgCIgKgEQgLgDABgKQAAgIAHgFQAHgFAIAAQAJAAAGAFQAGAFAAAJIgNAAQAAgEgCgDQgCgCgEAAQgEAAgCACQgEACAAADQgBAFAHACIALAEQALADgBAKQAAAGgDAEQgEAEgFACQgGACgFAAQgKAAgGgFg");
	this.shape_2.setTransform(106.8519,73.5479);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgDAeQgHAAgGgEQgFgDgDgIQgCgGABgIIAAgBQABgIAEgHQAEgHAGgDQAHgFAHABQAHAAAFAEQAGAEACAHQADAGgBAIQgBAIgEAHQgEAHgHAFQgFADgGAAIgCAAgAgJgLQgDAFgBAGIAAAHQAAAFADAEQADADAFABQAFAAAFgGQAEgFABgIIABgFQAAgHgDgDQgDgEgFgBQgHAAgFAIg");
	this.shape_3.setTransform(101.0649,73.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJAgQgDgFAAgHIAFggIgJAAIACgJIAJAAIADgPIALAAIgCAPIAKAAIgCAJIgKAAIgFAgIAAACQAAAEAEgBIAEAAIgBAKIgHACQgGAAgDgFg");
	this.shape_4.setTransform(96.45,72.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgOAbQgFgEgDgGQgDgHABgIIAAgCQABgIAEgHQAFgHAGgDQAGgEAHAAQAKAAAGAIQAFAIgBANIgBAEIgjAAQgBAHADAFQAEAEAFAAQAIAAAHgHIAGAGQgEAGgGADQgFACgHAAQgHAAgGgDgAgKgEIAXAAIAAgBIAAgFQAAgEgDgCQgCgCgEgBQgJAAgFAPg");
	this.shape_5.setTransform(91.5952,73.5472);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgSAZQgGgGAAgIIAMAAQAAAFADACQADACAEAAQAEAAADgBQADgCABgEQABgFgIgCIgKgEQgLgDABgKQAAgIAHgFQAHgFAIAAQAJAAAGAFQAGAFAAAJIgNAAQAAgEgCgDQgCgCgEAAQgEAAgCACQgEACAAADQgBAFAHACIALAEQALADgBAKQAAAGgDAEQgEAEgFACQgGACgFAAQgKAAgGgFg");
	this.shape_6.setTransform(85.8019,73.5479);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgHAeQgHAAgFgFQgFgEAAgIQAAgJAIgEQAHgFAMAAIAIAAIABgEIAAgEQgBgGgHAAQgEAAgCACQgDACgBAEIgMAAQAAgFAEgEQADgFAGgCQAFgCAGAAQAJAAAFAGQAGAFgBAJIgFAaIAAAFIABAGIAAABIgNAAIAAgFQgHAGgHAAIgBAAgAgGAFQgFACAAAFQgBAEADACQABACAEAAQAEAAADgCIAFgFIACgLIgGAAQgGAAgEADg");
	this.shape_7.setTransform(77.3077,73.5475);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAYAeIAGglIAAgEQgBgHgHAAQgIAAgEAJIAAABIgHAmIgMAAIAHglIAAgEQgBgHgHAAQgIAAgEAHIgIApIgMAAIAKg5IAMAAIgCAGQAIgIAKABQAEAAAEACQADADACADQAIgJAKABQAJAAAEAFQAEAGgBAKIgGAlg");
	this.shape_8.setTransform(69.66,73.4984);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgOAbQgFgEgDgGQgDgHABgIIAAgCQABgIAEgHQAFgHAGgDQAGgEAHAAQAKAAAGAIQAFAIgBANIgBAEIgjAAQgBAHADAFQAEAEAFAAQAIAAAHgHIAGAGQgEAGgGADQgFACgHAAQgHAAgGgDgAgKgEIAXAAIAAgBIAAgFQAAgEgDgCQgCgCgEgBQgJAAgFAPg");
	this.shape_9.setTransform(62.3952,73.5472);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgKAqQgIAAgFgGQgFgHAAgKIAAgGIAAgBQABgJAEgGQADgIAGgDQAGgEAGABQAIAAAFAGIAGgeIANAAIgPBSIgLAAIABgGQgGAHgIAAIgBAAgAgLAAQgEAFgBAMQAAAGACAEQADAEAFAAQAGAAAFgHIAFgYQgDgHgHAAIAAAAQgHAAgEAHg");
	this.shape_10.setTransform(56.6875,72.3766);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgHAeQgHAAgFgFQgFgEAAgIQAAgJAIgEQAHgFAMAAIAIAAIABgEIAAgEQgBgGgHAAQgEAAgCACQgDACgBAEIgMAAQAAgFAEgEQADgFAGgCQAFgCAGAAQAJAAAFAGQAGAFgBAJIgFAaIAAAFIABAGIAAABIgNAAIAAgFQgHAGgHAAIgBAAgAgGAFQgFACAAAFQgBAEADACQABACAEAAQAEAAADgCIAFgFIACgLIgGAAQgGAAgEADg");
	this.shape_11.setTransform(50.2577,73.5475);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgMAoIAKg5IAMAAIgKA5gAABgbQgBgCAAgDQAAgDABgCQACgCADAAQADAAACACQACACAAADQAAADgCACQgCACgDAAIgBAAQgBAAAAAAQgBgBAAAAQgBAAAAAAQgBgBAAAAg");
	this.shape_12.setTransform(46.225,72.445);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgfAnIANhNIAVAAQAJAAAHAFQAHAEAEAJQADAIgBALIgBAEQgCAKgFAIQgGAJgIAEQgJAFgJAAgAgQAcIAIAAQAJAAAIgHQAGgHACgLQACgHgBgHQAAgHgEgFQgEgEgHAAIgJAAg");
	this.shape_13.setTransform(41.1125,72.55);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FF8C2D").s().p("AoGhYIQNgEIAAC0IwNAFg");
	this.shape_14.setTransform(81.525,73.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(21,-21,122.1,103.6);


(lib.drag15G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap54();
	this.instance.setTransform(21,-75,0.4943,0.4424);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgHAeQgHAAgFgFQgFgEAAgIQAAgJAIgEQAHgFAMAAIAIAAIABgEIAAgEQgBgGgHAAQgEAAgCACQgDACgBAEIgMAAQAAgFAEgEQADgFAGgCQAFgCAGAAQAJAAAFAGQAGAFgBAJIgFAaIAAAFIABAGIAAABIgNAAIAAgFQgHAGgHAAIgBAAgAgGAFQgFACAAAFQgBAEADACQABACAEAAQAEAAADgCIAFgFIACgLIgGAAQgGAAgEADg");
	this.shape.setTransform(121.4077,19.4475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgTAeIAKg5IALAAIgBAGQAGgIAIAAIAFABIgCANIgFgBQgIAAgFAHIgGAng");
	this.shape_1.setTransform(116.975,19.375);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AABAqQgJAAgFgIIgCAHIgLAAIANhSIANAAIgFAeQAFgHAJABQAJAAAEAGQAFAGABAJIgBAIQgBAJgEAHQgEAHgFAEQgFADgGAAIgBAAgAgHAAIgEAYQACAHAIAAQAFAAAFgFQAEgFABgJIAAgHQABgFgDgDQgCgEgFAAIgBAAQgGAAgFAHg");
	this.shape_2.setTransform(111.7,18.2781);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgHAeQgHAAgFgFQgFgEAAgIQAAgJAIgEQAHgFAMAAIAIAAIABgEIAAgEQgBgGgHAAQgEAAgCACQgDACgBAEIgMAAQAAgFAEgEQADgFAGgCQAFgCAGAAQAJAAAFAGQAGAFgBAJIgFAaIAAAFIABAGIAAABIgNAAIAAgFQgHAGgHAAIgBAAgAgGAFQgFACAAAFQgBAEADACQABACAEAAQAEAAADgCIAFgFIACgLIgGAAQgGAAgEADg");
	this.shape_3.setTransform(105.7077,19.4475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgPAaQgFgDgCgHQgDgHABgIIAAgBQABgIAEgHQAEgHAGgDQAHgEAHAAQAJAAAGAGQAFAGAAAKIgMAAQAAgFgCgDQgDgDgEgBQgHAAgEAHQgEAGgBALQAAAPAKAAQAEAAAEgDQADgCABgFIAMAAQgBAGgDAEQgEAFgFADQgGACgFAAQgHAAgGgEg");
	this.shape_4.setTransform(100.2357,19.4472);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgSAZQgGgGAAgIIAMAAQAAAFADACQADACAEAAQAEAAADgBQADgCABgEQABgFgIgCIgKgEQgLgDABgKQAAgIAHgFQAHgFAIAAQAJAAAGAFQAGAFAAAJIgNAAQAAgEgCgDQgCgCgEAAQgEAAgCACQgEACAAADQgBAFAHACIALAEQALADgBAKQAAAGgDAEQgEAEgFACQgGACgFAAQgKAAgGgFg");
	this.shape_5.setTransform(94.4519,19.4479);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgHAeQgHAAgFgFQgFgEAAgIQAAgJAIgEQAHgFAMAAIAIAAIABgEIAAgEQgBgGgHAAQgEAAgCACQgDACgBAEIgMAAQAAgFAEgEQADgFAGgCQAFgCAGAAQAJAAAFAGQAGAFgBAJIgFAaIAAAFIABAGIAAABIgNAAIAAgFQgHAGgHAAIgBAAgAgGAFQgFACAAAFQgBAEADACQABACAEAAQAEAAADgCIAFgFIACgLIgGAAQgGAAgEADg");
	this.shape_6.setTransform(85.9577,19.4475);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgMAoIAKg5IAMAAIgKA5gAABgbQgBgCAAgDQAAgDABgCQACgCADAAQADAAACACQACACAAADQAAADgCACQgCACgDAAIgBAAQgBAAAAAAQgBgBAAAAQgBAAAAAAQgBgBAAAAg");
	this.shape_7.setTransform(81.925,18.345);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgTAeIAKg5IALAAIgBAGQAGgIAIAAIAFABIgCANIgFgBQgIAAgFAHIgGAng");
	this.shape_8.setTransform(78.725,19.375);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgKAdQgFAAgEgCQgEgDgBgFQgCgFABgGIAGglIANAAIgGAlIgBAEQABAGAGABQAIAAAFgHIAHgpIANAAIgKA5IgMAAIABgFQgGAHgJAAIgBgBg");
	this.shape_9.setTransform(73.7438,19.5017);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAHApIAHglIAAgEQgBgGgHAAQgGAAgGAGIgHApIgNAAIAPhRIAMAAIgFAfQAGgIAJAAQAIAAAEAGQAEAGgBAJIgGAlg");
	this.shape_10.setTransform(67.36,18.225);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgJAgQgDgEAAgIIAFggIgJAAIACgJIAJAAIADgPIALAAIgCAPIAKAAIgCAJIgKAAIgFAgIAAACQAAAEAEgBIAFAAIgBAKIgIABQgGABgDgFg");
	this.shape_11.setTransform(63.05,18.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgDAeQgHAAgGgEQgFgDgDgIQgCgGABgIIAAgBQABgIAEgHQAEgHAGgDQAHgFAHABQAHAAAFAEQAGADACAIQADAGgBAIQgBAIgEAHQgEAHgHAFQgFADgGAAIgCAAgAgJgLQgDAFgBAGIAAAHQAAAFADAEQADADAFABQAFAAAFgGQAEgFABgIIABgFQAAgHgDgDQgDgEgFgBQgHAAgFAIg");
	this.shape_12.setTransform(57.9149,19.45);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgMApIANhRIANAAIgOBRg");
	this.shape_13.setTransform(53.6,18.225);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgDAeQgHAAgGgEQgFgDgDgIQgCgGABgIIAAgBQABgIAEgHQAEgHAGgDQAHgFAHABQAHAAAFAEQAGADACAIQADAGgBAIQgBAIgEAHQgEAHgHAFQgFADgGAAIgCAAgAgJgLQgDAFgBAGIAAAHQAAAFADAEQADADAFABQAFAAAFgGQAEgFABgIIABgFQAAgHgDgDQgDgEgFgBQgHAAgFAIg");
	this.shape_14.setTransform(48.9649,19.45);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AAKAnIAGgjIghAAIgFAjIgOAAIAOhNIANAAIgFAhIAgAAIAFghIAOAAIgOBNg");
	this.shape_15.setTransform(42.2,18.45);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FF8C2D").s().p("AoGhYIQNgEIAAC0IwNAFg");
	this.shape_16.setTransform(81.525,19.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(21,-75,122.1,103.5);


(lib.btnMenuKI = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#18B8C4").s().p("AhXBMIBNhMIhNhMIAygxIB9B9Ih9B+g");
	this.shape.setTransform(-43.286,1.4257,0.5327,0.5327,-90);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#18B8C4").s().p("Ah6CSICRiSIiRiRIAygyIDCDDIjCDDg");
	this.shape_1.setTransform(-43.286,-6.8975,0.5327,0.5327,-90);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7,p:{y:-3.875}},{t:this.shape_6,p:{y:-3.875}},{t:this.shape_5},{t:this.shape_4,p:{y:0.925}},{t:this.shape_3},{t:this.shape_2,p:{y:1.075}},{t:this.shape_1,p:{y:-6.8975}},{t:this.shape,p:{y:1.4257}}]}).to({state:[{t:this.shape_7,p:{y:-2.275}},{t:this.shape_11},{t:this.shape_6,p:{y:-2.275}},{t:this.shape_10},{t:this.shape_4,p:{y:2.525}},{t:this.shape_9},{t:this.shape_2,p:{y:2.675}},{t:this.shape_1,p:{y:-5.2975}},{t:this.shape,p:{y:3.0257}}]},1).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_4,p:{y:6.525}},{t:this.shape_12},{t:this.shape_2,p:{y:6.675}},{t:this.shape_1,p:{y:-1.2975}},{t:this.shape,p:{y:7.0257}}]},1).wait(2));

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
	this.shape.setTransform(-38.939,-3.0027,0.7123,0.7882,180);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#ED4F44").s().p("Ah3C3QgGgDAAgHIAAgiQAAgOAMgJICPhrQAEgEAAgFQAAgFgEgDIiPhsQgMgIAAgOIAAgiQAAgHAGgDQAHgDAFAEIDkCrQAFAEAAAGQAAAHgFAEIjkCrQgDACgEAAIgFgBg");
	this.shape_1.setTransform(-45.2253,-3.0225,0.7123,0.7882,180);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10,p:{y:-3.875}},{t:this.shape_9,p:{y:-3.875}},{t:this.shape_8},{t:this.shape_7,p:{y:0.925}},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{scaleX:0.7123,scaleY:0.7882,x:-45.2253,y:-3.0225}},{t:this.shape,p:{scaleX:0.7123,scaleY:0.7882,x:-38.939,y:-3.0027}}]}).to({state:[{t:this.shape_10,p:{y:-1.875}},{t:this.shape_18},{t:this.shape_9,p:{y:-1.875}},{t:this.shape_17},{t:this.shape_7,p:{y:2.925}},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_1,p:{scaleX:0.7117,scaleY:0.7876,x:-45.2178,y:-2.362}},{t:this.shape,p:{scaleX:0.7117,scaleY:0.7876,x:-38.9368,y:-2.3424}}]},1).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_7,p:{y:6.425}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_1,p:{scaleX:0.7117,scaleY:0.7876,x:-45.2178,y:-0.512}},{t:this.shape,p:{scaleX:0.7117,scaleY:0.7876,x:-38.9368,y:-0.4924}}]},1).wait(2));

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


(lib.bg10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._1pngcopy2();
	this.instance.setTransform(-229,-134,0.8329,0.8309);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg10, new cjs.Rectangle(-229,-134,457.2,267.1), null);


(lib.bg1copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#34495E").s().p("A82E7Qg1AAAAgYIAApFQAAgXA1AAMA5tAAAQA1AAABAXIAAJFQgBAYg1AAg");
	this.shape.setTransform(-20.05,1.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg1copy, new cjs.Rectangle(-210.1,-30,380.1,62.9), null);


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


(lib.Symbol99 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween8("synched",0);
	this.instance.setTransform(42.25,-40.25);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Slots10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// slots
	this.kotakKartuSembunyi = new lib.target();
	this.kotakKartuSembunyi.name = "kotakKartuSembunyi";
	this.kotakKartuSembunyi.setTransform(483.9,587.5);

	this.kotakKartu2 = new lib.target();
	this.kotakKartu2.name = "kotakKartu2";
	this.kotakKartu2.setTransform(493.9,330.55,1,1,0,0,0,10,0);

	this.dua = new lib.drag15G5();
	this.dua.name = "dua";
	this.dua.setTransform(270.55,368.75,0.9716,0.9716,0,0,0,82.2,24.7);

	this.satu = new lib.drag15G1();
	this.satu.name = "satu";
	this.satu.setTransform(270.65,260.8,0.9716,0.9716,0,0,0,82.2,-23.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.satu},{t:this.dua},{t:this.kotakKartu2},{t:this.kotakKartuSembunyi}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Slots10, new cjs.Rectangle(211.1,210.5,340.79999999999995,399.6), null);


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


(lib.Pieces10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// pieces
	this.satu = new lib.drop15G5();
	this.satu.name = "satu";
	this.satu.setTransform(732.25,370.5,0.49,0.49,0,0,0,160.6,26);
	new cjs.ButtonHelper(this.satu, 0, 1, 1);

	this.dua = new lib.drop15G1();
	this.dua.name = "dua";
	this.dua.setTransform(731.3,252.95,0.49,0.49,0,0,0,198.6,78.5);
	new cjs.ButtonHelper(this.dua, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.dua},{t:this.satu}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces10, new cjs.Rectangle(625.2,200.2,212.0999999999999,212.90000000000003), null);


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
	this.instance = new lib.flash0aiAssets_4();
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


(lib.anim1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_344 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(344).call(this.frame_344).wait(90));

	// Layer_4
	this.instance = new lib.buluBabi_PNG();
	this.instance.setTransform(-172.8,15.65,1.0002,1.0002,-14.9925);

	this.instance_1 = new lib.buluBabi_PNG();
	this.instance_1.setTransform(-187.45,29.5,1.0002,1.0002,-14.9925);

	this.instance_2 = new lib.buluBabi_PNG();
	this.instance_2.setTransform(-209,26,1.0003,1.0003);

	this.instance_3 = new lib.buluBabi_PNG();
	this.instance_3.setTransform(-201,7,1.0003,1.0003);

	this.instance_4 = new lib.buluBabi_PNG();
	this.instance_4.setTransform(-225,12,1.0003,1.0003);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(434));

	// Layer_2
	this.instance_5 = new lib.platepiring();
	this.instance_5.setTransform(-239,7,5.344,5.3966);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(434));

	// Layer_3
	this.instance_6 = new lib.cucumber1cucumber();
	this.instance_6.setTransform(-276,53,1.001,1.001);

	this.instance_7 = new lib.cucumber1cucumber();
	this.instance_7.setTransform(-276,37,1.001,1.001);

	this.instance_8 = new lib.cucumber1cucumber();
	this.instance_8.setTransform(-310,37,1.001,1.001);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_8},{t:this.instance_7},{t:this.instance_6}]}).wait(434));

	// piring
	this.instance_9 = new lib.platepiring();
	this.instance_9.setTransform(-317,37,5.344,5.3966);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(434));

	// Layer_1
	this.instance_10 = new lib._1e();
	this.instance_10.setTransform(-332,-194,0.9993,0.997);

	this.instance_11 = new lib._2e();
	this.instance_11.setTransform(-332,-194,0.9993,0.997);

	this.instance_12 = new lib._3e();
	this.instance_12.setTransform(-332,-194,0.9993,0.997);

	this.instance_13 = new lib._4e();
	this.instance_13.setTransform(-332,-194,0.9993,0.997);

	this.instance_14 = new lib._5e();
	this.instance_14.setTransform(-332,-194,0.9993,0.997);

	this.instance_15 = new lib._6edit();
	this.instance_15.setTransform(-332,-194,1,0.9974);

	this.instance_16 = new lib.selesai();
	this.instance_16.setTransform(0,0,1,1,0,0,0,85,25.7);

	this.instance_17 = new lib.ds();
	this.instance_17.setTransform(0,0,1,1,0,0,0,332,194);
	this.instance_17.filters = [new cjs.ColorFilter(0.41, 0.41, 0.41, 1, 0, 0, 0, 0)];
	this.instance_17.cache(-2,-2,668,392);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_10}]}).to({state:[{t:this.instance_11}]},44).to({state:[{t:this.instance_12}]},45).to({state:[{t:this.instance_13}]},44).to({state:[{t:this.instance_14}]},44).to({state:[{t:this.instance_15}]},99).to({state:[{t:this.instance_17},{t:this.instance_16}]},68).wait(90));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-332,-194,664,388);


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

	// jawaban1
	this.dua = new lib.drag15G5();
	this.dua.name = "dua";
	this.dua.setTransform(233.25,-112.4,1.7567,1.7567,0,0,0,82.2,24.5);

	this.dua_1 = new lib.drop15G1();
	this.dua_1.name = "dua_1";
	this.dua_1.setTransform(245.3,59.35,0.8154,0.8154,0,0,0,198.8,78.2);
	new cjs.ButtonHelper(this.dua_1, 0, 1, 1);

	this.satu = new lib.drag15G1();
	this.satu.name = "satu";
	this.satu.setTransform(-164.45,-78.55,2.2054,2.2054,0,0,0,82,-23.4);

	this.satu_1 = new lib.drop15G5();
	this.satu_1.name = "satu_1";
	this.satu_1.setTransform(-155.9,111.35,0.8668,0.8668,0,0,0,160.5,26.2);
	new cjs.ButtonHelper(this.satu_1, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.satu_1},{t:this.satu},{t:this.dua_1},{t:this.dua}]},12).to({state:[]},1).wait(12));

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
	this.shape.graphics.f("#FFFFFF").s().p("AgLALQgEgEAAgHQAAgFAEgFQAEgEAHAAQAHAAAFAEQAEAFAAAFQAAAHgEAEQgFAEgHAAQgHAAgEgEg");
	this.shape.setTransform(-288.15,88.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgtBYQgSgPAAgZIAaAAQAAAPAKAKQAKAKARAAQATAAAJgKQAKgKAAgSQAAgSgLgJQgLgJgSgBIgUAAIAAgUIAUAAQARAAAKgJQAKgKAAgPQAAgkgjAAQgQAAgKAKQgJAJgBAQIgZAAQAAgYARgQQASgQAaAAQAdAAAPAPQARAPAAAbQAAANgJANQgIAMgPAGQARAEAJANQAJAMAAARQAAAcgSAQQgRAQgdAAQgbAAgSgQg");
	this.shape_1.setTransform(-300,80.275);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgLALQgEgEAAgHQAAgFAEgFQAEgEAHAAQAHAAAFAEQAEAFAAAFQAAAHgEAEQgFAEgHAAQgHAAgEgEg");
	this.shape_2.setTransform(-288.15,30.325);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("Ag/BmIAAgSIBEhOQAQgQAGgLQAGgMAAgLQAAgQgKgKQgJgKgPAAQgTAAgLALQgKAKAAAUIgaAAQAAgcASgRQASgRAeAAQAbAAAQAOQARAPAAAZQAAAdgmApIg1A6IBkAAIAAAVg");
	this.shape_3.setTransform(-299.6,21.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgLALQgEgEAAgHQAAgFAEgFQAEgEAHAAQAHAAAFAEQAEAFAAAFQAAAHgEAEQgFAEgHAAQgHAAgEgEg");
	this.shape_4.setTransform(-288.15,-98.425);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AANBmIAAiqIgzATIAAgYIBJgcIAEAAIAADLg");
	this.shape_5.setTransform(-301.475,-107.2);

	this.instance = new lib.RestoreIcon("single",0);
	this.instance.setTransform(-55.15,16.5,0.8583,0.8583,0,0,0,-0.1,0);
	this.instance.alpha = 0.75;

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAiBMIAAhiQgBgQgHgIQgIgHgPAAQgLAAgKAGQgJAHgGAKIAABqIgZAAIAAiUIAYAAIABATQARgXAbAAQAvAAABA2IAABig");
	this.shape_6.setTransform(305.25,82.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AguBCQgPgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAHAAAKIgaAAQAAgLAIgLQAIgLAOgFQAOgHAPAAQAaAAAPANQAOANABAXIAABEQgBAVAGAMIAAACIgbAAQgCgFgBgLQgTATgYAAQgWAAgNgMgAgjAeQAAAMAIAHQAIAGAMABQALAAALgHQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_7.setTransform(289.6,82.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAiBMIAAhiQgBgQgHgIQgHgHgQAAQgLAAgKAGQgJAHgGAKIAABqIgZAAIAAiUIAYAAIABATQARgXAbAAQAvAAABA2IAABig");
	this.shape_8.setTransform(274.1,82.65);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AguBCQgPgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAHAAAKIgaAAQAAgLAIgLQAIgLAOgFQAOgHAPAAQAaAAAPANQAOANAAAXIAABEQAAAVAGAMIAAACIgbAAQgCgFgBgLQgTATgXAAQgXAAgNgMgAgjAeQAAAMAIAHQAIAGAMABQALAAAMgHQAKgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_9.setTransform(258.45,82.8);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAgBqIgzhFIgQARIAAA0IgaAAIAAjTIAaAAIAACAIANgRIAugwIAgAAIg6A9IBABXg");
	this.shape_10.setTransform(244.45,79.65);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgdBHQgOgGgIgMQgIgLAAgNIAaAAQABAMAJAJQAKAHAPAAQAOAAAJgGQAJgGAAgKQAAgKgIgGQgIgGgSgEQgUgEgLgFQgLgGgGgHQgFgJAAgLQAAgSAPgNQAQgNAXAAQAaAAAPANQAQANAAAVIgaAAQAAgLgIgHQgJgIgOAAQgNAAgIAHQgIAFAAALQAAAIAIAFQAHAFASAEQATAFAMAFQAMAGAGAIQAGAIAAAMQAAAVgQAMQgQAMgaAAQgRAAgOgHg");
	this.shape_11.setTransform(221.925,82.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AguBCQgPgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgOAAgJAHQgJAHAAAKIgaAAQAAgLAIgLQAIgLAOgFQANgHAQAAQAZAAAPANQAPANAAAXIAABEQABAVAFAMIAAACIgbAAQgCgFgCgLQgSATgXAAQgWAAgOgMgAgjAeQAAAMAIAHQAIAGAMABQAMAAALgHQAKgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_12.setTransform(206.85,82.8);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgEBUQgIgKgBgTIAAhcIgbAAIAAgUIAbAAIAAglIAZAAIAAAlIAcAAIAAAUIgcAAIAABcQAAAJAEAEQADAFAKAAIAMgCIAAAVQgKADgKAAQgRAAgIgLg");
	this.shape_13.setTransform(194.15,81.125);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgvBCQgOgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgOAAgJAHQgJAHAAAKIgaAAQAAgLAIgLQAIgLAOgFQAOgHAPAAQAaAAAPANQAOANABAXIAABEQgBAVAGAMIAAACIgbAAQgCgFgBgLQgSATgZAAQgWAAgOgMgAgjAeQAAAMAIAHQAIAGANABQAKAAALgHQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_14.setTransform(182.15,82.8);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AAgBqIgzhFIgQARIAAA0IgaAAIAAjTIAaAAIAACAIAOgRIAtgwIAfAAIg5A9IBABXg");
	this.shape_15.setTransform(161.15,79.65);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AguBCQgPgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgOAAgJAHQgJAHAAAKIgaAAQAAgLAIgLQAIgLAOgFQANgHAQAAQAZAAAPANQAPANAAAXIAABEQABAVAFAMIAAACIgbAAQgCgFgCgLQgSATgXAAQgWAAgOgMgAgjAeQAAAMAIAHQAIAGAMABQAMAAALgHQAKgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_16.setTransform(145.2,82.8);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgEBUQgIgKgBgTIAAhcIgbAAIAAgUIAbAAIAAglIAZAAIAAAlIAcAAIAAAUIgcAAIAABcQAAAJAEAEQADAFAKAAIAMgCIAAAVQgKADgKAAQgRAAgIgLg");
	this.shape_17.setTransform(132.5,81.125);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgwA5QgTgWAAgiIAAgCQAAgVAJgSQAIgSAQgJQAPgKATAAQAfAAATAVQASAVAAAjIAAACQAAAVgIASQgIARgQAKQgQAKgUAAQgdAAgTgVgAgegoQgLAPAAAbQAAAZALAOQAMAQASAAQAUAAALgQQAMgPAAgbQAAgYgMgPQgMgPgTgBQgSABgMAPg");
	this.shape_18.setTransform(120.175,82.8);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAgBqIgzhFIgQARIAAA0IgaAAIAAjTIAaAAIAACAIAOgRIAtgwIAfAAIg5A9IBABXg");
	this.shape_19.setTransform(105.8,79.65);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AguBCQgPgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAHAAAKIgaAAQAAgLAIgLQAIgLAOgFQANgHAQAAQAaAAAPANQAOANAAAXIAABEQAAAVAGAMIAAACIgbAAQgCgFgBgLQgTATgXAAQgXAAgNgMgAgjAeQAAAMAIAHQAIAGAMABQALAAAMgHQAKgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_20.setTransform(82.85,82.8);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AguBXQgRgWAAgiIAAgDQAAghARgVQAQgVAbAAQAZAAAPASIAAhOIAaAAIAADUIgXAAIgBgQQgQATgaAAQgaAAgRgVgAgagKQgLANAAAdQAAAZALAOQALAPARAAQAZAAAKgWIAAhEQgLgVgXAAQgSAAgLAPg");
	this.shape_21.setTransform(66.85,79.8);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgvBCQgOgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAHAAAKIgaAAQAAgLAIgLQAIgLAOgFQAOgHAPAAQAZAAAPANQAPANABAXIAABEQAAAVAFAMIAAACIgbAAQgCgFgCgLQgRATgZAAQgVAAgPgMgAgjAeQAAAMAIAHQAIAGANABQALAAAKgHQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_22.setTransform(51.4,82.8);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("Ag+BpIAAjOIAXAAIABAQQAQgTAbAAQAbAAAQAUQAPAVAAAkIAAACQAAAigPAVQgQAVgbAAQgaAAgQgSIAABIgAglg+IAABHQAMAVAYAAQARAAALgPQALgPAAgcQAAgZgLgPQgLgOgSAAQgXAAgMAUg");
	this.shape_23.setTransform(35.975,85.525);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AAhBMIAAhiQAAgQgHgIQgIgHgPAAQgMAAgJAGQgJAHgFAKIAABqIgaAAIAAiUIAYAAIABATQARgXAbAAQAwAAAAA2IAABig");
	this.shape_24.setTransform(12.95,82.65);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgvBCQgOgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgOAAgJAHQgJAHAAAKIgaAAQAAgLAIgLQAIgLAOgFQAOgHAPAAQAaAAAOANQAPANABAXIAABEQgBAVAGAMIAAACIgbAAQgCgFgCgLQgRATgZAAQgVAAgPgMgAgjAeQAAAMAIAHQAIAGANABQAKAAALgHQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_25.setTransform(-2.7,82.8);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAgBqIgzhFIgQARIAAA0IgaAAIAAjTIAaAAIAACAIANgRIAugwIAfAAIg5A9IBABXg");
	this.shape_26.setTransform(-16.7,79.65);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAgBqIgzhFIgQARIAAA0IgaAAIAAjTIAaAAIAACAIANgRIAugwIAfAAIg5A9IBABXg");
	this.shape_27.setTransform(-31.1,79.65);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AguA+QgMgOAAgbIAAhgIAZAAIAABfQAAAjAcgBQAcAAALgVIAAhsIAZAAIAACUIgZAAIAAgOQgPASgcAAQgYAAgNgPg");
	this.shape_28.setTransform(-47.1,82.95);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgcCCIAAgVQAFACAHAAQAIAAAGgFQACgEAAgMIAAinIAaAAIAACnQAAArgmAAQgIAAgIgDgAAChqQgDgEAAgHQAAgGADgEQAEgEAHgBQAIAAAEAFQADAEAAAGQAAAHgDAEQgEADgIAAQgHAAgEgDg");
	this.shape_29.setTransform(-59.7,83.1);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AAhBMIAAhiQAAgQgHgIQgIgHgPAAQgMAAgJAGQgJAHgFAKIAABqIgaAAIAAiUIAYAAIABATQARgXAbAAQAwAAAAA2IAABig");
	this.shape_30.setTransform(-69.4,82.65);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AguA+QgMgOAAgbIAAhgIAaAAIAABfQgBAjAcgBQAdAAAJgVIAAhsIAaAAIAACUIgZAAIAAgOQgPASgcAAQgYAAgNgPg");
	this.shape_31.setTransform(-85.05,82.95);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgEBUQgIgKgBgTIAAhcIgbAAIAAgUIAbAAIAAglIAZAAIAAAlIAcAAIAAAUIgcAAIAABcQAAAJAEAEQADAFAKAAIAMgCIAAAVQgKADgKAAQgRAAgIgLg");
	this.shape_32.setTransform(-97.9,81.125);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgMBmIAAiVIAZAAIAACVgAgKhMQgEgEAAgHQAAgGAEgEQADgEAHAAQAHAAAEAEQAEAEAAAGQAAAHgEAEQgEAEgHAAQgHAAgDgEg");
	this.shape_33.setTransform(-105.475,80.075);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AguBXQgRgWAAgiIAAgDQAAghARgVQARgVAaAAQAZAAAPASIAAhOIAaAAIAADUIgXAAIgCgQQgPATgaAAQgaAAgRgVgAgagKQgLANAAAdQAAAZALAOQAKAPASAAQAZAAAKgWIAAhEQgLgVgYAAQgSAAgKAPg");
	this.shape_34.setTransform(-117.3,79.8);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgsA6QgTgUAAgiIAAgEQAAgWAJgRQAIgSAQgKQAPgKARAAQAdAAARATQAPATAAAkIAAAKIhkAAQABAXAMANQANAOARAAQAOAAAKgGQAJgGAHgIIAPAMQgSAdgmAAQgdAAgUgUgAgXgtQgLAMgCAUIBKAAIAAgBQgBgUgKgLQgJgLgQAAQgOABgLAKg");
	this.shape_35.setTransform(-139.15,82.8);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("ABPBMIAAhiQABgQgIgHQgHgJgRABQgPAAgKAIQgIAJgCAOIAABiIgZAAIAAhhQAAghggABQgagBgIAWIAABsIgaAAIAAiUIAYAAIABAQQAQgTAcgBQAfAAALAZQAHgLANgHQALgGARgBQAyAAAAA1IAABjg");
	this.shape_36.setTransform(-159.2,82.65);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgvBCQgOgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAHAAAKIgaAAQAAgLAIgLQAIgLAOgFQAOgHAPAAQAZAAAPANQAPANABAXIAABEQAAAVAFAMIAAACIgbAAQgCgFgCgLQgRATgZAAQgVAAgPgMgAgjAeQAAAMAIAHQAIAGANABQALAAAKgHQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_37.setTransform(-179.45,82.8);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgfBjQgQgHgIgMIAOgPQAQAUAYAAQASAAAKgKQALgLAAgTIAAgNQgQASgaAAQgaAAgQgVQgQgWAAgkQAAgiAQgVQAQgVAbAAQAaAAAQATIABgQIAXAAIAACRQAAAegRARQgRAQgdAAQgQAAgPgHgAgahEQgLAOAAAdQAAAZALANQAKAPASAAQAYAAAMgWIAAhDQgMgWgYAAQgSAAgKAPg");
	this.shape_38.setTransform(-195.475,85.6);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgjBMIAAiUIAZAAIAAARQAMgUAXgBQAHAAAEADIAAAXIgMgBQgZAAgJAWIAABpg");
	this.shape_39.setTransform(-214.125,82.65);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgwA5QgTgWAAgiIAAgCQAAgVAJgSQAIgSAQgJQAPgKATAAQAfAAATAVQASAVAAAjIAAACQAAAVgIASQgIARgQAKQgQAKgUAAQgdAAgTgVgAgegoQgLAPAAAbQAAAZALAOQAMAQASAAQAUAAALgQQAMgPAAgbQAAgYgMgPQgMgPgTgBQgSABgMAPg");
	this.shape_40.setTransform(-227.825,82.8);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AAgBqIgzhFIgRARIAAA0IgZAAIAAjTIAZAAIAACAIAPgRIAtgwIAgAAIg6A9IBABXg");
	this.shape_41.setTransform(-242.2,79.65);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgjBgQgSgIgKgOQgKgOABgSIAbAAQAAATANAKQANALAWAAQAVAAALgJQAMgIgBgPQAAgPgKgIQgKgIgagIQgjgKgQgNQgPgPAAgVQAAgYATgPQATgQAdAAQAWAAAQAIQAQAIAJAOQAJAOAAARIgbAAQAAgSgLgLQgMgKgWAAQgSAAgLAJQgLAIAAAQQAAAMALAJQAKAIAYAHQAZAHAOAIQAPAIAGAMQAIALgBAPQAAAZgTAPQgTAPggAAQgUAAgSgIg");
	this.shape_42.setTransform(-258.7,80.225);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgsA6QgTgVAAghIAAgEQAAgWAJgSQAIgRAQgKQAPgKARAAQAdAAARATQAPAUAAAjIAAAKIhkAAQABAXAMANQANAOARAAQAOAAAKgGQAJgGAHgIIAPAMQgSAdgmAAQgdAAgUgUgAgXgsQgLALgCAUIBKAAIAAgBQgBgUgKgLQgJgLgQAAQgOAAgLAMg");
	this.shape_43.setTransform(208.25,20.35);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("ABPBMIAAhiQABgQgIgHQgHgJgRABQgPAAgKAIQgIAJgCAOIAABiIgZAAIAAhhQAAggggAAQgagBgIAWIAABsIgaAAIAAiUIAYAAIABAQQAQgTAcgBQAfAAALAZQAHgLANgHQALgGARgBQAyAAAAA1IAABjg");
	this.shape_44.setTransform(188.2,20.2);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgvBCQgOgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAGAAALIgaAAQAAgLAIgLQAIgLAOgFQAOgHAPAAQAZAAAPANQAPANABAXIAABEQAAAUAFANIAAACIgbAAQgCgEgCgMQgRATgZAAQgVAAgPgMgAgjAeQAAAMAIAGQAIAIANAAQALgBAKgGQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_45.setTransform(167.95,20.35);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgfBjQgQgHgIgMIAOgPQAQAUAYAAQASAAAKgKQALgLAAgTIAAgNQgQASgaAAQgaAAgQgVQgQgWAAgkQAAgjAQgUQAQgVAbAAQAaAAAQATIABgQIAXAAIAACSQAAAcgRASQgRAQgdAAQgQAAgPgHgAgahFQgLAPAAAdQAAAZALANQAKAPASAAQAYAAAMgWIAAhDQgMgWgYAAQgSAAgKAOg");
	this.shape_46.setTransform(151.925,23.15);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgMBmIAAiVIAZAAIAACVgAgKhMQgEgEAAgHQAAgGAEgEQADgEAHAAQAHAAAEAEQAEAEAAAGQAAAHgEAEQgEAEgHAAQgHAAgDgEg");
	this.shape_47.setTransform(133.875,17.625);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgfBjQgQgHgIgMIAOgPQAQAUAYAAQASAAAKgKQALgLAAgTIAAgNQgQASgaAAQgaAAgQgVQgQgWAAgkQAAgjAQgUQAQgVAbAAQAaAAAQATIABgQIAXAAIAACSQAAAcgRASQgRAQgdAAQgQAAgPgHgAgahFQgLAPAAAdQAAAZALANQAKAPASAAQAYAAAMgWIAAhDQgMgWgYAAQgSAAgKAOg");
	this.shape_48.setTransform(122.125,23.15);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AAiBMIAAhiQgBgQgHgIQgHgHgQAAQgLAAgKAGQgJAHgGALIAABpIgZAAIAAiUIAYAAIABATQARgXAbAAQAvAAABA2IAABig");
	this.shape_49.setTransform(106.7,20.2);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AguBCQgPgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAGAAALIgaAAQAAgLAIgLQAIgLAOgFQAOgHAPAAQAaAAAPANQAOANAAAXIAABEQAAAUAGANIAAACIgbAAQgCgEgBgMQgTATgXAAQgXAAgNgMgAgjAeQAAAMAIAGQAIAIAMAAQALgBAMgGQAKgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_50.setTransform(91.05,20.35);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgMBqIAAjTIAZAAIAADTg");
	this.shape_51.setTransform(79.9,17.2);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AguA+QgMgOAAgbIAAhgIAaAAIAABgQAAAhAbAAQAcABAKgWIAAhsIAaAAIAACUIgZAAIAAgOQgPARgcABQgYgBgNgOg");
	this.shape_52.setTransform(68.65,20.5);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AAgBqIgzhFIgRARIAAA0IgZAAIAAjTIAZAAIAAB/IAPgQIAtgwIAgAAIg6A9IBABXg");
	this.shape_53.setTransform(47.6,17.2);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AguA+QgMgOAAgbIAAhgIAaAAIAABgQgBAhAcAAQAdABAJgWIAAhsIAaAAIAACUIgZAAIAAgOQgPARgcABQgYgBgNgOg");
	this.shape_54.setTransform(31.6,20.5);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgDBUQgKgKABgTIAAhcIgcAAIAAgUIAcAAIAAglIAYAAIAAAlIAcAAIAAAUIgcAAIAABcQAAAJAEAEQADAFAKAAIAMgCIAAAVQgKADgKAAQgRAAgHgLg");
	this.shape_55.setTransform(18.8,18.675);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AAiBMIAAhiQgBgQgHgIQgHgHgQAAQgLAAgKAGQgJAHgGALIAABpIgZAAIAAiUIAYAAIABATQARgXAbAAQAvAAABA2IAABig");
	this.shape_56.setTransform(6.8,20.2);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AguA+QgMgOAAgbIAAhgIAZAAIAABgQAAAhAcAAQAcABALgWIAAhsIAZAAIAACUIgZAAIAAgOQgPARgcABQgYgBgNgOg");
	this.shape_57.setTransform(-8.85,20.5);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgMBqIAAjTIAZAAIAADTg");
	this.shape_58.setTransform(-96.85,17.2);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgwA5QgTgWAAgiIAAgCQAAgVAJgSQAIgSAQgJQAPgKATAAQAfAAATAVQASAVAAAjIAAACQAAAVgIASQgIARgQAKQgQAKgUAAQgdAAgTgVgAgegpQgLAQAAAbQAAAZALAOQAMAQASAAQAUAAALgQQAMgPAAgbQAAgYgMgQQgMgPgTAAQgSAAgMAPg");
	this.shape_59.setTransform(-108.475,20.35);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgmBYIgBARIgYAAIAAjUIAaAAIAABPQAQgTAaAAQAbAAAQAVQAPAUABAkIAAACQAAAigQAVQgQAVgbAAQgbAAgQgUgAglgBIAAA/QAMAYAZAAQARAAALgPQAKgNAAgeQAAgZgKgOQgKgOgTAAQgZAAgLAYg");
	this.shape_60.setTransform(-124.2,17.35);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("ABPBMIAAhiQABgQgIgHQgHgJgRABQgPAAgKAIQgIAJgCAOIAABiIgZAAIAAhhQAAggggAAQgagBgIAWIAABsIgaAAIAAiUIAYAAIABAQQAQgTAcgBQAfAAALAZQAIgLALgHQAMgGARgBQAyAAAAA1IAABjg");
	this.shape_61.setTransform(-144.9,20.2);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgwA5QgTgWAAgiIAAgCQAAgVAJgSQAIgSAQgJQAPgKATAAQAfAAATAVQASAVAAAjIAAACQAAAVgIASQgIARgQAKQgQAKgUAAQgdAAgTgVgAgegpQgLAQAAAbQAAAZALAOQAMAQASAAQAUAAALgQQAMgPAAgbQAAgYgMgQQgMgPgTAAQgSAAgMAPg");
	this.shape_62.setTransform(-165.475,20.35);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgDBUQgJgKAAgTIAAhcIgcAAIAAgUIAcAAIAAglIAYAAIAAAlIAcAAIAAAUIgcAAIAABcQAAAJAEAEQAEAFAIAAIANgCIAAAVQgKADgKAAQgRAAgHgLg");
	this.shape_63.setTransform(-178.6,18.675);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AAhBMIAAhiQAAgQgHgIQgIgHgPAAQgMAAgJAGQgJAHgFALIAABpIgaAAIAAiUIAYAAIABATQARgXAbAAQAwAAAAA2IAABig");
	this.shape_64.setTransform(-197.55,20.2);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgvBCQgOgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAGAAALIgaAAQAAgLAIgLQAIgLAOgFQAOgHAPAAQAZAAAPANQAPANABAXIAABEQAAAUAFANIAAACIgbAAQgCgEgCgMQgRATgZAAQgVAAgPgMgAgjAeQAAAMAIAGQAIAIANAAQALgBAKgGQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_65.setTransform(-213.2,20.35);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AAgBqIgzhFIgRARIAAA0IgZAAIAAjTIAZAAIAAB/IAPgQIAtgwIAfAAIg5A9IBABXg");
	this.shape_66.setTransform(-227.2,17.2);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgsA6QgSgVAAghIAAgEQAAgWAIgSQAJgRAPgKQAPgKARAAQAdAAAQATQAQAUAAAjIAAAKIhkAAQAAAXANANQAMAOATAAQANAAAJgGQAKgGAHgIIAQAMQgTAdgmAAQgeAAgTgUgAgXgsQgKALgDAUIBKAAIAAgBQgBgUgKgLQgJgLgQAAQgOAAgLAMg");
	this.shape_67.setTransform(-242.6,20.35);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgNBlIAAizIhAAAIAAgWICbAAIAAAWIhBAAIAACzg");
	this.shape_68.setTransform(-258.65,17.75);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgMBmIAAiVIAZAAIAACVgAgKhMQgEgEAAgHQAAgGAEgEQADgEAHAAQAHAAAEAEQAEAEAAAGQAAAHgEAEQgEAEgHAAQgHAAgDgEg");
	this.shape_69.setTransform(-188.325,-44.825);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgvBBQgOgMAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgOAAgJAHQgJAGAAAKIgaAAQAAgLAIgKQAIgLAOgFQANgHAQAAQAZAAAPANQAPANAAAXIAABEQABAUAFANIAAACIgbAAQgCgFgCgLQgRATgZAAQgWAAgOgNgAgjAeQAAAMAIAGQAIAIANAAQALgBAKgGQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_70.setTransform(-199.6,-42.1);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AguA+QgMgOAAgbIAAhgIAaAAIAABgQgBAhAcAAQAdABAJgXIAAhrIAaAAIAACVIgZAAIAAgPQgPARgcABQgYgBgNgOg");
	this.shape_71.setTransform(-215.1,-41.95);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgdBIQgOgHgIgLQgIgMAAgNIAaAAQABANAJAHQAKAIAPAAQAOAAAJgGQAJgGAAgKQAAgKgIgGQgIgFgSgFQgUgEgLgFQgLgFgGgJQgFgIAAgLQAAgSAPgNQAQgNAXAAQAaAAAPAOQAQAMAAAVIgaAAQAAgLgIgHQgJgIgOAAQgNABgIAFQgIAHAAAKQAAAJAIAEQAHAFASAEQATAFAMAGQAMAEAGAJQAGAJAAALQAAAVgQALQgQANgaAAQgRAAgOgGg");
	this.shape_72.setTransform(-230.325,-42.1);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgsA6QgSgVAAghIAAgEQAAgWAIgSQAJgRAPgKQAPgKARAAQAdAAAQATQAQAUAAAjIAAALIhkAAQAAAVANAOQAMAOATAAQANAAAJgGQAKgGAHgIIAQAMQgTAdgmAAQgeAAgTgUgAgXgsQgKALgDAUIBKAAIAAgCQgBgTgKgLQgJgLgQAAQgOAAgLAMg");
	this.shape_73.setTransform(-244.85,-42.1);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgdBIQgOgHgIgLQgIgMAAgNIAaAAQABANAJAHQAKAIAPAAQAOAAAJgGQAJgGAAgKQAAgKgIgGQgIgFgSgFQgUgEgLgFQgLgFgGgJQgFgIAAgLQAAgSAPgNQAQgNAXAAQAaAAAPAOQAQAMAAAVIgaAAQAAgLgIgHQgJgIgOAAQgNABgIAFQgIAHAAAKQAAAJAIAEQAHAFASAEQATAFAMAGQAMAEAGAJQAGAJAAALQAAAVgQALQgQANgaAAQgRAAgOgGg");
	this.shape_74.setTransform(-259.875,-42.1);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgfBjQgQgHgIgMIAOgQQAQAVAYAAQASAAAKgLQALgKAAgTIAAgNQgQASgaAAQgaAAgQgWQgQgVAAgjQAAgjAQgVQAQgVAbAAQAaAAAQATIABgQIAXAAIAACSQAAAdgRARQgRAQgdAAQgQAAgPgHgAgahFQgLAPAAAcQAAAaALANQAKAPASAAQAYAAAMgWIAAhEQgMgVgYAAQgSAAgKAOg");
	this.shape_75.setTransform(423.375,-101.75);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AAhBNIAAhjQAAgQgHgIQgIgHgPgBQgLABgKAGQgJAHgFALIAABqIgaAAIAAiWIAYAAIABATQARgWAbABQAwAAAAA2IAABig");
	this.shape_76.setTransform(407.95,-104.7);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgvBBQgOgNAAgSQAAgYASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgOAAgJAHQgJAGAAAKIgaAAQAAgLAIgKQAIgLAOgFQAOgHAPAAQAaAAAOANQAPANABAXIAABEQgBAVAGAMIAAACIgbAAQgCgFgBgLQgSATgZAAQgWAAgOgNgAgjAeQAAAMAIAGQAIAIANgBQAKAAALgGQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_77.setTransform(392.3,-104.55);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgtBpIgKgCIAAgVIAIABQAMAAAIgFQAHgGAFgOIAFgPIg1iTIAcAAIAkBvIAjhvIAcAAIg8CsQgOAlgeAAg");
	this.shape_78.setTransform(377.8,-101.525);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AAiBNIAAhjQgBgQgHgIQgHgHgQgBQgMABgIAGQgKAHgGALIAABqIgZAAIAAiWIAYAAIABATQARgWAbABQAvAAABA2IAABig");
	this.shape_79.setTransform(351.75,-104.7);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AguBBQgPgNAAgSQAAgYASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgOAAgJAHQgJAGAAAKIgaAAQAAgLAIgKQAIgLAOgFQANgHAQAAQAZAAAQANQAOANAAAXIAABEQABAVAFAMIAAACIgbAAQgCgFgCgLQgRATgYAAQgWAAgOgNgAgjAeQAAAMAIAGQAIAIAMgBQAMAAALgGQAKgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_80.setTransform(336.1,-104.55);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AAkBLIgkhwIgjBwIgVAAIgriVIAZAAIAeBvIAjhvIATAAIAkBxIAdhxIAZAAIgrCVg");
	this.shape_81.setTransform(317.725,-104.55);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgrA6QgUgVABghIAAgEQgBgWAJgSQAIgRAQgKQAPgKARAAQAdAAARATQAQAUAAAjIAAALIhlAAQAAAVANAOQANAOARAAQAOAAAKgFQAJgGAHgJIAPAMQgSAdgmAAQgeAAgSgUgAgXgsQgKALgDAUIBKAAIAAgCQgBgTgJgLQgKgLgQABQgPAAgKALg");
	this.shape_82.setTransform(299.8,-104.55);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AAhBrIAAhkQAAgPgHgIQgIgHgPgBQgMABgJAGQgJAHgFAKIAABrIgaAAIAAjVIAaAAIAABRQAQgVAbABQAwAAAAA1IAABjg");
	this.shape_83.setTransform(284.4,-107.7);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgjBNIAAiWIAZAAIAAASQAMgUAXAAQAHAAAEACIAAAYIgMgCQgZABgJAVIAABqg");
	this.shape_84.setTransform(260.925,-104.7);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AguBBQgPgNAAgSQAAgYASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAGAAAKIgaAAQAAgLAIgKQAIgLAOgFQANgHAQAAQAaAAAPANQAOANAAAXIAABEQAAAVAGAMIAAACIgbAAQgCgFgBgLQgTATgXAAQgXAAgNgNgAgjAeQAAAMAIAGQAIAIAMgBQALAAAMgGQAKgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_85.setTransform(247.55,-104.55);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgmBXIgBASIgYAAIAAjUIAaAAIAABPQAQgTAaAAQAbAAAQAVQAPAVABAjIAAABQAAAjgQAVQgQAVgbAAQgbAAgQgVgAglgCIAABAQAMAYAZAAQARAAALgPQAKgOAAgcQAAgagKgOQgKgOgTAAQgZAAgLAXg");
	this.shape_86.setTransform(232.2,-107.55);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("ABPBNIAAhiQABgRgIgIQgHgIgRAAQgPAAgKAJQgIAIgCAPIAABjIgZAAIAAhiQAAgggggBQgaAAgIAWIAABtIgaAAIAAiWIAYAAIABARQAQgTAcAAQAfAAALAYQAIgLALgHQAMgGARAAQAyAAAAA0IAABkg");
	this.shape_87.setTransform(211.5,-104.7);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AgvBBQgOgNAAgSQAAgYASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgOAAgJAHQgJAGAAAKIgaAAQAAgLAIgKQAIgLAOgFQAOgHAPAAQAaAAAOANQAPANABAXIAABEQgBAVAGAMIAAACIgbAAQgCgFgCgLQgRATgZAAQgVAAgPgNgAgjAeQAAAMAIAGQAIAIANgBQALAAAKgGQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_88.setTransform(191.25,-104.55);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgfBjQgQgHgIgMIAOgQQAQAVAYAAQASAAAKgLQALgKAAgTIAAgNQgQASgaAAQgaAAgQgWQgQgVAAgjQAAgjAQgVQAQgVAbAAQAaAAAQATIABgQIAXAAIAACSQAAAdgRARQgRAQgdAAQgQAAgPgHgAgahFQgLAPAAAcQAAAaALANQAKAPASAAQAYAAAMgWIAAhEQgMgVgYAAQgSAAgKAOg");
	this.shape_89.setTransform(175.225,-101.75);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AAgBrIgzhGIgQARIAAA1IgaAAIAAjVIAaAAIAACAIANgQIAugxIAgAAIg6A+IBABYg");
	this.shape_90.setTransform(149.7,-107.7);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgvBBQgOgNAAgSQAAgYASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAGAAAKIgaAAQAAgLAIgKQAIgLAOgFQAOgHAPAAQAZAAAPANQAPANABAXIAABEQAAAVAFAMIAAACIgbAAQgCgFgCgLQgRATgZAAQgVAAgPgNgAgjAeQAAAMAIAGQAIAIANgBQALAAAKgGQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_91.setTransform(133.75,-104.55);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AgEBUQgIgKgBgTIAAhcIgbAAIAAgUIAbAAIAAglIAZAAIAAAlIAcAAIAAAUIgcAAIAABcQAAAJAEAEQADAFAJAAIANgCIAAAVQgKADgKAAQgRAAgIgLg");
	this.shape_92.setTransform(121,-106.225);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgwA4QgTgVAAgiIAAgBQAAgXAJgRQAIgSAQgJQAPgKATAAQAfAAATAWQASAVAAAiIAAABQAAAXgIARQgIARgQAKQgQAKgUAAQgdAAgTgWgAgegpQgLAPAAAbQAAAZALAPQAMAQASAAQAUAAALgQQAMgPAAgaQAAgZgMgQQgMgOgTAAQgSAAgMAOg");
	this.shape_93.setTransform(108.675,-104.55);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AAgBrIgzhGIgRARIAAA1IgZAAIAAjVIAZAAIAACAIAPgQIAtgxIAfAAIg5A+IBABYg");
	this.shape_94.setTransform(94.3,-107.7);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AguA+QgMgOAAgbIAAhhIAZAAIAABhQAAAhAcABQAcAAALgXIAAhsIAZAAIAACWIgZAAIAAgQQgPASgcAAQgYAAgNgOg");
	this.shape_95.setTransform(66.75,-104.4);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgcCCIAAgVQAFACAHAAQAIAAAGgFQACgEAAgMIAAinIAaAAIAACmQAAArgmABQgIgBgIgCgAAChrQgDgEAAgGQAAgGADgEQAEgFAHAAQAIABAEAEQADAEAAAGQAAAGgDAEQgEAFgIAAQgHAAgEgFg");
	this.shape_96.setTransform(54.15,-104.25);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AgtA+QgNgOAAgbIAAhhIAZAAIAABhQABAhAbABQAdAAAKgXIAAhsIAZAAIAACWIgYAAIgBgQQgPASgcAAQgYAAgMgOg");
	this.shape_97.setTransform(44.4,-104.4);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AAhBNIAAhjQAAgQgHgIQgIgHgPgBQgMABgJAGQgJAHgFALIAABqIgaAAIAAiWIAYAAIABATQARgWAbABQAwAAAAA2IAABig");
	this.shape_98.setTransform(28.8,-104.7);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AgrA6QgUgVABghIAAgEQgBgWAJgSQAJgRAPgKQAPgKARAAQAdAAAQATQAQAUABAjIAAALIhlAAQABAVAMAOQAMAOASAAQAOAAAJgFQAKgGAHgJIAQAMQgTAdgmAAQgdAAgTgUgAgXgsQgLALgCAUIBKAAIAAgCQgBgTgJgLQgKgLgQABQgPAAgKALg");
	this.shape_99.setTransform(13.7,-104.55);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("ABQBNIAAhiQAAgRgIgIQgHgIgSAAQgOAAgJAJQgKAIgBAPIAABjIgZAAIAAhiQAAgggggBQgZAAgKAWIAABtIgZAAIAAiWIAYAAIAAARQARgTAcAAQAgAAAKAYQAIgLAMgHQALgGARAAQAxAAABA0IAABkg");
	this.shape_100.setTransform(-6.35,-104.7);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AgfBjQgQgHgIgMIAOgQQAQAVAYAAQASAAAKgLQALgKAAgTIAAgNQgQASgaAAQgaAAgQgWQgQgVAAgjQAAgjAQgVQAQgVAbAAQAaAAAQATIABgQIAXAAIAACSQAAAdgRARQgRAQgdAAQgQAAgPgHgAgahFQgLAPAAAcQAAAaALANQAKAPASAAQAYAAAMgWIAAhEQgMgVgYAAQgSAAgKAOg");
	this.shape_101.setTransform(-38.675,-101.75);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AAiBNIAAhjQgBgQgHgIQgHgHgQgBQgMABgIAGQgKAHgGALIAABqIgZAAIAAiWIAYAAIABATQARgWAbABQAvAAABA2IAABig");
	this.shape_102.setTransform(-54.15,-104.7);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AgMBmIAAiVIAZAAIAACVgAgKhMQgEgEAAgHQAAgGAEgEQADgEAHAAQAHAAAEAEQAEAEAAAGQAAAHgEAEQgEAEgHAAQgHAAgDgEg");
	this.shape_103.setTransform(-65.375,-107.275);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AAhBNIAAhjQAAgQgHgIQgIgHgPgBQgMABgJAGQgJAHgFALIAABqIgaAAIAAiWIAYAAIABATQARgWAbABQAwAAAAA2IAABig");
	this.shape_104.setTransform(-76.6,-104.7);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AgtA+QgNgOAAgbIAAhhIAZAAIAABhQABAhAbABQAcAAALgXIAAhsIAZAAIAACWIgYAAIgBgQQgPASgcAAQgYAAgMgOg");
	this.shape_105.setTransform(-92.3,-104.4);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AAgBrIgzhGIgQARIAAA1IgaAAIAAjVIAaAAIAACAIANgQIAugxIAfAAIg5A+IBABYg");
	this.shape_106.setTransform(-106.35,-107.7);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AAgBrIgzhGIgRARIAAA1IgZAAIAAjVIAZAAIAACAIAPgQIAtgxIAgAAIg6A+IBABYg");
	this.shape_107.setTransform(-132.4,-107.7);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AguBBQgPgNAAgSQAAgYASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAGAAAKIgaAAQAAgLAIgKQAIgLAOgFQAOgHAPAAQAaAAAPANQAOANAAAXIAABEQAAAVAGAMIAAACIgbAAQgCgFgBgLQgTATgXAAQgXAAgNgNgAgjAeQAAAMAIAGQAIAIAMgBQALAAAMgGQAKgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_108.setTransform(-148.35,-104.55);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AgEBUQgJgKAAgTIAAhcIgbAAIAAgUIAbAAIAAglIAZAAIAAAlIAcAAIAAAUIgcAAIAABcQAAAJAEAEQADAFAKAAIAMgCIAAAVQgKADgKAAQgRAAgIgLg");
	this.shape_109.setTransform(-161.1,-106.225);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AgwA4QgTgVAAgiIAAgBQAAgXAJgRQAIgSAQgJQAPgKATAAQAfAAATAWQASAVAAAiIAAABQAAAXgIARQgIARgQAKQgQAKgUAAQgdAAgTgWgAgegpQgLAPAAAbQAAAZALAPQAMAQASAAQAUAAALgQQAMgPAAgaQAAgZgMgQQgMgOgTAAQgSAAgMAOg");
	this.shape_110.setTransform(-173.425,-104.55);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AAgBrIgzhGIgQARIAAA1IgaAAIAAjVIAaAAIAACAIANgQIAugxIAfAAIg5A+IBABYg");
	this.shape_111.setTransform(-187.8,-107.7);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AgfBjQgQgHgIgMIAOgQQAQAVAYAAQASAAAKgLQALgKAAgTIAAgNQgQASgaAAQgaAAgQgWQgQgVAAgjQAAgjAQgVQAQgVAbAAQAaAAAQATIABgQIAXAAIAACSQAAAdgRARQgRAQgdAAQgQAAgPgHgAgahFQgLAPAAAcQAAAaALANQAKAPASAAQAYAAAMgWIAAhEQgMgVgYAAQgSAAgKAOg");
	this.shape_112.setTransform(-215.825,-101.75);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AgvBBQgOgNAAgSQAAgYASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgOAAgJAHQgJAGAAAKIgaAAQAAgLAIgKQAIgLAOgFQAOgHAPAAQAaAAAOANQAPANABAXIAABEQgBAVAGAMIAAACIgbAAQgCgFgCgLQgRATgZAAQgVAAgPgNgAgjAeQAAAMAIAGQAIAIANgBQAKAAALgGQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_113.setTransform(-231.3,-104.55);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AgjBNIAAiWIAZAAIAAASQAMgUAXAAQAHAAAEACIAAAYIgMgCQgZABgJAVIAABqg");
	this.shape_114.setTransform(-243.025,-104.7);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AhIBlIAAjJIA5AAQAZAAAVAMQAUALALAWQALAWAAAbIAAAMQAAAcgLAWQgLAVgUAMQgVAMgaAAgAguBPIAcAAQAeAAASgTQARgTAAgjIAAgMQAAghgQgUQgQgTgdAAIggAAg");
	this.shape_115.setTransform(-257.5,-107.15);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgJgJQgJgKgUAAQgaAAgNAXIAACnIhAAAIAAjtIA9AAIABAcQAZggArAAQAlAAATAWQASAWABAtIAACYg");
	this.shape_116.setTransform(209.8,-167.7);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AgfCmIAAjtIA/AAIAADtgAgYhtQgKgJAAgOQgBgPAKgJQAKgJAPAAQAQAAAKAJQAKAJgBAPQABAOgKAJQgKAKgQAAQgPAAgJgKg");
	this.shape_117.setTransform(191.25,-172.175);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AhRBnQgYgUAAgfQAAgmAcgTQAcgUA0AAIAeAAIAAgOQAAgQgJgKQgJgKgQAAQgRAAgIAHQgKAIAAAOIg/AAQgBgVANgSQANgRAXgKQAYgKAcAAQArAAAbAWQAZAWAAAoIAABmQAAAiAKARIAAAEIhAAAQgFgJgCgNQgXAagkAAQgjAAgWgUgAgpAsIAAADQAAAMAIAIQAIAIAPAAQANAAAMgHQAMgGAGgKIAAgpIgYAAQgvAAgDAhg");
	this.shape_118.setTransform(173.2,-167.475);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("ABqB5IAAiWQAAgVgHgJQgIgKgUAAQgdAAgLAcIAACiIg+AAIAAiWQAAgVgIgJQgIgKgUAAQgbABgMAWIAACnIg/AAIAAjtIA7AAIACAbQAZgfArAAQAtAAARAlQAZglAvAAQAmAAATAWQATAXAAAuIAACWg");
	this.shape_119.setTransform(141.725,-167.7);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AhCB5IAAjtIA8AAIABAdQATghAhAAQALAAAJADIgBA9QgNgCgJAAQglAAgKAYIAACbg");
	this.shape_120.setTransform(114.95,-167.7);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AhKBbQghggAAg1IAAgGQAAgjAOgcQAOgdAZgPQAZgPAgAAQAxAAAcAfQAcAeAAA5IAAAZIiXAAQADAXAQAOQAPAOAXAAQAlAAAUgbIAgAjQgPAVgYALQgYALgeAAQgzAAghgggAgbg6QgMANgDAXIBXAAIAAgFQAAgVgLgLQgLgMgUAAQgSAAgMANg");
	this.shape_121.setTransform(93.925,-167.475);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("Ah2CgIAAk/IBwAAQA5AAAfAWQAeAXAAArQAAAXgMASQgNASgVAIQAZAFAOATQAOATAAAbQAAAugeAYQgdAXg2ABgAg0BrIA4AAQAXAAANgLQANgLAAgUQAAgsgtAAIg8AAgAg0gZIAxAAQAxgBAAgnQAAgVgNgKQgNgKgaAAIguAAg");
	this.shape_122.setTransform(67.475,-171.575);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AAlCoIg8hfIgWAXIAABIIhAAAIAAlPIBAAAIAAC5IALgPIA8hHIBMAAIhVBiIBdCKg");
	this.shape_123.setTransform(31.1,-172.45);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AhRBjQgUgWAAgrIAAiaIA/AAIAACZQAAAlAhAAQAgAAAMgXIAAinIA/AAIAADsIg7AAIgCgYQgYAdgoAAQgmAAgUgWg");
	this.shape_124.setTransform(5,-167.25);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("Ag5DSIAAgyQAMACAIAAQAeAAAAgfIAAj6IA+AAIAAD6QAAAngVAWQgVAWgmAAQgRAAgPgEgAgDidQgKgJAAgOQAAgPAKgJQAIgJARAAQARAAAJAJQAJAJAAAPQAAAOgJAJQgKAKgQAAQgQAAgJgKg");
	this.shape_125.setTransform(-15.65,-167.375);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgIgJQgJgKgVAAQgZAAgOAXIAACnIhAAAIAAjtIA9AAIABAcQAZggArAAQAlAAATAWQASAWABAtIAACYg");
	this.shape_126.setTransform(-31.95,-167.7);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AhRBjQgUgWgBgrIAAiaIBAAAIAACZQAAAlAiAAQAfAAAMgXIAAinIBAAAIAADsIg8AAIgCgYQgYAdgoAAQgmAAgUgWg");
	this.shape_127.setTransform(-57.15,-167.25);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AgjBTIAAh/IgjAAIAAgvIAjAAIAAg6IA/AAIAAA6IAoAAIAAAvIgoAAIAAB1QAAANAFAGQAFAGAOAAQAKAAAJgCIAAAwQgTAGgUAAQhCAAgBhDg");
	this.shape_128.setTransform(-77.575,-170.175);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AhKBbQghggAAg1IAAgGQAAgjAOgcQAOgdAZgPQAZgPAgAAQAxAAAcAfQAcAeAAA5IAAAZIiXAAQADAXAQAOQAPAOAXAAQAlAAAUgbIAgAjQgPAVgYALQgYALgeAAQgzAAghgggAgbg6QgMANgDAXIBXAAIAAgFQAAgVgLgLQgLgMgUAAQgSAAgMANg");
	this.shape_129.setTransform(-96.725,-167.475);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("Ah6CgIAAk/IB8AAQAkAAAbANQAcANAPAZQAOAYAAAfQAAAvgfAaQghAbg5AAIg4AAIAABxgAg3gFIA5AAQAbAAANgNQAOgMAAgXQAAgXgOgPQgOgOgYgBIg7AAg");
	this.shape_130.setTransform(-123,-171.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.instance},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).to({state:[]},1).wait(12));

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
	this.exit = new lib.btnEit_1();
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

	this.instance_2 = new lib.Symbol99("synched",0);
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
(lib.materi9 = function(mode,startPosition,loop) {
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
		  window.location.replace("../materi10/index.html");
		});
		
		root.btnBack3.on("click", function () {
		  window.location.replace("../materi8/index.html");
		});
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
		
		root.popUpInfo.gotoAndStop(0);
		
		root.btnInfo.on("click", function () {
		  root.popUpInfo.gotoAndPlay(0);
		});
		
		root.popUpAnim1.gotoAndStop(0);
		
		root.btnAnim1.on("click", function () {
		  root.popUpAnim1.gotoAndPlay(0);
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
		  jawaban = [];
		
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
			if (pieces.count === 2) root.onWin();
		    if (pieces.count === pieces.children.length) root.onWin();
		    if (Score.text === 100) {
		      root.onWin();
		    }
		
		    root.slot = null;
		  } else root.onMiss();
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
		  Score.text = pieces.skor * 50;
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
	this.nyala.setTransform(498.1,38.2,0.6758,0.6758,0,0,0,-16.2,-1.1);
	new cjs.ButtonHelper(this.nyala, 0, 1, 2, false, new lib.ggg(), 3);

	this.tandaSuaraOn = new lib.an_Image({'id': 'tandaSuaraOn', 'src':'images/animation_500_kdvpuxkb.gif', 'alt':'image', 'border':'0', 'visible':true, 'class':'ui-image'});

	this.tandaSuaraOn.name = "tandaSuaraOn";
	this.tandaSuaraOn.setTransform(432.7,32.05,0.4105,0.4105,0,0,0,50.2,45.2);

	this.hening = new lib.dsdsd();
	this.hening.name = "hening";
	this.hening.setTransform(498.1,38.2,0.6758,0.6758,0,0,0,-16.2,-1.1);
	new cjs.ButtonHelper(this.hening, 0, 1, 2, false, new lib.dsdsd(), 3);

	this.tandaSuaraOff = new lib.an_Image({'id': 'tandaSuaraOff', 'src':'images/animation_500_kdvpuxkb.gif', 'alt':'image', 'border':'0', 'visible':true, 'class':'ui-image'});

	this.tandaSuaraOff.name = "tandaSuaraOff";
	this.tandaSuaraOff.setTransform(433,32.05,0.4105,0.4105,0,0,0,50.2,45.2);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgNASQgEgDAAgGQAAgGAFgDQAFgDAJAAIAHAAIAAgEQAAgEgDgCQgCgCgEgBQgDAAgDACQgDADAAACIgHAAQAAgDACgDQADgDADgBQAEgCAEAAQAHAAAFADQAEAEAAAGIAAATQAAAHACADIAAAAIgIAAIgBgEQgFAGgGAAQgHgBgEgEgAgKAIQAAAEADACQACACAEAAQACAAADgCQADgCACgDIAAgJIgGAAQgNAAAAAIg");
	this.shape.setTransform(438.875,59);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgKAWIAAgqIAHAAIABAFQACgGAHAAIAEABIAAAHIgFAAQgGgBgCAHIAAAdg");
	this.shape_1.setTransform(435.5,58.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgNASQgEgDAAgGQAAgGAFgDQAFgDAJAAIAHAAIAAgEQAAgEgDgCQgCgCgEgBQgDAAgDACQgDADAAACIgHAAQAAgDACgDQADgDADgBQAEgCAEAAQAHAAAFADQAEAEAAAGIAAATQAAAHACADIAAAAIgIAAIgBgEQgFAGgGAAQgHgBgEgEgAgKAIQAAAEADACQACACAEAAQACAAADgCQADgCACgDIAAgJIgGAAQgNAAAAAIg");
	this.shape_2.setTransform(431.675,59);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgMASQgEgEAAgIIAAgbIAHAAIAAAbQAAAJAIAAQAIAAADgFIAAgfIAHAAIAAAqIgHAAIAAgEQgEAFgIAAQgHAAgDgEg");
	this.shape_3.setTransform(427.225,59.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJAbQgFgCgDgEQgDgEAAgFIAIAAQAAAFADADQAFADAFAAQAGAAAEgCQADgDgBgEQABgEgDgCQgEgDgHgCQgJgDgEgDQgFgEAAgGQAAgHAFgEQAGgFAIAAQAFAAAGACQAEADADAEQACAEAAAFIgIAAQAAgGgDgDQgDgDgGAAQgFAAgDADQgDACgBAFQAAADAEADQADACAGACQAHACAEACQAFACABADQACAEAAAEQAAAHgGAEQgFAFgJAAQgFAAgFgDg");
	this.shape_4.setTransform(422.55,58.275);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3498DB").s().p("Aj8D9QhphpAAiUQAAiTBphqQBphoCTAAQCVAABoBoQBpBqAACTQAACUhpBpQhoBpiVAAQiTAAhphpg");
	this.shape_5.setTransform(432.8705,37.4545,0.9301,0.9301);

	this.instance = new lib.hehe();
	this.instance.setTransform(471.4,37.5,0.7145,0.9301,0,0,0,86.2,36);
	this.instance.shadow = new cjs.Shadow("rgba(0,0,0,1)",3,3,4);
	this.instance.cache(-2,-2,176,76);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.tandaSuaraOff},{t:this.hening},{t:this.tandaSuaraOn},{t:this.nyala}]}).wait(1));

	// Layer_3
	this.popUpJawabanAkhir = new lib.popUpJawabanAkhir();
	this.popUpJawabanAkhir.name = "popUpJawabanAkhir";
	this.popUpJawabanAkhir.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.popUpJawabanAkhir).wait(1));

	// Layer_2
	this.popUpDanger = new lib.dsdsdd();
	this.popUpDanger.name = "popUpDanger";
	this.popUpDanger.setTransform(347.5,460.5,0.7235,0.7265,0,0,0,33.4,33.1);

	this.popUpSelesai = new lib.dsd();
	this.popUpSelesai.name = "popUpSelesai";
	this.popUpSelesai.setTransform(370.8,303.85,0.7235,0.7265,0,0,0,33.4,33.1);

	this.popUpSalah = new lib.fff();
	this.popUpSalah.name = "popUpSalah";
	this.popUpSalah.setTransform(370.8,303.85,0.7235,0.7265,0,0,0,33.4,33.1);

	this.popUpBenar = new lib.bener();
	this.popUpBenar.name = "popUpBenar";
	this.popUpBenar.setTransform(370.75,303.85,0.7236,0.7266,0,0,0,33.3,33.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.popUpBenar},{t:this.popUpSalah},{t:this.popUpSelesai},{t:this.popUpDanger}]}).wait(1));

	// animasi
	this.popUpAnim1 = new lib.popUpAnimasi();
	this.popUpAnim1.name = "popUpAnim1";
	this.popUpAnim1.setTransform(488.55,284.6,1,1,0,0,0,50.2,-28.9);

	this.timeline.addTween(cjs.Tween.get(this.popUpAnim1).wait(1));

	// info
	this.popUpInfo = new lib.popUpInfo();
	this.popUpInfo.name = "popUpInfo";
	this.popUpInfo.setTransform(488.55,284.6,1,1,0,0,0,50.2,-28.9);

	this.timeline.addTween(cjs.Tween.get(this.popUpInfo).wait(1));

	// Layer_1
	this.instance_1 = new lib.sustain();
	this.instance_1.setTransform(141.35,47,1,1,0,0,0,125.9,18.8);

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

	this.btnAnim1 = new lib.btnAnim();
	this.btnAnim1.name = "btnAnim1";
	this.btnAnim1.setTransform(472.15,298.65,0.4113,0.4113,0,0,0,56.9,68.3);
	new cjs.ButtonHelper(this.btnAnim1, 0, 1, 2, false, new lib.btnAnim(), 3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAXA0IAAhDQAAgLgFgFQgFgFgLAAQgHAAgHAEQgGAFgEAIIAABHIgRAAIAAhlIAQAAIABANQAMgPASAAQAgAAAAAkIAABDg");
	this.shape_6.setTransform(642.475,245.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AggAtQgJgJAAgOQAAgPAMgIQAMgJAVAAIARAAIAAgIQAAgJgGgGQgFgFgKAAQgJAAgGAFQgHAFAAAGIgRAAQAAgIAGgGQAEgIAKgEQAKgEAKAAQARAAAKAJQAKAIABAQIAAAuQgBAOAEAIIAAACIgTAAQgBgDgBgIQgMANgQAAQgPAAgKgIgAgYAUQAAAJAFAEQAGAEAIAAQAIAAAIgDQAGgFAEgHIAAgVIgOAAQgfABAAASg");
	this.shape_7.setTransform(631.9,245.2);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgVBEQgKgGgGgIIAJgKQALAOAQAAQAMAAAHgHQAHgHAAgOIAAgIQgKAMgRAAQgSAAgLgPQgLgOAAgYQAAgXALgPQALgOASAAQASAAAKAOIABgMIAQAAIAABiQAAAUgMAMQgLALgUAAQgKAAgLgEgAgRguQgIAJAAAUQAAARAHAJQAHAKAMAAQARAAAHgPIAAguQgIgOgQAAQgLAAgHAKg");
	this.shape_8.setTransform(621.025,247.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAXA0IAAhDQAAgLgFgFQgFgFgLAAQgHAAgHAEQgGAFgEAIIAABHIgRAAIAAhlIAQAAIABANQAMgPASAAQAgAAAAAkIAABDg");
	this.shape_9.setTransform(610.425,245.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgfAtQgKgJAAgOQAAgPAMgIQAMgJAVAAIARAAIAAgIQAAgJgGgGQgFgFgKAAQgJAAgGAFQgHAFAAAGIgRAAQAAgIAGgGQAEgIAKgEQAJgEALAAQARAAAKAJQAKAIABAQIAAAuQgBAOAEAIIAAACIgTAAQgBgDgBgIQgMANgQAAQgPAAgJgIgAgYAUQAAAJAFAEQAGAEAJAAQAHAAAIgDQAGgFAEgHIAAgVIgOAAQgfABAAASg");
	this.shape_10.setTransform(599.85,245.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgqBHIAAiLIAQAAIABALQAKgNASAAQATAAAKANQALAOAAAZIAAACQAAAWgLAOQgKAOgSAAQgSAAgLgLIAAAwgAgZgpIAAAvQAIAOAQAAQAMAAAHgKQAIgKAAgTQAAgQgIgLQgHgJgMgBQgQABgIAOg");
	this.shape_11.setTransform(589.375,247.05);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAXA0IAAhDQAAgLgFgFQgFgFgLAAQgHAAgHAEQgGAFgEAIIAABHIgRAAIAAhlIAQAAIABANQAMgPASAAQAgAAAAAkIAABDg");
	this.shape_12.setTransform(573.625,245.1);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AggAtQgJgJAAgOQAAgPAMgIQAMgJAVAAIARAAIAAgIQAAgJgGgGQgFgFgKAAQgJAAgGAFQgHAFAAAGIgRAAQAAgIAGgGQAEgIAKgEQAKgEAKAAQARAAAKAJQAKAIABAQIAAAuQgBAOAEAIIAAACIgTAAQgBgDgBgIQgMANgQAAQgPAAgKgIgAgYAUQAAAJAFAEQAGAEAJAAQAHAAAIgDQAGgFAEgHIAAgVIgOAAQgfABAAASg");
	this.shape_13.setTransform(563.05,245.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAXBIIAAhDQAAgKgFgFQgFgGgLAAQgHABgHAEQgGAFgEAGIAABIIgRAAIAAiPIARAAIAAA3QAMgOASAAQAggBAAAkIAABDg");
	this.shape_14.setTransform(552.475,243.05);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AggAtQgJgJAAgOQAAgPAMgIQAMgJAVAAIARAAIAAgIQAAgJgGgGQgFgFgKAAQgJAAgGAFQgHAFAAAGIgRAAQAAgIAGgGQAEgIAKgEQAKgEAKAAQARAAAKAJQAKAIABAQIAAAuQgBAOAEAIIAAACIgTAAQgBgDgBgIQgMANgQAAQgPAAgKgIgAgYAUQAAAJAFAEQAGAEAIAAQAIAAAIgDQAGgFAEgHIAAgVIgOAAQgfABAAASg");
	this.shape_15.setTransform(541.9,245.2);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgZA8IgBALIgQAAIAAiPIARAAIAAA1QALgMASAAQASAAALANQAKAOAAAYIAAACQAAAXgKAOQgLAOgSAAQgTAAgKgNgAgZgBIAAAsQAIAQARAAQAMAAAHgKQAHgKAAgUQAAgRgHgJQgHgKgMAAQgRABgIAPg");
	this.shape_16.setTransform(531.425,243.15);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgIBFIAAhkIAQAAIAABkgAgHgzQgCgEAAgDQAAgFACgDQADgCAEAAQAFAAADACQACADAAAFQAAADgCAEQgDADgFAAQgEAAgDgDg");
	this.shape_17.setTransform(518.675,243.35);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AggAtQgJgJAAgOQAAgPAMgIQAMgJAVAAIARAAIAAgIQAAgJgFgGQgGgFgKAAQgJAAgHAFQgFAFgBAGIgRAAQAAgIAGgGQAEgIAKgEQAKgEAKAAQARAAAKAJQAKAIAAAQIAAAuQABAOADAIIAAACIgTAAQgBgDgBgIQgMANgQAAQgPAAgKgIgAgYAUQAAAJAGAEQAFAEAIAAQAIAAAHgDQAHgFAEgHIAAgVIgNAAQggABAAASg");
	this.shape_18.setTransform(511.05,245.2);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgVBEQgKgGgGgIIAJgKQALAOAQAAQAMAAAHgHQAHgHAAgOIAAgIQgKAMgRAAQgSAAgLgPQgLgOAAgYQAAgXALgPQALgOASAAQASAAAKAOIABgMIAQAAIAABiQAAAUgMAMQgLALgUAAQgKAAgLgEgAgRguQgIAJAAAUQAAARAHAJQAHAKAMAAQARAAAHgPIAAguQgIgOgQAAQgLAAgHAKg");
	this.shape_19.setTransform(500.175,247.1);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AggAtQgJgJAAgOQAAgPAMgIQAMgJAVAAIARAAIAAgIQAAgJgGgGQgFgFgKAAQgJAAgGAFQgHAFAAAGIgRAAQAAgIAGgGQAEgIAKgEQAKgEAKAAQARAAAKAJQAKAIABAQIAAAuQgBAOAEAIIAAACIgTAAQgBgDgBgIQgMANgQAAQgPAAgKgIgAgYAUQAAAJAFAEQAGAEAIAAQAIAAAIgDQAGgFAEgHIAAgVIgOAAQgfABAAASg");
	this.shape_20.setTransform(489.7,245.2);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgZA8IgBALIgQAAIAAiPIARAAIAAA1QALgMASAAQASAAALANQAKAOAAAYIAAACQAAAXgKAOQgLAOgSAAQgTAAgKgNgAgZgBIAAAsQAIAQARAAQAMAAAHgKQAHgKAAgUQAAgRgHgJQgHgKgMAAQgRABgIAPg");
	this.shape_21.setTransform(479.225,243.15);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgdAnQgNgOAAgWIAAgDQAAgOAFgMQAGgMALgHQAKgHALAAQAUAAALANQALANAAAZIAAAGIhEAAQAAAPAJAJQAIAKAMgBQAJABAHgEQAGgEAFgGIALAIQgNAUgaAAQgTAAgNgOgAgQgeQgHAIgBAOIAyAAIAAgBQgBgOgHgHQgGgIgLABQgJgBgIAIg");
	this.shape_22.setTransform(468.525,245.2);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgUAwQgJgEgFgIQgFgIgBgJIASAAQABAJAGAGQAHAEAJAAQAKAAAGgDQAGgFAAgGQAAgHgFgEQgFgEgNgDQgNgDgIgDQgIgDgEgGQgDgGAAgHQAAgMALgJQAKgJAQAAQARAAALAJQAKAJAAAOIgRAAQAAgHgGgGQgGgEgJAAQgJAAgFADQgGAEABAHQAAAHAEADQAFADAMADQAOADAHAEQAIADAFAGQADAGAAAHQABAOgMAJQgKAIgSAAQgLAAgKgFg");
	this.shape_23.setTransform(458.3,245.2);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgCA5QgGgHAAgNIAAg+IgTAAIAAgOIATAAIAAgYIAQAAIAAAYIATAAIAAAOIgTAAIAAA+QAAAGADADQACADAGAAIAJgBIAAAOQgHACgHAAQgLAAgFgHg");
	this.shape_24.setTransform(445.125,244.075);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgfArQgIgKAAgSIAAhCIARAAIAABBQAAAXATAAQATAAAGgPIAAhJIASAAIAABlIgRAAIAAgKQgKAMgSAAQgRAAgJgJg");
	this.shape_25.setTransform(436.95,245.3);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgZA8IgBALIgQAAIAAiPIARAAIAAA1QALgMASAAQASAAALANQAKAOAAAYIAAACQAAAXgKAOQgLAOgSAAQgTAAgKgNgAgZgBIAAAsQAIAQARAAQAMAAAHgKQAHgKAAgUQAAgRgHgJQgHgKgMAAQgRABgIAPg");
	this.shape_26.setTransform(426.375,243.15);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgdAnQgNgOAAgWIAAgDQAAgOAFgMQAGgMALgHQAKgHALAAQAUAAALANQALANAAAZIAAAGIhEAAQAAAPAJAJQAIAKAMgBQAJABAHgEQAGgEAFgGIALAIQgNAUgaAAQgTAAgNgOgAgQgeQgHAIgBAOIAyAAIAAgBQgBgOgHgHQgGgIgLABQgJgBgIAIg");
	this.shape_27.setTransform(415.725,245.2);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgTAwQgKgEgFgIQgGgIABgJIARAAQAAAJAHAGQAGAEAKAAQAKAAAGgDQAGgFAAgGQAAgHgFgEQgGgEgMgDQgNgDgIgDQgHgDgFgGQgDgGAAgHQAAgMAKgJQALgJAPAAQASAAALAJQALAJgBAOIgRAAQAAgHgGgGQgGgEgKAAQgIAAgFADQgFAEAAAHQAAAHAEADQAFADAMADQANADAJAEQAHADAEAGQAEAGABAHQAAAOgMAJQgKAIgSAAQgLAAgJgFg");
	this.shape_28.setTransform(405.5,245.2);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgYA0IAAhlIARAAIABAMQAHgOAQAAQAFAAADABIAAAQIgJAAQgQAAgGAPIAABHg");
	this.shape_29.setTransform(397.825,245.1);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgdAnQgNgOAAgWIAAgDQAAgOAFgMQAGgMALgHQAKgHALAAQAUAAALANQALANAAAZIAAAGIhEAAQAAAPAJAJQAIAKAMgBQAJABAHgEQAGgEAFgGIALAIQgNAUgaAAQgTAAgNgOgAgQgeQgHAIgBAOIAyAAIAAgBQgBgOgHgHQgGgIgLABQgJgBgIAIg");
	this.shape_30.setTransform(388.975,245.2);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgCA5QgGgHAAgNIAAg+IgTAAIAAgOIATAAIAAgYIAQAAIAAAYIATAAIAAAOIgTAAIAAA+QAAAGADADQACADAGAAIAJgBIAAAOQgHACgHAAQgLAAgFgHg");
	this.shape_31.setTransform(380.325,244.075);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAXA0IAAhDQAAgLgFgFQgFgFgLAAQgHAAgHAEQgGAFgEAIIAABHIgRAAIAAhlIAQAAIABANQAMgPASAAQAgAAAAAkIAABDg");
	this.shape_32.setTransform(367.325,245.1);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AggAtQgJgJAAgOQAAgPAMgIQAMgJAVAAIARAAIAAgIQAAgJgFgGQgGgFgKAAQgJAAgHAFQgFAFgBAGIgRAAQAAgIAGgGQAEgIAKgEQAKgEAKAAQARAAAKAJQAKAIAAAQIAAAuQABAOADAIIAAACIgTAAQgBgDgBgIQgMANgQAAQgPAAgKgIgAgYAUQAAAJAGAEQAFAEAIAAQAIAAAIgDQAGgFAEgHIAAgVIgNAAQggABAAASg");
	this.shape_33.setTransform(356.7,245.2);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AAZAzIgZhMIgXBMIgPAAIgdhlIARAAIAUBMIAYhMIANAAIAYBNIAUhNIARAAIgdBlg");
	this.shape_34.setTransform(344.225,245.2);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgdAnQgNgOAAgWIAAgDQAAgOAFgMQAGgMALgHQAKgHALAAQAUAAALANQALANAAAZIAAAGIhEAAQAAAPAJAJQAIAKAMgBQAJABAHgEQAGgEAFgGIALAIQgNAUgaAAQgTAAgNgOgAgQgeQgHAIgBAOIAyAAIAAgBQgBgOgHgHQgGgIgLABQgJgBgIAIg");
	this.shape_35.setTransform(331.975,245.2);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AAXBIIAAhDQAAgKgFgFQgFgGgLAAQgHABgHAEQgGAFgEAGIAABIIgRAAIAAiPIARAAIAAA3QAMgOASAAQAggBAAAkIAABDg");
	this.shape_36.setTransform(321.425,243.05);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AA2A0IAAhCQAAgLgFgGQgFgFgMAAQgJAAgGAFQgHAHgBAKIAABCIgQAAIAAhCQAAgWgXAAQgQAAgHAOIAABKIgRAAIAAhlIAQAAIABALQALgNATAAQAVAAAHARQAFgIAJgFQAHgEALAAQAiAAABAkIAABDg");
	this.shape_37.setTransform(706.8,217.1);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AggAtQgJgJAAgOQAAgPAMgIQAMgJAVAAIARAAIAAgIQAAgJgGgGQgFgFgKAAQgJAAgGAFQgHAFAAAGIgRAAQAAgHAGgHQAEgIAKgEQAKgEAKAAQARAAAKAJQAKAJABAPIAAAuQgBAOAEAIIAAACIgTAAQgBgDgBgIQgMANgQAAQgPAAgKgIgAgYAUQAAAJAFAEQAGAEAIAAQAIABAIgEQAGgFAEgHIAAgVIgOAAQgfABAAASg");
	this.shape_38.setTransform(693.1,217.2);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgIBJIAAiQIARAAIAACQg");
	this.shape_39.setTransform(685.475,215.05);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AggAtQgJgJAAgOQAAgPAMgIQAMgJAVAAIARAAIAAgIQAAgJgGgGQgFgFgKAAQgJAAgGAFQgHAFAAAGIgRAAQAAgHAGgHQAEgIAKgEQAKgEAKAAQARAAAKAJQAKAJAAAPIAAAuQABAOADAIIAAACIgTAAQgBgDgBgIQgMANgQAAQgPAAgKgIgAgYAUQAAAJAGAEQAFAEAIAAQAIABAIgEQAGgFAEgHIAAgVIgNAAQggABAAASg");
	this.shape_40.setTransform(677.9,217.2);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgfA7QgLgOAAgYIAAgCQAAgWALgOQALgPASAAQARAAAKANIAAg1IASAAIAACQIgQAAIgBgLQgLANgRgBQgSAAgLgOgAgRgHQgIAJABATQgBASAIAKQAGAKANAAQAQAAAHgPIAAguQgHgPgQAAQgNAAgGAKg");
	this.shape_41.setTransform(667,215.15);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgVBDQgKgEgGgIIAJgLQALAOAQAAQAMAAAHgHQAHgHAAgOIAAgIQgKAMgRAAQgSAAgLgPQgLgOAAgYQAAgYALgOQALgOASAAQASAAAKANIABgLIAQAAIAABiQAAAVgMALQgLALgUAAQgKAAgLgFgAgRguQgIAKAAATQAAARAHAKQAHAJAMAAQARAAAHgPIAAguQgIgOgQAAQgLAAgHAKg");
	this.shape_42.setTransform(651.375,219.1);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AAXA0IAAhCQAAgMgFgFQgFgFgLAAQgHAAgHAEQgGAFgEAHIAABIIgRAAIAAhlIAQAAIABANQAMgPASAAQAgAAAAAlIAABCg");
	this.shape_43.setTransform(640.775,217.1);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgeArQgJgKAAgSIAAhCIASAAIAABBQAAAXASAAQATAAAHgPIAAhJIARAAIAABlIgQAAIgBgKQgKAMgTAAQgQAAgIgJg");
	this.shape_44.setTransform(630.15,217.3);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgfA7QgLgOAAgYIAAgCQAAgWALgOQALgPASAAQARAAAKANIAAg1IASAAIAACQIgQAAIgBgLQgLANgRgBQgSAAgLgOgAgSgHQgGAJAAATQAAASAGAKQAIAKAMAAQAQAAAHgPIAAguQgHgPgQAAQgMAAgIAKg");
	this.shape_45.setTransform(619.2,215.15);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AAXA0IAAhCQAAgMgFgFQgFgFgLAAQgHAAgHAEQgGAFgEAHIAABIIgRAAIAAhlIAQAAIABANQAMgPASAAQAgAAAAAlIAABCg");
	this.shape_46.setTransform(608.625,217.1);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgfAtQgKgJAAgOQAAgPAMgIQAMgJAVAAIARAAIAAgIQAAgJgGgGQgFgFgKAAQgJAAgGAFQgHAFAAAGIgRAAQAAgHAGgHQAEgIAKgEQAJgEALAAQARAAAKAJQAKAJABAPIAAAuQgBAOAEAIIAAACIgTAAQgBgDgBgIQgMANgQAAQgPAAgJgIgAgYAUQAAAJAFAEQAGAEAJAAQAHABAIgEQAGgFAEgHIAAgVIgOAAQgfABAAASg");
	this.shape_47.setTransform(598.05,217.2);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AAVBJIgigvIgLAKIAAAlIgRAAIAAiQIARAAIAABXIAJgMIAgggIAUAAIgmApIArA8g");
	this.shape_48.setTransform(588.55,215.05);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgYA0IAAhlIARAAIABALQAHgNAQAAQAFAAADABIAAARIgJgBQgQAAgGAOIAABIg");
	this.shape_49.setTransform(580.275,217.1);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgdAnQgNgOAAgWIAAgDQAAgOAFgMQAGgMALgHQAKgHALAAQAUAAALANQALAOAAAYIAAAGIhEAAQAAAPAJAJQAIAKAMgBQAJAAAHgDQAGgEAFgGIALAIQgNAUgaAAQgTAAgNgOgAgQgeQgHAIgBAOIAyAAIAAgBQgBgOgHgHQgGgIgLABQgJgBgIAIg");
	this.shape_50.setTransform(571.475,217.2);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgCA5QgGgHAAgNIAAg+IgTAAIAAgOIATAAIAAgYIAQAAIAAAYIATAAIAAAOIgTAAIAAA+QAAAGADADQACADAGAAIAJgBIAAAOQgHACgHAAQgLAAgFgHg");
	this.shape_51.setTransform(562.775,216.075);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgVBDQgKgEgGgIIAJgLQALAOAQAAQAMAAAHgHQAHgHAAgOIAAgIQgKAMgRAAQgSAAgLgPQgLgOAAgYQAAgYALgOQALgOASAAQASAAAKANIABgLIAQAAIAABiQAAAVgMALQgLALgUAAQgKAAgLgFgAgRguQgIAKAAATQAAARAHAKQAHAJAMAAQARAAAHgPIAAguQgIgOgQAAQgLAAgHAKg");
	this.shape_52.setTransform(549.475,219.1);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AAXA0IAAhCQAAgMgFgFQgFgFgLAAQgHAAgHAEQgGAFgEAHIAABIIgRAAIAAhlIAQAAIABANQAMgPASAAQAgAAAAAlIAABCg");
	this.shape_53.setTransform(538.925,217.1);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AggAtQgJgJAAgOQAAgPAMgIQAMgJAVAAIARAAIAAgIQAAgJgFgGQgGgFgKAAQgJAAgHAFQgFAFAAAGIgSAAQAAgHAFgHQAGgIAJgEQAJgEAKAAQASAAAKAJQAKAJAAAPIAAAuQAAAOAEAIIAAACIgSAAQgCgDgBgIQgMANgQAAQgPAAgKgIgAgYAUQAAAJAGAEQAFAEAIAAQAIABAHgEQAIgFADgHIAAgVIgNAAQggABAAASg");
	this.shape_54.setTransform(528.35,217.2);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgeBIIgHgCIAAgOIAFABQAJgBAFgDQAFgDADgLIAEgJIgkhkIATAAIAYBLIAYhLIASAAIgoB0QgJAagVAAg");
	this.shape_55.setTransform(518.5,219.25);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgCA5QgGgHAAgNIAAg+IgTAAIAAgOIATAAIAAgYIAQAAIAAAYIATAAIAAAOIgTAAIAAA+QAAAGADADQACADAGAAIAJgBIAAAOQgHACgHAAQgLAAgFgHg");
	this.shape_56.setTransform(505.725,216.075);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgfAtQgKgJAAgOQAAgPAMgIQAMgJAVAAIARAAIAAgIQAAgJgGgGQgFgFgKAAQgJAAgGAFQgHAFABAGIgSAAQAAgHAGgHQAEgIAKgEQAKgEAJAAQASAAAKAJQAKAJABAPIAAAuQgBAOAEAIIAAACIgTAAQgBgDgBgIQgMANgQAAQgPAAgJgIgAgYAUQAAAJAFAEQAGAEAJAAQAHABAIgEQAGgFAEgHIAAgVIgOAAQgfABAAASg");
	this.shape_57.setTransform(497.6,217.2);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgoAzIAAgNIA4hJIg3AAIAAgPIBMAAIAAANIg3BKIA6AAIAAAOg");
	this.shape_58.setTransform(487.65,217.2);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AAXA0IAAhCQAAgMgFgFQgFgFgLAAQgHAAgHAEQgGAFgEAHIAABIIgRAAIAAhlIAQAAIABANQAMgPASAAQAgAAAAAlIAABCg");
	this.shape_59.setTransform(472.625,217.1);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgfAtQgKgJAAgOQAAgPAMgIQAMgJAVAAIARAAIAAgIQAAgJgGgGQgFgFgKAAQgJAAgGAFQgHAFABAGIgSAAQAAgHAGgHQAEgIAKgEQAKgEAJAAQASAAAKAJQAKAJABAPIAAAuQgBAOAEAIIAAACIgTAAQgBgDgBgIQgMANgQAAQgPAAgJgIgAgYAUQAAAJAFAEQAGAEAJAAQAHABAIgEQAGgFAEgHIAAgVIgOAAQgfABAAASg");
	this.shape_60.setTransform(462.05,217.2);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgfA7QgLgOAAgYIAAgCQAAgWALgOQALgPASAAQARAAAKANIAAg1IASAAIAACQIgQAAIgBgLQgKANgSgBQgSAAgLgOgAgSgHQgGAJgBATQABASAGAKQAIAKALAAQARAAAHgPIAAguQgHgPgRAAQgLAAgIAKg");
	this.shape_61.setTransform(451.15,215.15);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AAXBJIAAhEQAAgKgFgFQgFgGgLAAQgHABgHAEQgGAEgEAHIAABJIgRAAIAAiQIARAAIAAA3QAMgPASAAQAgAAAAAkIAABEg");
	this.shape_62.setTransform(435.875,215.05);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgfArQgIgKAAgSIAAhCIARAAIAABBQABAXASAAQATAAAGgPIAAhJIASAAIAABlIgQAAIgBgKQgKAMgTAAQgQAAgJgJg");
	this.shape_63.setTransform(425.2,217.3);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgZA8IgBAMIgQAAIAAiQIARAAIAAA2QALgOASAAQASAAALAPQAKANAAAYIAAABQAAAYgKAOQgLAOgSAAQgTABgKgOgAgZAAIAAArQAIAQARAAQAMAAAHgKQAHgKAAgUQAAgRgHgJQgHgKgMAAQgRABgIAQg");
	this.shape_64.setTransform(414.675,215.15);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgfArQgIgKAAgSIAAhCIARAAIAABBQAAAXATAAQATAAAGgPIAAhJIASAAIAABlIgRAAIAAgKQgKAMgSAAQgRAAgJgJg");
	this.shape_65.setTransform(403.75,217.3);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgCA5QgGgHAAgNIAAg+IgTAAIAAgOIATAAIAAgYIAQAAIAAAYIATAAIAAAOIgTAAIAAA+QAAAGADADQACADAGAAIAJgBIAAAOQgHACgHAAQgLAAgFgHg");
	this.shape_66.setTransform(394.975,216.075);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AAXA0IAAhCQAAgMgFgFQgFgFgLAAQgHAAgHAEQgGAFgEAHIAABIIgRAAIAAhlIAQAAIABANQAMgPASAAQAgAAAAAlIAABCg");
	this.shape_67.setTransform(381.975,217.1);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgfAtQgKgJAAgOQAAgPAMgIQAMgJAVAAIARAAIAAgIQAAgJgFgGQgGgFgKAAQgJAAgHAFQgFAFAAAGIgSAAQAAgHAFgHQAGgIAJgEQAJgEAKAAQASAAAKAJQAKAJAAAPIAAAuQAAAOAEAIIAAACIgSAAQgCgDgBgIQgMANgQAAQgPAAgJgIgAgYAUQAAAJAFAEQAGAEAJAAQAHABAHgEQAIgFADgHIAAgVIgOAAQgfABAAASg");
	this.shape_68.setTransform(371.4,217.2);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgIBGIAAhlIAQAAIAABlgAgHg0QgCgDAAgDQAAgFACgDQADgCAEAAQAFAAADACQACADAAAFQAAADgCADQgDAEgFAAQgEAAgDgEg");
	this.shape_69.setTransform(363.825,215.35);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgVBDQgKgEgGgIIAJgLQALAOAQAAQAMAAAHgHQAHgHAAgOIAAgIQgKAMgRAAQgSAAgLgPQgLgOAAgYQAAgYALgOQALgOASAAQASAAAKANIABgLIAQAAIAABiQAAAVgMALQgLALgUAAQgKAAgLgFgAgRguQgIAKAAATQAAARAHAKQAHAJAMAAQARAAAHgPIAAguQgIgOgQAAQgLAAgHAKg");
	this.shape_70.setTransform(355.775,219.1);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgfAtQgKgJAAgOQAAgPAMgIQAMgJAVAAIARAAIAAgIQAAgJgFgGQgGgFgKAAQgJAAgHAFQgFAFAAAGIgSAAQAAgHAFgHQAGgIAJgEQAJgEAKAAQASAAAKAJQAKAJAAAPIAAAuQAAAOAEAIIAAACIgSAAQgCgDgBgIQgMANgQAAQgPAAgJgIgAgYAUQAAAJAGAEQAFAEAJAAQAHABAHgEQAIgFADgHIAAgVIgOAAQgfABAAASg");
	this.shape_71.setTransform(345.3,217.2);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgZA8IgBAMIgQAAIAAiQIARAAIAAA2QALgOASAAQASAAALAPQAKANAAAYIAAABQAAAYgKAOQgLAOgSAAQgTABgKgOgAgZAAIAAArQAIAQARAAQAMAAAHgKQAHgKAAgUQAAgRgHgJQgHgKgMAAQgRABgIAQg");
	this.shape_72.setTransform(334.825,215.15);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AAXA0IAAhCQAAgMgFgFQgFgFgLAAQgHAAgHAEQgGAFgEAHIAABIIgRAAIAAhlIAQAAIABANQAMgPASAAQAgAAAAAlIAABCg");
	this.shape_73.setTransform(319.075,217.1);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgfAtQgKgJAAgOQAAgPAMgIQAMgJAVAAIARAAIAAgIQAAgJgGgGQgFgFgKAAQgJAAgHAFQgFAFAAAGIgSAAQAAgHAFgHQAGgIAJgEQAKgEAJAAQASAAAKAJQAKAJABAPIAAAuQAAAOADAIIAAACIgSAAQgCgDgBgIQgMANgQAAQgPAAgJgIgAgYAUQAAAJAFAEQAGAEAJAAQAHABAHgEQAIgFADgHIAAgVIgOAAQgfABAAASg");
	this.shape_74.setTransform(308.5,217.2);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AAVBJIgigvIgLAKIAAAlIgRAAIAAiQIARAAIAABXIAJgMIAgggIAVAAIgnApIArA8g");
	this.shape_75.setTransform(299,215.05);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AggAmQgNgOgBgXIAAgBQAAgPAHgMQAFgMALgGQALgHAMAAQAUAAANAPQAOAOAAAXIAAABQAAAPgGAMQgGALgLAHQgKAHgOAAQgUAAgMgPgAgUgbQgIAKAAASQAAARAIALQAIAKAMgBQAOABAHgKQAIgLAAgSQAAgQgIgLQgIgLgNABQgMAAgIAKg");
	this.shape_76.setTransform(287.9,217.2);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgdAnQgNgOAAgYIAAgCQAAgPAFgLQAGgMALgGQAKgHANAAQAQAAAMAKQAMAKAAARIgRAAQAAgKgHgGQgHgHgJABQgNgBgHAKQgIAJAAATIAAACQAAASAIAJQAHAJANAAQAJAAAHgFQAHgFAAgJIARAAQgBAIgFAJQgGAHgIAFQgKAFgKAAQgUAAgMgOg");
	this.shape_77.setTransform(277.45,217.2);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AggAmQgNgOgBgXIAAgBQAAgPAHgMQAFgMALgGQALgHAMAAQAUAAANAPQAOAOAAAXIAAABQAAAPgGAMQgGALgLAHQgKAHgOAAQgUAAgMgPgAgUgbQgIAKAAASQAAARAIALQAIAKAMgBQAOABAHgKQAIgLAAgSQAAgQgIgLQgIgLgNABQgMAAgIAKg");
	this.shape_78.setTransform(266.75,217.2);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AglA1QgPgSAAgdIAAgMQAAgTAHgOQAHgPAMgIQANgIAPABQAXAAAMAMQAOAMACAWIgSAAQgDgRgHgIQgJgHgOAAQgQAAgKANQgKANAAAYIAAAMQAAAWAKANQAJAOAQAAQAPAAAIgHQAIgHADgRIASAAQgCAVgOANQgOAMgWgBQgYAAgOgRg");
	this.shape_79.setTransform(255.1,215.45);

	this.judulKI = new lib.bg1();
	this.judulKI.name = "judulKI";
	this.judulKI.setTransform(505,229.9,1.3177,1.0527,0,0,0,0.8,0.8);
	this.judulKI.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);

	this.pieces = new lib.Pieces10();
	this.pieces.name = "pieces";
	this.pieces.setTransform(-23.2,65.2);

	this.slots = new lib.Slots10();
	this.slots.name = "slots";
	this.slots.setTransform(-6.95,65.35);

	this.Score = new cjs.Text("score", "18px 'Roboto'", "#FFFFFF");
	this.Score.name = "Score";
	this.Score.textAlign = "center";
	this.Score.lineHeight = 26;
	this.Score.lineWidth = 46;
	this.Score.parent = this;
	this.Score.setTransform(859.343,25.15,1.9238,1.9238);

	this.judulKI_1 = new lib.bg1copy();
	this.judulKI_1.name = "judulKI_1";
	this.judulKI_1.setTransform(867.8,38,0.4108,0.8628,0,0,0,0.4,0.4);
	this.judulKI_1.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);

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

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AAFATIAAglIALAAIAAAKIgCAbgAgPATIAAglIALAAIAAAKIgCAbg");
	this.shape_80.setTransform(624.45,114.025);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgGAGQgCgCAAgEQAAgDACgCQACgDAEAAQAEAAADADQACACAAADQAAAEgCACQgDADgEAAQgEAAgCgDg");
	this.shape_81.setTransform(619.625,123.325);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgHAAgFAEQgGAEAAAFIgOAAQAAgGAEgGQAFgGAIgDQAHgEAIAAQAPAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgDgJQgJALgNAAQgNAAgIgHgAgUARQABAHAEADQAEAEAIAAQAFAAAGgDQAHgEACgFIAAgSIgLAAQgZAAgBAQg");
	this.shape_82.setTransform(613.25,119.875);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgZA7IgFgBIAAgMIAEABQAHAAAEgDQAEgDADgIIADgJIgehSIAQAAIAUA+IAUg+IAPAAIgiBgQgHAVgRAAg");
	this.shape_83.setTransform(605.125,121.575);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_84.setTransform(596.925,119.8);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_85.setTransform(588.075,119.8);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQAAgHgEgFQgEgEgJAAQgHAAgFAEQgGAEAAAFIgPAAQABgGAFgGQAEgGAHgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgNAAQgMAAgIgHgAgTARQAAAHAEADQAEAEAIAAQAGAAAFgDQAHgEACgFIAAgSIgLAAQgaAAABAQg");
	this.shape_86.setTransform(579.3,119.875);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AgjA7IAAh0IANAAIABAKQAJgLAPAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgPAAgIgJIAAAogAgUgiIAAAnQAGAMANAAQAKAAAGgJQAGgIAAgPQAAgPgGgIQgGgIgKAAQgNAAgGAMg");
	this.shape_87.setTransform(570.625,121.425);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgIAAgFAEQgEAEgBAFIgOAAQAAgGAEgGQAFgGAIgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgDgJQgJALgNAAQgNAAgIgHgAgUARQABAHAEADQAEAEAHAAQAHAAAFgDQAHgEACgFIAAgSIgLAAQgZAAgBAQg");
	this.shape_88.setTransform(561.6,119.875);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AASA8IgdgnIgIAJIAAAeIgPAAIAAh3IAPAAIAABHIAHgJIAagaIARAAIggAiIAkAxg");
	this.shape_89.setTransform(553.75,118.1);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AgRA4QgJgEgEgHIAHgJQAJAMAOAAQAJAAAGgGQAGgGAAgLIAAgHQgJAKgOAAQgOAAgKgMQgJgMAAgUQAAgTAJgMQAKgMAPAAQAOAAAJALIAAgJIAOAAIAABRQAAARgKAJQgKAKgQAAQgIAAgJgEgAgOgmQgGAIAAAQQAAAOAGAHQAGAJAJAAQAOAAAGgNIAAglQgHgNgNAAQgJAAgGAJg");
	this.shape_90.setTransform(544.475,121.475);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_91.setTransform(535.725,119.8);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgIAAgFAEQgEAEgBAFIgOAAQAAgGAEgGQAFgGAIgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgDgJQgJALgNAAQgNAAgIgHgAgUARQABAHAEADQAFAEAGAAQAHAAAFgDQAHgEACgFIAAgSIgLAAQgaAAAAAQg");
	this.shape_92.setTransform(526.95,119.875);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgBAvQgGgFAAgLIAAg0IgPAAIAAgLIAPAAIAAgUIAOAAIAAAUIAQAAIAAALIgQAAIAAA0QAAAFACACQADADAFAAIAGgBIAAAMIgLABQgKAAgDgGg");
	this.shape_93.setTransform(519.7,118.925);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AgGA8IAAh3IANAAIAAB3g");
	this.shape_94.setTransform(511.425,118.1);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AgHA6IAAhUIAOAAIAABUgAgGgqQgBgDAAgDQAAgEABgCQADgDADAAQAFAAACADQACACAAAEQAAADgCADQgCACgFAAQgDAAgDgCg");
	this.shape_95.setTransform(507.55,118.325);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgQAoQgHgDgFgHQgFgGAAgIIAPAAQAAAIAGAEQAFAEAIAAQAIAAAFgDQAFgEAAgFQAAgGgEgDQgEgEgLgCQgLgCgGgDQgHgDgDgEQgCgFAAgGQAAgKAIgIQAJgHAMAAQAPAAAJAIQAJAHAAAMIgPAAQAAgGgEgFQgGgEgIAAQgGAAgFADQgEAEAAAFQAAAGAEACQAEADAKACQALADAGADQAHADAEAEQADAFAAAHQAAALgJAHQgKAHgOAAQgJAAgIgEg");
	this.shape_96.setTransform(501.45,119.875);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgHAAgFAEQgGAEAAAFIgOAAQAAgGAEgGQAEgGAIgDQAIgEAIAAQAPAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgMAAQgNAAgIgHgAgUARQABAHAEADQAEAEAIAAQAFAAAGgDQAHgEACgFIAAgSIgLAAQgaAAAAAQg");
	this.shape_97.setTransform(493,119.875);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AATA8IAAg4QAAgIgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAFIAAA8IgOAAIAAh3IAOAAIAAAtQAKgLAOAAQAbAAAAAdIAAA4g");
	this.shape_98.setTransform(484.275,118.1);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AgGA6IAAhUIANAAIAABUgAgFgqQgCgDAAgDQAAgEACgCQACgDADAAQAEAAACADQACACABAEQgBADgCADQgCACgEAAQgDAAgCgCg");
	this.shape_99.setTransform(473.95,118.325);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AgTArIAAhTIANAAIAAAJQAHgLANAAIAGABIAAANIgHAAQgNAAgFAMIAAA7g");
	this.shape_100.setTransform(469.75,119.8);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIAOAAIAAgHQAAgHgFgFQgFgEgIAAQgIAAgFAEQgEAEAAAFIgPAAQAAgGAEgGQAFgGAIgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgCgJQgKALgNAAQgNAAgIgHgAgUARQAAAHAFADQAFAEAGAAQAHAAAGgDQAFgEAEgFIAAgSIgMAAQgaAAAAAQg");
	this.shape_101.setTransform(462.25,119.875);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AgaAxQgJgMAAgUIAAgBQAAgSAJgMQAKgMAPAAQANAAAJAKIAAgsIAPAAIAAB3IgOAAIAAgJQgJALgPAAQgOAAgKgMgAgOgFQgGAHAAAQQAAAOAGAIQAGAJAJAAQAOAAAGgNIAAgmQgGgMgOAAQgJAAgGAJg");
	this.shape_102.setTransform(453.225,118.175);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_103.setTransform(440.525,119.8);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQAAgHgFgFQgFgEgIAAQgHAAgGAEQgEAEAAAFIgQAAQAAgGAGgGQADgGAJgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgCgJQgLALgMAAQgNAAgIgHgAgUARQAAAHAFADQAFAEAGAAQAHAAAGgDQAFgEAEgFIAAgSIgMAAQgaAAAAAQg");
	this.shape_104.setTransform(431.75,119.875);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_105.setTransform(422.975,119.8);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQAAgHgFgFQgFgEgIAAQgHAAgGAEQgEAEAAAFIgPAAQgBgGAGgGQADgGAJgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgCgJQgLALgNAAQgMAAgIgHgAgUARQAAAHAFADQAFAEAGAAQAGAAAHgDQAFgEAEgFIAAgSIgMAAQgaAAAAAQg");
	this.shape_106.setTransform(414.2,119.875);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AASA8IgdgnIgJAJIAAAeIgOAAIAAh3IAOAAIAABHIAIgJIAZgaIASAAIggAiIAkAxg");
	this.shape_107.setTransform(406.35,118.1);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAOAAIAAgHQAAgHgEgFQgEgEgJAAQgIAAgEAEQgGAEAAAFIgPAAQABgGAFgGQAEgGAHgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgNAAQgMAAgIgHgAgTARQgBAHAFADQAEAEAIAAQAGAAAGgDQAFgEADgFIAAgSIgLAAQgaAAABAQg");
	this.shape_108.setTransform(397.4,119.875);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AAtArIAAg3QAAgJgEgEQgFgFgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg3QAAgSgSAAQgPAAgFANIAAA8IgOAAIAAhTIANAAIABAJQAJgLAQAAQARAAAGANQAEgFAHgFQAHgDAJAAQAcAAAAAdIAAA4g");
	this.shape_109.setTransform(386.075,119.8);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AgBAvQgGgFAAgLIAAg0IgPAAIAAgLIAPAAIAAgUIAOAAIAAAUIAQAAIAAALIgQAAIAAA0QAAAFACACQADADAFAAIAGgBIAAAMIgLABQgKAAgDgGg");
	this.shape_110.setTransform(372.2,118.925);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIAOAAIAAgHQAAgHgFgFQgFgEgIAAQgIAAgFAEQgEAEAAAFIgPAAQAAgGAEgGQAFgGAIgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgCgJQgKALgNAAQgNAAgIgHgAgUARQAAAHAFADQAFAEAGAAQAHAAAGgDQAFgEAEgFIAAgSIgMAAQgaAAAAAQg");
	this.shape_111.setTransform(365.5,119.875);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AgZAjQgHgHAAgQIAAg2IAOAAIAAA2QAAATAQAAQAQAAAFgNIAAg8IAOAAIAABUIgNAAIgBgJQgIAKgPAAQgOAAgHgIg");
	this.shape_112.setTransform(356.725,119.95);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AgVAxIgBAKIgNAAIAAh3IAPAAIAAAtQAIgLAPAAQAPAAAJAMQAJALAAAUIAAABQAAATgJAMQgJAMgPAAQgPAAgJgMgAgUAAIAAAjQAGAOAOAAQAKAAAGgIQAFgJAAgQQAAgOgFgIQgGgIgKAAQgOAAgGAOg");
	this.shape_113.setTransform(348.025,118.175);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AAtArIAAg3QAAgJgEgEQgFgFgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg3QAAgSgSAAQgPAAgFANIAAA8IgOAAIAAhTIANAAIABAJQAJgLAQAAQARAAAGANQAEgFAHgFQAHgDAJAAQAcAAAAAdIAAA4g");
	this.shape_114.setTransform(336.375,119.8);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_115.setTransform(325.175,119.875);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AAtArIAAg3QAAgJgEgEQgFgFgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg3QAAgSgSAAQgPAAgFANIAAA8IgOAAIAAhTIANAAIABAJQAJgLAQAAQARAAAGANQAEgFAHgFQAHgDAJAAQAcAAAAAdIAAA4g");
	this.shape_116.setTransform(313.875,119.8);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AASA8IgcgnIgJAJIAAAeIgPAAIAAh3IAPAAIAABHIAHgJIAZgbIASAAIggAjIAkAxg");
	this.shape_117.setTransform(780.6,94.9);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AgZAjQgHgIAAgPIAAg2IAOAAIAAA2QAAATAQAAQAQAAAFgMIAAg9IAOAAIAABTIgNAAIgBgIQgIAKgPAAQgOAAgHgIg");
	this.shape_118.setTransform(771.575,96.75);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AgCAvQgEgFAAgLIAAg0IgQAAIAAgLIAQAAIAAgUIANAAIAAAUIAQAAIAAALIgQAAIAAA0QAAAFACACQACADAGAAIAGgBIAAAMIgLABQgJAAgFgGg");
	this.shape_119.setTransform(764.3,95.725);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_120.setTransform(757.525,96.6);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AgZAjQgHgIAAgPIAAg2IAOAAIAAA2QAAATAQAAQAQAAAFgMIAAg9IAOAAIAABTIgNAAIgBgIQgIAKgPAAQgOAAgHgIg");
	this.shape_121.setTransform(748.675,96.75);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgHAAgFAEQgGAEAAAFIgOAAQAAgGAEgGQAEgGAIgDQAIgEAIAAQAPAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgMAAQgNAAgIgHgAgTARQAAAHAEADQAEAEAIAAQAFAAAGgDQAHgEACgFIAAgSIgLAAQgaAAABAQg");
	this.shape_122.setTransform(736,96.675);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AgZA7IgFgBIAAgMIAEABQAHAAAEgDQAEgDADgIIADgJIgehSIAQAAIAUA+IAUg+IAPAAIgiBgQgHAVgRAAg");
	this.shape_123.setTransform(727.875,98.375);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_124.setTransform(719.675,96.6);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AgHA6IAAhUIAOAAIAABUgAgGgqQgCgDAAgDQAAgEACgCQADgDADAAQAFAAACADQABACAAAEQAAADgBADQgCACgFAAQgDAAgDgCg");
	this.shape_125.setTransform(713.3,95.125);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AgUArIAAhUIAPAAIAAAKQAGgLANAAIAHABIAAAOIgIgBQgNAAgFAMIAAA7g");
	this.shape_126.setTransform(709.1,96.6);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AgBAvQgFgFgBgLIAAg0IgPAAIAAgLIAPAAIAAgUIAOAAIAAAUIAQAAIAAALIgQAAIAAA0QAAAFACACQADADAFAAIAGgBIAAAMIgLABQgKAAgDgGg");
	this.shape_127.setTransform(703.05,95.725);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AgQAoQgHgDgFgHQgEgGgBgIIAPAAQAAAIAFAEQAGAEAIAAQAIAAAFgDQAFgEAAgFQAAgGgEgDQgEgEgLgCQgKgCgHgDQgGgDgDgEQgDgFAAgGQgBgKAJgIQAJgHAMAAQAPAAAJAIQAJAHAAAMIgPAAQABgGgGgFQgFgEgIAAQgHAAgEADQgEAEAAAFQAAAGAEACQAEADAKACQALADAGADQAHADADAEQAEAFAAAHQgBALgIAHQgJAHgPAAQgJAAgIgEg");
	this.shape_128.setTransform(696.55,96.675);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AgGA6IAAhUIANAAIAABUgAgGgqQgBgDAAgDQAAgEABgCQADgDADAAQAFAAABADQADACAAAEQAAADgDADQgBACgFAAQgDAAgDgCg");
	this.shape_129.setTransform(690.5,95.125);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQgBgHgEgFQgFgEgIAAQgHAAgGAEQgEAEAAAFIgQAAQAAgGAGgGQADgGAIgDQAIgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgCgJQgLALgNAAQgMAAgIgHgAgTARQgBAHAFADQAFAEAGAAQAGAAAHgDQAGgEADgFIAAgSIgMAAQgZAAAAAQg");
	this.shape_130.setTransform(680.25,96.675);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AgCAvQgEgFgBgLIAAg0IgPAAIAAgLIAPAAIAAgUIAOAAIAAAUIAQAAIAAALIgQAAIAAA0QAAAFACACQADADAEAAIAHgBIAAAMIgLABQgKAAgEgGg");
	this.shape_131.setTransform(673,95.725);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_132.setTransform(666.225,96.6);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AgHA6IAAhUIAOAAIAABUgAgGgqQgCgDAAgDQAAgEACgCQADgDADAAQAFAAACADQABACAAAEQAAADgBADQgCACgFAAQgDAAgDgCg");
	this.shape_133.setTransform(659.85,95.125);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("AAtArIAAg3QAAgJgEgEQgFgFgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg3QAAgSgSAAQgPAAgFANIAAA8IgOAAIAAhUIANAAIABAKQAJgLAQAAQARAAAGAOQAEgGAHgFQAHgDAJAAQAcAAAAAdIAAA4g");
	this.shape_134.setTransform(650.925,96.6);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_135.setTransform(639.725,96.675);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("AAtArIAAg3QAAgJgEgEQgFgFgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg3QAAgSgSAAQgPAAgFANIAAA8IgOAAIAAhUIANAAIABAKQAJgLAQAAQARAAAGAOQAEgGAHgFQAHgDAJAAQAcAAAAAdIAAA4g");
	this.shape_136.setTransform(628.425,96.6);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_137.setTransform(613.025,96.6);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgHAAgFAEQgGAEAAAFIgOAAQAAgGAEgGQAFgGAIgDQAHgEAIAAQAPAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgDgJQgJALgNAAQgNAAgIgHgAgUARQABAHAEADQAEAEAIAAQAFAAAGgDQAHgEACgFIAAgSIgLAAQgZAAgBAQg");
	this.shape_138.setTransform(604.25,96.675);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("AgZA7IgFgBIAAgMIAEABQAHAAAEgDQAEgDADgIIADgJIgehSIAQAAIAUA+IAUg+IAPAAIgiBgQgHAVgRAAg");
	this.shape_139.setTransform(596.125,98.375);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQgBgHgEgFQgFgEgIAAQgHAAgGAEQgEAEAAAFIgQAAQAAgGAGgGQADgGAIgDQAIgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgCgJQgLALgNAAQgMAAgIgHgAgTARQgBAHAFADQAFAEAGAAQAGAAAHgDQAFgEAEgFIAAgSIgMAAQgZAAAAAQg");
	this.shape_140.setTransform(588,96.675);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("AgGA8IAAh3IANAAIAAB3g");
	this.shape_141.setTransform(581.675,94.9);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_142.setTransform(575.575,96.675);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_143.setTransform(566.825,96.6);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("AASA8IgdgnIgJAJIAAAeIgOAAIAAh3IAOAAIAABHIAIgJIAZgbIASAAIggAjIAkAxg");
	this.shape_144.setTransform(554.95,94.9);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQAAgHgEgFQgEgEgJAAQgHAAgFAEQgGAEAAAFIgPAAQABgGAEgGQAFgGAHgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgNAAQgMAAgIgHgAgTARQAAAHAEADQAEAEAIAAQAGAAAFgDQAHgEACgFIAAgSIgLAAQgaAAABAQg");
	this.shape_145.setTransform(546,96.675);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFFF").s().p("AgjA7IAAh0IANAAIABAKQAJgLAPAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgPAAgIgJIAAAogAgUgiIAAAnQAGAMANAAQAKAAAGgJQAGgIAAgPQAAgPgGgIQgGgIgKAAQgNAAgGAMg");
	this.shape_146.setTransform(537.325,98.225);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgFgEgIAAQgIAAgEAEQgFAEgBAFIgOAAQAAgGAEgGQAFgGAIgDQAHgEAJAAQAOAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgPAAIgDgJQgJALgNAAQgNAAgIgHgAgUARQABAHAEADQAEAEAHAAQAGAAAGgDQAHgEACgFIAAgSIgLAAQgZAAgBAQg");
	this.shape_147.setTransform(528.3,96.675);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFFF").s().p("AgVAxIgBAKIgNAAIAAh3IAPAAIAAAtQAIgLAPAAQAPAAAJAMQAJALAAAUIAAABQAAATgJAMQgJAMgPAAQgPAAgJgMgAgUAAIAAAjQAGAOAOAAQAKAAAGgIQAFgJAAgQQAAgOgFgIQgGgIgKAAQgOAAgGAOg");
	this.shape_148.setTransform(519.625,94.975);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("AgKAOQAHgKABgKIAAgNIANAAIAAALQAAAIgEAHQgEAIgFAFg");
	this.shape_149.setTransform(509.175,101.175);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQgBgHgEgFQgEgEgJAAQgIAAgFAEQgEAEAAAFIgQAAQAAgGAGgGQAEgGAHgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgBgJQgLALgNAAQgMAAgIgHgAgTARQgBAHAFADQAFAEAGAAQAGAAAHgDQAFgEAEgFIAAgSIgMAAQgZAAAAAQg");
	this.shape_150.setTransform(503.5,96.675);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("AgZA7IgFgBIAAgMIAEABQAHAAAEgDQAEgDADgIIADgJIgehSIAQAAIAUA+IAUg+IAPAAIgiBgQgHAVgRAAg");
	this.shape_151.setTransform(495.375,98.375);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_152.setTransform(487.175,96.6);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("AASA8IgdgnIgJAJIAAAeIgOAAIAAh3IAOAAIAABHIAIgJIAagbIARAAIggAjIAkAxg");
	this.shape_153.setTransform(479.25,94.9);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAOAAIAAgHQAAgHgEgFQgEgEgJAAQgIAAgEAEQgGAEAAAFIgPAAQABgGAFgGQAEgGAHgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgNAAQgMAAgIgHgAgTARQgBAHAFADQAEAEAIAAQAGAAAFgDQAGgEADgFIAAgSIgLAAQgaAAABAQg");
	this.shape_154.setTransform(470.3,96.675);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_155.setTransform(461.525,96.6);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQgBgHgEgFQgEgEgJAAQgIAAgEAEQgGAEAAAFIgPAAQABgGAFgGQAEgGAHgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgBgJQgLALgNAAQgMAAgIgHgAgTARQgBAHAFADQAEAEAIAAQAGAAAGgDQAFgEAEgFIAAgSIgMAAQgaAAABAQg");
	this.shape_156.setTransform(452.75,96.675);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("AgCAvQgEgFAAgLIAAg0IgQAAIAAgLIAQAAIAAgUIANAAIAAAUIAQAAIAAALIgQAAIAAA0QAAAFACACQACADAFAAIAHgBIAAAMIgLABQgJAAgFgGg");
	this.shape_157.setTransform(441.55,95.725);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQAAgHgEgFQgEgEgJAAQgHAAgFAEQgGAEAAAFIgPAAQABgGAEgGQAFgGAHgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgNAAQgMAAgIgHgAgTARQAAAHAEADQAEAEAIAAQAGAAAFgDQAHgEACgFIAAgSIgLAAQgaAAABAQg");
	this.shape_158.setTransform(434.85,96.675);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FFFFFF").s().p("AgVAxIgBAKIgNAAIAAh3IAPAAIAAAtQAIgLAPAAQAPAAAJAMQAJALAAAUIAAABQAAATgJAMQgJAMgPAAQgPAAgJgMgAgUAAIAAAjQAGAOAOAAQAKAAAGgIQAFgJAAgQQAAgOgFgIQgGgIgKAAQgOAAgGAOg");
	this.shape_159.setTransform(426.175,94.975);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FFFFFF").s().p("AgaAgQgMgMAAgUIAAAAQABgMAEgKQAFgKAJgFQAJgGAKAAQARAAALAMQALAMAAATIAAABQgBAMgEAKQgFAKgJAFQgJAGgLAAQgQAAgKgMgAgQgWQgHAIAAAPQAAAOAHAJQAGAIAKAAQALAAAHgJQAGgIAAgPQAAgOgGgIQgHgJgLAAQgKAAgGAJg");
	this.shape_160.setTransform(416.9,96.675);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FFFFFF").s().p("AASA8IgdgnIgJAJIAAAeIgOAAIAAh3IAOAAIAABHIAIgJIAZgbIASAAIggAjIAkAxg");
	this.shape_161.setTransform(400.95,94.9);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FFFFFF").s().p("AgZAjQgHgIAAgPIAAg2IAOAAIAAA2QAAATAQAAQAQAAAFgMIAAg9IAOAAIAABTIgNAAIgBgIQgIAKgPAAQgOAAgHgIg");
	this.shape_162.setTransform(391.925,96.75);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FFFFFF").s().p("AgCAvQgEgFAAgLIAAg0IgQAAIAAgLIAQAAIAAgUIANAAIAAAUIAQAAIAAALIgQAAIAAA0QAAAFACACQADADAEAAIAHgBIAAAMIgLABQgJAAgFgGg");
	this.shape_163.setTransform(384.65,95.725);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_164.setTransform(377.875,96.6);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FFFFFF").s().p("AgZAjQgHgIAAgPIAAg2IAOAAIAAA2QAAATAQAAQAQAAAFgMIAAg9IAOAAIAABTIgNAAIgBgIQgIAKgPAAQgOAAgHgIg");
	this.shape_165.setTransform(369.025,96.75);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FFFFFF").s().p("AgRA4QgJgEgEgHIAHgJQAJAMAOAAQAJAAAGgGQAGgGAAgLIAAgHQgJAKgOAAQgOAAgKgMQgJgMAAgUQAAgTAJgMQAKgMAPAAQAOAAAJALIAAgJIAOAAIAABRQAAARgKAJQgKAKgQAAQgIAAgJgEgAgOgmQgGAIAAAQQAAAOAGAHQAGAJAJAAQAOAAAGgNIAAglQgHgNgNAAQgJAAgGAJg");
	this.shape_166.setTransform(356.025,98.275);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_167.setTransform(347.275,96.6);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#FFFFFF").s().p("AgHA6IAAhUIAOAAIAABUgAgFgqQgDgDAAgDQAAgEADgCQACgDADAAQAEAAACADQACACAAAEQAAADgCADQgCACgEAAQgDAAgCgCg");
	this.shape_168.setTransform(340.9,95.125);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FFFFFF").s().p("AgYAgQgLgLAAgUIAAgCQAAgMAFgKQAFgJAIgGQAIgFALAAQAOAAAKAJQAJAIABAOIgOAAQgBgIgFgGQgGgFgIAAQgKAAgGAIQgGAIAAAPIAAACQAAAOAGAIQAGAIAKAAQAIAAAGgFQAFgEABgHIAOAAQgBAHgEAGQgFAHgIAEQgHAEgJAAQgQAAgKgMg");
	this.shape_169.setTransform(334.825,96.675);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQgBgHgEgFQgEgEgJAAQgHAAgGAEQgEAEAAAFIgQAAQAAgGAGgGQAEgGAHgDQAIgEAJAAQAOAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgBgJQgLALgNAAQgMAAgIgHgAgTARQgBAHAFADQAFAEAGAAQAGAAAHgDQAFgEAEgFIAAgSIgMAAQgZAAAAAQg");
	this.shape_170.setTransform(326.2,96.675);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FFFFFF").s().p("AgYAgQgLgLAAgUIAAgCQAAgMAFgKQAFgJAIgGQAIgFALAAQAOAAAKAJQAJAIABAOIgOAAQgBgIgFgGQgGgFgIAAQgKAAgGAIQgGAIAAAPIAAACQAAAOAGAIQAGAIAKAAQAIAAAGgFQAFgEABgHIAOAAQgBAHgEAGQgFAHgIAEQgHAEgJAAQgQAAgKgMg");
	this.shape_171.setTransform(317.725,96.675);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_172.setTransform(305.075,96.6);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQAAgHgFgFQgFgEgIAAQgHAAgGAEQgEAEAAAFIgQAAQAAgGAGgGQADgGAJgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgCgJQgLALgNAAQgMAAgIgHgAgUARQAAAHAFADQAFAEAGAAQAGAAAHgDQAFgEAEgFIAAgSIgMAAQgaAAAAAQg");
	this.shape_173.setTransform(296.3,96.675);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#FFFFFF").s().p("AASA8IgdgnIgJAJIAAAeIgOAAIAAh3IAOAAIAABHIAIgJIAZgbIASAAIggAjIAkAxg");
	this.shape_174.setTransform(288.45,94.9);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#FFFFFF").s().p("AgBAvQgFgFgBgLIAAg0IgPAAIAAgLIAPAAIAAgUIAOAAIAAAUIAQAAIAAALIgQAAIAAA0QAAAFACACQADADAFAAIAGgBIAAAMIgLABQgKAAgDgGg");
	this.shape_175.setTransform(280.95,95.725);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQAAgHgFgFQgFgEgIAAQgHAAgGAEQgEAEAAAFIgQAAQAAgGAGgGQADgGAJgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgCgJQgLALgMAAQgNAAgIgHgAgUARQAAAHAFADQAFAEAGAAQAGAAAHgDQAFgEAEgFIAAgSIgMAAQgaAAAAAQg");
	this.shape_176.setTransform(274.25,96.675);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#FFFFFF").s().p("AgjA7IAAh0IANAAIABAKQAJgLAPAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgPAAgIgJIAAAogAgUgiIAAAnQAGAMANAAQAKAAAGgJQAGgIAAgPQAAgPgGgIQgGgIgKAAQgNAAgGAMg");
	this.shape_177.setTransform(265.575,98.225);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAOAAIAAgHQAAgHgEgFQgEgEgJAAQgIAAgEAEQgGAEAAAFIgPAAQABgGAFgGQAEgGAHgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgNAAQgMAAgIgHgAgTARQgBAHAFADQAEAEAIAAQAGAAAFgDQAGgEADgFIAAgSIgLAAQgaAAABAQg");
	this.shape_178.setTransform(256.55,96.675);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#FFFFFF").s().p("AgaAxQgJgMAAgUIAAgBQAAgSAJgMQAKgMAPAAQANAAAJAKIAAgsIAPAAIAAB3IgOAAIAAgJQgJALgPAAQgOAAgKgMgAgOgFQgGAHAAAQQAAAOAGAIQAGAJAJAAQAOAAAGgNIAAgmQgGgMgOAAQgJAAgGAJg");
	this.shape_179.setTransform(247.525,94.975);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_180.setTransform(238.775,96.6);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#FFFFFF").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_181.setTransform(230.175,96.675);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#FFFFFF").s().p("AAtArIAAg3QAAgJgEgEQgFgFgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg3QAAgSgSAAQgPAAgFANIAAA8IgOAAIAAhUIANAAIABAKQAJgLAQAAQARAAAGAOQAEgGAHgFQAHgDAJAAQAcAAAAAdIAAA4g");
	this.shape_182.setTransform(218.875,96.6);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#FFFFFF").s().p("AATA8IAAg4QAAgIgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAFIAAA8IgOAAIAAh3IAOAAIAAAtQAKgLAOAAQAbAAAAAdIAAA4g");
	this.shape_183.setTransform(203.525,94.9);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgHAAgFAEQgFAEgBAFIgOAAQAAgGAEgGQAFgGAIgDQAHgEAIAAQAPAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgDgJQgJALgNAAQgNAAgIgHgAgUARQABAHAEADQAEAEAIAAQAFAAAGgDQAHgEACgFIAAgSIgLAAQgZAAgBAQg");
	this.shape_184.setTransform(194.75,96.675);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#FFFFFF").s().p("AgGA8IAAh3IANAAIAAB3g");
	this.shape_185.setTransform(188.425,94.9);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#FFFFFF").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_186.setTransform(182.325,96.675);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#FFFFFF").s().p("AgBAvQgGgFAAgLIAAg0IgPAAIAAgLIAPAAIAAgUIAOAAIAAAUIAQAAIAAALIgQAAIAAA0QAAAFACACQADADAFAAIAGgBIAAAMIgLABQgKAAgDgGg");
	this.shape_187.setTransform(175.1,95.725);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#FFFFFF").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_188.setTransform(168.575,96.675);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#FFFFFF").s().p("AgTA2QgKgFgGgHQgFgIAAgKIAPAAQAAAKAHAHQAIAFAMAAQALAAAHgEQAGgFAAgJQAAgIgGgEQgGgFgOgFQgTgFgJgIQgJgHAAgNQAAgNALgIQALgKAQABQALgBAKAFQAJAFAFAIQAFAHAAAKIgPAAQAAgKgHgGQgGgGgMAAQgKAAgGAFQgHAFAAAIQAAAIAGAEQAGAFANAEQAOAEAIAEQAIAFAEAGQAEAHAAAIQAAAOgLAJQgKAHgSABQgLgBgKgEg");
	this.shape_189.setTransform(159.525,95.2);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#FFFFFF").s().p("AAFATIAAglIALAAIAAAKIgCAbgAgPATIAAglIALAAIAAAKIgCAbg");
	this.shape_190.setTransform(152.3,90.825);

	this.instance_2 = new lib.bg10();
	this.instance_2.setTransform(471,324.2,1.1987,1.1979,0,0,0,0,0.1);
	this.instance_2.alpha = 0.1992;

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.bf(img.Bitmap2, null, new cjs.Matrix2D(1,0,0,1,-499,-300)).s().p("EhN9Au4MAAAhdvMCb7AAAMAAABdvg");
	this.shape_191.setTransform(471,266.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_191},{t:this.instance_2},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.btnNextDasar1},{t:this.btnMenuDasar1},{t:this.btnBack3},{t:this.judulKI_1},{t:this.Score},{t:this.slots},{t:this.pieces},{t:this.judulKI},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.btnAnim1},{t:this.restart},{t:this.btnInfo}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(452,236.2,518,439.3);
// library properties:
lib.properties = {
	id: 'E740BB847DF4864B949C99CD86B71105',
	width: 960,
	height: 540,
	fps: 24,
	color: "#34495E",
	opacity: 1.00,
	manifest: [
		{src:"images/_1e.png", id:"_1e"},
		{src:"images/_2e.png", id:"_2e"},
		{src:"images/_4e.png", id:"_4e"},
		{src:"images/_5e.png", id:"_5e"},
		{src:"images/_6edit.png", id:"_6edit"},
		{src:"images/Bitmap2.png", id:"Bitmap2"},
		{src:"images/Bitmap3.png", id:"Bitmap3"},
		{src:"images/Bitmap54.png", id:"Bitmap54"},
		{src:"images/Bitmap55.png", id:"Bitmap55"},
		{src:"images/bookpngcopy.png", id:"bookpngcopy"},
		{src:"images/cucumber1cucumber.png", id:"cucumber1cucumber"},
		{src:"images/_1pngcopy2.png", id:"_1pngcopy2"},
		{src:"images/flash0aiAssets.png", id:"flash0aiAssets"},
		{src:"images/flash0aiAssets_1.png", id:"flash0aiAssets_1"},
		{src:"images/buluBabi_PNG.png", id:"buluBabi_PNG"},
		{src:"images/flash0aiAssets_2.png", id:"flash0aiAssets_2"},
		{src:"images/flash0aiAssets_3.png", id:"flash0aiAssets_3"},
		{src:"images/_3e.png", id:"_3e"},
		{src:"images/platepiring.png", id:"platepiring"},
		{src:"images/flash0aiAssets_4.png", id:"flash0aiAssets_4"},
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