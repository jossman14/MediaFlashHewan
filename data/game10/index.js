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
p.nominalBounds = new cjs.Rectangle(0,0,569,296);


(lib._11 = function() {
	this.initialize(img._11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,534,631);


(lib._14 = function() {
	this.initialize(img._14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,739,388);


(lib._3 = function() {
	this.initialize(img._3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,452,340);


(lib.Bitmap101copy = function() {
	this.initialize(img.Bitmap101copy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,199,124);


(lib.Bitmap102copy = function() {
	this.initialize(img.Bitmap102copy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,233,124);


(lib.Bitmap103copy = function() {
	this.initialize(img.Bitmap103copy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,248,124);


(lib.Bitmap105 = function() {
	this.initialize(img.Bitmap105);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,212,124);


(lib.Bitmap111 = function() {
	this.initialize(img.Bitmap111);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,239,160);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);


(lib.bookpngcopy = function() {
	this.initialize(img.bookpngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,399);


(lib.flash0aiAssets = function() {
	this.initialize(img.flash0aiAssets);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,258);


(lib.flash0aiAssets_1 = function() {
	this.initialize(img.flash0aiAssets_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,153,152);


(lib.flash0aiAssets_2 = function() {
	this.initialize(img.flash0aiAssets_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,369,180);


(lib.flash0aiAssets_3 = function() {
	this.initialize(img.flash0aiAssets_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,153,152);


(lib._11_1 = function() {
	this.initialize(img._11_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,379,448);


(lib.Bitmap3 = function() {
	this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,249,87);


(lib._3_1 = function() {
	this.initialize(img._3_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,638,479);// helper functions:

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


(lib.satu1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgNARQgEgDAAgIIAAgbIAKAAIAAAbQAAAIAGAAQAHAAACgFIAAgeIAKAAIAAAqIgJAAIgBgEQgEAFgGAAQgIAAgDgFg");
	this.shape.setTransform(22.2,-69.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgEAPIAAgYIgHAAIAAgHIAHAAIAAgKIAIAAIAAAKIAIAAIAAAHIgIAAIAAAXIABAEQAAAAABAAQAAABABAAQAAAAABAAQAAAAABAAIADAAIAAAHIgGABQgKAAAAgMg");
	this.shape_1.setTransform(18.475,-69.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgNATQgFgEAAgFQAAgIAGgCQAFgEAIAAIAHAAIAAgCQAAgEgCgCQgDgCgDAAQgCAAgCABQgDACAAADIgKAAQABgDACgEQACgDAEgCQAFgCADAAQAIAAAFAFQAEADAAAHIAAATQAAAFABAEIAAAAIgKAAIAAgDQgFAEgFAAQgHAAgEgDgAgFADQgCACgBAEQAAAAABABQAAAAAAABQAAAAAAABQABABAAAAQACACADgBQACABADgCIAEgDIAAgJIgGAAQgFAAgCACg");
	this.shape_2.setTransform(15,-69.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgJAZIgBAFIgIAAIAAg8IAJAAIAAAWQAFgFAGAAQAIAAAFAGQAEAGAAAJIAAABQAAAKgEAGQgFAGgIAAQgHAAgEgGgAgJAAIAAARQADAGAGAAQAEAAADgEQACgDAAgHIAAgBQAAgHgCgCQgDgEgEAAQgGAAgDAFg");
	this.shape_3.setTransform(10.6,-70.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AAIAeIAAgbQAAgEgCgCQgCgCgEAAQgEAAgDAFIAAAeIgKAAIAAg8IAKAAIAAAXQAFgFAGgBQAOABAAAPIAAAbg");
	this.shape_4.setTransform(3.875,-70.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgOATQgDgEAAgFQAAgIAEgCQAGgEAIAAIAHAAIAAgCQAAgEgDgCQgCgCgDAAQgCAAgDABQgCACAAADIgJAAQgBgDADgEQACgDAFgCQAEgCAEAAQAHAAAEAFQAFADAAAHIAAATQAAAFACAEIAAAAIgKAAIgBgDQgFAEgGAAQgGAAgFgDgAgFADQgDACABAEQAAAAAAABQAAAAAAABQAAAAAAABQABABAAAAQACACADgBQACABACgCIAFgDIAAgJIgGAAQgFAAgCACg");
	this.shape_5.setTransform(-0.6,-69.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgEAeIAAg8IAJAAIAAA8g");
	this.shape_6.setTransform(-3.85,-70.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgNAQQgFgFAAgKIAAgBQAAgFADgGQACgFAFgDQAEgDAFAAQAIABAFAFQAFAGAAAKIAAADIgbAAQAAAGADADQAEACADAAQAGABAFgGIAFAFQgCAEgFACQgEADgFgBQgJABgGgHgAgFgLQgDADAAAFIARAAIAAgBQAAgFgDgCQgCgCgDgBQgEABgCACg");
	this.shape_7.setTransform(-7,-69.2);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgMAQQgGgGAAgJIAAgBQAAgKAGgFQAFgHAIAAQAIABAFAEQAEAEABAIIgJAAQgBgEgCgDQgCgCgEAAQgEABgCADQgDADAAAHIAAABQAAAGADAEQACAEAEgBQAEAAACgCQACgCABgDIAJAAQgBAFgCADIgGAGQgEABgFAAQgIABgFgHg");
	this.shape_8.setTransform(-11.375,-69.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgOAgIAWg+IAHAAIgWA+g");
	this.shape_9.setTransform(-17.275,-69.7);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgKAWIAAgqIAJAAIAAAEQADgFAGAAIADABIAAAJIgEAAQgGAAgCAEIAAAdg");
	this.shape_10.setTransform(-20.075,-69.25);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgEAeIAAgqIAJAAIAAAqgAgDgUQAAAAgBgBQAAAAAAAAQAAgBAAgBQgBAAAAgBQAAAAABgBQAAAAAAgBQAAAAAAAAQABgBAAAAQAAgBABAAQAAAAABAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQABAAAAABQAAAAABABQAAAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAABQAAAAAAAAQgBABAAAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAQAAAAAAAAQgBAAAAgBQgBAAAAAAQgBAAAAgBg");
	this.shape_11.setTransform(-22.75,-70.025);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgIAVQgEgCgCgEQgDgDAAgEIAKAAQAAADACACQADACADAAQADAAACgCQABAAAAAAQAAgBABAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQgBgBAAAAQAAgBgBAAIgGgDIgIgCQgHgDAAgGQAAgGAEgDQAFgFAGAAQAIAAAFAFQAFADAAAHIgKAAQAAgEgCgCQgCgBgEAAQgCAAgCABQAAABgBAAQAAABAAAAQgBABAAAAQAAABAAAAQAAABAAAAQAAABABAAQAAABAAAAQAAAAABABQACABAFABIAJADIAEADQACADAAAEQAAAFgFAEQgFADgIAAQgEAAgEgBg");
	this.shape_12.setTransform(-25.925,-69.2);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgOATQgDgEAAgFQAAgIAEgCQAGgEAIAAIAHAAIAAgCQAAgEgCgCQgDgCgDAAQgDAAgCABQgCACAAADIgKAAQABgDACgEQACgDAEgCQAFgCADAAQAIAAAEAFQAFADAAAHIAAATQAAAFABAEIAAAAIgJAAIgBgDQgFAEgFAAQgHAAgFgDgAgFADQgCACgBAEQABAAAAABQAAAAAAABQAAAAAAABQABABAAAAQACACADgBQACABACgCIAFgDIAAgJIgGAAQgFAAgCACg");
	this.shape_13.setTransform(-30.2,-69.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgSAeIAAg6IAJAAIABAEQAEgFAGAAQAIAAAFAGQAEAGAAAKIAAABQAAAJgFAGQgEAGgIAAQgGAAgEgFIAAAUgAgIgQIAAASQADAFAFAAQAEAAADgEQACgDAAgHQAAgHgCgDQgDgEgEAAQgGAAgCAFg");
	this.shape_14.setTransform(-34.625,-68.425);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgEAeIAAgqIAJAAIAAAqgAgDgUQAAAAgBgBQAAAAAAgBQAAAAAAgBQgBAAAAgBQAAAAABgBQAAAAAAgBQAAAAAAAAQABgBAAAAQAAgBABAAQAAAAABAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQABAAAAABQAAAAABABQAAAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAQAAAAAAAAQgBAAAAgBQgBAAAAAAQgBAAAAgBg");
	this.shape_15.setTransform(62.3,-82.025);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgEAfIAAg8IAJAAIAAA8g");
	this.shape_16.setTransform(60.2,-82.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgNASQgFgDAAgGQAAgGAGgDQAFgEAIAAIAGAAIAAgDQAAgDgBgCQgCgCgEAAQgCAAgCACQgDACAAACIgKAAQAAgDADgEQACgDAEgCQAFgBADAAQAIAAAFADQAEAEAAAHIAAATQAAAGABADIAAABIgKAAIgBgFQgEAGgFAAQgHAAgEgFgAgFADQgDACAAADQAAABABABQAAAAAAABQAAAAAAABQABAAAAABQACABADABQACgBADgBIADgEIAAgIIgFAAQgEAAgDACg");
	this.shape_17.setTransform(56.95,-81.2);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgJAcQgEgCgDgCIAEgHQAFAGAHAAQADAAADgDQADgCAAgFIAAgEQgEAGgGAAQgIAAgFgHQgEgFAAgLQAAgKAEgGQAFgFAIAAQAGAAAFAEIAAgDIAJAAIAAAoQAAAJgGAEQgFAFgIABQgFgBgEgCgAgGgSQgCAEAAAHQAAAHACACQADAFAEAAQAFAAADgGIAAgSQgDgEgFAAQgEAAgDADg");
	this.shape_18.setTransform(52.4,-80.4);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgJAcQgEgCgDgCIAFgHQAEAGAHAAQAEAAADgDQACgCAAgFIAAgEQgEAGgGAAQgHAAgGgHQgEgFAAgLQAAgKAEgGQAFgFAIAAQAHAAADAEIABgDIAJAAIAAAoQAAAJgFAEQgGAFgIABQgEgBgFgCgAgGgSQgCAEgBAHQABAHACACQADAFADAAQAGAAADgGIAAgSQgDgEgGAAQgDAAgDADg");
	this.shape_19.setTransform(47.75,-80.4);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AAIAWIAAgbQAAgEgCgCQgBgCgFAAQgEAAgDAGIAAAdIgKAAIAAgqIAJAAIAAAFQAFgGAHAAQAOAAAAAPIAAAcg");
	this.shape_20.setTransform(43.225,-81.25);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgMAQQgGgFAAgKIAAgBQAAgGACgFQADgFAEgDQAFgCAEAAQAJgBAFAGQAFAGAAAKIAAADIgcAAQABAGADADQAEADADAAQAGgBAFgFIAFAFQgDAEgEACQgEACgGABQgIAAgFgHgAgFgLQgCADgCAFIASAAIAAgBQAAgEgCgDQgCgCgFAAQgDAAgCACg");
	this.shape_21.setTransform(38.85,-81.2);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AAVAWIAAgbQAAgEgCgCQgCgCgEAAQgDAAgCACQgCACgBADIAAAcIgJAAIAAgcQAAgHgIAAQgFAAgDAFIAAAeIgKAAIAAgqIAJAAIABAFQAEgGAJAAQAHAAADAGQAFgGAJAAQAGAAAEAEQADAEAAAHIAAAcg");
	this.shape_22.setTransform(33.05,-81.25);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AAIAWIAAgbQAAgEgCgCQgBgCgFAAQgEAAgDAGIAAAdIgKAAIAAgqIAJAAIAAAFQAFgGAHAAQAOAAAAAPIAAAcg");
	this.shape_23.setTransform(21.425,-81.25);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgOASQgDgDAAgGQAAgGAEgDQAGgEAJAAIAGAAIAAgDQAAgDgDgCQgCgCgDAAQgCAAgDACQgCACAAACIgJAAQgBgDADgEQACgDAFgCQAEgBAEAAQAHAAAEADQAFAEAAAHIAAATQAAAGACADIAAABIgKAAIgBgFQgFAGgGAAQgGAAgFgFgAgFADQgDACABADQAAABAAABQAAAAAAABQAAAAAAABQABAAAAABQACABADABQACgBACgBIAFgEIAAgIIgGAAQgFAAgCACg");
	this.shape_24.setTransform(16.95,-81.2);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgNAZQgFgHAAgKQAAgJAFgGQAEgGAIAAQAGAAAFAFIAAgWIAJAAIAAA8IgJAAIAAgEQgFAFgGAAQgIAAgEgGgAgGgBQgCACAAAIQAAAHACADQADAEAEAAQAGAAADgFIAAgSQgDgFgGAAQgEAAgDAEg");
	this.shape_25.setTransform(12.35,-82.05);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AAIAWIAAgbQAAgEgCgCQgBgCgFAAQgEAAgDAGIAAAdIgKAAIAAgqIAJAAIAAAFQAFgGAHAAQAOAAAAAPIAAAcg");
	this.shape_26.setTransform(2.075,-81.25);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgOASQgDgDAAgGQAAgGAEgDQAGgEAIAAIAHAAIAAgDQAAgDgDgCQgCgCgDAAQgCAAgDACQgCACAAACIgJAAQgBgDADgEQACgDAFgCQAEgBAEAAQAHAAAEADQAFAEAAAHIAAATQAAAGACADIAAABIgKAAIgBgFQgFAGgGAAQgGAAgFgFgAgFADQgDACABADQAAABAAABQAAAAAAABQAAAAAAABQABAAAAABQACABADABQACgBACgBIAFgEIAAgIIgGAAQgFAAgCACg");
	this.shape_27.setTransform(-2.4,-81.2);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AAIAfIgMgTIgFAEIAAAPIgJAAIAAg8IAJAAIAAAiIAEgEIALgMIALAAIgQARIASAZg");
	this.shape_28.setTransform(-6.5,-82.1);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgNASQgFgDAAgGQAAgGAGgDQAFgEAIAAIAGAAIAAgDQAAgDgBgCQgDgCgDAAQgCAAgCACQgDACAAACIgKAAQABgDACgEQACgDAEgCQAFgBADAAQAIAAAFADQAEAEAAAHIAAATQAAAGABADIAAABIgKAAIgBgFQgEAGgFAAQgHAAgEgFgAgFADQgCACgBADQAAABABABQAAAAAAABQAAAAAAABQABAAAAABQACABADABQACgBADgBIADgEIAAgIIgFAAQgFAAgCACg");
	this.shape_29.setTransform(-11.1,-81.2);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgKAWIAAgqIAJAAIAAAFQADgGAGAAIADAAIAAAJIgEAAQgGABgCAFIAAAcg");
	this.shape_30.setTransform(-14.525,-81.25);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgMAQQgGgFAAgKIAAgBQAAgGACgFQADgFAEgDQAFgCAEAAQAJgBAFAGQAFAGAAAKIAAADIgcAAQABAGADADQAEADADAAQAGgBAFgFIAFAFQgDAEgEACQgEACgGABQgIAAgFgHgAgFgLQgCADgCAFIASAAIAAgBQAAgEgCgDQgCgCgFAAQgDAAgCACg");
	this.shape_31.setTransform(-18.3,-81.2);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgJAcQgEgCgDgCIAFgHQAEAGAHAAQAEAAADgDQACgCAAgFIAAgEQgEAGgGAAQgHAAgGgHQgEgFAAgLQAAgKAEgGQAFgFAIAAQAHAAADAEIABgDIAJAAIAAAoQAAAJgFAEQgGAFgIABQgEgBgFgCgAgGgSQgCAEgBAHQABAHACACQADAFADAAQAGAAADgGIAAgSQgDgEgGAAQgDAAgDADg");
	this.shape_32.setTransform(-22.9,-80.4);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgKAWIAAgqIAJAAIAAAFQADgGAGAAIADAAIAAAJIgEAAQgGABgCAFIAAAcg");
	this.shape_33.setTransform(-26.375,-81.25);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgNAQQgFgFAAgKIAAgBQAAgGADgFQACgFAEgDQAFgCAFAAQAIgBAFAGQAFAGAAAKIAAADIgcAAQABAGADADQAEADADAAQAHgBAEgFIAFAFQgCAEgFACQgEACgFABQgJAAgGgHgAgFgLQgCADgCAFIASAAIAAgBQAAgEgDgDQgCgCgDAAQgDAAgDACg");
	this.shape_34.setTransform(-30.15,-81.2);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgSAeIAAg6IAJAAIABAEQAEgFAGAAQAIAAAFAGQAEAGAAAKIAAABQAAAJgFAGQgEAGgIAAQgGAAgEgFIAAAUgAgIgQIAAASQADAFAFAAQAEAAADgEQACgDAAgHQAAgHgCgDQgDgEgEAAQgGAAgCAFg");
	this.shape_35.setTransform(-34.625,-80.425);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(0.569,0,0,0.598,-70.7,-26)).s().p("ArDEEIAAoHIWHAAIAAIHg");
	this.shape_36.setTransform(13.2,-73.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_3
	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("rgba(0,0,0,0.227)").s().p("ApqCuIAAlbITVAAIAAFbg");
	this.shape_37.setTransform(5.8,-70.975);

	this.timeline.addTween(cjs.Tween.get(this.shape_37).wait(1));

	// Layer_2
	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("rgba(102,153,51,0.008)").s().p("ArHFrIAArVIWPAAIAALVg");
	this.shape_38.setTransform(13.2,-73.975);

	this.timeline.addTween(cjs.Tween.get(this.shape_38).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-58,-110.3,142.4,72.69999999999999);


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


(lib.g3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._1();
	this.instance.setTransform(-55.3,-40.85,0.1944,0.2758);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g3, new cjs.Rectangle(-55.3,-40.8,110.6,81.6), null);


(lib.g2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._11();
	this.instance.setTransform(-55.3,-40.85,0.2071,0.1294);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g2, new cjs.Rectangle(-55.3,-40.8,110.6,81.6), null);


(lib.g1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib._3_1();
	this.instance.setTransform(-56.65,-40.85,0.1775,0.1705);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.g1, new cjs.Rectangle(-56.6,-40.8,113.2,81.6), null);


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
	this.shape_17.graphics.f("#E67E22").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_17.setTransform(45.05,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90.1,100.80000000000001);


(lib.drag7G12copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap105();
	this.instance.setTransform(0,-3,0.4245,0.5645);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgQAWQgGgEAAgIIALAAQAAAEADADQACACAFAAQADgBADgBQADgCAAgDQABgFgHgCIgJgDQgKgDAAgJQABgHAGgFQAGgEAIAAQAIAAAGAEQAFAFAAAIIgMAAQAAgEgCgCQgCgDgEABQgDAAgCABQgDACAAAEQgBAEAGABIAKAEQAKADAAAJQgBAFgDAEQgDAEgFACQgFACgFAAQgJAAgFgGg");
	this.shape.setTransform(73.475,78.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgLAlIAJg0IALAAIgJA0gAABgYQAAgBgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQADgCADAAQAAAAABAAQAAAAABAAQAAAAABABQABAAAAABQABAAAAAAQAAABABAAQAAABAAABQAAAAAAABQAAABAAAAQAAABAAAAQgBABAAAAQAAABgBABQAAAAgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgCAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_1.setTransform(69.9,77.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgVAhQgEgHgBgJIAAgGIABgBQABgHADgGQADgHAFgDQAFgDAHAAQAHABAEAFIAFgbIAMAAIgNBKIgKAAIAAgFQgFAGgIAAQgIAAgEgFgAgKAAQgEAFAAAKQgBAGADAEQACADAEAAQAGABAFgHIAEgWQgCgGgHAAIAAAAQgGAAgEAGg");
	this.shape_2.setTransform(66.025,77.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgLAlIAJg0IALAAIgJA0gAABgYQAAgBgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQACgCAEAAQAAAAABAAQAAAAABAAQAAAAABABQABAAAAABQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQAAAAgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgCAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_3.setTransform(61.9,77.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgRAbIAJg0IAKAAIgBAGQAFgHAHAAIAFABIgBALIgFAAQgIgBgEAHIgFAjg");
	this.shape_4.setTransform(58.975,78.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgLAlIAJg0IALAAIgJA0gAABgYQAAgBgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQADgCADAAQAAAAABAAQAAAAABAAQAAAAABABQABAAAAABQABAAAAAAQAAABABAAQAAABAAABQAAAAAAABQAAABAAAAQAAABAAAAQgBABAAAAQAAABgBABQAAAAgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgCAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_5.setTransform(55.95,77.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgMAbIgKg0IAMAAIAFAkIAQgkIAMAAIgZA0g");
	this.shape_6.setTransform(52.525,78.6);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgMAYQgGgEgCgFQgCgGAAgHIAAgCQABgHAEgHQAEgGAGgDQAFgEAGABQAKAAAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgHIAGAHQgDAEgGADQgFACgGABQgGgBgFgDgAgJgEIAVAAIAAgBIAAgEQgBgEgCgCQgCgCgEAAQgIAAgEANg");
	this.shape_7.setTransform(44.7292,78.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgNAYQgFgDgCgHQgDgFABgIIAAgBQABgHAEgHQADgGAGgDQAGgEAGABQAJAAAFAFQAFAGAAAIIgLAAQAAgEgCgDQgCgDgFAAQgFAAgEAGQgEAGgBAJQAAAOAKAAQADAAADgCQADgDABgEIALAAQgBAFgDAFQgDAEgFACQgFACgFABQgHgBgEgDg");
	this.shape_8.setTransform(39.5607,78.6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgLAlIAJg0IALAAIgJA0gAABgYQAAgBgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQACgCAEAAQAAAAABAAQAAAAABAAQAAAAABABQABAAAAABQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQAAAAgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgCAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_9.setTransform(35.8,77.6);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AAHAbIAGgiIAAgDQgBgGgGAAQgGAAgFAGIgHAlIgLAAIAJg0IALAAIgBAGQAGgHAIAAQAIABADAFQAEAEgBAKIgGAhg");
	this.shape_10.setTransform(31.4781,78.55);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgRAYQgEgCgBgFQgCgDABgHIAGghIALAAIgGAhIAAAEQABAGAGAAQAGABAFgHIAHglIALAAIgJA0IgLAAIABgFQgFAGgJAAQgFAAgDgDg");
	this.shape_11.setTransform(26.3688,78.65);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgcAkIANhGIAsAAIgCAKIggAAIgEATIAcAAIgCAJIgbAAIgEAWIAgAAIgCAKg");
	this.shape_12.setTransform(21.05,77.7);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#E67E22").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_13.setTransform(45.05,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90.1,100.80000000000001);


(lib.drag7G11copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap103copy();
	this.instance.setTransform(90,-3,0.2823,0.7258,90);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgSAXQgEgEAAgHQABgJAGgDQAHgFALAAIAHABIABgFIAAgDQgBgFgGgBQgEAAgBACQgDADgBADIgMAAQABgFADgEQADgDAFgDQAFgCAFAAQAJABAFAFQAEAFAAAIIgEAYIgBAEIABAFIAAABIgMAAIAAgEQgHAFgGAAQgHABgFgFgAgGAEQgDACgBAFQAAADABACQACACAEAAQADAAACgCIAGgEIABgLIgFAAQgGAAgEADg");
	this.shape.setTransform(66.825,89.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgMAYQgGgDgCgGQgCgGAAgHIAAgCQABgHAEgGQAEgHAGgDQAFgDAGgBQAKABAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgGIAGAFQgDAFgGADQgFACgGAAQgGABgFgEgAgJgEIAVAAIAAgBIAAgEQgBgEgCgBQgCgDgEAAQgIAAgEANg");
	this.shape_1.setTransform(61.7792,89.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AAHAbIAGghIAAgEQgBgGgGAAQgGAAgFAHIgHAkIgLAAIAJg0IALAAIgBAHQAGgIAIAAQAIAAADAFQAEAGgBAJIgGAhg");
	this.shape_2.setTransform(56.1781,89.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgLAkIAJg0IALAAIgJA0gAABgZQAAAAgBAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAgBQADgCACAAQABAAABABQAAAAABAAQAAAAABABQABAAAAAAQAAABABAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAgBAAIgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBg");
	this.shape_3.setTransform(52.55,88.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgRAZQgEgDgBgEQgCgFABgFIAGgiIALAAIgGAiIAAADQABAGAGABQAGgBAFgGIAHglIALAAIgJA0IgLAAIABgFQgFAGgJAAQgFAAgDgCg");
	this.shape_4.setTransform(48.5688,89.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgSAjQgFgCgDgEIAGgHQAFAGAIAAQAFAAADgDQAEgEACgGIABgDQgHAGgGgBQgIABgEgGQgFgGAAgIIAAgHQABgIADgGQAEgHAFgDQAFgDAFgBQAJABAFAGIABgGIALAAIgJAzQgBAKgHAHQgIAFgJABQgGAAgFgDgAgFgWQgEAFgBAIIAAABIgBAGQABADACAEQACADAEAAQAGAAAFgGIAEgXQgDgFgGgBIgBAAQgFAAgDAFg");
	this.shape_5.setTransform(42.825,90.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AAHAbIAGghIAAgEQgBgGgGAAQgGAAgFAHIgHAkIgLAAIAJg0IALAAIgBAHQAGgIAIAAQAIAAADAFQAEAGgBAJIgGAhg");
	this.shape_6.setTransform(37.2281,89.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgSAXQgEgEAAgHQABgJAGgDQAHgFALAAIAHABIABgFIAAgDQgBgFgGgBQgEAAgBACQgDADgBADIgMAAQABgFADgEQADgDAFgDQAFgCAFAAQAJABAFAFQAEAFAAAIIgEAYIgBAEIABAFIAAABIgMAAIAAgEQgHAFgGAAQgHABgFgFgAgGAEQgDACgBAFQAAADABACQACACAEAAQADAAACgCIAGgEIABgLIgFAAQgGAAgEADg");
	this.shape_7.setTransform(31.975,89.35);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgQAXQgGgGAAgHIALAAQAAAEADACQACACAFAAQADAAADgBQADgCAAgDQABgFgHgCIgJgDQgKgDAAgJQABgHAGgEQAGgGAIAAQAIABAGAFQAFAEAAAHIgMAAQAAgDgCgCQgCgCgEgBQgDAAgCACQgDADAAACQgBAFAGACIAKADQAKADAAAJQgBAFgDAEQgDADgFACQgFACgFAAQgJAAgFgEg");
	this.shape_8.setTransform(26.875,89.35);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgSAXQgEgFAAgGQABgIAGgEQAHgFALAAIAHABIABgFIAAgDQgBgFgGgBQgEABgBACQgDACgBADIgMAAQABgFADgEQADgDAFgCQAFgCAFgBQAJABAFAFQAEAFAAAIIgEAXIgBAFIABAFIAAABIgMAAIAAgEQgHAFgGABQgHAAgFgFgAgGAEQgDADgBAEQAAADABACQACACAEAAQADAAACgCIAGgEIABgKIgFAAQgGAAgEACg");
	this.shape_9.setTransform(65.875,73.35);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgQAWQgGgEAAgIIALAAQAAAEADACQACACAFABQADAAADgCQADgCAAgDQABgFgHgCIgJgDQgKgDAAgJQABgHAGgFQAGgEAIgBQAIABAGAEQAFAFAAAHIgMAAQAAgDgCgCQgCgDgEAAQgDABgCACQgDACAAACQgBAFAGACIAKADQAKADAAAJQgBAFgDAEQgDADgFACQgFACgFABQgJgBgFgFg");
	this.shape_10.setTransform(60.775,73.35);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgaAkIABgJIACAAQAEAAADgBIAEgGIADgFIgJgzIAMAAIAFAkIAPgkIANAAIgeA9QgHAMgKAAIgGgBg");
	this.shape_11.setTransform(55.975,74.425);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AAHAlIAGghIAAgEQgBgFgGAAQgGAAgFAFIgHAlIgLAAIANhKIAKAAIgEAcQAGgGAIgBQAIABADAFQAEAFgBAJIgGAhg");
	this.shape_12.setTransform(50.6111,72.25);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgaAlIANhIIALAAIgBAFQAFgGAIAAQAFAAAEADQAEACACAFQACAFAAAFIgBAIQAAAHgEAGQgDAGgFAEQgFADgGAAQgHAAgFgGIgFAZgAgEgUIgEAWQACAGAGAAQAGAAAEgEQAEgEABgJIAAgEQAAgGgCgEQgCgDgEAAIgBAAQgGAAgEAGg");
	this.shape_13.setTransform(45.025,74.325);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgRAbIAJg0IAKAAIgBAGQAFgHAHAAIAFABIgBALIgFgBQgIABgEAGIgFAjg");
	this.shape_14.setTransform(41.075,73.3);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgSAXQgEgFAAgGQABgIAGgEQAHgFALAAIAHABIABgFIAAgDQgBgFgGgBQgEABgBACQgDACgBADIgMAAQABgFADgEQADgDAFgCQAFgCAFgBQAJABAFAFQAEAFAAAIIgEAXIgBAFIABAFIAAABIgMAAIAAgEQgHAFgGABQgHAAgFgFgAgGAEQgDADgBAEQAAADABACQACACAEAAQADAAACgCIAGgEIABgKIgFAAQgGAAgEACg");
	this.shape_15.setTransform(36.425,73.35);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AARAjIAEgXIAGgdIgbA0IgJAAIgLg2IgFAgIgDAWIgNAAIANhFIAPAAIALA1IAcg1IAQAAIgNBFg");
	this.shape_16.setTransform(29.75,72.45);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#E67E22").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_17.setTransform(45,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90,100.80000000000001);


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


(lib.drag7G9copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap101copy();
	this.instance.setTransform(0,-3,0.4523,0.5645);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgQAWQgGgEAAgIIALAAQAAAEADADQACACAFAAQADgBADgBQADgCAAgDQABgFgHgCIgJgDQgKgDAAgJQABgHAGgFQAGgEAIAAQAIAAAGAEQAFAFAAAIIgMAAQAAgEgCgCQgCgDgEABQgDAAgCABQgDACAAAEQgBAEAGABIAKAEQAKADAAAJQgBAFgDAEQgDAEgFACQgFACgFAAQgJAAgFgGg");
	this.shape.setTransform(72.475,78.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgSAXQgEgEAAgHQABgIAGgEQAHgFALAAIAHAAIABgDIAAgEQgBgFgGAAQgEAAgBABQgDADgBADIgMAAQABgFADgDQADgFAFgCQAFgBAFAAQAJAAAFAFQAEAFAAAIIgEAYIgBAEIABAGIAAABIgMAAIAAgGQgHAHgGAAQgHgBgFgEgAgGAEQgDACgBAFQAAADABACQACACAEAAQADAAACgBIAGgGIABgJIgFAAQgGAAgEACg");
	this.shape_1.setTransform(67.275,78.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgaAlIANhIIALAAIgBAFQAFgGAIAAQAFAAAEADQAEACACAFQACAFAAAFIgBAIQAAAHgEAGQgDAGgFAEQgFADgGAAQgHAAgFgGIgFAZgAgEgUIgEAWQACAGAGAAQAGAAAEgEQAEgEABgJIAAgEQAAgGgCgEQgCgDgEAAIgBAAQgGAAgEAGg");
	this.shape_2.setTransform(61.675,79.575);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgLAlIAJg0IALAAIgJA0gAABgYQgBgBAAAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQACgCACAAQABAAABAAQAAAAABAAQAAAAABABQAAAAABABQAAAAABAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAABQAAAAgBAAQAAAAgBABQAAAAgBAAQgBAAgBAAIgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_3.setTransform(58.15,77.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AAGAmIgKgXIgHAGIgDARIgLAAIANhLIALAAIgHAqIAEgEIAQgPIAOAAIgXAVIAPAfg");
	this.shape_4.setTransform(54.425,77.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgSAjQgFgDgDgEIAGgHQAFAHAIAAQAFAAADgDQAEgEACgFIABgEQgHAFgGABQgIgBgEgFQgFgGAAgIIAAgHQABgIADgHQAEgFAFgEQAFgEAFABQAJAAAFAGIABgFIALAAIgJAyQgBALgHAFQgIAHgJgBQgGABgFgDgAgFgWQgEAFgBAIIAAABIgBAGQABADACADQACAEAEAAQAGAAAFgHIAEgVQgDgHgGABIgBgBQgFAAgDAFg");
	this.shape_5.setTransform(46.325,79.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AAHAbIAGgiIAAgDQgBgGgGAAQgGAAgFAGIgHAlIgLAAIAJg0IALAAIgBAGQAGgHAIAAQAIABADAFQAEAEgBAKIgGAhg");
	this.shape_6.setTransform(40.7281,78.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgLAlIAJg0IALAAIgJA0gAABgYQgBgBAAAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQABgCADAAQABAAABAAQAAAAABAAQAAAAABABQAAAAABABQAAAAABAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAABQAAAAgBAAQAAAAgBABQAAAAgBAAQgBAAgBAAIgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
	this.shape_7.setTransform(37.1,77.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgNAYQgFgDgCgHQgDgFABgIIAAgBQABgHAEgHQADgGAGgDQAGgEAGABQAJAAAFAFQAFAGAAAIIgLAAQAAgEgCgDQgCgDgFAAQgFAAgEAGQgEAGgBAJQAAAOAKAAQADAAADgCQADgDABgEIALAAQgBAFgDAFQgDAEgFACQgFACgFABQgHgBgEgDg");
	this.shape_8.setTransform(33.2107,78.6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgSAXQgEgEAAgHQABgIAGgEQAHgFALAAIAHAAIABgDIAAgEQgBgFgGAAQgEAAgBABQgDADgBADIgMAAQABgFADgDQADgFAFgCQAFgBAFAAQAJAAAFAFQAEAFAAAIIgEAYIgBAEIABAGIAAABIgMAAIAAgGQgHAHgGAAQgHgBgFgEgAgGAEQgDACgBAFQAAADABACQACACAEAAQADAAACgBIAGgGIABgJIgFAAQgGAAgEACg");
	this.shape_9.setTransform(27.825,78.6);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgQAiQgFgEgEgFQgCgHgBgHIACgOQACgKAEgIQAEgHAIgEQAGgEAIABQALAAAFAGQAHAGAAAMIgMAAQAAgIgDgDQgDgDgGAAQgHgBgFAGQgGAGgCALIgBAGIAAAFIABAKQABAEADACQACACAFABQANAAADgPIANAAQgDALgIAHQgIAGgLABQgGAAgFgDg");
	this.shape_10.setTransform(22.35,77.7);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#E67E22").s().p("AnBnWIODghIAAPLIuDAkg");
	this.shape_11.setTransform(45.05,46.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.4,90.1,100.80000000000001);


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


(lib.drop8G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AAPA4IAAgzQAAgHgEgDQgDgEgHAAQgKAAgFAJIAAA4IgSAAIAAhvIASAAIAAAqQAJgKAMAAQAZAAABAbIAAA0g");
	this.shape.setTransform(39.525,105.625);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgIA3IAAhOIARAAIAABOgAgGglQgDgDAAgEQAAgEADgDQACgDAEAAQAFAAACADQADADAAAEQAAAEgDADQgCACgFAAQgEAAgCgCg");
	this.shape_1.setTransform(33.425,105.775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgQAmQgHgEgFgGQgEgGAAgIIASAAQAAAHAEADQAFAEAGAAQAHgBAEgCQADgCAAgFQAAgFgEgCQgEgDgIgCQgJgCgGgCQgNgGAAgMQAAgKAJgHQAIgHAMAAQAPAAAIAHQAJAHAAALIgSAAQAAgFgDgEQgEgDgHAAQgEAAgEADQgEADAAAEQAAAEAEACQADADAKACQAKADAGADQAGACADAEQADAFAAAGQAAAKgJAIQgJAGgOAAQgJAAgIgDg");
	this.shape_2.setTransform(27.575,107.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgUAoIAAhOIARAAIABAJQAFgKAMAAIAGABIAAAQIgHAAQgNAAgDAJIAAA1g");
	this.shape_3.setTransform(21.475,107.225);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgYAeQgKgKAAgSIAAgCQAAgLAFgKQAEgJAIgFQAJgFAJAAQAQAAAJAKQAJALAAATIAAAFIgzAAQABAKAFAGQAGAGAIAAQANAAAHgKIAKAJQgFAHgIAEQgIAEgKAAQgQAAgLgLgAgKgVQgFAFgBAKIAhAAIAAgCQAAgJgEgFQgFgEgHAAQgGAAgFAFg");
	this.shape_4.setTransform(14.55,107.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgRAvIgBAIIgQAAIAAhvIASAAIAAApQAIgJAMAAQAOAAAJAKQAIALAAATIAAABQAAASgIALQgJALgOAAQgNAAgIgKgAgQAAIAAAgQAFALALAAQAIAAAEgHQAFgGAAgMIAAgDQAAgNgEgFQgFgGgIAAQgLgBgFAKg");
	this.shape_5.setTransform(6.375,105.7);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgIA3IAAhOIARAAIAABOgAgGglQgDgDAAgEQAAgEADgDQACgDAEAAQAFAAACADQADADAAAEQAAAEgDADQgCACgFAAQgEAAgCgCg");
	this.shape_6.setTransform(238.675,83.775);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgZAuQgJgLAAgUQAAgRAJgLQAIgLAPAAQALAAAIAJIAAgpIASAAIAABwIgRAAIgBgIQgHAJgMAAQgPAAgIgLgAgLgDQgFAGAAAOQAAAMAFAGQAFAIAHgBQALABAFgLIAAggQgFgKgLAAQgHAAgFAHg");
	this.shape_7.setTransform(232.35,83.7);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgaAiQgHgHAAgKQAAgNAJgFQAKgHAQAAIAMAAIAAgFQAAgHgEgDQgDgDgHgBQgFAAgFAEQgDADAAAEIgSAAQAAgHAEgFQAEgGAIgDQAIgDAHAAQAOAAAJAHQAIAHAAANIAAAiQAAALADAHIAAABIgSAAIgCgIQgIAJgMAAQgMAAgIgHgAgKAGQgFADAAAGQAAAFAEAEQACACAHAAQAEABAFgDQAEgDADgEIAAgOIgKAAQgJAAgFADg");
	this.shape_8.setTransform(224.25,85.3);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgQBGIAAgPIAGABQAJAAAAgKIAAhVIARAAIAABVQAAAMgGAGQgGAHgLAAIgJgBgAAAg1QgCgDAAgEQAAgEACgDQACgDAFAAQAFAAADADQACADAAAEQAAAEgCADQgDACgFAAQgFAAgCgCg");
	this.shape_9.setTransform(217.6,85.375);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AAPAoIAAgyQAAgIgDgDQgEgEgHAAQgKAAgFAKIAAA3IgSAAIAAhOIARAAIAAAJQAJgKANAAQAZAAABAcIAAAzg");
	this.shape_10.setTransform(212.275,85.225);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgYAfQgKgMAAgRIAAgCQAAgLAEgJQAFgKAJgFQAIgFAJAAQAQAAAJAKQAJALAAASIAAAHIgzAAQABAKAGAFQAFAGAIAAQAMAAAIgKIAKAJQgFAHgIAEQgIAEgKAAQgQAAgLgKgAgKgVQgEAGgCAIIAhAAIAAgBQAAgJgFgEQgDgFgIAAQgHAAgEAFg");
	this.shape_11.setTransform(204.15,85.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AAmAoIAAgyQAAgIgDgDQgDgEgIAAQgGAAgEADQgEAEgBAFIAAA1IgRAAIAAgzQAAgOgOAAQgLAAgEAJIAAA4IgSAAIAAhOIARAAIAAAIQAIgJAPAAQAPAAAGAMQAIgMAQAAQANAAAHAHQAGAHAAAOIAAAzg");
	this.shape_12.setTransform(193.525,85.225);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgJAbIAAgsIgNAAIAAgMIANAAIAAgUIARAAIAAAUIAOAAIAAAMIgOAAIAAArQAAAFACACQACACAEAAIAHgBIAAAPIgMABQgUAAAAgXg");
	this.shape_13.setTransform(171.925,84.4);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgZAhQgHgIAAgOIAAgyIASAAIAAAyQAAAPAMAAQANAAAEgKIAAg3IASAAIAABOIgRAAIgBgIQgHAJgNAAQgOAAgGgHg");
	this.shape_14.setTransform(165.4,85.375);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgaAiQgHgHAAgKQAAgNAJgFQAKgHAQAAIAMAAIAAgFQAAgHgEgDQgDgDgHgBQgFAAgFAEQgDADAAAEIgSAAQAAgHAEgFQAEgGAIgDQAIgDAHAAQAOAAAJAHQAIAHAAANIAAAiQAAALADAHIAAABIgSAAIgCgIQgIAJgMAAQgMAAgIgHgAgKAGQgFADAAAGQAAAFAEAEQACACAHAAQAEABAFgDQAEgDADgEIAAgOIgKAAQgJAAgFADg");
	this.shape_15.setTransform(157.2,85.3);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgIA4IAAhvIARAAIAABvg");
	this.shape_16.setTransform(151.225,83.625);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgZAiQgIgHAAgKQAAgNAKgFQAJgHARAAIAKAAIAAgFQAAgHgDgDQgEgDgGgBQgFAAgFAEQgDADgBAEIgRAAQAAgHAEgFQAFgGAHgDQAIgDAIAAQAOAAAHAHQAJAHAAANIAAAiQAAALADAHIAAABIgSAAIgCgIQgJAJgLAAQgMAAgHgHgAgKAGQgFADAAAGQAAAFADAEQADACAGAAQAFABAEgDQAFgDACgEIAAgOIgKAAQgIAAgFADg");
	this.shape_17.setTransform(132.85,85.3);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgRA0QgIgDgFgGIAJgLQAIAKAMAAQAIAAAFgFQAFgFAAgJIAAgFQgHAIgNAAQgOAAgIgLQgJgLAAgSQAAgTAJgLQAIgLAOAAQAOAAAHAJIABgHIAQAAIAABLQAAAQgKAJQgKAJgPAAQgJAAgIgEgAgMghQgEAHAAANQAAAMAEAGQAGAHAHAAQALAAAFgKIAAghQgFgJgKAAQgIAAgGAHg");
	this.shape_18.setTransform(124.4,86.775);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgRA0QgJgDgDgGIAIgLQAIAKAMAAQAIAAAFgFQAFgFAAgJIAAgFQgIAIgLAAQgOAAgJgLQgJgLAAgSQAAgTAIgLQAKgLAOAAQAMAAAIAJIABgHIAQAAIAABLQAAAQgKAJQgJAJgQAAQgJAAgIgEgAgLghQgFAHgBANQABAMAFAGQAEAHAIAAQALAAAFgKIAAghQgFgJgLAAQgHAAgFAHg");
	this.shape_19.setTransform(115.9,86.775);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AAPAoIAAgyQAAgIgDgDQgEgEgHAAQgKAAgFAKIAAA3IgSAAIAAhOIARAAIAAAJQAJgKANAAQAZAAABAcIAAAzg");
	this.shape_20.setTransform(107.625,85.225);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgIA3IAAhOIARAAIAABOgAgGglQgDgDAAgEQAAgEADgDQACgDAEAAQAFAAACADQADADAAAEQAAAEgDADQgCACgFAAQgEAAgCgCg");
	this.shape_21.setTransform(101.525,83.775);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AAPA4IAAgzQAAgHgEgDQgDgEgHAAQgKAAgFAJIAAA4IgSAAIAAhvIASAAIAAAqQAJgKAMAAQAZAAABAbIAAA0g");
	this.shape_22.setTransform(95.425,83.625);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgXAfQgLgMAAgRIAAgCQAAgLAEgJQAFgKAJgFQAIgFAJAAQAQAAAJAKQAJALAAASIAAAHIgzAAQABAKAFAFQAHAGAHAAQAMAAAIgKIAJAJQgEAHgIAEQgIAEgKAAQgQAAgKgKgAgKgVQgFAGAAAIIAgAAIAAgBQgBgJgDgEQgEgFgIAAQgGAAgFAFg");
	this.shape_23.setTransform(87.3,85.3);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgQAlQgHgDgFgGQgEgHAAgGIASAAQAAAGAEADQAFADAGAAQAHAAAEgCQADgDAAgEQAAgFgEgDQgEgCgIgCQgJgBgGgEQgNgFAAgMQAAgKAJgIQAIgGAMAAQAPAAAIAHQAJAHAAALIgSAAQAAgFgDgDQgEgEgHAAQgEAAgEADQgEACAAAFQAAAEAEADQADACAKACQAKACAGADQAGACADAFQADAFAAAGQAAAKgJAHQgJAHgOAAQgJAAgIgEg");
	this.shape_24.setTransform(79.275,85.3);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgLAPQAFgHABgFQACgDAAgGIAAgNIAPAAIAAAMQAAAHgEAIQgEAHgFAFg");
	this.shape_25.setTransform(61.125,89.6);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgQAlQgHgDgFgGQgEgHAAgGIASAAQAAAGAEADQAFADAGAAQAHAAAEgCQADgDAAgEQAAgFgEgDQgEgCgIgCQgJgBgGgEQgNgFAAgMQAAgKAJgIQAIgGAMAAQAPAAAIAHQAJAHAAALIgSAAQAAgFgDgDQgEgEgHAAQgEAAgEADQgEACAAAFQAAAEAEADQADACAKACQAKACAGADQAGACADAFQADAFAAAGQAAAKgJAHQgJAHgOAAQgJAAgIgEg");
	this.shape_26.setTransform(55.825,85.3);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgIA4IAAhvIARAAIAABvg");
	this.shape_27.setTransform(50.075,83.625);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgZAuQgIgLAAgUQAAgRAIgLQAJgLANAAQAMAAAIAJIAAgpIARAAIAABwIgPAAIgBgIQgJAJgMAAQgNAAgJgLgAgLgDQgFAGAAAOQAAAMAFAGQAFAIAHgBQALABAFgLIAAggQgFgKgLAAQgHAAgFAHg");
	this.shape_28.setTransform(43.75,83.7);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgJAbIAAgsIgNAAIAAgMIANAAIAAgUIARAAIAAAUIAOAAIAAAMIgOAAIAAArQAAAFACACQACACAEAAIAHgBIAAAPIgMABQgUAAAAgXg");
	this.shape_29.setTransform(24.625,84.4);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgZAhQgHgIAAgOIAAgyIASAAIAAAyQAAAPAMAAQAMAAAFgKIAAg3IASAAIAABOIgRAAIgBgIQgHAJgNAAQgNAAgHgHg");
	this.shape_30.setTransform(18.1,85.375);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgZAiQgIgHAAgKQAAgNAKgFQAJgHARAAIAKAAIAAgFQAAgHgDgDQgDgDgHgBQgFAAgFAEQgDADAAAEIgSAAQAAgHAEgFQAFgGAHgDQAIgDAIAAQANAAAIAHQAJAHAAANIAAAiQAAALADAHIAAABIgSAAIgCgIQgJAJgLAAQgMAAgHgHgAgKAGQgFADAAAGQAAAFADAEQAEACAFAAQAEABAFgDQAFgDACgEIAAgOIgJAAQgJAAgFADg");
	this.shape_31.setTransform(9.9,85.3);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgIA4IAAhvIARAAIAABvg");
	this.shape_32.setTransform(3.925,83.625);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgZAhQgHgIAAgOIAAgyIASAAIAAAyQAAAPAMAAQANAAAEgKIAAg3IASAAIAABOIgRAAIAAgIQgIAJgNAAQgOAAgGgHg");
	this.shape_33.setTransform(236.5,63.375);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgaAiQgHgGAAgKQAAgNAJgGQAKgHAQAAIAMAAIAAgFQAAgHgEgDQgDgEgHABQgFAAgFACQgDADAAAFIgSAAQAAgGAEgGQAEgGAIgDQAIgDAHAAQAOAAAJAHQAIAHAAAMIAAAjQAAALADAGIAAABIgSAAIgCgHQgIAJgMAAQgMAAgIgHgAgKAFQgFAEAAAHQAAAEAEADQACAEAHAAQAEgBAFgCQAEgCADgFIAAgPIgKAAQgJAAgFADg");
	this.shape_34.setTransform(228.3,63.3);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgJAcIAAgsIgNAAIAAgOIANAAIAAgTIARAAIAAATIAOAAIAAAOIgOAAIAAArQAAAEACADQACABAEAAIAHAAIAAANIgMACQgUAAAAgWg");
	this.shape_35.setTransform(221.575,62.4);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgZAiQgIgGAAgKQAAgNAKgGQAJgHARAAIAKAAIAAgFQAAgHgDgDQgEgEgGABQgFAAgFACQgEADABAFIgSAAQAAgGAEgGQAEgGAIgDQAIgDAIAAQAOAAAHAHQAJAHAAAMIAAAjQAAALADAGIAAABIgSAAIgCgHQgJAJgLAAQgMAAgHgHgAgKAFQgFAEAAAHQAAAEADADQADAEAGAAQAFgBAEgCQAFgCACgFIAAgPIgJAAQgJAAgFADg");
	this.shape_36.setTransform(215.2,63.3);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AAPAoIAAgyQAAgIgDgDQgEgEgHAAQgKAAgFAKIAAA3IgSAAIAAhOIARAAIAAAJQAJgKANAAQAZAAABAcIAAAzg");
	this.shape_37.setTransform(199.575,63.225);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgIA3IAAhOIARAAIAABOgAgGglQgDgDAAgEQAAgEADgDQACgDAEAAQAFAAACADQADADAAAEQAAAEgDADQgCACgFAAQgEAAgCgCg");
	this.shape_38.setTransform(193.475,61.775);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgZAiQgIgGAAgKQAAgNAJgGQAKgHAQAAIALAAIAAgFQABgHgEgDQgEgEgGABQgGAAgDACQgFADAAAFIgRAAQAAgGAEgGQAFgGAHgDQAHgDAJAAQAOAAAHAHQAJAHAAAMIAAAjQAAALADAGIAAABIgSAAIgCgHQgJAJgLAAQgMAAgHgHgAgKAFQgFAEAAAHQAAAEADADQAEAEAFAAQAEgBAGgCQAEgCACgFIAAgPIgKAAQgIAAgFADg");
	this.shape_39.setTransform(187.5,63.3);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgIA4IAAhvIARAAIAABvg");
	this.shape_40.setTransform(181.525,61.625);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AAPAoIAAgyQAAgIgDgDQgEgEgHAAQgKAAgFAKIAAA3IgSAAIAAhOIARAAIAAAJQAJgKANAAQAZAAABAcIAAAzg");
	this.shape_41.setTransform(168.025,63.225);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgaAiQgHgGAAgKQAAgNAJgGQAKgHAQAAIAMAAIAAgFQAAgHgEgDQgEgEgGABQgFAAgEACQgEADgBAFIgRAAQAAgGAEgGQAFgGAHgDQAHgDAIAAQAOAAAJAHQAIAHAAAMIAAAjQAAALADAGIAAABIgSAAIgCgHQgJAJgLAAQgMAAgIgHgAgKAFQgFAEAAAHQAAAEAEADQACAEAHAAQADgBAGgCQAEgCADgFIAAgPIgLAAQgIAAgFADg");
	this.shape_42.setTransform(159.8,63.3);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AARAnIgRg1IgQA1IgPAAIgVhOIASAAIAMA1IAQg1IANAAIAQA2IANg2IARAAIgWBOg");
	this.shape_43.setTransform(150.15,63.3);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgXAeQgLgLAAgRIAAgCQAAgLAFgKQAEgJAIgFQAJgFAJAAQAQAAAJAKQAJAKAAAUIAAAFIgzAAQABAKAFAGQAHAGAHAAQANAAAHgKIAJAJQgEAHgIAEQgIAEgKAAQgQAAgKgLgAgKgVQgEAFgCAJIAhAAIAAgBQAAgJgEgFQgFgEgHAAQgHAAgEAFg");
	this.shape_44.setTransform(140.65,63.3);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AAPA4IAAgzQAAgHgEgDQgDgEgHAAQgKAAgFAJIAAA4IgSAAIAAhvIASAAIAAAqQAJgKAMAAQAZAAABAbIAAA0g");
	this.shape_45.setTransform(132.375,61.625);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AAPAoIAAgyQAAgIgDgDQgEgEgHAAQgKAAgFAKIAAA3IgSAAIAAhOIARAAIAAAJQAJgKANAAQAZAAABAcIAAAzg");
	this.shape_46.setTransform(116.625,63.225);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AgaAiQgHgGAAgKQAAgNAJgGQAKgHAQAAIALAAIAAgFQAAgHgDgDQgEgEgGABQgGAAgDACQgFADAAAFIgRAAQAAgGAEgGQAFgGAHgDQAHgDAIAAQAPAAAHAHQAJAHAAAMIAAAjQAAALADAGIAAABIgSAAIgCgHQgJAJgLAAQgMAAgIgHgAgKAFQgFAEAAAHQAAAEAEADQACAEAHAAQADgBAGgCQAEgCACgFIAAgPIgKAAQgIAAgFADg");
	this.shape_47.setTransform(108.4,63.3);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgUAoIAAhOIARAAIABAJQAFgKAMAAIAGABIAAAQIgHAAQgNAAgDAJIAAA1g");
	this.shape_48.setTransform(102.075,63.225);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AgaAeQgKgLAAgTIAAAAQAAgLAFgKQAEgJAJgFQAIgFAKAAQAQAAAKAKQAKALABAQIAAAEQAAAMgFAIQgEAKgJAFQgIAFgLAAQgQAAgKgLgAgNgTQgFAHAAANQAAAMAFAHQAFAHAIAAQAJAAAFgIQAFgHAAgMQAAgMgFgHQgFgHgJAAQgIAAgFAHg");
	this.shape_49.setTransform(94.825,63.3);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgJAcIAAgsIgNAAIAAgOIANAAIAAgTIARAAIAAATIAOAAIAAAOIgOAAIAAArQAAAEACADQACABAEAAIAHAAIAAANIgMACQgUAAAAgWg");
	this.shape_50.setTransform(87.875,62.4);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AgaAeQgKgLAAgTIAAAAQAAgLAFgKQAEgJAJgFQAIgFAKAAQAQAAAKAKQAKALABAQIAAAEQAAAMgFAIQgEAKgJAFQgIAFgLAAQgQAAgKgLgAgNgTQgFAHAAANQAAAMAFAHQAFAHAIAAQAJAAAFgIQAFgHAAgMQAAgMgFgHQgFgHgJAAQgIAAgFAHg");
	this.shape_51.setTransform(81.275,63.3);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AAOA4IgWgiIgIAIIAAAaIgSAAIAAhvIASAAIAABAIAFgHIAWgYIAVAAIgeAgIAhAug");
	this.shape_52.setTransform(73.55,61.625);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AgZAiQgIgGAAgKQAAgNAKgGQAJgHARAAIAKAAIAAgFQAAgHgDgDQgEgEgGABQgFAAgFACQgEADAAAFIgRAAQAAgGAEgGQAFgGAHgDQAIgDAIAAQAOAAAHAHQAJAHAAAMIAAAjQAAALADAGIAAABIgSAAIgCgHQgJAJgLAAQgMAAgHgHgAgKAFQgFAEAAAHQAAAEADADQADAEAGAAQAFgBAEgCQAFgCACgFIAAgPIgKAAQgIAAgFADg");
	this.shape_53.setTransform(57.7,63.3);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgQAlQgHgDgFgGQgEgGAAgIIASAAQAAAHAEAEQAFADAGAAQAHgBAEgCQADgCAAgFQAAgFgEgDQgEgCgIgBQgJgDgGgCQgNgGAAgMQAAgKAJgIQAIgGAMAAQAPAAAIAHQAJAHAAALIgSAAQAAgFgDgEQgEgDgHAAQgEAAgEADQgEADAAAEQAAAEAEADQADABAKADQAKACAGAEQAGACADAEQADAEAAAHQAAAKgJAIQgJAGgOAAQgJAAgIgEg");
	this.shape_54.setTransform(49.725,63.3);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgIA3IAAhOIARAAIAABOgAgGglQgDgDAAgEQAAgEADgDQACgDAEAAQAFAAACADQADADAAAEQAAAEgDADQgCACgFAAQgEAAgCgCg");
	this.shape_55.setTransform(43.975,61.775);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AgQAlQgHgDgFgGQgEgGAAgIIASAAQAAAHAEAEQAFADAGAAQAHgBAEgCQADgCAAgFQAAgFgEgDQgEgCgIgBQgJgDgGgCQgNgGAAgMQAAgKAJgIQAIgGAMAAQAPAAAIAHQAJAHAAALIgSAAQAAgFgDgEQgEgDgHAAQgEAAgEADQgEADAAAEQAAAEAEADQADABAKADQAKACAGAEQAGACADAEQADAEAAAHQAAAKgJAIQgJAGgOAAQgJAAgIgEg");
	this.shape_56.setTransform(38.125,63.3);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AgSAHIAAgNIAlAAIAAANg");
	this.shape_57.setTransform(31.875,62.725);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AgZAiQgIgGAAgKQAAgNAJgGQAKgHAQAAIALAAIAAgFQABgHgEgDQgEgEgGABQgGAAgDACQgFADAAAFIgRAAQAAgGAEgGQAEgGAIgDQAHgDAJAAQAOAAAHAHQAJAHAAAMIAAAjQAAALADAGIAAABIgSAAIgCgHQgJAJgLAAQgMAAgHgHgAgKAFQgFAEAAAHQAAAEADADQAEAEAFAAQAFgBAEgCQAFgCACgFIAAgPIgKAAQgIAAgFADg");
	this.shape_58.setTransform(25.4,63.3);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgQAlQgHgDgFgGQgEgGAAgIIASAAQAAAHAEAEQAFADAGAAQAHgBAEgCQADgCAAgFQAAgFgEgDQgEgCgIgBQgJgDgGgCQgNgGAAgMQAAgKAJgIQAIgGAMAAQAPAAAIAHQAJAHAAALIgSAAQAAgFgDgEQgEgDgHAAQgEAAgEADQgEADAAAEQAAAEAEADQADABAKADQAKACAGAEQAGACADAEQADAEAAAHQAAAKgJAIQgJAGgOAAQgJAAgIgEg");
	this.shape_59.setTransform(17.425,63.3);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgIA3IAAhOIARAAIAABOgAgGglQgDgDAAgEQAAgEADgDQACgDAEAAQAFAAACADQADADAAAEQAAAEgDADQgCACgFAAQgEAAgCgCg");
	this.shape_60.setTransform(11.675,61.775);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgQAlQgHgDgFgGQgEgGAAgIIASAAQAAAHAEAEQAFADAGAAQAHgBAEgCQADgCAAgFQAAgFgEgDQgEgCgIgBQgJgDgGgCQgNgGAAgMQAAgKAJgIQAIgGAMAAQAPAAAIAHQAJAHAAALIgSAAQAAgFgDgEQgEgDgHAAQgEAAgEADQgEADAAAEQAAAEAEADQADABAKADQAKACAGAEQAGACADAEQADAEAAAHQAAAKgJAIQgJAGgOAAQgJAAgIgEg");
	this.shape_61.setTransform(5.825,63.3);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AgLAPQAFgHABgFQACgEAAgFIAAgNIAPAAIAAAMQAAAHgEAHQgEAJgFAEg");
	this.shape_62.setTransform(238.825,45.6);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AgYAfQgKgMAAgRIAAgCQAAgLAFgKQAEgJAIgFQAJgFAJAAQAQAAAJAKQAJALAAASIAAAGIgzAAQABALAGAFQAFAGAIAAQANAAAHgKIAKAJQgFAHgIAEQgIAEgKAAQgQAAgLgKgAgKgVQgEAGgCAJIAhAAIAAgCQAAgJgFgEQgEgFgHAAQgGAAgFAFg");
	this.shape_63.setTransform(233.5,41.3);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AgQAmQgHgEgFgGQgEgGAAgHIASAAQAAAGAEADQAFADAGAAQAHAAAEgCQADgDAAgEQAAgFgEgCQgEgDgIgCQgJgBgGgDQgNgGAAgMQAAgLAJgGQAIgHAMAAQAPAAAIAHQAJAHAAALIgSAAQAAgFgDgDQgEgEgHAAQgEAAgEADQgEADAAAEQAAAEAEACQADACAKADQAKACAGADQAGACADAFQADAEAAAHQAAALgJAGQgJAHgOAAQgJAAgIgDg");
	this.shape_64.setTransform(225.475,41.3);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2C3E50").s().p("AAPAoIAAgyQAAgIgDgDQgEgEgHAAQgKAAgFAKIAAA3IgSAAIAAhOIARAAIAAAJQAJgKANAAQAZAAABAcIAAAzg");
	this.shape_65.setTransform(217.475,41.225);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2C3E50").s().p("AgXAfQgLgMAAgRIAAgCQAAgLAEgKQAFgJAJgFQAIgFAJAAQAQAAAJAKQAJALAAASIAAAGIgzAAQABALAFAFQAHAGAHAAQAMAAAIgKIAJAJQgEAHgIAEQgIAEgKAAQgQAAgKgKgAgKgVQgEAGgBAJIAgAAIAAgCQgBgJgEgEQgDgFgIAAQgGAAgFAFg");
	this.shape_66.setTransform(209.35,41.3);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2C3E50").s().p("AgiA4IAAhtIARAAIAAAIQAIgKANAAQAOAAAJALQAIALAAATIAAABQAAARgJALQgIALgOAAQgMABgIgJIAAAmgAgQgfIAAAiQAFAKALAAQAHAAAFgIQAFgFAAgOQAAgMgFgHQgEgHgIAAQgLAAgFAJg");
	this.shape_67.setTransform(201.175,42.75);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2C3E50").s().p("AgQAmQgHgEgFgGQgEgGAAgHIASAAQAAAGAEADQAFADAGAAQAHAAAEgCQADgDAAgEQAAgFgEgCQgEgDgIgCQgJgBgGgDQgNgGAAgMQAAgLAJgGQAIgHAMAAQAPAAAIAHQAJAHAAALIgSAAQAAgFgDgDQgEgEgHAAQgEAAgEADQgEADAAAEQAAAEAEACQADACAKADQAKACAGADQAGACADAFQADAEAAAHQAAALgJAGQgJAHgOAAQgJAAgIgDg");
	this.shape_68.setTransform(192.875,41.3);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2C3E50").s().p("AgZAhQgHgIAAgOIAAgyIASAAIAAAyQAAAPAMAAQAMAAAFgKIAAg3IASAAIAABOIgRAAIgBgIQgHAJgNAAQgOAAgGgHg");
	this.shape_69.setTransform(184.85,41.375);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2C3E50").s().p("AgQAmQgHgEgFgGQgEgGAAgHIASAAQAAAGAEADQAFADAGAAQAHAAAEgCQADgDAAgEQAAgFgEgCQgEgDgIgCQgJgBgGgDQgNgGAAgMQAAgLAJgGQAIgHAMAAQAPAAAIAHQAJAHAAALIgSAAQAAgFgDgDQgEgEgHAAQgEAAgEADQgEADAAAEQAAAEAEACQADACAKADQAKACAGADQAGACADAFQADAEAAAHQAAALgJAGQgJAHgOAAQgJAAgIgDg");
	this.shape_70.setTransform(176.775,41.3);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2C3E50").s().p("AAPAoIAAgyQAAgIgDgDQgEgEgHAAQgKAAgFAKIAAA3IgSAAIAAhOIARAAIAAAJQAJgKANAAQAZAAABAcIAAAzg");
	this.shape_71.setTransform(153.225,41.225);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2C3E50").s().p("AgZAiQgIgHAAgKQAAgNAKgFQAJgHARAAIAKAAIAAgFQAAgHgDgDQgEgEgGAAQgFAAgFAEQgEADABAEIgSAAQAAgGAEgGQAEgGAIgDQAIgDAIAAQAOAAAHAHQAJAHAAANIAAAiQAAALADAHIAAABIgSAAIgCgIQgJAJgLAAQgMAAgHgHgAgKAFQgFAEAAAGQAAAFADADQADADAGAAQAFAAAEgCQAFgDACgEIAAgOIgKAAQgIAAgFACg");
	this.shape_72.setTransform(145,41.3);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#2C3E50").s().p("AAPA4IgXgiIgIAIIAAAaIgSAAIAAhvIASAAIAABAIAFgHIAVgYIAWAAIgdAgIAgAug");
	this.shape_73.setTransform(137.5,39.625);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#2C3E50").s().p("AgaAiQgHgHAAgKQAAgNAKgFQAJgHARAAIALAAIAAgFQgBgHgDgDQgDgEgHAAQgFAAgFAEQgDADAAAEIgSAAQAAgGAEgGQAFgGAHgDQAIgDAHAAQAOAAAJAHQAIAHAAANIAAAiQAAALADAHIAAABIgSAAIgCgIQgIAJgMAAQgMAAgIgHgAgKAFQgFAEAAAGQAAAFAEADQADADAFAAQAEAAAFgCQAFgDADgEIAAgOIgKAAQgJAAgFACg");
	this.shape_74.setTransform(129.05,41.3);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#2C3E50").s().p("AAmAoIAAgyQAAgIgDgDQgDgEgIAAQgGAAgEADQgEAEgBAFIAAA1IgRAAIAAgzQAAgOgOAAQgLAAgEAJIAAA4IgSAAIAAhOIARAAIAAAIQAIgJAPAAQAPAAAGAMQAIgMAQAAQANAAAHAHQAGAHAAAOIAAAzg");
	this.shape_75.setTransform(118.475,41.225);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#2C3E50").s().p("AgXAfQgLgMAAgRIAAgCQAAgLAEgKQAFgJAJgFQAIgFAJAAQAQAAAJAKQAJALAAASIAAAGIgzAAQABALAFAFQAHAGAHAAQAMAAAIgKIAJAJQgEAHgIAEQgIAEgKAAQgQAAgKgKgAgKgVQgFAGAAAJIAgAAIAAgCQgBgJgDgEQgEgFgIAAQgGAAgFAFg");
	this.shape_76.setTransform(108,41.3);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#2C3E50").s().p("AgiA4IAAhtIARAAIAAAIQAIgKANAAQAOAAAJALQAIALAAATIAAABQAAARgJALQgIALgOAAQgMABgIgJIAAAmgAgQgfIAAAiQAFAKALAAQAHAAAFgIQAFgFAAgOQAAgMgFgHQgEgHgIAAQgLAAgFAJg");
	this.shape_77.setTransform(99.825,42.75);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#2C3E50").s().p("AgIA3IAAhOIARAAIAABOgAgGglQgDgDAAgEQAAgEADgDQACgDAEAAQAFAAACADQADADAAAEQAAAEgDADQgCACgFAAQgEAAgCgCg");
	this.shape_78.setTransform(77.975,39.775);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#2C3E50").s().p("AAPAoIAAgyQAAgIgDgDQgEgEgHAAQgKAAgFAKIAAA3IgSAAIAAhOIARAAIAAAJQAJgKANAAQAZAAABAcIAAAzg");
	this.shape_79.setTransform(71.875,41.225);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#2C3E50").s().p("AgIA3IAAhOIARAAIAABOgAgGglQgDgDAAgEQAAgEADgDQACgDAEAAQAFAAACADQADADAAAEQAAAEgDADQgCACgFAAQgEAAgCgCg");
	this.shape_80.setTransform(65.775,39.775);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#2C3E50").s().p("AAPAoIAAgyQAAgIgDgDQgEgEgHAAQgKAAgFAKIAAA3IgSAAIAAhOIARAAIAAAJQAJgKANAAQAZAAABAcIAAAzg");
	this.shape_81.setTransform(44.125,41.225);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#2C3E50").s().p("AgaAiQgHgHAAgKQAAgNAKgFQAJgHARAAIALAAIAAgFQgBgHgDgDQgDgEgHAAQgFAAgFAEQgDADAAAEIgSAAQAAgGAEgGQAFgGAHgDQAIgDAHAAQAOAAAJAHQAIAHAAANIAAAiQAAALADAHIAAABIgSAAIgCgIQgIAJgMAAQgMAAgIgHgAgKAFQgFAEAAAGQAAAFADADQAEADAFAAQAEAAAFgCQAFgDADgEIAAgOIgKAAQgJAAgFACg");
	this.shape_82.setTransform(35.9,41.3);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#2C3E50").s().p("AARAoIgRg2IgQA2IgOAAIgWhPIARAAIANA2IAQg2IANAAIAQA2IANg2IARAAIgVBPg");
	this.shape_83.setTransform(26.25,41.3);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#2C3E50").s().p("AgXAfQgLgMAAgRIAAgCQAAgLAEgKQAFgJAJgFQAIgFAJAAQAQAAAJAKQAJALAAASIAAAGIgzAAQABALAFAFQAHAGAHAAQAMAAAIgKIAJAJQgEAHgIAEQgIAEgKAAQgQAAgKgKgAgKgVQgEAGgBAJIAgAAIAAgCQgBgJgDgEQgEgFgIAAQgGAAgFAFg");
	this.shape_84.setTransform(16.75,41.3);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#2C3E50").s().p("AAYA1IAAgvIgvAAIAAAvIgSAAIAAhpIASAAIAAAsIAvAAIAAgsIASAAIAABpg");
	this.shape_85.setTransform(7.325,39.925);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.202,0,0,1.755,-149.5,-76.4)).s().p("A3XL7IAA31MAuvAAAIAAX1g");
	this.shape_86.setTransform(125.125,78.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop8G5, new cjs.Rectangle(-24.5,2.1,299.3,152.70000000000002), null);


(lib.drop8G4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgOBBIAAhLIgNAAIAAgOIANAAIAAgIQABgPAHgJQAIgHAPgBIALACIAAAPIgIAAQgOAAAAAPIAAAIIASAAIAAAOIgSAAIAABLg");
	this.shape.setTransform(196.15,75.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDAEgFAAQgEAAgDgEg");
	this.shape_1.setTransform(190.775,76.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgVIATAAIAAAVIAQAAIAAAPIgQAAIAAAxQAAAGACABQACADAGAAIAHgBIAAAQIgOABQgWABAAgag");
	this.shape_2.setTransform(185.575,76.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AAQBAIgagnIgJAJIAAAeIgUAAIAAh/IAUAAIAABJIAHgIIAYgbIAYAAIghAkIAlA1g");
	this.shape_3.setTransform(179.1,76.025);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_4.setTransform(169.375,77.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgcA0QgKgMAAgXQAAgUAJgMQAKgMAQAAQAOgBAIALIAAguIAUAAIAAB+IgSAAIgBgKQgJAMgOgBQgQAAgJgMgAgNgDQgFAHAAAPQAAAOAFAIQAGAHAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_5.setTransform(159.625,76.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgdAiQgMgMAAgWIAAAAQAAgNAGgLQAFgKAJgFQAKgHALABQASAAAMALQALAMABAUIAAADQAAAOgFAKQgFAKgKAGQgJAGgNgBQgSAAgLgMgAgPgVQgGAIAAAOQAAAOAGAIQAGAIAJgBQAKAAAGgHQAGgJAAgOQAAgOgGgHQgGgIgKAAQgJAAgGAIg");
	this.shape_6.setTransform(150.175,77.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgXAuIAAhZIATAAIABAKQAGgMANAAIAHABIAAATIgIAAQgNAAgFAKIAAA9g");
	this.shape_7.setTransform(142.75,77.825);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgmA/IAAh7IASAAIABAJQAJgLAOAAQARAAAJANQAJAMAAAWIAAABQAAATgJANQgKAMgQAAQgNAAgJgJIAAAqgAgSgjIAAAnQAFAKANAAQAIAAAGgIQAFgGAAgQQAAgNgFgJQgGgHgJgBQgMAAgFALg");
	this.shape_8.setTransform(134.775,79.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgbAjQgMgMABgVIAAgCQAAgMAEgLQAGgLAJgFQAJgHALABQASAAALALQAJAMABAWIAAAHIg7AAQACALAGAGQAHAHAJgBQANAAAJgLIALAKQgFAJgJAFQgKADgKAAQgTABgMgMgAgLgYQgFAGgCAKIAlAAIAAgBQAAgKgFgFQgEgGgJABQgIAAgEAFg");
	this.shape_9.setTransform(125.35,77.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgXAuIAAhZIATAAIABAKQAGgMAOAAIAGABIAAATIgIAAQgNAAgFAKIAAA9g");
	this.shape_10.setTransform(118.1,77.825);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgVAIIAAgPIArAAIAAAPg");
	this.shape_11.setTransform(111.875,77.275);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_12.setTransform(104.375,77.825);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgdAiQgMgMAAgWIAAAAQAAgNAGgLQAFgKAJgFQAKgHALABQASAAAMALQALAMABAUIAAADQAAAOgFAKQgFAKgKAGQgJAGgNgBQgSAAgLgMgAgPgVQgGAIAAAOQAAAOAGAIQAGAIAJgBQAKAAAGgHQAGgJAAgOQAAgOgGgHQgGgIgKAAQgJAAgGAIg");
	this.shape_13.setTransform(94.775,77.9);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_14.setTransform(85.225,77.825);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_15.setTransform(71.525,77.975);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgcA0QgKgMAAgXQAAgUAJgMQAKgMAQAAQAOgBAIALIAAguIAUAAIAAB+IgSAAIgBgKQgJAMgOgBQgQAAgJgMgAgNgDQgFAHAAAPQAAAOAFAIQAGAHAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_16.setTransform(61.775,76.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDAEgFAAQgEAAgDgEg");
	this.shape_17.setTransform(55.025,76.2);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgIAtIgfhZIAVAAIASA/IATg/IAVAAIgfBZg");
	this.shape_18.setTransform(48.65,77.9);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDAEgFAAQgEAAgDgEg");
	this.shape_19.setTransform(42.275,76.2);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgcA0QgKgMAAgXQAAgUAJgMQAKgMAQAAQAOgBAIALIAAguIAUAAIAAB+IgSAAIgBgKQgJAMgOgBQgQAAgJgMgAgNgDQgFAHAAAPQAAAOAFAIQAGAHAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_20.setTransform(35.075,76.1);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_21.setTransform(25.775,77.825);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDAEgFAAQgEAAgDgEg");
	this.shape_22.setTransform(18.875,76.2);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgfBCIAviDIAQAAIgvCDg");
	this.shape_23.setTransform(213.025,52.475);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgaAjQgNgMAAgVIAAgCQABgMAFgLQAFgKAJgHQAJgFALAAQATAAAJALQALAMgBAWIAAAHIg5AAQAAAKAHAHQAGAHAJgBQAPAAAIgLIALAKQgFAJgKAFQgIADgMAAQgSABgLgMgAgMgYQgFAHgBAJIAmAAIAAgBQgBgKgFgFQgFgGgIABQgHAAgGAFg");
	this.shape_24.setTransform(205.4,53.5);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AAQBAIgagnIgJAJIAAAeIgTAAIAAh/IATAAIAABJIAHgIIAYgbIAYAAIghAkIAlA1g");
	this.shape_25.setTransform(196.9,51.625);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgdAiQgMgMAAgWIAAAAQAAgNAGgLQAFgKAJgGQAKgFALAAQASAAAMALQALAMABAUIAAADQAAAOgFAKQgFAKgKAGQgJAFgNAAQgSAAgLgMgAgPgWQgGAIAAAPQAAAOAGAIQAGAIAJgBQAKAAAGgIQAGgHAAgPQAAgNgGgJQgGgHgKAAQgJAAgGAHg");
	this.shape_26.setTransform(187.025,53.5);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgVIATAAIAAAVIAQAAIAAAPIgQAAIAAAxQAAAGACACQACACAGAAIAHgBIAAAQIgOABQgWABAAgag");
	this.shape_27.setTransform(179.175,52.5);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AAhA8IgKgcIgtAAIgKAcIgWAAIAth4IASAAIAuB4gAgRAPIAiAAIgRgwg");
	this.shape_28.setTransform(170.9,51.95);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_29.setTransform(142.525,53.425);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgdAnQgJgIAAgLQAAgOALgHQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEAEQgFADABAFIgVAAQABgHAFgHQAEgGAIgEQAJgEAKABQAPgBAJAJQAKAHAAAOIAAAoQAAAMAEAIIAAABIgVAAIgDgJQgJALgNgBQgOAAgIgHgAgMAHQgFAEgBAHQABAGAEADQADAEAHgBQAFAAAFgCQAFgDADgFIAAgRIgLAAQgKAAgGAEg");
	this.shape_30.setTransform(133.2,53.5);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgcA0QgKgMAAgWQAAgVAJgMQAKgMAQAAQAOgBAIALIAAguIAUAAIAAB+IgSAAIgBgJQgJALgOgBQgQAAgJgMgAgNgDQgFAGAAAQQAAAOAFAHQAGAIAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_31.setTransform(123.575,51.7);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgOBAIAAhKIgNAAIAAgPIANAAIAAgHQABgQAHgIQAIgIAPAAIALACIAAAPIgIAAQgOAAAAAPIAAAHIASAAIAAAPIgSAAIAABKg");
	this.shape_32.setTransform(98.15,51.55);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDADgFABQgEgBgDgDg");
	this.shape_33.setTransform(92.775,51.8);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgVIATAAIAAAVIAQAAIAAAPIgQAAIAAAxQAAAGACACQACACAGAAIAHgBIAAAQIgOABQgWABAAgag");
	this.shape_34.setTransform(87.575,52.5);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AAQBAIgagnIgJAJIAAAeIgUAAIAAh/IAUAAIAABJIAHgIIAYgbIAYAAIghAkIAkA1g");
	this.shape_35.setTransform(81.1,51.625);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_36.setTransform(71.375,53.575);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgcA0QgKgMAAgWQAAgVAJgMQAKgMAQAAQAOgBAIALIAAguIAUAAIAAB+IgSAAIgBgJQgJALgOgBQgQAAgJgMgAgNgDQgFAGAAAQQAAAOAFAHQAGAIAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_37.setTransform(61.625,51.7);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgdAiQgMgMAAgWIAAAAQAAgNAGgLQAFgKAJgGQAKgFALAAQASAAAMALQALAMABAUIAAADQAAAOgFAKQgFAKgKAGQgJAFgNAAQgSAAgLgMgAgPgWQgGAIAAAPQAAAOAGAIQAGAIAJgBQAKAAAGgIQAGgHAAgPQAAgNgGgJQgGgHgKAAQgJAAgGAHg");
	this.shape_38.setTransform(52.175,53.5);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgXAuIAAhZIATAAIABAKQAGgMAOAAIAGABIAAATIgIAAQgNAAgFAKIAAA9g");
	this.shape_39.setTransform(44.75,53.425);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2C3E50").s().p("AgmA/IAAh8IASAAIABAKQAJgLAOAAQARAAAJANQAJAMAAAVIAAACQAAATgJANQgKAMgQAAQgNAAgJgJIAAAqgAgSgjIAAAnQAFAKANAAQAIAAAGgIQAFgHAAgPQAAgNgFgJQgGgIgJAAQgMAAgFALg");
	this.shape_40.setTransform(36.775,55.15);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2C3E50").s().p("AgbAjQgMgMAAgVIAAgCQAAgMAGgLQAFgKAJgHQAJgFALAAQASAAALALQAJAMABAWIAAAHIg7AAQABAKAHAHQAGAHAKgBQANAAAJgLIALAKQgFAJgKAFQgIADgLAAQgTABgMgMgAgLgYQgFAHgCAJIAmAAIAAgBQgBgKgFgFQgEgGgJABQgIAAgEAFg");
	this.shape_41.setTransform(27.35,53.5);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2C3E50").s().p("AgXAuIAAhZIATAAIABAKQAGgMAOAAIAGABIAAATIgIAAQgNAAgFAKIAAA9g");
	this.shape_42.setTransform(20.1,53.425);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2C3E50").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_43.setTransform(211.875,29.175);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2C3E50").s().p("AgcA0QgKgNAAgVQAAgVAJgMQAKgMAQAAQAOAAAIAKIAAguIAUAAIAAB+IgSAAIgBgJQgJALgOAAQgQgBgJgMgAgNgDQgFAGAAAQQAAAOAFAHQAGAIAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_44.setTransform(202.125,27.3);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_45.setTransform(195.375,27.4);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2C3E50").s().p("AgIAtIgfhZIAUAAIATA/IATg/IAVAAIggBZg");
	this.shape_46.setTransform(189,29.1);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_47.setTransform(182.625,27.4);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2C3E50").s().p("AgcA0QgKgNAAgVQAAgVAJgMQAKgMAQAAQAOAAAIAKIAAguIAUAAIAAB+IgSAAIgBgJQgJALgOAAQgQgBgJgMgAgNgDQgFAGAAAQQAAAOAFAHQAGAIAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_48.setTransform(175.425,27.3);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_49.setTransform(166.125,29.025);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_50.setTransform(159.225,27.4);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2C3E50").s().p("AgfBCIAviDIAQAAIgvCDg");
	this.shape_51.setTransform(141.425,28.075);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2C3E50").s().p("AgbAjQgMgMABgVIAAgCQAAgNAEgKQAGgKAJgHQAJgFALAAQATAAAJALQALAMAAAWIAAAHIg7AAQACAKAGAHQAHAGAJAAQAOABAIgMIALAKQgGAJgIAFQgKADgKAAQgTABgMgMgAgLgYQgGAHgBAKIAlAAIAAgCQAAgKgFgFQgFgGgIAAQgIABgEAFg");
	this.shape_52.setTransform(133.8,29.1);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2C3E50").s().p("AAQBAIgZgnIgJAJIAAAeIgVAAIAAh/IAVAAIAABJIAGgIIAXgbIAZAAIghAkIAkA1g");
	this.shape_53.setTransform(125.3,27.225);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2C3E50").s().p("AgdAiQgMgNAAgUIAAgBQAAgNAGgLQAFgKAJgGQAKgFALAAQASAAAMALQALAMABATIAAAEQAAANgFALQgFAKgKAGQgJAFgNAAQgSAAgLgMgAgPgWQgGAJAAAOQAAAOAGAIQAGAHAJAAQAKABAGgJQAGgHAAgPQAAgNgGgJQgGgHgKgBQgJABgGAHg");
	this.shape_54.setTransform(115.425,29.1);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2C3E50").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgWIATAAIAAAWIAQAAIAAAPIgQAAIAAAxQAAAFACADQACACAGAAIAHgBIAAAQIgOABQgWABAAgag");
	this.shape_55.setTransform(107.575,28.1);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_56.setTransform(102.775,27.4);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2C3E50").s().p("AgmA/IAAh8IASAAIABAKQAJgLAOAAQARAAAJANQAJALAAAWIAAABQAAAVgJAMQgKAMgQAAQgNAAgJgKIAAArgAgSgjIAAAnQAFAKANAAQAIAAAGgHQAFgIAAgPQAAgOgFgHQgGgJgJABQgMAAgFAKg");
	this.shape_57.setTransform(96.025,30.75);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2C3E50").s().p("AgmA8IAAh3IBNAAIAAARIg5AAIAAAhIAxAAIAAAPIgxAAIAAAlIA6AAIAAARg");
	this.shape_58.setTransform(86.65,27.55);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2C3E50").s().p("AgdAnQgJgIABgLQAAgPAKgGQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEAEQgEADgBAFIgTAAQAAgHAEgHQAFgGAJgEQAIgEAJABQAQAAAKAIQAJAHAAAOIAAAoQAAAMADAIIAAABIgUAAIgCgIQgKAKgNgBQgNAAgJgHgAgLAHQgHAEABAHQAAAGADADQAFAEAGgBQAFAAAFgCQAGgDACgFIAAgRIgLAAQgKAAgFAEg");
	this.shape_59.setTransform(64.75,29.1);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2C3E50").s().p("AgXAuIAAhZIATAAIABAKQAHgMANAAIAHABIAAATIgJAAQgOAAgDAKIAAA9g");
	this.shape_60.setTransform(57.55,29.025);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2C3E50").s().p("AgdAnQgIgIAAgLQAAgPAKgGQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgEADgBAFIgUAAQAAgHAGgHQAEgGAJgEQAIgEAJABQAQAAAKAIQAJAHAAAOIAAAoQAAAMADAIIAAABIgUAAIgCgIQgKAKgNgBQgNAAgJgHgAgLAHQgHAEABAHQgBAGAEADQAFAEAGgBQAFAAAFgCQAGgDACgFIAAgRIgLAAQgKAAgFAEg");
	this.shape_61.setTransform(49.55,29.1);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2C3E50").s().p("AgbAjQgLgMAAgWIAAgBQAAgVALgMQALgMASAAQAQAAAKAJQAKAJABAPIgTAAQgBgIgEgFQgFgEgIgBQgJAAgFAIQgFAHgBAPIAAABQAAAPAGAHQAFAIAJgBQAIABAFgFQAEgEABgGIATAAQAAAHgFAIQgFAHgJAFQgIADgKAAQgSABgLgMg");
	this.shape_62.setTransform(40.575,29.1);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2C3E50").s().p("AgaAjQgMgMgBgVIAAgCQAAgNAGgKQAFgKAJgHQAKgFAKAAQATAAAKALQAKAMgBAWIAAAHIg6AAQACAKAGAHQAGAGAJAAQAOABAJgMIALAKQgFAJgKAFQgIADgLAAQgTABgLgMgAgMgYQgEAHgCAKIAmAAIAAgCQgBgKgFgFQgFgGgIAAQgHABgGAFg");
	this.shape_63.setTransform(31.6,29.1);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2C3E50").s().p("AgVA5QgLgEgGgJQgGgJAAgLIAVAAQAAALAHAFQAHAGALAAQALAAAGgFQAFgFAAgGQAAgJgFgEQgGgEgOgEQgOgFgJgFQgQgKAAgRQAAgOAMgJQALgKASAAQANAAAKAEQAKAGAFAIQAGAJAAAKIgVAAQAAgJgGgGQgGgGgLABQgJgBgGAFQgFAFAAAHQAAAHAGAFQAGAEANAEQAOAEAJAFQAIAFAEAHQAEAHAAAJQAAAPgLAKQgMAIgUAAQgMAAgLgFg");
	this.shape_64.setTransform(21.825,27.55);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.105,0,0,1.466,-137.5,-63.8)).s().p("A1fJ+IAAz7MAq/AAAIAAT7g");
	this.shape_65.setTransform(119.525,57.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop8G4, new cjs.Rectangle(-18,-6.3,275.1,127.5), null);


(lib.drop8G3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgSArQgIgFgFgGQgFgIAAgHIAUAAQAAAHAFADQAFAEAHABQAIgBAEgDQAEgCAAgGQAAgFgEgDQgEgDgKgBQgKgDgHgDQgPgHAAgNQAAgMAKgHQAKgJAOABQAQgBAKAJQAKAHAAANIgVAAQAAgGgEgEQgEgDgHAAQgGAAgEADQgEADAAAFQAAAFAEACQADACALADQAMADAHAEQAHACADAFQADAGAAAGQAAAMgKAIQgKAHgQAAQgKAAgJgDg");
	this.shape.setTransform(184.675,56.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_1.setTransform(175.625,56.825);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_2.setTransform(168.725,54.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgdAnQgJgIABgLQAAgOAKgHQALgIASAAIANAAIAAgGQAAgHgEgEQgEgEgHAAQgHAAgEADQgEAEgBAFIgTAAQAAgHAEgHQAFgGAJgEQAIgDAKAAQAPgBAKAJQAJAHAAAOIAAAoQAAAMADAIIAAABIgUAAIgCgJQgKALgNgBQgNAAgJgHgAgLAHQgHADABAIQAAAFADAEQAFADAGAAQAFAAAFgDQAGgDACgEIAAgRIgLAAQgKAAgFAEg");
	this.shape_3.setTransform(161.95,56.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AARBAIAAg6QAAgIgEgEQgEgEgIAAQgLAAgGAKIAABAIgUAAIAAh/IAUAAIAAAwQAKgMAOAAQAdAAAAAgIAAA7g");
	this.shape_4.setTransform(152.625,54.875);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AARBAIAAg6QAAgIgEgEQgEgEgIAAQgLAAgGAKIAABAIgUAAIAAh/IAUAAIAAAwQAKgMAOAAQAdAAAAAgIAAA7g");
	this.shape_5.setTransform(138.925,54.875);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgdAnQgJgIAAgLQAAgOALgHQALgIATAAIAMAAIAAgGQAAgHgEgEQgEgEgHAAQgHAAgEADQgFAEABAFIgVAAQABgHAEgHQAFgGAIgEQAJgDAKAAQAPgBAJAJQAKAHAAAOIAAAoQAAAMAEAIIAAABIgVAAIgDgJQgJALgNgBQgOAAgIgHgAgMAHQgFADgBAIQABAFAEAEQADADAHAAQAFAAAFgDQAFgDADgEIAAgRIgLAAQgKAAgGAEg");
	this.shape_6.setTransform(129.6,56.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgWAuIAAhZIASAAIABAKQAGgMANAAIAHABIAAATIgIAAQgOAAgEAKIAAA9g");
	this.shape_7.setTransform(122.4,56.675);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgdAnQgJgIAAgLQAAgOALgHQALgIATAAIAMAAIAAgGQAAgHgEgEQgEgEgHAAQgGAAgFADQgFAEABAFIgUAAQAAgHAEgHQAFgGAJgEQAIgDAKAAQAPgBAJAJQAKAHAAAOIAAAoQAAAMAEAIIAAABIgVAAIgDgJQgJALgNgBQgOAAgIgHgAgMAHQgFADAAAIQAAAFADAEQAEADAHAAQAFAAAFgDQAFgDADgEIAAgRIgLAAQgKAAgGAEg");
	this.shape_8.setTransform(114.4,56.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgcA0QgKgMAAgWQAAgVAJgMQAKgMAQAAQAOgBAIAKIAAgtIAUAAIAAB+IgSAAIgBgKQgJAMgOgBQgQAAgJgMgAgNgDQgFAHAAAPQAAAOAFAIQAGAHAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_9.setTransform(104.775,54.95);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AARBAIAAg6QAAgIgEgEQgEgEgIAAQgLAAgGAKIAABAIgUAAIAAh/IAUAAIAAAwQAKgMAOAAQAdAAAAAgIAAA7g");
	this.shape_10.setTransform(91.225,54.875);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_11.setTransform(81.775,56.825);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_12.setTransform(74.875,54.875);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_13.setTransform(67.975,56.825);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgTA1IgBAKIgSAAIAAh+IAUAAIAAAuQAIgKAOAAQARgBAJAMQAJANAAAVIAAABQAAAVgJANQgJAMgRgBQgOABgJgMgAgSAAIAAAkQAFAMANAAQAJAAAFgHQAFgHAAgOIAAgCQAAgQgFgFQgFgIgJAAQgNAAgFALg");
	this.shape_14.setTransform(58.675,54.95);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AAsAuIAAg6QAAgIgFgEQgDgEgJAAQgGAAgFAEQgEADgCAGIAAA9IgTAAIAAg6QgBgQgQAAQgMAAgFAKIAABAIgTAAIAAhZIASAAIABAJQAJgLARAAQARAAAHAOQAJgOASAAQAPAAAHAIQAHAJAAAQIAAA6g");
	this.shape_15.setTransform(46.3,56.675);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgbAjQgMgMABgVIAAgCQAAgMAEgLQAGgLAJgFQAJgHALABQASAAALALQAJAMABAWIAAAHIg7AAQACALAGAGQAHAHAJgBQANAAAJgLIALAKQgFAJgJAFQgKADgKAAQgTABgMgMgAgLgYQgFAGgCAKIAlAAIAAgBQAAgKgFgFQgEgGgJABQgIAAgEAFg");
	this.shape_16.setTransform(34.45,56.75);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgmA/IAAh7IASAAIABAJQAJgLAOAAQARAAAJANQAJAMAAAWIAAABQAAATgJANQgKAMgQAAQgNAAgJgJIAAAqgAgSgjIAAAnQAFAKANAAQAIAAAGgIQAFgGAAgQQAAgNgFgJQgGgHgJgBQgMAAgFALg");
	this.shape_17.setTransform(25.225,58.4);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgUA7QgJgEgFgHIAKgLQAJALANgBQAKAAAFgFQAGgFABgLIAAgGQgJAJgOAAQgQAAgKgMQgKgMAAgVQAAgWAKgMQAKgMAQAAQAOAAAKAKIABgJIASAAIAABXQgBARgKAKQgMALgRAAQgKAAgKgFgAgNgmQgGAIAAAPQAAAOAGAGQAFAIAJAAQAMAAAHgKIAAgmQgHgLgLAAQgJAAgGAIg");
	this.shape_18.setTransform(207,34.05);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_19.setTransform(197.625,32.275);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgdAlQgHgIAAgQIAAg6IAUAAIAAA5QAAARAOAAQAOAAAFgKIAAhAIAUAAIAABZIgTAAIgBgJQgIALgQAAQgOAAgIgJg");
	this.shape_20.setTransform(188.175,32.425);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgcA0QgKgMAAgWQAAgVAJgMQAKgMAQAAQAOgBAIALIAAguIAUAAIAAB+IgSAAIgBgJQgJALgOgBQgQAAgJgMgAgNgDQgFAGAAAQQAAAOAFAHQAGAIAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_21.setTransform(178.425,30.55);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_22.setTransform(169.125,32.275);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgdAnQgIgIAAgLQAAgOAKgHQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgEADgBAFIgUAAQAAgHAGgHQAEgGAIgEQAJgEAJABQAQgBAKAJQAJAHAAAOIAAAoQAAAMADAIIAAABIgUAAIgCgJQgKALgNgBQgNAAgJgHgAgLAHQgHAEAAAHQAAAGAEADQAFAEAGgBQAFAAAFgDQAGgCACgFIAAgRIgLAAQgKAAgFAEg");
	this.shape_23.setTransform(159.8,32.35);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgUA7QgJgEgFgHIAKgLQAJALANgBQAJAAAHgFQAFgFABgLIAAgGQgJAJgOAAQgPAAgLgMQgKgMABgVQAAgWAJgMQAKgMAQAAQAPAAAJAKIABgJIASAAIAABXQgBARgKAKQgMALgRAAQgKAAgKgFgAgNgmQgFAIgBAPQABAOAFAGQAGAIAIAAQAMAAAHgKIAAgmQgHgLgLAAQgJAAgGAIg");
	this.shape_24.setTransform(150.2,34.05);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_25.setTransform(140.825,32.275);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgbAjQgMgMABgVIAAgCQAAgMAEgLQAGgKAJgHQAJgFALAAQASAAALALQAJAMABAWIAAAHIg7AAQACAKAGAHQAHAHAJgBQANAAAJgLIALAKQgFAJgJAFQgKADgKAAQgTABgMgMgAgLgYQgFAHgCAJIAlAAIAAgBQAAgKgFgFQgEgGgJABQgIAAgEAFg");
	this.shape_26.setTransform(131.65,32.35);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AArAuIAAg6QAAgIgDgEQgEgEgJAAQgGAAgFAEQgFADgBAGIAAA9IgTAAIAAg6QAAgQgRAAQgLAAgFAKIAABAIgVAAIAAhZIATAAIABAJQAKgLAQAAQARAAAGAOQAKgOASAAQAPAAAHAIQAIAJgBAQIAAA6g");
	this.shape_27.setTransform(119.6,32.275);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgdAnQgJgIAAgLQAAgOALgHQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgFADABAFIgUAAQAAgHAEgHQAFgGAJgEQAIgEAKABQAPgBAJAJQAKAHAAAOIAAAoQAAAMAEAIIAAABIgVAAIgDgJQgJALgNgBQgOAAgIgHgAgMAHQgFAEAAAHQAAAGADADQAEAEAHgBQAFAAAFgDQAGgCACgFIAAgRIgLAAQgKAAgGAEg");
	this.shape_28.setTransform(93.25,32.35);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDADgFABQgEgBgDgDg");
	this.shape_29.setTransform(86.475,30.65);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgcA0QgKgMAAgWQAAgVAJgMQAKgMAQAAQAOgBAIALIAAguIAUAAIAAB+IgSAAIgBgJQgJALgOgBQgQAAgJgMgAgNgDQgFAGAAAQQAAAOAFAHQAGAIAIAAQANAAAFgLIAAglQgFgLgNAAQgIAAgGAIg");
	this.shape_30.setTransform(79.275,30.55);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgdAiQgMgMAAgWIAAAAQAAgNAGgLQAFgKAJgGQAKgFALAAQASAAAMALQALAMABAUIAAADQAAAOgFAKQgFAKgKAGQgJAFgNAAQgSAAgLgMgAgPgWQgGAIAAAPQAAAOAGAIQAGAIAJgBQAKAAAGgIQAGgHAAgPQAAgNgGgJQgGgHgKAAQgJAAgGAHg");
	this.shape_31.setTransform(69.825,32.35);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgmA/IAAh8IASAAIABAKQAJgLAOAAQARAAAJANQAJAMAAAVIAAACQAAATgJANQgKAMgQAAQgNAAgJgJIAAAqgAgSgjIAAAnQAFAKANAAQAIAAAGgIQAFgHAAgPQAAgNgFgJQgGgIgJAAQgMAAgFALg");
	this.shape_32.setTransform(60.425,34);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgdAnQgJgIAAgLQAAgOALgHQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEAEQgFADABAFIgVAAQABgHAFgHQAEgGAIgEQAJgEAKABQAPgBAJAJQAKAHAAAOIAAAoQAAAMAEAIIAAABIgVAAIgDgJQgJALgNgBQgOAAgIgHgAgMAHQgFAEgBAHQABAGAEADQADAEAHgBQAFAAAFgDQAFgCADgFIAAgRIgLAAQgKAAgGAEg");
	this.shape_33.setTransform(50.85,32.35);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgWAuIAAhZIATAAIAAAKQAGgMANAAIAHABIAAATIgIAAQgOAAgEAKIAAA9g");
	this.shape_34.setTransform(43.65,32.275);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgdAnQgJgIAAgLQAAgOALgHQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFAEQgFADABAFIgUAAQAAgHAEgHQAFgGAJgEQAIgEAKABQAPgBAJAJQAKAHAAAOIAAAoQAAAMAEAIIAAABIgVAAIgDgJQgJALgNgBQgOAAgIgHgAgMAHQgFAEAAAHQAAAGAEADQADAEAHgBQAFAAAFgDQAGgCACgFIAAgRIgLAAQgKAAgGAEg");
	this.shape_35.setTransform(35.65,32.35);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgsA8IAAh4IAtAAQAVAAALALQAMAKAAASQAAASgMAJQgLAKgVgBIgYAAIAAAtgAgXAAIAYAAQALgBAGgFQAGgFAAgKQAAgKgGgFQgGgHgKABIgZAAg");
	this.shape_36.setTransform(26,30.8);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.165,0,0,1.218,-145,-53)).s().p("A2qISIAAwjMAtVAAAIAAQjg");
	this.shape_37.setTransform(121.7,48.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop8G3, new cjs.Rectangle(-23.4,-4.6,290.2,106), null);


(lib.drop8G2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AAuAxIAAg9QAAgKgEgDQgEgFgJAAQgHAAgFAEQgFAEgBAHIAABAIgVAAIAAg+QAAgRgRAAQgNAAgFAKIAABFIgVAAIAAhfIAUAAIAAAKQAKgLASgBQASAAAHAPQAKgPATAAQAQAAAIAJQAHAJAAARIAAA+g");
	this.shape.setTransform(141.975,58.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg9IAVAAIAAA9QAAASAPAAQAPAAAFgLIAAhEIAVAAIAABfIgUAAIAAgKQgKALgQAAQgPAAgIgJg");
	this.shape_1.setTransform(129.125,58.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgKBCIAAhfIAVAAIAABfgAgIgtQgDgDAAgFQAAgFADgDQADgEAFAAQAGAAADAEQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_2.setTransform(121.85,56.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AAuAxIAAg9QAAgKgEgDQgEgFgJAAQgHAAgFAEQgFAEgBAHIAABAIgVAAIAAg+QAAgRgRAAQgNAAgFAKIAABFIgVAAIAAhfIAUAAIAAAKQAKgLASgBQASAAAHAPQAKgPATAAQAQAAAIAJQAHAJAAARIAAA+g");
	this.shape_3.setTransform(111.725,58.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgfAkQgMgNAAgXIAAAAQAAgOAFgLQAGgMAKgFQAKgHAMAAQATAAAMANQAMAMABAVIAAAEQAAAOgFALQgGALgKAGQgKAGgNAAQgTAAgMgNgAgQgXQgGAJAAAPQAAAOAGAJQAGAIAKAAQALAAAGgIQAGgJAAgPQAAgOgGgJQgHgIgKAAQgKAAgGAIg");
	this.shape_4.setTransform(98.825,58.15);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgKAhIAAg1IgQAAIAAgQIAQAAIAAgXIAUAAIAAAXIARAAIAAAQIgRAAIAAA0QAAAFACACQACADAGAAIAHgBIAAAQQgHADgHAAQgXAAAAgbg");
	this.shape_5.setTransform(90.475,57.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgTAtQgJgEgFgIQgFgHgBgIIAWAAQAAAHAFAEQAGAFAHgBQAIABAFgEQAEgDAAgGQAAgFgFgDQgEgDgKgDQgLgBgHgEQgQgHAAgPQAAgMAKgIQALgJAPAAQARAAAKAJQALAIgBAOIgVAAQAAgGgFgEQgEgEgHAAQgHAAgEADQgEADgBAFQAAAFAEADQAFADALADQANACAHAEQAIADADAFQADAGAAAIQABANgLAHQgLAJgRgBQgLAAgJgEg");
	this.shape_6.setTransform(83,58.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgJBCIAAhfIATAAIAABfgAgIgtQgDgDAAgFQAAgFADgDQADgEAFAAQAGAAADAEQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_7.setTransform(76.1,56.35);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgYAxIAAhfIAUAAIABALQAHgNAOAAQAEABADABIAAAUIgJgBQgPAAgDAMIAABAg");
	this.shape_8.setTransform(71.05,58.05);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgcAlQgNgOAAgUIAAgDQAAgNAGgLQAFgMAKgGQAKgGALgBQAUAAAKANQALAMAAAXIAAAHIg9AAQABANAGAGQAHAHAKAAQAOAAAKgLIALAKQgFAJgKAFQgKAEgLAAQgUABgMgNgAgMgZQgGAGgBALIAoAAIAAgCQgBgKgFgFQgFgGgJAAQgIAAgFAGg");
	this.shape_9.setTransform(62.725,58.15);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgoBDIAAiDIATAAIABAKQAKgMAPAAQARAAAKANQAKANAAAXIAAACQAAAVgKANQgKANgRAAQgPAAgJgKIAAAtgAgTglIAAApQAFALANAAQAKAAAGgIQAFgHABgRQAAgOgGgJQgGgIgKAAQgNAAgFALg");
	this.shape_10.setTransform(52.9,59.875);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AASAxIAAg9QAAgJgEgEQgEgFgJAAQgMAAgGAMIAABDIgVAAIAAhfIAUAAIAAAMQALgNAQgBQAeAAABAjIAAA+g");
	this.shape_11.setTransform(38.15,58.05);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgPALgIQAMgHAUgBIANAAIAAgGQAAgHgEgFQgEgEgIAAQgHAAgFADQgEAEAAAGIgWAAQAAgIAFgHQAGgGAJgEQAIgFAKAAQARAAAKAJQAKAIAAAQIAAApQAAAOAEAHIAAACIgWAAQgBgDgBgGQgLALgNgBQgPAAgJgIgAgNAHQgFAEAAAIQAAAGAEAEQAEADAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_12.setTransform(28.275,58.15);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgeA3QgLgNAAgYQAAgVAKgNQALgOARAAQAOAAAJALIAAgwIAWAAIAACGIgUAAIgBgKQgJAMgPgBQgRAAgKgNgAgOgEQgFAIAAAQQAAAOAFAJQAGAIAJAAQANAAAGgMIAAgoQgGgLgNAAQgJAAgGAIg");
	this.shape_13.setTransform(18.125,56.25);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AAuAwIAAg8QAAgKgEgEQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAJQAKgLASAAQASAAAHAOQAKgOATAAQAQAAAIAJQAHAIAAARIAAA9g");
	this.shape_14.setTransform(226.825,32.45);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgMIAAhCIAVAAIAABdIgUAAIAAgJQgKAMgQAAQgPAAgIgKg");
	this.shape_15.setTransform(213.975,32.65);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgKBBIAAhdIAUAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_16.setTransform(206.7,30.75);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AAuAwIAAg8QAAgKgEgEQgEgEgJAAQgHAAgFAEQgFAEgBAGIAABAIgVAAIAAg9QAAgRgRAAQgNAAgFALIAABDIgVAAIAAhdIAUAAIAAAJQAKgLASAAQASAAAHAOQAKgOATAAQAQAAAIAJQAHAIAAARIAAA9g");
	this.shape_17.setTransform(196.575,32.45);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgfAkQgMgOAAgWIAAAAQAAgOAFgLQAGgLAKgHQAKgFAMAAQATAAAMAMQAMAMABAVIAAAEQAAAOgFALQgGALgKAGQgKAHgNAAQgTAAgMgOgAgQgXQgGAJAAAPQAAAPAGAIQAGAIAKAAQALAAAGgIQAGgIAAgQQAAgPgGgIQgHgIgKAAQgKAAgGAIg");
	this.shape_18.setTransform(183.675,32.55);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAGACACQACACAGAAIAHgBIAAARQgHACgHAAQgXAAAAgcg");
	this.shape_19.setTransform(175.325,31.5);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgTAtQgJgEgFgHQgGgIAAgJIAVAAQABAIAFAEQAFAEAIABQAIgBAFgDQAEgDAAgFQAAgGgFgDQgEgDgKgDQgLgCgHgDQgQgHAAgOQAAgNAKgIQAKgJAQABQAQgBALAJQALAJAAANIgWAAQAAgGgEgEQgFgFgHAAQgHAAgEAEQgFADABAGQAAAEADADQAFADALADQANADAHADQAHADAEAFQADAGABAHQgBANgKAJQgLAHgRABQgLAAgJgFg");
	this.shape_20.setTransform(167.85,32.55);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgfAkQgMgOAAgWIAAAAQAAgOAFgLQAGgLAKgHQAKgFAMAAQATAAAMAMQAMAMABAVIAAAEQAAAOgFALQgGALgKAGQgKAHgNAAQgTAAgMgOgAgQgXQgGAJAAAPQAAAPAGAIQAGAIAKAAQALAAAGgIQAGgIAAgQQAAgPgGgIQgHgIgKAAQgKAAgGAIg");
	this.shape_21.setTransform(158.175,32.55);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgYAwIAAhdIAUAAIABAKQAGgMAOAAQAFAAADABIgBAUIgIgBQgPAAgEALIAABAg");
	this.shape_22.setTransform(150.3,32.45);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgpBDIAAiDIAUAAIABAKQAJgMAQAAQARAAAKANQAKANAAAXIAAACQgBAVgJANQgLANgQAAQgPAAgJgKIAAAtgAgTglIAAApQAGALANAAQAJAAAGgIQAFgHAAgRQABgOgGgJQgGgIgJAAQgNAAgGALg");
	this.shape_23.setTransform(141.8,34.275);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AASBDIAAg9QAAgJgFgEQgDgEgJAAQgLAAgHALIAABDIgWAAIAAiGIAWAAIAAAzQAKgMAQAAQAeAAAAAiIAAA9g");
	this.shape_24.setTransform(120.8,30.55);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgMIAAhCIAVAAIAABdIgUAAIAAgJQgKAMgQAAQgPAAgIgKg");
	this.shape_25.setTransform(110.775,32.65);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgUA4IgCAKIgTAAIAAiGIAWAAIAAAyQAJgLAOAAQASAAAKAMQAKANAAAWIAAACQAAAWgKANQgKAOgRAAQgQAAgJgNgAgTAAIAAAmQAFANAOAAQAJAAAGgHQAFgIAAgPIAAgDQAAgQgFgGQgGgIgJAAQgOAAgFAMg");
	this.shape_26.setTransform(100.925,30.65);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgeAnQgIgJAAgRIAAg8IAVAAIAAA8QAAASAPAAQAPAAAFgMIAAhCIAVAAIAABdIgUAAIAAgJQgKAMgQAAQgPAAgIgKg");
	this.shape_27.setTransform(90.625,32.65);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgKAgIAAg1IgQAAIAAgPIAQAAIAAgXIAUAAIAAAXIARAAIAAAPIgRAAIAAA1QAAAGACACQACACAGAAIAHgBIAAARQgHACgHAAQgXAAAAgcg");
	this.shape_28.setTransform(82.425,31.5);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AASAwIAAg8QAAgJgEgFQgEgEgJAAQgMAAgGAMIAABCIgWAAIAAhdIAVAAIAAAKQALgMAQAAQAeAAABAhIAAA+g");
	this.shape_29.setTransform(63.9,32.45);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgFQgEgEgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAAqQAAANAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_30.setTransform(54.025,32.55);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgJBBIAAhdIATAAIAABdgAgIgtQgDgEAAgFQAAgEADgEQADgCAFAAQAGAAADACQADAEAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_31.setTransform(46.85,30.75);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgVA/QgKgFgEgHIAKgMQAJALAPAAQAKAAAFgFQAHgGAAgLIAAgHQgKALgOAAQgRAAgKgOQgLgNAAgXQAAgWAKgNQALgNARAAQAPAAAKALIABgJIATAAIAABbQAAATgMAKQgLALgTAAQgLAAgKgEgAgOgoQgFAIgBAQQABAPAFAHQAGAIAKAAQAMAAAHgLIAAgpQgHgLgMAAQgKAAgGAJg");
	this.shape_32.setTransform(39.25,34.325);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgfApQgJgIAAgMQAAgQALgGQAMgJAUABIANAAIAAgHQAAgHgEgFQgEgEgIAAQgHAAgFAEQgEADAAAGIgWAAQAAgIAFgHQAGgHAJgEQAIgDAKAAQARgBAKAJQAKAJAAAOIAAAqQAAANAEAIIAAABIgWAAQgBgCgBgHQgLAMgNAAQgPAAgJgJgAgNAHQgFAEAAAHQAAAHAEADQAEAEAHAAQAFAAAGgDQAFgDADgFIAAgSIgMAAQgLAAgGAEg");
	this.shape_33.setTransform(29.475,32.55);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgtBAIAAh/IAsAAQAVAAALAJQAMAIAAASQAAAIgFAHQgFAHgJAFQAKABAGAIQAGAIAAALQAAARgMALQgMAJgVAAgAgXAuIAYAAQALAAAGgFQAFgFAAgJQAAgVgUABIgaAAgAgXgJIAWAAQAKAAAGgFQAFgEAAgJQAAgJgFgFQgFgEgLAAIgWAAg");
	this.shape_34.setTransform(19.125,30.9);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.165,0,0,1.218,-145,-53)).s().p("A2qISIAAwjMAtVAAAIAAQjg");
	this.shape_35.setTransform(125,48.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drop8G2, new cjs.Rectangle(-20.1,-4.6,290.20000000000005,106), null);


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
	this.shape_1.graphics.f("#FFFFFF").s().p("AgLAjQgFgDgDgDIAFgIQAGAHAIAAQAFAAADgDQADgDAAgGIAAgEQgFAFgHABQgJAAgGgIQgGgHAAgMQAAgMAGgIQAFgIAKABQAIgBAFAHIABgFIAKAAIAAAyQAAALgGAFQgHAHgKgBQgFAAgGgCgAgHgWQgDAEAAAKQAAAHADAEQADAFAFAAQAHAAADgHIAAgWQgDgFgHAAQgFgBgDAFg");
	this.shape_1.setTransform(110.875,35.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgBQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_2.setTransform(105.375,34.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_3.setTransform(101.325,33.4);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAIAAIAEABIAAALIgFgBQgIAAgCAHIAAAjg");
	this.shape_4.setTransform(98.55,34.35);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgRAUQgGgHAAgNIAAAAQAAgHACgHQADgFAGgEQAGgEAGABQAKAAAIAGQAGAIAAALIAAACQAAAHgDAGQgCAHgGADQgFADgIABQgKAAgHgIgAgIgMQgEAEAAAJQAAAIAEAEQADAFAFAAQAGAAAEgFQACgFAAgIQAAgIgDgEQgDgFgGAAQgFAAgDAFg");
	this.shape_5.setTransform(93.7,34.4);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgGASIAAgdIgIAAIAAgJIAIAAIAAgMIAMAAIAAAMIAJAAIAAAJIgJAAIAAAdIABAEIAEABIAEAAIAAAJIgHABQgNAAgBgPg");
	this.shape_6.setTransform(89.05,33.825);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_7.setTransform(86.225,33.4);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgGgCgBQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_8.setTransform(82.175,34.35);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgRAUQgHgHAAgNIAAAAQAAgHAEgHQADgFAFgEQAGgEAGABQAKAAAHAGQAHAIABALIAAACQAAAHgEAGQgDAHgFADQgFADgIABQgKAAgHgIgAgJgMQgDAEAAAJQAAAIADAEQAEAFAFAAQAGAAADgFQADgFAAgIQAAgIgDgEQgDgFgGAAQgFAAgEAFg");
	this.shape_9.setTransform(76.55,34.4);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAaAbIAAgiQAAgEgCgCQgDgDgFAAQgEAAgDACQgCACgBAEIAAAjIgLAAIAAgiQAAgJgKAAQgHAAgDAGIAAAlIgLAAIAAg0IAKAAIABAGQAFgHALAAQAJAAAEAIQAFgIALAAQAJAAAEAFQAFAFgBAJIAAAig");
	this.shape_10.setTransform(69.35,34.35);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgRAUQgHgHAAgNIAAAAQAAgHAEgHQADgFAFgEQAGgEAGABQAKAAAIAGQAGAIABALIAAACQAAAHgEAGQgDAHgFADQgFADgIABQgKAAgHgIgAgIgMQgEAEAAAJQAAAIAEAEQADAFAFAAQAGAAADgFQADgFAAgIQAAgIgDgEQgDgFgGAAQgFAAgDAFg");
	this.shape_11.setTransform(62.15,34.4);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgYQAAgBgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQACgCACAAQADAAACACQABAAAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBABQgCABgDAAQgCAAgCgBg");
	this.shape_12.setTransform(58.025,33.4);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgLAgIAAAFIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAHQAFAIAAALIAAABQAAANgFAGQgGAIgJAAQgJAAgFgGgAgKAAIAAAVQADAIAHgBQAFABADgFQADgEAAgJIAAgBQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_13.setTransform(54.025,33.35);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_14.setTransform(150.475,17.4);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAXQAAAGACAFIAAABIgNAAIgBgGQgGAHgHgBQgIAAgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_15.setTransform(146.525,18.4);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgLAjQgFgCgDgFIAFgHQAGAHAIAAQAFAAADgDQADgEAAgFIAAgEQgFAFgHAAQgJAAgGgHQgGgIAAgLQAAgMAGgIQAFgHAKAAQAIAAAFAGIABgFIAKAAIAAAyQAAAKgGAHQgHAFgKAAQgFABgGgDgAgHgWQgDAEAAAJQAAAJADADQADAFAFAAQAHAAADgHIAAgVQgDgHgHAAQgFABgDAEg");
	this.shape_16.setTransform(140.875,19.4);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAXQAAAGACAFIAAABIgNAAIgBgGQgGAHgHgBQgIAAgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_17.setTransform(135.475,18.4);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgLAgIAAAFIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAHQAFAHAAAMIAAABQAAAMgFAIQgGAHgJAAQgJAAgFgGgAgKAAIAAAWQADAGAHAAQAFABADgFQADgEAAgIIAAgCQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_18.setTransform(130.025,17.35);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgDAGAAQALgBAFAIQAGAGAAANIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHAAQgKABgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_19.setTransform(124.475,18.4);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgEQgDgEAAgFIALAAQABAEADADQADABADABQAGgBACgBQACgCAAgDQAAgDgDgBQgCgCgFgCIgKgDQgJgDAAgIQAAgHAGgFQAGgEAHAAQAKAAAFAEQAHAFAAAIIgNAAQAAgEgCgCQgDgDgEABQgDAAgCABQgDACAAADQAAADADABQACACAGABIALAEQAEACACACQACAEAAADQAAAIgGAEQgGAEgKAAQgFAAgFgCg");
	this.shape_20.setTransform(119.15,18.4);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_21.setTransform(111.325,18.35);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAXQAAAGACAFIAAABIgNAAIgBgGQgGAHgHgBQgIAAgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_22.setTransform(105.875,18.4);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AALAbIgLgkIgKAkIgKAAIgPg0IAMAAIAIAjIALgjIAIAAIAMAjIAIgjIAMAAIgPA0g");
	this.shape_23.setTransform(99.4,18.4);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgDAGAAQALgBAFAIQAGAGAAANIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHAAQgKABgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_24.setTransform(93.075,18.4);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AAKAmIAAgjQAAgEgCgDQgDgCgEAAQgGABgEAFIAAAmIgMAAIAAhKIAMAAIAAAcQAGgIAIABQARgBAAATIAAAjg");
	this.shape_25.setTransform(87.575,17.3);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAHAAIAFABIAAALIgFAAQgIgBgCAHIAAAjg");
	this.shape_26.setTransform(80.8,18.35);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAXQAAAGACAFIAAABIgNAAIgBgGQgGAHgHgBQgIAAgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_27.setTransform(76.125,18.4);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgKAZQgFgCgDgEQgDgEAAgFIAMAAQAAAEADADQADABADABQAFgBADgBQACgCAAgDQAAgDgDgBQgCgCgFgCIgKgDQgJgDAAgIQAAgHAGgFQAGgEAHAAQAKAAAGAEQAFAFABAIIgNAAQABgEgDgCQgCgDgFABQgDAAgCABQgCACgBADQABADACABQACACAGABIALAEQAEACACACQACAEAAADQAAAIgGAEQgGAEgKAAQgFAAgFgCg");
	this.shape_28.setTransform(70.8,18.4);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgDAGAAQALgBAFAIQAGAGAAANIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHAAQgKABgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_29.setTransform(65.625,18.4);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgLAgIAAAFIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAHQAFAHAAAMIAAABQAAAMgFAIQgGAHgJAAQgJAAgFgGgAgKAAIAAAWQADAGAHAAQAFABADgFQADgEAAgIIAAgCQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_30.setTransform(60.175,17.35);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AAKAbIAAghQAAgFgCgCQgCgDgFAAQgGAAgEAGIAAAlIgMAAIAAg0IALAAIABAGQAGgHAIAAQARAAAAATIAAAig");
	this.shape_31.setTransform(51.975,18.35);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAXQAAAGACAFIAAABIgNAAIgBgGQgGAHgHgBQgIAAgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_32.setTransform(46.525,18.4);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgFAlIAAg0IALAAIAAA0gAgEgZQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAgBQACgBACAAQADAAACABQABABAAAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_33.setTransform(42.525,17.4);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgLAjQgFgCgDgFIAFgHQAGAHAIAAQAFAAADgDQADgEAAgFIAAgEQgFAFgHAAQgJAAgGgHQgGgIAAgLQAAgMAGgIQAFgHAKAAQAIAAAFAGIABgFIAKAAIAAAyQAAAKgGAHQgHAFgKAAQgFABgGgDgAgHgWQgDAEAAAJQAAAJADADQADAFAFAAQAHAAADgHIAAgVQgDgHgHAAQgFABgDAEg");
	this.shape_34.setTransform(38.325,19.4);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgRAXQgFgEAAgIQAAgHAGgEQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEABQgEgBgCADQgDACAAADIgMAAQAAgEADgEQADgEAFgCQAFgDAFABQAJAAAGAEQAFAFABAJIAAAXQAAAGACAFIAAABIgNAAIgBgGQgGAHgHgBQgIAAgFgEgAgHAEQgDADAAADQAAAEACACQADACADAAQADAAADgCQADgCACgDIAAgKIgHAAQgFABgEACg");
	this.shape_35.setTransform(32.925,18.4);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgLAgIAAAFIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAHQAFAHAAAMIAAABQAAAMgFAIQgGAHgJAAQgJAAgFgGgAgKAAIAAAWQADAGAHAAQAFABADgFQADgEAAgIIAAgCQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_36.setTransform(27.475,17.35);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgPAUQgHgGAAgNIAAgBQAAgHADgGQADgHAFgDQAGgDAGAAQALgBAFAIQAGAGAAANIAAAEIghAAQAAAGAEAEQAEAEAFAAQAIAAAFgHIAGAHQgDAEgFADQgFACgHAAQgKABgHgIgAgGgOQgDAEgBAGIAWAAIAAgBQgBgFgDgEQgCgDgFAAQgEAAgDADg");
	this.shape_37.setTransform(21.925,18.4);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgLAiQgHgDgEgFQgDgGAAgGIAMAAQAAAGAEAEQAEADAGAAQAHgBADgCQAEgCAAgFQAAgEgEgDQgDgDgIgCIgOgFQgJgGAAgKQAAgJAHgFQAHgFAKAAQAIgBAFADQAGADAEAFQADAFAAAGIgMAAQAAgFgEgEQgEgDgGAAQgFABgDACQgEACAAAFQAAAEAEADQAEACAGACQAJADAFACQAFADADAFQACAEAAAFQgBAJgGAFQgHAGgMgBQgGABgGgDg");
	this.shape_38.setTransform(16.15,17.5);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_39.setTransform(82.475,25.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_3
	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("rgba(0,0,0,0.227)").s().p("AtJEAIAAn/IaTAAIAAH/g");
	this.shape_40.setTransform(75.2,36.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_40).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9,-2.4,175.8,64.9);


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
	this.shape_1.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQABgFgDgDQgDgDgFAAQgEAAgEACQgCADAAAEIgPAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_1.setTransform(155.3,25.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgbAtIAAhYIANAAIABAHQAGgHAKAAQALAAAHAIQAHAJAAAPIAAABQAAAOgHAIQgHAJgLAAQgJAAgHgHIAAAfgAgNgZIAAAbQAEAIAJAAQAGAAAEgGQADgEAAgMQAAgJgDgFQgEgGgGAAQgJAAgEAHg");
	this.shape_2.setTransform(148.825,26.85);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_3.setTransform(141.975,25.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgQAgIAAg+IAOAAIAAAHQAFgIAIAAIAGABIAAANIgHgBQgJAAgCAIIAAAqg");
	this.shape_4.setTransform(136.85,25.625);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_5.setTransform(131.275,25.675);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgNAmIgBAHIgNAAIAAhZIAOAAIAAAgQAGgHAKAAQALAAAHAIQAHAJAAAOIAAABQAAAPgHAJQgHAJgLAAQgKgBgGgHgAgNAAIAAAaQAEAIAJAAQAGAAAEgFQADgFAAgKIAAgCQAAgKgDgFQgEgEgGAAQgJAAgEAHg");
	this.shape_6.setTransform(124.775,24.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_7.setTransform(116.75,24.475);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_8.setTransform(111.875,25.625);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_9.setTransform(107.05,24.475);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_10.setTransform(99.175,25.625);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQADgCADgDIAAgMIgIAAQgHAAgEADg");
	this.shape_11.setTransform(92.6,25.675);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AANAgIgNgrIgNArIgLAAIgSg/IAPAAIAKArIAMgrIAKAAIAOArIAJgrIAPAAIgSA/g");
	this.shape_12.setTransform(84.9,25.675);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_13.setTransform(77.275,25.675);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgFgDgDQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAiQAHgJAKABQAUAAAAAVIAAAqg");
	this.shape_14.setTransform(70.675,24.35);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgbAtIAAhYIANAAIABAHQAGgHAKAAQALAAAHAIQAHAJAAAPIAAABQAAAOgHAIQgHAJgLAAQgJAAgHgHIAAAfgAgNgZIAAAbQAEAIAJAAQAGAAAEgGQADgEAAgMQAAgJgDgFQgEgGgGAAQgJAAgEAHg");
	this.shape_15.setTransform(61.125,26.85);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_16.setTransform(54.275,25.725);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgUAlQgHgKAAgPQAAgNAHgJQAHgJALAAQAJAAAHAHIAAggIAOAAIAABZIgNAAIgBgHQgGAIgKAAQgLgBgHgIgAgJgCQgDAEAAALQAAAKADAGQAEAFAGAAQAJAAAEgHIAAgbQgEgIgJABQgGgBgEAGg");
	this.shape_17.setTransform(47.425,24.4);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_18.setTransform(42.7,24.475);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgFgDgDQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAiQAHgJAKABQAUAAAAAVIAAAqg");
	this.shape_19.setTransform(37.825,24.35);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgPAgIAAg+IANAAIAAAHQAEgIAKAAIAEABIAAANIgFgBQgKAAgDAIIAAAqg");
	this.shape_20.setTransform(29.7,25.625);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_21.setTransform(23.975,25.725);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgFAAgCACQgDADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQAEAAADgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_22.setTransform(17.4,25.675);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgfArIAAhVIAaAAQAJAAAJAFQAJAGAFAJQAFAJAAAMIAAADQAAAMgFAKQgFAJgJAFQgIAFgLAAgAgQAfIAKAAQAKAAAHgHQAGgIAAgNIAAgEQAAgOgGgHQgGgIgKAAIgLAAg");
	this.shape_23.setTransform(10.35,24.575);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_24.setTransform(82.475,24.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_3
	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("rgba(0,0,0,0.227)").s().p("AtJEAIAAn/IaTAAIAAH/g");
	this.shape_25.setTransform(75.2,35.35);

	this.timeline.addTween(cjs.Tween.get(this.shape_25).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9,-3.1,177.6,64.1);


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
	this.shape_1.graphics.f("#FFFFFF").s().p("AgQAgIAAg+IAOAAIAAAHQAFgIAJAAIAEABIAAANIgGgBQgJAAgCAIIAAAqg");
	this.shape_1.setTransform(128.05,34.825);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_2.setTransform(124.15,33.675);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_3.setTransform(119.35,34.875);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_4.setTransform(111.6,33.675);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgUAlQgHgKAAgPQAAgNAHgJQAHgJALAAQAJAAAHAHIAAggIAOAAIAABZIgNAAIgBgHQgGAHgKABQgLAAgHgJgAgJgCQgDAFAAAKQAAAKADAGQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_5.setTransform(106.525,33.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgbAtIAAhYIANAAIABAHQAGgHAKgBQALAAAHAJQAHAIAAAQIAAABQAAAOgHAIQgHAJgLAAQgJAAgHgGIAAAegAgNgZIAAAbQAEAIAJAAQAGAAAEgFQADgFAAgLQAAgKgDgGQgEgFgGAAQgJAAgEAHg");
	this.shape_6.setTransform(97.075,36.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_7.setTransform(90.225,34.925);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgUAlQgHgKAAgPQAAgNAHgJQAHgJALAAQAJAAAHAHIAAggIAOAAIAABZIgNAAIgBgHQgGAHgKABQgLAAgHgJgAgJgCQgDAFAAAKQAAAKADAGQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_8.setTransform(83.375,33.6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_9.setTransform(78.65,33.675);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgGgDgCQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAhQAHgIAKAAQAUAAAAAXIAAApg");
	this.shape_10.setTransform(73.775,33.55);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgFAAgCACQgDADAAAEIgPAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQADgCACgDIAAgMIgHAAQgHAAgEADg");
	this.shape_11.setTransform(64.2,34.875);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgGIAQgTIARAAIgXAaIAaAlg");
	this.shape_12.setTransform(58.275,33.55);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_13.setTransform(53.25,33.675);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgHAWIAAgjIgKAAIAAgLIAKAAIAAgPIAOAAIAAAPIALAAIAAALIgLAAIAAAiQgBAEACACQACACADgBIAFAAIAAALIgJABQgQAAAAgSg");
	this.shape_14.setTransform(49.55,34.15);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_15.setTransform(44.525,34.875);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgGIAQgTIARAAIgXAaIAaAlg");
	this.shape_16.setTransform(38.575,33.55);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgNAqQgHgDgDgFIAGgIQAHAHAJAAQAHAAAEgDQAEgEAAgIIAAgEQgGAHgKAAQgLAAgHgJQgHgJAAgOQAAgPAHgJQAHgJALAAQAKAAAGAIIABgHIANAAIAAA9QAAAMgIAIQgIAHgMAAQgHAAgGgDgAgJgbQgEAGAAALQAAAJAEAFQAEAFAGAAQAJAAAEgHIAAgbQgEgHgJAAQgGAAgEAFg");
	this.shape_17.setTransform(145.925,17.675);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_18.setTransform(139.325,16.425);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgDACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_19.setTransform(132.75,16.475);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_20.setTransform(126.375,16.475);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_21.setTransform(119.975,16.425);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQAEAAACACQACADAAADQAAADgCACQgCACgEAAQgDAAgCgCg");
	this.shape_22.setTransform(115.15,15.275);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_23.setTransform(109.1,15.275);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgGAWIAAgjIgLAAIAAgKIALAAIAAgQIAMAAIAAAQIAMAAIAAAKIgMAAIAAAjQAAADACACQABACAEAAIAFgBIAAALIgJABQgPAAAAgSg");
	this.shape_24.setTransform(105.4,15.75);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgQAgIAAg+IAOAAIAAAHQAFgIAIAAIAGABIAAANIgHgBQgJAAgCAIIAAAqg");
	this.shape_25.setTransform(101.75,16.425);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_26.setTransform(96.175,16.475);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgbAtIAAhXIANAAIABAGQAGgIAKABQALgBAHAJQAHAJAAAPIAAABQAAANgHAJQgHAJgLAAQgJAAgHgHIAAAfgAgNgYIAAAbQAEAHAJAAQAGAAAEgGQADgEAAgMQAAgJgDgFQgEgGgGAAQgJAAgEAIg");
	this.shape_27.setTransform(89.675,17.65);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_28.setTransform(82.975,16.475);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgMAeQgHgDgDgFQgDgFAAgFIANAAQABAFADADQAEACAFAAQAFAAADgCQADgCAAgDQAAgEgDgCQgDgCgGgCQgIgBgFgDQgKgEAAgKQAAgIAHgFQAHgGAJAAQAMAAAHAGQAHAFAAAJIgPAAQAAgEgDgCQgDgDgFAAQgDAAgDACQgDACAAAEQAAADACACQADACAIACQAIABAFADQAEACADADQACAEAAAFQAAAIgHAGQgHAFgMAAQgGAAgGgDg");
	this.shape_29.setTransform(76.575,16.475);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_30.setTransform(67.175,16.525);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgHAWIAAgjIgKAAIAAgKIAKAAIAAgQIAOAAIAAAQIALAAIAAAKIgLAAIAAAjQgBADACACQACACADAAIAFgBIAAALIgJABQgQAAAAgSg");
	this.shape_31.setTransform(61.7,15.75);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_32.setTransform(56.525,16.425);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgDACQgEADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAHAAQAKAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_33.setTransform(49.95,16.475);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgNAmIgBAGIgNAAIAAhZIAOAAIAAAhQAGgHAKAAQALAAAHAIQAHAJAAAPIAAABQAAAOgHAJQgHAJgLgBQgKAAgGgHgAgNAAIAAAaQAEAIAJAAQAGAAAEgFQADgFAAgKIAAgCQAAgKgDgFQgEgEgGgBQgJABgEAHg");
	this.shape_34.setTransform(43.475,15.2);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgHAWIAAgjIgKAAIAAgKIAKAAIAAgQIAOAAIAAAQIALAAIAAAKIgLAAIAAAjQgBADACACQACACADAAIAFgBIAAALIgJABQgQAAAAgSg");
	this.shape_35.setTransform(34.8,15.75);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgDACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_36.setTransform(29.7,16.475);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgGAtIAAhZIANAAIAABZg");
	this.shape_37.setTransform(24.925,15.15);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AAYArIgHgUIghAAIgHAUIgPAAIAghVIANAAIAgBVgAgLALIAXAAIgMgig");
	this.shape_38.setTransform(19.4,15.375);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_39.setTransform(82.475,24.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_3
	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("rgba(0,0,0,0.227)").s().p("AtJEAIAAn/IaTAAIAAH/g");
	this.shape_40.setTransform(75.2,35.35);

	this.timeline.addTween(cjs.Tween.get(this.shape_40).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9,-3.1,177.6,64.1);


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
	this.shape_1.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQAAgFgDgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQADgCADgDIAAgMIgIAAQgHAAgEADg");
	this.shape_1.setTransform(139.85,39.475);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgGAtIAAhZIANAAIAABZg");
	this.shape_2.setTransform(135.075,38.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAGAFABALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCABgDIAAgMIgHAAQgHAAgEADg");
	this.shape_3.setTransform(130.3,39.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgbAsIAAhXIANAAIABAHQAGgIAKAAQALAAAHAJQAHAIAAAQIAAABQAAAOgHAJQgHAIgLAAQgJAAgHgGIAAAdgAgNgZIAAAbQAEAIAJAAQAGAAAEgFQADgFAAgLQAAgKgDgGQgEgFgGAAQgJAAgEAHg");
	this.shape_4.setTransform(123.825,40.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_5.setTransform(117.125,39.475);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAGIAAAVIgOAAIAAhZIAOAAIAAAzIAFgFIAQgUIARAAIgXAaIAaAlg");
	this.shape_6.setTransform(111.175,38.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgFgDgDQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAhQAHgHAKgBQAUAAAAAXIAAApg");
	this.shape_7.setTransform(101.325,38.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAHAFAAALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCABgDIAAgMIgHAAQgHAAgEADg");
	this.shape_8.setTransform(94.75,39.475);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgQAgIAAg+IAOAAIAAAHQAFgIAIAAIAFABIAAANIgGgBQgJAAgCAIIAAAqg");
	this.shape_9.setTransform(89.7,39.425);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_10.setTransform(84.125,39.475);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgDADgBAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_11.setTransform(77.6,39.475);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgUAkQgHgJAAgPQAAgNAHgJQAHgJALAAQAJAAAHAHIAAggIAOAAIAABZIgNAAIgBgHQgGAHgKAAQgLABgHgKgAgJgCQgDAFAAAKQAAAKADAFQAEAGAGAAQAJAAAEgHIAAgbQgEgHgJgBQgGABgEAFg");
	this.shape_12.setTransform(70.825,38.2);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgGAsIAAg/IANAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_13.setTransform(63.1,38.275);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgUAkQgHgJAAgPQAAgNAHgJQAHgJALAAQAJAAAHAHIAAggIAOAAIAABZIgNAAIgBgHQgGAHgKAAQgLABgHgKgAgJgCQgDAFAAAKQAAAKADAFQAEAGAGAAQAJAAAEgHIAAgbQgEgHgJgBQgGABgEAFg");
	this.shape_14.setTransform(58.025,38.2);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAIAAIAAgEQAAgFgCgDQgDgDgFAAQgEAAgEACQgDADAAAEIgOAAQAAgGAEgEQADgFAGgCQAGgDAGAAQALAAAHAGQAHAFAAALIAAAbQAAAJACAFIAAABIgOAAIgCgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCABgDIAAgMIgHAAQgHAAgEADg");
	this.shape_15.setTransform(51.55,39.475);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgNA3IAAgKIAFAAQAHAAABgIIAAhFIANAAIAABFQAAAJgFAGQgFAEgIAAIgIgBgAAAgrQgCgCAAgDQAAgDACgCQACgCADAAQAEAAACACQADACAAADQAAADgDACQgCACgEAAQgDAAgCgCg");
	this.shape_16.setTransform(46.225,39.55);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_17.setTransform(41.975,39.425);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_18.setTransform(35.475,39.475);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAfAgIAAgoQAAgGgDgDQgDgDgGAAQgFAAgDADQgDADgBAEIAAAqIgNAAIAAgoQAAgMgMAAQgIAAgEAHIAAAtIgOAAIAAg+IANAAIABAGQAHgHALAAQAMAAAFAJQAGgJANAAQAKAAAGAFQAFAGAAAMIAAAog");
	this.shape_19.setTransform(26.975,39.425);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_20.setTransform(144.475,21.025);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAIgFQAHgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgDADgBAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQALAAAGAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgJAAQgJAAgGgGgAgIAFQgEACAAAGQAAAEADACQADACAEAAQAEAAADgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_21.setTransform(137.9,21.075);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AALAtIgRgbIgHAHIAAAUIgOAAIAAhZIAOAAIAAAzIAFgGIAQgSIARAAIgXAZIAaAlg");
	this.shape_22.setTransform(131.975,19.75);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_23.setTransform(125.2,21.075);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgUAlQgHgKAAgOQAAgPAHgIQAHgJALAAQAJAAAHAHIAAghIAOAAIAABZIgNAAIgBgGQgGAIgKAAQgLgBgHgIgAgJgCQgDAEAAALQAAAKADAGQAEAFAGAAQAJAAAEgIIAAgaQgEgIgJABQgGgBgEAGg");
	this.shape_24.setTransform(118.425,19.8);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_25.setTransform(112.025,21.075);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgNAmIgBAGIgNAAIAAhZIAOAAIAAAhQAGgHAKAAQALAAAHAIQAHAJAAAPIAAAAQAAAPgHAJQgHAJgLAAQgKgBgGgHgAgNAAIAAAaQAEAIAJAAQAGAAAEgFQADgFAAgKIAAgCQAAgKgDgFQgEgEgGAAQgJAAgEAHg");
	this.shape_26.setTransform(105.525,19.8);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgHAsIAAg/IAOAAIAAA/gAgFgeQgCgCAAgDQAAgDACgDQACgCADAAQADAAADACQACADAAADQAAADgCACQgDACgDAAQgDAAgCgCg");
	this.shape_27.setTransform(100.5,19.875);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgUAlQgHgKAAgOQAAgPAHgIQAHgJALAAQAJAAAHAHIAAghIAOAAIAABZIgNAAIgBgGQgGAIgKAAQgLgBgHgIgAgJgCQgDAEAAALQAAAKADAGQAEAFAGAAQAJAAAEgIIAAgaQgEgIgJABQgGgBgEAGg");
	this.shape_28.setTransform(95.425,19.8);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AAMAgIAAgoQAAgGgDgDQgCgDgGAAQgIAAgEAIIAAAsIgOAAIAAg+IANAAIABAHQAHgIAKAAQAUAAAAAWIAAApg");
	this.shape_29.setTransform(85.875,21.025);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgUAbQgGgFAAgIQAAgKAHgFQAIgFANAAIAJAAIAAgEQgBgFgCgDQgDgDgFAAQgFAAgCACQgEADAAAEIgOAAQAAgGADgEQAEgFAGgCQAGgDAHAAQAKAAAHAGQAHAFAAALIAAAbQAAAJACAFIAAABIgPAAIgBgGQgHAHgIAAQgKAAgGgGgAgIAFQgEACAAAGQAAAEADACQACACAFAAQADAAAEgCQAEgCACgDIAAgMIgIAAQgHAAgEADg");
	this.shape_30.setTransform(79.3,21.075);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AAOAgIgOgrIgMArIgMAAIgSg/IAPAAIAKArIAMgrIALAAIAMArIAKgrIAPAAIgSA/g");
	this.shape_31.setTransform(71.6,21.075);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgSAYQgJgIAAgOIAAgCQAAgJAEgHQADgHAHgFQAHgEAHAAQANAAAHAIQAHAJAAAPIAAAFIgpAAQABAHAFAFQAEAFAGAAQAKAAAGgIIAIAHQgEAGgGADQgHADgIAAQgMAAgIgJgAgIgQQgDAEgBAHIAaAAIAAgBQgBgHgDgEQgDgDgGAAQgFAAgEAEg");
	this.shape_32.setTransform(63.975,21.075);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgGgDgCQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAiQAHgJAKABQAUAAAAAVIAAAqg");
	this.shape_33.setTransform(57.375,19.75);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AAMAtIAAgpQAAgGgDgCQgDgDgFAAQgIAAgEAHIAAAtIgOAAIAAhZIAOAAIAAAiQAHgJAKABQAUAAAAAVIAAAqg");
	this.shape_34.setTransform(47.725,19.75);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_35.setTransform(41.075,21.125);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgNAmIgBAGIgNAAIAAhZIAOAAIAAAhQAGgHAKAAQALAAAHAIQAHAJAAAPIAAAAQAAAPgHAJQgHAJgLAAQgKgBgGgHgAgNAAIAAAaQAEAIAJAAQAGAAAEgFQADgFAAgKIAAgCQAAgKgDgFQgEgEgGAAQgJAAgEAHg");
	this.shape_36.setTransform(34.525,19.8);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgUAaQgFgGAAgLIAAgoIAOAAIAAAoQAAAMAKAAQAJAAAEgIIAAgsIAOAAIAAA+IgNAAIgBgGQgGAHgKAAQgLAAgFgGg");
	this.shape_37.setTransform(27.675,21.125);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgGArIAAhJIgbAAIAAgMIBDAAIAAAMIgbAAIAABJg");
	this.shape_38.setTransform(20.7,19.975);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_39.setTransform(82.475,29.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_3
	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("rgba(0,0,0,0.227)").s().p("AtJEAIAAn/IaTAAIAAH/g");
	this.shape_40.setTransform(75.2,38.45);

	this.timeline.addTween(cjs.Tween.get(this.shape_40).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9,1.5,177.6,62.599999999999994);


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
	this.shape_1.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgHQAAgKAHgEQAHgEAMAAIAIAAIAAgFQAAgEgDgCQgCgEgFAAQgEAAgDADQgDACAAADIgNAAQAAgEADgFQAEgEAFgCQAGgCAFAAQAKAAAHAFQAGAFAAAJIAAAZQAAAJACAEIAAABIgNAAIgCgGQgGAHgIAAQgJAAgFgFgAgHAEQgEADAAAFQAAADADADQACACAEAAQADAAAEgCQADgCACgDIAAgLIgHAAQgHgBgDADg");
	this.shape_1.setTransform(146.425,37);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgGAUIAAggIgJAAIAAgJIAJAAIAAgPIAMAAIAAAPIALAAIAAAJIgLAAIAAAgQAAADACABQAAABAAAAQABAAAAABQABAAAAAAQABAAABAAIAFgBIAAAKIgJABQgOAAAAgQg");
	this.shape_2.setTransform(141.5,36.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgRAWQgHgHAAgNIAAgCQgBgIAEgGQADgIAGgDQAHgEAGAAQAMAAAGAHQAHAIgBAOIAAAEIglAAQABAHAFAEQAEAFAFAAQAJAAAGgHIAGAGQgDAGgGACQgGADgGAAQgMAAgIgIgAgHgPQgDAEgBAHIAXAAIAAgBQAAgHgDgDQgDgDgFgBQgFAAgDAEg");
	this.shape_3.setTransform(136.9,37);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgLAcQgGgDgDgEQgDgFAAgFIANAAQAAAEADADQAEACADABQAGAAACgCQADgCAAgEQAAgEgDgBQgCgCgGgCQgHgBgEgCQgKgDAAgKQAAgHAGgFQAGgFAJAAQALAAAHAFQAFAFABAIIgOAAQABgEgDgCQgDgDgFAAQgDAAgDADQgCABAAAEQAAADACACIAJADQAIACAFACQAEABACADQACAEAAAFQAAAIgGAEQgHAFgLAAQgFAAgGgCg");
	this.shape_4.setTransform(131,37);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgOAdIAAg4IAMAAIABAGQADgHAJAAIAEAAIAAAMIgFAAQgJAAgCAHIAAAmg");
	this.shape_5.setTransform(126.525,36.95);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgRAWQgHgHgBgNIAAgCQABgIADgGQADgIAGgDQAGgEAHAAQALAAAHAHQAGAIABAOIAAAEIglAAQAAAHAEAEQAEAFAGAAQAJAAAGgHIAHAGQgEAGgFACQgGADgIAAQgLAAgIgIgAgHgPQgEAEAAAHIAXAAIAAgBQABgHgEgDQgDgDgGgBQgDAAgEAEg");
	this.shape_6.setTransform(121.45,37);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgMAiIAAAHIgNAAIAAhSIAOAAIAAAeQAFgGAJAAQALAAAFAHQAHAIgBAOIAAAAQABAOgHAIQgFAIgLAAQgJAAgGgIgAgLAAIAAAYQADAHAIAAQAGAAADgEQAEgFAAgJIAAgCQAAgJgEgEQgDgFgGAAQgIAAgDAHg");
	this.shape_7.setTransform(115.45,35.825);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgHQAAgKAHgEQAHgEAMAAIAIAAIAAgFQAAgEgDgCQgCgEgFAAQgEAAgDADQgDACAAADIgNAAQAAgEADgFQAEgEAFgCQAGgCAFAAQAKAAAHAFQAGAFAAAJIAAAZQAAAJACAEIAAABIgNAAIgCgGQgGAHgIAAQgJAAgFgFgAgHAEQgEADAAAFQAAADADADQACACAEAAQADAAAEgCQADgCACgDIAAgLIgHAAQgHgBgDADg");
	this.shape_8.setTransform(106.525,37);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgFAoIAAg5IALAAIAAA5gAgEgcQgBAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAgDACgCQACgCACAAQADAAACACQACACAAADQAAABAAAAQAAABAAAAQAAABgBAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_9.setTransform(102.15,35.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgSAiQgGgJgBgOQABgMAGgIQAGgIALAAQAIAAAFAGIAAgeIAOAAIAABSIgMAAIgBgGQgGAHgIAAQgKAAgHgIgAgIgCQgDAEAAAKQAAAJADAFQAEAFAFAAQAIAAADgHIAAgYQgDgHgIAAQgFAAgEAFg");
	this.shape_10.setTransform(97.5,35.825);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgTAWQgHgJAAgNIAAAAQAAgIADgHQAEgHAGgDQAGgEAHAAQAMAAAHAHQAHAIABAMIAAADQAAAIgDAHQgEAGgGAFQgGADgIAAQgLAAgIgIgAgJgOQgEAFAAAKQAAAIAEAFQADAGAGAAQAHAAADgGQAEgFAAgJQAAgJgEgFQgEgEgGgBQgFABgEAEg");
	this.shape_11.setTransform(91.425,37);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgZApIAAhQIANAAIAAAGQAGgHAJAAQALAAAFAIQAHAIgBAOIAAABQABAMgHAIQgFAIgLAAQgJAAgFgGIAAAcgAgLgXIAAAZQAEAHAHAAQAGAAADgFQAEgEAAgKQAAgJgEgFQgDgFgGAAQgIAAgDAGg");
	this.shape_12.setTransform(85.3,38.075);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgHQAAgKAHgEQAHgEAMAAIAIAAIAAgFQAAgEgDgCQgCgEgFAAQgEAAgDADQgDACAAADIgNAAQAAgEADgFQAEgEAFgCQAGgCAFAAQAKAAAHAFQAGAFAAAJIAAAZQAAAJACAEIAAABIgNAAIgCgGQgGAHgIAAQgJAAgFgFgAgHAEQgEADAAAFQAAADADADQACACAEAAQADAAAEgCQADgCACgDIAAgLIgHAAQgHgBgDADg");
	this.shape_13.setTransform(79.125,37);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgOAdIAAg4IAMAAIABAGQADgHAJAAIAEAAIAAAMIgFAAQgJAAgCAHIAAAmg");
	this.shape_14.setTransform(74.475,36.95);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgHQAAgKAHgEQAHgEAMAAIAIAAIAAgFQAAgEgDgCQgCgEgFAAQgEAAgDADQgDACAAADIgNAAQAAgEADgFQAEgEAFgCQAGgCAFAAQAKAAAHAFQAGAFAAAJIAAAZQAAAJACAEIAAABIgNAAIgCgGQgGAHgIAAQgJAAgFgFgAgHAEQgEADAAAFQAAADADADQACACAEAAQADAAAEgCQADgCACgDIAAgLIgHAAQgHgBgDADg");
	this.shape_15.setTransform(69.325,37);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgYApIAAhQIAMAAIAAAGQAGgHAJAAQAKAAAHAIQAFAIAAAOIAAABQAAAMgFAIQgHAIgKAAQgIAAgHgGIAAAcgAgMgXIAAAZQAFAHAHAAQAGAAADgFQADgEABgKQgBgJgDgFQgEgFgFAAQgIAAgEAGg");
	this.shape_16.setTransform(63.35,38.075);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgGAoIAAg5IAMAAIAAA5gAgFgcQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAgDABgCQACgCADAAQADAAACACQACACABADQAAABgBAAQAAABAAAAQAAABgBAAQAAABgBAAQgCACgDAAQgDAAgCgCg");
	this.shape_17.setTransform(56,35.9);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AALApIgRgZIgFAGIAAATIgOAAIAAhRIAOAAIAAAuIAEgFIAPgRIAPAAIgVAXIAYAig");
	this.shape_18.setTransform(52.125,35.775);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgFAoIAAg5IALAAIAAA5gAgEgcQgBAAAAgBQgBAAAAgBQAAAAAAgBQgBAAAAgBQABgDACgCQACgCACAAQAEAAACACQABACAAADQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgCACgEAAQgCAAgCgCg");
	this.shape_19.setTransform(47.5,35.9);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgGApIAAhRIANAAIAABRg");
	this.shape_20.setTransform(44.7,35.775);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgGAoIAAg5IANAAIAAA5gAgFgcQAAAAAAgBQgBAAAAgBQAAAAAAgBQgBAAAAgBQAAgDACgCQADgCACAAQAEAAACACQACACAAADQAAABgBAAQAAABAAAAQAAABgBAAQAAABAAAAQgCACgEAAQgCAAgDgCg");
	this.shape_21.setTransform(41.9,35.9);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAcAdIAAglQAAgFgCgDQgDgCgFAAQgFAAgCACQgDADgBAEIAAAmIgMAAIAAglQgBgKgKAAQgIAAgDAHIAAAoIgNAAIAAg4IAMAAIABAGQAGgIAKABQALAAAEAIQAHgIALAAQAKAAAEAEQAFAGAAAKIAAAlg");
	this.shape_22.setTransform(35.725,36.95);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgRAWQgIgHAAgNIAAgCQAAgIAEgGQADgIAGgDQAHgEAGAAQALAAAHAHQAGAIABAOIAAAEIglAAQAAAHAEAEQAFAFAFAAQAJAAAFgHIAIAGQgEAGgFACQgHADgHAAQgLAAgIgIgAgHgPQgDAEgBAHIAYAAIAAgBQAAgHgEgDQgDgDgGgBQgDAAgEAEg");
	this.shape_23.setTransform(28.05,37);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AAcAdIAAglQAAgFgCgDQgDgCgFAAQgFAAgCACQgDADgBAEIAAAmIgMAAIAAglQgBgKgKAAQgIAAgDAHIAAAoIgNAAIAAg4IAMAAIABAGQAGgIAKABQALAAAEAIQAHgIALAAQAKAAAEAEQAFAGAAAKIAAAlg");
	this.shape_24.setTransform(20.275,36.95);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AALApIAAglQAAgFgCgDQgDgCgFAAQgHAAgEAGIAAApIgNAAIAAhRIANAAIAAAeQAHgHAIAAQATAAAAAUIAAAmg");
	this.shape_25.setTransform(149.35,18.575);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgSAYQgFgFAAgLIAAgkIANAAIAAAkQAAALAJAAQAJAAADgHIAAgoIANAAIAAA4IgNAAIAAgFQgFAHgKgBQgKABgEgGg");
	this.shape_26.setTransform(143.25,19.85);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgMAiIgBAHIgMAAIAAhSIAOAAIAAAeQAFgGAJAAQALAAAFAHQAHAIAAAOIAAAAQAAAOgHAIQgFAIgLAAQgJAAgGgIgAgLAAIAAAYQADAHAIAAQAGAAADgEQAEgFgBgJIAAgCQAAgJgDgEQgDgFgGAAQgIAAgDAHg");
	this.shape_27.setTransform(137.2,18.625);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgSAYQgFgFAAgLIAAgkIANAAIAAAkQAAALAJAAQAIAAAEgHIAAgoIANAAIAAA4IgMAAIAAgFQgHAHgJgBQgJABgFgGg");
	this.shape_28.setTransform(130.95,19.85);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgGAUIAAggIgKAAIAAgJIAKAAIAAgPIAMAAIAAAPIALAAIAAAJIgLAAIAAAfQAAAEACACQAAAAAAAAQABAAAAABQABAAAAAAQABAAABAAIAFgBIAAAKIgJABQgOAAAAgQg");
	this.shape_29.setTransform(125.95,19.15);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AALAdIAAgkQAAgGgCgDQgDgCgFAAQgHAAgEAHIAAAoIgNAAIAAg4IAMAAIAAAGQAHgIAJABQATAAAAAUIAAAlg");
	this.shape_30.setTransform(118.45,19.75);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgRAWQgIgIABgMIAAgCQgBgIAEgGQADgIAGgDQAHgEAGAAQAMAAAGAHQAHAIgBAOIAAAEIglAAQABAIAFADQAEAFAFAAQAJgBAFgGIAHAGQgDAGgGACQgGADgGAAQgMAAgIgIgAgHgPQgDAEgBAHIAYAAIAAgBQgBgHgDgDQgDgEgFAAQgFAAgDAEg");
	this.shape_31.setTransform(112.5,19.8);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAcAdIAAglQAAgFgCgDQgDgCgFAAQgFAAgCACQgDADgBAEIAAAmIgMAAIAAglQgBgKgKAAQgIAAgDAHIAAAoIgNAAIAAg4IAMAAIABAFQAGgGAKAAQALgBAEAJQAHgJALABQAKAAAEAEQAFAGAAAKIAAAlg");
	this.shape_32.setTransform(104.725,19.75);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgMAmQgGgCgEgFIAHgIQAGAIAJgBQAFAAAEgDQAEgEgBgGIAAgEQgFAGgIAAQgKAAgHgIQgGgIgBgOQABgNAGgIQAGgIALAAQAIAAAGAHIABgGIAMAAIAAA3QAAALgIAIQgHAGgLAAQgGAAgGgDgAgIgYQgDAEAAALQAAAIADAEQAEAFAFABQAIgBADgGIAAgZQgDgHgIAAQgFABgEAFg");
	this.shape_33.setTransform(96.7,20.9);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgRAWQgIgIABgMIAAgCQAAgIADgGQADgIAGgDQAGgEAHAAQAMAAAGAHQAGAIAAAOIAAAEIglAAQABAIAFADQAEAFAFAAQAJgBAFgGIAHAGQgDAGgGACQgFADgHAAQgMAAgIgIgAgHgPQgDAEgBAHIAYAAIAAgBQgBgHgDgDQgDgEgGAAQgEAAgDAEg");
	this.shape_34.setTransform(90.8,19.8);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgLAcQgFgDgEgEQgDgFAAgFIANAAQAAAFADACQAEACAEABQAFAAADgCQACgDAAgDQAAgEgCgBQgDgCgGgCQgHgBgFgCQgJgDAAgKQAAgHAGgFQAHgFAJAAQAKAAAHAFQAFAFAAAIIgNAAQAAgEgCgCQgDgCgEgBQgEAAgDACQgCADAAADQgBADADACIAJADQAIACAFACQAEACACACQACAEAAAFQAAAHgGAFQgHAFgKAAQgHAAgFgCg");
	this.shape_35.setTransform(84.9,19.8);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgZApIAAhQIAMAAIABAGQAGgHAJAAQAKAAAGAIQAGAIABAOIAAABQgBAMgGAIQgGAIgKAAQgIAAgHgGIAAAcgAgMgXIAAAZQAFAHAHAAQAFAAAEgFQAEgEgBgKQABgJgEgFQgDgFgGAAQgIAAgEAGg");
	this.shape_36.setTransform(76.35,20.875);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgSAZQgGgFAAgHQAAgJAHgFQAHgEAMAAIAIAAIAAgFQAAgEgDgCQgCgEgFAAQgEABgDACQgDACAAADIgNAAQAAgEADgFQAEgDAFgDQAGgCAFAAQAKAAAHAFQAGAFAAAJIAAAZQAAAJACAEIAAABIgNAAIgCgGQgGAHgIAAQgJAAgFgFgAgHAEQgEADAAAFQAAADADACQACADAEAAQADAAAEgDQADgBACgDIAAgLIgHAAQgHAAgDACg");
	this.shape_37.setTransform(70.175,19.8);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgFAoIAAg5IALAAIAAA5gAgEgcQgBAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAgDACgCQACgCACAAQADAAACACQACACAAADQAAABAAAAQAAABAAAAQAAABgBAAQAAABgBAAQgCACgDAAQgCAAgCgCg");
	this.shape_38.setTransform(65.8,18.7);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgGAUIAAggIgJAAIAAgJIAJAAIAAgPIAMAAIAAAPIAKAAIAAAJIgKAAIAAAfQAAAEABACQABAAAAAAQABAAAAABQABAAAAAAQABAAABAAIAEgBIAAAKIgIABQgOAAAAgQg");
	this.shape_39.setTransform(62.45,19.15);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgRAWQgIgIAAgMIAAgCQAAgIAEgGQADgIAGgDQAGgEAHAAQALAAAHAHQAGAIAAAOIAAAEIgkAAQAAAIAEADQAFAFAFAAQAJgBAFgGIAHAGQgDAGgGACQgFADgHAAQgMAAgIgIgAgHgPQgDAEgBAHIAYAAIAAgBQAAgHgEgDQgDgEgGAAQgEAAgDAEg");
	this.shape_40.setTransform(57.85,19.8);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgNAlQgHgDgEgFQgEgGAAgHIANAAQAAAGAFAEQAEAEAHAAQAHAAAEgDQAEgDAAgFQAAgFgEgDQgEgDgIgCQgKgDgFgDQgLgHAAgKQAAgKAIgGQAIgGALAAQAIAAAGADQAHADADAGQAEAFAAAHIgNAAQAAgGgEgEQgEgDgHAAQgGAAgEADQgDADAAAFQAAAEAEADQAEADAIACQAJADAFADQAGADADAFQACAEAAAGQAAAKgHAGQgIAFgNAAQgHAAgHgDg");
	this.shape_41.setTransform(51.525,18.775);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgGAoIAAg5IANAAIAAA5gAgFgcQAAAAAAgBQgBAAAAgBQAAAAAAgBQgBAAAAgBQAAgDACgCQACgCADAAQADAAADACQACACAAADQAAABgBAAQAAABAAAAQAAABgBAAQAAABAAAAQgDACgDAAQgDAAgCgCg");
	this.shape_42.setTransform(44.05,18.7);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgLAcQgFgDgEgEQgDgFAAgFIANAAQAAAFADACQAEACADABQAGAAACgCQADgDAAgDQAAgEgDgBQgDgCgFgCQgHgBgEgCQgKgDAAgKQAAgHAGgFQAGgFAJAAQALAAAGAFQAHAFAAAIIgOAAQAAgEgCgCQgDgCgFgBQgDAAgDACQgDADAAADQABADACACIAKADQAHACAFACQAEACACACQACAEAAAFQAAAHgHAFQgGAFgLAAQgFAAgGgCg");
	this.shape_43.setTransform(39.75,19.8);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgMAmQgGgCgEgFIAHgIQAGAIAJgBQAFAAAEgDQAEgEgBgGIAAgEQgFAGgIAAQgKAAgHgIQgGgIgBgOQABgNAGgIQAGgIALAAQAIAAAGAHIABgGIAMAAIAAA3QAAALgIAIQgHAGgLAAQgGAAgGgDgAgIgYQgDAEAAALQAAAIADAEQAEAFAFABQAIgBADgGIAAgZQgDgHgIAAQgFABgEAFg");
	this.shape_44.setTransform(33.7,20.9);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AALAdIAAgkQAAgGgCgDQgDgCgFAAQgHAAgEAHIAAAoIgNAAIAAg4IAMAAIAAAGQAHgIAJABQATAAAAAUIAAAlg");
	this.shape_45.setTransform(27.65,19.75);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgSAYQgFgFAAgLIAAgkIANAAIAAAkQAAALAJAAQAIAAAEgHIAAgoIANAAIAAA4IgNAAIAAgFQgFAHgKgBQgJABgFgGg");
	this.shape_46.setTransform(21.55,19.85);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgYAnIAAhNIAxAAIAAALIgjAAIAAAXIAeAAIAAAKIgeAAIAAAhg");
	this.shape_47.setTransform(15.725,18.8);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FF8C2D").s().p("AtJkGIaTgPIAAIcI6TAPg");
	this.shape_48.setTransform(82.475,27.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_3
	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("rgba(0,0,0,0.227)").s().p("AtJEAIAAn/IaTAAIAAH/g");
	this.shape_49.setTransform(75.2,38.45);

	this.timeline.addTween(cjs.Tween.get(this.shape_49).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9,-0.3,177.7,64.39999999999999);


(lib.drag7G8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgSAXQgEgFAAgGQABgJAGgDQAHgFALAAIAHABIABgFIAAgDQgBgFgGgBQgEAAgBACQgDACgBAEIgMAAQABgFADgEQADgEAFgCQAFgCAFAAQAJABAFAFQAEAFAAAIIgEAYIgBAEIABAFIAAABIgMAAIAAgEQgHAFgGAAQgHABgFgFgAgGAEQgDADgBAEQAAADABACQACACAEAAQADAAACgCIAGgFIABgKIgFAAQgGAAgEADg");
	this.shape.setTransform(118.525,23.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgIAdQgDgEAAgHIAFgdIgIAAIABgJIAJAAIACgMIAKAAIgCAMIAJAAIgBAJIgJAAIgFAdIAAACQAAADAEAAIAEAAIgBAJIgHABQgFAAgDgEg");
	this.shape_1.setTransform(114.575,22.525);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgMAYQgGgDgCgGQgCgGAAgHIAAgCQABgHAEgGQAEgHAGgDQAFgDAGgBQAKABAFAHQAFAHgBAMIgBAEIggAAQgBAGADAEQADAEAFAAQAHAAAGgHIAGAGQgDAFgGADQgFADgGgBQgGABgFgEgAgJgEIAVAAIAAgBIAAgEQgBgDgCgDQgCgBgEgBQgIAAgEANg");
	this.shape_2.setTransform(110.1792,23.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgSAXQgEgFAAgGQABgJAGgDQAHgFALAAIAHABIABgFIAAgDQgBgFgGgBQgEAAgBACQgDACgBAEIgMAAQABgFADgEQADgEAFgCQAFgCAFAAQAJABAFAFQAEAFAAAIIgEAYIgBAEIABAFIAAABIgMAAIAAgEQgHAFgGAAQgHABgFgFgAgGAEQgDADgBAEQAAADABACQACACAEAAQADAAACgCIAGgFIABgKIgFAAQgGAAgEADg");
	this.shape_3.setTransform(104.775,23.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AAHAlIAGgiIAAgDQgBgGgGAAQgGAAgFAGIgHAlIgLAAIANhJIAKAAIgEAcQAGgIAIAAQAIABADAFQAEAGgBAHIgGAig");
	this.shape_4.setTransform(99.3111,22);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgNAYQgFgEgCgFQgDgHABgHIAAgBQABgHAEgGQADgHAGgDQAGgDAGgBQAJABAFAGQAFAFAAAIIgLAAQAAgEgCgDQgCgCgFgBQgFAAgEAGQgEAGgBAKQAAANAKAAQADAAADgCQADgDABgEIALAAQgBAFgDAEQgDAFgFACQgFADgFgBQgHABgEgEg");
	this.shape_5.setTransform(94.3107,23.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgLAkIAJg0IALAAIgJA0gAABgZQgBAAAAAAQAAgBAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABgBQACgCACAAQABAAABABQAAAAABAAQAAAAABABQAAAAABAAQAAABABAAQAAABAAAAQABABAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAgBAAIgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBg");
	this.shape_6.setTransform(90.55,22.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgLAlIAMhJIALAAIgMBJg");
	this.shape_7.setTransform(88.075,22);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgOAYQgFgEgCgFQgCgHAAgHIAAgBQABgHAEgGQAEgGAFgEQAGgDAGgBQAHABAFAEQAFADACAGQADAGgBAHQgBAIgEAHQgDAGgGAEQgGACgGAAQgHABgFgEgAgIgKQgCAFgBAFIAAAHQAAAEACAEQADADAEAAQAFAAAEgEQAEgGABgIIABgDQAAgHgDgDQgCgDgFgBQgHAAgEAHg");
	this.shape_8.setTransform(83.8843,23.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgdAjIAMhGIAYAAQALAAAGAHQAGAFAAALQgBAKgIAFQgHAGgNAAIgOAAIgEAagAgLAAIANAAQAGAAAFgDQAEgEABgFQAAgGgCgDQgDgEgGAAIgOAAg");
	this.shape_9.setTransform(78.1019,22.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgKAZQgFgCgDgFQgDgEAAgEIALAAQABAEADACQADACADAAQAFAAADgBQACgCAAgDQAAgDgCgCQgDgBgFgBIgKgEQgJgDAAgJQAAgGAGgEQAGgFAHgBQAKABAGAFQAFAEABAHIgNAAQABgDgDgCQgCgDgFAAQgDAAgCADQgCABgBADQABADACACQACABAGACIALADQAEACACADQACACAAAFQAAAGgGAFQgGAFgKgBQgFAAgFgCg");
	this.shape_10.setTransform(181.5,7.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_11.setTransform(176.275,7.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgFAlIAAhKIALAAIAABKg");
	this.shape_12.setTransform(172.275,6);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_13.setTransform(168.375,7.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AAOAjIgVgeIgIAJIAAAVIgMAAIAAhGIAMAAIAAAiIAHgJIAUgZIAPAAIgbAgIAcAmg");
	this.shape_14.setTransform(162.875,6.2);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_15.setTransform(154.075,7.05);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_16.setTransform(148.625,7.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AALAaIgLgjIgKAjIgKAAIgPg0IAMAAIAIAkIALgkIAIAAIAMAkIAIgkIAMAAIgPA0g");
	this.shape_17.setTransform(142.15,7.1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_18.setTransform(135.825,7.1);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AAKAlIAAghQAAgFgCgCQgDgCgEgBQgGAAgEAGIAAAlIgMAAIAAhKIAMAAIAAAcQAGgGAIgBQARABAAASIAAAig");
	this.shape_19.setTransform(130.325,6);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgNAbIAAg0IALAAIAAAGQAEgHAHAAIAFABIAAALIgFgBQgIABgCAGIAAAjg");
	this.shape_20.setTransform(123.55,7.05);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_21.setTransform(118.875,7.1);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAIQAFAGAAANIAAAAQAAANgFAGQgGAIgJAAQgJAAgFgHgAgKAAIAAAVQADAIAHAAQAFgBADgEQADgEAAgJIAAgBQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_22.setTransform(113.425,6.05);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AAaAbIAAgiQAAgEgCgDQgDgCgFAAQgEAAgDACQgCADgBADIAAAjIgLAAIAAgiQAAgJgKAAQgGAAgEAGIAAAlIgLAAIAAg0IAKAAIABAGQAFgHALAAQAJAAAEAJQAFgJALAAQAJAAAEAFQAEAFAAAJIAAAig");
	this.shape_23.setTransform(106.15,7.05);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_24.setTransform(99.125,7.1);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgLAjQgFgCgDgEIAFgHQAGAGAIAAQAFAAADgDQADgDAAgHIAAgDQgFAGgHgBQgJABgGgIQgGgHAAgNQAAgMAGgHQAFgIAKAAQAIAAAFAHIABgGIAKAAIAAAzQAAAKgGAHQgHAFgKABQgFAAgGgDgAgHgWQgDAFAAAIQAAAJADAEQADAEAFAAQAHAAADgGIAAgXQgDgFgHgBQgFAAgDAFg");
	this.shape_25.setTransform(93.475,8.1);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AAKAlIAAghQAAgFgCgCQgDgCgEgBQgGAAgEAGIAAAlIgMAAIAAhKIAMAAIAAAcQAGgGAIgBQARABAAASIAAAig");
	this.shape_26.setTransform(85.475,6);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgRAUQgGgHAAgNIAAAAQAAgHACgGQAEgHAFgDQAGgEAGAAQAKABAIAGQAGAIAAALIAAABQAAAJgDAGQgDAFgFAEQgGADgHAAQgKABgHgIgAgIgMQgEAFAAAHQAAAJAEAFQADAEAFAAQAGAAAEgEQACgFAAgJQAAgHgDgFQgDgFgGAAQgFAAgDAFg");
	this.shape_27.setTransform(79.85,7.1);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgGASIAAgdIgIAAIAAgJIAIAAIAAgMIAMAAIAAAMIAJAAIAAAJIgJAAIAAAdIABAEIAEABIAEAAIAAAJIgHABQgOAAAAgPg");
	this.shape_28.setTransform(75.2,6.525);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AAKAbIAAghQAAgGgCgCQgCgCgFAAQgGAAgEAHIAAAkIgMAAIAAg0IALAAIABAHQAGgIAIAAQARAAAAATIAAAig");
	this.shape_29.setTransform(70.875,7.05);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgRAUQgGgHAAgNIAAAAQAAgHACgGQADgHAGgDQAFgEAHAAQALABAGAGQAHAIAAALIAAABQAAAJgCAGQgDAFgGAEQgFADgIAAQgKABgHgIgAgJgMQgDAFAAAHQAAAJADAFQAEAEAFAAQAGAAAEgEQADgFAAgJQgBgHgDgFQgDgFgGAAQgFAAgEAFg");
	this.shape_30.setTransform(65.25,7.1);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgNIAAAAQAAgMAHgHQAGgIAKAAQAKAAAGAGQAFAGABAJIgLAAQgBgFgDgDQgCgDgFAAQgFAAgDAFQgDADAAAJIAAABQAAAJADAEQADAEAFAAQAEAAADgDQADgCABgEIALAAQAAAFgDAEQgDAEgFADQgFACgGAAQgKAAgGgGg");
	this.shape_31.setTransform(59.875,7.1);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_32.setTransform(52.025,7.1);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C3E50").s().p("AgWAlIAAhIIALAAIAAAFQAFgGAIAAQAKAAAGAHQAFAHAAANIAAABQAAALgFAHQgGAIgJAAQgIAAgFgGIAAAZgAgKgUIAAAWQADAGAHAAQAFAAADgEQADgEAAgJQAAgIgDgFQgDgEgFAAQgHAAgDAGg");
	this.shape_33.setTransform(46.575,8.075);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2C3E50").s().p("AgRAXQgFgFAAgGQAAgJAGgDQAHgFAKAAIAIAAIAAgDQAAgEgDgDQgCgDgEAAQgEAAgCADQgDACAAADIgMAAQAAgFADgDQADgEAFgCQAFgDAFAAQAJABAGAFQAFAEABAIIAAAYQAAAHACADIAAABIgNAAIgBgEQgGAFgHAAQgIABgFgFgAgHAEQgDADAAAEQAAADACACQADACADAAQADAAADgCQADgBACgDIAAgKIgHAAQgFAAgEACg");
	this.shape_34.setTransform(40.975,7.1);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2C3E50").s().p("AgNAbIAAg0IAMAAIAAAGQADgHAIAAIAEABIgBALIgEgBQgIABgCAGIAAAjg");
	this.shape_35.setTransform(36.75,7.05);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_36.setTransform(32.125,7.1);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2C3E50").s().p("AgLAfIAAAGIgLAAIAAhKIAMAAIAAAbQAFgGAHAAQAKAAAGAIQAFAGAAANIAAAAQAAANgFAGQgGAIgJAAQgJAAgFgHgAgKAAIAAAVQADAIAHAAQAFgBADgEQADgEAAgJIAAgBQAAgIgDgEQgDgEgFAAQgHAAgDAGg");
	this.shape_37.setTransform(26.675,6.05);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2C3E50").s().p("AgPAVQgHgIAAgLIAAgCQAAgHADgGQADgHAFgDQAGgEAGAAQALABAFAGQAGAIAAAMIAAAEIghAAQAAAHAEADQAEAEAFAAQAIAAAFgGIAGAFQgDAFgFADQgFACgHAAQgKAAgHgGgAgGgNQgDADgBAGIAWAAIAAAAQgBgHgDgCQgCgEgFAAQgEAAgDAEg");
	this.shape_38.setTransform(21.125,7.1);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2C3E50").s().p("AgZAjIAAhGIAZAAQALAAAHAFQAGAFAAAKQAAAEgDAFQgCADgFACQAFABAEAFQADAEAAAGQgBAKgGAFQgHAGgMgBgAgMAZIANAAQAFABAEgDQADgDAAgFQAAgMgLABIgOAAgAgMgEIAMAAQAFgBADgCQAEgDgBgEQAAgGgDgCQgCgCgGAAIgMAAg");
	this.shape_39.setTransform(15.35,6.2);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFE319").s().p("AvSikIelgJIAAFRI+lAKg");
	this.shape_40.setTransform(98.125,14.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0.3,-3.1,195.7,34.8);


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


(lib.tiga4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.tiga = new lib.drag8G3();
	this.tiga.name = "tiga";
	this.tiga.setTransform(-0.2,1.65,0.8086,0.8086,0,0,0,82.2,26.7);
	new cjs.ButtonHelper(this.tiga, 0, 1, 2, false, new lib.drag8G3(), 3);

	this.timeline.addTween(cjs.Tween.get(this.tiga).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.tiga4, new cjs.Rectangle(-73.9,-22.4,143.8,51.8), null);


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
p.nominalBounds = new cjs.Rectangle(-73.9,-22.4,143.8,52);


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

}).prototype = getMCSymbolPrototype(lib.lima4, new cjs.Rectangle(-74,-22.8,142.3,52.7), null);


(lib.lima = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.lima = new lib.drop8G5();
	this.lima.name = "lima";
	this.lima.setTransform(0,0.05,0.4758,0.4758,0,0,0,125,48.5);

	this.timeline.addTween(cjs.Tween.get(this.lima).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.lima, new cjs.Rectangle(-71.1,-22,142.39999999999998,72.6), null);


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

}).prototype = getMCSymbolPrototype(lib.empat4, new cjs.Rectangle(-73.9,-22.4,143.8,51.8), null);


(lib.empat = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.empat = new lib.drop8G4();
	this.empat.name = "empat";
	this.empat.setTransform(0,0,0.4758,0.4758,0,0,0,121.7,51.9);

	this.timeline.addTween(cjs.Tween.get(this.empat).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.empat, new cjs.Rectangle(-66.5,-27.7,131,60.7), null);


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
	this.drag2G1 = new lib.drag8G12();
	this.drag2G1.name = "drag2G1";
	this.drag2G1.setTransform(447.5,383.1,0.9278,0.9277,0,0,0,45,47);
	new cjs.ButtonHelper(this.drag2G1, 0, 1, 1);

	this.target = new lib.drag7G12copy();
	this.target.name = "target";
	this.target.setTransform(357.3,383.05,0.9279,0.9279,0,0,0,45.1,47);
	new cjs.ButtonHelper(this.target, 0, 1, 1);

	this.target_1 = new lib.drag7G11copy();
	this.target_1.name = "target_1";
	this.target_1.setTransform(266.6,383.05,0.9279,0.9279,0,0,0,45.3,47);
	new cjs.ButtonHelper(this.target_1, 0, 1, 1);

	this.target_2 = new lib.drag7G10copy2();
	this.target_2.name = "target_2";
	this.target_2.setTransform(175.05,383.05,0.9279,0.9279,0,0,0,45,47);
	new cjs.ButtonHelper(this.target_2, 0, 1, 1);

	this.target_3 = new lib.drag7G9copy();
	this.target_3.name = "target_3";
	this.target_3.setTransform(83.5,383.05,0.9279,0.9279,0,0,0,45,47);
	new cjs.ButtonHelper(this.target_3, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.target_3},{t:this.target_2},{t:this.target_1},{t:this.target},{t:this.drag2G1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces1, new cjs.Rectangle(41.8,336.3,447.5,93.5), null);


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

}).prototype = getMCSymbolPrototype(lib.dua4, new cjs.Rectangle(-73.9,-22.5,143.8,50.7), null);


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
	this.instance = new lib.flash0aiAssets_2();
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


(lib.tiga1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.tiga = new lib.tiga();
	this.tiga.name = "tiga";
	this.tiga.setTransform(-2.15,0);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(102,153,51,0.008)").s().p("ArHFrIAArVIWPAAIAALVg");
	this.shape.setTransform(-2.15,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.tiga}]}).wait(1));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.227)").s().p("AppCuIAAlbITTAAIAAFbg");
	this.shape_1.setTransform(-6.95,2.625);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-73.3,-36.3,142.39999999999998,72.69999999999999);


(lib.Slots10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// slots
	this.kotakKartuSembunyi = new lib.targetcopy();
	this.kotakKartuSembunyi.name = "kotakKartuSembunyi";
	this.kotakKartuSembunyi.setTransform(225.85,624.65);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape.setTransform(63.025,460.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgjBDQgOgMgBgUIAZAAQACALAGAHQAHAGAKAAQAMAAAGgJQAHgJAAgOQAAgPgIgIQgHgHgLAAQgIAAgFACQgEABgHAFIgUgFIAIhOIBTAAIAAAWIg9AAIgEAmQALgGAMAAQAXAAAMAOQAMANAAAYQAAAYgOAOQgOAOgXAAQgUAAgPgMg");
	this.shape_1.setTransform(54.05,453.675);

	this.instance = new lib.Tween8_1("synched",0);
	this.instance.setTransform(56.9,453.7,0.0361,0.0648);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_2.setTransform(63.025,401.375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAMBOIAAgjIhDAAIgBgPIBChpIAbAAIAABjIAUAAIAAAVIgUAAIAAAjgAAJgmIgmA8IApAAIAAhAg");
	this.shape_3.setTransform(53.8,394.875);

	this.instance_1 = new lib.Tween8_1("synched",0);
	this.instance_1.setTransform(56.9,395,0.0361,0.0648);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_4.setTransform(63.025,343.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgkBEQgPgMAAgUIAaAAQAAALAHAGQAHAHALAAQAMAAAHgHQAHgGAAgNQAAgMgIgHQgHgGgNAAIgPAAIAAgUIAQAAQAKAAAIgGQAGgGABgMQgBgLgGgGQgFgGgMAAQgKAAgHAGQgGAGgBAKIgaAAQAAgMAHgKQAGgKAMgGQALgFAOAAQAXAAANAMQAOALAAAVQAAALgHAJQgHAJgKAFQAMADAHAKQAHAJAAANQAAAVgPANQgOAMgXAAQgWAAgOgMg");
	this.shape_5.setTransform(53.6,336.875);

	this.instance_2 = new lib.Tween8_1("synched",0);
	this.instance_2.setTransform(56.9,337,0.0361,0.0648);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_6.setTransform(63.025,287.375);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgyBPIAAgSIAzg5QALgLAFgIQAFgJAAgIQAAgMgGgGQgHgHgJAAQgNAAgHAHQgHAIAAAOIgaAAQAAgPAHgLQAGgMAMgGQAMgGAQAAQAWAAANALQANAMAAAUQAAALgHANQgGAMgPAQIglApIBHAAIAAAVg");
	this.shape_7.setTransform(53.825,280.775);

	this.instance_3 = new lib.Tween8_1("synched",0);
	this.instance_3.setTransform(56.9,281,0.0361,0.0648);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAFQAAAGgEAEQgEAEgHAAQgGAAgEgEg");
	this.shape_8.setTransform(63.025,231.375);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAGBPIAAh9IglANIAAgWIA8gXIADAAIAACdg");
	this.shape_9.setTransform(52.575,224.85);

	this.instance_4 = new lib.Tween8_1("synched",0);
	this.instance_4.setTransform(56.9,225,0.0361,0.0648);

	this.lima = new lib.lima4();
	this.lima.name = "lima";
	this.lima.setTransform(131.85,463.05,1,1,0,0,0,-3,2.1);

	this.empat = new lib.empat4();
	this.empat.name = "empat";
	this.empat.setTransform(132.7,404.05,1,1,0,0,0,-2.1,1.8);

	this.tiga = new lib.tiga4();
	this.tiga.name = "tiga";
	this.tiga.setTransform(132.7,345.95,1,1,0,0,0,-2.1,1.7);

	this.dua = new lib.dua4();
	this.dua.name = "dua";
	this.dua.setTransform(133,289.65,1,1,0,0,0,-1.8,1.4);

	this.satu = new lib.satu4();
	this.satu.name = "satu";
	this.satu.setTransform(134,233.35,1,1,0,0,0,-0.8,1.1);
	new cjs.ButtonHelper(this.satu, 0, 1, 1);

	this.kotakKartu2 = new lib.target();
	this.kotakKartu2.name = "kotakKartu2";
	this.kotakKartu2.setTransform(478.9,264.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.kotakKartu2},{t:this.satu},{t:this.dua},{t:this.tiga},{t:this.empat},{t:this.lima},{t:this.instance_4},{t:this.shape_9},{t:this.shape_8},{t:this.instance_3},{t:this.shape_7},{t:this.shape_6},{t:this.instance_2},{t:this.shape_5},{t:this.shape_4},{t:this.instance_1},{t:this.shape_3},{t:this.shape_2},{t:this.instance},{t:this.shape_1},{t:this.shape},{t:this.kotakKartuSembunyi}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Slots10, new cjs.Rectangle(41.7,209.8,505.2,437.49999999999994), null);


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
	this.instance = new lib._3();
	this.instance.setTransform(-196,-255,1.0543,1.261);

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
	this.frame_24 = function() {
		this.gotoAndStop(0);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(12).call(this.frame_12).wait(12).call(this.frame_24).wait(1));

	// Layer_5
	this.instance = new lib._11_1();
	this.instance.setTransform(-184,-244,1.1929,0.9079);

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
	this.instance = new lib._14();
	this.instance.setTransform(-326,-238);

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
	this.target = new lib.drag7G12copy();
	this.target.name = "target";
	this.target.setTransform(330.8,9.75,1.9495,1.9495,0,0,0,45.2,46.9);
	new cjs.ButtonHelper(this.target, 0, 1, 1);

	this.target_1 = new lib.drag7G11copy();
	this.target_1.name = "target_1";
	this.target_1.setTransform(140.1,9.75,1.9495,1.9495,0,0,0,45.2,46.9);
	new cjs.ButtonHelper(this.target_1, 0, 1, 1);

	this.target_2 = new lib.drag7G10copy2();
	this.target_2.name = "target_2";
	this.target_2.setTransform(-52,9.75,1.9495,1.9495,0,0,0,44.9,46.9);
	new cjs.ButtonHelper(this.target_2, 0, 1, 1);

	this.target_3 = new lib.drag7G9copy();
	this.target_3.name = "target_3";
	this.target_3.setTransform(-244.4,9.75,1.9495,1.9495,0,0,0,44.9,46.9);
	new cjs.ButtonHelper(this.target_3, 0, 1, 1);

	this.drag2G1 = new lib.drag7G8();
	this.drag2G1.name = "drag2G1";
	this.drag2G1.setTransform(42.75,-153.5,1.9739,1.9739,0,0,0,98,14.3);
	new cjs.ButtonHelper(this.drag2G1, 0, 1, 2, false, new lib.drag7G8(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.drag2G1},{t:this.target_3},{t:this.target_2},{t:this.target_1},{t:this.target}]},12).to({state:[]},1).wait(12));

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


(lib.lima1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.lima = new lib.lima();
	this.lima.name = "lima";
	this.lima.setTransform(0.1,24.2,1,1,0,0,0,0.1,14.2);

	this.timeline.addTween(cjs.Tween.get(this.lima).wait(1));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.227)").s().p("ApzDwIAAnfITnAAIAAHfg");
	this.shape.setTransform(-7.275,26.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-71.1,-12,142.39999999999998,72.6);


(lib.empat1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.empat = new lib.empat();
	this.empat.name = "empat";
	this.empat.setTransform(-5.75,0);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(102,153,51,0.008)").s().p("ArHFrIAArVIWPAAIAALVg");
	this.shape.setTransform(-6.75,2.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.empat}]}).wait(1));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.227)").s().p("Ao9DIIAAmPIR7AAIAAGPg");
	this.shape_1.setTransform(-13.625,4.6);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-77.9,-33.7,142.4,72.7);


(lib.dua1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.dua = new lib.dua();
	this.dua.name = "dua";
	this.dua.setTransform(-3.85,-0.75);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(102,153,51,0.008)").s().p("ArHFrIAArVIWPAAIAALVg");
	this.shape.setTransform(-3.85,-0.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.dua}]}).wait(1));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.227)").s().p("ApqCuIAAlbITVAAIAAFbg");
	this.shape_1.setTransform(-9.3,1.975);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75,-37.1,142.4,72.7);


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
			if (pieces1.count === 4) root1.onWin();
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
		  Score1.text = pieces1.skor * 25;
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
	this.pieces1.setTransform(-201.05,-256.05,0.8714,0.8714);

	this.slots1 = new lib.Slots1();
	this.slots1.name = "slots1";
	this.slots1.setTransform(-201.05,-254.8,0.8714,0.8714);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,102,255,0.008)").s().p("EgmrAPdIAA+5MBNXAAAIAAH4ImoAAQgIAAAAAYIAABnIlHAAQgJAAAAAOIAAFGQAAAOAJAAIAtAAIAAD7QAAAXAIAAIIkAAQAIAAAAgXIAAhoICWAAIAANNg");
	this.shape_1.setTransform(-12.625,28.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.slots1},{t:this.pieces1},{t:this.shape},{t:this.Score1},{t:this.restart1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg5, new cjs.Rectangle(-675.6,-357.1,960.2,667.9000000000001), null);


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
	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);
	this.exit._off = true;

	this.timeline.addTween(cjs.Tween.get(this.exit).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// jawaban2
	this.lima = new lib.lima1();
	this.lima.name = "lima";
	this.lima.setTransform(60.75,89.35,1.7519,1.7519,0,0,0,0.1,24.3);
	new cjs.ButtonHelper(this.lima, 0, 1, 1);

	this.empat = new lib.empat1();
	this.empat.name = "empat";
	this.empat.setTransform(-240.65,70,1.4572,1.4572,0,0,0,-6.8,2.6);
	new cjs.ButtonHelper(this.empat, 0, 1, 1);

	this.tiga = new lib.tiga1();
	this.tiga.name = "tiga";
	this.tiga.setTransform(322.6,-110.15,1.4572,1.4572,0,0,0,-2.1,0);
	new cjs.ButtonHelper(this.tiga, 0, 1, 1);

	this.dua = new lib.dua1();
	this.dua.name = "dua";
	this.dua.setTransform(52.35,-110.15,1.4572,1.4572,0,0,0,-3.9,-0.8);
	new cjs.ButtonHelper(this.dua, 0, 1, 1);

	this.satu = new lib.satu1();
	this.satu.name = "satu";
	this.satu.setTransform(-240.6,-110.15,1.4572,1.4572,0,0,0,13.2,-74);
	new cjs.ButtonHelper(this.satu, 0, 1, 1);

	this.lima_1 = new lib.lima4();
	this.lima_1.name = "lima_1";
	this.lima_1.setTransform(46.75,24.4,1.2297,1.2297,0,0,0,-3,2.2);

	this.empat_1 = new lib.empat4();
	this.empat_1.name = "empat_1";
	this.empat_1.setTransform(-249.3,24.1,1.2297,1.2297,0,0,0,-2.2,1.9);

	this.tiga_1 = new lib.tiga4();
	this.tiga_1.name = "tiga_1";
	this.tiga_1.setTransform(321.85,-159.05,1.2297,1.2297,0,0,0,-2.2,1.7);

	this.dua_1 = new lib.dua4();
	this.dua_1.name = "dua_1";
	this.dua_1.setTransform(46.15,-159.5,1.2297,1.2297,0,0,0,-1.9,1.4);

	this.satu_1 = new lib.satu4();
	this.satu_1.name = "satu_1";
	this.satu_1.setTransform(-247.6,-159.95,1.2297,1.2297,0,0,0,-0.8,1);
	new cjs.ButtonHelper(this.satu_1, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.satu_1},{t:this.dua_1},{t:this.tiga_1},{t:this.empat_1},{t:this.lima_1},{t:this.satu},{t:this.dua},{t:this.tiga},{t:this.empat},{t:this.lima}]},12).to({state:[]},1).wait(12));

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
	this.lima.setTransform(323,467.45,1,1,0,0,0,0.1,24.2);
	new cjs.ButtonHelper(this.lima, 0, 1, 1);

	this.empat = new lib.empat1();
	this.empat.name = "empat";
	this.empat.setTransform(322.95,402.8,1,1,0,0,0,-6.8,2.6);
	new cjs.ButtonHelper(this.empat, 0, 1, 1);

	this.tiga = new lib.tiga1();
	this.tiga.name = "tiga";
	this.tiga.setTransform(323.05,346.25,1,1,0,0,0,-2.1,0);
	new cjs.ButtonHelper(this.tiga, 0, 1, 1);

	this.dua = new lib.dua1();
	this.dua.name = "dua";
	this.dua.setTransform(322.95,292.6,1,1,0,0,0,-3.9,-0.8);
	new cjs.ButtonHelper(this.dua, 0, 1, 1);

	this.satu = new lib.satu1();
	this.satu.name = "satu";
	this.satu.setTransform(323,246.9,1,1,0,0,0,13.2,-74);
	new cjs.ButtonHelper(this.satu, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.satu},{t:this.dua},{t:this.tiga},{t:this.empat},{t:this.lima}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces10, new cjs.Rectangle(251.8,210.6,142.39999999999998,293.29999999999995), null);


// stage content:
(lib.game10 = function(mode,startPosition,loop) {
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
		  window.location.replace("../game11/index.html");
		});
		
		root.btnBack3.on("click", function () {
		  window.location.replace("../game9/index.html");
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

	// Layer_4
	this.popUpJawabanAkhirUtama = new lib.popUpJawabanAkhirUtama();
	this.popUpJawabanAkhirUtama.name = "popUpJawabanAkhirUtama";
	this.popUpJawabanAkhirUtama.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.popUpJawabanAkhirUtama).wait(1));

	// Layer_2
	this.popUpDanger = new lib.dsdsdd();
	this.popUpDanger.name = "popUpDanger";
	this.popUpDanger.setTransform(389,443.15,0.7235,0.7265,0,0,0,33.4,33.1);

	this.popUpSelesai = new lib.dsd();
	this.popUpSelesai.name = "popUpSelesai";
	this.popUpSelesai.setTransform(412.8,292.6,0.7235,0.7265,0,0,0,33.4,33.1);

	this.popUpSalah = new lib.fff();
	this.popUpSalah.name = "popUpSalah";
	this.popUpSalah.setTransform(412.8,292.6,0.7235,0.7265,0,0,0,33.4,33.1);

	this.popUpBenar = new lib.bener();
	this.popUpBenar.name = "popUpBenar";
	this.popUpBenar.setTransform(412.75,292.6,0.7236,0.7266,0,0,0,33.3,33.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.popUpBenar},{t:this.popUpSalah},{t:this.popUpSelesai},{t:this.popUpDanger}]}).wait(1));

	// code
	this.popUpInfo = new lib.popUpInfo();
	this.popUpInfo.name = "popUpInfo";
	this.popUpInfo.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.popUpInfo).wait(1));

	// Layer_6
	this.cobaha = new lib.bg5();
	this.cobaha.name = "cobaha";
	this.cobaha.setTransform(675.75,358.05);

	this.timeline.addTween(cjs.Tween.get(this.cobaha).wait(1));

	// Layer_1
	this.instance_1 = new lib.sustain();
	this.instance_1.setTransform(141.5,44.2,1,1,0,0,0,125.9,18.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// base
	this.g3 = new lib.g3();
	this.g3.name = "g3";
	this.g3.setTransform(848.95,284.2,0.936,0.9185,0,0,0,0.1,0);
	this.g3.shadow = new cjs.Shadow("rgba(0,0,0,1)",2,2,11);

	this.g2 = new lib.g2();
	this.g2.name = "g2";
	this.g2.setTransform(733.75,284.2,0.936,0.9185);
	this.g2.shadow = new cjs.Shadow("rgba(0,0,0,1)",2,2,11);

	this.g1 = new lib.g1();
	this.g1.name = "g1";
	this.g1.setTransform(618,284.2,0.936,0.9185);
	this.g1.shadow = new cjs.Shadow("rgba(0,0,0,1)",0,0,10);

	this.btnInfo = new lib.btnInfo();
	this.btnInfo.name = "btnInfo";
	this.btnInfo.setTransform(892.55,53.3,0.6435,0.6435);
	new cjs.ButtonHelper(this.btnInfo, 0, 1, 2, false, new lib.btnInfo(), 3);

	this.restart = new lib.Restart();
	this.restart.name = "restart";
	this.restart.setTransform(715.95,176.75,0.7541,0.7541,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.restart, 0, 1, 2, false, new lib.Restart(), 3);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgJApQgKAAgHgGQgHgHABgKQABgMAKgGQAKgHAQAAIAOAAIABgHQAAgHgDgEQgDgEgIAAQgGAAgFADQgFAEgBAFIgNAAQABgGAEgGQAFgFAIgDQAGgDAIAAQAMAAAHAIQAHAHgBAMIgGAmIgBAGIABAIIAAABIgOAAIgBgEIABgFQgKAKgLAAIgBAAgAgLAFQgHAEAAAHQgCAGAEAEQADADAHAAQAGABAEgEQAGgDAEgFIADgRIgKAAQgMAAgGAEg");
	this.shape_6.setTransform(162.65,195.7761);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgMAsQgEgGABgJIAIgwIgOAAIACgKIAOAAIADgUIANAAIgEAUIAPAAIgCAKIgPAAIgHAwIAAAEQABAFAEAAIAHgBIgBALIgJACQgIAAgEgGg");
	this.shape_7.setTransform(156.725,194.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgZAeQgIgKABgRIAAgDQACgLAGgKQAFgJAJgFQAIgFAIAAQANAAAHAIQAHAIAAANIAAAKIgBAFIgzAAQgBALAFAHQAFAIAJAAQALAAAKgKIAIAGQgFAHgIAEQgIAEgJAAQgOAAgJgLgAgIgXQgGAFgDAMIAlAAIABgBQABgJgEgHQgFgGgHAAIgCAAQgGAAgGAGg");
	this.shape_8.setTransform(150.1888,195.7977);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgJApQgLAAgGgGQgHgHABgKQABgMAKgGQAKgHAQAAIAOAAIAAgHQACgHgEgEQgEgEgHAAQgGAAgEADQgGAEgBAFIgOAAQACgGAEgGQAFgFAHgDQAHgDAIAAQAMAAAHAIQAHAHgBAMIgHAmIAAAGIABAIIgBABIgMAAIgBgEIAAgFQgLAKgKAAIgBAAgAgLAFQgGAEgCAHQAAAGADAEQADADAGAAQAHABAFgEQAFgDAFgFIACgRIgKAAQgLAAgHAEg");
	this.shape_9.setTransform(142,195.7761);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAMA4IAJg0IAAgGQgBgKgLAAQgLAAgJAMIgKA4IgNAAIAUhvIANAAIgIArQAJgMAOABQALAAAFAHQAGAIgCAMIgIA0g");
	this.shape_10.setTransform(133.8661,194.125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgUAkQgHgFgDgJQgDgJABgLIAAgDQACgLAFgJQAFgJAJgFQAIgFAJAAQANAAAHAIQAIAIAAANIgNAAQAAgIgEgFQgEgFgHAAQgJAAgHAIQgHAIgCANIAAACIAAAJQAAAJAFAFQAEAFAHAAQAHAAAFgEQAGgEACgHIAMAAQgBAHgFAGQgFAHgHADQgHADgHAAQgKAAgHgFg");
	this.shape_11.setTransform(126.3889,195.7977);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgPA2IANhOIANAAIgNBOgAACgnQgCgCABgEQAAgDABgDQADgCADAAQADAAACACQADACAAAEQAAADgDACQgCADgDAAQgDAAgDgCg");
	this.shape_12.setTransform(120.8,194.3458);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgPA4IAShvIANAAIgSBvg");
	this.shape_13.setTransform(117.225,194.125);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgEApQgKAAgHgGQgIgEgDgKQgDgJABgLQABgLAFgKQAGgJAJgGQAIgGAKABQAKAAAHAFQAHAGAEAJQADAJgBALIAAAAQgCAMgFAJQgGAKgIAFQgIAFgIAAIgCAAgAgMgVQgHAIgCANIAAABIAAAKQABAIAEAGQAFAFAHAAQAGAAAFgDQAGgEAEgHQADgHACgJIAAgJQgBgJgFgGQgEgFgHAAIgBAAQgJAAgHAIg");
	this.shape_14.setTransform(111.0114,195.8);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgrA1IAThpIAiAAQARAAAJAIQAJAJgCAPQgBAPgLAIQgLAJgSAAIgYAAIgHApgAgUAAIAXAAQALAAAHgFQAHgFACgKQABgJgFgGQgFgFgJgBIgZAAg");
	this.shape_15.setTransform(102.4607,194.425);

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
	this.shape_34.graphics.f("#FFFFFF").s().p("AARAmIAAgwQgBgIgDgEQgEgEgHAAQgGAAgEADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_34.setTransform(383.9,210.675);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgXAgQgGgGAAgKQAAgLAJgGQAIgGAPAAIANAAIAAgFQAAgIgFgDQgDgEgIAAQgGAAgEADQgGAEAAAEIgMAAQAAgFAEgFQAEgGAGgDQAIgCAGAAQANAAAHAGQAIAHAAALIAAAgQAAALACAGIAAABIgNAAIgBgIQgKAKgLgBQgKABgIgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAGgCQAFgEADgFIAAgPIgKAAQgXAAAAAOg");
	this.shape_35.setTransform(376.25,210.75);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AARAlIgRg3IgRA3IgKAAIgVhJIAMAAIAOA2IASg2IAJAAIARA3IAPg3IAMAAIgVBJg");
	this.shape_36.setTransform(367.2,210.75);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgVAcQgJgJAAgRIAAgCQAAgLAEgIQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAKAAARIAAAFIgxAAQABAKAGAIQAGAGAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPAAgJgKgAgLgVQgFAFgBAKIAkAAIAAgBQgBgJgEgFQgFgGgIAAQgHAAgFAGg");
	this.shape_37.setTransform(358.325,210.75);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AAZAyIAAguIgxAAIAAAuIgNAAIAAhjIANAAIAAArIAxAAIAAgrIANAAIAABjg");
	this.shape_38.setTransform(349.525,209.475);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AAQA1IgZgiIgIAIIAAAaIgNAAIAAhpIANAAIAAA/IAHgIIAWgXIAPAAIgcAdIAgAsg");
	this.shape_39.setTransform(338.025,209.2);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgGAzIAAhJIAMAAIAABJgAgFglQgBgCAAgDQAAgDABgCQACgCADAAQAEAAABACQACACABADQgBADgCACQgBACgEAAQgDAAgCgCg");
	this.shape_40.setTransform(332.3,209.4);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_41.setTransform(328.125,209.925);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgEgGQgEgFABgHIAMAAQABAHAEAEQAFADAHAAQAHAAAFgDQADgDAAgFQAAgFgDgDQgEgCgJgCQgKgCgFgDQgFgDgDgDQgDgEAAgGQAAgJAHgGQAIgGALAAQANAAAIAGQAIAHgBAKIgMAAQAAgFgEgEQgFgEgHAAQgGAAgEADQgDADAAAFQAAAEADADIANAFQAJACAFACQAHADACAEQADAEABAFQgBAKgHAHQgJAFgMAAQgIAAgHgDg");
	this.shape_42.setTransform(322.45,210.75);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgFAzIAAhJIALAAIAABJgAgEglQgCgCAAgDQAAgDACgCQACgCACAAQAEAAABACQACACAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_43.setTransform(317.15,209.4);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgGAAQgMAAgEAKIAAA0g");
	this.shape_44.setTransform(313.45,210.675);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgVAcQgJgJAAgRIAAgCQAAgLAEgIQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAKAAARIAAAFIgxAAQABAKAGAIQAGAGAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPAAgJgKgAgLgVQgFAFgBAKIAkAAIAAgBQgBgJgEgFQgFgGgIAAQgHAAgFAGg");
	this.shape_45.setTransform(307.075,210.75);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_46.setTransform(300.825,209.925);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AAQA1IgZgiIgIAIIAAAaIgNAAIAAhpIANAAIAAA/IAHgIIAWgXIAPAAIgcAdIAgAsg");
	this.shape_47.setTransform(295.675,209.2);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgXAgQgGgGgBgKQABgLAIgGQAJgGAPAAIANAAIAAgFQgBgIgEgDQgEgEgHAAQgGAAgEADQgGAEAAAEIgMAAQAAgFAEgFQAEgGAGgDQAHgCAIAAQAMAAAHAGQAIAHAAALIAAAgQAAALACAGIAAABIgNAAIgBgIQgKAKgLgBQgLABgHgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAGgCQAFgEADgFIAAgPIgLAAQgWAAAAAOg");
	this.shape_48.setTransform(287.85,210.75);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgGAAQgMAAgEAKIAAA0g");
	this.shape_49.setTransform(282.05,210.675);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgXAgQgHgGAAgKQABgLAIgGQAJgGAPAAIAMAAIAAgFQAAgIgDgDQgEgEgIAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgGAGgDQAIgCAHAAQAMAAAIAGQAGAHABALIAAAgQAAALACAGIAAABIgNAAIgCgIQgIAKgMgBQgKABgIgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgCQAGgEACgFIAAgPIgKAAQgWAAAAAOg");
	this.shape_50.setTransform(275.5,210.75);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AAWAyIgigvIgMANIAAAiIgNAAIAAhjIANAAIAAAxIArgxIAQAAIgmAsIApA3g");
	this.shape_51.setTransform(267.875,209.475);

	this.drag2G1 = new lib.drag7G7();
	this.drag2G1.name = "drag2G1";
	this.drag2G1.setTransform(798.25,240.6,0.8086,0.8086,0,0,0,82.2,26.7);
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
	this.shape_52.setTransform(714.625,108.725);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_53.setTransform(709.625,113.325);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_54.setTransform(702.85,114.875);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_55.setTransform(696.075,113.325);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAFQAFAEAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANABQAQAAAJAHQAKAJAAAMIgQAAQAAgHgFgFQgFgEgJAAQgHAAgFAEQgEADAAAGQAAAGAEACQAEAEALACQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPAAQgKgBgIgDg");
	this.shape_56.setTransform(685.425,114.95);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgbAnQgJgIAAgLQAAgOALgGQAKgIASAAIAPAAIAAgHQAAgJgEgFQgFgEgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgGAFgHQAEgGAIgEQAJgDAIAAQAQAAAJAHQAIAIABAOIAAAoQAAAMADAIIAAABIgQAAQgBgDgBgGQgLAKgOABQgNgBgIgHgAgUASQgBAHAFAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_57.setTransform(676.4,114.95);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_58.setTransform(669.725,113.075);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgaAjQgLgNAAgUIAAgCQAAgNAFgKQAFgKAJgHQAKgFAJAAQASgBAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgLgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_59.setTransform(663.225,114.95);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_60.setTransform(654.925,113.075);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AAvAuIAAg7QAAgJgEgFQgEgFgLAAQgIAAgGAFQgGAGAAAIIAAA7IgPAAIAAg6QAAgUgTAAQgPAAgFANIAABBIgQAAIAAhZIAOAAIABAKQAKgMAQAAQAUAAAFAPQAFgHAHgEQAHgEAKAAQAdAAABAgIAAA7g");
	this.shape_61.setTransform(638.4,114.875);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgLQAAgOALgGQAKgIATAAIAOAAIAAgHQABgJgFgFQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAFgHQAEgGAIgEQAJgDAIAAQAQAAAJAHQAIAIABAOIAAAoQAAAMADAIIAAABIgQAAQgCgDAAgGQgLAKgNABQgOgBgJgHgAgVASQABAHAEAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgMAAQgbAAAAAQg");
	this.shape_62.setTransform(626.3,114.95);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_63.setTransform(619.625,113.075);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgLQAAgOALgGQAKgIATAAIAPAAIAAgHQAAgJgFgFQgFgEgJAAQgHAAgGAEQgGAEAAAGIgPAAQAAgGAEgHQAFgGAJgEQAIgDAJAAQAPAAAJAHQAIAIABAOIAAAoQAAAMADAIIAAABIgQAAQgCgDAAgGQgLAKgNABQgOgBgJgHgAgVASQABAHAEAEQAFAFAIgBQAGAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_64.setTransform(612.9,114.95);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgMAQAAQAOAAAKALIAAgvIAPAAIAAB+IgOAAIgBgJQgJAKgQABQgPAAgKgNgAgPgGQgHAIAAARQAAAPAHAJQAGAJAKgBQAPAAAHgNIAAgoQgHgNgPAAQgKAAgGAJg");
	this.shape_65.setTransform(603.275,113.15);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAFQAFAEAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANABQAQAAAJAHQAKAJAAAMIgQAAQAAgHgFgFQgFgEgJAAQgHAAgFAEQgEADAAAGQAAAGAEACQAEAEALACQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPAAQgKgBgIgDg");
	this.shape_66.setTransform(590.125,114.95);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgaAjQgLgNAAgUIAAgCQAAgNAFgKQAFgKAJgHQAKgFAJAAQASgBAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgLgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_67.setTransform(581.325,114.95);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_68.setTransform(574.675,113.325);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAFQAFAEAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANABQAQAAAJAHQAKAJAAAMIgQAAQAAgHgFgFQgFgEgJAAQgHAAgFAEQgEADAAAGQAAAGAEACQAEAEALACQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPAAQgKgBgIgDg");
	this.shape_69.setTransform(568.225,114.95);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgaAjQgLgNAAgUIAAgCQAAgNAFgKQAFgKAJgHQAKgFAJAAQASgBAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgLgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_70.setTransform(559.425,114.95);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AglA/IAAh8IAOAAIABAKQAKgLAPAAQAQAAAKAMQAJAMAAAWIAAABQAAAUgJAMQgKANgQAAQgPAAgJgKIAAArgAgVgkIAAAqQAGAMAOgBQAKAAAHgIQAGgJABgQQgBgPgGgJQgHgJgKAAQgOAAgGANg");
	this.shape_71.setTransform(550.25,116.6);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAFQAFAEAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANABQAQAAAJAHQAKAJAAAMIgQAAQAAgHgFgFQgFgEgJAAQgHAAgFAEQgEADAAAGQAAAGAEACQAEAEALACQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPAAQgKgBgIgDg");
	this.shape_72.setTransform(540.925,114.95);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_73.setTransform(527.65,114.875);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgLQAAgOALgGQAKgIATAAIAOAAIAAgHQABgJgFgFQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAFgHQAEgGAIgEQAJgDAIAAQAQAAAJAHQAIAIABAOIAAAoQAAAMADAIIAAABIgQAAQgCgDAAgGQgLAKgNABQgOgBgJgHgAgVASQABAHAEAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgMAAQgbAAAAAQg");
	this.shape_74.setTransform(518.3,114.95);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_75.setTransform(509.975,113.075);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgbAnQgJgIAAgLQAAgOALgGQAKgIASAAIAPAAIAAgHQAAgJgEgFQgFgEgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgGAFgHQAEgGAIgEQAJgDAIAAQAQAAAJAHQAIAIABAOIAAAoQAAAMADAIIAAABIgQAAQgBgDgBgGQgLAKgOABQgNgBgIgHgAgUASQgBAHAFAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_76.setTransform(500.45,114.95);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AglA/IAAh8IAOAAIABAKQAJgLAQAAQAQAAAKAMQAJAMAAAWIAAABQAAAUgJAMQgKANgQAAQgPAAgKgKIAAArgAgWgkIAAAqQAIAMAOgBQAJAAAHgIQAHgJgBgQQABgPgHgJQgHgJgJAAQgOAAgIANg");
	this.shape_77.setTransform(491.25,116.6);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgJALgQAAQgOAAgIgIg");
	this.shape_78.setTransform(481.625,115.025);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_79.setTransform(474.525,114.875);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgaAjQgLgNAAgUIAAgCQAAgNAFgKQAFgKAJgHQAKgFAJAAQASgBAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgLgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_80.setTransform(466.775,114.95);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AAwAuIAAg7QAAgJgFgFQgEgFgLAAQgIAAgGAFQgFAGgCAIIAAA7IgOAAIAAg6QAAgUgTAAQgPAAgGANIAABBIgPAAIAAhZIAPAAIAAAKQAKgMARAAQASAAAHAPQAEgHAHgEQAHgEAKAAQAeAAAAAgIAAA7g");
	this.shape_81.setTransform(454.75,114.875);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgSA7QgKgEgFgHIAJgJQAKAMAOAAQAKAAAGgGQAHgHgBgLIAAgIQgJALgPAAQgPAAgKgNQgKgNAAgUQAAgWAKgMQAJgMARAAQAPgBAJAMIABgKIAOAAIAABXQAAARgKALQgLAJgRABQgJAAgJgFgAgPgpQgGAJgBARQABAPAGAIQAGAJAKgBQAPAAAGgNIAAgoQgGgNgPAAQgKAAgGAJg");
	this.shape_82.setTransform(438.15,116.65);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_83.setTransform(428.85,114.875);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgLQAAgOALgGQALgIASAAIAPAAIAAgHQAAgJgFgFQgFgEgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgGAEgHQAGgGAIgEQAIgDAJAAQAPAAAJAHQAJAIAAAOIAAAoQAAAMADAIIAAABIgQAAQgCgDAAgGQgLAKgNABQgOgBgJgHgAgVASQABAHAEAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_84.setTransform(419.5,114.95);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgbA/IgFgBIAAgNIAEABQAIAAAEgEQAEgDADgIIAEgJIgghYIAQAAIAWBCIAVhCIAQAAIgkBnQgHAWgTAAg");
	this.shape_85.setTransform(410.875,116.775);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAAAAgIAAA7g");
	this.shape_86.setTransform(397.95,114.875);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AgcAnQgIgIAAgLQAAgOALgGQAKgIATAAIAOAAIAAgHQABgJgFgFQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgGAFgHQAFgGAHgEQAJgDAIAAQAQAAAJAHQAJAIAAAOIAAAoQAAAMADAIIAAABIgQAAQgBgDgBgGQgLAKgNABQgOgBgJgHgAgUASQAAAHAEAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgMAAQgaAAAAAQg");
	this.shape_87.setTransform(388.6,114.95);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AAVAtIgVhDIgVBDIgMAAIgahZIAPAAIASBCIAVhCIALAAIAVBEIAShEIAPAAIgaBZg");
	this.shape_88.setTransform(377.575,114.95);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgaAjQgLgNAAgUIAAgCQAAgNAFgKQAFgKAJgHQAKgFAJAAQASgBAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgLgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_89.setTransform(366.775,114.95);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgQAAIAAh/IAQAAIAAAxQAKgNAPAAQAdAAAAAfIAAA8g");
	this.shape_90.setTransform(357.55,113.075);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgTAGIAAgLIAnAAIAAALg");
	this.shape_91.setTransform(350.475,114.325);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_92.setTransform(343.45,114.875);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgbAnQgJgIAAgLQAAgOALgGQALgIARAAIAQAAIAAgHQgBgJgEgFQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAEgHQAGgGAIgEQAIgDAJAAQAPAAAJAHQAJAIAAAOIAAAoQAAAMADAIIAAABIgQAAQgCgDAAgGQgLAKgOABQgNgBgIgHgAgVASQAAAHAFAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_93.setTransform(334.1,114.95);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AAVAtIgVhDIgVBDIgMAAIgahZIAPAAIASBCIAVhCIALAAIAVBEIAShEIAPAAIgaBZg");
	this.shape_94.setTransform(323.075,114.95);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AgaAjQgLgNAAgUIAAgCQAAgNAFgKQAFgKAJgHQAKgFAJAAQASgBAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgLgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_95.setTransform(312.275,114.95);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAGIAABAIgPAAIAAh/IAPAAIAAAxQAKgNAPAAQAdAAABAfIAAA8g");
	this.shape_96.setTransform(303.05,113.075);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_97.setTransform(289.45,114.875);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AgbAnQgJgIAAgLQAAgOALgGQALgIARAAIAQAAIAAgHQgBgJgEgFQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAEgHQAGgGAIgEQAIgDAJAAQAPAAAJAHQAJAIAAAOIAAAoQAAAMADAIIAAABIgQAAQgCgDAAgGQgLAKgOABQgNgBgIgHgAgVASQAAAHAFAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_98.setTransform(280.1,114.95);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_99.setTransform(271.775,113.075);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_100.setTransform(263.175,113.075);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AgbAmQgHgJAAgQIAAg6IAPAAIAAA5QAAAVAQAAQARAAAGgNIAAhBIAPAAIAABZIgOAAIgBgJQgJALgQAAQgOAAgIgIg");
	this.shape_101.setTransform(253.625,115.025);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAFQAFAEAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgEQgFgDgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANABQAQAAAJAHQAKAJAAAMIgQAAQAAgHgFgFQgFgEgJAAQgHAAgFAEQgEADAAAGQAAAGAEACQAEAEALACQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPAAQgKgBgIgDg");
	this.shape_102.setTransform(244.575,114.95);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AgbAnQgJgIAAgLQAAgOALgGQALgIARAAIAQAAIAAgHQgBgJgEgFQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgGAEgHQAGgGAIgEQAIgDAJAAQAPAAAJAHQAJAIAAAOIAAAoQAAAMADAIIAAABIgQAAQgCgDAAgGQgLAKgOABQgNgBgIgHgAgVASQAAAHAFAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_103.setTransform(235.55,114.95);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AAvAuIAAg7QAAgJgEgFQgEgFgLAAQgIAAgGAFQgGAGAAAIIAAA7IgPAAIAAg6QAAgUgTAAQgPAAgFANIAABBIgQAAIAAhZIAOAAIABAKQAKgMAQAAQAUAAAFAPQAFgHAHgEQAHgEAKAAQAdAAABAgIAAA7g");
	this.shape_104.setTransform(223.5,114.875);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAAAAgIAAA7g");
	this.shape_105.setTransform(781.8,90.475);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATAAIAOAAIAAgHQABgIgFgGQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAFgGAHgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgBgDgBgGQgLAKgNABQgOAAgJgIgAgUASQAAAHAEAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgMAAQgaAAAAAQg");
	this.shape_106.setTransform(772.45,90.55);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgJQgJAKgQABQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAJAKgBQAPAAAHgMIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_107.setTransform(762.825,88.75);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgKAuQgMAAgIgHQgHgHABgLQAAgPAMgHQAMgIASAAIAQAAIAAgHQABgIgEgFQgEgEgHAAQgIgBgFAEQgGAEgBAHIgPAAQAAgIAGgGQAFgGAJgEQAHgDAJAAQAOABAIAIQAIAIgCANIgHAsIAAAGIABAJIAAACIgQAAIAAgFIAAgFQgMAMgMAAIgBgBgAgMAGQgIAEgBAIQgBAHAEAEQAEAEAHAAQAHAAAFgDQAHgEAEgGIAEgTIgMAAQgNAAgHAFg");
	this.shape_108.setTransform(749.231,90.551);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AgNAyQgFgHABgLIAJg2IgQAAIACgMIAQAAIAEgWIAOAAIgEAWIARAAIgDAMIgQAAIgIA3IAAAEQAAAHAGgBIAHgBIgBANQgFABgFABQgJgBgEgGg");
	this.shape_109.setTransform(742.575,89.55);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AgCAuQgRAAgKgMQgJgMABgTIABgDQABgNAHgLQAGgLAKgFQAJgGAKAAQAOABAIAIQAIAJAAAQIAAAKIgBAGIg6AAQgBAMAFAJQAGAJALAAQAMAAALgMIAJAHQgGAIgIAFQgIAFgJAAIgCgBgAgJgbQgHAHgEANIArAAIAAgCQABgKgEgHQgFgHgJAAQgIAAgHAGg");
	this.shape_110.setTransform(735.2023,90.5525);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgKAuQgMAAgIgHQgHgHABgLQAAgPAMgHQAMgIASAAIAQAAIAAgHQABgIgEgFQgEgEgHAAQgIgBgFAEQgGAEgBAHIgPAAQAAgIAGgGQAFgGAJgEQAHgDAJAAQAOABAIAIQAIAIgCANIgHAsIAAAGIABAJIAAACIgQAAIAAgFIAAgFQgMAMgMAAIgBgBgAgMAGQgIAEgBAIQgBAHAEAEQAEAEAHAAQAHAAAFgDQAHgEAEgGIAEgTIgMAAQgNAAgHAFg");
	this.shape_111.setTransform(725.931,90.551);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AAOBAIAKg7IAAgHQgBgMgMAAQgNAAgKAOIgLBAIgPAAIAWh/IAPAAIgJAxQALgNAPAAQANABAGAIQAGAJgCAOIgKA7g");
	this.shape_112.setTransform(716.74,88.675);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AgEAuQgLAAgIgFQgIgGgDgKQgEgKABgNIABgDQABgNAGgKQAGgLAKgFQAJgGALAAQAOABAJAJQAIAJAAAOIgOAAQAAgJgFgFQgFgGgIAAQgKAAgIAJQgIAIgCAQIAAACIAAALQAAAJAFAGQAFAGAJAAQAHAAAGgFQAHgFACgHIAOgBQgBAJgGAHQgFAHgJAEQgHAEgHAAIgCgBg");
	this.shape_113.setTransform(708.3389,90.5509);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AgRA9IAQhZIANAAIgOBZgAADgtQgCgCgBgEQABgEACgDQACgCAEAAQAEgBADADQACACAAAEQAAAEgCADQgDACgEAAIgBAAQgDAAgCgCg");
	this.shape_114.setTransform(701.95,88.9208);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AgRBAIAUh/IAQAAIgVB/g");
	this.shape_115.setTransform(697.9,88.675);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AgFAvQgLAAgIgHQgJgFgDgLQgEgKABgMQABgNAHgMQAGgKAKgHQAKgGALAAQALAAAIAGQAIAHAEAKQAEAKgBANIgBABQgBANgGAKQgHALgJAGQgJAGgKAAIgCAAgAgOgYQgIAJgCAPIAAACIAAAKQABALAFAFQAFAGAIAAQAHAAAGgEQAHgEAEgHQAEgJABgJIABgMQgBgKgFgGQgFgGgJAAQgKAAgJAJg");
	this.shape_116.setTransform(690.8157,90.5501);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AgxA8IAVh3IAnAAQATAAAKAKQAKAKgBAQQgBASgNAJQgMAKgUAAIgcgBIgIAvgAgXAAIAaAAQANAAAIgFQAIgGABgMQACgKgGgGQgFgHgLAAIgcAAg");
	this.shape_117.setTransform(681.1045,89);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAFQAFAEAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgDQgFgEgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAJAAAMIgQAAQAAgGgFgGQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPAAQgKgBgIgDg");
	this.shape_118.setTransform(667.075,90.55);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQALgHASAAIAOAAIAAgHQABgIgFgGQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAFgGAHgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgBgDgBgGQgLAKgOABQgNAAgIgIgAgUASQgBAHAFAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_119.setTransform(658.05,90.55);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AgHBAIAAh/IAPAAIAAB/g");
	this.shape_120.setTransform(651.375,88.675);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AgaAiQgLgLAAgUIAAgDQAAgNAFgKQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_121.setTransform(644.875,90.55);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_122.setTransform(636.575,88.675);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_123.setTransform(623.775,88.675);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_124.setTransform(616.825,88.925);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgWIAPAAIAAAWIAQAAIAAAMIgQAAIAAA3QAAAFABADQADACAFAAIAIgBIAAANIgMACQgLAAgDgHg");
	this.shape_125.setTransform(611.7,89.55);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAFQAFAEAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgDQgFgEgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAJAAAMIgQAAQAAgGgFgGQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPAAQgKgBgIgDg");
	this.shape_126.setTransform(604.825,90.55);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_127.setTransform(598.375,88.925);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_128.setTransform(593.875,90.475);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AgaAiQgLgLAAgUIAAgDQAAgNAFgKQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_129.setTransform(586.125,90.55);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgQAAIAAgMIAQAAIAAgWIAOAAIAAAWIARAAIAAAMIgRAAIAAA3QAAAFACADQADACAFAAIAIgBIAAANIgMACQgLAAgEgHg");
	this.shape_130.setTransform(578.5,89.55);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_131.setTransform(572.275,88.675);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQAKgHATAAIAOAAIAAgHQABgIgFgGQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAFgGAHgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgBgDgBgGQgLAKgNABQgOAAgJgIgAgUASQAAAHAEAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgMAAQgaAAAAAQg");
	this.shape_132.setTransform(562.75,90.55);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_133.setTransform(555.725,90.475);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQALgHARAAIAQAAIAAgHQAAgIgFgGQgFgEgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAEgGQAGgGAIgEQAIgEAJAAQAPABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgCgDAAgGQgLAKgNABQgOAAgJgIgAgVASQAAAHAFAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_134.setTransform(547.75,90.55);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_135.setTransform(539.425,88.675);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_136.setTransform(527.925,90.475);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQALgHARAAIAQAAIAAgHQgBgIgEgGQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAGgGAIgEQAIgEAJAAQAPABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgCgDAAgGQgLAKgOABQgNAAgIgIgAgVASQAAAHAFAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_137.setTransform(519.95,90.55);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgQAAIAAgMIAQAAIAAgWIAPAAIAAAWIAQAAIAAAMIgQAAIAAA3QAAAFACADQACACAGAAIAGgBIAAANIgLACQgKAAgFgHg");
	this.shape_138.setTransform(512.3,89.55);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("AgMBAIAAhNIgOAAIAAgMIAOAAIAAgJQAAgOAIgIQAGgHAOAAIALABIgBAMIgIgBQgIAAgEAFQgEAEAAAIIAAAJIATAAIAAAMIgTAAIAABNg");
	this.shape_139.setTransform(507.125,88.6);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQALgHARAAIAQAAIAAgHQgBgIgEgGQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAGgGAIgEQAIgEAJAAQAPABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgCgDAAgGQgLAKgNABQgOAAgIgIgAgVASQAAAHAFAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_140.setTransform(499.25,90.55);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgJQgJAKgQABQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAJAKgBQAPAAAHgMIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_141.setTransform(489.625,88.75);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAAAAgIAAA7g");
	this.shape_142.setTransform(476.15,90.475);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQALgHASAAIAOAAIAAgHQABgIgFgGQgFgEgJAAQgHAAgGAEQgFAEAAAGIgQAAQAAgHAFgGQAFgGAHgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgBgDgBgGQgLAKgOABQgNAAgJgIgAgUASQgBAHAFAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_143.setTransform(466.8,90.55);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("AgSA7QgJgEgGgHIAIgJQALAMAOAAQAKAAAGgHQAHgGAAgLIAAgIQgKALgPAAQgQAAgJgNQgKgNAAgUQAAgWAKgMQAKgNAQAAQAPAAAJAMIABgKIAOAAIAABXQAAASgLAJQgKALgRAAQgJAAgJgFgAgQgoQgFAIAAARQAAAPAFAIQAHAJAKgBQAOAAAIgMIAAgpQgIgNgOABQgKgBgHAKg");
	this.shape_144.setTransform(457.25,92.25);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgHAAgFAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAABAgIAAA7g");
	this.shape_145.setTransform(447.95,90.475);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFFF").s().p("AgaAiQgLgLAAgUIAAgDQAAgNAFgKQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_146.setTransform(438.825,90.55);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgJQgJAKgQABQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAJAKgBQAPAAAHgMIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_147.setTransform(429.225,88.75);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgQAAIAAhZIAPAAIABALQAKgNAQAAQAcAAABAgIAAA7g");
	this.shape_148.setTransform(415.75,90.475);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASAAIAPAAIAAgHQAAgIgEgGQgFgEgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgHAFgGQAFgGAHgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgBgDgBgGQgLAKgOABQgNAAgIgIgAgUASQgBAHAFAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_149.setTransform(406.4,90.55);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("AAVAtIgVhDIgVBDIgMAAIgahZIAPAAIASBCIAVhCIALAAIAVBEIAShEIAPAAIgaBZg");
	this.shape_150.setTransform(395.375,90.55);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("AgaAiQgLgLAAgUIAAgDQAAgNAFgKQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_151.setTransform(384.575,90.55);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFFF").s().p("AAUBAIAAg8QAAgIgEgFQgFgFgJAAQgGAAgGAEQgGAEgDAGIAABAIgQAAIAAh/IAQAAIAAAxQAKgNAQAAQAcAAAAAfIAAA8g");
	this.shape_152.setTransform(375.35,88.675);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_153.setTransform(362.725,88.675);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_154.setTransform(355.775,88.925);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgQAAIAAgMIAQAAIAAgWIAOAAIAAAWIARAAIAAAMIgRAAIAAA3QABAFACADQACACAGAAIAGgBIAAANIgLACQgKAAgFgHg");
	this.shape_155.setTransform(350.65,89.55);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("AgRArQgIgEgFgHQgFgHAAgHIAPAAQABAHAGAFQAFAEAJAAQAJAAAFgEQAFgDAAgGQAAgGgEgDQgFgEgLgDQgMgCgGgDQgHgDgDgEQgEgGAAgGQAAgLAKgIQAJgIANAAQAQABAJAHQAKAJAAAMIgQAAQAAgGgFgGQgFgEgJAAQgHAAgFAEQgEAEAAAFQAAAGAEACQAEADALADQALADAHADQAIADADAFQAEAFAAAHQAAAMgKAHQgKAIgPAAQgKgBgIgDg");
	this.shape_156.setTransform(343.775,90.55);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("AgHA9IAAhZIAPAAIAABZgAgGgtQgCgDAAgDQAAgEACgDQADgCADAAQAEAAADACQACADAAAEQAAADgCADQgDACgEAAQgDAAgDgCg");
	this.shape_157.setTransform(337.325,88.925);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_158.setTransform(332.825,90.475);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FFFFFF").s().p("AgaAiQgLgLAAgUIAAgDQAAgNAFgKQAFgKAJgHQAKgFAJgBQASAAAJAMQAKALAAAWIAAAFIg8AAQABAOAHAIQAIAIAKAAQAIAAAGgDQAFgEAFgFIAJAIQgLAQgXABQgRgBgMgMgAgNgaQgHAHgBAMIAsAAIAAgBQgBgMgFgGQgGgHgKAAQgIAAgGAHg");
	this.shape_159.setTransform(325.075,90.55);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FFFFFF").s().p("AgCAyQgFgGAAgLIAAg3IgQAAIAAgMIAQAAIAAgWIAPAAIAAAWIAQAAIAAAMIgQAAIAAA3QAAAFACADQACACAGAAIAGgBIAAANIgLACQgKAAgFgHg");
	this.shape_160.setTransform(317.45,89.55);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_161.setTransform(311.225,88.675);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQALgHARAAIAQAAIAAgHQgBgIgEgGQgFgEgJAAQgIAAgFAEQgGAEABAGIgQAAQAAgHAEgGQAGgGAIgEQAIgEAJAAQAPABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgCgDAAgGQgLAKgOABQgNAAgIgIgAgVASQAAAHAFAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_162.setTransform(301.7,90.55);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_163.setTransform(294.675,90.475);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#FFFFFF").s().p("AgbAnQgJgHAAgMQAAgOALgHQAKgHASAAIAPAAIAAgHQAAgIgEgGQgFgEgJAAQgIAAgFAEQgFAEAAAGIgQAAQAAgHAFgGQAEgGAIgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgBgDgBgGQgLAKgOABQgNAAgIgIgAgUASQgBAHAFAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_164.setTransform(286.7,90.55);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_165.setTransform(278.375,88.675);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FFFFFF").s().p("AgVAuIAAhZIAPAAIABAKQAGgMAOAAIAHABIAAAPIgIgBQgOAAgFANIAAA/g");
	this.shape_166.setTransform(266.875,90.475);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQALgHASAAIAOAAIAAgHQABgIgFgGQgFgEgJAAQgHAAgGAEQgFAEgBAGIgPAAQAAgHAFgGQAFgGAHgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgBgDgBgGQgLAKgOABQgNAAgJgIgAgUASQgBAHAFAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_167.setTransform(258.9,90.55);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#FFFFFF").s().p("AgBAyQgGgGAAgLIAAg3IgRAAIAAgMIARAAIAAgWIAPAAIAAAWIAQAAIAAAMIgQAAIAAA3QAAAFABADQADACAFAAIAIgBIAAANIgMACQgLAAgDgHg");
	this.shape_168.setTransform(251.25,89.55);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FFFFFF").s().p("AgMBAIAAhNIgOAAIAAgMIAOAAIAAgJQAAgOAIgIQAGgHAOAAIALABIgBAMIgIgBQgIAAgEAFQgEAEAAAIIAAAJIATAAIAAAMIgTAAIAABNg");
	this.shape_169.setTransform(246.075,88.6);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQALgHASAAIAOAAIAAgHQABgIgFgGQgFgEgJAAQgHAAgGAEQgFAEAAAGIgQAAQAAgHAFgGQAFgGAHgEQAJgEAIAAQAQABAJAHQAIAIABAOIAAAoQAAANADAGIAAACIgQAAQgBgDgBgGQgLAKgOABQgNAAgJgIgAgUASQgBAHAFAEQAFAFAIgBQAGAAAGgDQAHgEACgGIAAgSIgLAAQgbAAAAAQg");
	this.shape_170.setTransform(238.2,90.55);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FFFFFF").s().p("AgbA0QgKgNAAgUIAAgBQAAgVAKgMQAKgNAQAAQAOAAAKAMIAAgwIAPAAIAAB/IgOAAIgBgJQgJAKgQABQgPAAgKgNgAgPgFQgHAHAAARQAAAPAHAJQAGAJAKgBQAPAAAHgMIAAgpQgHgNgPABQgKgBgGAKg");
	this.shape_171.setTransform(228.575,88.75);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FFFFFF").s().p("AAUAuIAAg7QAAgJgFgFQgEgFgJAAQgGAAgGAEQgGAEgDAHIAAA/IgPAAIAAhZIAOAAIAAALQALgNAPAAQAdAAAAAgIAAA7g");
	this.shape_172.setTransform(215.1,90.475);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#FFFFFF").s().p("AgcAnQgIgHAAgMQAAgOALgHQALgHARAAIAQAAIAAgHQAAgIgFgGQgFgEgJAAQgIAAgFAEQgGAEAAAGIgPAAQAAgHAEgGQAGgGAIgEQAIgEAJAAQAPABAJAHQAJAIAAAOIAAAoQAAANADAGIAAACIgQAAQgCgDAAgGQgLAKgNABQgOAAgJgIgAgVASQABAHAEAEQAFAFAHgBQAHAAAHgDQAGgEADgGIAAgSIgNAAQgbAAAAAQg");
	this.shape_173.setTransform(205.75,90.55);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#FFFFFF").s().p("AATBAIgegqIgKAKIAAAgIgPAAIAAh/IAPAAIAABMIAJgKIAbgcIASAAIgiAkIAmA1g");
	this.shape_174.setTransform(197.425,88.675);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#FFFFFF").s().p("AgcAiQgMgNAAgUIAAgBQAAgNAFgKQAFgLAKgGQAJgFALgBQASAAALANQAMANAAAUIAAABQAAANgFAKQgFALgKAGQgJAFgMABQgSAAgKgNgAgSgYQgHAJAAAQQAAAPAHAJQAIAJAKAAQALAAAHgJQAIgJAAgQQAAgPgIgIQgHgKgLAAQgKAAgIAJg");
	this.shape_175.setTransform(187.7,90.55);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#FFFFFF").s().p("AgaAiQgLgMAAgVIAAgCQAAgNAFgKQAFgKAJgGQAJgGALAAQAPABAKAIQAKAJABAPIgPAAQAAgJgGgFQgGgGgJAAQgLAAgGAJQgHAIAAAQIAAACQAAAPAHAIQAGAJALAAQAIAAAHgFQAFgFABgIIAPAAQAAAJgGAGQgEAIgJADQgIAFgJAAQgRgBgLgMg");
	this.shape_176.setTransform(178.5,90.55);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#FFFFFF").s().p("AgdAiQgLgNAAgUIAAgBQAAgNAFgKQAGgLAIgGQAKgFALgBQASAAAMANQALANAAAUIAAABQAAANgFAKQgFALgJAGQgKAFgMABQgRAAgMgNgAgSgYQgGAJAAAQQAAAPAGAJQAIAJAKAAQAMAAAGgJQAIgJgBgQQABgPgIgIQgGgKgMAAQgKAAgIAJg");
	this.shape_177.setTransform(169.1,90.55);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#FFFFFF").s().p("AghAvQgNgPABgbIAAgKQgBgRAHgNQAGgNAKgGQAMgHANAAQATAAAMALQALALACASIgQAAQgBgOgIgGQgGgHgNAAQgOAAgJALQgJALABAWIAAAKQAAAUAIAMQAIALANAAQAOAAAHgGQAHgGACgPIAQAAQgCAUgLAKQgMAKgVAAQgUAAgNgPg");
	this.shape_178.setTransform(158.9,89);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#FFFFFF").s().p("AACAUIAAgJQAAgJAEgHQAEgJAGgFIAJAGQgIALAAAKIAAAMgAgYAUIAAgJQAAgJAEgHQAEgJAHgFIAJAGQgIALAAAKIAAAMg");
	this.shape_179.setTransform(150.575,84.15);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.bf(img.Bitmap2, null, new cjs.Matrix2D(1,0,0,1,-499,-300)).s().p("EhN9Au4MAAAhdvMCb7AAAMAAABdvg");
	this.shape_180.setTransform(471,266.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.btnNextDasar1},{t:this.btnMenuDasar1},{t:this.btnBack3},{t:this.slots},{t:this.pieces},{t:this.judulKI},{t:this.Score},{t:this.drag2G1},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.restart},{t:this.btnInfo},{t:this.g1},{t:this.g2},{t:this.g3}]}).wait(1));

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
		{src:"images/_1.jpeg", id:"_1"},
		{src:"images/_11.jpeg", id:"_11"},
		{src:"images/_14.png", id:"_14"},
		{src:"images/_3.jpeg", id:"_3"},
		{src:"images/Bitmap101copy.png", id:"Bitmap101copy"},
		{src:"images/Bitmap102copy.png", id:"Bitmap102copy"},
		{src:"images/Bitmap103copy.png", id:"Bitmap103copy"},
		{src:"images/Bitmap105.png", id:"Bitmap105"},
		{src:"images/Bitmap111.png", id:"Bitmap111"},
		{src:"images/Bitmap2.png", id:"Bitmap2"},
		{src:"images/bookpngcopy.png", id:"bookpngcopy"},
		{src:"images/flash0aiAssets.png", id:"flash0aiAssets"},
		{src:"images/flash0aiAssets_1.png", id:"flash0aiAssets_1"},
		{src:"images/flash0aiAssets_2.png", id:"flash0aiAssets_2"},
		{src:"images/flash0aiAssets_3.png", id:"flash0aiAssets_3"},
		{src:"images/_11_1.jpeg", id:"_11_1"},
		{src:"images/Bitmap3.png", id:"Bitmap3"},
		{src:"images/_3_1.jpeg", id:"_3_1"},
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