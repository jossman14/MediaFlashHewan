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
p.nominalBounds = new cjs.Rectangle(0,0,962,562);


(lib._1e = function() {
	this.initialize(img._1e);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,562);


(lib._2e11 = function() {
	this.initialize(img._2e11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,562);


(lib._3e11 = function() {
	this.initialize(img._3e11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,562);


(lib._3e1 = function() {
	this.initialize(img._3e1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,561);


(lib._3e = function() {
	this.initialize(img._3e);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,562);


(lib._4e = function() {
	this.initialize(img._4e);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,560);


(lib._5e = function() {
	this.initialize(img._5e);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,560);


(lib._6eEdit = function() {
	this.initialize(img._6eEdit);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,662,386);


(lib._2e1 = function() {
	this.initialize(img._2e1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,561);


(lib._8e = function() {
	this.initialize(img._8e);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,560);


(lib._9pngcopy = function() {
	this.initialize(img._9pngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,560);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);


(lib.Bitmap3 = function() {
	this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,249,87);


(lib.Bitmap42 = function() {
	this.initialize(img.Bitmap42);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,258,173);


(lib.Bitmap43 = function() {
	this.initialize(img.Bitmap43);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,280,173);


(lib.bookpngcopy = function() {
	this.initialize(img.bookpngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,399);


(lib._9 = function() {
	this.initialize(img._9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,560);


(lib.flash0aiAssets = function() {
	this.initialize(img.flash0aiAssets);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,258);


(lib.flash0aiAssets_1 = function() {
	this.initialize(img.flash0aiAssets_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,369,180);


(lib.flash0aiAssets_2 = function() {
	this.initialize(img.flash0aiAssets_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,204,204);


(lib._7e = function() {
	this.initialize(img._7e);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,560);


(lib._2e = function() {
	this.initialize(img._2e);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,962,562);


(lib.flash0aiAssets_3 = function() {
	this.initialize(img.flash0aiAssets_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,153,152);


(lib.flash0aiAssets_4 = function() {
	this.initialize(img.flash0aiAssets_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,153,152);// helper functions:

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



(lib.fd = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._3e11();
	this.instance.setTransform(0,0,1.0024,1.0003);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.fd, new cjs.Rectangle(0,0,664,387.9), null);


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
	this.shape_26.graphics.f("#2C3E50").s().p("AgWBCQgKgEgGgIIALgNQAKAMAQAAQAKAAAGgGQAHgGAAgMIAAgHQgKALgPAAQgSAAgLgOQgLgOAAgYQAAgXALgOQALgOASAAQAQAAAKAMIABgKIAUAAIAABgQAAAUgMALQgMAMgUAAQgLAAgLgFgAgOgrQgHAJAAARQAAAPAHAIQAGAJAKAAQANAAAHgMIAAgrQgHgMgNAAQgKAAgGAJg");
	this.shape_26.setTransform(316.475,18.925);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhkIAWAAIAAAMQAMgNARAAQAfAAABAjIAABCg");
	this.shape_27.setTransform(306.025,16.95);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AghArQgJgIAAgNQAAgQAMgHQALgJAWAAIAOAAIAAgHQAAgHgFgFQgEgFgIAAQgHAAgGAEQgEADAAAHIgXAAQAAgIAFgIQAGgHAKgEQAJgEAKAAQASAAAKAIQALAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgCgKQgLAMgPAAQgPAAgKgJgAgOAHQgFAFAAAHQgBAHAFAEQAEAEAHAAQAGAAAGgEQAGgDADgFIAAgTIgNAAQgLAAgHAEg");
	this.shape_28.setTransform(295.6,17.05);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgrBGIAAiKIAVAAIAAALQALgMAQAAQASAAAKANQALAOAAAYIAAACQAAAWgLAOQgKAOgSAAQgQAAgKgLIAAAvgAgVgoIAAAsQAHAMANAAQALAAAFgJQAHgIAAgRQAAgPgHgJQgFgJgLAAQgNAAgHALg");
	this.shape_29.setTransform(285.3,18.875);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_30.setTransform(277.325,15.125);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgZAzIAAhkIAVAAIABAMQAHgNAOAAIAIABIAAAVIgJAAQgPAAgFAMIAABDg");
	this.shape_31.setTransform(271.975,16.95);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgeAmQgNgNAAgXIAAgCQAAgOAGgMQAGgMAKgGQALgHALAAQAVAAALANQALANAAAYIAAAIIhAAAQABAMAHAIQAHAHAKAAQAQAAAKgNIAMAMQgGAJgKAFQgKAFgNAAQgUAAgOgOgAgNgaQgFAGgCAMIAqAAIAAgCQgBgMgFgFQgFgGgKAAQgIAAgGAHg");
	this.shape_32.setTransform(263.175,17.05);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgLAjIAAg4IgRAAIAAgRIARAAIAAgZIAWAAIAAAZIARAAIAAARIgRAAIAAA3QAAAGACACQACADAGgBIAIAAIAAARQgIADgHgBQgZAAAAgcg");
	this.shape_33.setTransform(254.625,15.9);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AggArQgKgIAAgNQAAgQAMgHQAMgJAVAAIANAAIAAgHQAAgHgDgFQgFgFgIAAQgIAAgEAEQgFADgBAHIgWAAQAAgIAFgIQAGgHAJgEQAKgEAKAAQASAAALAIQAKAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgDgKQgKAMgPAAQgPAAgJgJgAgNAHQgHAFAAAHQABAHAEAEQAEAEAIAAQAFAAAGgEQAFgDADgFIAAgTIgLAAQgMAAgGAEg");
	this.shape_34.setTransform(233,17.05);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AggA6QgLgOAAgZQAAgWAKgOQAMgOARAAQAQAAAJALIAAgzIAXAAIAACNIgUAAIgCgKQgKAMgQAAQgRAAgLgOgAgPgEQgFAIAAARQAAAQAFAIQAGAJAKAAQAOAAAGgNIAAgpQgGgNgOAAQgKAAgGAJg");
	this.shape_35.setTransform(222.25,15.025);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AggArQgKgIAAgNQAAgQAMgHQALgJAWAAIANAAIAAgHQAAgHgDgFQgFgFgIAAQgIAAgFAEQgEADgBAHIgWAAQAAgIAGgIQAFgHAJgEQAKgEALAAQARAAALAIQAKAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgDgKQgKAMgPAAQgPAAgJgJgAgNAHQgHAFAAAHQABAHAEAEQAEAEAIAAQAFAAAGgEQAFgDADgFIAAgTIgMAAQgLAAgGAEg");
	this.shape_36.setTransform(211.95,17.05);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgrBGIAAiKIAVAAIABALQAJgMARAAQASAAALANQAKAOAAAYIAAACQAAAWgKAOQgLAOgSAAQgQAAgJgLIAAAvgAgUgoIAAAsQAFAMAPAAQAJAAAHgJQAFgIAAgRQAAgPgFgJQgHgJgJAAQgPAAgFALg");
	this.shape_37.setTransform(201.65,18.875);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgLAjIAAg4IgRAAIAAgRIARAAIAAgZIAWAAIAAAZIARAAIAAARIgRAAIAAA3QAAAGACACQACADAGgBIAIAAIAAARQgIADgHgBQgZAAAAgcg");
	this.shape_38.setTransform(179.175,15.9);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AggArQgKgIAAgNQAAgQAMgHQAMgJAVAAIANAAIAAgHQAAgHgEgFQgEgFgIAAQgIAAgFAEQgEADAAAHIgXAAQAAgIAGgIQAFgHAJgEQAKgEALAAQARAAALAIQAKAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgCgKQgMAMgOAAQgPAAgJgJgAgOAHQgFAFgBAHQAAAHAFAEQAEAEAHAAQAGAAAGgEQAFgDADgFIAAgTIgMAAQgLAAgHAEg");
	this.shape_39.setTransform(171.1,17.05);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgrBGIAAiKIAVAAIABALQAJgMARAAQASAAALANQAKAOAAAYIAAACQAAAWgKAOQgLAOgSAAQgPAAgKgLIAAAvgAgUgoIAAAsQAFAMAOAAQAKAAAHgJQAFgIABgRQgBgPgFgJQgHgJgKAAQgOAAgFALg");
	this.shape_40.setTransform(160.8,18.875);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AggArQgKgIAAgNQAAgQAMgHQALgJAWAAIANAAIAAgHQAAgHgDgFQgFgFgIAAQgIAAgEAEQgGADAAAHIgWAAQAAgIAFgIQAGgHAKgEQAJgEAKAAQASAAAKAIQALAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgDgKQgLAMgOAAQgPAAgJgJgAgNAHQgHAFABAHQAAAHAEAEQAEAEAIAAQAFAAAGgEQAFgDADgFIAAgTIgLAAQgMAAgGAEg");
	this.shape_41.setTransform(150.1,17.05);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AggA6QgLgOAAgZQAAgWAKgOQAMgOARAAQAQAAAJALIAAgzIAXAAIAACNIgVAAIgBgKQgKAMgQAAQgSAAgKgOgAgPgEQgFAIgBARQABAQAFAIQAGAJAKAAQAOAAAGgNIAAgpQgGgNgOAAQgKAAgGAJg");
	this.shape_42.setTransform(139.35,15.025);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgZAzIAAhkIAVAAIABAMQAHgNAOAAIAIABIAAAVIgJAAQgPAAgFAMIAABDg");
	this.shape_43.setTransform(131.275,16.95);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgeAmQgNgNAAgXIAAgCQAAgOAGgMQAGgMAKgGQALgHALAAQAVAAALANQALANAAAYIAAAIIhAAAQABAMAHAIQAHAHAKAAQAQAAAKgNIAMAMQgGAJgKAFQgKAFgNAAQgUAAgOgOgAgNgaQgFAGgCAMIAqAAIAAgCQgBgMgFgFQgFgGgKAAQgIAAgGAHg");
	this.shape_44.setTransform(122.475,17.05);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgLAjIAAg4IgRAAIAAgRIARAAIAAgZIAWAAIAAAZIARAAIAAARIgRAAIAAA3QAAAGACACQACADAGgBIAIAAIAAARQgIADgHgBQgZAAAAgcg");
	this.shape_45.setTransform(113.925,15.9);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgWBCQgKgEgGgIIALgNQAKAMAQAAQAKAAAGgGQAHgGAAgMIAAgHQgKALgPAAQgSAAgLgOQgLgOAAgYQAAgXALgOQALgOASAAQAQAAAKAMIABgKIAUAAIAABgQAAAUgMALQgMAMgUAAQgLAAgLgFgAgOgrQgHAJAAARQAAAPAHAIQAGAJAKAAQANAAAHgMIAAgrQgHgMgNAAQgKAAgGAJg");
	this.shape_46.setTransform(91.875,18.925);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhkIAWAAIAAAMQAMgNARAAQAfAAABAjIAABCg");
	this.shape_47.setTransform(81.425,16.95);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AggArQgKgIAAgNQAAgQAMgHQAMgJAVAAIANAAIAAgHQAAgHgDgFQgFgFgIAAQgIAAgEAEQgFADgBAHIgWAAQAAgIAFgIQAGgHAJgEQAKgEAKAAQASAAALAIQAKAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgDgKQgKAMgPAAQgPAAgJgJgAgNAHQgHAFAAAHQABAHAEAEQAEAEAIAAQAFAAAGgEQAFgDADgFIAAgTIgLAAQgMAAgGAEg");
	this.shape_48.setTransform(71,17.05);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AgkBFIAAgRIAFAAQAIAAAEgDQAEgEADgHIADgJIgjhjIAYAAIAVBFIAUhFIAYAAIgoBzQgIAagWAAIgLgCg");
	this.shape_49.setTransform(61.2,19.05);

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
	this.shape.graphics.f("#2C3E50").s().p("AgYAuQgKgHgFgLQgEgLABgNIAAgEQACgOAHgMQAHgNALgGQALgGAMAAQATAAAJAOQAJAOgCAWIgBAIIg+AAQgBAMAFAIQAGAHAKAAQANAAAMgMIALALQgGAJgKAFQgLAFgLAAQgNAAgJgGgAgTgIIApAAIAAgCQABgEAAgFQgBgGgFgEQgEgEgGAAIgCAAQgPAAgJAZg");
	this.shape.setTransform(142.3341,112.7982);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AANAzIALhAIAAgHQgBgLgMgBQgMAAgJANIgNBGIgWAAIAShjIAUAAIgCAMQAMgOARAAQAOAAAHAKQAHAKgCARIgLBAg");
	this.shape_1.setTransform(131.6972,112.6991);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgWBFIAShjIAVAAIgRBjgAABgvQgCgEAAgFQAAgFACgEQADgDAGAAQAFgBAEAEQAEADAAAFQAAAGgEADQgDAEgGAAQgFAAgEgDg");
	this.shape_2.setTransform(124.775,110.8719);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgTBIQgOAAgIgLQgIgKgBgSIAAgLIABgCQABgQAHgLQAGgMAKgGQAKgGALAAQAPAAAIALIAKgzIAWAAIgZCNIgUAAIACgKQgKAMgPAAIgCAAgAgUgBQgHAKgBAUQgBALAFAHQAEAHAIAAQAMAAAJgNIAIgqQgFgLgMgBQgMAAgIAMg");
	this.shape_3.setTransform(117.4125,110.7759);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgWBFIAShjIAVAAIgRBjgAABgvQgCgEAAgFQAAgFACgEQADgDAGAAQAFgBAEAEQAEADAAAFQAAAGgEADQgDAEgGAAQgFAAgEgDg");
	this.shape_4.setTransform(109.525,110.8719);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AANAzIALhAIAAgHQgBgLgMgBQgMAAgJANIgNBGIgWAAIAShjIAUAAIgCAMQAMgOARAAQAOAAAHAKQAHAKgCARIgLBAg");
	this.shape_5.setTransform(101.2972,112.6991);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgiAsQgJgJABgMQABgQANgIQANgJAVAAIAOAAIABgHIAAgHQgCgKgLAAQgHAAgEAEQgGADgBAHIgWAAQABgJAGgHQAGgHAJgEQAKgEAKAAQARAAAJAKQAJAJgCAQIgHAuIgBAIIABALIAAABIgWAAIgBgJQgMALgNAAQgNAAgJgIgAgLAIQgIAEgBAJQAAAGADADQAEAEAGAAQAHAAAFgDQAGgDAEgGIADgTIgKAAQgMAAgHAFg");
	this.shape_6.setTransform(91.2344,112.7972);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgiAuQgGgEgDgJQgDgIABgLIALhAIAWAAIgLBAIAAAHQABALALABQANAAAJgMIANhHIAWAAIgSBjIgUAAIACgKQgLAMgRAAQgKAAgGgFg");
	this.shape_7.setTransform(81.5607,112.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgOBHQgLAAgJgFQgKgFgGgHIAMgNQAIAMAPAAQAKAAAIgGQAHgGADgMIABgHQgMALgNAAQgOAAgIgLQgJgKgBgRIABgNQABgPAHgMQAGgMAJgHQALgGALAAQAQAAAJAMIADgKIAUAAIgRBgQgDAUgNAMQgNALgSAAIgBAAgAgLgrQgHAJgDAQIAAACQAAAFAAAFQAAAJAFAGQADAFAJABQALAAAJgMIAIgrQgEgLgNgBQgKAAgIAJg");
	this.shape_8.setTransform(70.65,114.651);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AANAzIALhAIAAgHQgBgLgMgBQgMAAgJANIgNBGIgWAAIAShjIAUAAIgCAMQAMgOARAAQAOAAAHAKQAHAKgCARIgLBAg");
	this.shape_9.setTransform(55.2972,112.6991);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgiAsQgJgJABgMQABgQANgIQANgJAVAAIAOAAIABgHIAAgHQgCgKgLAAQgHAAgEAEQgGADgBAHIgWAAQABgJAGgHQAGgHAJgEQAKgEAKAAQARAAAJAKQAJAJgCAQIgHAuIgBAIIABALIAAABIgWAAIgBgJQgMALgNAAQgNAAgJgIgAgLAIQgIAEgBAJQAAAGADADQAEAEAGAAQAHAAAFgDQAGgDAEgGIADgTIgKAAQgMAAgHAFg");
	this.shape_10.setTransform(45.2344,112.7972);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgTBIQgOAAgIgLQgIgKgBgSIAAgLIABgCQABgQAHgLQAGgMAKgGQAKgGALAAQAPAAAIALIAKgzIAWAAIgZCNIgUAAIACgKQgKAMgPAAIgCAAgAgUgBQgHAKgBAUQgBALAFAHQAEAHAIAAQAMAAAJgNIAIgqQgFgLgMgBQgMAAgIAMg");
	this.shape_11.setTransform(35.7625,110.7759);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgYAuQgKgHgFgLQgEgLABgNIAAgEQACgOAHgMQAHgNALgGQALgGAMAAQATAAAJAOQAJAOgCAWIgBAIIg+AAQgBAMAFAIQAGAHAKAAQANAAAMgMIALALQgGAJgKAFQgLAFgLAAQgNAAgJgGgAgTgIIApAAIAAgCQABgEAAgFQgBgGgFgEQgEgEgGAAIgCAAQgPAAgJAZg");
	this.shape_12.setTransform(354.3341,85.9982);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AANAzIALhAIAAgHQgBgLgMgBQgMAAgJANIgNBGIgWAAIAShjIAUAAIgCAMQAMgOARAAQAOAAAHAKQAHAKgCARIgLBAg");
	this.shape_13.setTransform(343.6972,85.8991);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgWBFIAShjIAVAAIgRBjgAABgvQgCgEAAgFQAAgFACgEQADgDAGAAQAFgBAEAEQAEADAAAFQAAAGgEADQgDAEgGAAQgFAAgEgDg");
	this.shape_14.setTransform(336.775,84.0719);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgWBHIAXiNIAWAAIgXCNg");
	this.shape_15.setTransform(332.025,83.875);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgcAtQgJgGgEgMQgFgLABgOIABgCQACgOAGgMQAIgMAKgHQAMgGAMAAQANAAAKAHQAJAHAEALQAFAMgBAOQgCAPgHAMQgIAMgKAHQgMAGgMAAQgNAAgKgHgAgQgTQgFAIgBALIAAAMQAAAKAEAGQAFAGAJAAQAKAAAIgJQAHgJACgPIAAgIQAAgMgEgHQgFgHgJAAIgBAAQgMAAgIAOg");
	this.shape_16.setTransform(324,85.9982);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AANBHIALhBIAAgGQgBgLgMgBQgLAAgKAMIgNBHIgWAAIAZiNIAVAAIgJA1QAMgNAPAAQAPAAAHAKQAHAKgCARIgLBAg");
	this.shape_17.setTransform(313.1472,83.875);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgaAtQgJgGgEgLQgFgMACgOIAAgCQACgPAHgMQAHgMAKgGQALgGANAAQAQAAAKALQAKAKAAARIgVAAQAAgJgEgFQgEgGgIAAQgMAAgIALQgHALgBAUQAAAZASAAQAGAAAHgEQAGgFABgIIAVAAQgBAKgGAIQgGAIgKAFQgKAEgJAAQgNAAgJgHg");
	this.shape_18.setTransform(303.6813,85.9982);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgRATQALgPACgKIAEgTIASAAIgCAPQgEAWgSAOg");
	this.shape_19.setTransform(288.325,91.425);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgYAuQgKgHgFgLQgEgLABgNIAAgEQACgOAHgMQAHgNALgGQALgGAMAAQATAAAJAOQAJAOgCAWIgBAIIg+AAQgBAMAFAIQAGAHAKAAQANAAAMgMIALALQgGAJgKAFQgLAFgLAAQgNAAgJgGgAgTgIIApAAIAAgCQABgEAAgFQgBgGgFgEQgEgEgGAAIgCAAQgPAAgJAZg");
	this.shape_20.setTransform(282.5841,85.9982);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AANAzIALhAIAAgHQgBgLgMgBQgMAAgJANIgNBGIgWAAIAShjIAUAAIgCAMQAMgOARAAQAOAAAHAKQAHAKgCARIgLBAg");
	this.shape_21.setTransform(271.9472,85.8991);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgWBFIAShjIAVAAIgRBjgAABgvQgCgEAAgFQAAgFACgEQADgDAGAAQAFgBAEAEQAEADAAAFQAAAGgEADQgDAEgGAAQgFAAgEgDg");
	this.shape_22.setTransform(265.025,84.0719);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AANAzIALhAIAAgHQgBgLgMgBQgMAAgJANIgNBGIgWAAIAShjIAUAAIgCAMQAMgOARAAQAOAAAHAKQAHAKgCARIgLBAg");
	this.shape_23.setTransform(256.7972,85.8991);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgiAsQgJgJABgMQABgQANgIQANgJAVAAIAOAAIABgHIAAgHQgCgKgLAAQgHAAgEAEQgGADgBAHIgWAAQABgJAGgHQAGgHAJgEQAKgEAKAAQARAAAJAKQAJAJgCAQIgHAuIgBAIIABALIAAABIgWAAIgBgJQgMALgNAAQgNAAgJgIgAgLAIQgIAEgBAJQAAAGADADQAEAEAGAAQAHAAAFgDQAGgDAEgGIADgTIgKAAQgMAAgHAFg");
	this.shape_24.setTransform(246.7344,85.9972);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgiAuQgGgEgDgJQgDgIABgLIALhAIAWAAIgLBAIAAAHQABALALABQANAAAJgMIANhHIAWAAIgSBjIgUAAIACgKQgLAMgRAAQgKAAgGgFg");
	this.shape_25.setTransform(237.0607,86.075);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgOBHQgLAAgKgFQgJgFgGgHIAMgNQAJAMAOAAQALAAAHgGQAHgGADgMIACgHQgMALgOAAQgOAAgJgLQgIgKgBgRIAAgNQADgPAFgMQAHgMAJgHQALgGALAAQAQAAAIAMIAEgKIAUAAIgRBgQgCAUgOAMQgNALgSAAIgBAAgAgLgrQgHAJgCAQIAAACQgCAFABAFQAAAJAEAGQAFAFAIABQALAAAJgMIAIgrQgFgLgMgBQgKAAgIAJg");
	this.shape_26.setTransform(226.15,87.851);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgRATQALgPACgKIAEgTIASAAIgCAPQgEAWgSAOg");
	this.shape_27.setTransform(210.775,91.425);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgYAuQgKgHgFgLQgEgLABgNIAAgEQACgOAHgMQAHgNALgGQALgGAMAAQATAAAJAOQAJAOgCAWIgBAIIg+AAQgBAMAFAIQAGAHAKAAQANAAAMgMIALALQgGAJgKAFQgLAFgLAAQgNAAgJgGgAgTgIIApAAIAAgCQABgEAAgFQgBgGgFgEQgEgEgGAAIgCAAQgPAAgJAZg");
	this.shape_28.setTransform(205.0341,85.9982);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AANAzIALhAIAAgHQgBgLgMgBQgMAAgJANIgNBGIgWAAIAShjIAUAAIgCAMQAMgOARAAQAOAAAHAKQAHAKgCARIgLBAg");
	this.shape_29.setTransform(194.3972,85.8991);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgWBFIAShjIAVAAIgRBjgAABgvQgCgEAAgFQAAgFACgEQADgDAGAAQAFgBAEAEQAEADAAAFQAAAGgEADQgDAEgGAAQgFAAgEgDg");
	this.shape_30.setTransform(187.475,84.0719);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AANBHIALhBIAAgGQgBgLgMgBQgLAAgKAMIgNBHIgWAAIAZiNIAVAAIgJA1QAMgNAPAAQAPAAAHAKQAHAKgCARIgLBAg");
	this.shape_31.setTransform(179.2472,83.875);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgRA3QgFgHAAgNIAKg4IgQAAIADgRIAQAAIAEgZIAVAAIgEAZIARAAIgCARIgSAAIgJA3IAAAEQAAAGAHAAIAHgBIgBASQgHACgGAAQgLAAgGgIg");
	this.shape_32.setTransform(171.75,84.85);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AANAzIALhAIAAgHQgBgLgMgBQgMAAgJANIgNBGIgWAAIAShjIAUAAIgCAMQAMgOARAAQAOAAAHAKQAHAKgCARIgLBAg");
	this.shape_33.setTransform(162.6472,85.8991);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgiAsQgJgJABgMQABgQANgIQANgJAVAAIAOAAIABgHIAAgHQgCgKgLAAQgHAAgEAEQgGADgBAHIgWAAQABgJAGgHQAGgHAJgEQAKgEAKAAQARAAAJAKQAJAJgCAQIgHAuIgBAIQAAAFABAGIAAABIgWAAIgBgJQgMALgNAAQgNAAgJgIgAgLAIQgIAEgBAJQAAAGADADQAEAEAGAAQAHAAAFgDQAGgDAEgGIADgTIgKAAQgMAAgHAFg");
	this.shape_34.setTransform(152.5844,85.9972);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AAMAyIgNgiIgYAiIgaAAIAogzIgWgwIAXAAIAMAhIAYghIAaAAIgnAxIAWAyg");
	this.shape_35.setTransform(143.075,85.975);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgRATQALgPACgKIAEgTIASAAIgCAPQgEAWgSAOg");
	this.shape_36.setTransform(128.175,91.425);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgYAuQgKgHgFgLQgEgLABgNIAAgEQACgOAHgMQAHgNALgGQALgGAMAAQATAAAJAOQAJAOgCAWIgBAIIg+AAQgBAMAFAIQAGAHAKAAQANAAAMgMIALALQgGAJgKAFQgLAFgLAAQgNAAgJgGgAgTgIIApAAIAAgCQABgEAAgFQgBgGgFgEQgEgEgGAAIgCAAQgPAAgJAZg");
	this.shape_37.setTransform(122.4341,85.9982);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AANAzIALhAIAAgHQgBgLgMgBQgMAAgJANIgNBGIgWAAIAShjIAUAAIgCAMQAMgOARAAQAOAAAHAKQAHAKgCARIgLBAg");
	this.shape_38.setTransform(111.7972,85.8991);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgWBFIAShjIAVAAIgRBjgAABgvQgCgEAAgFQAAgFACgEQADgDAGAAQAFgBAEAEQAEADAAAFQAAAGgEADQgDAEgGAAQgFAAgEgDg");
	this.shape_39.setTransform(104.875,84.0719);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgRA3QgGgHACgNIAJg4IgQAAIADgRIAQAAIAEgZIAVAAIgEAZIARAAIgCARIgSAAIgJA3IAAAEQAAAGAHAAIAIgBIgCASQgGACgHAAQgLAAgGgIg");
	this.shape_40.setTransform(99.5,84.85);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AANAzIALhAIAAgHQgBgLgMgBQgMAAgJANIgNBGIgWAAIAShjIAUAAIgCAMQAMgOARAAQAOAAAHAKQAHAKgCARIgLBAg");
	this.shape_41.setTransform(90.3972,85.8991);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgiAsQgJgJABgMQABgQANgIQANgJAVAAIAOAAIABgHIAAgHQgCgKgLAAQgHAAgEAEQgGADgBAHIgWAAQABgJAGgHQAGgHAJgEQAKgEAKAAQARAAAJAKQAJAJgCAQIgHAuIgBAIIABALIAAABIgWAAIgBgJQgMALgNAAQgNAAgJgIgAgLAIQgIAEgBAJQAAAGADADQAEAEAGAAQAHAAAFgDQAGgDAEgGIADgTIgKAAQgMAAgHAFg");
	this.shape_42.setTransform(80.3344,85.9972);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AAMAyIgNgiIgYAiIgaAAIAogzIgWgwIAXAAIAMAhIAYghIAaAAIgnAxIAWAyg");
	this.shape_43.setTransform(70.825,85.975);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgcAtQgJgGgFgMQgEgLABgOIABgCQACgOAGgMQAIgMAKgHQAMgGANAAQANAAAIAHQAKAHAFALQADAMgBAOQgBAPgIAMQgGAMgMAHQgLAGgNAAQgNAAgJgHgAgQgTQgFAIgBALIAAAMQAAAKAEAGQAFAGAJAAQAKAAAIgJQAHgJACgPIABgIQgBgMgEgHQgFgHgJAAIgBAAQgMAAgIAOg");
	this.shape_44.setTransform(60.9,85.9982);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgyBGIAZiKIAUAAIgCALQALgNAPABQAKAAAHAEQAHAFAEAJQAEAJAAALIgBAOQgCAPgGALQgGAMgJAHQgKAGgMAAQgOgBgJgKIgJAvgAgIgoIgIAsQAEALAMABQALAAAHgJQAIgIADgSIAAgHQAAgMgEgGQgEgHgJAAQgMAAgIALg");
	this.shape_45.setTransform(49.775,87.824);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgWBFIAShjIAVAAIgRBjgAABgvQgCgEAAgFQAAgFACgEQADgDAGAAQAFgBAEAEQAEADAAAFQAAAGgEADQgDAEgGAAQgFAAgEgDg");
	this.shape_46.setTransform(43.025,84.0719);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AANBHIALhBIAAgGQgBgLgMgBQgLAAgKAMIgNBHIgWAAIAZiNIAVAAIgJA1QAMgNAPAAQAPAAAHAKQAHAKgCARIgLBAg");
	this.shape_47.setTransform(34.7972,83.875);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgRATQALgPACgKIAEgTIASAAIgCAPQgEAWgSAOg");
	this.shape_48.setTransform(355.975,64.625);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AANAzIALhAIAAgHQgBgLgMgBQgMAAgJANIgNBGIgWAAIAShjIAUAAIgCAMQAMgOARAAQAOAAAHAKQAHAKgCARIgLBAg");
	this.shape_49.setTransform(349.5972,59.0991);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgWBFIAShjIAVAAIgRBjgAABgvQgCgEAAgFQAAgFACgEQADgDAGAAQAFgBAEAEQAEADAAAFQAAAGgEADQgDAEgGAAQgFAAgEgDg");
	this.shape_50.setTransform(342.675,57.2719);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AggArQgLgKABgOIAVAAQAAAIAFAEQAFAEAHAAQAIAAAFgDQAFgEACgGQABgJgOgDQgMgEgFgCQgTgHAAgRQABgNAMgJQAMgJAQAAQAPAAALAJQAJAJAAAOIgWAAQAAgHgDgEQgFgEgGAAQgHAAgFAEQgFADgBAGQgCAJANADIATAGQATAHgBARQgBAKgFAHQgGAHgJAEQgLADgKAAQgQAAgLgJg");
	this.shape_51.setTransform(335.1001,59.1987);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AgzBFIACgSIAEABQAIAAAFgDQAGgEADgHIAFgKIgQhiIAWAAIAJBEIAfhEIAYAAIg7B1QgMAYgUAAIgMgCg");
	this.shape_52.setTransform(325.925,61.225);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AgWBHIAXiNIAWAAIgXCNg");
	this.shape_53.setTransform(319.275,57.075);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgbAtQgKgGgFgMQgDgLABgOIAAgCQABgOAIgMQAGgMAMgHQALgGANAAQAMAAAKAHQAJAHAFALQADAMAAAOQgCAPgHAMQgIAMgKAHQgMAGgNAAQgNAAgIgHgAgQgTQgFAIgBALIgBAMQABAKAFAGQAEAGAIAAQALAAAHgJQAIgJACgPIAAgIQABgMgFgHQgFgHgJAAIgBAAQgMAAgIAOg");
	this.shape_54.setTransform(311.25,59.1982);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AghAzIAShjIATAAIgCALQALgNANAAIAIABIgDAVIgIAAQgOgBgJANIgLBDg");
	this.shape_55.setTransform(303.05,59.075);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AgXA7IgDALIgVAAIAZiNIAWAAIgKA0QALgMAPAAQAOAAAJALQAIAKABARIgBAOQgCAPgGAMQgHANgKAGQgJAFgLAAQgQAAgJgNgAgMAAIgIApQAFAMANABQAKAAAHgJQAIgJABgQIABgMQAAgJgDgGQgFgFgHgBQgNAAgJANg");
	this.shape_56.setTransform(293.95,57.175);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AApAzIALhAIAAgHQgBgLgMgBQgOAAgIAPIAAACIgMBCIgVAAIALhAIAAgHQgBgLgMgBQgNAAgIALIgNBIIgWAAIAShjIAUAAIgCAKQANgMARAAQAIAAAHAEQAGAFACAGQAOgPASAAQAPAAAHAKQAHAKgCARIgLBAg");
	this.shape_57.setTransform(280.5132,59.099);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AgWBHIAXiNIAWAAIgXCNg");
	this.shape_58.setTransform(270.725,57.075);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgcAtQgJgGgEgMQgFgLABgOIABgCQACgOAGgMQAIgMAKgHQAMgGAMAAQANAAAKAHQAJAHAEALQAFAMgCAOQgBAPgIAMQgGAMgMAHQgLAGgMAAQgNAAgKgHgAgQgTQgFAIgBALIAAAMQAAAKAEAGQAFAGAJAAQAKAAAIgJQAHgJACgPIAAgIQAAgMgEgHQgFgHgJAAIgBAAQgMAAgIAOg");
	this.shape_59.setTransform(262.7,59.1982);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AghAzIARhjIAUAAIgCALQALgNAMAAIAJABIgCAVIgJAAQgPgBgIANIgLBDg");
	this.shape_60.setTransform(254.5,59.075);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgRA4QgFgIAAgNIAKg4IgQAAIADgRIAQAAIAEgZIAVAAIgEAZIARAAIgCARIgSAAIgJA3IAAAEQAAAGAHAAIAHgBIgBASQgHACgGABQgLgBgGgHg");
	this.shape_61.setTransform(248.15,58.05);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AggArQgLgKABgOIAVAAQAAAIAFAEQAFAEAHAAQAIAAAFgDQAFgEACgGQABgJgOgDQgMgEgFgCQgTgHAAgRQABgNAMgJQAMgJAQAAQAPAAALAJQAJAJAAAOIgWAAQAAgHgDgEQgFgEgGAAQgHAAgFAEQgFADgBAGQgCAJANADIATAGQATAHgBARQgBAKgFAHQgGAHgJAEQgLADgKAAQgQAAgLgJg");
	this.shape_62.setTransform(239.7001,59.1987);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AgYAuQgKgHgFgLQgEgLABgNIAAgEQACgOAHgMQAHgNALgGQALgGAMAAQATAAAJAOQAJAOgCAWIgBAIIg+AAQgBAMAFAIQAGAHAKAAQANAAAMgMIALALQgGAJgKAFQgLAFgLAAQgNAAgJgGgAgTgIIApAAIAAgCQABgEAAgFQgBgGgFgEQgEgEgGAAIgCAAQgPAAgJAZg");
	this.shape_63.setTransform(230.0841,59.1982);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AghAzIARhjIAUAAIgCALQALgNAMAAIAJABIgCAVIgJAAQgPgBgIANIgLBDg");
	this.shape_64.setTransform(222.1,59.075);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AgYAuQgKgHgFgLQgEgLABgNIAAgEQACgOAHgMQAHgNALgGQALgGAMAAQATAAAJAOQAJAOgCAWIgBAIIg+AAQgBAMAFAIQAGAHAKAAQANAAAMgMIALALQgGAJgKAFQgLAFgLAAQgNAAgJgGgAgTgIIApAAIAAgCQABgEAAgFQgBgGgFgEQgEgEgGAAIgCAAQgPAAgJAZg");
	this.shape_65.setTransform(213.5341,59.1982);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AgRA4QgFgIAAgNIAKg4IgQAAIADgRIAQAAIAEgZIAVAAIgEAZIARAAIgCARIgSAAIgJA3IAAAEQAAAGAHAAIAHgBIgBASQgHACgGABQgLgBgGgHg");
	this.shape_66.setTransform(205.75,58.05);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgKgEgEQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAjIAABCg");
	this.shape_67.setTransform(171.025,59.1);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_68.setTransform(163.325,57.275);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2C3E50").s().p("AgeAnQgNgOAAgWIAAgDQAAgOAGgMQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABAMAHAHQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgNgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_69.setTransform(155.875,59.2);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2C3E50").s().p("AgLAiIAAg3IgRAAIAAgRIARAAIAAgZIAWAAIAAAZIARAAIAAARIgRAAIAAA3QAAAFACADQACACAGAAIAIAAIAAARQgIADgHAAQgZgBAAgdg");
	this.shape_70.setTransform(147.325,58.05);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2C3E50").s().p("AghAmQgMgOAAgYIAAAAQgBgPAGgMQAGgMAKgGQALgGANAAQAUAAANANQAMANABAWIAAAEQAAAOgFAMQgGAMgKAGQgLAHgOAAQgUAAgNgOgAgRgZQgGAKAAAQQAAAPAGAJQAHAJAKAAQAMAAAGgJQAGgJAAgQQAAgPgGgJQgHgJgLAAQgKAAgHAIg");
	this.shape_71.setTransform(139,59.2);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2C3E50").s().p("AgZAzIAAhjIAVAAIABALQAHgNAOAAIAIABIAAAVIgJAAQgPgBgFAMIAABEg");
	this.shape_72.setTransform(130.675,59.1);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#2C3E50").s().p("AgrBGIAAiKIAVAAIABALQAKgMAQAAQASAAAKANQALAOAAAYIAAACQAAAWgLAOQgKAOgSAAQgPAAgKgLIAAAvgAgUgoIAAAsQAFAMAOAAQALAAAFgJQAGgIABgRQgBgPgGgJQgFgJgLAAQgOAAgFALg");
	this.shape_73.setTransform(121.75,61.025);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgKgEgEQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAjIAABCg");
	this.shape_74.setTransform(84.925,59.1);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_75.setTransform(77.225,57.275);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#2C3E50").s().p("AgeAnQgNgOAAgWIAAgDQAAgOAGgMQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABAMAHAHQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgNgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_76.setTransform(69.775,59.2);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#2C3E50").s().p("AgLAiIAAg3IgRAAIAAgRIARAAIAAgZIAWAAIAAAZIARAAIAAARIgRAAIAAA3QAAAFACADQACACAGAAIAIAAIAAARQgIADgHAAQgZgBAAgdg");
	this.shape_77.setTransform(61.225,58.05);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#2C3E50").s().p("AghAmQgNgOAAgYIAAAAQABgPAFgMQAGgMALgGQAKgGANAAQAUAAANANQAMANABAWIAAAEQABAOgGAMQgGAMgLAGQgKAHgOAAQgUAAgNgOgAgRgZQgGAKAAAQQAAAPAGAJQAHAJAKAAQALAAAHgJQAGgJAAgQQAAgPgHgJQgGgJgLAAQgKAAgHAIg");
	this.shape_78.setTransform(52.9,59.2);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#2C3E50").s().p("AgZAzIAAhjIAVAAIABALQAHgNAOAAIAIABIAAAVIgJAAQgPgBgFAMIAABEg");
	this.shape_79.setTransform(44.575,59.1);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#2C3E50").s().p("AgrBGIAAiKIAVAAIAAALQALgMAPAAQATAAAKANQALAOAAAYIAAACQAAAWgLAOQgKAOgSAAQgQAAgKgLIAAAvgAgVgoIAAAsQAHAMANAAQALAAAFgJQAHgIgBgRQABgPgHgJQgFgJgLAAQgNAAgHALg");
	this.shape_80.setTransform(35.65,61.025);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgIQALgIAWgBIANAAIAAgGQAAgIgDgFQgFgEgIAAQgIAAgEAEQgGAEAAAFIgWAAQAAgHAFgIQAGgHAKgEQAJgEAKAAQASAAAKAJQALAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgDgJQgLALgOAAQgPAAgKgJgAgNAHQgHAEABAJQAAAGAEAEQAEAEAIAAQAFAAAGgDQAGgDACgGIAAgTIgLAAQgMAAgGAEg");
	this.shape_81.setTransform(354.3,32.4);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#2C3E50").s().p("AgrBGIAAiKIAVAAIAAALQALgMAPAAQATAAAKANQALAOAAAYIAAACQAAAWgLAOQgKAOgSAAQgPAAgLgLIAAAvgAgVgoIAAAsQAGAMAPAAQAJAAAGgJQAHgIgBgRQABgPgHgJQgGgJgJAAQgPAAgGALg");
	this.shape_82.setTransform(344,34.225);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#2C3E50").s().p("AggAqQgJgKABgSIAAhAIAWAAIAABAQAAATAQAAQAQAAAFgMIAAhHIAXAAIAABjIgWAAIAAgKQgKAMgSAAQgPAAgJgJg");
	this.shape_83.setTransform(333.15,32.475);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#2C3E50").s().p("AgZAzIAAhjIAVAAIABALQAHgNAOAAIAIABIAAAVIgJgBQgPABgFALIAABEg");
	this.shape_84.setTransform(324.975,32.3);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#2C3E50").s().p("AgeAnQgNgOAAgWIAAgDQAAgPAGgLQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABANAHAGQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgNgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_85.setTransform(316.175,32.4);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#2C3E50").s().p("AgWA7IgBALIgUAAIAAiNIAWAAIAAA0QALgMAPAAQASAAALAOQAKANAAAYIAAABQAAAXgKAOQgLAOgSAAQgQAAgLgNgAgVAAIAAApQAHANAOAAQAKAAAGgIQAFgIAAgQIAAgDQABgQgGgHQgGgJgKAAQgOAAgHANg");
	this.shape_86.setTransform(305.85,30.375);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_87.setTransform(289.975,30.475);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#2C3E50").s().p("AgZAzIAAhjIAVAAIABALQAHgNAOAAIAIABIAAAVIgJgBQgPABgFALIAABEg");
	this.shape_88.setTransform(284.625,32.3);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#2C3E50").s().p("AgeAnQgNgOAAgWIAAgDQAAgPAGgLQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABANAHAGQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgNgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_89.setTransform(275.825,32.4);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#2C3E50").s().p("AgLAjIAAg4IgRAAIAAgRIARAAIAAgYIAWAAIAAAYIARAAIAAARIgRAAIAAA3QAAAFACADQACADAGAAIAIgBIAAARQgIACgHABQgZAAAAgdg");
	this.shape_90.setTransform(267.275,31.25);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#2C3E50").s().p("AASBHIgdgrIgKALIAAAgIgWAAIAAiNIAWAAIAABRIAHgJIAbgeIAbAAIglApIApA6g");
	this.shape_91.setTransform(260.025,30.275);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#2C3E50").s().p("AggArQgKgJAAgMQAAgQAMgIQALgIAWgBIANAAIAAgGQAAgIgDgFQgFgEgIAAQgIAAgFAEQgEAEgBAFIgWAAQAAgHAGgIQAFgHAJgEQAKgEALAAQARAAALAJQAKAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgDgJQgKALgPAAQgPAAgJgJgAgNAHQgHAEAAAJQABAGAEAEQAEAEAHAAQAGAAAGgDQAFgDADgGIAAgTIgMAAQgLAAgGAEg");
	this.shape_92.setTransform(249.3,32.4);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#2C3E50").s().p("AgVA7IgCALIgUAAIAAiNIAXAAIAAA0QAJgMAQAAQASAAALAOQAKANAAAYIAAABQAAAXgKAOQgLAOgSAAQgRAAgJgNgAgUAAIAAApQAFANAPAAQAKAAAGgIQAFgIAAgQIAAgDQABgQgGgHQgGgJgKAAQgPAAgFANg");
	this.shape_93.setTransform(239,30.375);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_94.setTransform(231.025,30.475);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#2C3E50").s().p("AgLAjIAAg4IgRAAIAAgRIARAAIAAgYIAWAAIAAAYIARAAIAAARIgRAAIAAA3QAAAFACADQACADAGAAIAIgBIAAARQgIACgHABQgZAAAAgdg");
	this.shape_95.setTransform(225.225,31.25);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHAMIAABHIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAkIAABBg");
	this.shape_96.setTransform(217.025,32.3);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgIQALgIAWgBIAOAAIAAgGQAAgIgFgFQgEgEgIAAQgHAAgFAEQgGAEAAAFIgWAAQAAgHAFgIQAGgHAKgEQAJgEAKAAQASAAAKAJQALAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgDgJQgLALgOAAQgPAAgKgJgAgOAHQgFAEAAAJQgBAGAFAEQAEAEAIAAQAFAAAGgDQAGgDADgGIAAgTIgMAAQgMAAgHAEg");
	this.shape_97.setTransform(206.6,32.4);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#2C3E50").s().p("AgLAjIAAg4IgRAAIAAgRIARAAIAAgYIAWAAIAAAYIARAAIAAARIgRAAIAAA3QAAAFACADQACADAGAAIAIgBIAAARQgIACgHABQgZAAAAgdg");
	this.shape_98.setTransform(190.175,31.25);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgIQAMgIAVgBIAOAAIAAgGQAAgIgFgFQgEgEgIAAQgHAAgGAEQgEAEAAAFIgXAAQAAgHAGgIQAFgHAKgEQAJgEALAAQARAAAKAJQALAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgCgJQgMALgOAAQgPAAgKgJgAgOAHQgFAEAAAJQgBAGAFAEQAEAEAHAAQAGAAAGgDQAFgDAEgGIAAgTIgNAAQgLAAgHAEg");
	this.shape_99.setTransform(182.1,32.4);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#2C3E50").s().p("AgrBGIAAiKIAVAAIABALQAKgMAQAAQASAAAKANQALAOAAAYIAAACQAAAWgLAOQgKAOgSAAQgPAAgLgLIAAAvgAgVgoIAAAsQAGAMAOAAQALAAAFgJQAHgIAAgRQAAgPgHgJQgFgJgLAAQgOAAgGALg");
	this.shape_100.setTransform(171.8,34.225);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#2C3E50").s().p("AggArQgKgJAAgMQAAgQAMgIQALgIAWgBIANAAIAAgGQAAgIgDgFQgFgEgIAAQgIAAgFAEQgEAEgBAFIgWAAQAAgHAGgIQAFgHAJgEQAKgEALAAQARAAALAJQAKAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgDgJQgKALgPAAQgPAAgJgJgAgNAHQgHAEAAAJQABAGAEAEQAEAEAHAAQAGAAAGgDQAFgDADgGIAAgTIgLAAQgMAAgGAEg");
	this.shape_101.setTransform(161.1,32.4);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#2C3E50").s().p("AggA6QgLgOAAgZQAAgWAKgOQALgOATAAQAOAAAKALIAAgzIAXAAIAACNIgUAAIgBgKQgLAMgPAAQgTAAgKgOgAgPgEQgFAIAAARQAAAQAFAIQAGAJAKAAQAOAAAGgNIAAgpQgGgNgOAAQgKAAgGAJg");
	this.shape_102.setTransform(150.35,30.375);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#2C3E50").s().p("AgZAzIAAhjIAVAAIABALQAHgNAOAAIAIABIAAAVIgJgBQgPABgFALIAABEg");
	this.shape_103.setTransform(142.275,32.3);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#2C3E50").s().p("AgeAnQgNgOAAgWIAAgDQAAgPAGgLQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABANAHAGQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgNgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_104.setTransform(133.475,32.4);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#2C3E50").s().p("AgLAjIAAg4IgRAAIAAgRIARAAIAAgYIAWAAIAAAYIARAAIAAARIgRAAIAAA3QAAAFACADQACADAGAAIAIgBIAAARQgIACgHABQgZAAAAgdg");
	this.shape_105.setTransform(124.925,31.25);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgIQALgIAWgBIAOAAIAAgGQAAgIgFgFQgEgEgIAAQgHAAgFAEQgGAEAAAFIgWAAQAAgHAFgIQAGgHAKgEQAJgEAKAAQASAAAKAJQALAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgDgJQgLALgOAAQgPAAgKgJgAgOAHQgFAEAAAJQgBAGAFAEQAEAEAIAAQAFAAAGgDQAGgDADgGIAAgTIgMAAQgMAAgHAEg");
	this.shape_106.setTransform(108.95,32.4);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#2C3E50").s().p("AgkBFIAAgSIAFAAQAIAAAEgDQAEgCADgIIADgJIgjhiIAZAAIATBDIAVhDIAYAAIgoByQgIAagWAAIgLgCg");
	this.shape_107.setTransform(99.15,34.4);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHAMIAABHIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAkIAABBg");
	this.shape_108.setTransform(89.275,32.3);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#2C3E50").s().p("AATBHIAAhBQAAgJgEgEQgFgFgJAAQgMAAgHAMIAABHIgXAAIAAiNIAXAAIAAA1QALgNAQAAQAgAAABAkIAABBg");
	this.shape_109.setTransform(78.725,30.275);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#2C3E50").s().p("AggAqQgJgKAAgSIAAhAIAXAAIAABAQAAATAQAAQAQAAAFgMIAAhHIAWAAIAABjIgVAAIAAgKQgKAMgRAAQgRAAgIgJg");
	this.shape_110.setTransform(68.15,32.475);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#2C3E50").s().p("AgVA7IgBALIgVAAIAAiNIAXAAIAAA0QAKgMAPAAQASAAALAOQAKANAAAYIAAABQAAAXgKAOQgKAOgTAAQgRAAgJgNgAgUAAIAAApQAFANAPAAQAKAAAGgIQAFgIABgQIAAgDQAAgQgGgHQgGgJgKAAQgPAAgFANg");
	this.shape_111.setTransform(57.75,30.375);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#2C3E50").s().p("AggAqQgIgKAAgSIAAhAIAWAAIAABAQAAATAQAAQAQAAAFgMIAAhHIAWAAIAABjIgUAAIgBgKQgKAMgRAAQgRAAgIgJg");
	this.shape_112.setTransform(46.9,32.475);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#2C3E50").s().p("AgLBEIAAhzIgqAAIAAgTIBrAAIAAATIgrAAIAABzg");
	this.shape_113.setTransform(35.875,30.65);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.738,0,0,2.475,-216.4,-107.9)).s().p("EghzAQ1MAAAghpMBDnAAAMAAAAhpg");
	this.shape_114.setTransform(198.475,78.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop15G1, new cjs.Rectangle(-17.9,-29.3,432.79999999999995,215.4), null);


(lib.drag15G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap43();
	this.instance.setTransform(21,-21,0.4361,0.4731);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgSAZQgGgGAAgIIAMAAQAAAFADACQADACAEAAQAEAAADgBQADgCABgEQABgFgIgCIgKgEQgLgDABgKQAAgIAHgFQAHgFAIAAQAJAAAGAFQAGAFAAAJIgNAAQAAgEgCgDQgCgCgEAAQgEAAgCACQgEACAAADQgBAFAHACIALAEQALADgBAKQAAAGgDAEQgEAEgFACQgGACgFAAQgKAAgGgFg");
	this.shape.setTransform(123.8519,73.5479);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgMAoIAKg5IAMAAIgKA5gAABgbQgBgCAAgDQAAgDABgCQACgCADAAQADAAACACQACACAAADQAAADgCACQgCACgDAAIgBAAQgBAAAAAAQgBgBAAAAQgBAAAAAAQgBgBAAAAg");
	this.shape_1.setTransform(119.875,72.445);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgNApIAOhRIAMAAIgNBRg");
	this.shape_2.setTransform(117.1,72.325);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgHAeQgHAAgFgFQgFgEAAgIQAAgJAIgEQAHgFAMAAIAIAAIABgEIAAgEQgBgGgHAAQgEAAgCACQgDACgBAEIgMAAQAAgFAEgEQADgFAGgCQAFgCAGAAQAJAAAFAGQAGAFgBAJIgFAaIAAAFIABAGIAAABIgNAAIAAgFQgHAGgHAAIgBAAgAgGAFQgFACAAAFQgBAEADACQABACAEAAQAEAAADgCIAFgFIACgLIgGAAQgGAAgEADg");
	this.shape_3.setTransform(112.4577,73.5475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAHAeIAHglIAAgEQgBgHgHAAQgGAAgGAHIgHApIgNAAIAKg5IAMAAIgBAGQAHgIAJABQAJAAAEAFQADAGgBAKIgGAlg");
	this.shape_4.setTransform(106.4611,73.4985);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgMAoIAKg5IAMAAIgKA5gAABgbQgBgCAAgDQAAgDABgCQACgCADAAQADAAACACQACACAAADQAAADgCACQgCACgDAAIgBAAQgBAAAAAAQgBgBAAAAQgBAAAAAAQgBgBAAAAg");
	this.shape_5.setTransform(102.425,72.445);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgPAaQgFgDgCgHQgDgHABgIIAAgBQABgIAEgHQAEgHAGgDQAHgEAHAAQAJAAAGAGQAFAGAAAKIgMAAQAAgFgCgDQgDgDgEgBQgHAAgEAHQgEAGgBALQAAAPAKAAQAEAAAEgDQADgCABgFIAMAAQgBAGgDAEQgEAFgFADQgGACgFAAQgHAAgGgEg");
	this.shape_6.setTransform(98.1857,73.5472);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgMAoIAKg5IAMAAIgKA5gAABgbQgBgCAAgDQAAgDABgCQACgCADAAQADAAACACQACACAAADQAAADgCACQgCACgDAAIgBAAQgBAAAAAAQgBgBAAAAQgBAAAAAAQgBgBAAAAg");
	this.shape_7.setTransform(93.975,72.445);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgKAqQgIAAgFgGQgFgHAAgKIAAgGIAAgBQABgJAEgGQADgIAGgDQAGgEAGABQAIAAAFAGIAGgeIANAAIgPBSIgLAAIABgGQgGAHgIAAIgBAAgAgLAAQgEAFgBAMQAAAGACAEQADAEAFAAQAGAAAFgHIAFgYQgDgHgHAAIAAAAQgHAAgEAHg");
	this.shape_8.setTransform(89.6875,72.3766);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgOAbQgFgEgDgGQgDgHABgIIAAgCQABgIAEgHQAFgHAGgDQAGgEAHAAQAKAAAGAIQAFAIgBANIgBAEIgjAAQgBAHADAFQAEAEAFAAQAIAAAHgHIAGAGQgEAGgGADQgFACgHAAQgHAAgGgDgAgKgEIAXAAIAAgBIAAgFQAAgEgDgCQgCgCgEgBQgJAAgFAPg");
	this.shape_9.setTransform(83.5452,73.5472);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAYAeIAGglIAAgEQgBgHgHAAQgIAAgEAJIAAABIgHAmIgMAAIAHglIAAgEQgBgHgHAAQgIAAgEAHIgIApIgMAAIAKg5IAMAAIgCAGQAIgIAKABQAEAAAEACQADADACADQAIgJAKABQAJAAAEAFQAEAGgBAKIgGAlg");
	this.shape_10.setTransform(75.71,73.4984);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgDAeQgHAAgGgEQgFgDgDgIQgCgGABgIIAAgBQABgIAEgHQAEgHAGgDQAHgFAHABQAHAAAFAEQAGAEACAHQADAGgBAIQgBAIgEAHQgEAHgHAFQgFADgGAAIgCAAgAgJgLQgDAFgBAGIAAAHQAAAFADAEQADADAFABQAFAAAFgGQAEgFABgIIABgFQAAgHgDgDQgDgEgFgBQgHAAgFAIg");
	this.shape_11.setTransform(65.4649,73.55);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgKAqQgIAAgFgGQgFgHAAgKIAAgGIAAgBQABgJAEgGQADgIAGgDQAGgEAGABQAIAAAFAGIAGgeIANAAIgPBSIgLAAIABgGQgGAHgIAAIgBAAgAgLAAQgEAFgBAMQAAAGACAEQADAEAFAAQAGAAAFgHIAFgYQgDgHgHAAIAAAAQgHAAgEAHg");
	this.shape_12.setTransform(59.6375,72.3766);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgKAdQgFAAgEgCQgEgDgBgFQgCgFABgGIAGglIANAAIgGAlIgBAEQABAGAGABQAIAAAFgHIAHgpIANAAIgKA5IgMAAIABgFQgGAHgJAAIgBgBg");
	this.shape_13.setTransform(53.4438,73.6017);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgTAeIAKg5IALAAIgBAGQAGgIAIAAIAFABIgCANIgFgBQgIAAgFAHIgGAng");
	this.shape_14.setTransform(48.625,73.475);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgMAoIAKg5IAMAAIgKA5gAABgbQgBgCAAgDQAAgDABgCQACgCADAAQADAAACACQACACAAADQAAADgCACQgCACgDAAIgBAAQgBAAAAAAQgBgBAAAAQgBAAAAAAQgBgBAAAAg");
	this.shape_15.setTransform(45.225,72.445);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAKAnIAGgjIghAAIgGAjIgNAAIANhNIAOAAIgGAhIAhAAIAGghIANAAIgNBNg");
	this.shape_16.setTransform(40,72.55);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FF8C2D").s().p("AoGhYIQNgEIAAC0IwNAFg");
	this.shape_17.setTransform(81.525,73.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(21,-21,122.1,103.6);


(lib.drag15G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap42();
	this.instance.setTransform(21,-75,0.4732,0.4732);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgSAZQgGgGAAgIIAMAAQAAAFADACQADACAEAAQAEAAADgBQADgCABgEQABgFgIgCIgKgEQgLgDABgKQAAgIAHgFQAHgFAIAAQAJAAAGAFQAGAFAAAJIgNAAQAAgEgCgDQgCgCgEAAQgEAAgCACQgEACAAADQgBAFAHACIALAEQALADgBAKQAAAGgDAEQgEAEgFACQgGACgFAAQgKAAgGgFg");
	this.shape.setTransform(124.7519,19.4479);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgKAdQgFAAgEgCQgEgDgBgFQgCgFABgGIAGglIANAAIgGAlIgBAEQABAGAGABQAIAAAFgHIAHgpIANAAIgKA5IgMAAIABgFQgGAHgJAAIgBgBg");
	this.shape_1.setTransform(119.1938,19.5017);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgMApIANhRIANAAIgOBRg");
	this.shape_2.setTransform(114.8,18.225);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgNApIAOhRIAMAAIgNBRg");
	this.shape_3.setTransform(112,18.225);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgOAbQgFgEgDgGQgDgHABgIIAAgCQABgIAEgHQAFgHAGgDQAGgEAHAAQAKAAAGAIQAFAIgBANIgBAEIgjAAQgBAHADAFQAEAEAFAAQAIAAAHgHIAGAGQgEAGgGADQgFACgHAAQgHAAgGgDgAgKgEIAXAAIAAgBIAAgFQAAgEgDgCQgCgCgEgBQgJAAgFAPg");
	this.shape_4.setTransform(107.6452,19.4472);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AABAqQgJAAgFgIIgCAHIgLAAIANhSIANAAIgGAeQAGgHAJABQAJAAAEAGQAFAGABAJIgBAIQgBAJgEAHQgDAHgGAEQgFADgGAAIgBAAgAgHAAIgEAYQADAHAHAAQAGAAAEgFQAEgFABgJIAAgHQAAgFgCgDQgCgEgFAAIgBAAQgGAAgFAHg");
	this.shape_5.setTransform(101.55,18.2781);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgKAdQgFAAgEgCQgEgDgBgFQgCgFABgGIAGglIANAAIgGAlIgBAEQABAGAGABQAIAAAFgHIAHgpIANAAIgKA5IgMAAIABgFQgGAHgJAAIgBgBg");
	this.shape_6.setTransform(95.7938,19.5017);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgTAeIAKg5IALAAIgBAGQAGgIAIAAIAFABIgCANIgFgBQgIAAgFAHIgGAng");
	this.shape_7.setTransform(90.975,19.375);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgSAZQgGgGAAgIIAMAAQAAAFADACQADACAEAAQAEAAADgBQADgCABgEQABgFgIgCIgKgEQgLgDABgKQAAgIAHgFQAHgFAIAAQAJAAAGAFQAGAFAAAJIgNAAQAAgEgCgDQgCgCgEAAQgEAAgCACQgEACAAADQgBAFAHACIALAEQALADgBAKQAAAGgDAEQgEAEgFACQgGACgFAAQgKAAgGgFg");
	this.shape_8.setTransform(83.3019,19.4479);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgKAdQgFAAgEgCQgEgDgBgFQgCgFABgGIAGglIANAAIgGAlIgBAEQABAGAGABQAIAAAFgHIAHgpIANAAIgKA5IgMAAIABgFQgGAHgJAAIgBgBg");
	this.shape_9.setTransform(77.7438,19.5017);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgPAaQgFgDgCgHQgDgHABgIIAAgBQABgIAEgHQAEgHAGgDQAHgEAHAAQAJAAAGAGQAFAGAAAKIgMAAQAAgFgCgDQgDgDgEgBQgHAAgEAHQgEAGgBALQAAAPAKAAQAEAAAEgDQADgCABgFIAMAAQgBAGgDAEQgEAFgFADQgGACgFAAQgHAAgGgEg");
	this.shape_10.setTransform(71.8857,19.4472);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgMAoIAKg5IAMAAIgKA5gAABgbQgBgCAAgDQAAgDABgCQACgCADAAQADAAACACQACACAAADQAAADgCACQgCACgDAAIgBAAQgBAAAAAAQgBgBAAAAQgBAAAAAAQgBgBAAAAg");
	this.shape_11.setTransform(67.675,18.345);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgTAeIAKg5IALAAIgBAGQAGgIAIAAIAFABIgCANIgFgBQgIAAgFAHIgGAng");
	this.shape_12.setTransform(64.475,19.375);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAAAqQgIAAgFgIIgCAHIgMAAIAPhSIAMAAIgFAeQAFgHAJABQAIAAAGAGQAEAGAAAJIAAAIQgBAJgEAHQgDAHgGAEQgFADgGAAIgCAAgAgHAAIgEAYQADAHAHAAQAFAAAFgFQAEgFABgJIABgHQgBgFgCgDQgCgEgFAAIgBAAQgGAAgFAHg");
	this.shape_13.setTransform(59.2,18.2781);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAYAeIAGglIAAgEQgBgHgHAAQgIAAgEAJIAAABIgHAmIgMAAIAHglIAAgEQgBgHgHAAQgIAAgEAHIgIApIgMAAIAKg5IAMAAIgCAGQAIgIAKABQAEAAAEACQADADACADQAIgJAKABQAJAAAEAFQAEAGgBAKIgGAlg");
	this.shape_14.setTransform(51.41,19.3984);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgKAdQgFAAgEgCQgEgDgBgFQgCgFABgGIAGglIANAAIgGAlIgBAEQABAGAGABQAIAAAFgHIAHgpIANAAIgKA5IgMAAIABgFQgGAHgJAAIgBgBg");
	this.shape_15.setTransform(44.0938,19.5017);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgYAnIAOhNIAMAAIgLBCIAiAAIgCALg");
	this.shape_16.setTransform(37.825,18.45);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FF8C2D").s().p("AoGhYIQNgEIAAC0IwNAFg");
	this.shape_17.setTransform(81.525,19.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(21,-75,122.1,103.5);


(lib.btnAnim = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_4
	this.instance = new lib.flash0aiAssets_2();
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


(lib.bg1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0097E6").s().p("A82E7Qg1AAAAgYIAApFQAAgXA1AAMA5tAAAQA1AAABAXIAAJFQgBAYg1AAg");
	this.shape.setTransform(-20.05,1.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg1, new cjs.Rectangle(-210.1,-30,380.1,62.9), null);


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
	this.instance = new lib._1();
	this.instance.setTransform(-229,-134,0.8371,0.8338);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg10, new cjs.Rectangle(-229,-134,459,267.1), null);


(lib.bg1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#34495E").s().p("A82E7Qg1AAAAgYIAApFQAAgXA1AAMA5tAAAQA1AAABAXIAAJFQgBAYg1AAg");
	this.shape_1.setTransform(-20.05,1.45);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg1_1, new cjs.Rectangle(-210.1,-30,380.1,62.9), null);


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
	this.instance.setTransform(43.25,-40.25);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


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
	this.instance = new lib.flash0aiAssets_4();
	this.instance.setTransform(-16,0,0.4248,0.4247);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_3
	this.instance_1 = new lib.benaracopy2d();
	this.instance_1.setTransform(128.8,32.4,1,1,0,0,0,162.4,46.8);
	this.instance_1.shadow = new cjs.Shadow("rgba(0,0,0,1)",3,3,4);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.fff, new cjs.Rectangle(-36.6,-17.4,338,107), null);


(lib.Slots10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// slots
	this.kotakKartuSembunyi = new lib.target();
	this.kotakKartuSembunyi.name = "kotakKartuSembunyi";
	this.kotakKartuSembunyi.setTransform(483.9,628.5);

	this.kotakKartu2 = new lib.target();
	this.kotakKartu2.name = "kotakKartu2";
	this.kotakKartu2.setTransform(494.9,371.55,1,1,0,0,0,11,0);

	this.salahd = new lib.drag15G5();
	this.salahd.name = "salahd";
	this.salahd.setTransform(288.55,421.2,0.9806,0.9806,0,0,0,82.2,24.7);

	this.bener = new lib.drag15G1();
	this.bener.name = "bener";
	this.bener.setTransform(288.7,312.25,0.9806,0.9806,0,0,0,82.2,-23.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.bener},{t:this.salahd},{t:this.kotakKartu2},{t:this.kotakKartuSembunyi}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Slots10, new cjs.Rectangle(228.6,261.5,323.29999999999995,389.6), null);


(lib.Pieces10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// pieces
	this.ssss = new lib.drop15G5();
	this.ssss.name = "ssss";
	this.ssss.setTransform(719.25,417.55,0.5115,0.5115,0,0,0,160.6,26);
	new cjs.ButtonHelper(this.ssss, 0, 1, 1);

	this.bener = new lib.drop15G1();
	this.bener.name = "bener";
	this.bener.setTransform(718.35,311.15,0.5115,0.5115,0,0,0,198.7,78.4);
	new cjs.ButtonHelper(this.bener, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.bener},{t:this.ssss}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces10, new cjs.Rectangle(607.5,256.1,221.5,205.89999999999998), null);


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


(lib.anim1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		var s =
		  "Di waktu yang sama, anak seorang nelayan sakit typus dan sang nelayan tidak memiliki biaya untuk berobat, sehingga untuk mengobati anaknya nelayan tersebut menggunakan bahan alami yang terdapat di lingkungan sekitarnya.                                        ";
		
		var F = f.bind(this);
		
		var fI;
		
		clearInterval(fI);
		
		fI = setInterval(F, 50);
		
		function f(e) {
		  if (this.coba.text.length < s.length) {
		    this.coba.text += s.charAt(this.coba.text.length);
		  } else {
		    clearInterval(fI);
		  }
		
		  if (this.coba.text.length >= s.length) {
		    // setTimeout(function () {
		    // }, 1500);
		    this.play();
		  }
		}
	}
	this.frame_964 = function() {
		this.stop();
		var s =
		  "Yuk bantu bapak nelayan untuk memilih hewan yang dapat dijadikan sebagai obat typus";
		
		var F = f.bind(this);
		
		var fI;
		
		clearInterval(fI);
		
		fI = setInterval(F, 50);
		
		function f(e) {
		  if (this.coba.text.length < s.length) {
		    this.coba.text += s.charAt(this.coba.text.length);
		  } else {
		    clearInterval(fI);
		  }
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(964).call(this.frame_964).wait(1));

	// Layer_1
	this.coba = new cjs.Text("", "28px 'Roboto'");
	this.coba.name = "coba";
	this.coba.lineHeight = 39;
	this.coba.lineWidth = 767;
	this.coba.parent = this;
	this.coba.setTransform(-330.29,-124,0.8604,1);

	this.instance = new lib._1e();
	this.instance.setTransform(-332,-194,0.6902,0.6904);

	this.instance_1 = new lib._2e();
	this.instance_1.setTransform(-332,-194,0.6902,0.6904);

	this.instance_2 = new lib._3e();
	this.instance_2.setTransform(-332,-194,0.6902,0.6904);

	this.instance_3 = new lib._4e();
	this.instance_3.setTransform(-332,-194,0.6917,0.6929);

	this.instance_4 = new lib._5e();
	this.instance_4.setTransform(-332,-194,0.6917,0.6929);

	this.instance_5 = new lib._6eEdit();
	this.instance_5.setTransform(-332,-194,1.0031,1.0051);

	this.instance_6 = new lib._7e();
	this.instance_6.setTransform(-332,-194,0.6917,0.6929);

	this.instance_7 = new lib._8e();
	this.instance_7.setTransform(-332,-194,0.6917,0.6929);

	this.instance_8 = new lib._9pngcopy();
	this.instance_8.setTransform(-332,-194,1.0024,1.0041);

	this.instance_9 = new lib._9();
	this.instance_9.setTransform(-332,-194,0.6917,0.6929);

	this.instance_10 = new lib._2e1();
	this.instance_10.setTransform(-332,-194,1.0024,1.0023);

	this.instance_11 = new lib._3e1();
	this.instance_11.setTransform(-332,-194,1.0024,1.0023);

	this.instance_12 = new lib._2e11();
	this.instance_12.setTransform(-332,-194,1.0024,1.0005);

	this.instance_13 = new lib.selesai();
	this.instance_13.setTransform(0,-0.05,1,1,0,0,0,85,25.7);

	this.instance_14 = new lib.fd();
	this.instance_14.setTransform(0,0,1,1,0,0,0,332,194);
	this.instance_14.filters = [new cjs.ColorFilter(0.41, 0.41, 0.41, 1, 0, 0, 0, 0)];
	this.instance_14.cache(-2,-2,668,392);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.coba,p:{scaleX:0.8604,x:-330.29,y:-124,text:"",font:"28px 'Roboto'",color:"#000000",textAlign:"",lineHeight:38.6,lineWidth:767}}]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1}]},52).to({state:[{t:this.instance_2}]},56).to({state:[{t:this.instance_3}]},55).to({state:[{t:this.instance_4}]},62).to({state:[{t:this.instance_5}]},93).to({state:[{t:this.instance_6}]},128).to({state:[{t:this.instance_7}]},53).to({state:[{t:this.instance_9},{t:this.instance_8}]},61).to({state:[{t:this.coba,p:{scaleX:1,x:-10.95,y:-69.45,text:"Kemudian mereka masuk ke dalam rumah",font:"52px 'Roboto'",color:"#2C3E50",textAlign:"center",lineHeight:64.4,lineWidth:591}}]},71).to({state:[{t:this.instance_10}]},72).to({state:[{t:this.instance_11}]},62).to({state:[{t:this.coba,p:{scaleX:1,x:-10.5,y:-64.45,text:"Lalu Bapak berusaha mencari obat dari hewan jenis cacing",font:"52px 'Roboto'",color:"#2C3E50",textAlign:"center",lineHeight:64.4,lineWidth:804}}]},54).to({state:[{t:this.instance_12}]},50).to({state:[{t:this.instance_12}]},19).to({state:[{t:this.instance_14},{t:this.instance_13}]},56).to({state:[{t:this.coba,p:{scaleX:1,x:-333,y:-142,text:"",font:"28px 'Roboto'",color:"#000000",textAlign:"",lineHeight:38.6,lineWidth:662}}]},19).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-414.4,-194,807.9,388);


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
	this.bener = new lib.drop15G1();
	this.bener.name = "bener";
	this.bener.setTransform(254.5,-22.6,0.8895,0.8895,0,0,0,198.4,78.2);
	new cjs.ButtonHelper(this.bener, 0, 1, 1);

	this.bener_1 = new lib.drag15G1();
	this.bener_1.name = "bener_1";
	this.bener_1.setTransform(-138.9,-21.8,3.0306,3.0306,0,0,0,82.1,-23.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.bener_1},{t:this.bener}]},12).to({state:[]},1).wait(12));

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
	this.exit.setTransform(448.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);
	this.exit._off = true;

	this.timeline.addTween(cjs.Tween.get(this.exit).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_7
	this.dd = new lib.anim1();
	this.dd.name = "dd";
	this.dd.setTransform(46.9,-20.1);
	this.dd._off = true;

	this.timeline.addTween(cjs.Tween.get(this.dd).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_6
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Eg9EAe+QhzAAABhzMAAAg6VQgBhzBzAAMB6JAAAQBzAAAABzMAAAA6VQAABzhzAAg");
	this.shape.setTransform(43.25,-20.25);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgfCmIAAjtIA/AAIAADtgAgZhtQgKgJABgOQAAgPAJgJQAJgJAQAAQAQAAAKAJQAKAJAAAPQAAAOgKAJQgKAKgQAAQgPAAgKgKg");
	this.shape_1.setTransform(120,-243.875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgzBxQgXgLgNgTQgNgSAAgWIA8AAQABARAMAJQALAJASAAQATAAAJgHQAKgHgBgLQAAgMgLgGQgMgHgYgFQhVgSAAg1QAAggAagVQAagVAqAAQAuAAAbAVQAbAVAAAiIhAAAQAAgNgIgJQgJgJgTAAQgPAAgJAHQgJAIAAALQAAAKAKAHQALAGAWAFQAYAFAQAGQAyARAAAtQAAAhgbAUQgdAUgrAAQgdAAgYgKg");
	this.shape_2.setTransform(102.35,-239.175);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AhRBnQgYgUAAgfQAAgmAdgTQAcgUA0AAIAdAAIAAgOQAAgQgJgKQgIgKgRAAQgQAAgKAHQgJAIAAAOIhAAAQAAgVANgSQANgRAXgKQAXgKAcAAQAsAAAaAWQAaAWAAAoIAABmQAAAiAKARIAAAEIhAAAQgFgJgCgNQgXAagkAAQgjAAgWgUgAgpAsIAAADQAAAMAIAIQAJAIAOAAQANAAAMgHQAMgGAGgKIAAgpIgYAAQgvAAgDAhg");
	this.shape_3.setTransform(78.9,-239.175);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("ABqB5IAAiXQAAgTgHgKQgIgJgUAAQgdgBgLAcIAACiIg+AAIAAiXQAAgUgIgJQgIgJgUAAQgbgBgMAXIAACnIg/AAIAAjsIA7AAIACAaQAZgfArAAQAtAAARAkQAZgkAvAAQAmAAATAXQATAWAAAtIAACXg");
	this.shape_4.setTransform(47.375,-239.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgfCmIAAjtIA/AAIAADtgAgYhtQgLgJABgOQAAgPAJgJQAJgJAQAAQAQAAAKAJQAKAJAAAPQAAAOgKAJQgKAKgQAAQgPAAgJgKg");
	this.shape_5.setTransform(21.9,-243.875);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgIgJQgKgJgUAAQgaAAgNAWIAACnIg/AAIAAjsIA7AAIACAbQAaggApAAQAnAAARAWQATAXABAsIAACYg");
	this.shape_6.setTransform(3.3,-239.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("ABQCgIgWhCIhzAAIgWBCIhGAAIB3k/IA8AAIB4E/gAgnApIBPAAIgoh3g");
	this.shape_7.setTransform(-24.425,-243.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]},12).to({state:[]},1).wait(12));

	// Layer_2
	this.instance = new lib.Tween7("synched",0);
	this.instance.setTransform(43.5,-40.25);
	this.instance.alpha = 0;

	this.instance_1 = new lib.Symbol99("synched",0);
	this.instance_1.setTransform(43.2,-40.2,1,1,0,0,0,42.2,-40.2);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:42.25,alpha:0.1719},2).to({_off:true,regX:42.2,regY:-40.2,x:43.2,y:-40.2,alpha:1},10).to({_off:false,regX:0,regY:0,x:43.5,y:-40.25,alpha:0},12).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2).to({_off:false},10).to({_off:true,regX:0,regY:0,x:43.5,y:-40.25,alpha:0},12).wait(1));

	// Layer_3
	this.cobaBG = new lib.Tween10();
	this.cobaBG.name = "cobaBG";
	this.cobaBG.setTransform(43.75,-42.75,1.1855,0.9051,0,0,0,0.2,-0.1);
	this.cobaBG.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.cobaBG).to({x:44.75,alpha:0.75},12).to({x:43.75,alpha:0},12).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-436.6,-314.2,961.2,543.2);


// stage content:
(lib.RECOVER_materi8 = function(mode,startPosition,loop) {
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
		  window.location.replace("../materi9/index.html");
		});
		
		root.btnBack3.on("click", function () {
		  window.location.replace("../game18/index.html");
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
			if (pieces.count === 1) root.onWin();
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
		  Score.text = pieces.skor * 100;
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

	// Layer_3
	this.popUpJawabanAkhir = new lib.popUpJawabanAkhir();
	this.popUpJawabanAkhir.name = "popUpJawabanAkhir";
	this.popUpJawabanAkhir.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.popUpJawabanAkhir).wait(1));

	// popUpJawaban
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

	// suara
	this.nyala = new lib.ggg();
	this.nyala.name = "nyala";
	this.nyala.setTransform(741.1,38,0.6758,0.6758,0,0,0,-16.2,-1.1);
	new cjs.ButtonHelper(this.nyala, 0, 1, 2, false, new lib.ggg(), 3);

	this.tandaSuaraOn = new lib.an_Image({'id': 'tandaSuaraOn', 'src':'images/animation_500_kdvpuxkb.gif', 'alt':'image', 'border':'0', 'visible':true, 'class':'ui-image'});

	this.tandaSuaraOn.name = "tandaSuaraOn";
	this.tandaSuaraOn.setTransform(676,31.85,0.4105,0.4105,0,0,0,50.2,45.2);

	this.hening = new lib.dsdsd();
	this.hening.name = "hening";
	this.hening.setTransform(741.1,38,0.6758,0.6758,0,0,0,-16.2,-1.1);
	new cjs.ButtonHelper(this.hening, 0, 1, 2, false, new lib.dsdsd(), 3);

	this.tandaSuaraOff = new lib.an_Image({'id': 'tandaSuaraOff', 'src':'images/animation_500_kdvpuxkb.gif', 'alt':'image', 'border':'0', 'visible':true, 'class':'ui-image'});

	this.tandaSuaraOff.name = "tandaSuaraOff";
	this.tandaSuaraOff.setTransform(676,31.85,0.4105,0.4105,0,0,0,50.2,45.2);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgNASQgEgDAAgGQAAgGAFgDQAFgEAJAAIAHAAIAAgDQAAgEgDgCQgCgDgEAAQgDAAgDACQgDACAAADIgHAAQAAgDACgDIAGgFQAEgBAEAAQAHAAAFADQAEAEAAAGIAAATQAAAGACAEIAAAAIgIAAIgBgEQgFAFgGAAQgHAAgEgEgAgKAIQAAAEADACQACACAEAAQACAAADgCQADgCACgDIAAgJIgGAAQgNAAAAAIg");
	this.shape.setTransform(680.875,57.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAWIAAgqIAGAAIABAFQADgGAGAAIAEABIAAAGIgFAAQgGAAgCAGIAAAeg");
	this.shape_1.setTransform(677.45,57.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgNASQgEgDAAgGQAAgGAFgDQAFgEAJAAIAHAAIAAgDQAAgEgDgCQgCgDgEAAQgDAAgDACQgDACAAADIgHAAQAAgDACgDIAGgFQAEgBAEAAQAHAAAFADQAEAEAAAGIAAATQAAAGACAEIAAAAIgIAAIgBgEQgFAFgGAAQgHAAgEgEgAgKAIQAAAEADACQACACAEAAQACAAADgCQADgCACgDIAAgJIgGAAQgNAAAAAIg");
	this.shape_2.setTransform(673.675,57.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgMASQgEgEAAgIIAAgbIAHAAIAAAbQAAAKAIAAQAIAAADgHIAAgeIAHAAIAAAqIgHAAIAAgEQgEAFgIAAQgHAAgDgEg");
	this.shape_3.setTransform(669.225,57.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJAbQgFgCgDgEQgDgEAAgFIAIAAQAAAFADADQAFADAFAAQAGAAAEgCQADgDAAgEQAAgEgDgCQgEgDgHgCQgJgDgEgDQgFgEAAgGQAAgHAGgEQAFgFAHAAQAGAAAGACQAEADACAEQADAEAAAFIgHAAQgBgGgDgDQgDgDgHAAQgEAAgDADQgDACgBAFQAAADADADQAEACAGACQAHACAEACQAEACACADQACAEAAAEQAAAHgGAEQgFAFgJAAQgFAAgFgDg");
	this.shape_4.setTransform(664.55,56.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3498DB").s().p("Aj8D9QhphpAAiUQAAiTBphqQBphoCTAAQCVAABoBoQBpBqAACTQAACUhpBpQhoBpiVAAQiTAAhphpg");
	this.shape_5.setTransform(675.8705,37.2545,0.9301,0.9301);

	this.instance = new lib.hehe();
	this.instance.setTransform(714.4,37.3,0.7145,0.9301,0,0,0,86.2,36);
	this.instance.shadow = new cjs.Shadow("rgba(0,0,0,1)",3,3,4);
	this.instance.cache(-2,-2,176,76);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.tandaSuaraOff},{t:this.hening},{t:this.tandaSuaraOn},{t:this.nyala}]}).wait(1));

	// animasi
	this.popUpAnim1 = new lib.popUpAnimasi();
	this.popUpAnim1.name = "popUpAnim1";
	this.popUpAnim1.setTransform(485.6,285.3,1,1,0,0,0,50.2,-28.9);

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

	// Layer_4
	this.btnAnim1 = new lib.btnAnim();
	this.btnAnim1.name = "btnAnim1";
	this.btnAnim1.setTransform(460.15,279.65,0.4113,0.4113,0,0,0,56.9,68.3);
	new cjs.ButtonHelper(this.btnAnim1, 0, 1, 2, false, new lib.btnAnim(), 3);

	this.timeline.addTween(cjs.Tween.get(this.btnAnim1).wait(1));

	// base
	this.btnInfo = new lib.btnInfo();
	this.btnInfo.name = "btnInfo";
	this.btnInfo.setTransform(892.55,53.3,0.6435,0.6435);
	new cjs.ButtonHelper(this.btnInfo, 0, 1, 2, false, new lib.btnInfo(), 3);

	this.restart = new lib.Restart();
	this.restart.name = "restart";
	this.restart.setTransform(715.95,176.75,0.7541,0.7541,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.restart, 0, 1, 2, false, new lib.Restart(), 3);

	this.pieces = new lib.Pieces10();
	this.pieces.name = "pieces";
	this.pieces.setTransform(-38.1,10);

	this.slots = new lib.Slots10();
	this.slots.name = "slots";
	this.slots.setTransform(-21.85,10.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgIBBQgDgDAAgEQAAgEADgDQACgDAFAAQAEAAADADQACADAAAEQAAAEgCADQgDACgEAAQgFAAgCgCgAgKAdQAAgLACgGQADgGAFgHIAMgMQAIgJAAgJQAAgKgFgFQgFgGgKAAQgIAAgGAFQgFAFAAAIIgQAAQAAgOAKgJQAKgJAPAAQARAAAKAJQAJAJAAAQQAAAQgOAPIgKAJQgHAHABAOg");
	this.shape_6.setTransform(703.4,217.825);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgeAqQgKgJAAgOIARAAQAAAIAFAFQAFAFAKAAQAHAAAHgDQAGgFABgHQACgJgNgFIgQgFQgVgGAAgRQABgNALgJQALgIAOAAQAPAAAKAJQAJAIAAAOIgRAAQABgHgGgFQgEgEgIgBQgIAAgGAEQgFAFgBAGQgCAJAMAEIAHABQARAFAHAGQAHAHAAAKQgBAJgFAHQgFAHgKADQgJAEgJAAQgPAAgLgJg");
	this.shape_7.setTransform(694.1502,219.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AglAoQgHgKACgQIALg/IAQAAIgKA/IgBAHQABAHADAEQAEAEAGgBQAQABAKgPIAMhGIARAAIgRBhIgQAAIACgKQgLAMgRAAQgOAAgHgKg");
	this.shape_8.setTransform(684.9028,219.65);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgvBFIAYiHIAOAAIgCALQAMgNAQAAQAOABAJAKQAHAKABASIAAALIgBACQgCAPgGALQgGAMgJAGQgKAFgLAAQgQAAgJgLIgJAvgAgLgoIgJAuQAGANAOAAQALABAIgKQAJgKADgSIABgIQAAgNgGgHQgEgHgKAAIgBAAQgNAAgJANg");
	this.shape_9.setTransform(673.9,221.325);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgwBDIAAgOIAFABQAIABAGgEQAFgFAEgIIAHgLIgRhfIARAAIAKBJIAjhJIASAAIg6BxQgMAYgTAAIgJgCg");
	this.shape_10.setTransform(665,221.55);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgPA3QgFgIACgLIAKg8IgSAAIACgNIASAAIAEgXIAPAAIgEAXIASAAIgCANIgSAAIgKA8IAAAEQABAIAGgBIAIAAIgBANIgLACQgKgBgFgGg");
	this.shape_11.setTransform(658.2,218.45);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgCA3QgGgHAAgNIAAg7IgSAAIAAgNIASAAIAAgYIAQAAIAAAYIASAAIAAANIgSAAIAAA8QAAAFADADQACADAFAAIAIgBIAAAOQgGACgGAAQgLAAgFgHg");
	this.shape_12.setTransform(647,218.475);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgIBDIAAhhIAQAAIAABhgAgGgxQgDgDAAgEQAAgEADgDQACgDAEAAQAFAAACADQADADAAAEQAAAEgDADQgCACgFAAQgEAAgCgCg");
	this.shape_13.setTransform(641.975,217.775);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAUBGIghguIgKALIAAAjIgRAAIAAiLIARAAIAABUIAJgLIAeggIAUAAIglApIApA5g");
	this.shape_14.setTransform(635.7,217.5);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgeArQgJgJAAgMQAAgPALgIQAMgIAUAAIAQAAIAAgIQAAgJgFgFQgFgGgKABQgIAAgGAEQgHAFAAAGIgQAAQAAgHAFgHQAFgHAJgEQAJgEAKAAQAQAAAKAIQAKAJAAAPIAAAsQAAAOADAHIAAACIgRAAQgCgDAAgIQgMANgPAAQgPAAgJgIgAgXATQAAAJAGAEQAFAEAIAAQAHAAAHgEQAHgEADgHIAAgUIgNAAQgeABAAARg");
	this.shape_15.setTransform(625.275,219.55);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgdBFIgGgCIAAgNIAEAAQAJAAAFgDQAEgEADgJIAEgKIgjhgIATAAIAXBJIAXhJIASAAIgoBwQgIAZgUAAg");
	this.shape_16.setTransform(615.875,221.525);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AAWAyIAAhAQAAgKgFgGQgEgEgLAAQgHAAgGAEQgGAEgEAHIAABFIgRAAIAAhhIAQAAIABANQALgPASAAQAfAAAAAjIAABAg");
	this.shape_17.setTransform(606.35,219.45);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgcAmQgMgNAAgXIAAgCQgBgOAGgMQAFgLALgGQAKgHAKAAQATAAALANQALAMAAAYIAAAGIhCAAQABAOAHAJQAJAJALAAQAJAAAGgDQAHgEAEgGIALAIQgNATgYAAQgUAAgMgNgAgPgcQgGAHgDANIAxAAIAAgBQgBgNgGgHQgGgHgLAAQgJAAgHAIg");
	this.shape_18.setTransform(596.4,219.55);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgoBFIAAiHIAPAAIABALQAKgNARAAQASAAAKAOQAKANAAAYIAAABQAAAWgKANQgKAOgRAAQgSAAgJgLIAAAvgAgXgoIAAAuQAHANAPAAQAMAAAGgJQAIgKgBgSQABgQgIgKQgGgJgMAAQgPAAgHANg");
	this.shape_19.setTransform(586.35,221.325);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgIBDIAAhhIAQAAIAABhgAgGgxQgDgDAAgEQAAgEADgDQACgDAEAAQAFAAACADQADADAAAEQAAAEgDADQgCACgFAAQgEAAgCgCg");
	this.shape_20.setTransform(574.125,217.775);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgCA3QgGgHAAgNIAAg7IgRAAIAAgNIARAAIAAgYIAQAAIAAAYIASAAIAAANIgSAAIAAA8QAAAFADADQACADAGAAIAIgBIAAAOQgHACgGAAQgMAAgEgHg");
	this.shape_21.setTransform(568.55,218.475);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgeArQgJgJAAgMQAAgPALgIQAMgIAUAAIAQAAIAAgIQAAgJgFgFQgFgGgKABQgIAAgGAEQgHAFAAAGIgQAAQAAgHAFgHQAFgHAJgEQAJgEAKAAQAQAAAKAIQAKAJAAAPIAAAsQAAAOADAHIAAACIgRAAQgCgDAAgIQgMANgPAAQgPAAgJgIgAgXATQAAAJAGAEQAFAEAIAAQAHAAAHgEQAHgEADgHIAAgUIgNAAQgeABAAARg");
	this.shape_22.setTransform(560.725,219.55);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgYA5IgBAMIgPAAIAAiLIARAAIAAA0QAJgNASABQARAAALANQAKANgBAXIAAACQABAWgKAOQgLAOgRgBQgSAAgKgNgAgXgBIAAAqQAHAPAQAAQALAAAHgJQAHgJAAgUQAAgQgHgJQgHgJgLAAQgQAAgHAPg");
	this.shape_23.setTransform(550.7,217.6);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgfAlQgNgOAAgXIAAAAQAAgPAGgLQAGgLAKgHQAKgGAMAAQAUAAAMAOQANAOAAAWIAAABQAAAPgGALQgFALgKAHQgLAGgNAAQgTAAgMgOgAgTgaQgIAJAAASQAAAQAIALQAHAJAMAAQANAAAHgKQAIgKAAgRQAAgQgIgKQgHgKgNAAQgLAAgIAKg");
	this.shape_24.setTransform(539.925,219.55);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgUBBQgKgFgGgIIAJgKQALAOAQAAQALAAAHgHQAGgHABgNIAAgIQgLAMgQAAQgRAAgKgOQgMgOAAgXQAAgXAMgNQAKgOASAAQAQAAALANIAAgLIAQAAIAABeQAAATgMALQgLALgTAAQgJAAgLgEgAgRgsQgGAJgBATQABAQAGAJQAHAJALAAQAQAAAIgOIAAgsQgIgOgQAAQgKAAgIAKg");
	this.shape_25.setTransform(529.25,221.375);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAWAyIAAhAQAAgKgFgGQgFgEgJAAQgIAAgGAEQgGAEgDAHIAABFIgSAAIAAhhIARAAIAAANQAMgPAQAAQAfAAABAjIAABAg");
	this.shape_26.setTransform(519.1,219.45);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgcAmQgNgNAAgXIAAgCQABgOAFgMQAGgLAJgGQAKgHALAAQAUAAAKANQAKAMAAAYIAAAGIhBAAQAAAOAJAJQAHAJAMAAQAJAAAHgDQAFgEAFgGIAKAIQgMATgZAAQgSAAgNgNgAgPgcQgGAHgCANIAwAAIAAgBQgBgNgGgHQgGgHgLAAQgJAAgHAIg");
	this.shape_27.setTransform(509.15,219.55);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AA0AyIAAhAQAAgKgFgGQgFgEgLAAQgJAAgGAFQgHAFgBAKIAABAIgPAAIAAg/QAAgWgVABQgRgBgGAOIAABHIgRAAIAAhhIAQAAIABALQAKgNATAAQAUAAAHAQQAFgHAHgEQAIgFALAAQAgAAABAiIAABBg");
	this.shape_28.setTransform(496.025,219.45);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgCA3QgGgHAAgNIAAg7IgRAAIAAgNIARAAIAAgYIAQAAIAAAYIASAAIAAANIgSAAIAAA8QAAAFACADQADADAGAAIAIgBIAAAOQgHACgGAAQgMAAgEgHg");
	this.shape_29.setTransform(480,218.475);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgeArQgJgJAAgMQAAgPALgIQAMgIAUAAIAQAAIAAgIQAAgJgFgFQgFgGgKABQgIAAgGAEQgHAFAAAGIgQAAQAAgHAFgHQAFgHAJgEQAJgEAKAAQAQAAAKAIQAKAJAAAPIAAAsQAAAOADAHIAAACIgRAAQgCgDAAgIQgMANgPAAQgPAAgJgIgAgXATQAAAJAGAEQAFAEAIAAQAHAAAHgEQAHgEADgHIAAgUIgNAAQgeABAAARg");
	this.shape_30.setTransform(472.175,219.55);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgoBFIAAiHIAPAAIABALQAKgNARAAQASAAAKAOQAKANAAAYIAAABQAAAWgKANQgKAOgRAAQgRAAgKgLIAAAvgAgXgoIAAAuQAHANAPAAQAMAAAGgJQAIgKgBgSQABgQgIgKQgGgJgMAAQgPAAgHANg");
	this.shape_31.setTransform(462.15,221.325);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgeArQgJgJAAgMQAAgPALgIQAMgIAUAAIAQAAIAAgIQAAgJgFgFQgFgGgKABQgIAAgGAEQgHAFAAAGIgQAAQAAgHAFgHQAFgHAJgEQAJgEAKAAQAQAAAKAIQAKAJAAAPIAAAsQAAAOADAHIAAACIgRAAQgCgDAAgIQgMANgPAAQgPAAgJgIgAgXATQAAAJAGAEQAFAEAIAAQAHAAAHgEQAHgEADgHIAAgUIgNAAQgeABAAARg");
	this.shape_32.setTransform(451.675,219.55);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgdA5QgLgOAAgXIAAgCQAAgVALgOQAKgOARABQAQgBAKAMIAAgzIASAAIAACLIgQAAIgBgLQgKAMgRAAQgRABgKgOgAgRgHQgHAJABATQgBARAHAIQAHAKALAAQAQAAAHgOIAAgsQgHgOgQAAQgLAAgHAJg");
	this.shape_33.setTransform(441.25,217.6);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgUBBQgKgFgGgIIAJgKQALAOAQAAQALAAAHgHQAGgHABgNIAAgIQgKAMgRAAQgRAAgKgOQgMgOAAgXQAAgXAMgNQAKgOASAAQAQAAALANIAAgLIAQAAIAABeQAAATgMALQgLALgTAAQgJAAgLgEgAgRgsQgGAJgBATQABAQAGAJQAHAJALAAQAQAAAIgOIAAgsQgIgOgQAAQgKAAgIAKg");
	this.shape_34.setTransform(426.2,221.375);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AAWAyIAAhAQAAgKgFgGQgFgEgJAAQgIAAgGAEQgGAEgDAHIAABFIgSAAIAAhhIARAAIAAANQAMgPAQAAQAfAAABAjIAABAg");
	this.shape_35.setTransform(416.05,219.45);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgeArQgJgJAAgMQAAgPALgIQAMgIAUAAIAQAAIAAgIQAAgJgFgFQgFgGgKABQgIAAgGAEQgHAFAAAGIgQAAQAAgHAFgHQAFgHAJgEQAJgEAKAAQAQAAAKAIQAKAJAAAPIAAAsQAAAOADAHIAAACIgRAAQgCgDAAgIQgMANgPAAQgPAAgJgIgAgXATQAAAJAGAEQAFAEAIAAQAHAAAHgEQAHgEADgHIAAgUIgNAAQgeABAAARg");
	this.shape_36.setTransform(405.925,219.55);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgdBFIgGgCIAAgNIAEAAQAJAAAFgDQAEgEADgJIAEgKIgjhgIATAAIAXBJIAXhJIASAAIgoBwQgIAZgUAAg");
	this.shape_37.setTransform(396.525,221.525);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AAWAyIAAhAQAAgKgFgGQgFgEgJAAQgIAAgGAEQgGAEgDAHIAABFIgSAAIAAhhIARAAIAAANQAMgPAQAAQAgAAAAAjIAABAg");
	this.shape_38.setTransform(382.4,219.45);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgeArQgJgJAAgMQAAgPALgIQAMgIAUAAIAQAAIAAgIQAAgJgFgFQgFgGgKABQgIAAgGAEQgHAFAAAGIgQAAQAAgHAFgHQAFgHAJgEQAJgEAKAAQAQAAAKAIQAKAJAAAPIAAAsQAAAOADAHIAAACIgRAAQgCgDAAgIQgMANgPAAQgPAAgJgIgAgXATQAAAJAGAEQAFAEAIAAQAHAAAHgEQAHgEADgHIAAgUIgNAAQgeABAAARg");
	this.shape_39.setTransform(372.225,219.55);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AAYAxIgYhJIgWBJIgOAAIgdhhIARAAIATBJIAXhJIAMAAIAYBKIAThKIARAAIgdBhg");
	this.shape_40.setTransform(360.25,219.55);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgcAmQgMgNAAgXIAAgCQgBgOAGgMQAFgLALgGQAKgHAKAAQATAAALANQALAMAAAYIAAAGIhCAAQABAOAHAJQAJAJALAAQAJAAAGgDQAHgEAEgGIALAIQgNATgYAAQgUAAgMgNgAgPgcQgGAHgDANIAxAAIAAgBQgBgNgGgHQgGgHgLAAQgJAAgHAIg");
	this.shape_41.setTransform(348.45,219.55);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AAWBGIAAhBQAAgKgFgFQgEgFgLAAQgHAAgGAFQgGAEgDAGIAABGIgRAAIAAiLIARAAIAAA1QAKgOASABQAeAAAAAiIAABBg");
	this.shape_42.setTransform(338.35,217.5);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AAWBGIAAhBQAAgKgFgFQgEgFgLAAQgHAAgGAFQgGAEgDAGIAABGIgRAAIAAiLIARAAIAAA1QAKgOASABQAeAAAAAiIAABBg");
	this.shape_43.setTransform(323.6,217.5);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgeArQgJgJAAgMQAAgPALgIQAMgIAUAAIAQAAIAAgIQAAgJgFgFQgFgGgKABQgIAAgGAEQgHAFAAAGIgQAAQAAgHAFgHQAFgHAJgEQAJgEAKAAQAQAAAKAIQAKAJAAAPIAAAsQAAAOADAHIAAACIgRAAQgCgDAAgIQgMANgPAAQgPAAgJgIgAgXATQAAAJAGAEQAFAEAIAAQAHAAAHgEQAHgEADgHIAAgUIgNAAQgeABAAARg");
	this.shape_44.setTransform(313.425,219.55);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AAUBGIggguIgLALIAAAjIgQAAIAAiLIAQAAIAABUIAJgLIAeggIAUAAIglApIAqA5g");
	this.shape_45.setTransform(304.35,217.5);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgeArQgJgJAAgMQAAgPALgIQAMgIAUAAIAQAAIAAgIQAAgJgFgFQgFgGgKABQgIAAgGAEQgHAFAAAGIgQAAQAAgHAFgHQAFgHAJgEQAJgEAKAAQAQAAAKAIQAKAJAAAPIAAAsQAAAOADAHIAAACIgRAAQgCgDAAgIQgMANgPAAQgPAAgJgIgAgXATQAAAJAGAEQAFAEAIAAQAHAAAHgEQAHgEADgHIAAgUIgNAAQgeABAAARg");
	this.shape_46.setTransform(293.975,219.55);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AAWAyIAAhAQAAgKgFgGQgEgEgLAAQgHAAgGAEQgGAEgEAHIAABFIgQAAIAAhhIAPAAIABANQALgPASAAQAeAAAAAjIAABAg");
	this.shape_47.setTransform(283.8,219.45);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgeArQgJgJAAgMQAAgPALgIQAMgIAUAAIAQAAIAAgIQAAgJgFgFQgFgGgKABQgIAAgGAEQgHAFAAAGIgQAAQAAgHAFgHQAFgHAJgEQAJgEAKAAQAQAAAKAIQAKAJAAAPIAAAsQAAAOADAHIAAACIgRAAQgCgDAAgIQgMANgPAAQgPAAgJgIgAgXATQAAAJAGAEQAFAEAIAAQAHAAAHgEQAHgEADgHIAAgUIgNAAQgeABAAARg");
	this.shape_48.setTransform(273.625,219.55);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AAwBCIAAgzIABg2IgrBpIgMAAIgrhpIABA2IAAAzIgRAAIAAiDIAXAAIAqBrIArhrIAXAAIAACDg");
	this.shape_49.setTransform(260.55,217.85);

	this.judulKI = new lib.bg1();
	this.judulKI.name = "judulKI";
	this.judulKI.setTransform(504.8,217.9,1.2649,0.6457,0,0,0,1.3,1.4);
	this.judulKI.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);

	this.Score = new cjs.Text("score", "18px 'Roboto'", "#FFFFFF");
	this.Score.name = "Score";
	this.Score.textAlign = "center";
	this.Score.lineHeight = 26;
	this.Score.lineWidth = 46;
	this.Score.parent = this;
	this.Score.setTransform(859.343,25.15,1.9238,1.9238);

	this.judulKI_1 = new lib.bg1_1();
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

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AAFATIAAglIALAAIAAAKIgCAbgAgPATIAAglIALAAIAAAKIgCAbg");
	this.shape_50.setTransform(609.15,113.475);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgGAGQgCgCAAgEQAAgDACgCQACgDAEAAQAEAAADADQACACAAADQAAAEgCACQgDADgEAAQgEAAgCgDg");
	this.shape_51.setTransform(604.325,122.775);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgRA4QgJgEgEgHIAHgJQAJAMAOAAQAJAAAGgGQAGgGAAgLIAAgHQgJAKgOAAQgOAAgKgMQgJgMAAgUQAAgTAJgMQAKgMAPAAQAOAAAJALIAAgJIAOAAIAABRQAAARgKAJQgKAKgQAAQgIAAgJgEgAgOgmQgGAIAAAQQAAAOAGAHQAGAJAJAAQAOAAAGgNIAAglQgHgNgNAAQgJAAgGAJg");
	this.shape_52.setTransform(597.625,120.925);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_53.setTransform(588.875,119.25);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAOAAIAAgHQAAgHgEgFQgEgEgJAAQgIAAgEAEQgGAEAAAFIgPAAQABgGAFgGQAEgGAHgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgNAAQgMAAgIgHgAgTARQgBAHAFADQAEAEAIAAQAGAAAGgDQAFgEADgFIAAgSIgLAAQgaAAABAQg");
	this.shape_54.setTransform(580.1,119.325);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgUArIAAhTIAOAAIAAAJQAHgLANAAIAGABIAAANIgHAAQgNAAgFAMIAAA7g");
	this.shape_55.setTransform(573.5,119.25);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgZAjQgHgHAAgQIAAg2IAOAAIAAA1QAAAUAQAAQAQAAAFgNIAAg8IAOAAIAABUIgNAAIgBgJQgIAKgPAAQgOAAgHgIg");
	this.shape_56.setTransform(565.925,119.4);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AASA8IgcgnIgJAJIAAAeIgPAAIAAh3IAPAAIAABHIAHgIIAagbIARAAIggAiIAkAxg");
	this.shape_57.setTransform(558.05,117.55);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgTArIAAhTIANAAIAAAJQAHgLANAAIAGABIAAANIgHAAQgNAAgFAMIAAA7g");
	this.shape_58.setTransform(551.2,119.25);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_59.setTransform(543.875,119.325);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgVAxIgBAKIgNAAIAAh3IAPAAIAAAtQAIgLAPAAQAPAAAJAMQAJALAAAUIAAABQAAATgJAMQgJAMgPAAQgPAAgJgMgAgUAAIAAAjQAGAOAOAAQAKAAAGgIQAFgJAAgQQAAgOgFgIQgGgIgKAAQgOAAgGAOg");
	this.shape_60.setTransform(535.225,117.625);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgHA6IAAhUIAOAAIAABUgAgGgqQgCgDAAgDQAAgEACgCQADgDADAAQAFAAACADQACACAAAEQAAADgCADQgCACgFAAQgDAAgDgCg");
	this.shape_61.setTransform(524.65,117.775);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgaAxQgJgMAAgUIAAgBQAAgSAJgMQAKgMAPAAQANAAAJAKIAAgsIAPAAIAAB3IgOAAIAAgJQgJALgPAAQgOAAgKgMgAgOgFQgGAHAAAQQAAAOAGAIQAGAJAJAAQAOAAAGgNIAAgmQgGgMgOAAQgJAAgGAJg");
	this.shape_62.setTransform(518.025,117.625);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQgBgHgEgFQgEgEgJAAQgIAAgFAEQgEAEAAAFIgQAAQAAgGAGgGQADgGAIgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgBgJQgLALgNAAQgMAAgIgHgAgTARQgBAHAFADQAFAEAGAAQAGAAAHgDQAFgEAEgFIAAgSIgMAAQgZAAAAAQg");
	this.shape_63.setTransform(509.35,119.325);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgPBJIAAgLIAHABQAFAAACgDQACgDAAgGIAAheIAOAAIAABeQAAAYgVAAQgFAAgEgCgAABg7QgBgDAAgDQAAgEABgCQACgDAEAAQAEAAADADQACACAAAEQAAADgCADQgDACgEAAQgEAAgCgCg");
	this.shape_64.setTransform(502.3,119.475);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_65.setTransform(496.775,119.25);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_66.setTransform(488.175,119.325);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AAtArIAAg3QAAgJgEgEQgFgFgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg3QAAgSgSAAQgPAAgFAMIAAA9IgOAAIAAhTIANAAIABAJQAJgLAQAAQARAAAGANQAEgGAHgEQAHgDAJAAQAcAAAAAeIAAA3g");
	this.shape_67.setTransform(476.875,119.25);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_68.setTransform(461.475,119.25);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgIAAgEAEQgFAEgBAFIgOAAQAAgGAEgGQAFgGAIgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgDgJQgJALgNAAQgNAAgIgHgAgUARQABAHAEADQAFAEAHAAQAGAAAFgDQAHgEACgFIAAgSIgLAAQgZAAgBAQg");
	this.shape_69.setTransform(452.7,119.325);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgZA7IgFgBIAAgMIAEABQAHAAAEgDQAEgDADgIIADgJIgehSIAQAAIAUA+IAUg+IAPAAIgiBgQgHAVgRAAg");
	this.shape_70.setTransform(444.575,121.025);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQgBgHgEgFQgEgEgJAAQgIAAgFAEQgEAEAAAFIgQAAQAAgGAGgGQAEgGAHgDQAIgEAJAAQAOAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgBgJQgLALgNAAQgMAAgIgHgAgTARQgBAHAFADQAFAEAGAAQAGAAAHgDQAFgEAEgFIAAgSIgMAAQgZAAAAAQg");
	this.shape_71.setTransform(436.45,119.325);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgGA8IAAh3IANAAIAAB3g");
	this.shape_72.setTransform(430.125,117.55);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_73.setTransform(424.025,119.325);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_74.setTransform(415.275,119.25);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_75.setTransform(402.475,119.25);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQgBgHgEgFQgEgEgJAAQgIAAgFAEQgEAEAAAFIgQAAQAAgGAGgGQAEgGAHgDQAIgEAJAAQAOAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgBgJQgLALgNAAQgMAAgIgHgAgTARQgBAHAFADQAFAEAGAAQAGAAAHgDQAFgEAEgFIAAgSIgMAAQgZAAAAAQg");
	this.shape_76.setTransform(393.7,119.325);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgCAvQgEgFAAgLIAAg0IgQAAIAAgLIAQAAIAAgUIANAAIAAAUIAQAAIAAALIgQAAIAAA0QAAAFACACQADADAEAAIAHgBIAAAMIgLABQgJAAgFgGg");
	this.shape_77.setTransform(386.45,118.375);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQgBgHgEgFQgEgEgJAAQgIAAgFAEQgEAEAAAFIgQAAQAAgGAGgGQAEgGAHgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgBgJQgLALgNAAQgMAAgIgHgAgTARQgBAHAFADQAFAEAGAAQAGAAAHgDQAFgEAEgFIAAgSIgMAAQgZAAAAAQg");
	this.shape_78.setTransform(379.75,119.325);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgjA7IAAh0IANAAIABAKQAJgLAPAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgPAAgIgJIAAAogAgUgiIAAAnQAGAMANAAQAKAAAGgJQAGgIAAgPQAAgPgGgIQgGgIgKAAQgNAAgGAMg");
	this.shape_79.setTransform(371.075,120.875);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgHAAgFAEQgGAEAAAFIgOAAQAAgGAEgGQAEgGAIgDQAIgEAIAAQAPAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgMAAQgNAAgIgHgAgUARQABAHAEADQAEAEAIAAQAFAAAGgDQAHgEACgFIAAgSIgLAAQgaAAAAAQg");
	this.shape_80.setTransform(362.05,119.325);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgaAxQgJgMAAgUIAAgBQAAgSAJgMQAKgMAPAAQANAAAJAKIAAgsIAPAAIAAB3IgOAAIAAgJQgJALgPAAQgOAAgKgMgAgOgFQgGAHAAAQQAAAOAGAIQAGAJAJAAQAOAAAGgNIAAgmQgGgMgOAAQgJAAgGAJg");
	this.shape_81.setTransform(353.025,117.625);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFAEgDAGIAAA7IgOAAIAAhTIANAAIABAKQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_82.setTransform(344.275,119.25);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_83.setTransform(335.675,119.325);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgjA7IAAh0IANAAIABAKQAJgLAPAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgPAAgIgJIAAAogAgUgiIAAAnQAGAMANAAQAKAAAGgJQAGgIAAgPQAAgPgGgIQgGgIgKAAQgNAAgGAMg");
	this.shape_84.setTransform(327.025,120.875);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgIAAgEAEQgFAEgBAFIgOAAQAAgGAEgGQAFgGAIgDQAHgEAJAAQAOAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgPAAIgDgJQgJALgNAAQgNAAgIgHgAgUARQABAHAEADQAEAEAHAAQAGAAAGgDQAHgEACgFIAAgSIgLAAQgZAAgBAQg");
	this.shape_85.setTransform(782.55,96.125);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgZA7IgFgBIAAgMIAEABQAHAAAEgDQAEgDADgIIADgJIgehSIAQAAIAUA+IAUg+IAPAAIgiBgQgHAVgRAAg");
	this.shape_86.setTransform(774.425,97.825);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_87.setTransform(766.225,96.05);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AgCAvQgEgFAAgLIAAg0IgQAAIAAgLIAQAAIAAgUIANAAIAAAUIAQAAIAAALIgQAAIAAA0QAAAFACACQACADAGAAIAGgBIAAAMIgLABQgJAAgFgGg");
	this.shape_88.setTransform(758.9,95.175);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgHAAgFAEQgGAEAAAFIgOAAQAAgGAEgGQAEgGAIgDQAIgEAIAAQAPAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgMAAQgNAAgIgHgAgUARQABAHAEADQAEAEAIAAQAFAAAGgDQAHgEACgFIAAgSIgLAAQgaAAAAAQg");
	this.shape_89.setTransform(752.2,96.125);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AgVAxIgBAKIgNAAIAAh3IAPAAIAAAtQAIgLAPAAQAPAAAJAMQAJALAAAUIAAABQAAATgJAMQgJAMgPAAQgPAAgJgMgAgUAAIAAAjQAGAOAOAAQAKAAAGgIQAFgJAAgQQAAgOgFgIQgGgIgKAAQgOAAgGAOg");
	this.shape_90.setTransform(743.525,94.425);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgHA6IAAhUIAOAAIAABUgAgFgqQgDgDAAgDQAAgEADgCQACgDADAAQAEAAACADQACACAAAEQAAADgCADQgCACgEAAQgDAAgCgCg");
	this.shape_91.setTransform(736.9,94.575);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AASA8IgdgnIgJAJIAAAeIgOAAIAAh3IAOAAIAABHIAIgJIAZgbIASAAIggAjIAkAxg");
	this.shape_92.setTransform(731.45,94.35);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgHAAgFAEQgGAEAAAFIgOAAQAAgGAEgGQAEgGAIgDQAIgEAIAAQAPAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgMAAQgNAAgIgHgAgTARQAAAHAEADQAEAEAIAAQAFAAAGgDQAHgEACgFIAAgSIgLAAQgaAAABAQg");
	this.shape_93.setTransform(722.5,96.125);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AgGAGQgCgCAAgEQAAgDACgCQACgDAEAAQAEAAADADQACACAAADQAAAEgCACQgDADgEAAQgEAAgCgDg");
	this.shape_94.setTransform(712.025,99.575);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_95.setTransform(705.575,96.05);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQAAgHgFgFQgFgEgIAAQgHAAgGAEQgEAEAAAFIgPAAQgBgGAGgGQADgGAJgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgCgJQgLALgNAAQgMAAgIgHgAgUARQAAAHAFADQAFAEAGAAQAHAAAGgDQAFgEAEgFIAAgSIgMAAQgaAAAAAQg");
	this.shape_96.setTransform(696.8,96.125);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_97.setTransform(688.025,96.05);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQAAgHgFgFQgFgEgIAAQgHAAgGAEQgEAEAAAFIgQAAQAAgGAGgGQADgGAJgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgCgJQgLALgNAAQgMAAgIgHgAgUARQAAAHAFADQAFAEAGAAQAGAAAHgDQAFgEAEgFIAAgSIgMAAQgaAAAAAQg");
	this.shape_98.setTransform(679.25,96.125);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AgRA4QgJgEgEgHIAHgJQAJAMAOAAQAJAAAGgGQAGgGAAgLIAAgHQgJAKgOAAQgOAAgKgMQgJgMAAgUQAAgTAJgMQAKgMAPAAQAOAAAJALIAAgJIAOAAIAABRQAAARgKAJQgKAKgQAAQgIAAgJgEgAgOgmQgGAIAAAQQAAAOAGAHQAGAJAJAAQAOAAAGgNIAAglQgHgNgNAAQgJAAgGAJg");
	this.shape_99.setTransform(670.225,97.725);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_100.setTransform(661.475,96.05);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQAAgHgFgFQgFgEgIAAQgHAAgGAEQgEAEAAAFIgQAAQAAgGAGgGQADgGAJgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgCgJQgLALgNAAQgMAAgIgHgAgUARQAAAHAFADQAFAEAGAAQAGAAAHgDQAFgEAEgFIAAgSIgMAAQgaAAAAAQg");
	this.shape_101.setTransform(652.7,96.125);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_102.setTransform(643.925,96.05);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_103.setTransform(635.325,96.125);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AgjA7IAAh0IANAAIABAKQAJgLAPAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgPAAgIgJIAAAogAgUgiIAAAnQAGAMANAAQAKAAAGgJQAGgIAAgPQAAgPgGgIQgGgIgKAAQgNAAgGAMg");
	this.shape_104.setTransform(626.675,97.675);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_105.setTransform(613.625,96.05);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAOAAIAAgHQAAgHgEgFQgEgEgJAAQgIAAgEAEQgGAEAAAFIgPAAQABgGAFgGQAEgGAHgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgNAAQgMAAgIgHgAgTARQgBAHAFADQAEAEAIAAQAGAAAGgDQAFgEADgFIAAgSIgLAAQgaAAABAQg");
	this.shape_106.setTransform(604.85,96.125);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AASA8IgcgnIgJAJIAAAeIgPAAIAAh3IAPAAIAABHIAHgJIAZgbIASAAIggAjIAkAxg");
	this.shape_107.setTransform(597,94.35);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgCAvQgEgFAAgLIAAg0IgQAAIAAgLIAQAAIAAgUIANAAIAAAUIAQAAIAAALIgQAAIAAA0QAAAFACACQACADAFAAIAHgBIAAAMIgLABQgJAAgFgGg");
	this.shape_108.setTransform(589.5,95.175);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAOAAIAAgHQAAgHgEgFQgEgEgJAAQgIAAgEAEQgGAEABAFIgQAAQAAgGAGgGQAEgGAHgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgCgJQgKALgNAAQgMAAgIgHgAgTARQgBAHAFADQAEAEAIAAQAGAAAFgDQAGgEADgFIAAgSIgLAAQgaAAABAQg");
	this.shape_109.setTransform(582.8,96.125);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AgjA7IAAh0IANAAIABAKQAJgLAPAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgPAAgIgJIAAAogAgUgiIAAAnQAGAMANAAQAKAAAGgJQAGgIAAgPQAAgPgGgIQgGgIgKAAQgNAAgGAMg");
	this.shape_110.setTransform(574.125,97.675);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgHAAgFAEQgFAEgBAFIgOAAQAAgGAEgGQAEgGAJgDQAHgEAIAAQAPAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgDgJQgJALgNAAQgNAAgIgHgAgUARQABAHAEADQAEAEAIAAQAFAAAGgDQAHgEACgFIAAgSIgLAAQgZAAgBAQg");
	this.shape_111.setTransform(565.1,96.125);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AgaAxQgJgMAAgUIAAgBQAAgSAJgMQAKgMAPAAQANAAAJAKIAAgsIAPAAIAAB3IgOAAIAAgJQgJALgPAAQgOAAgKgMgAgOgFQgGAHAAAQQAAAOAGAIQAGAJAJAAQAOAAAGgNIAAgmQgGgMgOAAQgJAAgGAJg");
	this.shape_112.setTransform(556.075,94.425);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_113.setTransform(547.325,96.05);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_114.setTransform(538.725,96.125);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AAtArIAAg3QAAgJgEgEQgFgFgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg3QAAgSgSAAQgPAAgFANIAAA8IgOAAIAAhUIANAAIABAKQAJgLAQAAQARAAAGANQAEgFAHgFQAHgDAJAAQAcAAAAAdIAAA4g");
	this.shape_115.setTransform(527.425,96.05);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AAtArIAAg3QAAgJgEgEQgFgFgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg3QAAgSgSAAQgPAAgFANIAAA8IgOAAIAAhUIANAAIABAKQAJgLAQAAQARAAAGANQAEgFAHgFQAHgDAJAAQAcAAAAAdIAAA4g");
	this.shape_116.setTransform(509.475,96.05);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AgZAjQgHgHAAgQIAAg2IAOAAIAAA2QAAATAQAAQAQAAAFgNIAAg8IAOAAIAABTIgNAAIgBgIQgIAKgPAAQgOAAgHgIg");
	this.shape_117.setTransform(498.025,96.2);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AgGA8IAAh3IANAAIAAB3g");
	this.shape_118.setTransform(491.675,94.35);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_119.setTransform(485.575,96.125);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AgVAxIgBAKIgNAAIAAh3IAPAAIAAAtQAIgLAPAAQAPAAAJAMQAJALAAAUIAAABQAAATgJAMQgJAMgPAAQgPAAgJgMgAgUAAIAAAjQAGAOAOAAQAKAAAGgIQAFgJAAgQQAAgOgFgIQgGgIgKAAQgOAAgGAOg");
	this.shape_120.setTransform(476.925,94.425);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AATA8IAAg4QAAgIgEgEQgFgFgIAAQgGAAgGAEQgFADgDAGIAAA8IgOAAIAAh3IAOAAIAAAtQAKgLAOAAQAbAAAAAdIAAA4g");
	this.shape_121.setTransform(463.925,94.35);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AgGA6IAAhUIANAAIAABUgAgFgqQgCgDgBgDQABgEACgCQACgDADAAQAEAAACADQACACAAAEQAAADgCADQgCACgEAAQgDAAgCgCg");
	this.shape_122.setTransform(457.55,94.575);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AgQAoQgHgDgFgHQgEgGAAgIIAOAAQABAIAEAEQAGAEAIAAQAIAAAFgDQAFgEAAgFQAAgGgEgDQgFgEgKgCQgKgCgHgDQgGgDgDgEQgEgFAAgGQAAgKAJgIQAJgHANAAQAOAAAJAIQAJAHAAAMIgOAAQgBgGgFgFQgFgEgHAAQgIAAgEADQgEAEAAAFQAAAGAEACQAEADAKACQAKADAIADQAGADADAEQADAFAAAHQAAALgJAHQgIAHgPAAQgJAAgIgEg");
	this.shape_123.setTransform(451.45,96.125);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQAAgHgFgFQgFgEgIAAQgHAAgGAEQgEAEAAAFIgQAAQAAgGAGgGQADgGAJgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgCgJQgLALgMAAQgNAAgIgHgAgUARQAAAHAFADQAFAEAGAAQAHAAAGgDQAFgEAEgFIAAgSIgMAAQgaAAAAAQg");
	this.shape_124.setTransform(443,96.125);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AAtArIAAg3QAAgJgEgEQgFgFgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg3QAAgSgSAAQgPAAgFANIAAA8IgOAAIAAhUIANAAIABAKQAJgLAQAAQARAAAGANQAEgFAHgFQAHgDAJAAQAcAAAAAdIAAA4g");
	this.shape_125.setTransform(431.675,96.05);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AgCAvQgEgFAAgLIAAg0IgQAAIAAgLIAQAAIAAgUIANAAIAAAUIAQAAIAAALIgQAAIAAA0QAAAFACACQACADAGAAIAGgBIAAAMIgLABQgJAAgFgGg");
	this.shape_126.setTransform(417.8,95.175);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AgZAjQgHgHAAgQIAAg2IAOAAIAAA2QAAATAQAAQAQAAAFgNIAAg8IAOAAIAABTIgNAAIgBgIQgIAKgPAAQgOAAgHgIg");
	this.shape_127.setTransform(411.025,96.2);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgIAAgFAEQgEAEgBAFIgOAAQAAgGAEgGQAFgGAIgDQAHgEAJAAQAOAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgPAAIgDgJQgJALgNAAQgNAAgIgHgAgUARQABAHAEADQAFAEAHAAQAGAAAFgDQAHgEACgFIAAgSIgLAAQgZAAgBAQg");
	this.shape_128.setTransform(402.3,96.125);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AgGA8IAAh3IANAAIAAB3g");
	this.shape_129.setTransform(395.975,94.35);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AgHA6IAAhUIAOAAIAABUgAgFgqQgDgDAAgDQAAgEADgCQACgDADAAQAEAAACADQACACAAAEQAAADgCADQgCACgEAAQgDAAgCgCg");
	this.shape_130.setTransform(388.15,94.575);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AgaAxQgJgMAAgUIAAgBQAAgSAJgMQAKgMAPAAQANAAAJAKIAAgsIAPAAIAAB3IgOAAIAAgJQgJALgPAAQgOAAgKgMgAgOgFQgGAHAAAQQAAAOAGAIQAGAJAJAAQAOAAAGgNIAAgmQgGgMgOAAQgJAAgGAJg");
	this.shape_131.setTransform(381.525,94.425);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("AASA8IgcgnIgJAJIAAAeIgPAAIAAh3IAPAAIAABHIAHgJIAZgbIASAAIggAjIAkAxg");
	this.shape_132.setTransform(369.75,94.35);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgHAAgFAEQgFAEgBAFIgOAAQAAgGAEgGQAFgGAIgDQAHgEAIAAQAPAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgDgJQgJALgNAAQgNAAgIgHgAgUARQABAHAEADQAEAEAIAAQAFAAAGgDQAHgEACgFIAAgSIgLAAQgZAAgBAQg");
	this.shape_133.setTransform(360.8,96.125);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("AgZA7IgFgBIAAgMIAEABQAHAAAEgDQAEgDADgIIADgJIgehSIAQAAIAUA+IAUg+IAPAAIgiBgQgHAVgRAAg");
	this.shape_134.setTransform(352.675,97.825);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_135.setTransform(344.475,96.05);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("AgHA6IAAhUIAOAAIAABUgAgGgqQgCgDAAgDQAAgEACgCQADgDADAAQAFAAACADQABACAAAEQAAADgBADQgCACgFAAQgDAAgDgCg");
	this.shape_136.setTransform(338.1,94.575);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("AAtArIAAg3QAAgJgEgEQgFgFgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg3QAAgSgSAAQgPAAgFANIAAA8IgOAAIAAhUIANAAIABAKQAJgLAQAAQARAAAGANQAEgFAHgFQAHgDAJAAQAcAAAAAdIAAA4g");
	this.shape_137.setTransform(329.175,96.05);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_138.setTransform(313.775,96.05);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgHAAgFAEQgGAEAAAFIgOAAQAAgGAEgGQAEgGAJgDQAHgEAIAAQAPAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgDgJQgJALgNAAQgNAAgIgHgAgUARQABAHAEADQAEAEAIAAQAFAAAGgDQAHgEACgFIAAgSIgLAAQgZAAgBAQg");
	this.shape_139.setTransform(305,96.125);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("AATA8IAAg4QAAgIgEgEQgFgFgIAAQgGAAgGAEQgFADgDAGIAAA8IgOAAIAAh3IAOAAIAAAtQAKgLAOAAQAbAAAAAdIAAA4g");
	this.shape_140.setTransform(296.275,94.35);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQgBgHgEgFQgEgEgJAAQgIAAgFAEQgEAEAAAFIgQAAQAAgGAGgGQAEgGAHgDQAIgEAIAAQAPAAAIAIQAJAHAAANIAAAlQAAAMADAHIAAABIgQAAIgBgJQgLALgNAAQgMAAgIgHgAgTARQgBAHAFADQAFAEAGAAQAGAAAHgDQAFgEAEgFIAAgSIgMAAQgZAAAAAQg");
	this.shape_141.setTransform(287.5,96.125);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("AgjA7IAAh0IANAAIABAKQAJgLAPAAQAPAAAJALQAJAMAAAUIAAABQAAATgJAMQgJALgPAAQgPAAgIgJIAAAogAgUgiIAAAnQAGAMANAAQAKAAAGgJQAGgIAAgPQAAgPgGgIQgGgIgKAAQgNAAgGAMg");
	this.shape_142.setTransform(278.825,97.675);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("AAtArIAAg3QAAgJgEgEQgFgFgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg3QAAgSgSAAQgPAAgFANIAAA8IgOAAIAAhUIANAAIABAKQAJgLAQAAQARAAAGANQAEgFAHgFQAHgDAJAAQAcAAAAAdIAAA4g");
	this.shape_143.setTransform(267.175,96.05);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("AgZAjQgHgHAAgQIAAg2IAOAAIAAA2QAAATAQAAQAQAAAFgNIAAg8IAOAAIAABTIgNAAIgBgIQgIAKgPAAQgOAAgHgIg");
	this.shape_144.setTransform(255.725,96.2);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("AgBAvQgGgFAAgLIAAg0IgPAAIAAgLIAPAAIAAgUIAOAAIAAAUIAQAAIAAALIgQAAIAAA0QAAAFACACQADADAFAAIAGgBIAAAMIgLABQgKAAgDgGg");
	this.shape_145.setTransform(248.45,95.175);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_146.setTransform(237.725,96.05);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHASAAIANAAIAAgHQABgHgFgFQgEgEgJAAQgHAAgFAEQgFAEgBAFIgOAAQAAgGAEgGQAFgGAIgDQAHgEAIAAQAPAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgDgJQgJALgNAAQgNAAgIgHgAgUARQABAHAEADQAEAEAIAAQAFAAAGgDQAHgEACgFIAAgSIgLAAQgZAAgBAQg");
	this.shape_147.setTransform(228.95,96.125);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFFF").s().p("AgTArIAAhUIANAAIAAAKQAHgLANAAIAGABIAAAOIgHgBQgNAAgFAMIAAA7g");
	this.shape_148.setTransform(222.35,96.05);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("AgaAlQgIgHAAgLQAAgNAKgHQAKgHARAAIAPAAIAAgHQAAgHgFgFQgFgEgIAAQgHAAgGAEQgEAEAAAFIgPAAQgBgGAGgGQADgGAJgDQAHgEAJAAQAOAAAIAIQAIAHABANIAAAlQAAAMADAHIAAABIgPAAIgCgJQgLALgNAAQgMAAgIgHgAgUARQAAAHAFADQAFAEAGAAQAHAAAGgDQAFgEAEgFIAAgSIgMAAQgaAAAAAQg");
	this.shape_149.setTransform(214.85,96.125);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("AAtArIAAg3QAAgJgEgEQgFgFgJAAQgIAAgGAFQgFAFgBAIIAAA3IgNAAIAAg3QAAgSgSAAQgPAAgFANIAAA8IgOAAIAAhUIANAAIABAKQAJgLAQAAQARAAAGANQAEgFAHgFQAHgDAJAAQAcAAAAAdIAAA4g");
	this.shape_150.setTransform(203.525,96.05);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_151.setTransform(192.325,96.125);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFFF").s().p("AgYAgQgLgLAAgUIAAgCQAAgMAFgKQAFgJAIgGQAIgFALAAQAOAAAKAJQAJAIABAOIgOAAQgBgIgFgGQgGgFgIAAQgKAAgGAIQgGAIAAAPIAAACQAAAOAGAIQAGAIAKAAQAIAAAGgFQAFgEABgHIAOAAQgBAHgEAGQgFAHgIAEQgHAEgJAAQgQAAgKgMg");
	this.shape_152.setTransform(183.875,96.125);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("AATArIAAg3QAAgJgEgEQgFgFgIAAQgGAAgGAEQgFADgDAHIAAA7IgOAAIAAhUIANAAIABALQAKgMAOAAQAbAAAAAeIAAA3g");
	this.shape_153.setTransform(175.175,96.05);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("AgYAhQgLgMAAgTIAAgCQAAgMAFgKQAFgKAIgFQAJgGAJAAQAQAAAKALQAJALAAAUIAAAFIg5AAQABANAHAHQAHAIAKAAQAHAAAGgDQAFgDAEgFIAJAGQgLARgVAAQgQAAgLgLgAgNgZQgGAHgBALIApAAIAAgBQAAgLgGgGQgFgGgJAAQgIAAgGAGg");
	this.shape_154.setTransform(166.575,96.125);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("AgoA5IAAhxIApAAQATAAAKAKQALAJAAAQQAAAQgLAIQgJAJgUAAIgaAAIAAAtgAgZAAIAaAAQAMAAAGgFQAHgFAAgLQAAgKgHgGQgGgGgLgBIgbAAg");
	this.shape_155.setTransform(157.55,94.675);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("AAFATIAAglIALAAIAAAKIgCAbgAgPATIAAglIALAAIAAAKIgCAbg");
	this.shape_156.setTransform(149.7,90.275);

	this.instance_2 = new lib.bg10();
	this.instance_2.setTransform(471,324.2,1.1987,1.1979,0,0,0,0,0.1);
	this.instance_2.alpha = 0.1992;

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.bf(img.Bitmap2, null, new cjs.Matrix2D(1,0,0,1,-499,-300)).s().p("EhN9Au4MAAAhdvMCb7AAAMAAABdvg");
	this.shape_157.setTransform(471,266.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_157},{t:this.instance_2},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.btnNextDasar1},{t:this.btnMenuDasar1},{t:this.btnBack3},{t:this.judulKI_1},{t:this.Score},{t:this.judulKI},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.slots},{t:this.pieces},{t:this.restart},{t:this.btnInfo}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(452,236.2,518,425.09999999999997);
// library properties:
lib.properties = {
	id: 'E740BB847DF4864B949C99CD86B71105',
	width: 960,
	height: 540,
	fps: 24,
	color: "#34495E",
	opacity: 1.00,
	manifest: [
		{src:"images/_1.png", id:"_1"},
		{src:"images/_1e.png", id:"_1e"},
		{src:"images/_2e11.png", id:"_2e11"},
		{src:"images/_3e11.png", id:"_3e11"},
		{src:"images/_3e1.png", id:"_3e1"},
		{src:"images/_3e.png", id:"_3e"},
		{src:"images/_4e.png", id:"_4e"},
		{src:"images/_5e.png", id:"_5e"},
		{src:"images/_6eEdit.png", id:"_6eEdit"},
		{src:"images/_2e1.png", id:"_2e1"},
		{src:"images/_8e.png", id:"_8e"},
		{src:"images/_9pngcopy.png", id:"_9pngcopy"},
		{src:"images/Bitmap2.png", id:"Bitmap2"},
		{src:"images/Bitmap3.png", id:"Bitmap3"},
		{src:"images/Bitmap42.png", id:"Bitmap42"},
		{src:"images/Bitmap43.png", id:"Bitmap43"},
		{src:"images/bookpngcopy.png", id:"bookpngcopy"},
		{src:"images/_9.png", id:"_9"},
		{src:"images/flash0aiAssets.png", id:"flash0aiAssets"},
		{src:"images/flash0aiAssets_1.png", id:"flash0aiAssets_1"},
		{src:"images/flash0aiAssets_2.png", id:"flash0aiAssets_2"},
		{src:"images/_7e.png", id:"_7e"},
		{src:"images/_2e.png", id:"_2e"},
		{src:"images/flash0aiAssets_3.png", id:"flash0aiAssets_3"},
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