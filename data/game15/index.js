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
p.nominalBounds = new cjs.Rectangle(0,0,676,493);


(lib._16 = function() {
	this.initialize(img._16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,320,292);


(lib._13 = function() {
	this.initialize(img._13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,776,488);


(lib._26 = function() {
	this.initialize(img._26);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,624,375);


(lib.Bitmap133 = function() {
	this.initialize(img.Bitmap133);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,196,167);


(lib.Bitmap134 = function() {
	this.initialize(img.Bitmap134);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,233,123);


(lib.Bitmap135 = function() {
	this.initialize(img.Bitmap135);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,199,123);


(lib.Bitmap136 = function() {
	this.initialize(img.Bitmap136);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,191,123);


(lib.Bitmap130 = function() {
	this.initialize(img.Bitmap130);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,263,167);


(lib.Bitmap3 = function() {
	this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,249,87);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);


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


(lib.flash0aiAssets_3 = function() {
	this.initialize(img.flash0aiAssets_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,258);


(lib.bookpngcopy = function() {
	this.initialize(img.bookpngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,399);


(lib.Bitmap102copy = function() {
	this.initialize(img.Bitmap102copy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,233,124);// helper functions:

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


(lib.Tween8copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3498DB").s().p("EhB5AkpMAAAhJRMCDzAAAMAAABJRg");

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


(lib.targetcopy = function(mode,startPosition,loop) {
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

}).prototype = getMCSymbolPrototype(lib.targetcopy, new cjs.Rectangle(-69.7,-25.2,137.7,47.8), null);


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
	this.instance = new lib.Bitmap133();
	this.instance.setTransform(-50.45,-37.5,0.5151,0.4491);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g3, new cjs.Rectangle(-50.4,-37.5,100.9,75), null);


(lib.g2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._26();
	this.instance.setTransform(-50.45,-37.5,0.1618,0.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g2, new cjs.Rectangle(-50.4,-37.5,100.9,75), null);


(lib.g1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap130();
	this.instance.setTransform(-50.45,-37.5,0.3838,0.4491);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g1, new cjs.Rectangle(-50.4,-37.5,100.9,75), null);


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



(lib.Tween10copy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Eg/RAu4MAAAhdvMB+jAAAMAAABdvg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-405,-300,810,600);


(lib.Tween10copy2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Eg/RAu4MAAAhdvMB+jAAAMAAABdvg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-405,-300,810,600);


(lib.Tween10copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Eg/RAu4MAAAhdvMB+jAAAMAAABdvg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-405,-300,810,600);


(lib.Tween10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Eg/RAu4MAAAhdvMB+jAAAMAAABdvg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-405,-300,810,600);


(lib.Tween8copy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#603AD8").s().p("EhB5AkqMAAAhJSMCDzAAAMAAABJSg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-421.8,-234.5,843.6,469.1);


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


(lib.Tween8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3498DB").s().p("EhB5AkpMAAAhJRMCDzAAAMAAABJRg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-421.8,-234.5,843.6,469.1);


(lib.Tween7copy4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#603AD8").s().p("EhB5AkpMAAAhJRMCDzAAAMAAABJRg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-421.8,-234.5,843.6,469.1);


(lib.Tween7copy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3498DB").s().p("EhB5AkpMAAAhJRMCDzAAAMAAABJRg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

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
	this.shape_1.graphics.f("#603AD8").s().p("EhB5AkpMAAAhJRMCDzAAAMAAABJRg");

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

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


(lib.targetcopy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgKAbIAAg1IAVAAIAAA1g");
	this.shape.setTransform(22.5,-1.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgKAaIAAglIAUAAIAAAlgAgIgTQgBAAgBAAQAAgBgBAAQAAAAAAgBQgBAAAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQABAAABAAIAIgBIAJABQABAAABAAQAAABABAAQAAAAAAABQAAAAAAABQAAAAAAAAQAAABAAAAQgBAAAAABQgBAAgBAAIgJABIgIgBg");
	this.shape_1.setTransform(16.85,-1.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgYASQgLgBgGgDQgHgDAAgEIAVAAQABAEAIACQAHACAMAAQAMAAAHgCQAIgBAAgDQAAgDgHgBQgGgCgPgBIgZgCQgKgBgEgCQgFgCAAgDQAAgEANgEQANgDATAAQAVAAANADQAMAEAAAFIgVAAQAAgDgHgCQgHgCgLAAQgLAAgGACQgHACAAACQAAADAGABIAVACIAZACQAKABAFACQAFACAAAEQAAAFgOADQgNADgVAAQgNAAgMgCg");
	this.shape_2.setTransform(7.975,-0.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgmARQgMgDABgFQAAgGAOgDQAOgDAaAAIAUAAIAAgDQAAgEgGgCQgHgCgMAAQgLAAgIACQgHACAAACIgVAAQAAgCAHgDQAGgDALgBQALgCAMAAQAWAAAMADQAMAEAAAGIAAAQQAAAGAFADIAAAAIgXAAIgDgEQgOAFgTAAQgTAAgLgDgAgcAIQAAADAGABQAHACAKAAQAJAAAJgBQAIgCAEgDIAAgHIgQAAQglAAAAAHg");
	this.shape_3.setTransform(-4.35,-0.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAqAaIAAgYIhSAAIAAAYIgXAAIAAgzIAXAAIAAAXIBSAAIAAgXIAVAAIAAAzg");
	this.shape_4.setTransform(-19,-1.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFFFFF").ss(2,1,1).p("AqmjkIVNAAIAAHJI1NAAg");
	this.shape_5.setTransform(-0.85,-1.3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#C0392B").s().p("AqlDlIAAnJIVLAAIAAHJg");
	this.shape_6.setTransform(-0.85,-1.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.targetcopy3, new cjs.Rectangle(-69.7,-25.2,137.7,47.8), null);


(lib.targetcopy2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgIAdIAAgqIAQAAIAAAqgAgGgVQgBAAAAAAQgBgBAAAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQABAAAAAAQAAgBABAAQAAAAABgBIAGgBIAHABQABABAAAAQABAAAAABQAAAAABAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAIgHABIgGgBg");
	this.shape.setTransform(47.425,-1.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAWAWIAAgbQAAgFgFgCQgFgCgKAAQgHAAgGACQgGABgEADIAAAeIgRAAIAAgqIAQAAIABAGQALgHARABQAfgBABAQIAAAbg");
	this.shape_1.setTransform(40.075,-0.65);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgIAdIAAgqIAQAAIAAAqgAgGgVQgBAAAAAAQgBgBAAAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQABAAAAAAQAAgBABAAQAAAAABgBIAGgBIAHABQABABAAAAQABAAAAABQAAAAABAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAIgHABIgGgBg");
	this.shape_2.setTransform(32.675,-1.375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgSAUQgKgCgFgDQgFgEAAgDIARAAQABADAFADQAHACAJAAQAKAAAGgCQAFgBAAgDQAAgDgEgCQgGgCgMgBQgMgBgIgBQgIgBgDgDQgDgCAAgCQgBgGAKgDQALgEAPAAQARAAAKAEQAKAEAAAFIgRAAQAAgDgFgCQgHgCgIAAQgIAAgGABQgEACAAADQgBACAFACQAFABALABIAVADQAHABAFACQADADAAAEQAAAFgKAEQgLADgRAAQgLAAgIgCg");
	this.shape_3.setTransform(25.5,-0.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgcAQQgNgFAAgKIAAgBQAAgGAGgEQAFgGAKgCQAKgDALAAQATAAALAFQALAGAAAKIAAACIhCAAQAAAGAJAEQAIAEALAAQAJAAAGgCQAGgBAFgDIAKADQgMAJgZAAQgTAAgMgGgAgPgMQgHADgBAGIAwAAIAAgBQgBgFgGgDQgGgDgLAAQgJAAgHADg");
	this.shape_4.setTransform(15.875,-0.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAVAeIghgUIgLAFIAAAPIgQAAIAAg7IAQAAIAAAkIAJgGIAegNIAUAAIglARIAqAZg");
	this.shape_5.setTransform(6.8,-1.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgXAWIAAgqIARAAIAAAFQAHgFAPAAIAIAAIAAAHIgIAAQgQAAgGAFIAAAeg");
	this.shape_6.setTransform(-5.825,-0.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgcAQQgNgFAAgKIAAgBQAAgGAGgEQAFgGAKgCQAKgDALAAQATAAALAFQALAGAAAKIAAACIhCAAQAAAGAJAEQAIAEALAAQAJAAAGgCQAGgBAFgDIAKADQgMAJgZAAQgTAAgMgGgAgPgMQgHADgBAGIAwAAIAAgBQgBgFgGgDQgGgDgLAAQgJAAgHADg");
	this.shape_7.setTransform(-14.325,-0.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgSAUQgJgCgGgDQgFgEAAgDIARAAQABADAFADQAHACAJAAQAKAAAGgCQAFgBABgDQgBgDgFgCQgFgCgMgBQgMgBgIgBQgHgBgEgDQgDgCgBgCQAAgGAKgDQALgEAPAAQAQAAALAEQAKAEAAAFIgRAAQAAgDgFgCQgHgCgIAAQgJAAgEABQgGACAAADQABACAEACQAFABALABIAVADQAIABADACQAEADAAAEQAAAFgLAEQgKADgRAAQgKAAgJgCg");
	this.shape_8.setTransform(-24.25,-0.6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgcAQQgNgFAAgKIAAgBQAAgGAGgEQAFgGAKgCQAKgDALAAQATAAALAFQALAGAAAKIAAACIhCAAQAAAGAJAEQAIAEALAAQAJAAAGgCQAGgBAFgDIAKADQgMAJgZAAQgTAAgMgGgAgPgMQgHADgBAGIAwAAIAAgBQgBgFgGgDQgGgDgLAAQgJAAgHADg");
	this.shape_9.setTransform(-33.825,-0.6);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgXAaQgNgDgHgHQgHgGAAgHIAAgEQAAgNAOgHQAOgHAYAAQAVAAANAEQAMAFADAIIgSAAQgEgLgaAAQgRAAgJAFQgJAFAAAKIAAAEQAAAKAKAFQAKAGAQAAIARgBQAIgBAEgCIAAgNIgeAAIAAgGIAwAAIAAAVQgHAEgMACQgMACgQAAQgPAAgMgDg");
	this.shape_10.setTransform(-45.35,-1.325);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#FFFFFF").ss(2,1,1).p("AqmjkIVNAAIAAHJI1NAAg");
	this.shape_11.setTransform(-0.85,-1.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#27AE60").s().p("AqlDlIAAnJIVLAAIAAHJg");
	this.shape_12.setTransform(-0.85,-1.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.targetcopy2, new cjs.Rectangle(-69.7,-25.2,137.7,47.8), null);


(lib.targetcopy_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgKAbIAAg1IAVAAIAAA1g");
	this.shape_7.setTransform(22.5,-1.525);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgKAaIAAglIAUAAIAAAlgAgIgTQgBAAgBAAQAAgBgBAAQAAAAAAgBQgBAAAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQABAAABAAIAIgBIAJABQABAAABAAQAAABABAAQAAAAAAABQAAAAAAABQAAAAAAAAQAAABAAAAQgBAAAAABQgBAAgBAAIgJABIgIgBg");
	this.shape_8.setTransform(16.85,-1.425);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgYASQgLgBgGgDQgHgDAAgEIAVAAQABAEAIACQAHACAMAAQAMAAAHgCQAIgBAAgDQAAgDgHgBQgGgCgPgBIgZgCQgKgBgEgCQgFgCAAgDQAAgEANgEQANgDATAAQAVAAANADQAMAEAAAFIgVAAQAAgDgHgCQgHgCgLAAQgLAAgGACQgHACAAACQAAADAGABIAVACIAZACQAKABAFACQAFACAAAEQAAAFgOADQgNADgVAAQgNAAgMgCg");
	this.shape_9.setTransform(7.975,-0.725);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgmARQgMgDABgFQAAgGAOgDQAOgDAaAAIAUAAIAAgDQAAgEgGgCQgHgCgMAAQgLAAgIACQgHACAAACIgVAAQAAgCAHgDQAGgDALgBQALgCAMAAQAWAAAMADQAMAEAAAGIAAAQQAAAGAFADIAAAAIgXAAIgDgEQgOAFgTAAQgTAAgLgDgAgcAIQAAADAGABQAHACAKAAQAJAAAJgBQAIgCAEgDIAAgHIgQAAQglAAAAAHg");
	this.shape_10.setTransform(-4.35,-0.725);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAqAaIAAgYIhSAAIAAAYIgXAAIAAgzIAXAAIAAAXIBSAAIAAgXIAVAAIAAAzg");
	this.shape_11.setTransform(-19,-1.4);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#FFFFFF").ss(2,1,1).p("AqmjkIVNAAIAAHJI1NAAg");
	this.shape_12.setTransform(-0.85,-1.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#C0392B").s().p("AqlDlIAAnJIVLAAIAAHJg");
	this.shape_13.setTransform(-0.85,-1.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.targetcopy_1, new cjs.Rectangle(-69.7,-25.2,137.7,47.8), null);


(lib.RestoreIcon_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAEC/IgEgDIgBgFIgDgyIABgFIADgEIAFgCIAZgBQAtgDAhghQAkgjAAgyQAAgygkgkIgCgCQgggfgsgDIAAAAIgIAAQgxAAgkAkIAAABIgGAGIAvANQAEABACADQACAEgBAEQgBAEgEACIhwBAQgEACgEgBQgEgBgCgEIhBhwQgCgDABgEQABgEAEgCQADgCAEABIA6APQAMgTASgRIAAAAQA3g4BPgBIAKAAIABAAIABAAQBIAFA0A0QA4A4AABPQAABPg4A3IgBABQgzA0hIAEIgZABIgBABIgEgCgACgCAIAAABIABgCg");
	this.shape_1.setTransform(-0.006,0.0014);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21.3,-19.2,42.7,38.5);


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


(lib.Pathcopy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#606163").s().p("Ap/z/QEEAADvBlQDkBhCxCyQCxCwBiDmQBkDtAAEEQAAEEhkDuQhiDmixCxQixCxjkBhQjvBkkEAAg");
	this.shape.setTransform(64,127.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pathcopy3, new cjs.Rectangle(0,0,128,255.9), null);


(lib.Pathcopy2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#606163").s().p("Ap/z/QEEAADvBlQDkBhCxCyQCxCwBiDmQBkDtAAEEQAAEEhkDuQhiDmixCxQixCxjkBhQjvBkkEAAg");
	this.shape.setTransform(64,127.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pathcopy2, new cjs.Rectangle(0,0,128,255.9), null);


(lib.Pathcopy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#606163").s().p("Ap/z/QEEAADvBlQDkBhCxCyQCxCwBiDmQBkDtAAEEQAAEEhkDuQhiDmixCxQixCxjkBhQjvBkkEAAg");
	this.shape.setTransform(64,127.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pathcopy, new cjs.Rectangle(0,0,128,255.9), null);


(lib.Path = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#606163").s().p("Ap/z/QEEAADvBlQDkBhCxCyQCxCwBiDmQBkDtAAEEQAAEEhkDuQhiDmixCxQixCxjkBhQjvBkkEAAg");
	this.shape.setTransform(64,127.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,128,255.9), null);


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


(lib.drop12G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgKBEIAAiGIAUAAIAACGg");
	this.shape.setTransform(137.4,84.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_1.setTransform(130.225,86.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAUAAIABALQAGgMAPAAQAEgBADACIgBAUIgIgBQgOAAgFALIAABBg");
	this.shape_2.setTransform(122.6,86.65);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgfAkQgMgNAAgXIAAAAQAAgOAFgLQAGgMAKgFQAKgHAMABQATAAAMAMQAMANABAUIAAAEQAAAOgFALQgGALgKAGQgKAGgNABQgTAAgMgOgAgQgXQgGAJAAAPQAAAOAGAJQAGAIAKAAQALAAAGgIQAGgJAAgPQAAgOgGgJQgHgIgKAAQgKAAgGAIg");
	this.shape_3.setTransform(113.925,86.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABDIgWAAIAAhfIAVAAIABALQAKgNAQABQAegBAAAjIAAA+g");
	this.shape_4.setTransform(99.3,86.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_5.setTransform(89.425,86.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAVAAIAABfgAgIgtQgDgDAAgGQAAgEADgEQADgDAFAAQAGAAADADQADAEAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_6.setTransform(82.25,84.95);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgUA/QgLgFgEgHIAJgMQALALAOAAQAJAAAHgFQAFgGAAgLIAAgHQgIALgPAAQgQAAgLgOQgLgNAAgXQAAgWAKgNQALgNASAAQAOAAAKALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgKAAgKgEgAgOgoQgFAIAAAQQAAAPAFAHQAGAIAJAAQAOAAAFgLIAAgpQgFgLgOAAQgJAAgGAJg");
	this.shape_7.setTransform(74.65,88.525);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_8.setTransform(64.875,86.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgUA4IgCALIgTAAIAAiGIAWAAIAAAwQAJgLAOABQASgBAKANQAKAOAAAVIAAACQAAAWgKANQgKAOgRAAQgQAAgJgNgAgTAAIAAAnQAFAMAOAAQAJAAAGgIQAFgHAAgPIAAgDQAAgPgFgHQgGgIgJAAQgOAAgFAMg");
	this.shape_9.setTransform(55.125,84.85);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgDAAgGQAAgEADgEQADgDAFAAQAGAAADADQADAEAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_10.setTransform(47.55,84.95);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgVAKgNQALgNARAAQAOAAAJAKIAAgwIAWAAIAACGIgUAAIgBgKQgJALgPABQgRAAgKgOgAgOgDQgFAGAAARQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAJg");
	this.shape_11.setTransform(39.975,84.85);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgKBDIAAiGIAVAAIAACGg");
	this.shape_12.setTransform(224.45,59.15);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAOIAAArQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_13.setTransform(217.275,61.15);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAUAAIABAKQAHgNAOAAQAEAAADACIAAAUIgJgBQgPAAgDALIAABAg");
	this.shape_14.setTransform(209.65,61.05);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAKIAAAeIgWAAIAAiGIAWAAIAABOIAGgJIAagcIAZAAIgjAmIAnA3g");
	this.shape_15.setTransform(201.925,59.15);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAOIAAArQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_16.setTransform(191.775,61.15);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgKBDIAAiGIAVAAIAACGg");
	this.shape_17.setTransform(184.6,59.15);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgMIAAhCIAVAAIAABdIgUAAIAAgJQgKAMgQgBQgPABgIgKg");
	this.shape_18.setTransform(177.275,61.25);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgUA4IgCAKIgTAAIAAiGIAWAAIAAAyQAJgMAOAAQASAAAKAOQAKAMAAAXIAAABQAAAWgKANQgKANgRAAQgQAAgJgMgAgTAAIAAAmQAFANAOAAQAJAAAGgHQAFgIAAgPIAAgDQAAgQgFgGQgGgIgJAAQgOAAgFAMg");
	this.shape_19.setTransform(167.425,59.25);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgEQgEgFgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgNASAAQASAAAHAPQAKgPATAAQAQABAIAIQAHAJAAARIAAA9g");
	this.shape_20.setTransform(154.325,61.05);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAOIAAArQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_21.setTransform(141.625,61.15);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_22.setTransform(65.95,59.35);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAKIAAAeIgWAAIAAiGIAWAAIAABOIAGgJIAagcIAZAAIgjAmIAnA3g");
	this.shape_23.setTransform(59.525,59.15);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAOIAAArQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAIQAAAGAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_24.setTransform(49.375,61.15);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAKIAAAeIgWAAIAAiGIAWAAIAABOIAGgJIAagcIAZAAIgjAmIAnA3g");
	this.shape_25.setTransform(40.375,59.15);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AghBFIAyiJIARAAIgyCJg");
	this.shape_26.setTransform(222.975,34.45);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgVA/QgKgFgEgHIAKgMQAJALAPAAQAKAAAFgFQAHgGAAgLIAAgHQgKALgOAAQgRAAgKgOQgLgNAAgXQAAgWAKgNQALgNARAAQAPAAAKALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgKgEgAgOgoQgFAIgBAQQABAPAFAHQAGAIAKAAQAMAAAHgLIAAgpQgHgLgMAAQgKAAgGAJg");
	this.shape_27.setTransform(214.3,37.325);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABDIgWAAIAAhfIAVAAIABALQAKgNAQABQAegBAAAjIAAA+g");
	this.shape_28.setTransform(204.4,35.45);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKAMgQAAQgPAAgIgKg");
	this.shape_29.setTransform(194.375,35.65);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgUA4IgCALIgTAAIAAiGIAWAAIAAAwQAJgLAOABQASgBAKANQAKAOAAAVIAAACQAAAWgKANQgKAOgRAAQgQgBgJgMgAgTAAIAAAnQAFAMAOAAQAJAAAGgIQAFgHAAgPIAAgDQAAgPgFgHQgGgIgJAAQgOAAgFAMg");
	this.shape_30.setTransform(184.525,33.65);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNAAQgPgBgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_31.setTransform(174.375,35.55);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAFACACQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgcg");
	this.shape_32.setTransform(166.275,34.5);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAVAAIAABfgAgIgtQgDgDAAgGQAAgEADgDQADgEAFAAQAGAAADAEQADADAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_33.setTransform(147.95,33.75);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AARBEIgbgqIgJAKIAAAgIgWAAIAAiGIAWAAIAABMIAGgIIAagdIAZAAIgjAnIAnA4g");
	this.shape_34.setTransform(141.525,33.55);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNAAQgPgBgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_35.setTransform(131.375,35.55);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AARBEIgbgqIgJAKIAAAgIgWAAIAAiGIAWAAIAABMIAGgIIAagdIAZAAIgjAnIAnA4g");
	this.shape_36.setTransform(122.375,33.55);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgDAAgGQAAgEADgDQADgEAFAAQAGAAADAEQADADAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_37.setTransform(101.55,33.75);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AARBEIgbgqIgJAKIAAAgIgWAAIAAiGIAWAAIAABMIAGgIIAagdIAZAAIgjAnIAnA4g");
	this.shape_38.setTransform(95.125,33.55);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAUAAIAABfgAgIgtQgDgDAAgGQAAgEADgDQADgEAFAAQAGAAADAEQADADAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_39.setTransform(87.55,33.75);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgJBEIAAiGIATAAIAACGg");
	this.shape_40.setTransform(82.95,33.55);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgDAAgGQAAgEADgDQADgEAFAAQAGAAADAEQADADAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_41.setTransform(78.35,33.75);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AAuAxIAAg9QAAgJgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAHIAABAIgVAAIAAg+QAAgRgRAAQgNAAgFAKIAABFIgVAAIAAhfIAUAAIAAAKQAKgMASABQASgBAHAPQAKgPATABQAQgBAIAJQAHAJAAARIAAA+g");
	this.shape_42.setTransform(68.225,35.45);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALAAQAUAAAKAMQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUAAgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_43.setTransform(55.675,35.55);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AAuAxIAAg9QAAgJgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAHIAABAIgVAAIAAg+QAAgRgRAAQgNAAgFAKIAABFIgVAAIAAhfIAUAAIAAAKQAKgMASABQASgBAHAPQAKgPATABQAQgBAIAJQAHAJAAARIAAA+g");
	this.shape_44.setTransform(42.925,35.45);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKAAQARgBAKAJQAKAJAAAOIAAArQAAAMAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_45.setTransform(221.875,9.95);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgiBBIAAgRIAEABQAIAAAEgDQAEgDADgHIADgIIgiheIAXAAIATBBIAUhBIAXAAIgmBtQgIAYgVAAIgKgCg");
	this.shape_46.setTransform(212.625,11.875);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABCIgWAAIAAhdIAVAAIABAKQAKgMAQAAQAeAAAAAhIAAA+g");
	this.shape_47.setTransform(203.25,9.85);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKAAQARgBAKAJQAKAJAAAOIAAArQAAAMAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_48.setTransform(193.375,9.95);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AASBDIAAg9QAAgJgEgEQgEgEgJAAQgMAAgGALIAABDIgVAAIAAiGIAVAAIAAAzQALgMAOAAQAfAAABAhIAAA+g");
	this.shape_49.setTransform(183.5,7.95);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_50.setTransform(141.9,8.15);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABCIgVAAIAAhdIAUAAIAAAKQALgMAQAAQAeAAAAAhIAAA+g");
	this.shape_51.setTransform(134.6,9.85);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_52.setTransform(127.3,8.15);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABCIgWAAIAAhdIAVAAIABAKQAKgMAQAAQAeAAAAAhIAAA+g");
	this.shape_53.setTransform(85.7,9.85);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKAAQARgBAKAJQAKAJAAAOIAAArQAAAMAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_54.setTransform(75.825,9.95);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AAUAvIgUhAIgTBAIgSAAIgahdIAVAAIAPA/IAUg/IAPAAIAUBAIAPhAIAVAAIgaBdg");
	this.shape_55.setTransform(64.225,9.95);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALABQAUAAAKAMQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_56.setTransform(52.825,9.95);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AAdBAIAAg5Ig5AAIAAA5IgWAAIAAh/IAWAAIAAA2IA5AAIAAg2IAWAAIAAB/g");
	this.shape_57.setTransform(41.475,8.3);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.019,0,0,1.873,-126.8,-81.7)).s().p("Az0MvIAA5dMAnpAAAIAAZdg");
	this.shape_58.setTransform(131.6,54.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("rgba(0,0,0,0.227)").s().p("AxYIAIAAv/MAixAAAIAAP/g");
	this.shape_59.setTransform(116.025,64.775);

	this.timeline.addTween(cjs.Tween.get(this.shape_59).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop12G5, new cjs.Rectangle(4.7,-26.7,253.8,162.89999999999998), null);


(lib.drop12G4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgHQAMgHAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgHQgLAMgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape.setTransform(237.975,57.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgiBBIAAgRIAEABQAIAAAEgDQAEgDADgHIADgIIgiheIAXAAIATBBIAUhBIAXAAIgmBtQgIAYgVAAIgKgCg");
	this.shape_1.setTransform(228.725,59.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgLAAgHAMIAABCIgWAAIAAheIAVAAIABAMQAKgNAQgBQAeAAAAAiIAAA+g");
	this.shape_2.setTransform(219.35,57.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgUA/QgKgFgGgHIAKgMQAKALAPAAQAJAAAHgFQAFgGABgLIAAgHQgKALgOAAQgRAAgKgOQgLgNAAgXQAAgWALgNQAKgNASAAQAPAAAJALIABgJIATAAIAABbQAAATgLAKQgMALgTAAQgKAAgKgEgAgNgoQgHAIAAAQQAAAPAHAHQAFAIAJAAQANAAAHgLIAAgpQgHgLgNAAQgJAAgFAJg");
	this.shape_3.setTransform(209.05,59.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABCIgVAAIAAheIAUAAIAAAMQALgNAQgBQAeAAABAiIAAA+g");
	this.shape_4.setTransform(199.15,57.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgHQAMgHAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgHQgLAMgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_5.setTransform(189.275,57.8);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgTBTIAAgRIAHABQALAAAAgMIAAhnIAUAAIAABnQAAAOgHAIQgHAIgNAAIgLgCgAAAhAQgDgEAAgFQAAgEADgEQADgDAFAAQAGAAADADQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_6.setTransform(181.275,57.925);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgLAAgHAMIAABCIgWAAIAAheIAVAAIABAMQAKgNAQgBQAeAAAAAiIAAA+g");
	this.shape_7.setTransform(174.9,57.7);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgHQAMgHAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgHQgLAMgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_8.setTransform(165.025,57.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgoBDIAAiDIATAAIABAKQAJgMAPAAQASAAAKANQAJANAAAXIAAACQABAVgLANQgKANgQAAQgPAAgJgKIAAAtgAgTglIAAApQAFALANAAQAKAAAFgIQAHgHAAgRQgBgOgFgJQgGgIgKAAQgNAAgFALg");
	this.shape_9.setTransform(155.25,59.525);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgKBBIAAheIAVAAIAABegAgIgtQgDgDAAgFQAAgFADgDQADgDAFgBQAGABADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_10.setTransform(143.2,56);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgYAwIAAheIAUAAIABALQAGgNAOAAQAFABADABIgBAUIgIgBQgPAAgEAMIAAA/g");
	this.shape_11.setTransform(138.15,57.7);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgMIAAhDIAVAAIAABeIgUAAIAAgJQgKALgQAAQgPAAgIgJg");
	this.shape_12.setTransform(129.525,57.9);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgUAKgOQALgOARAAQAOAAAJALIAAgxIAWAAIAACGIgUAAIgBgJQgJAMgPgBQgRAAgKgNgAgOgEQgFAIAAAQQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAIg");
	this.shape_13.setTransform(119.275,55.9);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgWAJIAAgRIAtAAIAAARg");
	this.shape_14.setTransform(111.425,57.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgKBBIAAheIAVAAIAABegAgIgtQgDgDAAgFQAAgFADgDQADgDAFgBQAGABADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_15.setTransform(106.2,56);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgYAwIAAheIAVAAIAAALQAGgNAOAAQAFABADABIgBAUIgIgBQgPAAgEAMIAAA/g");
	this.shape_16.setTransform(101.15,57.7);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgMIAAhDIAVAAIAABeIgUAAIAAgJQgKALgQAAQgPAAgIgJg");
	this.shape_17.setTransform(92.525,57.9);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgUAKgOQALgOARAAQAOAAAJALIAAgxIAWAAIAACGIgUAAIgBgJQgJAMgPgBQgRAAgKgNgAgOgEQgFAIAAAQQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAIg");
	this.shape_18.setTransform(82.275,55.9);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgHQAMgHAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgHQgLAMgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_19.setTransform(68.025,57.8);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgYAwIAAheIAUAAIABALQAGgNAPAAQAEABADABIgBAUIgIgBQgOAAgFAMIAAA/g");
	this.shape_20.setTransform(60.4,57.7);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgHQAMgHAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgHQgLAMgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_21.setTransform(51.925,57.8);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgKAhIAAg1IgQAAIAAgQIAQAAIAAgXIAUAAIAAAXIARAAIAAAQIgRAAIAAA0QAAAGACABQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgbg");
	this.shape_22.setTransform(43.825,56.75);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABCIgVAAIAAheIAUAAIABAMQAKgNAQgBQAeAAAAAiIAAA+g");
	this.shape_23.setTransform(36.05,57.7);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgHQAMgHAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgHQgLAMgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_24.setTransform(26.175,57.8);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgKBBIAAheIAVAAIAABegAgIgtQgDgDAAgFQAAgFADgDQADgDAFgBQAGABADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_25.setTransform(19,56);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgUAKgOQALgOARAAQAOAAAJALIAAgxIAWAAIAACGIgUAAIgBgJQgJAMgPgBQgRAAgKgNgAgOgEQgFAIAAAQQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAIg");
	this.shape_26.setTransform(11.425,55.9);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgHQAMgJAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAJAAAOIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_27.setTransform(244.175,32.2);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgJBCIAAhfIAUAAIAABfgAgIgtQgDgEAAgFQAAgEADgEQADgDAFABQAGgBADADQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_28.setTransform(237,30.4);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAUAAIABALQAGgMAPAAQAEgBADACIgBAUIgIgBQgOAAgFALIAABBg");
	this.shape_29.setTransform(231.95,32.1);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgHQAMgJAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAJAAAOIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_30.setTransform(223.475,32.2);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgJBEIAAiGIATAAIAACGg");
	this.shape_31.setTransform(216.3,30.2);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgJBEIAAiGIAUAAIAACGg");
	this.shape_32.setTransform(211.7,30.2);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgNAGgMQAFgLAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_33.setTransform(204.675,32.2);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgcAkQgMgNAAgXIAAgBQAAgWAMgNQALgNATABQARgBALALQAKAKABAQIgUAAQAAgJgFgFQgGgFgIAAQgKAAgFAIQgGAHABAPIAAACQgBAQAGAHQAFAIAKAAQAIAAAGgFQAFgEAAgHIAUAAQgBAJgEAIQgGAHgJAFQgIAEgLABQgTgBgLgNg");
	this.shape_34.setTransform(195.15,32.2);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgEAAgFQAAgEADgEQADgDAFABQAGgBADADQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_35.setTransform(188.05,30.4);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgeA3QgLgOAAgXQAAgVAKgNQALgNARAAQAOAAAJAKIAAgwIAWAAIAACGIgUAAIgBgLQgJAMgPABQgRAAgKgOgAgOgDQgFAGAAARQAAAPAFAIQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAJg");
	this.shape_36.setTransform(180.475,30.3);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgNAGgMQAFgLAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_37.setTransform(170.875,32.2);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgpBDIAAiDIAUAAIABAKQAKgMAOAAQASAAAKANQAKANAAAXIAAACQAAAVgLANQgJANgRAAQgPAAgJgKIAAAtgAgTglIAAApQAGALANAAQAJAAAGgIQAFgHAAgRQABgOgGgJQgGgIgJAAQgNAAgGALg");
	this.shape_38.setTransform(161.05,33.925);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgJBCIAAhfIAUAAIAABfgAgIgtQgDgEAAgFQAAgEADgEQADgDAFABQAGgBADADQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_39.setTransform(141.05,30.4);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AARBEIgbgqIgJAKIAAAgIgWAAIAAiGIAWAAIAABMIAGgIIAagdIAZAAIgjAnIAnA4g");
	this.shape_40.setTransform(134.625,30.2);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgEAAgFQAAgEADgEQADgDAFABQAGgBADADQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_41.setTransform(127.05,30.4);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgJBEIAAiGIATAAIAACGg");
	this.shape_42.setTransform(122.45,30.2);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgEAAgFQAAgEADgEQADgDAFABQAGgBADADQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_43.setTransform(117.85,30.4);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AAuAxIAAg9QAAgJgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABBIgVAAIAAg+QAAgRgRAAQgNAAgFALIAABEIgVAAIAAhfIAUAAIAAAKQAKgMASABQASAAAHAOQAKgOATAAQAQgBAIAKQAHAIAAARIAAA+g");
	this.shape_44.setTransform(107.725,32.1);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgNAGgMQAFgLAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_45.setTransform(95.175,32.2);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AAuAxIAAg9QAAgJgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABBIgVAAIAAg+QAAgRgRAAQgNAAgFALIAABEIgVAAIAAhfIAUAAIAAAKQAKgMASABQASAAAHAOQAKgOATAAQAQgBAIAKQAHAIAAARIAAA+g");
	this.shape_46.setTransform(82.425,32.1);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgWAAIAAhfIAVAAIAAALQALgNAQABQAegBABAjIAAA+g");
	this.shape_47.setTransform(57.15,32.1);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgHQAMgJAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAJAAAOIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_48.setTransform(47.275,32.2);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AAUAwIgUhBIgTBBIgSAAIgahfIAVAAIAPBAIAUhAIAPAAIAUBBIAPhBIAVAAIgaBfg");
	this.shape_49.setTransform(35.675,32.2);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgNAGgMQAFgLAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_50.setTransform(24.275,32.2);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AAdBAIAAg5Ig5AAIAAA5IgWAAIAAh/IAWAAIAAA2IA5AAIAAg2IAWAAIAAB/g");
	this.shape_51.setTransform(12.925,30.55);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.165,0,0,1.218,-145,-53)).s().p("A2qISIAAwjMAtVAAAIAAQjg");
	this.shape_52.setTransform(130.85,48.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("rgba(0,0,0,0.227)").s().p("A0SFoIAArPMAolAAAIAALPg");
	this.shape_53.setTransform(117.075,57.625);

	this.timeline.addTween(cjs.Tween.get(this.shape_53).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop12G4, new cjs.Rectangle(-14.2,-4.4,290.2,106), null);


(lib.drop12G3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgJBEIAAiGIATAAIAACGg");
	this.shape.setTransform(106.8,83.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_1.setTransform(99.625,85.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAUAAIABALQAGgNAPAAQAEABADABIgBAUIgIgBQgOAAgFAMIAABAg");
	this.shape_2.setTransform(92,85.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgfAkQgMgNAAgXIAAAAQAAgOAFgLQAGgMAKgFQAKgHAMAAQATAAAMANQAMAMABAVIAAAEQAAAOgFALQgGALgKAGQgKAGgNAAQgTAAgMgNgAgQgXQgGAJAAAPQAAAOAGAJQAGAIAKAAQALAAAGgIQAGgJAAgPQAAgOgGgJQgHgIgKAAQgKAAgGAIg");
	this.shape_3.setTransform(83.325,85.15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgUA4IgCALIgTAAIAAiGIAWAAIAAAwQAJgKAOgBQASABAKANQAKANAAAWIAAABQAAAWgKANQgKANgRAAQgQAAgJgMgAgTAAIAAAnQAFAMAOAAQAJAAAGgIQAFgHAAgPIAAgDQAAgPgFgHQgGgIgJAAQgOAAgFAMg");
	this.shape_4.setTransform(73.325,83.25);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_5.setTransform(63.175,85.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_6.setTransform(48.925,85.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgVAKgNQALgOARAAQAOAAAJALIAAgwIAWAAIAACGIgUAAIgBgKQgJAMgPgBQgRAAgKgNgAgOgEQgFAIAAAQQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAIg");
	this.shape_7.setTransform(38.775,83.25);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_8.setTransform(29.025,85.15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgoBDIAAiDIATAAIABAKQAJgMAQAAQARAAAKANQAKANgBAXIAAACQABAVgKANQgKANgRAAQgPAAgJgKIAAAtgAgTglIAAApQAFALANAAQAKAAAFgIQAGgHABgRQAAgOgGgJQgGgIgKAAQgNAAgFALg");
	this.shape_9.setTransform(19.25,86.875);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgTAtQgJgEgGgHQgEgIAAgJIAVAAQAAAIAFAEQAGAEAHABQAIgBAFgDQAEgDAAgFQAAgGgEgDQgFgDgKgDQgLgCgHgDQgQgHAAgOQAAgNAKgIQAKgJAPABQARgBALAJQAKAJAAANIgVAAQAAgGgFgEQgEgFgIAAQgFAAgFAEQgFADAAAGQAAAEAFADQAEADAMADQAMADAHADQAHADAEAFQADAGAAAHQAAANgLAJQgKAHgRABQgLAAgJgFg");
	this.shape_10.setTransform(252.95,59.55);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgMIAAhCIAVAAIAABdIgUAAIAAgJQgKAMgQAAQgPAAgIgKg");
	this.shape_11.setTransform(243.325,59.65);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABCIgVAAIAAhdIAUAAIAAAKQALgMAQAAQAeAAABAhIAAA+g");
	this.shape_12.setTransform(233.35,59.45);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAAqQAAANAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_13.setTransform(223.475,59.55);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABCIgWAAIAAhdIAVAAIAAAKQALgMAQAAQAeAAABAhIAAA+g");
	this.shape_14.setTransform(206.55,59.45);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAAqQAAANAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_15.setTransform(196.675,59.55);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgeA3QgLgOAAgXQAAgUAKgOQALgNARAAQAOAAAJAKIAAgxIAWAAIAACGIgUAAIgBgKQgJANgPAAQgRAAgKgOgAgOgDQgFAHAAAQQAAAPAFAIQAGAIAJAAQANAAAGgMIAAgnQgGgMgNAAQgJAAgGAJg");
	this.shape_16.setTransform(186.525,57.65);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_17.setTransform(172.3,57.75);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgVA/QgKgFgFgHIALgMQAJALAPAAQAKAAAFgFQAHgGAAgLIAAgHQgKALgOAAQgRAAgKgOQgLgNAAgXQAAgWALgNQAKgNARAAQAQAAAJALIABgJIATAAIAABbQAAATgLAKQgMALgTAAQgKAAgLgEgAgNgoQgHAIAAAQQAAAPAHAHQAFAIAKAAQAMAAAHgLIAAgpQgHgLgMAAQgKAAgFAJg");
	this.shape_18.setTransform(164.7,61.325);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_19.setTransform(157.5,57.75);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgUA/QgLgFgEgHIAJgMQALALAOAAQAJAAAHgFQAFgGAAgLIAAgHQgIALgPAAQgQAAgLgOQgLgNAAgXQAAgWALgNQAKgNASAAQAOAAAKALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgJgEgAgOgoQgFAIAAAQQAAAPAFAHQAGAIAJAAQAOAAAFgLIAAgpQgFgLgOAAQgJAAgGAJg");
	this.shape_20.setTransform(149.9,61.325);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AASBDIAAg9QAAgJgFgEQgDgEgJAAQgLAAgHALIAABDIgWAAIAAiGIAWAAIAAAzQAKgMAQAAQAeAAAAAiIAAA9g");
	this.shape_21.setTransform(132.95,57.55);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAAqQAAANAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_22.setTransform(123.075,59.55);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgMIAAhCIAVAAIAABdIgUAAIAAgJQgKAMgQAAQgPAAgIgKg");
	this.shape_23.setTransform(113.175,59.65);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgUA4IgCAKIgTAAIAAiGIAWAAIAAAyQAJgLAOAAQASAAAKAMQAKANAAAWIAAACQAAAWgKANQgKAOgRAAQgQAAgJgNgAgTAAIAAAmQAFANAOAAQAJAAAGgHQAFgIAAgPIAAgDQAAgQgFgGQgGgIgJAAQgOAAgFAMg");
	this.shape_24.setTransform(103.325,57.65);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgcA3QgMgKgBgRIAVAAQABAKAFAFQAGAFAIgBQAKABAFgIQAFgGAAgNQAAgLgGgHQgGgGgJAAQgGAAgEACQgEABgFAEIgRgEIAHhAIBEAAIAAATIgyAAIgEAeQAJgFAKAAQATAAAKAMQAKAKAAAUQAAATgLAMQgMAMgTAAQgRAAgLgKg");
	this.shape_25.setTransform(86.125,58);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABCIgWAAIAAhdIAVAAIAAAKQALgMAQAAQAeAAABAhIAAA+g");
	this.shape_26.setTransform(68.75,59.45);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAAqQAAANAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_27.setTransform(58.875,59.55);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgVA/QgKgFgEgHIAKgMQAJALAPAAQAKAAAFgFQAHgGAAgLIAAgHQgKALgOAAQgRAAgKgOQgLgNAAgXQAAgWAKgNQALgNARAAQAPAAAKALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgKgEgAgOgoQgFAIgBAQQABAPAFAHQAGAIAKAAQAMAAAHgLIAAgpQgHgLgMAAQgKAAgGAJg");
	this.shape_28.setTransform(48.7,61.325);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABCIgWAAIAAhdIAVAAIABAKQAKgMAQAAQAeAAABAhIAAA+g");
	this.shape_29.setTransform(38.8,59.45);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgVIAAgCQAAgNAGgMQAFgLAKgGQAKgHALABQAUAAAKAMQALAMAAAXIAAAIIg9AAQABALAGAHQAHAHAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_30.setTransform(29.075,59.55);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgeA3QgLgOAAgXQAAgUAKgOQALgNARAAQAOAAAJAKIAAgxIAWAAIAACGIgUAAIgBgKQgJANgPAAQgRAAgKgOgAgOgDQgFAHAAAQQAAAPAFAIQAGAIAJAAQANAAAGgMIAAgnQgGgMgNAAQgJAAgGAJg");
	this.shape_31.setTransform(18.875,57.65);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgJBEIAAiHIAUAAIAACHg");
	this.shape_32.setTransform(255.35,31.95);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgHQAMgHAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAACIgWAAQgBgDgBgHQgLAMgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_33.setTransform(248.175,33.95);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAVAAIAAALQAHgNANAAQAFABADABIgBAUIgIgBQgPAAgDAMIAABAg");
	this.shape_34.setTransform(240.55,33.85);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgfAkQgMgNAAgXIAAAAQAAgOAFgLQAGgMAKgFQAKgHAMAAQATAAAMANQAMAMABAVIAAAEQAAAOgFALQgGALgKAGQgKAGgNAAQgTAAgMgNgAgQgXQgGAIAAAQQAAAOAGAJQAGAIAKAAQALAAAGgIQAGgJAAgPQAAgPgGgIQgHgIgKAAQgKAAgGAIg");
	this.shape_35.setTransform(231.875,33.95);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgEQgEgFgJAAQgLAAgHAMIAABDIgWAAIAAhfIAVAAIABAMQAKgNAQgBQAeAAAAAiIAAA/g");
	this.shape_36.setTransform(187.95,33.85);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgHQAMgHAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAACIgWAAQgBgDgBgHQgLAMgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_37.setTransform(178.075,33.95);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgHQAMgHAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAACIgWAAQgBgDgBgHQgLAMgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_38.setTransform(168.325,33.95);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AARBEIgbgqIgJALIAAAfIgWAAIAAiHIAWAAIAABOIAGgJIAagdIAZAAIgjAnIAnA4g");
	this.shape_39.setTransform(159.325,31.95);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKALgQAAQgPAAgIgJg");
	this.shape_40.setTransform(149.025,34.05);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AAuAxIAAg+QAAgJgEgDQgEgFgJAAQgHAAgFAEQgFAEgBAHIAABAIgVAAIAAg+QAAgRgRAAQgNAAgFAKIAABFIgVAAIAAhfIAUAAIAAALQAKgMASgBQASAAAHAPQAKgPATAAQAQABAIAIQAHAJAAARIAAA+g");
	this.shape_41.setTransform(136.225,33.85);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAUAAIABALQAHgNAOAAQAEABADABIgBAUIgIgBQgOAAgFAMIAABAg");
	this.shape_42.setTransform(125.65,33.85);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgVIAAgDQAAgNAGgLQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABAMAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_43.setTransform(117.325,33.95);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgpBDIAAiDIAUAAIABAKQAKgMAOAAQASAAAKANQAKANAAAXIAAACQAAAVgLANQgJANgRAAQgPAAgJgKIAAAtgAgTglIAAApQAGALANAAQAJAAAGgIQAFgHAAgRQABgOgGgJQgGgIgJAAQgNAAgGALg");
	this.shape_44.setTransform(107.5,35.675);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABDIgWAAIAAhfIAVAAIAAAMQALgNAQgBQAeAAABAiIAAA/g");
	this.shape_45.setTransform(63.45,33.85);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgHQAMgHAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAACIgWAAQgBgDgBgHQgLAMgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_46.setTransform(53.575,33.95);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgDAAgFQAAgFADgDQADgDAFgBQAGABADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_47.setTransform(46.4,32.15);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgVA/QgKgFgEgHIAKgMQAJALAPAAQAKAAAFgFQAHgGAAgLIAAgHQgKALgOAAQgRAAgKgOQgLgNAAgXQAAgWAKgNQALgNARAAQAPAAAKALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgKgEgAgOgoQgFAIgBAQQABAPAFAHQAGAIAKAAQAMAAAHgLIAAgpQgHgLgMAAQgKAAgGAJg");
	this.shape_48.setTransform(38.8,35.725);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgHQAMgHAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAACIgWAAQgBgDgBgHQgLAMgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_49.setTransform(29.025,33.95);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgUA4IgCALIgTAAIAAiHIAWAAIAAAxQAJgKAOgBQASABAKANQAKANAAAWIAAABQAAAWgKANQgKANgRAAQgQAAgJgMgAgTAAIAAAnQAFAMAOAAQAJAAAGgIQAFgHAAgPIAAgDQAAgQgFgGQgGgIgJAAQgOAAgFAMg");
	this.shape_50.setTransform(19.275,32.05);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAFACACQACADAGAAIAHgBIAAARQgHACgHAAQgXAAAAgcg");
	this.shape_51.setTransform(254.425,7.3);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKAMgQAAQgPAAgIgKg");
	this.shape_52.setTransform(246.625,8.45);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AgJBEIAAiGIATAAIAACGg");
	this.shape_53.setTransform(239.35,6.35);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKAMgQAAQgPAAgIgKg");
	this.shape_54.setTransform(232.025,8.45);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AAuAxIAAg9QAAgJgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABBIgVAAIAAg+QAAgRgRAAQgNAAgFALIAABEIgVAAIAAhfIAUAAIAAAKQAKgMASABQASAAAHAOQAKgOATAAQAQgBAIAKQAHAIAAARIAAA+g");
	this.shape_55.setTransform(219.225,8.25);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAVAAIAABfgAgIgtQgDgEAAgFQAAgEADgEQADgCAFgBQAGABADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_56.setTransform(191.15,6.55);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AARBEIgbgpIgJAJIAAAgIgWAAIAAiGIAWAAIAABMIAGgIIAagdIAZAAIgjAnIAnA4g");
	this.shape_57.setTransform(184.725,6.35);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgEAAgFQAAgEADgEQADgCAFgBQAGABADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_58.setTransform(177.15,6.55);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgJBEIAAiGIAUAAIAACGg");
	this.shape_59.setTransform(172.55,6.35);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAVAAIAABfgAgIgtQgDgEAAgFQAAgEADgEQADgCAFgBQAGABADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_60.setTransform(167.95,6.55);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AAuAxIAAg9QAAgJgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABBIgVAAIAAg+QAAgRgRAAQgNAAgFALIAABEIgVAAIAAhfIAUAAIAAAKQAKgMASABQASAAAHAOQAKgOATAAQAQgBAIAKQAHAIAAARIAAA+g");
	this.shape_61.setTransform(157.825,8.25);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgNAGgMQAFgLAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAIIg9AAQABAMAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_62.setTransform(145.275,8.35);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AAuAxIAAg9QAAgJgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABBIgVAAIAAg+QAAgRgRAAQgNAAgFALIAABEIgVAAIAAhfIAUAAIAAAKQAKgMASABQASAAAHAOQAKgOATAAQAQgBAIAKQAHAIAAARIAAA+g");
	this.shape_63.setTransform(132.525,8.25);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgEAAgFQAAgEADgEQADgCAFgBQAGABADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_64.setTransform(104.45,6.55);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABDIgVAAIAAhfIAUAAIABALQAKgNAQABQAegBAAAjIAAA+g");
	this.shape_65.setTransform(97.15,8.25);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AgJBCIAAhfIAUAAIAABfgAgIgtQgDgEAAgFQAAgEADgEQADgCAFgBQAGABADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_66.setTransform(89.85,6.55);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgVAAIAAhfIAUAAIAAALQALgNAQABQAegBABAjIAAA+g");
	this.shape_67.setTransform(64.6,8.25);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgIAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAJAAAOIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_68.setTransform(54.725,8.35);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2C3E50").s().p("AAUAwIgUhBIgTBBIgSAAIgahfIAVAAIAPBAIAUhAIAPAAIAUBBIAPhBIAVAAIgaBfg");
	this.shape_69.setTransform(43.125,8.35);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgNAGgMQAFgLAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAIIg9AAQABAMAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_70.setTransform(31.725,8.35);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2C3E50").s().p("AAdBAIAAg5Ig5AAIAAA5IgWAAIAAh/IAWAAIAAA2IA5AAIAAg2IAWAAIAAB/g");
	this.shape_71.setTransform(20.375,6.7);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.258,0,0,2.124,-156.6,-92.6)).s().p("A4dOcIAA83MAw8AAAIAAc3g");
	this.shape_72.setTransform(140.15,53.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("rgba(0,0,0,0.227)").s().p("A1oJmIAAzLMArRAAAIAATLg");
	this.shape_73.setTransform(124.3,59.75);

	this.timeline.addTween(cjs.Tween.get(this.shape_73).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop12G3, new cjs.Rectangle(-16.5,-39,313.3,184.8), null);


(lib.drop12G2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgSAqQgIgEgFgGQgFgIAAgIIAUAAQAAAIAFADQAFAFAHAAQAIAAAEgDQAEgEAAgEQAAgGgEgCQgEgDgKgDQgKgCgHgDQgPgGAAgOQAAgMAKgIQAKgHAOgBQAQABAKAHQAKAJAAAMIgVAAQAAgGgEgEQgEgDgHAAQgGAAgEACQgEAEAAAFQAAAEAEADQADADALADQAMACAHADQAHADADAFQADAFAAAIQAAALgKAIQgKAIgQAAQgKgBgJgEg");
	this.shape.setTransform(148.325,91.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgaAiQgMgMAAgTIAAgDQAAgMAEgLQAGgLAJgFQAKgHAKAAQATAAAJAMQAKAMAAAVIAAAHIg5AAQABALAGAHQAHAGAJABQAOgBAIgKIALAKQgGAIgIAEQgKAEgLABQgSAAgLgNgAgLgXQgFAGgCAJIAlAAIAAgBQAAgKgFgFQgFgFgIAAQgIgBgEAHg");
	this.shape_1.setTransform(139.55,91.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_2.setTransform(132.725,89.825);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgaAiQgMgMgBgTIAAgDQAAgMAGgLQAFgLAJgFQAKgHAKAAQATAAAKAMQAKAMAAAVIAAAHIg7AAQACALAGAHQAGAGAJABQAOgBAJgKIALAKQgFAIgKAEQgIAEgMABQgSAAgLgNgAgMgXQgEAGgCAJIAmAAIAAgBQgBgKgFgFQgFgFgIAAQgHgBgGAHg");
	this.shape_3.setTransform(126.1,91.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgWIATAAIAAAWIAQAAIAAAPIgQAAIAAAyQAAAEACACQACADAGAAIAHgBIAAAQIgOACQgWAAAAgag");
	this.shape_4.setTransform(118.425,90.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgdAiQgMgMAAgWIAAAAQAAgNAGgKQAFgLAJgFQAKgHALAAQASAAAMAMQALAMABATIAAAEQAAANgFAKQgFALgKAGQgJAGgNAAQgSAAgLgNgAgPgVQgGAHAAAPQAAAOAGAIQAGAIAJAAQAKgBAGgHQAGgJAAgOQAAgOgGgHQgGgJgKABQgJgBgGAJg");
	this.shape_5.setTransform(110.925,91.7);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgWIATAAIAAAWIAQAAIAAAPIgQAAIAAAyQAAAEACACQACADAGAAIAHgBIAAAQIgOACQgWAAAAgag");
	this.shape_6.setTransform(103.075,90.7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgSAqQgIgEgFgGQgFgIAAgIIAUAAQAAAIAFADQAFAFAHAAQAIAAAEgDQAEgEAAgEQAAgGgEgCQgEgDgKgDQgKgCgHgDQgPgGAAgOQAAgMAKgIQAKgHAOgBQAQABAKAHQAKAJAAAMIgVAAQAAgGgEgEQgEgDgHAAQgGAAgEACQgEAEAAAFQAAAEAEADQADADALADQAMACAHADQAHADADAFQADAFAAAIQAAALgKAIQgKAIgQAAQgKgBgJgEg");
	this.shape_7.setTransform(96.025,91.7);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgEAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDAEQgDACgFAAQgEAAgDgCg");
	this.shape_8.setTransform(89.525,90);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgWAuIAAhZIATAAIAAAKQAHgMANAAIAHABIAAATIgJAAQgOAAgDAKIAAA9g");
	this.shape_9.setTransform(84.75,91.625);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgdAnQgIgIAAgLQAAgPAKgGQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFADQgFAEAAAFIgUAAQAAgIAGgFQAEgHAIgEQAJgDAJgBQAQABAJAHQAKAJAAAOIAAAnQAAAMAEAHIAAACIgVAAIgDgJQgJALgNAAQgNAAgJgIgAgLAGQgHAEAAAIQAAAGAFADQAEADAGABQAFAAAFgEQAFgDADgEIAAgRIgLAAQgKAAgFADg");
	this.shape_10.setTransform(76.75,91.7);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgdAnQgJgIABgLQgBgPALgGQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFADQgEAEgBAFIgTAAQAAgIAEgFQAFgHAJgEQAIgDAKgBQAPABAKAHQAJAJAAAOIAAAnQAAAMADAHIAAACIgUAAIgCgJQgKALgNAAQgNAAgJgIgAgMAGQgFAEAAAIQAAAGADADQAFADAGABQAFAAAFgEQAGgDACgEIAAgRIgLAAQgKAAgGADg");
	this.shape_11.setTransform(63.3,91.7);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgXAuIAAhZIATAAIABAKQAGgMAOAAIAGABIAAATIgIAAQgNAAgFAKIAAA9g");
	this.shape_12.setTransform(56.1,91.625);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgaAiQgMgMgBgTIAAgDQAAgMAGgLQAFgLAJgFQAKgHAKAAQATAAAKAMQAKAMAAAVIAAAHIg7AAQACALAGAHQAGAGAJABQAOgBAJgKIALAKQgFAIgKAEQgIAEgMABQgSAAgLgNgAgMgXQgEAGgCAJIAmAAIAAgBQgBgKgFgFQgFgFgIAAQgHgBgGAHg");
	this.shape_13.setTransform(48.25,91.7);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgWIATAAIAAAWIAQAAIAAAPIgQAAIAAAyQAAAEACACQACADAGAAIAHgBIAAAQIgOACQgWAAAAgag");
	this.shape_14.setTransform(40.575,90.7);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_15.setTransform(33.225,91.625);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgaAiQgNgMAAgTIAAgDQABgMAFgLQAFgLAJgFQAJgHALAAQATAAAJAMQALAMgBAVIAAAHIg5AAQAAALAHAHQAGAGAJABQAPgBAIgKIALAKQgFAIgKAEQgIAEgMABQgSAAgLgNgAgMgXQgFAGgBAJIAmAAIAAgBQgBgKgFgFQgFgFgIAAQgHgBgGAHg");
	this.shape_16.setTransform(24.05,91.7);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_17.setTransform(17.225,89.825);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgVIATAAIAAAVIAQAAIAAAPIgQAAIAAAyQAAAEACACQACADAGAAIAHgBIAAAQIgOABQgWAAAAgZg");
	this.shape_18.setTransform(237.025,66.3);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_19.setTransform(229.675,67.375);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgTA1IgBAKIgSAAIAAh/IAUAAIAAAvQAIgLAOAAQARABAJALQAJANAAAVIAAABQAAAVgJAMQgJAMgRAAQgOAAgJgLgAgSAAIAAAkQAFAMANAAQAJAAAFgHQAFgHAAgOIAAgDQAAgPgFgFQgFgIgJAAQgNAAgFALg");
	this.shape_20.setTransform(220.375,65.5);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgbAiQgMgMABgTIAAgDQgBgMAGgLQAFgLAJgFQAJgHALAAQASAAALAMQAJAMABAVIAAAHIg7AAQABAMAHAGQAGAHAKAAQANAAAJgMIALALQgFAIgJAEQgKAEgKAAQgTAAgMgMgAgMgXQgEAGgCAJIAmAAIAAgBQgBgKgFgFQgEgFgJAAQgIgBgFAHg");
	this.shape_21.setTransform(210.95,67.3);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgSAqQgIgEgFgGQgFgHAAgJIAUAAQAAAIAFADQAFAFAHAAQAIAAAEgEQAEgDAAgEQAAgGgEgCQgEgEgKgCQgKgCgHgDQgPgHAAgNQAAgMAKgHQAKgJAOAAQAQAAAKAJQAKAIAAAMIgVAAQAAgFgEgFQgEgDgHAAQgGAAgEACQgEAEAAAFQAAAEAEADQADADALACQAMADAHADQAHADADAFQADAGAAAGQAAANgKAHQgKAIgQgBQgKAAgJgEg");
	this.shape_22.setTransform(201.875,67.3);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDADgFAAQgEAAgDgDg");
	this.shape_23.setTransform(195.375,65.6);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgcA0QgKgMAAgXQAAgTAJgNQAKgNAQAAQAOAAAIAKIAAguIAUAAIAAB/IgSAAIgBgKQgJALgOAAQgQAAgJgMgAgNgDQgFAHAAAPQAAAOAFAIQAGAHAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_24.setTransform(188.175,65.5);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgSAqQgIgEgFgGQgFgHAAgJIAUAAQAAAIAFADQAFAFAHAAQAIAAAEgEQAEgDAAgEQAAgGgEgCQgEgEgKgCQgKgCgHgDQgPgHAAgNQAAgMAKgHQAKgJAOAAQAQAAAKAJQAKAIAAAMIgVAAQAAgFgEgFQgEgDgHAAQgGAAgEACQgEAEAAAFQAAAEAEADQADADALACQAMADAHADQAHADADAFQADAGAAAGQAAANgKAHQgKAIgQgBQgKAAgJgEg");
	this.shape_25.setTransform(167.725,67.3);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AAQBAIgagnIgJAJIAAAeIgTAAIAAh/IATAAIAABJIAHgIIAYgbIAYAAIghAkIAlA1g");
	this.shape_26.setTransform(159.55,65.425);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgbAiQgMgMABgTIAAgDQAAgMAEgLQAGgLAJgFQAJgHALAAQASAAALAMQAJAMABAVIAAAHIg7AAQACAMAGAGQAHAHAJAAQANAAAJgMIALALQgFAIgJAEQgKAEgKAAQgTAAgMgMgAgLgXQgFAGgCAJIAlAAIAAgBQAAgKgFgFQgEgFgJAAQgIgBgEAHg");
	this.shape_27.setTransform(150.1,67.3);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_28.setTransform(143.275,65.425);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgmA/IAAh7IASAAIABAJQAJgLAOAAQARAAAJANQAJALAAAXIAAABQAAATgJANQgKAMgQAAQgNAAgJgJIAAAqgAgSgjIAAAmQAFALANAAQAIAAAGgIQAFgGAAgQQAAgNgFgJQgGgHgJgBQgMAAgFALg");
	this.shape_29.setTransform(136.525,68.95);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AAsAuIAAg6QAAgIgFgEQgDgEgIAAQgHAAgFAEQgEADgCAGIAAA9IgTAAIAAg6QgBgQgQAAQgMAAgFAKIAABAIgTAAIAAhZIASAAIABAJQAJgLARAAQARAAAHAOQAJgOASAAQAPAAAHAIQAHAJAAAQIAAA6g");
	this.shape_30.setTransform(124.15,67.225);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgdAiQgMgMAAgWIAAAAQAAgNAGgKQAFgLAJgFQAKgHALAAQASAAAMAMQALAMABAUIAAADQAAANgFALQgFAKgKAGQgJAGgNgBQgSAAgLgMgAgPgVQgGAHAAAPQAAAOAGAIQAGAIAJAAQAKgBAGgHQAGgJAAgOQAAgOgGgHQgGgJgKABQgJgBgGAJg");
	this.shape_31.setTransform(111.875,67.3);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AAQBAIgZgnIgKAJIAAAeIgTAAIAAh/IATAAIAABJIAHgIIAXgbIAZAAIgiAkIAmA1g");
	this.shape_32.setTransform(103.2,65.425);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AAQBAIgagnIgJAJIAAAeIgUAAIAAh/IAUAAIAABJIAHgIIAYgbIAYAAIghAkIAkA1g");
	this.shape_33.setTransform(82.9,65.425);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgdAiQgMgMAAgWIAAAAQAAgNAGgKQAFgLAJgFQAKgHALAAQASAAAMAMQALAMABAUIAAADQAAANgFALQgFAKgKAGQgJAGgNgBQgSAAgLgMgAgPgVQgGAHAAAPQAAAOAGAIQAGAIAJAAQAKgBAGgHQAGgJAAgOQAAgOgGgHQgGgJgKABQgJgBgGAJg");
	this.shape_34.setTransform(73.025,67.3);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_35.setTransform(66.025,65.425);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgdAiQgMgMAAgWIAAAAQAAgNAGgKQAFgLAJgFQAKgHALAAQASAAAMAMQALAMABAUIAAADQAAANgFALQgFAKgKAGQgJAGgNgBQgSAAgLgMgAgPgVQgGAHAAAPQAAAOAGAIQAGAIAJAAQAKgBAGgHQAGgJAAgOQAAgOgGgHQgGgJgKABQgJgBgGAJg");
	this.shape_36.setTransform(58.975,67.3);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgTA1IgBAKIgSAAIAAh/IAUAAIAAAvQAIgLAOAAQARABAJALQAJANAAAVIAAABQAAAVgJAMQgJAMgRAAQgOAAgJgLgAgSAAIAAAkQAFAMANAAQAJAAAFgHQAFgHAAgOIAAgDQAAgPgFgFQgFgIgJAAQgNAAgFALg");
	this.shape_37.setTransform(49.575,65.5);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AAsAuIAAg6QAAgIgFgEQgDgEgIAAQgIAAgEAEQgEADgCAGIAAA9IgTAAIAAg6QgBgQgPAAQgNAAgFAKIAABAIgTAAIAAhZIATAAIAAAJQAJgLARAAQARAAAHAOQAJgOASAAQAPAAAHAIQAHAJABAQIAAA6g");
	this.shape_38.setTransform(37.2,67.225);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgbAiQgMgMABgTIAAgDQAAgMAEgLQAGgLAJgFQAJgHALAAQATAAAJAMQALAMAAAVIAAAHIg7AAQACAMAGAGQAHAHAJAAQAOAAAIgMIALALQgGAIgIAEQgKAEgKAAQgTAAgMgMgAgLgXQgGAGgBAJIAlAAIAAgBQAAgKgFgFQgFgFgIAAQgIgBgEAHg");
	this.shape_39.setTransform(25.35,67.3);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgVIATAAIAAAVIAQAAIAAAPIgQAAIAAAyQAAAEACACQACADAGAAIAHgBIAAAQIgOABQgWAAAAgZg");
	this.shape_40.setTransform(17.675,66.3);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgdAnQgJgIAAgLQAAgOALgHQALgIATAAIAMAAIAAgGQAAgHgEgEQgEgEgHAAQgGAAgFADQgFAEABAFIgUAAQAAgIAEgFQAFgHAJgEQAIgDAKAAQAPgBAJAJQAKAHAAAOIAAAoQAAAMAEAIIAAABIgVAAIgDgJQgJAKgNAAQgOABgIgIgAgMAHQgFADAAAIQAAAFAEAEQADAEAHAAQAFgBAFgDQAFgDADgEIAAgRIgLAAQgKAAgGAEg");
	this.shape_41.setTransform(235.45,42.9);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgmA/IAAh7IASAAIABAJQAJgLAOAAQARAAAJANQAJAMAAAWIAAABQAAATgJANQgKAMgQAAQgNAAgJgJIAAAqgAgSgjIAAAnQAFAKANAAQAIAAAGgIQAFgGAAgQQAAgNgFgJQgGgHgJgBQgMAAgFALg");
	this.shape_42.setTransform(226.275,44.55);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_43.setTransform(216.575,42.975);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgWAuIAAhZIATAAIAAAKQAGgMANAAIAHABIAAATIgIAAQgOAAgEAKIAAA9g");
	this.shape_44.setTransform(209.25,42.825);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgbAiQgMgLABgVIAAgCQAAgMAEgLQAGgLAJgFQAJgHALABQASAAALALQAJAMABAWIAAAHIg7AAQACALAGAGQAHAHAJAAQANAAAJgMIALAKQgFAJgJAFQgKADgKAAQgTAAgMgMgAgLgYQgFAGgCAKIAlAAIAAgBQAAgKgFgFQgEgGgJABQgIAAgEAFg");
	this.shape_45.setTransform(201.4,42.9);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgTA1IgBAKIgSAAIAAh/IAUAAIAAAvQAIgLAOABQARgBAJAMQAJANAAAVIAAABQAAAVgJAMQgJAMgRAAQgOAAgJgLgAgSAAIAAAkQAFAMANAAQAJAAAFgHQAFgHAAgOIAAgDQAAgPgFgFQgFgIgJAAQgNAAgFALg");
	this.shape_46.setTransform(192.175,41.1);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AgSArQgIgEgFgHQgFgHAAgJIAUAAQAAAIAFADQAFAFAHAAQAIAAAEgEQAEgCAAgGQAAgFgEgCQgEgEgKgCQgKgCgHgDQgPgHAAgNQAAgMAKgHQAKgJAOABQAQgBAKAJQAKAHAAANIgVAAQAAgGgEgEQgEgDgHAAQgGAAgEACQgEAEAAAFQAAAFAEACQADACALADQAMADAHAEQAHACADAFQADAGAAAGQAAAMgKAIQgKAIgQgBQgKAAgJgDg");
	this.shape_47.setTransform(159.525,42.9);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgdAnQgJgIABgLQgBgOALgHQALgIASAAIANAAIAAgGQAAgHgEgEQgEgEgHAAQgHAAgEADQgEAEgBAFIgTAAQAAgIAEgFQAFgHAJgEQAIgDAKAAQAPgBAKAJQAJAHAAAOIAAAoQAAAMADAIIAAABIgUAAIgCgJQgKAKgNAAQgNABgJgIgAgMAHQgFADAAAIQAAAFADAEQAFAEAGAAQAFgBAFgDQAGgDACgEIAAgRIgLAAQgKAAgGAEg");
	this.shape_48.setTransform(150.6,42.9);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AARBAIAAg6QAAgIgEgEQgEgEgIAAQgLAAgGAKIAABAIgUAAIAAh/IAUAAIAAAwQAKgMAOAAQAdAAAAAgIAAA7g");
	this.shape_49.setTransform(141.275,41.025);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AAQBAIgZgnIgJAJIAAAeIgUAAIAAh/IAUAAIAABJIAGgIIAXgbIAZAAIgiAkIAlA1g");
	this.shape_50.setTransform(132.7,41.025);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_51.setTransform(99.725,42.825);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AgdAnQgJgIABgLQAAgOAKgHQALgIASAAIANAAIAAgGQAAgHgEgEQgEgEgHAAQgHAAgEADQgEAEgBAFIgTAAQAAgIAEgFQAFgHAJgEQAIgDAJAAQAQgBAKAJQAJAHAAAOIAAAoQAAAMADAIIAAABIgUAAIgCgJQgKAKgNAAQgNABgJgIgAgLAHQgHADABAIQAAAFADAEQAFAEAGAAQAFgBAFgDQAGgDACgEIAAgRIgLAAQgKAAgFAEg");
	this.shape_52.setTransform(90.4,42.9);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AgdAnQgJgIAAgLQAAgOALgHQALgIASAAIANAAIAAgGQAAgHgEgEQgEgEgHAAQgGAAgFADQgEAEAAAFIgUAAQAAgIAEgFQAFgHAJgEQAIgDAKAAQAPgBAKAJQAJAHAAAOIAAAoQAAAMADAIIAAABIgUAAIgDgJQgJAKgNAAQgNABgJgIgAgMAHQgFADAAAIQAAAFADAEQAEAEAHAAQAFgBAFgDQAFgDADgEIAAgRIgLAAQgKAAgGAEg");
	this.shape_53.setTransform(81.2,42.9);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_54.setTransform(71.875,42.825);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgXAuIAAhZIATAAIABAKQAGgMAOAAIAGABIAAATIgIAAQgNAAgFAKIAAA9g");
	this.shape_55.setTransform(64.55,42.825);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AgbAiQgLgLgBgVIAAgCQAAgMAGgLQAFgLAJgFQAJgHALABQASAAALALQAKAMAAAWIAAAHIg7AAQABALAHAGQAGAHAJAAQAOAAAJgMIALAKQgFAJgKAFQgJADgKAAQgTAAgMgMgAgMgYQgEAGgCAKIAmAAIAAgBQgBgKgFgFQgFgGgIABQgIAAgFAFg");
	this.shape_56.setTransform(56.7,42.9);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AgbAiQgLgMAAgVIAAgBQAAgVALgMQALgNASABQAQAAAKAJQAKAJABAQIgTAAQgBgIgEgGQgFgEgIAAQgJAAgFAHQgFAHgBAPIAAABQAAAPAGAIQAFAGAJABQAIAAAFgFQAEgEABgGIATAAQAAAHgFAIQgFAHgJAFQgIADgKAAQgSAAgLgMg");
	this.shape_57.setTransform(47.675,42.9);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_58.setTransform(38.425,42.825);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgbAiQgLgLgBgVIAAgCQAAgMAGgLQAFgLAJgFQAJgHALABQASAAALALQAKAMAAAWIAAAHIg7AAQABALAHAGQAGAHAJAAQAOAAAJgMIALAKQgFAJgKAFQgJADgKAAQgTAAgMgMgAgMgYQgEAGgCAKIAmAAIAAgBQgBgKgFgFQgFgGgIABQgIAAgFAFg");
	this.shape_59.setTransform(29.25,42.9);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgmA/IAAh7IASAAIABAJQAJgLAOAAQARAAAJANQAJAMAAAWIAAABQAAATgJANQgKAMgQAAQgNAAgJgJIAAAqgAgSgjIAAAnQAFAKANAAQAIAAAGgIQAFgGAAgQQAAgNgFgJQgGgHgJgBQgMAAgFALg");
	this.shape_60.setTransform(20.025,44.55);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgVIATAAIAAAVIAQAAIAAAPIgQAAIAAAxQAAAGACABQACADAGAAIAHgBIAAAQIgOABQgWABAAgag");
	this.shape_61.setTransform(237.025,17.5);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AgdAnQgJgIABgLQgBgOALgHQALgIASAAIANAAIAAgGQAAgHgEgEQgEgEgHAAQgHAAgEADQgEAEgBAFIgTAAQAAgHAEgHQAFgGAJgEQAIgDAKAAQAPgBAKAJQAJAHAAAOIAAAoQAAAMADAIIAAABIgUAAIgCgJQgKALgNgBQgNAAgJgHgAgMAHQgFADAAAIQAAAFADAEQAFADAGAAQAFAAAFgDQAGgDACgEIAAgRIgLAAQgKAAgGAEg");
	this.shape_62.setTransform(229.8,18.5);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_63.setTransform(223.025,16.625);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AgdAnQgIgIgBgLQAAgOALgHQALgIATAAIAMAAIAAgGQAAgHgEgEQgEgEgHAAQgGAAgFADQgFAEAAAFIgUAAQAAgHAGgHQAEgGAIgEQAJgDAJAAQAQgBAJAJQAKAHAAAOIAAAoQAAAMAEAIIAAABIgVAAIgCgJQgKALgNgBQgNAAgJgHgAgLAHQgHADAAAIQAAAFAFAEQAEADAGAAQAFAAAFgDQAFgDADgEIAAgRIgLAAQgKAAgFAEg");
	this.shape_64.setTransform(216.25,18.5);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDAEgFAAQgEAAgDgEg");
	this.shape_65.setTransform(189.125,16.8);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AAQBAIgZgnIgJAJIAAAeIgUAAIAAh/IAUAAIAABJIAGgIIAXgbIAZAAIgiAkIAlA1g");
	this.shape_66.setTransform(183.1,16.625);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDAEgFAAQgEAAgDgEg");
	this.shape_67.setTransform(175.925,16.8);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_68.setTransform(171.575,16.625);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDAEgFAAQgEAAgDgEg");
	this.shape_69.setTransform(167.225,16.8);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2C3E50").s().p("AArAuIAAg6QAAgIgDgEQgEgEgJAAQgGAAgFAEQgEADgCAGIAAA9IgTAAIAAg6QgBgQgQAAQgLAAgGAKIAABAIgUAAIAAhZIATAAIABAJQAJgLARAAQARAAAHAOQAJgOASAAQAPAAAHAIQAHAJAAAQIAAA6g");
	this.shape_70.setTransform(157.65,18.425);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2C3E50").s().p("AgbAjQgLgMgBgVIAAgCQAAgMAGgLQAFgLAJgFQAJgHALABQASAAALALQAKAMAAAWIAAAHIg7AAQABALAHAGQAGAHAJgBQAOAAAJgLIALAKQgFAJgKAFQgJADgKAAQgTABgMgMgAgMgYQgEAGgCAKIAmAAIAAgBQgBgKgFgFQgFgGgIABQgIAAgFAFg");
	this.shape_71.setTransform(145.8,18.5);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2C3E50").s().p("AArAuIAAg6QAAgIgEgEQgDgEgIAAQgIAAgEAEQgEADgCAGIAAA9IgTAAIAAg6QAAgQgQAAQgNAAgEAKIAABAIgUAAIAAhZIATAAIAAAJQAKgLAQAAQARAAAGAOQAKgOASAAQAPAAAHAIQAIAJAAAQIAAA6g");
	this.shape_72.setTransform(133.75,18.425);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDAEgFAAQgEAAgDgEg");
	this.shape_73.setTransform(103.825,16.8);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_74.setTransform(96.925,18.425);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDAEgFAAQgEAAgDgEg");
	this.shape_75.setTransform(90.025,16.8);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_76.setTransform(62.775,18.425);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#2C3E50").s().p("AgdAnQgJgIAAgLQAAgOALgHQALgIATAAIAMAAIAAgGQAAgHgEgEQgEgEgHAAQgHAAgEADQgFAEABAFIgVAAQABgHAFgHQAEgGAIgEQAJgDAJAAQAQgBAJAJQAKAHAAAOIAAAoQAAAMAEAIIAAABIgVAAIgDgJQgJALgNgBQgOAAgIgHgAgLAHQgGADgBAIQAAAFAFAEQAEADAGAAQAFAAAFgDQAFgDADgEIAAgRIgLAAQgKAAgFAEg");
	this.shape_77.setTransform(53.45,18.5);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#2C3E50").s().p("AATAtIgTg9IgSA9IgQAAIgZhZIAUAAIAOA9IATg9IAOAAIASA9IAPg9IATAAIgYBZg");
	this.shape_78.setTransform(42.525,18.5);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#2C3E50").s().p("AgaAjQgNgMAAgVIAAgCQABgMAFgLQAFgLAJgFQAKgHAKABQASAAAKALQALAMgBAWIAAAHIg5AAQABALAGAGQAHAHAIgBQAPAAAIgLIALAKQgGAJgJAFQgIADgMAAQgSABgLgMgAgMgYQgFAGgBAKIAlAAIAAgBQAAgKgFgFQgEgGgJABQgHAAgGAFg");
	this.shape_79.setTransform(31.8,18.5);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#2C3E50").s().p("AAbA9IAAg2Ig1AAIAAA2IgVAAIAAh5IAVAAIAAAzIA1AAIAAgzIAVAAIAAB5g");
	this.shape_80.setTransform(21.075,16.95);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.165,0,0,1.778,-145,-77.5)).s().p("A2qMGIAA4LMAtVAAAIAAYLg");
	this.shape_81.setTransform(128.25,59.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("rgba(0,0,0,0.227)").s().p("A0sHoIAAvPMApZAAAIAAPPg");
	this.shape_82.setTransform(115.65,67.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_82).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop12G2, new cjs.Rectangle(-16.8,-17.9,290.2,154.70000000000002), null);


(lib.drop12G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgWAAIAAhfIAVAAIAAALQALgNAQABQAegBABAjIAAA+g");
	this.shape.setTransform(220.85,61.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_1.setTransform(210.975,61.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgVA/QgKgFgEgHIAKgMQAJALAPAAQAKAAAFgFQAHgGAAgLIAAgHQgKALgOAAQgRAAgKgOQgLgNAAgXQAAgWAKgNQALgNARAAQAPAAAKALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgKgEgAgOgoQgFAIgBAQQABAPAFAHQAGAIAKAAQAMAAAHgLIAAgpQgHgLgMAAQgKAAgGAJg");
	this.shape_2.setTransform(200.8,63.325);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABDIgWAAIAAhfIAVAAIABALQAKgNAQABQAegBAAAjIAAA+g");
	this.shape_3.setTransform(190.9,61.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_4.setTransform(181.175,61.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgKBEIAAiGIAUAAIAACGg");
	this.shape_5.setTransform(173.95,59.55);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_6.setTransform(162.275,61.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgpBDIAAiDIAUAAIABAKQAKgMAOAAQASAAAKANQAKANAAAXIAAACQAAAVgLANQgJANgRAAQgPAAgJgKIAAAtgAgTglIAAApQAGALANAAQAJAAAGgIQAFgHAAgRQABgOgGgJQgGgIgJAAQgNAAgGALg");
	this.shape_7.setTransform(152.5,63.275);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgVAAIAAhfIAUAAIAAALQALgNAQABQAegBAAAjIAAA+g");
	this.shape_8.setTransform(142.25,61.45);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_9.setTransform(132.375,61.55);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAFACACQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgcg");
	this.shape_10.setTransform(124.275,60.5);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgNASQAFgIACgGQACgFAAgGIAAgRIASAAIAAAPQAAAJgEAJQgFAKgGAGg");
	this.shape_11.setTransform(114.7,66.725);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AASBEIAAg+QAAgIgEgFQgFgEgIAAQgMAAgGALIAABEIgVAAIAAiGIAVAAIAAAyQAKgMAQAAQAegBAAAjIAAA+g");
	this.shape_12.setTransform(108.05,59.55);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgDAAgGQAAgEADgEQADgDAFAAQAGAAADADQADAEAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_13.setTransform(100.75,59.75);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgpBDIAAiDIAUAAIABAKQAKgMAOAAQASAAAKANQAKANAAAXIAAACQAAAVgLANQgJANgRAAQgPAAgJgKIAAAtgAgTglIAAApQAGALANAAQAJAAAGgIQAFgHAAgRQABgOgGgJQgGgIgJAAQgNAAgGALg");
	this.shape_14.setTransform(93.55,63.275);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgDAAgGQAAgEADgEQADgDAFAAQAGAAADADQADAEAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_15.setTransform(86,59.75);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgpBDIAAiDIAUAAIABAKQAJgMAQAAQARAAAKANQAKANAAAXIAAACQgBAVgJANQgLANgQAAQgPAAgJgKIAAAtgAgTglIAAApQAGALANAAQAJAAAGgIQAFgHAAgRQABgOgGgJQgGgIgJAAQgNAAgGALg");
	this.shape_16.setTransform(78.8,63.275);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKAMgQAAQgPAAgIgKg");
	this.shape_17.setTransform(64.025,61.65);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_18.setTransform(54.175,61.55);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAFACACQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgcg");
	this.shape_19.setTransform(46.075,60.5);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_20.setTransform(38.425,61.55);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAPIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_21.setTransform(226.975,35.95);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgJBDIAAiGIAUAAIAACGg");
	this.shape_22.setTransform(219.8,33.95);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgfAkQgMgOAAgWIAAAAQAAgOAFgLQAGgLAKgHQAKgFAMgBQATAAAMANQAMAMABAVIAAAEQAAAOgFALQgGALgKAGQgKAHgNgBQgTAAgMgNgAgQgXQgGAIAAAQQAAAOAGAJQAGAIAKAAQALAAAGgIQAGgIAAgQQAAgPgGgIQgHgIgKAAQgKAAgGAIg");
	this.shape_23.setTransform(212.425,35.95);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgUA4IgCAKIgTAAIAAiGIAWAAIAAAyQAJgMAOAAQASAAAKAOQAKAMAAAXIAAABQAAAWgKANQgKANgRAAQgQAAgJgMgAgTAAIAAAmQAFANAOAAQAJAAAGgHQAFgIAAgPIAAgDQAAgQgFgGQgGgIgJAAQgOAAgFAMg");
	this.shape_24.setTransform(202.425,34.05);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAKIAAAeIgWAAIAAiGIAWAAIAABOIAGgJIAagcIAZAAIgjAmIAnA3g");
	this.shape_25.setTransform(188.525,33.95);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgMIAAhCIAVAAIAABdIgUAAIAAgJQgKAMgQgBQgPABgIgKg");
	this.shape_26.setTransform(178.225,36.05);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgKAhIAAg1IgQAAIAAgQIAQAAIAAgXIAUAAIAAAXIARAAIAAAQIgRAAIAAA0QAAAGACACQACACAGAAIAHgBIAAARQgHACgHAAQgXAAAAgbg");
	this.shape_27.setTransform(170.025,34.9);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABCIgVAAIAAhdIAUAAIAAALQALgOAQAAQAeABABAhIAAA+g");
	this.shape_28.setTransform(162.25,35.85);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALAAQAUAAAKANQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgNgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_29.setTransform(152.525,35.95);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgUA4IgCAKIgTAAIAAiGIAWAAIAAAyQAJgMAOAAQASAAAKAOQAKAMAAAXIAAABQAAAWgKANQgKANgRAAQgQAAgJgMgAgTAAIAAAmQAFANAOAAQAJAAAGgHQAFgIAAgPIAAgDQAAgQgFgGQgGgIgJAAQgOAAgFAMg");
	this.shape_30.setTransform(142.725,34.05);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAVAAIAAAKQAHgNANAAQAFAAADACIAAAUIgJgBQgPAAgDAMIAAA/g");
	this.shape_31.setTransform(134.7,35.85);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALAAQAUAAAKANQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgNgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_32.setTransform(126.375,35.95);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgUA4IgCAKIgTAAIAAiGIAWAAIAAAyQAJgMAOAAQASAAAKAOQAKAMAAAXIAAABQAAAWgKANQgKANgRAAQgQAAgJgMgAgTAAIAAAmQAFANAOAAQAJAAAGgHQAFgIAAgPIAAgDQAAgQgFgGQgGgIgJAAQgOAAgFAMg");
	this.shape_33.setTransform(116.575,34.05);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_34.setTransform(104.5,34.15);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABCIgWAAIAAhdIAVAAIAAALQALgOAQAAQAeABABAhIAAA+g");
	this.shape_35.setTransform(97.2,35.85);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_36.setTransform(89.9,34.15);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABCIgVAAIAAhdIAUAAIAAALQALgOAQAAQAeABABAhIAAA+g");
	this.shape_37.setTransform(78.1,35.85);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAPIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_38.setTransform(68.225,35.95);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AAUAvIgUhAIgTBAIgSAAIgahdIAVAAIAPBAIAUhAIAPAAIAUBAIAPhAIAVAAIgaBdg");
	this.shape_39.setTransform(56.625,35.95);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALAAQAUAAAKANQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgNgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_40.setTransform(45.225,35.95);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AAdBAIAAg5Ig5AAIAAA5IgWAAIAAh/IAWAAIAAA1IA5AAIAAg1IAWAAIAAB/g");
	this.shape_41.setTransform(33.875,34.3);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.176,0,0,1.048,-146.5,-45.6)).s().p("A24HIIAAuPMAtxAAAIAAOPg");
	this.shape_42.setTransform(129.725,50.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("rgba(0,0,0,0.227)").s().p("A0sEsIAApXMApZAAAIAAJXg");
	this.shape_43.setTransform(114.3,57.15);

	this.timeline.addTween(cjs.Tween.get(this.shape_43).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop12G1, new cjs.Rectangle(-18.1,4.5,294.3,91.2), null);


(lib.drag12GJudul = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgSAXQgEgFAAgGQABgJAGgDQAHgFALAAIAHABIABgFIAAgDQgBgFgGgBQgEAAgBACQgDACgBAEIgMAAQABgFADgEQADgEAFgCQAFgCAFAAQAJABAFAFQAEAFAAAIIgEAYIgBAEIABAFIAAABIgMAAIAAgEQgHAFgGAAQgHABgFgFgAgGAEQgDADgBAEQAAADABACQACACAEAAQADAAACgCIAGgFIABgKIgFAAQgGAAgEADg");
	this.shape.setTransform(122.125,23.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgMAYQgGgDgCgGQgCgGAAgHIAAgCQABgHAEgGQAEgHAGgDQAFgDAGgBQAKABAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgHIAGAGQgDAFgGADQgFADgGgBQgGABgFgEgAgJgEIAVAAIAAgBIAAgEQgBgDgCgDQgCgBgEgBQgIAAgEANg");
	this.shape_1.setTransform(117.0792,23.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgVAgQgEgFgBgKIAAgFIABgBQABgJADgFQADgGAFgEQAFgDAHAAQAHAAAEAGIAFgbIAMAAIgNBKIgKAAIAAgGQgFAHgIAAQgIAAgEgGgAgKgBQgEAGAAAKQgBAGADADQACAFAEAAQAGAAAFgHIAEgWQgCgGgHAAIAAAAQgGAAgEAFg");
	this.shape_2.setTransform(111.925,22.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgLAkIAJg0IALAAIgJA0gAABgZQAAAAgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAgBQACgCAEAAQAAAAABABQAAAAABAAQAAAAABABQABAAAAAAQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgCAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBg");
	this.shape_3.setTransform(107.8,22.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgOAYQgFgEgCgFQgCgHAAgHIAAgBQABgHAEgGQAEgGAFgEQAGgDAGgBQAHABAFAEQAFADACAGQADAGgBAHQgBAIgEAHQgDAGgGAEQgGACgGAAQgHABgFgEgAgIgKQgCAFgBAFIAAAHQAAAEACAEQADADAEAAQAFAAAEgEQAEgGABgIIABgDQAAgHgDgDQgCgDgFgBQgHAAgEAHg");
	this.shape_4.setTransform(103.6343,23.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AAHAbIAGghIAAgEQgBgGgGAAQgGAAgFAGIgHAlIgLAAIAJg0IALAAIgBAGQAGgHAIAAQAIABADAEQAEAGgBAJIgGAhg");
	this.shape_5.setTransform(97.9281,23.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgLAkIAJg0IALAAIgJA0gAABgZQAAAAgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAgBQACgCAEAAQAAAAABABQAAAAABAAQAAAAABABQABAAAAAAQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgCAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBg");
	this.shape_6.setTransform(94.3,22.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AAHAbIAGghIAAgEQgBgGgGAAQgGAAgFAGIgHAlIgLAAIAJg0IALAAIgBAGQAGgHAIAAQAIABADAEQAEAGgBAJIgGAhg");
	this.shape_7.setTransform(89.9781,23.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AAHAlIAGgiIAAgDQgBgGgGAAQgGAAgFAGIgHAlIgLAAIANhJIAKAAIgEAcQAGgIAIAAQAIABADAFQAEAGgBAHIgGAig");
	this.shape_8.setTransform(84.5111,22);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgNAYQgFgEgCgFQgDgHABgHIAAgBQABgHAEgGQADgHAGgDQAGgDAGgBQAJABAFAGQAFAFAAAIIgLAAQAAgEgCgDQgCgCgFgBQgFAAgEAGQgEAGgBAKQAAANAKAAQADAAADgCQADgDABgEIALAAQgBAFgDAEQgDAFgFACQgFADgFgBQgHABgEgEg");
	this.shape_9.setTransform(79.5107,23.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgcAjIAMhGIAsAAIgBAKIggAAIgEAUIAcAAIgCAJIgbAAIgEAWIAgAAIgCAJg");
	this.shape_10.setTransform(74.4,22.2);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0.3,-3.1,195.7,34.8);


(lib.drag12G12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap136();
	this.instance.setTransform(0,-3,0.4712,0.5691);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgNASQgEgEAAgGIAJAAQAAADACACQACACADAAQADAAACgCQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAgBQAAgDgFgCIgHgDQgIgCAAgHQAAgGAFgEQAFgDAGAAQAHAAAEADQAEAFAAAFIgJAAQAAAAAAgBQAAgBAAAAQAAgBgBAAQAAgBAAAAQgCgCgDAAQgDAAgBACQgBAAAAAAQgBABAAAAQAAABgBAAQAAABAAAAQAAAEAEACIAIACQAIADAAAGQAAAFgDADIgGAEIgIACQgHAAgFgEg");
	this.shape.setTransform(59.925,88.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgOAUQgDgCgBgEQgBgDABgFIAEgbIAJAAIgEAbIAAADQAAAFAFAAQAFAAAEgFIAFgeIAJAAIgHAqIgJAAIABgEQgEAFgHAAIgHgCg");
	this.shape_1.setTransform(55.9167,88.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgJAeIAKg7IAJAAIgKA7g");
	this.shape_2.setTransform(52.75,87.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgOAUQgDgCgBgEQgBgDABgFIAEgbIAJAAIgEAbIAAADQAAAFAFAAQAFAAAEgFIAFgeIAJAAIgHAqIgJAAIABgEQgEAFgHAAIgHgCg");
	this.shape_3.setTransform(49.5667,88.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgJAZIgBAFIgJAAIALg8IAIAAIgEAXQAFgGAGAAQAGABAEAEQADAEAAAHIAAAGQgBAGgCAFQgDAGgFACQgDACgFABQgGgBgEgFgAgFAAIgDARQADAFAFAAQADAAAEgDQACgEABgGIABgGQAAgDgCgDQgCgCgDAAQgFAAgEAFg");
	this.shape_4.setTransform(44.95,87.85);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgLATQgEgDgCgFQgCgEABgHIAAAAQABgFADgFQADgGAEgCQAFgDAFAAQAFAAAEADQAEADACAFQACAFgBAFQAAAGgDAFQgDAFgFADQgFADgFAAQgFAAgEgDgAgGgIQgCAEgBAEIAAAFQAAAEACACQACADAEAAQAEABADgFQADgDABgHIAAgCQAAgGgCgCQgCgDgEgBQgFABgDAFg");
	this.shape_5.setTransform(40.625,88.7);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgJAeIAKg7IAJAAIgKA7g");
	this.shape_6.setTransform(37.55,87.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgFAeQgFAAgEgCQgEgCgCgDIAFgGQADAFAHAAQAEABACgDQADgDABgFIABgDQgFAFgFAAQgGAAgDgEQgEgFgBgGIAAgGQABgGADgFQADgFAEgDQAEgDAEAAQAHAAAEAFIABgEIAJAAIgIAoQAAAIgHAFQgEAFgHAAIgBAAgAgEgRQgDADgBAHIAAABIAAAEQAAADACADQABACAEAAQAEAAAEgFIAEgRQgDgFgFAAQgDAAgEAEg");
	this.shape_7.setTransform(34.1,89.4773);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgOASQgDgDAAgGQAAgGAGgDQAFgEAIAAIAGAAIABgDIAAgCQgBgFgFAAQgDAAgBABQgCACgBADIgJAAQAAgEADgDQACgDAEgBIAIgCQAHAAAEAEQAEAEgBAGIgDATIAAAEIAAAEIAAABIgJAAIAAgEQgGAFgFAAQgFgBgEgDgAgEADQgDACgBAEQAAAAAAABQAAAAAAABQAAAAABABQAAAAAAAAQABABAAAAQAAAAABABQAAAAABAAQABAAAAAAQADAAACgBIAEgEIACgIIgFAAQgEAAgDACg");
	this.shape_8.setTransform(59.6278,75.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgJAdIAIgpIAIAAIgHApgAABgTQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIABgEQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAABgBAAQAAABAAAAQAAAAgBABIgEABQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_9.setTransform(56.725,74.275);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgJAeIAKg7IAJAAIgKA7g");
	this.shape_10.setTransform(54.75,74.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgJAdIAIgpIAIAAIgHApgAABgTQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIABgEQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAABAAQAAAAAAABQABAAAAAAQABABAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAABgBAAQAAABAAAAQAAAAgBABIgEABQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_11.setTransform(52.725,74.275);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgUAeIAKg6IAIAAIgBAEQAEgFAHAAQAEAAADACQADACACAEQABAEAAAFIAAAFQgBAHgCAEQgDAFgEADQgEACgFAAQgGAAgDgFIgEAVgAgDgQIgDASQABAEAFAAQAEABAEgEQADgDABgIIAAgCQAAgFgCgDQgBgDgEAAQgFAAgDAFg");
	this.shape_12.setTransform(49.175,75.875);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgNASQgEgEAAgGIAJAAQAAADACACQACACADAAQADAAACgCQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAgBQAAgDgFgCIgHgDQgIgCAAgHQAAgGAFgDQAFgEAGAAQAHAAAEAEQAEAEAAAGIgJAAQAAgBAAgBQAAgBAAAAQAAgBgBAAQAAgBAAAAQgCgCgDAAQgDAAgBABQgBABAAAAQgBABAAAAQAAABgBAAQAAABAAABQAAADAEABIAIADQAIACAAAIQAAAEgDADIgGAEIgIACQgHAAgFgEg");
	this.shape_13.setTransform(45.125,75.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgKATQgEgDgCgFQgCgEABgGIAAgBQAAgFADgFQADgGAFgCQAFgDAEAAQAIAAAEAGQAEAGgBAJIgBADIgZAAQgBAFADADQACADAEAAQAFABAFgGIAFAFIgHAGQgEACgEAAQgGAAgEgDgAgIgDIARAAIAAgBIAAgDQAAgBAAgBQAAAAAAgBQgBAAAAgBQgBAAAAAAQAAgBgBAAQAAgBgBAAQAAAAgBAAQgBgBgBAAQgGAAgEALg");
	this.shape_14.setTransform(41.105,75.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AAOAdIADgUIAFgWIgWAqIgHAAIgJgsIgDAaIgEASIgJAAIAKg5IAMAAIAIArIAXgrIAMAAIgKA5g");
	this.shape_15.setTransform(35.625,74.35);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FF8C2D").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_16.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


(lib.drag12G11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap135();
	this.instance.setTransform(0,-3,0.4523,0.5691);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AAWAbIAFgiIAAgDQAAgGgHAAQgHgBgEAJIAAABIgGAiIgLAAIAGghIAAgEQgBgGgGAAQgHAAgEAGIgHAlIgLAAIAJg0IALAAIgCAGQAHgHAJAAQAEAAADACQAEACABAFQAHgJAKAAQAHAAAEAFQAEAGgBAJIgGAhg");
	this.shape.setTransform(61.5111,88.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgRAZQgEgDgBgEQgCgEABgGIAGgiIALAAIgGAiIAAADQABAGAGABQAGgBAFgGIAHglIALAAIgJA0IgLAAIABgFQgFAGgJAAQgFAAgDgCg");
	this.shape_1.setTransform(54.8688,88.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AAHAbIAGgiIAAgDQgBgGgGAAQgGAAgFAHIgHAkIgLAAIAJg0IALAAIgBAHQAGgIAIAAQAIAAADAFQAEAGgBAJIgGAhg");
	this.shape_2.setTransform(49.0781,88.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgSAXQgEgEAAgHQABgIAGgEQAHgFALAAIAHABIABgFIAAgDQgBgFgGgBQgEAAgBADQgDABgBAEIgMAAQABgFADgEQADgDAFgCQAFgDAFAAQAJABAFAFQAEAFAAAIIgEAXIgBAFIABAFIAAABIgMAAIAAgEQgHAFgGAAQgHABgFgFgAgGAEQgDADgBAEQAAADABACQACACAEAAQADAAACgCIAGgEIABgKIgFAAQgGAAgEACg");
	this.shape_3.setTransform(43.825,88.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgSAjQgFgCgDgEIAGgHQAFAGAIAAQAFAAADgDQAEgDACgHIABgDQgHAGgGgBQgIABgEgGQgFgGAAgIIAAgHQABgIADgGQAEgHAFgDQAFgEAFAAQAJABAFAGIABgGIALAAIgJAzQgBAKgHAHQgIAFgJABQgGAAgFgDgAgFgWQgEAFgBAIIAAABIgBAFQABAEACADQACADAEABQAGAAAFgGIAEgXQgDgFgGgBIgBAAQgFAAgDAFg");
	this.shape_4.setTransform(38.425,89.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgSAXQgEgEAAgHQABgIAGgEQAHgFALAAIAHABIABgFIAAgDQgBgFgGgBQgEAAgBADQgDABgBAEIgMAAQABgFADgEQADgDAFgCQAFgDAFAAQAJABAFAFQAEAFAAAIIgEAXIgBAFIABAFIAAABIgMAAIAAgEQgHAFgGAAQgHABgFgFgAgGAEQgDADgBAEQAAADABACQACACAEAAQADAAACgCIAGgEIABgKIgFAAQgGAAgEACg");
	this.shape_5.setTransform(33.025,88.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgLAlIAMhKIALAAIgMBKg");
	this.shape_6.setTransform(29.425,87);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AAWAbIAFgiIAAgDQAAgGgHAAQgHgBgEAIIAAACIgGAiIgLAAIAGghIAAgEQgBgGgGAAQgHAAgEAGIgHAlIgLAAIAJg0IALAAIgCAGQAHgHAJAAQAEABADABQAEACABAEQAHgIAKAAQAHAAAEAGQAEAEgBAKIgGAhg");
	this.shape_7.setTransform(62.9111,72.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgRAZQgEgDgBgFQgCgEABgFIAGgiIALAAIgGAiIAAADQABAGAGAAQAGAAAFgGIAHglIALAAIgJA0IgLAAIABgFQgFAGgJAAQgFAAgDgCg");
	this.shape_8.setTransform(56.2688,72.15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AAHAbIAGgiIAAgDQgBgGgGAAQgGAAgFAHIgHAkIgLAAIAJg0IALAAIgBAHQAGgIAIAAQAIAAADAGQAEAEgBAKIgGAhg");
	this.shape_9.setTransform(50.4781,72.05);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgSAXQgEgFAAgGQABgJAGgDQAHgFALAAIAHAAIABgDIAAgEQgBgFgGAAQgEAAgBACQgDACgBADIgMAAQABgFADgEQADgEAFgBQAFgCAFAAQAJAAAFAFQAEAFAAAIIgEAXIgBAFIABAFIAAACIgMAAIAAgFQgHAFgGABQgHAAgFgFgAgGAEQgDADgBAEQAAADABACQACACAEAAQADAAACgCIAGgEIABgKIgFAAQgGgBgEADg");
	this.shape_10.setTransform(45.225,72.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgSAjQgFgDgDgDIAGgIQAFAHAIAAQAFAAADgDQAEgDACgHIABgDQgHAGgGAAQgIAAgEgGQgFgFAAgJIAAgHQABgIADgGQAEgGAFgEQAFgDAFAAQAJAAAFAGIABgFIALAAIgJAyQgBALgHAFQgIAHgJAAQgGgBgFgCgAgFgWQgEAEgBAJIAAABIgBAFQABAFACACQACADAEABQAGAAAFgGIAEgXQgDgFgGAAIgBgBQgFAAgDAFg");
	this.shape_11.setTransform(39.825,73.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgSAXQgEgFAAgGQABgJAGgDQAHgFALAAIAHAAIABgDIAAgEQgBgFgGAAQgEAAgBACQgDACgBADIgMAAQABgFADgEQADgEAFgBQAFgCAFAAQAJAAAFAFQAEAFAAAIIgEAXIgBAFIABAFIAAACIgMAAIAAgFQgHAFgGABQgHAAgFgFgAgGAEQgDADgBAEQAAADABACQACACAEAAQADAAACgCIAGgEIABgKIgFAAQgGgBgEADg");
	this.shape_12.setTransform(34.425,72.1);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgVAkIAMhGIALAAIgKA7IAfAAIgCALg");
	this.shape_13.setTransform(29.15,71.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FF8C2D").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_14.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


(lib.drag12G10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap134();
	this.instance.setTransform(0,-3,0.3863,0.5691);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AARAVIAFgaIAAgDQgBgFgFAAQgGAAgDAGIAAABIgFAbIgIAAIAEgaIAAgDQAAgFgFAAQgGAAgDAFIgFAdIgKAAIAIgpIAIAAIAAAEQAFgEAHAAQADAAADACQACABABADQAGgHAIABQAGAAADADQADAFgBAHIgEAag");
	this.shape.setTransform(57.6036,88.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgOAUQgDgCgBgEQgBgDABgFIAEgbIAJAAIgEAbIAAADQAAAFAFAAQAFAAAEgFIAFgeIAJAAIgHAqIgJAAIABgEQgEAFgHAAIgHgCg");
	this.shape_1.setTransform(52.3167,88.775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgNASQgEgEAAgHIAJAAQAAAEACACQACACADgBQADABACgCQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAAAQAAgFgFgBIgHgCQgIgDAAgHQAAgFAFgEQAFgEAGAAQAHAAAEAEQAEADAAAHIgJAAQAAgBAAgBQAAgBAAAAQAAgBgBAAQAAgBAAAAQgCgCgDAAQgDAAgBABQgBABAAAAQgBABAAAAQAAABgBAAQAAABAAABQAAADAEABIAIADQAIACAAAIQAAAEgDADIgGAFIgIABQgHgBgFgDg");
	this.shape_2.setTransform(47.925,88.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgLATQgEgDgCgEQgCgFABgGIAAgBQABgFADgGQADgEAEgEQAFgCAFAAQAFAAAEADQAEACACAFQACAGgBAFQAAAGgDAGQgDAEgFADQgFADgFAAQgFgBgEgCgAgGgHQgCADgBAEIAAAFQAAAEACADQACACAEAAQAEABADgEQADgEABgHIAAgDQAAgEgCgEQgCgDgEAAQgFAAgDAHg");
	this.shape_3.setTransform(43.725,88.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgHAYQgCgEAAgFIAEgXIgGAAIABgIIAHAAIABgKIAJAAIgCAKIAHAAIgBAIIgHAAIgEAXIAAABQAAABAAAAQAAABABAAQAAAAAAABQABAAABAAIADgBIgBAIIgFABQgEgBgDgCg");
	this.shape_4.setTransform(40.425,88.25);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgJAdIAIgpIAIAAIgHApgAABgTQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIABgEQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAABAAQAAAAAAABQABAAAAAAQABABAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAABQAAAAgBABIgEABQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_5.setTransform(38.025,87.925);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgNASQgEgEAAgHIAJAAQAAAEACACQACACADgBQADABACgCQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAAAQAAgFgFgBIgHgCQgIgDAAgHQAAgFAFgEQAFgEAGAAQAHAAAEAEQAEADAAAHIgJAAQAAgBAAgBQAAgBAAAAQAAgBgBAAQAAgBAAAAQgCgCgDAAQgDAAgBABQgBABAAAAQgBABAAAAQAAABgBAAQAAABAAABQAAADAEABIAIADQAIACAAAIQAAAEgDADIgGAFIgIABQgHgBgFgDg");
	this.shape_6.setTransform(34.825,88.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgOATQgDgEAAgFQAAgHAGgDQAFgEAIAAIAGAAIABgCIAAgEQgBgEgFAAQgDAAgBABQgCACgBADIgJAAQAAgEADgDQACgDAEgCIAIgBQAHAAAEAEQAEAEgBAHIgDATIAAADIAAAFIAAAAIgJAAIAAgEQgGAFgFAAQgFgBgEgCgAgEADQgDACgBADQAAABAAABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQAAAAABABQAAAAABAAQABAAAAAAQADABACgCIAEgEIACgIIgFAAQgEAAgDACg");
	this.shape_7.setTransform(60.2778,75.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AARAVIAFgaIAAgDQgBgEgFgBQgGAAgDAGIAAABIgFAbIgIAAIAEgaIAAgDQAAgEgFgBQgGAAgDAFIgFAdIgKAAIAIgpIAIAAIAAAEQAFgEAHAAQADAAADACQACABABADQAGgHAIABQAGAAADADQADAFgBAHIgEAag");
	this.shape_8.setTransform(54.7036,75.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgKATQgEgDgCgEQgCgFABgFIAAgCQAAgFADgGQADgFAFgDQAFgCAEAAQAIAAAEAGQAEAGgBAJIgBADIgZAAQgBAFADADQACADAEAAQAFAAAFgFIAFAFIgHAGQgEACgEAAQgGgBgEgCgAgIgDIARAAIAAgBIAAgDQAAgBAAgBQAAAAAAgBQgBAAAAgBQgBAAAAgBQAAAAgBAAQAAgBgBAAQAAAAgBAAQgBAAgBAAQgGAAgEAKg");
	this.shape_9.setTransform(49.405,75.15);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgQAaQgEgEgBgIIAAgFIAAAAQACgHACgEQADgFAEgDQAEgCAFAAQAGgBADAFIAEgVIAJAAIgKA6IgJAAIABgEQgEAGgGgBQgGAAgDgEgAgIAAQgDAEgBAIQAAAFACACQACADADABQAFgBADgFIAEgRQgCgEgFgBQgEAAgEAFg");
	this.shape_10.setTransform(45.3,74.3);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgOATQgDgEAAgFQAAgHAGgDQAFgEAIAAIAGAAIABgCIAAgEQgBgEgFAAQgDAAgBABQgCACgBADIgJAAQAAgEADgDQACgDAEgCIAIgBQAHAAAEAEQAEAEgBAHIgDATIAAADIAAAFIAAAAIgJAAIAAgEQgGAFgFAAQgFgBgEgCgAgEADQgDACgBADQAAABAAABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQAAAAABABQAAAAABAAQABAAAAAAQADABACgCIAEgEIACgIIgFAAQgEAAgDACg");
	this.shape_11.setTransform(40.6278,75.15);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgJAdIAIgpIAIAAIgHApgAABgTQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIABgEQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAABQAAAAgBABIgEABQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_12.setTransform(37.725,74.325);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgWAcIAKg4IAOAAQAHABAFADQAFAEADAGQACAGgBAHIAAADQgBAHgEAHQgFAGgGADQgGAEgHgBgAgLAUIAFAAQAHABAFgFQAFgFACgJIABgJQgBgGgDgDQgDgDgFAAIgGAAg");
	this.shape_13.setTransform(34.0393,74.4);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FF8C2D").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_14.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


(lib.drag12G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAHAAIAFABIAAALIgFgBQgIAAgCAHIAAAjg");
	this.shape.setTransform(86.2,56.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_1.setTransform(82.925,55.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgHQAAgIAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgCACgDIAAgJIgHAAQgFgBgEADg");
	this.shape_2.setTransform(78.975,56.45);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgBQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_3.setTransform(70.975,56.4);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgHQAAgIAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgCACgDIAAgJIgHAAQgFgBgEADg");
	this.shape_4.setTransform(65.525,56.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAIAAIAEABIgBALIgEgBQgIAAgCAHIAAAjg");
	this.shape_5.setTransform(61.3,56.4);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgHQAAgIAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgCACgDIAAgJIgHAAQgFgBgEADg");
	this.shape_6.setTransform(56.625,56.45);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgKIAAghIAMAAIAAAhQAAALAIgBQAIAAADgGIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_7.setTransform(51.125,56.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgFAmIAAhLIALAAIAABLg");
	this.shape_8.setTransform(47.075,55.35);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgPAUQgHgHAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGABQALAAAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAHQgDAFgFACQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_9.setTransform(43.175,56.45);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgLAjQgFgDgDgEIAFgHQAGAHAIAAQAFAAADgDQADgDAAgGIAAgEQgFAFgHABQgJAAgGgIQgGgHAAgMQAAgMAGgIQAFgIAKABQAIgBAFAHIABgFIAKAAIAAAyQAAALgGAFQgHAHgKAAQgFgBgGgCgAgHgWQgDAEAAAKQAAAHADAEQADAFAFAAQAHAAADgHIAAgWQgDgFgHAAQgFgBgDAFg");
	this.shape_10.setTransform(37.525,57.45);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgBQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_11.setTransform(32.025,56.4);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgPAUQgHgHAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGABQALAAAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAHQgDAFgFACQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_12.setTransform(26.625,56.45);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_13.setTransform(21.175,57.425);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgFASIAAgdIgJAAIAAgJIAJAAIAAgMIALAAIAAAMIAJAAIAAAJIgJAAIAAAdIAAAEIAFABIAEAAIAAAJIgIABQgMAAAAgPg");
	this.shape_14.setTransform(159.55,39.875);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAXQAAAGACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_15.setTransform(155.325,40.45);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_16.setTransform(149.875,41.425);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AAaAbIAAghQAAgGgCgBQgDgDgFAAQgEAAgCACQgDACgBAEIAAAjIgLAAIAAgiQAAgJgKAAQgGAAgEAFIAAAmIgLAAIAAg0IAKAAIABAFQAFgGALAAQAJAAAEAIQAFgIALAAQAJAAAEAFQAEAFAAAKIAAAhg");
	this.shape_17.setTransform(142.6,40.4);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgDAGAAQALgBAFAIQAGAGAAANIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_18.setTransform(135.625,40.45);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgGASIAAgdIgIAAIAAgJIAIAAIAAgMIAMAAIAAAMIAJAAIAAAJIgJAAIAAAdIABAEIAEABIAEAAIAAAJIgIABQgNAAAAgPg");
	this.shape_19.setTransform(131.1,39.875);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgHAKIAEgIIABgFIAAgKIAKAAIAAAJQAAAEgDAFQgCAFgDAEg");
	this.shape_20.setTransform(125.225,43.325);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAXQAAAGACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_21.setTransform(121.625,40.45);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgLAgIAAAFIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAHQAFAHAAAMIAAABQAAAMgFAIQgGAHgJAAQgJAAgFgGgAgKAAIAAAWQADAGAHAAQAFABADgFQADgEAAgIIAAgCQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_22.setTransform(116.175,39.4);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAXQAAAGACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_23.setTransform(110.575,40.45);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IAMAAIAAAGQADgHAHAAIAFABIAAALIgFAAQgIgBgCAHIAAAjg");
	this.shape_24.setTransform(106.35,40.4);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgDAGAAQALgBAFAIQAGAGAAANIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_25.setTransform(101.725,40.45);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_26.setTransform(96.275,41.425);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAXQAAAGACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_27.setTransform(87.625,40.45);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IAMAAIAAAGQADgHAHAAIAFABIAAALIgFAAQgIgBgCAHIAAAjg");
	this.shape_28.setTransform(83.4,40.4);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgDAGAAQALgBAFAIQAGAGAAANIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_29.setTransform(78.775,40.45);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgQAfQgGgIAAgNQAAgLAGgIQAFgHAJAAQAIAAAGAGIAAgbIALAAIAABKIgLAAIAAgFQgGAGgIAAQgIAAgGgHgAgHgCQgEAEAAAJQAAAJAEAEQADAFAFgBQAHABAEgHIAAgWQgEgGgHAAQgFAAgDAEg");
	this.shape_30.setTransform(73.1,39.4);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_31.setTransform(67.625,40.4);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgFAlIAAg1IALAAIAAA1gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_32.setTransform(63.575,39.45);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgHAKIAEgIIABgFIAAgKIAKAAIAAAJQAAAEgDAFQgCAFgDAEg");
	this.shape_33.setTransform(57.975,43.325);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgFAlIAAg1IALAAIAAA1gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_34.setTransform(55.775,39.45);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgFQgDgDAAgFIALAAQABAEADADQADABADAAQAFAAADgBQACgCAAgDQAAgDgDgBQgCgCgFgCIgKgDQgJgDAAgIQAAgHAGgFQAGgEAHAAQAKAAAGAEQAFAFABAIIgNAAQABgEgDgCQgCgDgFABQgDAAgCABQgCACgBADQABADACABQACACAGABIALAEQAEACACACQACAEAAADQAAAIgGAEQgGAEgKABQgFgBgFgCg");
	this.shape_35.setTransform(51.9,40.45);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAXQAAAGACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_36.setTransform(46.675,40.45);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IAMAAIAAAGQADgHAHAAIAFABIAAALIgFAAQgIgBgCAHIAAAjg");
	this.shape_37.setTransform(42.45,40.4);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgFAlIAAg1IALAAIAAA1gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_38.setTransform(39.175,39.45);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_39.setTransform(35.175,41.425);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgFQgDgDAAgFIAMAAQAAAEADADQADABADAAQAFAAADgBQACgCAAgDQAAgDgCgBQgDgCgFgCIgKgDQgJgDAAgIQAAgHAFgFQAHgEAHAAQAKAAAGAEQAFAFAAAIIgLAAQgBgEgCgCQgDgDgEABQgCAAgDABQgCACgBADQABADACABQACACAGABIALAEQAEACACACQACAEAAADQAAAIgGAEQgGAEgKABQgFgBgFgCg");
	this.shape_40.setTransform(29.65,40.45);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgDAGAAQALgBAFAIQAGAGAAANIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_41.setTransform(24.475,40.45);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAIAAIAEABIAAALIgFAAQgIgBgCAHIAAAjg");
	this.shape_42.setTransform(20.25,40.4);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgGASIAAgdIgIAAIAAgJIAIAAIAAgMIAMAAIAAAMIAJAAIAAAJIgJAAIAAAdIABAEIAEABIAEAAIAAAJIgIABQgNAAAAgPg");
	this.shape_43.setTransform(159.45,23.875);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAFIAAAAIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFAAgEADg");
	this.shape_44.setTransform(155.225,24.45);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgFAlIAAhJIALAAIAABJg");
	this.shape_45.setTransform(151.225,23.35);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAFIAAAAIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFAAgEADg");
	this.shape_46.setTransform(147.275,24.45);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_47.setTransform(133.425,23.45);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAFIAAAAIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFAAgEADg");
	this.shape_48.setTransform(129.475,24.45);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgLAjQgFgDgDgEIAFgGQAGAGAIAAQAFAAADgDQADgEAAgFIAAgEQgFAGgHgBQgJAAgGgHQgGgIAAgMQAAgMAGgHQAFgHAKgBQAIABAFAGIABgGIAKAAIAAAzQAAAKgGAHQgHAFgKAAQgFAAgGgCgAgHgWQgDAFAAAIQAAAIADAFQADAEAFAAQAHAAADgHIAAgVQgDgHgHAAQgFABgDAEg");
	this.shape_49.setTransform(123.825,25.45);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAFIAAAAIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFAAgEADg");
	this.shape_50.setTransform(118.425,24.45);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAHQAFAIAAAMIAAAAQAAAMgFAIQgGAHgJAAQgJAAgFgHgAgKAAIAAAWQADAGAHABQAFAAADgFQADgEAAgIIAAgCQAAgJgDgDQgDgEgFAAQgHAAgDAGg");
	this.shape_51.setTransform(112.975,23.4);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgGAFgEQAGgDAGgBQALAAAFAIQAGAGAAANIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAGQgDAFgFADQgFADgHgBQgKABgHgIgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_52.setTransform(107.425,24.45);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgFQgDgEAAgEIAMAAQAAAEADADQADABAEAAQAEABADgCQACgCAAgDQAAgDgCgCQgDgBgFgBIgKgEQgJgDAAgIQAAgHAFgEQAHgGAIAAQAJAAAGAGQAFAEAAAHIgMAAQAAgDgCgCQgDgCgDgBQgDAAgDACQgCACAAADQAAADACABQACACAGACIALADQAEABACAEQACADAAADQAAAIgGAEQgGAFgJgBQgGABgFgDg");
	this.shape_53.setTransform(102.1,24.45);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_54.setTransform(88.425,23.45);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgFQgDgEAAgEIAMAAQAAAEADADQADABADAAQAFABADgCQACgCAAgDQAAgDgCgCQgDgBgFgBIgKgEQgJgDAAgIQAAgHAFgEQAGgGAIAAQAKAAAGAGQAFAEAAAHIgLAAQgBgDgCgCQgDgCgEgBQgCAAgDACQgCACgBADQABADACABQACACAGACIALADQAEABACAEQACADAAADQAAAIgGAEQgGAFgKgBQgFABgFgDg");
	this.shape_55.setTransform(84.55,24.45);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgLAjQgFgDgDgEIAFgGQAGAGAIAAQAFAAADgDQADgEAAgFIAAgEQgFAGgHgBQgJAAgGgHQgGgIAAgMQAAgMAGgHQAFgHAKgBQAIABAFAGIABgGIAKAAIAAAzQAAAKgGAHQgHAFgKAAQgFAAgGgCgAgHgWQgDAFAAAIQAAAIADAFQADAEAFAAQAHAAADgHIAAgVQgDgHgHAAQgFABgDAEg");
	this.shape_56.setTransform(79.075,25.45);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_57.setTransform(73.575,24.4);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgJIAAgiIAMAAIAAAiQAAAJAIABQAIAAADgHIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_58.setTransform(68.025,24.5);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgHAmIAAgrIgJAAIAAgJIAJAAIAAgFQAAgIAEgFQAEgFAJAAIAHABIgBAJIgEgBQgJABAAAIIAAAFIALAAIAAAJIgLAAIAAArg");
	this.shape_59.setTransform(63.575,23.3);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAHAAIAFABIAAALIgFAAQgIAAgCAGIAAAjg");
	this.shape_60.setTransform(60.2,24.4);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgGAFgEQAGgDAGgBQALAAAFAIQAGAGAAANIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAGQgDAFgFADQgFADgHgBQgKABgHgIgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_61.setTransform(55.575,24.45);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAHQAFAIAAAMIAAAAQAAAMgFAIQgGAHgJAAQgJAAgFgHgAgKAAIAAAWQADAGAHABQAFAAADgFQADgEAAgIIAAgCQAAgJgDgDQgDgEgFAAQgHAAgDAGg");
	this.shape_62.setTransform(50.125,23.4);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAFIAAAAIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFAAgEADg");
	this.shape_63.setTransform(34.675,24.45);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgLAjQgFgDgDgEIAFgGQAGAGAIAAQAFAAADgDQADgEAAgFIAAgEQgFAGgHgBQgJAAgGgHQgGgIAAgMQAAgMAGgHQAFgHAKgBQAIABAFAGIABgGIAKAAIAAAzQAAAKgGAHQgHAFgKAAQgFAAgGgCgAgHgWQgDAFAAAIQAAAIADAFQADAEAFAAQAHAAADgHIAAgVQgDgHgHAAQgFABgDAEg");
	this.shape_64.setTransform(29.025,25.45);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgJIAAgiIAMAAIAAAiQAAAJAIABQAIAAADgHIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_65.setTransform(23.525,24.5);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgKAuIAAgJIAEAAQAGAAAAgGIAAg5IALAAIAAA4QAAAJgEAEQgEAEgHAAIgGgBgAAAgjQAAgBAAAAQAAgBgBAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQABgBAAAAQAAgBAAAAQABgCAEAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAABQABAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAABAAAAQAAABAAABQAAAAgBABQAAAAgBABQAAAAgBAAQAAABgBAAQAAAAgBAAQAAAAgBAAQgEAAgBgBg");
	this.shape_66.setTransform(19.025,24.525);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AAKAlIgPgWIgFAFIAAARIgMAAIAAhKIAMAAIAAArIADgFIAOgQIAOAAIgTAWIAVAeg");
	this.shape_67.setTransform(159.075,7.35);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAXQAAAIACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_68.setTransform(153.475,8.45);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IAMAAIAAAGQADgHAIAAIAEABIgBALIgEgBQgIABgCAGIAAAjg");
	this.shape_69.setTransform(149.25,8.4);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_70.setTransform(144.625,8.45);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgLAjQgFgCgDgEIAFgHQAGAGAIAAQAFAAADgDQADgDAAgHIAAgDQgFAGgHgBQgJABgGgIQgGgHAAgNQAAgMAGgHQAFgIAKAAQAIAAAFAHIABgGIAKAAIAAAzQAAAKgGAGQgHAGgKABQgFAAgGgDgAgHgWQgDAFAAAIQAAAJADAEQADAEAFAAQAHAAADgGIAAgXQgDgFgHgBQgFAAgDAFg");
	this.shape_71.setTransform(138.975,9.45);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAIAAIAEABIgBALIgEgBQgIABgCAGIAAAjg");
	this.shape_72.setTransform(134.75,8.4);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_73.setTransform(130.125,8.45);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAIQAFAGAAANIAAAAQAAANgFAGQgGAIgJAAQgJAAgFgHgAgKAAIAAAVQADAIAHAAQAFgBADgEQADgEAAgIIAAgCQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_74.setTransform(124.675,7.4);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AAKAlIgPgWIgFAFIAAARIgMAAIAAhKIAMAAIAAArIADgFIAOgQIAOAAIgTAWIAVAeg");
	this.shape_75.setTransform(110.775,7.35);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgJIAAgiIAMAAIAAAiQAAAKAIAAQAIgBADgGIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_76.setTransform(105.075,8.5);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgGASIAAgdIgIAAIAAgJIAIAAIAAgMIAMAAIAAAMIAJAAIAAAJIgJAAIAAAdIABAEIAEABIAEAAIAAAJIgHABQgOAAAAgPg");
	this.shape_77.setTransform(100.5,7.875);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_78.setTransform(96.175,8.4);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgJIAAgiIAMAAIAAAiQAAAKAIAAQAIgBADgGIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_79.setTransform(90.625,8.5);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_80.setTransform(76.375,8.4);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_81.setTransform(72.325,7.45);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAXQAAAIACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_82.setTransform(68.375,8.45);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgFAlIAAhKIALAAIAABKg");
	this.shape_83.setTransform(64.375,7.35);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_84.setTransform(60.475,8.45);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgFQgDgEAAgEIALAAQABAEADACQADACADAAQAFAAADgBQACgCAAgDQAAgDgDgCQgCgCgFAAIgKgEQgJgDAAgJQAAgGAGgEQAGgFAHgBQAKABAGAFQAFAEABAHIgNAAQAAgDgCgCQgDgDgEAAQgDAAgCADQgDABAAADQAAADADACQACABAGACIALADQAEACACADQACACAAAFQAAAGgGAFQgGAFgKgBQgFAAgFgCg");
	this.shape_85.setTransform(55.15,8.45);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AAKAlIAAghQAAgFgCgCQgDgCgEgBQgGAAgEAGIAAAlIgMAAIAAhKIAMAAIAAAcQAGgGAIgBQARABAAASIAAAig");
	this.shape_86.setTransform(41.125,7.35);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgJIAAgiIAMAAIAAAiQAAAKAIAAQAIgBADgGIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_87.setTransform(35.575,8.5);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAIQAFAGAAANIAAAAQAAANgFAGQgGAIgJAAQgJAAgFgHgAgKAAIAAAVQADAIAHAAQAFgBADgEQADgEAAgIIAAgCQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_88.setTransform(30.075,7.4);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgJIAAgiIAMAAIAAAiQAAAKAIAAQAIgBADgGIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_89.setTransform(24.375,8.5);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AgFASIAAgdIgJAAIAAgJIAJAAIAAgMIAKAAIAAAMIAKAAIAAAJIgKAAIAAAdIABAEIAFABIAEAAIAAAJIgIABQgNAAABgPg");
	this.shape_90.setTransform(19.8,7.875);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_91.setTransform(158.475,-7.6);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAIACADIAAACIgNAAIgBgGQgGAGgHABQgIAAgFgFgAgHAEQgDACAAAFQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFgBgEADg");
	this.shape_92.setTransform(153.025,-7.55);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgCACgBQADABACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_93.setTransform(149.025,-8.55);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AgLAjQgFgDgDgDIAFgIQAGAHAIAAQAFAAADgDQADgDAAgHIAAgDQgFAGgHAAQgJAAgGgIQgGgHAAgMQAAgNAGgHQAFgIAKABQAIgBAFAHIABgFIAKAAIAAAyQAAALgGAFQgHAHgKAAQgFgBgGgCgAgHgWQgDAEAAAKQAAAHADAEQADAFAFAAQAHAAADgGIAAgXQgDgFgHAAQgFgBgDAFg");
	this.shape_94.setTransform(144.825,-6.55);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAIACADIAAACIgNAAIgBgGQgGAGgHABQgIAAgFgFgAgHAEQgDACAAAFQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFgBgEADg");
	this.shape_95.setTransform(139.425,-7.55);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAIQAFAGAAAMIAAABQAAANgFAGQgGAIgJAAQgJAAgFgHgAgKAAIAAAVQADAIAHgBQAFAAADgEQADgEAAgJIAAgBQAAgJgDgDQgDgEgFAAQgHAAgDAGg");
	this.shape_96.setTransform(133.975,-8.6);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAAAQACgCACgBQADABACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_97.setTransform(118.725,-8.55);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AAKAmIgPgXIgFAGIAAARIgMAAIAAhLIAMAAIAAArIADgFIAOgPIAOAAIgTAUIAVAgg");
	this.shape_98.setTransform(115.175,-8.65);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAAAQACgCACgBQADABACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_99.setTransform(110.975,-8.55);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AgFAmIAAhLIALAAIAABLg");
	this.shape_100.setTransform(108.425,-8.65);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAAAQACgCACgBQADABACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_101.setTransform(105.875,-8.55);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AAZAbIAAgiQAAgEgCgDQgCgCgFAAQgEAAgDACQgCACgBAEIAAAjIgLAAIAAgiQAAgJgJAAQgIAAgCAGIAAAlIgNAAIAAg0IALAAIABAGQAFgHAKAAQAKAAAEAIQAGgIAKAAQAJAAAEAFQAFAFAAAJIAAAig");
	this.shape_102.setTransform(100.25,-7.6);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgGAFgEQAGgDAGAAQALAAAFAGQAGAIAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgGIAGAGQgDAFgFACQgFADgHAAQgKgBgHgGgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_103.setTransform(93.275,-7.55);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AAZAbIAAgiQAAgEgBgDQgDgCgFAAQgEAAgDACQgCACgBAEIAAAjIgLAAIAAgiQAAgJgJAAQgHAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAFgHAKAAQAKAAAEAIQAGgIAKAAQAJAAAEAFQAFAFgBAJIAAAig");
	this.shape_104.setTransform(86.2,-7.6);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgCACgBQADABACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_105.setTransform(69.525,-8.55);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_106.setTransform(65.475,-7.6);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgCACgBQADABACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_107.setTransform(61.425,-8.55);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_108.setTransform(46.325,-7.6);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAIACADIAAACIgNAAIgBgGQgGAGgHABQgIAAgFgFgAgHAEQgDACAAAFQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFgBgEADg");
	this.shape_109.setTransform(40.875,-7.55);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AALAbIgLgkIgKAkIgKAAIgOg0IALAAIAIAjIALgjIAIAAIALAjIAJgjIAMAAIgPA0g");
	this.shape_110.setTransform(34.4,-7.55);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgGAFgEQAGgDAGAAQALAAAFAGQAGAIAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgGIAGAGQgDAFgFACQgFADgHAAQgKgBgHgGgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_111.setTransform(28.075,-7.55);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AAQAkIAAggIgfAAIAAAgIgMAAIAAhGIAMAAIAAAdIAfAAIAAgdIAMAAIAABGg");
	this.shape_112.setTransform(21.775,-8.45);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FF8C2D").s().p("AtPm+IafgYIAAOTI6fAag");
	this.shape_113.setTransform(87.425,23.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	// Layer_2
	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("rgba(0,0,0,0.227)").s().p("AtJHQIAAufIaTAAIAAOfg");
	this.shape_114.setTransform(76.775,34.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_114).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7.4,-23.5,179.70000000000002,104);


(lib.drag12G4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgFAmIAAhKIALAAIAABKg");
	this.shape.setTransform(34.125,13.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgFAlIAAg1IALAAIAAA1gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_1.setTransform(31.575,13.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgPAUQgHgHAAgNIAAAAQAAgMAHgHQAGgHAKAAQAKAAAGAFQAFAFABAJIgLAAQgBgEgDgDQgCgDgFAAQgFAAgDAEQgDAFAAAIIAAABQAAAJADAEQADAEAFAAQAEAAADgCQADgDABgEIALAAQAAAFgDAEQgDAFgFACQgFACgGAAQgKABgGgIg");
	this.shape_2.setTransform(27.775,14.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgDAGAAQALgBAFAIQAGAGAAANIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHAAQgKABgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_3.setTransform(22.475,14.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAKAmIgPgXIgFAGIAAARIgMAAIAAhKIAMAAIAAAqIADgFIAOgQIAOAAIgTAVIAVAgg");
	this.shape_4.setTransform(17.475,13.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_5.setTransform(9.275,14.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAXQAAAGACAFIAAABIgNAAIgBgGQgGAHgHgBQgIAAgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_6.setTransform(3.825,14.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_7.setTransform(-1.675,14.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAXQAAAGACAFIAAABIgNAAIgBgGQgGAHgHgBQgIAAgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_8.setTransform(-7.125,14.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAKAmIgPgXIgFAGIAAARIgMAAIAAhKIAMAAIAAAqIADgFIAOgQIAOAAIgTAVIAVAgg");
	this.shape_9.setTransform(-12.125,13.7);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAXQAAAGACAFIAAABIgNAAIgBgGQgGAHgHgBQgIAAgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_10.setTransform(-17.725,14.8);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAaAbIAAghQAAgGgCgBQgDgDgFAAQgEAAgDACQgCACgBAEIAAAjIgLAAIAAgiQAAgJgKAAQgGAAgEAFIAAAmIgLAAIAAg0IAKAAIABAFQAFgGALAAQAJAAAEAIQAFgIALAAQAJAAAEAFQAEAFAAAKIAAAhg");
	this.shape_11.setTransform(-24.8,14.75);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_12.setTransform(68.875,-0.225);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAFIAAAAIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFAAgEADg");
	this.shape_13.setTransform(63.275,-1.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAKAlIgPgWIgFAFIAAARIgMAAIAAhJIAMAAIAAAqIADgFIAOgQIAOAAIgTAWIAVAeg");
	this.shape_14.setTransform(58.275,-2.3);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgLAjQgFgDgDgEIAFgGQAGAGAIAAQAFAAADgDQADgEAAgFIAAgEQgFAGgHgBQgJAAgGgHQgGgIAAgMQAAgMAGgHQAFgHAKgBQAIABAFAGIABgGIAKAAIAAAzQAAAKgGAHQgHAFgKAAQgFAAgGgCgAgHgWQgDAFAAAIQAAAIADAFQADAEAFAAQAHAAADgHIAAgVQgDgHgHAAQgFABgDAEg");
	this.shape_15.setTransform(52.425,-0.2);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_16.setTransform(46.925,-1.25);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAFIAAAAIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFAAgEADg");
	this.shape_17.setTransform(41.475,-1.2);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_18.setTransform(35.975,-1.25);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgGAFgEQAGgDAGgBQALAAAFAIQAGAGAAANIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAGQgDAFgFADQgFADgHgBQgKABgHgIgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_19.setTransform(30.575,-1.2);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAZAbIAAghQAAgGgCgCQgCgCgFAAQgEAAgCACQgDADgBADIAAAjIgLAAIAAgiQAAgJgJAAQgIAAgCAFIAAAmIgNAAIAAg0IAMAAIAAAFQAGgGAJAAQAKAAAEAJQAGgJAKAAQAJAAAEAFQAEAFABAKIAAAhg");
	this.shape_20.setTransform(23.5,-1.25);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_21.setTransform(13.875,-1.25);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAFIAAAAIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFAAgEADg");
	this.shape_22.setTransform(8.425,-1.2);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgRAfQgFgIAAgNQAAgLAFgIQAGgHAKAAQAHAAAFAGIAAgbIAMAAIAABKIgLAAIAAgGQgGAHgHAAQgJAAgHgHgAgHgCQgEAEABAJQgBAIAEAFQADAFAEAAQAIAAADgHIAAgWQgDgGgIAAQgEAAgDAEg");
	this.shape_23.setTransform(2.75,-2.25);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_24.setTransform(-3.725,-2.2);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAHAAIAFABIAAALIgFAAQgIAAgCAGIAAAjg");
	this.shape_25.setTransform(-6.5,-1.25);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_26.setTransform(-9.775,-2.2);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgRAfQgFgIAAgNQAAgLAFgIQAGgHAKAAQAHAAAFAGIAAgbIAMAAIAABKIgLAAIAAgGQgGAHgHAAQgKAAgGgHgAgHgCQgEAEABAJQgBAIAEAFQADAFAEAAQAIAAADgHIAAgWQgDgGgIAAQgEAAgDAEg");
	this.shape_27.setTransform(-14,-2.25);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_28.setTransform(-19.475,-1.25);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgGAFgEQAGgDAGgBQALAAAFAIQAGAGAAANIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAGQgDAFgFADQgFADgHgBQgKABgHgIgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_29.setTransform(-24.875,-1.2);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgFQgDgEAAgEIAMAAQAAAEADACQADACADAAQAFABADgCQACgCAAgDQAAgDgCgCQgDgBgFgBIgKgEQgJgDAAgIQAAgHAFgEQAGgGAIAAQAKAAAGAGQAFAEAAAHIgMAAQAAgDgCgCQgDgCgEgBQgCAAgDACQgCACgBADQABADACABQACACAGACIALADQAEABACAEQACACAAAEQAAAIgGAEQgGAFgKgBQgFABgFgDg");
	this.shape_30.setTransform(-30.2,-1.2);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAFIAAAAIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFAAgEADg");
	this.shape_31.setTransform(-37.925,-1.2);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgSAkIAAgJIACAAQAEAAADgBIADgGIACgFIgTgzIANAAIAKAkIALgkIANAAIgVA8QgEANgMAAIgFgBg");
	this.shape_32.setTransform(-43.075,-0.125);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_33.setTransform(-48.275,-1.25);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_34.setTransform(-52.325,-2.2);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAHAAIAFABIAAALIgFAAQgIAAgCAGIAAAjg");
	this.shape_35.setTransform(-55.1,-1.25);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_36.setTransform(-58.375,-2.2);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgRAfQgFgIAAgNQAAgLAFgIQAGgHAKAAQAHAAAFAGIAAgbIAMAAIAABKIgLAAIAAgGQgGAHgHAAQgKAAgGgHgAgHgCQgEAEABAJQgBAIAEAFQADAFAEAAQAIAAADgHIAAgWQgDgGgIAAQgEAAgDAEg");
	this.shape_37.setTransform(-62.6,-2.25);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_38.setTransform(70.925,-17.25);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAXQAAAIACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_39.setTransform(65.475,-17.2);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AAKAlIgPgWIgFAFIAAARIgMAAIAAhKIAMAAIAAArIADgFIAOgQIAOAAIgTAWIAVAeg");
	this.shape_40.setTransform(60.475,-18.3);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AAKAlIAAghQAAgFgCgCQgDgCgEgBQgGAAgEAGIAAAlIgMAAIAAhKIAMAAIAAAcQAGgGAIgBQARABAAASIAAAig");
	this.shape_41.setTransform(54.775,-18.3);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_42.setTransform(50.725,-18.2);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgFQgDgEAAgEIAMAAQAAAEADACQADACADAAQAFAAADgBQACgCAAgDQAAgDgCgCQgDgCgFAAIgKgEQgJgDAAgJQAAgGAFgEQAGgFAIgBQAKABAGAFQAFAEAAAHIgMAAQABgDgDgCQgDgDgEAAQgCAAgDADQgCABgBADQABADACACQACABAGACIALADQAEACACADQACACAAAFQAAAGgGAFQgGAFgKgBQgFAAgFgCg");
	this.shape_43.setTransform(46.85,-17.2);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IAMAAIAAAGQADgHAHAAIAFABIAAALIgFgBQgIABgCAGIAAAjg");
	this.shape_44.setTransform(42.8,-17.25);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_45.setTransform(38.175,-17.2);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAIQAFAGAAANIAAAAQAAANgFAGQgGAIgJAAQgJAAgFgHgAgKAAIAAAVQADAIAHAAQAFgBADgEQADgEAAgJIAAgBQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_46.setTransform(32.725,-18.25);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AAZAbIAAgiQAAgEgBgDQgDgCgFAAQgEAAgDACQgCADgBADIAAAjIgLAAIAAgiQAAgJgJAAQgHAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAFgHAKAAQAKAAAEAJQAGgJAKAAQAJAAAEAFQAFAFgBAJIAAAig");
	this.shape_47.setTransform(25.45,-17.25);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_48.setTransform(18.475,-17.2);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AAZAbIAAgiQAAgEgBgDQgDgCgFAAQgEAAgDACQgCADgBADIAAAjIgLAAIAAgiQAAgJgKAAQgGAAgEAGIAAAlIgLAAIAAg0IAKAAIABAGQAFgHAKAAQAKAAAEAJQAGgJAKAAQAJAAAEAFQAFAFgBAJIAAAig");
	this.shape_49.setTransform(11.4,-17.25);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgGASIAAgdIgIAAIAAgJIAIAAIAAgMIAMAAIAAAMIAJAAIAAAJIgJAAIAAAdIABAEIAEABIAEAAIAAAJIgHABQgOAAAAgPg");
	this.shape_50.setTransform(2.75,-17.775);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAXQAAAIACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_51.setTransform(-1.475,-17.2);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_52.setTransform(-6.925,-16.225);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAXQAAAIACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_53.setTransform(-12.525,-17.2);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgRAeQgFgHAAgNQAAgLAFgHQAGgIAJAAQAIAAAGAGIAAgbIALAAIAABKIgKAAIgBgGQgFAHgJAAQgJAAgGgIgAgHgCQgDAEgBAJQABAJADAEQADAEAEABQAIgBAEgGIAAgWQgEgGgIAAQgEAAgDAEg");
	this.shape_54.setTransform(-18.2,-18.25);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_55.setTransform(-24.675,-18.2);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_56.setTransform(-28.725,-17.25);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_57.setTransform(-32.775,-18.2);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_58.setTransform(-39.325,-17.25);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAXQAAAIACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_59.setTransform(-44.775,-17.2);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AALAaIgLgjIgKAjIgKAAIgPg0IAMAAIAIAkIAMgkIAIAAIALAkIAIgkIALAAIgOA0g");
	this.shape_60.setTransform(-51.25,-17.2);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_61.setTransform(-57.575,-17.2);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AAQAjIAAgfIgfAAIAAAfIgMAAIAAhGIAMAAIAAAeIAfAAIAAgeIAMAAIAABGg");
	this.shape_62.setTransform(-63.875,-18.1);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_63.setTransform(3.625,-2.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	// Layer_2
	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("rgba(0,0,0,0.227)").s().p("AtJEQIAAogIaTAAIAAIgg");
	this.shape_64.setTransform(-1.825,5.15);

	this.timeline.addTween(cjs.Tween.get(this.shape_64).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-30.6,173.9,63);


(lib.drag12G3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAIACADIAAACIgNAAIgBgGQgGAGgHABQgIAAgFgFgAgHAEQgDACAAAFQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFgBgEADg");
	this.shape.setTransform(46.825,48.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IAMAAIAAAGQADgHAIAAIAEABIgBALIgEgBQgIAAgCAHIAAAjg");
	this.shape_1.setTransform(42.6,48.65);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgRAUQgGgHgBgNIAAAAQAAgHAEgHQADgFAFgEQAFgDAHAAQAKAAAIAGQAGAIABALIAAACQAAAHgEAGQgDAHgFADQgGAEgHAAQgKAAgHgIgAgIgMQgEAEAAAJQAAAIAEAEQADAFAFAAQAGAAAEgFQACgFAAgIQABgIgEgEQgDgFgGAAQgFAAgDAFg");
	this.shape_2.setTransform(37.75,48.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgEAbIgSg0IAMAAIAKAlIAMglIALAAIgSA0g");
	this.shape_3.setTransform(32.4,48.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgCACgBQADABACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_4.setTransform(28.675,47.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgDQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_5.setTransform(24.625,48.65);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAaAbIAAgiQAAgEgCgDQgDgCgFAAQgEAAgDACQgCACgBAEIAAAjIgLAAIAAgiQAAgJgKAAQgGAAgEAGIAAAlIgLAAIAAg0IAKAAIABAGQAFgHALAAQAJAAAEAIQAFgIALAAQAJAAAEAFQAEAFAAAJIAAAig");
	this.shape_6.setTransform(17.5,48.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgRAUQgGgHgBgNIAAAAQAAgHAEgHQADgFAFgEQAFgDAHAAQAKAAAIAGQAGAIABALIAAACQAAAHgEAGQgDAHgFADQgGAEgHAAQgKAAgHgIgAgIgMQgEAEAAAJQAAAIAEAEQADAFAFAAQAGAAADgFQADgFAAgIQABgIgEgEQgDgFgGAAQgFAAgDAFg");
	this.shape_7.setTransform(10.3,48.7);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgGASIAAgdIgIAAIAAgJIAIAAIAAgMIAMAAIAAAMIAJAAIAAAJIgJAAIAAAdIABAEIAEABIAEAAIAAAJIgHABQgNAAgBgPg");
	this.shape_8.setTransform(163.75,32.125);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_9.setTransform(159.525,32.7);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgHAmIAAgrIgJAAIAAgJIAJAAIAAgEQAAgKAEgEQAEgFAJAAIAHABIgBAJIgEAAQgJgBAAAKIAAAEIALAAIAAAJIgLAAIAAArg");
	this.shape_10.setTransform(155.125,31.55);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_11.setTransform(151.975,31.7);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgEQgDgEAAgFIAMAAQAAAEADADQADACADAAQAFgBADgBQACgCAAgDQAAgDgCgBQgDgCgFgCIgKgDQgJgDAAgIQAAgHAFgFQAGgEAIAAQAKAAAGAEQAFAFAAAIIgMAAQABgEgDgCQgDgDgEABQgCAAgDABQgCACgBADQABADACACQACABAGABIALAEQAEABACADQACAEAAADQAAAIgGAEQgGAEgKABQgFgBgFgCg");
	this.shape_12.setTransform(148.1,32.7);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IAMAAIAAAGQADgHAHAAIAFABIAAALIgFAAQgIgBgCAHIAAAjg");
	this.shape_13.setTransform(144.05,32.65);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgEAGABQALgBAFAIQAGAGAAANIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgGgDgDQgCgDgFAAQgEAAgDADg");
	this.shape_14.setTransform(139.425,32.7);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgLAgIAAAFIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAHQAFAIAAALIAAABQAAAMgFAIQgGAHgJAAQgJAAgFgGgAgKAAIAAAWQADAGAHAAQAFABADgFQADgEAAgJIAAgBQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_15.setTransform(133.975,31.65);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgFASIAAgdIgJAAIAAgJIAJAAIAAgMIALAAIAAAMIAJAAIAAAJIgJAAIAAAdIABAEIAEABIAEAAIAAAJIgIABQgMAAAAgPg");
	this.shape_16.setTransform(119.5,32.125);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_17.setTransform(115.275,32.7);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_18.setTransform(109.825,33.675);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_19.setTransform(104.225,32.7);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgQAfQgGgIAAgNQAAgLAGgIQAFgHAJAAQAIAAAGAGIAAgbIALAAIAABKIgKAAIgBgFQgFAGgJAAQgIAAgGgHgAgHgBQgDADgBAJQABAJADAEQADAFAFgBQAHABAEgHIAAgWQgEgGgHAAQgFAAgDAFg");
	this.shape_20.setTransform(98.55,31.65);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_21.setTransform(83.425,32.7);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgRAfQgFgIAAgNQAAgLAFgIQAGgHAJAAQAIAAAGAGIAAgbIALAAIAABKIgKAAIgBgFQgFAGgJAAQgJAAgGgHgAgHgBQgDADgBAJQABAJADAEQADAFAEgBQAIABAEgHIAAgWQgEgGgIAAQgEAAgDAFg");
	this.shape_22.setTransform(77.75,31.65);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgEAGABQALgBAFAIQAGAGAAANIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgGgDgDQgCgDgFAAQgEAAgDADg");
	this.shape_23.setTransform(72.425,32.7);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgLAgIAAAFIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAHQAFAIAAALIAAABQAAAMgFAIQgGAHgJAAQgJAAgFgGgAgKAAIAAAWQADAGAHAAQAFABADgFQADgEAAgJIAAgBQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_24.setTransform(66.975,31.65);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAIAAIAEABIAAALIgFAAQgIgBgCAHIAAAjg");
	this.shape_25.setTransform(62.55,32.65);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgEAGABQALgBAFAIQAGAGAAANIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgGgDgDQgCgDgFAAQgEAAgDADg");
	this.shape_26.setTransform(57.925,32.7);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgLAgIAAAFIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAHQAFAIAAALIAAABQAAAMgFAIQgGAHgJAAQgJAAgFgGgAgKAAIAAAWQADAGAHAAQAFABADgFQADgEAAgJIAAgBQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_27.setTransform(52.475,31.65);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_28.setTransform(38.525,31.7);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgEQgDgEAAgFIALAAQABAEADADQADACAEAAQAFgBACgBQACgCAAgDQAAgDgDgBQgCgCgFgCIgKgDQgJgDAAgIQAAgHAGgFQAFgEAJAAQAJAAAFAEQAHAFAAAIIgMAAQAAgEgDgCQgCgDgEABQgDAAgDABQgCACAAADQAAADACACQACABAGABIALAEQAEABACADQACAEAAADQAAAIgGAEQgGAEgJABQgGgBgFgCg");
	this.shape_29.setTransform(34.65,32.7);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_30.setTransform(30.825,31.7);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgRAfQgFgIAAgNQAAgLAFgIQAGgHAKAAQAHAAAFAGIAAgbIAMAAIAABKIgLAAIAAgFQgGAGgHAAQgJAAgHgHgAgHgBQgEADABAJQgBAJAEAEQADAFAEgBQAIABADgHIAAgWQgDgGgIAAQgEAAgDAFg");
	this.shape_31.setTransform(26.6,31.65);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_32.setTransform(21.125,32.65);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgRAUQgGgIAAgMIAAAAQgBgHADgHQAEgFAFgEQAGgEAGABQAKgBAIAIQAGAGAAAMIAAACQAAAHgDAGQgDAHgFADQgGADgHABQgKgBgHgHgAgIgMQgEAEAAAJQAAAIAEAEQADAFAFAAQAGAAAEgFQACgFAAgIQAAgIgDgEQgDgFgGAAQgFAAgDAFg");
	this.shape_33.setTransform(15.5,32.7);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AAKAmIgPgXIgFAGIAAARIgMAAIAAhLIAMAAIAAArIADgFIAOgPIAOAAIgTAUIAVAgg");
	this.shape_34.setTransform(10.375,31.6);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgFAlIAAg1IALAAIAAA1gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_35.setTransform(164.175,15.7);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_36.setTransform(160.175,17.675);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAJIAAAXQAAAHACAEIAAABIgNAAIgBgGQgGAHgHgBQgIAAgFgEgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFABgEACg");
	this.shape_37.setTransform(154.575,16.7);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgGASIAAgdIgIAAIAAgJIAIAAIAAgMIALAAIAAAMIAKAAIAAAJIgKAAIAAAdIABAEIAFABIAEAAIAAAJIgHABQgNAAgBgPg");
	this.shape_38.setTransform(150.05,16.125);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgHAKIAEgIIABgFIAAgKIAKAAIAAAJQAAAEgDAFQgCAFgDAEg");
	this.shape_39.setTransform(139.425,19.575);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_40.setTransform(135.725,16.65);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgKIAAghIAMAAIAAAhQAAALAIAAQAIAAADgHIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_41.setTransform(130.175,16.75);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AAaAbIAAghQgBgGgCgBQgCgDgFAAQgEAAgCACQgDADgBADIAAAjIgLAAIAAgiQAAgJgJAAQgIAAgCAFIAAAmIgMAAIAAg0IALAAIAAAFQAGgGAKAAQAJAAAEAIQAGgIAKAAQAJAAAEAFQAEAFABAKIAAAhg");
	this.shape_42.setTransform(123.05,16.65);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAJIAAAXQAAAHACAEIAAABIgNAAIgBgGQgGAHgHgBQgIAAgFgEgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFABgEACg");
	this.shape_43.setTransform(116.025,16.7);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgFAmIAAhKIALAAIAABKg");
	this.shape_44.setTransform(112.025,15.6);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_45.setTransform(100.175,16.65);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAJIAAAXQAAAHACAEIAAABIgNAAIgBgGQgGAHgHgBQgIAAgFgEgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFABgEACg");
	this.shape_46.setTransform(94.725,16.7);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgRAfQgFgIAAgNQAAgLAFgIQAGgHAKAAQAHAAAFAGIAAgbIAMAAIAABKIgLAAIAAgFQgGAGgHAAQgKAAgGgHgAgHgCQgEAEABAJQgBAIAEAFQADAFAEAAQAIAAADgHIAAgWQgDgGgIAAQgEAAgDAEg");
	this.shape_47.setTransform(89.05,15.65);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAJIAAAXQAAAHACAEIAAABIgNAAIgBgGQgGAHgHgBQgIAAgFgEgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFABgEACg");
	this.shape_48.setTransform(75.875,16.7);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgLAjQgFgDgDgEIAFgGQAGAGAIAAQAFAAADgDQADgEAAgFIAAgEQgFAFgHAAQgJAAgGgHQgGgIAAgMQAAgLAGgIQAFgHAKgBQAIABAFAGIABgGIAKAAIAAAzQAAAKgGAHQgHAFgKAAQgFAAgGgCgAgHgWQgDAEAAAJQAAAIADAFQADAEAFAAQAHAAADgHIAAgVQgDgHgHAAQgFABgDAEg");
	this.shape_49.setTransform(70.225,17.7);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgFAmIAAhKIALAAIAABKg");
	this.shape_50.setTransform(66.225,15.6);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAJIAAAXQAAAHACAEIAAABIgNAAIgBgGQgGAHgHgBQgIAAgFgEgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFABgEACg");
	this.shape_51.setTransform(62.275,16.7);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_52.setTransform(48.975,16.65);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAJIAAAXQAAAHACAEIAAABIgNAAIgBgGQgGAHgHgBQgIAAgFgEgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFABgEACg");
	this.shape_53.setTransform(43.525,16.7);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AAKAmIgPgXIgFAFIAAASIgMAAIAAhKIAMAAIAAAqIADgFIAOgQIAOAAIgTAWIAVAfg");
	this.shape_54.setTransform(38.525,15.6);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAJIAAAXQAAAHACAEIAAABIgNAAIgBgGQgGAHgHgBQgIAAgFgEgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFABgEACg");
	this.shape_55.setTransform(32.925,16.7);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AAaAbIAAghQgBgGgCgBQgCgDgFAAQgEAAgCACQgDADgBADIAAAjIgLAAIAAgiQAAgJgKAAQgHAAgCAFIAAAmIgMAAIAAg0IALAAIAAAFQAGgGAKAAQAJAAAEAIQAGgIAKAAQAJAAAEAFQAEAFABAKIAAAhg");
	this.shape_56.setTransform(25.85,16.65);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgGAFgEQAGgDAGgBQALAAAFAIQAGAHAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAGQgDAFgFADQgFADgHgBQgKABgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_57.setTransform(18.875,16.7);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AAZAbIAAghQAAgGgCgBQgCgDgFAAQgEAAgCACQgDADgBADIAAAjIgLAAIAAgiQAAgJgJAAQgIAAgCAFIAAAmIgNAAIAAg0IAMAAIAAAFQAGgGAJAAQAKAAAEAIQAGgIAKAAQAJAAAEAFQAEAFABAKIAAAhg");
	this.shape_58.setTransform(11.8,16.65);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgMIAAgBQAAgHADgGQADgHAFgDQAGgDAGgBQALAAAFAHQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_59.setTransform(162.825,0.7);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAIAAIAEABIgBALIgEgBQgIABgCAGIAAAjg");
	this.shape_60.setTransform(158.6,0.65);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgRAUQgGgIgBgMIAAAAQAAgHADgGQADgHAGgDQAFgDAHgBQAKAAAIAHQAGAIABALIAAABQgBAIgDAHQgDAFgFAEQgGAEgHgBQgKABgHgIgAgIgMQgEAFAAAHQAAAJAEAFQADAEAFAAQAGAAAEgEQACgGAAgIQABgHgEgFQgDgFgGAAQgFAAgDAFg");
	this.shape_61.setTransform(153.75,0.7);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgEAaIgSg0IAMAAIAKAmIAMgmIALAAIgSA0g");
	this.shape_62.setTransform(148.4,0.7);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_63.setTransform(144.675,-0.3);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAIQAFAGAAANIAAAAQAAAMgFAIQgGAHgJAAQgJAAgFgHgAgKAAIAAAVQADAIAHAAQAFgBADgEQADgEAAgIIAAgCQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_64.setTransform(140.675,-0.35);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAHAAIAFABIAAALIgFgBQgIABgCAGIAAAjg");
	this.shape_65.setTransform(136.25,0.65);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgMIAAgBQAAgHADgGQADgHAFgDQAGgDAGgBQALAAAFAHQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_66.setTransform(131.625,0.7);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AAKAlIAAgiQAAgEgCgCQgDgDgEAAQgGAAgEAGIAAAlIgMAAIAAhJIAMAAIAAAbQAGgHAIAAQARAAAAATIAAAig");
	this.shape_67.setTransform(126.125,-0.4);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgFASIAAgdIgJAAIAAgJIAJAAIAAgMIALAAIAAAMIAJAAIAAAJIgJAAIAAAdIABAEIAEABIAEAAIAAAJIgIABQgMAAAAgPg");
	this.shape_68.setTransform(108.25,0.125);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgCACgCIAAgLIgHAAQgFAAgEADg");
	this.shape_69.setTransform(104.025,0.7);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgHAmIAAgrIgJAAIAAgJIAJAAIAAgFQAAgIAEgFQAEgFAJAAIAHABIgBAJIgEgBQgJABAAAIIAAAFIALAAIAAAJIgLAAIAAArg");
	this.shape_70.setTransform(99.625,-0.45);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_71.setTransform(96.475,-0.3);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgFQgDgEAAgEIALAAQABAEADACQADACADAAQAGAAACgBQACgCAAgDQAAgDgDgCQgCgBgFgBIgKgEQgJgDAAgJQAAgGAGgEQAGgGAHAAQAKAAAFAGQAHAEAAAHIgNAAQAAgDgCgCQgDgCgEgBQgDAAgCACQgDACAAADQAAADADABQACACAGACIALADQAEACACADQACACAAAFQAAAGgGAFQgGAFgKgBQgFAAgFgCg");
	this.shape_72.setTransform(92.6,0.7);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAHAAIAFABIAAALIgFgBQgIABgCAGIAAAjg");
	this.shape_73.setTransform(88.55,0.65);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgMIAAgBQAAgHADgGQADgHAFgDQAGgDAGgBQALAAAFAHQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_74.setTransform(83.925,0.7);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAIQAFAGAAANIAAAAQAAAMgFAIQgGAHgJAAQgJAAgFgHgAgKAAIAAAVQADAIAHAAQAFgBADgEQADgEAAgIIAAgCQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_75.setTransform(78.475,-0.35);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_76.setTransform(60.975,-0.3);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_77.setTransform(56.925,0.65);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_78.setTransform(52.875,-0.3);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_79.setTransform(35.525,0.65);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgCACgCIAAgLIgHAAQgFAAgEADg");
	this.shape_80.setTransform(30.075,0.7);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AALAaIgLgjIgKAjIgKAAIgOg0IALAAIAIAkIALgkIAIAAIALAkIAJgkIAMAAIgPA0g");
	this.shape_81.setTransform(23.6,0.7);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgMIAAgBQAAgHADgGQADgHAFgDQAGgDAGgBQALAAAFAHQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_82.setTransform(17.275,0.7);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AAQAjIAAgfIgfAAIAAAfIgMAAIAAhGIAMAAIAAAeIAfAAIAAgeIAMAAIAABGg");
	this.shape_83.setTransform(10.975,-0.2);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FF8C2D").s().p("AtPlWIafgTIAALAI6fATg");
	this.shape_84.setTransform(86.45,25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	// Layer_2
	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("rgba(0,0,0,0.227)").s().p("AtJFdIAAq5IaTAAIAAK5g");
	this.shape_85.setTransform(78.325,34.125);

	this.timeline.addTween(cjs.Tween.get(this.shape_85).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5.9,-11.2,177.20000000000002,80.2);


(lib.drag12G2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgMIAAgBQAAgHADgGQADgHAFgDQAGgDAGgBQALAAAFAHQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape.setTransform(157.775,46.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAaAbIAAghQAAgFgCgDQgDgCgFAAQgEAAgDACQgCADgBADIAAAjIgLAAIAAgiQAAgJgKAAQgGAAgEAFIAAAmIgLAAIAAg0IALAAIAAAFQAFgGALAAQAJAAAEAJQAFgJALAAQAJAAAEAFQAEAFAAAKIAAAhg");
	this.shape_1.setTransform(150.7,46.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgFQgDgEAAgEIAMAAQAAAEADACQADACAEAAQAEAAADgBQACgCAAgDQAAgDgCgCQgDgBgFgBIgKgEQgJgDAAgIQAAgHAFgEQAHgGAIAAQAJAAAFAGQAHAEgBAHIgLAAQgBgDgCgCQgCgCgEgBQgEAAgCACQgDACABADQgBADADABQACACAGACIALADQAEACACADQACACAAAFQAAAGgGAFQgGAFgJgBQgGAAgFgCg");
	this.shape_2.setTransform(143.75,46.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_3.setTransform(139.925,45.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_4.setTransform(135.875,46.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgCACgCIAAgLIgHAAQgFAAgEADg");
	this.shape_5.setTransform(130.425,46.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgLAjQgFgCgDgEIAFgHQAGAGAIAAQAFAAADgDQADgEAAgGIAAgDQgFAGgHgBQgJABgGgIQgGgIAAgMQAAgMAGgHQAFgIAKAAQAIABAFAGIABgGIAKAAIAAAzQAAAKgGAHQgHAFgKABQgFAAgGgDgAgHgWQgDAFAAAIQAAAIADAFQADAEAFAAQAHAAADgGIAAgWQgDgGgHgBQgFAAgDAFg");
	this.shape_6.setTransform(124.775,47.6);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IAMAAIAAAGQADgHAHAAIAFABIgBALIgEAAQgIAAgCAGIAAAjg");
	this.shape_7.setTransform(120.55,46.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgRAUQgHgIAAgMIAAAAQAAgHAEgGQADgHAFgDQAGgDAGgBQAKAAAHAHQAHAIABALIAAABQAAAIgEAHQgDAFgFAEQgFAEgIgBQgKABgHgIgAgJgMQgDAFAAAHQAAAJADAFQAEAEAFAAQAGAAADgEQADgGAAgIQAAgHgDgFQgDgFgGAAQgFAAgEAFg");
	this.shape_8.setTransform(115.7,46.6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgCACgCIAAgLIgHAAQgFAAgEADg");
	this.shape_9.setTransform(107.675,46.6);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgFQgDgEAAgEIAMAAQAAAEADACQADACAEAAQAEAAADgBQACgCAAgDQAAgDgCgCQgDgBgFgBIgKgEQgJgDAAgIQAAgHAFgEQAHgGAIAAQAJAAAFAGQAHAEgBAHIgLAAQgBgDgCgCQgCgCgEgBQgEAAgCACQgDACABADQgBADADABQACACAGACIALADQAEACACADQACACAAAFQAAAGgGAFQgGAFgJgBQgGAAgFgCg");
	this.shape_10.setTransform(102.35,46.6);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_11.setTransform(98.525,45.6);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgFQgDgEAAgEIALAAQABAEADACQADACADAAQAFAAADgBQACgCAAgDQAAgDgCgCQgDgBgFgBIgKgEQgJgDAAgIQAAgHAGgEQAGgGAHAAQAKAAAGAGQAFAEABAHIgNAAQABgDgDgCQgCgCgFgBQgDAAgCACQgCACgBADQABADACABQACACAGACIALADQAEACACADQACACAAAFQAAAGgGAFQgGAFgKgBQgFAAgFgCg");
	this.shape_12.setTransform(94.65,46.6);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgMAFIAAgJIAZAAIAAAJg");
	this.shape_13.setTransform(90.425,46.225);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgCACgCIAAgLIgHAAQgFAAgEADg");
	this.shape_14.setTransform(86.125,46.6);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgFQgDgEAAgEIALAAQABAEADACQADACADAAQAFAAADgBQACgCAAgDQAAgDgDgCQgCgBgFgBIgKgEQgJgDAAgIQAAgHAGgEQAGgGAHAAQAKAAAFAGQAGAEABAHIgNAAQAAgDgCgCQgDgCgEgBQgDAAgCACQgDACAAADQAAADADABQACACAGACIALADQAEACACADQACACAAAFQAAAGgGAFQgGAFgKgBQgFAAgFgCg");
	this.shape_15.setTransform(80.8,46.6);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_16.setTransform(76.975,45.6);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgFQgDgEAAgEIAMAAQAAAEADACQADACAEAAQAEAAADgBQACgCAAgDQAAgDgCgCQgDgBgFgBIgKgEQgJgDAAgIQAAgHAFgEQAHgGAIAAQAJAAAFAGQAHAEgBAHIgLAAQgBgDgCgCQgCgCgEgBQgEAAgCACQgDACABADQgBADADABQACACAGACIALADQAEACACADQACACAAAFQAAAGgGAFQgGAFgJgBQgGAAgFgCg");
	this.shape_17.setTransform(73.1,46.6);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_18.setTransform(65.275,46.55);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgCACgCIAAgLIgHAAQgFAAgEADg");
	this.shape_19.setTransform(59.825,46.6);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgRAeQgFgHAAgNQAAgLAFgHQAGgIAKAAQAHAAAFAGIAAgbIAMAAIAABKIgKAAIgBgGQgFAHgIAAQgJAAgHgIgAgHgCQgDAEAAAJQAAAIADAFQADAEAEABQAIgBADgGIAAgWQgDgGgIAAQgEAAgDAEg");
	this.shape_20.setTransform(54.15,45.55);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgLAjQgFgCgDgEIAFgHQAGAGAIAAQAFAAADgDQADgEAAgGIAAgDQgFAGgHgBQgJABgGgIQgGgIAAgMQAAgMAGgHQAFgIAKAAQAIABAFAGIABgGIAKAAIAAAzQAAAKgGAHQgHAFgKABQgFAAgGgDgAgHgWQgDAFAAAIQAAAIADAFQADAEAFAAQAHAAADgGIAAgWQgDgGgHgBQgFAAgDAFg");
	this.shape_21.setTransform(46.025,47.6);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_22.setTransform(40.525,46.55);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgCACgCIAAgLIgHAAQgFAAgEADg");
	this.shape_23.setTransform(35.075,46.6);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgLAjQgFgCgDgEIAFgHQAGAGAIAAQAFAAADgDQADgEAAgGIAAgDQgFAGgHgBQgJABgGgIQgGgIAAgMQAAgMAGgHQAFgIAKAAQAIABAFAGIABgGIAKAAIAAAzQAAAKgGAHQgHAFgKABQgFAAgGgDgAgHgWQgDAFAAAIQAAAIADAFQADAEAFAAQAHAAADgGIAAgWQgDgGgHgBQgFAAgDAFg");
	this.shape_24.setTransform(29.425,47.6);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgLAjQgFgCgDgEIAFgHQAGAGAIAAQAFAAADgDQADgEAAgGIAAgDQgFAGgHgBQgJABgGgIQgGgIAAgMQAAgMAGgHQAFgIAKAAQAIABAFAGIABgGIAKAAIAAAzQAAAKgGAHQgHAFgKABQgFAAgGgDgAgHgWQgDAFAAAIQAAAIADAFQADAEAFAAQAHAAADgGIAAgWQgDgGgHgBQgFAAgDAFg");
	this.shape_25.setTransform(23.775,47.6);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_26.setTransform(18.275,46.55);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgCACgCIAAgLIgHAAQgFAAgEADg");
	this.shape_27.setTransform(12.825,46.6);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgLAjQgFgCgDgEIAFgHQAGAGAIAAQAFAAADgDQADgEAAgGIAAgDQgFAGgHgBQgJABgGgIQgGgIAAgMQAAgMAGgHQAFgIAKAAQAIABAFAGIABgGIAKAAIAAAzQAAAKgGAHQgHAFgKABQgFAAgGgDgAgHgWQgDAFAAAIQAAAIADAFQADAEAFAAQAHAAADgGIAAgWQgDgGgHgBQgFAAgDAFg");
	this.shape_28.setTransform(7.175,47.6);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgFAkIAAgzIALAAIAAAzgAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgDACAAQADAAACADQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_29.setTransform(150.075,29.6);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgGASIAAgdIgIAAIAAgJIAIAAIAAgMIALAAIAAAMIAKAAIAAAJIgKAAIAAAdIACAEIAEABIAEAAIAAAJIgHABQgNAAgBgPg");
	this.shape_30.setTransform(147,30.025);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IAMAAIAAAGQADgHAHAAIAFABIgBALIgEgBQgIABgCAGIAAAjg");
	this.shape_31.setTransform(143.95,30.55);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgGAFgEQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgGIAGAFQgDAGgFACQgFADgHAAQgKgBgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_32.setTransform(139.325,30.6);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_33.setTransform(133.875,31.575);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgGAFgEQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgGIAGAFQgDAGgFACQgFADgHAAQgKgBgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_34.setTransform(128.325,30.6);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgEQgDgFAAgEIALAAQABAEADACQADACADABQAFAAADgCQACgCAAgDQAAgDgCgCQgDgCgFgBIgKgDQgJgDAAgJQAAgGAGgEQAGgFAHgBQAKABAGAFQAFAEABAHIgNAAQABgDgDgCQgCgDgFAAQgDABgCACQgCABgBADQABADACACQACABAGABIALAEQAEACACACQACADAAAFQAAAGgGAFQgGAFgKAAQgFAAgFgDg");
	this.shape_35.setTransform(123,30.6);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_36.setTransform(115.175,30.55);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAXQAAAIACADIAAABIgNAAIgBgEQgGAFgHABQgIAAgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_37.setTransform(109.725,30.6);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_38.setTransform(104.225,30.55);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAXQAAAIACADIAAABIgNAAIgBgEQgGAFgHABQgIAAgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_39.setTransform(98.775,30.6);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_40.setTransform(93.275,30.55);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAXQAAAIACADIAAABIgNAAIgBgEQgGAFgHABQgIAAgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_41.setTransform(87.825,30.6);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AAKAlIgPgWIgFAGIAAAQIgMAAIAAhKIAMAAIAAArIADgFIAOgPIAOAAIgTAUIAVAfg");
	this.shape_42.setTransform(82.825,29.5);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAXQAAAIACADIAAABIgNAAIgBgEQgGAFgHABQgIAAgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_43.setTransform(77.225,30.6);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AAaAbIAAgiQAAgFgCgCQgDgCgFAAQgEAAgDACQgCACgBAEIAAAjIgLAAIAAgiQAAgJgKAAQgGAAgEAGIAAAlIgLAAIAAg0IAKAAIABAGQAFgHALAAQAJAAAEAJQAFgJALAAQAJAAAEAFQAEAFAAAJIAAAig");
	this.shape_44.setTransform(70.15,30.55);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgLAjQgFgCgDgEIAFgIQAGAHAIAAQAFAAADgDQADgDAAgHIAAgDQgFAGgHAAQgJAAgGgIQgGgHAAgNQAAgLAGgIQAFgIAKAAQAIAAAFAHIABgFIAKAAIAAAyQAAALgGAFQgHAHgKAAQgFgBgGgCgAgHgWQgDAEAAAKQAAAIADAEQADAEAFAAQAHAAADgGIAAgXQgDgFgHAAQgFgBgDAFg");
	this.shape_45.setTransform(60.375,31.6);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_46.setTransform(54.875,30.55);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgFAkIAAgzIALAAIAAAzgAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgDACAAQADAAACADQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_47.setTransform(50.825,29.6);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgFAlIAAhKIALAAIAABKg");
	this.shape_48.setTransform(48.275,29.5);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgFAkIAAgzIALAAIAAAzgAgEgYQAAgBgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAAAQACgDACAAQADAAACADQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_49.setTransform(45.725,29.6);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgLAjQgFgCgDgEIAFgIQAGAHAIAAQAFAAADgDQADgDAAgHIAAgDQgFAGgHAAQgJAAgGgIQgGgHAAgNQAAgLAGgIQAFgIAKAAQAIAAAFAHIABgFIAKAAIAAAyQAAALgGAFQgHAHgKAAQgFgBgGgCgAgHgWQgDAEAAAKQAAAIADAEQADAEAFAAQAHAAADgGIAAgXQgDgFgHAAQgFgBgDAFg");
	this.shape_50.setTransform(41.525,31.6);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgLAjQgFgCgDgEIAFgIQAGAHAIAAQAFAAADgDQADgDAAgHIAAgDQgFAGgHAAQgJAAgGgIQgGgHAAgNQAAgLAGgIQAFgIAKAAQAIAAAFAHIABgFIAKAAIAAAyQAAALgGAFQgHAHgKAAQgFgBgGgCgAgHgWQgDAEAAAKQAAAIADAEQADAEAFAAQAHAAADgGIAAgXQgDgFgHAAQgFgBgDAFg");
	this.shape_51.setTransform(35.875,31.6);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_52.setTransform(30.375,30.55);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgGAFgEQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgGIAGAFQgDAGgFACQgFADgHAAQgKgBgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_53.setTransform(24.975,30.6);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AAZAbIAAgiQAAgFgBgCQgDgCgFAAQgEAAgDACQgCACgBAEIAAAjIgLAAIAAgiQAAgJgJAAQgIAAgCAGIAAAlIgNAAIAAg0IALAAIABAGQAFgHAKAAQAKAAAEAJQAGgJAKAAQAJAAAEAFQAFAFAAAJIAAAig");
	this.shape_54.setTransform(17.9,30.55);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgBQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_55.setTransform(157.025,14.55);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgHQAAgIAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgCACgDIAAgJIgHAAQgFgBgEADg");
	this.shape_56.setTransform(151.575,14.6);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgLAjQgFgDgDgEIAFgHQAGAHAIAAQAFAAADgDQADgDAAgGIAAgEQgFAFgHABQgJAAgGgIQgGgHAAgMQAAgMAGgIQAFgIAKABQAIgBAFAHIABgFIAKAAIAAAyQAAALgGAFQgHAHgKAAQgFgBgGgCgAgHgWQgDAEAAAKQAAAHADAEQADAFAFAAQAHAAADgHIAAgWQgDgFgHAAQgFgBgDAFg");
	this.shape_57.setTransform(145.925,15.6);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgBQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_58.setTransform(140.425,14.55);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgPAUQgHgHAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGABQALAAAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAHQgDAFgFACQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_59.setTransform(135.025,14.6);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgQAeQgGgHAAgNQAAgLAGgIQAFgHAJAAQAIAAAGAGIAAgbIALAAIAABKIgLAAIAAgFQgGAGgIAAQgIAAgGgIgAgHgBQgEADAAAJQAAAIAEAFQADAFAFgBQAHAAAEgGIAAgWQgEgGgHAAQgFAAgDAFg");
	this.shape_60.setTransform(129.35,13.55);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgHQAAgIAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgCACgDIAAgJIgHAAQgFgBgEADg");
	this.shape_61.setTransform(121.475,14.6);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgBQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_62.setTransform(115.975,14.55);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAIAAIAEABIgBALIgEgBQgIAAgCAHIAAAjg");
	this.shape_63.setTransform(111.7,14.55);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgPAUQgHgHAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGABQALAAAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAHQgDAFgFACQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_64.setTransform(107.075,14.6);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgPAUQgHgHAAgMIAAgBQAAgMAHgHQAGgIAKABQAKgBAGAGQAFAFABAKIgLAAQgBgFgDgDQgCgDgFAAQgFAAgDAEQgDAFAAAIIAAABQAAAIADAFQADAEAFAAQAEAAADgDQADgCABgEIALAAQAAAFgDAEQgDAFgFACQgFACgGABQgKAAgGgIg");
	this.shape_65.setTransform(101.825,14.6);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgBQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_66.setTransform(96.375,14.55);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgPAUQgHgHAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGABQALAAAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAHQgDAFgFACQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_67.setTransform(90.975,14.6);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AAaAbIAAgiQgBgEgCgCQgCgDgFAAQgEAAgCACQgDACgBAEIAAAjIgLAAIAAgiQAAgJgKAAQgHAAgCAGIAAAlIgMAAIAAg0IALAAIAAAGQAGgHAKAAQAJAAAEAIQAGgIAKAAQAJAAAEAFQAEAFABAJIAAAig");
	this.shape_68.setTransform(83.9,14.55);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgFASIAAgdIgJAAIAAgJIAJAAIAAgMIAKAAIAAAMIAKAAIAAAJIgKAAIAAAdIABAEIAFABIAEAAIAAAJIgIABQgNAAABgPg");
	this.shape_69.setTransform(75.25,14.025);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgHQAAgIAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgCACgDIAAgJIgHAAQgFgBgEADg");
	this.shape_70.setTransform(71.025,14.6);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_71.setTransform(65.575,15.575);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgHQAAgIAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgCACgDIAAgJIgHAAQgFgBgEADg");
	this.shape_72.setTransform(59.975,14.6);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgQAeQgGgHAAgNQAAgLAGgIQAFgHAKAAQAHAAAFAGIAAgbIAMAAIAABKIgLAAIAAgFQgGAGgHAAQgKAAgFgIgAgHgBQgDADAAAJQAAAIADAFQADAFAFgBQAHAAADgGIAAgWQgDgGgHAAQgFAAgDAFg");
	this.shape_73.setTransform(54.3,13.55);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_74.setTransform(47.825,13.6);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgBQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_75.setTransform(43.775,14.55);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_76.setTransform(39.725,13.6);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgBQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_77.setTransform(33.175,14.55);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgHQAAgIAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgCACgDIAAgJIgHAAQgFgBgEADg");
	this.shape_78.setTransform(27.725,14.6);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AAMAbIgMgkIgKAkIgKAAIgOg0IALAAIAJAjIAKgjIAIAAIALAjIAJgjIAMAAIgPA0g");
	this.shape_79.setTransform(21.25,14.6);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgPAUQgHgHAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGABQALAAAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAHQgDAFgFACQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_80.setTransform(14.925,14.6);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AAQAkIAAggIgfAAIAAAgIgMAAIAAhGIAMAAIAAAdIAfAAIAAgdIAMAAIAABGg");
	this.shape_81.setTransform(8.625,13.7);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_82.setTransform(82.475,29.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	// Layer_2
	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("rgba(0,0,0,0.227)").s().p("AtJEQIAAofIaTAAIAAIfg");
	this.shape_83.setTransform(74.675,35.85);

	this.timeline.addTween(cjs.Tween.get(this.shape_83).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.5,1.5,178.1,61.6);


(lib.drag12G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgLAcQgGgDgDgFQgDgEAAgFIANAAQAAAEADADQAEACADAAQAGAAADgBQACgCAAgEQAAgEgCgBQgDgCgGgCQgHAAgEgDQgKgDAAgKQAAgHAGgFQAGgFAJAAQALAAAGAFQAGAFABAIIgOAAQABgEgDgCQgDgDgFAAQgDABgDACQgDACAAADQABADACACIAJADQAIACAFACQAEABACADQACAEAAAEQAAAJgHAEQgGAFgLAAQgFAAgGgCg");
	this.shape.setTransform(105.8,38);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgIQAAgJAHgDQAHgGAMAAIAIAAIAAgDQAAgFgDgCQgCgDgFgBQgEAAgDADQgDACAAADIgNAAQAAgEADgFQAEgEAFgCQAGgCAFAAQAKAAAHAFQAGAFAAAKIAAAYQAAAJACAEIAAABIgNAAIgCgGQgGAHgIAAQgJAAgFgFgAgHAEQgEADAAAEQAAAEADADQACACAEAAQADAAAEgCQADgCACgEIAAgKIgHAAQgHgBgDADg");
	this.shape_1.setTransform(100.025,38);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AALApIAAglQAAgFgCgDQgDgCgFAAQgHAAgEAGIAAApIgNAAIAAhRIANAAIAAAeQAHgHAIAAQATAAAAAUIAAAmg");
	this.shape_2.setTransform(94,36.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AALApIgRgZIgFAGIAAATIgOAAIAAhRIAOAAIAAAuIAEgFIAPgRIAPAAIgVAXIAYAig");
	this.shape_3.setTransform(88.475,36.775);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AALApIAAglQAAgFgDgDQgCgCgFAAQgHAAgEAGIAAApIgNAAIAAhRIANAAIAAAeQAHgHAIAAQATAAAAAUIAAAmg");
	this.shape_4.setTransform(79.45,36.775);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgSAYQgFgGAAgKIAAglIANAAIAAAlQAAALAJAAQAIAAAEgHIAAgpIANAAIAAA5IgMAAIAAgFQgHAHgJAAQgJAAgFgGg");
	this.shape_5.setTransform(73.35,38.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgMAiIAAAHIgNAAIAAhSIAOAAIAAAeQAFgGAJAAQALAAAFAHQAHAIgBAOIAAAAQABAOgHAIQgFAIgLAAQgJAAgGgIgAgLAAIAAAYQADAHAIAAQAGAAADgEQAEgFAAgJIAAgCQAAgJgEgEQgDgFgGAAQgIAAgDAHg");
	this.shape_6.setTransform(67.3,36.825);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgSAYQgFgGAAgKIAAglIANAAIAAAlQAAALAJAAQAIAAAEgHIAAgpIANAAIAAA5IgNAAIAAgFQgFAHgKAAQgJAAgFgGg");
	this.shape_7.setTransform(61.05,38.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgGAUIAAggIgKAAIAAgKIAKAAIAAgOIAMAAIAAAOIAKAAIAAAKIgKAAIAAAgQAAADABABQABABAAAAQABAAAAABQABAAAAAAQABAAABAAIAEgBIAAAKIgIACQgOgBAAgQg");
	this.shape_8.setTransform(56.05,37.35);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AALApIgRgZIgFAGIAAATIgOAAIAAhRIAOAAIAAAuIAEgFIAPgRIAPAAIgVAXIAYAig");
	this.shape_9.setTransform(143.775,19.575);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgSAYQgFgGAAgKIAAgkIANAAIAAAkQAAALAJAAQAIAAAEgHIAAgoIANAAIAAA4IgMAAIAAgFQgHAHgJgBQgJABgFgGg");
	this.shape_10.setTransform(137.5,20.85);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgGAUIAAggIgJAAIAAgJIAJAAIAAgPIAMAAIAAAPIALAAIAAAJIgLAAIAAAgQAAADACABQAAABAAAAQABAAAAABQABAAAAAAQABAAABAAIAFgBIAAAKIgJABQgOAAAAgQg");
	this.shape_11.setTransform(132.5,20.15);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AALAdIAAgkQAAgGgCgDQgDgCgFAAQgHAAgEAHIAAAoIgNAAIAAg4IANAAIAAAGQAGgHAKAAQARgBABAVIAAAlg");
	this.shape_12.setTransform(127.75,20.75);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgRAWQgHgHAAgNIAAgCQAAgIADgGQADgIAGgDQAGgEAHAAQAMAAAGAHQAHAIAAAOIAAAEIgmAAQABAHAEAEQAEAFAGAAQAJAAAGgIIAHAHQgEAGgFACQgGADgIAAQgLAAgIgIgAgHgPQgEAEAAAGIAXAAIAAAAQABgHgEgDQgDgDgFgBQgEAAgEAEg");
	this.shape_13.setTransform(121.8,20.8);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgMAiIAAAHIgNAAIAAhSIAOAAIAAAeQAFgGAJAAQALAAAFAHQAHAIgBAOIAAAAQABAOgHAIQgFAIgLAAQgJAAgGgIgAgLAAIAAAYQADAHAIAAQAGAAADgEQAEgFAAgJIAAgCQgBgJgDgEQgDgFgGAAQgIAAgDAHg");
	this.shape_14.setTransform(115.8,19.625);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgFAoIAAg5IALAAIAAA5gAgEgcQgBAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAgDACgCQACgCACAAQADAAACACQACACAAADQAAABAAAAQAAABAAAAQAAABgBAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_15.setTransform(108.45,19.7);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AALApIgRgZIgFAGIAAATIgOAAIAAhRIAOAAIAAAuIAEgFIAPgRIAPAAIgVAXIAYAig");
	this.shape_16.setTransform(104.575,19.575);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgGAoIAAg5IANAAIAAA5gAgFgcQAAAAAAgBQgBAAAAgBQAAAAAAgBQgBAAAAgBQAAgDACgCQADgCACAAQAEAAACACQACACAAADQAAABgBAAQAAABAAAAQAAABgBAAQAAABAAAAQgCACgEAAQgCAAgDgCg");
	this.shape_17.setTransform(99.95,19.7);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgGApIAAhRIANAAIAABRg");
	this.shape_18.setTransform(97.15,19.575);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgGAoIAAg5IANAAIAAA5gAgFgcQAAAAAAgBQgBAAAAgBQAAAAAAgBQgBAAAAgBQAAgDACgCQACgCADAAQAEAAABACQADACAAADQAAABgBAAQAAABAAAAQAAABgBAAQAAABgBAAQgBACgEAAQgDAAgCgCg");
	this.shape_19.setTransform(94.35,19.7);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAcAdIAAglQAAgFgCgDQgDgCgFAAQgFAAgCACQgDADgBAEIAAAmIgMAAIAAglQgBgKgKAAQgIAAgDAHIAAAoIgNAAIAAg4IAMAAIABAGQAGgIAKABQALAAAEAIQAHgIALAAQAKAAAEAEQAFAGAAAKIAAAlg");
	this.shape_20.setTransform(88.175,20.75);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgRAWQgHgHgBgNIAAgCQABgIADgGQADgIAGgDQAGgEAHAAQALAAAHAHQAGAIABAOIAAAEIglAAQAAAHAEAEQAEAFAGAAQAJAAAGgIIAHAHQgEAGgFACQgHADgHAAQgLAAgIgIgAgHgPQgEAEAAAGIAXAAIAAAAQABgHgEgDQgDgDgGgBQgDAAgEAEg");
	this.shape_21.setTransform(80.5,20.8);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAcAdIAAglQAAgFgCgDQgDgCgFAAQgFAAgCACQgDADgBAEIAAAmIgMAAIAAglQgBgKgKAAQgIAAgDAHIAAAoIgNAAIAAg4IAMAAIABAGQAGgIAKABQALAAAEAIQAHgIALAAQAKAAAEAEQAFAGAAAKIAAAlg");
	this.shape_22.setTransform(72.725,20.75);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgFAoIAAg5IALAAIAAA5gAgEgcQgBAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAgDACgCQACgCACAAQADAAACACQACACAAADQAAABAAAAQAAABAAAAQAAABgBAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_23.setTransform(63.8,19.7);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AALAdIAAgkQAAgGgCgDQgDgCgFAAQgHAAgEAHIAAAoIgNAAIAAg4IANAAIAAAGQAGgHAKAAQARgBABAVIAAAlg");
	this.shape_24.setTransform(59.35,20.75);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgFAoIAAg5IALAAIAAA5gAgEgcQgBAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAgDACgCQACgCACAAQADAAACACQACACAAADQAAABAAAAQAAABAAAAQAAABgBAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_25.setTransform(54.9,19.7);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AALAdIAAgkQAAgGgDgDQgCgCgFAAQgHAAgEAHIAAAoIgNAAIAAg4IAMAAIAAAGQAHgHAJAAQASgBABAVIAAAlg");
	this.shape_26.setTransform(47.7,20.75);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgIQAAgJAHgEQAHgEAMAAIAIAAIAAgFQAAgEgDgCQgCgEgFAAQgEAAgDADQgDACAAADIgNAAQAAgEADgFQAEgEAFgCQAGgCAFAAQAKAAAHAFQAGAFAAAJIAAAZQAAAJACAEIAAABIgNAAIgCgGQgGAHgIAAQgJAAgFgFgAgHAEQgEADAAAFQAAADADADQACACAEAAQADAAAEgCQADgCACgEIAAgKIgHAAQgHgBgDADg");
	this.shape_27.setTransform(41.675,20.8);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AAMAdIgMgnIgLAnIgLAAIgQg5IANAAIAJAnIAMgnIAJAAIAMAnIAJgnIANAAIgQA5g");
	this.shape_28.setTransform(34.575,20.8);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgRAWQgIgHAAgNIAAgCQAAgIAEgGQADgIAGgDQAHgEAGAAQALAAAHAHQAGAIAAAOIAAAEIgkAAQAAAHAEAEQAFAFAFAAQAJAAAFgIIAIAHQgEAGgFACQgHADgHAAQgLAAgIgIgAgHgPQgDAEgBAGIAYAAIAAAAQAAgHgEgDQgDgDgGgBQgDAAgEAEg");
	this.shape_29.setTransform(27.6,20.8);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AARAnIAAgjIghAAIAAAjIgOAAIAAhNIAOAAIAAAhIAhAAIAAghIAOAAIAABNg");
	this.shape_30.setTransform(20.7,19.8);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_31.setTransform(81.525,27.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	// Layer_2
	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("rgba(0,0,0,0.227)").s().p("AtJEQIAAofIaTAAIAAIfg");
	this.shape_32.setTransform(74.675,34.6);

	this.timeline.addTween(cjs.Tween.get(this.shape_32).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.5,-0.3,175.3,62.199999999999996);


(lib.drag11G13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._16();
	this.instance.setTransform(0,-3,0.2813,0.2397);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgLAlIAJg0IALAAIgJA0gAABgYQAAgBgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQACgCAEgBQAAAAABABQAAAAABAAQAAAAABABQABAAAAABQABAAAAAAQAAABABAAQAAABAAABQAAAAAAABQAAABAAAAQAAABAAAAQgBABAAAAQAAABgBABQAAAAgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgCAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape.setTransform(61.25,87.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgQAWQgGgEAAgIIALAAQAAAEADACQACADAFAAQADAAADgCQADgCAAgDQABgFgHgCIgJgDQgKgDAAgJQABgHAGgFQAGgEAIAAQAIAAAGAEQAFAFAAAHIgMAAQAAgDgCgCQgCgCgEAAQgDAAgCACQgDABAAADQgBAFAGABIAKAEQAKADAAAJQgBAFgDAEQgDAEgFABQgFADgFAAQgJgBgFgFg");
	this.shape_1.setTransform(57.275,88.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgMAYQgGgDgCgGQgCgGAAgHIAAgCQABgHAEgHQAEgGAGgDQAFgDAGAAQAKAAAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgGIAGAGQgDAFgGACQgFADgGAAQgGAAgFgEgAgJgEIAVAAIAAgBIAAgEQgBgDgCgCQgCgCgEgBQgIAAgEANg");
	this.shape_2.setTransform(52.2792,88.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgMAfIgBAGIgLAAIANhKIALAAIgFAcQAFgHAIAAQAIABAEAFQAFAFAAAIIAAAIQgBAIgEAHQgDAGgFADQgFADgGAAQgIAAgFgHgAgGAAIgEAVQACAHAIAAQAEAAAEgEQAEgFABgIIAAgHQAAgEgCgDQgCgDgEAAIgBAAQgGAAgEAGg");
	this.shape_3.setTransform(46.725,87.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgRAbIAJg0IAKAAIgBAGQAFgHAHAAIAFABIgBALIgFgBQgIAAgEAHIgFAjg");
	this.shape_4.setTransform(42.575,88.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgOAYQgFgDgCgHQgCgGAAgHIAAgBQABgHAEgGQAEgGAFgEQAGgDAGAAQAHAAAFAEQAFADACAGQADAGgBAHQgBAIgEAGQgDAHgGADQgGAEgGAAQgHAAgFgEgAgIgKQgCAFgBAFIAAAGQAAAGACADQADADAEAAQAFAAAEgFQAEgFABgHIABgFQAAgFgDgEQgCgEgFAAQgHAAgEAHg");
	this.shape_5.setTransform(37.8843,88.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgRAmIAHgrIgIAAIACgJIAIAAIABgFQABgIAFgFQAFgFAIAAIAHABIgBAJIgFAAQgEAAgDACQgCACgBAEIgBAFIALAAIgCAJIgKAAIgHArg");
	this.shape_6.setTransform(33.975,87.5977);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgQAWQgGgEAAgIIALAAQAAAEADADQACACAFAAQADgBADgBQADgCAAgDQABgFgHgCIgJgDQgKgDAAgJQABgHAGgFQAGgEAIAAQAIAAAGAEQAFAFAAAIIgMAAQAAgEgCgCQgCgDgEABQgDAAgCABQgDACAAAEQgBAEAGABIAKAEQAKADAAAJQgBAFgDAEQgDAEgFACQgFACgFAAQgJAAgFgGg");
	this.shape_7.setTransform(62.575,72.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgSAXQgEgEAAgHQABgIAGgEQAHgFALAAIAHAAIABgDIAAgEQgBgFgGAAQgEAAgBABQgDADgBADIgMAAQABgFADgDQADgFAFgCQAFgBAFAAQAJAAAFAFQAEAFAAAIIgEAYIgBAEIABAGIAAABIgMAAIAAgGQgHAHgGAAQgHgBgFgEgAgGAEQgDACgBAFQAAADABACQACACAEAAQADAAACgBIAGgGIABgJIgFAAQgGAAgEACg");
	this.shape_8.setTransform(57.375,72.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgLAlIAJg0IALAAIgJA0gAABgYQgBgBAAAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQACgCACAAQABAAABAAQAAAAABAAQAAAAABABQAAAAABABQAAAAABAAQAAABABAAQAAABAAABQAAAAAAABQAAABAAAAQAAABAAAAQgBABAAAAQgBABAAABQAAAAgBAAQAAAAgBABQAAAAgBAAQgBAAgBAAIgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_9.setTransform(53.75,71.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgRAbIAJg0IAKAAIgBAGQAFgHAHAAIAFABIgBALIgFAAQgIgBgEAHIgFAjg");
	this.shape_10.setTransform(50.825,72.7);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgMAYQgGgEgCgFQgCgGAAgHIAAgCQABgHAEgHQAEgGAGgDQAFgEAGABQAKAAAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgHIAGAHQgDAEgGADQgFACgGABQgGgBgFgDgAgJgEIAVAAIAAgBIAAgEQgBgEgCgCQgCgCgEAAQgIAAgEANg");
	this.shape_11.setTransform(46.3792,72.75);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgIAdQgDgEAAgHIAFgdIgIAAIABgJIAJAAIACgMIAKAAIgCAMIAJAAIgBAJIgJAAIgFAdIAAACQAAADAEAAIAEAAIgBAJIgHABQgFAAgDgEg");
	this.shape_12.setTransform(42.275,72.175);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgQAWQgGgEAAgIIALAAQAAAEADADQACACAFAAQADgBADgBQADgCAAgDQABgFgHgCIgJgDQgKgDAAgJQABgHAGgFQAGgEAIAAQAIAAAGAEQAFAFAAAIIgMAAQAAgEgCgCQgCgDgEABQgDAAgCABQgDACAAAEQgBAEAGABIAKAEQAKADAAAJQgBAFgDAEQgDAEgFACQgFACgFAAQgJAAgFgGg");
	this.shape_13.setTransform(37.825,72.75);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AAUAkIgEgRIgZAAIgIARIgOAAIAmhGIALAAIANBGgAgEAJIATAAIgFgcg");
	this.shape_14.setTransform(31.6,71.85);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FF8C2D").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_15.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


(lib.drag7G7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape.setTransform(81.375,9.825);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_1.setTransform(74.8,9.875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AAOAgIgOgrIgMArIgMAAIgSg/IAPAAIAKArIAMgrIALAAIAMArIAKgrIAPAAIgSA/g");
	this.shape_2.setTransform(67.1,9.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_3.setTransform(59.475,9.875);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AATArIAAgmIglAAIAAAmIgPAAIAAhVIAPAAIAAAkIAlAAIAAgkIAPAAIAABVg");
	this.shape_4.setTransform(51.9,8.775);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_5.setTransform(43.15,8.675);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_6.setTransform(36.375,9.825);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgUAYQgJgJABgPIAAAAQAAgJADgHQAEgIAHgEQAGgEAIAAQANAAAIAIQAIAJABANIAAADQAAAJgEAHQgEAIgGAEQgHAEgJAAQgNAAgHgJgAgKgPQgEAGAAAKQAAAJAEAGQAEAGAGAAQAHAAAFgGQAEgGAAgKQAAgJgEgGQgFgFgHAAQgGAAgEAFg");
	this.shape_7.setTransform(27.7,9.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQADgCADgDIAAgMIgIAAQgHAAgEADg");
	this.shape_8.setTransform(21.05,9.875);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgGAWIAAgjIgLAAIAAgLIALAAIAAgPIAMAAIAAAPIAMAAIAAALIgMAAIAAAjQABADABACQACABADAAIAFAAIAAALIgJABQgPAAAAgSg");
	this.shape_9.setTransform(15.65,9.15);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgDADgBAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_10.setTransform(10.55,9.875);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_11.setTransform(3.975,9.825);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AAYArIgIgUIggAAIgGAUIgQAAIAhhVIALAAIAhBVgAgLALIAYAAIgNgig");
	this.shape_12.setTransform(-3.35,8.775);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_13.setTransform(-13.675,9.825);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgDACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_14.setTransform(-20.25,9.875);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgUAkQgHgIAAgQQAAgOAHgIQAHgJALAAQAJAAAHAHIAAghIAOAAIAABaIgNAAIgBgHQgGAHgKAAQgLABgHgKgAgJgCQgDAFAAALQAAAJADAFQAEAGAGAAQAJAAAEgHIAAgbQgEgHgJgBQgGABgEAFg");
	this.shape_15.setTransform(-27.025,8.6);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_16.setTransform(-34.75,8.675);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_17.setTransform(-39.825,11.075);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgUAYQgJgJAAgPIAAAAQAAgJAEgHQAEgIAHgEQAGgEAIAAQANAAAIAIQAIAJABANIAAADQAAAJgEAHQgEAIgHAEQgGAEgJAAQgNAAgHgJgAgKgPQgEAGAAAKQAAAJAEAGQAEAGAGAAQAHAAAFgGQADgGAAgKQAAgJgDgGQgFgFgHAAQgGAAgEAFg");
	this.shape_18.setTransform(-46.55,9.875);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgGAtIAAhZIANAAIAABZg");
	this.shape_19.setTransform(-51.475,8.55);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgUAYQgJgJAAgPIAAAAQAAgJAEgHQAEgIAHgEQAGgEAIAAQANAAAIAIQAIAJABANIAAADQAAAJgEAHQgEAIgHAEQgGAEgJAAQgNAAgHgJgAgKgPQgEAGAAAKQAAAJAEAGQAEAGAGAAQAHAAAFgGQADgGAAgKQAAgJgDgGQgFgFgHAAQgGAAgEAFg");
	this.shape_20.setTransform(-56.45,9.875);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgJAuIAAg1IgKAAIAAgKIAKAAIAAgGQAAgKAGgGQAEgFALAAIAIAAIgBALIgFAAQgKAAAAAKIAAAGIANAAIAAAKIgNAAIAAA1g");
	this.shape_21.setTransform(-61.85,8.5);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgQAgIAAg+IAOAAIAAAHQAFgIAJAAIAEABIAAANIgGgBQgJAAgDAIIAAAqg");
	this.shape_22.setTransform(-65.9,9.825);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgUAYQgJgJAAgPIAAAAQAAgJAEgHQAEgIAHgEQAGgEAIAAQANAAAIAIQAIAJABANIAAADQAAAJgEAHQgEAIgHAEQgGAEgJAAQgNAAgHgJgAgKgPQgEAGAAAKQAAAJAEAGQAEAGAGAAQAHAAAFgGQADgGAAgKQAAgJgDgGQgFgFgHAAQgGAAgEAFg");
	this.shape_23.setTransform(-71.75,9.875);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AAdArIAAgcIACglIgaBBIgJAAIgZhBIABAlIAAAcIgPAAIAAhVIAUAAIAXBBIAZhBIATAAIAABVg");
	this.shape_24.setTransform(-80.425,8.775);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFDB2D").s().p("AuchxIc5gFIAADnI85AGg");
	this.shape_25.setTransform(1.3,8.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-91.2,-3.1,185,23.900000000000002);


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


(lib.Slots10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// slots
	this.kotakKartuSembunyi = new lib.targetcopy();
	this.kotakKartuSembunyi.name = "kotakKartuSembunyi";
	this.kotakKartuSembunyi.setTransform(225.85,624.65);

	this.kotakKartu2 = new lib.target();
	this.kotakKartu2.name = "kotakKartu2";
	this.kotakKartu2.setTransform(478.9,264.55);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAJQgEgDABgGQgBgEAEgEQADgEAGAAQAHAAADAEQAEAEAAAEQAAAGgEADQgDAEgHAAQgGAAgDgEg");
	this.shape.setTransform(65.4,444.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgfA8QgNgLgBgSIAXAAQABAKAGAGQAGAFAJAAQALAAAFgIQAHgHAAgNQAAgNgHgIQgHgGgLAAQgGAAgEACQgEABgGAEIgSgEIAHhGIBKAAIAAAUIg2AAIgFAiQALgGALAAQATAAALANQALAMAAAVQAAAVgMANQgMANgVAAQgSAAgNgLg");
	this.shape_1.setTransform(57.4,438.575);

	this.instance = new lib.Tween8("synched",0);
	this.instance.setTransform(59.95,438.7,0.0321,0.0577,0,0,0,1.6,1.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgJAJQgDgDgBgGQABgEADgEQADgEAGAAQAHAAADAEQAEAEgBAEQABAGgEADQgDAEgHAAQgGAAgDgEg");
	this.shape_2.setTransform(66.8,396.975);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAKBGIAAgfIg7AAIgBgOIA7heIAYAAIAABZIASAAIAAATIgSAAIAAAfgAAIgiIghA2IAjAAIAAg5g");
	this.shape_3.setTransform(58.575,391.175);

	this.instance_1 = new lib.Tween8("synched",0);
	this.instance_1.setTransform(61.4,391.4,0.0321,0.0577,0,0,0,3.1,0.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJAJQgDgDgBgGQABgEADgEQADgEAGAAQAHAAADAEQAEAEgBAEQABAGgEADQgDAEgHAAQgGAAgDgEg");
	this.shape_4.setTransform(66.8,337.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AggA9QgNgLAAgSIAXAAQAAAKAGAFQAGAGAKAAQALAAAGgGQAGgFAAgLQAAgLgGgGQgHgGgMAAIgNAAIAAgSIAOAAQAJAAAHgFQAGgGAAgKQAAgKgFgFQgFgGgLAAQgJAAgGAGQgGAFAAAJIgXAAQAAgLAGgJQAGgJAKgFQAKgFAMAAQAUAAAMALQAMAKAAATQAAAJgGAJQgGAIgJAEQALADAGAJQAGAIAAAMQAAASgNAMQgMALgVAAQgUAAgMgLg");
	this.shape_5.setTransform(58.375,332.175);

	this.instance_2 = new lib.Tween8("synched",0);
	this.instance_2.setTransform(61.4,332.4,0.0321,0.0577,0,0,0,3.1,1.8);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgJAJQgDgDgBgGQABgEADgEQADgEAGAAQAHAAADAEQAEAEgBAEQABAGgEADQgDAEgHAAQgGAAgDgEg");
	this.shape_6.setTransform(66.8,290.475);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgsBHIAAgQIAtgzQAKgKAEgIQAEgHABgIQgBgKgFgGQgGgGgIAAQgMAAgGAHQgGAHAAAMIgXAAQAAgNAGgKQAFgKALgGQALgGAOAAQATAAAMALQALAKAAASQABAKgGAMQgGAKgNAPIghAkIA/AAIAAATg");
	this.shape_7.setTransform(58.6,284.575);

	this.instance_3 = new lib.Tween8("synched",0);
	this.instance_3.setTransform(61.4,284.95,0.0321,0.0577,0,0,0,3.1,1.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgJAJQgDgDgBgGQABgEADgEQADgEAGAAQAHAAADAEQAEAEgBAEQABAGgEADQgDAEgHAAQgGAAgDgEg");
	this.shape_8.setTransform(66.8,240.975);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAGBGIAAhvIgiAMIAAgUIA2gUIADAAIAACLg");
	this.shape_9.setTransform(57.475,235.15);

	this.instance_4 = new lib.Tween8("synched",0);
	this.instance_4.setTransform(61.4,235.45,0.0321,0.0577,0,0,0,3.1,2.6);

	this.lima = new lib.drag12G5();
	this.lima.name = "lima";
	this.lima.setTransform(135.55,459.1,0.7206,0.7206,0,0,0,87.5,23.7);

	this.empat = new lib.drag12G4();
	this.empat.name = "empat";
	this.empat.setTransform(133.05,399.9,0.7206,0.7206,0,0,0,0.2,0.1);

	this.tiga = new lib.drag12G3();
	this.tiga.name = "tiga";
	this.tiga.setTransform(135.7,344.95,0.7206,0.7206,0,0,0,86.7,25.1);

	this.dua = new lib.drag12G2();
	this.dua.name = "dua";
	this.dua.setTransform(133.55,294,0.7206,0.7206,0,0,0,79.7,33);

	this.satu = new lib.drag12G1();
	this.satu.name = "satu";
	this.satu.setTransform(135.65,242,0.7206,0.7206,0,0,0,81.6,27.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.satu},{t:this.dua},{t:this.tiga},{t:this.empat},{t:this.lima},{t:this.instance_4},{t:this.shape_9},{t:this.shape_8},{t:this.instance_3},{t:this.shape_7},{t:this.shape_6},{t:this.instance_2},{t:this.shape_5},{t:this.shape_4},{t:this.instance_1},{t:this.shape_3},{t:this.shape_2},{t:this.instance},{t:this.shape_1},{t:this.shape},{t:this.kotakKartu2},{t:this.kotakKartuSembunyi}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Slots10, new cjs.Rectangle(46.4,221.8,500.5,425.49999999999994), null);


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
	this.lima = new lib.drop12G5();
	this.lima.name = "lima";
	this.lima.setTransform(325.25,468.8,0.4758,0.4758,0,0,0,131.6,54.6);
	new cjs.ButtonHelper(this.lima, 0, 1, 1);

	this.empat = new lib.drop12G4();
	this.empat.name = "empat";
	this.empat.setTransform(325.25,415,0.4758,0.4758,0,0,0,130.8,48.6);
	new cjs.ButtonHelper(this.empat, 0, 1, 1);

	this.tiga = new lib.drop12G3();
	this.tiga.name = "tiga";
	this.tiga.setTransform(325.25,359.4,0.4758,0.4758,0,0,0,140.1,53.7);
	new cjs.ButtonHelper(this.tiga, 0, 1, 1);

	this.dua = new lib.drop12G2();
	this.dua.name = "dua";
	this.dua.setTransform(325.25,293.45,0.4758,0.4758,0,0,0,128.2,59.5);
	new cjs.ButtonHelper(this.dua, 0, 1, 1);

	this.satu = new lib.drop12G1();
	this.satu.name = "satu";
	this.satu.setTransform(325.25,244.8,0.4758,0.4758,0,0,0,129.7,50);
	new cjs.ButtonHelper(this.satu, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.satu},{t:this.dua},{t:this.tiga},{t:this.empat},{t:this.lima}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces10, new cjs.Rectangle(250.8,223.2,149,284.40000000000003), null);


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


(lib.Slots1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// slots
	this.kotakKartuSembunyi = new lib.targetcopy3();
	this.kotakKartuSembunyi.name = "kotakKartuSembunyi";
	this.kotakKartuSembunyi.setTransform(-12.65,602.85,0.6294,2.0456);

	this.target = new lib.targetcopy2();
	this.target.name = "target";
	this.target.setTransform(-12.65,384.2,0.6294,2.0456);

	this.kotakKartu2 = new lib.targetcopy_1();
	this.kotakKartu2.name = "kotakKartu2";
	this.kotakKartu2.setTransform(-12.65,384.2,0.6294,2.0456);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.kotakKartu2},{t:this.target},{t:this.kotakKartuSembunyi}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Slots1, new cjs.Rectangle(-56.5,332.7,86.7,316.40000000000003), null);


(lib.Pieces1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// pieces
	this.target = new lib.drag12G12();
	this.target.name = "target";
	this.target.setTransform(274.85,383.2,0.9283,0.9421,0,0,0,45.1,46.9);
	new cjs.ButtonHelper(this.target, 0, 1, 1);

	this.target_1 = new lib.drag12G11();
	this.target_1.name = "target_1";
	this.target_1.setTransform(183,383.2,0.9283,0.9421,0,0,0,45.1,46.9);
	new cjs.ButtonHelper(this.target_1, 0, 1, 1);

	this.target_2 = new lib.drag12G10();
	this.target_2.name = "target_2";
	this.target_2.setTransform(92.8,383.2,0.9283,0.9421,0,0,0,45.1,46.9);
	new cjs.ButtonHelper(this.target_2, 0, 1, 1);

	this.hemm = new lib.drag11G13();
	this.hemm.name = "hemm";
	this.hemm.setTransform(365,383.3,0.928,0.9446,0,0,0,45.1,46.9);
	new cjs.ButtonHelper(this.hemm, 0, 1, 1);

	this.hemm_1 = new lib.drag7G10copy();
	this.hemm_1.name = "hemm_1";
	this.hemm_1.setTransform(456.05,382.5,0.9279,0.9279,0,0,0,45,47);
	new cjs.ButtonHelper(this.hemm_1, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.hemm_1},{t:this.hemm},{t:this.target_2},{t:this.target_1},{t:this.target}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces1, new cjs.Rectangle(51,335.7,446.8,95.30000000000001), null);


(lib.btnEitcopy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Pathcopy3();
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

}).prototype = getMCSymbolPrototype(lib.btnEitcopy3, new cjs.Rectangle(0,0,255.9,255.9), null);


(lib.btnEitcopy2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Pathcopy2();
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

}).prototype = getMCSymbolPrototype(lib.btnEitcopy2, new cjs.Rectangle(0,0,255.9,255.9), null);


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

	// Layer_5
	this.instance = new lib._12();
	this.instance.setTransform(-224,-234,0.9988,0.9988);

	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_2
	this.instance_1 = new lib.Tween7("synched",0);
	this.instance_1.setTransform(42.25,-40.25);
	this.instance_1.alpha = 0;

	this.instance_2 = new lib.Tween8copy_1("synched",0);
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

	// Layer_5
	this.instance = new lib._26();
	this.instance.setTransform(-252,-259,0.9433,1.1661);

	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_2
	this.instance_1 = new lib.Tween7("synched",0);
	this.instance_1.setTransform(42.25,-40.25);
	this.instance_1.alpha = 0;

	this.instance_2 = new lib.Tween8copy_1("synched",0);
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
	this.frame_24 = function() {
		this.gotoAndStop(0);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(12).call(this.frame_12).wait(12).call(this.frame_24).wait(1));

	// Layer_5
	this.instance = new lib._13();
	this.instance.setTransform(-281,-234,1.0024,1.0024);

	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_2
	this.instance_1 = new lib.Tween7("synched",0);
	this.instance_1.setTransform(42.25,-40.25);
	this.instance_1.alpha = 0;

	this.instance_2 = new lib.Tween8copy_1("synched",0);
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
	this.frame_24 = function() {
		this.gotoAndStop(0);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(12).call(this.frame_12).wait(12).call(this.frame_24).wait(1));

	// Layer_5
	this.exit = new lib.btnEitcopy();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);
	this.exit._off = true;

	this.timeline.addTween(cjs.Tween.get(this.exit).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// jawaban1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAcBLIAAhfQAAgOgGgGQgGgHgOAAQgTAAgKASIAABoIghAAIAAiTIAfAAIABARQAQgTAaAAQAuAAABA0IAABhg");
	this.shape.setTransform(131.425,-238.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgwBAQgPgNAAgTQABgXARgMQARgMAgAAIAUAAIAAgKQAAgLgGgIQgGgGgNAAQgLAAgHAFQgIAGAAAJIggAAQgBgMAJgLQAHgLAOgFQAOgHARABQAZgBAQANQAQANAAAYIAABCQgBAUAHALIAAADIgiAAQgDgEgCgKQgQARgVAAQgXAAgNgNgAgUALQgKAHAAALQABAKAGAFQAGAGALAAQAJAAAJgFQAIgEAEgJIAAgbIgSAAQgRAAgJAGg");
	this.shape_1.setTransform(116.1,-238.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AghBYIgBAQIgeAAIAAjRIAhAAIAABMQAPgRAXAAQAbAAAQAUQAPAUAAAjIAAACQAAAjgPAUQgQAUgbAAQgZAAgPgSgAgfAAIAAA8QAJATAWAAQAPAAAIgLQAJgMAAgXIAAgFQAAgYgJgLQgIgMgQAAQgVAAgJATg");
	this.shape_2.setTransform(100.95,-241.575);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgwBAQgOgNgBgTQAAgXASgMQASgMAfAAIAVAAIAAgKQgBgLgGgIQgHgGgMAAQgLAAgHAFQgHAGgBAJIghAAQABgMAHgLQAJgLAOgFQAOgHAPABQAagBAQANQAPANABAYIAABCQAAAUAFALIAAADIgiAAQgCgEgBgKQgQARgWAAQgWAAgOgNgAgUALQgJAHAAALQAAAKAGAFQAGAGALAAQAJAAAIgFQAJgEAFgJIAAgbIgSAAQgSAAgJAGg");
	this.shape_3.setTransform(85.2,-238.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAfBKIgfhlIgeBlIgcAAIgoiTIAgAAIAYBkIAehkIAYAAIAfBlIAYhlIAgAAIgoCTg");
	this.shape_4.setTransform(67.175,-238.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgxBAQgNgNAAgTQAAgXARgMQARgMAgAAIAUAAIAAgKQABgLgHgIQgGgGgMAAQgMAAgHAFQgIAGABAJIghAAQgBgMAJgLQAHgLAOgFQAPgHAQABQAagBAPANQAPANAAAYIAABCQAAAUAHALIAAADIgiAAQgDgEgBgKQgRARgVAAQgXAAgOgNgAgUALQgKAHAAALQAAAKAHAFQAGAGALAAQAJAAAIgFQAJgEAEgJIAAgbIgSAAQgRAAgJAGg");
	this.shape_5.setTransform(49.25,-238.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgvBVQgRgPAAgcIAiAAQAAAPAJAIQAHAIAOAAQAOAAAJgJQAHgJABgQIAAiLIAiAAIAACLQAAAcgRARQgTARgdAAQgeAAgRgQg");
	this.shape_6.setTransform(33.2,-241.025);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgmBLIAAiTIAgAAIABARQALgTAVAAQAHAAAFACIAAAfIgOgBQgXAAgHARIAABkg");
	this.shape_7.setTransform(14.875,-238.725);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgxBAQgOgNABgTQAAgXARgMQARgMAgAAIAVAAIAAgKQAAgLgHgIQgGgGgMAAQgMAAgHAFQgHAGAAAJIgiAAQABgMAHgLQAJgLAOgFQAOgHAPABQAbgBAPANQAPANAAAYIAABCQABAUAFALIAAADIgiAAQgCgEgBgKQgQARgWAAQgXAAgOgNgAgUALQgKAHABALQgBAKAHAFQAGAGALAAQAJAAAIgFQAJgEAFgJIAAgbIgSAAQgSAAgJAGg");
	this.shape_8.setTransform(1.75,-238.6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AggBYIgCAQIgeAAIAAjRIAhAAIAABMQAPgRAXAAQAbAAAPAUQAQAUAAAjIAAACQAAAjgQAUQgPAUgbAAQgZAAgOgSgAgfAAIAAA8QAJATAWAAQAOAAAJgLQAIgMAAgXIAAgFQAAgYgIgLQgIgMgQAAQgVAAgJATg");
	this.shape_9.setTransform(-13.4,-241.575);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("ABIBLIAAhfQAAgOgHgHQgGgGgOAAQgLAAgHAGQgIAGgDAKIABBkIghAAIAAhgQAAgagaAAQgUAAgJAQIAABqIghAAIAAiTIAgAAIAAAQQAQgSAbAAQAdAAALAWQAQgWAdAAQAZAAAMANQAMAOAAAaIAABgg");
	this.shape_10.setTransform(-33.775,-238.725);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgsA5QgUgUAAghIAAgEQAAgWAIgRQAJgRAPgKQAQgJASAAQAeAAAQASQARAUAAAjIAAANIhgAAQACASALALQAKAKAQAAQAWAAAPgSIASARQgJANgPAHQgPAIgTAAQgeAAgTgUgAgUgnQgIAJgCARIA+AAIAAgCQgBgRgIgIQgHgJgOAAQgNAAgJAKg");
	this.shape_11.setTransform(-53.35,-238.6);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("Ag+BjIAAjGIAjAAIAACrIBZAAIAAAbg");
	this.shape_12.setTransform(-67.9,-241.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).to({state:[]},1).wait(12));

	// Layer_4
	this.lima = new lib.drop12G5();
	this.lima.name = "lima";
	this.lima.setTransform(24.25,112.7,0.7198,0.7198,0,0,0,131.7,54.6);
	new cjs.ButtonHelper(this.lima, 0, 1, 1);

	this.empat = new lib.drop12G4();
	this.empat.name = "empat";
	this.empat.setTransform(-246.95,81.55,0.7198,0.7198,0,0,0,130.8,48.5);
	new cjs.ButtonHelper(this.empat, 0, 1, 1);

	this.tiga = new lib.drop12G3();
	this.tiga.name = "tiga";
	this.tiga.setTransform(319.1,-65.85,0.7198,0.7198,0,0,0,140.1,53.6);
	new cjs.ButtonHelper(this.tiga, 0, 1, 1);

	this.dua = new lib.drop12G2();
	this.dua.name = "dua";
	this.dua.setTransform(22.1,-90.9,0.7198,0.7198,0,0,0,128.2,59.5);
	new cjs.ButtonHelper(this.dua, 0, 1, 1);

	this.satu = new lib.drop12G1();
	this.satu.name = "satu";
	this.satu.setTransform(-241.9,-113.9,0.7198,0.7198,0,0,0,129.7,50);
	new cjs.ButtonHelper(this.satu, 0, 1, 1);

	this.lima_1 = new lib.drag12G5();
	this.lima_1.name = "lima_1";
	this.lima_1.setTransform(23.1,24.6,1.0902,1.0902,0,0,0,87.5,23.7);

	this.empat_1 = new lib.drag12G4();
	this.empat_1.name = "empat_1";
	this.empat_1.setTransform(-249,27.05,1.0902,1.0902,0,0,0,0.2,0.1);

	this.tiga_1 = new lib.drag12G3();
	this.tiga_1.name = "tiga_1";
	this.tiga_1.setTransform(312.85,-148.95,1.0902,1.0902,0,0,0,86.7,25.1);

	this.dua_1 = new lib.drag12G2();
	this.dua_1.name = "dua_1";
	this.dua_1.setTransform(18.6,-154.15,1.0902,1.0902,0,0,0,79.7,33);

	this.satu_1 = new lib.drag12G1();
	this.satu_1.name = "satu_1";
	this.satu_1.setTransform(-245.2,-162.45,1.0902,1.0902,0,0,0,81.6,27.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.satu_1},{t:this.dua_1},{t:this.tiga_1},{t:this.empat_1},{t:this.lima_1},{t:this.satu},{t:this.dua},{t:this.tiga},{t:this.empat},{t:this.lima}]},12).to({state:[]},1).wait(12));

	// Layer_8
	this.instance = new lib.kkoo();
	this.instance.setTransform(43.05,-17.05,1,1,0,0,0,404.1,193.9);
	this.instance.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,15);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_2
	this.instance_1 = new lib.Tween7copy_1("synched",0);
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
	this.cobaBG = new lib.Tween10copy();
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
	this.exit = new lib.btnEitcopy2();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);
	this.exit._off = true;

	this.timeline.addTween(cjs.Tween.get(this.exit).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// jawaban2
	this.pieces1 = new lib.Pieces1copy();
	this.pieces1.name = "pieces1";
	this.pieces1.setTransform(-361.75,-501.05,1.2656,1.2656,0,0,0,-0.1,-0.1);
	this.pieces1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.pieces1).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// jawaban1
	this.target = new lib.drag12G12();
	this.target.name = "target";
	this.target.setTransform(277.2,29.35,2.3385,2.3732,0,0,0,45.1,46.9);
	new cjs.ButtonHelper(this.target, 0, 1, 1);

	this.target_1 = new lib.drag12G11();
	this.target_1.name = "target_1";
	this.target_1.setTransform(45.9,29.35,2.3385,2.3732,0,0,0,45.1,46.9);
	new cjs.ButtonHelper(this.target_1, 0, 1, 1);

	this.target_2 = new lib.drag12G10();
	this.target_2.name = "target_2";
	this.target_2.setTransform(-181.25,29.35,2.3385,2.3732,0,0,0,45.1,46.9);
	new cjs.ButtonHelper(this.target_2, 0, 1, 1);

	this.drag2G1 = new lib.drag12GJudul();
	this.drag2G1.name = "drag2G1";
	this.drag2G1.setTransform(54.2,-148.6,2.5251,2.5251,0,0,0,98,14.2);
	new cjs.ButtonHelper(this.drag2G1, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.drag2G1},{t:this.target_2},{t:this.target_1},{t:this.target}]},12).to({state:[]},1).wait(12));

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

	this.instance_3 = new lib.Tween7copy3("synched",0);
	this.instance_3.setTransform(42.25,-40.25);
	this.instance_3.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},12).to({state:[{t:this.instance_3}]},12).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true,alpha:1},12).wait(13));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:false},12).to({_off:true,alpha:0},12).wait(1));

	// Layer_3
	this.cobaBG = new lib.Tween10copy2();
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
	this.exit = new lib.btnEitcopy3();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);
	this.exit._off = true;

	this.timeline.addTween(cjs.Tween.get(this.exit).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgIAJQgDgEAAgEQAAgFADgDQADgEAFAAQAGAAADAEQADADAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape.setTransform(-267.15,169.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AggBCQgNgLgCgUIATAAQABANAIAHQAHAGAMABQANAAAIgKQAIgJAAgQQAAgPgJgKQgIgIgNAAQgMAAgIAGIgFADIgPgDIAHhMIBNAAIAAASIg8AAIgFAqQALgIAOAAQAUABANAOQAMAMAAAYQAAAXgNANQgNAOgWAAQgTAAgNgLg");
	this.shape_1.setTransform(-275.425,163.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgIAJQgDgEAAgEQAAgEADgEQADgEAFABQAGgBADAEQADAEAAAEQAAAEgDAEQgDACgGAAQgFAAgDgCg");
	this.shape_2.setTransform(-267.15,119.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAOBMIAAgjIhEAAIAAgMIBDhoIAVAAIAABkIAVAAIAAAQIgVAAIAAAjgAAMgtIgsBGIAuAAIAAhJg");
	this.shape_3.setTransform(-275.775,112.65);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgIAIQgDgDAAgFQAAgDADgEQADgEAFABQAGgBADAEQADAEAAADQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_4.setTransform(-267.15,65.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgiBDQgNgMAAgTIATAAQAAAMAIAHQAIAHAMAAQAOAAAHgHQAIgIAAgNQAAgNgJgHQgHgIgPAAIgOAAIAAgPIAOAAQANABAIgIQAHgGABgNQgBgagaAAQgLAAgIAHQgHAHAAAMIgUAAQAAgSANgMQAOgMATAAQAWAAAMAMQAMAKAAAVQAAAKgHAJQgGAJgLAFQANADAGAJQAHAKAAAMQAAAVgNAMQgNAMgWAAQgUAAgOgLg");
	this.shape_5.setTransform(-276,59.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgIAIQgDgDAAgFQAAgDADgEQADgEAFABQAGgBADAEQADAEAAADQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_6.setTransform(-267.15,-31);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgvBNIAAgOIAzg6QAMgNAFgIQAEgIAAgJQAAgMgHgIQgHgHgLAAQgPAAgIAIQgIAIAAAPIgTAAQAAgVAOgNQANgNAXAAQAUAAAMALQAMALAAASQAAAXgcAeIgoAsIBLAAIAAAQg");
	this.shape_7.setTransform(-275.725,-37.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgIAIQgDgDAAgFQAAgEADgDQADgDAFgBQAGABADADQADADAAAEQAAAFgDADQgDADgGABQgFgBgDgDg");
	this.shape_8.setTransform(-267.15,-181.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAKBMIAAh/IgmAOIAAgSIA2gUIADAAIAACXg");
	this.shape_9.setTransform(-277.125,-188.125);

	this.instance = new lib.RestoreIcon_1("single",0);
	this.instance.setTransform(-85.8,114.95,0.7302,0.7302,0,0,0,-0.2,0);
	this.instance.alpha = 0.75;

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAZA6IAAhKQAAgNgFgFQgGgGgLAAQgJAAgHAFQgHAFgEAIIAABQIgUAAIAAhxIATAAIABAPQANgRATAAQAkAAAAApIAABKg");
	this.shape_10.setTransform(187.1,164.25);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgjAxQgKgKAAgOQAAgRANgJQANgKAXAAIATAAIAAgJQAAgKgFgGQgHgGgLAAQgKAAgHAFQgHAGAAAHIgTAAQgBgIAHgJQAFgIALgEQAKgEAMgBQATAAALAKQALAKABARIAAAzQAAAQAEAJIAAACIgUAAQgCgEgCgIQgNAOgRgBQgRAAgLgJgAgaAWQAAAJAFAGQAHAFAJAAQAJAAAHgFQAJgFADgHIAAgXIgPAAQgiAAAAAUg");
	this.shape_11.setTransform(175.35,164.35);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAZA6IAAhKQAAgNgFgFQgGgGgLAAQgJAAgHAFQgHAFgEAIIAABQIgUAAIAAhxIATAAIABAPQANgRATAAQAkAAAAApIAABKg");
	this.shape_12.setTransform(163.7,164.25);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgjAxQgKgKAAgOQAAgRANgJQANgKAXAAIATAAIAAgJQAAgKgFgGQgHgGgLAAQgKAAgHAFQgHAGAAAHIgTAAQgBgIAHgJQAFgIALgEQAKgEAMgBQATAAALAKQALAKABARIAAAzQAAAQADAJIAAACIgTAAQgCgEgCgIQgNAOgRgBQgRAAgLgJgAgaAWQAAAJAFAGQAHAFAJAAQAJAAAHgFQAJgFADgHIAAgXIgPAAQgiAAAAAUg");
	this.shape_13.setTransform(151.95,164.35);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAYBQIgmg0IgMANIAAAnIgUAAIAAifIAUAAIAABgIAKgNIAigkIAYAAIgrAuIAwBCg");
	this.shape_14.setTransform(141.475,161.975);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgWA2QgKgFgGgJQgGgIAAgKIATAAQABAKAHAFQAIAGAKAAQALAAAHgEQAHgFAAgHQAAgIgGgFQgGgEgOgDQgPgDgIgEQgJgEgEgGQgEgGAAgIQAAgPAMgJQAMgKARAAQATAAAMAKQAMAKAAAQIgUAAQAAgIgGgGQgHgFgKAAQgKAAgGAEQgGAFAAAHQAAAHAGAEQAFADAOAEQAOADAJAEQAJAEAFAGQAEAGAAAJQAAAPgMAJQgMAKgUgBQgMAAgLgEg");
	this.shape_15.setTransform(124.475,164.35);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgjAxQgLgKABgOQAAgRANgJQANgKAXAAIATAAIAAgJQAAgKgFgGQgHgGgLAAQgKAAgHAFQgHAGAAAHIgTAAQAAgIAFgJQAHgIAKgEQAKgEAMgBQATAAALAKQALAKAAARIAAAzQABAQAEAJIAAACIgUAAQgCgEgCgIQgNAOgRgBQgRAAgLgJgAgaAWQAAAJAFAGQAHAFAJAAQAIAAAIgFQAJgFADgHIAAgXIgPAAQgjAAABAUg");
	this.shape_16.setTransform(113.15,164.35);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgDBAQgGgIAAgPIAAhFIgVAAIAAgPIAVAAIAAgbIASAAIAAAbIAVAAIAAAPIgVAAIAABFQAAAHADAEQADADAGAAIAKgBIAAAPQgIACgHAAQgNAAgGgHg");
	this.shape_17.setTransform(103.575,163.075);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgjAxQgKgKAAgOQAAgRANgJQANgKAYAAIATAAIAAgJQgBgKgGgGQgGgGgLAAQgKAAgHAFQgHAGAAAHIgUAAQAAgIAHgJQAFgIALgEQAKgEALgBQAUAAALAKQALAKABARIAAAzQAAAQADAJIAAACIgUAAQgBgEgBgIQgOAOgSgBQgQAAgLgJgAgbAWQAAAJAHAGQAGAFAJAAQAJAAAHgFQAIgFAFgHIAAgXIgQAAQgiAAgBAUg");
	this.shape_18.setTransform(94.55,164.35);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAYBQIgmg0IgMANIAAAnIgUAAIAAifIAUAAIAABgIAKgNIAigkIAYAAIgrAuIAwBCg");
	this.shape_19.setTransform(78.725,161.975);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgjAxQgLgKAAgOQAAgRAOgJQANgKAYAAIATAAIAAgJQAAgKgHgGQgGgGgLAAQgKAAgHAFQgHAGAAAHIgUAAQAAgIAHgJQAFgIALgEQAKgEALgBQAUAAALAKQALAKABARIAAAzQAAAQADAJIAAACIgUAAQgBgEgBgIQgOAOgSgBQgQAAgLgJgAgbAWQAAAJAHAGQAGAFAKAAQAHAAAIgFQAIgFAFgHIAAgXIgQAAQgjAAAAAUg");
	this.shape_20.setTransform(66.75,164.35);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgDBAQgGgIAAgPIAAhFIgVAAIAAgPIAVAAIAAgbIASAAIAAAbIAVAAIAAAPIgVAAIAABFQAAAHADAEQADADAGAAIAKgBIAAAPQgIACgHAAQgNAAgGgHg");
	this.shape_21.setTransform(57.175,163.075);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgkAqQgOgPAAgaIAAgBQgBgQAHgOQAGgNAMgHQAMgIAOAAQAXABAOAQQAOAPAAAaIAAACQAAAQgGANQgHANgLAHQgMAIgPgBQgWABgOgRgAgWgfQgJAMAAAVQAAASAJALQAIAMAOAAQAOAAAKgMQAIgLAAgUQAAgSgJgMQgIgLgPAAQgOgBgIALg");
	this.shape_22.setTransform(47.95,164.35);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AAYBQIgmg0IgMANIAAAnIgUAAIAAifIAUAAIAABgIAKgNIAigkIAYAAIgrAuIAwBCg");
	this.shape_23.setTransform(37.175,161.975);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgjAxQgKgKAAgOQAAgRANgJQANgKAYAAIATAAIAAgJQgBgKgFgGQgHgGgLAAQgKAAgHAFQgHAGAAAHIgUAAQAAgIAHgJQAFgIALgEQAKgEALgBQAUAAALAKQALAKABARIAAAzQAAAQADAJIAAACIgUAAQgBgEgBgIQgOAOgSgBQgQAAgLgJgAgaAWQgBAJAHAGQAGAFAJAAQAJAAAHgFQAIgFAFgHIAAgXIgQAAQgiAAAAAUg");
	this.shape_24.setTransform(19.85,164.35);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgiBBQgMgQAAgaIAAgBQgBgZAMgQQANgQAUAAQATAAALAOIAAg7IATAAIAACfIgRAAIgBgMQgLAOgUAAQgUAAgMgQgAgTgHQgJAKABAVQgBATAJALQAHALANAAQATAAAIgRIAAgyQgIgQgSAAQgOAAgHALg");
	this.shape_25.setTransform(7.7,162.075);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgjAxQgLgKAAgOQAAgRAOgJQANgKAYAAIATAAIAAgJQAAgKgHgGQgGgGgLAAQgKAAgHAFQgHAGAAAHIgUAAQAAgIAHgJQAFgIALgEQAKgEALgBQAUAAALAKQALAKABARIAAAzQAAAQADAJIAAACIgUAAQgBgEgBgIQgOAOgSgBQgQAAgLgJgAgbAWQAAAJAHAGQAGAFAKAAQAHAAAIgFQAIgFAFgHIAAgXIgQAAQgjAAAAAUg");
	this.shape_26.setTransform(-3.9,164.35);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgvBPIAAibIASAAIABAMQAMgOAUAAQAUAAAMAPQAMAPAAAcIAAACQAAAYgMAQQgMAQgUAAQgUAAgLgNIAAA2gAgbguIAAA1QAIAPASAAQANAAAIgLQAIgLAAgVQAAgTgIgLQgIgLgNAAQgSAAgIAQg");
	this.shape_27.setTransform(-15.425,166.425);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AAZA6IAAhKQAAgNgFgFQgGgGgLAAQgJAAgHAFQgHAFgEAIIAABQIgTAAIAAhxIASAAIABAPQANgRATAAQAkAAAAApIAABKg");
	this.shape_28.setTransform(-32.85,164.25);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgjAxQgKgKAAgOQAAgRANgJQANgKAXAAIAUAAIAAgJQgBgKgFgGQgHgGgLAAQgKAAgHAFQgHAGAAAHIgUAAQAAgIAHgJQAFgIALgEQAKgEALgBQAUAAALAKQALAKABARIAAAzQAAAQADAJIAAACIgTAAQgCgEgBgIQgOAOgSgBQgQAAgLgJgAgaAWQgBAJAHAGQAGAFAJAAQAJAAAHgFQAIgFAFgHIAAgXIgQAAQgiAAAAAUg");
	this.shape_29.setTransform(-44.6,164.35);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AAYBQIgmg0IgMANIAAAnIgUAAIAAifIAUAAIAABgIAKgNIAigkIAYAAIgrAuIAwBCg");
	this.shape_30.setTransform(-55.075,161.975);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AAYBQIgmg0IgMANIAAAnIgUAAIAAifIAUAAIAABgIAKgNIAigkIAYAAIgrAuIAwBCg");
	this.shape_31.setTransform(-65.875,161.975);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgiAvQgJgKgBgVIAAhJIAUAAIAABIQAAAaAVAAQAVAAAIgRIAAhRIATAAIAABxIgTAAIAAgLQgMANgVgBQgRAAgKgKg");
	this.shape_32.setTransform(-77.9,164.45);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgVBiIAAgPIAJAAQAHAAAEgDQACgEAAgIIAAh+IATAAIAAB9QAAAhgcAAQgHAAgGgCgAABhQQgBgDAAgFQAAgEABgDQADgEAGAAQAGAAADADQACAEAAAEQAAAFgCADQgDADgGAAQgGAAgDgDg");
	this.shape_33.setTransform(-87.45,164.575);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AAZA6IAAhKQAAgNgFgFQgGgGgMAAQgIAAgHAFQgHAFgEAIIAABQIgTAAIAAhxIASAAIABAPQAMgRAVAAQAjAAABApIAABKg");
	this.shape_34.setTransform(-94.75,164.25);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AghAvQgKgKAAgVIAAhJIATAAIAABIQAAAaAVAAQAVAAAHgRIAAhRIAUAAIAABxIgTAAIAAgLQgMANgUgBQgTAAgIgKg");
	this.shape_35.setTransform(-106.55,164.45);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgDBAQgGgIAAgPIAAhFIgVAAIAAgPIAVAAIAAgbIASAAIAAAbIAVAAIAAAPIgVAAIAABFQAAAHADAEQADADAGAAIAKgBIAAAPQgIACgHAAQgNAAgGgHg");
	this.shape_36.setTransform(-116.175,163.075);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgIBNIAAhwIARAAIAABwgAgIg5QgCgDAAgFQAAgFACgDQADgDAFAAQAGAAADADQACADAAAFQAAAFgCADQgDADgGAAQgFAAgDgDg");
	this.shape_37.setTransform(-122,162.3);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgiBBQgMgQAAgaIAAgBQgBgZAMgQQANgQAUAAQATAAALAOIAAg7IATAAIAACfIgRAAIgBgMQgLAOgUAAQgUAAgMgQgAgTgHQgJAKABAVQgBATAJALQAHALANAAQATAAAIgRIAAgyQgIgQgSAAQgOAAgHALg");
	this.shape_38.setTransform(-130.9,162.075);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AghArQgOgPAAgZIAAgDQAAgQAHgOQAGgNAMgHQALgHAMgBQAXAAAMAPQAMAOAAAbIAAAHIhMAAQABARAJAKQAKALANAAQAKAAAIgEQAGgEAGgHIALAJQgOAWgcgBQgWABgPgQgAgRghQgIAIgCAPIA3AAIAAgBQAAgPgHgHQgIgJgMABQgKAAgIAIg");
	this.shape_39.setTransform(-147.45,164.35);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AA8A6IAAhKQAAgMgGgGQgFgGgNAAQgLAAgHAHQgHAFgBAMIAABKIgTAAIAAhJQAAgZgYAAQgTAAgHAQIAABSIgTAAIAAhxIASAAIABANQAMgPAVAAQAYABAHARQAGgHAJgFQAJgGAMAAQAlAAABAoIAABLg");
	this.shape_40.setTransform(-162.575,164.25);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgjAxQgKgKAAgOQAAgRANgJQANgKAXAAIAUAAIAAgJQgBgKgFgGQgHgGgLAAQgKAAgHAFQgHAGAAAHIgUAAQAAgIAHgJQAFgIALgEQAKgEALgBQAUAAALAKQALAKABARIAAAzQAAAQADAJIAAACIgTAAQgCgEgBgIQgOAOgSgBQgQAAgLgJgAgaAWQgBAJAHAGQAGAFAJAAQAJAAAHgFQAIgFAFgHIAAgXIgQAAQgiAAAAAUg");
	this.shape_41.setTransform(-177.8,164.35);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgXBKQgMgFgGgJIAKgLQAMAPASAAQANAAAIgIQAIgIAAgOIAAgKQgLANgTAAQgUAAgMgQQgNgQAAgaQAAgbAMgPQANgQAUAAQAUAAALAPIABgNIASAAIAABuQAAAVgNANQgNANgWAAQgLAAgMgGgAgTgzQgIALAAAVQAAATAIAKQAHALANAAQATAAAIgRIAAgyQgJgQgRAAQgNAAgIALg");
	this.shape_42.setTransform(-189.775,166.475);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgaA6IAAhxIATAAIAAAOQAIgPASgBQAGABACABIAAASIgJgBQgSAAgHAQIAABQg");
	this.shape_43.setTransform(-203.975,164.25);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgkAqQgPgPAAgaIAAgBQABgQAGgOQAHgNALgHQAMgIAOAAQAXABAOAQQAPAPAAAaIAAACQAAAQgHANQgGANgMAHQgMAIgPgBQgWABgOgRgAgXgfQgIAMAAAVQAAASAIALQAJAMAOAAQAPAAAJgMQAIgLAAgUQAAgSgJgMQgJgLgOAAQgNgBgKALg");
	this.shape_44.setTransform(-214.25,164.35);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AAYBQIgmg0IgMANIAAAnIgUAAIAAifIAUAAIAABgIAKgNIAigkIAYAAIgrAuIAwBCg");
	this.shape_45.setTransform(-225.025,161.975);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgaBIQgOgGgHgLQgHgKAAgNIAUAAQAAAOAKAIQAKAIAQAAQAQgBAIgGQAJgGAAgMQAAgKgIgHQgIgGgTgFQgagIgMgKQgMgLAAgPQAAgTAPgLQAOgMAWAAQAQAAAMAGQAMAGAHALQAHALAAAMIgUAAQAAgOgJgHQgJgJgQAAQgOABgIAGQgIAGAAAMQAAAJAIAHQAHAGASAGQATAFALAFQALAHAFAIQAFAJAAALQAAATgOALQgPALgYAAQgPAAgNgGg");
	this.shape_46.setTransform(-237.475,162.4);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AggArQgPgPAAgZIAAgDQAAgQAHgOQAGgNAMgHQALgHAMgBQAXAAAMAPQAMAOAAAbIAAAHIhMAAQABARAJAKQAKALANAAQAKAAAIgEQAGgEAGgHIALAJQgOAWgcgBQgWABgOgQgAgRghQgIAIgCAPIA3AAIAAgBQAAgPgHgHQgHgJgNABQgKAAgIAIg");
	this.shape_47.setTransform(115,113.05);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AA8A6IAAhKQAAgMgGgGQgFgGgNAAQgLAAgHAHQgHAFgBAMIAABKIgTAAIAAhJQAAgZgYAAQgTAAgHAQIAABSIgTAAIAAhxIASAAIABANQAMgPAVAAQAYABAHARQAGgHAJgFQAJgGAMAAQAlAAABAoIAABLg");
	this.shape_48.setTransform(99.925,112.95);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgjAxQgLgKAAgOQAAgRAOgJQANgKAXAAIATAAIAAgJQAAgKgFgGQgHgGgLAAQgKAAgHAFQgHAGAAAHIgTAAQAAgIAFgIQAHgJAKgEQAKgEAMgBQATAAALAKQALAKAAARIAAAzQAAAQAFAJIAAACIgUAAQgDgEgBgIQgNAOgRgBQgRAAgLgJgAgaAWQAAAJAFAGQAHAFAKAAQAHAAAJgFQAHgFAEgHIAAgXIgPAAQgjAAABAUg");
	this.shape_49.setTransform(84.7,113.05);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgXBKQgMgFgGgJIAKgLQAMAPASAAQANAAAIgIQAIgIAAgOIAAgKQgLANgTAAQgUAAgMgQQgNgQAAgaQAAgbAMgPQANgQAUAAQAUAAALAPIABgNIASAAIAABuQAAAVgNANQgNANgWAAQgLAAgMgGgAgTgzQgIALAAAVQAAATAIAKQAHALANAAQATAAAIgRIAAgyQgJgQgRAAQgNAAgIALg");
	this.shape_50.setTransform(72.725,115.175);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgJBNIAAhwIATAAIAABwgAgHg5QgEgDAAgFQAAgFAEgDQADgDAEAAQAFAAADADQAEADAAAFQAAAFgEADQgDADgFAAQgEAAgDgDg");
	this.shape_51.setTransform(58.95,111);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgXBKQgMgFgGgJIAKgLQAMAPASAAQANAAAIgIQAIgIAAgOIAAgKQgLANgTAAQgUAAgMgQQgNgQAAgaQAAgbAMgPQANgQAUAAQAUAAALAPIABgNIASAAIAABuQAAAVgNANQgNANgWAAQgLAAgMgGgAgTgzQgIALAAAVQAAATAIAKQAHALANAAQATAAAIgRIAAgyQgJgQgRAAQgNAAgIALg");
	this.shape_52.setTransform(50.175,115.175);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AAZA6IAAhKQAAgNgFgFQgGgGgMAAQgIAAgHAFQgHAFgEAIIAABQIgTAAIAAhxIASAAIABAPQAMgRAVAAQAjAAABApIAABKg");
	this.shape_53.setTransform(38.55,112.95);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgjAxQgLgKAAgOQAAgRAOgJQANgKAYAAIATAAIAAgJQAAgKgHgGQgGgGgLAAQgKAAgHAFQgHAGAAAHIgUAAQABgIAFgIQAHgJAKgEQAKgEALgBQAUAAALAKQALAKAAARIAAAzQAAAQAEAJIAAACIgUAAQgCgEAAgIQgOAOgSgBQgQAAgLgJgAgbAWQAAAJAHAGQAGAFAKAAQAHAAAJgFQAIgFAEgHIAAgXIgQAAQgjAAAAAUg");
	this.shape_54.setTransform(26.8,113.05);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgJBQIAAifIASAAIAACfg");
	this.shape_55.setTransform(18.35,110.675);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgiAvQgJgKAAgVIAAhJIATAAIAABIQAAAaAVAAQAVAAAIgRIAAhRIATAAIAABxIgTAAIAAgLQgMANgVgBQgRAAgKgKg");
	this.shape_56.setTransform(9.85,113.15);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AAYBQIgmg0IgMANIAAAnIgUAAIAAifIAUAAIAABgIAKgNIAigkIAYAAIgrAuIAwBCg");
	this.shape_57.setTransform(-6.025,110.675);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgiAvQgJgKgBgVIAAhJIAUAAIAABIQAAAaAVAAQAVAAAIgRIAAhRIATAAIAABxIgTAAIAAgLQgMANgVgBQgRAAgKgKg");
	this.shape_58.setTransform(-18.05,113.15);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgDBAQgGgIAAgPIAAhFIgVAAIAAgPIAVAAIAAgbIASAAIAAAbIAVAAIAAAPIgVAAIAABFQAAAHADAEQADADAGAAIAKgBIAAAPQgIACgHAAQgNAAgGgHg");
	this.shape_59.setTransform(-27.675,111.775);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AAZA6IAAhKQAAgNgFgFQgGgGgMAAQgIAAgHAFQgHAFgEAIIAABQIgTAAIAAhxIASAAIABAPQAMgRAVAAQAjAAABApIAABKg");
	this.shape_60.setTransform(-36.7,112.95);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AghAvQgKgKAAgVIAAhJIATAAIAABIQAAAaAVAAQAVAAAHgRIAAhRIAUAAIAABxIgTAAIAAgLQgMANgUgBQgTAAgIgKg");
	this.shape_61.setTransform(-48.5,113.15);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgIBQIAAifIASAAIAACfg");
	this.shape_62.setTransform(-115.8,110.675);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgkAqQgPgPAAgaIAAgBQABgQAGgOQAHgNALgHQAMgIAOAAQAXABAOAQQAOAPAAAaIAAACQABAQgHANQgGANgMAHQgMAIgPgBQgWABgOgRgAgXgfQgIAMAAAVQAAASAIALQAKAMANAAQAPAAAIgMQAJgLAAgUQAAgSgJgMQgJgLgOAAQgNgBgKALg");
	this.shape_63.setTransform(-124.45,113.05);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgcBCIgBANIgSAAIAAifIAUAAIAAA8QALgPAUAAQAUAAAMAQQAMAPAAAaIAAACQAAAagMAQQgMAPgUAAQgUAAgMgPgAgbgBIAAAwQAJASASAAQANAAAIgLQAIgLAAgVQAAgUgIgKQgIgKgNAAQgTAAgIARg");
	this.shape_64.setTransform(-136.325,110.775);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AA8A6IAAhKQAAgMgGgGQgFgGgNAAQgLAAgHAHQgHAFgBAMIAABKIgTAAIAAhJQAAgZgYAAQgTAAgHAQIAABSIgTAAIAAhxIASAAIABANQAMgPAVAAQAYABAHARQAGgHAJgFQAJgGAMAAQAlAAABAoIAABLg");
	this.shape_65.setTransform(-151.875,112.95);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgkAqQgOgPAAgaIAAgBQAAgQAGgOQAHgNALgHQAMgIAOAAQAXABAOAQQAOAPAAAaIAAACQABAQgHANQgGANgMAHQgMAIgPgBQgWABgOgRgAgXgfQgIAMAAAVQAAASAIALQAKAMANAAQAPAAAIgMQAJgLAAgUQAAgSgJgMQgIgLgPAAQgNgBgKALg");
	this.shape_66.setTransform(-167.3,113.05);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgDBAQgGgIAAgPIAAhFIgVAAIAAgPIAVAAIAAgbIASAAIAAAbIAVAAIAAAPIgVAAIAABFQAAAHADAEQADADAGAAIAKgBIAAAPQgIACgHAAQgNAAgGgHg");
	this.shape_67.setTransform(-177.175,111.775);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AAZA6IAAhKQAAgNgGgFQgFgGgMAAQgIAAgHAFQgHAFgEAIIAABQIgUAAIAAhxIATAAIAAAPQAOgRATAAQAkAAAAApIAABKg");
	this.shape_68.setTransform(-191.55,112.95);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgjAxQgLgKAAgOQAAgRAOgJQANgKAXAAIATAAIAAgJQAAgKgFgGQgHgGgLAAQgKAAgHAFQgHAGAAAHIgTAAQAAgIAFgIQAHgJAKgEQAKgEAMgBQATAAALAKQALAKAAARIAAAzQAAAQAFAJIAAACIgUAAQgDgEgBgIQgNAOgRgBQgRAAgLgJgAgaAWQAAAJAFAGQAHAFAJAAQAIAAAJgFQAHgFAEgHIAAgXIgPAAQgjAAABAUg");
	this.shape_69.setTransform(-203.3,113.05);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AAYBQIgmg0IgMANIAAAnIgUAAIAAifIAUAAIAABgIAKgNIAigkIAYAAIgrAuIAwBCg");
	this.shape_70.setTransform(-213.775,110.675);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AghArQgOgPAAgZIAAgDQAAgQAGgOQAHgNALgHQAMgHAMgBQAXAAAMAPQAMAOAAAbIAAAHIhLAAQAAARAJAKQAKALANAAQAKAAAIgEQAGgEAGgHIALAJQgOAWgcgBQgWABgPgQgAgRghQgIAIgCAPIA3AAIAAgBQAAgPgHgHQgIgJgMABQgKAAgIAIg");
	this.shape_71.setTransform(-225.4,113.05);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgJBMIAAiHIgxAAIAAgQIB1AAIAAAQIgxAAIAACHg");
	this.shape_72.setTransform(-237.475,111.1);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgDBAQgGgIAAgPIAAhFIgVAAIAAgPIAVAAIAAgbIASAAIAAAbIAVAAIAAAPIgVAAIAABFQAAAHADAEQADADAGAAIAKgBIAAAPQgIACgHAAQgNAAgGgHg");
	this.shape_73.setTransform(336.875,60.475);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AghAvQgKgKAAgVIAAhJIATAAIAABIQAAAaAVAAQAVAAAIgRIAAhRIATAAIAABxIgTAAIAAgLQgLANgVgBQgSAAgJgKg");
	this.shape_74.setTransform(327.8,61.85);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgcBCIgBANIgSAAIAAifIAUAAIAAA8QALgPAUAAQAUAAAMAQQAMAPAAAaIAAACQAAAagMAQQgMAPgUAAQgUAAgMgPgAgbgBIAAAwQAJASASAAQANAAAIgLQAIgLAAgVQAAgUgIgKQgIgKgNAAQgTAAgIARg");
	this.shape_75.setTransform(316.225,59.475);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AghArQgOgPAAgZIAAgDQAAgQAGgOQAHgNALgHQAMgHAMgBQAXAAAMAPQAMAOAAAbIAAAHIhLAAQAAARAKAKQAIALAOAAQAKAAAHgEQAIgEAFgHIALAJQgNAWgdgBQgWABgPgQgAgRghQgIAIgCAPIA4AAIAAgBQgBgPgHgHQgIgJgMABQgKAAgIAIg");
	this.shape_76.setTransform(304.5,61.75);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgWA2QgKgFgGgJQgGgIAAgKIATAAQABAKAHAFQAIAGAKAAQALAAAHgEQAHgFAAgHQAAgIgGgFQgGgEgOgDQgPgDgIgEQgJgEgEgGQgEgGAAgIQAAgPAMgJQAMgKARAAQATAAAMAKQAMAKAAAQIgUAAQAAgIgGgGQgHgFgKAAQgKAAgGAEQgGAFAAAHQAAAHAGAEQAFADAOAEQAOADAJAEQAJADAFAHQAEAGAAAJQAAAPgMAJQgMAKgUgBQgMAAgLgEg");
	this.shape_77.setTransform(293.225,61.75);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgaA6IAAhxIATAAIAAAOQAIgPASgBQAGABACABIAAASIgJgBQgSAAgHAQIAABQg");
	this.shape_78.setTransform(284.675,61.65);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AghArQgOgPAAgZIAAgDQAAgQAGgOQAHgNALgHQAMgHAMgBQAXAAAMAPQAMAOAAAbIAAAHIhLAAQAAARAJAKQAKALANAAQAKAAAIgEQAGgEAGgHIALAJQgOAWgcgBQgWABgPgQgAgRghQgIAIgCAPIA3AAIAAgBQAAgPgHgHQgIgJgMABQgKAAgIAIg");
	this.shape_79.setTransform(275,61.75);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgDBAQgGgIAAgPIAAhFIgVAAIAAgPIAVAAIAAgbIASAAIAAAbIAVAAIAAAPIgVAAIAABFQAAAHADAEQADADAGAAIAKgBIAAAPQgIACgHAAQgNAAgGgHg");
	this.shape_80.setTransform(265.475,60.475);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AAZA6IAAhKQAAgNgFgFQgGgGgLAAQgJAAgHAFQgHAFgEAIIAABQIgTAAIAAhxIASAAIABAPQANgRATAAQAkAAAAApIAABKg");
	this.shape_81.setTransform(251.1,61.65);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgjAxQgKgKAAgOQAAgRANgJQANgKAXAAIAUAAIAAgJQgBgKgFgGQgHgGgLAAQgKAAgHAFQgHAGAAAHIgUAAQAAgIAHgJQAFgIALgEQAKgEALgBQAUAAALAKQALAKABARIAAAzQAAAQADAJIAAACIgTAAQgCgEgBgIQgOAOgRgBQgRAAgLgJgAgaAWQgBAJAHAGQAGAFAJAAQAJAAAHgFQAIgFAFgHIAAgXIgQAAQgiAAAAAUg");
	this.shape_82.setTransform(239.35,61.75);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AAbA5IgbhVIgaBVIgPAAIgihxIATAAIAXBUIAahUIAPAAIAaBWIAXhWIASAAIghBxg");
	this.shape_83.setTransform(225.55,61.75);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AggArQgPgPAAgZIAAgDQAAgQAGgOQAHgNALgHQAMgHANgBQAVAAANAPQAMAOAAAbIAAAHIhMAAQABARAKAKQAIALAOAAQAKAAAHgEQAIgEAFgHIAMAJQgOAWgdgBQgWABgOgQgAgRghQgIAIgCAPIA4AAIAAgBQgBgPgHgHQgHgJgMABQgLAAgIAIg");
	this.shape_84.setTransform(212.05,61.75);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AAZBQIAAhKQAAgMgFgGQgGgFgMAAQgIAAgHAFQgHAFgEAHIAABQIgTAAIAAifIATAAIAAA9QANgQAUAAQAjAAABAoIAABKg");
	this.shape_85.setTransform(200.45,59.375);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgWA2QgKgFgGgJQgGgIAAgKIATAAQABAKAHAFQAIAGAKAAQALAAAHgEQAHgFAAgHQAAgIgGgFQgGgEgOgDQgPgDgIgEQgJgEgEgGQgEgGAAgIQAAgPAMgJQAMgKARAAQATAAAMAKQAMAKAAAQIgUAAQAAgIgGgGQgHgFgKAAQgKAAgGAEQgGAFAAAHQAAAHAGAEQAFADAOAEQAOADAJAEQAJADAFAHQAEAGAAAJQAAAPgMAJQgMAKgUgBQgMAAgLgEg");
	this.shape_86.setTransform(183.675,61.75);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AgjAxQgLgKAAgOQAAgRAOgJQANgKAYAAIASAAIAAgJQABgKgHgGQgGgGgLAAQgKAAgHAFQgHAGAAAHIgTAAQAAgIAFgJQAHgIAKgEQAKgEAMgBQATAAALAKQALAKAAARIAAAzQAAAQAFAJIAAACIgVAAQgCgEgBgIQgNAOgRgBQgRAAgLgJgAgbAWQABAJAFAGQAHAFAKAAQAIAAAIgFQAHgFAEgHIAAgXIgPAAQgjAAAAAUg");
	this.shape_87.setTransform(172.35,61.75);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AgIBQIAAifIASAAIAACfg");
	this.shape_88.setTransform(163.9,59.375);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AghArQgOgPAAgZIAAgDQAAgQAHgOQAGgNAMgHQALgHAMgBQAXAAAMAPQAMAOAAAbIAAAHIhMAAQABARAJAKQAKALANAAQAKAAAIgEQAGgEAGgHIALAJQgOAWgcgBQgWABgPgQgAgRghQgIAIgCAPIA3AAIAAgBQAAgPgHgHQgIgJgMABQgKAAgIAIg");
	this.shape_89.setTransform(155.85,61.75);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AAYBQIgmg0IgMANIAAAnIgUAAIAAifIAUAAIAABgIAKgNIAigkIAYAAIgrAuIAwBCg");
	this.shape_90.setTransform(145.425,59.375);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AAZA6IAAhKQAAgNgFgFQgGgGgMAAQgIAAgHAFQgHAFgEAIIAABQIgTAAIAAhxIASAAIABAPQAMgRAVAAQAjAAABApIAABKg");
	this.shape_91.setTransform(128.1,61.65);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AgjAxQgLgKAAgOQAAgRAOgJQANgKAYAAIATAAIAAgJQAAgKgHgGQgGgGgLAAQgKAAgHAFQgHAGAAAHIgUAAQABgIAGgJQAGgIAKgEQAKgEALgBQAUAAALAKQALAKAAARIAAAzQABAQADAJIAAACIgUAAQgBgEgBgIQgOAOgSgBQgQAAgLgJgAgbAWQAAAJAHAGQAGAFAKAAQAHAAAJgFQAIgFAEgHIAAgXIgQAAQgjAAAAAUg");
	this.shape_92.setTransform(116.35,61.75);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgXBKQgMgFgGgJIAKgLQAMAPASAAQANAAAIgIQAIgIAAgOIAAgKQgLANgTAAQgUAAgMgQQgNgQAAgaQAAgbAMgPQANgQAUAAQAUAAALAPIABgNIASAAIAABuQAAAVgNANQgNANgWAAQgLAAgMgGgAgTgzQgIALAAAVQAAATAIAKQAHALANAAQATAAAIgRIAAgyQgJgQgRAAQgNAAgIALg");
	this.shape_93.setTransform(104.375,63.875);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AAZA6IAAhKQAAgNgFgFQgGgGgLAAQgJAAgHAFQgHAFgEAIIAABQIgTAAIAAhxIASAAIABAPQANgRATAAQAkAAAAApIAABKg");
	this.shape_94.setTransform(92.7,61.65);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AggArQgPgPAAgZIAAgDQAAgQAHgOQAGgNAMgHQALgHANgBQAVAAANAPQAMAOAAAbIAAAHIhMAAQABARAJAKQAJALAOAAQAKAAAIgEQAGgEAGgHIAMAJQgOAWgdgBQgWABgOgQgAgRghQgIAIgCAPIA4AAIAAgBQgBgPgHgHQgIgJgLABQgLAAgIAIg");
	this.shape_95.setTransform(81.35,61.75);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgiBBQgNgQAAgaIAAgBQABgZAMgQQAMgQAUAAQATAAAMAOIAAg7IATAAIAACfIgSAAIgBgMQgMAOgTAAQgUAAgMgQgAgUgHQgHAKgBAVQABATAHALQAJALANAAQASAAAJgRIAAgyQgJgQgSAAQgNAAgJALg");
	this.shape_96.setTransform(69.3,59.475);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AgIBNIAAhwIASAAIAABwgAgHg5QgDgDgBgFQABgEADgEQADgDAEAAQAFAAAEADQACAEABAEQgBAFgCADQgEADgFAAQgEAAgDgDg");
	this.shape_97.setTransform(55.55,59.7);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AgjAxQgKgKAAgOQAAgRANgJQANgKAXAAIATAAIAAgJQAAgKgFgGQgHgGgLAAQgKAAgHAFQgHAGAAAHIgTAAQgBgIAHgJQAFgIALgEQAKgEAMgBQATAAALAKQALAKABARIAAAzQAAAQADAJIAAACIgTAAQgCgEgCgIQgNAOgRgBQgRAAgLgJgAgaAWQAAAJAFAGQAHAFAJAAQAJAAAHgFQAJgFADgHIAAgXIgPAAQgiAAAAAUg");
	this.shape_98.setTransform(47.1,61.75);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AghAvQgKgKAAgVIAAhJIATAAIAABIQAAAaAVAAQAVAAAIgRIAAhRIATAAIAABxIgTAAIAAgLQgLANgWgBQgRAAgJgKg");
	this.shape_99.setTransform(35.4,61.85);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AgWA2QgKgFgGgJQgGgIAAgKIATAAQABAKAHAFQAIAGAKAAQALAAAHgEQAHgFAAgHQAAgIgGgFQgGgEgOgDQgPgDgIgEQgJgEgEgGQgEgGAAgIQAAgPAMgJQAMgKARAAQATAAAMAKQAMAKAAAQIgUAAQAAgIgGgGQgHgFgKAAQgKAAgGAEQgGAFAAAHQAAAHAGAEQAFADAOAEQAOADAJAEQAJADAFAHQAEAGAAAJQAAAPgMAJQgMAKgUgBQgMAAgLgEg");
	this.shape_100.setTransform(24.025,61.75);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AggArQgPgPAAgZIAAgDQAAgQAHgOQAGgNAMgHQALgHANgBQAVAAANAPQAMAOAAAbIAAAHIhMAAQABARAJAKQAJALAOAAQAKAAAIgEQAGgEAGgHIAMAJQgOAWgdgBQgWABgOgQgAgRghQgIAIgCAPIA4AAIAAgBQgBgPgHgHQgHgJgMABQgLAAgIAIg");
	this.shape_101.setTransform(13.05,61.75);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AgWA2QgKgFgGgJQgGgIAAgKIATAAQABAKAHAFQAIAGAKAAQALAAAHgEQAHgFAAgHQAAgIgGgFQgGgEgOgDQgPgDgIgEQgJgEgEgGQgEgGAAgIQAAgPAMgJQAMgKARAAQATAAAMAKQAMAKAAAQIgUAAQAAgIgGgGQgHgFgKAAQgKAAgGAEQgGAFAAAHQAAAHAGAEQAFADAOAEQAOADAJAEQAJADAFAHQAEAGAAAJQAAAPgMAJQgMAKgUgBQgMAAgLgEg");
	this.shape_102.setTransform(1.775,61.75);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AgXBKQgMgFgGgJIAKgLQAMAPASAAQANAAAIgIQAIgIAAgOIAAgKQgLANgTAAQgUAAgMgQQgNgQAAgaQAAgbAMgPQANgQAUAAQAUAAALAPIABgNIASAAIAABuQAAAVgNANQgNANgWAAQgLAAgMgGgAgTgzQgIALAAAVQAAATAIAKQAHALANAAQATAAAIgRIAAgyQgJgQgRAAQgNAAgIALg");
	this.shape_103.setTransform(-15.225,63.875);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AAZA6IAAhKQAAgNgGgFQgFgGgMAAQgIAAgHAFQgHAFgEAIIAABQIgUAAIAAhxIATAAIAAAPQAOgRATAAQAkAAAAApIAABKg");
	this.shape_104.setTransform(-26.85,61.65);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AgjAxQgLgKAAgOQAAgRAOgJQANgKAXAAIATAAIAAgJQAAgKgFgGQgHgGgLAAQgKAAgHAFQgHAGAAAHIgTAAQAAgIAFgJQAHgIAKgEQAKgEAMgBQATAAALAKQALAKAAARIAAAzQAAAQAFAJIAAACIgUAAQgDgEgBgIQgNAOgRgBQgRAAgLgJgAgaAWQAAAJAFAGQAHAFAJAAQAIAAAJgFQAHgFAEgHIAAgXIgPAAQgjAAABAUg");
	this.shape_105.setTransform(-38.6,61.75);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AgiBPIgHgBIAAgQIAGAAQAKAAAFgEQAGgDADgLIAEgMIgohuIAVAAIAbBTIAahTIAVAAIguCBQgJAcgXAAg");
	this.shape_106.setTransform(-49.55,64.025);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AAZA6IAAhKQAAgNgFgFQgGgGgLAAQgJAAgHAFQgHAFgEAIIAABQIgUAAIAAhxIATAAIABAPQANgRATAAQAkAAAAApIAABKg");
	this.shape_107.setTransform(-65.8,61.65);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgjAxQgKgKAAgOQAAgRANgJQANgKAXAAIATAAIAAgJQAAgKgFgGQgHgGgLAAQgKAAgHAFQgHAGAAAHIgTAAQgBgIAHgJQAFgIALgEQAKgEAMgBQATAAALAKQALAKABARIAAAzQAAAQADAJIAAACIgTAAQgCgEgCgIQgNAOgRgBQgRAAgLgJgAgaAWQAAAJAFAGQAHAFAJAAQAJAAAHgFQAJgFADgHIAAgXIgPAAQgiAAAAAUg");
	this.shape_108.setTransform(-77.55,61.75);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AAbA5IgbhVIgaBVIgPAAIgihxIATAAIAXBUIAahUIAPAAIAaBWIAXhWIATAAIgiBxg");
	this.shape_109.setTransform(-91.35,61.75);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AggArQgPgPAAgZIAAgDQAAgQAHgOQAGgNAMgHQALgHANgBQAVAAANAPQAMAOAAAbIAAAHIhMAAQABARAJAKQAJALAOAAQAKAAAHgEQAHgEAGgHIAMAJQgOAWgdgBQgWABgOgQgAgRghQgIAIgCAPIA4AAIAAgBQgBgPgHgHQgHgJgMABQgLAAgIAIg");
	this.shape_110.setTransform(-104.85,61.75);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AAZBQIAAhKQAAgMgFgGQgGgFgLAAQgJAAgHAFQgHAFgEAHIAABQIgTAAIAAifIATAAIAAA9QANgQAUAAQAjAAABAoIAABKg");
	this.shape_111.setTransform(-116.45,59.375);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AAZBQIAAhKQAAgMgFgGQgGgFgLAAQgJAAgHAFQgHAFgEAHIAABQIgTAAIAAifIATAAIAAA9QANgQAUAAQAjAAABAoIAABKg");
	this.shape_112.setTransform(-133.55,59.375);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AgkAqQgPgPAAgaIAAgBQABgQAGgOQAGgNAMgHQAMgIAOAAQAXABAOAQQAPAPAAAaIAAACQAAAQgHANQgGANgMAHQgMAIgPgBQgWABgOgRgAgXgfQgIAMAAAVQAAASAIALQAKAMANAAQAPAAAIgMQAJgLAAgUQAAgSgJgMQgJgLgOAAQgNgBgKALg");
	this.shape_113.setTransform(-145.5,61.75);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AgDBAQgGgIAAgPIAAhFIgVAAIAAgPIAVAAIAAgbIASAAIAAAbIAVAAIAAAPIgVAAIAABFQAAAHADAEQADADAGAAIAKgBIAAAPQgIACgHAAQgNAAgGgHg");
	this.shape_114.setTransform(-155.375,60.475);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AAZA6IAAhKQAAgNgGgFQgFgGgLAAQgJAAgHAFQgHAFgEAIIAABQIgUAAIAAhxIATAAIAAAPQAOgRATAAQAkAAAAApIAABKg");
	this.shape_115.setTransform(-164.45,61.65);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AgkAqQgOgPAAgaIAAgBQAAgQAGgOQAGgNAMgHQAMgIAOAAQAXABAOAQQAOAPAAAaIAAACQAAAQgGANQgGANgMAHQgMAIgPgBQgWABgOgRgAgWgfQgJAMAAAVQAAASAJALQAJAMANAAQAOAAAJgMQAJgLAAgUQAAgSgJgMQgIgLgPAAQgNgBgJALg");
	this.shape_116.setTransform(-176.4,61.75);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AghArQgOgPAAgbIAAgCQAAgQAGgOQAGgNAMgGQALgIAPAAQATAAAMAMQANALABATIgTAAQgBgMgHgGQgHgIgLABQgOAAgIAKQgIAKAAAUIAAADQAAATAIALQAIALAOAAQAKAAAIgGQAHgHABgJIATAAQgBAJgGAJQgGAJgLAGQgKAEgLAAQgWAAgOgPg");
	this.shape_117.setTransform(-187.875,61.75);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AgXBKQgMgFgGgJIAKgLQAMAPASAAQANAAAIgIQAIgIAAgOIAAgKQgLANgTAAQgUAAgMgQQgNgQAAgaQAAgbAMgPQANgQAUAAQAUAAALAPIABgNIASAAIAABuQAAAVgNANQgNANgWAAQgLAAgMgGgAgTgzQgIALAAAVQAAATAIAKQAHALANAAQATAAAIgRIAAgyQgJgQgRAAQgNAAgIALg");
	this.shape_118.setTransform(-205.175,63.875);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AgjAxQgLgKAAgOQAAgRAOgJQANgKAXAAIATAAIAAgJQAAgKgFgGQgHgGgLAAQgKAAgHAFQgHAGAAAHIgTAAQAAgIAFgJQAHgIAKgEQAKgEAMgBQATAAALAKQALAKAAARIAAAzQAAAQAFAJIAAACIgUAAQgDgEgBgIQgNAOgRgBQgRAAgLgJgAgaAWQAAAJAFAGQAHAFAJAAQAIAAAJgFQAHgFAEgHIAAgXIgPAAQgjAAABAUg");
	this.shape_119.setTransform(-216.8,61.75);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AgaA6IAAhxIATAAIAAAOQAIgPASgBQAGABACABIAAASIgJgBQgSAAgHAQIAABQg");
	this.shape_120.setTransform(-225.675,61.65);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("Ag2BMIAAiXIArAAQATAAAPAJQAPAJAJAPQAIARAAAVIAAAIQAAAWgIARQgIAPgQAJQgPAJgUAAgAgiA8IAVAAQAXAAAMgPQANgOAAgbIAAgIQAAgZgMgPQgMgPgWAAIgXAAg");
	this.shape_121.setTransform(-236.6,59.8);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AgJBNIAAhwIASAAIAABwgAgIg5QgCgDAAgFQAAgFACgDQADgDAFAAQAFAAADADQADADAAAFQAAAFgDADQgDADgFAAQgFAAgDgDg");
	this.shape_122.setTransform(-66,8.4);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AgjAxQgLgKAAgOQAAgRAOgJQANgKAYAAIATAAIAAgJQAAgKgHgGQgGgGgLAAQgKAAgHAFQgHAGAAAHIgUAAQABgIAFgJQAHgIAKgEQAKgEALgBQAUAAALAKQALAKAAARIAAAzQAAAQAEAJIAAACIgUAAQgCgEAAgIQgOAOgSgBQgQAAgLgJgAgbAWQAAAJAHAGQAGAFAKAAQAHAAAJgFQAIgFAEgHIAAgXIgQAAQgjAAAAAUg");
	this.shape_123.setTransform(-74.45,10.45);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AgiAvQgJgKgBgVIAAhJIAUAAIAABIQAAAaAVAAQAVAAAHgRIAAhRIATAAIAABxIgSAAIAAgLQgLANgWgBQgRAAgKgKg");
	this.shape_124.setTransform(-86.15,10.55);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AgWA2QgKgFgGgJQgGgIAAgLIATAAQABALAHAFQAIAGAKAAQALAAAHgEQAHgFAAgHQAAgIgGgFQgGgEgOgDQgPgDgIgEQgJgEgEgGQgEgGAAgIQAAgPAMgJQAMgKARAAQATAAAMAKQAMAKAAAQIgUAAQAAgIgGgGQgHgFgKAAQgKAAgGAEQgGAFAAAHQAAAHAGAEQAFADAOAEQAOADAJAEQAJAEAFAGQAEAGAAAJQAAAPgMAJQgMAKgUgBQgMAAgLgEg");
	this.shape_125.setTransform(-97.525,10.45);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AggArQgPgPAAgZIAAgDQAAgQAHgOQAGgNAMgHQALgHANgBQAVAAANAPQAMAOAAAbIAAAHIhMAAQABARAJAKQAJALAOAAQAKAAAHgEQAHgEAGgHIAMAJQgOAWgdgBQgWABgOgQgAgRghQgIAIgCAPIA4AAIAAgBQgBgPgHgHQgHgJgMABQgLAAgIAIg");
	this.shape_126.setTransform(-108.45,10.45);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AgWA2QgKgFgGgJQgGgIAAgLIATAAQABALAHAFQAIAGAKAAQALAAAHgEQAHgFAAgHQAAgIgGgFQgGgEgOgDQgPgDgIgEQgJgEgEgGQgEgGAAgIQAAgPAMgJQAMgKARAAQATAAAMAKQAMAKAAAQIgUAAQAAgIgGgGQgHgFgKAAQgKAAgGAEQgGAFAAAHQAAAHAGAEQAFADAOAEQAOADAJAEQAJAEAFAGQAEAGAAAJQAAAPgMAJQgMAKgUgBQgMAAgLgEg");
	this.shape_127.setTransform(-119.725,10.45);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AgXBKQgMgFgGgJIAKgLQAMAPASAAQANAAAIgIQAIgIAAgOIAAgKQgLANgTAAQgUAAgMgQQgNgQAAgaQAAgbAMgPQANgQAUAAQAUAAALAPIABgNIASAAIAABuQAAAVgNANQgNANgWAAQgLAAgMgGgAgTgzQgIALAAAVQAAATAIAKQAHALANAAQATAAAIgRIAAgyQgJgQgRAAQgNAAgIALg");
	this.shape_128.setTransform(-136.775,12.575);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AAZA6IAAhKQAAgNgFgFQgGgGgLAAQgJAAgHAFQgHAFgEAIIAABQIgTAAIAAhxIASAAIABAPQANgRAUAAQAjAAABApIAABKg");
	this.shape_129.setTransform(-148.4,10.35);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AgjAxQgKgKAAgOQAAgRANgJQANgKAYAAIATAAIAAgJQgBgKgGgGQgGgGgLAAQgKAAgHAFQgHAGAAAHIgUAAQAAgIAHgJQAFgIALgEQAKgEALgBQAUAAALAKQALAKABARIAAAzQAAAQADAJIAAACIgUAAQgBgEgBgIQgOAOgSgBQgQAAgLgJgAgbAWQAAAJAHAGQAGAFAJAAQAJAAAHgFQAIgFAFgHIAAgXIgQAAQgiAAgBAUg");
	this.shape_130.setTransform(-160.15,10.45);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AgiBPIgHgBIAAgQIAGAAQAKAAAFgEQAGgDADgLIAEgMIgohuIAVAAIAbBTIAahTIAVAAIguCBQgJAcgXAAg");
	this.shape_131.setTransform(-171.05,12.725);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("AAZA6IAAhKQAAgNgFgFQgGgGgLAAQgJAAgHAFQgHAFgEAIIAABQIgUAAIAAhxIATAAIABAPQANgRATAAQAkAAAAApIAABKg");
	this.shape_132.setTransform(-187.3,10.35);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AgjAxQgKgKAAgOQAAgRANgJQANgKAXAAIATAAIAAgJQAAgKgFgGQgHgGgLAAQgKAAgHAFQgHAGAAAHIgTAAQgBgIAHgJQAFgIALgEQAKgEAMgBQATAAALAKQALAKABARIAAAzQAAAQADAJIAAACIgTAAQgCgEgCgIQgNAOgRgBQgRAAgLgJgAgaAWQAAAJAFAGQAHAFAJAAQAJAAAHgFQAJgFADgHIAAgXIgPAAQgiAAAAAUg");
	this.shape_133.setTransform(-199.05,10.45);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("AAbA5IgbhVIgaBVIgQAAIgghxIATAAIAWBUIAahUIAPAAIAbBWIAVhWIATAAIggBxg");
	this.shape_134.setTransform(-212.9,10.45);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("AggArQgPgPAAgZIAAgDQAAgQAHgOQAGgNAMgHQALgHANgBQAVAAANAPQAMAOAAAbIAAAHIhMAAQABARAJAKQAJALAOAAQAKAAAHgEQAHgEAGgHIAMAJQgOAWgdgBQgWABgOgQgAgRghQgIAIgCAPIA4AAIAAgBQgBgPgHgHQgHgJgMABQgLAAgIAIg");
	this.shape_135.setTransform(-226.35,10.45);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("AAZBQIAAhKQAAgMgFgGQgGgFgLAAQgJAAgHAFQgHAFgEAHIAABQIgTAAIAAifIATAAIAAA9QANgQAUAAQAjAAABAoIAABKg");
	this.shape_136.setTransform(-237.95,8.075);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("AgWA2QgKgFgGgIQgGgJAAgKIATAAQABAJAHAGQAIAGAKAAQALAAAHgFQAHgEAAgIQAAgHgGgEQgGgFgOgDQgPgDgIgEQgJgEgEgGQgEgGAAgJQAAgOAMgJQAMgJARAAQATAAAMAKQAMAKAAAPIgUAAQAAgIgGgGQgHgGgKAAQgKAAgGAFQgGAFAAAHQAAAHAGADQAFAEAOADQAOADAJAFQAJADAFAHQAEAGAAAJQAAAQgMAJQgMAIgUABQgMAAgLgFg");
	this.shape_137.setTransform(354.675,-40.8);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AgjAxQgLgJAAgPQAAgSAOgIQANgKAXAAIATAAIAAgJQABgKgHgGQgGgGgLAAQgKAAgHAFQgHAFAAAIIgTAAQAAgJAFgHQAHgJAKgEQAKgFAMABQATAAALAKQALAJAAARIAAAzQAAAPAFAKIAAABIgVAAQgCgDgBgJQgNAPgRAAQgRAAgLgKgAgbAXQABAIAFAFQAHAGAKAAQAIAAAIgFQAHgFAEgHIAAgYIgPAAQgjAAAAAWg");
	this.shape_138.setTransform(343.35,-40.8);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("AgJBQIAAifIASAAIAACfg");
	this.shape_139.setTransform(334.95,-43.175);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("AghArQgOgOAAgaIAAgDQAAgQAHgNQAGgNAMgIQALgIAMABQAXAAAMAOQAMAPAAAbIAAAHIhMAAQABAQAJALQAKAKANAAQAKAAAIgFQAGgDAGgIIALAKQgOAVgcABQgWAAgPgQgAgRghQgIAJgCAOIA3AAIAAgBQAAgOgHgJQgIgHgMgBQgKAAgIAJg");
	this.shape_140.setTransform(326.85,-40.8);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("AAYBQIgmg0IgMANIAAAnIgUAAIAAifIAUAAIAABgIAKgNIAigkIAYAAIgrAuIAwBCg");
	this.shape_141.setTransform(316.425,-43.175);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("AAYBQIgmg0IgMANIAAAnIgUAAIAAifIAUAAIAABgIAKgNIAigkIAYAAIgrAuIAwBCg");
	this.shape_142.setTransform(300.175,-43.175);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("AgIBNIAAhwIASAAIAABwgAgHg5QgDgDAAgFQAAgFADgDQADgDAEAAQAGAAADADQACADAAAFQAAAFgCADQgDADgGAAQgEAAgDgDg");
	this.shape_143.setTransform(291.45,-42.85);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("AgDBAQgGgIAAgPIAAhFIgVAAIAAgPIAVAAIAAgbIASAAIAAAbIAVAAIAAAPIgVAAIAABFQAAAHADAEQADADAGAAIAKgBIAAAPQgIACgHAAQgNAAgGgHg");
	this.shape_144.setTransform(285.075,-42.075);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("AgWA2QgKgFgGgIQgGgJAAgKIATAAQABAJAHAGQAIAGAKAAQALAAAHgFQAHgEAAgIQAAgHgGgEQgGgFgOgDQgPgDgIgEQgJgEgEgGQgEgGAAgJQAAgOAMgJQAMgJARAAQATAAAMAKQAMAKAAAPIgUAAQAAgIgGgGQgHgGgKAAQgKAAgGAFQgGAFAAAHQAAAHAGADQAFAEAOADQAOADAJAFQAJADAFAHQAEAGAAAJQAAAQgMAJQgMAIgUABQgMAAgLgFg");
	this.shape_145.setTransform(276.325,-40.8);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFFF").s().p("AgJBNIAAhwIASAAIAABwgAgIg5QgCgDAAgFQAAgFACgDQADgDAFAAQAGAAADADQACADAAAFQAAAFgCADQgDADgGAAQgFAAgDgDg");
	this.shape_146.setTransform(268.25,-42.85);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFFFF").s().p("AgaA5IAAhvIATAAIAAAMQAIgOASAAQAGAAACABIAAASIgJgBQgSAAgHARIAABOg");
	this.shape_147.setTransform(262.525,-40.9);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFFF").s().p("AggArQgPgOAAgaIAAgDQAAgQAHgNQAGgNAMgIQALgIANABQAVAAANAOQAMAPAAAbIAAAHIhMAAQABAQAJALQAJAKAOAAQAKAAAHgFQAHgDAGgIIAMAKQgOAVgdABQgWAAgOgQgAgRghQgIAJgCAOIA4AAIAAgBQgBgOgHgJQgHgHgMgBQgLAAgIAJg");
	this.shape_148.setTransform(252.9,-40.8);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("AgDBAQgGgIAAgPIAAhFIgVAAIAAgPIAVAAIAAgbIASAAIAAAbIAVAAIAAAPIgVAAIAABFQAAAHADAEQADADAGAAIAKgBIAAAPQgIACgHAAQgNAAgGgHg");
	this.shape_149.setTransform(243.375,-42.075);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("AAYBQIgmg0IgMANIAAAnIgUAAIAAifIAUAAIAABgIAKgNIAigkIAYAAIgrAuIAwBCg");
	this.shape_150.setTransform(235.525,-43.175);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("AgjAxQgLgJAAgPQAAgSAOgIQANgKAYAAIASAAIAAgJQABgKgHgGQgGgGgLAAQgKAAgHAFQgHAFAAAIIgUAAQABgJAFgHQAHgJAKgEQAKgFALABQAUAAALAKQALAJAAARIAAAzQAAAPAFAKIAAABIgVAAQgCgDgBgJQgNAPgSAAQgQAAgLgKgAgbAXQABAIAFAFQAHAGAKAAQAHAAAJgFQAHgFAEgHIAAgYIgPAAQgjAAAAAWg");
	this.shape_151.setTransform(223.55,-40.8);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFFF").s().p("AgaA5IAAhvIATAAIAAAMQAIgOASAAQAGAAACABIAAASIgJgBQgSAAgHARIAABOg");
	this.shape_152.setTransform(214.675,-40.9);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("AgjAxQgLgJAAgPQAAgSAOgIQANgKAYAAIASAAIAAgJQABgKgHgGQgGgGgLAAQgKAAgHAFQgHAFAAAIIgUAAQABgJAFgHQAHgJAKgEQAKgFALABQAUAAALAKQALAJAAARIAAAzQAAAPAFAKIAAABIgVAAQgCgDgBgJQgNAPgSAAQgQAAgLgKgAgbAXQABAIAFAFQAHAGAKAAQAHAAAJgFQAHgFAEgHIAAgYIgPAAQgjAAAAAWg");
	this.shape_153.setTransform(204.65,-40.8);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("AAYBQIgmg0IgMANIAAAnIgUAAIAAifIAUAAIAABgIAKgNIAigkIAYAAIgrAuIAwBCg");
	this.shape_154.setTransform(194.175,-43.175);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("AAYBQIgmg0IgMANIAAAnIgUAAIAAifIAUAAIAABgIAKgNIAigkIAYAAIgrAuIAwBCg");
	this.shape_155.setTransform(177.925,-43.175);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("AgjAxQgLgJAAgPQAAgSAOgIQANgKAYAAIATAAIAAgJQAAgKgHgGQgGgGgLAAQgKAAgHAFQgHAFAAAIIgUAAQABgJAFgHQAHgJAKgEQAKgFALABQAUAAALAKQALAJAAARIAAAzQAAAPAFAKIAAABIgVAAQgCgDAAgJQgOAPgSAAQgQAAgLgKgAgbAXQABAIAGAFQAGAGAKAAQAHAAAJgFQAHgFAFgHIAAgYIgQAAQgjAAAAAWg");
	this.shape_156.setTransform(165.95,-40.8);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("AgDBAQgGgIAAgPIAAhFIgVAAIAAgPIAVAAIAAgbIASAAIAAAbIAVAAIAAAPIgVAAIAABFQAAAHADAEQADADAGAAIAKgBIAAAPQgIACgHAAQgNAAgGgHg");
	this.shape_157.setTransform(156.375,-42.075);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FFFFFF").s().p("AgkArQgPgQAAgbIAAAAQABgRAGgNQAHgNALgIQAMgGAOAAQAXAAAOAPQAPARAAAZIAAABQAAARgHANQgGANgMAIQgMAGgPABQgWAAgOgQgAgXgeQgIALAAAUQAAATAIAMQAJALAOAAQAPAAAJgLQAIgMAAgUQAAgTgJgLQgJgMgOAAQgNAAgKAMg");
	this.shape_158.setTransform(147.1,-40.8);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FFFFFF").s().p("AAYBQIgmg0IgMANIAAAnIgUAAIAAifIAUAAIAABgIAKgNIAigkIAYAAIgrAuIAwBCg");
	this.shape_159.setTransform(136.325,-43.175);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FFFFFF").s().p("AgiAvQgJgLgBgUIAAhIIAUAAIAABHQAAAaAVAAQAVAAAIgRIAAhQIASAAIAABvIgSAAIAAgLQgLAOgWAAQgRAAgKgLg");
	this.shape_160.setTransform(118.85,-40.7);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FFFFFF").s().p("AgVBiIAAgPIAJAAQAHAAADgDQACgEABgIIAAh+IATAAIAAB9QAAAhgdAAQgGAAgGgCgAAChQQgCgDAAgFQAAgEACgDQADgEAFAAQAGAAADADQADAEAAAEQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_161.setTransform(109.35,-40.575);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FFFFFF").s().p("AgiAvQgJgLgBgUIAAhIIAUAAIAABHQAAAaAVAAQAVAAAHgRIAAhQIATAAIAABvIgSAAIAAgLQgLAOgWAAQgRAAgKgLg");
	this.shape_162.setTransform(101.95,-40.7);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FFFFFF").s().p("AAZA5IAAhJQAAgMgGgHQgFgFgLAAQgJAAgHAFQgHAFgEAIIAABPIgUAAIAAhvIATAAIAAAOQAOgQATAAQAkAAAAAoIAABJg");
	this.shape_163.setTransform(90.25,-40.9);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#FFFFFF").s().p("AghArQgOgOAAgaIAAgDQAAgQAHgNQAGgNAMgIQALgIAMABQAXAAAMAOQAMAPAAAbIAAAHIhMAAQABAQAJALQAKAKANAAQAKAAAIgFQAGgDAGgIIALAKQgOAVgcABQgWAAgPgQgAgRghQgIAJgCAOIA3AAIAAgBQAAgOgHgJQgIgHgMgBQgKAAgIAJg");
	this.shape_164.setTransform(78.9,-40.8);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FFFFFF").s().p("AA8A5IAAhJQAAgMgGgGQgFgGgNAAQgLAAgHAGQgHAHgBAKIAABKIgTAAIAAhJQAAgYgYAAQgTAAgHAQIAABRIgTAAIAAhvIASAAIABAMQAMgOAVAAQAYgBAHATQAGgIAJgGQAJgEAMAAQAlAAABAnIAABKg");
	this.shape_165.setTransform(63.825,-40.9);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FFFFFF").s().p("AAZA5IAAhJQAAgMgGgHQgFgFgMAAQgIAAgHAFQgHAFgEAIIAABPIgTAAIAAhvIASAAIAAAOQANgQAVAAQAjAAABAoIAABJg");
	this.shape_166.setTransform(43.15,-40.9);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FFFFFF").s().p("AgjAxQgLgJAAgPQAAgSAOgIQANgKAYAAIATAAIAAgJQAAgKgHgGQgGgGgLAAQgKAAgHAFQgHAFAAAIIgUAAQABgJAFgHQAHgJAKgEQAKgFALABQAUAAALAKQALAJAAARIAAAzQAAAPAFAKIAAABIgVAAQgCgDAAgJQgOAPgSAAQgQAAgLgKgAgbAXQABAIAGAFQAGAGAKAAQAHAAAJgFQAHgFAFgHIAAgYIgQAAQgjAAAAAWg");
	this.shape_167.setTransform(31.4,-40.8);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#FFFFFF").s().p("AAbA4IgbhUIgaBUIgPAAIgihvIATAAIAXBTIAahTIAPAAIAaBVIAXhVIATAAIgiBvg");
	this.shape_168.setTransform(17.55,-40.8);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FFFFFF").s().p("AghArQgOgOAAgaIAAgDQAAgQAGgNQAHgNALgIQAMgIAMABQAXAAAMAOQAMAPAAAbIAAAHIhLAAQAAAQAJALQAKAKANAAQAKAAAIgFQAGgDAGgIIALAKQgOAVgcABQgWAAgPgQgAgRghQgIAJgCAOIA3AAIAAgBQAAgOgHgJQgIgHgMgBQgKAAgIAJg");
	this.shape_169.setTransform(4.1,-40.8);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FFFFFF").s().p("AAZBQIAAhKQAAgMgFgGQgGgFgLAAQgJAAgHAFQgHAFgEAHIAABQIgTAAIAAifIATAAIAAA9QANgQAUAAQAjAAABAoIAABKg");
	this.shape_170.setTransform(-7.55,-43.175);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FFFFFF").s().p("AAYBQIgmg0IgMANIAAAnIgUAAIAAifIAUAAIAABgIAKgNIAigkIAYAAIgrAuIAwBCg");
	this.shape_171.setTransform(-23.525,-43.175);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FFFFFF").s().p("AgIBNIAAhwIASAAIAABwgAgHg5QgEgDAAgFQAAgFAEgDQADgDAEAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgEAAgDgDg");
	this.shape_172.setTransform(-32.3,-42.85);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#FFFFFF").s().p("AgDBAQgGgIAAgPIAAhFIgVAAIAAgPIAVAAIAAgbIASAAIAAAbIAVAAIAAAPIgVAAIAABFQAAAHADAEQADADAGAAIAKgBIAAAPQgIACgHAAQgNAAgGgHg");
	this.shape_173.setTransform(-38.675,-42.075);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#FFFFFF").s().p("AgWA2QgKgFgGgIQgGgJAAgKIATAAQABAJAHAGQAIAGAKAAQALAAAHgFQAHgEAAgIQAAgHgGgEQgGgFgOgDQgPgDgIgEQgJgEgEgGQgEgGAAgJQAAgOAMgJQAMgJARAAQATAAAMAKQAMAKAAAPIgUAAQAAgIgGgGQgHgGgKAAQgKAAgGAFQgGAFAAAHQAAAHAGADQAFAEAOADQAOADAJAFQAJADAFAHQAEAGAAAJQAAAQgMAJQgMAIgUABQgMAAgLgFg");
	this.shape_174.setTransform(-47.375,-40.8);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#FFFFFF").s().p("AgIBNIAAhwIASAAIAABwgAgHg5QgDgDAAgFQAAgFADgDQADgDAEAAQAGAAADADQACADAAAFQAAAFgCADQgDADgGAAQgEAAgDgDg");
	this.shape_175.setTransform(-55.5,-42.85);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#FFFFFF").s().p("AgaA5IAAhvIATAAIAAAMQAIgOASAAQAGAAACABIAAASIgJgBQgSAAgHARIAABOg");
	this.shape_176.setTransform(-61.175,-40.9);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#FFFFFF").s().p("AggArQgPgOAAgaIAAgDQAAgQAHgNQAGgNAMgIQALgIAMABQAXAAAMAOQAMAPAAAbIAAAHIhMAAQABAQAJALQAKAKANAAQAKAAAIgFQAGgDAGgIIALAKQgOAVgcABQgWAAgOgQgAgRghQgIAJgCAOIA3AAIAAgBQAAgOgHgJQgHgHgNgBQgKAAgIAJg");
	this.shape_177.setTransform(-70.85,-40.8);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#FFFFFF").s().p("AgDBAQgGgIAAgPIAAhFIgVAAIAAgPIAVAAIAAgbIASAAIAAAbIAVAAIAAAPIgVAAIAABFQAAAHADAEQADADAGAAIAKgBIAAAPQgIACgHAAQgNAAgGgHg");
	this.shape_178.setTransform(-80.375,-42.075);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#FFFFFF").s().p("AAYBQIgmg0IgMANIAAAnIgUAAIAAifIAUAAIAABgIAKgNIAigkIAYAAIgrAuIAwBCg");
	this.shape_179.setTransform(-88.225,-43.175);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#FFFFFF").s().p("AgjAxQgLgJAAgPQAAgSAOgIQANgKAYAAIATAAIAAgJQAAgKgHgGQgGgGgLAAQgKAAgHAFQgHAFAAAIIgUAAQAAgJAHgHQAFgJALgEQAKgFALABQAUAAALAKQALAJABARIAAAzQAAAPADAKIAAABIgUAAQgBgDgBgJQgOAPgSAAQgQAAgLgKgAgbAXQAAAIAHAFQAGAGAKAAQAHAAAIgFQAIgFAFgHIAAgYIgQAAQgjAAAAAWg");
	this.shape_180.setTransform(-100.2,-40.8);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#FFFFFF").s().p("AgaA5IAAhvIATAAIAAAMQAIgOASAAQAGAAACABIAAASIgJgBQgSAAgHARIAABOg");
	this.shape_181.setTransform(-109.075,-40.9);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#FFFFFF").s().p("AgjAxQgLgJAAgPQAAgSAOgIQANgKAYAAIATAAIAAgJQAAgKgHgGQgGgGgLAAQgKAAgHAFQgHAFAAAIIgUAAQAAgJAHgHQAFgJALgEQAKgFALABQAUAAALAKQALAJABARIAAAzQAAAPADAKIAAABIgUAAQgBgDgBgJQgOAPgSAAQgQAAgLgKgAgbAXQAAAIAHAFQAGAGAKAAQAHAAAIgFQAIgFAFgHIAAgYIgQAAQgjAAAAAWg");
	this.shape_182.setTransform(-119.1,-40.8);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#FFFFFF").s().p("AAYBQIgmg0IgMANIAAAnIgUAAIAAifIAUAAIAABgIAKgNIAigkIAYAAIgrAuIAwBCg");
	this.shape_183.setTransform(-129.575,-43.175);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#FFFFFF").s().p("AAYBQIgmg0IgMANIAAAnIgUAAIAAifIAUAAIAABgIAKgNIAigkIAYAAIgrAuIAwBCg");
	this.shape_184.setTransform(-145.825,-43.175);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#FFFFFF").s().p("AgjAxQgLgJAAgPQAAgSAOgIQANgKAYAAIATAAIAAgJQAAgKgHgGQgGgGgLAAQgKAAgHAFQgHAFAAAIIgUAAQAAgJAHgHQAFgJALgEQAKgFALABQAUAAALAKQALAJABARIAAAzQAAAPADAKIAAABIgUAAQgBgDgBgJQgOAPgSAAQgQAAgLgKgAgbAXQAAAIAHAFQAGAGAKAAQAHAAAIgFQAIgFAFgHIAAgYIgQAAQgjAAAAAWg");
	this.shape_185.setTransform(-157.8,-40.8);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#FFFFFF").s().p("AgDBAQgGgIAAgPIAAhFIgVAAIAAgPIAVAAIAAgbIASAAIAAAbIAVAAIAAAPIgVAAIAABFQAAAHADAEQADADAGAAIAKgBIAAAPQgIACgHAAQgNAAgGgHg");
	this.shape_186.setTransform(-167.375,-42.075);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#FFFFFF").s().p("AgkArQgOgQAAgbIAAAAQgBgRAHgNQAGgNAMgIQAMgGAOAAQAXAAAOAPQAOARAAAZIAAABQAAARgGANQgHANgLAIQgMAGgPABQgWAAgOgQgAgWgeQgJALAAAUQAAATAJAMQAIALAOAAQAOAAAKgLQAIgMAAgUQAAgTgJgLQgIgMgPAAQgOAAgIAMg");
	this.shape_187.setTransform(-176.6,-40.8);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#FFFFFF").s().p("AAYBQIgmg0IgMANIAAAnIgUAAIAAifIAUAAIAABgIAKgNIAigkIAYAAIgrAuIAwBCg");
	this.shape_188.setTransform(-187.375,-43.175);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#FFFFFF").s().p("AgXBKQgMgFgGgJIAKgLQAMAPASAAQANAAAIgIQAIgIAAgOIAAgKQgLANgTAAQgUAAgMgQQgNgQAAgaQAAgbAMgPQANgQAUAAQAUAAALAPIABgNIASAAIAABuQAAAVgNANQgNANgWAAQgLAAgMgGgAgTgzQgIALAAAVQAAATAIAKQAHALANAAQATAAAIgRIAAgyQgJgQgRAAQgNAAgIALg");
	this.shape_189.setTransform(-205.175,-38.675);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#FFFFFF").s().p("AgjAxQgLgJAAgPQAAgSAOgIQANgKAXAAIATAAIAAgJQAAgKgFgGQgHgGgLAAQgKAAgHAFQgHAFAAAIIgTAAQAAgJAFgHQAHgJAKgEQAKgFAMABQATAAALAKQALAJAAARIAAAzQAAAPAFAKIAAABIgUAAQgDgDgBgJQgNAPgRAAQgRAAgLgKgAgaAXQAAAIAFAFQAHAGAJAAQAIAAAJgFQAHgFAEgHIAAgYIgPAAQgjAAABAWg");
	this.shape_190.setTransform(-216.8,-40.8);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#FFFFFF").s().p("AgaA5IAAhvIATAAIAAAMQAIgOASAAQAGAAACABIAAASIgJgBQgSAAgHARIAABOg");
	this.shape_191.setTransform(-225.675,-40.9);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#FFFFFF").s().p("Ag2BMIAAiXIArAAQATAAAPAJQAPAIAJARQAIAQAAAVIAAAIQAAAWgIAQQgIAQgQAJQgPAJgUAAgAgiA7IAVAAQAXAAAMgOQANgOAAgbIAAgIQAAgZgMgPQgMgOgWAAIgXAAg");
	this.shape_192.setTransform(-236.6,-42.75);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#FFFFFF").s().p("AgIBQIAAifIASAAIAACfg");
	this.shape_193.setTransform(-165.05,-94.475);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#FFFFFF").s().p("AgJBNIAAhwIASAAIAABwgAgIg5QgDgDAAgFQAAgFADgDQAEgDAEAAQAFAAADADQADADABAFQgBAFgDADQgDADgFAAQgEAAgEgDg");
	this.shape_194.setTransform(-170.3,-94.15);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#FFFFFF").s().p("AgjAxQgLgJAAgPQAAgSAOgIQANgKAYAAIASAAIAAgJQABgKgHgGQgGgGgLAAQgKAAgHAFQgHAFAAAIIgUAAQABgJAFgHQAHgJAKgEQAKgFALABQAUAAALAKQALAJAAARIAAAzQAAAPAFAKIAAABIgVAAQgCgDgBgJQgNAPgSAAQgQAAgLgKgAgbAXQABAIAFAFQAHAGAKAAQAHAAAJgFQAHgFAEgHIAAgYIgPAAQgjAAAAAWg");
	this.shape_195.setTransform(-178.75,-92.1);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#FFFFFF").s().p("AgDBAQgGgIAAgPIAAhFIgVAAIAAgPIAVAAIAAgbIASAAIAAAbIAVAAIAAAPIgVAAIAABFQAAAHADAEQADADAGAAIAKgBIAAAPQgIACgHAAQgNAAgGgHg");
	this.shape_196.setTransform(-188.325,-93.375);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#FFFFFF").s().p("AghArQgOgOAAgaIAAgDQAAgQAHgNQAGgNAMgIQALgIAMABQAXAAAMAOQAMAPAAAbIAAAHIhMAAQABAQAJALQAKAKANAAQAKAAAIgFQAGgDAGgIIALAKQgOAVgcABQgWAAgPgQgAgRghQgIAJgCAOIA3AAIAAgBQAAgOgHgJQgIgHgMgBQgKAAgIAJg");
	this.shape_197.setTransform(-196.95,-92.1);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#FFFFFF").s().p("AgiBBQgNgQAAgaIAAgBQAAgZANgQQAMgQAUAAQATAAAMAOIAAg7IASAAIAACfIgRAAIgBgMQgLAOgUAAQgUAAgMgQgAgUgHQgHAKAAAVQAAATAHALQAJALANAAQASAAAJgRIAAgyQgJgQgSAAQgOAAgIALg");
	this.shape_198.setTransform(-209.05,-94.375);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#FFFFFF").s().p("AgvBPIAAibIASAAIABAMQAMgOAUAAQAUAAAMAPQAMAPAAAcIAAACQAAAYgMAQQgMAQgUAAQgUAAgLgNIAAA2gAgbguIAAA1QAIAPASAAQANAAAIgLQAIgLAAgVQAAgTgIgLQgIgLgNAAQgSAAgIAQg");
	this.shape_199.setTransform(-225.875,-90.025);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#FFFFFF").s().p("AgiAvQgJgLgBgUIAAhIIAUAAIAABHQAAAaAVAAQAVAAAIgRIAAhQIASAAIAABvIgSAAIAAgLQgLAOgWAAQgRAAgKgLg");
	this.shape_200.setTransform(-238,-92);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#FFFFFF").s().p("AgvBPIAAibIASAAIABAMQAMgOAUAAQAUAAAMAPQAMAPAAAcIAAACQAAAYgMAQQgMAQgUAAQgUAAgLgNIAAA2gAgbguIAAA1QAIAPASAAQANAAAIgLQAIgLAAgVQAAgTgIgLQgIgLgNAAQgSAAgIAQg");
	this.shape_201.setTransform(354.375,-137.025);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#FFFFFF").s().p("AgkArQgPgRAAgaIAAAAQAAgRAHgNQAGgNAMgIQAMgGAOgBQAXAAAOAQQAPAQAAAaIAAABQgBARgGANQgHANgLAIQgMAGgPAAQgWAAgOgPgAgXgfQgIAMAAAUQAAATAIALQAJAMAOAAQAPAAAJgMQAIgLAAgUQAAgSgJgMQgJgMgOAAQgNABgKAKg");
	this.shape_202.setTransform(342.05,-139.1);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#FFFFFF").s().p("AgvBPIAAibIASAAIABAMQAMgOAUAAQAUAAAMAPQAMAPAAAcIAAACQAAAYgMAQQgMAQgUAAQgUAAgLgNIAAA2gAgbguIAAA1QAIAPASAAQANAAAIgLQAIgLAAgVQAAgTgIgLQgIgLgNAAQgSAAgIAQg");
	this.shape_203.setTransform(330.225,-137.025);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#FFFFFF").s().p("AAZA5IAAhJQAAgMgFgGQgGgGgLAAQgJAAgHAFQgHAFgEAIIAABPIgTAAIAAhvIASAAIABAOQANgQATgBQAkAAAAApIAABJg");
	this.shape_204.setTransform(310.95,-139.2);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#FFFFFF").s().p("AgjAxQgKgKAAgOQAAgRANgJQANgKAXAAIAUAAIAAgJQgBgKgFgGQgHgGgLAAQgKAAgHAGQgHAEAAAIIgUAAQAAgIAHgJQAFgHALgFQAKgFALAAQAUAAALALQALAJABARIAAAzQAAAPADAKIAAABIgTAAQgCgDgBgIQgOANgRAAQgRABgLgKgAgaAWQgBAKAHAEQAGAGAJAAQAJAAAHgFQAIgFAFgHIAAgYIgQAAQgiABAAAUg");
	this.shape_205.setTransform(299.2,-139.1);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#FFFFFF").s().p("AAYBQIgmg0IgMANIAAAnIgUAAIAAifIAUAAIAABgIAKgNIAigkIAYAAIgrAuIAwBCg");
	this.shape_206.setTransform(288.775,-141.475);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#FFFFFF").s().p("AgIBQIAAifIASAAIAACfg");
	this.shape_207.setTransform(280,-141.475);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#FFFFFF").s().p("AgiAvQgJgKgBgVIAAhIIAUAAIAABIQAAAZAVAAQAVAAAHgQIAAhRIATAAIAABvIgSAAIAAgLQgLANgWAAQgRABgKgLg");
	this.shape_208.setTransform(271.5,-139);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#FFFFFF").s().p("AghArQgOgPAAgbIAAgCQAAgRAGgNQAGgNAMgHQALgGAPgBQATAAAMAMQANALABASIgTAAQgBgKgHgIQgHgHgLAAQgOAAgIALQgIAKAAAVIAAACQAAATAIAMQAIAKAOAAQAKAAAIgHQAHgGABgJIATAAQgBAJgGAJQgGAJgLAGQgKAEgLAAQgWAAgOgPg");
	this.shape_209.setTransform(260.225,-139.1);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#FFFFFF").s().p("AAZA5IAAhJQAAgMgGgGQgFgGgLAAQgJAAgHAFQgHAFgEAIIAABPIgUAAIAAhvIATAAIAAAOQAOgQATgBQAkAAAAApIAABJg");
	this.shape_210.setTransform(248.65,-139.2);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#FFFFFF").s().p("AgiAvQgJgKgBgVIAAhIIAUAAIAABIQAAAZAVAAQAVAAAHgQIAAhRIATAAIAABvIgSAAIAAgLQgLANgWAAQgRABgKgLg");
	this.shape_211.setTransform(236.85,-139);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#FFFFFF").s().p("AA8A5IAAhJQAAgMgGgGQgFgGgNAAQgLAAgHAGQgHAGgBAMIAABJIgTAAIAAhJQAAgYgYAAQgTAAgHAQIAABRIgTAAIAAhvIASAAIABAMQAMgPAVAAQAYAAAHASQAGgIAJgFQAJgEAMgBQAlAAABAoIAABKg");
	this.shape_212.setTransform(221.675,-139.2);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#FFFFFF").s().p("AghAsQgOgPAAgaIAAgDQAAgQAGgNQAHgOALgHQAMgIAMAAQAXAAAMAPQAMAPAAAbIAAAHIhLAAQAAARAKAKQAIAKAOAAQAKAAAHgFQAIgDAFgIIALAKQgNAVgdAAQgWAAgPgOgAgRghQgIAIgCAQIA3AAIAAgCQAAgOgHgJQgIgHgMgBQgKAAgIAJg");
	this.shape_213.setTransform(206.85,-139.1);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#FFFFFF").s().p("AA8A5IAAhJQAAgMgGgGQgFgGgNAAQgLAAgHAGQgHAGgBAMIAABJIgTAAIAAhJQAAgYgYAAQgTAAgHAQIAABRIgTAAIAAhvIASAAIABAMQAMgPAVAAQAYAAAHASQAGgIAJgFQAJgEAMgBQAlAAABAoIAABKg");
	this.shape_214.setTransform(191.725,-139.2);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#FFFFFF").s().p("AAYBQIgmg0IgMANIAAAnIgUAAIAAifIAUAAIAABgIAKgNIAigkIAYAAIgrAuIAwBCg");
	this.shape_215.setTransform(170.525,-141.475);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#FFFFFF").s().p("AghAvQgKgKAAgVIAAhIIATAAIAABIQAAAZAVAAQAVAAAHgQIAAhRIAUAAIAABvIgTAAIAAgLQgMANgUAAQgTABgIgLg");
	this.shape_216.setTransform(158.5,-139);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#FFFFFF").s().p("AgDBAQgGgIAAgPIAAhFIgVAAIAAgPIAVAAIAAgbIASAAIAAAbIAVAAIAAAPIgVAAIAABFQAAAHADAEQADADAGAAIAKgBIAAAPQgIACgHAAQgNAAgGgHg");
	this.shape_217.setTransform(148.875,-140.375);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#FFFFFF").s().p("AAZA5IAAhJQAAgMgFgGQgGgGgLAAQgJAAgHAFQgHAFgEAIIAABPIgUAAIAAhvIATAAIABAOQANgQATgBQAkAAAAApIAABJg");
	this.shape_218.setTransform(139.85,-139.2);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#FFFFFF").s().p("AgiAvQgJgKgBgVIAAhIIAUAAIAABIQAAAZAVAAQAVAAAHgQIAAhRIATAAIAABvIgSAAIAAgLQgLANgWAAQgRABgKgLg");
	this.shape_219.setTransform(128.05,-139);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#FFFFFF").s().p("AgjAxQgKgKAAgOQAAgRANgJQANgKAXAAIATAAIAAgJQAAgKgFgGQgHgGgLAAQgKAAgHAGQgHAEAAAIIgTAAQgBgIAHgJQAFgHALgFQAKgFAMAAQATAAALALQALAJABARIAAAzQAAAPADAKIAAABIgTAAQgCgDgCgIQgNANgRAAQgRABgLgKgAgaAWQAAAKAFAEQAHAGAJAAQAJAAAHgFQAJgFADgHIAAgYIgPAAQgiABAAAUg");
	this.shape_220.setTransform(109.2,-139.1);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#FFFFFF").s().p("AghBPIgIgBIAAgQIAGAAQAJAAAGgEQAFgDAEgLIAEgMIgohuIAVAAIAbBTIAbhTIAUAAIguCBQgJAcgXAAg");
	this.shape_221.setTransform(98.3,-136.825);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#FFFFFF").s().p("AAZA5IAAhJQAAgMgFgGQgGgGgLAAQgJAAgHAFQgHAFgEAIIAABPIgTAAIAAhvIASAAIABAOQANgQAUgBQAjAAABApIAABJg");
	this.shape_222.setTransform(87.4,-139.2);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#FFFFFF").s().p("AAZBQIAAhKQAAgMgFgGQgGgFgLAAQgJAAgHAFQgHAFgEAHIAABQIgTAAIAAifIATAAIAAA9QANgQATAAQAkAAAAAoIAABKg");
	this.shape_223.setTransform(75.6,-141.475);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#FFFFFF").s().p("AgjAxQgKgKAAgOQAAgRANgJQANgKAXAAIAUAAIAAgJQgBgKgFgGQgHgGgLAAQgKAAgHAGQgHAEAAAIIgUAAQAAgIAHgJQAFgHALgFQAKgFAMAAQATAAALALQALAJABARIAAAzQAAAPADAKIAAABIgTAAQgCgDgBgIQgOANgSAAQgQABgLgKgAgaAWQgBAKAHAEQAGAGAJAAQAJAAAHgFQAIgFAFgHIAAgYIgQAAQgiABAAAUg");
	this.shape_224.setTransform(63.85,-139.1);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#FFFFFF").s().p("AAbA4IgbhUIgaBUIgPAAIgihvIATAAIAXBTIAahTIAPAAIAaBVIAXhVIASAAIghBvg");
	this.shape_225.setTransform(50.05,-139.1);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#FFFFFF").s().p("AgjAxQgLgKABgOQAAgRANgJQANgKAXAAIATAAIAAgJQAAgKgFgGQgHgGgLAAQgKAAgHAGQgHAEAAAIIgTAAQAAgIAFgJQAHgHAKgFQAKgFAMAAQATAAALALQALAJAAARIAAAzQABAPAEAKIAAABIgUAAQgCgDgCgIQgNANgRAAQgRABgLgKgAgaAWQAAAKAFAEQAHAGAJAAQAIAAAIgFQAJgFADgHIAAgYIgPAAQgjABABAUg");
	this.shape_226.setTransform(36.2,-139.1);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#FFFFFF").s().p("AgcBCIgBANIgSAAIAAifIAUAAIAAA8QALgPAUAAQAUAAAMAQQAMAPAAAaIAAACQAAAagMAQQgMAPgUAAQgUAAgMgPgAgbgBIAAAwQAJASASAAQANAAAIgLQAIgLAAgVQAAgUgIgKQgIgKgNAAQgTAAgIARg");
	this.shape_227.setTransform(24.625,-141.375);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#FFFFFF").s().p("AgJBNIAAhwIASAAIAABwgAgIg5QgCgDAAgFQAAgEACgEQADgDAFAAQAGAAACADQADAEAAAEQAAAFgDADQgCADgGAAQgFAAgDgDg");
	this.shape_228.setTransform(15.8,-141.15);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#FFFFFF").s().p("AgiBBQgNgQAAgaIAAgBQAAgZANgQQAMgQAUAAQATAAAMAOIAAg7IATAAIAACfIgSAAIgBgMQgMAOgTAAQgUAAgMgQgAgUgHQgHAKgBAVQABATAHALQAJALANAAQASAAAJgRIAAgyQgJgQgSAAQgNAAgJALg");
	this.shape_229.setTransform(6.85,-141.375);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#FFFFFF").s().p("AAZA5IAAhJQAAgMgGgGQgFgGgLAAQgJAAgHAFQgHAFgEAIIAABPIgUAAIAAhvIATAAIAAAOQAOgQATgBQAkAAAAApIAABJg");
	this.shape_230.setTransform(-11.9,-139.2);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#FFFFFF").s().p("AgjAxQgLgKABgOQAAgRANgJQANgKAXAAIATAAIAAgJQAAgKgFgGQgHgGgLAAQgKAAgHAGQgHAEAAAIIgTAAQAAgIAFgJQAHgHAKgFQAKgFAMAAQATAAALALQALAJAAARIAAAzQABAPAEAKIAAABIgUAAQgCgDgCgIQgNANgRAAQgRABgLgKgAgaAWQAAAKAFAEQAHAGAJAAQAIAAAIgFQAJgFADgHIAAgYIgPAAQgjABABAUg");
	this.shape_231.setTransform(-23.65,-139.1);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#FFFFFF").s().p("AAbA4IgbhUIgaBUIgQAAIghhvIAUAAIAWBTIAahTIAPAAIAbBVIAVhVIATAAIggBvg");
	this.shape_232.setTransform(-37.5,-139.1);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#FFFFFF").s().p("AggAsQgPgPAAgaIAAgDQAAgQAHgNQAGgOAMgHQALgIANAAQAVAAANAPQAMAPAAAbIAAAHIhMAAQABARAJAKQAJAKAOAAQAKAAAIgFQAGgDAGgIIAMAKQgPAVgcAAQgWAAgOgOgAgRghQgIAIgCAQIA4AAIAAgCQgBgOgHgJQgIgHgLgBQgLAAgIAJg");
	this.shape_233.setTransform(-50.95,-139.1);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#FFFFFF").s().p("AAZBQIAAhKQAAgMgFgGQgGgFgLAAQgJAAgHAFQgHAFgEAHIAABQIgTAAIAAifIATAAIAAA9QANgQATAAQAkAAAAAoIAABKg");
	this.shape_234.setTransform(-62.55,-141.475);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#FFFFFF").s().p("AggAsQgPgPAAgaIAAgDQAAgQAHgNQAGgOAMgHQALgIANAAQAVAAANAPQAMAPAAAbIAAAHIhMAAQABARAJAKQAJAKAOAAQAKAAAIgFQAGgDAGgIIAMAKQgPAVgcAAQgWAAgOgOgAgRghQgIAIgCAQIA4AAIAAgCQgBgOgHgJQgIgHgLgBQgLAAgIAJg");
	this.shape_235.setTransform(-81.1,-139.1);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#FFFFFF").s().p("AgXBKQgMgFgGgJIAKgLQAMAPASAAQANAAAIgIQAIgIAAgOIAAgKQgLANgTAAQgUAAgMgQQgNgQAAgaQAAgbAMgPQANgQAUAAQAUAAALAPIABgNIASAAIAABuQAAAVgNANQgNANgWAAQgLAAgMgGgAgTgzQgIALAAAVQAAATAIAKQAHALANAAQATAAAIgRIAAgyQgJgQgRAAQgNAAgIALg");
	this.shape_236.setTransform(-93.025,-136.975);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#FFFFFF").s().p("AAZA5IAAhJQAAgMgGgGQgFgGgMAAQgIAAgHAFQgHAFgEAIIAABPIgUAAIAAhvIATAAIAAAOQAOgQATgBQAkAAAAApIAABJg");
	this.shape_237.setTransform(-104.7,-139.2);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#FFFFFF").s().p("AgjAxQgLgKAAgOQAAgRAOgJQANgKAXAAIATAAIAAgJQAAgKgFgGQgHgGgLAAQgKAAgHAGQgHAEAAAIIgTAAQAAgIAFgJQAHgHAKgFQAKgFAMAAQATAAALALQALAJAAARIAAAzQAAAPAFAKIAAABIgUAAQgDgDgBgIQgNANgRAAQgRABgLgKgAgaAWQAAAKAFAEQAHAGAJAAQAIAAAJgFQAHgFAEgHIAAgYIgPAAQgjABABAUg");
	this.shape_238.setTransform(-116.45,-139.1);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#FFFFFF").s().p("AgaA5IAAhvIATAAIAAAMQAIgPASAAQAGAAACACIAAASIgJgBQgSAAgHAQIAABPg");
	this.shape_239.setTransform(-125.325,-139.2);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#FFFFFF").s().p("AgkArQgPgRAAgaIAAAAQABgRAGgNQAGgNAMgIQAMgGAOgBQAXAAAOAQQAPAQAAAaIAAABQAAARgHANQgGANgMAIQgMAGgPAAQgWAAgOgPgAgXgfQgIAMAAAUQAAATAIALQAKAMANAAQAPAAAIgMQAJgLAAgUQAAgSgJgMQgJgMgOAAQgNABgKAKg");
	this.shape_240.setTransform(-135.6,-139.1);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#FFFFFF").s().p("AAYBQIgmg0IgMANIAAAnIgUAAIAAifIAUAAIAABgIAKgNIAigkIAYAAIgrAuIAwBCg");
	this.shape_241.setTransform(-153.525,-141.475);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#FFFFFF").s().p("AgjAxQgLgKAAgOQAAgRAOgJQANgKAXAAIATAAIAAgJQAAgKgFgGQgHgGgLAAQgKAAgHAGQgHAEAAAIIgTAAQAAgIAFgJQAHgHAKgFQAKgFAMAAQATAAALALQALAJAAARIAAAzQAAAPAFAKIAAABIgUAAQgDgDgBgIQgNANgRAAQgRABgLgKgAgaAWQAAAKAFAEQAHAGAJAAQAIAAAJgFQAHgFAEgHIAAgYIgPAAQgjABABAUg");
	this.shape_242.setTransform(-165.5,-139.1);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#FFFFFF").s().p("AgDBAQgGgIAAgPIAAhFIgVAAIAAgPIAVAAIAAgbIASAAIAAAbIAVAAIAAAPIgVAAIAABFQAAAHADAEQADADAGAAIAKgBIAAAPQgIACgHAAQgNAAgGgHg");
	this.shape_243.setTransform(-175.075,-140.375);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#FFFFFF").s().p("AgkArQgPgRAAgaIAAAAQABgRAGgNQAHgNALgIQAMgGAOgBQAXAAAOAQQAOAQAAAaIAAABQABARgHANQgGANgMAIQgMAGgPAAQgWAAgOgPgAgXgfQgIAMAAAUQAAATAIALQAKAMANAAQAPAAAIgMQAJgLAAgUQAAgSgJgMQgJgMgOAAQgNABgKAKg");
	this.shape_244.setTransform(-184.3,-139.1);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#FFFFFF").s().p("AAYBQIgmg0IgMANIAAAnIgUAAIAAifIAUAAIAABgIAKgNIAigkIAYAAIgrAuIAwBCg");
	this.shape_245.setTransform(-195.075,-141.475);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#FFFFFF").s().p("AAZA5IAAhJQAAgMgGgGQgFgGgMAAQgIAAgHAFQgHAFgEAIIAABPIgUAAIAAhvIATAAIAAAOQANgQAVgBQAjAAABApIAABJg");
	this.shape_246.setTransform(-214.25,-139.2);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#FFFFFF").s().p("AgjAxQgLgKAAgOQAAgRAOgJQANgKAYAAIASAAIAAgJQABgKgHgGQgGgGgLAAQgKAAgHAGQgHAEAAAIIgUAAQABgIAFgJQAHgHAKgFQAKgFALAAQAUAAALALQALAJAAARIAAAzQAAAPAFAKIAAABIgVAAQgCgDgBgIQgNANgSAAQgQABgLgKgAgbAWQABAKAFAEQAHAGAKAAQAHAAAJgFQAHgFAEgHIAAgYIgPAAQgjABAAAUg");
	this.shape_247.setTransform(-226,-139.1);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#FFFFFF").s().p("AgiBBQgMgQAAgaIAAgBQAAgZALgQQANgQAUAAQATAAALAOIAAg7IATAAIAACfIgRAAIgBgMQgLAOgUAAQgUAAgMgQgAgTgHQgJAKABAVQgBATAJALQAHALANAAQATAAAIgRIAAgyQgJgQgRAAQgOAAgHALg");
	this.shape_248.setTransform(-238.1,-141.375);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#FFFFFF").s().p("AAZA5IAAhJQAAgMgGgHQgFgFgMAAQgIAAgHAFQgHAFgEAIIAABPIgTAAIAAhvIASAAIAAAOQANgQAVAAQAjAAABAoIAABJg");
	this.shape_249.setTransform(354.45,-186.25);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#FFFFFF").s().p("AgjAxQgLgJAAgPQAAgSAOgIQANgKAYAAIATAAIAAgJQAAgKgHgGQgGgGgLAAQgKAAgHAFQgHAFAAAIIgUAAQABgJAGgHQAGgJAKgEQAKgFALABQAUAAALAKQALAJAAARIAAAzQAAAPAEAKIAAABIgUAAQgCgDAAgJQgOAPgSAAQgQAAgLgKgAgbAXQAAAIAHAFQAGAGAKAAQAHAAAJgFQAIgFAEgHIAAgYIgQAAQgjAAAAAWg");
	this.shape_250.setTransform(342.7,-186.15);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#FFFFFF").s().p("AAbA4IgbhUIgaBUIgQAAIgghvIATAAIAWBTIAahTIAPAAIAbBVIAVhVIATAAIggBvg");
	this.shape_251.setTransform(328.9,-186.15);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#FFFFFF").s().p("AghArQgOgOAAgaIAAgDQAAgQAGgNQAHgNALgIQAMgIAMABQAWAAANAOQAMAPAAAbIAAAHIhLAAQAAAQAKALQAJAKANAAQAKAAAHgFQAIgDAFgIIALAKQgOAVgcABQgWAAgPgQgAgRghQgIAJgCAOIA3AAIAAgBQAAgOgHgJQgIgHgMgBQgKAAgIAJg");
	this.shape_252.setTransform(315.4,-186.15);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#FFFFFF").s().p("AAZBQIAAhKQAAgMgGgGQgFgFgMAAQgIAAgHAFQgHAFgEAHIAABQIgUAAIAAifIAUAAIAAA9QANgQATAAQAkAAAAAoIAABKg");
	this.shape_253.setTransform(303.8,-188.525);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#FFFFFF").s().p("AgIBNIAAhwIARAAIAABwgAgIg5QgCgDAAgFQAAgFACgDQADgDAFAAQAGAAADADQACADAAAFQAAAFgCADQgDADgGAAQgFAAgDgDg");
	this.shape_254.setTransform(288.85,-188.2);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#FFFFFF").s().p("AA8A5IAAhJQAAgMgGgGQgFgGgNAAQgLAAgHAGQgHAHgBAKIAABKIgTAAIAAhJQAAgYgYAAQgTAAgHAQIAABRIgTAAIAAhvIASAAIABAMQAMgOAVAAQAYgBAHATQAGgIAJgGQAJgEAMAAQAlAAABAnIAABKg");
	this.shape_255.setTransform(276.925,-186.25);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#FFFFFF").s().p("AgkArQgOgQAAgbIAAAAQAAgRAGgNQAGgNAMgIQAMgGAOAAQAXAAAOAPQAOARAAAZIAAABQAAARgGANQgGANgMAIQgMAGgPABQgWAAgOgQgAgWgeQgJALAAAUQAAATAJAMQAJALANAAQAOAAAJgLQAJgMAAgUQAAgTgJgLQgIgMgPAAQgNAAgJAMg");
	this.shape_256.setTransform(261.45,-186.15);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#FFFFFF").s().p("AgDBAQgGgIAAgPIAAhFIgVAAIAAgPIAVAAIAAgbIASAAIAAAbIAVAAIAAAPIgVAAIAABFQAAAHADAEQADADAGAAIAKgBIAAAPQgIACgHAAQgNAAgGgHg");
	this.shape_257.setTransform(251.625,-187.425);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#FFFFFF").s().p("AgjAxQgKgJAAgPQAAgSANgIQANgKAYAAIATAAIAAgJQgBgKgGgGQgGgGgLAAQgKAAgHAFQgHAFAAAIIgUAAQAAgJAHgHQAFgJALgEQAKgFALABQAUAAALAKQALAJABARIAAAzQAAAPADAKIAAABIgTAAQgCgDgBgJQgOAPgSAAQgQAAgLgKgAgbAXQAAAIAHAFQAGAGAJAAQAJAAAHgFQAIgFAFgHIAAgYIgQAAQgiAAgBAWg");
	this.shape_258.setTransform(242.6,-186.15);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#FFFFFF").s().p("AAZA5IAAhJQAAgMgGgHQgFgFgMAAQgIAAgHAFQgHAFgEAIIAABPIgUAAIAAhvIATAAIAAAOQANgQAVAAQAjAAAAAoIAABJg");
	this.shape_259.setTransform(230.9,-186.25);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#FFFFFF").s().p("AgjAxQgLgJAAgPQAAgSAOgIQANgKAXAAIATAAIAAgJQABgKgHgGQgGgGgLAAQgKAAgHAFQgHAFAAAIIgTAAQAAgJAFgHQAHgJAKgEQAKgFAMABQATAAALAKQALAJAAARIAAAzQAAAPAFAKIAAABIgVAAQgCgDgBgJQgNAPgRAAQgRAAgLgKgAgbAXQABAIAFAFQAHAGAKAAQAIAAAIgFQAHgFAEgHIAAgYIgPAAQgjAAAAAWg");
	this.shape_260.setTransform(219.15,-186.15);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#FFFFFF").s().p("AAZA5IAAhJQAAgMgGgHQgFgFgMAAQgIAAgHAFQgHAFgEAIIAABPIgUAAIAAhvIATAAIAAAOQANgQAVAAQAjAAABAoIAABJg");
	this.shape_261.setTransform(201.1,-186.25);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#FFFFFF").s().p("AgjAxQgLgJAAgPQAAgSAOgIQANgKAYAAIASAAIAAgJQABgKgHgGQgGgGgLAAQgKAAgHAFQgHAFAAAIIgUAAQABgJAFgHQAHgJAKgEQAKgFALABQAUAAALAKQALAJAAARIAAAzQAAAPAFAKIAAABIgVAAQgCgDgBgJQgNAPgSAAQgQAAgLgKgAgbAXQABAIAFAFQAHAGAKAAQAHAAAJgFQAHgFAEgHIAAgYIgPAAQgjAAAAAWg");
	this.shape_262.setTransform(189.35,-186.15);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#FFFFFF").s().p("AgiBBQgNgQAAgaIAAgBQABgZALgQQANgQAUAAQATAAAMAOIAAg7IATAAIAACfIgSAAIgBgMQgMAOgTAAQgUAAgMgQgAgUgHQgHAKgBAVQABATAHALQAJALANAAQASAAAJgRIAAgyQgKgQgRAAQgNAAgJALg");
	this.shape_263.setTransform(177.2,-188.425);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#FFFFFF").s().p("AgIBNIAAhwIARAAIAABwgAgHg5QgDgDAAgFQAAgFADgDQACgDAFAAQAGAAADADQACADAAAFQAAAFgCADQgDADgGAAQgFAAgCgDg");
	this.shape_264.setTransform(162.4,-188.2);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#FFFFFF").s().p("AgXBKQgMgFgGgJIAKgLQAMAPASAAQANAAAIgIQAIgIAAgOIAAgKQgLANgTAAQgUAAgMgQQgNgQAAgaQAAgbAMgPQANgQAUAAQAUAAALAPIABgNIASAAIAABuQAAAVgNANQgNANgWAAQgLAAgMgGgAgTgzQgIALAAAVQAAATAIAKQAHALANAAQATAAAIgRIAAgyQgJgQgRAAQgNAAgIALg");
	this.shape_265.setTransform(153.625,-184.025);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#FFFFFF").s().p("AgkArQgOgQAAgbIAAAAQAAgRAGgNQAGgNAMgIQAMgGAOAAQAXAAAOAPQAOARAAAZIAAABQAAARgGANQgGANgMAIQgMAGgPABQgWAAgOgQgAgWgeQgJALAAAUQAAATAJAMQAJALANAAQAOAAAJgLQAJgMAAgUQAAgTgJgLQgIgMgPAAQgNAAgJAMg");
	this.shape_266.setTransform(141.75,-186.15);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#FFFFFF").s().p("AgIBQIAAifIASAAIAACfg");
	this.shape_267.setTransform(133.05,-188.525);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#FFFFFF").s().p("AgkArQgPgQAAgbIAAAAQAAgRAHgNQAGgNAMgIQAMgGAOAAQAXAAAOAPQAPARAAAZIAAABQgBARgGANQgGANgMAIQgMAGgPABQgWAAgOgQgAgWgeQgJALAAAUQAAATAJAMQAIALAOAAQAOAAAKgLQAIgMAAgUQAAgTgJgLQgIgMgPAAQgOAAgIAMg");
	this.shape_268.setTransform(124.35,-186.15);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#FFFFFF").s().p("AgQBRIAAhhIgRAAIAAgPIARAAIAAgLQABgSAJgKQAJgKASAAQAGAAAHACIgBAPIgKgBQgKAAgFAGQgFAFAAAKIAAAMIAYAAIAAAPIgYAAIAABhg");
	this.shape_269.setTransform(114.9,-188.625);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#FFFFFF").s().p("AgaA5IAAhvIATAAIAAAMQAIgOASAAQAGAAACABIAAASIgJgBQgSAAgHARIAABOg");
	this.shape_270.setTransform(107.775,-186.25);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#FFFFFF").s().p("AgkArQgPgQAAgbIAAAAQABgRAGgNQAGgNAMgIQAMgGAOAAQAXAAAOAPQAPARAAAZIAAABQAAARgHANQgGANgMAIQgMAGgPABQgWAAgOgQgAgXgeQgIALAAAUQAAATAIAMQAKALANAAQAPAAAIgLQAJgMAAgUQAAgTgJgLQgJgMgOAAQgNAAgKAMg");
	this.shape_271.setTransform(97.5,-186.15);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#FFFFFF").s().p("AA8A5IAAhJQAAgMgGgGQgFgGgNAAQgLAAgHAGQgHAHgBAKIAABKIgTAAIAAhJQAAgYgYAAQgTAAgHAQIAABRIgTAAIAAhvIASAAIABAMQAMgOAVAAQAYgBAHATQAGgIAJgGQAJgEAMAAQAlAAABAnIAABKg");
	this.shape_272.setTransform(82.075,-186.25);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#FFFFFF").s().p("AAZA5IAAhJQAAgMgGgHQgFgFgMAAQgIAAgHAFQgHAFgEAIIAABPIgUAAIAAhvIATAAIAAAOQAOgQATAAQAkAAAAAoIAABJg");
	this.shape_273.setTransform(60.45,-186.25);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#FFFFFF").s().p("AgjAxQgLgJAAgPQAAgSAOgIQANgKAXAAIATAAIAAgJQAAgKgFgGQgHgGgLAAQgKAAgHAFQgHAFAAAIIgTAAQAAgJAFgHQAHgJAKgEQAKgFAMABQATAAALAKQALAJAAARIAAAzQAAAPAFAKIAAABIgUAAQgDgDgBgJQgNAPgRAAQgRAAgLgKgAgaAXQAAAIAFAFQAHAGAJAAQAIAAAJgFQAHgFAEgHIAAgYIgPAAQgjAAABAWg");
	this.shape_274.setTransform(48.7,-186.15);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#FFFFFF").s().p("AgIBNIAAhwIASAAIAABwgAgHg5QgDgDgBgFQABgFADgDQADgDAEAAQAFAAAEADQACADAAAFQAAAFgCADQgEADgFAAQgEAAgDgDg");
	this.shape_275.setTransform(40.25,-188.2);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#FFFFFF").s().p("AgXBKQgMgFgGgJIAKgLQAMAPASAAQANAAAIgIQAIgIAAgOIAAgKQgLANgTAAQgUAAgMgQQgNgQAAgaQAAgbAMgPQANgQAUAAQAUAAALAPIABgNIASAAIAABuQAAAVgNANQgNANgWAAQgLAAgMgGgAgTgzQgIALAAAVQAAATAIAKQAHALANAAQATAAAIgRIAAgyQgJgQgRAAQgNAAgIALg");
	this.shape_276.setTransform(31.475,-184.025);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#FFFFFF").s().p("AgjAxQgKgJAAgPQAAgSANgIQANgKAYAAIATAAIAAgJQgBgKgFgGQgHgGgLAAQgKAAgHAFQgHAFAAAIIgUAAQAAgJAHgHQAFgJALgEQAKgFALABQAUAAALAKQALAJABARIAAAzQAAAPADAKIAAABIgUAAQgBgDgBgJQgOAPgSAAQgQAAgLgKgAgaAXQgBAIAHAFQAGAGAJAAQAJAAAHgFQAIgFAFgHIAAgYIgQAAQgiAAAAAWg");
	this.shape_277.setTransform(19.85,-186.15);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#FFFFFF").s().p("AgcBCIgBANIgSAAIAAifIAUAAIAAA8QALgPAUAAQAUAAAMAQQAMAPAAAaIAAACQAAAagMAQQgMAPgUAAQgUAAgMgPgAgbgBIAAAwQAJASASAAQANAAAIgLQAIgLAAgVQAAgUgIgKQgIgKgNAAQgTAAgIARg");
	this.shape_278.setTransform(8.275,-188.425);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#FFFFFF").s().p("AgjAxQgLgJAAgPQAAgSAOgIQANgKAYAAIATAAIAAgJQAAgKgHgGQgGgGgLAAQgKAAgHAFQgHAFAAAIIgUAAQAAgJAHgHQAFgJALgEQAKgFALABQAUAAALAKQALAJABARIAAAzQAAAPADAKIAAABIgUAAQgBgDgBgJQgOAPgSAAQgQAAgLgKgAgbAXQAAAIAHAFQAGAGAKAAQAHAAAIgFQAIgFAFgHIAAgYIgQAAQgjAAAAAWg");
	this.shape_279.setTransform(-10.2,-186.15);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#FFFFFF").s().p("AgiBBQgNgQAAgaIAAgBQAAgZANgQQAMgQAUAAQATAAAMAOIAAg7IASAAIAACfIgRAAIgBgMQgLAOgUAAQgUAAgMgQgAgUgHQgHAKAAAVQAAATAHALQAJALANAAQASAAAJgRIAAgyQgJgQgSAAQgOAAgIALg");
	this.shape_280.setTransform(-22.3,-188.425);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#FFFFFF").s().p("AgjAxQgKgJAAgPQAAgSANgIQANgKAXAAIATAAIAAgJQAAgKgFgGQgHgGgLAAQgKAAgHAFQgHAFAAAIIgTAAQgBgJAHgHQAFgJALgEQAKgFAMABQATAAALAKQALAJABARIAAAzQAAAPADAKIAAABIgTAAQgCgDgCgJQgNAPgRAAQgRAAgLgKgAgaAXQAAAIAFAFQAHAGAJAAQAJAAAHgFQAJgFADgHIAAgYIgPAAQgiAAAAAWg");
	this.shape_281.setTransform(-33.9,-186.15);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#FFFFFF").s().p("AgvBPIAAibIASAAIABAMQAMgOAUAAQAUAAAMAPQAMAPAAAcIAAACQAAAYgMAQQgMAQgUAAQgUAAgLgNIAAA2gAgbguIAAA1QAIAPASAAQANAAAIgLQAIgLAAgVQAAgTgIgLQgIgLgNAAQgSAAgIAQg");
	this.shape_282.setTransform(-45.475,-184.075);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#FFFFFF").s().p("AAZA5IAAhJQAAgMgGgHQgFgFgMAAQgIAAgHAFQgHAFgEAIIAABPIgUAAIAAhvIATAAIAAAOQANgQAVAAQAjAAABAoIAABJg");
	this.shape_283.setTransform(-63.95,-186.25);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#FFFFFF").s().p("AgjAxQgLgJAAgPQAAgSAOgIQANgKAYAAIASAAIAAgJQABgKgHgGQgGgGgLAAQgKAAgHAFQgHAFAAAIIgUAAQABgJAFgHQAHgJAKgEQAKgFALABQAUAAALAKQALAJAAARIAAAzQAAAPAFAKIAAABIgVAAQgCgDgBgJQgNAPgSAAQgQAAgLgKgAgbAXQABAIAFAFQAHAGAKAAQAHAAAJgFQAHgFAEgHIAAgYIgPAAQgjAAAAAWg");
	this.shape_284.setTransform(-75.7,-186.15);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#FFFFFF").s().p("AAbA4IgbhUIgaBUIgPAAIgihvIATAAIAXBTIAahTIAPAAIAaBVIAXhVIATAAIgiBvg");
	this.shape_285.setTransform(-89.55,-186.15);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#FFFFFF").s().p("AghArQgOgOAAgaIAAgDQAAgQAGgNQAHgNALgIQAMgIAMABQAXAAAMAOQAMAPAAAbIAAAHIhLAAQAAAQAJALQAKAKANAAQAKAAAIgFQAGgDAGgIIALAKQgOAVgcABQgWAAgPgQgAgRghQgIAJgCAOIA3AAIAAgBQAAgOgHgJQgIgHgMgBQgKAAgIAJg");
	this.shape_286.setTransform(-103,-186.15);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f("#FFFFFF").s().p("AAZBQIAAhKQAAgMgGgGQgFgFgMAAQgIAAgHAFQgHAFgEAHIAABQIgUAAIAAifIAUAAIAAA9QANgQATAAQAkAAAAAoIAABKg");
	this.shape_287.setTransform(-114.6,-188.525);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#FFFFFF").s().p("AAYBQIgmg0IgMANIAAAnIgUAAIAAifIAUAAIAABgIAKgNIAigkIAYAAIgrAuIAwBCg");
	this.shape_288.setTransform(-131.625,-188.525);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f("#FFFFFF").s().p("AgjAxQgKgJAAgPQAAgSANgIQANgKAXAAIAUAAIAAgJQgBgKgFgGQgHgGgLAAQgKAAgHAFQgHAFAAAIIgUAAQAAgJAHgHQAFgJALgEQAKgFALABQAUAAALAKQALAJABARIAAAzQAAAPADAKIAAABIgTAAQgCgDgBgJQgOAPgSAAQgQAAgLgKgAgaAXQgBAIAHAFQAGAGAJAAQAJAAAHgFQAIgFAFgHIAAgYIgQAAQgiAAAAAWg");
	this.shape_289.setTransform(-143.6,-186.15);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#FFFFFF").s().p("AgDBAQgGgIAAgPIAAhFIgVAAIAAgPIAVAAIAAgbIASAAIAAAbIAVAAIAAAPIgVAAIAABFQAAAHADAEQADADAGAAIAKgBIAAAPQgIACgHAAQgNAAgGgHg");
	this.shape_290.setTransform(-153.125,-187.425);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f("#FFFFFF").s().p("AgkArQgPgQAAgbIAAAAQAAgRAHgNQAGgNAMgIQAMgGAOAAQAXAAAOAPQAPARAAAZIAAABQgBARgGANQgHANgLAIQgMAGgPABQgWAAgOgQgAgXgeQgIALAAAUQAAATAIAMQAJALAOAAQAPAAAJgLQAIgMAAgUQAAgTgJgLQgJgMgOAAQgNAAgKAMg");
	this.shape_291.setTransform(-162.4,-186.15);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#FFFFFF").s().p("AAYBQIgmg0IgMANIAAAnIgUAAIAAifIAUAAIAABgIAKgNIAigkIAYAAIgrAuIAwBCg");
	this.shape_292.setTransform(-173.175,-188.525);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f("#FFFFFF").s().p("AAZA5IAAhJQAAgMgGgHQgFgFgMAAQgIAAgHAFQgHAFgEAIIAABPIgUAAIAAhvIATAAIAAAOQAOgQATAAQAkAAAAAoIAABJg");
	this.shape_293.setTransform(-191.55,-186.25);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#FFFFFF").s().p("AgjAxQgLgJAAgPQAAgSAOgIQANgKAXAAIATAAIAAgJQAAgKgFgGQgHgGgLAAQgKAAgHAFQgHAFAAAIIgTAAQAAgJAFgHQAHgJAKgEQAKgFAMABQATAAALAKQALAJAAARIAAAzQAAAPAFAKIAAABIgUAAQgDgDgBgJQgNAPgRAAQgRAAgLgKgAgaAXQAAAIAFAFQAHAGAJAAQAIAAAJgFQAHgFAEgHIAAgYIgPAAQgjAAABAWg");
	this.shape_294.setTransform(-203.3,-186.15);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f("#FFFFFF").s().p("AAYBQIgmg0IgMANIAAAnIgUAAIAAifIAUAAIAABgIAKgNIAigkIAYAAIgrAuIAwBCg");
	this.shape_295.setTransform(-213.775,-188.525);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#FFFFFF").s().p("AghArQgOgOAAgaIAAgDQAAgQAGgNQAHgNALgIQAMgIAMABQAXAAAMAOQAMAPAAAbIAAAHIhLAAQAAAQAJALQAKAKANAAQAKAAAIgFQAGgDAGgIIALAKQgOAVgcABQgWAAgPgQgAgRghQgIAJgCAOIA3AAIAAgBQAAgOgHgJQgIgHgMgBQgKAAgIAJg");
	this.shape_296.setTransform(-225.4,-186.15);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f("#FFFFFF").s().p("AgJBMIAAiGIgxAAIAAgRIB1AAIAAARIgxAAIAACGg");
	this.shape_297.setTransform(-237.475,-188.1);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgJgJQgJgJgUAAQgaAAgNAWIAACnIhAAAIAAjsIA9AAIABAbQAZggArAAQAlAAATAWQASAXABAsIAACYg");
	this.shape_298.setTransform(209.8,-227.7);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f("#FFFFFF").s().p("AgfCmIAAjtIA/AAIAADtgAgYhtQgKgJAAgOQgBgPAKgJQAKgJAPAAQAQAAAKAJQAKAJgBAPQABAOgKAJQgKAKgQAAQgPAAgJgKg");
	this.shape_299.setTransform(191.25,-232.175);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#FFFFFF").s().p("AhRBnQgYgUAAgfQAAgmAcgTQAcgUA0AAIAeAAIAAgOQAAgQgJgKQgJgKgQAAQgRAAgIAHQgKAIAAAOIg/AAQgBgVANgSQANgRAXgKQAYgKAcAAQArAAAbAWQAZAWAAAoIAABmQAAAiAKARIAAAEIhAAAQgFgJgCgNQgXAagkAAQgjAAgWgUgAgpAsIAAADQAAAMAIAIQAIAIAPAAQANAAAMgHQAMgGAGgKIAAgpIgYAAQgvAAgDAhg");
	this.shape_300.setTransform(173.2,-227.475);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f("#FFFFFF").s().p("ABqB5IAAiXQAAgTgHgKQgIgJgUAAQgdgBgLAcIAACiIg+AAIAAiXQAAgUgIgJQgIgJgUAAQgbgBgMAXIAACnIg/AAIAAjsIA7AAIACAaQAZgfArAAQAtAAARAkQAZgkAvAAQAmAAATAXQATAWAAAtIAACXg");
	this.shape_301.setTransform(141.725,-227.7);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#FFFFFF").s().p("AhCB5IAAjsIA8AAIABAcQATghAhAAQALAAAJADIgBA9QgNgCgJAAQglAAgKAZIAACag");
	this.shape_302.setTransform(114.95,-227.7);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f("#FFFFFF").s().p("AhKBbQghggAAg1IAAgGQAAgjAOgcQAOgdAZgPQAZgPAgAAQAxAAAcAfQAcAeAAA5IAAAZIiXAAQADAXAQAOQAPAOAXAAQAlAAAUgbIAgAjQgPAVgYALQgYALgeAAQgzAAghgggAgbg6QgMANgDAXIBXAAIAAgFQAAgVgLgLQgLgMgUAAQgSAAgMANg");
	this.shape_303.setTransform(93.925,-227.475);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#FFFFFF").s().p("Ah2CgIAAk/IBwAAQA5AAAfAWQAeAXAAArQAAAXgMASQgNASgVAIQAZAFAOATQAOATAAAbQAAAugeAYQgdAXg2ABgAg0BrIA4AAQAXAAANgLQANgLAAgUQAAgsgtAAIg8AAgAg0gZIAxAAQAxgBAAgnQAAgVgNgKQgNgKgaAAIguAAg");
	this.shape_304.setTransform(67.475,-231.575);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f("#FFFFFF").s().p("AAlCoIg8hfIgWAXIAABIIhAAAIAAlQIBAAAIAAC6IALgQIA8hGIBMAAIhVBiIBdCKg");
	this.shape_305.setTransform(31.1,-232.45);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f("#FFFFFF").s().p("AhRBjQgUgWAAgrIAAiaIA/AAIAACYQAAAmAhgBQAgAAAMgVIAAioIA/AAIAADsIg7AAIgCgXQgYAcgoAAQgmAAgUgWg");
	this.shape_306.setTransform(5,-227.25);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f("#FFFFFF").s().p("Ag5DSIAAgyQAMACAIAAQAeAAAAgfIAAj6IA+AAIAAD6QAAAngVAWQgVAWgmAAQgRAAgPgEgAgDidQgKgJAAgOQAAgPAKgJQAIgJARAAQARAAAJAJQAJAJAAAPQAAAOgJAJQgKAKgQAAQgQAAgJgKg");
	this.shape_307.setTransform(-15.65,-227.375);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgIgJQgJgJgVAAQgZAAgOAWIAACnIhAAAIAAjsIA9AAIABAbQAZggArAAQAlAAATAWQASAXABAsIAACYg");
	this.shape_308.setTransform(-31.95,-227.7);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f("#FFFFFF").s().p("AhRBjQgUgWgBgrIAAiaIBAAAIAACYQAAAmAigBQAfAAAMgVIAAioIBAAAIAADsIg8AAIgCgXQgYAcgoAAQgmAAgUgWg");
	this.shape_309.setTransform(-57.15,-227.25);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f("#FFFFFF").s().p("AgjBTIAAh/IgjAAIAAgvIAjAAIAAg6IA/AAIAAA6IAoAAIAAAvIgoAAIAAB1QAAANAFAGQAFAGAOAAQAKAAAJgCIAAAwQgTAGgUAAQhCAAgBhDg");
	this.shape_310.setTransform(-77.575,-230.175);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f("#FFFFFF").s().p("AhKBbQghggAAg1IAAgGQAAgjAOgcQAOgdAZgPQAZgPAgAAQAxAAAcAfQAcAeAAA5IAAAZIiXAAQADAXAQAOQAPAOAXAAQAlAAAUgbIAgAjQgPAVgYALQgYALgeAAQgzAAghgggAgbg6QgMANgDAXIBXAAIAAgFQAAgVgLgLQgLgMgUAAQgSAAgMANg");
	this.shape_311.setTransform(-96.725,-227.475);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f("#FFFFFF").s().p("Ah6CgIAAk/IB8AAQAkAAAbANQAcANAPAZQAOAYAAAfQAAAvgfAaQghAbg5AAIg4AAIAABxgAg3gFIA5AAQAbAAANgNQAOgMAAgXQAAgXgOgPQgOgOgYgBIg7AAg");
	this.shape_312.setTransform(-123,-231.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.instance},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).to({state:[]},1).wait(12));

	// Layer_2
	this.instance_1 = new lib.Tween7copy4("synched",0);
	this.instance_1.setTransform(42.25,-40.25);
	this.instance_1.alpha = 0;

	this.instance_2 = new lib.Tween8copy3("synched",0);
	this.instance_2.setTransform(42.25,-40.25);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true,alpha:1},12).to({_off:false,alpha:0},12).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:false},12).to({_off:true,alpha:0},12).wait(1));

	// Layer_3
	this.cobaBG = new lib.Tween10copy3();
	this.cobaBG.name = "cobaBG";
	this.cobaBG.setTransform(43.75,-42.75,1.1855,0.9051,0,0,0,0.2,-0.1);
	this.cobaBG.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.cobaBG).to({alpha:0.75},12).to({alpha:0},12).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-436.6,-314.2,960.2,543.1);


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
		var Score1 = root1.Score1;
		var positions2 = [];
		var _this = this;
		var jawaban1 = [];
		
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
		  jawaban1 = [];
		
		  root1.shuffle();
		};
		
		root1.mouseDownHandler = function (e) {
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
		  Score1.text = 0;
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
		    if (pieces1.target.x != pieces1.target.originalX) {
		      console.log("check");
		      root1.onMiss();
		    }
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
			if (pieces1.count === 3) root1.onWin();
		    if (pieces1.count === pieces1.children.length) root1.onWin();
		    if (Score1.text === 100) {
		      root1.onWin();
		    }
		
		    root1.slot = null;
		  } else root1.onMiss();
		  jawaban1.push(pieces1.target);
		
		  if (jawaban1.length >= 2) {
		    hapus = jawaban1.shift();
		    root1.sembunyiin(hapus);
		  }
		  console.log(jawaban1);
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
		root1.sembunyiin = function (hapus) {
		  createjs.Tween.get(hapus).to(
		    {
		      x: root1.slots1.kotakKartuSembunyi.x,
		      y: root1.slots1.kotakKartuSembunyi.y,
		    },
		    350,
		    createjs.Ease.backInOut
		  );
		};
		root1.salahJawab = function () {
		  _this.sound31.play();
		  _this.popUpSalah.visible = !_this.popUpSalah.visible;
		  setTimeout(function () {
		    _this.popUpSalah.visible = !_this.popUpSalah.visible;
		  }, 3000);
		};
		
		root1.onMatch = function () {
		  _this.sound21.play();
		  _this.popUpBenar.visible = !_this.popUpBenar.visible;
		  setTimeout(function () {
		    _this.popUpBenar.visible = !_this.popUpBenar.visible;
		  }, 3000);
		  pieces1.skor++;
		  Score1.text = pieces1.skor * 33;
		  if (pieces1.skor === 3) {
		    Score1.text = pieces1.skor * 33 + 1;
		  }
		};
		
		root1.onWin = function () {
		  _this.sound21.play();
		  _this.popUpSelesai.visible = !_this.popUpSelesai.visible;
		  setTimeout(function () {
		    _this.popUpSelesai.visible = !_this.popUpSelesai.visible;
		  }, 3000);
		
		  root1.popUpJawabanAkhir.gotoAndPlay(0);
		};
		
		root1.onMiss = function () {
		  _this.sound31.play();
		  _this.popUpDanger.visible = !_this.popUpDanger.visible;
		  setTimeout(function () {
		    _this.popUpDanger.visible = !_this.popUpDanger.visible;
		  }, 3000);
		  createjs.Tween.get(pieces1.target).to(
		    { x: pieces1.target.originalX, y: pieces1.target.originalY },
		    350,
		    createjs.Ease.backInOut
		  );
		};
		
		var tombol;
		var _this = this;
		
		function init1() {
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
		    _this.sound11 = createjs.Sound.createInstance("tombolGan");
		    _this.sound21 = createjs.Sound.createInstance("benar");
		    _this.sound31 = createjs.Sound.createInstance("salah");
		  }
		}
		
		init1();
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
	this.popUpDanger.setTransform(-211.7,-63.65,0.6891,0.692,0,0,0,161.7,-174.7);

	this.popUpSelesai = new lib.dsd();
	this.popUpSelesai.name = "popUpSelesai";
	this.popUpSelesai.setTransform(-278.2,-68.85,0.6891,0.692,0,0,0,32.9,33.1);

	this.popUpSalah = new lib.fff();
	this.popUpSalah.name = "popUpSalah";
	this.popUpSalah.setTransform(-278.2,-68.85,0.6891,0.692,0,0,0,32.9,33.1);

	this.popUpBenar = new lib.bener();
	this.popUpBenar.name = "popUpBenar";
	this.popUpBenar.setTransform(-278.2,-68.85,0.6892,0.6921,0,0,0,32.9,33.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.popUpBenar},{t:this.popUpSalah},{t:this.popUpSelesai},{t:this.popUpDanger}]}).wait(1));

	// Layer_1
	this.restart1 = new lib.Restart();
	this.restart1.name = "restart1";
	this.restart1.setTransform(132.05,10.45,0.5444,0.5444,0,0,0,0.1,0);
	new cjs.ButtonHelper(this.restart1, 0, 1, 2, false, new lib.Restart(), 3);

	this.Score1 = new cjs.Text("score", "12px 'Roboto'", "#FFFFFF");
	this.Score1.name = "Score1";
	this.Score1.textAlign = "center";
	this.Score1.lineHeight = 18;
	this.Score1.lineWidth = 31;
	this.Score1.parent = this;
	this.Score1.setTransform(191.593,3.55,1.9238,1.9238);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#34495E").s().p("AlGCxQgKAAAAgOIAAlFQAAgOAKAAIKNAAQAJAAAAAOIAAFFQAAAOgJAAg");
	this.shape.setTransform(191.8,10.85);

	this.pieces1 = new lib.Pieces1();
	this.pieces1.name = "pieces1";
	this.pieces1.setTransform(-201.05,-254.8,0.8714,0.8714);

	this.slots1 = new lib.Slots1();
	this.slots1.name = "slots1";
	this.slots1.setTransform(-201.05,-254.8,0.8714,0.8714);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,102,255,0.008)").s().p("EgmrAPdIAA+5MBNXAAAIAAe5g");
	this.shape_1.setTransform(-12.625,28.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.slots1},{t:this.pieces1},{t:this.shape},{t:this.Score1},{t:this.restart1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg5, new cjs.Rectangle(-675.6,-357.1,960.2,667.9000000000001), null);


// stage content:
(lib.game15 = function(mode,startPosition,loop) {
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
		  window.location.replace("../game16/index.html");
		});
		
		root.btnBack3.on("click", function () {
		  window.location.replace("../game14/index.html");
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
		    if (pieces.target.x != pieces.target.originalX) {
		      console.log("check");
		      root.onMiss();
		    }
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
		  Score.text = pieces.skor * 20;
		};
		
		root.onWin = function () {
		  _this.sound2.play();
		  _this.popUpSelesai.visible = !_this.popUpSelesai.visible;
		  setTimeout(function () {
		    _this.popUpSelesai.visible = !_this.popUpSelesai.visible;
		  }, 3000);
		
		  root.popUpJawabanAkhirUtama.gotoAndPlay(0);
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
	this.shape.setTransform(681.025,57.925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgKAWIAAgqIAIAAIAAAFQACgGAHAAIAEABIAAAGIgFAAQgGAAgCAGIAAAeg");
	this.shape_1.setTransform(677.6,57.875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgNASQgEgDAAgGQAAgGAFgDQAFgEAJAAIAHAAIAAgDQAAgEgDgCQgCgDgEAAQgDAAgDACQgDACAAADIgHAAQAAgDACgDIAGgFQAEgBAEAAQAHAAAFADQAEAEAAAGIAAATQAAAGACAEIAAAAIgIAAIgBgEQgFAFgGAAQgHAAgEgEgAgKAIQAAAEADACQACACAEAAQACAAADgCQADgCACgDIAAgJIgGAAQgNAAAAAIg");
	this.shape_2.setTransform(673.825,57.925);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgMASQgEgEAAgIIAAgbIAHAAIAAAbQAAAJAIAAQAIABADgHIAAgeIAHAAIAAAqIgHAAIAAgEQgEAFgIAAQgHAAgDgEg");
	this.shape_3.setTransform(669.375,57.95);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJAbQgFgCgDgEQgDgEAAgFIAIAAQAAAFADADQAEADAGAAQAGAAADgCQADgDABgEQgBgEgDgCQgCgDgIgCQgJgDgFgDQgEgEAAgGQAAgHAGgEQAFgFAHAAQAHAAAEACQAFADACAEQADAEAAAFIgHAAQAAgGgEgDQgEgDgGAAQgEAAgDADQgEACABAFQAAADACADQADACAHACQAHACAEACQAEACACADQACAEAAAEQAAAHgFAEQgGAFgJAAQgFAAgFgDg");
	this.shape_4.setTransform(664.7,57.175);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3498DB").s().p("Aj8D9QhphpAAiUQAAiTBphqQBphoCTAAQCVAABoBoQBpBqAACTQAACUhpBpQhoBpiVAAQiTAAhphpg");
	this.shape_5.setTransform(675.8705,37.2545,0.9301,0.9301);

	this.instance = new lib.hehe();
	this.instance.setTransform(714.4,37.3,0.7145,0.9301,0,0,0,86.2,36);
	this.instance.shadow = new cjs.Shadow("rgba(0,0,0,1)",3,3,4);
	this.instance.cache(-2,-2,176,76);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.tandaSuaraOff},{t:this.hening},{t:this.tandaSuaraOn},{t:this.nyala}]}).wait(1));

	// pp3
	this.pp3 = new lib.pp3();
	this.pp3.name = "pp3";
	this.pp3.setTransform(436.6,314.2);

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

	// Layer_4
	this.popUpJawabanAkhirUtama = new lib.popUpJawabanAkhirUtama();
	this.popUpJawabanAkhirUtama.name = "popUpJawabanAkhirUtama";
	this.popUpJawabanAkhirUtama.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.popUpJawabanAkhirUtama).wait(1));

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

	// code
	this.popUpInfo = new lib.popUpInfo();
	this.popUpInfo.name = "popUpInfo";
	this.popUpInfo.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.popUpInfo).wait(1));

	// Layer_1
	this.instance_1 = new lib.sustain();
	this.instance_1.setTransform(141.5,44.2,1,1,0,0,0,125.9,18.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_3
	this.cobaha = new lib.bg5();
	this.cobaha.name = "cobaha";
	this.cobaha.setTransform(674.75,358.05);

	this.timeline.addTween(cjs.Tween.get(this.cobaha).wait(1));

	// base
	this.btnInfo = new lib.btnInfo();
	this.btnInfo.name = "btnInfo";
	this.btnInfo.setTransform(892.55,53.3,0.6435,0.6435);
	new cjs.ButtonHelper(this.btnInfo, 0, 1, 2, false, new lib.btnInfo(), 3);

	this.restart = new lib.Restart();
	this.restart.name = "restart";
	this.restart.setTransform(715.95,176.75,0.7541,0.7541,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.restart, 0, 1, 2, false, new lib.Restart(), 3);

	this.drag2G1 = new lib.drag7G7();
	this.drag2G1.name = "drag2G1";
	this.drag2G1.setTransform(798.3,246.35,0.8086,0.8086,0,0,0,82.2,26.7);
	new cjs.ButtonHelper(this.drag2G1, 0, 1, 1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgWAeQgGgGAAgIQABgLAJgFQAJgGAOAAIAMAAIAAgGQABgGgDgEQgDgDgGAAQgGAAgEADQgEADgBAFIgMAAQABgGAEgFQAEgFAHgCQAFgDAHAAQALAAAGAHQAGAGgBAKIgGAhIAAAFIABAHIgBABIgLAAIgBgDIAAgEQgJAJgKAAQgJgBgFgFgAgJAEQgGAEgBAGQAAAFADADQACADAGAAQAFAAAEgCQAFgDAEgFIACgOIgJAAQgJAAgGADg");
	this.shape_6.setTransform(212.9802,206.325);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgWAaQgHgJABgOIABgDQABgJAFgJQAFgIAHgFQAHgEAHAAQALABAGAGQAGAHABAMIgBAIIAAAEIgsAAQgBAKAEAGQAEAHAIAAQAKAAAIgJIAHAFQgFAHgGADQgHAEgIAAQgMgBgIgJgAgHgUQgFAFgDAKIAgAAIABgBQABgIgEgGQgEgFgGAAQgGAAgGAFg");
	this.shape_7.setTransform(206.4188,206.325);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgbAqQgFgIgBgMIABgJQABgKAEgIQAFgIAGgEQAHgEAIAAQAKAAAHAIIAGgkIAMAAIgRBhIgLAAIACgIQgIAKgMgBQgJAAgGgHgAgLgHQgFAFgDAGQgCAIAAAIQgBAJAEAFQADAFAHAAQAJABAIgLIAFgfQgEgJgKAAQgGAAgFAEg");
	this.shape_8.setTransform(199.725,204.95);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgNAvIAMhEIALAAIgLBEgAACgiQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAgBAAgBQAAgDACgBQACgCADgBQADAAACACQACACAAADQAAADgCACIgFACQgDAAgCgCg");
	this.shape_9.setTransform(194.425,205.05);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgSAfQgHgFgDgIQgCgHAAgKQABgKAFgIQAFgJAIgEQAHgFAIAAQAJAAAGAFQAGAFADAIQADAIgBAJIAAABQgBAKgFAIQgFAIgHAEQgIAFgIAAQgIgBgGgEgAgKgSQgGAHgCALIAAABIAAAIQABAIAEAEQADAFAHAAQAEAAAFgDQAFgDADgGQAEgGABgHIAAgJQgBgIgEgEQgEgFgGAAQgIAAgGAHg");
	this.shape_10.setTransform(189.0583,206.325);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AALAjIAHgsIAAgGQgBgJgJAAQgJAAgIALIgJAwIgLAAIAMhEIALAAIgCAJQAIgKAMAAQAKAAAEAHQAFAGgBAMIgIAsg");
	this.shape_11.setTransform(181.7091,206.25);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgNAvIAMhEIALAAIgLBEgAACgiQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAgBAAgBQAAgDACgBQACgCADgBQADAAACACQACACAAADQAAADgCACIgFACQgDAAgCgCg");
	this.shape_12.setTransform(177.075,205.05);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AALAxIAHgtIAAgFQgBgJgJAAQgKgBgHALIgJAxIgLAAIARhhIALAAIgHAlQAIgJAMAAQAKAAAEAHQAFAGgBALIgIAtg");
	this.shape_13.setTransform(171.6091,204.875);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgRAfQgGgEgDgIQgDgIABgKIAAgCQACgKAEgHQAFgIAHgFQAHgEAIAAQALABAHAHQAGAHAAAKIgLAAQAAgHgDgEQgEgEgGAAQgIAAgGAHQgGAGgBAMIgBABIAAAJQABAHADAEQAEAFAHAAQAFAAAFgEQAFgDABgGIALAAQgBAGgEAFQgEAGgHADQgGADgGAAQgIgBgGgEg");
	this.shape_14.setTransform(165.1857,206.325);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgjAuIAQhbIA3AAIgBAKIgsAAIgFAeIAmAAIgCAJIgmAAIgFAgIAsAAIgCAKg");
	this.shape_15.setTransform(158.475,205.125);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgNAhQgGgDgEgGQgDgFAAgGIAMAAQAAAGAEAEQAFADAGAAQAHAAAEgDQAEgCAAgFQAAgFgEgCQgEgDgIgCQgIgCgGgCQgFgCgCgEQgDgEAAgFQAAgIAHgGQAHgGALAAQALAAAHAGQAIAGAAAKIgMAAQAAgFgEgEQgEgDgGAAQgGAAgEADQgDADAAAEQAAAEADACQAEADAHACQAJACAGACQAFACADAEQACAEAAAFQAAAJgHAGQgHAGgMAAQgHAAgHgDg");
	this.shape_16.setTransform(147.925,206.325);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgVAeQgGgGAAgJQAAgLAIgEQAIgGAOAAIALAAIAAgGQAAgGgDgEQgEgDgHAAQgGAAgEADQgEADAAAFIgMAAQAAgGAEgEQADgFAHgDQAGgDAGAAQAMAAAHAGQAHAGAAALIAAAeQAAAKACAFIAAABIgMAAIgCgHQgIAJgKAAQgKAAgHgGgAgQAOQAAAFAEADQAEADAGAAQAEAAAFgDQAFgCACgFIAAgOIgJAAQgVAAAAANg");
	this.shape_17.setTransform(141.075,206.325);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgFAxIAAhhIALAAIAABhg");
	this.shape_18.setTransform(135.975,204.875);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgTAaQgJgJAAgPIAAgCQAAgKAEgIQADgIAIgEQAGgFAIAAQAOAAAGAJQAIAJAAAQIAAAEIguAAQABAKAGAHQAFAGAIAAQAGAAAFgDQAEgCADgEIAHAFQgIAOgSAAQgNAAgIgKgAgKgUQgFAFgBAKIAiAAIAAgBQgBgJgFgFQgEgFgHAAQgGAAgFAFg");
	this.shape_19.setTransform(131,206.325);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAVAuIgggrIgLAMIAAAfIgMAAIAAhbIAMAAIAAAtIAogtIAOAAIgjApIAnAyg");
	this.shape_20.setTransform(123.95,205.125);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAOAxIgXggIgHAIIAAAYIgMAAIAAhhIAMAAIAAA6IAGgHIAVgWIAOAAIgaAcIAeAog");
	this.shape_21.setTransform(113.3,204.875);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgFAvIAAhEIAKAAIAABEgAgEgiQgCgCAAgDQAAgBAAgBQAAAAAAgBQABAAAAgBQAAAAABgBQACgCACAAQADAAACACQABABAAAAQAAABABAAQAAABAAAAQAAABAAABQAAADgCACQgCACgDAAQgCAAgCgCg");
	this.shape_22.setTransform(108,205.075);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgBAnQgEgGAAgIIAAgqIgNAAIAAgJIANAAIAAgQIALAAIAAAQIAMAAIAAAJIgMAAIAAAqQAAAEABACQACADAEgBIAGAAIAAAJIgJABQgIAAgDgEg");
	this.shape_23.setTransform(104.075,205.55);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgNAhQgGgDgEgGQgDgFAAgGIAMAAQAAAGAEAEQAFADAGAAQAHAAAEgDQAEgCAAgFQAAgFgEgCQgEgDgIgCQgIgCgGgCQgFgCgCgEQgDgEAAgFQAAgIAHgGQAHgGALAAQALAAAHAGQAIAGAAAKIgMAAQAAgFgEgEQgEgDgGAAQgGAAgEADQgDADAAAEQAAAEADACQAEADAHACQAJACAGACQAFACADAEQACAEAAAFQAAAJgHAGQgHAGgMAAQgHAAgHgDg");
	this.shape_24.setTransform(98.775,206.325);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgFAvIAAhEIAKAAIAABEgAgFgiQgBgCAAgDQAAgBAAgBQAAAAAAgBQABAAAAgBQAAAAAAgBQACgCADAAQAEAAABACQABABAAAAQAAABAAAAQABABAAAAQAAABAAABQAAADgCACQgBACgEAAQgDAAgCgCg");
	this.shape_25.setTransform(93.9,205.075);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgPAjIAAhEIALAAIAAAIQAFgJALAAIAEABIAAALIgFAAQgLAAgEAKIAAAvg");
	this.shape_26.setTransform(90.45,206.25);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgUAaQgIgJAAgPIAAgCQAAgKAEgIQADgIAIgEQAGgFAIAAQANAAAIAJQAHAJAAAQIAAAEIguAAQABAKAFAHQAHAGAHAAQAGAAAFgDQAEgCADgEIAIAFQgKAOgQAAQgNAAgKgKgAgKgUQgFAFgBAKIAhAAIAAgBQAAgJgEgFQgFgFgHAAQgGAAgFAFg");
	this.shape_27.setTransform(84.5,206.325);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgBAnQgEgGAAgIIAAgqIgNAAIAAgJIANAAIAAgQIALAAIAAAQIAMAAIAAAJIgMAAIAAAqQAAAEABACQACADAEgBIAGAAIAAAJIgJABQgIAAgDgEg");
	this.shape_28.setTransform(78.675,205.55);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AAOAxIgWggIgIAIIAAAYIgMAAIAAhhIAMAAIAAA6IAGgHIAVgWIAOAAIgaAcIAeAog");
	this.shape_29.setTransform(73.9,204.875);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgVAeQgGgGAAgJQAAgLAIgEQAIgGAOAAIALAAIAAgGQAAgGgDgEQgEgDgHAAQgGAAgEADQgEADAAAFIgMAAQAAgGAEgEQADgFAHgDQAGgDAGAAQAMAAAHAGQAHAGAAALIAAAeQAAAKACAFIAAABIgMAAIgCgHQgIAJgKAAQgKAAgHgGgAgQAOQAAAFAEADQAEADAGAAQAEAAAFgDQAFgCACgFIAAgOIgJAAQgVAAAAANg");
	this.shape_30.setTransform(66.625,206.325);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgQAjIAAhEIAMAAIAAAIQAFgJAKAAIAGABIAAALIgGAAQgLAAgEAKIAAAvg");
	this.shape_31.setTransform(61.25,206.25);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgVAeQgGgGAAgJQAAgLAIgEQAIgGAOAAIALAAIAAgGQAAgGgDgEQgEgDgHAAQgGAAgEADQgEADAAAFIgMAAQAAgGAEgEQADgFAHgDQAGgDAGAAQAMAAAHAGQAHAGAAALIAAAeQAAAKACAFIAAABIgMAAIgCgHQgIAJgKAAQgKAAgHgGgAgQAOQAAAFAEADQAEADAGAAQAEAAAFgDQAFgCACgFIAAgOIgJAAQgVAAAAANg");
	this.shape_32.setTransform(55.175,206.325);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AAVAuIgggrIgLAMIAAAfIgNAAIAAhbIANAAIAAAtIAogtIAPAAIgjApIAmAyg");
	this.shape_33.setTransform(48.1,205.125);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AAQAmIAAgwQAAgIgDgEQgDgEgIAAQgGAAgEADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_34.setTransform(385.9,210.675);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgWAgQgIgGABgKQgBgLAKgGQAIgGAPAAIAMAAIAAgFQABgIgEgDQgFgEgHAAQgGAAgEADQgFAEgBAEIgMAAQAAgFAEgFQAEgGAHgDQAHgCAGAAQANAAAIAGQAGAHABALIAAAgQAAALADAGIAAABIgOAAIgCgIQgIAKgLgBQgMABgGgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgCQAGgEACgFIAAgPIgJAAQgXAAAAAOg");
	this.shape_35.setTransform(378.25,210.75);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AASAlIgSg3IgRA3IgKAAIgWhJIANAAIAOA2IASg2IAJAAIARA3IAPg3IAMAAIgVBJg");
	this.shape_36.setTransform(369.2,210.75);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgVAcQgJgJAAgRIAAgCQAAgLAEgIQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAKAAARIAAAFIgxAAQABAKAGAIQAGAGAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPAAgJgKgAgLgVQgFAFgBAKIAkAAIAAgBQgBgJgEgFQgFgGgIAAQgHAAgFAGg");
	this.shape_37.setTransform(360.325,210.75);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AAZAyIAAguIgxAAIAAAuIgNAAIAAhjIANAAIAAArIAxAAIAAgrIANAAIAABjg");
	this.shape_38.setTransform(351.525,209.475);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AAQA1IgZgiIgIAIIAAAaIgNAAIAAhpIANAAIAAA/IAHgIIAWgXIAPAAIgcAdIAgAsg");
	this.shape_39.setTransform(340.025,209.2);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgGAzIAAhJIANAAIAABJgAgFglQgCgCAAgDQAAgDACgCQACgCADAAQAEAAACACQACACAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_40.setTransform(334.3,209.4);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_41.setTransform(330.125,209.925);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgDgGQgFgFAAgHIANAAQABAHAEAEQAFADAHAAQAHAAAFgDQADgDAAgFQABgFgEgDQgEgCgJgCQgJgCgGgDQgFgDgDgDQgDgEAAgGQAAgJAHgGQAJgGALAAQAMAAAIAGQAIAHAAAKIgNAAQAAgFgEgEQgFgEgGAAQgGAAgFADQgDADAAAFQAAAEADADIANAFQAJACAFACQAHADACAEQAEAEAAAFQgBAKgHAHQgJAFgMAAQgIAAgHgDg");
	this.shape_42.setTransform(324.45,210.75);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgFAzIAAhJIALAAIAABJgAgEglQgCgCAAgDQAAgDACgCQABgCADAAQAEAAABACQACACAAADQAAADgCACQgBACgEAAQgDAAgBgCg");
	this.shape_43.setTransform(319.15,209.4);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgGAAQgMAAgEAKIAAA0g");
	this.shape_44.setTransform(315.45,210.675);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgVAcQgJgJAAgRIAAgCQAAgLAEgIQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAKAAARIAAAFIgxAAQABAKAGAIQAGAGAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPAAgJgKgAgLgVQgFAFgBAKIAkAAIAAgBQgBgJgEgFQgFgGgIAAQgHAAgFAGg");
	this.shape_45.setTransform(309.075,210.75);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_46.setTransform(302.825,209.925);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AAQA1IgZgiIgIAIIAAAaIgNAAIAAhpIANAAIAAA/IAHgIIAWgXIAPAAIgcAdIAgAsg");
	this.shape_47.setTransform(297.675,209.2);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgXAgQgGgGAAgKQAAgLAJgGQAIgGAPAAIANAAIAAgFQAAgIgFgDQgDgEgIAAQgGAAgEADQgGAEAAAEIgMAAQAAgFAEgFQAEgGAGgDQAIgCAGAAQANAAAHAGQAIAHAAALIAAAgQAAALACAGIAAABIgNAAIgBgIQgKAKgLgBQgKABgIgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAGgCQAFgEADgFIAAgPIgKAAQgXAAAAAOg");
	this.shape_48.setTransform(289.85,210.75);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIAMAAIAAAIQAGgKALAAIAGABIAAAMIgGAAQgMAAgFAKIAAA0g");
	this.shape_49.setTransform(284.05,210.675);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgXAgQgGgGgBgKQABgLAIgGQAJgGAPAAIANAAIAAgFQgBgIgEgDQgEgEgHAAQgGAAgEADQgGAEABAEIgNAAQAAgFAEgFQAEgGAGgDQAHgCAIAAQAMAAAHAGQAIAHAAALIAAAgQAAALACAGIAAABIgNAAIgBgIQgKAKgLgBQgLABgHgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAGgCQAFgEADgFIAAgPIgLAAQgWAAAAAOg");
	this.shape_50.setTransform(277.5,210.75);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AAWAyIgigvIgMANIAAAiIgNAAIAAhjIANAAIAAAxIArgxIAQAAIgmAsIApA3g");
	this.shape_51.setTransform(269.875,209.475);

	this.g3 = new lib.g3();
	this.g3.name = "g3";
	this.g3.setTransform(849.45,290.5);

	this.g2 = new lib.g2();
	this.g2.name = "g2";
	this.g2.setTransform(732.45,290.5);

	this.g1 = new lib.g1();
	this.g1.name = "g1";
	this.g1.setTransform(614.45,290.5);

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
	this.shape_105.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_105.setTransform(785.7,96.225);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQALgHASgBIAPAAIAAgGQAAgIgFgGQgFgEgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAEgGQAGgGAIgEQAIgEAJAAQAPABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgJgIgAgVASQABAHAEAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_106.setTransform(776.35,96.3);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgCQAAgTAKgNQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgKQgJAMgQAAQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAIAKAAQAPABAHgNIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_107.setTransform(766.725,94.5);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgfApQgIgHAAgMQABgPANgHQAMgJATAAIARAAIABgHQABgJgEgFQgFgFgIAAQgIAAgFADQgHAFgBAGIgQABQABgIAFgHQAGgHAJgDQAIgDAKgBQAOABAJAIQAIAJgBAPIgIAuIgBAHQAAAEACAFIgBABIgQAAIAAgFIAAgEQgNAMgOgBQgNAAgHgIgAgNAGQgIAFgBAJQgBAGAEAEQAEAFAHAAQAIABAGgFQAGgEAFgGIAEgTIgMAAQgOAAgIAEg");
	this.shape_108.setTransform(752.8291,96.05);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AgeAkQgKgMABgVIABgDQABgOAHgLQAHgMAKgFQAKgHALAAQAOABAJAJQAIAKABAQIgBALIgBAGIg9AAQgBANAGAKQAFAIAMABQANAAAMgNIAJAIQgGAIgJAGQgKAEgKAAQgSAAgKgNgAgJgdQgIAIgEAOIAtAAIAAgCQACgLgFgHQgFgIgJAAIgBAAQgJAAgGAGg");
	this.shape_109.setTransform(743.7152,96.05);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AglA6QgIgKgBgRIABgMQABgOAHgLQAGgMAJgGQAJgFALgBQAPABAIALIAKgyIAQAAIgYCGIgOAAIABgJQgKAMgQgBQgOAAgHgKgAgPgKQgIAGgDAJQgEALAAAMQAAAMAEAIQAFAGAJABQANAAALgPIAHgrQgFgNgOABIAAgBQgJAAgGAGg");
	this.shape_110.setTransform(734.4167,94.15);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgSBBIAQheIAPAAIgPBegAADgvQgDgDAAgEQABgEACgDQADgCAEgBQAEAAADACQACADAAAEQAAAEgCADQgDADgEAAQgEAAgDgCg");
	this.shape_111.setTransform(727.075,94.3);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AgaArQgIgHgEgKQgEgLABgNQABgOAHgMQAHgMAKgGQALgGALgBQAMABAJAGQAIAHAEALQAEALgBANIAAABQgCANgGAMQgHALgKAHQgLAFgLAAQgMAAgJgGgAgOgZQgJAJgCAQIAAACIAAALQABAKAFAHQAFAGAJAAQAHAAAHgEQAHgEAEgIQAFgJABgKIAAgNQgBgKgFgHQgFgGgJAAIgBAAQgLAAgIAKg");
	this.shape_112.setTransform(719.625,96.05);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AAPAwIALg9IAAgIQgCgMgNAAQgNgBgLAPIgMBDIgQAAIARheIAPAAIgCANQAMgOAQgBQANABAHAJQAGAJgBAQIgLA9g");
	this.shape_113.setTransform(709.4391,95.95);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AgSBBIAQheIAPAAIgPBegAADgvQgDgDAAgEQABgEACgDQADgCAEgBQAEAAADACQACADAAAEQAAAEgCADQgDADgEAAQgEAAgDgCg");
	this.shape_114.setTransform(703.025,94.3);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AAPBDIALg+IAAgHQgCgMgNAAQgNgBgLAPIgMBDIgQAAIAYiGIAQAAIgKA0QAMgOAQAAQANABAHAJQAGAJgBAPIgLA+g");
	this.shape_115.setTransform(695.4391,94.05);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AgYArQgIgGgEgKQgEgMABgNIABgEQABgNAHgLQAGgLAKgFQAKgHAMAAQAPABAJAJQAIAKAAAPIgOAAQgBgJgFgGQgFgGgIAAQgMAAgIAJQgIAJgCARIAAACIAAALQAAALAFAGQAGAGAJAAQAHAAAHgFQAHgFACgIIAPAAQgBAIgGAIQgGAHgJAFQgJADgIAAQgMAAgIgGg");
	this.shape_116.setTransform(686.4795,96.05);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AgxBAIAWh/IBNAAIgCAOIg9AAIgHApIA1AAIgCANIg1AAIgIAtIA9AAIgCAOg");
	this.shape_117.setTransform(677.275,94.4);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgIIAPAAQABAIAGAFQAFAEAJAAQAJAAAFgDQAFgEAAgGQAAgGgEgDQgFgEgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAJAAALIgQAAQAAgFgFgGQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALACAHAEQAIADADAFQAEAFAAAHQAAAMgKAIQgKAGgPABQgKAAgIgEg");
	this.shape_118.setTransform(663.175,96.3);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQALgHARgBIAQAAIAAgGQgBgIgEgGQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAFgGAJgEQAIgEAJAAQAPABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgCgCAAgIQgLAMgOAAQgNAAgIgIgAgVASQAAAHAFAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgMAAQgcAAAAAQg");
	this.shape_119.setTransform(654.15,96.3);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_120.setTransform(647.475,94.425);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_121.setTransform(640.975,96.3);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_122.setTransform(632.675,94.425);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_123.setTransform(619.875,94.425);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_124.setTransform(612.925,94.675);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgWIAPAAIAAAWIAQAAIAAAMIgQAAIAAA3QAAAFACADQACADAGgBIAHgBIAAANIgMACQgLgBgDgGg");
	this.shape_125.setTransform(607.8,95.3);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgIIAPAAQABAIAGAFQAFAEAJAAQAJAAAFgDQAFgEAAgGQAAgGgEgDQgFgEgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAJAAALIgQAAQAAgFgFgGQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALACAHAEQAIADADAFQAEAFAAAHQAAAMgKAIQgKAGgPABQgKAAgIgEg");
	this.shape_126.setTransform(600.925,96.3);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_127.setTransform(594.475,94.675);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_128.setTransform(589.975,96.225);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_129.setTransform(582.225,96.3);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgWIAPAAIAAAWIAQAAIAAAMIgQAAIAAA3QAAAFABADQADADAGgBIAHgBIAAANIgMACQgLgBgDgGg");
	this.shape_130.setTransform(574.6,95.3);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_131.setTransform(568.375,94.425);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASgBIAQAAIAAgGQgBgIgEgGQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAFgGQAEgGAIgEQAJgEAIAAQAQABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgBgCgBgIQgLAMgOAAQgNAAgIgIgAgUASQgBAHAFAEQAFAFAHgBQAHAAAGgDQAHgEADgGIAAgSIgMAAQgbAAAAAQg");
	this.shape_132.setTransform(558.85,96.3);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_133.setTransform(551.825,96.225);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgGQABgIgFgGQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAFgGAHgEQAJgEAIAAQAQABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgBgCgBgIQgLAMgNAAQgOAAgJgIgAgUASQAAAHAEAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_134.setTransform(543.85,96.3);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_135.setTransform(535.525,94.425);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_136.setTransform(524.025,96.225);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgGQABgIgFgGQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAEgGAIgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgJgIgAgVASQABAHAEAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgMAAQgbAAAAAQg");
	this.shape_137.setTransform(516.05,96.3);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgQAAIAAgMIAQAAIAAgWIAOAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFACADQADADAFgBIAHgBIAAANIgLACQgKgBgFgGg");
	this.shape_138.setTransform(508.4,95.3);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("AgMBAIAAhNIgOAAIAAgMIAOAAIAAgIQAAgPAIgIQAGgIAOABIALABIgBAMIgIgBQgIAAgEAFQgEAEAAAIIAAAJIATAAIAAAMIgTAAIAABNg");
	this.shape_139.setTransform(503.225,94.35);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgGQABgIgFgGQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAEgGQAFgGAIgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgJgIgAgVASQABAHAEAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgMAAQgbAAAAAQg");
	this.shape_140.setTransform(495.35,96.3);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgCQAAgTAKgNQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgKQgJAMgQAAQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAIAKAAQAPABAHgNIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_141.setTransform(485.725,94.5);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_142.setTransform(472.25,96.225);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQALgHARgBIAQAAIAAgGQgBgIgEgGQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAFgGAJgEQAIgEAJAAQAPABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgCgCAAgIQgLAMgOAAQgNAAgIgIgAgVASQAAAHAFAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgMAAQgcAAAAAQg");
	this.shape_143.setTransform(462.9,96.3);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("AgSA7QgKgEgFgHIAJgJQAKAMAOAAQAKAAAGgHQAGgGAAgLIAAgIQgJALgPAAQgPAAgKgNQgKgMAAgWQAAgUAKgNQAJgNAQAAQAQAAAJAMIABgKIAOAAIAABXQAAASgKAJQgLAKgRAAQgJABgJgFgAgPgoQgHAIAAARQAAAPAHAIQAGAIAKAAQAPABAGgNIAAgpQgGgNgPABQgKgBgGAKg");
	this.shape_144.setTransform(453.35,98);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_145.setTransform(444.05,96.225);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_146.setTransform(434.925,96.3);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgCQAAgTAKgNQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgKQgJAMgQAAQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAIAKAAQAPABAHgNIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_147.setTransform(425.325,94.5);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_148.setTransform(411.85,96.225);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQALgHARgBIAQAAIAAgGQgBgIgEgGQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAGgGAIgEQAIgEAJAAQAPABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgIgIgAgVASQAAAHAFAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_149.setTransform(402.5,96.3);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("AAVAtIgVhDIgVBDIgMAAIgahZIAPAAIASBCIAVhCIALAAIAVBEIAShEIAPAAIgaBZg");
	this.shape_150.setTransform(391.475,96.3);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_151.setTransform(380.675,96.3);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgPAAIAAh/IAPAAIAAAxQAKgNAPAAQAdAAABAfIAAA8g");
	this.shape_152.setTransform(371.45,94.425);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_153.setTransform(358.825,94.425);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_154.setTransform(351.875,94.675);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgQAAIAAgMIAQAAIAAgWIAOAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFACADQADADAFgBIAHgBIAAANIgLACQgLgBgEgGg");
	this.shape_155.setTransform(346.75,95.3);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgIIAPAAQABAIAGAFQAFAEAJAAQAJAAAFgDQAFgEAAgGQAAgGgEgDQgFgEgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAJAAALIgQAAQAAgFgFgGQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALACAHAEQAIADADAFQAEAFAAAHQAAAMgKAIQgKAGgPABQgKAAgIgEg");
	this.shape_156.setTransform(339.875,96.3);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_157.setTransform(333.425,94.675);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_158.setTransform(328.925,96.225);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgTIAAgDQAAgMAFgLQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgDAFgGIAJAIQgLARgXAAQgRAAgMgNgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_159.setTransform(321.175,96.3);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgQAAIAAgMIAQAAIAAgWIAOAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFACADQADADAFgBIAHgBIAAANIgLACQgKgBgFgGg");
	this.shape_160.setTransform(313.55,95.3);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_161.setTransform(307.325,94.425);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgGQABgIgFgGQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAEgGQAFgGAIgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgCAAgIQgLAMgNAAQgOAAgJgIgAgVASQABAHAEAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgMAAQgbAAAAAQg");
	this.shape_162.setTransform(297.8,96.3);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_163.setTransform(290.775,96.225);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQALgHARgBIAQAAIAAgGQgBgIgEgGQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAGgGAIgEQAIgEAJAAQAPABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgCgCAAgIQgLAMgOAAQgNAAgIgIgAgVASQAAAHAFAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_164.setTransform(282.8,96.3);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_165.setTransform(274.475,94.425);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_166.setTransform(262.975,96.225);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQALgHARgBIAQAAIAAgGQgBgIgEgGQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAFgGAJgEQAIgEAJAAQAPABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgCgCAAgIQgLAMgOAAQgNAAgIgIgAgVASQAAAHAFAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgMAAQgcAAAAAQg");
	this.shape_167.setTransform(255,96.3);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#FFFFFF").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgWIAPAAIAAAWIAQAAIAAAMIgQAAIAAA3QAAAFACADQACADAGgBIAHgBIAAANIgMACQgLgBgDgGg");
	this.shape_168.setTransform(247.35,95.3);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FFFFFF").s().p("AgMBAIAAhNIgOAAIAAgMIAOAAIAAgIQAAgPAIgIQAGgIAOABIALABIgBAMIgIgBQgIAAgEAFQgEAEAAAIIAAAJIATAAIAAAMIgTAAIAABNg");
	this.shape_169.setTransform(242.175,94.35);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQALgHARgBIAQAAIAAgGQgBgIgEgGQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAFgGAJgEQAIgEAJAAQAPABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgCgCAAgIQgLAMgOAAQgNAAgIgIgAgVASQAAAHAFAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgMAAQgcAAAAAQg");
	this.shape_170.setTransform(234.3,96.3);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgCQAAgTAKgNQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgKQgJAMgQAAQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAIAKAAQAPABAHgNIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_171.setTransform(224.675,94.5);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAAAAgIAAA7g");
	this.shape_172.setTransform(211.2,96.225);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATgBIAOAAIAAgGQABgIgFgGQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAFgGAHgEQAJgEAIAAQAQABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgBgCgBgIQgLAMgNAAQgOAAgJgIgAgUASQAAAHAEAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgMAAQgaAAAAAQg");
	this.shape_173.setTransform(201.85,96.3);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_174.setTransform(193.525,94.425);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#FFFFFF").s().p("AgdAiQgLgNAAgUIAAgBQAAgNAGgKQAFgLAIgGQAKgFALgBQASAAALANQAMANAAAUIAAABQAAANgFAKQgFALgKAGQgJAGgMAAQgRAAgMgNgAgRgYQgIAJABAQQgBAPAIAJQAGAJALAAQALAAAIgJQAGgJABgQQgBgPgGgIQgIgKgLAAQgLAAgGAJg");
	this.shape_175.setTransform(183.8,96.3);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgVIAAgCQAAgNAFgKQAFgKAJgGQAJgGALAAQAPABAKAIQAKAJABAPIgPAAQgBgJgFgFQgGgGgJAAQgKAAgHAJQgGAIgBAQIAAACQABAQAGAHQAHAJAKAAQAJAAAFgFQAHgFAAgIIAPAAQgBAIgFAHQgFAIgHADQgJAFgJAAQgRAAgLgNg");
	this.shape_176.setTransform(174.6,96.3);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#FFFFFF").s().p("AgcAiQgMgNAAgUIAAgBQAAgNAFgKQAFgLAKgGQAJgFALgBQASAAALANQAMANAAAUIAAABQAAANgFAKQgFALgKAGQgJAGgMAAQgSAAgKgNgAgSgYQgHAJAAAQQAAAPAHAJQAIAJAKAAQALAAAHgJQAIgJAAgQQAAgPgIgIQgHgKgLAAQgKAAgIAJg");
	this.shape_177.setTransform(165.2,96.3);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#FFFFFF").s().p("AghAvQgMgPAAgaIAAgLQAAgRAFgNQAHgNAKgGQALgHAOAAQAUAAALALQAMAKACAUIgRAAQgBgPgIgGQgGgHgNAAQgPAAgIALQgJALAAAWIAAAKQABAUAHALQAJAMAOAAQANAAAHgGQAHgGACgPIARAAQgDAUgMAKQgMAKgTAAQgVAAgNgPg");
	this.shape_178.setTransform(155,94.75);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#FFFFFF").s().p("AACAUIAAgJQAAgJAEgHQAEgJAGgFIAJAGQgIAKAAALIAAAMgAgYAUIAAgJQAAgJAEgHQAEgJAHgFIAJAGQgIAKAAALIAAAMg");
	this.shape_179.setTransform(146.675,89.9);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.bf(img.Bitmap2, null, new cjs.Matrix2D(1,0,0,1,-499,-300)).s().p("EhN9Au4MAAAhdvMCb7AAAMAAABdvg");
	this.shape_180.setTransform(471,266.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.btnNextDasar1},{t:this.btnMenuDasar1},{t:this.btnBack3},{t:this.slots},{t:this.pieces},{t:this.judulKI},{t:this.Score},{t:this.g1},{t:this.g2},{t:this.g3},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.drag2G1},{t:this.restart},{t:this.btnInfo}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(452,236.2,518,432.7);
// library properties:
lib.properties = {
	id: 'E740BB847DF4864B949C99CD86B71105',
	width: 960,
	height: 540,
	fps: 24,
	color: "#34495E",
	opacity: 1.00,
	manifest: [
		{src:"images/_12.png", id:"_12"},
		{src:"images/_16.jpeg", id:"_16"},
		{src:"images/_13.png", id:"_13"},
		{src:"images/_26.jpeg", id:"_26"},
		{src:"images/Bitmap133.png", id:"Bitmap133"},
		{src:"images/Bitmap134.png", id:"Bitmap134"},
		{src:"images/Bitmap135.png", id:"Bitmap135"},
		{src:"images/Bitmap136.png", id:"Bitmap136"},
		{src:"images/Bitmap130.png", id:"Bitmap130"},
		{src:"images/Bitmap3.png", id:"Bitmap3"},
		{src:"images/Bitmap2.png", id:"Bitmap2"},
		{src:"images/flash0aiAssets.png", id:"flash0aiAssets"},
		{src:"images/flash0aiAssets_1.png", id:"flash0aiAssets_1"},
		{src:"images/flash0aiAssets_2.png", id:"flash0aiAssets_2"},
		{src:"images/flash0aiAssets_3.png", id:"flash0aiAssets_3"},
		{src:"images/bookpngcopy.png", id:"bookpngcopy"},
		{src:"images/Bitmap102copy.png", id:"Bitmap102copy"},
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