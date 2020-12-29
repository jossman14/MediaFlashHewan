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
p.nominalBounds = new cjs.Rectangle(0,0,661,429);


(lib._20 = function() {
	this.initialize(img._20);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,720,580);


(lib._11 = function() {
	this.initialize(img._11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,440,389);


(lib.Bitmap137 = function() {
	this.initialize(img.Bitmap137);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,302,157);


(lib.Bitmap138 = function() {
	this.initialize(img.Bitmap138);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,296,157);


(lib.Bitmap140 = function() {
	this.initialize(img.Bitmap140);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,253,147);


(lib.Bitmap141 = function() {
	this.initialize(img.Bitmap141);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,258,147);


(lib.Bitmap142 = function() {
	this.initialize(img.Bitmap142);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,261,147);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);


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
p.nominalBounds = new cjs.Rectangle(0,0,369,180);


(lib.flash0aiAssets_1 = function() {
	this.initialize(img.flash0aiAssets_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,153,152);


(lib.flash0aiAssets_2 = function() {
	this.initialize(img.flash0aiAssets_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,258);


(lib.Bitmap135 = function() {
	this.initialize(img.Bitmap135);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,199,123);


(lib.Bitmap136 = function() {
	this.initialize(img.Bitmap136);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,191,123);


(lib.flash0aiAssets_3 = function() {
	this.initialize(img.flash0aiAssets_3);
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
	this.instance = new lib._20();
	this.instance.setTransform(-50,-37.5,0.139,0.1293);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g3, new cjs.Rectangle(-50,-37.5,100.1,75), null);


(lib.g2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap138();
	this.instance.setTransform(-50,-37.5,0.338,0.4777);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g2, new cjs.Rectangle(-50,-37.5,100.1,75), null);


(lib.g1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap137();
	this.instance.setTransform(-50,-37.5,0.3313,0.4777);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g1, new cjs.Rectangle(-50,-37.5,100.1,75), null);


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


(lib.Tween7_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#603AD8").s().p("EhB5AkpMAAAhJRMCDzAAAMAAABJRg");

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

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


(lib.drop13G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgUA/QgKgFgGgHIAKgMQAKALAPAAQAJAAAHgFQAFgGABgLIAAgHQgKALgOAAQgRAAgKgOQgLgNAAgXQAAgWALgNQAKgNASAAQAPAAAJALIABgJIATAAIAABbQAAATgLAKQgMALgTAAQgKAAgKgEgAgNgoQgHAIAAAQQAAAPAHAHQAFAIAJAAQANAAAHgLIAAgpQgHgLgNAAQgJAAgFAJg");
	this.shape.setTransform(201.4,85.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgVAAIAAhfIAUAAIAAALQALgNAQABQAegBABAjIAAA+g");
	this.shape_1.setTransform(191.5,83.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgIAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAJAAAOIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_2.setTransform(181.625,83.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AASBEIAAg+QAAgIgFgFQgDgEgJAAQgLAAgHALIAABEIgWAAIAAiGIAWAAIAAAyQALgMAPAAQAegBAAAjIAAA+g");
	this.shape_3.setTransform(171.75,81.95);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgIAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAJAAAOIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_4.setTransform(161.875,83.95);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAVAAIAAALQAGgMAOAAQAFgBADACIgBAUIgIgBQgPAAgEALIAABBg");
	this.shape_5.setTransform(154.25,83.85);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgEAAgFQAAgEADgEQADgDAFAAQAGAAADADQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_6.setTransform(143.85,82.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgIAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAJAAAOIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_7.setTransform(136.675,83.95);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgUA/QgLgFgFgHIAKgMQALALAOAAQAJAAAHgFQAFgGAAgLIAAgHQgIALgPAAQgQAAgLgOQgLgNAAgXQAAgWALgNQAKgNASAAQAOAAAKALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgJgEgAgOgoQgFAIAAAQQAAAPAFAHQAGAIAJAAQAOAAAFgLIAAgpQgFgLgOAAQgJAAgGAJg");
	this.shape_8.setTransform(126.5,85.725);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgIAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAJAAAOIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_9.setTransform(116.725,83.95);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgUA4IgCALIgTAAIAAiGIAWAAIAAAwQAJgLAOABQASgBAKANQAKAOAAAVIAAACQAAAWgKANQgKAOgRAAQgQAAgJgNgAgTAAIAAAmQAFANAOAAQAJAAAGgHQAFgIAAgPIAAgDQAAgPgFgHQgGgIgJAAQgOAAgFAMg");
	this.shape_10.setTransform(106.975,82.05);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgNAGgMQAFgLAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_11.setTransform(96.975,83.95);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgTAtQgJgEgGgIQgEgHAAgJIAVAAQAAAIAFAEQAGAEAHAAQAIAAAFgDQAEgDAAgFQAAgGgEgDQgFgDgKgDQgLgCgHgDQgQgHAAgOQAAgNAKgIQAKgIAPAAQARAAALAIQAKAJAAANIgVAAQAAgGgFgEQgEgFgIABQgFAAgFADQgFADAAAGQAAAEAFADQAEADAMADQAMADAHADQAHADAEAFQADAGAAAIQAAAMgLAJQgKAHgRABQgLgBgJgEg");
	this.shape_12.setTransform(87.35,83.95);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAVAAIAAALQAGgMAOAAQAFgBADACIgBAUIgIgBQgPAAgDALIAABBg");
	this.shape_13.setTransform(75.5,83.85);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKAMgQAAQgPAAgIgKg");
	this.shape_14.setTransform(66.875,84.05);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgpBDIAAiDIAUAAIABAKQAKgMAOAAQASAAAKANQAKANgBAXIAAACQAAAVgKANQgJANgRAAQgPAAgJgKIAAAtgAgTglIAAApQAGALANAAQAJAAAFgIQAHgHgBgRQAAgOgFgJQgGgIgJAAQgNAAgGALg");
	this.shape_15.setTransform(57,85.675);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgIAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAJAAAOIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_16.setTransform(46.875,83.95);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AARBEIgbgqIgJAKIAAAgIgWAAIAAiGIAWAAIAABMIAGgIIAagdIAZAAIgjAnIAnA4g");
	this.shape_17.setTransform(37.875,81.95);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgVA/QgJgFgFgHIAKgMQAKALAOAAQAKAAAFgFQAHgGgBgLIAAgHQgJALgOAAQgQAAgLgOQgLgNAAgXQAAgWAKgNQALgNARAAQAQAAAJALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgKgEgAgOgoQgFAIAAAQQAAAPAFAHQAGAIAKAAQANAAAFgLIAAgpQgFgLgNAAQgKAAgGAJg");
	this.shape_18.setTransform(226.65,60.125);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgLAAgHAMIAABCIgWAAIAAhdIAVAAIABALQAKgOAQAAQAeABAAAhIAAA+g");
	this.shape_19.setTransform(216.75,58.25);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgWIAAgCQAAgNAGgMQAFgLAKgGQAKgHALAAQAUAAAKANQALAMAAAXIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgMgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_20.setTransform(207.025,58.35);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgoBDIAAiDIATAAIABAKQAJgMAPAAQASAAAKANQAJANAAAXIAAACQABAVgLANQgKANgQAAQgPAAgJgKIAAAtgAgTglIAAApQAFALANAAQAKAAAFgIQAHgHAAgRQgBgOgFgJQgGgIgKAAQgNAAgFALg");
	this.shape_21.setTransform(197.2,60.075);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgEQgEgFgJAAQgHAAgFAEQgFAEgBAHIAAA/IgVAAIAAg9QAAgRgRAAQgNAAgFAKIAABEIgVAAIAAhdIAUAAIAAAKQAKgNASAAQASAAAHAPQAKgPATAAQAQABAIAIQAHAJAAARIAAA9g");
	this.shape_22.setTransform(184.125,58.25);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgWIAAgCQAAgNAGgMQAFgLAKgGQAKgHALAAQAUAAAKANQALAMAAAXIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgMgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_23.setTransform(171.575,58.35);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgKBDIAAiGIAVAAIAACGg");
	this.shape_24.setTransform(164.35,56.35);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAKIAAAeIgWAAIAAiGIAWAAIAABOIAGgJIAagcIAZAAIgjAmIAnA3g");
	this.shape_25.setTransform(137.925,56.35);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgfAkQgMgOAAgWIAAAAQAAgOAFgLQAGgLAKgGQAKgGAMgBQATAAAMANQAMAMABAVIAAAEQAAAOgFALQgGALgKAGQgKAHgNgBQgTAAgMgNgAgQgXQgGAIAAAQQAAAPAGAIQAGAIAKAAQALAAAGgIQAGgJAAgPQAAgPgGgIQgHgIgKAAQgKAAgGAIg");
	this.shape_26.setTransform(127.575,58.35);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgoBDIAAiDIATAAIABAKQAJgMAPAAQASAAAKANQAJANAAAXIAAACQABAVgLANQgKANgQAAQgPAAgJgKIAAAtgAgTglIAAApQAFALANAAQAKAAAFgIQAHgHAAgRQgBgOgFgJQgGgIgKAAQgNAAgFALg");
	this.shape_27.setTransform(117.55,60.075);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgEQgEgFgJAAQgHAAgFAEQgFAEgBAHIAAA/IgVAAIAAg9QAAgRgRAAQgNAAgFAKIAABEIgVAAIAAhdIAUAAIAAAKQAKgNASAAQASAAAHAPQAKgPATAAQAQABAIAIQAHAJAAARIAAA9g");
	this.shape_28.setTransform(104.475,58.25);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgfAkQgMgOAAgWIAAAAQAAgOAFgLQAGgLAKgGQAKgGAMgBQATAAAMANQAMAMABAVIAAAEQAAAOgFALQgGALgKAGQgKAHgNgBQgTAAgMgNgAgQgXQgGAIAAAQQAAAPAGAIQAGAIAKAAQALAAAGgIQAGgJAAgPQAAgPgGgIQgHgIgKAAQgKAAgGAIg");
	this.shape_29.setTransform(91.575,58.35);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgKBDIAAiGIAVAAIAACGg");
	this.shape_30.setTransform(84.15,56.35);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgWIAAgCQAAgNAGgMQAFgLAKgGQAKgHALAAQAUAAAKANQALAMAAAXIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgMgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_31.setTransform(77.125,58.35);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAKIAAAeIgWAAIAAiGIAWAAIAABOIAGgJIAagcIAZAAIgjAmIAnA3g");
	this.shape_32.setTransform(68.075,56.35);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgcA3QgMgKgBgQIAVAAQABAJAFAFQAGAEAIABQAKAAAFgIQAFgGAAgMQAAgMgGgHQgGgGgJAAQgGAAgEACQgEABgFAEIgRgEIAHhAIBEAAIAAASIgyAAIgEAfQAJgFAKAAQATAAAKAMQAKAKAAAUQAAATgLAMQgMAMgTAAQgRAAgLgKg");
	this.shape_33.setTransform(37.925,56.8);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAVAAIAABfgAgIgtQgDgDAAgGQAAgEADgEQADgDAFAAQAGAAADADQADAEAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_34.setTransform(229.6,30.95);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgUA/QgLgFgFgHIAKgMQAKALAPAAQAJAAAHgFQAFgGAAgLIAAgHQgIALgPAAQgQAAgLgOQgLgNAAgXQAAgWALgNQAKgNASAAQAOAAAKALIABgJIATAAIAABbQAAATgLAKQgMALgTAAQgKAAgKgEgAgNgoQgHAIABAQQgBAPAHAHQAFAIAJAAQANAAAGgLIAAgpQgGgLgNAAQgJAAgFAJg");
	this.shape_35.setTransform(222,34.525);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgVAAIAAhfIAUAAIAAALQALgNAQABQAegBABAjIAAA+g");
	this.shape_36.setTransform(212.1,32.65);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgDAAgGQAAgEADgEQADgDAFAAQAGAAADADQADAEAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_37.setTransform(204.8,30.95);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgJBEIAAiGIATAAIAACGg");
	this.shape_38.setTransform(200.2,30.75);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgDAAgGQAAgEADgEQADgDAFAAQAGAAADADQADAEAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_39.setTransform(195.6,30.95);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgJBEIAAiGIAUAAIAACGg");
	this.shape_40.setTransform(191,30.75);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_41.setTransform(183.975,32.75);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AARBEIgbgqIgJAKIAAAgIgWAAIAAiGIAWAAIAABMIAGgIIAagdIAZAAIgjAnIAnA4g");
	this.shape_42.setTransform(174.925,30.75);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgDAAgGQAAgEADgEQADgDAFAAQAGAAADADQADAEAAAEQAAAGgDADQgDADgGAAQgFAAgDgDg");
	this.shape_43.setTransform(167.35,30.95);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgVAKgNQALgNARAAQAOAAAJAKIAAgwIAWAAIAACGIgUAAIgBgKQgJALgPABQgRAAgKgOgAgOgDQgFAGAAARQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAJg");
	this.shape_44.setTransform(159.775,30.85);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABDIgWAAIAAhfIAVAAIAAALQALgNAQABQAegBABAjIAAA+g");
	this.shape_45.setTransform(141.75,32.65);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgFQAIgDAKAAQARAAAKAIQAKAIAAAPIAAAqQAAANAEAIIAAACIgWAAQgBgDgBgGQgLAKgNABQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_46.setTransform(131.875,32.75);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AgVA/QgJgFgFgHIAKgMQAKALAOAAQAKAAAFgFQAHgGgBgLIAAgHQgJALgOAAQgQAAgLgOQgLgNAAgXQAAgWAKgNQALgNARAAQAQAAAJALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgKgEgAgOgoQgFAIgBAQQABAPAFAHQAGAIAKAAQANAAAFgLIAAgpQgFgLgNAAQgKAAgGAJg");
	this.shape_47.setTransform(121.7,34.525);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABDIgWAAIAAhfIAVAAIABALQAKgNAQABQAegBAAAjIAAA+g");
	this.shape_48.setTransform(111.8,32.65);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgUIAAgDQAAgOAGgKQAFgMAKgGQAKgGALAAQAUAAAKAMQALANAAAWIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALALQgFAIgKAEQgKAGgLAAQgUgBgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_49.setTransform(102.075,32.75);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgVAKgNQALgNARAAQAOAAAJAKIAAgwIAWAAIAACGIgUAAIgBgKQgJALgPABQgRAAgKgOgAgOgDQgFAGAAARQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAJg");
	this.shape_50.setTransform(91.875,30.85);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAFACACQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgcg");
	this.shape_51.setTransform(75.625,31.7);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKAMgQAAQgPAAgIgKg");
	this.shape_52.setTransform(67.825,32.85);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AgKBEIAAiGIAUAAIAACGg");
	this.shape_53.setTransform(60.55,30.75);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKAMgQAAQgPAAgIgKg");
	this.shape_54.setTransform(53.225,32.85);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AAuAxIAAg9QAAgJgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABBIgVAAIAAg+QAAgRgRAAQgNAAgFALIAABEIgVAAIAAhfIAUAAIAAAKQAKgMASABQASAAAHAOQAKgOATAAQAQgBAIAKQAHAIAAARIAAA+g");
	this.shape_55.setTransform(40.425,32.65);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_56.setTransform(229.65,5.35);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAKIAAAeIgWAAIAAiGIAWAAIAABOIAGgJIAagcIAZAAIgjAmIAnA3g");
	this.shape_57.setTransform(223.225,5.15);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_58.setTransform(215.65,5.35);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgKBDIAAiGIAVAAIAACGg");
	this.shape_59.setTransform(211.05,5.15);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_60.setTransform(206.45,5.35);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgEQgEgFgJAAQgHAAgFAEQgFAEgBAHIAAA/IgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgNASAAQASAAAHAPQAKgPATAAQAQABAIAIQAHAJAAARIAAA9g");
	this.shape_61.setTransform(196.325,7.05);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALAAQAUAAAKANQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgMgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_62.setTransform(183.775,7.15);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgEQgEgFgJAAQgHAAgFAEQgFAEgBAHIAAA/IgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgNASAAQASAAAHAPQAKgPATAAQAQABAIAIQAHAJAAARIAAA9g");
	this.shape_63.setTransform(171.025,7.05);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_64.setTransform(133,5.35);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABCIgVAAIAAhdIAUAAIAAALQALgOAQAAQAeABABAhIAAA+g");
	this.shape_65.setTransform(125.7,7.05);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgEQAAgFADgEQADgCAFAAQAGAAADACQADAEAAAFQAAAEgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_66.setTransform(118.4,5.35);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgLAAgHAMIAABCIgVAAIAAhdIAUAAIABALQAKgOAQAAQAeABAAAhIAAA+g");
	this.shape_67.setTransform(83.2,7.05);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKgBQARAAAKAJQAKAJAAAPIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgHQgLALgNAAQgPABgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_68.setTransform(73.325,7.15);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2C3E50").s().p("AAUAvIgUhAIgTBAIgSAAIgahdIAVAAIAPBAIAUhAIAPAAIAUBAIAPhAIAVAAIgaBdg");
	this.shape_69.setTransform(61.725,7.15);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALAAQAUAAAKANQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUAAgMgMgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_70.setTransform(50.325,7.15);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2C3E50").s().p("AAdBAIAAg5Ig5AAIAAA5IgWAAIAAh/IAWAAIAAA1IA5AAIAAg1IAWAAIAAB/g");
	this.shape_71.setTransform(38.975,5.5);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.019,0,0,1.873,-126.8,-81.7)).s().p("Az0MvIAA5dMAnpAAAIAAZdg");
	this.shape_72.setTransform(132.7,51.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("rgba(0,0,0,0.227)").s().p("AxpIAIAAv/MAjTAAAIAAP/g");
	this.shape_73.setTransform(116.875,58.55);

	this.timeline.addTween(cjs.Tween.get(this.shape_73).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop13G5, new cjs.Rectangle(3.9,-29.5,255.70000000000002,162.9), null);


(lib.drop13G4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgTAtQgJgEgGgHQgEgIAAgJIAVAAQAAAIAFAEQAFAEAIABQAJgBAEgDQAEgDAAgFQAAgGgFgDQgEgDgKgCQgLgDgHgDQgQgHAAgOQAAgNAKgIQAKgJAQABQAQgBALAJQAKAJAAANIgVAAQAAgGgFgEQgEgFgHAAQgGAAgFAEQgEADgBAGQAAAEAFADQAEADAMADQAMADAHADQAIADADAGQAEAFgBAHQAAANgLAJQgKAHgRABQgLAAgJgFg");
	this.shape.setTransform(177.25,55.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgMIAAhCIAVAAIAABdIgUAAIAAgJQgKAMgQAAQgPAAgIgKg");
	this.shape_1.setTransform(167.625,55.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABCIgVAAIAAhdIAUAAIAAAKQALgMAQAAQAeAAABAhIAAA+g");
	this.shape_2.setTransform(157.65,55.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgFQgEgEgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAAqQAAANAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_3.setTransform(147.775,55.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABCIgWAAIAAhdIAVAAIABAKQAKgMAQAAQAeAAAAAhIAAA+g");
	this.shape_4.setTransform(133.4,55.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgFQgEgEgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAAqQAAANAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_5.setTransform(123.525,55.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgeA3QgLgOAAgXQAAgUAKgOQALgNARAAQAOAAAJAKIAAgxIAWAAIAACGIgUAAIgBgKQgJANgPAAQgRAAgKgOgAgOgDQgFAHAAAQQAAAPAFAIQAGAIAJAAQANAAAGgMIAAgnQgGgMgNAAQgJAAgGAJg");
	this.shape_6.setTransform(113.375,53.6);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgFQgEgEgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAAqQAAANAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_7.setTransform(99.125,55.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_8.setTransform(91.95,53.7);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAVAAIAAAKQAHgMAOAAQAEAAADABIAAAUIgJgBQgPAAgDALIAABAg");
	this.shape_9.setTransform(86.9,55.4);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgFQgEgEgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAAqQAAANAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_10.setTransform(78.425,55.5);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgKBDIAAiGIAUAAIAACGg");
	this.shape_11.setTransform(71.25,53.5);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgVIAAgCQAAgNAGgMQAFgLAKgGQAKgHALABQAUAAAKAMQALAMAAAXIAAAIIg9AAQABALAGAHQAHAHAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_12.setTransform(64.225,55.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgTAtQgJgEgGgHQgEgIAAgJIAUAAQABAIAFAEQAGAEAHABQAIgBAFgDQAEgDAAgFQAAgGgEgDQgFgDgKgCQgLgDgHgDQgQgHAAgOQAAgNAKgIQALgJAOABQARgBALAJQALAJgBANIgVAAQAAgGgEgEQgFgFgIAAQgFAAgFAEQgFADAAAGQABAEAEADQAEADAMADQAMADAHADQAHADAEAGQAEAFAAAHQAAANgMAJQgKAHgRABQgLAAgJgFg");
	this.shape_13.setTransform(54.6,55.5);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_14.setTransform(47.7,53.7);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgeA3QgLgOAAgXQAAgUAKgOQALgNARAAQAOAAAJAKIAAgxIAWAAIAACGIgUAAIgBgKQgJANgPAAQgRAAgKgOgAgOgDQgFAHAAAQQAAAPAFAIQAGAIAJAAQANAAAGgMIAAgnQgGgMgNAAQgJAAgGAJg");
	this.shape_15.setTransform(40.125,53.6);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgVIAAgCQAAgNAGgMQAFgLAKgGQAKgHALABQAUAAAKAMQALAMAAAXIAAAIIg9AAQABALAGAHQAHAHAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_16.setTransform(30.525,55.5);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgoBDIAAiDIATAAIABAKQAJgMAPAAQASAAAKANQAJANAAAXIAAACQABAVgKANQgLANgQAAQgPAAgJgKIAAAtgAgTglIAAApQAFALANAAQAKAAAFgIQAHgHAAgRQgBgOgFgJQgGgIgKAAQgNAAgFALg");
	this.shape_17.setTransform(20.7,57.225);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgKBBIAAheIAVAAIAABegAgIgtQgDgDAAgFQAAgFADgDQADgDAFgBQAGABADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_18.setTransform(255.7,28.1);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AARBDIgbgpIgJALIAAAeIgWAAIAAiGIAWAAIAABOIAGgJIAagdIAZAAIgjAnIAnA3g");
	this.shape_19.setTransform(249.275,27.9);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgJBBIAAheIATAAIAABegAgIgtQgDgDAAgFQAAgFADgDQADgDAFgBQAGABADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_20.setTransform(241.7,28.1);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgJBDIAAiGIATAAIAACGg");
	this.shape_21.setTransform(237.1,27.9);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgJBBIAAheIAUAAIAABegAgIgtQgDgDAAgFQAAgFADgDQADgDAFgBQAGABADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_22.setTransform(232.5,28.1);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgJgEgDQgEgFgJAAQgHAAgFAEQgFAEgBAHIAAA/IgVAAIAAg9QAAgRgRAAQgNAAgFAKIAABEIgVAAIAAheIAUAAIAAALQAKgMASgBQASAAAHAPQAKgPATAAQAQABAIAIQAHAJAAARIAAA9g");
	this.shape_23.setTransform(222.375,29.8);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgWIAAgCQAAgNAGgLQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABAMAGAIQAHAGAKAAQAOAAAKgLIALAKQgFAJgKAFQgKAEgLAAQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_24.setTransform(209.825,29.9);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgJgEgDQgEgFgJAAQgHAAgFAEQgFAEgBAHIAAA/IgVAAIAAg9QAAgRgRAAQgNAAgFAKIAABEIgVAAIAAheIAUAAIAAALQAKgMASgBQASAAAHAPQAKgPATAAQAQABAIAIQAHAJAAARIAAA9g");
	this.shape_25.setTransform(197.075,29.8);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AARBDIgbgpIgJALIAAAeIgWAAIAAiGIAWAAIAABOIAGgJIAagdIAZAAIgjAnIAnA3g");
	this.shape_26.setTransform(165.425,27.9);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgHQAMgHAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_27.setTransform(155.275,29.9);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgUAKgOQALgOARAAQAOAAAJALIAAgxIAWAAIAACGIgUAAIgBgJQgJAMgPgBQgRAAgKgNgAgOgEQgFAIAAAQQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAIg");
	this.shape_28.setTransform(145.125,28);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgKBBIAAheIAUAAIAABegAgIgtQgDgDAAgFQAAgFADgDQADgDAFgBQAGABADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_29.setTransform(137.95,28.1);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgKAhIAAg1IgQAAIAAgQIAQAAIAAgXIAUAAIAAAXIARAAIAAAQIgRAAIAAA0QAAAGACABQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgbg");
	this.shape_30.setTransform(132.425,28.85);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgKBBIAAheIAVAAIAABegAgIgtQgDgDAAgFQAAgFADgDQADgDAFgBQAGABADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_31.setTransform(107.65,28.1);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABCIgWAAIAAheIAVAAIAAAMQALgNAQgBQAeAAABAjIAAA9g");
	this.shape_32.setTransform(100.35,29.8);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgKBBIAAheIAVAAIAABegAgIgtQgDgDAAgFQAAgFADgDQADgDAFgBQAGABADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_33.setTransform(93.05,28.1);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABCIgWAAIAAheIAVAAIAAAMQALgNAQgBQAeAAABAjIAAA9g");
	this.shape_34.setTransform(66.05,29.8);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgHQAMgHAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_35.setTransform(56.175,29.9);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AAUAvIgUhAIgTBAIgSAAIgaheIAVAAIAPBBIAUhBIAPAAIAUBBIAPhBIAVAAIgaBeg");
	this.shape_36.setTransform(44.575,29.9);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgWIAAgCQAAgNAGgLQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABAMAGAIQAHAGAKAAQAOAAAKgLIALAKQgFAJgKAFQgKAEgLAAQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_37.setTransform(33.175,29.9);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AAdBAIAAg5Ig5AAIAAA5IgWAAIAAh/IAWAAIAAA1IA5AAIAAg1IAWAAIAAB/g");
	this.shape_38.setTransform(21.825,28.25);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.165,0,0,1.218,-145,-53)).s().p("A2qISIAAwjMAtVAAAIAAQjg");
	this.shape_39.setTransform(139.75,46.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("rgba(0,0,0,0.227)").s().p("A0MFNIAAqZMAoZAAAIAAKZg");
	this.shape_40.setTransform(123.275,55.65);

	this.timeline.addTween(cjs.Tween.get(this.shape_40).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop13G4, new cjs.Rectangle(-6,-6.7,290.9,106), null);


(lib.drop13G3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape.setTransform(228.05,72.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgTAtQgJgEgFgHQgGgIAAgJIAWAAQAAAIAFAEQAGAEAHABQAIgBAFgDQAEgDAAgGQAAgFgFgDQgEgDgKgCQgLgCgHgEQgQgHAAgOQAAgNAKgIQAKgJAQABQAQgBALAJQALAJAAANIgWAAQAAgGgEgEQgFgFgHAAQgHAAgEAEQgEADAAAGQAAAFADACQAFADALADQANADAHAEQAHACAEAGQADAFAAAHQABANgLAJQgLAHgRABQgLAAgJgFg");
	this.shape_1.setTransform(221.05,74.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKAAQARgBAKAJQAKAJAAAOIAAArQAAAMAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_2.setTransform(211.575,74.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAUAAIABAKQAGgMAPAAQAEAAADABIgBAUIgIgBQgOAAgFALIAABAg");
	this.shape_3.setTransform(203.95,74.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_4.setTransform(198.05,72.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgpBDIAAiDIAUAAIABAKQAJgMAQAAQARAAAKANQAKANAAAXIAAACQgBAVgJANQgLANgQAAQgPAAgJgKIAAAtgAgTglIAAApQAGALANAAQAJAAAGgIQAFgHAAgRQABgOgGgJQgGgIgJAAQgNAAgGALg");
	this.shape_5.setTransform(190.85,76.025);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgTAtQgJgEgFgHQgGgIAAgJIAVAAQABAIAFAEQAFAEAIABQAIgBAFgDQAEgDAAgGQAAgFgEgDQgFgDgKgCQgLgCgHgEQgQgHAAgOQAAgNAKgIQAKgJAQABQAQgBALAJQALAJAAANIgWAAQAAgGgEgEQgFgFgHAAQgHAAgEAEQgFADABAGQAAAFADACQAFADALADQANADAHAEQAHACAEAGQADAFABAHQgBANgKAJQgLAHgRABQgLAAgJgFg");
	this.shape_6.setTransform(180.9,74.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALABQAUAAAKAMQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALAMQgFAIgKAFQgKAEgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_7.setTransform(171.575,74.3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAUAAIABAKQAHgMAOAAQAEAAADABIgBAUIgIgBQgOAAgFALIAABAg");
	this.shape_8.setTransform(163.9,74.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgTAtQgJgEgFgHQgGgIAAgJIAVAAQABAIAFAEQAFAEAIABQAJgBAEgDQAEgDAAgGQAAgFgEgDQgFgDgKgCQgLgCgHgEQgQgHAAgOQAAgNAKgIQALgJAOABQASgBAKAJQALAJAAANIgWAAQAAgGgEgEQgFgFgIAAQgFAAgFAEQgFADABAGQAAAFADACQAFADALADQANADAHAEQAHACAEAGQADAFABAHQgBANgKAJQgLAHgRABQgLAAgJgFg");
	this.shape_9.setTransform(151.1,74.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALABQAUAAAKAMQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALAMQgFAIgKAFQgKAEgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_10.setTransform(141.775,74.3);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgTAtQgJgEgGgHQgEgIgBgJIAWAAQAAAIAFAEQAGAEAHABQAJgBAEgDQAEgDAAgGQAAgFgFgDQgEgDgKgCQgLgCgHgEQgQgHAAgOQAAgNAKgIQALgJAPABQARgBAKAJQAKAJAAANIgVAAQAAgGgFgEQgEgFgHAAQgHAAgEAEQgEADgBAGQAAAFAFACQAEADALADQANADAHAEQAIACADAGQAEAFgBAHQABANgLAJQgLAHgRABQgLAAgJgFg");
	this.shape_11.setTransform(132.15,74.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgfAkQgMgOAAgWIAAAAQAAgOAFgLQAGgLAKgHQAKgFAMAAQATAAAMAMQAMANABAUIAAAEQAAAOgFALQgGALgKAGQgKAHgNAAQgTAAgMgOgAgQgXQgGAIAAAQQAAAPAGAIQAGAIAKAAQALAAAGgIQAGgIAAgQQAAgOgGgJQgHgIgKAAQgKAAgGAIg");
	this.shape_12.setTransform(122.475,74.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAUAAIABAKQAGgMAPAAQAEAAADABIAAAUIgJgBQgOAAgFALIAABAg");
	this.shape_13.setTransform(114.6,74.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgoBDIAAiDIATAAIABAKQAJgMAQAAQARAAAKANQAJANABAXIAAACQAAAVgKANQgKANgRAAQgPAAgJgKIAAAtgAgTglIAAApQAFALANAAQAKAAAFgIQAGgHABgRQAAgOgGgJQgGgIgKAAQgNAAgFALg");
	this.shape_14.setTransform(106.1,76.025);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgMIAAhCIAVAAIAABdIgUAAIAAgJQgKAMgQAAQgPAAgIgKg");
	this.shape_15.setTransform(91.325,74.4);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgKAhIAAg2IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAGACACQACACAGAAIAHgBIAAARQgHACgHAAQgXAAAAgbg");
	this.shape_16.setTransform(83.125,73.25);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABCIgWAAIAAhdIAVAAIABALQAKgNAQAAQAeAAAAAhIAAA+g");
	this.shape_17.setTransform(75.35,74.2);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKAAQARgBAKAJQAKAJAAAOIAAArQAAAMAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_18.setTransform(65.475,74.3);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgUA4IgCAKIgTAAIAAiGIAWAAIAAAyQAJgLAOAAQASAAAKANQAKAMAAAWIAAACQAAAWgKANQgKAOgRAAQgQAAgJgNgAgTAAIAAAmQAFANAOAAQAJAAAGgHQAFgIAAgPIAAgDQAAgQgFgGQgGgIgJAAQgOAAgFAMg");
	this.shape_19.setTransform(55.725,72.4);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgMASAAQASAAAHAOQAKgOATAAQAQAAAIAJQAHAIAAARIAAA9g");
	this.shape_20.setTransform(42.625,74.2);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALABQAUAAAKAMQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALAMQgFAIgKAFQgKAEgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_21.setTransform(30.075,74.3);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AAuAwIAAg9QAAgIgEgFQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgMASAAQASAAAHAOQAKgOATAAQAQAAAIAJQAHAIAAARIAAA9g");
	this.shape_22.setTransform(17.325,74.2);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABDIgVAAIAAhfIAUAAIAAAMQALgNAQgBQAeAAABAjIAAA+g");
	this.shape_23.setTransform(248.1,48.6);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_24.setTransform(238.225,48.7);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgVAKgNQALgOARAAQAOAAAJALIAAgwIAWAAIAACGIgUAAIgBgKQgJAMgPgBQgRAAgKgNgAgOgEQgFAIAAAQQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAIg");
	this.shape_25.setTransform(228.075,46.8);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAUAAIABALQAGgNAPAAQAEABADABIgBAUIgIgBQgOAAgFAMIAABAg");
	this.shape_26.setTransform(198.65,48.6);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgfAkQgMgNAAgXIAAAAQAAgOAFgLQAGgMAKgFQAKgHAMAAQATAAAMANQAMAMABAVIAAAEQAAAOgFALQgGALgKAGQgKAGgNAAQgTAAgMgNgAgQgXQgGAJAAAPQAAAOAGAJQAGAIAKAAQALAAAGgIQAGgJAAgPQAAgOgGgJQgHgIgKAAQgKAAgGAIg");
	this.shape_27.setTransform(189.975,48.7);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgTAtQgJgEgGgIQgEgHAAgIIAUAAQABAHAFAEQAGAFAHgBQAIABAFgEQAEgDAAgGQAAgFgEgDQgFgDgKgDQgLgBgHgEQgQgHAAgPQAAgMAKgIQALgJAOAAQARAAALAJQALAIgBAOIgVAAQAAgGgEgEQgFgEgIAAQgFAAgFADQgFADAAAFQABAFAEADQAEADAMADQAMACAHAEQAHADAEAFQAEAGAAAIQAAANgMAHQgKAJgRgBQgLAAgJgEg");
	this.shape_28.setTransform(180.15,48.7);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABDIgWAAIAAhfIAVAAIAAAMQALgNAQgBQAeAAABAjIAAA+g");
	this.shape_29.setTransform(170.55,48.6);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgNAGgLQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALAKQgFAJgKAFQgKAEgLAAQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_30.setTransform(160.825,48.7);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgTAtQgJgEgFgIQgGgHAAgIIAVAAQABAHAFAEQAFAFAIgBQAIABAFgEQAEgDAAgGQAAgFgEgDQgFgDgKgDQgLgBgHgEQgQgHAAgPQAAgMAKgIQAKgJAQAAQAQAAALAJQALAIAAAOIgWAAQAAgGgEgEQgFgEgHAAQgHAAgEADQgFADABAFQAAAFADADQAFADALADQANACAHAEQAHADAEAFQADAGABAIQgBANgKAHQgLAJgRgBQgLAAgJgEg");
	this.shape_31.setTransform(151.2,48.7);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgKAhIAAg1IgQAAIAAgQIAQAAIAAgXIAUAAIAAAXIARAAIAAAQIgRAAIAAA0QAAAFACACQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgbg");
	this.shape_32.setTransform(121.575,47.65);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_33.setTransform(113.925,48.7);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgKBEIAAiGIAVAAIAACGg");
	this.shape_34.setTransform(106.75,46.7);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_35.setTransform(99.575,48.7);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgDAAgFQAAgFADgDQADgEAFAAQAGAAADAEQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_36.setTransform(70.6,46.9);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_37.setTransform(63.425,48.7);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgUA/QgLgFgFgHIAKgMQAKALAPAAQAJAAAHgFQAFgGAAgLIAAgHQgIALgPAAQgQAAgLgOQgLgNAAgXQAAgWALgNQAKgNASAAQAOAAAKALIABgJIATAAIAABbQAAATgLAKQgMALgTAAQgKAAgKgEgAgNgoQgHAIABAQQgBAPAHAHQAFAIAJAAQANAAAGgLIAAgpQgGgLgNAAQgJAAgFAJg");
	this.shape_38.setTransform(53.25,50.475);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_39.setTransform(43.475,48.7);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgUA4IgCALIgTAAIAAiGIAWAAIAAAwQAJgKAOgBQASABAKANQAKANAAAWIAAABQAAAWgKANQgKANgRAAQgQAAgJgMgAgTAAIAAAnQAFAMAOAAQAJAAAGgIQAFgHAAgPIAAgDQAAgPgFgHQgGgIgJAAQgOAAgFAMg");
	this.shape_40.setTransform(33.725,46.8);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgNAGgLQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALAKQgFAJgKAFQgKAEgLAAQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_41.setTransform(23.725,48.7);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgTAtQgJgEgGgIQgEgHAAgIIAUAAQABAHAFAEQAGAFAHgBQAIABAFgEQAEgDAAgGQAAgFgEgDQgFgDgKgDQgLgBgHgEQgQgHAAgPQAAgMAKgIQALgJAOAAQARAAALAJQALAIgBAOIgVAAQAAgGgEgEQgFgEgIAAQgFAAgFADQgFADAAAFQABAFAEADQAEADAMADQAMACAHAEQAHADAEAFQAEAGAAAIQAAANgMAHQgKAJgRgBQgLAAgJgEg");
	this.shape_42.setTransform(14.1,48.7);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAVAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_43.setTransform(250.75,21.3);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgpBDIAAiDIAUAAIABAKQAJgMAPAAQASAAAKANQAJANAAAXIAAACQABAVgLANQgKANgQAAQgPAAgJgKIAAAtgAgTglIAAApQAFALANAAQAKAAAFgIQAHgHAAgRQgBgOgFgJQgGgIgKAAQgNAAgFALg");
	this.shape_44.setTransform(243.55,24.825);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAAqQAAANAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_45.setTransform(233.425,23.1);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAGACACQACACAGAAIAHgBIAAARQgHACgHAAQgXAAAAgcg");
	this.shape_46.setTransform(225.325,22.05);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AgNASQAFgIACgGQACgFAAgGIAAgRIASAAIAAAPQAAAJgFAJQgEAKgGAGg");
	this.shape_47.setTransform(213.9,28.275);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAJIAAAfIgWAAIAAiGIAWAAIAABNIAGgIIAagcIAZAAIgjAmIAnA3g");
	this.shape_48.setTransform(208.125,21.1);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAAqQAAANAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_49.setTransform(197.975,23.1);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAUAAIABAKQAGgMAOAAQAFAAADABIgBAUIgIgBQgPAAgEALIAABAg");
	this.shape_50.setTransform(190.35,23);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgVIAAgCQAAgNAGgMQAFgLAKgGQAKgHALABQAUAAAKAMQALAMAAAXIAAAIIg9AAQABALAGAHQAHAHAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_51.setTransform(182.025,23.1);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AgVA/QgJgFgGgHIAKgMQALALAOAAQAJAAAGgFQAGgGABgLIAAgHQgJALgPAAQgRAAgKgOQgLgNAAgXQAAgWALgNQAKgNARAAQAQAAAJALIABgJIATAAIAABbQAAATgLAKQgMALgTAAQgKAAgLgEgAgNgoQgHAIAAAQQAAAPAHAHQAFAIAKAAQAMAAAHgLIAAgpQgHgLgMAAQgKAAgFAJg");
	this.shape_52.setTransform(171.8,24.875);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAGACACQACACAGAAIAHgBIAAARQgHACgHAAQgXAAAAgcg");
	this.shape_53.setTransform(157.325,22.05);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAAqQAAANAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_54.setTransform(149.675,23.1);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgJBDIAAiGIAUAAIAACGg");
	this.shape_55.setTransform(142.5,21.1);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAAqQAAANAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_56.setTransform(135.325,23.1);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_57.setTransform(121.8,21.3);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAAqQAAANAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_58.setTransform(114.625,23.1);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgUA/QgLgFgFgHIAKgMQALALAOAAQAJAAAHgFQAFgGAAgLIAAgHQgIALgPAAQgQAAgLgOQgLgNAAgXQAAgWALgNQAKgNASAAQAOAAAKALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgJgEgAgOgoQgFAIAAAQQAAAPAFAHQAGAIAJAAQAOAAAFgLIAAgpQgFgLgOAAQgJAAgGAJg");
	this.shape_59.setTransform(104.45,24.875);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAAqQAAANAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_60.setTransform(94.675,23.1);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgUA4IgCAKIgTAAIAAiGIAWAAIAAAyQAJgLAOAAQASAAAKAMQAKANAAAWIAAACQAAAWgKANQgKAOgRAAQgQAAgJgNgAgTAAIAAAmQAFANAOAAQAJAAAGgHQAFgIAAgPIAAgDQAAgQgFgGQgGgIgJAAQgOAAgFAMg");
	this.shape_61.setTransform(84.925,21.2);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgVIAAgCQAAgNAGgMQAFgLAKgGQAKgHALABQAUAAAKAMQALAMAAAXIAAAIIg9AAQABALAGAHQAHAHAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_62.setTransform(74.925,23.1);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AgTAtQgJgEgGgHQgEgIAAgJIAVAAQAAAIAFAEQAGAEAHABQAIgBAFgDQAEgDAAgFQAAgGgEgDQgFgDgKgCQgLgDgHgDQgQgHAAgOQAAgNAKgIQAKgJAPABQARgBALAJQAKAJAAANIgVAAQAAgGgFgEQgEgFgIAAQgFAAgFAEQgFADAAAGQAAAEAFADQAEADAMADQAMADAHADQAHADAEAGQADAFAAAHQAAANgLAJQgKAHgRABQgLAAgJgFg");
	this.shape_63.setTransform(65.3,23.1);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAJIAAAfIgWAAIAAiGIAWAAIAABNIAGgIIAagcIAZAAIgjAmIAnA3g");
	this.shape_64.setTransform(50.225,21.1);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUAAIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAAqQAAANAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_65.setTransform(40.075,23.1);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AgeA3QgLgOAAgXQAAgUAKgOQALgNARAAQAOAAAJAKIAAgxIAWAAIAACGIgUAAIgBgKQgJANgPAAQgRAAgKgOgAgOgDQgFAHAAAQQAAAPAFAIQAGAIAJAAQANAAAGgMIAAgnQgGgMgNAAQgJAAgGAJg");
	this.shape_66.setTransform(29.925,21.2);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_67.setTransform(22.75,21.3);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AgKBAIAAhtIgoAAIAAgSIBlAAIAAASIgoAAIAABtg");
	this.shape_68.setTransform(14.975,21.45);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.258,0,0,2.124,-156.6,-92.6)).s().p("A4eOcIAA83MAw8AAAIAAc3g");
	this.shape_69.setTransform(133.1,52.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("rgba(0,0,0,0.227)").s().p("A1wJoIAAzPMArgAAAIAATPg");
	this.shape_70.setTransform(116.75,59.4);

	this.timeline.addTween(cjs.Tween.get(this.shape_70).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop13G3, new cjs.Rectangle(-23.5,-39.8,313.3,184.8), null);


(lib.drop13G2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape.setTransform(188.275,74.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgWAuIAAhZIATAAIAAAKQAGgMANAAIAHABIAAATIgIAAQgOAAgEAKIAAA9g");
	this.shape_1.setTransform(183.5,75.975);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_2.setTransform(175.375,76.125);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgcA0QgKgMAAgXQAAgTAJgNQAKgNAQAAQAOABAIAJIAAguIAUAAIAAB/IgSAAIgBgKQgJAMgOAAQgQAAgJgNgAgNgDQgFAGAAAQQAAAOAFAHQAGAIAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_3.setTransform(165.625,74.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgXAuIAAhZIAUAAIAAAKQAHgMANAAIAHABIAAATIgJAAQgOAAgDAKIAAA9g");
	this.shape_4.setTransform(158.45,75.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgaAiQgNgMAAgTIAAgDQABgMAEgLQAGgKAJgHQAKgFAKgBQASAAAKAMQALAMgBAVIAAAHIg5AAQABALAGAHQAHAGAIABQAPgBAIgKIALAKQgGAIgJAEQgIAFgMAAQgSAAgLgNgAgMgXQgFAFgBALIAmAAIAAgCQgBgKgFgFQgEgFgJgBQgHAAgGAHg");
	this.shape_5.setTransform(150.6,76.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgTA1IgBAKIgSAAIAAh/IAUAAIAAAvQAIgLAOAAQARAAAJANQAJAMAAAVIAAABQAAAVgJAMQgJANgRAAQgOAAgJgMgAgSAAIAAAlQAFALANAAQAJAAAFgHQAFgHAAgOIAAgDQAAgOgFgHQgFgHgJAAQgNAAgFALg");
	this.shape_6.setTransform(141.375,74.25);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AAQBAIgZgnIgJAJIAAAeIgUAAIAAh/IAUAAIAABJIAGgIIAXgbIAZAAIgiAkIAlA1g");
	this.shape_7.setTransform(128.3,74.175);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgdAnQgJgIAAgLQAAgPALgGQALgIATAAIAMAAIAAgGQAAgHgEgEQgEgEgHAAQgHAAgEADQgFAEABAFIgVAAQABgIAFgFQAEgHAIgEQAJgEAJAAQAQABAJAHQAKAJAAAOIAAAnQAAANAEAGIAAACIgVAAIgDgIQgJAJgNABQgOAAgIgIgAgMAGQgFAFgBAHQAAAFAFAEQAEADAGABQAFAAAFgDQAFgDADgFIAAgRIgLAAQgKAAgGADg");
	this.shape_8.setTransform(118.7,76.05);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgWIATAAIAAAWIAQAAIAAAPIgQAAIAAAyQAAAEACADQACACAGAAIAHgBIAAAQIgOACQgWAAAAgag");
	this.shape_9.setTransform(111.075,75.05);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_10.setTransform(102.025,74.175);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgdAnQgJgIABgLQgBgPALgGQALgIASAAIANAAIAAgGQAAgHgEgEQgEgEgHAAQgHAAgEADQgEAEgBAFIgTAAQAAgIAEgFQAFgHAJgEQAIgEAKAAQAPABAKAHQAJAJAAAOIAAAnQAAANADAGIAAACIgUAAIgCgIQgKAJgNABQgNAAgJgIgAgMAGQgFAFAAAHQAAAFADAEQAFADAGABQAFAAAFgDQAGgDACgFIAAgRIgLAAQgKAAgGADg");
	this.shape_11.setTransform(95.25,76.05);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgXAuIAAhZIATAAIABAKQAGgMAOAAIAGABIAAATIgIAAQgNAAgFAKIAAA9g");
	this.shape_12.setTransform(88.05,75.975);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgWIATAAIAAAWIAQAAIAAAPIgQAAIAAAyQAAAEACADQACACAGAAIAHgBIAAAQIgOACQgWAAAAgag");
	this.shape_13.setTransform(81.625,75.05);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_14.setTransform(74.275,75.975);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgaAiQgNgMAAgTIAAgDQABgMAEgLQAGgKAJgHQAKgFAKgBQASAAAKAMQALAMgBAVIAAAHIg5AAQABALAGAHQAHAGAIABQAPgBAIgKIALAKQgGAIgJAEQgIAFgMAAQgSAAgLgNgAgMgXQgFAFgBALIAlAAIAAgCQAAgKgFgFQgEgFgJgBQgHAAgGAHg");
	this.shape_15.setTransform(65.1,76.05);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgIAtIgfhZIAUAAIATBAIAThAIAVAAIggBZg");
	this.shape_16.setTransform(56.25,76.05);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_17.setTransform(43.075,75.975);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgdAnQgJgIAAgLQAAgPALgGQALgIATAAIAMAAIAAgGQAAgHgEgEQgEgEgHAAQgHAAgEADQgFAEABAFIgVAAQABgIAFgFQAEgHAIgEQAJgEAKAAQAPABAJAHQAKAJAAAOIAAAnQAAANAEAGIAAACIgVAAIgDgIQgJAJgNABQgOAAgIgIgAgMAGQgFAFgBAHQABAFAEAEQADADAHABQAFAAAFgDQAFgDADgFIAAgRIgLAAQgKAAgGADg");
	this.shape_18.setTransform(33.75,76.05);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgcA0QgKgMAAgXQAAgTAJgNQAKgNAQAAQAOABAIAJIAAguIAUAAIAAB/IgSAAIgBgKQgJAMgOAAQgQAAgJgNgAgNgDQgFAGAAAQQAAAOAFAHQAGAIAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_19.setTransform(24.125,74.25);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_20.setTransform(242.375,49.775);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgdAnQgIgIAAgLQAAgPAKgGQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFADQgFAEAAAFIgUAAQAAgIAGgFQAEgHAIgEQAJgDAJgBQAQABAJAHQAKAJAAAOIAAAnQAAAMAEAHIAAACIgVAAIgDgJQgJALgNAAQgNAAgJgIgAgLAGQgHAEAAAIQAAAGAFADQAEADAGABQAFAAAFgEQAFgDADgEIAAgRIgLAAQgKAAgFADg");
	this.shape_21.setTransform(235.6,51.65);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgSAqQgIgEgFgGQgFgIAAgIIAUAAQAAAIAFADQAFAFAHAAQAIAAAEgDQAEgEAAgEQAAgGgEgCQgEgDgKgDQgKgCgHgDQgPgGAAgOQAAgMAKgIQAKgHAOgBQAQABAKAHQAKAJAAAMIgVAAQAAgGgEgEQgEgDgHAAQgGAAgEACQgEAEAAAFQAAAEAEADQADADALADQAMACAHADQAHADADAFQADAFAAAIQAAALgKAIQgKAIgQAAQgKgBgJgEg");
	this.shape_22.setTransform(226.575,51.65);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgXAuIAAhZIAUAAIAAAKQAHgMANAAIAHABIAAATIgJAAQgOAAgDAKIAAA9g");
	this.shape_23.setTransform(219.65,51.575);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgdAiQgMgMAAgWIAAAAQAAgNAGgKQAFgLAJgFQAKgHALAAQASAAAMAMQALAMABATIAAAEQAAANgFAKQgFALgKAGQgJAGgNAAQgSAAgLgNgAgPgVQgGAHAAAPQAAAOAGAIQAGAIAJAAQAKgBAGgHQAGgJAAgOQAAgOgGgHQgGgJgKAAQgJAAgGAJg");
	this.shape_24.setTransform(211.375,51.65);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgcA0QgKgMAAgXQAAgTAJgNQAKgNAQAAQAOABAIAJIAAguIAUAAIAAB/IgSAAIgBgKQgJAMgOAAQgQAAgJgNgAgNgDQgFAHAAAPQAAAOAFAIQAGAHAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_25.setTransform(201.525,49.85);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_26.setTransform(182.625,51.575);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgdAnQgIgIAAgLQAAgPAKgGQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFADQgEAEgBAFIgUAAQAAgIAGgFQAEgHAIgEQAJgDAJgBQAQABAKAHQAJAJAAAOIAAAnQAAAMADAHIAAACIgUAAIgCgJQgKALgNAAQgNAAgJgIgAgLAGQgHAEAAAIQAAAGAEADQAFADAGABQAFAAAFgEQAGgDACgEIAAgRIgLAAQgKAAgFADg");
	this.shape_27.setTransform(173.3,51.65);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgEAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDAEQgDACgFAAQgEAAgDgCg");
	this.shape_28.setTransform(166.525,49.95);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgTA8QgKgFgFgGIAKgNQAJAMAOAAQAJAAAGgGQAFgGAAgKIAAgGQgIAKgOAAQgPAAgKgNQgKgMAAgWQAAgUAJgNQAKgNAQAAQAPAAAIALIABgJIASAAIAABWQAAASgLAKQgLAKgRAAQgKAAgJgDgAgNgmQgFAIAAAPQAAANAFAIQAFAHAJAAQANAAAFgKIAAgnQgFgKgNAAQgJAAgFAIg");
	this.shape_29.setTransform(159.35,53.35);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgdAnQgIgIAAgLQAAgPAKgGQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFADQgFAEAAAFIgUAAQAAgIAGgFQAEgHAIgEQAJgDAJgBQAQABAJAHQAKAJAAAOIAAAnQAAAMAEAHIAAACIgVAAIgDgJQgJALgNAAQgNAAgJgIgAgLAGQgHAEAAAIQAAAGAFADQAEADAGABQAFAAAFgEQAFgDADgEIAAgRIgLAAQgKAAgFADg");
	this.shape_30.setTransform(150.1,51.65);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgTA1IgBAKIgSAAIAAh/IAUAAIAAAvQAIgLAOAAQARABAJAMQAJAMAAAVIAAABQAAAVgJAMQgJANgRAAQgOAAgJgMgAgSAAIAAAkQAFAMANAAQAJAAAFgHQAFgHAAgOIAAgDQAAgPgFgFQgFgIgJAAQgNAAgFALg");
	this.shape_31.setTransform(140.925,49.85);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgEAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDAEQgDACgFAAQgEAAgDgCg");
	this.shape_32.setTransform(124.175,49.95);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgcA0QgKgMAAgXQAAgTAJgNQAKgNAQAAQAOABAIAJIAAguIAUAAIAAB/IgSAAIgBgKQgJAMgOAAQgQAAgJgNgAgNgDQgFAHAAAPQAAAOAFAIQAGAHAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_33.setTransform(116.975,49.85);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_34.setTransform(98.075,51.575);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgdAnQgJgIAAgLQAAgPALgGQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFADQgFAEABAFIgUAAQAAgIAEgFQAFgHAJgEQAIgDAKgBQAPABAJAHQAKAJAAAOIAAAnQAAAMAEAHIAAACIgVAAIgDgJQgJALgNAAQgOAAgIgIgAgMAGQgFAEAAAIQAAAGADADQAEADAHABQAFAAAFgEQAGgDACgEIAAgRIgLAAQgKAAgGADg");
	this.shape_35.setTransform(88.75,51.65);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AAQBAIgZgnIgJAJIAAAeIgVAAIAAh/IAVAAIAABJIAGgIIAXgbIAZAAIgiAkIAlA1g");
	this.shape_36.setTransform(80.3,49.775);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgUA8QgJgFgFgGIAKgNQAJAMANAAQAKAAAFgGQAHgGAAgKIAAgGQgKAKgNAAQgPAAgLgNQgJgMgBgWQAAgUAKgNQAKgNAQAAQAOAAAKALIAAgJIATAAIAABWQAAASgLAKQgMAKgRAAQgKAAgKgDgAgNgmQgGAIAAAPQAAANAGAIQAGAHAIAAQAMAAAHgKIAAgnQgHgKgLAAQgKAAgFAIg");
	this.shape_37.setTransform(70.3,53.35);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_38.setTransform(60.925,51.575);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgdAnQgJgIABgLQgBgPALgGQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEADQgEAEAAAFIgUAAQAAgIAEgFQAFgHAJgEQAIgDAKgBQAPABAKAHQAJAJAAAOIAAAnQAAAMADAHIAAACIgUAAIgCgJQgKALgNAAQgNAAgJgIgAgMAGQgFAEAAAIQAAAGADADQAFADAGABQAFAAAFgEQAGgDACgEIAAgRIgLAAQgKAAgGADg");
	this.shape_39.setTransform(51.6,51.65);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgcA0QgKgMAAgXQAAgTAJgNQAKgNAQAAQAOABAIAJIAAguIAUAAIAAB/IgSAAIgBgKQgJAMgOAAQgQAAgJgNgAgNgDQgFAHAAAPQAAAOAFAIQAGAHAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_40.setTransform(41.975,49.85);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgaAiQgMgMgBgTIAAgDQAAgMAGgLQAFgLAJgFQAKgHAKAAQATAAAKAMQAKAMgBAVIAAAHIg6AAQACALAGAHQAGAGAJABQAOgBAJgKIALAKQgFAIgKAEQgIAEgMABQgSAAgLgNgAgMgXQgEAGgCAJIAmAAIAAgBQgBgKgFgFQgFgFgIgBQgHAAgGAHg");
	this.shape_41.setTransform(32.95,51.65);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgSAqQgIgEgFgGQgFgIAAgIIAUAAQAAAIAFADQAFAFAHAAQAIAAAEgDQAEgEAAgEQAAgGgEgCQgEgDgKgDQgKgCgHgDQgPgGAAgOQAAgMAKgIQAKgHAOgBQAQABAKAHQAKAJAAAMIgVAAQAAgGgEgEQgEgDgHAAQgGAAgEACQgEAEAAAFQAAAEAEADQADADALADQAMACAHADQAHADADAFQADAFAAAIQAAALgKAIQgKAIgQAAQgKgBgJgEg");
	this.shape_42.setTransform(23.875,51.65);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgMARIAGgNIACgLIAAgPIARAAIAAAOQAAAIgEAJQgFAJgGAFg");
	this.shape_43.setTransform(242.325,32.125);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_44.setTransform(238.575,25.375);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgdAnQgIgIAAgLQAAgPAKgGQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFADQgEAEgBAFIgUAAQAAgIAGgFQAEgHAIgEQAJgDAJgBQAQAAAKAIQAJAJAAANIAAAoQAAANADAGIAAACIgUAAIgCgJQgKAKgNAAQgNABgJgIgAgLAGQgHAEAAAIQAAAGAEADQAFAEAGAAQAFAAAFgEQAGgDACgEIAAgRIgLAAQgKAAgFADg");
	this.shape_45.setTransform(231.8,27.25);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgXAuIAAhZIAUAAIAAAKQAHgMANAAIAHABIAAATIgJAAQgOAAgDAKIAAA9g");
	this.shape_46.setTransform(224.6,27.175);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AgaAiQgNgMAAgTIAAgDQABgMAFgLQAFgLAJgFQAKgHAKAAQATAAAJAMQALAMgBAVIAAAHIg5AAQABAMAGAGQAHAHAIAAQAPAAAIgMIALALQgGAIgJAFQgIADgMAAQgSAAgLgMgAgMgXQgFAGgBAJIAlAAIAAgBQAAgKgFgFQgEgFgJAAQgHgBgGAHg");
	this.shape_47.setTransform(216.75,27.25);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgVIATAAIAAAVIAQAAIAAAPIgQAAIAAAyQAAAEACACQACADAGAAIAHgBIAAAQIgOABQgWAAAAgZg");
	this.shape_48.setTransform(209.075,26.25);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AgdAnQgIgIAAgLQAAgPAKgGQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFADQgFAEAAAFIgUAAQAAgIAGgFQAEgHAIgEQAJgDAJgBQAQAAAJAIQAKAJAAANIAAAoQAAANAEAGIAAACIgVAAIgDgJQgJAKgNAAQgNABgJgIgAgLAGQgHAEAAAIQAAAGAFADQAEAEAGAAQAFAAAFgEQAFgDADgEIAAgRIgLAAQgKAAgFADg");
	this.shape_49.setTransform(201.85,27.25);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_50.setTransform(195.075,25.375);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_51.setTransform(162.475,27.175);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AgdAnQgIgIAAgLQAAgPAKgGQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFADQgFAEAAAFIgUAAQAAgIAGgFQAEgHAIgEQAJgDAJgBQAQAAAJAIQAKAJAAANIAAAoQAAANADAGIAAACIgUAAIgCgJQgKAKgNAAQgNABgJgIgAgLAGQgHAEAAAIQAAAGAFADQAEAEAGAAQAFAAAFgEQAGgDACgEIAAgRIgLAAQgKAAgFADg");
	this.shape_52.setTransform(153.15,27.25);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDADgFAAQgEAAgDgDg");
	this.shape_53.setTransform(146.375,25.55);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgTA8QgKgFgFgGIAKgNQAJALAOAAQAIABAHgGQAFgGAAgKIAAgGQgIAKgOgBQgPAAgKgMQgLgMABgWQAAgUAJgNQAKgNAQAAQAPAAAIALIACgJIASAAIAABXQAAARgMAKQgKAKgSAAQgKAAgJgDgAgNgmQgFAIAAAPQAAANAFAIQAGAHAIAAQANAAAFgKIAAgnQgFgKgNAAQgIAAgGAIg");
	this.shape_54.setTransform(139.2,28.95);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgdAnQgJgIAAgLQAAgPALgGQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEADQgFAEABAFIgVAAQABgIAFgFQAEgHAIgEQAJgDAJgBQAQAAAJAIQAKAJAAANIAAAoQAAANAEAGIAAACIgVAAIgDgJQgJAKgNAAQgOABgIgIgAgMAGQgFAEgBAIQAAAGAFADQAEAEAGAAQAFAAAFgEQAFgDADgEIAAgRIgLAAQgKAAgGADg");
	this.shape_55.setTransform(129.95,27.25);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AgTA1IgBAKIgSAAIAAh/IAUAAIAAAvQAIgLAOAAQARABAJALQAJANAAAVIAAABQAAAVgJAMQgJAMgRAAQgOAAgJgLgAgSAAIAAAkQAFAMANAAQAJAAAFgHQAFgHAAgOIAAgDQAAgPgFgFQgFgIgJAAQgNAAgFALg");
	this.shape_56.setTransform(120.775,25.45);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDADgFAAQgEAAgDgDg");
	this.shape_57.setTransform(87.925,25.55);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AgcA0QgKgMAAgXQAAgTAJgNQAKgNAQAAQAOAAAIAKIAAguIAUAAIAAB/IgSAAIgBgKQgJALgOAAQgQAAgJgMgAgNgDQgFAHAAAPQAAAOAFAIQAGAHAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_58.setTransform(80.725,25.45);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgqQgDgDAAgFQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAFgDADQgDADgFAAQgEAAgDgDg");
	this.shape_59.setTransform(48.275,25.55);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgXAuIAAhZIATAAIABAKQAGgMAOAAIAGABIAAATIgIAAQgNAAgFAKIAAA9g");
	this.shape_60.setTransform(43.5,27.175);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_61.setTransform(35.375,27.325);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AgsA9IAAh5IAkAAQAOAAANAIQANAHAGANQAHANAAARIAAAFQAAARgHAOQgHAMgMAHQgNAIgQAAgAgXAsIANAAQAQAAAJgKQAIgLABgUIAAgFQAAgTgJgLQgIgLgPAAIgPAAg");
	this.shape_62.setTransform(25.3,25.7);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.165,0,0,1.778,-145,-77.5)).s().p("A2qMFIAA4KMAtVAAAIAAYKg");
	this.shape_63.setTransform(132.75,57.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("rgba(0,0,0,0.227)").s().p("A0MIAIAAv/MAoZAAAIAAP/g");
	this.shape_64.setTransform(114.775,66.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_64).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop13G2, new cjs.Rectangle(-14.5,-19.9,292.4,154.70000000000002), null);


(lib.drop13G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgUA/QgKgFgGgHIAKgMQALALAOAAQAJAAAGgFQAGgGABgLIAAgHQgJALgPAAQgRAAgKgOQgLgNAAgXQAAgWALgNQAKgNASAAQAPAAAJALIABgJIATAAIAABbQAAATgLAKQgMALgTAAQgKAAgKgEgAgNgoQgHAIAAAQQAAAPAHAHQAFAIAKAAQANAAAGgLIAAgpQgGgLgNAAQgKAAgFAJg");
	this.shape.setTransform(202.4,85.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABCIgVAAIAAhdIAUAAIAAAKQALgMAQAAQAeAAABAhIAAA+g");
	this.shape_1.setTransform(192.5,84.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKAAQARgBAKAJQAKAJAAAOIAAArQAAAMAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_2.setTransform(182.625,84.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgTBTIAAgRIAHABQALAAAAgMIAAhnIAUAAIAABnQAAAOgHAIQgHAIgNAAQgGAAgFgCgAAAhAQgDgEAAgFQAAgEADgEQADgDAFAAQAGAAADADQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_3.setTransform(174.625,84.325);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABCIgVAAIAAhdIAUAAIABAKQAKgMAQAAQAeAAAAAhIAAA+g");
	this.shape_4.setTransform(168.25,84.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKAAQARgBAKAJQAKAJAAAOIAAArQAAAMAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_5.setTransform(158.375,84.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgpBDIAAiDIAUAAIABAKQAJgMAPAAQASAAAKANQAJANAAAXIAAACQABAVgLANQgKANgQAAQgPAAgJgKIAAAtgAgTglIAAApQAFALANAAQAKAAAFgIQAHgHAAgRQgBgOgFgJQgGgIgKAAQgNAAgFALg");
	this.shape_6.setTransform(148.6,85.925);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgVA/QgJgFgGgHIAKgMQALALAOAAQAJAAAGgFQAGgGABgLIAAgHQgJALgPAAQgRAAgKgOQgLgNAAgXQAAgWALgNQAKgNARAAQAQAAAJALIABgJIATAAIAABbQAAATgLAKQgMALgTAAQgKAAgLgEgAgNgoQgHAIAAAQQAAAPAHAHQAFAIAKAAQAMAAAHgLIAAgpQgHgLgMAAQgKAAgFAJg");
	this.shape_7.setTransform(133.55,85.975);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABCIgWAAIAAhdIAVAAIAAAKQALgMAQAAQAeAAABAhIAAA+g");
	this.shape_8.setTransform(123.65,84.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKAAQARgBAKAJQAKAJAAAOIAAArQAAAMAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_9.setTransform(113.775,84.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgiBBIAAgRIAEABQAIAAAEgDQAEgDADgHIADgIIgiheIAXAAIATBBIAUhBIAXAAIgmBtQgIAYgVAAIgKgCg");
	this.shape_10.setTransform(104.525,86.125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABCIgWAAIAAhdIAVAAIABAKQAKgMAQAAQAeAAAAAhIAAA+g");
	this.shape_11.setTransform(90.65,84.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgDQAIgEAKAAQARgBAKAJQAKAJAAAOIAAArQAAAMAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_12.setTransform(80.775,84.2);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgUA/QgLgFgEgHIAJgMQALALAOAAQAJAAAHgFQAFgGAAgLIAAgHQgIALgPAAQgQAAgLgOQgLgNAAgXQAAgWAKgNQALgNASAAQAOAAAKALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgKAAgKgEgAgOgoQgFAIAAAQQAAAPAFAHQAGAIAJAAQAOAAAFgLIAAgpQgFgLgOAAQgJAAgGAJg");
	this.shape_13.setTransform(70.6,85.975);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABCIgVAAIAAhdIAUAAIABAKQAKgMAQAAQAeAAAAAhIAAA+g");
	this.shape_14.setTransform(60.7,84.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgcAkQgNgMAAgWIAAgCQAAgOAGgLQAFgLAKgGQAKgHALABQAUAAAKAMQALANAAAWIAAAIIg9AAQABALAGAIQAHAGAKAAQAOAAAKgMIALAMQgFAIgKAFQgKAEgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_15.setTransform(50.975,84.2);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgKBDIAAiGIAVAAIAACGg");
	this.shape_16.setTransform(43.75,82.2);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgWAJIAAgQIAtAAIAAAQg");
	this.shape_17.setTransform(199.275,57.9);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgEQgEgFgJAAQgLAAgHAMIAABDIgWAAIAAhfIAVAAIABAMQAKgNAQgBQAeAAABAjIAAA+g");
	this.shape_18.setTransform(191.35,58.5);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_19.setTransform(181.475,58.6);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgVA/QgJgFgFgHIAKgMQAKALAOAAQAKAAAFgFQAHgGgBgLIAAgHQgJALgOAAQgQAAgLgOQgLgNAAgXQAAgWAKgNQALgNARAAQAQAAAJALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgKgEgAgOgoQgFAIAAAQQAAAPAFAHQAGAIAJAAQAOAAAFgLIAAgpQgFgLgOAAQgJAAgGAJg");
	this.shape_20.setTransform(171.3,60.375);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgEQgEgFgJAAQgLAAgHAMIAABDIgWAAIAAhfIAVAAIABAMQAKgNAQgBQAeAAAAAjIAAA+g");
	this.shape_21.setTransform(161.4,58.5);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgNAGgLQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALAKQgFAJgKAFQgKAEgLAAQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_22.setTransform(151.675,58.6);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgKBEIAAiGIAVAAIAACGg");
	this.shape_23.setTransform(144.45,56.6);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_24.setTransform(132.775,58.6);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgKAhIAAg1IgQAAIAAgQIAQAAIAAgXIAUAAIAAAXIARAAIAAAQIgRAAIAAA0QAAAFACACQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgbg");
	this.shape_25.setTransform(124.675,57.55);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAVAAIAAALQAGgNAOAAQAFABADABIgBAUIgIgBQgPAAgEAMIAABAg");
	this.shape_26.setTransform(119.15,58.5);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgNAGgLQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALAKQgFAJgKAFQgKAEgLAAQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_27.setTransform(110.825,58.6);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgTAtQgJgEgGgIQgEgHAAgIIAVAAQAAAHAFAEQAFAFAIgBQAJABAEgEQAEgDAAgFQAAgGgFgDQgEgDgKgDQgLgBgHgEQgQgHAAgPQAAgMAKgIQAKgJAPAAQARAAALAJQAKAIAAAOIgVAAQAAgGgFgEQgEgEgIAAQgFAAgFADQgEADgBAFQAAAFAFADQAEADAMADQAMACAHAEQAIADADAFQAEAGgBAIQAAANgLAHQgKAJgRgBQgLAAgJgEg");
	this.shape_28.setTransform(101.2,58.6);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgKAhIAAg1IgQAAIAAgQIAQAAIAAgXIAUAAIAAAXIARAAIAAAQIgRAAIAAA0QAAAFACACQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgbg");
	this.shape_29.setTransform(88.875,57.55);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_30.setTransform(81.225,58.6);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgTAtQgJgEgFgIQgGgHAAgIIAWAAQAAAHAFAEQAGAFAHgBQAIABAFgEQAEgDAAgFQAAgGgFgDQgEgDgKgDQgLgBgHgEQgQgHAAgPQAAgMAKgIQAKgJAQAAQAQAAALAJQALAIAAAOIgWAAQAAgGgEgEQgFgEgHAAQgHAAgEADQgEADAAAFQAAAFADADQAFADALADQANACAHAEQAHADAEAFQADAGAAAIQABANgLAHQgLAJgRgBQgLAAgJgEg");
	this.shape_31.setTransform(71.65,58.6);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKALgQAAQgPAAgIgJg");
	this.shape_32.setTransform(62.025,58.7);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgpBDIAAiDIAUAAIABAKQAKgMAOAAQASAAAKANQAKANAAAXIAAACQAAAVgLANQgJANgRAAQgPAAgJgKIAAAtgAgTglIAAApQAGALANAAQAJAAAGgIQAFgHAAgRQABgOgGgJQgGgIgJAAQgNAAgGALg");
	this.shape_33.setTransform(52.15,60.325);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AAuAwIAAg8QAAgKgEgEQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgMASAAQASAAAHAOQAKgOATAAQAQAAAIAJQAHAIAAARIAAA9g");
	this.shape_34.setTransform(219.375,32.9);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgFQgEgEgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAAqQAAANAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_35.setTransform(206.675,33);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAVAAIAAAKQAHgMANAAQAFAAADABIAAAUIgJgBQgPAAgDALIAABAg");
	this.shape_36.setTransform(199.05,32.9);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AARBDIgbgoIgJAJIAAAfIgWAAIAAiGIAWAAIAABNIAGgIIAagcIAZAAIgjAmIAnA3g");
	this.shape_37.setTransform(191.325,31);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgFQgEgEgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAAqQAAANAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_38.setTransform(181.175,33);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgcAkQgMgNAAgXIAAgBQAAgWAMgNQALgMATAAQARAAALAKQAKAJABARIgUAAQgBgJgEgFQgGgFgIAAQgJAAgGAHQgFAIgBAPIAAACQABAQAFAIQAGAHAJAAQAIAAAGgFQAEgEABgHIAUAAQAAAJgGAIQgFAHgIAFQgKAFgJAAQgUAAgLgOg");
	this.shape_39.setTransform(171.7,33);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABCIgWAAIAAhdIAVAAIAAAKQALgMAQAAQAeAAABAhIAAA+g");
	this.shape_40.setTransform(157.4,32.9);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgFQgEgEgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAAqQAAANAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_41.setTransform(147.525,33);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgVA/QgKgFgEgHIAKgMQAJALAPAAQAKAAAFgFQAHgGAAgLIAAgHQgKALgOAAQgRAAgKgOQgLgNAAgXQAAgWAKgNQALgNARAAQAPAAAKALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgKgEgAgOgoQgFAIgBAQQABAPAFAHQAGAIAKAAQAMAAAHgLIAAgpQgHgLgMAAQgKAAgGAJg");
	this.shape_42.setTransform(137.35,34.775);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgLAAgHAMIAABCIgWAAIAAhdIAVAAIABAKQAKgMAQAAQAeAAAAAhIAAA+g");
	this.shape_43.setTransform(127.45,32.9);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgVIAAgCQAAgNAGgMQAFgLAKgGQAKgHALABQAUAAAKAMQALAMAAAXIAAAIIg9AAQABALAGAHQAHAHAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_44.setTransform(117.725,33);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgeA3QgLgOAAgXQAAgUAKgOQALgNARAAQAOAAAJAKIAAgxIAWAAIAACGIgUAAIgBgKQgJANgPAAQgRAAgKgOgAgOgDQgFAHAAAQQAAAPAFAIQAGAIAJAAQANAAAGgMIAAgnQgGgMgNAAQgJAAgGAJg");
	this.shape_45.setTransform(107.525,31.1);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAUAAIABAKQAGgMAOAAQAFAAADABIgBAUIgIgBQgPAAgEALIAABAg");
	this.shape_46.setTransform(95.4,32.9);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgFQgEgEgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAAqQAAANAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_47.setTransform(86.925,33);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgKBDIAAiGIAVAAIAACGg");
	this.shape_48.setTransform(79.75,31);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgMIAAhCIAVAAIAABdIgUAAIAAgJQgKAMgQAAQgPAAgIgKg");
	this.shape_49.setTransform(72.425,33.1);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgUA/QgLgFgEgHIAJgMQALALAOAAQAJAAAHgFQAFgGAAgLIAAgHQgIALgPAAQgQAAgLgOQgLgNAAgXQAAgWALgNQAKgNASAAQAOAAAKALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgJgEgAgOgoQgFAIAAAQQAAAPAFAHQAGAIAJAAQAOAAAFgLIAAgpQgFgLgOAAQgJAAgGAJg");
	this.shape_50.setTransform(62.15,34.775);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABCIgVAAIAAhdIAUAAIAAAKQALgMAQAAQAeAAAAAhIAAA+g");
	this.shape_51.setTransform(52.25,32.9);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AgcAkQgNgNAAgVIAAgCQAAgNAGgMQAFgLAKgGQAKgHALABQAUAAAKAMQALAMAAAXIAAAIIg9AAQABALAGAHQAHAHAKAAQAOAAAKgMIALAMQgFAIgKAEQgKAFgLABQgUAAgMgOgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgGQgFgFgJAAQgIAAgFAGg");
	this.shape_52.setTransform(42.525,33);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AAuAwIAAg8QAAgKgEgEQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAKQAKgMASAAQASAAAHAOQAKgOATAAQAQAAAIAJQAHAIAAARIAAA9g");
	this.shape_53.setTransform(29.775,32.9);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgUA/QgKgFgGgHIAKgMQAKALAPAAQAJAAAHgFQAFgGABgLIAAgHQgKALgOAAQgRAAgKgOQgLgNAAgXQAAgWALgNQAKgNASAAQAPAAAJALIABgJIATAAIAABbQAAATgLAKQgMALgTAAQgKAAgKgEgAgNgoQgHAIAAAQQAAAPAHAHQAFAIAJAAQANAAAHgLIAAgpQgHgLgNAAQgJAAgFAJg");
	this.shape_54.setTransform(221.65,9.175);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABCIgVAAIAAheIAUAAIAAAMQALgNAQgBQAeAAABAiIAAA+g");
	this.shape_55.setTransform(211.75,7.3);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgHQAMgHAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_56.setTransform(201.875,7.4);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AgKAhIAAg1IgQAAIAAgQIAQAAIAAgXIAUAAIAAAXIARAAIAAAQIgRAAIAAA0QAAAGACABQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgbg");
	this.shape_57.setTransform(193.775,6.35);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABCIgVAAIAAheIAUAAIAAAMQALgNAQgBQAeAAABAiIAAA+g");
	this.shape_58.setTransform(186,7.3);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgJBBIAAheIATAAIAABegAgIgtQgDgDAAgFQAAgFADgDQADgDAFgBQAGABADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_59.setTransform(178.7,5.6);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgUA4IgCAKIgTAAIAAiGIAWAAIAAAxQAJgKAOgBQASABAKANQAKANAAAWIAAABQAAAWgKANQgKANgRAAQgQAAgJgMgAgTAAIAAAnQAFAMAOAAQAJAAAGgIQAFgHAAgPIAAgDQAAgQgFgGQgGgIgJAAQgOAAgFAMg");
	this.shape_60.setTransform(171.525,5.5);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgKBBIAAheIAUAAIAABegAgIgtQgDgDAAgFQAAgFADgDQADgDAFgBQAGABADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_61.setTransform(159.45,5.6);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AgKAhIAAg1IgQAAIAAgQIAQAAIAAgXIAUAAIAAAXIARAAIAAAQIgRAAIAAA0QAAAGACABQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgbg");
	this.shape_62.setTransform(153.925,6.35);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AgYAwIAAheIAVAAIAAALQAGgNAOAAQAFABADABIgBAUIgIgBQgPAAgDAMIAAA/g");
	this.shape_63.setTransform(148.4,7.3);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgVIAAgDQAAgNAGgLQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABAMAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_64.setTransform(140.075,7.4);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AgpBDIAAiDIAUAAIABAKQAKgMAOAAQASAAAKANQAJANAAAXIAAACQAAAVgKANQgKANgQAAQgPAAgJgKIAAAtgAgTglIAAApQAFALAOAAQAJAAAFgIQAHgHAAgRQgBgOgFgJQgGgIgJAAQgOAAgFALg");
	this.shape_65.setTransform(130.25,9.125);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgVIAAgDQAAgNAGgLQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABAMAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_66.setTransform(120.275,7.4);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AgTAtQgJgEgGgIQgEgHAAgIIAVAAQAAAHAFAEQAFAFAIgBQAIAAAFgDQAEgDAAgGQAAgFgFgDQgEgDgKgCQgLgDgHgDQgQgHAAgPQAAgMAKgIQAKgJAPAAQARAAALAJQAKAIAAAOIgVAAQAAgGgFgEQgEgEgIgBQgFABgFADQgEADgBAFQAAAFAFADQAEADAMADQAMADAHAEQAIACADAGQAEAFgBAHQAAAOgLAHQgKAJgRgBQgLABgJgFg");
	this.shape_67.setTransform(110.65,7.4);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AgKBBIAAheIAUAAIAABegAgIgtQgDgDAAgFQAAgFADgDQADgDAFgBQAGABADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_68.setTransform(99.25,5.6);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABCIgVAAIAAheIAUAAIAAAMQALgNAQgBQAeAAABAiIAAA+g");
	this.shape_69.setTransform(91.95,7.3);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2C3E50").s().p("AgJBBIAAheIATAAIAABegAgIgtQgDgDAAgFQAAgFADgDQADgDAFgBQAGABADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_70.setTransform(84.65,5.6);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgEQgEgFgJAAQgLAAgHAMIAABCIgVAAIAAheIAUAAIABAMQAKgNAQgBQAeAAAAAiIAAA+g");
	this.shape_71.setTransform(72.85,7.3);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgHQAMgHAUAAIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAAqQAAANAEAHIAAABIgWAAQgBgCgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_72.setTransform(62.975,7.4);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#2C3E50").s().p("AAUAvIgUhAIgTBAIgSAAIgaheIAVAAIAPBBIAUhBIAPAAIAUBBIAPhBIAVAAIgaBeg");
	this.shape_73.setTransform(51.375,7.4);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#2C3E50").s().p("AgcAlQgNgNAAgVIAAgDQAAgNAGgLQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABAMAGAIQAHAGAKAAQAOAAAKgMIALALQgFAJgKAFQgKAEgLAAQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgBQgBgLgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_74.setTransform(39.975,7.4);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#2C3E50").s().p("AAdBAIAAg5Ig5AAIAAA5IgWAAIAAh/IAWAAIAAA1IA5AAIAAg1IAWAAIAAB/g");
	this.shape_75.setTransform(28.625,5.75);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.176,0,0,1.862,-146.5,-81.1)).s().p("A24MqIAA5TMAtxAAAIAAZTg");
	this.shape_76.setTransform(124.625,51.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("rgba(0,0,0,0.227)").s().p("A0MH/IAAv9MAoZAAAIAAP9g");
	this.shape_77.setTransform(105.175,61.3);

	this.timeline.addTween(cjs.Tween.get(this.shape_77).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop13G1, new cjs.Rectangle(-24.1,-29.3,295.20000000000005,162), null);


(lib.drag13GJud = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgSAXQgEgFAAgGQABgJAGgDQAHgFALAAIAHABIABgFIAAgDQgBgFgGgBQgEAAgBACQgDACgBAEIgMAAQABgFADgEQADgEAFgCQAFgCAFAAQAJABAFAFQAEAFAAAIIgEAYIgBAEIABAFIAAABIgMAAIAAgEQgHAFgGAAQgHABgFgFgAgGAEQgDADgBAEQAAADABACQACACAEAAQADAAACgCIAGgFIABgKIgFAAQgGAAgEADg");
	this.shape.setTransform(121.875,23.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgMAYQgGgDgCgGQgCgGAAgHIAAgCQABgHAEgGQAEgHAGgDQAFgDAGgBQAKABAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgHIAGAGQgDAFgGADQgFADgGgBQgGABgFgEgAgJgEIAVAAIAAgBIAAgEQgBgDgCgDQgCgBgEgBQgIAAgEANg");
	this.shape_1.setTransform(116.8292,23.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgVAgQgEgFgBgKIAAgFIABgBQABgJADgFQADgGAFgEQAFgDAHAAQAHAAAEAGIAFgbIAMAAIgNBKIgKAAIAAgGQgFAHgIAAQgIAAgEgGgAgKgBQgEAGAAAKQgBAGADADQACAFAEAAQAGAAAFgHIAEgWQgCgGgHAAIAAAAQgGAAgEAFg");
	this.shape_2.setTransform(111.675,22.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgLAkIAJg0IALAAIgJA0gAABgZQgBAAAAAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABgBQACgCACAAQABAAABABQAAAAABAAQAAAAABABQAAAAABAAQAAABABAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAgBAAIgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBg");
	this.shape_3.setTransform(107.55,22.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgOAYQgFgEgCgFQgCgHAAgHIAAgBQABgHAEgGQAEgGAFgEQAGgDAGgBQAHABAFAEQAFADACAGQADAGgBAHQgBAIgEAHQgDAGgGAEQgGACgGAAQgHABgFgEgAgIgKQgCAFgBAFIAAAHQAAAEACAEQADADAEAAQAFAAAEgEQAEgGABgIIABgDQAAgHgDgDQgCgDgFgBQgHAAgEAHg");
	this.shape_4.setTransform(103.3843,23.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgRAbIAJg0IAKAAIgBAGQAFgHAHAAIAFABIgBALIgFAAQgIAAgEAGIgFAjg");
	this.shape_5.setTransform(99.075,23.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgRAYQgEgCgBgEQgCgFABgFIAGgiIALAAIgGAiIAAADQABAGAGABQAGAAAFgHIAHglIALAAIgJA0IgLAAIABgFQgFAGgJAAQgFAAgDgDg");
	this.shape_6.setTransform(94.5688,23.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgLAkIAJg0IALAAIgJA0gAABgZQAAAAgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAgBQADgCADAAQAAAAABABQAAAAABAAQAAAAABABQABAAAAAAQABABAAAAQAAABABAAQAAABAAABQAAAAAAABQAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgCAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBg");
	this.shape_7.setTransform(90.6,22.1);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AAHAlIAGgiIAAgDQgBgGgGAAQgGAAgFAGIgHAlIgLAAIANhJIAKAAIgEAcQAGgIAIAAQAIABADAFQAEAGgBAHIgGAig");
	this.shape_8.setTransform(86.2611,22);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgaAlIANhIIALAAIgBAFQAFgGAIAAQAFAAAEADQAEACACAFQACAFAAAFIgBAIQAAAHgEAGQgDAGgFAEQgFADgGAAQgHAAgFgGIgFAZgAgEgUIgEAWQACAGAGAAQAGAAAEgEQAEgEABgJIAAgEQAAgGgCgEQgCgDgEAAIgBAAQgGAAgEAGg");
	this.shape_9.setTransform(80.675,24.075);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgRAhQgFgDgDgGQgDgGAAgHQgBgHACgHQABgIAEgHQAEgGAFgFQAIgHAKABQALAAAGAHQAGAHABAMIgBANQgBAIgEAGQgDAHgFAEQgJAIgLAAQgGAAgGgEgAgFgWQgFAEgDAHQgDAIAAAKQgBAJADAFQAEAFAGABQAIAAAFgHQAGgGABgMIABgDIAAgFIgBgKQgBgEgDgDQgDgCgEAAQgFAAgFADg");
	this.shape_10.setTransform(75.0188,22.1983);

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


(lib.drag13G11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap142();
	this.instance.setTransform(0,-3,0.3448,0.4762);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgUAeIAKg6IAIAAIgBAEQAEgFAHAAQAEAAADACQADACACAEQABAEAAAFIAAAFQgBAHgCAEQgDAFgEADQgEACgFAAQgGAAgDgFIgEAVgAgDgQIgDASQABAEAFAAQAEABAEgEQADgDABgIIAAgCQAAgFgCgDQgBgDgEAAQgFAAgDAFg");
	this.shape.setTransform(66.825,80.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgNASQgEgEAAgHIAJAAQAAAEACACQACACADgBQADABACgCQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAAAQAAgFgFgBIgHgCQgIgDAAgHQAAgFAFgEQAFgEAGAAQAHAAAEAEQAEADAAAHIgJAAQAAgBAAgBQAAgBAAAAQAAgBgBAAQAAgBAAAAQgCgCgDAAQgDAAgBABQgBABAAAAQgBABAAAAQAAABgBAAQAAABAAABQAAADAEABIAIADQAIACAAAIQAAAEgDADIgGAFIgIABQgHgBgFgDg");
	this.shape_1.setTransform(62.775,79.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgOATQgDgEAAgFQAAgHAGgDQAFgEAIAAIAGAAIABgCIAAgEQgBgEgFAAQgDAAgBABQgCACgBADIgJAAQAAgEADgDQACgDAEgCIAIgBQAHAAAEAEQAEAEgBAHIgDASIAAAEIAAAFIAAAAIgJAAIAAgEQgGAFgFAAQgFAAgEgDgAgEADQgDACgBAEQAAAAAAABQAAAAAAABQAAAAABABQAAAAAAAAQABABAAAAQAAAAABABQAAAAABAAQABAAAAAAQADABACgCIAEgEIACgIIgFAAQgEAAgDACg");
	this.shape_2.setTransform(56.6278,79.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgOAVIAIgpIAHAAIAAAFQAEgGAGABIADAAIgBAJIgDAAQgGAAgEAEIgEAcg");
	this.shape_3.setTransform(53.4,79.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgOAUQgDgCgBgEQgBgDABgFIAEgbIAJAAIgEAbIAAADQAAAFAFAAQAFAAAEgFIAFgeIAJAAIgHAqIgJAAIABgEQgEAFgHAAIgHgCg");
	this.shape_4.setTransform(49.8167,79.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgJAdIAIgpIAIAAIgHApgAABgTQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIABgEQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAABQAAAAgBABIgEABQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_5.setTransform(46.625,78.475);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AAFAeIAFgbIAAgDQAAgEgFgBQgFABgEAEIgFAeIgJAAIAKg7IAIAAIgDAXQAEgGAHAAQAGAAADAFQADAEgBAGIgEAbg");
	this.shape_6.setTransform(43.1792,78.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgUAeIAKg6IAIAAIgBAEQAEgFAHAAQAEAAADACQADACACAEQABAEAAAFIAAAFQgBAHgCAEQgDAFgEADQgEACgFAAQgGAAgDgFIgEAVgAgDgQIgDASQABAEAFAAQAEABAEgEQADgDABgIIAAgCQAAgFgCgDQgBgDgEAAQgFAAgDAFg");
	this.shape_7.setTransform(38.725,80.075);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AARAVIAFgaIAAgDQgBgFgFAAQgGAAgDAGIAAABIgFAbIgIAAIAEgaIAAgDQAAgFgFAAQgGAAgDAFIgFAdIgKAAIAIgpIAIAAIAAAEQAFgEAHAAQADAAADACQACABABADQAGgHAIABQAGAAADADQADAFgBAHIgEAag");
	this.shape_8.setTransform(33.2036,79.25);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AAPAcIgCgNIgUAAIgHANIgKAAIAdg4IAJAAIALA4gAgDAHIAPAAIgEgWg");
	this.shape_9.setTransform(26.975,78.55);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FF8C2D").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_10.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


(lib.drag13G10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap141();
	this.instance.setTransform(0,-3,0.3488,0.4762);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgQAWQgGgFAAgHIALAAQAAAEADADQACACAFgBQADAAADgBQADgCAAgDQABgFgHgCIgJgDQgKgDAAgJQABgHAGgFQAGgEAIAAQAIAAAGAEQAFAFAAAIIgMAAQAAgEgCgCQgCgDgEABQgDAAgCABQgDACAAAEQgBAEAGABIAKAEQAKADAAAJQgBAFgDAEQgDAEgFACQgFABgFABQgJAAgFgGg");
	this.shape.setTransform(71.725,80.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgRAYQgEgCgBgFQgCgDABgHIAGghIALAAIgGAhIAAAEQABAGAGAAQAGABAFgHIAHglIALAAIgJA0IgLAAIABgFQgFAGgJAAQgFAAgDgDg");
	this.shape_1.setTransform(66.6688,80.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgMAYQgGgDgCgGQgCgGAAgHIAAgCQABgHAEgHQAEgGAGgDQAFgDAGAAQAKAAAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgHIAGAHQgDAEgGADQgFACgGABQgGgBgFgDgAgJgEIAVAAIAAgBIAAgEQgBgEgCgCQgCgCgEAAQgIAAgEANg");
	this.shape_2.setTransform(61.2792,80.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgNAYQgFgDgCgGQgDgHABgHIAAgBQABgIAEgGQADgGAGgDQAGgDAGAAQAJAAAFAGQAFAFAAAIIgLAAQAAgEgCgDQgCgDgFAAQgFAAgEAGQgEAGgBAJQAAAOAKAAQADAAADgCQADgDABgEIALAAQgBAFgDAEQgDAFgFACQgFACgFABQgHgBgEgDg");
	this.shape_3.setTransform(56.1107,80.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgSAXQgEgFAAgGQABgIAGgEQAHgFALAAIAHAAIABgDIAAgEQgBgFgGAAQgEAAgBABQgDACgBAEIgMAAQABgFADgDQADgFAFgCQAFgBAFAAQAJAAAFAFQAEAFAAAIIgEAYIgBAEIABAGIAAABIgMAAIAAgGQgHAHgGAAQgHgBgFgEgAgGAEQgDACgBAFQAAADABACQACACAEAAQADAAACgBIAGgGIABgKIgFAAQgGABgEACg");
	this.shape_4.setTransform(50.725,80.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AAHAbIAGghIAAgEQgBgGgGAAQgGAAgFAGIgHAlIgLAAIAJg0IALAAIgBAGQAGgHAIAAQAIABADAEQAEAFgBAKIgGAhg");
	this.shape_5.setTransform(45.2781,80.45);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgLAlIAJg1IALAAIgJA1gAABgZQAAAAgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAgBQACgBAEAAQAAAAABAAQAAAAABAAQAAAAABABQABAAAAAAQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgCAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAgBg");
	this.shape_6.setTransform(41.65,79.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgRAbIAJg0IAKAAIgBAGQAFgHAHAAIAFABIgBALIgFAAQgIgBgEAHIgFAjg");
	this.shape_7.setTransform(38.725,80.45);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgMAYQgGgDgCgGQgCgGAAgHIAAgCQABgHAEgHQAEgGAGgDQAFgDAGAAQAKAAAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgHIAGAHQgDAEgGADQgFACgGABQgGgBgFgDgAgJgEIAVAAIAAgBIAAgEQgBgEgCgCQgCgCgEAAQgIAAgEANg");
	this.shape_8.setTransform(34.2792,80.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgEAFQAAAAgBgBQAAgBAAAAQAAgBgBAAQAAgBAAAAQAAgCACgDQACgCACABQADAAACABQACACAAACQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQgCACgDAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBgBAAg");
	this.shape_9.setTransform(27.375,82.55);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgRAhQgFgDgDgGQgDgGAAgHQgBgHACgHQABgIAEgHQAEgGAFgFQAIgHAKABQALAAAGAHQAGAHABAMIgBANQgBAIgEAGQgDAHgFAEQgJAIgLAAQgGAAgGgEgAgFgWQgFAEgDAHQgDAIAAAKQgBAJADAFQAEAFAGABQAIAAAFgHQAGgGABgMIABgDIAAgFIgBgKQgBgEgDgDQgDgCgEAAQgFAAgFADg");
	this.shape_10.setTransform(23.1688,79.5983);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FF8C2D").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_11.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


(lib.drag13G9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap140();
	this.instance.setTransform(0,-3,0.3557,0.4762);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgJAdIAIgpIAIAAIgHApgAABgTQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIABgEQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAABAAQAAAAAAABQABAAAAAAQABABAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAABQAAAAgBABIgEABQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape.setTransform(60.525,87.925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgQAeIgFgBIABgHIACAAQADAAACgBQADgCABgDIACgEIgHgpIAKAAIADAdIANgdIAKAAIgYAxQgFAKgIAAIgBAAg");
	this.shape_1.setTransform(57.525,89.5762);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AAFAVIAFgaIAAgDQAAgFgFAAQgFAAgEAFIgFAdIgJAAIAHgpIAJAAIgBAFQAEgGAHABQAGAAADADQADAFgBAHIgEAag");
	this.shape_2.setTransform(53.2875,88.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgFAeQgFAAgEgCQgEgCgDgDIAGgGQADAFAHAAQAEABACgDQADgDABgFIABgDQgFAFgFAAQgGAAgDgEQgEgFgBgGIAAgGQABgGADgFQADgFAEgDQAEgDAEAAQAHAAAEAFIABgEIAJAAIgIAoQAAAIgHAFQgFAFgGAAIgBAAgAgEgRQgDADgBAHIAAABIAAAEQAAADACADQABACAEAAQAEAAAEgFIAEgRQgDgFgFAAQgDAAgEAEg");
	this.shape_3.setTransform(48.95,89.5273);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgJAdIAIgpIAIAAIgHApgAABgTQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIABgEQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAABQAAAAgBABIgEABQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_4.setTransform(45.925,87.925);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgKAVIgHgpIAJAAIAEAdIAMgdIAKAAIgUApg");
	this.shape_5.setTransform(43.175,88.725);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgOATQgDgEAAgFQAAgHAGgDQAFgEAIAAIAGAAIABgCIAAgEQgBgEgFAAQgDAAgBABQgCACgBADIgJAAQAAgEADgDQACgDAEgCIAIgBQAHAAAEAEQAEAEgBAHIgDATIAAADIAAAFIAAAAIgJAAIAAgEQgGAFgFAAQgFAAgEgDgAgEADQgDACgBAEQAAAAAAABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQAAAAABABQAAAAABAAQABAAAAAAQADABACgCIAEgEIACgIIgFAAQgEAAgDACg");
	this.shape_6.setTransform(38.6778,88.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgNASQgEgEAAgHIAJAAQAAAEACACQACACADgBQADABACgCQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAAAQAAgFgFgBIgHgCQgIgDAAgHQAAgFAFgEQAFgEAGAAQAHAAAEAEQAEADAAAHIgJAAQAAgBAAgBQAAgBAAAAQAAgBgBAAQAAgBAAAAQgCgCgDAAQgDAAgBABQgBABAAAAQgBABAAAAQAAABgBAAQAAABAAABQAAADAEABIAIADQAIACAAAIQAAAEgDADIgGAFIgIABQgHgBgFgDg");
	this.shape_7.setTransform(34.575,88.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgNASQgEgEAAgHIAJAAQAAAEACACQACACADgBQADABACgCQAAAAABgBQAAAAABAAQAAgBAAAAQABgBAAAAQAAgEgFgCIgHgCQgIgDAAgHQAAgFAFgFQAFgDAGAAQAHAAAEADQAEAFAAAGIgJAAQAAgBAAgBQAAgBAAAAQAAgBgBAAQAAgBAAAAQgCgCgDAAQgDAAgBABQgBABAAAAQgBABAAAAQAAABgBAAQAAABAAAAQAAAEAEABIAIADQAIADAAAGQAAAFgDADIgGAFIgIABQgHgBgFgDg");
	this.shape_8.setTransform(61.475,75.15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgJAdIAIgpIAIAAIgHApgAABgTQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIABgEQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAABQAAAAgBABIgEABQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_9.setTransform(58.625,74.325);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgHAYQgCgEAAgFIAEgXIgGAAIABgIIAHAAIABgKIAJAAIgCAKIAHAAIgBAIIgHAAIgEAXIAAABQAAABAAAAQAAABABAAQAAAAAAABQABAAABAAIADgBIgBAIIgFABQgEAAgDgDg");
	this.shape_10.setTransform(56.425,74.65);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgLATQgEgDgBgEQgCgGABgFIAAgBQAAgGADgFQADgFAFgDQAEgCAFAAQAHAAAEAFQAEAEAAAHIgJAAQAAgDgBgDQgCgDgEABQgEAAgDAEQgDAFAAAIQgBAKAIAAQACABADgCQACgCABgEIAJAAQgBAEgCADQgDAEgEACQgEACgDAAQgGgBgEgCg");
	this.shape_11.setTransform(52.9583,75.15);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgOATQgDgEAAgFQAAgHAGgDQAFgEAIAAIAGAAIABgCIAAgEQgBgEgFAAQgDAAgBABQgCACgBADIgJAAQAAgEADgDQACgDAEgCIAIgBQAHAAAEAEQAEAEgBAHIgDATIAAADIAAAFIAAAAIgJAAIAAgEQgGAFgFAAQgFgBgEgCgAgEADQgDACgBADQAAABAAABQAAAAAAABQAAAAABABQAAAAAAABQABAAAAAAQAAAAABABQAAAAABAAQABAAAAAAQADABACgCIAEgEIACgIIgFAAQgEAAgDACg");
	this.shape_12.setTransform(48.5778,75.15);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgJAdIAIgpIAIAAIgHApgAABgTQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBIABgEQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAABAAQAAAAAAABQABAAAAAAQABABAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAABQAAAAgBABIgEABQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_13.setTransform(45.675,74.325);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AAFAeIAFgbIAAgDQAAgEgFAAQgFAAgEAEIgFAeIgJAAIAKg7IAIAAIgDAXQAEgGAHAAQAGAAADAFQADAEgBAGIgEAbg");
	this.shape_14.setTransform(42.2292,74.25);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgUAeIAKg6IAIAAIgBAEQAEgFAHAAQAEAAADACQADACACAEQABAEAAAFIAAAFQgBAHgCAEQgDAFgEADQgEACgFAAQgGAAgDgFIgEAVgAgDgQIgDASQABAEAFAAQAEABAEgEQADgDABgIIAAgCQAAgFgCgDQgBgDgEAAQgFAAgDAFg");
	this.shape_15.setTransform(37.775,75.925);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgNAaQgEgCgDgFQgCgFAAgGQgBgFACgFQABgHADgFQADgGAEgDQAGgGAIABQAJAAAFAFQAFAGAAAKQABAFgCAFQgBAGgCAFQgDAGgEADQgHAGgIAAQgGAAgEgDgAgEgRQgEACgCAGQgCAGgBAIQAAAIACAEQADAEAFAAQAGAAAEgFQAFgFABgKIAAgCIABgEQAAgEgBgEQgBgDgCgCQgDgCgDAAQgEAAgEADg");
	this.shape_16.setTransform(33.225,74.4229);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FF8C2D").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_17.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


(lib.drag13G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape.setTransform(97.925,35.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgCACgCIAAgLIgHAAQgFAAgEADg");
	this.shape_1.setTransform(92.475,35.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgCACgCIAAgLIgHAAQgFAAgEADg");
	this.shape_2.setTransform(87.075,35.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_3.setTransform(81.575,35.3);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAHAAIAFABIAAALIgFAAQgIAAgCAGIAAAjg");
	this.shape_4.setTransform(77.3,35.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgMIAAgBQAAgHADgGQADgHAFgDQAGgDAGgBQALAAAFAHQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_5.setTransform(72.675,35.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgNIAAAAQAAgMAHgHQAGgIAKAAQAKABAGAFQAFAGABAIIgLAAQgBgEgDgDQgCgDgFAAQgFAAgDAFQgDADAAAJIAAABQAAAJADAEQADAEAFAAQAEAAADgDQADgCABgEIALAAQAAAFgDAEQgDAEgFADQgFACgGAAQgKAAgGgGg");
	this.shape_6.setTransform(67.425,35.35);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_7.setTransform(61.975,35.3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgMIAAgBQAAgHADgGQADgHAFgDQAGgDAGgBQALAAAFAHQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_8.setTransform(56.575,35.35);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_9.setTransform(51.125,36.325);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAaAbIAAghQAAgFgCgDQgDgCgFAAQgEAAgDACQgCADgBADIAAAjIgLAAIAAgiQAAgJgKAAQgGAAgEAFIAAAmIgLAAIAAg0IALAAIAAAFQAFgGALAAQAJAAAEAJQAFgJALAAQAJAAAEAFQAEAFAAAKIAAAhg");
	this.shape_10.setTransform(41.35,35.3);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgMIAAgBQAAgHADgGQADgHAFgDQAGgDAGgBQALAAAFAHQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_11.setTransform(34.375,35.35);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgGASIAAgdIgIAAIAAgJIAIAAIAAgMIAMAAIAAAMIAJAAIAAAJIgJAAIAAAdIABAEIAEABIAEAAIAAAJIgHABQgOAAAAgPg");
	this.shape_12.setTransform(29.85,34.775);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgFQgDgEAAgEIAMAAQAAAEADACQADACADAAQAFAAADgBQACgCAAgDQAAgDgCgCQgDgBgFgBIgKgEQgJgDAAgIQAAgHAFgEQAGgGAIAAQAKAAAGAGQAFAEAAAHIgMAAQABgDgDgCQgDgCgEgBQgCAAgDACQgCACgBADQABADACABQACACAGACIALADQAEACACADQACACAAAFQAAAGgGAFQgGAFgKgBQgFAAgFgCg");
	this.shape_13.setTransform(25.7,35.35);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgSAkIAAgJIACAAQAEAAADgBIADgGIACgFIgTgzIANAAIAKAkIALgkIANAAIgVA8QgEANgMAAIgFgBg");
	this.shape_14.setTransform(20.725,36.425);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgFQgDgEAAgEIAMAAQAAAEADACQADACAEAAQAEAAADgBQACgCAAgDQAAgDgCgCQgDgBgFgBIgKgEQgJgDAAgIQAAgHAFgEQAHgGAIAAQAJAAAGAGQAFAEAAAHIgMAAQAAgDgCgCQgDgCgDgBQgDAAgDACQgCACgBADQABADACABQACACAGACIALADQAEACACADQACACAAAFQAAAGgGAFQgGAFgJgBQgGAAgFgCg");
	this.shape_15.setTransform(15.7,35.35);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAZAbIAAgiQAAgFgBgCQgDgCgFAAQgEAAgDACQgCACgBAEIAAAjIgLAAIAAgiQAAgJgKAAQgGAAgEAGIAAAlIgLAAIAAg0IAKAAIABAGQAFgHAKAAQAKAAAEAJQAGgJAKAAQAJAAAEAFQAFAFgBAJIAAAig");
	this.shape_16.setTransform(151.8,19.3);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAXQAAAIACADIAAABIgNAAIgBgEQgGAFgHABQgIAAgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_17.setTransform(144.775,19.35);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgFAlIAAhKIALAAIAABKg");
	this.shape_18.setTransform(140.775,18.25);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAXQAAAIACADIAAABIgNAAIgBgEQgGAFgHABQgIAAgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_19.setTransform(136.825,19.35);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgQAeQgGgHAAgNQAAgLAGgHQAFgIAJAAQAIAAAGAGIAAgbIALAAIAABKIgLAAIAAgGQgGAHgIAAQgIAAgGgIgAgHgBQgEADAAAJQAAAIAEAFQADAEAFAAQAHAAAEgGIAAgWQgEgGgHAAQgFAAgDAFg");
	this.shape_20.setTransform(131.15,18.3);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgFAkIAAgzIALAAIAAAzgAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgDACAAQADAAACADQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_21.setTransform(120.925,18.35);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAKAlIgPgWIgFAGIAAAQIgMAAIAAhKIAMAAIAAArIADgFIAOgPIAOAAIgTAUIAVAfg");
	this.shape_22.setTransform(117.375,18.25);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgFAkIAAgzIALAAIAAAzgAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgDACAAQADAAACADQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_23.setTransform(113.175,18.35);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgFAlIAAhKIALAAIAABKg");
	this.shape_24.setTransform(110.625,18.25);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgFAkIAAgzIALAAIAAAzgAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgDACAAQADAAACADQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_25.setTransform(108.075,18.35);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAaAbIAAgiQAAgFgDgCQgCgCgFAAQgEAAgCACQgDACgBAEIAAAjIgLAAIAAgiQAAgJgKAAQgGAAgDAGIAAAlIgMAAIAAg0IALAAIAAAGQAGgHAKAAQAJAAAEAJQAFgJALAAQAJAAAEAFQAEAFAAAJIAAAig");
	this.shape_26.setTransform(102.45,19.3);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgGAFgEQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgGIAGAFQgDAGgFACQgFADgHAAQgKgBgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_27.setTransform(95.475,19.35);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AAaAbIAAgiQgBgFgCgCQgCgCgFAAQgEAAgCACQgDACgBAEIAAAjIgLAAIAAgiQAAgJgKAAQgHAAgCAGIAAAlIgMAAIAAg0IALAAIAAAGQAGgHAKAAQAJAAAEAJQAGgJAKAAQAJAAAEAFQAEAFABAJIAAAig");
	this.shape_28.setTransform(88.4,19.3);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgFAkIAAgzIALAAIAAAzgAgEgYQAAgBgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAAAQACgDACAAQADAAACADQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_29.setTransform(76.525,18.35);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_30.setTransform(72.475,19.3);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgFAkIAAgzIALAAIAAAzgAgEgYQAAgBgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAAAQACgDACAAQADAAACADQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_31.setTransform(68.425,18.35);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgFAkIAAgzIALAAIAAAzgAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgDACAAQADAAACADQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_32.setTransform(59.625,18.35);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_33.setTransform(55.575,19.3);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgFAkIAAgzIALAAIAAAzgAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgDACAAQADAAACADQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_34.setTransform(51.525,18.35);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_35.setTransform(41.225,19.3);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAXQAAAIACADIAAABIgNAAIgBgEQgGAFgHABQgIAAgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_36.setTransform(35.775,19.35);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AALAaIgLgjIgKAjIgKAAIgPgzIAMAAIAIAjIAMgjIAIAAIALAjIAIgjIALAAIgOAzg");
	this.shape_37.setTransform(29.3,19.35);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgGAFgEQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgGIAGAFQgDAGgFACQgFADgHAAQgKgBgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_38.setTransform(22.975,19.35);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AAQAjIAAgfIgfAAIAAAfIgMAAIAAhFIAMAAIAAAdIAfAAIAAgdIAMAAIAABFg");
	this.shape_39.setTransform(16.675,18.45);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FF8C2D").s().p("AtPjPIafgLIAAGqI6fALg");
	this.shape_40.setTransform(84.725,26.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	// Layer_2
	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("rgba(0,0,0,0.227)").s().p("AtJDQIAAmfIaTAAIAAGfg");
	this.shape_41.setTransform(78.275,33.125);

	this.timeline.addTween(cjs.Tween.get(this.shape_41).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5.9,4.5,175.5,49.4);


(lib.drag13G4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgBQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape.setTransform(64.525,5.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_1.setTransform(60.475,4.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgHQAAgIAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgCACgDIAAgJIgHAAQgFgBgEADg");
	this.shape_2.setTransform(56.525,5.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgFAmIAAhLIALAAIAABLg");
	this.shape_3.setTransform(52.525,4.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgEQgDgFAAgEIALAAQABAEADADQADACADAAQAFgBADgBQACgCAAgDQAAgDgDgBQgCgDgFgBIgKgDQgJgDAAgJQAAgGAGgFQAGgEAHAAQAKAAAGAEQAFAFABAIIgNAAQAAgEgCgCQgDgCgEAAQgDAAgCACQgDABAAADQAAADADACQACABAGABIALAEQAEABACADQACADAAAEQAAAHgGAFQgGAEgKABQgFgBgFgCg");
	this.shape_4.setTransform(46.15,5.15);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgHQAAgIAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgCACgDIAAgJIgHAAQgFgBgEADg");
	this.shape_5.setTransform(40.925,5.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgFAmIAAhLIALAAIAABLg");
	this.shape_6.setTransform(36.925,4.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgPAUQgHgHAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGABQALAAAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAHQgDAFgFACQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_7.setTransform(33.025,5.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAKAmIgPgXIgFAGIAAARIgMAAIAAhLIAMAAIAAArIADgFIAOgPIAOAAIgTAUIAVAgg");
	this.shape_8.setTransform(28.025,4.05);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgBQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_9.setTransform(19.825,5.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgHQAAgIAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgCACgDIAAgJIgHAAQgFgBgEADg");
	this.shape_10.setTransform(14.375,5.15);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgLAjQgFgDgDgEIAFgHQAGAHAIAAQAFAAADgDQADgDAAgGIAAgEQgFAFgHABQgJAAgGgIQgGgHAAgMQAAgMAGgIQAFgIAKABQAIgBAFAHIABgFIAKAAIAAAyQAAALgGAFQgHAHgKgBQgFAAgGgCgAgHgWQgDAEAAAKQAAAHADAEQADAFAFAAQAHAAADgHIAAgWQgDgFgHAAQgFgBgDAFg");
	this.shape_11.setTransform(8.725,6.15);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgBQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_12.setTransform(3.225,5.1);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgPAUQgHgHAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGABQALAAAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAHQgDAFgFACQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_13.setTransform(-2.175,5.15);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgRAeQgFgHAAgNQAAgLAFgIQAGgHAJAAQAIAAAGAGIAAgbIALAAIAABKIgKAAIgBgFQgFAGgJAAQgJAAgGgIgAgHgBQgDADgBAJQABAIADAFQADAFAEgBQAIAAAEgGIAAgWQgEgGgIAAQgEAAgDAFg");
	this.shape_14.setTransform(-7.85,4.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgBQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_15.setTransform(-15.825,5.1);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgHQAAgIAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgCACgDIAAgJIgHAAQgFgBgEADg");
	this.shape_16.setTransform(-21.275,5.15);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgHQAAgIAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgCgEAAQgEAAgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgCACgDIAAgJIgHAAQgFgBgEADg");
	this.shape_17.setTransform(-26.675,5.15);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgRAeQgFgHAAgNQAAgLAFgIQAGgHAKAAQAHAAAFAGIAAgbIAMAAIAABKIgLAAIAAgFQgGAGgHAAQgJAAgHgIgAgHgBQgEADABAJQgBAIAEAFQADAFAEgBQAIAAADgGIAAgWQgDgGgIAAQgEAAgDAFg");
	this.shape_18.setTransform(-32.35,4.1);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgPAUQgHgHAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGABQALAAAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAHQgDAFgFACQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_19.setTransform(-37.675,5.15);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgLAgIAAAFIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAHQAFAIAAALIAAABQAAANgFAGQgGAIgJAAQgJAAgFgGgAgKAAIAAAVQADAIAHgBQAFABADgFQADgEAAgJIAAgBQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_20.setTransform(-43.125,4.1);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IAMAAIAAAGQADgHAHAAIAFABIAAALIgFgBQgIAAgCAHIAAAjg");
	this.shape_21.setTransform(-47.55,5.1);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgPAUQgHgHAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGABQALAAAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgHIAGAHQgDAFgFACQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_22.setTransform(-52.175,5.15);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_23.setTransform(-57.625,6.125);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgFAlIAAg1IALAAIAAA1gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_24.setTransform(69.425,-11.85);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AAKAmIgPgXIgFAFIAAASIgMAAIAAhKIAMAAIAAAqIADgFIAOgQIAOAAIgTAVIAVAgg");
	this.shape_25.setTransform(65.875,-11.95);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgFAlIAAg1IALAAIAAA1gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_26.setTransform(61.675,-11.85);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgFAmIAAhKIALAAIAABKg");
	this.shape_27.setTransform(59.125,-11.95);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgFAlIAAg1IALAAIAAA1gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_28.setTransform(56.575,-11.85);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AAZAbIAAghQAAgGgCgBQgCgDgFAAQgEAAgCACQgDACgBAEIAAAjIgLAAIAAgiQAAgJgJAAQgIAAgCAFIAAAmIgNAAIAAg0IAMAAIAAAFQAGgGAJAAQAKAAAEAIQAGgIAKAAQAJAAAEAFQAEAFABAKIAAAhg");
	this.shape_29.setTransform(50.95,-10.9);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgDAGAAQALgBAFAIQAGAGAAANIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHAAQgKABgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_30.setTransform(43.975,-10.85);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AAZAbIAAghQAAgGgCgBQgCgDgFAAQgEAAgCACQgDACgBAEIAAAjIgLAAIAAgiQAAgJgJAAQgIAAgCAFIAAAmIgNAAIAAg0IAMAAIAAAFQAGgGAJAAQAKAAAEAIQAFgIALAAQAJAAAEAFQAFAFAAAKIAAAhg");
	this.shape_31.setTransform(36.9,-10.9);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgFAlIAAg1IALAAIAAA1gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_32.setTransform(28.775,-11.85);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_33.setTransform(24.725,-10.9);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgFAlIAAg1IALAAIAAA1gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_34.setTransform(20.675,-11.85);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgFQgDgDAAgFIALAAQABAEADADQADABADAAQAGAAACgBQACgCAAgDQAAgDgDgBQgCgCgFgCIgKgDQgJgDAAgIQAAgHAGgFQAGgEAHAAQAKAAAFAEQAHAFAAAIIgNAAQAAgEgCgCQgDgDgEABQgDAAgCABQgDACAAADQAAADADABQACACAGABIALAEQAEACACACQACAEAAADQAAAIgGAEQgGAEgKAAQgFAAgFgCg");
	this.shape_35.setTransform(14.3,-10.85);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAXQAAAGACAFIAAABIgNAAIgBgGQgGAHgHgBQgIAAgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_36.setTransform(9.075,-10.85);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgFAmIAAhKIALAAIAABKg");
	this.shape_37.setTransform(5.075,-11.95);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgDAGAAQALgBAFAIQAGAGAAANIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHAAQgKABgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_38.setTransform(1.175,-10.85);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AAKAmIgPgXIgFAFIAAASIgMAAIAAhKIAMAAIAAAqIADgFIAOgQIAOAAIgTAVIAVAgg");
	this.shape_39.setTransform(-3.825,-11.95);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_40.setTransform(-12.025,-10.9);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAXQAAAGACAFIAAABIgNAAIgBgGQgGAHgHgBQgIAAgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_41.setTransform(-17.475,-10.85);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AAMAbIgMgkIgKAkIgKAAIgPg1IAMAAIAJAkIALgkIAIAAIAKAkIAJgkIALAAIgOA1g");
	this.shape_42.setTransform(-23.95,-10.85);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgDAGAAQALgBAFAIQAGAGAAANIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHAAQgKABgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_43.setTransform(-30.275,-10.85);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AAKAmIAAgjQAAgEgCgDQgDgCgEAAQgGABgEAFIAAAmIgMAAIAAhKIAMAAIAAAcQAGgIAIABQARgBAAATIAAAjg");
	this.shape_44.setTransform(-35.775,-11.95);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAXQAAAGACAFIAAABIgNAAIgBgGQgGAHgHgBQgIAAgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_45.setTransform(-43.725,-10.85);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgQAfQgGgIAAgNQAAgLAGgIQAFgHAJAAQAIAAAGAGIAAgbIALAAIAABKIgLAAIAAgFQgFAGgJAAQgIAAgGgHgAgHgCQgEAEAAAJQAAAJAEAEQADAFAFgBQAHABAEgHIAAgWQgEgGgHAAQgFAAgDAEg");
	this.shape_46.setTransform(-49.4,-11.9);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAXQAAAGACAFIAAABIgNAAIgBgGQgGAHgHgBQgIAAgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_47.setTransform(-54.775,-10.85);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgaAkIAAhHIAbAAQAMAAAHAHQAHAGAAAKQAAALgHAEQgHAGgMAAIgOAAIAAAbgAgNAAIAOAAQAGAAAEgDQADgDAAgGQAAgFgDgEQgEgDgGgBIgOAAg");
	this.shape_48.setTransform(-60.525,-11.75);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_49.setTransform(3.425,-3.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	// Layer_2
	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("rgba(0,0,0,0.227)").s().p("AtJEQIAAofIaTAAIAAIfg");
	this.shape_50.setTransform(-3.525,4.2);

	this.timeline.addTween(cjs.Tween.get(this.shape_50).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-87.7,-31.4,175.4,62.9);


(lib.drag13G3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape.setTransform(109.675,36.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_1.setTransform(105.625,37.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_2.setTransform(101.575,36.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_3.setTransform(95.025,37.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAJIAAAXQAAAHACAEIAAAAIgNAAIgBgFQgGAHgHgBQgIAAgFgEgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFABgEACg");
	this.shape_4.setTransform(89.575,37.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AALAaIgLgjIgKAjIgKAAIgOg0IALAAIAIAkIALgkIAIAAIAMAkIAIgkIAMAAIgPA0g");
	this.shape_5.setTransform(83.1,37.4);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgGAFgEQAGgDAGgBQALAAAFAIQAGAHAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAGQgDAFgFADQgFADgHgBQgKABgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_6.setTransform(76.775,37.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAKAlIAAgiQAAgEgCgDQgDgCgEAAQgGABgEAFIAAAlIgMAAIAAhJIAMAAIAAAcQAGgIAIAAQARAAAAATIAAAig");
	this.shape_7.setTransform(71.275,36.3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAJIAAAXQAAAHACAEIAAAAIgNAAIgBgFQgGAHgHgBQgIAAgFgEgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFABgEACg");
	this.shape_8.setTransform(63.325,37.4);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgRAfQgFgIAAgNQAAgLAFgIQAGgHAKAAQAHAAAFAGIAAgbIAMAAIAABKIgLAAIAAgFQgGAGgHAAQgJAAgHgHgAgHgCQgEAEABAJQgBAIAEAFQADAFAEAAQAIAAADgHIAAgWQgDgGgIAAQgEAAgDAEg");
	this.shape_9.setTransform(57.65,36.35);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAJIAAAXQAAAHACAEIAAAAIgNAAIgBgFQgGAHgHgBQgIAAgFgEgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFABgEACg");
	this.shape_10.setTransform(52.275,37.4);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_11.setTransform(46.825,38.375);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_12.setTransform(40.125,36.4);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAKAlIgPgWIgFAFIAAARIgMAAIAAhJIAMAAIAAAqIADgFIAOgQIAOAAIgTAWIAVAeg");
	this.shape_13.setTransform(36.575,36.3);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_14.setTransform(32.375,36.4);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgFAlIAAhJIALAAIAABJg");
	this.shape_15.setTransform(29.825,36.3);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_16.setTransform(27.275,36.4);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AAaAbIAAghQAAgGgCgBQgDgDgFAAQgEAAgDACQgCADgBADIAAAjIgLAAIAAgiQAAgJgKAAQgHAAgDAFIAAAmIgLAAIAAg0IAKAAIABAFQAFgGALAAQAJAAAEAIQAFgIALAAQAJAAAEAFQAFAFgBAKIAAAhg");
	this.shape_17.setTransform(21.65,37.35);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_18.setTransform(16.025,36.4);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgQAfQgGgIAAgNQAAgLAGgIQAFgHAJAAQAIAAAGAGIAAgbIALAAIAABKIgKAAIgBgFQgFAGgJAAQgIAAgGgHgAgHgCQgEAEAAAJQAAAIAEAFQADAFAFAAQAHAAAEgHIAAgWQgEgGgHAAQgFAAgDAEg");
	this.shape_19.setTransform(11.8,36.35);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgLAjQgFgCgDgEIAFgHQAGAGAIAAQAFAAADgDQADgEAAgGIAAgDQgFAGgHgBQgJABgGgIQgGgIAAgMQAAgMAGgHQAFgIAKAAQAIABAFAGIABgGIAKAAIAAAzQAAAKgGAHQgHAFgKABQgFAAgGgDgAgHgWQgDAFAAAIQAAAIADAFQADAEAFAAQAHAAADgGIAAgWQgDgGgHgBQgFAAgDAFg");
	this.shape_20.setTransform(164.225,22.4);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_21.setTransform(158.725,21.35);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgCACgCIAAgLIgHAAQgFAAgEADg");
	this.shape_22.setTransform(153.275,21.4);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgSAkIAAgJIACAAQAEAAADgBIADgGIACgFIgTgzIANAAIAKAkIALgkIANAAIgVA8QgEANgMAAIgFgBg");
	this.shape_23.setTransform(148.125,22.475);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgLAjQgFgCgDgEIAFgHQAGAGAIAAQAFAAADgDQADgEAAgGIAAgDQgFAGgHgBQgJABgGgIQgGgIAAgMQAAgMAGgHQAFgIAKAAQAIABAFAGIABgGIAKAAIAAAzQAAAKgGAHQgHAFgKABQgFAAgGgDgAgHgWQgDAFAAAIQAAAIADAFQADAEAFAAQAHAAADgGIAAgWQgDgGgHgBQgFAAgDAFg");
	this.shape_24.setTransform(131.875,22.4);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_25.setTransform(126.375,21.35);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgJIAAgiIAMAAIAAAiQAAAJAIABQAIgBADgGIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_26.setTransform(120.825,21.45);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAIQAFAGAAANIAAAAQAAAMgFAHQgGAIgJAAQgJAAgFgHgAgKAAIAAAVQADAIAHAAQAFgBADgEQADgEAAgIIAAgCQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_27.setTransform(115.325,20.35);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgCACgCIAAgLIgHAAQgFAAgEADg");
	this.shape_28.setTransform(109.725,21.4);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgFASIAAgdIgJAAIAAgJIAJAAIAAgMIAKAAIAAAMIAKAAIAAAJIgKAAIAAAdIABAEIAFABIAEAAIAAAJIgIABQgMAAAAgPg");
	this.shape_29.setTransform(105.2,20.825);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_30.setTransform(91.475,20.4);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AAKAlIgPgWIgFAFIAAARIgMAAIAAhJIAMAAIAAAqIADgFIAOgQIAOAAIgTAWIAVAeg");
	this.shape_31.setTransform(87.925,20.3);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgCACgCIAAgLIgHAAQgFAAgEADg");
	this.shape_32.setTransform(82.325,21.4);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AAKAlIgPgWIgFAFIAAARIgMAAIAAhJIAMAAIAAAqIADgFIAOgQIAOAAIgTAWIAVAeg");
	this.shape_33.setTransform(77.325,20.3);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_34.setTransform(62.225,20.4);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IAMAAIAAAGQADgHAHAAIAFABIAAALIgFgBQgIABgCAGIAAAjg");
	this.shape_35.setTransform(59.45,21.35);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgCAFgBQAJAAAGAGQAFAEABAIIAAAYQAAAGACAEIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgCACgCIAAgLIgHAAQgFAAgEADg");
	this.shape_36.setTransform(54.775,21.4);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgRAeQgFgHAAgNQAAgLAFgHQAGgIAKAAQAHAAAFAGIAAgbIAMAAIAABKIgLAAIAAgGQgGAHgHAAQgJAAgHgIgAgHgCQgEAEABAJQgBAIAEAFQADAEAEABQAIgBADgGIAAgWQgDgGgIAAQgEAAgDAEg");
	this.shape_37.setTransform(49.1,20.35);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgCACAAQADAAACACQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_38.setTransform(34.225,20.4);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgLAjQgFgCgDgEIAFgHQAGAGAIAAQAFAAADgDQADgEAAgGIAAgDQgFAGgHgBQgJABgGgIQgGgIAAgMQAAgMAGgHQAFgIAKAAQAIABAFAGIABgGIAKAAIAAAzQAAAKgGAHQgHAFgKABQgFAAgGgDgAgHgWQgDAFAAAIQAAAIADAFQADAEAFAAQAHAAADgGIAAgWQgDgGgHgBQgFAAgDAFg");
	this.shape_39.setTransform(30.025,22.4);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_40.setTransform(24.525,21.35);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgJIAAgiIAMAAIAAAiQAAAJAIABQAIgBADgGIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_41.setTransform(18.975,21.45);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AAQAjIAAgfIgfAAIAAAfIgMAAIAAhGIAMAAIAAAeIAfAAIAAgeIAMAAIAABGg");
	this.shape_42.setTransform(12.625,20.5);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FF8C2D").s().p("AtQkAIahgPIAAIQI6hAOg");
	this.shape_43.setTransform(88.1,28.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	// Layer_2
	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("rgba(0,0,0,0.227)").s().p("AtJEQIAAofIaTAAIAAIfg");
	this.shape_44.setTransform(80.675,36.4);

	this.timeline.addTween(cjs.Tween.get(this.shape_44).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.5,1.5,176.5,62.2);


(lib.drag13G2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape.setTransform(163.325,38.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgSAkIAAgJIACAAQAEAAADgBIADgGIACgFIgTgzIANAAIAKAkIALgkIANAAIgVA8QgEANgMAAIgFgBg");
	this.shape_1.setTransform(158.175,39.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_2.setTransform(152.975,38.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_3.setTransform(147.425,38.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_4.setTransform(143.375,37.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_5.setTransform(139.425,38.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgFAmIAAhLIALAAIAABLg");
	this.shape_6.setTransform(135.425,37);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_7.setTransform(128.975,38.1);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgFASIAAgdIgJAAIAAgJIAJAAIAAgMIALAAIAAAMIAJAAIAAAJIgJAAIAAAdIAAAEIAFABIAEAAIAAAJIgIABQgMAAAAgPg");
	this.shape_8.setTransform(124.45,37.525);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_9.setTransform(120.225,38.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAaAbIAAgiQgBgEgCgCQgCgDgFAAQgEAAgCACQgDADgBADIAAAjIgLAAIAAgiQAAgJgKAAQgHAAgCAFIAAAmIgMAAIAAg0IALAAIAAAGQAGgHAKAAQAJAAAEAIQAGgIAKAAQAJAAAEAFQAEAFABAJIAAAig");
	this.shape_10.setTransform(113.15,38.05);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAIAAIAEABIgBALIgEAAQgIgBgCAHIAAAjg");
	this.shape_11.setTransform(107.3,38.05);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgEAGABQALgBAFAIQAGAGAAANIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgGgDgDQgCgDgFAAQgEAAgDADg");
	this.shape_12.setTransform(102.675,38.1);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgRAfQgFgIAAgNQAAgLAFgIQAGgHAJAAQAIAAAGAGIAAgbIALAAIAABKIgKAAIgBgFQgFAGgJAAQgJAAgGgHgAgHgBQgDADgBAJQABAJADAEQADAFAEgBQAIABAEgHIAAgWQgEgGgIAAQgEAAgDAFg");
	this.shape_13.setTransform(97,37.05);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgRAUQgGgIAAgMIAAAAQAAgHACgHQADgFAGgEQAGgEAGABQAKgBAIAIQAGAGAAAMIAAACQAAAHgDAGQgCAHgGADQgFADgIABQgKgBgHgHgAgIgMQgEAEAAAJQAAAIAEAEQADAFAFAAQAGAAAEgFQACgFAAgIQAAgIgDgEQgDgFgGAAQgFAAgDAFg");
	this.shape_14.setTransform(91.45,38.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_15.setTransform(85.825,38.05);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_16.setTransform(81.775,37.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AAKAmIAAgjQAAgEgCgDQgDgBgEAAQgGAAgEAFIAAAmIgMAAIAAhLIAMAAIAAAdQAGgIAIABQARAAAAASIAAAjg");
	this.shape_17.setTransform(77.725,37);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgPAUQgHgHAAgMIAAgBQAAgMAHgHQAGgHAKAAQAKgBAGAGQAFAFABAJIgLAAQgBgEgDgDQgCgDgFAAQgFAAgDAEQgDAFAAAIIAAABQAAAJADAEQADAEAFAAQAEAAADgCQADgDABgEIALAAQAAAFgDAEQgDAFgFACQgFACgGABQgKAAgGgIg");
	this.shape_18.setTransform(72.425,38.1);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgWAkIAAhGIAtAAIAAAJIghAAIAAAUIAdAAIAAAJIgdAAIAAAWIAhAAIAAAKg");
	this.shape_19.setTransform(67.125,37.2);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_20.setTransform(58.825,38.05);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAWQAAAHACAFIAAABIgNAAIgBgGQgGAHgHAAQgIgBgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_21.setTransform(53.375,38.1);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAMAbIgMgkIgKAkIgKAAIgOg0IALAAIAJAjIAKgjIAIAAIALAjIAJgjIAMAAIgPA0g");
	this.shape_22.setTransform(46.9,38.1);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgEAGABQALgBAFAIQAGAGAAANIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgGgDgDQgCgDgFAAQgEAAgDADg");
	this.shape_23.setTransform(40.575,38.1);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AAKAmIAAgjQAAgEgCgDQgDgBgEAAQgGAAgEAFIAAAmIgMAAIAAhLIAMAAIAAAdQAGgIAIABQARAAAAASIAAAjg");
	this.shape_24.setTransform(35.075,37);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_25.setTransform(28.525,37.1);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgFASIAAgdIgJAAIAAgJIAJAAIAAgMIALAAIAAAMIAJAAIAAAJIgJAAIAAAdIABAEIAEABIAEAAIAAAJIgIABQgMAAAAgPg");
	this.shape_26.setTransform(25.45,37.525);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAHAAIAFABIAAALIgFAAQgIgBgCAHIAAAjg");
	this.shape_27.setTransform(22.4,38.05);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgEAGABQALgBAFAIQAGAGAAANIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgGgDgDQgCgDgFAAQgEAAgDADg");
	this.shape_28.setTransform(17.775,38.1);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_29.setTransform(12.325,39.075);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgEAGABQALgBAFAIQAGAGAAANIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHABQgKAAgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgGgDgDQgCgDgFAAQgEAAgDADg");
	this.shape_30.setTransform(6.775,38.1);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgEQgDgEAAgFIALAAQABAEADADQADACAEAAQAFgBACgBQACgCAAgDQAAgDgDgBQgCgCgFgCIgKgDQgJgDAAgIQAAgHAFgFQAGgEAJAAQAJAAAFAEQAHAFgBAIIgLAAQAAgEgDgCQgCgDgEABQgDAAgDACQgCABAAADQAAADACABQACACAGABIALAEQAEABACADQACAEAAADQAAAIgGAEQgGAEgJABQgGgBgFgCg");
	this.shape_31.setTransform(1.45,38.1);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_32.setTransform(154.675,21.1);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAHAAIAFABIAAALIgFAAQgIAAgCAGIAAAjg");
	this.shape_33.setTransform(151.9,22.05);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgKIAAghIAMAAIAAAhQAAALAIAAQAIAAADgHIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_34.setTransform(147.125,22.15);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgQAfQgGgIAAgNQAAgLAGgIQAFgHAJAAQAIAAAGAGIAAgbIALAAIAABKIgLAAIAAgFQgFAGgJAAQgIAAgGgHgAgHgCQgEAEAAAJQAAAIAEAFQADAFAFAAQAHAAAEgHIAAgWQgEgGgHAAQgFAAgDAEg");
	this.shape_35.setTransform(141.4,21.05);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IAMAAIAAAGQADgHAHAAIAFABIgBALIgEAAQgIAAgCAGIAAAjg");
	this.shape_36.setTransform(137.2,22.05);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgGAFgEQAGgDAGAAQALgBAFAIQAGAHAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFADgHgBQgKABgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_37.setTransform(132.575,22.1);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgLAgIAAAFIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAHQAFAIAAAMIAAAAQAAAMgFAIQgGAHgJAAQgJAAgFgGgAgKAAIAAAWQADAGAHABQAFAAADgFQADgEAAgIIAAgCQAAgJgDgDQgDgEgFAAQgHAAgDAGg");
	this.shape_38.setTransform(127.125,21.05);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AAKAmIAAgjQAAgEgCgDQgDgCgEAAQgGABgEAFIAAAmIgMAAIAAhKIAMAAIAAAcQAGgIAIABQARgBAAATIAAAjg");
	this.shape_39.setTransform(118.925,21);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgKIAAghIAMAAIAAAhQAAALAIAAQAIAAADgHIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_40.setTransform(113.375,22.15);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgLAgIAAAFIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAHQAFAIAAAMIAAAAQAAAMgFAIQgGAHgJAAQgJAAgFgGgAgKAAIAAAWQADAGAHABQAFAAADgFQADgEAAgIIAAgCQAAgJgDgDQgDgEgFAAQgHAAgDAGg");
	this.shape_41.setTransform(107.875,21.05);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgQAWQgFgFAAgKIAAghIAMAAIAAAhQAAALAIAAQAIAAADgHIAAglIAMAAIAAA0IgLAAIgBgFQgFAGgJAAQgIAAgEgFg");
	this.shape_42.setTransform(102.175,22.15);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgGASIAAgdIgIAAIAAgJIAIAAIAAgMIAMAAIAAAMIAJAAIAAAJIgJAAIAAAdIABAEIAEABIAEAAIAAAJIgHABQgNAAgBgPg");
	this.shape_43.setTransform(97.6,21.525);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_44.setTransform(92.275,21.1);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AAKAmIgPgXIgFAFIAAASIgMAAIAAhKIAMAAIAAAqIADgFIAOgQIAOAAIgTAWIAVAfg");
	this.shape_45.setTransform(88.725,21);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_46.setTransform(84.525,21.1);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgFAmIAAhKIALAAIAABKg");
	this.shape_47.setTransform(81.975,21);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_48.setTransform(79.425,21.1);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AAZAbIAAghQAAgGgCgBQgCgDgFAAQgEAAgCACQgDADgBADIAAAjIgLAAIAAgiQAAgJgJAAQgIAAgCAFIAAAmIgNAAIAAg0IAMAAIAAAFQAGgGAJAAQAKAAAEAIQAFgIALAAQAJAAAEAFQAFAFAAAKIAAAhg");
	this.shape_49.setTransform(73.8,22.05);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgGAFgEQAGgDAGAAQALgBAFAIQAGAHAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFADgHgBQgKABgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_50.setTransform(66.825,22.1);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AAZAbIAAghQAAgGgCgBQgCgDgFAAQgEAAgDACQgCADgBADIAAAjIgLAAIAAgiQAAgJgJAAQgIAAgCAFIAAAmIgNAAIAAg0IALAAIABAFQAFgGAKAAQAKAAAEAIQAGgIAKAAQAJAAAEAFQAFAFAAAKIAAAhg");
	this.shape_51.setTransform(59.75,22.05);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_52.setTransform(51.625,21.1);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_53.setTransform(47.575,22.05);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgFAkIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_54.setTransform(43.525,21.1);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_55.setTransform(36.975,22.05);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgFgDgCQgCgCgEgBQgEABgCACQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgCAFAAQAJgBAGAGQAFAEABAIIAAAYQAAAHACAEIAAAAIgNAAIgBgFQgGAHgHgBQgIAAgFgEgAgHAEQgDACAAAEQAAAEACACQADACADAAQADAAADgCQADgBACgEIAAgKIgHAAQgFABgEACg");
	this.shape_56.setTransform(31.525,22.1);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AALAaIgLgjIgKAjIgKAAIgOg0IALAAIAIAkIALgkIAIAAIAMAkIAIgkIAMAAIgPA0g");
	this.shape_57.setTransform(25.05,22.1);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgGAFgEQAGgDAGAAQALgBAFAIQAGAHAAAMIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFADgHgBQgKABgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_58.setTransform(18.725,22.1);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AAQAkIAAggIgfAAIAAAgIgMAAIAAhHIAMAAIAAAeIAfAAIAAgeIAMAAIAABHg");
	this.shape_59.setTransform(12.425,21.2);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_60.setTransform(82.475,29.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	// Layer_2
	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("rgba(0,0,0,0.227)").s().p("AtJEQIAAofIaTAAIAAIfg");
	this.shape_61.setTransform(75.875,36.4);

	this.timeline.addTween(cjs.Tween.get(this.shape_61).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.3,1.5,176.9,62.2);


(lib.drag13G1 = function(mode,startPosition,loop) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape.setTransform(77.175,466.875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgjBDQgOgMgBgUIAZAAQACALAGAHQAHAGAKAAQAMAAAGgJQAHgJAAgOQAAgPgIgIQgGgHgNAAQgHAAgEACQgGABgGAFIgVgFIAJhOIBTAAIAAAWIg9AAIgEAmQALgGAMAAQAXAAAMAOQAMANAAAYQAAAYgOAOQgNAOgYAAQgVAAgOgMg");
	this.shape_1.setTransform(68.2,460.475);

	this.instance = new lib.Tween8_1("synched",0);
	this.instance.setTransform(71.05,460.5,0.0361,0.0648);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_2.setTransform(77.175,404.625);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAMBOIAAgjIhDAAIgBgPIBDhpIAbAAIAABjIATAAIAAAVIgTAAIAAAjgAAKgmIgnA8IApAAIAAhAg");
	this.shape_3.setTransform(67.95,398.125);

	this.instance_1 = new lib.Tween8_1("synched",0);
	this.instance_1.setTransform(71.05,398.25,0.0361,0.0648);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_4.setTransform(77.175,352.525);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AglBEQgOgMAAgUIAaAAQAAALAHAGQAHAHALAAQAMAAAHgHQAHgGAAgNQAAgMgIgHQgHgGgNAAIgQAAIAAgUIAQAAQAMAAAGgGQAIgGAAgMQAAgLgHgGQgFgGgMAAQgKAAgHAGQgGAGAAAKIgaAAQgBgMAHgKQAGgKAMgGQALgFAOAAQAXAAANAMQAOALAAAVQgBALgGAJQgHAJgLAFQANADAHAKQAHAJAAANQAAAVgPANQgOAMgXAAQgWAAgPgMg");
	this.shape_5.setTransform(67.75,346.025);

	this.instance_2 = new lib.Tween8_1("synched",0);
	this.instance_2.setTransform(71.05,346.15,0.0361,0.0648);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_6.setTransform(77.175,294.375);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgyBPIAAgSIAzg5QALgLAFgIQAFgJAAgIQAAgMgGgGQgHgHgJAAQgNAAgHAHQgHAIAAAOIgaAAQAAgPAHgLQAGgMAMgGQAMgGAQAAQAWAAANALQANAMAAAUQAAALgHANQgGAMgPAQIglApIBHAAIAAAVg");
	this.shape_7.setTransform(67.975,287.775);

	this.instance_3 = new lib.Tween8_1("synched",0);
	this.instance_3.setTransform(71.05,288,0.0361,0.0648);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_8.setTransform(77.175,239.975);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAGBOIAAh8IglANIAAgWIA8gWIADAAIAACbg");
	this.shape_9.setTransform(66.725,233.45);

	this.instance_4 = new lib.Tween8_1("synched",0);
	this.instance_4.setTransform(71.05,233.6,0.0361,0.0648);

	this.lima = new lib.drag13G5();
	this.lima.name = "lima";
	this.lima.setTransform(152.3,463.3,0.8086,0.8086,0,0,0,82.2,26.7);

	this.empat = new lib.drag13G4();
	this.empat.name = "empat";
	this.empat.setTransform(151.6,408.5,0.8086,0.8086);

	this.tiga = new lib.drag13G3();
	this.tiga.name = "tiga";
	this.tiga.setTransform(149.55,351.45,0.8086,0.8086,0,0,0,82.2,26.8);

	this.dua = new lib.drag13G2();
	this.dua.name = "dua";
	this.dua.setTransform(154.15,293.25,0.8086,0.8086,0,0,0,82.2,26.8);

	this.satu = new lib.drag13G1();
	this.satu.name = "satu";
	this.satu.setTransform(154.9,240.25,0.8086,0.8086,0,0,0,82.2,26.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.satu},{t:this.dua},{t:this.tiga},{t:this.empat},{t:this.lima},{t:this.instance_4},{t:this.shape_9},{t:this.shape_8},{t:this.instance_3},{t:this.shape_7},{t:this.shape_6},{t:this.instance_2},{t:this.shape_5},{t:this.shape_4},{t:this.instance_1},{t:this.shape_3},{t:this.shape_2},{t:this.instance},{t:this.shape_1},{t:this.shape},{t:this.kotakKartu2},{t:this.kotakKartuSembunyi}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Slots10, new cjs.Rectangle(55.9,218.4,491,428.9), null);


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
	this.lima = new lib.drop13G5();
	this.lima.name = "lima";
	this.lima.setTransform(342.25,468.45,0.4136,0.4136,0,0,0,132.7,51.9);
	new cjs.ButtonHelper(this.lima, 0, 1, 1);

	this.empat = new lib.drop13G4();
	this.empat.name = "empat";
	this.empat.setTransform(342.2,418,0.4136,0.4136,0,0,0,139.8,46.3);
	new cjs.ButtonHelper(this.empat, 0, 1, 1);

	this.tiga = new lib.drop13G3();
	this.tiga.name = "tiga";
	this.tiga.setTransform(342.2,363.6,0.4136,0.4136,0,0,0,133.1,52.5);
	new cjs.ButtonHelper(this.tiga, 0, 1, 1);

	this.dua = new lib.drop13G2();
	this.dua.name = "dua";
	this.dua.setTransform(342.2,299.3,0.4136,0.4136,0,0,0,132.8,57.5);
	new cjs.ButtonHelper(this.dua, 0, 1, 1);

	this.satu = new lib.drop13G1();
	this.satu.name = "satu";
	this.satu.setTransform(342.2,234.75,0.4136,0.4136,0,0,0,124.5,51.6);
	new cjs.ButtonHelper(this.satu, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.satu},{t:this.dua},{t:this.tiga},{t:this.empat},{t:this.lima}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces10, new cjs.Rectangle(277.4,201.3,129.60000000000002,300.9), null);


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
	this.target = new lib.drag13G11();
	this.target.name = "target";
	this.target.setTransform(265.1,383.2,0.926,0.9421,0,0,0,45.1,46.9);
	new cjs.ButtonHelper(this.target, 0, 1, 2, false, new lib.drag13G11(), 3);

	this.target_1 = new lib.drag13G10();
	this.target_1.name = "target_1";
	this.target_1.setTransform(173.25,383.2,0.926,0.9421,0,0,0,45.1,46.9);
	new cjs.ButtonHelper(this.target_1, 0, 1, 1);

	this.target_2 = new lib.drag13G9();
	this.target_2.name = "target_2";
	this.target_2.setTransform(82.8,383.2,0.926,0.9421,0,0,0,45.1,46.9);
	new cjs.ButtonHelper(this.target_2, 0, 1, 1);

	this.huhu = new lib.drag12G12();
	this.huhu.name = "huhu";
	this.huhu.setTransform(450.25,383.2,0.9283,0.9421,0,0,0,45.1,46.9);
	new cjs.ButtonHelper(this.huhu, 0, 1, 1);

	this.huhu_1 = new lib.drag12G11();
	this.huhu_1.name = "huhu_1";
	this.huhu_1.setTransform(358.4,383.2,0.9283,0.9421,0,0,0,45.1,46.9);
	new cjs.ButtonHelper(this.huhu_1, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.huhu_1},{t:this.huhu},{t:this.target_2},{t:this.target_1},{t:this.target}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces1, new cjs.Rectangle(41.1,335.8,450.9,94.89999999999998), null);


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
	this.instance = new lib.flash0aiAssets_2();
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
	this.instance = new lib._20();
	this.instance.setTransform(-244,-254,0.7935,0.7384);

	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_2
	this.instance_1 = new lib.Tween7_1("synched",0);
	this.instance_1.setTransform(42.25,-40.25);
	this.instance_1.alpha = 0;

	this.instance_2 = new lib.Tween8copy_1("synched",0);
	this.instance_2.setTransform(42,-40.25);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true,x:42,alpha:1},12).to({_off:false,x:42.25,alpha:0},12).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:false},12).to({_off:true,x:42.25,alpha:0},12).wait(1));

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
	this.frame_24 = function() {
		this.gotoAndStop(0);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(12).call(this.frame_12).wait(12).call(this.frame_24).wait(1));

	// Layer_5
	this.instance = new lib._11();
	this.instance.setTransform(-205,-259,1.1234,1.1234);

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
	this.frame_24 = function() {
		this.gotoAndStop(0);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(12).call(this.frame_12).wait(12).call(this.frame_24).wait(1));

	// Layer_5
	this.instance = new lib._10();
	this.instance.setTransform(-288,-254);

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

	// Layer_4
	this.lima = new lib.drop13G5();
	this.lima.name = "lima";
	this.lima.setTransform(47.75,97.35,0.6525,0.6525,0,0,0,132.7,51.9);
	new cjs.ButtonHelper(this.lima, 0, 1, 1);

	this.empat = new lib.drop13G4();
	this.empat.name = "empat";
	this.empat.setTransform(-229.55,93.5,0.6525,0.6525,0,0,0,139.8,46.4);
	new cjs.ButtonHelper(this.empat, 0, 1, 1);

	this.tiga = new lib.drop13G3();
	this.tiga.name = "tiga";
	this.tiga.setTransform(321.75,-88.55,0.6525,0.6525,0,0,0,133.1,52.4);
	new cjs.ButtonHelper(this.tiga, 0, 1, 1);

	this.dua = new lib.drop13G2();
	this.dua.name = "dua";
	this.dua.setTransform(49.45,-89.6,0.6525,0.6525,0,0,0,132.8,57.3);
	new cjs.ButtonHelper(this.dua, 0, 1, 1);

	this.satu = new lib.drop13G1();
	this.satu.name = "satu";
	this.satu.setTransform(-229.25,-87.25,0.6525,0.6525,0,0,0,124.5,51.5);
	new cjs.ButtonHelper(this.satu, 0, 1, 1);

	this.lima_1 = new lib.drag13G5();
	this.lima_1.name = "lima_1";
	this.lima_1.setTransform(44.45,36.4,1.2757,1.2757,0,0,0,82.1,26.8);

	this.empat_1 = new lib.drag13G4();
	this.empat_1.name = "empat_1";
	this.empat_1.setTransform(-234.1,48,1.2757,1.2757,0,0,0,-0.1,0);

	this.tiga_1 = new lib.drag13G3();
	this.tiga_1.name = "tiga_1";
	this.tiga_1.setTransform(302.55,-156.85,1.2757,1.2757,0,0,0,82.2,26.8);

	this.dua_1 = new lib.drag13G2();
	this.dua_1.name = "dua_1";
	this.dua_1.setTransform(49.1,-158.55,1.2757,1.2757,0,0,0,82.2,26.8);

	this.satu_1 = new lib.drag13G1();
	this.satu_1.name = "satu_1";
	this.satu_1.setTransform(-228.8,-156.4,1.2757,1.2757,0,0,0,82.1,26.7);

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
	this.target = new lib.drag13G11();
	this.target.name = "target";
	this.target.setTransform(286.15,38.45,2.4775,2.5204,0,0,0,45.1,46.9);
	new cjs.ButtonHelper(this.target, 0, 1, 2, false, new lib.drag13G11(), 3);

	this.target_1 = new lib.drag13G10();
	this.target_1.name = "target_1";
	this.target_1.setTransform(40.5,38.45,2.4775,2.5204,0,0,0,45.1,46.9);
	new cjs.ButtonHelper(this.target_1, 0, 1, 1);

	this.target_2 = new lib.drag13G9();
	this.target_2.name = "target_2";
	this.target_2.setTransform(-201.55,38.45,2.4775,2.5204,0,0,0,45.1,46.9);
	new cjs.ButtonHelper(this.target_2, 0, 1, 1);

	this.drag2G1 = new lib.drag13GJud();
	this.drag2G1.name = "drag2G1";
	this.drag2G1.setTransform(36.3,-145.4,2.369,2.369,0,0,0,98,14.3);
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
	this.exit = new lib.btnEit_1();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);
	this.exit._off = true;

	this.timeline.addTween(cjs.Tween.get(this.exit).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgIAIQgDgDAAgFQAAgDADgEQADgDAFAAQAGAAADADQADAEAAADQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape.setTransform(-257.775,76.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgfBAQgMgLgCgTIASAAQABANAIAGQAHAGALAAQANAAAHgIQAIgJAAgQQAAgPgIgJQgIgIgNAAQgMAAgHAGIgFADIgPgDIAIhKIBKAAIAAASIg7AAIgEAoQALgGANAAQAUAAAMANQALAMAAAXQAAAXgMANQgMANgWAAQgTAAgMgLg");
	this.shape_1.setTransform(-265.825,70.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgIAIQgDgDAAgFQAAgDADgEQADgDAFAAQAGAAADADQADAEAAADQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_2.setTransform(-257.775,27.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAOBKIAAgiIhCAAIAAgLIBBhmIAUAAIAABhIAUAAIAAAQIgUAAIAAAigAAMgrIgrBDIAtAAIAAhHg");
	this.shape_3.setTransform(-266.15,21.425);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgIAIQgDgDAAgFQAAgDADgEQADgDAFAAQAGAAADADQADAEAAADQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_4.setTransform(-257.775,-23.95);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AghBBQgNgMAAgSIATAAQAAAMAIAHQAHAGAMAAQAOAAAHgHQAHgHAAgNQAAgNgIgHQgIgHgOAAIgOAAIAAgOIAOAAQANAAAHgHQAIgHAAgLQAAgagaAAQgLAAgHAHQgIAHAAALIgSAAQAAgRAMgMQANgMATAAQAVAAAMALQALALAAAUQAAAKgGAJQgGAJgLAEQAMADAHAJQAHAJAAANQAAATgNAMQgNAMgVAAQgUAAgNgLg");
	this.shape_5.setTransform(-266.375,-30.325);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgIAIQgDgDAAgFQAAgDADgEQADgDAFAAQAGAAADADQADAEAAADQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_6.setTransform(-257.775,-73.95);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AguBLIAAgOIAyg4QALgMAFgIQAEgIAAgJQAAgLgHgIQgHgHgLAAQgOAAgHAIQgIAIAAAOIgTAAQAAgVANgMQANgNAWAAQAUAAAMALQAMALAAASQAAAWgcAdIgmAqIBJAAIAAAQg");
	this.shape_7.setTransform(-266.075,-80.425);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgIAIQgDgDAAgFQAAgEADgDQADgDAFAAQAGAAADADQADADAAAEQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_8.setTransform(-257.775,-171);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAKBKIAAh8IglAOIAAgRIA1gUIACAAIAACTg");
	this.shape_9.setTransform(-267.45,-177.4);

	this.instance = new lib.RestoreIcon("single",0);
	this.instance.setTransform(-82,-27.3,0.7081,0.7081,0,0,0,-0.1,-0.1);
	this.instance.alpha = 0.75;

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgIBOIAAibIARAAIAACbg");
	this.shape_10.setTransform(-158.775,162.075);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgIBLIAAhtIARAAIAABtgAgIg3QgCgDAAgFQAAgEACgDQADgEAFAAQAGAAACAEQADADAAAEQAAAFgDADQgCADgGAAQgFAAgDgDg");
	this.shape_11.setTransform(-163.85,162.375);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_12.setTransform(-172.075,164.375);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgDA9QgGgHAAgOIAAhDIgUAAIAAgOIAUAAIAAgbIASAAIAAAbIAUAAIAAAOIgUAAIAABDQAAAHADADQACADAHAAIAJgBIAAAPQgIACgHAAQgMAAgGgIg");
	this.shape_13.setTransform(-181.375,163.15);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AggAqQgNgOAAgZIAAgDQAAgQAFgMQAHgNALgHQALgIANAAQAUAAANAOQALAOABAbIAAAGIhKAAQAAARAKAKQAIAJANAAQALAAAGgEQAIgEAEgGIAMAJQgOAVgcAAQgVAAgOgPgAgQggQgJAIgBAPIA2AAIAAgBQgBgPgHgHQgHgIgLAAQgLAAgHAIg");
	this.shape_14.setTransform(-189.7,164.375);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AghA/QgMgPAAgZIAAgCQAAgYAMgPQAMgQATAAQASAAAMANIAAg5IASAAIAACbIgRAAIgBgMQgLAOgTAAQgTAAgMgQgAgTgHQgHAJAAAVQAAATAHAKQAIALANAAQARAAAJgQIAAgxQgJgQgRAAQgNAAgIALg");
	this.shape_15.setTransform(-201.475,162.175);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgtBNIAAiXIARAAIABAMQALgOAUAAQATAAAMAPQALAPAAAaIAAACQAAAYgLAPQgLAQgUAAQgTAAgLgNIAAA1gAgagtIAAA0QAIAOARAAQANAAAIgKQAIgLAAgUQAAgSgIgLQgIgLgNAAQgRAAgIAPg");
	this.shape_16.setTransform(-217.775,166.375);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AghAuQgJgLAAgUIAAhGIATAAIAABGQAAAZATAAQAVAAAHgQIAAhPIATAAIAABtIgSAAIAAgLQgLANgUAAQgSAAgJgKg");
	this.shape_17.setTransform(-229.5,164.475);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgtBNIAAiXIARAAIABAMQALgOAUAAQATAAAMAPQALAPAAAaIAAACQAAAYgLAPQgLAQgUAAQgTAAgLgNIAAA1gAgagtIAAA0QAIAOARAAQANAAAIgKQAIgLAAgUQAAgSgIgLQgIgLgNAAQgRAAgIAPg");
	this.shape_18.setTransform(344.825,120.775);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgjApQgOgPAAgaIAAAAQAAgQAHgNQAGgNALgHQAMgHANAAQAXAAANAQQAOAPAAAZIAAABQAAAQgGANQgHANgLAHQgLAHgPAAQgVAAgOgQgAgVgdQgJALAAATQAAASAJALQAIALANAAQAPAAAIgLQAIgLAAgTQAAgSgIgLQgJgLgOAAQgNAAgIALg");
	this.shape_19.setTransform(332.9,118.775);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgtBNIAAiXIARAAIABAMQALgOAUAAQATAAAMAPQALAPAAAaIAAACQAAAYgLAPQgLAQgUAAQgTAAgLgNIAAA1gAgagtIAAA0QAIAOARAAQANAAAIgKQAIgLAAgUQAAgSgIgLQgIgLgNAAQgRAAgIAPg");
	this.shape_20.setTransform(321.425,120.775);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_21.setTransform(302.775,118.675);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_22.setTransform(291.375,118.775);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AAXBOIglgzIgMAMIAAAnIgSAAIAAibIASAAIAABdIAKgMIAhgjIAXAAIgpAtIAuBAg");
	this.shape_23.setTransform(281.275,116.475);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgIBOIAAibIARAAIAACbg");
	this.shape_24.setTransform(272.725,116.475);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AghAuQgJgLAAgUIAAhGIATAAIAABGQgBAZAVAAQAUAAAHgQIAAhPIATAAIAABtIgSAAIAAgLQgLANgUAAQgSAAgJgKg");
	this.shape_25.setTransform(264.5,118.875);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AggAqQgNgPAAgaIAAgCQAAgQAGgNQAFgMAMgHQAKgHAPAAQASAAAMALQAMALABASIgSAAQgBgLgGgHQgIgGgKAAQgOAAgIAKQgHAKgBAUIAAACQABATAHAKQAIAKAOAAQAJAAAIgGQAIgGAAgJIASAAQgBAKgFAIQgHAJgJAFQgLAFgKAAQgWAAgNgPg");
	this.shape_26.setTransform(253.6,118.775);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_27.setTransform(242.375,118.675);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AghAuQgJgLAAgUIAAhGIATAAIAABGQAAAZATAAQAVAAAHgQIAAhPIATAAIAABtIgSAAIAAgLQgLANgUAAQgSAAgJgKg");
	this.shape_28.setTransform(230.95,118.875);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AA6A4IAAhIQAAgLgFgGQgGgGgMAAQgLAAgHAGQgGAHgCAKIAABIIgRAAIAAhHQAAgYgYAAQgSAAgHAQIAABPIgTAAIAAhtIASAAIABAMQAMgOAUAAQAXAAAHASQAGgIAJgFQAIgFAMAAQAkAAABAmIAABJg");
	this.shape_29.setTransform(216.175,118.675);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AggAqQgNgOAAgZIAAgDQAAgQAFgMQAHgNALgHQALgIANAAQAUAAANAOQALAOABAbIAAAGIhKAAQAAARAKAKQAIAJANAAQALAAAGgEQAIgEAEgGIAMAJQgOAVgcAAQgVAAgOgPgAgQggQgJAIgBAPIA2AAIAAgBQgBgPgHgHQgHgIgLAAQgLAAgHAIg");
	this.shape_30.setTransform(201.8,118.775);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AA6A4IAAhIQAAgLgFgGQgGgGgMAAQgLAAgHAGQgGAHgCAKIAABIIgRAAIAAhHQAAgYgYAAQgSAAgHAQIAABPIgTAAIAAhtIASAAIABAMQAMgOAUAAQAXAAAHASQAGgIAJgFQAIgFAMAAQAkAAABAmIAABJg");
	this.shape_31.setTransform(187.175,118.675);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAXBOIglgzIgMAMIAAAnIgSAAIAAibIASAAIAABdIAKgMIAhgjIAXAAIgpAtIAuBAg");
	this.shape_32.setTransform(166.625,116.475);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AghAuQgJgLAAgUIAAhGIASAAIAABGQAAAZAVAAQAUAAAIgQIAAhPIASAAIAABtIgSAAIAAgLQgLANgVAAQgRAAgJgKg");
	this.shape_33.setTransform(154.95,118.875);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgDA9QgGgHAAgOIAAhDIgUAAIAAgOIAUAAIAAgbIASAAIAAAbIAUAAIAAAOIgUAAIAABDQAAAGADAEQACADAHAAIAJgBIAAAPQgIACgHAAQgMAAgGgIg");
	this.shape_34.setTransform(145.625,117.55);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_35.setTransform(136.875,118.675);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AghAuQgJgLAAgUIAAhGIATAAIAABGQgBAZAVAAQAUAAAHgQIAAhPIATAAIAABtIgSAAIAAgLQgLANgUAAQgSAAgJgKg");
	this.shape_36.setTransform(125.45,118.875);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_37.setTransform(107.125,118.775);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AggBNIgHgCIAAgPIAFABQAJAAAGgEQAFgEADgKIAFgLIgohsIAVAAIAaBRIAahRIAUAAIgsB+QgJAbgXAAg");
	this.shape_38.setTransform(96.525,120.975);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_39.setTransform(85.975,118.675);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AAYBOIAAhJQAAgLgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAHIAABOIgTAAIAAibIATAAIAAA8QAMgQATAAQAjAAAAAmIAABJg");
	this.shape_40.setTransform(74.575,116.475);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_41.setTransform(63.175,118.775);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AAaA3IgahSIgZBSIgQAAIgfhtIASAAIAWBRIAZhRIAOAAIAaBTIAVhTIATAAIggBtg");
	this.shape_42.setTransform(49.775,118.775);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_43.setTransform(36.325,118.775);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgbBAIgBANIgRAAIAAibIATAAIAAA6QALgOASAAQAUAAAMAPQALAPAAAaIAAABQAAAZgLAQQgMAPgTAAQgUAAgLgPgAgagBIAAAvQAIARASAAQAMAAAIgLQAHgKAAgVQABgTgIgJQgHgLgNAAQgTAAgHARg");
	this.shape_44.setTransform(25.15,116.575);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgJBLIAAhtIASAAIAABtgAgIg3QgCgDAAgFQAAgEACgDQADgEAFAAQAFAAADAEQADADAAAEQAAAFgDADQgDADgFAAQgFAAgDgDg");
	this.shape_45.setTransform(16.55,116.775);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AghA/QgMgPAAgZIAAgCQAAgYAMgPQAMgQATAAQASAAAMANIAAg5IASAAIAACbIgRAAIgBgMQgLAOgTAAQgTAAgMgQgAgTgHQgHAJAAAVQAAATAHAKQAIALANAAQARAAAJgQIAAgxQgJgQgRAAQgNAAgIALg");
	this.shape_46.setTransform(7.875,116.575);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_47.setTransform(-10.325,118.675);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_48.setTransform(-21.725,118.775);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AAaA3IgahSIgZBSIgQAAIgfhtIASAAIAWBRIAZhRIAOAAIAaBTIAVhTIATAAIggBtg");
	this.shape_49.setTransform(-35.075,118.775);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgfAqQgPgOAAgZIAAgDQABgQAFgMQAHgNALgHQALgIANAAQAUAAAMAOQANAOAAAbIAAAGIhKAAQABARAIAKQAKAJAMAAQAKAAAIgEQAGgEAFgGIAMAJQgOAVgbAAQgWAAgNgPgAgQggQgIAIgDAPIA3AAIAAgBQgBgPgHgHQgHgIgLAAQgLAAgHAIg");
	this.shape_50.setTransform(-48.15,118.775);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AAYBOIAAhJQAAgLgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAHIAABOIgTAAIAAibIATAAIAAA8QAMgQATAAQAjAAAAAmIAABJg");
	this.shape_51.setTransform(-59.425,116.475);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgfAqQgPgOAAgZIAAgDQABgQAFgMQAHgNALgHQALgIANAAQAUAAAMAOQANAOAAAbIAAAGIhKAAQABARAIAKQAKAJAMAAQAKAAAIgEQAGgEAFgGIAMAJQgOAVgbAAQgWAAgNgPgAgQggQgIAIgDAPIA3AAIAAgBQgBgPgHgHQgHgIgLAAQgLAAgHAIg");
	this.shape_52.setTransform(-77.4,118.775);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgWBIQgLgFgGgJIAJgLQAMAPASAAQAMAAAIgIQAIgHAAgOIAAgKQgMANgSAAQgTAAgMgPQgMgQAAgZQAAgaAMgPQAMgPATAAQATAAALAOIABgMIARAAIAABqQAAAVgMAMQgNAMgVAAQgLAAgLgFgAgTgyQgHALAAAVQAAASAHAKQAIAKANAAQARAAAJgQIAAgxQgJgPgRAAQgNAAgIAKg");
	this.shape_53.setTransform(-89.025,120.825);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_54.setTransform(-100.275,118.675);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_55.setTransform(-111.675,118.775);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgZA4IAAhtIASAAIAAANQAJgPARAAQAFAAADACIAAARIgJgBQgSAAgHAQIAABNg");
	this.shape_56.setTransform(-120.3,118.675);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgjApQgOgPAAgaIAAAAQAAgQAGgNQAHgNALgHQAMgHANAAQAWAAAOAQQAOAPAAAZIAAABQAAAQgGANQgHANgLAHQgLAHgPAAQgVAAgOgQgAgVgdQgJALAAATQAAASAJALQAIALANAAQAPAAAIgLQAIgLAAgTQAAgSgIgLQgJgLgOAAQgNAAgIALg");
	this.shape_57.setTransform(-130.25,118.775);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AAXBOIglgzIgMAMIAAAnIgSAAIAAibIASAAIAABdIAKgMIAhgjIAXAAIgpAtIAuBAg");
	this.shape_58.setTransform(-147.575,116.475);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_59.setTransform(-159.225,118.775);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgDA9QgGgHAAgOIAAhDIgUAAIAAgOIAUAAIAAgbIASAAIAAAbIAUAAIAAAOIgUAAIAABDQAAAGADAEQACADAHAAIAJgBIAAAPQgIACgHAAQgMAAgGgIg");
	this.shape_60.setTransform(-168.525,117.55);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgjApQgOgPAAgaIAAAAQAAgQAGgNQAHgNALgHQAMgHANAAQAWAAAOAQQAOAPAAAZIAAABQAAAQgGANQgHANgLAHQgLAHgPAAQgVAAgOgQgAgVgdQgJALAAATQAAASAJALQAIALANAAQAPAAAIgLQAIgLAAgTQAAgSgIgLQgJgLgOAAQgNAAgIALg");
	this.shape_61.setTransform(-177.5,118.775);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AAXBOIglgzIgMAMIAAAnIgSAAIAAibIASAAIAABdIAKgMIAhgjIAXAAIgpAtIAuBAg");
	this.shape_62.setTransform(-187.875,116.475);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_63.setTransform(-206.475,118.675);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_64.setTransform(-217.875,118.775);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AghA/QgMgPAAgZIAAgCQAAgYAMgPQAMgQATAAQASAAAMANIAAg5IASAAIAACbIgRAAIgBgMQgLAOgTAAQgTAAgMgQgAgTgHQgHAJAAAVQAAATAHAKQAIALANAAQARAAAJgQIAAgxQgJgQgRAAQgNAAgIALg");
	this.shape_65.setTransform(-229.625,116.575);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_66.setTransform(344.975,73.075);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_67.setTransform(333.575,73.175);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AAaA3IgahSIgZBSIgQAAIgfhtIASAAIAWBRIAZhRIAOAAIAaBTIAVhTIATAAIggBtg");
	this.shape_68.setTransform(320.175,73.175);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AggAqQgNgOAAgZIAAgDQAAgQAFgMQAHgNALgHQALgIANAAQAUAAANAOQALAOABAbIAAAGIhKAAQAAARAKAKQAIAJANAAQALAAAGgEQAIgEAEgGIAMAJQgOAVgcAAQgVAAgOgPgAgQggQgJAIgBAPIA2AAIAAgBQgBgPgHgHQgHgIgLAAQgLAAgHAIg");
	this.shape_69.setTransform(307.1,73.175);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AAYBOIAAhJQAAgLgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAHIAABOIgTAAIAAibIATAAIAAA8QAMgQATAAQAjAAAAAmIAABJg");
	this.shape_70.setTransform(295.825,70.875);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgIBLIAAhtIARAAIAABtgAgHg3QgDgDAAgFQAAgEADgDQADgEAEAAQAGAAACAEQADADAAAEQAAAFgDADQgCADgGAAQgEAAgDgDg");
	this.shape_71.setTransform(281.35,71.175);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AA6A4IAAhIQAAgLgFgGQgGgGgMAAQgLAAgHAGQgGAHgCAKIAABIIgRAAIAAhHQAAgYgYAAQgSAAgHAQIAABPIgTAAIAAhtIASAAIABAMQAMgOAUAAQAXAAAHASQAGgIAJgFQAIgFAMAAQAkAAABAmIAABJg");
	this.shape_72.setTransform(269.725,73.075);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgjApQgOgPAAgaIAAAAQAAgQAGgNQAHgNALgHQALgHAOAAQAWAAAOAQQAOAPAAAZIAAABQAAAQgGANQgGANgMAHQgLAHgPAAQgVAAgOgQgAgVgdQgJALAAATQAAASAJALQAIALANAAQAOAAAJgLQAIgLAAgTQAAgSgIgLQgJgLgOAAQgNAAgIALg");
	this.shape_73.setTransform(254.75,73.175);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgDA+QgGgIAAgOIAAhDIgUAAIAAgPIAUAAIAAgaIASAAIAAAaIAUAAIAAAPIgUAAIAABDQAAAGADAEQACADAHAAIAJgBIAAAPQgIACgHAAQgMAAgGgHg");
	this.shape_74.setTransform(245.175,71.95);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_75.setTransform(236.475,73.175);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_76.setTransform(225.175,73.075);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_77.setTransform(213.775,73.175);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_78.setTransform(196.225,73.075);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_79.setTransform(184.825,73.175);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AghA/QgMgPAAgZIAAgCQAAgYAMgPQAMgQATAAQASAAAMANIAAg5IASAAIAACbIgRAAIgBgMQgLAOgTAAQgTAAgMgQgAgTgHQgHAJAAAVQAAATAHAKQAIALANAAQARAAAJgQIAAgxQgJgQgRAAQgNAAgIALg");
	this.shape_80.setTransform(173.075,70.975);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgJBLIAAhtIASAAIAABtgAgIg3QgCgDAAgFQAAgEACgDQADgEAFAAQAFAAADAEQADADAAAEQAAAFgDADQgDADgFAAQgFAAgDgDg");
	this.shape_81.setTransform(158.75,71.175);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgWBIQgLgFgGgJIAJgLQAMAPASAAQAMAAAIgIQAIgHAAgOIAAgKQgMANgSAAQgTAAgMgPQgMgQAAgZQAAgaAMgPQAMgPATAAQATAAALAOIABgMIARAAIAABqQAAAVgMAMQgNAMgVAAQgLAAgLgFgAgTgyQgHALAAAVQAAASAHAKQAIAKANAAQARAAAJgQIAAgxQgJgPgRAAQgNAAgIAKg");
	this.shape_82.setTransform(150.175,75.225);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgjApQgOgPAAgaIAAAAQAAgQAHgNQAGgNALgHQALgHAOAAQAXAAANAQQAOAPAAAZIAAABQAAAQgGANQgHANgKAHQgMAHgPAAQgVAAgOgQgAgWgdQgIALAAATQAAASAIALQAJALANAAQAOAAAJgLQAIgLAAgTQAAgSgJgLQgIgLgOAAQgNAAgJALg");
	this.shape_83.setTransform(138.7,73.175);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgIBOIAAibIARAAIAACbg");
	this.shape_84.setTransform(130.225,70.875);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgjApQgOgPAAgaIAAAAQAAgQAGgNQAHgNALgHQALgHAOAAQAWAAAOAQQAOAPAAAZIAAABQAAAQgGANQgGANgLAHQgMAHgPAAQgVAAgOgQgAgWgdQgIALAAATQAAASAIALQAJALANAAQAOAAAJgLQAIgLAAgTQAAgSgJgLQgIgLgOAAQgNAAgJALg");
	this.shape_85.setTransform(121.8,73.175);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgPBPIAAheIgRAAIAAgPIARAAIAAgLQAAgSAKgJQAIgKARAAQAHAAAGACIgBAPIgKgBQgJAAgFAFQgFAGAAAKIAAALIAXAAIAAAPIgXAAIAABeg");
	this.shape_86.setTransform(112.675,70.775);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AgZA4IAAhtIASAAIAAANQAIgPASAAQAFAAACACIAAARIgJgBQgRAAgGAQIAABNg");
	this.shape_87.setTransform(105.75,73.075);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AgjApQgOgPAAgaIAAAAQAAgQAGgNQAHgNALgHQALgHAOAAQAWAAAOAQQAOAPAAAZIAAABQAAAQgGANQgGANgLAHQgMAHgPAAQgVAAgOgQgAgWgdQgIALAAATQAAASAIALQAJALANAAQAPAAAIgLQAIgLAAgTQAAgSgJgLQgIgLgOAAQgNAAgJALg");
	this.shape_88.setTransform(95.8,73.175);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AA6A4IAAhIQAAgLgFgGQgGgGgMAAQgLAAgHAGQgGAHgCAKIAABIIgRAAIAAhHQAAgYgYAAQgSAAgHAQIAABPIgTAAIAAhtIASAAIABAMQAMgOAUAAQAXAAAHASQAGgIAJgFQAIgFAMAAQAkAAABAmIAABJg");
	this.shape_89.setTransform(80.825,73.075);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_90.setTransform(59.875,73.075);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_91.setTransform(48.475,73.175);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AgJBLIAAhtIASAAIAABtgAgIg3QgCgDAAgFQAAgEACgDQAEgEAEAAQAFAAADAEQADADAAAEQAAAFgDADQgDADgFAAQgEAAgEgDg");
	this.shape_92.setTransform(40.3,71.175);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgWBIQgLgFgGgJIAJgLQAMAPASAAQAMAAAIgIQAIgHAAgOIAAgKQgMANgSAAQgTAAgMgPQgMgQAAgZQAAgaAMgPQAMgPATAAQATAAALAOIABgMIARAAIAABqQAAAVgMAMQgNAMgVAAQgLAAgLgFgAgTgyQgHALAAAVQAAASAHAKQAIAKANAAQARAAAJgQIAAgxQgJgPgRAAQgNAAgIAKg");
	this.shape_93.setTransform(31.725,75.225);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_94.setTransform(20.475,73.175);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AgbBAIgBANIgRAAIAAibIATAAIAAA6QALgOASAAQAVAAALAPQALAPAAAaIAAABQAAAZgLAQQgMAPgTAAQgUAAgLgPgAgagBIAAAvQAIARASAAQAMAAAIgLQAHgKABgVQAAgTgIgJQgHgLgNAAQgTAAgHARg");
	this.shape_95.setTransform(9.3,70.975);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_96.setTransform(-8.625,73.175);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AghA/QgMgPAAgZIAAgCQAAgYAMgPQAMgQATAAQASAAAMANIAAg5IASAAIAACbIgRAAIgBgMQgLAOgTAAQgTAAgMgQgAgTgHQgHAJAAAVQAAATAHAKQAIALANAAQARAAAJgQIAAgxQgJgQgRAAQgNAAgIALg");
	this.shape_97.setTransform(-20.425,70.975);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_98.setTransform(-31.625,73.175);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AgtBNIAAiXIARAAIABAMQALgOAUAAQATAAAMAPQALAPAAAaIAAACQAAAYgLAPQgLAQgUAAQgTAAgLgNIAAA1gAgagtIAAA0QAIAOARAAQANAAAIgKQAIgLAAgUQAAgSgIgLQgIgLgNAAQgRAAgIAPg");
	this.shape_99.setTransform(-42.875,75.175);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_100.setTransform(-60.775,73.075);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_101.setTransform(-72.175,73.175);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AAaA3IgahSIgZBSIgQAAIgfhtIASAAIAWBRIAZhRIAOAAIAaBTIAVhTIATAAIggBtg");
	this.shape_102.setTransform(-85.575,73.175);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AggAqQgOgOABgZIAAgDQAAgQAFgMQAHgNALgHQALgIAMAAQAWAAAMAOQAMAOgBAbIAAAGIhJAAQAAARAKAKQAJAJAMAAQALAAAGgEQAHgEAGgGIALAJQgOAVgcAAQgUAAgPgPgAgRggQgIAIgBAPIA1AAIAAgBQAAgPgHgHQgHgIgMAAQgKAAgIAIg");
	this.shape_103.setTransform(-98.6,73.175);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AAYBOIAAhJQAAgLgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAHIAABOIgTAAIAAibIATAAIAAA8QAMgQATAAQAjAAAAAmIAABJg");
	this.shape_104.setTransform(-109.875,70.875);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AAXBOIglgzIgMAMIAAAnIgSAAIAAibIASAAIAABdIAKgMIAhgjIAXAAIgpAtIAuBAg");
	this.shape_105.setTransform(-126.325,70.875);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_106.setTransform(-137.975,73.175);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AgDA+QgGgIAAgOIAAhDIgUAAIAAgPIAUAAIAAgaIASAAIAAAaIAUAAIAAAPIgUAAIAABDQAAAGADAEQACADAHAAIAJgBIAAAPQgIACgHAAQgMAAgGgHg");
	this.shape_107.setTransform(-147.275,71.95);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgjApQgOgPAAgaIAAAAQAAgQAHgNQAGgNALgHQAMgHANAAQAXAAANAQQAOAPAAAZIAAABQAAAQgGANQgHANgLAHQgLAHgPAAQgVAAgOgQgAgVgdQgJALAAATQAAASAJALQAIALANAAQAPAAAIgLQAIgLAAgTQAAgSgIgLQgJgLgOAAQgNAAgIALg");
	this.shape_108.setTransform(-156.25,73.175);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AAXBOIglgzIgMAMIAAAnIgSAAIAAibIASAAIAABdIAKgMIAhgjIAXAAIgpAtIAuBAg");
	this.shape_109.setTransform(-166.625,70.875);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_110.setTransform(-184.525,73.075);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_111.setTransform(-195.925,73.175);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AAXBOIglgzIgMAMIAAAnIgSAAIAAibIASAAIAABdIAKgMIAhgjIAXAAIgpAtIAuBAg");
	this.shape_112.setTransform(-206.025,70.875);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AggAqQgOgOABgZIAAgDQgBgQAHgMQAGgNALgHQALgIAMAAQAWAAAMAOQAMAOgBAbIAAAGIhJAAQAAARAJAKQAKAJANAAQAJAAAHgEQAHgEAGgGIALAJQgOAVgcAAQgVAAgOgPgAgRggQgHAIgDAPIA2AAIAAgBQAAgPgHgHQgHgIgMAAQgKAAgIAIg");
	this.shape_113.setTransform(-217.3,73.175);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AgJBKIAAiDIgvAAIAAgQIBxAAIAAAQIgwAAIAACDg");
	this.shape_114.setTransform(-229,71.275);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_115.setTransform(182.675,23.325);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_116.setTransform(171.275,23.425);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_117.setTransform(159.975,23.325);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_118.setTransform(148.575,23.425);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AAXBOIglgzIgMAMIAAAnIgSAAIAAibIASAAIAABdIAKgMIAhgjIAXAAIgpAtIAuBAg");
	this.shape_119.setTransform(138.475,21.125);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AgVA0QgKgFgFgIQgHgIAAgKIATAAQABAJAHAGQAHAFAKAAQALAAAGgEQAHgEAAgHQAAgIgGgEQgFgEgOgDQgOgDgIgEQgJgEgEgGQgDgGAAgIQgBgNAMgJQALgKARAAQASAAAMAKQAMAJAAAPIgTAAQAAgHgGgGQgHgFgKAAQgKAAgFAEQgGAFAAAHQAAAGAFAEQAGADANADQAOAEAJAEQAIADAEAHQAFAGAAAIQAAAPgMAJQgMAJgTAAQgLAAgLgFg");
	this.shape_120.setTransform(121.9,23.425);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_121.setTransform(110.975,23.425);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AgDA+QgGgIAAgOIAAhDIgUAAIAAgPIAUAAIAAgaIASAAIAAAaIAUAAIAAAPIgUAAIAABDQAAAHADADQACADAHAAIAJgBIAAAPQgIACgHAAQgMAAgGgHg");
	this.shape_122.setTransform(101.675,22.2);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_123.setTransform(92.925,23.425);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AAXBOIglgzIgMAMIAAAnIgSAAIAAibIASAAIAABdIAKgMIAhgjIAXAAIgpAtIAuBAg");
	this.shape_124.setTransform(77.625,21.125);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_125.setTransform(65.975,23.425);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AgDA+QgGgIAAgOIAAhDIgUAAIAAgPIAUAAIAAgaIASAAIAAAaIAUAAIAAAPIgUAAIAABDQAAAHADADQACADAHAAIAJgBIAAAPQgIACgHAAQgMAAgGgHg");
	this.shape_126.setTransform(56.675,22.2);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AgjApQgOgPAAgaIAAAAQAAgQAHgNQAGgNALgHQAMgHANAAQAXAAANAQQAOAPAAAZIAAABQAAAQgGANQgHANgLAHQgLAHgPAAQgVAAgOgQgAgVgdQgJALAAATQAAASAJALQAIALANAAQAOAAAJgLQAIgLAAgTQAAgSgIgLQgJgLgOAAQgNAAgIALg");
	this.shape_127.setTransform(47.7,23.425);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AAXBOIglgzIgMAMIAAAnIgSAAIAAibIASAAIAABdIAKgMIAhgjIAXAAIgpAtIAuBAg");
	this.shape_128.setTransform(37.325,21.125);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_129.setTransform(20.475,23.425);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AghA/QgMgPAAgZIAAgCQAAgYAMgPQAMgQATAAQASAAAMANIAAg5IASAAIAACbIgRAAIgBgMQgLAOgTAAQgTAAgMgQgAgTgHQgHAJAAAVQAAATAHAKQAIALANAAQARAAAJgQIAAgxQgJgQgRAAQgNAAgIALg");
	this.shape_130.setTransform(8.725,21.225);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_131.setTransform(-2.525,23.425);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("AgtBNIAAiXIARAAIABAMQALgOAUAAQATAAAMAPQALAPAAAaIAAACQAAAYgLAPQgLAQgUAAQgTAAgLgNIAAA1gAgagtIAAA0QAIAOARAAQANAAAIgKQAIgLAAgUQAAgSgIgLQgIgLgNAAQgRAAgIAPg");
	this.shape_132.setTransform(-13.725,25.425);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_133.setTransform(-30.625,23.325);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_134.setTransform(-42.025,23.425);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("AAXBOIglgzIgMAMIAAAnIgSAAIAAibIASAAIAABdIAKgMIAhgjIAXAAIgpAtIAuBAg");
	this.shape_135.setTransform(-52.125,21.125);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("AAXBOIglgzIgMAMIAAAnIgSAAIAAibIASAAIAABdIAKgMIAhgjIAXAAIgpAtIAuBAg");
	this.shape_136.setTransform(-62.575,21.125);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("AghAuQgJgLAAgUIAAhGIATAAIAABGQAAAZATAAQAVAAAHgQIAAhPIATAAIAABtIgSAAIAAgLQgLANgUAAQgSAAgJgKg");
	this.shape_137.setTransform(-74.25,23.525);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AgUBfIAAgPIAJABQAGAAADgDQADgEAAgIIAAh6IASAAIAAB5QAAAggbAAQgHAAgFgCgAABhNQgBgDAAgFQAAgEABgDQADgEAGAAQAFAAADAEQADADAAAEQAAAFgDADQgDADgFAAQgGAAgDgDg");
	this.shape_138.setTransform(-83.525,23.625);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_139.setTransform(-90.625,23.325);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("AghAuQgJgLAAgUIAAhGIATAAIAABGQAAAZATAAQAVAAAHgQIAAhPIATAAIAABtIgSAAIAAgLQgLANgUAAQgSAAgJgKg");
	this.shape_140.setTransform(-102.05,23.525);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("AgDA+QgGgIAAgOIAAhDIgUAAIAAgPIAUAAIAAgaIASAAIAAAaIAUAAIAAAPIgUAAIAABDQAAAHADADQACADAHAAIAJgBIAAAPQgIACgHAAQgMAAgGgHg");
	this.shape_141.setTransform(-111.425,22.2);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("AgJBLIAAhtIASAAIAABtgAgHg3QgDgDAAgFQAAgEADgDQADgEAEAAQAFAAADAEQADADAAAEQAAAFgDADQgDADgFAAQgEAAgDgDg");
	this.shape_142.setTransform(-117,21.425);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("AghA/QgMgPAAgZIAAgCQAAgYAMgPQAMgQATAAQASAAAMANIAAg5IASAAIAACbIgRAAIgBgMQgLAOgTAAQgTAAgMgQgAgTgHQgHAJAAAVQAAATAHAKQAIALANAAQARAAAJgQIAAgxQgJgQgRAAQgNAAgIALg");
	this.shape_143.setTransform(-125.675,21.225);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("AgfAqQgPgOAAgZIAAgDQABgQAFgMQAHgNALgHQALgIANAAQAUAAAMAOQANAOAAAbIAAAGIhKAAQABARAIAKQAKAJAMAAQAKAAAIgEQAGgEAFgGIAMAJQgOAVgbAAQgWAAgNgPgAgQggQgIAIgDAPIA3AAIAAgBQgBgPgHgHQgHgIgLAAQgLAAgHAIg");
	this.shape_144.setTransform(-141.75,23.425);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("AA6A4IAAhIQAAgLgFgGQgGgGgMAAQgLAAgHAGQgGAHgCAKIAABIIgRAAIAAhHQAAgYgYAAQgSAAgHAQIAABPIgTAAIAAhtIASAAIABAMQAMgOAUAAQAXAAAHASQAGgIAJgFQAIgFAMAAQAkAAABAmIAABJg");
	this.shape_145.setTransform(-156.375,23.325);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_146.setTransform(-171.125,23.425);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFFFF").s().p("AgWBIQgLgFgGgJIAJgLQAMAPASAAQAMAAAIgIQAIgHAAgOIAAgKQgMANgSAAQgTAAgMgPQgMgQAAgZQAAgaAMgPQAMgPATAAQATAAALAOIABgMIARAAIAABqQAAAVgMAMQgNAMgVAAQgLAAgLgFgAgTgyQgHALAAAVQAAASAHAKQAIAKANAAQARAAAJgQIAAgxQgJgPgRAAQgNAAgIAKg");
	this.shape_147.setTransform(-182.775,25.475);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFFF").s().p("AgZA4IAAhtIASAAIAAANQAIgPASAAQAFAAADACIAAARIgJgBQgSAAgGAQIAABNg");
	this.shape_148.setTransform(-196.55,23.325);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("AgjApQgOgPAAgaIAAAAQAAgQAGgNQAHgNALgHQALgHAOAAQAWAAAOAQQAOAPAAAZIAAABQAAAQgGANQgGANgMAHQgLAHgPAAQgVAAgOgQgAgVgdQgJALAAATQAAASAJALQAIALANAAQAOAAAJgLQAIgLAAgTQAAgSgIgLQgJgLgOAAQgNAAgIALg");
	this.shape_149.setTransform(-206.5,23.425);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("AAXBOIglgzIgMAMIAAAnIgSAAIAAibIASAAIAABdIAKgMIAhgjIAXAAIgpAtIAuBAg");
	this.shape_150.setTransform(-216.925,21.125);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("AgZBGQgNgGgHgKQgIgKABgNIATAAQAAANAKAIQAKAIAQAAQAOAAAJgGQAIgHAAgKQAAgLgIgGQgHgGgTgGQgZgHgMgKQgKgKgBgPQAAgSAOgLQAOgMAWAAQAPAAAMAGQAMAGAGAKQAHALgBAMIgTAAQAAgNgJgIQgIgIgPAAQgOAAgIAHQgIAGAAALQAAAJAHAGQAIAHARAFQATAFAKAFQALAGAFAJQAEAIAAALQAAASgNALQgPALgWAAQgPAAgNgGg");
	this.shape_151.setTransform(-229.05,21.525);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFFF").s().p("AggAqQgNgOAAgZIAAgDQAAgQAFgMQAHgNALgHQALgIAMAAQAWAAAMAOQAMAOgBAbIAAAGIhJAAQAAARAKAKQAIAJANAAQALAAAGgEQAHgEAGgGIALAJQgOAVgcAAQgUAAgPgPgAgQggQgJAIgBAPIA2AAIAAgBQgBgPgHgHQgHgIgMAAQgKAAgHAIg");
	this.shape_152.setTransform(112.8,-26.275);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("AA6A4IAAhIQAAgLgFgGQgGgGgMAAQgLAAgHAGQgGAHgCAKIAABIIgRAAIAAhHQAAgYgYAAQgSAAgHAQIAABPIgTAAIAAhtIASAAIABAMQAMgOAUAAQAXAAAHASQAGgIAJgFQAIgFAMAAQAkAAABAmIAABJg");
	this.shape_153.setTransform(98.125,-26.375);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_154.setTransform(83.375,-26.275);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("AgWBIQgLgFgGgJIAJgLQAMAPASAAQAMAAAIgIQAIgHAAgOIAAgKQgMANgSAAQgTAAgMgPQgMgQAAgZQAAgaAMgPQAMgPATAAQATAAALAOIABgMIARAAIAABqQAAAVgMAMQgNAMgVAAQgLAAgLgFgAgTgyQgHALAAAVQAAASAHAKQAIAKANAAQARAAAJgQIAAgxQgJgPgRAAQgNAAgIAKg");
	this.shape_155.setTransform(71.725,-24.225);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("AgIBLIAAhtIARAAIAABtgAgIg3QgCgDAAgFQAAgEACgDQADgEAFAAQAGAAACAEQADADAAAEQAAAFgDADQgCADgGAAQgFAAgDgDg");
	this.shape_156.setTransform(58.45,-28.275);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("AgWBIQgLgFgGgJIAJgLQAMAPASAAQAMAAAIgIQAIgHAAgOIAAgKQgMANgSAAQgTAAgMgPQgMgQAAgZQAAgaAMgPQAMgPATAAQATAAALAOIABgMIARAAIAABqQAAAVgMAMQgNAMgVAAQgLAAgLgFgAgTgyQgHALAAAVQAAASAHAKQAIAKANAAQARAAAJgQIAAgxQgJgPgRAAQgNAAgIAKg");
	this.shape_157.setTransform(49.875,-24.225);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_158.setTransform(38.625,-26.375);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_159.setTransform(27.225,-26.275);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FFFFFF").s().p("AgIBOIAAibIARAAIAACbg");
	this.shape_160.setTransform(19.025,-28.575);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FFFFFF").s().p("AghAuQgJgLAAgUIAAhGIATAAIAABGQAAAZATAAQAVAAAHgQIAAhPIATAAIAABtIgSAAIAAgLQgLANgUAAQgSAAgJgKg");
	this.shape_161.setTransform(10.8,-26.175);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FFFFFF").s().p("AAXBOIglgzIgMAMIAAAnIgSAAIAAibIASAAIAABdIAKgMIAhgjIAXAAIgpAtIAuBAg");
	this.shape_162.setTransform(-4.575,-28.575);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FFFFFF").s().p("AghAuQgJgLAAgUIAAhGIASAAIAABGQABAZATAAQAVAAAIgQIAAhPIASAAIAABtIgSAAIAAgLQgLANgVAAQgRAAgJgKg");
	this.shape_163.setTransform(-16.25,-26.175);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#FFFFFF").s().p("AgDA+QgGgIAAgOIAAhDIgUAAIAAgPIAUAAIAAgaIASAAIAAAaIAUAAIAAAPIgUAAIAABDQAAAGADAEQACADAHAAIAJgBIAAAPQgIACgHAAQgMAAgGgHg");
	this.shape_164.setTransform(-25.575,-27.5);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_165.setTransform(-34.325,-26.375);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FFFFFF").s().p("AghAuQgJgLAAgUIAAhGIASAAIAABGQAAAZAVAAQAUAAAIgQIAAhPIASAAIAABtIgSAAIAAgLQgLANgVAAQgRAAgJgKg");
	this.shape_166.setTransform(-45.75,-26.175);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FFFFFF").s().p("AgIBOIAAibIARAAIAACbg");
	this.shape_167.setTransform(-111.025,-28.575);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#FFFFFF").s().p("AgjApQgOgPAAgaIAAAAQAAgQAGgNQAHgNALgHQAMgHANAAQAWAAAOAQQAOAPAAAZIAAABQAAAQgGANQgHANgLAHQgLAHgPAAQgVAAgOgQgAgVgdQgJALAAATQAAASAJALQAIALANAAQAPAAAIgLQAIgLAAgTQAAgSgIgLQgJgLgOAAQgNAAgIALg");
	this.shape_168.setTransform(-119.45,-26.275);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FFFFFF").s().p("AgbBAIgBANIgRAAIAAibIASAAIAAA6QAMgOASAAQAVAAALAPQALAPAAAaIAAABQAAAZgLAQQgLAPgUAAQgUAAgLgPgAgbgBIAAAvQAJARASAAQAMAAAIgLQAHgKAAgVQABgTgIgJQgHgLgNAAQgSAAgJARg");
	this.shape_169.setTransform(-130.9,-28.475);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FFFFFF").s().p("AA6A4IAAhIQAAgLgFgGQgGgGgMAAQgLAAgHAGQgGAHgCAKIAABIIgRAAIAAhHQAAgYgYAAQgSAAgHAQIAABPIgTAAIAAhtIASAAIABAMQAMgOAUAAQAXAAAHASQAGgIAJgFQAIgFAMAAQAkAAABAmIAABJg");
	this.shape_170.setTransform(-146.025,-26.375);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FFFFFF").s().p("AgjApQgOgPAAgaIAAAAQAAgQAHgNQAGgNALgHQALgHAOAAQAXAAANAQQAOAPAAAZIAAABQAAAQgGANQgHANgKAHQgMAHgPAAQgVAAgOgQgAgWgdQgIALAAATQAAASAIALQAJALANAAQAOAAAJgLQAIgLAAgTQAAgSgJgLQgIgLgOAAQgNAAgJALg");
	this.shape_171.setTransform(-161,-26.275);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FFFFFF").s().p("AgDA+QgGgIAAgOIAAhDIgUAAIAAgPIAUAAIAAgaIASAAIAAAaIAUAAIAAAPIgUAAIAABDQAAAGADAEQACADAHAAIAJgBIAAAPQgIACgHAAQgMAAgGgHg");
	this.shape_172.setTransform(-170.575,-27.5);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_173.setTransform(-184.525,-26.375);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_174.setTransform(-195.925,-26.275);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#FFFFFF").s().p("AAXBOIglgzIgMAMIAAAnIgSAAIAAibIASAAIAABdIAKgMIAhgjIAXAAIgpAtIAuBAg");
	this.shape_175.setTransform(-206.025,-28.575);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#FFFFFF").s().p("AggAqQgOgOABgZIAAgDQgBgQAHgMQAGgNALgHQALgIAMAAQAWAAAMAOQAMAOgBAbIAAAGIhJAAQAAARAJAKQAKAJANAAQAJAAAHgEQAHgEAGgGIALAJQgOAVgcAAQgVAAgOgPgAgRggQgHAIgDAPIA2AAIAAgBQAAgPgHgHQgHgIgMAAQgKAAgIAIg");
	this.shape_176.setTransform(-217.3,-26.275);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#FFFFFF").s().p("AgJBKIAAiDIgvAAIAAgQIBxAAIAAAQIgwAAIAACDg");
	this.shape_177.setTransform(-229,-28.175);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#FFFFFF").s().p("AgDA+QgGgIAAgOIAAhDIgUAAIAAgPIAUAAIAAgaIASAAIAAAaIAUAAIAAAPIgUAAIAABDQAAAHADADQACADAHAAIAJgBIAAAPQgIACgHAAQgMAAgGgHg");
	this.shape_178.setTransform(327.875,-77.2);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#FFFFFF").s().p("AghAuQgJgLAAgUIAAhGIASAAIAABGQAAAZAVAAQAUAAAIgQIAAhPIASAAIAABtIgSAAIAAgLQgLANgVAAQgRAAgJgKg");
	this.shape_179.setTransform(319.1,-75.875);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#FFFFFF").s().p("AgbBAIgBANIgRAAIAAibIATAAIAAA6QALgOASAAQAVAAALAPQALAPAAAaIAAABQAAAZgLAQQgLAPgUAAQgUAAgLgPgAgagBIAAAvQAIARASAAQAMAAAIgLQAHgKAAgVQABgTgIgJQgHgLgNAAQgSAAgIARg");
	this.shape_180.setTransform(307.85,-78.175);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#FFFFFF").s().p("AgfAqQgPgOAAgZIAAgDQABgQAGgMQAGgNALgHQALgIANAAQAUAAAMAOQANAOAAAbIAAAGIhKAAQABARAIAKQAKAJANAAQAJAAAIgEQAGgEAFgGIAMAJQgOAVgbAAQgWAAgNgPgAgQggQgIAIgDAPIA3AAIAAgBQgBgPgHgHQgHgIgLAAQgLAAgHAIg");
	this.shape_181.setTransform(296.55,-75.975);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#FFFFFF").s().p("AgVA0QgKgFgGgIQgFgIgBgKIAUAAQAAAJAHAGQAHAFAKAAQALAAAGgEQAHgEAAgHQAAgIgGgEQgGgEgNgDQgOgDgIgEQgIgEgFgGQgDgGAAgIQAAgNALgJQALgKARAAQASAAAMAKQALAJAAAPIgSAAQAAgHgHgGQgGgFgKAAQgKAAgFAEQgGAFAAAHQAAAGAGAEQAFADANADQAOAEAIAEQAJADAFAHQADAGAAAIQAAAPgLAJQgMAJgTAAQgMAAgKgFg");
	this.shape_182.setTransform(285.55,-75.975);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#FFFFFF").s().p("AgaA4IAAhtIATAAIAAANQAIgPARAAQAGAAACACIAAARIgIgBQgSAAgHAQIAABNg");
	this.shape_183.setTransform(277.25,-76.075);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#FFFFFF").s().p("AggAqQgNgOAAgZIAAgDQAAgQAFgMQAHgNALgHQALgIANAAQAUAAANAOQALAOABAbIAAAGIhKAAQAAARAKAKQAIAJANAAQALAAAGgEQAIgEAEgGIAMAJQgOAVgcAAQgVAAgOgPgAgQggQgJAIgBAPIA2AAIAAgBQgBgPgHgHQgHgIgLAAQgLAAgHAIg");
	this.shape_184.setTransform(267.95,-75.975);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#FFFFFF").s().p("AgDA+QgGgIAAgOIAAhDIgUAAIAAgPIAUAAIAAgaIASAAIAAAaIAUAAIAAAPIgUAAIAABDQAAAHADADQACADAHAAIAJgBIAAAPQgIACgHAAQgMAAgGgHg");
	this.shape_185.setTransform(258.675,-77.2);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_186.setTransform(244.725,-76.075);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_187.setTransform(233.325,-75.975);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#FFFFFF").s().p("AAaA3IgahSIgZBSIgQAAIgfhtIASAAIAWBRIAZhRIAOAAIAaBTIAVhTIATAAIggBtg");
	this.shape_188.setTransform(219.925,-75.975);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#FFFFFF").s().p("AgfAqQgOgOgBgZIAAgDQAAgQAHgMQAGgNALgHQALgIANAAQAUAAAMAOQANAOAAAbIAAAGIhKAAQABARAIAKQAKAJANAAQAJAAAIgEQAGgEAFgGIAMAJQgOAVgbAAQgWAAgNgPgAgRggQgIAIgCAPIA2AAIAAgBQAAgPgHgHQgHgIgLAAQgLAAgIAIg");
	this.shape_189.setTransform(206.9,-75.975);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#FFFFFF").s().p("AAYBOIAAhJQAAgLgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAHIAABOIgTAAIAAibIATAAIAAA8QAMgQATAAQAjAAAAAmIAABJg");
	this.shape_190.setTransform(195.625,-78.275);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#FFFFFF").s().p("AgVA0QgKgFgGgIQgFgIgBgKIAUAAQAAAJAHAGQAHAFAKAAQALAAAGgEQAHgEAAgHQAAgIgGgEQgGgEgNgDQgOgDgIgEQgIgEgFgGQgDgGAAgIQAAgNALgJQALgKARAAQASAAAMAKQALAJAAAPIgSAAQAAgHgHgGQgGgFgKAAQgJAAgGAEQgGAFAAAHQAAAGAGAEQAFADANADQAOAEAIAEQAJADAFAHQADAGAAAIQAAAPgLAJQgMAJgTAAQgMAAgKgFg");
	this.shape_191.setTransform(179.35,-75.975);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_192.setTransform(168.375,-75.975);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#FFFFFF").s().p("AgIBOIAAibIARAAIAACbg");
	this.shape_193.setTransform(160.175,-78.275);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#FFFFFF").s().p("AggAqQgNgOAAgZIAAgDQAAgQAFgMQAHgNALgHQALgIANAAQAVAAAMAOQAMAOAAAbIAAAGIhKAAQAAARAKAKQAIAJANAAQALAAAGgEQAHgEAGgGIALAJQgOAVgcAAQgUAAgPgPgAgQggQgJAIgBAPIA2AAIAAgBQgBgPgHgHQgHgIgLAAQgLAAgHAIg");
	this.shape_194.setTransform(152.4,-75.975);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#FFFFFF").s().p("AAXBOIglgzIgMAMIAAAnIgSAAIAAibIASAAIAABdIAKgMIAhgjIAXAAIgpAtIAuBAg");
	this.shape_195.setTransform(142.275,-78.275);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_196.setTransform(125.475,-76.075);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_197.setTransform(114.075,-75.975);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#FFFFFF").s().p("AgWBIQgLgFgGgJIAJgLQAMAPASAAQAMAAAIgIQAIgHAAgOIAAgKQgMANgSAAQgTAAgMgPQgMgQAAgZQAAgaAMgPQAMgPATAAQATAAALAOIABgMIARAAIAABqQAAAVgMAMQgNAMgVAAQgLAAgLgFgAgTgyQgHALAAAVQAAASAHAKQAIAKANAAQARAAAJgQIAAgxQgJgPgRAAQgNAAgIAKg");
	this.shape_198.setTransform(102.425,-73.925);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_199.setTransform(91.175,-76.075);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#FFFFFF").s().p("AggAqQgOgOABgZIAAgDQgBgQAHgMQAGgNALgHQALgIAMAAQAWAAAMAOQAMAOgBAbIAAAGIhJAAQAAARAJAKQAKAJANAAQAJAAAHgEQAHgEAGgGIALAJQgOAVgcAAQgUAAgPgPgAgRggQgHAIgCAPIA1AAIAAgBQAAgPgHgHQgHgIgMAAQgKAAgIAIg");
	this.shape_200.setTransform(80.15,-75.975);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#FFFFFF").s().p("AghA/QgMgPAAgZIAAgCQAAgYAMgPQAMgQATAAQASAAAMANIAAg5IASAAIAACbIgRAAIgBgMQgLAOgTAAQgTAAgMgQgAgTgHQgHAJAAAVQAAATAHAKQAIALANAAQARAAAJgQIAAgxQgJgQgRAAQgNAAgIALg");
	this.shape_201.setTransform(68.425,-78.175);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#FFFFFF").s().p("AgJBLIAAhtIASAAIAABtgAgIg3QgCgDAAgFQAAgEACgDQAEgEAEAAQAFAAADAEQADADAAAEQAAAFgDADQgDADgFAAQgEAAgEgDg");
	this.shape_202.setTransform(55.15,-77.975);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_203.setTransform(46.925,-75.975);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#FFFFFF").s().p("AghAuQgJgLAAgUIAAhGIASAAIAABGQAAAZAVAAQAUAAAIgQIAAhPIASAAIAABtIgSAAIAAgLQgLANgVAAQgRAAgJgKg");
	this.shape_204.setTransform(35.6,-75.875);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#FFFFFF").s().p("AgVA0QgKgFgFgIQgHgIABgKIASAAQABAJAHAGQAHAFALAAQAKAAAHgEQAGgEAAgHQAAgIgFgEQgHgEgNgDQgOgDgIgEQgJgEgDgGQgFgGAAgIQAAgNAMgJQALgKARAAQATAAALAKQAMAJgBAPIgSAAQAAgHgGgGQgHgFgKAAQgJAAgGAEQgGAFAAAHQAAAGAFAEQAGADANADQAOAEAJAEQAIADAEAHQAEAGABAIQAAAPgMAJQgMAJgSAAQgMAAgLgFg");
	this.shape_205.setTransform(24.5,-75.975);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#FFFFFF").s().p("AggAqQgOgOABgZIAAgDQAAgQAFgMQAHgNALgHQALgIAMAAQAWAAAMAOQAMAOgBAbIAAAGIhJAAQAAARAKAKQAJAJAMAAQALAAAGgEQAHgEAGgGIALAJQgOAVgcAAQgUAAgPgPgAgRggQgIAIgBAPIA1AAIAAgBQAAgPgHgHQgHgIgMAAQgKAAgIAIg");
	this.shape_206.setTransform(13.9,-75.975);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#FFFFFF").s().p("AgVA0QgKgFgGgIQgFgIgBgKIAUAAQAAAJAHAGQAHAFAKAAQALAAAGgEQAHgEAAgHQAAgIgGgEQgGgEgNgDQgOgDgIgEQgIgEgFgGQgDgGAAgIQAAgNALgJQALgKARAAQASAAAMAKQALAJAAAPIgSAAQAAgHgHgGQgGgFgKAAQgJAAgGAEQgGAFAAAHQAAAGAGAEQAFADANADQAOAEAIAEQAJADAFAHQADAGAAAIQAAAPgLAJQgMAJgTAAQgMAAgKgFg");
	this.shape_207.setTransform(2.95,-75.975);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#FFFFFF").s().p("AgWBIQgLgFgGgJIAJgLQAMAPASAAQAMAAAIgIQAIgHAAgOIAAgKQgMANgSAAQgTAAgMgPQgMgQAAgZQAAgaAMgPQAMgPATAAQATAAALAOIABgMIARAAIAABqQAAAVgMAMQgNAMgVAAQgLAAgLgFgAgTgyQgHALAAAVQAAASAHAKQAIAKANAAQARAAAJgQIAAgxQgJgPgRAAQgNAAgIAKg");
	this.shape_208.setTransform(-13.575,-73.925);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_209.setTransform(-24.825,-76.075);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_210.setTransform(-36.225,-75.975);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#FFFFFF").s().p("AggBNIgHgCIAAgPIAFABQAJAAAGgEQAFgEADgKIAFgLIgohsIAVAAIAaBRIAahRIAUAAIgsB+QgJAbgXAAg");
	this.shape_211.setTransform(-46.825,-73.775);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_212.setTransform(-62.525,-76.075);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_213.setTransform(-73.925,-75.975);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#FFFFFF").s().p("AAaA3IgahSIgZBSIgQAAIgfhtIASAAIAWBRIAZhRIAOAAIAaBTIAVhTIATAAIggBtg");
	this.shape_214.setTransform(-87.325,-75.975);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#FFFFFF").s().p("AggAqQgOgOABgZIAAgDQAAgQAFgMQAHgNALgHQALgIAMAAQAWAAAMAOQAMAOgBAbIAAAGIhJAAQAAARAKAKQAJAJAMAAQALAAAGgEQAHgEAGgGIALAJQgOAVgcAAQgUAAgPgPgAgRggQgIAIgBAPIA1AAIAAgBQAAgPgHgHQgHgIgMAAQgKAAgIAIg");
	this.shape_215.setTransform(-100.4,-75.975);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#FFFFFF").s().p("AAYBOIAAhJQAAgLgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAHIAABOIgTAAIAAibIATAAIAAA8QAMgQATAAQAjAAAAAmIAABJg");
	this.shape_216.setTransform(-111.675,-78.275);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#FFFFFF").s().p("AAYBOIAAhJQAAgLgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAHIAABOIgTAAIAAibIATAAIAAA8QAMgQATAAQAjAAAAAmIAABJg");
	this.shape_217.setTransform(-128.225,-78.275);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#FFFFFF").s().p("AgjApQgOgPAAgaIAAAAQAAgQAGgNQAHgNALgHQALgHAOAAQAWAAAOAQQAOAPAAAZIAAABQAAAQgGANQgGANgMAHQgLAHgPAAQgVAAgOgQgAgVgdQgJALAAATQAAASAJALQAIALANAAQAOAAAJgLQAIgLAAgTQAAgSgIgLQgJgLgOAAQgNAAgIALg");
	this.shape_218.setTransform(-139.9,-75.975);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#FFFFFF").s().p("AgDA+QgGgIAAgOIAAhDIgUAAIAAgPIAUAAIAAgaIASAAIAAAaIAUAAIAAAPIgUAAIAABDQAAAHADADQACADAHAAIAJgBIAAAPQgIACgHAAQgMAAgGgHg");
	this.shape_219.setTransform(-149.425,-77.2);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_220.setTransform(-158.175,-76.075);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#FFFFFF").s().p("AgjApQgOgPAAgaIAAAAQAAgQAGgNQAHgNALgHQAMgHANAAQAWAAAOAQQAOAPAAAZIAAABQAAAQgGANQgHANgLAHQgLAHgPAAQgVAAgOgQgAgVgdQgJALAAATQAAASAJALQAIALANAAQAPAAAIgLQAIgLAAgTQAAgSgIgLQgJgLgOAAQgNAAgIALg");
	this.shape_221.setTransform(-169.85,-75.975);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#FFFFFF").s().p("AggAqQgNgPAAgaIAAgCQAAgQAFgNQAHgMAKgHQALgHAOAAQATAAAMALQANALAAASIgSAAQAAgLgIgHQgHgGgLAAQgNAAgHAKQgJAKABAUIAAACQgBATAJAKQAHAKANAAQAKAAAIgGQAHgGABgJIASAAQAAAKgHAIQgGAJgJAFQgKAFgMAAQgVAAgNgPg");
	this.shape_222.setTransform(-180.95,-75.975);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#FFFFFF").s().p("AgWBIQgLgFgGgJIAJgLQAMAPASAAQAMAAAIgIQAIgHAAgOIAAgKQgMANgSAAQgTAAgMgPQgMgQAAgZQAAgaAMgPQAMgPATAAQATAAALAOIABgMIARAAIAABqQAAAVgMAMQgNAMgVAAQgLAAgLgFgAgTgyQgHALAAAVQAAASAHAKQAIAKANAAQARAAAJgQIAAgxQgJgPgRAAQgNAAgIAKg");
	this.shape_223.setTransform(-197.725,-73.925);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_224.setTransform(-208.975,-75.975);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#FFFFFF").s().p("AgZA4IAAhtIASAAIAAANQAJgPARAAQAFAAADACIAAARIgJgBQgSAAgGAQIAABNg");
	this.shape_225.setTransform(-217.6,-76.075);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#FFFFFF").s().p("Ag0BKIAAiTIApAAQATAAAOAJQAPAIAIAQQAIAQAAAUIAAAJQAAAUgIAQQgIAQgPAIQgPAJgSAAgAghA6IAVAAQAVAAANgOQAMgOAAgaIAAgIQAAgZgMgOQgLgOgVAAIgXAAg");
	this.shape_226.setTransform(-228.175,-77.875);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#FFFFFF").s().p("AgIBLIAAhtIARAAIAABtgAgHg3QgDgDAAgFQAAgEADgDQADgEAEAAQAGAAACAEQADADAAAEQAAAFgDADQgCADgGAAQgEAAgDgDg");
	this.shape_227.setTransform(-62.7,-127.725);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_228.setTransform(-70.925,-125.725);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#FFFFFF").s().p("AghAuQgJgLAAgUIAAhGIATAAIAABGQAAAZATAAQAVAAAHgQIAAhPIATAAIAABtIgSAAIAAgLQgLANgUAAQgSAAgJgKg");
	this.shape_229.setTransform(-82.25,-125.625);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#FFFFFF").s().p("AgVA0QgKgFgGgIQgFgIgBgKIAUAAQAAAJAHAGQAHAFAKAAQALAAAGgEQAHgEAAgHQAAgIgGgEQgGgEgNgDQgOgDgIgEQgIgEgFgGQgDgGAAgIQAAgNALgJQALgKARAAQASAAAMAKQALAJAAAPIgSAAQAAgHgHgGQgGgFgKAAQgJAAgGAEQgGAFAAAHQAAAGAGAEQAFADANADQAOAEAIAEQAJADAFAHQADAGAAAIQAAAPgLAJQgMAJgTAAQgMAAgKgFg");
	this.shape_230.setTransform(-93.35,-125.725);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#FFFFFF").s().p("AggAqQgOgOABgZIAAgDQgBgQAHgMQAGgNALgHQALgIAMAAQAWAAAMAOQAMAOgBAbIAAAGIhJAAQAAARAJAKQAKAJANAAQAJAAAHgEQAHgEAGgGIALAJQgOAVgcAAQgVAAgOgPgAgRggQgHAIgDAPIA2AAIAAgBQAAgPgHgHQgHgIgMAAQgKAAgIAIg");
	this.shape_231.setTransform(-103.9,-125.725);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#FFFFFF").s().p("AgVA0QgKgFgFgIQgHgIAAgKIATAAQABAJAHAGQAHAFAKAAQALAAAHgEQAGgEAAgHQAAgIgGgEQgFgEgOgDQgOgDgIgEQgJgEgDgGQgEgGgBgIQAAgNAMgJQALgKARAAQATAAALAKQAMAJAAAPIgTAAQAAgHgGgGQgHgFgKAAQgJAAgGAEQgGAFAAAHQAAAGAFAEQAGADANADQAOAEAJAEQAIADAEAHQAFAGAAAIQAAAPgMAJQgMAJgTAAQgLAAgLgFg");
	this.shape_232.setTransform(-114.9,-125.725);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#FFFFFF").s().p("AgWBIQgLgFgGgJIAJgLQAMAPASAAQAMAAAIgIQAIgHAAgOIAAgKQgMANgSAAQgTAAgMgPQgMgQAAgZQAAgaAMgPQAMgPATAAQATAAALAOIABgMIARAAIAABqQAAAVgMAMQgNAMgVAAQgLAAgLgFgAgTgyQgHALAAAVQAAASAHAKQAIAKANAAQARAAAJgQIAAgxQgJgPgRAAQgNAAgIAKg");
	this.shape_233.setTransform(-131.375,-123.675);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_234.setTransform(-142.625,-125.825);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_235.setTransform(-154.025,-125.725);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#FFFFFF").s().p("AggBNIgHgCIAAgPIAFABQAJAAAGgEQAFgEADgKIAFgLIgohsIAVAAIAaBRIAahRIAUAAIgsB+QgJAbgXAAg");
	this.shape_236.setTransform(-164.625,-123.525);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_237.setTransform(-180.375,-125.825);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_238.setTransform(-191.775,-125.725);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#FFFFFF").s().p("AAaA3IgahSIgZBSIgQAAIgfhtIASAAIAWBRIAZhRIAOAAIAaBTIAVhTIATAAIggBtg");
	this.shape_239.setTransform(-205.175,-125.725);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#FFFFFF").s().p("AggAqQgOgOABgZIAAgDQgBgQAHgMQAGgNALgHQALgIAMAAQAWAAAMAOQAMAOgBAbIAAAGIhJAAQAAARAJAKQAKAJANAAQAJAAAHgEQAHgEAGgGIALAJQgOAVgcAAQgVAAgOgPgAgRggQgHAIgDAPIA2AAIAAgBQAAgPgHgHQgHgIgMAAQgKAAgIAIg");
	this.shape_240.setTransform(-218.2,-125.725);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#FFFFFF").s().p("AAYBOIAAhJQAAgLgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAHIAABOIgTAAIAAibIATAAIAAA8QAMgQATAAQAjAAAAAmIAABJg");
	this.shape_241.setTransform(-229.475,-128.025);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#FFFFFF").s().p("AgVA0QgKgFgGgIQgFgIAAgKIATAAQAAAJAHAGQAHAFALAAQAKAAAHgEQAGgEAAgHQAAgIgFgEQgHgEgNgDQgOgDgIgEQgIgEgEgGQgFgGAAgIQAAgNAMgJQALgKARAAQATAAALAKQALAJAAAPIgSAAQAAgHgHgGQgGgFgKAAQgJAAgGAEQgGAFAAAHQAAAGAGAEQAFADANADQAOAEAIAEQAJADAFAHQADAGAAAIQAAAPgLAJQgMAJgSAAQgNAAgKgFg");
	this.shape_242.setTransform(345.15,-175.475);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_243.setTransform(334.175,-175.475);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#FFFFFF").s().p("AgIBOIAAibIARAAIAACbg");
	this.shape_244.setTransform(326.025,-177.775);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#FFFFFF").s().p("AggAqQgOgOABgZIAAgDQgBgQAHgMQAGgNALgHQALgIAMAAQAWAAAMAOQAMAOgBAbIAAAGIhJAAQAAARAKAKQAJAJANAAQAJAAAHgEQAHgEAGgGIALAJQgOAVgcAAQgUAAgPgPgAgRggQgIAIgCAPIA2AAIAAgBQAAgPgHgHQgHgIgMAAQgKAAgIAIg");
	this.shape_245.setTransform(318.2,-175.475);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#FFFFFF").s().p("AAXBOIglgzIgMAMIAAAnIgSAAIAAibIASAAIAABdIAKgMIAhgjIAXAAIgpAtIAuBAg");
	this.shape_246.setTransform(308.125,-177.775);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#FFFFFF").s().p("AAXBOIglgzIgMAMIAAAnIgSAAIAAibIASAAIAABdIAKgMIAhgjIAXAAIgpAtIAuBAg");
	this.shape_247.setTransform(292.325,-177.775);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#FFFFFF").s().p("AgJBLIAAhtIASAAIAABtgAgIg3QgCgDAAgFQAAgEACgDQADgEAFAAQAGAAACAEQADADAAAEQAAAFgDADQgCADgGAAQgFAAgDgDg");
	this.shape_248.setTransform(283.85,-177.475);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#FFFFFF").s().p("AgDA9QgGgHAAgOIAAhDIgUAAIAAgPIAUAAIAAgaIASAAIAAAaIAUAAIAAAPIgUAAIAABDQAAAHADADQACADAHAAIAJgBIAAAPQgIACgHAAQgMAAgGgIg");
	this.shape_249.setTransform(277.625,-176.7);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#FFFFFF").s().p("AgVA0QgKgFgGgIQgFgIAAgKIATAAQAAAJAHAGQAHAFALAAQAKAAAHgEQAGgEAAgHQAAgIgFgEQgHgEgNgDQgOgDgIgEQgJgEgDgGQgFgGAAgIQAAgNAMgJQALgKARAAQATAAALAKQALAJAAAPIgSAAQAAgHgGgGQgHgFgKAAQgKAAgFAEQgGAFAAAHQAAAGAGAEQAFADANADQAOAEAJAEQAIADAEAHQAEAGAAAIQAAAPgLAJQgMAJgSAAQgNAAgKgFg");
	this.shape_250.setTransform(269.2,-175.475);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#FFFFFF").s().p("AgJBLIAAhtIASAAIAABtgAgIg3QgCgDAAgFQAAgEACgDQADgEAFAAQAGAAACAEQADADAAAEQAAAFgDADQgCADgGAAQgFAAgDgDg");
	this.shape_251.setTransform(261.35,-177.475);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#FFFFFF").s().p("AgZA4IAAhtIASAAIAAANQAJgPARAAQAFAAADACIAAARIgJgBQgSAAgGAQIAABNg");
	this.shape_252.setTransform(255.8,-175.575);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#FFFFFF").s().p("AgfAqQgOgOgBgZIAAgDQAAgQAHgMQAGgNALgHQALgIANAAQAUAAAMAOQANAOAAAbIAAAGIhKAAQABARAIAKQAKAJANAAQAKAAAHgEQAGgEAFgGIAMAJQgOAVgbAAQgWAAgNgPgAgRggQgIAIgCAPIA2AAIAAgBQAAgPgHgHQgHgIgLAAQgLAAgIAIg");
	this.shape_253.setTransform(246.5,-175.475);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#FFFFFF").s().p("AgDA9QgGgHAAgOIAAhDIgUAAIAAgPIAUAAIAAgaIASAAIAAAaIAUAAIAAAPIgUAAIAABDQAAAHADADQACADAHAAIAJgBIAAAPQgIACgHAAQgMAAgGgIg");
	this.shape_254.setTransform(237.225,-176.7);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#FFFFFF").s().p("AAXBOIglgzIgMAMIAAAnIgSAAIAAibIASAAIAABdIAKgMIAhgjIAXAAIgpAtIAuBAg");
	this.shape_255.setTransform(229.675,-177.775);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_256.setTransform(218.025,-175.475);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#FFFFFF").s().p("AgaA4IAAhtIATAAIAAANQAIgPARAAQAGAAACACIAAARIgJgBQgRAAgHAQIAABNg");
	this.shape_257.setTransform(209.4,-175.575);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_258.setTransform(199.675,-175.475);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#FFFFFF").s().p("AAXBOIglgzIgMAMIAAAnIgSAAIAAibIASAAIAABdIAKgMIAhgjIAXAAIgpAtIAuBAg");
	this.shape_259.setTransform(189.525,-177.775);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#FFFFFF").s().p("AAXBOIglgzIgMAMIAAAnIgSAAIAAibIASAAIAABdIAKgMIAhgjIAXAAIgpAtIAuBAg");
	this.shape_260.setTransform(173.775,-177.775);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_261.setTransform(162.125,-175.475);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#FFFFFF").s().p("AgDA9QgGgHAAgOIAAhDIgUAAIAAgPIAUAAIAAgaIASAAIAAAaIAUAAIAAAPIgUAAIAABDQAAAHADADQACADAHAAIAJgBIAAAPQgIACgHAAQgMAAgGgIg");
	this.shape_262.setTransform(152.875,-176.7);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#FFFFFF").s().p("AgjApQgOgPAAgaIAAAAQAAgQAHgNQAGgNALgHQALgHAOAAQAWAAAOAQQAOAPAAAZIAAABQAAAQgGANQgGANgLAHQgMAHgPAAQgVAAgOgQgAgWgdQgIALAAATQAAASAIALQAJALANAAQAOAAAJgLQAIgLAAgTQAAgSgJgLQgIgLgOAAQgNAAgJALg");
	this.shape_263.setTransform(143.85,-175.475);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#FFFFFF").s().p("AAXBOIglgzIgMAMIAAAnIgSAAIAAibIASAAIAABdIAKgMIAhgjIAXAAIgpAtIAuBAg");
	this.shape_264.setTransform(133.475,-177.775);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#FFFFFF").s().p("AghAuQgJgLAAgUIAAhGIASAAIAABGQABAZATAAQAVAAAIgQIAAhPIASAAIAABtIgSAAIAAgLQgLANgVAAQgRAAgJgKg");
	this.shape_265.setTransform(116.5,-175.375);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#FFFFFF").s().p("AgUBfIAAgPIAJABQAGAAADgDQADgEAAgIIAAh6IASAAIAAB5QAAAggbAAQgHAAgFgCgAABhNQgBgDAAgFQAAgEABgDQADgEAGAAQAFAAADAEQADADAAAEQAAAFgDADQgDADgFAAQgGAAgDgDg");
	this.shape_266.setTransform(107.275,-175.275);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#FFFFFF").s().p("AghAuQgJgLAAgUIAAhGIATAAIAABGQgBAZAVAAQAUAAAHgQIAAhPIATAAIAABtIgSAAIAAgLQgLANgVAAQgRAAgJgKg");
	this.shape_267.setTransform(100.15,-175.375);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_268.setTransform(88.775,-175.575);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#FFFFFF").s().p("AgfAqQgOgOgBgZIAAgDQAAgQAHgMQAGgNALgHQALgIANAAQAUAAAMAOQANAOAAAbIAAAGIhKAAQABARAIAKQAKAJANAAQAJAAAIgEQAGgEAFgGIAMAJQgOAVgbAAQgWAAgNgPgAgRggQgIAIgCAPIA2AAIAAgBQAAgPgHgHQgHgIgLAAQgLAAgIAIg");
	this.shape_269.setTransform(77.75,-175.475);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#FFFFFF").s().p("AA6A4IAAhIQAAgLgFgGQgGgGgMAAQgLAAgHAGQgGAHgCAKIAABIIgRAAIAAhHQAAgYgYAAQgSAAgHAQIAABPIgTAAIAAhtIASAAIABAMQAMgOAUAAQAXAAAHASQAGgIAJgFQAIgFAMAAQAkAAABAmIAABJg");
	this.shape_270.setTransform(63.125,-175.575);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#FFFFFF").s().p("AAYA4IAAhIQAAgMgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAIIAABNIgTAAIAAhtIASAAIAAAOQANgQATAAQAjAAAAAnIAABIg");
	this.shape_271.setTransform(43.075,-175.575);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_272.setTransform(31.675,-175.475);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#FFFFFF").s().p("AAaA3IgahSIgZBSIgQAAIgfhtIASAAIAWBRIAZhRIAOAAIAaBTIAVhTIATAAIggBtg");
	this.shape_273.setTransform(18.275,-175.475);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#FFFFFF").s().p("AgfAqQgOgOgBgZIAAgDQAAgQAHgMQAGgNALgHQALgIAMAAQAVAAAMAOQAMAOAAAbIAAAGIhJAAQABARAIAKQAKAJANAAQAKAAAHgEQAHgEAFgGIALAJQgOAVgbAAQgVAAgOgPgAgRggQgHAIgDAPIA2AAIAAgBQAAgPgHgHQgHgIgMAAQgKAAgIAIg");
	this.shape_274.setTransform(5.2,-175.475);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#FFFFFF").s().p("AAYBOIAAhJQAAgLgFgFQgFgGgMAAQgIAAgHAFQgHAFgDAHIAABOIgTAAIAAibIATAAIAAA8QAMgQATAAQAjAAAAAmIAABJg");
	this.shape_275.setTransform(-6.075,-177.775);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#FFFFFF").s().p("AAXBOIglgzIgMAMIAAAnIgSAAIAAibIASAAIAABdIAKgMIAhgjIAXAAIgpAtIAuBAg");
	this.shape_276.setTransform(-21.575,-177.775);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#FFFFFF").s().p("AgIBLIAAhtIARAAIAABtgAgHg3QgDgDAAgFQAAgEADgDQADgEAEAAQAGAAACAEQADADAAAEQAAAFgDADQgCADgGAAQgEAAgDgDg");
	this.shape_277.setTransform(-30.05,-177.475);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#FFFFFF").s().p("AgDA9QgGgHAAgOIAAhDIgUAAIAAgPIAUAAIAAgaIASAAIAAAaIAUAAIAAAPIgUAAIAABDQAAAHADADQACADAHAAIAJgBIAAAPQgIACgHAAQgMAAgGgIg");
	this.shape_278.setTransform(-36.275,-176.7);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#FFFFFF").s().p("AgVA0QgKgFgFgIQgHgIAAgKIATAAQABAJAHAGQAHAFAKAAQALAAAHgEQAGgEAAgHQAAgIgGgEQgFgEgOgDQgOgDgIgEQgJgEgDgGQgEgGgBgIQAAgNAMgJQALgKARAAQATAAALAKQAMAJAAAPIgTAAQAAgHgGgGQgHgFgKAAQgJAAgGAEQgGAFAAAHQAAAGAFAEQAGADANADQAOAEAJAEQAIADAEAHQAFAGAAAIQAAAPgMAJQgMAJgTAAQgLAAgLgFg");
	this.shape_279.setTransform(-44.7,-175.475);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#FFFFFF").s().p("AgIBLIAAhtIARAAIAABtgAgHg3QgDgDAAgFQAAgEADgDQADgEAEAAQAGAAACAEQADADAAAEQAAAFgDADQgCADgGAAQgEAAgDgDg");
	this.shape_280.setTransform(-52.55,-177.475);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#FFFFFF").s().p("AgaA4IAAhtIATAAIAAANQAIgPARAAQAGAAADACIAAARIgJgBQgSAAgHAQIAABNg");
	this.shape_281.setTransform(-58.1,-175.575);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#FFFFFF").s().p("AggAqQgOgOABgZIAAgDQgBgQAHgMQAGgNALgHQALgIAMAAQAWAAAMAOQAMAOgBAbIAAAGIhJAAQAAARAJAKQAKAJANAAQAJAAAHgEQAHgEAGgGIALAJQgOAVgcAAQgVAAgOgPgAgRggQgHAIgDAPIA2AAIAAgBQAAgPgHgHQgHgIgMAAQgKAAgIAIg");
	this.shape_282.setTransform(-67.45,-175.475);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#FFFFFF").s().p("AgDA9QgGgHAAgOIAAhDIgUAAIAAgPIAUAAIAAgaIASAAIAAAaIAUAAIAAAPIgUAAIAABDQAAAHADADQACADAHAAIAJgBIAAAPQgIACgHAAQgMAAgGgIg");
	this.shape_283.setTransform(-76.675,-176.7);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#FFFFFF").s().p("AAXBOIglgzIgMAMIAAAnIgSAAIAAibIASAAIAABdIAKgMIAhgjIAXAAIgpAtIAuBAg");
	this.shape_284.setTransform(-84.275,-177.775);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_285.setTransform(-95.925,-175.475);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#FFFFFF").s().p("AgaA4IAAhtIATAAIAAANQAJgPAQAAQAGAAACACIAAARIgJgBQgRAAgGAQIAABNg");
	this.shape_286.setTransform(-104.5,-175.575);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_287.setTransform(-114.225,-175.475);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#FFFFFF").s().p("AAXBOIglgzIgMAMIAAAnIgSAAIAAibIASAAIAABdIAKgMIAhgjIAXAAIgpAtIAuBAg");
	this.shape_288.setTransform(-124.375,-177.775);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f("#FFFFFF").s().p("AAXBOIglgzIgMAMIAAAnIgSAAIAAibIASAAIAABdIAKgMIAhgjIAXAAIgpAtIAuBAg");
	this.shape_289.setTransform(-140.125,-177.775);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_290.setTransform(-151.775,-175.475);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f("#FFFFFF").s().p("AgDA9QgGgHAAgOIAAhDIgUAAIAAgPIAUAAIAAgaIASAAIAAAaIAUAAIAAAPIgUAAIAABDQAAAHADADQACADAHAAIAJgBIAAAPQgIACgHAAQgMAAgGgIg");
	this.shape_291.setTransform(-161.025,-176.7);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#FFFFFF").s().p("AgjApQgOgPAAgaIAAAAQAAgQAGgNQAHgNALgHQALgHAOAAQAWAAAOAQQAOAPAAAZIAAABQAAAQgGANQgGANgMAHQgLAHgPAAQgVAAgOgQgAgVgdQgJALAAATQAAASAJALQAIALANAAQAOAAAJgLQAIgLAAgTQAAgSgIgLQgJgLgOAAQgNAAgIALg");
	this.shape_292.setTransform(-170.05,-175.475);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f("#FFFFFF").s().p("AAXBOIglgzIgMAMIAAAnIgSAAIAAibIASAAIAABdIAKgMIAhgjIAXAAIgpAtIAuBAg");
	this.shape_293.setTransform(-180.425,-177.775);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#FFFFFF").s().p("AgWBIQgLgFgGgJIAJgLQAMAPASAAQAMAAAIgIQAIgHAAgOIAAgKQgMANgSAAQgTAAgMgPQgMgQAAgZQAAgaAMgPQAMgPATAAQATAAALAOIABgMIARAAIAABqQAAAVgMAMQgNAMgVAAQgLAAgLgFgAgTgyQgHALAAAVQAAASAHAKQAIAKANAAQARAAAJgQIAAgxQgJgPgRAAQgNAAgIAKg");
	this.shape_294.setTransform(-197.725,-173.425);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f("#FFFFFF").s().p("AgiAwQgKgKAAgOQAAgRANgIQANgKAWAAIATAAIAAgIQAAgKgGgGQgGgGgLAAQgKAAgGAFQgHAFAAAIIgTAAQAAgJAGgHQAGgIAKgEQAKgFALAAQASAAALAKQALAJAAARIAAAxQAAAPAEAJIAAACIgTAAQgCgDgBgJQgNAOgRAAQgQAAgLgJgAgZAWQAAAJAFAFQAGAEAJAAQAIAAAIgEQAIgFAEgHIAAgWIgPAAQghAAAAAUg");
	this.shape_295.setTransform(-208.975,-175.475);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#FFFFFF").s().p("AgZA4IAAhtIASAAIAAANQAJgPARAAQAFAAADACIAAARIgJgBQgSAAgGAQIAABNg");
	this.shape_296.setTransform(-217.6,-175.575);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f("#FFFFFF").s().p("Ag0BKIAAiTIApAAQATAAAOAJQAPAIAIAQQAIAQAAAUIAAAJQAAAUgIAQQgIAQgPAIQgPAJgSAAgAghA6IAVAAQAVAAANgOQAMgOAAgaIAAgIQAAgZgMgOQgLgOgVAAIgXAAg");
	this.shape_297.setTransform(-228.175,-177.375);

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
		  _this.sound3.play();
		  _this.popUpSalah.visible = !_this.popUpSalah.visible;
		  setTimeout(function () {
		    _this.popUpSalah.visible = !_this.popUpSalah.visible;
		  }, 3000);
		};
		
		root1.onMatch = function () {
		  _this.sound2.play();
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
		  _this.sound2.play();
		  _this.popUpSelesai.visible = !_this.popUpSelesai.visible;
		  setTimeout(function () {
		    _this.popUpSelesai.visible = !_this.popUpSelesai.visible;
		  }, 3000);
		
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
	this.pieces1 = new lib.Pieces1();
	this.pieces1.name = "pieces1";
	this.pieces1.setTransform(-201.05,-254.8,0.8714,0.8714);

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

	this.slots1 = new lib.Slots1();
	this.slots1.name = "slots1";
	this.slots1.setTransform(-201.05,-254.8,0.8714,0.8714);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,102,255,0.008)").s().p("EgmrAPdIAA+5MBNXAAAIAAe5g");
	this.shape_1.setTransform(-12.625,28.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.slots1},{t:this.shape},{t:this.Score1},{t:this.restart1},{t:this.pieces1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg5, new cjs.Rectangle(-675.6,-357.1,960.2,667.9000000000001), null);


// stage content:
(lib.game16 = function(mode,startPosition,loop) {
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
		  window.location.replace("../game17/index.html");
		});
		
		root.btnBack3.on("click", function () {
		  window.location.replace("../game15/index.html");
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
	this.shape.graphics.f("#FFFFFF").s().p("AgNATQgEgEAAgGQAAgGAFgDQAFgEAJAAIAHAAIAAgDQAAgEgDgCQgCgCgEgBQgDAAgDACQgDACAAAEIgHAAQAAgEACgDQADgDADgBQAEgCAEgBQAHABAFAEQAEADAAAGIAAATQAAAHACADIAAAAIgIAAIgBgEQgFAGgGgBQgHAAgEgDgAgKAJQAAADADACQACACAEAAQACAAADgCQADgCACgDIAAgIIgGAAQgNgBAAAJg");
	this.shape.setTransform(443.925,58.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgKAWIAAgqIAHAAIABAFQACgGAHAAIAEABIAAAHIgFAAQgGAAgCAFIAAAeg");
	this.shape_1.setTransform(440.55,58.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgNATQgEgEAAgGQAAgGAFgDQAFgEAJAAIAHAAIAAgDQAAgEgDgCQgCgCgEgBQgDAAgDACQgDACAAAEIgHAAQAAgEACgDQADgDADgBQAEgCAEgBQAHABAFAEQAEADAAAGIAAATQAAAHACADIAAAAIgIAAIgBgEQgFAGgGgBQgHAAgEgDgAgKAJQAAADADACQACACAEAAQACAAADgCQADgCACgDIAAgIIgGAAQgNgBAAAJg");
	this.shape_2.setTransform(436.725,58.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgMASQgEgEAAgIIAAgbIAHAAIAAAbQAAAJAIAAQAIAAADgFIAAgfIAHAAIAAAqIgHAAIAAgEQgEAFgIAAQgHAAgDgEg");
	this.shape_3.setTransform(432.275,58.95);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJAbQgFgCgDgEQgDgEAAgFIAIAAQAAAFAEADQAEADAFAAQAGAAAEgCQACgDAAgEQAAgEgCgCQgDgDgIgCQgJgDgFgDQgEgEAAgGQAAgHAFgEQAGgFAIAAQAFAAAGACQAEADADAEQACAEAAAFIgIAAQAAgGgDgDQgEgDgFAAQgFAAgDADQgEACAAAFQAAADAEADQADACAGACQAHACAEACQAEACACADQACAEAAAEQAAAHgGAEQgFAFgJAAQgFAAgFgDg");
	this.shape_4.setTransform(427.6,58.175);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3498DB").s().p("Aj8D9QhphpAAiUQAAiTBphqQBphoCTAAQCVAABoBoQBpBqAACTQAACUhpBpQhoBpiVAAQiTAAhphpg");
	this.shape_5.setTransform(437.8705,37.4545,0.9301,0.9301);

	this.instance = new lib.hehe();
	this.instance.setTransform(476.4,37.5,0.7145,0.9301,0,0,0,86.2,36);
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

	// Layer_3
	this.cobaha = new lib.bg5();
	this.cobaha.name = "cobaha";
	this.cobaha.setTransform(675.75,358.05);

	this.timeline.addTween(cjs.Tween.get(this.cobaha).wait(1));

	// Layer_1
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

	this.drag2G1 = new lib.drag7G7();
	this.drag2G1.name = "drag2G1";
	this.drag2G1.setTransform(798.3,246.35,0.8086,0.8086,0,0,0,82.2,26.7);
	new cjs.ButtonHelper(this.drag2G1, 0, 1, 1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgJApQgLAAgGgGQgHgHABgKQABgMAKgGQAKgHAQAAIAOAAIAAgHQACgHgEgEQgEgEgGAAQgHAAgEADQgGAEgBAFIgOAAQACgGAEgGQAFgFAHgDQAHgDAIAAQAMAAAHAIQAHAHgBAMIgHAmIAAAGIABAIIgBABIgMAAIgBgEIAAgFQgLAKgKAAIgBAAgAgLAFQgGAEgCAHQAAAGADAEQADADAGAAQAHABAFgEQAFgDAFgFIACgRIgKAAQgLAAgHAEg");
	this.shape_6.setTransform(167.65,195.7761);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgZAeQgIgKABgRIAAgDQACgLAGgKQAFgJAJgFQAIgFAIAAQANAAAHAIQAHAIAAANIAAAKIgBAFIgzAAQgBALAFAHQAFAIAJAAQALAAAKgKIAIAGQgFAHgIAEQgIAEgJAAQgOAAgJgLgAgIgXQgGAFgDAMIAlAAIABgBQABgJgEgHQgFgGgHAAIgCAAQgGAAgGAGg");
	this.shape_7.setTransform(160.0388,195.7977);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgNA5QgLgBgHgIQgGgIgBgOIABgLQABgMAFgIQAGgKAHgFQAIgFAJAAQAMABAHAJIAIgpIANAAIgUBvIgLAAIABgIQgJAKgMAAIgBAAgAgMgIQgHAFgCAHQgEAJAAAKQAAAKAEAGQAEAGAHAAQALABAJgMIAGgkQgEgLgMAAQgGAAgGAFg");
	this.shape_8.setTransform(152.25,194.2011);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgPA2IANhOIANAAIgNBOgAADgnQgDgCAAgEQABgDACgDQACgCADAAQAEAAACACQACACAAAEQAAADgCACQgCADgEAAQgDAAgCgCg");
	this.shape_9.setTransform(146.15,194.3458);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgEApQgKAAgHgGQgIgEgDgKQgDgJABgLQABgLAFgKQAGgJAJgGQAIgGAKABQAKAAAHAFQAHAGAEAJQADAJgBALIAAAAQgCAMgFAJQgGAKgIAFQgIAFgIAAIgCAAgAgMgVQgHAIgCANIAAABIAAAKQABAIAEAGQAFAFAHAAQAGAAAFgDQAGgEAEgHQADgHACgJIAAgJQgBgJgFgGQgEgFgHAAIgBAAQgJAAgHAIg");
	this.shape_10.setTransform(139.9614,195.8);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgYAoIANhNIAMgBIgBAKQAIgMALAAIAGACIgBANIgGgBQgNAAgGALIgKA3g");
	this.shape_11.setTransform(133.625,195.7);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgMAoQgMAAgFgIQgGgIACgNIAIgyIAOAAIgJAyIAAAGQAAAFADADQADADAFABQANAAAIgMIAKg4IANAAIgOBOIgMAAIABgIQgIAJgNAAIgBAAg");
	this.shape_12.setTransform(126.9839,195.8762);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgPA2IAOhOIAMAAIgNBOgAACgnQgCgCAAgEQAAgDACgDQACgCAEAAQADAAADACQACACAAAEQAAADgCACQgDADgDAAQgEAAgCgCg");
	this.shape_13.setTransform(121.1,194.3458);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAMA4IAJg0IAAgGQgBgKgLAAQgLAAgJAMIgKA4IgNAAIAUhvIANAAIgIArQAJgMAOABQALAAAFAHQAGAIgCAMIgIA0g");
	this.shape_14.setTransform(114.7661,194.125);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgmA4IAThtIAMAAIgBAJQAJgLANABQAMAAAGAIQAHAIAAAOIAAAJIgBACQgBAMgFAJQgFAJgIAFQgHAFgJAAQgNgBgHgJIgHAngAgJggIgHAlQAFAKALABQAJAAAHgIQAHgIACgOIABgHQAAgKgEgGQgFgGgHAAIgBAAQgKAAgIALg");
	this.shape_15.setTransform(106.375,197.2489);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgHA3QgKgBgIgEQgIgFgEgJQgEgJgBgLQAAgJACgMQADgNAGgLQAGgKAIgHQAMgIANAAQAQAAAJALQAJAKABASIgCATQgCAMgFAKQgEAKgIAHQgMAMgQAAIgBAAgAgJglQgIAGgEALQgFALgCAQIAAAFQAAAOAFAIQAGAJAKAAQANAAAJgKQAJgLADgSIACgPQABgPgGgIQgFgIgLAAIgCAAQgIAAgHAFg");
	this.shape_16.setTransform(97.8708,194.4246);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgPAmQgHgEgEgGQgFgGAAgHIAOAAQAAAHAFAEQAGAEAHAAQAIAAAEgDQAFgEAAgEQAAgGgEgDQgFgDgJgDQgKgCgGgCQgGgCgDgFQgDgEAAgGQAAgJAIgIQAJgGAMAAQANAAAIAGQAJAIgBAKIgNAAQAAgFgFgEQgFgEgGAAQgHAAgEADQgEAEgBAFQAAAEAEADQAFACAJACQAKADAGADQAHACADAFQACAEAAAHQAAAKgIAHQgJAGgNAAQgIAAgIgDg");
	this.shape_17.setTransform(190.55,175.8);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_18.setTransform(182.625,175.8);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgGA4IAAhvIANAAIAABvg");
	this.shape_19.setTransform(176.725,174.125);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgXAeQgJgKgBgSIAAgCQAAgLAFgKQAFgIAHgGQAJgFAIAAQAQAAAIAKQAJAKAAATIAAAFIg1AAQAAAMAHAGQAHAIAIAAQAHAAAGgDQAEgDAEgFIAJAHQgKAPgVAAQgPAAgKgLgAgMgXQgFAGgBALIAmAAIAAgBQAAgKgFgHQgGgFgIAAQgHAAgGAGg");
	this.shape_20.setTransform(171.05,175.8);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAYA1IglgxIgNANIAAAkIgOAAIAAhpIAOAAIAAA0IAvg0IARAAIgpAvIAsA6g");
	this.shape_21.setTransform(162.925,174.425);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_22.setTransform(150.625,174.125);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIANAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_23.setTransform(144.5,174.35);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgLIAPAAIAAgTIAMAAIAAATIAPAAIAAALIgPAAIAAAwQAAAEACADQACADAFgBIAHgBIAAALIgLACQgJAAgEgFg");
	this.shape_24.setTransform(140.025,174.9);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgPAmQgHgEgFgGQgDgGAAgHIANAAQABAHAFAEQAEAEAIAAQAHAAAGgDQAEgEAAgEQAAgGgEgDQgEgDgKgDQgKgCgGgCQgGgCgDgFQgDgEAAgGQAAgJAIgIQAJgGALAAQAOAAAJAGQAHAIABAKIgOAAQAAgFgEgEQgGgEgHAAQgGAAgEADQgFAEABAFQAAAEADADQAEACAKACQAKADAGADQAGACADAFQAEAEAAAHQAAAKgJAHQgIAGgOAAQgIAAgIgDg");
	this.shape_25.setTransform(133.9,175.8);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgGA2IAAhOIAMAAIAABOgAgFgoQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_26.setTransform(128.25,174.35);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_27.setTransform(124.25,175.725);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgWAeQgLgKABgSIAAgCQgBgLAFgKQAEgIAJgGQAHgFAJAAQAPAAAJAKQAIAKAAATIAAAFIg0AAQAAAMAGAGQAIAIAJAAQAGAAAFgDQAFgDAEgFIAIAHQgKAPgTAAQgPAAgKgLgAgMgXQgGAGgBALIAnAAIAAgBQgBgKgFgHQgEgFgJAAQgHAAgGAGg");
	this.shape_28.setTransform(117.45,175.8);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgCAtQgEgGAAgKIAAgwIgPAAIAAgLIAPAAIAAgTIAMAAIAAATIAPAAIAAALIgPAAIAAAwQAAAEACADQACADAFgBIAHgBIAAALIgLACQgJAAgEgFg");
	this.shape_29.setTransform(110.775,174.9);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AARA4IgbgkIgIAIIAAAcIgOAAIAAhvIAOAAIAABDIAHgJIAYgZIAQAAIgeAgIAiAug");
	this.shape_30.setTransform(105.275,174.125);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_31.setTransform(96.875,175.8);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgSAoIAAhOIANAAIAAAJQAGgKAMAAIAGABIAAAMIgHAAQgMAAgFALIAAA3g");
	this.shape_32.setTransform(90.65,175.725);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgYAjQgIgHAAgKQAAgNAKgFQAJgIAQABIANAAIAAgHQAAgHgEgEQgEgFgIAAQgHABgFAEQgFADAAAFIgNAAQAAgFAEgGQAEgGAIgDQAHgDAHAAQAOAAAIAGQAIAIAAALIAAAkQAAALADAGIAAABIgPAAIgBgIQgKAKgMAAQgMAAgHgGgAgSAQQAAAGAEAEQAEADAHAAQAFAAAGgDQAGgEACgEIAAgRIgKAAQgYAAAAAPg");
	this.shape_33.setTransform(83.625,175.8);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AAYA1IglgxIgNANIAAAkIgOAAIAAhpIAOAAIAAA0IAvg0IARAAIgpAvIAsA6g");
	this.shape_34.setTransform(75.475,174.425);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AARAmIAAgwQAAgIgEgEQgEgEgHAAQgFAAgFADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_35.setTransform(398.9,190.675);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgXAgQgGgGgBgJQABgMAIgFQAJgHAPAAIAMAAIAAgGQAAgGgEgEQgEgEgHAAQgGAAgFADQgEADAAAFIgNAAQAAgFAEgFQAEgGAGgDQAIgCAHAAQAMgBAHAHQAIAHAAAKIAAAhQAAALACAGIAAABIgNAAIgCgIQgIAJgMAAQgKAAgIgGgAgRAPQAAAGAEADQAEADAGABQAFAAAGgDQAFgEACgEIAAgQIgKAAQgWAAAAAOg");
	this.shape_36.setTransform(391.25,190.75);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AARAlIgRg3IgRA3IgKAAIgVhJIAMAAIAPA2IARg2IAJAAIASA3IAOg3IANAAIgWBJg");
	this.shape_37.setTransform(382.2,190.75);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgKgEgFQgFgFgIAAQgHAAgFAFg");
	this.shape_38.setTransform(373.325,190.75);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AAZAyIAAguIgxAAIAAAuIgNAAIAAhjIANAAIAAArIAxAAIAAgrIANAAIAABjg");
	this.shape_39.setTransform(364.525,189.475);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AAQA1IgZgiIgIAIIAAAaIgNAAIAAhoIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgArg");
	this.shape_40.setTransform(353.025,189.2);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgFAzIAAhKIALAAIAABKgAgEglQgCgCAAgDQAAgDACgCQACgDACAAQAEAAACADQABACAAADQAAADgBACQgCACgEAAQgCAAgCgCg");
	this.shape_41.setTransform(347.3,189.4);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_42.setTransform(343.125,189.925);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgEgFQgDgGAAgHIAMAAQAAAGAGAFQAEADAHAAQAHAAAEgDQAFgDAAgEQgBgFgDgEQgEgCgJgDQgKgCgFgCQgGgCgCgEQgDgEAAgGQAAgJAIgGQAHgHAMABQAMgBAIAHQAHAGAAALIgMAAQAAgGgFgDQgEgEgGAAQgHAAgDADQgFADAAAFQAAAEAFADIALAEQAKACAGADQAFACAEAFQACADAAAHQABAKgJAGQgIAFgMAAQgIABgHgEg");
	this.shape_43.setTransform(337.45,190.75);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgGAzIAAhKIANAAIAABKgAgFglQgCgCAAgDQAAgDACgCQADgDACAAQAEAAACADQACACAAADQAAADgCACQgCACgEAAQgCAAgDgCg");
	this.shape_44.setTransform(332.15,189.4);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIAMAAIAAAIQAGgKALAAIAGABIAAAMIgHAAQgLAAgFAKIAAA0g");
	this.shape_45.setTransform(328.45,190.675);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgKgEgFQgFgFgIAAQgHAAgFAFg");
	this.shape_46.setTransform(322.075,190.75);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_47.setTransform(315.825,189.925);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AAQA1IgZgiIgIAIIAAAaIgNAAIAAhoIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgArg");
	this.shape_48.setTransform(310.675,189.2);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgWAgQgIgGAAgJQAAgMAJgFQAJgHAPAAIAMAAIAAgGQAAgGgDgEQgFgEgHAAQgGAAgFADQgEADAAAFIgNAAQAAgFAEgFQAEgGAHgDQAGgCAIAAQAMgBAIAHQAGAHABAKIAAAhQAAALADAGIAAABIgOAAIgCgIQgIAJgLAAQgMAAgGgGgAgRAPQAAAGAEADQAEADAGABQAFAAAFgDQAGgEACgEIAAgQIgKAAQgWAAAAAOg");
	this.shape_49.setTransform(302.85,190.75);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIAMAAIAAAIQAGgKALAAIAGABIAAAMIgHAAQgLAAgFAKIAAA0g");
	this.shape_50.setTransform(297.05,190.675);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgWAgQgIgGABgJQgBgMAKgFQAIgHAPAAIAMAAIAAgGQAAgGgDgEQgFgEgHAAQgGAAgEADQgFADgBAFIgMAAQAAgFAEgFQAEgGAHgDQAHgCAGAAQANgBAIAHQAGAHABAKIAAAhQAAALADAGIAAABIgOAAIgCgIQgIAJgLAAQgMAAgGgGgAgRAPQAAAGAEADQAEADAGABQAFAAAFgDQAGgEACgEIAAgQIgJAAQgXAAAAAOg");
	this.shape_51.setTransform(290.5,190.75);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AAWAyIgigvIgMANIAAAiIgNAAIAAhjIANAAIAAAxIArgxIAQAAIgmAsIApA3g");
	this.shape_52.setTransform(282.875,189.475);

	this.g3 = new lib.g3();
	this.g3.name = "g3";
	this.g3.setTransform(850,290.5);

	this.g2 = new lib.g2();
	this.g2.name = "g2";
	this.g2.setTransform(733,290.5);

	this.g1 = new lib.g1();
	this.g1.name = "g1";
	this.g1.setTransform(614,290.5);

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

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AABAOQAIgKAAgLIAAgMIAPAAIAAALQAAAIgEAHQgEAIgGAFgAgXAOQAHgKABgLIAAgMIAPAAIAAALQAAAIgEAHQgEAIgHAFg");
	this.shape_53.setTransform(714.625,113.525);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_54.setTransform(709.625,118.125);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_55.setTransform(702.85,119.675);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_56.setTransform(696.075,118.125);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgGAAgIIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgFQgEgEAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgGgFgFQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEADALACQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKABgIgEg");
	this.shape_57.setTransform(685.425,119.75);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgbAnQgJgIAAgLQAAgOALgGQAKgJASAAIAPAAIAAgHQAAgHgEgFQgFgFgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgHAFgGQAEgGAIgEQAJgDAIAAQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgHQgLAMgOgBQgNAAgIgHgAgUASQgBAHAFAEQAFAEAIABQAGAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_58.setTransform(676.4,119.75);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_59.setTransform(669.725,117.875);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgLAJgFQAKgHAJABQASAAAJALQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLASgXgBQgRABgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_60.setTransform(663.225,119.75);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_61.setTransform(654.925,117.875);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AAvAuIAAg7QAAgJgEgFQgEgFgLAAQgIAAgGAFQgGAGAAAIIAAA7IgPAAIAAg6QAAgUgTAAQgPAAgFANIAABBIgQAAIAAhZIAOAAIABAKQAKgMAQAAQAUAAAFAPQAFgHAHgEQAHgEAKAAQAdAAABAgIAAA7g");
	this.shape_62.setTransform(638.4,119.675);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgLQAAgOALgGQAKgJATAAIAOAAIAAgHQABgHgFgFQgFgFgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAEgGAIgEQAJgDAIAAQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgHQgLAMgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAEAIABQAGAAAGgFQAHgDACgGIAAgTIgMAAQgbAAAAARg");
	this.shape_63.setTransform(626.3,119.75);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_64.setTransform(619.625,117.875);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgLQAAgOALgGQAKgJATAAIAPAAIAAgHQAAgHgFgFQgFgFgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgHAEgGQAFgGAJgEQAIgDAJAAQAPgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgHQgLAMgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAEAIABQAGAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_65.setTransform(612.9,119.75);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgVIAAgBQAAgUAKgMQAKgMAQAAQAOgBAKALIAAguIAPAAIAAB+IgOAAIgBgKQgJAMgQgBQgPAAgKgMgAgPgGQgHAIAAARQAAAQAHAIQAGAJAKAAQAPgBAHgNIAAgnQgHgOgPAAQgKABgGAIg");
	this.shape_66.setTransform(603.275,117.95);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgGAAgIIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgFQgEgEAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgGgFgFQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEADALACQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKABgIgEg");
	this.shape_67.setTransform(590.125,119.75);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgLAJgFQAKgHAJABQASAAAJALQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLASgXgBQgRABgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_68.setTransform(581.325,119.75);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_69.setTransform(574.675,118.125);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgGAAgIIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgFQgEgEAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgGgFgFQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEADALACQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKABgIgEg");
	this.shape_70.setTransform(568.225,119.75);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgLAJgFQAKgHAJABQASAAAJALQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLASgXgBQgRABgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_71.setTransform(559.425,119.75);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AglA/IAAh7IAOAAIABAKQAKgMAPAAQAQAAAKAMQAJAMAAAWIAAACQAAATgJAMQgKANgQAAQgPAAgJgKIAAArgAgVglIAAAqQAGAMAOAAQAKABAHgJQAGgJABgQQgBgPgGgJQgHgJgKAAQgOAAgGAMg");
	this.shape_72.setTransform(550.25,121.4);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgGAAgIIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgFQgEgEAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgGgFgFQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEADALACQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKABgIgEg");
	this.shape_73.setTransform(540.925,119.75);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_74.setTransform(527.65,119.675);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgLQAAgOALgGQAKgJATAAIAOAAIAAgHQABgHgFgFQgFgFgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAEgGAIgEQAJgDAIAAQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgHQgLAMgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAEAIABQAGAAAGgFQAHgDACgGIAAgTIgMAAQgbAAAAARg");
	this.shape_75.setTransform(518.3,119.75);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_76.setTransform(509.975,117.875);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgbAnQgJgIAAgLQAAgOALgGQAKgJASAAIAPAAIAAgHQAAgHgEgFQgFgFgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgHAFgGQAEgGAIgEQAJgDAIAAQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgHQgLAMgOgBQgNAAgIgHgAgUASQgBAHAFAEQAFAEAIABQAGAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_77.setTransform(500.45,119.75);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AglA/IAAh7IAOAAIABAKQAJgMAQAAQAQAAAKAMQAJAMAAAWIAAACQAAATgJAMQgKANgQAAQgPAAgKgKIAAArgAgWglIAAAqQAIAMAOAAQAJABAHgJQAHgJgBgQQABgPgHgJQgHgJgJAAQgOAAgIAMg");
	this.shape_78.setTransform(491.25,121.4);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgJALgQAAQgOAAgIgIg");
	this.shape_79.setTransform(481.625,119.825);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_80.setTransform(474.525,119.675);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgLAJgFQAKgHAJABQASAAAJALQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLASgXgBQgRABgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_81.setTransform(466.775,119.75);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgJgFgFQgEgFgLAAQgIAAgGAFQgFAGgCAIIAAA7IgOAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgPAAIAAhZIAPAAIAAAKQAKgMARAAQASAAAHAPQAEgHAHgEQAHgEAKAAQAeAAAAAgIAAA7g");
	this.shape_82.setTransform(454.75,119.675);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgSA7QgKgEgFgHIAJgKQAKANAOAAQAKAAAGgGQAHgHgBgLIAAgIQgJAKgPAAQgPAAgKgMQgKgMAAgWQAAgVAKgMQAJgMARAAQAPAAAJALIABgKIAOAAIAABXQAAASgKAKQgLAKgRAAQgJgBgJgEgAgPgpQgGAJgBARQABAPAGAIQAGAJAKAAQAPgBAGgNIAAgnQgGgOgPAAQgKABgGAIg");
	this.shape_83.setTransform(438.15,121.45);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_84.setTransform(428.85,119.675);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgLQAAgOALgGQALgJASAAIAPAAIAAgHQAAgHgFgFQgFgFgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAEgGQAGgGAIgEQAIgDAJAAQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgHQgLAMgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAEAHABQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_85.setTransform(419.5,119.75);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgbA/IgFgBIAAgNIAEABQAIAAAEgEQAEgDADgIIAEgJIgghYIAQAAIAWBCIAVhCIAQAAIgkBnQgHAWgTAAg");
	this.shape_86.setTransform(410.875,121.575);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAAAAgIAAA7g");
	this.shape_87.setTransform(397.95,119.675);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgLQAAgOALgGQAKgJATAAIAOAAIAAgHQABgHgFgFQgFgFgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAFgGAHgEQAJgDAIAAQAQgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgHQgLAMgNgBQgOAAgJgHgAgUASQAAAHAEAEQAFAEAIABQAGAAAGgFQAHgDACgGIAAgTIgMAAQgaAAAAARg");
	this.shape_88.setTransform(388.6,119.75);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AAVAtIgVhDIgVBDIgMAAIgahZIAPAAIASBDIAVhDIALAAIAVBEIAShEIAPAAIgaBZg");
	this.shape_89.setTransform(377.575,119.75);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgLAJgFQAKgHAJABQASAAAJALQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLASgXgBQgRABgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_90.setTransform(366.775,119.75);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAh/IAQAAIAAAxQAKgNAPAAQAdAAAAAfIAAA8g");
	this.shape_91.setTransform(357.55,117.875);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AgTAGIAAgLIAnAAIAAALg");
	this.shape_92.setTransform(350.475,119.125);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_93.setTransform(343.45,119.675);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AgbAnQgJgIAAgLQAAgOALgGQALgJARAAIAQAAIAAgHQgBgHgEgFQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAGgGAIgEQAIgDAJAAQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgHQgLAMgOgBQgNAAgIgHgAgVASQAAAHAFAEQAFAEAHABQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_94.setTransform(334.1,119.75);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AAVAtIgVhDIgVBDIgMAAIgahZIAPAAIASBDIAVhDIALAAIAVBEIAShEIAPAAIgaBZg");
	this.shape_95.setTransform(323.075,119.75);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgLAJgFQAKgHAJABQASAAAJALQAKAMAAAVIAAAGIg8AAQABANAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLASgXgBQgRABgMgMgAgNgaQgHAGgBANIAsAAIAAgCQgBgLgFgHQgGgGgKAAQgIAAgGAHg");
	this.shape_96.setTransform(312.275,119.75);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgPAAIAAh/IAPAAIAAAxQAKgNAPAAQAdAAABAfIAAA8g");
	this.shape_97.setTransform(303.05,117.875);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_98.setTransform(289.45,119.675);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AgbAnQgJgIAAgLQAAgOALgGQALgJARAAIAQAAIAAgHQgBgHgEgFQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAGgGAIgEQAIgDAJAAQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgHQgLAMgOgBQgNAAgIgHgAgVASQAAAHAFAEQAFAEAHABQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_99.setTransform(280.1,119.75);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_100.setTransform(271.775,117.875);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_101.setTransform(263.175,117.875);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgJALgQAAQgOAAgIgIg");
	this.shape_102.setTransform(253.625,119.825);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgGAAgIIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgFQgEgEAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgGgFgFQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEADALACQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKABgIgEg");
	this.shape_103.setTransform(244.575,119.75);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AgbAnQgJgIAAgLQAAgOALgGQALgJARAAIAQAAIAAgHQgBgHgEgFQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAGgGAIgEQAIgDAJAAQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgHQgLAMgOgBQgNAAgIgHgAgVASQAAAHAFAEQAFAEAHABQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_104.setTransform(235.55,119.75);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AAvAuIAAg7QAAgJgEgFQgEgFgLAAQgIAAgGAFQgGAGAAAIIAAA7IgPAAIAAg6QAAgUgTAAQgPAAgFANIAABBIgQAAIAAhZIAOAAIABAKQAKgMAQAAQAUAAAFAPQAFgHAHgEQAHgEAKAAQAdAAABAgIAAA7g");
	this.shape_105.setTransform(223.5,119.675);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_106.setTransform(787.45,95.275);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgGQAKgJASABIAPAAIAAgIQAAgHgEgFQgFgFgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgGAFgHQAEgGAIgEQAJgEAIABQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgGQgLALgOgBQgNAAgIgHgAgUASQgBAHAFAEQAFAFAIAAQAGAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_107.setTransform(778.1,95.35);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgMAQAAQAOgBAKALIAAguIAPAAIAAB+IgOAAIgBgJQgJALgQgBQgPAAgKgMgAgPgGQgHAIAAARQAAAQAHAIQAGAJAKAAQAPAAAHgOIAAgnQgHgNgPgBQgKABgGAIg");
	this.shape_108.setTransform(768.475,93.55);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AgKAuQgMAAgIgHQgHgHABgLQAAgPAMgHQAMgIASAAIAQAAIAAgHQABgIgEgFQgEgEgHAAQgIgBgFAEQgGAEgBAHIgPAAQAAgIAGgGQAFgGAJgEQAHgDAJAAQAOABAIAIQAIAIgCANIgHAsIAAAGIABAJIAAACIgQAAIAAgFIAAgFQgMAMgMAAIgBgBgAgMAGQgIAEgBAIQgBAHAEAEQAEAEAHAAQAHAAAFgDQAHgEAEgGIAEgTIgMAAQgNAAgHAFg");
	this.shape_109.setTransform(754.881,95.351);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AgCAuQgRAAgKgMQgJgMABgTIABgDQABgNAHgLQAGgLAKgFQAJgGAKAAQAOABAIAIQAIAJAAAQIAAAKIgBAGIg6AAQgBAMAFAJQAGAJALAAQAMAAALgMIAJAHQgGAIgIAFQgIAFgJAAIgCgBgAgJgbQgHAHgEANIArAAIAAgCQABgKgEgHQgFgHgJAAQgIAAgHAGg");
	this.shape_110.setTransform(746.3023,95.3525);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgPBAQgMAAgIgJQgHgKgBgQIABgLQABgOAGgKQAGgLAJgGQAIgFALAAQAOABAIAKIAIgvIAPAAIgWB/IgNAAIABgKQgKAMgOAAIgBgBgAgOgJQgHAFgDAJQgEAKAAALQAAAMAEAHQAFAGAIAAQAMABALgOIAHgoQgFgMgNgBIgBAAQgIAAgGAGg");
	this.shape_111.setTransform(737.4917,93.551);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AgRA9IAPhZIAOAAIgOBZgAADgtQgDgCABgEQgBgEADgDQADgCADAAQAEgBACADQADACAAAEQAAAEgDADQgCACgEAAIgBAAQgDAAgCgCg");
	this.shape_112.setTransform(730.55,93.7208);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AgFAuQgLAAgIgGQgJgFgDgLQgEgKABgNQABgNAHgLQAGgKAKgHQAKgGALABQALAAAIAFQAIAGAEALQAEAKgBANIgBABQgBANgGALQgHAKgJAGQgJAGgKAAIgCgBgAgOgYQgIAJgCAPIAAABIAAALQABAKAFAGQAFAGAIAAQAHABAGgFQAHgDAEgJQAEgIABgJIABgMQgBgKgFgGQgFgFgJgBQgKAAgJAJg");
	this.shape_113.setTransform(723.5157,95.3501);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AgcAuIAQhZIANAAIgBAKQAJgMANAAIAHABIgCAPIgHgBQgOAAgIANIgLA/g");
	this.shape_114.setTransform(716.325,95.274);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AgOAuQgNAAgGgJQgHgJACgQIAKg5IAPAAIgKA6IAAAHQAAAGADADQADAEAGAAQAPAAAJgNIALhBIAPAAIgPBZIgPAAIACgJQgKALgOAAIgBAAg");
	this.shape_115.setTransform(708.8609,95.4261);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AgRA9IAQhZIAOAAIgPBZgAADgtQgCgCgBgEQABgEACgDQACgCAEAAQAEgBADADQACACAAAEQAAAEgCADQgDACgEAAIgBAAQgDAAgCgCg");
	this.shape_116.setTransform(702.15,93.7208);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AAOBAIAKg7IAAgHQgBgMgMAAQgNAAgKAOIgLBAIgPAAIAWh/IAPAAIgJAxQALgNAPAAQANABAGAIQAGAJgCAOIgKA7g");
	this.shape_117.setTransform(694.99,93.475);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AgrA/IAWh7IANAAIgBAKQAKgMAPAAQANABAHAJQAHAJABAQIgBALIAAABQgBAOgGAKQgGALgIAFQgJAGgKgBQgOAAgJgKIgIArgAgKgkIgIAqQAFAMANAAQALAAAHgJQAIgJACgQIABgHQAAgMgEgHQgFgGgJgBIgBAAQgLAAgJANg");
	this.shape_118.setTransform(685.5,96.999);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AgJA+QgLAAgJgFQgIgFgFgLQgFgKAAgNQgBgKADgOQADgPAGgLQAHgNAKgGQANgKAPAAQASAAAKANQALALAAAVQABAIgCANQgDANgFAMQgGALgIAIQgOANgSAAIgCAAgAgKgpQgJAGgGANQgFAMgCATIAAAFQAAAQAGAJQAGAJAMABQAPAAAKgLQALgMADgVQACgKAAgHQAAgRgGgJQgGgJgMgBQgKABgJAGg");
	this.shape_119.setTransform(675.9258,93.7997);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgEQgEgFAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgHgFgEQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEACALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKAAgIgDg");
	this.shape_120.setTransform(661.475,95.35);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgGQAKgJASABIAPAAIAAgIQAAgHgEgFQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAFgHQAEgGAJgEQAIgEAIABQAQgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgGQgLALgOgBQgNAAgIgHgAgUASQgBAHAFAEQAFAFAHAAQAHAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_121.setTransform(652.45,95.35);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_122.setTransform(645.775,93.475);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgKAJgHQAKgFAJAAQASAAAJALQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLARgXAAQgRABgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_123.setTransform(639.275,95.35);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_124.setTransform(630.975,93.475);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_125.setTransform(618.175,93.475);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_126.setTransform(611.225,93.725);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgVIAPAAIAAAVIAQAAIAAAMIgQAAIAAA3QAAAFABADQADADAGAAIAHgBIAAAMIgMABQgLABgDgHg");
	this.shape_127.setTransform(606.1,94.35);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgEQgEgFAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgHgFgEQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEACALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKAAgIgDg");
	this.shape_128.setTransform(599.225,95.35);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_129.setTransform(592.775,93.725);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_130.setTransform(588.275,95.275);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgKAJgHQAKgFAJAAQASAAAJALQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLARgXAAQgRABgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_131.setTransform(580.525,95.35);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgVIAPAAIAAAVIAQAAIAAAMIgQAAIAAA3QAAAFABADQADADAFAAIAIgBIAAAMIgMABQgLABgDgHg");
	this.shape_132.setTransform(572.9,94.35);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_133.setTransform(566.675,93.475);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgGQAKgJASABIAPAAIAAgIQAAgHgEgFQgFgFgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgGAFgHQAEgGAIgEQAJgEAIABQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgGQgLALgOgBQgNAAgIgHgAgUASQgBAHAFAEQAFAFAIAAQAGAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_134.setTransform(557.15,95.35);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_135.setTransform(550.125,95.275);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQAKgJATABIAOAAIAAgIQABgHgFgFQgFgFgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgGAEgHQAFgGAIgEQAJgEAIABQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAFAIAAQAGAAAGgFQAHgDACgGIAAgTIgMAAQgbAAAAARg");
	this.shape_136.setTransform(542.15,95.35);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_137.setTransform(533.825,93.475);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_138.setTransform(522.325,95.275);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQAKgJATABIAPAAIAAgIQAAgHgFgFQgFgFgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgGAEgHQAFgGAJgEQAIgEAJABQAPgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAFAHAAQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_139.setTransform(514.35,95.35);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgQAAIAAgMIAQAAIAAgVIAOAAIAAAVIARAAIAAAMIgRAAIAAA3QAAAFADADQACADAFAAIAHgBIAAAMIgLABQgKABgFgHg");
	this.shape_140.setTransform(506.7,94.35);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("AgMBAIAAhMIgOAAIAAgNIAOAAIAAgJQAAgOAIgIQAGgHAOgBIALABIgBANIgIAAQgIAAgEAEQgEAEAAAIIAAAJIATAAIAAANIgTAAIAABMg");
	this.shape_141.setTransform(501.525,93.4);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQAKgJATABIAPAAIAAgIQAAgHgFgFQgFgFgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgGAEgHQAFgGAJgEQAIgEAJABQAPgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAFAHAAQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_142.setTransform(493.65,95.35);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgMAQAAQAOgBAKALIAAguIAPAAIAAB+IgOAAIgBgJQgJALgQgBQgPAAgKgMgAgPgGQgHAIAAARQAAAQAHAIQAGAJAKAAQAPAAAHgOIAAgnQgHgNgPgBQgKABgGAIg");
	this.shape_143.setTransform(484.025,93.55);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_144.setTransform(470.55,95.275);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgGQAKgJASABIAPAAIAAgIQAAgHgEgFQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAFgHQAEgGAIgEQAJgEAJABQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgGQgLALgOgBQgNAAgIgHgAgUASQgBAHAFAEQAFAFAHAAQAHAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_145.setTransform(461.2,95.35);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFFF").s().p("AgSA7QgKgEgFgHIAJgKQAKANAOAAQAKAAAGgGQAHgHgBgLIAAgIQgJAKgPAAQgPAAgKgMQgKgMAAgVQAAgWAKgMQAJgMARAAQAPAAAJALIABgKIAOAAIAABXQAAASgKAKQgLAKgRAAQgJgBgJgEgAgPgpQgGAJgBARQABAPAGAIQAGAJAKAAQAPAAAGgOIAAgnQgGgNgPgBQgKABgGAIg");
	this.shape_146.setTransform(451.65,97.05);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_147.setTransform(442.35,95.275);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgKAJgHQAKgFAJAAQASAAAJALQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLARgXAAQgRABgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_148.setTransform(433.225,95.35);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgMAQAAQAOgBAKALIAAguIAPAAIAAB+IgOAAIgBgJQgJALgQgBQgPAAgKgMgAgPgGQgHAIAAARQAAAQAHAIQAGAJAKAAQAPAAAHgOIAAgnQgHgNgPgBQgKABgGAIg");
	this.shape_149.setTransform(423.625,93.55);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_150.setTransform(410.15,95.275);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgGQALgJARABIAQAAIAAgIQgBgHgEgFQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAEgHQAFgGAJgEQAIgEAJABQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgOgBQgNAAgIgHgAgVASQAAAHAFAEQAFAFAHAAQAHAAAHgFQAGgDADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_151.setTransform(400.8,95.35);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFFF").s().p("AAVAtIgVhDIgVBDIgMAAIgahZIAPAAIASBCIAVhCIALAAIAVBEIAShEIAPAAIgaBZg");
	this.shape_152.setTransform(389.775,95.35);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgKAJgHQAKgFAJAAQASAAAJALQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLARgXAAQgRABgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_153.setTransform(378.975,95.35);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAGIAABAIgPAAIAAh/IAPAAIAAAxQAKgNAQAAQAcAAABAfIAAA8g");
	this.shape_154.setTransform(369.75,93.475);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_155.setTransform(357.125,93.475);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_156.setTransform(350.175,93.725);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgQAAIAAgMIAQAAIAAgVIAOAAIAAAVIARAAIAAAMIgRAAIAAA3QAAAFACADQADADAFAAIAHgBIAAAMIgLABQgKABgFgHg");
	this.shape_157.setTransform(345.05,94.35);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAEQAFAFAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgCQgMgDgGgDQgHgDgDgEQgEgFAAgHQAAgLAKgIQAJgHANAAQAQgBAJAJQAKAHAAANIgQAAQAAgHgFgEQgFgFgJAAQgHAAgFAEQgEADAAAHQAAAFAEADQAEACALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPgBQgKAAgIgDg");
	this.shape_158.setTransform(338.175,95.35);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_159.setTransform(331.725,93.725);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_160.setTransform(327.225,95.275);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FFFFFF").s().p("AgaAjQgLgMAAgVIAAgCQAAgMAFgLQAFgKAJgHQAKgFAJAAQASAAAJALQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAHQgLARgXAAQgRABgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_161.setTransform(319.475,95.35);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgQAAIAAgMIAQAAIAAgVIAOAAIAAAVIARAAIAAAMIgRAAIAAA3QAAAFADADQACADAFAAIAHgBIAAAMIgLABQgKABgFgHg");
	this.shape_162.setTransform(311.85,94.35);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_163.setTransform(305.625,93.475);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQAKgJATABIAPAAIAAgIQAAgHgFgFQgFgFgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgGAEgHQAFgGAJgEQAIgEAJABQAPgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgNgBQgOAAgJgHgAgVASQABAHAEAEQAFAFAHAAQAHAAAHgFQAGgDADgGIAAgTIgNAAQgbAAAAARg");
	this.shape_164.setTransform(296.1,95.35);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_165.setTransform(289.075,95.275);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgGQALgJARABIAQAAIAAgIQgBgHgEgFQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAEgHQAFgGAJgEQAIgEAJABQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgGQgLALgOgBQgNAAgIgHgAgVASQAAAHAFAEQAFAFAHAAQAHAAAHgFQAGgDADgGIAAgTIgMAAQgcAAAAARg");
	this.shape_166.setTransform(281.1,95.35);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_167.setTransform(272.775,93.475);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_168.setTransform(261.275,95.275);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgGQAKgJASABIAPAAIAAgIQAAgHgEgFQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAFgHQAEgGAJgEQAIgEAJABQAPgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgGQgLALgOgBQgNAAgIgHgAgUASQgBAHAFAEQAFAFAHAAQAHAAAGgFQAHgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_169.setTransform(253.3,95.35);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FFFFFF").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgVIAPAAIAAAVIAQAAIAAAMIgQAAIAAA3QAAAFABADQADADAGAAIAHgBIAAAMIgMABQgLABgDgHg");
	this.shape_170.setTransform(245.65,94.35);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FFFFFF").s().p("AgMBAIAAhMIgOAAIAAgNIAOAAIAAgJQAAgOAIgIQAGgHAOgBIALABIgBANIgIAAQgIAAgEAEQgEAEAAAIIAAAJIATAAIAAANIgTAAIAABMg");
	this.shape_171.setTransform(240.475,93.4);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgGQAKgJASABIAPAAIAAgIQAAgHgEgFQgFgFgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAFgHQAEgGAIgEQAJgEAIABQAQgBAJAJQAJAHAAANIAAApQAAAMADAIIAAABIgQAAQgBgDgBgGQgLALgOgBQgNAAgIgHgAgUASQgBAHAFAEQAFAFAHAAQAHAAAHgFQAGgDACgGIAAgTIgLAAQgbAAAAARg");
	this.shape_172.setTransform(232.6,95.35);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgMAQAAQAOgBAKALIAAguIAPAAIAAB+IgOAAIgBgJQgJALgQgBQgPAAgKgMgAgPgGQgHAIAAARQAAAQAHAIQAGAJAKAAQAPAAAHgOIAAgnQgHgNgPgBQgKABgGAIg");
	this.shape_173.setTransform(222.975,93.55);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_174.setTransform(209.5,95.275);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgGQAKgJATABIAOAAIAAgIQABgHgFgFQgFgFgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAEgHQAFgGAIgEQAJgEAIABQAQgBAJAJQAIAHABANIAAApQAAAMADAIIAAABIgQAAQgCgDAAgGQgLALgNgBQgOAAgJgHgAgUASQAAAHAEAEQAFAFAIAAQAGAAAGgFQAHgDACgGIAAgTIgMAAQgaAAAAARg");
	this.shape_175.setTransform(200.15,95.35);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_176.setTransform(191.825,93.475);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#FFFFFF").s().p("AgcAiQgMgMAAgVIAAgBQAAgNAGgLQAFgKAIgGQAKgFALAAQASAAALAMQAMANAAAUIAAABQAAANgFALQgFAKgKAGQgJAFgMAAQgSAAgKgMgAgRgYQgIAJABAQQgBAPAIAJQAGAJALAAQALAAAIgJQAGgJABgQQgBgOgGgKQgIgJgLAAQgLAAgGAJg");
	this.shape_177.setTransform(182.1,95.35);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#FFFFFF").s().p("AgaAjQgLgNAAgVIAAgBQAAgOAFgKQAFgKAJgGQAJgGALABQAPgBAKAKQAKAIABAPIgPAAQgBgIgFgGQgGgGgJAAQgLAAgGAIQgGAJgBAQIAAACQABAPAGAJQAGAIALAAQAJAAAFgFQAHgFAAgHIAPAAQAAAHgGAHQgFAHgHAFQgJADgJAAQgRABgLgMg");
	this.shape_178.setTransform(172.9,95.35);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#FFFFFF").s().p("AgcAiQgMgMAAgVIAAgBQAAgNAFgLQAGgKAJgGQAJgFALAAQASAAALAMQAMANAAAUIAAABQAAANgFALQgFAKgJAGQgKAFgMAAQgSAAgKgMgAgSgYQgGAJgBAQQABAPAGAJQAIAJAKAAQAMAAAGgJQAIgJAAgQQAAgOgIgKQgGgJgMAAQgKAAgIAJg");
	this.shape_179.setTransform(163.5,95.35);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#FFFFFF").s().p("AghAvQgMgQAAgaIAAgKQAAgRAFgMQAGgNALgHQALgHAOAAQATAAAMALQAMAKABATIgQAAQgBgOgIgHQgHgGgMAAQgPAAgIAMQgJAKAAAVIAAALQABAUAHAMQAJALAOAAQANAAAHgGQAHgGACgPIAQAAQgCATgMALQgLAKgUAAQgVAAgNgPg");
	this.shape_180.setTransform(153.3,93.8);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#FFFFFF").s().p("AACAUIAAgKQAAgIAEgIQAEgIAGgFIAJAGQgIALAAALIAAALgAgYAUIAAgKQAAgIAEgIQAEgIAHgFIAJAGQgIALAAALIAAALg");
	this.shape_181.setTransform(144.975,88.95);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.bf(img.Bitmap2, null, new cjs.Matrix2D(1,0,0,1,-499,-300)).s().p("EhN9Au4MAAAhdvMCb7AAAMAAABdvg");
	this.shape_182.setTransform(471,266.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.btnNextDasar1},{t:this.btnMenuDasar1},{t:this.btnBack3},{t:this.slots},{t:this.pieces},{t:this.judulKI},{t:this.Score},{t:this.g1},{t:this.g2},{t:this.g3},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.drag2G1},{t:this.restart},{t:this.btnInfo}]}).wait(1));

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
		{src:"images/_10.png", id:"_10"},
		{src:"images/_20.jpeg", id:"_20"},
		{src:"images/_11.png", id:"_11"},
		{src:"images/Bitmap137.png", id:"Bitmap137"},
		{src:"images/Bitmap138.png", id:"Bitmap138"},
		{src:"images/Bitmap140.png", id:"Bitmap140"},
		{src:"images/Bitmap141.png", id:"Bitmap141"},
		{src:"images/Bitmap142.png", id:"Bitmap142"},
		{src:"images/Bitmap2.png", id:"Bitmap2"},
		{src:"images/Bitmap3.png", id:"Bitmap3"},
		{src:"images/bookpngcopy.png", id:"bookpngcopy"},
		{src:"images/flash0aiAssets.png", id:"flash0aiAssets"},
		{src:"images/flash0aiAssets_1.png", id:"flash0aiAssets_1"},
		{src:"images/flash0aiAssets_2.png", id:"flash0aiAssets_2"},
		{src:"images/Bitmap135.png", id:"Bitmap135"},
		{src:"images/Bitmap136.png", id:"Bitmap136"},
		{src:"images/flash0aiAssets_3.png", id:"flash0aiAssets_3"},
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