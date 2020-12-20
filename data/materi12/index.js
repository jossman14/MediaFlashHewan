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
p.nominalBounds = new cjs.Rectangle(0,0,961,561);


(lib._1e = function() {
	this.initialize(img._1e);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,961,561);


(lib._2e = function() {
	this.initialize(img._2e);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,961,561);


(lib._6e = function() {
	this.initialize(img._6e);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,961,561);


(lib.Bitmap3 = function() {
	this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,249,87);


(lib._5e = function() {
	this.initialize(img._5e);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,961,561);


(lib._3e = function() {
	this.initialize(img._3e);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,961,561);


(lib.Bitmap86 = function() {
	this.initialize(img.Bitmap86);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,202,177);


(lib.bookpngcopy = function() {
	this.initialize(img.bookpngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,399);


(lib.flash0aiAssets = function() {
	this.initialize(img.flash0aiAssets);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,369,180);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);


(lib.flash0aiAssets_1 = function() {
	this.initialize(img.flash0aiAssets_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,153,152);


(lib.flash0aiAssets_2 = function() {
	this.initialize(img.flash0aiAssets_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,204,204);


(lib.flash0aiAssets_3 = function() {
	this.initialize(img.flash0aiAssets_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,258);


(lib.Bitmap85 = function() {
	this.initialize(img.Bitmap85);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,285,183);


(lib.flash0aiAssets_4 = function() {
	this.initialize(img.flash0aiAssets_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,153,152);


(lib._4e = function() {
	this.initialize(img._4e);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,961,561);// helper functions:

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



(lib.fds = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._6e();
	this.instance.setTransform(0,0,1.0014,1.0023);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.fds, new cjs.Rectangle(0,0,664,388), null);


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


(lib.drop15G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgWBCQgKgEgGgIIALgNQAKAMAQAAQAKAAAGgGQAHgGAAgMIAAgHQgKALgPAAQgSAAgLgOQgLgOAAgYQAAgXALgOQALgOASAAQAQAAAKAMIABgKIAUAAIAABgQAAAUgMALQgMAMgUAAQgLAAgLgFgAgOgrQgHAJAAARQAAAPAHAIQAGAJAKAAQANAAAHgMIAAgrQgHgMgNAAQgKAAgGAJg");
	this.shape.setTransform(300.575,99.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgKgEgEQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAjIAABCg");
	this.shape_1.setTransform(290.125,97.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AggArQgKgJAAgMQAAgQAMgIQALgJAWAAIANAAIAAgGQAAgIgDgEQgFgFgIAAQgIAAgEAEQgGAEAAAGIgWAAQAAgJAFgHQAGgHAJgEQAKgEAKAAQASAAAKAIQALAKAAAPIAAAtQAAANAEAJIAAABIgXAAIgDgJQgLALgOAAQgPAAgJgJgAgNAHQgHAFAAAHQABAHAEAEQAEAEAIAAQAFAAAGgDQAFgEADgFIAAgTIgLAAQgMAAgGAEg");
	this.shape_2.setTransform(279.7,97.45);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AATBHIAAhBQAAgJgEgEQgFgFgJAAQgMAAgHAMIAABHIgXAAIAAiNIAXAAIAAA1QALgNAQAAQAgAAABAkIAABBg");
	this.shape_3.setTransform(269.275,95.325);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AggArQgKgJAAgMQAAgQAMgIQAMgJAVAAIANAAIAAgGQAAgIgDgEQgFgFgIAAQgIAAgFAEQgEAEAAAGIgXAAQAAgJAGgHQAFgHAJgEQAKgEALAAQARAAALAIQAKAKAAAPIAAAtQAAANAEAJIAAABIgXAAIgCgJQgMALgOAAQgPAAgJgJgAgOAHQgFAFgBAHQAAAHAFAEQAEAEAHAAQAGAAAGgDQAFgEADgFIAAgTIgMAAQgLAAgHAEg");
	this.shape_4.setTransform(258.85,97.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgZAzIAAhjIAVAAIABALQAHgNAOAAIAIABIAAAVIgJAAQgPgBgFAMIAABEg");
	this.shape_5.setTransform(250.775,97.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_6.setTransform(239.825,95.525);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgIQALgJAWAAIAOAAIAAgGQAAgIgFgEQgEgFgIAAQgHAAgFAEQgGAEAAAGIgWAAQAAgJAFgHQAGgHAKgEQAJgEAKAAQASAAAKAIQALAKAAAPIAAAtQAAANAEAJIAAABIgXAAIgCgJQgMALgOAAQgPAAgKgJgAgOAHQgFAFAAAHQgBAHAFAEQAEAEAIAAQAFAAAGgDQAGgEADgFIAAgTIgMAAQgMAAgHAEg");
	this.shape_7.setTransform(232.25,97.45);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgWBCQgKgEgGgIIALgNQAKAMAQAAQAKAAAGgGQAHgGAAgMIAAgHQgKALgPAAQgSAAgLgOQgLgOAAgYQAAgXALgOQALgOASAAQAQAAAKAMIABgKIAUAAIAABgQAAAUgMALQgMAMgUAAQgLAAgLgFgAgOgrQgHAJAAARQAAAPAHAIQAGAJAKAAQANAAAHgMIAAgrQgHgMgNAAQgKAAgGAJg");
	this.shape_8.setTransform(221.525,99.325);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgIQALgJAWAAIANAAIAAgGQAAgIgDgEQgFgFgIAAQgIAAgEAEQgGAEAAAGIgWAAQAAgJAFgHQAGgHAKgEQAJgEAKAAQASAAAKAIQALAKAAAPIAAAtQAAANAEAJIAAABIgXAAIgDgJQgLALgOAAQgPAAgKgJgAgNAHQgHAFABAHQAAAHAEAEQAEAEAIAAQAFAAAGgDQAGgEACgFIAAgTIgLAAQgMAAgGAEg");
	this.shape_9.setTransform(211.2,97.45);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgWA7IgBALIgUAAIAAiNIAWAAIAAA0QALgMAPAAQASAAAKAOQALANAAAYIAAABQAAAXgLAOQgJAOgTAAQgRAAgKgNgAgVAAIAAApQAHANAOAAQAKAAAFgIQAHgIgBgQIAAgDQAAgQgFgHQgGgJgKAAQgOAAgHANg");
	this.shape_10.setTransform(200.9,95.425);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgeAnQgNgOAAgWIAAgDQAAgOAGgMQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABAMAHAHQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgNgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_11.setTransform(190.325,97.45);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgUAwQgKgFgFgIQgGgIABgJIAVAAQABAIAGAFQAFAEAIAAQAJAAAFgDQAEgEAAgFQAAgHgEgCQgGgDgKgDQgMgDgHgDQgRgIAAgPQAAgNAKgJQAMgIAPAAQATAAALAIQAKAJABAPIgXAAQAAgGgEgFQgGgFgIAAQgGAAgFAEQgEADAAAHQAAAEAEAEQAFACAMADQANADAHAEQAIADAEAGQADAFABAJQgBANgKAIQgMAJgSAAQgMAAgJgEg");
	this.shape_12.setTransform(180.25,97.45);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_13.setTransform(168.225,95.525);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgUAwQgKgFgFgIQgGgIABgJIAVAAQABAIAGAFQAFAEAIAAQAJAAAFgDQAEgEAAgFQAAgHgEgCQgGgDgKgDQgMgDgHgDQgRgIAAgPQAAgNAKgJQAMgIAPAAQATAAALAIQAKAJABAPIgXAAQAAgGgEgFQgGgFgIAAQgGAAgFAEQgEADAAAHQAAAEAEAEQAFACAMADQANADAHAEQAIADAEAGQADAFABAJQgBANgKAIQgMAJgSAAQgLAAgKgEg");
	this.shape_14.setTransform(160.9,97.45);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgWBCQgKgEgGgIIALgNQAKAMAQAAQAKAAAGgGQAHgGAAgMIAAgHQgKALgPAAQgSAAgLgOQgLgOAAgYQAAgXALgOQALgOASAAQAQAAAKAMIABgKIAUAAIAABgQAAAUgMALQgMAMgUAAQgLAAgLgFgAgOgrQgHAJAAARQAAAPAHAIQAGAJAKAAQANAAAHgMIAAgrQgHgMgNAAQgKAAgGAJg");
	this.shape_15.setTransform(150.475,99.325);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgKgEgEQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAjIAABCg");
	this.shape_16.setTransform(140.025,97.35);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AggAqQgJgKAAgSIAAhAIAXAAIAABAQAAATAQAAQAPAAAGgMIAAhHIAWAAIAABjIgVAAIAAgKQgKAMgRAAQgRAAgIgJg");
	this.shape_17.setTransform(129.45,97.525);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgPBIIAAhSIgQAAIAAgRIAQAAIAAgJQAAgRAJgJQAIgJARAAIANABIgBASIgJgBQgQAAAAARIAAAJIAVAAIAAARIgVAAIAABSg");
	this.shape_18.setTransform(121.025,95.225);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgZAzIAAhjIAVAAIABALQAHgNAOAAIAIABIAAAVIgJAAQgPgBgFAMIAABEg");
	this.shape_19.setTransform(114.525,97.35);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgeAnQgNgOAAgWIAAgDQAAgOAGgMQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABAMAHAHQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgNgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_20.setTransform(105.725,97.45);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgVA7IgBALIgVAAIAAiNIAWAAIAAA0QAKgMAQAAQASAAAKAOQALANAAAYIAAABQAAAXgLAOQgKAOgSAAQgRAAgJgNgAgVAAIAAApQAHANAOAAQAKAAAFgIQAHgIAAgQIAAgDQgBgQgFgHQgGgJgKAAQgOAAgHANg");
	this.shape_21.setTransform(95.4,95.425);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgWBCQgKgEgGgIIALgNQAKAMAQAAQAKAAAGgGQAHgGAAgMIAAgHQgKALgPAAQgSAAgLgOQgLgOAAgYQAAgXALgOQALgOASAAQAQAAAKAMIABgKIAUAAIAABgQAAAUgMALQgMAMgUAAQgLAAgLgFgAgOgrQgHAJAAARQAAAPAHAIQAGAJAKAAQANAAAHgMIAAgrQgHgMgNAAQgKAAgGAJg");
	this.shape_22.setTransform(79.525,99.325);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgKgEgEQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAjIAABCg");
	this.shape_23.setTransform(69.075,97.35);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgIQALgJAWAAIANAAIAAgGQABgIgEgEQgFgFgIAAQgIAAgEAEQgGAEAAAGIgWAAQAAgJAFgHQAGgHAKgEQAJgEAKAAQASAAAKAIQALAKAAAPIAAAtQAAANAEAJIAAABIgXAAIgDgJQgLALgOAAQgPAAgKgJgAgNAHQgHAFABAHQAAAHAEAEQAEAEAIAAQAFAAAGgDQAGgEACgFIAAgTIgLAAQgMAAgGAEg");
	this.shape_24.setTransform(58.65,97.45);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgkBFIAAgSIAFAAQAIAAAEgCQAEgDADgIIADgIIgjhjIAYAAIAUBDIAVhDIAYAAIgoByQgIAZgWAAIgLgBg");
	this.shape_25.setTransform(48.85,99.45);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgZAzIAAhjIAVAAIABALQAHgNAOAAIAIABIAAAVIgJAAQgPgBgFAMIAABEg");
	this.shape_26.setTransform(36.575,97.35);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AggAqQgJgKAAgSIAAhAIAXAAIAABAQAAATAQAAQAPAAAGgMIAAhHIAXAAIAABjIgWAAIAAgKQgKAMgSAAQgPAAgJgJg");
	this.shape_27.setTransform(27.5,97.525);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgrBGIAAiKIAVAAIAAALQALgMAPAAQATAAAKANQALAOAAAYIAAACQAAAWgLAOQgKAOgSAAQgQAAgKgLIAAAvgAgVgoIAAAsQAHAMANAAQALAAAFgJQAHgIAAgRQAAgPgHgJQgFgJgLAAQgNAAgHALg");
	this.shape_28.setTransform(17.1,99.275);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AggArQgKgJAAgMQAAgQAMgIQAMgJAVAAIANAAIAAgGQAAgIgDgEQgFgFgIAAQgIAAgFAEQgEAEAAAGIgXAAQAAgJAGgHQAFgHAJgEQAKgEALAAQARAAALAIQAKAKAAAPIAAAtQAAANAEAJIAAABIgXAAIgCgJQgMALgOAAQgPAAgJgJgAgOAHQgFAFgBAHQAAAHAFAEQAEAEAHAAQAGAAAGgDQAFgEADgFIAAgTIgMAAQgLAAgHAEg");
	this.shape_29.setTransform(6.4,97.45);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AASBHIgdgrIgKALIAAAgIgWAAIAAiNIAWAAIAABRIAHgJIAbgeIAbAAIglApIApA6g");
	this.shape_30.setTransform(-3.075,95.325);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgWBCQgKgEgGgIIALgNQAKAMAQAAQAKAAAGgGQAHgGAAgMIAAgHQgKALgPAAQgSAAgLgOQgLgOAAgYQAAgXALgOQALgOASAAQAQAAAKAMIABgKIAUAAIAABgQAAAUgMALQgMAMgUAAQgLAAgLgFgAgOgrQgHAJAAARQAAAPAHAIQAGAJAKAAQANAAAHgMIAAgrQgHgMgNAAQgKAAgGAJg");
	this.shape_31.setTransform(316.475,72.525);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHAMIAABHIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAkIAABBg");
	this.shape_32.setTransform(306.025,70.55);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgeAnQgNgOAAgWIAAgDQAAgPAGgLQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABANAHAGQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgNgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_33.setTransform(295.725,70.65);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgrBGIAAiKIAVAAIAAALQALgMAPAAQATAAAKANQALAOAAAYIAAACQAAAWgLAOQgKAOgSAAQgQAAgKgLIAAAvgAgVgoIAAAsQAHAMANAAQALAAAFgJQAHgIgBgRQABgPgHgJQgFgJgLAAQgNAAgHALg");
	this.shape_34.setTransform(285.4,72.475);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AAwAzIAAhAQAAgKgDgFQgFgEgKAAQgHAAgFAEQgFAFgCAGIAABEIgVAAIAAhBQgBgSgRAAQgOAAgGAMIAABHIgWAAIAAhjIAVAAIABAKQALgMASAAQATAAAIAPQAKgPAUAAQARAAAIAJQAIAJAAASIAABBg");
	this.shape_35.setTransform(271.55,70.55);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgeAnQgNgOAAgWIAAgDQAAgPAGgLQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABANAHAGQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgNgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_36.setTransform(258.275,70.65);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgKBHIAAiNIAVAAIAACNg");
	this.shape_37.setTransform(250.675,68.525);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AASBHIgdgrIgKALIAAAgIgWAAIAAiNIAWAAIAABRIAHgJIAbgeIAbAAIglApIApA6g");
	this.shape_38.setTransform(239.175,68.525);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AghAmQgMgOAAgYIAAAAQAAgPAFgMQAGgLAKgHQALgGANAAQAUAAANANQAMANABAVIAAAFQABAPgGAMQgGALgKAHQgLAGgOAAQgUAAgNgOgAgRgYQgGAIAAARQAAAPAGAJQAHAJAKAAQALAAAHgJQAGgJAAgQQAAgPgHgJQgGgJgLAAQgKAAgHAJg");
	this.shape_39.setTransform(228.2,70.65);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgrBGIAAiKIAVAAIAAALQALgMAPAAQATAAALANQAKAOAAAYIAAACQAAAWgKAOQgLAOgSAAQgPAAgLgLIAAAvgAgVgoIAAAsQAHAMAOAAQAJAAAHgJQAFgIAAgRQAAgPgFgJQgHgJgJAAQgOAAgHALg");
	this.shape_40.setTransform(217.65,72.475);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AAwAzIAAhAQAAgKgDgFQgEgEgLAAQgHAAgFAEQgFAFgCAGIAABEIgVAAIAAhBQAAgSgSAAQgOAAgFAMIAABHIgXAAIAAhjIAVAAIABAKQALgMASAAQATAAAIAPQAKgPAUAAQARAAAIAJQAIAJAAASIAABBg");
	this.shape_41.setTransform(203.8,70.55);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AghAmQgNgOAAgYIAAAAQABgPAFgMQAGgLALgHQAKgGANAAQAUAAANANQAMANABAVIAAAFQABAPgGAMQgGALgLAHQgKAGgOAAQgUAAgNgOgAgRgYQgGAIAAARQAAAPAGAJQAHAJAKAAQALAAAHgJQAGgJAAgQQAAgPgHgJQgGgJgLAAQgKAAgHAJg");
	this.shape_42.setTransform(190.15,70.65);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgKBHIAAiNIAVAAIAACNg");
	this.shape_43.setTransform(182.325,68.525);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgeAnQgNgOAAgWIAAgDQAAgPAGgLQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABANAHAGQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgNgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_44.setTransform(174.875,70.65);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AASBHIgdgrIgKALIAAAgIgWAAIAAiNIAWAAIAABRIAHgJIAbgeIAbAAIglApIApA6g");
	this.shape_45.setTransform(165.375,68.525);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgIQALgIAWgBIAOAAIAAgGQAAgIgFgFQgEgEgIAAQgHAAgFAEQgGAEABAFIgXAAQAAgHAFgIQAGgHAKgEQAJgEAKAAQASAAAKAJQALAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgDgKQgLAMgOAAQgPAAgKgJgAgOAHQgFAEAAAJQgBAGAFAEQAEAEAIAAQAFAAAGgDQAGgDADgGIAAgTIgMAAQgMAAgHAEg");
	this.shape_46.setTransform(149.9,70.65);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AAxAzIAAhAQgBgKgDgFQgFgEgJAAQgIAAgFAEQgFAFgBAGIAABEIgWAAIAAhBQgBgSgRAAQgOAAgGAMIAABHIgWAAIAAhjIAVAAIABAKQAKgMATAAQATAAAHAPQAMgPATAAQARAAAIAJQAIAJAAASIAABBg");
	this.shape_47.setTransform(136.45,70.55);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_48.setTransform(125.775,68.725);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AgKBHIAAiNIAVAAIAACNg");
	this.shape_49.setTransform(120.925,68.525);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AATBHIAAhBQAAgJgEgEQgFgFgJAAQgMAAgHAMIAABHIgXAAIAAiNIAXAAIAAA1QALgNAQAAQAgAAABAkIAABBg");
	this.shape_50.setTransform(108.475,68.525);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AgeAnQgNgOAAgWIAAgDQAAgPAGgLQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABANAHAGQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgNgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_51.setTransform(98.175,70.65);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AgKBHIAAiNIAVAAIAACNg");
	this.shape_52.setTransform(90.575,68.525);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AghAmQgMgOAAgYIAAAAQgBgPAGgMQAGgLAKgHQALgGANAAQAUAAANANQANANAAAVIAAAFQAAAPgFAMQgGALgKAHQgLAGgOAAQgUAAgNgOgAgRgYQgGAIAAARQAAAPAGAJQAHAJAKAAQAMAAAGgJQAGgJAAgQQAAgPgGgJQgHgJgLAAQgKAAgHAJg");
	this.shape_53.setTransform(82.75,70.65);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_54.setTransform(70.175,68.725);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgWBCQgKgEgGgIIALgNQAKAMAQAAQAKAAAGgGQAHgGAAgMIAAgHQgKALgPAAQgSAAgLgOQgLgOAAgYQAAgXALgOQALgOASAAQAQAAAKAMIABgKIAUAAIAABgQAAAUgMALQgMAMgUAAQgLAAgLgFgAgOgrQgHAJAAARQAAAPAHAIQAGAJAKAAQANAAAHgMIAAgrQgHgMgNAAQgKAAgGAJg");
	this.shape_55.setTransform(62.175,72.525);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHAMIAABHIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAkIAABBg");
	this.shape_56.setTransform(51.725,70.55);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_57.setTransform(44.025,68.725);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AgKBHIAAiNIAVAAIAACNg");
	this.shape_58.setTransform(39.175,68.525);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_59.setTransform(34.325,68.725);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgKBHIAAiNIAVAAIAACNg");
	this.shape_60.setTransform(29.475,68.525);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgeAnQgNgOAAgWIAAgDQAAgPAGgLQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABANAHAGQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgNgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_61.setTransform(22.025,70.65);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AASBHIgdgrIgKALIAAAgIgWAAIAAiNIAWAAIAABRIAHgJIAbgeIAbAAIglApIApA6g");
	this.shape_62.setTransform(12.525,68.525);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_63.setTransform(4.525,68.725);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AggA6QgLgOAAgZQAAgWALgOQALgOARAAQAQAAAJALIAAgzIAXAAIAACNIgVAAIgBgKQgKAMgQAAQgRAAgLgOgAgOgEQgHAIAAARQAAAQAHAIQAFAJAKAAQAOAAAGgNIAAgpQgGgNgOAAQgKAAgFAJg");
	this.shape_64.setTransform(-3.5,68.625);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgKgEgEQgEgFgKAAQgMAAgHAMIAABHIgXAAIAAhkIAWAAIAAAMQAMgNARAAQAfAAABAkIAABBg");
	this.shape_65.setTransform(316.775,43.75);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AggArQgKgJAAgMQAAgQAMgIQAMgIAVgBIANAAIAAgGQAAgHgDgGQgFgEgIAAQgIAAgEAEQgGAEAAAFIgWAAQAAgHAFgIQAGgHAJgEQAKgEAKAAQASAAALAJQAKAIAAARIAAAsQAAAOAEAHIAAACIgXAAIgDgKQgKAMgPAAQgPAAgJgJgAgNAHQgHAEAAAJQABAGAEAEQAEAEAIAAQAFAAAGgEQAFgDADgFIAAgTIgLAAQgMAAgGAEg");
	this.shape_66.setTransform(306.35,43.85);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AggA6QgLgOAAgZQAAgWAKgOQAMgOARAAQAQAAAJALIAAgzIAXAAIAACNIgUAAIgCgKQgKAMgQAAQgRAAgLgOgAgPgEQgFAIAAARQAAAQAFAIQAGAJAKAAQAOAAAGgNIAAgpQgGgNgOAAQgKAAgGAJg");
	this.shape_67.setTransform(295.6,41.825);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AATBHIAAhBQAAgJgEgEQgFgFgJAAQgMAAgHAMIAABHIgXAAIAAiNIAXAAIAAA1QALgNAQAAQAgAAABAkIAABBg");
	this.shape_68.setTransform(276.475,41.725);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2C3E50").s().p("AggAqQgJgKAAgSIAAhAIAXAAIAABAQAAATAQAAQAPAAAGgMIAAhHIAXAAIAABjIgWAAIAAgKQgKAMgSAAQgQAAgIgJg");
	this.shape_69.setTransform(265.9,43.925);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2C3E50").s().p("AgVA7IgBALIgVAAIAAiNIAXAAIAAA0QAKgMAPAAQASAAAKAOQALANAAAYIAAABQAAAXgLAOQgKAOgSAAQgQAAgKgNgAgUAAIAAApQAFANAPAAQAKAAAFgIQAHgIAAgQIAAgDQgBgQgFgHQgGgJgKAAQgPAAgFANg");
	this.shape_70.setTransform(255.5,41.825);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2C3E50").s().p("AggAqQgJgKAAgSIAAhAIAXAAIAABAQAAATAQAAQAPAAAGgMIAAhHIAWAAIAABjIgVAAIAAgKQgKAMgRAAQgRAAgIgJg");
	this.shape_71.setTransform(244.65,43.925);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2C3E50").s().p("AgLAjIAAg4IgRAAIAAgRIARAAIAAgYIAWAAIAAAYIARAAIAAARIgRAAIAAA3QAAAGACACQACACAGABIAIgBIAAARQgIACgHAAQgZABAAgdg");
	this.shape_72.setTransform(236.025,42.7);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#2C3E50").s().p("AgLAjIAAg4IgRAAIAAgRIARAAIAAgYIAWAAIAAAYIARAAIAAARIgRAAIAAA3QAAAGACACQACACAGABIAIgBIAAARQgIACgHAAQgZABAAgdg");
	this.shape_73.setTransform(221.025,42.7);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#2C3E50").s().p("AggArQgKgJAAgMQAAgQAMgIQAMgIAVgBIANAAIAAgGQAAgHgEgGQgEgEgIAAQgIAAgFAEQgEAEAAAFIgXAAQAAgHAGgIQAFgHAJgEQAKgEALAAQARAAALAJQAKAIAAARIAAAsQAAAOAEAHIAAACIgXAAIgCgKQgMAMgOAAQgPAAgJgJgAgNAHQgGAEgBAJQAAAGAFAEQAEAEAHAAQAGAAAGgEQAFgDADgFIAAgTIgMAAQgLAAgGAEg");
	this.shape_74.setTransform(212.95,43.85);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#2C3E50").s().p("AgUAvQgKgEgFgIQgGgIAAgIIAXAAQAAAHAFAEQAGAFAIAAQAJAAAFgEQAEgDAAgGQAAgGgEgDQgGgDgKgCQgMgCgHgEQgRgHAAgQQAAgNALgIQALgJAPAAQASAAALAJQALAJAAAOIgWAAQAAgGgFgFQgEgFgJABQgGgBgEAEQgFAEAAAFQAAAGAEACQAEADANADQANADAIAEQAHADAEAGQAEAGAAAHQAAAOgMAJQgLAIgSAAQgLAAgKgFg");
	this.shape_75.setTransform(202.9,43.85);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#2C3E50").s().p("AggAqQgJgKABgSIAAhAIAWAAIAABAQAAATAQAAQAQAAAFgMIAAhHIAXAAIAABjIgWAAIAAgKQgKAMgSAAQgPAAgJgJg");
	this.shape_76.setTransform(192.75,43.925);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#2C3E50").s().p("AgrBGIAAiKIAVAAIAAALQALgMAPAAQATAAAKANQALAOAAAYIAAACQAAAWgLAOQgKAOgSAAQgQAAgKgLIAAAvgAgVgoIAAAsQAHAMANAAQALAAAFgJQAHgIAAgRQAAgPgHgJQgFgJgLAAQgNAAgHALg");
	this.shape_77.setTransform(182.35,45.675);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_78.setTransform(165.675,41.925);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#2C3E50").s().p("AggA6QgLgOAAgZQAAgWAKgOQALgOATAAQAOAAAKALIAAgzIAXAAIAACNIgUAAIgBgKQgLAMgPAAQgTAAgKgOgAgPgEQgFAIAAARQAAAQAFAIQAGAJAKAAQAOAAAGgNIAAgpQgGgNgOAAQgKAAgGAJg");
	this.shape_79.setTransform(157.65,41.825);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#2C3E50").s().p("AASBHIgdgrIgKALIAAAgIgWAAIAAiNIAWAAIAABRIAHgJIAbgeIAbAAIglApIApA6g");
	this.shape_80.setTransform(139.475,41.725);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgIQALgIAWgBIAOAAIAAgGQAAgHgFgGQgEgEgIAAQgHAAgFAEQgGAEABAFIgXAAQAAgHAFgIQAGgHAKgEQAJgEAKAAQASAAAKAJQALAIAAARIAAAsQAAAOAEAHIAAACIgXAAIgCgKQgMAMgOAAQgPAAgKgJgAgOAHQgFAEAAAJQgBAGAFAEQAEAEAIAAQAFAAAGgEQAGgDADgFIAAgTIgMAAQgMAAgHAEg");
	this.shape_81.setTransform(128.75,43.85);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#2C3E50").s().p("AgLAjIAAg4IgRAAIAAgRIARAAIAAgYIAWAAIAAAYIARAAIAAARIgRAAIAAA3QAAAGACACQACACAGABIAIgBIAAARQgIACgHAAQgZABAAgdg");
	this.shape_82.setTransform(120.225,42.7);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#2C3E50").s().p("AgeAnQgNgOAAgXIAAgCQAAgOAGgMQAGgMAKgGQALgHALAAQAVAAALANQALANAAAYIAAAIIhAAAQABAMAHAIQAHAHAKAAQAQAAAKgNIAMAMQgGAJgKAFQgKAFgNAAQgUAAgOgNgAgNgaQgFAGgCAMIAqAAIAAgCQgBgMgFgFQgFgGgKAAQgIAAgGAHg");
	this.shape_83.setTransform(112.275,43.85);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#2C3E50").s().p("AgKBHIAAiNIAVAAIAACNg");
	this.shape_84.setTransform(104.675,41.725);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#2C3E50").s().p("AgZAzIAAhkIAVAAIABAMQAHgNAOAAIAIABIAAAVIgJgBQgPAAgFANIAABDg");
	this.shape_85.setTransform(99.325,43.75);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#2C3E50").s().p("AgeAnQgNgOAAgXIAAgCQAAgOAGgMQAGgMAKgGQALgHALAAQAVAAALANQALANAAAYIAAAIIhAAAQABAMAHAIQAHAHAKAAQAQAAAKgNIAMAMQgGAJgKAFQgKAFgNAAQgUAAgOgNgAgNgaQgFAGgCAMIAqAAIAAgCQgBgMgFgFQgFgGgKAAQgIAAgGAHg");
	this.shape_86.setTransform(90.525,43.85);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#2C3E50").s().p("AgLAjIAAg4IgRAAIAAgRIARAAIAAgYIAWAAIAAAYIARAAIAAARIgRAAIAAA3QAAAGACACQACACAGABIAIgBIAAARQgIACgHAAQgZABAAgdg");
	this.shape_87.setTransform(81.975,42.7);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgIQALgIAWgBIAOAAIAAgGQAAgHgFgGQgEgEgIAAQgHAAgGAEQgEAEAAAFIgXAAQAAgHAFgIQAGgHAKgEQAJgEAKAAQASAAAKAJQALAIAAARIAAAsQAAAOAEAHIAAACIgXAAIgCgKQgLAMgPAAQgPAAgKgJgAgOAHQgFAEAAAJQgBAGAFAEQAEAEAHAAQAGAAAGgEQAGgDADgFIAAgTIgNAAQgLAAgHAEg");
	this.shape_88.setTransform(65.2,43.85);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#2C3E50").s().p("AgkBFIAAgRIAEAAQAJAAAFgEQADgDADgHIAEgJIgkhjIAZAAIATBFIAVhFIAYAAIgoBzQgIAZgWABIgLgCg");
	this.shape_89.setTransform(55.4,45.85);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgKgEgEQgEgFgKAAQgMAAgHAMIAABHIgXAAIAAhkIAWAAIAAAMQAMgNARAAQAfAAABAkIAABBg");
	this.shape_90.setTransform(45.525,43.75);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#2C3E50").s().p("AgLAjIAAg4IgRAAIAAgRIARAAIAAgYIAWAAIAAAYIARAAIAAARIgRAAIAAA3QAAAGACACQACACAGABIAIgBIAAARQgIACgHAAQgZABAAgdg");
	this.shape_91.setTransform(36.875,42.7);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#2C3E50").s().p("AggAqQgJgKAAgSIAAhAIAXAAIAABAQAAATAQAAQAPAAAGgMIAAhHIAWAAIAABjIgVAAIAAgKQgKAMgRAAQgRAAgIgJg");
	this.shape_92.setTransform(28.65,43.925);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#2C3E50").s().p("AgKBHIAAiNIAVAAIAACNg");
	this.shape_93.setTransform(20.975,41.725);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#2C3E50").s().p("AggAqQgJgKAAgSIAAhAIAXAAIAABAQAAATAQAAQAQAAAFgMIAAhHIAWAAIAABjIgUAAIgBgKQgKAMgRAAQgRAAgIgJg");
	this.shape_94.setTransform(13.25,43.925);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#2C3E50").s().p("AAuBEIAAgtIADg7IgoBoIgQAAIgohoIACA7IAAAtIgXAAIAAiGIAeAAIAmBmIAnhmIAeAAIAACGg");
	this.shape_95.setTransform(-0.35,42.1);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#2C3E50").s().p("AgJAJQgDgEAAgFQAAgEADgEQAEgDAFAAQAGAAAEADQADAEAAAEQAAAFgDAEQgEADgGAAQgFAAgEgDg");
	this.shape_96.setTransform(319.275,20.925);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#2C3E50").s().p("AgLAjIAAg4IgRAAIAAgRIARAAIAAgZIAWAAIAAAZIARAAIAAARIgRAAIAAA3QAAAGACACQACADAGgBIAIAAIAAARQgIADgHgBQgZAAAAgcg");
	this.shape_97.setTransform(313.325,15.9);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#2C3E50").s().p("AggAqQgIgKAAgSIAAhAIAWAAIAABAQAAATAQAAQAQAAAFgMIAAhHIAWAAIAABjIgUAAIgBgKQgKAMgRAAQgRAAgIgJg");
	this.shape_98.setTransform(305.1,17.125);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#2C3E50").s().p("AghArQgJgIAAgNQAAgQAMgHQALgJAWAAIAOAAIAAgHQAAgHgFgFQgEgFgIAAQgHAAgGAEQgEADAAAHIgXAAQAAgIAFgIQAGgHAKgEQAJgEALAAQARAAAKAIQALAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgCgKQgLAMgPAAQgPAAgKgJgAgOAHQgFAFAAAHQgBAHAFAEQAEAEAHAAQAGAAAGgEQAGgDADgFIAAgTIgNAAQgLAAgHAEg");
	this.shape_99.setTransform(294.7,17.05);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#2C3E50").s().p("AgKBHIAAiNIAVAAIAACNg");
	this.shape_100.setTransform(287.125,14.925);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhkIAWAAIAAAMQAMgNARAAQAfAAABAjIAABCg");
	this.shape_101.setTransform(272.525,16.95);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#2C3E50").s().p("AghArQgJgIAAgNQAAgQAMgHQAMgJAVAAIAOAAIAAgHQgBgHgEgFQgEgFgIAAQgHAAgGAEQgEADAAAHIgXAAQAAgIAGgIQAFgHAJgEQAKgEALAAQARAAALAIQAKAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgCgKQgMAMgOAAQgPAAgKgJgAgOAHQgFAFgBAHQAAAHAFAEQAEAEAHAAQAGAAAGgEQAGgDADgFIAAgTIgNAAQgLAAgHAEg");
	this.shape_102.setTransform(262.1,17.05);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#2C3E50").s().p("AAWAyIgWhEIgUBEIgTAAIgbhjIAWAAIAQBDIAVhDIAQAAIAUBEIAQhEIAWAAIgbBjg");
	this.shape_103.setTransform(249.875,17.025);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#2C3E50").s().p("AgeAmQgNgNAAgXIAAgCQAAgOAGgMQAGgMAKgGQALgHALAAQAVAAALANQALANAAAYIAAAIIhAAAQABAMAHAIQAHAHAKAAQAQAAAKgNIAMAMQgGAJgKAFQgKAFgNAAQgUAAgOgOgAgNgaQgFAGgCAMIAqAAIAAgCQgBgMgFgFQgFgGgKAAQgIAAgGAHg");
	this.shape_104.setTransform(237.825,17.05);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#2C3E50").s().p("AATBHIAAhBQAAgJgEgEQgFgFgJAAQgMAAgHAMIAABHIgXAAIAAiNIAXAAIAAA1QALgNAQAAQAgAAABAkIAABBg");
	this.shape_105.setTransform(227.375,14.925);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhkIAWAAIAAAMQAMgNARAAQAfAAABAjIAABCg");
	this.shape_106.setTransform(209.925,16.95);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#2C3E50").s().p("AghArQgJgIAAgNQAAgQAMgHQALgJAWAAIANAAIAAgHQAAgHgDgFQgFgFgIAAQgIAAgEAEQgGADAAAHIgWAAQAAgIAFgIQAGgHAKgEQAJgEAKAAQASAAAKAIQALAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgDgKQgLAMgOAAQgPAAgKgJgAgNAHQgHAFABAHQAAAHAEAEQAEAEAIAAQAFAAAGgEQAGgDACgFIAAgTIgLAAQgMAAgGAEg");
	this.shape_107.setTransform(199.5,17.05);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#2C3E50").s().p("AgZAzIAAhkIAVAAIABAMQAHgNAOAAIAIABIAAAVIgJAAQgPAAgFAMIAABDg");
	this.shape_108.setTransform(191.425,16.95);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#2C3E50").s().p("AghAmQgNgOAAgYIAAAAQAAgPAGgLQAGgMALgHQAKgGANAAQAUAAANANQANANABAVIAAAFQAAAPgGALQgGAMgLAHQgKAGgOAAQgUAAgNgOgAgQgZQgHAJAAARQAAAQAHAIQAFAJALAAQAMAAAGgJQAGgJAAgQQAAgQgHgIQgGgJgLAAQgKAAgGAIg");
	this.shape_109.setTransform(182.25,17.05);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#2C3E50").s().p("AgLAjIAAg4IgRAAIAAgRIARAAIAAgZIAWAAIAAAZIARAAIAAARIgRAAIAAA3QAAAGACACQACADAGgBIAIAAIAAARQgIADgHgBQgZAAAAgcg");
	this.shape_110.setTransform(173.475,15.9);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#2C3E50").s().p("AghAmQgNgOAAgYIAAAAQAAgPAGgLQAGgMALgHQAKgGANAAQAUAAANANQANANABAVIAAAFQAAAPgGALQgGAMgLAHQgKAGgOAAQgUAAgNgOgAgQgZQgHAJAAARQAAAQAHAIQAFAJALAAQAMAAAGgJQAGgJAAgQQAAgQgHgIQgGgJgLAAQgKAAgGAIg");
	this.shape_111.setTransform(165.15,17.05);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#2C3E50").s().p("AASBHIgdgrIgKALIAAAgIgWAAIAAiNIAWAAIAABRIAHgJIAbgeIAbAAIglApIApA6g");
	this.shape_112.setTransform(155.425,14.925);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhkIAWAAIAAAMQAMgNARAAQAfAAABAjIAABCg");
	this.shape_113.setTransform(137.675,16.95);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#2C3E50").s().p("AggArQgKgIAAgNQAAgQAMgHQAMgJAVAAIANAAIAAgHQAAgHgDgFQgFgFgIAAQgIAAgEAEQgFADgBAHIgWAAQAAgIAFgIQAGgHAJgEQAKgEAKAAQASAAALAIQAKAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgDgKQgKAMgPAAQgPAAgJgJgAgNAHQgHAFAAAHQABAHAEAEQAEAEAIAAQAFAAAGgEQAFgDADgFIAAgTIgLAAQgMAAgGAEg");
	this.shape_114.setTransform(127.25,17.05);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#2C3E50").s().p("AggA6QgLgOAAgZQAAgWAKgOQAMgOARAAQAQAAAJALIAAgzIAXAAIAACNIgUAAIgCgKQgKAMgQAAQgRAAgLgOgAgPgEQgFAIAAARQAAAQAFAIQAGAJAKAAQAOAAAGgNIAAgpQgGgNgOAAQgKAAgGAJg");
	this.shape_115.setTransform(116.5,15.025);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#2C3E50").s().p("AghArQgJgIAAgNQAAgQAMgHQAMgJAVAAIAOAAIAAgHQAAgHgFgFQgEgFgIAAQgHAAgGAEQgEADAAAHIgXAAQAAgIAGgIQAFgHAKgEQAJgEALAAQARAAALAIQAKAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgCgKQgMAMgOAAQgPAAgKgJgAgOAHQgFAFAAAHQgBAHAFAEQAEAEAHAAQAGAAAGgEQAFgDAEgFIAAgTIgNAAQgLAAgHAEg");
	this.shape_116.setTransform(99.3,17.05);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#2C3E50").s().p("AgUAvQgKgEgFgIQgGgHABgKIAVAAQABAJAGADQAFAFAIAAQAJAAAFgEQAEgDAAgGQAAgFgEgEQgGgCgKgDQgLgDgIgDQgRgIAAgPQAAgNAKgJQAMgIAPAAQATAAAKAIQAMAKAAAOIgXAAQAAgHgEgEQgGgEgIgBQgGABgEADQgFADAAAGQAAAGAEACQAFADAMADQANADAHAEQAIADAEAGQADAGABAHQgBAOgKAJQgMAIgSAAQgLAAgKgFg");
	this.shape_117.setTransform(89.25,17.05);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_118.setTransform(81.975,15.125);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#2C3E50").s().p("AgUAvQgKgEgFgIQgGgHAAgKIAXAAQAAAJAFADQAGAFAIAAQAJAAAFgEQAEgDAAgGQAAgFgEgEQgGgCgKgDQgMgDgHgDQgRgIAAgPQAAgNALgJQALgIAPAAQASAAALAIQALAKAAAOIgWAAQAAgHgFgEQgEgEgJgBQgGABgEADQgFADAAAGQAAAGAEACQAEADANADQANADAIAEQAHADAEAGQAEAGAAAHQAAAOgMAJQgLAIgSAAQgLAAgKgFg");
	this.shape_119.setTransform(74.65,17.05);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#2C3E50").s().p("AgOATQAFgIACgHQACgFABgHIAAgRIATAAIAAAQQgBAJgEAKQgFAKgGAGg");
	this.shape_120.setTransform(60.45,22.475);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_121.setTransform(56.275,15.125);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#2C3E50").s().p("AggArQgKgIAAgNQAAgQAMgHQAMgJAVAAIANAAIAAgHQAAgHgDgFQgFgFgIAAQgIAAgFAEQgEADAAAHIgXAAQAAgIAGgIQAFgHAJgEQAKgEALAAQARAAALAIQAKAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgCgKQgMAMgOAAQgPAAgJgJgAgOAHQgFAFgBAHQAAAHAFAEQAEAEAHAAQAGAAAGgEQAFgDADgFIAAgTIgMAAQgLAAgHAEg");
	this.shape_122.setTransform(48.7,17.05);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#2C3E50").s().p("AASBHIgdgrIgKALIAAAgIgWAAIAAiNIAWAAIAABRIAHgJIAbgeIAbAAIglApIApA6g");
	this.shape_123.setTransform(39.225,14.925);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#2C3E50").s().p("AgWBCQgKgEgGgIIALgNQAKAMAQAAQAKAAAGgGQAHgGAAgMIAAgHQgKALgPAAQgSAAgLgOQgLgOAAgYQAAgXALgOQALgOASAAQAQAAAKAMIABgKIAUAAIAABgQAAAUgMALQgMAMgUAAQgLAAgLgFgAgOgrQgHAJAAARQAAAPAHAIQAGAJAKAAQANAAAHgMIAAgrQgHgMgNAAQgKAAgGAJg");
	this.shape_124.setTransform(28.075,18.925);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhkIAWAAIAAAMQAMgNARAAQAfAAABAjIAABCg");
	this.shape_125.setTransform(17.625,16.95);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#2C3E50").s().p("AggArQgKgIAAgNQAAgQAMgHQALgJAWAAIANAAIAAgHQAAgHgDgFQgFgFgIAAQgIAAgFAEQgEADgBAHIgWAAQAAgIAGgIQAFgHAJgEQAKgEALAAQARAAALAIQAKAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgDgKQgKAMgPAAQgPAAgJgJgAgNAHQgHAFAAAHQABAHAEAEQAEAEAHAAQAGAAAGgEQAFgDADgFIAAgTIgLAAQgMAAgGAEg");
	this.shape_126.setTransform(7.2,17.05);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#2C3E50").s().p("AgVA7IgCALIgUAAIAAiNIAXAAIAAA0QAJgMAQAAQASAAALAOQAKANAAAYIAAABQAAAXgKAOQgLAOgSAAQgRAAgJgNgAgUAAIAAApQAFANAPAAQAKAAAGgIQAFgIAAgQIAAgDQABgQgGgHQgGgJgKAAQgPAAgFANg");
	this.shape_127.setTransform(-3.1,15.025);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#2C3E50").s().p("AgOATQAGgIACgHQABgFAAgHIAAgRIAUAAIAAAQQAAAJgFAKQgFAKgHAGg");
	this.shape_128.setTransform(319.7,-4.325);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#2C3E50").s().p("AgeAmQgNgNAAgXIAAgCQAAgOAGgMQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABANAHAGQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgOgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_129.setTransform(312.925,-9.75);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#2C3E50").s().p("AgUAvQgKgEgFgIQgFgHAAgKIAVAAQABAIAFAFQAGAEAIAAQAJAAAEgDQAFgEABgFQgBgHgFgCQgEgEgLgCQgLgDgJgDQgQgIAAgPQAAgNAKgJQALgIARAAQARAAAMAIQALAJgBAPIgWAAQAAgGgFgFQgEgEgIgBQgHABgFADQgEADAAAHQAAAEAEAEQAFACAMADQANADAHAEQAIADAEAGQADAFAAAJQABANgLAIQgMAJgSAAQgMAAgJgFg");
	this.shape_130.setTransform(302.85,-9.75);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAjIAABCg");
	this.shape_131.setTransform(292.725,-9.85);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#2C3E50").s().p("AgeAmQgNgNAAgXIAAgCQAAgOAGgMQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABANAHAGQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgOgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_132.setTransform(282.425,-9.75);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#2C3E50").s().p("AgrBGIAAiKIAVAAIAAALQALgMAPAAQATAAALANQAKAOAAAYIAAACQAAAWgKAOQgLAOgSAAQgPAAgLgLIAAAvgAgVgoIAAAsQAHAMAOAAQAJAAAHgJQAFgIAAgRQAAgPgFgJQgHgJgJAAQgOAAgHALg");
	this.shape_133.setTransform(272.1,-7.925);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#2C3E50").s().p("AgUAvQgKgEgFgIQgFgHgBgKIAXAAQAAAIAFAFQAGAEAIAAQAJAAAEgDQAGgEAAgFQAAgHgGgCQgEgEgLgCQgLgDgJgDQgQgIAAgPQAAgNALgJQAKgIARAAQARAAAMAIQALAJgBAPIgWAAQAAgGgFgFQgFgEgHgBQgHABgFADQgEADAAAHQAAAEAEAEQAEACANADQANADAIAEQAHADAEAGQAEAFgBAJQAAANgLAIQgLAJgSAAQgLAAgKgFg");
	this.shape_134.setTransform(261.65,-9.75);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#2C3E50").s().p("AggAqQgJgKAAgSIAAhAIAXAAIAABAQAAATAQAAQAPAAAGgMIAAhHIAXAAIAABjIgWAAIAAgKQgKAMgSAAQgQAAgIgJg");
	this.shape_135.setTransform(251.5,-9.675);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#2C3E50").s().p("AgUAvQgKgEgFgIQgGgHABgKIAVAAQABAIAGAFQAFAEAIAAQAJAAAFgDQAEgEAAgFQAAgHgEgCQgGgEgKgCQgLgDgIgDQgRgIAAgPQAAgNAKgJQAMgIAPAAQATAAAKAIQAMAJAAAPIgXAAQAAgGgEgFQgGgEgIgBQgGABgEADQgFADAAAHQAAAEAEAEQAFACAMADQANADAHAEQAIADAEAGQADAFABAJQgBANgKAIQgMAJgSAAQgLAAgKgFg");
	this.shape_136.setTransform(241.35,-9.75);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAjIAABCg");
	this.shape_137.setTransform(201.975,-9.85);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#2C3E50").s().p("AghArQgJgIAAgNQAAgQAMgHQAMgKAVABIAOAAIAAgHQAAgIgFgEQgEgFgIAAQgHAAgGAEQgEADAAAHIgXAAQAAgJAGgHQAFgHAKgEQAJgEALAAQARAAAKAIQALAKAAAPIAAAtQAAAOAEAIIAAABIgXAAIgCgJQgMALgOAAQgPAAgKgJgAgOAHQgFAFAAAHQgBAHAFAEQAEAEAHAAQAGAAAGgDQAFgDAEgGIAAgTIgNAAQgLAAgHAEg");
	this.shape_138.setTransform(191.55,-9.75);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#2C3E50").s().p("AASBHIgdgrIgKALIAAAgIgWAAIAAiNIAWAAIAABRIAHgJIAbgeIAbAAIglApIApA6g");
	this.shape_139.setTransform(182.075,-11.875);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#2C3E50").s().p("AggArQgKgIAAgNQAAgQAMgHQAMgKAVABIANAAIAAgHQAAgIgDgEQgFgFgIAAQgIAAgEAEQgFADgBAHIgWAAQAAgJAFgHQAGgHAJgEQAKgEAKAAQASAAALAIQAKAKAAAPIAAAtQAAAOAEAIIAAABIgXAAIgDgJQgKALgPAAQgPAAgJgJgAgNAHQgHAFAAAHQABAHAEAEQAEAEAIAAQAFAAAGgDQAFgDADgGIAAgTIgLAAQgMAAgGAEg");
	this.shape_140.setTransform(171.35,-9.75);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#2C3E50").s().p("AAwAzIAAhBQAAgJgDgEQgEgFgLAAQgHAAgFAFQgFADgCAHIAABEIgVAAIAAhBQAAgSgSAAQgOAAgFAMIAABHIgXAAIAAhjIAVAAIABAKQALgMASAAQATAAAIAPQAKgPAUAAQARAAAIAJQAIAJAAASIAABBg");
	this.shape_141.setTransform(157.9,-9.85);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#2C3E50").s().p("AgeAmQgNgNAAgXIAAgCQAAgOAGgMQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABANAHAGQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgOgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_142.setTransform(144.625,-9.75);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#2C3E50").s().p("AgrBGIAAiKIAVAAIAAALQALgMAPAAQATAAAKANQALAOAAAYIAAACQAAAWgLAOQgKAOgSAAQgPAAgLgLIAAAvgAgVgoIAAAsQAHAMAOAAQAJAAAGgJQAHgIgBgRQABgPgHgJQgGgJgJAAQgOAAgHALg");
	this.shape_143.setTransform(134.3,-7.925);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_144.setTransform(97.075,-11.675);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAjIAABCg");
	this.shape_145.setTransform(89.375,-9.85);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_146.setTransform(81.675,-11.675);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAjIAABCg");
	this.shape_147.setTransform(44.725,-9.85);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#2C3E50").s().p("AggArQgKgIAAgNQAAgQAMgHQAMgKAVABIANAAIAAgHQAAgIgEgEQgEgFgIAAQgIAAgFAEQgEADAAAHIgXAAQAAgJAGgHQAFgHAJgEQAKgEALAAQARAAALAIQAKAKAAAPIAAAtQAAAOAEAIIAAABIgXAAIgCgJQgMALgOAAQgPAAgJgJgAgOAHQgFAFgBAHQAAAHAFAEQAEAEAHAAQAGAAAGgDQAFgDADgGIAAgTIgMAAQgLAAgHAEg");
	this.shape_148.setTransform(34.3,-9.75);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#2C3E50").s().p("AAWAyIgWhEIgUBEIgTAAIgbhjIAWAAIAQBDIAVhDIAQAAIAUBEIAQhEIAWAAIgbBjg");
	this.shape_149.setTransform(22.075,-9.775);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#2C3E50").s().p("AgeAmQgNgNAAgXIAAgCQAAgOAGgMQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABANAHAGQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgOgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_150.setTransform(10.025,-9.75);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#2C3E50").s().p("AAeBDIAAg7Ig7AAIAAA7IgYAAIAAiGIAYAAIAAA4IA7AAIAAg4IAYAAIAACGg");
	this.shape_151.setTransform(-1.925,-11.5);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.723,0,0,2.619,-214.5,-114.2)).s().p("EghhAR0MAAAgjnMBDCAAAMAAAAjng");
	this.shape_152.setTransform(160.5,53.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop15G5, new cjs.Rectangle(-54,-60.9,429.1,227.9), null);


(lib.drop15G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHAMIAABHIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAkIAABBg");
	this.shape.setTransform(108.875,150.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AggArQgKgJAAgMQAAgQAMgIQAMgIAVgBIANAAIAAgGQAAgHgDgGQgFgEgIAAQgIAAgEAEQgFAEgBAFIgWAAQAAgHAFgIQAGgHAJgEQAKgEAKAAQASAAALAJQAKAIAAARIAAAsQAAANAEAIIAAACIgXAAIgDgKQgKAMgPAAQgPAAgJgJgAgNAHQgHAEAAAJQABAGAEAEQAEAEAIAAQAFAAAGgEQAFgCADgGIAAgTIgLAAQgMAAgGAEg");
	this.shape_1.setTransform(98.45,150.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHAMIAABHIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAkIAABBg");
	this.shape_2.setTransform(88.025,150.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AggArQgKgJAAgMQAAgQAMgIQAMgIAVgBIAOAAIAAgGQgBgHgEgGQgEgEgIAAQgHAAgGAEQgEAEAAAFIgXAAQAAgHAGgIQAFgHAJgEQAKgEALAAQARAAALAJQAKAIAAARIAAAsQAAANAEAIIAAACIgXAAIgCgKQgMAMgOAAQgPAAgJgJgAgOAHQgFAEgBAJQAAAGAFAEQAEAEAHAAQAGAAAGgEQAGgCADgGIAAgTIgNAAQgLAAgHAEg");
	this.shape_3.setTransform(77.6,150.85);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AASBHIgdgrIgKALIAAAgIgWAAIAAiNIAWAAIAABRIAHgJIAbgeIAbAAIglApIApA6g");
	this.shape_4.setTransform(68.125,148.725);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_5.setTransform(60.125,148.925);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgZAzIAAhjIAVAAIABALQAHgNAOAAIAIABIAAAVIgJgBQgPABgFAMIAABDg");
	this.shape_6.setTransform(54.775,150.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgeAnQgNgOAAgWIAAgDQAAgPAGgLQAGgMAKgGQALgHALAAQAVAAALANQALANAAAYIAAAIIhAAAQABAMAHAIQAHAHAKAAQAQAAAKgNIAMAMQgGAJgKAFQgKAFgNAAQgUAAgOgNgAgNgaQgFAGgCAMIAqAAIAAgCQgBgLgFgHQgFgFgKAAQgIAAgGAHg");
	this.shape_7.setTransform(45.975,150.85);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgrBGIAAiKIAVAAIAAALQALgMAPAAQATAAAKANQALAOAAAYIAAACQAAAWgLAOQgKAOgSAAQgQAAgKgLIAAAvgAgVgoIAAAsQAHAMANAAQALAAAFgJQAHgIgBgRQABgPgHgJQgFgJgLAAQgNAAgHALg");
	this.shape_8.setTransform(35.65,152.675);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AAwAzIAAhBQAAgJgDgEQgEgFgLAAQgHAAgFAFQgFAEgCAGIAABEIgVAAIAAhBQAAgSgSAAQgOAAgFALIAABIIgXAAIAAhkIAVAAIABALQALgMASAAQATAAAIAPQAKgPAUAAQARAAAIAJQAIAJAAASIAABBg");
	this.shape_9.setTransform(351.05,123.95);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgHQALgJAWAAIANAAIAAgHQAAgHgDgGQgFgEgIAAQgIAAgEAEQgGADAAAGIgWAAQAAgHAFgIQAGgHAKgEQAJgEAKAAQASAAAKAIQALAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgDgKQgLAMgOAAQgPAAgKgJgAgNAHQgHAEABAJQAAAGAEAEQAEAEAIAAQAFAAAGgEQAGgDACgFIAAgTIgLAAQgMAAgGAEg");
	this.shape_10.setTransform(337.65,124.05);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgKBHIAAiNIAVAAIAACNg");
	this.shape_11.setTransform(330.075,121.925);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgHQAMgJAVAAIAOAAIAAgHQAAgHgFgGQgEgEgIAAQgHAAgGAEQgEADAAAGIgXAAQAAgHAGgIQAFgHAKgEQAJgEALAAQARAAALAIQAKAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgCgKQgMAMgOAAQgPAAgKgJgAgOAHQgFAEAAAJQgBAGAFAEQAEAEAHAAQAGAAAGgEQAFgDAEgFIAAgTIgNAAQgLAAgHAEg");
	this.shape_12.setTransform(322.5,124.05);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AggA6QgLgOAAgZQAAgWALgOQAKgOATAAQAPAAAJALIAAgzIAXAAIAACNIgUAAIgBgKQgLAMgPAAQgSAAgLgOgAgOgEQgHAIABARQgBAQAHAIQAFAJAKAAQAOAAAGgNIAAgpQgGgNgOAAQgKAAgFAJg");
	this.shape_13.setTransform(311.75,122.025);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgKgEgEQgEgFgKAAQgMAAgHAMIAABHIgXAAIAAhkIAWAAIAAAMQAMgNARAAQAfAAABAkIAABBg");
	this.shape_14.setTransform(274.025,123.95);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AggArQgKgJAAgMQAAgQAMgHQAMgJAVAAIANAAIAAgHQAAgHgDgGQgFgEgIAAQgIAAgEAEQgFADgBAGIgWAAQAAgHAFgIQAGgHAJgEQAKgEAKAAQASAAALAIQAKAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgDgKQgKAMgPAAQgPAAgJgJgAgNAHQgHAEAAAJQABAGAEAEQAEAEAIAAQAFAAAGgEQAFgDADgFIAAgTIgLAAQgMAAgGAEg");
	this.shape_15.setTransform(263.6,124.05);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AASBHIgdgrIgKALIAAAgIgWAAIAAiNIAWAAIAABRIAHgJIAbgeIAbAAIglApIApA6g");
	this.shape_16.setTransform(254.125,121.925);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgHQALgJAWAAIAOAAIAAgHQAAgHgFgGQgEgEgIAAQgHAAgGAEQgEADAAAGIgXAAQAAgHAFgIQAGgHAKgEQAJgEAKAAQASAAAKAIQALAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgCgKQgLAMgPAAQgPAAgKgJgAgOAHQgFAEAAAJQgBAGAFAEQAEAEAHAAQAGAAAGgEQAGgDADgFIAAgTIgNAAQgLAAgHAEg");
	this.shape_17.setTransform(243.4,124.05);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgrBGIAAiKIAVAAIAAALQALgMAQAAQASAAAKANQALAOAAAYIAAACQAAAWgLAOQgKAOgSAAQgQAAgKgLIAAAvgAgVgoIAAAsQAHAMANAAQALAAAFgJQAHgIAAgRQAAgPgHgJQgFgJgLAAQgNAAgHALg");
	this.shape_18.setTransform(233.1,125.875);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_19.setTransform(197.825,122.125);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AggArQgKgJAAgMQAAgQAMgHQAMgJAVAAIANAAIAAgHQAAgHgDgGQgFgEgIAAQgIAAgEAEQgFADgBAGIgWAAQAAgHAFgIQAGgHAJgEQAKgEAKAAQASAAALAIQAKAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgDgKQgKAMgPAAQgPAAgJgJgAgNAHQgHAEAAAJQABAGAEAEQAEAEAIAAQAFAAAGgEQAFgDADgFIAAgTIgLAAQgMAAgGAEg");
	this.shape_20.setTransform(190.25,124.05);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgWBCQgKgEgGgIIALgNQAKAMAQAAQAKAAAGgGQAHgGAAgMIAAgHQgKALgPAAQgSAAgLgOQgLgOAAgYQAAgXALgOQALgOASAAQAQAAAKAMIABgKIAUAAIAABgQAAAUgMALQgMAMgUAAQgLAAgLgFgAgOgrQgHAJAAARQAAAPAHAIQAGAJAKAAQANAAAHgMIAAgrQgHgMgNAAQgKAAgGAJg");
	this.shape_21.setTransform(179.525,125.925);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AggArQgKgJAAgMQAAgQAMgHQALgJAWAAIANAAIAAgHQAAgHgDgGQgFgEgIAAQgIAAgFAEQgEADgBAGIgWAAQAAgHAGgIQAFgHAJgEQAKgEALAAQARAAALAIQAKAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgDgKQgKAMgPAAQgPAAgJgJgAgNAHQgHAEAAAJQABAGAEAEQAEAEAIAAQAFAAAGgEQAFgDADgFIAAgTIgMAAQgLAAgGAEg");
	this.shape_22.setTransform(169.2,124.05);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgVA7IgCALIgUAAIAAiNIAXAAIAAA0QAJgMAQAAQASAAALAOQAKANAAAYIAAABQAAAXgKAOQgLAOgSAAQgRAAgJgNgAgUAAIAAApQAFANAPAAQAKAAAGgIQAFgIAAgQIAAgDQABgQgGgHQgGgJgKAAQgPAAgFANg");
	this.shape_23.setTransform(158.9,122.025);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgeAmQgNgNAAgXIAAgCQAAgOAGgMQAGgMAKgGQALgHALAAQAVAAALANQALANAAAYIAAAIIhAAAQABAMAHAIQAHAHAKAAQAQAAAKgNIAMAMQgGAJgKAFQgKAFgNAAQgUAAgOgOgAgNgaQgFAGgCAMIAqAAIAAgCQgBgMgFgFQgFgGgKAAQgIAAgGAHg");
	this.shape_24.setTransform(148.325,124.05);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgUAvQgKgEgFgIQgFgHgBgJIAWAAQABAHAFAEQAGAFAIAAQAJAAAEgEQAGgDAAgGQAAgFgGgEQgEgDgLgCQgLgCgJgEQgQgIAAgPQAAgNALgJQAKgIARAAQARAAAMAIQALAKgBAOIgWAAQAAgGgFgFQgFgEgHAAQgHAAgFADQgEAEAAAFQAAAGAEACQAEADANADQANADAIAEQAHADAEAGQAEAGgBAHQABAOgLAJQgMAIgSAAQgMAAgJgFg");
	this.shape_25.setTransform(138.25,124.05);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgHQALgJAWAAIANAAIAAgHQAAgHgDgGQgFgEgIAAQgIAAgEAEQgGADAAAGIgWAAQAAgHAFgIQAGgHAKgEQAJgEAKAAQASAAAKAIQALAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgDgKQgLAMgOAAQgPAAgKgJgAgNAHQgHAEABAJQAAAGAEAEQAEAEAIAAQAFAAAGgEQAGgDACgFIAAgTIgLAAQgMAAgGAEg");
	this.shape_26.setTransform(100.95,124.05);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgkBFIAAgRIAFAAQAIAAAEgEQAEgDADgHIADgJIgjhjIAYAAIAUBFIAVhFIAYAAIgoBzQgIAZgWABIgLgCg");
	this.shape_27.setTransform(91.15,126.05);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgKgEgEQgEgFgKAAQgMAAgHAMIAABHIgXAAIAAhkIAWAAIAAAMQAMgNARAAQAfAAABAkIAABBg");
	this.shape_28.setTransform(81.275,123.95);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AggArQgKgJAAgMQAAgQAMgHQAMgJAVAAIAOAAIAAgHQgBgHgEgGQgEgEgIAAQgHAAgGAEQgEADAAAGIgXAAQAAgHAGgIQAFgHAJgEQAKgEALAAQARAAALAIQAKAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgCgKQgMAMgOAAQgPAAgJgJgAgOAHQgFAEgBAJQAAAGAFAEQAEAEAHAAQAGAAAGgEQAGgDADgFIAAgTIgNAAQgLAAgHAEg");
	this.shape_29.setTransform(70.85,124.05);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgUAvQgKgEgFgIQgGgHAAgJIAXAAQAAAHAGAEQAFAFAIAAQAJAAAFgEQAEgDAAgGQAAgFgEgEQgGgDgKgCQgMgCgHgEQgRgIAAgPQAAgNAKgJQAMgIAPAAQATAAAKAIQAMAKAAAOIgXAAQAAgGgEgFQgGgEgIAAQgGAAgEADQgFAEAAAFQAAAGAEACQAFADAMADQANADAIAEQAHADAEAGQAEAGAAAHQAAAOgMAJQgLAIgSAAQgLAAgKgFg");
	this.shape_30.setTransform(60.8,124.05);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgHQALgJAWAAIAOAAIAAgHQAAgHgFgGQgEgEgIAAQgHAAgGAEQgEADAAAGIgXAAQAAgHAGgIQAFgHAKgEQAJgEAKAAQASAAAKAIQALAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgCgKQgLAMgPAAQgPAAgKgJgAgOAHQgFAEAAAJQgBAGAFAEQAEAEAHAAQAGAAAGgEQAGgDADgFIAAgTIgNAAQgLAAgHAEg");
	this.shape_31.setTransform(50.8,124.05);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_32.setTransform(43.225,122.125);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgWA7IgBALIgUAAIAAiNIAWAAIAAA0QAKgMAQAAQASAAAKAOQALANAAAYIAAABQAAAXgLAOQgJAOgTAAQgRAAgKgNgAgVAAIAAApQAGANAPAAQAKAAAFgIQAHgIgBgQIAAgDQAAgQgFgHQgGgJgKAAQgOAAgHANg");
	this.shape_33.setTransform(35.65,122.025);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AghArQgJgIAAgNQAAgQAMgHQALgKAWABIANAAIAAgHQAAgIgDgEQgFgFgIAAQgIAAgEAEQgGADAAAHIgWAAQAAgJAFgHQAGgHAKgEQAJgEAKAAQASAAAKAIQALAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgDgJQgLALgOAAQgPAAgKgJgAgNAHQgHAFABAHQAAAHAEAEQAEAEAIAAQAFAAAGgEQAGgDACgFIAAgTIgLAAQgMAAgGAEg");
	this.shape_34.setTransform(354.3,97.25);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgWBCQgKgEgGgIIALgNQAKAMAQAAQAKAAAGgGQAHgGAAgMIAAgHQgKALgPAAQgSAAgLgOQgLgOAAgYQAAgXALgOQALgOASAAQAQAAAKAMIABgKIAUAAIAABgQAAAUgMALQgMAMgUAAQgLAAgLgFgAgOgrQgHAJAAARQAAAPAHAIQAGAJAKAAQANAAAHgMIAAgrQgHgMgNAAQgKAAgGAJg");
	this.shape_35.setTransform(343.575,99.125);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgWBCQgKgEgGgIIALgNQAKAMAQAAQAKAAAGgGQAHgGAAgMIAAgHQgKALgPAAQgSAAgLgOQgLgOAAgYQAAgXALgOQALgOASAAQAQAAAKAMIABgKIAUAAIAABgQAAAUgMALQgMAMgUAAQgLAAgLgFgAgOgrQgHAJAAARQAAAPAHAIQAGAJAKAAQANAAAHgMIAAgrQgHgMgNAAQgKAAgGAJg");
	this.shape_36.setTransform(332.825,99.125);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhkIAWAAIAAAMQAMgNARAAQAfAAABAjIAABCg");
	this.shape_37.setTransform(322.375,97.15);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_38.setTransform(314.675,95.325);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AATBHIAAhBQAAgJgEgEQgFgFgJAAQgMAAgHAMIAABHIgXAAIAAiNIAXAAIAAA1QALgNAQAAQAgAAABAkIAABBg");
	this.shape_39.setTransform(306.975,95.125);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgeAmQgNgNAAgXIAAgCQAAgPAGgLQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABAMAHAIQAHAHAKAAQAQAAAKgNIAMAMQgGAJgKAFQgKAFgNAAQgUAAgOgOgAgNgbQgFAHgCALIAqAAIAAgBQgBgMgFgFQgFgGgKAAQgIAAgGAGg");
	this.shape_40.setTransform(296.675,97.25);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgUAvQgKgEgFgIQgGgHAAgKIAXAAQAAAJAFADQAGAFAIAAQAJAAAFgDQAEgEAAgFQAAgHgEgCQgGgDgKgDQgMgDgHgDQgRgIAAgPQAAgNALgJQALgIAPAAQASAAALAIQALAKAAAOIgWAAQAAgHgFgEQgEgEgJgBQgGABgEADQgFADAAAHQAAAEAEADQAEADANADQANADAIAEQAHADAEAGQAEAGAAAHQAAAOgMAJQgLAIgSAAQgLAAgKgFg");
	this.shape_41.setTransform(286.6,97.25);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhkIAWAAIAAAMQAMgNARAAQAfAAABAjIAABCg");
	this.shape_42.setTransform(235.325,97.15);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AggArQgKgIAAgNQAAgQAMgHQAMgKAVABIANAAIAAgHQAAgIgDgEQgFgFgIAAQgIAAgEAEQgFADgBAHIgWAAQAAgJAFgHQAGgHAJgEQAKgEAKAAQASAAALAIQAKAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgDgJQgKALgPAAQgPAAgJgJgAgNAHQgHAFAAAHQABAHAEAEQAEAEAIAAQAFAAAGgEQAFgDADgFIAAgTIgLAAQgMAAgGAEg");
	this.shape_43.setTransform(224.9,97.25);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AAWAyIgWhEIgUBEIgTAAIgbhjIAWAAIAQBDIAVhDIAQAAIAUBEIAQhEIAWAAIgbBjg");
	this.shape_44.setTransform(212.675,97.225);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgeAmQgNgNAAgXIAAgCQAAgPAGgLQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABAMAHAIQAHAHAKAAQAQAAAKgNIAMAMQgGAJgKAFQgKAFgNAAQgUAAgOgOgAgNgbQgFAHgCALIAqAAIAAgBQgBgMgFgFQgFgGgKAAQgIAAgGAGg");
	this.shape_45.setTransform(200.625,97.25);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AATBHIAAhBQAAgJgEgEQgFgFgJAAQgMAAgHAMIAABHIgXAAIAAiNIAXAAIAAA1QALgNAQAAQAgAAABAkIAABBg");
	this.shape_46.setTransform(190.175,95.125);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhkIAWAAIAAAMQAMgNARAAQAfAAABAjIAABCg");
	this.shape_47.setTransform(138.475,97.15);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AggArQgKgIAAgNQAAgQAMgHQALgKAWABIANAAIAAgHQAAgIgDgEQgFgFgIAAQgIAAgEAEQgGADAAAHIgWAAQAAgJAFgHQAGgHAJgEQAKgEAKAAQASAAAKAIQALAKAAAQIAAAsQAAAOAEAHIAAACIgXAAIgDgJQgLALgOAAQgPAAgJgJgAgNAHQgHAFAAAHQABAHAEAEQAEAEAIAAQAFAAAGgEQAFgDADgFIAAgTIgLAAQgMAAgGAEg");
	this.shape_48.setTransform(128.05,97.25);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AATBHIAAhBQAAgJgEgEQgFgFgJAAQgMAAgHAMIAABHIgXAAIAAiNIAXAAIAAA1QALgNAQAAQAgAAABAkIAABBg");
	this.shape_49.setTransform(117.625,95.125);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AggAqQgJgKAAgSIAAhAIAXAAIAABAQAAATAQAAQAPAAAGgMIAAhHIAXAAIAABjIgWAAIAAgKQgKAMgSAAQgQAAgIgJg");
	this.shape_50.setTransform(107.05,97.325);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AgVA7IgBALIgVAAIAAiNIAWAAIAAA0QALgMAPAAQASAAAKAOQALANAAAYIAAABQAAAXgLAOQgKAOgSAAQgQAAgKgNgAgVAAIAAApQAGANAPAAQAKAAAFgIQAHgIAAgQIAAgDQgBgQgFgHQgGgJgKAAQgPAAgGANg");
	this.shape_51.setTransform(96.65,95.225);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AAxAzIAAhBQAAgJgFgEQgDgFgKAAQgIAAgFAFQgFAEgBAGIAABEIgWAAIAAhBQAAgSgSAAQgOAAgGAMIAABHIgWAAIAAhkIAVAAIABALQAKgMATAAQATAAAHAPQAMgPATAAQARAAAIAJQAIAJAAASIAABBg");
	this.shape_52.setTransform(82.8,97.15);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AggAqQgJgKAAgSIAAhAIAXAAIAABAQAAATAQAAQAPAAAGgMIAAhHIAXAAIAABjIgWAAIAAgKQgKAMgRAAQgRAAgIgJg");
	this.shape_53.setTransform(69.25,97.325);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgLAiIAAg3IgRAAIAAgRIARAAIAAgZIAWAAIAAAZIARAAIAAARIgRAAIAAA3QAAAFACADQACADAGgBIAIAAIAAARQgIACgHAAQgZAAAAgdg");
	this.shape_54.setTransform(60.625,96.1);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgZAzIAAhkIAVAAIABAMQAHgNAOAAIAIABIAAAVIgJAAQgPAAgFAMIAABDg");
	this.shape_55.setTransform(54.775,97.15);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AgeAmQgNgNAAgXIAAgCQAAgPAGgLQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABAMAHAIQAHAHAKAAQAQAAAKgNIAMAMQgGAJgKAFQgKAFgNAAQgUAAgOgOgAgNgbQgFAHgCALIAqAAIAAgBQgBgMgFgFQgFgGgKAAQgIAAgGAGg");
	this.shape_56.setTransform(45.975,97.25);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AgrBGIAAiKIAVAAIAAALQALgMAPAAQATAAAKANQALAOAAAYIAAACQAAAWgLAOQgKAOgSAAQgQAAgKgLIAAAvgAgVgoIAAAsQAHAMANAAQALAAAFgJQAHgIgBgRQABgPgHgJQgFgJgLAAQgNAAgHALg");
	this.shape_57.setTransform(35.65,99.075);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AASBHIgdgrIgKALIAAAgIgWAAIAAiNIAWAAIAABRIAHgJIAbgeIAbAAIglApIApA6g");
	this.shape_58.setTransform(355.025,68.325);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AggAqQgIgKAAgSIAAhAIAWAAIAABAQAAATAQAAQAQAAAFgMIAAhHIAWAAIAABjIgUAAIgBgKQgKAMgSAAQgPAAgJgJg");
	this.shape_59.setTransform(344.15,70.525);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgLAiIAAg3IgRAAIAAgRIARAAIAAgZIAWAAIAAAZIARAAIAAARIgRAAIAAA3QAAAFACADQACACAGAAIAIAAIAAARQgIADgHAAQgZgBAAgdg");
	this.shape_60.setTransform(335.525,69.3);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgKgEgEQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAjIAABCg");
	this.shape_61.setTransform(327.325,70.35);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AggAqQgJgKAAgSIAAhAIAXAAIAABAQAAATAQAAQAPAAAGgMIAAhHIAXAAIAABjIgWAAIAAgKQgKAMgSAAQgQAAgIgJg");
	this.shape_62.setTransform(316.75,70.525);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AASBHIgdgrIgKALIAAAgIgWAAIAAiNIAWAAIAABRIAHgJIAbgeIAbAAIglApIApA6g");
	this.shape_63.setTransform(271.225,68.325);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_64.setTransform(263.225,68.525);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgIQALgJAWAAIAOAAIAAgGQAAgIgFgEQgEgFgIAAQgHAAgFAEQgGAEABAGIgXAAQAAgJAFgHQAGgHAKgEQAJgEAKAAQASAAAKAIQALAKAAAPIAAAtQAAANAEAJIAAABIgXAAIgDgJQgLALgOAAQgPAAgKgJgAgOAHQgFAFAAAHQgBAHAFAEQAEAEAIAAQAFAAAGgDQAGgEADgFIAAgTIgMAAQgMAAgHAEg");
	this.shape_65.setTransform(255.65,70.45);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AgWA7IAAALIgVAAIAAiNIAWAAIAAA0QAKgMAQAAQASAAAKAOQALANAAAYIAAABQAAAXgLAOQgJAOgTAAQgRAAgKgNgAgVAAIAAApQAGANAPAAQAKAAAFgIQAHgIAAgQIAAgDQgBgQgFgHQgGgJgKAAQgOAAgHANg");
	this.shape_66.setTransform(245.35,68.425);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AggArQgKgJAAgMQAAgQAMgIQALgJAWAAIANAAIAAgGQAAgIgDgEQgFgFgIAAQgIAAgEAEQgGAEAAAGIgWAAQAAgJAFgHQAGgHAJgEQAKgEAKAAQASAAAKAIQALAKAAAPIAAAtQAAANAEAJIAAABIgXAAIgDgJQgLALgOAAQgPAAgJgJgAgNAHQgHAFAAAHQABAHAEAEQAEAEAIAAQAFAAAGgDQAFgEADgFIAAgTIgLAAQgMAAgGAEg");
	this.shape_67.setTransform(198.7,70.45);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AgWBCQgKgEgGgIIALgNQAKAMAQAAQAKAAAGgGQAHgGAAgMIAAgHQgKALgPAAQgSAAgLgOQgLgOAAgYQAAgXALgOQALgOASAAQAQAAAKAMIABgKIAUAAIAABgQAAAUgMALQgMAMgUAAQgLAAgLgFgAgOgrQgHAJAAARQAAAPAHAIQAGAJAKAAQANAAAHgMIAAgrQgHgMgNAAQgKAAgGAJg");
	this.shape_68.setTransform(187.975,72.325);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2C3E50").s().p("AgWBCQgKgEgGgIIALgNQAKAMAQAAQAKAAAGgGQAHgGAAgMIAAgHQgKALgPAAQgSAAgLgOQgLgOAAgYQAAgXALgOQALgOASAAQAQAAAKAMIABgKIAUAAIAABgQAAAUgMALQgMAMgUAAQgLAAgLgFgAgOgrQgHAJAAARQAAAPAHAIQAGAJAKAAQANAAAHgMIAAgrQgHgMgNAAQgKAAgGAJg");
	this.shape_69.setTransform(177.225,72.325);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgKgEgEQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAjIAABCg");
	this.shape_70.setTransform(166.775,70.35);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_71.setTransform(159.075,68.525);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2C3E50").s().p("AATBHIAAhBQAAgJgEgEQgFgFgJAAQgMAAgHAMIAABHIgXAAIAAiNIAXAAIAAA1QALgNAQAAQAgAAABAkIAABBg");
	this.shape_72.setTransform(151.375,68.325);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#2C3E50").s().p("AgeAnQgNgOAAgWIAAgDQAAgOAGgMQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABAMAHAHQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgNgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_73.setTransform(141.075,70.45);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#2C3E50").s().p("AgUAwQgKgFgFgIQgGgIAAgJIAXAAQAAAIAGAFQAFAEAIAAQAJAAAFgDQAEgEAAgFQAAgHgEgCQgGgDgKgDQgMgDgHgDQgRgIAAgPQAAgNAKgJQAMgIAPAAQATAAAKAIQAMAJAAAPIgXAAQAAgGgEgFQgGgFgIAAQgGAAgEAEQgFADAAAHQAAAEAEAEQAFACAMADQANADAHAEQAIADAEAGQAEAFAAAJQAAANgMAIQgLAJgSAAQgLAAgKgEg");
	this.shape_74.setTransform(131,70.45);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgKgEgEQgEgFgKAAQgMAAgHANIAABGIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAjIAABCg");
	this.shape_75.setTransform(84.925,70.35);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_76.setTransform(77.225,68.525);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#2C3E50").s().p("AgeAnQgNgOAAgWIAAgDQAAgOAGgMQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABAMAHAHQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgNgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_77.setTransform(69.775,70.45);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#2C3E50").s().p("AgLAiIAAg3IgRAAIAAgRIARAAIAAgZIAWAAIAAAZIARAAIAAARIgRAAIAAA3QAAAFACADQACACAGAAIAIAAIAAARQgIADgHAAQgZgBAAgdg");
	this.shape_78.setTransform(61.225,69.3);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#2C3E50").s().p("AghAmQgNgOAAgYIAAAAQABgPAFgMQAGgMALgGQAKgGANAAQAUAAANANQAMANABAWIAAAEQABAOgGAMQgGAMgLAGQgKAHgOAAQgUAAgNgOgAgRgZQgGAKAAAQQAAAPAGAJQAHAJAKAAQALAAAHgJQAGgJAAgQQAAgPgHgJQgGgJgLAAQgKAAgHAIg");
	this.shape_79.setTransform(52.9,70.45);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#2C3E50").s().p("AgZAzIAAhjIAVAAIABALQAHgNAOAAIAIABIAAAVIgJAAQgPgBgFAMIAABEg");
	this.shape_80.setTransform(44.575,70.35);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#2C3E50").s().p("AgrBGIAAiKIAVAAIAAALQALgMAPAAQATAAAKANQALAOAAAYIAAACQAAAWgLAOQgKAOgSAAQgQAAgKgLIAAAvgAgVgoIAAAsQAHAMANAAQALAAAFgJQAHgIgBgRQABgPgHgJQgFgJgLAAQgNAAgHALg");
	this.shape_81.setTransform(35.65,72.275);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#2C3E50").s().p("AASBHIgdgrIgKALIAAAgIgWAAIAAiNIAWAAIAABRIAHgJIAbgeIAbAAIglApIApA6g");
	this.shape_82.setTransform(355.025,41.525);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgIQALgIAWgBIAOAAIAAgGQAAgIgFgFQgEgEgIAAQgHAAgFAEQgGAEAAAFIgWAAQAAgHAFgIQAGgHAKgEQAJgEAKAAQASAAAKAJQALAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgDgJQgLALgOAAQgPAAgKgJgAgOAHQgFAEAAAJQgBAGAFAEQAEAEAIAAQAFAAAGgDQAGgDADgGIAAgTIgMAAQgMAAgHAEg");
	this.shape_83.setTransform(344.3,43.65);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#2C3E50").s().p("AgkBFIAAgSIAFAAQAIAAAEgDQAEgCADgIIADgJIgjhiIAZAAIATBDIAVhDIAYAAIgoByQgIAagWAAIgLgCg");
	this.shape_84.setTransform(334.5,45.65);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHAMIAABHIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAkIAABBg");
	this.shape_85.setTransform(324.625,43.55);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#2C3E50").s().p("AggArQgKgJAAgMQAAgQAMgIQAMgIAVgBIANAAIAAgGQAAgIgEgFQgEgEgIAAQgIAAgFAEQgEAEAAAFIgXAAQAAgHAGgIQAFgHAJgEQAKgEALAAQARAAALAJQAKAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgCgJQgMALgOAAQgPAAgJgJgAgNAHQgGAEgBAJQAAAGAFAEQAEAEAHAAQAGAAAGgDQAFgDADgGIAAgTIgMAAQgLAAgGAEg");
	this.shape_86.setTransform(314.2,43.65);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#2C3E50").s().p("AgVA7IgBALIgVAAIAAiNIAXAAIAAA0QAJgMAQAAQASAAALAOQAKANAAAYIAAABQAAAXgKAOQgKAOgTAAQgRAAgJgNgAgUAAIAAApQAFANAPAAQAKAAAGgIQAFgIABgQIAAgDQAAgQgGgHQgGgJgKAAQgPAAgFANg");
	this.shape_87.setTransform(303.9,41.625);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#2C3E50").s().p("AgWBCQgKgEgGgIIALgNQAKAMAQAAQAKAAAGgGQAHgGAAgMIAAgHQgKALgPAAQgSAAgLgOQgLgOAAgYQAAgXALgOQALgOASAAQAQAAAKAMIABgKIAUAAIAABgQAAAUgMALQgMAMgUAAQgLAAgLgFgAgOgrQgHAJAAARQAAAPAHAIQAGAJAKAAQANAAAHgMIAAgrQgHgMgNAAQgKAAgGAJg");
	this.shape_88.setTransform(266.825,45.525);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHAMIAABHIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAkIAABBg");
	this.shape_89.setTransform(256.375,43.55);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#2C3E50").s().p("AggAqQgIgKgBgSIAAhAIAXAAIAABAQAAATAQAAQAQAAAFgMIAAhHIAWAAIAABjIgUAAIgBgKQgKAMgRAAQgRAAgIgJg");
	this.shape_90.setTransform(245.8,43.725);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#2C3E50").s().p("AggA6QgLgOAAgZQAAgWAKgOQALgOATAAQAOAAAKALIAAgzIAXAAIAACNIgUAAIgBgKQgLAMgPAAQgTAAgKgOgAgPgEQgFAIAAARQAAAQAFAIQAGAJAKAAQAOAAAGgNIAAgpQgGgNgOAAQgKAAgGAJg");
	this.shape_91.setTransform(234.95,41.625);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHAMIAABHIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAkIAABBg");
	this.shape_92.setTransform(224.525,43.55);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#2C3E50").s().p("AggArQgKgJAAgMQAAgQAMgIQAMgIAVgBIANAAIAAgGQAAgIgDgFQgFgEgIAAQgIAAgEAEQgFAEgBAFIgWAAQAAgHAFgIQAGgHAJgEQAKgEAKAAQASAAALAJQAKAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgDgJQgKALgPAAQgPAAgJgJgAgNAHQgHAEAAAJQABAGAEAEQAEAEAIAAQAFAAAGgDQAFgDADgGIAAgTIgLAAQgMAAgGAEg");
	this.shape_93.setTransform(214.1,43.65);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#2C3E50").s().p("AgWBCQgKgEgGgIIALgNQAKAMAQAAQAKAAAGgGQAHgGAAgMIAAgHQgKALgPAAQgSAAgLgOQgLgOAAgYQAAgXALgOQALgOASAAQAQAAAKAMIABgKIAUAAIAABgQAAAUgMALQgMAMgUAAQgLAAgLgFgAgOgrQgHAJAAARQAAAPAHAIQAGAJAKAAQANAAAHgMIAAgrQgHgMgNAAQgKAAgGAJg");
	this.shape_94.setTransform(203.375,45.525);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHAMIAABHIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAkIAABBg");
	this.shape_95.setTransform(192.925,43.55);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#2C3E50").s().p("AgeAnQgNgOAAgWIAAgDQAAgPAGgLQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABANAHAGQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgNgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_96.setTransform(182.625,43.65);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#2C3E50").s().p("AAwAzIAAhAQAAgKgDgFQgEgEgLAAQgHAAgFAEQgFAFgCAGIAABEIgVAAIAAhBQAAgSgSAAQgOAAgFALIAABIIgXAAIAAhjIAVAAIABAKQALgMASAAQATAAAIAPQAKgPAUAAQARAAAIAJQAIAJAAASIAABBg");
	this.shape_97.setTransform(169.15,43.55);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_98.setTransform(132.525,41.725);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHAMIAABHIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAkIAABBg");
	this.shape_99.setTransform(124.825,43.55);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#2C3E50").s().p("AgKBFIAAhjIAVAAIAABjgAgIgwQgEgDAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDADQgEAEgGAAQgFAAgDgEg");
	this.shape_100.setTransform(117.125,41.725);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#2C3E50").s().p("AATAzIAAhAQAAgJgEgFQgEgFgKAAQgMAAgHAMIAABHIgXAAIAAhjIAWAAIAAALQAMgNARAAQAfAAABAkIAABBg");
	this.shape_101.setTransform(83.475,43.55);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#2C3E50").s().p("AghArQgJgJAAgMQAAgQAMgIQALgIAWgBIANAAIAAgGQAAgIgDgFQgFgEgIAAQgIAAgEAEQgGAEAAAFIgWAAQAAgHAFgIQAGgHAKgEQAJgEAKAAQASAAAKAJQALAIAAAQIAAAtQAAANAEAJIAAABIgXAAIgDgJQgLALgOAAQgPAAgKgJgAgNAHQgHAEABAJQAAAGAEAEQAEAEAIAAQAFAAAGgDQAGgDACgGIAAgTIgLAAQgMAAgGAEg");
	this.shape_102.setTransform(73.05,43.65);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#2C3E50").s().p("AAWAyIgWhEIgUBEIgTAAIgbhjIAWAAIAQBDIAVhDIAQAAIAUBEIAQhEIAWAAIgbBjg");
	this.shape_103.setTransform(60.825,43.625);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#2C3E50").s().p("AgeAnQgNgOAAgWIAAgDQAAgPAGgLQAGgMAKgHQALgGALAAQAVAAALANQALANAAAYIAAAIIhAAAQABANAHAGQAHAIAKAAQAQAAAKgMIAMALQgGAJgKAFQgKAFgNAAQgUAAgOgNgAgNgbQgFAHgCALIAqAAIAAgBQgBgLgFgHQgFgFgKAAQgIAAgGAGg");
	this.shape_104.setTransform(48.775,43.65);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#2C3E50").s().p("AAeBEIAAg8Ig7AAIAAA8IgYAAIAAiGIAYAAIAAA4IA7AAIAAg4IAYAAIAACGg");
	this.shape_105.setTransform(36.825,41.9);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.738,0,0,3.154,-216.4,-137.5)).s().p("EghzAVcMAAAgq3MBDnAAAMAAAAq3g");
	this.shape_106.setTransform(198.475,107.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop15G1, new cjs.Rectangle(-17.9,-29.4,432.79999999999995,274.5), null);


(lib.drag15G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap86();
	this.instance.setTransform(21,-21,0.9749,0.7459);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgSAZQgGgGAAgIIAMAAQAAAFADACQADACAEAAQAEAAADgBQADgCABgEQABgFgIgCIgKgEQgLgDABgKQAAgIAHgFQAHgFAIAAQAJAAAGAFQAGAFAAAJIgNAAQAAgEgCgDQgCgCgEAAQgEAAgCACQgEACAAADQgBAFAHACIALAEQALADgBAKQAAAGgDAEQgEAEgFACQgGACgFAAQgKAAgGgFg");
	this.shape.setTransform(123.4519,73.5479);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgHAeQgHAAgFgFQgFgEAAgIQAAgJAIgEQAHgFAMAAIAIAAIABgEIAAgEQgBgGgHAAQgEAAgCACQgDACgBAEIgMAAQAAgFAEgEQADgFAGgCQAFgCAGAAQAJAAAFAGQAGAFgBAJIgFAaIAAAFQAAADABADIAAABIgNAAIAAgFQgHAGgHAAIgBAAgAgGAFQgFACAAAFQgBAEADACQABACAEAAQAEAAADgCIAFgFIACgLIgGAAQgGAAgEADg");
	this.shape_1.setTransform(117.6577,73.5475);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgcApIAOhQIALAAIgBAGQAGgHAJAAQAGAAAEADQAEADACAFQACAFAAAHIAAAHQgBAJgEAGQgDAHgGAEQgFAEgHgBQgIAAgFgGIgGAcgAgEgXIgFAZQADAHAGAAQAGAAAFgFQAEgEABgLIABgEQAAgHgDgDQgCgEgFAAIgBAAQgGAAgEAGg");
	this.shape_2.setTransform(111.525,74.6234);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgMAoIAKg5IAMAAIgKA5gAABgbQgBgCAAgDQAAgDABgCQACgCADAAQADAAACACQACACAAADQAAADgCACQgCACgDAAIgBAAQgBAAAAAAQgBgBAAAAQgBAAAAAAQgBgBAAAAg");
	this.shape_3.setTransform(107.575,72.445);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgIApQgGAAgFgDQgGgCgDgFIAGgHQAGAHAIAAQAGAAADgEQAFgDACgHIAAgEQgGAHgIgBQgIAAgFgGQgFgGgBgJIABgIQABgJAEgHQADgHAGgDQAFgEAGAAQAKAAAFAHIACgGIALAAIgJA4QgCALgIAHQgHAGgJAAIgCAAgAgGgYQgEAFgCAJIAAABIAAAGQABAFACADQACAEAFAAQAGAAAGgHIAEgZQgDgGgHAAQgGAAgEAFg");
	this.shape_4.setTransform(102.9,74.6489);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgHAeQgHAAgFgFQgFgEAAgIQAAgJAIgEQAHgFAMAAIAIAAIABgEIAAgEQgBgGgHAAQgEAAgCACQgDACgBAEIgMAAQAAgFAEgEQADgFAGgCQAFgCAGAAQAJAAAFAGQAGAFgBAJIgFAaIAAAFIABAGIAAABIgNAAIAAgFQgHAGgHAAIgBAAgAgGAFQgFACAAAFQgBAEADACQABACAEAAQAEAAADgCIAFgFIACgLIgGAAQgGAAgEADg");
	this.shape_5.setTransform(94.1577,73.5475);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgTAeIAKg5IALAAIgBAGQAGgIAIAAIAFABIgCANIgFgBQgIAAgFAHIgGAng");
	this.shape_6.setTransform(89.725,73.475);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgKAqQgIAAgFgGQgFgHAAgKIAAgGIAAgBQABgJAEgGQADgIAGgDQAGgEAGABQAIAAAFAGIAGgeIANAAIgPBSIgLAAIABgGQgGAHgIAAIgBAAgAgLAAQgEAFgBAMQAAAGACAEQADAEAFAAQAGAAAFgHIAFgYQgDgHgHAAIAAAAQgHAAgEAHg");
	this.shape_7.setTransform(84.8375,72.3766);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAHAeIAHglIAAgEQgBgHgHAAQgGAAgGAHIgHApIgNAAIAKg5IAMAAIgBAGQAHgIAJABQAJAAAEAFQADAGgBAKIgGAlg");
	this.shape_8.setTransform(78.2611,73.4985);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgOAbQgFgEgDgGQgDgHABgIIAAgCQABgIAEgHQAFgHAGgDQAGgEAHAAQAKAAAGAIQAFAIgBANIgBAEIgjAAQgBAHADAFQAEAEAFAAQAIAAAHgHIAGAGQgEAGgGADQgFACgHAAQgHAAgGgDgAgKgEIAXAAIAAgBIAAgFQAAgEgDgCQgCgCgEgBQgJAAgFAPg");
	this.shape_9.setTransform(72.6952,73.5472);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgcApIAOhQIALAAIgBAGQAGgHAJAAQAGAAAEADQAEADACAFQACAFAAAHIAAAHQgBAJgEAGQgDAHgGAEQgFAEgHgBQgIAAgFgGIgGAcgAgEgXIgFAZQADAHAGAAQAGAAAFgFQAEgEABgLIABgEQAAgHgDgDQgCgEgFAAIgBAAQgGAAgEAGg");
	this.shape_10.setTransform(66.375,74.6234);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgDAeQgHAAgGgEQgFgDgDgIQgCgGABgIIAAgBQABgIAEgHQAEgHAGgDQAHgFAHABQAHAAAFAEQAGAEACAHQADAGgBAIQgBAIgEAHQgEAHgHAFQgFADgGAAIgCAAgAgJgLQgDAFgBAGIAAAHQAAAFADAEQADADAFABQAFAAAFgGQAEgFABgIIABgFQAAgHgDgDQgDgEgFgBQgHAAgFAIg");
	this.shape_11.setTransform(60.6149,73.55);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgMApIANhRIANAAIgOBRg");
	this.shape_12.setTransform(56.3,72.325);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgDAeQgHAAgGgEQgFgDgDgIQgCgGABgIIAAgBQABgIAEgHQAEgHAGgDQAHgFAHABQAHAAAFAEQAGAEACAHQADAGgBAIQgBAIgEAHQgEAHgHAFQgFADgGAAIgCAAgAgJgLQgDAFgBAGIAAAHQAAAFADAEQADADAFABQAFAAAFgGQAEgFABgIIABgFQAAgHgDgDQgDgEgFgBQgHAAgFAIg");
	this.shape_13.setTransform(51.6649,73.55);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgPAaQgFgDgCgHQgDgHABgIIAAgBQABgIAEgHQAEgHAGgDQAHgEAHAAQAJAAAGAGQAFAGAAAKIgMAAQAAgFgCgDQgDgDgEgBQgHAAgEAHQgEAGgBALQAAAPAKAAQAEAAAEgDQADgCABgFIAMAAQgBAGgDAEQgEAFgFADQgGACgFAAQgHAAgGgEg");
	this.shape_14.setTransform(45.8857,73.5472);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgSAlQgGgDgDgGQgEgFABgHIANAAQAAAGADAEQAEADAHABQAGAAADgDQAFgDABgFQABgIgJgEIgEgBQgMgFgFgEQgGgGABgIQAAgHAFgFQAEgFAGgCQAHgDAHAAQAHAAAGADQAFADADAGQAEAFAAAHIgOAAQAAgGgDgEQgCgDgHAAQgGAAgDADQgFADgBAFQgBAHAKAEIAEABQAMAFAFAFQAFAGgBAIQAAAGgEAFQgEAFgHADQgHACgGAAQgIAAgHgDg");
	this.shape_15.setTransform(39.85,72.525);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FF8C2D").s().p("AoGhYIQNgEIAAC0IwNAFg");
	this.shape_16.setTransform(81.525,73.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(21,-21,122.1,103.6);


(lib.drag15G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap85();
	this.instance.setTransform(21,-75,0.4284,0.4473);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgEAGQgCgCgBgEQABgCACgCQACgCACAAQADAAADACQABACAAACQAAADgBACQgCACgEAAIAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape.setTransform(104.2,21.68);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgcApIAOhQIALAAIgBAGQAGgHAJAAQAGAAAEADQAEADACAFQACAFAAAHIAAAHQgBAJgEAGQgDAHgGAEQgFAEgHgBQgIAAgFgGIgGAcgAgEgXIgFAZQADAHAGAAQAGAAAFgFQAEgEABgLIABgEQAAgHgDgDQgCgEgFAAIgBAAQgGAAgEAGg");
	this.shape_1.setTransform(99.775,20.5234);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgSAZQgGgGAAgIIAMAAQAAAFADACQADACAEAAQAEAAADgBQADgCABgEQABgFgIgCIgKgEQgLgDABgKQAAgIAHgFQAHgFAIAAQAJAAAGAFQAGAFAAAJIgNAAQAAgEgCgDQgCgCgEAAQgEAAgCACQgEACAAADQgBAFAHACIALAEQALADgBAKQAAAGgDAEQgEAEgFACQgGACgFAAQgKAAgGgFg");
	this.shape_2.setTransform(94.2519,19.4479);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgOAbQgFgEgDgGQgDgHABgIIAAgCQABgIAEgHQAFgHAGgDQAGgEAHAAQAKAAAGAIQAFAIgBANIgBAEIgjAAQgBAHADAFQAEAEAFAAQAIAAAHgHIAGAGQgEAGgGADQgFACgHAAQgHAAgGgDgAgKgEIAXAAIAAgBIAAgFQAAgEgDgCQgCgCgEgBQgJAAgFAPg");
	this.shape_3.setTransform(86.0452,19.4472);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgPAaQgFgDgCgHQgDgHABgIIAAgBQABgIAEgHQAEgHAGgDQAHgEAHAAQAJAAAGAGQAFAGAAAKIgMAAQAAgFgCgDQgDgDgEgBQgHAAgEAHQgEAGgBALQAAAPAKAAQAEAAAEgDQADgCABgFIAMAAQgBAGgDAEQgEAFgFADQgGACgFAAQgHAAgGgEg");
	this.shape_4.setTransform(80.3857,19.4472);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgMAoIAKg5IAMAAIgKA5gAABgbQgBgCAAgDQAAgDABgCQACgCADAAQADAAACACQACACAAADQAAADgCACQgCACgDAAIgBAAQgBAAAAAAQgBgBAAAAQgBAAAAAAQgBgBAAAAg");
	this.shape_5.setTransform(76.175,18.345);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAHAeIAHglIAAgEQgBgHgHAAQgGAAgGAHIgHApIgNAAIAKg5IAMAAIgBAGQAHgIAJABQAJAAAEAFQADAGgBAKIgGAlg");
	this.shape_6.setTransform(71.4111,19.3985);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgKAdQgFAAgEgCQgEgDgBgFQgCgFABgGIAGglIANAAIgGAlIgBAEQABAGAGABQAIAAAFgHIAHgpIANAAIgKA5IgMAAIABgFQgGAHgJAAIgBgBg");
	this.shape_7.setTransform(65.7938,19.5017);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgfAnIAOhNIAwAAIgBALIgjAAIgEAWIAeAAIgCAJIgeAAIgEAYIAjAAIgBALg");
	this.shape_8.setTransform(59.95,18.45);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FF8C2D").s().p("AoGhYIQNgEIAAC0IwNAFg");
	this.shape_9.setTransform(81.525,19.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(21,-75,122.1,103.5);


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
	this.instance.setTransform(-229,-134,0.8347,0.8353);

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
	this.kotakKartu2.setTransform(495.5,330.55,1,1,0,0,0,11.6,0);

	this.asdasfdas = new lib.drag15G5();
	this.asdasfdas.name = "asdasfdas";
	this.asdasfdas.setTransform(258.4,381.05,1.026,1.026,0,0,0,82,31);

	this.satu = new lib.drag15G1();
	this.satu.name = "satu";
	this.satu.setTransform(258.7,260.6,1.026,1.026,0,0,0,82.2,-23.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.satu},{t:this.asdasfdas},{t:this.kotakKartu2},{t:this.kotakKartuSembunyi}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Slots10, new cjs.Rectangle(195.8,207.5,356.09999999999997,402.6), null);


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
	this.duaf = new lib.drop15G5();
	this.duaf.name = "duaf";
	this.duaf.setTransform(741.15,381.95,0.4765,0.4765,0,0,0,160.5,53);
	new cjs.ButtonHelper(this.duaf, 0, 1, 1);

	this.satu = new lib.drop15G1();
	this.satu.name = "satu";
	this.satu.setTransform(740.3,264.5,0.4765,0.4765,0,0,0,198.6,118.8);
	new cjs.ButtonHelper(this.satu, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.satu},{t:this.duaf}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces10, new cjs.Rectangle(637.1,193.9,206.29999999999995,242.4), null);


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
	this.instance = new lib.flash0aiAssets_1();
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
	this.frame_280 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(280).call(this.frame_280).wait(75));

	// Layer_1
	this.instance = new lib._1e();
	this.instance.setTransform(-332,-194,1.0014,1.0023);

	this.instance_1 = new lib._2e();
	this.instance_1.setTransform(-332,-194,1.0014,1.0023);

	this.instance_2 = new lib._3e();
	this.instance_2.setTransform(-332,-194,1.0014,1.0024);

	this.instance_3 = new lib._4e();
	this.instance_3.setTransform(-332,-194,1.0014,1.0023);

	this.instance_4 = new lib._5e();
	this.instance_4.setTransform(-332,-194,1.0014,1.0023);

	this.instance_5 = new lib.selesai();
	this.instance_5.setTransform(0,0,1,1,0,0,0,85,25.7);

	this.instance_6 = new lib.fds();
	this.instance_6.setTransform(0,0,1,1,0,0,0,332,194);
	this.instance_6.filters = [new cjs.ColorFilter(0.42, 0.42, 0.42, 1, 0, 0, 0, 0)];
	this.instance_6.cache(-2,-2,668,392);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},54).to({state:[{t:this.instance_2}]},58).to({state:[{t:this.instance_3}]},54).to({state:[{t:this.instance_4}]},58).to({state:[{t:this.instance_6},{t:this.instance_5}]},56).wait(75));

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

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(12).call(this.frame_12).wait(13));

	// Layer_5
	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);
	this.exit._off = true;

	this.timeline.addTween(cjs.Tween.get(this.exit).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// jawaban1
	this.satu = new lib.drop15G1();
	this.satu.name = "satu";
	this.satu.setTransform(258.65,0.5,0.9247,0.9247,0,0,0,198.7,118.6);
	this.satu._off = true;
	new cjs.ButtonHelper(this.satu, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.satu).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

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
	this.satu_1 = new lib.drag15G1();
	this.satu_1.name = "satu_1";
	this.satu_1.setTransform(-145.8,-25.65,3.0812,3.0812,0,0,0,81.9,-23.1);

	this.instance = new lib.kkoo();
	this.instance.setTransform(43.05,-17.05,1,1,0,0,0,404.1,193.9);
	this.instance.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance},{t:this.satu_1}]},12).to({state:[]},1).wait(12));

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

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(12).call(this.frame_12).wait(13));

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
(lib.materi12 = function(mode,startPosition,loop) {
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
		  window.location.replace("../materi13/index.html");
		});
		
		root.btnBack3.on("click", function () {
		  window.location.replace("../materi11/index.html");
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
	this.shape.graphics.f("#FFFFFF").s().p("AgNATQgEgEAAgFQAAgHAFgDQAFgDAJgBIAHAAIAAgDQAAgEgDgCQgCgDgEABQgDAAgDABQgDACAAAEIgHAAQAAgEACgCQADgEADgCQAEgCAEAAQAHAAAFAFQAEADAAAHIAAATQAAAFACAEIAAAAIgIAAIgBgEQgFAFgGAAQgHAAgEgDgAgKAJQAAADADACQACACAEAAQACAAADgCQADgBACgDIAAgJIgGAAQgNAAAAAIg");
	this.shape.setTransform(439.375,59.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAWIAAgqIAHAAIAAAFQACgGAHAAIADABIAAAGIgDAAQgHABgCAFIAAAeg");
	this.shape_1.setTransform(436,59.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgNATQgEgEAAgFQAAgHAFgDQAFgDAJgBIAHAAIAAgDQAAgEgDgCQgCgDgEABQgDAAgDABQgDACAAAEIgHAAQAAgEACgCQADgEADgCQAEgCAEAAQAHAAAFAFQAEADAAAHIAAATQAAAFACAEIAAAAIgIAAIgBgEQgFAFgGAAQgHAAgEgDgAgKAJQAAADADACQACACAEAAQACAAADgCQADgBACgDIAAgJIgGAAQgNAAAAAIg");
	this.shape_2.setTransform(432.175,59.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgMASQgEgEAAgIIAAgbIAHAAIAAAbQAAAKAIAAQAIAAADgHIAAgeIAHAAIAAAqIgHAAIAAgEQgEAFgIAAQgHAAgDgEg");
	this.shape_3.setTransform(427.725,59.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJAbQgFgCgDgEQgDgEAAgFIAIAAQAAAFAEADQADADAGAAQAGAAADgCQADgDABgEQgBgEgDgCQgCgDgIgCQgJgDgFgDQgEgEAAgGQAAgHAGgEQAFgFAHAAQAHAAAEACQAFADACAEQADAEAAAFIgHAAQAAgGgEgDQgEgDgGAAQgEAAgDADQgEACABAFQAAADACADQADACAHACQAHACAEACQAEACACADQACAEAAAEQAAAHgFAEQgGAFgJAAQgFAAgFgDg");
	this.shape_4.setTransform(423.05,58.775);

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
	this.popUpAnim1.setTransform(496.6,306.6,1,1,0,0,0,50.2,-28.9);

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
	this.btnAnim1.setTransform(472.15,285.65,0.4113,0.4113,0,0,0,56.9,68.3);
	new cjs.ButtonHelper(this.btnAnim1, 0, 1, 2, false, new lib.btnAnim(), 3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgIA+QgCgDAAgEQAAgDACgEQACgCAFAAQAEAAACACQADAEAAADQAAAEgDADQgCADgEgBQgFABgCgDgAgKAcQAAgKADgHQACgFAFgHIAMgMQAHgHAAgKQAAgJgFgFQgEgFgKgBQgHAAgGAFQgFAFAAAHIgQAAQAAgNAKgJQAKgIAOAAQARAAAJAIQAJAJAAAPQAAAQgOAOIgJAJQgHAGAAAOg");
	this.shape_6.setTransform(717.825,237.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgCA0QgGgGAAgMIAAg5IgQAAIAAgMIAQAAIAAgXIAPAAIAAAXIASAAIAAAMIgSAAIAAA5QABAGACACQACAEAGAAIAHgBIAAAMIgMACQgKAAgFgHg");
	this.shape_7.setTransform(710.45,238.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgSIAAg8IAQAAIAAA8QAAAVARAAQARAAAGgNIAAhEIARAAIAABdIgQAAIAAgJQgJALgSAAQgOAAgIgJg");
	this.shape_8.setTransform(702.95,239.275);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgXA3IgBALIgPAAIAAiEIAQAAIAAAxQAKgMAQABQARgBAKANQAKANAAAVIAAACQAAAVgKANQgKAOgRAAQgQAAgKgNgAgXgBIAAApQAIAOAPAAQALAAAGgJQAHgJAAgSQAAgQgGgIQgHgJgLAAQgQAAgHAOg");
	this.shape_9.setTransform(693.225,237.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgbAkQgMgNAAgUIAAgDQAAgNAGgLQAEgLALgGQAJgHAKABQASgBAKAMQALAMAAAXIAAAGIg/AAQAAANAIAJQAIAIALAAQAIABAHgEQAFgDAFgGIAJAIQgMASgXAAQgSAAgMgNgAgOgcQgHAIgCAMIAuAAIAAgBQAAgMgGgHQgGgGgKgBQgIABgHAGg");
	this.shape_10.setTransform(683.4,239.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgSAsQgIgDgGgHQgEgIAAgIIAQAAQAAAIAGAFQAHAFAIgBQAKABAFgEQAGgDgBgHQAAgGgEgEQgGgDgLgDQgMgDgHgDQgHgDgEgFQgDgFAAgHQAAgLAKgIQAJgJAPABQAPgBALAJQAJAIABAMIgRAAQAAgGgFgEQgGgFgIgBQgIAAgFAFQgFADAAAHQAAAFAEADQAFADALADQANACAGAEQAIADAEAFQADAGABAHQAAANgKAHQgKAIgRAAQgKAAgJgFg");
	this.shape_11.setTransform(673.95,239.2);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgWAwIAAhdIAQAAIAAALQAHgNAPAAIAHABIAAAPIgIAAQgPAAgGANIAABCg");
	this.shape_12.setTransform(666.875,239.125);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgbAkQgMgNAAgUIAAgDQAAgNAFgLQAFgLALgGQAJgHAKABQASgBAKAMQALAMAAAXIAAAGIg/AAQABANAHAJQAIAIALAAQAJABAFgEQAGgDAEgGIAKAIQgMASgXAAQgSAAgMgNgAgOgcQgHAIgCAMIAvAAIAAgBQgBgMgGgHQgGgGgKgBQgJABgGAGg");
	this.shape_13.setTransform(658.75,239.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgCA0QgGgGABgMIAAg5IgRAAIAAgMIARAAIAAgXIAOAAIAAAXIASAAIAAAMIgSAAIAAA5QAAAGADACQACAEAGAAIAHgBIAAAMIgMACQgLAAgEgHg");
	this.shape_14.setTransform(650.8,238.15);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgCA0QgGgGABgMIAAg5IgRAAIAAgMIARAAIAAgXIAPAAIAAAXIARAAIAAAMIgRAAIAAA5QAAAGACACQACAEAGAAIAIgBIAAAMIgNACQgLAAgEgHg");
	this.shape_15.setTransform(640.55,238.15);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgSIAAg8IAQAAIAAA8QAAAVARAAQARAAAHgNIAAhEIAQAAIAABdIgPAAIgBgJQgJALgRAAQgQAAgHgJg");
	this.shape_16.setTransform(633.05,239.275);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgPALgHQAMgIATAAIAPAAIAAgIQAAgHgFgFQgFgFgJgBQgIAAgGAFQgGAEAAAGIgQAAQAAgHAFgHQAFgGAJgEQAIgDAJAAQARgBAJAJQAJAHAAAPIAAAqQAAANAEAHIAAACIgRAAQgCgDAAgHQgMAMgOAAQgOAAgJgIgAgWASQAAAIAFAFQAFAEAIAAQAHAAAHgEQAGgEADgGIAAgUIgMAAQgdAAAAARg");
	this.shape_17.setTransform(623.275,239.2);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgHBDIAAiFIAPAAIAACFg");
	this.shape_18.setTransform(616.3,237.225);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAVAwIAAg9QAAgLgFgEQgEgFgKAAQgGAAgHAEQgFAEgEAHIAABCIgQAAIAAhdIAPAAIABAMQAKgOARAAQAeAAAAAiIAAA9g");
	this.shape_19.setTransform(604.8,239.125);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgPALgHQAMgIATAAIAPAAIAAgIQAAgHgFgFQgFgFgJgBQgIAAgGAFQgGAEAAAGIgQAAQAAgHAFgHQAFgGAJgEQAIgDAJAAQARgBAJAJQAJAHAAAPIAAAqQAAANAEAHIAAACIgRAAQgCgDAAgHQgMAMgOAAQgOAAgJgIgAgWASQAAAIAFAFQAFAEAIAAQAHAAAHgEQAGgEADgGIAAgUIgMAAQgdAAAAARg");
	this.shape_20.setTransform(595.075,239.2);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgPALgHQAMgIATAAIAPAAIAAgIQAAgHgFgFQgFgFgJgBQgIAAgGAFQgGAEAAAGIgQAAQAAgHAFgHQAFgGAJgEQAIgDAJAAQARgBAJAJQAJAHAAAPIAAAqQAAANAEAHIAAACIgRAAQgCgDAAgHQgMAMgOAAQgOAAgJgIgAgWASQAAAIAFAFQAFAEAIAAQAHAAAHgEQAGgEADgGIAAgUIgMAAQgdAAAAARg");
	this.shape_21.setTransform(585.425,239.2);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgcA2QgLgNAAgWIAAgBQAAgUALgOQAKgNARABQAPgBAKALIAAgwIAQAAIAACEIgPAAIgBgKQgJAMgRAAQgQAAgKgOgAgQgGQgGAIAAASQAAAQAGAJQAHAJAKAAQAQAAAHgNIAAgqQgIgOgOAAQgLAAgHAJg");
	this.shape_22.setTransform(575.375,237.3);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgPALgHQAMgIATAAIAPAAIAAgIQAAgHgFgFQgFgFgJgBQgIAAgGAFQgGAEAAAGIgQAAQAAgHAFgHQAFgGAJgEQAIgDAJAAQARgBAJAJQAJAHAAAPIAAAqQAAANAEAHIAAACIgRAAQgCgDAAgHQgMAMgOAAQgOAAgJgIgAgWASQAAAIAFAFQAFAEAIAAQAHAAAHgEQAGgEADgGIAAgUIgMAAQgdAAAAARg");
	this.shape_23.setTransform(565.725,239.2);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgbAkQgMgNAAgUIAAgDQAAgNAFgLQAGgLAKgGQAJgHAKABQATgBAJAMQALAMAAAXIAAAGIg/AAQABANAHAJQAIAIALAAQAJABAFgEQAHgDADgGIAKAIQgMASgXAAQgSAAgMgNgAgOgcQgHAIgCAMIAvAAIAAgBQgBgMgGgHQgGgGgKgBQgJABgGAGg");
	this.shape_24.setTransform(556.25,239.2);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AAUBDIgggsIgJALIAAAhIgRAAIAAiFIARAAIAABQIAIgKIAcgeIATAAIgjAmIAoA3g");
	this.shape_25.setTransform(547.55,237.225);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAVAwIAAg9QAAgLgFgEQgEgFgKAAQgGAAgHAEQgFAEgEAHIAABCIgQAAIAAhdIAPAAIABAMQAKgOARAAQAeAAAAAiIAAA9g");
	this.shape_26.setTransform(533.15,239.125);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgPALgHQAMgIATAAIAPAAIAAgIQAAgHgFgFQgFgFgJgBQgIAAgGAFQgGAEAAAGIgQAAQAAgHAFgHQAFgGAJgEQAIgDAJAAQARgBAJAJQAJAHAAAPIAAAqQAAANAEAHIAAACIgRAAQgCgDAAgHQgMAMgOAAQgOAAgJgIgAgWASQAAAIAFAFQAFAEAIAAQAHAAAHgEQAGgEADgGIAAgUIgMAAQgdAAAAARg");
	this.shape_27.setTransform(523.425,239.2);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AAUBDIgfgsIgKALIAAAhIgRAAIAAiFIARAAIAABQIAIgKIAcgeIATAAIgjAmIAoA3g");
	this.shape_28.setTransform(514.7,237.225);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AAVBDIAAg+QAAgKgFgEQgEgFgKAAQgHAAgGAEQgFAEgEAGIAABDIgQAAIAAiFIAQAAIAAAzQALgNAQAAQAeAAAAAhIAAA+g");
	this.shape_29.setTransform(504.7,237.225);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgHBAIAAhdIAPAAIAABdgAgGgwQgDgCABgEQgBgDADgDQADgDADAAQAFAAADADQABADABADQgBAEgBACQgDADgFAAQgDAAgDgDg");
	this.shape_30.setTransform(497.65,237.5);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgHBDIAAiFIAPAAIAACFg");
	this.shape_31.setTransform(493.3,237.225);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgSIAAg8IAQAAIAAA8QAAAVARAAQASAAAGgNIAAhEIAQAAIAABdIgPAAIgBgJQgJALgRAAQgQAAgHgJg");
	this.shape_32.setTransform(486.25,239.275);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AAyAwIAAg9QAAgKgFgFQgEgFgLAAQgJAAgGAFQgGAFgBAJIAAA+IgPAAIAAg9QAAgUgUAAQgQAAgGANIAABEIgQAAIAAhdIAQAAIAAAKQAKgMASAAQAUAAAGAPQAEgHAIgEQAHgEALAAQAeAAABAhIAAA+g");
	this.shape_33.setTransform(473.575,239.125);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgbAkQgMgNAAgUIAAgDQAAgNAGgLQAEgLAKgGQAKgHAKABQASgBALAMQAKAMAAAXIAAAGIg/AAQAAANAJAJQAHAIALAAQAJABAFgEQAGgDAFgGIAKAIQgMASgYAAQgSAAgMgNgAgOgcQgHAIgBAMIAuAAIAAgBQgBgMgGgHQgGgGgKgBQgIABgHAGg");
	this.shape_34.setTransform(461.15,239.2);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AAyAwIAAg9QAAgKgFgFQgEgFgLAAQgJAAgGAFQgGAFgBAJIAAA+IgPAAIAAg9QAAgUgUAAQgQAAgGANIAABEIgQAAIAAhdIAQAAIAAAKQAKgMASAAQAUAAAGAPQAEgHAIgEQAHgEALAAQAeAAABAhIAAA+g");
	this.shape_35.setTransform(448.575,239.125);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AAUBDIgfgsIgKALIAAAhIgRAAIAAiFIARAAIAABQIAIgKIAcgeIAUAAIgkAmIAoA3g");
	this.shape_36.setTransform(432.5,237.225);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgSIAAg8IAQAAIAAA8QAAAVARAAQARAAAHgNIAAhEIAQAAIAABdIgPAAIgBgJQgJALgRAAQgQAAgHgJg");
	this.shape_37.setTransform(422.55,239.275);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgCA0QgGgGABgMIAAg5IgRAAIAAgMIARAAIAAgXIAOAAIAAAXIASAAIAAAMIgSAAIAAA5QAAAGADACQACAEAGAAIAHgBIAAAMIgMACQgKAAgFgHg");
	this.shape_38.setTransform(414.45,238.15);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AAVAwIAAg9QAAgLgFgEQgEgFgKAAQgGAAgHAEQgFAEgEAHIAABCIgQAAIAAhdIAPAAIABAMQALgOAQAAQAeAAAAAiIAAA9g");
	this.shape_39.setTransform(406.9,239.125);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgSIAAg8IAQAAIAAA8QAAAVARAAQASAAAFgNIAAhEIARAAIAABdIgQAAIAAgJQgJALgSAAQgOAAgIgJg");
	this.shape_40.setTransform(397.1,239.275);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AAVAwIAAg9QAAgLgEgEQgFgFgKAAQgHAAgFAEQgHAEgDAHIAABCIgQAAIAAhdIAQAAIAAAMQALgOAQAAQAeAAAAAiIAAA9g");
	this.shape_41.setTransform(382.9,239.125);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgHBAIAAhdIAPAAIAABdgAgGgwQgCgCAAgEQAAgDACgDQACgDAEAAQAFAAADADQABADAAADQAAAEgBACQgDADgFAAQgEAAgCgDg");
	this.shape_42.setTransform(375.8,237.5);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgPALgHQAMgIATAAIAPAAIAAgIQAAgHgFgFQgFgFgJgBQgIAAgGAFQgGAEAAAGIgQAAQAAgHAFgHQAFgGAJgEQAIgDAJAAQARgBAJAJQAJAHAAAPIAAAqQAAANAEAHIAAACIgRAAQgCgDAAgHQgMAMgOAAQgOAAgJgIgAgWASQAAAIAFAFQAFAEAIAAQAHAAAHgEQAGgEADgGIAAgUIgMAAQgdAAAAARg");
	this.shape_43.setTransform(368.825,239.2);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgHBDIAAiFIAPAAIAACFg");
	this.shape_44.setTransform(361.8,237.225);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AAVAwIAAg9QAAgLgEgEQgFgFgKAAQgGAAgHAEQgGAEgDAHIAABCIgQAAIAAhdIAPAAIABAMQALgOAQAAQAeAAAAAiIAAA9g");
	this.shape_45.setTransform(350.3,239.125);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgPALgHQAMgIATAAIAPAAIAAgIQAAgHgFgFQgFgFgJgBQgIAAgGAFQgGAEAAAGIgQAAQAAgHAFgHQAFgGAJgEQAIgDAJAAQARgBAJAJQAJAHAAAPIAAAqQAAANAEAHIAAACIgRAAQgCgDAAgHQgMAMgOAAQgOAAgJgIgAgWASQAAAIAFAFQAFAEAIAAQAHAAAHgEQAGgEADgGIAAgUIgMAAQgdAAAAARg");
	this.shape_46.setTransform(340.575,239.2);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AAWAvIgWhGIgWBGIgMAAIgchdIAQAAIASBGIAXhGIALAAIAXBHIAShHIAQAAIgbBdg");
	this.shape_47.setTransform(329.05,239.2);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgbAkQgMgNAAgUIAAgDQAAgNAGgLQAFgLAJgGQAKgHAKABQATgBAKAMQAKAMAAAXIAAAGIg/AAQAAANAJAJQAHAIALAAQAIABAHgEQAFgDAFgGIAKAIQgNASgXAAQgSAAgMgNgAgOgcQgHAIgCAMIAuAAIAAgBQAAgMgGgHQgGgGgKgBQgIABgHAGg");
	this.shape_48.setTransform(317.8,239.2);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AAVBDIAAg+QAAgKgEgEQgFgFgKAAQgHAAgFAEQgHAEgDAGIAABDIgQAAIAAiFIAQAAIAAAzQALgNAQAAQAeAAAAAhIAAA+g");
	this.shape_49.setTransform(308.1,237.225);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgHBAIAAhdIAPAAIAABdgAgGgwQgCgCAAgEQAAgDACgDQADgDADAAQAFAAACADQADADAAADQAAAEgDACQgCADgFAAQgDAAgDgDg");
	this.shape_50.setTransform(296.65,237.5);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgSAsQgIgDgGgHQgEgIAAgIIAQAAQAAAIAGAFQAHAFAIgBQAJABAGgEQAGgDgBgHQAAgGgEgEQgGgDgLgDQgMgDgHgDQgHgDgDgFQgEgFAAgHQAAgLAKgIQAKgJANABQAQgBAKAJQALAIgBAMIgQAAQABgGgGgEQgGgFgJgBQgHAAgFAFQgFADAAAHQAAAFAFADQAEADALADQAMACAIAEQAHADAEAFQAEAGgBAHQABANgLAHQgKAIgQAAQgKAAgJgFg");
	this.shape_51.setTransform(289.85,239.2);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AAyAwIAAg9QAAgKgFgFQgEgFgLAAQgJAAgGAFQgGAFgBAJIAAA+IgPAAIAAg9QAAgUgUAAQgQAAgGANIAABEIgQAAIAAhdIAQAAIAAAKQAKgMASAAQAUAAAGAPQAEgHAIgEQAHgEALAAQAeAAABAhIAAA+g");
	this.shape_52.setTransform(277.525,239.125);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgSIAAg8IAQAAIAAA8QAAAVARAAQASAAAFgNIAAhEIARAAIAABdIgQAAIAAgJQgJALgSAAQgOAAgIgJg");
	this.shape_53.setTransform(264.9,239.275);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgSAsQgJgDgFgHQgEgIAAgIIAQAAQAAAIAGAFQAHAFAIgBQAKABAFgEQAFgDAAgHQAAgGgEgEQgFgDgMgDQgMgDgHgDQgHgDgEgFQgDgFAAgHQAAgLAKgIQAJgJAPABQAPgBALAJQAJAIABAMIgRAAQAAgGgFgEQgGgFgIgBQgIAAgFAFQgFADAAAHQAAAFAEADQAFADALADQANACAGAEQAIADAEAFQADAGABAHQAAANgKAHQgKAIgRAAQgKAAgJgFg");
	this.shape_54.setTransform(255.35,239.2);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AAVAwIAAg9QAAgLgEgEQgFgFgKAAQgGAAgHAEQgGAEgDAHIAABCIgQAAIAAhdIAPAAIABAMQALgOAQAAQAeAAAAAiIAAA9g");
	this.shape_55.setTransform(245.9,239.125);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgeAjQgMgNAAgWIAAAAQAAgNAGgMQAFgKAKgGQAJgHAMABQATgBAMANQAMAOAAAVIAAABQAAAOgGAKQgFAMgKAFQgJAGgNABQgSAAgMgOgAgSgZQgIAKAAAQQAAAPAIAKQAHAJALAAQAMAAAHgJQAIgKAAgQQAAgPgIgKQgHgKgMAAQgLAAgHAKg");
	this.shape_56.setTransform(235.875,239.2);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiFIAQAAIAABQIAJgKIAcgeIATAAIgjAmIAoA3g");
	this.shape_57.setTransform(226.9,237.225);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AAVAwIAAg9QAAgLgFgEQgEgFgKAAQgGAAgHAEQgFAEgEAHIAABCIgQAAIAAhdIAPAAIABAMQALgOAQAAQAeAAAAAiIAAA9g");
	this.shape_58.setTransform(725.05,213.375);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgOALgIQAMgIATAAIAPAAIAAgIQAAgHgFgFQgFgGgJAAQgIAAgGAFQgGAEAAAGIgQAAQAAgHAFgHQAFgGAJgEQAIgEAJABQARgBAJAJQAJAHAAAPIAAAqQAAANAEAHIAAACIgRAAQgCgDAAgHQgMAMgOAAQgOAAgJgIgAgWASQAAAIAFAFQAFAEAIAAQAHAAAHgEQAGgEADgHIAAgTIgMAAQgdAAAAARg");
	this.shape_59.setTransform(715.275,213.45);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AAWAvIgWhGIgWBGIgMAAIgchdIAQAAIASBGIAXhGIALAAIAXBHIAShHIAQAAIgcBdg");
	this.shape_60.setTransform(703.8,213.45);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgbAkQgMgMAAgWIAAgCQAAgNAFgLQAFgLALgHQAJgFAKAAQASgBAKAMQALANAAAWIAAAGIg/AAQABAOAHAIQAIAIALAAQAJAAAFgDQAGgDAEgGIAKAIQgMASgXAAQgSAAgMgNgAgOgcQgHAIgCAMIAvAAIAAgBQgBgMgGgHQgGgHgKAAQgJAAgGAHg");
	this.shape_61.setTransform(692.5,213.45);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AAVBDIAAg+QAAgKgEgEQgFgFgKAAQgHAAgFAEQgGAEgEAGIAABDIgQAAIAAiFIAQAAIAAAzQALgNAQAAQAeAAAAAhIAAA+g");
	this.shape_62.setTransform(682.8,211.475);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgHBAIAAhdIAPAAIAABdgAgGgvQgDgDABgEQgBgEADgDQADgCADAAQAFAAADACQACADgBAEQABAEgCADQgDACgFAAQgDAAgDgCg");
	this.shape_63.setTransform(671.35,211.75);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgOALgIQAMgIATAAIAPAAIAAgIQAAgHgFgFQgFgGgJAAQgIAAgGAFQgGAEAAAGIgQAAQAAgHAFgHQAFgGAJgEQAIgEAJABQARgBAJAJQAJAHAAAPIAAAqQAAANAEAHIAAACIgRAAQgCgDAAgHQgMAMgOAAQgOAAgJgIgAgWASQAAAIAFAFQAFAEAIAAQAHAAAHgEQAGgEADgHIAAgTIgMAAQgdAAAAARg");
	this.shape_64.setTransform(664.375,213.45);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgTA+QgKgEgFgIIAIgKQALANAPAAQALAAAGgGQAHgHAAgMIAAgIQgKALgQAAQgRAAgJgNQgKgOAAgVQAAgWAKgNQAJgNASAAQAPAAAKAMIABgLIAOAAIAABbQABASgLALQgLAKgSAAQgJAAgKgEgAgQgrQgHAJAAASQAAAQAHAIQAGAJALAAQAPAAAIgNIAAgqQgIgOgPAAQgLAAgGAJg");
	this.shape_65.setTransform(654.35,215.225);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgOALgIQAMgIATAAIAPAAIAAgIQAAgHgFgFQgFgGgJAAQgIAAgGAFQgGAEAAAGIgQAAQAAgHAFgHQAFgGAJgEQAIgEAJABQARgBAJAJQAJAHAAAPIAAAqQAAANAEAHIAAACIgRAAQgCgDAAgHQgMAMgOAAQgOAAgJgIgAgWASQAAAIAFAFQAFAEAIAAQAHAAAHgEQAGgEADgHIAAgTIgMAAQgdAAAAARg");
	this.shape_66.setTransform(644.675,213.45);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgXA3IgBALIgPAAIAAiEIAQAAIAAAxQAKgMAQABQARgBAKANQAKANAAAVIAAACQAAAVgKANQgKAOgRAAQgQAAgKgNgAgXAAIAAAnQAIAPAPAAQALAAAGgJQAHgJAAgSQAAgQgGgIQgHgJgLAAQgQAAgHAPg");
	this.shape_67.setTransform(635.025,211.55);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgbAkQgMgMAAgWIAAgCQAAgNAFgLQAGgLAJgHQAKgFAKAAQATgBAJAMQALANAAAWIAAAGIg/AAQABAOAHAIQAIAIALAAQAJAAAFgDQAHgDADgGIAKAIQgLASgYAAQgSAAgMgNgAgOgcQgHAIgBAMIAuAAIAAgBQgBgMgGgHQgGgHgKAAQgJAAgGAHg");
	this.shape_68.setTransform(625.2,213.45);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgSAsQgJgDgFgHQgEgIAAgIIAQAAQAAAIAGAFQAHAEAIAAQAKAAAFgDQAFgDAAgHQAAgGgEgEQgGgDgLgDQgMgDgHgDQgHgDgEgFQgDgFAAgHQAAgMAKgHQAJgJAPABQAPgBALAJQAJAIABANIgRAAQAAgHgFgEQgGgGgIAAQgIAAgFAFQgFADAAAHQAAAFAEADQAFADALADQANACAGAEQAIADAEAFQADAFABAIQAAANgKAHQgKAIgRAAQgKgBgJgEg");
	this.shape_69.setTransform(615.8,213.45);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AAyAwIAAg9QAAgKgFgFQgEgFgLAAQgJAAgGAFQgGAFgBAJIAAA+IgPAAIAAg9QAAgUgUAAQgQAAgGANIAABEIgQAAIAAhdIAQAAIAAAKQAKgMASAAQAUAAAGAPQAEgHAIgEQAHgEALAAQAeAAABAhIAAA+g");
	this.shape_70.setTransform(599.075,213.375);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgbAkQgMgMAAgWIAAgCQAAgNAGgLQAEgLALgHQAJgFAKAAQASgBAKAMQALANAAAWIAAAGIg/AAQAAAOAIAIQAIAIALAAQAIAAAHgDQAFgDAFgGIAJAIQgMASgXAAQgSAAgMgNgAgOgcQgHAIgCAMIAuAAIAAgBQAAgMgGgHQgGgHgKAAQgIAAgHAHg");
	this.shape_71.setTransform(586.65,213.45);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgCA0QgGgGABgMIAAg5IgRAAIAAgNIARAAIAAgWIAOAAIAAAWIASAAIAAANIgSAAIAAA5QAAAGADACQACADAGABIAHgCIAAAOIgMABQgKAAgFgHg");
	this.shape_72.setTransform(578.7,212.4);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgSAsQgJgDgEgHQgGgIAAgIIARAAQAAAIAHAFQAFAEAJAAQAJAAAGgDQAFgDABgHQAAgGgGgEQgEgDgMgDQgMgDgHgDQgHgDgEgFQgDgFAAgHQAAgMAKgHQAJgJAOABQARgBAJAJQAKAIAAANIgPAAQAAgHgGgEQgGgGgJAAQgHAAgFAFQgFADAAAHQAAAFAFADQAEADAMADQALACAIAEQAHADAEAFQAEAFAAAIQAAANgLAHQgJAIgRAAQgKgBgJgEg");
	this.shape_73.setTransform(571.4,213.45);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgHBAIAAhdIAPAAIAABdgAgGgvQgDgDABgEQgBgEADgDQADgCADAAQAFAAADACQABADAAAEQAAAEgBADQgDACgFAAQgDAAgDgCg");
	this.shape_74.setTransform(564.7,211.75);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgSAsQgJgDgEgHQgGgIAAgIIARAAQAAAIAHAFQAFAEAJAAQAJAAAGgDQAFgDABgHQAAgGgGgEQgEgDgMgDQgMgDgHgDQgHgDgEgFQgDgFAAgHQAAgMAKgHQAJgJAOABQARgBAJAJQAKAIAAANIgPAAQAAgHgGgEQgGgGgJAAQgHAAgFAFQgFADAAAHQAAAFAFADQAEADAMADQALACAIAEQAHADAEAFQAEAFAAAIQAAANgLAHQgJAIgRAAQgKgBgJgEg");
	this.shape_75.setTransform(557.9,213.45);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgeAjQgMgNAAgWIAAAAQAAgNAGgMQAFgKAKgHQAJgFAMAAQATgBAMANQAMAOAAAVIAAABQAAAOgGALQgFAKgKAHQgJAFgNABQgSAAgMgOgAgSgZQgIAJAAARQAAAPAIAKQAHAJALAAQAMAAAHgJQAIgKAAgQQAAgQgIgJQgHgKgMAAQgLAAgHAKg");
	this.shape_76.setTransform(548.275,213.45);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AAUBDIgggsIgKALIAAAhIgQAAIAAiFIAQAAIAABQIAJgKIAcgeIAUAAIgkAmIAoA3g");
	this.shape_77.setTransform(539.3,211.475);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgbAkQgMgMAAgWIAAgCQAAgNAGgLQAEgLAKgHQAKgFAKAAQASgBALAMQAKANAAAWIAAAGIg/AAQAAAOAJAIQAHAIALAAQAJAAAFgDQAGgDAFgGIAKAIQgMASgYAAQgSAAgMgNgAgOgcQgHAIgBAMIAtAAIAAgBQAAgMgGgHQgGgHgKAAQgIAAgHAHg");
	this.shape_78.setTransform(529.55,213.45);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgOALgIQAMgIATAAIAPAAIAAgIQAAgHgFgFQgFgGgJAAQgIAAgGAFQgGAEAAAGIgQAAQAAgHAFgHQAFgGAJgEQAIgEAJABQARgBAJAJQAJAHAAAPIAAAqQAAANAEAHIAAACIgRAAQgCgDAAgHQgMAMgOAAQgOAAgJgIgAgWASQAAAIAFAFQAFAEAIAAQAHAAAHgEQAGgEADgHIAAgTIgMAAQgdAAAAARg");
	this.shape_79.setTransform(515.525,213.45);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgTA+QgKgEgFgIIAIgKQALANAPAAQAKAAAHgGQAGgHABgMIAAgIQgKALgQAAQgQAAgKgNQgLgOABgVQgBgWALgNQAKgNARAAQAQAAAJAMIABgLIAPAAIAABbQAAASgLALQgLAKgSAAQgJAAgKgEgAgQgrQgHAJABASQgBAQAHAIQAGAJALAAQAPAAAIgNIAAgqQgIgOgPAAQgLAAgGAJg");
	this.shape_80.setTransform(505.5,215.225);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgOALgIQAMgIATAAIAPAAIAAgIQAAgHgFgFQgFgGgJAAQgIAAgGAFQgGAEAAAGIgQAAQAAgHAFgHQAFgGAJgEQAIgEAJABQARgBAJAJQAJAHAAAPIAAAqQAAANAEAHIAAACIgRAAQgCgDAAgHQgMAMgOAAQgOAAgJgIgAgWASQAAAIAFAFQAFAEAIAAQAHAAAHgEQAGgEADgHIAAgTIgMAAQgdAAAAARg");
	this.shape_81.setTransform(495.875,213.45);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgRBRIAAgMIAHAAQAGAAADgCQABgDAAgHIAAhpIAQAAIAABoQAAAbgXAAQgFAAgFgCgAABhCQgBgDAAgEQAAgEABgDQADgCAEAAQAFAAACACQADADAAAEQAAAEgDADQgCACgFAAQgFAAgCgCg");
	this.shape_82.setTransform(488.025,213.65);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AAVAwIAAg9QAAgLgEgEQgFgFgKAAQgHAAgFAEQgHAEgDAHIAABCIgQAAIAAhdIAQAAIAAAMQALgOAQAAQAeAAAAAiIAAA9g");
	this.shape_83.setTransform(481.9,213.375);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgbAkQgMgMAAgWIAAgCQAAgNAFgLQAFgLALgHQAJgFAKAAQATgBAJAMQALANAAAWIAAAGIg/AAQABAOAHAIQAIAIALAAQAIAAAHgDQAFgDAEgGIAKAIQgMASgXAAQgSAAgMgNgAgOgcQgHAIgCAMIAuAAIAAgBQAAgMgGgHQgGgHgKAAQgIAAgHAHg");
	this.shape_84.setTransform(472.35,213.45);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgnBCIAAiBIAPAAIABAKQAKgMAQAAQARAAAKANQAKANAAAWIAAACQAAAUgKANQgKANgRAAQgQAAgKgKIAAAtgAgXgmIAAAsQAIAMAPAAQAKAAAHgJQAHgJAAgRQAAgQgHgJQgHgJgLAAQgOAAgIANg");
	this.shape_85.setTransform(462.725,215.175);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgHBAIAAhdIAPAAIAABdgAgGgvQgCgDAAgEQAAgEACgDQACgCAEAAQAFAAADACQABADAAAEQAAAEgBADQgDACgFAAQgEAAgCgCg");
	this.shape_86.setTransform(450.95,211.75);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AgcA2QgLgNAAgWIAAgBQAAgVALgNQAKgNARABQAPgBAKALIAAgwIAQAAIAACEIgPAAIgBgKQgJAMgRAAQgQAAgKgOgAgQgGQgGAIAAASQAAAQAGAJQAHAJAKAAQAQAAAHgNIAAgqQgIgOgOAAQgLAAgHAJg");
	this.shape_87.setTransform(443.575,211.55);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgOALgIQAMgIATAAIAPAAIAAgIQAAgHgFgFQgFgGgJAAQgIAAgGAFQgGAEAAAGIgQAAQAAgHAFgHQAFgGAJgEQAIgEAJABQARgBAJAJQAJAHAAAPIAAAqQAAANAEAHIAAACIgRAAQgCgDAAgHQgMAMgOAAQgOAAgJgIgAgWASQAAAIAFAFQAFAEAIAAQAHAAAHgEQAGgEADgHIAAgTIgMAAQgdAAAAARg");
	this.shape_88.setTransform(433.975,213.45);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgRBRIAAgMIAHAAQAGAAADgCQABgDAAgHIAAhpIAQAAIAABoQAAAbgXAAQgFAAgFgCgAABhCQgBgDAAgEQAAgEABgDQADgCAEAAQAFAAACACQADADAAAEQAAAEgDADQgCACgFAAQgFAAgCgCg");
	this.shape_89.setTransform(426.125,213.65);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AAVAwIAAg9QAAgLgFgEQgEgFgKAAQgHAAgFAEQgGAEgEAHIAABCIgQAAIAAhdIAQAAIAAAMQAKgOARAAQAeAAAAAiIAAA9g");
	this.shape_90.setTransform(420,213.375);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgbAkQgMgMAAgWIAAgCQAAgNAFgLQAGgLAKgHQAJgFAKAAQATgBAJAMQALANAAAWIAAAGIg/AAQABAOAHAIQAIAIALAAQAJAAAFgDQAHgDADgGIAKAIQgMASgXAAQgSAAgMgNgAgOgcQgHAIgCAMIAvAAIAAgBQgBgMgGgHQgGgHgKAAQgJAAgGAHg");
	this.shape_91.setTransform(410.45,213.45);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AAyAwIAAg9QAAgKgFgFQgEgFgLAAQgJAAgGAFQgGAFgBAJIAAA+IgPAAIAAg9QAAgUgUAAQgQAAgGANIAABEIgQAAIAAhdIAQAAIAAAKQAKgMASAAQAUAAAGAPQAEgHAIgEQAHgEALAAQAeAAABAhIAAA+g");
	this.shape_92.setTransform(397.875,213.375);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgTA+QgKgEgFgIIAIgKQALANAOAAQALAAAHgGQAGgHABgMIAAgIQgKALgQAAQgQAAgLgNQgKgOABgVQgBgWAKgNQALgNAQAAQARAAAJAMIABgLIAPAAIAABbQAAASgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJABASQgBAQAHAIQAGAJALAAQAPAAAIgNIAAgqQgIgOgPAAQgKAAgHAJg");
	this.shape_93.setTransform(380.5,215.225);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AAVAwIAAg9QAAgLgEgEQgFgFgKAAQgHAAgFAEQgHAEgDAHIAABCIgQAAIAAhdIAQAAIAAAMQALgOAQAAQAeAAAAAiIAAA9g");
	this.shape_94.setTransform(370.75,213.375);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgOALgIQAMgIATAAIAPAAIAAgIQAAgHgFgFQgFgGgJAAQgIAAgGAFQgGAEAAAGIgQAAQAAgHAFgHQAFgGAJgEQAIgEAJABQARgBAJAJQAJAHAAAPIAAAqQAAANAEAHIAAACIgRAAQgCgDAAgHQgMAMgOAAQgOAAgJgIgAgWASQAAAIAFAFQAFAEAIAAQAHAAAHgEQAGgEADgHIAAgTIgMAAQgdAAAAARg");
	this.shape_95.setTransform(361.025,213.45);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgcBCIgFgCIAAgMIADAAQAJAAAFgDQAEgEADgJIAEgJIgihcIARAAIAXBGIAWhGIARAAIgmBrQgHAYgTAAg");
	this.shape_96.setTransform(352,215.35);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AAVAwIAAg9QAAgLgFgEQgEgFgKAAQgGAAgHAEQgFAEgEAHIAABCIgQAAIAAhdIAPAAIABAMQALgOAQAAQAeAAAAAiIAAA9g");
	this.shape_97.setTransform(338.5,213.375);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgOALgIQAMgIATAAIAPAAIAAgIQAAgHgFgFQgFgGgJAAQgIAAgGAFQgGAEAAAGIgQAAQAAgHAFgHQAFgGAJgEQAIgEAJABQARgBAJAJQAJAHAAAPIAAAqQAAANAEAHIAAACIgRAAQgCgDAAgHQgMAMgOAAQgOAAgJgIgAgWASQAAAIAFAFQAFAEAIAAQAHAAAHgEQAGgEADgHIAAgTIgMAAQgdAAAAARg");
	this.shape_98.setTransform(328.725,213.45);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AAXAvIgXhGIgWBGIgMAAIgchdIAQAAIASBGIAXhGIALAAIAXBHIAShHIAQAAIgcBdg");
	this.shape_99.setTransform(317.25,213.45);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AgbAkQgMgMAAgWIAAgCQAAgNAFgLQAFgLALgHQAJgFAKAAQASgBAKAMQALANAAAWIAAAGIg/AAQABAOAHAIQAIAIALAAQAIAAAGgDQAGgDAEgGIAKAIQgLASgYAAQgSAAgMgNgAgOgcQgHAIgCAMIAvAAIAAgBQgBgMgGgHQgGgHgKAAQgJAAgGAHg");
	this.shape_100.setTransform(305.95,213.45);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AAVBDIAAg+QAAgKgFgEQgEgFgKAAQgHAAgFAEQgGAEgEAGIAABDIgQAAIAAiFIAQAAIAAAzQALgNAQAAQAeAAAAAhIAAA+g");
	this.shape_101.setTransform(296.25,211.475);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AAVBDIAAg+QAAgKgEgEQgFgFgKAAQgHAAgFAEQgHAEgDAGIAABDIgQAAIAAiFIAQAAIAAAzQALgNAQAAQAeAAAAAhIAAA+g");
	this.shape_102.setTransform(282.1,211.475);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgOALgIQAMgIATAAIAPAAIAAgIQAAgHgFgFQgFgGgJAAQgIAAgGAFQgGAEAAAGIgQAAQAAgHAFgHQAFgGAJgEQAIgEAJABQARgBAJAJQAJAHAAAPIAAAqQAAANAEAHIAAACIgRAAQgCgDAAgHQgMAMgOAAQgOAAgJgIgAgWASQAAAIAFAFQAFAEAIAAQAHAAAHgEQAGgEADgHIAAgTIgMAAQgdAAAAARg");
	this.shape_103.setTransform(272.375,213.45);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AAUBDIgfgsIgLALIAAAhIgQAAIAAiFIAQAAIAABQIAJgKIAcgeIAUAAIgkAmIAoA3g");
	this.shape_104.setTransform(263.65,211.475);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgOALgIQAMgIATAAIAPAAIAAgIQAAgHgFgFQgFgGgJAAQgIAAgGAFQgGAEAAAGIgQAAQAAgHAFgHQAFgGAJgEQAIgEAJABQARgBAJAJQAJAHAAAPIAAAqQAAANAEAHIAAACIgRAAQgCgDAAgHQgMAMgOAAQgOAAgJgIgAgWASQAAAIAFAFQAFAEAIAAQAHAAAHgEQAGgEADgHIAAgTIgMAAQgdAAAAARg");
	this.shape_105.setTransform(253.675,213.45);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AAVAwIAAg9QAAgLgEgEQgFgFgKAAQgHAAgFAEQgHAEgDAHIAABCIgQAAIAAhdIAQAAIAAAMQALgOAQAAQAeAAAAAiIAAA9g");
	this.shape_106.setTransform(243.95,213.375);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AgdApQgJgIAAgMQAAgOALgIQAMgIATAAIAPAAIAAgIQAAgHgFgFQgFgGgJAAQgIAAgGAFQgGAEAAAGIgQAAQAAgHAFgHQAFgGAJgEQAIgEAJABQARgBAJAJQAJAHAAAPIAAAqQAAANAEAHIAAACIgRAAQgCgDAAgHQgMAMgOAAQgOAAgJgIgAgWASQAAAIAFAFQAFAEAIAAQAHAAAHgEQAGgEADgHIAAgTIgMAAQgdAAAAARg");
	this.shape_107.setTransform(234.175,213.45);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AAvA/IAAgxIABg0IgqBlIgMAAIgphlIACA0IAAAxIgRAAIAAh9IAVAAIApBmIAphmIAWAAIAAB9g");
	this.shape_108.setTransform(221.6,211.825);

	this.judulKI = new lib.bg1();
	this.judulKI.name = "judulKI";
	this.judulKI.setTransform(472.75,223.8,1.4308,0.8557,0,0,0,-19.9,1.6);
	this.judulKI.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);

	this.pieces = new lib.Pieces10();
	this.pieces.name = "pieces";
	this.pieces.setTransform(-28.65,56.3);

	this.slots = new lib.Slots10();
	this.slots.name = "slots";
	this.slots.setTransform(-12.4,56.45);

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

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AABAMQAGgJABgKIAAgKIAOAAIAAAKQgBAHgEAGQgDAIgGAEgAgUAMQAGgJABgKIAAgKIANAAIAAAKQAAAHgEAGQgDAIgGAEg");
	this.shape_109.setTransform(562.3,125.5);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_110.setTransform(557.9,129.55);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_111.setTransform(554.225,129.325);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_112.setTransform(548.325,131);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AgTAuIgBAJIgMAAIAAhvIANAAIAAAqQAIgKAOAAQAOAAAIALQAIAKAAASIAAACQAAASgIALQgIALgOAAQgPAAgHgLgAgTgBIAAAiQAGAMANAAQAJABAGgIQAFgHAAgQQAAgNgFgHQgGgHgJAAQgNgBgGAMg");
	this.shape_113.setTransform(540.25,129.4);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_114.setTransform(529.275,130.925);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AgWAeQgLgKABgSIAAgCQgBgLAFgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAGAIQAIAHAJAAQAGAAAFgDQAFgDAEgFIAIAHQgKAPgTAAQgPAAgKgLgAgMgXQgGAGgBAKIAnAAIAAgBQgBgKgFgGQgEgFgJAAQgHAAgGAGg");
	this.shape_115.setTransform(518.85,131);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_116.setTransform(511.525,129.325);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_117.setTransform(501.675,129.325);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_118.setTransform(495.775,131);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_119.setTransform(485.125,130.925);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_120.setTransform(476.4,130.925);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AgZAeQgKgMAAgSIAAAAQAAgLAFgKQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAAMgEAIQgFAJgIAGQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgIAAgOQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_121.setTransform(469.175,131);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIANAAIAAAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_122.setTransform(460.75,130.925);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCADgEAAQgDAAgCgDg");
	this.shape_123.setTransform(451.1,129.55);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AgYAtQgJgKABgTIAAgBQgBgRAJgLQAJgLAOAAQAMAAAJAKIAAgqIANAAIAABvIgMAAIgBgIQgIAKgNAAQgOAAgJgMgAgNgFQgGAHAAAPQAAANAGAIQAFAIAJgBQANAAAGgLIAAgkQgHgLgMABQgJAAgFAHg");
	this.shape_124.setTransform(444.85,129.4);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AgYAjQgIgIAAgJQAAgNAKgFQAJgIAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAHAAAMIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_125.setTransform(436.725,131);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AgOBEIAAgKIAGAAQAFABACgDQABgDAAgGIAAhXIAOAAIAABXQAAAXgUAAQgEAAgEgCgAABg4QgBgCAAgDQAAgDABgDQACgCAEAAQAEAAACACQACADAAADQAAADgCACQgCADgEAAQgEAAgCgDg");
	this.shape_126.setTransform(430.075,131.15);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AASAoIAAgzQgBgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_127.setTransform(424.9,130.925);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AgXAeQgKgKAAgSIAAgCQABgLAEgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAIQAIAHAIAAQAIAAAEgDQAGgDADgFIAIAHQgJAPgVAAQgOAAgLgLgAgMgXQgGAGAAAKIAmAAIAAgBQAAgKgGgGQgEgFgJAAQgHAAgGAGg");
	this.shape_128.setTransform(416.9,131);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_129.setTransform(406.275,130.925);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgIAAQgGAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_130.setTransform(391.85,130.925);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_131.setTransform(383.575,131.075);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("AggA3IAAhsIAMAAIABAIQAIgKAOABQAOgBAIALQAIALAAATIAAACQAAAQgIAMQgIALgOgBQgOABgIgKIAAAmgAgTghIAAAmQAGAKANABQAIAAAGgJQAGgHAAgPQAAgMgGgJQgGgHgIAAQgNAAgGAKg");
	this.shape_132.setTransform(375.425,132.45);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_133.setTransform(772.85,108.925);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_134.setTransform(765.825,109);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAAKIgLACQgJAAgEgFg");
	this.shape_135.setTransform(759.125,108.1);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCADgEgBQgDABgCgDg");
	this.shape_136.setTransform(755.1,107.55);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_137.setTransform(749.975,107.325);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AgXAeQgKgKABgSIAAgCQAAgLAEgKQAEgIAJgGQAHgFAJAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAHQAHAIAJAAQAIAAAEgDQAGgDADgFIAIAGQgKAQgUAAQgOAAgLgLgAgMgXQgGAGAAALIAmAAIAAgBQAAgLgGgFQgEgGgJAAQgHAAgGAGg");
	this.shape_138.setTransform(741.8,109);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("AgPAmQgHgEgFgGQgDgGAAgHIANAAQABAHAEAEQAFAEAIAAQAHAAAGgDQAEgDAAgFQAAgGgEgDQgEgDgKgDQgKgBgGgDQgGgCgDgFQgDgEAAgGQAAgKAIgGQAIgHAMAAQAOAAAJAHQAHAGABAMIgOAAQAAgGgEgEQgGgEgHAAQgGAAgEADQgFADABAGQAAAFADACQAEADAKACQAKACAGADQAGADAEAEQADAEAAAHQAAAKgJAGQgIAHgOAAQgIAAgIgDg");
	this.shape_139.setTransform(733.85,109);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAAKIgLACQgJAAgEgFg");
	this.shape_140.setTransform(723.675,108.1);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_141.setTransform(717.375,109);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_142.setTransform(710.025,107.325);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_143.setTransform(701.625,109);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_144.setTransform(695.4,108.925);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_145.setTransform(688.375,109);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFFF").s().p("AgXA4IgFgCIAAgLIAEAAQAGABAEgDQAEgDADgHIADgIIgdhOIAPAAIATA7IASg7IAPAAIggBaQgGAVgQAAg");
	this.shape_146.setTransform(680.725,110.6);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFFFF").s().p("AgPAmQgHgEgEgGQgFgGAAgHIAOAAQABAHAEAEQAGAEAHAAQAIAAAEgDQAFgDAAgFQAAgGgEgDQgFgDgJgDQgKgBgGgDQgGgCgDgFQgDgEAAgGQAAgKAIgGQAJgHAMAAQANAAAIAHQAJAGgBAMIgNAAQAAgGgFgEQgEgEgHAAQgHAAgEADQgEADAAAGQAAAFADACQAFADAJACQAKACAGADQAHADADAEQACAEAAAHQAAAKgIAGQgJAHgNAAQgJAAgHgDg");
	this.shape_147.setTransform(673.3,109);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_148.setTransform(665.375,109);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_149.setTransform(654.725,108.925);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIANAAIAAAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_150.setTransform(640.3,108.925);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_151.setTransform(632.075,109);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCADgEgBQgDABgCgDg");
	this.shape_152.setTransform(626.2,107.55);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_153.setTransform(617.775,108.925);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("AgZAeQgKgLAAgTIAAAAQAAgMAFgJQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAALgEAKQgFAJgIAFQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgJAAgNQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_154.setTransform(606.925,109);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_155.setTransform(598.5,108.925);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("AgZAeQgKgLAAgTIAAAAQAAgMAFgJQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAALgEAKQgFAJgIAFQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgJAAgNQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_156.setTransform(590.075,109);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_157.setTransform(582.525,107.325);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FFFFFF").s().p("AgWAeQgLgKAAgSIAAgCQAAgLAFgKQAFgIAHgGQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAHQAGAIAKAAQAGAAAGgDQAEgDAEgFIAJAGQgKAQgVAAQgPAAgJgLgAgMgXQgFAGgCALIAnAAIAAgBQgBgLgEgFQgGgGgIAAQgHAAgGAGg");
	this.shape_158.setTransform(574.35,109);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_159.setTransform(568.15,108.925);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FFFFFF").s().p("AgXAeQgKgKAAgSIAAgCQABgLAEgKQAEgIAJgGQAHgFAJAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAHQAHAIAJAAQAIAAAEgDQAGgDADgFIAIAGQgKAQgUAAQgOAAgLgLgAgMgXQgGAGAAALIAmAAIAAgBQAAgLgGgFQgEgGgJAAQgHAAgGAGg");
	this.shape_160.setTransform(561.35,109);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FFFFFF").s().p("AggA4IAAhtIAMAAIABAJQAIgKAOAAQAOgBAIALQAIALAAATIAAABQAAASgIAKQgIAMgOAAQgOgBgIgIIAAAmgAgTghIAAAlQAGALANAAQAIAAAGgHQAGgIAAgOQAAgOgGgHQgGgIgIAAQgNAAgGAKg");
	this.shape_161.setTransform(553.275,110.45);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_162.setTransform(541.125,109);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgFgHIAIgIQAJALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgJAJgNAAQgNAAgJgLQgJgLABgTQgBgSAJgLQAJgLAOAAQANAAAJAKIAAgIIAMAAIAABMQABAPgKAJQgJAJgPAAQgIAAgIgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgJAAgFAHg");
	this.shape_163.setTransform(532.7,110.475);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgEgHIAHgIQAIALANAAQAJAAAGgGQAFgFAAgKIAAgHQgJAJgMAAQgPAAgIgLQgJgLAAgTQAAgSAJgLQAIgLAPAAQAOAAAHAKIABgIIANAAIAABMQgBAPgIAJQgKAJgPAAQgIAAgIgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgIAAgHAHg");
	this.shape_164.setTransform(524.3,110.475);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIANAAIAAAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_165.setTransform(516.1,108.925);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCADgEgBQgDABgCgDg");
	this.shape_166.setTransform(510.15,107.55);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FFFFFF").s().p("AASA4IAAg0QAAgIgFgEQgDgEgIAAQgGAAgFAEQgFADgCAFIAAA4IgOAAIAAhvIAOAAIAAArQAIgLANAAQAaAAAAAbIAAA0g");
	this.shape_167.setTransform(504.2,107.325);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#FFFFFF").s().p("AgXAeQgKgKAAgSIAAgCQABgLAEgKQAEgIAIgGQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAGAHQAHAIAJAAQAIAAAFgDQAFgDADgFIAIAGQgJAQgVAAQgOAAgLgLgAgMgXQgGAGAAALIAmAAIAAgBQgBgLgFgFQgEgGgJAAQgHAAgGAGg");
	this.shape_168.setTransform(496.2,109);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FFFFFF").s().p("AgPAmQgHgEgFgGQgEgGABgHIANAAQABAHAEAEQAFAEAIAAQAIAAAFgDQAEgDAAgFQAAgGgEgDQgFgDgJgDQgKgBgGgDQgGgCgDgFQgDgEAAgGQAAgKAIgGQAJgHAMAAQANAAAJAHQAIAGAAAMIgOAAQAAgGgEgEQgGgEgGAAQgHAAgEADQgFADABAGQAAAFADACQAFADAJACQAKACAGADQAGADAEAEQADAEgBAHQAAAKgIAGQgJAHgNAAQgJAAgHgDg");
	this.shape_169.setTransform(488.25,109);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_170.setTransform(477.425,107.325);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCADgEgBQgDABgCgDg");
	this.shape_171.setTransform(471.3,107.55);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_172.setTransform(465.375,109);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#FFFFFF").s().p("AgUAuIgBAJIgLAAIAAhvIANAAIAAAqQAIgKAOAAQAOAAAIAKQAJALgBATIAAABQABASgJALQgJALgNAAQgOAAgJgLgAgTAAIAAAhQAGANANAAQAJgBAFgHQAGgIAAgPQAAgOgGgGQgFgIgJAAQgOAAgFANg");
	this.shape_173.setTransform(457.3,107.4);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_174.setTransform(446.325,108.925);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#FFFFFF").s().p("AgXAeQgKgKAAgSIAAgCQABgLAEgKQAEgIAJgGQAIgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAGAHQAHAIAJAAQAHAAAGgDQAFgDADgFIAIAGQgJAQgVAAQgOAAgLgLgAgMgXQgGAGAAALIAmAAIAAgBQAAgLgGgFQgEgGgJAAQgHAAgGAGg");
	this.shape_175.setTransform(435.9,109);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_176.setTransform(425.275,108.925);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCADgEgBQgDABgCgDg");
	this.shape_177.setTransform(413.2,107.55);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_178.setTransform(407.275,109);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_179.setTransform(401.375,107.325);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_180.setTransform(395.425,109.075);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_181.setTransform(384.725,108.925);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_182.setTransform(367.875,108.925);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_183.setTransform(357.225,109);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_184.setTransform(351.325,107.325);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_185.setTransform(345.425,109);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_186.setTransform(331.075,108.925);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#FFFFFF").s().p("AgWAeQgKgKAAgSIAAgCQgBgLAFgKQAFgIAHgGQAIgFAJAAQAPAAAJAKQAIAKABATIAAAFIg1AAQAAALAHAHQAGAIAKAAQAHAAAEgDQAFgDAEgFIAJAGQgLAQgTAAQgQAAgJgLgAgMgXQgFAGgCALIAnAAIAAgBQgBgLgEgFQgFgGgJAAQgHAAgGAGg");
	this.shape_187.setTransform(320.65,109);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAAKIgLACQgJAAgEgFg");
	this.shape_188.setTransform(313.975,108.1);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#FFFFFF").s().p("AgPAmQgIgEgDgGQgEgGAAgHIANAAQAAAHAGAEQAEAEAIAAQAHAAAGgDQAEgDAAgFQAAgGgEgDQgEgDgKgDQgKgBgGgDQgGgCgDgFQgDgEAAgGQAAgKAJgGQAHgHAMAAQAOAAAJAHQAHAGAAAMIgNAAQAAgGgFgEQgEgEgIAAQgGAAgEADQgFADAAAGQAAAFAFACQAEADAIACQALACAGADQAGADADAEQADAEABAHQAAAKgJAGQgJAHgNAAQgJAAgHgDg");
	this.shape_189.setTransform(307.85,109);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCADgEgBQgDABgCgDg");
	this.shape_190.setTransform(302.2,107.55);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#FFFFFF").s().p("AgPAmQgHgEgFgGQgDgGAAgHIANAAQABAHAEAEQAFAEAIAAQAIAAAFgDQAEgDAAgFQAAgGgEgDQgEgDgKgDQgKgBgGgDQgGgCgDgFQgDgEAAgGQAAgKAIgGQAIgHAMAAQAOAAAJAHQAHAGABAMIgOAAQAAgGgEgEQgGgEgHAAQgGAAgEADQgFADABAGQAAAFADACQAEADAKACQAKACAGADQAGADAEAEQADAEAAAHQAAAKgJAGQgIAHgOAAQgIAAgIgDg");
	this.shape_191.setTransform(296.45,109);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#FFFFFF").s().p("AgZAeQgKgLAAgTIAAAAQAAgMAFgJQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAALgEAKQgFAJgIAFQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgJAAgNQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_192.setTransform(288.325,109);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_193.setTransform(280.775,107.325);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#FFFFFF").s().p("AgWAeQgKgKAAgSIAAgCQgBgLAFgKQAEgIAJgGQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAHAHQAGAIAKAAQAGAAAFgDQAFgDAEgFIAJAGQgLAQgTAAQgQAAgJgLgAgMgXQgGAGgBALIAnAAIAAgBQgBgLgFgFQgEgGgJAAQgHAAgGAGg");
	this.shape_194.setTransform(272.6,109);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_195.setTransform(260.7,108.925);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_196.setTransform(252.475,109);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgIAAQgGAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_197.setTransform(244.25,108.925);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_198.setTransform(236.025,109);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_199.setTransform(228.675,107.325);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_200.setTransform(220.275,109);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_201.setTransform(209.625,108.925);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgEQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAAEgCACQgCADgEgBQgDABgCgDg");
	this.shape_202.setTransform(197.55,107.55);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_203.setTransform(191.625,109);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgxIgPAAIAAgKIAPAAIAAgTIAMAAIAAATIAPAAIAAAKIgPAAIAAAxQAAAFACACQACACAFABIAHgBIAAAKIgLACQgJAAgEgFg");
	this.shape_204.setTransform(184.925,108.1);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgIAAQgGAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_205.setTransform(178.55,108.925);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgJQAAgNAKgGQAJgGAQAAIANAAIAAgHQAAgHgEgEQgEgEgIgBQgHAAgFAFQgFADAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAHQAIAGAAANIAAAjQAAALADAHIAAAAIgPAAIgBgIQgKAKgMAAQgMAAgHgHgAgSAPQAAAHAEADQAEAEAHAAQAFAAAGgDQAGgDACgFIAAgRIgKAAQgYAAAAAOg");
	this.shape_206.setTransform(170.325,109);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_207.setTransform(164.1,108.925);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#FFFFFF").s().p("AgPAlQgIgDgEgGQgDgGAAgHIANAAQAAAHAGAEQAEAEAIAAQAHAAAGgDQAEgEAAgFQAAgFgEgDQgEgDgKgCQgKgCgGgDQgGgDgDgEQgDgEAAgGQAAgJAJgIQAHgGAMAAQAOAAAJAGQAHAIAAAKIgNAAQAAgFgFgEQgEgEgIAAQgGAAgEADQgFAEAAAEQAAAFAFADQAEADAIABQALADAGADQAGADADAEQADAEABAGQAAALgJAGQgJAHgNAAQgJAAgHgEg");
	this.shape_208.setTransform(766.85,87);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#FFFFFF").s().p("AgWAfQgLgLABgSIAAgCQgBgLAFgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAGAIQAHAHAKAAQAGAAAFgDQAFgDAEgFIAIAGQgKAQgTAAQgPAAgKgKgAgMgXQgGAGgBAKIAnAAIAAgBQgBgKgFgGQgEgFgJAAQgHAAgGAGg");
	this.shape_209.setTransform(759.15,87);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#FFFFFF").s().p("AgPAlQgIgDgEgGQgDgGAAgHIANAAQAAAHAGAEQAEAEAIAAQAHAAAGgDQAEgEAAgFQAAgFgEgDQgEgDgKgCQgKgCgGgDQgGgDgDgEQgDgEAAgGQAAgJAJgIQAHgGAMAAQAOAAAJAGQAHAIABAKIgOAAQAAgFgEgEQgGgEgHAAQgGAAgEADQgFAEAAAEQABAFAEADQAEADAIABQALADAGADQAGADADAEQAEAEAAAGQAAALgJAGQgIAHgOAAQgJAAgHgEg");
	this.shape_210.setTransform(751.2,87);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#FFFFFF").s().p("AgZAeQgKgMAAgSIAAAAQAAgLAFgKQAEgJAIgFQAIgFAKAAQAQAAAKALQAKALAAASIAAABQAAAMgEAJQgFAIgIAGQgIAFgLAAQgPAAgKgLgAgPgVQgGAIAAAOQAAANAGAIQAGAIAJAAQAKAAAGgIQAHgJAAgNQAAgNgHgIQgGgIgKAAQgJAAgGAIg");
	this.shape_211.setTransform(743.075,87);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgGAAQgNAAgEALIAAA3g");
	this.shape_212.setTransform(736.65,86.925);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#FFFFFF").s().p("AggA3IAAhsIAMAAIABAIQAIgKAOAAQAOAAAIALQAIALAAATIAAACQAAAQgIALQgIAMgOgBQgOABgIgKIAAAmgAgTggIAAAlQAGALANgBQAIABAGgJQAGgHAAgOQAAgNgGgJQgGgHgIAAQgNAAgGALg");
	this.shape_213.setTransform(729.675,88.45);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#FFFFFF").s().p("AASAoIAAgzQgBgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_214.setTransform(713.75,86.925);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_215.setTransform(705.525,87);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_216.setTransform(698.175,85.325);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_217.setTransform(692.05,85.55);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#FFFFFF").s().p("AgYAtQgIgKAAgTIAAgBQAAgRAIgLQAJgLANAAQAOAAAIAKIAAgqIANAAIAABwIgMAAIgBgJQgIAKgOAAQgNAAgJgMgAgNgFQgGAHAAAPQAAANAGAIQAFAIAJgBQANABAGgMIAAgkQgGgLgNABQgJAAgFAHg");
	this.shape_218.setTransform(685.8,85.4);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_219.setTransform(677.675,87);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#FFFFFF").s().p("AgOBEIAAgKIAGAAQAFAAACgCQABgDAAgGIAAhXIAOAAIAABXQAAAXgUAAQgEAAgEgCgAABg4QgBgCAAgDQAAgDABgDQACgCAEAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgEgBgCgCg");
	this.shape_220.setTransform(671.025,87.15);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgJAAQgFAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_221.setTransform(665.85,86.925);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#FFFFFF").s().p("AgXAfQgJgLgBgSIAAgCQAAgLAFgJQAFgKAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAGAIQAIAHAIAAQAHAAAGgDQAFgDADgFIAJAGQgKAQgVAAQgPAAgKgKgAgMgXQgFAGgBAKIAmAAIAAgBQAAgKgFgGQgGgFgIAAQgHAAgGAGg");
	this.shape_222.setTransform(657.85,87);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_223.setTransform(647.225,86.925);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#FFFFFF").s().p("AASAoIAAgzQgBgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_224.setTransform(632.8,86.925);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_225.setTransform(624.575,87);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgJAAQgFAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_226.setTransform(616.35,86.925);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_227.setTransform(608.125,87);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgEgHIAGgIQAJALANAAQAJAAAFgGQAGgFAAgKIAAgHQgIAJgNAAQgPAAgIgLQgJgLAAgTQAAgSAJgLQAIgLAPAAQAOAAAHAKIABgIIANAAIAABMQgBAPgIAJQgKAJgPAAQgHAAgJgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgIAAgHAHg");
	this.shape_228.setTransform(599.7,88.475);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#FFFFFF").s().p("AASAoIAAgzQgBgJgEgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_229.setTransform(591.5,86.925);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_230.setTransform(583.275,87);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIANAAIAAAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_231.setTransform(575.05,86.925);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#FFFFFF").s().p("AgXAfQgJgLgBgSIAAgCQAAgLAFgJQAFgKAHgFQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAALAHAIQAHAHAIAAQAHAAAGgDQAEgDAEgFIAJAGQgKAQgVAAQgPAAgKgKgAgMgXQgFAGgBAKIAmAAIAAgBQAAgKgFgGQgGgFgIAAQgHAAgGAGg");
	this.shape_232.setTransform(567.05,87);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#FFFFFF").s().p("AggA3IAAhsIAMAAIABAIQAIgKAOAAQAOAAAIALQAIALAAATIAAACQAAAQgIALQgIAMgOgBQgOABgIgKIAAAmgAgTggIAAAlQAGALANgBQAIABAGgJQAGgHAAgOQAAgNgGgJQgGgHgIAAQgNAAgGALg");
	this.shape_233.setTransform(558.975,88.45);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_234.setTransform(546.825,87);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#FFFFFF").s().p("AgXA3IgFgBIAAgKIAEAAQAGgBAEgCQAEgDADgIIADgIIgdhMIAPAAIATA5IASg5IAPAAIggBaQgGATgQAAg");
	this.shape_235.setTransform(539.175,88.6);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#FFFFFF").s().p("AASAoIAAgzQgBgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_236.setTransform(531.5,86.925);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_237.setTransform(523.275,87);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#FFFFFF").s().p("AgYAtQgIgKAAgTIAAgBQAAgRAIgLQAJgLANAAQAOAAAIAKIAAgqIANAAIAABwIgMAAIgBgJQgIAKgOAAQgNAAgJgMgAgNgFQgGAHAAAPQAAANAGAIQAFAIAJgBQANABAGgMIAAgkQgGgLgNABQgJAAgFAHg");
	this.shape_238.setTransform(514.8,85.4);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_239.setTransform(506.675,87);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgIAAQgGAAgFAEQgFADgCAGIAAA3IgOAAIAAhOIANAAIAAAKQAJgLANAAQAaAAAAAcIAAAzg");
	this.shape_240.setTransform(494.75,86.925);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_241.setTransform(486.525,87);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_242.setTransform(480.625,85.325);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_243.setTransform(474.675,87.075);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#FFFFFF").s().p("AgUAvIgBAJIgLAAIAAhwIANAAIAAAqQAIgKAOAAQAOAAAIALQAIALAAARIAAACQAAASgIALQgIALgOAAQgOAAgJgKgAgTgBIAAAiQAGAMANAAQAJABAGgIQAFgHAAgQQAAgNgFgHQgGgHgJAAQgOgBgFAMg");
	this.shape_244.setTransform(466.55,85.4);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_245.setTransform(454.375,87);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#FFFFFF").s().p("AggA3IAAhsIAMAAIABAIQAIgKAOAAQAOAAAIALQAIALAAATIAAACQAAAQgIALQgIAMgOgBQgOABgIgKIAAAmgAgTggIAAAlQAGALANgBQAIABAGgJQAGgHAAgOQAAgNgGgJQgGgHgIAAQgNAAgGALg");
	this.shape_246.setTransform(446.275,88.45);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_247.setTransform(437.825,87);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_248.setTransform(431.6,86.925);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#FFFFFF").s().p("AgWAfQgLgLABgSIAAgCQgBgLAFgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAGAIQAHAHAKAAQAGAAAFgDQAFgDAEgFIAIAGQgKAQgTAAQgPAAgKgKgAgMgXQgGAGgBAKIAnAAIAAgBQgBgKgFgGQgEgFgJAAQgHAAgGAGg");
	this.shape_249.setTransform(424.8,87);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#FFFFFF").s().p("AgTAvIgBAJIgNAAIAAhwIAOAAIAAAqQAIgKANAAQAPAAAIALQAJALAAARIAAACQAAASgJALQgIALgPAAQgOAAgHgKgAgTgBIAAAiQAGAMANAAQAJABAGgIQAFgHAAgQQAAgNgFgHQgGgHgJAAQgNgBgGAMg");
	this.shape_250.setTransform(416.75,85.4);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#FFFFFF").s().p("AgWAfQgKgLAAgSIAAgCQgBgLAFgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAHAIQAGAHAKAAQAGAAAFgDQAFgDAEgFIAJAGQgLAQgTAAQgQAAgJgKgAgMgXQgGAGgBAKIAnAAIAAgBQgBgKgFgGQgEgFgJAAQgHAAgGAGg");
	this.shape_251.setTransform(408.5,87);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#FFFFFF").s().p("AgTAvIgBAJIgNAAIAAhwIAOAAIAAAqQAIgKANAAQAPAAAIALQAJALAAARIAAACQAAASgJALQgIALgPAAQgOAAgHgKgAgTgBIAAAiQAGAMANAAQAJABAGgIQAFgHAAgQQAAgNgFgHQgGgHgJAAQgNgBgGAMg");
	this.shape_252.setTransform(400.45,85.4);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#FFFFFF").s().p("AARA4IAAg0QAAgIgDgEQgEgEgIAAQgGAAgFAEQgFADgDAFIAAA4IgNAAIAAhvIANAAIAAArQAKgLAMAAQAaAAAAAbIAAA0g");
	this.shape_253.setTransform(388.25,85.325);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_254.setTransform(380.025,87);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_255.setTransform(374.125,85.325);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#FFFFFF").s().p("AgWAfQgKgLAAgSIAAgCQgBgLAFgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAALAHAIQAGAHAKAAQAGAAAFgDQAFgDAEgFIAIAGQgKAQgTAAQgQAAgJgKgAgMgXQgGAGgBAKIAnAAIAAgBQgBgKgFgGQgEgFgJAAQgHAAgGAGg");
	this.shape_256.setTransform(368.45,87);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#FFFFFF").s().p("AgCAsQgEgFAAgKIAAgwIgPAAIAAgKIAPAAIAAgUIAMAAIAAAUIAPAAIAAAKIgPAAIAAAwQAAAEACADQACACAFAAIAHgBIAAAMIgLABQgJAAgEgGg");
	this.shape_257.setTransform(361.775,86.1);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#FFFFFF").s().p("AgXAfQgKgLABgSIAAgCQAAgLAEgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAIQAHAHAJAAQAIAAAEgDQAGgDADgFIAIAGQgJAQgVAAQgOAAgLgKgAgMgXQgGAGAAAKIAmAAIAAgBQAAgKgGgGQgEgFgJAAQgHAAgGAGg");
	this.shape_258.setTransform(355.7,87);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#FFFFFF").s().p("AgPAlQgHgDgFgGQgDgGAAgHIANAAQABAHAEAEQAFAEAIAAQAIAAAFgDQAEgEAAgFQAAgFgEgDQgEgDgKgCQgKgCgGgDQgGgDgDgEQgDgEAAgGQAAgJAIgIQAIgGAMAAQAOAAAJAGQAHAIABAKIgOAAQAAgFgEgEQgGgEgHAAQgGAAgEADQgFAEABAEQAAAFADADQAEADAKABQAKADAGADQAGADAEAEQADAEAAAGQAAALgJAGQgIAHgOAAQgIAAgIgEg");
	this.shape_259.setTransform(347.75,87);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#FFFFFF").s().p("AASA4IAAg0QAAgIgFgEQgDgEgJAAQgFAAgFAEQgFADgCAFIAAA4IgOAAIAAhvIAOAAIAAArQAJgLANAAQAZAAAAAbIAAA0g");
	this.shape_260.setTransform(336.1,85.325);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_261.setTransform(330.15,85.55);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_262.setTransform(326.475,85.325);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_263.setTransform(320.525,87.075);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#FFFFFF").s().p("AggA3IAAhsIAMAAIABAIQAIgKAOAAQAOAAAIALQAIALAAATIAAACQAAAQgIALQgIAMgOgBQgOABgIgKIAAAmgAgTggIAAAlQAGALANgBQAIABAGgJQAGgHAAgOQAAgNgGgJQgGgHgIAAQgNAAgGALg");
	this.shape_264.setTransform(312.375,88.45);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_265.setTransform(302.5,85.55);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_266.setTransform(298.825,85.325);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_267.setTransform(292.925,87);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#FFFFFF").s().p("AgUAvIgBAJIgLAAIAAhwIANAAIAAAqQAIgKAOAAQAOAAAIALQAIALAAARIAAACQAAASgIALQgJALgNAAQgOAAgJgKgAgTgBIAAAiQAGAMANAAQAJABAFgIQAGgHAAgQQAAgNgGgHQgFgHgJAAQgOgBgFAMg");
	this.shape_268.setTransform(284.85,85.4);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#FFFFFF").s().p("AAqAoIAAgzQAAgJgEgEQgEgEgJAAQgHAAgFAFQgFAEgBAIIAAAzIgNAAIAAgzQAAgRgRAAQgNAAgFALIAAA5IgOAAIAAhOIANAAIABAJQAIgKAPAAQARAAAFAMQAEgFAGgEQAGgDAJAAQAaAAABAbIAAA0g");
	this.shape_269.setTransform(273.875,86.925);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#FFFFFF").s().p("AgXAfQgKgLABgSIAAgCQAAgLAEgJQAEgKAJgFQAHgFAJAAQAPAAAJAKQAJAKgBATIAAAFIg0AAQAAALAGAIQAHAHAJAAQAIAAAEgDQAGgDADgFIAIAGQgJAQgVAAQgOAAgLgKgAgMgXQgGAGAAAKIAmAAIAAgBQAAgKgGgGQgEgFgJAAQgHAAgGAGg");
	this.shape_270.setTransform(263.45,87);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_271.setTransform(256.125,85.325);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#FFFFFF").s().p("AARAoIAAgzQABgJgEgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_272.setTransform(243.95,86.925);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#FFFFFF").s().p("AgYAiQgIgHAAgKQAAgMAKgGQAJgHAQAAIANAAIAAgGQAAgHgEgEQgEgFgIABQgHAAgFADQgFAEAAAFIgNAAQAAgGAEgFQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAACIgPAAIgBgJQgKAKgMAAQgMAAgHgHgAgSAQQAAAGAEADQAEAEAHAAQAFAAAGgDQAGgEACgFIAAgQIgKAAQgYAAAAAPg");
	this.shape_273.setTransform(235.725,87);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgEgHIAHgIQAJALAMAAQAJAAAGgGQAFgFAAgKIAAgHQgJAJgMAAQgPAAgIgLQgJgLAAgTQAAgSAJgLQAIgLAPAAQAOAAAHAKIABgIIANAAIAABMQgBAPgIAJQgKAJgPAAQgIAAgIgEgAgOgkQgFAIAAAPQAAANAFAHQAGAIAJAAQANAAAGgMIAAgjQgHgLgMAAQgIAAgHAHg");
	this.shape_274.setTransform(227.3,88.475);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#FFFFFF").s().p("AASAoIAAgzQAAgJgFgEQgDgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIANAAIAAAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_275.setTransform(219.1,86.925);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#FFFFFF").s().p("AgYAhQgGgIAAgOIAAgyIANAAIAAAyQAAASAPAAQAOAAAGgMIAAg4IANAAIAABOIgNAAIAAgIQgIAJgOAAQgNAAgHgHg");
	this.shape_276.setTransform(210.825,87.075);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_277.setTransform(203.425,85.325);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#FFFFFF").s().p("AgQA0QgIgDgFgHIAIgIQAJALAMAAQAJAAAFgGQAGgFAAgKIAAgHQgJAJgNAAQgNAAgJgLQgJgLABgTQgBgSAJgLQAJgLAOAAQANAAAJAKIAAgIIAMAAIAABMQABAPgKAJQgJAJgPAAQgHAAgJgEgAgNgkQgGAIAAAPQAAANAGAHQAFAIAJAAQANAAAGgMIAAgjQgGgLgNAAQgJAAgFAHg");
	this.shape_278.setTransform(194.75,88.475);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#FFFFFF").s().p("AARAoIAAgzQAAgJgDgEQgEgEgJAAQgFAAgFAEQgFADgDAGIAAA3IgNAAIAAhOIAMAAIABAKQAJgLAOAAQAZAAAAAcIAAAzg");
	this.shape_279.setTransform(186.55,86.925);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEABQgDgBgCgCg");
	this.shape_280.setTransform(180.6,85.55);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#FFFFFF").s().p("AgfA1IAAhpIAOAAIAABeIAxAAIAAALg");
	this.shape_281.setTransform(175.175,85.625);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#FFFFFF").s().p("AABASIAAgJQAAgHAEgHQAEgHAFgFIAIAGQgHAJAAAKIAAAKgAgVASIAAgJQAAgHAEgHQADgHAGgFIAIAGQgHAJAAAKIAAAKg");
	this.shape_282.setTransform(168.325,81.325);

	this.instance_2 = new lib.bg10();
	this.instance_2.setTransform(471,324.2,1.1987,1.1979,0,0,0,0,0.1);
	this.instance_2.alpha = 0.1992;

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.bf(img.Bitmap2, null, new cjs.Matrix2D(1,0,0,1,-499,-300)).s().p("EhN9Au4MAAAhdvMCb7AAAMAAABdvg");
	this.shape_283.setTransform(471,266.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_283},{t:this.instance_2},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.btnNextDasar1},{t:this.btnMenuDasar1},{t:this.btnBack3},{t:this.judulKI_1},{t:this.Score},{t:this.slots},{t:this.pieces},{t:this.judulKI},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.btnAnim1},{t:this.restart},{t:this.btnInfo}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(452,236.2,518,430.40000000000003);
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
		{src:"images/_2e.png", id:"_2e"},
		{src:"images/_6e.png", id:"_6e"},
		{src:"images/Bitmap3.png", id:"Bitmap3"},
		{src:"images/_5e.png", id:"_5e"},
		{src:"images/_3e.png", id:"_3e"},
		{src:"images/Bitmap86.png", id:"Bitmap86"},
		{src:"images/bookpngcopy.png", id:"bookpngcopy"},
		{src:"images/flash0aiAssets.png", id:"flash0aiAssets"},
		{src:"images/Bitmap2.png", id:"Bitmap2"},
		{src:"images/flash0aiAssets_1.png", id:"flash0aiAssets_1"},
		{src:"images/flash0aiAssets_2.png", id:"flash0aiAssets_2"},
		{src:"images/flash0aiAssets_3.png", id:"flash0aiAssets_3"},
		{src:"images/Bitmap85.png", id:"Bitmap85"},
		{src:"images/flash0aiAssets_4.png", id:"flash0aiAssets_4"},
		{src:"images/_4e.png", id:"_4e"},
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